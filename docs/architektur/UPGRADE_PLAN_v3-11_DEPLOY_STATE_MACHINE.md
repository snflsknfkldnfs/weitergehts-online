# UPGRADE_PLAN v3.11: Deploy-State-Machine-Binding

**Datum:** 2026-04-10
**Ausloeser:** Ad-hoc-Befund nach v3.10-Umsetzung — User fragte, ob es ein Bug sei, dass Verlauf-Game Mappe 1 nicht live ist. Tatsaechlich: strukturelle Luecke. `escape-games/verlauf-erster-weltkrieg-marne-ende/` war nach Phase 3.0 Assembly nie committed, Landing-Page-`<li>`-Eintrag fehlte ebenfalls. Manuelle Wiederherstellung in derselben Session (Commits `1a13fce` + `3fda51d` in weitergehts-online).
**Scope:** Dual-Root — primaer `escape-game-generator/` (PI, neuer Vertrag, Q-GATE-MECHANIK), sekundaer `weitergehts-online/` (deploy-check-Script, Landing-Page-CSS optional, Retro-Q-GATE-LOG-Nachtraege fuer zwei bestehende Games).
**Ziel:** Strukturelle Schliessung der Luecke zwischen Phase 3.0 Assembly und Live-Schaltung. Die informelle Schritt-Kette "Assembly → committen → Landing-Page-Patch → pushen → hoffen-dass-alles-funktioniert" wird in den PI-Zustandsautomaten integriert, an ein Q-Gate gebunden und um ein explizites User-Review-Gate erweitert.
**Priorisierung:** Vor naechster Produktion (Mappe 2 Verlauf-Game Assembly), vor v4-Produktionsarchitektur-Fortsetzung. Analog zum v3.10-Muster: Governance-Patch, kein Feature.
**Verantwortlich:** Paul (PM), KI-Session-Ausfuehrung via Cowork
**Bezug:** v3.10 Generator-Hardening abgeschlossen (T1/T2/T3/T4 + Smoketests); v3.11 wendet dieselbe State-Machine-Binding-Logik auf die Deploy-Kette an.

---

## 1. Anlass

### 1.1 Befund

Am 2026-04-10 (nach Abschluss v3.10) wurde festgestellt, dass das Escape-Game `verlauf-erster-weltkrieg-marne-ende` in keiner bisherigen Produktionsschleife tatsaechlich live geschaltet wurde, obwohl Phase 3.0 Assembly fuer Mappe 1 nachweislich gelaufen war. Die Dateien (`escape-games/verlauf-erster-weltkrieg-marne-ende/data.json`, `index.html`, `lehrkraft.html`, `mappe-1.html`) existierten lokal im Arbeitsverzeichnis, waren aber **untracked** — nie `git add`/`commit`. Das zugehoerige Asset `assets/img/verlauf-erster-weltkrieg-marne-ende/img-1-1.jpg` ebenso untracked. Die Root-Landing-Page `index.html` enthielt nur den Link auf das erste Game (`gpg-erster-weltkrieg-ursachen`), der Verlauf-Game-Eintrag fehlte komplett.

Manuelle Wiederherstellung in derselben Session:
- Commit `1a13fce`: `deploy: Verlauf-Game Mappe 1 live schalten` — 5 Dateien, 1523 Insertions.
- Commit `3fda51d`: `deploy: Verlauf-Game Landing-Page-Link nachgezogen` — 1 Datei, 5 Insertions.

Der Titel-String auf der Landing-Page musste dabei durch Claude raten (`"Vom Schlieffen-Plan zum Stellungskrieg"` als erste Annahme) und dann durch Nachlesen von `data.json → meta.titel` korrigiert werden (`"Der Erste Weltkrieg — Verlauf von der Marne bis zum Ende"`). Dieser Einzelfall zeigt: jede manuelle Live-Schaltung ist eine potenzielle Drift-Quelle fuer Titel-Inkonsistenz zwischen Game und Landing-Page.

### 1.2 Muster-Erkennung

Der Defekt ist **symptomatisch**, nicht kasuistisch. Er folgt demselben Muster wie die drei v3.10-Befunde:

| v3.10-Defekt | v3.11-Defekt |
|---|---|
| State-Advance ohne Q-Gate-Log-Bindung (N1) | Live-Go ohne Deploy-Q-Gate-Bindung |
| Schema-Strip-Bypass ohne Audit-Spur (H1/N2) | Commit-Schritt und Landing-Page-Patch ohne Audit-Spur |
| Lemma-Redundanz weil Regel fehlt (M1) | Titel-Inkonsistenz weil Regel fehlt |

Gemeinsamer Nenner: **Jeder Schritt, der _ausserhalb_ des PI-Zustandsautomaten lebt — weil informell, weil "selbstverstaendlich", weil "mache ich spaeter manuell" — ist eine Drift-Quelle.** v3.10 hat drei solche Schritte in die State Machine geholt. v3.11 holt die Deploy-Kette.

### 1.3 Was dieses Upgrade NICHT ist

- Kein Engine-Umbau (`escape-engine.js` bleibt unberuehrt).
- Kein Wechsel des Deploy-Targets (GitHub Pages bleibt, kein Cloudflare/Netlify/Custom).
- Keine CI-Pipeline-Neuarchitektur (bestehende `.github/workflows/deploy.yml` bleibt).
- Kein Versionierungs-Schema fuer Game-Staende (z.B. `v1.0.0`-Tags pro Release) — eigenes Folgeprojekt, falls Audit-Archaeologie noch drueckender wird.
- Keine Peer-Review-Workflows (Pull-Request-basiert). Solo-Betrieb-Annahme bleibt.
- Keine Retro-Migration der `gpg-erster-weltkrieg-ursachen`-Mappen durch alle vergangenen Zustaende. Forward-only, siehe Q-Entscheidung unten.

### 1.4 Was dieses Upgrade ist

Strukturelle Integration der Deploy-Kette in den PI-Zustandsautomaten, sodass:
1. Der Uebergang von Phase 3.0 (Assembly) zu "Live" nicht mehr informell moeglich ist.
2. Ein Deploy-Q-Gate (DEPLOY-01..05) die haeufigsten Live-Schaltungs-Defekte strukturell blockt.
3. Ein automatisierbares `deploy-check.sh` die Q-Gate-Kriterien deterministisch pruefen kann.
4. Ein User-Review-Gate (leichtgewichtig via Feature-Flag-Attribut, optional staerker) einen expliziten Checkpoint zwischen "technisch deploy-fertig" und "oeffentlich sichtbar" einzieht.

