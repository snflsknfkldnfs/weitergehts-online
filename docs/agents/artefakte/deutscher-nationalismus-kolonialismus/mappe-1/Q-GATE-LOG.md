# Q-GATE-LOG: Mappe 1 — Der Traum von der Einheit

**Game-ID:** `deutscher-nationalismus-kolonialismus`
**Mappe:** 1 / 4

---

## Phase 2.0 (Rahmen)

**Datum:** 2026-04-12
**Vertrag:** VERTRAG_PHASE_2-0_RAHMEN.md
**Katalog:** Q-GATE-MECHANIK.md §7.3

| # | ID | Kriterium | Klasse | Ergebnis | Detail |
|---|---|---|---|---|---|
| 1 | SCHEMA-03 | Schema-Validierung | SCHEMA | PASS | Alle 5 JSON-Dateien valid (hefteintrag, einstieg, sicherung, mappenabschluss_zone, meta). |
| 2 | C1b | Stundenfrage-Identität | KONSISTENZ | PASS | einstieg.problemstellung === hefteintrag.stundenfrage = "Warum kämpften Menschen 1848 für ein geeintes Deutschland?" |
| 3 | M3b | Kernerkenntnisse-Identität | KONSISTENZ | PASS | scpl.loesung[] = 2 Einträge, identisch mit TAFELBILD-Entwurf (Nationalbewegung + Scheitern 1848). |
| 4 | Q-M2-DISJ | Disjunktionsregel | KONSISTENZ | PASS | reflexionsimpuls = Transfer-Frage (heute, Demokratie). loesung[] = historische Fakten (1848). Wort "Freiheit" in beiden — aber kein Fachbegriff-Lemma und keine Paraphrase. |
| 5 | Q-M2-08 | Quellenangabe-Hygiene | FORM | PASS | Keine internen Artefakt-Namen in SuS-sichtbaren Texten. |
| 6 | V-RAHMEN | Vollständigkeit | SCHEMA | PASS | Alle Pflichtfelder vorhanden. zusammenfassung/ueberleitung als Deferred-Marker "[REVISION IN 2.1c]" gesetzt. |
| 7 | TYP-01-R | Typographische Korrektheit | FORM | PASS | Echte UTF-8-Umlaute, Gedankenstriche (—), keine ASCII-Ersatzzeichen. |
| 8 | REG-01 | Sprachregister R7 | FORM | PASS | Einstieg narrativ/immersiv, keine didaktische Metasprache. |
| 9 | L-DUP | Lemma-Duplikat-Freiheit | FORM | PASS | lemma_duplicate_check auf alle SCPL-Felder: 0 Duplikate. |

**Pre-Checks (aus GUETEKRITERIEN_HEFTEINTRAG_PRODUKT.md):**

| ID | Kriterium | Ergebnis | Detail |
|---|---|---|---|
| HE14 | Schaubild-Charakter | PASS | 7 Knoten, 5 Verbindungen — strukturiert, nicht überladen. |
| HE15 | Ordnungsmuster-Treue | PASS | sequenziell — alle Verbindungen temporal/kausal, keine Kontrastierung. |
| HE16 | Merksatz-Kalibrierung | PASS | 3 Knoten mit merksatz (k1-3, k1-6, k1-7), alle ≤15W, schülernah. |

**S-Zone-Autonomie-Filter (v3.4):** PASS — Mappe 1, kein Vormappe-Wissen möglich.
**Knoten-Elaborierung (v3.5):** PASS — k1-3 (Nationalbewegung), k1-6 (Scheitern), k1-7 (Volkssouveränität) alle mit merksatz.

**Gesamturteil: PASS**

---

## Phase 2.1 (Material-Produktion)

**Datum:** 2026-04-12
**Vertrag:** VERTRAG_PHASE_2-1_MATERIAL.md
**Katalog:** Q-GATE-MECHANIK.md §7.4

