import { readFile } from 'node:fs/promises';
import { prepareGame } from '../lib/prepare-game.mjs';

try {
  const template = await readFile(
    new URL(
      '../skills/sidequest/assets/claude-inline-widget.html',
      import.meta.url,
    ),
    'utf8',
  );
  const result = await prepareGame({
    directory: process.argv[2] || '',
    template,
    format: process.argv[3] === '--inline' ? 'fragment' : 'document',
  });
  process.stdout.write(JSON.stringify(result) + '\n');
} catch (error) {
  process.stderr.write(`Sidequest preparation failed: ${error.message}\n`);
  process.exitCode = 1;
}
