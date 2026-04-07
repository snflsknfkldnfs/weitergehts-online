# Guetekriterien Sequenzierung

**Datum:** 2026-04-07
**Status:** v2.0 — Operationalisierungs-Audit: 7 Input-Felder (P1-P6 + P12), deterministische Prueflogik S1/S5/S7/S8/S13/S14/S15
**Quellen:**
- FD-Q1 Grundsaetze des GPG-Unterrichts (Artikulationsschemata, Kompetenzstrukturmodell)
- FD-Q4 Allgemeine Unterrichtsprinzipien (Schroeder, Brunnhuber, Hilbert Meyer)
- FD-Q2 Vergegenwaertigung im Geschichtsunterricht (Roth, Besinnungsphasen)
- FD-Q3 Fachspezifische Arbeitsweisen — Historische Perspektive (Quellentypologie, Bilderschliessung)
- FD-Q5 Medieneinsatz im Unterricht (Medienklassifikation, didaktischer Ort)
- Alle: Fachdidaktische Grundlagentexte (nicht-oeffentlich)

---

## 1. Leitsatz

> "Strukturierung ist Erhellung von Zusammenhaengen, [...] nicht Aneinanderreihen beziehungsloser Wissenselemente."
> — Brunnhuber, zit. in FD-Q4

> "Vergegenwärtigung schafft Faktenwissen (Vordergrund), Besinnung schafft Erkenntnisse (Hintergrund). Sachbezogene Besinnung ist Voraussetzung fuer wertbezogene."
> — FD-Q2

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

Roths 10 Hauptforderungen an die Vergegenwärtigung (FD-Q2) definieren die Qualitaet der fruehen Sequenzphasen:

1. **Geschichte in Handlung rueckverwandeln** — fruehe Materialien muessen narrativ, nicht abstrakt sein
2. **Anschaulichkeit** — konkrete Bilder, Personen, Orte vor allgemeinen Begriffen
3. **Personalisierung** — individuelle Schicksale vor Strukturanalysen
4. **Lokalisierung** — raeumliche Verortung vor zeitlicher Abstraktion
5. **Zeittiefe** — temporale Einordnung als Orientierungsrahmen
6. **Elementarisierung** — Komplexes auf Kernaspekte reduziert, bevor Differenzierung folgt

**Strukturregel:** Materialien mit Vergegenwärtigungsfunktion (narrativ, anschaulich, personalisiert) MUESSEN in der Sequenz VOR Materialien mit Besinnungsfunktion (analytisch, urteilend, abstrahierend) stehen. Sachbezogene Besinnung vor wertbezogener Besinnung.

### 2.3 Vorwissen-Gebot bei Quellenarbeit

FD-Q3 stellt klar: Textquellen und Bildquellen setzen Kontextwissen voraus.

- **Textquellen:** "Das Vorwissen muss bei den Schuelern vorhanden sein" — ein Quellentext darf nicht das erste Material einer Sequenz sein, es sei denn, er dient ausschliesslich der Problembegegnung (dann: kurz, provokant, ohne Analyseanspruch)
- **Bildquellen heuristisch:** Bilder in heuristischer Funktion (Entdeckungsfunktion) benoetigen vorbereitenden Kontext; Bilder in illustrativer Funktion (Bestaetigungsfunktion) koennen spaeter stehen
- **Verlaufsstruktur Bilderschliessung:** 6 Stufen (Spontaneindruck → Beschreibung → Analyse → Interpretation → Bewertung → Transfer) — diese Stufen muessen durch die Sequenzposition ermoerglicht werden

**Konsequenz:** Quellenarbeit-Materialien erfordern vorangestellte Kontextmaterialien. Die Sequenz muss sicherstellen, dass zum Zeitpunkt der Quellenarbeit das noetige Vorwissen verfuegbar ist.

### 2.4 Medien nach didaktischem Ort

FD-Q5 klassifiziert Medien nach ihrer Funktion im Unterrichtsverlauf:

| Didaktischer Ort | Medienfunktion | Sequenzposition |
|---|---|---|
| Motivation | Interesse wecken, Vorwissen aktivieren | Position 1-2 |
| Erarbeitung | Neues Wissen vermitteln, Fachbegriffe einfuehren | Mittlere Positionen |
| Sicherung | Gelerntes strukturieren und fixieren | Spaete Positionen |
| Transfer | Auf neuen Kontext uebertragen | Letzte Position(en) |
| Kontrolle | Lernstand pruefen | Nach Sicherung oder als Abschluss |

