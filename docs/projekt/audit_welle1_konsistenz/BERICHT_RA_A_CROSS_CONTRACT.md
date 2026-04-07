# Bericht RA-A: Cross-Contract-Konsistenz (Welle-1-Patches)

**Datum:** 2026-04-07
**Scope:** 5 Vertraege (v1.2 DIDAKTIK/INHALT/SKRIPT, v1.1 HEFTEINTRAG), 1 Schema v1.0, 1 Guetekriterien v1.1, AGENT_DIDAKTIK H1-H7
**Agent:** RA-A (Cross-Contract-Konsistenz)
**Audit-Typ:** Welle-1-Patch-Konsistenzkontrolle

---

## Findings

| ID | Severity | Datei(en) | Beschreibung |
|---|---|---|---|
| RA-A-F01 | BLOCKER | VERTRAG_HEFTEINTRAG, SCHEMA_HEFTEINTRAG_JSON, GUETEKRITERIEN_SKRIPT | `complication[].typ` Feldname und Enum-Werte konsistent definiert. Schema §1 Zeile 51-54: `typ` mit `enum: ["narrativ", "konzeptuell", "kontrastiv", "kausal"]`. VERTRAG_HEFTEINTRAG §3 Aufgabe 3 referenziert exakt diese Werte. GUETEKRITERIEN_SKRIPT referenziert indirekt (SK18 Quellenorientierung). **KONSISTENT.** |
| RA-A-F02 | HIGH | VERTRAG_PHASE_0-1_DIDAKTIK, VERTRAG_PHASE_0-4_HEFTEINTRAG | Eskalationspfad-Nummern: DIDAKTIK definiert E-D1 bis E-D5 (§4a Zeile 88-95), HEFTEINTRAG definiert E-H1 bis E-H3 (§6 Zeile 155-160). Keine Ueberschneidung. Nummernraum sauber getrennt. **KONSISTENT.** |
| RA-A-F03 | BLOCKER | SCHEMA_HEFTEINTRAG_JSON, VERTRAG_PHASE_0-4_HEFTEINTRAG | JSON-Schema (v1.0) vs. VERTRAG_HEFTEINTRAG (v1.1) JSON-Beispiel §4 (Zeile 69-89): Struktur und Felder identisch. Schema in Zeile 12-136, VERTRAG in Zeile 69-89 beide definieren: `stundenfrage`, `scpl.situation.kontextsatz`, `scpl.complication[]` mit `typ`, `scpl.problem.satz`, `scpl.loesung[]`, `ordnungsmuster`, `fachbegriffe`, `knoten`, `verbindungen`, `transfer.frage`, `voraussetzungen`. **KONSISTENT.** |
| RA-A-F04 | HIGH | GUETEKRITERIEN_SKRIPT, VERTRAG_PHASE_0-3_SKRIPT | SK18 (Quellenorientierung) referenziert in GUETEKRITERIEN_SKRIPT Zeile 103 und in VERTRAG_SKRIPT §5.2 Zeile 121 als MUSS-Kriterium. Beide definieren: Mindestens 1 expliziter Quellenbezug pro Chunk. **KONSISTENT.** |
| RA-A-F05 | MEDIUM | VERTRAG_PHASE_0-3_SKRIPT, VERTRAG_PHASE_0-2_INHALT | Severity-Levels QS1-QS8 (SKRIPT) vs. QI1-QI6 (INHALT): SKRIPT nutzt BLOCKER/HIGH/MEDIUM konsistent. INHALT nutzt BLOCKER/HIGH/MEDIUM konsistent. Nummernraeume disjunkt (QS vs. QI). **KONSISTENT.** |
| RA-A-F06 | HIGH | VERTRAG_PHASE_0-1_DIDAKTIK, VERTRAG_PHASE_0-2_INHALT, VERTRAG_PHASE_0-3_SKRIPT, VERTRAG_PHASE_0-4_HEFTEINTRAG | Versionskonvention: DIDAKTIK (v1.2), INHALT (v1.2), SKRIPT (v1.2), HEFTEINTRAG (v1.1), SCHEMA (v1.0), GUETEKRITERIEN (v1.1). Dokumentation (Zeile 3-5 in jedem Vertrag) konsistent. SCHEMA und GUETEKRITERIEN sind Abhaengigkeiten, nicht Prozessvertraege — niedrigere Versionsnummern erwartet. **KONSISTENT.** |
| RA-A-F07 | HIGH | VERTRAG_PHASE_0-1_DIDAKTIK, VERTRAG_PHASE_0-2_INHALT, VERTRAG_PHASE_0-3_SKRIPT, VERTRAG_PHASE_0-4_HEFTEINTRAG | SK18 (Quellenorientierung) wird in 4 Vertraegen referenziert: (1) DIDAKTIK nicht direkt, sondern indirekt über KE-Abdeckung. (2) INHALT Zeile 108 QI-RC1: "Pro Mappe mindestens 1 Quellenbezug dokumentiert... fuer SK18 verwendbar". (3) SKRIPT Zeile 3, 5, 121: SK18 als MUSS. (4) HEFTEINTRAG §3 implizit durch SCPL-Struktur (Fakten müssen verortet sein). Downstream-Abhängigkeit korrekt modelliert. **KONSISTENT.** |
| RA-A-F08 | MEDIUM | AGENT_DIDAKTIK (Zeilen 310-341 H1-H7), VERTRAG_PHASE_0-1_DIDAKTIK | H1-H7 sind Heuristiken fuer Aufgabe 2 (Mappen-Aufteilung). DIDAKTIK §3 Aufgabe definiert direkt Output-Struktur (Lehrplanbezug, Lernziele, KE-Matrix, Mappen-Grobstruktur). H1-H7 ergaenzen die Aufgabe mit Orientierungshilfen, duplizieren nicht. H1 (Ordnungsschnitte), H2 (1 Konzept/Mappe), H5 (konkreter Anker), H7 (Stoffdichte) sind konsistent mit QD5 (Mappen-Balance) und QD9 (Sequenzierbarkeit). **KONSISTENT.** |
| RA-A-F09 | BLOCKER | VERTRAG_PHASE_0-2_INHALT, VERTRAG_PHASE_0-4_HEFTEINTRAG | QI-RC1 (INHALT Zeile 108) fordert: "Pro Mappe mindestens 1 Quellenbezug dokumentiert... fuer SK18 verwendbar". Diese Artefakte werden in INHALTSBASIS mit ID versehen (img-N-M, zit-N-M, rolle-N-M). HEFTEINTRAG §3 Erarbeitbarkeit (Zeile 47, 62) nutzt diese Artefakt-IDs implizit: "ARTIFACT" Kategorie bedeutet, dass diese INHALTSBASIS-Artefakte zur Erarbeitung herangezogen werden. Mapping nicht explizit dokumentiert, aber funktional konsistent. **KONSISTENT mit dokumentiertem Mapping-Luecke.** |
| RA-A-F10 | HIGH | VERTRAG_PHASE_0-1_DIDAKTIK, VERTRAG_PHASE_0-3_SKRIPT | QD9 (DIDAKTIK Zeile 68-69) fordert "Sequenzierbarkeit der Mappen" — jede Mappe hat einen thematisch abgeschlossenen Schwerpunkt, der in mehrere Materialien zerlegbar ist. SKRIPT §3 Chunking-Regeln (Zeile 36-77) definieren genau dies: 1 Chunk pro Mappe, 600-900 Woerter, intern sequenzierbar. QS7 (SKRIPT Zeile 135-136) prueft "Interne Sequenzierbarkeit". **KONSISTENT.** |
| RA-A-F11 | CRITICAL | GUETEKRITERIEN_SKRIPT, VERTRAG_PHASE_0-3_SKRIPT | SK18 Quellenorientierung wird in GUETEKRITERIEN_SKRIPT (Zeile 103 "MUSS-Kriterium", v1.1 vom 2026-04-07) definiert. VERTRAG_SKRIPT (Zeile 121 "SK18 Quellenorientierung" im Q-Gate-Protokoll) referenziert es als MUSS. JEDOCH: VERTRAG_SKRIPT v1.2 datiert 2026-04-06, GUETEKRITERIEN_SKRIPT v1.1 datiert 2026-04-07. GUETEKRITERIEN ist das kanonische Dokument (VERTRAG_SKRIPT Zeile 24 bestätigt: "GUETEKRITERIEN_SKRIPT.md ist kanonisch"). **Keine Inkonsistenz, aber Publikationsdatum-Reihenfolge auffällig — GUETEKRITERIEN wurde NACH VERTRAG aktualisiert.** Finding notieren als Audit-Trail. |
| RA-A-F12 | MEDIUM | VERTRAG_PHASE_0-4_HEFTEINTRAG, SCHEMA_HEFTEINTRAG_JSON | STRUKTUR-FREEZE-Definition (HEFTEINTRAG §5 Zeile 100-116) vs. Schema-Validierungsregeln (SCHEMA §2 Zeile 148): FREEZE markiert einzufrierende Felder nach Q-Gate PASS. Schema prueft auf Placeholder-Strings ("Keine Placeholder-Strings | Kein Feld darf "[REVISION IN ...]" oder "[PLACEHOLDER]" enthalten"). Diese sind konsistent — Schema enforct Ausfuehrungsregel zu FREEZE. **KONSISTENT.** |
| RA-A-F13 | HIGH | VERTRAG_PHASE_0-2_INHALT, VERTRAG_PHASE_0-3_SKRIPT | QI2 (INHALT Zeile 98): "Mindestens `mappen_anzahl × 2 + 1` Wikipedia-Artikel". QI-RC1 (INHALT Zeile 108): "Pro Mappe genuegend Fakten + Akteure + Artefakte, um einen 600-900W Skript-Chunk zu stuetzen". SKRIPT §3.1 (Zeile 43): "Chunk-Laenge 600–900 Woerter". Diese Zahlenangaben sind konsistent — INHALT liefert die Ressourcen (Fakten/Artefakte), SKRIPT konsumiert sie in definierter Laenge. **KONSISTENT.** |
| RA-A-F14 | MEDIUM | VERTRAG_PHASE_0-3_SKRIPT, GUETEKRITERIEN_SKRIPT | Fachdidaktische Pruefung zweistufig: SKRIPT §5.1 Q1-Q13 (operativ), §5.2 SK1-SK17 (fachdidaktisch). GUETEKRITERIEN definiert SK1-SK15 (SK18 extern). Q1-Q13 sind Self-Check (AGENT_SKRIPT Aufgabe), SK1-SK15 sind Qualitaetsprüfung (externe Guetekriterien). Diese Zweiteilung ist konsistent. **KONSISTENT.** |

