# Übergabe-Prompt: Phase v3-4 Engine-Erweiterung

**Datum:** 2026-03-28
**Von:** Cowork (Architektur)
**An:** Claude Code (Implementierung)
**Abhängigkeit:** Phase v3-3 abgeschlossen (Audit GO)

---

## Kontext

Die v3-Architektur ("Tafelbild-Professionalisierung") führt ein professionalisiertes Tafelbild ein:
- **AGENT_TAFELBILD** (Phase 0.4) erzeugt nach SKRIPT-Validierung ein fixiertes Tafelbild
- **Dualer Output:** JSON (`knoten[]` mit `merksatz`, `verbindungen[]`, `kernerkenntnisse[]`) + Hefteintrag (80-120 Wörter)
- **TB-FREEZE:** Nach Q-Gate PASS ist das Tafelbild unveränderlich; AGENT_MATERIAL übernimmt es 1:1

Die Escape-Game-Engine muss diese neuen Datenfelder rendern können. Aktuell kennt sie nur `{id, text, typ}` pro Knoten und `{tafelbild, zusammenfassung, ueberleitung}` in der Sicherung.

---

## Aufgabe

Drei Dateien ändern, ein Template aktualisieren:

### 1. `assets/js/escape-engine.js`

#### 1a: Merksätze unter SVG-Tafelbild rendern

**Wo:** Funktion `_renderSicherung()` (ca. Zeile 910-950), nach dem Tafelbild-SVG-Block und vor `zusammenfassung`.

**Was:** Wenn `sicherung.tafelbild.knoten[]` Einträge mit `merksatz`-Feld haben, diese als HTML-Liste rendern:

```html
<div class="sicherung__merksaetze">
  <h3>Merksätze</h3>
  <ul>
    <li><strong>{knoten.text}:</strong> {knoten.merksatz}</li>
    ...
  </ul>
</div>
```

**Logik:**
```javascript
// Nach container.appendChild(tafelbildDiv); (Zeile 930)
var merksaetze = (sicherung.tafelbild.knoten || []).filter(function(k) {
  return k.merksatz;
});
if (merksaetze.length > 0) {
  var merksatzDiv = document.createElement('div');
  merksatzDiv.className = 'sicherung__merksaetze';
  var merksatzH3 = document.createElement('h3');
  merksatzH3.textContent = 'Merksätze';
  merksatzDiv.appendChild(merksatzH3);
  var ul = document.createElement('ul');
  for (var mi = 0; mi < merksaetze.length; mi++) {
    var li = document.createElement('li');
    var strong = document.createElement('strong');
    strong.textContent = merksaetze[mi].text + ': ';
    li.appendChild(strong);
    li.appendChild(document.createTextNode(merksaetze[mi].merksatz));
    ul.appendChild(li);
  }
  merksatzDiv.appendChild(ul);
  container.appendChild(merksatzDiv);
}
```

#### 1b: Kernerkenntnisse rendern

**Wo:** `_renderSicherung()`, nach Merksätze-Block, vor `zusammenfassung`.

**Was:** Wenn `sicherung.kernerkenntnisse[]` existiert und nicht leer:

```javascript
if (sicherung.kernerkenntnisse && sicherung.kernerkenntnisse.length > 0) {
  var keDiv = document.createElement('div');
  keDiv.className = 'sicherung__kernerkenntnisse';
  var keH3 = document.createElement('h3');
  keH3.textContent = 'Kernerkenntnisse';
  keDiv.appendChild(keH3);
  var keUl = document.createElement('ul');
  for (var ki = 0; ki < sicherung.kernerkenntnisse.length; ki++) {
    var keLi = document.createElement('li');
    keLi.textContent = sicherung.kernerkenntnisse[ki];
    keUl.appendChild(keLi);
  }
  keDiv.appendChild(keUl);
  container.appendChild(keDiv);
}
```

#### 1c: Hefteintrag-Verweis rendern

**Wo:** `_renderSicherung()`, nach Kernerkenntnisse, vor `zusammenfassung`.

**Was:** Wenn `sicherung.hefteintrag_verweis` existiert:

```javascript
if (sicherung.hefteintrag_verweis) {
  var heDiv = document.createElement('div');
  heDiv.className = 'sicherung__hefteintrag';
  var heH3 = document.createElement('h3');
  heH3.textContent = 'Hefteintrag';
  heDiv.appendChild(heH3);
  var heP = document.createElement('p');
  heP.innerHTML = sicherung.hefteintrag_verweis;
  heDiv.appendChild(heP);
  container.appendChild(heDiv);
}
```

#### 1d: Reflexionsimpuls rendern

**Wo:** `_renderSicherung()`, nach `ueberleitung` (ganz am Ende).

**Was:** Wenn `sicherung.reflexionsimpuls` existiert:

```javascript
if (sicherung.reflexionsimpuls) {
  var refDiv = document.createElement('div');
  refDiv.className = 'sicherung__reflexion';
  var refP = document.createElement('p');
  refP.className = 'sicherung__reflexionsimpuls';
  var refEm = document.createElement('em');
  refEm.textContent = sicherung.reflexionsimpuls;
  refP.appendChild(refEm);
  refDiv.appendChild(refP);
  container.appendChild(refDiv);
}
```

#### Render-Reihenfolge in `_renderSicherung()` (komplett):

1. `<h2>Sicherung</h2>`
2. Tafelbild-Titel + SVG (bestehend)
3. **NEU: Merksätze** (aus `tafelbild.knoten[].merksatz`)
4. **NEU: Kernerkenntnisse** (aus `sicherung.kernerkenntnisse[]`)
5. **NEU: Hefteintrag** (aus `sicherung.hefteintrag_verweis`)
6. Zusammenfassung (bestehend)
7. Überleitung (bestehend)
8. **NEU: Reflexionsimpuls** (aus `sicherung.reflexionsimpuls`)

---

### 2. `assets/css/themes/theme-gpg.css`

#### 2a: Sicherung-Erweiterungen (Bildschirm-Styles)

**Wo:** Nach Abschnitt 17 (`v1: Einstieg + Sicherung Styles`, ca. Zeile 1001), neue Sektion einfügen.

```css
/* --------------------------------------------------------------------------
   17b. v3: Tafelbild-Erweiterungen (Merksaetze, Kernerkenntnisse, Hefteintrag)
   -------------------------------------------------------------------------- */

.sicherung__merksaetze {
  margin-top: var(--space-lg);
  padding: var(--space-md);
  background-color: rgba(37, 99, 235, 0.05);
  border-left: 4px solid var(--tb-kernbegriff, #2563eb);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.sicherung__merksaetze h3 {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  color: var(--color-primary);
  margin-bottom: var(--space-sm);
}

.sicherung__merksaetze ul {
  list-style: none;
  padding-left: 0;
}

.sicherung__merksaetze li {
  padding: var(--space-xs) 0;
  border-bottom: 1px solid var(--color-border);
  line-height: 1.6;
}

.sicherung__merksaetze li:last-child {
  border-bottom: none;
}

.sicherung__kernerkenntnisse {
  margin-top: var(--space-lg);
  padding: var(--space-md);
  background-color: rgba(5, 150, 105, 0.05);
  border-left: 4px solid var(--color-success);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.sicherung__kernerkenntnisse h3 {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  color: var(--color-primary);
  margin-bottom: var(--space-sm);
}

.sicherung__kernerkenntnisse ul {
  list-style: disc;
  padding-left: var(--space-lg);
}

.sicherung__kernerkenntnisse li {
  padding: var(--space-xs) 0;
  line-height: 1.6;
}

.sicherung__hefteintrag {
  margin-top: var(--space-lg);
  padding: var(--space-lg);
  background-color: #fff;
  border: 2px solid var(--color-secondary);
  border-radius: var(--radius-md);
  position: relative;
}

.sicherung__hefteintrag::before {
  content: "📓";
  position: absolute;
  top: var(--space-sm);
  right: var(--space-sm);
  font-size: var(--text-xl);
}

.sicherung__hefteintrag h3 {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  color: var(--color-primary);
  margin-bottom: var(--space-sm);
}

.sicherung__hefteintrag p {
  line-height: 1.8;
  font-size: var(--text-base);
}

.sicherung__reflexionsimpuls {
  margin-top: var(--space-md);
  font-size: var(--text-base);
  color: var(--color-muted);
}
```

#### 2b: Hefteintrag-Print-Styles

**Wo:** Im bestehenden `@media print`-Block (Zeile 1031-1055), ergänzen:

```css
/* v3: Hefteintrag-Druck */
.sicherung__hefteintrag {
  border: 2px solid #000;
  padding: 1rem;
  page-break-inside: avoid;
}

.sicherung__hefteintrag::before {
  display: none;
}

.sicherung__merksaetze {
  border-left: 3px solid #333;
  page-break-inside: avoid;
}

.sicherung__kernerkenntnisse {
  border-left: 3px solid #333;
  page-break-inside: avoid;
}

.sicherung__tafelbild svg {
  max-width: 100%;
  page-break-inside: avoid;
}
```

---

### 3. `escape-games/template/data.json`

**Aktuelles Schema** (sicherung):
```json
"sicherung": {
  "tafelbild": {
    "knoten": [],
    "verbindungen": [],
    "voraussetzungen": []
  },
  "zusammenfassung": "",
  "ueberleitung": ""
}
```