**Konsequenz:** Die `didaktische_funktion` (Enum: einstieg, erarbeitung, vertiefung, sicherung, transfer) muss mit der Sequenzposition korrelieren. Sicherungsmaterial darf nicht vor Erarbeitungsmaterial stehen.

### 2.5 Allgemeine Unterrichtsprinzipien als Sequenzregeln

Aus FD-Q4 (Schroeder, Brunnhuber, Hilbert Meyer) leiten sich uebergreifende Sequenzprinzipien ab:

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
| S1 | **Artikulationsschema-Konformitaet** | Sequenz folgt dem Artikulationsschema der zutreffenden GPG-Perspektive (historisch/geographisch/sozialpolitisch). Phasenfolge darf nicht verletzt werden. Phasenzuordnung erfolgt ueber `material_charakter` (vergegenwaertigung / besinnung_sachbezogen / besinnung_wertbezogen) und `didaktische_funktion`. | FD-Q1 Artikulationsschemata |
| S2 | **Vorwissen-Progression** | Kein Material referenziert Konzepte oder Fachbegriffe, die nicht durch ein vorheriges Material (niedrigere Position) oder durch explizites Vorwissen aus vorherigen Mappen eingefuehrt wurden. | FD-Q3 + Brunnhuber Strukturierung |
| S3 | **TB-Knoten-Abdeckung** | Jeder TB-Knoten aus dem fixierten TAFELBILD hat mindestens 1 zugeordnetes Material im Sequenzplan. Kein Knoten bleibt ohne Erarbeitungsweg. | Analogie zu G3 (Erarbeitbarkeit) |
| S4 | **Didaktische-Funktion-Sequenzlogik** | Die didaktischen Funktionen folgen einer gültigen Reihenfolge: einstieg → erarbeitung → vertiefung → sicherung → transfer. Kein sicherung-Material vor dem letzten erarbeitung-Material. Kein transfer-Material vor sicherung. | FD-Q5 Didaktischer Ort + Artikulationsschemata |
| S5 | **Vergegenwärtigung vor Besinnung** | Materialien mit `material_charakter` = `vergegenwaertigung` stehen VOR Materialien mit `material_charakter` = `besinnung_sachbezogen`, diese VOR `besinnung_wertbezogen`. Bei Bildquellen: `bildfunktion` = `illustrativ` zaehlt als Vergegenwärtigung, `heuristisch` als Besinnung. | FD-Q2 Roth + Vergegenwärtigung/Besinnung-Prinzip |
| S6 | **Sequenzkontext-Vollstaendigkeit** | Jedes Material hat ein vollstaendiges `sequenz_kontext`-Objekt mit `vorher` (leer nur bei Position 1) und `nachher` (leer nur bei letzter Position). | AGENT_MATERIAL Aufgabe 1.9.5 |
| S14 | **SCPL-Korrespondenz** | Die Materialreihenfolge korrespondiert mit dem SCPL-Aufbau des Tafelbilds: Materialien, die Situation-Knoten (S) erarbeiten, stehen vor Complication-Knoten (C), diese vor Problem-Knoten (P), diese vor Loesung-Knoten (L). Einordnung erfolgt ueber `primary_tb_knoten` und dessen `scpl_phase` (aus AGENT_HEFTEINTRAG-Annotation). | Tafelbild-Sinnstruktur als didaktischer Aufbaurahmen |
| S15 | **Skript-Kongruenz** | Die Materialreihenfolge folgt der Absatzfolge im SKRIPT, soweit diese nicht gegen S14 (SCPL-Korrespondenz) verstoesst. Abweichungen von der SKRIPT-Reihenfolge sind nur mit expliziter Begruendung zulaessig. | AGENT_SKRIPT liefert implizite didaktische Sequenz |

### SOLL-Kriterien

