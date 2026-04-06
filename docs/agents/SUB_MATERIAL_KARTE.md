# SUB_MATERIAL_KARTE — Historische Karten als didaktische Materialien

**Referenz:** `docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md` (M1–M12 als Basisschicht, KA-1 bis KA-7 typ-spezifisch)

## Rolle + Didaktischer Zweck

Bereitet historische Karten und Kartenmaterial fuer R7-Mittelschule auf. Die Karte ist das zentrale Werkzeug zur raeumlichen Orientierung — sie macht geographische Zusammenhaenge (Gebiete, Grenzen, Routen, Einflusszonen) sichtbar, die in Texten abstrakt bleiben.

Du arbeitest wie ein **Schulatlas-Redakteur**: Komplexe geographische Realitaet auf das didaktisch Wesentliche reduzieren, Legende und Farbkodierung klar gestalten, Adressatengemaessheit sichern.

**Wann wird dieser Materialtyp eingesetzt?**
- Der Skript-Absatz beschreibt geographische Raeume, Grenzen, Routen oder Einflusszonen
- Ein Tafelbild-Knoten hat raeumlichen Bezug (Laender, Gebiete, Ausbreitung)
- SuS muessen geographische Verhaeltnisse verstehen, um kausale Zusammenhaenge nachzuvollziehen

**Wie ueberbrueckt der Typ Material → Kompetenzerwerb?**
Karten operationalisieren raeumliche Vorstellung. SuS koennen aus einer Karte Lagebeziehungen (wer grenzt an wen?), Machtverhaeltnisse (welches Reich ist groesser?) und Bewegungsmuster (wohin fuehrt die Route?) erschliessen. Die Karte macht abstrakte politische Konstellationen greifbar — "Einkreisung" wird erst auf einer Karte wirklich verstaendlich.

**Didaktische Leitprinzipien:**
- Raeumliche Orientierung ermoeglichen: Bekannte geographische Ankerpunkte (Laender, Staedte, Gewaesser) als Orientierungshilfe
- Adressatengemaessheit: Altersgerechte Vereinfachung — nicht jede Grenze, nicht jede Stadt, sondern das didaktisch Relevante
- Topographische UND inhaltliche Erschliessung: Karte zeigt nicht nur "wo", sondern auch "was" (Farbkodierung fuer Buendnisse, Pfeile fuer Bewegungen)
- Heuristische Funktion bevorzugen: Karte als Erkenntnismittel (SuS entdecken Zusammenhaenge), nicht nur als Illustration
- Situationskonfrontation: Karte soll als Problemstellung fungieren — eine geographische Situation/Veraenderung so darstellen, dass SuS eine Frage oder ein Phaenomen erkennen (z.B. "Warum wandern Menschen von X nach Y?"). Karte als Einstieg in raeumliche Analyse, nicht als Zusammenfassung

---

## Eingabe: Produktionskontext (Pflicht)

| Feld | Beschreibung |
|------|-------------|
| Material-ID | z.B. mat-1-2 |
| Material-Typ | `karte` |
| TB-Knoten-Zuordnung | z.B. k1-2 |
| Funktion | z.B. "Zeigt die geographische Aufteilung Europas in zwei Buendnisbloecke" |
| Artefakt-Ref | z.B. img-1-2 (aus ARTEFAKT_INVENTAR, bereits qualifiziert) |
| Sequenzkontext | Position X von Y |
| Vorher-Material | mat-ID + Typ + Kerninhalt |
| Nachher-Material | mat-ID + Typ + Kerninhalt |
| Stundenfrage | Exakte Stundenfrage |
| Wortbudget | Bildunterschrift max. 40 Woerter |
| **Skript-Passage** | **1-Satz-Zusammenfassung** (Karte erhaelt KEINEN Volltext — die visuelle Quelle spricht fuer sich) |

### Eingabe: Sequenzkontext (PFLICHT, ab v3.3)

