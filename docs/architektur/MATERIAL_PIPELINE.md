# Material-Pipeline: Vom Sicherungsbild zum Materialpool

> **SUPERSEDED (2026-03-16):** Dieses Dokument ist ein historisches Planungsdokument. Die Pipeline-Schritte S0-S4 sind vollstaendig in `WORKFLOW_v1.md` (Ebene 0-2) integriert. MCP-Tool-Zuordnungen wurden uebernommen.

**Datum:** 2026-03-15
**Designprinzip:** Backward Design (Wiggins/McTighe) — vom Lernziel rueckwaerts zum Material
**Kern-Idee:** Tafelbild = Zielzustand → Material ermoeglicht Konstruktion → Aufgaben verifizieren Konstruktion

---

## 1. Die Pipeline im Ueberblick

```
PRO MAPPE:

[S0] SICHERUNGSBILD (Tafelbild)
 │   Was sollen SuS am Ende wissen/koennen?
 │   → excalidraw: Konzepte + Zusammenhaenge als visuelles Netz
 │
 ▼
[S1] MATERIALPOOL-ENTWURF
 │   Fuer jeden Knoten/jede Verbindung im Tafelbild:
 │   Welches Material ermoeglicht Verstaendnis?
 │   → User-Review + Freigabe
 │
 ▼
[S2] MATERIAL-BESCHAFFUNG + PRODUKTION
 │   Quellen recherchieren, Texte schreiben, Bilder suchen,
 │   Infografiken generieren, Diagramme bauen
 │   → MCP-Tools: wikimedia, Canva, excalidraw, markdownify, Miro
 │
 ▼
[S3] AUFGABEN-DESIGN
 │   Bruecke zwischen Material und Sicherungsbild:
 │   Jede Aufgabe testet, ob ein Tafelbild-Knoten verstanden wurde
 │   → material_referenz verknuepft Aufgabe mit Quelle
 │
 ▼
[S4] INTEGRATION + ARRANGEMENT
     Alles zusammenfuehren: Einstieg → Material → Aufgaben → Sicherung
     → data.json befuellen oder Miro-Board arrangieren
```

---

## 2. Schritt S0: Sicherungsbild (Tafelbild)

### Was ist das Sicherungsbild?

Das Tafelbild repraesentiert den **Zielzustand** des Lernens in dieser Mappe. Es zeigt:
- **Kernkonzepte** als Knoten (Rechtecke/Kreise)
- **Zusammenhaenge** als beschriftete Pfeile (Ursache→Wirkung, Teil→Ganzes, zeitlich)
- **Hierarchie**: vom zentralen Konzept zu den Details

Es ist das, was eine Lehrkraft am Ende der Stunde an die Tafel schreiben wuerde — die strukturierte Zusammenfassung des Gelernten.

### Warum zuerst?

Weil es die gesamte Mappe steuert:
- Jedes Material muss auf mindestens einen Knoten/eine Verbindung im Tafelbild hinarbeiten
- Jede Aufgabe muss pruefen, ob ein Knoten/eine Verbindung verstanden wurde
- Material ohne Tafelbild-Bezug ist irrelevant; Aufgaben ohne Material-Bezug sind unloesbar

### Tool: excalidraw

```
1. excalidraw: read_me → Element-Format-Spec laden
2. Konzepte + Verbindungen als JSON-Element-Array konstruieren
3. excalidraw: create_view → Tafelbild rendern
4. User reviewt: Stimmt die Struktur? Fehlt etwas? Zu viel?
5. Iteration bis Freigabe
```

### Beispiel: Mappe 1 "Pulverfass Europa"

Tafelbild-Knoten:
```
[Pulverfass Europa] ←── zentrales Konzept
    │
    ├── [Dreibund 1882]
    │       ├── Deutschland
    │       ├── Oesterreich-Ungarn
    │       └── Italien
    │
    ├── [Triple Entente 1894-1907]
    │       ├── Frankreich
    │       ├── Grossbritannien
    │       └── Russland
    │
    ├── [Imperialismus]
    │       └── "Wettlauf um Kolonien"
    │
    ├── [Nationalismus]
    │       └── "uebersteigerte Vaterlandsliebe"
    │
    └── [Buendnispolitik]
            └── "Kettenreaktion moeglich"
```

Verbindungen:
- Imperialismus + Nationalismus → verschaerfen Rivalitaeten
- Rivalitaeten → fuehren zu Buendnissen
- Zwei Buendnisbloecke → "ein Funke genuegt"

