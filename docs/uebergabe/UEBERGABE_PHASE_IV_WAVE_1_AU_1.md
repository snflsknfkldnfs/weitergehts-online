# Uebergabe: Phase IV Wave 1 AU-1 — Code-Strang (STR-02 Bloom-Tiefe + STR-11 Vergleich/Begruendung)

**Status:** BEREIT FUER CLAUDE-CODE (nach Cowork-PM-Commit Block 1)
**Herkunft:** Phase IV Wave 1 AU-1 Bundle, PM-Strang abgeschlossen in Cowork 2026-04-05
**ATOM-UNIT:** AU-1 — alle Aenderungen dieses Uebergabe-Prompts muessen in EINEM Commit merged werden (VERTRAG_ATOM_UNITS.md §3 AU-1)
**Pre-Commit-Gate:** 3 Checks (RA1 Scope / RA3 Code-Kopplung / RA4 ATOM-UNIT) MUSS bestanden werden

---

## Kontext

Phase IV Wave 0 ist integriert (Merge f494f6a + 005ff9c auf main, 2026-04-05). Wave 1 startet mit AU-1:
- **STR-02 Bloom-Tiefe als Pflicht in Aufgaben-Generierung** — `_meta.bloom_level` (1-6) wird Pflichtfeld pro Aufgabe; Verteilungs-Policy pro Mappe (max 40 % L1-L2, min 30 % L3-L4, min 20 % L5-L6).
- **STR-11 Aufgabentypologie-Erweiterung (Teil 1)** — 2 neue `typ`-Werte: `vergleich` (Strukturraster, Bloom-Ziel L4) und `begruendung` (CER-Schema, Bloom-Ziel L5). Der Teil 2 von STR-11 (Quellenkritik-Freitext) gehoert zu AU-3 und ist NICHT Gegenstand dieses Dispatches.

**Grundsatz-Entscheidungen (User-Freigabe 2026-04-05):**
- Option C Hybrid: Bestands-Mappen 1-4 erhalten `_meta.bloom_level` per Auto-Klassifikator-Subagent-Dispatch (Cowork-PM-Block 2), Wave-1-Neu-Produktion laeuft mit Bloom-Pflichtfeld von Anfang an.
- `vergleich` und `begruendung` sind **eigenstaendige Subagenten-Prompts** (SUB_AUFGABE_VERGLEICH.md, SUB_AUFGABE_BEGRUENDUNG.md), nicht Varianten von Freitext.
- **Mappe 4** dient als Test-Mappe fuer Wave-1-Produktion (AU-1 End-to-End-Verifikation).

PM-Strang (Cowork) hat committed:
- `docs/architektur/vertraege/VERTRAG_PHASE_2-2b_AUFGABE.md` (Patch: bloom_level Pflichtfeld, 2 neue Typen, A19/A22/A23/A24)
- `docs/architektur/vertraege/VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md` (Typauswahl-Heuristik + Bloom-Verteilungs-Ziel)
- `docs/agents/SUB_AUFGABE_VERGLEICH.md` (neu)
- `docs/agents/SUB_AUFGABE_BEGRUENDUNG.md` (neu)
- `docs/agents/SUB_AUFGABE_{MC,ZUORDNUNG,LUECKENTEXT,REIHENFOLGE,FREITEXT}.md` (Bloom-Selbstdeklarations-Block)
- `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md` (A19 Bloom-Verteilung, A22 Vergleichs-Strukturraster, A23 CER-Struktur, A24 Bloom-Selbstdeklaration, Anti-Quota-Klausel)
- `docs/analyse/BLOOM_KLASSIFIKATION_MAPPEN_1_4.md` (Auto-Klassifikator-Ergebnis, Block 2)

Code-Strang (diese Uebergabe) liefert die technische Umsetzung: Engine-Registry, Validator, Mappe-4-Exemplare, Cache-Busting.

---

## Pre-Flight

