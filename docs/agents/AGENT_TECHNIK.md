# AGENT_TECHNIK – HTML/CSS/JS-Implementierer

## Rolle

Verantwortlich für die technische Umsetzung des Escape-Games als statische Website. Transformiert die Rätsel-Daten in funktionsfähige HTML/CSS/JS-Dateien. Implementiert die Spielmechanik (Code-Eingabe, Tipp-System, Fortschrittsspeicherung) und stellt Barrierefreiheit sicher. Keine externen Abhängigkeiten.

## Eingabe

Vom ORCHESTRATOR:

| Parameter | Beschreibung |
|---|---|
| `raetsel_mds` | Rätsel-MDs pro Mappe (Output von AGENT_RAETSEL) |
| `data_json` | Befüllte data.json (Output von AGENT_RAETSEL) |
| `template_verzeichnis` | `escape-games/template/` als Blanko-Vorlage |

## Abgrenzung zu AGENT_DESIGN

> **AGENT_TECHNIK** erzeugt funktionales HTML mit semantischer Struktur und CSS-Klassen. Er definiert **keine** Farben, Fonts, Abstände oder Animationen.
>
> **AGENT_DESIGN** füllt die Klassen mit visuellem Styling. Er arbeitet **ausschließlich in CSS-Dateien** und ändert kein HTML.

| Verantwortung | AGENT_TECHNIK | AGENT_DESIGN |
|---|---|---|
| HTML-Struktur & Semantik | ✅ | ❌ |
| CSS-Klassennamen (BEM) | ✅ (definiert) | ✅ (stylt) |
| ARIA-Labels & Accessibility-Attribute | ✅ | ❌ |
| Farben, Fonts, Abstände | ❌ | ✅ |
| Animationen & Transitions | ❌ | ✅ |
| Responsive Breakpoints | ❌ | ✅ |
| JavaScript-Logik | ✅ | ❌ |
| Inline-Styles | ❌ (verboten) | ❌ (verboten) |

### BEM-Klassennamen-Konvention

AGENT_TECHNIK verwendet BEM-artige Klassennamen, die AGENT_DESIGN dann stylt:

```html
<!-- Beispiel: Aufgabe -->
<section class="aufgabe aufgabe--multiple-choice">
  <h3 class="aufgabe__titel">...</h3>
  <div class="aufgabe__inhalt">
    <div class="aufgabe__optionen">
      <label class="aufgabe__option">
        <input type="radio" class="aufgabe__input" />
        <span class="aufgabe__label">...</span>
      </label>
    </div>
  </div>
  <div class="aufgabe__feedback aufgabe__feedback--success">...</div>
  <div class="aufgabe__tipps">
    <button class="tipp__trigger">Tipp 1</button>
    <div class="tipp__inhalt">...</div>
  </div>
</section>

<!-- Loesungswort-Bereich (unterhalb des Material/Fragebogen-Grids, initial unsichtbar) -->
<section class="loesungswort-bereich loesungswort-bereich--aktiv">
  <div class="loesungscode-sektion">
    <h3 class="loesungscode__titel">Lösungswort</h3>
    <p class="code-hinweis">Löse die Aufgaben, um Buchstaben freizuschalten. Ziehe sie an die richtige Stelle!</p>
    <div class="code-ziel" id="code-ziel">
      <div class="code-ziel__feld" data-position="0"></div>
      <!-- ... ein Feld pro Buchstabe des freischalt_code -->
    </div>
    <div class="code-pool" id="code-pool">
      <!-- Buchstaben-Tiles werden dynamisch generiert (Fisher-Yates-Shuffle) -->
      <!-- Erscheinen ALLE GLEICHZEITIG wenn solved === total -->
    </div>
  </div>
</section>

<!-- Beispiel: Mappe -->
<main class="mappe">
  <header class="mappe__header">
    <h1 class="mappe__titel">...</h1>
    <div class="mappe__fortschritt">...</div>
  </header>
  <div class="mappe__inhalt">...</div>
  <nav class="mappe__navigation">...</nav>
</main>
```

## Aufgaben

