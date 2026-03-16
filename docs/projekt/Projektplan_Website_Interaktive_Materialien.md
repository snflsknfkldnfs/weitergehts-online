# Projektplan: Interaktive Unterrichtsmaterialien -- weitergehts.online

**Version:** 1.0.0
**Erstellt:** 2026-03-12
**Status:** Initialisierung
**Referenz:** Archiv 45 (Joscha Falck) als Designvorlage

---

## 1. Projektziel

Aufbau einer Infrastruktur, die interaktive Unterrichtsmaterialien (MVP: Escape-Games) erzeugt und als statische Website auf GitHub Pages hostet. Die Architektur soll langfristig beliebige interaktive Formate tragen (Quizze, Lernpfade, Simulationen, Zuordnungsaufgaben), startet aber fokussiert mit dem Escape-Game-Format nach dem Archiv-45-Muster.

**Ergebnis Phase 1:** Ein funktionsfähiges, browserbasiertes Escape-Game für GPG (Geschichte), gehostet auf GitHub Pages, erzeugt durch ein adaptiertes Subagent-Team in Claude Code.

---

## 2. Architekturentscheidungen

### 2.1 Technologie-Stack (Website)

| Komponente | Entscheidung | Begründung |
|---|---|---|
| Rendering | Statisches HTML/CSS/JS | Kein Backend nötig, offline-fähig, datenschutzkonform |
| Framework | Keines (Vanilla JS) im MVP | Wie Archiv 45: minimale Abhängigkeiten, maximale Portabilität |
| Hosting | GitHub Pages | Kostenlos, versioniert, CI/CD über GitHub Actions möglich |
| Domain | github.io-Subdomain (Custom Domain optional) | weitergehts.online kann später per CNAME angebunden werden |
| Fortschritt | localStorage im Browser | Kein Account nötig, DSGVO-konform |
| Lehrer-Zugang | Statischer Code-Login (clientseitig) | Zugang zu Lösungen/Codes ohne Backend |

### 2.2 Repository-Struktur

```
weitergehts-online/                     # GitHub Repository
├── index.html                          # Landing Page / Materialübersicht
├── assets/
│   ├── css/
│   │   ├── base.css                    # Gemeinsame Styles
│   │   └── themes/                     # Fach-/Format-spezifische Themes
│   ├── js/
│   │   ├── core.js                     # Shared Logic (Fortschritt, Navigation, Feedback)
│   │   ├── escape-engine.js            # Escape-Game-spezifische Engine
│   │   └── quiz-engine.js              # (Zukunft) Generisches Quiz-System
│   ├── img/
│   └── audio/                          # Soundeffekte (optional)
├── escape-games/
│   ├── gpg-[thema]/                    # Pro Escape-Game ein Verzeichnis
│   │   ├── index.html                  # Startseite des Games
│   │   ├── mappe-1.html               # Einzelne Mappen/Kapitel
│   │   ├── mappe-2.html
│   │   ├── ...
│   │   ├── data.json                   # Inhalte, Rätsel, Codes (maschinenlesbar)
│   │   └── lehrkraft.html              # Lehrkraft-Zugang mit Lösungen
│   └── template/                       # Blanko-Vorlage für neue Games
├── docs/                               # Projektdokumentation
│   └── agenten-rollen.md
├── .github/
│   └── workflows/
│       └── deploy.yml                  # GitHub Pages Deployment
└── README.md
```

### 2.3 Design-System

Abgeleitet aus Archiv 45, adaptiert für Mehrformat-Fähigkeit:

- **Farbpalette:** Gedämpfte, seriöse Töne pro Fach (GPG: Navy/Gold, WiB: Teal/Bronze, M: Slate/Blue)
- **Typografie:** Monospace für Archiv-/Dokument-Feeling in Escape-Games, Sans-Serif für andere Formate
- **Responsive:** Mobile-first, funktioniert auf Schul-iPads und Chromebooks
- **Barrierefreiheit:** Kontrastverhältnisse WCAG AA, Keyboard-Navigation, Screen-Reader-Kompatibilität

---

## 3. Subagent-Architektur (Adaptiert)

Falcks 6-Agenten-Modell wird an die vorhandenen Anleitungsartefakte angepasst. Die Agenten werden als Markdown-Dateien im Claude-Code-Projektordner abgelegt.

### 3.1 Agenten-Rollen

