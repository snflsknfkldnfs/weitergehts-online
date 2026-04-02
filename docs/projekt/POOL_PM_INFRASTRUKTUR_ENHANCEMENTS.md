# Pool: PM-Infrastruktur Enhancements

**Erstellt:** 2026-04-02
**Aktualisiert:** 2026-04-02 (Katalog + Architektur + Funktionstest + Plugin-Verifikation)
**Quelle:** github.com/wshobson/agents — Claude Code Plugin Marketplace (71 Plugins, 112 Agents, 129 Skills, 16 Workflow-Orchestratoren)
**Zweck:** Evaluierungspool fuer Patterns und Werkzeuge, die das Projektmanagement oder die Produktentwicklung von weitergehts.online verbessern koennten.
**Status:** POOL — Nichts davon ist entschieden. Jeder Eintrag braucht Evaluation gegen unseren konkreten Bedarf.

### Verifizierte Plattform-Faehigkeiten (2026-04-02)

| Faehigkeit | Status | Evidenz |
|---|---|---|
| CC-Plugins in Cowork installierbar | VERIFIZIERT | agent-teams + agent-orchestration aus wshobson/agents erfolgreich geladen |
| Subagenten spawnen in Cowork | VERIFIZIERT | 3 parallele team-reviewer Agents auf mat-2-1.json, alle lieferten strukturierte Ergebnisse |
| Subagenten Dateisystem-Zugriff | VERIFIZIERT | Subagent las mat-2-1.json per absolutem Pfad, lieferte titel/typ/12 Keys korrekt |
| Slash-Commands in Cowork | VERIFIZIERT | agent-teams Skills als Slash-Commands aufrufbar |
| Model-Tiering in Cowork | VERIFIZIERT | Agent mit model:"haiku" gestartet, identifizierte sich als Haiku 4.5, las STATUS.md korrekt |
| Plugin-Build in Cowork | VERFUEGBAR | cowork-plugin-management:create-cowork-plugin Skill vorhanden |

---

## Kontext: Unser Ist-Zustand

- Monolithischer Skill (~22 KB) steuert PM-Sessions
- 6 Vertraege (deklarativ, manuell gelesen)
- STATUS.md + CHANGELOG.md als manuell gepflegte Zustandsmaschine
- Session-Splits via Uebergabe-Prompts (manuell formuliert)
- Q-Gates als Textbausteine in Vertraegen (manuell geprueft)
- UPGRADE_PLAN_v5 skizziert Plugin-Architektur, aber E1-E5 offen

---

## P1: Dispatcher-Pattern (Conductor-Plugin)

**Was:** Ein Dispatcher-Skill, der bei Session-Start automatisch STATUS.md liest, die aktuelle Phase identifiziert und den passenden Vertrag/Skill laedt. Statt monolithischem Skill, der alles enthaelt.

**Referenz-Implementierung:** `plugins/conductor/` — Context-Driven Development. Artefakte: `conductor/product.md` (Vision), `conductor/tracks/` (Feature-Tracks mit spec.md + plan.md), `conductor/workflow.md`. Slash-Commands: `/conductor:setup`, `/conductor:status`, `/conductor:new-track`.

**Relevanz fuer uns:** Direkt — das ist im Kern was UPGRADE_PLAN_v5 mit dem "Dispatcher-Skill" beschreibt. Conductor zeigt eine funktionierende Implementierung des Patterns "persistenter Kontext + automatische Phasen-Identifikation".

**Delta zu v5-Plan:** Conductor nutzt Track-basierte Arbeitspakete statt Phasen-basierter Vertraege. Unser Modell (Mappen als sequentielle Arbeitseinheiten mit Phase-0 bis Phase-4) ist spezifischer. Uebernahme muesste adaptiert werden.

**Conductor-Skills (3):** `context-driven-development` (Methodik mit Produktkontext + Phasenplanung), `track-management` (Features/Bugs/Chores als Tracks mit spec.md + plan.md), `workflow-patterns` (TDD, Commit-Strategien, Verifikations-Checkpoints). Slash-Commands: `/conductor:setup` (Greenfield/Brownfield-Erkennung), `/conductor:new-track`, `/conductor:implement`, `/conductor:status`, `/conductor:revert` (semantischer Git-Revert auf Track/Phase/Task-Ebene), `/conductor:manage`.

**Evaluationsfrage:** Lohnt sich die Conductor-Architektur als Vorlage fuer den Dispatcher, oder ist unser Phasen-Modell so spezifisch, dass wir von Grund auf bauen?

---

## P2: State-File-Pattern (state.json)

**Was:** Maschinenlesbarer Zustand als JSON-Datei statt Freitext-Markdown. Ermoeglicht automatisches Routing und Resume nach Session-Abbruch.

**Referenz-Implementierung:** `plugins/full-stack-orchestration/` nutzt `.full-stack-feature/state.json`:
```json
{
  "feature": "...",
  "status": "in_progress|complete",
  "current_step": 1-9,
  "current_phase": 1-3,
  "completed_steps": [],
  "files_created": [],
  "started_at": "ISO_TIMESTAMP",
  "last_updated": "ISO_TIMESTAMP"
}
```

**Relevanz fuer uns:** Hoch. Entspricht E5 aus UPGRADE_PLAN_v5 (YAML-Frontmatter in STATUS.md). Die JSON-Variante ist praeziser als YAML-Frontmatter, aber weniger menschenlesbar. Hybrid-Ansatz (YAML-Frontmatter + Freitext) bleibt unsere bessere Option, da STATUS.md auch manuell gepflegt wird.

**Evaluationsfrage:** YAML-Frontmatter (v5-Plan) vs. separates state.json vs. Hybrid? state.json waere sauberer fuer Automatisierung, aber ein zusaetzliches Artefakt.

---

## P3: Checkpoint-Pattern mit User-Approval

**Was:** Explizite Checkpoints in der Workflow-Sequenz, an denen der Prozess stoppt und auf User-Bestaetigung wartet. Optionen: Approve / Request Changes / Pause.

