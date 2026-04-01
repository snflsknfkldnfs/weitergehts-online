# Vertrag Phase 2.2a: Progressionsplan (AGENT_RAETSEL)

**Extrahiert aus:** WORKFLOW_v4.md (Commit d627924, 2026-04-01)
**Prinzipien:** P1 (Read-from-Artifact) · P4 (1 Dispatch, 1 Output) · P5 (Q-Gate Pflicht) · P6 (Praezise Schnittstellen)
**Dispatch-Isolation:** 1 Dispatch. Liest Material-Metadaten, NICHT Material-Volltext.

---

## Schnittstellen-Vertrag (P6)

| Read-Schritt | Input-Datei | Gelesene Felder | NICHT lesen |
|---|---|---|---|
| 1 | AGENT_RAETSEL.md | Vollstaendig (Orchestrationsregeln) | — |
| 2 | materialien/mat-N-*.json | NUR: id, typ, titel, _meta.tafelbild_knoten_abgedeckt | NICHT: inhalt (Volltext) — Token-Effizienz |
| 3 | MATERIAL_GERUEST | NUR: didaktische_funktion pro mat-ID | — |
| 4 | rahmen/tafelbild.json | knoten[], merksaetze[], stundenfrage | — |
| 5 | DIDAKTIK_RAHMEN | NUR: AFB-Profil + Schwierigkeitskurve dieser Mappe | Andere Mappen |

**Begruendung Volltext-Ausschluss (Schritt 2):** Der Orchestrator braucht Material-Volltext nicht. Er trifft 3 Entscheidungen: AFB-Zuweisung (braucht TB-Knoten + Schwierigkeitskurve), Typauswahl (braucht Materialtyp + didaktische_funktion), Operationalisierungsziel (braucht TB-Knoten-Merksatz + AFB-Operator). Material-Volltext wird erst vom Subagenten in Phase 2.2b gelesen (P1).

**NICHT lesen:** data.json, WORKFLOW_v4.md, SKRIPT, INHALTSBASIS, aufgaben/*.json

## Dispatch-Ablauf

```
1. AGENT_RAETSEL.md lesen
2. Alle materialien/mat-N-*.json lesen (NUR id, typ, titel, _meta — NICHT inhalt)
3. MATERIAL_GERUEST lesen (didaktische_funktion pro mat-ID)
4. rahmen/tafelbild.json lesen (knoten, merksaetze, stundenfrage)
5. DIDAKTIK_RAHMEN lesen (NUR AFB-Profil + Schwierigkeitskurve — P6)
6. Progressionsplan erstellen (5 Positionen, AFB-Zuweisung, Typauswahl)
7. Pro Aufgabe: Konstruktionskontext generieren
   (Ziel-Material-ID, TB-Knoten, AFB, Operationalisierungsziel)
8. Freischalt-Code generieren (thematisch, A-Z, 4-8 Zeichen)
9. PROGRESSIONSPLAN.md schreiben
```

## Output

```
PROGRESSIONSPLAN.md   # 5 Konstruktionskontexte + Dispatch-Anweisungen + Freischalt-Code
```

## Prompt-Datei

`docs/agents/AGENT_RAETSEL.md`