### Dual Use des Tafelbilds

1. **Im Prozess (S0):** Steuert Material- und Aufgabendesign
2. **Im Game (Sicherung):** Wird am Ende der Mappe angezeigt — SuS sehen die Struktur dessen, was sie gerade erarbeitet haben. Das excalidraw-Bild wird als SVG/PNG in die Sicherungs-Section eingebettet.

---

## 3. Schritt S1: Materialpool-Entwurf

### Methode: Tafelbild-Knoten → Material-Mapping

Fuer jeden Knoten und jede Verbindung im Tafelbild wird bestimmt:
1. **Welche Information brauchen SuS**, um diesen Knoten zu verstehen?
2. **Welcher Material-Typ** eignet sich am besten?
3. **Welche Quelle** liefert diese Information?

### Material-Typ-Auswahllogik

| Wenn der Knoten... | Dann Material-Typ | Begruendung |
|---|---|---|
| Geografisch ist (Laender, Gebiete, Routen) | `karte` oder `bildquelle` | Raeumliches Verstaendnis braucht Visualisierung |
| Chronologisch ist (Abfolge, Zeitraum) | `zeitleiste` | Zeitliche Struktur braucht Ordnung |
| Ein abstraktes Konzept ist (Imperialismus, Nationalismus) | `darstellungstext` | Braucht Erklaerung auf SuS-Niveau |
| Eine persoenliche Erfahrung betrifft | `tagebuch` oder `quellentext` | Personifizierung schafft Empathie/Zugang |
| Daten/Zahlen enthaelt | `statistik` | Tabelle oder Diagramm fuer Klarheit |
| Ein Propaganda-/Medienelement ist | `bildquelle` | Historische Originalquelle als Analyseobjekt |
| Eine Ursache-Wirkung-Beziehung ist | `darstellungstext` + Tafelbild-Ausschnitt | Kausalitaet braucht Erklaerung + Visualisierung |

### Mindest-Materialien pro Mappe

- **1 Darstellungstext** (Basisinformation, Sachtext auf Schulbuch-Niveau)
- **1 Quellentext ODER Bildquelle** (historische Quelle — Authentizitaet)
- **1 personifiziertes Material** (Tagebuch, Brief, Augenzeugenbericht — Empathie)
- **1 visuelles Material** (Karte, Zeitleiste, Diagramm — Struktur)

= Minimum 4 Materialien pro Mappe, idealerweise 5-6.

### User-Abstimmung (Pflicht)

Bevor irgendein Material ausgearbeitet wird:

```
AGENT_MATERIAL erstellt pro Mappe:
┌────────────────────────────────────────────────┐
│ Material-Entwurf Mappe 1: Pulverfass Europa    │
│                                                │
│ M1.1 [darstellungstext] Europas Grossmaechte   │
│      → erklaert Buendnissysteme                │
│      → Quelle: AGENT schreibt                  │
│                                                │
│ M1.2 [karte] Europa 1914 mit Buendnislinien   │
│      → Dreibund rot, Entente blau              │
│      → Quelle: wikimedia ODER excalidraw SVG   │
│                                                │
│ M1.3 [quellentext] Pressezitat 1914            │
│      → zeitgenoessische Perspektive            │
│      → Quelle: Schulbuch/Recherche             │
│                                                │
│ M1.4 [zeitleiste] Buendnisbildung 1882-1907    │
│      → 4 Stationen                             │
│      → Engine-Renderer aus JSON                │
│                                                │
│ [Optional] M1.5 [tagebuch] Fiktiver Diplomat   │
│      → "Alle ruesten auf, niemand spricht..."  │
│      → AGENT schreibt                          │
└────────────────────────────────────────────────┘

User: "M1.2 will ich als richtige Europakarte, nicht als Skizze.
       M1.5 finde ich gut, nehmen wir rein.
       Habt ihr auch was von Bismarck zur Buendnispolitik?"

→ Entwurf wird angepasst, dann Freigabe, dann Ausarbeitung.
```

---

## 4. Schritt S2: Material-Beschaffung + Produktion

### MCP-Tool-Zuordnung nach Material-Typ

