# Workflow v1: Vier-Ebenen-Architektur fuer Escape-Game-Erstellung

**Datum:** 2026-03-16 (Rev. 2 — Audit-Korrekturen eingearbeitet)
**Ersetzt:** Linearen 6-Agent-Workflow aus ORCHESTRATOR.md (MVP)
**Basis:** ARCHITEKTUR_v1.md + MATERIAL_PIPELINE.md + 2 Audit-Runden
**Kern-Prinzip:** Backward Design — vom Lernziel (Tafelbild) rueckwaerts zum Material
**Kanonisch fuer:** data.json Schema v1, Tafelbild-Datenmodell, Workflow-Ablauf

---

## 1. Warum eine neue Architektur?

Der MVP-Workflow war eine lineare Pipeline:

```
DIDAKTIK → INHALT → RAETSEL → TECHNIK → DESIGN → QUALITAET
```

Drei strukturelle Maengel:

1. **Keine Erarbeitung:** INHALT liefert Kernaussagen, RAETSEL baut Fragen — aber kein Material, anhand dessen SuS die Antworten eigenstaendig erarbeiten koennten.
2. **Kein Game-Gesamtblick:** Mappen wurden implizit als unabhaengige Einheiten behandelt. Keine aufbauende Progression, keine Lehrplan-Abdeckungsmatrix.
3. **Keine Material-Aufgaben-Verschraenkung:** Die didaktische Entscheidung "welches Material zu welcher Aufgabe" fiel nie explizit.

Die v1-Architektur trennt **Planung** (Ebene 0+1) von **Produktion** (Ebene 2+3) und fuehrt ein neues Strukturprinzip ein: Das **Tafelbild** als Zielsystem jeder Mappe, aufbauend ueber das gesamte Game.

---

## 2. Vier Ebenen im Ueberblick

```
EBENE 0: GAME-RAHMEN (einmalig pro Game)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Lehrplan → KE-Matrix → Tafelbild-Progression → Narrativ
Output: GAME_BLUEPRINT
Beteiligte: DIDAKTIK + INHALT (orchestriert)
User Review: PFLICHT
Ort: Cowork
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    │
                    ▼
EBENE 1: MAPPE-BLUEPRINT (pro Mappe, sequentiell)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tafelbild (Detail) → Material-Entwurf → Erarbeitbarkeits-Nachweis
Output: BLUEPRINT_MAPPE_N
Beteiligte: MATERIAL (Design-Modus)
User Review: PFLICHT
Ort: Cowork
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    │
                    ▼
EBENE 2: PRODUKTION (pro Mappe, sequentiell)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Material ausarbeiten → DANN Raetsel ausarbeiten
Output: Vollstaendiger data.json-Abschnitt pro Mappe
Beteiligte: MATERIAL (Produktions-Modus) → RAETSEL
Ort: Claude Code (Uebergabe-Prompt)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    │
                    ▼
EBENE 3: IMPLEMENTIERUNG (einmalig pro Game)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECHNIK → DESIGN → QUALITAET
Output: Fertiges, deployables Game-Verzeichnis
Ort: Claude Code (Uebergabe-Prompt)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 3. Agenten-Rollen in der neuen Architektur

### Rollenprofil-Veraenderungen gegenueber MVP

| Agent | Ebene | Rolle (neu) | Aenderung |
|---|---|---|---|
| DIDAKTIK | 0 | Lehrplan-Verankerung: KE → Mappen-Zuordnung, Schwierigkeitskurve, didaktische Prinzipien | Arbeitet auf Game-Ebene, nicht Mappe-Ebene |
| INHALT | 0 | Sachanalyse: Quellenarbeit, Kernaussagen-Extraktion, fachwissenschaftliche Korrektheit | Output geht an Ebene 0 (Tafelbild-Progression), nicht mehr direkt an RAETSEL |
| MATERIAL | 1+2 | **Design (Ebene 1):** Tafelbild-Detaillierung, Material-Entwurf, Erarbeitbarkeits-Nachweis. **Produktion (Ebene 2):** Materialien ausarbeiten, MCP-Tools nutzen | NEU. Zentrale didaktisch-kreative Rolle |
| RAETSEL | 2 | Methodische Umsetzung: Fragetyp-Auswahl, Aufgabenformulierung, Tipp-System | Entlastet: keine inhaltliche Verantwortung mehr, arbeitet auf fertigem Material |
| TECHNIK | 3 | HTML/JS-Implementierung + Schema-Erweiterungen | Erweitert: Material-Renderer, Tafelbild-Renderer, Phasen-Template |
| DESIGN | 3 | CSS, Responsive, UX, Material-Typ-Styling | Erweitert: 7 Material-Typ-Styles, 2-Spalten-Grid |
| QUALITAET | 3 | Pruefung, Lehrplan-Abdeckung, Erarbeitbarkeits-Validierung | Erweitert: prueft Tafelbild-Progression + Erarbeitbarkeit |

### INHALT vs. MATERIAL — Zustaendigkeitsgrenze

Die Trennung folgt zwei verschiedenen Kompetenzprofilen:

**INHALT denkt wie ein Historiker:**
- Was ist fachwissenschaftlich korrekt?
- Welche Quellen sind belastbar?
- Welche Kernaussagen tragen das Thema?
- Wo sind Vereinfachungen noch vertretbar, wo verfaelschend?

**MATERIAL denkt wie ein Lehrbuchautor:**
- Welches Material macht diesen Sachverhalt fuer R7 greifbar?
- Welcher Material-Typ (Quellentext, Karte, Tagebuch...) eignet sich?
- Wie ordne ich Material an, damit SuS den Tafelbild-Knoten eigenstaendig erschliessen?
- Wo brauche ich Personifizierung fuer emotionalen Zugang?

INHALT liefert die fachliche Substanz. MATERIAL transformiert sie in didaktisch wirksame Lernmaterialien. Keine Ueberlappung: MATERIAL erfindet keine Fakten, INHALT trifft keine didaktischen Gestaltungsentscheidungen.

---

## 4. Ebene 0: Game-Rahmen

### Eingabe

Themen-Briefing (`THEMEN_BRIEFING_[thema]_[game].md`) mit:
- Mappen-Struktur, Kernaussagen, Fachbegriffe, Quelldateien, Inhaltsluecken
- Oder Minimal-Eingabe (thema + lehrplanbezug + jahrgangsstufe + mappen_anzahl)

### Ablauf

```
Schritt 0.1: DIDAKTIK
  Eingabe: Themen-Briefing + Fachlehrplan
  Aufgabe: KE extrahieren, Mappen zuordnen, Schwierigkeitskurve festlegen
  Output:  KE-Matrix (welche KE in welcher Mappe?)
           Didaktische Leitlinien (Altersangemessenheit, AFB-Progression)

