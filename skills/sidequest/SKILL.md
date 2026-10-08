---
name: sidequest
description: Open a Sidequest puzzle or brain teaser when the user asks for Sidequest, wants to keep their mind sharp while an AI agent works, wants a focused mental reset during a long coding run, or wants to configure Sidequest timing and display preferences.
---

# Sidequest

Describe Sidequest as a puzzle and brain teaser plugin for keeping your mind sharp while AI works. Use “solve” and “puzzle” in user-facing copy.

Open one puzzle inside the user's current task without cancelling their work.
Never run an operating-system browser opener from a desktop host. Never create
a new task, change security settings, install tools, or wait for puzzle interaction.

## First use and automatic-break setup

For a first launch, the user can select Sidequest and say “Open Sidequest.”
Open the puzzle normally; do not require hook approval just to play manually.
The welcome card offers Play now or Set up automatic breaks. Play now dismisses
the card without changing saved preferences. Setup remains in Settings.

Only when the user asks for setup, read preferences, check the installed plugin,
and guide them through the host's permission review. Never approve hooks, change
trust files, or bypass a review. For Codex, explain `/hooks` in Codex CLI. On Mac,
offer the user the bundled `scripts/review-codex-hooks.command` (relative to the
plugin root) to open themselves. It only locates and launches the CLI; the user
must review permissions. Do not launch an interactive CLI in the agent's terminal.
If the CLI is missing, explain the prerequisite rather than silently installing it.
For Claude Code, confirm the plugin is enabled and follow host permission prompts.
Ask which delay they want before saving a change. Shared preferences affect both
apps on this device; saving them does not grant hook permissions.

For a requested test, read the saved delay. Ask before enabling Off or running a
test longer than 60 seconds. Use separate foreground tool steps past the delay;
follow only a fresh automatic hook ticket, not a manual opening. Continue work
after the opening. Report observed results separately from queued requests and
ask the user to confirm visibility/playability if inspection is unavailable.
If no ticket arrives, diagnose the plugin/hooks rather than claiming a pass.
The widget's Ask chat buttons request help; they do not verify setup or approve it.

## Preferences

Use `get_sidequest_preferences` to read the user's saved delay and opening surface.
Use `set_sidequest_preferences` for an explicit request to change them. Pass only
the fields the user asks to change: `enabled` (boolean), `waitSeconds` (integer
0–3600), `surface` (`auto`, `transcript`, or `side-panel`), `displayMode`
(`compact` or `expanded`), `pausedUntil` (an absolute device timestamp), and
`puzzleSize` (`small`, `medium`, or `large`). Size controls the embedded puzzle's maximum width,
not the host app's outer pane; text remains readable and narrow panes cap the width.
A request such as
“show Sidequest after two minutes” sets `waitSeconds: 120, enabled: true`;
“turn automatic breaks off” sets `enabled: false`. Preferences persist on this
device and are shared by Codex and Claude. Delay changes start with the next user
prompt; Off stops pending openings. The trigger runs at the next completed tool
step after the delay, never during uninterrupted thinking or a running tool. A
pause suppresses pending tickets and creates no catch-up opening when it ends.
Compact mode is sticky across new views until the user chooses Open puzzle.

The puzzle's Settings panel edits the same preferences. MCP Apps use the settings
tools directly; prepared file/browser previews use the plugin's capability-scoped
loopback connection while its MCP process remains running. If unavailable, report
that settings were not saved and use the chat tool; never claim localStorage
alone changes the automatic trigger.

For a manual opening without an explicit requested surface, read the saved surface.
For automatic openings, follow the preference-specific route returned by the ticket.
`side-panel`: use `prepare_sidequest_browser` then the returned local URL with the
current app's built-in browser tool, after ticket freshness checking when applicable.
Do not call `open_sidequest` first. If Claude's Browser is unavailable, its rendered
file pane is the supported side-pane fallback. `transcript`: use `open_sidequest`
only in a confirmed MCP Apps renderer (including tested Codex Desktop). Claude Code
currently lacks that renderer: use its rendered file pane and explain the fallback.
`auto`: follow the routes below. Never use the OS browser, switch an already visible
puzzle to a new surface, or duplicate a dispatched opening for a settings change.
If a loopback connection is denied, do not expand permissions for an automatic break;
use an already permitted file-pane route without settings or record failure.

## Automatic opening protocol

A trusted plugin PostToolUse reminder includes an opaque opening ticket. Use
the Sidequest MCP tool `sidequest_opening` with `{action, ticket}` for each
operation. Fully quoted POSIX controller commands are a fallback only when
that tool is absent; never escalate terminal permissions for this optional
break. Follow the protocol, including `begin`
and the freshness `check` immediately before a UI call. Proceed only when
each returns `proceed: true`. Never invent tickets or reuse an earlier turn's
ticket. Respect a user cancellation or instruction not to open Sidequest.

