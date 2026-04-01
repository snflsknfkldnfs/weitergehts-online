# Uebergabe-Prompt v3.5f: State-Restore + Aufgabennummer-Stil

## Kontext

v3.5e (Commit c4f2906) ist abgeschlossen. Browser-Review ergab 2 Issues, davon 1 strukturell:

- BUG-21: Aufgabennummern sollen gleichen Textmarker-Gelb-Stil wie Fragesaetze haben (visuelle Einheit).
- BUG-22 (strukturell): Loesungswort-Buchstaben erscheinen nicht nach Aufgaben-Loesung. Ursache: generelles State-Restore-Defizit im Fragebogen. Nach Reload sind geloeste Aufgaben visuell leer (disabled Inputs ohne Werte), obwohl `geloest: true` in localStorage korrekt ist. Counter bleiben konsistent — nur die visuelle Darstellung fehlt.

## Pre-Flight

Vor der Arbeit sicherstellen:

- [ ] `git status` — Working Tree sauber (keine uncommitted changes)
- [ ] `git pull` — Lokaler Branch ist aktuell mit origin/main
- [ ] Aktuelle Version von `assets/js/escape-engine.js` KOMPLETT lesen
- [ ] Aktuelle Version von `assets/css/themes/theme-gpg.css` lesen

Falls Pre-Flight fehlschlaegt: STOPP. Problem melden.

---

## Aufgabe 1: BUG-22 — Strukturelles State-Restore-Problem (2 Teilprobleme)

### Teilproblem A: Buchstaben erscheinen nicht nach Aufgaben-Loesung (LIVE, nicht Reload)

**Symptom:** Alle 5 Aufgaben geloest (5 von 5), aber Buchstaben-Pool bleibt leer. Zielkaestchen bleiben leer.

**Wahrscheinliche Ursache:** Stale-Progress-Referenz.

`_updateFortschritt(mappe, progress)` wird nach jeder Aufgaben-Loesung aufgerufen. Die Funktion iteriert ueber `progress.aufgaben[ai]`, um Buchstaben zum Pool hinzuzufuegen. Aber: `saveProgress()` schreibt nur in localStorage, ohne das In-Memory-`progress`-Objekt zu aktualisieren. Wenn `progress` das originale Objekt vom `init()`-Aufruf ist, steht dort fuer die gerade geloeste Aufgabe noch `false`.

**Fix:**

Option 1 (bevorzugt, minimal-invasiv): In `_updateFortschritt()`, BEVOR die Buchstaben-Schleife laeuft, `progress` aus localStorage neu laden:

```javascript
// Am Anfang der Buchstaben-Schleife in _updateFortschritt:
var freshProgress = loadProgress(mappe.id);
for (var ai = 0; ai < aufgaben.length; ai++) {
    if (freshProgress.aufgaben[ai] && aufgaben[ai].freischalt_buchstabe) {
        _addBuchstabeToPool(aufgaben[ai].freischalt_buchstabe, ai, true);
    }
}
```

Option 2 (alternativ): In jedem `_check[Type]`-Callback, DIREKT nach `saveProgress()`, den Buchstaben einzeln zum Pool hinzufuegen:

```javascript
// z.B. in _checkMultipleChoice nach saveProgress:
if (aufgabe.freischalt_buchstabe) {
    _addBuchstabeToPool(aufgabe.freischalt_buchstabe, aufgabeIndex, true);
}
```

**Zusaetzlich pruefen:**
- Existiert `document.getElementById('code-pool')` zum Zeitpunkt des Aufrufs? Falls `_renderLoesungscodeSektion` die ID anders setzt, schlaegt `getElementById` fehl.
- Hat der Pool-Container `overflow: hidden` oder andere CSS-Eigenschaften, die die Buchstaben-Tiles unsichtbar machen?

### Teilproblem B: Visueller State nach Reload fehlt (geloeste Aufgaben leer)

