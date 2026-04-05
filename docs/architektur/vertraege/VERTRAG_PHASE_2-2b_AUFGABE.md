# Vertrag Phase 2.2b: Aufgaben-Produktion

**Extrahiert aus:** WORKFLOW_v4.md (Commit d627924, 2026-04-01)
**Patch-Stand:** 2026-04-05 — AU-1 (STR-02 Bloom-Tiefe-Pflicht + STR-11 Vergleich/Begruendung). Siehe VERTRAG_ATOM_UNITS.md §3 AU-1.
**Prinzipien:** P1 (Read-from-Artifact) · P4 (1 Aufgabe = 1 Dispatch = 1 .json) · P5 (Q-Gate Pflicht) · P6 (Praezise Schnittstellen)
**Dispatch-Isolation:** Jede Aufgabe wird als EIGENE Nachricht produziert. NICHT mehrere Aufgaben parallel.

---

## Subagenten-Zuordnung

| Subagent | Primaerer AFB | Bloom-Ziel-Zone | Kernexpertise | Prompt-Datei |
|---|---|---|---|---|
| SUB_AUFGABE_MC | I (auch II) | L1-L3 | Distractor-Konstruktion | SUB_AUFGABE_MC.md |
| SUB_AUFGABE_ZUORDNUNG | I-II | L1-L3 | Pole-Trennschaerfe | SUB_AUFGABE_ZUORDNUNG.md |
| SUB_AUFGABE_LUECKENTEXT | I-II | L1-L2 | Lueckenauswahl, Fachbegriff-Recall | SUB_AUFGABE_LUECKENTEXT.md |
| SUB_AUFGABE_REIHENFOLGE | II | L2-L3 | Element-Eindeutigkeit | SUB_AUFGABE_REIHENFOLGE.md |
| SUB_AUFGABE_FREITEXT | II-III | L3-L6 | Leitfragen-Design, Scaffolding | SUB_AUFGABE_FREITEXT.md |
| SUB_AUFGABE_VERGLEICH | II-III | **L4** (Ziel) | Strukturraster, Dimensions-Design | SUB_AUFGABE_VERGLEICH.md |
| SUB_AUFGABE_BEGRUENDUNG | III | **L5** (Ziel) | CER-Schema (Claim-Evidence-Reasoning) | SUB_AUFGABE_BEGRUENDUNG.md |

**STR-11 Anti-Quota-Klausel:** Die neuen Typen `vergleich` und `begruendung` werden NICHT per Quote erzwungen. Auswahl ausschliesslich nach Eignung (Material-Struktur + Lernziel). Pseudo-Vergleiche (nur 1 Dimension) und Pseudo-Begruendungen (Claim ohne Evidence) sind Q-Gate-FAIL. Auswahl-Heuristik: siehe VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md.

## Schnittstellen-Vertrag (P6)

