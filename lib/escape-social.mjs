import {
  escapeScore,
  nextPuzzleAt,
  puzzleLink,
  MAX_EVENTS,
} from './escape.mjs';

/** Challenge links carry a self-reported target, never a session ID or solution. */
export function challengeLink(challenge, moves, hints, name, origin) {
  const url = new URL(puzzleLink(challenge, origin));
  url.hash = new URLSearchParams({
    challenge: '1',
    by: /^[a-zA-Z0-9_.-]{2,18}$/.test(name) ? name : 'A friend',
    moves: String(moves),
    hints: String(hints),
  }).toString();
  return url.toString();
}

export function readChallengeLink(urlString, challenge) {
  try {
    const url = new URL(urlString);
    const data = new URLSearchParams(url.hash.slice(1));
    if (
      url.searchParams.get('day') !== challenge.dateKey ||
      (url.searchParams.get('level') || undefined) !== challenge.difficulty ||
      (url.searchParams.get('round') || '0') !== String(challenge.round || 0) ||
      data.get('challenge') !== '1'
    )
      return null;
    const movesText = data.get('moves') || '';
    const hintsText = data.get('hints') || '';
    if (!/^\d{1,4}$/.test(movesText) || !/^\d{1,4}$/.test(hintsText))
      return null;
    const moves = Number(movesText),
      hints = Number(hintsText);
    if (moves < challenge.par || moves + hints > MAX_EVENTS) return null;
    const name = data.get('by') || '';
    if (name !== 'A friend' && !/^[a-zA-Z0-9_.-]{2,18}$/.test(name))
      return null;
    return { name, moves, hints };
  } catch {
    return null;
  }
}

export function compareChallenge(moves, hints, target) {
  const delta =
    escapeScore(moves, hints) - escapeScore(target.moves, target.hints);
  return delta < 0
    ? 'You beat the challenge.'
    : delta === 0
      ? 'A perfect tie.'
      : 'You escaped. Their score still leads.';
}

export function nextPuzzleLabel(now = new Date()) {
  const next = nextPuzzleAt(now);
  const minutes = Math.max(1, Math.ceil((next - now.getTime()) / 60000));
  const hours = Math.floor(minutes / 60);
  return `Next puzzle in ${hours ? hours + 'h ' : ''}${minutes % 60}m`;
}
