#!/usr/bin/env bash
# Rebuilds the Google Drive submission folder on the Desktop.
#
#   ./build-submission.sh
#
# Copies an explicit list of files — never the whole directory — so node_modules,
# .git and any local .env can't be swept in by accident. Regenerates the PDFs
# first, since Google Drive shows .md files as raw text and cannot resolve the
# relative image paths in FEATURE-GUIDE.md.

set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST="$HOME/Desktop/TeamSunny_ICLHackathon2026"

cd "$REPO"

echo "==> Regenerating PDFs"
if [ ! -d node_modules/puppeteer-core ] || [ ! -d node_modules/marked ]; then
  echo "    installing build tools (puppeteer-core, marked)…"
  npm install --no-save puppeteer-core marked >/dev/null 2>&1
fi
for f in FEATURE-GUIDE README TARGET-USER-AND-EVIDENCE AI-TOOLS-DECLARATION TEAM-SUMMARY; do
  [ -f "$f.md" ] && node md2pdf.js "$f.md" "$f.pdf"
done

echo
echo "==> Building $DEST"
rm -rf "$DEST"
mkdir -p "$DEST/docs"

# required submission items
cp AI-TOOLS-DECLARATION.pdf AI-TOOLS-DECLARATION.md "$DEST"/
cp TEAM-SUMMARY.pdf         TEAM-SUMMARY.md         "$DEST"/
cp "Sunny-Presentation ICL Hackathon 2026.pdf"  "$DEST"/ 2>/dev/null || true
cp "Sunny-Presentation ICL Hackathon 2026.pptx" "$DEST"/ 2>/dev/null || true

# supporting documents
cp FEATURE-GUIDE.pdf FEATURE-GUIDE.md               "$DEST"/
cp README.pdf README.md                             "$DEST"/
cp TARGET-USER-AND-EVIDENCE.pdf TARGET-USER-AND-EVIDENCE.md "$DEST"/
cp DEPLOY.md                                        "$DEST"/

# the app itself
cp index.html server.js                             "$DEST"/
cp -R docs/screenshots                              "$DEST/docs/"

# covering note (carries the GitHub URL — submission item 3)
cp START-HERE.txt "$DEST"/ 2>/dev/null || echo "    !! START-HERE.txt missing"

echo
echo "==> Safety checks"
fail=0
[ -d "$DEST/node_modules" ] && { echo "    FAIL: node_modules present"; fail=1; } || echo "    node_modules absent   ok"
[ -d "$DEST/.git" ]         && { echo "    FAIL: .git present";         fail=1; } || echo "    .git absent           ok"
[ -f "$DEST/.env" ]         && { echo "    FAIL: .env present";         fail=1; } || echo "    .env absent           ok"
if grep -rqs "sk-ant-" "$DEST"; then echo "    FAIL: API key found"; fail=1; else echo "    no API key            ok"; fi

echo
if [ "$fail" -eq 0 ]; then
  echo "==> Ready: $DEST  ($(du -sh "$DEST" | cut -f1), $(find "$DEST" -type f | wc -l | tr -d ' ') files)"
  echo "    Upload the CONTENTS of this folder to Google Drive."
else
  echo "==> FAILED safety checks — do not upload."
  exit 1
fi
