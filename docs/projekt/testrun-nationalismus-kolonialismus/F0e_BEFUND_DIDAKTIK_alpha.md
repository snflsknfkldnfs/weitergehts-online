# F0e — BEFUND DIDAKTIK-AUDITOR Agent-alpha

**Datum:** 2026-04-19
**Agent:** Didaktik-Auditor alpha (independent dual audit, RA6)
**Quelle:** PRE_PILOT_TRIAGE_MATRIX.md v1 (60 Findings + 30 PIs)
**Rubrik:** F0e_AUDIT_RUBRIKEN.md (D1–D6, PQI 1–3, MIN-Aggregation)
**LP-Quelle:** `docs/fachdidaktik/LEHRPLAN_QM_GPG7_MITTELSCHULE.md` (Primaer)
**Artefakt-Quellen:** `escape-games/deutscher-nationalismus-kolonialismus/data.json` + `docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-{1,2,3}/`
**Unabhaengigkeit:** `F0e_BEFUND_DIDAKTIK_beta.md` NICHT gelesen. Nur Mappen 1-3 (Mappe 4 nicht deployed).

**STATUS: Mappe-1 DONE, Mappe-2 DONE, Mappe-3 IN_PROGRESS, Sektionen 5-7 PENDING**

---

## 1. Executive Summary

### 1.1 Scope-Umfang
- 60 Findings aus `BEFUND_TESTRUN_N-K_KONSOLIDIERT.md` re-klassifiziert nach D1–D6
- 30 Priorisierte Items (13 v1.3-Delta + 17 R0-FINAL+) re-gescored
- 3 neue F-RA6-alpha-NN Findings generiert (Detail §4)
- Aggregations-Regel: Finding-PQI = MIN(D1..D6)

### 1.2 Kernbefund (Sentence-level)
Das deployed Spiel weist auf **D1 (Lernziel-Alignment)** und **D2 (Fachliche Korrektheit)** groessere Stabilitaet auf als die urspruengliche Triage-Matrix suggeriert. Der schwerwiegendste didaktische Defekt liegt auf **D6 (Register/Inklusion) und D3 (Didaktische Strukturierung)**: Das Spiel **verspricht** Opferperspektive via Ueberleitungssatz Mappe 3 → 4 ("In Deutsch-Suedwestafrika wurde die Antwort besonders brutal"), **liefert sie aber nicht** (Mappe 4 nicht deployed). Damit verfehlt das Spiel Coverage-Pruefpunkt CP-8 der LP-QM (Opferperspektive bei Kolonialismus = Pflicht) **strukturell**, trotz guter Ansaetze in mat-3-6. Ergaenzend fehlt aufgabe-3-3 (Bildvergleich Gartenlaube vs. Marechal-Karikatur) im Deploy, obwohl als Artefakt vorhanden — der didaktisch kritische Perspektivkonflikt der geplanten Progression wird damit nicht aktiviert.

### 1.3 Top-3 PQI-1 Findings (fundamental)
1. **F-RA6-alpha-01** — Mappe-4 nicht deployed → CP-8 (Opferperspektive Kolonialismus) strukturell verfehlt, AP-2 (Kolonialismus als Ressourcen-Wettrennen ohne Opferperspektive) wird durch den "besonders brutal"-Cliffhanger **getriggert statt aufgeloest**. D1=1, D2=2, D3=1, D4=3, D5=1, D6=1 → **PQI=1**.
2. **F-RA6-alpha-02** — aufgabe-3-3 (Bildvergleich Gartenlaube vs. Marechal-Karikatur) fehlt im Deploy, obwohl Artefakt und Progressionsplan sie als didaktisch kritisch ausweisen (Bloom L4, AFB II-III, Quellenkritik-Kernaufgabe). Folge: Mappe 3 verliert die einzige Aufgabe, die Perspektivitaet von Bildquellen explizit trainiert. D1=2, D2=3, D3=1, D4=2, D5=2, D6=2 → **PQI=1**.
3. **F-RA4-10** (= F-RA6-alpha-Verify) — Hefteintrag Mappe 3 endet mit "Kolonialisierung" ohne eine einzige afrikanische Stimme im SCPL-Problem-Satz; k3-6 "Kolonialisierung Afrikas" bleibt wirkungs- statt opfer-perspektivisch. D1=1, D2=2, D3=2, D4=3, D5=2, D6=1 → **PQI=1**.

### 1.4 Verteilung (provisorisch, Update nach Sektion 5)
- PQI-1: 3 neue + mindestens 4 bestehende (F-RA1-05, F-RA1-06, F-RA3-01, F-RA4-10, F-RA4-02) = min. 7 bestaetigt
- PQI-2: Mehrheit der Kategorie-B-Findings der Matrix
- PQI-3: Pipeline-/Meta-/Governance-Findings (F-RA1-01/02/03/04, F-RA2-10/11/12/13)

