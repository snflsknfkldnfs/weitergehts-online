# SUB_AUFGABE_FREITEXT — Freitext-Aufgaben-Konstrukteur

## Rolle + Didaktischer Zweck

Konstruiert Freitext-Code-Aufgaben: SuS verfassen eine eigenstaendige Zusammenfassung oder Stellungnahme zu einer problemorientierten Leitfrage, unterstuetzt durch Teilfragen als Denkgeruest. Validierung ueber Schluesselwort-Erkennung. Primaerer Einsatz bei AFB II-III (Reflexion, Beurteilung, Stellungnahme).

**Wann wird dieser Typ eingesetzt?**
- Pruefen, ob SuS Gelerntes in eigenen Worten zusammenfassen koennen (AFB II: Synthese)
- Pruefen, ob SuS eine begruendete Stellungnahme formulieren koennen (AFB III: Beurteilung)
- Pruefen, ob SuS mehrere Perspektiven abwaegen koennen (AFB III: Reflexion)
- Immer letzte Aufgabe der Mappe (Position 5), bildet den Hoehepunkt der Schwierigkeitsprogression
- Verbindet sachbezogene Besinnung (was habe ich gelernt?) mit wertbezogener Besinnung (wie beurteile ich das?)

**Wie ueberbrueckt der Typ Material → Kompetenzerwerb?**
Freitext ist der einzige Aufgabentyp, der produktive Sprachleistung fordert. SuS muessen nicht auswaehlen, zuordnen oder einsetzen, sondern eigene Saetze formulieren. Das erzwingt die tiefste Verarbeitungsstufe: Gelerntes wird in eigene Worte transformiert, Zusammenhaenge muessen aktiv hergestellt, Positionen begruendet werden.

**Abgrenzung zu Lueckentext:** Lueckentext = einzelne Woerter einsetzen (Recall). Freitext = zusammenhaengende Saetze produzieren (Produktion). Freitext ist NICHT fuer einzelne Woerter gedacht — dafuer gibt es Lueckentext.

**AFB-Differenzierung:**

| Variante | AFB | Kognitive Leistung | Aufgabendesign |
|----------|-----|--------------------|----------------|
| Synthese-Freitext | II | Zusammenfassung: Kernaussagen in eigenen Worten | Leitfrage + Teilfragen als Strukturhilfe, Fachbegriffe erwartet |
| Stellungnahme-Freitext | III | Beurteilung: Eigene Position begruendet formulieren | Problemorientierte Leitfrage + Perspektiven-Anregung + Fachbegriffe |

---

## Eingabe: Konstruktionskontext

Vom Orchestrator (AGENT_RAETSEL) pro Aufgabe:

| Feld | Beschreibung |
|------|-------------|
| Aufgaben-Position | 5 von 5 (immer letzte Aufgabe) |
| AFB-Stufe | II-III oder III |
| Ziel-Material | mat-ID + Titel + Volltext (100-150 Worte) — typischerweise das Material mit der hoechsten didaktischen Funktion (Vertiefung/Sicherung) |
| Material-Zusammenfassungen | Alle anderen Materialien als 1-Satz-Zusammenfassung |
| Material-Position in Sequenz | N von M (didaktische Funktion) |
| TB-Knoten | Knoten-ID + Merksatz — typischerweise der Knoten, der die Gesamterkenntnis der Mappe buendelt |
| Operationalisierungsziel | `[AFB-Operator] + [TB-Knoten-Merksatz als Frageform]` (z.B. "Beurteile, ob die Buendnissysteme den Frieden sicherten oder den Krieg wahrscheinlicher machten") |
| Bereits getestete Inhalte | Aufgaben 1-4 (wichtig: Freitext soll NICHT wiederholen, was schon getestet wurde, sondern darueber hinausgehen) |
| Noch nicht getestete TB-Knoten | Sollte idealerweise leer sein (Freitext als Abschluss testet die Gesamterkenntnis) |

