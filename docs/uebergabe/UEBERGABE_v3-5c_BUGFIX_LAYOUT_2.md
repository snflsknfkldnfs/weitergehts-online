# Uebergabe-Prompt: v3.5c Bugfix Layout-Redesign (Runde 2)

## Kontext

v3.5b Bugfix (Commit a53c914) abgeschlossen. Zweite Browser-Review: 5 weitere Bugs. Dieser Prompt behebt alle.

## Pre-Flight

- [ ] `git status` — Working Tree sauber
- [ ] `git pull` — Lokaler Branch aktuell
- [ ] Aktuelle Version der zu aendernden Dateien lesen (NICHT aus dem Prompt uebernehmen)

Falls Pre-Flight fehlschlaegt: STOPP.

## Aufgabe: 5 Bugfixes

### BUG-9: Notizblock-Hintergrund scrollt mit Seite statt mit Container

**Ist:** Das Karomuster des Fragebogen-Containers scrollt mit der Seite mit, statt sich relativ zum Container-Inhalt zu verhalten. Bei internem Scrollen im sticky Fragebogen driftet das Muster weg.

**Ursache:** `background-attachment: scroll` auf `.erarbeitung__aufgaben`. Bei einem `overflow-y: auto`-Container mit internem Scroll braucht man `background-attachment: local`, damit das Muster mit dem internen Scroll mitlaeuft.

**Umsetzung:**
- `theme-gpg.css`: Aendere `background-attachment: scroll` zu `background-attachment: local` auf `.erarbeitung__aufgaben`

### BUG-10: Material-Referenz-Links in Tipp 1 verschieben

**Ist:** Jede Aufgabe zeigt die Material-Referenz-Links ("Arbeite mit: [Material X], [Material Y]") direkt ueber der Frage, immer sichtbar. Das ist bereits eine Form der Hilfestellung/Differenzierung und sollte nicht sofort preisgegeben werden.

**Soll:** Material-Referenz-Links NICHT mehr ueber der Frage anzeigen. Stattdessen: In Tipp Stufe 1 integrieren. Wenn eine Aufgabe `material_referenz` hat UND Tipps hat: Der Tipp-1-Text wird um die Material-Links ergaenzt (prepended). Wenn eine Aufgabe `material_referenz` hat aber KEINE Tipps: Einen kuenstlichen Tipp 1 erzeugen der nur die Material-Links enthaelt.

**Umsetzung:**
- `escape-engine.js`: In `_renderAufgabe()` — entferne den Block der `_renderMaterialVerweis()` aufruft und das Ergebnis in die Aufgabe einfuegt (ca. Zeile 1688-1692)
- `escape-engine.js`: In `_renderTipps()` — erweitere die Logik:
  1. Pruefe ob die Aufgabe `material_referenz` hat
  2. Wenn ja und Tipps vorhanden: Beim ersten Tipp (stufe 1), prepende den Material-Verweis-Text VOR den Tipp-Text. Format: "Schau dir an: [Material X], [Material Y].\n[Original-Tipp-Text]"
  3. Wenn ja aber keine Tipps vorhanden: Erstelle einen einzelnen Tipp-Button "Tipp" dessen Inhalt die Material-Links sind
- Die Links sollen als klickbare Anker-Tags (`<a href="#mat-id">`) funktionieren wie bisher

### BUG-11: Loesungscode am Ende des Arbeitsblatts anzeigen

**Ist:** Der Freischaltcode (z.B. "PULVER") wird nirgends im Fragebogen angezeigt. SuS muessen ihn aus den Aufgaben-Buchstaben zusammensetzen (das ist die Spielmechanik). Aber: Es fehlt eine sichtbare Eingabeaufforderung + Anzeige des zusammengesetzten Codes am Ende des Arbeitsblatts.

