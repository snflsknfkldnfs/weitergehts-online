# MCP_TOOLS – Verfügbare MCP-Server und Projekt-Integration

Dokumentiert alle installierten MCP-Server, ihre verfügbaren Tools, Relevanz-Bewertung für das Projekt und konkrete Integrationspunkte im Agenten-Workflow.

**Legende Relevanz:** ★★★ Kern-Workflow | ★★☆ Nützlich/Optional | ★☆☆ Nische/Zukunft

---

## 1. markdownify-mcp ★★★

**Paket:** `markdownify-mcp` (zcaceres/markdownify-mcp)
**Start (falls nötig):** `cd "/Users/paulad/Library/Application Support/Claude/Claude Extensions/markdownify-mcp" && pnpm start`
**Phase:** Ab Phase 3 (Inhalt), Vorverarbeitung von Quellmaterial

### Tools

| Tool | Funktion | Projekt-Relevanz |
|---|---|---|
| `pdf-to-markdown` | PDF → Markdown | Schulbücher, Arbeitsblätter, PDF-Scans in Markdown konvertieren |
| `pptx-to-markdown` | PowerPoint → Markdown | Präsentationen von Kollegen als Quellmaterial |
| `docx-to-markdown` | Word → Markdown | Word-Unterlagen in Quellmaterial umwandeln |
| `xlsx-to-markdown` | Excel → Markdown | Tabellen (Lehrpläne, Listen) als Markdown-Tabellen |
| `webpage-to-markdown` | Webseite → Markdown | Schulbuch-Websites, LehrplanPLUS-Seiten |
| `image-to-markdown` | Bild → Markdown (OCR) | Gescannte Arbeitsblätter, handschriftliche Notizen |
| `audio-to-markdown` | Audio → Transcript | Unterrichtsmitschnitte, Podcast-Material |
| `youtube-to-markdown` | YouTube → Transcript | Dokumentarfilm-Transkripte (z.B. ZDF-Videos zur Geschichte) |
| `bing-search-to-markdown` | Bing-Suche → Markdown | Schnelle Faktenrecherche |
| `git-repo-to-markdown` | Repo → Markdown-Übersicht | Projektstruktur-Dokumentation |
| `get-markdown-file` | Remote-Datei lesen | Öffentliche Markdown-Quellen |

### Integration im Agenten-Workflow

**AGENT_INHALT – Vorverarbeitung (Schritt 0, vor Briefing-Auswertung):**

Wenn Quelldateien nicht als `.md` vorliegen, werden sie mit markdownify konvertiert:

```
Priorität: PDF/DOCX/PPTX-Quelldateien → markdownify → .md → dann weiter wie gewohnt
```

Typische Trigger:
- Quelldatei im Themen-Briefing hat Endung `.pdf`, `.docx`, `.pptx`
- Lehrkraft übergibt Schulbuch-Scan
- YouTube-Dokumentarfilm als Quellmaterial angegeben

**Konventionen:**
- Konvertierte Dateien in `/tmp/` oder Workspace ablegen, nicht ins Repo committen
- Quelldatei-Pfad im Inhalts-MD vermerken: `[konvertiert aus: dateiname.pdf via markdownify]`

---

## 2. mcp-pandoc ★★☆

**Paket:** `mcp-pandoc` (vivekVells/mcp-pandoc)
**Phase:** Phase 5+ (Export/Veröffentlichung)

### Tools

| Tool | Funktion |
|---|---|
| `convert-contents` | Dokument-Format-Konvertierung (Markdown → PDF/DOCX/HTML/EPUB etc.) |

### Integration im Agenten-Workflow

**Primärer Use-Case – Lehrkraft-Export:**
Inhalts-MDs oder Rätsel-MDs als druckbare PDF-/DOCX-Zusammenfassung exportieren. Nützlich für:
- Lehrkraft-Handout mit allen Lösungen
- Offline-Version des Escape-Games als Druck-PDF
- `lehrkraft.html`-Äquivalent als Word-Dokument

**Abgrenzung zu markdownify:**
markdownify konvertiert *in* Markdown (Preprocessing).
mcp-pandoc konvertiert *aus* Markdown in Zielformat (Export/Publishing).

**Konvention:** Nur für Endprodukte einsetzen, nicht im Kern-Produktionspipeline.

---

