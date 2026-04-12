# Q-GATE-LOG: deutscher-nationalismus-kolonialismus — Mappe 2

**Game-ID:** `deutscher-nationalismus-kolonialismus`
**Mappe:** 2 / 4
**Titel:** Einheit von oben

---

## Phase 2.0 (Rahmen)

**Datum:** 2026-04-12
**Gesamturteil:** PASS

| # | ID | Kriterium | Klasse | Ergebnis | Detail |
|---|---|---|---|---|---|
| 1 | SCHEMA-03 | Schema-Validierung | SCHEMA | PASS | hefteintrag-schema.json, rahmen-einstieg-schema.json, rahmen-sicherung-schema.json — alle valide |
| 2 | C1b | Stundenfrage-Identität | KONSISTENZ | PASS | einstieg.problemstellung === hefteintrag.stundenfrage |
| 3 | M3b | Kernerkenntnisse-Identität | KONSISTENZ | PASS | scpl.loesung[] = 2 Merksätze, konsistent mit TAFELBILD |
| 4 | Q-M2-DISJ | Disjunktionsregel | KONSISTENZ | PASS | reflexionsimpuls = Transfer/Bewertung (»War Einheit den Preis wert?«), disjunkt zu Fakten in loesung[] |
| 5 | Q-M2-08 | Quellenangabe-Hygiene | FORM | PASS | Keine internen Artefakt-Namen in SuS-sichtbaren Texten |
| 6 | V-RAHMEN | Vollständigkeit | SCHEMA | PASS | 5/5 Dateien: hefteintrag.json, einstieg.json, sicherung.json, mappenabschluss_zone.json, meta.json |
| 7 | TYP-01-R | Typographische Korrektheit | FORM | PASS | UTF-8 Umlaute, Gedankenstriche (—), dt. Anführungszeichen (»«) |
| 8 | REG-01 | Sprachregister R7 | FORM | PASS | Keine Didaktik-Metasprache in SuS-sichtbaren Texten |
| 9 | L-DUP | Lemma-Duplikat-Freiheit | FORM | PASS | Alle SCPL-Felder, Knoten-Texte, Merksätze, Verbindungs-Labels duplikatfrei |

**Korrekturen gegenüber TAFELBILD (FORMULIERUNGS-OFFEN):**
- kontextsatz: S-Zone-Autonomie-Filter — Vormappe-Rekapitulation entfernt
- C1.schritt: L-DUP-Korrektur (»Reden« Duplikat eliminiert) + 15W-Kompaktierung
- C2.schritt: 15W-Kompaktierung
- P.satz: 15W-Kompaktierung
- k2-5: merksatz ergänzt (»Kaiserproklamation« kein R7-Wort)

---

## Phase 2.1 (Material-Produktion)

**Datum:** 2026-04-12
**Materialien:** 6 (mat-2-1 bis mat-2-6)
**Gesamturteil:** PASS

| # | Material | Typ | W | TB-Knoten | Schema-Valid | Ergebnis |
|---|---|---|---|---|---|---|
| 1 | mat-2-1 | quellentext | 58 | k2-1, k2-2 | PASS | Bismarck »Blut und Eisen«-Rede, vereinfacht |
| 2 | mat-2-2 | darstellungstext | 120 | k2-3, k2-4 | PASS | Drei Einigungskriege + kleindeutsche Lösung |
| 3 | mat-2-3 | tagebuch | 104 | k2-3 | PASS | Soldat bei Sedan, nachempfunden (rev. D3-1/D3-2) |
| 4 | mat-2-4 | bildquelle | 49 | k2-5 | PASS | Kaiserproklamation, Anton von Werner |
| 5 | mat-2-5 | bildquelle | 46 | k2-5 | PASS | Niederländische Karikatur, CC0 |
| 6 | mat-2-6 | tagebuch | 100 | k2-6 | PASS | Enttäuschter 1848er-Demokrat (rev. D1-2/D3-2) |

---

## Phase 2.1b (Didaktik-Review)

**Datum:** 2026-04-12
**Iterationen:** 2

