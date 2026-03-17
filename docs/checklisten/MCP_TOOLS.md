# MCP_TOOLS — Verfuegbare MCP-Server, Konnektoren und Erweiterungen

Stand: 2026-03-17 | Vollstaendige Evaluation aller verfuegbaren Tools | Update: +QuickChart, +Mermaid Chart, +svg-converter

**Legende Relevanz:** ★★★ Kern-Workflow | ★★☆ Nuetzlich/Optional | ★☆☆ Nische/Zukunft | ✗ Nicht relevant

**Legende Kosten:** FREI = keine Kosten | KOSTEN = API-basiert, Bestaetigung noetig | LOKAL = laeuft lokal, keine Kosten

---

## TEIL A — Materialerstellungs-Kern (★★★)

### 1. markdownify ★★★ FREI

**MCP-ID:** `mcp__markdownify__*`
**Funktion:** Konvertiert beliebige Formate IN Markdown (Preprocessing)
**Phase:** Ab Ebene 1 (Inhalt-Vorverarbeitung)

| Tool | Parameter | Materialerstellungs-Relevanz |
|---|---|---|
| `webpage-to-markdown` | `url` | Quellenrecherche-Workflow Stufe 1: documentarchiv.de, dhm.de, LehrplanPLUS |
| `pdf-to-markdown` | `filepath` | Schulbuch-Scans, Arbeitsblatt-PDFs als Quelldaten |
| `docx-to-markdown` | `filepath` | Word-Unterlagen von Kollegen |
| `pptx-to-markdown` | `filepath` | Praesentationen als Quellmaterial |
| `xlsx-to-markdown` | `filepath` | Lehrplaene, Daten-Tabellen |
| `youtube-to-markdown` | `url` | Dokumentarfilm-Transkripte (ZDF, ARD Mediathek) |
| `image-to-markdown` | `filepath` | OCR: gescannte Arbeitsblatter, Tafelbilder |
| `audio-to-markdown` | `filepath` | Unterrichtsmitschnitte transkribieren |
| `bing-search-to-markdown` | `url` | Faktenrecherche-Ergebnisse |
| `git-repo-to-markdown` | `url`, `branch`, `compress` | Projektstruktur-Dokumentation |
| `get-markdown-file` | — | Remote-Markdown-Quellen lesen |

**Primaere Agenten-Integration:**

| Agent | Workflow-Schritt | Tool |
|---|---|---|
| AGENT_INHALT | Vorverarbeitung Schritt 0 | `pdf-to-markdown`, `docx-to-markdown`, `pptx-to-markdown` |
| AGENT_MATERIAL | Quellenrecherche-Workflow Stufe 1 | `webpage-to-markdown` (historische Quellensammlungen) |
| AGENT_MATERIAL | Statistik-Recherche | `webpage-to-markdown` (Statistisches Jahrbuch online) |
| ORCHESTRATOR | Quelldatei-Preprocessing | Alle `*-to-markdown` |

**Konventionen:**
- Konvertierte Dateien in `/tmp/` ablegen, nicht ins Repo committen
- Quelldatei-Pfad im Inhalts-MD vermerken: `[konvertiert aus: dateiname.pdf via markdownify]`

---

### 2. wikimedia-image-search ★★★ FREI

**MCP-ID:** `mcp__wikimedia-image-search__wikimedia_search_images`
**Funktion:** Bildersuche in Wikimedia Commons mit Lizenz-Metadaten und optionalem Thumbnail-Composite
**Phase:** Ab Ebene 2 (Produktion)

| Parameter | Typ | Default | Beschreibung |
|---|---|---|---|
| `query` | string (required) | — | Suchbegriff (strikte Keyword-Suche, keine Semantik) |
| `license` | `"all"` / `"no_restrictions"` | `"all"` | CC0/PD-Filter |
| `limit` | 1-50 | 9 | Max. Ergebnisse (≤12 empfohlen mit Thumbnails) |
| `include_thumbnails` | boolean | true | Composite-Bild fuer visuellen Vergleich |
| `offset` | number | 0 | Pagination |

**Primaere Agenten-Integration:**

| Agent | Workflow-Schritt | Verwendung |
|---|---|---|
| AGENT_MATERIAL | Quellenrecherche-Workflow Stufe 1 | Historische Bilder, Karikaturen, Propagandaplakate |
| AGENT_MATERIAL | Einstieg-Illustration-Workflow | Setting-Visualisierung (Stadtansichten, hist. Karten) |
| AGENT_MATERIAL | bildquelle-Produktion (2.1) | Bild-URL + Lizenz fuer `materialien[].inhalt` |

**Pflicht-Workflow:**
```
1. wikimedia_search_images(query, license: "no_restrictions") → CC0/PD zuerst
2. Falls zu wenig Treffer: license: "all" → CC-BY akzeptieren
3. Bildunterschrift + Lizenz dokumentieren
4. URL in materialien[].inhalt + materialien[].quelle + materialien[].lizenz
5. Eintrag in docs/ASSET_LIZENZEN.md
```

**Suchstrategie-Hinweise:**
- Wenige, allgemeine Begriffe verwenden (strikt keyword-basiert, nicht semantisch)
- Englische Begriffe haben hoehere Trefferquote als deutsche
- Zeitraum im Suchbegriff mitgeben: `"trench warfare 1916"` statt nur `"Schuetzengraben"`

---

### 3. excalidraw ★★★ FREI

