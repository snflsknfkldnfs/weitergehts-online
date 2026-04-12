# Q-GATE-LOG: deutscher-nationalismus-kolonialismus (Game-Scope)

**Game-ID:** `deutscher-nationalismus-kolonialismus`
**Thema:** Deutscher Nationalismus und Kolonialismus
**Mappen:** 4 geplant

---

## Phase 3.1 Deploy-Preparation (Mappe 1)

**Datum:** 2026-04-12
**Gesamturteil:** PASS
**Script-Aufruf:** `./tools/deploy-check.sh deutscher-nationalismus-kolonialismus`

```
DEPLOY-01: PASS titel="Deutscher Nationalismus und Kolonialismus" mappen.len=1
DEPLOY-02: PASS 2 Asset-Refs geprueft, alle vorhanden
DEPLOY-03: PASS Titel 'Deutscher Nationalismus und Kolonialismus' im <li> enthalten
DEPLOY-04: PASS data.json.mappen=1, mappe-*.html=1
DEPLOY-05: PASS index.html referenziert escape-engine + data.json
---
GESAMT: PASS
```

| Gate | Kriterium | Ergebnis |
|---|---|---|
| DEPLOY-01 | `escape-games/deutscher-nationalismus-kolonialismus/data.json` ist JSON-valide und enthält `meta.titel`, `mappen[]` | PASS |
| DEPLOY-02 | Alle in data.json referenzierten Asset-Pfade existieren im Dateisystem | PASS |
| DEPLOY-03 | `titel`-String in data.json ist byte-identisch mit Landing-Page-`<li>`-Eintrag | PASS |
| DEPLOY-04 | Anzahl `mappen[]` in data.json stimmt mit Anzahl `mappe-*.html`-Dateien überein | PASS |
| DEPLOY-05 | `index.html` lädt Engine-Bundle und referenziert `data.json` relativ | PASS |

---

## Phase 3.2 Live-Go (Mappe 1)

**Datum:** 2026-04-12
**Gesamturteil:** PASS

| Schritt | Aktion | Ergebnis |
|---|---|---|
| 1 | USER-VALIDIERUNG (Zeile 21): User hat Mappe 1 im Staging geprüft | PASS (Defekt hefteintrag behoben, Engine-Patch empty-submit, re-deployed) |
| 2 | `data-status="staging"` aus `<li id="game-deutscher-nationalismus-kolonialismus">` entfernt | PASS |
| 3 | Commit `v3.11 deutscher-nationalismus-kolonialismus Mappe 1 live` | PASS |
| 4 | MAPPEN_ABGESCHLOSSEN: 0 → 1 | PASS |
