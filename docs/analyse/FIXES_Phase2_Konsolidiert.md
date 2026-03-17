# Konsolidierte Fix-Liste: Phase 2 – Template-Engine

Datum: 2026-03-13
Quellen: 3 unabhaengige Audits

1. `AUDIT_Phase2_Template_Engine.md` – Erstaudit (13 Befunde: B1-B4, C1-C4, D1-D5)
2. `AUDIT_Phase2_Verifizierung.md` – Verifizierung + 5 Blindstellen (2.1-2.5)
3. Externes Audit – 8 Zusatzbefunde (N1-N8)

---

## BLOCKER (muss vor Phase 3)

### FIX-01: data.json loesung-Typ pro Aufgabentyp [N1 + B2]

**Problem**: `data.json` definiert `"loesung": ""` (String). `escape-engine.js` erwartet aber:
- multiple-choice: String (`"B"`)
- zuordnung: Object (`{"Begriff1": "Kategorie1", ...}`)
- lueckentext: Array (`["Wort1", "Wort2"]`)
- reihenfolge: Array (`["Schritt1", "Schritt2"]`)
- freitext-code: String (`"antwort"`)

**Auswirkung**: AGENT_RAETSEL folgt dem Schema und produziert nur Strings. `_checkZuordnung` (Zeile 699) prueft `typeof aufgabe.loesung === 'object'` – bei String ist `expected = ''`, jede leere Auswahl gilt als richtig. Zuordnungs-Aufgaben sind damit funktionsunfaehig.

**Fix – 3 Stellen**:

1. `data.json` – Schema erweitern:
```json
{
  "aufgaben": [
    {
      "typ": "multiple-choice",
      "loesung": ""
    },
    {
      "typ": "zuordnung",
      "loesung": {}
    },
    {
      "typ": "lueckentext",
      "loesung": []
    },
    {
      "typ": "reihenfolge",
      "loesung": []
    },
    {
      "typ": "freitext-code",
      "loesung": ""
    }
  ]
}
```

2. `ORCHESTRATOR.md` – Loesung-Schema dokumentieren mit Typ-Tabelle

3. `AGENT_RAETSEL.md` – Typ-spezifische Loesung-Formate als Pflichtanforderung

**Aufwand**: 30 min

---

### FIX-02: Hardcoded "5" durch dynamische Aufgabenanzahl ersetzen [B1 + D2]

**Problem**: `escape-engine.js` Zeile 437 und `mappe-template.html` Zeile 23 verwenden feste "5".

**Fix**:
- `escape-engine.js:437`: `'Aufgabe ' + (index + 1) + ' von ' + mappe.aufgaben.length`
- `mappe-template.html:23`: Initialen Text auf `"0 von ? Aufgaben"` setzen, wird von `_renderMappe` ueberschrieben

**Aufwand**: 10 min

---

### FIX-03: Lehrkraft-Seite Storage ohne init() [B3]

**Problem**: `lehrkraft.html` ruft `EscapeEngine.unlockMappe(mid)` auf, aber `EscapeEngine.init()` wurde nie aufgerufen. `_state.storageKey` ist `null`, Storage schreibt unter Key `"null"`.

**Fix**: In `initSteuerung()` (Zeile 290) nach Ableitung des `storageKey` die Engine initialisieren oder den Storage-Key direkt setzen. Bevorzugt: `EscapeEngine.init()` mit passendem `mappeId` aufrufen, oder einen neuen API-Endpunkt `EscapeEngine.setStorageKey(key)` einbauen.

**Aufwand**: 20 min

---

### FIX-04: Inline-Styles durch CSS-Klassen ersetzen [D3 + 2.1]

**Problem**: 11 Inline-Style-Zuweisungen, davon 8 in `lehrkraft.html` und 3 in `escape-engine.js`. Besonders kritisch: `escape-engine.js:704/706` setzt `borderColor` per `.style` im Zuordnungs-Feedback, umgeht das Theming-System.

