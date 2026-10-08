import { homedir } from 'node:os';
import { join } from 'node:path';
import { lstatSync, readFileSync } from 'node:fs';
import { readSidequestEnvironment } from './runtime-config.mjs';
import {
  DEFAULT_WAIT_SECONDS,
  sessionKey,
  statePath,
  transact,
} from './opening-state.mjs';

const key = sessionKey('sidequest:preferences:v1');
export const preferencesDirectory = () =>
  process.env.SIDEQUEST_STATE_DIR || join(homedir(), '.sidequest');
export function validatePreferences(patch) {
  if (!patch || typeof patch !== 'object' || Array.isArray(patch))
    throw Error('Invalid preferences');
  for (const [name, value] of Object.entries(patch)) {
    if (name === 'enabled' && typeof value === 'boolean') continue;
    if (name === 'displayMode' && ['compact', 'expanded'].includes(value)) continue;
    if (name === 'pausedUntil' && Number.isSafeInteger(value) && value >= 0 && value <= 8640000000000000) continue;
    if (name === 'puzzleSize' && ['small', 'medium', 'large'].includes(value))
      continue;
    if (
      name === 'waitSeconds' &&
      Number.isInteger(value) &&
      value >= 0 &&
      value <= 3600
    )
      continue;
    if (
      name === 'surface' &&
      ['auto', 'transcript', 'side-panel'].includes(value)
    )
      continue;
    throw Error('Invalid preference: ' + name);
  }
  return patch;
}
function defaults(environment) {
  const seconds = Number(environment.SIDEQUEST_WAIT_SECONDS);
  return {
    // Preserve the established beta default. The welcome card and Pause breaks
    // control make the behavior explicit without breaking existing installs.
    enabled: !['off', 'notify'].includes(environment.SIDEQUEST_WAIT_MODE),
    displayMode: 'expanded',
    pausedUntil: 0,
    waitSeconds:
      environment.SIDEQUEST_WAIT_SECONDS !== undefined &&
      environment.SIDEQUEST_WAIT_SECONDS !== '' &&
      Number.isInteger(seconds) &&
      seconds >= 0 &&
      seconds <= 3600
        ? seconds
        : DEFAULT_WAIT_SECONDS,
    surface: 'auto',
    puzzleSize: 'medium',
  };
}
export function getPreferences(
  directory = preferencesDirectory(),
  environment = readSidequestEnvironment(),
) {
  let saved = {};
  try {
    const path = statePath(key, directory),
      info = lstatSync(path);
    if (
      !info.isFile() ||
      (process.getuid && info.uid !== process.getuid()) ||
      (process.platform !== 'win32' && info.mode & 0o077)
    )
      throw Error('Unsafe preferences file');
    saved = validatePreferences(
      JSON.parse(readFileSync(path, 'utf8')).preferences,
    );
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  return { ...defaults(environment), ...saved };
}
export function setPreferences(
  patch,
  directory = preferencesDirectory(),
  environment = readSidequestEnvironment(),
) {
  validatePreferences(patch);
  if (!Object.keys(patch).length) return getPreferences(directory, environment);
  const result = transact(key, directory, (saved) => {
    const prior = saved ? validatePreferences(saved.preferences) : {};
    const next = { ...defaults(environment), ...prior, ...patch };
    return { next: { preferences: next }, result: { preferences: next } };
  });
  if (!result.preferences)
    throw Error('Preferences could not be saved: ' + result.reason);
  return result.preferences;
}