**MCP-ID:** `mcp__excalidraw__*` (vermutlich, nicht in Deferred-Tools — Desktop-Extension)
**Funktion:** Diagramm-Erstellung und -Rendering
**Phase:** Ab Ebene 1 (Tafelbild-Design), Ebene 2 (Tafelbild-Produktion)

| Tool | Parameter | Beschreibung |
|---|---|---|
| `read_me` | keine | Element-Format-Cheatsheet laden (Farben, Koordinaten, Shapes) |
| `create_view` | `elements` (JSON-String) | Rendert Excalidraw-Diagramm, oeffnet interaktive Ansicht |

**Element-Format:**
- Typen: `rectangle`, `text`, `arrow`, weitere Excalidraw-Shapes
- Pflichtfelder: `x`, `y`, `width`, `height`, `type`
- Optionale: `backgroundColor`, `strokeColor`, `strokeWidth`, `label`
- Layer-Reihenfolge: erstes Element = hinten, letztes = vorne

**Primaere Agenten-Integration:**

| Agent | Workflow-Schritt | Verwendung |
|---|---|---|
| AGENT_MATERIAL | Tafelbild-Verifizierung (1.5) | Tafelbild als Excalidraw rendern zur visuellen Pruefung |
| AGENT_MATERIAL | Tafelbild-Produktion (2.2) | Alternative zu reinem JSON: visuell ansprechenderes SVG |
| AGENT_INHALT | Tafelbild-Extraktion | TB_*.excalidraw-Dateien auswerten |

**Pflicht-Workflow:**
```
1. read_me → Element-Format-Spec laden
2. Knoten als Rechtecke (Farbkodierung nach Typ), Verbindungen als Pfeile
3. create_view(elements: JSON.stringify(elements))
4. Visuelles Ergebnis pruefen
```

---

### 3a. QuickChart ★★★ FREI (NEU — installiert 2026-03-17)

**MCP-ID:** `mcp__quickchart-server__*`
**Funktion:** Chart.js-basierte Diagramme als Bild generieren (quickchart.io API)
**Phase:** Ab Ebene 2 (Produktion)
**Kosten:** Kostenlos, kein API-Key

| Tool | Parameter | Beschreibung |
|---|---|---|
| `generate_chart` | `type`, `datasets`, `labels`, `title`, `options` | Chart generieren, Bild-URL zurueckgeben |
| `download_chart` | `config`, `outputPath` | Chart als Bilddatei lokal speichern |

**Unterstuetzte Chart-Typen:** `bar`, `line`, `pie`, `doughnut`, `radar`, `polarArea`, `scatter`, `bubble`, `radialGauge`, `speedometer`

**Primaere Agenten-Integration:**

| Agent | Workflow-Schritt | Verwendung |
|---|---|---|
| AGENT_MATERIAL | statistik-Produktion (2.1) | Balkendiagramme, Liniendiagramme als statische Bilder |
| AGENT_MATERIAL | Einstieg-Illustration | Datenvisualisierung fuer Problemstellung |

**Workflow (statistik-Material):**
```
1. generate_chart(
     type: "bar",
     labels: ["Deutsches Reich", "Frankreich", "Grossbritannien", "Russland"],
     datasets: [{label: "Militaerausgaben 1913 (Mio. Mark)", data: [2405, 1855, 1640, 1500]}],
     title: "Wer gab am meisten fuer das Militaer aus?"
   )
2. URL in materialien[].inhalt referenzieren
   ODER
   download_chart(config: {...}, outputPath: "assets/images/[game-id]/chart-statistik.png")
```

**Vorteil gegenueber Engine-JSON-Tabelle:** Visuell ansprechender, Vergleiche auf einen Blick erfassbar. Ideal fuer AFB-I-Aufgaben ("Lies das Diagramm ab").
**Vorteil gegenueber Canva/Excel:** Kein Account noetig, kein manueller Export, direkte Bild-URL.

---

### 3b. Mermaid Chart ★★★ FREI (NEU — Konnektor verbunden 2026-03-17)

**MCP-ID:** `mcp__48177e08-3adc-4088-9cc4-b22583106eab__validate_and_render_mermaid_diagram`
**Funktion:** Mermaid-Diagramme validieren und als interaktives UI-Widget rendern
**Phase:** Ab Ebene 1 (Design), Ebene 2 (Produktion)
**Kosten:** Kostenlos (Cowork-Konnektor)

| Tool | Parameter | Beschreibung |
|---|---|---|
| `validate_and_render_mermaid_diagram` | `diagramCode` (required), `title` (optional) | Validiert Mermaid-Syntax, rendert als Widget mit Copy-Button |

**Unterstuetzte Diagramm-Typen (Mermaid-Syntax):**
- `flowchart` / `graph` — Tafelbilder, Ursache-Wirkung
- `mindmap` — Brainstorming, Themenueberblick
- `timeline` — Zeitleisten
- `classDiagram` — Strukturierte Beziehungen
- `sequenceDiagram` — Ablaeufe
- `stateDiagram` — Zustandsuebergaenge

**Primaere Agenten-Integration:**

| Agent | Workflow-Schritt | Verwendung |
|---|---|---|
| AGENT_MATERIAL | Tafelbild-Verifizierung (1.5) | Schnelle Tafelbild-Visualisierung als Flowchart |
| AGENT_MATERIAL | Tafelbild-Produktion (2.2) | Mermaid als textuell beschreibbare Alternative zu Excalidraw-JSON |
| AGENT_MATERIAL | zeitleiste-Produktion (2.1) | Mermaid-Timeline als visuelle Alternative zur JSON-Zeitleiste |

