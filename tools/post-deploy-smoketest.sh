#!/usr/bin/env bash
# tools/post-deploy-smoketest.sh
# Phase 3.2 Live-Go Post-Deploy Smoketest (v3.11)
# OPTIONAL per Q2=b — wird nicht automatisch ausgefuehrt, sondern auf User-Wunsch.
#
# Prueft via HTTP, ob ein frisch live geschaltetes Game oeffentlich erreichbar ist.
#
# Aufruf:  ./tools/post-deploy-smoketest.sh <game-id> [<domain>]
# Default-Domain: weitergehts.online
# Exit:    0 = LIVE-03 PASS, 1 = FAIL (HTTP nicht 200 oder Content-Check fehl),
#          2 = infrastruktureller Fehler

set -u

GAME_ID="${1:-}"
DOMAIN="${2:-weitergehts.online}"

if [ -z "$GAME_ID" ]; then
  echo "usage: $0 <game-id> [<domain>]" >&2
  exit 2
fi

command -v curl >/dev/null 2>&1 || { echo "curl nicht gefunden" >&2; exit 2; }

BASE="https://$DOMAIN"
LANDING="$BASE/"
GAME_URL="$BASE/escape-games/$GAME_ID/"
DATA_URL="$BASE/escape-games/$GAME_ID/data.json"

echo "Ziel-Domain: $BASE"
echo "Game-ID:     $GAME_ID"
echo ""

FAIL=0
RETRY_DELAY=10
MAX_RETRY=6  # GitHub Pages Cache kann bis zu ~1 min brauchen

http_check() {
  # $1 = label, $2 = url, $3 = erwarteter substring
  local label="$1" url="$2" expect="$3"
  local attempt=0
  local code body
  while [ "$attempt" -lt "$MAX_RETRY" ]; do
    code="$(curl -sS -o /tmp/smoketest_body.$$ -w '%{http_code}' --max-time 10 "$url" || echo '000')"
    if [ "$code" = "200" ]; then
      body="$(cat /tmp/smoketest_body.$$)"
      if [ -z "$expect" ] || grep -qF "$expect" /tmp/smoketest_body.$$; then
        rm -f /tmp/smoketest_body.$$
        echo "$label: PASS (200, content OK)"
        return 0
      else
        rm -f /tmp/smoketest_body.$$
        echo "$label: FAIL (200 aber '$expect' fehlt im Body)"
        return 1
      fi
    fi
    attempt=$((attempt + 1))
    if [ "$attempt" -lt "$MAX_RETRY" ]; then
      echo "$label: $code — retry $attempt/$MAX_RETRY nach ${RETRY_DELAY}s"
      sleep "$RETRY_DELAY"
    fi
  done
  rm -f /tmp/smoketest_body.$$
  echo "$label: FAIL (nach $MAX_RETRY Versuchen, letzter code=$code)"
  return 1
}

http_check "LANDING ($LANDING)" "$LANDING" "$GAME_ID" || FAIL=1
http_check "GAME   ($GAME_URL)" "$GAME_URL" "escape-engine" || FAIL=1
http_check "DATA   ($DATA_URL)" "$DATA_URL" '"meta"' || FAIL=1

echo "---"
if [ "$FAIL" -eq 0 ]; then
  echo "LIVE-03: PASS"
  exit 0
else
  echo "LIVE-03: FAIL"
  exit 1
fi
