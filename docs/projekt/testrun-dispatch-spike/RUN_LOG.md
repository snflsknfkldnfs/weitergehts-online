# F0d Dispatch-Spike — RUN_LOG (SSOT)

**Plan-Referenz:** `docs/projekt/F0d_DISPATCH_SPIKE_PLAN.md` v2.0 (commit-hash tba bei Freeze).
**Parent-Task:** #46 F0d Dispatch-Spike.
**Stand:** 2026-04-20 — P0 DONE / P1 FREEZE PENDING (Host-MCP).
**Zweck:** Compaction-safe Single-Source-of-Truth fuer Run-State, Bundle-Integritaet, Metriken-Matrix, Befund-Status. Diese Datei wird bei jedem P-Block-Uebergang inkrementell fortgeschrieben. Alle Referenzen sind Pfad+Hash, nicht Inhaltskopien.

---

## 0. Kontext-Reset (fuer Zukunft-Leser / Post-Compaction)

- **Hypothese (H1-H4):** (H1) Kontext-isolierte Cowork-Agent-Tool-Dispatches liefern geringere strukturelle Varianz als linear-gemeinsamer Orchestrator-Kontext. (H2) Fail-Detection-Rate des Q-Gates steigt bei Dispatch-Isolation um ≥ 20 pp. (H3) Token-Overhead ≤ 1.3 x. (H4) Schema-Konformitaet des Material-Outputs ist unabhaengig vom Dispatch-Modus reproduzierbar.
- **Methodik:** A/B, 3 Runs pro Arm, 2 von 3 Runs pro Arm mit Fehler-Injektion (nur `perspektiven_policy` mono-perspektivisch; Zitat pq-4-1 + Trigger-Kategorien + DIDAKTIK_RAHMEN-Ethik bleiben, R3-Mitigation).
- **Scope:** 1 Sub-Agent (`SUB_MATERIAL_QUELLENTEXT`), 1 Q-Gate (`QG-06 MULTIPERSPEKTIV` + `SCHEMA-01` + `MQ-STRICT`), 1 realer Fall `mat-4-3` aus `deutscher-nationalismus-kolonialismus/mappe-4`.
- **Dispatch-Layer:** Cowork Agent-Tool. CC-Handoff explizit ausgeschlossen (Prevent-First-Gate-Klasse).
- **Gating:** PASS = M1 + M3 + M4 + M6. MIXED = M1 + M3 ja, M4 nein. FAIL sonst.

---

## 1. Bundle-Manifest (FROZEN)

**Pfad:** `docs/projekt/testrun-dispatch-spike/input_bundle/`

| Datei | Bytes | SHA-256 | Zweck |
|---|---:|---|---|
| `bundle.md` | 18913 | `419c6440a4ebcf9959fc0eca59974f493d2a95104a72dfc5ab96a5533c417658` | Master-Input, 11 Artefakte gem. Plan §4.1 |
| `bundle_injected.md` | 2571 | `f44fb3d0fd924adb02230089b6f0e55744e19873f197ebcfbcd68bc1d085a174` | Fehler-Injektion (§11 mono-perspektivisch) |
| `bundle_hash.txt` | — | — | Hash-Manifest |
| `README.md` | 2596 | — | Run-Plan + Verifikations-Befehl |

**Integritaets-Check vor jedem Run:** `sha256sum bundle.md bundle_injected.md` gegen `bundle_hash.txt` → muss `INTEGRITY OK` liefern.

