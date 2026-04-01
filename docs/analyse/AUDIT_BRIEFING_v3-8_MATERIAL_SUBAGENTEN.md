# Audit-Briefing v3.8: Material-Subagenten-Architektur + Qualitaetsoptimierung

**Datum:** 2026-03-29
**Auditor:** Externer Reviewer (Claude-Instanz, separater Kontext)
**Auftraggeber:** Lehrkraft (Paul), Cowork-Session
**Scope:** UPGRADE_PLAN v3.8 — Material-Subagenten-Extraktion (C0) + Qualitaetsaenderungen (C1-C5) + UI-Optimierungen (U1-U4)

---

## 1. Pruefauftrag

Evaluiere die geplante Phase v3.8 auf Konsistenz, Vollstaendigkeit und architektonische Korrektheit. Besonderer Fokus auf drei Fragestellungen:

### Fragestellung A: Grenzziehung Orchestrator ↔ Subagenten

AGENT_MATERIAL.md hat — anders als AGENT_RAETSEL.md (v3.7) — zwei Modi:

- **Design-Modus (Phase 1, Cowork):** Tafelbild-Abdeckung, Material-Entwurf, Sequenzierung, Erarbeitbarkeits-Nachweis, Blueprint
- **Produktions-Modus (Phase 2, Claude Code):** Materialien ausarbeiten, HTML-Fragmente, JSON-Output

Die geplante Extraktion (C0) soll die Produktions-Workflows (W-1 bis W-7) in Subagenten auslagern. Der Design-Modus bleibt im Orchestrator.

**Prueffragen:**
- Ist die Grenzziehung Design/Produktion sauber? Gibt es Informationen, die ein Subagent fuer die Produktion braucht, die aber nur im Design-Modus verfuegbar sind?
- Reicht der vorgeschlagene Produktionskontext (Material-ID, Typ, TB-Knoten, Artefakt-Ref, Sequenzkontext, Stundenfrage, Wortbudget) als Input fuer jeden Subagenten?
- Braucht der Subagent Zugriff auf das SKRIPT (Volltext-Passage)? Wenn ja: Wie wird der Token-Bedarf gemanagt (analog zum Token-Management bei Aufgaben-Subagenten)?

### Fragestellung B: Tool-Chain-Verankerung

Die 7 geplanten Material-Subagenten haben heterogene Tool-Chains:

| Subagent | Tool-Chain |
|----------|-----------|
| SUB_MATERIAL_DARSTELLUNGSTEXT | Agent-intern (kein MCP) |
| SUB_MATERIAL_QUELLENTEXT | markdownify, WebSearch |
| SUB_MATERIAL_BILDQUELLE | wikimedia, rijksmuseum, Canva |
| SUB_MATERIAL_KARTE | wikimedia, Canva, excalidraw |
| SUB_MATERIAL_ZEITLEISTE | Engine-JSON, Mermaid, excalidraw |
| SUB_MATERIAL_STATISTIK | QuickChart, Engine-JSON, Canva |
| SUB_MATERIAL_TAGEBUCH | Agent-intern (kein MCP) |

**Prueffragen:**
- Gehoert die Tool-Chain-Logik (Pfad A/B/C-Entscheidungen) in den Subagenten oder in den Orchestrator?
- Wenn im Subagenten: Der Subagent-Prompt wird sehr lang (Tool-Referenzen + Workflow-Schritte + Qualitaetskriterien). Ist das ein Problem fuer die Claude-Code-Ausfuehrung?
- Der uebergreifende Quellenrecherche-Workflow (aktuell in AGENT_MATERIAL.md) wird von 4 Subagenten benoetigt (QT, BQ, KA, ST). Duplizierung in jeden Subagenten? Shared-Referenz im Orchestrator? Eigenes Modul?

### Fragestellung C: Ausfuehrungsort und Prozessdesign

Der WORKFLOW_v2.md (Abschnitt 7, Phase 2.1) beschreibt die Material-Subagenten als **Claude-Code-Dispatch**: Der Uebergabe-Prompt referenziert die Subagenten-Prompts und orchestriert den Ablauf. Die Prompt-Definitionen liegen in Cowork-Domaene (docs/agents/).

