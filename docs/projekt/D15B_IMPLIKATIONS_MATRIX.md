# D15b Implikations-Matrix

**Zweck:** Mapping qualifizierter Befunde (aus `D15B_BEFUND_REGISTER.md`) auf konkrete Infrastruktur-Ebenen und -Dateien. Grundlage fuer Strategie-Ausarbeitung in Phase III.
**Kontext:** `AUSFUEHRUNGSPLAN_D15B_OPTIMIERUNG.md` Phase II.
**Status:** GEFUELLT (Phase II, 2026-04-04). 23 Netto-Cluster (aus Phase I) gemappt auf E0-E9. Hotspot-Analyse verifiziert.

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

## Matrix (Cluster × Ebene)

**Ausfuell-Konvention pro Zelle:**
- `—` = nicht betroffen
- `A` = Add (neu hinzufuegen)
- `M` = Modify (aendern)
- `D` = Delete (entfernen)
- `E` = Enforce (Regel existiert, muss strikter durchgesetzt werden)
- Nach Buchstabe: Kurzskizze (max. 1 Zeile)

**Quelle:** 23 Netto-Cluster aus `D15B_BEFUND_REGISTER.md` Teil 3 (Phase I abgeschlossen). Rejected/deferred/merged Cluster sind nicht enthalten.

### Teil A: P0-Cluster (7)

| Cluster | E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 |
|---|---|---|---|---|---|---|---|---|---|---|
| **K01 Cognitive Depth / Bloom-Verteilung** | — | M Bloom-Quote Pflichtfeld | — | M Mindest-Bloom pro Subtyp | — | M A-Katalog Bloom-Check | A Bloom-Audit | — | — | — |
| **K02 Feedback-Elaboration (Hattie)** | — | M feedback-objekt statt string | — | M elaborative Feedback-Slots in allen SUB_AUFGABE | — | M A/HE Feedback-Qualitaet | — | M Feedback-Slot Rendering | — | — |
| **K03 Tipp-Haertegrade (3 Stufen)** | — | M Tipp-Struktur-Schema | — | M Tipp-Generator mit Stufen-Logik | — | M A-Katalog Tipp-Regel | — | M Tipp-Stufen-UI | — | — |
| **K04 Multiperspektivitaet** | — | M Perspektiven-Pflicht bei Konfliktthemen | M SUB_MATERIAL Perspektiven-Quote | — | — | M M/SK Multiperspektive-Check | A Perspektiven-Audit | — | — | — |
| **K09 Zeit-Realismus / Doppelstunde** | M Zeitbudget in WORKFLOW | M Zeitbudget-Deklaration pro Station | — | — | — | M SK/S Zeit-Plausibilitaet | A Zeit-Plausi-Lauf | — | A Doppelstunden-Ablaufplan | — |
| **K12 Layout / Spatial-Contiguity** | — | — | — | — | — | M HE/SK Spatial-Contiguity-Regel | A Layout-Audit | M side-by-side Material+Aufgabe | — | — |
| **K13 Gueteregeln-Tiefenstruktur** | — | — | — | — | — | M alle Kataloge: Tiefenstruktur-Kriterien | M Checklisten-Workflow Prioritaet | — | — | M Tiefenstruktur als Primaer-Achse |

### Teil B: P1-Cluster (10)

| Cluster | E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 |
|---|---|---|---|---|---|---|---|---|---|---|
| **K05 Quellenkritik** | — | M Quellenkritik als Aufgabentyp | — | A SUB_AUFGABE_QUELLENKRITIK (oder FREITEXT-Erweiterung) | — | M A-Katalog Quellenkritik-Regel | A Quellenkritik-Check | — | — | — |
| **K06 DaZ / Sprachl. Sensibilitaet** | — | — | M Fachbegriff-Markierung + Glossar-Hooks | — | — | M M-Katalog Sprach-Niveau | — | A Glossar-Tooltip | A DaZ-Glossar-Template | — |
| **K07 Differenzierung (Track A/B/C)** | — | M Track-Flag in AUFGABE-Vertrag | — | M Differenzierungs-Varianten pro Subagent | — | M A-Katalog Diff-Check | — | M Track-Switcher | A Diff-Leitfaden Lehrkraft | — |
| **K08 Trigger-Sensibilitaet** | — | — | M Trigger-Warn-Metadaten | — | — | — | A Trigger-Check | — | A Trigger-Leitfaden | — |
| **K14 Hefteintrag reflexiv** | — | — | M AGENT_HEFTEINTRAG Reflexions-Slot | — | — | M HE-Katalog Reflexions-Regel | — | — | — | — |
| **K16 Aufgabentypologie-Erweiterung** | — | M erweiterte Aufgabentypen in VERTRAG | — | A neue SUB_AUFGABE (Vergleich, Begruendung) | — | M A-Katalog Typenspektrum | — | — | — | — |
| **K32 R3-Schutzregeln (Do-not-break)** | — | — | — | — | — | A Schutzregeln-Abschnitt alle Kataloge | — | — | — | A Regressions-Check in Audit |
| **K33 Lehrprobe-Tauglichkeit** | — | — | — | — | — | M SK/S Lehrprobe-Check | A Lehrprobe-Pre-Check | — | A Lehrprobe-Briefing | — |
| **K34 Personalisierung parametrisiert** | — | — | M TAGEBUCH Personalisierungs-Flag + Meta-Slot | A Meta-Reflexions-Aufgabe Pflicht | — | M M/A Personalisierungs-Regel | — | — | — | — |
| **K36 Audit-Methodik (D15b-Lessons)** | — | — | — | — | — | — | — | — | — | M Audit-Workflow-Iteration |

