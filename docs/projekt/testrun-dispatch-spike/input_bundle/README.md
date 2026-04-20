# F0d Dispatch-Spike — Input-Bundle (v2.0)

**Erstellt:** 2026-04-20 (P0-Block gem. F0d_DISPATCH_SPIKE_PLAN.md §8)
**Status:** FROZEN fuer Runs A_1..3 + B_1..3. Keine Mutation nach Hashing.

## Dateien

| Datei | Zweck | SHA-256 |
|---|---|---|
| `bundle.md` | Master-Input, 11 Artefakte gem. §4.1 | `419c6440a4ebcf9959fc0eca59974f493d2a95104a72dfc5ab96a5533c417658` |
| `bundle_injected.md` | Fehler-Injektions-Variante (mono-perspektivischer `perspektiven_policy`, Rest identisch) | `f44fb3d0fd924adb02230089b6f0e55744e19873f197ebcfbcd68bc1d085a174` |
| `bundle_hash.txt` | Hash-Manifest (sha256 aller Bundle-Files) | — |
| `README.md` | dieses Dokument | — |

## Run-Plan

| Run | Input-Bundle | Erwartung QG-06 |
|---|---|---|
| `run_A_1` (Baseline, linear)         | `bundle.md`          | PASS (3-perspektivisch) |
| `run_A_2` (Baseline, injected)       | `bundle_injected.md` | FAIL (mono-perspektivisch) |
| `run_A_3` (Baseline, injected)       | `bundle_injected.md` | FAIL |
| `run_B_1` (Agent-Dispatch, isoliert) | `bundle.md`          | PASS |
| `run_B_2` (Agent-Dispatch, injected) | `bundle_injected.md` | FAIL |
| `run_B_3` (Agent-Dispatch, injected) | `bundle_injected.md` | FAIL |

M3 = Fail-Detection-Rate aus run_X_2 + run_X_3. Schwelle B ≥ A + 20 pp.

## Verifikation vor Run-Start

```bash
cd docs/projekt/testrun-dispatch-spike/input_bundle
sha256sum -c <(sed 's/$/ bundle.md/;s/^/bundle.md SHA /;q' bundle_hash.txt) 2>/dev/null || sha256sum bundle.md bundle_injected.md | diff - bundle_hash.txt && echo "INTEGRITY OK"
```

(Manuelle Pruefung: `sha256sum bundle.md bundle_injected.md` gegen `bundle_hash.txt` vergleichen.)

## Bundle-Inhalt (Abschnitte 0-11 in `bundle.md`)

0. Lese-Orientierung (Mapping auf 8-Step-Read-Protokoll)
1. MATERIAL_GERUEST-Row mat-4-3 (synthetisiert)
2. SEQUENZKONTEXT (Mappe 4)
3. hefteintrag.json-Slice (k4-3-relevant)
4. SUB_MATERIAL_QUELLENTEXT.md — **als Systemprompt Arm B wortgleich einbinden**
5. F0B_PRIMING_INCLUDE §1+§2+§3 (zwischen `[F0B_PRIMING_v1 BEGIN]` und `[F0B_PRIMING_v1 END]`)
6. SKRIPT-Chunk Mappe 4 §4+§5
7. INHALTSBASIS-Extrakte (F4-4 bis F4-9, A4-1/A4-2/A4-3, Fachbegriffe, Zahlen)
8. einstieg.json-Slice
9. ARTEFAKT_INVENTAR pq-4-1
10. DIDAKTIK_RAHMEN-Ausschnitt (Jgst/R7/Ethik)
11. perspektiven_policy-String (STR-05)

Abschnitt 11 ist in `bundle_injected.md` manipuliert; alle anderen Abschnitte sind byte-identisch (siehe Fussnote dort).

## Schema-Referenz

Output-Validation: `escape-game-generator/architektur/schemata/material-output-schema.json` (Draft7, `additionalProperties: false`, strict).