| # | ID | Kriterium | Klasse | Ergebnis | Detail |
|---|---|---|---|---|---|
| 1 | SCHEMA-04 | Schema-Validierung | SCHEMA | PASS | Alle 6 JSON-Dateien valid gegen material-output-schema.json. additionalProperties: keine Extras. |
| 2 | P4 | Dispatch-Isolation | PROZESS | PASS | 6 Dateien = 6 Dispatches. Jedes Material einzeln produziert und validiert. |
| 3 | W-BUDGET | Wortbudget Mappe | FORM | PASS | 472W < 500W Limit. |
| 4 | SCPL-COV | SCPL-Zonen-Abdeckung | KONSISTENZ | PASS | Alle 5 Zonen (S, C1, C2, C3, P) durch mindestens 1 Material abgedeckt. |
| 5 | TB-COV | Tafelbild-Knoten-Abdeckung | KONSISTENZ | PASS | 7/7 Knoten (k1-1 bis k1-7) in tafelbild_knoten_abgedeckt referenziert. |
| 6 | FB-COV | Fachbegriff-Abdeckung | KONSISTENZ | PASS | Alle 5 Fachbegriffe (Nationalgedanke, Nationalbewegung, Märzrevolution, Nationalversammlung, Volkssouveränität) in Materialtexten vorhanden. |
| 7 | SEQ-CHAIN | Sequenzketten-Integrität | KONSISTENZ | PASS | Lückenlose Kette: null→mat-1-1→mat-1-2→mat-1-3→mat-1-4→mat-1-5→mat-1-6→null. |
| 8 | REF-PAT | Artefakt-Ref-Pattern | SCHEMA | PASS | Alle artefakt_ref matchen ^(pq\|pd\|pb\|pk\|pz\|pt\|ps)-[0-9]+-[0-9]+$. |
| 9 | TYP-01-M | Typographische Korrektheit | FORM | PASS | UTF-8 Umlaute, Gedankenstriche (—), korrekte Anführungszeichen (U+201E/U+201C). |
| 10 | REG-01 | Sprachregister R7 | FORM | PASS | Alle Texte altersangemessen, keine didaktische Metasprache in SuS-Texten. |
| 11 | V3.6 | Erzählerstimme/Perspektiv-Wissensgrenze | FORM | PASS | mat-1-1 (Tagebuch): Fachbegriff Nationalgedanke in Erzählerstimme (<em>), nicht in Figurentext. |
| 12 | STR-14 | Fiktions-Kennzeichnung | FORM | PASS | mat-1-1 quelle: "Fiktiver Tagebucheintrag". |
| 13 | Q-TB | Tagebuch Q1-Q12 | INHALT | PASS | mat-1-1: 110W (≤120), MaxS=13W (≤15), Ich-Perspektive, hist. plausibel, kein Stereotyp. |

**Materialien-Übersicht:**

| ID | Typ | Position | SCPL | W | Knoten | Artefakt-Ref |
|---|---|---|---|---|---|---|
| mat-1-1 | tagebuch | 1 | S | 110 | k1-1 | pt-1-1 |
| mat-1-2 | bildquelle | 2 | C1 | 64 | k1-2, k1-3 | pb-1-1, pb-1-4 |
| mat-1-3 | quellentext | 3 | C1 | 59 | k1-2 | pq-1-1 |
| mat-1-4 | bildquelle | 4 | C2 | 50 | k1-4 | pb-1-5 |
| mat-1-5 | darstellungstext | 5 | C3 | 119 | k1-5, k1-6, k1-7 | pd-1-2, pd-1-3 |
| mat-1-6 | quellentext | 6 | P | 70 | k1-6, k1-7 | pq-1-2 |

**Gesamturteil: PASS**

---

## Phase 2.1b (Didaktik-Review)

**Datum:** 2026-04-12
**Vertrag:** VERTRAG_PHASE_2-1b_DIDAKTIK_REVIEW.md
**Input-Isolation:** Ja (meta-stripped, kein GERUEST/SKRIPT/INHALTSBASIS)

