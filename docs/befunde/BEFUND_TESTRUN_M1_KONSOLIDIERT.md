# BEFUND: Konsolidierter Testrun Mappe 1 — Alle Phasen

**Datum:** 2026-04-10
**Session:** 28 (Konsolidierung)
**Scope:** Gesamter Produktions-Testrun Game 1, Mappe 1 (Phase 0→1→2.0→2.1→2.1c→2.2a→2.2b→2.2c→3.0)
**Einzelbefunde:** BEFUND_PHASE_2-0_RAHMEN_M1.md, BEFUND_PHASE_2-1_MATERIAL_M1.md, BEFUND_PHASE_2-1_MATERIAL_M1_TIEFENAUDIT.md, BEFUND_PHASE_2-1c_2-2a_TESTRUN_M1.md, BEFUND_PHASE_2-2b_TESTRUN_M1.md, BEFUND_PHASE_2-2c_3-0_TESTRUN_M1.md
**Zweck:** Actionable Patch-Liste fuer Infrastruktur vor Mappe 2

---

## 1. Gesamtbilanz

| Phase | Gate | Findings |
|---|---|---|
| 0-1 (Rahmen) | CONDITIONAL PASS | 2H / 3M / 2L |
| 2.1 (Material) | PASS | 0H / 2M / 2L |
| 2.1 Tiefenaudit | — | v3.6-Patches ausgeloest |
| 2.1c + 2.2a | CONDITIONAL PASS | 1H / 2M / 2L |
| 2.2b (Aufgaben) | PASS | 0H / 1M / 2L |
| 2.2c + 3.0 | PASS | 0H / 2M / 1L |
| Prozess-Audit (Session 28) | — | 2 neue Prozess-Findings |
| **GESAMT** | | **3H / 10M / 9L + 2 Prozess** |

Davon bereits gepatcht (v3.6, v3.7, v3.8): 3H + 5M + 5L. Offen: 5M + 4L + 2 Prozess.

---

## 2. Offene Findings — Actionable Patch-Liste

Sortiert nach Dringlichkeit. Jedes Finding hat eine eindeutige ID fuer Tracking.

### PROZESS-Findings (Steuerungsarchitektur)

**F-P1: ORCHESTRATOR wird nicht als Phasen-Router genutzt**

- **Quelle:** Prozess-Audit Session 28 (Transkript-Analyse)
- **Schwere:** HIGH (Prozess)
- **Befund:** ORCHESTRATOR.md wurde im Testrun 10× gelesen, aber NICHT systematisch an Phasen-Transitionen. Vor Phase 3.0 kein ORCHESTRATOR-Read. Der Agent routet sich selbst direkt zu Vertraegen. Das unterlaueft das ORCHESTRATOR-First-Steuerungsmodell.
- **Root Cause:** Weder ORCHESTRATOR noch PROJECT_INSTRUCTIONS.md erzwingen einen ORCHESTRATOR-Read als Phasen-Precondition. Es ist eine Empfehlung, kein Constraint.
- **Patch-Ziel:** escape-game-generator
- **Patch-Vorschlag:** (A) PROJECT_INSTRUCTIONS.md: Jede State-Machine-Transition erhaelt Precondition `LIES: ORCHESTRATOR.md §[Phase]`. (B) ORCHESTRATOR.md: Pro Phase einen `## Phase N — Steuerungskontext` Block mit explizitem "LIES DIESEN ABSCHNITT VOR dem Vertrag".
- **Patch-Aufwand:** 15-20 min
- **Dringlichkeit:** Vor Mappe 2

**F-P2: Phase 3 Assembly in Cowork statt Claude Code ausgefuehrt**

