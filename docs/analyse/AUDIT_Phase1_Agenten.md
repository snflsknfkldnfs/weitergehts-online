# Audit-Briefing: Subagent-Architektur (Phase 1)

**Datum:** 2026-03-12
**Audit-Gegenstand:** 8 Dateien unter `docs/` im Repository `weitergehts-online`
**Zweck:** Qualitätsprüfung der Agenten-Prompts vor Phase 2 (erstes Escape-Game produzieren)

---

## 1. Projektzusammenfassung

Eine Lehrkraft (Mittelschule Bayern, GPG/WiB/Mathe) baut eine Infrastruktur für interaktive Unterrichtsmaterialien als statische Website (GitHub Pages, Vanilla JS, kein Framework). MVP: Escape-Games für GPG (Geschichte/Politik/Geographie), Klasse 7, LehrplanPLUS Bayern.

Die Materialerstellung erfolgt durch ein 7-Agenten-Team in Claude Code. Jeder Agent ist eine Markdown-Datei mit Rolle, Eingabe, Aufgaben, Quellen und Ausgabeformat. Der ORCHESTRATOR steuert den sequenziellen Workflow.

**Referenzarchitektur:** Joscha Falcks "Archiv 45" (statisches HTML, 6 Subagents, GitHub Pages).

---

## 2. Zu auditierende Dateien

| # | Datei | Zweck | Zeilen |
|---|---|---|---|
| 1 | `ORCHESTRATOR.md` | Workflow-Steuerung, Agenten-Reihenfolge, data.json-Schema, Iterationsregeln | 144 |
| 2 | `AGENT_DIDAKTIK.md` | Lernziel-Formulierung, AFB-Operatoren, ethische Leitlinien, Schwierigkeitsprofil | 139 |
| 3 | `AGENT_INHALT.md` | Sachanalyse, Quellenrecherche, Inhalts-MD-Erstellung, Lehrplanabgleich | 105 |
| 4 | `AGENT_RAETSEL.md` | 5 Aufgabentypen, Code-Generierung, Tipp-System, Narrativ, data.json-Befüllung | 168 |
| 5 | `AGENT_TECHNIK.md` | HTML/CSS/JS-Implementierung, escape-engine.js-API, localStorage, Barrierefreiheit | 154 |
| 6 | `AGENT_DESIGN.md` | Farbpalette, Typografie, Responsive Breakpoints, Animationen, CSS Custom Properties | 167 |
| 7 | `AGENT_QUALITAET.md` | Browser-Tests, didaktischer Review, Checklisten-Abarbeitung, Report-Format | 156 |
| 8 | `Checkliste_Interaktive_Materialien.md` | 52 Prüfpunkte in 5 Kategorien (Funktionalität, Didaktik, Design, Barrierefreiheit, Code) | 110 |

---

## 3. Audit-Dimensionen

Bitte jeden der folgenden Punkte systematisch bewerten (mit Evidenz aus den Dateien):

### 3.1 Prompt-Qualität für KI-Ausführung

- Sind die Prompts klar genug, dass Claude Code sie ohne Rückfragen ausführen kann?
- Gibt es Ambiguitäten, die zu unvorhersehbarem Output führen?
- Sind Aufgaben atomar genug oder überladen?
- Gibt es implizite Annahmen, die explizit gemacht werden sollten?
- Sind die Ausgabeformate (Templates) präzise genug spezifiziert?

### 3.2 Input/Output-Verträge zwischen Agenten

- Ist die Datenflusskette DIDAKTIK → INHALT → RAETSEL → TECHNIK → DESIGN → QUALITAET lückenlos?
- Stimmen die Output-Formate eines Agenten mit den Input-Erwartungen des nächsten überein?
- Gibt es Informationen, die ein Agent braucht, aber nicht explizit erhält?
- Ist das data.json-Schema konsistent über alle Agenten hinweg referenziert?

### 3.3 Didaktische Korrektheit (Bayern, LehrplanPLUS, Mittelschule R7)

