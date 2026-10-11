# Sidequest

**Your agent works. You stay sharp.** Slide the gray blocks and guide the blue
block through the exit, right beside your work in Claude Code.

- **Easy, Medium, Hard:** solve a puzzle to unlock the next. Switch difficulties
  and revisit earlier rounds without losing saved progress.
- **Impossible:** one shared challenge each day, resetting at midnight New York
  time. Curated puzzle catalogs eventually repeat.
- Play on demand, get a hint, or share a spoiler-free challenge with a friend.

## Install and play

You need **Claude Code Desktop** and [Node.js 22.13+](https://nodejs.org/).
No Sidequest account, API key, or dependency installation is needed.

1. In a Claude Code chat, add the Sidequest repository:
   ```text
   /plugin marketplace add DavidLederer7/sidequest-claude
   ```
2. Open its installation page and choose **Install**:
   ```text
   /plugin install sidequest@sidequest
   ```
3. Restart Claude, start a new Code chat, and send **`/sidequest:sidequest`**.
4. Choose **Play now**. Review any host permission prompts yourself.

This repository must be accessible to your GitHub account. If you already
installed Sidequest through Claude's directory, skip steps 1–2; do not install
a second copy. This package is for Claude Code, not ordinary Claude web/mobile
chat. Tested desktop versions display the puzzle in a rendered Files pane;
display capabilities depend on the host version.

## Controls and automatic breaks

- Drag a block, or select it and click a valid destination. Arrow keys move a
  focused block; Shift moves it as far as possible.
- **Hint** shows the next move. **Undo** keeps the move count; **Reset** starts
  a new attempt while retaining disclosed hints.
- **Minimize** remembers a compact view. **Pause** temporarily suspends automatic
  openings. Settings offers **Off**, a delay, and Small/Medium/Large sizes.

Automatic breaks default to **on, after 15 seconds**, subject to host hook
permissions. **Play now does not change that setting.** Use the gear icon →
**Automatic breaks setup** to check setup or change the delay; choose **Off**
for manual play only. Openings are requested at the next completed tool step,
not during uninterrupted thinking. Keep the chat visible during a setup test.
If settings are disconnected, send the provided request in chat; copying it
alone changes nothing.

## Privacy and support

Progress stays in the browser/widget; no account or cross-device sync is promised.
The bundled game has no analytics collector, automatic report upload, or OS
notifications. Shared links open the public [game website](https://sidequest.davidlederer7.chatgpt.site),
which automatically submits completed scores using a guest identifier and
display name. Read the [public privacy notice](https://sidequest.davidlederer7.chatgpt.site/privacy.html)
or its [bundled copy](PRIVACY.md).

For help, see [troubleshooting](SUPPORT.md) or email
[Dav.lederer@gmail.com](mailto:Dav.lederer@gmail.com).
Mac desktop has been playtested; a Windows user reported success. The full
Windows/app version matrix and Linux are unverified.

Sidequest is proprietary. Use is governed by the [license](LICENSE).
[Third-party licenses](THIRD-PARTY-NOTICES.md) remain unchanged.