Schritt 0.2: INHALT
  Eingabe: Themen-Briefing + Quelldateien + KE-Matrix
  Aufgabe: Sachanalyse, Quellenvalidierung, Kernaussagen pro Mappe
  Output:  Inhalts-MDs (1 pro Mappe, je 5+ Kernaussagen)

Schritt 0.3: ORCHESTRATOR synthetisiert → Tafelbild-Progression
  Eingabe: KE-Matrix + Inhalts-MDs
  Aufgabe: Aufbauende Tafelbild-Struktur ueber alle Mappen entwerfen
  Methode: Synthese-Checkliste (siehe unten)
  Output:  Tafelbild-Progression (siehe Format unten)

Schritt 0.4: USER REVIEW
  Tafelbild-Progression wird praesentiert
  User gibt Feedback: Struktur korrekt? Gewichtung passend? Luecken?
  Iteration bis Freigabe
```

### Synthese-Checkliste (Schritt 0.3)

Leitplanken fuer die Tafelbild-Erstellung aus KE-Matrix + Inhalts-MDs:

1. **Knoten-Extraktion:** Jede Kernaussage aus dem Inhalts-MD wird zu einem Knoten-Kandidaten. Kernaussagen → `kernbegriff`, Fachbegriffe → `kategorie`, kausale Zusammenhaenge → `ursache`/`wirkung`, Personen/Gruppen → `akteur`, datierte Ereignisse → `ereignis`.
2. **Knoten-Limit:** 3-8 Knoten pro Mappe. Unter 3 ist die Mappe zu duenn, ueber 8 ueberfordert das Auto-Layout und die SuS.
3. **Pflicht-Knoten:** Jede Mappe hat mindestens einen `kernbegriff`-Knoten (zentrales Konzept).
4. **Verbindungen-Limit:** Max. 10 Verbindungen pro Mappe. Jede Verbindung muss ein Label haben.
5. **Progression:** Voraussetzungen der Mappe N sind Knoten aus Mappe 1..N-1. Jede Mappe ab Mappe 2 hat mindestens 1 Voraussetzung.
6. **KE-Abdeckung:** Jede KE aus der KE-Matrix ist mindestens einem Knoten zugeordnet.
7. **Keine Waisen:** Kein Knoten ohne Verbindung (isolierte Knoten sind didaktisch sinnlos).

### Output-Format: GAME_BLUEPRINT

```markdown
# Game-Blueprint: [Game-Titel]

## Meta
| Feld | Wert |
|---|---|
| Game-ID | [fach-thema-kebab] |
| Mappen-Anzahl | [N] |
| Geschaetzte Dauer | [Minuten] |
| Schwierigkeit | [Basis/Erweitert/Experte] |

## Lehrplan-KE-Matrix

| Kompetenzerwartung | Mappe 1 | Mappe 2 | Mappe 3 | Mappe 4 |
|---|---|---|---|---|
| KE 2.1: [Text] | ■ | ■ | | |
| KE 2.2: [Text] | | | ■ | ■ |
| KE 3.1: [Text] | | ■ | ■ | |