**Workflow (Tafelbild als Mermaid):**
```
validate_and_render_mermaid_diagram(
  title: "Buendnisse und Spannungen vor 1914",
  diagramCode: "flowchart TD\n  k1[Dreibund 1882] -->|verschaerft| k2[Einkreisungsgefuehl]\n  k3[Entente 1907] -->|provoziert| k2\n  k2 -->|treibt an| k4[Aufruestung]\n  k4 -->|fuehrt zu| k5[Pulverfass Europa]"
)
```

**Abgrenzung zu Excalidraw:**
- Mermaid: Schnell, textuell beschreibbar, automatisches Layout, ideal fuer Verifizierung und Prototyping
- Excalidraw: Volle visuelle Kontrolle (Farben, Positionen, Groessen), ideal fuer polierte Endprodukte

**Kombi-Workflow:** Mermaid fuer schnelle Struktur-Validierung in Design-Modus (1.5) → Excalidraw fuer polierte Visualisierung in Produktions-Modus (2.2)

---

### 3c. SVG-Converter ★★☆ FREI (NEU — installiert 2026-03-17)

**MCP-ID:** `mcp__svg-converter__*`
**Funktion:** SVG-Code in PNG oder JPG konvertieren
**Phase:** Ab Ebene 2 (Produktion), Ebene 3 (Implementierung)
**Kosten:** Kostenlos (lokal)

| Tool | Parameter | Beschreibung |
|---|---|---|
| `svg-to-png` | `svgCode`, `outputPath`, `scale` (opt), `backgroundColor` (opt) | SVG → PNG (transparent default) |
| `svg-to-jpg` | `svgCode`, `outputPath`, `scale` (opt), `quality` (opt, 1-100), `backgroundColor` (opt) | SVG → JPG (weiss default) |

**Primaere Agenten-Integration:**

| Agent | Workflow-Schritt | Verwendung |
|---|---|---|
| AGENT_MATERIAL | Tafelbild-Export (nach 2.2) | Tafelbild-SVG (Engine-generiert) als PNG fuer Lehrkraft-Handout |
| AGENT_MATERIAL | karte-Produktion | Excalidraw-SVG → PNG fuer `materialien[].inhalt` |
| Export | Lehrkraft-Handout | SVG-Diagramme in druckbare Formate wandeln |

**Workflow:**
```
1. Tafelbild-SVG aus Engine oder Excalidraw generieren
2. svg-to-png(svgCode: "<svg>...</svg>", outputPath: "assets/images/[game-id]/tafelbild-1.png", scale: 2)
3. PNG in materialien[] oder Lehrkraft-Export referenzieren
```

---

### 4. Canva ★★★ FREI (im Rahmen des Canva-Accounts)

**MCP-ID:** `mcp__b7558e56-5b35-4978-91e7-60b5e1b1fc70__*`
**Funktion:** Professionelle Design-Generierung (Infografiken, Karten, Poster, Dokumente)
**Phase:** Ab Ebene 2 (Produktion)

| Tool | Funktion | Materialerstellungs-Relevanz |
|---|---|---|
| `generate-design` | Design aus Textbeschreibung generieren | ★★★ Karten, Infografiken, Statistik-Visualisierungen |
| `create-design-from-candidate` | Ausgewaehltes Design in Account uebernehmen | Workflow-Schritt nach generate-design |
| `export-design` | Export als PNG/PDF/JPG (mit Groessen-Kontrolle) | ★★★ PNG-Export fuer materialien[].inhalt |
| `get-design-content` | Design-Inhalt lesen | Fuer Editierung |
| `start-editing-transaction` | Editier-Session starten | Nachbearbeitung |
| `perform-editing-operations` | Design-Elemente aendern | Text/Farben anpassen |
| `commit-editing-transaction` | Aenderungen speichern | Nachbearbeitung abschliessen |
| `resize-design` | Design-Groesse aendern | Anpassung an Engine-Viewport |
| `upload-asset-from-url` | Externes Bild in Canva laden | Wikimedia-Bilder als Canva-Asset |
| `search-designs` | Eigene Designs durchsuchen | Wiederverwendung |
| `get-export-formats` | Verfuegbare Export-Formate pruefen | Vor Export aufrufen |
| `list-brand-kits` | Brand-Kits auflisten | Optional: einheitliches Design-System |
| `request-outline-review` | Praesentations-Outline zur Pruefung | Nicht relevant |
| `generate-design-structured` | Praesentation aus Outline | Nicht relevant |

**Relevante design_types fuer Materialerstellung:**

| design_type | Materialtyp | Beschreibung |
|---|---|---|
| `infographic` | `karte`, `statistik`, `zeitleiste` | Datenvisualisierung, historische Karten |
| `poster` | `bildquelle` | Grossformatige Illustrationen |
| `document` | `darstellungstext` (Lehrkraft-Export) | Seitenbasiertes Dokument |
| `report` | Lehrkraft-Handout | Visuell gestalteter Bericht |

**Primaere Agenten-Integration:**

| Agent | Workflow-Schritt | Verwendung |
|---|---|---|
| AGENT_MATERIAL | karte-Produktion (2.1) | `generate-design(design_type: "infographic", query: "...")` |
| AGENT_MATERIAL | statistik-Visualisierung (2.1) | Wenn JSON-Tabelle nicht reicht: Canva-Chart |
| AGENT_MATERIAL | Einstieg-Illustration-Workflow | Stimmungsbild wenn kein Wikimedia-Treffer |

