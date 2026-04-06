# Uebergabe: Phase IV Wave 1 AU-2a — Code-Strang (STR-03 Feedback-Schema Rollout)

**Status:** BEREIT FUER CLAUDE-CODE (nach Cowork-PM-Commit Block 1 Session 13)
**Herkunft:** Phase IV Wave 1 AU-2a Bundle, PM-Strang abgeschlossen in Cowork 2026-04-06
**ATOM-UNIT:** AU-2a — alle Aenderungen dieses Uebergabe-Prompts muessen in EINEM Commit merged werden (VERTRAG_ATOM_UNITS.md §3 AU-2a)
**Pre-Commit-Gate:** 3 Checks (RA1 Scope / RA3 Code-Kopplung / RA4 ATOM-UNIT) MUSS bestanden werden
**Vorgaenger:** AU-1 (Commits 5c718df PM + 5b470c5 Code, 2026-04-05)
**Abgrenzung:** AU-2a liefert NUR Feedback-Schema-Rollout. AU-2b (STR-04 Tipps-Didaktik) und AU-2c (BEFUND-AU-1-UI-01 UI-Fix) sind separate ATOM-UNITS, NICHT Gegenstand dieses Dispatches.

---

## Kontext

AU-1 ist geschlossen (STR-02 Bloom-Pflichtfeld + STR-11 Vergleich/Begruendung, Commits 5c718df + 5b470c5). AU-2 wurde auf User-Freigabe 2026-04-06 (Entscheidung E3) in drei ATOM-UNITS gesplittet, weil STR-03 (Feedback-Schema) strukturelle Voraussetzung fuer STR-04 (Tipps per Typ) ist und der UI-Befund BEFUND-AU-1-UI-01 einen eigenen Rollback-Radius verdient.

AU-2a setzt STR-03 aus D15B um: Feedback ist nicht mehr String, sondern `{typ, text, ebene}` bzw. ein Array davon (Multi-Option-Typen). Das Schema ist in `docs/architektur/vertraege/VERTRAG_FEEDBACK_SCHEMA.md` (V2) verbindlich.

**Grundsatz-Entscheidungen (User-Freigabe 2026-04-06):**
- **E1 = B Hybrid:** Bestands-Aufgaben (Mappen 1-4, 26 Aufgaben gesamt) erhalten Feedback via Auto-Generator-Dispatch (`docs/agents/dispatches/FEEDBACK_BACKFILL_MAPPEN_1_4.md`, bereits erzeugt durch Cowork-PM). Dispatch enthaelt 79 Eintraege in 26 Feedback-Bloecken. Claude-Code uebernimmt die Inhalte VERBATIM nach User-Review-Signoff. Keine Regenerierung.
- **E2 = B:** STR-04 (Tipps per Typ) wird in AU-2b didaktisch pro Aufgabentyp evaluiert. NICHT Teil von AU-2a.
- **E3 = Split:** AU-2 → AU-2a + AU-2b + AU-2c. Dieser Dispatch betrifft nur AU-2a.

PM-Strang (Cowork) hat committed (Session 13 Block 1):
- `docs/architektur/vertraege/VERTRAG_ATOM_UNITS.md` (AU-2 Split in AU-2a/2b/2c)
- `docs/architektur/vertraege/VERTRAG_FEEDBACK_SCHEMA.md` (§9 Backfill-Generator-Spec)
- `docs/architektur/vertraege/VERTRAG_PHASE_2-2b_AUFGABE.md` (Feedback-Pflichtfeld + A25/A26)
- `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md` (§3.1b A25/A26)
- `docs/agents/SUB_AUFGABE_{MC,ZUORDNUNG,REIHENFOLGE,LUECKENTEXT,FREITEXT,VERGLEICH,BEGRUENDUNG}.md` (je Feedback-Schema-Block)
- `docs/agents/dispatches/FEEDBACK_BACKFILL_MAPPEN_1_4.md` (neu, 26 Aufgaben × Feedback-Bloecke)
- `docs/befunde/BEFUND-AU-1-UI-01.md` (neu, fuer AU-2c)
- `docs/projekt/SESSION_13_MASTERPLAN.md` (Kompaktions-Resilienz)
- `docs/projekt/GIT_WORKFLOW_RAHMEN.md` (PM-Infrastruktur)
- `docs/projekt/STATUS.md` + `docs/projekt/CHANGELOG.md` (Session 13 Block 1)

