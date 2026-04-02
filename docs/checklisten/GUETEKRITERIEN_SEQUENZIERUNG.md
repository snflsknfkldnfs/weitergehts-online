# Guetekriterien Sequenzierung

**Datum:** 2026-03-28
**Status:** v1.1 — SCPL-Korrespondenz + Skript-Primaer-Anker ergaenzt
**Quellen:**
- GPG GB Grundsaetze des GPG-Unterrichts (Artikulationsschemata, Kompetenzstrukturmodell)
- DG B1 Allgemeine Unterrichtsprinzipien (Schroeder, Brunnhuber, Hilbert Meyer)
- GPG B1 Vergegenwärtigung im Geschichtsunterricht (Roth, Besinnungsphasen)
- GPG B2 Fachspezifische Arbeitsweisen — Historische Perspektive (Quellentypologie, Bilderschliessung)
- DG B10 Medieneinsatz im Unterricht (Medienklassifikation, didaktischer Ort)
- Alle: Bausteine Fachdidaktik, AG der MS-Seminarleiter Unterfranken

---

## 1. Leitsatz

> "Strukturierung ist Erhellung von Zusammenhaengen, [...] nicht Aneinanderreihen beziehungsloser Wissenselemente."
> — Brunnhuber, zit. in DG B1

> "Vergegenwärtigung schafft Faktenwissen (Vordergrund), Besinnung schafft Erkenntnisse (Hintergrund). Sachbezogene Besinnung ist Voraussetzung fuer wertbezogene."
> — GPG B1

Die Sequenzierung ist keine organisatorische Sortierung von Materialien. Sie ist die **didaktische Architektur des Lernwegs** — die Entscheidung, in welcher Reihenfolge, mit welcher Funktion und unter welchen Voraussetzungen jedes Material im Escape-Game praesentiert wird. Eine gute Sequenz macht den roten Faden sichtbar, baut Wissen kumulativ auf und fuehrt Schueler:innen vom Konkreten zum Abstrakten, vom Bekannten zum Unbekannten, vom Anschaulichen zum Begrifflichen.

---

## 2. Fachdidaktische Fundierung

### 2.1 Artikulationsschemata als Sequenzlogik

Die Artikulationsschemata der drei GPG-Perspektiven definieren die **Phasenlogik**, die jeder Materialsequenz zugrunde liegen muss. Materialien sind nicht frei kombinierbar — ihre Reihenfolge folgt der inneren Logik des jeweiligen Fachzugangs.

| Perspektive | Phasenfolge | Sequenz-Implikation |
|---|---|---|
| Historisch | Problembegegnung → Vergegenwärtigung → Besinnung → Sicherung | Anschauliches Material (Quellen, Bilder) VOR analytischem Material (Urteilsaufgaben) |
| Geographisch | Hinführung → Situationskonfrontation → Situationsanalyse → Situationsbeurteilung → Sicherung | Konkreter Fall VOR allgemeiner Analyse VOR Bewertung |
| Sozialpolitisch | Problemstellung → Problementfaltung → Problemlösung → Wertung → Sicherung | Problem sichtbar machen → Aspekte entfalten → Loesungsansaetze → Bewertung |

**Konsequenz:** AGENT_MATERIAL muss bei der Sequenzplanung das **fachperspektivische Artikulationsschema** der jeweiligen UE als Ordnungsrahmen verwenden. Das Schema wird aus DIDAKTIK_RAHMEN bezogen.

### 2.1b SKRIPT-Reihenfolge als Primaer-Sequenzquelle

Das didaktisierte SKRIPT (Phase 0.3, AGENT_SKRIPT) ist bereits eine sequenzierte Darstellung: Absaetze folgen vom Konkreten zum Abstrakten, Artefakt-Marker sind narrativ positioniert, Fachbegriffe werden bei Erstverwendung eingefuehrt. Da die Materialien direkt aus SKRIPT-Passagen und Artefakt-Markern abgeleitet werden (AGENT_MATERIAL Aufgabe 1.2), traegt die SKRIPT-Reihenfolge eine **implizite Materialsequenz**, die als Primaer-Anker dienen muss.

**Verhaeltnis der drei Ordnungsrahmen:**

