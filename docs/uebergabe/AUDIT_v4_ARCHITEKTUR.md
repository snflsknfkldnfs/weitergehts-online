# Audit-Auftrag: v4 Produktionsarchitektur — Strategische + Mechanische Evaluation

**Datum:** 2026-03-31
**Auftraggeber:** Cowork (Projektmanagement)
**Ausfuehrung:** Claude Code (frische Session, Read-Only)
**Modus:** Analyse — KEINE Dateien aendern, KEIN Git

---

## 1. Systemkontext (fuer den Auditor)

### 1.1 Was ist das Gesamtsystem?

**weitergehts.online** ist eine statische Website (GitHub Pages) mit interaktiven Escape-Games fuer den GPG-Unterricht (Geschichte/Politik/Geographie, 7. Klasse Mittelschule Bayern). Schueler:innen (R7-Sprachniveau, ~12-13 Jahre) loesen Aufgaben zu historischen Materialien, um Mappen freizuschalten.

### 1.2 Technische Architektur

- **Frontend:** Statisches HTML + CSS + JS (escape-engine.js)
- **Daten:** Eine `data.json` pro Game mit Mappen, Materialien, Aufgaben, Tafelbild, Einstieg, Sicherung
- **Hosting:** GitHub Pages, Custom Domain weitergehts.online
- **Kein Backend.** Alles client-seitig.

### 1.3 Produktionspipeline (Soll-Zustand)

Didaktische Inhalte (Materialien, Aufgaben) werden von spezialisierten Agenten-Prompts erzeugt:
- 7 Material-Subagenten (SUB_MATERIAL_DARSTELLUNGSTEXT, _QUELLENTEXT, _TAGEBUCH, _ZEITLEISTE, _BILDQUELLE, _KARTE, _STATISTIK)
- 5 Aufgaben-Subagenten (SUB_AUFGABE_MC, _ZUORDNUNG, _LUECKENTEXT, _REIHENFOLGE, _FREITEXT)
- Orchestratoren (AGENT_MATERIAL, AGENT_RAETSEL) steuern Dispatch + Q-Gates

### 1.4 Bisherige Versuche und Scheitern

| Versuch | Commit | Ergebnis | Root Cause |
|---|---|---|---|
| Mappe 1 (v2.1) | 5153466 | ERFOLGREICH | Manuelle Steuerung, 7 Learnings (L1-L7) |
| Mappe 2 v1 | a6aa589 | GESCHEITERT | Subagenten-Prompts nicht gelesen, monolithische Produktion |
| Mappe 2 v2 | c9eb9ec | GESCHEITERT | Subagenten gelesen aber nicht isoliert dispatched. 4/5 Aufgaben-JSONs Engine-inkompatibel |

**Kernbefund:** Claude Code liest alle Dateien in einen flachen Kontext und produziert monolithisch. Die Subagenten-Architektur (isolierter Kontext pro Material/Aufgabe, Q-Gate zwischen Dispatches) kann in Claude Code nicht erzwungen werden.

### 1.5 Geplante Loesung (v4)

Phase 2 (didaktische Produktion) wird von Claude Code nach Cowork verlagert. Cowork kann isolierte Dispatch-Schritte ausfuehren (Agent-Tool mit eigenem Kontext). Claude Code wird auf rein mechanische Assembly reduziert (Phase 3).

---

## 2. Audit-Scope

### Ebene A: Strategische Evaluation

**A1: Zielsystem-Alignment**
Dient die v4-Architektur dem tatsaechlichen Zweck? Der Zweck ist: didaktisch hochwertige, engine-kompatible Escape-Game-Materialien fuer R7-Mittelschule, produziert mit akzeptablem Aufwand.
- Loesung v4 ein reales Problem oder ein Infrastruktur-Problem auf Kosten von Einfachheit?
- Ist die Qualitaetssteigerung durch isolierten Dispatch empirisch plausibel?

