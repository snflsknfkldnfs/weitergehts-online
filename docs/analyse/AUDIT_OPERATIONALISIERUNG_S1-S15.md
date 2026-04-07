# Operationalisierungs-Audit: GUETEKRITERIEN_SEQUENZIERUNG S1-S15

**Datum:** 2026-04-07
**Auditor:** PM-Session 20 (Phase-0-Standardisierung)
**Gegenstand:** GUETEKRITERIEN_SEQUENZIERUNG.md v1.1, Sektion 4 (Katalog) + Sektion 6 (Operationalisierung)
**Referenz-Artefakt:** MATERIAL_GERUEST_Mappe4 (konkreter Testfall)
**Methode:** 6-Dimensionen-Pruefung pro Kriterium (D1-D6)
**Ziel:** Identifikation von Schwachstellen in der Operationalisierung, die bei autonomer Agenten-Ausfuehrung zu inkonsistenten, falschen oder nicht-reproduzierbaren Ergebnissen fuehren koennen.

---

## Pruef-Dimensionen

| Kuerzel | Dimension | Prueffrage |
|---|---|---|
| D1 | Inputverfuegbarkeit | Sind alle benannten Input-Daten zum Pruefzeitpunkt tatsaechlich verfuegbar und im erwarteten Format? |
| D2 | Entscheidungsdeterminiertheit | Fuehrt die Prueflogik bei identischem Input immer zum selben PASS/FAIL? |
| D3 | Grenzfall-Robustheit | Funktioniert die Logik bei Randfaellen (2 Materialien, 8+ Materialien, Misch-Perspektiven, Sonderfaelle)? |
| D4 | Ueberlappungsfreiheit | Ist das Kriterium trennscharf gegenueber anderen S-Kriterien? |
| D5 | Nachbesserbarkeit | Kann der Agent die Nachbesserung autonom umsetzen? |
| D6 | Fachdidaktische Dichte | Bildet die Formalisierung den fachdidaktischen Kern vollstaendig ab? |

**Bewertungsskala:** ROBUST / FRAGIL / DEFEKT

---

## Audit-Ergebnisse

### S1: Artikulationsschema-Konformitaet (MUSS)

| Dimension | Bewertung | Begruendung |
|---|---|---|
| D1 | ROBUST | Input klar definiert: `DIDAKTIK_RAHMEN.perspektive` + Sequenzplan. Beide zum Pruefzeitpunkt verfuegbar. |
| D2 | **FRAGIL** | Zuordnung von Materialien zu Schema-Phasen ist nicht eindeutig formalisiert. Prueflogik sagt: `erarbeitung (narrativ) → Vergegenwaertigung, erarbeitung (analytisch) → Besinnung`. Aber: Das Attribut "narrativ vs. analytisch" ist kein Feld im MATERIAL_GERUEST. Der Agent muss den Materialinhalt interpretieren, um die Zuordnung zu treffen. Zwei Agenten koennten denselben Darstellungstext unterschiedlich klassifizieren. |
| D3 | FRAGIL | Bei gemischten Perspektiven (z.B. Mappe mit historischem UND geographischem Zugang) ist unklar, welches Schema gilt. DIDAKTIK_RAHMEN liefert eine Perspektive — aber reale Mappen koennen Misch-Charakter haben. |
| D4 | **FRAGIL** | Hohe Ueberlappung mit S4 (Didaktische-Funktion-Sequenzlogik) und S5 (V vor B). Alle drei pruefen im Kern: "Ist die Reihenfolge didaktisch korrekt?" S1 prueft via Artikulationsschema, S4 via `didaktische_funktion`-Enum, S5 via V/B-Klassifikation. Bei korrekter Implementierung sind sie kongruent. Bei Divergenz (z.B. S1 PASS aber S5 FAIL) entsteht Verwirrung. |
| D5 | ROBUST | "Material umpositionieren oder didaktische Funktion anpassen" — konkret genug. |
| D6 | **FRAGIL** | Das 8-Phasen-GPG-Strukturmodell (FD-Q8, S. 18) ist differenzierter als die 4-Phasen-Schemata in S1. Die Operationalisierung reduziert auf 4 Phasen pro Perspektive — das ist ausreichend fuer ein Q-Gate, verliert aber die Granularitaet von "Ins Boot holen / Lernen lassen / Netze knuepfen". |