Code-Strang (diese Uebergabe) liefert die technische Umsetzung: Engine-Hardening, Schema-Validator, data.json-Backfill, Cache-Busting.

---

## Pre-Flight

```bash
cd ~/weitergehts.online/weitergehts-online
git status                      # Working Tree sauber?
git pull --ff-only origin main  # Cowork-PM-Commit Session 13 Block 1 muss gezogen sein
test -f docs/architektur/vertraege/VERTRAG_FEEDBACK_SCHEMA.md || echo "FEHLT: Vertrag"
grep -q "§9 Backfill-Generator-Spec\|Backfill-Generator-Spec" docs/architektur/vertraege/VERTRAG_FEEDBACK_SCHEMA.md || echo "FEHLT: §9"
test -f docs/agents/dispatches/FEEDBACK_BACKFILL_MAPPEN_1_4.md || echo "FEHLT: Dispatch"
grep -q "A25\|A26" docs/checklisten/GUETEKRITERIEN_AUFGABEN.md || echo "FEHLT: A25/A26"
grep -q "normalizeFeedback" assets/js/escape-engine.js || echo "FEHLT: normalizeFeedback (AU-0 V2)"
```

Bei negativem Check: STOPP, Cowork-PM informieren.

---

## Scope (File-Ownership Claude-Code)

### A) Engine-Hardening: normalizeFeedback + Log-Warning

**Datei:** `assets/js/escape-engine.js`

Die Funktion `normalizeFeedback(raw)` (Zeile ~74) existiert seit AU-0 V2 und konvertiert Legacy-String → `{typ: 'hinweis', text: raw, ebene: 'verstaendnis'}`. Das Safety-Net bleibt erhalten — AU-2a fuegt NUR eine Log-Warning hinzu, damit verbleibende Strings im Backfill-Prozess sichtbar werden:

```javascript
function normalizeFeedback(raw) {
  if (raw == null) return raw;
  if (typeof raw === 'string') {
    // AU-2a: Safety-Net + Log-Warning fuer Backfill-Sichtbarkeit
    if (typeof console !== 'undefined' && console.warn) {
      console.warn('[escape-engine] Legacy-String feedback erkannt, sollte via Backfill auf {typ,text,ebene} migriert werden:', raw.slice(0, 60));
    }
    return { typ: 'hinweis', text: raw, ebene: 'verstaendnis' };
  }
  if (Array.isArray(raw)) {
    return raw.map(normalizeFeedback);
  }
  return raw;
}
```

**Keine Aenderung an _normalizeDataFeedback, keine Aenderung an bestehenden check*-Funktionen.** Scope-Grenze: nur `normalizeFeedback` berueh­ren.

### B) Schema-Validator-Tool

**Datei:** `tools/validate-feedback-schema.js` (neu, Node.js-CLI)

**Input:** Pfad zu einer `data.json` (oder Glob).

**Logik:**
- Laedt JSON, iteriert ueber `mappen[].aufgaben[]`.
- Pro Aufgabe: Pruefe `feedback`-Feld.
  - `null`/`undefined` → WARN (toleriert, aber im Report).
  - String → FAIL (Legacy, nicht zulaessig seit AU-2a).
  - Objekt → Pflichtfelder `typ`, `text`, `ebene`. `typ ∈ {bestaetigung, korrektur, hinweis, verknuepfung}`. `ebene ∈ {wissen, verstaendnis, anwendung, analyse}`. `text` non-empty string.
  - Array → jeder Eintrag muss Objekt-Form erfuellen.