| Ordnungsrahmen | Quelle | Funktion | Prioritaet bei Divergenz |
|---|---|---|---|
| SCPL-Aufbau (Tafelbild) | AGENT_HEFTEINTRAG (Phase 0.4) | Sinnstruktur: S→C→P→L = logische Aufbauhierarchie | **Hoechste** — Tafelbild ist Quintessenz |
| SKRIPT-Absatzfolge | AGENT_SKRIPT (Phase 0.3) | Narrative Reihenfolge: konkret→abstrakt, bekannt→unbekannt | **Primaer** — Normalfall |
| Artikulationsschema | DIDAKTIK_RAHMEN (Phase 0.1) | Phasenlogik: Problembegegnung→Vergegenwärtigung→Besinnung→Sicherung | **Validierung** — Prueft Konformitaet |

Im Normalfall stimmen alle drei ueberein, weil AGENT_SKRIPT bereits nach Artikulationsschema und mit TB-Bewusstsein arbeitet. Bei Divergenz gilt: SCPL > SKRIPT > Artikulationsschema als abstrakte Prueflogik.

### 2.2 Vergegenwärtigung-Besinnung-Prinzip

Roths 10 Hauptforderungen an die Vergegenwärtigung (GPG B1) definieren die Qualitaet der fruehen Sequenzphasen:

1. **Geschichte in Handlung rueckverwandeln** — fruehe Materialien muessen narrativ, nicht abstrakt sein
2. **Anschaulichkeit** — konkrete Bilder, Personen, Orte vor allgemeinen Begriffen
3. **Personalisierung** — individuelle Schicksale vor Strukturanalysen
4. **Lokalisierung** — raeumliche Verortung vor zeitlicher Abstraktion
5. **Zeittiefe** — temporale Einordnung als Orientierungsrahmen
6. **Elementarisierung** — Komplexes auf Kernaspekte reduziert, bevor Differenzierung folgt

**Strukturregel:** Materialien mit Vergegenwärtigungsfunktion (narrativ, anschaulich, personalisiert) MUESSEN in der Sequenz VOR Materialien mit Besinnungsfunktion (analytisch, urteilend, abstrahierend) stehen. Sachbezogene Besinnung vor wertbezogener Besinnung.

### 2.3 Vorwissen-Gebot bei Quellenarbeit

GPG B2 stellt klar: Textquellen und Bildquellen setzen Kontextwissen voraus.

- **Textquellen:** "Das Vorwissen muss bei den Schuelern vorhanden sein" — ein Quellentext darf nicht das erste Material einer Sequenz sein, es sei denn, er dient ausschliesslich der Problembegegnung (dann: kurz, provokant, ohne Analyseanspruch)
- **Bildquellen heuristisch:** Bilder in heuristischer Funktion (Entdeckungsfunktion) benoetigen vorbereitenden Kontext; Bilder in illustrativer Funktion (Bestaetigungsfunktion) koennen spaeter stehen
- **Verlaufsstruktur Bilderschliessung:** 6 Stufen (Spontaneindruck → Beschreibung → Analyse → Interpretation → Bewertung → Transfer) — diese Stufen muessen durch die Sequenzposition ermoerglicht werden

**Konsequenz:** Quellenarbeit-Materialien erfordern vorangestellte Kontextmaterialien. Die Sequenz muss sicherstellen, dass zum Zeitpunkt der Quellenarbeit das noetige Vorwissen verfuegbar ist.

### 2.4 Medien nach didaktischem Ort

DG B10 klassifiziert Medien nach ihrer Funktion im Unterrichtsverlauf:

| Didaktischer Ort | Medienfunktion | Sequenzposition |
|---|---|---|
| Motivation | Interesse wecken, Vorwissen aktivieren | Position 1-2 |
| Erarbeitung | Neues Wissen vermitteln, Fachbegriffe einfuehren | Mittlere Positionen |
| Sicherung | Gelerntes strukturieren und fixieren | Spaete Positionen |
| Transfer | Auf neuen Kontext uebertragen | Letzte Position(en) |
| Kontrolle | Lernstand pruefen | Nach Sicherung oder als Abschluss |

**Konsequenz:** Die `didaktische_funktion` (Enum: einstieg, erarbeitung, vertiefung, sicherung, transfer) muss mit der Sequenzposition korrelieren. Sicherungsmaterial darf nicht vor Erarbeitungsmaterial stehen.

### 2.5 Allgemeine Unterrichtsprinzipien als Sequenzregeln

Aus DG B1 (Schroeder, Brunnhuber, Hilbert Meyer) leiten sich uebergreifende Sequenzprinzipien ab:

| Prinzip | Quelle | Sequenz-Implikation |
|---|---|---|
| Strukturierung | Brunnhuber | Beziehungshaftes, nicht beziehungsloses Wissen — jedes Material baut auf dem vorherigen auf |
| Aktivierung | Brunnhuber/Meyer | Einstiegsmaterial muss Vorwissen aktivieren und Neugier wecken |
| Elementarisierung | Schroeder | Einfaches vor Komplexem, Bekanntes vor Unbekanntem |
| Zielgemässheit | Schroeder | Jedes Material dient einem erkennbaren Lernziel (TB-Knoten) |
| Angemessenheit | Brunnhuber | Materialanspruch steigt progressiv (nicht sprunghaft) |
| Methodenvielfalt | Meyer | Sequenz sollte verschiedene Materialtypen enthalten, nicht nur einen |
| Leistungssicherung | Brunnhuber | Sicherung am Ende, nicht beilaeufig oder fehlend |

---

## 3. Abgrenzung: Sequenzierung vs. Sequenz-Kohaerenz

Zwei Q-Gate-Ebenen regeln die Materialsequenz in dieser Infrastruktur:

| Ebene | Verantwortlich | Dokument | Kriterien |
|---|---|---|---|
| **Sequenzplanung** (Makro) | AGENT_MATERIAL, Aufgabe 1.9 | GUETEKRITERIEN_SEQUENZIERUNG.md (dieses Dokument) | S1-S15: Reihenfolge, Funktionszuweisung, Progressionslogik |
| **Sequenz-Kohaerenz** (Mikro) | SUB_MATERIAL_* (alle Subagenten) | Jeweilige SUB_MATERIAL_*.md | SQ-1 bis SQ-4: Einzelmaterial-Pruefung gegen Sequenzplan |

S1-S15 pruefen, ob der **Plan** didaktisch korrekt ist. SQ-1 bis SQ-4 pruefen, ob jedes **produzierte Material** den Plan einhält. Beide Ebenen sind komplementaer — keine ersetzt die andere.

---

## 4. Guetekriterien-Katalog

Gewichtete Kriterien fuer den AGENT_MATERIAL Q-Gate bei Aufgabe 1.9. Drei Prioritaetsstufen: **MUSS** (Verletzung = FAIL), **SOLL** (Verletzung = Nachbesserung), **KANN** (Empfehlung).

### MUSS-Kriterien

| # | Kriterium | Operationalisierung | Herkunft |
|---|---|---|---|
| S1 | **Artikulationsschema-Konformitaet** | Sequenz folgt dem Artikulationsschema der zutreffenden GPG-Perspektive (historisch/geographisch/sozialpolitisch). Phasenfolge darf nicht verletzt werden. | GPG GB Artikulationsschemata |
| S2 | **Vorwissen-Progression** | Kein Material referenziert Konzepte oder Fachbegriffe, die nicht durch ein vorheriges Material (niedrigere Position) oder durch explizites Vorwissen aus vorherigen Mappen eingefuehrt wurden. | GPG B2 + Brunnhuber Strukturierung |
| S3 | **TB-Knoten-Abdeckung** | Jeder TB-Knoten aus dem fixierten TAFELBILD hat mindestens 1 zugeordnetes Material im Sequenzplan. Kein Knoten bleibt ohne Erarbeitungsweg. | Analogie zu G3 (Erarbeitbarkeit) |
| S4 | **Didaktische-Funktion-Sequenzlogik** | Die didaktischen Funktionen folgen einer gültigen Reihenfolge: einstieg → erarbeitung → vertiefung → sicherung → transfer. Kein sicherung-Material vor dem letzten erarbeitung-Material. Kein transfer-Material vor sicherung. | DG B10 Didaktischer Ort + Artikulationsschemata |
| S5 | **Vergegenwärtigung vor Besinnung** | Materialien mit narrativ-anschaulichem Charakter (Darstellungstext, Bildquelle illustrativ, Tagebucheintrag) stehen VOR Materialien mit analytisch-urteilendem Charakter (Quellentext mit Analyseauftrag, Bildquelle heuristisch mit Interpretationsauftrag). | GPG B1 Roth + Vergegenwärtigung/Besinnung-Prinzip |
| S6 | **Sequenzkontext-Vollstaendigkeit** | Jedes Material hat ein vollstaendiges `sequenz_kontext`-Objekt mit `vorher` (leer nur bei Position 1) und `nachher` (leer nur bei letzter Position). | AGENT_MATERIAL Aufgabe 1.9.5 |
| S14 | **SCPL-Korrespondenz** | Die Materialreihenfolge korrespondiert mit dem SCPL-Aufbau des Tafelbilds: Materialien, die Situation-Knoten (S) erarbeiten, stehen vor Complication-Knoten (C), diese vor Problem-Knoten (P), diese vor Loesung-Knoten (L). Bei Materialien, die mehrere Knoten bedienen, zaehlt der primaere TB-Knoten. | Tafelbild-Sinnstruktur als didaktischer Aufbaurahmen |
| S15 | **Skript-Kongruenz** | Die Materialreihenfolge folgt der Absatzfolge im SKRIPT, soweit diese nicht gegen S14 (SCPL-Korrespondenz) verstoesst. Abweichungen von der SKRIPT-Reihenfolge sind nur mit expliziter Begruendung zulaessig. | AGENT_SKRIPT liefert implizite didaktische Sequenz |

