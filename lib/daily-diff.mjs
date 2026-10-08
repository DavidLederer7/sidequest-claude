const GRID_SIZE = 5;
const CELL_COUNT = GRID_SIZE * GRID_SIZE;

function hashSeed(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function randomFromSeed(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function getDailyKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function getPuzzleNumber(dateKey) {
  const date = new Date(`${dateKey}T00:00:00.000Z`);
  const yearStart = Date.UTC(date.getUTCFullYear(), 0, 0);
  return Math.floor((date.getTime() - yearStart) / 86_400_000);
}

export function applyDiffPress(board, index) {
  const row = Math.floor(index / GRID_SIZE);
  const column = index % GRID_SIZE;
  const affected = new Set([
    index,
    row > 0 ? index - GRID_SIZE : -1,
    row < GRID_SIZE - 1 ? index + GRID_SIZE : -1,
    column > 0 ? index - 1 : -1,
    column < GRID_SIZE - 1 ? index + 1 : -1,
  ]);

  return board.map((cell, cellIndex) =>
    affected.has(cellIndex) ? cell ^ 1 : cell,
  );
}

export function findMinimumDiffSolution(start, target) {
  const difference = start.map((cell, index) => cell ^ target[index]);
  let best = null;

  for (let firstRowMask = 0; firstRowMask < 1 << GRID_SIZE; firstRowMask += 1) {
    let working = [...difference];
    const presses = [];

    for (let column = 0; column < GRID_SIZE; column += 1) {
      if ((firstRowMask >> column) & 1) {
        presses.push(column);
        working = applyDiffPress(working, column);
      }
    }

    for (let row = 1; row < GRID_SIZE; row += 1) {
      for (let column = 0; column < GRID_SIZE; column += 1) {
        if (working[(row - 1) * GRID_SIZE + column]) {
          const index = row * GRID_SIZE + column;
          presses.push(index);
          working = applyDiffPress(working, index);
        }
      }
    }

    const solved = working
      .slice((GRID_SIZE - 1) * GRID_SIZE)
      .every((cell) => cell === 0);

    if (solved && (!best || presses.length < best.length)) {
      best = presses;
    }
  }

  return best ?? [];
}

export function createDailyDiffChallenge(dateKey = getDailyKey()) {
  const random = randomFromSeed(hashSeed(`sidequest:daily-diff:${dateKey}`));
  let fallback = null;

  for (let attempt = 0; attempt < 40; attempt += 1) {
    const target = Array.from({ length: CELL_COUNT }, () =>
      random() > 0.5 ? 1 : 0,
    );
    const pressCount = 6 + Math.floor(random() * 6);
    const selected = new Set();
    while (selected.size < pressCount) {
      selected.add(Math.floor(random() * CELL_COUNT));
    }

    let start = [...target];
    for (const index of selected) {
      start = applyDiffPress(start, index);
    }

    const solution = findMinimumDiffSolution(start, target);
    const challenge = {
      id: `daily-diff:${dateKey}`,
      gameId: 'daily-diff',
      title: 'Daily Diff',
      dateKey,
      puzzleNumber: getPuzzleNumber(dateKey),
      par: solution.length,
      start,
      target,
    };
    fallback = challenge;

    if (solution.length >= 6 && solution.length <= 11) {
      return challenge;
    }
  }

  if (!fallback) throw new Error('Unable to generate the daily challenge.');
  return fallback;
}

export function isDailyDiffSolved(board, target) {
  return board.every((cell, index) => cell === target[index]);
}

export function calculateDailyDiffScore(elapsedMs, moves, par) {
  return elapsedMs + Math.max(0, moves - par) * 3_000;
}