**A2: Architekturentscheidung Cowork vs. Claude Code**
Ist die Verlagerung nach Cowork die richtige Antwort?
- Gaebe es einfachere Loesungen (z.B. mehrere sequentielle Claude-Code-Sessions mit je einem Material)?
- Ist Cowork-basierte Produktion robuster als Claude-Code-basierte — oder verlagert sie nur das Problem?
- Welche neuen Risiken entstehen durch die Verlagerung?

**A3: Komplexitaetsbudget**
Das System produziert pro Mappe ca. 6 Materialien und 5 Aufgaben. Die Architektur hat:
- 7 Prinzipien (P1-P7)
- 3 Phase-2-Unterphasen (2.0, 2.1, 2.2 mit 2.2a/b/c)
- Schnittstellen-Vertraege mit Feld-Granularitaet pro Dispatch-Schritt
- Compaction-Failsafe-Mechanismus
- Artefakt-Verzeichnisstruktur mit .json pro Material/Aufgabe

Ist das angemessen oder ueber-engineered? Wo koennte vereinfacht werden ohne Qualitaetsverlust?

**A4: Risiko-Bewertung**
Welche Risiken sieht der Auditor, die moeglicherweise durch Proximity zum Problem uebersehen wurden?
- Token-Limits in Cowork bei 6+5 sequentiellen Dispatches?
- Session-Grenzen?
- Fehlerfortpflanzung zwischen Phasen?
- Abhaengigkeit von Cowork-spezifischem Verhalten (Agent-Tool)?

**A5: Alternative Ansaetze**
Gibt es Loesungswege, die nicht evaluiert wurden?
- Z.B. Claude-Code-Subagenten (Agent-Tool existiert auch dort)?
- Z.B. einzelne Claude-Code-Sessions pro Material (Pipeline statt monolith)?
- Z.B. vereinfachte Prompts ohne Subagenten-Architektur?

### Ebene B: Mechanische Evaluation

**B1: Schnittstellen-Vertraege (P6)**
Fuer jeden Dispatch-Schritt in WORKFLOW_v4.md Phase 2:
- Sind die Input-Felder vollstaendig? Fehlt etwas, das der Subagent braucht?
- Werden Felder referenziert, die in der Input-Datei nicht existieren?
- Ist die NICHT-lesen-Spalte korrekt (werden tatsaechlich irrelevante Felder ausgeschlossen)?

**B2: Engine-Kompatibilitaet**
Pruefen: Stimmen die Output-Schemata der SUB_AUFGABE_*.md mit dem, was escape-engine.js tatsaechlich parst, ueberein?
- Relevante Dateien: `assets/js/escape-engine.js` (Funktionen: renderAufgabe, checkAnswer, renderMaterial)
- SUB_AUFGABE_MC.md, SUB_AUFGABE_ZUORDNUNG.md, SUB_AUFGABE_LUECKENTEXT.md, SUB_AUFGABE_REIHENFOLGE.md, SUB_AUFGABE_FREITEXT.md

