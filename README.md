# Sidequest

**Your agent works. You stay sharp.** Take a puzzle break without leaving Claude.
Slide the blocks to clear a path to the exit. Play Easy, Medium or Hard rounds,
or try the daily Impossible challenge. Hints, undo and shareable challenges are
included. There is no time limit and no Sidequest account or API key.

## Install and play

1. Add **Sidequest** through Claude's plugin manager and review its permissions.
   If already installed, update that copy rather than installing another.
2. In the plugin's **Connectors** tab, connect **sidequest-chat** for inline
   play in Chat and Cowork. No Sidequest login is needed.
3. Start a new conversation and follow the instruction for your app below.

| Where you play | How to open | Automatic breaks |
| --- | --- | --- |
| Claude Chat | Ask “Open Sidequest” | Not supported; open on request |
| Cowork | Ask “Open Sidequest” | With the full plugin and approved hooks |
| Claude Code desktop | Send `/sidequest:sidequest` | With approved hooks; opens in the Files pane |
| Claude Code terminal | Enter `/sidequest-terminal` | Turn on in the game's Settings |

Code/Cowork local tools require [Node.js 22.13+](https://nodejs.org/).
The terminal pane requires **Claude Code 2.1.287+**, enabled native mods, and a
trusted workspace. Allow at least 41 columns and 30 rows; a narrow pane may
need more height. Host or organization restrictions still apply.

**Installing from GitHub instead?** In Claude Code, run these commands, then
restart Claude. Skip this if you installed through its plugin manager:

```text
/plugin marketplace add DavidLederer7/sidequest-claude
/plugin install sidequest@sidequest
```

## Play your way

- **Graphical game:** drag a block, or select it and click its destination.
  **Terminal:** click a block's label, then a direction. Keyboard help is built in.
- Click **Hint** if stuck. Solve a regular round to unlock the next. Impossible
  changes at midnight New York time; curated puzzle catalogs eventually repeat.
- **Minimize** keeps the game compact. In the terminal, Minimize or focused
  **Esc** hides it until you choose Play again. **Pause** suspends automatic
  openings; **Off** disables them.

## Automatic breaks

Code desktop and Cowork hooks default to **15 seconds**, requesting a puzzle
at the next completed tool step. **Play now does not change** that preference.
Ask Claude to check setup or change the delay, and confirm that a puzzle appears.

Terminal breaks start **Off**. Choose **Settings → After 15s, 30s or 60s** to
open during a longer task without taking keyboard focus. Terminal settings are
separate, and terminal puzzle progress lasts for the current session.

Chat has no automatic timer. The remote game cannot change local hook settings;
in Cowork, ask the full plugin to pause or change its breaks. There is no promised
cross-device sync. Desktop/Cowork/terminal have been playtested on Mac. Earlier
desktop builds worked for a Windows tester; the new terminal pane on Windows,
Linux, and mobile play are not yet verified.

## Privacy and help

Local play does not upload scores, prompts or source code. The hosted connector
receives puzzle requests and move histories for validation, not conversation
text. Shared links open the [public game](https://sidequest.davidlederer7.chatgpt.site),
where completed scores are submitted to a leaderboard under a guest name.
See the [privacy notice](PRIVACY.md) and
[public privacy notice](https://sidequest.davidlederer7.chatgpt.site/privacy.html)
for storage and hosting details.

Need help? Read [Support](SUPPORT.md) or email
[Dav.lederer@gmail.com](mailto:Dav.lederer@gmail.com).
Sidequest is proprietary and governed by its [license](LICENSE).
[Third-party licenses](THIRD-PARTY-NOTICES.md) remain unchanged.
