# UEBERGABE — Phase IV Wave 1 AU-2c: Vergleich-Zellenhoehe CSS-Fix

**Erstellt:** 2026-04-06 (Cowork-PM Session 13)
**Fuer:** Claude-Code (Code-Strang)
**Befund:** `docs/befunde/BEFUND-AU-1-UI-01.md`
**ATOM-UNIT:** AU-2c (`docs/architektur/vertraege/VERTRAG_ATOM_UNITS.md`)

---

## 1. Kontext

Vergleich-Aufgaben (`typ: "vergleich"`, eingefuehrt AU-1 Commit `5b470c5`) rendern Input-Zellen als `<input type="text">` (single-line). Im Notizbuch-Handschrift-Theme werden laengere Eingaben horizontal abgeschnitten, da kein Zeilenumbruch moeglich ist. SuS koennen ihre Eingabe nicht vollstaendig sehen.

## 2. Scope (3 Aenderungen)

### Scope A: Renderer-Patch (escape-engine.js)

**Datei:** `assets/js/escape-engine.js`, Funktion `_renderVergleich` (aktuell Z. ~3058-3073)

**Aenderung:** `input` → `textarea` umstellen.

Aktuell:
```javascript
var input = document.createElement('input');
input.type = 'text';
input.className = 'vergleich__zelle';
```

Neu:
```javascript
var input = document.createElement('textarea');
input.className = 'vergleich__zelle';
input.rows = 2;
```

**Constraints:**
- `input.value` Zugriff bleibt identisch fuer `textarea` — `_checkVergleich` braucht KEINE Aenderung.
- `input.disabled = geloest;` bleibt identisch.
- `input.id` und `input.setAttribute('aria-label', ...)` bleiben identisch.
- `savedZellen[cellKey]` Restore ueber `.value` bleibt identisch.

**Verifizierung:** `_checkVergleich` muss unveraendert funktionieren. Teste: Eingabe in Zelle → "Pruefen" klicken → korrekte/falsche Markierung erscheint.

### Scope B: CSS-Fix (theme-gpg.css)

**Datei:** `assets/css/themes/theme-gpg.css`, Selektoren ab Z. ~2384

Aktuell:
```css
.aufgabe--vergleich .vergleich__zelle {
  width: 100%;
  box-sizing: border-box;
  padding: 0.35rem 0.5rem;
  /* ... */
  background: #fff;
}
```

Ergaenzen/Aendern:
```css
.aufgabe--vergleich .vergleich__zelle {
  width: 100%;
  box-sizing: border-box;
  padding: 0.35rem 0.5rem;
  min-height: 2.5rem;
  resize: vertical;
  font-family: inherit;
  font-size: inherit;
  line-height: 1.4;
  border: 1px solid var(--color-border, #bbb);
  border-radius: 3px;
  background: #fff;
}
```

**Constraints:**
- `font-family: inherit` stellt sicher, dass die Handschrift-Schriftart des Themes auch in der Textarea greift.
- `resize: vertical` erlaubt SuS bei Bedarf die Zelle zu vergroessern.
- Bestehende `:focus`-Regel (Z. ~2394) bleibt unveraendert.

### Scope C: Cache-Bust

**Dateien:** Alle HTML-Dateien mit `?v=4.2` → `?v=4.3`.

Betroffene Dateien (6 HTML + ggf. Subpage):
- `escape-games/gpg-erster-weltkrieg-ursachen/mappe-1.html`
- `escape-games/gpg-erster-weltkrieg-ursachen/mappe-2.html`
- `escape-games/gpg-erster-weltkrieg-ursachen/mappe-3.html`
- `escape-games/gpg-erster-weltkrieg-ursachen/mappe-4.html`
- `escape-games/gpg-erster-weltkrieg-ursachen/index.html`
- `escape-games/gpg-erster-weltkrieg-ursachen/lehrkraft.html`

Pruefe zusaetzlich: `grep -r "v=4.2" --include="*.html"` und passe ALLE Treffer an.

## 3. Pre-Commit-Gate-3-Checks

| Check | Pruefung |
|-------|----------|
| RA1 Scope | Nur `.vergleich__zelle`-bezogene Aenderungen. Kein Touch auf andere Aufgabentypen, kein data.json, kein Schema. |
| RA3 Code-Kopplung | `_checkVergleich` unveraendert, `.value`-Zugriff textarea-kompatibel. Keine neuen Abhaengigkeiten. |
| RA4 ATOM-UNIT | CSS + Renderer + Cache-Bust in einem Commit. |

## 4. Smoke-Test (nach Commit)

1. Navigiere zu `mappe-4.html` (v=4.3 geladen? DevTools → Network pruefen).
2. Starte `aufgabe-4-8` (Vergleich).
3. Tippe in eine Zelle 30+ Zeichen → Text muss umbrechen (mehrzeilig sichtbar).
4. Klicke "Pruefen" → korrekte/falsche Markierung muss erscheinen.
5. Lade Seite neu → gespeicherte Eingaben muessen in Textareas wiederhergestellt sein.
6. Pruefe `aufgabe-4-9` (Begruendung) → darf nicht beeinflusst sein.

## 5. Kein Backfill, kein Schema-Change

AU-2c ist ein reiner UI-Fix. Keine docs/-Aenderungen ausser CHANGELOG.md noetig.