| # | Kriterium | Operationalisierung | Herkunft |
|---|---|---|---|
| S7 | **Vom Anschaulichen zum Abstrakten** | Die Sequenz bewegt sich tendenziell von konkreten, anschaulichen Materialien zu abstrakteren. Messbar ueber Abstraktionsgrad (1-4), verfeinert durch `material_charakter` und `bildfunktion`: Durchschnitt(1. Haelfte) ≤ Durchschnitt(2. Haelfte). | FD-Q5 Anschaulichkeitsprinzip + Schroeder Elementarisierung |
| S8 | **Kontextgebot Quellenarbeit** | Quellentext- und Bildquellen-Materialien (Typ: quellentext, bildquelle mit `bildfunktion` = `heuristisch`) stehen NICHT an Position 1, es sei denn `didaktische_funktion` = `einstieg` UND `analyseauftrag` = false. Vor jeder Quellenarbeit steht mindestens 1 kontextgebendes Material. | FD-Q3 Vorwissen-Gebot |
| S9 | **Uebergangs-Kohaerenz** | Jede Ueberleitung (Aufgabe 1.9.4) ist inhaltlich motiviert — sie benennt, was das vorherige Material ergeben hat und welche Frage/welchen Aspekt das naechste Material aufgreift. Rein formale Ueberleitungen ("Als naechstes...") sind unzureichend. | Brunnhuber Strukturierung + Meyer Sinnstiftendes Kommunizieren |
| S10 | **Aktivierung am Sequenzbeginn** | Das erste Material (Position 1) hat die didaktische Funktion `einstieg` und aktiviert Vorwissen oder weckt Neugier. Es fuehrt KEINE neuen Fachbegriffe ein. | Brunnhuber Aktivierung + Meyer Lernfoerderliches Klima |

### KANN-Kriterien

| # | Kriterium | Operationalisierung | Herkunft |
|---|---|---|---|
| S11 | **Materialtyp-Vielfalt** | Die Sequenz einer Mappe enthaelt mindestens 2 verschiedene Materialtypen (z.B. darstellungstext + bildquelle, nicht nur darstellungstext + darstellungstext). | Meyer Methodenvielfalt |
| S12 | **Sprachregister-Progression** | Das Sprachregister der Materialien passt sich dem Themencharakter an und steigert sich progressiv: erfahrungsbezogen-narrativ → fachbegrifflich-analytisch → bilanzierend-urteilend. | Empirie GUETEKRITERIEN_HEFTEINTRAG_ENTWURF (Abschnitt 3.5) |
| S13 | **Personalisierung in Fruehphase** | Mindestens 1 Material in der ersten Sequenzhaelfte hat `personalisiert` = true (individuelle Perspektive, Identifikationsfigur, Tagebuch, Brief). | Roth Personalisierung + Vergegenwärtigung |

### 4.2 Input-Felder fuer maschinelle Operationalisierung (v2.0)

Die folgenden Felder muessen pro Material im Sequenzplan (MATERIAL_GERUEST) vorhanden sein, damit die Prueflogik in Sektion 6 deterministisch auswertbar ist. Felder P1-P6 werden durch AGENT_MATERIAL (Phase 1, Aufgabe 1.9) gesetzt. P12 wird durch AGENT_HEFTEINTRAG (Phase 0.4) pro TB-Knoten annotiert und von AGENT_MATERIAL referenziert.

| ID | Feldname | Typ | Werte | Setzt | Genutzt von |
|---|---|---|---|---|---|
| P1 | `material_charakter` | Enum | `vergegenwaertigung` / `besinnung_sachbezogen` / `besinnung_wertbezogen` | AGENT_MATERIAL | S1, S5, S7 |
| P2 | `didaktische_funktion` | Enum | `einstieg` / `erarbeitung` / `vertiefung` / `sicherung` / `transfer` | AGENT_MATERIAL | S1, S4, S8, S10 |
| P3 | `bildfunktion` | Enum | `illustrativ` / `heuristisch` / `n/a` | AGENT_MATERIAL | S5, S7, S8 |
| P4 | `analyseauftrag` | Boolean | true / false | AGENT_MATERIAL | S8 |
| P5 | `personalisiert` | Boolean | true / false | AGENT_MATERIAL | S13 |
| P6 | `primary_tb_knoten` | String | kN-X (ein einzelner TB-Knoten-Identifikator) | AGENT_MATERIAL | S14 |
| P12 | `scpl_phase` | Enum | `S` / `C` / `P` / `L` | AGENT_HEFTEINTRAG (pro TB-Knoten) | S14 |

**Zuweisungsregeln `material_charakter` (P1):**