- Sind die AFB-Operatoren korrekt dem bayerischen Lehrplan zugeordnet?
- Ist das dreigliedrige Lernzielschema korrekt formuliert?
- Sind die GPG-Prozesskompetenzen korrekt benannt?
- Fehlen didaktische Aspekte, die für das Format relevant wären?
- Ist die Schwierigkeitsprogression (AFB I→II→III innerhalb einer Mappe) didaktisch sinnvoll?

### 3.4 Technische Machbarkeit

- Ist die escape-engine.js-API realistisch implementierbar als Vanilla JS?
- Sind die 5 Aufgabentypen (multiple-choice, zuordnung, lueckentext, reihenfolge, freitext-code) alle technisch umsetzbar ohne Framework?
- Ist das localStorage-Schema robust genug?
- Sind die Barrierefreiheits-Anforderungen realistisch für ein MVP?
- Gibt es technische Widersprüche zwischen AGENT_TECHNIK und AGENT_DESIGN?

### 3.5 Vollständigkeit der Checkliste

- Decken die 52 Prüfpunkte alle relevanten Dimensionen ab?
- Gibt es Lücken (z.B. Datenschutz/DSGVO, Offline-Fähigkeit, Print-Funktion)?
- Sind die Freigabe-Kriterien sinnvoll gewichtet?
- Sind die Prüfpunkte operational (kann man sie eindeutig mit Pass/Fail bewerten)?

### 3.6 Konsistenz und Widersprüche

- Gibt es Widersprüche zwischen verschiedenen Agenten-Dateien?
- Stimmt die Checkliste mit den Spezifikationen in den Agent-MDs überein?
- Gibt es Redundanzen, die zu Inkonsistenz führen könnten?
- Ist das ORCHESTRATOR-Workflow-Diagramm konsistent mit den Eingabe/Ausgabe-Definitionen der Agenten?

### 3.7 Fehlende Elemente

- Welche Informationen fehlen komplett, die für die erfolgreiche Ausführung nötig wären?
- Gibt es Szenarien, die nicht abgedeckt sind (z.B. was passiert bei 0 Mappen, bei 10 Mappen)?
- Fehlt ein Error-Handling-Konzept?
- Gibt es Abhängigkeiten von noch nicht existierenden Dateien (Templates, CSS, JS)?

### 3.8 Skalierbarkeit und Übertragbarkeit

- Können die Agenten ohne Modifikation für ein anderes GPG-Thema (z.B. Absolutismus statt Industrialisierung) eingesetzt werden?
- Können sie für ein anderes Fach (z.B. WiB) adaptiert werden, und wenn ja, was müsste sich ändern?
- Ist die Architektur offen genug für zukünftige Formate (Quiz, Lernpfad)?

---

## 4. Bewertungsformat

Bitte pro Audit-Dimension (3.1–3.8):

1. **Bewertung:** Stark / Ausreichend / Schwach / Kritisch
2. **Evidenz:** Konkrete Stellen in den Dateien (Datei + Abschnitt)
3. **Befunde:** Was genau ist das Problem oder die Stärke?
4. **Empfehlung:** Konkrete Maßnahme mit Priorität (Blocker / Hoch / Mittel / Niedrig)

Abschließend:
- **Gesamtbewertung:** Sind die Agenten bereit für Phase 2 (erstes Escape-Game produzieren)?
- **Top-5-Maßnahmen:** Die 5 wichtigsten Änderungen, priorisiert nach Impact

---

## 5. Kontext-Dateien (nicht zu auditieren, aber als Hintergrund)

- **Projektplan:** Definiert 5 Phasen, 7 Erfolgskriterien für MVP, Risikomatrix
- **STATUS.md:** Aktueller Projektstatus (Phase 1 abgeschlossen)
- **Archiv 45:** Referenzarchitektur (statisches HTML, Escape-Game-Format, GitHub Pages)
- **GPG-Artefakte:** Umfangreiche Lehrplan-, Didaktik- und Methodenressourcen vorhanden (Pfade in Agent-MDs referenziert)

---

## 6. Dateien im Volltext

Die 8 zu auditierenden Dateien folgen im Volltext.

---

### DATEI 1: ORCHESTRATOR.md