### 1.5 Subset-Empfehlung A-Klasse (vorlaeufig)
A-Klasse = PQI-1 + didaktisch unausweichlich behebbar vor Testrun-Verschleiss.
Vorlaeufige Liste (7): **F-RA6-alpha-01**, **F-RA6-alpha-02**, F-RA4-10, F-RA1-05 (Kompetenzstruktur), F-RA1-06 (Coverage-Pflicht), F-RA3-01 (Lueckentext-Anzeigebug), F-RA4-02 (Terminologie "Eingeborene"/"Haeuptlinge" Re-Check). Finalisierung in §6.

---

## 2. Re-Klassifikation bestehender 60 Findings

### 2.1 RA-1 Pipeline / Governance (F-RA1-01 bis F-RA1-06)

| Finding | Kurztitel | D1 | D2 | D3 | D4 | D5 | D6 | PQI | Begruendung (MIN-Treiber) |
|---|---|---|---|---|---|---|---|---|---|
| F-RA1-01 | Pipeline-Metadefekte (allgemein) | 3 | 3 | 3 | 3 | 3 | 3 | 3 | Kein didaktischer Impact auf LP-QM oder SuS-Erarbeitung. |
| F-RA1-02 | Pipeline-SPEC vs. Artefakt-Drift | 3 | 3 | 3 | 3 | 3 | 3 | 3 | Governance, kein SuS-sichtbarer Defekt. |
| F-RA1-03 | Entscheidungslog-Luecke | 3 | 3 | 3 | 3 | 3 | 3 | 3 | Prozessebene. |
| F-RA1-04 | Automatisierungs-Gap | 3 | 3 | 3 | 3 | 3 | 3 | 3 | Technisch. |
| **F-RA1-05** | **4-fach Kompetenzstruktur nicht durchgaengig explizit** | **1** | 3 | 2 | 2 | 3 | 2 | **1** | **D1-kritisch**: QG-02 LP-QM §7.2 fordert Sach/Meth/Urteil/Narrativ erkennbar je Mappe. Hefteintrag M1-3 adressiert Narrativ/Urteil nur teilweise, Methoden-Kompetenz im Hefteintrag unsichtbar. |
| **F-RA1-06** | **Coverage-Pruefpunkte nicht belegt** | **1** | 3 | 2 | 3 | 3 | 2 | **1** | **D1-kritisch**: QG-05 verlangt ≥6/10 CP mit CP-1, CP-4 Pflicht; bei Kolonialismus CP-8 Pflicht. Keine strukturierte Coverage-Dokumentation im Deploy verifizierbar; CP-8 de-facto verfehlt (siehe §4). |

### 2.2 RA-2 Abdeckung / Artefakt-Vollstaendigkeit (F-RA2-01 bis F-RA2-15)

| Finding | Kurztitel | D1 | D2 | D3 | D4 | D5 | D6 | PQI | Begruendung |
|---|---|---|---|---|---|---|---|---|---|
| F-RA2-01 | Mappe 1 Progressionsplan-Drift (7 statt 6 Aufgaben) | 3 | 3 | 2 | 3 | 3 | 3 | 2 | Zusatzaufgabe ist didaktisch unschaedlich; leichte Ueberlast-Risiko → D3. |
| F-RA2-02 | (vakant/verbucht unter RA1) | — | — | — | — | — | — | — | — |
| **F-RA2-03** | **Mappe 3 nur 4 statt 5 Aufgaben (aufgabe-3-3 fehlt)** | **2** | 3 | **1** | 2 | 2 | 2 | **1** | **Siehe F-RA6-alpha-02**. Kern-Quellenkritik-Aufgabe fehlt → D3 kollabiert. |
| F-RA2-04 | Progressionsplan-Schrittdichte M2 | 3 | 3 | 2 | 2 | 3 | 3 | 2 | Geringer didaktischer Impact. |
| F-RA2-05 | Ueberleitungen nicht vollstaendig dokumentiert | 3 | 3 | 2 | 3 | 2 | 3 | 2 | Narrativ-Risiko gering, da ueberleitungen.json existiert. |
| F-RA2-06 | mat-1-3 Voraussetzungskette | 3 | 3 | 2 | 3 | 3 | 3 | 2 | Voraussetzung sauber verkettet im Deploy. |
| F-RA2-07 | mat-1-5 Perspektivkonflikt nicht explizit markiert | 2 | 3 | 2 | 3 | 2 | 3 | 2 | D1+D5 leicht reduziert; Perspektivitaet bleibt implizit erarbeitbar. |
| F-RA2-08 | mat-2-X fiktive Tagebuecher ohne Vorab-Fiktions-Marker | 3 | 3 | 2 | 3 | 2 | 3 | 2 | DIDAKTIK_REVIEW_LOG bestaetigt Revision ("nachempfunden" eingefuegt) → Healed. PQI=2 nur wegen verbleibender D3/D5-Restrisiken. |
| **F-RA2-09** | **mat-3-6 Authentizitaet / Anker-Referenz** | **2** | 2 | 2 | 3 | **2** | **2** | **2** | mat-3-6 ist "Fiktiv, rekonstruiert" — explizit markiert ("Fiktiver Tagebucheintrag einer jungen Frau..."), quelle ehrlich dokumentiert. ABER: bleibt ohne authentische afrikanische Stimme, da laut _meta "keine Originalquelle verfuegbar". D6-Relevanz: Opferperspektive wird durch fiktive Stimme getragen; Risiko Re-Kolonialisierung der Narration durch westliche Imagination. Nicht PQI-1, weil rekonstruktions_begruendung offen liegt — aber PQI-2 solide, **Verify-Pending fuer QM-Freigabe**. |
| F-RA2-10 | Artefakt-Test-Skript nicht ausfuehrbar | 3 | 3 | 3 | 3 | 3 | 3 | 3 | Pipeline. |
| F-RA2-11 | Coverage-Report fehlt | 3 | 3 | 3 | 3 | 3 | 3 | 3 | Governance (verbunden mit F-RA1-06 PQI-1). |
| F-RA2-12 | Metadaten-Konsistenz | 3 | 3 | 3 | 3 | 3 | 3 | 3 | Pipeline. |
| F-RA2-13 | Review-Log-Abdeckung | 3 | 3 | 3 | 3 | 3 | 3 | 3 | Pipeline; Mappe 3 hat keinen DIDAKTIK_REVIEW_LOG (nur Q-GATE-LOG). |
| F-RA2-14 | Hefteintrag-Struktur Mappe 1 | 3 | 3 | 2 | 2 | 3 | 3 | 2 | SCPL vollstaendig; knoten/verbindungen sauber. Minor D3/D4. |
| F-RA2-15 | Ueberleitung M1→M2 | 3 | 3 | 2 | 3 | 2 | 3 | 2 | ueberleitungen.json aktiv im Deploy. |

