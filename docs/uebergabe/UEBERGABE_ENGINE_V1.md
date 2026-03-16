# Uebergabe: Engine v1-Readiness — Infrastruktur-Update

**Datum:** 2026-03-16
**Ziel:** escape-engine.js, mappe-template.html und CSS so erweitern, dass das v1-Schema (materialien[], einstieg{}, sicherung{} mit tafelbild{}) korrekt gerendert wird. Danach: Validierung mit Test-Datensatz.
**Kontext:** Vier-Ebenen-Architektur (WORKFLOW_v1.md). Bevor der Material-Erstellungsworkflow laeuft, muss die Engine bereit sein.

---

## Referenz-Dateien

| Datei | Pfad | Relevanz |
|---|---|---|
| WORKFLOW_v1.md | `docs/architektur/WORKFLOW_v1.md` | Kanonisches Schema (Abschnitt 9), Tafelbild-Datenmodell, Sub-Schemas |
| ARCHITEKTUR_v1.md | `docs/architektur/ARCHITEKTUR_v1.md` | Engine-Erweiterungen (Abschnitt 5), Mappe-Template (Abschnitt 6) — Implementierungsreferenz |
| escape-engine.js | `weitergehts-online/assets/js/escape-engine.js` | Aktuelle Engine (nur Aufgaben-Renderer, kein Material) |
| core.js | `weitergehts-online/assets/js/core.js` | Shared Utilities (Storage, Navigation, Feedback) |
| mappe-template.html | `weitergehts-online/escape-games/template/mappe-template.html` | Aktuelles Template (nur aufgaben-container) |
| base.css | `weitergehts-online/assets/css/base.css` | Basis-Styles |
| theme-gpg.css | `weitergehts-online/assets/css/themes/theme-gpg.css` | GPG-Theme |
| data.json (Game 1) | `weitergehts-online/escape-games/gpg-erster-weltkrieg-ursachen/data.json` | MVP-Daten (nur aufgaben[], kein materialien[]) |
| test-data.json | `docs/testdaten/test-data-v1.json` | Test-Datensatz mit allen v1-Features (wird mit diesem Prompt mitgeliefert) |

---

## Auftraege (STRIKT SEQUENTIELL)

### Auftrag 1: escape-engine.js erweitern

#### 1a: Fuzzy-Matching (`_fuzzyMatch`)

Neue Funktion fuer Freitext-Code-Validierung:

```javascript
function _fuzzyMatch(eingabe, loesung) {
  var a = eingabe.toLowerCase().trim();
  var b = loesung.toLowerCase().trim();
  if (a === b) return true;

  // Umlaut-Normalisierung (ae→ä, oe→ö, ue→ü, ss→ß und umgekehrt)
  var aNorm = _normalizeUmlaute(a);
  var bNorm = _normalizeUmlaute(b);
  if (aNorm === bNorm) return true;

  // Levenshtein-Distanz <= 2 (Tippfehler)
  if (_levenshtein(aNorm, bNorm) <= 2) return true;

  // Bindestrich/Leerzeichen-Toleranz
  var aClean = aNorm.replace(/[-\s]/g, '');
  var bClean = bNorm.replace(/[-\s]/g, '');
  if (aClean === bClean) return true;

  return false;
}
```

Implementiere `_normalizeUmlaute` und `_levenshtein` als Hilfsfunktionen. Integriere `_fuzzyMatch` in den bestehenden `_renderFreitextCode`-Pruefmechanismus.

#### 1b: Code-Reveal (`_revealFreischaltCode`)

In `_updateFortschritt()`: Wenn alle Aufgaben geloest (`solved === total && total > 0`), rufe `_revealFreischaltCode(mappe)` auf.

`_revealFreischaltCode`:
- Blendet Code-Bereich ein (`.code-eingabe` sichtbar machen)
- Zeigt Erfolgsmeldung via `Core.feedback.showSuccess`
- Scrollt zum Code-Bereich
- Code-Eingabefeld fokussieren

#### 1c: Material-Renderer (`_renderMaterialien`)

Neue Funktion `_renderMaterialien(materialien)` — rendert `mappen[].materialien[]`:

