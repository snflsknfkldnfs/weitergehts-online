# Audit-Briefing: Phase 2 – Template-Engine

## Kontext

Projekt: weitergehts.online – Infrastruktur für interaktive Unterrichtsmaterialien (Escape-Games) als statische Website auf GitHub Pages.

Phase 2 hat die Template-Engine implementiert: 8 Dateien bilden das technische Fundament, auf dem alle KI-Agenten (ORCHESTRATOR → AGENT_DIDAKTIK → AGENT_INHALT → AGENT_RAETSEL → AGENT_TECHNIK → AGENT_DESIGN → AGENT_QUALITAET) operieren.

## Geprüfte Dateien (8)

| # | Datei | Zeilen | Funktion |
|---|---|---|---|
| 1 | `assets/css/base.css` | 318 | CSS-Reset, Custom Properties, Grundlayout, Utilities, Responsive, Print, reduced-motion |
| 2 | `assets/css/themes/theme-gpg.css` | 913 | GPG-Archiv-Theme: Farbpalette, Typografie, alle Komponenten-Styles (BEM), Animationen |
| 3 | `assets/js/core.js` | 259 | Storage-Wrapper, Navigation, Feedback-Animationen, Utility-Funktionen |
| 4 | `assets/js/escape-engine.js` | 1170 | Escape-Game-Engine: 7 API-Funktionen, 5 Aufgabentyp-Renderer, Fortschrittsverwaltung |
| 5 | `escape-games/template/index.html` | 176 | Startseite: Mappen-Übersicht, Narrativ, Fortschritts-Karten |
| 6 | `escape-games/template/mappe-template.html` | 121 | Mappe-Seite: Aufgaben-Container, Code-Eingabe, Fortschrittsbalken |
| 7 | `escape-games/template/lehrkraft.html` | 331 | Lehrkraft-Zugang: Passwort-Gate, Lösungsübersicht, Steuerung |
| 8 | `escape-games/template/data.json` | 34 | Schema-Vorlage für Spieldaten (leer, als Template) |

## Befunde

### A. Architektur (Positiv)

1. **Klare Trennung**: base.css (fach-agnostisch) → theme-gpg.css (Fach-spezifisch) → core.js (Framework) → escape-engine.js (Spiellogik). Jede Schicht hat einen definierten Zuständigkeitsbereich.
2. **Keine externen Abhängigkeiten**: Reines Vanilla JS. Keine Build-Tools, keine CDN-Abhängigkeiten. Passt zum Static-Site-Ansatz auf GitHub Pages.
3. **BEM-Klassennamen**: Konsequent durchgehalten (`aufgabe__header`, `aufgabe__option--correct`, `mappe-karte--locked`). Die Abgrenzungstabelle AGENT_TECHNIK/AGENT_DESIGN korrespondiert mit der tatsächlichen Implementierung.
4. **Barrierefreiheit**: ARIA-Labels, `role="alert"`, `aria-live="polite"`, `aria-expanded`, `:focus-visible`, `visually-hidden` – substanziell umgesetzt, nicht nur kosmetisch.
5. **Responsive Design**: Mobile-First, drei Breakpoints (< 640, 640–1024, > 1024), Touch-Targets 48x48px.

### B. Kritische Probleme

**B1. Hardcoded "5" in Aufgaben-Renderer**
- `escape-engine.js` Zeile 437: `'Aufgabe ' + (index + 1) + ' von 5'`
- Die Zahl 5 ist hardcoded. Wenn eine Mappe 3 oder 7 Aufgaben hat, zeigt der Header trotzdem "von 5".
- **Fix**: Aufgabenanzahl aus `mappe.aufgaben.length` ableiten.

**B2. Freitext-Code-Validierung zu simpel**
- `escape-engine.js` Zeile 999–1000: `indexOf(expected) !== -1` akzeptiert jeden Text, der die Lösung enthält – auch Zufallstreffer in längeren Texten.
- Für MVP akzeptabel, aber bei Produktionseinsatz problematisch. Die AGENT_RAETSEL-Spezifikation definiert keinen alternativen Prüfmechanismus.

**B3. Fehlender Initialisierungscode in lehrkraft.html**
- `unlockMappe()` in Zeile 231 ruft `EscapeEngine.unlockMappe(mid)` auf, aber die Engine wurde nie `init()` aufgerufen. `_state.storageKey` ist `null` → `Core.storage.set(null, ...)` schreibt unter dem Key "null" in localStorage.
- **Fix**: Beim Laden der Lehrkraft-Seite den `storageKey` aus data.json ableiten (gleiche Logik wie in `escape-engine.js:init()`) und direkt in `Core.storage` schreiben.

**B4. Navigationslogik nimmt sequenzielle Mappe-IDs an**
- `index.html` Zeile 125: `var prevMappeId = 'mappe-' + index;` konstruiert die ID aus dem Array-Index.
- `mappe-template.html` Zeile 109: `'mappe-' + (currentNum + 1)` für den "Weiter"-Link.
- Wenn Mappe-IDs nicht dem Pattern `mappe-N` folgen (z.B. `mappe-industrialisierung`), bricht die Navigation.
- Die data.json-Vorlage verwendet `mappe-1`, die ORCHESTRATOR-Spec erzwingt kein bestimmtes Schema. Risiko bei nicht-numerischen IDs.

### C. Moderate Probleme

