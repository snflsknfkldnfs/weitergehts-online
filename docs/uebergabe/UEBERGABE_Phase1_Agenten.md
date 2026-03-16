# Übergabe-Prompt: Phase 1 -- Subagent-Architektur aufbauen

**Ziel:** 7 Agenten-Markdown-Dateien + 1 Qualitäts-Checkliste im Repo-Verzeichnis `docs/` erstellen, committen und pushen.

---

## Kontext

Projekt: Interaktive Unterrichtsmaterialien als statische Website (MVP: Escape-Games für GPG).
Repository: https://github.com/snflsknfkldnfs/weitergehts-online (lokal geklont)
Phase 0 abgeschlossen: Repo steht, GitHub Pages aktiv, Custom Domain `weitergehts.online` konfiguriert.

Die Agenten-MDs definieren Rollen und Prompts für ein Claude-Code-Subagent-Team, das Escape-Games produziert. Jeder Agent bekommt eine Markdown-Datei, die als System-Prompt dient, wenn der Orchestrator ihn aufruft.

### Vorhandene GPG-Artefakte (lokale Pfade relativ zu ~/weitergehts.online/)

**Lehrplan:**
- `Unterrichtseinwicklung/7c/Input_Artefake/Lehrplan/GPG_R7/Fachlehrplan_GPG_R7.md`
- `Unterrichtseinwicklung/7c/Input_Artefake/Lehrplan/GPG_R7/Fachprofil_GPG_R7.md`
- `Unterrichtseinwicklung/7c/Input_Artefake/Lehrplan/GPG_R7/Jahrgangsstufenprofil_GPG_R7.md`

**GPG-Didaktik:**
- `Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Anleitungen/Didaktik/Geschichte/` (Phasen einer Geschichtsstunde etc.)
- `Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Anleitungen/Didaktik/Geo/Geographiedidaktik/`
- `Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Anleitungen/Didaktik/Politische Bildung/`
- `Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Didaktik/Seminarbuch/` (Lernprozesstheorie)
- `Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Didaktik/Theorie/` (Checklisten, Lernziel-Formular, Planspiele, Methoden)

**Methoden:**
- `Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Anleitungen/Methoden/` (Aktivierende Methoden etc.)
- `Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Anleitungen/Unterrichtseinheiten/` (Sozialformen, Gruppenpuzzle, Motivierende Einstiege etc.)

**Sequenzplanung & Lernziele:**
- `Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Anleitungen/Sequenzplanung/`
- `Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Anleitungen/Lernziele formulieren/`

**LehrplanPLUS-Aufbereitung:**
- `Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Anleitungen/LehrplanPLUS/Fachprofil GPG/`
- `Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Anleitungen/LehrplanPLUS/GPG7/`

**Bestehende GPG7-Unterrichtseinheiten (Referenz):**
- `Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_UE/GPG7/Silas/GPG7/04_TUV_GPG7/02_LB2-LB3_Industrialisierung/` (6+ TUVs zur Industrialisierung)

---

## Aufgabe

Erstelle im lokalen Repo unter `docs/` diese 8 Dateien:

### 1. `docs/ORCHESTRATOR.md`

Rolle: Gesamtkoordination des Escape-Game-Erstellungsprozesses.
Inhalt:
- Eingabe: Thema + Lehrplanbezug + Jahrgangsstufe + gewünschte Mappen-Anzahl
- Workflow-Steuerung: Ruft Agenten in definierter Reihenfolge auf (DIDAKTIK → INHALT → RAETSEL → TECHNIK → DESIGN → QUALITAET)
- Iteration: Bei Qualitätsmängeln Rücklauf an zuständigen Agenten
- Ausgabe: Fertiges Escape-Game-Verzeichnis unter `escape-games/[thema]/`
- Konvention: Alle Dateipfade relativ zum Repo-Root, keine absoluten Pfade im generierten Code
- Der Orchestrator kennt die data.json-Struktur (siehe `escape-games/template/data.json`) und stellt sicher, dass alle Agenten konsistent darauf arbeiten

### 2. `docs/AGENT_DIDAKTIK.md`

