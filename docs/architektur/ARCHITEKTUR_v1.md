# Architektur v1: Vom Quiz zum Interaktiven Arbeitsblatt

> **TEILWEISE SUPERSEDED (2026-03-16):** data.json-Schema (Abschnitt 2) und Workflow (Abschnitt 9) sind durch `WORKFLOW_v1.md` ersetzt. Engine-Erweiterungen (Abschnitt 5) und Mappe-Template (Abschnitt 6) bleiben als Implementierungsreferenz gueltig.

**Datum:** 2026-03-15
**Basis:** ANALYSE_MVP_Game1.md (11 Befunde)
**Ziel:** Jede Mappe wird ein didaktisch strukturiertes, interaktives Arbeitsblatt mit Material-Erarbeitung + Aufgaben

---

## 1. Umsetzungsstrategie: 3 Iterationen

Die Befunde haben unterschiedliche Abhaengigkeiten. Saubere Reihenfolge:

### Iteration 3.1: Engine-Fixes + Schema-Erweiterung (Infrastruktur)

Voraussetzung fuer alles Weitere. Kein neuer Inhalt, nur technische Basis.

| Fix | Komponente | Aufwand |
|---|---|---|
| C1: Code-Reveal nach allen Aufgaben geloest | `escape-engine.js` | Klein |
| B2: Fuzzy-Matching fuer Freitext-Code | `escape-engine.js` | Mittel |
| D1: data.json Schema erweitern (`materialien[]`, `phasen[]`) | `data.json` Template | Mittel |
| D2: Material-Section ins Mappe-Template | `mappe-template.html` | Mittel |
| D3: Material-Renderer in Engine | `escape-engine.js` | Gross |

### Iteration 3.2: Inhalt + Material (Kern-Paradigmenwechsel)

Hier entsteht das eigentliche Erarbeitungsmaterial. Erfordert neuen Agent.

| Aufgabe | Komponente | Aufwand |
|---|---|---|
| A1: Materialien pro Mappe erstellen | Neuer AGENT_MATERIAL oder erweiterter AGENT_INHALT | Gross |
| B1: Reihenfolge-Aufgaben ueberarbeiten | data.json Game 1 | Klein |
| B3: Tipp-System redesignen | data.json Game 1 + AGENT_RAETSEL.md | Mittel |
| E1-E3: Didaktische Struktur in Mappen | data.json Game 1 | Gross |

### Iteration 3.3: Visuelles + QA

| Aufgabe | Komponente | Aufwand |
|---|---|---|
| CSS 2-Spalten-Layout (Material + Aufgabe) | `theme-gpg.css` / `base.css` | Mittel |
| Responsive Anpassung | CSS | Mittel |
| Qualitaetspruefung + Browsertest | AGENT_QUALITAET | Mittel |

---

## 2. data.json Schema v1