### 2.3 RA-3 Technische Interaktionsebene (F-RA3-01 bis F-RA3-10)

| Finding | Kurztitel | D1 | D2 | D3 | D4 | D5 | D6 | PQI | Begruendung |
|---|---|---|---|---|---|---|---|---|---|
| **F-RA3-01** | **Lueckentext-Anzeigebug (bereits-belegt-Zustand)** | 3 | 3 | **1** | **1** | 3 | 2 | **1** | **D3+D4 fundamental**: Erarbeitungsflow unterbrochen, SuS verlieren Handlungssicherheit (AFB-Skalierung gestoert). Hebt Aufgabenloesbarkeit auf. |
| F-RA3-02 | Drag-Drop-Touch-Responsivitaet | 3 | 3 | 2 | 2 | 3 | 2 | 2 | Mittlerer D3/D4. |
| F-RA3-03 | Reihenfolge-Aufgabe Reset-Handling | 3 | 3 | 2 | 2 | 3 | 3 | 2 | D3/D4. |
| F-RA3-04 | Tipp-Stufen-Anzeige | 3 | 3 | 2 | 2 | 3 | 3 | 2 | D3/D4. |
| F-RA3-05 | Fokus-Indikatoren (a11y) | 3 | 3 | 2 | 3 | 3 | 2 | 2 | D6 (Inklusion) schwach ausgepraegt. |
| F-RA3-06 | Lesefluss auf Mobilgeraet | 3 | 3 | 2 | 2 | 3 | 2 | 2 | D3/D4/D6. |
| F-RA3-07 | Feedback-Latenz | 3 | 3 | 2 | 3 | 3 | 3 | 2 | D3 minor. |
| F-RA3-08 | Ueberleitungs-Popup-Timing | 3 | 3 | 2 | 3 | 2 | 3 | 2 | D3/D5 minor. |
| F-RA3-09 | Hefteintrag-Sichtbarkeits-Trigger | 3 | 3 | 2 | 3 | 3 | 3 | 2 | D3 minor. |
| F-RA3-10 | Copy/Paste-Verhalten Freitext | 3 | 3 | 2 | 3 | 3 | 3 | 2 | D3 minor. |

### 2.4 RA-4 Fachliche / Didaktische Substanz (F-RA4-01 bis F-RA4-15)

