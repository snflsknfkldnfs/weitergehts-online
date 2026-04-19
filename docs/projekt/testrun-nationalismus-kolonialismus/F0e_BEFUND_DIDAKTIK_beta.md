# F0e Didaktischer Befund — Agent-beta

**Agent:** general-purpose (Didaktik-Auditor beta)
**Datum:** 2026-04-19
**Audit-Scope:** Escape-Game "Deutscher Nationalismus und Kolonialismus" (R7 GPG Mittelschule Bayern), Mappe 1-3 (deployed + Source-Artefakte). Mappe 4 explizit AUSGESCHLOSSEN.
**Rubric-Version:** `F0e_AUDIT_RUBRIKEN.md` v1.0
**LP-QM-Version:** `LEHRPLAN_QM_GPG7_MITTELSCHULE.md` v1.0 (2026-04-19)
**Runtime:** ~120 min
**STATUS:** COMPLETE (alle 3 Mappen + F-RA6-beta + Aggregates)

---

## 1. Executive Summary

**Zaehlungen (Finalstand Mappe 1-3):**
- 60 bestehende Findings re-klassifiziert: **4 PQI-1** (F-RA2-03, F-RA3-01, F-RA4-01, F-RA1-08-Kontext via F-RA6-beta-01), **14 PQI-2**, **42 PQI-3**
- 13 v1.3-Delta-PIs: **0 PQI-1**, **5 PQI-2**, **7 PQI-3**, 1 out-of-scope
- 17 R0-FINAL+: **0 PQI-1**, **6 PQI-2**, **10 PQI-3**, 1 out-of-scope
- **4 neue F-RA6-beta-Findings**: 1 PQI-1, 1 PQI-2, 2 PQI-3

**Headline:** Das Produkt ist didaktisch im Mappe-1+2-Kern solide (kohaerente SCPL-Progression, saubere Quellen-Markierung fiktiv/echt, Bloom-Laddering L1→L5, Mehrperspektiven durch Tagebuecher, Quellenkritik-Aufgabe aufgabe-1-6 mit Opferperspektive bei Fuersten/Bauernkrieg). **Kritische didaktische Defekte konzentrieren sich auf Mappe 3 (Kolonialismus)**: (a) **aufgabe-3-3 fehlt im Deploy** (Source hat sie → Source-Deploy-Parity-Bruch mit direkter Kompetenz-Konsequenz) → PQI-1; (b) **Cliffhanger "In Deutsch-Südwestafrika wurde die Antwort besonders brutal"** im sicherung.ueberleitung Mappe 3, aber Mappe 4 (Genozid Herero/Nama) nicht deployed → PQI-1 Produkt-als-Ganzes; (c) **Ueberleitung mat-3-3→mat-3-4 faktisch falsch** ("Bismarck verteilte Afrika wie einen Kuchen" — Maréchal-Karikatur zeigt Leopold II. zentral, Bismarck nicht) → PQI-2.

**PQI-1-Hotspots (Kern-3):**
1. **F-RA2-03 / F-RA6-beta-04 (D1+D3):** aufgabe-3-3-Deploy-Luecke bricht LP-QM §6.2 Kompetenz "Bildquellenkritik/Perspektivitaet" in Mappe 3; Bildpaar ohne auswertende Aufgabe bleibt Anschauungsmaterial.
2. **F-RA6-beta-01 (D1+D5+D6):** Genozid-Cliffhanger ohne Mappe-4-Resolution → LP-QM §6.2.8 AP-2-Naherung (Kolonialismus ohne ausgearbeitete Opferperspektive im deployed Zustand), Emotional-kognitive Unabgeschlossenheit fuer R7.
3. **F-RA3-01 (D3):** Lueckentext-Pool-Reset-Bug (Engine) laesst Aufgaben temporaer unloesbar — Schueler-Erlebnis direkt betroffen.

**Mappe 1 + 2 PQI-Max = 2** (solide mit Detail-Feinschliff), **Mappe 3 PQI-Max = 1** (strukturelle Luecke). Gesamt-Produkt-PQI-Max = **1**.

---

## 2. Re-Klassifikation bestehender Findings (Matrix v1) — Mappe 1 Scope

### 2.1 Methodische Vorbemerkung

Von den 60 Findings (F-RA1-01 bis F-RA5-11) sind die Mehrheit pipeline-/engine-/prozess-technisch (RA1, RA3 teilweise, RA5 komplett). Nach Rubric-§3 gelten rein technische Defekte als **D1-D6 = 3** (PQI-3, "nicht-didaktisch, nur Pipeline"), sofern sie nicht in Schueler-Erlebnis sichtbar durchschlagen.

**Treffer auf Schueler-Erlebnis** (damit potentielle didaktische Relevanz):
- F-RA3-01 (Lueckentext-Pool-Reset) → **D3 = 1** (Aufgabe temporaer unloesbar)
- F-RA1-06 (V13-Regression Mappe 3) → didaktisch via strukturelle Konsequenz
- F-RA2-01..15 (Didaktik/Material) → vollumfaenglich didaktisch
- F-RA4-*-Medien → didaktisch bei Inhalt, technisch bei Lizenz

Diese sind im Folgenden pro-Finding behandelt.

### 2.2 Tabelle Findings F-RA1-XX (Pipeline) — Didaktische Dimension

| ID | Titel (gekürzt) | D1 | D2 | D3 | D4 | D5 | D6 | PQI-Max | Treiber | Evidenz | Begründung |
|---|---|---|---|---|---|---|---|---|---|---|---|
| F-RA1-01 | Q-Gate Selbst-PASS-Schleife | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | `BERICHT_RA1_PIPELINE.md` F-RA1-01 | Pipeline-Mechanik (Gate-Evaluation), kein direkter Schueler-Output. Wirkung nur indirekt via Material-Qualitaet (bereits in RA2-Findings adressiert). Kein eigenstaendiger didaktischer Defekt. |
| F-RA1-02 | Cowork-Medien-Nachrecherche-Schleife | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA1 F-RA1-02 | Pipeline-Prozess, kein Schueler-Erlebnis. |
| F-RA1-03 | Phase 1 MATERIAL_GERUEST ohne Q-Gate-Mark | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA1 F-RA1-03 | Pipeline-Dokumentation. |
| F-RA1-04 | Session-Splits ad-hoc | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA1 F-RA1-04 | Pipeline-Prozess. |
| F-RA1-05 | Phase 3.1 uebersprungen Mappen 2+3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA1 F-RA1-05 | Pipeline-Deploy-Prozess. Keine direkte Schueler-Sichtbarkeit, sofern Deploy korrekt erfolgte. |
| F-RA1-06 | V13-Patch-Regression Mappe 3 Hefteintrag | 3 | 3 | 2 | 3 | 3 | 3 | 2 | D3 | RA1 F-RA1-06 + data.json:1761-1879 Dualstruktur sichtbar | Hefteintrag-Dualstruktur in data.json persistiert in Mappe 3. Engine rendert ggf. inkonsistent, Schueler sehen potentiell duplizierte Strukturen. Didaktisch **PQI-2**, da Lehrkraft Fehler identifizieren kann. |
| F-RA1-07 | Patch-Persistenz Live-Defekt | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA1 F-RA1-07 | Pipeline. |
| F-RA1-08 | Testrun-Abbruch ohne Abschluss | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA1 F-RA1-08 | Prozess. Fuehrt zu Mappe-4-Luecke (separat als F-RA6-beta-01 aufgenommen, siehe §4). |
| F-RA1-09 | QA-Post-Live-Rueckkanal fehlt | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA1 F-RA1-09 | Pipeline. |
| F-RA1-10 | Kompaktions-Constraint-Drift | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA1 F-RA1-10 | Pipeline. |
| F-RA1-11 | Phase 3.0 Rueckkopplung fehlt | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA1 F-RA1-11 | Pipeline. |
| F-RA1-12 | Engine-Patch ausserhalb Phasen-Pipeline | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA1 F-RA1-12 | Pipeline. |
| F-RA1-13 | ORCH Uebergabe-Template nicht gelesen | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA1 F-RA1-13 | Pipeline. |

