import {
  escapeScore,
  getDailyKey,
  isDateKey,
  replayEscape,
  challengeFromId,
} from './escape.mjs';

export function validEscapeId(id) {
  if (typeof id !== 'string' || !id.startsWith('escape:')) return false;
  try {
    challengeFromId(id);
  } catch {
    return false;
  }
  const date = id.split(':').at(-1);
  return isDateKey(date) && date >= '2026-09-20' && date <= getDailyKey();
}
export function validateEscapeSubmission(body) {
  if (!body || typeof body !== 'object' || !validEscapeId(body.puzzleId))
    throw new Error('Invalid puzzle.');
  if (
    typeof body.sessionId !== 'string' ||
    !/^[a-zA-Z0-9-]{12,80}$/.test(body.sessionId)
  )
    throw new Error('Invalid session.');
  if (
    typeof body.playerName !== 'string' ||
    !/^[a-zA-Z0-9_.-]{2,18}$/.test(body.playerName)
  )
    throw new Error('Invalid name.');
  const challenge = challengeFromId(body.puzzleId);
  const state = replayEscape(challenge, body.events);
  if (!state.won) throw new Error('Puzzle is not solved.');
  return {
    puzzleId: challenge.id,
    sessionId: body.sessionId,
    playerName: body.playerName,
    elapsedMs: 0,
    moves: state.moves,
    par: challenge.par,
    score: escapeScore(state.moves, state.hints),
  };
}