**C1. CSS-Duplikation**
- `base.css` und `theme-gpg.css` setzen identische `:root`-Werte (Zeilen 79–128 in base.css, Zeilen 13–35 in theme-gpg.css). Das ist by design (Theme überschreibt Base), aber die identischen Werte sind redundant – base.css definiert bereits die GPG-Palette als Default. Ein zweites Theme (z.B. theme-sport.css) müsste wissen, welche Werte zu überschreiben sind.
- **Empfehlung**: base.css sollte neutrale/generische Defaults setzen (z.B. `--color-primary: #333`), nicht GPG-spezifische Werte.

**C2. Tipp-System erfordert Objekte, Schema zeigt's**
- `data.json` definiert Tipps korrekt als `[{ "stufe": 1, "text": "" }]`.
- `escape-engine.js` verarbeitet `tipps[i].stufe` und `tipps[i].text` – passt.
- ORCHESTRATOR.md (nach Phase-1-Fixes) definiert dasselbe Schema.
- **Status**: Konsistent. Kein Issue.

**C3. localStorage-Quota**
- Kein Fallback bei `QuotaExceededError`. `Core.storage.set()` fängt Fehler ab und gibt `false` zurück, aber kein Caller prüft den Rückgabewert.
- Bei Schulgeräten mit restriktiven Browser-Policies könnte localStorage blockiert sein.
- **Empfehlung**: Fehler-Feedback an den User (z.B. "Fortschritt kann nicht gespeichert werden").

**C4. Passwort im Klartext**
- `lehrkraft.html` Zeile 97: `var PASSWORT = 'lehrkraft';`
- Im HTML-Quelltext sichtbar. Der Hinweis-Text (Zeile 38) sagt das klar. Für den MVP-Kontext (Unterrichtsmaterial, keine Prüfungen) akzeptabel, aber bei didaktisch sensiblem Material unzureichend.

### D. Kleinere Issues

**D1.** `escape-engine.js` Zeile 473: Kommentar "zunachest" (Tippfehler).

**D2.** `mappe-template.html` rendert `fortschritt-label` initial als "0 von 5 Aufgaben" – gleicher Hardcode wie B1.

**D3.** `lehrkraft.html` Zeile 241: `aufgabeDiv.style.marginBottom = 'var(--space-md)'` – Inline-Styles mit CSS-Variablen funktionieren nicht. Muss `getComputedStyle` nutzen oder eine Klasse verwenden. Die Abgrenzungstabelle AGENT_TECHNIK verbietet Inline-Styles explizit.

**D4.** Kein `<meta name="description">` in den HTML-Dateien. Für GitHub Pages SEO irrelevant, aber für Lehrkräfte, die den Link teilen, wäre ein Preview-Text nützlich.

**D5.** `index.html` Zeile 154: Mappe-Link `mappe.id + '.html'` setzt voraus, dass pro Mappe eine eigene HTML-Datei existiert. Die Template-Engine liefert nur `mappe-template.html`. Die Erstellung der konkreten `mappe-1.html`, `mappe-2.html` etc. ist Aufgabe von AGENT_TECHNIK im Produktionslauf – aber der Kopier-/Erzeugungsmechanismus ist nirgends dokumentiert.

### E. Konsistenz mit Agent-Spezifikationen

| Prüfpunkt | Status | Anmerkung |
|---|---|---|
| data.json-Schema matcht ORCHESTRATOR.md | OK | Objekt-Format für Tipps stimmt überein |
| BEM-Klassen matchen AGENT_TECHNIK-Konvention | OK | Gleiche Nomenklatur in CSS und Spec |
| AGENT_DESIGN-Abgrenzung eingehalten | WARN | Inline-Styles in lehrkraft.html (D3) |
| 5 Aufgabentypen implementiert | OK | multiple-choice, zuordnung, lueckentext, reihenfolge, freitext-code |
| Mappe-Erzeugungsmechanismus dokumentiert | FEHLT | D5 – wie wird aus Template konkretes Game? |

### F. Priorisierte Handlungsempfehlungen

**Muss vor Phase 3 (Pilot-Durchlauf):**

1. **B1 fixen**: Hardcoded "5" durch `mappe.aufgaben.length` ersetzen (escape-engine.js + mappe-template.html)
2. **B3 fixen**: Lehrkraft-Seite benötigt funktionierenden Storage-Zugriff
3. **D3 fixen**: Inline-Styles durch CSS-Klassen ersetzen (verletzt eigene Spec)
4. **D5 dokumentieren**: Mappe-Kopier-Mechanismus in AGENT_TECHNIK.md beschreiben

**Kann parallel zum Pilot:**

5. B4 absichern: ID-Validierung oder Pattern erzwingen
6. C1 korrigieren: base.css auf neutrale Defaults umstellen
7. C3 implementieren: Storage-Fehler-Feedback

**Kann nach MVP:**

8. B2 verbessern: Freitext-Validierung verfeinern
9. C4 evaluieren: Serverseitiger Schutz nur wenn Bedarf

## Gesamturteil

Die Template-Engine ist für einen MVP funktionsfähig. Die Architektur ist sauber, die Aufgabentyp-Renderer decken alle 5 Typen ab, Barrierefreiheit ist substantiell implementiert. Die vier "Muss"-Fixes (B1, B3, D3, D5) sind jeweils unter 30 Minuten behebbar und sollten vor dem ersten Pilot-Durchlauf in Phase 3 erledigt werden.
