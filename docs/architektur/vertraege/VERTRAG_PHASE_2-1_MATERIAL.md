# Vertrag Phase 2.1: Material-Produktion

**Extrahiert aus:** WORKFLOW_v4.md (Commit d627924, 2026-04-01)
**Prinzipien:** P1 (Read-from-Artifact) · P3 (Rahmen stuetzt Inhalt) · P4 (1 Material = 1 Dispatch = 1 .json) · P5 (Q-Gate Pflicht) · P6 (Praezise Schnittstellen)
**Dispatch-Isolation:** Jedes Material wird als EIGENE Nachricht produziert. NICHT mehrere Materialien parallel.

---

## Subagenten-Zuordnung

| Material-Typ | Engine-Typ | Prompt-Datei |
|---|---|---|
| darstellungstext | darstellungstext | SUB_MATERIAL_DARSTELLUNGSTEXT.md |
| quellentext | quellentext | SUB_MATERIAL_QUELLENTEXT.md |
| tagebuch | quellentext | SUB_MATERIAL_TAGEBUCH.md |
| zeitleiste | zeitleiste | SUB_MATERIAL_ZEITLEISTE.md |
| bildquelle | bildquelle | SUB_MATERIAL_BILDQUELLE.md |
| karte | bildquelle | SUB_MATERIAL_KARTE.md |
| statistik | zeitleiste/bildquelle | SUB_MATERIAL_STATISTIK.md |

## Schnittstellen-Vertrag (P6)

| Read-Schritt | Input-Datei | Schema | Gelesene Felder/Sektionen | Bedingung | NICHT lesen |
|---|---|---|---|---|---|
| 1 | MATERIAL_GERUEST | — | NUR Zeile des aktuellen mat-ID (typ, titel, skript_chunk, tafelbild_knoten, artefakt_ref, didaktische_funktion) | immer | Andere mat-IDs |
| 2 | rahmen/hefteintrag.json | hefteintrag-schema.json | NUR knoten die in tafelbild_knoten referenziert + stundenfrage + **zugehoeriger scpl{}-Schritt** (situation/complication[i]/problem — je nach SCPL-Zone des tafelbild_knoten) | immer | Andere Knoten, andere SCPL-Zonen |
| 3 | SUB_MATERIAL_[TYP].md | — | Vollstaendig | immer | Andere SUB_MATERIAL_*.md |
| 4 | SKRIPT | — | NUR den in skript_chunk referenzierten Chunk (§-Bereich) | immer | Andere Chunks |
| 5 | INHALTSBASIS | — | NUR die zum Chunk gehoerende Mappe-Sektion | immer | Andere Mappen |
| 6 | rahmen/einstieg.json | rahmen-einstieg-schema.json | problemstellung (fuer C1b-Konsistenz + Rahmung) | immer | — |
| 7 | ARTEFAKT_INVENTAR | — | NUR Eintraege mit artefakt_ref dieses Materials | NUR WENN artefakt_ref gesetzt (BQ, KA, ST) | Gesamte Datei bei DT/QT/TB/ZL |
| 8 | rahmen/hefteintrag.json | hefteintrag-schema.json | scpl.loesung[] (Kernerkenntnisse) | NUR WENN didaktische_funktion = sicherung oder transfer | Gesamte Datei bei einstieg/erarbeitung/vertiefung |

**NICHT lesen:** data.json (kein Goldstandard-Template), andere Mappen-Artefakte, WORKFLOW_v4.md (dieser Vertrag genuegt)

## Dispatch-Ablauf (pro Material)

