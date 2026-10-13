// Own both sides of each color pair: terminal themes and dock backgrounds vary.
export const PALETTE = Object.freeze({
  surface: '#f8fafc', text: '#0f172a', muted: '#475569',
  block: '#cbd5e1', selected: '#facc15', escape: '#93c5fd',
  border: '#475569', selectedBorder: '#854d0e', blue: '#1d4ed8',
});

export function readableElements(native) {
  const Text = ({ dimColor, ...props }) => native.Text({
    color: dimColor ? PALETTE.muted : PALETTE.text,
    backgroundColor: PALETTE.surface, ...props,
  });
  const Button = (props) => native.Button({ ...props,
    children: props.children || [Text({ bold: true, children: [props.label] })],
  });
  return { ...native, Text, Button };
}