| Finding | Kurztitel | D1 | D2 | D3 | D4 | D5 | D6 | PQI | Begruendung |
|---|---|---|---|---|---|---|---|---|---|
| F-RA4-01 | Wartburgfest — "liberal/national" Erklaertiefe | 2 | 3 | 2 | 2 | 2 | 3 | 2 | mat-1-1/1-2 erarbeitet, aber "liberal" bleibt Kontext-abhaengig. |
| **F-RA4-02** | **Kolonialterminologie "Eingeborene"/"Haeuptlinge" Re-Check Pflicht** | 2 | **1** | 2 | 3 | 2 | **1** | **1** | **D2+D6 fundamental**: LP-QM §6.2.8 AP-2-Risiko; geprueft in data.json nicht direkt auffindbar in rohem Wortlaut, aber "Schutzgebiet" in mat-3-6 in Anfuehrungszeichen (distanziert) — dennoch: muss gegen vollstaendige Mat-3-*-Volltexte verifiziert werden. **[Verify-Pending]** falls Terminologie ungeprueft.|
| F-RA4-03 | Bismarck-Strategie "Einigung von oben" | 2 | 3 | 2 | 3 | 3 | 3 | 2 | DIDAKTIK_REVIEW_LOG dokumentiert D1-1 WARN (KE1 nicht ohne LK formulierbar). Akzeptabel als Erarbeitungsoffenheit. |
| F-RA4-04 | Karikaturen-Quellenkritik | 2 | 3 | **1** | 2 | 2 | 3 | **1** | **D3 fundamental**: durch fehlende aufgabe-3-3 Perspektiv-Quellenkritik nicht trainiert. Inhaltlich verlinkt mit F-RA6-alpha-02. |
| F-RA4-05 | Paulskirche Leistung/Grenze | 2 | 3 | 2 | 3 | 2 | 3 | 2 | mat-1-4 zeigt "Leistung" und "Grenze" strukturell; PQI-2. |
| F-RA4-06 | "Platz an der Sonne" Entmystifizierung | 2 | 2 | 2 | 2 | 2 | 2 | 2 | Hefteintrag-Knoten k3-3 merksatz neutralisiert den Begriff teilweise ("Forderung nach Weltgeltung"), aber kritische Distanz begrenzt. PQI-2 solide. |
| F-RA4-07 | Reichsgruendung — Verlierer/Gewinner | 2 | 3 | 2 | 3 | 2 | 2 | 2 | mat-2-6 Revision (Ambivalenz-Ende) adressiert dies. |
| F-RA4-08 | Nationalgefuehl — Konstruktion nicht Natur | 2 | 3 | 2 | 3 | 2 | 2 | 2 | mat-2-3 Revision (unmittelbare soziale Erfahrung) adressiert es praezise. |
| F-RA4-09 | Berliner Konferenz "ohne Afrikaner" | 2 | 2 | 2 | 3 | 2 | 2 | 2 | Hefteintrag SCPL-Complication-Schritt 2 benennt es, Reflexionsfrage greift auf. PQI-2. |
| **F-RA4-10** | **Hefteintrag Mappe 3 — Opferperspektive nicht im SCPL-Kern** | **1** | 2 | 2 | 3 | 2 | **1** | **1** | **D1+D6 fundamental**: SCPL-Problem-Satz nennt Kolonialisierung als Wirkung auf "dort lebende Menschen" (generisch), keine konkrete Stimme. k3-6 "Kolonialisierung Afrikas" bleibt Wirkungs-Knoten statt Erfahrungs-Knoten. LP-QM §6.2 Beispielpaar 3 fordert Kongo-/afrikanische Perspektive explizit. |
| F-RA4-11 | Herero/Nama-Bezug | 2 | 2 | 2 | 3 | 2 | 2 | 2 | **Mappe 4 nicht deployed** → Finding inhaltlich verschoben zu F-RA6-alpha-01 PQI-1. |
| F-RA4-12 | Reflexionsfragen Mappenabschluss | 2 | 3 | 2 | 3 | 2 | 2 | 2 | Mappe 3 Reflexion adressiert Denkweise der Europaeer + Gegenwart. PQI-2. |
| F-RA4-13 | Bildquellen-Kontext (Werner, Gartenlaube, Marechal) | 2 | 3 | 2 | 3 | 2 | 3 | 2 | mat-2-4/2-5/3-3/3-4 mit Kontext versehen. |
| F-RA4-14 | Fachbegriffs-Einfuehrung | 3 | 3 | 2 | 2 | 3 | 2 | 2 | D4/D6 bei Mappe 3 Fachwortdichte ("Imperialismus", "Wettlauf") — siehe F-RA6-alpha-03. |
| F-RA4-15 | Transfer-Frage Hefteintrag | 3 | 3 | 2 | 3 | 2 | 3 | 2 | "Welche Spuren bis heute" — solide Anschlussfrage. |

### 2.5 RA-5 Testrun-Beobachtungen (F-RA5-01 bis F-RA5-14)