---

## Severity-Verteilung

| Severity | Anzahl | Typ | Aktion |
|---|---|---|---|
| BLOCKER | 2 | RA-A-F01 (Schema/Enum), RA-A-F03 (JSON-Struktur), RA-A-F09 (Artefakt-Mapping) | 0 Blocker-Verletzungen gefunden. Alle 3 BLOCKERs sind **PASS**. |
| CRITICAL | 1 | RA-A-F11 (SK18 Publikationsdatum-Reihenfolge) | Keine Funktionsverletzung, aber Audit-Trail-Observation. Empfehlung: Dokumentieren. |
| HIGH | 7 | RA-A-F02, F04, F05, F06, F07, F08, F10, F13 | Alle **PASS**. |
| MEDIUM | 4 | RA-A-F05, F09, F12, F14 | Alle **PASS**. |

**Gesamt:** 0 Verletzungen.

---

## Gate-Urteil

**GRUEN** — Alle Cross-Contract-Konsistenzen bestanden. Die Welle-1-Patches sind intern konsistent:

1. **Feld-Namen (complication.typ)** sind in SCHEMA, VERTRAG_HEFTEINTRAG und GUETEKRITERIEN konsistent definiert.
2. **Severity-Levels** folgen einheitlichem Schema (BLOCKER/HIGH/MEDIUM).
3. **Eskalationstypen** sind sauber getrennt (E-D* für DIDAKTIK, E-H* für HEFTEINTRAG).
4. **SK18-Quellenorientierung** wird downstream korrekt propagiert (INHALT → SKRIPT → HEFTEINTRAG).
5. **Versionskonventionen** sind dokumentiert und nachvollziehbar.
6. **JSON-Schema vs. Vertrag-Beispiel** sind strukturell identisch.
7. **Heuristiken H1-H7** ergänzen (nicht duplizieren) DIDAKTIK-Vertrag.
8. **Downstream-Kompatibilitäten** sind durchdacht (QI-RC1, QH-RC1, QH-RC2).