| `typ` | DOM-Output |
|---|---|
| `darstellungstext` | `<article class="material material--darstellung"><h3 class="material__titel">[titel]</h3><div class="material__inhalt">[inhalt als innerHTML]</div><p class="material__quelle">[quelle]</p></article>` |
| `quellentext` | `<blockquote class="material material--quelle"><div class="material__inhalt">[inhalt als innerHTML]</div><cite class="material__quelle">[quelle]</cite></blockquote>` |
| `bildquelle` | `<figure class="material material--bild"><img src="[inhalt]" alt="[titel]" loading="lazy"><figcaption>[bildunterschrift] — [quelle], [lizenz]</figcaption></figure>` |
| `karte` | `<figure class="material material--karte"><div class="material__inhalt">[inhalt als innerHTML, wenn SVG; oder img src wenn URL]</div><figcaption>[bildunterschrift] — [quelle]</figcaption></figure>` |
| `zeitleiste` | `<div class="material material--zeitleiste"><h3 class="material__titel">[titel]</h3><ol class="zeitleiste__liste">[li pro Eintrag: datum + text]</ol></div>` — inhalt ist JSON-Array `[{datum, text}]` |
| `statistik` | `<div class="material material--statistik"><h3 class="material__titel">[titel]</h3><table>[thead aus spalten, tbody aus zeilen]</table></div>` — inhalt ist JSON-Object `{spalten[], zeilen[[]]}` |
| `tagebuch` | `<article class="material material--tagebuch"><h3 class="material__titel">[titel]</h3><div class="material__inhalt tagebuch__text">[inhalt als innerHTML]</div><p class="material__quelle">[quelle]</p></article>` |

WICHTIG: `inhalt` ist bei Text-Typen (darstellungstext, quellentext, tagebuch) ein HTML-Fragment — direkt via `innerHTML` setzen. Bei `zeitleiste` und `statistik` ist `inhalt` strukturiertes JSON — parsen und typ-spezifisch rendern. Bei `bildquelle` und `karte` ist `inhalt` eine URL oder SVG-String.

Jedes Material bekommt ein `id`-Attribut am DOM-Element: `id="[material.id]"` (z.B. `id="mat-1-1"`).

#### 1d: Einstieg-Renderer (`_renderEinstieg`)

Rendert `mappen[].einstieg`:

```html
<section class="mappe__einstieg" id="einstieg-section">
  <div class="einstieg__narrativ">[einstieg.narrativ als innerHTML]</div>
  <p class="einstieg__problemstellung"><strong>[einstieg.problemstellung]</strong></p>
</section>
```

#### 1e: Sicherung-Renderer (`_renderSicherung`)

Rendert `mappen[].sicherung` (wird NACH allen Aufgaben angezeigt, initial hidden, sichtbar nach Code-Reveal):

```html
<section class="mappe__sicherung" id="sicherung-section">
  <h2>Sicherung</h2>
  <div class="sicherung__tafelbild" id="tafelbild-container">
    <!-- SVG wird von _renderTafelbild generiert -->
  </div>
  <div class="sicherung__zusammenfassung">[sicherung.zusammenfassung]</div>
  <p class="sicherung__ueberleitung"><em>[sicherung.ueberleitung]</em></p>
</section>
```

#### 1f: Tafelbild-Renderer (`_renderTafelbild`)

Generiert SVG aus `sicherung.tafelbild` JSON:

**Eingabe:** `{knoten[], verbindungen[], voraussetzungen[]}`

**Constraints:**
- Max 8 Knoten, max 10 Verbindungen
- Auto-Layout: hierarchisch (`kernbegriff` oben/zentral, `kategorie`/`ursache`/`wirkung` mittlere Reihe, `akteur`/`ereignis` untere Reihe)
- Kein manuelles x/y — Renderer berechnet Positionen
- Vanilla JS + SVG, keine externe Bibliothek
- ~200 Zeilen Code

**Knoten-Rendering:**