**Referenz-Implementierung:** Full-Stack Orchestration hat 2 Checkpoints in einem 9-Schritt-Workflow. Checkpoint 1 nach Architektur-Design, Checkpoint 2 nach Testing. Bei Critical/High Findings: Weiterarbeit blockiert bis adressiert.

**Relevanz fuer uns:** Haben wir bereits konzeptionell (User-Validierung PFLICHT/EMPFOHLEN in UPGRADE_PLAN_v4 Phasenstruktur). Aber nicht formalisiert als Skill-Mechanismus. Ein Checkpoint-Pattern als wiederverwendbarer Baustein im Plugin koennte die Uebergabe-Prompts standardisieren.

**Evaluationsfrage:** Formalisieren wir unsere bestehenden User-Validierungspunkte als Checkpoint-Skill, oder bleibt das Prosa in den Vertraegen?

---

## P4: Subagent-Dispatch fuer Produktion

**Was:** Ein Orchestrator-Skill spawnt Subagenten (via Agent-Tool) fuer isolierte Arbeitsschritte.

**Referenz-Implementierung:** Full-Stack Orchestration dispatcht Subagenten pro Phase (DB-Design, Backend, Frontend, Testing). Unterstuetzt Parallelisierung (Testing + Security + Performance gleichzeitig).

**Relevanz fuer uns:** Direkt relevant fuer Phase 2.1 Material-Produktion. Aktuell: 1 Dispatch pro Material in Cowork, manuell sequenziert. Mit Subagent-Dispatch koennte der Phasen-Skill automatisch pro Material einen Subagenten spawnen. Entspricht E2 aus UPGRADE_PLAN_v5.

**Einschraenkung:** Subagent-Spawning funktioniert (verifiziert 2026-04-02). Dateisystem-Zugriff der Subagenten noch OFFEN — Funktionstest nutzte Inline-Daten. Falls Dateisystem-Zugriff funktioniert: Dispatch-Pattern ist direkt umsetzbar.

**Evaluationsfrage:** Haben Subagenten Lesezugriff auf das gemountete Repo? Folgetest: Subagent per Dateipfad auf mat-2-2.json loslassen, ohne Inline-Daten.

---

## P5: PluginEval — Qualitaetssicherung fuer Skills/Plugins

**Was:** 3-Schicht-Evaluationsframework fuer Plugin-Qualitaet. Schicht 1: Statische Analyse (Struktur, Frontmatter, Anti-Patterns). Schicht 2: LLM-Judge (semantische Bewertung). Schicht 3: Monte-Carlo-Simulation (statistische Zuverlaessigkeit).

**10 Qualitaetsdimensionen** (gewichtet): Trigger-Genauigkeit (25%), Orchestrierungs-Fitness (20%), Output-Qualitaet (15%), Scope-Kalibrierung (12%), Progressive Disclosure (10%), Token-Effizienz (6%), Robustheit (5%), Strukturelle Vollstaendigkeit (3%), Code-Template-Qualitaet (2%), Oekosystem-Kohaerenz (2%).

**Anti-Pattern-Erkennung:** OVER_CONSTRAINED (>15 MUST/ALWAYS/NEVER), BLOATED_SKILL (>800 Zeilen), ORPHAN_REFERENCE, DEAD_CROSS_REF.

**Relevanz fuer uns:** Mittel-hoch. Unser monolithischer Skill ist ~22 KB und wuerde definitiv BLOATED_SKILL triggern. Wenn wir auf Plugin-Architektur umstellen (v5), waere ein Evaluationsframework nützlich, um Skill-Qualitaet zu messen. Auch fuer die bestehenden Subagenten-Prompts (SUB_MATERIAL_*, SUB_AUFGABE_*) anwendbar.

**Evaluationsfrage:** PluginEval als externes Tool nutzen, oder relevante Dimensionen in unsere bestehenden GUETEKRITERIEN integrieren?

---

## P6: Progressive Disclosure fuer Skills

**Was:** 3-Stufen-Content-Architektur: (1) Metadata/Frontmatter — immer geladen, (2) Instructions — bei Aktivierung geladen, (3) Resources/Templates — on demand.

**Referenz-Implementierung:** Alle 146 Skills im Repo folgen diesem Pattern. YAML-Frontmatter mit `name`, `description`, Aktivierungskriterien. Dann strukturierter Inhalt mit klarer Trennung.

**Relevanz fuer uns:** Hoch fuer Token-Effizienz. Unser monolithischer Skill laedt ~22 KB bei jeder Session. Progressive Disclosure wuerde bedeuten: Dispatcher laedt nur Frontmatter aller Phasen-Skills (~500 Token), aktiviert dann nur den relevanten (~2000-3000 Token). Geschaetzte Einsparung: 70-80% pro Session.

**Evaluationsfrage:** Ist das identisch mit der Vertrags-Extraktion aus v4 (6 Vertraege statt 1 WORKFLOW)? Oder geht Progressive Disclosure einen Schritt weiter (Frontmatter als Routing-Ebene)?

---

## P7: Team-Pattern fuer Audits [VERIFIZIERT — funktional in Cowork]

**Was:** Mehrere spezialisierte Agenten arbeiten parallel am selben Artefakt (z.B. 3 Reviewer mit unterschiedlichen Dimensionen).

**Referenz-Implementierung:** `plugins/agent-teams/` — Installiert in Cowork. Verfuegbare Skills: team-spawn, team-review, team-debug, team-feature, team-delegate, team-status, team-shutdown + 5 Wissens-Skills (multi-reviewer-patterns, team-communication-protocols, team-composition-patterns, task-coordination-strategies, parallel-feature-development).

**Funktionstest (2026-04-02):** 3 parallele team-reviewer Subagenten auf mat-2-1.json (Mappe 2, Darstellungstext). Dimensionen: Fachdidaktik (gegen GUETEKRITERIEN M1-M10), Engine-Kompatibilitaet (gegen JSON-Schema), Sprachqualitaet (Satzlaenge, Fachbegriffe, Register).