**Gesamt-Urteil S1: FRAGIL**
**Patch-Vorschlag:** (1) Explizites Feld `material_charakter` (narrativ/analytisch/urteilend) im MATERIAL_GERUEST einfuehren, um D2 zu loesen. (2) Verhaeltnis zu S4/S5 klaeren: S1 als Meta-Pruefung definieren, die NUR greift, wenn S4+S5 nicht bereits das Gleiche abdecken. Alternativ: S1 als Dokumentationspflicht ("Agent dokumentiert Phasenzuordnung") statt als eigenstaendigen PASS/FAIL-Check.

---

### S2: Vorwissen-Progression (MUSS)

| Dimension | Bewertung | Begruendung |
|---|---|---|
| D1 | **DEFEKT** | Prueflogik fordert "pro Material: Liste der referenzierten Fachbegriffe/Konzepte" und "pro Material: Liste der eingefuehrten Fachbegriffe/Konzepte". Diese Listen existieren NICHT als Felder im MATERIAL_GERUEST. Im Produktionsbeispiel Mappe 4 hat kein Material eine solche Liste. Der Agent muesste sie zur Pruefzeit aus dem Materialinhalt extrahieren — aber zum Zeitpunkt des Sequenzplan-Q-Gates ist der Materialinhalt noch nicht produziert (nur Typ + Funktion + TB-Knoten bekannt). |
| D2 | **DEFEKT** | Selbst wenn Listen vorhanden waeren: Die Entscheidung "Was zaehlt als Fachbegriff?" ist nicht formalisiert. Ist "Schlieffen-Plan" ein Fachbegriff? Ist "Zweifrontenkrieg"? Ist "Belgien"? Ohne Taxonomie variiert das Ergebnis zwischen Agenten-Runs. |
| D3 | ROBUST | Algorithmus (Menge initialisieren, iterieren, Differenz bilden) ist logisch korrekt und skaliert. |
| D4 | ROBUST | Klar von anderen Kriterien getrennt. |
| D5 | ROBUST | Nachbesserung ("umpositionieren oder als Vorwissen deklarieren") konkret. |
| D6 | ROBUST | Fachdidaktischer Kern (Brunnhuber Strukturierung + FD-Q3 Vorwissen-Gebot) korrekt abgebildet. |

**Gesamt-Urteil S2: DEFEKT (D1)**
**Patch-Vorschlag:** (1) Pflichtfeld `fachbegriffe_eingefuehrt[]` und `fachbegriffe_vorausgesetzt[]` im MATERIAL_GERUEST einfuehren. AGENT_MATERIAL befuellt diese beim Design-Modus, da zu diesem Zeitpunkt der Skript-Inhalt bekannt ist. (2) Taxonomie: Fachbegriffe = Begriffe, die im TB-Knoten oder SCPL vorkommen + Begriffe, die im SKRIPT bei Erstverwendung erklaert werden. Alltagsbegriffe zaehlen nicht.

---

### S3: TB-Knoten-Abdeckung (MUSS)

| Dimension | Bewertung | Begruendung |
|---|---|---|
| D1 | ROBUST | TB-Knoten-IDs aus TAFELBILD und Sequenzplan-Spalte `TB-Knoten` sind beide verfuegbar (vgl. Mappe 4: kN-1 bis kN-6 in beiden Quellen). |
| D2 | ROBUST | Mengen-Differenz ist deterministisch. |
| D3 | ROBUST | Funktioniert auch bei 1 oder 20 Knoten. |
| D4 | ROBUST | Einzigartiger Pruefgegenstand. |
| D5 | ROBUST | Nachbesserung klar: Material erweitern oder hinzufuegen. |
| D6 | ROBUST | Abdeckungspflicht fachdidaktisch korrekt (G3-Analogie). |

**Gesamt-Urteil S3: ROBUST — kein Handlungsbedarf.**

---

### S4: Didaktische-Funktion-Sequenzlogik (MUSS)

