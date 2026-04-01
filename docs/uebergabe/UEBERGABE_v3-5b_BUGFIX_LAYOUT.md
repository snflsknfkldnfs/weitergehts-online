# Uebergabe-Prompt: v3.5b Bugfix Layout-Redesign

## Kontext

v3.5 Layout-Redesign (Commit 9c6f7e7) implementiert und gepusht. Browser-Review durch Lehrkraft hat 8 Bugs identifiziert. Dieser Prompt behebt alle.

## Pre-Flight

Vor der Arbeit sicherstellen:
- [ ] `git status` — Working Tree sauber
- [ ] `git pull` — Lokaler Branch aktuell
- [ ] Aktuelle Version der zu aendernden Dateien lesen (NICHT aus dem Prompt uebernehmen)

Falls Pre-Flight fehlschlaegt: STOPP.

## Aufgabe: 8 Bugfixes

### BUG-1: Material-Fortschrittsanzeige ersetzen

**Ist:** "Material 1 von 9"-Text + Dot-Reihe oberhalb der Materialien. Wirkt ueberfluessig und sinnlos.

**Soll:** Entferne die gesamte Material-Fortschritt-Leiste (Container mit Text + Dots). Stattdessen: Jede Material-Karte bekommt eine dezente Kennzeichnung oben links als "Flag". Format: kleines Badge/Tag mit "M1", "M2", etc. (Position aus `data-position` oder Array-Index).

**Umsetzung:**
- `escape-engine.js`: Entferne oder deaktiviere `_renderMaterialFortschritt()` und den zugehoerigen IntersectionObserver
- `escape-engine.js`: In `_renderMaterial()` (bzw. der Funktion die einzelne Materialien rendert): Fuege ein kleines `<span class="material__flag">M{position}</span>` als erstes Kind in jede Material-Karte ein
- `theme-gpg.css`: Entferne `.material-fortschritt*`-Styles (oder lasse sie als toter Code — Entfernung bevorzugt)
- `theme-gpg.css`: Neuer Style `.material__flag`: `position: absolute; top: -8px; left: 12px; background: var(--color-primary); color: white; font-size: 0.7rem; font-weight: 600; padding: 2px 8px; border-radius: 0 0 4px 4px; letter-spacing: 0.05em;` — Material-Karten brauchen `position: relative` dafuer

### BUG-2: Phasenbezeichnung zwischen Materialien entfernen

**Ist:** Zwischen Materialien steht die `didaktische_funktion` als Badge ("Erarbeitung", "Vertiefung") in den Ueberleitung-Boxen.

**Soll:** Entferne die Phasenbezeichnung/Funktions-Badge aus den Ueberleitungen. Die Ueberleitung-Texte selbst (narrativer Text) bleiben bestehen, nur das Funktions-Badge wird entfernt.

**Umsetzung:**
- `escape-engine.js`: In der Funktion die Ueberleitungen rendert — entferne den Code der das `ueberleitung__funktion`-Element erstellt (vermutlich ein `<span>` mit der didaktischen Funktion)
- `theme-gpg.css`: `.ueberleitung__funktion`-Styles koennen entfernt werden

### BUG-3: Material-Zentrierung und Blocksatz

**Ist:** Materialien sind linksbuendig in der 2/3-Spalte, Fliesstext ist linksbuendig.

**Soll:** Materialien zentriert in ihrer Spalte. Textmaterialien (darstellungstext, quellentext, tagebuch) nutzen Blocksatz (`text-align: justify`). Andere Materialtypen (bildquelle, karte, zeitleiste, statistik) bleiben wie sie sind.

**Umsetzung:**
- `theme-gpg.css`: `.erarbeitung__materialien` oder das Grid-Kind das die Materialien haelt: `max-width: 700px; margin-inline: auto;` (zentriert innerhalb der 2/3-Spalte)
- `theme-gpg.css`: `.material--darstellung .material__inhalt, .material--quelle .material__inhalt, .material--tagebuch .material__inhalt { text-align: justify; hyphens: auto; -webkit-hyphens: auto; }`

### BUG-4: Notizblock-Hintergrund bei Zoom

**Ist:** Karomuster des Fragebogen-Notizbocks verschwindet bei niedriger Zoomstufe. Bei hoeherer Zoomstufe sind Symbole/Text nicht mehr auf den Linien ausgerichtet.

**Soll:** Karomuster scrollt mit dem Inhalt (kein `background-attachment: fixed`). Linien sollen mitskalieren. Das Muster muss robust gegen verschiedene Zoomstufen sein.

**Umsetzung:**
- `theme-gpg.css`: Stelle sicher dass der Karo-Hintergrund auf dem Fragebogen-Container NICHT `background-attachment: fixed` hat (falls gesetzt, entfernen)
- Verwende `em`-basierte Linienabstaende statt `px`: Aendere den `repeating-linear-gradient` von `24px` auf `1.5em`. Damit skaliert das Muster mit der Schriftgroesse/Zoom:
  ```css
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent calc(1.5em - 1px), var(--fb-grid) calc(1.5em - 1px), var(--fb-grid) 1.5em),
    repeating-linear-gradient(90deg, transparent, transparent calc(1.5em - 1px), var(--fb-grid) calc(1.5em - 1px), var(--fb-grid) 1.5em);
  background-size: 1.5em 1.5em;
  ```
