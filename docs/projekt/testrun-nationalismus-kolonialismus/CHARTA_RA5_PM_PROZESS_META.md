# CHARTA RA5 — PM / Prozess / Meta

**Ziel:** Beurteilung der PM-Ebene im Testrun: Session-Handoff-Qualitaet, ORCHESTRATOR-als-Router-Disziplin, Context-Pressure-Management (12 Auto-Kompaktionen), Task-Tracking, Claude-Code-Uebergaben, User-Interventions-Profil, Subagenten-Nutzung, Dauer/Effizienz-Metriken.

---

## 1. Mandat

RA5 beantwortet: **War die PM-Choreografie im Testrun robust und welche PM-strukturellen Defekte sind unabhaengig von Produkt-Findings zu beheben?**

Unterfragen:
- 12 Auto-Kompaktionen ueber 3 Sessions: normale Frequenz fuer ein Escape-Game oder Symptom fuer ueberdimensionierte Cowork-PM-Last?
- Wurde der ORCHESTRATOR als Router VOR jeder Phase gelesen (F-P1 aus M1-Befund) oder nur referenziert?
- Session-Handoffs A→B, B→C: Uebergabe-Prompt-Qualitaet, Persistenz-Status-Aktualitaet, Kompaktions-Artefakte vorhanden?
- Task-Tracking-Disziplin: wurden Task-Status gepflegt, Task-IDs propagiert, Vor-/Nachbereitung dokumentiert?
- Claude-Code-Uebergaben (Phase 0.2 Agent-Inhalt, Phase 3.0 Assembly): Kontext-Pakete vollstaendig uebergeben? Rueck-Uebergabe strukturiert?
- User-Interventions-Profil: wo musste der User eingreifen, wo war PM autonom, wie oft musste der User das gleiche Problem mehrfach flaggen?
- Subagenten-Nutzung (5 Spawns / 3337 Messages) — wurde Subagent-Delegation zu sparsam oder angemessen genutzt?
- Verhaeltnis Tool-Calls (1153) zu Assistant-Messages (~2000): Tool-Hebel-Nutzung adaequat?
- Dauer-Metriken: wie viele Stunden netto pro Mappe, Abweichungen zwischen Mappen?
- Scratchpad / Handoff-Artefakte: existierten sie (STATUS.md-Updates, NEXT_STEPS, CHECKPOINT.md), wurden sie gepflegt?

---

## 2. Pflicht-Lektuere

1. `docs/projekt/testrun-nationalismus-kolonialismus/AUDIT_STATE.md`
2. `docs/projekt/testrun-nationalismus-kolonialismus/EVIDENZ_BUNDLE.md` (v.a. Abschnitte 3 Phasen-Chronologie, 5 Session-Boundaries, 6 Auto-Kompaktionen, 9 Subagenten)
3. PM-Struktur-Basis:
   - `docs/projekt/COWORK_PROJECT_ANLEITUNG.md` (v2.0 — Modi STATUS/EXECUTE/UPDATE/AUDIT/HANDOFF, File-Ownership)
   - `docs/projekt/STATUS.md` (SSOT)
   - `docs/architektur/WORKFLOW_v4.md` (Phasen-Choreografie)
   - `docs/agents/ORCHESTRATOR.md` (Router-Funktion)
4. Vergleichs-Audit: `docs/befunde/BEFUND_TESTRUN_M1_KONSOLIDIERT.md` (Findings F-P1, F-P2 — PM-Prozess-Seite)
5. Evidenz-Extrakte:
   - `evidenz/session_handoffs.md` (Uebergabe-Prompts A→B, B→C)
   - `evidenz/compaction_events.jsonl` (12 Kompaktionen mit ts)
   - `evidenz/user_messages.jsonl` (alle User-Messages inkl. Interventionen)
   - `evidenz/tool_calls.jsonl` (1153 Calls, Tool-Typ-Verteilung)
   - `evidenz/subagent_spawns.jsonl` (5 Task-Tool-Aufrufe)
   - `evidenz/milestones.json` (Schluessel `kompaktion`, `handoff`, `intervention`)
   - `evidenz/timeline.csv` (Dauer-Metriken pro Mappe)

---

## 3. Severitaets-Skala

