// Small local state machine. No prompts, tool arguments or transcripts are stored.
import { createHash, randomUUID } from 'node:crypto';
import {
  mkdirSync,
  openSync,
  closeSync,
  readFileSync,
  writeFileSync,
  renameSync,
  unlinkSync,
  lstatSync,
} from 'node:fs';
import { join } from 'node:path';

export const DEFAULT_WAIT_SECONDS = 15;
export const OFFER_LIFETIME_MS = 10 * 60_000;
export const UNCLAIMED_REMINDER_MS = 20_000;
export const sessionKey = (id) =>
  createHash('sha256').update(id).digest('hex').slice(0, 32);
export const statePath = (key, directory) =>
  join(directory, 'opening', `${key}.json`);
const validTicket = /^[a-f0-9]{32}\.[a-f0-9-]{36}$/;

// Conservative English opt-out guard for the user-authored hook prompt only.
// This is not a general intent parser. The agent must still honor other wording.
// Prefer missing an optional break to opening against an explicit instruction;
// never persist the prompt itself or inspect tool output/transcript text here.
export function explicitlySuppressesBreak(prompt) {
  if (typeof prompt !== 'string') return false;
  const text = prompt.toLowerCase().replaceAll('’', "'");
  return (
    /\b(?:no|without)\s+(?:(?:any|additional|more|automatic|sidequest)\s+)*(?:breaks?|sidequest(?:\s+opening)?|ui changes)\b/.test(
      text,
    ) ||
    /\b(?:do not|don't|never)(?:[^.!?\n]{0,240},\s*(?:or|and))?\s+(?:open|launch|show|trigger|start|offer|send)\s+(?:(?:any|another|additional|automatic|more|a|the|sidequest)\s+)*(?:breaks?|sidequest(?:\s+game)?)\b/.test(
      text,
    ) ||
    /\b(?:disable|skip)\s+(?:(?:any|all|the|this|additional|automatic|sidequest)\s+)*breaks?\b/.test(
      text,
    )
  );
}

function readStateFile(path) {
  const info = lstatSync(path);
  if (
    !info.isFile() ||
    (process.getuid && info.uid !== process.getuid()) ||
    (process.platform !== 'win32' && info.mode & 0o077)
  )
    throw Error('Unsafe state file');
  return JSON.parse(readFileSync(path, 'utf8'));
}

// All state transitions are short, synchronous and serialized across processes.
// A crashed process can leave a lock; fail closed rather than steal a live lock.
// This is deliberately not held while executing a host UI or notification call.
export function transact(
  key,
  directory,
  operation,
  { invalidateOnBusy = false, reset = false } = {},
) {
  if (!/^[a-f0-9]{32}$/.test(key))
    return { proceed: false, reason: 'invalid-key' };
  const folder = join(directory, 'opening');
  mkdirSync(folder, { recursive: true, mode: 0o700 });
  const folderInfo = lstatSync(folder);
  if (
    !folderInfo.isDirectory() ||
    (process.getuid && folderInfo.uid !== process.getuid()) ||
    (process.platform !== 'win32' && folderInfo.mode & 0o077)
  ) {
    return { proceed: false, reason: 'unsafe-state-directory' };
  }
  const path = statePath(key, directory),
    lock = `${path}.lock`,
    fencePath = `${path}.fence`;
  const readFence = () => {
    try {
      const info = lstatSync(fencePath);
      if (
        !info.isFile() ||
        (process.getuid && info.uid !== process.getuid()) ||
        (process.platform !== 'win32' && info.mode & 0o077)
      )
        throw Error('Unsafe fence file');
      return readFileSync(fencePath, 'utf8');
    } catch (error) {
      if (error.code === 'ENOENT') return null;
      throw error;
    }
  };
  let fd;
  for (let attempt = 0; attempt < 21; attempt++) {
    try {
      fd = openSync(lock, 'wx', 0o600);
      break;
    } catch (error) {
      if (error.code !== 'EEXIST') throw error;
      if (attempt < 20)
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 10);
    }
  }
  if (fd === undefined) {
    if (invalidateOnBusy) {
      const nonce = randomUUID(),
        pending = `${fencePath}.${nonce}.tmp`;
      try {
        writeFileSync(pending, nonce, { flag: 'wx', mode: 0o600 });
        renameSync(pending, fencePath);
      } finally {
        try {
          unlinkSync(pending);
        } catch {}
      }
    }
    return { proceed: false, reason: 'state-busy' };
  }
  try {
    const fence = readFence();
    writeFileSync(fd, String(process.pid));
    let state = null;
    try {
      state = readStateFile(path);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    if (!reset && ((state && state.fence !== fence) || (!state && fence)))
      return { proceed: false, reason: 'invalidation-pending' };
    const { next, result } = operation(state);
    if (next !== undefined) {
      const temporary = `${path}.${randomUUID()}.tmp`;
      try {
        writeFileSync(temporary, JSON.stringify({ ...next, fence }), {
          mode: 0o600,
          flag: 'wx',
        });
        renameSync(temporary, path);
      } finally {
        try {
          unlinkSync(temporary);
        } catch {}
      }
    }
    if (readFence() !== fence)
      return { proceed: false, reason: 'invalidation-pending' };
    return result;
  } finally {
    closeSync(fd);
    unlinkSync(lock);
  }
}

