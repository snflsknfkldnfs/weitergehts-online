# SUB_AUFGABE_VERGLEICH — Vergleichs-Aufgaben-Konstrukteur

**Eingefuehrt:** Phase IV Wave 1 AU-1 (STR-11 Aufgabentypologie-Erweiterung, 2026-04-05)
**Bloom-Ziel-Zone:** L4 Analysieren (Strukturraster, Dimensions-Zerlegung)
**Primaerer AFB:** II-III

## Feedback-Schema (PFLICHT seit AU-2a, 2026-04-06)

**Schema:** `VERTRAG_FEEDBACK_SCHEMA.md` — `{typ, text, ebene}` bzw. Array davon.

**Vergleichs-Spezifikation (Single-Output, 2-3 Eintraege):** `feedback` ist ein Array mit mindestens einem `typ = "bestaetigung"`-Eintrag (bekraeftigt die erkannte Strukturachse und benennt die wichtigste Differenzierungs-Dimension) und einem `typ = "korrektur"`-Eintrag (nennt die typische Verwechslungs-Falle entlang einer Dimension, plus Material-ID). Bei L4 zusaetzlich optional `typ = "verknuepfung"`, der die Vergleichs-Einsicht an das Mappenabschluss-Lernziel knuepft. `ebene`: immer `anwendung` (L4). Die Korrektur MUSS die konkrete Dimension benennen, in der der Fehler typisch ist — keine allgemeinen Hinweise.

```json
"feedback": [
  {"typ": "bestaetigung", "text": "...", "ebene": "anwendung"},
  {"typ": "korrektur", "text": "In der Dimension X wird Y oft mit Z verwechselt, siehe mat-N-M ...", "ebene": "anwendung"}
]
```

`typ`-Enum: `bestaetigung` · `korrektur` · `hinweis` · `verknuepfung` (keine anderen Werte).

Keine Emojis, keine Lehrer-Perspektive. Legacy-String UNZULAESSIG. Pruefung: A25 + A26.

## Rolle + Didaktischer Zweck

Konstruiert strukturierte Vergleichs-Aufgaben: SuS tragen entlang vordefinierter Dimensionen Merkmale von 2-3 Vergleichsobjekten zusammen und erkennen so Gemeinsamkeiten und Unterschiede. Der Typ erzwingt analytisches Denken (L4), weil oberflaechliche Reproduktion nicht ausreicht — SuS muessen Material-Informationen nach Kategorien sortieren und auf Vergleichsdimensionen abbilden.

**Wann wird dieser Typ eingesetzt?**
- Zwei oder mehr historische Akteure, Ereignisse, Konzepte oder Quellen stehen kontrastiv im Material
- Ziel ist das Herausarbeiten systematischer Unterschiede/Gemeinsamkeiten (nicht reine Aufzaehlung)
- Bloom-Progression der Mappe verlangt L4-Anteil und kein anderer Typ erreicht ihn so zuverlaessig

**Abgrenzung:**
- KEIN Vergleich im MC-Gewand ("Welches Land hatte mehr Kolonien?") — das ist Lookup (L1).
- KEIN Vergleichs-Freitext ("Vergleiche X und Y") — fehlt Strukturraster, dann waehle SUB_AUFGABE_FREITEXT.
- KEIN Pseudo-Vergleich mit nur 1 Dimension — Anti-Quota-FAIL.

## Eingabe: Konstruktionskontext

| Feld | Beschreibung |
|---|---|
| Aufgaben-Position | N von 5 |
| AFB-Stufe | II (strukturiert) oder III (mit wertender Einordnung) |
| Vergleichsobjekte | 2-3 explizit benannte Objekte aus Ziel-Material (z.B. "Dreibund", "Entente") |
| Vergleichsdimensionen | 2-4 Dimensionen, die aus Material ableitbar sind (z.B. "Mitglieder", "Ziel", "Bindungsart") |
| Ziel-Material | mat-ID + Volltext |
| TB-Knoten | Verweis auf Tafelbild-Knoten, der den Vergleich buendelt |

## Konstruktionsheuristiken

### 1. Dimensionen waehlen (Kernexpertise)
- **Mindestens 2, hoechstens 4 Dimensionen.** Weniger als 2 = Pseudo-Vergleich (FAIL). Mehr als 4 = kognitive Ueberlastung.
- Jede Dimension muss aus dem Material beantwortbar sein — keine Spekulations-Kategorien.
- Dimensionen muessen trennscharf sein (keine Dubletten wie "Mitglieder" + "Teilnehmerstaaten").
- Mindestens 1 Dimension muss zwischen den Objekten einen **erkennbaren Unterschied** erzeugen — reine Gleichheits-Aufzaehlung ist nicht L4.