Legende: ■ = Mappe adressiert diese KE

## Tafelbild-Progression

### Mappe 1: [Titel]
**Tafelbild-Knoten:**
- k1-1: [Kernbegriff] (typ: kernbegriff)
- k1-2: [Kategorie] (typ: kategorie)
- k1-3: [Ursache] (typ: ursache)
**Verbindungen:**
- k1-2 → k1-1: [Label]
- k1-3 → k1-1: [Label]
**Voraussetzungen:** keine (erste Mappe)

### Mappe 2: [Titel]
**Tafelbild-Knoten:**
- k2-1: [Kernbegriff] (typ: kernbegriff)
- ...
**Verbindungen:**
- ...
**Voraussetzungen aus Mappe 1:** k1-1 (Pulverfass), k1-2 (Buendnisse)

[... Mappe 3, 4 analog ...]

### Progressions-Logik
[2-3 Saetze: Wie bauen die Tafelbilder aufeinander auf?
 Was setzt Mappe N an gesichertem Wissen aus Mappe N-1 voraus?]

## Narrativ-Bogen
[Rahmengeschichte ueber alle Mappen + Ueberleitungen]

## Schwierigkeitskurve
Mappe 1: AFB I-II (Orientierung, Grundbegriffe)
Mappe 2: AFB I-II (Vertiefung, erste Transfers)
Mappe 3: AFB II (Analyse, Perspektivwechsel)
Mappe 4: AFB II-III (Synthese, Urteilsbildung)
```

---

## 5. Ebene 1: Mappe-Blueprint

### Eingabe

- GAME_BLUEPRINT (freigegebene Tafelbild-Progression)
- Inhalts-MD der betreffenden Mappe
- Didaktische Leitlinien

### Ablauf

```
Schritt 1.1: MATERIAL (Design-Modus)
  Eingabe: Tafelbild-Knoten dieser Mappe + Inhalts-MD
  Aufgabe: Fuer jeden Tafelbild-Knoten bestimmen:
           - Welches Material ermoeglicht eigenstaendiges Erschliessen?
           - Welcher Material-Typ eignet sich?
           - Welche Quelle liefert die Information?
  Output:  Material-Entwurf + Aufgaben-Skizze + Erarbeitbarkeits-Nachweis

Schritt 1.2: USER REVIEW
  Blueprint wird praesentiert (kompakt, 1 Seite pro Mappe)
  User gibt Feedback: Materialauswahl passend? Eigene Quellen?
  Iteration bis Freigabe
```

### Material-Typ-Auswahllogik

| Wenn der Tafelbild-Knoten... | Dann Material-Typ | Begruendung |
|---|---|---|
| Geografisch ist (Laender, Gebiete, Routen) | `karte` oder `bildquelle` | Raeumliches Verstaendnis braucht Visualisierung |
| Chronologisch ist (Abfolge, Zeitraum) | `zeitleiste` | Zeitliche Struktur braucht Ordnung |
| Ein abstraktes Konzept ist (Imperialismus, Nationalismus) | `darstellungstext` | Braucht Erklaerung auf SuS-Niveau |
| Eine persoenliche Erfahrung betrifft | `tagebuch` oder `quellentext` | Personifizierung schafft Empathie/Zugang |
| Daten/Zahlen enthaelt | `statistik` | Tabelle oder Diagramm fuer Klarheit |
| Ein Propaganda-/Medienelement ist | `bildquelle` | Historische Originalquelle als Analyseobjekt |
| Eine Ursache-Wirkung-Beziehung ist | `darstellungstext` + Tafelbild-Ausschnitt | Kausalitaet braucht Erklaerung + Visualisierung |

### Mindest-Materialien pro Mappe

- 1 Darstellungstext (Basisinformation, Sachtext auf Schulbuch-Niveau)
- 1 Quellentext ODER Bildquelle (historische Quelle — Authentizitaet)
- 1 personifiziertes Material (Tagebuch, Brief, Augenzeugenbericht — Empathie)
- 1 visuelles Material (Karte, Zeitleiste, Diagramm — Struktur)

Minimum 4 Materialien pro Mappe, idealerweise 5-6.

### Output-Format: BLUEPRINT_MAPPE_N

```markdown
# Blueprint Mappe [N]: [Titel]

## Tafelbild (Detail)

| ID | Text | Typ | Voraussetzung |
|---|---|---|---|
| k[N]-1 | [Kernbegriff] | kernbegriff | — |
| k[N]-2 | [Kategorie] | kategorie | k[N-1]-3 (aus Mappe N-1) |
| k[N]-3 | [Ursache] | ursache | — |

Verbindungen:
- k[N]-2 → k[N]-1: [Label]
- k[N]-3 → k[N]-1: [Label]

## Material-Entwurf