| Achse | Frage | Bewertung |
|---|---|---|
| D1 Erarbeitbarkeit | D1-1 | PASS |
| D1 Erarbeitbarkeit | D1-2 | PASS |
| D1 Erarbeitbarkeit | D1-3 | PASS |
| D2 Kogn. Aktivierung | D2-1 | PASS |
| D2 Kogn. Aktivierung | D2-2 | PASS |
| D3 Perspektiv-Auth. | D3-1 | PASS |
| D3 Perspektiv-Auth. | D3-2 | WARN (F1) |
| D3 Perspektiv-Auth. | D3-3 | PASS |
| D4 Sprachl. Zugang | D4-1 | WARN (F2) |
| D4 Sprachl. Zugang | D4-2 | PASS |

**Findings:** F1 Fiktions-Marker Tagebuch (mat-1-1, D3), F2 Zitatsprache R7-Grenzfall (mat-1-6, D4). Beide durch Phase 2.2 Aufgabendesign auffangbar.

**Gesamturteil: PASS** (0 FAIL, 2 WARN ≤ 2)

---

## Phase 2.1c (Cross-Konsistenz)

**Datum:** 2026-04-12
**Vertrag:** VERTRAG_PHASE_2-1c_CROSS.md

| Achse | Ergebnis | Detail |
|---|---|---|
| 1 Sequenz-Kohärenz | PASS | Fachbegriff-Erstnennung strikt aufsteigend: Nationalgedanke(1)→Nationalbewegung(2)→Volkssouveränität(3)→Märzrevolution(4)→Nationalversammlung(5). Keine Vorwärts-Referenz. |
| 2 Fachbegriff-Konsistenz | PASS | Alle 5 Begriffe konsistent definiert/verwendet. Volkssouveränität in mat-1-3 ("Recht des Volkes, sich selbst zu regieren") und mat-1-5 ("Idee, dass alle Macht vom Volk ausgeht") = synonyme Paraphrasen, keine Widersprüche. |
| 3 Überleitung-Kohärenz | PASS | 5/5 Überleitungen passen zu GERUEST-Intentionen und tatsächlichem Material-Inhalt. |
| 4 TB-Knoten-Gesamtabdeckung | PASS | 7/7 Knoten (k1-1 bis k1-7) abgedeckt. |
| 5 Perspektiven-Diversität | SKIP | Kein konflikttyp: true in Mappe 1 MATERIAL_GERUEST. |
| 6 Überleitung-Produktion | PASS | 5 Zwei-Vektoren-Brücken produziert → ueberleitungen.json. UE-1 bis UE-5 geprüft. R7-Register, max 2 Sätze, keine Spoiler. |
| 7 Hefteintrag-Revision | PASS | SCPL-Text-Patches: 0 (keine Änderung nötig). zusammenfassung + ueberleitung finalisiert (Deferred-Marker ersetzt). Q-M2-FINALIZE: PASS. Q-M2-09 Disjunktion: PASS. |

**Exit-Kriterien:**
- [x] ueberleitungen.json existiert und valid
- [x] sicherung.json: zusammenfassung (242 chars) + ueberleitung (178 chars) finalisiert
- [x] hefteintrag.json: STRUKTUR-FREEZE intakt, keine Patches
- [x] Q-GATE-LOG Phase 2.1c Block geschrieben

**Gesamturteil: PASS**

---

## Phase 2.2a (Progressionsplan)

**Datum:** 2026-04-12
**Vertrag:** VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md

