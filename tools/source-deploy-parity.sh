#!/usr/bin/env bash
#
# source-deploy-parity.sh — Q-SOURCE-DEPLOY-PARITY-Check
#
# Prüft für ein Game, ob alle Caption-Felder in Source-JSONs (mat-*.json)
# mit den entsprechenden Einträgen in data.json übereinstimmen.
#
# Usage: ./tools/source-deploy-parity.sh <game-id>
#
# Exit-Codes:
#   0 = PASS (alle Captions/Quellen synchron)
#   1 = FAIL (Drift erkannt)
#   2 = Fehler (Game nicht gefunden, jq nicht installiert, etc.)
#
# Empfohlen als Regression-Guard bei Re-Assembly-Operationen.

set -euo pipefail

GAME_ID="${1:-}"

if [[ -z "$GAME_ID" ]]; then
  echo "❌ Usage: $0 <game-id>" >&2
  exit 2
fi

# Pfade
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SOURCE_DIR="$REPO_ROOT/docs/agents/artefakte/$GAME_ID"
DATA_JSON="$REPO_ROOT/escape-games/$GAME_ID/data.json"

# Checks
if ! command -v jq >/dev/null 2>&1; then
  echo "❌ jq nicht installiert. brew install jq" >&2
  exit 2
fi

if [[ ! -d "$SOURCE_DIR" ]]; then
  echo "❌ Source-Verzeichnis nicht gefunden: $SOURCE_DIR" >&2
  exit 2
fi

if [[ ! -f "$DATA_JSON" ]]; then
  echo "❌ data.json nicht gefunden: $DATA_JSON" >&2
  exit 2
fi

echo "🔍 Source-Deploy-Parity-Check für Game: $GAME_ID"
echo "   Source: $SOURCE_DIR"
echo "   Deploy: $DATA_JSON"
echo ""

FAIL_COUNT=0

# Alle mat-*.json in allen Mappen durchlaufen
while IFS= read -r -d '' MAT_JSON; do
  MAT_ID="$(jq -r '.id // empty' "$MAT_JSON")"

  if [[ -z "$MAT_ID" ]]; then
    echo "⚠️  SKIP: $MAT_JSON (kein .id Feld)"
    continue
  fi

  # Relevante Felder aus Source extrahieren
  SOURCE_CAPTION="$(jq -r '.bildunterschrift // empty' "$MAT_JSON")"
  SOURCE_QUELLE="$(jq -r '.quelle // empty' "$MAT_JSON")"
  SOURCE_TITEL="$(jq -r '.titel // empty' "$MAT_JSON")"

  # Nur prüfen, wenn es Caption-Felder gibt
  if [[ -z "$SOURCE_CAPTION" && -z "$SOURCE_QUELLE" ]]; then
    # Kein bildunterschrift oder quelle → nicht relevant für diesen Check
    continue
  fi

  # Entsprechenden Eintrag in data.json suchen (mit robuster Fehlerbehandlung)
  DEPLOY_CAPTION="$(jq -r --arg id "$MAT_ID" '
    recurse | objects | select(.id == $id) | .bildunterschrift // empty
  ' "$DATA_JSON" 2>/dev/null | head -n 1)"

  DEPLOY_QUELLE="$(jq -r --arg id "$MAT_ID" '
    recurse | objects | select(.id == $id) | .quelle // empty
  ' "$DATA_JSON" 2>/dev/null | head -n 1)"

  DEPLOY_TITEL="$(jq -r --arg id "$MAT_ID" '
    recurse | objects | select(.id == $id) | .titel // empty
  ' "$DATA_JSON" 2>/dev/null | head -n 1)"

  if [[ -z "$DEPLOY_CAPTION" && -z "$DEPLOY_QUELLE" && -z "$DEPLOY_TITEL" ]]; then
    echo "⚠️  SKIP: $MAT_ID (nicht in data.json gefunden)"
    continue
  fi

  # Vergleich
  MISMATCH=""

  if [[ "$SOURCE_CAPTION" != "$DEPLOY_CAPTION" ]]; then
    MISMATCH="caption"
  fi

  if [[ "$SOURCE_QUELLE" != "$DEPLOY_QUELLE" ]]; then
    if [[ -n "$MISMATCH" ]]; then
      MISMATCH="$MISMATCH+quelle"
    else
      MISMATCH="quelle"
    fi
  fi

  if [[ "$SOURCE_TITEL" != "$DEPLOY_TITEL" ]]; then
    if [[ -n "$MISMATCH" ]]; then
      MISMATCH="$MISMATCH+titel"
    else
      MISMATCH="titel"
    fi
  fi

  if [[ -n "$MISMATCH" ]]; then
    echo "❌ DRIFT: $MAT_ID ($MISMATCH)"
    echo "   Source: $(basename "$MAT_JSON")"
    echo "   Deploy: data.json"
    FAIL_COUNT=$((FAIL_COUNT + 1))
  else
    echo "✅ SYNC:  $MAT_ID"
  fi

done < <(find "$SOURCE_DIR" -type f -name "mat-*.json" -print0)

echo ""
if [[ $FAIL_COUNT -eq 0 ]]; then
  echo "✅ PASS: Alle Source-JSONs synchron mit data.json"
  exit 0
else
  echo "❌ FAIL: $FAIL_COUNT Drift(s) erkannt"
  exit 1
fi