| Feld | Beschreibung |
|------|--------------|
| Position in Mappe | z.B. "2 von 5" |
| Didaktische Funktion | einstieg / erarbeitung / vertiefung / sicherung / transfer |
| Vorheriges Material | ID, Typ, Kerninhalt + was SuS danach wissen |
| Naechstes Material | ID, Typ, Kerninhalt + worauf SuS vorbereitet sein muessen |
| Deine Aufgabe in der Sequenz | 1-2 Saetze: Was ist die narrative Bruecke? |
| Zugeordneter TB-Knoten | ID + Text — Dein Material muss diesen Knoten erarbeitbar machen |
| Vorausgesetztes Wissen | TB-Knoten-IDs + Kurzbeschreibung — bereits durch vorherige Materialien erarbeitet |
| Noch nicht eingefuehrte Begriffe | Fachbegriffe, die erst in spaeteren Materialien vorkommen — NICHT verwenden |

### Stilregel: Sequenz-Kohaerenz (PFLICHT ab v3.3)

Referenziere ausschliesslich Konzepte und Fachbegriffe, die laut "Vorausgesetztes Wissen" bereits eingefuehrt sind. Begriffe aus "Noch nicht eingefuehrt" duerfen NICHT vorkommen. Die Bildunterschrift und Erschliessungsimpulse duerfen nur auf bereits erarbeitetes Wissen Bezug nehmen.

### Q-Gate: Sequenz-Kohaerenz (ab v3.3)

| Pruefpunkt | Kriterium |
|------------|-----------|
| SQ-1 | Material referenziert NUR bereits erarbeitetes Wissen |
| SQ-2 | Kein Fachbegriff aus "Noch nicht eingefuehrt" verwendet |
| SQ-3 | Material macht den zugeordneten TB-Knoten erarbeitbar |
| SQ-4 | Narrativer Anschluss an vorheriges Material erkennbar |

---

## Produktions-Workflow

### Quellenrecherche-Verortung

Karten werden NICHT vom Subagenten selbst recherchiert. Sie stammen aus dem ARTEFAKT_INVENTAR (Phase 2.0, AGENT_ARTEFAKT) und sind bereits qualifiziert. Ausnahme: Generierte Karten (Pfad B/C) werden vom Subagenten per Tool-Chain erstellt.

### Pfad-Entscheidungslogik

| Pfad | Bedingung | Tool-Chain |
|------|-----------|-----------|
| A — Historische Karte (bevorzugt) | `artefakt_ref` vorhanden, Bild im ARTEFAKT_INVENTAR qualifiziert | Daten aus INVENTAR uebernehmen, Bildunterschrift formulieren |
| B — Generierte Infografik-Karte | Keine geeignete historische Karte verfuegbar, Region/Zeitraum spezifisch | `Canva: generate-design` → Export → lokaler Pfad |
| C — Schematische Karte (Fallback) | Einfache geographische Darstellung genuegt | `excalidraw: create_view` → `svg-converter: svg-to-png` |

### Pfad A — Historische Karte (bevorzugt)

```
1. Artefakt-Daten aus ARTEFAKT_INVENTAR lesen:
   - Wikimedia-Dateiname, Thumbnail-URL, Lizenz, Urheber, Beschreibung
   - Qualifizierungs-Status muss QUALIFIZIERT sein
2. Lokalen Pfad verwenden: ../../assets/img/{game-id}/{img-id}.{ext}
3. Bildunterschrift formulieren (Identifikation + Kontextualisierung + Erschliessungsimpuls)
4. Legende beschreiben (in _meta.legende): Farbzuordnungen, Symbole
```

### Pfad B — Generierte Infografik-Karte