**Testergebnis:**
- Alle 3 Agenten lieferten strukturierte Befundlisten (Schweregrad, Evidenz, Empfehlung)
- Befunde ueberlappen sinnvoll: Satzlaenge unabhaengig von 2 Dimensionen geflaggt (erhoehte Konfidenz)
- Engine-Reviewer: PASS, 2 INFO-Befunde (cite-Tag-Platzierung, redundante Quellenangabe)
- Fachdidaktik-Reviewer: 1 HIGH (Satzlaenge), 4 MEDIUM (Multiperspektivitaet, Pulverfass-Distanzierung, Aktivierung, Fachbegriff-Erklaerung), 1 LOW (Quellenangabe)
- Sprach-Reviewer: 1 HIGH (4 statt 3 Fachbegriffe), 1 MEDIUM (Satzlaenge Borderline), 1 LOW (emotionale Faerbung)
- Daten wurden inline uebergeben, nicht via Dateipfad. Dateisystem-Zugriff der Subagenten noch OFFEN.

**Relevanz fuer uns:** HOCH — direkt einsetzbar fuer Q-Gate-Audits in Phase 2.1 und 2.2. Breitere Abdeckung als ein einzelner Audit-Durchlauf. Empfohlene Dimensionen fuer Escape-Game-Materialien:
1. Fachdidaktik (M1-M12 + typ-spezifisch)
2. Engine-Kompatibilitaet (JSON-Schema, HTML-Tags, Feldtypen)
3. Sprachqualitaet/Adressatengemaessheit (Satzlaenge, Fachbegriffe, Register, Vergegenwaertigung)

**Naechster Schritt:** Folgetest mit Dateipfad statt Inline-Daten (klaert Subagent-Dateisystem-Zugriff). Dann: Integration in Phase-2.1-Vertrag als optionalen Q-Gate-Modus.

---

## P8: Git-Aware Revert (Conductor)

**Was:** Semantischer Revert auf Track/Phase/Task-Ebene. System findet automatisch die relevanten Commits fuer einen Revert.

**Referenz-Implementierung:** Conductor erkennt Git-Commits pro Track und ermoeglicht granularen Revert: ganzer Track, einzelne Phase, einzelner Task.

**Relevanz fuer uns:** Niedrig-mittel. Wir haben bereits granulare Artefakte (.json pro Material/Aufgabe), die einzeln revertierbar sind. Aber: ein automatischer Revert-Mechanismus fuer "Mappe N zuruecksetzen auf Phase X" waere bei Produktionsfehlern nuetzlich.

**Evaluationsfrage:** Brauchen wir das, oder reicht manuelles git revert wie bisher?

---

## P9: Architecture Decision Records (ADR)

**Was:** Formalisiertes Format fuer Architektur-Entscheidungen mit Kontext, Optionen, Entscheidung, Konsequenzen. Automatisierte Generierung aus Commit-History.

**Referenz-Implementierung:** `plugins/documentation-generation/skills/architecture-decision-records/` — "Write ADRs documenting architectural decisions and trade-offs." Teil des Documentation-Generation-Plugins.

**Relevanz fuer uns:** Mittel. Wir haben bereits informelle Architektur-Entscheidungen in STATUS.md (z.B. "Architektur-Entscheidung: Prozessredesign v1 → v2") und UPGRADE_PLAN-Dokumenten. Ein formalisiertes ADR-Format wuerde diese strukturieren: ADR-001 Vertrags-Extraktion, ADR-002 Hefteintrag-Umbenennung, ADR-003 Zwei-Stufen-FREEZE, etc. Erleichtert Nachvollziehbarkeit bei wachsender Dokumentationstiefe.

**Evaluationsfrage:** Lohnt sich die Umstellung auf ADR-Format, oder reicht die aktuelle Praxis (Entscheidungen in STATUS.md + UPGRADE_PLAN)?

---

## P10: Changelog-Automatisierung

**Was:** Automatische CHANGELOG-Generierung aus Conventional Commits.

**Referenz-Implementierung:** `plugins/documentation-generation/skills/changelog-automation/` — "Automate changelog generation from conventional commits."

**Relevanz fuer uns:** Niedrig-mittel. Unser CHANGELOG.md ist deutlich detaillierter als konventionelle Changelogs (Phasen, Artefakte, Querverweise). Automatisierung wuerde die Granularitaet verlieren. Aber: ein Hybrid waere denkbar — automatisch generierter Git-Changelog als Basis, manuell angereichert mit PM-Kontext.

**Evaluationsfrage:** Bringt das einen Zeitgewinn, oder ist unser manueller CHANGELOG inhaltlich so spezifisch, dass Automatisierung mehr Arbeit als Nutzen erzeugt?

---

## P11: Architektur-Prinzipien des Marketplace

**Was:** 3 Design-Prinzipien, die der gesamte Marketplace befolgt. Nicht als Tool, sondern als Designrichtlinie fuer unsere eigene Plugin-Architektur relevant.

**Prinzip 1 — Single Responsibility:** Jedes Plugin tut eine Sache. Durchschnitt 3.4 Komponenten pro Plugin. Anthropic-Guidance: 2-8 Komponenten.

**Prinzip 2 — Composability over Bundling:** Fokussierte Plugins mischen statt gebundelte Features erzwingen. Workflow-Orchestratoren komponieren fokussierte Plugins. Explizite Grenzen verhindern Tight Coupling.

**Prinzip 3 — Context Efficiency:** Kleinere, zweckgebundene Tools verarbeiten schneller im LLM-Kontextfenster. Genauere, fokussiertere Antworten bei reduziertem Token-Verbrauch.

**Relevanz fuer uns:** Hoch als Designrichtlinie. Unser monolithischer Skill verletzt alle 3 Prinzipien. Die Vertrags-Extraktion (v4) war ein erster Schritt Richtung Single Responsibility. v5 Plugin-Architektur muesste diese Prinzipien explizit als Designrichtlinie uebernehmen.