| Typ | Form | Farbe (CSS-Variable) |
|---|---|---|
| `kernbegriff` | Abgerundetes Rechteck, groesser (160x60) | `--tb-kernbegriff` |
| `kategorie` | Abgerundetes Rechteck, mittel (140x50) | `--tb-kategorie` |
| `ursache` | Parallelogramm oder Rechteck mit Pfeil-Icon | `--tb-ursache` |
| `wirkung` | Rechteck mit Effekt-Icon | `--tb-wirkung` |
| `akteur` | Ellipse | `--tb-akteur` |
| `ereignis` | Rechteck mit Zeitmarker | `--tb-ereignis` |

**Verbindungen-Rendering:**
- SVG `<line>` oder `<path>` mit Pfeilspitze (marker-end)
- Label als `<text>` entlang der Verbindung (Mitte)

**Voraussetzungen:**
- Knoten aus vorherigen Mappen als "Ghost-Knoten" (ausgegraut, gestrichelt) am oberen Rand
- Verbindung von Ghost-Knoten zum aktuellen Tafelbild (gestrichelte Linie)

**SVG-Groesse:** Responsive, viewBox-basiert. Container-Breite 100%, Hoehe auto.

#### 1g: Phasen-Renderer (`_renderMappeV1`)

Neue Funktion, die den gesamten Mappe-Aufbau steuert:

```
1. Pruefe: Hat mappe.materialien? Wenn nein → Fallback auf _renderMappe() (MVP-Modus)
2. Einstieg rendern (_renderEinstieg)
3. Erarbeitungs-Container erstellen (2-Spalten-Grid):
   - Links: Materialien (_renderMaterialien)
   - Rechts: Aufgaben (bestehende Renderer)
4. Sicherung rendern (_renderSicherung, initial hidden)
5. Code-Section (bestehend, mit auto-reveal)
```

Rueckwaertskompatibilitaet: Wenn `mappe.materialien` nicht existiert oder leer ist, wird der alte MVP-Renderer verwendet. Kein Breaking Change.

#### 1h: material_referenz-Integration

In den bestehenden Aufgaben-Renderern: Wenn `aufgabe.material_referenz` existiert (Array), zeige einen Verweis-Link:

```html
<p class="aufgabe__material-verweis">
  📖 Arbeite mit: <a href="#mat-1-1">[Material-Titel]</a>
</p>
```

Den Material-Titel aus `materialien[]` per ID nachschlagen. Bei mehreren Referenzen: kommaseparierte Links.

### Auftrag 2: mappe-template.html v1

Template ersetzen mit Phasen-Layout:

```html
<main class="mappe">
  <!-- Fortschritt -->
  <div class="mappe__header">
    <div class="fortschritt" aria-label="Fortschritt in dieser Mappe">
      <div class="fortschritt__label" id="fortschritt-label">0 von ? Aufgaben geloest (0%)</div>
      <div class="fortschritt__track">
        <div class="fortschritt__bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </div>
  </div>

  <!-- Phase 1: Einstieg (dynamisch) -->
  <section class="mappe__einstieg" id="einstieg-container"></section>

  <!-- Phase 2: Erarbeitung (Material + Aufgaben) -->
  <section class="mappe__erarbeitung" id="erarbeitung-container">
    <div class="erarbeitung__materialien" id="material-container"></div>
    <div class="erarbeitung__aufgaben" id="aufgaben-container">
      <p class="text-center">Aufgaben werden geladen...</p>
    </div>
  </section>

  <!-- Phase 3: Sicherung (dynamisch, initial hidden) -->
  <section class="mappe__sicherung" id="sicherung-container" style="display:none;"></section>

  <!-- Code-Eingabe -->
  <section class="code-eingabe" id="code-section" aria-label="Freischalt-Code eingeben">
    <!-- wie bisher -->
  </section>

  <!-- Navigation -->
  <nav class="mappe__navigation" aria-label="Mappe-Navigation">
    <!-- wie bisher -->
  </nav>
</main>
```

WICHTIG: Auch die konkreten mappe-1.html bis mappe-4.html unter `escape-games/gpg-erster-weltkrieg-ursachen/` muessen das neue Template uebernehmen. Und die mappe-template.html unter `escape-games/template/`.