| # | Kriterium | Ergebnis | Detail |
|---|---|---|---|
| 1 | Aufgabenzahl-Formel | PASS | basis(5) + knoten_faktor(1) + material_faktor(1) = 7, min(8,7) = 7 |
| 2 | Bloom-Verteilung | PASS | L1-L2: 1 (14,3% ≤ 40%), L3-L4: 4 (57,1% ≥ 30%), L5-L6: 2 (28,6% ≥ 20%) |
| 3 | AFB-Progression | PASS | I → I → I-II → II → II → II-III → III. Monoton steigend. |
| 4 | Typvielfalt | PASS | 6 Typen (min 3 ✓), kein Typ > 3× ✓. MC 2× begründet (unterschiedl. AFB + Material). |
| 5 | SCPL-Zonen-Mapping | PASS | S(1) → C1(2) → C1(3) → C2(4) → C3(5) → P(6) → L(7). Alle Zonen abgedeckt. |
| 6 | TB-Knoten-Abdeckung | PASS | 7/7 Knoten in mindestens 1 Aufgabe. |
| 7 | Material-Aktivierung | PASS | 6/6 Materialien als Primärquelle. |
| 8 | Freischalt-Code | PASS | EINHEIT (7 Zeichen, A-Z, thematisch passend). |

**Gesamturteil: PASS**

---

## Phase 2.2b (Aufgaben-Produktion)

**Datum:** 2026-04-12
**Vertrag:** VERTRAG_PHASE_2-2b_AUFGABE.md
**Dispatch-Isolation:** 7 Dispatches, je 1 Aufgabe

### Aufgabe 1 (lueckentext, AFB I, L1)

| # | Kriterium | Ergebnis | Detail |
|---|---|---|---|
| A1 | AFB-Kongruenz | PASS | Lückentext/AFB I: reiner Fachbegriff-Recall. |
| A3 | Material-Kongruenz | PASS | 4 Lücken (Befreiungskriegen, Wartburg, Einheit, Nationalgedanke) alle in mat-1-1. |
| MQ3 | Material-Ref-Verbot in frage | PASS | frage = "Ergänze die fehlenden Fachbegriffe." Kein [[…]] oder (M…). |
| A21 | Anti-Leak | PASS | T3 enthält Lösung (bei Lückentext erlaubt als heuristischer Tipp). |
| A24 | Bloom-Pflichtfeld | PASS | bloom_level: 1, Begründung vorhanden. |
| A25/A26 | Feedback-Schema | PASS | 3 Einträge: bestaetigung, korrektur, verknuepfung. |

### Aufgabe 2 (zuordnung, AFB I, L3)

| # | Kriterium | Ergebnis | Detail |
|---|---|---|---|
| A1 | AFB-Kongruenz | PASS | Zuordnung/AFB I: Kategorisierung visueller Symbole. |
| A3 | Material-Kongruenz | PASS | 4 Elemente → 3 Kategorien (Einheit, Freiheit, Volkssouveränität) aus mat-1-2. |
| MQ3 | Material-Ref-Verbot in frage | PASS | frage = "Ordne die Zeichen des Hambacher Festes der richtigen Forderung zu." |
| A21 | Anti-Leak | PASS | T3 als Denkhilfe mit Begründung. |
| A24 | Bloom-Pflichtfeld | PASS | bloom_level: 3, Begründung vorhanden. |
| A25/A26 | Feedback-Schema | PASS | 4 Einträge: 3× bestaetigung, 1× korrektur. |

### Aufgabe 3 (multiple-choice, AFB I-II, L3)

| # | Kriterium | Ergebnis | Detail |
|---|---|---|---|
| A1 | AFB-Kongruenz | PASS | MC/AFB I-II: Transfer historische Sprache → politische Begriffe. |
| A3 | Material-Kongruenz | PASS | Richtige Antwort aus mat-1-3 ableitbar. 3 Distraktoren plausibel. |
| MQ3 | Material-Ref-Verbot in frage | PASS | frage = "Was forderten die Redner auf dem Hambacher Fest?" |
| A21 | Anti-Leak | PASS | T3 gibt Denkhilfe, nicht identisch mit Lösung. |
| A24 | Bloom-Pflichtfeld | PASS | bloom_level: 3, Begründung vorhanden. |
| A25/A26 | Feedback-Schema | PASS | 4 Einträge: 1× bestaetigung, 3× korrektur. |

