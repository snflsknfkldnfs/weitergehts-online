# Material-Geruest: Mappe 4 — Warum wurde der Friedensvertrag zum Diktat?

**Game-ID:** verlauf-erster-weltkrieg-marne-ende
**Erstellt:** 2026-04-09 (Phase 1, AGENT_MATERIAL Design-Modus)
**Validierungsstatus:** ENTWURF (User-Validierung ausstehend)
**Eingabe:** SKRIPT Chunk 4, TAFELBILD Mappe 4 (SCPL, STRUKTUR-FREEZE), DIDAKTIK_RAHMEN

**Konflikttyp:** true
**Perspektiven-Policy:** P1: Siegermaechte (Frankreich/GB/USA als Diktierende) | P2: Deutsche Wirtschaft (Industrieller) | P3: Deutsche Bildungsbuerger (Lehrer)

---

## SCPL-Abdeckung (aus TAFELBILD, fixiert)

| SCPL-Zone | Kurztext | Fachbegriffe | Material-Abdeckung |
|---|---|---|---|
| S | Im Januar 1919 verhandeln die Siegermaechte in Versailles — Deutschland sitzt nicht am Tisch: Diktatfrieden | Versailler Vertrag, Diktatfrieden | mat-4-1 (BQ: Unterzeichnungsfoto aktiviert), mat-4-2 (DT: fuehrt Begriffe ein) |
| C1 | Deutschland muss seine Armee auf 100.000 Mann begrenzen — Abruestung | Abruestung | mat-4-2 (DT: erklaert militaerische Bestimmungen) |
| C2 | Deutschland verliert 13% seines Gebiets — Elsass-Lothringen, Posen, Westpreussen | Gebietsverluste | mat-4-2 (DT: erklaert territoriale Verluste) |
| C3 | 132 Milliarden Goldmark Entschaedigung — Reparationen | Reparationen | mat-4-2 (DT: erklaert wirtschaftliche Bedingungen), mat-4-4 (TB: Industrieller reagiert) |
| P | Artikel 231 gibt Deutschland die alleinige Kriegsschuld — Kriegsschuldparagraph | Kriegsschuldparagraph | mat-4-3 (QT: Originaltext Art. 231), mat-4-4 (TB: Industrieller reagiert), mat-4-5 (TB: Lehrer reflektiert) |
| L1 | Der Versailler Vertrag legte Deutschland harte Bedingungen auf — Gebietsverluste, Reparationen, Armeebegrenzung | — | Synthese aus mat-4-2 |
| L2 | Artikel 231 gab Deutschland die alleinige Kriegsschuld — Demuetigung | — | Synthese aus mat-4-3, mat-4-4 |
| L3 | Die Wut ueber den Vertrag und die Dolchstosslegende vergifteten die junge Demokratie | — | Synthese aus mat-4-5 |

**DIRECT-Check:** 100% (5/5 Zonen DIRECT). Schwelle 70% erreicht: JA.

---

## Material-Entwurf

| ID | Typ | Titel | Skript-Absatz | SCPL-Zone | Artefakt-Ref | Quelle/Erstellung | W-Budget | sensibilitaets_markierung |
|---|---|---|---|---|---|---|---|---|
| mat-4-1 | bildquelle | Wer unterschreibt den Friedensvertrag? | §1 | S | img-4-1 | Wikimedia: Unterzeichnung Versailles 28. Juni 1919 | ~40W | keine |
| mat-4-2 | darstellungstext | Was steht im Versailler Vertrag? | §2–§3 | C1/C2/C3 | — | AGENT schreibt auf Basis INHALTSBASIS (Abruestung 100k, Elsass-Lothringen/Posen 13%, 132 Mrd. Goldmark) | ~150W | keine |
| mat-4-3 | quellentext | Wer traegt die Schuld am Krieg? | §4–§5 | P | pq-4-1 | Artikel 231 Versailler Vertrag (Originaltext, vereinfacht) | ~100W | keine |
| mat-4-4 | tagebuch | Was bedeuten Reparationen fuer einen Fabrikbesitzer? | §5 | C3/P | rolle-4-1 | AGENT schreibt: Industrieller aus dem Ruhrgebiet, Sommer 1919 | ~110W | keine |
| mat-4-5 | tagebuch | Ein Lehrer zwischen Hoffnung und Wut | §5–§6 | P | rolle-4-2 | AGENT schreibt: Lehrer aus Sachsen, Herbst 1918 bis Sommer 1919 | ~100W | mythos_korrektur_noetig |