## 3. wikimedia-image-search-mcp ★★★

**Paket:** `wikimedia-image-search-mcp` (yanexr/wikimedia-image-search-mcp)
**Phase:** Phase 5+ (Post-MVP Medien-Erweiterung)
**Lizenz:** Alle Ergebnisse sind Wikimedia Commons – Public Domain oder CC-lizenziert

### Tools

| Tool | Funktion |
|---|---|
| `wikimedia_search_images` | Bildersuche in Wikimedia Commons mit Lizenz-Metadaten |

### Integration im Agenten-Workflow

**AGENT_DESIGN – Post-MVP Bildintegration:**

```
Suchanfrage → wikimedia_search_images → Lizenz prüfen (CC0/PD bevorzugt)
→ URL + Lizenzinfo in assets/images/ dokumentieren
→ <img>-Tag mit Alt-Text + Bildunterschrift + Lizenznachweis ins HTML
```

Relevante Suchanfragen für aktuelle Inhalte:
- `"Erster Weltkrieg Schützengraben"` → Mappe 1/2
- `"Schlieffen Plan map 1914"` → Mappe 1
- `"Heimatfront Deutschland Frauen Fabrik"` → Mappe 3
- `"Novemberrevolution 1918 Kiel"` → Mappe 5

**Pflicht-Workflow bei jedem Bild:**
1. `wikimedia_search_images` aufrufen
2. Lizenz-Feld prüfen: CC0 oder Public Domain bevorzugen, CC-BY akzeptieren, CC-NC/SA dokumentieren
3. Bildunterschrift mit Lizenznachweis erstellen: `Quelle: Wikimedia Commons, [Lizenz], [URL]`
4. In `assets/images/[game-id]/` ablegen
5. In `docs/ASSET_LIZENZEN.md` eintragen

---

## 4. rijksmuseum-mcp-plus ★☆☆

**Paket:** `rijksmuseum-mcp-plus` (kintopp/rijksmuseum-mcp-plus)
**MCP-ID:** `mcp__747e18b6-a44a-4302-b390-51c18de46fe3`
**Phase:** Phase 5+ (Post-MVP, themenabhängig)

### Tools

| Tool | Funktion |
|---|---|
| `search_artwork` | Kunstwerke suchen (Stichwort, Zeitraum, Stil) |
| `semantic_search` | Semantische Suche nach Kunstwerken |
| `get_artwork_details` | Metadaten + Beschreibung eines Werks |
| `get_artwork_image` | Bild-URL eines Werks |
| `inspect_artwork_image` | Detailansicht eines Bildbereichs |
| `get_artwork_bibliography` | Bibliografie zu einem Werk |
| `list_curated_sets` | Vorkuratierte Sammlungen (z.B. nach Epoche) |
| `browse_set` | Werke in einer kuratierten Sammlung |
| `navigate_viewer` | Zoom/Pan im Hochauflösungs-Viewer |
| `lookup_iconclass` | Ikonografische Klassifikation |
| `get_recent_changes` | Neueste Änderungen in der Datenbank |

### Relevanz-Einschätzung

Rijksmuseum ist primär auf niederländische Kunst spezialisiert. Für GPG-Inhalte (Erster Weltkrieg, Industrialisierung) ist der Nutzen begrenzt. Potenzielle Anwendungsfälle:

- GPG-Einheiten zu Imperialismus/Kolonialismus (niederländische Kolonialgeschichte)
- Kunstgeschichtliche Verknüpfungen in WiB oder fächerübergreifenden Projekten
- Zeitperioden-Illustration: Gemälde des 17./18. Jahrhunderts für Absolutismus-Einheiten

**Aktuelle Priorität: Niedrig.** Erst evaluieren wenn ein Thema mit konkretem Kunstwerk-Bezug ansteht.

---

## 5. elevenlabs-mcp ★★☆

**Konfiguration:** `"ELEVENLABS_MCP_OUTPUT_MODE": "both"` (Datei gespeichert UND zurückgegeben)
**Phase:** Phase 5+ (Post-MVP Audio)
**⚠️ KOSTENPFLICHTIG – Immer explizite Bestätigung einholen vor jedem generativen Aufruf**

### Tools