### SOLL-Kriterien

| # | Kriterium | Operationalisierung | Herkunft |
|---|---|---|---|
| S7 | **Vom Anschaulichen zum Abstrakten** | Die Sequenz bewegt sich tendenziell von konkreten, anschaulichen Materialien (Bilder, Erzaehlungen, Fallbeispiele) zu abstrakteren Materialien (Begriffsarbeit, Strukturanalyse, Transfer). Messbar: durchschnittlicher Abstraktionsgrad der ersten Haelfte < zweite Haelfte. | DG B10 Anschaulichkeitsprinzip + Schroeder Elementarisierung |
| S8 | **Kontextgebot Quellenarbeit** | Quellentext- und Bildquellen-Materialien (Typ: quellentext, bildquelle) stehen NICHT an Position 1, es sei denn ihre didaktische Funktion ist `einstieg` mit reiner Problembegegnungs-Intention (kein Analyseauftrag). Vor jeder Quellenarbeit steht mindestens 1 kontextgebendes Material. | GPG B2 Vorwissen-Gebot |
| S9 | **Uebergangs-Kohaerenz** | Jede Ueberleitung (Aufgabe 1.9.4) ist inhaltlich motiviert — sie benennt, was das vorherige Material ergeben hat und welche Frage/welchen Aspekt das naechste Material aufgreift. Rein formale Ueberleitungen ("Als naechstes...") sind unzureichend. | Brunnhuber Strukturierung + Meyer Sinnstiftendes Kommunizieren |
| S10 | **Aktivierung am Sequenzbeginn** | Das erste Material (Position 1) hat die didaktische Funktion `einstieg` und aktiviert Vorwissen oder weckt Neugier. Es fuehrt KEINE neuen Fachbegriffe ein. | Brunnhuber Aktivierung + Meyer Lernfoerderliches Klima |

### KANN-Kriterien

| # | Kriterium | Operationalisierung | Herkunft |
|---|---|---|---|
| S11 | **Materialtyp-Vielfalt** | Die Sequenz einer Mappe enthaelt mindestens 2 verschiedene Materialtypen (z.B. darstellungstext + bildquelle, nicht nur darstellungstext + darstellungstext). | Meyer Methodenvielfalt |
| S12 | **Sprachregister-Progression** | Das Sprachregister der Materialien passt sich dem Themencharakter an und steigert sich progressiv: erfahrungsbezogen-narrativ → fachbegrifflich-analytisch → bilanzierend-urteilend. | Empirie GUETEKRITERIEN_HEFTEINTRAG_ENTWURF (Abschnitt 3.5) |
| S13 | **Personalisierung in Fruehphase** | Mindestens 1 Material in der ersten Sequenzhaelfte hat einen personalisierten Zugang (individuelle Perspektive, Identifikationsfigur, Tagebuch, Brief). | Roth Personalisierung + Vergegenwärtigung |

---

## 5. Q-Gate-Protokoll

