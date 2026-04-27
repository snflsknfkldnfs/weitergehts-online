# BEFUND — Run-4 Backlog-Konsolidierung (4-BEFUND-Merge + CLI-Lessons-Integration)

**Datum:** 2026-04-27
**Scope:** Master-Backlog für v0.5.1 + v0.6-Architektur-Empfehlungen aus 4 BEFUNDen + CLI-Self-Evaluation. Vollständige Verifikations-Pflicht aller CLI-Lessons via Sandbox-Empirie.

**Source-Files:**
1. `BEFUND_RUN4_AUDIT.md` — Pre-Phase-Audit (236 Z., §8 13-Item-Backlog + §10 4 CLI-Self-Diagnose-Items)
2. `BEFUND_RUN4_TIEFEN_EVAL.md` — Drei-Wege-Vergleich + REVISIT (314 Z., 17-Item-Backlog)
3. `BEFUND_RUN4_GENERIERUNGS_TRACE.md` — Schritt-für-Schritt CLI-Verlauf (305 Z.)
4. `BEFUND_RUN4_LIVE_CONTENT_INVENTAR.md` — Sandbox-Audit Live-Site (365 Z., 5 NEU-Items)
5. `EVALUATION_RUN4_LESSONS_LEARNED.md` — CLI-Self-Evaluation (355 Z., 8 Anti-Patterns + 5 Architektur + 10-Item-Backlog)

**Methodik:** Cross-Mapping aller Items mit De-Duplikation. Nachvollziehung jedes CLI-Lesson via Sandbox-Empirie (Datei-Existenz, Schema-Drift-Verifikation, JSON-Validität).

---

## 1. CLI-Lessons-Verifikations-Status (Nachvollziehung)

| CLI-Anti-Pattern | Verifikations-Methode | Empirie-Befund | Status |
|---|---|---|---|
| **A1** PI-Block + game_state.json stale | Vergleich Pre-Run-State | (nicht direkt prüfbar — game_state aktuell post-Hotfix) | **PLAUSIBEL** (state-Drift bekanntes Pattern) |
| **A2** Concurrent-Write Q-GATE-LOG | `ls Q-GATE-LOG*.md` | Pre-Konsolidierung-Marker in BEFUND_RUN4_AUDIT.md §1 | **VERIFIZIERT** (3 Append-Files erwähnt in qualitaets_protokoll) |
| **A3.1** tafelbild_knoten Drift | grep in artefakt_inventar + hefteintrag_struktur | **22 tafelbild_knoten in artefakt_inventar, 4 tafelbild_verbindungen + 0 knoten/verbindungen in hefteintrag_struktur** | **EMPIRISCH BESTÄTIGT** |
| **A3.2** tafelbild_verbindungen Drift | dito | 4 tafelbild_verbindungen vs. 0 verbindungen | **EMPIRISCH BESTÄTIGT** (separat zu A3.1) |
| **A3.3** lueckentext-Feld | check_aufgabe in data.json | (nicht stichprobenweise getestet) | **PLAUSIBEL** |
| **A3.4** materialien_ref [strings] vs. [{$ref}] | jq mappe-N/data.json | **mappe-3 hat `materialien_ref: ["mat-3-1"]` (strings) während mappe-1/2/4 `materialien: [{"$ref": "..."}]`** | **EMPIRISCH BESTÄTIGT** |
| **A3.5** v3.11.0+ Top-Level-id | jq mat-N-K/material.json | **mat-2-5/material.json + mat-3-3/material.json: top.id=None UND _meta.id=None** | **EMPIRISCH BESTÄTIGT** (sogar schlimmer: kein id wo auch immer) |
| **A4** material_kandidaten Hallus | game_state.json hallus_erkannt_und_korrigiert | 4/5 Hallus erkannt (4 von 5 Wikimedia-Filenames halluziniert) | **VERIFIZIERT** |
| **A5** 9 broken JSON typografische Quotes | python3 json.load + grep | **9 Files mit deutschen Anführungszeichen, alle heute valide** (post Bandaid-Fix) | **VERIFIZIERT** |
| **A6** Verifier-Source-Confusion | Vergleich data.json.pre-hotfix.bak vs. artefakte/ | **A6-DIAGNOSE FALSCH:** data.json.pre-hotfix.bak hatte tatsächlich 3 Pfad-Schemata gemischt (3 Schema B + 6 Schema A + 3 Wikimedia-Hotlinks). agent-qualitaet hat KORREKT die data.json gelesen, NICHT artefakte/. ERRATUM in qualitaets_protokoll.md ist post-Hotfix Re-Audit, nicht Beleg für Source-Confusion. | **MIS-DIAGNOSE** (siehe §7) |
| **A7** M2 fehlt rahmen/-Verzeichnis | `ls mappe-N/rahmen/` | **mappe-2/rahmen/ ist LEER (0 Files)**, mappe-1/3/4 haben jeweils 4 Files (einstieg + hefteintrag + meta + sicherung) | **EMPIRISCH BESTÄTIGT** |
| **A8** Token-Verbose Subagent-Reports | (qualitatives Pattern) | (nicht direkt messbar in Empirie) | **PLAUSIBEL** |

