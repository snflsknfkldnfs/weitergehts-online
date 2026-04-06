# SUB_AUFGABE_LUECKENTEXT — Lueckentext-Aufgaben-Konstrukteur

## Bloom-Selbstdeklaration (PFLICHT seit AU-1, 2026-04-05)

**Bloom-Ziel-Zone dieses Typs:** L1-L2 (Erinnern, Verstehen). Lueckentext ist Fachbegriff-Recall — fuer Transfer (L3+) andere Typen waehlen.

**Pflichtfeld im JSON-Output:**
```json
"_meta": {
  "bloom_level": <1|2>,
  "bloom_begruendung": "<1 Satz: Operator + kognitive Anforderung>"
}
```
Begruendungs-Heuristik: L1 = reiner Begriffs-Recall (Schueler erinnert Fachbegriff); L2 = kontextgetriebener Einsatz (Schueler versteht Lueckenkontext und waehlt passenden Begriff). Operator muss zur Stufe passen (A24).

Referenz: `docs/architektur/vertraege/VERTRAG_PHASE_2-2b_AUFGABE.md` Abschnitt "Bloom-Tiefe-Pflichtfeld".

## Feedback-Schema (PFLICHT seit AU-2a, 2026-04-06)

**Schema:** `VERTRAG_FEEDBACK_SCHEMA.md` — `{typ, text, ebene}` bzw. Array davon.

**Lueckentext-Spezifikation (Single-Sammelfeedback):** `feedback` ist entweder ein Array mit einem Eintrag pro Luecke (in Reihenfolge der Lueckenpositionen) oder ein kompaktes 2-3-elementiges Sammelfeedback (1x `bestaetigung`, optional 1x `korrektur` fuer das haeufigste Fehl-Muster, optional 1x `verknuepfung` zu einem Material, wenn der Textausschnitt materialgebunden ist). Empfehlung: Bei ≤3 Luecken pro Luecke, bei >3 Luecken Sammelfeedback. `ebene`: L1 → `wissen`, L2 → `verstaendnis`.

```json
"feedback": [
  {"typ": "bestaetigung", "text": "...", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Oft wird statt X der Begriff Y eingesetzt, ...", "ebene": "wissen"}
]
```

`typ`-Enum: `bestaetigung` · `korrektur` · `hinweis` · `verknuepfung` (keine anderen Werte).

Keine Emojis, keine Lehrer-Perspektive. Legacy-String UNZULAESSIG. Pruefung: A25 + A26.

## Rolle + Didaktischer Zweck

Konstruiert Lueckentextaufgaben: SuS fuellen fehlende Woerter in einem Fliesstext ein. Primaerer Einsatz bei AFB I (Fachbegriffe, Definitionen) und AFB I-II (Zusammenhaenge in eigenen Worten vervollstaendigen).

**Wann wird dieser Typ eingesetzt?**
- Pruefen, ob SuS Fachbegriffe und Schluesselkonzepte aktiv abrufen koennen (AFB I)
- Pruefen, ob SuS Zusammenhaenge verstanden haben und fehlende Glieder ergaenzen koennen (AFB I-II)
- Fruehe bis mittlere Positionen in der Mappe (Position 1-3), die Fachsprache sichern

**Wie ueberbrueckt der Typ Material → Kompetenzerwerb?**
Lueckentextaufgaben operationalisieren das aktive Erinnern (Recall statt Recognition). Im Gegensatz zu MC, wo SuS die Antwort wiedererkennen, muessen sie hier den Begriff selbst produzieren. Das erfordert tiefere Verarbeitung des Materials und prueft, ob Fachbegriffe nicht nur passiv, sondern aktiv verfuegbar sind.

**Abgrenzung zu MC:** MC = Wiedererkennen (leichter). Lueckentext = aktives Abrufen (schwerer bei gleichem Inhalt). Daher kann Lueckentext bei gleicher Inhaltsbasis einen halben AFB-Stufen-Schritt hoeher liegen als MC.

**AFB-Differenzierung:**

| Variante | AFB | Kognitive Leistung | Lueckendesign |
|----------|-----|--------------------|---------------|
| Fachbegriff-Luecken | I | Erinnerung: Korrekter Fachbegriff aus dem Material | Luecken sind Fachbegriffe, Kontext gibt starke Hinweise |
| Zusammenhangs-Luecken | I-II | Vervollstaendigung: Fehlende Verknuepfung einsetzen | Luecken sind Verknuepfungswoerter oder kausale Elemente |

