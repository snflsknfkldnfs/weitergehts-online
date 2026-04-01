# Strategischer Audit: v4 Prozessqualitaet

**Datum:** 2026-03-31
**Auditor:** Claude (Cowork, frische Perspektive)
**Audit-Briefing:** docs/uebergabe/AUDIT_v4_STRATEGIE.md
**Vorgaenger-Audit:** docs/analyse/AUDIT_v4_ARCHITEKTUR_ERGEBNIS.md (mechanisch, gleicher Tag)
**Modus:** Read-Only — keine Dateien geaendert, kein Git
**Gelesene Dateien:** WORKFLOW_v4.md (aktualisiert, Post-Audit), UPGRADE_PLAN_v4 (aktualisiert, Post-Audit), alle 3 SUB_MATERIAL_* (DT/QT/BQ), SUB_AUFGABE_MC, SUB_AUFGABE_FREITEXT, AGENT_RAETSEL, AGENT_MATERIAL, Goldstandard data.json (Mappe 1), QUALITAETSKRITERIEN_MATERIALPRODUKTION, GUETEKRITERIEN_AUFGABEN, MATERIAL_GERUEST_Mappe2

---

## S1: Subagenten-Isolation als Qualitaetstreiber

**Bewertung: Wirksam — mit einer strukturellen Einschraenkung.**

### Warum Isolation bessere Materialien produziert

Die These ist nicht nur plausibel, sondern durch die Subagenten-Prompts selbst belegt. SUB_MATERIAL_DARSTELLUNGSTEXT hat 170 Zeilen an spezifischer Expertise: 6 Vergegenwaertigungsprinzipien, R7-Sprachregister-Tabelle, didaktische Textstruktur, Tafelbild-Erarbeitbarkeits-Check. SUB_MATERIAL_QUELLENTEXT hat einen Dreischritt-Aufbereitungsprozess (Einleitung → Wortlaut → Impulse) mit Quellentyp-Differenzierung. SUB_MATERIAL_BILDQUELLE hat 6-Schritt-Erschliessung mit Karikatur-Sonderregeln.

Diese Expertise kann nur wirken, wenn der produzierende Agent sie als einzige Handlungsanweisung hat — nicht als einen von 12 gleichzeitig geladenen Prompts. In der monolithischen Claude-Code-Produktion (Mappe 2 v1/v2) wurden alle SUB_MATERIAL_* batch-gelesen. Das Ergebnis: generische Texte ohne Typ-Differenzierung, keine Dreischritt-Quellenaufbereitung, keine 3-Funktions-Bildunterschriften.

### Gegenargument: Kontextverlust durch Isolation

Das staerkste Gegenargument: Ein isolierter Subagent kennt die anderen Materialien der Mappe nicht. Er koennte Fachbegriffe wiederholen, die ein vorheriges Material bereits eingefuehrt hat. Er koennte eine Ueberleitung schreiben, die nicht zum vorherigen Material passt.

v4 adressiert das durch den Sequenzkontext (Phase 1.5). Jeder Subagent erhaelt: Position in Mappe, didaktische Funktion, vorheriges/naechstes Material (ID + Typ + Kerninhalt), zugeordneten TB-Knoten, vorausgesetztes Wissen, noch nicht eingefuehrte Begriffe. Das ist eine praezise, aber komprimierte Kontextrepraesentation.

**Evidenz aus Mappe 1 (Goldstandard):** Die Ueberleitungen in data.json sind materialuebergreifend koharent (z.B. mat-1-4 → mat-1-8: "Buelow forderte Deutschlands 'Platz an der Sonne'. Diese Karikatur zeigt, wie weit der imperialistische Machtanspruch reichte."). Der Sequenzkontext enthaelt genau die Information, die fuer solche Ueberleitungen noetig ist: Kerninhalt des Vorgaengers + Kerninhalt des Nachfolgers.

### Strukturelle Einschraenkung

Der Sequenzkontext wird in Phase 1.5 produziert, bevor die Materialien existieren. Er basiert auf Planung, nicht auf tatsaechlichen Materialinhalten. Wenn mat-2-1 (Darstellungstext) einen Fachbegriff anders formuliert als im Sequenzkontext vorgesehen, weiss mat-2-2 (Bildquelle) davon nichts.