### Aufgabe 4 (reihenfolge, AFB II, L3)

| # | Kriterium | Ergebnis | Detail |
|---|---|---|---|
| A1 | AFB-Kongruenz | PASS | Reihenfolge/AFB II: Ursache-Wirkung-Ordnung. |
| A3 | Material-Kongruenz | PASS | 4 Schritte aus mat-1-4 + bisherigen Materialien rekonstruierbar. |
| MQ3 | Material-Ref-Verbot in frage | PASS | frage = "Bringe die Schritte zur Märzrevolution in die richtige Reihenfolge." |
| A21 | Anti-Leak | PASS | T3 benennt Eskalationslogik, nicht die exakte Reihenfolge. |
| A24 | Bloom-Pflichtfeld | PASS | bloom_level: 3, Begründung vorhanden. |
| A25/A26 | Feedback-Schema | PASS | 5 Einträge: 4× bestaetigung, 1× korrektur. |

### Aufgabe 5 (multiple-choice, AFB II, L3)

| # | Kriterium | Ergebnis | Detail |
|---|---|---|---|
| A1 | AFB-Kongruenz | PASS | MC/AFB II: Transfer Darstellungstext → Kernaussage. |
| A3 | Material-Kongruenz | PASS | Richtige Antwort aus mat-1-5 ableitbar. 3 Distraktoren plausibel. |
| MQ3 | Material-Ref-Verbot in frage | PASS | frage = "Welche Aufgabe hatte die Nationalversammlung in der Paulskirche?" |
| A21 | Anti-Leak | PASS | T3 gibt Denkhilfe, nicht identisch mit Lösung. |
| A24 | Bloom-Pflichtfeld | PASS | bloom_level: 3, Begründung vorhanden. |
| A25/A26 | Feedback-Schema | PASS | 4 Einträge: 1× bestaetigung, 3× korrektur. |

### Aufgabe 6 (quellenkritik, AFB II-III, L5)

| # | Kriterium | Ergebnis | Detail |
|---|---|---|---|
| A1 | AFB-Kongruenz | PASS | Quellenkritik/AFB II-III: W-Fragen-Analyse + Perspektiv-Bewertung. |
| A3 | Material-Kongruenz | PASS | 5 W-Fragen aus mat-1-6 beantwortbar. |
| MQ3 | Material-Ref-Verbot in frage | PASS | frage = "Untersuche das Zitat des Königs genauer." |
| QK-1 | W-Fragen-Anzahl | PASS | 5 W-Fragen (4-6 Bereich). |
| QK-2 | Äußere + Innere | PASS | 2 äußere (wer, wann) + 3 innere (warum, bedeutung, was_fehlt). |
| QK-7 | Anti-Automatismus | PASS | Primärquelle, erkennbare Perspektive, max 1/Mappe. |
| QK-8 | Perspektivität | PASS | was_fehlt + bedeutung zielen auf Perspektive/Intention. |
| A21 | Anti-Leak | PASS | T3 gibt Denkstrategie, nicht Musterantworten. |
| A24 | Bloom-Pflichtfeld | PASS | bloom_level: 5, Begründung vorhanden. |
| A25/A26 | Feedback-Schema | PASS | 5 Einträge: 2× bestaetigung, 1× hinweis, 1× korrektur, 1× verknuepfung. |
| F2 | Finding-Integration | PASS | W-Frage "bedeutung" paraphrasiert archaische Sprache. |

### Aufgabe 7 (freitext-code, AFB III, L5)