### 1. Escape-Game-Verzeichnis anlegen

```bash
# Template kopieren
cp -r escape-games/template/ escape-games/[thema]/
```

Zielstruktur:
```
escape-games/[thema]/
├── index.html          # Startseite mit Narrativ
├── mappe-1.html        # Mappe 1 (5 Aufgaben)
├── mappe-2.html        # Mappe 2
├── ...
├── lehrkraft.html      # Lehrkraft-Zugang
└── data.json           # Alle Daten
```

### Mappe-Dateien aus Template erstellen

Bei der Erstellung eines konkreten Escape-Games kopiert AGENT_TECHNIK das Template-Verzeichnis und erstellt pro Mappe eine eigene HTML-Datei:

1. Template-Verzeichnis kopieren: `cp -r escape-games/template/ escape-games/[thema]/`
2. `mappe-template.html` wird pro Mappe kopiert:
   - `mappe-template.html` → `mappe-1.html` (für `mappe-1`)
   - `mappe-template.html` → `mappe-2.html` (für `mappe-2`)
   - usw.
3. Die Mappe-ID wird automatisch aus dem Dateinamen abgeleitet (`mappe-1.html` → `mappeId = "mappe-1"`)
4. `mappe-template.html` kann nach dem Kopieren gelöscht werden
5. Die `data.json` muss die korresponierenden Mappe-IDs (`mappe-1`, `mappe-2`, ...) enthalten

**Wichtig**: Die ID-Konvention `mappe-{N}` ist technisch erforderlich (siehe ORCHESTRATOR.md). Die Navigation zwischen Mappen basiert auf numerischen IDs.

### 2. data.json integrieren

- Die von AGENT_RAETSEL befüllte `data.json` in das Thema-Verzeichnis kopieren
- Validierung: JSON-Schema-Konformität prüfen
- Alle HTML-Dateien lesen ihre Inhalte aus `data.json` (keine hardcodierten Inhalte)

### 3. HTML-Dateien generieren

#### index.html (Startseite)
- Titel und Beschreibung aus `data.json.meta`
- Narrativ-Einführung (Rahmengeschichte)
- Mappen-Übersicht mit Fortschrittsanzeige
- Start-Button zur ersten Mappe
- Verweis auf `../../assets/css/base.css` und `../../assets/js/core.js`

#### mappe-X.html (pro Mappe)
- 5 Aufgaben sequenziell dargestellt
- Aufgabentyp-spezifische UI-Elemente (Rendering-Kontrakte in SUB_AUFGABE_*.md):
  - `multiple-choice`: Radio-Buttons mit 4 Optionen — Details: `docs/agents/SUB_AUFGABE_MC.md`
  - `zuordnung`: Dropdown-Zuordnung (linke Spalte: Begriffe fest, rechte Spalte: `<select>`-Dropdowns) — Details: `docs/agents/SUB_AUFGABE_ZUORDNUNG.md`
  - `lueckentext`: Input-Felder im Text — Details: `docs/agents/SUB_AUFGABE_LUECKENTEXT.md`
  - `reihenfolge`: Sortierbare Liste (Drag-and-Drop) — Details: `docs/agents/SUB_AUFGABE_REIHENFOLGE.md`
  - `freitext-code`: Textarea + Keyword-Validierung — Details: `docs/agents/SUB_AUFGABE_FREITEXT.md`
- Tipp-Aufklapp-Buttons (3 Stufen, sequentiell freigeschaltet: Tipp 2 erst nach Tipp 1)
- Mappe-Statistik: Tipp-Counter (gewichtet) + Fehlversuche-Counter
- Loesungswort-Bereich (unterhalb des Grids, initial unsichtbar): Erscheint nach Loesung aller Aufgaben. Buchstaben des `freischalt_code` als DnD-Tiles in zufaelliger Reihenfolge. Korrekte Anordnung → Sicherung/Hefteintrag freigeschaltet.
- Navigation: Zurück / Weiter / Zur Übersicht
- Fortschrittsanzeige: "X von Y" + Dot-Indikatoren

