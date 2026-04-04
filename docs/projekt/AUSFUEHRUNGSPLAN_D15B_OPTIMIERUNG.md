# Ausfuehrungsplan: D15b-basierte Infrastruktur-Optimierung

**Erstellt:** 2026-04-04 (Session 10 Forts. 7)
**Grundlage:** D15b Multi-Agent-Audit Mappe 4 (Schlieffen-Plan) — 6 Rollen-Audits + neutrale Synthese.
**Ausloeser:** User-Direktive nach Abschluss D15b: "umfassende schrittweise Optimierung der Generierungsinfrastruktur auf Basis des Testruns Mappe 4, lueckenlos intelligent geplant".
**Ziel:** Jede qualifizierte Audit-Einsicht entweder in Infrastruktur-Aenderung ueberfuehren oder begruendet verwerfen. Keine Einsicht bleibt unadressiert.
**Scope-Abgrenzung:** Dieser Plan strukturiert den Prozess. Er produziert KEINE Patches. Patches werden in Phase III entworfen und in Phase IV ausgefuehrt.
**Abbruchkriterium:** Falls Qualifizierung zeigt, dass Befunde nicht auf Infrastruktur, sondern nur auf Mappe-4-Einzelfall zurueckgehen, wird der Plan auf Daten-Patches reduziert.

---

## Leitprinzipien

1. **Trennung Befund → Qualifizierung → Implikation → Strategie → Umsetzung.** Kein Schritt darf uebersprungen werden. Keine Strategie vor abgeschlossener Implikations-Analyse.
2. **Lueckenlose Abdeckung.** Jeder Befund aus Synthese UND aus den 6 Einzel-Audits wird im Befund-Register registriert. Auch verworfene Befunde werden mit Begruendung dokumentiert.
3. **Ebenen-Trennung beibehalten.** Befunde werden auf Ebenen gemappt (Meta-Prozess, Vertraege, Subagenten, Gueteregeln, Checklisten, Engine, Begleitdokumente). Pro Ebene eigene Aenderungs-Logik.
4. **Evidenz-Gewichtung nach IRR.** Klasse A (5-6/6) hat Vorrang vor Klasse B (4/6) vor Klasse C (3/6). Dissens-Befunde (Klasse D) werden NICHT entschieden, sondern als Optionen/Parameter in die Infrastruktur eingebaut.
5. **Methoden-Agnostik wahren.** PM-Ebene (Dispatcher, Session-Management, Register) bleibt fach-/methoden-unabhaengig; Produkt-Ebene (Vertraege, Subagenten, Gueteregeln) darf geschichts-/escape-game-spezifisch sein.
6. **Rueckwirkung auf Mappe 4.** Die aus Phase III abgeleiteten Strategien werden auf Mappe 4 selbst als Validierungs-Referenz angewendet (Re-Audit-Baseline).
7. **Keine Vermischung mit Mappe-5-Produktion.** Mappe 5 wird erst gestartet, wenn Phase IV dieses Plans abgeschlossen ist.

---

## Phasenstruktur

```
Phase 0 — PM-Infrastruktur (DIESE SESSION)
    |
    v
Phase I — Befund-Qualifizierung (Extraktion + Bewertung)
    |
    v
Phase II — Infrastruktur-Implikations-Analyse (Mapping auf Ebenen)
    |
    v
Phase III — Strategie-Ausarbeitung (konkrete Patch-/Redesign-Entwuerfe)
    |
    v
Phase IV — Umsetzung (Patches ausfuehren, Mappe 4 re-validieren)
    |
    v
Phase V — Re-Audit + Prozess-Retrospektive
```

---

## Phase 0 — PM-Infrastruktur

**Status:** IN ARBEIT (Session 10 Forts. 7).

**Ziel:** Scaffold fuer alle nachfolgenden Phasen etablieren. Kein Befund wird in Phase 0 qualifiziert oder gemappt — nur die Werkzeuge werden bereitgestellt.

**Deliverables:**
- Dieser Plan: `docs/projekt/AUSFUEHRUNGSPLAN_D15B_OPTIMIERUNG.md`
- Befund-Register-Geruest: `docs/projekt/D15B_BEFUND_REGISTER.md` (leere Tabellen + Pre-Populierung aus Synthese)
- Implikations-Matrix-Geruest: `docs/projekt/D15B_IMPLIKATIONS_MATRIX.md` (Achsen definiert, Zellen leer)
- Strategie-Dokument-Template: `docs/projekt/D15B_OPTIMIERUNGS_STRATEGIEN.md` (Kapitelstruktur, Inhalte leer)
- STATUS.md + CHANGELOG.md aktualisiert.

**Abschluss-Kriterium:** 4 Dokumente angelegt, verlinkt in STATUS.md, committed.

