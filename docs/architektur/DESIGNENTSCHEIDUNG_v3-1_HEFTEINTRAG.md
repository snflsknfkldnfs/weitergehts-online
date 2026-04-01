# Designentscheidung v3.1: Hefteintrag-Darstellung

**Datum:** 2026-03-28
**Status:** Entwurf — wartet auf User-Entscheidung
**Ausloeser:** SVG-Tafelbild-Rendering qualitativ unbrauchbar (ueberlappende Labels, kein erkennbares Ordnungsmuster, didaktisch wertlos)

---

## 1. Problemdiagnose

### 1.1 Screenshot-Befund (Mappe 1, Live-Website)

- SVG-Auto-Layout quetscht 5 von 7 Knoten in eine Zeile
- 4 Verbindungslabels ueberlagern sich im Zentrum (unlesbar)
- Kein erkennbares didaktisches Ordnungsmuster (kausal, kategorial, chronologisch)
- 7 separate Bloecke in der Sicherung: SVG + Merksaetze + Kernerkenntnisse + Hefteintrag-Verweis + Zusammenfassung + Ueberleitung + Reflexionsimpuls → Informations-Ueberflutung

### 1.2 Vergleich mit Praxis-Tafelbildern (GUETEKRITERIEN_TAFELBILD.md)

Die 8 Excalidraw-TBs aus Silas' 1.WK-Sequenz zeigen:
- Handschriftlicher Charakter, raeumliche Tafelteilung (Haupttafel + Seitentafel)
- Ordnungsmuster: Kausalketten (50%), Kategoriengliederung (37,5%), chronologisch (12,5%)
- 60% Saetze, 40% Schlagwoerter — Merksaetze in 6/8 TBs
- Durchschnitt 9,25 Elemente, max. 10 empfohlen

Der SVG-Renderer kann keines dieser Muster abbilden. Er erzeugt immer denselben Netzwerk-Graphen, unabhaengig vom Ordnungsmuster.

---

## 2. Optionen-Bewertung

### Option A: SVG-Layout-Algorithmus verbessern (Force-directed, hierarchisch)

- **Pro:** Bleibt innerhalb der bestehenden Architektur, kein neues Rendering noetig
- **Contra:** Netzwerk-Graphen sind kein didaktisches Format. Verbessert Layout, nicht Konzept. Ueberlappungsproblem reduziert, aber nicht geloest (bei 7+ Knoten mit Labels unvermeidlich)
- **Aufwand:** Mittel (JS-Algorithmus-Rewrite)
- **Empfehlung:** Nicht empfohlen als Primaerloesung

### Option B: Excalidraw-Integration

- **Pro:** Handgezeichneter Look, hohe didaktische Qualitaet, entspricht Praxis-TBs
- **Contra:** Kein headless-API fuer automatische Generierung. Muesste pro Mappe manuell erstellt werden oder ein JSON-zu-Excalidraw-Konverter geschrieben werden. Excalidraw-Dateien sind komplex (Positions-/Stil-Daten pro Element)
- **Aufwand:** Hoch (Konverter-Entwicklung oder manuelle Erstellung)
- **Empfehlung:** Post-MVP — wenn ein Excalidraw-zu-SVG-Konverter existiert

### Option C: Canva-MCP-generiertes Bild

- **Pro:** Professionelles Design, Print-optimiert
- **Contra:** Nicht deterministisch (Design variiert), Pro-Mappe ein API-Call, kein programmatischer Zugriff auf Knoten-Positionen, Abhaengigkeit von externem Dienst
- **Aufwand:** Mittel (Canva-API-Integration)
- **Empfehlung:** Nicht empfohlen — Abhaengigkeit, Determinismus-Problem

### Option D: CSS-Hefteintrag (EMPFOHLEN)