**Wortbudget gesamt:** ~500W (Ziel: max. 500W)

**Mindest-Check:** 1 darstellungstext (mat-4-2) ✓ | 1 quelle/bild (mat-4-1 BQ, mat-4-3 QT) ✓ | 1 personifiziert (mat-4-4, mat-4-5) ✓ | 1 visuell (mat-4-1 BQ) ✓ | gesamt 5 ≥ 4 ✓

**Perspektiven-Abdeckung (Konflikttyp=true):**
- P1 Siegermaechte: mat-4-3 (QT: Artikel 231 ist der Text der Siegermaechte — Schuldzuweisung an Deutschland) ✓
- P2 Deutsche Wirtschaft: mat-4-4 (TB: Industrieller erlebt Reparationen als existenzielle Bedrohung) ✓
- P3 Deutsche Bildungsbuerger: mat-4-5 (TB: Lehrer erlebt Wandel von Hoffnung auf gerechten Frieden zu Wut ueber Diktat) ✓
- 3/3 Perspektiven repraesentiert ✓

**Dispatch-Constraints aus Inhaltsaudit (BEFUND_PHASE_1_INHALTSAUDIT):**
- **mat-4-2 (M4-A2, HIGH):** Dispatch-Constraint: DT MUSS intern klar sequenzialisiert sein: "Erstens: Abruestung... Zweitens: Gebietsverluste... Drittens: Reparationen..." Kategorial getrennt, nicht als Aufzaehlung. Jede Kategorie mit 1 konkretem Beispiel/Zahl.
- **mat-4-3 (M4-F1, HIGH):** Dispatch-Constraint: QT MUSS starke Didaktisierung enthalten — nicht nur vereinfachte Fassung von Art. 231, sondern Einleitungsfragen ("Was bedeutet es, wenn ein Land die alleinige Schuld bekommt?"), Konkretisierungen ("Das bedeutet: Deutschland allein hat den Krieg verursacht..."), und quellenkritischer Impuls ("Stimmst du zu? Traegt wirklich nur ein Land die Schuld?").
- **mat-4-4 (M4-C1, MEDIUM):** Dispatch-Constraint: TB SOLL erklaeren, WARUM Frankreich Reparationen fordert (eigenes Land zerstoert, Millionen Tote) — Siegermaechte-Perspektive darf nicht nur als Bestrafung erscheinen.
- **mat-4-5 (M4-G1, CRITICAL):** sensibilitaets_markierung = `mythos_korrektur_noetig`. korrektur_satz (PFLICHT): "Diese Behauptung ist falsch. Die Armee war erschoepft, Ludendorff selbst forderte den Waffenstillstand." Oder aequivalente Kennzeichnung: Die Dolchstosslegende MUSS im TB-Material explizit als Luege/Mythos benannt werden. Wenn der Lehrer nur "wuetend" ist ohne Korrektur, koennen SuS die Legende fuer wahr halten.

---

## Zielklarheit-Pruefung