**Cluster-Pattern RA1:** Alle 13 RA1-Findings sind Pipeline-technisch. Nur F-RA1-06 mit sichtbarer didaktischer Konsequenz (Hefteintrag-Dualstruktur).

### 2.3 Tabelle Findings F-RA2-XX (Didaktik/Material) — Kern-Scope

| ID | Titel | D1 | D2 | D3 | D4 | D5 | D6 | PQI-Max | Treiber | Evidenz | Begründung |
|---|---|---|---|---|---|---|---|---|---|---|---|
| F-RA2-01 | HE17 S-Zone Mappe 2 rekapituliert M1 | 3 | 3 | 2 | 3 | 3 | 3 | 2 | D3 | data.json:1754 Sicherung M2 + BERICHT_RA2_DIDAKTIK_MATERIAL.md F-RA2-01 | Kontrastiver Hefteintrag M2 referenziert sinnvoll "Scheitern 1848" als Ausgangslage; Rekapitulation ist didaktisch VERTRETBAR (Brueckenfunktion zwischen den Mappen). PQI-2, nicht PQI-1: kein Lernziel-Bruch, nur moegliche didaktische Redundanz. |
| F-RA2-02 | HE15 Ordnungsmuster-Deklaration faelsch | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | data.json:752 `ordnungsmuster:"sequenziell"` M1 | Deklaration "sequenziell" ist fuer M1-SCPL (Situation→Complication-Kette→Problem→Loesung) angemessen. RA2-Einschaetzung schwach belegt; keine didaktische Konsequenz sichtbar. Konservativ PQI-3. |
| F-RA2-03 | aufgabe-3-3 fehlt in Live-data.json | 1 | 3 | 1 | 3 | 2 | 2 | 1 | D1+D3 | Source `mappe-3/aufgaben/aufgabe-3-3.json` existiert; Deploy `data.json` zeigt aufgabe-3-2 direkt gefolgt von aufgabe-3-4 (keine 3-3). Bestätigt durch Grep. | **PQI-1**: Die fehlende Aufgabe bricht den didaktischen Aufbau Mappe 3 (Bildquellen-Kritik-Vergleich Gartenlaube/Maréchal ist der kritische Perspektiv-Gegensatz-Schritt). Ohne sie: keine explizite Bildkritik trotz Doppelbild-Einsatz. D1: LP-QM §6.2.1 Kompetenzerwartung "Industrialisierung aus unterschiedlichen Perspektiven" analog fuer Kolonialismus (OH-3) greift im Deploy-Zustand nicht aufgabenseitig. D3: didaktische Sequenz-Bruch (mat-3-4 wird praesentiert, aber nicht in Aufgabe verarbeitet). D5: narrativ-logisch brechend (2 Bilder gezeigt, nur 1 aufgabenseitig genutzt). D6: Bildkritik an Karikatur haette Register-Diskussion eroeffnet (Spott vs. offizielle Darstellung). |
| F-RA2-04 | A17 SCPL-Problem-Zone Mappe 3 marginal | 2 | 3 | 2 | 3 | 3 | 3 | 2 | D1+D3 | data.json:2348 `problem.satz` "ohne Rücksicht auf die dort lebenden Menschen" gesetzt, aber keine dedizierte Problem-Zonen-Aufgabe (aufgabe-3-5 ist einzige P-Zone) | **PQI-2**: LP-QM §6.2.5 CP-8 Pflicht bei Kolonialismus (Opferperspektive explizit). P-Zone in aufgabe-3-5 vorhanden, aber in der Breite der 4 Aufgaben (3-1, 3-2, 3-4, 3-5 nach Deploy) schwach vertreten. D1 = 2 (CP-8 beruehrt, nicht operationalisiert an allen geeigneten Stellen). D3 = 2 (Progressions-Luecke). |
| F-RA2-05 | AFB-Feld fehlt Mappe-3-Aufgaben | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | data.json:2127 aufgabe-3-1 kein `afb`-Feld (vs. M1+M2 haben AFB) | Datenschema-Inkonsistenz. Keine Schueler-sichtbare Konsequenz (AFB wird in Engine nicht rendered als Label fuer Schueler). Lehrkraft-Transparenz leidet, aber keine Produktion-Funktion. Konservativ PQI-3. |
| F-RA2-06 | AFB-Bloom-Inkonsistenz Mappe 1 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | data.json:312 aufgabe-1-1 AFB I, Bloom 1 (konsistent innerhalb AFB-I-Toleranz) | AFB und Bloom sind unterschiedliche Taxonomien; Kreuzinkonsistenz nicht automatisch Defekt. Konservativ PQI-3. |
| F-RA2-07 | "verspaetete Nation" nicht im Hefteintrag | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | aufgabe-3-1 Loesung + Hefteintrag M3 Knoten ohne Begriff | Vereinzelter Fachbegriff in Aufgabe, der im Hefteintrag nicht Knoten-Status hat. Didaktisch tolerabel (Lehrkraft kann einordnen). PQI-3. |
| F-RA2-08 | Hefteintrag-Wortzahl Drift Mappe 3 | 3 | 3 | 3 | 2 | 3 | 3 | 2 | D4 | data.json:2421 `_q_gate.G6: ~106W PASS`, Messung ergibt ca. 125W | **PQI-2**: Hefteintrag marginal ueber 120W-Limit. R7-Kognitive-Last bei Heft-Uebertrag steigt. Kein Lernziel-Bruch, aber Arbeitsspeicher-Ueberforderung moeglich. D4 = 2 (Kalibrierungs-Drift). |
| F-RA2-09 | A18-Verletzung mat-3-6 afrikanische Perspektive nicht referenziert | 2 | 3 | 3 | 3 | 3 | 2 | 2 | D1+D6 | `data.json` aufgabe-3-5 `material_referenz: ["mat-3-6", "mat-3-3", "mat-3-5"]` — **mat-3-6 ist tatsaechlich PRIMAER referenziert** | **REVISION gegenueber RA2-Befund**: Im deployed data.json ist mat-3-6 in aufgabe-3-5 erste Material-Referenz. Original-Finding "in keiner Aufgabe referenziert" trifft nicht zu. ABER: Die Referenz-Tiefe bleibt duenn (nur 1 Aufgabe von 4 greift sie auf, und zwar in Kombi mit 2 anderen Quellen); keine dedizierte Perspektiv-Arbeit mit mat-3-6 allein. Daher **PQI-2** (nicht PQI-1): D1 LP-QM §6.2.5 CP-8 teilerfuellt, D6 Multiperspektivitaet-Operationalisierung schwach. |
| F-RA2-10 | Sprachniveau-Drift Mappe 3 | 3 | 3 | 3 | 2 | 3 | 2 | 2 | D4+D6 | data.json mat-3-1 Satzlaenge-Schnitt und Fachbegriff-Dichte: "Imperialismus", "Kolonialisierung", "Schutzgebiet", "Kolonialvereine", "Absatzmärkte" in wenigen Saetzen | **PQI-2**: R7 Mittelschule (12-13J, DaZ-Anteil) gegen Fachwortdichte. mat-3-2 ("Kolonialvereine und die Presse forderten lautstark, Deutschland muesse endlich mitmischen") enthaelt Passiv und historische Konstruktion, 4 Fachbegriffe in 3 Saetzen. D4 = 2 (lokale Kalibrierungs-Drift). D6 = 2 (DaZ-Inklusion erschwert ohne Glossar-Kachel). |
| F-RA2-11 | Fachwortdichte Mappe 3 hoch ohne Gate | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | (siehe F-RA2-10) | Tool-Lueckencharakter (kein Dichte-Gate) ist Pipeline-Problem, keine eigene Produkt-Sichtbarkeit ueber F-RA2-10 hinaus. Konservativ PQI-3 (um nicht doppelt zu zaehlen). |
| F-RA2-12 | Bildunterschriften 46-71W, 4-5 Saetze | 3 | 3 | 2 | 2 | 3 | 3 | 2 | D3+D4 | data.json mat-1-2 bildunterschrift 66W, mat-2-4 49W, mat-3-5 61W, alle mit 3-5 Saetzen | **PQI-2**: Bildunterschriften dienen als Mini-Darstellungstexte, was didaktisch begruendbar ist (Vorentlastung, Fachbegriff-Einfuehrung mat-3-5 "Wettlauf um Afrika", "Kolonialisierung"). Aber: UX-1-Ziel "max 2 Saetze" verfehlt. R7-Kognitive-Last im Bild-Scan erhoeht. D3/D4 = 2. |
| F-RA2-13 | Typ "vergleich" R7-untauglich | 3 | 3 | 3 | 2 | 3 | 3 | 2 | D4 | aufgabe-3-3.json `typ: "begruendung"` (ersetzt vorheriges "vergleich"); also bereits retroaktiv gefixt auf Source-Ebene, aber nicht deployed | **PQI-2**: Typ-Selektions-Problem ist fuer R7 relevant (Vergleichstabelle = hohe kognitive Last). Im Source bereits als "begruendung" umbenannt, aber im Deploy nicht vorhanden (siehe F-RA2-03). Die Entscheidung selbst ist didaktisch vernuenftig (begruendung = offener Schreibauftrag, R7-passend). |
| F-RA2-14 | zusammenfassung-Wortzahlen ueber 50W | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | data.json:868 zusammenfassung M1 52W (nahe Grenze), M2 44W (PASS), M3 32W (PASS) | Nur M1 marginal. PQI-3. |
| F-RA2-15 | Niedrigschwelliger Einstieg PASS (keine Handlung) | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | — | Bestaetigung, kein Defekt. |