**Symptom:** Nach Reload sind MC-Optionen nicht ausgewaehlt, Zuordnungs-Dropdowns leer, Lueckentext-Inputs leer. Aufgabe ist als `aufgabe--solved` markiert (disabled), sieht aber kaputt aus.

**Ursache:** Die Engine speichert pro Aufgabe nur `geloest: boolean`, nicht die konkrete Antwort. Beim Render wird `geloest` nur genutzt, um Inputs zu disablen und den Submit-Button zu verstecken — aber die Antwort-Werte werden nicht wiederhergestellt, weil sie nie gespeichert wurden.

**Fix-Strategie: "Geloest"-Kompaktdarstellung statt leere disabled Felder.**

Statt die volle interaktive Form disabled zu rendern (was leer aussieht), soll fuer geloeste Aufgaben eine kompakte Erfolgsmeldung angezeigt werden. Das ist UX-sauberer als alle Antwortvarianten in localStorage zu speichern und beim Rendern einzeln wiederherzustellen.

**Umsetzung in `_renderAufgabe(aufgabe, index, geloest, total)`:**

Wenn `geloest === true`:
1. Frage-Text weiterhin rendern (`.aufgabe__frage` mit Textmarker)
2. Statt den Typ-spezifischen Renderer aufzurufen, einen kompakten Geloest-Block einfuegen:

```javascript
if (geloest) {
    var geloestBlock = document.createElement('div');
    geloestBlock.className = 'aufgabe__geloest';
    geloestBlock.innerHTML = '<span class="aufgabe__geloest-icon">&#10003;</span> Gelöst';
    body.appendChild(geloestBlock);
    // Typ-spezifischen Renderer NICHT aufrufen
} else {
    // Normaler Switch ueber aufgabe.typ
    switch (aufgabe.typ) { ... }
}
```

3. CSS fuer `.aufgabe__geloest`:

```css
.aufgabe__geloest {
    color: var(--fb-success, #2d6a4f);
    font-weight: 600;
    font-size: 0.95em;
    padding: 0.5em 0;
    font-style: italic;
}

.aufgabe__geloest-icon {
    color: var(--fb-success, #2d6a4f);
    font-size: 1.1em;
    margin-right: 0.3em;
}
```

**Wichtig:** Tipps sollen bei geloesten Aufgaben NICHT mehr gerendert werden. Der Tipp-Bereich entfaellt komplett bei `geloest === true`.

**Konsequenz fuer Buchstaben:** Die `freischalt_buchstabe`-Logik bleibt davon unberuehrt — die Buchstaben werden ueber `_restoreLoesungswortState()` (fuer Reload) und `_addBuchstabeToPool()` (fuer Live-Loesung) unabhaengig vom Aufgaben-Renderer zum Pool hinzugefuegt.

---

## Aufgabe 2: BUG-21 — Aufgabennummern im Textmarker-Gelb-Stil

### Ziel

Die `.aufgabe__nummer` (Kreis mit Zahl) soll visuell mit dem Textmarker-Gelb der Fragesaetze verknuepft sein, sodass Nummer und Frage als zusammengehoerende Einheit wahrgenommen werden.

### CSS-Umsetzung

Aktuell ist `.aufgabe__nummer` ein Kreis (vermutlich `border-radius: 50%`, feste Groesse, zentrierter Text). Den Kreis beibehalten, aber Hintergrund auf Textmarker-Gelb umstellen:

```css
.fragebogen .aufgabe__nummer {
    background-color: rgba(255, 249, 196, 0.7);
    /* Etwas opaker als der Frage-Textmarker (0.55) fuer bessere Lesbarkeit im Kreis */
    color: var(--fb-primary, #2952A3);
    /* Tintenblau fuer die Zahl, passend zur Fragebogen-Aesthetik */
    border: 2px solid rgba(255, 249, 196, 0.9);
    /* Leicht sichtbarer Rand im selben Farbton */
}
```

Alternativ, falls der aktuelle Kreis keinen Hintergrund hat, sondern einen farbigen Rand: Rand auf Textmarker-Gelb umstellen und Hintergrund hinzufuegen.