- **Pro:**
  - Reines HTML/CSS, kein externes Tool noetig
  - Aus JSON-Daten generierbar (deterministisch, skalierbar)
  - Print-optimiert (Schueler koennen ausdrucken und einkleben)
  - Didaktisch korrekt: Bildet den echten Hefteintrag ab, nicht einen abstrakten Graphen
  - Ordnungsmuster durch Layout-Varianten darstellbar (Tabelle fuer Gegenueber-stellung, Einrueckungen fuer Kausalketten, Spaltenlayout fuer Kategorien)
  - Responsive und barrierfrei
  - Handschrift-Feeling via Google Font (z.B. "Caveat", "Patrick Hand") oder System-Serif
- **Contra:** Weniger "visuell beeindruckend" als Graph oder Excalidraw — aber naeher an der Unterrichtspraxis
- **Aufwand:** Mittel (neuer Renderer + CSS)
- **Empfehlung:** PRIMAERE LOESUNG

### Option E: Hybrid (CSS-Hefteintrag + vereinfachtes Mini-Diagramm)

- **Pro:** Hefteintrag als Primaer-Darstellung, optionales Mini-SVG (3-5 Kern-knoten, keine Labels auf Verbindungen) als Strukturuebersicht
- **Contra:** Zusaetzliche Komplexitaet
- **Aufwand:** Mittel-Hoch
- **Empfehlung:** Als v3.2-Erweiterung, nicht im ersten Schritt

---

## 3. Empfohlene Loesung: CSS-Hefteintrag

### 3.1 Konzept

Die Sicherung rendert **einen einzigen, druckfertigen Hefteintrag** statt 7 separater Bloecke. Der Hefteintrag sieht aus wie eine Heftseite: linierte/karierte Hintergrundoptik, klare typographische Hierarchie, visuelle Strukturelemente (Pfeile, Trennlinien, Einrueckungen).

### 3.2 Hefteintrag-Aufbau (generisch)

```
┌─────────────────────────────────────────────┐
│  TITEL (= Mappe-Titel)                      │
│  ─────────────────────────────────────────── │
│                                              │
│  [Ordnungsmuster-spezifisches Layout:]       │
│                                              │
│  Variante KAUSAL:                            │
│    Ursache₁ ──→ Wirkung₁                    │
│    Ursache₂ ──→ Wirkung₂                    │
│         ↓                                    │
│    Ergebnis                                  │
│                                              │
│  Variante KATEGORIAL:                        │
│    ┌─────────┐  ┌─────────┐                  │
│    │ Kat A   │  │ Kat B   │                  │
│    │ • Punkt │  │ • Punkt │                  │
│    │ • Punkt │  │ • Punkt │                  │
│    └─────────┘  └─────────┘                  │
│                                              │
│  Variante CHRONOLOGISCH:                     │
│    1879 ─── Zweibund                         │
│    1882 ─── Dreibund                         │
│    1894 ─── Franzoesisch-russisch            │
│    ...                                       │
│                                              │
│  ─────────────────────────────────────────── │
│  MERKSATZ (fett, zentriert)                  │
│  "Europa war vor 1914 ein Pulverfass..."     │
│                                              │
│  ? Reflexionsfrage (kursiv)                  │
└─────────────────────────────────────────────┘
```

### 3.3 Mapping JSON → Hefteintrag

| JSON-Feld | Hefteintrag-Element |
|-----------|-------------------|
| `tafelbild.knoten[].text` | Strukturelemente im Layout |
| `tafelbild.knoten[].typ` | Bestimmt Position und Styling (kernbegriff = Titel/Zentrum, ursache = links, wirkung = rechts etc.) |
| `tafelbild.knoten[].merksatz` | Kontextuelle Erlaeuterung, eingebettet oder als Tooltip |
| `tafelbild.verbindungen[].label` | Pfeil-Beschriftungen im Layout |
| `kernerkenntnisse[]` | Abschliessende Stichpunkte vor dem Merksatz |
| `sicherung.zusammenfassung` | ENTFAELLT — wird durch Hefteintrag ersetzt |
| `sicherung.hefteintrag_verweis` | ENTFAELLT — der Hefteintrag IST die Darstellung |
| `sicherung.reflexionsimpuls` | Reflexionsfrage am Ende |
| `sicherung.ueberleitung` | Ueberleitung nach dem Hefteintrag (ausserhalb der "Heft-Box") |