**Fix**:
- `lehrkraft.html`: CSS-Klassen definieren (`.lehrkraft__aufgabe-detail`, `.lehrkraft__tipp-liste`, `.lehrkraft__gate-hinweis`, `.lehrkraft__inhalt`)
- `escape-engine.js:704/706`: CSS-Klassen `.aufgabe__zuordnung-zeile--correct` / `--incorrect` (analog zu existierenden `.aufgabe__option--correct/--incorrect`)
- `escape-engine.js:1145` (`bar.style.width`): Funktional notwendig, kein Fix noetig
- Die Klassen in `theme-gpg.css` definieren

**Aufwand**: 30 min

---

### FIX-05: Mappe-Kopier-Mechanismus dokumentieren [D5]

**Problem**: `index.html` erwartet `mappe-1.html`, `mappe-2.html` etc. Nur `mappe-template.html` existiert. Nirgends dokumentiert wie aus Template konkrete Dateien werden.

**Fix**: In `AGENT_TECHNIK.md` Abschnitt ergaenzen: Wie AGENT_TECHNIK pro Mappe eine Kopie von `mappe-template.html` erstellt, Dateiname = `{mappe.id}.html`.

**Aufwand**: 15 min

---

### FIX-06: Bessere Fehlermeldung bei fehlender data.json [2.5]

**Problem**: `index.html` Zeile 50-65: Catch-Block zeigt generisches "Spieldaten konnten nicht geladen werden" ohne Kontext. Bei Phase 3 (Pilot) ist data.json noch leer/nicht vorhanden.

**Fix**: Spezifischere Meldung: "Keine data.json gefunden. Dieses Template muss erst durch den AGENT_RAETSEL mit Inhalten befuellt werden."

**Aufwand**: 5 min

---

## SOLLTE vor Phase 3

### FIX-07: Navigationslogik absichern [B4 + N4]

**Problem**: `index.html:125` konstruiert `prevMappeId = 'mappe-' + index`. `mappe-template.html:109` setzt `'mappe-' + (currentNum + 1)`. Bricht bei nicht-numerischen IDs.

**Fix**: Zwei Optionen:
- A) ID-Konvention `mappe-{N}` in ORCHESTRATOR.md als Pflicht dokumentieren
- B) Navigation auf Array-Index umstellen statt ID-Parsing

Option A ist einfacher und reicht fuer den MVP.

**Aufwand**: 10 min (Option A) / 45 min (Option B)

---

### FIX-08: Lueckentext-Wortanzahl begrenzen [N3]

**Problem**: `_checkLueckentext` splittet Loesung per Space. Mehr als 2 Woerter pro Luecke erzeugt zu viele Felder, die UI wird unuebersichtlich.

**Fix**: In `AGENT_RAETSEL.md` dokumentieren: Lueckentext-Loesungen maximal 2 Woerter pro Luecke.

**Aufwand**: 5 min

---

### FIX-09: Storage-Fehler-Feedback [C3]

**Problem**: `Core.storage.set()` gibt `false` zurueck bei Fehler, kein Caller prueft den Rueckgabewert. Bei Schulgeraeten mit restriktiven Browser-Policies koennte localStorage blockiert sein.

**Fix**: In `saveProgress()` und `unlockMappe()` den Rueckgabewert pruefen und bei `false` eine Info-Meldung anzeigen.

**Aufwand**: 15 min

---

## KANN parallel zum Pilot

### FIX-10: base.css auf neutrale Defaults umstellen [C1]

**Problem**: `base.css` `:root`-Werte sind GPG-spezifisch. Ein zweites Theme muss wissen, was zu ueberschreiben ist.

**Fix**: `base.css` `:root` auf neutrale Werte (`--color-primary: #333` etc.), GPG-spezifische Werte nur in `theme-gpg.css`.

**Aufwand**: 30 min

---

### FIX-11: Doppelte `@keyframes fadeIn` [N6]

**Problem**: `theme-gpg.css` definiert `@keyframes fadeIn` (Zeile ~850), `base.css` ebenfalls. Theme ueberschreibt Base – kein Laufzeitfehler, aber verwirrend.

**Fix**: `fadeIn` nur in `base.css` definieren. In `theme-gpg.css` entfernen.

**Aufwand**: 5 min

---