- Fuer den Notizbuch-Fragebogen: `background-attachment: scroll` (explizit setzen falls nicht default)
- Aufgaben-Texte: `line-height: 1.5em` passend zum Raster setzen (damit Text auf Linien sitzt). Die `font-size` des Fragebogen-Inners auf eine feste Basis setzen: `font-size: 1rem;`

### BUG-5: Aufgabenart-Badge entfernen

**Ist:** Jede Aufgabe zeigt ein Typ-Badge ("multiple-choice", "lueckentext", etc.) im Header.

**Soll:** Entferne das Typ-Badge aus dem Aufgaben-Header. SuS brauchen diese technische Info nicht.

**Umsetzung:**
- `escape-engine.js`: In `_renderAufgabe()` — entferne den Code der `aufgabe__typ-badge` erstellt (die Zeile mit `<span class="aufgabe__typ-badge">...`)
- `theme-gpg.css`: `.aufgabe__typ-badge`-Styles im Fragebogen-Kontext koennen entfernt werden

### BUG-6: Aufgabennummer-Kreis ueberlappt

**Ist:** Der Kreis um die Aufgabennummer hat eine visuelle Ueberlappung (Screenshot zeigt doppelten Kreis oder Kreis der von anderem Element ueberdeckt wird).

**Soll:** Sauberer einzelner Kreis mit Nummer.

**Analyse:** Das Problem liegt vermutlich daran, dass `.aufgabe__nummer` als `<span>` den gesamten Text "Aufgabe 4 von 5" enthaelt (laut JS `innerHTML = '<span class="aufgabe__nummer">Aufgabe ${idx+1} von ${total}</span>'`), aber per CSS auf 28x28px mit `border-radius: 50%` beschraenkt wird. Der lange Text ueberlaeuft den Kreis.

**Umsetzung:**
- `escape-engine.js`: Aendere den innerHTML des Headers. Statt `<span class="aufgabe__nummer">Aufgabe ${idx+1} von ${total}</span>` nur `<span class="aufgabe__nummer">${idx+1}</span>`. Die "Aufgabe X von Y"-Info ist jetzt in den Aufgaben-Dots unten sichtbar, muss nicht doppelt sein.
- `theme-gpg.css`: `.aufgabe__nummer` bleibt 28x28px Kreis — passt jetzt weil nur eine Zahl drin steht. Pruefen ob `overflow: hidden` oder `white-space: nowrap` das Textproblem verursacht hat, und entfernen falls nicht mehr noetig.

### BUG-7: Aufgaben 1+2 nicht interaktiv

**Ist:** Bei Aufgaben 1 und 2 kann keine Antwort ausgewaehlt/eingegeben werden. Tipp-Boxen werden nicht angezeigt.

**Soll:** Alle Aufgaben muessen interaktiv sein. Radio-Buttons klickbar, Inputs beschreibbar, Tipps sichtbar.

**Analyse:** Vermutlich werden die Aufgaben als `aufgabe--solved` gerendert (Progress aus localStorage), oder Event-Listener werden nicht korrekt attached. Moegliche Ursachen:
1. `disabled`-Attribut auf Inputs (gesetzt wenn `isSolved` true)
2. `pointer-events: none` auf dem Container
3. CSS-Overlay oder z-index-Problem durch den Notizbuch-Wrapper

**Umsetzung:**
- Pruefe in `_renderAufgabe()`: Wird `isSolved` korrekt aus dem Progress geladen? Wenn ja, ist der localStorage-Eintrag falsch (evtl. durch vorherigen Test). Falls das Problem nur bei frischem Laden (ohne localStorage) auftritt, liegt es an fehlenden Event-Listenern.
- Pruefe ob die Lochrand/Fragebogen-Wrapper-Elemente (`fragebogen__lochrand`, `fragebogen__header`) ein z-index/overflow-Problem verursachen das die Aufgaben darunter nicht klickbar macht.
- Pruefe ob `overflow-y: auto` auf dem sticky Fragebogen-Container korrekt funktioniert — evtl. wird der scrollbare Bereich so klein dass Aufgaben 1+2 nicht erreichbar sind.
- **Schnelltest:** `localStorage.clear()` im Browser (DevTools Console), dann Seite neu laden. Wenn Aufgaben dann interaktiv sind: Bug liegt im Progress-Restore. Wenn nicht: Bug liegt in Event-Listener-Attachment oder CSS.
- Falls CSS-Problem: Pruefe ob `.fragebogen__inner` oder `.erarbeitung__aufgaben` ein `pointer-events`, `opacity`, oder `visibility`-Problem hat.

### BUG-8: Sicherung vorzeitig sichtbar

**Ist:** Sicherung ist sofort sichtbar, bevor der Loesungscode eingegeben und validiert wurde.

**Soll:** Sicherung bleibt `display: none` bis Code korrekt eingegeben.

