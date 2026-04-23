# RUN_META — F0e-AEF Iteration-3

**Datum:** 2026-04-23
**Case:** mat-4-3 (Trothas Vernichtungsbefehl, Mappe 4) — identisch zu I1+I2
**Dispatch-Modus:** Arm-B-analog, 4× parallele fresher Agent-Envelopes via Task-Tool `general-purpose`
**Zweck:** Empirische Validierung Overlay v1.1 + Schema v3.10.3 gegen I1+I2 Baseline (n=4) per §19.7 Akzeptanzkriterien.

## Dispatch-Setup (alle 4 Runs identisch)

- Combined Dispatch Prompt (Overlay v1.1 + Agent-Kernpunkte + F0B-Priming + Bundle + Task):
  `runs/iteration-3/_shared_dispatch_prompt.md`
  - SHA256: `640fb89fe970be77911ee99b9b6315344d5176cb13d98b05b0d44d65ed9be381`
- Bundle-SHA (unveraendert I1+I2): `419c6440a4ebcf9959fc0eca59974f493d2a95104a72dfc5ab96a5533c417658`
- Pinned Schema Full v3.10.3: `f08df7ee4c81ae3f21ec90381de0a7fc9a1dffe160d686247ba228757196244c`
- Pinned Schema Partial v3.10.3: `0f3fe48e113de3f937e7f5997082069ac4525ff166307b282247501a9bdc6e38`
- Authoritative Agent-Datei unveraendert: `SUB_MATERIAL_QUELLENTEXT.md v3.10.4`.

## Dispatch-Metriken

| Feld | Run-1 | Run-2 | Run-3 | Run-4 |
|---|---|---|---|---|
| Agent-ID | ad65b022ce365c2f7 | a40f6380e9a047341 | ae9dcd0ad51136a07 | a2c816cf1a22f6f2a |
| Total Tokens | 49067 | 48991 | 49096 | 49077 |
| Dauer (ms) | 27177 | 23747 | 25675 | 25163 |
| Tool-Uses | 1 | 1 | 1 | 1 |
| Wortanzahl selbst-deklariert | 108 | 108 | 109 | 118 |

Wortanzahl-Varianz Max/Min: 118/108 = **1.09** (Soll <2.0 → PASS).
Mittel 110.75 W (I2-Mittel: 218 W → **-49.6 %**).
Tokens-Mittel 49057 (I2-Mittel: ca. 42800 → +15 % durch Overlay-v1.1-Umfang).
Dauer-Mittel 25441 ms (I2-Mittel: ca. 30100 ms → -15 %).

## Gate-Chain-Ergebnisse

| Run | Partial | Merge | Full | Gesamt |
|---|---|---|---|---|
| 1 | PASS (pinned_match True) | PASS | PASS (pinned_match True, 0 errors) | PASS |
| 2 | PASS (pinned_match True) | PASS | PASS (pinned_match True, 0 errors) | PASS |
| 3 | PASS (pinned_match True) | PASS | PASS (pinned_match True, 0 errors) | PASS |
| 4 | PASS (pinned_match True) | PASS | PASS (pinned_match True, 0 errors) | PASS |

**Schema-Pass-Rate I3:** 4 / 4 (100 %).
**Vergleich I2:** 2 / 3 (66.7 %). Differenz: +33.3 Punkte.

## Didaktik-Review (5-Dim, M-E5 ≥ 4)

| Run | Dim1 Einsatz | Dim2 Sprache | Dim3 Multiperspektive | Dim4 Trigger | Dim5 Quellen | Mittel | M-E5 |
|---|---|---|---|---|---|---|---|
| 1 | 5 | 5 | 4 | 5 | 5 | 4.8 | PASS |
| 2 | 4 | 5 | 4 | 5 | 5 | 4.6 | PASS |
| 3 | 5 | 4 | 4 | 5 | 5 | 4.6 | PASS |
| 4 | 4 | 4 | 4 | 4 | 5 | 4.2 | PASS |

**Didaktik-Mittel I3 (n=4):** (4.8 + 4.6 + 4.6 + 4.2) / 4 = **4.55** (Soll ≥ 4.0 → PASS).
**Didaktik-Min I3:** 4.2 (Soll ≥ 3.0 → PASS).
**Vergleich I2-Mittel:** 4.0 + 4.4 + 3.8 = 4.07. Differenz: **+0.48**.

## D-Defekt-Compliance (inkl. D6) + neue Overlay-v1.1-Checks

| Defekt/Check | R1 | R2 | R3 | R4 |
|---|---|---|---|---|
| D1 `perspektiv_tags` verboten | PASS | PASS | PASS | PASS |
| D2 `quellentyp` Enum | PASS (amtlich) | PASS (amtlich) | PASS (amtlich) | PASS (amtlich) |
| D3 `perspektive` String | PASS | PASS | PASS | PASS |
| D4 `inhalt` String | PASS | PASS | PASS | PASS |
| D5 Keine Dispatcher-Felder | PASS | PASS | PASS | PASS |
| D6 `quellenkritische_impulse` Array | PASS (3 Elem) | PASS (3 Elem) | PASS (3 Elem) | PASS (3 Elem) |
| Wortanzahl-Cap ≤ 180 | PASS (108) | PASS (108) | PASS (109) | PASS (118) |
| Wortanzahl-Richtcap ≤ 150 | PASS | PASS | PASS | PASS |
| M16 Prosa-Only (keine Aufgaben-Operatoren in `inhalt`) | PASS | PASS | PASS | PASS |
| M17 Quelle-SSOT (keine Nachweise in `<p>`) | PASS (cite=Attribution) | PASS | PASS | PASS |

**D-Defekt-Compliance I3:** 6/6 × 4/4 = **24/24 (100 %)**.
**Vergleich I2 D6:** 0/3 (I1+I2 Baseline-Defekt) → **+100 Punkte**.

## Patch-Zyklen

| Run | Partial-FAIL → Retry? | Retry-Resultat |
|---|---|---|
| 1 | Nein (Erstlauf PASS) | n/a |
| 2 | Nein (Erstlauf PASS) | n/a |
| 3 | Nein (Erstlauf PASS) | n/a |
| 4 | Nein (Erstlauf PASS) | n/a |

**Patch-Zyklen gesamt:** 0 (Soll ≤ 1 pro Run → PASS).

## Artefakt-Manifest

```
runs/iteration-3/
├── PLAN.md
├── RUN_META.md
├── _shared_dispatch_prompt.md      (SHA 640fb89f…)
├── run-1/
│   ├── subagent_response.md
│   ├── partial.json
│   ├── partial_gate_report.json
│   ├── merged.json
│   ├── merge_report.txt
│   ├── full_gate_report.json
│   └── review.md
├── run-2/ (idem)
├── run-3/ (idem)
└── run-4/ (idem)
```

## Status

v1.0 — I3 komplett. Aggregat-Befund siehe `BEFUND_I3.md`.