### Erweiterungen gegenueber MVP

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
          "titel": "Die Buendnisse Europas vor 1914",
          "inhalt": "Markdowntext oder HTML",
          "quelle": "",
          "lizenz": ""
        },
        {
          "id": "mat-1-2",
          "typ": "bildquelle",
          "titel": "Europa 1914 – Buendniskarte",
          "inhalt": "URL oder Base64 oder SVG-inline",
          "bildunterschrift": "",
          "quelle": "Wikimedia Commons",
          "lizenz": "CC0"
        },
        {
          "id": "mat-1-3",
          "typ": "quellentext",
          "titel": "Zeitgenoessischer Pressetext",
          "inhalt": "Zitat aus Originalquelle",
          "quelle": "Berliner Tageblatt, 1914",
          "lizenz": ""
        }
      ],

      "aufgaben": [
        {
          "id": "aufgabe-1-1",
          "typ": "multiple-choice",
          "frage": "",
          "material_referenz": "mat-1-1",
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
        "zusammenfassung": "",
        "ueberleitung": ""
      }
    }
  ]
}
```

### Neue Felder im Detail

**`mappen[].einstieg`** — Motivation/Problemstellung, die in den Kontext einfuehrt:
- `narrativ`: Fortschreibung der Reporter-Geschichte ("Du erhaeltst einen Hinweis von einem Informanten...")
- `problemstellung`: Konkrete Fragestellung, die die Mappe beantwortet ("Warum war Europa vor 1914 so angespannt?")

**`mappen[].materialien[]`** — Erarbeitungsmaterial, das VOR/NEBEN den Aufgaben praesentiert wird:

| `typ` | Beschreibung | Rendering |
|---|---|---|
| `darstellungstext` | Sachtext, didaktisch aufbereitet, SuS-gerecht | Markdown → HTML, Box mit Hintergrund |
| `quellentext` | Historische Originalquelle (Zitat, Brief, Pressetext) | Kursiv, Rahmen, Quellenangabe darunter |
| `bildquelle` | Bild mit Bildunterschrift und Quellennachweis | `<figure>` + `<figcaption>` |
| `karte` | Kartendarstellung (SVG inline oder Bild) | Zoombar, Legende |
| `zeitleiste` | Chronologische Darstellung | Vertikale Timeline, CSS-generiert |
| `statistik` | Daten/Zahlen als Tabelle oder Diagramm | `<table>` oder SVG-Chart |
| `tagebuch` | Fiktiver oder realer Tagebucheintrag | Handschrift-Stil, persoenliche Perspektive |

**`aufgaben[].material_referenz`** — Verknuepft eine Aufgabe mit dem Material, auf das sie sich bezieht. Ermoeglicht:
- Tipp Stufe 2: "Schau dir Material [Titel] nochmal an"
- Visuell: Aufgabe wird neben dem referenzierten Material dargestellt
- Optional (kein Pflichtfeld)

**`mappen[].sicherung`** — Abschluss der Mappe nach allen Aufgaben:
- `zusammenfassung`: 2-3 Saetze, die das Gelernte buendeln
- `ueberleitung`: Narrativ-Bruecke zur naechsten Mappe

### Rueckwaertskompatibilitaet

Das Schema ist **additiv** — alle neuen Felder sind optional. Der MVP-data.json funktioniert weiterhin. Die Engine prueft `if (mappe.materialien)` und rendert nur wenn vorhanden. So koennen bestehende Games ohne Aenderung weiterlaufen.

---

## 3. Material-Typen pro Mappe (Game 1, konkret)

### Mappe 1: Pulverfass Europa

| Material | Typ | Inhalt | Quelle/Erstellung |
|---|---|---|---|
| M1.1 | `darstellungstext` | Sachtext: Europas Grossmaechte vor 1914, Buendnissysteme erklaert | AGENT_MATERIAL schreibt, basierend auf Inhalt-MD |
| M1.2 | `karte` | Europakarte 1914 mit Dreibund (rot) und Triple Entente (blau) | wikimedia_search_images oder excalidraw SVG |
| M1.3 | `quellentext` | Zeitgenoessisches Pressezitat zu Rivalitaeten | AGENT_MATERIAL recherchiert |
| M1.4 | `zeitleiste` | Buendnisbildung 1882–1907 (4 Eintraege) | Engine-Renderer aus JSON |

### Mappe 2: Attentat von Sarajevo

| Material | Typ | Inhalt |
|---|---|---|
| M2.1 | `darstellungstext` | Das Attentat: Wer, Wo, Wann, Warum (Sachtext) |
| M2.2 | `bildquelle` | Historisches Foto oder Illustration Attentat |
| M2.3 | `zeitleiste` | Julikrise: 28.6. → 3.8.1914 (6 Stationen) |
| M2.4 | `darstellungstext` | Pulverfass-Metapher erklaert (Ursache vs. Ausloeser) |

### Mappe 3: Kriegsbegeisterung 1914

| Material | Typ | Inhalt |
|---|---|---|
| M3.1 | `bildquelle` | Historisches Propagandaplakat 1914 |
| M3.2 | `tagebuch` | Fiktiver Tagebucheintrag: Soldat zieht begeistert in den Krieg |
| M3.3 | `quellentext` | Gegenposition: Brief einer Mutter / Ehefrau (Angst, Trauer) |
| M3.4 | `darstellungstext` | Die 4 Gruende der Kriegsbegeisterung |

### Mappe 4: Schlieffen-Plan

| Material | Typ | Inhalt |
|---|---|---|
| M4.1 | `karte` | Schlieffen-Plan: Belgien-Route, Frankreich-Umfassung |
| M4.2 | `darstellungstext` | Das Zweifronten-Problem erklaert |
| M4.3 | `darstellungstext` | Der Plan und sein Scheitern (Marne September 1914) |
| M4.4 | `quellentext` | Zeitgenoessische Quelle zum Uebergang in den Stellungskrieg |

---

## 4. AGENT_MATERIAL — Neue Agenten-Rolle

### Einordnung im Workflow

```
ORCHESTRATOR
  ├── [1] AGENT_DIDAKTIK → Lernziele, Kompetenzerwartungen
  ├── [2] AGENT_INHALT → Kernaussagen, Fachbegriffe, Inhalts-MDs
  ├── [3] AGENT_MATERIAL (NEU) → Didaktische Materialien pro Mappe
  ├── [4] AGENT_RAETSEL → Aufgaben + data.json (inkl. Materialien)
  ├── [5] AGENT_TECHNIK → HTML/JS Implementierung
  ├── [6] AGENT_DESIGN → CSS, Responsive, UX
  └── [7] AGENT_QUALITAET → Pruefung + Review