| Materialtyp | Default-Charakter | Abweichung moeglich wenn |
|---|---|---|
| darstellungstext | `vergegenwaertigung` | Inhalt ist explizit analytisch (Vergleich, Kausalanalyse) → `besinnung_sachbezogen` |
| tagebuch | `vergegenwaertigung` | — (immer narrativ-anschaulich) |
| bildquelle (`bildfunktion` = `illustrativ`) | `vergegenwaertigung` | — |
| bildquelle (`bildfunktion` = `heuristisch`) | `besinnung_sachbezogen` | — |
| quellentext | `besinnung_sachbezogen` | Ohne Analyseauftrag, rein illustrativ → `vergegenwaertigung` |
| zeitleiste | `vergegenwaertigung` | — |
| schaubild | `besinnung_sachbezogen` | Rein illustrativ (Karte, Diagramm ohne Interpretationsauftrag) → `vergegenwaertigung` |
| jeder Typ mit Urteilsauftrag | `besinnung_wertbezogen` | — |

**Zuweisungsregeln `bildfunktion` (P3):**
- `illustrativ`: Bild bestaetigt/veranschaulicht bereits bekannten Inhalt (Bestaetigungsfunktion)
- `heuristisch`: Bild dient als Entdeckungsmedium, SuS erschliessen neuen Inhalt aus dem Bild (Entdeckungsfunktion)
- `n/a`: Material ist kein Bild-Material

**Zuweisungsregeln `primary_tb_knoten` (P6):**
- Bei Materialien mit genau 1 TB-Knoten: dieser Knoten
- Bei Materialien mit mehreren TB-Knoten: der Knoten, dessen Erarbeitung den groessten Anteil des Materials ausmacht
- Bei Einstiegsmaterialien (didaktische_funktion = einstieg): der erste TB-Knoten in SCPL-Reihenfolge, den das Material anspricht

**Abhaengigkeit P12 (AGENT_HEFTEINTRAG → AGENT_MATERIAL):**
AGENT_HEFTEINTRAG muss in Phase 0.4 jeden TB-Knoten mit `scpl_phase: S|C|P|L` annotieren. Diese Annotation wird von AGENT_MATERIAL in Phase 1 referenziert, um S14 deterministisch zu pruefen. Ohne P12-Annotation ist S14 nur heuristisch pruefbar (Fallback: Inhaltsabgleich mit scpl-Bloecken, fehleranfaellig).

**MATERIAL_GERUEST-Template (erweitert):**

```markdown
| # | Material-ID | Typ | Didaktische Funktion | TB-Knoten | SCPL-Phase | material_charakter | bildfunktion | analyseauftrag | personalisiert | primary_tb_knoten | Voraussetzung | Kerninhalt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | M4-1 | ... | einstieg | ... | S | vergegenwaertigung | n/a | false | true | k4-1 | — | ... |
```

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

**Input-Daten:** `DIDAKTIK_RAHMEN.perspektive`, Sequenzplan mit `didaktische_funktion` (P2) und `material_charakter` (P1)
**Prueflogik:**
1. Bestimme das Artikulationsschema aus `DIDAKTIK_RAHMEN.perspektive`
2. Ordne jede Sequenzposition einer Phase des Schemas zu (Mapping-Tabelle):
   - **Historisch:**
     - `einstieg` → Problembegegnung
     - `erarbeitung` + `material_charakter` = `vergegenwaertigung` → Vergegenwärtigung
     - `erarbeitung` + `material_charakter` ∈ {`besinnung_sachbezogen`, `besinnung_wertbezogen`} → Besinnung
     - `vertiefung` → Besinnung
     - `sicherung` → Sicherung
   - **Geographisch:**
     - `einstieg` → Hinfuehrung/Situationskonfrontation
     - `erarbeitung` → Situationsanalyse
     - `vertiefung` → Situationsbeurteilung
     - `sicherung` → Sicherung
   - **Sozialpolitisch:**
     - `einstieg` → Problemstellung
     - `erarbeitung` → Problementfaltung
     - `vertiefung` → Problemloesung/Wertung
     - `sicherung` → Sicherung
3. Pruefe: Ist die Zuordnung monoton aufsteigend? (Keine spaetere Phase vor einer frueheren)
**FAIL wenn:** Phasenfolge verletzt (z.B. Besinnung vor Vergegenwärtigung bei historischer Perspektive)
**Nachbesserung:** Material umpositionieren oder `material_charakter` / `didaktische_funktion` korrigieren

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