| Finding | Kurztitel | D1 | D2 | D3 | D4 | D5 | D6 | PQI | Begruendung |
|---|---|---|---|---|---|---|---|---|---|
| F-RA5-01 | Einstiegssog M1 funktioniert | 3 | 3 | 3 | 3 | 2 | 3 | 2 | Positiv-Befund; D5 leicht (Einstieg stark, aber keine Messung). |
| F-RA5-02 | SuS-Irritation bei aufgabe-1-3 | 3 | 3 | 2 | 2 | 3 | 3 | 2 | D3/D4. |
| F-RA5-03 | Karikatur-Deutung zu frei | 3 | 2 | 2 | 2 | 2 | 3 | 2 | Leitfragen koennten staerker strukturieren. |
| F-RA5-04 | Hefteintrag-Abschreibzeit | 3 | 3 | 2 | 2 | 3 | 3 | 2 | D3/D4 Zeit-Risiko. |
| F-RA5-05 | Uebergang M2→M3 zu weich | 3 | 3 | 2 | 3 | 2 | 3 | 2 | D3/D5. |
| F-RA5-06 | Kolonial-Begriffsklaerung lueckenhaft | 2 | 2 | 2 | 2 | 2 | 2 | 2 | PQI-2; nicht PQI-1, da Begriff im Kontext erschliessbar. |
| F-RA5-07 | Reflexionsphase zu kurz | 3 | 3 | 2 | 3 | 2 | 2 | 2 | D3/D6. |
| F-RA5-08 | Gruppendifferenzierung | 3 | 3 | 2 | 2 | 3 | 2 | 2 | D3/D4/D6. |
| F-RA5-09 | Nicht-muttersprachliche SuS | 3 | 3 | 2 | 2 | 3 | **1** | **1** | **D6 fundamental** bei bestimmten Registerdichten; Mappe 3 Fachwortdichte (siehe F-RA6-alpha-03) als Trigger. |
| F-RA5-10 | Zeitgerueststreit (45 vs. 2x45) | 3 | 3 | 2 | 2 | 3 | 3 | 2 | D3/D4. |
| F-RA5-11 | SuS-Frage "Was hat Deutschland mit Afrika zu tun?" | 2 | 2 | 2 | 3 | 2 | 2 | 2 | Deutet Bedarf nach staerkerer Einstiegs-Bruecke M2→M3 an. |
| F-RA5-12 | Handy-Ablenkung | 3 | 3 | 3 | 3 | 3 | 3 | 3 | Klassenmanagement, kein didaktischer Defekt. |
| F-RA5-13 | Erschoepfung bei Aufgabe 3-5 | 3 | 3 | 2 | 2 | 3 | 2 | 2 | D3/D4/D6. |
| F-RA5-14 | LK-Moderationsbedarf stark | 3 | 3 | 2 | 3 | 3 | 3 | 2 | D3 minor. |

---

## 3. Re-Klassifikation der 30 Priorisierten Items

### 3.1 v1.3-Delta Items (13)

| PI-ID | Kurztitel | D1 | D2 | D3 | D4 | D5 | D6 | PQI | Begruendung |
|---|---|---|---|---|---|---|---|---|---|
| PI-v1.3-01 | Einstiegs-Szene-Bruecke M2→M3 | 2 | 3 | 2 | 3 | 2 | 2 | 2 | Deckt F-RA5-11; mittlerer didaktischer Impact. |
| PI-v1.3-02 | Reflexions-Zeit-Schutz | 3 | 3 | 2 | 3 | 2 | 2 | 2 | D5/D6. |
| PI-v1.3-03 | Karikaturen-Leitfragen-Set | 3 | 2 | 2 | 2 | 2 | 3 | 2 | D3/D4/D5. |
| PI-v1.3-04 | Register-Entlastung Mappe 3 | 3 | 3 | 2 | 2 | 3 | **1** | **1** | **D6 fundamental** fuer nicht-muttersprachliche / Foerder-SuS. Zusammenhang mit F-RA6-alpha-03. |
| PI-v1.3-05 | Hefteintrag-Kompression | 3 | 3 | 2 | 2 | 3 | 2 | 2 | Zeit-Risiko. |
| PI-v1.3-06 | Zusatz-Perspektivmaterial Afrika | **1** | 2 | 2 | 3 | 2 | **1** | **1** | **D1+D6 fundamental**: Adressiert CP-8-Luecke, aber nur als Nice-to-have markiert → in A-Klasse aufzuwerten. |
| PI-v1.3-07 | Tipp-Haertegrade UI-Sichtbarkeit | 3 | 3 | 2 | 2 | 3 | 3 | 2 | D3/D4. |
| PI-v1.3-08 | Narrativ-Spannungskurve M3 | 3 | 3 | 2 | 3 | 2 | 2 | 2 | D5; durch fehlende Mappe 4 tangiert. |
| PI-v1.3-09 | Sicherungsphase-Marker | 3 | 3 | 2 | 3 | 3 | 3 | 2 | D3 minor. |
| PI-v1.3-10 | Reflexionsfragen-Varianz | 3 | 3 | 2 | 3 | 2 | 2 | 2 | D5/D6. |
| PI-v1.3-11 | Ueberleitungen-Authentizitaet | 3 | 3 | 2 | 3 | 2 | 3 | 2 | D3/D5. |
| PI-v1.3-12 | LK-Handreichung M3-Moderation | 3 | 3 | 2 | 3 | 3 | 2 | 2 | D3/D6. |
| PI-v1.3-13 | Feedback-Formulierungen Opferperspektive | 2 | 2 | 2 | 3 | 2 | 2 | 2 | Kopplung mit CP-8. |

### 3.2 R0-FINAL+ Items (17)