- **Quelle:** Prozess-Audit Session 28
- **Schwere:** MEDIUM (Prozess)
- **Befund:** WORKFLOW_v4 definiert Phase 3 als `Ort: Claude Code` (Zeile 175) und `KEIN Assembly in Cowork` (Zeile 754). Der Testrun fuehrte Phase 3 in derselben Cowork-Session aus. Phase 2 soll mit einem Uebergabe-Prompt enden, der an Claude Code uebergeben wird.
- **Root Cause:** PROJECT_INSTRUCTIONS.md State Machine erzwingt den Ort-Wechsel nicht. Der Agent sieht die naechste Phase und fuehrt sie aus, unabhaengig vom vorgesehenen Ausfuehrungsort.
- **Patch-Ziel:** escape-game-generator
- **Patch-Vorschlag:** (A) PROJECT_INSTRUCTIONS.md: Transition 2.2c→3.0 durch STOP-Marker ersetzen: `2.2c PASS → STOP. Output: Uebergabe-Prompt fuer Claude Code.` (B) ORCHESTRATOR.md: Phase 3 Abschnitt mit `AUSFUEHRUNGSORT: Claude Code. NICHT in Cowork.` markieren.
- **Patch-Aufwand:** 10 min
- **Dringlichkeit:** Vor Mappe 2

### MEDIUM-Findings (Vertraege / Schema)

**F-M1: sicherung.zitat fehlt in Assembly-Template**

- **Quelle:** BEFUND_PHASE_2-2c_3-0_TESTRUN_M1.md, M1
- **Befund:** VERTRAG_PHASE_3_ASSEMBLY.md §3.2.3 definierte sicherung-Template ohne zitat-Feld. Produktions-Artefakt sicherung.json enthaelt zitat, aber Assembly uebertraegt es nicht nach data.json.
- **Status:** GEPATCHT (v3.8, Session 28) — zitat-Feld als optional in Assembly-Template eingefuegt.
- **Offen:** Engine-Renderer muss zitat-Feld unterstuetzen (escape-engine.js). P1 Code-Strang.
- **Restaufwand:** Engine-Patch (Claude Code)

**F-M2: merksaetze[]-Referenz inkonsistent mit knoten[].merksatz-Schema**

- **Quelle:** BEFUND_PHASE_2-2c_3-0_TESTRUN_M1.md, M2
- **Befund:** Vertraege referenzierten `hefteintrag.merksaetze[]` als Top-Level-Array. Tatsaechliches Schema: `knoten[].merksatz`.
- **Status:** GEPATCHT (v3.8, Session 28) — 4 Dateien, 7 Stellen korrigiert. Grep-Verification: 0 Treffer.
- **Restaufwand:** Keiner.

**F-M3: PROGRESSIONSPLAN Pos 5 Bloom L4 statt L3**

- **Quelle:** BEFUND_PHASE_2-1c_2-2a_TESTRUN_M1.md, M1
- **Befund:** MC-Typ reicht laut Heuristik nur bis L3. Pos 5 war als L4 deklariert.
- **Status:** GEPATCHT (v3.7, Session 26) — Progressionstabelle + Konstruktionskontext-Header korrigiert.
- **Restaufwand:** Keiner.

**F-M4: sicherung.json zitat.urheber ohne [sinngemäß]-Marker**

- **Quelle:** BEFUND_PHASE_2-1c_2-2a_TESTRUN_M1.md, M2
- **Befund:** Zitat stammt aus rekonstruiertem Quellentext (mat-1-4), aber urheber-Feld hatte keinen Rekonstruktions-Hinweis.
- **Status:** GEPATCHT (v3.7, Session 26) — [sinngemäß] ergaenzt.
- **Restaufwand:** Keiner.

**F-M5: typ-Registry im Vertrag: mc statt multiple-choice**

- **Quelle:** BEFUND_PHASE_2-2b_TESTRUN_M1.md, L1 (als LOW klassifiziert, hier auf MEDIUM hochgestuft wegen systematischem Risiko)
- **Befund:** VERTRAG_PHASE_2-2b nannte `mc`, Engine erwartet `multiple-choice`.
- **Status:** GEPATCHT (v3.8, Session 27).
- **Restaufwand:** Keiner.

### LOW-Findings (Kosmetik / Organisation)