### Auftrag 3: CSS erweitern (base.css + theme-gpg.css)

#### 3a: 2-Spalten-Grid

```css
.mappe__erarbeitung {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}

@media (min-width: 768px) {
  .mappe__erarbeitung {
    grid-template-columns: 1fr 1fr;
  }
  .erarbeitung__materialien {
    position: sticky;
    top: 1rem;
    align-self: start;
    max-height: calc(100vh - 2rem);
    overflow-y: auto;
  }
}
```

#### 3b: Material-Typ-Styles (BEM)

7 Material-Typen brauchen spezifische Styles:

```css
/* Basis */
.material { margin-bottom: var(--space-md); padding: var(--space-md); border-radius: var(--radius-md); }
.material__titel { margin-top: 0; }
.material__quelle { font-size: 0.85em; color: var(--color-muted); }

/* Darstellungstext */
.material--darstellung { background: var(--color-surface); border-left: 4px solid var(--color-primary); }

/* Quellentext */
.material--quelle { font-style: italic; border-left: 4px solid var(--color-accent); padding-left: var(--space-lg); }
.material--quelle cite { display: block; margin-top: var(--space-sm); font-style: normal; }

/* Bildquelle */
.material--bild img { max-width: 100%; height: auto; border-radius: var(--radius-sm); }
.material--bild figcaption { font-size: 0.85em; margin-top: var(--space-xs); }

/* Karte */
.material--karte { text-align: center; }
.material--karte img, .material--karte svg { max-width: 100%; height: auto; }

/* Zeitleiste */
.material--zeitleiste .zeitleiste__liste { list-style: none; padding-left: 0; border-left: 3px solid var(--color-primary); padding-left: var(--space-md); }
.zeitleiste__liste li { margin-bottom: var(--space-sm); position: relative; }
.zeitleiste__liste li::before { content: ''; position: absolute; left: calc(-1 * var(--space-md) - 7px); top: 0.5em; width: 12px; height: 12px; border-radius: 50%; background: var(--color-primary); }
.zeitleiste__datum { font-weight: bold; display: block; }

/* Statistik */
.material--statistik table { width: 100%; border-collapse: collapse; }
.material--statistik th, .material--statistik td { padding: var(--space-xs) var(--space-sm); border: 1px solid var(--color-border); text-align: left; }
.material--statistik th { background: var(--color-surface); font-weight: bold; }

/* Tagebuch */
.material--tagebuch { background: var(--color-surface-warm, #fdf6e3); border: 1px solid var(--color-border); font-family: 'Georgia', serif; }
.material--tagebuch .tagebuch__text { line-height: 1.8; }
```

#### 3c: Einstieg + Sicherung Styles

```css
.mappe__einstieg { margin-bottom: var(--space-xl); padding: var(--space-lg); background: var(--color-surface); border-radius: var(--radius-md); }
.einstieg__problemstellung { font-size: 1.1em; font-weight: 600; margin-top: var(--space-md); }

.mappe__sicherung { margin-top: var(--space-xl); padding: var(--space-lg); background: var(--color-surface); border-radius: var(--radius-md); }
.sicherung__tafelbild { margin-bottom: var(--space-lg); }
.sicherung__tafelbild svg { max-width: 100%; height: auto; }
.sicherung__zusammenfassung { margin-bottom: var(--space-md); }
.sicherung__ueberleitung { font-style: italic; color: var(--color-muted); }
```

#### 3d: Tafelbild CSS-Variablen

In theme-gpg.css:

```css
:root {
  --tb-kernbegriff: #2563eb;
  --tb-kategorie: #7c3aed;
  --tb-ursache: #dc2626;
  --tb-wirkung: #059669;
  --tb-akteur: #d97706;
  --tb-ereignis: #6b7280;
  --tb-ghost: #d1d5db;
  --tb-verbindung: #374151;
  --tb-label: #4b5563;
}
```

#### 3e: material_referenz Verweis-Style

```css
.aufgabe__material-verweis { font-size: 0.9em; color: var(--color-muted); margin-bottom: var(--space-sm); }
.aufgabe__material-verweis a { color: var(--color-primary); text-decoration: underline; }
```