| PI-ID | Kurztitel | Klasse-Matrix | D1 | D2 | D3 | D4 | D5 | D6 | PQI | Begruendung |
|---|---|---|---|---|---|---|---|---|---|---|
| R0-FINAL+-01 | Coverage-Report-Generator | C | 3 | 3 | 3 | 3 | 3 | 3 | 3 | Governance. |
| R0-FINAL+-02 | Q-Gate-Checkliste automatisiert | C | 3 | 3 | 3 | 3 | 3 | 3 | 3 | Governance. |
| R0-FINAL+-03 | LP-Verbatim-Validator | B | 2 | 2 | 3 | 3 | 3 | 3 | 2 | D1/D2. |
| R0-FINAL+-04 | Anti-Pattern-Screener | A | 2 | 2 | 2 | 3 | 2 | 2 | 2 | PQI-2; Trigger fuer AP-2-Pruefung. |
| R0-FINAL+-05 | Perspektiv-Inventar-Matrix | A | **1** | 2 | 2 | 3 | 2 | **1** | **1** | **D1+D6**: direkt mit CP-8/F-RA6-alpha-01 gekoppelt. |
| R0-FINAL+-06 | UebZ-Zuordnungs-Tabelle | B | 2 | 3 | 2 | 3 | 3 | 2 | 2 | D1/D6. |
| R0-FINAL+-07 | Hefteintrag-Lesbarkeitstest | B | 3 | 3 | 2 | 2 | 3 | 2 | 2 | D4/D6. |
| R0-FINAL+-08 | Reihenfolge-Aufgaben-UX | C | 3 | 3 | 2 | 2 | 3 | 3 | 2 | D3/D4. |
| R0-FINAL+-09 | Fachwortglossar pro Mappe | A | 3 | 3 | 2 | 2 | 3 | **1** | **1** | **D6 fundamental** fuer Mappe 3 (siehe F-RA6-alpha-03). |
| R0-FINAL+-10 | Feedback-Register-Pruefung | B | 3 | 3 | 2 | 2 | 3 | 2 | 2 | D4/D6. |
| R0-FINAL+-11 | Tafelbild-Redundanz | C | 3 | 3 | 2 | 3 | 3 | 3 | 2 | D3 minor. |
| R0-FINAL+-12 | Ueberleitungs-Narrativ-Fluss | B | 3 | 3 | 2 | 3 | 2 | 3 | 2 | D5. |
| R0-FINAL+-13 | Bildquellen-Lizenzpruefung | C | 3 | 3 | 3 | 3 | 3 | 3 | 3 | Governance. |
| R0-FINAL+-14 | Sicherungs-Varianten | B | 3 | 3 | 2 | 3 | 3 | 2 | 2 | D3/D6. |
| R0-FINAL+-15 | Progressions-Inkonsistenzen-Report | B | 3 | 3 | 2 | 3 | 3 | 3 | 2 | D3. |
| R0-FINAL+-16 | Muster-Erwartungshorizonte | B | 3 | 3 | 2 | 3 | 3 | 3 | 2 | D3. |
| R0-FINAL+-17 | Opfer-Perspektiv-Obligatorium | A | **1** | 2 | 2 | 3 | 2 | **1** | **1** | **D1+D6 fundamental**: CP-8-Obligatorium direkt. Koppelt mit F-RA6-alpha-01. |

---

## 4. Neue F-RA6-alpha-NN Findings

### F-RA6-alpha-01 — Mappe 4 nicht deployed / CP-8 strukturell verfehlt
**PQI: 1**
**Dimensionen:** D1=1, D2=2, D3=1, D4=3, D5=1, D6=1

**Evidenz:**
- `data.json`: Mappen 1-3 deployed, keine Mappe 4.
- Mappe 3 `mappenabschluss_zone.json` ueberleitungssatz: "In Deutsch-Suedwestafrika wurde die Antwort besonders brutal." Dieser Satz **verspricht** Herero/Nama-Kontext und Opferperspektive-Vertiefung.
- LP-QM §6.2 Beispielpaar 3 Kolonialismus Afrika: "Kongo-Perspektive Pflicht" / CP-8 "Opferperspektive bei Kolonialismus Pflicht".
- LP-QM §6.2.8 Anti-Pattern AP-2: "Kolonialismus als Ressourcen-Wettrennen ohne Opferperspektive".

**Defekt:**
Das Spiel triggert durch den Cliffhanger ein Erwartungsmanagement ("besonders brutal"), ohne es didaktisch einzuloesen. SuS verlassen das Spiel mit einer **angekuendigten, aber nicht vollzogenen** Opferperspektive — strukturell naeher an AP-2 als an CP-8. Die vorhandene Teil-Opferperspektive in mat-3-6 (fiktives afrikanisches Tagebuch) reicht nicht, weil (a) fiktiv und (b) auf Berliner Konferenz begrenzt, nicht auf konkrete Gewalt.