```
ORCHESTRATOR.md
├── AGENT_DIDAKTIK.md        # Adaptiert: Greift auf vorhandene Anleitungsartefakte zu
│   └── Quellen: TUV-Vorlagen, Qualitätskriterien, Lernziel-Leitfäden, Methodenmatrix
├── AGENT_INHALT.md          # Fachlicher Rechercheur
│   └── Quellen: Lehrplan-MDs, Fachprofil-Dateien, Webrecherche
├── AGENT_RAETSEL.md         # Spieldesigner / Aufgabenkonstrukteur
│   └── Quellen: Methodenfinder, Aktivierende Methoden, Aufgabenformate
├── AGENT_TECHNIK.md         # HTML/CSS/JS-Implementierung
│   └── Quellen: Template-Verzeichnis, Bug-Pattern-Dokumentation
├── AGENT_DESIGN.md          # Visuelles Erscheinungsbild
│   └── Quellen: Design-System-Definition
└── AGENT_QUALITAET.md       # Browsertest + Didaktik-Review
    └── Quellen: Qualitäts-Checkliste (adaptiert aus Falcks 52-Punkte-Liste)
```

### 3.2 Adaptierung an bestehende Artefakte

Die vorhandenen Anleitungsdokumente werden als Wissensquellen in die Agenten-Prompts integriert:

| Agent | Vorhandenes Artefakt | Integration |
|---|---|---|
| DIDAKTIK | `Lehrplan/GPG_R7/Fachlehrplan_GPG_R7.md` + Fachprofil + Jahrgangsstufenprofil | Lernziele, Kompetenzerwartungen |
| DIDAKTIK | `GPG_Anleitungen/Didaktik/Geschichte/`, `/Geo/`, `/Politische Bildung/` | Fachdidaktische Rahmung |
| DIDAKTIK | `GPG_Anleitungen/Lernziele formulieren/` | Lernziel-Formulierung |
| DIDAKTIK | `GPG_Anleitungen/Sequenzplanung/` | Strukturvorgaben |
| INHALT | `Lehrplan/GPG_R7/*.md` | Lehrplan-Konformität |
| INHALT | `GPG_UE/GPG7/` (bestehende TUVs Industrialisierung) | Referenz für Inhaltstiefe |
| RAETSEL | `GPG_Anleitungen/Methoden/` (Aktivierende Methoden) | Aufgabenvielfalt |
| RAETSEL | `GPG_Anleitungen/Unterrichtseinheiten/` (Sozialformen, Methoden) | Interaktionsdesign |
| RAETSEL | `GPG_Didaktik/Theorie/` (Planspiel-Methodik) | Spieldesign-Inspiration |
| QUALITAET | Neu zu erstellen: `docs/Checkliste_Interaktive_Materialien.md` | 52-Punkte-Abnahme |

### 3.3 Workflow pro Escape-Game

```
1. ORCHESTRATOR erhält Thema + Lehrplanbezug
2. AGENT_DIDAKTIK → Lernziele, Schwierigkeitsgrade, ethische Leitlinien
3. AGENT_INHALT → Recherche, Quellen, strukturierte Inhalts-MDs
4. AGENT_RAETSEL → 5 Aufgaben pro Mappe + Codes + Tipp-System
5. AGENT_TECHNIK → HTML/CSS/JS-Implementierung aus Template
6. AGENT_DESIGN → Visuelles Feintuning, Responsiveness
7. AGENT_QUALITAET → Browsertest (Checkliste) + didaktischer Review
8. Iteration: Bugs und didaktische Schwächen → Rücklauf an zuständigen Agenten
9. Deployment: Push auf GitHub → GitHub Pages
```

---

## 4. Phasenplan

### Phase 0: Projektsetup (Tag 1)
- [x] Inspirationsanalyse (Archiv 45)
- [x] Bestandsaufnahme vorhandener Artefakte
- [x] Architekturentscheidungen
- [x] GitHub-Repository anlegen (`weitergehts-online`)
- [x] GitHub Pages aktivieren
- [x] Verzeichnisstruktur im Repo initialisieren (15 Dateien)
- [x] Custom Domain `weitergehts.online` anbinden (DNS + CNAME)
- [ ] Projektordner in Claude Code einrichten

### Phase 1: Agenten-Infrastruktur (Tag 2-3) ✓
- [x] ORCHESTRATOR.md schreiben
- [x] AGENT_DIDAKTIK.md schreiben (mit Referenzen auf vorhandene Anleitungsartefakte)
- [x] AGENT_INHALT.md schreiben
- [x] AGENT_RAETSEL.md schreiben
- [x] AGENT_TECHNIK.md schreiben (inkl. Bug-Pattern-Dokumentation aus Falcks Erfahrungen)
- [x] AGENT_DESIGN.md schreiben (inkl. Design-System-Definition)
- [x] AGENT_QUALITAET.md schreiben (inkl. adaptierter Checkliste)
- [x] Checkliste_Interaktive_Materialien.md erstellen
- [x] Audit + Fixes (B2, H1-H5): Pfad-Manifest, Schema, Zuständigkeiten, API, D&D, Medien

