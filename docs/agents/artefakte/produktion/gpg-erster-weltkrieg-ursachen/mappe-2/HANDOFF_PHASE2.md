# Orchestrator-Handoff: Phase 2 — Mappe 2

**Datum:** 2026-04-01
**Zweck:** Simulierter Orchestrator-Handoff fuer Runde 3a (Prozesstest v4)
**Status:** Phase 0 + Phase 1 + Phase 1.5 abgeschlossen. Phase 2 bereit.

---

## Kontext

| Feld | Wert |
|---|---|
| Game-ID | gpg-erster-weltkrieg-ursachen |
| Mappe-Nr | 2 |
| Mappe-Titel | Das Attentat von Sarajevo |
| Mappe-Beschreibung | Der Funke im Pulverfass — ein Mord in Sarajevo, die Julikrise und der Weg in den Weltkrieg |
| Freischalt-Code | SARAJEVO |
| Materialien | 6 (mat-2-1 bis mat-2-6) |
| Goldstandard-Referenz | Mappe 1 in escape-games/gpg-erster-weltkrieg-ursachen/data.json |

---

## Eingabe-Artefakte (P1: Read-from-Artifact)

Jeder Dispatch liest ausschliesslich aus diesen Dateien. Kein Kontext aus vorherigen Dispatches.

| Artefakt | Pfad | Status |
|---|---|---|
| SKRIPT | docs/agents/artefakte/SKRIPT_gpg-erster-weltkrieg-ursachen.md | Validiert (Phase 0.3) |
| DIDAKTIK_RAHMEN | docs/agents/artefakte/DIDAKTIK_RAHMEN_gpg-erster-weltkrieg-ursachen.md | Validiert (Phase 0.1) |
| INHALTSBASIS | docs/agents/artefakte/INHALTSBASIS_gpg-erster-weltkrieg-ursachen.md | Validiert (Phase 0.2a) |
| ARTEFAKT_INVENTAR | docs/agents/artefakte/ARTEFAKT_INVENTAR_gpg-erster-weltkrieg-ursachen.md | Validiert (Phase 0.2b) |
| MATERIAL_GERUEST Mappe 2 | docs/agents/artefakte/MATERIAL_GERUEST_gpg-erster-weltkrieg-ursachen_Mappe2.md | Validiert (Phase 1 + 1.5, geprueft gegen Audit-Fixes 2026-04-01) |
| ORCHESTRATOR | docs/agents/ORCHESTRATOR.md | Kanonisch |
| WORKFLOW_v4 | docs/architektur/WORKFLOW_v4.md | Kanonisch (inkl. Audit 3 Fixes) |
| SUB_MATERIAL_* | docs/agents/SUB_MATERIAL_*.md | Kanonisch |
| SUB_AUFGABE_* | docs/agents/SUB_AUFGABE_*.md | Kanonisch |
| QUALITAETSKRITERIEN | docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md | Kanonisch |
| GUETEKRITERIEN_AUFGABEN | docs/checklisten/GUETEKRITERIEN_AUFGABEN.md | Kanonisch |

---

## Output-Verzeichnis

```
docs/agents/artefakte/produktion/gpg-erster-weltkrieg-ursachen/mappe-2/
  rahmen/          ← Phase 2.0
  materialien/     ← Phase 2.1
  aufgaben/        ← Phase 2.2b
  PROGRESSIONSPLAN.md  ← Phase 2.2a
  Q-GATE-LOG.md        ← Kontinuierlich
```

---

## TB-FREEZE

Tafelbild Mappe 2 ist eingefroren (Phase 0.4). Keine Modifikationen erlaubt.
6 Knoten: k2-1 bis k2-6. 6 Verbindungen. 1 Cross-Mappe-Verbindung (k2-2 → k1-1).
SCPL-Struktur mit loesung[] = Merksaetze fuer Kernerkenntnisse.

---

## Bekannte Limitationen

| Limitation | Workaround | Dokumentiert in |
|---|---|---|
| quellenangaben[] kein Engine-Renderer | `<cite>`-Elemente in Material-HTML einbetten (L6) | WORKFLOW_v4.md Sektion 10, AGENT_MATERIAL.md |
| freitext-code: Engine prueft nur `loesung` (String) | `erwartete_begriffe[]` und `validierung_schwelle` als _meta (Post-MVP) | SUB_AUFGABE_FREITEXT.md |
| Engine-Patch text_mit_luecken || frage | Noch NICHT angewendet. Runde 4. | STATUS.md |
| Engine-Typ-Mapping | tagebuch→quellentext, karte→bildquelle. Im JSON `typ` Feld Engine-Typ verwenden. | WORKFLOW_v4.md Sektion 10, ORCHESTRATOR.md |

---

## Dispatch-Sequenz Runde 3a

```
Phase 2.0:  [D01] Rahmen (4 Dateien: meta, einstieg, sicherung, tafelbild)
Phase 2.1:  [D02] mat-2-1 (darstellungstext)      ← User-Validierung PFLICHT nach D02+D03
            [D03] mat-2-2 (bildquelle)             ← User-Validierung PFLICHT nach D02+D03
            [D04] mat-2-3 (bildquelle)
            [D05] mat-2-4 (quellentext)
            [D06] mat-2-5 (zeitleiste)
            [D07] mat-2-6 (tagebuch → Engine: quellentext)
Phase 2.1c: [D08] Material-Cross-Konsistenz
--- CHECKPOINT ---
Phase 2.2a: [D09] Progressionsplan (AGENT_RAETSEL)
Phase 2.2b: [D10] aufgabe-2-1
            [D11] aufgabe-2-2
            [D12] aufgabe-2-3
            [D13] aufgabe-2-4
            [D14] aufgabe-2-5
Phase 2.2c: [D15] Aufgaben-Cross-Konsistenz
```
