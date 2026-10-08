import { moveRange } from './escape.mjs';

// A destination cell receives the leading edge of the block in that direction.
// Unlike dragging, clicks never clamp across an obstacle to a different square.
export function clickTarget(blocks, positions, index, row, column) {
  if (
    !Number.isInteger(row) ||
    !Number.isInteger(column) ||
    row < 0 ||
    row > 5 ||
    column < 0 ||
    column > 5 ||
    !blocks[index]
  )
    return null;
  const block = blocks[index];
  if ((block.axis === 'h' ? row : column) !== block.fixed) return null;
  const cell = block.axis === 'h' ? column : row;
  const from = positions[index];
  const to =
    cell < from
      ? cell
      : cell >= from + block.size
        ? cell - block.size + 1
        : from;
  const { min, max } = moveRange(blocks, positions, index);
  return to !== from && to >= min && to <= max ? to : null;
}