**Konkretes Delta:**
- Unser Skill: ~22 KB, 1 Datei, alle Modi (STATUS/EXECUTE/UPDATE/AUDIT/REVIEW)
- Marketplace-Muster: 5 separate Skills (je 1 pro Modus), 1 Dispatcher, ~2-4 KB pro Skill
- Unsere Vertraege: bereits Single-Responsibility (1 Vertrag pro Phase), aber noch nicht als Skills verpackt

---

## P12: Tiered Model Strategy

**Was:** Bewusste Zuweisung unterschiedlicher Claude-Modelle zu unterschiedlichen Aufgabentypen. Tier 1 (Opus) fuer Architektur/Security/Review. Tier 2 (Sonnet) fuer komplexe Aufgaben. Tier 3 (Haiku) fuer schnelle Operationen.

**Referenz-Implementierung:** 42 Opus-Agents, 39 Sonnet-Agents, 18 Haiku-Agents. Hybrid-Execution: Planning (Sonnet) → Execution (Haiku) → Review (Sonnet).

**Relevanz fuer uns:** Mittel. Aktuell laeuft alles auf dem gleichen Modell. Bei Plugin-Architektur koennte man differenzieren: Dispatcher + Q-Gates auf Opus (Qualitaet kritisch), Material-Produktion auf Sonnet (Kreativitaet + Volumen), Assembly auf Haiku (rein mechanisch). Spart Kosten und Latenz.

**Einschraenkung:** In Cowork ist die Modellwahl derzeit nicht pro Skill/Agent steuerbar (zu verifizieren). In Claude Code via Agent-Tool moeglich.

**Evaluationsfrage:** Ist Modell-Differenzierung in Cowork/Plugins technisch moeglich? Falls ja: welche Phasen profitieren am meisten?

---

## ARCHITEKTUR-EVALUATION: Marketplace-Struktur auf unser Projekt gemappt

### Ist-Zustand → Marketplace-Aequivalent

| Unser Artefakt | Funktion | Marketplace-Aequivalent | Gap |
|---|---|---|---|
| Monolithischer Skill (~22 KB) | Session-Steuerung, alle Modi | Plugin mit Dispatcher-Command + Phasen-Skills | Alles in 1 Datei vs. verteilte Architektur |
| ORCHESTRATOR.md | Konzeptuelle Prozessbeschreibung | Wird zur Laufzeit nicht gelesen — reine Doku | Kein Gap, Rolle bleibt gleich |
| 6 Vertraege (VERTRAG_PHASE_2-X.md) | Deklarative Dispatch-Anweisungen | → 6 Skills (je 1 pro Phase) | Vertraege sind schon Single-Responsibility, fehlt nur Frontmatter + Skill-Verpackung |
| SUB_MATERIAL_*.md (7 Dateien) | Subagenten-Prompts fuer Materialtypen | → 7 Agents (je 1 pro Materialtyp) | Sind schon Agent-Prompts, fehlt nur Agent-Frontmatter |
| SUB_AUFGABE_*.md (5 Dateien) | Subagenten-Prompts fuer Aufgabentypen | → 5 Agents (je 1 pro Aufgabentyp) | Wie oben |
| STATUS.md | Zustandsmaschine (Freitext) | state.json oder YAML-Frontmatter | Freitext → maschinenlesbar |
| CHANGELOG.md | Chronologisches Protokoll | Bleibt manuell (zu spezifisch fuer Automatisierung) | Kein Gap |
| GUETEKRITERIEN_*.md (6 Dateien) | Q-Gate-Kriterien | → Skills (Wissens-Pakete fuer Q-Gate-Dispatches) | Sind schon modular, fehlt Aktivierungs-Trigger |
| Uebergabe-Prompts | Session-Split + Claude-Code-Handoff | → Commands (Slash-Command-Invokation) | Manuell formuliert vs. generiert |

### Konkrete Plugin-Struktur fuer weitergehts.online

Basierend auf dem Marketplace-Pattern wuerde unser Plugin so aussehen:

```
plugins/escape-game-creator/
├── agents/
│   ├── pm-dispatcher.md              # Liest STATUS.md, identifiziert Phase, delegiert
│   ├── sub-material-darstellungstext.md
│   ├── sub-material-bildquelle.md
│   ├── sub-material-quellentext.md
│   ├── sub-material-karte.md
│   ├── sub-material-statistik.md
│   ├── sub-material-tagebuch.md
│   ├── sub-material-zeitleiste.md
│   ├── sub-aufgabe-mc.md
│   ├── sub-aufgabe-lueckentext.md
│   ├── sub-aufgabe-freitext.md
│   ├── sub-aufgabe-reihenfolge.md
│   └── sub-aufgabe-zuordnung.md
├── commands/
│   ├── produce.md                    # Dispatcher: Naechste Phase starten
│   ├── status.md                     # Projektstatus anzeigen
│   ├── audit.md                      # Q-Gate-Audit ausfuehren
│   ├── handoff.md                    # Uebergabe-Prompt generieren (CC oder Session-Split)
│   └── review.md                     # Post-Produktions-Review
├── skills/
│   ├── phase-2-0-rahmen/SKILL.md     # Aus VERTRAG_PHASE_2-0
│   ├── phase-2-1-material/SKILL.md   # Aus VERTRAG_PHASE_2-1
│   ├── phase-2-1c-cross/SKILL.md     # Aus VERTRAG_PHASE_2-1c
│   ├── phase-2-2a-plan/SKILL.md      # Aus VERTRAG_PHASE_2-2a
│   ├── phase-2-2b-aufgabe/SKILL.md   # Aus VERTRAG_PHASE_2-2b
│   ├── phase-2-2c-cross/SKILL.md     # Aus VERTRAG_PHASE_2-2c
│   ├── qgate-material/SKILL.md       # Aus QUALITAETSKRITERIEN_MATERIALPRODUKTION
│   ├── qgate-aufgaben/SKILL.md       # Aus GUETEKRITERIEN_AUFGABEN
│   ├── qgate-hefteintrag/SKILL.md    # Aus GUETEKRITERIEN_HEFTEINTRAG_ENTWURF + _PRODUKT
│   └── qgate-skript/SKILL.md         # Aus GUETEKRITERIEN_SKRIPT
└── state/
    └── state.json                    # Maschinenlesbarer Zustand (oder YAML in STATUS.md)
```