### Auftrag 4: data.json Template erweitern

`escape-games/template/data.json` auf v1-Schema aktualisieren:

```json
{
  "meta": {
    "titel": "",
    "fach": "",
    "jahrgangsstufe": "",
    "lehrplanbezug": "",
    "schwierigkeit": "",
    "geschaetzte_dauer_min": 0,
    "narrativ": ""
  },
  "mappen": [
    {
      "id": "mappe-1",
      "titel": "",
      "beschreibung": "",
      "freischalt_code": "",
      "einstieg": {
        "narrativ": "",
        "problemstellung": ""
      },
      "materialien": [
        {
          "id": "mat-1-1",
          "typ": "darstellungstext",
          "titel": "",
          "inhalt": "",
          "quelle": "",
          "lizenz": ""
        }
      ],
      "aufgaben": [
        {
          "id": "aufgabe-1-1",
          "typ": "multiple-choice",
          "frage": "",
          "material_referenz": ["mat-1-1"],
          "optionen": [],
          "loesung": "",
          "tipps": [
            {"stufe": 1, "text": ""},
            {"stufe": 2, "text": ""},
            {"stufe": 3, "text": ""}
          ],
          "punkte": 0
        }
      ],
      "sicherung": {
        "tafelbild": {
          "knoten": [],
          "verbindungen": [],
          "voraussetzungen": []
        },
        "zusammenfassung": "",
        "ueberleitung": ""
      }
    }
  ]
}
```

### Auftrag 5: Test-Datensatz laden und validieren

Kopiere `docs/testdaten/test-data-v1.json` nach `escape-games/gpg-erster-weltkrieg-ursachen/data.json` (als temporaeren Test — altes data.json vorher sichern als `data-mvp-backup.json`).

Dann alle 4 Mappe-Seiten im Browser oeffnen und pruefen:
- Einstieg wird gerendert
- Materialien werden korrekt nach Typ gerendert (alle 7 Typen)
- Aufgaben funktionieren wie bisher
- material_referenz-Links verweisen korrekt
- Sicherung erscheint nach Code-Reveal
- Tafelbild-SVG wird generiert und zeigt Knoten + Verbindungen
- 2-Spalten-Layout auf Desktop, 1-Spalte mobil
- MVP-Fallback: Wenn materialien[] fehlt, alte Darstellung
- Keine JS-Fehler in der Konsole

Nach Validierung: `data-mvp-backup.json` wieder als `data.json` zurueckstellen (Game 1 bleibt im MVP-Zustand bis Ebene-2-Produktion laeuft).

---

## Erfolgskriterien

1. **Rueckwaertskompatibilitaet:** Game 1 (MVP data.json ohne materialien[]) funktioniert weiterhin ohne Aenderung
2. **v1-Rendering:** Test-Datensatz (mit materialien[], einstieg{}, sicherung{}, tafelbild{}) rendert korrekt
3. **7 Material-Typen:** Alle 7 Typen (darstellungstext, quellentext, bildquelle, karte, zeitleiste, statistik, tagebuch) haben spezifisches Rendering
4. **Tafelbild:** SVG-Generierung aus JSON, Auto-Layout, alle 6 Knoten-Typen, Verbindungen mit Labels
5. **Fuzzy-Matching:** Umlaute, Tippfehler (Levenshtein <= 2), Leerzeichen/Bindestriche werden toleriert
6. **Code-Reveal:** Automatische Anzeige nach allen Aufgaben geloest
7. **Responsive:** 2-Spalten ab 768px, 1-Spalte darunter
8. **Keine externe Abhaengigkeit:** Vanilla JS, kein Build-Schritt, keine Bibliothek

---

## Nicht im Scope

- Inhaltliche Materialien fuer Game 1 erstellen (kommt in Ebene 2)
- AGENT_INHALT.md oder AGENT_DIDAKTIK.md aktualisieren (kommt separat)
- Lehrkraft-Seite aktualisieren (kommt in Phase 3.3)
- Miro-Integration (Phase 5+)