| Dimension | Bewertung | Begruendung |
|---|---|---|
| D1 | ROBUST | `didaktische_funktion` ist Pflichtfeld im MATERIAL_GERUEST (Spalte "Funktion"). |
| D2 | **FRAGIL** | Die Enum `{einstieg, erarbeitung, vertiefung, sicherung, transfer}` ist definiert, aber im MATERIAL_GERUEST Mappe 4 wird die Spalte nicht so benannt (dort: "Funktion (1 Satz)" als Freitext). Die Prueflogik setzt ein Enum-Feld voraus, das in der Praxis ein Freitext-Satz ist. Agent muss implizit klassifizieren. |
| D3 | FRAGIL | Ausnahmeregel "Mehrere erarbeitung hintereinander erlaubt" ist korrekt. Aber: Ausnahmeregel "vertiefung nach sicherung = transfer" ist fehleranfaellig — Agent muss entscheiden, ob eine Vertiefung "eigentlich Transfer" ist. |
| D4 | FRAGIL | Ueberlappung mit S1 (beide pruefen Phasenreihenfolge). S4 ist die Enum-basierte Variante, S1 die Schema-basierte. Bei konsistenter Implementierung redundant. |
| D5 | ROBUST | Nachbesserung klar. |
| D6 | ROBUST | Fachdidaktischer Kern (FD-Q5 Didaktischer Ort) korrekt. |

**Gesamt-Urteil S4: FRAGIL**
**Patch-Vorschlag:** (1) Explizites Enum-Feld `didaktische_funktion` (nicht Freitext) im MATERIAL_GERUEST als Pflicht definieren. (2) Verhaeltnis zu S1 klaeren: S4 als primaeren maschinellen Check definieren (Enum-basiert, deterministisch), S1 als fachdidaktische Validierung bei unklaren Faellen.

---

### S5: Vergegenwaertigung vor Besinnung (MUSS)

| Dimension | Bewertung | Begruendung |
|---|---|---|
| D1 | **FRAGIL** | Klassifikation erfordert Materialtyp + Charakter. Materialtyp ist verfuegbar (darstellungstext, bildquelle, etc.). Aber: Ein `darstellungstext` kann sowohl Vergegenwaertigung (narrativ) als auch Besinnung (analytisch) sein. Die Zuordnung haengt vom Inhalt ab, nicht vom Typ. Beispiel Mappe 4: mat-4-1 (darstellungstext) ist Vergegenwaertigung — aber ein anderer DT koennte analytisch sein. Ohne Zusatzfeld nicht autonom entscheidbar. |
| D2 | **FRAGIL** | Selbes Problem wie D1. Zwei Agenten koennten denselben DT unterschiedlich klassifizieren. Die Toleranzregel "Bei 2-3 Materialien: V vor B genuegt" hilft, deckt aber nicht den Normalfall (4-6 Materialien) ab. |
| D3 | ROBUST | min()-basierte Prueflogik funktioniert bei jeder Sequenzlaenge. |
| D4 | FRAGIL | Starke Ueberlappung mit S1 (Phasenzuordnung). Wenn S1 korrekt implementiert ist, kann S5 nicht verletzt sein (V-Phase kommt per Schema vor B-Phase). S5 ist de facto ein Spezialfall von S1 fuer die historische Perspektive. |
| D5 | ROBUST | Nachbesserung klar. |
| D6 | ROBUST | Fachdidaktischer Kern (Roth, V/B-Prinzip) korrekt und vollstaendig. |

**Gesamt-Urteil S5: FRAGIL (D1/D2 identisch mit S1-Problem)**
**Patch-Vorschlag:** Feld `material_charakter` (wie bei S1 vorgeschlagen) loest D1/D2 fuer S5 mit. Enum: `vergegenwaertigung | besinnung_sachbezogen | besinnung_wertbezogen`. Wird von AGENT_MATERIAL beim Design vergeben.

---

### S6: Sequenzkontext-Vollstaendigkeit (MUSS)

| Dimension | Bewertung | Begruendung |
|---|---|---|
| D1 | **FRAGIL** | `sequenz_kontext`-Objekte werden in der Prueflogik referenziert, aber im MATERIAL_GERUEST Mappe 4 existieren sie nicht als separates Objekt. Sie werden erst bei Aufgabe 1.9 generiert — d.h. sie existieren zum Q-Gate-Zeitpunkt, aber ihre Vollstaendigkeit ist genau das, was geprueft wird (zirkulaer: Pruefung prueft das Ergebnis ihrer eigenen Vorgaenger-Aufgabe). |
| D2 | ROBUST | Strukturpruefung (Felder vorhanden? Konsistent?) ist deterministisch. |
| D3 | ROBUST | Funktioniert bei jeder Sequenzlaenge. |
| D4 | ROBUST | Einzigartiger Pruefgegenstand (Kontextobjekte). |
| D5 | ROBUST | "Fehlende Objekte generieren" — trivial. |
| D6 | FRAGIL | Reine Strukturpruefung. Fachdidaktischer Wert gering — es wird geprueft, ob Felder existieren, nicht ob ihr Inhalt sinnvoll ist. Die inhaltliche Qualitaet der Ueberleitungen wird von S9 geprueft. S6 ist ein technischer Vollstaendigkeitscheck, kein didaktischer. |

