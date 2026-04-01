# Uebergabe-Prompt: v3.8 Bugfix — Tipp-Rendering + Stundenfrage + M1-Titel

**Datum:** 2026-03-30
**Von:** Cowork (Browser-Validierung)
**An:** Claude Code (Implementierung)
**Vorgaenger:** Engine-Erweiterung fd883dc, Migration 2a192e5

---

## Pre-Flight

- [ ] `git status` — Working Tree sauber
- [ ] `git pull` — Aktuell mit origin/main
- [ ] `assets/js/escape-engine.js` lesen (Tipp-Rendering ab Zeile ~2695)
- [ ] `escape-games/gpg-erster-weltkrieg-ursachen/data.json` lesen

Falls Pre-Flight fehlschlaegt: STOPP.

---

## Fix 1: Tipp-Rendering — Auto-Prepend entfernen

### Problem

Die alte Auto-Prepend-Logik (v3.5c) fuer `material_referenz` in Tipp 1 umgeht die neue `_parseInlineMaterialLinks`-Funktion. Wenn `tippIndex === 0 && hatMaterialRef`, wird:
1. "Schau dir an: [Materialtitel]." als Prefix gerendert (obsolet)
2. Der Rest-Text via `createTextNode` angehaengt — `[[...]]`-Markup erscheint als Rohtext

### Loesung

Den gesamten `material_referenz`-Sonderpfad fuer Tipp 1 entfernen. ALLE Tipps einheitlich durch `_parseInlineMaterialLinks` rendern.

### Konkret

**Entfernen** (Zeilen ~2700-2729, der gesamte Block):
```javascript
// v3.5c: Material-Ref in Tipp 1 prependen
if (tippIndex === 0 && materialRefText) {
  tippText = materialRefText + ' ' + tippText;
}
// Material-Links als klickbare Anker rendern
if (tippIndex === 0 && hatMaterialRef) {
  contentArea.innerHTML = '';
  var refs = aufgabe.material_referenz;
  // ... gesamter Block bis einschliesslich:
  //   contentArea.appendChild(document.createTextNode(restText));
  // }
} else {
```

**Ersetzen durch** (einfacher, einheitlicher Pfad):
```javascript
{
```

Ergebnis: Der `else`-Block (Zeilen ~2731-2732) wird zum einzigen Pfad:
```javascript
contentArea.innerHTML = '';
contentArea.appendChild(_parseInlineMaterialLinks(tippText));
```

### Zusaetzlich pruefen

Die Variable `materialRefText` und `hatMaterialRef` werden frueher im Code gesetzt. Wenn sie nur fuer den entfernten Block verwendet werden, koennen sie ebenfalls entfernt werden. Falls sie noch anderswo referenziert werden: belassen.

---

## Fix 2: Stundenfrage vereinheitlichen

### Problem

Zwei verschiedene Formulierungen:
- `einstieg.problemstellung`: "Warum war Europa vor 1914 ein 'Pulverfass' — und warum genügt ein einziger Funke?"
- `sicherung.tafelbild.stundenfrage`: "Warum wurde Europa vor 1914 zum Pulverfass?"

Die Stundenfrage soll **eine** zentrale, eindeutige Frage sein. Der Sticky-Header zeigt die `stundenfrage`, der Einstieg die `problemstellung` — beide muessen inhaltlich identisch sein.

### Loesung

Beide Felder auf dieselbe Formulierung setzen:

**`einstieg.problemstellung`:**
Alt: `"Warum war Europa vor 1914 ein 'Pulverfass' — und warum genügt ein einziger Funke?"`
Neu: `"Warum war Europa vor 1914 ein 'Pulverfass'?"`

**`sicherung.tafelbild.stundenfrage`:**
Alt: `"Warum wurde Europa vor 1914 zum Pulverfass?"`
Neu: `"Warum war Europa vor 1914 ein 'Pulverfass'?"`

(Der Funke-Teil gehoert zur Ueberleitung in Mappe 2, nicht in die Stundenfrage von Mappe 1.)

---

## Fix 3: M1-Titel (mat-1-1) anpassen

### Problem

"Warum war Europa vor 1914 so gefährlich?" ist zu allgemein fuer den Einstiegs-Darstellungstext (Problembegegnung).

### Loesung

**`materialien[0].titel` (mat-1-1):**
Alt: `"Warum war Europa vor 1914 so gefährlich?"`
Neu: `"Wie war die Situation in Europa vor 1914?"`

---

## Zusammenfassung

| Fix | Datei | Aenderung |
|-----|-------|-----------|
| 1 | `assets/js/escape-engine.js` | Auto-Prepend-Block entfernen, alle Tipps durch `_parseInlineMaterialLinks` |
| 2 | `escape-games/.../data.json` | `einstieg.problemstellung` + `sicherung.tafelbild.stundenfrage` vereinheitlichen |
| 3 | `escape-games/.../data.json` | `mat-1-1.titel` aendern |

---

## Merge-Schutz

**Aendern:** `assets/js/escape-engine.js`, `escape-games/gpg-erster-weltkrieg-ursachen/data.json`

**NICHT aendern:** `docs/**`, CSS, HTML-Templates.

---

## Verifikations-Checkliste

1. [ ] Tipp 1 von aufgabe-1-1: zeigt `[[mat-1-2|Europakarte von 1914]]` als klickbaren Link (NICHT als Rohtext)
2. [ ] Tipp 1 von aufgabe-1-1: zeigt NICHT "Schau dir an: ..." als Prefix
3. [ ] Tipp 2/3 funktionieren weiterhin normal
4. [ ] `einstieg.problemstellung` === `sicherung.tafelbild.stundenfrage` === "Warum war Europa vor 1914 ein 'Pulverfass'?"
5. [ ] mat-1-1 Titel: "Wie war die Situation in Europa vor 1914?"
6. [ ] JSON valide
7. [ ] Tipps ohne `[[...]]`-Markup (aufgabe-1-4, -1-5) funktionieren identisch wie vorher

---

## Commit-Konvention

```
v3.8: Bugfix — Tipp-Inline-Links, Stundenfrage vereinheitlicht, M1-Titel
```