### Mapping der 4 Design-Patterns auf unsere Workflow-Phasen

**Pattern 1 (Single-Purpose Plugin):** Bereits teilweise realisiert. Vertraege und Subagenten sind schon Single-Responsibility. Der fehlende Schritt: Frontmatter hinzufuegen, als Skills/Agents verpacken.

**Pattern 2 (Workflow Orchestration):** Das ist der Kern-Gap. Unser Aequivalent zum Full-Stack-Feature-Orchestrator waere:

```
/escape-game-creator:produce
  ↓ Liest state.json → aktuelle_phase = "2.1", aktuelle_mappe = 3, letztes_material = "mat-3-2"
  ↓ Identifiziert: naechster Dispatch = mat-3-3 (Quellentext)
  ↓ Laedt skill: phase-2-1-material
  ↓ Laedt agent: sub-material-quellentext
  ↓ Fuehrt Dispatch aus (Read-Schritte aus Vertrag)
  ↓ Q-Gate via skill: qgate-material
  ↓ Bei PASS: mat-3-3.json schreiben, state.json aktualisieren
  ↓ Bei letztem Material: → Checkpoint (User-Validierung)
  ↓ state.json: aktuelle_phase = "2.1c"
```

Vergleich mit Full-Stack-Feature:
- Deren 9 Schritte ≈ unsere 7 Phasen (2.0 → 2.2c + Phase 3)
- Deren state.json ≈ unser STATUS.md YAML-Frontmatter
- Deren Checkpoints (2 Stueck) ≈ unsere User-Validierungen (3-4 Stueck)
- Deren Subagent-Dispatch pro Schritt ≈ unser Dispatch pro Material/Aufgabe
- Kritischer Unterschied: Unsere Dispatches sind N-fach pro Phase (N Materialien, N Aufgaben), nicht 1:1 wie bei Full-Stack

**Pattern 3 (Agent + Skill Integration):** Direkt anwendbar. Agent liefert Reasoning (SUB_MATERIAL_DT generiert Darstellungstext), Skill liefert Wissen (qgate-material prueft MQ1-MQ5). Getrennte Concerns, kombiniert im Dispatch.

**Pattern 4 (Multi-Plugin Composition):** Vorerst nicht relevant. Wir haben 1 Plugin mit internen Komponenten. Multi-Plugin wuerde erst relevant wenn wir z.B. ein separates `escape-game-engine` Plugin fuer die technische Seite abspalten.

### Slash-Command-Architektur (Conductor-Mapping)

| Conductor-Command | Unser Aequivalent | Funktion |
|---|---|---|
| `/conductor:setup` | `/escape-game-creator:init` | Neues Game initialisieren: game_id, Mappen-Anzahl, Fach, state.json anlegen |
| `/conductor:new-track` | `/escape-game-creator:new-mappe` | Neue Mappe starten: Produktionsverzeichnis anlegen, Phase 0 beginnen |
| `/conductor:implement` | `/escape-game-creator:produce` | Naechsten Produktionsschritt ausfuehren (State-Machine-Logik) |
| `/conductor:status` | `/escape-game-creator:status` | Aktuellen Projektstand anzeigen (liest state.json) |
| `/conductor:revert` | `/escape-game-creator:revert` | Mappe/Phase/Dispatch rueckgaengig machen |
| `/conductor:manage` | `/escape-game-creator:manage` | Mappe archivieren, loeschen, umbenennen |
| — (kein Aequivalent) | `/escape-game-creator:audit` | Q-Gate-Audit ausfuehren |
| — (kein Aequivalent) | `/escape-game-creator:handoff` | Uebergabe-Prompt fuer CC-Assembly generieren |

### Full-Stack-Feature-Orchestrator: Was wir uebernehmen koennen

**State-Management (direkt uebertragbar):**
```json
{
  "game_id": "gpg-erster-weltkrieg-ursachen",
  "aktuelle_mappe": 3,
  "status": "in_progress",
  "aktuelle_phase": "2.1",
  "aktueller_dispatch": "mat-3-3",
  "completed_dispatches": ["rahmen", "mat-3-1", "mat-3-2"],
  "files_created": ["rahmen/hefteintrag.json", "rahmen/einstieg.json", "..."],
  "erwartete_materialien": 5,
  "erwartete_aufgaben": 5,
  "checkpoints_passed": ["phase-1-validierung"],
  "started_at": "2026-04-02T...",
  "last_updated": "2026-04-02T..."
}
```

**Enforcement Rules (direkt uebertragbar):**
1. Sequentielle Ausfuehrung — keine Phasen ueberspringen
2. Persistenter State — Outputs in Dateien, nicht im Kontext
3. Checkpoint-Halts — Stopp bei User-Validierung, explizite Approval noetig
4. Fehler-Stopp — Bei Q-Gate FAIL: Halt, User-Guidance
5. Read-from-Artifact — Kein Dispatch liest aus vorherigem Kontext (P1 = identisch)

**Pre-Flight-Validation (direkt uebertragbar):**
- state.json existiert + `in_progress` → Resume anbieten
- state.json existiert + `complete` → Archivieren + Neustart
- Kein state.json → Neues Game initialisieren

### Progressive Disclosure: Token-Impact-Schaetzung

| Komponente | Aktuell (monolithisch) | Nach Umstellung | Einsparung |
|---|---|---|---|
| Skill-Load bei Session-Start | ~22.000 Token (gesamter Skill) | ~500 Token (Dispatcher-Frontmatter) | -98% |
| Phase-2.1-Dispatch (1 Material) | ~22.000 + Vertrag manuell | ~3.000 (Phasen-Skill) + ~2.000 (Agent) | -77% |
| Q-Gate-Pruefung | Im Vertrag eingebettet | ~1.500 (Q-Gate-Skill on demand) | Neutral (war im Vertrag) |
| Session-Split | Manuell formulierter Uebergabe-Prompt | ~1.000 (Handoff-Command) | Automatisiert |
| **Gesamt pro Material-Dispatch** | **~22.000+** | **~6.500** | **~70%** |