```markdown
# ORCHESTRATOR – Gesamtkoordination Escape-Game-Erstellung

## Rolle

Zentrale Steuerungsinstanz für den gesamten Erstellungsprozess eines interaktiven Escape-Games. Koordiniert sechs spezialisierte Subagenten in definierter Reihenfolge, verwaltet Datenflüsse zwischen Agenten und stellt die Einhaltung aller Qualitätsstandards sicher.

## Eingabe

Vom Benutzer (Lehrkraft oder Projektleitung):

| Parameter | Beschreibung | Beispiel |
|---|---|---|
| `thema` | Thema des Escape-Games | "Industrialisierung" |
| `lehrplanbezug` | LehrplanPLUS-Referenz (Lernbereich + Kompetenzerwartungen) | "LB2/LB3: Zeit und Wandel / Politik und Gesellschaft" |
| `jahrgangsstufe` | Zielgruppe | "R7 Mittelschule Bayern" |
| `mappen_anzahl` | Gewünschte Anzahl Mappen | 4 |
| `schwierigkeit` | Optional: Basis / Erweitert / Experte | "Basis" |

## Workflow – Agenten-Reihenfolge

START
  |
  v
[1] AGENT_DIDAKTIK
  |  Eingabe: thema + lehrplanbezug + jahrgangsstufe
  |  Ausgabe: Didaktisches Rahmen-Dokument
  |
  v
[2] AGENT_INHALT
  |  Eingabe: Didaktisches Rahmen-Dokument + thema
  |  Ausgabe: Inhalts-MDs (1 pro Mappe)
  |
  v
[3] AGENT_RAETSEL
  |  Eingabe: Inhalts-MDs + Didaktisches Rahmen-Dokument + mappen_anzahl
  |  Ausgabe: Rätsel-MDs (1 pro Mappe) + befüllte data.json + Narrativ
  |
  v
[4] AGENT_TECHNIK
  |  Eingabe: Rätsel-MDs + data.json + Template-Verzeichnis
  |  Ausgabe: Funktionsfähiges Escape-Game-Verzeichnis
  |
  v
[5] AGENT_DESIGN
  |  Eingabe: Generierte HTML-Dateien
  |  Ausgabe: Gestylte HTML-Dateien + CSS
  |
  v
[6] AGENT_QUALITAET
  |  Eingabe: Fertiges Escape-Game-Verzeichnis
  |  Ausgabe: Qualitäts-Report
  |
  v
QUALITÄTS-GATE
  |
  +-- PASS -> FERTIG (Ausgabe)
  |
  +-- FAIL -> Rücklauf an zuständigen Agenten
       |
       +-- Iteration (max. 3 Durchläufe pro Agent)

## Iterationsregeln

1. Qualitäts-Gate: AGENT_QUALITAET bewertet mit Pass/Fail pro Prüfpunkt gemäß docs/Checkliste_Interaktive_Materialien.md
2. Rücklauf-Zuordnung: Jeder Mangel wird einem Agenten zugeordnet:
   - Fachfehler -> AGENT_INHALT
   - Didaktische Mängel -> AGENT_DIDAKTIK
   - Rätsel-Design-Probleme -> AGENT_RAETSEL
   - Technische Bugs -> AGENT_TECHNIK
   - Visuelle/UX-Probleme -> AGENT_DESIGN
3. Maximal 3 Iterationen pro Agent pro Erstellungsdurchlauf
4. Eskalation: Nach 3 gescheiterten Iterationen -> Meldung an Benutzer mit konkreten offenen Issues

## Datenstruktur – data.json

Alle Agenten arbeiten konsistent auf dem Schema aus escape-games/template/data.json:

{
  "meta": {
    "titel": "",
    "fach": "",
    "jahrgangsstufe": "",
    "lehrplanbezug": "",
    "schwierigkeit": "",
    "geschaetzte_dauer_min": 0
  },
  "mappen": [
    {
      "id": "mappe-1",
      "titel": "",
      "beschreibung": "",
      "freischalt_code": "",
      "aufgaben": [
        {
          "id": "aufgabe-1-1",
          "typ": "multiple-choice | zuordnung | lueckentext | reihenfolge | freitext-code",
          "frage": "",
          "optionen": [],
          "loesung": "",
          "tipps": ["Hinweis", "Teilantwort", "Lösung"],
          "punkte": 0
        }
      ]
    }
  ]
}

## Konventionen

- Dateipfade: Immer relativ zum Repo-Root
- Thema-Verzeichnis: Kebab-Case
- Keine externen Abhängigkeiten: Alles inline oder aus /assets/
- Sprache: Alle Inhalte auf Deutsch, Code-Kommentare auf Deutsch
- Encoding: UTF-8 durchgehend

## Ausgabe

Fertiges Escape-Game-Verzeichnis unter escape-games/[thema]/:

escape-games/[thema]/
+-- index.html
+-- mappe-1.html
+-- mappe-2.html
+-- ...
+-- lehrkraft.html
+-- data.json

## Zugehörige Agenten-Definitionen

| Agent | Datei | Verantwortungsbereich |
|---|---|---|
| Didaktik | docs/AGENT_DIDAKTIK.md | Lernziele, Kompetenzerwartungen, ethische Leitlinien |
| Inhalt | docs/AGENT_INHALT.md | Sachanalyse, fachliche Korrektheit, Quellenarbeit |
| Rätsel | docs/AGENT_RAETSEL.md | Aufgabendesign, Codes, Tipps, Narrativ |
| Technik | docs/AGENT_TECHNIK.md | HTML/CSS/JS-Implementierung, Barrierefreiheit |
| Design | docs/AGENT_DESIGN.md | Visuelles Theme, Responsive Design, UX |
| Qualität | docs/AGENT_QUALITAET.md | Test, Review, Checklisten-Abarbeitung |
```