#### lehrkraft.html (Lehrkraft-Zugang)
- Alle Lösungen im Klartext
- Alle Freischalt-Codes
- Steuerungsmöglichkeiten: Fortschritt zurücksetzen, Mappe freischalten
- Didaktische Hinweise (aus Didaktischem Rahmen-Dokument)
- Druckbare Übersicht

### 4. escape-engine.js-Integration

Funktionalitäten (implementiert in `assets/js/escape-engine.js`):

```javascript
/**
 * EscapeEngine API – Signaturen (finalisiert in Phase 2)
 *
 * @param {string} mappeId     - z.B. "mappe-1"
 * @param {number} aufgabeIndex - 0-basierter Index der Aufgabe in der Mappe
 * @param {1|2|3}  stufe       - Tipp-Stufe (1=Denkanstoß, 2=Richtung, 3=Lösung)
 */

// Initialisierung: Lädt data.json, setzt Event-Listener, stellt Fortschritt wieder her
EscapeEngine.init(mappeId: string) → void

// Loesungswort aktivieren: Wird intern aufgerufen wenn solved === total.
// Shuffled Buchstaben des freischalt_code, rendert Tiles im Pool, macht Bereich sichtbar.
// KEIN manueller Aufruf noetig — wird automatisch durch _updateFortschritt getriggert.
// EscapeEngine._aktiviereLoesungswort(mappe) → void (intern)

// Fortschritt speichern: Schreibt aktuellen Aufgaben-Status + Antwort-State in localStorage
EscapeEngine.saveProgress(mappeId: string, aufgabeIndex: number, solved: boolean)
  → void

// Fortschritt laden: Liest gespeicherten Status aus localStorage
EscapeEngine.loadProgress(mappeId: string)
  → { aufgaben: boolean[], abgeschlossen: boolean, fehlversuche: number, tipp_punkte: number }

// Tipp anzeigen: Gibt den Tipp-Text für eine bestimmte Stufe zurück
EscapeEngine.showTipp(mappeId: string, aufgabeIndex: number, stufe: 1|2|3)
  → string

// Fortschritt zurücksetzen: Löscht alle localStorage-Einträge für dieses Game
EscapeEngine.resetProgress()
  → void

// Mappe freischalten (Lehrkraft): Überspringt Loesungswort-Puzzle
EscapeEngine.unlockMappe(mappeId: string)
  → void
```

localStorage-Schema:
```json
{
  "escape-[thema]": {
    "mappen": {
      "mappe-1": {
        "abgeschlossen": true,
        "fehlversuche": 2,
        "tipp_punkte": 4,
        "platzierte_buchstaben": { "position-0": "P", "position-3": "V" },
        "aufgaben": {
          "aufgabe-0": {
            "geloest": true,
            "tipps_genutzt": 2,
            "antwort_state": { "selected": "...", "eliminated": ["..."] }
          }
        }
      },
      "mappe-2": { "abgeschlossen": false, "aufgaben": {} }
    },
    "letzteAktivitaet": "2024-01-15T10:30:00Z"
  }
}
```

### 5. Barrierefreiheit sicherstellen

- **ARIA-Labels**: Alle interaktiven Elemente (`aria-label`, `aria-describedby`, `role`)
- **Keyboard-Navigation**: Tab-Reihenfolge, Enter/Space für Aktionen, Escape zum Schließen
- **Fokus-Management**: Fokus nach Aufgabenabschluss auf Feedback-Element, nach Tipp-Klick auf Tipp-Text
- **Semantisches HTML**: `<main>`, `<nav>`, `<section>`, `<article>`, `<button>` statt `<div>`
- **Alternativtexte**: Alle Bilder mit `alt`-Attribut

### 6. Technische Konventionen

- **Keine externen Abhängigkeiten**: Kein CDN, kein npm, kein Framework
- **Alle Ressourcen aus `/assets/`**: CSS, JS, Bilder, Audio
- **Relative Pfade**: `../../assets/css/base.css` (von Thema-Verzeichnis aus)
- **UTF-8**: `<meta charset="UTF-8">` in allen HTML-Dateien
- **Valides HTML5**: W3C-konform, keine deprecated Elemente
- **Kein deprecated JavaScript**: Kein `document.write`, `eval`, `with`
- **Fehlerbehandlung**: localStorage-Zugriff in try/catch, JSON.parse mit Fallback