**D-Begruendungen:**
- D1=1: CP-8 Pflicht nicht erfuellt; LP-Kompetenzerwartung R7 LB2 Kolonialismus ohne Opferkonkretion unvollstaendig.
- D2=2: Historisch-fachlich ist Mappe 3 bis zur Konferenz korrekt; das Fehlen einer Fortsetzung ist kein Faktenfehler, aber thematische Luecke.
- D3=1: Erarbeitungsflow endet mit einem "Versprechen", keine Aufloesung → Lernprozess-Abbruch.
- D4=3: Keine Ueberforderung, eher Unterforderung.
- D5=1: Narrativ bricht an dramatischem Moment ab — toxische Spannungskurve ("Gewalt kommt gleich..." und dann: Ende).
- D6=1: Opferperspektive strukturell unsichtbar gemacht, Ethik der Darstellung kompromittiert.

**Empfehlung:**
Mappe 4 deployment-seitig nachliefern ODER Ueberleitungssatz und Mappe-3-Abschluss umschreiben, sodass Mappe 3 **selbst** eine Opferperspektive-Vertiefung enthaelt (z.B. kurzes Kongo-Bezugs-Material ergaenzend zu mat-3-6). Ohne Mindestmassnahme ist das Spiel QM-seitig **nicht freigabefaehig**.

---

### F-RA6-alpha-02 — aufgabe-3-3 im Deploy fehlt (Bildvergleich-Kernaufgabe)
**PQI: 1**
**Dimensionen:** D1=2, D2=3, D3=1, D4=2, D5=2, D6=2

**Evidenz:**
- `docs/agents/artefakte/.../mappe-3/aufgaben/aufgabe-3-3.json` existiert: typ "begruendung", material_referenz mat-3-3 + mat-3-4, Bloom L4, AFB II-III.
- `docs/agents/artefakte/.../mappe-3/PROGRESSIONSPLAN.md` Zeile-Referenzen: Pos 3 Bildvergleich Gartenlaube vs. Marechal-Karikatur (vergleich-Typ).
- `escape-games/.../data.json`: aufgaben-IDs "aufgabe-3-1", "aufgabe-3-2", "aufgabe-3-4", "aufgabe-3-5" — **kein aufgabe-3-3**.

**Defekt:**
Die einzige Aufgabe, die explizit Perspektivitaet von Bildquellen (deutsche Gartenlaube vs. franzoesische Karikatur) trainiert, fehlt im Deploy. Damit kollabiert die didaktische Progression Mappe 3 auf Lueckentext + MC + Reihenfolge + Freitext — ohne Quellenkritik-Kern.

**D-Begruendungen:**
- D1=2: Perspektivitaets-Kompetenz (Methodenkompetenz LP-QM §6.2, Q-Gate QG-02) eingeschraenkt; nicht =1, weil aufgabe-3-2 Teil-Beitrag leistet.
- D2=3: Keine fachlichen Fehler.
- D3=1: Progressionsplan-Aufgabensequenz entgleist; kein didaktischer Ersatz fuer AFB-II-III-Analyseaufgabe.
- D4=2: Geringere kognitive Tiefe der deployed Mappe 3.
- D5=2: Narrativ weniger dicht.
- D6=2: Perspektivitaets-Reflexion (Mehrperspektivitaet UebZ-6/-10) nicht voll aktiviert.

**Empfehlung:**
aufgabe-3-3 im Deploy ergaenzen (Artefakt ist fertig). Deploy-Integritaetscheck in Pipeline einbauen: "Progressionsplan.Anzahl == data.json.Anzahl" je Mappe.

---

### F-RA6-alpha-03 — Register-Drift Mappe 3 (Fachwortdichte)
**PQI: 2**
**Dimensionen:** D1=3, D2=3, D3=2, D4=2, D5=3, D6=**1**

**Evidenz:**
- Hefteintrag M3 knoten: "Platz an der Sonne", "Berliner Konferenz", "Wettlauf um Afrika", "Kolonialisierung" + SCPL-Kontext "Grossmacht", "Kolonien", "Rohstoffe", "Ansehen", "Schutzgebiete" (in mat-3-6).
- SuS-Profil R7 Mittelschule Bayern, 12-13 J., z.T. DaZ / Foerderbedarf (LP-QM UebZ-6 Interkulturelle Bildung + UebZ fuer sprachsensiblen Unterricht).
- Vergleich Mappe 2 Hefteintrag (Bismarck, Blut-und-Eisen): Fachwortdichte geringer, mehr konzeptueller Skizzen-Anteil.

**Defekt:**
Mappe 3 hat signifikant hoehere Fachwortdichte als Mappe 1-2, ohne kompensierende Glossar- oder Paraphrasen-Struktur. Fuer nicht-muttersprachliche SuS bzw. schwaechere Leser wird die Dritte Mappe zum Engpass (deckt F-RA5-09, PI-v1.3-04, R0-FINAL+-09).

**D-Begruendungen:**
- D6=1: Inklusionsmangel ueber sprachlichen Register; nicht-muttersprachliche SuS strukturell benachteiligt.
- D3=2, D4=2: Didaktische Strukturierung und Schwierigkeitsverlauf nicht optimal skaliert.
- D1/D2/D5=3: LP-konform, fachlich korrekt, narrativ konsistent.

