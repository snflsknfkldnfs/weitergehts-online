# Audit-Briefing: Skill `projekt-website`

**Zweck dieses Dokuments:** Vollständige Kontextbeschreibung für eine externe KI, die die Datei `SKILL.md` des Skills `projekt-website` auf blinde Flecken, Inkonsistenzen und Optimierungsmöglichkeiten evaluieren soll. Die auditierende KI hat keinen Zugriff auf die Projekthistorie, den Workspace oder vorherige Gespräche.

---

## 1. Was ist das Gesamtvorhaben?

Eine Lehrkraft an einer bayerischen Mittelschule will eine Infrastruktur aufbauen, die:

1. **Interaktive Unterrichtsmaterialien erzeugt** -- primär browserbasierte Escape-Games, langfristig auch Quizze, Lernpfade, Simulationen
2. **Diese als statische Website hostet** -- auf GitHub Pages, ohne Backend, ohne Login, ohne Schülerdaten, DSGVO-konform
3. **Ein KI-Agenten-Team nutzt**, um die Materialien zu generieren -- 6 spezialisierte Subagents (Didaktik, Inhalt, Rätsel, Technik, Design, Qualität) + Orchestrator, ausgeführt in Claude Code

Die Inspiration ist das Projekt "Archiv 45" von Joscha Falck: ein browserbasiertes historisches Escape-Game für den Geschichtsunterricht der 8. Klasse, entwickelt mit exakt dieser Subagent-Architektur in Claude Code, gehostet auf GitHub Pages.

## 2. Was ist der Skill `projekt-website`?

Ein Cowork-Skill (Claude Desktop), der als Projektmanagement-Agent fungiert. Er übernimmt nicht die Materialerstellung selbst (das läuft in Claude Code mit Subagents), sondern steuert das Drumherum:

- **Onboarding** neuer Lehrkräfte (Bestandsaufnahme: Schulkontext, Fächer, Lerngruppen, Technik)
- **Fortschrittstracking** über `STATUS.md` und `CHANGELOG.md`
- **Phasensteuerung** gemäß Projektplan
- **Brücke zwischen Cowork und Claude Code** (formuliert Übergabe-Prompts für Claude-Code-Aufgaben)

### 2.1 Drei Modi

| Modus | Trigger | Aktion |
|---|---|---|
| STATUS | "wo stehen wir", "Projektfortschritt" | Liest Dokumentation, berichtet Stand, ändert nichts |
| EXECUTE | "mach weiter", "nächster Schritt" | Identifiziert nächste Aufgabe, führt aus oder formuliert Claude-Code-Prompt, aktualisiert Doku |
| UPDATE | "Repo ist angelegt", "Phase X fertig" | Nimmt extern erledigte Arbeit entgegen, aktualisiert Doku |

### 2.2 Onboarding (Status-0-Erhebung)

Bei erster Invokation ohne vorhandene `STATUS.md` erhebt der Skill:

- **A1 Schulkontext:** Schulart, Bundesland, Besonderheiten
- **A2 Fächer:** Unterrichtete Fächer/Klassen, MVP-Priorisierung, vorhandene Artefakte
- **A3 Lerngruppen (pro Fach):** Klassenstärke, Sprachniveau, Digital Literacy, Methoden, Besonderheiten
- **A4 Technik:** Klassenraum-Ausstattung, Endgeräte, WLAN, Internetfilter
- **A5 Lehrkraft:** GitHub-Account, Claude-Code-Erfahrung, HTML/CSS/JS-Kenntnisse, Domain/Hosting

Ergebnis: Befüllte `STATUS.md`, `CHANGELOG.md`, adaptierter Projektplan.

### 2.3 Dokumentationsarchitektur

Drei persistente Dateien im Projektverzeichnis:

| Datei | Inhalt | Aktualisierungsfrequenz |
|---|---|---|
| `STATUS.md` | Aktuelle Phase, nächster Schritt, Blocker, Kontextdaten | Bei jedem Arbeitsschritt |
| `CHANGELOG.md` | Chronologisches Protokoll aller Arbeitsschritte | Bei jedem Arbeitsschritt |
| `Projektplan_Website_Interaktive_Materialien.md` | Gesamtplan mit 5 Phasen, Architektur, Risiken, Erfolgskriterien | Selten (bei Planänderungen) |

