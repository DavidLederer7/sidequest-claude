// Manual entrypoint shipped in every package; no browser launch or hook changes.
import { runTerminalEscape } from './terminal-escape.mjs';

const args = process.argv.slice(2);
if (args.length === 1 && args[0] === '--help') {
  console.log('Sidequest terminal puzzle\nRun: node "<plugin-folder>/scripts/play-terminal.mjs"\nUse a separate terminal or split pane. Type h for help, q to quit.');
} else if (args.length) {
  console.error('No options needed. Use --help for instructions.');
  process.exitCode = 1;
} else {
  await runTerminalEscape();
}
