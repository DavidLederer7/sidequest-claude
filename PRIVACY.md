# Sidequest beta data handling

Updated October 1, 2026. This notice describes the bundled local desktop game,
not a future publicly hosted service or the coding app's own data policies.

- Puzzle progress, moves, hints and completion are stored in browser storage or
  the host's widget state when supported. Host widget state may be retained with
  your conversation according to the host's policies. No cross-device sync is promised.
- Preferences and automatic-opening bookkeeping are kept in `.sidequest` in your
  user home directory, unless you configure a different state directory. The wait
  hooks receive host event data, but the wait detector does not store your prompt
  or source code. Bookkeeping uses session-derived keys, timing and opening status.
- Prepared puzzle files stay in the host-authorized directory. Side-panel previews
  may run a loopback-only server for the game and settings. Capability URLs should
  not be included in reports or shared with other people.
- The bundled puzzle has no Sidequest analytics collector or automatic report
  upload. The coding host can process tool calls under its own terms.
- Choosing Share copies or passes a challenge link and result to your chosen
  sharing destination. Opening the website contacts its hosting service. The
  local plugin does not make a private website public.
- Report a problem displays copyable version/puzzle/surface details. It does not
  attach conversation text, source code, full URLs, local file paths or session IDs.
  You choose what to email to Dav.lederer@gmail.com for support. Emailing a report
  sends its contents through your email provider and to the support inbox; review
  it first and leave out private chats, source code and credentials.

Uninstalling does not erase saved progress or preferences. You can remove browser
site data, host widget/conversation data through the host, prepared puzzle files,
and the Sidequest state directory separately when no Sidequest session is running.
Removing shared preferences affects Sidequest in both coding apps on this device.
No automatic retention deadline is currently enforced for local files.