Rolle: Didaktische Rahmung und Qualitätssicherung.
Eingabe: Thema + Lehrplanbezug
Aufgaben:
- Lernziele formulieren (kompetenzorientiert, LehrplanPLUS-konform)
- Schwierigkeitsgrad festlegen (angepasst an Mittelschule R7)
- Ethische Leitlinien bei historischen/politischen Themen definieren
- Didaktische Strukturvorgaben für Mappen (Einstieg → Erarbeitung → Sicherung pro Mappe)
Quellen (als Dateipfade auflisten, die der Agent lesen soll):
- Fachlehrplan_GPG_R7.md, Fachprofil_GPG_R7.md, Jahrgangsstufenprofil_GPG_R7.md
- GPG_Anleitungen/Didaktik/Geschichte/, GPG_Anleitungen/Didaktik/Geo/, GPG_Anleitungen/Didaktik/Politische Bildung/
- GPG_Anleitungen/Lernziele formulieren/
- GPG_Anleitungen/Sequenzplanung/
Ausgabe: Didaktisches Rahmen-Dokument (Markdown) mit Lernzielen, Kompetenzerwartungen, ethischen Hinweisen, Schwierigkeitsprofil

### 3. `docs/AGENT_INHALT.md`

Rolle: Fachlicher Rechercheur und Inhaltsersteller.
Eingabe: Didaktisches Rahmen-Dokument + Thema
Aufgaben:
- Sachanalyse des Themas (fachwissenschaftlich korrekt, altersgerecht)
- Quellenrecherche (primär Schulbuch-Level, ergänzend Web)
- Strukturierte Inhalts-MDs pro Mappe erstellen
- Lehrplankonformität sicherstellen (Kompetenzerwartungen abdecken)
Quellen:
- Fachlehrplan_GPG_R7.md (Kompetenzerwartungen als Pflichtabdeckung)
- GPG_Anleitungen/LehrplanPLUS/GPG7/
- Bestehende TUVs unter GPG_UE/GPG7/ als Referenz für Inhaltstiefe und -struktur
Ausgabe: Pro Mappe ein strukturiertes Inhalts-MD (Titel, Kernaussage, Detailinfos, Quellen, Begriffe)

### 4. `docs/AGENT_RAETSEL.md`

Rolle: Spieldesigner und Aufgabenkonstrukteur.
Eingabe: Inhalts-MDs + Didaktisches Rahmen-Dokument
Aufgaben:
- Pro Mappe 5 Aufgaben designen (verschiedene Typen: Multiple Choice, Zuordnung, Lückentext, Reihenfolge, Freitext-Code)
- Freischalt-Codes generieren (4-6 Zeichen, thematisch passend)
- Tipp-System pro Aufgabe (3 Stufen: Hinweis → Teilantwort → Lösung)
- Schwierigkeit innerhalb einer Mappe steigern
- Narrative Rahmung (Geschichte/Szenario, das die Mappen verbindet)
Quellen:
- GPG_Anleitungen/Methoden/ (Methodenvielfalt)
- GPG_Anleitungen/Unterrichtseinheiten/ (Sozialformen, aktivierende Methoden)
- GPG_Didaktik/Theorie/ (Planspiel-Methodik als Inspiration)
Ausgabe: Pro Mappe ein Rätsel-MD (5 Aufgaben mit Typ, Frage, Antwortoptionen, Lösung, Code, 3 Tipps) + Gesamt-Narrativ + data.json-Befüllung gemäß Schema

### 5. `docs/AGENT_TECHNIK.md`

Rolle: HTML/CSS/JS-Implementierer.
Eingabe: Rätsel-MDs + data.json + Template-Verzeichnis
Aufgaben:
- Aus `escape-games/template/` die Blanko-Vorlage kopieren nach `escape-games/[thema]/`
- data.json mit den Rätsel-Daten befüllen
- index.html, mappe-X.html, lehrkraft.html generieren
- escape-engine.js-Integration: Freischalt-Logik, localStorage-Fortschritt, Code-Eingabe, Tipp-Aufklappung
- Barrierefreiheit: ARIA-Labels, Keyboard-Navigation, Fokus-Management
- Keine externen Abhängigkeiten (alles inline oder aus /assets/)
Quellen:
- `escape-games/template/` (Blanko-Vorlage)
- `assets/js/escape-engine.js` und `assets/js/core.js` (Shared Code)
- `assets/css/base.css` (Styles)
Ausgabe: Funktionsfähiges Escape-Game-Verzeichnis mit allen HTML/CSS/JS-Dateien

### 6. `docs/AGENT_DESIGN.md`

Rolle: Visuelles Erscheinungsbild und UX.
Eingabe: Generierte HTML-Dateien
Aufgaben:
- GPG-Theme anwenden (Navy/Gold-Palette, Monospace für Archiv-Feeling)
- Responsive Design sicherstellen (Mobile-first, iPad-optimiert)
- Animationen: Freischalt-Effekt, Fortschrittsanzeige, Feedback (richtig/falsch)
- Visuelle Konsistenz über alle Mappen
- Soundeffekte integrieren (optional, mit Mute-Toggle)
Quellen:
- Design-System-Definition (wird in dieser Phase in base.css angelegt)
- Archiv 45 als visuelle Referenz (Dokument-/Akten-Ästhetik)
Ausgabe: Gestylte HTML-Dateien + ergänzte CSS-Regeln in base.css/theme-gpg.css