- **Konsistenz-Checks pro Aufgabentyp** (aus `VERTRAG_FEEDBACK_SCHEMA.md` §3):
  - `mc` / `zuordnung` / `reihenfolge`: Array, Laenge = Anzahl Optionen/Paare/Positionen.
  - `freitext`: Array mit 2-3 Eintraegen.
  - `vergleich`: Array mit 2-3 Eintraegen, `ebene` fix `anwendung`.
  - `begruendung`: Array mit genau 3 Eintraegen (bestaetigung/korrektur/verknuepfung), `ebene` fix `analyse`.
  - `lueckentext`: Array (Sammelfeedback oder pro Luecke).
- Exit 0 bei PASS (alle Aufgaben valide), Exit 1 bei FAIL mit menschenlesbarer Fehlerliste (`<mappe-id>/<aufgabe-id>: <grund>`).

**Signatur:**
```bash
node tools/validate-feedback-schema.js escape-games/gpg-erster-weltkrieg-ursachen/data.json
# oder alle auf einmal:
node tools/validate-feedback-schema.js "escape-games/**/data.json"
```

**Integration:** Aufruf im Cowork-PM-Q-Gate (Phase 2.2b A25), separater Aufruf in Claude-Code nach Backfill. Sollte in Pre-Commit-Gate-3-Check C (RA4) als optionaler Lint laufen.

### C) Data.json-Backfill (Mappen 1-4)

**Datei:** `escape-games/gpg-erster-weltkrieg-ursachen/data.json`

**Quelle:** `docs/agents/dispatches/FEEDBACK_BACKFILL_MAPPEN_1_4.md` — 26 Aufgaben × Feedback-Bloecke, 79 Eintraege gesamt.

**Ablauf (strikt):**
1. **User-Review-Signoff ABWARTEN.** Der Dispatch enthaelt 27 Review-Checkboxen. Vor Backfill muss Paul (User) die Inhalte per Signoff freigeben. OHNE SIGNOFF KEINE BACKFILL-AUSFUEHRUNG.
2. Pro Aufgabe: `feedback`-Feld in `data.json` durch die Objekt/Array-Form aus dem Dispatch ersetzen. Reihenfolge der Eintraege VERBATIM uebernehmen (Multi-Option-Typen sind option-order-sensitiv).
3. Keine inhaltlichen Aenderungen an den Texten. Keine zusaetzlichen Eintraege. Keine Emojis.
4. JSON-Validierung:
   ```bash
   python3 -c "import json; json.load(open('escape-games/gpg-erster-weltkrieg-ursachen/data.json'))" && echo "JSON OK"
   ```
5. Schema-Validierung:
   ```bash
   node tools/validate-feedback-schema.js escape-games/gpg-erster-weltkrieg-ursachen/data.json
   ```
   Erwartung: Exit 0.

**Scope-Grenze:** NUR das `feedback`-Feld. Keine Beruehrung von `frage`, `loesung`, `tipps`, `_meta` etc.

### D) Cache-Busting

**Dateien:** Alle HTML-Dateien im Subpage-Verzeichnis, die `escape-engine.js` oder CSS referenzieren:

- `escape-games/gpg-erster-weltkrieg-ursachen/index.html`
- `escape-games/gpg-erster-weltkrieg-ursachen/mappe-1.html`
- `escape-games/gpg-erster-weltkrieg-ursachen/mappe-2.html`
- `escape-games/gpg-erster-weltkrieg-ursachen/mappe-3.html`
- `escape-games/gpg-erster-weltkrieg-ursachen/mappe-4.html`
- `escape-games/gpg-erster-weltkrieg-ursachen/lehrkraft.html`

**Aktion:** Version-Parameter einheitlich `?v=4.0` → `?v=4.1` fuer ALLE referenzierten JS/CSS-Dateien (`base.css`, `theme-gpg.css`, `core.js`, `escape-engine.js` u.a.).

