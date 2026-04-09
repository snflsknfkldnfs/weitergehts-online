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
| Prozess-Audit (Session 28) | — | 2 Prozess-Findings |
| Steuerungsarchitektur-Audit (Session 28) | — | 1 Struktur-Finding |
| **GESAMT** | | **3H / 10M / 9L + 3 Prozess/Struktur** |

Davon bereits gepatcht (v3.6, v3.7, v3.8): 3H + 5M + 5L. Offen: 5M + 4L + 3 Prozess/Struktur.

---

## 2. Offene Findings — Actionable Patch-Liste

Sortiert nach Dringlichkeit. Jedes Finding hat eine eindeutige ID fuer Tracking.

### PROZESS-Findings (Steuerungsarchitektur)

**F-P1: ORCHESTRATOR wird nicht als Phasen-Router genutzt — Ursache: Strukturdefizit**

- **Quelle:** Prozess-Audit Session 28 (Transkript-Analyse) + Steuerungsarchitektur-Audit Session 28
- **Schwere:** HIGH (Prozess/Struktur)
- **Befund:** ORCHESTRATOR.md wurde im Testrun 10× gelesen, aber NICHT systematisch an Phasen-Transitionen. Vor Phase 3.0 kein ORCHESTRATOR-Read. Der Agent routet sich selbst direkt zu Vertraegen. Das unterlaueft das ORCHESTRATOR-First-Steuerungsmodell.
- **Root Cause (erweitert — 3 Ursachen):**
  1. **Signalverduennung:** ORCHESTRATOR.md ist 494 Zeilen / ~31 KB / ~8.000 Token. Er enthaelt 5 funktional verschiedene Informationstypen (Workflow-Flowchart, Assembly-Prozedur, Session-Split-Template, Schema-Definition, Referenz-Tabellen). Fuer eine konkrete Phasen-Transition sind <500 Token relevant — der Rest ist Rauschen. Der Agent ueberspringt den ORCHESTRATOR rational, weil der Vertrag fokussierter ist.
  2. **Token-Budget-Belastung:** PROJECT_INSTRUCTIONS (~3.800 Token, auto-load) + ORCHESTRATOR (~8.000 Token) = 11.800 Token fuer Meta-Steuerung BEVOR ein Vertrag oder Agenten-Prompt geladen wird. Das sind ~12% des Kontextfensters nur fuer Routing. WORKFLOW_v4 (~15.000 Token) kommt potenziell als dritte Ebene dazu.
  3. **Rollen-Ueberlappung:** Beide Dokumente beschreiben die Phasen-Sequenz — PROJECT_INSTRUCTIONS kompakt (Uebergangstabelle Z. 260-271), ORCHESTRATOR ausfuehrlich (Flowchart Z. 28-188). Keine klare Autoritaetshierarchie fuer den Agent ("welches Dokument fuehrt?"). Drift-anfaellig: Phase-2.1b-Patch traf nur PROJECT_INSTRUCTIONS, nicht ORCHESTRATOR — solche Inkonsistenzen sind systemisch.
- **Aktuelle Rollenverteilung (Ist):**

  | Aspekt | PROJECT_INSTRUCTIONS | ORCHESTRATOR |
  |---|---|---|
  | State Machine + Zustandsblock | Ja (SSOT) | Nein |
  | Phasen-Sequenz | Ja (kompakt) | Ja (ausfuehrlich) — REDUNDANZ |
  | Agenten-I/O | Ja (Kurzreferenz) | Ja (detailliert) — REDUNDANZ |
  | Assembly-Prozedur | Nein | Ja (50 Zeilen) |
  | Session-Split-Template | Nein | Ja (OPT-8, 40 Zeilen) |
  | Schema/Konventionen | Nein | Ja (80 Zeilen) |
  | Uebergabe-Template | Nein | Ja (40 Zeilen) |
  | Pfad-Aufloesung | Ja | Nein |
  | Self-Update-Protokoll | Ja | Nein |

