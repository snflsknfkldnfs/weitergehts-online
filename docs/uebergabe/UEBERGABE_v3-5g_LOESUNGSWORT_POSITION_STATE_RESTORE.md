# Uebergabe-Prompt v3.5g: Loesungswort-Position + Antwort-State-Persistenz

## Kontext

v3.5f (Commit 07192d4) ist abgeschlossen. Browser-Review ergab 2 strukturelle Issues:

- BUG-23: Loesungswort-Buchstaben erscheinen weiterhin nicht im Pool. Vermutung: Rendering-Problem im Fragebogen-Sidebar (sticky, overflow, Reflow-Bugs). Loesung: Loesungswort-Sektion aus dem Fragebogen herausnehmen und als eigenstaendige Full-Width-Sektion zwischen Grid und Sicherung platzieren.
- BUG-24: Die in v3.5f eingefuehrte "Geloest"-Kompaktanzeige (Haekchen + Text) ist zu minimal. Schueler sollen nach Reload den vollen Interaktions-Verlauf sehen: korrekte Antwort, eliminierte Optionen, genutzte Tipps. Das erfordert Antwort-State-Persistenz in localStorage.

## Pre-Flight

Vor der Arbeit sicherstellen:

- [ ] `git status` — Working Tree sauber (keine uncommitted changes)
- [ ] `git pull` — Lokaler Branch ist aktuell mit origin/main
- [ ] Aktuelle Version von `assets/js/escape-engine.js` KOMPLETT lesen
- [ ] Aktuelle Version von `assets/css/themes/theme-gpg.css` lesen
- [ ] `escape-games/gpg-erster-weltkrieg-ursachen/mappe-1.html` lesen (DOM-Struktur pruefen)

Falls Pre-Flight fehlschlaegt: STOPP. Problem melden.

---

## Aufgabe 1: BUG-23 — Loesungswort-Sektion aus Fragebogen herausnehmen

### Problem

Die `.loesungscode-sektion` wird aktuell innerhalb von `fragebogen__inner` gerendert (am Ende, nach allen Aufgaben). Der Fragebogen ist die rechte 1/3-Spalte im CSS-Grid mit `position: sticky` und potentiell `overflow`-Einschraenkungen. Buchstaben-Tiles, die dynamisch zum `#code-pool` hinzugefuegt werden, erscheinen nicht — vermutlich wegen Rendering-/Reflow-Problemen im sticky Container.

### Loesung: Neue Position im DOM

Die Loesungswort-Sektion wird eine eigenstaendige Full-Width-Sektion **unterhalb** des 2/3-1/3-Grids und **oberhalb** der Sicherung.

Neue DOM-Hierarchie:

```
mappe__erarbeitung (section, CSS Grid 2fr 1fr)
  ├─ erarbeitung__materialien (2/3 Spalte)
  └─ erarbeitung__aufgaben (1/3 Spalte, Fragebogen)
     └─ aufgaben-container
        ├─ fragebogen__lochrand
        ├─ fragebogen__header + mappe-statistik
        └─ fragebogen__inner
           ├─ aufgabe (section, wiederholt)
           └─ aufgaben-fortschritt (Dots)
           [KEIN loesungscode-sektion mehr hier]

loesungswort-bereich (section, NEU, full-width, unterhalb des Grids)
  └─ loesungscode-sektion
     ├─ loesungscode__titel (h3)
     ├─ code-hinweis (p)
     ├─ code-ziel (Zielkaestchen-Reihe)
     └─ code-pool (Buchstaben-Pool)

sicherung-container (section, full-width, unterhalb des Loesungsworts)
  └─ [Hefteintrag etc.]
```

### Umsetzung in `_renderMappeV1`

1. `_renderLoesungscodeSektion(aufgaben, progress, mappe)` NICHT mehr in `inner` (fragebogen__inner) appenden
2. Stattdessen: Neues Wrapper-Element `.loesungswort-bereich` erstellen
3. Loesungscode-Sektion dort hinein appenden
4. `.loesungswort-bereich` als Geschwister-Element NACH `mappe__erarbeitung` und VOR `sicherung-container` in den uebergeordneten Container einfuegen

**Wo genau einfuegen?** Die `mappe__erarbeitung` Section und der `sicherung-container` sind vermutlich direkte Kinder eines uebergeordneten Containers (oder des `<main>`-Elements). Den neuen `.loesungswort-bereich` mit `insertBefore(loesungswortBereich, sicherungContainer)` platzieren.

Falls die Eltern-Struktur anders ist: Beim Pre-Flight die aktuelle DOM-Struktur in `mappe-1.html` pruefen und die Einfuege-Logik entsprechend anpassen.

### Auto-Scroll nach letzter Aufgabe

In `_updateFortschritt()`, wenn `solved === total` (alle Aufgaben geloest):