### Machbarkeitsbewertung (aktualisiert 2026-04-02 nach Funktionstest)

| Aspekt | Status | Begruendung |
|---|---|---|
| CC-Plugins in Cowork installierbar | **VERIFIZIERT** | agent-teams + agent-orchestration aus wshobson/agents Marketplace erfolgreich geladen und funktional |
| Slash-Commands in Cowork | **VERIFIZIERT** | agent-teams Skills als Slash-Commands aufrufbar, Subagenten dispatcht |
| Subagent-Dispatch via Agent-Tool | **VERIFIZIERT** | 3 parallele team-reviewer Agents gestartet, alle lieferten Ergebnisse |
| Subagent-Dateisystem-Zugriff | **VERIFIZIERT** | Subagent las mat-2-1.json per absolutem Pfad, lieferte korrekte Daten |
| Plugin-Struktur | JA | Marketplace-Pattern ist 1:1 auf unsere Artefakte mappbar |
| state.json automatisch lesen/schreiben | JA | Read/Write-Tool im Hauptkontext |
| Progressive Disclosure | JA | YAML-Frontmatter in Skills ist Standard |
| Tiered Models in Cowork | **VERIFIZIERT** | Agent mit model:"haiku" gestartet, identifizierte sich als Haiku 4.5 |
| Q-Gate als Skill | JA | GUETEKRITERIEN sind schon modular, brauchen nur Frontmatter |
| Checkpoint-Halts | JA | Ist Convention, keine Plattform-Abhaengigkeit |
| Plugin-Build in Cowork | VERFUEGBAR | cowork-plugin-management:create-cowork-plugin Skill installiert |

### Plugin-Installationsstatus + Empfehlungen

| Plugin | Status | Bedarfsfeld | Nutzen fuer dieses Projekt |
|---|---|---|---|
| **agent-teams** | INSTALLIERT, VERIFIZIERT | Qualitaetssicherung | Multi-Dimensionen-Review fuer Q-Gates. 3 parallele Reviewer auf mat-2-1.json: strukturierte Befunde, Schweregrad-Klassifikation, Cross-Validierung. **Direkt einsetzbar.** |
| **agent-orchestration** | INSTALLIERT, NICHT GETESTET | PM-Orchestrierung | improve-agent + multi-agent-optimize. Kann Subagenten-Prompts (SUB_MATERIAL_*, SUB_AUFGABE_*) systematisch verbessern. Folgetest noetig. |
| **conductor** | INSTALLIERT, BEDINGT NUETZLICH | PM-Orchestrierung, Session-Mgmt | Projekt hat 70-80% der Conductor-Struktur organisch entwickelt (STATUS.md ≈ state, Vertraege ≈ workflow, Mappen ≈ tracks). Kein conductor/-Verzeichnis vorhanden. Selektive Adoption empfohlen (Kontext konsolidieren, state.json, 8-10h). Volladoption waere Overhead fuer aktuellen Projektumfang (1 Person, 4 Mappen). Patterns (Dispatcher, Track-Lifecycle) uebertragbar ohne volle Conductor-Struktur. |
| **comprehensive-review** | INSTALLIERT, VERIFIZIERT | Qualitaetssicherung | architect-review auf VERTRAG_PHASE_2-1: 14 Findings (3 HIGH, 8 MEDIUM, 3 LOW). Kritisch: Output-Schema unvollstaendig, Q-Gate nicht mechanisch pruefbar, Conditional-Read-Logik ambig. Spezifikationsreife 60/100. **Direkt nuetzlich fuer Architektur-Audits auf Vertraege und ORCHESTRATOR.** |
| **plugin-eval** | INSTALLIERT, VERIFIZIERT | Qualitaetssicherung | Evaluation des monolithischen Skills (projekt-website-v4-2): Score 3.61/5.0. Anti-Patterns: OVER_CONSTRAINED (16+ Regeln), 8 gebundelte Verantwortlichkeiten. Progressive Disclosure 2/5. Konkrete Refactoring-Empfehlungen: (1) Skill in Dispatcher + Referenz aufteilen, (2) Output-Beispiele + Quick-Start ergaenzen, (3) Rigide Constraints zu Guidance abstufen. **Direkt nuetzlich fuer Skill-Iteration.** |
| **documentation-generation** | INSTALLIERT, NICHT GETESTET | Architektur-Doku | ADR-Skill (Architecture Decision Records) + changelog-automation + OpenAPI-spec. ADR direkt relevant: Unsere Architektur-Entscheidungen (Prozessredesign v1→v2, Vertrags-Extraktion, Hefteintrag-Umbenennung, Zwei-Stufen-FREEZE) sind aktuell informell in STATUS.md. ADR formalisiert das. changelog-automation weniger nuetzlich (unser CHANGELOG ist zu spezifisch). Folgetest: ADR-Generierung auf eine bestehende Entscheidung. |
| **full-stack-orchestration** | INSTALLIERT, REFERENZ-WERT | PM-Orchestrierung | Orchestrierungs-Pattern (state.json, Checkpoints, Subagent-Dispatch, Pre-Flight-Validation, Resume-Logik) als Vorlage fuer eigenen Dispatcher. Kein direkter Einsatz im Projekt. Architektur-Evaluation im Pool-Artefakt enthaelt bereits die relevanten Details. |
| **debugging-toolkit** | NICHT EMPFOHLEN | Engine-Wartung | Optimiert fuer Software-Debugging. Unsere Engine-Bugs (escape-engine.js) sind zu domain-spezifisch. Manuelle Diagnose + Claude-Code bleibt effektiver. |
| **code-refactoring** | NICHT EMPFOHLEN | Engine-Wartung | Unsere Engine ist klein (~500 Zeilen JS). Refactoring-Plugins sind fuer grosse Codebasen konzipiert. |
| **c4-architecture** | NICHT EMPFOHLEN | Architektur-Doku | C4-Diagramme sind fuer Software-Architektur. Unsere Architektur ist dokument-basiert (Vertraege, Workflows), nicht Code-basiert. Mermaid-Flowcharts bleiben passender. |
| **tdd-workflows** | NICHT EMPFOHLEN | Qualitaetssicherung | TDD-Pattern (Red-Green-Refactor) ist nicht auf didaktische Materialproduktion uebertragbar. Unsere Q-Gates sind inhaltlich, nicht test-basiert. |
| **git-pr-workflows** | NICHT EMPFOHLEN | Engine-Wartung | Wir arbeiten direkt auf main. Kein PR-Workflow. |