| Tool | Funktion | Kostenpflichtig |
|---|---|---|
| `text_to_speech` | Text → Audio-Datei (MP3) | ✅ JA |
| `text_to_sound_effects` | Text → Soundeffekt | ✅ JA |
| `compose_music` | Text → Musik | ✅ JA |
| `speech_to_text` | Audio → Transkript | ✅ JA |
| `voice_clone` | Stimme klonen | ✅ JA |
| `speech_to_speech` | Stimme umwandeln | ✅ JA |
| `text_to_voice` | Stimmenvorschau generieren | ✅ JA |
| `create_voice_from_preview` | Stimme aus Vorschau erstellen | ✅ JA |
| `search_voices` | Verfügbare Stimmen durchsuchen | ❌ kostenlos |
| `search_voice_library` | Bibliothek durchsuchen | ❌ kostenlos |
| `get_voice` | Stimmen-Details abrufen | ❌ kostenlos |
| `list_models` | Verfügbare Modelle auflisten | ❌ kostenlos |
| `play_audio` | Generiertes Audio abspielen | ❌ (lokal) |
| `list_agents` | Voice-Agenten auflisten | ❌ kostenlos |
| `check_subscription` | Guthaben/Limits prüfen | ❌ kostenlos |

### PFLICHT-Workflow vor jedem generativen Aufruf

```
1. check_subscription → Guthaben prüfen
2. User informieren: "[Tool] [Beschreibung], geschätzte Zeichenzahl: [N]"
3. Explizite Bestätigung abwarten ("ja" / "go" / "machen")
4. Erst dann generativen Aufruf ausführen
5. Datei in assets/audio/[game-id]/ ablegen
```

**Nie ohne Bestätigung aufrufen:** `text_to_speech`, `text_to_sound_effects`, `compose_music`, `speech_to_speech`, `text_to_voice`, `voice_clone`

### Integration im Agenten-Workflow

**AGENT_DESIGN – Post-MVP Audio (Phase 5):**

| Event | Tool | Beschreibung | Datei |
|---|---|---|---|
| Narrativ-Intro | `text_to_speech` | Reporter spricht Einleitung | `assets/audio/[id]/intro.mp3` |
| Mappe freigeschaltet | `text_to_sound_effects` | Schloss-Klick-Sound | `assets/audio/[id]/unlock.mp3` |
| Richtige Antwort | `text_to_sound_effects` | Kurzer Erfolgs-Ton | `assets/audio/[id]/success.mp3` |
| Falsche Antwort | `text_to_sound_effects` | Sanfter Fehler-Ton | `assets/audio/[id]/error.mp3` |
| Game-Abschluss | `text_to_speech` | Abschluss-Botschaft | `assets/audio/[id]/complete.mp3` |

**Stimmenprofil für GPG-Escape-Games:**
Deutsche Stimme, neutral-erzählerisch, kein dramatisches Overacting.
Suchanfrage: `search_voices` mit `language: "de"`, `use_case: "narration"`

---

## 6. excalidraw-mcp ★★★

**Paket:** excalidraw/excalidraw-mcp (MIT Lizenz)
**Endpoint:** https://mcp.excalidraw.com (alternativ lokal/Vercel)
**Kosten:** Kostenlos, kein API-Key erforderlich
**Phase:** Ab Phase 3 (Tafelbild-Extraktion), Phase 5+ (Diagramm-Generierung)

### Tools

| Tool | Funktion | Parameter |
|---|---|---|
| `read_me` | Gibt Excalidraw-Element-Format-Cheatsheet zurück (Farben, Koordinaten, Beispiele) | Keine |
| `create_view` | Rendert Excalidraw-Diagramm aus JSON-Element-Array; öffnet interaktive Vollbild-Ansicht | `elements` (required): JSON-String mit Element-Array |

**Element-Format (aus `read_me`):**
- Unterstützte Typen: `rectangle`, `text`, `arrow`, andere Excalidraw-Shapes
- Pflichtfelder: `x`, `y`, `width`, `height`, `type`
- Optionale Felder: `backgroundColor`, `strokeColor`, `strokeWidth`, `label`
- Layer-Reihenfolge: erstes Element = hinten, letztes = vorne
- JSON muss valide sein (keine Kommentare, kein Trailing Comma)
- Checkpoint-System: `restoreCheckpoint` Pseudo-Element für iterative Entwicklung