### Teil C: P2-Cluster (6)

| Cluster | E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 |
|---|---|---|---|---|---|---|---|---|---|---|
| **K11 Metakognition** | — | — | — | A Metakognitions-Prompt-Variante | — | M A-Katalog Meta-Check | — | — | — | — |
| **K15 Pandel Geschichtsbewusstsein** | — | — | — | — | — | M SK-Katalog Pandel-Dimensionen | — | — | — | M Audit-Dimension Pandel |
| **K17 WCAG / A11y** | — | — | — | — | — | M HE/M WCAG-Referenzen | A A11y-Checkliste | M Kontrast, Touch-Targets, ARIA | — | M accessibility-compliance Plugin |
| **K22 Synchronisationspunkte** | M Sync-Punkte zw. Phasen | — | — | — | M ORCHESTRATOR Sync-Gates | — | — | — | — | — |
| **K23 Worked Examples** | — | — | — | A Worked-Example-Variante | — | M A-Katalog Worked-Example-Regel | — | — | — | — |
| **K31 Sequenz-Uebergeleitung** | — | — | — | — | — | M S-Katalog Uebergangs-Check | — | — | A Sequenz-Uebergangs-Doku | — |

---

## Hotspot-Analyse (Phase II, verifiziert)

**Ziel:** Ebenen identifizieren, die von 3+ Clustern betroffen sind. Hotspots signalisieren: eine gebuendelte Strategie ist effizienter als mehrere Einzelaenderungen.

**Cluster-Treffer pro Ebene (aus Teil A+B+C gezaehlt):**

| Ebene | Treffer | Betroffene Cluster | Sammel-Patch-Potenzial |
|---|---:|---|---|
| **E5 Gueteregeln** | **20** | K01, K02, K03, K04, K05, K06, K07, K09, K11, K12, K13, K14, K15, K16, K17, K23, K31, K32, K33, K34 | **KRITISCH** — Kataloge E5 sind der zentrale Hebel. Fast alle Cluster landen hier. Tiefenstruktur-Refactor (K13) ist Meta-Patch. |
| **E3 Subagenten Aufgaben** | **9** | K01, K02, K03, K05, K07, K11, K16, K23, K34 | **SEHR HOCH** — grundlegender Prompt-Refactor aller SUB_AUFGABE_*. Bundle: Bloom + Feedback + Tipps + Differenzierung + neue Subtypen. |
| **E6 Checklisten / Q-Gates** | **9** | K01, K04, K05, K08, K09, K12, K13, K17, K33 | **HOCH** — Checklisten-Suite erweitern (Bloom-, Perspektiven-, Zeit-, Layout-, A11y-, Trigger-, Quellenkritik-Audits). |
| **E1 Vertraege** | **8** | K01, K02, K03, K04, K05, K07, K09, K16 | **HOCH** — `VERTRAG_PHASE_2-2b_AUFGABE.md` wird Haupt-Schauplatz; `2-0_RAHMEN.md` bekommt Zeitbudget; `2-1_MATERIAL.md` bekommt Perspektiven-Pflicht. |
| **E7 Engine** | **6** | K02, K03, K06, K07, K12, K17 | **HOCH** — Engine-Patches: Feedback-Slot-Rendering, Tipp-Stufen-UI, Glossar-Tooltip, Track-Switcher, side-by-side Layout, A11y. |
| **E8 Begleitdokumente** | **6** | K06, K07, K08, K09, K31, K33 | **MITTEL** — neues Dokumenten-Set fuer Lehrkraefte (Ablaufplan, DaZ-Glossar, Diff-Leitfaden, Trigger-Leitfaden, Sequenz-Uebergang, Lehrprobe-Briefing). |
| **E2 Subagenten Material** | **5** | K04, K06, K08, K14, K34 | **MITTEL** — Querschnitts-Regel (Perspektiven, DaZ, Trigger, Personalisierung) + HEFTEINTRAG-Refactor. |
| **E9 Audit-Methodik** | **5** | K13, K15, K17, K32, K36 | **MITTEL** — Methodik-Iteration: Tiefenstruktur, Pandel, A11y-Plugin, Schutzregeln-Regression, D15b-Lessons. |
| **E0 Meta-Prozess** | **2** | K09, K22 | **NIEDRIG** — lokale WORKFLOW-Edits (Zeitbudget, Sync-Punkte). |
| **E4 Orchestrator** | **1** | K22 | **NIEDRIG** — punktueller ORCHESTRATOR-Patch. |