| Material | Funktion (1-Satz) | SCPL-Zone | Artefakt-Ref |
|---|---|---|---|
| mat-4-1 | Dieses Material zeigt die Unterzeichnung in Versailles und aktiviert die Frage, warum Deutschland einen Vertrag unterschreibt, den es hasst. | S | img-4-1 |
| mat-4-2 | Dieses Material erklaert die drei Kategorien des Vertrags — Abruestung, Gebietsverluste, Reparationen — und macht die Schwere der Bedingungen greifbar. | C1/C2/C3 | — |
| mat-4-3 | Dieses Material laesst SuS den Kriegsschuldparagraphen selbst lesen und die Ungerechtigkeit der Alleinschuld-Zuweisung erkennen. | P | pq-4-1 |
| mat-4-4 | Dieses Material zeigt durch die Perspektive eines Industriellen, wie Reparationen und Kriegsschuld konkret erlebt wurden — existenzielle Angst und Wut. | C3/P | rolle-4-1 |
| mat-4-5 | Dieses Material macht den psychologischen Wandel von Hoffnung (Waffenstillstand 1918) zu Wut (Versailles 1919) greifbar und fuehrt die Dolchstosslegende als gefaehrliche Folge ein. | P | rolle-4-2 |

---

## Nicht verwendete Artefakte

- **img-4-2** (Karte: Deutschlands territoriale Verluste 1919) — Reserve. Inhaltlich durch mat-4-2 DT abgedeckt (Gebietsverluste textlich erklaert). Eignung: Hoch — bei Budget-Erweiterung als eigenstaendiges Karten-Material (erarbeitung, C2). Wuerde visuelle Verstaerkung der kategorialen Struktur bieten.
- **pq-4-2** (Brockdorff-Rantzau Protest gegen Vertrag) — Reserve. Inhaltlich redundant mit mat-4-1 BU (Protest-Kontext in Bildunterschrift). Eignung: Ergaenzende Multiperspektivitaet oder Aufgaben-Material in Phase 2.
- **zit-4-1** (Brockdorff-Rantzau: "Dieser Vertrag ist ein Todesurteil") — Reserve. Kontextuell bereits in mat-4-1 BU erwaehnt (Zitat als Bildunterschrift-Kontext). Eignung: Vertiefungs-Quellenarbeit.
- **zit-4-2** (Historiker: "20-Jahre-Waffenstillstand, kein Frieden") — Reserve. Eignung: Hoch — Historiker-Rueckblick als Transfer-Impuls oder Sicherungsmaterial. Kann in Phase 2 als Aufgabenkontext integriert werden.

---

## Erarbeitbarkeits-Nachweis

| SCPL-Zone | Material | Erarbeitungsweg |
|---|---|---|
| S: Versailles — Deutschland nicht am Tisch | mat-4-1 (BQ: Unterzeichnungsfoto, BU benennt Diktatfrieden) + mat-4-2 (DT: fuehrt Begriffe ein) | SuS sehen die Szene der Unterzeichnung (mat-4-1): ein formeller Akt, bei dem Deutschland nicht mitverhandeln durfte. Der DT (mat-4-2) baut darauf auf und erklaert, was im Vertrag steht. |
| S→C1/C2/C3 (Uebergang) | mat-4-1 → mat-4-2 | Das Foto zeigt den Akt, der DT erklaert den Inhalt. SuS schliessen: So sah es aus — und das steht drin. |
| C1: Abruestung (100.000 Mann) | mat-4-2 (DT: erklaert militaerische Bestimmungen) | SuS lesen, dass Deutschlands Armee auf 100.000 Mann begrenzt wird, keine Luftwaffe, keine U-Boote, keine Panzer. Die Kategorie "militaerisch" wird als erste Vertragssaeule greifbar. |
| C2: Gebietsverluste (13%) | mat-4-2 (DT: erklaert territoriale Verluste) | SuS lesen, dass Elsass-Lothringen, Posen und Westpreussen abgetreten werden — 13% des Territoriums. Die Kategorie "territorial" wird als zweite Vertragssaeule greifbar. |
| C3: Reparationen (132 Mrd. Goldmark) | mat-4-2 (DT: erklaert wirtschaftliche Bedingungen) + mat-4-4 (TB: Industrieller reagiert) | SuS lesen die Summe im DT und erleben durch den Industriellen, was 132 Milliarden Goldmark fuer die Wirtschaft konkret bedeuten. |
| C1/C2/C3→P (Uebergang) | mat-4-2 → mat-4-3 | Der DT hat die drei Kategorien erklaert. Jetzt kommt der Kern: Wer ist schuld? Artikel 231 gibt die Antwort der Siegermaechte. |
| P: Artikel 231 Kriegsschuldparagraph | mat-4-3 (QT: Originaltext Art. 231) + mat-4-4 (TB: Industrieller reagiert) + mat-4-5 (TB: Lehrer reflektiert) | SuS lesen den Originaltext, dann hoeren sie zwei deutsche Stimmen, die auf die Schuldzuweisung reagieren: wirtschaftliche Existenzangst (Industrieller) und moralische Empoerung (Lehrer). |
| P-Vertiefung | mat-4-4 → mat-4-5 | Vom wirtschaftlichen zum psychologischen: Der Industrielle sorgt sich um Geld und Zukunft — der Lehrer erkennt, dass die Hoffnung auf gerechten Frieden zerbrochen ist und eine gefaehrliche Luege (Dolchstosslegende) entsteht. |