- **Patch-Ziel:** escape-game-generator
- **Patch-Vorschlag (revidiert):** Der urspruengliche Vorschlag ("ORCHESTRATOR-Read als Precondition erzwingen") wuerde das Symptom behandeln, nicht die Ursache — er wuerde 8.000 Token Overhead pro Phasen-Transition erzeugen. Stattdessen: Restrukturierung der Rollenteilung.
  - **Option A (Refaktor):** ORCHESTRATOR zerlegen. PROJECT_INSTRUCTIONS wird zum einzigen Steuerungsdokument (State Machine + Phasen-Routing + Ort-Constraints). ORCHESTRATOR wird zur Referenz-Datei (Schema, Konventionen, Templates) — nur bei Bedarf gelesen, nicht bei jeder Transition. Redundante Phasen-Sequenz aus ORCHESTRATOR entfernen.
  - **Option B (Surgical):** ORCHESTRATOR in Sektionen mit klaren Scope-Markern aufteilen. PROJECT_INSTRUCTIONS verweist pro Phase auf EINE Sektion (z.B. `LIES: ORCHESTRATOR.md §2.2 — NUR Zeilen 163-177`). Spart Token, erfordert aber Zeilen-Stabilitaet.
  - **Option C (Minimal):** Nur F-P2 patchen (STOP-Marker), ORCHESTRATOR-Read-Pflicht fallen lassen. Akzeptiert, dass der Agent sich selbst routet, solange die State Machine die Transitionen korrekt steuert. Risiko: Agenten-Drift bei neuen Phasen ohne Vertrag.
  - **Empfehlung:** Option A. Einmaliger Aufwand (~45 min), eliminiert Redundanz und Token-Overhead dauerhaft. Option B ist fragil (Zeilen-Nummern driften). Option C ist zu riskant fuer den Mappe-2-Testlauf.
- **Patch-Aufwand:** 45 min (Option A) / 20 min (Option B) / 5 min (Option C)
- **Dringlichkeit:** Vor Mappe 2

**F-P2: Phase 3 Assembly in Cowork statt Claude Code ausgefuehrt**

- **Quelle:** Prozess-Audit Session 28
- **Schwere:** MEDIUM (Prozess)
- **Befund:** WORKFLOW_v4 definiert Phase 3 als `Ort: Claude Code` (Zeile 175) und `KEIN Assembly in Cowork` (Zeile 754). ORCHESTRATOR.md bestaetigt: `Ort: Claude Code` (Ausfuehrungsorte-Tabelle Z. 379) und `Phase 2 endet HIER. KEIN Assembly in Cowork.` (Z. 180). Der Testrun fuehrte Phase 3 trotzdem in derselben Cowork-Session aus.
- **Root Cause:** PROJECT_INSTRUCTIONS.md Uebergangstabelle (Z. 270) listet `2.2c → 3.0 Assembly Mappe [N]` als nahtlose Transition. Kein STOP-Marker, kein Ort-Constraint, kein Verweis auf Uebergabe-Prompt. Der Agent liest die State Machine und fuehrt die naechste Phase aus — korrekt gemaess PROJECT_INSTRUCTIONS, falsch gemaess WORKFLOW_v4 und ORCHESTRATOR. Das ist eine direkte Konsequenz der Rollen-Ueberlappung aus F-P1: Die State Machine in PROJECT_INSTRUCTIONS widerspricht dem Ort-Constraint in ORCHESTRATOR, und PROJECT_INSTRUCTIONS gewinnt (weil es auto-loaded ist).
- **Patch-Ziel:** escape-game-generator
- **Patch-Vorschlag:** PROJECT_INSTRUCTIONS.md Uebergangstabelle: Transition `2.2c → 3.0` ersetzen durch `2.2c → STOP (Uebergabe-Prompt + Git-Commit)`. Neue Zeile: `| 2.2c | 2.2c Aufgaben-Cross — Mappe [N] | **STOP.** Uebergabe-Prompt generieren (→ docs/uebergabe/). Git-Commit. Phase 3 in Claude Code. |`. Falls F-P1 Option A umgesetzt wird, ist dieser Patch Teil der Restrukturierung.
- **Patch-Aufwand:** 5 min (isoliert) / entfaellt bei F-P1 Option A
- **Dringlichkeit:** Vor Mappe 2