**Analyse:** In der aktuellen Engine setzt `_renderMappeContent()` (oder `init`) `sicherungContainer.style.display = 'none'`. Beim Reload prueft die Engine `progress.abgeschlossen` und zeigt die Sicherung wenn true. Das Problem ist vermutlich:
1. Der Code der `sicherungContainer.style.display = 'none'` setzt, wird NACH dem Sicherungs-Rendering ausgefuehrt, aber VOR dem Progress-Check — und der Progress-Check setzt es zurueck auf sichtbar.
2. Oder: `progress.abgeschlossen` ist im localStorage `true` von einem frueheren Test.
3. Oder: Der neue Fragebogen-Wrapper-Code hat die Reihenfolge der Render-Aufrufe veraendert und `style.display = 'none'` wird nicht mehr gesetzt.

**Umsetzung:**
- Pruefe die Reihenfolge in `init()` oder `_renderMappeContent()`: Der `sicherungContainer.style.display = 'none'`-Aufruf muss NACH allen Render-Aufrufen kommen UND VOR dem Progress-Restore.
- Stelle sicher: `sicherungContainer.style.display = 'none'` wird IMMER initial gesetzt, unabhaengig von der Fragebogen-Wrapper-Logik.
- Der Progress-Restore (`if (progress.abgeschlossen) sicherungContainer.style.display = ''`) darf nur nach dem initialen Verstecken kommen.
- **Zusaetzlich:** Das HTML (`mappe-1.html`) hat bereits `style="display:none;"` auf dem sicherung-container. Pruefe ob das JS diesen Inline-Style frueh im Init entfernt (z.B. durch `innerHTML`-Replacement oder Style-Reset).

## Dateien

| Datei | Aenderung |
|-------|-----------|
| `assets/js/escape-engine.js` | AENDERN — BUG-1 (Material-Fortschritt entfernen, Material-Flag einfuegen), BUG-2 (Funktions-Badge entfernen), BUG-5 (Typ-Badge entfernen), BUG-6 (Nummer-Text kuerzen), BUG-7 (Interaktivitaet fixen), BUG-8 (Sicherung-Display-Reihenfolge) |
| `assets/css/themes/theme-gpg.css` | AENDERN — BUG-1 (Material-Flag Style, alte Fortschritt-Styles entfernen), BUG-2 (Funktions-Badge entfernen), BUG-3 (Zentrierung + Blocksatz), BUG-4 (em-basiertes Karo), BUG-5 (Typ-Badge entfernen), BUG-6 (Nummer-Circle pruefen) |

## Merge-Schutz

Wenn bei `git pull` oder `git push` Konflikte auftreten:
1. NICHT automatisch aufloesen
2. Konflikt-Dateien auflisten und melden
3. Warten auf User-Entscheidung

## Erfolgskriterium

Browser oeffnen: `escape-games/gpg-erster-weltkrieg-ursachen/mappe-1.html`
1. Materialien haben dezentes "M1", "M2"... Badge oben links (Flag-Stil)
2. Keine "Material X von Y"-Leiste mehr sichtbar
3. Keine Phasenbezeichnung zwischen Materialien
4. Materialien zentriert in 2/3-Spalte, Textmaterialien in Blocksatz
5. Notizbuch-Karo skaliert mit Zoom, verschwindet nicht bei niedrigem Zoom
6. Kein Typ-Badge ("multiple-choice" etc.) bei Aufgaben
7. Aufgabennummer zeigt nur Zahl im Kreis (kein Textoverflow)
8. ALLE Aufgaben interaktiv (Radio klickbar, Inputs beschreibbar, Tipps sichtbar)
9. Sicherung verdeckt bis Loesungscode korrekt eingegeben

## Verifikation

- [ ] `localStorage.clear()` in DevTools, Seite neu laden
- [ ] Material-Flags "M1"-"M9" sichtbar oben links pro Material
- [ ] Keine Fortschritts-Leiste ueber Materialien
- [ ] Keine Funktions-Badges in Ueberleitungen
- [ ] Textmaterialien (darstellungstext, quellentext) in Blocksatz
- [ ] Materialien zentriert (nicht linksbuendig am Grid-Rand)
- [ ] Zoom auf 75%: Karo sichtbar. Zoom auf 150%: Text auf Linien
- [ ] Kein Typ-Badge bei Aufgaben
- [ ] Aufgaben-Nummer: sauberer Kreis mit Zahl, kein Overflow
- [ ] Aufgabe 1: Radio-Button klickbar, Antwort waehlbar
- [ ] Aufgabe 2: Input beschreibbar (falls Lueckentext) oder Radio klickbar
- [ ] Tipp-Buttons bei allen ungeloesten Aufgaben sichtbar
- [ ] Sicherung NICHT sichtbar vor Code-Eingabe
- [ ] Code eingeben → Sicherung wird sichtbar
- [ ] Keine `console.error` in DevTools
- [ ] Mobile (<1024px): gestapelt, alles funktional

## Nach Abschluss

Melde den Abschluss in Cowork mit: "Update: v3.5b Bugfix erledigt. Commit: [hash]. Ergebnis: [...]"
