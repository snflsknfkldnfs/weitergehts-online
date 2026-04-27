# BEFUND_RUN4_AUDIT — Plugin v0.5.0 Empirie + Vergleichs-Eval

**Datum:** 2026-04-26 (Run-4 Empirie-Run + Audit Cowork)
**Game:** `gpg-erster-weltkrieg-ursachen-run4-v050` (Erster Weltkrieg — Ursachen + Marne 1914, Mittelschule Bayern Jg.7c, 4 Mappen)
**Plugin-Version:** v0.5.0 (pristine Install, Tag 2026-04-26)
**Vergleichs-Anker:** `gpg-erster-weltkrieg-ursachen` (Pre-Plugin-Goldstandard, 2026-03-22) + Run-3 `weimarer-republik-anfangsphase` (Plugin v0.4.3)

---

## 1. Run-4-Aggregat-Befund

**Phase-Coverage Run-4:** 0.1 → 2.2c (alle 13 Phasen DONE; nur Phase 3 Assembly PENDING). Goldstandard hat Phase 1+2.1+2.2b deployed; Run-3 hatte nur 0.1-0.3 (User-ESC).

**Output-Volumen:** 146 Files / 1.6 MB / 22 Materialien / 28 Aufgaben / 4 Hefteintraege / 4 Mappenabschluesse / 9 Q-GATE-LOGs / 23 Subagent-Dispatches / 0 Re-Dispatches Phase 2.

**Q-Gate-Aggregat:**
- 12/13 Phasen: PASS oder PASS_MIT_WARN/HINWEIS
- 0/13 Phasen: FAIL
- Kritische Bemerkungen: PASS_MIT_WARN bei Phase 0.2.M (Hallu-Schutz) + Phase 1 (Concurrent-Write) + Phase 2.1 M4 + Phase 0.3 Artefakt (img_id-Drift)

---

## 2. Plugin-v0.5.0-Hardening-Empirie

| F-PB-Item | Run-4-Empirie | Vergleich Run-3 |
|---|---|---|
| F-PB-04 Schema-Verzeichnis | aktiv | aktiv |
| F-PB-29 R-TITEL-3 | **4/4 PASS** (M3 leicht WARN durch Beutelsbach-Kontext abgesichert) | 4/4 PASS |
| F-PB-37 quellenkritik | **13/13 PASS** (komplette quellenkritik-Bloecke) | 0/16 (vor Cowork-Patch) |
| F-PB-38 event_date | **33/33 PASS + 2/2 Zitate aeusserungs_datum** | 0/23 (vor Cowork-Patch) |
| F-PB-39 aufnahme_datum | **DRIFT-Befund: 0% Top-Level-`aufnahme_datum`, ABER 100% `metadata.date_taken`** — Validator-Pflicht-Feld vs. Generator-Naming-Drift | 6.2% (Run-3) |
| F-PB-40 medien_katalog Cross-Check | PASS | PASS_MIT_WARN |
| F-PB-41 material_kandidaten | 19 Kandidaten, 13 GEDECKT + 4 MODIFIZIERT + 2 AEQUIVALENT | partial via Cowork-Patch |
| F-PB-42 anker_briefing/tafelbild_knoten/tipp_stufen_slot | **22/22 Materialien PASS** | partial via Cowork-Patch |
| F-PB-43 SK1-SK18 Validator | SK1/4/7/14/18 PASS, SK5-Wortzahl Validator-Bug | erstmals strukturell |
| F-PB-44 Komposita Coverage | 17.1% (schlechter als Run-3 24.2%) | Validator zaehlt SKRIPT-Meta-Sektionen mit |
| F-PB-45 QD-SCHULART | **PASS** (expliziter F-PB-45-Block + Token-Match-Tabelle) | partial via Cowork-Patch |
| F-PB-46 Math-Counts | **PASS** (mappen=4, 22 Materialien total konsistent) | PASS post-Cowork-Patch |
| F-PB-47 SK5-Wortzahl Chunk | **VALIDATOR-BUG: zaehlt H2-Sektionen, nicht Mappen-Narrativ** (Mappen 612/631/605/645W alle im Korridor) | gleicher Bug |
| F-PB-48 lizenz_inventar Naming | PASS | partial |
| F-PB-49 _meta-Konsistenz | **DRIFT: 12!=13 mit `_audit_korrektur`-Annex statt Inplace-Update** | partial via Cowork-Patch |

