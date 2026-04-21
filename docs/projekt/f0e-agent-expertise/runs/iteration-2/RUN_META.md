# RUN_META — F0e-AEF Iteration-2

**Datum:** 2026-04-21
**Case:** mat-4-3 (Trothas Vernichtungsbefehl, Mappe 4) — identisch zu I1
**Dispatch-Modus:** Arm-B-analog, 3× parallele fresher Agent-Envelopes via Task-Tool `general-purpose`
**Zweck:** R-E8 Modell-Varianz — pruefen ob I1-Ergebnis (1/1 Schema+Didaktik PASS) ueber n=3 reproduziert.

## Dispatch-Setup (alle 3 Runs identisch)

- Combined Dispatch Prompt (Overlay + Agent-Kernpunkte + F0B-Priming + Bundle + Task):
  `runs/iteration-2/_shared_dispatch_prompt.md`
  - SHA256: `af89515fc53ce511646682ce7b3e737162da01105dd30544daa74410f85193e5`
  - 539 Zeilen, 29639 Byte
- Jeder Subagent: 1× Read-Tool-Call (Dispatch-Prompt), danach JSON-Return (anders als I1 wo Prompt inline war → +1 Tool-Use pro Run).
- Bundle-SHA unveraendert: `419c6440a4ebcf9959fc0eca59974f493d2a95104a72dfc5ab96a5533c417658`.

## Dispatch-Metriken

| Feld | Run-1 | Run-2 | Run-3 |
|---|---|---|---|
| Agent-ID | `a49b5e3286b8fc83b` | `a92663d39cfdc4614` | `ae69e834614b71e43` |
| Total Tokens | 42608 | 42576 | 42939 |
| Dauer (ms) | 31511 | 36228 | 37852 |
| Tool-Uses | 1 | 1 | 1 |
| Wortanzahl selbst-deklariert | 218 | 158 | 268 |

## Gate-Chain-Ergebnisse

| Run | Partial | Merge | Full | Gesamt |
|---|---|---|---|---|
| 1 | PASS (0 err, pinned_match False by design) | OK (0 Kollisionen) | PASS (0 err, pinned_match True) | **PASS** |
| 2 | PASS | OK | PASS | **PASS** |
| 3 | **FAIL** (WRONG_TYPE `_meta/quellenkritische_impulse` String statt Array) | produziert zur Vollstaendigkeit | **FAIL** (gleicher Error propagiert) | **FAIL** |

**Schema-Pass-Rate I2:** 2/3.
**Kombiniert I1+I2:** 3/4 = 75 %.

## Didaktik-Review §10 (SELF — alle n=3)

| Run | Dim1 | Dim2 | Dim3 | Dim4 | Dim5 | Mittel | M-E5 ≥ 4 |
|---|---|---|---|---|---|---|---|
| 1 | 3 | 3 | 4 | 5 | 5 | 4.0 | PASS an Schwelle |
| 2 | 4 | 4 | 4 | 5 | 5 | 4.4 | PASS |
| 3 | 2 | 3 | 4 | 5 | 5 | 3.8 | **FAIL** |

**Didaktik-Mittel I2 (n=3):** (4.0 + 4.4 + 3.8) / 3 = **4.07** → knapp ueber Schwelle.
**Kombiniert I1+I2 (n=4):** (4.4 + 4.0 + 4.4 + 3.8) / 4 = **4.15**.

## Overlay-Compliance-Check (5-Punkte §3 Overlay) — alle 3 Runs

| # | Pruefpunkt | R1 | R2 | R3 |
|---|---|---|---|---|
| 1 | Top-Level `{inhalt, quelle, _meta}` | ja | ja | ja |
| 2 | `_meta` nur Whitelist-Felder | ja | ja | ja |
| 3 | `_meta.quellentyp` ∈ 9-Enum | ja (amtlich) | ja (amtlich) | ja (amtlich) |
| 4 | `_meta.perspektive` String | ja | ja | ja |
| 5 | `inhalt` String | ja | ja | ja |

**Alle 3 Runs Overlay-konform bzgl. D1-D5.** Run-3 FAIL entsteht NICHT durch eine der 5 adressierten Defekt-Klassen, sondern durch einen **neuen Defekt D6 (WRONG_TYPE innerhalb Whitelist-Feld)**.