| Material-Typ | Primaer-Tool | Sekundaer-Tool | Ablauf |
|---|---|---|---|
| `darstellungstext` | AGENT_MATERIAL schreibt | — | Basierend auf Inhalt-MD, SuS-gerecht formuliert, max. 150 Woerter |
| `quellentext` | markdownify: `webpage-to-markdown` | Manuelle Recherche | Historische Quelle suchen, korrekt zitieren, ggf. in SuS-Sprache paraphrasieren |
| `bildquelle` | `wikimedia_search_images` | `rijksmuseum: search_artwork` | Suchbegriff → Lizenz pruefen → Bildunterschrift + Quellennachweis |
| `karte` | Canva: `generate-design` (infographic) | excalidraw: `create_view` | Canva fuer polierte Karten, excalidraw fuer schnelle Skizzen |
| `zeitleiste` | excalidraw: `create_view` | Engine-Renderer (JSON) | Einfache Zeitleisten als JSON (Engine rendert), komplexe als excalidraw SVG |
| `statistik` | Canva: `generate-design` (infographic) | HTML `<table>` | Canva fuer visuell ansprechende Charts, Tabelle als Fallback |
| `tagebuch` | AGENT_MATERIAL schreibt | — | Fiktiv aber historisch plausibel, persoenliche Perspektive, R7-Niveau |

### Canva-Workflow fuer Infografiken/Karten

```
1. Canva: generate-design
   → design_type: "infographic"
   → query: "Europakarte 1914 mit zwei Buendnissystemen:
      Dreibund (Deutschland, Oesterreich-Ungarn, Italien) in Rot
      und Triple Entente (Frankreich, Grossbritannien, Russland) in Blau.
      Stil: historisch, Schulbuch-artig, klare Beschriftung auf Deutsch.
      Fuer Schueler der 7. Klasse."
2. User waehlt Kandidaten
3. Canva: create-design-from-candidate → Design-ID
4. Canva: export-design → PNG (1200px Breite)
5. PNG in assets/images/[game-id]/ ablegen
6. In data.json materialien[] referenzieren
```

### wikimedia-Workflow fuer historische Bilder

```
1. wikimedia_search_images("Europa Buendnisse 1914 Karte")
2. Ergebnisse sichten → CC0/PD bevorzugen
3. Bildunterschrift + Lizenz dokumentieren
4. URL in data.json materialien[].inhalt
5. Eintrag in docs/ASSET_LIZENZEN.md
```

### excalidraw-Workflow fuer Diagramme/Tafelbilder

```
1. excalidraw: read_me → Element-Spec
2. Konzept-Knoten als Rechtecke, Verbindungen als Pfeile
3. Farbkodierung: Dreibund=#C0392B, Entente=#2980B9
4. excalidraw: create_view → interaktive Ansicht
5. Screenshot/Export als SVG
6. In assets/images/[game-id]/ oder inline als SVG
```

---

## 5. Schritt S3: Aufgaben-Design (Bruecke Material → Tafelbild)

### Grundprinzip

Jede Aufgabe testet, ob ein spezifischer Tafelbild-Knoten oder eine Tafelbild-Verbindung durch das Material verstanden wurde.

```
Tafelbild-Knoten: [Dreibund 1882] ← Deutschland, OeU, Italien
Material M1.1:    Sachtext erklaert die drei Mitglieder
Material M1.2:    Karte zeigt Dreibund-Laender rot
Aufgabe 1-1:      "Ordne die Laender dem richtigen Buendnis zu"
                  material_referenz: "mat-1-1" + "mat-1-2"
```

### Mapping-Tabelle (pro Mappe ausfuellen)

| Tafelbild-Knoten | Material-ID | Aufgabe-ID | Aufgabentyp | material_referenz |
|---|---|---|---|---|
| Dreibund-Mitglieder | mat-1-1, mat-1-2 | aufgabe-1-1 | zuordnung | mat-1-1 |
| Entente-Mitglieder | mat-1-1, mat-1-2 | aufgabe-1-1 | zuordnung | mat-1-2 |
| Chronologie Buendnisse | mat-1-4 | aufgabe-1-3 | reihenfolge | mat-1-4 |
| Imperialismus-Begriff | mat-1-1 | aufgabe-1-4 | lueckentext | mat-1-1 |
| Buendnispolitik-Konzept | mat-1-1, mat-1-5 | aufgabe-1-5 | freitext-code | mat-1-1 |

### Aufgaben-Reihenfolge folgt Material-Reihenfolge

Die Aufgaben erscheinen in der Reihenfolge, in der das zugehoerige Material in der Mappe steht. SuS lesen Material → beantworten Frage → naechstes Material → naechste Frage. Kein Block-Schema mehr (erst alle Materialien, dann alle Fragen), sondern **verschraenktes Erarbeiten und Sichern**.

