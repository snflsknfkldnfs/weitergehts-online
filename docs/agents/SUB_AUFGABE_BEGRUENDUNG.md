# SUB_AUFGABE_BEGRUENDUNG — CER-Begruendungs-Aufgaben-Konstrukteur

**Eingefuehrt:** Phase IV Wave 1 AU-1 (STR-11 Aufgabentypologie-Erweiterung, 2026-04-05)
**Bloom-Ziel-Zone:** L5 Bewerten (Claim-Evidence-Reasoning)
**Primaerer AFB:** III

## Rolle + Didaktischer Zweck

Konstruiert strukturierte Begruendungs-Aufgaben nach dem **CER-Schema (Claim-Evidence-Reasoning)**: SuS formulieren eine These (`claim`), belegen sie mit mindestens einem Material-Beleg (`evidence`) und verknuepfen Beleg und These explizit (`reasoning`). Der Typ erzwingt Bewertungs-/Urteilsleistung (L5), weil der reine Beleg nicht genuegt — die Verknuepfungs-Logik muss explizit gemacht werden.

**Wann wird dieser Typ eingesetzt?**
- Problemstellung mit mehreren vertretbaren Positionen, nicht: Einzelfakt-Frage
- Material enthaelt belegfaehige Einzelelemente (Zitat, Zahl, Ereignis), die eine Positionierung erlauben
- Bloom-Progression der Mappe verlangt L5-Anteil

**Abgrenzung:**
- NICHT Freitext-Stellungnahme ohne CER-Struktur — dafuer SUB_AUFGABE_FREITEXT (Stellungnahme-Variante).
- NICHT Zuordnung "welcher Beleg stuetzt welche These" — das ist L3-Zuordnung.
- NICHT Pseudo-Begruendung (Claim ohne Evidence ODER Claim mit Evidence ohne Reasoning) — Anti-Quota-FAIL.

## Eingabe: Konstruktionskontext

| Feld | Beschreibung |
|---|---|
| Aufgaben-Position | N von 5 (typischerweise spaet: 3-5) |
| AFB-Stufe | III |
| Streitfrage | Problemorientierte Frage mit mindestens 2 vertretbaren Positionen |
| Beleg-Pool | Material-Stellen, die als Evidence dienen koennen (min 2, damit SuS auswaehlen) |
| Ziel-Material | mat-ID + Volltext |
| TB-Knoten | Verweis auf Tafelbild-Knoten |

## Konstruktionsheuristiken

### 1. Streitfrage formulieren (Kernexpertise)
- Problemorientiert, min 2 vertretbare Positionen, keine Suggestivformulierung.
- Beispiel (gut): "Beurteile, ob die Begeisterung im August 1914 echt oder inszeniert war."
- Beispiel (schlecht): "War die Kriegsbegeisterung gut?"

### 2. CER-Felder als Eingabefelder
- **Drei getrennte Eingabefelder** im Schueler-Interface: `claim`, `evidence`, `reasoning`.
- Jedes Feld hat eigene Platzhalter und Hinweise.
- `evidence` kann mehrere Belege fassen — Instruktion: "Nenne mindestens 1 Beleg aus dem Material."

### 3. Erwartungs-Loesung
- `claim`: ein akzeptabler Claim pro Position, `_meta.akzeptierte_claims` als Liste aller vertretbaren Positionen.
- `evidence`: Array der zulaessigen Material-Belege (min 1 muss vorkommen — ANY-Logik, nicht ALL).
- `reasoning`: Schluesselbegriff-Set der erwarteten Verknuepfungslogik (z.B. "Druck", "Propaganda", "Ideologie").

### 4. Fragestamm
- Max 14 Woerter. Operator `beurteile`, `bewerte`, `nimm Stellung`.
- Keine Material-Referenz (MQ3). Material-Zuweisung in Tipp 1.

### 5. Tipps
| Stufe | Inhalt |
|---|---|
| 1 | Material-Verweis + Struktur-Erklaerung: "Formuliere zuerst deine These. Dann nenne mindestens 1 Beleg aus dem Material. Verknuepfe zum Schluss beides: Warum stuetzt der Beleg deine These?" |
| 2 | Ein Beleg-Beispiel (aus dem Pool) + Hinweis, dass die Verknuepfung fehlt |
| 3 | Vollstaendige CER-Musterantwort (1 Claim, 1-2 Evidence, 1 Reasoning-Satz) + Hinweis, dass andere Positionen ebenfalls vertretbar sind |

### 6. Anti-Patterns
| Anti-Pattern | Problem | Korrektur |
|---|---|---|
| Claim ohne Evidence-Feld | CER-Schema verletzt | drei Felder pflicht |
| Evidence ohne Reasoning-Feld | L3 statt L5 | Reasoning-Feld pflicht |
| Suggestivfrage | Keine echte Bewertung | neutral umformulieren |
| Nur 1 Claim-Position zulaessig | Keine Bewertungsoffenheit | `_meta.akzeptierte_claims` min 2 Positionen |
| Kein Beleg-Pool im Material | A3-Verletzung | Material mit belegfaehigen Stellen waehlen |