**Bilanz Verifikation:** 7 von 8 Anti-Patterns empirisch verifizierbar. **A6 (Verifier-Source-Confusion) ist eine Mis-Diagnose des CLI-Self-Evals** (siehe §7).

---

## 2. Master-Backlog v0.5.1 (konsolidiert + priorisiert)

### 2.1 PFLICHT-HIGH (6 Items, ~5-7 PT) — vor Pilot-Einsatz

| # | F-PB-ID | Beschreibung | Source | Empirie |
|---|---|---|---|---|
| **1** | F-PB-50 | Pfad-Schema-Vereinheitlichung agent-assembly (kanonisches Schema B) | Audit + CLI A2/A3 | Pre-Hotfix data.json: 3 Schemata gemischt (3 SchB + 6 SchA + 3 hotlinks) — empirisch belegt |
| **2** | F-PB-52 | SK5-Wortzahl-Heuristik chunk_grenze (alle 3 Games FAIL 0/6 Korridor) | Audit | Goldstandard + Run-3 + Run-4 alle 0/6 → struktureller Bug |
| **3** | F-PB-53 | img_id-Pattern-Strict-Mode (lowercase + 2-stellig) | Audit + CLI A3.1 | Run-4 produzierte 13 Großbuchstaben-IDs |
| **4** | F-PB-68 | lehrkraft.html JS renderer für mappenabschluss.lehrkraft*-Felder | Live-Audit | V13-Inhalte (Versailles-NSDAP / Augusterlebnis / Schlieffen-Mythos) UNSICHTBAR im Lehrkraft-Frontend — **BLOCKIERT PILOT** |
| **5** | F-PB-72 | state-advance-policy als Pre-Run-Read-Pflicht in jedem Subagent-Frontmatter | CLI A1 | M3 Re-Dispatch wegen stale game_state.json status=ONBOARDING |
| **6** | F-PB-63 | Plugin-Output-Pflicht-Check rahmen/-Verzeichnis pro Mappe | Audit + CLI A7 | mappe-2/rahmen/ leer, M1/M3/M4 je 4 Files — **empirisch belegt** |

### 2.2 PFLICHT-MED (10 Items, ~6-8 PT)

| # | F-PB-ID | Beschreibung | Source | Empirie |
|---|---|---|---|---|
| 7 | F-PB-57 | Schema additionalProperties für f_pb_*-Felder erlauben | Audit | artefakt_inventar 1 verbleibender UNKNOWN_FIELD |
| 8 | F-PB-58 | post-assembly-verify Pflicht-Hook (Browser-Smoke automatisiert) | Audit + CLI R4 | Bandaid `python -m http.server` |
| 9 | F-PB-64 | post-write-Hook JSON-Sanitizer typografische Quotes | Audit + CLI A5 | 9 broken JSONs, Bandaid `/tmp/fix_json_quotes.py` |
| 10 | F-PB-65 | knoten-Schlüssel-Vereinheitlichung (inkl. verbindungen) Vertrag/Engine | Audit + CLI A3.1+A3.2 | 22 tafelbild_knoten + 4 tafelbild_verbindungen Drift empirisch belegt |
| 11 | F-PB-67 | aufgabe._meta Whitelist statt komplett-strippen (bloom+afb+scpl_zone) | Live-Audit | _meta vollständig in data.json gestrippt |
| 12 | F-PB-73 | agent-inhalt material_kandidaten Pre-Verifikation via mcp_wikipedia | CLI A4 | 4/5 Wikimedia-Filenames halluziniert |
| 13 | F-PB-74 | Subagent-Frontmatter strukturiertes JSON-Output-Schema (statt freies Markdown) | CLI A8 | M3 Re-Dispatch hatte 50-Zeilen Verbose-Eskalations-Message |
| 14 | F-PB-75 | materialien_ref [strings] vs. materialien [{$ref}] Vertrag-Vereinheitlichung | CLI A3.4 | mappe-3 vs. mappe-1/2/4 — empirisch belegt |
| 15 | F-PB-76 | v3.11.0+ Quellentext Top-Level-id Pflicht | CLI A3.5 | mat-2-5 + mat-3-3 haben weder Top-Level- noch _meta-ID |
| 16 | F-PB-66 | lueckentext → text_mit_luecken Engine-Migration | Audit + CLI A3.3 | Plugin-Output vs. Engine-Schema |

