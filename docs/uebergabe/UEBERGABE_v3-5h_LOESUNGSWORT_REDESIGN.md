# Uebergabe-Prompt v3.5h: Loesungswort-Mechanismus komplett neu

## Kontext

v3.5g (Commit d5f9455) ist abgeschlossen. Das persistierende Problem mit den nicht erscheinenden Buchstaben hat eine einfache Ursache: Die Engine suchte `aufgabe.freischalt_buchstabe` auf Aufgaben-Ebene — dieses Feld existierte NIE in der data.json. Es ist tote Logik aus einem veralteten Konzept.

**Neues Konzept:** Die Buchstaben-Verteilung pro Aufgabe wird komplett entfernt. Stattdessen:
1. Schueler loest alle Aufgaben
2. Erst wenn ALLE Aufgaben korrekt → Buchstaben des `freischalt_code` (Mappe-Ebene) erscheinen ALLE GLEICHZEITIG, in zufaelliger Reihenfolge, als draggbare Tiles
3. Schueler ordnet per Drag-and-Drop
4. Korrekte Reihenfolge → Sicherung/Hefteintrag freigeschaltet

## Pre-Flight

Vor der Arbeit sicherstellen:

- [ ] `git status` — Working Tree sauber (keine uncommitted changes)
- [ ] `git pull` — Lokaler Branch ist aktuell mit origin/main
- [ ] Aktuelle Version von `assets/js/escape-engine.js` KOMPLETT lesen
- [ ] Aktuelle Version von `assets/css/themes/theme-gpg.css` lesen

Falls Pre-Flight fehlschlaegt: STOPP. Problem melden.

---

## Aufgabe: Loesungswort-Engine komplett umschreiben

### Was ENTFERNT werden muss

Alles, was `freischalt_buchstabe` referenziert:

1. **In `_updateFortschritt`:** Die Schleife, die `aufgaben[ai].freischalt_buchstabe` prueft und `_addBuchstabeToPool` aufruft — KOMPLETT ENTFERNEN. Buchstaben werden nicht mehr inkrementell hinzugefuegt.

2. **In `_restoreLoesungswortState`:** Die Logik, die pro Aufgabe `freischalt_buchstabe` prueft und entweder in Pool oder Zielfeld platziert — KOMPLETT ENTFERNEN und durch neue Restore-Logik ersetzen (siehe unten).

3. **In `_renderLoesungscodeSektion`:** Jede Referenz auf `aufgabe.freischalt_buchstabe` entfernen.

4. **Jede andere Stelle**, die `freischalt_buchstabe` liest — grep durch die gesamte Datei und entfernen.

### Was NEU implementiert werden muss

#### Trigger: Alle Aufgaben geloest

In `_updateFortschritt()`, wenn `solved === total`:

```javascript
if (solved === total) {
    _aktiviereLoesungswort(mappe);
}
```

#### `_aktiviereLoesungswort(mappe)`

Neue Funktion. Wird aufgerufen wenn alle Aufgaben geloest sind.

```
Ablauf:
1. freischalt_code aus mappe.freischalt_code lesen (z.B. "PULVER")
2. In einzelne Buchstaben aufteilen: ["P", "U", "L", "V", "E", "R"]
3. Fisher-Yates-Shuffle auf das Array (gleicher Algorithmus wie MC-Optionen)
4. Alle Buchstaben GLEICHZEITIG als draggbare Tiles im Pool rendern
5. Jedes Tile: Fade-In mit staggered Delay (100ms pro Tile)
6. Auto-Scroll zum .loesungswort-bereich (smooth, block: start)
```

Jedes Tile im Pool:
- CSS-Klasse: `.code-pool__buchstabe`
- `draggable="true"`
- `data-buchstabe="P"` (der Buchstabe)
- `data-index="0"` (Original-Index im Pool fuer Restore)
- KEIN `data-aufgabe-index` mehr (das Konzept existiert nicht mehr)

#### Zielfelder (Rendering)

Bleiben wie bisher: Anzahl = `mappe.freischalt_code.length`, jedes Feld hat `data-position`.

**Aenderung:** Die Zielfelder sollen NICHT von Anfang an sichtbar sein. Das gesamte `.loesungswort-bereich`-Element ist initial `display: none` (oder `visibility: hidden` mit `height: 0`). Wird erst sichtbar, wenn `_aktiviereLoesungswort` aufgerufen wird. So sehen Schueler die leeren Kaestchen nicht, bevor sie alle Aufgaben geloest haben — das vermeidet Verwirrung.

#### Drop-Validierung

Bleibt positionsbasiert wie bisher:
- Drop auf Feld mit `data-position=N`: Pruefen ob `buchstabe === freischalt_code[N].toUpperCase()`
- Richtig → einrasten, Tile aus Pool entfernen, Feld `.--korrekt`
- Falsch → Feld blinkt rot (`.--falsch`, 600ms), Buchstabe zurueck in Pool, Fehlversuch zaehlen

#### Komplett-Check

Nach jedem korrekten Drop: Pruefen ob alle Felder `.--korrekt` haben.
Wenn ja → `_onLoesungswortKomplett(mappe)`:
- Staggered Reveal-Animation auf alle Felder
- `mappe.abgeschlossen = true` in localStorage
- Sicherung-Container sichtbar machen
- Progress speichern