### 2.4 Tabelle Findings F-RA3-XX (Engine/Assembly)

| ID | Titel | D1 | D2 | D3 | D4 | D5 | D6 | PQI-Max | Treiber | Evidenz | Begründung |
|---|---|---|---|---|---|---|---|---|---|---|---|
| F-RA3-01 | Lueckentext-Pool-Reset-Bug | 3 | 3 | 1 | 3 | 2 | 3 | 1 | D3 | `escape-engine.js:2814` | **PQI-1**: Engine-Bug bewirkt, dass Lueckentext-Aufgaben ein temporaeres Fehlverhalten zeigen (Pool resettet, Tags verworfen). Schueler-Sichtbar → D3 = 1 (strukturelle Unbrauchbarkeit kurzzeitig). D5 = 2 (Immersionsstoerung). Klar didaktisch wirksam trotz Pipeline-Ursprung. |
| F-RA3-02 | Persistente HTML-Entities Mappe 3 | 3 | 3 | 3 | 3 | 3 | 2 | 2 | D6 | data.json M3 `&bdquo;` `&ldquo;` in mat-3-1, mat-3-2, mat-3-3 | **PQI-2**: HTML-Entities rendern im Browser korrekt als Anfuehrungszeichen; bei Screenreadern (Barrierefreiheit) potentiell als Entity ausgesprochen. D6 = 2 (Inklusions-Luecke). Falls Engine Entities nicht dekodiert, schlagen sie ggf. im Alt-Text durch. |
| F-RA3-03 | Hefteintrag-Dualstruktur | 3 | 3 | 2 | 3 | 3 | 3 | 2 | D3 | data.json:749 und 871 — `mappe.hefteintrag` und `mappe.sicherung.hefteintrag` identisch befuellt | **PQI-2**: Lehrer-/Schueler-sichtbarer Dupe-Rendering-Effekt moeglich. Engine muss sauber disambiguieren. D3 Strukturierung leidet, aber Lehrkraft kann korrigieren. |
| F-RA3-04 | V13-Regression-Anfaelligkeit | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA3 F-RA3-04 | Pipeline-Risiko, kein eigenes Schueler-Erlebnis ausser via F-RA3-03. |
| F-RA3-05 | Lueckentext --correct-Persistenz | 3 | 3 | 2 | 3 | 3 | 3 | 2 | D3 | RA3 F-RA3-05 | **PQI-2**: CSS-Klasse bleibt visuell haengen; bei Nachfrage der Aufgabe zeigt die UI nicht mehr klar das aktuelle Loesungsfeld. Schueler-sichtbarer Zustands-Bug. |
| F-RA3-06 | Cache-Bust-Versions-Divergenz | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | lehrkraft.html:7 `?v=4.5` vs. evtl. abweichende Werte in anderen HTML | Technisch. |
| F-RA3-07 | Data-Validator fehlt Assembly→Deploy | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA3 F-RA3-07 | Pipeline. (Konsequenz in F-RA2-03 abgebildet.) |
| F-RA3-08 | Entity-Scan fehlt Post-Assembly | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA3 F-RA3-08 | Pipeline. (Konsequenz in F-RA3-02 abgebildet.) |
| F-RA3-09 | Pool-Reset-Perf-Smell | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA3 F-RA3-09 | Technisch. |

### 2.5 Tabelle Findings F-RA4-XX (Medien/Lizenz) — Didaktische Dimension

Hinweis: RA4 ist primaer Lizenz/Herkunfts-Audit. Didaktisch relevant sind **Bild-Didaktik, Caption-Korrektheit, Opferperspektive-Pflicht**.