**Gesamt-Urteil S6: FRAGIL (D6 — geringer fachdidaktischer Mehrwert)**
**Patch-Vorschlag:** S6 von MUSS auf SOLL herunterstufen. Begruendung: Strukturelle Vollstaendigkeit ist wuenschenswert, aber ein fehlendes `sequenz_kontext`-Objekt ist kein didaktischer Fehler — es ist ein Formatfehler. MUSS-Kriterien sollten didaktische Verletzungen markieren. Alternativ: S6 als automatischen Formatcheck implementieren, der vor dem eigentlichen Q-Gate laeuft (Pre-Check), nicht als Q-Gate-Kriterium.

---

### S7: Vom Anschaulichen zum Abstrakten (SOLL)

| Dimension | Bewertung | Begruendung |
|---|---|---|
| D1 | ROBUST | Materialtypen verfuegbar. |
| D2 | **FRAGIL** | Abstraktionsgrad-Zuordnung (1-4) ist festgelegt, aber grob. Probleme: (a) `darstellungstext` bekommt pauschal Grad 2, obwohl er narrativ (Grad 1-2) oder analytisch (Grad 3) sein kann. (b) `quellentext` bekommt pauschal Grad 3, obwohl ein kurzes provokantes Zitat (Einstieg) Grad 1-2 ist. (c) Die Kategorien "Begriffsarbeit" und "Strukturdiagramm" (Grad 4) sind keine bestehenden `material_typ`-Enums. |
| D3 | **FRAGIL** | Bei 2-3 Materialien ist die Durchschnittsberechnung nicht aussagekraeftig (zu kleine Stichprobe). Toleranzschwelle +0.5 ist arbitraer. |
| D4 | ROBUST | Klar von S5 getrennt (S5 prueft V/B-Reihenfolge, S7 prueft Abstraktions-Gradient). |
| D5 | ROBUST | "Konkrete nach vorne, abstrakte nach hinten" — klar. |
| D6 | ROBUST | Schroeder-Elementarisierung korrekt abgebildet. |

**Gesamt-Urteil S7: FRAGIL**
**Patch-Vorschlag:** (1) Feld `material_charakter` (s. S1/S5) wuerde auch hier praezisere Zuordnung ermoeglichen. (2) Abstraktionsgrad-Skala verfeinern: statt Typ-basiert → charakter-basiert. (3) Toleranzschwelle ersetzen durch: "Kein Material der letzten Position hat niedrigeren Abstraktionsgrad als Material der ersten Position." Einfacher, robuster.

---

### S8: Kontextgebot Quellenarbeit (SOLL)

| Dimension | Bewertung | Begruendung |
|---|---|---|
| D1 | ROBUST | Materialtypen + Positionen + `didaktische_funktion` verfuegbar. |
| D2 | ROBUST | Prueflogik eindeutig: Quellentext/Bildquelle (heuristisch) an Position P → mind. 1 Kontextmaterial an Position < P. Einstiegs-Ausnahme klar definiert. |
| D3 | **FRAGIL** | Unterscheidung `bildquelle (heuristisch)` vs. `bildquelle (illustrativ)` ist nicht als Feld im MATERIAL_GERUEST vorhanden. Materialtyp ist nur `bildquelle` — die Funktion (heuristisch/illustrativ) muss aus dem Kontext erschlossen werden. FD-Q3 hat diese Unterscheidung als zentral identifiziert, aber die Operationalisierung setzt sie nicht als Datenfeld um. |
| D4 | ROBUST | Klar von anderen Kriterien getrennt. |
| D5 | ROBUST | Nachbesserung klar. |
| D6 | **FRAGIL** | Der 5-Stufen-Quellenkritik-Prozess (FD-Q8: Betrachten → Beschreiben → Wahrnehmen → Einordnen → Interpretieren) ist nicht abgebildet. S8 prueft nur, OB Kontext vorhanden ist — nicht, ob der Kontext AUSREICHEND fuer die jeweilige Quellenart ist. Eine Sachquelle braucht anderen Kontext als eine Karikatur. |

