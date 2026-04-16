# Q-Gate-Log: Mappe 1 — Phase 2.0 (Rahmen-Produktion)

**Phase:** 2.0
**Datum:** 2026-04-09
**Vertrag:** VERTRAG_PHASE_2-0_RAHMEN.md
**Katalog:** Q-GATE-MECHANIK.md §7.3

## Einzelbewertung

| # | ID | Kriterium | Ergebnis | Detail |
|---|---|---|---|---|
| 1 | SCHEMA-03 | Schema-Validierung | PASS | Alle 3 Rahmen-Schemata validiert (JSON-Parsing + Pflichtfelder). |
| 2 | C1b | Stundenfrage-Identitaet | PASS | einstieg.problemstellung === hefteintrag.stundenfrage === "Wer überlebt im Schützengraben?" |
| 3 | M3b | Kernerkenntnisse-Identitaet | PASS | scpl.loesung[] identisch mit TAFELBILD-Kernerkenntnisse (3/3 Match). |
| 4 | Q-M2-09 | Disjunktionsregel | PASS | reflexionsimpuls (Metakognition: "Was hat sich an deinem Bild verändert?") disjunkt von loesung[] (Fakten). |
| 5 | Q-M2-08 | Quellenangabe-Hygiene | PASS | Keine internen Artefakt-Namen in SuS-sichtbaren Texten. |
| 6 | V-RAHMEN | Vollstaendigkeit | PASS | Alle Pflichtfelder vorhanden. zusammenfassung/ueberleitung korrekt als "[REVISION IN 2.1c]". |
| 7 | TYP-01-R | Typographische Korrektheit | PASS | UTF-8 Umlaute, Gedankenstriche (—), keine ASCII-Ersatzzeichen. |
| 8 | REG-01 | Sprachregister R7 | PASS | Keine didaktischen Metakommentare in SuS-sichtbaren Rahmentexten. |

## Pre-Checks (HE14-HE16)

| ID | Kriterium | Ergebnis | Detail |
|---|---|---|---|
| HE14 | Schaubild-Charakter | PASS | 7 Knoten + 7 Verbindungen. Kurzphrasen-Stil, kein Fließtext. |
| HE15 | Ordnungsmuster-Treue | PASS | parallel-kausal. Mehrere Ursachen (k1-1, k1-3, k1-6) konvergieren auf gemeinsame Wirkung (k1-7). |
| HE16 | Merksatz-Kalibrierung | WARN | 4/4 Eintraege nach Korrektur (k1-2 merksatz nachgetragen, BEFUND M1). Urspruenglich 3/4. |

## Text-Dichte (Vertrag 1b)

| Feld | Wörter | Max | Ergebnis |
|---|---|---|---|
| kontextsatz | 15 | 15 | PASS |
| C1 schritt | 11 | 15 | PASS |
| C2 schritt | 13 | 15 | PASS |
| C3 schritt | 11 | 15 | PASS |
| problem satz | 10 | 15 | PASS |
| L1 | 10 | 20 | PASS |
| L2 | 9 | 20 | PASS |
| L3 | 14 | 20 | PASS |

## Gesamt

**PASS** (8/8 Kriterien PASS, 2/3 Pre-Checks PASS + 1 WARN (HE16), Text-Dichte konform). Korrektur nach PM-Evaluation BEFUND_PHASE_2-0_RAHMEN_M1.md.

## Produzierte Dateien

- mappe-1/rahmen/hefteintrag.json
- mappe-1/rahmen/einstieg.json
- mappe-1/rahmen/sicherung.json
- mappe-1/rahmen/mappenabschluss_zone.json
- mappe-1/rahmen/meta.json

---

# Q-Gate-Log: Mappe 1 — Phase 2.1 (Material-Produktion)

**Phase:** 2.1
**Datum:** 2026-04-09
**Vertrag:** VERTRAG_PHASE_2-1_MATERIAL.md
**Katalog:** Q-GATE-MECHANIK.md §7.4

## Dispatch-Übersicht