- **P0:** PM-Defekt fuehrte zu Datenverlust / verlorener Entscheidung / nicht-wiederherstellbarer Zustands-Drift. Beispiel: Kompaktion ohne STATUS-Update, dadurch in Folgesession Entscheidung versehentlich revertiert.
- **P1:** Systematische PM-Defekte (z.B. ORCHESTRATOR in N/M Phasen nicht gelesen; Session-Handoff ohne Kontext-Paket); Task-Tracking nicht gepflegt; User-Interventionen noetig fuer Fehler die PM haette selbst detektieren muessen.
- **P2:** Einzelner PM-Schritt suboptimal; nicht-ideale Uebergabe-Prompt-Form; verspaetete Dokumentation.
- **P3:** Formatdrift, Nomenklatur-Inkonsistenz in PM-Dokumenten.

---

## 4. Pflicht-Sektionen im Bericht `BERICHT_RA5_PM_PROZESS_META.md`

1. Zusammenfassung + Gate-Urteil
2. Methodologie (welche Extrakte, welche Zeitfenster vertieft)
3. Session-Verlaufs-Ueberblick (3 Sessions, Messages/Tool-Calls/Dauer pro Session)
4. Session-Handoff-Analyse A→B und B→C (Uebergabe-Prompt-Qualitaet, STATUS-Aktualitaet, Context-Paket-Vollstaendigkeit)
5. Kompaktions-Audit (12 Events: wann, vor/nach welcher Phase, Verlust-Indikatoren)
6. ORCHESTRATOR-als-Router-Disziplin (pro Phase: wurde Precondition-Read durchgefuehrt? F-P1-Wiederholung?)
7. Task-Tracking-Audit (Task-ID-Disziplin, Status-Uebergabe, NEXT_STEPS-Pflege)
8. Claude-Code-Uebergaben (Phase 0.2, Phase 3.0: Kontext-Pakete, Rueck-Uebergabe, Vertrags-Konformitaet)
9. User-Interventions-Profil (Liste der User-Eingriffe mit Typ: Korrektur / Freigabe / Zusatz-Input)
10. Subagenten-Nutzungs-Bewertung (5 Spawns angemessen? Wo haette Delegation gespart werden koennen?)
11. Dauer- und Effizienz-Metriken (Mappe 1 vs. 2 vs. 3 — Nettodauer, Tool-Call-Dichte, Fehler-Dichte)
12. Findings (F-RA5-NN)
13. Konvergenz / Divergenz mit M1-Befund (F-P1, F-P2)
14. Empfehlungen: Anleitung-Patches, ORCHESTRATOR-Routing-Protokoll, STATUS-Pflege-Protokoll, Handoff-Template
15. Gate-Urteil
16. Anhang: Handoff-Prompt-Zitate, Kompaktions-Stempel-Tabelle, Intervention-Katalog

---

## 5. Methodologie

- Extrakte als Primaerquelle; keine Retro-Erinnerung, keine Spekulation.
- Session-Boundaries im `session_handoffs.md` genau lesen — wurde beim Wiederaufsetzen ein expliziter Re-Orientation-Schritt durchgefuehrt?
- Kompaktions-Events in `compaction_events.jsonl` je Kontext pruefen: welche Phase lief, welche Information ging verloren, wurde nach Kompaktion Status neu aufgebaut?
- User-Messages chronologisch durchgehen und klassifizieren: (a) Freigabe, (b) neue Aufgabe, (c) Korrektur eines PM-Fehlers, (d) Korrektur eines Produkt-Fehlers. Nur (c) und (d) als Defekt-Signal werten.
- Finding-IDs: F-RA5-01 ff.

---

## 6. Deliverable

**Pfad:** `docs/projekt/testrun-nationalismus-kolonialismus/BERICHT_RA5_PM_PROZESS_META.md`
**Umfang-Richtwert:** 400-700 Zeilen.
**Persistenz-Pflicht:** wie RA1.

---

## 7. Out-of-Scope

- Pipeline-Reihenfolge (RA1 — RA5 ergaenzt rein PM-strukturell, nicht fachlich)
- Didaktik-Material (RA2)
- Engine (RA3)
- Medien (RA4)

---

## 8. Rollen-Isolation

Keine Anleitung-/STATUS-Patches schreiben. Befund + Empfehlung.