**Workflow (Karten, Infografiken):**
```
1. generate-design → design_type: "infographic", query: detaillierte Beschreibung auf Deutsch, Zielgruppe R7
2. User waehlt Kandidaten (in Cowork)
3. create-design-from-candidate → Design-ID
4. export-design → format: {type: "png", width: 1200}
5. PNG in assets/images/[game-id]/ ablegen
6. URL in materialien[].inhalt referenzieren
```

---

### 5. rijksmuseum-mcp-plus ★★☆ FREI

**MCP-ID:** `mcp__747e18b6-a44a-4302-b390-51c18de46fe3__*`
**Funktion:** Rijksmuseum-Sammlung durchsuchen (832K+ Kunstwerke mit Iconclass-Vokabular)
**Phase:** Ab Ebene 2 (themenabhaengig)

| Tool | Funktion | Materialerstellungs-Relevanz |
|---|---|---|
| `search_artwork` | Strukturierte Suche (Kuenstler, Zeitraum, Typ, Thema) | ★★☆ Historische Gemaelde, Portraets |
| `semantic_search` | Semantische Konzeptsuche | ★★☆ Thematische Bildsuche |
| `get_artwork_details` | Vollstaendige Metadaten | Lizenz, Beschreibung, Datierung |
| `get_artwork_image` | Hochaufloesungs-Viewer | Detailbetrachtung |
| `inspect_artwork_image` | Bild-Region als Base64 zur Analyse | Bildanalyse, Inschriften lesen |
| `find_similar` | Aehnliche Werke finden | Alternatives Bildmaterial |
| `lookup_iconclass` | Ikonografische Klassifikation | Thematische Suche praezisieren |
| `list_curated_sets` / `browse_set` | Vorkuratierte Sammlungen | Thematischer Einstieg |

**Suchparameter-Highlights:**
- `subject`: Primaerparameter fuer Konzeptsuche (Iconclass-Vokabular, 832K Werke)
- `creationDate`: Wildcard moeglich (`"18*"` fuer 1800er)
- `imageAvailable: true`: Nur Werke mit digitalem Bild
- `license: "publicdomain"`: Public-Domain-Filter
- Niederlaendische Labels haben hoehere Trefferquote als englische

**Primaere Agenten-Integration:**

| Agent | Workflow-Schritt | Verwendung |
|---|---|---|
| AGENT_MATERIAL | Quellenrecherche-Workflow Stufe 1 | Kunstwerke, Portraets fuer bildquelle |
| AGENT_MATERIAL | bildquelle-Produktion (2.1) | Hochaufloesende Bilder mit Metadaten |

**Thematische Relevanz (GPG 7):**
- Absolutismus: Portraets, Hofkultur, 17./18. Jh.
- Industrialisierung: Darstellungen von Arbeit, Fabriken, Stadtleben
- Kolonialismus: Niederlaendische Kolonialgeschichte (VOC, Ostindien)
- Erster Weltkrieg: Begrenzt — primaer Wikimedia nutzen

---

## TEIL B — Ergaenzende Produktionstools (★★☆)

### 6. mcp-pandoc ★★☆ FREI

**MCP-ID:** `mcp__mcp-pandoc__convert-contents`
**Funktion:** Format-Konvertierung AUS Markdown (Export/Publishing)

| Parameter | Beschreibung |
|---|---|
| `contents` / `input_file` | Quellinhalt oder -datei |
| `input_format` | markdown, html, pdf, docx, rst, latex, epub, txt, ipynb, odt |
| `output_format` | Gleiche Formate |
| `output_file` | Vollstaendiger Pfad mit Extension (Pflicht fuer PDF/DOCX) |
| `reference_doc` | Styling-Template fuer DOCX |
| `filters` | Pandoc-Filter (Python-Skripte) |

**Agenten-Integration:** Lehrkraft-Export (Loesungs-Handout als PDF/DOCX)
**Abgrenzung:** markdownify = IN Markdown (Preprocessing). mcp-pandoc = AUS Markdown (Export).

---

### 7. ElevenLabs ★★☆ KOSTEN

**MCP-ID:** `mcp__ElevenLabs__*`
**Phase:** Post-MVP (Audio-Erweiterung)
**KOSTENPFLICHTIG — Bestaetigung vor jedem generativen Aufruf Pflicht**

| Tool | Funktion | Materialerstellungs-Relevanz |
|---|---|---|
| `text_to_speech` | Text → MP3 (multilingual, DE unterstuetzt) | ★★☆ Einstieg-Narrativ vorlesen |
| `text_to_sound_effects` | Text → Soundeffekt (0.5-5s) | ★★☆ UI-Sounds (Unlock, Erfolg, Fehler) |
| `compose_music` | Text → Musik | ★☆☆ Hintergrundmusik |
| `speech_to_text` | Audio → Transkript (mit Diarization) | ★☆☆ Unterrichtsmitschnitte |
| `isolate_audio` | Audio-Isolation | ✗ |
| `search_voices` / `get_voice` | Stimmen durchsuchen | FREI — Vorbereitung |
| `check_subscription` | Guthaben pruefen | FREI — vor jedem Aufruf |

**TTS-Parameter:** `language: "de"`, `model_id: "eleven_multilingual_v2"`, `stability: 0.5`, `speed: 1.0`

**Pflicht-Workflow:**
```
1. check_subscription → Guthaben pruefen
2. User informieren: "[Tool] [Beschreibung], geschaetzte Zeichenzahl: [N]"
3. Bestaetigung abwarten
4. Ausfuehren → Datei in assets/audio/[game-id]/
```

---

### 8. Mapbox ★★☆ KOSTEN (API) / FREI (Offline)