**Risiko-Einschaetzung:** Gering. Die Sequenzkontext-Felder "Vorausgesetztes Wissen" und "Noch nicht eingefuehrte Begriffe" operieren auf der Ebene von TB-Knoten und Fachbegriffen — nicht auf der Ebene konkreter Formulierungen. Die SQ-1/SQ-2-Gates im Subagenten-Q-Gate pruefen exakt dies. Das Risiko waere hoeher, wenn Materialien sich aufeinander woertlich beziehen muessten — das tun sie nicht (die Ueberleitungen sind das einzige verbindende Element, und die werden aus dem Sequenzkontext generiert).

---

## S2: Q-Gate-Wirksamkeit

**Bewertung: Gemischt — starke formale Pruefung, strukturelle Schwaeche bei didaktischer Tiefenpruefung.**

### Was die Q-Gates tatsaechlich pruefen

Die Q-Gate-Kriterien lassen sich in drei Kategorien sortieren:

**Kategorie 1 — Mechanisch pruefbar, qualitaetswirksam:**
MQ2 (Titel-Typ), Q1 (Wortanzahl), Q2 (Satzlaenge), Q3 (Fachbegriffe erklaert), Q8 (HTML-Format), Q9 (Aktiv/Passiv), A4-* (Distraktoren/Trennschaerfe/Luecken-Eindeutigkeit), A10 (Typvielfalt). Diese Kriterien sind klar operationalisiert, eindeutig PASS/FAIL-bewertbar und erzwingen tatsaechlich Qualitaet. Sie verhindern die offensichtlichsten Fehler: zu lange Saetze, unerklarte Fachbegriffe, absurde Distraktoren.

**Kategorie 2 — Inhaltlich, aber durch den Subagenten selbst pruefbar:**
Q5 (Tafelbild-Abdeckung), Q6 (Faktenquelle SKRIPT/INHALTSBASIS), Q10 (Vormappe-Bezug), A1 (AFB-Kongruenz), A3 (Material-Kongruenz), A5 (Progression). Diese Kriterien erfordern Abgleich zwischen Output und Input-Dokumenten. Ein Agent, der seine eigene Ausgabe gegen die Eingabe-Dokumente prueft, kann das leisten — vorausgesetzt, die Eingabe-Dokumente sind noch im Kontext. v4 garantiert das durch P1 (Read-from-Artifact), aber innerhalb eines einzelnen Dispatch hat der Agent die gelesenen Dateien im Kontext.

**Kategorie 3 — Didaktisch-qualitativ, strukturell schwer selbst-evaluierbar:**
Q7 (Multiperspektivitaet), SK1 (Vergegenwaertigung ≥50%), DT-2 (Detaillieren/Dramatisieren), QT-1 (Anschaulichkeit/emotionale Zugaenglichkeit), A8 (Kognitive Aktivierung). Diese Kriterien erfordern didaktisches Urteilsvermoegen, das ein Agent ueber seine eigene Ausgabe nur bedingt hat. "Ist mein Text vergegenwaertigend genug?" ist eine Frage, die der Autor systematisch zu positiv beantwortet.

### Selbst-Evaluation: Strukturelle Limitation

Kategorie-3-Kriterien sind die qualitaetskritischsten — sie bestimmen, ob ein Material R7-SuS tatsaechlich erreicht. Und sie sind die am schwersten selbst-pruefbaren. Das ist kein Defizit von v4 im Besonderen; es ist ein grundsaetzliches Problem jeder Selbst-Evaluation. Aber v4 baut stark auf Selbst-Q-Gates und hat keinen separaten Pruef-Agenten.

**Wuerde ein separater Q-Gate-Agent helfen?** Teilweise. Ein Agent, der NUR prueft (nicht produziert), hat weniger Confirmation Bias. Allerdings: Er muesste den vollstaendigen Subagenten-Prompt verstehen, um die Kriterien korrekt anzuwenden. Der Mehraufwand waere 11 zusaetzliche Agent-Dispatches (1 pro Material + 1 pro Aufgabe) — das verdoppelt den Token-Verbrauch.

