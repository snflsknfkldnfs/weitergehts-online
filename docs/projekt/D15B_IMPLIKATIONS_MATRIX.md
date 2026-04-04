# D15b Implikations-Matrix

**Zweck:** Mapping qualifizierter Befunde (aus `D15B_BEFUND_REGISTER.md`) auf konkrete Infrastruktur-Ebenen und -Dateien. Grundlage fuer Strategie-Ausarbeitung in Phase III.
**Kontext:** `AUSFUEHRUNGSPLAN_D15B_OPTIMIERUNG.md` Phase II.
**Status:** SCAFFOLD (Phase 0). Achsen definiert, Hotspot-Analyse leer. Zellen werden in Phase II gefuellt.

---

## Ebenen-Definition

| Ebene | Bezeichnung | Primaer-Dateien | Sekundaer |
|---|---|---|---|
| **E0** | Meta-Prozess | `docs/architektur/WORKFLOW_v4.md`, `docs/agents/ORCHESTRATOR.md` (Phasen-Teil) | Session-Split, Q-Gate-Reihenfolge |
| **E1** | Vertraege | `docs/architektur/vertraege/VERTRAG_PHASE_2-0_RAHMEN.md`, `…_2-1_MATERIAL.md`, `…_2-1c_CROSS.md`, `…_2-2a_PROGRESSIONSPLAN.md`, `…_2-2b_AUFGABE.md`, `…_2-2c_CROSS.md`, `docs/agents/VERTRAG_PHASE_3_ASSEMBLY.md` | Input/Output-Spezifikationen |
| **E2** | Subagenten Material | `docs/agents/SUB_MATERIAL_DARSTELLUNGSTEXT.md`, `…_QUELLENTEXT.md`, `…_TAGEBUCH.md`, `…_BILDQUELLE.md`, `…_KARTE.md`, `…_STATISTIK.md`, `…_ZEITLEISTE.md`, `docs/agents/AGENT_HEFTEINTRAG.md` | 7 Material-Subagenten + Hefteintrag |
| **E3** | Subagenten Aufgaben | `docs/agents/SUB_AUFGABE_MC.md`, `…_FREITEXT.md`, `…_LUECKENTEXT.md`, `…_REIHENFOLGE.md`, `…_ZUORDNUNG.md`, `docs/agents/AGENT_RAETSEL.md` | 5 Aufgaben-Subagenten + Raetsel-Auswahl |
| **E4** | Orchestrator | `docs/agents/ORCHESTRATOR.md` (Steuerungs-Teil) | Phasen-Transitionen, Dispatch |
| **E5** | Gueteregeln | `docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md` (G1–G14), `…_HEFTEINTRAG_PRODUKT.md` (HE1–HE13), `GUETEKRITERIEN_AUFGABEN.md` (A1–A18), `GUETEKRITERIEN_SKRIPT.md` (SK1–SK15), `GUETEKRITERIEN_SEQUENZIERUNG.md` (S1–S15), `QUALITAETSKRITERIEN_MATERIALPRODUKTION.md` (M1–M12) | Erweiterte Kriterien |
| **E6** | Checklisten / Q-Gates | `docs/checklisten/Checkliste_Interaktive_Materialien.md`, neue Pre-Publikations-Checkliste | Audit-Workflow-Integration |
| **E7** | Engine | `assets/js/escape-engine.js`, `assets/css/themes/theme-gpg.css`, `escape-games/*/data.json` (Schema) | Feedback-Slots, Layout, Differenzierung, A11y |
| **E8** | Begleitdokumente | Neu: `escape-games/gpg-erster-weltkrieg-ursachen/lehrkraft/` (Doppelstunden-Ablauf, Trigger-Leitfaden, DaZ-Glossar-Template, Rubric Aufgabe-7) | Lehrkraft-Material |
| **E9** | Audit-Methodik | `docs/analyse/` (D15b-Methodik-Update), Audit-Workflow-Doku | Lessons fuer Folge-Audits, Plugin-Integration |

---

## Matrix (Befund × Ebene)

**Ausfuell-Konvention pro Zelle:**
- `—` = nicht betroffen
- `?` = Pruefung in Phase II noetig
- `A` = Add (neu hinzufuegen)
- `M` = Modify (aendern)
- `D` = Delete (entfernen)
- `E` = Enforce (Regel existiert, muss strikter durchgesetzt werden)
- Nach Buchstabe: Kurzskizze (max. 1 Zeile)

### Teil A: Synthese-Befunde

