#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Build PDFs from the Telugu markdown guides.
#   markdown -> HTML (markdown-it, code highlighted) -> PDF (installed Chrome
#   via puppeteer-core). Telugu renders correctly using macOS Telugu fonts.
#
# Usage:
#   ./make-pdfs.sh                 # builds the 4 Go docs (default)
#   ./make-pdfs.sh all             # builds every *_Telugu.md in the folder
#   ./make-pdfs.sh FILE.md ...     # builds the given files
# ---------------------------------------------------------------------------
set -euo pipefail
cd "$(dirname "$0")"

TOOL=".pdftool"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

if [ ! -x "$CHROME" ]; then
  echo "ERROR: Google Chrome not found at: $CHROME" >&2
  exit 1
fi

# One-time dependency install.
if [ ! -d "$TOOL/node_modules/puppeteer-core" ]; then
  echo "Installing markdown + pdf tooling (one-time)…"
  ( cd "$TOOL" && npm install --silent --no-audit --no-fund )
fi

# Resolve target list.
if [ "$#" -eq 0 ]; then
  DOCS=(GO_Telugu.md LLD_Go_Telugu.md HLD_Go_Telugu.md SystemDesign_Go_Telugu.md)
elif [ "$1" = "all" ]; then
  DOCS=( *_Telugu.md )
else
  DOCS=( "$@" )
fi

echo "Building ${#DOCS[@]} PDF(s)…"
node "$TOOL/build.mjs" "${DOCS[@]}"
echo "Done."