**Interpretation (verifiziert):**

1. **E5 ist Mega-Hotspot** (20/23 Cluster). Ohne Refactor der Gueteregel-Kataloge passiert strukturell nichts. Die Tiefenstruktur-Wende (K13) ist dabei nicht *ein weiterer Cluster*, sondern der **Meta-Patch**, der die Qualitaet aller anderen Kataloge-Aenderungen bestimmt. Konsequenz fuer Phase III: K13 muss zeitlich **vor** K01–K12, K14–K17 greifen oder mit ihnen gekoppelt werden.

2. **E3 + E1 sind gekoppelt** (8/9 E1-Cluster schlagen auch auf E3 durch). Konsequenz: Vertrags-Anpassung und Subagent-Refactor muessen als **Atom-Unit** geplant werden — sonst driften Vertrag und Subagent-Prompt auseinander. Strategie: ein Cluster-Patch pro Dimension (Bloom, Feedback, Tipps, Differenzierung, Quellenkritik, Typologie), jeweils E1+E3+E5 synchron.

3. **E6 ist Multiplikator**, kein eigener Arbeitsbereich. Jeder E5-Patch erzeugt automatisch einen E6-Patch (Checkliste zur Durchsetzung). Bundle-Option: eine konsolidierte "D15b-Post-Publish-Checkliste" statt 9 Einzel-Checklisten.

4. **E7 Engine-Patches sind heterogen** (Feedback-Rendering, Tipp-UI, Glossar, Track, Layout, A11y). Sie brauchen eine **eigene Session** (Frontend-Fokus), koennen aber parallel zu E5/E1/E3-Sessions laufen, weil Ownership-Konflikt gering ist.

5. **E8 Begleitdokumente** sind niedrig-Risiko, hoher Lehrpraxis-Wert, ideal als Abschluss-Session.

6. **E0/E4** sind leichtgewichtig und koennen als Teil der E5-Meta-Session miterledigt werden.

**Meta-Erkenntnis Phase II:** Die 23 Cluster verdichten sich auf **6 strategische Bundle-Zonen**, nicht 23 Einzel-Patches. Dies wird Input fuer Phase III (Strategie).

---

## Arbeitsprotokoll Phase II

**2026-04-04 — Session 10 (Forts. 9): Matrix gefuellt**

- Einheit der Analyse: **Cluster** (nicht Einzel-Befund). Grund: Phase I hat 114 Befunde auf 23 Netto-Cluster reduziert; Matrix auf Cluster-Ebene ist lesbar und entscheidungsrelevant, auf Befundebene waere sie eine Tapete.
- Rejected/deferred/merged Cluster aus Phase I (K10, K18-21, K24-30, K35) sind hier **nicht** enthalten — werden separat dokumentiert (K26 ist bewusste Design-Entscheidung, K18-21/24/29 in Phase V).
- Zell-Entscheidungsregel: Eine Zelle bekommt einen Eintrag, wenn der Cluster **konkrete Datei-Aenderung** auf dieser Ebene erzwingt. Keine Spekulativ-Zellen.
- Hotspot-Schwelle: 3+ Cluster (von 23). Alle Ebenen ausser E4 erreichen die Schwelle; E0, E4 sind trotzdem gelistet, damit keine Ebene verloren geht.
- Kopplungs-Analyse (E1↔E3) ist der wichtigste **nicht-offensichtliche** Befund. Ohne diese Kopplung wuerden Vertrag und Subagent-Prompt in Phase III desynchronisiert. Wird in Phase III als harte Sequenzierungs-Regel kodiert.
- K13 (Tiefenstruktur-Refactor der Gueteregeln) wird aus "ein Cluster unter vielen" zu **Meta-Patch** hochgestuft — er definiert die Qualitaet aller weiteren E5-Aenderungen. Dies ist die zweite nicht-offensichtliche Erkenntnis.

---

**Naechste Aktion:** Phase III — `D15B_OPTIMIERUNGS_STRATEGIEN.md` ausarbeiten. Die 6 strategischen Bundle-Zonen (E5-Meta, E1+E3-Atom-Units, E6-Konsolidierung, E7-Engine-Session, E8-Lehrkraft-Dokumente, E9-Audit-Methodik) zu konkreten Strategien mit DAG-Abhaengigkeiten, Prioritaet und Session-Schnitt verdichten.