| ID | Typ | Titel | Tafelbild-Knoten | Quelle/Erstellung |
|---|---|---|---|---|
| mat-[N]-1 | darstellungstext | [Titel] | k[N]-1, k[N]-2 | AGENT schreibt |
| mat-[N]-2 | bildquelle | [Titel] | k[N]-2 | wikimedia |
| mat-[N]-3 | quellentext | [Titel] | k[N]-3 | Recherche |
| mat-[N]-4 | zeitleiste | [Titel] | k[N]-1, k[N]-3 | Engine-Renderer |

## Aufgaben-Skizze

| ID | Typ | Tafelbild-Knoten | Material-Referenz | Kurzbeschreibung |
|---|---|---|---|---|
| aufgabe-[N]-1 | zuordnung | k[N]-2 | mat-[N]-1 | [Was wird geprueft?] |
| aufgabe-[N]-2 | multiple-choice | k[N]-3 | mat-[N]-3 | [Was wird geprueft?] |
| aufgabe-[N]-3 | reihenfolge | k[N]-1 | mat-[N]-4 | [Was wird geprueft?] |
| aufgabe-[N]-4 | lueckentext | k[N]-1, k[N]-2 | mat-[N]-1 | [Was wird geprueft?] |
| aufgabe-[N]-5 | freitext-code | k[N]-1 | mat-[N]-1, mat-[N]-2 | [Was wird geprueft?] |

## Erarbeitbarkeits-Nachweis

| Tafelbild-Knoten | Material | Erarbeitungsweg |
|---|---|---|
| k[N]-1: [Text] | mat-[N]-1 (Sachtext, Abs. 1-2) | SuS lesen Text, extrahieren Begriff + Definition |
| k[N]-2: [Text] | mat-[N]-1 (Abs. 3) + mat-[N]-2 (Karte) | SuS lesen Text, vergleichen mit Karte |
| k[N]-3: [Text] | mat-[N]-3 (Quellentext) | SuS identifizieren Perspektive des Autors |
| Verbindung k[N]-2→k[N]-1 | mat-[N]-1 (Abs. 4) | SuS erschliessen Kausalzusammenhang aus Text |

**Abdeckungs-Check:**
- [ ] Jeder Tafelbild-Knoten hat mindestens 1 Material-Zuordnung
- [ ] Jede Verbindung hat mindestens 1 Material-Zuordnung
- [ ] Jede Aufgabe hat eine material_referenz
- [ ] Kein Tafelbild-Knoten erfordert Vorwissen, das nicht in Material ODER Vor-Mappe gesichert ist

## Einstieg
**Narrativ:** [2-3 Saetze, Rahmengeschichte fortschreiben]
**Problemstellung:** [Leitfrage der Mappe]

## Sicherung
**Tafelbild:** [wird in Ebene 2 als excalidraw SVG produziert]
**Zusammenfassung:** [2-3 Saetze]
**Ueberleitung:** [Bruecke zur naechsten Mappe]
```

---

## 6. Ebene 2: Produktion

### Eingabe

- Freigegebener BLUEPRINT_MAPPE_N
- GAME_BLUEPRINT (fuer Gesamtkontext)
- Inhalts-MD der Mappe

### Ablauf

```
Schritt 2.1: MATERIAL (Produktions-Modus)
  Eingabe: BLUEPRINT_MAPPE_N (freigegebener Material-Entwurf)
  Aufgabe: Materialien vollstaendig ausarbeiten
           - Darstellungstexte schreiben (HTML-Fragmente, SuS-gerecht, max. 150 Woerter)
           - Bildquellen recherchieren (wikimedia, rijksmuseum)
           - Quellentexte recherchieren + paraphrasieren (HTML-Fragmente)
           - Diagramme/Karten erstellen (excalidraw, Canva)
           - Tagebucheintraege verfassen (HTML-Fragmente)
           - Zeitleisten/Statistiken als JSON-Daten liefern
           - Tafelbild als excalidraw SVG rendern
           - Einstieg (Narrativ + Problemstellung) ausformulieren
           - Sicherung (Zusammenfassung + Ueberleitung) ausformulieren
  Output:  material-mappe-[N].json — fertige materialien[]-Eintraege
           im data.json-Schema (direkt einfuegbar)
           + tafelbild{} fuer sicherung
           + einstieg{} und sicherung.zusammenfassung/ueberleitung

Schritt 2.2: RAETSEL
  Eingabe: BLUEPRINT_MAPPE_N + material-mappe-[N].json (fertige Materialien)
  Aufgabe: Methodische Umsetzung der Aufgaben-Skizze
           - Frageformulierungen ausarbeiten
           - Optionen/Luecken/Reihenfolge-Elemente formulieren
           - Tipps schreiben (3 Stufen, materialbasiert — auf konkrete
             Materialstellen verweisend)
           - Freischalt-Code generieren
           - aufgaben[]-Abschnitt befuellen (mit material_referenz als Array)
           - materialien[] aus MATERIAL-Output uebernehmen (unveraendert)
           - Gesamten Mappe-Abschnitt der data.json zusammenfuegen
  Output:  Vollstaendiger data.json-Abschnitt fuer Mappe N
           (einstieg + materialien + aufgaben + sicherung)