Entscheidend: Die Nummer-Farbe (Text) bleibt Tintenblau, der Hintergrund wird Textmarker-Gelb. So entsteht die visuelle Verbindung zur markierten Fragestellung.

### Kein Eingriff in JS noetig

Reine CSS-Aenderung.

---

## Dateien

- `assets/js/escape-engine.js` — AENDERN: (1) `_updateFortschritt`: freshProgress aus localStorage laden vor Buchstaben-Schleife. (2) `_renderAufgabe`: Bei `geloest === true` kompakten Geloest-Block statt Typ-Renderer. (3) Sicherstellen dass `_restoreLoesungswortState` korrekt arbeitet (DOM-Element-Checks, console.log bei Fehler).
- `assets/css/themes/theme-gpg.css` — ERWEITERN: `.aufgabe__geloest` Styling, `.fragebogen .aufgabe__nummer` Textmarker-Gelb-Hintergrund.
- `escape-games/gpg-erster-weltkrieg-ursachen/mappe-1.html` — PRUEFEN: Keine Aenderung noetig.

## Merge-Schutz

Wenn bei `git pull` oder `git push` Konflikte auftreten:
1. NICHT automatisch aufloesen (kein --theirs, kein --ours)
2. Konflikt-Dateien auflisten und dem User melden
3. Warten auf User-Entscheidung

## Erfolgskriterium

1. Nach Loesung einer Aufgabe: Buchstabe erscheint sofort im Pool (Fade-In-Animation)
2. Nach Loesung aller Aufgaben: Alle Buchstaben im Pool, Drag-and-Drop funktioniert
3. Nach Reload: Geloeste Aufgaben zeigen kompakten "Geloest"-Block (gruenes Haekchen + Text), keine leeren disabled Felder
4. Nach Reload: Buchstaben korrekt wiederhergestellt (im Pool oder in Zielfeldern, je nach vorherigem Zustand)
5. Nach Reload: Tipps bei geloesten Aufgaben nicht sichtbar
6. Aufgabennummern im Fragebogen haben Textmarker-Gelb-Hintergrund mit Tintenblau-Zahl
7. Ungeloeste Aufgaben: Verhalten unveraendert (volle interaktive Form)

## Verifikation

- [ ] Aufgabe 1 loesen → Buchstabe 1 erscheint im Pool (Animation sichtbar)
- [ ] Aufgabe 2 loesen → Buchstabe 2 erscheint im Pool
- [ ] Alle 5 Aufgaben loesen → 5 Buchstaben im Pool → Drag in Zielfelder funktioniert
- [ ] Alle Buchstaben korrekt platziert → Mappe freigeschaltet, Sicherung erscheint
- [ ] Seite neu laden nach 3 von 5 geloest:
  - [ ] Aufgaben 1-3: "Geloest"-Anzeige (Haekchen + Text), keine leeren Felder
  - [ ] Aufgaben 4-5: Volle interaktive Form, normal bedienbar
  - [ ] Buchstaben 1-3 im Pool oder in Zielfeldern (je nach vorherigem Placement)
  - [ ] Tipp-Counter und Fehlversuche-Counter korrekt
- [ ] Seite neu laden nach allen 5 geloest + Buchstaben platziert:
  - [ ] Alle Aufgaben zeigen "Geloest"
  - [ ] Buchstaben in Zielfeldern korrekt angezeigt
  - [ ] Falls alle platziert: Mappe-Abschluss-Zustand korrekt
- [ ] Aufgabennummern: Gelber Hintergrund, blaue Zahl im Fragebogen
- [ ] `console.log`/`console.error`: Keine Fehler in DevTools
- [ ] Touch-Simulation: Drag-and-Drop der Buchstaben funktioniert weiterhin

## Nach Abschluss

Melde den Abschluss in Cowork mit: "Update: v3.5f erledigt. Commit: [hash]. Ergebnis: [Zusammenfassung]"