**Abdeckungs-Check:** Jede Zone ≥1 Material ✓ | Jeder Uebergang belegt ✓ | Artefakt-Refs vollstaendig (mat-4-2 ohne Artefakt-Ref begruendet: AGENT schreibt DT auf Basis INHALTSBASIS) ✓

---

## Sequenzplan

| # | Material-ID | Typ | Didaktische Funktion | SCPL-Zone | material_charakter | bildfunktion | analyseauftrag | personalisiert | primary_scpl_zone | aktivierungscharakter | fachbegriffe_eingefuehrt | fachbegriffe_referenziert | Voraussetzung | Kerninhalt (1 Satz) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | mat-4-1 | bildquelle | einstieg | S | vergegenwaertigung | illustrativ | false | false | S | bild | [] | [] | — | Ein Foto der Unterzeichnung in Versailles zeigt den formellen Akt des Diktatfriedens. |
| 2 | mat-4-2 | darstellungstext | erarbeitung | C1/C2/C3 | vergegenwaertigung | n/a | false | false | C1 | — | [Versailler Vertrag, Diktatfrieden, Abruestung, Gebietsverluste, Reparationen] | [] | mat-4-1 | Der Versailler Vertrag legt Deutschland drei Kategorien harter Bedingungen auf: militaerische Begrenzung, Gebietsverluste und Reparationen. |
| 3 | mat-4-3 | quellentext | erarbeitung | P | vergegenwaertigung | n/a | false | false | P | — | [Kriegsschuldparagraph] | [Versailler Vertrag] | mat-4-2 | Artikel 231 gibt Deutschland die alleinige Schuld am Krieg — die SuS lesen den Originaltext der Schuldzuweisung. |
| 4 | mat-4-4 | tagebuch | erarbeitung | C3/P | vergegenwaertigung | n/a | false | true | P | — | [] | [Reparationen, Kriegsschuldparagraph] | mat-4-3 | Ein Industrieller aus dem Ruhrgebiet beschreibt seine Angst um die Wirtschaft und seine Wut ueber die Schuldzuweisung. |
| 5 | mat-4-5 | tagebuch | vertiefung | P | vergegenwaertigung | n/a | false | true | P | — | [Dolchstosslegende] | [Versailler Vertrag, Kriegsschuldparagraph, Diktatfrieden] | mat-4-4 | Ein Lehrer beschreibt den Wandel von Hoffnung (Waffenstillstand) zu Wut (Versailles) und die Entstehung der Dolchstosslegende. |

### Uebergangsobjekte