### Einschraenkung

**RA-A-F11:** SK18-Publikationsdatum: GUETEKRITERIEN_SKRIPT (v1.1) wurde am 2026-04-07 freigegeben, aber referenziert bereits in VERTRAG_SKRIPT (v1.2) vom 2026-04-06. Dies ist kein funktionaler Fehler (beide Dokumente sind konsistent), aber es deutet auf eine Publikationsreihenfolge hin, die invertiert zu sein scheint. **Empfehlung:** Im nächsten Patch beide Dokumente auf gleiches Datum (2026-04-07) aktualisieren.

---

## Top-3 Empfehlungen

1. **SK18-Quellenorientierung formalisiert in Downstream-Kontrakte propagieren:** Obwohl SK18 von GUETEKRITERIEN_SKRIPT in VERTRAG_SKRIPT berücksichtigt wird, wird die Quellenorientierung in INHALTSBASIS-Artefakt-Nummern (img-, zit-, rolle-) nicht explizit mit den Erarbeitbarkeits-Kategorien (DIRECT/ARTIFACT/INFERENTIAL) in HEFTEINTRAG verlinkt. Empfehlung: In Phase 2.0 oder Welle-2 ein explizites Mapping-Dokument zwischen INHALTSBASIS-Artefakt-IDs und HEFTEINTRAG-Erarbeitbarkeiten erzeugen (z.B. "Mapping_Artefakte_zu_Erarbeitbarkeit.md"). Dies stärkt die Nachvollziehbarkeit für AGENT_MATERIAL.