```javascript
if (solved === total) {
    var loesungswortBereich = document.querySelector('.loesungswort-bereich');
    if (loesungswortBereich) {
        setTimeout(function() {
            loesungswortBereich.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 400);  // Kurze Verzoegerung fuer visuelles Feedback
    }
}
```

### CSS fuer `.loesungswort-bereich`

```css
.loesungswort-bereich {
    max-width: 700px;
    margin: 2em auto;
    padding: 1.5em;
    /* Notizbuch-Stil beibehalten fuer visuelle Konsistenz */
    background-color: var(--fragebogen-bg, #f8f9fa);
    background-image: /* Karo-Muster, gleich wie Fragebogen */
        repeating-linear-gradient(
            var(--fragebogen-grid, rgba(41,82,163,0.08)) 0px,
            var(--fragebogen-grid, rgba(41,82,163,0.08)) 1px,
            transparent 1px,
            transparent 1.5em
        ),
        repeating-linear-gradient(
            90deg,
            var(--fragebogen-grid, rgba(41,82,163,0.08)) 0px,
            var(--fragebogen-grid, rgba(41,82,163,0.08)) 1px,
            transparent 1px,
            transparent 1.5em
        );
    border-radius: 8px;
    border: 2px solid var(--fb-primary, #2952A3);
}
```

### `_restoreLoesungswortState` anpassen

Die Funktion sucht `document.getElementById('code-pool')` und `document.getElementById('code-ziel')`. Diese IDs bleiben gleich — sie sind jetzt nur in einem anderen Container. Keine Aenderung an der Restore-Logik noetig, solange die IDs eindeutig bleiben.

### `_addBuchstabeToPool` Debugging

Die Funktion hat `if (!pool) return;` als Guard. Um sicherzustellen, dass das Problem tatsaechlich die Position war, eine `console.warn` hinzufuegen:

```javascript
if (!pool) {
    console.warn('[EscapeEngine] code-pool Element nicht gefunden');
    return;
}
```

Falls das Problem NICHT die Position war, hilft die Warn-Meldung bei der weiteren Diagnose.

---

## Aufgabe 2: BUG-24 — Antwort-State-Persistenz statt "Geloest"-Kompaktanzeige

### Problem

Die v3.5f "Geloest"-Anzeige (Haekchen + Text) ist zu minimal. Sie ersetzt die gesamte interaktive Form mit einem einzeiligen Text. Schueler verlieren nach Reload:
- Welche MC-Option korrekt war (gruene Hervorhebung)
- Welche Optionen sie falsch versucht hatten (Strikethrough/Eliminated)
- Welche Tipps sie genutzt hatten (Used-Zustand)

### Loesung: Vollen Antwort-State in localStorage speichern und bei Reload wiederherstellen

### Schritt 1: "Geloest"-Kompaktanzeige ENTFERNEN

In `_renderAufgabe()`: Den `if (geloest)` Block, der `aufgabe__geloest` rendert, ENTFERNEN. Stattdessen: Den Typ-Renderer IMMER aufrufen (auch bei `geloest === true`), und den `geloest`-Parameter an den Renderer durchreichen. Der Renderer entscheidet selbst, wie er geloeste Aufgaben darstellt.

```javascript
// VORHER (v3.5f):
if (geloest) {
    var geloestBlock = ...
} else {
    switch (aufgabe.typ) { ... }
}

// NACHHER (v3.5g):
switch (aufgabe.typ) {
    case 'multiple-choice':
        _renderMultipleChoice(body, aufgabe, index, geloest);
        break;
    // ... etc.
}
// geloest wird durchgereicht, Renderer handhabt den Zustand
```

Tipps ebenfalls IMMER rendern (auch bei geloest), aber mit korrektem Used-State (siehe Schritt 3).

### Schritt 2: Antwort-State speichern

Neues Feld im localStorage-Progress-Objekt pro Aufgabe:

```javascript
aufgaben[aufgabeId] = {
    geloest: true,
    tipps_genutzt: 2,
    // NEU:
    antwort_state: {
        // Typ-spezifisch:
    }
}
```

**Pro Aufgabentyp:**

**Multiple-Choice:**
```javascript
antwort_state: {
    selected: "korrekte_option_value",
    eliminated: ["falsche_option_1", "falsche_option_2"]
}
```
Speichern: In `_checkMultipleChoice`, bei korrekter Antwort UND bei falscher Antwort (eliminated hinzufuegen).

**Zuordnung:**
```javascript
antwort_state: {
    mappings: { "begriff_1": "definition_2", "begriff_2": "definition_1" }
}
```
Speichern: In `_checkZuordnung`, bei korrekter Antwort alle Select-Werte auslesen.

