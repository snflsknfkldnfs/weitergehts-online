# RUN_META — F0e-AEF Iteration-1

**Datum:** 2026-04-21
**Case:** mat-4-3 (Trothas Vernichtungsbefehl, Mappe 4)
**Dispatch-Modus:** Arm-B-analog, fresher Agent-Envelope via Task-Tool `general-purpose`

## Dispatch-Metriken

| Feld | Wert |
|---|---|
| Agent-ID | `afa61d60d18c09a51` |
| Total Tokens | 24642 |
| Dauer | 19691 ms (~19.7 s) |
| Tool-Uses durch Subagent | 0 |
| Rueckgabeformat | JSON-Codeblock in Response-Text |

## Systemprompt-Stack (tatsaechlich uebergeben)

1. Overlay `PROMPT_HARDENING_QUELLENTEXT.md` v1.0 — §0 + §1 D1-D5 + §2 Schema-Excerpt + §3 Selbstpruefung + §4 + §5 wortgleich.
2. Authoritative Agent-Datei `SUB_MATERIAL_QUELLENTEXT.md` — kondensiert (Kernpunkte + Output-Feld-Regeln + Q-Gates); nicht wortgleich alle 306 Zeilen, sondern auf Dispatch-Relevantes reduziert.
3. F0B Priming `F0B_PRIMING_INCLUDE.md` §1 + §2 + §3 — wortgleich plus expliziter **Hinweis Overlay D1** in §2 (perspektiv_tags VERBOTEN trotz Priming-Deklaration).

Input-Bundle: `testrun-dispatch-spike/input_bundle/bundle.md` (SHA `419c6440...`, im Task-Prompt inline verkuerzt um redundante Abschnitte 4+5, Kernsubstanz erhalten).

## Gate-Chain-Ergebnisse

| Stufe | Script | Schema | SHA-Pin | Errors | Exit |
|---|---|---|---|---|---|
| Partial-Gate | `validate_material_output.py --schema material_quellentext_partial_v3.10.2.json` | partial v3.10.2 | n/a (partial, pinned_match False by design) | 0 | 0 |
| Merge | `merge_material.py --partial partial.json --context dispatcher_context_mat-4-3.json` | — | — | 0 (no collisions) | 0 |
| Full-Gate | `validate_material_output.py` (implicit full schema) | full v3.10.2 | `632d7b4771bf19f007f66fb5442d1f6678cff50b6cade3fac7819c3522a41ffa` (pinned_match True) | 0 | 0 |

**Gate-Status:** PASS auf allen drei Stufen.

## Overlay-Compliance-Check (5-Punkte, §3 Overlay)

| # | Pruefpunkt | Ergebnis |
|---|---|---|
| 1 | Top-Level genau `{inhalt, quelle, _meta}` | ja (keine Dispatcher-Felder im Subagent-Output) |
| 2 | `_meta` nur Whitelist-Felder (§1-D1) | ja (alle 10 Felder innerhalb Whitelist) |
| 3 | `_meta.quellentyp` ∈ 9-Enum | ja (`"amtlich"`) |
| 4 | `_meta.perspektive` String | ja |
| 5 | `inhalt` String | ja (HTML-String) |

**D-Defekt-Check gegen F0d (6-Run-Baseline):**

| Defekt | F0d-Failrate | Iteration-1 |
|---|---|---|
| D1 `perspektiv_tags` in `_meta` | 6/6 FAIL | nicht gesetzt → PASS |
| D2 `quellentyp` Alt-Werte | 4/6 FAIL | `"amtlich"` → PASS |
| D3 `perspektive` als Array | 1/6 FAIL | String → PASS |
| D4 `inhalt` als Objekt | 3/6 FAIL | String → PASS |
| D5 Dispatcher-Felder im Top-Level | 4/6 FAIL | keine → PASS |

## Beobachtungen fuer Befund

- **Shadow-Overlay funktioniert:** Strukturelle Haertung ohne Aenderung der authoritativen Agent-Datei wirksam durchgesetzt. Der explizite D1-Hinweis im Priming-§2 (perspektiv_tags trotz Priming verboten) reicht, um den Konflikt zu loesen.
- **Zweistufiges Gate validiert:** Partial-Gate faengt Subagent-Ownership-Verstoesse ab, Full-Gate bestaetigt Gesamt-Schema-Compliance nach Dispatcher-Merge.
- **Semantische Qualitaet unabhaengig zu pruefen:** Schema-PASS sagt nichts ueber Didaktik. Review §10 ist separater Schritt.
- **Subagent hat `<strong>Denk nach:</strong>`-Block im `inhalt` ergaenzt:** didaktisch plausibel (fusst Impuls-Fragen direkt am Text an), aber M2-Pflicht? Siehe Review.
- **Unbekannte oder unscharfe Bereiche:** `erarbeitbarkeits_check` wird als dichter Prosa-Text geliefert (Schema: `type: string`, kein PASS/FAIL-Enum im v3.10.2). Future-Haertung in PI-SCHEMA-STRICT-01 erwaegen.

## Dauer-Budget-Tracking (gegen Plan §7)

| Phase | Plan-Budget | Ist |
|---|---|---|
| P2 I1 Dispatch | 30 min | ~1 min (Agent-Envelope-Vorbereitung inline) |
| Partial + Merge + Full | n/a | < 1 s kumulativ |
| P3 Didaktik-Review | 20 min | ausstehend (Paul-Ownership) |

Budget fuer P4 I2 n=3 Varianz: geoeffnet, wenn Review ≥ 4/5.

## Naechster Schritt

Didaktik-Review gemaess Plan §10 Protokoll (5 Dimensionen, Skala 1–5, Schwelle ≥ 4). Review-Artefakt: `review_iter1_run1.md`. Inhaltsvorlage siehe Template-Datei.