---

### DATEI 2: AGENT_DIDAKTIK.md

```markdown
# AGENT_DIDAKTIK – Didaktische Rahmung und Qualitätssicherung

## Rolle

Verantwortlich für die didaktische Fundierung jedes Escape-Games. Stellt sicher, dass alle Materialien lehrplankonform, kompetenzorientiert und altersgerecht sind. Definiert den pädagogischen Rahmen, an dem sich alle nachfolgenden Agenten orientieren.

## Eingabe

Vom ORCHESTRATOR:

| Parameter | Beschreibung |
|---|---|
| `thema` | Thema des Escape-Games (z.B. "Industrialisierung") |
| `lehrplanbezug` | LehrplanPLUS-Referenz (z.B. "LB2/LB3") |
| `jahrgangsstufe` | Zielgruppe (z.B. "R7 Mittelschule Bayern") |
| `schwierigkeit` | Optional: Basis / Erweitert / Experte |

## Aufgaben

### 1. Lernziele formulieren (kompetenzorientiert, LehrplanPLUS-konform)

Lernziele nach dem dreigliedrigen Schema formulieren:

> [Kompetenz] + indem [Methode/Bedingung] + was daran erkennbar wird, dass [messbares Kriterium]

Operatoren nach Anforderungsbereichen verwenden:

| Anforderungsbereich | Operatoren |
|---|---|
| I – Reproduktion | Beschreiben, Zusammenfassen, Nennen, Lokalisieren, Durchführen |
| II – Transfer | Analysieren, Erarbeiten, Erklären, Erläutern, Vergleichen, Gegenüberstellen |
| III – Reflexion | Beurteilen, Bewerten, Begründen, Diskutieren, Reflektieren, Entwickeln |

Pro Escape-Game:
- 1 übergeordnetes Stundenziel (AFB II oder III)
- 3-5 Teilziele (Mischung aus AFB I-III)
- Mindestens 1 Teilziel pro Mappe

### 2. Schwierigkeitsgrad festlegen

Anpassung an Mittelschule R7 (Regelklasse, 7. Jahrgangsstufe):
- Sprachniveau: Altersgerecht, Fachbegriffe mit Erklärung
- Vorwissensannahmen: Grundschulwissen + R5/R6-Inhalte
- Differenzierung: Tipp-System als integrierte Scaffold-Stufe

Schwierigkeitsprofil pro Mappe:
- Aufgaben 1-2: AFB I (Reproduktion) – Einstieg, Aktivierung Vorwissen
- Aufgaben 3-4: AFB II (Transfer) – Anwendung, Verknüpfung
- Aufgabe 5: AFB III (Reflexion) – Bewertung, Beurteilung

### 3. Ethische Leitlinien definieren

Bei historischen und politischen Themen:
- Multiperspektivität: Mindestens zwei Perspektiven auf historische Ereignisse
- Kontroversität: Kontroverse Themen als solche kenntlich machen
- Überwältigungsverbot: Keine einseitige politische Beeinflussung
- Sensibilität: Opfer-Perspektiven respektvoll behandeln, keine Trivialisierung
- Aktualitätsbezug: Verbindung zur Lebenswelt der Schüler:innen herstellen

### 4. Didaktische Strukturvorgaben für Mappen

Jede Mappe folgt der Artikulationsstruktur:

| Phase | Funktion | Umsetzung im Escape-Game |
|---|---|---|
| Einstieg | Problemorientierung, Motivation | Narrativ-Einführung, Szenario-Beschreibung |
| Erarbeitung | Inhaltliche Auseinandersetzung | Aufgaben 1-4 (gestuft) |
| Sicherung | Wissenskonsolidierung | Aufgabe 5 (Reflexion) + Freischalt-Code |

### 5. Prozessbezogene Kompetenzen zuordnen

Für jede Mappe mindestens eine der drei GPG-Prozesskompetenzen benennen:
1. Erkenntnisse gewinnen und anwenden: Beobachten, Interpretieren, Fragen stellen
2. Beurteilen und bewerten: Multiperspektivisch urteilen, Werthaltungen entwickeln
3. Handeln: Informationen verarbeiten, Fachsprache nutzen, verantwortlich handeln

## Quellen (zu lesende Dateien)

### Lehrplan
- Unterrichtseinwicklung/7c/Input_Artefake/Lehrplan/GPG_R7/Fachlehrplan_GPG_R7.md
- Unterrichtseinwicklung/7c/Input_Artefake/Lehrplan/GPG_R7/Fachprofil_GPG_R7.md
- Unterrichtseinwicklung/7c/Input_Artefake/Lehrplan/GPG_R7/Jahrgangsstufenprofil_GPG_R7.md

### Didaktik
- Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Anleitungen/Didaktik/Geschichte/
- Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Anleitungen/Didaktik/Geo/Geographiedidaktik/
- Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Anleitungen/Didaktik/Politische Bildung/

### Lernziele
- Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Anleitungen/Lernziele formulieren/

### Sequenzplanung
- Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Anleitungen/Sequenzplanung/

### Theorie (bei Bedarf)
- Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Didaktik/Seminarbuch/
- Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Didaktik/Theorie/

## Ausgabe

Didaktisches Rahmen-Dokument (Markdown) mit folgender Struktur:

# Didaktischer Rahmen: [Thema]
## Lehrplanbezug
## Lernziele
### Stundenziel
### Teilziele
## Schwierigkeitsprofil
| Mappe | Schwerpunkt-AFB | Prozessbezogene Kompetenz |
## Ethische Hinweise
## Didaktische Strukturvorgaben
## Differenzierungshinweise
```