Schritt 2.3: ORCHESTRATOR validiert
  Eingabe: Fertiger data.json-Abschnitt + GAME_KOHAERENZ
  Pruefung: Tafelbild N nutzt Vorwissen aus TB 1..N-1?
            Neue KEs abgedeckt, keine Duplikate?
            Narrativ-Ueberleitung konsistent?
            Schwierigkeit steigt?
            Aufgabentyp-Vielfalt ueber Mappen hinweg?
  Output:  GAME_KOHAERENZ aktualisiert → weiter mit naechster Mappe
```

### Sequenz-Regel: Material VOR Raetsel

RAETSEL startet erst, wenn MATERIAL fertig ist. Grund: RAETSEL arbeitet auf dem **ausgearbeiteten** Material, nicht auf dem Entwurf. Die Tipps muessen auf konkrete Materialstellen verweisen ("Lies Absatz 2 in Material M1.1 nochmal"). Das geht nur, wenn das Material existiert.

### MCP-Tool-Zuordnung (Ebene 2)

| Material-Typ | Primaer-Tool | Sekundaer-Tool |
|---|---|---|
| `darstellungstext` | AGENT schreibt | — |
| `quellentext` | markdownify: `webpage-to-markdown` | Manuelle Recherche |
| `bildquelle` | `wikimedia_search_images` | rijksmuseum: `search_artwork` |
| `karte` | Canva: `generate-design` (infographic) | excalidraw: `create_view` |
| `zeitleiste` | Engine-Renderer (JSON-Daten) | excalidraw: `create_view` |
| `statistik` | Canva: `generate-design` (infographic) | HTML `<table>` |
| `tagebuch` | AGENT schreibt | — |

---

## 7. Ebene 3: Implementierung

Keine Aenderung in der Grundstruktur gegenueber MVP. Aber erweiterte Anforderungen:

### TECHNIK (erweitert)

- `escape-engine.js`: Material-Renderer (`_renderMaterialien`), Phasen-Renderer (`_renderMappeV1`), Code-Reveal (`_revealFreischaltCode`), Fuzzy-Matching (`_fuzzyMatch`), Tafelbild-Renderer (`_renderTafelbild`)
- `data.json`: Schema v1 (materialien[], einstieg{}, sicherung{} mit tafelbild{})
- `mappe-template.html`: Phasen-Layout (Einstieg → Erarbeitung → Sicherung)

### DESIGN (erweitert)

- 7 Material-Typ-Styles (BEM: `.material--darstellung`, `.material--quelle`, etc.)
- 2-Spalten-Grid (Desktop: Material links sticky, Aufgaben rechts)
- Tafelbild-Darstellung in Sicherungs-Section
- Responsive: 1 Spalte mobil (Material oben, Aufgaben darunter)

### QUALITAET (erweitert)

- Lehrplan-Abdeckung: KE-Matrix aus GAME_BLUEPRINT gegen data.json pruefen
- Erarbeitbarkeit: Jede Aufgabe hat material_referenz, Material existiert
- Tafelbild-Progression: Voraussetzungen jeder Mappe sind in Vor-Mappen gesichert

---

## 8. GAME_KOHAERENZ: Persistentes Validierungsdokument

Wird nach Ebene 0 initialisiert und nach jeder abgeschlossenen Mappe (Ebene 2) aktualisiert.

### Initialisierung (nach Ebene 0)

```markdown
# Game-Kohaerenz: [Game-Titel]

## Lehrplan-Abdeckung
[KE-Matrix aus GAME_BLUEPRINT, initial alle unbearbeitet]

## Tafelbild-Progression
[Progressions-Logik aus GAME_BLUEPRINT]

## Mappe-Status
| Mappe | Blueprint | Material | Raetsel | Validiert |
|---|---|---|---|---|
| 1 | — | — | — | — |
| 2 | — | — | — | — |
| ... | | | | |