**F-L1: Assembly-Vertrag unter agents/ statt architektur/vertraege/**

- **Quelle:** BEFUND_PHASE_2-2c_3-0_TESTRUN_M1.md, L1
- **Status:** OFFEN
- **Patch:** Datei verschieben, Referenzen in ORCHESTRATOR + PROJECT_INSTRUCTIONS aktualisieren.
- **Dringlichkeit:** Naechster Vertrags-Review

**F-L2: Q-GATE-LOG Phase 2.1 Wortanzahlen veraltet**

- **Quelle:** BEFUND_PHASE_2-1c_2-2a_TESTRUN_M1.md, L1
- **Status:** OFFEN (kosmetisch, historisches Protokoll)
- **Dringlichkeit:** Optional

**F-L3: JSON-Encoding typographische Anfuehrungszeichen**

- **Quelle:** BEFUND_PHASE_2-2b_TESTRUN_M1.md, L2
- **Befund:** aufgabe-1-4 hatte Encoding-Fehler, im Dispatch-Zyklus behoben.
- **Status:** GEPATCHT (v3.8, Session 27) — Encoding-Hinweis in 8 SUB_AUFGABE-Dateien.
- **Restaufwand:** Keiner.

**F-L4: PROJECT_INSTRUCTIONS.md State Machine ohne Phase 2.1b**

- **Quelle:** BEFUND_PHASE_2-1c_2-2a_TESTRUN_M1.md, L2
- **Status:** GEPATCHT (v3.7, Session 26).
- **Restaufwand:** Keiner.

---

## 3. Patch-Status Uebersicht

| ID | Finding | Schwere | Status | Restaufwand |
|---|---|---|---|---|
| F-P1 | ORCHESTRATOR nicht als Router | HIGH (Prozess) | **OFFEN** | 15-20 min |
| F-P2 | Assembly in Cowork statt CC | MEDIUM (Prozess) | **OFFEN** | 10 min |
| F-M1 | zitat in Assembly-Template | MEDIUM | Template GEPATCHT, Engine OFFEN | Engine-Patch |
| F-M2 | merksaetze[]-Referenz | MEDIUM | GEPATCHT (v3.8) | — |
| F-M3 | Bloom L4→L3 Pos 5 | MEDIUM | GEPATCHT (v3.7) | — |
| F-M4 | Zitat-Marker [sinngemäß] | MEDIUM | GEPATCHT (v3.7) | — |
| F-M5 | typ-Registry mc→multiple-choice | MEDIUM | GEPATCHT (v3.8) | — |
| F-L1 | Assembly-Vertrag Verzeichnis | LOW | **OFFEN** | 5 min |
| F-L2 | Q-GATE-LOG Wortanzahlen | LOW | **OFFEN** (optional) | 2 min |
| F-L3 | JSON-Encoding-Hinweis | LOW | GEPATCHT (v3.8) | — |
| F-L4 | State Machine Phase 2.1b | LOW | GEPATCHT (v3.7) | — |

---

## 4. Offene Patches vor Mappe 2 (priorisiert)

| Prio | ID | Patch | Ziel | Aufwand |
|---|---|---|---|---|
| 1 | F-P1 | ORCHESTRATOR-Read als Phasen-Precondition | PROJECT_INSTRUCTIONS.md + ORCHESTRATOR.md | 15-20 min |
| 2 | F-P2 | Phase 3 STOP-Marker + Ort-Constraint | PROJECT_INSTRUCTIONS.md + ORCHESTRATOR.md | 10 min |
| 3 | F-M1 | Engine: zitat-Rendering Sicherungsphase | escape-engine.js | Claude Code |
| 4 | F-L1 | Assembly-Vertrag nach vertraege/ verschieben | agents/→architektur/vertraege/ + Refs | 5 min |

**Gesamtaufwand offene Patches:** ~35 min (ohne Engine-Patch, der separat in Claude Code laeuft).

---

## 5. Bereits gepatchte Infrastruktur-Versionen

| Version | Session | Patches |
|---|---|---|
| v3.6 | 26 | 5 SUB_MATERIAL-Dateien (Erzaehlerstimme, BU, blockquote), 3 Q-Gate-Kriterien, VERTRAG_PHASE_2-1b |
| v3.7 | 26 | State Machine 2.1b, PROGRESSIONSPLAN L4→L3, Zitat [sinngemäß], D5-Scope-Reduktion |
| v3.8 | 27-28 | typ-Registry, 8× Encoding-Hinweis, zitat-Template, merksaetze→knoten[].merksatz (4 Dateien) |
| **v3.9** | **—** | **F-P1 + F-P2 + F-L1 (geplant)** |
