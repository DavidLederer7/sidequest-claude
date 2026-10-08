import { chmod, mkdtemp, realpath, writeFile } from 'node:fs/promises';
import { isAbsolute, join } from 'node:path';
import { createDailySet, getDailyKey } from './escape.mjs';
import { getPreferences } from './preferences.mjs';

// Never overwrite a user file. The caller selects an already-authorized scratch
// directory; a private unique child contains only bundled game code and puzzle data.
export async function prepareGame({
  directory,
  template,
  dateKey = getDailyKey(),
  format = 'document',
  settingsEndpoint,
}) {
  if (!isAbsolute(directory))
    throw new Error('An absolute scratch directory is required.');
  if (!['document', 'fragment'].includes(format))
    throw new Error('Invalid output format.');
  if (template.split('__SIDEQUEST_CHALLENGE__').length !== 2)
    throw new Error('Invalid bundled puzzle template.');
  const dailyChallenges = createDailySet(dateKey);
  let puzzleSize = 'medium';
  let displayMode = 'expanded';
  try { ({ puzzleSize, displayMode } = getPreferences()); } catch {}
  const challenge = { ...dailyChallenges[0], dailyChallenges, puzzleSize, displayMode };
  const parent = await realpath(directory);
  const folder = await mkdtemp(join(parent, 'sidequest-escape-'));
  await chmod(folder, 0o700);
  const path = join(folder, `escape-${challenge.dateKey}.html`);
  const data = JSON.stringify(challenge).replaceAll('<', '\\u003c');
  const fragment =
    (settingsEndpoint
      ? '<script>window.sidequestSettingsEndpoint=' +
        JSON.stringify(settingsEndpoint).replaceAll('<', '\\u003c') +
        ';</script>'
      : '') + template.replace('__SIDEQUEST_CHALLENGE__', data);
  const html =
    format === 'fragment'
      ? fragment
      : '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sidequest</title></head><body>' +
        fragment +
        '</body></html>';
  await writeFile(path, html, { encoding: 'utf8', mode: 0o600, flag: 'wx' });
  return { path, puzzleId: challenge.id, format, visible: false };
}