## Validierungsprotokoll
[Wird nach jeder Mappe ergaenzt]
```

### Validierung nach jeder Mappe

| Kriterium | Pruefmethode | Schwelle fuer "bestanden" |
|---|---|---|
| TB nutzt Vorwissen | Voraussetzungen-IDs gegen gesicherte Knoten pruefen | Alle Voraussetzungen in Vor-Mappen als Knoten vorhanden |
| Neue KEs abgedeckt | KE-Matrix aktualisieren | Mindestens 1 neue KE pro Mappe |
| Narrativ konsistent | Ueberleitung N-1 passt zu Einstieg N | Thematischer Anschluss erkennbar |
| Schwierigkeit steigt | AFB-Verteilung pro Mappe vergleichen | Anteil AFB II/III steigt oder bleibt |
| Typvielfalt | Aufgabentypen ueber alle bisherigen Mappen zaehlen | Jeder Typ mindestens 2x im Game |

---

## 9. Tafelbild-Datenmodell (data.json)

Das Tafelbild existiert in zwei Formen:

### Form 1: Planungsinstrument (Ebene 0+1)

Strukturiertes Markdown in GAME_BLUEPRINT und BLUEPRINT_MAPPE_N (siehe Formate oben). Wird als excalidraw-Diagramm visualisiert fuer User-Review. Muss nicht maschinell parsbar sein — der User reviewt es.

### Form 2: Render-Artefakt (data.json → Sicherungs-Section)

JSON-Schema in `mappen[].sicherung.tafelbild`:

```json
{
  "sicherung": {
    "tafelbild": {
      "knoten": [
        {
          "id": "k1-1",
          "text": "Pulverfass Europa",
          "typ": "kernbegriff"
        },
        {
          "id": "k1-2",
          "text": "Dreibund 1882",
          "typ": "kategorie"
        },
        {
          "id": "k1-3",
          "text": "Triple Entente",
          "typ": "kategorie"
        },
        {
          "id": "k1-4",
          "text": "Imperialismus",
          "typ": "ursache"
        }
      ],
      "verbindungen": [
        {
          "von": "k1-2",
          "nach": "k1-1",
          "label": "verschaerft Spannung"
        },
        {
          "von": "k1-4",
          "nach": "k1-1",
          "label": "treibt an"
        }
      ],
      "voraussetzungen": []
    },
    "zusammenfassung": "Europa war vor 1914 in zwei feindliche Buendnisbloecke gespalten. Imperialismus und Nationalismus verschaerften die Rivalitaeten. Ein Funke genuegt, um das Pulverfass zur Explosion zu bringen.",
    "ueberleitung": "Dieser Funke kam im Sommer 1914 — in Sarajevo."
  }
}
```

**Knoten-Typen:**

| Typ | Bedeutung | Rendering-Hinweis |
|---|---|---|
| `kernbegriff` | Zentrales Konzept der Mappe | Groesser, zentral, farbig hervorgehoben |
| `kategorie` | Gruppierung / Cluster | Mittlere Groesse, Cluster-Farbe |
| `ursache` | Kausaler Faktor | Mit Pfeil-Styling |
| `wirkung` | Konsequenz / Ergebnis | Mit Pfeil-Styling |
| `akteur` | Person, Gruppe, Nation | Icon oder Silhouette |
| `ereignis` | Konkretes historisches Ereignis | Zeitstrahl-Marker |

**Voraussetzungen:** Array von Knoten-IDs aus vorherigen Mappen. Format: `"k[M]-[N]"` wobei M = Mappe-Nummer. Wird von QUALITAET geprueft: Ist jede Voraussetzung in einer frueheren Mappe als Knoten definiert?

### Vollstaendiges data.json Schema v1

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
          "typ": "darstellungstext | quellentext | bildquelle | karte | zeitleiste | statistik | tagebuch",
          "titel": "",
          "inhalt": "(typ-abhaengig, siehe Sub-Schemas unten)",
          "bildunterschrift": "",
          "quelle": "",
          "lizenz": ""
        }
      ],

      "aufgaben": [
        {
          "id": "aufgabe-1-1",
          "typ": "multiple-choice | zuordnung | lueckentext | reihenfolge | freitext-code",
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

**Loesungs-Typen pro Aufgabentyp** (Pflicht-Konvention, unveraendert):

| Aufgabentyp | `loesung`-Typ | Beispiel |
|---|---|---|
| `multiple-choice` | String | `"B"` |
| `zuordnung` | Object | `{"Dreibund": "Deutschland, Oesterreich-Ungarn, Italien"}` |
| `lueckentext` | Array | `["Wort1", "Wort2"]` |
| `reihenfolge` | Array | `["Schritt1", "Schritt2", "Schritt3"]` |
| `freitext-code` | String | `"belgien"` |

### Sub-Schemas fuer `materialien[].inhalt` (typ-abhaengig)

Das `inhalt`-Feld ist **polymorph** — sein Format haengt vom `typ` ab:

| `typ` | `inhalt`-Format | Beispiel |
|---|---|---|
| `darstellungstext` | HTML-Fragment (kein Markdown) | `"<p>Europa war vor 1914...</p>"` |
| `quellentext` | HTML-Fragment | `"<p>„Die Lage ist ernst..." — Berliner Tageblatt</p>"` |
| `bildquelle` | URL (String) | `"https://upload.wikimedia.org/..."` |
| `karte` | URL oder SVG-inline (String) | `"<svg>...</svg>"` oder URL |
| `tagebuch` | HTML-Fragment | `"<p>Liebes Tagebuch, heute...</p>"` |
| `zeitleiste` | JSON-Array (siehe unten) | `[{"datum": "1882", "text": "..."}]` |
| `statistik` | JSON-Object (siehe unten) | `{"spalten": [...], "zeilen": [...]}` |

**Zeitleiste Sub-Schema:**