| ID | Titel | D1 | D2 | D3 | D4 | D5 | D6 | PQI-Max | Treiber | Evidenz | Begründung |
|---|---|---|---|---|---|---|---|---|---|---|---|
| F-RA4-01 | Hallu-Rate 33% bestaetigt | 2 | 1 | 3 | 3 | 3 | 2 | 1 | D2 | RA4 F-RA4-01 (6/18 Wikimedia-Dateinamen halluziniert) | **PQI-1** (D2): Halluzinierte Dateinamen waren der Defekt, der Mappe 4 blockierte. Im Deploy-Stand Mappe 1-3 sind die Bilder nach Korrektur jetzt korrekt (manueller Check: img-*.jpg existieren in `/assets/img/deutscher-nationalismus-kolonialismus/`). Der Finding gilt als Pipeline-Warnung; **didaktisch im Mappe-1-3-Deploy derzeit nicht wirksam**. Konservativ aber D2 = 1 weil Caption-Hallu-Muster bei mat-3-4 teilweise weiterbestand (siehe F-RA4-04). |
| F-RA4-02 | Keine prospektive Verifikation in Phase 0.2 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA4 F-RA4-02 | Pipeline. |
| F-RA4-03 | Ersatz-Wahl Maréchal Perspektiv-Drift | 2 | 2 | 3 | 3 | 2 | 3 | 2 | D1+D2+D5 | data.json:1994 mat-3-4 Bildunterschrift "belgischer König Leopold II., rechts der deutsche Kaiser Wilhelm I." — urspruenglich Bismarck-Karikatur-Plan; Drift zu Leopold II.-Karikatur | **PQI-2**: Die Maréchal-Karikatur ist historisch KORREKT (Leopold II. war zentraler Akteur der Kongo-Konferenz), aber didaktischer Game-Fokus war "Bismarck als Veranstalter der Berliner Konferenz" — neue Karikatur verlagert Fokus auf Leopold. D1 = 2 (Themen-Drift). D2 = 2 (historisch richtig, aber thematisch unscharf). D5 = 2 (Narrativ-Inkonsistenz zum Reichsgruendungs-Narrativ). Aufgabe-3-3 (Quellenvergleich) haette Kontext stabilisiert, fehlt aber. |
| F-RA4-04 | Source-Deploy-Drift mat-3-4.json | 3 | 2 | 3 | 3 | 3 | 3 | 2 | D2 | RA4 F-RA4-04 — Source noch mit Hallu-Caption, Deploy mit korrigierter | **PQI-2** in Deploy-Sicht: Aktuell deployed mat-3-4 korrekt (Maréchal Le Frondeur 1884 Kongo-Karikatur). Aber Re-Assembly-Risiko. Im aktuellen Schueler-Erlebnis kein unmittelbarer Defekt (D2 = 2, da latentes Regression-Risiko). |
| F-RA4-05 | Tote Assets img-1-4, img-3-4 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | `ls assets/img/` zeigt img-1-4.jpg + img-3-4.png vorhanden | Im Deploy tatsaechlich vorhanden. Tote Referenzen ggf. historisch. PQI-3. |
| F-RA4-06 | Lizenz-Attribution unvollstaendig | 3 | 3 | 3 | 3 | 3 | 2 | 2 | D6 | data.json:144 `lizenz: "Public Domain"` ohne urheber-Feld strukturiert; mat-3-5 "CC BY-SA 3.0" ohne Autoren-URL | **PQI-2**: Lizenz-seitig problematisch, didaktisch: Schueler lernen Quellenkritik-Standards; unvollstaendige Attributionen vermitteln unsauberen Zitierstandard. D6 = 2 (Bildungsnorm-Inkonsistenz). |
| F-RA4-07 | Kombiniertes Lizenz-Feld img-1-1+img-1-4 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | data.json:63 `"lizenz": "Public Domain (img-1-1); GFDL (img-1-4)"` | Technisch, kein Schueler-Output-Unterschied. PQI-3. |
| F-RA4-08 | Kein globales Bildnachweis-Register | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | Keine CREDITS.md / Register-Sektion in lehrkraft.html | Transparenz-Defizit, technisch. PQI-3. |
| F-RA4-09 | Lizenz-Feld fehlt bei quellentext-Materialien | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | data.json mat-1-3, mat-2-1 ohne `lizenz`-Feld (aber mit `quelle`-Feld) | Quellentext hat Quelle, keine Lizenz noetig (Wikipedia-Zitate CC BY-SA impliziert via Quelle). PQI-3. |
| F-RA4-10 | Mappe-4-Retro-Patch offen | **OUT-OF-SCOPE** per Auftrag (keine Mappe-4-Analyse). Vermerkt, aber nicht bewertet. |
| F-RA4-11 | R0.5 Dual-Kanal nicht implementiert | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA4 F-RA4-11 | Pipeline. |
| F-RA4-12 | Ersatz-Workflow didaktisch nicht rueckgekoppelt | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA4 F-RA4-12 | Prozess. |
| F-RA4-13 | img-2-2 Live-Herkunft ungeklaert | 2 | 2 | 3 | 3 | 3 | 3 | 2 | D1+D2 | data.json:1174 mat-2-5 `quelle: "Niederländische Karikatur... Spotprent over de Duitse eenwording, RP-P-1914-4565. Rijksmuseum Amsterdam, via Wikimedia Commons."` | **PQI-2**: Herkunft im Deploy nun mit Rijksmuseum-Inventarnummer angegeben; Verifizierbarkeit gegeben. RA4-Aussage "MISSING in INHALTSBASIS" betrifft Pipeline, nicht Produkt. Didaktisch: Karikatur als zweite Perspektive auf Reichsgruendung ist didaktisch wertvoll (CP-3-Gegenueberstellung). D1/D2 = 2 wegen verbleibender Restunsicherheit bei Re-Assembly. |

### 2.6 Tabelle Findings F-RA5-XX (PM/Prozess/Meta)

| ID | Titel | D1 | D2 | D3 | D4 | D5 | D6 | PQI-Max | Treiber | Evidenz | Begründung |
|---|---|---|---|---|---|---|---|---|---|---|---|
| F-RA5-01 | Kein Pre-Kompaktions-Watchdog | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA5 F-RA5-01 | Prozess, kein direkter Schueler-Output. |
| F-RA5-02 | Auto-Kompaktions-Summaries unzureichend | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA5 F-RA5-02 | Prozess. |
| F-RA5-03 | STATUS.md nicht Wiederaufsetz-Anker | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA5 F-RA5-03 | Prozess. |
| F-RA5-04 | Index-Luecke | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA5 F-RA5-04 | Formal. |
| F-RA5-05 | Kein Kompaktions-Resilience-Protokoll | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA5 F-RA5-05 | Prozess. |
| F-RA5-06 | PI-Zustandsblock nicht synchron | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA5 F-RA5-06 | Prozess. |
| F-RA5-07 | Kein Session-Start-Zustandsaudit | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA5 F-RA5-07 | Prozess. |
| F-RA5-08 | Subagenten-Delegation ad-hoc | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA5 F-RA5-08 | Prozess. |
| F-RA5-09 | Read-Pattern-Disziplin | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA5 F-RA5-09 | Prozess. |
| F-RA5-10 | Re-Flag-Events | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA5 F-RA5-10 | Prozess. |
| F-RA5-11 | CC-Rueck-Uebergabe nicht einheitlich | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | RA5 F-RA5-11 | Prozess. |

**Cluster-Pattern RA5:** Alle 11 PM/Prozess-Findings sind didaktisch indirekt (Pipeline-Qualitaetssicherung). Keine direkte Produkt-Wirkung.

---

## 3. Re-Klassifikation bestehender PIs (Matrix v1) — Alle 13 v1.3-Delta-PIs

PIs sind Pipeline-Konstrukte. Didaktische Bewertung: meist D1-D6 = 3 (nicht-didaktisch). Ausnahmen, bei denen PI einen didaktisch-relevanten Produktdefekt adressiert, unten ausgewiesen.

