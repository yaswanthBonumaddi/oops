#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Build PDFs from the Telugu markdown guides.
#   markdown -> HTML (markdown-it, code highlighted) -> PDF (installed Chrome
#   via puppeteer-core). Telugu renders correctly using macOS Telugu fonts.
#
# Docs live in section folders (lld/ hld/ dsa/ go/ web/ cs/ interview/) and the
# PDFs mirror that layout: lld/X_Telugu.md -> pdfs/lld/X_Telugu.pdf.
#
# Usage:
#   ./make-pdfs.sh                 # builds the go/ section (default)
#   ./make-pdfs.sh all             # builds every *_Telugu.md in every section
#   ./make-pdfs.sh lld hld         # builds whole sections
#   ./make-pdfs.sh lld/FILE.md ... # builds the given files
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

SECTIONS=(lld hld dsa go web cs interview)

# Every *_Telugu.md inside the named section folders, sorted.
docs_in() {
  find "$@" -maxdepth 1 -name '*_Telugu.md' | sort
}

# Resolve target list: a bare section name expands to that folder's docs,
# anything else is taken as a path.
DOCS=()
if [ "$#" -eq 0 ]; then
  set -- go
fi
if [ "$1" = "all" ]; then
  while IFS= read -r d; do DOCS+=("$d"); done < <(docs_in "${SECTIONS[@]}")
else
  for arg in "$@"; do
    if [ -d "$arg" ]; then
      while IFS= read -r d; do DOCS+=("$d"); done < <(docs_in "${arg%/}")
    else
      DOCS+=("$arg")
    fi
  done
fi

if [ "${#DOCS[@]}" -eq 0 ]; then
  echo "ERROR: no matching docs." >&2
  exit 1
fi

echo "Building ${#DOCS[@]} PDF(s)…"
node "$TOOL/build.mjs" "${DOCS[@]}"
echo "Done."
