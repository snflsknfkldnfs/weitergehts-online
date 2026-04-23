# F0e-AEF — Iteration-3 PLAN

**Version:** v1.0 (2026-04-23)
**Zweck:** Empirische Validierung von Overlay v1.1 (Phase 19.A P1-Cluster) gegen Baseline I1+I2 (n=4).
**Track:** `f0e-aef-pi-integration-par-19`
**Status:** in_progress

---

## 1. Hypothese

Overlay v1.1 + Schema v3.10.3 (wortanzahl.maximum=180) eliminiert D6 vollstaendig, reduziert Wortanzahl-Varianz signifikant und haelt Didaktik-Niveau ≥ Baseline.

## 2. Fixierte Bedingungen

| Parameter | Wert |
|---|---|
| Case | `mat-4-3` Trothas Vernichtungsbefehl (identisch I1+I2) |
| n | 4 (Run-1..Run-4) |
| Dispatch-Modus | Task-Tool `general-purpose`, fresher Agent-Envelope pro Run |
| Input-Bundle | unveraendert, SHA `419c6440a4ebcf9959fc0eca59974f493d2a95104a72dfc5ab96a5533c417658` |
| Overlay | **v1.1** (`gate-prototype/overlays/PROMPT_HARDENING_QUELLENTEXT_v1-1.md`) |
| Full-Schema | **v3.10.3** (SHA `f08df7ee4c81ae3f21ec90381de0a7fc9a1dffe160d686247ba228757196244c`) |
| Partial-Schema | **v3.10.3** (SHA `0f3fe48e113de3f937e7f5997082069ac4525ff166307b282247501a9bdc6e38`) |
| Authoritative Agent-Datei | `agents/SUB_MATERIAL_QUELLENTEXT.md` v3.10.4 — NICHT veraendert |
| Dispatch-Prompt | `runs/iteration-3/_shared_dispatch_prompt.md` SHA-256 `640fb89fe970be77911ee99b9b6315344d5176cb13d98b05b0d44d65ed9be381` |

## 3. Vor-Arbeit (PASS vor Run-Start)

- [x] Schema v3.10.3 Full + Partial angelegt, Pin-Hashes in `PROVENANCE.md` dokumentiert.
- [x] Validator `scripts/validate_material_output.py` auf `PINNED_SCHEMA_HASH=f08df7ee…` gepatcht.
- [x] Smoke-Test: `smoke_merged_mat-4-3.json` → PASS (pinned_match:True, 0 err). Synthetischer Bad-Input (wortanzahl=190, impulse=String) → FAIL mit 2 Errors (CONSTRAINT_VIOLATION + WRONG_TYPE).
- [x] Dispatch-Prompt v2 geschrieben + SHA gepinnt (`640fb89f…`).
- [x] run-1..run-4 Unterverzeichnisse angelegt.

## 4. Akzeptanzkriterien (§19.7 UPGRADE_PLAN v3-12)

**PASS-Bedingungen (alle muessen erfuellt sein):**

| Metrik | Baseline I1+I2 (n=4) | PASS-Schwelle I3 (n=4) |
|---|---|---|
| Schema-Pass-Rate (Full-Gate) | 3/4 = 75 % | **4/4 = 100 %** |
| D6-Inzidenz | 1/4 = 25 % | **0/4 = 0 %** |
| Wortanzahl-Cap ≤ 180 | nicht enforced; tatsaechlich 3/4 unter 180 (98/158/218/268) | **4/4 ≤ 180** (Gate-enforced) |
| Wortanzahl-Varianz (Max/Min) | Faktor 2.7 | **< 2.0** |
| Didaktik-Mittelwert ≥ 4.0 | 4.15 | **≥ 4.0** |
| Didaktik-Minimum ≥ 3.0 | 3.8 | **≥ 3.0** (keine extremen Ausreisser) |
| Patch-Zyklen M-E6 | 0 | **≤ 1** pro Run |
| Overlay-Compliance D1-D5 | 4/4 = 100 % | **4/4 = 100 %** (Regression-Check) |

**MIXED-Bedingung:**
- Schema-Pass-Rate 3/4 ODER Didaktik-Mittel 3.8-3.99 ODER Varianz 2.0-2.5.
- Folge: Overlay v1.2 mit gezielten Nachbesserungen, I4 mit n=2 nur betroffene Subjekte.