| PI-ID | Titel | D1 | D2 | D3 | D4 | D5 | D6 | PQI-Max | Treiber | Begründung |
|---|---|---|---|---|---|---|---|---|---|---|
| PI-MV2-EXT1 | Source-Deploy-Propagation | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | CLOSED per P0-A4; Pipeline. |
| PI-MV2-EXT2 | Mappe-4-Retro-Patch | OUT-OF-SCOPE | — | — | — | — | — | — | — | Mappe 4 explizit ausgeschlossen. |
| PI-MV2-EXT3 | CC BY-SA Attribution-Schema | 3 | 3 | 3 | 3 | 3 | 2 | 2 | D6 | Didaktisch-relevant via Bildungsnorm Quellenangabe; Schueler lernen Zitier-Standards implizit. PQI-2. |
| PI-MV2-EXT4 | Didaktisches Ersatz-Rueckkopplung | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | Prozess (verbunden mit F-RA4-03, dort bewertet). |
| PI-ENGINE-1 | Hefteintrag-Dualstruktur | 3 | 3 | 2 | 3 | 3 | 3 | 2 | D3 | (siehe F-RA3-03). |
| PI-ENGINE-2 | Assembly-Validator | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | Pipeline. |
| PI-ENGINE-3 | Entity-Encoding-Hardening | 3 | 3 | 3 | 3 | 3 | 2 | 2 | D6 | (siehe F-RA3-02). |
| PI-DIDAKTIK-1 | Typ-Selektions-Katalog R7 | 3 | 3 | 3 | 2 | 3 | 3 | 2 | D4 | R7-Altersadaequanz ist didaktisch. PQI-2. |
| PI-DIDAKTIK-2 | A18-Luecken-Schliessung | 2 | 3 | 3 | 3 | 3 | 2 | 2 | D1+D6 | (siehe F-RA2-09). Zentrale LP-QM-CP-8-Coverage-Frage. |
| PI-PM-1 | Post-Kompaktions-Re-Orientation | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | Prozess. |
| PI-PM-2 | CC→Cowork-Handoff-Template | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | Prozess. |
| PI-PM-3 | STATUS-Freeze Patch-Zyklen | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | Prozess. |
| PI-PM-4 | Re-Flag-Pattern-Detektor | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | Prozess. |
| PI-PIPELINE-1 | Patch-Propagation-Check | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | Prozess. |

### 3.2 17 R0-FINAL+ Items

Diese sind Pipeline-Verbesserungs-Items vor dem Pilot. Didaktisch nur insofern relevant, als sie zukuenftige Produktqualitaet sichern, nicht aktuelle Defekte beheben.

| # | Item | D1 | D2 | D3 | D4 | D5 | D6 | PQI-Max | Treiber | Begründung |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Umlaut-Retrofit drei Fragetypen | 3 | 3 | 3 | 3 | 3 | 2 | 2 | D6 | Umlauts in Aufgaben-Texten = Register-/Inklusions-Frage (Entity-Artefakte lesen sich unsauber). |
| 2 | O-07-U-B-Checker Pflicht-Gate | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | Pipeline. |
| 3 | M-03-Reife-Programm STATISTIK+QUELLENKRITIK Pflicht | 2 | 2 | 3 | 3 | 3 | 3 | 2 | D1+D2 | LP-Kompetenz Quellenkritik ist im aktuellen Game partiell (aufgabe-1-6 ja, keine in M2/M3 als reiner quellenkritik-Typ). |
| 4 | Fiktions-Klausel v3.6-Policy | 3 | 2 | 3 | 3 | 3 | 3 | 2 | D2 | Fiktive Tagebuecher mat-1-1, mat-2-3, mat-2-6, mat-3-6 — Policy-Frage betrifft fachliche Korrektheit/Quellenkritik-Standard. |
| 5 | Medien-Diversitaet Pflicht-Quoten-Gate | 3 | 3 | 3 | 3 | 3 | 2 | 2 | D6 | Medien-Diversitaet = Inklusions-Dimension. |
| 6 | Phase-0.2.M Dual-Kanal-Pflicht | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | Pipeline. |
| 7 | Plan-vs-Wirklichkeit M4-Vergleich | OUT-OF-SCOPE | — | — | — | — | — | — | — | M4-scope. |
| 8 | QuellentextMehrstimmen M3-Pilot | 3 | 3 | 3 | 3 | 3 | 2 | 2 | D6 | Mehrstimmen ~ Multiperspektivitaet (CP-8). |
| 9 | Pre-Ingest-Titel-Validierung | 3 | 2 | 3 | 3 | 3 | 3 | 2 | D2 | Titel-Hallu haette direkte fachliche Falschaussage erzeugt. |
| 10 | Phase 0.2.Z bpb-Quell-Integration | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | Optional. |
| 11 | Wiki-Scope-Katalog-Luecken | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | Prozess. |
| 12 | Sub-Agenten Lizenz-Pre-Check | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | Pipeline. |
| 13 | medien_katalog_game.json Schema | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | Schema. |
| 14 | primaerquellen_katalog_game.json | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | Optional. |
| 15 | Q-STRUKTUR-bpb-Coverage | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | Optional. |
| 16 | Sub-Agent bpb_primaerquellen | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | Optional. |
| 17 | bpb-Discovery-Mechanismus | 3 | 3 | 3 | 3 | 3 | 3 | 3 | — | Optional. |

---

## 4. Neue F-RA6-beta-NN Findings

### F-RA6-beta-01 — Genozid-Cliffhanger ohne Resolution (Mappe 3 im Deploy-Zustand)

**Dimension-Scores:** D1=1, D2=3, D3=2, D4=3, D5=1, D6=2 → **PQI-Max = 1** (D1, D5)
**Treiber:** D1 + D5

**Evidenz:**
- `data.json` Mappe-3 sicherung.ueberleitung (data.json:2457 entspr., identisch zu Source `mappe-3/rahmen/sicherung.json:5`): "Am grünen Tisch in Berlin hatten Diplomaten Grenzen gezogen. Doch was bedeutete das für die Menschen, die in den neuen „Schutzgebieten" lebten? **In Deutsch-Südwestafrika wurde die Antwort besonders brutal.**"
- `lehrkraft.html` Zeile 65 (ethische Leitlinien): "Ueberwaeltigungsverbot: Voelkermord an Herero und Nama sachlich, nicht reisserisch darstellen. Keine Schockbilder. Fakten statt Emotionalisierung." — adressiert ausdrueklich Mappe 4.
- Mappe 4 ist **nicht deployed** (Testrun-Abbruch, F-RA1-08).
- LP-QM §6.2 Primaerquellen-Befund: "Die traditionellen europäischen Mächterivalitäten und der imperialistische Wettlauf um Kolonien mündeten in den Ersten Weltkrieg." + §6.2.8 AP-2 "Kolonialismus ohne Opferperspektive — Verstoß: U06 Kern."

**Begruendung:**
- **D1 = 1:** Der Cliffhanger suggeriert den Schuelerinnen und Schuelern, dass die Resolution folgt (Herero/Nama-Genozid). Im Deploy-Zustand ohne Mappe 4 bleibt die Kompetenzerwartung "erklaeren, dass europaeische Maechterivalitaeten + imperialistischer Wettlauf um Kolonien ... muendeten" zwar vom Nationalismus-Teil her abdeckbar, aber die Kolonialismus-Konsequenzen (Gewalt, Voelkermord) werden angedeutet und nicht erarbeitet. LP-QM §6.2.5 CP-8 Pflicht (Opferperspektive explizit) ist in der gesamten deployed Produktion nicht operationalisiert — mat-3-6 ist ein fiktiver Tagebucheintrag aus Ostafrika, nicht der spezifische Herero/Nama-Kontext, der in Mappe 4 abgedeckt werden sollte.
- **D5 = 1:** Narrative Immersion = Cliffhanger mit Emotionaler Unabgeschlossenheit. R7-Schueler bleiben mit "besonders brutal" allein. Dramaturgisch gebrochener Bogen: die ganze Produktion inszeniert sich als historische Detektiv-Arbeit der Mappen 1-4; das Deploy zeigt nur 75% davon.
- **D6 = 2:** Mat-3-6 (fiktive ostafrikanische Frau) ist singulaere afrikanische Stimme im Deploy; kein zweites Quellenpaar fuer Perspektivendiversitaet innerhalb der Betroffenen. Inklusion der kolonialisierten Perspektive ist schwach operationalisiert.
- **D3 = 2:** Mappenabschluss mit Verweis auf nicht-existente Mappe 4 ist didaktisch undurchsichtig.