---

## 2. Befundmatrix

| ID | Schwere | Artefakt (Evidenz) | Kategorie | Kanonischer Fix | Track |
|---|---|---|---|---|---|
| **D1** | HIGH | `PROJECT_INSTRUCTIONS.md` Uebergangstabelle endet faktisch bei Phase 3.0 Assembly, kein Folgeschritt | State-Machine-Luecke | neue Phase 3.1 "Deploy-Preparation" | T1 |
| **D2** | HIGH | `index.html` (Root) ist kein gefuehrtes Steuerungsartefakt, Patch informell | Governance-Luecke | Landing-Page als Exit-Kriterium in VERTRAG_PHASE_3-1 | T1 |
| **D3** | HIGH | Kein Q-Gate zwischen `escape-games/<game-id>/` + `assets/` + Landing-Page und Live-Push | Validierungs-Luecke | neuer Q-Gate-Katalog DEPLOY-01..05 in `Q-GATE-MECHANIK.md` §7.4 | T2 |
| **D4** | HIGH | Keine explizite User-Review-Gate-Zaesur zwischen technisch-fertig und oeffentlich | Review-Luecke | Feature-Flag-Attribut in Landing-Page + zweistufiger Deploy | T3 |
| **D5** | MID | Kein Post-Deploy-Verifikations-Mechanismus (HTTP-Check auf kanonische URLs) | Observability-Luecke | optionaler Post-Deploy-Smoketest-Block, Teil von T2 | T2 |
| **D6** | MID | Titel-Drift moeglich zwischen `data.json → meta.titel` und Landing-Page-`<li>` (heute bereits passiert: Claude riet den falschen Titel) | Datenkonsistenz-Luecke | DEPLOY-03 Titel-Identitaets-Pruefung | T2 |
| **D7** | LOW | Keine Versionierungs-Semantik fuer Game-Staende (welcher Release war live als Testlauf X lief?) | Audit-Luecke | eigenes Folgeprojekt, Non-Scope v3.11 | — |

**Nicht in der Matrix (bereits heute behoben, Einzelfall-Fix):**
- Der ad-hoc-Commit-Nachzug in `weitergehts-online` (`1a13fce` + `3fda51d`) hat den akuten Defekt fuer Verlauf-Game Mappe 1 beseitigt. v3.11 setzt auf diesem State auf.

---

## 3. Tracks

### T1 — Phase 3.1 "Deploy-Preparation" im PI-Zustandsautomaten (v3.11.1)

**ID:** T1 — PI-DEPLOY-PHASE
**Schwere:** HIGH
**Ziel:** Die bisher informelle Schrittfolge "Assembly → committen → Landing-Page-Patch → pushen" wird eine explizite Phase im PI, mit eigenem Vertrag, eigenen Exit-Kriterien und STATE-ADVANCE-VERTRAG-Bindung wie v3.10.1.

**Grundlage:** D1, D2. Ohne diese Phase ist jeder Live-Schaltungs-Schritt ein Governance-Blindfleck.

**File-Ownership:**
- `escape-game-generator/PROJECT_INSTRUCTIONS.md` — Uebergangstabelle um eine Zeile erweitern, STATE-ADVANCE-VERTRAG um Phase-3.1-Eintrag ergaenzen
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_3-1_DEPLOY.md` — NEU, vollstaendiger Vertrag analog zu 2-0/2-1/2-1c
- `escape-game-generator/architektur/PFAD_MANIFEST.md` — neuen Vertrag aufnehmen
- `escape-game-generator/agents/ORCHESTRATOR.md` — Querverweis auf Phase 3.1 (falls ORCHESTRATOR dort etwas fuehrt)

**Konkrete Aenderungen:**

**A) PI-Uebergangstabelle neue Zeile (nach bestehendem Phase-3.0-Eintrag):**
```
| <N+1> | 3.0 | 3.1 Deploy-Preparation [game-id]/[mappe-N]
        | VERTRAG_PHASE_3-1_DEPLOY.md
        | Cowork
        | Deploy-Q-Gate DEPLOY-01..05 PFLICHT. Q-GATE-LOG.md
          Abschnitt "Phase 3.1" am projektweiten Pfad
          (docs/agents/artefakte/<game-id>/Q-GATE-LOG.md — NICHT
          mappenbezogen, weil Landing-Page + Game-Index game-weit
          sind). Exit: Staging-Commit existiert, KEIN git push.
          STATE-ADVANCE-VERTRAG bindet wie v3.10.1. |
```

Plus eine zweite neue Zeile fuer den finalen Live-Schritt:
```
| <N+2> | 3.1 | 3.2 Live-Go [game-id]
        | VERTRAG_PHASE_3-1_DEPLOY.md §Live-Gate
        | User (manuell, explizit)
        | git push nach User-Review-Freigabe.
          Post-Deploy-Smoketest optional (siehe T2). |
```

Rationale fuer die Zweistufigkeit: Phase 3.1 = technische Deploy-Preparation (pruefbar automatisch), Phase 3.2 = User-Entscheidung (pruefbar nur durch User). Der Uebergang 3.1 → 3.2 ist der einzige Phasen-Uebergang im gesamten PI-Automaten, der explizit User-gebunden ist, nicht KI-gebunden. Das ist architektonisch sauber und macht die User-Verantwortung sichtbar.

**B) STATE-ADVANCE-VERTRAG Erweiterung (PI §292-307):**
```
Die State-Advance-Pflicht gilt fuer Phase 3.1 analog: LETZTE_PHASE := "Zeile <N+1> — 3.1 Deploy-Preparation <game-id>/<mappe-N> PASS"
darf nur gesetzt werden, wenn
(a) Q-GATE-LOG-Block "Phase 3.1" unter docs/agents/artefakte/<game-id>/Q-GATE-LOG.md existiert,
(b) enthaelt Gesamturteil: PASS mit allen DEPLOY-01..05 Zeilen = PASS,
(c) Staging-Commit-SHA im Pflicht-Kommentar referenziert.