```bash
cd ~/weitergehts.online/weitergehts-online
git status                      # Working Tree sauber?
git pull --ff-only origin main  # Cowork-PM-Block-1-Commit + Block-2-Commit muessen gezogen sein
test -f docs/agents/SUB_AUFGABE_VERGLEICH.md || echo "FEHLT: SUB_AUFGABE_VERGLEICH"
test -f docs/agents/SUB_AUFGABE_BEGRUENDUNG.md || echo "FEHLT: SUB_AUFGABE_BEGRUENDUNG"
grep -q "bloom_level" docs/architektur/vertraege/VERTRAG_PHASE_2-2b_AUFGABE.md || echo "FEHLT: Vertrag-Patch"
grep -q "A19" docs/checklisten/GUETEKRITERIEN_AUFGABEN.md || echo "FEHLT: A19"
```

Bei negativem Check: STOPP, Cowork-PM informieren.

---

## Scope (File-Ownership Claude-Code)

### A) Engine-Erweiterung: 2 neue Aufgabentypen

**Datei:** `assets/js/escape-engine.js`

Neue Registry-Eintraege:
1. `vergleich` — Tabellen-Rendering (Objekte × Dimensionen), String-Match pro Zelle, Umlaut-Toleranz + `akzeptierte_varianten`-Fallback.
2. `begruendung` — 3 Textarea-Felder (Claim, Evidence, Reasoning), fuzzy-Match gegen `_meta.akzeptierte_claims` (ANY), `evidence`-Array (ANY), `reasoning_schluesselbegriffe` (Schwelle ≥ 1).

**Schema-Referenz:** `docs/agents/SUB_AUFGABE_VERGLEICH.md` + `docs/agents/SUB_AUFGABE_BEGRUENDUNG.md` (Rendering-Kontrakt-Abschnitte).

**Feedback-Schema:** Nutzung von `normalizeFeedback()` aus AU-0 V2-Patch. Feedback-Objekte im Format `{typ: "korrekt"|"teilweise"|"falsch", text: string, ebene: string}`.

**BEM-Klassen:**
- `.aufgabe--vergleich`, `.vergleich__raster`
- `.aufgabe--begruendung`, `.cer`, `.cer--claim`, `.cer--evidence`, `.cer--reasoning`

**CSS:** `assets/css/styles.css` — neue Selektoren fuer die beiden Typen. Minimal, aber lesbar (Tabelle mit Rand, CER-Felder klar voneinander abgegrenzt).

### B) Validator-Tool

**Datei:** `tools/validate_bloom_distribution.py` (neu)

**Input:** Pfad zu Mappen-Verzeichnis (`escape-games/pulverfass-europa/mappe-N/`), liest `progressionsplan.json` + alle `aufgaben/aufgabe-*.json`.

**Logik:**
- Aggregiere `_meta.bloom_level` aller Aufgaben.
- Pruefe Policy: max 40 % L1-L2, min 30 % L3-L4, min 20 % L5-L6.
- Pruefe Pflichtfelder: `_meta.bloom_level` (Integer 1-6) und `_meta.bloom_begruendung` (String) bei jeder Aufgabe vorhanden.
- Exit 0 bei PASS, Exit 1 bei FAIL mit menschenlesbarer Fehlerliste.

**Signatur:**
```bash
python3 tools/validate_bloom_distribution.py escape-games/pulverfass-europa/mappe-4
```

**Integration:** Aufruf im Cowork-PM-Q-Gate (Phase 2.2b), separater Aufruf in Claude-Code nach Aufgaben-Produktion.

### C) Mappe-4-Exemplare (2 neue Aufgaben als End-to-End-Test)

**Datei:** `escape-games/pulverfass-europa/mappe-4/data.json`

- 1 Aufgabe `typ: "vergleich"` (z.B. Position 3, Bloom L4, Thema passend zu Mappe 4)
- 1 Aufgabe `typ: "begruendung"` (z.B. Position 5, Bloom L5, abschliessende Bewertungsfrage)
- Alle anderen Aufgaben der Mappe 4 erhalten `_meta.bloom_level` + `_meta.bloom_begruendung` (kommt aus Block-2-Auto-Klassifikator-Dispatch, Cowork-PM liefert `BLOOM_KLASSIFIKATION_MAPPEN_1_4.md` als Datenquelle).

**WICHTIG:** Die Aufgaben-Inhalte (Material-Bezuege, Claims, Dimensionen) muessen durch Cowork-PM-Dispatch oder in enger Abstimmung entstehen, NICHT von Claude-Code frei erfunden. Claude-Code traegt die technische Struktur ein und referenziert die Inhalts-Quelle (Konstruktionskontext aus `mappe-4/rahmen/progressionsplan.json`).

