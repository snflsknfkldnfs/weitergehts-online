# Complication.typ — Zuweisungsanleitung

**Version:** v1.0
**Datum:** 2026-04-07
**Adressiert:** RA-B-F02 (CRITICAL — Complication.typ ohne Zuweisungsanleitung)
**Zielgruppe:** AGENT_HEFTEINTRAG (Phase 0.4), Reviewer
**Kanonischer Vertrag:** VERTRAG_PHASE_0-4_HEFTEINTRAG.md §3 Punkt 4

---

## 1. Zweck

Jede Complication im SCPL-Modell erhaelt ein `typ`-Feld. Der Typ klassifiziert die **didaktische Funktion** der Problematisierung, nicht ihren Inhalt. Ein Agent MUSS genau einen Typ zuweisen. Bei Ambiguitaet entscheidet der Primaer-Funktion-Test (§3).

---

## 2. Typ-Definitionen

### narrativ

**Definition:** Die Complication ist ein Wendepunkt oder eine Zaesur in der Ereignisfolge. Sie markiert den Moment, in dem sich die Ausgangslage qualitativ veraendert.

**Erkennungszeichen:**
- Temporale Marker: "ploetzlich", "von da an", "daraufhin", "aber dann"
- Zustandswechsel: vorher/nachher-Kontrast in der Handlung
- Zuspitzung eines Konflikts

**Fallbeispiele:**

| # | Complication | Typ | Begruendung |
|---|---|---|---|
| N1 | "Doch dann starb Kaiser Friedrich III. nach nur 99 Tagen — und mit ihm die Hoffnung auf Reformen." | narrativ | Zaesur (Tod) veraendert politische Lage qualitativ |
| N2 | "Aber die Soldaten weigerten sich, weiter zu kaempfen." | narrativ | Wendepunkt: Gehorsam → Verweigerung |
| N3 | "Der Waffenstillstand brachte jedoch keinen Frieden — im Gegenteil." | narrativ | Erwartungsbruch: Ende des Krieges ≠ Ende des Konflikts |

---

### konzeptuell

**Definition:** Die Complication antwortet auf eine Warum- oder Wie-Frage zu Strukturen, Begriffen oder Zusammenhaengen. Sie problematisiert ein Konzept, das die Schueler verstehen muessen.

**Erkennungszeichen:**
- Abstraktion: "Das lag daran, dass...", "Der Grund war..."
- Kategorialer Bruch: Ein erwartetes Muster gilt nicht
- Konzeptuelle Paradoxie: Zwei Dinge, die gleichzeitig gelten, sich aber zu widersprechen scheinen

**Fallbeispiele:**

| # | Complication | Typ | Begruendung |
|---|---|---|---|
| K1 | "Aber warum konnten sich die Arbeiter nicht einfach wehren? Gewerkschaften waren verboten, Streiks strafbar." | konzeptuell | Problematisiert Struktur (Rechtsordnung), nicht Ereignis |
| K2 | "Das Problem: 'Fortschritt' bedeutete fuer Fabrikbesitzer und Arbeiter voellig unterschiedliche Dinge." | konzeptuell | Begriffliche Ambiguitaet als didaktisches Problem |
| K3 | "Alle sprachen von 'Nation' — aber jeder meinte etwas anderes." | konzeptuell | Konzept-Analyse: Was bedeutet der Begriff? |

---

### kontrastiv

**Definition:** Die Complication stellt zwei Positionen, Perspektiven oder Zustaende gegenueber, deren Unterschied die Problematisierung erzeugt.

**Erkennungszeichen:**
- Expliziter Vergleich: "waehrend... dagegen...", "auf der einen Seite... auf der anderen..."
- Perspektivwechsel: Zwei Akteure sehen dasselbe unterschiedlich
- Raum-/Zeitvergleich: Hier vs. dort, damals vs. heute

**Fallbeispiele:**

| # | Complication | Typ | Begruendung |
|---|---|---|---|
| KO1 | "In den Fabriken schufteten Kinder 14 Stunden am Tag — waehrend die Fabrikbesitzer von 'Wohlstand fuer alle' sprachen." | kontrastiv | Gegenueber: Realitaet Arbeiter vs. Narrativ Besitzer |
| KO2 | "In England war die Industrialisierung laengst im Gang. In Bayern dagegen pfluegte man noch mit Ochsen." | kontrastiv | Raumvergleich: England vs. Bayern |
| KO3 | "Die Verfassung versprach Freiheit — die Realitaet sah anders aus." | kontrastiv | Norm vs. Wirklichkeit |

---

### kausal

**Definition:** Die Complication benennt eine Ursache-Wirkung-Beziehung, deren Erkenntnis fuer das Verstaendnis des Problems notwendig ist.

**Erkennungszeichen:**
- Kausale Konnektoren: "weil", "deshalb", "die Folge war", "das fuehrte dazu"
- Kettenwirkung: A → B → C
- Unbeabsichtigte Konsequenz: Eine Handlung fuehrt zu unerwartetem Ergebnis

**Fallbeispiele:**