## Qualitaetskriterien (inline)

| Kriterium | Pruefung |
|---|---|
| A1 AFB-Kongruenz | AFB III, Urteilsleistung |
| A2 Fragestaemme-Klarheit | Max 14 Woerter, nicht suggestiv |
| A3 Material-Kongruenz | Mindestens 2 belegfaehige Stellen im Material |
| **A23 CER-Struktur vollstaendig** | `claim`, `evidence`, `reasoning` als drei Eingabefelder definiert; min 1 akzeptabler Beleg, min 1 akzeptabler Claim |
| **A24 Bloom-Selbstdeklaration** | `_meta.bloom_level: 5`, `_meta.bloom_begruendung` gesetzt |
| MQ3 Material-Referenz-Verbot | Keine `[[mat-id]]` in `frage` |

## Rendering-Kontrakt

### data.json Schema

```json
{
  "id": "aufgabe-1-5",
  "typ": "begruendung",
  "frage": "Beurteile, ob die Begeisterung im August 1914 echt oder inszeniert war.",
  "material_referenz": ["mat-1-3", "mat-1-4"],
  "loesung": {
    "claim": "Die Begeisterung war ueberwiegend inszeniert.",
    "evidence": ["Presse-Propaganda", "gesellschaftlicher Konformitaetsdruck", "Kriegsanleihen-Kampagnen"],
    "reasoning": "Die Belege zeigen, dass oeffentlicher Jubel durch Medien und Druck erzeugt wurde, nicht spontan entstand."
  },
  "tipps": [
    { "stufe": 1, "text": "Lies [[mat-1-3|Tagebucheintrag]] (M3) und [[mat-1-4|Pressebericht]] (M4). Formuliere erst die These, dann einen Beleg, dann die Verknuepfung." },
    { "stufe": 2, "text": "Beleg-Beispiel: Der Pressebericht spricht von 'begeisterten Menschenmassen' — aber woher kommt diese Einheitlichkeit? Verknuepfe den Beleg mit deiner These." },
    { "stufe": 3, "text": "Musterantwort: These — 'Die Begeisterung war inszeniert.' Beleg — 'Presse-Propaganda und gesellschaftlicher Druck, Kriegsgegner wurden ausgegrenzt.' Verknuepfung — 'Wenn abweichende Stimmen sanktioniert werden, ist der scheinbare Konsens nicht Ausdruck echter Begeisterung, sondern Ergebnis von Druck.' Die Gegenposition (echte Begeisterung) ist ebenfalls vertretbar, wenn sie mit Beleg + Reasoning gestuetzt wird." }
  ],
  "punkte": 12,
  "_meta": {
    "bloom_level": 5,
    "bloom_begruendung": "Bewerten erfordert Position beziehen + Belegen + Verknuepfen (L5 CER).",
    "akzeptierte_claims": [
      "Die Begeisterung war ueberwiegend inszeniert.",
      "Die Begeisterung war teilweise echt, aber durch Propaganda verstaerkt.",
      "Die Begeisterung war echt, Druck spielte nur eine Nebenrolle."
    ],
    "reasoning_schluesselbegriffe": ["Druck", "Propaganda", "Konformitaet", "Ideologie"]
  }
}
```

**Feld-Constraints:**
- `typ`: `"begruendung"`
- `loesung`: Object mit Keys `claim`, `evidence`, `reasoning`. Alle drei Pflicht, keines leer.
- `evidence`: Array, min 1 Eintrag. Engine-Pruefung: ANY (mindestens 1 Beleg muss vorkommen), nicht ALL.
- `_meta.bloom_level`: 5 (verpflichtend fuer diesen Typ)
- `_meta.akzeptierte_claims`: min 2 Positionen

### BEM-Klassen

```html
<section class="aufgabe aufgabe--begruendung">
  <h3 class="aufgabe__titel">[frage]</h3>
  <div class="cer cer--claim"><label>These</label><textarea rows="2"></textarea></div>
  <div class="cer cer--evidence"><label>Beleg(e) aus dem Material</label><textarea rows="3"></textarea></div>
  <div class="cer cer--reasoning"><label>Verknuepfung: Warum stuetzt der Beleg deine These?</label><textarea rows="3"></textarea></div>
  <button class="aufgabe__pruefen">Antwort pruefen</button>
</section>
```

### JS-Verhalten (Engine-Registry STR-11)

- Render: drei getrennte `<textarea>`-Felder, Labels `These` / `Beleg(e)` / `Verknuepfung`.
- Pruefung:
  - `claim`: Match gegen `akzeptierte_claims` (fuzzy, Umlaut-tolerant).
  - `evidence`: ANY-Match gegen `evidence`-Array (mindestens 1 Beleg).
  - `reasoning`: Schwelle-Match gegen `reasoning_schluesselbegriffe` (min 1 Begriff).
- Feedback-Schema `{typ, text, ebene}` (AU-0 V2).

## JSON-Validierung (PFLICHT)

```bash
python3 -c "import json; json.load(open('aufgabe-<id>.json'))" && echo "OK"
```