### 7. `docs/AGENT_QUALITAET.md`

Rolle: Browsertest und didaktischer Review.
Eingabe: Fertiges Escape-Game-Verzeichnis
Aufgaben:
- Technischer Test: Alle Links, Codes, Tipps, Fortschrittsspeicherung prüfen
- Browser-Kompatibilität: Chrome, Safari, Firefox (Desktop + Mobile)
- Console-Check: Keine JS-Fehler, keine unbehandelten Exceptions
- Didaktischer Review: Lernziel-Alignment, Schwierigkeits-Progression, ethische Sensibilität
- Barrierefreiheit: WCAG AA Kontrast, Keyboard-Navigation, Screen-Reader
- Checkliste abarbeiten (siehe Checkliste_Interaktive_Materialien.md)
Quellen:
- `docs/Checkliste_Interaktive_Materialien.md`
- Didaktisches Rahmen-Dokument (Output von AGENT_DIDAKTIK)
Ausgabe: Qualitäts-Report (Markdown) mit Pass/Fail pro Prüfpunkt + Liste offener Issues

### 8. `docs/Checkliste_Interaktive_Materialien.md`

Adaptierte Qualitäts-Checkliste (inspiriert von Falcks 52-Punkte-Liste, angepasst an dieses Projekt):

Kategorien:
1. **Funktionalität** (15 Punkte): Alle Codes funktionieren, Tipps aufklappbar, Fortschritt speichert/lädt, Lehrkraft-Login funktioniert, Navigation zwischen Mappen, Zurück-Button, Neustart-Option, Code-Eingabe mit Fehler-Feedback, Freischalt-Animation, Keine JS-Console-Fehler, Keine toten Links, Offline-Funktionalität nach Erstladung, Performance <3s Ladezeit, Keine Memory Leaks, localStorage-Fehlerbehandlung
2. **Inhalt & Didaktik** (12 Punkte): Lehrplankonformität, Lernziel-Alignment, Fachliche Korrektheit, Altersangemessene Sprache, Ethische Sensibilität bei historischen Themen, Schwierigkeits-Progression, Aufgabenvielfalt (min. 3 verschiedene Typen), Tipp-Qualität (hilfreich, nicht die Lösung verratend), Quellennachweise, Narrativer roter Faden, Korrekte Rechtschreibung/Grammatik, Begriffserklärungen bei Fachbegriffen
3. **Design & UX** (10 Punkte): Responsive (Mobile/Tablet/Desktop), Konsistentes visuelles Theme, Lesbare Schriftgrößen, WCAG AA Kontraste, Intuitive Navigation, Visuelles Feedback bei Aktionen, Fortschrittsanzeige, Kein visuelles Overload, Ästhetisch ansprechend, Ladeindikator bei Übergängen
4. **Barrierefreiheit** (8 Punkte): ARIA-Labels, Keyboard-Navigation, Fokus-Management, Screen-Reader-kompatibel, Keine rein farbbasierte Information, Alt-Texte für Bilder, Ausreichende Touch-Targets (48x48px), Textgröße skalierbar
5. **Code-Qualität** (7 Punkte): Keine externen Abhängigkeiten, Saubere Dateistruktur, Kommentierter Code, Konsistente Namenskonventionen, Keine hardcodierten Inhalte (alles aus data.json), Valides HTML5, Kein deprecated JavaScript

---

## Erfolgskriterium

- 8 Dateien unter `docs/` im Repo
- Jede Agent-MD enthält: Rolle, Eingabe, Aufgaben, Quellen (mit konkreten Dateipfaden), Ausgabe-Format
- ORCHESTRATOR.md beschreibt den vollständigen Workflow mit Reihenfolge und Iterationsregeln
- Checkliste hat 52 Prüfpunkte in 5 Kategorien
- Commit: "Phase 1: Subagent-Architektur und Qualitäts-Checkliste"
- Push auf `main`

## Nach Abschluss

Melde in Cowork:
```
Update: Phase 1 abgeschlossen.
- 7 Agenten-MDs unter docs/ erstellt
- Checkliste_Interaktive_Materialien.md mit 52 Prüfpunkten erstellt
- Commit + Push auf main
```