### Tipp-Design (verschaerft)

Da jede Aufgabe ein material_referenz hat:
- **Stufe 1:** Fragestellung reformulieren, Kontext klaren
- **Stufe 2:** "Schau dir [Material-Titel] nochmal an — dort findest du die Antwort"
- **Stufe 3:** Fachliche Erklaerung, die zur Ableitung fuehrt — NIEMALS die Loesung explizit

---

## 6. Schritt S4: Integration + Arrangement

### Option A: Direkt in data.json (v1-Standard)

Materialien als JSON in `data.json → mappen[].materialien[]`. Engine rendert sie in der Mappe.

**Vorteile:** Kein externer Dienst noetig, offline-faehig, volle Kontrolle
**Nachteile:** Weniger visuell flexibel, kein freies Zoomen/Scrollen

### Option B: Miro-Board pro Mappe (v1.5/Phase 5)

Miro-Board mit allen Materialien raeumlich arrangiert. In der Mappe als `<iframe>` eingebettet. Daneben die Aufgaben.

**Miro-Workflow:**
```
1. miro: create-board → "WK1 Mappe 1: Pulverfass Europa"
   → sharingPolicy: "view" (SuS koennen nur anschauen)
2. miro: create-frame → "Materialpool"
3. Fuer jedes Material:
   - Bildquelle: miro: create-image-item-using-url
   - Textquelle: miro: create-text-item
   - Zeitleiste: miro: create-sticky-note-item (mehrere, angeordnet)
4. Miro-Board-URL in data.json referenzieren
5. Engine rendert <iframe> in der Material-Section
```

**Vorteile:** Freies Zoomen/Scrollen, "alte" Materialien (Scans, Arbeitsblatter) integrierbar, visuell ansprechend
**Nachteile:** Online-Abhaengigkeit, Miro-Account noetig, DSGVO-Pruefung erforderlich, Klassenraum-WLAN muss stabil sein

### Empfehlung: A fuer v1, B als iterative Erweiterung

Option A ist in v1 implementierbar ohne Abhaengigkeiten. Option B wird als Post-v1-Enhancement geplant, sobald A funktioniert und getestet ist.

---

## 7. Gesamtprozess als Standardisierte Pipeline

### Pre-Pipeline (einmalig pro Game)

1. Themen-Briefing existiert (aus Cowork)
2. Inhalts-MDs existieren (von AGENT_INHALT)
3. Didaktischer Rahmen existiert (von AGENT_DIDAKTIK)

### Pipeline pro Mappe (4x fuer Game 1)

| Schritt | Wer | Tool | Output | User-Interaktion |
|---|---|---|---|---|
| S0.1 | AGENT_MATERIAL | excalidraw: `create_view` | Tafelbild-Entwurf als Excalidraw-Diagramm | User reviewt Tafelbild |
| S0.2 | User | — | Tafelbild freigegeben / korrigiert | Pflicht |
| S1.1 | AGENT_MATERIAL | — (Analyse) | Material-Entwurf (Typ + Titel + 1-Satz pro Material) | User reviewt Entwurf |
| S1.2 | User | — | Material-Entwurf freigegeben + eigene Quellen ergaenzt | Pflicht |
| S2.1 | AGENT_MATERIAL | wikimedia, Canva, excalidraw, markdownify | Recherchierte/generierte Materialien | Sichtung bei Canva/Bildern |
| S2.2 | AGENT_MATERIAL | — (Schreiben) | Darstellungstexte, Tagebucheintraege, Quellenparaphrasen | — |
| S3.1 | AGENT_RAETSEL | — | Aufgaben mit material_referenz + Tafelbild-Knoten-Mapping | — |
| S3.2 | AGENT_RAETSEL | — | Tipps (3 Stufen, materialbasiert) | — |
| S4.1 | AGENT_RAETSEL | — | data.json-Abschnitt fuer diese Mappe (vollstaendig) | — |
| S4.2 | AGENT_MATERIAL | excalidraw: `create_view` | Tafelbild als SVG/PNG fuer Sicherungs-Section | — |

### Qualitaets-Gate pro Mappe (vor naechster Mappe)