**MCP-ID:** `mcp__mapbox__*` (benutzerdefiniert)
**Phase:** Post-MVP (geografische Illustrationen)

**API-Tools (kostenpflichtig):**

| Tool | Materialerstellungs-Relevanz |
|---|---|
| `static_image_tool` | ★★★ Frontverlaeufe, historische Gebiete als statische Karte |
| `isochrone_tool` | ★☆☆ Erreichbarkeitszonen |
| `search_and_geocode_tool` | ★☆☆ Koordinaten fuer Karten |

**Offline-Tools (kostenlos, Turf.js):** `distance`, `bearing`, `area`, `centroid`, `bounding_box`, `buffer`, `simplify`, `point_in_polygon` — frei verwendbar ohne Bestaetigung.

---

### 9. Invideo ★★☆ KOSTEN

**MCP-ID:** `mcp__f3cda5a0-f7c4-4277-9ea7-2835236f1597__generate-video-from-script`
**Funktion:** Video-Generierung aus Skript

| Parameter | Beschreibung |
|---|---|
| `script` (required) | Video-Skript-Text |
| `topic` (required) | Thema |
| `vibe` (required) | Ton: "educational", "entertaining", "professional" |
| `targetAudience` (required) | Zielgruppe |
| `platform` (required) | "youtube", "instagram", "tiktok" |

**Materialerstellungs-Relevanz:** ★★☆
- Erklaervideos zu historischen Themen fuer Einstieg oder Sicherung
- Kurze Zusammenfassungs-Videos pro Mappe
- Setzt voraus: gutes Skript aus AGENT_MATERIAL-Output

**Phase:** Post-MVP. Erst evaluieren wenn Engine Video-Embedding unterstuetzt.

---

### 10. clanki (Anki) ★★☆ LOKAL

**MCP-ID:** `mcp__clanki__*`
**Funktion:** Anki-Karteikarten und -Decks erstellen

| Tool | Parameter | Beschreibung |
|---|---|---|
| `create-deck` | `name` | Neues Deck anlegen |
| `create-card` | `deckName`, `front`, `back`, `tags` | Klassische Karteikarte |
| `create-cloze-card` | `deckName`, `text` (mit `{{c1::...}}`), `tags` | Lueckentext-Karte |
| `update-card` / `update-cloze-card` | — | Bestehende Karten aendern |

**Materialerstellungs-Relevanz:** ★★☆
- Automatische Vokabel-/Fachbegriff-Decks aus Mappe-Materialien generieren
- Cloze-Deletions fuer Kernaussagen aus Tafelbild-Knoten
- Pruefungsvorbereitung: Aufgaben als Anki-Karten exportieren

**Agenten-Integration (Zukunft):**
```
AGENT_MATERIAL → Mappe produziert → Fachbegriffe extrahieren
→ clanki: create-deck("GPG7-Mappe-[N]-[Thema]")
→ Pro Fachbegriff: create-card(front: Begriff, back: Erklaerung + Kontext)
→ Pro Kernaussage: create-cloze-card(text: "{{c1::Bismarck}} gruendete den Dreibund 1882")
```

---

### 11. Learning Commons Knowledge Graph ★★☆ FREI

**MCP-ID:** `mcp__93e965b1-6db4-4856-b199-763f15af6eb1__*`
**Funktion:** US-Bildungsstandards abfragen (CCSS, State Frameworks)

| Tool | Funktion |
|---|---|
| `find_standard_statement` | Standard-Code → offizielle Formulierung + Metadaten |
| `find_learning_components_from_standard` | Standard → granulare Lernkomponenten |
| `find_standards_progression_from_standard` | Vorwaerts-/Rueckwaerts-Progression |

**Materialerstellungs-Relevanz:** ★☆☆ fuer das aktuelle Projekt (bayerischer Lehrplan, nicht US-Standards). Potenziell nuetzlich als methodische Referenz fuer Kompetenzstrukturierung — zeigt wie Standards in Lernkomponenten zerlegt werden, analog zur Kompetenzerwartungs-Matrix im GAME_BLUEPRINT.

---

## TEIL C — Dokumenten-Erstellung und -Verarbeitung (★★☆)

### 12. Excel (By Anthropic) ★★☆ LOKAL

**MCP-ID:** `mcp__Excel__By_Anthropic___*`

| Tool | Funktion |
|---|---|
| `create_workbook` | Neues Workbook |
| `open_workbook` / `close_workbook` / `save_workbook` | Datei-Management |
| `get_cell_value` / `set_cell_value` | Einzelzellen |
| `get_range_values` / `set_range_values` | Bereiche |
| `insert_formula` | Formeln |
| `create_chart` | Diagramme (column, line, pie, bar, area, scatter) |
| `export_pdf` | PDF-Export |

**Materialerstellungs-Relevanz:** ★★☆
- Statistik-Material als echte Excel-Datei (Lehrkraft-Export)
- Daten-Visualisierung: `create_chart` fuer Militaerausgaben-Vergleich etc.
- Evaluations-Tracking: Test-Ergebnisse, Schueler-Fortschritt

---

### 13. PowerPoint (By Anthropic) ★☆☆ LOKAL

**MCP-ID:** `mcp__PowerPoint__By_Anthropic___*`

| Tool | Funktion |
|---|---|
| `create_presentation` / `open_presentation` / `save_presentation` | Datei-Management |
| `add_slide` / `delete_slide` / `set_slide_title` | Folien-Management |
| `add_text_to_slide` | Text einfuegen |
| `insert_image` | Bild einfuegen (mit Positionierung) |
| `get_slide_content` | Folieninhalt lesen |
| `export_pdf` | PDF-Export |