### Iteration 1: FAIL
- D1-2 FAIL: mat-2-6 formulierte KE2 vor (»Einheit ja, Freiheit nein«)
- D3-1 WARN: mat-2-3 Soldatenreflektion zu meta-reflexiv
- D3-2 WARN: Fiktion-Markierung in beiden Tagebüchern fehlte vor Quellennachweis
- D2-2 WARN: Schlussfolgerungsarbeit nur in 2 von 6 Materialien
- D1-1 WARN: KE1-Synthese erfordert Lehrkraft-Moderation

### Iteration 2: PASS (0 FAIL, 2 WARN)
- D1-2 → PASS: mat-2-6 zeigt jetzt Ambivalenz statt Antwort
- D3-1 → PASS: mat-2-3 endet emotional statt meta-reflexiv
- D3-2 → PASS: »Der folgende Eintrag ist nachempfunden« in beiden Tagebüchern
- D1-1 → WARN (akzeptiert): KE1-Synthese benötigt Lehrkraft
- D2-2 → WARN (akzeptiert): Bildanalyse braucht Scaffolding

---

## Phase 2.1c (Cross-Konsistenz + HE-Revision)

**Datum:** 2026-04-12
**Gesamturteil:** PASS

### Achsen 1-5: Cross-Konsistenz

| Achse | Ergebnis | Detail |
|---|---|---|
| 1 Sequenz-Kohärenz | PASS | Keine Vorwärtsreferenz-Verletzungen. Fachbegriffe werden vor Verwendung eingeführt: k2-2 (mat-2-1) → k2-3/k2-4 (mat-2-2) → k2-5 (mat-2-4) → k2-6 (mat-2-6). |
| 2 Fachbegriff-Konsistenz | PASS | »Blut und Eisen«, »kleindeutsche Lösung«, »Kaiserproklamation« — identische Verwendung in allen Materialien. |
| 3 Überleitung-Kohärenz | PASS | GERUEST-Intentionen treffen auf tatsächliche Materialinhalte zu. Alle 5 Übergänge inhaltlich konsistent. |
| 4 TB-Knoten-Gesamtabdeckung | PASS | 6/6 Knoten abgedeckt: k2-1 (mat-2-1), k2-2 (mat-2-1), k2-3 (mat-2-2, mat-2-3), k2-4 (mat-2-2), k2-5 (mat-2-4, mat-2-5), k2-6 (mat-2-6). |
| 5 Perspektiven-Diversität | SKIP | Kein `konflikttyp`-Feld im MATERIAL_GERUEST. (De facto 3 Perspektiven: P1 Bismarck/Machtelite, P2 Soldat/Demokrat, P3 Außenperspektive.) |

### Achse 6: Überleitung-Produktion

| Übergang | UE-1 | UE-2 | UE-3 | UE-4 | UE-5 | Ergebnis |
|---|---|---|---|---|---|---|
| mat-2-1→2-2 | ✓ | ✓ | ✓ | ✓ | ✓ | PASS |
| mat-2-2→2-3 | ✓ | ✓ | ✓ | ✓ | ✓ | PASS |
| mat-2-3→2-4 | ✓ | ✓ | ✓ | ✓ | ✓ | PASS |
| mat-2-4→2-5 | ✓ | ✓ | ✓ | ✓ | ✓ | PASS |
| mat-2-5→2-6 | ✓ | ✓ | ✓ | ✓ | ✓ | PASS |

Output: `ueberleitungen.json` geschrieben.

### Achse 7: Hefteintrag-Revision

**SCPL-Text-Patches:** Keine. Alle FORMULIERUNGS-OFFEN-Felder sind nach Phase 2.0 Korrektur bereits material-kongruent.

**Deferred-Marker-Resolution (Q-M2-FINALIZE):**
- `sicherung.zusammenfassung`: `[REVISION IN 2.1c]` → finalisierter Text (131 Zeichen). ✓
- `sicherung.ueberleitung`: `[REVISION IN 2.1c]` → finalisierter Text (144 Zeichen). ✓

**Q-M2-09 Disjunktionsprüfung:** reflexionsimpuls (normativ/kontrafaktisch) ≠ scpl.loesung[] (deskriptiv). PASS.

### Exit-Kriterien (v3.10.1)

- [x] `ueberleitungen.json` existiert und ist valide
- [x] `rahmen/sicherung.json` enthält finalisierte zusammenfassung und ueberleitung (kein Deferred-Marker)
- [x] Keine SCPL-Text-Patches nötig; STRUKTUR-FREEZE-Felder unverändert
- [x] Q-GATE-LOG Phase 2.1c Block vollständig (7 Achsen)
- [x] Gesamturteil: PASS

