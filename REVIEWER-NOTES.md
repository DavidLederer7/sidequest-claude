# Sidequest review notes

This plugin needs no API key, account credential or remote MCP connection.
No `user_config` credential is required or requested.

## Local hook data flow

`scripts/wait-detector.mjs` imports `lib/opening-state.mjs`,
`lib/preferences.mjs` and `lib/runtime-config.mjs`. That dependency graph uses
only local filesystem, hashing, time and path operations. It has no HTTP client,
network connection or child-process launcher.

- `sessionKey()` hashes the hook-supplied session ID into a local filename.
  This is a storage identifier, not an API key. The raw session ID, prompt text
  and tool input are not stored in the state file or copied into opening output.
- `runtime-config.mjs` selects only `SIDEQUEST_STATE_DIR`,
  `SIDEQUEST_WAIT_SECONDS` and `SIDEQUEST_WAIT_MODE`. Direct `SIDEQUEST_DEBUG`
  access controls local error logging. None is a vendor credential. The plugin
  does not enumerate, copy or forward the installer's entire environment.
- The website address in the hook instructions is a fixed in-app fallback URL.
  The hook does not request that address or append session IDs, environment
  values or opening tickets to it. The URL check in `opening-state.mjs` only
  detects an existing host UI-opening action to avoid duplicate openings.
- State and preferences stay under the configured local Sidequest directory.
  The host sees the hook's timing instructions and opaque opening ticket through
  standard tool/hook output; this is not a direct upload to the game website.

The preview bridge in `lib/local-preferences-server.mjs` is separate: it listens
only on `127.0.0.1`, validates Host/Origin and uses a freshly generated per-process
capability URL. That capability permits puzzle/preference access only; it is
not read from an account or environment and is not sent to the public website.

## Readable local distribution

`mcp/sidequest-mcp-app.mjs` is the server entrypoint. HTML previews are separate
files in `mcp/assets/`. The `validation-*` entrypoints and `shared-*` ESM modules
contain the pinned MCP SDK and its Zod v3/v4/mini compatibility dependencies.
All code and assets ship locally; there is no runtime dependency download.
Every distributed text file is checked against the portal's observed 1 MiB
inspection limit. Nothing is encoded or obfuscated to avoid review.

`mcp/BUILD-MAP.json` maps generated files to their source modules. Exact dependency
versions and licenses are in `THIRD-PARTY-NOTICES.md`. The build is reproduced
by `scripts/bundle-mcp.mjs` in the source repository; generated modules retain
source-module comments and are not minified by this build.

Regression checks cover the hook's import boundary, allowlisted configuration,
omission of raw session/prompt/tool data, standalone relocated MCP startup,
resource contents, preferences across restarts and packaged file sizes.
These checks support human review; they are not a guarantee of marketplace
approval or a claim that the hosting application's own data policies do not apply.

## Product scope and public website

The local stdio server is for supported desktop coding hosts, not a hosted
claude.ai Chat connector. Host permissions remain the user's responsibility.
Optional opening instructions do not approve hooks or bypass permissions.

The public game website has its own score service. The bundled local game does
not upload scores to it. Sharing deliberately exposes the selected challenge
link/result through the user's chosen sharing service. See `PRIVACY.md` for the
full local-plugin and website distinction.