**B3: Compaction-Failsafe (P1)**
Gibt es Dispatch-Schritte, die implizit auf Kontextinhalte statt auf Dateien angewiesen sind?
- Phase 2.0 (Rahmen): Liest aus MATERIAL_GERUEST + TAFELBILD_Mappe.md — beides Dateien. OK?
- Phase 2.1 (Materialien): Sequentiell, jedes Material liest frisch. Aber: Braucht ein Material den Output eines vorherigen Materials?
- Phase 2.2a (Progressionsplan): Liest alle materialien/*.json — was wenn die Session nach 3 von 6 Materialien compacted?
- Phase 2.2b (Aufgaben): Liest PROGRESSIONSPLAN.md + Ziel-Material.json. OK?

**B4: Verlustfreiheit (P7)**
Gibt es produktive Elemente in WORKFLOW_v2.md (v3), die in WORKFLOW_v4.md fehlen oder abgeschwaecht sind?
- Insbesondere: Phase 1.5 Sequenzplanung, Sequenzkontext-Objekte, didaktische_funktion pro Material

**B5: Mappe-Anhang-Prozedur**
Ist die Phase-3-Assembly mit ORCHESTRATOR.md Zeilen 120-131 konsistent?
- Liest Phase 3 data.json aus Git (Schritt 3.0)?
- Fuegt Phase 3 korrekt mappen[N-1] an?
- Werden bestehende Mappen unveraendert gelassen?

---

## 3. Zu lesende Dateien

### Primaer (MUSS lesen)

```
docs/architektur/WORKFLOW_v4.md                    — Audit-Gegenstand: neuer Workflow
docs/architektur/UPGRADE_PLAN_v4_PRODUKTIONSARCHITEKTUR.md  — Audit-Gegenstand: Architekturplan
docs/architektur/WORKFLOW_v2.md                    — Referenz: bisheriger Workflow (v3)
docs/agents/ORCHESTRATOR.md (Zeilen 1-170)         — Phasenstruktur + Mappe-Anhang-Prozedur
assets/js/escape-engine.js                          — Engine: renderAufgabe, checkAnswer (Engine-Kompatibilitaet)
```

### Sekundaer (SOLL lesen, bei Bedarf)

```
docs/agents/SUB_AUFGABE_MC.md                      — Output-Schema MC
docs/agents/SUB_AUFGABE_ZUORDNUNG.md               — Output-Schema Zuordnung
docs/agents/SUB_AUFGABE_LUECKENTEXT.md             — Output-Schema Lueckentext
docs/agents/SUB_AUFGABE_REIHENFOLGE.md             — Output-Schema Reihenfolge
docs/agents/SUB_AUFGABE_FREITEXT.md                — Output-Schema Freitext
docs/agents/AGENT_MATERIAL.md                      — Material-Design + Dispatch-Logik
docs/agents/AGENT_RAETSEL.md                       — Aufgaben-Orchestration
docs/agents/SUB_MATERIAL_DARSTELLUNGSTEXT.md       — Beispiel Material-Subagent
escape-games/gpg-erster-weltkrieg-ursachen/data.json — Referenz-Datenstruktur (Mappe 1)
```

---

## 4. Output-Format

```markdown
# Audit-Ergebnis: v4 Produktionsarchitektur

## Strategische Evaluation (Ebene A)

### A1: Zielsystem-Alignment
[Bewertung + Begruendung]

### A2: Architekturentscheidung
[Bewertung + Alternativen]

### A3: Komplexitaetsbudget
[Bewertung + Vereinfachungsvorschlaege]

### A4: Risiken
[Befunde, priorisiert]

### A5: Alternative Ansaetze
[Evaluierte Alternativen mit Pro/Contra]

## Mechanische Evaluation (Ebene B)

### B1-B5: Befunde
| # | Ebene | Schwere | Befund | Empfehlung |
|---|---|---|---|---|
| 1 | B{X} | BLOCKER/HIGH/MEDIUM/LOW | [Beschreibung] | [Empfehlung] |

## Gesamtbewertung
[1-3 Saetze: Ist v4 der richtige Weg? Was muss vor Runde 2 geklaert werden?]
```

---

## 5. Regeln

1. **Read-Only.** Keine Dateien aendern, kein Git.
2. **Ehrlich.** Wenn v4 ueber-engineered ist, das sagen. Wenn die Architekturentscheidung falsch ist, das sagen.
3. **Konstruktiv.** Zu jedem Befund eine Empfehlung.
4. **Priorisiert.** BLOCKER vor HIGH vor MEDIUM vor LOW.
5. **Audit-Ergebnis** als Datei speichern: `docs/analyse/AUDIT_v4_ARCHITEKTUR_ERGEBNIS.md`