**Gesamt-Urteil S8: FRAGIL**
**Patch-Vorschlag:** (1) Feld `bildfunktion` (illustrativ/heuristisch) fuer `bildquelle`-Materialien im MATERIAL_GERUEST einfuehren. (2) Optional: Quellenart-Annotation (Sachueberrest, Textquelle, Bildquelle illustrativ, Bildquelle heuristisch, Karikatur) als Enum. Bereits als Handlungsbedarf aus FD-Q3-Analyse notiert.

---

### S9: Uebergangs-Kohaerenz (SOLL)

| Dimension | Bewertung | Begruendung |
|---|---|---|
| D1 | **FRAGIL** | Ueberleitungstexte werden in Aufgabe 1.9.4 generiert. Zum Q-Gate-Zeitpunkt existieren sie. Aber: Die Pruefung "enthaelt Rueckbezug UND Vorausblick" erfordert NLP-Analyse von Freitext. Ein Agent kann dies beurteilen, aber nicht deterministisch. |
| D2 | **DEFEKT** | "Inhaltlich motiviert vs. rein formal" ist ein Urteil, kein Messwert. Zwei Agenten werden dieselbe Ueberleitung unterschiedlich klassifizieren. Die Mindestsubstanz-Regel (> 8 Woerter) ist messbar, aber kein Qualitaetsindikator (ein 10-Wort-Satz kann formal sein: "Nachdem wir X betrachtet haben, wenden wir uns nun Y zu"). |
| D3 | ROBUST | Skaliert. |
| D4 | ROBUST | Klar von anderen Kriterien getrennt. |
| D5 | **FRAGIL** | "Formale Ueberleitungen durch inhaltliche ersetzen" — erfordert kreative Textproduktion, nicht nur Strukturanpassung. Hoeherer Aufwand als andere Nachbesserungen. |
| D6 | ROBUST | Brunnhuber Strukturierung + Meyer Sinnstiftendes Kommunizieren korrekt abgebildet. |

**Gesamt-Urteil S9: DEFEKT (D2)**
**Patch-Vorschlag:** (1) Prueflogik aendern: Statt "inhaltlich vs. formal" → strukturelle Pruefung: "Ueberleitung enthaelt mindestens 1 Fachbegriff oder TB-Knoten-Referenz aus dem vorherigen Material UND mindestens 1 aus dem naechsten Material." Deterministisch pruefbar, da Fachbegriffe/TB-Knoten bekannt sind. (2) Schwelle ersetzen: Statt "> 50% formal = FAIL" → "Jede Ueberleitung muss beide Bezuege (rueck + voraus) enthalten."

---

### S10: Aktivierung am Sequenzbeginn (SOLL)

| Dimension | Bewertung | Begruendung |
|---|---|---|
| D1 | ROBUST | Position-1-Material verfuegbar. |
| D2 | **FRAGIL** | "Material fuehrt 0 neue Fachbegriffe ein" — erfordert Fachbegriff-Liste (selbes D1-Problem wie S2). "Aktivierender Charakter" ist nicht als Enum verfuegbar. Agent muss Materialinhalt interpretieren. |
| D3 | ROBUST | Position 1 ist immer eindeutig. |
| D4 | ROBUST | Klar getrennt. |
| D5 | ROBUST | "Einstiegsmaterial vorschalten" — klar. |
| D6 | ROBUST | Brunnhuber Aktivierung korrekt. |

**Gesamt-Urteil S10: FRAGIL**
**Patch-Vorschlag:** Haengt am selben Feld `fachbegriffe_eingefuehrt[]` wie S2. Wenn S2-Patch umgesetzt wird, wird S10 automatisch robust.

---

### S11: Materialtyp-Vielfalt (KANN)

| Dimension | Bewertung | Begruendung |
|---|---|---|
| D1 | ROBUST | Materialtypen verfuegbar. |
| D2 | ROBUST | `len(set(materialtypen)) >= 2` — vollstaendig deterministisch. |
| D3 | ROBUST | Funktioniert immer. |
| D4 | ROBUST | Einzigartig. |
| D5 | n/a | Kein FAIL moeglich. |
| D6 | ROBUST | Meyer Methodenvielfalt korrekt. |