| # | Material | Typ | SCPL-Zone | W-Count | Schema | SQ-Gate | Typ-Gate | Gesamt |
|---|---|---|---|---|---|---|---|---|
| 1 | mat-1-1 | bildquelle | S | ~40W (BU) | PASS | PASS (5/5) | PASS (MQ2,Q1-Q10) | PASS |
| 2 | mat-1-2 | tagebuch | C1 | 117W | PASS | PASS (5/5) | PASS (MQ2,Q1-Q12) | PASS |
| 3 | mat-1-3 | darstellungstext | C2 | 101W | PASS | PASS (5/5) | PASS (MQ2,Q1-Q10) | PASS |
| 4 | mat-1-4 | quellentext | C3 | 93W | PASS | PASS (5/5) | PASS (MQ2,Q1-Q10) | PASS |
| 5 | mat-1-5 | tagebuch | P | 110W | PASS | PASS (5/5) | PASS (MQ2,Q1-Q12) | PASS |

## Sequenz-Kohärenz (SQ-1 bis SQ-5, alle Materialien)

| Prüfpunkt | mat-1-1 | mat-1-2 | mat-1-3 | mat-1-4 | mat-1-5 |
|---|---|---|---|---|---|
| SQ-1 Nur erarbeitetes Wissen | PASS | PASS | PASS | PASS | PASS |
| SQ-2 Keine verbotenen Begriffe | PASS | PASS | PASS | PASS | PASS |
| SQ-3 TB-Knoten erarbeitbar | k1-1 | k1-1,k1-2 | k1-3 | k1-4,k1-5,k1-6 | k1-7 |
| SQ-4 Narrativer Anschluss | — (erstes) | PASS | PASS | PASS | PASS |
| SQ-5 material_charakter | PASS | PASS | PASS | PASS | PASS |

## Fachbegriff-Progression

| Position | Material | eingeführt | referenziert |
|---|---|---|---|
| 1 | mat-1-1 | — | — |
| 2 | mat-1-2 | Stellungskrieg, Schützengraben | — |
| 3 | mat-1-3 | Giftgas | Stellungskrieg |
| 4 | mat-1-4 | Ausblutungsschlacht | Stellungskrieg |
| 5 | mat-1-5 | Materialschlacht | Stellungskrieg, Schützengraben, Ausblutungsschlacht |

## Perspektiven-Abdeckung (Konflikttyp=true)

| Perspektive | mat-1-1 | mat-1-2 | mat-1-3 | mat-1-4 | mat-1-5 | Abdeckung |
|---|---|---|---|---|---|---|
| P1: Deutsche Soldaten | | X | | | X | 2/5 |
| P2: Brit./Franz. Soldaten | X (BU) | | X (übergreifend) | X (brit. Soldat) | | 3/5 |
| P3: Militärführung | | | | X (Falkenhayn) | | 1/5 |

**3/3 Perspektiven abgedeckt.** PASS.

## Dispatch-Constraints

| Constraint | Material | Prio | Ergebnis | Detail |
|---|---|---|---|---|
| gewalt_altersfilter | mat-1-3 | HIGH | PASS | Wirkung benannt, keine explizite Leidensdarstellung. |
| M1-A2 Kausalfrage | mat-1-3 | HIGH | PASS | Kausalkette: festgefahren → Ausweg → Gift. Explizit in P1+P3. |
| UE-001 rekonstruiert | mat-1-4 | HIGH | PASS | _meta.aufbereitung=rekonstruiert. Fußnote enthält Kennzeichnung. |

## Text-Dichte

| Material | Wörter | Max | Ergebnis |
|---|---|---|---|
| mat-1-1 (BU) | ~40W | — | PASS |
| mat-1-2 | 117 | 120 | PASS |
| mat-1-3 | 101 | 150 | PASS |
| mat-1-4 | 93 | 100 | PASS |
| mat-1-5 | 110 | 120 | PASS |
| **Gesamt** | **~461** | **~500** | **PASS** |

## Gesamt

**PASS** (5/5 Dispatches PASS, Sequenz-Kohärenz PASS, Perspektiven PASS, Dispatch-Constraints PASS, Text-Dichte konform).

## Produzierte Dateien

- mappe-1/materialien/mat-1-1.json
- mappe-1/materialien/mat-1-2.json
- mappe-1/materialien/mat-1-3.json
- mappe-1/materialien/mat-1-4.json
- mappe-1/materialien/mat-1-5.json

---

# Q-Gate-Log: Mappe 1 — Phase 2.1c (Cross-Konsistenz)

**Phase:** 2.1c
**Datum:** 2026-04-09

## User-Revisionen (v3.6 Erzählerstimme-Rahmen)

