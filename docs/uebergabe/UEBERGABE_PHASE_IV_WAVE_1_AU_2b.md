# Uebergabe: Phase IV Wave 1 AU-2b — Code-Strang (STR-04 Tipp-Haertegrade)

**Status:** BEREIT FUER CLAUDE-CODE (nach Cowork-PM-Commit Session 13)
**Herkunft:** Phase IV Wave 1 AU-2b Bundle, PM-Strang abgeschlossen in Cowork 2026-04-06
**ATOM-UNIT:** AU-2b — alle Aenderungen dieses Uebergabe-Prompts muessen in EINEM Commit merged werden (VERTRAG_ATOM_UNITS.md §3 AU-2b)
**Pre-Commit-Gate:** 3 Checks (RA1 Scope / RA3 Code-Kopplung / RA4 ATOM-UNIT) MUSS bestanden werden
**Vorgaenger:** AU-2a CLOSED (PM `0af35f3`+`2de4f9e`, Code `bcb9eeb`)
**Abgrenzung:** AU-2b liefert NUR Tipp-Haertegrad-Infrastruktur. Kein Backfill der Bestands-Tipps. AU-2c (BEFUND-AU-1-UI-01) ist separat.

---

## Kontext

AU-2a ist geschlossen (STR-03 Feedback-Schema Rollout). AU-2b setzt STR-04 aus D15B um: Tipps erhalten das Pflichtfeld `haertegrad` (`"kognitiv" | "strukturierend" | "heuristisch"`). Das Mapping stufe→haertegrad ist deterministisch: 1=kognitiv, 2=strukturierend, 3=heuristisch.

**Grundsatz-Entscheidung (User 2026-04-06):** Infrastruktur-First. Das bestehende Game 1 dient nur als Testumgebung. Kein Backfill-Dispatch fuer die 26 bestehenden Aufgaben — die Tipps funktionieren mit `{stufe, text}` weiter, `normalizeTipps()` ergaenzt `haertegrad` zur Laufzeit als Safety-Net. Zukuenftige Games produzieren ab Erzeugung mit `{stufe, haertegrad, text}`.

PM-Strang (Cowork) hat committed (Session 13):
- `docs/architektur/vertraege/VERTRAG_PHASE_2-2b_AUFGABE.md` (A6 Tipp-Schema Pflichtfeld)
- `docs/architektur/vertraege/VERTRAG_ATOM_UNITS.md` (AU-2b Scope aktualisiert)
- `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md` (§3.1c A21)
- 7× `docs/agents/SUB_AUFGABE_*.md` (Haertegrad-Beispielmatrix + Anti-Leak-Regel + A21-Querverweis pro Typ)

---

## Pre-Flight

```bash
cd ~/weitergehts.online/weitergehts-online
git status
git pull --ff-only origin main
grep -q "haertegrad" docs/architektur/vertraege/VERTRAG_PHASE_2-2b_AUFGABE.md || echo "FEHLT: haertegrad in Vertrag"
grep -q "A21" docs/checklisten/GUETEKRITERIEN_AUFGABEN.md || echo "FEHLT: A21"
grep -q "Anti-Leak" docs/agents/SUB_AUFGABE_MC.md || echo "FEHLT: Anti-Leak in SUB_MC"
grep -q "normalizeFeedback" assets/js/escape-engine.js || echo "FEHLT: normalizeFeedback (AU-2a)"
```

Bei negativem Check: STOPP, Cowork-PM informieren.

---

## Scope (File-Ownership Claude-Code)

### A) Engine-Hardening: normalizeTipps() Safety-Net

**Datei:** `assets/js/escape-engine.js`

Neue Funktion `normalizeTipps(tipps)` (analog `normalizeFeedback`), aufgerufen in `_normalizeDataFeedback` (umbenennen zu `_normalizeData` oder separaten Aufruf ergaenzen):