**Prueffragen:**
- Ist dieses Modell (Prompts in Cowork, Ausfuehrung in Claude Code) das sinnvollste? Oder waere eine Verankerung der Subagenten als qualifizierte Claude-Code-Prompts (z.B. als Skills oder inline im Uebergabe-Prompt) effizienter?
- Wie sieht der optimale Prozess pro Game/Mappe aus? Aktuell: Cowork definiert Prompts → User erstellt Uebergabe-Prompt → Claude Code fuehrt aus. Gibt es einen intelligenteren Workflow (z.B. Cowork generiert den Uebergabe-Prompt automatisch)?
- Lohnt sich eine weitere Aufteilung von Phase 2.1 in Sub-Phasen (analog zu Phase 2.2a/b/c bei Aufgaben)?

---

## 2. Pflichtlektuere (Lesereihenfolge)

Der Auditor MUSS die folgenden Dokumente lesen, bevor er die Prueffragen beantwortet. Die Reihenfolge ist optimiert fuer Kontextaufbau:

### Schritt 1: Architektur-Ueberblick

| # | Dokument | Relevanz | Lesehinweis |
|---|----------|----------|-------------|
| 1 | `docs/architektur/WORKFLOW_v2.md` — Sektionen 1-3 (Phasenueberblick, Learnings, Ueberblicksblock) | Gesamtprozess verstehen | Gibt den End-to-End-Ablauf: Phase 0 (Inhalt) → Phase 1 (Design) → Phase 2 (Produktion) → Phase 3 (Deployment) |
| 2 | `docs/agents/ORCHESTRATOR.md` | Agentenkoordination | Zeigt, wie die Agenten zusammenarbeiten und welche Phasen sie verantworten |

### Schritt 2: Status quo AGENT_MATERIAL (der Monolith)

| # | Dokument | Relevanz | Lesehinweis |
|---|----------|----------|-------------|
| 3 | `docs/agents/AGENT_MATERIAL.md` — KOMPLETT | Der zu refaktorisierende Monolith | Zwei Modi (Design/Produktion), 7 Workflows (W-1 bis W-7), Qualitaetsspezifikationen, Tool-Chains. HIER liegt die gesamte Logik, die extrahiert werden soll |
| 4 | `docs/architektur/WORKFLOW_v2.md` — Sektion 7, Phase 2.1 | Material-Subagenten-Dispatch im Workflow | ACHTUNG: Referenziert bereits 5 Subagenten (AGENT_SUB_*) die NICHT existieren. Namenskonvention weicht vom UPGRADE_PLAN ab (AGENT_SUB_* vs. SUB_MATERIAL_*). Dispatch-Ablauf und Engine-Typ-Mapping sind hier definiert |

### Schritt 3: v3.7-Referenz (bewiesenes Pattern)

| # | Dokument | Relevanz | Lesehinweis |
|---|----------|----------|-------------|
| 5 | `docs/architektur/UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md` — Phase v3.7 | Aufgaben-Subagenten-Architektur als Vorlage | Zeigt das Pattern: Orchestrator + 5 Subagenten + Konstruktionskontext + Q-Gate-Split + Ruecklauf. Dieses Pattern soll auf Material-Agenten uebertragen werden |
| 6 | `docs/agents/AGENT_RAETSEL.md` — Sektionen 1-4 (Rolle, Eingabe, Orchestrator-Logik) | Orchestrator nach v3.7-Refactoring | Referenzimplementierung: Wie sieht ein refaktorierter Orchestrator aus? |
| 7 | `docs/agents/SUB_AUFGABE_MC.md` ODER `docs/agents/SUB_AUFGABE_ZUORDNUNG.md` | Subagent-Referenzstruktur | 1 Beispiel reicht: Rolle, Konstruktionsheuristiken, Guetekriterien, Rendering-Kontrakt, Beispiel |

### Schritt 4: v3.8 UPGRADE_PLAN (Pruefgegenstand)

| # | Dokument | Relevanz | Lesehinweis |
|---|----------|----------|-------------|
| 8 | `docs/architektur/UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md` — Phase v3.8 | DER PRUEFGEGENSTAND | C0 (Subagenten-Extraktion) + C1-C5 (Qualitaet) + U1-U4 (UI). Produktionskontext-Template, Implementierungsreihenfolge, Verifikationspunkte |
| 9 | `docs/analyse/Updates Materialien und UI.md` | Originale Aenderungswuensche des Users | Die Rohquelle fuer C1-C5 und U1-U4. Pruefen: Wurden alle Wuensche korrekt in den UPGRADE_PLAN uebernommen? |

### Schritt 5: Kontext-Dokumente (bei Bedarf)

