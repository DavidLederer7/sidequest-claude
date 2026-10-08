import { createInterface } from 'node:readline/promises';

import {
  applyDiffPress,
  calculateDailyDiffScore,
  createDailyDiffChallenge,
  getDailyKey,
  isDailyDiffSolved,
} from '../lib/daily-diff.mjs';

const SIDEQUEST_URL = 'https://sidequest.davidlederer7.chatgpt.site';
const CLEAR_SCREEN = '\u001b[2J\u001b[H';

function formatElapsed(elapsedMs) {
  const tenths = Math.floor(elapsedMs / 100) % 10;
  const totalSeconds = Math.floor(elapsedMs / 1_000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}.${tenths}`;
}

function renderCell(cell, index) {
  return `${String(index + 1).padStart(2, '0')}${cell ? '■' : '·'}`;
}

function renderTargetCell(cell) {
  return cell ? '■' : '·';
}

export function renderTerminalBoard(board, target) {
  const rows = ['YOUR GRID                  TARGET'];

  for (let row = 0; row < 5; row += 1) {
    const offset = row * 5;
    const current = board
      .slice(offset, offset + 5)
      .map((cell, column) => renderCell(cell, offset + column))
      .join(' ');
    const goal = target
      .slice(offset, offset + 5)
      .map(renderTargetCell)
      .join(' ');
    rows.push(`${current}       ${goal}`);
  }

  const matched = board.reduce(
    (count, cell, index) => count + Number(cell === target[index]),
    0,
  );
  rows.push(`\nMATCH ${matched}/25`);
  return rows.join('\n');
}

export function parseTerminalCommand(value) {
  const command = value.trim().toLowerCase();
  if (['q', 'quit', 'exit'].includes(command)) return { type: 'quit' };
  if (['r', 'reset'].includes(command)) return { type: 'reset' };
  if (['h', 'help', '?'].includes(command)) return { type: 'help' };

  if (/^\d{1,2}$/.test(command)) {
    const tile = Number(command);
    if (tile >= 1 && tile <= 25) {
      return { type: 'press', index: tile - 1 };
    }
  }

  return { type: 'invalid' };
}

function instructions() {
  return [
    'Match YOUR GRID to TARGET.',
    'A press flips that tile plus its up, down, left, and right neighbors.',
    'Enter a tile number (1-25). Commands: r reset · h help · q quit',
  ].join('\n');
}

export async function runTerminalDailyDiff({
  input = process.stdin,
  output = process.stdout,
  ask,
  dateKey = getDailyKey(),
  now = Date.now,
  useAnsi = Boolean(output.isTTY),
} = {}) {
  const challenge = createDailyDiffChallenge(dateKey);
  let board = [...challenge.start];
  let presses = [];
  let startedAt = null;
  const prompt = ask
    ? null
    : createInterface({ input, output, terminal: Boolean(input.isTTY) });
  const question = ask ?? ((message) => prompt.question(message));

  const draw = (message) => {
    if (useAnsi) output.write(CLEAR_SCREEN);
    output.write(
      [
        `SIDEQUEST · DAILY DIFF #${challenge.puzzleNumber}`,
        `${challenge.dateKey} · PAR ${challenge.par}`,
        '',
        instructions(),
        '',
        renderTerminalBoard(board, challenge.target),
        message ? `\n${message}` : '',
        '',
      ].join('\n'),
    );
  };

  draw('Timer starts with your first press.');

  try {
    while (true) {
      let value;
      try {
        value = await question('tile> ');
      } catch {
        value = 'q';
      }

      const command = parseTerminalCommand(value ?? 'q');
      if (command.type === 'quit') {
        output.write('\nSidequest paused. Your agent is probably ready.\n');
        return { status: 'quit', challenge, board, presses: [...presses] };
      }

      if (command.type === 'help') {
        draw('Tip: corner presses affect 3 tiles; edge presses affect 4.');
        continue;
      }

      if (command.type === 'reset') {
        board = [...challenge.start];
        presses = [];
        startedAt = null;
        draw('Patch reset. Timer starts with your next press.');
        continue;
      }

      if (command.type === 'invalid') {
        draw('Enter a tile from 1 to 25, or h for help.');
        continue;
      }

      if (startedAt === null) startedAt = now();
      board = applyDiffPress(board, command.index);
      presses.push(command.index);

      if (!isDailyDiffSolved(board, challenge.target)) {
        draw(`MOVE ${presses.length} · PAR ${challenge.par}`);
        continue;
      }

      const elapsedMs = Math.max(750, now() - startedAt);
      const points = calculateDailyDiffScore(
        elapsedMs,
        presses.length,
        challenge.par,
      );
      draw('DIFF CLEARED');
      output.write(
        [
          `⚡ ${formatElapsed(elapsedMs)} · ${presses.length} moves · par ${challenge.par}`,
          `LOCAL SCORE ${points}`,
          'Open the web puzzle to compete on the global leaderboard:',
          SIDEQUEST_URL,
          '',
          'Your agent thinks. You stay sharp.',
          '',
        ].join('\n'),
      );
      return {
        status: 'won',
        challenge,
        board,
        presses: [...presses],
        elapsedMs,
        points,
      };
    }
  } finally {
    prompt?.close();
  }
}
