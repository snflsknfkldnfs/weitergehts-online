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

---

## Phase 3.1 Deploy-Preparation (Mappe 4 — Game-Abschluss)

**Datum:** 2026-04-20
**Gesamturteil:** PASS
**Script-Aufruf:** `./tools/deploy-check.sh deutscher-nationalismus-kolonialismus`

```
DEPLOY-01: PASS titel="Deutscher Nationalismus und Kolonialismus" mappen.len=4
DEPLOY-02: PASS 9 Asset-Refs geprueft, alle vorhanden
DEPLOY-03: PASS Titel 'Deutscher Nationalismus und Kolonialismus' im <li> enthalten
DEPLOY-04: PASS data.json.mappen=4, mappe-*.html=4
DEPLOY-05: PASS index.html referenziert escape-engine + data.json
DEPLOY-06: PASS 4 Mappe(n) strukturell vollstaendig (einstieg, materialien, aufgaben, sicherung.hefteintrag)
DEPLOY-07: PASS Caption/Quellen-Parity: ✅ PASS: Alle Source-JSONs synchron mit data.json
DEPLOY-07-SHA: PASS SOURCE_SHA256=f5a167cc2a22...
---
GESAMT: PASS
[Q-GATE-LOG] DEPLOY_CHECK=PASS GAME=deutscher-nationalismus-kolonialismus MAPPE=ALL TS=2026-04-20T04:33:38Z SCRIPT_VERSION=c22a340
```

| Gate | Kriterium | Ergebnis |
|---|---|---|
| DEPLOY-01 | data.json valide; meta.titel + mappen[] vorhanden (mappen.len=4) | PASS |
| DEPLOY-02 | 9 Asset-Refs aus data.json geprüft, alle vorhanden (inkl. neuer img-4-1.jpg + img-4-2.jpg) | PASS |
| DEPLOY-03 | titel-String byte-identisch mit Landing-Page-`<li>`-Eintrag | PASS |
| DEPLOY-04 | data.json.mappen=4 == mappe-*.html=4 | PASS |
| DEPLOY-05 | index.html referenziert escape-engine + data.json | PASS |
| DEPLOY-06 | 4 Mappen strukturell vollständig (einstieg, materialien, aufgaben, sicherung.hefteintrag) | PASS |
| DEPLOY-07 | Source-Deploy-Parity: alle Source-JSONs synchron mit data.json (Captions/Quellen) | PASS |

**Staging-Hinweis:** Game ist seit Mappe 1 Phase 3.2 bereits live (`data-status="staging"` wurde dort entfernt). Mappe 4 wird durch Commit+Push direkt unter bestehendem live-Listeneintrag verfügbar — kein separater Staging-Flag-Toggle nötig.

**Game-Gesamt-Metriken (4/4 Mappen):**
- Phase-2-Q-Gates kumuliert: 16 Gates (2.0, 2.1, 2.1b, 2.1c, 2.2a, 2.2b, 2.2c × 4 Mappen, teils geteilt) — alle PASS
- Materialien gesamt: 6 (M1) + 6 (M2) + 6 (M3) + 5 (M4) = 23
- Aufgaben gesamt: 7 (M1) + 5 (M2) + 4 (M3) + 6 (M4) = 22
- Tafelbild-Knoten gesamt: k1-* + k2-* + k3-* + k4-1..k4-4 → Sequenz-weites Concept-Map

---

## Phase 3.2 Live-Go (Mappe 4 — Game-Abschluss)

**Datum:** 2026-04-20
**Gesamturteil:** PASS

| Schritt | Aktion | Ergebnis |
|---|---|---|
| 1 | USER-VALIDIERUNG (PI-Zeile 21): User hat Mappe 4 live im Browser geprueft | PASS ("browser check pass", 2026-04-20) |
| 2 | STAGING-FLAG-ENTFERNT | n.a. — Game seit Mappe 1 Phase 3.2 (2026-04-12) bereits live; kein `data-status="staging"` mehr am `<li>`. Mappe 4 wurde durch Phase-3.1-Commit `df6378e` direkt unter bestehendem Live-Listeneintrag sichtbar. |
| 3 | Commit `v3.12 deutscher-nationalismus-kolonialismus Mappe 4 live + Game ABGESCHLOSSEN` (PI-Update + Snapshot + Q-GATE-LOG-Ergaenzung) | PASS |
| 4 | MAPPEN_ABGESCHLOSSEN: 3 → 4 | PASS |
| 5 | POST-DEPLOY-SMOKETEST | n.a. (Q2=b, optional) |

**Game-Status nach Phase 3.2:** ABGESCHLOSSEN. Alle 4 Mappen live unter `https://weitergehts.online/escape-games/deutscher-nationalismus-kolonialismus/`. PROJECT_INSTRUCTIONS_SNAPSHOT.md persistiert unter `docs/agents/artefakte/deutscher-nationalismus-kolonialismus/PROJECT_INSTRUCTIONS_SNAPSHOT.md`.

**Kumulative Game-Bilanz (final):**
- Phase 0 (Didaktik/Inhalt/Skript/Hefteintrag): PASS
- Phase 1 (Material-Geruest): PASS
- Phase 2 Mappen 1–4 (2.0 bis 2.2c, je Mappe): alle PASS
- Phase 3.1 Deploy-Prep (Mappe 1 + Mappe 4 ALL-Scope): PASS
- Phase 3.2 Live-Go (Mappe 1 + Mappe 4): PASS
