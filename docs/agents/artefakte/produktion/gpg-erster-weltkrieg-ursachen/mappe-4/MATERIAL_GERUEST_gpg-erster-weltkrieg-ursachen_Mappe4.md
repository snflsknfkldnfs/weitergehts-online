# Material-Geruest: Mappe 4 — Der Schlieffen-Plan

**Erstellt:** 2026-04-03 (D-1, Produktionssession C2)
**Dispatch:** D-1 (AGENT_MATERIAL Design-Modus)
**Eingabe:** SKRIPT Chunk 4 (§1-§6), TAFELBILD Mappe 4 (Q-Gate G1-G14 PASS), DIDAKTIK_RAHMEN (KE-C), INHALTSBASIS Mappe 4
**Status:** ENTWURF — User-Validierung nach D-1.5

---

## Materialtyp-Zuordnung

| # | mat-ID | Typ | Skript-Ref | Artefakt-Ref | TB-Knoten | Funktion (1 Satz) |
|---|--------|-----|------------|--------------|-----------|---------------------|
| 1 | mat-4-1 | darstellungstext | §1-§3 | zit-4-1 (eingebettet) | k4-1, k4-2, k4-3 | Erklaert Zweifrontenkrieg als Problem, Schlieffen-Plan als Loesung, Zeitluecke als Praemisse. |
| 2 | mat-4-2 | karte | §2, §4 | img-4-1 | k4-1, k4-4 | Visualisiert den Schlieffen-Plan als geographische Strategie und den geplanten Einmarschweg durch Belgien. |
| 3 | mat-4-3 | tagebuch | §4 | rolle-4-1 | k4-4 | Personifiziert den Vormarsch aus Soldatenperspektive: von Siegeszuversicht zu Erschoepfung und Nachschubproblemen. |
| 4 | mat-4-4 | karte | §5 | img-4-2 | k4-5 | Macht die Marne-Schlacht raeumlich nachvollziehbar: Gallieni-Flanke, Gegenoffensive, 65 km Rueckzug. |
| 5 | mat-4-5 | bildquelle | §6 | img-4-3 | k4-6 | Zeigt den Stellungskrieg als konkrete Realitaet (Schuetzengraben-Foto) im Kontrast zum geplanten Bewegungskrieg. |

### Nicht als eigenes Material zugeordnet

| Artefakt-ID | Typ | Begruendung |
|---|---|---|
| img-4-4 | karte (Vormarsch Belgien) | Ergaenzungsreferenz fuer mat-4-2 oder mat-4-3. img-4-1 deckt den Plan visuell ab, mat-4-3 personifiziert den Vormarsch. Eigenes Material wuerde 3. Karte erzeugen → Typueberhang. |
| zit-4-2 | quellentext (Moltke: "Krieg verloren") | In mat-4-5 (Bildquelle) als Bildunterschrift-Kontext nutzbar. Zu kurz fuer eigenstaendiges Quellentext-Material. |
| rolle-4-2 | tagebuch (Krankenschwester) | Starkes Personifizierungselement, aber bei 5 Materialien wuerde ein zweites Tagebuch die analytische Tiefe zugunsten doppelter Personifizierung reduzieren. Menschliche Dimension der Marne durch rolle-4-1 (Infanterist) und img-4-3 (Stellungskrieg-Foto) abgedeckt. |

---

## TB-Abdeckungs-Nachweis

### Knoten-Abdeckung

| TB-Knoten | Text | Material-Zuordnung | Erarbeitungsweg |
|---|---|---|---|
| k4-1 | Schlieffen-Plan | mat-4-1 (DT, §2-§3) + mat-4-2 (Karte, img-4-1) | DT erklaert Idee + Zeitkalkuel; Karte visualisiert Angriffspfeile durch Belgien. |
| k4-2 | Zweifrontenkrieg (Problem) | mat-4-1 (DT, §1) | DT erklaert geographische Lage DE zwischen FR und RU als unloesbares Dilemma. |
| k4-3 | Zeitluecke (Russland langsam) | mat-4-1 (DT, §3) | DT erklaert Mobilmachungs-Asymmetrie: RU gross + schlechte Infrastruktur → langsam. |
| k4-4 | Einmarsch ueber Belgien | mat-4-2 (Karte, img-4-1) + mat-4-3 (Tagebuch, rolle-4-1) | Karte zeigt Route; Tagebuch personifiziert Vormarsch + Erschoepfung. |
| k4-5 | Schlacht an der Marne (Sept. 1914) | mat-4-4 (Karte, img-4-2) | Karte zeigt Frontlinien, Gallieni-Flankenangriff, 65 km Rueckzug. |
| k4-6 | Stellungskrieg | mat-4-5 (Bildquelle, img-4-3) | Foto zeigt Schuetzengraben-Realitaet. Kontrast zum geplanten Bewegungskrieg. |