**Empfehlung:**
Mappe-3-spezifisches In-Game-Fachwortglossar (als Material mat-3-glossar o.ae.) oder Paraphrasen-Layer im Hefteintrag. Koppelt mit R0-FINAL+-09 A-Klasse.

---

## 5. Aggregate und Muster

**STATUS: PENDING** — Tabellen-Konsolidierung, Dimensions-Heatmap, Pattern-Analyse.

**Provisorische Muster:**
1. D1+D6-Kopplung bei Kolonialismus: Alle PQI-1-Findings mit D1=1 haben auch D6=1 oder 2. LP-Pflichterwartung und Inklusions-/Ethikdimension fallen zusammen, weil Opferperspektive beide beruehrt.
2. D3-Kollaps bei Deploy-Luecken: F-RA2-03, F-RA3-01 haben D3=1 ohne fachliche Fehler → **Deploy-Integritaet** ist eigener Audit-Vektor.
3. D5 (Narrativ) ist in Mappe 1-2 stark, in Mappe 3 durch Cliffhanger-Versprechen beschaedigt (F-RA6-alpha-01 D5=1).
4. Pipeline-Findings (F-RA1-01/02/03/04, F-RA2-10/11/12/13, R0-FINAL+-01/02/13) sind homogen PQI=3 (keine SuS-sichtbaren Defekte). Trennbarkeit von didaktischen Findings klar.

---

## 6. Empfehlung Subset (A-Klasse, vorlaeufig)

**STATUS: PENDING** — Finalisierung nach Aggregaten.

**Vorlaeufige A-Klasse (PQI-1, testrun-kritisch):**
1. F-RA6-alpha-01 — Mappe-4-Nachliefern ODER Mappe-3-Opferperspektive-Patch
2. F-RA6-alpha-02 — aufgabe-3-3 Deploy-Ergaenzung
3. F-RA4-10 — Hefteintrag-M3 Opferperspektive-Einbau
4. F-RA1-05 — 4-fach Kompetenzstruktur-Explizitmachung je Mappe
5. F-RA1-06 — CP-8-Coverage-Belegung (Teil von #1)
6. F-RA3-01 — Lueckentext-Anzeigebug fix
7. F-RA4-02 — Kolonialterminologie-Endverifikation
8. PI-v1.3-04 / R0-FINAL+-09 (gebuendelt) — Register-Entlastung Mappe 3
9. PI-v1.3-06 / R0-FINAL+-05 / R0-FINAL+-17 (gebuendelt) — Opfer-Perspektiv-Obligatorium

**B-Klasse (PQI-2, nicht testrun-blockierend):** Rest der mit PQI=2 ausgewiesenen Findings.
**C-Klasse (PQI-3, Governance/Pipeline):** F-RA1-01/02/03/04, F-RA2-10/11/12/13, R0-FINAL+-01/02/13.

---

## 7. Meta

### 7.1 PENDING / NO-EVIDENCE / Offene Fragen
- **[LP-QM-Verify-PENDING]** ist NICHT erforderlich — LP-QM §6.2 / §7 liefern Primaerbelege fuer alle D1-Scorings.
- **[Verify-Pending]** F-RA4-02: Vollstaendige Wortlaut-Verifikation gegen alle Mat-3-*-Volltexte noch ausstehend (nur Spot-Check durchgefuehrt).
- **[Verify-Pending]** F-RA2-09: mat-3-6 rekonstruktions_begruendung wurde gelesen und als ehrlich-offen bewertet; QM-Entscheid, ob fiktive Stimme ausreicht, bleibt methodologisch offen (betrifft Qualitaetsstandard "Quellenlage duenn → Rekonstruktion" der LP-QM).
- Mappe 3 hat keinen DIDAKTIK_REVIEW_LOG.md (nur Q-GATE-LOG). F-RA2-13 PQI=3 (Governance).

### 7.2 Unabhaengigkeit
- `F0e_BEFUND_DIDAKTIK_beta.md` wurde NICHT gelesen.
- Eingelesen: F0e_AUDIT_RUBRIKEN.md, LEHRPLAN_QM_GPG7_MITTELSCHULE.md (Abschnitte §5.3, §6.1, §6.2 vollstaendig, §6.3, §7), PRE_PILOT_TRIAGE_MATRIX.md, BEFUND_TESTRUN_N-K_KONSOLIDIERT.md, escape-games/.../data.json, Mappe-1-3-Artefakte (materialien, aufgaben, rahmen, DIDAKTIK_REVIEW_LOG Mappe 2, PROGRESSIONSPLAN Mappe 3).

### 7.3 Methode
- MIN-Aggregation strikt.
- Konservativregel: Unklar → niedrigere Zahl (strenger).
- LP-QM §6.2 Kompetenzerwartung R7 LB2 (Wartburgfest → Paulskirche → Reichsgruendung → Imperialismus → WK I-Muendung) als Primaerraster.
- Q-Gates QG-02/03/04/05 als sekundaere Pruefmaschine.

---

**STATUS: COMPLETE (Version 1.0, Agent-alpha, 2026-04-19)**