**Lueckentext:**
```javascript
antwort_state: {
    filled: ["wort1", "wort2", "wort3"]
}
```
Speichern: In `_checkLueckentext`, bei korrekter Antwort alle Input-Werte auslesen.

**Reihenfolge:**
```javascript
antwort_state: {
    order: ["item_2", "item_0", "item_3", "item_1"]
}
```
Speichern: In `_checkReihenfolge`, bei korrekter Antwort die aktuelle Reihenfolge der Items auslesen.

**Freitext-Code:**
```javascript
antwort_state: {
    text: "eingegebener text"
}
```
Speichern: In `_checkFreitextCode`, bei korrekter Antwort den Textarea-Wert auslesen.

**Implementierung:** Neue Hilfsfunktion `_saveAntwortState(mappeId, aufgabeIndex, state)`:

```javascript
function _saveAntwortState(mappeId, aufgabeIndex, state) {
    var allProgress = _getAllProgress();
    var aufgabeKey = 'aufgabe-' + aufgabeIndex;
    if (!allProgress.mappen[mappeId].aufgaben[aufgabeKey]) {
        allProgress.mappen[mappeId].aufgaben[aufgabeKey] = {};
    }
    allProgress.mappen[mappeId].aufgaben[aufgabeKey].antwort_state = state;
    Core.storage.set(_state.storageKey, allProgress);
}
```

**Wann speichern:**

- **MC korrekt:** `_saveAntwortState(mappeId, index, { selected: selected.value, eliminated: [...] })`
- **MC falsch:** Eliminated-Liste aus localStorage lesen, neues Item hinzufuegen, zurueckschreiben. So akkumulieren sich die Fehlversuche.
- **Zuordnung korrekt:** Alle Select-Werte sammeln und speichern.
- **Lueckentext korrekt:** Alle Input-Werte sammeln und speichern.
- **Reihenfolge korrekt:** Item-Reihenfolge speichern.
- **Freitext korrekt:** Textarea-Wert speichern.

### Schritt 3: Antwort-State bei Reload wiederherstellen

In jedem Typ-Renderer den `geloest`-Parameter nutzen plus `antwort_state` aus Progress laden.

**Multiple-Choice bei `geloest === true`:**

```javascript
function _renderMultipleChoice(container, aufgabe, index, geloest) {
    // Optionen-Array (nach Shuffle)
    var optionen = aufgabe.optionen; // ggf. shuffle

    if (geloest) {
        // KEIN Shuffle bei Reload — die gespeicherten Werte sind text-basiert
        // Lade antwort_state
        var state = _loadAntwortState(_state.mappeId, index);

        for (var i = 0; i < optionen.length; i++) {
            var label = document.createElement('label');
            label.className = 'aufgabe__option';

            var input = document.createElement('input');
            input.type = 'radio';
            input.value = optionen[i].text || optionen[i];
            input.disabled = true;  // IMMER disabled bei geloest

            // Korrekte Antwort hervorheben
            if (input.value === aufgabe.loesung) {
                label.classList.add('aufgabe__option--correct');
                input.checked = true;  // Korrekte Option ausgewaehlt zeigen
            }

            // Eliminierte Optionen markieren
            if (state && state.eliminated && state.eliminated.indexOf(input.value) !== -1) {
                label.classList.add('aufgabe__option--eliminated');
            }

            label.appendChild(input);
            label.appendChild(document.createTextNode(' ' + (optionen[i].text || optionen[i])));
            container.appendChild(label);
        }
        // KEIN Submit-Button
        return;
    }

    // ... normaler Render-Pfad fuer ungeloeste Aufgaben ...
}
```

**Zuordnung bei `geloest === true`:**
- Dropdowns rendern, alle disabled
- Gespeicherte Mappings als `selected`-Werte setzen
- Zeilen mit `.aufgabe__zuordnung-zeile--correct` markieren

**Lueckentext bei `geloest === true`:**
- Input-Felder rendern, alle disabled
- Gespeicherte Werte in die Inputs setzen
- Inputs mit `.aufgabe__luecke--correct` markieren

**Reihenfolge bei `geloest === true`:**
- Items in gespeicherter Reihenfolge rendern (nicht shuffled)
- Keine Up/Down-Buttons
- Container mit `--correct` markieren

**Freitext bei `geloest === true`:**
- Textarea mit gespeichertem Text, disabled

### Schritt 4: Tipp-State bei Reload wiederherstellen

Tipps IMMER rendern (auch bei `geloest === true`), aber:

- `tipps_genutzt` aus Progress lesen (existiert bereits)
- Alle Stufen <= `tipps_genutzt`: Button mit `.tipp__trigger--used` rendern
- Stufe `tipps_genutzt + 1`: Freigeschaltet (falls vorhanden)
- Rest: Gesperrt (`.tipp__trigger--gesperrt`)
- Bei `geloest === true`: Tipp-Inhalt initial SICHTBAR fuer bereits genutzte Tipps (Akkordeon offen)
- Kein Klick-Handler noetig (rein informativ)