**Ergebnis:** Alle 6 Knoten durch mindestens 1 Material abgedeckt.

### Verbindungs-Abdeckung

| Verbindung | Label | Material-Beleg |
|---|---|---|
| k4-2 → k4-1 | Antwort auf | mat-4-1: DT erklaert beide Knoten als Ursache-Loesung-Zusammenhang (§1 Problem → §2 Plan). |
| k4-3 → k4-1 | Grundannahme | mat-4-1: DT erklaert Zeitluecke als tragende Praemisse des Plans (§3). |
| k4-1 → k4-4 | sieht vor | mat-4-2: Karte zeigt Planpfeile → tatsaechliche Einmarschroute. |
| k4-4 → k4-5 | scheitert an | mat-4-3 → mat-4-4 (Sequenz): Erschoepfung im Tagebuch → Gegenoffensive in Karte. |
| k4-5 → k4-6 | fuehrt zu | mat-4-4 → mat-4-5 (Sequenz): Marne-Karte → Stellungskrieg-Foto. |
| k4-6 → k3-1 | widerlegt Glaube an schnellen Sieg | mat-4-5 + Hefteintrag: Foto zeigt Realitaet vs. Erwartung. Voraussetzung k3-1 in Mappe 3 gesichert. |

**Ergebnis:** Alle 6 Verbindungen durch Material oder Material-Sequenz belegt.

### Voraussetzungs-Check

| Voraussetzung | Quelle | Sicherung |
|---|---|---|
| k3-1 (Kriegsbegeisterung — Glaube an schnellen Sieg) | Mappe 3, Hefteintrag | TAFELBILD Mappe 3: k3-1 ist Kernbegriff, in Loesung[] gesichert. |

---

## Erarbeitbarkeits-Nachweis (SCPL)

| SCPL-Schritt | Status | Material(ien) | Erarbeitungsweg |
|---|---|---|---|
| S: Zweifrontenkrieg als Problem | DIRECT | mat-4-1 (DT, §1) | DT erklaert: DE liegt zwischen FR und RU, Krieg an zwei Fronten nicht gewinnbar. |
| C1: Schlieffen-Plan (Idee + Zeitluecke) | DIRECT + ARTIFACT | mat-4-1 (DT, §2-§3) + mat-4-2 (Karte, img-4-1) | DT: Strategie (erst FR, dann RU) + Zeitkalkuel. Karte: Angriffsrichtung durch Belgien. zit-4-1 eingebettet. |
| C2: Vormarsch durch Belgien | DIRECT + ARTIFACT | mat-4-2 (Karte) + mat-4-3 (Tagebuch, rolle-4-1) | Karte: Route visuell. Tagebuch: Siegeszuversicht → Erschoepfung → Nachschubprobleme. |
| C3: Schlacht an der Marne | DIRECT + ARTIFACT | mat-4-4 (Karte, img-4-2) | Karte: Frontlinien Paris–Verdun, Gallieni-Flanke, Rueckzug 65 km. |
| P: Scheitern → Stellungskrieg | DIRECT + ARTIFACT | mat-4-5 (Bildquelle, img-4-3) | Foto: Schuetzengraben-Bau 1914. Kontrast: geplant 40 Tage Sieg → 4 Jahre Graben. zit-4-2 (Moltke) in BU nutzbar. |

**Ergebnis:** Alle 5 SCPL-Schritte DIRECT oder DIRECT+ARTIFACT. Kein Status UNKLAR.

---

## Mindest-Materialien-Check

| Anforderung | Erfuellt durch | Status |
|---|---|---|
| 1 Darstellungstext (Basisinformation) | mat-4-1 | PASS |
| 1 Quellentext ODER Bildquelle (historische Authentizitaet) | mat-4-5 (bildquelle) | PASS |
| 1 personifiziertes Material (Empathie) | mat-4-3 (tagebuch) | PASS |
| 1 visuelles Material (Struktur) | mat-4-2 + mat-4-4 (karte) | PASS |

**Gesamt:** 5 Materialien, 4 verschiedene Typen (darstellungstext, karte, tagebuch, bildquelle). Minimum 4 erreicht.

---

## Einstieg-Entwurf

**Narrativ (2-3 Saetze):** Die Soldaten glauben an einen schnellen Sieg und erwarten, bis Weihnachten wieder zu Hause zu sein. Doch worauf stuetzt sich dieser Glaube? Die deutschen Generaele haben einen Plan — und dieser Plan wird scheitern.

