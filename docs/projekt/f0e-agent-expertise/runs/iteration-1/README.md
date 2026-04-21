# F0e-AEF Iteration-1 Run

**Case:** mat-4-3 (Trothas Vernichtungsbefehl, Mappe 4 Deutscher-Nationalismus-Kolonialismus)
**Datum:** 2026-04-21
**Plan-Ref:** `F0e_AGENT_EXPERTISE_SPIKE.md` §4.1
**Dispatch-Modus:** Arm-B-analog (fresher Agent-Envelope via Task-Tool `general-purpose`)

## Systemprompt-Stack (Prioritaets-Order)

1. `gate-prototype/overlays/PROMPT_HARDENING_QUELLENTEXT.md` v1.0 — Shadow-Overlay (strukturelle Haertung)
2. `escape-game-generator/agents/SUB_MATERIAL_QUELLENTEXT.md` — authoritative Agent-Datei (unveraendert)
3. `escape-game-generator/agents/_includes/F0B_PRIMING_INCLUDE.md` §1+§2+§3 — Priming wortgleich

## Input-Bundle

- `docs/projekt/testrun-dispatch-spike/input_bundle/bundle.md`
- SHA-256: `419c6440a4ebcf9959fc0eca59974f493d2a95104a72dfc5ab96a5533c417658` (F0d-Freeze, byte-identisch)

## Gate-Kette

1. Partial-Gate gegen `gate-prototype/schemas/material_quellentext_partial_v3.10.2.json`
2. Merge mit `gate-prototype/fixtures/dispatcher_context_mat-4-3.json`
3. Full-Gate gegen `gate-prototype/schemas/material_quellentext_v3.10.2.json` (pinned SHA `632d7b47...`)

## PASS-Kriterium

Alle drei Gate-Stufen Exit 0 + Didaktik-Review gem. §10 Protokoll ≥ 4/5.

## Artefakte in diesem Ordner

- `README.md` (dieses Dokument)
- `dispatch_prompt.md` — voller User-Prompt fuer Task-Call 1 (Audit)
- `subagent_response.md` — rohe Subagent-Antwort (wortlaut)
- `partial.json` — extrahiertes Partial-JSON (Subagent-Ownership-Scope)
- `partial_gate_report.txt` — Human-Readable Report Partial-Gate
- `merged.json` — post-Merge Full-Material
- `merge_report.txt` — Merge-Ausgabe (Ownership-Kollisions-Check)
- `full_gate_report.txt` — Human-Readable Report Full-Gate
- `RUN_META.md` — Meta (Tokens, Dauer, Agent-ID) + Gate-Ergebnisse
- `review_iter1_run1.md` — Didaktik-Review (5 Dimensionen, Paul)