| # | Complication | Typ | Begruendung |
|---|---|---|---|
| KA1 | "Weil die Ernten schlecht waren, zogen Tausende in die Staedte — und fanden dort noch schlechtere Bedingungen vor." | kausal | Push-Pull-Kette mit unbeabsichtigter Konsequenz |
| KA2 | "Die Buendnisse sollten den Frieden sichern. Doch genau sie machten den Krieg unausweichlich." | kausal | Unbeabsichtigte Konsequenz: Sicherheit → Eskalation |
| KA3 | "Die Maschinen ersetzten die Handwerker — nicht weil sie besser arbeiteten, sondern weil sie billiger waren." | kausal | Kausale Erklaerung einer Strukturveraenderung |

---

## 3. Entscheidungsbaum bei Ambiguitaet

Viele Complications erfuellen oberflaechlich mehrere Typen. Die Zuweisungsregel ist:

**Primaer-Funktion-Test:** Welche didaktische Funktion soll diese Complication im SCPL-Kontext PRIMAER erfuellen?

```
1. Ist die Complication PRIMAER ein Szenen-Wendepunkt
   (die Handlung aendert ihre Richtung)?
   → JA: narrativ
   → NEIN: weiter

2. Stellt die Complication PRIMAER zwei Positionen/Zustaende
   EXPLIZIT gegenueber?
   → JA: kontrastiv
   → NEIN: weiter

3. Benennt die Complication PRIMAER eine Ursache-Wirkung-Kette
   (A fuehrt zu B)?
   → JA: kausal
   → NEIN: weiter

4. Problematisiert die Complication PRIMAER ein Konzept, einen
   Begriff oder eine Struktur (Warum-Frage)?
   → JA: konzeptuell
```

**Reihenfolge-Logik:** Der Baum priorisiert vom Konkreten (narrativ: Szene) ueber das Vergleichende (kontrastiv: zwei Seiten) und das Erklaerende (kausal: Ursache→Wirkung) zum Abstrakten (konzeptuell: Struktur/Begriff). Bei echtem Gleichstand: den Typ waehlen, der naeher am Schueler-Erlebnis liegt (narrativ > kontrastiv > kausal > konzeptuell).

---

## 4. Grenzfall-Beispiele (disambiguiert)

| Complication | Kandidaten | Entscheidung | Begruendung |
|---|---|---|---|
| "Die Arbeiter verarmten — weil die Arbeiterbewegung noch nicht organisiert war." | narrativ + kausal | **kausal** | Primaer-Funktion = Erklaerung (warum Verarmung). Verarmung ist hier nicht Wendepunkt, sondern Zustand. |
| "Ploetzlich standen sich Vater und Sohn auf verschiedenen Seiten der Barrikade gegenueber." | narrativ + kontrastiv | **narrativ** | Primaer-Funktion = Wendepunkt (ploetzlich). Die Gegenueberstellung illustriert den Wendepunkt, erzeugt ihn nicht. |
| "In den Kolonien galt das Recht der Staerkeren — obwohl man in Europa von Menschenrechten sprach." | kontrastiv + konzeptuell | **kontrastiv** | Primaer-Funktion = explizite Gegenueberstellung (Kolonie vs. Europa). Die konzeptuelle Ebene (Menschenrechts-Paradox) ist sekundaer. |
| "Die neue Verfassung sollte Freiheit bringen. Aber was genau 'Freiheit' bedeutete, war voellig unklar." | narrativ + konzeptuell | **konzeptuell** | Primaer-Funktion = Begriffs-Problematisierung. Der "Aber"-Marker taeuscht narrativen Wendepunkt vor, ist aber konzeptuell. |

---

## 5. Validierungsregel (QH3-Ergaenzung)

Ein Complication-Eintrag ist QH3-konform, wenn:

1. **Genau 1 Typ** aus dem Enum zugewiesen ist
2. Der Typ dem Primaer-Funktion-Test (§3) standhält — ein Reviewer kann anhand des Entscheidungsbaums nachvollziehen, warum dieser Typ und nicht ein anderer gewaehlt wurde
3. Der Typ zum Ordnungsmuster der Mappe passt (Konsistenz-Heuristik: chronologisch → haeufiger narrativ; kategorial → haeufiger konzeptuell/kontrastiv; parallel-kausal → haeufiger kausal). Abweichungen sind erlaubt, aber nicht die Regel.

**Konsistenz-Heuristik** (KEIN hartes Gate, nur Plausibilitaetspruefung):

| Ordnungsmuster | Erwartete Primaer-Typen | Ungewoehnlich (begruendungspflichtig) |
|---|---|---|
| chronologisch | narrativ, kausal | konzeptuell |
| kategorial | konzeptuell, kontrastiv | narrativ |
| parallel-kausal | kausal, kontrastiv | narrativ |
| kontrastierend | kontrastiv | — |
| sequenziell | narrativ, kausal | kontrastiv |

---

## 6. Aenderungsprotokoll

| Version | Datum | Aenderung |
|---|---|---|
| v1.0 | 2026-04-07 | Initial: Adressiert RA-B-F02 CRITICAL. 4 Typ-Definitionen, Entscheidungsbaum, 4 Grenzfaelle, Konsistenz-Heuristik. |
