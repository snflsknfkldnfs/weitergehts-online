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