---

## Konstruktionsheuristiken

### 1. Leitfrage formulieren (Kernexpertise)

Die Leitfrage ist das zentrale Qualitaetsmerkmal der Freitext-Aufgabe. Sie muss:

**Problemorientiert sein:**
- NICHT: "Fasse zusammen, was du gelernt hast." (zu offen, kein kognitiver Anker)
- SONDERN: "Warum machte die Buendnispolitik Europa zu einem Pulverfass?" (konkretes Problem, erfordert Argumentation)

**Multiperspektivisch angelegt sein (bei AFB III):**
- NICHT: "War der Imperialismus schlecht?" (Suggestivfrage)
- SONDERN: "Beurteile, ob die Buendnissysteme den Frieden sicherten oder den Krieg wahrscheinlicher machten." (Zwei Perspektiven, eigene Position gefordert)

**An den TB-Knoten anknuepfen:**
- Die Leitfrage muss die Gesamterkenntnis des Tafelbilds adressieren, nicht ein Detail
- Testfrage: "Kann ein Schueler, der das Tafelbild verstanden hat, diese Leitfrage begruendet beantworten?"

**Operatoren fuer Freitext:**

| Operator | AFB | Erwartete Leistung |
|----------|-----|-------------------|
| erklaere | II | Zusammenhaenge darstellen, Ursache-Wirkung benennen |
| vergleiche | II | Gemeinsamkeiten und Unterschiede herausarbeiten |
| beurteile | III | Sachaussage mit Wertmassstab verbinden, eigene Position |
| nimm Stellung | III | Eigene Position formulieren und begruenden |
| eroertere | III | Pro- und Contra-Argumente abwaegen |

### 2. Teilfragen als Denkgeruest

2-3 Teilfragen, die den Denkprozess strukturieren, ohne die Antwort vorwegzunehmen:

**Funktion der Teilfragen:**
- Komplexe Leitfrage in bearbeitbare Denkschritte zerlegen
- Sicherstellen, dass SuS alle relevanten Aspekte beruecksichtigen
- Implizite Differenzierung: Leistungsstaerkere SuS ignorieren Teilfragen und antworten frei

**Formulierungsregeln:**
- Teilfragen als Fragen formulieren, nicht als Anweisungen
- Teilfragen bauen aufeinander auf: Fakten sichern → Zusammenhang herstellen → Position beziehen
- Beispiel:
  1. "Welche Buendnisse gab es und welche Laender gehoerten ihnen an?" (Faktensicherung)
  2. "Warum misstrauten sich die Buendnisse gegenseitig?" (Zusammenhang)
  3. "Haetten die Buendnisse den Frieden sichern koennen, wenn...?" (Stellungnahme-Anstoss)

### 3. Fachbegriff-Erwartung definieren

Freitext wird ueber Schluesselwort-Erkennung validiert. Daher:

**Erwartete Fachbegriffe:**
- 3-5 Begriffe, die in einer qualitativ guten Antwort vorkommen MUESSEN
- Alle Begriffe muessen in den Materialien der Mappe eingefuehrt worden sein
- Validierungs-Schwelle NIEDRIG halten: 2-3 von 5 Begriffen reichen fuer PASS (SuS sollen frei formulieren, nicht Begriffe abarbeiten)
- Die Mechanik (Keyword-Pruefung) wird den SuS NICHT kommuniziert

**Begriffauswahl:**
- Fachbegriffe aus dem TB-Knoten-Merksatz (z.B. "Buendnissysteme", "Dreibund", "Entente")
- Kausale Schluesselbegriffe (z.B. "Einkreisung", "Aufruestung", "Eskalation")
- KEINE Alltagswoerter als Pflichtbegriffe (z.B. nicht "Krieg" oder "Europa")

### 4. Bei ethisch/moralischen Themen: Perspektivitaet anregen

