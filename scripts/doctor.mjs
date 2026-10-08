import { existsSync, readFileSync, realpathSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getWaitMode, getWaitSeconds } from './wait-detector.mjs';

/** Read-only installation diagnostics. Never changes settings or asks for permission. */
export function installationReport({
  root = fileURLToPath(new URL('../', import.meta.url)),
  environment = process.env,
  nodeVersion = process.versions.node,
  exists = existsSync,
  read = (path) => readFileSync(path, 'utf8'),
} = {}) {
  const checks = [];
  const [major, minor] = nodeVersion.split('.').map(Number);
  const add = (ok, text) => checks.push({ ok, text });
  add(
    major > 22 || (major === 22 && minor >= 13),
    `Node.js ${nodeVersion} (requires 22.13 or newer)`,
  );
  for (const file of [
    'skills/sidequest/SKILL.md',
    'hooks/hooks.json',
    'mcp/sidequest-mcp-app.mjs',
    'lib/escape.mjs',
    'lib/escape-hard-puzzles.mjs',
    'lib/prepare-game.mjs',
    'lib/preferences.mjs',
    'lib/local-preferences-server.mjs',
    'scripts/prepare-game.mjs',
    'skills/sidequest/assets/claude-inline-widget.html',
    'lib/opening-state.mjs',
    'lib/opening-controller.mjs',
  ]) {
    add(exists(join(root, file)), `Plugin file: ${file}`);
  }
  for (const file of [
    '.claude-plugin/plugin.json',
    ...(exists(join(root, '.codex-plugin'))
      ? ['.codex-plugin/plugin.json']
      : []),
  ]) {
    try {
      const manifest = JSON.parse(read(join(root, file)));
      add(manifest.name === 'sidequest', `${file}: ${manifest.version}`);
    } catch {
      add(false, `Missing or invalid ${file}`);
    }
  }
  const notes = [
    `Loaded plugin: ${root}`,
    `Wait behavior in this process: ${getWaitMode(environment.SIDEQUEST_WAIT_MODE)}; ${getWaitSeconds(environment.SIDEQUEST_WAIT_SECONDS)} seconds. Desktop apps may have a different environment.`,
    'Codex and Claude Desktop: automatic in-app requests arrive at the first completed foreground tool after the threshold. No sleeping timer or idle re-wake; uninterrupted reasoning cannot open a pane mid-request.',
    'The agent must execute the opening protocol: supported inline or PiP first, built-in browser second, otherwise quiet. Queued or uncertain UI results never trigger a second opening.',
    'Automatic OS notifications are retired. Legacy both means in-app; legacy notify means off. No notification helper is required.',
    'If a previous hook crashed while writing state, a remaining opening/*.json.lock fails closed. Inspect the lock process ID before removing that specific stale lock; never delete a live lock.',
    'Hook trust and host display support require an in-app check; file checks do not prove them.',
    'The hosted puzzle is private. Installing the plugin does not grant website access.',
  ];
  return { checks, notes, ok: checks.every((check) => check.ok) };
}

export function printInstallationReport(output, options) {
  const report = installationReport(options);
  output.write('SIDEQUEST · Installation check (read-only)\n\n');
  for (const check of report.checks)
    output.write(`${check.ok ? 'OK' : 'FIX'}  ${check.text}\n`);
  output.write('\n' + report.notes.join('\n\n') + '\n');
  return report.ok ? 0 : 1;
}

if (process.argv[1] && realpathSync(resolve(process.argv[1])) === fileURLToPath(import.meta.url))
  process.exitCode = printInstallationReport(process.stdout);
