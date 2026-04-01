# Vertrag Phase 2.2b: Aufgaben-Produktion

**Extrahiert aus:** WORKFLOW_v4.md (Commit d627924, 2026-04-01)
**Prinzipien:** P1 (Read-from-Artifact) · P4 (1 Aufgabe = 1 Dispatch = 1 .json) · P5 (Q-Gate Pflicht) · P6 (Praezise Schnittstellen)
**Dispatch-Isolation:** Jede Aufgabe wird als EIGENE Nachricht produziert. NICHT mehrere Aufgaben parallel.

---

## Subagenten-Zuordnung

| Subagent | Primaerer AFB | Kernexpertise | Prompt-Datei |
|---|---|---|---|
| SUB_AUFGABE_MC | I (auch II) | Distractor-Konstruktion | SUB_AUFGABE_MC.md |
| SUB_AUFGABE_ZUORDNUNG | I-II | Pole-Trennschaerfe | SUB_AUFGABE_ZUORDNUNG.md |
| SUB_AUFGABE_LUECKENTEXT | I-II | Lueckenauswahl, Fachbegriff-Recall | SUB_AUFGABE_LUECKENTEXT.md |
| SUB_AUFGABE_REIHENFOLGE | II | Element-Eindeutigkeit | SUB_AUFGABE_REIHENFOLGE.md |
| SUB_AUFGABE_FREITEXT | II-III | Leitfragen-Design, Scaffolding | SUB_AUFGABE_FREITEXT.md |

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
6. Q-Gate pruefen (A1-A7 + typ-spezifisch)
7. Bei PASS: aufgaben/aufgabe-N-M.json schreiben (P4)
8. Bei FAIL: 1 Nachbesserung → erneut Q-Gate → bei FAIL: Finding in Q-GATE-LOG.md
9. Q-Gate-Ergebnis in Q-GATE-LOG.md schreiben
```

## Q-Gate

**Einzelaufgaben-Ebene (A1-A7 + typ-spezifisch):**
- A1 AFB-Kongruenz
- A2 Fragestaemme-Klarheit (genau 1 Anforderung)
- A3 Material-Kongruenz (aus Ziel-Material beantwortbar)
- A4-MC Distraktoren / A4-ZU Trennschaerfe / A4-LT Luecken-Eindeutigkeit / A4-RF Reihenfolge-Eindeutigkeit
- A6 Tipp-Progression: Richtung → Einschraenkung → Loesung+Erklaerung
- A7 Operator-Praezision (AFB-Taxonomie)
- A11-FT Freitext-Qualitaet (nur SUB_AUFGABE_FREITEXT)

## Output

```
aufgaben/aufgabe-N-M.json   # id, typ, frage/text_mit_luecken, loesung,
                              # material_referenz, tipp[], afb, position
```

## Loesungsformate (Engine-kompatibel)

| Aufgabentyp | loesung-Format |
|---|---|
| MC | String (korrekte Option) |
| Lueckentext | Array (Lueckenwerte) |
| Reihenfolge | Array (korrekte Reihenfolge) |
| Zuordnung | Object (Schluessel→Wert) |
| Freitext | String (Keyword, 3-5 Woerter) |

## Compaction-Failsafe (P1)

Schritte 1-4 lesen IMMER aus Dateien. Bereits geschriebene .json bleiben erhalten.
