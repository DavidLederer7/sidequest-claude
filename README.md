# Sidequest

**Your agent works. You stay sharp.** Slide the blocks to free the blue one.
Start with Easy, keep playing Medium or Hard, or tackle one Impossible puzzle
each day. Daily selections reset at midnight New York time, including daylight
saving. Curated catalogs eventually repeat.

## Install and play

This is a beta, not yet marketplace-approved. Install through your coding app's
plugin manager or follow READ-ME-FIRST.md when using a downloadable package.
This folder itself contains the complete plugin; no outer guide is needed
after marketplace installation.

You need **Node.js 22.13+** and a compatible local desktop coding app. No
Sidequest account, API key, npm install, or notification permission is needed.

1. Install Sidequest and restart your app.
2. In a new **Claude Code** chat, send **`/sidequest:sidequest`**. In **Codex**,
   select Sidequest and say **“Open Sidequest.”**
3. Choose **Play now**. To enable automatic breaks later, use
   **Settings (gear) → Automatic breaks setup** and follow the chat request.
4. Review host permission prompts yourself. Keep the chat visible during the
   setup test and confirm you can actually play.

Installing in one app does not install in the other. Mac desktop has been
playtested; a Windows beta tester reported success, but the full version matrix
is not certified. Linux is unverified. This is not a Claude web/mobile connector.

## Controls

- Drag, or select a block and click a valid destination. Arrow keys move a
  focused block; Shift moves it as far as possible.
- Hint shows the next move. Undo restores positions without erasing move count;
  Reset starts a new attempt and retains disclosed hints.
- Solve Easy, Medium, or Hard to unlock Next. Switch difficulties freely.
- Minimize remembers a compact view; Pause temporarily suspends automatic
  openings. Settings offers Off, a delay, and Small/Medium/Large sizes.

Automatic opening is requested at the next completed tool step after the delay
(enabled at 15 seconds by default, subject to host hook permissions), not during
uninterrupted thinking. Tested Codex hosts
support transcript rendering; tested Claude Code hosts support rendered Files
panes. Display routes depend on host capabilities. If settings are disconnected,
send the provided request in chat; copying it alone changes nothing.

## Data and support

Progress is local to the browser/widget; no account or device sync is promised.
The bundled game has no analytics collector or automatic report upload. Shared
links open the public [game website](https://sidequest.davidlederer7.chatgpt.site),
which automatically submits completed scores to its leaderboard using a guest
identifier and display name. No automatic OS notifications are used. See the
[public privacy notice](https://sidequest.davidlederer7.chatgpt.site/privacy.html),
its [bundled copy](PRIVACY.md), and [help](SUPPORT.md).

Sidequest is proprietary and free to use under its [beta license](LICENSE),
including while doing commercial coding work. No invitation or email acceptance
is required for this release. Third-party licenses remain unchanged.