ACHTUNG: `tipps_genutzt` speichert nur die hoechste Stufe. Fuer die Tipp-Anzeige reicht das: Stufen 1 bis `tipps_genutzt` wurden genutzt.

---

## Dateien

- `assets/js/escape-engine.js` — AENDERN:
  - `_renderMappeV1`: Loesungscode-Sektion aus `fragebogen__inner` entfernen, stattdessen als `.loesungswort-bereich` nach dem Grid einfuegen
  - `_renderAufgabe`: "Geloest"-Kompaktanzeige entfernen, Typ-Renderer immer aufrufen
  - `_renderMultipleChoice`, `_renderZuordnung`, `_renderLueckentext`, `_renderReihenfolge`, `_renderFreitextCode`: Geloest-Pfad mit State-Restore implementieren
  - `_checkMultipleChoice` etc.: `_saveAntwortState()` aufrufen
  - `_renderTipps`: Auch bei `geloest === true` rendern, mit korrektem Used-State
  - `_updateFortschritt`: Auto-Scroll zum Loesungswort-Bereich bei `solved === total`
  - `_addBuchstabeToPool`: `console.warn` bei fehlendem Pool-Element
  - Neue Funktionen: `_saveAntwortState()`, `_loadAntwortState()`
- `assets/css/themes/theme-gpg.css` — ERWEITERN: `.loesungswort-bereich` Styling (Full-Width, Notizbuch-Karo, zentriert). `.aufgabe__geloest` CSS kann entfernt werden.

## Merge-Schutz

Wenn bei `git pull` oder `git push` Konflikte auftreten:
1. NICHT automatisch aufloesen (kein --theirs, kein --ours)
2. Konflikt-Dateien auflisten und dem User melden
3. Warten auf User-Entscheidung

## Erfolgskriterium

1. Loesungswort-Sektion ist unterhalb des Material/Fragebogen-Grids, full-width, zentriert
2. Buchstaben erscheinen im Pool nach Aufgaben-Loesung (LIVE — das Kernproblem)
3. Nach letzter Aufgabe: Auto-Scroll zum Loesungswort-Bereich
4. Drag-and-Drop funktioniert (die Buchstaben sind jetzt ausserhalb des sticky Containers)
5. Alle Buchstaben korrekt → Sicherung/Hefteintrag erscheint darunter
6. Nach Reload bei geloester MC-Aufgabe: Korrekte Option gruen hervorgehoben, eliminierte durchgestrichen, alle disabled
7. Nach Reload bei geloester Zuordnung: Dropdowns mit korrekten Werten, disabled, gruen
8. Nach Reload bei geloestem Lueckentext: Inputs mit korrekten Werten, disabled, gruen
9. Nach Reload: Genutzte Tipps sichtbar mit Used-State
10. Keine "Geloest"-Kompaktanzeige mehr — volle interaktive Form (disabled)

## Verifikation

- [ ] Aufgabe 1 loesen → Buchstabe im Pool sichtbar (Pool ist jetzt unterhalb des Grids)
- [ ] Alle 5 loesen → Auto-Scroll zum Loesungswort-Bereich
- [ ] Buchstaben per Drag in Zielfelder → funktioniert (Mouse + Touch)
- [ ] Alle Buchstaben korrekt → Sicherung erscheint
- [ ] MC-Aufgabe: Falsch antworten (2x), dann richtig. Seite neu laden:
  - [ ] Korrekte Option: gruen, checked, disabled
  - [ ] 2 eliminierte Optionen: durchgestrichen, disabled
  - [ ] Restliche Optionen: normal, disabled
  - [ ] Kein Submit-Button
- [ ] Zuordnung: Richtig loesen. Reload → Dropdowns zeigen korrekte Zuordnung, gruen, disabled
- [ ] Lueckentext: Richtig loesen. Reload → Inputs zeigen korrekte Woerter, gruen, disabled
- [ ] Tipps: Tipp 1 und 2 nutzen, dann loesen. Reload → Tipp 1 und 2 mit Used-State sichtbar
- [ ] Tipp-Counter und Fehlversuche-Counter nach Reload korrekt
- [ ] `console.warn` fuer fehlenden Pool? Falls ja: Ursache in Console sichtbar
- [ ] Keine `console.error` in DevTools
- [ ] Loesungswort-Bereich hat Notizbuch-Karo-Muster (visuell konsistent)

## Nach Abschluss

Melde den Abschluss in Cowork mit: "Update: v3.5g erledigt. Commit: [hash]. Ergebnis: [Zusammenfassung]"
