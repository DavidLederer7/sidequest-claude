import { ESCAPE_PUZZLES } from './escape-puzzles.mjs';
import { HARD_PUZZLES } from './escape-hard-puzzles.mjs';
import { IMPOSSIBLE_PUZZLES } from './escape-impossible-puzzles.mjs';
import { IMPOSSIBLE_VARIETY } from './escape-impossible-variety.mjs';

/** @typedef {{id: string, axis: 'h'|'v', fixed: number, size: number}} Block */
/** @typedef {{type:'slide', block:number, to:number}|{type:'undo'|'hint'|'reset'}} EscapeEvent */
/** @typedef {{id:string, gameId:string, title:string, dateKey:string, difficulty?:string, round?:number, practiceBank?:string, puzzleNumber:number, par:number, blocks:Block[], start:number[]}} EscapeChallenge */

export const BOARD_SIZE = 6;
export const MAX_EVENTS = 2000;
export const DIFFICULTIES = ['easy', 'medium', 'hard', 'impossible'];
export const SUPPORTED_DIFFICULTIES = DIFFICULTIES;
export const PUZZLE_TIME_ZONE = 'America/New_York';
const dayFormatter = /* @__PURE__ */ new Intl.DateTimeFormat('en-CA', {
  timeZone: PUZZLE_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
export const getDailyKey = (date = new Date()) => {
  const parts = Object.fromEntries(
    dayFormatter.formatToParts(date).map((p) => [p.type, p.value]),
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
};
export function nextPuzzleAt(now = new Date()) {
  const day = getDailyKey(now);
  let low = now.getTime(),
    high = low + 26 * 3600000;
  while (high - low > 1) {
    const mid = Math.floor((high + low) / 2);
    if (getDailyKey(new Date(mid)) === day) low = mid;
    else high = mid;
  }
  return high;
}

export function isDateKey(value) {
  return (
    typeof value === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(Date.parse(value)) &&
    new Date(value).toISOString().slice(0, 10) === value
  );
}

/** @returns {EscapeChallenge} */
export function createEscapeChallenge(dateKey = getDailyKey(), difficulty) {
  if (!isDateKey(dateKey)) throw new Error('Invalid puzzle date.');
  if (difficulty !== undefined && !SUPPORTED_DIFFICULTIES.includes(difficulty))
    throw new Error('Invalid difficulty.');
  const day = Math.floor(Date.parse(dateKey) / 86400000);
  // Never change a dated puzzle after people have started or shared it.
  const variedImpossible =
    difficulty === 'impossible' && dateKey >= '2026-10-01';
  // Keep legacy IDs/layouts valid for saved runs and old shared links.
  const catalog =
    difficulty === 'impossible'
      ? variedImpossible
        ? IMPOSSIBLE_VARIETY
        : IMPOSSIBLE_PUZZLES
      : difficulty === 'hard'
        ? HARD_PUZZLES
        : difficulty === 'easy'
          ? ESCAPE_PUZZLES.filter((p) => p.par <= 8)
          : difficulty === 'medium'
            ? ESCAPE_PUZZLES.filter((p) => p.par >= 10 && p.par <= 16)
            : ESCAPE_PUZZLES;
  const epoch = variedImpossible ? Date.parse('2026-10-01') / 86400000 : 20716;
  const entry =
    catalog[
      (((day - epoch) % catalog.length) + catalog.length) % catalog.length
    ];
  return {
    id: `escape:${difficulty ? difficulty + ':' : ''}${dateKey}`,
    ...(difficulty ? { difficulty } : {}),
    gameId: 'escape',
    title: 'Sidequest',
    dateKey,
    puzzleNumber:
      Math.floor((Date.parse(dateKey) - Date.parse('2026-09-20')) / 86400000) +
      1,
    par: entry.par,
    // Compact, versioned banks let embedded games advance without an agent call
    // or network request. Existing banks must remain stable for old shared URLs.
    ...(difficulty && difficulty !== 'impossible'
      ? { practiceBank: catalog.map(encodePuzzle).join('.') }
      : {}),
    blocks: entry.blocks.map((b) => ({ ...b })),
    start: [...entry.start],
  };
}

export function createDailySet(dateKey = getDailyKey()) {
  return DIFFICULTIES.map((level) => createEscapeChallenge(dateKey, level));
}

export function challengeFromId(id) {
  const practice =
    /^escape:(easy|medium|hard):v1:([1-9]\d{0,5}):(\d{4}-\d{2}-\d{2})$/.exec(
      id,
    );
  if (practice)
    return practiceChallenge(
      createEscapeChallenge(practice[3], practice[1]),
      Number(practice[2]),
    );
  const match =
    /^escape:(?:(easy|medium|hard|impossible):)?(\d{4}-\d{2}-\d{2})$/.exec(id);
  if (!match) throw new Error('Invalid puzzle ID.');
  return createEscapeChallenge(match[2], match[1]);
}

function encodePuzzle(p) {
  return (
    p.par.toString(36).padStart(2, '0') +
    p.blocks
      .map(
        (b, i) =>
          ((b.axis === 'v' ? 12 : 0) + (b.size - 2) * 6 + b.fixed).toString(
            36,
          ) + p.start[i],
      )
      .join('')
  );
}

/** Unlimited rounds from a curated bank; the bank repeats after its last board.
 * @param {EscapeChallenge} base @param {number} round @returns {EscapeChallenge}
 */
export function practiceChallenge(base, round = 0) {
  if (
    !Number.isSafeInteger(round) ||
    round < 0 ||
    round > 999999 ||
    (round > 0 && (!base.practiceBank || base.difficulty === 'impossible'))
  )
    throw new Error('Invalid practice round.');
  if (!round) return base;
  const bank = base.practiceBank.split('.');
  const day = Math.floor(Date.parse(base.dateKey) / 86400000);
  const encoded =
    bank[(((day - 20716 + round) % bank.length) + bank.length) % bank.length];
  const blocks = [],
    start = [];
  for (let i = 2; i < encoded.length; i += 2) {
    const code = parseInt(encoded[i], 36);
    blocks.push({
      id: i === 2 ? 'X' : String.fromCharCode(63 + i / 2),
      axis: code >= 12 ? 'v' : 'h',
      fixed: code % 6,
      size: 2 + Math.floor((code % 12) / 6),
    });
    start.push(Number(encoded[i + 1]));
  }
  return {
    ...base,
    id: `escape:${base.difficulty}:v1:${round}:${base.dateKey}`,
    round,
    blocks,
    start,
    par: parseInt(encoded.slice(0, 2), 36),
  };
}

export function puzzleLink(
  challenge,
  origin = 'https://sidequest.davidlederer7.chatgpt.site',
) {
  const url = new URL(origin);
  url.pathname = '/';
  url.hash = '';
  url.search = new URLSearchParams({
    day: challenge.dateKey,
    ...(challenge.difficulty ? { level: challenge.difficulty } : {}),
    ...(challenge.round ? { round: String(challenge.round) } : {}),
  }).toString();
  return url.toString();
}

/** @param {Block[]} blocks @param {number[]} positions */
export function occupancy(blocks, positions) {
  if (!Array.isArray(positions) || positions.length !== blocks.length)
    throw new Error('Invalid board.');
  const cells = Array(36).fill(-1);
  blocks.forEach((block, i) => {
    const at = positions[i];
    if (!Number.isInteger(at) || at < 0 || at + block.size > 6)
      throw new Error('Block outside board.');
    for (let offset = 0; offset < block.size; offset++) {
      const cell =
        block.axis === 'h'
          ? block.fixed * 6 + at + offset
          : (at + offset) * 6 + block.fixed;
      if (cells[cell] !== -1) throw new Error('Blocks overlap.');
      cells[cell] = i;
    }
  });
  return cells;
}

/** @param {Block[]} blocks @param {number[]} positions @param {number} index */
export function moveRange(blocks, positions, index) {
  if (!Number.isInteger(index) || !blocks[index])
    throw new Error('Unknown block.');
  const cells = occupancy(blocks, positions);
  const b = blocks[index];
  let min = positions[index],
    max = min;
  const cellAt = (n) => (b.axis === 'h' ? b.fixed * 6 + n : n * 6 + b.fixed);
  while (min > 0 && cells[cellAt(min - 1)] === -1) min--;
  while (max + b.size < 6 && cells[cellAt(max + b.size)] === -1) max++;
  return { min, max };
}

/** @param {Block[]} blocks @param {number[]} positions @param {number} index @param {number} to */
export function slideBlock(blocks, positions, index, to) {
  const { min, max } = moveRange(blocks, positions, index);
  if (!Number.isInteger(to) || to < min || to > max || to === positions[index])
    throw new Error('That slide is blocked.');
  const next = [...positions];
  next[index] = to;
  return next;
}

export function isEscapeSolved(positions) {
  return positions[0] === 4;
}

/** Shortest path: each slide, regardless of distance, costs one move.
 * @param {Block[]} blocks @param {number[]} start
 * @returns {{block:number,to:number}[]|null}
 */
export function solveEscape(blocks, start, limit = 60000) {
  occupancy(blocks, start);
  if (isEscapeSolved(start)) return [];
  const queue = [{ positions: start, parent: -1, move: null }];
  const visited = new Set([start.join('')]);
  for (let head = 0; head < queue.length && queue.length < limit; head++) {
    const node = queue[head];
    for (let i = 0; i < blocks.length; i++) {
      const { min, max } = moveRange(blocks, node.positions, i);
      for (let to = min; to <= max; to++) {
        if (to === node.positions[i]) continue;
        const positions = [...node.positions];
        positions[i] = to;
        const key = positions.join('');
        if (visited.has(key)) continue;
        visited.add(key);
        const child = { positions, parent: head, move: { block: i, to } };
        queue.push(child);
        if (isEscapeSolved(positions)) {
          const path = [child.move];
          let p = head;
          while (queue[p].move) {
            path.unshift(queue[p].move);
            p = queue[p].parent;
          }
          return path;
        }
      }
    }
  }
  return null;
}

/** One replay implementation for browser, server, inline and terminal.
 * Undo never erases a counted slide. Reset starts a new attempt, retaining hint disclosure.
 * @param {EscapeChallenge} challenge @param {EscapeEvent[]} events
 */
export function replayEscape(challenge, events) {
  if (!Array.isArray(events) || events.length > MAX_EVENTS)
    throw new Error('Invalid move history.');
  let positions = [...challenge.start],
    moves = 0,
    hints = 0;
  const history = [];
  for (const event of events) {
    if (!event || typeof event !== 'object') throw new Error('Invalid event.');
    if (event.type === 'reset') {
      positions = [...challenge.start];
      moves = 0;
      history.length = 0;
      continue;
    }
    if (isEscapeSolved(positions)) throw new Error('Puzzle already complete.');
    if (event.type === 'slide') {
      const next = slideBlock(
        challenge.blocks,
        positions,
        event.block,
        event.to,
      );
      history.push(positions);
      positions = next;
      moves++;
    } else if (event.type === 'undo') {
      if (!history.length) throw new Error('Nothing to undo.');
      positions = history.pop();
    } else if (event.type === 'hint') {
      hints++;
    } else throw new Error('Unknown event.');
  }
  return {
    positions,
    moves,
    hints,
    canUndo: history.length > 0,
    won: isEscapeSolved(positions),
  };
}

/** Unassisted solves rank first, then fewest slides. Time never affects rank. */
export function escapeScore(moves, hints) {
  return hints * 10000 + moves;
}

export function escapeShare(
  challenge,
  moves,
  hints,
  url = 'https://sidequest.davidlederer7.chatgpt.site',
) {
  const label =
    challenge.difficulty === 'impossible'
      ? 'Impossible · Daily'
      : challenge.difficulty || 'Daily';
  return `Sidequest #${challenge.puzzleNumber} · ${label}${challenge.round ? ' · Round ' + (challenge.round + 1) : ''}\n${moves === challenge.par && !hints ? '✦ Perfect escape' : '↗ Escaped'} in ${moves} moves\n${hints ? `${hints} hint${hints === 1 ? '' : 's'} used` : 'No hints'} · Best possible: ${challenge.par}\nSame puzzle. ${challenge.difficulty === 'impossible' ? 'Can you escape the Impossible?' : moves === challenge.par ? 'Can you match it?' : 'Can you find a shorter path?'}\n${puzzleLink(challenge, url)}`;
}
