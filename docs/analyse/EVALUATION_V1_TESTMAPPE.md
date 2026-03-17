# Evaluation v1-Testmappe: Mappe 1 "Pulverfass Europa"

Datum: 2026-03-17
Grundlage: Browser-Sichtung + Lehrkraft-Evaluation + automatische Accessibility-Tree-Analyse

## Meta-Anweisung

Erste Prioritaet: Prozesse optimieren, damit Qualitaetsverbesserungen systematisch im Workflow verankert werden (QM im Prozess). Einzelfixes sind sekundaer.

---

## Findings nach Kategorie

### P — Prozess/Agenten-Architektur

| ID | Finding | Betroffene Ebene | Status |
|---|---|---|---|
| P1 | MCP-Toolcalling fuer Medien ausarbeiten und integrieren (Bilder, Illustrationen, Karten) | AGENT_MATERIAL, ORCHESTRATOR, MCP-Recherche | Offen |
| P2 | Qualitaetsmanagement pro Materialart (eigener Agent oder Pruefschritt?) | Workflow | Offen |
| P3 | Differenzierungs-Agent (Sprachauswahl Tipps, Hover-Uebersetzungen, sprachliche Differenzierung) | Neuer Agent + Engine | Offen |
| P4 | Tafelbild als zentrales Strukturierungsinstrument staerken — zu rudimentaer, faktisch fehlerhaft | AGENT_MATERIAL Tafelbild-Spez | **Eingearbeitet** (Qualitaetsspez) |
| P5 | Aufgaben-Material-Alignment systematisch pruefen ("Nationalismus" in Aufgabe ohne Material-Verankerung) | AGENT_RAETSEL | **Eingearbeitet** (Material-Alignment-Pflicht) |
| P6 | Quellenqualitaet systematisieren (zu rudimentaer, unkonkrete Angaben) | AGENT_MATERIAL | **Eingearbeitet** (Quellentext-Spez) |

### E — Engine/UI-Features

| ID | Finding | Aufwand | Status |
|---|---|---|---|
| E1 | Drag-and-drop fuer Zuordnung/Reihenfolge | Hoch | Offen |
| E2 | Quellenangaben als Fussnoten statt inline | Mittel | **Eingearbeitet** (Kern-Prinzip 2) |
| E3 | Tipp-Buttons nebeneinander, sequentiell aufdeckbar | Mittel | **Eingearbeitet** (RAETSEL Tipp-UI-Regeln) |
| E4 | Hover-Uebersetzung fuer "schwierige Woerter" (gestrichelt unterstrichen) | Hoch | Offen (→ P3) |
| E5 | Stellungnahme-Aufgabentyp (ethisch/moralisch) | Mittel | **Eingearbeitet** (Freitext-Neudefinition) |
| E6 | Sicherung visible obwohl Code-Reveal nicht erfolgt (Bug) | Niedrig | **Behoben** (explizites display:none + Restore) |
| E7 | Lueckentext-Dopplung (Angabe + ausfuellbarer Text identisch) + visuelles Sizing | Niedrig | **Eingearbeitet** (RAETSEL Darstellungsregel) |
| E8 | Grosser Header fehlt oben | Niedrig | **Behoben** (Game-Titel aus data.meta) |
| E9 | Zuordnung-Dropdowns zeigen duplizierte Optionen (3x Dreibund, 3x Triple Entente) | Niedrig | **Behoben** (Deduplizierung) |

### D — Inhalt/Didaktik (Agenten-Instruktionen)

| ID | Finding | Betroffener Agent | Status |
|---|---|---|---|
| D1 | Setting motivierender (Geheimdienst statt Zeitung, Rollenzuweisung) | AGENT_RAETSEL (Narrativ) + AGENT_MATERIAL (Einstieg) | **Eingearbeitet** (Einstieg-Spez) |
| D2 | Zeitsetting klarer, mit Illustration | AGENT_MATERIAL + MCP | **Eingearbeitet** (Einstieg-Spez) |
| D3 | Einfuehrungstext: Schuelernaeher, Anschluss an Vorphase | AGENT_MATERIAL (darstellungstext-Spez) | **Eingearbeitet** |
| D4 | Quellentext: Naehe zu Realitaet, Zeitungsformat, Perspektivitaet | AGENT_MATERIAL (quellentext-Spez) | **Eingearbeitet** |
| D5 | Zeitstrahl: Beschreibende Ueberschrift, Flaggen, Pfeilstruktur, bekannte Datenpunkte | AGENT_MATERIAL (zeitleiste-Spez) | **Eingearbeitet** |
| D6 | Tabelle: Didaktischer Sinn schaerfen, Diagramm-Alternative | AGENT_MATERIAL (statistik-Spez) | **Eingearbeitet** |
| D7 | Tagebuch: Perspektivitaet, Personifizierung, historische Korrektheit | AGENT_MATERIAL (tagebuch-Spez) | **Eingearbeitet** |
| D8 | Tafelbild: Faktisch falsch, zu rudimentaer | AGENT_MATERIAL (Tafelbild-Spez) | **Eingearbeitet** |
| D9 | Freitext: Zusammenfassung statt Einzelwort, Leitfragen, Fachbegriff-Punkte | AGENT_RAETSEL (Freitext-Neudefinition) | **Eingearbeitet** |
| D10 | Zielklarheit insgesamt zu niedrig — fehlende inhaltlich-didaktische Strukturierung | AGENT_MATERIAL (Kern-Prinzip 8) | **Eingearbeitet** |

---

## Zusammenfassung

- **23 Findings** identifiziert (6 Prozess, 9 Engine/UI, 10 Inhalt/Didaktik)
- **14 eingearbeitet** in AGENT_MATERIAL.md und AGENT_RAETSEL.md (Qualitaetsspezifikationen pro Materialtyp, Material-Alignment-Pflicht, Freitext-Neudefinition, Lueckentext-Darstellungsregel, Tipp-UI-Regeln, Einstieg-Spezifikation, Quellenangaben-Format)
- **3 behoben** in Engine (E6 Sicherung-Bug, E8 Header, E9 Dropdown-Bug) + N3 Tafelbild-h3
- **6 offen** — davon 3 strategisch (P1 MCP-Integration, P2 QM-Struktur, P3 Differenzierung), 3 technisch (E1 Drag-and-drop, E3 Tipp-UI, E4 Hover)

## Naechste Schritte

1. Engine-Quick-Fixes (E6, E8, E9) als Uebergabe-Prompt fuer Claude Code
2. MCP-Recherche (P1): verfuegbare Konnektoren fuer Bildersuche, Kartengenerierung evaluieren
3. Tipp-UI (E3) + Fussnoten-System (E2) als Engine-Erweiterung
4. Differenzierungs-Konzept (P3) entwerfen