```
1. MATERIAL_GERUEST lesen → mat-ID, typ, titel, skript_chunk, tafelbild_knoten,
   artefakt_ref, didaktische_funktion
2. rahmen/hefteintrag.json lesen → Relevante Knoten + Stundenfrage + zugehoeriger SCPL-Schritt (P1 + P6).
   Der SCPL-Schritt liefert didaktischen Kontext (Fachbegriff, Argumentationsschritt, Einbettung in SCPL-Kette).
   Mapping: tafelbild_knoten → scpl.situation | scpl.complication[i] | scpl.problem (je nach Zone).
3. SUB_MATERIAL_[TYP].md lesen (P1 — NUR den passenden Subagenten)
4. SKRIPT NUR relevanten Chunk lesen (P1 + P6)
5. INHALTSBASIS NUR relevante Mappe-Sektion lesen (P1 + P6)
6. rahmen/einstieg.json lesen → problemstellung (P6: 1 Feld, fuer Rahmung)
7. NUR WENN artefakt_ref gesetzt: ARTEFAKT_INVENTAR → Eintraege dieses Materials (P6)
8. NUR WENN didaktische_funktion = sicherung|transfer:
   rahmen/hefteintrag.json lesen → scpl.loesung[] (M3c: "vom Ende her", Kernerkenntnisse)
9. Material produzieren — Kerninhalt im Mittelpunkt, Rahmen stuetzt (P3)
   Subagent liefert Content-Felder: inhalt, quelle, [bildunterschrift, lizenz bei BQ/KA], _meta.
   Dispatcher ergaenzt Struktur-Felder aus MATERIAL_GERUEST: id, typ, titel, position,
   didaktische_funktion, voraussetzung, ueberleitung_von, sequenz_kontext.
   Vollstaendiges Material MUSS dem Schema entsprechen: docs/architektur/schemata/material-output-schema.json
10. Schema-Validierung: Output gegen material-output-schema.json pruefen.
    Bei Schema-Fehler: korrigieren BEVOR Q-Gate.
11. Q-Gate pruefen — Mechanik: docs/architektur/Q-GATE-MECHANIK.md (§3 Aggregation, §4 Nachbesserung, §6 Output-Format).
    Katalog: Q-GATE-MECHANIK.md §7.1 (Material-Q-Gate). Pruef-Reihenfolge: SCHEMA zuerst, dann MQ1-MQ6 + M1-M12 + TYP-*.
12. Bei GESAMT-PASS oder GESAMT-WARN: materialien/mat-N-M.json schreiben (P4)
13. Bei GESAMT-FAIL: 1 Nachbesserung (§4) → erneut Q-Gate → bei FAIL: Finding in Q-GATE-LOG.md
14. Q-Gate-Ergebnis in Q-GATE-LOG.md schreiben (Format: Q-GATE-MECHANIK.md §8)
```

## Q-Gate

**Mechanik:** `docs/architektur/Q-GATE-MECHANIK.md` (Bewertungsstufen, Aggregation, Nachbesserung, Output-Format)
**Katalog:** Q-GATE-MECHANIK.md §7.1 — 12 Kriterien in 5 Klassen (SCHEMA, KONSISTENZ, FORM, INHALT, DIDAKTIK)
**Kriterien-Detail:** `docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md` (M1-M12 + typ-spezifisch)

## Output

```
materialien/mat-N-M.json   # id, typ, titel, inhalt (HTML), quelle, position,
                            # didaktische_funktion, voraussetzung, ueberleitung_von,
                            # sequenz_kontext, lizenz (bei BQ/KA/ST)
```

## User-Validierung

**Nach Material 1-2: PFLICHT (Mappe 2)** (Strategie-Audit E1)
Kalibrierung: Ton, Sprachregister, Vergegenwaertigungstiefe.
Ab Mappe 3: Herabstufung auf EMPFOHLEN moeglich.

## Quellenangaben

Als `<cite>`-Elemente in Material-HTML einbetten (L6). Kein separates Array.

## Compaction-Failsafe (P1)

Schritte 1-8 lesen IMMER aus Dateien, nie aus dem Kontext. Bereits geschriebene .json-Dateien bleiben erhalten. Selbst nach Compaction beginnt der naechste Dispatch mit frischem Einlesen.

## Bekannte Limitationen

- Read-Schritt 7 (konditional): DT, QT, TB, ZL haben keine artefakt_ref → Schritt 7 entfaellt. Spart 3-4 Reads pro Mappe.
- Read-Schritt 8 (konditional, M3c): Nur letztes Material der Sequenz (sicherung/transfer) erhaelt Kernerkenntnisse.
- Wenn kein separates TAFELBILD-Artefakt existiert (pre-v3 Games): SCPL-Daten aus rahmen/hefteintrag.json (Phase 2.0 Output).