| # | Dokument | Relevanz | Wann lesen? |
|---|----------|----------|-------------|
| 10 | `docs/architektur/WORKFLOW_v2.md` — Sektion 5 (MATERIAL_GERUEST-Template) | Blueprint-Format | Wenn unklar ist, was der Orchestrator als Design-Output produziert |
| 11 | `docs/checklisten/GUETEKRITERIEN_SEQUENZIERUNG.md` | S1-S15 Sequenzierungs-Q-Gate | Wenn unklar ist, wie die Sequenzierung qualitaetsgesichert wird |
| 12 | `docs/agents/AGENT_TECHNIK.md` | Engine-Spezifikation | Wenn unklar ist, welche Materialtypen die Engine nativ rendert |
| 13 | `docs/agents/AGENT_SKRIPT.md` | Skript als Primaerquelle | Wenn unklar ist, woher die Material-Subagenten ihre Textgrundlage beziehen |

---

## 3. Bekannte Inkonsistenzen (bereits identifiziert, Audit soll bewerten)

### I-1: Namenskonvention

| Quelle | Namenskonvention | Beispiel |
|--------|-----------------|---------|
| WORKFLOW_v2.md (Phase 2.1, Referenztabelle) | `AGENT_SUB_[TYP].md` | `AGENT_SUB_DARSTELLUNGSTEXT.md` |
| UPGRADE_PLAN v3.8 (C0) | `SUB_MATERIAL_[TYP].md` | `SUB_MATERIAL_DARSTELLUNGSTEXT.md` |
| SUB_AUFGABE_*.md (v3.7, Vergleich) | `SUB_AUFGABE_[TYP].md` | `SUB_AUFGABE_MC.md` |

Frage: Welche Konvention soll gelten? Konsistenz mit v3.7 spricht fuer `SUB_MATERIAL_*`. Der WORKFLOW muesste dann angepasst werden.

### I-2: Subagenten-Anzahl

| Quelle | Anzahl | Subagenten |
|--------|--------|-----------|
| WORKFLOW_v2.md Phase 2.1 | 5 | DT, QT, TB, ZL, BQ (Karte = Teil von BQ, Statistik fehlt) |
| UPGRADE_PLAN v3.8 | 7 | DT, QT, BQ, KA, ZL, ST, TB (Karte und Statistik eigene Subagenten) |
| AGENT_MATERIAL.md W-*-Workflows | 7+1 | W-1 bis W-7 + W-8 (Tafelbild, aber das ist AGENT_TAFELBILD) |
| Engine-Typ-Mapping (WORKFLOW) | karte → `bildquelle`, tagebuch → `quellentext` | Zwei Typen die intern auf andere Typen gemappt werden |

Frage: Brauchen Karte und Statistik eigene Subagenten, oder reichen 5 (mit Karte als Variante von Bildquelle)? Das Engine-Typ-Mapping (karte → bildquelle) deutet darauf hin, dass die Engine keinen Unterschied kennt — aber die Produktion ist voellig anders (historische Karten vs. Fotos).

### I-3: Tafelbild-Workflow (W-8)

AGENT_MATERIAL.md enthaelt W-8 (Tafelbild-Workflow), aber Tafelbilder werden seit v3 von AGENT_TAFELBILD (Phase 0.4) erstellt. W-8 in AGENT_MATERIAL ist ein Residuum aus v1. Der UPGRADE_PLAN listet keinen SUB_MATERIAL_TAFELBILD.

Frage: Soll W-8 bei der Extraktion entfernt werden? Oder gibt es noch einen legitimen Anwendungsfall?

### I-4: Ausfuehrungsort-Diskrepanz

| Aspekt | WORKFLOW_v2.md | UPGRADE_PLAN v3.8 |
|--------|---------------|-------------------|
| Subagenten-Ausfuehrung | Claude Code (explizit) | "Cowork" (in Domaenenzugehoerigkeit) |

WORKFLOW_v2.md Zeile 668: "Claude Code. Der Uebergabe-Prompt referenziert die Subagenten-Prompts und orchestriert den Dispatch-Ablauf." UPGRADE_PLAN v3.8 listet alle SUB_MATERIAL_*.md als "Cowork"-Owner. Das ist KEIN Widerspruch (Owner der Prompt-Datei ≠ Ausfuehrungsort), aber die Formulierung ist mehrdeutig.

---

## 4. Kontext: Was bisher funktioniert

### 4.1 Mappe-1-Deployment (bewiesener Prozess)

Die erste Mappe (gpg-erster-weltkrieg-ursachen) wurde erfolgreich deployed (Commit 5153466). Der Prozess:

