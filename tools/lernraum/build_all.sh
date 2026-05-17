#!/usr/bin/env bash
# Lernraum-Build-Pipeline (Schritt 2.5 der Migration-Reihenfolge §14)
#
# Aufruf vom Repo-Root weitergehts-online/:
#   ./tools/lernraum/build_all.sh
#
# Generiert nach assets/data/:
#   - glossar-norm.json
#   - glossar-lp.json
#   - glossar-prinzip.json
#   - themen-mp.json
#   - ke-stats-sk.json
#   - ke-stats-mathe.json

set -euo pipefail
cd "$(dirname "$0")/../.."

echo "=== Lernraum-Build (Schritt 2.5) ==="
python3 tools/lernraum/build_glossare.py
echo
python3 tools/lernraum/build_themen_mp.py
echo
python3 tools/lernraum/build_ke_stats.py
echo
echo "=== Lernraum-Build OK ==="
ls -la assets/data/*.json