Der User hat mat-1-2 und mat-1-5 restrukturiert. Systemisches Wissen (Stellungskrieg 700 km, Materialschlacht-Definition) wurde aus der Figur-Stimme in einen kursiven Erzählerstimme-Rahmen verschoben. mat-1-4 erhielt [sinngemäß]-Marker vor rekonstruierten Zitaten. mat-1-1 BU wurde sachlicher formuliert.

**Pattern (für alle Folge-Mappen):** Fachbegriffe und analytisches Wissen, das die Figur nicht realistisch besitzen kann, in `<em>`-Erzählerstimme-Rahmen setzen. Figurentext bleibt perspektivisch begrenzt. _meta dokumentiert wortanzahl_figur / wortanzahl_erzaehlerstimme getrennt.

## Cross-Konsistenz

| Prüfpunkt | Ergebnis | Detail |
|---|---|---|
| Fachbegriff-Progression | PASS | Stellungskrieg(mat-1-2) → Schützengraben(mat-1-2) → Giftgas(mat-1-3) → Ausblutungsschlacht(mat-1-4) → Materialschlacht(mat-1-5). Lückenlos, keine Vorgriffe. |
| TB-Knoten-Abdeckung | PASS | k1-1(mat-1-1/1-2), k1-2(mat-1-2), k1-3(mat-1-3), k1-4(mat-1-4), k1-5(mat-1-4), k1-6(mat-1-4), k1-7(mat-1-5). 7/7 abgedeckt. |
| SCPL-Zone-Abdeckung | PASS | S(1-1), C1(1-2), C2(1-3), C3(1-4), P(1-5). 5/5 DIRECT. |
| Loesung[]-Erarbeitbarkeit | PASS | L1 aus mat-1-1+1-2, L2 aus mat-1-3, L3 aus mat-1-4. Alle drei Kernerkenntnisse aus Materialien ableitbar. |
| Perspektiven 3/3 | PASS | P1(mat-1-2,1-5), P2(mat-1-1,1-3,1-4), P3(mat-1-4). |
| Zusammenfassung | PASS | Alle 5 Fachbegriffe + Hoffnungslosigkeit als Zielpunkt. |
| Ueberleitung → Mappe 2 | PASS | Brücke Heimatfront (Frauen, Fabriken, Hunger). |
| Wortbudget | PASS | ~461W (nach User-Revision ~480W mit Erzählerstimme). Budget 500W. |

## Gesamt

**PASS** — Phase 2.1c Cross-Konsistenz bestanden. Mappe 1 Material-Produktion abgeschlossen.

## Aktualisierte Dateien

- mappe-1/rahmen/sicherung.json (zusammenfassung + ueberleitung befüllt)

---

# Q-Gate-Log: Mappe 1 — Phase 2.2a (Progressionsplan)

**Phase:** 2.2a
**Datum:** 2026-04-09
**Vertrag:** VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md
**Katalog:** Q-GATE-MECHANIK.md §7.5

## Aufgabenzahl-Formel

```
basis(5) + knoten_faktor(1, 7 Knoten > 5) + material_faktor(1, 5 Materialien > 4) = 7
```

## Bloom-Verteilung (A19)

| Zone | Aufgaben | Anteil | Policy | Ergebnis |
|---|---|---|---|---|
| L1–L2 | Pos 1, 2 | 29 % | max 40 % | PASS |
| L3–L4 | Pos 3, 4, 5 | 43 % | min 30 % | PASS |
| L5–L6 | Pos 6, 7 | 29 % | min 20 % | PASS |

## Typvielfalt

6 Typen bei 7 Aufgaben: mc (×2), lueckentext, reihenfolge, zuordnung, begruendung, freitext.
MC-Duplikat begründet: Pos 1 = AFB I (Fakten-Wiedererkennung), Pos 5 = AFB II (Transfer). PASS.

## SCPL-Zonen-Abdeckung

| Zone | Pos | Ergebnis |
|---|---|---|
| S | 1 | PASS |
| C1 | 2 | PASS |
| C2 | 3 | PASS |
| C3 | 4 | PASS |
| P | 5 | PASS |
| L | 6, 7 | PASS |

Alle 5 SCPL-Zonen + L abgedeckt. PASS.

## TB-Knoten-Abdeckung

