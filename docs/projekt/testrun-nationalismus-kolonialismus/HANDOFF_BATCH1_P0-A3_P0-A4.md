# HANDOFF BATCH-1: P0-A3 + P0-A4 (Quick-Fix-Welle)

**Erstellt:** 2026-04-18
**Empfaenger:** Claude Code (Dual-Root: weitergehts-online + escape-game-generator)
**Quelle:** R0-TESTRUN-AUDIT, BEFUND §4, BERICHT_RA3 §6, BERICHT_RA4 §9.3
**Geschaetzter Aufwand:** 45 min + QA
**Rueckmelde-Protokoll:** Commit-SHA + Test-Ergebnis je Fix an PM-Cowork zurueck

---

## Kontext

R0-TESTRUN-AUDIT hat 60 Findings identifiziert, davon 6 P0, die v3.12-Pilot blockieren. Batch-1 deckt die zwei schnellsten P0-Fixes ab, die unabhaengig voneinander sind und keine neue Infrastruktur benoetigen.

Detaillierte Referenzen:
- `docs/projekt/testrun-nationalismus-kolonialismus/BEFUND_TESTRUN_N-K_KONSOLIDIERT.md` §4
- `docs/projekt/testrun-nationalismus-kolonialismus/BERICHT_RA3_ENGINE_ASSEMBLY.md` §6 (P0-A3)
- `docs/projekt/testrun-nationalismus-kolonialismus/BERICHT_RA4_MEDIEN_LIZENZ.md` §9.3 (P0-A4)

---

## Task 1: P0-A3 Lueckentext-Pool-Reset-Bug

**Repo:** weitergehts-online
**Datei:** `assets/js/escape-engine.js`
**Zeile:** 2814
**Art:** Single-line-fix
**Aufwand:** 15 min + QA

### Bug-Beschreibung

`_fillLuecke` (Z. 2587) setzt beim Ausfuellen einer Luecke auf Pool-Buttons nur die CSS-Klasse `aufgabe__pool-wort--used`, jedoch **nicht** die `disabled`-Eigenschaft. Der Reset-Check in `_checkLueckentext` (Z. 2814) prueft jedoch gegen `.disabled`. Folge: bei falscher Antwort wird der Pool-Button nicht zum Wiederbenutzen freigegeben.

### Fix

**Aktuell (Z. 2814):**
```javascript
if (allBtns[m].getAttribute('data-wort') === falschesWort && allBtns[m].disabled) {
```

**Zu aendern auf:**
```javascript
if (allBtns[m].getAttribute('data-wort') === falschesWort && allBtns[m].classList.contains('aufgabe__pool-wort--used')) {
```

### Verifikation

1. Cache-Bust: `assets/js/escape-engine.js` Versions-Parameter in allen HTML-Referenzen hochzaehlen (z.B. `?v=3.13` → `?v=3.14`). Achte auf ALLE Escape-Game-HTMLs, die die Engine laden.
2. Lokaler Regression-Test: Testrun auf `escape-games/deutscher-nationalismus-kolonialismus/index.html` (oder beliebigem anderen Game mit Lueckentext-Aufgabe im Pool-Modus).
   - Luecke-1 mit falschem Pool-Wort fuellen → Submit
   - Erwartet: Button wird wieder anklickbar + Klasse `--used` entfernt
3. Deploy-Check: `./tools/deploy-check.sh` (falls vorhanden) auf betroffenem Game.

### Commit-Message-Vorlage