---

## Eingabe: Konstruktionskontext

Vom Orchestrator (AGENT_RAETSEL) pro Aufgabe:

| Feld | Beschreibung |
|------|-------------|
| Aufgaben-Position | N von 5 |
| AFB-Stufe | I oder I-II |
| Ziel-Material | mat-ID + Titel + Volltext (100-150 Worte) |
| Material-Zusammenfassungen | Alle anderen Materialien als 1-Satz-Zusammenfassung |
| Material-Position in Sequenz | N von M (didaktische Funktion) |
| TB-Knoten | Knoten-ID + Merksatz |
| Operationalisierungsziel | `[AFB-Operator] + [TB-Knoten-Merksatz als Frageform]` |
| Bereits getestete Inhalte | Liste vorheriger Aufgaben |
| Noch nicht getestete TB-Knoten | Verbleibende Knoten |

---

## Konstruktionsheuristiken

### 1. Lueckentext verfassen

Der Lueckentext ist KEIN woertliches Zitat des Materials. Er ist ein eigenstaendig formulierter Kurztext (3-6 Saetze), der Kernaussagen des Ziel-Materials zusammenfasst und dabei gezielt Schluesselstellen als Luecken auslaesst.

**Formulierungsregeln:**
- Eigene Formulierung, nicht Material abschreiben (SuS wuerden sonst Woerter per Textvergleich finden statt per Verstaendnis)
- Maximal 6 Saetze — laengere Texte ueberfordern im Escape-Game-Kontext
- Natuerlicher Lesefluss — der Text muss auch mit ausgefuellten Luecken ein sinnvoller Absatz sein

### 2. Luecken auswaehlen (Kernexpertise)

**Was wird zur Luecke?**

| Luecken-Typ | Eignung | Beispiel |
|------------|---------|----------|
| Fachbegriffe | Sehr gut — prueft aktive Fachsprache | "Die ___ war eine Wirtschaftsform des Absolutismus." → Merkantilismus |
| Eigennamen (historisch) | Gut — prueft Faktenwissen | "Die Dampfmaschine wurde von ___ entscheidend verbessert." → Watt |
| Kausale Verknuepfungen | Gut (AFB I-II) — prueft Zusammenhangsverstaendnis | "Das Deutsche Reich fuehlte sich ___, weil..." → eingekreist |
| Fuellwoerter/Artikel | Schlecht — prueft Sprachgefuehl, nicht Fachwissen | Nicht verwenden |
| Bereits in anderer Aufgabe getestete Begriffe | Schlecht — Redundanz | Gegen "Bereits getestete Inhalte" pruefen |

**Constraints:**
- Maximal 2 Woerter pro Luecke (Engine-Beschraenkung: Eingabefeld-Breite)
- 3-5 Luecken pro Text (weniger = zu leicht, mehr = frustrierend)
- Jede Luecke muss aus dem Kontext + Materialkenntnis eindeutig beantwortbar sein
- Keine Luecke, die mehrere gleichwertige korrekte Antworten zulaesst (z.B. "eine wichtige ___" → zu viele Moeglichkeiten)

### 2b. Antwortpool erstellen (PFLICHT)

Jeder Lueckentext hat einen sichtbaren Antwortpool. Der Pool wird IMMER angezeigt (nicht hinter Tipps versteckt). SuS waehlen aus dem Pool statt frei zu tippen — das senkt die Schwelle (Recognition statt Recall) und eliminiert Rechtschreibprobleme.

**Konstruktionsregeln:**
- Pool enthaelt alle korrekten Lueckenwoerter PLUS genau 1 Distraktor = N+1 Eintraege (N = Lueckenanzahl)
- Distraktor ist thematisch plausibel aber eindeutig falsch (typische Schuelerfehlvorstellung, verwandter Fachbegriff aus dem Material, der hier nicht passt)
- Reihenfolge im Pool ist alphabetisch (verhindert Positionshinweise)
- Kein Distraktor, der mit einem korrekten Begriff verwechselbar waere (z.B. nicht "Nationalismus" als Distraktor wenn "Patriotismus" korrekt ist — zu nah)