**Gesamt-Urteil S11: ROBUST — kein Handlungsbedarf.**

---

### S12: Sprachregister-Progression (KANN)

| Dimension | Bewertung | Begruendung |
|---|---|---|
| D1 | **FRAGIL** | Sprachregister ist kein Feld im MATERIAL_GERUEST. Muesste aus Materialinhalt abgeleitet werden. |
| D2 | **DEFEKT** | Keine operationalisierte Prueflogik. "Sprachregister korreliert mit Themencharakter" ist eine Beobachtung, keine Pruefanweisung. Agent kann dies nicht autonom bewerten. |
| D3 | n/a | Keine Prueflogik vorhanden. |
| D4 | FRAGIL | Ueberlappung mit S7 (Abstraktionsprogression). Sprachregister und Abstraktionsgrad korrelieren stark. |
| D5 | n/a | Kein FAIL. |
| D6 | FRAGIL | Referenz auf GUETEKRITERIEN_HEFTEINTRAG_ENTWURF Abschnitt 3.5 — das betrifft Hefteintrag-Sprache, nicht Material-Sprache. Leichte Fehlzuordnung der Quelle. |

**Gesamt-Urteil S12: DEFEKT (aber KANN — geringes Risiko)**
**Patch-Vorschlag:** Entweder (a) in S7 integrieren (Sprachregister als Teilaspekt der Abstraktionsprogression) und S12 streichen, oder (b) Feld `material_charakter` nutzen, um Sprachregister abzuleiten (vergegenwaertigung = narrativ-erfahrungsbezogen, besinnung_sachbezogen = fachbegrifflich, besinnung_wertbezogen = bilanzierend-urteilend).

---

### S13: Personalisierung in Fruehphase (KANN)

| Dimension | Bewertung | Begruendung |
|---|---|---|
| D1 | ROBUST | Materialtyp `tagebuch` als Proxy. |
| D2 | **FRAGIL** | "Materialinhalt mit individueller Perspektive/Identifikationsfigur" — nicht deterministisch. Typ `tagebuch` ist klar, aber auch ein `darstellungstext` kann personalisiert sein (z.B. "Der Bauer Paul..."). Ohne Feld nicht zuverlaessig erkennbar. |
| D3 | ROBUST | Haelfte-Berechnung funktioniert. |
| D4 | ROBUST | Einzigartig. |
| D5 | n/a | Kein FAIL. |
| D6 | ROBUST | Roth Personalisierung korrekt. |

**Gesamt-Urteil S13: FRAGIL (aber KANN — geringes Risiko)**
**Patch-Vorschlag:** Feld `personalisiert` (boolean) im MATERIAL_GERUEST. True wenn Identifikationsfigur, Ich-Erzaehler oder benannter Akteur als Protagonist.

---

### S14: SCPL-Korrespondenz (MUSS)

| Dimension | Bewertung | Begruendung |
|---|---|---|
| D1 | ROBUST | TB-Knoten in Sequenzplan + SCPL-Zuordnung in TAFELBILD. Mappe 4 zeigt: Knoten sind SCPL-Zonen zugeordnet (k4-1 bis k4-3 = S/C-Zone, k4-5/k4-6 = P/L-Zone). |
| D2 | **FRAGIL** | "Ordne jeden TB-Knoten einer SCPL-Phase zu" — die Zuordnungsregel ist aufwaendig: Pruefen, ob Knoteninhalt in scpl.situation, scpl.complication[], scpl.problem oder scpl.loesung[] steht. Bei Knoten, die mehrere Zonen bedienen (z.B. k4-4 "Einmarsch ueber Belgien" ist sowohl C als auch Uebergang zu P), ist die "primaere Knoten"-Entscheidung nicht deterministisch. |
| D3 | ROBUST | Monotonie-Pruefung skaliert. Toleranzregeln (Position 1 phasen-neutral, Multi-Zonen-Knoten nach Primaer) sind sinnvoll. |
| D4 | FRAGIL | Starke Korrelation mit S1 und S4. Wenn S4 (Funktionssequenz) PASS ist, ist S14 fast zwingend auch PASS, weil SCPL-Aufbau und Funktionssequenz die gleiche Grundordnung widerspiegeln. |
| D5 | ROBUST | "Umpositionieren oder Knoten-Zuordnung pruefen" — klar. |
| D6 | ROBUST | SCPL-Korrespondenz als eigenstaendiges Prinzip korrekt modelliert. |