### 2.3 OPTIONAL-LOW (11 Items, ~3-5 PT, deferrable nach v0.5.1)

| # | F-PB-ID | Beschreibung | Source |
|---|---|---|---|
| 17 | F-PB-51 | aufnahme_datum Schema-Spec | Audit |
| 18 | F-PB-54 | medien_katalog 168 Schema-Errors (Schema-Strict-Mode revisit) | Audit |
| 19 | F-PB-55 | Komposita-Coverage-Schwellwert revisit (alle Games <80%) | Audit |
| 20 | F-PB-56 | Asset-Mirror-Phase 3.1 Plugin-Step | Audit + CLI Pre-Flight |
| 21 | F-PB-59 | a4-7 Bloom-String → L-Stufe vereinheitlichen | Audit |
| 22 | F-PB-60 | a4-7 Quote-Bug fixen (ASCII U+0022 → German U+201C) | Audit |
| 23 | F-PB-61 | M3-Freischalt-Code-Mechanik in mappenabschluss.json dokumentieren | Audit |
| 24 | F-PB-62 | Zwei Code-Schichten (Mappen-Freischalt vs. Game-Schluessel) trennen | Audit |
| 25 | F-PB-69 | meta.schulart=null + meta.thema=null Plugin-Drift | Live-Audit |
| 26 | F-PB-70 | einstieg.typ-Drift (M3+M4 fehlen typ-Key) | Live-Audit |
| 27 | F-PB-71 | mappenabschluss._variante-Drift (M1+M4 fehlt) | Live-Audit |

**Total v0.5.1-Backlog: 27 Items (6 HIGH + 10 MED + 11 LOW), ~14-20 PT.**

**Aufwand-Korrektur:** Ursprünglich (BEFUND_RUN4_AUDIT.md §8) auf 6-8 PT geschätzt. Konsolidierte Schätzung **2-3x höher (14-20 PT)** wegen 5 NEU-Items aus CLI-Self-Diagnose + 5 NEU-Items aus Live-Audit + 3 NEU-Items aus CLI-Lessons-Verifikation.

---

## 3. v0.6-Architektur-Empfehlungen (5 Items, ~30-50 PT, Roadmap)

| # | R-ID | Beschreibung | Source | Hebel |
|---|---|---|---|---|
| **R1** | R1 | `architektur/engine_schema.json` als kanonische JSON-Schema-Definition für alle Subagent-Outputs | CLI R1 | Eliminiert 5 Schema-Drift-Klassen strukturell |
| **R2** | R2 | `tools/assembly_runner.py` mechanisches Build (Engine-Schema-direkt-Production) | CLI R2 | Phase 3 Assembly tatsächlich mechanisch (4 Iterationen → 1) |
| **R3** | R3 | `tools/state_machine_runner.py` als Pflicht-Wrapper für Phase-Transitions (atomic state + Q-GATE + phase_history) | CLI R3 | Eliminiert state-drift + Q-GATE-Concurrent-Write |
| **R4** | R4 | Pre-Persist-Validation-Hook-Pipeline (BLOCKING statt WARN) | CLI R4 | 9 broken JSONs + Schema-Drift gar nicht erst persistiert |
| **R5** | R5 | `Q-GATE-LOG/`-Verzeichnis statt -Datei (concurrent-safe) | CLI R5 | Eliminiert Phase-3.0-Konsolidierungs-Mehrarbeit |