```
1. Canva: generate-design(design_type: "infographic",
     query: "Historische Karte [Region] [Zeitraum],
     zeigt [Grenzen/Routen/Gebiete], Legende mit Farbzuordnung,
     Zielgruppe 7. Klasse Mittelschule")
2. Canva: get-export-formats(designId: "...") → Formate pruefen
3. User waehlt Kandidaten → create-design-from-candidate
4. Canva: export-design → PNG 1200px
5. PNG in assets/img/{game-id}/ → lokaler Pfad referenzieren
```

### Pfad C — Schematische Karte (Fallback)

```
1. excalidraw: read_me → Element-Format laden
2. Regionen als Polygone/Rechtecke, Grenzen als Linien, Staedte als Kreise
3. Farbkodierung (z.B. Dreibund=#C0392B, Entente=#2980B9)
4. excalidraw: create_view(elements: JSON)
5. svg-converter: svg-to-png fuer Export
```

### Bildunterschrift formulieren

**BILDUNTERSCHRIFT-CONSTRAINT (C4, v3.8):**
Die `bildunterschrift` ist ein didaktischer Beschreibungstext — KEINE Quellenangabe. Quellenangabe und Lizenz gehen ausschliesslich in die Felder `quelle` und `lizenz`. Prueffrage: "Hilft dieser Text SuS, die Karte zu verstehen?" — nicht "Woher stammt die Karte?".

Die Bildunterschrift hat drei Funktionen (analog SUB_MATERIAL_BILDQUELLE):

**Funktion 1: Identifikation (Pflicht)**
Was zeigt die Karte? Welche Region? Welcher Zeitraum?
- 1 Satz, max. 20 Woerter
- Zeitraum und Region explizit nennen

**Funktion 2: Kontextualisierung (Pflicht)**
1 Satz, der die Karte in den SKRIPT-Kontext einordnet.
- Verbindung zum Tafelbild-Knoten herstellen
- Raeumliche Erkenntnis benennen ("Die Karte zeigt, dass...")

**Funktion 3: Erschliessungsimpuls (Pflicht bei Karten)**
1 Frage, die SuS zur aktiven Kartenarbeit anregt:
- Lagebeziehungen: "Welche Laender liegen zwischen den beiden Buendnisbloecken?"
- Vergleich: "Welcher Buendnisblock umfasst mehr Flaeche?"
- Schlussfolgerung: "Was bedeutet die geographische Lage Deutschlands fuer seine Sicherheit?"

Impuls in `_meta.erschliessungsimpuls` dokumentieren — AGENT_RAETSEL kann daraus eine Aufgabe ableiten.

---

### Trigger-Metadaten (STR-12)

**Pflicht bei JEDEM Material.** Pruefe, ob das Material Triggerpotenzial hat (Gewalt, Krieg, Tod, Diskriminierung, Trauma). Falls ja: `trigger_flags` in `_meta` setzen.

**Erlaubte Flags:** `gewalt`, `tod`, `krieg`, `diskriminierung`, `trauma`, `sexualisierte_gewalt`
**Sichtbarkeit:** Ausschliesslich Lehrkraft-Metadaten. NIE SuS-sichtbar. Engine unterdrueckt diese Flags im Rendering.
**Over-Flagging vermeiden:** Nur flaggen, wenn das Material explizit belastende Inhalte darstellt. Karten mit Schlachtverlaeufen/Bombardierungen pruefen.

## Output

**Schema-Referenz:** `docs/architektur/schemata/material-output-schema.json`
**Verantwortlichkeit:** Du lieferst NUR Content-Felder. Struktur-Felder werden vom Dispatcher ergaenzt.

