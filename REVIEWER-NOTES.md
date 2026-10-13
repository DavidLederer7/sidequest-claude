# Sidequest review notes

This plugin needs no Sidequest API key or account credential. Its declared
`sidequest-chat` remote MCP connection powers inline Chat/Cowork play; local
Code play uses the bundled server or native terminal pane. No `user_config`
credential is required or requested.

## Native terminal and remote connector

The Claude package combines the four classic lifecycle hooks with
`hooks/terminal/register.mjs`. The native module is active only in interactive
terminal sessions. It uses the bundled puzzle rules, a host-managed local
preference store, and an opt-in timer. It sets only `SIDEQUEST_NATIVE_TERMINAL`
in the current process so Sidequest's classic start/check hooks do not create
duplicate openings. It does not suppress other plugins or alter trust settings.
It makes no network requests and does not download dependencies or run model
turns. Terminal progress is session-only. It requires Claude Code 2.1.287+ and
remains subject to the host's mod restrictions.

The declared remote endpoint is
`https://sidequest-claude-mcp.davidlederer7.workers.dev/mcp`. It serves puzzle
requests and validates move histories in memory. It does not receive hook
tickets, credentials, prompts or source code, persist scores, or edit local
preferences. Regular Chat opens on request only. Cowork automatic inline play
was confirmed by the user on October 11; it requires the full plugin, not just
the connector. See `PRIVACY.md` for hosting and public-website data handling.

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
read limit. The portal ALSO reports a 256 KiB automatic scan window. The browser
widget, server entrypoint and shared Zod core remain larger than that window and
need full human inspection. The package audit reports all three explicitly.
Nothing is encoded or obfuscated to avoid review; the existing browser widget
uses a minified SDK bundle for delivery, as it did before this packaging change.

`mcp/BUILD-MAP.json` maps generated files to their source modules. Exact dependency
versions and licenses are in `THIRD-PARTY-NOTICES.md`. The build is reproduced
by `scripts/bundle-mcp.mjs` in the source repository; generated modules retain
source-module comments and are not minified by this build.

## October 8 scanner findings requiring human review

Revalidation of distribution commit `286695e` passed structural validation with
two listing-field warnings and six holds (five related credential findings and
one group of size findings). The whole-environment warning was removed.

- `lib/opening-state.mjs`: the local filename identifier described above; no
  credential-store read or network call. The manifest-level finding combines
  this identifier with the skill's public-site fallback instructions.
- `mcp/shared-WJZXAJVT.mjs`: Zod uses `json-schema.org` URLs as JSON Schema
  dialect identifiers in `detectVersion()`. The `key` variables index object
  properties and definitions, not credential stores. Comparing a schema URI
  does not fetch it.
- `mcp/sidequest-mcp-app.mjs`: AJV embeds a JSON Schema `$id`/`$ref` containing
  `raw.githubusercontent.com/ajv-validator/ajv/.../data.json`. The nearby `pat`
  variable iterates regular-expression patterns in `validatePatternProperties()`;
  it is not a GitHub personal access token. No user PAT is requested or read.
- `mcp/assets/sidequest-widget.html`: the reported host `${e}]` occurs in a
  URL-parser expression that tests IPv6 syntax (`new URL`), not a network
  request. The widget is browser code with no `child_process` or `execFile`
  API. The bundled SDK has base64 utilities and host-security-policy text;
  this is not evidence of executing a credential-store command. Review the
  complete SDK-backed widget rather than assuming the heuristic is conclusive.

The latter three findings became visible after extracting the previously
uninspectable monolithic file. We have not renamed third-party identifiers,
removed security validation, or hidden code to suppress scanner findings.
Human review is still required; this package does not claim policy clearance.

Regression checks cover the hook's import boundary, allowlisted configuration,
omission of raw session/prompt/tool data, standalone relocated MCP startup,
resource contents, preferences across restarts and packaged file sizes.
These checks support human review; they are not a guarantee of marketplace
approval or a claim that the hosting application's own data policies do not apply.

## Product scope and public website

The local stdio server is for supported coding hosts; the separately declared
remote connector is for Chat/Cowork inline play. Host permissions remain the user's responsibility.
Optional opening instructions do not approve hooks or bypass permissions.

The public game website has its own score service. The bundled local game does
not upload scores to it. Sharing deliberately exposes the selected challenge
link/result through the user's chosen sharing service. See `PRIVACY.md` for the
full local-plugin and website distinction.