**Neues Schema** (v3):
```json
"sicherung": {
  "tafelbild": {
    "knoten": [
      {
        "id": "",
        "text": "",
        "typ": "",
        "merksatz": ""
      }
    ],
    "verbindungen": [],
    "voraussetzungen": [],
    "kernerkenntnisse": []
  },
  "hefteintrag_verweis": "",
  "reflexionsimpuls": "",
  "zusammenfassung": "",
  "ueberleitung": ""
}
```

**Änderungen:**
1. `knoten[]`: `merksatz`-Feld ergänzen (String, optional — leerer String wenn kein Merksatz)
2. `tafelbild`: `kernerkenntnisse[]` ergänzen (Array of Strings)
3. `sicherung`: `hefteintrag_verweis` ergänzen (String, HTML erlaubt)
4. `sicherung`: `reflexionsimpuls` ergänzen (String)

**Hinweis:** `kernerkenntnisse[]` liegt laut AGENT_TAFELBILD.md und AGENT_MATERIAL.md Abschnitt 2.2 auf Tafelbild-Ebene (nicht Sicherung-Ebene). In AGENT_MATERIAL Abschnitt 2.4 liegt es allerdings auf Sicherung-Ebene. Da die Engine `sicherung.kernerkenntnisse` oder `sicherung.tafelbild.kernerkenntnisse` abfragen muss: **beide Stellen abfragen** (Fallback-Logik):

```javascript
var kernerkenntnisse = sicherung.kernerkenntnisse
  || (sicherung.tafelbild && sicherung.tafelbild.kernerkenntnisse)
  || [];
```

---

### 4. Bestehende Testdaten erweitern (optional aber empfohlen)

Datei: `escape-games/gpg-erster-weltkrieg-ursachen/data.json`

Mappe 1 Sicherung → Knoten um `merksatz` erweitern (Beispiel):
```json
{
  "id": "k1-1",
  "text": "Pulverfass Europa",
  "typ": "kernbegriff",
  "merksatz": "Europa war vor 1914 durch Buendnisse, Nationalismus und Imperialismus ein Pulverfass — ein Funke genuegt."
}
```

Sicherung um neue Felder erweitern:
```json
"kernerkenntnisse": [
  "Europa war in zwei feindliche Buendnisbloecke gespalten: Dreibund und Triple Entente.",
  "Imperialismus und Nationalismus trieben das Wettrüsten an.",
  "Das Buendnissystem machte aus jedem lokalen Konflikt eine europaweite Gefahr."
],
"hefteintrag_verweis": "Übertrage das Tafelbild und die Merksätze in dein Heft. Achte auf die Verbindungspfeile zwischen den Begriffen.",
"reflexionsimpuls": "Warum konnte ein einzelner Schuss einen ganzen Kontinent in den Krieg stürzen?"
```

---

## Repo-Struktur (Relevante Dateien)

```
weitergehts-online/
├── assets/
│   ├── js/escape-engine.js          ← Änderung 1 (Rendering)
│   └── css/themes/theme-gpg.css     ← Änderung 2 (Styles)
├── escape-games/
│   ├── template/data.json           ← Änderung 3 (Schema)
│   └── gpg-erster-weltkrieg-ursachen/data.json  ← Änderung 4 (Testdaten)
└── docs/
    ├── agents/AGENT_TAFELBILD.md    ← Referenz (TB-Output-Format)
    ├── agents/AGENT_MATERIAL.md     ← Referenz (Abschnitt 2.2 + 2.4)
    └── architektur/WORKFLOW_v2.md   ← Referenz (Sicherungs-Schema)
```

## Erfolgskriterium

1. Mappe 1 der Testdaten (`gpg-erster-weltkrieg-ursachen`) rendert korrekt:
   - SVG-Tafelbild wie bisher
   - Merksätze als Liste unter dem SVG
   - Kernerkenntnisse als Aufzählung
   - Hefteintrag als hervorgehobener Block
   - Reflexionsimpuls nach der Überleitung
2. Print-Vorschau: Hefteintrag-Bereich druckbar (Strg+P), ohne Buttons/Navigation
3. Template `data.json` enthält die neuen Felder
4. Bestehende Mappen ohne die neuen Felder rendern fehlerfrei (Abwärtskompatibilität)
5. Keine `console.error` in DevTools

## Abwärtskompatibilität

Alle neuen Felder sind optional. Die Engine prüft `if (field)` bzw. `if (array.length > 0)` vor dem Rendern. Bestehende data.json-Dateien ohne `merksatz`, `kernerkenntnisse`, `hefteintrag_verweis`, `reflexionsimpuls` funktionieren unverändert.

## Nach Abschluss

Melde den Abschluss in Cowork mit:
```
Update: Phase v3-4 Engine-Erweiterung erledigt.
Ergebnis: escape-engine.js (4 neue Render-Blöcke), theme-gpg.css (Bildschirm + Print),
data.json Template + Testdaten aktualisiert. Commit: [hash]
```