**Sanity-Grep nach Edit:**
```bash
grep -rn "?v=4\.0" escape-games/gpg-erster-weltkrieg-ursachen/
# Erwartung: leer
grep -rn "?v=4\.1" escape-games/gpg-erster-weltkrieg-ursachen/ | wc -l
# Erwartung: > 0, konsistent mit vorheriger v=4.0-Zaehlung
```

### E) CHANGELOG

`CHANGELOG.md` — Code-Strang-Eintrag unter Wave 1 AU-2a:
- Engine-Hardening: normalizeFeedback Log-Warning
- tools/validate-feedback-schema.js (neu)
- data.json Feedback-Backfill 26 Aufgaben / 79 Eintraege
- Cache-Bust v=4.0 → v=4.1 (Subpage gpg-erster-weltkrieg-ursachen)

---

## Pre-Commit-Gate (MANDATORY vor Commit)

```bash
# Check A — RA1 Scope-Check
grep -c "STR-03\|Feedback-Schema" docs/projekt/D15B_OPTIMIERUNGS_STRATEGIEN.md
# Erwartung: > 0. STR-03 aktiv.

# Check B — RA3 Code-Kopplungs-Check
git diff --cached assets/js/escape-engine.js | grep -E "checkFreitext|checkMc|checkLueckentext|checkReihenfolge|checkZuordnung|_checkVergleich|_checkBegruendung"
# Erwartung: KEINE Aenderungen an Check-Funktionen. Nur Aenderung in normalizeFeedback.

git diff --cached assets/js/escape-engine.js | grep -c "normalizeFeedback"
# Erwartung: > 0 (Log-Warning-Patch).

# Check C — RA4 ATOM-UNIT-Check
git diff --cached --name-only | sort -u
```

**AU-2a-Dateien (muessen ALLE im selben Commit sein, KEINE anderen):**
- `assets/js/escape-engine.js`
- `tools/validate-feedback-schema.js` (neu)
- `escape-games/gpg-erster-weltkrieg-ursachen/data.json`
- `escape-games/gpg-erster-weltkrieg-ursachen/index.html`
- `escape-games/gpg-erster-weltkrieg-ursachen/mappe-1.html`
- `escape-games/gpg-erster-weltkrieg-ursachen/mappe-2.html`
- `escape-games/gpg-erster-weltkrieg-ursachen/mappe-3.html`
- `escape-games/gpg-erster-weltkrieg-ursachen/mappe-4.html`
- `escape-games/gpg-erster-weltkrieg-ursachen/lehrkraft.html`
- `CHANGELOG.md`

**NICHT im Commit (gehoeren zu anderen AUs):**
- `assets/css/themes/theme-gpg.css` (gehoert zu AU-2c)
- `assets/js/escape-engine.js` Tipps-Logik (gehoert zu AU-2b)
- Mappe-4-Aufgaben mit STR-11-Inhalten (AU-1, bereits committed)

Bei FAIL eines Checks: Commit nicht absetzen, Luecken schliessen oder Cowork-PM kontaktieren.

---

## Validierungsschritte

```bash
# 1. JSON-Validierung
python3 -c "import json; json.load(open('escape-games/gpg-erster-weltkrieg-ursachen/data.json'))" && echo "JSON OK"

# 2. Feedback-Schema-Validator
node tools/validate-feedback-schema.js escape-games/gpg-erster-weltkrieg-ursachen/data.json
# Erwartung: Exit 0, alle 26 Aufgaben PASS, keine String-Feedback mehr.

# 3. Engine-Sanity: escape-engine.js syntaktisch sauber?
node -e "require('./assets/js/escape-engine.js')" 2>&1 || echo "JS-Syntax-Fehler"

# 4. Cache-Bust-Konsistenz
grep -rn "?v=4\.0" escape-games/gpg-erster-weltkrieg-ursachen/
# Erwartung: leer.

# 5. Browser-Smoke-Test (User, nach Push):
#    - Hard-Reload Mappe 1-4 (Cmd+Shift+R)
#    - Console: KEINE "Legacy-String feedback"-Warnings mehr (alles gebackfilled)
#    - Alle Aufgaben abgeben, Feedback-Anzeige pruefen:
#      * MC/Zuordnung/Reihenfolge: Feedback pro Option/Paar/Position sichtbar
#      * Freitext/Vergleich/Begruendung: 2-3 Feedback-Eintraege, Ebenen-Badge korrekt
#      * typ-Color-Coding (bestaetigung=gruen, korrektur=rot, hinweis=gelb, verknuepfung=blau) sichtbar
```

