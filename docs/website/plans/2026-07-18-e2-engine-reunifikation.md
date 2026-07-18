# E2 Engine-Reunifikation — Implementation Plan

**Goal:** Eine Engine für alle Games: die 3 Syrien-Fork-Hunks in `assets/js/escape-engine.js`
mergen, Syrien-HTML auf geteilte Assets + `?v=` umstellen, Fork-Duplikate löschen,
Marne-Differenzierung dev→live, Engine-Bump 3.21, Gates grün. Design: `../specs/2026-07-18-e2-engine-reunifikation-design.md`.

**Architecture:** Nur Website-Pflege-Schicht. Redesign-Overlay bleibt vendored (E1).

## Global Constraints

- Branch `feat/e2-engine-reunifikation`; **kein Push/Merge — nur auf Ansage von Paul.**
- Explizit stagen, nie `git add .`/`-A`. `?v=` nie von Hand — nur `make bump A=engine`.
- Vor Commit: `make check` BLOCKING-grün; Engine-Änderung → zusätzlich `make smoke`.

---

### Task 1: Branch

- [x] `git checkout -b feat/e2-engine-reunifikation` (sauberer Stand verifiziert)

### Task 2: Engine-Merge (3 Hunks aus `vendor/escape-engine.js` → `assets/js/escape-engine.js`)

- [x] Statistik-SVG-Branch (inkl. Kommentar-Ersatz) an ~Z. 1177
- [x] Tafelbild-Sicherung an ~Z. 1292
- [x] `aufsReady`-Selektor `[id^="aufgabe-"]` → `[id^="auf"]` an ~Z. 5103
- [x] Verifikation: `diff vendor/escape-engine.js assets/js/escape-engine.js` → leer

### Task 3: Syrien-HTML-Rewire + Vendor-Cleanup

- [x] `index.html` + `mappe-1..4.html`: `vendor/{base.css,theme-gpg.css,core.js,escape-engine.js}`
      → `../../assets/…` mit aktuellem Token aus `versions.json` (Bump folgt in Task 5)
- [x] `git rm` der 4 Vendor-Duplikate; Overlay-Dateien + `fonts/` bleiben
- [x] Repo-weiter Grep: keine Referenz mehr auf die gelöschten Vendor-Pfade

### Task 4: Marne-Port

- [x] `cp _dev-…-diff/data.json → verlauf-erster-weltkrieg-marne-ende/data.json`
- [x] `git rm -r escape-games/_dev-verlauf-erster-weltkrieg-marne-ende-diff/`

### Task 5: Bump + Gates

- [x] `make bump A=engine` (3.20 → 3.21; gleicht alle HTML inkl. Syrien an)
- [x] `make check` BLOCKING-grün · `make smoke` grün

### Task 6: Verifikation (adversarial, Workflow mit Opus-Widerlegern)

- [x] Merge-Hunks, Rewire, Marne-Port unabhängig gegenprüfen — 4 Prüfer (2× Opus adversarial,
      Sonnet-Mechanik, Opus-Playwright-Funktionstest): PASS, 0 Code-Befunde

### Task 7: Doku im selben Branch

- [x] `PROZESS.md` Stand E2 ✅ + nächster Schritt E1 · `ARCHITEKTUR.md` Log-Eintrag
- [x] `CLAUDE.md`: Fork-Ausnahme-Absatz entfernen · `SITE_MAP.md`: vendor-/`_dev`-Einträge aktualisieren
