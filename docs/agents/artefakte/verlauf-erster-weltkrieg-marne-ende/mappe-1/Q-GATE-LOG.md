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