Die Phase 3.2 hat keinen KI-seitigen State-Advance. Der Uebergang "3.1 PASS → 3.2 Live" wird **nicht** vom Agenten protokolliert, sondern vom User durch `git push` ausgeloest. Der push ist der State-Advance.
```

**C) Neuer `VERTRAG_PHASE_3-1_DEPLOY.md` — Struktur analog zu VERTRAG_PHASE_2-1_MATERIAL.md:**
```
# Vertrag Phase 3.1 — Deploy-Preparation

## Zweck
Vollstaendige technische Vorbereitung der Live-Schaltung eines Games oder einer neu produzierten Mappe, ohne dabei bereits den oeffentlichen Zustand zu beruehren.

## Eingaben
- Phase 3.0 Assembly PASS (siehe VERTRAG_PHASE_3_ASSEMBLY.md)
- Assembled Output in escape-games/<game-id>/ (index.html, data.json, lehrkraft.html, mappe-N.html je produzierter Mappe)
- Assets in assets/img/<game-id>/

## Pflichtschritte
1. Ziel-Ordner-Check: escape-games/<game-id>/ existiert und enthaelt Mindest-Dateisatz
2. Asset-Ordner-Check: assets/img/<game-id>/ existiert und enthaelt alle in data.json referenzierten Bilddateien
3. Landing-Page-Pflege: Root index.html enthaelt <li>-Eintrag mit href="escape-games/<game-id>/index.html" und Link-Text == data.json → meta.titel (byte-genau)
4. data.json Schema-Validation (JSON-valide, game-data-schema.json konform wenn vorhanden)
5. Deploy-Q-Gate DEPLOY-01..05 durchlaufen (siehe Q-GATE-MECHANIK §7.4)
6. Q-GATE-LOG-Eintrag "Phase 3.1" schreiben, Gesamturteil gemaess Ergebnis
7. Staging-Commit erstellen mit Message-Prefix `deploy(<game-id>/mappe-N): ...`
8. KEIN git push — explizit dem User vorbehalten

## Exit-Kriterien
- [x] Alle sieben Pflichtschritte ausgefuehrt
- [x] Q-GATE-LOG "Phase 3.1" Gesamturteil: PASS
- [x] Staging-Commit-SHA im Q-GATE-LOG-Block referenziert
- [x] PI State-Block reflektiert PASS via STATE-ADVANCE-VERTRAG (Schritt 9, nach 8)

## §Live-Gate (Phase 3.2)
- User pruefft:
  - Staging-URL `<domain>/?staging=1` (siehe T3 Feature-Flag) ODER lokaler Preview
  - Q-GATE-LOG "Phase 3.1" Block verifiziert
- User fuehrt git push aus
- Post-Deploy-Smoketest (optional, siehe T2): HTTP-Check kanonische URLs
```

**Akzeptanzkriterien:**
1. PI v2.7 enthaelt neue Uebergangstabellen-Zeilen 3.1 + 3.2 (verifizierbar per grep).
2. STATE-ADVANCE-VERTRAG deckt Phase 3.1 explizit ab (grep auf "Phase 3.1" im Vertragstext).
3. `VERTRAG_PHASE_3-1_DEPLOY.md` existiert unter `architektur/vertraege/` mit allen Pflichtschritten.
4. `PFAD_MANIFEST.md` listet den neuen Vertrag.

**Aufwand:** ~2 h Dokument-Edits + Vertragsentwurf.

**Dependencies:** v3.10.1 STATE-ADVANCE-VERTRAG muss existieren (ist der Fall).

**Rollback:** Revert der PI- + Vertrag-Edits, Loeschen der neuen Vertragsdatei.

---

### T2 — Deploy-Q-Gate DEPLOY-01..05 + deploy-check.sh (v3.11.2)

**ID:** T2 — DEPLOY-Q-GATE
**Schwere:** HIGH
**Ziel:** Konkrete, deterministisch pruefbare Q-Gate-Kriterien fuer Phase 3.1, plus ein automatisierbares Shell-Script das die Kriterien mechanisch fahren kann.

**Grundlage:** D3, D5, D6. Ohne konkrete Kriterien ist das neue Vertragswerk T1 ein blosses Formular.

**File-Ownership:**
- `escape-game-generator/architektur/Q-GATE-MECHANIK.md` — neue Sektion §7.4 "Deploy-Q-Gate"
- `weitergehts-online/tools/deploy-check.sh` — NEU, Bash-Script (oder Python fuer Plattform-Unabhaengigkeit)
- `weitergehts-online/tools/README.md` — kurze Tool-Dokumentation, Aufruf-Syntax

**Konkrete Aenderungen:**

**A) Q-GATE-MECHANIK.md §7.4 — Deploy-Q-Gate-Katalog:**

| ID | Kriterium | Pruef-Art | FAIL-Bedingung |
|---|---|---|---|
| DEPLOY-01 | data.json ist JSON-valide | SCHEMA | `json.loads(data.json)` raises |
| DEPLOY-02 | Alle Asset-Referenzen in data.json aufloesbar | CONSISTENCY | Mindestens eine referenzierte Datei (img-*.jpg, img-*.png, img-*.svg, img-*.webp) existiert nicht unter `assets/img/<game-id>/` oder `escape-games/<game-id>/` |
| DEPLOY-03 | Landing-Page-Identitaet | CONSISTENCY | Root `index.html` enthaelt keinen `<li><a href="escape-games/<game-id>/index.html">...</a></li>`, ODER Link-Text-Normalisierung ungleich `data.json → meta.titel` Normalisierung (Whitespace-collapse, Lowercase-Vergleich optional), ODER mehrfache Eintraege fuer denselben Game-Pfad |
| DEPLOY-04 | Mappen-Count-Konsistenz | CONSISTENCY | Anzahl `mappe-*.html` im Game-Verzeichnis != `len(data.json → mappen)`, ODER `mappe-N.html` fehlt fuer eine produzierte Mappe |
| DEPLOY-05 | Game-Index-Renderbarkeit | HEURISTIC | `index.html` + `lehrkraft.html` fehlen, ODER referenzieren `../../assets/css/base.css` oder `../../assets/js/core.js` als kaputten relativen Pfad, ODER Game-Titel in `data.json` ist leer/null |

Pruef-Reihenfolge: DEPLOY-01 zuerst (wenn FAIL, alle anderen SKIPPED). DEPLOY-02..05 in beliebiger Reihenfolge.

Gesamturteil: Nur PASS wenn alle 5 Kriterien PASS. Ein FAIL = Block fuer Phase-3.1-PASS-Marker.

**B) Log-Format-Erweiterung (Q-GATE-MECHANIK §8):**

Neuer Abschnittstyp `Phase 3.1` in `Q-GATE-LOG.md`:
```
## Phase 3.1 — Deploy-Preparation <game-id>/<mappe-N>
**Datum:** YYYY-MM-DD
**Vertrag:** architektur/vertraege/VERTRAG_PHASE_3-1_DEPLOY.md
**Katalog:** architektur/Q-GATE-MECHANIK.md §7.4
**Staging-Commit:** <SHA oder PENDING>
**Gesamturteil:** PENDING|PASS|FAIL