**Input-Daten:** Sequenzplan mit `material_charakter` (P1), `bildfunktion` (P3)
**Prueflogik:**
1. Lese `material_charakter` direkt aus Sequenzplan (kein Typ-basiertes Raten noetig):
   - **Vergegenwärtigung:** `material_charakter` = `vergegenwaertigung`
   - **Besinnung (sachbezogen):** `material_charakter` = `besinnung_sachbezogen`
   - **Besinnung (wertbezogen):** `material_charakter` = `besinnung_wertbezogen`
2. Konsistenz-Check: Bei bildquelle MUSS `bildfunktion` mit `material_charakter` korrespondieren (`illustrativ` → `vergegenwaertigung`, `heuristisch` → `besinnung_sachbezogen`). Inkonsistenz → WARNING, `material_charakter` gilt.
3. Pruefe Reihenfolge: min(Position `vergegenwaertigung`) < min(Position `besinnung_sachbezogen`) < min(Position `besinnung_wertbezogen`)
4. Toleranz: Wenn Mappe nur 2-3 Materialien hat, genuegt `vergegenwaertigung` vor jeder `besinnung_*` (Unterscheidung sachbezogen/wertbezogen entfaellt)
**FAIL wenn:** Erste `besinnung_*` vor erster `vergegenwaertigung`
**Nachbesserung:** Material umpositionieren oder `material_charakter` korrigieren

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

**Input-Daten:** Sequenzplan mit Materialtypen, `material_charakter` (P1), `bildfunktion` (P3)
**Prueflogik:**
1. Ordne jedem Material einen Abstraktionsgrad zu (2-stufig):
   a. Basis-Grad nach Typ:
      - 1 (konkret): bildquelle, tagebuch
      - 2 (narrativ): darstellungstext, zeitleiste
      - 3 (analytisch): quellentext, schaubild
      - 4 (abstrakt): Begriffsarbeit, Strukturdiagramm
   b. Modifikator nach `material_charakter` und `bildfunktion`:
      - `vergegenwaertigung` + `bildfunktion` = `illustrativ`: -0.5
      - `besinnung_sachbezogen` + `bildfunktion` = `heuristisch`: +0.5
      - `besinnung_wertbezogen`: +1.0
2. Berechne Durchschnitt der ersten Haelfte und der zweiten Haelfte (mit Modifikator)
3. Erwartung: Durchschnitt(1. Haelfte) ≤ Durchschnitt(2. Haelfte)
**FAIL wenn:** Durchschnitt(1. Haelfte) > Durchschnitt(2. Haelfte) + 0.5
**Nachbesserung:** Konkrete/vergegenwaertigende Materialien nach vorne, abstrakte/besinnende nach hinten

### S8: Kontextgebot Quellenarbeit (SOLL)

**Input-Daten:** Sequenzplan mit Materialtypen, `bildfunktion` (P3), `analyseauftrag` (P4), `didaktische_funktion` (P2)
**Prueflogik:**
1. Identifiziere alle Materialien mit Typ `quellentext` ODER (Typ `bildquelle` UND `bildfunktion` = `heuristisch`)
2. Fuer jedes solche Material an Position P:
   - Pruefe: Gibt es mindestens 1 Material an Position < P mit Typ ∈ {darstellungstext, zeitleiste, tagebuch}?
   - Ausnahme: `didaktische_funktion` = `einstieg` UND `analyseauftrag` = false (reine Problembegegnung)
3. Erstelle Verletzungsliste
**FAIL wenn:** Quellenarbeit ohne vorheriges Kontextmaterial (und keine Einstiegs-Ausnahme)
**Nachbesserung:** Kontextmaterial vor Quellenarbeit einfuegen oder Quellenarbeit zurueckpositionieren
**Hinweis:** Bildquellen mit `bildfunktion` = `illustrativ` fallen NICHT unter das Kontextgebot (sie SIND Kontextmaterial)

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

**Input-Daten:** Sequenzplan mit `personalisiert` (P5)
**Prueflogik:** Mindestens 1 Material in Position 1 bis ⌈N/2⌉ hat `personalisiert` = true.
**Kein FAIL moeglich** — nur Empfehlung.
**Hinweis:** `personalisiert` = true bei Typ `tagebuch` (immer), oder bei darstellungstext/bildquelle mit individueller Perspektive, Identifikationsfigur, Ich-Erzaehler, benanntem Akteur.

### S14: SCPL-Korrespondenz (MUSS)