**Soll:** Am Ende des Fragebogen-Containers (nach allen Aufgaben, vor oder anstelle der bestehenden Code-Eingabe): Eine praesentere Loesungscode-Sektion. Diese zeigt:
1. Ueberschrift: "Loesungswort" (Architects Daughter, tintenblau)
2. Pro Aufgabe ein Buchstaben-Feld: Leere Kaestchen (wie Kreuzwortraetsel), eines pro Aufgabe. Wenn eine Aufgabe geloest ist, erscheint der `freischalt_buchstabe` dieser Aufgabe im Kaestchen.
3. Darunter: Das Code-Eingabefeld (bestehend), in das SuS das zusammengesetzte Wort eintippen

**Umsetzung:**
- `escape-engine.js`: Pruefe ob `aufgaben[].freischalt_buchstabe` existiert (es ist moeglich dass dieses Feld noch nicht in der data.json ist). Wenn NICHT vorhanden: Zeige nur die bestehende Code-Eingabe an, ABER mit groesserer Praesenz (groessere Schrift, deutlicherer Rahmen).
- Wenn `freischalt_buchstabe` vorhanden: Rendere Buchstaben-Kaestchen. Jedes Kaestchen zeigt `_` (ungeloest) oder den Buchstaben (geloest). Update bei jeder geloesten Aufgabe.
- `theme-gpg.css`: Style fuer `.code-buchstaben`: Flex-Container, Kaestchen als inline-block 40x40px, border 2px solid tintenblau, font-size 1.4rem, Architects Daughter, text-align center, margin 4px. Geloester Buchstabe: tintenblau Schrift. Ungeloester: hellgrau Unterstrich.
- Die Code-Eingabe selbst (Input + Submit-Button) bleibt bestehen, wird aber direkt unter den Kaestchen platziert.

### BUG-12: Multiple-Choice-Optionen randomisieren

**Ist:** MC-Optionen werden in der Reihenfolge aus `data.json` gerendert. Die richtige Antwort steht oft an erster Stelle.

**Soll:** MC-Optionen bei jedem Laden zufaellig anordnen. Die Loesung wird per Text-Match geprueft (nicht per Index), daher ist Shuffling safe.

**Umsetzung:**
- `escape-engine.js`: In `_renderMultipleChoice()` — vor der for-Schleife die `optionen` shufflen. Nutze die bereits vorhandene Shuffle-Funktion (die auch fuer Zuordnung/Reihenfolge verwendet wird). Falls `Core.utils.shuffleArray` existiert, nutze diese. Falls nicht, implementiere Fisher-Yates:
  ```javascript
  var shuffled = optionen.slice(); // Kopie, Original nicht mutieren
  for (var j = shuffled.length - 1; j > 0; j--) {
    var k = Math.floor(Math.random() * (j + 1));
    var temp = shuffled[j];
    shuffled[j] = shuffled[k];
    shuffled[k] = temp;
  }
  ```
- Iteriere dann ueber `shuffled` statt `optionen`
- Loesung-Check bleibt unveraendert (vergleicht `selected.value === aufgabe.loesung`, beides Textstrings)

### BUG-13: Tipp-Buttons kleiner, nebeneinander, Akkordeon

**Ist:** Tipp-Buttons sind gross (full-width, viel Padding), vertikal gestapelt. Tipp-Inhalte klappen unabhaengig voneinander auf (mehrere gleichzeitig offen moeglich).

**Soll:**
1. Tipp-Buttons kleiner: kompakte Pillen/Tags nebeneinander (inline, nicht block)
2. Nebeneinander: `.aufgabe__tipps` als `display: flex; gap: 6px; flex-wrap: wrap;`
3. Akkordeon: Pro Aufgabe darf maximal EIN Tipp-Inhalt gleichzeitig offen sein. Oeffnen von Tipp 2 schliesst Tipp 1 automatisch.
4. Tipp-Inhalt klappt UNTER allen Buttons auf (nicht zwischen den Buttons)

