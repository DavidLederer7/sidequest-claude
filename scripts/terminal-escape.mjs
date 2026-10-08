import { createInterface } from 'node:readline/promises';
import {
  createEscapeChallenge,
  getDailyKey,
  occupancy,
  replayEscape,
  solveEscape,
  escapeShare,
  practiceChallenge,
} from '../lib/escape.mjs';

export function parseEscapeCommand(text, challenge, positions) {
  const value = String(text ?? 'q')
    .trim()
    .toUpperCase();
  if (['Q', 'QUIT'].includes(value)) return { type: 'quit' };
  if (['R', 'RESET'].includes(value)) return { type: 'reset' };
  if (['U', 'UNDO'].includes(value)) return { type: 'undo' };
  if (['H', 'HELP', '?'].includes(value)) return { type: 'help' };
  if (['HINT', 'N'].includes(value)) return { type: 'hint' };
  if (['NEXT', 'PREVIOUS'].includes(value))
    return { type: 'round', delta: value === 'NEXT' ? 1 : -1 };
  if (['EASY', 'MEDIUM', 'HARD', 'IMPOSSIBLE'].includes(value))
    return { type: 'level', level: value.toLowerCase() };
  const match = value.match(/^([A-Z])\s+([LRUD])\s+([1-5])$/);
  if (!match) return { type: 'invalid' };
  const block = challenge.blocks.findIndex((b) => b.id === match[1]);
  if (block < 0) return { type: 'invalid' };
  const axis = challenge.blocks[block].axis;
  if (
    (axis === 'h' && !['L', 'R'].includes(match[2])) ||
    (axis === 'v' && !['U', 'D'].includes(match[2]))
  )
    return { type: 'invalid' };
  return {
    type: 'slide',
    block,
    to:
      positions[block] +
      Number(match[3]) * (['L', 'U'].includes(match[2]) ? -1 : 1),
  };
}
export function renderEscapeBoard(challenge, state) {
  const cells = occupancy(challenge.blocks, state.positions);
  const rows = Array.from(
    { length: 6 },
    (_, r) =>
      '  ' +
      cells
        .slice(r * 6, r * 6 + 6)
        .map((i) => (i < 0 ? '·' : challenge.blocks[i].id))
        .join('  ') +
      (r === 2 ? '  → EXIT' : ''),
  );
  return [
    'SIDEQUEST · ESCAPE #' + challenge.puzzleNumber,
    challenge.dateKey +
      (challenge.difficulty ? ' · ' + challenge.difficulty.toUpperCase() : ''),
    '',
    ...rows,
    '',
    `MOVES ${state.moves} · ${state.hints} HINTS`,
  ].join('\n');
}
export async function runTerminalEscape({
  input = process.stdin,
  output = process.stdout,
  dateKey = getDailyKey(),
  difficulty = 'easy',
  ask,
  useAnsi = Boolean(output.isTTY),
} = {}) {
  const rl = ask ? null : createInterface({ input, output });
  const question = ask ?? ((prompt) => rl.question(prompt));
  let challenge = createEscapeChallenge(
    dateKey,
    difficulty === 'legacy' ? undefined : difficulty,
  );
  const runs = new Map();
  const rounds = {};
  let events = [],
    hint = '';
  const help =
    'Slide blue X to the exit. Example: A D 2 moves A down two spaces.\nCommands: easy · medium · hard · impossible (switch modes) · next · previous · u undo · r reset · n hint · h help · q quit\nOne slide = one move. Undo keeps counted moves. Reset keeps hints.\nNo daily limit on regular modes. One Impossible at midnight New York time.\nRuns stay separate while this puzzle session is open. Terminal results are local; web scores use the shared leaderboard.\n';
  try {
    output.write(help);
    for (;;) {
      const state = replayEscape(challenge, events);
      if (useAnsi) output.write('\x1b[2J\x1b[H');
      output.write(
        renderEscapeBoard(challenge, state) + '\n' + (hint ? hint + '\n' : ''),
      );
      hint = '';
      if (state.won) {
        output.write(
          '\n' + escapeShare(challenge, state.moves, state.hints) + '\n',
        );
        if (ask) return { ...state, status: 'won', events };
      }
      let answer;
      try {
        answer = await question('slide> ');
      } catch {
        return { ...state, status: 'quit', events };
      }
      const command = parseEscapeCommand(answer, challenge, state.positions);
      if (command.type === 'level') {
        runs.set(challenge.id, events);
        challenge = practiceChallenge(
          createEscapeChallenge(dateKey, command.level),
          rounds[command.level] || 0,
        );
        events = runs.get(challenge.id) || [];
        continue;
      }
      if (command.type === 'round') {
        if (command.delta > 0 && challenge.practiceBank && !state.won) {
          hint = 'Solve this puzzle to unlock the next one.';
          continue;
        }
        const round = (challenge.round || 0) + command.delta;
        if (!challenge.practiceBank || round < 0 || round > 999999) {
          hint =
            challenge.difficulty === 'impossible'
              ? 'Impossible has only one puzzle per day.'
              : 'No previous round.';
          continue;
        }
        runs.set(challenge.id, events);
        rounds[challenge.difficulty] = round;
        challenge = practiceChallenge(
          createEscapeChallenge(dateKey, challenge.difficulty),
          round,
        );
        events = runs.get(challenge.id) || [];
        continue;
      }
      if (command.type === 'quit') {
        output.write('Back to work. See you next time.\n');
        return { ...state, status: 'quit', events };
      }
      if (command.type === 'help') {
        output.write(help);
        continue;
      }
      if (command.type === 'invalid') {
        hint = 'Use a block letter, direction, and distance: A D 2';
        continue;
      }
      if (command.type === 'hint') {
        const next = solveEscape(challenge.blocks, state.positions)?.[0];
        if (!next) {
          hint = 'No hint available.';
          continue;
        }
        const block = challenge.blocks[next.block],
          delta = next.to - state.positions[next.block];
        hint = `Hint: ${block.id} ${block.axis === 'h' ? (delta > 0 ? 'R' : 'L') : delta > 0 ? 'D' : 'U'} ${Math.abs(delta)}`;
      }
      try {
        const next = [...events, command];
        replayEscape(challenge, next);
        events = next;
      } catch (error) {
        hint = error.message;
      }
    }
  } finally {
    rl?.close();
  }
}