export function lifecycle({
  action,
  input,
  directory,
  mode = 'in-app',
  waitSeconds = DEFAULT_WAIT_SECONDS,
  notBefore = 0,
  now = Date.now(),
}) {
  mode = mode === 'off' || mode === 'notify' ? 'off' : 'in-app';
  if (!input?.session_id || typeof input.session_id !== 'string')
    return { proceed: false, reason: 'missing-session' };
  if (input.agent_id) return { proceed: false, reason: 'subagent' };
  const key = sessionKey(input.session_id);
  const turn =
    typeof input.turn_id === 'string' ? sessionKey(input.turn_id) : null;
  // An unrelated/old Stop must not leave a blocking sentinel on a current turn.
  if (action === 'stop' && input.hook_event_name !== 'SessionEnd') {
    try {
      const current = readStateFile(statePath(key, directory));
      if (current.turn && current.turn !== turn)
        return { proceed: false, reason: 'wrong-turn' };
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  return transact(
    key,
    directory,
    (state) => {
      const result = (reason, extra = {}) => ({
        result: { proceed: false, reason, ...extra },
      });
      // A stop may arrive before any prompt/tool event (for example an
      // immediately cancelled tool-created task). Keep a tombstone so a late
      // completed tool cannot initialize it again.
      if (action === 'stop' && !state) {
        return {
          next: {
            turn,
            mode,
            status: 'cancelled',
            outcome: 'stopped',
            readyAt: now,
            expiresAt: now,
          },
          ...result('stopped'),
        };
      }
      const tool = input.tool_name || '';
      const url = input.tool_input?.target?.url || input.tool_input?.url;
      // After a trusted offer, Claude may load the skill before claiming its
      // ticket. Loading instructions is not a UI opening and must not revoke
      // that offer. Explicit slash prompts and actual opening tools still do.
      const skillLoad =
        tool === 'Skill' && input.tool_input?.skill === 'sidequest:sidequest';
      const manualOpen =
        (skillLoad && state?.status !== 'offered') ||
        /(?:^|__)(?:open_sidequest|prepare_sidequest_file|prepare_sidequest_browser)$/.test(tool) ||
        (/(?:^|__)(?:open_in_codex|preview_start)$/.test(tool) &&
          typeof url === 'string' &&
          /^https:\/\/sidequest\.davidlederer7\.chatgpt\.site\/?(?:[?#]|$)/.test(
            url,
          ));
      // Tool-created foreground tasks may not emit UserPromptSubmit. Only
      // initialize a genuinely unseen session with an explicit turn identity.
      // Never replace a cancelled, expired, or different-turn record here.
      if (action === 'start' || (action === 'check' && !state && turn)) {
        const manual =
          typeof input.prompt === 'string' &&
          /^\s*\/sidequest(?::sidequest)?(?:\s|$)/i.test(input.prompt);
        const optedOut = explicitlySuppressesBreak(input.prompt);
        const disabled = mode === 'off' || manual || manualOpen || optedOut;
        const next = {
          ticket: `${key}.${randomUUID()}`,
          turn,
          startedAt: now,
          mode,
          status: disabled ? 'cancelled' : 'armed',
          readyAt: now + waitSeconds * 1000,
          expiresAt: now + waitSeconds * 1000 + OFFER_LIFETIME_MS,
          deliveries: 0,
        };
        return {
          next,
          ...result(
            optedOut
              ? 'user-opt-out'
              : manual || manualOpen
                ? 'manual-sidequest'
                : disabled
                  ? 'disabled'
                  : 'armed',
          ),
        };
      }
      if (!state) return result('no-active-turn');
      // SessionEnd belongs to the entire session; other known-turn events must match.
      if (
        input.hook_event_name !== 'SessionEnd' &&
        state.turn &&
        state.turn !== turn
      )
        return result('wrong-turn');
      if (action === 'stop')
        return {
          next: {
            ...state,
            status: 'cancelled',
            outcome:
              state.outcome ||
              (state.status === 'offered'
                ? 'unacknowledged'
                : state.status === 'opening'
                  ? 'incomplete'
                  : state.status),
          },
          ...result('stopped'),
        };
      if (action !== 'check') return result('unknown-action');
      if (notBefore > 0 && (state.startedAt ?? 0) < notBefore)
        return { next: { ...state, status: 'cancelled' }, ...result('paused-turn') };
      if (mode === 'off' && ['armed', 'offered'].includes(state.status))
        return { next: { ...state, status: 'cancelled' }, ...result('disabled') };
      if (['armed', 'offered'].includes(state.status) && manualOpen)
        return {
          next: { ...state, status: 'cancelled' },
          ...result('manual-open'),
        };
      if (now > state.expiresAt)
        return { next: { ...state, status: 'expired' }, ...result('expired') };
      // Retry delivery, not the UI action. Claiming the ticket atomically stops
      // reminders; a delayed first delivery and reminder share one claim.
      if (
        state.status === 'offered' &&
        state.deliveries === 1 &&
        now >= state.offeredAt + UNCLAIMED_REMINDER_MS
      ) {
        return {
          next: { ...state, deliveries: 2 },
          result: {
            proceed: true,
            reason: 'unacknowledged-reminder',
            ticket: state.ticket,
            mode: state.mode,
          },
        };
      }
      if (state.status !== 'armed' || now < state.readyAt)
        return result('not-ready');
      return {
        next: {
          ...state,
          status: 'offered',
          offeredAt: now,
          deliveries: 1,
          expiresAt: now + OFFER_LIFETIME_MS,
        },
        result: {
          proceed: true,
          reason: 'offered',
          ticket: state.ticket,
          mode: state.mode,
        },
      };
    },
    {
      invalidateOnBusy: action === 'start' || action === 'stop',
      reset: action === 'start',
    },
  );
}

export function openingTransition({
  action,
  ticket,
  directory,
  now = Date.now(),
  notBefore = 0,
}) {
  if (typeof ticket !== 'string' || !validTicket.test(ticket))
    return { proceed: false, reason: 'invalid-ticket' };
  return transact(ticket.split('.')[0], directory, (state) => {
    const reject = (reason) => ({ result: { proceed: false, reason } });
    if (!state || state.ticket !== ticket) return reject('superseded');
    if (['begin', 'check'].includes(action) && notBefore > 0 && (state.startedAt ?? 0) < notBefore)
      return { next: { ...state, status: 'cancelled' }, ...reject('paused-turn') };
    if (now > state.expiresAt)
      return { next: { ...state, status: 'expired' }, ...reject('expired') };
    if (action === 'begin' && state.status === 'offered') {
      return {
        next: { ...state, status: 'opening' },
        result: { proceed: true, reason: 'begin', mode: state.mode },
      };
    }
    if (action === 'check')
      return {
        result: { proceed: state.status === 'opening', reason: state.status },
      };
    if (
      ['opened', 'queued', 'uncertain', 'failed'].includes(action) &&
      state.status === 'opening'
    ) {
      return {
        next: { ...state, status: action, outcome: action },
        result: {
          proceed: false,
          reason: action,
          notify: false,
        },
      };
    }
    return reject('already-handled-or-cancelled');
  });
}