| # | Kriterium | Ergebnis | Detail |
|---|---|---|---|
| A1 | AFB-Kongruenz | PASS | Freitext/AFB III: Stellungnahme mit "beurteile"-Operator. |
| A3 | Material-Kongruenz | PASS | Leitfrage aus mat-1-5 + mat-1-6 beantwortbar. |
| MQ3 | Material-Ref-Verbot in frage | PASS | frage = "Beurteile, warum die Revolution von 1848 scheiterte." |
| A2b | Inhaltliche Verankerung | PASS | Konkretes Element: "Revolution von 1848". |
| A7 | Operator-Präzision | PASS | "Beurteile" = AFB-III-Operator. |
| A11-FT | Freitext-Qualität | PASS | Problemorientierte Leitfrage, 3 Teilfragen, 5 erwartete Begriffe, 2 Minimum-Keywords. |
| A21 | Anti-Leak | PASS | T3 zeigt Musterantwort + Bewertungsmaßstab, nicht identisch mit _meta.musterantwort. |
| A24 | Bloom-Pflichtfeld | PASS | bloom_level: 5, Begründung vorhanden. |
| A25/A26 | Feedback-Schema | PASS | 3 Einträge: bestaetigung, korrektur, verknuepfung. |

**Gesamturteil Phase 2.2b: PASS** (7/7 Aufgaben bestanden)

---

## Phase 2.2c (Aufgaben-Cross-Konsistenz)

**Datum:** 2026-04-12
**Vertrag:** VERTRAG_PHASE_2-2c_CROSS.md
**Katalog:** Q-GATE-MECHANIK.md §7.6

| # | ID | Kriterium | Klasse | Ergebnis | Detail |
|---|---|---|---|---|---|
| 1 | A1 | AFB-Kongruenz (Gesamtbild) | KONSISTENZ | PASS | Alle 7 AFB-Zuweisungen stimmen mit Progressionsplan überein. |
| 2 | A3 | Material-Kongruenz (Vollständigkeit) | KONSISTENZ | PASS | 6/6 Materialien in mindestens 1 Aufgabe als material_referenz. |
| 3 | A5 | Schwierigkeits-Progression | DIDAKTIK | PASS | I → I → I-II → II → II → II-III → III. Monoton steigend. |
| 4 | A8 | Kognitive Aktivierung | DIDAKTIK | PASS | Pos 6 (Quellenkritik) + Pos 7 (Freitext-Stellungnahme). |
| 5 | A9 | TB-Bezug | KONSISTENZ | PASS | 7/7 Knoten (k1-1 bis k1-7) diagnostisch abgedeckt. |
| 6 | A10 | Inhaltsgesteuerte Typauswahl | DIDAKTIK | PASS | 6 Typen, kein Typ > 3×, MC 2× begründet. |
| 7 | A12 | Sachbezogen-vor-Wertbezogen | DIDAKTIK | PASS | Pos 1-5 sachbezogen, Pos 6-7 wertbezogen. |
| 8 | A16 | Fragebogen-Kohärenz | KONSISTENZ | PASS | S → C1 → C1 → C2 → C3 → P → L. |
| 9 | A17 | SCPL-Zonen-Abdeckung | KONSISTENZ | PASS | Alle 6 Zonen mit mindestens 1 Aufgabe. |
| 10 | A18 | Material-Aktivierung | KONSISTENZ | PASS | 6/6 Materialien als Primärquelle. |

**Bloom-Verteilung (Ist):**

| Bloom-Bereich | Aufgaben | Anteil | Policy |
|---|---|---|---|
| L1-L2 | 1 (Pos 1) | 14,3 % | max 40 % ✓ |
| L3-L4 | 4 (Pos 2-5) | 57,1 % | min 30 % ✓ |
| L5-L6 | 2 (Pos 6-7) | 28,6 % | min 20 % ✓ |

**Findings-Integration:**

| Finding | Aufgaben-Bezug | Status |
|---|---|---|
| F1 (Tagebuch-Fiktion mat-1-1) | Pos 1: Fiktionalität nicht thematisiert (AFB I). | INTEGRIERT |
| F2 (Archaische Sprache mat-1-6) | Pos 6: W-Frage "bedeutung" als Paraphrase. | INTEGRIERT |

**Gesamturteil Phase 2.2c: PASS**