```

### Verantwortlichkeit

AGENT_MATERIAL steht ZWISCHEN INHALT und RAETSEL. Er nimmt die fachlich korrekten Inhalts-MDs und transformiert sie in **didaktisch aufbereitete, schuelergerechte Materialien** fuer jede Mappe.

**Eingabe:**
- Inhalts-MDs (von AGENT_INHALT)
- Didaktischer Rahmen (von AGENT_DIDAKTIK)
- Themen-Briefing (Quelldateien, Narrativ)

**Ausgabe:**
- Pro Mappe: `material-mappe-X.md` mit vollstaendigen Material-Beschreibungen
- Material-Typ, Titel, Inhalt (ausformuliert), Quelle, Lizenz
- Einstieg (Narrativ + Problemstellung) und Sicherung (Zusammenfassung + Ueberleitung)

### Kern-Prinzipien

1. **Alles aus dem Material loesbar**: Jede Aufgabe der Mappe muss ausschliesslich mit dem praesentieren Material beantwortbar sein. Kein Vorwissen voraussetzen.

2. **Quellenorientierung**: Wo moeglich, historische Quellen verwenden (Bilder, Texte, Karten). Wo nicht moeglich, hochwertige Darstellungstexte auf Schulbuch-Niveau.

3. **Personifizierung**: Mindestens 1 Material pro Mappe mit persoenlicher Perspektive (Tagebuch, Brief, Augenzeugenbericht). Macht Geschichte greifbar fuer R7.

4. **Progressive Disclosure**: Material in der Mappe so anordnen, dass es vom Allgemeinen zum Spezifischen fuehrt. Einstieg schafft Orientierung, dann Details.

5. **MCP-Tool-Nutzung**:
   - `wikimedia_search_images` fuer historische Bilder (Public Domain)
   - `excalidraw: create_view` fuer Diagramme, Zeitleisten, Karten-Skizzen
   - Miro-Einbettung als optionale Erweiterung (Phase 5+, nicht v1-Kern)

6. **Altersangemessenheit**: Texte auf R7-Mittelschule-Niveau. Keine Fachsprache ohne Erklaerung. Saetze max. 20 Woerter. Absaetze max. 5 Saetze.

### User-Einbindung (Standardisierung)

Bevor AGENT_MATERIAL Materialien ausarbeitet, muss ein Abstimmungsschritt stattfinden:

1. AGENT_MATERIAL erstellt pro Mappe einen **Material-Entwurf** (Typ + Titel + 1-Satz-Beschreibung, keine Ausarbeitung)
2. Material-Entwurf wird dem User praesentiert (in Cowork oder als Markdown)
3. User gibt Feedback: Ergaenzungen, Korrekturen, Prioritaeten, eigene Quellen
4. Erst nach Freigabe: Ausarbeitung der Materialien

---

## 5. Engine-Erweiterungen (escape-engine.js)

### 5.1 Material-Renderer

Neue Funktion `_renderMaterialien(materialien)`:

| Material-Typ | DOM-Output |
|---|---|
| `darstellungstext` | `<article class="material material--darstellung"><h3>Titel</h3><div class="material__inhalt">Markdown→HTML</div></article>` |
| `quellentext` | `<blockquote class="material material--quelle"><p>Inhalt</p><cite>Quelle</cite></blockquote>` |
| `bildquelle` | `<figure class="material material--bild"><img src="..." alt="Titel"><figcaption>Bildunterschrift – Quelle, Lizenz</figcaption></figure>` |
| `karte` | `<figure class="material material--karte">SVG/IMG</figure>` |
| `zeitleiste` | `<ol class="material material--zeitleiste"><li>Eintrag</li>...</ol>` (CSS-Timeline-Styling) |
| `statistik` | `<table class="material material--statistik">...</table>` |
| `tagebuch` | `<article class="material material--tagebuch"><p class="tagebuch__text">Inhalt</p><p class="tagebuch__autor">Quelle</p></article>` |

### 5.2 Phasen-Renderer

Neue Funktion `_renderMappeV1(mappe, progress)`:

```
1. Einstieg rendern (narrativ + problemstellung)
2. Materialien rendern (scrollbar, vor Aufgaben)
3. Aufgaben rendern (mit material_referenz-Verknuepfung)
4. Sicherung rendern (nach letzter Aufgabe, vor Code-Eingabe)
5. Code-Section (mit auto-reveal nach allen Aufgaben)
```

Fallback: Wenn `mappe.materialien` nicht existiert → `_renderMappe()` (MVP-Modus). Rueckwaertskompatibel.

### 5.3 Code-Reveal (Fix C1)

In `_updateFortschritt()`:

```javascript
if (solved === total && total > 0) {
  _revealFreischaltCode(mappe);
}
```

`_revealFreischaltCode(mappe)`:
- Blendet Code-Bereich ein mit Animation
- Zeigt Erfolgsmeldung: "Alle Aufgaben geloest!"
- Zeigt den Code NICHT direkt an — stattdessen wird er als Ergebnis der Sicherungs-Phase praesentiert oder als letzter Narrativ-Schritt ("Dein Informant fluesternt dir den Code zu: ____")
- Code-Eingabefeld wird automatisch fokussiert

### 5.4 Fuzzy-Matching (Fix B2)

Neue Funktion `_fuzzyMatch(eingabe, loesung)`:

```javascript
function _fuzzyMatch(eingabe, loesung) {
  // 1. Exact match (lowercase, trimmed)
  var a = eingabe.toLowerCase().trim();
  var b = loesung.toLowerCase().trim();
  if (a === b) return true;

  // 2. Umlaut-Normalisierung (ae→ä, oe→ö, ue→ü, ss→ß)
  var aNorm = _normalizeUmlaute(a);
  var bNorm = _normalizeUmlaute(b);
  if (aNorm === bNorm) return true;

  // 3. Levenshtein-Distanz ≤ 2 (fuer Tippfehler)
  if (_levenshtein(aNorm, bNorm) <= 2) return true;

  // 4. Bindestrich/Leerzeichen-Toleranz
  var aClean = aNorm.replace(/[-\s]/g, '');
  var bClean = bNorm.replace(/[-\s]/g, '');
  if (aClean === bClean) return true;

  return false;
}
```

---

## 6. Mappe-Template v1

Neues Layout-Prinzip: **Phasen-Container** statt flacher Aufgaben-Block.

```html
<main class="mappe">
  <!-- Phase 1: Einstieg -->
  <section class="mappe__einstieg" id="einstieg-container">
    <!-- Narrativ + Problemstellung, dynamisch -->
  </section>

  <!-- Phase 2: Material + Erarbeitung -->
  <section class="mappe__erarbeitung" id="erarbeitung-container">
    <div class="erarbeitung__materialien" id="material-container">
      <!-- Materialien, dynamisch -->
    </div>
    <div class="erarbeitung__aufgaben" id="aufgaben-container">
      <!-- Aufgaben, dynamisch -->
    </div>
  </section>

  <!-- Phase 3: Sicherung -->
  <section class="mappe__sicherung" id="sicherung-container">
    <!-- Zusammenfassung + Code-Reveal, dynamisch -->
  </section>

  <!-- Loesungswort-Bereich (unterhalb des Grids, initial display:none) -->
  <section class="loesungswort-bereich">
    <!-- Wird sichtbar nach Loesung aller Aufgaben. Buchstaben-DnD-Puzzle. -->
  </section>

  <!-- Navigation -->
  <nav class="mappe__navigation">
    <!-- wie bisher -->
  </nav>
