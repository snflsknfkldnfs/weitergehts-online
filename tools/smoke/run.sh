#!/usr/bin/env bash
#
# run.sh — startet einen lokalen Static-Server, faehrt smoke.py, raeumt auf.
#
# Lokal:  make smoke-setup   (einmalig; legt .venv/ mit Playwright+Chromium an)
# Aufruf: ./tools/smoke/run.sh   (oder `make smoke`)
# Exit:   0 = Smoke GRUEN, sonst ROT.
#
set -uo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)"
REPO_ROOT="$(cd -- "$SCRIPT_DIR/../.." &> /dev/null && pwd)"
PORT="${SMOKE_PORT:-8099}"

# Repo-lokales venv bevorzugen (Homebrew-Python ist PEP-668-managed, kein System-pip)
PY="$REPO_ROOT/.venv/bin/python3"
[ -x "$PY" ] || PY=python3

cd "$REPO_ROOT" || exit 1
"$PY" -m http.server "$PORT" --bind 127.0.0.1 >/tmp/smoke_server.log 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null' EXIT

# Server-Bereitschaft abwarten
for _ in $(seq 1 30); do
  curl -sf "http://127.0.0.1:${PORT}/index.html" >/dev/null 2>&1 && break
  sleep 0.2
done

"$PY" tools/smoke/smoke.py "http://127.0.0.1:${PORT}"
exit $?