| Von → Nach | rueckbezug_inhalt_ref | vorausblick_frage | kausalitaets_typ | intentionsskizze | kausal_mechanismus |
|---|---|---|---|---|---|
| mat-4-1 → mat-4-2 | Das Foto zeigte die Unterzeichnung des Versailler Vertrags — deutsche Diplomaten unterschreiben unter Protest einen Vertrag, den sie nicht mitverhandeln durften. | Welche Bedingungen stehen in diesem Vertrag, die Deutschland so wuetend machen? | vertiefend | Das Foto hat den Akt des Diktatfriedens visuell aktiviert. Jetzt sollen die SuS den Inhalt des Vertrags kennenlernen — die drei Kategorien, die Deutschland treffen: Abruestung, Gebietsverluste, Reparationen. | Diktatfrieden → drei Kategorien harter Bedingungen (militaerisch, territorial, wirtschaftlich) als Konkretion des Diktats. |
| mat-4-2 → mat-4-3 | Der Darstellungstext zeigte drei Kategorien harter Bedingungen: militaerische Begrenzung, Gebietsverluste von 13%, und 132 Milliarden Goldmark Reparationen. | Doch es gibt noch etwas Schlimmeres — wer traegt laut den Siegermaechten die Schuld am Krieg? | kausal | Von den konkreten Vertragsbedingungen zum moralischen Kern: Artikel 231 macht Deutschland zum allein Schuldigen. Die SuS sollen den Originaltext lesen und die Schuldzuweisung selbst erkennen. | Vertragsbedingungen sind hart aber verhandelbar — Artikel 231 (Alleinschuld) trifft die Ehre und macht Akzeptanz unmoeglich → moralische Demuetigung als Eskalation ueber materielle Verluste hinaus. |
| mat-4-3 → mat-4-4 | Artikel 231 wies Deutschland die alleinige Kriegsschuld zu — eine Schuldzuweisung, die viele Deutsche als Luege empfanden. | Wie erlebte ein Fabrikbesitzer die Kombination aus Reparationen und Kriegsschuld im Alltag? | vertiefend | Von der Quelle zur persoenlichen Reaktion: Der Industrielle macht greifbar, was Reparationen und Schuldzuweisung fuer einen konkreten Menschen bedeuteten — existenzielle Angst und Wut. | Vertragsbedingungen sind hart aber verhandelbar — Artikel 231 (Alleinschuld) trifft die Ehre und macht Akzeptanz unmoeglich → moralische Demuetigung als Eskalation ueber materielle Verluste hinaus. |
| mat-4-4 → mat-4-5 | Der Industrielle sorgte sich um seine Fabriken, seine Arbeiter, die wirtschaftliche Zukunft — und war wuetend ueber die Schuldzuweisung. | Was machte die Wut ueber Versailles mit dem Vertrauen in die junge Demokratie? | kausal | Von der wirtschaftlichen zur politischen Dimension: Der Lehrer zeigt, wie aus Hoffnung (Waffenstillstand 1918) Wut (Versailles 1919) wurde — und wie die Dolchstosslegende als gefaehrliche Luege die junge Demokratie vergiftete. | Wirtschaftliche Existenzangst (Industrieller) + moralische Empoerung (Lehrer) → Dolchstosslegende als psychologisches Ventil: Nicht WIR haben verloren, sondern "die Politiker haben uns verraten". |

### Sequenzkontext-Objekte

| Material-ID | vorher (ID, Typ, Kerninhalt) | nachher (ID, Typ, Kerninhalt) |
|---|---|---|
| mat-4-1 | — | mat-4-2, darstellungstext, Drei Kategorien des Versailler Vertrags: Abruestung, Gebietsverluste, Reparationen. |
| mat-4-2 | mat-4-1, bildquelle, Foto der Unterzeichnung in Versailles 1919. | mat-4-3, quellentext, Artikel 231 Kriegsschuldparagraph im Originaltext. |
| mat-4-3 | mat-4-2, darstellungstext, Vertragsbedingungen: militaerisch, territorial, wirtschaftlich. | mat-4-4, tagebuch, Industrieller reagiert auf Reparationen und Kriegsschuld. |
| mat-4-4 | mat-4-3, quellentext, Artikel 231 weist Deutschland die alleinige Kriegsschuld zu. | mat-4-5, tagebuch, Lehrer beschreibt Wandel von Hoffnung zu Wut und Dolchstosslegende. |
| mat-4-5 | mat-4-4, tagebuch, Industrieller: existenzielle Angst und Wut ueber Diktatfrieden. | — |