### Phase 2: Template-Engine (Tag 4-5) ✓
- [x] HTML-Grundgerüst für Escape-Game-Startseite (`escape-games/template/index.html`, 175Z)
- [x] Mappe-Template (generisch, befüllbar) (`escape-games/template/mappe-template.html`, 120Z)
- [x] `escape-engine.js`: 7 API-Funktionen + 5 Aufgabentyp-Renderer (1169Z)
- [x] `core.js`: Storage/Nav/Feedback/Utils IIFE (259Z)
- [x] `base.css` (318Z) + `theme-gpg.css` (530Z)
- [x] Lehrkraft-Zugang-Template (`escape-games/template/lehrkraft.html`, 330Z)
- [x] `data.json`-Schema (tipps als Objekt-Array, narrativ-Feld) (27Z)
- [x] Template-Verzeichnis als Blanko-Vorlage unter `escape-games/template/`

### Phase 3: Pilot -- GPG Escape-Games "Erster Weltkrieg" (Tag 6-10)
- [x] Thema festlegen: Der Erste Weltkrieg (2 Games: Ursachen/Ausbruch + Verlauf/Ende)
- [x] Themen-Briefing-Prozess standardisieren (ORCHESTRATOR Phase 0, AGENT_INHALT TUV-Kanal)
- [x] Themen-Briefings erstellen (Game 1: 4 Mappen, Game 2: 5 Mappen)
- [ ] Game 1 "Pulverfass Europa" (UE01-04) durch Agenten-Workflow produzieren:
  - [ ] DIDAKTIK: Lernziele + Rahmenvorgaben
  - [ ] INHALT: TUV-Auswertung + Inhaltsluecken-Recherche + strukturierte MDs
  - [ ] RAETSEL: 5 Aufgaben pro Mappe + Codes + Narrativ
  - [ ] TECHNIK: Implementierung
  - [ ] DESIGN: Visuelles Feintuning
  - [ ] QUALITAET: Browsertest + Didaktik-Review
- [ ] Iteration 1: Bugfixes + didaktische Nachbesserung
- [ ] Iteration 2: Feinschliff + finaler Test
- [ ] Deployment Game 1 auf GitHub Pages
- [ ] Game 2 "Der Grosse Krieg" (UE05-09) analog produzieren
- [ ] Deployment Game 2 auf GitHub Pages

### Phase 4: Dokumentation + Übertragbarkeit (Tag 11-12)
- [ ] Workflow-Dokumentation (was hat funktioniert, was nicht)
- [ ] Bug-Pattern-Katalog aktualisieren
- [ ] Agenten-Prompts auf Basis der Erfahrungen verfeinern
- [ ] Template-Paket für nächstes Escape-Game finalisieren
- [ ] Anleitung: "Neues Escape-Game in 5 Schritten"

### Phase 5: Erweiterung (ab Tag 13, fortlaufend)
- [ ] Zweites Escape-Game (anderes GPG-Thema oder WiB)
- [ ] Landing Page / Materialübersicht auf index.html
- [ ] Optional: Custom Domain weitergehts.online anbinden
- [ ] Optional: Weitere Formate (Quiz-Engine, Lernpfade)
- [ ] Optional: Integration der Cowork-Skills für automatisierte Materialerstellung

---

## 5. Risiken und Mitigationen

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|---|---|---|---|
| JavaScript-Bugs ohne sichtbare Symptome (Falck-Erfahrung) | Hoch | Hoch | Bug-Pattern-Dokumentation, strikte Checkliste, Browser-Console-Prüfung in jedem Testlauf |
| Didaktische Qualität bei KI-generierten Inhalten unzureichend | Mittel | Hoch | AGENT_DIDAKTIK mit vorhandenen Qualitätskriterien füttern, menschlicher Review vor Deployment |
| Scope Creep (zu viele Formate gleichzeitig) | Mittel | Mittel | Strikter MVP-Fokus auf Escape-Games, weitere Formate erst nach funktionierendem Pilot |
| GitHub Pages Limitierungen (100GB Repo, 1GB Deployment) | Niedrig | Niedrig | Statische Assets optimieren, keine Videos im Repo |
| Historische Inhalte fehlerhaft oder unsensibel | Mittel | Hoch | Quellenprüfung durch AGENT_INHALT, ethische Leitlinien in AGENT_DIDAKTIK, manueller Review bei sensiblen Themen |

---

## 6. Erfolgskriterien für MVP

1. Ein vollständiges Escape-Game mit mindestens 5 Mappen ist spielbar unter einer GitHub Pages URL
2. Funktioniert auf Chrome, Safari, Firefox (Desktop + Mobile)
3. Fortschritt wird gespeichert und überlebt Browser-Neustart
4. Lehrkraft-Zugang funktioniert
5. Alle Inhalte sind lehrplankonform (LehrplanPLUS GPG R7/R8)
6. Agenten-Workflow ist dokumentiert und auf nächstes Thema übertragbar
7. Keine externen Abhängigkeiten (offline-fähig nach erstem Laden)

---

## 7. Nächster Schritt

GitHub-Repository anlegen und Verzeichnisstruktur initialisieren. Dann ORCHESTRATOR.md als ersten Agenten-Prompt schreiben -- er definiert den Workflow für alle anderen.