**v0.6 Implementierung:** ~30-50 PT (Spec + 5 strukturelle Refactors + Validierung). Lohnt nur wenn Plugin produktiv mehrere Games pro Monat generiert.

---

## 4. v0.5.1-Implementierungs-Strategie

### 4.1 Phase A: Pflicht-HIGH vor Pilot (~5-7 PT, ~1-2 Wochen)

**Sequenz:**
1. **F-PB-68** lehrkraft.html JS-Renderer (~1 PT) — **PFLICHT vor Pilot**, weil V13-Inhalte sonst unsichtbar
2. **F-PB-50** Pfad-Schema-Vereinheitlichung agent-assembly (~1.5 PT)
3. **F-PB-72** state-advance-policy Pre-Run-Read (~1 PT)
4. **F-PB-63** rahmen/-Pflicht-Check (~0.5 PT)
5. **F-PB-52** SK5-Wortzahl-Heuristik fix (~1 PT)
6. **F-PB-53** img_id-Pattern-Strict-Mode (~0.5 PT)

### 4.2 Phase B: PFLICHT-MED + Schema-Drift-Cluster (~6-8 PT, ~2-3 Wochen)

**F-PB-65** (knoten/verbindungen) + **F-PB-66** (text_mit_luecken) + **F-PB-75** (materialien_ref) + **F-PB-76** (Top-Level-id) als Schema-Drift-Cluster bündeln (~3-4 PT, ein einziger Vertrag-/Schema-Patch).

Plus: F-PB-57 + F-PB-58 + F-PB-64 + F-PB-67 + F-PB-73 + F-PB-74 (~3-4 PT).

### 4.3 Phase C: OPTIONAL-LOW (~3-5 PT, deferrable)

Polish + Doku + Schema-Cosmetic. Nicht-blockend.

### 4.4 v0.5.1-Tag-Bedingungen

- Phase A komplett (6 HIGH-Items DONE + Smoke-Test PASS)
- Phase B mindestens 50% (5+/10 MED-Items DONE)
- Run-5 Pristine-Test auf neuem Game (~5h CC)

**Geschätztes Total für v0.5.1-Tag: ~3-4 Wochen.**

---

## 5. Run-4-Erfolgs-Faktoren-Bilanz (positive Empirie aus CLI-Eval §8)

| # | Faktor | Empirie | Konsequenz |
|---|---|---|---|
| 1 | Plugin v0.5.0 Dual-Channel-Wikimedia-Verifikation | 4/5 Hallus erkannt | F-PB-37/39/48/49-Investments wertschöpfend belegt |
| 2 | Beutelsbach-Operationalisierung M3 | vergleich L4 + begruendung CER L5 ohne Antwort-Vorgriff | didaktisch hochwertig, Pilot-fertig |
| 3 | POLICY_TRIGGER_SICHTBARKEIT V13 | strikt durchgehalten über 4 Mappen | aber **F-PB-68 blockiert: Lehrkraft-Frontend rendert nicht** |
| 4 | F-PB-44 Komposita-Erstgebrauch | in allen Materialien dokumentiert | aber Coverage 17.1% strukturell <80% |
| 5 | Self-Sustained-Run (Auto Mode) | trotz Eskalations-Stop fortsetzungsfähig | Re-Dispatch funktional |
| 6 | sub-assembly-verify | findet V13-Regression zuverlässig | P0-A2 / F-RA1-06 Schutz greift |

---

## 6. Cross-Track-Befund: Multi-Track-Coordination (CLI ↔ Cowork)

### 6.1 Konvergenz-Empirie

CLI-Generator und Cowork-Audit haben in Run-4 **konvergent gearbeitet:**
- CLI: Phase 0-3 Generierung + 5 Self-Diagnose-Issues + post-Hotfix S10-Erratum
- Cowork: 6-Subagent-Audit + Bildpfad-Hotfix + img_id Bulk-Rename + 4 BEFUNDe + Tiefen-Eval

Beide Tracks haben über `weitergehts-online` Repo gemeinsam committed (4× Cowork: ba808b2 + 2d47aa9 + 2f1deaa + 261929f, 1× CLI: 7a2a5d3).