---

## Commit-Nachricht (Vorlage)

Datei: `.git-commit-msg-au2a.txt`

```
feat(au-2a): STR-03 feedback-schema rollout (Wave 1 AU-2a Code-Strang)

- normalizeFeedback Log-Warning fuer Legacy-String-Sichtbarkeit
- tools/validate-feedback-schema.js neu (Objekt/Array-Schema + typ-spezifische Konsistenz)
- data.json Backfill Mappen 1-4: 26 Aufgaben / 79 Feedback-Eintraege aus Auto-Generator-Dispatch (User-Signoff-verifiziert)
- Cache-Bust v=4.0 -> v=4.1 (gpg-erster-weltkrieg-ursachen Subpage)
- AU-2a ATOM-UNIT (VERTRAG_ATOM_UNITS.md §3 AU-2a)

Dispatch: docs/agents/dispatches/FEEDBACK_BACKFILL_MAPPEN_1_4.md
Vertrag: docs/architektur/vertraege/VERTRAG_FEEDBACK_SCHEMA.md (V2, §9)
```

Commit:
```bash
git commit -F .git-commit-msg-au2a.txt && rm .git-commit-msg-au2a.txt
```

---

## Nach erfolgreichem Commit

1. Push nach `main` (User-Ausfuehrung, Cowork hat keinen Push-Zugriff).
2. Cowork-PM informieren: "AU-2a Code-Strang gepusht, Commit `<hash>`."
3. Cowork-PM aktualisiert STATUS.md + CHANGELOG.md mit Wave-1-AU-2a-COMPLETE.
4. Cowork-PM startet AU-2b (STR-04 Tipps-Didaktik pro Aufgabentyp) oder AU-2c (BEFUND-AU-1-UI-01 UI-Fix) gemaess User-Priorisierung.

---

## Risiken & Gegenmassnahmen (AU-2a-spezifisch)

| Risiko | Mitigation |
|---|---|
| Backfill-Inhalte didaktisch schwach | User-Review-Signoff auf 27 Checkboxen im Dispatch VOR Backfill |
| Schema-Validator zu strikt, blockiert Commit | Konsistenz-Checks per typ, nicht per Aufgabe; WARN statt FAIL bei `null` |
| Cache-Bust vergessen auf einer HTML | Sanity-Grep in Validierungsschritt 4 |
| Log-Warning flutet Konsole bei unvollstaendigem Backfill | Truncate auf 60 Zeichen, eine Zeile pro Vorkommen |
| Scope-Kreuzung mit AU-2b (Tipps) oder AU-2c (Theme-CSS) | Pre-Commit-Gate Check B + explizite "NICHT im Commit"-Liste |

---

## Quellen-Bindung

- `docs/architektur/vertraege/VERTRAG_ATOM_UNITS.md` §3 AU-2a (Scope-Definition)
- `docs/architektur/vertraege/VERTRAG_FEEDBACK_SCHEMA.md` (V2, §3 Typ-Regeln, §9 Backfill-Generator-Spec)
- `docs/architektur/vertraege/VERTRAG_PHASE_2-2b_AUFGABE.md` (A25/A26)
- `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md` §3.1b
- `docs/agents/dispatches/FEEDBACK_BACKFILL_MAPPEN_1_4.md` (Backfill-Inhalte)
- `docs/projekt/SESSION_13_MASTERPLAN.md` (E1/E2/E3-Entscheidungen)
- `docs/projekt/GIT_WORKFLOW_RAHMEN.md` (Commit-Mechanik §2 `git commit -F`)