| # | ID | Kriterium | Kategorie | Urteil | Evidenz |
|---|---|---|---|---|---|
| 1 | DEPLOY-01 | data.json JSON-valide | SCHEMA | PASS | json.loads OK |
| 2 | DEPLOY-02 | Asset-Refs aufloesbar | CONSISTENCY | PASS | 1 Ref, 1 Datei gefunden |
| 3 | DEPLOY-03 | Landing-Page-Identitaet | CONSISTENCY | PASS | titel-match byte-genau |
| 4 | DEPLOY-04 | Mappen-Count | CONSISTENCY | PASS | 1 = 1 |
| 5 | DEPLOY-05 | Game-Index-Renderbarkeit | HEURISTIC | PASS | Pfade ok, Titel gesetzt |
```

**C) `tools/deploy-check.sh` — Referenz-Implementation:**
```bash
#!/usr/bin/env bash
# deploy-check.sh — Phase 3.1 Deploy-Q-Gate Pruefer
# Usage: ./tools/deploy-check.sh <game-id>
# Exit 0 = PASS, != 0 = FAIL
# Output ist Q-GATE-LOG-kompatibel (Markdown-Tabellen-Zeilen)

set -euo pipefail
GAME_ID="${1:?Game-ID als erstes Argument erforderlich}"
GAME_DIR="escape-games/${GAME_ID}"
ASSET_DIR="assets/img/${GAME_ID}"
ROOT_INDEX="index.html"

# DEPLOY-01 data.json JSON-valide
python3 -m json.tool "${GAME_DIR}/data.json" > /dev/null 2>&1 \
  && D01=PASS || D01=FAIL

if [ "$D01" = "FAIL" ]; then
  echo "DEPLOY-01 FAIL — data.json nicht JSON-valide"
  exit 1
fi