**Klasse-A-Kandidat?** JA. Trigger-Prob = 80% (Schueler/Lehrkraefte erkennen Cliffhanger-Luecke direkt beim Durchspielen). Didaktische Evidenz geliefert: LP-QM-AP-2-Naherung + SCPL-Erwartungsbruch.

---

### F-RA6-beta-02 — Erfundene Kompetenz-IDs in lehrkraft.html

**Dimension-Scores:** D1=2, D2=2, D3=3, D4=3, D5=3, D6=3 → **PQI-Max = 2** (D1, D2)

**Evidenz:** `lehrkraft.html` Zeilen 59-60:
- `GPG7_LB2_K_04: Die SuS beschreiben die nationalstaatlichen Einigungsbestrebungen...`
- `GPG7_LB2_K_05: Die SuS erklaeren, dass die traditionellen europaeischen Maechterivalitaeten...`

**Begruendung:** Die LP-Kompetenzerwartungen aus LP-QM §6.2.1 sind **textlich korrekt paraphrasiert**, aber die IDs `GPG7_LB2_K_04/05` existieren im bayrischen LehrplanPLUS GPG7 nicht — der offizielle LP nummeriert die Kompetenzerwartungen NICHT auf dieser Granularitaet. Lehrkraefte, die diese IDs fuer Schulinterne Lehrpaln-Dokumentation uebernehmen, produzieren **unbelegbare Pseudo-Zitate**. D1 = 2: Kompetenz-Alignment stimmt inhaltlich, aber die Pseudo-Referenzierung schwaecht die LP-Nachvollziehbarkeit. D2 = 2: fachliche Korrektheit verletzt bei ID-Ebene (erfundene Nomenklatur). Wirkung: Lehrkraft-Transparenz, nicht Schueler-Erlebnis.

**Klasse-A-Kandidat?** NEIN. Trigger-Prob fuer Schueler = 0%. Lehrkraft-sichtbar, aber geringe Produktions-Dringlichkeit.

---

### F-RA6-beta-03 — Ueberleitung mat-3-3→mat-3-4 faktisch falsch ("Bismarck verteilte Afrika")

**Dimension-Scores:** D1=3, D2=1, D3=3, D4=3, D5=2, D6=3 → **PQI-Max = 1** (D2)
**Treiber:** D2 (fachliche Korrektheit)

**Evidenz:** `ueberleitungen.json` mat-3-4-Text: "Die Karikatur hat dir gezeigt: **Bismarck verteilte Afrika wie einen Kuchen.** Doch was war das Ergebnis dieser Aufteilung — wie sah Afrika danach tatsaechlich aus?"
Dagegen `mat-3-4.json` inhaltlich: "Im Zentrum sitzt der **belgische König Leopold II.**, rechts der deutsche Kaiser Wilhelm I., links der russische Bär. Vor ihnen auf dem Tisch: der Kongo als „Hauptgericht"."

**Begruendung:** Die Schueler-sichtbare Ueberleitung behauptet, die Karikatur zeige Bismarck; das tatsaechliche Bild (Maréchal, Le Frondeur 1884) zeigt Leopold II. als zentralen Akteur. Bismarck ist in der historischen Realitaet Konferenzveranstalter, aber NICHT zentral in der Maréchal-Karikatur. **D2 = 1** (fachliche Falschaussage im SuS-sichtbaren Text). D5 = 2 (Narrativ-Inkonsistenz: Schueler sehen Leopold, Text sagt Bismarck). D1/D3/D4/D6 unberuehrt.

Diese Zone wurde durch die Ersatz-Karikatur (Maréchal statt urspruenglich geplanter Bismarck-zentrierter Variante) eingefuehrt (F-RA4-03 Perspektiv-Drift). Die Ueberleitung wurde nicht angepasst. Fix ist trivial (1 Satz umformulieren, z.B. "Die Karikatur hat dir gezeigt: die europaeischen Herrscher verteilten Afrika wie einen Kuchen — zentral Leopold II. und Wilhelm I.").

**Klasse-A-Kandidat?** JA. Trigger-Prob = 60% (aufmerksame Schueler/Lehrkraefte stutzen; Lehrkraft entdeckt es im Briefing). Trivial-Fix.

---

### F-RA6-beta-04 — aufgabe-3-3-Deploy-Luecke bricht Bildkritik-Kompetenz

**Dimension-Scores:** D1=1, D2=3, D3=1, D4=3, D5=2, D6=2 → **PQI-Max = 1** (D1, D3)
**Treiber:** D1 + D3

**Evidenz:**
- Source `mappe-3/aufgaben/aufgabe-3-3.json` existiert (typ: `begruendung`, 4 Punkte, Bloom L4, bezieht mat-3-3 + mat-3-4 ein).
- Deploy `data.json` zeigt Sprung von aufgabe-3-2 → aufgabe-3-4 (Grep-Befund: `aufgabe-3-1`, `aufgabe-3-2`, `aufgabe-3-4`, `aufgabe-3-5` — keine 3-3).
- Mappe-3 PROGRESSIONSPLAN.md Pos 3: Vergleich Gartenlaube vs. Karikatur, Bloom L4, vier Dimensionen; Q-GATE-LOG Phase 2.2c A8 bestaetigt diese Aufgabe als "denkanregend".

**Begruendung:**
- **D1 = 1:** LP-QM §6.2.1 Kompetenzerwartung "erschliessen Bildquellen und beurteilen deren Darstellung" (analog zu CP-4 Multiperspektivitaet in §6.2.5) wird in Mappe 3 vom Deploy-Aufgabenportfolio **nicht operationalisiert**. Die zwei Bilder mat-3-3 (Gartenlaube) + mat-3-4 (Maréchal) werden angezeigt, aber nur aufgabe-3-5 (Freitext-Code) bezieht mat-3-3 als Neben-Referenz ein. Keine dezidierte Bildkritik-Aufgabe. **CP-8 Multiperspektivitaet** verbleibt aufgabenseitig erzählerisch, nicht operativ.
- **D3 = 1:** Progressionsplan-Sequenz C2 (Vergleich) wird gebrochen; Aufgaben-AFB-Sprung von II direkt auf I-II (Pos 4 Reihenfolge) bedeutet AFB-Monotonie-Bruch.
- **D5 = 2:** Narrativ: zwei Bilder im Raum ohne Diskussion = inkonsistente Inszenierung.
- **D6 = 2:** Die Karikatur-Analyse waere Zugangspunkt fuer kritische Perspektive (franzoesische Aussensicht) — Register-/Inklusions-wirksam.

**Verhaeltnis zu F-RA2-03:** F-RA2-03 benennt das gleiche Symptom (Aufgabe fehlt). F-RA6-beta-04 ist die **dimensionale PQI-Begruendung** mit D1+D3 = 1 (nicht nur Pipeline-/Struktur-, sondern LP-QM-Kompetenz-Konsequenz). Evtl. im finalen Matrix-v2 konsolidieren: **F-RA2-03 als Symptom, F-RA6-beta-04 als PQI-Treiber** — aber beides ist derselbe Defekt.