| Read-Schritt | Input-Datei | Gelesene Felder | NICHT lesen |
|---|---|---|---|
| 1 | PROGRESSIONSPLAN.md | NUR Konstruktionskontext dieser Aufgabe | Andere Aufgaben |
| 2 | materialien/mat-N-X.json | Volltext (Ziel-Material) | — |
| 3 | MATERIAL_GERUEST (andere mat-IDs) | NUR titel + didaktische_funktion | Nicht: materialien/*.json inhalt (Token-Effizienz) |
| 4 | SUB_AUFGABE_[TYP].md | Vollstaendig | Andere SUB_AUFGABE_*.md |

**NICHT lesen:** data.json, WORKFLOW_v4.md, SKRIPT, INHALTSBASIS, rahmen/*.json (ausser indirekt via Konstruktionskontext)

## Dispatch-Ablauf (pro Aufgabe)

```
1. PROGRESSIONSPLAN.md lesen → NUR Konstruktionskontext dieser Aufgabe (P1 + P6)
2. Ziel-Material .json lesen (Volltext) (P1)
3. MATERIAL_GERUEST lesen (andere mat-IDs: NUR titel + didaktische_funktion — P6)
4. SUB_AUFGABE_[TYP].md lesen (P1 — NUR den passenden Subagenten)
5. Aufgabe produzieren (nach Subagenten-Regeln)
6. Q-Gate pruefen — Mechanik: docs/architektur/Q-GATE-MECHANIK.md (§3 Aggregation, §4 Nachbesserung, §6 Output-Format).
   Katalog: Q-GATE-MECHANIK.md §7.2 (Aufgaben-Q-Gate). Pruef-Reihenfolge: SCHEMA zuerst, dann A1-A7 + typ-spezifisch.
7. Bei GESAMT-PASS oder GESAMT-WARN: aufgaben/aufgabe-N-M.json schreiben (P4)
8. Bei GESAMT-FAIL: 1 Nachbesserung (§4) → erneut Q-Gate → bei FAIL: Finding in Q-GATE-LOG.md
9. Q-Gate-Ergebnis in Q-GATE-LOG.md schreiben (Format: Q-GATE-MECHANIK.md §8)
```

## Bloom-Tiefe-Pflichtfeld (STR-02, AU-1)

**Pflichtfeld pro Aufgabe:** `_meta.bloom_level` (Integer 1-6) nach Bloom-Taxonomie (revidiert, Anderson/Krathwohl):
- L1 Erinnern (remember)
- L2 Verstehen (understand)
- L3 Anwenden (apply)
- L4 Analysieren (analyze)
- L5 Bewerten (evaluate)
- L6 Erschaffen (create)

**Selbstdeklaration:** Jeder Aufgaben-Subagent setzt `_meta.bloom_level` explizit und begruendet kurz in `_meta.bloom_begruendung` (max 1 Satz, Verweis auf Operator + kognitive Anforderung).

**Verteilungs-Policy pro Mappe (bloom_verteilung_policy):**
- max 40 % der Aufgaben auf L1-L2 (Reproduktion)
- min 30 % der Aufgaben auf L3-L4 (Reorganisation/Transfer)
- min 20 % der Aufgaben auf L5-L6 (Reflexion/Urteil)

Die Policy gilt pro Mappe (nicht pro Aufgabe). Verletzungen sind Q-Gate-FAIL auf Mappen-Ebene (A19).

**Validator (Code-Strang):** `tools/validate_bloom_distribution.py` liest `progressionsplan.json` + alle `aufgaben/aufgabe-*.json` der Mappe, aggregiert `_meta.bloom_level`, prueft die Policy. Aktivierung Teil des AU-1-Code-Strangs (Claude-Code-Uebergabe).

**Auto-Klassifikator:** Fuer Bestands-Mappen 1-4 laeuft ein Auto-Klassifikator-Subagent-Dispatch (Option C Hybrid), der `_meta.bloom_level` nachpflegt. Ergebnis in `docs/analyse/BLOOM_KLASSIFIKATION_MAPPEN_1_4.md`.

## Q-Gate

**Mechanik:** `docs/architektur/Q-GATE-MECHANIK.md` (Bewertungsstufen, Aggregation, Nachbesserung, Output-Format)
**Katalog:** Q-GATE-MECHANIK.md §7.2 — 9 Kriterien in 4 Klassen (SCHEMA, KONSISTENZ, FORM, DIDAKTIK)
**Kriterien-Detail:** `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md` (A1-A18)

**Einzelaufgaben-Ebene (A1-A7 + typ-spezifisch):**
- A1 AFB-Kongruenz
- A2 Fragestaemme-Klarheit (genau 1 Anforderung)
- A3 Material-Kongruenz (aus Ziel-Material beantwortbar)
- A4-MC Distraktoren / A4-ZU Trennschaerfe / A4-LT Luecken-Eindeutigkeit / A4-RF Reihenfolge-Eindeutigkeit
- A6 Tipp-Progression: Richtung → Einschraenkung → Loesung+Erklaerung
- A7 Operator-Praezision (AFB-Taxonomie)
- A11-FT Freitext-Qualitaet (nur SUB_AUFGABE_FREITEXT)
- **A19 Bloom-Verteilung erfuellt Policy** (Mappen-Ebene, STR-02): max 40 % L1-L2, min 30 % L3-L4, min 20 % L5-L6.
- **A22 Vergleichs-Strukturraster vollstaendig** (nur SUB_AUFGABE_VERGLEICH): mindestens 2 Objekte, mindestens 2 Dimensionen, keine leeren Zellen, keine redundanten Dimensionen.
- **A23 CER-Struktur vollstaendig** (nur SUB_AUFGABE_BEGRUENDUNG): `claim`, `evidence` (min 1 Material-Beleg), `reasoning` (explizite Verknuepfung) — alle drei Felder pflicht, keines leer.
- **A24 Bloom-Selbstdeklaration konsistent** (alle Typen): `_meta.bloom_level` gesetzt, `_meta.bloom_begruendung` vorhanden, Operator passt zu deklarierter Stufe.
- **MQ3 Material-Referenz-Verbot (Q-M2-04):** `frage`-Feld enthaelt KEINE `[[mat-id|...]]`-Links und KEINE (M[position])-Verweise. Material-Referenzen gehoeren AUSSCHLIESSLICH in Tipp Stufe 1.
- **Engine-Feld-Kompatibilitaet (Q-M2-01/02):** JSON-Feldnamen muessen exakt den Engine-Erwartungen entsprechen. Reihenfolge: `optionen` (NICHT `elemente_ungeordnet`). Freitext: `loesung` als Array (NICHT als String).

## Output

```
aufgaben/aufgabe-N-M.json   # id, typ, frage/text_mit_luecken, loesung,
                              # material_referenz, tipp[], afb, position,
                              # _meta: { bloom_level, bloom_begruendung }
```

**typ-Werte (Engine-Registry):** `mc` · `zuordnung` · `lueckentext` · `reihenfolge` · `freitext` · `vergleich` · `begruendung`

## Loesungsformate (Engine-kompatibel)

| Aufgabentyp | loesung-Format |
|---|---|
| MC | String (korrekte Option) |
| Lueckentext | Array (Lueckenwerte) |
| Reihenfolge | Array (korrekte Reihenfolge) |
| Zuordnung | Object (Schluessel→Wert) |
| Freitext | Array (Keywords, 3-5 Eintraege) |
| Vergleich | Object `{ dimensionen: [..], objekte: [..], zellen: { <obj>: { <dim>: "<erwarteter Wert>" } } }` |
| Begruendung | Object `{ claim: "<These>", evidence: ["<Material-Beleg 1>", ...], reasoning: "<Verknuepfung>" }` |

## Compaction-Failsafe (P1)

Schritte 1-4 lesen IMMER aus Dateien. Bereits geschriebene .json bleiben erhalten.