**Bundle-Inhaltsverzeichnis (bundle.md Abschnitte 0-11):**
0. Lese-Orientierung (Mapping auf 8-Step-Read-Protokoll gem. `VERTRAG_PHASE_2-1_MATERIAL.md`).
1. MATERIAL_GERUEST-Row `mat-4-3` (synthetisiert, typ/titel/skript_chunk/tafelbild_knoten/artefakt_ref/didaktische_funktion/voraussetzung).
2. SEQUENZKONTEXT: vorher `mat-4-2` (darstellungstext Weltpolitik/Marokkokrisen), nachher `mat-4-4` (bildquelle gefangene Herero); `VORAUSGESETZTES_WISSEN=[k4-1, k4-2, k4-4]`, `NOCH_NICHT_EINGEFUEHRT=[k4-3 (Ziel)]`.
3. `hefteintrag.json`-Slice Mappe 4: stundenfrage "Welche Folgen hatte der Wettlauf um Kolonien?", complication-Schritt Landraub, Ziel-Knoten `k4-3`, voraussetzungen `[k3-6]`.
4. `SUB_MATERIAL_QUELLENTEXT.md` (Systemprompt-Referenz — als Systemprompt Arm B wortgleich einbinden).
5. `F0B_PRIMING_INCLUDE.md` §1 SPRACHNIVEAU-R7 + §2 MATERIAL-PERSPEKTIV-01 + §3 TERMINOLOGIE-01 (zwischen `[F0B_PRIMING_v1 BEGIN]` und `[F0B_PRIMING_v1 END]`).
6. SKRIPT-Chunk Mappe 4 §4 + §5 (Vernichtungsbefehl-Wortlaut inkl. ARTEFAKT-Marker zit-4-1, zit-4-2, pq-4-1, pq-4-2, rolle-4-2).
7. INHALTSBASIS-Extrakte: §F4-4..§F4-9 (Fakten), §A4-1/A4-2/A4-3 (Maharero/Trotha/Witbooi), Fachbegriffe (Voelkermord, "Schutzgebiet", Vernichtungsbefehl, Landraub), Zahlen (Januar 1904 / 15.000 Soldaten / 1904-1908 / 65-80.000 Opfer / ca. 10.000 Nama / Mai 2021).
8. `einstieg.json`-Slice Mappe 4 (problemstellung).
9. ARTEFAKT_INVENTAR `pq-4-1` (Erlass, Trotha, Wortlaut, Wikipedia-DE-Herkunft, Ueberwaetigungsverbot-Warnung).
10. DIDAKTIK_RAHMEN: Jgst 9 Mittelschule R7, Stoffdichte 5, KE `GPG7_LB2_K_05`, AFB II-III, Ethische Hinweise (Multiperspektivitaet zwingend P3 Herero, Ueberwaeltigungsverbot, Sensibilitaet rassistischer Terminologie nur als Quelle/in Anfuehrungszeichen, Aktualitaetsbezug).
11. `perspektiven_policy` STR-05 (in `bundle.md`: drei Perspektiven P1/P2/P3; in `bundle_injected.md`: nur P1).

---

## 2. Run-Plan + State

| Run | Task | Arm | Input-Bundle | Erwartetes QG-06 | Status | Actual QG-06 | Schema-valid | Tokens | Artefakt-Pfad |
|---|---|---|---|---|---|---:|---:|---:|---|
| `run_A_1` | #52 | A (Baseline linear) | `bundle.md` | PASS (3-perspektivisch, P1+P2+P3) | **completed** | **PASS (self)** | **true (self)** | **21254** | `runs/A/A_1/` |
| `run_A_2` | #53 | A (Baseline linear) | `bundle_injected.md` | FAIL (mono-perspektivisch) | **completed** | **PASS (unexpected, self)** | **true (self)** | **20574** | `runs/A/A_2/` |
| `run_A_3` | #54 | A (Baseline linear) | `bundle_injected.md` | FAIL | **completed** | **FAIL (hit, self)** | **true (self, schema_01)** | **19693** | `runs/A/A_3/` |
| `run_B_1` | #55 | B (Agent-Dispatch isoliert) | `bundle.md` | PASS | **completed** | **PASS (isolated)** | **true (self)** | **35491** | `runs/B/B_1/` |
| `run_B_2` | #56 | B (Agent-Dispatch isoliert) | `bundle_injected.md` | FAIL | pending (blocked #55) | — | — | — | `runs/B/B_2/` |
| `run_B_3` | #57 | B (Agent-Dispatch isoliert) | `bundle_injected.md` | FAIL | pending (blocked #56) | — | — | — | `runs/B/B_3/` |

**Pro-Run-Artefakte (noch zu erzeugen):**
- `runs/<arm>/<run_id>/INPUT_MANIFEST.txt` — Liste Bundle-Pfad + SHA-256 + Priming-Envelope-Fingerprint.
- `runs/<arm>/<run_id>/GENERATOR_OUTPUT.json` — Material-JSON (muss gegen `material-output-schema.json` Draft7 strict validieren).
- `runs/<arm>/<run_id>/QGATE_RETURN.json` — QG-06-Return (MULTIPERSPEKTIV + SCHEMA-01 + MQ-STRICT + MQ1-MQ6 + M1-M12 + TYP-QUELLENTEXT).
- `runs/<arm>/<run_id>/RUN_META.json` — `{ start_ts, end_ts, tokens_in, tokens_out, dispatch_mode, notes }`.

**QG-06-Erwartungsdetail (mono-perspektivisch):** `bundle_injected.md` enthaelt `perspektiven_policy` mit nur `P1` → QG-06-Checker muss FAIL liefern, weil Trigger-Kategorien `Kolonisierung` + `Gewalt` aktiv sind und M4-Invariante "mind. 2 nicht-dominante Tags" unerfuellbar ist. Generator-Verhalten selbst kann abweichen (Priming §2 MATERIAL-PERSPEKTIV-01 koennte P3 trotzdem erzeugen) — das ist Stress-Test-Gegenstand.