## Quellen (zu lesende Dateien)

### Template
- `escape-games/template/index.html` – Startseiten-Template
- `escape-games/template/mappe-template.html` – Mappe-Template
- `escape-games/template/lehrkraft.html` – Lehrkraft-Template
- `escape-games/template/data.json` – Daten-Schema

### Rendering-Kontrakte — Aufgaben (Typ-Registry)
- `docs/agents/SUB_AUFGABE_MC.md` – MC: data.json Schema, BEM-Klassen, JS-Validierung
- `docs/agents/SUB_AUFGABE_ZUORDNUNG.md` – Zuordnung: data.json Schema, BEM-Klassen, JS-Validierung
- `docs/agents/SUB_AUFGABE_LUECKENTEXT.md` – Lueckentext: data.json Schema, BEM-Klassen, JS-Validierung
- `docs/agents/SUB_AUFGABE_REIHENFOLGE.md` – Reihenfolge: data.json Schema, BEM-Klassen, JS-Validierung
- `docs/agents/SUB_AUFGABE_FREITEXT.md` – Freitext: data.json Schema, BEM-Klassen, JS-Validierung

### Rendering-Kontrakte — Materialien (7 SUB_MATERIAL_*)
- `docs/agents/SUB_MATERIAL_DARSTELLUNGSTEXT.md` – darstellungstext: JSON-Schema, HTML-Tags, Wortbudget
- `docs/agents/SUB_MATERIAL_QUELLENTEXT.md` – quellentext: Dreischritt (Einleitung/Wortlaut/Impulse), JSON-Schema
- `docs/agents/SUB_MATERIAL_BILDQUELLE.md` – bildquelle: Bild-Pfad, 3-Funktions-Bildunterschrift, Lizenz
- `docs/agents/SUB_MATERIAL_KARTE.md` – karte→bildquelle: Legende, Orientierungshilfen, Erschliessungsimpuls
- `docs/agents/SUB_MATERIAL_ZEITLEISTE.md` – zeitleiste: Eintraege-Array, Leitfrage, Ankerpunkte
- `docs/agents/SUB_MATERIAL_STATISTIK.md` – statistik→zeitleiste/bildquelle: Diagrammtyp, Datenpunkte
- `docs/agents/SUB_MATERIAL_TAGEBUCH.md` – tagebuch→quellentext: Figurkonstruktion, Erzaehlprinzipien
- `docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md` – Zentrale Qualitaetskriterien (M1-M12 + typ-spezifisch)

### Shared Code
- `assets/js/escape-engine.js` – Escape-Game-Engine
- `assets/js/core.js` – Gemeinsame Logik
- `assets/css/base.css` – Basis-Styles

## Ausgabe

Funktionsfähiges Escape-Game-Verzeichnis:

```
escape-games/[thema]/
├── index.html          # Startseite (referenziert data.json)
├── mappe-1.html        # Mappe 1 mit 5 Aufgaben
├── mappe-2.html        # Mappe 2 mit 5 Aufgaben
├── ...                 # Weitere Mappen
├── lehrkraft.html      # Lehrkraft-Zugang
└── data.json           # Befüllte Spieldaten
```

Prüfkriterien vor Übergabe an AGENT_DESIGN:
- [ ] Alle HTML-Dateien laden fehlerfrei im Browser
- [ ] data.json wird korrekt gelesen und dargestellt
- [ ] Code-Eingabe funktioniert (richtig → Freischaltung, falsch → Fehlermeldung)
- [ ] Tipps klappen auf (Stufe 1, 2, 3)
- [ ] Fortschritt wird in localStorage gespeichert und geladen
- [ ] Lehrkraft-Seite zeigt alle Lösungen
- [ ] Keine JS-Console-Fehler
- [ ] Keyboard-Navigation möglich