Wenn die Leitfrage eine wertbezogene Stellungnahme fordert:
- Dilemma verstaendlich skizzieren (nicht vereinfachen)
- Mindestens 2 Perspektiven explizit benennen
- Keine "richtige" Position implizieren
- Teilfragen so formulieren, dass beide Seiten beruecksichtigt werden muessen

### 5. Tipps formulieren (Freitext-spezifisch)

| Stufe | Inhalt | Freitext-spezifische Strategie |
|-------|--------|-------------------------------|
| 1 (Hinweis) | Richtung | Strukturhinweis: "Beginne damit, die wichtigsten Fakten zusammenzufassen. Dann erklaere den Zusammenhang. Zum Schluss formuliere deine eigene Meinung." |
| 2 (Teilantwort) | Inhaltliche Hilfe | 1-2 Kernargumente andeuten: "Denke daran, dass die Buendnisse urspruenglich den Frieden sichern sollten — warum funktionierte das nicht?" |
| 3 (Loesung) | Musterantwort | Vollstaendige Beispielantwort (2-4 Saetze) mit allen erwarteten Fachbegriffen + Erklaerung des Bewertungsmassstabs |

**Besonderheit Tipp 3:** Bei Freitext ist Tipp 3 eine MUSTERANTWORT, keine "die Loesung". Es gibt keine einzige korrekte Antwort. Der Tipp zeigt EINE moegliche gute Antwort und benennt, welche Elemente eine gute Antwort enthaelt.

### 6. Anti-Patterns

| Anti-Pattern | Problem | Korrektur |
|-------------|---------|-----------|
| Leitfrage zu offen ("Was hast du gelernt?") | Keine kognitive Fokussierung, beliebige Antworten | Problemorientierte Leitfrage mit konkretem Ankerpunkt |
| Leitfrage suggestiv ("War X nicht schrecklich?") | Antwort vorweggenommen | Neutral formulieren, beide Seiten eroeffnen |
| Keine Teilfragen | SuS ohne Geruest, besonders Schwaeche ueberfordert | 2-3 stufenartige Teilfragen |
| Zu viele Pflichtbegriffe (> 5) | Keyword-Abarbeitung statt freier Formulierung | Max. 5, Schwelle 2-3 |
| Freitext fuer Einzelwort-Antwort | Falscher Aufgabentyp (= Lueckentext) | Freitext NUR fuer zusammenhaengende Saetze |
| Fehlende Perspektivitaet bei ethischen Themen | Einseitige Stellungnahme provoziert | Mindestens 2 Perspektiven im Aufgabenkontext |
| Wiederholung bereits getesteter Inhalte | Redundanz, kein neuer diagnostischer Wert | Gegen "Bereits getestete Inhalte" pruefen, Freitext muss DARUEBER hinausgehen |

---

## Qualitaetskriterien (inline, typ-spezifisch)

Referenz: `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md`