**Materialerstellungs-Relevanz:** ★☆☆ — Nicht im Kern-Workflow. Potenzial: Lehrkraft-Praesentation mit Game-Uebersicht.

---

### 14. Word (By Anthropic) ★☆☆ LOKAL

**MCP-ID:** `mcp__Word__By_Anthropic___*`

| Tool | Funktion |
|---|---|
| `create_document` / `open_document` / `close_document` / `save_document` | Datei-Management |
| `insert_text` / `replace_text` | Text einfuegen/ersetzen |
| `format_text` | Formatierung |
| `get_document_text` | Text auslesen |
| `export_pdf` | PDF-Export |

**Materialerstellungs-Relevanz:** ★☆☆ — mcp-pandoc ist flexibler fuer Export. Word-Tools primaer fuer Lehrkraft-Handouts.

---

### 15. PDF Tools ★★☆ LOKAL

**MCP-ID:** `mcp__PDF_Tools_-_Analyze__Extract__Fill__Compare__*`

| Tool | Funktion |
|---|---|
| `read_pdf_content` | PDF lesen und analysieren |
| `read_pdf_fields` | Formularfelder auslesen |
| `fill_pdf` / `fill_with_profile` | PDF-Formulare ausfuellen |
| `extract_to_csv` | Daten als CSV extrahieren |
| `bulk_fill_from_csv` | Mehrere PDFs aus CSV befuellen |
| `validate_pdf` | PDF validieren |
| `list_pdfs` / `get_pdf_resource_uri` | PDF-Verwaltung |

**Materialerstellungs-Relevanz:** ★★☆
- `read_pdf_content`: Alternative zu markdownify fuer PDF-Analyse
- `fill_pdf`: Lehrkraft-Formulare (Bewertungsboegen) automatisch befuellen
- `extract_to_csv`: Daten aus PDF-Tabellen extrahieren

---

## TEIL D — Browser-Automatisierung und Recherche (★★☆)

### 16. Claude in Chrome ★★☆ LOKAL

**MCP-ID:** `mcp__Claude_in_Chrome__*`
**Funktion:** Vollstaendige Browser-Automatisierung (Lesen, Navigieren, Formulare, Screenshots)

| Tool-Kategorie | Tools | Materialerstellungs-Relevanz |
|---|---|---|
| Navigation | `navigate`, `find`, `read_page`, `get_page_text` | ★★☆ Web-Recherche wenn markdownify/WebFetch scheitert |
| Formulare | `form_input`, `upload_image` | ★☆☆ |
| Screenshots | `gif_creator`, `shortcuts_execute` | ★☆☆ |
| Tabs | `tabs_context_mcp`, `tabs_create_mcp`, `tabs_close_mcp` | Infrastruktur |
| JS/Debug | `javascript_tool`, `read_console_messages`, `read_network_requests` | ★☆☆ Engine-Debugging |

**Agenten-Integration:** Fallback fuer Quellenrecherche wenn `markdownify:webpage-to-markdown` oder `WebFetch` eine Seite nicht verarbeiten koennen.

---

### 17. Control Chrome ★☆☆ LOKAL

**MCP-ID:** `mcp__Control_Chrome__*`
**Funktion:** Einfachere Chrome-Steuerung (URLs oeffnen, Tabs verwalten, JS ausfuehren)

| Tool | Funktion |
|---|---|
| `open_url` / `get_current_tab` / `list_tabs` / `switch_to_tab` / `close_tab` | Tab-Management |
| `get_page_content` | Seiteninhalt lesen |
| `execute_javascript` | JS ausfuehren |
| `go_back` / `go_forward` / `reload_tab` | Navigation |

**Materialerstellungs-Relevanz:** ★☆☆ — Dopplung mit Claude in Chrome. Nur als leichtgewichtige Alternative.

---

### 18. WebSearch + WebFetch (Built-in) ★★★ FREI

**Funktion:** Web-Suche und URL-Abruf mit Markdown-Konvertierung

| Tool | Funktion | Materialerstellungs-Relevanz |
|---|---|---|
| `WebSearch` | Web-Suche mit Ergebnis-Snippets | ★★★ Faktenrecherche, aktuelle Quellen |
| `WebFetch` | URL → Markdown + AI-Verarbeitung | ★★★ Quellenrecherche Stufe 1 |

**Abgrenzung zu markdownify:** WebFetch hat eingebaute Content-Restrictions und gibt AI-verarbeitete Zusammenfassungen zurueck. markdownify:webpage-to-markdown gibt den vollstaendigen Markdown zurueck. Fuer Quellenrecherche markdownify bevorzugen (vollstaendiger Text), WebFetch als schnellen Ueberblick.

---

## TEIL E — Kollaboration und Organisation (★☆☆-★★☆)

### 19. Google Drive ★★☆ FREI

**MCP-ID:** `mcp__c1fc4002-5f49-5f9d-a4e5-93c4ef5d6a75__*`

| Tool | Funktion | Materialerstellungs-Relevanz |
|---|---|---|
| `google_drive_search` | Drive-Dateien durchsuchen (API-Query) | ★★☆ Quelldokumente finden |
| `google_drive_fetch` | Google-Doc-Inhalte lesen (per Doc-ID) | ★★☆ Inhalts-Quellen aus Drive |

**Agenten-Integration:** Quelldokumente die Lehrkraefte in Google Drive bereitstellen direkt lesen, ohne manuellen Download.

---