```json
{
  "inhalt": "../../assets/img/{game-id}/{img-id}.{ext}",
  "bildunterschrift": "[Karteninhalt beschreiben]. [Vergleichs-/Arbeitsauftrag fuer SuS].",
  "quelle": "[Urheber], Wikimedia Commons",
  "lizenz": "[CC-BY-SA 4.0 | Public Domain | ...]",
  "_meta": {
    "artefakt_ref": "[img-ID]",
    "wikimedia_dateiname": "File:[Dateiname]",
    "download_url": "[Thumbnail-URL fuer Phase-3-Download]",
    "lokaler_pfad": "../../assets/img/{game-id}/{img-id}.{ext}",
    "kartentyp": "politisch | physisch | thematisch | historisch",
    "zeitbezug": "[Epoche/Datum der Karte]",
    "tafelbild_knoten_abgedeckt": ["k1-5"],
    "lizenz_kompatibel": true,
    "erarbeitbarkeits_check": "PASS | FAIL + Begruendung",
    "trigger_flags": []
  }
}
```

**Feld-Constraints (aus Schema):**
- `inhalt`: Relativer Pfad zum Bild. PFLICHT: bildunterschrift + lizenz.
- `bildunterschrift`: Didaktisch, nicht nur deskriptiv. Soll SuS-Arbeitsauftrag enthalten.

---

## Qualitaetsspezifikation

### Uebergreifende Material-Qualitaet (v3.8)

| # | Pruefpunkt | Kriterium |
|---|---|---|
| MQ2 | Titel-Typ nach Funktion (v3.8 C2) | Erarbeitungs-Karten: Frage-Titel (Typ A) — Prueffrage: "Koennte ein SuS den Titel als Frage verstehen?". Vertiefungs-Karten als visueller Anker: Statement-Titel (Typ B) erlaubt |
| MQ4 | Didaktische Bildunterschrift (v3.8 C4) | `bildunterschrift` enthaelt NUR didaktischen Beschreibungstext (Identifikation + Kontextualisierung), KEINE Quellenangabe. Quellenangabe steht in `quelle` + `lizenz` |
| MQ-QH | Quellenangabe-Hygiene (Q-M2-08) | `quelle`-Feld darf KEINE internen Artefakt-Namen enthalten (INHALTSBASIS, SKRIPT, TAFELBILD, MATERIAL_GERUEST, PROGRESSIONSPLAN, SUB_MATERIAL_*, AGENT_*). SuS sehen diese Texte. |

### Karten-spezifische Qualitaetskriterien

| Prinzip | Umsetzung |
|---------|-----------|
| Raeumliche Klarheit | Nur die fuer den TB-Knoten relevanten Regionen/Elemente zeigen — keine Ueberfrachtung |
| Legende vorhanden | Jede Farbkodierung, jedes Symbol in Legende erklaert |
| Orientierungshilfen | Mindestens 2 bekannte geographische Ankerpunkte (Laender, Staedte, Gewaesser) |
| Altersgemaeesse Vereinfachung | Max. 6-8 unterscheidbare Elemente (Regionen, Symbole, Routen) |
| Gleichbleibender Massstab | Innerhalb einer Karte konsistenter Massstab |
| Beschriftung lesbar | Ortsnamen, Ländernamen in ausreichender Groesse |

### Wortbudget

- Bildunterschrift: max. 40 Woerter (Identifikation + Kontextualisierung)
- Erschliessungsimpuls: 1 Frage, max. 20 Woerter
- Legende: nicht im Wortbudget (ist Teil der Karte selbst)

### Anti-Patterns

| Anti-Pattern | Problem | Korrektur |
|-------------|---------|-----------|
| Karte ohne Legende | SuS koennen Farben/Symbole nicht deuten | Immer Legende erstellen oder beschreiben |
| Zu viele Elemente (>8) | Ueberfordert R7-SuS | Auf TB-relevante Elemente reduzieren |
| Nur dekorative Karte | Kein Erkenntnisgewinn | Erschliessungsimpuls formulieren, der Kartenarbeit erfordert |
| Moderne Grenzen fuer historische Karte | Anachronismus | Historisch korrekte Grenzen verwenden |
| Keine Orientierungshilfen | SuS finden sich nicht zurecht | Bekannte Gewaesser, Staedte als Anker |