```json
"inhalt": [
  {"datum": "1882", "text": "Dreibund gegruendet (DE, OeU, IT)"},
  {"datum": "1894", "text": "Franzoesisch-russisches Buendnis"},
  {"datum": "1904", "text": "Entente cordiale (FR, GB)"},
  {"datum": "1907", "text": "Triple Entente vollstaendig (FR, GB, RU)"}
]
```

**Statistik Sub-Schema:**

```json
"inhalt": {
  "spalten": ["Land", "Militaerausgaben 1913 (Mio. Mark)"],
  "zeilen": [
    ["Deutsches Reich", "2.405"],
    ["Frankreich", "1.855"],
    ["Grossbritannien", "1.580"],
    ["Russland", "1.520"]
  ]
}
```

**Regel:** AGENT_MATERIAL produziert `inhalt` als **HTML-Fragmente** (fuer Text-Typen) oder als **strukturiertes JSON** (fuer zeitleiste/statistik). Kein Markdown — die Engine braucht keinen Parser. AGENT_TECHNIK rendert HTML-Fragmente direkt via `innerHTML`, JSON-Daten ueber typ-spezifische Renderer.

### Tafelbild-Renderer: Constraints

- Max. 8 Knoten pro Mappe
- Max. 10 Verbindungen pro Mappe
- Auto-Layout (hierarchisch: `kernbegriff` oben, `kategorie`/`ursache`/`wirkung` darunter, `akteur`/`ereignis` seitlich)
- Kein manuelles x/y — der Renderer bestimmt die Position
- Vanilla JS + SVG-Generierung (~200 Zeilen), keine externe Bibliothek

### Wortbudget pro Mappe

Gesamter Lesetext (alle Materialien zusammen) pro Mappe: **max. 500 Woerter**. Das sichert Spielbarkeit innerhalb von ~15-20 Minuten pro Mappe. Einzelne Darstellungstexte max. 150 Woerter, Quellentexte max. 100 Woerter, Tagebucheintraege max. 120 Woerter.

---

## 10. Cowork ↔ Claude Code Split

Die Vier-Ebenen-Architektur nutzt den natuerlichen Split zwischen Cowork (interaktiv, User-Dialog) und Claude Code (autonom, Batch-Produktion):

| Ebene | Ort | Grund |
|---|---|---|
| 0: Game-Rahmen | **Cowork** | User-Review der Tafelbild-Progression erforderlich |
| 1: Mappe-Blueprint | **Cowork** | User-Review des Material-Entwurfs erforderlich |
| 2: Produktion | **Claude Code** (Uebergabe-Prompt) | Autonome Ausarbeitung, kein Review noetig |
| 3: Implementierung | **Claude Code** (Uebergabe-Prompt) | Autonome Implementierung |

### Speicherorte der Planungsdokumente

| Dokument | Speicherort | Erstellt in |
|---|---|---|
| GAME_BLUEPRINT | `docs/architektur/GAME_BLUEPRINT_[game-id].md` | Cowork (Ebene 0) |
| BLUEPRINT_MAPPE_N | `docs/architektur/BLUEPRINT_MAPPE_[N]_[game-id].md` | Cowork (Ebene 1) |
| GAME_KOHAERENZ | `docs/architektur/GAME_KOHAERENZ_[game-id].md` | Cowork (Ebene 0, init) |
| material-mappe-N.json | `docs/testdaten/material-mappe-[N]_[game-id].json` | Claude Code (Ebene 2) |

Alle Planungsdokumente liegen unter `docs/` im Repo (seit Konsolidierung 2026-03-16). Architektur-Docs in `docs/architektur/`, Material-JSON in `docs/testdaten/`.

### Uebergabe-Schnittstelle Cowork → Claude Code

Nach Ebene 1 (alle Mappen-Blueprints freigegeben) erstellt Cowork einen Uebergabe-Prompt:

```markdown
# Uebergabe: [Game-Titel] — Produktion + Implementierung

## Kontext
[GAME_BLUEPRINT zusammenfassen]

## Blueprints
[BLUEPRINT_MAPPE_1..N referenzieren oder inline]

## Auftraege (STRIKT SEQUENTIELL — Reihenfolge einhalten!)
WICHTIG: Auftraege MUESSEN in der angegebenen Reihenfolge ausgefuehrt werden.
MATERIAL muss vollstaendig abgeschlossen sein, bevor RAETSEL startet.
Pro Mappe: erst MATERIAL, dann RAETSEL. Alle Mappen fertig, dann TECHNIK.

1. Pro Mappe (sequentiell Mappe 1 → Mappe N):
   a. MATERIAL (Produktions-Modus): Materialien als HTML + JSON ausarbeiten
   b. RAETSEL: Materialien in data.json uebernehmen, Aufgaben + Tipps befuellen
2. TECHNIK: HTML/JS implementieren (Engine-Erweiterungen, Templates)
3. DESIGN: CSS + Responsive (Material-Typ-Styles, 2-Spalten-Grid)
4. QUALITAET: Pruefen + Report

## Erfolgskriterien
[Aus GAME_KOHAERENZ + Checkliste]

## Referenz-Dateien
[Pfade zu allen relevanten Docs]
```

