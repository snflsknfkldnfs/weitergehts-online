# Cowork-Uebergabe: Mappe-3-Produktion (gpg-erster-weltkrieg-ursachen)

**Datum:** 2026-04-02
**Zweck:** Kickoff-Prompt fuer eine frische Cowork-Session zur vertragsgesteuerten Produktion von Mappe 3.
**Kontext:** Infrastruktur-Test der v4.2-Produktionsarchitektur. Erste Mappenproduktion nach Audit v4.2.

---

## Status

- **Infrastruktur:** v4.2, alle Audit-Massnahmen (M1-M9) implementiert, Audit-Befunde PF-1/PF-5/PF-6 umgesetzt.
- **Phase 0 (Inhaltliche Vorarbeit):** ABGESCHLOSSEN
  - INHALTSBASIS_gpg-erster-weltkrieg-ursachen.md → Mappe-3-Sektion vorhanden (Kriegsbegeisterung 1914)
  - SKRIPT_gpg-erster-weltkrieg-ursachen.md → Chunk 3 vorhanden (§1-§5, 5 Absaetze, 8 Artefakt-Platzhalter)
  - TAFELBILD_gpg-erster-weltkrieg-ursachen_Mappe3.md → erstellt (6 Knoten, 5 Verbindungen, SCPL, Q-Gate PASS)
- **Phase 1 (Material-Design):** ABGESCHLOSSEN
  - MATERIAL_GERUEST_gpg-erster-weltkrieg-ursachen_Mappe3.md → erstellt (5 Materialien, Erarbeitbarkeitsnachweis, Zielklarheit)
- **Produktionsverzeichnis:** Angelegt (rahmen/, materialien/, aufgaben/ — leer)
- **Mappe 2:** Live (Commit 0c0e1ee), vollstaendig assembliert

## Naechster Schritt

Phase 2.0: Rahmen-Produktion. Vertrag lesen: `docs/architektur/vertraege/VERTRAG_PHASE_2-0_RAHMEN.md`

## STRUKTUR-FREEZE

Aktiv seit Phase 0.4. Unveraenderlich: SCPL-Zonen, scpl.loesung[], Fachbegriffe, Ordnungsmuster, Stundenfrage.
FORMULIERUNGS-OFFEN bis Phase 2.1c Achse 6: SCPL-Texte (kontextsatz, schritt-Saetze, problem.satz).

## Read-Reihenfolge fuer Phase 2.0

1. `docs/architektur/vertraege/VERTRAG_PHASE_2-0_RAHMEN.md` (Vertrag — steuert den Dispatch)
2. `docs/agents/artefakte/TAFELBILD_gpg-erster-weltkrieg-ursachen_Mappe3.md` (Input → hefteintrag.json)
3. `docs/agents/artefakte/MATERIAL_GERUEST_gpg-erster-weltkrieg-ursachen_Mappe3.md` (Input → einstieg.json, sicherung.json)
4. `docs/agents/ORCHESTRATOR.md` (Freischalt-Code-Regeln, data.json-Schema → meta.json)

## Phasen-Sequenz (vollstaendig)

```
SESSION 1 (~24.000 Token):
  2.0  Rahmen (1 Dispatch → 4 JSONs in rahmen/)
       Vertrag: VERTRAG_PHASE_2-0_RAHMEN.md
  2.1  Materialien (5 Dispatches, sequentiell)
       Vertrag: VERTRAG_PHASE_2-1_MATERIAL.md
       E1 User-Validierung nach mat-3-1 + mat-3-2: EMPFOHLEN
  2.1c Cross + Ueberleitungen + Hefteintrag-Revision (1 Dispatch, 6 Achsen)
       Vertrag: VERTRAG_PHASE_2-1c_CROSS.md
  --- SESSION-SPLIT (Fortsetzungs-Prompt generieren) ---

SESSION 2:
  2.2a Progressionsplan (1 Dispatch)
       Vertrag: VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md
  2.2b Aufgaben (5 Dispatches, sequentiell)
       Vertrag: VERTRAG_PHASE_2-2b_AUFGABE.md
  2.2c Aufgaben-Cross (1 Dispatch)
       Vertrag: VERTRAG_PHASE_2-2c_CROSS.md
  Phase-2-Abschluss: UEBERGABE_PROMPT_PHASE3 + Git-Befehle

SESSION 3 (Claude Code):
  3.0  Pre-Flight
  3.1  Bild-Download (Wikimedia API)
  3.2  Assembly (Produktionsverzeichnis → data.json)
  3.3  mappe-3.html
  3.4  Verifikation
  3.5  Git commit + push
```