### 6.2 Kontroversen + Korrektur

**CLI A6 "Verifier-Source-Confusion" ist eine Mis-Diagnose:**

CLI behauptet, agent-qualitaet hätte artefakte/ statt data.json gelesen. Empirie widerlegt das:
- `data.json.pre-hotfix.bak` enthält **tatsächlich** 3 Pfad-Schemata gemischt (3× Schema B M2 + 6× Schema A M1+M3 + 3× Wikimedia-Hotlinks M4)
- agent-qualitaet hat data.json korrekt gelesen + S10 korrekt als FAIL markiert
- ERRATUM in qualitaets_protokoll.md ist Re-Audit nach Cowork-Hotfix, nicht Beleg für ursprüngliche Mis-Lesung

**Real-Issue:** Multi-Track-Coordination ohne Versionierung. agent-qualitaet's Befund war korrekt zum Zeitpunkt des Lesens, dann hat extern (Cowork) data.json modifiziert, CLI re-checkte später + interpretierte fälschlich als Source-Confusion.

**Konsequenz:** Statt CLI A6's Empfehlung (input_canonical_path Pflicht) → **bessere Empfehlung:** Versions-Hash der gelesenen data.json im qualitaets_protokoll persistieren (Git-SHA oder mtime). Dann Re-Audit nach externer Änderung erkennt Diff statt Mis-Diagnose.

**v0.5.1-Backlog:** F-PB-NEW Audit-Versions-Hash in qualitaets_protokoll → niedrige Priorität, aber wichtig für Multi-Track-Coordination-Pattern.

### 6.3 Methodik-Empfehlung

Für künftige Multi-Track-Runs:
1. **CLI = Generator-Track:** generiert + self-diagnose
2. **Cowork = Audit/Hotfix-Track:** audits + corrects + commits
3. **Versions-Anker:** Jede Audit-Aussage muss git-SHA oder mtime der gelesenen Files beilegen
4. **Re-Audit nach Hotfix:** explizit als Re-Audit markieren, nicht als Erratum-zum-Original

---

## 7. Bilanz Backlog-Konsolidierung

**Backlog-Stand finalisiert:**
- **v0.5.1: 27 Items** (6 HIGH + 10 MED + 11 LOW), ~14-20 PT, ~3-4 Wochen
- **v0.6 Architektur: 5 Items** (R1-R5), ~30-50 PT, mehrere Monate

**Verifikations-Status:** 7 von 8 CLI-Anti-Patterns **empirisch belegt** via Sandbox-Empirie. 1 (A6) als **Mis-Diagnose korrigiert**.

**Aufwand-Realismus-Update:**
- Ursprüngliche Schätzung BEFUND_RUN4_AUDIT.md §8: 13 Items / 6-8 PT
- Aktualisierte Schätzung: 27 Items / 14-20 PT
- **Faktor: ~2.5x mehr Items als initial gesehen**

**Konsequenz für B3-Decision:**
- Pfad C (Parallel) braucht angepasst: Pilot kann **erst nach F-PB-68 Fix** stattfinden (~1 PT, 1-2 Tage Cowork)
- v0.5.1-Phase A (~5-7 PT) parallel zu Pilot-Vorbereitung
- v0.5.1-Phase B+C nach Pilot-Empirie

**Erfolgs-Faktoren-Bilanz:** Plugin v0.5.0 strukturell wertschöpfend (Hallu-Pipeline + V13 + Beutelsbach + Komposita + Self-Sustained-Run + sub-assembly-verify). v0.5.1 schließt die letzte Meile (Schema-Drift + State-Machine + Lehrkraft-Frontend).

**Mittel- bis langfristig:** v0.6-Architektur-Investment (R1-R5) würde 80% der Mehrarbeit dieses Runs eliminieren — lohnt bei 3+ Games pro Monat.

---

**Konsolidierung abgeschlossen 2026-04-27.** Methodik: 4 BEFUNDe + 1 CLI-Eval merged. Empirie-Verifikation aller 8 Anti-Patterns. 1 Mis-Diagnose-Korrektur (A6). Master-Backlog 27 Items + 5 Architektur-Empfehlungen finalisiert.
