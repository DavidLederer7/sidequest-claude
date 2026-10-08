#!/bin/bash
# User-launched helper only. Never writes config or approves hooks.
set -eu
codex_binary="$(command -v codex || true)"
case "$codex_binary" in /*) ;; *) codex_binary="" ;; esac
if [ -z "$codex_binary" ]; then
  for candidate in /opt/homebrew/bin/codex /usr/local/bin/codex \
    /Applications/ChatGPT.app/Contents/Resources/codex-cli/CodexCLI.app/Contents/MacOS/codex; do
    if [ -x "$candidate" ] && [ ! -d "$candidate" ]; then
      codex_binary="$candidate"
      break
    fi
  done
fi
if [ -z "$codex_binary" ]; then
  printf '%s\n' 'Codex CLI was not found. Ask your coding chat to help locate or install the official Codex CLI.'
  exit 1
fi
if [ "${1:-}" = --check ]; then
  printf 'Codex CLI found: %s\n' "$codex_binary"
  exit 0
fi
if [ "$#" -ne 0 ]; then
  printf '%s\n' 'Usage: review-codex-hooks.command [--check]'
  exit 2
fi
printf '%s\n' 'Sidequest automatic breaks — hook review' \
  'This opens Codex CLI. At its prompt, type /hooks.' \
  'Review the hooks from Sidequest and approve only those you trust.' \
  'If a startup review screen appears, choose Review hooks.' \
  'No permissions are granted by this helper. Quit Codex when finished,' \
  'then restart the desktop app and test in a new chat.'
if [ ! -t 0 ]; then
  printf '%s\n' 'Open this .command file yourself in Terminal to continue.'
  exit 2
fi
printf '\nPress Return to open Codex, or Ctrl+C to cancel: '
read -r answer
exec "$codex_binary"