**Zusammenfassung: 2 installieren (conductor, comprehensive-review), 1 optional (documentation-generation), Rest irrelevant.**

### Verbleibende Unbekannte (4 von 4 geklaert — ALLE GESCHLOSSEN)

1. ~~Plugin-Installation in Cowork~~ → **GEKLAERT: Funktioniert.** CC-Plugins aus wshobson/agents Marketplace direkt installierbar.
2. ~~Subagent-Dateizugriff~~ → **GEKLAERT: Funktioniert.** Subagent las mat-2-1.json per absolutem Pfad (/sessions/.../mnt/weitergehts-online/docs/agents/artefakte/...), lieferte titel, typ und 12 Top-Level-Keys korrekt.
3. ~~Slash-Commands in Cowork~~ → **GEKLAERT: Funktioniert.** Skills werden als Commands aufgerufen.
4. ~~Model-Parameter in Cowork-Agents~~ → **GEKLAERT: Funktioniert.** Agent mit `model: "haiku"` gestartet, identifizierte sich als Haiku 4.5, las STATUS.md korrekt. Tiered-Model-Strategy (P12) ist technisch umsetzbar.

### Plugin-Verifikationstests (2026-04-02, Session 2)

**Methodik:** Jedes Plugin gegen reale Projekt-Artefakte getestet (nicht synthetische Daten). Bewertung: NUETZLICH (liefert actionable Ergebnisse), BEDINGT NUETZLICH (Patterns uebertragbar, kein direkter Einsatz), REFERENZ-WERT (Vorlage, kein Laufzeit-Nutzen).

#### Test 1+2: Plattform-Faehigkeiten (Dateisystem + Model-Tiering)

- **Subagent-Dateisystem-Zugriff:** Agent las mat-2-1.json per absolutem Pfad. Lieferte: titel="Warum schwelte es auf dem Balkan?", typ="darstellungstext", 12 Top-Level-Keys. VERIFIZIERT.
- **Model-Tiering:** Agent mit `model: "haiku"` gestartet. Identifizierte sich als Haiku 4.5 (claude-haiku-4-5-20251001), las STATUS.md korrekt. VERIFIZIERT.
- **Implikation:** Tiered-Model-Strategy (P12) ist technisch umsetzbar. Dispatcher auf Opus, Material-Produktion auf Sonnet, Assembly auf Haiku moeglich.

#### Test 3: plugin-eval auf monolithischen Skill (projekt-website-v4-2)

- **Testziel:** Qualitaetsmessung des bestehenden Skills gegen Plugin-Eval-Dimensionen.
- **Ergebnis:** Score 3.61/5.0 (nicht zertifizierungsfaehig).
- **Befunde:**
  - Triggering Accuracy: 4/5 (gute Keywords, aber Version-Konfusion v4 vs. v4-1 vs. v4-2)
  - Orchestration Fitness: 4/5 (klare Mode-Dispatch, aber Subagent-Dispatch-Mechanismus fehlt)
  - Output Quality: 3/5 (keine Output-Beispiele, keine Templates fuer STATUS/Befund/Uebergabe)
  - Scope Calibration: 4/5 (8 gebundelte Verantwortlichkeiten in 1 Datei)
  - Progressive Disclosure: 2/5 (kein Quick-Start, Voraussetzungen verstreut, hohe Referenz-Kopplung)
  - Token Efficiency: 3/5 (~3.200-3.500 Token pro Invokation, reduzierbar auf ~800)
- **Anti-Patterns:** OVER_CONSTRAINED (16+ MUST/ALWAYS/NEVER), 2 Orphan-Referenzen, 2 Dead-Cross-Refs
- **Top-3-Empfehlungen:** (1) Skill in Dispatcher (~150 Zeilen) + SKILL_REFERENCE aufteilen, (2) Output-Beispiele + Quick-Start + Modal-Decision-Tree ergaenzen, (3) 5-6 nicht-kritische Constraints zu Guidance abstufen
- **Verdikt:** NUETZLICH — liefert praezise, actionable Refactoring-Empfehlungen. Direkt anwendbar auf Skill-Iteration.

#### Test 4: comprehensive-review (architect-review) auf VERTRAG_PHASE_2-1

- **Testziel:** Architektur-Review eines Produktionsvertrags als wuerden wir Subagenten darauf deployen.
- **Ergebnis:** 14 Findings, Spezifikationsreife 60/100.
- **HIGH-Befunde (3):**
  - Output-JSON-Schema unvollstaendig (Feldtypen, Encoding, konditionale Praesenz undefiniert)
  - Conditional-Read-Logik ambig (SCPL-Zone-Bestimmung, didaktische_funktion-Quelle unklar)
  - Q-Gate nicht mechanisch pruefbar (keine Assertion-Formate, keine PASS/FAIL-Semantik)
