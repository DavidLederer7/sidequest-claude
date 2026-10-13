import { createEscapeChallenge, getDailyKey, practiceChallenge, replayEscape, solveEscape, escapeShare } from '../../lib/escape.mjs';
import { blockLabel } from './board.mjs';

// Gameplay is shared with the shipped game. Only UI/session state lives here.
export function newGame(date = getDailyKey()) {
  return { date, level: 'easy', rounds: {}, runs: new Map(), selected: 0, notice: '' };
}
export function current(game) {
  const challenge = practiceChallenge(createEscapeChallenge(game.date, game.level), game.rounds[game.level] || 0);
  const events = game.runs.get(challenge.id) || [];
  return { challenge, events, state: replayEscape(challenge, events) };
}
export function act(game, action, value) {
  const { challenge, events, state } = current(game);
  game.notice = '';
  if (action === 'level') {
    if (!['easy', 'medium', 'hard', 'impossible'].includes(value)) return;
    game.level = value;
    game.selected = 0;
    return;
  }
  if (action === 'select') {
    if (Number.isInteger(value) && challenge.blocks[value]) game.selected = value;
    return;
  }
  if (action === 'round') {
    if (![1, -1].includes(value)) return;
    if (!challenge.practiceBank) { game.notice = 'Impossible: one puzzle per day.'; return; }
    if (value > 0 && !state.won) { game.notice = 'Solve this puzzle to unlock Next.'; return; }
    const round = (challenge.round || 0) + value;
    if (round < 0 || round > 999999) return;
    game.rounds[game.level] = round;
    game.selected = 0;
    return;
  }
  if (action === 'share') { game.notice = escapeShare(challenge, state.moves, state.hints); return; }
  let event;
  if (action === 'hint') {
    if (state.won) { game.notice = 'Escaped! Choose Next or another difficulty.'; return; }
    const next = solveEscape(challenge.blocks, state.positions)?.[0];
    if (!next) { game.notice = 'No hint available.'; return; }
    const block = challenge.blocks[next.block];
    const delta = next.to - state.positions[next.block];
    game.selected = next.block;
    const direction = block.axis === 'h' ? delta > 0 ? 'right' : 'left' : delta > 0 ? 'down' : 'up';
    game.notice = `HINT: Move block ${blockLabel(next.block)} ${direction} ${Math.abs(delta)} ${Math.abs(delta) === 1 ? 'space' : 'spaces'}.`;
    event = { type: 'hint' };
  } else if (action === 'move') {
    const block = challenge.blocks[game.selected];
    if (!(block.axis === 'h' ? ['left', 'right'] : ['up', 'down']).includes(value)) {
      game.notice = `Block ${blockLabel(game.selected)} only moves ${block.axis === 'h' ? 'left or right' : 'up or down'}.`; return;
    }
    event = { type: 'slide', block: game.selected, to: state.positions[game.selected] + (['left', 'up'].includes(value) ? -1 : 1) };
  } else if (action === 'undo' || action === 'reset') event = { type: action };
  else return;
  try {
    replayEscape(challenge, [...events, event]);
    game.runs.set(challenge.id, [...events, event]);
  } catch (error) { game.notice = error.message; }
}