| Knoten | Pos | Ergebnis |
|---|---|---|
| k1-1 | 1, 2 | PASS |
| k1-2 | 2 | PASS |
| k1-3 | 3, 6 | PASS |
| k1-4 | 4 | PASS |
| k1-5 | 4 | PASS |
| k1-6 | 4, 6 | PASS |
| k1-7 | 5 | PASS |

7/7 Knoten mindestens 1× adressiert. PASS.

## Einzelprüfung Konstruktionskontexte

| Pos | Typ | AFB | Erarbeitbarkeit | Fragestamm ≤12W | Display-Ref | Ergebnis |
|---|---|---|---|---|---|---|
| 1 | mc | I | PASS (BU enthält Stellungskrieg) | PASS (8W) | PASS | PASS |
| 2 | lueckentext | I | PASS (TB + Erzählerstimme) | PASS (5W) | PASS | PASS |
| 3 | reihenfolge | II | PASS (kausale Abfolge in DT) | PASS (8W) | PASS | PASS |
| 4 | zuordnung | II | PASS (Dual-Voice in QT) | PASS (9W) | PASS | PASS |
| 5 | mc | II | PASS (Stimmungswandel in TB) | PASS (10W) | PASS | PASS |
| 6 | begruendung | III | PASS (Streitfrage + 2 Evidenz-Quellen) | PASS (11W) | PASS | PASS |
| 7 | freitext | III | PASS (alle Knoten erarbeitet) | PASS (11W) | PASS | PASS |

## Anti-Quota-Check

- begruendung (Pos 6): Echte Streitfrage (Generäle vs. Waffen), 2 vertretbare Positionen, belegfähig aus mat-1-3 + mat-1-4. Kein Pseudo-CER. PASS.
- quellenkritik: Nicht eingesetzt. mat-1-4 ist rekonstruiert (kein Primärquellentext) → Anti-Automatismus greift. Korrekte Entscheidung.

## Gesamt

**PASS** (Bloom A19 PASS, Typvielfalt PASS, SCPL PASS, TB-Knoten 7/7 PASS, 7/7 Konstruktionskontexte PASS, Anti-Quota PASS).

## Produzierte Dateien

- mappe-1/PROGRESSIONSPLAN.md

---

# Q-Gate-Log: Mappe 1 — Phase 2.2b (Aufgaben-Produktion)

**Phase:** 2.2b
**Datum:** 2026-04-09
**Vertrag:** VERTRAG_PHASE_2-2b_AUFGABE.md
**Katalog:** Q-GATE-MECHANIK.md §7.2

## Dispatch-Uebersicht

| Pos | ID | Typ | AFB | Bloom | Ziel-Mat | Q-Gate |
|---|---|---|---|---|---|---|
| 1 | aufgabe-1-1 | multiple-choice | I | L1 | mat-1-1 | PASS |
| 2 | aufgabe-1-2 | lueckentext | I | L2 | mat-1-2 | PASS |
| 3 | aufgabe-1-3 | reihenfolge | II | L3 | mat-1-3 | PASS |
| 4 | aufgabe-1-4 | zuordnung | II | L3 | mat-1-4 | PASS |
| 5 | aufgabe-1-5 | multiple-choice | II | L3 | mat-1-5 | PASS |
| 6 | aufgabe-1-6 | begruendung | III | L5 | mat-1-3+1-4 | PASS |
| 7 | aufgabe-1-7 | freitext-code | III | L6 | alle | PASS |

## Bloom-Verteilung (Ist vs. Ziel)

| Zone | Ziel (2.2a) | Ist (2.2b) | Ergebnis |
|---|---|---|---|
| L1-L2 | 2 (29%) | 2 (29%) | PASS |
| L3-L4 | 3 (43%) | 3 (43%, alle L3) | PASS |
| L5-L6 | 2 (29%) | 2 (29%) | PASS |

**A19 Policy:** max 40% L1-L2 PASS, min 30% L3-L4 PASS, min 20% L5-L6 PASS.

## Typvielfalt

6 Typen bei 7 Aufgaben: mc(x2), lueckentext, reihenfolge, zuordnung, begruendung, freitext-code. MC-Duplikat begruendet (Pos 1 AFB I Fakten, Pos 5 AFB II Transfer). PASS.

## Einzelpruefungen (Kurzform)

