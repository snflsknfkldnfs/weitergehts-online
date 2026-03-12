# AGENT_DESIGN – Visuelles Erscheinungsbild und UX

## Rolle

Verantwortlich für das visuelle Erscheinungsbild, die User Experience und die responsive Darstellung aller Escape-Game-Seiten. Wendet ein konsistentes GPG-Theme an, implementiert Animationen und Feedback-Mechanismen, und stellt sicher, dass die Materialien auf allen Geräten (Mobile, Tablet, Desktop) optimal nutzbar sind.

## Eingabe

Vom ORCHESTRATOR:

| Parameter | Beschreibung |
|---|---|
| `html_dateien` | Generierte HTML-Dateien (Output von AGENT_TECHNIK) |
| `thema_verzeichnis` | `escape-games/[thema]/` |

## Abgrenzung zu AGENT_TECHNIK

> **AGENT_DESIGN** arbeitet **ausschließlich in CSS-Dateien** (`base.css`, `theme-gpg.css`). Er ändert **kein HTML** und **kein JavaScript**.
>
> **AGENT_TECHNIK** liefert funktionales HTML mit BEM-Klassennamen (z.B. `.aufgabe__titel`, `.mappe__header`, `.code__input`). AGENT_DESIGN stylt diese Klassen.

| Verantwortung | AGENT_DESIGN | AGENT_TECHNIK |
|---|---|---|
| Farben, Fonts, Abstände | ✅ | ❌ |
| Animationen & Transitions | ✅ | ❌ |
| Responsive Breakpoints | ✅ | ❌ |
| CSS Custom Properties | ✅ (definiert) | ❌ |
| HTML-Struktur & Semantik | ❌ | ✅ |
| CSS-Klassennamen (BEM) | ✅ (stylt) | ✅ (definiert) |
| JavaScript-Logik | ❌ | ✅ |
| Inline-Styles | ❌ (verboten) | ❌ (verboten) |

## Aufgaben

### 1. GPG-Theme anwenden

**Farbpalette – Archiv-/Akten-Ästhetik:**

| Rolle | Farbe | Hex | Verwendung |
|---|---|---|---|
| Primary | Navy | `#1B2A4A` | Header, Buttons, Überschriften |
| Secondary | Gold | `#C9A84C` | Akzente, Fortschrittsbalken, Codes |
| Background | Pergament | `#F5F0E8` | Seitenhintergrund |
| Surface | Leinen | `#EDE8DD` | Karten, Aufgabenbereiche |
| Text | Dunkelbraun | `#2C2416` | Fließtext |
| Success | Grün | `#2D6A4F` | Richtig-Feedback |
| Error | Rot | `#9B2226` | Falsch-Feedback |
| Tipp | Blaugrau | `#4A6FA5` | Tipp-Bereiche |

**Typografie:**

| Element | Font | Fallback | Größe |
|---|---|---|---|
| Überschriften | Georgia | serif | 1.5–2rem |
| Fließtext | system-ui | sans-serif | 1rem (16px) |
| Code/Eingaben | "Courier New" | monospace | 1.1rem |
| Hinweise | system-ui | sans-serif | 0.875rem |

**Designsprache:**
- Archiv-/Akten-Feeling: Papierstruktur-Andeutungen, leichte Schatten, dezente Bordüren
- Keine überladenen Effekte – Fokus auf Lesbarkeit und Inhalt
- Konsistente Ikonografie (Unicode-Symbole, keine Icon-Libraries)

### 2. Responsive Design (Mobile-first, iPad-optimiert)

**Breakpoints:**

| Gerät | Breite | Layout |
|---|---|---|
| Mobile | < 640px | Einspaltiges Layout, gestapelte Elemente |
| Tablet | 640px – 1024px | Optimiert für iPad (Hochformat + Querformat) |
| Desktop | > 1024px | Zweispaltiges Layout möglich (Navigation + Inhalt) |

**Mobile-Prioritäten:**
- Touch-Targets mindestens 48x48px
- Keine Hover-abhängige Funktionalität
- Swipe-Gesten für Mappen-Navigation (optional)
- Schriftgröße mindestens 16px (verhindert iOS-Zoom bei Input-Fokus)

**iPad-Optimierung:**
- Klassenzimmer-Kontext: Oft im Querformat genutzt
- Genug Platz für Aufgabe + Tipp-Bereich nebeneinander
- Große Buttons für Gruppenarbeit (mehrere Schüler:innen am Gerät)

### 3. Animationen und Feedback

