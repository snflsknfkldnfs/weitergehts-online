# Vertrag Phase 2.1c: Material-Cross-Konsistenz

**Extrahiert aus:** WORKFLOW_v4.md (Commit d627924, 2026-04-01)
**Prinzipien:** P1 (Read-from-Artifact) · P5 (Q-Gate Pflicht) · P6 (Praezise Schnittstellen)
**Dispatch-Isolation:** 1 Dispatch. Prueft das Zusammenspiel, nicht die Einzelqualitaet.

---

## Schnittstellen-Vertrag (P6)

| Read-Schritt | Input-Datei | Gelesene Felder | Zweck |
|---|---|---|---|
| 1 | materialien/mat-N-*.json (alle) | titel, inhalt, ueberleitung_von, fachbegriffe, _meta.tafelbild_knoten_abgedeckt | Cross-Pruefung |
| 2 | rahmen/tafelbild.json | knoten[], stundenfrage | TB-Gesamtabdeckung |
| 3 | MATERIAL_GERUEST | Sequenzreihenfolge, didaktische_funktion pro mat-ID | Soll-Ist-Vergleich |

**NICHT lesen:** data.json, WORKFLOW_v4.md, SKRIPT, INHALTSBASIS, SUB_MATERIAL_*.md, aufgaben/*.json

## 4 Pruefachsen

1. **Sequenz-Kohaerenz:** Bilden die Materialien in Reihenfolge einen logischen Erkenntnisweg zum Tafelbild? FAIL wenn: Ein Material setzt einen Fachbegriff als bekannt voraus, der erst in einem spaeteren Material eingefuehrt wird.

2. **Fachbegriff-Konsistenz:** Wird ein Begriff in allen Materialien identisch verwendet? FAIL wenn: Derselbe Fachbegriff wird in zwei Materialien unterschiedlich definiert oder verwendet.

3. **Ueberleitung-Kohaerenz:** Passt `ueberleitung_von` von Material N+1 zum tatsaechlichen Inhalt von Material N? FAIL wenn: `ueberleitung_von` bezieht sich auf einen Inhalt, der im tatsaechlichen Vorgaenger-Material nicht vorkommt.

4. **TB-Knoten-Gesamtabdeckung:** Decken alle Materialien zusammen alle TB-Knoten ab? FAIL wenn: Ein TB-Knoten wird von keinem Material abgedeckt (binaer pruefbar).

## Dispatch-Ablauf

```
1. Alle materialien/mat-N-*.json lesen (P1)
2. rahmen/tafelbild.json lesen (P1)
3. MATERIAL_GERUEST lesen (P1)
4. 4 Pruefachsen durchfuehren
5. Bei PASS: Ergebnis in Q-GATE-LOG.md
6. Bei FAIL: Betroffene Materialien + Finding dokumentieren
   → User entscheidet ueber Nachbesserung oder Akzeptanz
```

## Output

Kein eigenes Artefakt. Ergebnis wird in Q-GATE-LOG.md geschrieben.

## Session-Split

**CHECKPOINT nach Phase 2.1c** (Audit S2 — Token-Budget-Mitigation). Neuer Dispatch-Kontext fuer Phase 2.2.
