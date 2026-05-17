#!/usr/bin/env bash
# Lernraum-Redesign Smoke-Test
#
# Pflicht-Sequenz:
#   1. python3 tools/lernraum/test_acceptance.py (statisch)
#   2. python -m http.server (lokaler Server fuer HTTP-200-Check)
#   3. curl-Check jede migrierte Page
#   4. Headless-Chrome Screenshots (Desktop/Mobile/Print) — falls verfuegbar
#   5. Cleanup
#
# Aufruf vom Repo-Root weitergehts-online/:
#   ./tools/lernraum/smoketest.sh           # alle Schritte
#   ./tools/lernraum/smoketest.sh --static  # nur Schritt 1
#   ./tools/lernraum/smoketest.sh --no-shots # ohne Headless-Chrome
#
# Exit-Code:
#   0  alle Smokes bestanden
#   1  mindestens ein Smoke fehlgeschlagen

set -uo pipefail
set +m  # Job-Monitoring aus -> keine "Alarm clock"-Job-Notifications von bash
cd "$(dirname "$0")/../.."

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

PORT=${LERNRAUM_TEST_PORT:-8765}
OUT_DIR="tools/lernraum/_smoketest_out"
CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[[ -x "$CHROME_BIN" ]] || CHROME_BIN=$(command -v google-chrome chromium chromium-browser 2>/dev/null | head -n1)

PAGES=(
  "staatsexamen/"
  "staatsexamen/schulrecht/"
  "staatsexamen/schulrecht/5-rechte-pflichten-schueler/"
  "staatsexamen/schulrecht/2-gliederung-bildungssystem/"
  "staatsexamen/schulrecht/8-kooperation/"
  "staatsexamen/fachdidaktik/"
  "staatsexamen/fachdidaktik/n18-sozialkunde/"
  "lerndecks/ke-umsetzungsmatrix-sk/"
  "lerndecks/mp-n18-sk-pruefungsvorbereitung/"
  "lerndecks/ke-matrix-mathe/"
)

VIEWPORTS=("1280,1800" "768,1200" "380,900")

# ---------------------------------------------------------------------------
# CLI-Flags
# ---------------------------------------------------------------------------

STATIC_ONLY=0
NO_SHOTS=0
for arg in "$@"; do
  case "$arg" in
    --static)   STATIC_ONLY=1 ;;
    --no-shots) NO_SHOTS=1 ;;
  esac
done

FAILS=0
fail() { echo "  [FAIL] $1"; FAILS=$((FAILS+1)); }
ok()   { echo "  [OK  ] $1"; }
info() { echo "  ...   $1"; }

# ---------------------------------------------------------------------------
# Schritt 1: Statische Akzeptanz-Suite
# ---------------------------------------------------------------------------

echo "=== [1] Statische Akzeptanz-Suite ==="
if python3 tools/lernraum/test_acceptance.py --quiet; then
  ok "test_acceptance.py: alle Checks bestanden"
else
  fail "test_acceptance.py: mindestens ein FAIL"
fi
echo

if [[ "$STATIC_ONLY" -eq 1 ]]; then
  [[ "$FAILS" -eq 0 ]] && exit 0 || exit 1
fi

# ---------------------------------------------------------------------------
# Schritt 2: Build-Pipeline-Konsistenz
# ---------------------------------------------------------------------------

echo "=== [2] Build-Pipeline-Konsistenz (make lernraum) ==="
if make lernraum > /tmp/lernraum_build.log 2>&1; then
  ok "make lernraum"
else
  fail "make lernraum (siehe /tmp/lernraum_build.log)"
  tail -10 /tmp/lernraum_build.log
fi
echo

# ---------------------------------------------------------------------------
# Schritt 3: Lokaler HTTP-Server + curl-200-Check
# ---------------------------------------------------------------------------

echo "=== [3] HTTP-200-Reachability ==="
python3 -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 &
SERVER_PID=$!
trap 'kill $SERVER_PID 2>/dev/null || true; [[ -d "$OUT_DIR" && "${KEEP_SHOTS:-0}" -ne 1 ]] && rm -rf "$OUT_DIR/.tmp"' EXIT

# Server-Startup abwarten (max 5 s)
for i in 1 2 3 4 5; do
  if curl -s -o /dev/null "http://127.0.0.1:$PORT/" 2>/dev/null; then
    break
  fi
  sleep 1
done