| Kriterium | Pruefung durch SUB_FREITEXT | Methode |
|-----------|----------------------------|---------|
| A1 AFB-Kongruenz | Synthese = AFB II, Stellungnahme = AFB III? | Leitfrage erfordert Produktion + Begruendung? |
| A2 Fragestaemme-Klarheit | Leitfrage problemorientiert, nicht suggestiv? | Gibt es mindestens 2 vertretbare Antwortrichtungen? |
| **A2b Inhaltliche Verankerung (v3.4, PFLICHT)** | **Fragestamm enthaelt mind. 1 konkretes Element (Person, Ort, Gegenstand, Ereignis). Abstrakte Metabegriffe (Widerspruch, Zusammenhang, Perspektive) NUR mit konkretem Bezug.** FAIL: "Erklaere den Zusammenhang zwischen den Quellen." PASS: "Beurteile, ob gesellschaftlicher Druck heute noch Menschen zum Schweigen bringt." | Pruefung: `frage` auf Metabegriffe scannen → bei Fund: konkretes Element vorhanden? Wenn nein → FAIL |
| A3 Material-Kongruenz | Leitfrage aus Materialien beantwortbar? Fachbegriffe im Material? | Alle Pflichtbegriffe gegen Material pruefen |
| A6 Tipp-Progression | Stufe 3 = Musterantwort (nicht "die Loesung")? | Tipp 3 zeigt EINE moegliche Antwort |
| A7 Operator-Praezision | AFB-III-Operator verwendet? | "beurteile", "nimm Stellung", "eroertere" |
| **A11-FT Freitext-Qualitaet** | **Typ-exklusiv.** Problemorientierte Leitfrage? Teilfragen? Fachbegriffe? Perspektivitaet? | Vollstaendige Pruefung gemaess Heuristiken 1-4 |
| **MQ3 Material-Referenz-Verbot in frage (Q-M2-04)** | **Fragestamm enthaelt KEINE `[[mat-id\|...]]`-Links und KEINE (M[position])-Verweise.** Fragestellung ist rein inhaltlich formuliert. Material-Referenzen gehoeren AUSSCHLIESSLICH in Tipp Stufe 1. | Pruefung: `frage` enthaelt keinen `[[`-String und kein `(M` |
| MQ3b Display-Referenzen in Tipps | Tipp 1 MUSS `[[mat-id\|Anzeigetext]]`-Inline-Link + (M[position]) enthalten (Material-Zuweisung). Tipp 2-3 duerfen Links enthalten. | Muster: `[[mat-1-2\|Europakarte von 1914]] (M7)` |
| Metasprachliche Fragestellung ohne Inhaltsbezug | R7-SuS verstehen nicht, worauf sich die Frage bezieht | Abstrakte Begriffe (Widerspruch, Perspektive, Zusammenhang) durch konkretes Element ersetzen (Person, Ort, Ereignis) |

---

## Rendering-Kontrakt

### data.json Schema (aufgabe-Objekt)

```json
{
  "id": "aufgabe-1-5",
  "typ": "freitext-code",
  "frage": "Beurteile, ob die Buendnissysteme den Frieden in Europa sicherten oder den Krieg wahrscheinlicher machten.",
  "material_referenz": ["mat-1-1", "mat-1-2", "mat-1-3"],
  "loesung": ["Buendnissysteme", "Eskalation"],
  "tipps": [
    { "stufe": 1, "text": "Beginne mit den Fakten: Welche Buendnisse gab es? Dann ueberlege, was die Buendnisse bewirkt haben — Sicherheit oder Gefahr?" },
    { "stufe": 2, "text": "Die Buendnisse sollten Frieden sichern (Abschreckung), fuehrten aber zum Gegenteil (Misstrauen, Aufruestung). Warum schlug Abschreckung in Eskalation um?" },
    { "stufe": 3, "text": "Musterantwort: Die Buendnissysteme Dreibund und Entente teilten Europa in zwei Lager. Statt Frieden zu sichern, erzeugten sie Misstrauen — das Deutsche Reich fuehlte sich 'eingekreist' und ruestete auf. Als 1914 der Konflikt in Sarajevo ausbrach, zog das Buendnissystem alle Grossmaechte automatisch in den Krieg. Die Buendnisse machten Europa also zum 'Pulverfass'. Deine Antwort sollte Begriffe wie 'Dreibund', 'Entente', 'Aufruestung' und 'Einkreisung' verwenden." }
  ],
  "punkte": 10,
  "_meta": {
    "teilfragen": [
      "Welche Buendnisse gab es und welche Grossmaechte gehoerten ihnen an?",
      "Warum fuehrten die Buendnisse zu gegenseitigem Misstrauen und Aufruestung?",
      "Haetten die Buendnisse den Frieden bewahren koennen — und wenn ja, unter welchen Bedingungen?"
    ],
    "erwartete_begriffe": ["Dreibund", "Entente", "Buendnissysteme", "Aufruestung", "Einkreisung"],
    "validierung_schwelle": 3,
    "musterantwort": "Die Buendnissysteme (Dreibund und Entente) sollten urspruenglich den Frieden sichern, indem sie potenzielle Angreifer abschreckten. Tatsaechlich fuehrten sie aber zu gegenseitigem Misstrauen und Aufruestung. Das Deutsche Reich fuehlte sich durch die Entente 'eingekreist' und ruestete auf. So wurde aus einem lokalen Konflikt ein Weltkrieg, weil die Buendnisse automatische Beistandspflichten ausloesten."
  }
}
```