## D-Defekt-Check I2 vs. F0d-Baseline

| Defekt | F0d-Failrate | I1 | I2 R1 | I2 R2 | I2 R3 |
|---|---|---|---|---|---|
| D1 `perspektiv_tags` | 6/6 | PASS | PASS | PASS | PASS |
| D2 `quellentyp` Alt-Werte | 4/6 | PASS | PASS | PASS | PASS |
| D3 `perspektive` Array | 1/6 | PASS | PASS | PASS | PASS |
| D4 `inhalt` Objekt | 3/6 | PASS | PASS | PASS | PASS |
| D5 Dispatcher-Felder | 4/6 | PASS | PASS | PASS | PASS |
| **D6 (neu) `quellenkritische_impulse` WRONG_TYPE** | nicht in F0d | PASS | PASS | PASS | **FAIL** |

**Kernbefund:** Overlay eliminiert F0d-Defekte D1-D5 vollstaendig (4/4 Runs). D6 ist ein neu sichtbarer Schema-Gate-Catch, NICHT Overlay-Scope.

## Beobachtungen fuer Befund

- **Shadow-Overlay-Mechanismus:** Strukturelle Haertung ueber D1-D5 funktioniert reproduzierbar (4/4 Runs). Kein Regress auf F0d-Muster.
- **Schema-Gate als Safety-Net:** Run-3 zeigt, dass das zweistufige Gate echten Nutzen hat — faengt einen Defekt ab, den das Overlay nicht adressiert.
- **Content-Varianz hoch:** Wortanzahl 98 (I1) / 158 (R2) / 218 (R1) / 268 (R3). Faktor 2.7 zwischen Min und Max bei identischem Prompt. Didaktische Laengen-Disziplin ist **nicht ueber Overlay geschuetzt**.
- **Multiperspektivitaets-Schwaeche persistiert:** Alle 4 Runs lagern P3-Perspektive in Impuls-Fragen aus, statt sie im Einleitungs-/Nachweis-Block explizit zu formulieren. Didaktisch grenzwertig, nicht Schema-Verletzung.
- **Custom trigger_flags:** R2 (`Ueberwaeltigungsverbot_sensibel`) + R3 (`Ueberwaeltigungsverbot-sensibel`, `Primaerquellen-Ausnahme-aktiv`) liefern Eigen-Tags. Schema erlaubt (items: string). Fuer Cross-Run-Interoperabilitaet eventuell Enum-Verengung in PI-SCHEMA-STRICT-01 pruefen.

## Abgeleitete Items fuer F0e-Befund + PI

1. **PI-SCHEMA-STRICT-01 (offen):** Overlay-Promotion weiterhin empfohlen. Zusaetzlich D6-Hardening ueberlegen: explizite `quellenkritische_impulse: array` Regel in Overlay §1.
2. **PI-CONTENT-LENGTH-01 (neu):** Didaktische Wortanzahl-Grenze (z.B. `wortanzahl <= 150`) als Q-Gate statt nur Schema-`minimum`. Offen: ob in Overlay, PI, oder Post-Gen-Scan.
3. **PI-MULTIPERSPEKTIVE-INHALT-01 (neu, schwach):** P3-Perspektive im `inhalt` explizit erzwingen, nicht nur im Impuls. Kandidat fuer didaktisches Q-Gate, kein Schema-Gate.
4. **PI-TRIGGERFLAG-ENUM-01 (optional):** `trigger_flags` auf Enum verengen fuer Cross-Material-Konsistenz.

## Dauer-Budget-Tracking

| Phase | Plan-Budget | Ist I2 |
|---|---|---|
| P4 I2 Dispatch (3 parallele) | 30 min | ~2 min (Parallel-Burst inline) |
| Partial + Merge + Full (3×) | n/a | < 3 s kumulativ |
| Review (3×) | 20 min | inline |

## Naechster Schritt

- Varianz-Report (`varianz_report.md`) schreiben
- F0e-Befund (`F0e_AGENT_EXPERTISE_BEFUND.md`) aufsetzen mit Ergebnis + PI-Items
- STATUS + CHANGELOG + Memory Update
- I2-Commit vorbereiten