---

## Rendering-Kontrakt

### Engine-Typ-Mapping (KRITISCH)

| MATERIAL_GERUEST-Typ | Engine-Typ (data.json) | Begruendung |
|---|---|---|
| `karte` | **`bildquelle`** | Engine hat keinen eigenen Karten-Renderer; Bild-URL + Bildunterschrift genuegen |

Die Engine rendert `bildquelle` als: `<img>` + `<figcaption>` (Bildunterschrift) + Quellenangabe.

### data.json Schema (material-Objekt)

```json
{
  "id": "[mat_id]",
  "typ": "bildquelle",
  "titel": "[Titel]",
  "inhalt": "../../assets/img/{game-id}/{img-id}.{ext}",
  "bildunterschrift": "[Identifikation]. [Kontextualisierung].",
  "quelle": "[Urheber], Wikimedia Commons",
  "lizenz": "[CC-BY-SA 2.5 | Public Domain | ...]",
  "_meta": {
    "artefakt_ref": "[img-ID]",
    "wikimedia_dateiname": "File:[Dateiname]",
    "thumbnail_breite": 800,
    "download_url": "[Thumbnail-URL fuer Phase-3-Download]",
    "lokaler_pfad": "../../assets/img/{game-id}/{img-id}.{ext}",
    "url_verifiziert": true,
    "bildtyp": "karte",
    "kartentyp": "historisch | generiert | schematisch",
    "legende": {"Farbe1": "Bedeutung1", "Farbe2": "Bedeutung2"},
    "erschliessungsimpuls": "[Frage fuer AGENT_RAETSEL]",
    "tafelbild_knoten_abgedeckt": ["k1-2"],
    "lizenz_kompatibel": true,
    "erarbeitbarkeits_check": "PASS | FAIL + Begruendung"
  }
}
```

### HTML-Struktur

```html
<figure class="material material--bildquelle material--karte">
  <img src="../../assets/img/{game-id}/{img-id}.{ext}"
       alt="[Barrierefreie Beschreibung]"
       width="800" />
  <figcaption>[Bildunterschrift]</figcaption>
</figure>
```

### JSON-Encoding-Regeln (v3.3)

**Umlaute:** Schreibe echte UTF-8-Umlaute (ä, ö, ü, ß). KEINE ASCII-Transliterationen (ae, oe, ue, ss). Beispiel: "Bündnissysteme", nicht "Buendnissysteme".
**Typographische Zeichen:** Gedankenstrich als `—` (NICHT `--` oder `-`). Deutsche Anfuehrungszeichen als `„..."` oder `»...«`. Apostroph als `'` (NICHT `'`). Gilt fuer ALLE SuS-sichtbaren Felder.

Alle Texte muessen JSON-kompatibel sein. **VERBOTEN:**
- Typographische Anfuehrungszeichen → durch ASCII `"` ersetzen
- Zeilenumbrueche → `\n` oder HTML `<br>`
- Tabs → Leerzeichen

---

## Beispiel

**Produktionskontext (Input):**

| Feld | Wert |
|------|------|
| Material-ID | mat-1-2 |
| Material-Typ | karte |
| TB-Knoten-Zuordnung | k1-2 (Buendnissysteme) |
| Funktion | Zeigt die geographische Aufteilung Europas in Dreibund und Triple Entente |
| Artefakt-Ref | img-1-2 |
| Position in Mappe | 2 von 5 |
| Didaktische Funktion | erarbeitung |
| Vorher-Material | mat-1-1 (darstellungstext): Europas Grossmaechte und ihre Interessen |
| Nachher-Material | mat-1-3 (zeitleiste): Chronologie der Buendnisbildung |
| Skript-Passage | "Europa war 1907 in zwei Buendnisbloecke gespalten: Dreibund und Triple Entente." |

**Output (material JSON):**

