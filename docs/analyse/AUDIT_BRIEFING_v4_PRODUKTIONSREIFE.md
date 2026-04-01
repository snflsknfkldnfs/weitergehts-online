# AUDIT BRIEFING v4: Produktionsreife der Mappenproduktion

**Datum:** 2026-03-31
**Auftraggeber:** Paul (Lehrkraft, Projektleitung)
**Kontext:** v4-Architektur — Runde 2 (Agenten-Anpassung) soeben abgeschlossen. Vor Runde 3a (erste reale Mappenproduktion) soll geprueft werden, ob die Infrastruktur als Gesamtsystem produktionsbereit ist.
**Vorgeschichte:** Mappe-2-Produktion v1 (a6aa589) und v2 (c9eb9ec) beide gescheitert — monolithische Produktion trotz Subagenten-Architektur. v4 verlagert Phase 2 nach Cowork mit isoliertem Dispatch.

---

## 1. Pruefauftrag

Beurteile, ob ein Claude-Agent, der die folgenden Dokumente als einzige Steuerungsgrundlage erhaelt, eine vollstaendige Mappe (6 Materialien, 5 Aufgaben, Rahmen) **prozesskonform und hochqualitativ** produzieren kann.

**Zentrale Prueffrage:** "Gibt es Stellen, an denen der Agent in der Produktion stocken, falsch abbiegen oder mehrdeutige Entscheidungen treffen wuerde — weil die Dokumentation lueckenhaft, widerspruchlich oder mehrdeutig ist?"

---

## 2. Pflichtlektuere (in dieser Reihenfolge)

### Tier 1: Kanonische Steuerungsdokumente (muessen komplett gelesen werden)

1. `docs/architektur/WORKFLOW_v4.md` — Kanonische Phasenstruktur, Schnittstellen-Vertraege, Dispatch-Ablaeufe
2. `docs/agents/ORCHESTRATOR.md` — Gesamtkoordination, Phasenflowchart, Ausfuehrungsorte, Mappe-Anhang-Prozedur
3. `docs/agents/AGENT_MATERIAL.md` — Material-Orchestrator (Design + Produktion)
4. `docs/agents/AGENT_RAETSEL.md` — Aufgaben-Orchestrator (Progressionsplan + Dispatch + Cross-Konsistenz)

### Tier 2: Subagenten (Stichproben reichen — je 1 Material- und 1 Aufgaben-Subagent)

5. `docs/agents/SUB_MATERIAL_DARSTELLUNGSTEXT.md` — Material-Subagent (meistverwendeter Typ)
6. `docs/agents/SUB_AUFGABE_FREITEXT.md` — Aufgaben-Subagent (kuerzlich geaendert: _meta-Migration + Keyword-Regel)

### Tier 3: Qualitaetskriterien (ueberfliegen)

7. `docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md` — M1-M12 + typ-spezifisch
8. `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md` — A1-A15

### Tier 4: Kontext (bei Bedarf nachschlagen)

9. `docs/architektur/UPGRADE_PLAN_v4_PRODUKTIONSARCHITEKTUR.md` — Problem, Entscheidungen, Implementierungsplan
10. `docs/projekt/STATUS.md` — Aktueller Projektstand

---

## 3. Pruefachsen

### A1: Dispatch-Vollstaendigkeit

Fuer jeden der 15 Dispatches (1 Rahmen, 6 Material, 1 Cross-Konsistenz, 1 Progressionsplan, 5 Aufgaben, 1 Aufgaben-Cross-Konsistenz): Ist der Schnittstellen-Vertrag in WORKFLOW_v4.md vollstaendig genug, dass ein Agent ihn ausfuehren kann?

- Sind alle Read-Schritte dokumentiert?
- Ist der Output-Kontrakt eindeutig (welche Datei, welches Format)?
- Gibt es implizite Voraussetzungen, die nicht dokumentiert sind?

### A2: Agent-Prompt-Konsistenz