**Pos 1 (mc, L1):** A1 PASS, A2 PASS (8W), A2b PASS, A3 PASS, A4-MC PASS (3/3 R1-3), A6 PASS, A24 PASS, A25 PASS, A26 PASS, MQ3 PASS.
**Pos 2 (lueckentext, L2):** A1 PASS, A2 PASS (5W), A3 PASS, A4-LT PASS (3 Luecken eindeutig), A6 PASS, A24 PASS, A25 PASS, A26 PASS, MQ3 PASS. Antwortpool 4 Items (3+1 Distraktor Bewegungskrieg).
**Pos 3 (reihenfolge, L3):** A1 PASS, A2 PASS (11W), A2b PASS, A3 PASS, A4-RF PASS (5 Elemente paarweise eindeutig), A6 PASS, A24 PASS, A25 PASS, A26 PASS, MQ3 PASS.
**Pos 4 (zuordnung, L3):** A1 PASS, A2 PASS (9W), A2b PASS, A3 PASS, A4-ZU PASS (Strategie vs. Erleben disjunkt), A6 PASS, A24 PASS, A25 PASS, A26 PASS, MQ3 PASS. 5 Elemente, 3:2 Verteilung.
**Pos 5 (mc, L3):** A1 PASS, A2 PASS (10W), A2b PASS, A3 PASS, A4-MC PASS (3/3 R1-3), A6 PASS, A24 PASS, A25 PASS, A26 PASS, MQ3 PASS. Transfer: Fakten → emotionale Wirkung.
**Pos 6 (begruendung, L5):** A1 PASS, A2 PASS (10W), A3 PASS, A23 PASS (CER komplett, 3 akzeptierte Claims), A24 PASS, A25 PASS, A26 PASS, MQ3 PASS. Anti-Leak Tipp 3 PASS.
**Pos 7 (freitext-code, L6):** A1 PASS, A2 PASS (9W), A2b PASS, A3 PASS, A6 PASS, A7 PASS, A11-FT PASS (3 Teilfragen, 5 erw. Begriffe, 2 loesung-Keywords), A24 PASS, A25 PASS, A26 PASS, MQ3 PASS.

## JSON-Validierung

Alle 7 Dateien python3-validiert: OK. Encoding-Fix aufgabe-1-4.json (typographische Anfuehrungszeichen in JSON-String).

## Gesamt

**PASS** — Phase 2.2b Aufgaben-Produktion Mappe 1 abgeschlossen. 7/7 Aufgaben Q-Gate PASS.

## Produzierte Dateien

- mappe-1/aufgaben/aufgabe-1-1.json (mc, L1)
- mappe-1/aufgaben/aufgabe-1-2.json (lueckentext, L2)
- mappe-1/aufgaben/aufgabe-1-3.json (reihenfolge, L3)
- mappe-1/aufgaben/aufgabe-1-4.json (zuordnung, L3)
- mappe-1/aufgaben/aufgabe-1-5.json (mc, L3)
- mappe-1/aufgaben/aufgabe-1-6.json (begruendung, L5)
- mappe-1/aufgaben/aufgabe-1-7.json (freitext-code, L6)

---

# Q-Gate-Log: Mappe 1 — Phase 2.2c (Aufgaben-Cross-Konsistenz)

**Phase:** 2.2c
**Datum:** 2026-04-09
**Vertrag:** VERTRAG_PHASE_2-2c_CROSS.md
**Katalog:** Q-GATE-MECHANIK.md §7.6

## Cross-Konsistenz-Pruefung

| # | Kriterium | Ergebnis | Detail |
|---|---|---|---|
| A1 | AFB-Kongruenz | PASS | Progressionsplan (I,I,II,II,II,III,III) = Aufgaben-JSONs. Identisch. |
| A3 | Material-Kongruenz | PASS | mat-1-1 bis mat-1-5 je mind. 1x als Primaerquelle referenziert. |
| A5 | Schwierigkeits-Progression | PASS | L1→L2→L3→L3→L3→L5→L6. Monoton steigend (Plateau L3). Erste AFB I, letzte AFB III. |
| A8 | Kognitive Aktivierung | PASS | Pos 6 (CER-Streitfrage), Pos 7 (Synthese-Stellungnahme), Pos 3 (Ursache-Wirkung-Kette). |
| A9 | TB-Bezug | PASS | k1-1(Pos 1,2), k1-2(Pos 2), k1-3(Pos 3,6), k1-4(Pos 4), k1-5(Pos 4), k1-6(Pos 4,6), k1-7(Pos 5). 7/7 Knoten. |
| A10 | Inhaltsgesteuerte Typauswahl | PASS | 6 Typen bei 7 Aufgaben. MC 2x begruendet (AFB I vs. AFB II). Kein Typ >3x. |
| A12 | Sachbezogen-vor-Wertbezogen | PASS | S→C1→C2→C3 (sachbezogen) → P→L→L (wertbezogen). |
| A16 | Fragebogen-Kohaerenz | PASS | SCPL-Erarbeitungsweg: Erkennen→Einsetzen→Ordnen→Zuordnen→Deuten→Beurteilen→Synthese. |
| A17 | SCPL-Zonen-Abdeckung | PASS | S(1), C1(2), C2(3), C3(4), P(5), L(6,7). Alle Zonen diagnostisch abgedeckt. |
| A18 | Material-Aktivierung | PASS | Alle 5 Materialien als Primaerquelle (material_referenz), keines nur als Tipp-Verweis. |