```javascript
function normalizeTipps(tipps) {
  if (!Array.isArray(tipps)) return tipps;
  var HAERTEGRAD_MAP = {1: 'kognitiv', 2: 'strukturierend', 3: 'heuristisch'};
  return tipps.map(function(t) {
    if (typeof t === 'string') {
      // Legacy: reiner String -> Stufe unbekannt, haertegrad unbekannt
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('[escape-engine] Legacy-String tipp erkannt:', t.slice(0, 60));
      }
      return {stufe: 0, haertegrad: 'unbekannt', text: t};
    }
    if (t && typeof t === 'object' && !t.haertegrad && t.stufe) {
      // AU-2b Migration: stufe vorhanden, haertegrad fehlt -> deterministisch ableiten
      t.haertegrad = HAERTEGRAD_MAP[t.stufe] || 'unbekannt';
    }
    return t;
  });
}
```

Integration: Nach dem Feedback-Normalisierungs-Loop in `_normalizeDataFeedback` (oder neuer Funktion) die Tipps jeder Aufgabe normalisieren:

```javascript
if (auf.tipps !== undefined) {
  auf.tipps = normalizeTipps(auf.tipps);
}
```

**Scope-Grenze:** NUR `normalizeTipps` hinzufuegen + Aufruf integrieren. KEINE Aenderung an `normalizeFeedback`, KEINE Aenderung an Check-Funktionen, KEINE Aenderung am Tipp-Renderer-UI.

### B) Validator-Erweiterung: Tipp-Schema-Checks

**Datei:** `tools/validate-feedback-schema.js` (existiert seit AU-2a)

Ergaenzung: Pro Aufgabe zusaetzlich `tipps`-Feld validieren:
- Array mit genau 3 Eintraegen.
- Jeder Eintrag: `stufe` (1|2|3), `haertegrad` ("kognitiv"|"strukturierend"|"heuristisch"), `text` (non-empty String, max 400 Zeichen).
- Stufe-Haertegrad-Konsistenz: stufe 1 = kognitiv, stufe 2 = strukturierend, stufe 3 = heuristisch.
- **Anti-Leak-Heuristik (A21):** `tipps[2].text` (Stufe 3, heuristisch) darf die korrekte Antwort nicht woertlich enthalten. Pruefung: Substring-Match von `loesung` (String oder erstes Array-Element) gegen `tipps[2].text`. Bei Match → WARN (nicht FAIL, da Heuristik — false positives moeglich).
- Fehlendes `haertegrad`-Feld: WARN (Legacy, Safety-Net greift zur Laufzeit), nicht FAIL.

**Exit-Codes:** Exit 0 bei PASS (alle Feedback + Tipp Checks OK), Exit 1 bei FAIL.

### C) Cache-Busting

**Dateien:** Alle HTML-Dateien unter `escape-games/gpg-erster-weltkrieg-ursachen/`:
- `index.html`, `mappe-1.html`, `mappe-2.html`, `mappe-3.html`, `mappe-4.html`, `lehrkraft.html`

**Aktion:** `?v=4.1` → `?v=4.2` fuer alle JS/CSS-Referenzen.

**Sanity-Grep:**
```bash
grep -rn "?v=4\.1" escape-games/gpg-erster-weltkrieg-ursachen/
# Erwartung: leer
```

### D) CHANGELOG

`CHANGELOG.md` — Code-Strang-Eintrag unter Wave 1 AU-2b:
- Engine: normalizeTipps() Safety-Net (deterministisches haertegrad-Mapping)
- tools/validate-feedback-schema.js: Tipp-Schema-Checks + Anti-Leak-Heuristik (A21)
- Cache-Bust v=4.1 → v=4.2

---

## Pre-Commit-Gate (MANDATORY vor Commit)