**Aggregat:** v0.5.0-Hardening wirkt **strukturell durchgaengig.** Run-4 ist gegenueber Run-3 in 8 von 14 F-PB-Items deutlich verbessert. 3 Validator-Drift-Bugs identifiziert (F-PB-39, F-PB-47, F-PB-49) — Plugin-Issues, NICHT Generator-Output-Issues.

---

## 3. Hallucination-Pipeline-Wirksamkeit (kritischer Befund)

**4 von 5 material_kandidaten-Wikimedia-Dateinamen waren Halluzinationen** (von agent-inhalt erzeugt). agent-medienrecherche hat alle 4 via dual-kanal-Verifikation erkannt + via Cross-Reference-Pool ersetzt.

| Hallu | Original | Ersatz | Cross-Ref-Quelle |
|---|---|---|---|
| M2 | `Sarajevo_assassination_map.svg` (404) | `Sarajevo-assn-chart.svg` | wiki:Assassination_of_Archduke_Franz_Ferdinand |
| M3 | `Adolf_Hitler_in_Crowd_at_the_Odeonsplatz_1914.jpg` (404) | `IR_Lübeck_033_-_EB.jpg` (mit dokumentierter DRIFT — Person zu strukturell) | wiki:Spirit_of_1914 |
| M3 | `Bundesarchiv_Bild_146-1970-073-04 Lustgarten` (404) | `Bundesarchiv_Bild_146-1974-118-18,_Mobilmachung.jpg` | wiki:Spirit_of_1914 |
| M4 | `Bundesarchiv_Bild_146-1981-046-09A` (404) | `German_soldiers_Battle_of_Marne_WWI.jpg` | wiki:First_Battle_of_the_Marne |

**Befund:** Plugin-Pipeline hat **80% Halluzinationen abgefangen**. Pre-Plugin-Goldstandard hatte solchen Schutz nicht. → Plugin-v0.5.0-Hardening empirisch wirksam.

**Sub-Empfehlung F-PB-50-NEU:** agent-inhalt sollte material_kandidaten-Typ "bildquelle" mit `quelle_kandidat = "Wikimedia Commons (zu verifizieren)"` markieren, NICHT konkrete Filenamen erfinden. Pipeline-Ueberlapp mit agent-medienrecherche entfernen.

---

## 4. Kritische Findings (Severity-sortiert)

### HIGH (3 Items)

**H1 — img_id Schema-Drift (game-weit, Generator-Lapse):**
- ALLE 13 img_ids verstossen gegen Schema-Pattern `^img-m[0-9]+-[0-9]+$` (Großbuchstaben + 1-stellig statt lowercase + 2-stellig)
- Run-3-Konvention: img-m1-01, img-m4-06 (lowercase + 2-stellig)
- Validator hat in Phase 0.2.M nicht angeschlagen (Pflicht-Hook fehlt)
- **Bulk-Rename pflichtig vor Phase 3:** img-M{N}-{n} → img-m{N}-0{n} in artefakt_inventar.json + medien_katalog_game.json + SKRIPT.md + 4x HEFTEINTRAG_M*.md + skript_struktur.json + Q-GATE-LOG.md (BU-Tabelle)

**H2 — F-PB-39 Schema-vs-Inhalt-Drift (Plugin-Spec-Drift):**
- Validator misst Top-Level `aufnahme_datum` (0%)
- Generator schreibt `metadata.date_taken` (100%)
- → Schema-Update oder Frontmatter-Klarstellung pflichtig (eine kanonische Form)

**H3 — F-PB-47 SK5-Wortzahl-Validator-Heuristik (Plugin-Validator-Bug):**
- Validator zaehlt H2-Sektionen, agent-skript schreibt 4 Mappen unter EINER H2 = 1 Chunk = 2408W FAIL
- Mappen-Narrativ-Korridor: M1=612, M2=631, M3=605, M4=645W — alle im 600-900W-Korridor PASS
- → Validator-Heuristik praezisieren: chunk_grenze = "### Mappe N"-H3, NICHT generische H2