**Gesamt-Urteil S14: FRAGIL (D2)**
**Patch-Vorschlag:** (1) SCPL-Phase als Pflichtfeld pro TB-Knoten im TAFELBILD-JSON definieren (nicht zur Pruefzeit ableiten, sondern bei Tafelbild-Erstellung festlegen). AGENT_HEFTEINTRAG traegt `scpl_phase: S|C|P|L` pro Knoten ein. Dann wird S14-Pruefung deterministisch: Monotonie ueber vorher festgelegte Phasen-Labels. (2) Primaer-Knoten-Regel formalisieren: "Bei Multi-Knoten-Materialien zaehlt der Knoten mit der fruehesten SCPL-Phase."

---

### S15: Skript-Kongruenz (MUSS)

| Dimension | Bewertung | Begruendung |
|---|---|---|
| D1 | **FRAGIL** | "Bestimme die Quell-Passage im SKRIPT (Artefakt-Marker oder Absatz-Referenz aus MATERIAL_GERUEST)" — im MATERIAL_GERUEST Mappe 4 gibt es eine Spalte `Skript-Ref` (z.B. "§1-§3"). Diese muesste in einen SKRIPT-Index uebersetzt werden. Abhaengig davon, wie SKRIPT-Chunks nummeriert sind. |
| D2 | **FRAGIL** | Bei Materialien, die mehrere SKRIPT-Abschnitte referenzieren (z.B. mat-4-1: "§1-§3"), ist der "SKRIPT-Index" nicht eindeutig. Ist das der Beginn (§1) oder das Ende (§3) oder der Mittelpunkt? Ohne Konvention variiert das Ergebnis. |
| D3 | FRAGIL | Schwellenwert "mehr als 2 Abweichungen ohne Begruendung = FAIL" ist arbitraer. Bei 3 Materialien = 2 Abweichungen erlaubt (66% duerfen abweichen). Bei 8 Materialien = 2 erlaubt (25%). Nicht laengen-normiert. |
| D4 | ROBUST | Einzigartiger Pruefgegenstand (Skript-Reihenfolge). |
| D5 | ROBUST | "Begruendung nachliefern oder Reihenfolge anpassen" — klar. |
| D6 | ROBUST | Skript als implizite Sequenzquelle fachdidaktisch korrekt modelliert. |

**Gesamt-Urteil S15: FRAGIL**
**Patch-Vorschlag:** (1) Konvention: SKRIPT-Index = Paragraphen-Nummer des ERSTEN referenzierten Abschnitts. (2) Schwelle normieren: "Maximal ⌊N/3⌋ Abweichungen ohne Begruendung erlaubt" (bei 3 Mat: 1, bei 6 Mat: 2, bei 9 Mat: 3).

---

## Konsolidierung

### Uebersicht

| Kriterium | Prio | D1 | D2 | D3 | D4 | D5 | D6 | Gesamt |
|---|---|---|---|---|---|---|---|---|
| S1 | MUSS | R | **F** | F | **F** | R | **F** | **FRAGIL** |
| S2 | MUSS | **D** | **D** | R | R | R | R | **DEFEKT** |
| S3 | MUSS | R | R | R | R | R | R | **ROBUST** |
| S4 | MUSS | R | **F** | F | F | R | R | **FRAGIL** |
| S5 | MUSS | **F** | **F** | R | F | R | R | **FRAGIL** |
| S6 | MUSS | F | R | R | R | R | F | **FRAGIL** |
| S7 | SOLL | R | **F** | **F** | R | R | R | **FRAGIL** |
| S8 | SOLL | R | R | **F** | R | R | **F** | **FRAGIL** |
| S9 | SOLL | F | **D** | R | R | F | R | **DEFEKT** |
| S10 | SOLL | R | **F** | R | R | R | R | **FRAGIL** |
| S11 | KANN | R | R | R | R | - | R | **ROBUST** |
| S12 | KANN | F | **D** | - | F | - | F | **DEFEKT** |
| S13 | KANN | R | **F** | R | R | - | R | **FRAGIL** |
| S14 | MUSS | R | **F** | R | F | R | R | **FRAGIL** |
| S15 | MUSS | **F** | **F** | F | R | R | R | **FRAGIL** |