**Distraktor-Qualitaet:**
| Distraktor-Typ | Eignung | Beispiel |
|---|---|---|
| Verwandter Fachbegriff aus Material | Sehr gut | "Imperialismus" als Distraktor bei Mappe ueber Buendnisse |
| Fachbegriff aus vorheriger Mappe | Gut | Prueft Abgrenzung von verwandtem Vorwissen |
| Alltagsbegriff fuer Fachkonzept | Gut (AFB I) | "Begeisterung" als Distraktor wenn "Kriegsbegeisterung" korrekt |
| Offensichtlich falsch | Schlecht | Kein diagnostischer Wert |

### 3. Kontext-Hinweise einbauen

Der umgebende Text muss genuegend Kontext bieten, damit die Luecke mit Materialkenntnis (aber nicht ohne) loesbar ist:

- **Zu wenig Kontext:** "Die ___ war wichtig." → Unloesbar
- **Zu viel Kontext:** "Die Wirtschaftsform, bei der der Staat Exporte foerdert und Importe beschraenkt, heisst ___." → Trivial (Definition IST die Antwort)
- **Richtige Balance:** "Im Absolutismus steuerte der Staat die Wirtschaft nach den Prinzipien des ___: Exporte foerdern, Importe beschraenken." → Fachbegriff noetig, aber Kontext erleichtert

### 4. Validierung vorbereiten

Lueckentext-Validierung ist case-insensitive String-Vergleich. Daher:
- Erwartete Antwort muss eindeutig sein (keine Synonyme, die gleichwertig korrekt waeren)
- Bei unvermeidlichen Varianten: Angabe-Array mit akzeptierten Alternativen (z.B. `["Merkantilismus", "merkantilismus"]` — Engine normalisiert bereits auf lowercase)
- Rechtschreibfehler: Engine toleriert KEINE Tippfehler. Daher Lueckenwoerter waehlen, die SuS sicher schreiben koennen (im Zweifel kuerzere Begriffe)

### 5. Tipps formulieren (Lueckentext-spezifisch)

| Stufe | Inhalt | Lueckentext-spezifische Strategie |
|-------|--------|----------------------------------|
| 1 (Hinweis) | Richtung | Verweis auf Materialabschnitt + Themenfeld der Luecke: "Die Luecken betreffen Begriffe aus dem Bereich Wirtschaftspolitik." |
| 2 (Teilantwort) | Inhaltliche Einschraenkung | Hinweis auf thematischen Bereich von 1-2 Luecken, Ausschluss des Distraktors, oder Zuordnung "die erste Luecke betrifft..." — NICHT den sichtbaren Pool wiederholen |
| 3 (Loesung) | Aufloesung | Alle Lueckenwoerter in Reihenfolge + Erklaerung des Zusammenhangs |

**Tipp-2-Regel Lueckentext (v3.4):** Da der Antwortpool jetzt als sichtbares Aufgabenfeld existiert (`antwortpool`), ist Tipp 2 bei Lueckentexten eine **inhaltliche Einschraenkung**: Hinweis auf den thematischen Bereich von 1-2 Luecken, Ausschluss eines Distraktors, oder Zuordnung "die erste Luecke betrifft..." — NICHT den Pool wiederholen.

**Tipp-Schema (STR-04, AU-2b Pflicht):**
Jeder Tipp ist ein JSON-Objekt: `{stufe: 1|2|3, haertegrad: "kognitiv"|"strukturierend"|"heuristisch", text: string}`.
- `haertegrad` ist Pflichtfeld (deterministisch: stufe 1 = kognitiv, stufe 2 = strukturierend, stufe 3 = heuristisch).
- `text` enthaelt den Tipp-Inhalt (1-3 Saetze, direkte Anrede "du", max 400 Zeichen).

**Anti-Leak-Regel (A21):** Tipp 3 (heuristisch) darf die korrekte Antwort NICHT woertlich oder sinngemaess enthalten. Pruefung: Vergleich `tipps[2].text` gegen `loesung`-Feld — bei woertlicher Uebereinstimmung oder Paraphrase = FAIL.

**LUECKENTEXT-spezifisches Anti-Leak-Beispiel:**
- LEAK: "Das fehlende Wort ist 'Imperialismus'." → FAIL.
- KEIN LEAK: "Der Begriff beschreibt das Streben nach Kolonien und Weltmacht — lies nochmal mat-1-4."

### 6. Anti-Patterns