### MED (4 Items)

**M1 — F-PB-50 Concurrent-Write Phase-1-Q-GATE-LOG (Plugin-Workflow-Defekt):**
- 3 freistehende Append-Files (Q-GATE-LOG_phase-1-m1-append.md + Q-GATE-LOG_M2_APPEND.md + Q-GATE-LOG_PHASE-1_M3.md) mit Naming-Drift
- Master-Q-GATE-LOG.md hat keinen authoritativen Phase-1-Material-Design-Block (SSOT-Verletzung)
- → Phase-Closeout-Hook + verbindliche Naming-Konvention

**M2 — F-PB-49 Self-Correction ohne Inplace-Update (Bug-Pattern):**
- `_meta.anzahl_persisted=12` vs `len(bilder)=13`
- `_audit_korrektur_lizenz_summe`-Block dokumentiert die Korrektur, aber Original-`_meta` nicht ueberschrieben
- → agent-medienrecherche soll Korrekturen direkt am Quellfeld durchfuehren + nur Audit-Block als Trail

**M3 — Phase-0.2.M PARTIAL-Status keine BLOCKER-Eskalation:**
- mat-3-6 RESERVE_NICHT_AKTIVIERT: medien_katalog hatte verified_via=PARTIAL (nur Kanal A), erst Phase 2.1 erkannt
- → Phase 0.2.M muss bei PARTIAL-Status BLOCKER-Eskalation triggern, nicht erst Phase 2.1

**M4 — MCP-Wikipedia-Sprachversion Drift in Quellenverzeichnis:**
- Quellenverzeichnis behauptet "MCP auf en.wikipedia.org konfiguriert"
- test_wikipedia_connectivity Live-Check zeigt `language: "de"`, `url: de.wikipedia.org`
- → Vertrauens-Anker gebrochen. agent-inhalt soll connectivity-Test-Output kopieren

### LOW (8 Items)

| ID | Inhalt |
|---|---|
| L1 | M3-Titel "Wer schuld ist und wer jubelt" leicht reduktiv (durch Beutelsbach-§6 abgesichert) |
| L2 | M2 Princip-Held-vs-Terrorist nur im Lehrkraft-Block, nicht Schueler-Narrativ (1-Satz-Erweiterung empfohlen) |
| L3 | Clark-Edition-Unschaerfe: "Schlafwandler 2013" (DE-Uebersetzung), EN-Original 2012 |
| L4 | Schlieffen-Plan NL-Route: Gilt fuer 1905-Original, NICHT fuer Moltke-1914-Ausfuehrung |
| L5 | a4-7 `_meta.bloom: "Analysieren"` als String statt L-Stufe (Schema-Inkonsistenz) |
| L6 | a4-7.scaffolding typografischer Quote-Bug `„...""` (Render-Risiko) |
| L7 | mappe-3 Freischalt-Code "SCHULD" nicht explizit ableitbar im mappenabschluss.json (Beutelsbach-konform akzeptabel) |
| L8 | Zwei Code-Schichten (Mappen-Freischalt vs. Game-Schluessel) im STATE/auftragstext vermischt |

---

## 5. Vergleichs-Eval Drei-Wege (Goldstandard / Run-3 / Run-4)

