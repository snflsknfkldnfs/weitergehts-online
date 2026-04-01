# Uebergabe-Prompt v3.5e: Loesungswort Drag-and-Drop + Fragesatz-Hervorhebung + Tipp-System

## Kontext

v3.5d (Commit bc5a208) ist abgeschlossen. Browser-Review ergab 3 verbleibende Issues:

- BUG-18: Loesungswort wird nicht zuverlaessig angezeigt. Redesign: Drag-and-Drop-Buchstabenpuzzle statt Textfeld-Eingabe.
- BUG-19: Fragesaetze (`.aufgabe__frage`) sind visuell nicht vom umgebenden Text unterscheidbar.
- BUG-20: Tipp-System-Verbesserung: sequentielle Freischaltung (Tipp 1 vor Tipp 2), gewichteter Tipp-Counter pro Mappe.

## Pre-Flight

Vor der Arbeit sicherstellen:

- [ ] `git status` — Working Tree sauber (keine uncommitted changes)
- [ ] `git pull` — Lokaler Branch ist aktuell mit origin/main
- [ ] Aktuelle Version von `assets/js/escape-engine.js` lesen (NICHT aus dem Prompt uebernehmen)
- [ ] Aktuelle Version von `assets/css/themes/theme-gpg.css` lesen (NICHT aus dem Prompt uebernehmen)

Falls Pre-Flight fehlschlaegt: STOPP. Problem melden.

---

## Aufgabe 1: BUG-18 — Loesungswort als Drag-and-Drop-Buchstabenpuzzle

### Ziel

Das bisherige System (Buchstaben-Kaestchen + Textfeld + Submit-Button) wird komplett ersetzt durch ein interaktives Drag-and-Drop-Puzzle. Der Schueler sieht leere Zielkaestchen, erhaelt nach jeder geloesten Aufgabe einen Buchstaben als draggbares Tile, und muss die Buchstaben an die richtige Position ziehen.

### Architektur

**Zwei Bereiche im `.loesungscode-sektion`-Container:**

1. **Zielbereich** (`.code-ziel`): Eine Reihe leerer Kaestchen, eines pro Buchstabe des `freischalt_code` der Mappe. Von Anfang an sichtbar (zeigt dem Schueler die Wortlaenge). Jedes Kaestchen ist ein `<div class="code-ziel__feld">` mit `data-position="0"`, `data-position="1"`, etc.

2. **Buchstaben-Pool** (`.code-pool`): Anfangs leer. Nach Loesung jeder Aufgabe erscheint dort ein draggbares Tile (`.code-pool__buchstabe`) mit dem `freischalt_buchstabe` der geloesten Aufgabe. Tile hat `draggable="true"` und `data-buchstabe="X"`.

**Kein Textfeld, kein Submit-Button mehr.** Die gesamte `.code-eingabe`-Sektion (`.code__input`, `.code__submit`) entfaellt. Die Validierung passiert automatisch beim Drop.

### Drag-and-Drop-Logik (JS)

**Drag-Events (auf `.code-pool__buchstabe`):**
- `dragstart`: `e.dataTransfer.setData('text/plain', buchstabe)`. Tile bekommt `.--dragging` Klasse (Opacity 0.4).
- `dragend`: `.--dragging` entfernen.

**Drop-Events (auf `.code-ziel__feld`):**
- `dragover`: `e.preventDefault()` (erlaubt Drop). Feld bekommt `.--drag-over` Klasse (visuelle Hervorhebung).
- `dragleave`: `.--drag-over` entfernen.
- `drop`:
  1. `e.preventDefault()`
  2. Buchstabe aus `dataTransfer` lesen
  3. Pruefen: Ist das Feld bereits belegt? Wenn ja → ignorieren.
  4. Pruefen: `buchstabe === mappe.freischalt_code[position]` (beides `.toUpperCase()`)
  5. **Richtig:** Buchstabe in Feld anzeigen, Feld bekommt `.--korrekt` Klasse (Tintenblau Hintergrund, nicht mehr als Drop-Target). Tile aus Pool entfernen.
  6. **Falsch:** Feld bekommt `.--falsch` Klasse (Rotstift-Rot, 600ms Transition, dann entfernen). Buchstabe bleibt im Pool. Fehlversuche-Counter hochzaehlen (bestehender `fehlversuche`-Mechanismus aus v3.5d).
  7. Nach jedem korrekten Drop: Pruefen ob alle Felder `.--korrekt` haben. Wenn ja → `_onLoesungswortKomplett()` aufrufen.

