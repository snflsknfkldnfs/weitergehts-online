# E2 Engine-Reunifikation — Design

**Ziel:** Der Syrien-vendor-Fork der Runtime wird in die geteilte Engine zurückgeführt, das Game
kommt unter `?v=`-Governance; die Marne-Differenzierung wandert aus dem `_dev`-Ordner ins
Live-Pendant. Danach gibt es wieder genau EINE Engine — `make bump A=engine` erreicht alle Games.

## Befund (Ist-Analyse 2026-07-18)

Der Fork ist klein und sauber: `vendor/core.js`, `vendor/base.css`, `vendor/theme-gpg.css` sind
**byte-identisch** mit den geteilten Pendants. `vendor/escape-engine.js` (5178 Z.) weicht von
`assets/js/escape-engine.js` (5149 Z., v3.20) in genau **drei Hunks** ab:

1. **Statistik-SVG** (~Z. 1177): `inhalt` kann ein inline-SVG-String sein (der egg-v2
   statistik-Producer emittiert Diagramm ODER Tabelle). Die geteilte Engine parst nur
   JSON-Tabellen — ein SVG-String würde als leere Tabelle enden. Syrien nutzt SVG in 3 Mappen.
2. **Tafelbild-Sicherung** (~Z. 1308): `sicherung.typ === 'tafelbild'` rendert `sicherung.html`
   als lazy-iframe. Syrien nutzt das in allen 4 Mappen (`tafelbild/`-Ordner).
3. **Differenzierungs-Selektor** (~Z. 5132): `aufsReady` wartet auf `[id^="auf"]` statt
   `[id^="aufgabe-"]`. Grund: Syriens Aufgaben-IDs heißen `auf-1-1`, alle anderen Games
   `aufgabe-1-1`. `[id^="auf"]` ist ein striktes Superset → für alle Games korrekt.

Alle drei Hunks sind **additiv bzw. Superset** — es gibt keinen Hunk, in dem die geteilte Engine
neuer wäre als der Fork. Reunifikation = geteilte Engine + 3 Hunks, keine Konfliktauflösung.

**Marne:** `_dev-verlauf-erster-weltkrieg-marne-ende-diff/` unterscheidet sich vom Live-Pendant
ausschließlich in `data.json`: Differenzierung Mappe 1 (meta-Flags, `verfuegbare_sprachen`
de/ru/ar, `frage_uebersetzung`, `ki_prompt`, `glossar`) plus der Frage-6-Fix
(`begruendung` → `freitext-code`, Branch `fix/marne-diff-frage6`, in `main` gemergt). Live hat
seit der Dev-Kopie keine eigenen Hotfixes (nur 1 Commit, der Erst-Deploy). Richtung dev→live ist
verlustfrei.

## Entscheidungen

1. **Engine-Merge in `assets/js/escape-engine.js`**, Fork-Duplikate (`vendor/escape-engine.js`,
   `core.js`, `base.css`, `theme-gpg.css`) werden gelöscht. Syrien-HTML referenziert die
   geteilten Pfade mit `?v=`-Token (Governance via `assets/versions.json` + `make bump`;
   `bump-assets.py` erfasst `escape-games/**/*.html` bereits).
2. **Redesign-Overlay bleibt vendored** (`redesign.css`, `redesign-uebersicht.css`,
   `rd-inject.js`, `media-placeholder.css`, `fonts/`): Das ist E1-Material („Redesign-Overlay →
   Site-weites Token-Fundament") — E2 zieht es NICHT vor. `rd-inject.js` ist rein DOM-additiv
   (klassenbasiert, kein Engine-Coupling) und läuft unverändert gegen die geteilte Engine.
3. **Selektor-Vereinheitlichung per Superset** `[id^="auf"]` statt Daten-Migration der
   Syrien-IDs auf `aufgabe-*`: minimal-invasiv, kein data.json-Touch, kein Freischalt-Code-Risiko.
   (Alternative — Syrien-IDs umbenennen — verworfen: breiter Blast-Radius in data.json,
   localStorage-Progress der Schüler hinge an alten IDs.)
4. **Marne:** `data.json` dev→live kopieren, danach `_dev`-Ordner löschen (git-versioniert,
   Revert billig; Inhalt sonst 100 % redundant).
5. **Engine-Bump 3.20 → 3.21** (Engine-Änderung → Pflicht laut CLAUDE.md), ein Bump für alles.

## Nicht-Ziele

- Kein Redesign-Rollout auf andere Games (E1) · keine URL-/IA-Änderung (E3) ·
  keine data.json-Inhaltsarbeit über den Marne-Port hinaus · keine Generator-Apparat-Berührung.