**Problemstellung (C1b = Stundenfrage):** Warum scheiterte der Plan fuer einen schnellen Sieg?

---

## Sicherung-Entwurf

**Zusammenfassung (2-3 Saetze):** Der Schlieffen-Plan sollte den Zweifrontenkrieg loesen: erst Frankreich in 40 Tagen besiegen, dann Russland. Doch an der Marne stoppten franzoesische und britische Truppen den Vormarsch. Statt eines schnellen Sieges begann ein vierjähriger Stellungskrieg.

**Hefteintrag-Verweis:** Uebertrage das Tafelbild in dein Heft. Die Stundenfrage lautet: Warum scheiterte der Plan fuer einen schnellen Sieg?

**Ueberleitung (C5 Variante B — letzte Mappe):** [Reflexionsimpuls statt Ueberleitung zur naechsten Mappe]

**Reflexionsimpuls:** Warum gehen Plaene manchmal schief, obwohl sie auf dem Papier logisch klingen?

**Transfer-Frage (TAFELBILD):** Warum gehen Plaene manchmal schief, obwohl sie auf dem Papier logisch klingen?

**Hinweis:** Mappe 4 ist die letzte Mappe des Games. C5 Variante B: Reflexionsfrage statt Ueberleitung. Transfer-Frage und Reflexionsimpuls sind hier identisch (aus TAFELBILD uebernommen).

---

## Sequenzplan

**Erstellt:** 2026-04-03 (D-1.5, Produktionssession C2)
**Ordnungsrahmen:** SKRIPT-Absatzfolge (Primaer) + SCPL-Aufbau (Kontrolle). Keine Divergenz — beide kongruent.
**Artikulationsschema:** Historisch (Problembegegnung → Vergegenwaertigung → Besinnung → Sicherung)

| # | Material-ID | Typ | Didaktische Funktion | TB-Knoten | SCPL-Phase | material_charakter | bildfunktion | analyseauftrag | personalisiert | primary_tb_knoten | Voraussetzung | Kerninhalt (1 Satz) |
|---|-------------|-----|----------------------|-----------|------------|-------------------|--------------|----------------|----------------|-------------------|---------------|---------------------|
| 1 | mat-4-1 | darstellungstext | erarbeitung | k4-2, k4-1, k4-3 | S+C1 | vergegenwaertigung | n/a | false | false | k4-2 | — | Erklaert Zweifrontenkrieg als Problem und Schlieffen-Plan als Strategie mit Zeitluecke. |
| 2 | mat-4-2 | karte | erarbeitung | k4-1, k4-4 | C1+C2 | vergegenwaertigung | illustrativ | false | false | k4-1 | mat-4-1 | Visualisiert den Schlieffen-Plan: Angriffspfeile durch Belgien nach Frankreich. |
| 3 | mat-4-3 | tagebuch | erarbeitung | k4-4 | C2 | vergegenwaertigung | n/a | false | true | k4-4 | mat-4-2 | Personifiziert den Vormarsch: Siegeszuversicht, dann Erschoepfung und Nachschubprobleme. |
| 4 | mat-4-4 | karte | erarbeitung | k4-5 | C3 | vergegenwaertigung | illustrativ | false | false | k4-5 | mat-4-3 | Zeigt die Marne-Schlacht: Gallieni-Flanke, Gegenoffensive, 65 km Rueckzug. |
| 5 | mat-4-5 | bildquelle | sicherung | k4-6 | P | vergegenwaertigung | illustrativ | false | false | k4-6 | mat-4-4 | Schuetzengraben-Foto als visueller Anker: Stellungskrieg statt schnellem Sieg. |

### Ueberleitungen (Intentionsskizzen — finale Formulierung in Phase 2.1c)

- mat-4-1 → mat-4-2: "Du hast gelesen, dass der Schlieffen-Plan einen Angriff durch Belgien vorsah. Aber wie genau sah dieser Plan auf der Karte aus?"
- mat-4-2 → mat-4-3: "Die Karte zeigt den geplanten Vormarsch. Doch wie erlebten die Soldaten diesen Marsch durch Belgien und Frankreich?"
- mat-4-3 → mat-4-4: "Der Soldat beschreibt Erschoepfung und Hunger nach einem Monat Feldzug. Genau in diesem Moment beginnt die franzoesische Gegenoffensive."
- mat-4-4 → mat-4-5: "An der Marne mussten die deutschen Truppen 65 Kilometer zurueckweichen. Der Plan fuer einen schnellen Sieg war gescheitert. Was folgte stattdessen?"

