#!/usr/bin/env node

import { homedir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  DEFAULT_WAIT_SECONDS,
  lifecycle,
  openingTransition,
  sessionKey,
  statePath,
} from '../lib/opening-state.mjs';

import { getPreferences } from '../lib/preferences.mjs';
import { readSidequestEnvironment } from '../lib/runtime-config.mjs';

export { DEFAULT_WAIT_SECONDS } from '../lib/opening-state.mjs';
export const SIDEQUEST_URL = 'https://sidequest.davidlederer7.chatgpt.site/';
export function getWaitSeconds(value = process.env.SIDEQUEST_WAIT_SECONDS) {
  if (value === undefined || value === '') return DEFAULT_WAIT_SECONDS;

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 3600) {
    return DEFAULT_WAIT_SECONDS;
  }

  return parsed;
}

// Notifications are retired. Preserve old notify-only users' choice not to
// open a pane by mapping that mode to off; old both settings become in-app.
export function getWaitMode(value = process.env.SIDEQUEST_WAIT_MODE) {
  return value === 'off' || value === 'notify' ? 'off' : 'in-app';
}

export function getStateDirectory(
  environment = readSidequestEnvironment(),
  userHome = homedir(),
) {
  // Use the same location in hooks and MCP, even if PLUGIN_DATA is only set
  // for hooks by the host. No prompt or code is stored here.
  return environment.SIDEQUEST_STATE_DIR || join(userHome, '.sidequest');
}

export function getStatePath(sessionId, stateDirectory) {
  return statePath(sessionKey(sessionId), stateDirectory);
}

const quote = (value) => "'" + value.replaceAll("'", "'\\''") + "'";

export function openingReminder(
  ticket,
  directory,
  script = fileURLToPath(import.meta.url),
) {
  const command = (action) =>
    [process.execPath, script, 'opening', action, ticket, directory]
      .map(quote)
      .join(' ');
  return [
    'SIDEQUEST AUTOMATIC BREAK — handle this event, then resume work. Never wait for gameplay or end the turn. Skip if disabled, cancelled or prohibited; respect permissions. Use the Sidequest skill.',
    'Choose the controller BEFORE begin: in Claude Cowork use the quoted command in the hook sandbox, not device-forwarded MCP tools on a different machine. Else prefer same-runtime sidequest_opening; use the command if unavailable. Never switch controllers after rejection.',
    'Claude Cowork: use connected sidequest-chat open_sidequest to render. Claude Code: discover sidequest_opening, prepare_sidequest_file and mcp__ccd_view__show_pane together in one search; do not probe open_sidequest in Code.',
    `Same-runtime MCP begin: ${JSON.stringify({ action: 'begin', ticket })}. Require proceed:true before continuing.`,
    'Record opened only after fresh current-task UI observation; remembered openings or tab listings do not prove visibility.',
    `Hook-runtime command: ${command('begin')}`,
    'Keep the SAME controller and directory for check/opened/queued/uncertain/failed (replace only the command action). Require check proceed:true immediately before UI. No path guessing, state copying or permission escalation.',
    'Never use an operating-system browser opener, notifications, permission escalation, another task, or streamed widget HTML. Do not duplicate an opened/queued/uncertain attempt.',
  ].join('\n');
}