## Mappe-3-Eckdaten

- **Thema:** Kriegsbegeisterung 1914
- **Stundenfrage:** Waren die Menschen 1914 wirklich begeistert vom Krieg?
- **Ordnungsmuster:** multiperspektivisch
- **Kernerkenntnisse (3):**
  1. Die Kriegsbegeisterung 1914 betraf vor allem die staedtische Mittel- und Oberschicht — Arbeiter und Landbevoelkerung waren ueberwiegend skeptisch.
  2. Patriotismus, Propaganda, Abenteuerlust und gesellschaftlicher Druck trieben die Begeisterung an.
  3. Der Burgfrieden vereinte sogar Kriegsgegner hinter der Regierung — doch die Einheit war truegerisch.
- **Materialien (5):**
  - mat-3-1: darstellungstext (Begeisterung und Angst)
  - mat-3-2: bildquelle (img-3-1, Jubel Stadtschloss)
  - mat-3-3: bildquelle (img-3-2, Truppentransport)
  - mat-3-4: quellentext (zit-3-1/3-2/3-3, drei Stimmen)
  - mat-3-5: tagebuch (rolle-3-1/3-2, Freiwilliger + Bauersfrau)
- **Voraussetzungen:** k2-5 (Kettenreaktion) aus Mappe 2

## Vertragsverzeichnis

```
docs/architektur/vertraege/
  VERTRAG_PHASE_2-0_RAHMEN.md          → Phase 2.0
  VERTRAG_PHASE_2-1_MATERIAL.md        → Phase 2.1
  VERTRAG_PHASE_2-1c_CROSS.md          → Phase 2.1c
  VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md → Phase 2.2a
  VERTRAG_PHASE_2-2b_AUFGABE.md        → Phase 2.2b
  VERTRAG_PHASE_2-2c_CROSS.md          → Phase 2.2c
```

## Qualitaetskriterien-Verzeichnis

```
docs/checklisten/
  QUALITAETSKRITERIEN_MATERIALPRODUKTION.md  → Material-Q-Gate (MQ1-MQ6)
  GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md      → Hefteintrag-Entwurf (G1-G14, Phase 0.4)
  GUETEKRITERIEN_HEFTEINTRAG_PRODUKT.md      → Hefteintrag-Produkt (HE1-HE13, Phase 2.1c+)
  GUETEKRITERIEN_AUFGABEN.md                 → Aufgaben (A1-A15)
  GUETEKRITERIEN_SEQUENZIERUNG.md            → Sequenzierung (S1-S15)
```

## Subagenten-Verzeichnis

```
docs/agents/
  SUB_MATERIAL_DARSTELLUNGSTEXT.md  → mat-3-1
  SUB_MATERIAL_BILDQUELLE.md       → mat-3-2, mat-3-3
  SUB_MATERIAL_QUELLENTEXT.md      → mat-3-4
  SUB_MATERIAL_TAGEBUCH.md         → mat-3-5
```

## Hinweise fuer den Produktions-Agenten

1. **Skill aktivieren:** `/projekt-website-v4-2` bei Session-Start. Der Skill liest STATUS.md und setzt dort an.
2. **Pro Dispatch NUR den jeweiligen Vertrag lesen** — nicht WORKFLOW_v4.md komplett.
3. **Kernerkenntnisse leben in hefteintrag.scpl.loesung[]** — KEIN separates kernerkenntnisse[]-Feld in sicherung.json (M8).
4. **zusammenfassung/ueberleitung als Placeholder** in Phase 2.0 — finale Produktion erst in Phase 2.1c Achse 6.
5. **User-Validierung nach mat-3-1 + mat-3-2:** EMPFOHLEN (ab Mappe 3 herabgestuft von PFLICHT).
6. **Session-Split nach Phase 2.1c:** Fortsetzungs-Prompt gemaess ORCHESTRATOR Session-Split-Template generieren.
