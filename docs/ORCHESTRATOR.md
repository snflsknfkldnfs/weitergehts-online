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

```
START
  │
  ▼
[1] AGENT_DIDAKTIK
  │  Eingabe: thema + lehrplanbezug + jahrgangsstufe
  │  Ausgabe: Didaktisches Rahmen-Dokument
  │
  ▼
[2] AGENT_INHALT
  │  Eingabe: Didaktisches Rahmen-Dokument + thema
  │  Ausgabe: Inhalts-MDs (1 pro Mappe)
  │
  ▼
[3] AGENT_RAETSEL
  │  Eingabe: Inhalts-MDs + Didaktisches Rahmen-Dokument + mappen_anzahl
  │  Ausgabe: Rätsel-MDs (1 pro Mappe) + befüllte data.json + Narrativ
  │
  ▼
[4] AGENT_TECHNIK
  │  Eingabe: Rätsel-MDs + data.json + Template-Verzeichnis
  │  Ausgabe: Funktionsfähiges Escape-Game-Verzeichnis
  │
  ▼
[5] AGENT_DESIGN
  │  Eingabe: Generierte HTML-Dateien
  │  Ausgabe: Gestylte HTML-Dateien + CSS
  │
  ▼
[6] AGENT_QUALITAET
  │  Eingabe: Fertiges Escape-Game-Verzeichnis
  │  Ausgabe: Qualitäts-Report
  │
  ▼
QUALITÄTS-GATE
  │
  ├─ PASS → FERTIG (Ausgabe)
  │
  └─ FAIL → Rücklauf an zuständigen Agenten
       │
       └─ Iteration (max. 3 Durchläufe pro Agent)
```

## Iterationsregeln

1. **Qualitäts-Gate**: AGENT_QUALITAET bewertet mit Pass/Fail pro Prüfpunkt gemäß `docs/Checkliste_Interaktive_Materialien.md`
2. **Rücklauf-Zuordnung**: Jeder Mangel wird einem Agenten zugeordnet:
   - Fachfehler → AGENT_INHALT
   - Didaktische Mängel → AGENT_DIDAKTIK
   - Rätsel-Design-Probleme → AGENT_RAETSEL
   - Technische Bugs → AGENT_TECHNIK
   - Visuelle/UX-Probleme → AGENT_DESIGN
3. **Maximal 3 Iterationen** pro Agent pro Erstellungsdurchlauf
4. **Eskalation**: Nach 3 gescheiterten Iterationen → Meldung an Benutzer mit konkreten offenen Issues

## Datenstruktur – data.json

Alle Agenten arbeiten konsistent auf dem Schema aus `escape-games/template/data.json`:

```json
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
          "tipps": [
            {"stufe": 1, "text": "Denkanstoß ohne Lösungsverraten"},
            {"stufe": 2, "text": "Lösungsrichtung andeuten"},
            {"stufe": 3, "text": "Erklärung mit Lösung"}
          ],
          "punkte": 0
        }
      ]
    }
  ]
}
```

## Medien-Workflow

### MVP (Phase 2–4): Textbasiert

- **Keine externen Bilder oder Audio-Dateien** im MVP
- Aufgaben sind rein textbasiert + Unicode-Symbole (✅ ❌ 🔑 📁 💡 🎯)
- Visuelle Gestaltung über CSS: Hintergründe, Bordüren, Gradienten, `::before`/`::after`
- Feedback über Animationen und Farbwechsel statt Audio

### Post-MVP (Phase 5+): Medien-Erweiterung

- Public-Domain- und CC0-Quellen für Bilder (Wikimedia Commons, Pixabay)
- Lizenzprüfung pro Asset dokumentieren
- Audio-Dateien in `assets/audio/` (MP3, max. 100KB pro Datei)
- Asset-Pipeline: Beschaffung → Lizenzprüfung → Optimierung → Integration

## Konventionen

- **Dateipfade**: Immer relativ zum Repo-Root (`escape-games/[thema]/`, nicht absolute Pfade)
- **Thema-Verzeichnis**: Kebab-Case, z.B. `escape-games/industrialisierung/`
- **Keine externen Abhängigkeiten**: Alles inline oder aus `/assets/`
- **Sprache**: Alle Inhalte auf Deutsch, Code-Kommentare auf Deutsch
- **Encoding**: UTF-8 durchgehend

## Ausgabe

Fertiges Escape-Game-Verzeichnis unter `escape-games/[thema]/`:

```
escape-games/[thema]/
├── index.html          # Startseite mit Narrativ-Einführung
├── mappe-1.html        # Erste Mappe (5 Aufgaben)
├── mappe-2.html        # Zweite Mappe
├── ...
├── lehrkraft.html      # Lehrkraft-Zugang (Lösungen, Steuerung)
└── data.json           # Alle Inhalte und Konfiguration
```

## Zugehörige Agenten-Definitionen

| Agent | Datei | Verantwortungsbereich |
|---|---|---|
| Didaktik | `docs/AGENT_DIDAKTIK.md` | Lernziele, Kompetenzerwartungen, ethische Leitlinien |
| Inhalt | `docs/AGENT_INHALT.md` | Sachanalyse, fachliche Korrektheit, Quellenarbeit |
| Rätsel | `docs/AGENT_RAETSEL.md` | Aufgabendesign, Codes, Tipps, Narrativ |
| Technik | `docs/AGENT_TECHNIK.md` | HTML/CSS/JS-Implementierung, Barrierefreiheit |
| Design | `docs/AGENT_DESIGN.md` | Visuelles Theme, Responsive Design, UX |
| Qualität | `docs/AGENT_QUALITAET.md` | Test, Review, Checklisten-Abarbeitung |