for p in "${PAGES[@]}"; do
  url="http://127.0.0.1:$PORT/$p"
  code=$(curl -s -o /dev/null -w "%{http_code}" "$url" || echo "000")
  if [[ "$code" == "200" ]]; then
    ok "$code $p"
  else
    fail "$code $p"
  fi
done
echo

# ---------------------------------------------------------------------------
# Schritt 4: Headless-Chrome Screenshots
# ---------------------------------------------------------------------------

if [[ "$NO_SHOTS" -eq 1 ]]; then
  echo "=== [4] Screenshots uebersprungen (--no-shots) ==="
elif [[ -z "$CHROME_BIN" ]]; then
  echo "=== [4] Screenshots uebersprungen (Chrome nicht gefunden) ==="
  info "Erwartet unter: /Applications/Google Chrome.app/..."
else
  echo "=== [4] Headless-Chrome Screenshots ==="
  mkdir -p "$OUT_DIR"
  for p in "${PAGES[@]}"; do
    slug=$(echo "$p" | tr '/' '_' | sed 's/_$//' )
    for vp in "${VIEWPORTS[@]}"; do
      vp_label=$(echo "$vp" | tr ',' 'x')
      out="$OUT_DIR/${slug}_${vp_label}.png"
      url="http://127.0.0.1:$PORT/$p"
      "$CHROME_BIN" \
        --headless=new \
        --disable-gpu \
        --hide-scrollbars \
        --window-size="$vp" \
        --screenshot="$out" \
        "$url" > /dev/null 2>&1
      if [[ -f "$out" ]]; then
        size=$(stat -f%z "$out" 2>/dev/null || stat -c%s "$out" 2>/dev/null)
        if [[ "$size" -gt 5000 ]]; then
          ok "$vp_label · $p ($size B)"
        else
          fail "$vp_label · $p (Screenshot zu klein: $size B)"
        fi
      else
        fail "$vp_label · $p (kein Screenshot)"
      fi
    done
  done
  echo
  echo "  Screenshots: $OUT_DIR/"
fi

# ---------------------------------------------------------------------------
# Schritt 5: Smoke-DOM-Pruefung — DOM-dump per Chrome --dump-dom, dann grep
# (timeoutgeschuetzt, max 8 s pro Page)
# ---------------------------------------------------------------------------

if [[ "$NO_SHOTS" -eq 0 && -n "$CHROME_BIN" ]]; then
  echo
  echo "=== [5] DOM-Smoke (data-lernraum-Body nach JS-Boot) ==="
  for p in "${PAGES[@]}"; do
    url="http://127.0.0.1:$PORT/$p"
    dom_out="$OUT_DIR/.dom_${RANDOM}.html"
    # /usr/bin/timeout existiert nicht auf macOS — Perl-Fallback ist robust.
    # alarm-trigger ist by-design (Chrome haengt nach DOM-Dump); Signal-Noise schlucken.
    ( perl -e 'alarm shift; exec @ARGV' 8 \
        "$CHROME_BIN" --headless=new --disable-gpu --no-sandbox \
        --virtual-time-budget=2000 \
        --user-data-dir="$OUT_DIR/.tmp/$RANDOM" \
        --dump-dom "$url" > "$dom_out" 2>/dev/null ) 2>/dev/null || true
    if [[ -s "$dom_out" ]]; then
      # Drill-Tools: kein data-lernraum (v3.4-Erhalt), aber STORAGE_KEY-Migration sichtbar
      if [[ "$p" == lerndecks/* ]]; then
        if grep -q 'LR.Status.migrate' "$dom_out"; then
          ok "dom · lr-migrate-hook present · $p"
        else
          fail "dom · lr-migrate-hook fehlt · $p"
        fi
      else
        if grep -q 'data-lernraum' "$dom_out"; then
          ok "dom · data-lernraum vorhanden · $p"
        else
          fail "dom · data-lernraum fehlt · $p"
        fi
      fi
    else
      fail "dom · kein Output · $p"
    fi
    rm -f "$dom_out"
  done
fi

# ---------------------------------------------------------------------------
# Zusammenfassung
# ---------------------------------------------------------------------------

echo
echo "============================================================"
if [[ "$FAILS" -eq 0 ]]; then
  echo "OK    Alle Smoke-Tests bestanden"
  exit 0
else
  echo "FAIL  $FAILS Smoke-Test(s) fehlgeschlagen"
  exit 1
fi