### 2. Objekte waehlen
- 2 Objekte (Standardfall) oder 3 Objekte (wenn Material es stuetzt).
- Objekte muessen auf derselben Kategorienebene liegen (Buendnis vs. Buendnis, nicht Buendnis vs. Einzelperson).

### 3. Zellen-Loesung formulieren
- Pro Zelle `<Objekt, Dimension>` eine pruefbare Zielantwort (Fachbegriff oder Kurz-Phrase, max 4 Woerter).
- Synonyme + Umlaut-Toleranz via `_meta.akzeptierte_varianten[<zelle_id>]: [...]`.

### 4. Fragestamm
- Max 12 Woerter, Operator `vergleiche` oder `stelle gegenueber`.
- Keine Material-Referenz im Fragestamm (MQ3). Zuweisung in Tipp 1.
- Beispiel: "Vergleiche Dreibund und Entente entlang der Dimensionen Mitglieder, Ziel und Bindungsart."

### 5. Tipps
| Stufe | Inhalt |
|---|---|
| 1 | Material-Verweis `[[mat-id\|Titel]] (Mk)` + Strukturhinweis: "Fuelle die Tabelle Zeile fuer Zeile." |
| 2 | Eine Zelle als Musterloesung angeben (z.B. Objekt 1, Dimension 1) + Hinweis auf Material-Fundstelle |
| 3 | Vollstaendige Tabelle + 1-Satz-Deutung ("Der entscheidende Unterschied liegt in..."). |

### 6. Anti-Patterns
| Anti-Pattern | Problem | Korrektur |
|---|---|---|
| Nur 1 Dimension | L3-Reproduktion statt L4-Analyse | min 2 Dimensionen |
| Ja/Nein-Dimensionen ohne Tiefe | Oberflaechlich | Qualifizierende Dimensionen ("Bindungsart: defensiv/offensiv") |
| Dimensionen nicht aus Material ableitbar | A3-Verletzung | Dimensionen auf Material pruefen |
| Pseudo-Vergleich (100 % Gleichheit) | Kein Analyse-Zuwachs | min 1 differenzierende Dimension |

## Qualitaetskriterien (inline)

| Kriterium | Pruefung |
|---|---|
| A1 AFB-Kongruenz | Vergleich = AFB II-III, kein Lookup |
| A2 Fragestaemme-Klarheit | Max 12 Woerter, Operator eindeutig |
| A3 Material-Kongruenz | Alle Zell-Loesungen im Material belegbar |
| **A22 Vergleichs-Strukturraster vollstaendig** | min 2 Objekte, min 2 Dimensionen, keine leeren Zellen, keine redundanten Dimensionen; **Haertegrad-Enum korrekt (A21)** |
| **A24 Bloom-Selbstdeklaration** | `_meta.bloom_level: 4`, `_meta.bloom_begruendung` gesetzt |
| MQ3 Material-Referenz-Verbot | Keine `[[mat-id]]` in `frage` |

## Rendering-Kontrakt

### data.json Schema

```json
{
  "id": "aufgabe-1-3",
  "typ": "vergleich",
  "frage": "Vergleiche Dreibund und Entente entlang der Dimensionen Mitglieder, Ziel und Bindungsart.",
  "material_referenz": ["mat-1-2"],
  "loesung": {
    "dimensionen": ["Mitglieder", "Ziel", "Bindungsart"],
    "objekte": ["Dreibund", "Entente"],
    "zellen": {
      "Dreibund": {
        "Mitglieder": "Deutschland, Oesterreich-Ungarn, Italien",
        "Ziel": "Gegenseitige Verteidigung",
        "Bindungsart": "Defensivbuendnis"
      },
      "Entente": {
        "Mitglieder": "Frankreich, Russland, Grossbritannien",
        "Ziel": "Einkreisung Deutschlands",
        "Bindungsart": "Lose Interessenabsprache"
      }
    }
  },
  "tipps": [
    { "stufe": 1, "text": "Schau in [[mat-1-2|Europakarte 1914]] (M2). Fuelle die Tabelle Zeile fuer Zeile." },
    { "stufe": 2, "text": "Dreibund-Mitglieder: Deutschland, Oesterreich-Ungarn, Italien. Jetzt fuer die Entente die gleiche Spalte." },
    { "stufe": 3, "text": "Vollstaendige Tabelle: siehe Musterloesung. Der entscheidende Unterschied liegt in der Bindungsart — der Dreibund war ein formaler Defensivpakt, die Entente eine lose Absprache." }
  ],
  "punkte": 8,
  "_meta": {
    "bloom_level": 4,
    "bloom_begruendung": "Analyse erfordert Zerlegung in Dimensionen und systematischen Abgleich (L4).",
    "akzeptierte_varianten": {
      "Dreibund__Mitglieder": ["Deutschland, Oesterreich, Italien", "D, Oe, I"]
    }
  }
}
```