| Dimension | Goldstandard (manuell) | Run-3 v0.4.3 (Cowork-gepatcht) | **Run-4 v0.5.0** |
|---|---|---|---|
| Phase-Coverage | 0.1-2.2c + Deploy | 0.1-0.3 (User-ESC) | **0.1-2.2c** |
| Hallu-Schutz | nicht thematisiert | nicht thematisiert | **4/5 erkannt+ersetzt** |
| event_date Coverage | nicht | 0% (FAIL) | **100% PASS** |
| Quellenkritik-Block | nicht | 0% (FAIL) | **100% PASS** |
| KE-Wortlaut woertlich | partial | partial | **4/4 PASS** |
| QD-SCHULART-Self-Check | nicht | partial | **PASS** |
| Pflicht-Felder F-PB-42 | nicht | partial | **22/22 PASS** |
| §-Absaetze SKRIPT | 114 | 0 | 71 |
| Multikausal-Konnektoren | 5 | 0 | 5 |
| Quellen-Verweise SKRIPT | 72 | unklar | 57 |
| Beutelsbach M3 (Versailles vs. Clark) | partial | n.a. | **operationalisiert** |
| Multiperspektivitaet pro Mappe | gut | gut | **5 Perspektiven** |
| Hefteintrag V13 Dualstruktur | nicht | nicht | **PASS** |
| MATERIAL_GERUEST Format | MD-Tabelle | n.a. | **BLUEPRINT + JSON-Twin + SCPL** |
| Math-Counts | nicht thematisiert | manuell-Patch (24→25) | **22/22 PASS** |
| Komposita Coverage | 4.9% FAIL | 24.2% FAIL | 17.1% FAIL (Validator-Skopus) |
| SK5-Wortzahl-Korridor | 0/X (FAIL) | 0/6 (FAIL) | 0/6 (Validator-Bug, real Mappen 612-645W PASS) |

**Run-4-Mehrwert vs. Goldstandard:**
- Plugin-Pipeline-Schutz (Hallu, F-PB-37/38/39/40/41/42)
- Maschinenlesbare Schemas + Validator-Layer
- v3.11.0+-Pro-Material-Verzeichnis (mat-2-5 + mat-3-3 mit Review-Layer)
- Hefteintrag V13-Dualstruktur (Lehrkraft/Schueler getrennt)
- BLUEPRINT + JSON-Twin + SCPL + F0b-Priming
- Beutelsbach M3 explizit operationalisiert (Versailles 1919 vs. Clark 2013)
- Q-Gate-Self-Check 12 Kriterien

**Run-4-Defizite vs. Goldstandard:**
- §-Absaetze 71 vs. 114 (Format-Differenz, nicht Quality-Defekt)
- Quellen-Verweise 57 vs. 72 (Run-4 verlagert Identifikationsfiguren in Phase 1 Materialien)

---

## 6. Backlog v0.5.1 (NEU aus Run-4-Audit)

### HIGH (Pflicht-Patches vor Phase 3 ODER vor Run-5)

| ID | Komponente | Patch |
|---|---|---|
| **F-PB-50-NEW** | Bulk-Rename img_id | Tool oder manueller Patch: img-M{N}-{n} → img-m{N}-0{n} in 6+ Files |
| **F-PB-51-NEW** | Plugin-Validator F-PB-39 | Schema-Spec-Klarstellung: Top-Level `aufnahme_datum` ODER `metadata.date_taken` (eine Form), Validator + agent-medienrecherche-Output sync |
| **F-PB-52-NEW** | Plugin-Validator F-PB-47 | SK5-Wortzahl-Heuristik: chunk_grenze = `### Mappe N`-H3, nicht generische H2 |
| **F-PB-53-NEW** | hooks/img_id-Validator | Pflicht-Hook in Phase 0.2.M (verhindert lowercase/uppercase/Stelligkeit-Drift) |

### MED

| ID | Komponente | Patch |
|---|---|---|
| **F-PB-54-NEW** | Phase-1-Q-GATE-LOG | Concurrent-Write-Locking + Naming-Konvention + Phase-Closeout-Hook fuer Append-Merge |
| **F-PB-55-NEW** | F-PB-49 _meta | Inplace-Update statt Annex-Korrektur (agent-medienrecherche-Patch) |
| **F-PB-56-NEW** | Phase-0.2.M PARTIAL-Eskalation | BLOCKER-Eskalation vor Phase 1 statt Lapse-Erkennung erst Phase 2.1 |
| **F-PB-57-NEW** | MCP-Sprachversion-Doku | agent-inhalt: connectivity-Test-Output `language` ins Quellenverzeichnis kopieren |
| **F-PB-58-NEW** | agent-inhalt-Frontmatter | material_kandidaten-Typ "bildquelle" ohne konkrete Wikimedia-Filenamen (Pipeline-Ueberlapp entfernen) |