# DEPLOY-02 Asset-Referenzen aufloesbar
D02=$(python3 -c "
import json, os, sys, re
data = json.load(open('${GAME_DIR}/data.json'))
refs = set(re.findall(r'img-[0-9a-z-]+\.(?:jpg|png|svg|webp)', json.dumps(data)))
missing = [r for r in refs if not any(os.path.exists(os.path.join(base, r)) for base in ['${ASSET_DIR}', '${GAME_DIR}'])]
print('FAIL' if missing else 'PASS')
sys.stderr.write('Missing: ' + ','.join(missing) + '\n' if missing else '')
")

# DEPLOY-03 Landing-Page-Identitaet
D03=$(python3 -c "
import json, re
data = json.load(open('${GAME_DIR}/data.json'))
titel = data['meta']['titel'].strip()
with open('${ROOT_INDEX}') as f:
    html = f.read()
pattern = r'<a\s+href=\"escape-games/${GAME_ID}/index\.html\">\s*([^<]+?)\s*</a>'
matches = re.findall(pattern, html)
if not matches:
    print('FAIL')
elif len(matches) > 1:
    print('FAIL')
else:
    link_text = re.sub(r'\s+', ' ', matches[0]).strip()
    expected = re.sub(r'\s+', ' ', titel).strip()
    print('PASS' if link_text == expected else 'FAIL')
")

# DEPLOY-04 Mappen-Count
D04=$(python3 -c "
import json, os, glob
data = json.load(open('${GAME_DIR}/data.json'))
expected = len(data.get('mappen', []))
actual = len(glob.glob('${GAME_DIR}/mappe-*.html'))
print('PASS' if expected == actual else 'FAIL')
")

# DEPLOY-05 Game-Index-Renderbarkeit (heuristisch)
D05=PASS
for f in index.html lehrkraft.html; do
    [ -f "${GAME_DIR}/${f}" ] || D05=FAIL
done
python3 -c "
import json
data = json.load(open('${GAME_DIR}/data.json'))
t = data['meta'].get('titel', '')
exit(0 if t and t.strip() else 1)
" || D05=FAIL

# Summary
cat <<EOM
| 1 | DEPLOY-01 | data.json JSON-valide | SCHEMA | $D01 | json.loads |
| 2 | DEPLOY-02 | Asset-Refs aufloesbar | CONSISTENCY | $D02 | - |
| 3 | DEPLOY-03 | Landing-Page-Identitaet | CONSISTENCY | $D03 | - |
| 4 | DEPLOY-04 | Mappen-Count | CONSISTENCY | $D04 | - |
| 5 | DEPLOY-05 | Game-Index-Renderbarkeit | HEURISTIC | $D05 | - |
EOM

[ "$D01$D02$D03$D04$D05" = "PASSPASSPASSPASSPASS" ] && exit 0 || exit 1
```

Anmerkung: Die Referenz-Implementation nutzt bewusst nur `python3` (ist auf macOS/Linux immer verfuegbar) und Bash-Built-ins, keine Third-Party-Dependencies. Kann spaeter in ein dediziertes Python-Modul umgebaut werden wenn die Komplexitaet waechst.

**D) Post-Deploy-Smoketest (optional, Teil von T2):**

Ein zweites Script `tools/post-deploy-smoketest.sh`, das nach erfolgtem `git push` die live-URLs via `curl -I` prueft:
```bash
#!/usr/bin/env bash
# post-deploy-smoketest.sh — HTTP-Check nach Phase 3.2 Live-Go
set -euo pipefail
GAME_ID="${1:?Game-ID}"
BASE="https://weitergehts.online"
URLS=(
  "${BASE}/"
  "${BASE}/escape-games/${GAME_ID}/"
  "${BASE}/escape-games/${GAME_ID}/index.html"
  "${BASE}/escape-games/${GAME_ID}/lehrkraft.html"
  "${BASE}/escape-games/${GAME_ID}/data.json"
)
FAIL=0
for url in "${URLS[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "${url}")
  if [ "$status" = "200" ]; then
    echo "PASS ${status} ${url}"
  else
    echo "FAIL ${status} ${url}"
    FAIL=1
  fi
done
exit $FAIL
```

Laufzeit: typisch 2-3 s. Kann manuell oder als GitHub Actions post-deploy-step laufen.

**Akzeptanzkriterien:**
1. Q-GATE-MECHANIK §7.4 Sektion existiert mit DEPLOY-01..05 tabelliert.
2. Q-GATE-MECHANIK §8 kennt `Phase 3.1`-Block-Format.
3. `tools/deploy-check.sh` existiert, ist executable (`chmod +x`), liefert korrekt 0/1-Exit auf den beiden bestehenden Games.
4. `tools/post-deploy-smoketest.sh` existiert (kann unabhaengig von T3-Staging ausgefuehrt werden).
5. Pruefung gegen bestehende beide Games:
   - `gpg-erster-weltkrieg-ursachen`: erwartet PASS
   - `verlauf-erster-weltkrieg-marne-ende`: erwartet PASS (nach heutigen Commits `1a13fce` + `3fda51d`)

**Aufwand:** ~3 h Script-Entwurf + Q-GATE-MECHANIK-Edits + Gegenprobe auf bestehende Games.

**Dependencies:** T1 vorher (der Vertrag verweist auf das Q-Gate, das hier definiert wird).

**Rollback:** Script-Datei loeschen, Q-GATE-MECHANIK-Sektion revertieren.

---

### T3 — User-Review-Gate via Landing-Page-Feature-Flag (v3.11.3)

**ID:** T3 — DEPLOY-REVIEW-FLAG
**Schwere:** HIGH (D4)
**Ziel:** Eine leichtgewichtige, branchless Staging-Mechanik auf der bestehenden GitHub-Pages-Domain, die es erlaubt ein neu deployt Game oder eine neu produzierte Mappe zuerst nur per URL-Parameter sichtbar zu machen, zu reviewen, und dann durch einen zweiten Commit freizuschalten.

**Grundlage:** D4. Ohne Review-Gate ist push == oeffentlich sofort. Jeder Fehler ist sofort fuer die Ziel-Klasse sichtbar.

**Entscheidungs-Variante (siehe Q-Gates §6.3):** Drei Optionen, Q1 im Rollout waehlt eine. Default-Empfehlung: **T3a** (CSS-Feature-Flag, minimal, Solo-User-optimiert).

**T3a — CSS-Feature-Flag (empfohlen)**

`index.html` erlaubt `<li data-status="staging">`-Eintraege. Ein minimaler CSS-Block versteckt staging-Eintraege per Default:

```html
<style>
  main li[data-status="staging"] { display: none; }
  body.staging main li[data-status="staging"] { display: list-item; }
  body.staging main li[data-status="staging"]::after { content: " [STAGING]"; color: #c33; font-weight: bold; }
</style>
<script>
  // Minimal-Toggle: wenn URL ?staging=1, body.staging setzen
  if (new URLSearchParams(location.search).has('staging')) {
    document.body.classList.add('staging');
  }
</script>
```

Review-Flow:
1. Phase 3.1 PASS: Landing-Page-Eintrag wird mit `data-status="staging"` eingetragen
2. Staging-Commit + push
3. User oeffnet `https://weitergehts.online/?staging=1`, sieht den Eintrag, klickt durch, reviewed
4. Wenn PASS: zweiter Commit entfernt `data-status="staging"`, zweiter push → oeffentlich sichtbar

Vorteile: Kein Branching, keine Workflow-Aenderung, keine Ordner-Verdopplung, funktioniert mit bestehendem GitHub Actions deploy.yml. Zero-Impact auf Production-Besucher.

Nachteile: URL-Parameter kann "leaken" wenn jemand den Link teilt. Realistisches Risiko fuer dieses Projekt: minimal (Ziel-Klasse kennt die URL nicht, Suchmaschinen indexieren den Parameter nicht automatisch als separate Seite). Zusaetzliche Absicherung: `<meta name="robots" content="noindex">` auf staging-Ebene (nicht nowwendig, da die Seite selbst kein Staging-Pfad ist).

**T3b — Pull-Request-Review mit GitHub Pages Preview (mittel)**

Pro Deploy ein Feature-Branch `deploy/<game-id>-mappe-N`, PR statt direkter Commit auf main. GitHub Pages Preview Environment oder externer Preview-Service (Cloudflare Pages nachgelagert).

Vorteile: sauberes Audit-Log im PR, Rollback trivial, echte Production-URL-Trennung.

Nachteile: Overhead bei jedem einzelnen Mappen-Release, Solo-User-Overhead, externer Service-Abhaengigkeit.

**T3c — `/staging/<game-id>/` Unterordner (mittel-gering)**

Dateien zuerst nach `/staging/<game-id>/` deployen. `robots.txt` disallowt `/staging/`. Review auf Staging-URL. Nach PASS: `git mv staging/<game-id> escape-games/<game-id>`, zweiter Commit, zweiter Push.

Vorteile: echtes Staging, keine Branch-Komplexitaet.

Nachteile: doppelter Commit pro Release, Ordner-Verdopplung im Repo, `git mv` plus Landing-Page-Patch gleichzeitig fehleranfaellig.

**File-Ownership T3a (empfohlen):**
- `weitergehts-online/index.html` — Style-Block + Script-Block + erste `data-status="staging"`-Infrastruktur
- `weitergehts-online/assets/css/base.css` — alternativ CSS auslagern (optional, nicht pflicht)
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_3-1_DEPLOY.md` — §Live-Gate-Abschnitt verankert den Review-Flow
- `escape-game-generator/architektur/Q-GATE-MECHANIK.md` §7.4 — DEPLOY-03 erweitern: Landing-Page-Link darf `data-status="staging"` tragen, das zaehlt nicht als FAIL

**Akzeptanzkriterien T3a:**
1. `index.html` enthaelt Feature-Flag-CSS + JS-Toggle.
2. Ein neu produziertes Game kann als `data-status="staging"` eingetragen werden und ist per `?staging=1` sichtbar, ohne Parameter unsichtbar.
3. Der Uebergang "staging → oeffentlich" ist ein trivialer Attribut-Entfern-Commit.
4. Die beiden bestehenden Games (`gpg-erster-weltkrieg-ursachen`, `verlauf-erster-weltkrieg-marne-ende`) bleiben **ohne** das Attribut und sind weiter normal sichtbar.

**Aufwand:** ~2 h (CSS/JS + Test + Dokumentation in Vertrag).

**Dependencies:** T1 definiert den Phasen-Kontext, T2 definiert DEPLOY-03. T3 setzt auf beiden auf.

**Rollback:** Revert der `index.html`-Edits. Das Attribut ist harmlos ohne das CSS.

---

### T4 — Retro-Q-GATE-LOG-Nachtrag fuer bestehende Games (v3.11.4, optional)

**ID:** T4 — DEPLOY-RETROLOG
**Schwere:** LOW
**Ziel:** Fuer die zwei bestehenden Games (`gpg-erster-weltkrieg-ursachen`, `verlauf-erster-weltkrieg-marne-ende`) einen Q-GATE-LOG-Phase-3.1-Eintrag retro anlegen, um die Audit-Spur vollstaendig zu halten.

**Grundlage:** Konsistenz — wenn Phase 3.1 existiert, sollte auch der Startzustand dokumentiert sein. Optional, da die Games faktisch bereits live sind und die neuen DEPLOY-Kriterien erfuellen.

**File-Ownership:**
- `weitergehts-online/docs/agents/artefakte/gpg-erster-weltkrieg-ursachen/Q-GATE-LOG.md` — neuer Abschnitt `## Phase 3.1 — Deploy-Preparation (RETRO 2026-04-10)`
- `weitergehts-online/docs/agents/artefakte/verlauf-erster-weltkrieg-marne-ende/Q-GATE-LOG.md` — dto.

**Konkrete Aenderungen:**
Beide Logs bekommen einen Phase-3.1-Block mit DEPLOY-01..05 PASS-Nachweis via `tools/deploy-check.sh`-Ausgabe und dem `Staging-Commit` = aktuellem HEAD-SHA. Gesamturteil: PASS (retroaktiv).

**Akzeptanzkriterien:**
1. Beide Logs enthalten einen `Phase 3.1`-Block mit Kopfzeile `(RETRO 2026-04-10)`.
2. DEPLOY-01..05 alle PASS (Pruefung via deploy-check.sh).

**Aufwand:** ~30 min je Game.

**Dependencies:** T2 muss abgeschlossen sein (deploy-check.sh muss laufen).

**Rollback:** Loeschen der Phase-3.1-Sektion in beiden Logs.

---

## 4. Sequencing / Reihenfolge

```
T1 (PI-DEPLOY-PHASE)                    [Grundlage, zuerst]
   └─> T2 (DEPLOY-Q-GATE)               [nach T1, definiert das Q-Gate, das T1 referenziert]
        ├─> T3 (DEPLOY-REVIEW-FLAG)     [nach T2, setzt auf Q-Gate auf]
        └─> T4 (DEPLOY-RETROLOG)        [nach T2, optional]
```

**Empfohlene Ausfuehrungsreihenfolge:**
1. **T1** — PI-Phase + Vertrag (Grundlage)
2. **T2** — Q-Gate + deploy-check.sh + post-deploy-smoketest.sh
3. **T3** — Feature-Flag (je nach Q-Entscheidung T3a/b/c)
4. **T4** — Retro-Logs fuer die zwei bestehenden Games (nur wenn Audit-Sauberkeit gewuenscht)

**Nicht parallelisieren:** T1 und T2 beruehren Q-GATE-MECHANIK.md → Sequenziell. T1 und T3 beruehren beide den Vertrag `VERTRAG_PHASE_3-1_DEPLOY.md` → Sequenziell.

**Gesamt-Aufwand:** T1+T2+T3 = ~7 h. T4 +1 h optional.

---

## 5. Test-Strategie

### 5.1 Dokumenten-Tests (Unit)
- `grep` auf Uebergangstabelle in PI: Phase 3.1 + Phase 3.2 Zeilen vorhanden
- `grep` auf STATE-ADVANCE-VERTRAG: Phase 3.1 explizit erwaehnt
- `grep` auf `Q-GATE-MECHANIK.md` §7.4: DEPLOY-01..05 tabelliert
- `test -x tools/deploy-check.sh` + Ausfuehrung auf beiden bestehenden Games → Exit 0

### 5.2 Smoketest-Szenarien (Integration)

Drei Test-Prompts in frischer Cowork-Session nach Upgrade-Abschluss:

**Smoketest-D1 — Deploy-Preparation-Guard:**
Prompt: "Phase 3.0 Assembly fuer Verlauf-Game Mappe 2 ist PASS. Committe die Dateien und push."
Erwartung: KI verweigert den direkten Push, verweist auf Phase 3.1 Pflicht, startet deploy-check.sh, schreibt Q-GATE-LOG Phase 3.1, erstellt Staging-Commit, stoppt vor push.

**Smoketest-D2 — Titel-Drift-Block:**
Prompt: Simuliere ein Game mit `data.json → meta.titel = "Foo Bar"` und Landing-Page-Link `"Foo Bar Baz"`. Pruefe Deploy.
Erwartung: DEPLOY-03 FAIL mit Evidenz-String, Gesamturteil FAIL, Phase-3.1-PASS-Marker blockiert.

**Smoketest-D3 — Fehlende Asset-Referenz:**
Prompt: Simuliere ein Game dessen `data.json` eine `img-1-99.jpg` referenziert, die im Asset-Ordner fehlt.
Erwartung: DEPLOY-02 FAIL mit Evidenz `Missing: img-1-99.jpg`.

### 5.3 Regressions-Test (System)
Nach T1-T4: `tools/deploy-check.sh gpg-erster-weltkrieg-ursachen` + `tools/deploy-check.sh verlauf-erster-weltkrieg-marne-ende` muessen beide Exit 0 liefern. Beide Games bleiben live erreichbar.

---

## 6. Rollout

### 6.1 Phasen
1. **Entwurf** (diese Datei, Session 2026-04-10, gerade abgeschlossen)
2. **User-Review** dieses Plans — offene Entscheidungen siehe 6.3
3. **T1 Umsetzung** — eine Cowork-Session, PI + Vertrag
4. **T2 Umsetzung** — Q-GATE-MECHANIK §7.4 + Scripts, gleiche oder naechste Session
5. **T3 Umsetzung** — je nach Q-Entscheidung (T3a empfohlen)
6. **T4 Retro-Logs** — optional
7. **Smoketest-Durchlauf** S1/S2/S3
8. **CHANGELOG + STATUS.md** Eintraege
9. **Commit + Push** beider Repos

### 6.2 Git-Strategie
- Pro Track ein Commit im jeweils betroffenen Repo (escape-game-generator fuer T1/T2-Mechanik, weitergehts-online fuer T2-Scripts/T3-index.html/T4-Logs)
- Commit-Messages: `v3.11.N <Track-Kurz>: <Aenderung>`
- Virtiofs-Lock-Warnung: `escape-game-generator` Commits muessen wahrscheinlich auf Host-Terminal ausgefuehrt werden (siehe Memory-Eintrag `feedback_virtiofs_git_lock`)
- Kein Push ohne User-Freigabe

### 6.3 Entscheidungs-Gates (User-Freigabe offen)

**Q1 — T3-Variante:** Welche Review-Gate-Mechanik?
- (a) T3a CSS-Feature-Flag mit `data-status="staging"` und `?staging=1`-URL-Parameter (empfohlen, minimal, Solo-User-optimiert)
- (b) T3b Pull-Request-basierter Preview-Workflow (mehr Overhead, PR-Audit-Spur)
- (c) T3c `/staging/<game-id>/`-Unterordner + `git mv`-Promote (echtes Staging, doppelter Commit)
- (d) keine Review-Gate-Mechanik, Phase 3.1 PASS → direkt push durch User ohne Zwischenzustand
- **Vorschlag: (a).** Passt zum Solo-Betrieb, keine Infrastruktur-Erweiterung, rueckbaubar.

**Q2 — Post-Deploy-Smoketest-Integration:** Soll `tools/post-deploy-smoketest.sh` (HTTP-Check nach push) Pflicht oder optional sein?
- (a) Pflicht als Phase-3.2-Exit-Kriterium (KI fordert nach push zur Ausfuehrung auf)
- (b) Optional, User fuehrt manuell aus wenn gewuenscht
- (c) Automatisiert via GitHub Actions post-deploy-step
- **Vorschlag: (b).** Pflicht-Automatisierung erzeugt Abhaengigkeit von Netzwerk-Zustand zum Zeitpunkt des Pushs; manuell ausfuehrbar nach Bedarf ist ausreichend fuer Solo-Betrieb.

**Q3 — Retro-Log-Nachtrag T4:** Fuer die beiden bestehenden Games einen Phase-3.1-Block retro nachtragen?
- (a) Ja, beide Games retro-nachtragen (Audit-Sauberkeit)
- (b) Nein, nur vorwaerts (wie v3.10 Q4)
- **Vorschlag: (a).** Niedriger Aufwand (~1 h), liefert einen vollstaendigen Audit-Pfad.

**Q4 — Neue Phase-Nummerierung vs. Uebergangstabellen-Einreihung:** Soll Phase 3.1 eine neue Zeile nach Phase 3.0 werden (Renumbering der Folgezeilen) oder als Einschub ohne Renumbering?
- (a) Renumbering aller Folgezeilen (saubere Nummerierung, aber Diff-Laermpegel hoch)
- (b) Einschub als Zeile `3.0.1` oder `3.5` (keine Folgezeilen betroffen, aber Nummerierungs-Asymmetrie)
- (c) Keine numerische ID, nur textuelle Referenz "Phase 3.1" im Vertragstext
- **Vorschlag: (a).** v3.9.1 hat bereits ein Renumbering durchgezogen; Konsistenz mit etabliertem Muster, einmaliger Aufwand.

**Q5 — T2.F (typ-spezifische Meta-Sub-Schemata aus v3.10 T2-Folge-Ticket) und 21 mat-*.json Migrations-Backlog:** Werden diese offenen v3.10-Folgearbeiten vor v3.11 oder nach v3.11 bearbeitet?
- (a) Vor v3.11 (T2.F + Migrations-Backlog zuerst schliessen)
- (b) Parallel zu v3.11 (beide Upgrades laufen unabhaengig)
- (c) Nach v3.11 (v3.11 hat hoehere Deploy-Dringlichkeit, T2.F kann warten)
- **Vorschlag: (c).** v3.11 schliesst eine strukturelle Luecke, die sofort in jeder neuen Produktion wieder auftreten wuerde. T2.F schliesst eine Migrations-Luecke fuer 21 Altdateien ohne akuten Deploy-Bezug.

---

## 7. Nicht-Scope (explizit ausgeschlossen)

- Engine-Aenderungen (`escape-engine.js`) — v3.11 ist rein Governance-/State-Machine-/Tooling-Ebene
- CDN / Cloudflare / Netlify / Custom-Deploy-Pipeline — GitHub Pages bleibt Deploy-Target
- Versionierungs-Schema (Game-Releases als `v1.0.0`-Tags) — eigenes Folgeprojekt
- Automatisierte Screenshot-Regression-Tests — separates Testing-Vorhaben
- A/B-Testing-Infrastruktur — ausserhalb Solo-Betrieb-Scope
- Content-Delivery-Caching-Optimierung — nicht Deploy-Correctness, sondern Performance
- Backup / Disaster-Recovery fuer Live-Staende — git-history ist ausreichende Quelle
- Multi-Environment-Deploys (dev/staging/prod separate Domains) — bewusst ausgeschlossen wegen Solo-Betrieb
- T2.F (typ-spezifische Meta-Sub-Schemata aus v3.10 T2) — eigenes Folgeprojekt
- 21 mat-*.json Migrations-Backlog — eigenes Folgeprojekt, Q4-vorwaertsgetrieben

---

## 8. Erfolgs-Metriken

Nach Abschluss T1-T3 messbar:

| Metrik | Vor v3.11 | Ziel nach v3.11 |
|---|---|---|
| Phase-3.0-Abschluss ohne nachfolgenden Commit-Schritt moeglich | ja (heute passiert) | nein (struktureller Block via STATE-ADVANCE-VERTRAG) |
| Landing-Page-Patch informell vergesslich | ja (heute passiert) | nein (DEPLOY-03 blockt PASS) |
| Titel-Drift zwischen data.json und Landing-Page moeglich | ja (heute passiert, Claude riet den falschen Titel) | nein (DEPLOY-03 Byte-Genauigkeit) |
| Fehlende Asset-Dateien faellt erst dem User beim Live-Test auf | ja | nein (DEPLOY-02 blockt PASS) |
| User-Review-Checkpoint vor oeffentlicher Sichtbarkeit | nein | ja (Phase 3.2 User-Gate + Feature-Flag) |
| Deploy-Q-Gate-Pruefung manuell vs. automatisierbar | manuell | automatisiert via deploy-check.sh |
| Audit-Spur fuer Live-Schaltungen | keine | Q-GATE-LOG Phase-3.1-Block |
| Smoketests D1/D2/D3 | n.a. | PASS |

---

## 9. Risiken

| Risiko | Wahrscheinlichkeit | Impact | Gegenmassnahme |
|---|---|---|---|
| DEPLOY-03 Titel-Identitaets-Check ist zu streng (false positives bei legitimer Typografie-Variation z.B. Umlaute) | niedrig | niedrig | Byte-Genauigkeit mit Whitespace-Normalisierung, Umlaute werden JSON-serialisiert korrekt persistiert |
| deploy-check.sh bricht auf Windows (Solo-User nutzt aber macOS) | niedrig | niedrig | Script ist POSIX-Bash, Python3-only; macOS-only ist OK fuer dieses Projekt |
| T3a URL-Parameter `?staging=1` leakt ueber Suchmaschinen | sehr niedrig | niedrig | robots.txt-Eintrag ist nicht noetig (URL-Parameter werden nicht als separate Seite indexiert); falls doch: `<meta name="robots" content="noindex">` im Head bei vorhandenem `body.staging` via JS setzen |
| Neue Phase 3.1 verzoegert Live-Schaltung merklich | niedrig | niedrig | Q-Gate-Pruefung dauert <5s, Script kann einhaendig ausgefuehrt werden |
| GitHub Pages-Caching verhindert unmittelbare Live-Sichtbarkeit nach push | mittel | niedrig | Bekannte Latenz 1-2 min, Post-Deploy-Smoketest beruecksichtigt das via Retry |
| T3a Feature-Flag wird vergessen zu entfernen (Game bleibt staging-only) | mittel | mittel | Post-Deploy-Smoketest prueft explizit, dass der Landing-Page-Eintrag OHNE `data-status="staging"` erreichbar ist wenn das Game freigeschaltet werden soll; plus: PI-State-Block-Zeile fuer Phase 3.2 fordert explizite User-Entscheidung und dokumentiert "staging" vs "public" als distinkte Zustaende |

---

## 10. Aktenvermerk

Ausloeser fuer dieses Upgrade:
- Konversation 2026-04-10 nach v3.10-Abschluss: User fragte ob fehlende Live-Schaltung des Verlauf-Games ein Bug sei
- Ad-hoc-Commit-Nachzug im weitergehts-online Repo: `1a13fce` (escape-games/+assets committed) + `3fda51d` (Landing-Page-Link nachgezogen)
- Titel-String in `index.html` erste Version war geraten (`"Vom Schlieffen-Plan zum Stellungskrieg"`), Korrektur durch `data.json`-Lookup zu `"Der Erste Weltkrieg — Verlauf von der Marne bis zum Ende"` — dieser Vorgang ist der direkte Anlass fuer DEPLOY-03

Keine separaten Befund-Dateien; dieser Upgrade-Plan ist die konsolidierte Form. Der gleiche Architektur-Prinzip wie v3.10: jede informelle Schritt-Kette wird formalisiert, sobald sie einmal zu einem Defekt gefuehrt hat.

---

**Dokument-Status:** FREIGEGEBEN (2026-04-10) — Q1-Q5 durch User entschieden
**Verweis:** v3.10 als Template (`UPGRADE_PLAN_v3-10_GENERATOR_HARDENING.md`)

## 11. Q-Entscheidungen (gelockt 2026-04-10)

| Q | Entscheidung | Begruendung |
|---|---|---|
| Q1 | **a** — T3a CSS-Feature-Flag mit `data-status="staging"` + `?staging=1` | Solo-Betrieb, minimaler Aufwand, rueckbaubar |
| Q2 | **b** — Post-Deploy-Smoketest optional, manuell ausfuehrbar | Keine Netzwerk-Abhaengigkeit zum Push-Zeitpunkt; Script wird trotzdem bereitgestellt |
| Q3 | **c** (Abweichung vom Vorschlag a) — Retro-Log NUR fuer Marne-Game (`verlauf-erster-weltkrieg-marne-ende`), NICHT fuer `gpg-erster-weltkrieg-ursachen` | Marne-Game war der direkte Defekt-Ausloeser (Titel-Drift + fehlende Landing-Page). bayern-1918 / gpg-erster-weltkrieg-ursachen zeigte keine dokumentierten DEPLOY-Defekte. Minimaler Aufwand bei akzeptabler Audit-Luecke. **Akzeptierter Nachteil:** Ein Game bleibt ohne Retro-Log, Audit-Konsistenz ist asymmetrisch. |
| Q4 | **a** — Renumbering der Phase-3-Sequenz (3.0 Kompilation, 3.1 Deploy-Preparation, 3.2 Live-Go) | Semantisch korrekt, Diff-Laermpegel einmalig, konsistent mit v3.9.1-Muster |
| Q5 | **c** — v3.10-Folgearbeiten (T2.F, 21 mat-Migration, T6 Compaction-Resilience) NACH v3.11 | v3.11 schliesst blockierende Luecke fuer jede neue Produktion; T2.F kann warten |

**Folge fuer T4:** Scope reduziert sich auf 1 Game statt 2 — Aufwand ~20 min statt ~60 min.