```markdown
### Q-Gate: Sequenzplan Mappe [N]

| # | Kriterium | Prio | Ergebnis | Detail |
|---|---|---|---|---|
| S1 | Artikulationsschema-Konformitaet | MUSS | PASS/FAIL | Schema: [historisch/geographisch/sozialpolitisch], Phasenfolge eingehalten |
| S2 | Vorwissen-Progression | MUSS | PASS/FAIL | Alle Fachbegriffe durch vorherige Materialien gedeckt |
| S3 | TB-Knoten-Abdeckung | MUSS | PASS/FAIL | [N]/[M] Knoten abgedeckt, fehlend: [Liste] |
| S4 | Didaktische-Funktion-Sequenzlogik | MUSS | PASS/FAIL | Reihenfolge: [einstieg → erarbeitung → ... → transfer] |
| S5 | Vergegenwärtigung vor Besinnung | MUSS | PASS/FAIL | Narrativ-anschaulich: Positionen [X], Analytisch: Positionen [Y] |
| S6 | Sequenzkontext-Vollstaendigkeit | MUSS | PASS/FAIL | [N]/[M] Objekte vollstaendig |
| S14 | SCPL-Korrespondenz | MUSS | PASS/FAIL | S-Knoten: Pos. [X], C-Knoten: Pos. [Y], P-Knoten: Pos. [Z], L-Knoten: Pos. [W] |
| S15 | Skript-Kongruenz | MUSS | PASS/FAIL | [N]/[M] Materialien folgen SKRIPT-Reihenfolge, Abweichungen: [Liste] |
| S7 | Vom Anschaulichen zum Abstrakten | SOLL | PASS/FAIL | Abstraktionsgrad 1. Haelfte: [X], 2. Haelfte: [Y] |
| S8 | Kontextgebot Quellenarbeit | SOLL | PASS/FAIL | Quellenarbeit an Pos. [X], Kontext an Pos. [Y] |
| S9 | Uebergangs-Kohaerenz | SOLL | PASS/FAIL | [N]/[M] Ueberleitungen inhaltlich motiviert |
| S10 | Aktivierung am Sequenzbeginn | SOLL | PASS/FAIL | Pos. 1: Funktion [X], Fachbegriffe eingefuehrt: [ja/nein] |
| S11 | Materialtyp-Vielfalt | KANN | PASS/FAIL | Typen: [Liste], Anzahl verschiedener: [N] |
| S12 | Sprachregister-Progression | KANN | PASS/FAIL | Progression erkennbar: [ja/nein] |
| S13 | Personalisierung in Fruehphase | KANN | PASS/FAIL | Personalisiertes Material an Pos. [X] |
**Gesamt:** PASS / FAIL (S[X] nachgebessert)
```

---

## 6. Q-Gate-Operationalisierung (maschinell pruefbar)

Konkrete Prueflogik fuer jedes Kriterium, damit AGENT_MATERIAL das Q-Gate autonom ausfuehren kann.

### S1: Artikulationsschema-Konformitaet (MUSS)

**Input-Daten:** `DIDAKTIK_RAHMEN.perspektive` (historisch/geographisch/sozialpolitisch), Sequenzplan-Tabelle
**Prueflogik:**
1. Bestimme das Artikulationsschema aus `DIDAKTIK_RAHMEN.perspektive`
2. Ordne jede Sequenzposition einer Phase des Schemas zu:
   - Historisch: `einstieg` → Problembegegnung, `erarbeitung` (narrativ) → Vergegenwärtigung, `erarbeitung` (analytisch) + `vertiefung` → Besinnung, `sicherung` → Sicherung
   - Geographisch: `einstieg` → Hinführung/Situationskonfrontation, `erarbeitung` → Situationsanalyse, `vertiefung` → Situationsbeurteilung, `sicherung` → Sicherung
   - Sozialpolitisch: `einstieg` → Problemstellung, `erarbeitung` → Problementfaltung, `vertiefung` → Problemloesung/Wertung, `sicherung` → Sicherung
3. Pruefe: Ist die Zuordnung monoton aufsteigend? (Keine spaetere Phase vor einer frueheren)
**FAIL wenn:** Phasenfolge verletzt (z.B. Besinnung vor Vergegenwärtigung)
**Nachbesserung:** Material umpositionieren oder didaktische Funktion anpassen

### S2: Vorwissen-Progression (MUSS)

**Input-Daten:** Sequenzplan-Tabelle, pro Material: Liste der referenzierten Fachbegriffe/Konzepte, pro Material: Liste der eingefuehrten Fachbegriffe/Konzepte, `tafelbild.voraussetzungen[]` (Vorwissen aus vorherigen Mappen)
**Prueflogik:**
1. Initialisiere `verfuegbares_wissen` = Menge aus `tafelbild.voraussetzungen[]`
2. Iteriere ueber Materialien in Sequenzreihenfolge (Position 1 → N):
   a. Pruefe: Alle referenzierten Konzepte dieses Materials ⊆ `verfuegbares_wissen`?
   b. Fuege die durch dieses Material eingefuehrten Konzepte zu `verfuegbares_wissen` hinzu
3. Erstelle Verletzungsliste: `[(Material-ID, Konzept, fehlt_seit_Position)]`
**FAIL wenn:** Verletzungsliste nicht leer
**Nachbesserung:** Material umpositionieren (Konzept-einfuehrendes Material vor Konzept-referenzierendes) ODER fehlendes Konzept als Vorwissen in Mappen-Voraussetzungen deklarieren (nur bei echtem Vorwissen aus vorheriger Mappe)

