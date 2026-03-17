# Übergabe-Prompt: Phase 2 – Template-Engine

## Kontext

Repository: `weitergehts-online` (GitHub: snflsknfkldnfs/weitergehts-online)
Lokaler Pfad: `/Users/paulad/weitergehts.online/weitergehts-online/`
Aktuelle Phase: Phase 1 abgeschlossen (Agenten-Architektur + Audit-Fixes). Phase 2 beginnt.

Phase 2 löst Blocker B1: Die Agenten (insbesondere AGENT_TECHNIK) referenzieren Template-Dateien und Shared Code, die noch nicht existieren. Diese Dateien werden jetzt erstellt.

Lies vor Beginn diese Dateien zur Orientierung:
- `docs/agents/ORCHESTRATOR.md` (data.json-Schema, Workflow)
- `docs/agents/AGENT_TECHNIK.md` (API-Signaturen, HTML-Struktur, Barrierefreiheit)
- `docs/agents/AGENT_DESIGN.md` (Farbpalette, Typografie, CSS Custom Properties, Breakpoints, Animationen)

## Aufgabe

Erstelle die Template-Engine: alle Shared-Code-Dateien und Template-Dateien, die die Agenten als Infrastruktur voraussetzen.

### 1. `assets/css/base.css` – Basis-Stylesheet

CSS-Reset, Grundlayout, Utility-Klassen. Fach-agnostisch (kein GPG-Theme hier).

Inhalt:
- Moderner CSS-Reset (box-sizing, margin/padding)
- CSS Custom Properties aus AGENT_DESIGN.md (Farben, Fonts, Abstände, Rundungen, Schatten) -- als Defaults, überschreibbar durch Theme-Dateien
- Grundlayout: `<main>`, `<nav>`, `<header>`, `<footer>`
- Utility-Klassen: `.visually-hidden`, `.no-scroll`, `.fade-in`
- Responsive Breakpoints (Mobile < 640px, Tablet 640-1024px, Desktop > 1024px)
- Print-Reset: `@media print` Grundregeln
- `prefers-reduced-motion`: Alle Animationen/Transitions deaktivieren
- Touch-Targets: Minimum 48x48px für interaktive Elemente
- Fokus-Styles: Sichtbare `:focus-visible` Outlines

### 2. `assets/css/themes/theme-gpg.css` – GPG-Theme

Überschreibt/ergänzt base.css für das GPG-Archiv-/Akten-Theme.