1. **Cowork:** AGENT_DIDAKTIK → AGENT_INHALT → AGENT_SKRIPT → AGENT_TAFELBILD → AGENT_MATERIAL (Design) → User-Validierung
2. **Claude Code (Uebergabe-Prompt):** AGENT_MATERIAL (Produktion) mit impliziten Subagenten → AGENT_RAETSEL → Assembly → data.json → Browser-Check
3. **Post-Deployment:** 4 Bugfix-Runden (v3.5b-d), Layout-Redesign (v3.5)

### 4.2 v2.1 Learnings (relevant fuer Audit)

Aus dem Mappe-1-Deployment stammen 7 Learnings (WORKFLOW_v2.md Sektion 1b), die fuer die Subagenten-Architektur direkt relevant sind:

- **L2:** Q-Gate-Log als Pflicht-Output pro Material
- **L3:** Subagenten als separate Iterationen (nicht im Gesamtkontext)
- **L4:** ARTEFAKT_INVENTAR als Pflicht-Input vor Subagenten
- **L5:** JSON-Encoding-Regeln in spezifischen Subagenten
- **L7:** Parallele Subagenten erlaubt, Q-Gate trotzdem pro Material

Diese Learnings muessen in den neuen SUB_MATERIAL_*.md-Dateien erhalten bleiben.

### 4.3 v3.7 Aufgaben-Subagenten (bewiesenes Pattern)

Die Aufgaben-Subagenten-Architektur (v3.7) ist vollstaendig implementiert:
- AGENT_RAETSEL.md: Refaktoriert zu Orchestrator
- 5 SUB_AUFGABE_*.md: MC, Zuordnung, Lueckentext, Reihenfolge, Freitext
- Konstruktionskontext als Eingabe pro Subagent
- Q-Gate-Split: Orchestrator (Cross-Konsistenz) + Subagent (Einzelaufgabe)
- Ruecklauf-Mechanismus: Max. 2 Re-Dispatch

Dieses Pattern funktioniert konzeptionell (noch kein Testlauf mit neuer Architektur). Die Material-Subagenten sollen dasselbe Pattern anwenden.

---

## 5. Erwarteter Audit-Output

### Format

Ein strukturierter Report mit:

1. **Findings** (nummeriert, priorisiert: HIGH / MEDIUM / LOW)
   - Jedes Finding: Beschreibung, betroffene Artefakte, Empfehlung
2. **Bewertung der bekannten Inkonsistenzen** (I-1 bis I-4): Empfehlung pro Inkonsistenz
3. **Antworten auf die drei Fragestellungen** (A, B, C): Jeweils mit Begruendung und konkreter Empfehlung
4. **Architektur-Empfehlung:** Sollen die Material-Subagenten als Cowork-Prompts (docs/agents/) oder als qualifizierte Claude-Code-Artefakte (z.B. inline im Uebergabe-Prompt, als Skills, oder als separate Prompt-Dateien im Repo) verankert werden? Was ist der intelligenteste Prozess fuer die Erstellung eines neuen Games/einer neuen Mappe?

### Bewertungskriterien

- **Konsistenz:** Stimmen UPGRADE_PLAN, WORKFLOW, AGENT_MATERIAL und existierende Subagenten-Referenzen ueberein?
- **Vollstaendigkeit:** Sind alle relevanten Aspekte adressiert? Fehlen Artefakte, Verifikationspunkte, Abhaengigkeiten?
- **Praktikabilitaet:** Ist der vorgeschlagene Prozess realistisch fuer einen Solo-Entwickler (Lehrkraft) mit Cowork + Claude Code?
- **Bewahrung bestehender Qualitaet:** Gehen durch die Extraktion v2.1-Learnings oder bestehende Qualitaetskriterien verloren?
- **Erweiterbarkeit:** Koennen neue Materialtypen (z.B. Audioquelle, interaktives Diagramm) modular ergaenzt werden?

---

## 6. Scope-Grenzen

Der Auditor prueft NUR die Architektur- und Planungsebene. Er implementiert NICHT:
- Keine SUB_MATERIAL_*.md-Dateien erstellen
- Kein AGENT_MATERIAL.md refaktorieren
- Keine Code-Aenderungen
- Keine WORKFLOW_v2.md-Edits

Der Auditor darf aber konkrete Textvorschlaege fuer Korrekturen machen (z.B. "Zeile X in UPGRADE_PLAN sollte Y heissen").