#### State-Restore bei Reload

In `_restoreLoesungswortState` (oder wie die Funktion jetzt heisst):

1. `progress.abgeschlossen` pruefen:
   - Wenn `true` → Loesungswort-Bereich sichtbar, alle Buchstaben direkt in Zielfeldern anzeigen (kein Pool, kein DnD). Sicherung sichtbar.
   - Wenn `false` → pruefen ob alle Aufgaben geloest (`solved === total`):
     - Ja → `_aktiviereLoesungswort(mappe)` aufrufen (ohne Animation), aber `platzierte_buchstaben` aus localStorage wiederherstellen: bereits korrekt platzierte direkt in Felder, restliche in Pool.
     - Nein → Loesungswort-Bereich bleibt unsichtbar.

2. `platzierte_buchstaben` aus localStorage: Speichert welche Buchstaben bereits korrekt platziert wurden. Format:
```javascript
platzierte_buchstaben: {
    "position-0": "P",
    "position-3": "V"
}
```
Gespeichert wird bei jedem korrekten Drop (bestehende `_savePlatzierterBuchstabe` anpassen).

#### Touch-Support

Bleibt wie in v3.5e implementiert. Keine Aenderung noetig — die Touch-Handler arbeiten auf `.code-pool__buchstabe` Elementen unabhaengig davon, wann sie erscheinen.

---

## Dateien

- `assets/js/escape-engine.js` — AENDERN:
  - ENTFERNEN: Alle `freischalt_buchstabe`-Referenzen (grep + entfernen)
  - ENTFERNEN: Inkrementelle Buchstaben-Pool-Logik in `_updateFortschritt`
  - NEU: `_aktiviereLoesungswort(mappe)` — Shuffle + gleichzeitiges Rendern aller Buchstaben
  - AENDERN: `_updateFortschritt` — bei `solved === total` → `_aktiviereLoesungswort` statt bisheriger Logik
  - AENDERN: `_renderLoesungscodeSektion` — initial unsichtbar (`display: none`), keine Buchstaben-Logik
  - AENDERN: `_restoreLoesungswortState` — neue Restore-Logik basierend auf `abgeschlossen` und `solved === total`
  - AENDERN: `_savePlatzierterBuchstabe` — neues Format ohne `aufgabe-Index`
- `assets/css/themes/theme-gpg.css` — AENDERN:
  - `.loesungswort-bereich`: initial `display: none`
  - `.loesungswort-bereich--aktiv`: `display: block` (wird per JS gesetzt)
  - Bestehende Pool/Ziel-Stile bleiben

## Merge-Schutz

Wenn bei `git pull` oder `git push` Konflikte auftreten:
1. NICHT automatisch aufloesen (kein --theirs, kein --ours)
2. Konflikt-Dateien auflisten und dem User melden
3. Warten auf User-Entscheidung

## Erfolgskriterium

1. Waehrend Aufgaben geloest werden: Loesungswort-Bereich NICHT sichtbar
2. Nach letzter korrekter Antwort: Loesungswort-Bereich wird sichtbar, Auto-Scroll
3. Alle Buchstaben von "PULVER" erscheinen gleichzeitig im Pool, in zufaelliger Reihenfolge
4. Drag-and-Drop funktioniert (Mouse + Touch)
5. Richtig platziert → einrasten. Falsch → zurueck in Pool + Fehlversuch
6. Alle 6 Buchstaben korrekt → Sicherung/Hefteintrag erscheint
7. Reload nach allen Aufgaben geloest aber Loesungswort nicht fertig: Pool + bereits platzierte Buchstaben korrekt wiederhergestellt
8. Reload nach Mappe abgeschlossen: Alle Buchstaben in Feldern, Sicherung sichtbar
9. Kein `freischalt_buchstabe` mehr im Code (grep-Verifikation)

## Verifikation

- [ ] `grep -r "freischalt_buchstabe" assets/` — MUSS 0 Treffer liefern
- [ ] Aufgabe 1-4 loesen → Loesungswort-Bereich bleibt unsichtbar
- [ ] Aufgabe 5 (letzte) loesen → Bereich erscheint, 6 Buchstaben im Pool (PULVER, gemischt)
- [ ] Buchstabe an richtige Position ziehen → einrasten (Tintenblau)
- [ ] Buchstabe an falsche Position → rot blinken, zurueck in Pool
- [ ] Alle 6 korrekt → Sicherung erscheint
- [ ] Touch-Simulation (Chrome DevTools): Drag per Finger funktioniert
- [ ] Seite neu laden nach 3 von 6 Buchstaben platziert: Bereich sichtbar, 3 in Feldern, 3 im Pool
- [ ] Seite neu laden nach Mappe abgeschlossen: Alle in Feldern, Sicherung sichtbar
- [ ] Seite neu laden nach 3 von 5 Aufgaben geloest: Loesungswort-Bereich unsichtbar
- [ ] Keine `console.error` in DevTools

## Nach Abschluss

Melde den Abschluss in Cowork mit: "Update: v3.5h erledigt. Commit: [hash]. Ergebnis: [Zusammenfassung]"
