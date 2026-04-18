#!/usr/bin/env bash
# tools/deploy-check.sh
# Phase 3.1 Deploy-Preparation Q-Gate (v3.11)
# Prueft DEPLOY-01..DEPLOY-05 gegen das TARGET-Repo-Arbeitsverzeichnis.
#
# Aufruf:  ./tools/deploy-check.sh <game-id>
# Exit:    0 = alle PASS, 1 = mindestens ein FAIL, 2 = infrastruktureller Fehler
#
# Q-Gate-Katalog: architektur/Q-GATE-MECHANIK.md §7.7 (escape-game-generator Repo)
# Vertrag:        architektur/vertraege/VERTRAG_PHASE_3-1_DEPLOY.md
#
# Voraussetzungen: bash, python3 (>=3.8), grep, find, awk

set -u

GAME_ID="${1:-}"
MAPPE_SCOPE="${2:-ALL}"   # optional zweites Argument: konkrete Mappe-Nummer oder ALL (Default)
if [ -z "$GAME_ID" ]; then
  echo "usage: $0 <game-id> [mappe-n|ALL]" >&2
  exit 2
fi

# Repo-Root relativ zum Script (Script liegt in tools/)
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)"
REPO_ROOT="$(cd -- "$SCRIPT_DIR/.." &> /dev/null && pwd)"
cd "$REPO_ROOT" || { echo "cannot cd to repo root: $REPO_ROOT" >&2; exit 2; }

GAME_DIR="escape-games/$GAME_ID"
DATA_JSON="$GAME_DIR/data.json"
GAME_INDEX_HTML="$GAME_DIR/index.html"
LANDING_HTML="index.html"

# Q-GATE-LOG Infrastruktur (P0-A1 / F-RA1-05)
Q_GATE_LOG_DIR="$SCRIPT_DIR/q-gate-log"
Q_GATE_LOG_FILE="$Q_GATE_LOG_DIR/$GAME_ID.log"
mkdir -p "$Q_GATE_LOG_DIR"
SCRIPT_VERSION="$(git -C "$REPO_ROOT" rev-parse --short HEAD 2>/dev/null || echo 'unknown')"

FAIL=0
declare -a RESULTS
declare -a FAILED_GATES

report() {
  # $1 = ID, $2 = PASS|FAIL, $3 = diagnose
  local line="$1: $2 $3"
  RESULTS+=("$line")
  echo "$line"
  if [ "$2" = "FAIL" ]; then
    FAIL=1
    FAILED_GATES+=("$1")
  fi
}

# ------------------------------------------------------------------
# DEPLOY-01: data.json existiert, JSON-valide, Pflichtfelder vorhanden
# ------------------------------------------------------------------
if [ ! -f "$DATA_JSON" ]; then
  report "DEPLOY-01" "FAIL" "$DATA_JSON fehlt"
else
  DEPLOY_01_OUT="$(python3 - "$DATA_JSON" <<'PY' 2>&1
import json, sys
p = sys.argv[1]
try:
    with open(p, 'r', encoding='utf-8') as f:
        d = json.load(f)
except json.JSONDecodeError as e:
    print(f"FAIL JSON-Parse-Fehler: {e}")
    sys.exit(1)
except Exception as e:
    print(f"FAIL Lese-Fehler: {e}")
    sys.exit(1)
meta = d.get("meta", {})
titel = meta.get("titel")
mappen = d.get("mappen", [])
if not isinstance(titel, str) or not titel.strip():
    print("FAIL meta.titel fehlt oder leer")
    sys.exit(1)
if not isinstance(mappen, list) or len(mappen) == 0:
    print("FAIL mappen[] fehlt oder leer")
    sys.exit(1)
print(f"PASS titel=\"{titel}\" mappen.len={len(mappen)}")
PY
  )"
  DEPLOY_01_RC=$?
  if [ "$DEPLOY_01_RC" -eq 0 ]; then
    report "DEPLOY-01" "PASS" "${DEPLOY_01_OUT#PASS }"
  else
    report "DEPLOY-01" "FAIL" "${DEPLOY_01_OUT#FAIL }"
  fi
fi

# ------------------------------------------------------------------
# DEPLOY-02: Alle referenzierten Asset-Pfade existieren
# ------------------------------------------------------------------
if [ ! -f "$DATA_JSON" ]; then
  report "DEPLOY-02" "FAIL" "data.json fehlt (vgl. DEPLOY-01)"