Stimmen die Agenten-Prompts (ORCHESTRATOR, AGENT_MATERIAL, AGENT_RAETSEL, SUB_*) mit WORKFLOW_v4 ueberein?

- Referenzieren sie dieselben Dateien/Felder?
- Sind Ausfuehrungsorte konsistent (alles Phase 2 = Cowork)?
- Gibt es Widersprueche zwischen Agent-Prompt und Workflow?

### A3: Datenfluss-Luecken

Verfolge den Datenfluss von Phase 0 (Skript) bis Phase 2.2c (Aufgaben-Cross-Konsistenz):

- Gibt es ein Artefakt, das als Input referenziert wird, aber von keinem vorherigen Schritt produziert wird?
- Gibt es einen Output, den kein Folgeschritt liest?
- Sind die Dateipfade im Produktionsverzeichnis konsistent?

### A4: Mehrdeutigkeiten und Entscheidungsluecken

- Gibt es Stellen, an denen der Agent eine Entscheidung treffen muss, die nicht durch die Dokumentation bestimmt ist?
- Gibt es Formulierungen, die unterschiedlich interpretiert werden koennten?
- Sind die konditionalen Reads (Schritte 7+8 in Phase 2.1) praezise genug formuliert?

### A5: Q-Gate-Operationalisierung

- Sind die Q-Gate-Kriterien fuer jeden Dispatch hinreichend operationalisiert?
- Kann ein Agent PASS/FAIL eindeutig bestimmen?
- Ist der Ruecklauf-Mechanismus (FAIL → Nachbesserung → erneut Q-Gate → Finding) in allen Dispatches gleich formuliert?

### A6: Compaction-Resilienz

- Wenn nach Material 3 Compaction stattfindet: Sind die Schritte 1-8 von Material 4 tatsaechlich selbsttragend (P1)?
- Gibt es implizite Kontext-Abhaengigkeiten, die trotz P1 bestehen?

### A7: Engine-Kompatibilitaet

- Stimmen die JSON-Schemata in den Subagenten mit den Engine-Erwartungen ueberein?
- Ist die Freitext-loesung (Keyword 3-5 Woerter) kompatibel mit dem Engine-Validierungsmechanismus?
- Sind die Loesungs-Typen-Tabellen in ORCHESTRATOR und AGENT_RAETSEL konsistent?

---

## 4. Bekannte Einschraenkungen (keine Findings erwuenscht)

- `quellenangaben[]` hat keinen Engine-Support (Workaround: cite-Einbettung in Material-HTML)
- Flowcharts (mermaid) sind veraltet — kein produktionsrelevantes Artefakt
- Revert von c9eb9ec steht aus — wird in Phase-3-Pre-Flight erledigt
- Engine-Patch `text_mit_luecken || frage` ist vorbereitet, aber noch nicht ausgefuehrt — wird in Runde 4 angewendet

---

## 5. Erwartetes Ergebnis

Pro Pruefachse (A1-A7):
- **PASS:** Keine produktionsrelevanten Luecken gefunden
- **FINDING:** Konkretes Problem mit Dateipfad, Zeile/Abschnitt, und Korrekturvorschlag
- **WARNUNG:** Nicht-kritische Beobachtung, die die Produktion nicht blockiert

Priorisierung:
- **BLOCKER:** Produktion wuerde scheitern oder falsche Ergebnisse liefern
- **HIGH:** Produktion funktioniert, aber Qualitaet waere beeintraechtigt
- **MEDIUM:** Verbesserungspotential, kein unmittelbarer Produktionseinfluss

---

## 6. Meta-Frage

Wuerdest du als Claude-Agent, der WORKFLOW_v4.md + ORCHESTRATOR.md + AGENT_MATERIAL.md + AGENT_RAETSEL.md liest, **wissen, was du in jedem Schritt tun musst** — ohne Rueckfragen an den User stellen zu muessen?