```bash
# Check A — RA1 Scope-Check
grep -c "STR-04" docs/projekt/D15B_OPTIMIERUNGS_STRATEGIEN.md
# Erwartung: > 0.

# Check B — RA3 Code-Kopplungs-Check
git diff --cached assets/js/escape-engine.js | grep -E "checkFreitext|checkMc|checkLueckentext|checkReihenfolge|checkZuordnung|_checkVergleich|_checkBegruendung|normalizeFeedback"
# Erwartung: KEINE Aenderungen an bestehenden Funktionen. Nur normalizeTipps neu + Integration.

# Check C — RA4 ATOM-UNIT-Check
git diff --cached --name-only | sort -u
```

**AU-2b-Dateien (muessen ALLE im selben Commit sein, KEINE anderen):**
- `assets/js/escape-engine.js`
- `tools/validate-feedback-schema.js`
- `escape-games/gpg-erster-weltkrieg-ursachen/index.html`
- `escape-games/gpg-erster-weltkrieg-ursachen/mappe-1.html`
- `escape-games/gpg-erster-weltkrieg-ursachen/mappe-2.html`
- `escape-games/gpg-erster-weltkrieg-ursachen/mappe-3.html`
- `escape-games/gpg-erster-weltkrieg-ursachen/mappe-4.html`
- `escape-games/gpg-erster-weltkrieg-ursachen/lehrkraft.html`
- `CHANGELOG.md`

**NICHT im Commit:** `assets/css/themes/theme-gpg.css` (AU-2c), data.json-Aenderungen (kein Backfill).

---

## Validierungsschritte

```bash
# 1. Engine-Sanity
node -e "require('./assets/js/escape-engine.js')" 2>&1 || echo "JS-Syntax-Fehler"

# 2. Validator (Feedback + Tipps)
node tools/validate-feedback-schema.js escape-games/gpg-erster-weltkrieg-ursachen/data.json
# Erwartung: Feedback 26/26 PASS. Tipps: WARN fuer fehlendes haertegrad (Legacy, erwartet).

# 3. Cache-Bust-Konsistenz
grep -rn "?v=4\.1" escape-games/gpg-erster-weltkrieg-ursachen/
# Erwartung: leer.

# 4. Browser-Smoke-Test (User, nach Push):
#    - Hard-Reload Mappe 1
#    - Console: normalizeTipps ergaenzt haertegrad automatisch (kein Legacy-String-Warning)
#    - Tipp-Buttons funktionieren wie bisher (kein UI-Bruch)
```

---

## Commit-Nachricht (Vorlage)

Datei: `.git-commit-msg-au2b.txt`

```
feat(au-2b): STR-04 tipp-haertegrade infrastruktur (Wave 1 AU-2b Code-Strang)

- normalizeTipps() Safety-Net: deterministisches stufe->haertegrad Mapping + Legacy-String-Warning
- validate-feedback-schema.js: Tipp-Schema-Checks (3 Eintraege, Enum, Konsistenz) + Anti-Leak-Heuristik A21
- Cache-Bust v=4.1 -> v=4.2 (gpg-erster-weltkrieg-ursachen)
- Kein Backfill (Infrastruktur-First, User-Grundsatzentscheidung 2026-04-06)
- AU-2b ATOM-UNIT (VERTRAG_ATOM_UNITS.md §3 AU-2b)
```

---

## Nach erfolgreichem Commit

1. Push nach `main` (User-Ausfuehrung).
2. Cowork-PM informieren: "AU-2b Code-Strang gepusht, Commit `<hash>`."
3. Cowork-PM aktualisiert STATUS.md + CHANGELOG.md.
4. Naechster Schritt: AU-2c (BEFUND-AU-1-UI-01) oder naechste Wave gemaess User-Priorisierung.

---

## Quellen-Bindung

- `docs/architektur/vertraege/VERTRAG_ATOM_UNITS.md` §3 AU-2b
- `docs/architektur/vertraege/VERTRAG_PHASE_2-2b_AUFGABE.md` (A6 Tipp-Schema)
- `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md` §3.1c (A21)
- `docs/agents/SUB_AUFGABE_*.md` (Haertegrad-Beispielmatrix pro Typ)
- `docs/projekt/GIT_WORKFLOW_RAHMEN.md` (Commit-Mechanik §2)