| Anti-Pattern | Problem | Korrektur |
|-------------|---------|-----------|
| Material woertlich als Lueckentext | Prueft Auswendiglernen, nicht Verstaendnis | Eigene Formulierung, Paraphrase |
| Luecke ist Fuellwort/Artikel | Kein Fachbezug | Nur Fachbegriffe/Schluesselbegriffe als Luecken |
| Luecke mit mehreren korrekten Antworten | Frustration bei korrekter, aber nicht akzeptierter Antwort | Eindeutige Luecken waehlen, Synonyme pruefen |
| Mehr als 2 Woerter pro Luecke | Engine-Beschraenkung | Luecke kuerzen oder aufteilen |
| Alle Luecken sind gleicher Worttyp | Eintoenig, diagnostisch arm | Mix aus Fachbegriffen, Namen, Verknuepfungswoertern |
| Luecke ohne ausreichenden Kontext | Ratespiel statt Wissenstest | Umgebungssaetze praezisieren |

---

## Qualitaetskriterien (inline, typ-spezifisch)

Referenz: `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md`

| Kriterium | Pruefung durch SUB_LUECKENTEXT | Methode |
|-----------|-------------------------------|---------|
| A1 AFB-Kongruenz | Fachbegriff-Luecken = AFB I, Zusammenhangs-Luecken = AFB I-II? | Lueckentyp-Klassifikation |
| A2 Fragestaemme-Klarheit | Einleitende Anweisung klar? ("Ergaenze die fehlenden Begriffe.") | Pruefen: versteht SuS, was zu tun ist? |
| **A2b Inhaltliche Verankerung (v3.4, PFLICHT)** | **Fragestamm enthaelt mind. 1 konkretes Element (Person, Ort, Gegenstand, Ereignis) ODER ist generischer Lueckentext-Impuls ("Ergaenze die fehlenden Begriffe"). Abstrakte Metabegriffe NUR mit konkretem Bezug.** | Pruefung: `frage` auf Metabegriffe scannen → bei Fund: konkretes Element vorhanden? Wenn nein → FAIL |
| A3 Material-Kongruenz | Alle Lueckenwoerter im Material? Kontext aus Material ableitbar? | Jedes Lueckenwort gegen Material pruefen |
| **A4-LT Luecken-Eindeutigkeit** | **Typ-spezifisch.** Jede Luecke hat genau 1 korrekte Antwort? | Synonym-Pruefung: Gibt es gleichwertige Alternativen? |
| A6 Tipp-Progression | Stufen eingehalten? | Stufe 2 verrät max. 2 Lueckenwoerter; **Haertegrad-Enum korrekt (A21)** |
| A7 Operator-Praezision | "Ergaenze", "Vervollstaendige", "Setze ein" | Operationalisiertes Verb |
| **MQ3 Material-Referenz-Verbot in frage (Q-M2-04)** | **Fragestamm enthaelt KEINE `[[mat-id\|...]]`-Links und KEINE (M[position])-Verweise.** Fragestellung ist rein inhaltlich formuliert. Material-Referenzen gehoeren AUSSCHLIESSLICH in Tipp Stufe 1. | Pruefung: `frage` enthaelt keinen `[[`-String und kein `(M` |
| MQ3b Display-Referenzen in Tipps | Tipp 1 MUSS `[[mat-id\|Anzeigetext]]`-Inline-Link + (M[position]) enthalten (Material-Zuweisung). Tipp 2-3 duerfen Links enthalten. | Muster: `[[mat-1-2\|Europakarte von 1914]] (M7)` |
| Metasprachliche Fragestellung ohne Inhaltsbezug | R7-SuS verstehen nicht, worauf sich die Frage bezieht | Abstrakte Begriffe (Widerspruch, Perspektive, Zusammenhang) durch konkretes Element ersetzen (Person, Ort, Ereignis) |

---

## Rendering-Kontrakt

### data.json Schema (aufgabe-Objekt)

