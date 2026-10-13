# Sidequest privacy notice

Updated October 12, 2026. Sidequest is operated by David Lederer. This notice
covers the local Sidequest plugin and the public game at
https://sidequest.davidlederer7.chatgpt.site. Contact: Dav.lederer@gmail.com.

## Local plugin

- Puzzle progress, moves, hints and completion stay in browser storage or the
  host's widget state when supported. Widget state may be retained with your
  conversation under the host's policies. No cross-device sync is promised.
- Preferences and automatic-opening bookkeeping are stored in `.sidequest` in
  your home directory, unless you configure another state directory. Hooks
  receive host event data; the wait detector does not store prompt text or source
  code. It stores session-derived keys, timing and opening status.
- Prepared puzzle files stay in the host-authorized directory. Previews may use
  a loopback-only server for the game and settings. Do not share capability URLs.
- The native Claude terminal pane keeps game progress in memory for the session.
  Its separate break preferences are stored in Claude's plugin store. Its timer
  sends no network requests or model messages. A Sidequest-only session flag
  prevents classic hooks from also opening a puzzle; it is not a credential.
- The bundled game does not upload scores to Sidequest's website, collect
  analytics or automatically send support reports. Your coding host processes
  tool calls and conversation/widget state under its own policies.

## Remote chat connector

The optional hosted `/mcp` connector provides puzzles and validates completed
move histories. Opening a puzzle sends a tool request without conversation text
or source code. Result validation sends the puzzle ID and up to 2,000 game events
(moves, undo, hint and reset). The handler processes these in memory and does not
save them, submit leaderboard scores, read device files, or change automatic-break
settings. Puzzle progress remains in the host/browser when supported. The Claude
connector is hosted at `sidequest-claude-mcp.davidlederer7.workers.dev` on
Cloudflare Workers and does not require a Sidequest account or API key.
Sidequest does not store connector tokens or use hosting identity headers.
Hosting providers may retain technical request
logs under their policies. Chat host policies still apply to conversations.

## Public game website

- Browser storage keeps your puzzle progress, a random guest identifier and a
  guest or chosen display name. The identifier is not your coding-chat session ID.
- Completing a website puzzle automatically sends its puzzle ID, guest
  identifier, display name and move/hint/reset history to the website's score
  service to validate the result. Opening the comparison panel sends the puzzle
  ID and guest identifier to retrieve scores and your history.
- The database stores the guest identifier, display name, puzzle ID, move count,
  par, score and submission time. Its schema also supports elapsed time; Escape
  currently records zero for that field. Move history is used for validation,
  not saved in the score database.
- Leaderboard names, ranks and result statistics can be viewed by other visitors.
  Use a nickname, not personal or confidential information. The leaderboard
  response does not expose guest identifiers. Clearing browser data does not
  remove already submitted scores or automatically restore them on another device.
- Hosting is provided through OpenAI Sites and Cloudflare. Serving pages and
  score requests involves technical request information such as IP address,
  browser information and requested URL. Providers may process operational and
  security logs under their policies. Do not put secrets in URLs or display names.
- Sidequest's game code does not add advertising trackers or send coding prompts
  or source code to the website. Provider and coding-app privacy policies apply
  separately: https://openai.com/policies/privacy-policy/
  and https://www.cloudflare.com/privacypolicy/.

## Sharing and support

Share copies or passes the challenge link and any included result to your chosen
sharing service. Recipients can play on the public website without installing the
plugin. The shared challenge link does not include your guest identifier, coding
conversation or solution. Your sharing service has its own privacy practices.

Report a problem displays copyable version/puzzle/surface details, not an automatic
upload. It does not attach conversation text, source code, full URLs, local paths
or session IDs. If you email support, your address and the information you choose
to send reach your email provider and the support inbox. Review reports first;
leave out private chats, source code and credentials.

## Retention and your choices

There is currently no automatic deletion schedule for saved scores, support
correspondence or local plugin files. Scores support comparisons and repeat play;
support correspondence is used to answer requests and resolve issues.

You can clear browser site data, remove host widget/conversation data through
your host, and delete prepared files and the Sidequest state directory when no
Sidequest session is running. Uninstalling alone does not erase these. Removing
shared preferences affects both coding apps on the device. Local plugin play
does not require submitting a website score.

For questions or requests to access, correct or delete website scores or support
information, email Dav.lederer@gmail.com. For a score request, include the public
display name and puzzle date so we can help locate it; we may need additional
information to verify which record is yours. Never send credentials or private
chat transcripts. Provider-held logs and host conversation records must be
managed through the relevant provider. Material changes will be reflected here
with an updated date.
