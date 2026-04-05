# Evidenz-Bundle RA4 — Pipeline-Integritaet

**Zielgruppe:** RA4 Pipeline-Integritaets-Pruefer (isoliert).

## Pflicht-Lektuere

1. `docs/projekt/phase-iii-5/CHARTA_RA4_PIPELINE.md`
2. `docs/projekt/D15B_OPTIMIERUNGS_STRATEGIEN.md` — alle STR mit Pipeline-Bezug (Vertraege, Agenten, Phasen, Q-Gates, Orchestrierung).
3. **Alle 6 Phasen-Vertraege:**
   - `docs/architektur/vertraege/VERTRAG_PHASE_2-0_RAHMEN.md`
   - `docs/architektur/vertraege/VERTRAG_PHASE_2-1_MATERIAL.md`
   - `docs/architektur/vertraege/VERTRAG_PHASE_2-1c_CROSS.md`
   - `docs/architektur/vertraege/VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md`
   - `docs/architektur/vertraege/VERTRAG_PHASE_2-2b_AUFGABE.md`
   - `docs/architektur/vertraege/VERTRAG_PHASE_2-2c_CROSS.md`
4. `docs/agents/ORCHESTRATOR.md` — Produkt-Steuerungsdokument.
5. `docs/agents/VERTRAG_PHASE_3_ASSEMBLY.md` — Phase 3 Vertrag (Assembly).

## Kontextuelle Lektuere (selektiv nach STR-Bezug)

- `docs/agents/AGENT_HEFTEINTRAG.md`
- `docs/agents/SUB_AUFGABE_*.md` (5 Dateien: MC, FREITEXT, LUECKENTEXT, REIHENFOLGE, ZUORDNUNG)
- `docs/agents/SUB_MATERIAL_*.md` (7 Dateien: BILDQUELLE, DARSTELLUNGSTEXT, KARTE, QUELLENTEXT, STATISTIK, TAGEBUCH, ZEITLEISTE)
- `docs/agents/AGENT_QUALITAET.md`
- `docs/architektur/WORKFLOW_v4.md` — kanonische Phasenstruktur.

Lies diese nur, wenn eine konkrete STR auf sie verweist oder wenn du einen Kontrakt-Uebergang pruefst, der sie tangiert.

## Verboten

- `assets/js/*` — das ist RA3-Scope.
- `docs/checklisten/*` — das ist RA6-Scope (Gueteregel-Kollisionen).
- Keine anderen RA-Berichte.

## Erwartete Output-Datei

`docs/projekt/phase-iii-5/BERICHT_RA4_PIPELINE.md` mit Vertrags-Kontrakt-Map und mindestens 8 Findings.

## Kritische Ankerpunkte

- **ORCHESTRATOR v4.0 mit Session-Split-PFLICHT** nach Phase 2.1c (IL-4 Patch) ist der aktuelle Stand — jede STR, die Phase-Uebergaenge aendert, muss diesen Split respektieren.
- **Python-JSON-Validierung** als Pflicht-Schritt in allen 5 SUB_AUFGABE_*.md (IL-1 Patch). STR, die Aufgaben-Schema aendern, muessen Validierungs-Kompatibilitaet nachweisen.
- **STR-08 adaptive Quellenkritik via Progressionsplan-Agent** aendert Phase 2-2a Vertrag — pruefe die Kontrakt-Evolution.
- **STR-11 Typologie-Erweiterung** betrifft SUB_AUFGABE-Suite — Kontrakte aller 5 SUB_AUFGABE_*.md beruehrt?
- **STR-12 Trigger-System (Lehrkraft-only)** — wo wird das Sichtbarkeits-Constraint in der Pipeline durchgesetzt?
- **STR-13 Mappenabschluss-Zone** — neue Assembly-Sub-Task in Phase 3?
- **STR-14-NEU Fiktionalitaets-Kennzeichnung** — aendert SUB_MATERIAL_TAGEBUCH und SUB_MATERIAL_QUELLENTEXT Kontrakte?
