#!/bin/bash
# cc-launch.sh — Pre-Flight-Wrapper fuer Claude-Code-CLI
#
# Zweck: Verhindert stillen Auth-Fallback (Max → API-Billing) bei CC-Sessions.
# Prueft vor Start, ob CC auf Claude-Subscription (Max) antwortet.
# Bricht bei Auth-Fehler ab — kein exec claude.
#
# Verwendung:
#   tools/cc-launch.sh -p --output-format stream-json --verbose \
#     --dangerously-skip-permissions \
#     --add-dir /Users/paulad/escape-game-generator \
#     "$(cat /tmp/cc_batch3_prompt.txt)"
#
#   tools/cc-launch.sh        # interaktiv (TUI), nach Pre-Flight-OK
#
# Ableitung: CC_COWORK_INTEROP_LEARNINGS.md §1 (Auth-Pfad-Fallstrick)
# Aktiviert durch: Batch-2-Incident (API-Credit-Auth-Error 2026-04-18)

set -e

CLAUDE_BIN="${CLAUDE_BIN:-claude}"
PREFLIGHT_TIMEOUT="${PREFLIGHT_TIMEOUT:-30}"

# --- Pre-Flight: Auth-Check ---
# Minimaler Prompt → JSON → parsen: is_error=false, subtype=success → MAX-OK
# is_error=true + "API" in result → AUTH-BROKEN
# macOS hat kein coreutils-timeout → perl alarm als portabler Fallback
PREFLIGHT_RAW=$(perl -e 'alarm shift; exec @ARGV' "$PREFLIGHT_TIMEOUT" "$CLAUDE_BIN" -p --output-format json 'say OK' 2>&1 || echo '{"is_error":true,"result":"preflight-timeout-or-exec-failure"}')

PREFLIGHT_STATUS=$(echo "$PREFLIGHT_RAW" | python3 -c "
import sys, json
try:
    d = json.loads(sys.stdin.read())
    if not d.get('is_error') and d.get('subtype') == 'success':
        print('MAX-OK')
    else:
        reason = d.get('result', '') or d.get('error', '') or 'unknown'
        print('AUTH-BROKEN: ' + str(reason)[:200])
except Exception as e:
    print('PARSE-FAIL: ' + str(e)[:200])
")

if [[ "$PREFLIGHT_STATUS" != "MAX-OK" ]]; then
    echo "[cc-launch] PRE-FLIGHT FAILED" >&2
    echo "[cc-launch] Status: $PREFLIGHT_STATUS" >&2
    echo "[cc-launch] Fix: claude --interaktive (/login → Option 1: Claude-Subscription)" >&2
    echo "[cc-launch] Abgebrochen — kein CC-Start." >&2
    exit 2
fi

echo "[cc-launch] PRE-FLIGHT OK (Max-Subscription aktiv)" >&2
echo "[cc-launch] Starte CC mit Argumenten: $*" >&2

# --- Exec: CC mit User-Args ---
exec "$CLAUDE_BIN" "$@"