**F-P3: Steuerungsdokumente — Redundanz, Token-Overhead, fehlende Autoritaetshierarchie**

- **Quelle:** Steuerungsarchitektur-Audit Session 28
- **Schwere:** HIGH (Struktur)
- **Befund:** Drei Steuerungsdokumente konkurrieren um Kontextfenster und Autoritaet:

  | Dokument | Zeilen | Bytes | ~Token | Auto-Load |
  |---|---|---|---|---|
  | PROJECT_INSTRUCTIONS.md | 339 | 14 KB | ~3.800 | Ja (Session-Start) |
  | ORCHESTRATOR.md | 494 | 31 KB | ~8.000 | Nein (manueller Read) |
  | WORKFLOW_v4.md | 977 | 57 KB | ~15.000 | Nein (explizit vermieden, OPT-1) |

  Kernprobleme: (1) Phasen-Sequenz in PROJECT_INSTRUCTIONS UND ORCHESTRATOR — Drift bei Einzel-Patches (bewiesen: Phase 2.1b). (2) ORCHESTRATOR mischt Routing-Info (~500 Token phasen-relevant) mit Referenz-Material (~7.500 Token Schema, Templates, Tabellen). (3) Keine deklarierte Autoritaetshierarchie — bei Widerspruch zwischen PI und ORCH ist unklar, welches Dokument gilt. (4) WORKFLOW_v4 ist de facto die kanonische Quelle (ORCHESTRATOR Z. 7: "bei Widerspruechen gilt WORKFLOW_v4"), wird aber bewusst nicht gelesen (OPT-1). Dreistufige Autoritaet ohne Enforcement.
- **Root Cause:** Organisches Wachstum. ORCHESTRATOR wurde als monolithisches Steuerungsdokument geschrieben (v1-v3). PROJECT_INSTRUCTIONS kam als State-Machine-Layer dazu (v2.4). WORKFLOW_v4 wurde als kanonische Referenz deklariert. Keine Bereinigung der Ueberlappungen.
- **Impact:** (1) Agent ignoriert ORCHESTRATOR rational (Token-ineffizient). (2) Patches treffen ein Dokument, nicht alle — Drift ist systemisch. (3) 12% Kontextfenster fuer Meta-Steuerung vor inhaltlicher Arbeit.
- **Patch-Ziel:** escape-game-generator
- **Patch-Vorschlag:** Siehe F-P1 Option A (Refaktor). Ziel-Architektur:
  - **PROJECT_INSTRUCTIONS.md** = Einziges Steuerungsdokument. Enthaelt: State Machine, Phasen-Routing (welcher Vertrag, welcher Ort, welche Preconditions), Self-Update-Protokoll, Pfad-Aufloesung. Wird bei Session-Start gelesen. ~4-5 KB.
  - **ORCHESTRATOR.md** = Referenz-Dokument. Enthaelt: Schema-Definitionen, Uebergabe-Template, Session-Split-Template, Konventionen, Agenten-Tabelle. Wird NUR bei Bedarf gelesen (Assembly, Session-Split, Schema-Fragen). Keine Phasen-Sequenz-Redundanz. ~15-20 KB.
  - **WORKFLOW_v4.md** = Architektur-Dokumentation. Unveraendert. Wird vom PM gelesen, nicht vom Produktions-Agenten.
