#!/bin/bash
# build.sh — Sync + Build der Schulrecht-Skripts.
# Run: cd /Users/paulad/weitergehts-online/repo/_mkdocs && ./build.sh
set -e
cd "$(dirname "$0")"
echo "[1/2] Sync Skripte aus Source-Repo…"
/opt/homebrew/bin/python3 sync_scripts.py
echo "[2/2] mkdocs build…"
/opt/homebrew/bin/mkdocs build --quiet
echo "✓ Build fertig: ../staatsexamen/schulrecht/skripts/"