Inhalt:
- Custom Properties mit GPG-Werten (Navy #1B2A4A, Gold #C9A84C, Pergament #F5F0E8, etc.)
- Typografie: Georgia für Überschriften, system-ui für Body, Courier New für Code
- Aufgaben-Karten-Styles (BEM: `.aufgabe`, `.aufgabe__header`, `.aufgabe__body`, `.aufgabe__feedback`)
- Mappe-Karten-Styles (`.mappe`, `.mappe--locked`, `.mappe--completed`)
- Tipp-Bereich-Styles (`.tipp`, `.tipp--stufe-1`, `.tipp--stufe-2`, `.tipp--stufe-3`)
- Fortschrittsbalken (`.fortschritt`, `.fortschritt__bar`)
- Code-Eingabe-Styles (`.code-eingabe`, `.code-eingabe--success`, `.code-eingabe--error`)
- Animationen (Keyframes): `richtig-glow`, `falsch-shake`, `mappe-unlock`, `tipp-expand`, `fade-in`
- Responsive Anpassungen für GPG-spezifische Elemente
- Print-Stylesheet für lehrkraft.html

### 3. `assets/js/core.js` – Shared Utilities

Gemeinsame Logik für alle interaktiven Formate (nicht nur Escape-Games).

```javascript
// Module (IIFE oder ES-Module mit <script type="module">)
const Core = {
  // localStorage-Wrapper (try/catch)
  storage: {
    get(key),           // → parsed JSON oder null
    set(key, value),    // → boolean (success)
    remove(key),        // → void
    clear()             // → void
  },

  // Navigation
  nav: {
    goTo(url),          // → void (relative URL)
    goBack(),           // → void
    getCurrentPage()    // → string (Dateiname ohne .html)
  },

  // Feedback-Animationen
  feedback: {
    showSuccess(element, message),  // → void (grüner Glow + Text)
    showError(element, message),    // → void (rotes Shake + Text)
    showInfo(element, message)      // → void (Info-Hinweis)
  },

  // Utilities
  utils: {
    debounce(fn, ms),       // → function
    generateId(),           // → string (unique ID)
    shuffleArray(arr),      // → array (Fisher-Yates)
    sanitizeHTML(str)       // → string (XSS-safe)
  }
};
```

### 4. `assets/js/escape-engine.js` – Escape-Game-Engine

Spezifische Spielmechanik. Nutzt `Core` für Storage und Feedback.

API-Signaturen (aus AGENT_TECHNIK.md nach Audit-Fix H3):
```javascript
const EscapeEngine = {
  init(mappeId),
  // → void. Lädt data.json, initialisiert State, rendert Aufgaben.

  checkCode(mappeId, eingabe),
  // → { correct: boolean, message: string }

  saveProgress(mappeId, aufgabeIndex, solved),
  // → void. Schreibt in localStorage.

  loadProgress(mappeId),
  // → { aufgaben: boolean[], abgeschlossen: boolean }

  showTipp(mappeId, aufgabeIndex, stufe),
  // → string. Stufe 1|2|3 aus data.json.

  resetProgress(),
  // → void. Löscht allen Fortschritt.

  unlockMappe(mappeId)
  // → void. Für Lehrkraft-Zugang.
};
```

localStorage-Schema:
```json
{
  "escape-[thema]": {
    "mappen": {
      "mappe-1": {
        "abgeschlossen": false,
        "aufgaben": {
          "aufgabe-1-1": { "geloest": false, "tipps_genutzt": 0 },
          "aufgabe-1-2": { "geloest": false, "tipps_genutzt": 0 }
        }
      }
    },
    "letzteAktivitaet": "ISO-8601"
  }
}
```

Aufgabentyp-Renderer (5 Typen):
- `multiple-choice`: Radio-Buttons, 4 Optionen, Submit-Button
- `zuordnung`: Dropdown-Selects (NICHT Drag-and-Drop, siehe Audit-Fix H4)
- `lueckentext`: Input-Felder inline im Text, Validierung pro Feld
- `reihenfolge`: Nummerierte Einträge mit Hoch/Runter-Buttons (kein D&D)
- `freitext-code`: Textarea, Eingabe wird zu Code transformiert

Jeder Renderer muss:
- data.json als Datenquelle nutzen (keine hardcodierten Inhalte)
- BEM-Klassen verwenden (`.aufgabe__option`, `.aufgabe__eingabe`, etc.)
- ARIA-Labels setzen
- Keyboard-navigierbar sein
- Bei Lösung: `Core.feedback.showSuccess()` + `EscapeEngine.saveProgress()`
- Bei Fehler: `Core.feedback.showError()` + Hinweis auf Tipps

### 5. Template-Dateien unter `escape-games/template/`

#### `escape-games/template/index.html` – Startseiten-Template

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><!-- aus data.json.meta.titel --></title>
  <link rel="stylesheet" href="../../assets/css/base.css">
  <link rel="stylesheet" href="../../assets/css/themes/theme-gpg.css">
</head>
<body>
  <header><!-- Titel, Fach, Beschreibung --></header>
  <main>
    <section class="narrativ"><!-- Rahmengeschichte --></section>
    <section class="mappen-uebersicht">
      <!-- Pro Mappe: Karte mit Status (gesperrt/offen/abgeschlossen) -->
    </section>
  </main>
  <footer><!-- Impressum, Lehrkraft-Link --></footer>
  <script src="../../assets/js/core.js"></script>
  <script src="../../assets/js/escape-engine.js"></script>
  <script>
    // Initialisierung: data.json laden, Mappen-Status rendern
  </script>
</body>
</html>
```

Platzhalter-Kommentare wo Inhalte aus data.json eingefügt werden.

#### `escape-games/template/mappe-template.html` – Mappe-Template

Enthält:
- Header mit Mappe-Titel + Fortschrittsbalken
- 5 Aufgaben-Slots (Platzhalter, werden durch escape-engine.js dynamisch befüllt)
- Code-Eingabefeld am Ende
- Tipp-Buttons (3 Stufen)
- Navigation (Zurück / Zur Übersicht / Weiter)
- Semantisches HTML: `<main>`, `<section>`, `<article>` für jede Aufgabe

#### `escape-games/template/lehrkraft.html` – Lehrkraft-Template

Enthält:
- Einfaches Passwort-Gate (clientseitig, kein echter Schutz, nur Convenience)
- Alle Lösungen im Klartext (aus data.json gelesen)
- Alle Freischalt-Codes
- Buttons: Mappe freischalten, Fortschritt zurücksetzen
- Druckbare Übersicht (`@media print`)
- Didaktische Hinweise (Platzhalter)

#### `escape-games/template/data.json` – Schema-Datei

Leeres aber valides JSON nach dem Schema aus ORCHESTRATOR.md. tipps als Objekt-Array (Audit-Fix H1):

```json
{
  "meta": {
    "titel": "",
    "fach": "",
    "jahrgangsstufe": "",
    "lehrplanbezug": "",
    "schwierigkeit": "",
    "geschaetzte_dauer_min": 0,
    "narrativ": ""
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
          "typ": "multiple-choice",
          "frage": "",
          "optionen": [],
          "loesung": "",
          "tipps": [
            { "stufe": 1, "text": "" },
            { "stufe": 2, "text": "" },
            { "stufe": 3, "text": "" }
          ],
          "punkte": 0
        }
      ]
    }
  ]
}
```

### 6. Verzeichnis `assets/css/themes/` anlegen

Falls noch nicht vorhanden, Verzeichnis erstellen.

### 7. Bestehende Placeholder-Dateien aktualisieren

Das Repo enthält möglicherweise leere Placeholder-Dateien (z.B. leere base.css, core.js). Diese mit dem echten Inhalt überschreiben.

## Technische Konventionen

- **Kein Framework**, kein CDN, kein npm, kein Build-Step
- **Vanilla JS**: IIFE-Pattern oder `<script type="module">`
- **BEM-Klassennamen**: `.block__element--modifier`
- **UTF-8** durchgehend
- **Relative Pfade**: `../../assets/` von Template-Verzeichnis
- **Kommentare**: Deutsch
- **Fehlerbehandlung**: localStorage in try/catch, JSON.parse mit Fallback, data.json-Fetch in try/catch
- **Keine hardcodierten Inhalte**: Alles aus data.json

## Erfolgskriterium

1. `assets/css/base.css` existiert mit Reset, Custom Properties, Responsive Breakpoints, Utility-Klassen
2. `assets/css/themes/theme-gpg.css` existiert mit GPG-Farbpalette, Typografie, Aufgaben-Karten, Animationen
3. `assets/js/core.js` existiert mit Storage-Wrapper, Navigation, Feedback-Animationen, Utilities
4. `assets/js/escape-engine.js` existiert mit allen 7 Funktionen (init, checkCode, saveProgress, loadProgress, showTipp, resetProgress, unlockMappe) und 5 Aufgabentyp-Renderern
5. `escape-games/template/index.html` existiert als befüllbares Startseiten-Template
6. `escape-games/template/mappe-template.html` existiert als befüllbares Mappe-Template
7. `escape-games/template/lehrkraft.html` existiert als Lehrkraft-Template mit Passwort-Gate
8. `escape-games/template/data.json` existiert als valides, leeres Schema (tipps als Objekt-Array)
9. Alle HTML-Dateien laden ohne Fehler im Browser (auch ohne data.json-Inhalte -- graceful fallback)
10. Alle JS-Dateien haben keine Syntax-Fehler (prüfe mit `node --check`)
11. Alles committed und auf `main` gepusht

## Hinweis zur Qualität

Dies ist die Infrastruktur, auf der alle Agenten aufbauen. Robustheit ist wichtiger als Features. Lieber weniger Animationen und dafür solide Fehlerbehandlung. Die Agenten (insbesondere AGENT_TECHNIK) werden diese Dateien als gegebene Infrastruktur nutzen, nicht modifizieren.

## Nach Abschluss

Melde den Abschluss in Cowork mit: "Update: Phase 2 Template-Engine erledigt. Ergebnis: [Liste der erstellten Dateien + Zusammenfassung der Funktionalität]"