### 20. miro ★☆☆ FREI (im Rahmen des Miro-Accounts)

**MCP-ID:** `mcp__miro__*`
**Funktion:** Miro-Board-Erstellung und -Bearbeitung (Sticky Notes, Shapes, Connectors, Mind Maps, Frames)
**Umfang:** 80+ Tools fuer vollstaendige Board-Verwaltung

**Materialerstellungs-Relevanz:** ★☆☆
- Potenzial: Kollaborative Tafelbild-Erstellung mit Lehrkraeften auf Miro
- Potenzial: Mind-Map-Generierung fuer Brainstorming-Phasen
- Aktuell: Kein Bedarf — Excalidraw deckt Diagramme ab, Tafelbild laeuft ueber JSON/Engine

---

### 21. Apple Notes ★☆☆ LOKAL

**MCP-ID:** `mcp__Read_and_Write_Apple_Notes__*`

| Tool | Funktion |
|---|---|
| `list_notes` / `get_note_content` | Notizen lesen |
| `add_note` / `update_note_content` | Notizen schreiben |

**Materialerstellungs-Relevanz:** ★☆☆ — Persoenliche Notizen. Kein Workflow-Bezug.

---

### 22. Hugging Face ★☆☆ FREI

**MCP-ID:** `mcp__be0263ce-d945-4896-88f0-56c7d9ece96c__*`

| Tool | Funktion |
|---|---|
| `hf_hub_query` / `hub_repo_search` / `hub_repo_details` | Repos durchsuchen |
| `hf_doc_search` / `hf_doc_fetch` | Dokumentation durchsuchen |
| `paper_search` | Forschungspapiere suchen |
| `space_search` / `dynamic_space` | HF Spaces durchsuchen/starten |

**Materialerstellungs-Relevanz:** ★☆☆ — Nur relevant wenn AI-Modelle fuer spezifische Aufgaben evaluiert werden sollen (z.B. OCR-Modelle, Uebersetzungsmodelle).

---

### 23. Langchain Docs ★☆☆ FREI

**MCP-ID:** `mcp__f7b5cfbf-0514-40e8-80bc-3a1cb5a360f1__search_docs_by_lang_chain`
**Funktion:** Langchain-Dokumentation durchsuchen
**Materialerstellungs-Relevanz:** ✗ — Entwickler-Tool, kein Materialerstellungs-Bezug.

---

## TEIL F — System-Tools und Infrastruktur

### 24. Control your Mac ★☆☆ LOKAL

`mcp__Control_your_Mac__osascript` — AppleScript ausfuehren. Kein Materialerstellungs-Bezug.

### 25. Desktop Commander ★☆☆ LOKAL

Desktop-Automatisierung. Kein direkter Materialerstellungs-Bezug.

### 26. Filesystem ★★☆ LOKAL

Standard-Dateisystem-Zugriff. Infrastruktur fuer alle Agenten.

### 27. mcpfinder ★☆☆ FREI

MCP-Server suchen und konfigurieren. Meta-Tool.

### 28. sequentialthinking ★☆☆ LOKAL

`mcp__sequentialthinking__sequentialthinking` — Strukturiertes Denken. Potenzial fuer komplexe didaktische Entscheidungen, aber kein eigenstaendiger Workflow-Beitrag.

### 29. arxiv-latex-mcp ★☆☆ FREI

`mcp__arxiv-latex-mcp__get_paper_prompt` — arXiv-Paper abrufen. Kein Materialerstellungs-Bezug.

### 30. B12 Website Generator ★☆☆ FREI

Website-Generierung. Nicht relevant — Projekt nutzt GitHub Pages mit eigenem Code.

---

## Zusammenfassung: MCP-Integration nach Agent und Workflow-Schritt

### AGENT_MATERIAL — Primaere Tool-Zuordnung

**Kanonisch:** Per-Materialtyp-Workflows (W-1 bis W-8) in `docs/agents/AGENT_MATERIAL.md`. Diese Tabelle ist eine Kurzreferenz.

| Workflow | Primaer-Tool | Sekundaer-Tool | Fallback | Ref |
|---|---|---|---|---|
| **Design-Modus (Ebene 1)** | | | | |
| 1.5 Tafelbild-Verifizierung | `Mermaid: validate_and_render` | — | — | W-8 |
| **Produktions-Modus (Ebene 2)** | | | | |
| 2.1 darstellungstext | Agent schreibt | — | — | W-1 |
| 2.1 quellentext | `markdownify: webpage-to-markdown` | `WebSearch` + `WebFetch` | `google_drive_search/fetch` | W-2 |
| 2.1 bildquelle (hist.) | `wikimedia_search_images` | `rijksmuseum: search_artwork` | `Canva: generate-design` | W-3 |
| 2.1 bildquelle (Illustration) | `Canva: generate-design` (poster) | — | — | W-3 |
| 2.1 karte | `wikimedia_search_images` (hist.) | `Canva: generate-design` (infographic) | `excalidraw: create_view` | W-4 |
| 2.1 zeitleiste (einfach) | Engine-Renderer (JSON) | — | — | W-5 |
| 2.1 zeitleiste (mittel) | `Mermaid: timeline` | — | — | W-5 |
| 2.1 zeitleiste (komplex) | `excalidraw: create_view` | `svg-converter: svg-to-png` | — | W-5 |
| 2.1 statistik (Diagramm) | `QuickChart: generate_chart` | — | `Canva: generate-design` | W-6 |
| 2.1 statistik (Tabelle) | Engine-Renderer (JSON) | — | — | W-6 |
| 2.1 tagebuch | Agent schreibt | — | — | W-7 |
| 2.2 Tafelbild | `Mermaid: validate_and_render` | `excalidraw: create_view` | — | W-8 |
| 2.2 Tafelbild-Export | `svg-converter: svg-to-png` | — | — | W-8 |
| Quellenrecherche (Text) | `WebSearch` → `markdownify` | `google_drive_search/fetch` | — | W-2 |
| Quellenrecherche (Bild) | `wikimedia_search_images` | `rijksmuseum` | — | W-3 |
| Quellenrecherche (Statistik) | `WebSearch` → `markdownify` | — | — | W-6 |
| Einstieg-Illustration | `wikimedia_search_images` | `Canva: generate-design` (Fallback) | — | W-3 |