---

## Phase I — Befund-Qualifizierung

**Status:** PENDING.

**Ziel:** Aus Synthese + 6 Einzel-Audits vollstaendige, disjunkte Befund-Liste extrahieren. Jeder Befund erhaelt strukturierte Qualifizierungs-Metadaten.

**Arbeitsschritte:**

### I.1 Extraktion aus Synthese (~14 Befunde)
- Synthese-Abschnitte III.A (A1–A5), III.B (B1–B3), III.C (C1–C3), III.D (D1–D2), III.E (E1–E2), III.F (F1–F3) in Register uebernehmen.
- Pro Befund: Kurztitel, Originalzitat, Rollen-Sigel, Konvergenz-Klasse.

### I.2 Extraktion rollen-spezifischer Befunde (~15-25 zusaetzliche)
- Die 6 Einzel-Audits enthalten Detail-Findings, die in der Synthese nicht einzeln aufgefuehrt sind (Synthese konsolidiert auf Konvergenz-Niveau).
- Beispiele aus Summary-Wissen:
  - R2 Kilic: DaZ-Glossar-Box-Luecke, iPad-Touch-Ergonomie bei Drag-and-Drop, paraphrasiertes Schlieffen-Zitat nicht als solches gekennzeichnet.
  - R5 Kaltenbrunner: Aufgabe 7 Freitext ohne Rubric fuer Lehrprobe.
  - R6 Heidacker: Tipp-Nutzungs-Leak 60-70% (Loesungsvorwegnahme Stufe 3).
- Systematisches Durchlesen aller 6 Audit-Dateien. Jeder nicht-trivial Befund, der NICHT in Synthese verdichtet wurde, kommt als E-Klasse-Befund (Einzel) ins Register.

### I.3 Qualifizierung pro Befund
Felder pro Eintrag im Register:
- **ID** (A1, A2, ..., B1, ..., R2-1, R2-2, ... fuer rollen-spezifisch)
- **Titel**
- **Quelle** (Synthese-Abschnitt oder Rolle + Audit-Abschnitt)
- **Konvergenz-Klasse** (A/B/C/D/E/F)
- **Evidenz-Staerke** (stark / mittel / schwach) — subjektiv, begruendet durch IRR + Begruendungs-Dichte im Audit
- **Verallgemeinerbarkeit** (infrastruktur-relevant / nur-Mappe-4 / unklar) — entscheidender Filter
- **Severitaet** (Blocker / High / Medium / Low / Info)
- **Qualifizierungs-Verdikt** (accept / modify / reject / defer) — mit Begruendung
- **Implikations-Ziel** (vorlaeufig: Ebenen-Tag, z.B. "Subagenten-Prompt", "Engine", "Gueteregeln", "Begleitdokument"; kann in Phase II verfeinert werden)
- **Notiz**

### I.4 Disambiguierung Overlaps
- Wenn Synthese-Befund und Einzel-Audit-Befund identisch sind: Einzel-Eintrag als Sub-Eintrag des Synthese-Befunds markieren, keine Duplikate.

**Abschluss-Kriterium:** Befund-Register enthaelt ≥90% aller substantiellen Befunde aus Synthese + 6 Audits, jeder mit vollstaendigen Qualifizierungs-Feldern. Geschaetzter Umfang: 30-45 Befunde.

**Geschaetzter Aufwand:** 1 Session (ca. 1-1.5h Lesearbeit + strukturierte Eintragung). Subagent-Einsatz moeglich: ein Extraktions-Agent pro Einzel-Audit-Datei.

---

## Phase II — Infrastruktur-Implikations-Analyse

**Status:** PENDING.

**Ziel:** Jeden qualifizierten Befund (accept/modify) auf die betroffenen Infrastruktur-Ebenen abbilden. Ergebnis: Matrix (Befund × Ebene), jede Zelle leer oder mit Aenderungs-Skizze.

**Infrastruktur-Ebenen:**