---

## 11. Verschaerfte Regeln (aus Audit + Analyse)

### Tipp-Regeln (AGENT_RAETSEL)

**Stufe 1 — Fragestellung reformulieren:**
- Erlaubt: "Ueberlege: Was bedeutet [Begriff]?"
- Verboten: Irgendein Teil der Loesung nennen

**Stufe 2 — Auf Material verweisen:**
- Erlaubt: "In [Material-Titel] steht eine Information ueber [Thema] — lies den zweiten Absatz nochmal"
- Verboten: Loesungsstruktur preisgeben, Optionsbuchstaben nennen

**Stufe 3 — Erklaerung des Zusammenhangs:**
- Erlaubt: Fachliche Erklaerung, die zur eigenen Ableitung fuehrt
- Verboten: "Richtig ist B", vollstaendige Loesungsliste

### Reihenfolge-Aufgaben

KEINE Zeitangaben in Optionen. Optionen muessen inhaltliche Beschreibungen sein.
Falsch: `"Dreibund (1882)"` → Triviale Sortierung nach Zahl
Richtig: `"Gruendung des Dreibundes"` → Erfordert chronologisches Verstaendnis

### Altersangemessenheit (AGENT_MATERIAL)

- Texte auf R7-Mittelschule-Niveau
- Keine Fachsprache ohne Erklaerung
- Saetze max. 20 Woerter
- Absaetze max. 5 Saetze
- Darstellungstexte max. 150 Woerter

### Personifizierung

Mindestens 1 Material pro Mappe mit persoenlicher Perspektive (Tagebuch, Brief, Augenzeugenbericht). Macht Geschichte greifbar fuer R7.

---

## 12. UX-Pattern: Material-Aufgaben-Verschraenkung

Die Entscheidung ist getroffen: **Option C — verzahnt.**

Material und Aufgaben werden nicht als getrennte Bloecke praesentiert, sondern verschraenkt:

```
Einstieg (Narrativ + Problemstellung)
  ↓
Material M1 → Aufgabe A1
Material M2 → Aufgabe A2
Material M3 + M4 → Aufgabe A3
Material M1 (Rueckverweis) → Aufgabe A4
Alle Materialien → Aufgabe A5 (Synthese)
  ↓
Sicherung (Tafelbild + Zusammenfassung + Code)
```

### Layout

**Desktop/Tablet (≥768px):** 2-Spalten-Grid. Material links (sticky), Aufgaben rechts.
**Mobil (<768px):** 1 Spalte. Material oben, Aufgabe darunter.

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
  .erarbeitung__materialien {
    position: sticky;
    top: 1rem;
  }
}
```

---

## 13. Abhaengigkeit zu bestehenden Dokumenten

Dieses Workflow-Dokument ist die zentrale Referenz fuer den v1-Prozess. Es ersetzt bzw. ergaenzt:

| Dokument | Verhaeltnis |
|---|---|
| `docs/agents/ORCHESTRATOR.md` | Workflow-Section wird durch dieses Dokument ersetzt. Agenten-Tabelle + Konventionen bleiben. |
| `docs/architektur/ARCHITEKTUR_v1.md` | **SUPERSEDED fuer Schema (Abschnitt 2) und Workflow (Abschnitt 9).** Engine-Erweiterungen (Abschnitt 5: Renderer-Spezifikationen) und Mappe-Template (Abschnitt 6) bleiben als Implementierungsreferenz gueltig. data.json-Schema ist kanonisch in WORKFLOW_v1 Abschnitt 9. |
| `docs/architektur/MATERIAL_PIPELINE.md` | **SUPERSEDED.** Historisches Planungsdokument. Pipeline-Schritte S0-S4 sind vollstaendig in Ebene 0-2 integriert. MCP-Tool-Zuordnung in Abschnitt 6 uebernommen. |
| `docs/agents/AGENT_MATERIAL.md` | Erstellt, basierend auf Abschnitt 3+5+6 dieses Dokuments. |
| `docs/agents/AGENT_RAETSEL.md` | Muss aktualisiert werden: neue Eingabe (Blueprint + fertiges Material), verschaerfte Regeln. |
| `docs/agents/AGENT_INHALT.md` | Muss aktualisiert werden: Output geht an Ebene 0, nicht mehr direkt an RAETSEL. |
| `docs/agents/AGENT_DIDAKTIK.md` | Muss aktualisiert werden: Arbeitet auf Game-Ebene, produziert KE-Matrix. |
| `docs/checklisten/Checkliste_Interaktive_Materialien.md` | Muss aktualisiert werden: Neue Pruefpunkte fuer Material (vorhanden? erarbeitbar?), Tafelbild (Progression korrekt? Voraussetzungen gesichert?), material_referenz (gueltig?), Wortbudget (≤500 pro Mappe?). |