**R** = ROBUST, **F** = FRAGIL, **D** = DEFEKT

### Zusammenfassung

- **ROBUST (kein Handlungsbedarf):** S3, S11 (2 von 15)
- **FRAGIL (funktioniert meist, Grenzfaelle problematisch):** S1, S4, S5, S6, S7, S8, S10, S13, S14, S15 (10 von 15)
- **DEFEKT (systematisches Risiko):** S2, S9, S12 (3 von 15)

### Zentrales Muster

Ein einzelnes strukturelles Defizit verursacht 80% der FRAGIL-Bewertungen: **Das MATERIAL_GERUEST hat keine semantischen Felder fuer Material-Charakter, Fachbegriffe und Bildfunktion.** Alle Prueflogiken, die inhaltliche Klassifikationen erfordern, scheitern daran, dass diese Klassifikationen zur Pruefzeit aus Freitext abgeleitet werden muessen.

### Priorisierte Patch-Liste

| Prio | Patch | Loest | Aufwand |
|---|---|---|---|
| **P1** | Feld `material_charakter` (Enum: vergegenwaertigung / besinnung_sachbezogen / besinnung_wertbezogen) im MATERIAL_GERUEST | S1-D2, S5-D1/D2, S7-D2, S12 (implizit) | GERING — 1 Spalte im MATERIAL_GERUEST, AGENT_MATERIAL befuellt beim Design |
| **P2** | Felder `fachbegriffe_eingefuehrt[]` + `fachbegriffe_vorausgesetzt[]` im MATERIAL_GERUEST | S2-D1/D2, S10-D2 | MITTEL — erfordert Fachbegriff-Taxonomie-Konvention |
| **P3** | Feld `bildfunktion` (illustrativ/heuristisch) fuer `bildquelle`-Typ | S8-D3 | GERING — 1 Feld, nur bei bildquelle-Typ |
| **P4** | Feld `didaktische_funktion` als Enum (nicht Freitext) im MATERIAL_GERUEST | S4-D2 | GERING — Spalte umbenennen und Enum erzwingen |
| **P5** | S9-Prueflogik ersetzen: Fachbegriff/TB-Knoten-Bezug statt NLP-Beurteilung | S9-D2 | MITTEL — Prueflogik neu formulieren |
| **P6** | SCPL-Phase als Pflichtfeld pro TB-Knoten im TAFELBILD | S14-D2 | GERING — AGENT_HEFTEINTRAG annotiert |
| **P7** | S6 von MUSS auf SOLL herunterstufen (oder Pre-Check) | S6-D6 | GERING — Tabelle aendern |
| **P8** | S12 in S7 integrieren oder streichen | S12-D2, S4/S1-Ueberlappung reduzieren | GERING |
| **P9** | S15-Schwelle normieren (⌊N/3⌋ statt fix 2) | S15-D3 | GERING |

### Empfohlene Umsetzungsreihenfolge

**Schritt 1 (blockierend):** P1 + P4 + P6 — drei kleine Schema-Aenderungen im MATERIAL_GERUEST und TAFELBILD. Loesen den Grossteil der FRAGIL-Bewertungen. Kein neuer Code, nur Feld-Definitionen.

**Schritt 2 (hoch):** P2 — Fachbegriff-Felder. Erfordert Konvention, was als Fachbegriff zaehlt. Loest S2 (DEFEKT → ROBUST) und S10 (FRAGIL → ROBUST).

**Schritt 3 (mittel):** P3 + P5 — Bildfunktion-Feld und S9-Prueflogik-Revision. Spezifischere Aenderungen.

**Schritt 4 (optional):** P7 + P8 + P9 — Bereinigungen (Prioritaetsanpassung S6, Integration S12→S7, S15-Schwelle). Kein didaktischer Impact, nur Klarheit.

---

## Schutzregeln-Pruefung

Keine der vorgeschlagenen Patches verletzt R3-S1 bis R3-S4:
- R3-S1 (Niedrigschwelliger Einstieg): Nicht betroffen — Patches betreffen MATERIAL_GERUEST-Schema, nicht Materialinhalt.
- R3-S2 (Identifikationsfiguren): Nicht betroffen.
- R3-S3 (Visuelle Klarheit): Nicht betroffen.
- R3-S4 (Emotionale Ansprache): Nicht betroffen.