**Pflicht-Workflow:**
```
1. read_me aufrufen → Element-Format-Spec lesen
2. Elements-Array als JSON konstruieren
3. create_view(elements: JSON.stringify(elements)) aufrufen
```

### Integration im Agenten-Workflow

**AGENT_INHALT – Tafelbild-Extraktion (Phase 3):**

Excalidraw-Tafelbilddateien (`TB_*.excalidraw`) aus Quelldateien auswerten:
- Text-Labels maschinell lesbar extrahieren → Inhaltselemente identifizieren
- Strukturelle Anordnung (welche Begriffe stehen nebeneinander/verbunden) als didaktischen Hinweis nutzen
- Ersetzt bisherigen Workaround (Bash-Rohtext-Extraktion)

**AGENT_RAETSEL / AGENT_DESIGN – Diagramm-Generierung (Phase 5+):**

Escape-Game-Visualisierungen als Excalidraw-Diagramme generieren:
- Historische Zeitleisten (z.B. Eskalationsstufen 1914)
- Ursache-Wirkung-Diagramme für Aufgaben
- Übersichtskarten (strukturell, nicht geografisch)
```
read_me → Spec laden → elements JSON bauen → create_view → Screenshot/Export
```

---

## 7. mapbox/mcp-server ★★☆

**Paket:** mapbox/mcp-server
**Voraussetzung:** `MAPBOX_ACCESS_TOKEN` (Umgebungsvariable)
**⚠️ KOSTENPFLICHTIG (token-basiert, usage-based) – Bestätigung vor jedem API-Aufruf**
**Kostenlose Offline-Tools:** Turf.js-basierte Berechnungen (kein API-Call, kein Token-Verbrauch)
**Phase:** Phase 5+ (Post-MVP geografische Illustrationen)

### Tools

#### API-Tools (kostenpflichtig, Token-Verbrauch)

| Tool | Funktion | Projekt-Relevanz |
|---|---|---|
| `static_image_tool` | Statische Kartengrafik mit Markern/Overlays generieren | ★★★ Frontverläufe, historische Gebiete |
| `isochrone_tool` | Erreichbarkeits-/Einzugsgebietszonen (GeoJSON) | ★★☆ Visualisierung von Territorien |
| `search_and_geocode_tool` | Adress-/Ortssuche, POI-Suche | ★☆☆ (gelegentlich für Koordinaten) |
| `reverse_geocoding` | Koordinaten → Adresse | ★☆☆ |
| `directions_tool` | Multi-Punkt-Routing mit Verkehr | ✗ nicht relevant |
| `matrix_tool` | Reisezeiten/-distanzen zwischen mehreren Punkten | ✗ nicht relevant |
| `map_matching_tool` | GPS-Traces auf Straßennetz snappen | ✗ nicht relevant |
| `optimization_tool` | Optimale Route durch mehrere Orte | ✗ nicht relevant |
| `category_search_tool` | POI-Suche nach Kategorie | ✗ nicht relevant |

#### Offline-Tools (kostenlos, kein Token-Verbrauch, Turf.js)

| Tool | Funktion | Projekt-Relevanz |
|---|---|---|
| `distance` | Distanz zwischen zwei Koordinaten (km/miles/m) | ★★☆ Geografischer Kontext |
| `bearing` | Himmelsrichtung zwischen zwei Punkten (0°=N, 90°=O) | ★☆☆ |
| `area` | Fläche eines Polygons berechnen | ★☆☆ |
| `centroid` | Geometrischer Mittelpunkt eines Polygons | ★☆☆ |
| `bounding_box` | Minimales Begrenzungsrechteck | ★☆☆ |
| `buffer` | Proximityzone um einen Punkt/Linie | ★☆☆ |
| `simplify` | Polygon-Komplexität reduzieren | ★☆☆ |
| `point_in_polygon` | Prüfen ob Koordinate in Polygon liegt | ★☆☆ |

### PFLICHT-Workflow vor jedem API-Tool-Aufruf

```
1. Nutzer informieren: "Mapbox [tool_name] für [Zweck], Token-Verbrauch"
2. Explizite Bestätigung abwarten
3. Erst dann ausführen
4. Karte als statische PNG/JPG exportieren und in assets/images/[game-id]/ ablegen
```

**Offline-Tools** (`distance`, `bearing`, `area`, etc.) können ohne Bestätigung aufgerufen werden — kein Token-Verbrauch.