| Ebene | Scope | Relevante Dateien |
|---|---|---|
| **E0 Meta-Prozess** | Workflow, Phasen-Reihenfolge, Audit-Struktur | WORKFLOW_v4.md, ORCHESTRATOR.md (Phasen-Teil) |
| **E1 Vertraege** | Phasen-Vertraege (Input/Output/Gates) | vertraege/VERTRAG_PHASE_2-0 bis 2-2c |
| **E2 Subagenten Material** | SUB_MATERIAL_*.md Prompts | 7 Dateien (DARSTELLUNGSTEXT, QUELLENTEXT, TAGEBUCH, BILDQUELLE, KARTE, STATISTIK, ZEITLEISTE) |
| **E3 Subagenten Aufgaben** | SUB_AUFGABE_*.md Prompts | 5 Dateien (MC, FREITEXT, LUECKENTEXT, REIHENFOLGE, ZUORDNUNG) |
| **E4 Orchestrator** | ORCHESTRATOR.md (Steuerungs-Teil) | docs/agents/ORCHESTRATOR.md |
| **E5 Gueteregeln** | Gueteregel-Kataloge | G1-G14, HE1-HE13, A1-A18, SK1-SK15, S1-S15, M1-M12 |
| **E6 Checklisten** | Q-Gates, Validierungs-Checklisten | Checklisten im Projekt-Prozess |
| **E7 Engine** | escape-engine.js, data.json Schema, Layout | assets/js/escape-engine.js, data.json |
| **E8 Begleitdokumente** | Lehrkraft-Leitfaeden, Trigger-Warnings | Neu zu erstellen unter escape-games/*/lehrkraft/ |
| **E9 Audit-Methodik** | D15b-Lessons-Learned: was hat die Audit-Methode selbst uebersehen | docs/analyse/ (Methodik-Updates) |

**Arbeitsschritte pro Befund:**
1. Betrifft dieser Befund Ebene Ex? (ja/nein/unklar)
2. Falls ja: Aenderungs-Typ (Add / Modify / Delete / Enforce) + Kurzskizze.
3. Querschnitts-Erkenntnis: Falls 3+ Befunde auf dieselbe Ebene+Datei zeigen, ist das ein Hotspot (Sammel-Patch statt Einzel-Patches).

**Abschluss-Kriterium:** Matrix ist fuer alle accept/modify-Befunde vollstaendig ausgefuellt. Hotspots sind markiert. Geschaetzter Umfang: 30-45 Zeilen × 10 Spalten.

**Geschaetzter Aufwand:** 1 Session.

---

## Phase III — Strategie-Ausarbeitung

**Status:** PENDING.

**Ziel:** Pro Hotspot bzw. pro identifizierte Implikation eine konkrete Strategie formulieren: was genau wird geaendert, wie sieht das Ziel-Artefakt aus, welche Risiken bestehen, welche Reihenfolge.

**Struktur pro Strategie-Eintrag:**
- **Strategie-ID** (STR-01, STR-02, ...)
- **Adressiert Befunde** (Liste von Register-IDs)
- **Betroffene Ebenen/Dateien**
- **Aenderungs-Typ** (Patch / Refactor / Neu-Erstellung / Schema-Erweiterung / Prompt-Reengineering)
- **Ziel-Beschreibung** (So-soll-es-sein)
- **Abhaengigkeiten** (von anderen Strategien oder externer Arbeit)
- **Risiken** (was kann brechen, welche Regressionsgefahr)
- **Validierung** (wie wird Erfolg gemessen — am besten am Mappe-4-Re-Audit-Punkt)
- **Aufwand** (S/M/L)
- **Prioritaet** (P0 Blocker / P1 High / P2 Medium / P3 Nice-to-have)
- **Umsetzungs-Reihenfolge** (Ord-Nummer)

**Konsolidierungs-Aufgabe:** Mehrere Befunde koennen durch eine Strategie abgedeckt werden. Ziel: minimale Strategie-Anzahl bei voller Befund-Abdeckung. Erwartung: 8-15 Strategien.

**Besondere Strategie-Kategorien:**
- **S-Engine:** Aenderungen an escape-engine.js (z.B. aufgabenspezifische Feedback-Slots, Differenzierungs-Tracks-Support, Layout-Side-by-Side).
- **S-Subagenten:** Prompt-Reengineering (Multiperspektivitaet erzwingen, Feedback-Process-Level-Quote, Bloom-Verteilungs-Check).
- **S-Gueteregeln:** Neue/erweiterte Kriterien (Cognitive-Load-Audit-Punkte, Hattie-d-Schaetzung, ICAP-Klassifizierung).
- **S-Checklisten:** Neue Q-Gates (vor Publikation: DaZ-Glossar, Trigger-Warning, Multiperspektive).
- **S-Begleitdokumente:** Lehrkraft-Leitfaden-Templates (Doppelstunden-Ablauf, Trigger-Sensibilitaet).
- **S-Audit-Methodik:** D15b-Lessons fuer kuenftige Audits (z.B. Mini-Pilot-Test, Lehrkraft-Feedback-Sampling).
- **S-Daten-Patch Mappe 4:** Retroaktive Mappe-4-Fixes (nicht Infrastruktur, aber notwendig fuer Re-Audit-Baseline).

**Abschluss-Kriterium:** Strategie-Dokument enthaelt alle Strategien, jede mit vollstaendigen Feldern. Abhaengigkeiten sind als DAG validierbar (keine Zyklen).

**Geschaetzter Aufwand:** 1-2 Sessions.

**Entscheidungspunkt am Ende Phase III:** User-Freigabe fuer Phase IV. Optionaler Cut-off: Nur P0/P1 in Phase IV, P2/P3 in spaeteren Sessions.

---

## Phase IV — Umsetzung

**Status:** PENDING.

**Ziel:** Strategien in der vorgegebenen Reihenfolge in konkrete Datei-Aenderungen ueberfuehren. Pro Strategie: Patch, Commit, Test.

**Strukturelles Muster pro Strategie-Umsetzung:**
1. **Pre-Flight:** git pull, betroffene Dateien lesen, Rollback-Plan.
2. **Patch:** Aenderungen durchfuehren (edit/write).
3. **Validierung:** Relevante Tests (JSON-Schema-Check, Python-Validierung, ggf. Browser-Stichprobe).
4. **Commit:** Message-Template `feat(d15b): STR-XX — <Kurztitel> (adressiert BEFUND-IDs)`.
5. **Register-Update:** Befund-Status im Register auf "resolved" setzen.
6. **CHANGELOG:** Eintrag pro Strategie-Abschluss.

**Mappe-4-Daten-Patch als Teil der Umsetzung:**
Da Mappe 4 als Re-Audit-Baseline dient, werden Daten-Patches (z.B. DaZ-Glossar-Box Inhalte, Aufgabe-7-Position, Feedback-Texte) parallel zu Infrastruktur-Patches ausgefuehrt.

**Abschluss-Kriterium:** Alle P0/P1-Strategien committed, Register komplett aktualisiert, Mappe 4 im Browser funktional.

**Geschaetzter Aufwand:** 3-6 Sessions je nach Scope.

---

## Phase V — Re-Audit + Retrospektive

**Status:** PENDING.

**Ziel:** Validierung der Infrastruktur-Aenderungen am Mappe-4-Einsatz, Ableitung methodologischer Lessons fuer Mappe-5-Produktion und kuenftige Audits.

**Arbeitsschritte:**

### V.1 Re-Audit Mappe 4
- Mindestens 2 Rollen aus dem urspruenglichen D15b-Set erneut spawnen (Empfehlung: R4 ID + R6 Empirie, da sie die staerksten strukturellen Kritikpunkte lieferten).
- Vergleich: welche urspruenglichen Befunde sind behoben, welche persistieren, welche neuen sind entstanden.

### V.2 Prozess-Retrospektive
- Welche Befunde haben sich als handhabbar erwiesen? Welche nicht? Warum?
- Welche Phase war zu lang/kurz? Welche Werkzeuge fehlten?
- Wie gut haben die neuen Gueteregeln Befunde praeventiv abgefangen (Proxy: Mappe-5-Testlauf)?

### V.3 Mappe-5-Gate
- Nur wenn Re-Audit-Ergebnis die Kriterien erfuellt, wird Mappe 5 gestartet.
- Andernfalls Rueckkehr zu Phase III (Strategie-Nachbesserung).

**Erfolgskriterium:** Re-Audit zeigt Aufloesung der Klasse-A-Befunde (A3 Progression, A4 Split-Attention, A5 Feedback-Elaborativitaet, A2 Tagebuch-Trigger-Flankierung). Klasse-B-Befunde mindestens halbiert.

**Geschaetzter Aufwand:** 1-2 Sessions.

---

## Zeit-/Session-Uebersicht

| Phase | Sessions (Schaetzung) | Hauptdeliverable |
|---|---|---|
| Phase 0 | 1 (diese) | 4 PM-Dokumente |
| Phase I | 1 | Befund-Register gefuellt |
| Phase II | 1 | Implikations-Matrix gefuellt |
| Phase III | 1-2 | Strategien-Dokument gefuellt |
| Phase IV | 3-6 | Patches committed |
| Phase V | 1-2 | Re-Audit + Retrospektive |
| **Gesamt** | **8-13 Sessions** | **Infrastruktur v4.5** |

---

## Dokumenten-Landkarte

- **Dieser Plan:** `docs/projekt/AUSFUEHRUNGSPLAN_D15B_OPTIMIERUNG.md`
- **Befund-Register:** `docs/projekt/D15B_BEFUND_REGISTER.md`
- **Implikations-Matrix:** `docs/projekt/D15B_IMPLIKATIONS_MATRIX.md`
- **Strategie-Dokument:** `docs/projekt/D15B_OPTIMIERUNGS_STRATEGIEN.md`
- **Audit-Inputs:** `docs/analyse/D15b_*.md` (8 Dateien: Bundle + 6 Rollen + Synthese)

---

## Naechster Schritt

Phase 0 abschliessen (diese Session), dann Phase I starten. Phase I braucht explizite User-Freigabe, da sie inhaltliche Interpretations-Arbeit einleitet.
