# Help and feedback

Use **Report a problem** in the puzzle to copy a short report, then send it to the
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
Automatic opening requires completed tool work after the delay, not just thinking.
Uninstall duplicate development copies before judging repeated openings.

Beta scope: local desktop sessions. Mac has been playtested; a Windows tester
reported success. Linux and a complete Windows/host version matrix are unverified.
There is no guaranteed reply time or public marketplace listing yet.