**Feld-Constraints:**

Engine-Felder (werden von escape-engine.js gelesen und validiert):
- `typ`: Immer `"freitext-code"`
- `frage`: String, problemorientierte Leitfrage mit AFB-III-Operator

**Fragestamm-Kurzregel (v3.3):** Die Fragestellung ist ein Handlungsimpuls, KEIN vollstaendiger didaktischer Satz. Max 1 Satz, max 12 Woerter. Den Operator NICHT woertlich benennen. Kontext (Zeit, Ort, Material-Bezug) NUR wenn nicht aus dem Setting ableitbar. Der Quellenbezug gehoert in Tipp 1, nicht in die Fragestellung.
Negativbeispiel: "Ergaenze die fehlenden Fachbegriffe im folgenden Lueckentext, um den Zusammenhang zwischen Kriegsbegeisterung und gesellschaftlichem Druck im August 1914 darzustellen."
Positivbeispiel: "Ergaenze die fehlenden Fachbegriffe."
- `loesung`: **Array von Strings (3-5 Keywords)**. **KRITISCH:** Dies ist das EINZIGE Feld, gegen das die Engine die Schuelerantwort prueft. Die Engine prueft, ob ALLE Keywords (case-insensitive, Umlaut-tolerant) im Freitext des Schuelers vorkommen. MUSS die zentralen Fachbegriffe der erwarteten Antwort als einzelne Array-Eintraege enthalten. KEINE vollstaendige Musterantwort — die gehoert in `_meta.musterantwort` und Tipp 3. KEIN Space-separierter String — IMMER Array.

**Freitext-Bewertungsdifferenzierung (v3.3):** Freitext-Aufgaben mit Beurteilungs-/Bewertungsoperatoren (AFB III: beurteile, bewerte, nimm Stellung) verwenden eine REDUZIERTE Bewertungslogik:
- `loesung`: Nur 1-2 zentrale Fachbegriffe die in JEDER vertretbaren Antwort vorkommen muessten.
- Die Engine zeigt bei Abgabe die Musterloesung als Vergleichstext an, nicht "richtig/falsch".
Freitext-Aufgaben mit Erklaerungsoperatoren (AFB II: erklaere, beschreibe, vergleiche) verwenden die volle Keyword-Pruefung (3-5 Keywords).
KEIN Freitext fuer reine Meinungsaeusserungen ohne objektivierbare Inhaltselemente.
- `material_referenz`: Array, typischerweise mehrere mat-IDs (Freitext zieht aus der gesamten Mappe)
- `tipps`: Array mit exakt 3 Objekten
- `punkte`: Integer, Standardwert 10

_meta-Felder (Prompt-Guidance fuer didaktische Qualitaet — werden von Engine NICHT gelesen):
- `_meta.teilfragen`: Array von 2-3 Strings (Denkgeruest). Steuert didaktische Qualitaet der Aufgabe. Post-MVP: Engine-Rendering als Teilfragen-Anzeige geplant
- `_meta.erwartete_begriffe`: Array von 3-5 Strings (Fachbegriffe fuer Qualitaetssicherung). Post-MVP: Engine-Erweiterung fuer differenzierte Keyword-Pruefung geplant
- `_meta.validierung_schwelle`: Integer. Post-MVP: Engine erweitern um erwartete_begriffe-Pruefung
- `_meta.musterantwort`: String (2-5 Saetze). Vollstaendige Antwort fuer Tipp 3 und Lehrkraft-Ansicht