- **Patch-Aufwand:** 45-60 min (einmalig)
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
| F-P1 | ORCHESTRATOR nicht als Router + Strukturdefizit | HIGH (Prozess/Struktur) | **OFFEN** | 45 min (Option A) |
| F-P2 | Assembly in Cowork statt CC | MEDIUM (Prozess) | **OFFEN** | 5 min (isoliert) / entfaellt bei F-P1-A |
| F-P3 | Steuerungsdokumente Redundanz/Token/Autoritaet | HIGH (Struktur) | **OFFEN** | Teil von F-P1 Option A |
| F-M1 | zitat in Assembly-Template | MEDIUM | Template GEPATCHT, Engine OFFEN | Engine-Patch |
| F-M2 | merksaetze[]-Referenz | MEDIUM | GEPATCHT (v3.8) | — |
| F-M3 | Bloom L4→L3 Pos 5 | MEDIUM | GEPATCHT (v3.7) | — |
| F-M4 | Zitat-Marker [sinngemäß] | MEDIUM | GEPATCHT (v3.7) | — |
| F-M5 | typ-Registry mc→multiple-choice | MEDIUM | GEPATCHT (v3.8) | — |
| F-L1 | Assembly-Vertrag Verzeichnis | LOW | **OFFEN** | 5 min / Teil von F-P1-A |
| F-L2 | Q-GATE-LOG Wortanzahlen | LOW | **OFFEN** (optional) | 2 min |
| F-L3 | JSON-Encoding-Hinweis | LOW | GEPATCHT (v3.8) | — |
| F-L4 | State Machine Phase 2.1b | LOW | GEPATCHT (v3.7) | — |

---

## 4. Offene Patches vor Mappe 2 (priorisiert)

| Prio | ID | Patch | Ziel | Aufwand |
|---|---|---|---|---|
| **1** | **F-P1 + F-P2 + F-P3** | **Steuerungsdokumente-Refaktor (Option A):** PI wird einziges Steuerungsdokument (State Machine + Routing + Ort-Constraints + STOP-Marker). ORCH wird Referenz-Dokument (Schema, Templates, Konventionen). Redundante Phasen-Sequenz aus ORCH entfernen. | PROJECT_INSTRUCTIONS.md + ORCHESTRATOR.md | **45-60 min** |
| 2 | F-M1 | Engine: zitat-Rendering Sicherungsphase | escape-engine.js | Claude Code (separat) |
| 3 | F-L1 | Assembly-Vertrag nach vertraege/ verschieben | agents/→architektur/vertraege/ + Refs | Teil von Prio 1 |

**Gesamtaufwand offene Patches:** ~45-60 min (Refaktor, einmalig) + Engine-Patch (Claude Code, separat).

**Entscheidungsmatrix fuer F-P1/P2/P3:**

| Option | Aufwand | Token-Einsparung | Drift-Risiko | Empfehlung |
|---|---|---|---|---|
| A: Refaktor (PI = Steuerung, ORCH = Referenz) | 45-60 min | ~6.000 Token/Transition | Eliminiert (eine Quelle) | **EMPFOHLEN** |
| B: Sektions-Marker + Zeilen-Verweise | 20 min | ~5.000 Token/Transition | Bleibt (Zeilen driften) | Fragil |
| C: Nur STOP-Marker (F-P2 isoliert) | 5 min | 0 | Bleibt (Redundanz bestehen) | Zu riskant |

---

## 5. Bereits gepatchte Infrastruktur-Versionen

| Version | Session | Patches |
|---|---|---|
| v3.6 | 26 | 5 SUB_MATERIAL-Dateien (Erzaehlerstimme, BU, blockquote), 3 Q-Gate-Kriterien, VERTRAG_PHASE_2-1b |
| v3.7 | 26 | State Machine 2.1b, PROGRESSIONSPLAN L4→L3, Zitat [sinngemäß], D5-Scope-Reduktion |
| v3.8 | 27-28 | typ-Registry, 8× Encoding-Hinweis, zitat-Template, merksaetze→knoten[].merksatz (4 Dateien) |
| **v3.9** | **—** | **F-P1 + F-P2 + F-P3 + F-L1: Steuerungsdokumente-Refaktor (geplant)** |