---

## 3. P-Block Checkpoints

| P-Block | Task | Status | Abschluss-Kriterium | Delta-Pfad |
|---|---|---|---|---|
| P0 Bundle-Beschaffung | #50 | completed 2026-04-20 | 4 Files in `input_bundle/` + SHA-256-Manifest | `input_bundle/*` |
| P1 Freeze (atomic Host-MCP Commit) | #51 | in_progress | Commit-SHA auf main + push ok | `input_bundle/*` + `RUN_LOG.md` + `STATUS.md` + `CHANGELOG.md` + auto-memory |
| P2 Arm A Runs 1-3 | #52-#54 | pending | 3 x `runs/A/*/OUTPUT + QGATE + META` + Schema-Validation | `runs/A/*` |
| P3 Arm B Runs 1-3 | #55-#57 | pending | 3 x `runs/B/*/OUTPUT + QGATE + META` + Schema-Validation | `runs/B/*` |
| P4 Metriken M1-M8 | #58 | pending | `METRICS.md` mit Werten + Schwellen-Check | `METRICS.md` |
| P5 BEFUND | #59 | pending | `F0d_BEFUND.md` PASS/FAIL/MIXED mit §12-Checkliste-Status | `F0d_BEFUND.md` |
| P6 Close | #60 | pending | STATUS + CHANGELOG + Task #46 completed + ggf. #48/#39 entblockt | `STATUS.md` + `CHANGELOG.md` |

---

## 4. Metriken-Matrix (leer-vorbereitet)

| ID | Metrik | Schwelle | Arm A (3 Runs) | Arm B (3 Runs) | Gating |
|---|---|---|---|---|---|
| M1 | Strukturelle Varianz (JSON-Key-Set-Stabilitaet) | B ≤ A | — | — | ja |
| M2 | Inhaltliche Varianz (informativ, Cosine o.ae.) | informativ | — | — | nein |
| M3 | Q-Gate-Fail-Detection-Rate (aus 2/3 injected) | B ≥ A + 20 pp | — /2 | — /2 | ja |
| M4 | Token-Verbrauch (gesamt pro Run) | B ≤ 1.3 x A | — | — | ja |
| M5 | Rueckmelde-Luecken (Anzahl Self-Check-Bias-Indikatoren) | B ≤ A | — | — | nein |
| M6 | Schema-Konformitaet (Draft7 strict, ohne Patch) | 3/3 pro Arm | — | — | ja |
| M7 | Q-Gate-Coverage (MULTIPERSPEKTIV + SCHEMA-01 + MQ-STRICT + MQ1-6 + M1-12 + TYP-QUELLENTEXT) | alle adressiert | — | — | nein |
| M8 | Realitaetsnaehe (§12-Checkliste 7 Boxes) | ≥ 6/7 | — | — | ja |

---

## 5. Risiken-Status (R1-R5, Plan §11)

| Risiko | Mitigation | Status |
|---|---|---|
| R1 Prompt-Envelope-Asymmetrie Arm A vs B | Bundle identisch, Priming-Include byte-gleich, Unterschied NUR Dispatch-Modus | ok (Bundle frozen) |
| R2 Q-Gate-Checker-Bias | Arm B: separater Task-Call mit frischem Kontext; Arm A: dokumentierter Self-Check-Modus | mitigation aktiv in Run-Design |
| R3 Fehler-Injektion zu destruktiv (Trivial-FAIL) | Nur Policy-String reduziert, Zitat + Trigger + DIDAKTIK-Ethik unveraendert | ok (verifiziert bundle_injected.md) |
| R4 Schema-Validator-Abhaengigkeit | Draft7-Validator-Pfad: `escape-game-generator/architektur/schemata/material-output-schema.json` | offen (Validator-Call in P2/P3 einbauen) |
| R5 Bundle-Drift zwischen Runs | Pre-Freeze-Commit + SHA-256-Check vor jedem Run | in_progress (P1 Freeze pending) |

---

## 6. Befund-Platzhalter

**PASS/FAIL/MIXED:** _unbefuellt_
**§12 Realitaetsnaehe-Checkliste (7 Boxes):** _unbefuellt_
**Follow-Up:** PASS → Task #48 F0g entblocken. FAIL → PI-DISPATCH-Items DEFERRED, UPGRADE_PLAN §20-Nachtrag. MIXED → F0g reduziert (nur Q-Gates).

---

## 7. Event-Log