---

## Einstieg und Sicherung

### Einstieg
**Typ:** narrativ (Zeitungsreporter-Rahmen, Abschluss-Bericht)
**Text:** "Euer letzter Bericht. Die Revolution hat eine Republik geschaffen, der Waffenstillstand ist unterschrieben. Doch in Versailles schreiben die Siegermaechte einen Vertrag — und Deutschland darf nicht mitverhandeln. Was steht in diesem Vertrag, und warum macht er die Deutschen so wuetend?"
**Problemstellung:** Warum wurde der Friedensvertrag zum Diktat?
**Tafelbild-Voraussetzung:** Mappe 3: Waffenstillstand, Hoffnung auf gerechten Frieden (Wilsons 14 Punkte)

### Sicherung
**Typ:** reflexion
**Hefteintrag-Verweis:** TAFELBILD_verlauf-erster-weltkrieg-marne-ende_Mappe4.md (SCPL: S→C1→C2→C3→P→L, 7 Fachbegriffe, 3 Kernerkenntnisse)
**Reflexionsimpuls:** "War der Versailler Vertrag ein gerechter Frieden — oder ein Diktat, das neuen Krieg vorbereitete?"
**Ueberleitung:** Transfer-Frage: "Kann ein Friedensvertrag neuen Krieg verursachen?" (Abschluss-Reflexion ueber den gesamten Krieg: Stellungskrieg → Heimatfront → Revolution → Diktatfrieden)

---

## Perspektiven-Abdeckungsmatrix

| Perspektive | mat-4-1 | mat-4-2 | mat-4-3 | mat-4-4 | mat-4-5 | Abdeckung |
|---|---|---|---|---|---|---|
| P1: Siegermaechte | X (Foto) | | X (Art. 231) | | | 2/5 |
| P2: Deutsche Wirtschaft | | | | X | | 1/5 |
| P3: Deutsche Bildungsbuerger | | | | | X | 1/5 |
| Franzoesische Motivation | | | | | | 0/5 |

**Fehlende Perspektiven:** Franzoesische Motivation (M4-C1 MEDIUM) — Warum Frankreich Reparationen forderte (eigenes Land verwuestet) nicht als eigenstaendige Perspektive. Dispatch-Constraint fuer mat-4-4 kompensiert teilweise (TB SOLL Siegermaechte-Motivation erklaeren). Siegermaechte-Perspektive in mat-4-3 (Art. 231) ist Textperspektive, nicht persoenliche Sicht.

---

## Q-Gate Self-Check

