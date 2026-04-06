# UEBERGABE — Phase IV Wave 2 AU-3: Quellenkritik Engine-Integration

**Erstellt:** 2026-04-06 (Cowork-PM Session 13)
**Fuer:** Claude-Code (Code-Strang)
**ATOM-UNIT:** AU-3 (`docs/architektur/vertraege/VERTRAG_ATOM_UNITS.md`)
**STR:** STR-08 Quellenkritik + STR-11 Teil 2

---

## 1. Kontext

AU-3 fuehrt den 8. Aufgabentyp `quellenkritik` ein. PM-Strang (Cowork) hat geliefert: neuer Subagent `SUB_AUFGABE_QUELLENKRITIK.md`, typ-Wert im Vertrag, Progressionsplan-Heuristik, AGENT_RAETSEL Subagenten-Referenz, Guetekriterium A27. Code-Strang muss Engine-Registry und Renderer ergaenzen.

## 2. Scope (3 Aenderungen)

### Scope A: AufgabentypRegistry (escape-engine.js)

**Datei:** `assets/js/escape-engine.js`, `AufgabentypRegistry` (aktuell Z. ~155)

**Aenderung:** Neuen Typ `quellenkritik` registrieren, analog zu `vergleich`/`begruendung` aus AU-1.

```javascript
AufgabentypRegistry.register('quellenkritik', {
  render: '_renderQuellenkritik',
  check: '_checkQuellenkritik'
});
```

### Scope B: Renderer `_renderQuellenkritik` (escape-engine.js)

**Neue Funktion** analog zu bestehenden Renderern. Zeigt:

1. **Material-Referenz:** Link zum referenzierten Material (aus `material_referenz` Feld). Format: `<p class="aufgabe__material-ref">Lies das Material [[mat-id|Anzeigetext]] und beantworte die folgenden Fragen:</p>`
2. **W-Fragen-Liste:** Fuer jedes Element in `w_fragen` Array:
   - Nummerierte Frage (`<label>`)
   - Textarea-Eingabefeld (`<textarea class="quellenkritik__antwort" data-schluessel="{schluessel}" rows="2">`)
3. **Pruefen-Button:** Standard-Pattern aus anderen Typen.
4. **Feedback-Zone:** Standard-Pattern.

**data.json-Struktur** (Aufgabe-Objekt):
```json
{
  "typ": "quellenkritik",
  "frage": "Analysiere die Quelle genauer.",
  "w_fragen": [
    {"schluessel": "wer", "frage": "Wer hat diesen Text geschrieben?"},
    {"schluessel": "warum", "frage": "Warum hat der Verfasser das geschrieben?"}
  ],
  "loesung": {
    "wer": "Musterantwort...",
    "warum": "Musterantwort..."
  },
  "material_referenz": "mat-N-M"
}
```

### Scope C: Check-Funktion `_checkQuellenkritik` (escape-engine.js)

**Validierungslogik:** Keyword-Matching pro W-Frage, analog zu `_checkFreitext`:

```
fuer jedes w_fragen-Element:
  schluessel = element.schluessel
  eingabe = textarea[data-schluessel=schluessel].value.trim().toLowerCase()
  muster = loesung[schluessel].toLowerCase()
  keywords = extrahiere Schluesselwoerter aus muster (min 2)
  treffer = zaehle keywords in eingabe
  IF treffer >= ceil(keywords.length * 0.5):
    markiere als korrekt (gruen)
  ELSE:
    markiere als falsch (rot), zeige Musterantwort
```

**Gesamt-Ergebnis:** PASS wenn >= 50% der W-Fragen korrekt. Zeige Gesamt-Feedback.

### Scope D: Cache-Bust

**Dateien:** Alle HTML-Dateien mit `?v=4.3` → `?v=4.4`.

Pruefe: `grep -r "v=4.3" --include="*.html"` und passe ALLE Treffer an.

## 3. Pre-Commit-Gate-3-Checks

| Check | Pruefung |
|-------|----------|
| RA1 Scope | Nur `quellenkritik`-bezogene Aenderungen in Engine. Kein Touch auf andere Aufgabentypen, kein data.json, kein Schema-Change an bestehenden Typen. |
| RA3 Code-Kopplung | Bestehende Renderer/Check-Funktionen unveraendert. Neuer Typ nutzt AufgabentypRegistry-Pattern (AU-1 etabliert). Keine neuen globalen Abhaengigkeiten. |
| RA4 ATOM-UNIT | Engine-Registry + Renderer + Check + Cache-Bust in einem Commit. |

## 4. Smoke-Test (nach Commit)

Da Game 1 keine Quellenkritik-Aufgabe hat (Infrastruktur-First):

1. **Unit-Test:** Erstelle temporaere Test-Aufgabe in data.json (Mappe 4 oder separate Test-Datei) mit `typ: "quellenkritik"`, 3 W-Fragen, Musterantworten.
2. Navigiere zur Seite → Aufgabe muss rendern: Material-Referenz + 3 Textareas + Pruefen-Button.
3. Tippe Antworten → "Pruefen" → korrekte/falsche Markierung pro W-Frage.
4. Lade Seite neu → gespeicherte Eingaben muessen in Textareas wiederhergestellt sein.
5. Entferne Test-Aufgabe nach erfolgreichem Smoke-Test.
6. Pruefe: Alle anderen Aufgabentypen (MC, Zuordnung, etc.) funktionieren weiterhin.

## 5. Kein Backfill, kein Bestands-Patch

AU-3 ist Infrastruktur-Erweiterung. Quellenkritik-Aufgaben entstehen erst bei kuenftiger Game-Generierung (Game 2+). Game 1 bleibt unveraendert (ausser temporaerem Smoke-Test).

## 6. CSS-Hinweise

Neue BEM-Klassen analog bestehender Typen:
- `.aufgabe--quellenkritik` (Container)
- `.quellenkritik__frage` (W-Frage Label)
- `.quellenkritik__antwort` (Textarea)
- `.quellenkritik__material-ref` (Material-Link)

Theme-gpg.css: Styling analog `.aufgabe--begruendung` (Textareas im Notizbuch-Theme). Min-height, resize:vertical, font-family:inherit (Lesson aus AU-2c).
