# Help and feedback

Use **Report a problem** in the puzzle to copy a short report, then send it to
[Dav.lederer@gmail.com](mailto:Dav.lederer@gmail.com). Nothing is sent automatically.

Include your coding app's name and version, what you expected, what happened,
and the steps to reproduce it. Screenshots help, but crop out private chats,
code, account details and file paths. Never send your complete `.sidequest`
directory, host configuration, conversation logs or capability URLs.

## Installation problems

For a downloadable package, run `node check.mjs claude` (or `codex`) from
its extracted outer folder. Marketplace installs do not contain that helper;
ask your coding chat to check whether Sidequest's server and hooks are enabled.
If Node is missing, install Node.js 22.13 or newer from https://nodejs.org/ and
restart your coding app. Having Node in Terminal does not guarantee a desktop
app can find it: if the plugin's server cannot start, report that rather than
changing permission settings or approving unknown commands.

If no puzzle opens automatically, try a manual opening in a new chat. Check that
the plugin is enabled, hooks are approved in the host, and Settings are not Off.
Code desktop/Cowork automatic opening requires completed tool work after the
delay, not just thinking. Regular Claude Chat opens on request only.
Uninstall duplicate development copies before judging repeated openings.

## Claude terminal

1. Use Claude Code 2.1.287+ with Sidequest installed and native mods allowed.
   Restart after installing, then enter `/sidequest-terminal`.
2. Click a block's label, then a direction. **Keyboard help** explains shortcuts.
3. Use **Minimize** or press **Esc** while the game is focused to hide it.
   It stays hidden until **Play** or `/sidequest-terminal` is used again.
4. Automatic breaks start Off. Change them inside the terminal game's Settings;
   those settings are separate from desktop/Cowork hooks.

If the command is unknown, check that Sidequest is enabled in this session and
native mods are permitted. Do not install a duplicate prototype or bypass your
organization's settings. Resize the pane if the game asks for more room.
Terminal progress lasts for the session; closing Claude ends that progress.

Chat/Cowork inline play uses the **sidequest-chat** connector. If disconnected,
connect it through the plugin's Connectors tab and start a new conversation.
No Sidequest account or API key is needed. The connector cannot change local
automatic-break settings; ask the full plugin in Cowork to change those.

Mac desktop, Cowork and terminal have been playtested; a Windows tester
reported success with an earlier desktop package. The new terminal pane on
Windows, Linux, mobile, and a complete host/version matrix are unverified.
There is no guaranteed reply time. Host display capabilities vary by version.