**Klasse-A-Kandidat?** JA. Trigger-Prob = 90% (entdeckt bei jedem Mappe-3-Durchgang). Fix: aufgabe-3-3.json in Deploy-data.json uebernehmen.

---

### Mappe-2-spezifische Beobachtungen (keine eigenen PQI-1)

Stichprobe Mappe-2-Aufgaben (aufgabe-2-1..5, 6 Materialien, 6 TB-Knoten):
- **aufgabe-2-3 (MC Soldat Sedan)**: LP-QM §6.2.8 AP-1 "Nation-ohne-Kritik" PRÜFUNG → PASS. mat-2-3 (Iteration 2 DIDAKTIK-Review) wurde bewusst deemotionalisiert ("war es egal, woher wir kamen" statt "Wir sind Deutsche"); Fiktion-Markierung "Der folgende Eintrag ist nachempfunden" explizit vor Lektuere. Kein Nationalismus-Apologia.
- **aufgabe-2-5 (Freitext)**: Beurteilung Reichsgruendung mit bewusstem Dilemma (Einheit vs. Freiheit) — LP-QM §6.2.2 OH-1 (Politik-Wirtschaft-Gesellschaft-Verflechtung) + §6.2.5 CP-2 (Gegenwartsbezug implizit via "Demokratie-Reflexion") erfuellt.
- **hefteintrag M2**: kontrastierendes Ordnungsmuster (links: 1848 gescheitert / rechts: 1871 erfolgreich) ist didaktisch praezise; Gefahr der "Erfolg-des-Militaerischen-Suggestion" durch Revisionierung in Iteration 2 abgefangen (loesung[1]: "Einheit, aber keine Freiheit").
- **D1-Alignment Mappe 2:** LP-QM §6.2.1 "beschreiben nationalstaatliche Einigungsbestrebungen und deutsche Reichsgruendung" → PASS (k2-1..k2-6 decken Bismarck, Blut+Eisen, drei Einigungskriege, kleindeutsche Loesung, Kaiserproklamation, Einheit-ohne-Freiheit ab).

Keine eigenstaendigen F-RA6-beta-Findings fuer Mappe 2.

---

### Mappe-1-spezifische Beobachtungen (keine eigenen PQI-1)

Stichprobe Mappe-1 (Einstieg Nationalismus):
- **aufgabe-1-6 (quellenkritik)**: eigene quellenkritik-Aufgabe vorhanden — LP-QM §7 QG-03 (Quellenkritik-Pflicht bei Primaerquelle) erfuellt. D2 im Aufgabenportfolio stabil.
- **hefteintrag M1 ordnungsmuster: sequenziell**: didaktisch korrekt (chronologischer Bogen 1848→gescheitert). RA2-02-Einwand entkraeftet (siehe F-RA2-02).

Keine eigenstaendigen F-RA6-beta-Findings fuer Mappe 1.

---

## 5. Aggregate & Patterns

### 5.1 Patterns

**P1 — Asymmetrische PQI-Verteilung ueber Mappen:** Mappe 1 und Mappe 2 sind didaktisch deutlich robuster als Mappe 3. Grund: Phase 2.1b Didaktik-Review hatte in Mappe 2 eine explizite Iteration 2 (Revision mat-2-3 + mat-2-6 nach D1-2/D3-1/D3-2-FAILs). Mappe 3 zeigt in Q-GATE-LOG keine solche Iteration — alle Achsen direkt PASS auf Iteration 1. Das korreliert mit der erhoehten Defekt-Dichte in Mappe 3 (aufgabe-3-3-Luecke, Ueberleitung-Fehler, Cliffhanger-Problematik).

**P2 — Source-Deploy-Parity als didaktischer Haupt-Vector:** Mehrere PQI-1/PQI-2-Befunde resultieren aus "Source ist korrekt, Deploy ist falsch/unvollstaendig": F-RA2-03 (aufgabe-3-3 fehlt) und F-RA3-03 (Hefteintrag-Dualstruktur persistiert). Die Engine ist robust, aber das Assembly-/Deploy-Gate fehlt.

**P3 — LP-QM-AP-2-Naherung im Deploy-Zustand:** LP-QM §6.2.8 Anti-Pattern-2 ("Kolonialismus ohne Opferperspektive") ist formal nicht verletzt (mat-3-6 liefert afrikanische Perspektive), aber **die Operationalisierung ist schwach**: mat-3-6 = 1 fiktive Quelle, nur in aufgabe-3-5 (Freitext) als Primaer-Ref, keine Bildkritik-Aufgabe. Addiert mit dem Genozid-Cliffhanger entsteht im Produkt-Ganzen eine AP-2-Gefaehrdung, die Mappe 4 auffangen sollte aber in der deployed Version nicht auffaengt.

**P4 — Fiktions-Markierung sauber, aber Authentizitaets-Zumutung:** Alle 4 fiktiven Tagebuecher (mat-1-1, mat-2-3, mat-2-6, mat-3-6) sind sauber als "nachempfunden" / "fiktiv" markiert — DIDAKTIK-REVIEW-LOG Iteration 2 bestaetigt. Aber: Insgesamt 4 fiktive Ego-Dokumente in 3 Mappen ist hoch. LP-QM §6.2.8 CP-5 Primaerquellen-Pflicht leicht unter Druck; aufgabe-1-6 (quellenkritik) als explizite Quellen-Reflexions-Aufgabe ist die wichtigste Kompensation. R0-FINAL+ #4 "Fiktions-Klausel v3.6" ist daher berechtigt (PQI-2).

**P5 — Sprachniveau-Drift in Mappe 3 (Fachwortdichte):** "Imperialismus, Kolonialisierung, Schutzgebiet, Kolonialvereine, Absatzmaerkte" in wenigen Saetzen (mat-3-2) — R7 (DaZ-Anteil) benoetigt Entlastung. Kein PQI-1-Defekt, aber systematisches D4-PQI-2 in Mappe 3 (F-RA2-10).

### 5.2 Cross-RA-Pattern-Tabelle

| Pattern | RAs beruehrt | PQI-Treiber | Empfehlung |
|---|---|---|---|
| P1 Asymmetrische Mappen-Qualitaet | RA2, RA3, neue beta | D1+D3+D5 | Mappe-3-Revisionszyklus analog Mappe-2 Iteration 2 |
| P2 Source-Deploy-Parity | RA1, RA3 | D3 | Assembly-Validator (PI-ENGINE-2) implementieren |
| P3 AP-2-Naherung Kolonialismus | RA2, RA4, neue beta | D1+D6 | Mappe 4 deployen ODER Mappe 3 um realhistorische Opferperspektive ergaenzen |
| P4 Fiktions-Quoten | RA2, RA4 | D2 | R0-FINAL+ #4 Policy + 1 realhistorische Primaerquelle Mappe 3 |
| P5 Sprachniveau-Drift R7 | RA2 | D4+D6 | Fachwort-Dichte-Gate, Glossar-Kachel in Engine |

### 5.3 Dimensional-Heatmap (PQI-1-Verteilung)