## 3. Technische Architektur des Zielsystems

### Website
- Statisches HTML/CSS/JS (Vanilla, kein Framework)
- GitHub Pages Hosting
- localStorage für Spielfortschritt
- Clientseitiger Lehrkraft-Login
- Offline-fähig nach erstem Laden
- Mobile-first, WCAG AA

### Subagent-Team (Claude Code)
- ORCHESTRATOR: Gesamtsteuerung
- AGENT_DIDAKTIK: Lernziele, Lehrplankonformität, Ethik
- AGENT_INHALT: Fachrecherche, Quellenauswahl
- AGENT_RAETSEL: Aufgabenkonstruktion, Codes, Tipp-System
- AGENT_TECHNIK: HTML/CSS/JS-Implementierung
- AGENT_DESIGN: Visuelles Erscheinungsbild
- AGENT_QUALITAET: Browsertest (52-Punkte-Checkliste), Didaktik-Review

### Workflow pro Escape-Game
Didaktik → Inhalt → Rätsel → Technik → Design → Qualität → Iteration → Deployment

## 4. Skalierungsanspruch

Der Skill soll nicht nur für eine Person funktionieren. Jede interessierte Lehrkraft soll ihn installieren und durch das Onboarding geführt ihr eigenes Projekt aufbauen können. Die Variablen sind: Schulart, Fächer, Lerngruppen, technisches Niveau, vorhandene Materialien. Die Konstanten sind: Workflow, Dokumentationsstruktur, Architekturentscheidungen.

## 5. Vorhandene Artefakte des aktuellen Users

Der aktuelle User (Mittelschule Bayern) hat bereits:

- **Didaktische Anleitungen:** Qualitätskriterien, TUV-Vorlagen, Lernziel-Leitfäden, Methodenmatrix, Sequenzplanungsstrukturen (primär für WiB, teilweise für GPG, Sport)
- **Lehrplandaten:** LehrplanPLUS Bayern als Markdown-Dateien für GPG R7, WiB R7, Mathematik R7
- **Skill-System:** Bestehende Cowork-Skills für Unterrichtsdokumentation (m7c-schriftwesen, gpg7b/7c-schriftwesen, wib7b/7c-schriftwesen)
- **Infrastruktur:** Cowork mit Plugins aktiv, Claude Code fortgeschritten, Domain vorhanden

## 6. Aktueller Projektstatus

Phase 0 (Projektsetup), teilweise abgeschlossen:
- Inspirationsanalyse, Architekturentscheidungen, Projektplan, Skill: erledigt
- GitHub-Repository, Verzeichnisstruktur, Claude-Code-Projektordner: offen
- Lerngruppencharakteristika und technische Rahmenbedingungen: noch nicht erhoben

## 7. Audit-Auftrag

Evaluiere die SKILL.md auf:

1. **Vollständigkeit:** Fehlen Modi, Erhebungsbereiche, Dokumentationsfelder oder Workflow-Schritte?
2. **Konsistenz:** Widersprechen sich Teile des Skills? Passt die Onboarding-Erhebung zur tatsächlichen Nutzung der Daten im weiteren Verlauf?
3. **Robustheit:** Was passiert bei Edge Cases (User hat kein GitHub, User hat mehrere Projekte, User steigt mitten in einer Phase ein, Session-Abbruch)?
4. **Skalierbarkeit:** Funktioniert das Onboarding für Lehrkräfte anderer Schularten, Bundesländer, Fächer? Welche Annahmen sind zu eng?
5. **Schnittstelle Cowork ↔ Claude Code:** Ist der Übergabe-Mechanismus (Prompt-Formulierung) robust genug? Welche Informationen gehen verloren?
6. **Didaktische Tiefe:** Erhebt das Onboarding genug Kontext, um Materialien zu erzeugen, die tatsächlich zur Lerngruppe passen? Fehlen Dimensionen?
7. **Dokumentationseffizienz:** Ist das Drei-Dateien-System (STATUS, CHANGELOG, Projektplan) zu aufwändig, zu schlank, oder richtig dimensioniert?
8. **Fehlende Prozesse:** Gibt es notwendige Abläufe (z.B. Versionierung, Backup, Rollback, Qualitätssicherung der Skill-Outputs, Feedback-Loops), die der Skill nicht abdeckt?