export function openingSteps(ticket, preferences = { surface: 'auto' }) {
  const routing = preferences.surface === 'side-panel'
    ? ['The user chose SIDE PANEL. Call prepare_sidequest_browser to obtain the local puzzle URL (includes working settings). After the ticket freshness check, use open_in_codex with target:{type:"browser",url:<returned URL>} in Codex, or Claude Browser preview_start in Claude. Do not call open_sidequest or render a transcript card. If no built-in browser is available, use Claude prepare_sidequest_file + show_pane once as an in-app side-pane fallback; otherwise record failed. Never use an external browser.']
    : preferences.surface === 'transcript'
      ? ['The user chose TRANSCRIPT. In Codex Desktop or a confirmed MCP Apps host, check freshness and call open_sidequest once. In Claude Cowork, use the connected sidequest-chat open_sidequest renderer after the hook-runtime controller freshness check. Remote rendering cannot change hook preferences. Claude Code does not currently support that transcript renderer: use prepare_sidequest_file + show_pane as the supported in-app fallback and clearly mention this limitation. Do not probe open_sidequest in Claude Code. Never duplicate an ambiguous opening.'] : [];
  const steps = [
    'Use the Sidequest skill and the current task only. In Claude Cowork, use the connected sidequest-chat open_sidequest renderer after the hook-runtime controller freshness check: inline rendering was verified on October 11. The remote tool only renders the game; preferences and ticket outcomes must use the hook runtime, not a forwarded device. Otherwise prefer a confirmed prebuilt inline renderer; otherwise Claude rendered file pane (prepare_sidequest_file + show_pane); otherwise the built-in browser.',
    "Claude Code is not Claude Chat: the current tested Code host returns open_sidequest data without rendering an MCP App. Do not call that tool as a rendering probe. First discover mcp__ccd_view__show_pane and prepare_sidequest_file (including deferred tools). If available, prepare format: document in the current session's existing authorized scratch directory, check this ticket, then call show_pane with pane: file and the returned path. This is a bundled offline puzzle; no website navigation is needed. Missing discovery is not evidence that the file pane is unavailable.",
    `In Codex Desktop, prefer open_sidequest once after the ticket freshness check: the September 29–30 desktop tests confirmed its MCP App in the transcript while work continued. This is not a terminal CLI route. If the tool/renderer is unavailable or a definite non-permission failure happened before any possible display, fall back once to open_in_codex with ${JSON.stringify({ target: { type: 'browser', url: SIDEQUEST_URL } })}, omitting threadId. Text-only tool output or unavailable visual inspection does not prove rendering failed: record uncertain, never open a duplicate. Do not end the coding turn to render inline.`,
    'If a fresh observation shows the user deliberately collapsed or dismissed the puzzle, leave it that way for this turn; do not expand it or open a replacement. Never force transcript scrolling, steal focus, or retry native UI inspection after a security denial.',
    'After begin, use a fresh current-task UI observation before taking the already-open shortcut. Earlier openings, screenshots, outcomes, URLs, and tab listings alone do not establish current visibility. If the puzzle is visibly displayed here now, record opened without opening again. Respect a deliberate user collapse/dismissal; otherwise if hidden or closed, reuse/show its existing current-task tab through the host route when available, or follow the opening route. If visibility cannot be inspected, make at most one permitted host opening request for this ticket and report its actual outcome; never assume opened. A previous ticket does not establish visibility for this ticket, but never duplicate a dispatched request after this same ticket was opened, queued, or uncertain.',
    'Avoid redundant tool calls: after a successful begin, prepare the file directly if needed. One freshness check belongs immediately before the actual UI call, not before discovery and again before preparation. Do not request puzzle data separately; the prepared puzzle already contains it.',
    `Immediately before a UI call, use the SAME controller that accepted begin: sidequest_opening with ${JSON.stringify({ action: 'check', ticket })}, or the hook's quoted command with action check if begin used that command. Require proceed:true. Do not switch runtimes or directories.`,
    'Record opened only for confirmed visibility; queued for a queued request; uncertain for ambiguous results/timeouts/permission questions; failed for no route or definite failure. Use that same controller and ticket for the outcome. After opened, queued, or uncertain, do not try another surface.',
    'Only an unavailable renderer or non-permission rendering failure with no UI side effect may fall back once to the built-in browser after another freshness check. Any permission/security denial ends the optional opening attempt: no alternate route or retry to pursue that denied action. If outcome bookkeeping is denied, leave the ticket to expire; do not retry it in the terminal. No external browser, notifications, permission changes, or streamed HTML. Resume permitted original work immediately.',
  ];
  return routing.length ? [...routing, ...steps.slice(3)] : steps;
}