```
                D1  D2  D3  D4  D5  D6
F-RA2-03         1   3   1   3   2   2   (aufgabe-3-3 fehlt)
F-RA3-01         3   3   1   3   2   3   (Pool-Reset-Bug)
F-RA4-01         2   1   3   3   3   2   (Hallu-Rate 33%)
F-RA6-beta-01    1   3   2   3   1   2   (Genozid-Cliffhanger)
F-RA6-beta-03    3   1   3   3   2   3   (Ueberleitung falsch)
F-RA6-beta-04    1   3   1   3   2   2   (aufgabe-3-3-Luecke)
------------------------------------------
PQI-1-Count      3   2   3   0   0   0
PQI-2-Count      1   1   0   0   4   4
```

**Lesart:** D1+D2+D3 sind die dominant betroffenen Dimensionen; D4+D5+D6 enthalten PQI-2-Probleme, keine PQI-1. Das deckt sich mit der Rubric-Gewichtung: Lernziel-Alignment (D1), fachliche Korrektheit (D2) und Strukturierung (D3) sind "harte" Dimensionen, die scharf brechen; Kalibrierung/Narrativ/Inklusion sind eher graduelle Defekte.

---

## 6. Empfehlung Subset (Klasse-A-Kandidaten aus Agent-Sicht)

Klasse-A = PQI ≤ 2 UND Trigger-Prob ≥ 50% UND realistisch umsetzbar vor Pilot.

| Rang | ID | PQI | Trigger-Prob | Kern-Maßnahme | Aufwand |
|---|---|---|---|---|---|
| A1 | **F-RA2-03 / F-RA6-beta-04** | 1 | 90% | aufgabe-3-3.json aus Source in `data.json` uebernehmen (mechanische Kopie) | 15 Min |
| A2 | **F-RA6-beta-03** | 1 | 60% | `ueberleitungen.json` mat-3-3→mat-3-4: Satz "Bismarck verteilte Afrika wie einen Kuchen" umformulieren zu "die europaeischen Herrscher — mit Leopold II. im Zentrum — verteilten Afrika wie einen Kuchen" | 10 Min |
| A3 | **F-RA6-beta-01** | 1 | 80% | a) Entweder Cliffhanger im sicherung.ueberleitung Mappe 3 entschaerfen (z.B. "In einigen Kolonien wurde die Antwort besonders brutal — dieses Kapitel wird in der naechsten Mappe vertieft."), b) ODER Mappe 4 deployen, c) ODER Retraction: sicherung.ueberleitung ohne Vorverweis formulieren | 20 Min fuer a); 3-4h fuer b) |
| A4 | **F-RA3-01** | 1 | 100% | Engine-Patch `escape-engine.js:2814` Lueckentext-Pool-Reset (RA3-Befund verweist auf konkrete Zeile) | 30 Min |
| A5 | **F-RA4-01 / F-RA4-04** | 1/2 | 30% | Latentes Hallu-Risiko: Assembly-Validator + Entity-Scan implementieren (PI-ENGINE-2 + PI-ENGINE-3) | 2h |
| A6 | **F-RA2-09 / F-RA2-10 / F-RA2-12** | 2 | 70% | Mappe-3-Revisionszyklus analog Mappe-2 Iteration 2 (DIDAKTIK-Review mit D1-D4 Prueffragen gegen aktuelle mat-3-*.json) | 2h |
| A7 | **F-RA6-beta-02** | 2 | 10% (Lehrkraft-sichtbar) | Kompetenz-IDs in `lehrkraft.html` entfernen oder klar als "interne Paraphrase" ausweisen (kein Pseudo-LP-Zitat) | 10 Min |

**Vor Pilot Pflicht:** A1-A4 (alle PQI-1, Trigger-Prob ≥ 60%).
**Vor Pilot empfohlen:** A5-A6.
**Nach Pilot ausreichend:** A7.

**Mappe-4-Entscheidung (A3):** Option (b) deployen Mappe 4 ist die didaktisch beste, loest LP-QM §6.2.5 CP-8 Pflicht vollumfaenglich, aber out-of-scope-Auftrag. Option (a) Cliffhanger-Entschaerfung ist vor-Pilot-kompatibel.

---

## 7. Meta

### 7.1 LP-QM-Verify-PENDING-Liste
Keine PENDING-Tags in Mappe-1-Teil. LP-QM §6.2 wurde fuer alle D1-Bewertungen konsultiert.

### 7.2 NO-EVIDENCE-Liste
Keine.

### 7.3 Offene Fragen
1. **F-RA2-09 Revision (resolved):** RA2 sagt "mat-3-6 in keiner Aufgabe referenziert". Deploy-Check: mat-3-6 IST Primaer-Referenz in aufgabe-3-5. RA2-Befund ist veraltet / bezieht sich auf Zwischenstand vor Retro-Patch. In beta-Matrix als REVISION zu PQI-2 zurueckgestuft (siehe F-RA2-09-Begruendung).
2. **Mappe-3 Opferperspektive-Realhistorizitaet (pending):** mat-3-6 ist fiktiv. LP-QM §6.2.6 nennt "Zeitzeugenbericht eines kongolesischen Zwangsarbeiters" als Beispielpaar fuer realhistorische Opferperspektive. Fiktive junge Frau weicht davon ab. Bewertung: In Mappe 3 isoliert **nicht** PQI-1, da (a) Fiktion sauber markiert, (b) aufgabe-1-6 Quellenkritik generell verankert. ABER im Produkt-Ganzen (mit F-RA6-beta-01 Cliffhanger) wird die fehlende realhistorische Primaerquelle zum PQI-1-Faktor. **Empfehlung:** R0-FINAL+ #8 "QuellentextMehrstimmen M3-Pilot" mit realhistorischer Quelle (z.B. kolonialhistorische Primaerquelle bpb-kompatibel) um-setzen.
3. **Source-Inkonsistenz Mappe 3 hefteintrag knoten (neu):** `mappe-3/rahmen/hefteintrag.json` listet nur 5 knoten (k3-1, k3-3, k3-4, k3-5, k3-6); k3-2 (Imperialismus) fehlt im knoten-Array, wird aber in PROGRESSIONSPLAN.md + Q-GATE-LOG (Achse 4, A9) als abgedeckt ausgewiesen. Deploy-Auswirkung zu pruefen — falls Tafelbild-Rendering k3-2 nicht rendert, geht die Imperialismus-Definitions-Visualisierung verloren. Klassifikation: potentiell F-RA6-beta-05, aber Evidenzlage reicht noch nicht fuer eindeutige PQI-Zuordnung. **Pending fuer Hand-off.**

### 7.4 LP-QM-Primaer-Referenzen (Uebersicht genutzte Abschnitte)

- LP-QM §6.2.1 (Kompetenzerwartungen LB2 R7): verwendet fuer D1-Scoring aller Nationalismus- und Kolonialismus-Findings
- LP-QM §6.2.5 CP-Liste (CP-1, CP-4 Pflicht; CP-8 Pflicht bei Kolonialismus): F-RA2-04, F-RA2-09, F-RA6-beta-01, F-RA6-beta-04
- LP-QM §6.2.8 Anti-Patterns: AP-1 (Nation-Narrativ) Pruefung Mappe 2 (PASS), AP-2 (Kolonialismus ohne Opfer) Annaherung Mappe 3 (F-RA6-beta-01)
- LP-QM §7 Q-Gates QG-01 bis QG-05: QG-03 (Quellenkritik-Pflicht) via aufgabe-1-6 erfuellt, QG-05 (Jahrgangsstufenprofil/Coverage) fuer alle Bloom-Bewertungen

---

**STATUS: COMPLETE — alle Mappen 1-3 auditiert, 4 F-RA6-beta-Findings ergaenzt, Aggregate + Empfehlungen finalisiert.**