**Umsetzung CSS:**
- `theme-gpg.css`: `.aufgabe__tipps` — `display: flex; flex-wrap: wrap; gap: 6px; align-items: flex-start; position: relative;`
- `.tipp` — `display: inline-flex;` (kein margin-bottom mehr, kein full-width)
- `.tipp__trigger` — Entferne `width: 100%`. Setze: `padding: 4px 12px; font-size: 0.75rem; border-radius: 12px;` (Pillen-Form). Hintergrund: `var(--fb-hint)` oder heller.
- `.tipp__inhalt` — `position: absolute; left: 0; right: 0; top: 100%;` ODER: Separater Container unterhalb der Button-Reihe. Besser: Einen separaten `tipp__content-area`-Div NACH den Buttons einfuegen und den sichtbaren Tipp-Inhalt dort rendern.

**Umsetzung JS:**
- `escape-engine.js`: In `_renderTipps()`:
  1. Erstelle `.aufgabe__tipps` als Flex-Container fuer die Buttons
  2. Erstelle EINEN `.aufgabe__tipp-inhalt-area`-Div nach dem Button-Container (als Geschwister-Element, nicht Kind)
  3. Beim Klick auf einen Tipp-Button:
     - Schliesse alle anderen Tipp-Inhalte dieser Aufgabe (entferne `--visible` von allen)
     - Wenn der geklickte Tipp schon offen war: schliesse ihn (Toggle)
     - Wenn nicht: oeffne ihn in der `tipp-inhalt-area` (setze innerHTML oder verschiebe den passenden Inhalt)
  4. Visuell: Der aktive Button bekommt Klasse `tipp__trigger--active` (dunklere Farbe)

## Dateien

| Datei | Aenderung |
|-------|-----------|
| `assets/js/escape-engine.js` | AENDERN — BUG-10 (Material-Ref in Tipps), BUG-11 (Loesungscode-Anzeige), BUG-12 (MC-Shuffle), BUG-13 (Tipp-Akkordeon) |
| `assets/css/themes/theme-gpg.css` | AENDERN — BUG-9 (background-attachment: local), BUG-11 (Code-Buchstaben-Style), BUG-13 (Tipp-Pillen-Layout) |

## Merge-Schutz

Wenn bei `git pull` oder `git push` Konflikte auftreten:
1. NICHT automatisch aufloesen
2. Konflikt-Dateien auflisten und melden
3. Warten auf User-Entscheidung

## Erfolgskriterium

Browser oeffnen: `escape-games/gpg-erster-weltkrieg-ursachen/mappe-1.html`
1. Karomuster bleibt fixiert relativ zum Fragebogen-Inhalt beim internen Scrollen
2. Keine Material-Referenz-Links ueber Fragen sichtbar
3. Tipp 1 enthaelt Material-Links (falls vorhanden)
4. Am Ende des Arbeitsblatts: Loesungswort-Sektion mit Kaestchen oder deutlichem Code-Eingabefeld
5. MC-Optionen in unterschiedlicher Reihenfolge bei jedem Laden
6. Tipp-Buttons klein, als Pillen nebeneinander
7. Nur ein Tipp gleichzeitig offen pro Aufgabe

## Verifikation

- [ ] `localStorage.clear()`, Seite neu laden
- [ ] Fragebogen intern scrollen: Karo scrollt mit (nicht fixiert an Viewport)
- [ ] Aufgabe mit material_referenz: Kein Link ueber der Frage. Tipp 1 klicken: Material-Links erscheinen
- [ ] Am Ende des Arbeitsblatts: Loesungscode-Bereich sichtbar
- [ ] MC-Aufgabe: Seite 3x neu laden, Optionen-Reihenfolge variiert
- [ ] Tipp-Buttons: Klein, nebeneinander, nicht full-width
- [ ] Tipp 1 oeffnen, dann Tipp 2 oeffnen: Tipp 1 schliesst sich
- [ ] Alle Aufgaben weiterhin loesbar (keine Funktions-Regression)
- [ ] Code-Eingabe funktioniert, Sicherung wird bei korrektem Code sichtbar
- [ ] Keine `console.error` in DevTools

## Nach Abschluss

Melde den Abschluss in Cowork mit: "Update: v3.5c Bugfix erledigt. Commit: [hash]. Ergebnis: [...]"