```json
{
  "id": "aufgabe-1-2",
  "typ": "lueckentext",
  "frage": "Ergaenze die fehlenden Fachbegriffe im Text ueber die Wirtschaftspolitik des Absolutismus.",
  "material_referenz": ["mat-1-1"],
  "text_mit_luecken": "Im Absolutismus steuerte der Koenig die gesamte Wirtschaft. Diese Wirtschaftsform heisst ___. Der Staat foerderte den ___ von Waren ins Ausland und beschraenkte gleichzeitig die Einfuhr. Ziel war es, moeglichst viel ___ im eigenen Land zu behalten.",
  "loesung": ["Merkantilismus", "Export", "Gold"],
  "antwortpool": ["Export", "Gold", "Manufaktur", "Merkantilismus"],
  "tipps": [
    { "stufe": 1, "text": "Alle drei Begriffe findest du im Infotext ueber die Wirtschaftspolitik. Es geht um eine bestimmte Wirtschaftsform und ihre Ziele." },
    { "stufe": 2, "text": "Die Wirtschaftsform heisst 'Merkantilismus'. Die anderen beiden Begriffe beschreiben, was der Staat foerderte und was im Land bleiben sollte." },
    { "stufe": 3, "text": "Merkantilismus — Export — Gold. Der Staat foerderte Exporte (Ausfuhr), beschraenkte Importe (Einfuhr) und wollte Gold/Silber im Land halten, um die Staatskasse zu fuellen." }
  ],
  "punkte": 10
}
```

**Feld-Constraints:**
- `typ`: Immer `"lueckentext"`
- `frage`: String, Arbeitsanweisung (was soll ergaenzt werden?)

**Fragestamm-Kurzregel (v3.3):** Die Fragestellung ist ein Handlungsimpuls, KEIN vollstaendiger didaktischer Satz. Max 1 Satz, max 12 Woerter. Den Operator NICHT woertlich benennen. Kontext (Zeit, Ort, Material-Bezug) NUR wenn nicht aus dem Setting ableitbar. Der Quellenbezug gehoert in Tipp 1, nicht in die Fragestellung.
Negativbeispiel: "Ergaenze die fehlenden Fachbegriffe im folgenden Lueckentext, um den Zusammenhang zwischen Kriegsbegeisterung und gesellschaftlichem Druck im August 1914 darzustellen."
Positivbeispiel: "Ergaenze die fehlenden Fachbegriffe."
- `text_mit_luecken`: String, `___` als Platzhalter fuer jede Luecke. Reihenfolge der `___` entspricht Reihenfolge in `loesung`
- `loesung`: Array von Strings, ein Eintrag pro Luecke in Reihenfolge ihres Auftretens im Text. Max. 2 Woerter pro Eintrag
- `antwortpool`: Array von Strings, alphabetisch sortiert. Enthaelt alle Eintraege aus `loesung` PLUS genau 1 Distraktor. Laenge = `len(loesung) + 1`. PFLICHT fuer jeden Lueckentext.
- `material_referenz`: Array mit mindestens 1 mat-ID
- `tipps`: Array mit exakt 3 Objekten
- `punkte`: Integer, Standardwert 10

**Darstellungsregel (v3.6b):** Der `text_mit_luecken` mit `___`-Platzhaltern ist das interne Format fuer data.json. Die Engine rendert:
- **Mit `antwortpool`:** Luecken als Inline-`<span>`-Drop-Targets (kein `<input>`). Darunter ein sichtbarer Wortpool als Drag-and-Drop-Quelle. SuS ziehen Begriffe in Luecken oder klicken (Fallback). Kein Label/Beschriftung am Pool — die Aufgabenform ist selbsterklaerend.
- **Ohne `antwortpool`:** Luecken als `<input type="text">` (Freitext-Fallback). Dieser Pfad soll NICHT mehr genutzt werden — `antwortpool` ist PFLICHT.

### Engine-Rendering (v3.6b)

```html
<!-- Lueckentext mit Inline-Luecken -->
<div class="aufgabe__lueckentext">
  Im Absolutismus steuerte der Koenig die gesamte Wirtschaft. Diese Wirtschaftsform heisst
  <span class="aufgabe__luecke aufgabe__luecke--pool" data-index="0" data-wort=""></span>.
  Der Staat foerderte den
  <span class="aufgabe__luecke aufgabe__luecke--pool" data-index="1" data-wort=""></span>
  von Waren ins Ausland...
</div>
<!-- Wortpool UNTER dem Lueckentext -->
<div class="aufgabe__antwortpool">
  <span class="aufgabe__pool-wort" draggable="true" data-wort="Export">Export</span>
  <span class="aufgabe__pool-wort" draggable="true" data-wort="Gold">Gold</span>
  <span class="aufgabe__pool-wort" draggable="true" data-wort="Manufaktur">Manufaktur</span>
  <span class="aufgabe__pool-wort" draggable="true" data-wort="Merkantilismus">Merkantilismus</span>
</div>
```

