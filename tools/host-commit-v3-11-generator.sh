#!/usr/bin/env bash
# tools/host-commit-v3-11-generator.sh
# Host-Terminal-Commit-Script fuer v3.11 Deploy-State-Machine Artefakte
# im escape-game-generator-Repo.
#
# Grund fuer Host-Terminal-Ausfuehrung:
# Die Cowork-Sandbox kann wegen Virtiofs-Git-Lock keine Commits im
# escape-game-generator-Repo durchfuehren (stale .git/index.lock kann nicht
# entfernt werden). Dieser Commit MUSS daher vom User im Host-Terminal
# ausgefuehrt werden.
#
# Voraussetzung: cd in ~/weitergehts.online/escape-game-generator
# Ausfuehrung:   bash <kopierter Inhalt>  ODER  Zeilen einzeln paste

set -e

# Assumption: aktuelles Verzeichnis ist escape-game-generator-Repo-Root
if [ ! -f "PROJECT_INSTRUCTIONS.md" ] || [ ! -d "architektur/vertraege" ]; then
  echo "FEHLER: Dieses Script muss im escape-game-generator-Repo-Root laufen." >&2
  echo "cd ~/weitergehts.online/escape-game-generator   # oder analog" >&2
  exit 1
fi

# Pre-Check: Zeige was committet wird
echo "=== git status vor Commit ==="
git status --short

echo ""
echo "=== Pre-Check: Erwartete v3.11-Dateien ==="
for f in \
  "PROJECT_INSTRUCTIONS.md" \
  "agents/PFAD_MANIFEST.md" \
  "architektur/Q-GATE-MECHANIK.md" \
  "architektur/vertraege/VERTRAG_PHASE_3-1_DEPLOY.md"
do
  if [ -e "$f" ]; then
    echo "  OK  $f"
  else
    echo "  FEHLT  $f"
    exit 2
  fi
done

echo ""
read -p "Stage + Commit der 4 v3.11-Dateien durchfuehren? [y/N] " yn
case "$yn" in
  [yY]*) ;;
  *) echo "Abbruch."; exit 0;;
esac

git add \
  PROJECT_INSTRUCTIONS.md \
  agents/PFAD_MANIFEST.md \
  architektur/Q-GATE-MECHANIK.md \
  architektur/vertraege/VERTRAG_PHASE_3-1_DEPLOY.md

git commit -m "$(cat <<'EOF'
v3.11 Deploy-State-Machine: PI + Vertrag + Q-Gate-Katalog

Schliesst die Strukturluecke zwischen Phase 3.0 Assembly (Claude Code)
und Live-Schaltung. Baut den Gate-Mechanismus, der die Klasse von
Defekten strukturell blockt, die den Marne-Deploy 3fda51d-Heilungs-Commit
noetig machte.

Q-Entscheidungen: Q1=a CSS Feature-Flag, Q2=b Smoketest optional,
Q3=c Retro-Log nur Marne, Q4=a Phase-3-Renumbering, Q5=c v3.10-Followups
verschoben.

T1 — PI-State-Machine + Vertrag:
- PROJECT_INSTRUCTIONS.md v2.6 -> v2.7: Zeile 19 (3.0 Assembly) + 4 neue
  Steuerzeilen 20-23: 3.1 Deploy-Preparation (Cowork, deploy-check.sh,
  Q-GATE-LOG game-scope, Staging-Flag setzen), 21 USER-VALIDIERUNG
  LIVE-FREIGABE (?staging=1 Flow), 22 3.2 Live-Go (Staging-Flag
  entfernen, Commit, push durch User, optional smoketest,
  MAPPEN_ABGESCHLOSSEN++ HIER), 23 Verzweigung.
- SELBST-AKTUALISIERUNG Punkt 4: MAPPEN_ABGESCHLOSSEN++ verschoben von
  Zeile 19 nach Zeile 22 — Assembly alleine markiert keine Mappe mehr
  als abgeschlossen, erst Live-Schaltung.
- STATE-ADVANCE-VERTRAG erweitert um Bedingung 5 (Phase 3.1 DEPLOY-01..05
  wortwoertlich) und Bedingung 6 (Phase 3.2 STAGING-FLAG-ENTFERNT +
  COMMIT-SHA + optional POST-DEPLOY-SMOKETEST).
- Neuer Vertrag architektur/vertraege/VERTRAG_PHASE_3-1_DEPLOY.md mit
  §1 Vorbedingungen, §2 Ausfuehrung (2.1 Script-Aufruf, 2.2 Log-Format,
  2.3 Staging-Flag-Prozedur), §3 FAIL-PROTOKOLL mit Gate-spezifischer
  Ruecklauf-Zuordnung, §4 Nachbedingungen, §5 Referenzen.
- agents/PFAD_MANIFEST.md: 3 neue Eintraege
  (VERTRAG_PHASE_3-1_DEPLOY.md, {TARGET}/tools/deploy-check.sh,
  {TARGET}/tools/post-deploy-smoketest.sh).

T2 — Q-Gate-Katalog:
- architektur/Q-GATE-MECHANIK.md §7.7 Deploy-Preparation-Q-Gate (Phase
  3.1): DEPLOY-01 (data.json valide + Pflichtfelder), DEPLOY-02
  (Asset-Referenzen existieren, extension-basiert), DEPLOY-03
  (Titel-Byte-Identitaet data.json.meta.titel <-> Landing-<li>),
  DEPLOY-04 (len(mappen[]) == mappe-*.html Count), DEPLOY-05
  (Game-index.html referenziert escape-engine + data.json).
- architektur/Q-GATE-MECHANIK.md §7.8 Live-Go-Q-Gate (Phase 3.2):
  LIVE-01 STAGING-FLAG-ENTFERNT, LIVE-02 COMMIT-SHA-vorhanden,
  LIVE-03 POST-DEPLOY-SMOKETEST (optional per Q2=b).
- Hinweis: Plan nannte initial §7.4, war aber bereits durch
  Cross-Konsistenz belegt. Tatsaechliche Einsatzorte: §7.7 + §7.8.

Scripts + T3 CSS Feature-Flag + T4 Retro-Log + Smoketests liegen im
TARGET-Repo (weitergehts-online, Commit 775f1c1):
- tools/deploy-check.sh + tools/post-deploy-smoketest.sh
- index.html mit li[data-status=staging] CSS-Flag + ?staging=1 Head-Script
- docs/agents/artefakte/verlauf-erster-weltkrieg-marne-ende/Q-GATE-LOG_PHASE_3.md
- Smoketests D1/D2/D3 strukturell bestaetigt, fand dabei realen
  Folge-Defekt (ursachen-Titel-Drift, P1 Mini-Korrektur geplant).
EOF
)"

echo ""
echo "=== Commit erfolgt ==="
git log --oneline -3
echo ""
echo "=== Push (nur wenn du die main-Branch pushen willst) ==="
echo "git push origin main"