| Aktion | Animation | Dauer |
|---|---|---|
| Richtige Antwort | Grüner Glow + Check-Symbol + Confetti-Partikel (CSS) | 600ms |
| Falsche Antwort | Rotes Shake + X-Symbol | 400ms |
| Mappe freigeschaltet | Goldener Aufklapp-Effekt + Code-Einblendung | 800ms |
| Tipp aufklappen | Sanftes Ausfahren (max-height Transition) | 300ms |
| Fortschrittsbalken | Smooth Width-Transition | 500ms |
| Seiten-Übergang | Fade-In | 200ms |

**Grundsätze:**
- `prefers-reduced-motion` respektieren: Alle Animationen deaktivieren bei Systemeinstellung
- Keine Animationen, die vom Inhalt ablenken
- Feedback immer auch textuell (nicht nur visuell)

### 4. Visuelle Konsistenz über alle Mappen

- Einheitliches Header-Layout (Titel, Fortschritt, Navigation)
- Gleiche Abstände und Proportionen
- Konsistente Aufgaben-Karten (gleiche Rundung, Schatten, Padding)
- Wiederkehrende visuelle Elemente (Mappe-Icon, Schlüssel-Icon, Tipp-Icon)
- Farbkonsistenz: Jede Mappe kann eine Akzentfarbe haben, Grundpalette bleibt

### 5. Soundeffekte (Post-MVP, nicht in Phase 2)

> **MVP-Regel**: Im MVP keine externen Audio-Dateien. Visuelles Feedback (Animationen, Farbwechsel, Symbole) ersetzt Audio vollständig.

Die folgende Audio-Spezifikation gilt erst ab Phase 5 (Erweiterung):

| Event | Sound | Datei |
|---|---|---|
| Richtige Antwort | Kurzer Erfolgs-Ton | `assets/audio/success.mp3` |
| Falsche Antwort | Sanfter Fehler-Ton | `assets/audio/error.mp3` |
| Mappe freigeschaltet | Schlüssel-/Schloss-Sound | `assets/audio/unlock.mp3` |
| Game komplett | Fanfare | `assets/audio/complete.mp3` |

- **Mute-Toggle**: Immer sichtbar, Standard = stumm (Klassenzimmer!)
- Sound-Einstellung in localStorage persistieren
- Keine Autoplay-Sounds beim Seitenaufruf

### 6. MVP-Medienregel

- **Keine externen Bilder**: Visuelle Gestaltung rein über CSS (Hintergründe, Bordüren, Gradienten, `border-image`)
- **Keine Audio-Dateien**: Feedback über Animationen und Symbole
- **Unicode-Symbole** statt Icon-Libraries: ✅ ❌ 🔑 📁 💡 🎯
- **CSS-generierte Dekorationen**: `::before`/`::after` für Akzente, Trennlinien, Zitat-Markierungen

## Quellen (zu lesende Dateien)

### Design-System
- `assets/css/base.css` – Basis-Styles (wird ergänzt)
- Neue Datei: `assets/css/themes/theme-gpg.css` – GPG-spezifisches Theme

### Referenz
- Archiv 45 als visuelle Inspiration (Dokument-/Akten-Ästhetik)
- Bestehende Escape-Room-Websites als UX-Referenz

## Ausgabe

### Gestylte HTML-Dateien
- Alle HTML-Dateien im `escape-games/[thema]/`-Verzeichnis mit angewandtem Theme
- Responsive und barrierefrei

### CSS-Dateien
- `assets/css/base.css` – Ergänzt um Grundlayout, Reset, Utility-Klassen
- `assets/css/themes/theme-gpg.css` – GPG-spezifisches Theme mit:
  - Farbvariablen (CSS Custom Properties)
  - Typografie-Regeln
  - Aufgaben-Karten-Styles
  - Animation-Keyframes
  - Responsive Breakpoints
  - Print-Stylesheet (für lehrkraft.html)

### CSS-Custom-Properties-Schema

```css
:root {
  /* Farben */
  --color-primary: #1B2A4A;
  --color-secondary: #C9A84C;
  --color-background: #F5F0E8;
  --color-surface: #EDE8DD;
  --color-text: #2C2416;
  --color-success: #2D6A4F;
  --color-error: #9B2226;
  --color-tipp: #4A6FA5;

  /* Typografie */
  --font-heading: Georgia, serif;
  --font-body: system-ui, sans-serif;
  --font-code: "Courier New", monospace;

  /* Abstände */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;

  /* Rundungen */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Schatten */
  --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.1);
  --shadow-elevated: 0 4px 16px rgba(0, 0, 0, 0.15);
}
```