### Sequenzkontext-Objekte (fuer Subagenten-Dispatch)

**mat-4-1:**
- vorher: — (Position 1)
- nachher: mat-4-2 | karte | Visualisiert den Schlieffen-Plan: Angriffspfeile durch Belgien.

**mat-4-2:**
- vorher: mat-4-1 | darstellungstext | Erklaert Zweifrontenkrieg und Schlieffen-Plan als Strategie mit Zeitluecke.
- nachher: mat-4-3 | tagebuch | Personifiziert den Vormarsch: Siegeszuversicht → Erschoepfung.

**mat-4-3:**
- vorher: mat-4-2 | karte | Visualisiert den Schlieffen-Plan: Angriffspfeile durch Belgien.
- nachher: mat-4-4 | karte | Zeigt die Marne-Schlacht: Gegenoffensive und deutscher Rueckzug.

**mat-4-4:**
- vorher: mat-4-3 | tagebuch | Personifiziert den Vormarsch: Siegeszuversicht → Erschoepfung.
- nachher: mat-4-5 | bildquelle | Schuetzengraben-Foto: Stellungskrieg statt schnellem Sieg.

**mat-4-5:**
- vorher: mat-4-4 | karte | Zeigt die Marne-Schlacht: Gegenoffensive und deutscher Rueckzug.
- nachher: — (letzte Position)

---

## Q-Gate: Sequenzplan Mappe 4

| # | Kriterium | Prio | Ergebnis | Detail |
|---|---|---|---|---|
| S1 | Artikulationsschema-Konformitaet | MUSS | PASS | Historisch: Problembegegnung (mat-4-1) → Vergegenwaertigung (mat-4-2 bis mat-4-4) → Sicherung (mat-4-5). Monoton. |
| S2 | Vorwissen-Progression | MUSS | PASS | Alle Fachbegriffe durch vorherige Materialien oder Mappe-3-Voraussetzung (k3-1) gedeckt. Keine Vorgriffe. |
| S3 | TB-Knoten-Abdeckung | MUSS | PASS | 6/6 Knoten abgedeckt (k4-1 bis k4-6). |
| S4 | Didaktische-Funktion-Sequenzlogik | MUSS | PASS | erarbeitung ×4 → sicherung. Monoton (parallele erarbeitung bei mehreren C-Knoten erlaubt). |
| S5 | Vergegenwaertigung vor Besinnung | MUSS | PASS | Alle 5 Materialien Vergegenwaertigung-Typ. Kein Besinnungs-Material. |
| S6 | Sequenzkontext-Vollstaendigkeit | MUSS | PASS | 5/5 Objekte vollstaendig. Pos 1 vorher leer, Pos 5 nachher leer. |
| S14 | SCPL-Korrespondenz | MUSS | PASS | S-Knoten: Pos 1. C-Knoten: Pos 1-4. P-Knoten: Pos 5. Monoton S → C → P. |
| S15 | Skript-Kongruenz | MUSS | PASS | 5/5 Materialien folgen SKRIPT-Reihenfolge. Keine Abweichungen. |
| S7 | Vom Anschaulichen zum Abstrakten | SOLL | PASS | 1. Haelfte: DT(2)+Karte(1)=1.5. 2. Haelfte: TB(1)+Karte(1)+BQ(1)=1.0. Grenzwert nicht ueberschritten. |
| S8 | Kontextgebot Quellenarbeit | SOLL | PASS | Kein Quellentext. BQ (Pos 5) hat 4 Kontextmaterialien vorangestellt. |
| S9 | Uebergangs-Kohaerenz | SOLL | PASS | 4/4 Ueberleitungen inhaltlich motiviert (Rueckbezug + Vorausblick). |
| S10 | Aktivierung am Sequenzbeginn | SOLL | FAIL | Pos 1 = erarbeitung mit Fachbegriffen. Begruendung: Einstieg-Funktion durch Rahmen-einstieg.json abgedeckt. Material-Sequenz beginnt mit Erarbeitung. |
| S11 | Materialtyp-Vielfalt | KANN | PASS | 4 verschiedene Typen (DT, Karte, Tagebuch, BQ). |
| S12 | Sprachregister-Progression | KANN | PASS | Narrativ-erklaerend → visuell-deskriptiv → personalisiert → visuell → ankernd. |
| S13 | Personalisierung in Fruehphase | KANN | PASS | mat-4-3 (Tagebuch) an Pos 3 = erste Haelfte. |

**Gesamt:** PASS (8/8 MUSS, 4/5 SOLL — S10 FAIL dokumentiert und begruendet, 3/3 KANN)