---

## Phase 2.2a (Progressionsplan)

**Datum:** 2026-04-12
**Gesamturteil:** PASS

| # | Kriterium | Ergebnis | Detail |
|---|---|---|---|
| 1 | Aufgabenzahl | PASS | 5 (Abweichung von Formel 7 begr\u00fcndet: bin\u00e4re Kontraststruktur, 3 nat\u00fcrliche Knotenpaare, EISEN = 5 Buchstaben) |
| 2 | Bloom-Verteilung A19 | PASS | L1-L2: 20% (max 40% \u2713), L3-L4: 60% (min 30% \u2713), L5-L6: 20% (min 20% \u2713) |
| 3 | Typvielfalt | PASS | 5 verschiedene Typen (min. 3 \u2713, kein Typ >3x \u2713) |
| 4 | TB-Knoten-Abdeckung | PASS | 6/6 Knoten abgedeckt |
| 5 | Material-Aktivierung | PASS | 6/6 Materialien als Prim\u00e4rquelle aktiviert |
| 6 | SCPL-Zonen | PASS | 4/4 Zonen abgedeckt (S/C1, C2, P, L) |
| 7 | AFB-Progression | PASS | I \u2192 I-II \u2192 II \u2192 II \u2192 III \u2014 monoton steigend |
| 8 | Sachbezogen \u2192 Wertbezogen A12 | PASS | Pos 1-3 sachbezogen \u2192 Pos 4 analytisch \u2192 Pos 5 wertbezogen |

---

## Phase 2.2b (Aufgaben-Produktion)

**Datum:** 2026-04-12
**Aufgaben:** 5 (aufgabe-2-1 bis aufgabe-2-5)
**Gesamturteil:** PASS

### aufgabe-2-1 (zuordnung, Pos 1, AFB I, L2)

| # | Kriterium | Ergebnis | Detail |
|---|---|---|---|
| A1 | AFB-Kongruenz | PASS | Zuordnung/AFB I: Kategorisierung bekannter Merkmale |
| A2 | Fragestamm-Klarheit | PASS | 10 Worte, 1 Satz, keine Suggestivformulierung |
| A3 | Material-Kongruenz | PASS | Alle 5 Elemente aus mat-2-1 ableitbar |
| A6 | Tipp-Progression | PASS | kognitiv \u2192 strukturierend \u2192 heuristisch |
| A19 | Bloom-Deklaration | PASS | L2 (Verstehen: Kategorisierung) |
| A22 | _meta.bloom_level | PASS | 2 |
| A25 | Feedback-Schema | PASS | 5 Eintr\u00e4ge (je 1 pro Element), typ: bestaetigung, ebene: wissen/verstaendnis |
| MQ3 | Material-Ref in frage | PASS | Keine [[...]] oder (M...) in frage |

### aufgabe-2-2 (reihenfolge, Pos 2, AFB I-II, L2)

| # | Kriterium | Ergebnis | Detail |
|---|---|---|---|
| A1 | AFB-Kongruenz | PASS | Reihenfolge/AFB I-II: Chronologie + Kausalverkettung |
| A2 | Fragestamm-Klarheit | PASS | 9 Worte, 1 Satz |
| A3 | Material-Kongruenz | PASS | Alle 5 Elemente aus mat-2-2 ableitbar |
| A6 | Tipp-Progression | PASS | kognitiv \u2192 strukturierend \u2192 heuristisch |
| A19 | Bloom-Deklaration | PASS | L2 (Verstehen: chronologische Rekonstruktion) |
| A22 | _meta.bloom_level | PASS | 2 |
| A25 | Feedback-Schema | PASS | 5 Eintr\u00e4ge (je 1 pro Element), typ: bestaetigung, ebene: wissen/verstaendnis |
| MQ3 | Material-Ref in frage | PASS | Keine [[...]] oder (M...) in frage |

### aufgabe-2-3 (multiple-choice, Pos 3, AFB II, L3)