### Rate Limits

- 100 Requests/Minute pro Account/Token
- Jede API hat eigene Limits — bei Überschreitung automatisch pausieren

### Integration im Agenten-Workflow

**AGENT_DESIGN – Post-MVP Kartenbilder (Phase 5+):**

Primärer Use-Case `static_image_tool`:
- WWI-Frontverläufe 1914–1918 als statische Kartengrafik
- Kolonialgebiete für Imperialismus-Einheiten
- Schaubild-Karte für Attentat Sarajevo (Balkan 1914)

Ausgabe immer als statisches Bild in `assets/images/[game-id]/`, nie als dynamische Karte.
Sparse use: max. 1–2 Karten pro Game, ausschließlich illustrativ.

---

## 8. Nicht aktiv / Niedrige Priorität

### website-downloader

**Paket:** pskill9/website-downloader
**Status:** Installiert, aktuell nicht in Deferred-Tools-Liste aktiv
**Projekt-Relevanz:** ★☆☆

Mögliche Anwendung: LehrplanPLUS-Seiten lokal spiegeln für Offline-Arbeit. Geringe Priorität — WebFetch/markdownify decken den Recherche-Bedarf bereits ab.

---

## Zusammenfassung: MCP-Integration nach Agent

| Agent | MCP-Tool | Use-Case | Phase |
|---|---|---|---|
| AGENT_INHALT | `markdownify: pdf-to-markdown` | PDF-Quellen konvertieren | 3+ |
| AGENT_INHALT | `markdownify: pptx-to-markdown` | PPTX-Quellen konvertieren | 3+ |
| AGENT_INHALT | `markdownify: docx-to-markdown` | DOCX-Quellen konvertieren | 3+ |
| AGENT_INHALT | `markdownify: youtube-to-markdown` | Dokumentarfilm-Transkripte | 3+ |
| AGENT_INHALT | `markdownify: image-to-markdown` | Gescannte Materialien | 3+ |
| AGENT_INHALT | `markdownify: webpage-to-markdown` | Web-Recherche | 3+ |
| AGENT_INHALT | `excalidraw: read_me + create_view` | Tafelbild-Extraktion (TB_*.excalidraw) | 3+ |
| AGENT_RAETSEL | `excalidraw: create_view` | Diagramme für Aufgaben-Visualisierungen | 5+ |
| AGENT_DESIGN | `wikimedia_search_images` | Historische Bilder (PD/CC) | 5+ |
| AGENT_DESIGN | `rijksmuseum: search_artwork` | Kunstwerke (themenabh.) | 5+ |
| AGENT_DESIGN | `mapbox: static_image_tool` | Historische Karten ⚠️ KOSTEN | 5+ |
| AGENT_DESIGN | `mapbox: distance` (offline) | Geografischer Kontext, kostenlos | 5+ |
| AGENT_DESIGN | `elevenlabs: text_to_speech` | Narrativ-Audio ⚠️ KOSTEN | 5+ |
| AGENT_DESIGN | `elevenlabs: text_to_sound_effects` | UI-Sounds ⚠️ KOSTEN | 5+ |
| ORCHESTRATOR | `markdownify: *` | Quelldatei-Preprocessing | 3+ |
| Export | `mcp-pandoc: convert-contents` | Lehrkraft-PDF-Export | 5+ |

---

## Kostenübersicht und Genehmigungspflichten

| Server | Kostenmodell | Regel |
|---|---|---|
| markdownify | Kostenlos | Frei verwendbar |
| mcp-pandoc | Kostenlos | Frei verwendbar |
| wikimedia-image-search | Kostenlos | Lizenzprüfung Pflicht |
| rijksmuseum | Kostenlos | Frei verwendbar |
| excalidraw | Kostenlos, kein Auth | Frei verwendbar; `read_me` immer zuerst |
| mapbox (Offline-Tools) | Kostenlos (Turf.js) | Frei verwendbar ohne Bestätigung |
| mapbox (API-Tools) | Token-basiert, kostenpflichtig | **Bestätigung vor jedem Aufruf** |
| ElevenLabs | Token-basiert, kostenpflichtig | **Bestätigung vor jedem generativen Aufruf** |
| website-downloader | Kostenlos | Niedrige Priorität |