| Timestamp | P-Block | Ereignis | Ref |
|---|---|---|---|
| 2026-04-20 | P0 | Bundle-Beschaffung abgeschlossen, 4 Files geschrieben, SHA-256-Manifest erzeugt | `input_bundle/bundle_hash.txt` |
| 2026-04-20 | P1 | PM-Verankerungs-Paket angelegt (Tasks #50-#60 mit Dependencies, RUN_LOG, STATUS-Patch, CHANGELOG, auto-memory) | siehe Freeze-Commit |
| 2026-04-20 22:09 CEST | P1 | Freeze-Commit via Host-MCP: 7 Files (+621/-15), commit `7968f5ab5d8f3ba2a30230634ef890451b7c33d5` auf `origin/main`, Bundle-Integrity SHA-Check OK | commit 7968f5a |
| 2026-04-20 22:12 CEST | P1b | Plan v2.0 -> v2.1 Methodik-Haertung (R6/R7/R8, Dispatch-Symmetrie) + RUN_LOG-Event-Log, commit `ec5115d` auf `origin/main` | commit ec5115d |
| 2026-04-20 22:16 CEST | P2 | Run A_1 (bundle.md, Agent-Tool general-purpose, 1 Call vereinigt): Material-JSON + QG-06 PASS self-declared, schema_01_pass true, mq_strict_pass true, 21254 Tokens, 46.5s, P1+P3-Perspektiv-Gegenueberstellung explizit. actual_qgate=PASS (erwartet PASS). Self-Declared Schema-Compliance; formale Validation in P4 | `runs/A/A_1/` |
| 2026-04-20 22:18 CEST | P2 | Run A_2 (bundle_injected.md, Agent-Tool general-purpose, 1 Call vereinigt): Material-JSON + QG-06 PASS self-declared, schema_01_pass true, mq_strict_pass true, 20574 Tokens, 48.3s. **actual=PASS vs expected FAIL → FAIL-DETECTION-MISS dokumentiert.** Generator produzierte trotz mono-perspektivischer Policy ein multi-perspektivisches Material (Priming + DIDAKTIK > Policy), Self-Checker PASSte weil intra-call nur Text-Merkmale geprueft wurden. Policy-Abweichung als mq_strict_findings explizit markiert. Arm-A Self-Check-Bias-Effekt (Plan §6 R3-Hypothese) empirisch bestaetigt. Strukturelle Varianz vs A_1: sequenz_kontext object vs string, erarbeitbarkeits_check object vs string, perspektive array vs string → M1-Datenpunkt intra-Arm. | `runs/A/A_2/` |
| 2026-04-20 22:21 CEST | P2 | Run A_3 (bundle_injected.md, Agent-Tool general-purpose, 1 Call vereinigt): Material-JSON + QG-06 FAIL self-declared, schema_01_pass true, mq_strict_pass **false**, 19693 Tokens, 42.4s. **actual=FAIL matched expected FAIL → FAIL-DETECTION-HIT.** Generator folgte Policy literal (perspektiv_tags = nur Dominant-Pool), Self-Check lieferte MQ-M4-COVERAGE-FAIL + MQ-POLICY-DIDAKTIK-KONFLIKT + MQ-STR-05-FEHLEND. Kontrast zu A_2: A_2-Generator uebersteuerte Policy (multi-Persp) -> PASS (Miss); A_3-Generator befolgte Policy (mono-Persp) -> FAIL (Hit). Arm-A-Inkonsistenz dokumentiert. M3 Arm A = 1/2 = 50 pp bisher. Starker M1-Datenpunkt: Material-JSON-Shape erneut abweichend (flat Top-Level mit game_id/mappe/position; inhalt als strukturiertes Objekt statt HTML-Blob wie A_1/A_2). | `runs/A/A_3/` |
| 2026-04-20 22:24 CEST | P3 | Run B_1 (bundle.md, Agent-Tool general-purpose, 2 getrennte Task-Calls): Generator-Call-1 18394 Tok/30.0s (agent a15661009d5302d00) + Checker-Call-2 17097 Tok/21.3s (agent a145f41d8f1c3c590). actual=PASS matched expected PASS. schema_01_pass=true, mq_strict_pass=true. 4 informative Findings. Generator lieferte perspektiv_tags [Opfer, Widerstand, Macht-Ausuebung, Macht-Betroffen, Innen] (4 nicht-dominant) + perspektiven_kontext-Array mit allen 3 Bundle-§11-Perspektiven P1/P2/P3 explizit. Isolierter Checker verifizierte ohne Generator-Kontext. Total 35491 Tok = 1.67x run_A_1 → M4-Token-Overhead-Indikator deutlich ueber 1.3x-Schwelle. Material-JSON-Shape wieder anders (flach-inhalt-Objekt + Top-Level-aufgabenstellung). | `runs/B/B_1/` |

---

**Ende RUN_LOG v1.0.** Fortschreibung bei jedem P-Block-Uebergang Pflicht.