**Touch-Support (fuer iPads/Tablets):**
- `touchstart`: Buchstabe visuell "aufheben" (transform: scale(1.1), position fixed, folgt Finger)
- `touchmove`: Position des Tiles an Touch-Koordinaten anpassen. Pruefen welches Zielfeld unter dem Finger liegt (via `document.elementFromPoint(touch.clientX, touch.clientY)`).
- `touchend`: Gleiches Drop-Pruefverfahren wie bei Mouse-DnD. Wenn kein gueltiges Ziel → Tile zurueck in Pool animieren.

**`_onLoesungswortKomplett()`:**
- Gleiche Logik wie bisheriges `checkCode()` bei Erfolg: `mappe.abgeschlossen = true`, Sicherung anzeigen.
- Alle Zielfelder bekommen staggered Reveal-Animation (bestehende `--reveal`-Klasse wiederverwenden, 100ms Delay pro Feld).
- Zusaetzlich: Gesamter Zielbereich bekommt `.code-ziel--komplett` (goldener/gruener Rand, leichtes Glow).

### Buchstaben-Erscheinen nach Aufgaben-Loesung

In `_markAufgabeGeloest()` (oder dem entsprechenden Callback nach korrekter Antwort):
1. `freischalt_buchstabe` der Aufgabe lesen
2. Neues `.code-pool__buchstabe`-Element erstellen
3. Mit Fade-In-Animation (opacity 0 → 1, scale 0.8 → 1, 300ms) in den Pool einfuegen
4. Scroll-Hinweis: Wenn der Pool nicht im Viewport ist, NICHT automatisch scrollen. Der Schueler soll die Aufgaben nacheinander loesen und am Ende zum Loesungswort kommen.

### Rendering (`_renderLoesungscodeSektion` ersetzen)

```
Struktur:
.loesungscode-sektion
  h3 "Loesungswort"
  p.code-hinweis "Loese die Aufgaben, um Buchstaben freizuschalten. Ziehe sie an die richtige Stelle!"
  .code-ziel
    .code-ziel__feld[data-position=0]
    .code-ziel__feld[data-position=1]
    ...
  .code-pool
    (initial leer, wird dynamisch befuellt)
```

Anzahl der Zielfelder = `mappe.freischalt_code.length`.

Bei Seiten-Reload: Bereits geloeste Aufgaben pruefen (aus localStorage/State) und deren Buchstaben sofort im Pool anzeigen (ohne Animation). Bereits korrekt platzierte Buchstaben sofort in den Zielfeldern anzeigen.

---

## Aufgabe 2: BUG-19 — Fragesatz-Hervorhebung (Textmarker-Stil)

### Ziel

`.aufgabe__frage` bekommt eine visuelle Hervorhebung im Textmarker-Stil, passend zur Notizbuch-Metapher des Fragebogens.

### CSS-Umsetzung (in theme-gpg.css)

Fuer `.fragebogen .aufgabe__frage` (nur im Fragebogen-Kontext, nicht in der Sicherung):

```css
.fragebogen .aufgabe__frage {
  background: linear-gradient(
    to bottom,
    transparent 10%,
    rgba(255, 249, 196, 0.55) 10%,
    rgba(255, 249, 196, 0.55) 90%,
    transparent 90%
  );
  /* Textmarker-Gelb, halbtransparent damit Karo-Muster durchscheint */
  font-weight: 600;
  font-size: 1.05em;
  padding: 0.2em 0.4em;
  margin-bottom: 0.8em;
  border-radius: 2px;
  display: inline;
  /* inline statt block: Textmarker-Effekt endet am Textende, nicht am Containerrand */
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  /* Bei Mehrzeilern: jede Zeile einzeln "markiert" */
}
```