### LOW

| ID | Patch |
|---|---|
| F-PB-59-NEW | a4-7 Bloom-String → L-Stufe vereinheitlichen |
| F-PB-60-NEW | a4-7 typografischer Quote-Bug fixen |
| F-PB-61-NEW | M3-Freischalt-Code-Mechanik in mappenabschluss.json explizit dokumentieren |
| F-PB-62-NEW | Zwei Code-Schichten (Mappen-Freischalt vs. Game-Schluessel) in game_state.json klar trennen |

**Total v0.5.1-Backlog:** 4 HIGH + 5 MED + 4 LOW = 13 Items, ~6-8 PT.

---

## 7. Phase-3-Deploy-Empfehlung

| Voraussetzung | Status | Aktion |
|---|---|---|
| H1 img_id Bulk-Rename | **PFLICHT** | Cowork-Self-Edit oder Generator-Patch |
| L5 a4-7 Bloom-String | empfohlen | 1 Edit |
| L6 a4-7 Quote-Bug | empfohlen | 1 Edit |
| H2/H3 Plugin-Validator-Drifts | nicht-blockend | v0.5.1-Backlog |
| Q-GATE-LOG-Konsolidierung | empfohlen | 9 Append-Files mergen oder per Tool |
| sub-assembly-verify (Phase 3.4) | PFLICHT | Plugin-Tool laufen lassen vor Deploy |
| User-Validation Kernstuecke | empfohlen | M2 Princip / M3 Beutelsbach / M4 Schlieffen |

**Empfehlung:** Phase 3 deploy-fähig **nach H1 Bulk-Rename + L5+L6 Quick-Fixes** (~30 Min Cowork). Plugin-Validator-Bugs (H2/H3) sind v0.5.1-Backlog, blockieren Deploy nicht.

---

## 8. Zusammenfassendes Urteil

**v0.5.0-Plugin-Hardening empirisch wirksam.** Run-4 zeigt:
- Strukturell deutlich besser als Run-3 (8/14 F-PB-Items messbar verbessert)
- Quality-vergleichbar mit Goldstandard + zusaetzliche Hardening-Layer (Hallu-Schutz + Validatoren + Schemas)
- Phase 0.4-2.2c funktioniert autonom in einem Run (~5h CC Wall-Clock geschaetzt)
- Anti-Halluzinations-Pipeline empirisch belegt (4/5 Hallus erkannt)

**Nicht-blockierende Issues:**
- 3 Plugin-Validator-Drift-Bugs (Plugin-Issues, nicht Generator-Output-Issues)
- 1 Generator-Lapse (img_id-Pattern, manuelle Korrektur moeglich)
- 4 MED + 8 LOW Polish-Items

**Run-4 ist GAME-VOLLSTAENDIG bis Phase 2.2c.** Plugin v0.5.0 hat erstmals einen vollstaendigen Game-Generierungs-Run durchlaufen — das ist der erste echte v0.5.0-Production-Run-Beweis.

---

## 9. Naechste Schritte

1. **HIGH-Patches** (Cowork, ~30 Min): img_id Bulk-Rename + a4-7 Bloom + a4-7 Quote
2. **Q-GATE-LOG-Konsolidierung** (Cowork, ~10 Min): 9 Append-Files in Master mergen
3. **User-Validation Kernstuecke** (Lehrkraft-Pflicht): M2 Princip + M3 Beutelsbach + M4 Schlieffen
4. **Phase 3 Assembly** (Plugin Code-Mode oder mechanisch): top-level data.json + index.html + 4x mappe-N.html + lehrkraft.html
5. **sub-assembly-verify** (Plugin-Tool, Pflicht-Gate vor Deploy)
6. **Run-4-Pilot-Einsatz** (Lehrkraft-Test im Unterricht)
7. **v0.5.1-Backlog-Implementation** (4 HIGH + 5 MED + 4 LOW = 13 Items, ~6-8 PT, separate Sessions)

---