| Befund | E0 Meta | E1 Vertraege | E2 Sub-Mat | E3 Sub-Auf | E4 Orch | E5 Gueteregeln | E6 Checklisten | E7 Engine | E8 Begleitdok | E9 Audit-Method |
|---|---|---|---|---|---|---|---|---|---|---|
| A1 Sachkorrektheit | — | — | — | — | — | ? (positiv sichern) | — | — | — | ? |
| A2 Tagebuch-Narrativ | — | — | ? (SUB_MATERIAL_TAGEBUCH Muster festhalten) | — | — | ? | — | — | ? | — |
| A3 Aufgaben-Progression | ? | ? | — | ? (Bloom-Verteilungs-Pflicht) | — | ? (A-Gueteregeln) | ? | — | — | — |
| A4 Split-Attention | — | — | — | — | — | ? | — | ? (Layout side-by-side) | — | — |
| A5 Feedback binaer | — | — | — | ? (elaborative Feedback-Quote) | — | ? | — | ? (aufg.-spez. Feedback-Slot) | — | — |
| B1 Doppelstunden-Tauglichkeit | — | ? (Zeitbudget-Deklaration) | — | — | — | ? | — | — | ? (Ablauf-Plan) | — |
| B2 Multiperspektivitaet | — | ? (Material-Vertrag) | ? (SUB_MATERIAL diversifizieren) | — | — | ? (Multiperspektive-Check) | ? | — | — | — |
| B3 Tech-Robustheit | — | — | — | — | — | — | — | ? (Regressionstest) | — | — |
| C1 Quellenkritik | — | — | — | ? (neuer Aufgaben-Subtyp?) | — | ? | ? | — | — | — |
| C2 Fragekompetenz | — | — | — | ? | — | ? | — | — | — | — |
| C3 Differenzierung | — | ? | — | ? (Track A/B/C) | — | ? | ? | ? (Differenzierungs-Support) | ? | — |
| D1 Triggerpotenzial | — | — | ? (Warn-Metadaten in Material) | — | — | — | ? (Trigger-Check) | — | ? (Trigger-Leitfaden) | — |
| D2 Gamification | ? | — | — | — | — | ? | — | ? (Loesungswort-Mechanik) | — | — |
| E1 Sprachliche Sensibilitaet | — | — | ? (Fachbegriff-Regel) | — | — | ? | — | — | — | — |
| E2 Hefteintrag reflexiv | — | — | ? (AGENT_HEFTEINTRAG) | — | — | ? (HE-Regeln) | — | — | — | — |
| F1 Plan XVII | — | — | — | — | — | — | — | — | — | ? |
| F2 Retention/Transfer | — | — | — | — | — | ? | ? | — | — | ? (Folge-Audit) |
| F3 Quellendiversitaet | — | ? | ? | — | — | ? | — | — | — | — |
| F4 A11y/WCAG | — | — | — | — | — | ? | ? | ? (WCAG-Pass) | — | ? (accessibility-compliance Plugin) |
| F5 Datenschutz | — | — | — | — | — | — | ? | ? | — | ? |
| F6 Last-Robustheit | — | — | — | — | — | — | — | ? | — | ? |

### Teil B: Rollen-spezifische Befunde

_(wird in Phase II erweitert, sobald Befund-Register Teil 2 gefuellt ist)_

| Befund | E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 |
|---|---|---|---|---|---|---|---|---|---|---|
| R2-1 DaZ-Glossar-Luecke | — | — | — | — | — | ? | ? | ? (Glossar-Komponente) | ? (Template) | — |
| R2-2 iPad-Touch | — | — | — | — | — | — | ? | ? (Touch-Target-Groesse) | — | — |
| R2-3 Schlieffen-Zitat | — | — | ? (Paraphrase-Kennzeichnung Regel) | — | — | ? | — | — | — | — |
| R4-1 Tipp-Haertegrade | — | — | — | ? (Tipp-Struktur Regel) | — | ? | — | — | — | — |
| R4-2 Pretraining | — | ? | ? | — | — | ? | — | — | — | — |
| R5-1 Rubric Aufgabe 7 | — | — | — | ? (SUB_AUFGABE_FREITEXT) | — | ? | — | — | ? | — |
| R5-2 Klassenfuehrung | — | — | — | — | — | — | — | — | ? | — |
| R6-1 Tipp-Leak | — | — | — | ? | — | ? | — | ? | — | — |
| R6-2 OTL-Effizienz | — | — | — | ? | — | ? | — | — | — | — |

---

## Hotspot-Analyse (Phase II)

**Ziel:** Ebenen identifizieren, die von 3+ Befunden betroffen sind. Hotspots signalisieren: eine gebuendelte Strategie ist effizienter als mehrere Einzelaenderungen.

**Vorlaeufige Hotspot-Kandidaten (auf Basis der vorlaeuf. Zellen, zu verifizieren):**

| Ebene | Betroffene Befunde (erwartet) | Sammel-Patch-Potenzial |
|---|---|---|
| **E3 Subagenten Aufgaben** | A3, A5, C1, C2, C3, R4-1, R5-1, R6-1, R6-2 | HOCH — grundlegender Prompt-Refactor |
| **E5 Gueteregeln** | A2, A3, A5, B1, B2, C1, C2, C3, D2, E1, E2, F2, F4, R2-3, R4-1, R5-1, R6-1, R6-2 | SEHR HOCH — Erweiterung aller Kataloge |
| **E7 Engine** | A4, A5, B3, C3, D2, F4, F5, F6, R2-1, R2-2, R6-1 | HOCH — mehrere Engine-Patches |
| **E8 Begleitdokumente** | B1, C3, D1, R2-1, R5-1, R5-2 | MITTEL — neues Dokumenten-Set |
| **E2 Subagenten Material** | A2, B2, E1, E2, F3, R2-3, R4-2 | MITTEL — Querschnitts-Regel + Einzel-Anpassungen |
| **E9 Audit-Methodik** | F1, F2, F4, F5, F6 | MITTEL — Folge-Audit-Design, Plugin-Integration |

**Interpretation (vorlaeufig):** Die Hauptlast der Optimierung liegt auf E3 (Aufgaben-Subagenten), E5 (Gueteregeln), E7 (Engine) und E8 (Begleitdokumente). E0/E1/E4/E6 sind sekundaer. Das deckt sich mit der D15b-Kern-Erkenntnis: Material-Ebene funktioniert, Aufgaben-/Feedback-Ebene ist strukturell unterdimensioniert.

---

## Arbeitsprotokoll Phase II

_Hier werden in Phase II Entscheidungen pro Befund dokumentiert: welche Zelle warum gesetzt wurde, welche Dateien konkret, welche Dateien nicht._

---

**Naechste Aktion:** Nach Abschluss Phase I (Befund-Register vollstaendig qualifiziert) die Zellen dieser Matrix systematisch von `?`/leer auf `A/M/D/E + Skizze` setzen. Hotspots final bestaetigen.