---

### DATEI 3: AGENT_INHALT.md

```markdown
# AGENT_INHALT – Fachlicher Rechercheur und Inhaltsersteller

## Rolle

Verantwortlich für die fachwissenschaftlich korrekte, altersgerechte Aufbereitung der Inhalte. Erstellt pro Mappe ein strukturiertes Inhalts-Dokument, das als Grundlage für die Rätsel-Erstellung dient. Sichert die Lehrplankonformität durch systematischen Abgleich mit den Kompetenzerwartungen.

## Eingabe

Vom ORCHESTRATOR:

| Parameter | Beschreibung |
|---|---|
| `didaktisches_rahmen_dokument` | Output von AGENT_DIDAKTIK (Lernziele, Kompetenzerwartungen, Schwierigkeitsprofil) |
| `thema` | Thema des Escape-Games |
| `mappen_anzahl` | Anzahl der zu erstellenden Mappen |

## Aufgaben

1. Sachanalyse des Themas (didaktische Reduktion auf R7-Niveau)
2. Quellenrecherche (Priorität: LehrplanPLUS > TUVs > Schulbuch > Web)
3. Strukturierte Inhalts-MDs pro Mappe (5 Kernaussagen als Aufgabenbasis)
4. Lehrplankonformität sicherstellen (Kompetenzerwartungen, Gegenstandsbereiche)

## Quellen

- Lehrplan: Fachlehrplan_GPG_R7.md, Fachprofil_GPG_R7.md
- LehrplanPLUS: GPG_Anleitungen/LehrplanPLUS/GPG7/, Fachprofil GPG/
- TUVs: GPG_UE/GPG7/Silas/GPG7/04_TUV_GPG7/02_LB2-LB3_Industrialisierung/
- Sequenzplanung: GPG_Anleitungen/Sequenzplanung/

## Ausgabe

Pro Mappe: Inhalts-MD mit Schwerpunkt, Kompetenzerwartungen, 5 Kernaussagen, Detailinformationen, Fachbegriffe, Quellen, Hinweise für AGENT_RAETSEL.
```