### AGENT_INHALT — Tool-Zuordnung

| Workflow-Schritt | Tool | Bedingung |
|---|---|---|
| Vorverarbeitung Schritt 0 | `markdownify: pdf/docx/pptx/xlsx-to-markdown` | Wenn Quellen nicht als .md vorliegen |
| YouTube-Quellen | `markdownify: youtube-to-markdown` | Dokumentarfilm-Transkripte |
| Tafelbild-Extraktion | `excalidraw: read_me + create_view` | TB_*.excalidraw-Dateien |
| Web-Recherche | `WebSearch`, `markdownify: webpage-to-markdown` | Fachwissenschaftliche Quellen |
| Google-Drive-Quellen | `google_drive_search` + `google_drive_fetch` | Lehrkraft-Dokumente in Drive |

### Export-Workflow

| Produkt | Tool | Format |
|---|---|---|
| Lehrkraft-Handout (Loesungen) | `mcp-pandoc: convert-contents` | PDF/DOCX |
| Tafelbild-PNG fuer Handout | `svg-converter: svg-to-png` | PNG (scale: 2) |
| Statistik-Daten | `Excel: create_workbook + set_range_values + create_chart` | XLSX |
| Schueler-Lernkarten | `clanki: create-deck + create-card/create-cloze-card` | Anki |

### Post-MVP Erweiterungen

| Feature | Tool | Phase |
|---|---|---|
| Audio-Narrativ | `ElevenLabs: text_to_speech` | Post-MVP |
| UI-Sounds | `ElevenLabs: text_to_sound_effects` | Post-MVP |
| Erklaervideos | `Invideo: generate-video-from-script` | Post-MVP |
| Historische Karten (geographisch) | `Mapbox: static_image_tool` | Post-MVP |
| Kollaboratives Tafelbild | `miro: create-board + create-sticky-note-item` | Post-MVP |

---

## Kostenueberblick und Genehmigungspflichten

| Server | Kostenmodell | Regel |
|---|---|---|
| markdownify | Kostenlos | Frei verwendbar |
| wikimedia-image-search | Kostenlos | Lizenzpruefung Pflicht |
| excalidraw | Kostenlos | `read_me` immer zuerst |
| QuickChart | Kostenlos | Frei verwendbar, kein API-Key |
| Mermaid Chart | Kostenlos (Konnektor) | Frei verwendbar |
| svg-converter | Kostenlos (lokal) | Frei verwendbar |
| Canva | Kostenlos (Account) | Design-Kandidaten-Auswahl durch User |
| rijksmuseum | Kostenlos | Frei verwendbar |
| mcp-pandoc | Kostenlos | Frei verwendbar |
| Google Drive | Kostenlos | Nur eigene Dateien |
| clanki | Kostenlos (lokal) | Anki muss laufen |
| Learning Commons | Kostenlos | US-Standards, begrenzte Relevanz |
| WebSearch / WebFetch | Kostenlos | Content-Restrictions beachten |
| PDF Tools | Kostenlos (lokal) | Frei verwendbar |
| Excel / Word / PowerPoint | Kostenlos (lokal) | Apps muessen installiert sein |
| Hugging Face | Kostenlos | Frei verwendbar |
| Mapbox (Offline) | Kostenlos (Turf.js) | Frei verwendbar |
| **Mapbox (API)** | **Token-basiert** | **Bestaetigung vor jedem Aufruf** |
| **ElevenLabs** | **Token-basiert** | **Bestaetigung vor jedem generativen Aufruf** |
| **Invideo** | **Accountbasiert** | **Bestaetigung vor jedem Aufruf** |

---

## Priorisierte Integrations-Reihenfolge

**Sofort nutzbar (Ebene 1-2):**
1. markdownify (Quellenrecherche)
2. wikimedia-image-search (Bildquellen)
3. excalidraw (Tafelbilder — polierte Visualisierung)
4. **Mermaid Chart (Tafelbilder — schnelle Validierung, Zeitleisten)** ← NEU
5. **QuickChart (Statistik-Diagramme als Bild)** ← NEU
6. Canva (Karten, Infografiken, Setting-Illustrationen)
7. WebSearch + WebFetch (Faktenrecherche)

**Nach Bedarf (Ebene 2+):**
8. **svg-converter (SVG→PNG fuer Export/Handout)** ← NEU
9. rijksmuseum (themenabhaengig)
10. Google Drive (wenn Lehrkraft-Quellen dort liegen)
11. PDF Tools (PDF-Analyse)
12. mcp-pandoc (Lehrkraft-Export)
13. clanki (Lernkarten-Export)

**Post-MVP:**
14. ElevenLabs (Audio)
15. Mapbox (Karten)
16. Invideo (Video)
17. Excel/Word/PowerPoint (Office-Export)
15. miro (Kollaboration)