**FAIL-Bedingung:**
- Schema-Pass-Rate ≤ 2/4 ODER Didaktik-Mittel < 3.8 ODER Wortanzahl-Cap <3/4 ODER D6-Inzidenz ≥ 1/4.
- Folge: Strukturfrage — bleibt Overlay-Pattern tragfaehig oder Schema-Promotion in Generator-Repo?

## 5. Abbruch-Regeln waehrend Dispatch

- Run wird als FAIL persistiert, wenn Partial-Gate nach 2 Retries weiterhin FAIL liefert.
- Sofortiger Abbruch aller weiteren Runs, wenn Run-1 UND Run-2 beide Didaktik < 3.0 liefern (Overlay v1.1 strukturell ungeeignet).
- Bei Gate-Tooling-Fehler (jsonschema-Crash): Run annullieren, Tooling-Fix vor Wiederaufnahme.

## 6. Dispatch-Flow je Run

1. Task-Tool `general-purpose` mit Dispatch-Prompt v2 + kurzer Run-Identifier.
2. Subagent liefert Partial-JSON → `run-N/subagent_response.md` + extrahiertes `run-N/partial.json`.
3. `validate_material_output.py --schema schemas/material_quellentext_partial_v3.10.3.json run-N/partial.json` → `run-N/partial_gate_report.txt`.
4. `merge_material.py` Dispatcher-Felder ergaenzen → `run-N/merged.json`.
5. `validate_material_output.py run-N/merged.json` → `run-N/full_gate_report.txt`.
6. Didaktik-Review 5-Dim + D-Defekt-Check + Wortanzahl-Cap + Multiperspektiv-Impuls → `run-N/review.md`.

## 7. Daten-Erhebung pro Run

| Feld | Wo |
|---|---|
| Agent-ID, Token, Dauer, Tool-Uses | `RUN_META.md` Dispatch-Metriken-Tabelle |
| Wortanzahl selbst-deklariert | `RUN_META.md` |
| Schema-Pass Partial/Merge/Full | `RUN_META.md` + run-N Reports |
| Didaktik-Score Dim1..Dim5 + Mittel | `RUN_META.md` + `run-N/review.md` |
| D1-D5 Compliance | `RUN_META.md` |
| D6 Inzidenz | `RUN_META.md` |
| Wortanzahl-Cap 180 Compliance | `RUN_META.md` |
| Patch-Zyklen | `RUN_META.md` |

## 8. Aggregat (Task #22)

- `BEFUND_I3.md` mit Vergleichs-Tabelle Baseline vs. I3.
- PASS/MIXED/FAIL-Entscheid gemaess §4.
- Ableitungen fuer Phase 19.B (PI 3.5/3.6b/3.8) + ggf. Overlay v1.2.
- Empfehlung zur Promotion Schema v3.10.3 in Generator-Repo.

## 9. Out-of-Scope I3

- Phase 19.B PI-Items (Zielgruppe / Datenfluss / Vorentlastung).
- Phase 19.C PI-Items (Enum-Enforcement / Nachweis-Dramaturgie / Meta-Bezeichnung).
- Zweiter Case (mat-3-2 o.ae.) — verworfen nach Paul-Entscheidung E2=Z.
- Schema-Promotion in Generator-Repo — separater Track nach I3-PASS.

## 10. Referenzen

- Overlay v1.1: `gate-prototype/overlays/PROMPT_HARDENING_QUELLENTEXT_v1-1.md`
- Schemas v3.10.3: `gate-prototype/schemas/material_quellentext_v3.10.3.json` + Partial
- PROVENANCE: `gate-prototype/schemas/PROVENANCE.md`
- Baseline-Varianz-Report: `runs/iteration-2/varianz_report.md` + `runs/iteration-2/RUN_META.md`
- UPGRADE_PLAN §19: `weitergehts-online main` Worktree + `claude/silly-shirley`
- PI-Items final: `F0e_PI_ITEMS_FINAL.md`

---

**Status-Zeile:** v1.0, 2026-04-23, PLAN — Run-Start nach Task #15 Dispatch-Prompt v2 Write.