### 3.4 Ordnungsmuster-Erkennung

Das JSON enthaelt bereits genug Information, um das Ordnungsmuster zu erkennen:

| Muster | Erkennungsregel |
|--------|----------------|
| **Kausal** | Verbindungen bilden gerichtete Ketten (A→B→C). Labels enthalten "fuehrt zu", "verschaerft", "erzwingt" etc. |
| **Kategorial** | Mehrere Knoten mit typ="kategorie", die unabhaengig auf einen Kernbegriff zeigen |
| **Chronologisch** | Knoten enthalten Jahreszahlen oder Daten |
| **Gegenueberstellung** | Genau 2 Kategorien mit symmetrischen Verbindungen |

Die Engine kann beim Rendern pruefen, welches Muster vorliegt, und das passende Layout waehlen. Fallback: kategorial (Stichpunkte mit Einrueckungen).

### 3.5 Neues `ordnungsmuster`-Feld (optional)

Alternativ: AGENT_TAFELBILD setzt explizit `"ordnungsmuster": "kausal"|"kategorial"|"chronologisch"|"gegenueberstellung"` im JSON. Das vermeidet Heuristiken in der Engine.

---

## 4. Aenderungen gegenueber v3.0

### 4.1 Was entfaellt

- SVG-Tafelbild-Renderer (`_renderTafelbild`, `_renderTafelbildKnoten`) wird nicht mehr als Primaer-Darstellung genutzt (kann optional erhalten bleiben als "Strukturansicht")
- Separate Bloecke: Merksaetze-Liste, Kernerkenntnisse-Liste, Hefteintrag-Verweis → alles integriert in den Hefteintrag
- `zusammenfassung`-Feld wird vom Hefteintrag absorbiert

### 4.2 Was sich aendert

| Komponente | v3.0 | v3.1 |
|-----------|------|------|
| Sicherungs-Darstellung | SVG-Graph + 6 Text-Bloecke | 1 CSS-Hefteintrag + Ueberleitung |
| Render-Funktion | `_renderTafelbild()` (SVG) | `_renderHefteintrag()` (HTML/CSS) |
| Print-Ausgabe | SVG + Text | Druckfertiger Hefteintrag |
| JSON-Schema | Unveraendert | + `ordnungsmuster` (optional) |
| AGENT_TAFELBILD | Unveraendert | + Ordnungsmuster-Bestimmung |
| theme-gpg.css | SVG-Variablen + Sicherungs-Bloecke | `.hefteintrag`-Komponentenbibliothek |

### 4.3 Was bleibt

- JSON-Datenstruktur (knoten, verbindungen, merksatz, kernerkenntnisse)
- AGENT_TAFELBILD Workflow und Q-Gate (G1-G13)
- TB-FREEZE-Governance
- Abwaertskompatibilitaet (alter Sicherungs-Renderer als Fallback)

---

## 5. Umsetzungsplan

### Phase v3.1-1: Design + Prototyp (Cowork)

1. CSS-Hefteintrag-Prototyp als statische HTML-Datei erstellen (Mappe 1 als Testdaten)
2. 3 Layout-Varianten implementieren: kausal, kategorial, Fallback
3. Print-Stylesheet testen
4. User-Review: Entspricht das dem gewuenschten "Heft-Look"?

### Phase v3.1-2: Engine-Integration (Claude Code)

1. `_renderHefteintrag()` in escape-engine.js
2. `_renderSicherung()` umbauen: Hefteintrag statt SVG + Bloecke
3. theme-gpg.css: Hefteintrag-Styles
4. Abwaertskompatibilitaet: Wenn kein `ordnungsmuster`, Fallback auf kategorial

### Phase v3.1-3: Agenten-Update (Cowork)

1. AGENT_TAFELBILD: `ordnungsmuster`-Feld in Output-Schema
2. GUETEKRITERIEN: G-Kriterium fuer Ordnungsmuster-Wahl
3. WORKFLOW_v2.md: Sicherungs-Schema aktualisieren