For each fresh ticket, check the current task's UI after `begin` before using
the already-open shortcut. Record `opened` only when a fresh UI observation
confirms the puzzle is currently displayed in this task. An earlier turn's
opening, remembered screenshot, past `opened` outcome, URL, or tab listing
alone does not establish current visibility. A hidden or closed pane is not
already visibly open. Respect a deliberate user collapse/dismissal instead of
reopening it. Otherwise reuse/show an existing current-task tab through the host
route when available, checking ticket freshness immediately before that UI call;
otherwise choose one route below. If visibility cannot be inspected, do not
assume success: make at most one permitted host opening request for this ticket
and report its actual outcome. Do not retry a request already dispatched for
the same ticket after a queued, uncertain, or opened outcome; those outcomes do
not prove visibility for a later ticket.

When fresh observation confirms visibility, record `opened` without opening
another surface. Record the result
with the same ticket: `opened` for confirmed visibility, `queued`
for a queued host request, `uncertain` for timeout/ambiguous results or a
permission question, or `failed` for no available route or definite failure
before any possible opening. All outcomes are silent: never send an OS notification.
Do not retry another surface after queued or uncertain; no polling loops.
Any host permission/security denial also ends this optional opening attempt.
Do not retry the denied outcome through another tool or surface. If the
controller's outcome update is itself denied, let the ticket expire rather
than retrying it through the terminal. Continue only permitted original work.

These commands do not cancel a UI request already dispatched. Never claim an
MCP text response, queued result, or a URL alone proves a visible puzzle.
After the attempt, continue the original task rather than ending the turn.
For a normal manual opening, keep the confirmation brief. A renderer's success
message confirms loading, not correct styling or working puzzle interaction; do not claim
those were tested unless actual interaction was verified. Explain diagnostics
only when requested or needed to report a failure.

## Automatic display selection

These default routes apply to the `auto` preference. An explicit surface request
or saved `transcript`/`side-panel` preference takes priority as described above.

### Claude Code is not Claude Chat

Live testing on September 28 showed the same MCP App rendering in Claude Chat
but returning only puzzle data in Claude Code. Tool availability is not renderer
support. In that Code host, do not call `open_sidequest` as a rendering probe.
Discover the deferred `mcp__ccd_view__show_pane` and `prepare_sidequest_file`
tools first, then use the rendered file-pane route below. Preparation already
includes today's puzzles; it does not need an `open_sidequest` call first.
Use the session's existing authorized scratch directory, not a guessed folder.
If a newer Code host explicitly confirms prebuilt MCP App rendering, inline
can take priority again. Do not infer support from the ordinary Chat surface.

### Codex Desktop: MCP App first

Prefer `open_sidequest` for manual and automatic opening in Codex Desktop.
The September 29–30 desktop tests confirmed a interactive MCP App in the transcript,
including a ticket-triggered call while work continued. This is evidence for the
tested desktop host, not all Codex versions or the terminal CLI.
Discover the tool once; on an automatic ticket, check freshness immediately
before calling it once, then resume work without waiting for puzzle interaction.

Use a fresh permitted observation to reuse a visible puzzle. If the user deliberately
collapsed or dismissed it, leave it that way for this turn; do not expand it or
open a replacement browser. Never force transcript scrolling or steal focus.
Do not retry native UI inspection after a security denial. When inspection is
unavailable, a successful tool response means rendering was requested, not seen:
record `uncertain` and do not open another surface. Fall back to the built-in
browser only if the tool/renderer is unavailable or a definite non-permission
failure happened before any possible display. Never infer failure from text-only
tool output or an inability to inspect the widget.

### Codex native transcript alternative (manual requests)

If the MCP App route is unavailable without a possible UI side effect, a manual
request can use the native transcript route unless the user chooses a browser or
terminal. When the host provides its native `visualize`
skill, read that skill in full first. Use its
file-backed content-reference contract, not Claude's `show_widget` tool.
Prepare the bundled puzzle with `prepare_sidequest_file`, `format: "fragment"`,
and `directory` set to the task's existing authorized durable visualization
directory. If the installed tool lacks the format option, run
`node "<plugin-root>/scripts/prepare-game.mjs" "<visualization-directory>" --inline`.
Use the returned absolute path with the native visualization content reference
in the response. Never reproduce the puzzle's HTML in a tool call or upload it.
Preparation is not evidence that the host displayed or tested it. Do not open
a second browser unless this route definitely failed with no UI side effect.