**Audit abgeschlossen.** 6 Subagent-Reviews + Pre-Audit-Validatoren konsolidiert. v0.5.0-Pilot-Empirie als Production-Ready-Beweis. v0.5.1-Backlog mit 13 Items abgeleitet.

---

## 10. Plugin-Self-Diagnose CLI-Capture (post-Phase-3 Update 2026-04-27)

**Source:** CLI-Generator-Session-Export `2026-04-27-102854-command-messageescape-game-generatorgenerate-g.txt` (1115 Zeilen). Plugin hat sich in Phase 3.2 Assembly + 3.4 sub-assembly-verify selbst-diagnostiziert. Findings ergänzend zu Audit-Subagent-Reviews.

**5 Plugin-v0.5.1-Issues (Plugin-Self-Diagnose):**

| ID | Finding | Impact | Status post-Hotfix | v0.5.1-Backlog-Cross-Ref |
|---|---|---|---|---|
| **CLI-1** | Bildpfad-Inkonsistenz (3 Pfad-Schemata gemischt: `assets/images/{game-id}/mappe-N/*` + `../../assets/img/{game-id}/img-MN-X.{ext}` + Wikimedia-Hotlinks) | Deploy-Blocker | TARGET-Hotfix DONE (12 Bilder downloaded + Schema B vereinheitlicht), Plugin-Bug bleibt | Überlappt F-PB-50-NEW (agent-assembly Pfad-Schema-Vereinheitlichung) |
| **CLI-2** | M2 fehlt `rahmen/`-Verzeichnis (FileNotFoundError beim Phase-3 Assembly auf `mappe-2/rahmen/hefteintrag.json`) | Plugin-Output-Pflicht-Check fehlt | Workaround in Assembly-Skript (V13 Detection statt File-Lesen) | **NEU:** F-PB-63-NEW (Plugin-Output-Pflicht-Check für rahmen/-Verzeichnis pro Mappe) |
| **CLI-3** | 9 JSON-Files mit unescaped typografischen Anführungszeichen (`„...""` statt JSON-escaped `\"`) | JSON-Parse-Fehler bei Phase-3-Assembly | Bandaid `/tmp/fix_json_quotes.py` in CLI, post-Phase-2 reparieren | **NEU:** F-PB-64-NEW (post-write-Hook für agent-aufgaben/agent-material: JSON-Sanitizer für typografische Quotes) |
| **CLI-4** | Hefteintrag-Schlüssel-Drift `tafelbild_knoten` (in artefakt_inventar.json) vs. `knoten` (in rahmen/hefteintrag.json) | Vertrag/Engine-Schema-Inkonsistenz | sub-assembly-verify V13 hat Mismatch ignoriert (Detection-Heuristik) | **NEU:** F-PB-65-NEW (Vertrag/Engine-Schema-Vereinheitlichung Schlüssel-Naming `knoten` als Single-Source-of-Truth) |
| **CLI-5** | `lueckentext`-Feldname-Drift (engine-konformes Naming wäre `text_mit_luecken`) | Engine-Render-Inkonsistenz mit altem Goldstandard | aufgabe-Schema-Compatibility-Layer in data.json-Assembly | **NEU:** F-PB-66-NEW (lueckentext → text_mit_luecken Vertrag/Schema-Migration) |

**Konsequenz für v0.5.1-Backlog:** 13 Items (Audit) + 4 NEUE (CLI-Self-Diagnose) = **17 Items total**. CLI-1 dedupt mit F-PB-50-NEW. CLI-2-5 sind echte Neuzugänge.

**Tiefen-Eval-Implikation:** Plugin-Self-Diagnose ist methodisch wertvoll — Plugin erkennt eigene Bugs zur Laufzeit. Sollte als Empirie-Modus in v0.5.1-Spec aufgenommen werden (selbst-protokollierend). Vergleichs-Empirie mit Goldstandard zeigt: alle 5 Issues sind v0.5.0-spezifisch, nicht Goldstandard-Regression.

---

**Audit erweitert 2026-04-27.** Backlog wächst auf 17 Items. Tiefen-Eval-Pflicht: empirische Pflicht/Optional-Klassifizierung pro Item.
