# Runde 3b: Kickoff-Prompt fuer frische Cowork-Session

**Zweck:** Dieser Prompt wird woertlich in eine neue Cowork-Session eingefuegt.
**Kontext:** Simuliert die Orchestrator-Uebergabe an Phase 2 nach Abschluss von Phase 0 + Phase 1/1.5.

---

## Prompt (ab hier woertlich kopieren)

```
Phase 2 beginnt. Lies zuerst docs/agents/ORCHESTRATOR.md — er steuert den gesamten Ablauf.

Game-ID: gpg-erster-weltkrieg-ursachen
Mappe: 2 — Das Attentat von Sarajevo
Produktionsverzeichnis: docs/agents/artefakte/produktion/gpg-erster-weltkrieg-ursachen/mappe-2/

Input-Artefakte (Phase 0 + Phase 1/1.5, alle validiert):
- docs/agents/artefakte/DIDAKTIK_RAHMEN_gpg-erster-weltkrieg-ursachen.md
- docs/agents/artefakte/INHALTSBASIS_gpg-erster-weltkrieg-ursachen.md
- docs/agents/artefakte/ARTEFAKT_INVENTAR_gpg-erster-weltkrieg-ursachen.md
- docs/agents/artefakte/SKRIPT_gpg-erster-weltkrieg-ursachen.md (Chunk 2)
- docs/agents/artefakte/TAFELBILD_gpg-erster-weltkrieg-ursachen_Mappe2.md
- docs/agents/artefakte/MATERIAL_GERUEST_gpg-erster-weltkrieg-ursachen_Mappe2.md

TB-FREEZE: Tafelbild Mappe 2 ist eingefroren (Phase 0.4 PASS). Keine Aenderungen an SCPL-Schritten.

Dispatch-Sequenz: Phase 2.0 → 2.1 → 2.1c → [Session-Split] → 2.2a → 2.2b → 2.2c → Phase-2-Abschluss.
Phasen-Vertraege liegen in docs/architektur/vertraege/ — lies pro Phase den zugehoerigen Vertrag.

Beginne mit Phase 2.0 (Rahmen-Produktion).
```
