# Vertrag Phase 2.2c: Aufgaben-Cross-Konsistenz (AGENT_RAETSEL)

**Extrahiert aus:** WORKFLOW_v4.md (Commit d627924, 2026-04-01)
**Prinzipien:** P1 (Read-from-Artifact) · P5 (Q-Gate Pflicht) · P6 (Praezise Schnittstellen)
**Dispatch-Isolation:** 1 Dispatch. Orchestrator-Q-Gate ueber alle Aufgaben.

---

## Schnittstellen-Vertrag (P6)

| Read-Schritt | Input-Datei | Gelesene Felder | Volltext nur bei |
|---|---|---|---|
| 1 | aufgaben/aufgabe-N-*.json | Alle Felder | — |
| 2 | materialien/mat-N-*.json | id, typ, titel | Findings (dann Volltext) |
| 3 | rahmen/hefteintrag.json | knoten[], merksaetze[] | — |

**NICHT lesen:** data.json, WORKFLOW_v4.md, SKRIPT, INHALTSBASIS, SUB_AUFGABE_*.md, PROGRESSIONSPLAN.md (bereits konsumiert)

## Cross-Konsistenz-Pruefung (Orchestrator-Q-Gate)

**Mechanik:** `docs/architektur/Q-GATE-MECHANIK.md` (Bewertungsstufen, Aggregation, Nachbesserung, Output-Format)
**Katalog:** Q-GATE-MECHANIK.md §7.6 — 4 Kriterien in 2 Klassen (KONSISTENZ, DIDAKTIK)

| # | Kriterium | Beschreibung |
|---|---|---|
| A1 | AFB-Kongruenz (Gesamtbild) | AFB-Zuweisung stimmt mit Progressionsplan ueberein? |
| A3 | Material-Kongruenz (Vollstaendigkeit) | Alle Materialien in mind. 1 Aufgabe referenziert? |
| A5 | Schwierigkeits-Progression | Monoton steigend ueber 5 Aufgaben? |
| A8 | Kognitive Aktivierung | Mind. 1 denkanregende Aufgabe? |
| A9 | TB-Bezug | Mind. 1 Aufgabe pro TB-Knoten? |
| A10 | Typvielfalt | Mind. 3 Typen, kein Typ > 2x, Freitext genau 1x? |
| A12 | Sachbezogen-vor-Wertbezogen | Fakten → Transfer → Stellungnahme? |
| KANN | A13-A15 | Gegenwartsbezug, Fehler-Antizipation, Implizite Differenzierung |

## Dispatch-Ablauf

```
1. Alle aufgaben/aufgabe-N-*.json lesen (P1)
2. Alle materialien/mat-N-*.json lesen (NUR id, typ, titel — P6)
3. rahmen/hefteintrag.json lesen (P1)
4. Cross-Konsistenz-Pruefung durchfuehren (A1, A3, A5, A8-A10, A12)
5. Bei GESAMT-PASS oder GESAMT-WARN: Ergebnis in Q-GATE-LOG.md (Format: Q-GATE-MECHANIK.md §8)
6. Bei GESAMT-FAIL: Betroffene Aufgaben + Finding dokumentieren
   → Re-Dispatch an betroffenen Subagenten mit korrigiertem Konstruktionskontext
   → Max. 2 Re-Dispatch pro Aufgabe
```

## Ruecklauf-Mechanismus

Bei Finding: Re-Dispatch an betroffenen Subagenten mit korrigiertem Konstruktionskontext. Max. 2 Re-Dispatch pro Aufgabe. Der Re-Dispatch folgt dem Vertrag VERTRAG_PHASE_2-2b_AUFGABE.md.

## Output

Kein eigenes Artefakt. Ergebnis wird in Q-GATE-LOG.md geschrieben.