**Empfehlung:** Kein separater Q-Gate-Agent fuer jeden Dispatch. Stattdessen: Die Cross-Konsistenz-Pruefung in Phase 2.2c auf Materialien ausdehnen. Aktuell prueft 2.2c nur Aufgaben (A1/A3/A5/A8/A9/A10/A12). Eine analoge Phase 2.1c (Material-Cross-Konsistenz) koennte pruefen: Sequenz-Kohaerenz ueber alle Materialien, Fachbegriff-Erst-Einfuehrung konsistent, Ueberleitung-Kohaerenz, Gesamtabdeckung TB-Knoten. Das waere 1 zusaetzlicher Dispatch statt 6.

### Q-Gate-Qualitaet ueber Session-Dauer

In v4 ist jeder Dispatch isoliert (P1). Das heisst: Material 6 wird mit genau denselben Eingabe-Bedingungen produziert wie Material 1 — frisches Einlesen aller Dateien, identischer Subagenten-Prompt. Die Q-Gate-Qualitaet sollte ueber die Session nicht degradieren, solange P1 eingehalten wird.

Risiko: Der Q-GATE-LOG waechst. Wenn ein Agent den LOG liest (um Redundanz zu vermeiden), waechst sein Kontext ueber die Dispatches. In v4 ist der LOG aber NICHT als Input fuer Folge-Dispatches definiert — er ist reiner Audit-Trail. Das ist korrekt so.

---

## S3: Rahmen-zuerst-Sequenz

**Bewertung: Didaktisch sinnvoll — P3 ist korrekt operationalisiert.**

### Didaktische Begruendung

Die Rahmen-zuerst-Sequenz (Phase 2.0 vor 2.1) hat eine klare didaktische Logik: Das Tafelbild als Lernziel-Struktur steht fest (TB-FREEZE seit Phase 0.4). Einstieg und Sicherung rahmen die Lernsequenz. Materialien muessen die TB-Knoten erarbeitbar machen — sie brauchen die Zielstruktur als Orientierung.

Die Alternative (Materialien zuerst, dann Rahmen als Synthese) haette ein grundsaetzliches Problem: Wenn Materialien ohne TB-Orientierung produziert werden, koennten sie inhaltlich divergieren — spannende Texte, die aber nicht auf die Kernerkenntnisse hinfuehren. Das Tafelbild muesste sich dann den Materialien anpassen, statt als didaktischer Kompass zu fungieren.

### Risiko: Rahmen-Ueber-Determination

Das Briefing stellt die richtige Frage: Orientieren sich Materialien zu stark am Rahmen? Pruefen wir am Goldstandard.

**Mappe 1 Evidenz:** mat-1-6 (Tagebuch, "Wie fuehlte sich die Spaltung Europas an?") geht deutlich ueber den Rahmen hinaus. Der fiktive Diplomat beschreibt ein Gefuehl von Einkreisung, das in keinem TB-Knoten explizit steht. mat-1-8 (Rhodes-Karikatur) behandelt den "Griff nach Afrika" — ein visuell eindrucksvolles Material, das ueber die direkte TB-Abdeckung hinaus kulturelle Dimension oeffnet. Beide Materialien zeigen: Der Rahmen kann Materialien orientieren, ohne sie einzuschraenken.

### P3-Operationalisierung in Subagenten