### S3: TB-Knoten-Abdeckung (MUSS)

**Input-Daten:** `tafelbild.scpl` (alle inhaltlichen Elemente), Sequenzplan-Spalte `TB-Knoten`
**Prueflogik:**
1. Extrahiere alle TB-Knoten-IDs aus TAFELBILD (kN-1, kN-2, ...)
2. Extrahiere alle referenzierten TB-Knoten-IDs aus Sequenzplan-Spalte `TB-Knoten`
3. Bilde Differenz: `fehlende_knoten` = TB-Knoten − Sequenzplan-Knoten
**FAIL wenn:** `fehlende_knoten` nicht leer
**Nachbesserung:** Fuer jeden fehlenden Knoten: Bestehendes Material erweitern ODER neues Material ergaenzen

### S4: Didaktische-Funktion-Sequenzlogik (MUSS)

**Input-Daten:** Sequenzplan-Spalte `Didaktische Funktion`, Sequenzplan-Spalte `#` (Position)
**Prueflogik:**
1. Definiere gueltige Reihenfolge: `einstieg` < `erarbeitung` < `vertiefung` < `sicherung` < `transfer`
2. Fuer jedes Materialpaar (i, j) mit Position(i) < Position(j): Pruefe, ob `funktion(i) ≤ funktion(j)` (Monotonie)
3. Ausnahme: Mehrere `erarbeitung`-Materialien hintereinander sind erlaubt (Parallelstruktur bei mehreren TB-Knoten)
4. Ausnahme: `vertiefung` darf nach `sicherung` stehen, wenn es sich um Transfer-Vertiefung handelt (dann muss `didaktische_funktion` = `transfer` sein, nicht `vertiefung`)
**FAIL wenn:** `sicherung` vor letztem `erarbeitung` ODER `transfer` vor `sicherung`
**Nachbesserung:** Funktion korrigieren oder Material umpositionieren

### S5: Vergegenwärtigung vor Besinnung (MUSS)

**Input-Daten:** Sequenzplan + Materialtypen + didaktische Funktionen
**Prueflogik:**
1. Klassifiziere jedes Material:
   - **Vergegenwärtigung:** darstellungstext, tagebuch, bildquelle (illustrativ), zeitleiste
   - **Besinnung (sachbezogen):** quellentext (Analyse), bildquelle (heuristisch mit Interpretationsauftrag)
   - **Besinnung (wertbezogen):** Materialien mit Bewertungs-/Urteilsauftrag
2. Pruefe Reihenfolge: min(Position Vergegenwärtigung) < min(Position sachbezogene Besinnung) < min(Position wertbezogene Besinnung)
3. Toleranz: Wenn Mappe nur 2-3 Materialien hat, genuegt Vergegenwärtigung vor Besinnung (Unterscheidung sachbezogen/wertbezogen entfaellt)
**FAIL wenn:** Erste Besinnung vor erster Vergegenwärtigung
**Nachbesserung:** Vergegenwärtigung-Material vorziehen oder Besinnungs-Material zurueckstellen

### S6: Sequenzkontext-Vollstaendigkeit (MUSS)

**Input-Daten:** Sequenzplan, pro Material: `sequenz_kontext`-Objekt
**Prueflogik:**
1. Fuer jedes Material pruefe:
   - `sequenz_kontext.vorher` vorhanden und korrekt (Material-ID, Typ, Kerninhalt)
   - `sequenz_kontext.nachher` vorhanden und korrekt
   - Ausnahme Position 1: `vorher` darf leer sein
   - Ausnahme letzte Position: `nachher` darf leer sein
2. Pruefe Konsistenz: `vorher` von Material N muss mit `nachher` von Material N-1 uebereinstimmen
**FAIL wenn:** Ein Objekt fehlt oder ist inkonsistent
**Nachbesserung:** Fehlende Objekte generieren, Inkonsistenzen aufloesen

### S7: Vom Anschaulichen zum Abstrakten (SOLL)

**Input-Daten:** Sequenzplan + Materialtypen
**Prueflogik:**
1. Ordne jedem Materialtyp einen Abstraktionsgrad zu:
   - 1 (konkret): bildquelle, tagebuch
   - 2 (narrativ): darstellungstext, zeitleiste
   - 3 (analytisch): quellentext
   - 4 (abstrakt): Begriffsarbeit, Strukturdiagramm
