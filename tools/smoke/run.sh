#!/usr/bin/env bash
#
# run.sh — startet einen lokalen Static-Server, faehrt smoke.py, raeumt auf.
#
# Lokal:  pip install playwright && python3 -m playwright install chromium  (einmalig)
# Aufruf: ./tools/smoke/run.sh   (oder `make smoke`)
# Exit:   0 = Smoke GRUEN, sonst ROT.
#
set -uo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)"
REPO_ROOT="$(cd -- "$SCRIPT_DIR/../.." &> /dev/null && pwd)"
PORT="${SMOKE_PORT:-8099}"

cd "$REPO_ROOT" || exit 1
python3 -m http.server "$PORT" --bind 127.0.0.1 >/tmp/smoke_server.log 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null' EXIT

# Server-Bereitschaft abwarten
for _ in $(seq 1 30); do
  curl -sf "http://127.0.0.1:${PORT}/index.html" >/dev/null 2>&1 && break
  sleep 0.2
done

python3 tools/smoke/smoke.py "http://127.0.0.1:${PORT}"
exit $?