This native response route is not a verified mid-turn automatic renderer.
Do not end an active coding turn merely to display it. Automatic breaks retain
the verified prebuilt-renderer/file-pane/browser routing below. No experimental
flags, registered-app credentials, or host permission changes are needed.

The puzzle offers repeatable Easy, Medium and Hard rounds plus one daily Impossible,
with separate saved runs and hints. New players start on Easy; saved difficulty
choices and shared puzzle links are preserved. Daily puzzles reset at midnight America/New_York
(including daylight saving); unfinished older puzzles remain available to solve.
Inline storage and browser storage are separate; do not promise cross-device
sync. Shared URLs include the day, level and regular-round number when needed,
not a solution or session ID. Regular puzzle banks eventually repeat.

Automatic breaks must not make the coding agent stream a puzzle's HTML before
resuming work. Use a confirmed prebuilt MCP App renderer for inline/PiP;
otherwise use Claude's rendered file pane, then the built-in browser. The native
`show_widget` template route is for manual inline requests only. Do not
publish/upload a local HTML file to work around a host limitation.

1. **Confirmed inline rendering:** in a host that supports MCP Apps rendering,
   use `open_sidequest` for the bundled interactive puzzle. Tool availability
   alone does not establish rendering support. Use PiP only when the host
   advertises that mode. Never treat a text-only response as a rendered puzzle.
   For a manual inline request in Claude, alternatively confirm both `mcp__visualize__read_me` and
   `mcp__visualize__show_widget` are available before requesting puzzle data.
   Call `open_sidequest` for `structuredContent.challenge`. Read the
   visualization documentation with `modules: ["interactive"]`,
   `platform: "desktop"`. Read `assets/claude-inline-widget.html` relative
   to this skill; replace only `__SIDEQUEST_CHALLENGE__` with the compact
   JSON challenge. Call `show_widget` with title `sidequest_escape`, a short
   loading message, and the template as `widget_code`. If the data call
   already rendered a puzzle, do not render a second one.
2. **Claude rendered file pane:** when `mcp__ccd_view__show_pane` is available,
   prepare the puzzle using `prepare_sidequest_file` with `directory` set to the
   current session's existing authorized scratch directory. It returns `path`;
   it does not render anything. If that preparation tool is absent, run
   `node "<plugin-root>/scripts/prepare-game.mjs" "<session-scratch-directory>"`
   using actual absolute paths (the plugin root is two levels above this skill).
   Never create a scratch directory outside the session's authorized area or
   request broader permissions. Do not read/reproduce the HTML in a tool call.
   For an automatic ticket, recheck freshness immediately before calling
   `mcp__ccd_view__show_pane` with `{"pane":"file","path":"<returned path>"}`.
   HTML files render as interactive previews in the tested Claude Code Desktop
   host; other versions may differ. A pane-open acknowledgement confirms only
   that the pane opened, not that puzzle interaction was tested. Do not also send an
   attachment or open a browser after a successful/ambiguous pane request.
   A definite permission denial means skip, not expand access.
3. **Codex built-in browser fallback:** discover the available `open_in_codex` tool and use
   `target: {type: "browser", url: "https://sidequest.davidlederer7.chatgpt.site"}`.
   Omit `threadId` to target the calling task. If available tab tools show a
   Sidequest tab associated with this task, reuse that tab only. Do not switch
   unrelated tabs/tasks or use computer automation to force focus.
4. **Claude built-in browser fallback:** discover `mcp__Claude_Browser__preview_start`.
   Use the current tool schema with
   `{"url":"https://sidequest.davidlederer7.chatgpt.site"}`.
   If `mcp__Claude_Browser__tabs_context` exposes a matching Sidequest tab in
   this session, reuse its observed `tabId` with
   `mcp__Claude_Browser__tabs_select` instead. Domain/host permissions apply.

Use the built-in browser only when both inline and rendered-file routes are
unavailable, or after a non-permission rendering failure with no possible UI
side effect. Recheck the ticket before trying the browser once. A security or
permission denial is not a fallback opportunity. A queued or ambiguous result must not open a
second surface. If both routes are unavailable, record `failed` and stay quiet.

One bounded tool discovery is enough. Never substitute an external browser
when in-app tools are missing. For automatic requests report the appropriate
outcome and continue working. For manual requests, give the clickable
[Sidequest link](https://sidequest.davidlederer7.chatgpt.site) and explain that
the user can open it in their app's browser if available.

## Terminal-only hosts

For a manual request, offer `sidequest --terminal` in a free terminal or split
pane. Do not take over the agent's working terminal with an interactive puzzle.
Use `sidequest` (system browser) only when the user chooses that option.