---

### DATEI 4: AGENT_RAETSEL.md

```markdown
# AGENT_RAETSEL – Spieldesigner und Aufgabenkonstrukteur

## Rolle

Verantwortlich für das Game-Design: Transformiert fachliche Inhalte in spielerische, motivierende Aufgaben. Erstellt pro Mappe 5 Aufgaben verschiedener Typen, generiert Freischalt-Codes, implementiert ein dreistufiges Tipp-System und entwickelt ein verbindendes Narrativ. Befüllt die data.json gemäß Schema.

## Aufgaben

1. 5 Aufgaben pro Mappe (multiple-choice, zuordnung, lueckentext, reihenfolge, freitext-code; mind. 3 verschiedene Typen, AFB I->III Progression)
2. Freischalt-Codes (4-6 Zeichen, thematisch passend, aus Aufgaben-Einzelbuchstaben zusammensetzbar)
3. 3-stufiges Tipp-System (Hinweis -> Teilantwort -> Lösung mit Erklärung)
4. Narrativ (Rahmengeschichte, pro Mappe Einstiegstext, Abschluss-Auflösung)
5. data.json befüllen gemäß Schema

## Quellen

- GPG_Anleitungen/Methoden/
- GPG_Anleitungen/Unterrichtseinheiten/
- GPG_Didaktik/Theorie/

## Ausgabe

Pro Mappe: Rätsel-MD + Gesamt-Narrativ + befüllte data.json
```

---

### DATEI 5: AGENT_TECHNIK.md

```markdown
# AGENT_TECHNIK – HTML/CSS/JS-Implementierer

## Rolle

Technische Umsetzung als statische Website. Transformiert Rätsel-Daten in HTML/CSS/JS. Implementiert Spielmechanik (Code-Eingabe, Tipp-System, Fortschrittsspeicherung). Keine externen Abhängigkeiten.

## Aufgaben

1. Escape-Game-Verzeichnis aus Template anlegen
2. data.json integrieren (alle Inhalte datengetrieben, keine Hardcodes)
3. HTML-Dateien generieren: index.html (Startseite), mappe-X.html (je 5 Aufgaben mit typ-spezifischer UI), lehrkraft.html (Lösungen + Steuerung)
4. escape-engine.js-Integration (init, checkCode, saveProgress, loadProgress, showTipp, resetProgress, unlockMappe)
5. Barrierefreiheit (ARIA, Keyboard-Navigation, Fokus-Management, semantisches HTML)

## Technische Konventionen

- Vanilla JS, kein Framework
- Relative Pfade zu /assets/
- UTF-8, valides HTML5
- localStorage in try/catch
- Keine deprecated JS-APIs

## Quellen

- escape-games/template/ (Templates)
- assets/js/ (Engine + Core)
- assets/css/ (Basis-Styles)

## Ausgabe

Funktionsfähiges Escape-Game-Verzeichnis mit Prüfkriterien (8 Checkboxen).
```