### FIX-12: Reihenfolge-Aufgabe zeigt doppelten Text [N2]

**Problem**: `_renderReihenfolge` zeigt Loesungswoerter in Drag-Buttons UND als Luecken-Platzhalter. Der User sieht den Text zweimal.

**Fix**: Luecken-Platzhalter als nummerierte Slots (`1.`, `2.`, ...) statt Textinhalt darstellen.

**Aufwand**: 15 min

---

### FIX-13: `Core.storage.clear()` ist destruktiv [N8]

**Problem**: `Core.storage.clear()` loescht den gesamten localStorage, nicht nur Escape-Game-Daten. Andere Webseiten auf derselben Domain verlieren ihre Daten.

**Fix**: `clear()` durch Key-spezifisches Loeschen ersetzen: nur Keys mit Prefix `escape-` entfernen.

**Aufwand**: 10 min

---

### FIX-14: ASCII-Umlaute in JS-Strings [N7]

**Problem**: `escape-engine.js` und `core.js` verwenden konsequent ASCII-Umlaute (`ue`, `ae`, `oe`) in Kommentaren und Fehlermeldungen. In user-facing Strings (die SuS sehen) sollten echte Umlaute stehen.

**Fix**: User-facing Strings auf echte Umlaute umstellen. Kommentare koennen ASCII bleiben.

**Aufwand**: 20 min

---

### FIX-15: Tippfehler "zunachest" [D1]

**Problem**: `escape-engine.js` Zeile 473: Kommentar "zunachest" statt "zunaechst".

**Fix**: Tippfehler korrigieren.

**Aufwand**: 1 min

---

## KANN nach MVP

### FIX-16: Freitext-Validierung verfeinern [B2]

**Problem**: `indexOf` akzeptiert jeden Text, der die Loesung enthaelt. "Antwort123" matcht "Antwort".

**Fix**: Exakten Match als primaeren Check, `indexOf` nur als Fallback mit Warnung.

**Aufwand**: 15 min

---

### FIX-17: Passwort-Schutz evaluieren [C4]

**Problem**: `var PASSWORT = 'lehrkraft'` im Klartext. Fuer MVP akzeptabel.

**Fix**: Nur bei Bedarf (didaktisch sensibles Material). Dann serverseitige Loesung oder Hash.

---

### FIX-18: Unnoetige Storage-Roundtrip in unlockMappe [N5]

**Problem**: `unlockMappe()` liest State via `loadProgress()`, was den gesamten Storage-Wert parsed, nur um eine Property zu setzen.

**Fix**: Direkten `Core.storage.get/set` mit gezieltem Merge verwenden.

**Aufwand**: 10 min

---

## Nicht-Fix-Items (dokumentiert, kein Handlungsbedarf)

| ID | Befund | Grund |
|---|---|---|
| 2.2 | Kein DOMContentLoaded-Guard | Scripts stehen korrekt am Body-Ende. Fragil, aber funktional. |
| 2.3 | innerHTML ohne Sanitization in lehrkraft.html | Datenquelle ist eigene data.json, kein User-Input. Erst bei Upload-Szenarien relevant. |
| 2.4 | Event-Listener-Cleanup fehlt | Separate HTML-Dateien pro Mappe = kein Memory-Leak. Nur bei SPA-Umstellung relevant. |
| D4 | Fehlende meta description | GitHub Pages SEO irrelevant. Nice-to-have fuer Link-Previews. |

---

## Zusammenfassung

| Prioritaet | Anzahl | Geschaetzter Aufwand |
|---|---|---|
| BLOCKER (vor Phase 3) | 6 Fixes | ~110 min |
| SOLLTE (vor Phase 3) | 3 Fixes | ~30 min |
| KANN (parallel) | 6 Fixes | ~80 min |
| KANN (nach MVP) | 3 Fixes | ~25 min |
| **Gesamt** | **18 Fixes** | **~245 min** |

Die 6 Blocker-Fixes (FIX-01 bis FIX-06) sind Voraussetzung fuer den Phase-3-Pilotdurchlauf. FIX-01 (data.json Loesung-Typ) ist der kritischste, da er die gesamte Agent-Pipeline betrifft.