### Warum diese Werte

- `rgba(255, 249, 196, 0.55)`: Textmarker-Gelb (#FFF9C4) aus dem Design-System, halbtransparent damit das Karo-Muster des Notizbuchs durchscheint. Opakes Gelb wuerde das Karo verdecken.
- `linear-gradient 10%/90%`: Textmarker trifft nie exakt die Oberkante — der Gradient simuliert die leicht ungleichmaessige Deckung eines echten Markers.
- `display: inline` + `box-decoration-break: clone`: Entscheidend. Bei `display: block` wuerde der gelbe Hintergrund bis zum Containerrand reichen — sieht aus wie ein Banner, nicht wie ein Textmarker. `inline` begrenzt den Hintergrund auf die tatsaechliche Textbreite. `box-decoration-break: clone` stellt sicher, dass bei Zeilenumbruch jede Zeile ihren eigenen Textmarker-Hintergrund bekommt.
- `font-weight: 600`: Dezente Verstaerkung, wie mit leichtem Druck geschrieben.

### Kein Eingriff in JS noetig

Die Klasse `.aufgabe__frage` existiert bereits. Reine CSS-Aenderung.

---

## Aufgabe 3: BUG-20 — Tipp-System: Sequentielle Freischaltung + gewichteter Counter

### Ziel

Zwei Verbesserungen am bestehenden Tipp-System:

1. **Sequentielle Freischaltung:** Tipp 2 ist erst klickbar, nachdem Tipp 1 aufgedeckt wurde. Tipp 3 erst nach Tipp 2. Verhindert, dass Schueler direkt zur Loesung springen.
2. **Gewichteter Tipp-Counter:** Zaehlt pro Mappe, wie viele Tipp-Punkte verbraucht wurden. Gewichtung: Tipp Stufe 1 = 1 Punkt, Stufe 2 = 2 Punkte, Stufe 3 = 3 Punkte. Wird zusammen mit dem Fehlversuche-Counter angezeigt.

### Sequentielle Freischaltung (JS)

**In `_renderTipps(aufgabe, index)`:**

Beim Erstellen der Tipp-Buttons: Nur der Button fuer Stufe 1 ist initial aktiv (`enabled`). Buttons fuer Stufe 2 und 3 werden mit `disabled`-Attribut und CSS-Klasse `.tipp__trigger--gesperrt` gerendert.

Gesperrte Buttons:
- `pointer-events: none` (kein Hover, kein Click)
- Visuell: `opacity: 0.35`, kein Cursor-Pointer
- Tooltip/title-Attribut: "Decke zuerst Tipp [N-1] auf"

**Freischaltlogik:** Im Click-Handler des Tipp-Buttons, nachdem `showTipp()` aufgerufen und `tipp__trigger--used` gesetzt wurde:
1. Naechsten Button (Stufe + 1) suchen
2. Falls vorhanden: `disabled` entfernen, `.tipp__trigger--gesperrt` entfernen
3. Kein automatisches Oeffnen — nur freischalten

**Bei Seiten-Reload:** `tipps_genutzt` aus localStorage lesen. Wenn z.B. `tipps_genutzt === 2`, dann Stufe 1 und 2 als `--used` markieren, Stufe 3 freischalten (nicht mehr gesperrt). Logik: Alle Stufen ≤ `tipps_genutzt` sind `--used`, Stufe `tipps_genutzt + 1` ist freigeschaltet (falls existent), Rest bleibt gesperrt.

### Gewichteter Tipp-Counter (JS + CSS)

**Datenmodell:**

Neues Feld in localStorage (analog zu `fehlversuche`):
```
tipp_punkte: number  // Summe der gewichteten Tipp-Nutzungen in der Mappe
```

Berechnung: Wenn ein Tipp der Stufe N zum ersten Mal aufgedeckt wird, addiere N zum Counter. Nur beim **ersten** Aufdecken — wiederholtes Oeffnen desselben Tipps zaehlt nicht erneut.

Implementierung in `_saveTippUsage()`: Pruefen ob diese spezifische Aufgabe+Stufe-Kombination schon gezaehlt wurde. Falls nein → `tipp_punkte += stufe`. Dafuer ein Set oder Objekt `tipps_gezaehlt` im Progress-Objekt pflegen (z.B. `{ "aufgabe-0-stufe-1": true, "aufgabe-0-stufe-2": true }`), persistent in localStorage.

**Anzeige (HTML-Rendering):**

Neues Element `.tipp-counter` direkt UEBER dem bestehenden `.fehlversuche`-Element. Beide zusammen bilden einen kompakten Statistik-Block am unteren Rand des Fragebogens (oder oberhalb der Loesungscode-Sektion).

```
Struktur:
.mappe-statistik
  .tipp-counter
    span.mappe-statistik__label "Tipps:"
    span.mappe-statistik__wert "4"
  .fehlversuche
    span.mappe-statistik__label "Fehlversuche:"
    span.mappe-statistik__wert "2"
```

**CSS-Styling:**

```
.mappe-statistik {
  display: flex;
  gap: 1.2em;
  font-size: 0.8rem;
  padding: 4px 0;
  margin-top: 0.5em;
}

.tipp-counter {
  color: #4A6FA5;  /* Gleiche Farbe wie Tipp-Pills (--color-tipp) */
}

.fehlversuche {
  color: var(--fb-error);  /* Bestehend: Rotstift-Rot */
}

.mappe-statistik__label {
  font-weight: 600;
  margin-right: 0.3em;
}

.mappe-statistik__wert {
  font-variant-numeric: tabular-nums;
}
```

Beide Counter nebeneinander auf einer Zeile. Kompakt, nicht dominant. Die Farbcodierung (Blaugrau fuer Tipps, Rot fuer Fehler) erzeugt einen dezenten motivierenden Effekt: weniger = besser.

**Update-Logik:** Nach jedem `_saveTippUsage()`-Aufruf das `.tipp-counter .mappe-statistik__wert`-Element aktualisieren (analoges Pattern zum bestehenden Fehlversuche-Update).

---

## Dateien

- `assets/js/escape-engine.js` — ERWEITERN: `_renderLoesungscodeSektion` komplett umschreiben (Drag-and-Drop statt Kaestchen+Textfeld). `_revealFreischaltCode` anpassen. Touch-Event-Handler hinzufuegen. `_onLoesungswortKomplett` als neue Funktion. Buchstaben-Pool-Logik in `_markAufgabeGeloest` integrieren. Bisherige `_initCodeEingabe`-Referenzen auf `.code__input`/`.code__submit` entfernen oder auf neues System umleiten. `_renderTipps`: sequentielle Freischaltung (Stufe 2 gesperrt bis Stufe 1 used, etc.). `_saveTippUsage`: gewichteten Tipp-Counter pflegen (`tipp_punkte`), `tipps_gezaehlt`-Set in localStorage. `.mappe-statistik`-Block rendern (Tipp-Counter + Fehlversuche nebeneinander).
- `assets/css/themes/theme-gpg.css` — ERWEITERN: Neue Klassen fuer `.code-ziel`, `.code-ziel__feld`, `.code-pool`, `.code-pool__buchstabe`, Zustandsklassen (`--korrekt`, `--falsch`, `--dragging`, `--drag-over`, `--komplett`). Textmarker-Stil fuer `.fragebogen .aufgabe__frage`. Tipp-Erweiterungen: `.tipp__trigger--gesperrt` (disabled-Look), `.mappe-statistik` (Flex-Layout, Tipp-Counter in --color-tipp, Fehlversuche in --fb-error).
- `escape-games/gpg-erster-weltkrieg-ursachen/mappe-1.html` — PRUEFEN: Keine Aenderung noetig, sofern die HTML-Struktur dynamisch generiert wird (escape-engine.js). Falls statische `.code-eingabe`-Elemente im HTML stehen, diese entfernen.

## Merge-Schutz

Wenn bei `git pull` oder `git push` Konflikte auftreten:
1. NICHT automatisch aufloesen (kein --theirs, kein --ours)
2. Konflikt-Dateien auflisten und dem User melden
3. Warten auf User-Entscheidung

## Erfolgskriterium

1. Loesungswort-Bereich zeigt leere Kaestchen (Anzahl = Laenge des freischalt_code)
2. Nach Loesung jeder Aufgabe erscheint ein Buchstabe im Pool
3. Buchstaben sind per Drag (Mouse) und Touch (Finger auf Tablet) in Zielkaestchen ziehbar
4. Falsche Platzierung: Buchstabe kehrt in Pool zurueck, Feld blinkt rot
5. Richtige Platzierung: Buchstabe rastet ein, Feld wird Tintenblau
6. Alle Buchstaben korrekt → Mappe wird freigeschaltet, Sicherung erscheint
7. Fragesaetze haben Textmarker-Gelb-Hintergrund, der am Textende endet (nicht am Containerrand)
8. Karo-Muster scheint durch den Textmarker durch
9. Tipp 2 ist erst klickbar nach Aufdecken von Tipp 1; Tipp 3 erst nach Tipp 2
10. Gesperrte Tipps sind visuell als inaktiv erkennbar (Opacity, kein Cursor)
11. Tipp-Counter zeigt gewichtete Summe (Stufe 1 = 1 Pkt, Stufe 2 = 2 Pkt, Stufe 3 = 3 Pkt)
12. Tipp-Counter und Fehlversuche-Counter stehen nebeneinander in kompakter Zeile

## Verifikation

- [ ] Desktop Chrome: Drag-and-Drop mit Maus funktioniert (Buchstabe von Pool in Zielfeld)
- [ ] Touch-Simulation (Chrome DevTools → Toggle Device Toolbar → Touch): Drag per Finger funktioniert
- [ ] Falscher Buchstabe an falsche Position → roter Blink, zurueck in Pool
- [ ] Richtiger Buchstabe → rastet ein, Tintenblau, nicht mehr bewegbar
- [ ] Alle Buchstaben korrekt → Mappe freigeschaltet, Sicherung sichtbar
- [ ] Seiten-Reload nach teilweiser Loesung: bereits geloeste Buchstaben sind im Pool, bereits platzierte sind in Zielfeldern
- [ ] Kein Textfeld und kein Submit-Button mehr sichtbar
- [ ] Fragesaetze: gelber Textmarker-Hintergrund sichtbar, endet am Textende
- [ ] Karo-Muster scheint durch den Textmarker durch (Opacity-Check)
- [ ] Mehrzeilige Fragen: jede Zeile hat eigenen Textmarker-Streifen
- [ ] Tipp-Sequenz: Bei 3 Tipps → nur Tipp 1 klickbar. Nach Klick auf Tipp 1 → Tipp 2 wird freigeschaltet. Tipp 3 bleibt gesperrt bis Tipp 2 aufgedeckt.
- [ ] Tipp-Counter: Tipp 1 aufdecken → Counter zeigt "1". Dann Tipp 2 → Counter zeigt "3" (1+2). Dann Tipp 3 → Counter zeigt "6" (1+2+3).
- [ ] Tipp-Counter: Seiten-Reload → Counter zeigt korrekten Wert aus localStorage
- [ ] Tipp-Counter: Erneutes Oeffnen eines bereits aufgedeckten Tipps erhoeht Counter NICHT
- [ ] Tipp-Counter und Fehlversuche nebeneinander sichtbar, Farben korrekt (Blaugrau / Rot)
- [ ] Keine `console.error` in DevTools

## Nach Abschluss

Melde den Abschluss in Cowork mit: "Update: v3.5e erledigt. Commit: [hash]. Ergebnis: [Zusammenfassung]"