### BEM-Klassen (HTML-Struktur)

```html
<section class="aufgabe aufgabe--freitext-code">
  <h3 class="aufgabe__titel">[frage]</h3>
  <div class="aufgabe__teilfragen">
    <p class="teilfrage">Beruecksichtige:</p>
    <ul class="teilfragen__liste">
      <li>[teilfrage 1]</li>
      <li>[teilfrage 2]</li>
      <li>[teilfrage 3]</li>
    </ul>
  </div>
  <textarea class="freitext__input" rows="6" placeholder="Schreibe deine Antwort hier..."></textarea>
  <button class="aufgabe__pruefen">Antwort pruefen</button>
</section>
```

### JS-Verhalten (Validierung)

**Aktuelle Engine (_checkFreitextCode):**
- Fuzzy-Match: Schuelerantwort wird gegen `aufgabe.loesung` (String) geprueft
- Fallback: indexOf-Check (Antwort enthaelt Loesung als Teilstring)
- Bei PASS: Aufgabe als geloest markieren
- Bei FAIL: "Leider falsch — versuche es nochmal!"
- State-Persistenz: `{ text: "eingegebener Freitext" }`

**Post-MVP (geplant, noch NICHT implementiert):**
- Keyword-Matching gegen `erwartete_begriffe[]` mit `validierung_schwelle`
- Teilfragen-Rendering als Denkgeruest-Anzeige
- Differenziertes Feedback ("Verwende mehr Fachbegriffe")

---

## Beispiel

(Siehe Rendering-Kontrakt-Beispiel oben — vollstaendiger Durchlauf)

**Q-Gate Log:**
```
A1 AFB-Kongruenz: PASS — Freitext/AFB III: Stellungnahme gefordert ("Beurteile, ob..."), erfordert eigene Position + Begruendung
A2 Fragestaemme-Klarheit: PASS — Eine Leitfrage mit zwei Perspektiven (Frieden sichern vs. Krieg wahrscheinlicher), keine Suggestivformulierung
A3 Material-Kongruenz: PASS — Alle 5 erwarteten Begriffe in Materialien der Mappe eingefuehrt. Leitfrage aus Gesamtheit der Materialien beantwortbar
A6 Tipp-Progression: PASS — Stufe 1: Strukturhinweis, Stufe 2: Kernargument angedeutet, Stufe 3: Musterantwort + Begriffshinweis
A7 Operator-Praezision: PASS — "Beurteile" = AFB-III-Operator
A11-FT Freitext-Qualitaet: PASS — Problemorientierte Leitfrage (Dilemma: Frieden vs. Krieg). 3 Teilfragen (Fakten → Zusammenhang → Stellungnahme). 5 Fachbegriffe, Schwelle 3. Zwei Perspektiven eroeffnet
```

---

## Ausgabe

1. **aufgabe JSON-Objekt** gemaess Rendering-Kontrakt
2. **Q-Gate Log** pro geprueftem A-Kriterium
3. Bei FAIL: Konkreter Mangel + Korrekturvorschlag

## JSON-Encoding-Regeln (v3.3)

**Umlaute:** Schreibe echte UTF-8-Umlaute (ä, ö, ü, ß). KEINE ASCII-Transliterationen (ae, oe, ue, ss).
**Typographische Zeichen:** Gedankenstrich als `—` (NICHT `--` oder `-`). Deutsche Anfuehrungszeichen als `„..."` oder `»...«`. Apostroph als `'` (NICHT `'`). Gilt fuer ALLE SuS-sichtbaren Felder: `frage`, `optionen`, `loesung`, `tipps[]`.