| # | Kriterium | Prio | Ergebnis | Detail |
|---|---|---|---|---|
| S1 | Artikulationsschema-Konformitaet | MUSS | PASS | Historische Perspektive: Problembegegnung (mat-4-1) → Vergegenwaertigung (mat-4-2 bis mat-4-5). Alle Materialien vergegenwaertigung. Phasenfolge eingehalten. |
| S2 | Vorwissen-Progression | MUSS | PASS | mat-4-1: [] → []. mat-4-2: einfuehrt [Versailler Vertrag, Diktatfrieden, Abruestung, Gebietsverluste, Reparationen] → ref []. mat-4-3: einfuehrt [Kriegsschuldparagraph] → ref [Versailler Vertrag] (mat-4-2). mat-4-4: einfuehrt [] → ref [Reparationen, Kriegsschuldparagraph] (alle eingefuehrt). mat-4-5: einfuehrt [Dolchstosslegende] → ref [Versailler Vertrag, Kriegsschuldparagraph, Diktatfrieden] (alle eingefuehrt). Keine Vorwissensluecke. |
| S3 | TB-Knoten-Abdeckung | MUSS | PASS | S→mat-4-1/mat-4-2. C1→mat-4-2. C2→mat-4-2. C3→mat-4-2/mat-4-4. P→mat-4-3/mat-4-4/mat-4-5. Alle 5 SCPL-Zonen abgedeckt. |
| S4 | Didaktische-Funktion-Sequenzlogik | MUSS | PASS | einstieg → erarbeitung → erarbeitung → erarbeitung → vertiefung. Gueltige Reihenfolge. Kein sicherung vor letztem erarbeitung. |
| S5 | Vergegenwaertigung vor Besinnung | MUSS | PASS | Alle 5 Materialien material_charakter = vergegenwaertigung. Keine besinnung vorhanden — trivial erfuellt. |
| S14 | SCPL-Korrespondenz | MUSS | PASS | S(1) → C1/C2/C3(2) → P(3) → C3/P(4) → P(5). Kategorial: Parallele C-Zonen gebuendelt in Position 2, dann konvergiert alles in P. Aufbau-Logik eingehalten. |
| S15 | Skript-Kongruenz | MUSS | PASS | §1(1) → §2–§3(2) → §4–§5(3) → §5(4) → §5–§6(5). Folgt SKRIPT-Absatzreihenfolge. |
| S16 | Zonen-Last-Limit | SOLL | WARN | mat-4-2 deckt 3 Zonen (C1, C2, C3) als primary_scpl_zone=C1. Begruendung: Kategorial-parallele Struktur (Abruestung + Gebietsverluste + Reparationen) — drei Aspekte desselben Vertrags, nur als Einheit verstaendlich. Dispatch-Constraint M4-A2 fordert interne Sequenzialisierung ("Erstens... Zweitens... Drittens..."). |
| S17 | Materialtyp-SCPL-Kongruenz | SOLL | PASS | BQ (illustrativ) fuer S-Einstieg kongruent. DT fuer kategorial-erklaerende C-Zonen kongruent. QT fuer moralisch-analytische P-Zone kongruent. |
| S7 | Anschaulich → Abstrakt | SOLL | PASS | BQ → DT → QT → TB → TB. Visuell → erklaerend → quellenbasiert → persoenlich → persoenlich-reflektierend. Aufsteigende Komplexitaet. |
| S8 | Kontextgebot Quellenarbeit | SOLL | PASS | Quellentext mat-4-3 steht an Position 3. Zwei Kontextmaterialien (mat-4-1 BQ, mat-4-2 DT) gehen voraus. |
| S9 | Uebergangs-Kohaerenz | SOLL | PASS | Alle 4 Uebergaenge mit rueckbezug ≥8W, vorausblick ≥8W, validem kausalitaets_typ und intentionsskizze. |
| S10 | Aktivierung am Sequenzbeginn | SOLL | PASS | mat-4-1: einstieg, aktivierungscharakter = bild, fachbegriffe_eingefuehrt = []. |
| S11 | Materialtyp-Vielfalt | KANN | PASS | 3 verschiedene Typen: bildquelle, darstellungstext, quellentext, tagebuch (4 Typen). |
| S13 | Personalisierung in Fruehphase | KANN | WARN | Erstes personalisiertes Material (mat-4-4) an Position 4 von 5 — zweite Haelfte. Begruendung: Die kategorial-erklaerende Struktur (S→C1/C2/C3→P) erfordert, dass die drei Vertragskategorien vor der persoenlichen Reaktion stehen. Eine Verschiebung der Personalisierung nach vorn wuerde die SCPL-Abfolge brechen. |
| S6 | Sequenzkontext-Vollstaendigkeit (Pre-Check) | — | PASS | Alle 5 Materialien haben vollstaendige sequenz_kontext-Objekte. vorher(N) = nachher(N-1) konsistent. |

**Gate-Urteil:** PASS (alle MUSS erfuellt, SOLL S16 WARN — mat-4-2 deckt 3 Zonen wegen kategorial-paralleler Struktur, S17 PASS, KANN S13 WARN — begruendet durch kategorial-Struktur)