else
  DEPLOY_02_OUT="$(python3 - "$DATA_JSON" "$REPO_ROOT" "$GAME_DIR" <<'PY' 2>&1
import json, os, sys, re

data_json_path = sys.argv[1]
repo_root = sys.argv[2]
game_dir = sys.argv[3]  # escape-games/<game-id>

try:
    with open(data_json_path, 'r', encoding='utf-8') as f:
        d = json.load(f)
except Exception as e:
    print(f"FAIL data.json nicht lesbar: {e}")
    sys.exit(1)

# Heuristik: rekursiv alle String-Werte, die wie Bild/Asset-Pfade aussehen
# (nicht auf Feldnamen basierend, sondern auf Dateiendung + Pfad-Praefix)
asset_ext = re.compile(r"\.(jpg|jpeg|png|webp|svg|gif)$", re.IGNORECASE)
# Praefix: relative Pfade, die auf assets/ oder auf ../../assets/ usw. zeigen
# Absolute URLs (http://, https://) werden ignoriert
abs_url = re.compile(r"^https?://")

found = []

def walk(obj, path=""):
    if isinstance(obj, dict):
        for k, v in obj.items():
            walk(v, f"{path}.{k}" if path else k)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            walk(v, f"{path}[{i}]")
    elif isinstance(obj, str):
        if abs_url.match(obj):
            return
        if asset_ext.search(obj):
            # Exkludiere _meta.wikimedia_dateiname und aehnliche reine Metadaten
            # Diese enthalten meist "File:" als Praefix oder sind keine echten Pfade
            if obj.startswith("File:"):
                return
            found.append((path, obj))

walk(d)

missing = []
dedup = {}
for path, rel in found:
    # Aufloesung: relative Pfade ab dem Spielverzeichnis
    # (weil Game-HTML aus escape-games/<game-id>/ lae1dt)
    if rel.startswith("../../"):
        # ../../assets/... -> repo_root/assets/...
        clean = rel[6:].lstrip("/")
    elif rel.startswith("./"):
        clean = rel[2:]
        clean = os.path.join(game_dir, clean)
    elif rel.startswith("/"):
        clean = rel.lstrip("/")
    else:
        # Interpretation: relativ zum game_dir
        clean = os.path.join(game_dir, rel)
    abs_p = os.path.join(repo_root, clean)
    if abs_p not in dedup:
        dedup[abs_p] = (path, rel)
        if not os.path.isfile(abs_p):
            missing.append(f"{path}={rel}")

total = len(dedup)
if missing:
    print(f"FAIL fehlende Assets: {len(missing)}/{total} - " + "; ".join(missing[:5]))
    sys.exit(1)

print(f"PASS {total} Asset-Refs geprueft, alle vorhanden")
PY
  )"
  DEPLOY_02_RC=$?
  if [ "$DEPLOY_02_RC" -eq 0 ]; then
    report "DEPLOY-02" "PASS" "${DEPLOY_02_OUT#PASS }"
  else
    report "DEPLOY-02" "FAIL" "${DEPLOY_02_OUT#FAIL }"
  fi
fi

# ------------------------------------------------------------------
# DEPLOY-03: Titel-Byte-Identitaet data.json.meta.titel vs. Landing-Page <li>
# ------------------------------------------------------------------
if [ ! -f "$DATA_JSON" ] || [ ! -f "$LANDING_HTML" ]; then
  report "DEPLOY-03" "FAIL" "data.json oder Landing-HTML fehlt"
else
  DEPLOY_03_OUT="$(python3 - "$DATA_JSON" "$LANDING_HTML" "$GAME_ID" <<'PY' 2>&1
import json, re, sys

data_json_path, landing_html_path, game_id = sys.argv[1], sys.argv[2], sys.argv[3]

try:
    with open(data_json_path, 'r', encoding='utf-8') as f:
        d = json.load(f)
    titel_soll = d.get("meta", {}).get("titel", "")
except Exception as e:
    print(f"FAIL data.json unlesbar: {e}")
    sys.exit(1)

if not titel_soll:
    print("FAIL data.json.meta.titel leer")
    sys.exit(1)

try:
    with open(landing_html_path, 'r', encoding='utf-8') as f:
        html_raw = f.read()
except Exception as e:
    print(f"FAIL Landing-HTML unlesbar: {e}")
    sys.exit(1)