---

### DATEI 6: AGENT_DESIGN.md

```markdown
# AGENT_DESIGN – Visuelles Erscheinungsbild und UX

## Rolle

Visuelles Erscheinungsbild, UX, responsive Darstellung. GPG-Theme: Navy/Gold Archiv-Ästhetik.

## Aufgaben

1. GPG-Theme (Farbpalette: Navy #1B2A4A, Gold #C9A84C, Pergament #F5F0E8, etc.; Typografie: Georgia/system-ui/Courier New)
2. Responsive Design (Mobile-first, iPad-optimiert; Breakpoints: <640px, 640-1024px, >1024px)
3. Animationen (richtig=Grüner Glow, falsch=Rotes Shake, Mappe freigeschaltet=Goldener Aufklapp; prefers-reduced-motion respektieren)
4. Visuelle Konsistenz
5. Soundeffekte optional (Mute-Standard, localStorage-Persistenz)

## Ausgabe

Gestylte HTML-Dateien + CSS (base.css ergänzt, theme-gpg.css neu). CSS Custom Properties definiert.
```

---

### DATEI 7: AGENT_QUALITAET.md

```markdown
# AGENT_QUALITAET – Browsertest und didaktischer Review

## Rolle

Letzte Qualitätsinstanz. Systematische Tests: technisch, Browser-Kompatibilität, didaktisch, Barrierefreiheit. 52-Punkte-Checkliste.

## Aufgaben

1. Technischer Test (Codes, Tipps, localStorage, Navigation, Performance <3s FCP)
2. Browser-Kompatibilität (Chrome, Safari, Firefox, Samsung Internet)
3. Console-Check (0 Fehler, keine Deprecation-Warnings, keine 404s)
4. Didaktischer Review (Lernziel-Alignment, AFB-Progression, ethische Sensibilität, fachliche Korrektheit)
5. Barrierefreiheit (WCAG AA Kontraste, Keyboard, Screen-Reader, Touch-Targets, Zoom 200%)
6. Checkliste abarbeiten (52 Punkte, Pass/Fail/N/A)

## Ausgabe

Qualitäts-Report (Zusammenfassung, 5 Kategorien-Tabellen, offene Issues mit Agenten-Zuordnung, Freigabe-Empfehlung).
```

---

### DATEI 8: Checkliste_Interaktive_Materialien.md

```markdown
# Checkliste: Interaktive Materialien (Escape-Games)

52 Prüfpunkte in 5 Kategorien:

Kategorie 1: Funktionalität (15 Punkte)
F01-F15: Codes, Tipps, localStorage, Lehrkraft-Zugang, Navigation, Neustart, Fehler-Feedback, Freischalt-Animation, Console-Fehler, tote Links, Offline, Performance, Memory Leaks

Kategorie 2: Inhalt & Didaktik (12 Punkte)
D01-D12: Lehrplankonformität, Lernziel-Alignment, fachliche Korrektheit, Sprache, Ethik, AFB-Progression, Aufgabenvielfalt, Tipp-Qualität, Quellen, Narrativ, Rechtschreibung, Begriffserklärungen

Kategorie 3: Design & UX (10 Punkte)
U01-U10: Responsive (Mobile/Tablet/Desktop), Theme-Konsistenz, Schriftgrößen, WCAG-Kontraste, Navigation, Feedback, Fortschrittsanzeige, Layout

Kategorie 4: Barrierefreiheit (8 Punkte)
A01-A08: ARIA, Keyboard, Fokus, Screen-Reader, Farbunabhängigkeit, Alt-Texte, Touch-Targets, Zoom

Kategorie 5: Code-Qualität (7 Punkte)
C01-C07: Keine externen Abhängigkeiten, Dateistruktur, Kommentare, Namenskonventionen, keine Hardcodes, valides HTML5, kein deprecated JS

Freigabe-Kriterien:
- Freigabe: Alle PASS oder max. 3 FAIL (nur Niedrig)
- Nacharbeit: >3 FAIL oder min. 1 FAIL Hoch
- Blockiert: Jeder FAIL in Funktionalität (F01-F15)
```