**Input-Daten:** Sequenzplan mit `primary_tb_knoten` (P6), TB-Knoten-Tabelle mit `scpl_phase` (P12, aus AGENT_HEFTEINTRAG)
**Prueflogik:**
1. Fuer jedes Material: Lese `primary_tb_knoten` (P6) aus Sequenzplan
2. Schlage `scpl_phase` (P12) des `primary_tb_knoten` in der TB-Knoten-Tabelle nach:
   - Jeder TB-Knoten hat genau eine `scpl_phase` ∈ {S, C, P, L} (annotiert durch AGENT_HEFTEINTRAG in Phase 0.4)
   - **Fallback** (wenn P12-Annotation fehlt): Ordne heuristisch nach Inhalt im scpl-Block zu (fehleranfaellig, WARNING erzeugen)
3. Pruefe Monotonie: Materialien mit scpl_phase S haben niedrigere Positionen als C, C < P, P < L
4. Toleranz: Materialien mit `didaktische_funktion` = `einstieg` (Position 1) sind phasen-neutral
5. Toleranz: Materialien, die sowohl S- als auch C-Knoten bedienen, werden nach `primary_tb_knoten` eingeordnet (daher P6 kritisch)
**FAIL wenn:** Ein P-Material steht vor dem letzten C-Material ODER ein L-Material vor dem letzten P-Material
**Nachbesserung:** Material umpositionieren ODER `primary_tb_knoten`-Zuordnung pruefen ODER `scpl_phase`-Annotation in AGENT_HEFTEINTRAG korrigieren

### S15: Skript-Kongruenz (MUSS)

**Input-Daten:** Sequenzplan-Tabelle, SKRIPT (Artefakt-Zuordnungstabelle pro Chunk, Absatzreihenfolge)
**Prueflogik:**
1. Fuer jedes Material: Bestimme die Quell-Passage im SKRIPT (Artefakt-Marker oder Absatz-Referenz aus MATERIAL_GERUEST)
2. Ordne jedem Material einen SKRIPT-Index zu (Reihenfolge des Auftretens im SKRIPT-Chunk)
3. Pruefe: Ist die Sequenzplan-Reihenfolge kongruent mit der SKRIPT-Index-Reihenfolge?
4. Abweichungen dokumentieren mit Begruendung (z.B. "S14: SCPL-Korrespondenz erfordert Umstellung")
**FAIL wenn:** Mehr als ⌊N/3⌋ Materialien (N = Gesamtzahl Materialien in Mappe) von der SKRIPT-Reihenfolge abweichen UND keine Begruendung vorliegt
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

---

## Schutzregeln (STR-15, Do-not-break)

Die folgenden 4 Qualitaeten wurden in der R3-Evaluation als zentrale Staerken identifiziert. Sie duerfen durch keinen Patch, keine Optimierung und kein Re-Audit verschlechtert werden.

| # | Schutzregel | Beschreibung | Pruefregel |
|---|---|---|---|
| R3-S1 | Niedrigschwelliger Einstieg | Jede Mappe beginnt mit einem Einstieg, der ohne Vorwissen der aktuellen Mappe zugaenglich ist. SuS werden abgeholt, nicht ueberfordert. | Kein Patch darf den Einstieg einer Mappe fachsprachlich oder kognitiv anspruchsvoller machen als den Ist-Stand. |
| R3-S2 | Starke Identifikationsfiguren | Personalisierung (Tagebuch-Figuren, Ich-Erzaehler, benannte Akteure) macht Geschichte greifbar. Diese Figuren sind ein didaktisches Kernmerkmal. | Kein Patch darf Identifikationsfiguren entfernen oder zu abstrakten Darstellungen degradieren. |
| R3-S3 | Visuelle Klarheit | Schaubilder, Karten, Bildquellen sind klar strukturiert, nicht ueberladen, und fuer R7-SuS auf den ersten Blick erfassbar. | Kein Patch darf die visuelle Komplexitaet erhoehen, ohne dass ein kompensierender Scaffolding-Mechanismus eingefuehrt wird. |
| R3-S4 | Emotionale Ansprache | Materialien wecken Interesse und Empathie durch konkrete, lebensnahe Darstellungen. Sachlichkeit und emotionale Zugaenglichkeit sind kein Widerspruch. | Kein Patch darf emotionale Zugaenglichkeit zugunsten rein analytischer Darstellung opfern. |

**Regressions-Check (Audit-Pflicht):** Bei jedem Re-Audit und jeder Patch-Runde: Explizit pruefen, ob R3-S1 bis R3-S4 unverletzt sind. Finding-Kategorie bei Verletzung: CRITICAL.