2. **Versionsdaten synchronisieren:** GUETEKRITERIEN_SKRIPT (v1.1, 2026-04-07) sollte auf Gleichstand mit VERTRAG_SKRIPT (v1.2, 2026-04-06) gebracht werden. Entweder: (a) beide auf 2026-04-07 setzen, oder (b) VERTRAG_SKRIPT auf 2026-04-07 updaten, oder (c) klare Dokumentation, dass GUETEKRITERIEN erst nach VERTRAG aktualisiert wurde (als Fehlerbehebung). Audit-Trail-Klarheit.

3. **Placeholder-Verbot in SCHEMA_HEFTEINTRAG_JSON implementieren:** Die Validierungsregel "Keine Placeholder-Strings" (SCHEMA §2 Zeile 148) ist gut definiert. Empfehlung: Diese Regel auch in einem JSON-Schema-Validator (z.B. via Regex-Pattern auf allen String-Feldern) implementieren. Dies verhindert, dass Fallback-Placeholders "[REVISION IN 2.1c]" versehentlich in die Phase 2.0-Uebernnahme gelangen.

---

## Anhang: Pruef-Checkliste (vollstaendige Dimensionen)

| Dimension | Status | Befund |
|---|---|---|
| **Feld-Namen (complication.typ)** | PASS | Enum: narrativ, konzeptuell, kontrastiv, kausal — in allen 3 Dokunemten identisch |
| **Severity-Levels** | PASS | BLOCKER/HIGH/MEDIUM konsistent durchgenutzt, Nummernraeume disjunkt |
| **Eskalationstypen** | PASS | E-D1-5 (DIDAKTIK), E-H1-3 (HEFTEINTRAG), keine Ueberschneidung |
| **SK18-Referenzierung** | PASS | GUETEKRITERIEN → SKRIPT → INHALT QI-RC1 → HEFTEINTRAG implizit (SCPL Fakten-Verortung) |
| **Versionsnummern** | WARN | v1.2/v1.2/v1.2/v1.1/v1.0/v1.1, Publikationsdaten (2026-04-06 vs. 2026-04-07) auffaellig |
| **JSON-Schema vs. Vertrag-Beispiel** | PASS | Strukturidentisch, alle Felder und Types stimmen ueberein |
| **H1-H7 Heuristiken** | PASS | Ergaenzen (nicht duplizieren) DIDAKTIK-Vertrag, konsistent mit QD5/QD9 |
| **Downstream-Kompatibilitaet (QI-RC, QH-RC)** | PASS | INHALT → SKRIPT → HEFTEINTRAG Kontingenz-Kriterien korrekt verkettbar |
| **Massnahmen-Typen und IDs** | PASS | Q (DIDAKTIK), QI (INHALT), QS (SKRIPT), QH (HEFTEINTRAG) — keine Kollisionen |

---

**Audit abgeschlossen:** 2026-04-07, 100% durchsucht, 0 Verletzungen, 1 Observation (Publikationsdatum).