### Phase v3.1-4: Validierung

1. Mappe 1 mit neuem Renderer laden
2. Print-Test (Ctrl+P)
3. Vergleich: Neuer Hefteintrag vs. Excalidraw-Referenz-TBs aus der Empirie

---

## 6. Entscheidungen (2026-03-28)

| Frage | Entscheidung |
|-------|-------------|
| Primaerdarstellung | **Option D (CSS-Hefteintrag)** — alleinig, kein Hybrid |
| Layout-Variante | **Variante A (kausal)** mit 4 Modifikationen (siehe unten) |
| Schrift | **Caveat (Handschrift)** fuer Titel/Fachbegriffe, **Patrick Hand** fuer Fliesstext |
| Hintergrund | **Liniert** mit rotem Heftrand und Lochung |
| Ordnungsmuster | **Explizites JSON-Feld** (`ordnungsmuster`) + SCPL-Struktur |
| Strukturrahmen | **SCPL-Framework** (Situation-Complication-Problem-Loesung) als Leitstruktur |

### 6.1 Variante-A-Modifikationen (User-Feedback)

1. **Stundenfrage als Titel:** Problemorientierte, schuelernahe Frage statt Themenname. Merksaetze sind die qualifizierte Antwort.
2. **Raeumliche Struktur:** Oben: Ausgangslage/Situation. Mitte: Vertikaler Argumentationsfluss mit horizontalen Fachbegriff-Verankerungen rechts. Unten: Merkbox.
3. **Merkbox:** Visuell abgehobener Kasten (Rahmen + Label "Merke") statt einfacher blauer Leiste.
4. **Transfer:** Fragestellung/Motivation zum Fortschreiten in der Sequenz (naechste UE/Mappe).

### 6.2 SCPL-Integration

Vollstaendige Evaluation: `docs/architektur/EVALUATION_SCPL_HEFTEINTRAG.md`

Kernaussage: SCPL bildet kein kuenstliches Zwangsmuster, sondern beschreibt die Struktur, die gute Hefteintraege ohnehin zeigen (7/8 empirische TBs mappbar). Es wird als Leitstruktur fuer AGENT_TAFELBILD uebernommen mit neuem `scpl`-Objekt im JSON-Schema.

### 6.3 Revidierter Prototyp

Datei: `docs/analyse/PROTOTYP_HEFTEINTRAG_v3-1_rev2.html`

---

## 7. Revidierter Umsetzungsplan

### Phase v3.1-1: Design + Prototyp (Cowork) — ABGESCHLOSSEN

1. ~~CSS-Hefteintrag-Prototyp mit 3 Varianten~~ (rev1)
2. ~~User-Review: Variante A gewaehlt + 4 Modifikationen~~
3. ~~Revidierter Prototyp (rev2) mit SCPL-Struktur~~
4. ~~SCPL-Evaluation erstellt~~
5. **OFFEN:** User-Validierung von rev2

### Phase v3.1-2: Schema-Finalisierung (Cowork)

1. JSON-Schema mit `scpl`-Objekt finalisieren
2. AGENT_TAFELBILD.md aktualisieren (SCPL-Output, G14-Kriterium, Stundenfrage-Pflicht)
3. GUETEKRITERIEN_TAFELBILD.md: G14 ergaenzen
4. WORKFLOW_v2.md: Sicherungs-Schema aktualisieren

### Phase v3.1-3: Engine-Integration (Claude Code via Uebergabe-Prompt)

1. `_renderHefteintragSCPL()` als neuer Renderer
2. `_renderSicherung()` Routing: scpl → Legacy → Fallback
3. theme-gpg.css: SCPL-Zonen-Styles
4. data.json Mappe 1: Migration auf scpl-Schema

### Phase v3.1-4: Validierung

1. Mappe 1 mit neuem Renderer laden
2. Print-Test
3. Vergleich mit Prototyp rev2