</main>
```

### CSS-Layout: 2-Spalten (Desktop/Tablet), 1-Spalte (Mobile)

```css
.erarbeitung {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}

@media (min-width: 768px) {
  .erarbeitung {
    grid-template-columns: 1fr 1fr;
  }
  .erarbeitung__materialien { position: sticky; top: 1rem; }
}
```

Mobile: Material oben, Aufgaben darunter (scrollbar).
Tablet/Desktop: Material links (sticky), Aufgaben rechts.

---

## 7. AGENT_RAETSEL: Verschaerfte Tipp-Regeln

### Neue Pflicht-Regeln (in AGENT_RAETSEL.md ergaenzen)

**Stufe 1 — Fragestellung reformulieren:**
- Ziel: Verstaendnis der Aufgabe sichern, nicht Loesung andeutetn
- Erlaubt: "Ueberlege: Was bedeutet [Begriff]?", "Schau dir [Material-Titel] nochmal an"
- Verboten: Irgendein Teil der Loesung nennen

**Stufe 2 — Auf Material verweisen + Denkansatz:**
- Ziel: SuS auf die richtige Stelle im Material lenken
- Erlaubt: "In [Material-Titel] steht eine Information ueber [Thema] — lies den zweiten Absatz nochmal"
- Verboten: Loesungsstruktur preisgeben ("X gehoert zu Y"), Optionsbuchstaben nennen

**Stufe 3 — Erklaerung des Zusammenhangs:**
- Ziel: Verstaendnis ermoeglichen, nicht Loesung kopieren lassen
- Erlaubt: Fachliche Erklaerung, die zur eigenen Ableitung fuehrt
- Verboten: "Richtig ist B", "Loesung: X, Y, Z", vollstaendige Loesungsliste

### Neue Pflicht-Regel fuer Reihenfolge-Aufgaben

**KEINE Zeitangaben in Optionen.** Optionen muessen inhaltliche Beschreibungen sein, nicht datierte Ereignisse. Die Zeitangaben gehoeren ins Material (Zeitleiste, Darstellungstext), nicht in die Aufgabe selbst.

Falsch: `"Dreibund (1882)"` → Triviale Sortierung nach Zahl
Richtig: `"Gruendung des Dreibundes"` → Erfordert Wissen ueber Chronologie

---

## 8. Miro-Integration (Ausblick, nicht v1-Kern)

Das Konzept "Materialpool auf Miro + Arbeitsflaeche auf Website" ist didaktisch stark, aber technisch komplex. Fuer v1 wird das Material direkt in der Engine gerendert (siehe Schema oben). Miro-Einbettung als Phase-5-Erweiterung:

- Miro-Board pro Mappe mit Materialien (Scans, Arbeitsblatter, Bilder)
- `<iframe>` Einbettung in der Material-Section
- MCP-Tools: `miro: create-board`, `create-image-item-using-url`, `create-text-item`
- Erfordert: Miro-Account, API-Zugang, Board-Sharing-Konfiguration

---

## 9. Umsetzungsreihenfolge (Handlungsplan)

### Phase 3.1: Infrastruktur (in Claude Code)

1. `escape-engine.js`: Code-Reveal-Logik nach allen Aufgaben geloest
2. `escape-engine.js`: Fuzzy-Matching fuer Freitext-Code
3. `escape-engine.js`: Material-Renderer (`_renderMaterialien`, `_renderMappeV1`)
4. `escape-engine.js`: Einstieg- und Sicherungs-Renderer
5. `escape-games/template/data.json`: Schema erweitern (materialien, einstieg, sicherung)
6. `escape-games/template/mappe-template.html`: Phasen-Layout
7. `assets/css/base.css` + `theme-gpg.css`: 2-Spalten-Grid, Material-Typ-Styles

### Phase 3.2: Inhalt + Material (Cowork → Claude Code)

1. **Cowork:** AGENT_MATERIAL.md erstellen (Agenten-Spezifikation)
2. **Cowork:** ORCHESTRATOR.md aktualisieren (neuer Agent im Workflow)
3. **Cowork:** AGENT_RAETSEL.md aktualisieren (Tipp-Regeln, Reihenfolge-Regeln)
4. **Cowork:** Material-Entwurf pro Mappe erstellen (Typ + Titel + Beschreibung)
5. **User-Review:** Material-Entwurf freigeben / korrigieren
6. **Claude Code:** Materialien ausarbeiten + in data.json einfuegen
7. **Claude Code:** Aufgaben ueberarbeiten (Reihenfolge, Tipps, Freitext)
8. **Claude Code:** Game 1 aktualisieren + testen

### Phase 3.3: Feinschliff + QA (Claude Code)

1. CSS-Anpassungen
2. Responsive-Test
3. AGENT_QUALITAET durchlaufen lassen
4. Iteration falls noetig
5. Commit + Push