# Preprocessing: HTML-Kommentare und <style>/<script>-Bloecke entfernen,
# damit li-Regex nicht in Nicht-Content-Bereiche greift
html = re.sub(r'<!--.*?-->', '', html_raw, flags=re.DOTALL)
html = re.sub(r'<style\b[^>]*>.*?</style>', '', html, flags=re.DOTALL | re.IGNORECASE)
html = re.sub(r'<script\b[^>]*>.*?</script>', '', html, flags=re.DOTALL | re.IGNORECASE)

# Finde <li> das den game_id enthaelt (entweder via id="game-<game-id>" oder href)
li_candidates = re.findall(r'<li\b[^>]*>.*?</li>', html, re.DOTALL)
target_li = None
for cand in li_candidates:
    if f"escape-games/{game_id}" in cand or f'id="game-{game_id}"' in cand:
        target_li = cand
        break

if not target_li:
    print(f"FAIL <li> fuer {game_id} nicht im Landing-HTML")
    sys.exit(1)

# Extrahiere sichtbaren Text: entferne alle Tags
visible_text = re.sub(r'<[^>]+>', ' ', target_li)
# Whitespace-Normalisierung
visible_norm = re.sub(r'\s+', ' ', visible_text).strip()
titel_norm = re.sub(r'\s+', ' ', titel_soll).strip()

if titel_norm in visible_norm:
    print(f"PASS Titel '{titel_norm}' im <li> enthalten")
else:
    print(f"FAIL Titel-Drift: data.json='{titel_norm}' vs. <li>='{visible_norm[:200]}'")
    sys.exit(1)
PY
  )"
  DEPLOY_03_RC=$?
  if [ "$DEPLOY_03_RC" -eq 0 ]; then
    report "DEPLOY-03" "PASS" "${DEPLOY_03_OUT#PASS }"
  else
    report "DEPLOY-03" "FAIL" "${DEPLOY_03_OUT#FAIL }"
  fi
fi

# ------------------------------------------------------------------
# DEPLOY-04: mappen[].length == Anzahl mappe-*.html
# ------------------------------------------------------------------
if [ ! -f "$DATA_JSON" ] || [ ! -d "$GAME_DIR" ]; then
  report "DEPLOY-04" "FAIL" "data.json oder Game-Dir fehlt"
else
  DEPLOY_04_OUT="$(python3 - "$DATA_JSON" "$GAME_DIR" <<'PY' 2>&1
import json, os, re, sys
data_json_path, game_dir = sys.argv[1], sys.argv[2]
try:
    with open(data_json_path, 'r', encoding='utf-8') as f:
        d = json.load(f)
except Exception as e:
    print(f"FAIL data.json unlesbar: {e}")
    sys.exit(1)
mappen = d.get("mappen", [])
json_count = len(mappen)
html_files = [f for f in os.listdir(game_dir) if re.match(r'^mappe-\d+\.html$', f)]
html_count = len(html_files)
if json_count == html_count:
    print(f"PASS data.json.mappen={json_count}, mappe-*.html={html_count}")
else:
    print(f"FAIL data.json.mappen={json_count} aber mappe-*.html={html_count} ({sorted(html_files)})")
    sys.exit(1)
PY
  )"
  DEPLOY_04_RC=$?
  if [ "$DEPLOY_04_RC" -eq 0 ]; then
    report "DEPLOY-04" "PASS" "${DEPLOY_04_OUT#PASS }"
  else
    report "DEPLOY-04" "FAIL" "${DEPLOY_04_OUT#FAIL }"
  fi
fi

# ------------------------------------------------------------------
# DEPLOY-05: Game-index.html existiert + Engine + data.json-Verweis
# ------------------------------------------------------------------
if [ ! -f "$GAME_INDEX_HTML" ]; then
  report "DEPLOY-05" "FAIL" "$GAME_INDEX_HTML fehlt"
else
  if grep -q 'escape-engine' "$GAME_INDEX_HTML" && grep -q 'data\.json' "$GAME_INDEX_HTML"; then
    report "DEPLOY-05" "PASS" "index.html referenziert escape-engine + data.json"
  else
    missing=""
    if ! grep -q 'escape-engine' "$GAME_INDEX_HTML"; then missing="${missing}escape-engine "; fi
    if ! grep -q 'data\.json' "$GAME_INDEX_HTML"; then missing="${missing}data.json"; fi
    report "DEPLOY-05" "FAIL" "fehlende Verweise: $missing"
  fi
fi