Checkliste:
- [ ] Tafelbild vorhanden und vom User freigegeben?
- [ ] Mindestens 4 Materialien (1 Text, 1 Quelle/Bild, 1 personifiziert, 1 visuell)?
- [ ] Jeder Tafelbild-Knoten wird durch mindestens 1 Material abgedeckt?
- [ ] Jede Aufgabe hat eine material_referenz?
- [ ] Alle Aufgaben sind ausschliesslich aus dem Material loesbar?
- [ ] Tipps verweisen auf Material, verraten keine Loesungen?
- [ ] Reihenfolge-Aufgaben enthalten keine Zeitangaben in Optionen?
- [ ] Freitext-Aufgaben: Antwort ist aus Material eindeutig ableitbar?

---

## 8. Didaktische Verankerung: UE-Phasenstruktur pro Mappe

Die Pipeline produziert Material, das in der Mappe nach GPG-UE-Phasen angeordnet wird:

### Phase 1: Einstieg / Motivation (data.json: `einstieg`)

**Zweck:** Handlungssituation schaffen, Dringlichkeit erzeugen, an Vorwissen anknuepfen
**Im Escape-Game:** Narrativ-Fortschreibung ("Reporter erhaelt neuen Hinweis...")
**Material:** Kein Erarbeitungsmaterial, nur Narrativ + Problemfrage
**Beispiel Mappe 1:** "Du triffst einen alten Diplomaten im Cafe. Er murmelt: 'Europa ist ein Pulverfass — ein Funke genuegt.' Was meint er damit? Recherchiere in deinen Unterlagen."

### Phase 2: Erarbeitung (data.json: `materialien` + `aufgaben`)

**Zweck:** SuS erschliessen Inhalte selbststaendig anhand von Material
**Im Escape-Game:** Material-Aufgaben-Verschraenkung
**Ablauf:**
```
Material M1.1 (Sachtext: Europas Maechte)
  → Aufgabe 1-1 (Zuordnung: Laender → Buendnisse)
Material M1.2 (Karte Europa 1914)
  → Aufgabe 1-2 (MC: Unterschied Dreibund/Entente)
Material M1.4 (Zeitleiste Buendnisse)
  → Aufgabe 1-3 (Reihenfolge: Buendnisbildung)
Material M1.1 + M1.3 (Sachtext + Pressezitat)
  → Aufgabe 1-4 (Lueckentext: Zusammenfassung)
Material M1.5 (Tagebuch Diplomat)
  → Aufgabe 1-5 (Freitext: Buendnispolitik)
```

### Phase 3: Sicherung (data.json: `sicherung`)

**Zweck:** Gelerntes strukturieren, Transfer vorbereiten
**Im Escape-Game:** Tafelbild anzeigen + Zusammenfassung + Code-Reveal + Ueberleitung
**Material:** Tafelbild (excalidraw SVG), 2-3 Saetze Zusammenfassung
**Beispiel Mappe 1:** Tafelbild "Pulverfass Europa" + "Du hast herausgefunden: Europa war in zwei Buendnisbloecke gespalten. Jetzt fehlt nur noch der Funke..." + Code BUND → weiter zu Mappe 2

---

## 9. Zusammenfassung: Verfuegbare MCP-Tools im Pipeline-Kontext

| Pipeline-Schritt | Tool | Funktion | Kosten |
|---|---|---|---|
| S0 Tafelbild | excalidraw: `create_view` | Konzeptkarte/Tafelbild als Diagramm | Kostenlos |
| S2 Bilder | `wikimedia_search_images` | Historische Fotos, Karten (PD/CC) | Kostenlos |
| S2 Bilder | rijksmuseum: `search_artwork` | Kunstwerke, hist. Darstellungen | Kostenlos |
| S2 Infografiken | Canva: `generate-design` (infographic) | Polierte Karten, Schaubilder, Poster | Canva-Konto |
| S2 Diagramme | excalidraw: `create_view` | Schnelle Skizzen, Zeitleisten | Kostenlos |
| S2 Recherche | markdownify: `webpage-to-markdown` | Webseiten als Markdown | Kostenlos |
| S2 Recherche | markdownify: `youtube-to-markdown` | Video-Transkripte | Kostenlos |
| S2 Recherche | markdownify: `pdf-to-markdown` | PDF-Quellen konvertieren | Kostenlos |
| S4 Arrangement | Miro: `create-board` + Items | Raeumliches Material-Arrangement | Miro-Konto |
| S4 Export | Canva: `export-design` (PNG) | Infografiken als Bilddateien | Canva-Konto |
| Post-v1 Audio | ElevenLabs: `text_to_speech` | Narrativ-Vertonung | Kostenpflichtig |
| Post-v1 Karten | mapbox: `static_image_tool` | Geographische Karten | Kostenpflichtig |