2. Berechne Durchschnitt der ersten Haelfte und der zweiten Haelfte
3. Erwartung: Durchschnitt(1. Haelfte) ≤ Durchschnitt(2. Haelfte)
**FAIL wenn:** Durchschnitt(1. Haelfte) > Durchschnitt(2. Haelfte) + 0.5
**Nachbesserung:** Konkrete Materialien nach vorne, abstrakte nach hinten verschieben

### S8: Kontextgebot Quellenarbeit (SOLL)

**Input-Daten:** Sequenzplan, Materialtypen
**Prueflogik:**
1. Identifiziere alle Materialien mit Typ `quellentext` oder `bildquelle` (heuristisch)
2. Fuer jedes solche Material an Position P:
   - Pruefe: Gibt es mindestens 1 Material an Position < P mit Typ ∈ {darstellungstext, zeitleiste, tagebuch}?
   - Ausnahme: Material hat `didaktische_funktion` = `einstieg` UND keinen Analyseauftrag
3. Erstelle Verletzungsliste
**FAIL wenn:** Quellenarbeit ohne vorheriges Kontextmaterial (und keine Einstiegs-Ausnahme)
**Nachbesserung:** Kontextmaterial vor Quellenarbeit einfuegen oder Quellenarbeit zurueckpositionieren

### S9: Uebergangs-Kohaerenz (SOLL)

**Input-Daten:** Ueberleitungstexte aus Sequenzplan
**Prueflogik:**
1. Fuer jede Ueberleitung (ab Position 2) pruefe:
   - Enthaelt die Ueberleitung einen Rueckbezug auf das Ergebnis/den Inhalt des vorherigen Materials?
   - Enthaelt sie einen Vorausblick auf die Fragestellung/den Aspekt des naechsten Materials?
   - Ist sie laenger als 8 Woerter? (Mindestsubstanz)
2. Klassifiziere: `inhaltlich_motiviert` vs. `rein_formal`
**FAIL wenn:** > 50% der Ueberleitungen `rein_formal`
**Nachbesserung:** Formale Ueberleitungen durch inhaltliche ersetzen

### S10: Aktivierung am Sequenzbeginn (SOLL)

**Input-Daten:** Material an Position 1
**Prueflogik:**
1. `didaktische_funktion` == `einstieg`?
2. Material fuehrt 0 neue Fachbegriffe ein? (Fachbegriffe erst ab Position 2)
3. Material hat aktivierenden Charakter? (Frage, Bild, Provokation, Hypothese — nicht Lehrtext)
**FAIL wenn:** Position 1 ist kein Einstieg ODER fuehrt Fachbegriffe ein
**Nachbesserung:** Einstiegsmaterial vorschalten oder Position-1-Material entfachbegrifflichen

### S11: Materialtyp-Vielfalt (KANN)

**Prueflogik:** `len(set(materialtypen))` ≥ 2
**Kein FAIL moeglich** — nur Empfehlung bei Monokultur.

### S12: Sprachregister-Progression (KANN)

**Prueflogik:** Sprachregister der Materialien korreliert mit Themencharakter und steigt progressiv an (vgl. GUETEKRITERIEN_HEFTEINTRAG_ENTWURF Abschnitt 3.5).
**Kein FAIL moeglich** — nur Dokumentation.

### S13: Personalisierung in Fruehphase (KANN)

**Prueflogik:** Mindestens 1 Material in Position 1 bis ⌈N/2⌉ hat Typ `tagebuch` ODER Materialinhalt mit individueller Perspektive/Identifikationsfigur.
**Kein FAIL moeglich** — nur Empfehlung.

### S14: SCPL-Korrespondenz (MUSS)

**Input-Daten:** Sequenzplan-Tabelle (Spalte TB-Knoten), TAFELBILD.scpl (Situation, Complication, Problem, Loesung), TAFELBILD.knoten[]
**Prueflogik:**
1. Ordne jeden TB-Knoten einer SCPL-Phase zu:
   - Knoten, deren Inhalt im `scpl.situation`-Block steht oder deren Fachbegriffe dort erscheinen: **S**
   - Knoten, deren Inhalt in `scpl.complication[]`-Schritten steht: **C**
   - Knoten, deren Inhalt in `scpl.problem` steht: **P**
   - Knoten, deren Inhalt in `scpl.loesung[]` steht: **L**