# ------------------------------------------------------------------
# DEPLOY-06: Mappe-Struktur-Vollstaendigkeit (sicherung.hefteintrag)
# Prueft, dass jede Mappe die Engine-kritischen Substrukturen enthaelt.
# Eingefuehrt nach Assembly-Defekt: hefteintrag fehlte in sicherung.
# ------------------------------------------------------------------
if [ ! -f "$DATA_JSON" ]; then
  report "DEPLOY-06" "FAIL" "data.json fehlt (vgl. DEPLOY-01)"
else
  DEPLOY_06_OUT="$(python3 - "$DATA_JSON" <<'PY' 2>&1
import json, sys

data_json_path = sys.argv[1]
try:
    with open(data_json_path, 'r', encoding='utf-8') as f:
        d = json.load(f)
except Exception as e:
    print(f"FAIL data.json unlesbar: {e}")
    sys.exit(1)

errors = []
mappen = d.get("mappen", [])
for i, mappe in enumerate(mappen):
    m_id = mappe.get("id", f"mappen[{i}]")

    # 1. einstieg vorhanden
    if not isinstance(mappe.get("einstieg"), dict):
        errors.append(f"{m_id}: einstieg fehlt oder kein Objekt")

    # 2. materialien vorhanden und nicht leer
    mats = mappe.get("materialien", [])
    if not isinstance(mats, list) or len(mats) == 0:
        errors.append(f"{m_id}: materialien fehlt oder leer")

    # 3. aufgaben vorhanden und nicht leer
    aufs = mappe.get("aufgaben", [])
    if not isinstance(aufs, list) or len(aufs) == 0:
        errors.append(f"{m_id}: aufgaben fehlt oder leer")

    # 4. sicherung.hefteintrag als Objekt mit knoten[] und stundenfrage
    sich = mappe.get("sicherung", {})
    if not isinstance(sich, dict):
        errors.append(f"{m_id}: sicherung fehlt oder kein Objekt")
        continue

    he = sich.get("hefteintrag")
    if not isinstance(he, dict):
        errors.append(f"{m_id}: sicherung.hefteintrag fehlt oder kein Objekt")
        continue

    knoten = he.get("knoten", [])
    if not isinstance(knoten, list) or len(knoten) == 0:
        errors.append(f"{m_id}: sicherung.hefteintrag.knoten fehlt oder leer")

    sf = he.get("stundenfrage", "")
    if not isinstance(sf, str) or not sf.strip():
        errors.append(f"{m_id}: sicherung.hefteintrag.stundenfrage fehlt oder leer")

    scpl = he.get("scpl")
    if scpl is None:
        errors.append(f"{m_id}: sicherung.hefteintrag.scpl fehlt")

if errors:
    print("FAIL " + "; ".join(errors[:5]))
    sys.exit(1)

print(f"PASS {len(mappen)} Mappe(n) strukturell vollstaendig (einstieg, materialien, aufgaben, sicherung.hefteintrag)")
PY
  )"
  DEPLOY_06_RC=$?
  if [ "$DEPLOY_06_RC" -eq 0 ]; then
    report "DEPLOY-06" "PASS" "${DEPLOY_06_OUT#PASS }"
  else
    report "DEPLOY-06" "FAIL" "${DEPLOY_06_OUT#FAIL }"
  fi
fi

# ------------------------------------------------------------------
# Gesamt-Urteil + Q-GATE-LOG (P0-A1 / F-RA1-05)
# ------------------------------------------------------------------
echo "---"
TS_UTC="$(date -u +%Y-%m-%dT%H:%M:%SZ)"

if [ "$FAIL" -eq 0 ]; then
  echo "GESAMT: PASS"
  Q_LINE="[Q-GATE-LOG] DEPLOY_CHECK=PASS GAME=$GAME_ID MAPPE=$MAPPE_SCOPE TS=$TS_UTC SCRIPT_VERSION=$SCRIPT_VERSION"
  echo "$Q_LINE"
  echo "$Q_LINE" >> "$Q_GATE_LOG_FILE"
  exit 0
else
  echo "GESAMT: FAIL"
  FAILED_STR="$(IFS=,; echo "${FAILED_GATES[*]}")"
  Q_LINE="[Q-GATE-LOG] DEPLOY_CHECK=FAIL GAME=$GAME_ID MAPPE=$MAPPE_SCOPE TS=$TS_UTC SCRIPT_VERSION=$SCRIPT_VERSION FAILED_GATES=$FAILED_STR"
  echo "$Q_LINE"
  echo "$Q_LINE" >> "$Q_GATE_LOG_FILE"
  exit 1
fi