export async function runOpeningCommand({
  action,
  ticket,
  stateDirectory = getStateDirectory(),
  now,
}) {
  const preferences = getPreferences(stateDirectory);
  if (!preferences.enabled && ['begin', 'check'].includes(action)) return { proceed: false, reason: 'preferences-disabled', notified: false };
  if (preferences.pausedUntil > (now ?? Date.now()) && ['begin', 'check'].includes(action)) return { proceed: false, reason: 'preferences-paused', notified: false };
  const result = openingTransition({
    action,
    ticket,
    directory: stateDirectory,
    now,
    notBefore: preferences.pausedUntil,
  });
  // No notification side effect, including tickets created by older versions.
  return {
    ...result,
    notified: false,
    ...(action === 'begin' && result.proceed
      ? { preferences, nextSteps: openingSteps(ticket, preferences) }
      : {}),
  };
}

export async function runWaitDetectorCommand({
  action,
  input,
  stateDirectory = getStateDirectory(),
  waitSeconds,
  mode,
  now,
  nativeTerminal = process.env.SIDEQUEST_NATIVE_TERMINAL === '1',
  writeOutput = (value) => process.stdout.write(value),
} = {}) {
  if (nativeTerminal && ['start', 'check'].includes(action))
    return { proceed: false, reason: 'native-terminal-owned', exitCode: 0 };
  const preferences = getPreferences(stateDirectory);
  waitSeconds ??= preferences.waitSeconds;
  mode ??= preferences.enabled && preferences.pausedUntil <= (now ?? Date.now()) ? 'in-app' : 'off';
  const result = lifecycle({
    action,
    input,
    directory: stateDirectory,
    waitSeconds,
    mode,
    now,
    notBefore: preferences.pausedUntil,
  });
  if (action === 'start' && result.reason === 'armed') {
    writeOutput(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'UserPromptSubmit',
          additionalContext:
            'Sidequest automatic breaks are enabled. Wait for the trusted PostToolUse hook to deliver a ticket. Only then handle its automatic opening event and resume work. A request not to open Sidequest manually does not disable this installed automatic behavior. Do respect an explicit request for no breaks or no UI changes. The controller updates private plugin bookkeeping, not project files; honor any user restriction that also prohibits that state update. Never send notifications, change permissions, or wait for puzzle interaction.',
        },
      }) + '\n',
    );
  }
  if (!result.proceed) return { ...result, exitCode: 0 };
  // This exact PostToolUse shape is supported by both Codex and Claude.
  // No asyncRewake, no exit 2, no blocking decision and no artificial new turn.
  writeOutput(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PostToolUse',
        additionalContext: openingReminder(result.ticket, stateDirectory),
      },
    }) + '\n',
  );
  return { ...result, exitCode: 0 };
}

async function readStandardInput(stream = process.stdin) {
  let value = '';
  for await (const chunk of stream) value += chunk;
  return value;
}

async function main() {
  try {
    const action = process.argv[2];
    if (action === 'opening') {
      const result = await runOpeningCommand({
        action: process.argv[3],
        ticket: process.argv[4],
        stateDirectory: process.argv[5] || getStateDirectory(),
      });
      process.stdout.write(JSON.stringify(result) + '\n');
      return;
    }
    const input = JSON.parse((await readStandardInput()) || '{}');
    const result = await runWaitDetectorCommand({ action, input });
    process.exitCode = result.exitCode;
  } catch (error) {
    if (process.argv[2] === 'opening')
      process.stdout.write(
        JSON.stringify({ proceed: false, reason: 'state-unavailable' }) + '\n',
      );
    if (process.env.SIDEQUEST_DEBUG) {
      process.stderr.write(`Sidequest wait detector: ${error.message}\n`);
    }
  }
}

if (pathToFileURL(process.argv[1] || '').href === import.meta.url) {
  await main();
}