### D) Cache-Busting

**Dateien:** Alle HTML-Dateien, die `escape-engine.js` oder `styles.css` referenzieren (Root + `escape-games/**/*.html`)

**Aktion:** Version-Parameter hochzaehlen: `?v=3.9` → `?v=4.0` (einheitlich fuer JS + CSS).

### E) CHANGELOG + README

- `CHANGELOG.md` — Code-Strang-Eintrag unter Wave 1 AU-1: Engine-Registry +2, Validator neu, Mappe-4-Exemplare, Cache-Bust v=4.0.
- Keine README-Aenderung noetig, es sei denn Typauswahl dort dokumentiert.

---

## Pre-Commit-Gate (MANDATORY vor Commit)

```bash
# Check A — RA1 Scope-Check
grep -c "STR-02\|STR-11" docs/projekt/D15B_OPTIMIERUNGS_STRATEGIEN.md
# Erwartung: > 0. STR-02 + STR-11 aktiv.

# Check B — RA3 Code-Kopplungs-Check
git diff --cached assets/js/escape-engine.js | grep -E "checkFreitext|checkMc|checkLueckentext|checkReihenfolge|checkZuordnung"
# Erwartung: KEINE Aenderungen an Bestands-Check-Funktionen. Nur neue Funktionen _checkVergleich / _checkBegruendung.

# Check C — RA4 ATOM-UNIT-Check
git diff --cached --name-only | sort -u
```

**AU-1-Dateien (muessen ALLE im selben Commit sein):**
- `assets/js/escape-engine.js`
- `assets/css/styles.css`
- `tools/validate_bloom_distribution.py`
- `escape-games/pulverfass-europa/mappe-4/data.json`
- `index.html` (+ alle Spiel-HTMLs mit Cache-Bust)
- `CHANGELOG.md`

Bei FAIL eines Checks: Commit nicht absetzen, Luecken schliessen oder Cowork-PM kontaktieren.

---

## Validierungsschritte

```bash
# 1. JSON-Validierung Mappe 4
python3 -c "import json; json.load(open('escape-games/pulverfass-europa/mappe-4/data.json'))" && echo "JSON OK"

# 2. Bloom-Verteilungs-Validator
python3 tools/validate_bloom_distribution.py escape-games/pulverfass-europa/mappe-4

# 3. Engine-Sanity: escape-engine.js lintfrei?
node -e "require('./assets/js/escape-engine.js')" 2>&1 || echo "JS-Syntax-Fehler"

# 4. Browser-Smoke-Test (manuell durch User):
#    - Mappe 4 oeffnen
#    - Neue vergleich-Aufgabe sichtbar? Tabelle rendert?
#    - Neue begruendung-Aufgabe sichtbar? 3 CER-Felder rendern?
#    - Feedback-Anzeige nach Abgabe entspricht Schema {typ,text,ebene}?
```

---

## Commit-Nachricht (Vorlage)

```
feat(au-1): STR-02 bloom-tiefe + STR-11 vergleich/begruendung (Wave 1 AU-1 Code-Strang)

- Engine-Registry: 2 neue Aufgabentypen vergleich (Strukturraster, L4) + begruendung (CER, L5)
- Validator tools/validate_bloom_distribution.py (Policy: 40/30/20)
- Mappe 4: 2 neue Exemplare + bloom_level/bloom_begruendung fuer alle Aufgaben
- Cache-Bust v=3.9 -> v=4.0
- AU-1 ATOM-UNIT (VERTRAG_ATOM_UNITS.md §3)
```

---

## Nach erfolgreichem Commit

1. Push nach `main` (User-Ausfuehrung, Cowork hat keinen Push-Zugriff).
2. Cowork-PM informiert: "AU-1 Code-Strang gepusht, Commit `<hash>`."
3. Cowork-PM aktualisiert STATUS.md + CHANGELOG.md mit Wave-1-AU-1-COMPLETE.
4. Cowork-PM startet Wave-1-Naechster-Block (AU-2 oder Post-AU-1-Q-Gate-Review der Mappe-4-Testexemplare).