| # | Kriterium | Ergebnis | Detail |
|---|---|---|---|
| A1 | AFB-Kongruenz | PASS | MC/AFB II: Transfer-Verst\u00e4ndnis (Ableitung aus Perspektive) |
| A2 | Fragestamm-Klarheit | PASS | 12 Worte, 1 Satz |
| A3 | Material-Kongruenz | PASS | Korrekte Antwort + Distraktoren aus mat-2-3 ableitbar/widerlegbar |
| A5 | Distraktor-Qualit\u00e4t | PASS | 3 Distraktoren: Rang 1 (Sprache \u2014 durch Text widerlegt), Rang 2 (Frankreich verloren), Rang 3 (K\u00f6nig befohlen) |
| A6 | Tipp-Progression | PASS | kognitiv \u2192 strukturierend \u2192 heuristisch |
| A19 | Bloom-Deklaration | PASS | L3 (Anwenden: Transfer aus Tagebuchtext) |
| A22 | _meta.bloom_level | PASS | 3 |
| A25 | Feedback-Schema | PASS | 4 Eintr\u00e4ge (1 pro Option), typ: bestaetigung/korrektur, ebene: verstaendnis |
| MQ3 | Material-Ref in frage | PASS | Keine [[...]] oder (M...) in frage |

### aufgabe-2-4 (vergleich, Pos 4, AFB II, L4)

| # | Kriterium | Ergebnis | Detail |
|---|---|---|---|
| A1 | AFB-Kongruenz | PASS | Vergleich/AFB II: Dimensionen-Analyse zweier Bildquellen |
| A2 | Fragestamm-Klarheit | PASS | 9 Worte, 1 Satz |
| A3 | Material-Kongruenz | PASS | Alle Zellen aus mat-2-4 + mat-2-5 ableitbar |
| A6 | Tipp-Progression | PASS | kognitiv \u2192 strukturierend \u2192 heuristisch |
| A19 | Bloom-Deklaration | PASS | L4 (Analysieren: Zerlegung entlang Dimensionen) |
| A21 | Anti-Leak | PASS | Tipp 3 benennt Analysestruktur, enth\u00e4lt nicht die Zelleninhalte |
| A22 | _meta.bloom_level | PASS | 4 |
| A25 | Feedback-Schema | PASS | 3 Eintr\u00e4ge: bestaetigung + korrektur + verkn\u00fcpfung, ebene: anwendung |
| A26 | akzeptierte_varianten | PASS | 4 Varianten-Sets f\u00fcr Synonym-Toleranz |
| MQ3 | Material-Ref in frage | PASS | Keine [[...]] oder (M...) in frage |

### aufgabe-2-5 (freitext-code, Pos 5, AFB III, L5)

| # | Kriterium | Ergebnis | Detail |
|---|---|---|---|
| A1 | AFB-Kongruenz | PASS | Freitext/AFB III: Stellungnahme mit Begr\u00fcndung gefordert |
| A2 | Fragestamm-Klarheit | PASS | 11 Worte, 1 Satz, problemorientiert, nicht suggestiv |
| A2b | Inhaltliche Verankerung | PASS | Konkretes Element: \u201eReichsgr\u00fcndung 1871\u201c + \u201e1848\u201c |
| A3 | Material-Kongruenz | PASS | Leitfrage aus mat-2-6 (+ mat-2-1 Kontext) beantwortbar. Begriffe \u201eEinheit\u201c, \u201eVerfassung\u201c im Material |
| A6 | Tipp-Progression | PASS | kognitiv \u2192 strukturierend \u2192 heuristisch (Musterantwort + Bewertungsmassstab) |
| A7 | Operator-Pr\u00e4zision | PASS | \u201eBeurteile\u201c = AFB-III-Operator |
| A11-FT | Freitext-Qualit\u00e4t | PASS | Problemorientiert (Dilemma: Einheit vs. Freiheit), 3 Teilfragen (Fakten \u2192 Zusammenhang \u2192 Stellungnahme), 4 erwartete Begriffe, 2 Perspektiven er\u00f6ffnet |
| A19 | Bloom-Deklaration | PASS | L5 (Evaluieren: Bewertung mit Begr\u00fcndung) |
| A22 | _meta.bloom_level | PASS | 5 |
| A25 | Feedback-Schema | PASS | 3 Eintr\u00e4ge: bestaetigung + korrektur + verkn\u00fcpfung, ebene: analyse |
| MQ3 | Material-Ref in frage | PASS | Keine [[...]] oder (M...) in frage |

### Gesamt-Pr\u00fcfung Phase 2.2b