## Gesamt

**PASS** — 10/10 Kriterien PASS. Kein Re-Dispatch erforderlich. Phase 2.2c Cross-Konsistenz Mappe 1 abgeschlossen.

---

# Q-Gate-Log: Mappe 1 — Phase 3 (Assembly)

**Phase:** 3.0–3.4
**Datum:** 2026-04-09
**Vertrag:** VERTRAG_PHASE_3_ASSEMBLY.md

## Pre-Flight (3.0)

| # | Pruefung | Ergebnis | Detail |
|---|---|---|---|
| 3.0.2 | Inventar-Pruefung | PASS | 17 JSON-Dateien valide (5 Rahmen + 5 Materialien + 7 Aufgaben) |
| 3.0.3 | Bild-Asset | DOWNLOAD | mat-1-1 (bildquelle): img-1-1.jpg fehlte → Wikimedia-Download |
| 3.0.4 | Engine-Patch-Check | PASS | Zeile 2393: text_mit_luecken bereits gepatcht |
| 3.0.5 | data.json Zustand | OK | Game-Dir neu angelegt (erste Mappe, kein bestehendes Game) |

## Bild-Download (3.1)

| Material | Wikimedia-Datei | Lizenz | Groesse | Pfad |
|---|---|---|---|---|
| mat-1-1 | Cheshire_Regiment_trench_Somme_1916.jpg | Public Domain | 122.689 B | assets/img/verlauf-erster-weltkrieg-marne-ende/img-1-1.jpg |

## Validierung (3.3)

| # | Pruefung | Ergebnis | Detail |
|---|---|---|---|
| V1 | JSON valide | PASS | data.json ohne Exception geladen |
| V2 | Mappe-Anzahl | PASS | 1 Mappe (erwartet: 1) |
| V3 | Mappe-ID | PASS | mappe-1 |
| V4 | Freischalt-Code | PASS | GRABEN (stimmt mit PROGRESSIONSPLAN) |
| V5 | Material-IDs | PASS | mat-1-1 bis mat-1-5, unique |
| V6 | Aufgabe-IDs | PASS | aufgabe-1-1 bis aufgabe-1-7, unique |
| V7 | material_referenz-Integritaet | PASS | Alle Referenzen aufloesbar |
| V8 | Bild-Pfade | PASS | img-1-1.jpg existiert, 122.689 B > 10 KB |
| V9 | Tipps-Struktur | PASS | 7/7 Aufgaben mit Stufe 1/2/3 |
| V10 | Engine-Feld-Kompatibilitaet | PASS | Typ-spezifische Pflichtfelder vorhanden |
| V11 | Bestehende Mappen unveraendert | N/A | Erste Mappe |
| V12 | Einstieg-Konsistenz | PASS | problemstellung == stundenfrage |

## Gesamt

**PASS** — Phase 3 Assembly Mappe 1 abgeschlossen. V1-V10 + V12 PASS, V11 N/A.

## Produzierte Dateien

- escape-games/verlauf-erster-weltkrieg-marne-ende/data.json (45.239 B)
- escape-games/verlauf-erster-weltkrieg-marne-ende/index.html (Template)
- escape-games/verlauf-erster-weltkrieg-marne-ende/lehrkraft.html (Template)
- escape-games/verlauf-erster-weltkrieg-marne-ende/mappe-1.html (Template)
- assets/img/verlauf-erster-weltkrieg-marne-ende/img-1-1.jpg (Wikimedia-Download)