- **MEDIUM-Befunde (8):** Dispatch-Isolation nicht erzwungen, Goldstandard-Template undefiniert, Pre-v3-Handling vage, Artifact-Pfade nicht normalisiert, SUB_MATERIAL-Dateien nicht versioniert, QUALITAETSKRITERIEN-Abhaengigkeit nicht traceable, Phase-2.1c-Scope unklar, Subphasen-Achsen unstrukturiert
- **LOW-Befunde (3):** P-Prinzipien nicht inline definiert, Input-Validierungs-Schema fehlt, Dispatch-Erfolgskriterien undefiniert
- **Empfehlung:** R1.1-R1.3 (Q-Gate formalisieren, Output-Schema vervollstaendigen, Conditional-Read als Decision-Tree) muessen vor automatisiertem Subagent-Deployment geloest werden. Fuer die aktuelle manuelle Produktionsweise nicht blockierend — Spezifikationsluecken, keine Bugs.
- **Verdikt:** NUETZLICH — tiefe, strukturierte Analyse mit konkreten Fixes. Ergaenzt agent-teams (breite Abdeckung) mit Tiefe auf Einzelartefakt-Ebene.

#### Test 5: conductor:status auf Projektstruktur

- **Testziel:** Mapping der bestehenden Projektstruktur auf Conductor-Modell.
- **Ergebnis:** 70-80% strukturelle Uebereinstimmung, kein conductor/-Verzeichnis.
- **Mapping:** product.md ≈ README+ORCHESTRATOR (verteilt), tech-stack.md ≈ ARCHITEKTUR_v1+UPGRADE_PLANs (verteilt), workflow.md ≈ WORKFLOW_v4+Vertraege (detaillierter als Conductor), tracks.md ≈ implizit in ORCHESTRATOR (Mappen als Tracks, aber nicht formalisiert)
- **Adoption-Empfehlung:** Selektiv (Phase 1: Kontext konsolidieren + state.json, 8-10h). Volladoption (Phase 2-3) nur bei Skalierung (zweite Lehrkraft, >20 Mappen).
- **Verdikt:** BEDINGT NUETZLICH — Patterns uebertragbar (Dispatcher, Track-Lifecycle, state.json), aber Conductor-Vollstruktur wuerde Overhead erzeugen fuer aktuellen Umfang.

---

### Strategische Konsequenz (aktualisiert nach Plugin-Verifikation)

Alle 4 Plattform-Unbekannten sind geklaert. Die Plugin-Architektur ist in Cowork **vollstaendig lauffaehig**: Plugins installierbar, Subagenten spawnen mit Dateisystem-Zugriff, Model-Tiering funktioniert, Slash-Commands aufrufbar.

**Verifizierter Nutzen pro Einsatzfeld:**
- **Qualitaetssicherung:** agent-teams (breite Audits) + comprehensive-review (tiefe Einzel-Reviews) + plugin-eval (Skill-Iteration). Alle 3 VERIFIZIERT + NUETZLICH.
- **PM-Orchestrierung:** Conductor-Patterns uebertragbar (Dispatcher, state.json, Track-Lifecycle), aber Volladoption = Overhead. full-stack-orchestration als Referenz-Implementierung.
- **Skill-Entwicklung:** plugin-eval liefert praezise Refactoring-Empfehlungen. skill-creator + cowork-plugin-management fuer Plugin-Build verfuegbar.

**Revidierter Weg zum escape-game-creator Plugin:**

1. ~~Verbleibende Unbekannte klaeren~~ — ERLEDIGT (alle 4 geschlossen)
2. Vertraege mit comprehensive-review auditieren (R1.1-R1.3 Blocker fixen)
3. Monolithischen Skill mit plugin-eval-Empfehlungen refactoren (Dispatcher + Referenz aufteilen)
4. Plugin-Skeleton via cowork-plugin-management:create-cowork-plugin bauen
5. Dispatcher-Skill als erstes Modul (liest state.json, identifiziert Phase)
6. 1 Phasen-Skill (Phase 2.0 Rahmen) als PoC
7. Test mit Mappe 3 Phase 2.0

---

## Priorisierung (Empfehlung)

| # | Pattern | Relevanz | Aufwand | Empfehlung |
|---|---------|----------|---------|------------|
| P11 | Architektur-Prinzipien | Hoch | Null | Designrichtlinie — sofort uebernehmen |
| P1 | Dispatcher (Conductor) | Hoch | Mittel | Kernstueck v5 — als erstes evaluieren |
| P2 | State-File | Hoch | Niedrig | Quick Win — YAML-Frontmatter in STATUS.md |
| P6 | Progressive Disclosure | Hoch | Mittel | Token-Einsparung — mit P1 zusammen |
| P3 | Checkpoint | Mittel | Niedrig | Formalisierung bestehender Praxis |
| P4 | Subagent-Dispatch | Hoch | Hoch | Empirisch testen bevor planen |
| P12 | Tiered Models | Mittel | Niedrig | Kosten/Qualitaet — Machbarkeit klaeren |
| P5 | PluginEval | Mittel | Mittel | Erst nach Plugin-Umstellung relevant |
| P9 | ADR | Mittel | Niedrig | Strukturierung bestehender Entscheidungen |
| P7 | Team-Audit | **Hoch** | **Niedrig** | **VERIFIZIERT — sofort einsetzbar fuer Q-Gate-Audits** |
| P10 | Changelog-Auto | Niedrig | Mittel | Unser CHANGELOG ist zu spezifisch |
| P8 | Git-Revert | Niedrig | Mittel | Nice-to-have, keine Prioritaet |

---

## Naechster Schritt

3 moegliche Pfade:

**Pfad A — Plugin-First:** Kritische Unbekannte 1-4 empirisch klaeren. Wenn positiv: Plugin bauen, dann Mappe 3 als erster End-to-End-Test.
**Pfad B — Hybrid:** Designprinzipien uebernehmen (Progressive Disclosure, State-Machine, Checkpoint-Halts), aber ohne Plugin-Packaging. Vertraege mit Frontmatter versehen, Dispatcher als Skill, state.json manuell. Mappe 3 mit Hybrid produzieren.
**Pfad C — Produce-First:** Mappe 3 mit bestehendem System produzieren. Erkenntnisse als Input fuer Plugin-Architektur nutzen. Plugin danach bauen.
