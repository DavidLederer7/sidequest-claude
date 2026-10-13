// Native elements only: each rectangle contains its own selectable button.
import { PALETTE } from './palette.mjs';
export const BLOCK_KEYS = '1234567890jklzxcvb';
export const blockLabel = (index) => BLOCK_KEYS[index] || String(index + 1);

export function boardLayout(challenge, positions, columns = 42, compact = false) {
  const cellWidth = Math.max(4, Math.min(8, Math.floor((columns - 5) / 6)));
  const cellHeight = compact ? 2 : 3;
  return {
    width: cellWidth * 6 + 5,
    height: cellHeight * 6,
    exitTop: cellHeight * 2,
    blocks: challenge.blocks.map((b, index) => ({
      index,
      left: (b.axis === 'h' ? positions[index] : b.fixed) * cellWidth,
      top: (b.axis === 'v' ? positions[index] : b.fixed) * cellHeight,
      width: (b.axis === 'h' ? b.size : 1) * cellWidth - 1,
      height: (b.axis === 'v' ? b.size : 1) * cellHeight - (compact ? 1 : 0),
    })),
  };
}

export function drawBoard(elements, challenge, state, selected, layout, select) {
  const { Box, Text, Button } = elements;
  return Box({ key: 'board', position: 'relative', width: layout.width, height: layout.height,
    children: [
      ...layout.blocks.map(({ index, ...rect }) => {
        const active = selected === index;
        const background = active ? PALETTE.selected : index === 0 ? PALETTE.escape : PALETTE.block;
        const bordered = rect.height >= 3 && rect.width >= 7;
        const innerWidth = rect.width - (bordered ? 2 : 0);
        const label = blockLabel(index) + (active && innerWidth >= 6 ? '◀' : '');
        return Box({ key: `block-shape-${index}`, position: 'absolute', ...rect,
          backgroundColor: background,
          ...(bordered ? { borderStyle: active ? 'double' : 'round', borderColor: active ? PALETTE.selectedBorder : index === 0 ? PALETTE.blue : PALETTE.border } : {}),
          alignItems: 'center', justifyContent: 'center',
          children: [Button({ key: `block-${index}`, label,
            // Non-plain buttons retain the hotkey without the host's faint accent prefix.
            hotkey: blockLabel(index), onPress: () => select(index),
            children: [Text({ color:PALETTE.text, backgroundColor:background, bold:true, children:[label] })],
          })],
        });
      }),
      Box({ position: 'absolute', left: layout.width - 5, top: layout.exitTop, width: 5, height: 2,
        children: [Text({ color: PALETTE.blue, bold: true, children: [state.won ? '✓ OUT' : '→ OUT'] })] }),
    ],
  });
}