```
fix(engine): Lueckentext-Pool-Reset verwendet Klasse statt disabled-Attribut

P0-A3 / F-RA3-01 aus R0-TESTRUN-AUDIT.

escape-engine.js Z. 2814: Reset-Check prueft jetzt
classList.contains('aufgabe__pool-wort--used') statt .disabled.
Grund: _fillLuecke setzt nur die Klasse, nicht disabled.
Folge des Bugs: Pool-Buttons bei falscher Antwort nicht zurueckgesetzt.

Cache-Bust: ?v=X.Y -> ?v=X.(Y+1) in allen HTML-Referenzen.

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Task 2: P0-A4 Source-Deploy-Drift mat-3-4.json

**Repo:** escape-game-generator (Source)
**Datei:** `docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-3/materialien/mat-3-4.json`
**Zeile (Caption):** 10
**Art:** Source-Patch + optional Q-SOURCE-DEPLOY-PARITY-Check
**Aufwand:** 30 min

### Bug-Beschreibung

Das Source-JSON `mat-3-4.json` enthaelt noch die halluzinierte Original-Caption ("L'Illustration, 1885", `Berlin_Conference,_1884-85.jpg`). Die Korrektur (Maréchal-Karikatur, `Le Frondeur` 1884) wurde damals nur in `data.json` (Deploy) eingespielt, nicht in der Source. Re-Assembly wuerde den Hallu-Text zuruecksetzen.

### Fix

1. **Source patchen:** `mat-3-4.json` so aktualisieren, dass Caption + Urheber + Datum + Publikation dem Maréchal-Ersatz entsprechen, der aktuell in `data.json` Zeile ~1994 steht.

   Ziel-Caption (aus data.json uebernehmen, PM-Referenz):
   > "Belgische Karikatur von François Maréchal, erschienen im satirischen Blatt 'Le Frondeur' am 20. Dezember 1884. Im Zentrum sitzt der belgische König Leopold II., rechts der deutsche Kaiser Wilhelm I., links der russische Bär. Vor ihnen auf dem Tisch: der Kongo als 'Hauptgericht' eines Festmahls."

   Commons-Dateiname: (aus data.json ermitteln) — Urheber: François Maréchal, Publikation: Le Frondeur, Datum: 20.12.1884, Lizenz: Public Domain.

2. **Verifikation:** Source-JSON vs. data.json Caption-String vergleichen (grep/diff).

3. **Q-SOURCE-DEPLOY-PARITY (optional, aber empfohlen):** Einfaches Tool-Script `tools/source-deploy-parity.sh` oder `.py`, das:
   - Fuer jedes Game: alle `mat-*.json` im Source-Verzeichnis durchlaeuft
   - Hash der `caption`/`bildquelle.beschreibung`-Felder berechnet
   - Gegen Deploy-`data.json`-Pendant abgleicht
   - Mismatch → Exit-Code != 0 + Report

### Deploy-Prozedur

- Nach Source-Patch: KEIN erneutes vollstaendiges Re-Assembly von data.json noetig (Deploy ist bereits korrigiert).
- Statt: Source-Patch auf Re-Assembly-Spur dokumentieren (Commit reicht).
- Bei naechstem regulaerem Re-Assembly greift die Korrektur automatisch.

### Commit-Message-Vorlage (Source-Repo)

```
fix(source): mat-3-4.json Caption-Sync mit data.json (Maréchal-Ersatz)

P0-A4 / F-RA4-04 aus R0-TESTRUN-AUDIT.

Source-Deploy-Drift behoben: mat-3-4.json trug noch halluzinierte
"L'Illustration, 1885"-Caption. Ersatz durch Maréchal-Karikatur-Text
(Le Frondeur 20.12.1884) wurde in MV2 nur in data.json gemacht.
Re-Assembly haette Hallu-Text zurueckgeholt.

Optional: tools/source-deploy-parity.sh als Regression-Guard
(Q-SOURCE-DEPLOY-PARITY aus UPGRADE_PLAN v1.3 Section 19).

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Rueckmelde-Prozedur an PM-Cowork

Nach Abschluss beider Fixes bitte an PM melden:

**Format:**
```
P0-A3: commit <SHA> in weitergehts-online, Test <PASS|FAIL|SKIPPED>
P0-A4: commit <SHA> in escape-game-generator, Parity-Check <IMPLEMENTED|DEFERRED>
Cache-Bust-Version: ?v=X.Y -> ?v=X.Z
Abweichungen vom Plan: <keine | beschrieben>
```

PM aktualisiert dann:
- `docs/projekt/STATUS.md` P0-Tabelle (P0-A3, P0-A4 CLOSED)
- `docs/projekt/CHANGELOG.md` neuer Eintrag
- Batch-2 freischalten

---

## Nicht-Ziele dieses Batches

- P0-A5 (Mappe-4 Retro-Patch) — Batch-2
- P0-A6 (Q-MEDIEN-PROSPEKTIV) — Batch-2
- P0-A1/A2 (Pipeline-Regression) — Batch-3
- Entity-Sweep Mappe 3 (F-RA3-02 P2) — nicht P0
- Hefteintrag-Dualstruktur (F-RA3-03 P1) — nicht P0