| # | Kriterium | Ergebnis | Detail |
|---|---|---|---|
| G1 | JSON-Validierung | PASS | Alle 5 Dateien python3 json.load() fehlerfrei |
| G2 | Position-Sequenz | PASS | 1, 2, 3, 4, 5 \u2014 l\u00fcckenlos |
| G3 | ID-Konsistenz | PASS | aufgabe-2-1 bis aufgabe-2-5, Schema \u201eaufgabe-{mappe}-{pos}\u201c |
| G4 | Typ-Engine-Werte | PASS | zuordnung, reihenfolge, multiple-choice, vergleich, freitext-code |
| G5 | Punkte-Summe | PASS | 5 \u00d7 10 = 50 |
| G6 | Bloom-Verteilung IST | PASS | L2(40%), L3(20%), L4(20%), L5(20%) \u2014 A19 erf\u00fcllt |
| G7 | AFB-Monotonie | PASS | I \u2192 I-II \u2192 II \u2192 II \u2192 III |
| G8 | TB-Abdeckung | PASS | 6/6 Knoten: k2-1(A1), k2-2(A1), k2-3(A2,A3), k2-4(A2), k2-5(A4), k2-6(A5) |

---

## Phase 2.2c (Cross-Konsistenz)

**Datum:** 2026-04-12
**Gesamturteil:** PASS
**Re-Dispatches:** 0

| # | Kriterium | Klasse | Ergebnis | Detail |
|---|---|---|---|---|
| A1 | AFB-Kongruenz (Gesamtbild) | KONSISTENZ | PASS | AFB-Sequenz I → I-II → II → II → III stimmt mit Progressionsplan überein |
| A3 | Material-Kongruenz (Vollständigkeit) | KONSISTENZ | PASS | 6/6 Materialien in mind. 1 Aufgabe referenziert: mat-2-1(A1,A5), mat-2-2(A2), mat-2-3(A3), mat-2-4(A4), mat-2-5(A4), mat-2-6(A5) |
| A5 | Schwierigkeits-Progression | DIDAKTIK | PASS | Bloom [2,2,3,4,5] monoton steigend. Erste AFB I, letzte AFB III |
| A8 | Kognitive Aktivierung | DIDAKTIK | PASS | 2 denkanregende Aufgaben (L4+): aufgabe-2-4 (Vergleich, L4), aufgabe-2-5 (Freitext, L5) |
| A9 | TB-Bezug | KONSISTENZ | PASS | 6/6 Knoten abgedeckt: k2-1(A1), k2-2(A1), k2-3(A2,A3), k2-4(A2), k2-5(A4), k2-6(A5) |
| A10 | Inhaltsgesteuerte Typauswahl | DIDAKTIK | PASS | 5 Typen (zuordnung, reihenfolge, multiple-choice, vergleich, freitext-code). Kein Typ >1x. Min. 3 ✓ |
| A12 | Sachbezogen-vor-Wertbezogen | DIDAKTIK | PASS | Pos 1-3 (S/C1, C2: sachbezogen) → Pos 4 (P: analytisch) → Pos 5 (L: wertbezogen) |
| A16 | Fragebogen-Kohärenz | KONSISTENZ | PASS | Aufgabensequenz bildet SCPL-Erarbeitungsweg ab: S/C1(Kontrast) → C2(Kriege+Perspektive) → P(Bildanalyse) → L(Beurteilung) |
| A17 | SCPL-Zonen-Abdeckung | KONSISTENZ | PASS | 4/4 Zonen: S/C1(A1), C2(A2,A3), P(A4), L(A5) |
| A18 | Material-Aktivierung | KONSISTENZ | PASS | 6/6 als Primärquelle: mat-2-1(A1,A5), mat-2-2(A2), mat-2-3(A3), mat-2-4(A4), mat-2-5(A4), mat-2-6(A5) |

**KANN-Kriterien (informativ):**
- A13 Gegenwartsbezug: aufgabe-2-5 implizit (Einheit ohne Freiheit → Demokratie-Reflexion)
- A14 Fehler-Antizipation: MC-Distraktoren (A3), Korrektur-Feedback in A4/A5
- A15 Implizite Differenzierung: Freitext-Teilfragen als optionales Gerüst, Vergleichs-Dimensionen als Strukturhilfe