2. Fuer jedes Material im Sequenzplan: Bestimme die SCPL-Phase seines primaeren TB-Knotens
3. Pruefe Monotonie: S-Materialien haben niedrigere Positionen als C-Materialien, C < P, P < L
4. Toleranz: Materialien mit reiner `einstieg`-Funktion (Position 1) sind phasen-neutral
5. Toleranz: Materialien, die sowohl S- als auch C-Knoten bedienen, werden nach ihrem primaeren Knoten eingeordnet
**FAIL wenn:** Ein P-Material steht vor dem letzten C-Material ODER ein L-Material vor dem letzten P-Material
**Nachbesserung:** Material umpositionieren, sodass SCPL-Aufbau monoton ist. Alternativ: primaere Knoten-Zuordnung pruefen

### S15: Skript-Kongruenz (MUSS)

**Input-Daten:** Sequenzplan-Tabelle, SKRIPT (Artefakt-Zuordnungstabelle pro Chunk, Absatzreihenfolge)
**Prueflogik:**
1. Fuer jedes Material: Bestimme die Quell-Passage im SKRIPT (Artefakt-Marker oder Absatz-Referenz aus MATERIAL_GERUEST)
2. Ordne jedem Material einen SKRIPT-Index zu (Reihenfolge des Auftretens im SKRIPT-Chunk)
3. Pruefe: Ist die Sequenzplan-Reihenfolge kongruent mit der SKRIPT-Index-Reihenfolge?
4. Abweichungen dokumentieren mit Begruendung (z.B. "S14: SCPL-Korrespondenz erfordert Umstellung")
**FAIL wenn:** Mehr als 2 Materialien von der SKRIPT-Reihenfolge abweichen UND keine Begruendung vorliegt
**Nachbesserung:** Begruendung nachliefern ODER Reihenfolge an SKRIPT anpassen (sofern S14 nicht verletzt)

---

## 7. Zusammenspiel mit bestehender Infrastruktur

### 7.1 Eingabe fuer Aufgabe 1.9

AGENT_MATERIAL erhaelt:
- Validierter Blueprint (Aufgabe 1.1-1.8): Material-IDs, Typen, TB-Knoten-Zuordnungen
- Fixiertes TAFELBILD: Knoten-Struktur, Kernerkenntnisse, Ordnungsmuster
- SKRIPT: Didaktisiertes Narrativ mit Chunk-Struktur
- DIDAKTIK_RAHMEN: Perspektive, KE-Matrix, Lernziele
- Dieses Dokument: S1-S15 als Pruefrahmen

### 7.2 Ausgabe nach Aufgabe 1.9

Der Sequenzplan (Tabelle + Ueberleitungen + Sequenzkontext-Objekte) wird durch das Q-Gate S1-S15 geprueft. Nur bei PASS aller MUSS-Kriterien geht der Plan weiter an Aufgabe 1.10 (User-Validierung).

### 7.3 Weiterleitung an Subagenten

Nach User-Validierung (Phase 1.5 Gate) werden die `sequenz_kontext`-Objekte an die Subagenten (SUB_MATERIAL_*) uebergeben. Diese pruefen ihrerseits SQ-1 bis SQ-4 (Sequenz-Kohaerenz auf Einzelmaterial-Ebene). Die Subagenten-Pruefung setzt den validierten Sequenzplan voraus.

### 7.4 Namenskonvention Q-Gates

| Praefix | Ebene | Dokument |
|---|---|---|
| G1-G14 | Tafelbild | GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md |
| S1-S15 | Sequenzplanung | GUETEKRITERIEN_SEQUENZIERUNG.md (dieses Dokument) |
| SQ-1 bis SQ-4 | Sequenz-Kohaerenz (Subagent) | SUB_MATERIAL_*.md |
| A1-A?+ | Aufgaben (v3.4) | GUETEKRITERIEN_AUFGABEN.md (geplant) |

---

## 8. Abgrenzung: Was dieses Dokument NICHT regelt

| Nicht-Zustaendigkeit | Zustaendig |
|---|---|
| Materialproduktion (Text, Bild, Format) | SUB_MATERIAL_* |
| Einzelmaterial-Qualitaet | SQ-1 bis SQ-4 in SUB_MATERIAL_*.md |
| Tafelbild-Struktur und Hefteintrag | GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md (G1-G14) |
| Aufgaben-/Raetselqualitaet | GUETEKRITERIEN_AUFGABEN.md (v3.4, geplant) |
| Didaktischer Rahmen (Lernziele, KE) | AGENT_DIDAKTIK |
| Narratives Skript | AGENT_SKRIPT |
| Engine-Rendering | AGENT_TECHNIK |
