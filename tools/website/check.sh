#!/usr/bin/env bash
#
# check.sh — DER Validierungs-Einstiegspunkt fuer die Website-Pflege-Schicht.
#
# Aufgerufen von: pre-commit-Hook (tools/hooks/pre-commit), GitHub-CI (deploy.yml
# validate-Job) und manuell / via `make check`. EINE Quelle, kein duplizierter
# Validierungs-Code.
#
# ZWEI TIERS (bewusst getrennt — Anti-Drift-Regel "nur BLOCK, keine WARN-Inflation"):
#
#   BLOCKING (technische Integritaet — Exit 1 bei FAIL, blockt Commit/Deploy):
#     B1  JSON-Validitaet + Asset-Link-Existenz  (tools/website/check_assets.py)
#     B2  Cache-Bust-Konsistenz                  (bump-assets.py --check)
#     B3  Kein Lehrkraft-Meta im Schueler-DOM    (validate-no-lehrkraft-meta.py)
#     B4  Feedback-/Tipps-Schema je LIVE-Game    (validate-feedback-schema.js, FAIL only)
#
#   ADVISORY (didaktische Generator-Kriterien — NUR Bericht, blockt NIE):
#     A1  Bloom-Verteilung je LIVE-Game          (validate_bloom_distribution.py)
#     A2  Source-Deploy-Parity je LIVE-Game      (source-deploy-parity.sh, falls Artefakte+jq)
#
# LIVE-Games werden aus index.html abgeleitet (selbstpflegend).
#
# Flags:
#   --blocking-only   nur BLOCKING-Tier (schnell; vom pre-commit-Hook genutzt)
#   (default)         BLOCKING + ADVISORY-Bericht
#
# Exit: 0 = alle BLOCKING-Checks PASS, 1 = mindestens ein BLOCKING-FAIL.

set -uo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)"
REPO_ROOT="$(cd -- "$SCRIPT_DIR/../.." &> /dev/null && pwd)"
cd "$REPO_ROOT" || { echo "FATAL: cannot cd to repo root" >&2; exit 1; }

BLOCKING_ONLY=0
[[ "${1:-}" == "--blocking-only" ]] && BLOCKING_ONLY=1

FAIL=0
section() { printf '\n\033[1m── %s\033[0m\n' "$1"; }
ok()      { printf '  \033[32mPASS\033[0m  %s\n' "$1"; }
bad()     { printf '  \033[31mFAIL\033[0m  %s\n' "$1"; FAIL=1; }
note()    { printf '  \033[36mi\033[0m     %s\n' "$1"; }

# LIVE-Games aus der Landing-Page ableiten (bash-3.2-portabel, ohne mapfile)
LIVE_GAMES=()
while IFS= read -r g; do
  [ -n "$g" ] && LIVE_GAMES+=("$g")
done < <(grep -oE 'escape-games/[a-z0-9-]+/' index.html 2>/dev/null \
  | sed 's#escape-games/##; s#/##' | sort -u)

printf '\033[1mweitergehts.online — website check\033[0m\n'
note "LIVE-Games: ${LIVE_GAMES[*]:-<keine>}"

# ───────────────────────── BLOCKING ─────────────────────────
section "BLOCKING — technische Integritaet"

# B1 JSON-Validitaet + Asset-Links
if out=$(python3 tools/website/check_assets.py 2>&1); then ok "$out"; else bad "$out"; fi

# B2 Cache-Bust-Konsistenz
if out=$(python3 tools/website/bump-assets.py --check 2>&1); then
  ok "${out%%$'\n'*}"
else
  bad "Cache-Bust-Drift (siehe unten) — fix: python3 tools/website/bump-assets.py --sync"
  echo "$out" | sed 's/^/      /'
fi

# B3 Kein Lehrkraft-Meta im Schueler-DOM (self-glob ueber alle Games)
if python3 tools/validate-no-lehrkraft-meta.py >/tmp/wcheck_lk.txt 2>&1; then
  ok "kein lehrkraft_meta / trigger_warnung im Schueler-DOM"
else
  bad "Lehrkraft-Meta im Schueler-DOM gefunden:"; sed 's/^/      /' /tmp/wcheck_lk.txt
fi

# B4 Feedback-/Tipps-Schema je LIVE-Game (FAIL blockt, WARN toleriert)
for g in ${LIVE_GAMES[@]+"${LIVE_GAMES[@]}"}; do
  dj="unterricht/escape-games/$g/data.json"
  [[ -f "$dj" ]] || { bad "$g: data.json fehlt"; continue; }
  if node tools/validate-feedback-schema.js "$dj" >/tmp/wcheck_fb.txt 2>&1; then
    ok "$g: feedback/tipps-schema ($(grep -c WARN /tmp/wcheck_fb.txt) WARN toleriert)"
  else
    bad "$g: feedback/tipps-schema FAIL:"; tail -6 /tmp/wcheck_fb.txt | sed 's/^/      /'
  fi
done

# ───────────────────────── ADVISORY ─────────────────────────
if [[ $BLOCKING_ONLY -eq 0 ]]; then
  section "ADVISORY — didaktische Kriterien (blockt NICHT)"

  for g in ${LIVE_GAMES[@]+"${LIVE_GAMES[@]}"}; do
    dj="unterricht/escape-games/$g/data.json"
    [[ -f "$dj" ]] || continue
    if python3 tools/validate_bloom_distribution.py "$dj" >/tmp/wcheck_bl.txt 2>&1; then
      note "$g: bloom-verteilung OK"
    else
      note "$g: bloom-verteilung WARN (Content-Hoheit Generator): $(grep -E 'Policy-FAIL|GESAMT' /tmp/wcheck_bl.txt | head -2 | tr '\n' ' ')"
    fi
  done

  if command -v jq >/dev/null 2>&1; then
    for g in ${LIVE_GAMES[@]+"${LIVE_GAMES[@]}"}; do
      [[ -d "docs/agents/artefakte/$g" ]] || { note "$g: parity uebersprungen (keine Source-Artefakte)"; continue; }
      if ./tools/source-deploy-parity.sh "$g" >/tmp/wcheck_pp.txt 2>&1; then
        note "$g: source-deploy-parity OK"
      else
        note "$g: source-deploy-parity DRIFT — $(tail -1 /tmp/wcheck_pp.txt)"
      fi
    done
  else
    note "parity uebersprungen (jq nicht installiert)"
  fi
fi

# ───────────────────────── VERDIKT ─────────────────────────
section "Verdikt"
if [[ $FAIL -eq 0 ]]; then
  printf '  \033[32m✓ BLOCKING-Tier GRUEN\033[0m — bereit fuer commit/deploy.\n\n'
  exit 0
else
  printf '  \033[31m✗ BLOCKING-Tier ROT\033[0m — commit/deploy blockiert. Defekte oben beheben.\n\n'
  exit 1
fi