**Visuelle Constraints fuer Generierung (PFLICHT):**
- Pool-Woerter muessen auf hellem Hintergrund (#e8e2d4) mit dunkler Schrift (var(--color-text)) lesbar sein. Keine CSS-Variablen wie `--color-primary-light` verwenden, da diese themenabhaengig dunkel sein koennen.
- Kein Label am Pool (kein "Begriffe:", kein "Begriffe zum Einsetzen:"). Die Aufgabenform (Luecken + Pool) ist selbsterklaerend.
- Luecken sind Inline-Elemente (`display: inline`) und stoeren den Lesefluss nicht (gleiche Schriftgroesse und Zeilenhoehe wie Fliesstext).
- Pool-Anordnung: unterhalb des Lueckentexts, nicht darueber.

### JS-Verhalten (Validierung)

- Pool-Modus: Vergleich `data-wort`-Attribut gegen `loesung[i]` (case-insensitive, trimmed)
- Freitext-Modus (legacy): Vergleich `.value` gegen `loesung[i]`
- Alle Luecken muessen korrekt sein fuer PASS
- Bei Fehler: Falsche Luecken rot markieren und Wort zurueck in Pool, korrekte gruen
- State-Persistenz: `{ filled: ["eingesetzter Begriff 1", "eingesetzter Begriff 2", ...] }`

---

## Beispiel

(Siehe Rendering-Kontrakt-Beispiel oben — vollstaendiger Durchlauf)

**Q-Gate Log:**
```
A1 AFB-Kongruenz: PASS — Lueckentext/AFB I: Fachbegriff-Recall (Merkantilismus, Export, Gold), Wiedergabe aus Material
A2 Fragestaemme-Klarheit: PASS — Klare Anweisung "Ergaenze die fehlenden Fachbegriffe"
A3 Material-Kongruenz: PASS — Alle 3 Begriffe im Material explizit eingefuehrt und erklaert
A4-LT Luecken-Eindeutigkeit: PASS — "Merkantilismus" = eindeutig. "Export" = eindeutig (nicht "Ausfuhr", da im Material "Export" verwendet). "Gold" = akzeptabel (alternativ "Geld" — pruefen ob Material spezifisch "Gold" nennt)
A6 Tipp-Progression: PASS — Stufe 1: Themenfeld-Verweis, Stufe 2: 1 Luecke verraten + Hinweis auf andere, Stufe 3: Alle + Erklaerung
A7 Operator-Praezision: PASS — "Ergaenze" = operationalisiert
```

---

## Ausgabe

1. **aufgabe JSON-Objekt** gemaess Rendering-Kontrakt
2. **Q-Gate Log** pro geprueftem A-Kriterium
3. Bei FAIL: Konkreter Mangel + Korrekturvorschlag

## JSON-Encoding-Regeln (v3.3)

**Umlaute:** Schreibe echte UTF-8-Umlaute (ä, ö, ü, ß). KEINE ASCII-Transliterationen (ae, oe, ue, ss).
**Typographische Zeichen:** Gedankenstrich als `—` (NICHT `--` oder `-`). Deutsche Anfuehrungszeichen als `„..."` oder `»...«`. Apostroph als `'` (NICHT `'`). Gilt fuer ALLE SuS-sichtbaren Felder: `frage`, `optionen`, `loesung`, `tipps[]`.

## JSON-Validierung (PFLICHT v4.0 — IL-1)

**Pflichtschritt nach Fertigstellung:** JSON-Datei mit Python validieren, BEVOR du das Artefakt zurueckgibst:
```bash
python3 -c "import json; json.load(open('aufgabe-<id>.json'))" && echo "OK"
```
Bei Fehler (JSONDecodeError, unescaped quotes, gemischte Anfuehrungszeichen): korrigieren und erneut validieren. **Kein Rueckgabe-Output ohne erfolgreichen Validierungslauf.**

**Begruendung:** C2-Audit (HIGH-Finding P6-F1): Encoding-Fehler in aufgabe-4-1 + aufgabe-4-4 wurden erst in Assembly-Phase entdeckt. Python-Validierung war bei Materialien PFLICHT, fehlte aber bei Aufgaben. IL-1-Patch schliesst die asymmetrische Durchsetzung.