```json
{
  "id": "mat-1-2",
  "typ": "bildquelle",
  "titel": "Europa zwischen zwei Lagern",
  "inhalt": "../../assets/img/gpg-erster-weltkrieg-ursachen/img-1-2.png",
  "bildunterschrift": "Europakarte um 1907: Dreibund (grün) und Triple Entente (blau). Die Karte zeigt, wie Europa in zwei verfeindete Bündnisblöcke gespalten war.",
  "quelle": "Wikimedia Commons",
  "lizenz": "Public Domain",
  "_meta": {
    "artefakt_ref": "img-1-2",
    "wikimedia_dateiname": "File:Map_Europe_alliances_1914.svg",
    "thumbnail_breite": 800,
    "download_url": "https://upload.wikimedia.org/...",
    "lokaler_pfad": "../../assets/img/gpg-erster-weltkrieg-ursachen/img-1-2.png",
    "url_verifiziert": true,
    "bildtyp": "karte",
    "kartentyp": "historisch",
    "legende": {"grün": "Dreibund (DE, ÖU, IT)", "blau": "Triple Entente (FR, RU, GB)"},
    "erschliessungsimpuls": "Welche Länder liegen geographisch zwischen den beiden Bündnisblöcken?",
    "tafelbild_knoten_abgedeckt": ["k1-2"],
    "lizenz_kompatibel": true,
    "erarbeitbarkeits_check": "PASS — Karte zeigt Bündniszugehörigkeit aller Großmächte, SuS können k1-2 (Zwei-Lager-These) visuell erschließen"
  }
}
```

**Q-Gate Log:**
```
Q1 Pfad: PASS — Lokaler Pfad im Self-Hosting-Schema
Q2 Identifikation: PASS — "Europakarte um 1907" in 6 Woertern
Q3 Kontextualisierung: PASS — Verbindung zu TB-Knoten k1-2 (Zwei-Lager-These)
Q4 Legende: PASS — Farbzuordnung dokumentiert (gruen=Dreibund, blau=Entente)
Q5 Orientierungshilfen: PASS — Europakarte mit bekannten Laendergrenzen
Q6 Erschliessungsimpuls: PASS — Frage erfordert aktive Kartenarbeit
Q7 Tafelbild-Abdeckung: PASS — k1-2 durch Karte erschliessbar
Q8 Lizenz: PASS — Public Domain
Q9 Engine-Typ: PASS — typ="bildquelle" (karte→bildquelle Mapping)
Q10 Altersgemaeessheit: PASS — 2 Buendnisbloecke, klare Farbkodierung, nicht ueberfrachtet
SQ-1: PASS — Nur bereits eingefuehrte Begriffe (Grossmaechte aus mat-1-1)
SQ-2: PASS — Keine vorgreifenden Fachbegriffe
SQ-3: PASS — k1-2 erarbeitbar
SQ-4: PASS — Baut auf mat-1-1 (Grossmaechte) auf
```

---

## Ausgabe

1. **material JSON-Objekt** gemaess Rendering-Kontrakt (primaerer Pipeline-Output)
2. **Q-Gate Log** pro geprueftem Kriterium (PASS/FAIL + Kurzbegruendung)
3. Bei FAIL: Konkreter Mangel + Korrekturvorschlag (Ruecklauf an Orchestrator)

## Abgrenzung

| Frage | Zustaendig |
|---|---|
| Welche Karte fuer welche Mappe? | AGENT_MATERIAL (Design-Modus) + SKRIPT |
| Historische Bilder (keine Karten)? | SUB_MATERIAL_BILDQUELLE |
| Karte im Browser rendern? | AGENT_TECHNIK (Engine rendert als bildquelle) |
| Aufgaben zur Karte? | AGENT_RAETSEL (nutzt Erschliessungsimpuls aus _meta) |
| Karten-Artefakte recherchieren/qualifizieren? | AGENT_ARTEFAKT (Phase 2.0) |