## Tipp-Schema (STR-04, AU-2b)

**Verpflichtend seit 2026-04-06:** Alle Tipps folgen einem strukturierten JSON-Schema mit Haertegrad-Enum. Jeder Tipp ist ein Objekt mit:

```json
{
  "stufe": 1|2|3,
  "haertegrad": "kognitiv"|"strukturierend"|"heuristisch",
  "text": "string"
}
```

**Deterministische Haertegrad-Zuordnung (Fix, nicht verhandelbar):**
- **Stufe 1 → `kognitiv`** (Nachdenken aktivieren, ohne Vorstufen-Loesung). Beispiel: "Welche zwei Laender werden hier verglichen? Ueberlege zuerst, was du schon ueber beide weisst."
- **Stufe 2 → `strukturierend`** (Spezifische Hilfestellung: benennt 1-2 Dimensionen oder verweist auf konkretes Material). Beispiel: "Achte auf die Dimension 'Mitglieder' — mat-3-2 listet die Buendnis-Partner auf."
- **Stufe 3 → `heuristisch`** (Meta-Hinweis zur Vergleichs-Strategie, KEINE Zell-Eintraege). Beispiel: "Vergleiche die Kriegsziele — was wollte jede Seite erreichen? Nutze mat-3-2." Abgrenzung zu T2: T2 benennt eine **konkrete Dimension + Materialstelle**, T3 gibt eine **uebergreifende Vergleichs-Strategie** ohne Zell-Inhalte preiszugeben.

## Anti-Leak-Regel (A21)

**Tipp 3 (heuristisch) darf NICHT die Loesung verraten**, weder wortwortlich noch paraphrasiert. Sinn: SuS sollen selbst an die Vergleichslogik gelangen, nicht die Antwort abschreiben.

**VERGLEICH-Beispiel:**

```
LEAK (verboten):
"Schreib bei Dimension 'Ziel': Deutschland=Weltmacht, Frankreich=Revanche."

KEIN LEAK (akzeptabel):
"Vergleiche die Kriegsziele — was wollte jede Seite erreichen? Nutze mat-3-2."
```

Bei VERGLEICH besonders kritisch: Tipp 3 darf **keine Zell-Eintraege** (weder komplett noch partiell) wiedergeben, nur **Meta-Hinweise** zu Dimensionen und Materialfundstellen geben.
```

**Feld-Constraints:**
- `typ`: `"vergleich"`
- `loesung`: Object mit Keys `dimensionen`, `objekte`, `zellen`. `zellen[objekt][dimension]` = erwartete Antwort als String.
- `_meta.bloom_level`: 4 (verpflichtend fuer diesen Typ)
- `_meta.akzeptierte_varianten`: optional, Key-Format `<objekt>__<dimension>`

### BEM-Klassen

```html
<section class="aufgabe aufgabe--vergleich">
  <h3 class="aufgabe__titel">[frage]</h3>
  <table class="vergleich__raster">
    <thead><tr><th></th>[dimensionen]</tr></thead>
    <tbody>[objekte × eingabefelder]</tbody>
  </table>
  <button class="aufgabe__pruefen">Antwort pruefen</button>
</section>
```

### JS-Verhalten (Engine-Registry STR-11)

- Render: Tabelle `<objekte>` Zeilen × `<dimensionen>` Spalten, pro Zelle `<input>`-Feld.
- Pruefung: String-Match gegen `zellen[objekt][dimension]` mit Umlaut-Toleranz + `akzeptierte_varianten`-Fallback.
- Feedback-Schema `{typ, text, ebene}` (siehe VERTRAG_FEEDBACK_SCHEMA, AU-0 V2).

## JSON-Validierung (PFLICHT)

```bash
python3 -c "import json; json.load(open('aufgabe-<id>.json'))" && echo "OK"
```