P3 ("Rahmen stuetzt Inhalt, schraenkt nicht ein") steht als Prinzip in WORKFLOW_v4 und UPGRADE_PLAN_v4. In den Subagenten-Prompts ist es jedoch nicht explizit formuliert. Die Subagenten lesen `rahmen/einstieg.json` (nur `problemstellung`, 1 Feld) — das ist bewusst minimal gehalten (P6 Occam's Razor).

**Implizite Operationalisierung:** Die Subagenten haben ihren eigenen didaktischen Auftrag. SUB_MATERIAL_DARSTELLUNGSTEXT schreibt nach Vergegenwaertigungsprinzipien, nicht nach Rahmen-Vorgaben. SUB_MATERIAL_QUELLENTEXT folgt dem Dreischritt, nicht dem Einstieg. Der Rahmen ist eine Kontextinformation, nicht eine Produktionsanweisung. Das ist die richtige Hierarchie.

**Empfehlung:** Kein Handlungsbedarf. P3 ist durch das Dispatch-Design implizit operationalisiert: Subagenten erhalten primaer typ-spezifische Expertise + SKRIPT-Chunk + TB-Knoten, und sekundaer Rahmen-Kontextinformation (1 Feld aus einstieg.json). Die Gewichtung stimmt.

---

## S4: Skalierung ueber Mappen

**Bewertung: Grundstruktur skaliert. Lerneffekt zwischen Mappen ist nicht systematisch verankert.**

### Mappe-zu-Mappe-Progression

WORKFLOW_v4 definiert zwei Progressionsmechanismen:

1. **Sandwich-Methode** (SKRIPT, Phase 0.3): Erkenntnisse Mappe N im Einstieg Mappe N+1. Das ist eine inhaltliche Progression, die bereits im SKRIPT verankert ist — nicht erst in der Produktion.

2. **Tafelbild-Progression** (Phase 0.4): Ab Mappe 2 erhaelt AGENT_TAFELBILD das vorherige Tafelbild als Eingabe (G9 Progression). Die Schwierigkeitskurve wird in Phase 0.1 (DIDAKTIK_RAHMEN) definiert und durch AFB-Profil pro Mappe umgesetzt.

Beide Mechanismen wirken in Phase 0, nicht in Phase 2. Das heisst: Die Gesamtprogression ist durch das Inhaltsgeruest (SKRIPT + DIDAKTIK_RAHMEN + TAFELBILD pro Mappe) abgesichert — nicht durch die Produktionsphase.

### Lerneffekt zwischen Mappen

Derzeit gibt es keinen systematischen Mechanismus, der Qualitaetserkenntnisse aus Mappe 1 in Mappe 2 einfliessen laesst. Das Q-GATE-LOG dokumentiert Findings, aber es gibt keinen Feedback-Loop, der sagt: "In Mappe 1 hat der Darstellungstext zu abstrakt formuliert — in Mappe 2 den Sequenzkontext um eine Warnung ergaenzen."

**Ist das ein Problem?** Bedingt. In Phase 0 (Inhaltsgeruest) gibt es User-Validierung als PFLICHT. Wenn der User nach Mappe 1 feststellt, dass die Materialien zu abstrakt sind, kann er das in die Phase-1.5-Validierung einbringen. Der User IST der Feedback-Loop.

**Empfehlung:** Optionaler "Mappe-N-Retrospektive"-Schritt vor Phase 2 der Folge-Mappe. 1 Absatz: "Was lief in Mappe N gut/schlecht? Worauf muss Phase 2 der Folge-Mappe achten?" Wird als Praeambel in den Dispatch-Prompt aufgenommen. Aufwand: minimal. Wert: potenziell hoch.

### Gesamtprogression ueber 4 Mappen

Die Gesamtprogression ist durch DIDAKTIK_RAHMEN (KE-Matrix, Schwierigkeitskurve) + SKRIPT (Chunking, Sandwich) + TAFELBILD pro Mappe (Progression G9) dreifach abgesichert — alles in Phase 0. Phase 2 setzt diese Vorgaben um, definiert sie aber nicht. Das ist architektonisch korrekt: Progression ist eine Planungsaufgabe, keine Produktionsaufgabe.

---

## S5: Aufwand-Qualitaets-Verhaeltnis

**Bewertung: Angemessen, aber mit einer konkreten Vereinfachungsmoeglichkeit.**

### Aufwand-Kalkulation

Pro Mappe (am Beispiel Mappe 2 mit 6 Materialien):

| Phase | Dispatches | Datei-Reads pro Dispatch | Gesamt-Reads |
|---|---|---|---|
| 2.0 Rahmen | 1 | 4 (TAFELBILD, MATERIAL_GERUEST, ORCHESTRATOR, einstieg) | 4 |
| 2.1 Materialien | 6 | 7 (GERUEST, TB, SUB_*, SKRIPT, INHALTSBASIS, einstieg, ARTEFAKT) | 42 |
| 2.2a Orchestration | 1 | 4 (RAETSEL.md, materialien/*.json, TB, DIDAKTIK) | ~10 |
| 2.2b Aufgaben | 5 | 4 (PROGRESSIONSPLAN, Ziel-Material, GERUEST, SUB_*) | 20 |
| 2.2c Cross-Konsistenz | 1 | 3 (aufgaben/*.json, materialien/*.json, TB) | ~13 |
| **Gesamt** | **14** | | **~89** |

89 Datei-Reads fuer 11 Artefakte (6 Materialien + 5 Aufgaben). Das sind ~8 Reads pro Artefakt. Das Verhaeltnis ist akzeptabel — P1 (Read-from-Artifact) erzwingt diesen Aufwand, und er ist der Preis fuer Compaction-Resistenz.

### Wo liegt Diminishing Returns?

Die 7-Schritt-Read-Sequenz pro Material-Dispatch ist der aufwaendigste Einzelschritt. Schritt 7 (ARTEFAKT_INVENTAR) ist nur fuer Bildquellen/Karten relevant (3 von 7 Materialtypen). Fuer Darstellungstexte und Zeitleisten ist er irrelevant.

**Vereinfachung:** Schritt 7 als konditionalen Schritt kennzeichnen: "NUR lesen wenn artefakt_ref gesetzt". Das spart 3-4 Reads pro Mappe (bei typisch 3-4 Materialien ohne Artefakt-Referenz). Token-Ersparnis: marginal, aber konzeptionell sauber.

### Zusammenlegbare Dispatches

Phase 2.0 (Rahmen) produziert 4 JSON-Dateien. Alle basieren auf denselben Eingabe-Dateien (TAFELBILD, MATERIAL_GERUEST, ORCHESTRATOR). Theoretisch ist das 1 Dispatch, nicht 4. v4 behandelt es bereits als 1 Phase — die 4 Dateien sind Outputs eines einzelnen Dispatch.

Phase 2.2b (Aufgaben) koennte theoretisch 2 Aufgaben pro Dispatch produzieren (z.B. Aufgabe 1+2 = beide AFB I). Der Qualitaetsverlust waere gering, weil AFB-I-Aufgaben weniger Subagenten-Expertise benoetigen als AFB-III. Aber: Das widerspricht P4 (ein Artefakt pro Dispatch) und der Isolationsthese. Nicht empfohlen.

**Gesamtbewertung:** Der Aufwand ist der Minimalaufwand, der die Architekturprinzipien P1/P4/P6 einhhaelt. Jede Vereinfachung wuerde ein Prinzip verletzen. Der Session-Split (Checkpoint nach Phase 2.1) ist die richtige Antwort auf das Token-Budget-Problem — nicht das Zusammenlegen von Dispatches.

---

## S6: Schwachstellen-Prognose

**Top-3-Schwachstellen, priorisiert:**

### Schwachstelle 1: Didaktische Tiefenqualitaet (Vergegenwaertigung, Altersangemessenheit)

**Gefaehrdete Qualitaetsdimension:** Didaktische Qualitaet (S2.2 Dimension 1).

**Problem:** Die Subagenten-Prompts definieren Vergegenwaertigung, R7-Sprachregister und Elementarisierung ausfuehrlich. Aber ob ein produzierter Text tatsaechlich vergegenwaertigend ist (ob er Vergangenes fuer 12-13-Jaehrige vorstellbar macht), kann kein Q-Gate mechanisch pruefen. SK1 fordert "≥50% Handlungspassagen/Chunk" — das ist das einzige quantifizierbare Vergegenwaertigungskriterium. Alles andere ist qualitatives Urteil.

**Warum v4 es nicht loest:** v4 verbessert die Isolation (der Subagent wendet DT-2 Vergegenwaertigungsprinzipien an) und die Persistierung (das Ergebnis ist in .json-Datei nachpruefbar). Aber v4 kann nicht erzwingen, dass ein LLM tatsaechlich lebendige, kindgerechte Texte produziert. Das ist ein inhärentes Problem der LLM-Textproduktion: LLMs tendieren zu "Sachtext-Stil", nicht zu "Jugendsachbuch-Stil" (Mappe 1 Evidenz: mat-1-1 ist solide, aber nicht so lebendig wie mat-1-6 Tagebuch).

**Mitigation:**
1. User-Validierung nach Phase 2.1 gezielt auf Vergegenwaertigung fokussieren (Prueffrage: "Wuerde ein R7-Schueler diesen Text freiwillig lesen?")
2. In den Sequenzkontext ein Feld "Ton-Vorgabe" aufnehmen: "Erzaehlend, lebendig, mit konkreten Bildern" vs. "Sachlich, strukturiert, mit Fachbegriffen" — differenziert nach didaktischer Funktion (einstieg = erzaehlend, erarbeitung = sachlich-lebendig, vertiefung = perspektivisch)

### Schwachstelle 2: Freitext-Aufgabe ohne funktionale Validierung

**Gefaehrdete Qualitaetsdimension:** Technische Qualitaet (S2.2 Dimension 2) + Konsistenz (Dimension 4).

**Problem:** SUB_AUFGABE_FREITEXT produziert `erwartete_begriffe`, `validierung_schwelle` und `teilfragen` — alles Felder, die die Engine ignoriert (Vorgaenger-Audit B2-#2). Die Engine prueft nur Fuzzy-Match auf `loesung` (einen einzigen String). Das hat zwei Konsequenzen:

1. Der Subagent investiert Konstruktions-Aufwand in ein Scaffolding, das nie ausgefuehrt wird.
2. Die `loesung` muss als Fuzzy-Match-Zielstring funktionieren — das ist eine technische Anforderung, die dem didaktischen Zweck (freie Stellungnahme AFB III) widerspricht. Eine R7-Antwort wie "Ich finde, die Buendnisse haben den Krieg schlimmer gemacht" wird gegen eine Musterantwort wie "Die Buendnissysteme sollten urspruenglich den Frieden sichern..." geprüft. Der Fuzzy-Match wird systematisch fehlschlagen.

**Warum v4 es nicht loest:** v4 plant, die Felder in `_meta` zu verschieben (UPGRADE_PLAN Sektion 2.6). Das adressiert die Schema-Sauberkeit, aber nicht das funktionale Problem: Freitext-Aufgaben haben keine sinnvolle automatische Validierung. Das ist kein v4-Problem, sondern ein Engine-Problem — aber v4 sollte es bewusst dokumentieren.

**Mitigation:**
1. **Kurzfristig (Runde 2):** SUB_AUFGABE_FREITEXT.md explizit dokumentieren: "Die Engine validiert ueber Fuzzy-Match auf `loesung`. Der `loesung`-String muss daher ein kurzes Schluesselwort oder eine kurze Phrase sein (3-5 Woerter), nicht eine vollstaendige Musterantwort." Das aendert die Produktionsanweisung an den Subagenten.
2. **Mittelfristig:** Engine um Begriffs-Pruefung erweitern (`erwartete_begriffe`-Check: mindestens N von M Begriffen muessen im Freitext vorkommen). Das wuerde die didaktische Intention des Subagenten tatsaechlich umsetzen.

### Schwachstelle 3: Systematischer Subagenten-Fehler ohne Eskalation

**Gefaehrdete Qualitaetsdimension:** Kohaerenz (S2.2 Dimension 3).

**Problem:** Was passiert, wenn SUB_MATERIAL_DARSTELLUNGSTEXT systematisch zu abstrakte Texte produziert? Der Subagent prueft sich selbst (Q1-Q10). Wenn sein internes Qualitaetsverstaendnis verzerrt ist, produziert er konsistent "PASS" auf material, das die User-Validierung nicht bestehen wuerde.

In v4 gibt es zwei Korrekturmechanismen: (1) User-Validierung nach Phase 2.1/2.3 — aber EMPFOHLEN, nicht PFLICHT. (2) Cross-Konsistenz-Pruefung — aber nur fuer Aufgaben (Phase 2.2c), nicht fuer Materialien.

**Warum das ernst ist:** 6 Materialien werden sequentiell vom selben Prozess produziert. Wenn der Prozess einen systematischen Bias hat (z.B. zu abstakt, zu lang, zu wenig vergegenwaertigend), reproduziert sich der Bias 6 Mal — ohne Korrektur bis zur User-Validierung.

**Mitigation:**
1. User-Validierung nach den ersten 2 Materialien von EMPFOHLEN zu SOLL hochstufen. Nicht alle 6 pruefen, aber die ersten 2 (Darstellungstext + ein visuelles Material) als Stichprobe.
2. Material-Cross-Konsistenz als Phase 2.1c einfuehren (s. S2-Empfehlung): 1 Dispatch, der alle 6 Materialien gegen Sequenzplan, TB-Abdeckung und Sprachregister prueft.

---

## S7: Goldstandard-Vergleich

### Qualitaetsmerkmale von Mappe 1

Mappe 1 (Goldstandard) hat spezifische Qualitaetsmerkmale, die sich aus der data.json ablesen lassen:

1. **Materialtyp-Vielfalt:** 7 Materialtypen (darstellungstext, quellentext, bildquelle x3, karte x2, zeitleiste, tagebuch). Kein Typ dominiert. v4-Absicherung: AGENT_MATERIAL Phase 1 + M12 Variabilitaet. PASS.

2. **Sequenz-Kohaerenz:** 9 Materialien mit jeweils `ueberleitung_von`, die inhaltlich praezise an das vorherige Material anknuepfen. Die Ueberleitungen referenzieren konkrete Inhalte des Vorgaengers ("Buelow forderte Deutschlands 'Platz an der Sonne'. Diese Karikatur zeigt..."). v4-Absicherung: Phase 1.5 Sequenzplanung + SQ-4 in Subagenten-Q-Gate. PASS.

3. **Emotionaler Zugang:** mat-1-6 (Tagebuch) schafft einen emotionalen Zugang zur Buendnisspaltung, den kein Sachtext leisten koennte. Die Formulierung "doch jetzt fuehle ich mich eingekreist" macht abstrakte Diplomatie fuer R7 greifbar. v4-Absicherung: SUB_MATERIAL_TAGEBUCH hat Rollenprofil-Eingabe, SKRIPT hat Rollenprofil-Zuordnung. PASS — sofern die Rollenprofile qualitativ hochwertig sind.

4. **Didaktische Bildunterschriften:** Alle 5 Bildunterschriften in Mappe 1 folgen dem 3-Funktions-Schema (Identifikation + Kontextualisierung + Erschliessungsimpuls). v4-Absicherung: MQ4/C4 in SUB_MATERIAL_BILDQUELLE, BQ-4 in Checkliste. PASS.

5. **TB-Erarbeitbarkeit:** Jeder der 7 TB-Knoten ist durch mindestens 1 Material erarbeitbar (verifiziert im MATERIAL_GERUEST). v4-Absicherung: Phase 1 Erarbeitbarkeits-Nachweis + Q5 (Tafelbild-Abdeckung) in Subagenten-Q-Gate. PASS.

### Was v4 nicht absichert

1. **Narrativer Ton des SKRIPT.** Die Qualitaet von mat-1-1 ("Hinter der Fassade des Fortschritts lauert ein gefaehrlicher Wettstreit") haengt direkt vom SKRIPT-Chunk ab. Wenn das SKRIPT trocken ist, wird der Darstellungstext trocken — auch mit Vergegenwaertigungsprinzipien. v4 aendert nichts an Phase 0. Das SKRIPT-Q-Gate (SK1-SK15) ist der Schutz, und es wird in v4 nicht angefasst. Das ist korrekt — Phase 0 ist nicht das Problem.

2. **Einzelmaterial-Qualitaet jenseits des Q-Gates.** mat-1-4 (Quellentext Buelow) ist qualitativ hochwertig: kurzer Originalwortlaut, praezise Kontextualisierung, didaktisch wertvoller Rueckbezug zu Imperialismus. Ob SUB_MATERIAL_QUELLENTEXT dieses Niveau konsistent produziert, haengt von der Qualitaet der INHALTSBASIS-Zitat-Daten ab (Phase 0.2a). Wenn die INHALTSBASIS duenne Zitat-Daten liefert, kann auch der beste Subagent keinen hochwertigen Quellentext produzieren.

3. **Informelle Gestaltungsentscheidungen.** Mappe 1 wurde manuell gesteuert. Entscheidungen wie "die Rhodes-Karikatur an Position 3, weil sie nach dem Buelow-Zitat visuell den Imperialismus verankert" sind implizites didaktisches Wissen. In v4 trifft diese Entscheidung Phase 1.5 (Sequenzplanung). Die Qualitaet haengt davon ab, ob der AGENT_MATERIAL die Logik hinter solchen Entscheidungen versteht — oder ob er rein mechanisch nach TB-Abdeckung sortiert.

### Risiko informeller Qualitaet

Der informelle Prozess von Mappe 1 hatte einen Vorteil: Die Lehrkraft (User) steuerte aktiv mit. In v4 ist die User-Beteiligung auf Validierungspunkte reduziert (Phase 0 PFLICHT, Phase 1.5 PFLICHT, Phase 2.0 EMPFOHLEN, Phase 2.3 EMPFOHLEN). Die tatsaechliche Material-Produktion (Phase 2.1) ist User-frei.

**Risiko:** Fuer Mappe 2 funktioniert das wahrscheinlich — der User hat aus Mappe 1 einen Qualitaetsmassstab und kann in Phase 2.3 validieren. Fuer Mappe 3 und 4 steigt das Risiko, dass die Validierung oberflaechlicher wird ("sieht gut aus") statt substanziell ("prueft Vergegenwaertigungstiefe").

---

## Gesamtbewertung

**v4 ist geeignet, die Produktqualitaet verlässlich zu maximieren — unter zwei Bedingungen.**

### Was v4 loest

Die Kernprobleme der gescheiterten Mappe-2-Versuche (monolithische Produktion, fehlende Subagenten-Isolation, kein Q-Gate-Log, engine-inkompatible Felder) werden durch v4 strukturell geloest. Die Architektur (P1-P7) ist durchdacht, die Schnittstellen-Vertraege sind nach dem Vorgaenger-Audit korrigiert, der Session-Split ist eingeplant.

Die didaktische Expertise der Subagenten (DT-1 bis DT-6 Vergegenwaertigungsprinzipien, QT-1 bis QT-6 Quellenaufbereitung, BQ-1 bis BQ-8 Bilderschliessung, M1-M12 typ-uebergreifend) ist beeindruckend umfangreich und fachdidaktisch fundiert. v4 stellt sicher, dass diese Expertise tatsaechlich zur Anwendung kommt — durch Isolation, nicht durch Hoffnung.

### Bedingung 1: User-Validierung nach den ersten 2 Materialien hochstufen

Aktuell ist Phase 2.3 (User-Validierung) EMPFOHLEN. Fuer die Erstanwendung von v4 (Mappe 2) sollte eine Stichproben-Validierung nach den ersten 2 produzierten Materialien PFLICHT sein. Nicht als buerokratischer Gate, sondern als Kalibrierung: Stimmt der Ton? Stimmt das Sprachregister? Stimmt die Vergegenwaertigungstiefe?

Nach erfolgreicher Mappe-2-Produktion kann die Validierung fuer Folge-Mappen auf EMPFOHLEN zurueckgestuft werden.

### Bedingung 2: Freitext-Validierungsproblem bewusst dokumentieren

SUB_AUFGABE_FREITEXT produziert Aufgaben, die die Engine nicht sinnvoll validieren kann. Das ist kein v4-Problem, aber v4 muss es adressieren: Entweder `loesung` als kurzes Schluesselwort definieren (kurzfristig) oder Engine-Erweiteurng planen (mittelfristig). Ohne Adressierung ist Aufgabe 5 jeder Mappe potenziell unbespielbar.

### Verbleibende Risiken (akzeptabel)

1. **LLM-inhärente Qualitaetsvariation:** Kein Prozess kann garantieren, dass ein LLM konsistent den gleichen Qualitaetslevel trifft. v4 minimiert die Variation durch Isolation und Q-Gates, eliminiert sie aber nicht.

2. **Token-Budget:** 14 Dispatches mit 89 Datei-Reads pro Mappe. Der Session-Split (Checkpoint nach Phase 2.1) ist die richtige Antwort. Falls Cowork's Token-Limit trotzdem erreicht wird: Phase 2.1 in zwei Teile splitten (Material 1-3, dann Material 4-6).

3. **Skalierung auf 4 Mappen:** Kein systematischer Lerneffekt zwischen Mappen definiert. Empfehlung: optionale Mappe-N-Retrospektive vor Phase 2 der Folge-Mappe.
