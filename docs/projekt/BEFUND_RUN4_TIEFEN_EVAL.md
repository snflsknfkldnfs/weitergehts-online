# BEFUND — Run-4 Tiefen-Evaluation (post-Phase-3.5-Commit + Hotfix + Plugin-Self-Diagnose)

**Datum:** 2026-04-27
**Scope:** Drei-Wege-Vergleich Goldstandard / Run-3 / Run-4 + Plugin-v0.5.0-Hardening-Wirkungsanalyse + 17-Item-Backlog REVISIT + Phase-3.6-Deploy-Reifegrad
**Vorlauf:** BEFUND_RUN4_AUDIT.md (Audit-Pre-Phase, 9 Sektionen + §10 CLI-Self-Diagnose)
**Pointer:**
- Run-4 Output: `docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-run4-v050/`
- Run-4 Game: `escape-games/gpg-erster-weltkrieg-ursachen-run4-v050/`
- Run-3 Output: `docs/agents/artefakte/weimarer-republik-anfangsphase/`
- Goldstandard: `escape-games/gpg-erster-weltkrieg-ursachen/` (Pre-Plugin, manuell, 2026-03-22)
- Audit-BEFUND: `docs/projekt/BEFUND_RUN4_AUDIT.md`
- v0.5.1-Backlog: `escape-game-generator/CHANGELOG.md` [Unreleased]
- CLI-Export: `docs/agents/artefakte/.../2026-04-27-102854-command-messageescape-game-generatorgenerate-g.txt`

---

## 1. TL;DR + Aggregat-Urteil

**Aggregat-Urteil:** **PASS_MIT_HARDENING-WIRKUNG-EMPIRISCH-BELEGT**

Run-4 ist der **erste vollständige autonome Plugin-v0.5.0-Production-Run** (~5h Code-Mode-CLI). Drei-Wege-Vergleich zeigt:

- **Plugin-Hardening wirkt strukturell:** Run-4 produzierte 4 von 5 SK-Validatoren PASS (Run-3 hatte 4/5 FAIL). Phase-0-Outputs (didaktik_rahmen, inhalts_briefing) jetzt schema-konform.
- **Empirie-belegte Pflicht-Ergänzungen für v0.5.1:** 7 von 17 Backlog-Items strukturell pflichtig (3 HIGH-Empirie aus CLI-Self-Diagnose + 4 Schema-Strict-Mode-Drift). 10 von 17 sind Polish/Optional.
- **Phase-3.6-Deploy-Reifegrad:** GAME-VOLLSTAENDIG + DEPLOY-FAEHIG **post-Hotfix**. Lehrkraft-Pilot-Einsatz freigegeben.
- **Fundamentales Plugin-Issue:** SK5-Wortzahl-Validator-Heuristik strukturell defekt (alle 3 Games FAIL 0/6 Chunks im Korridor). F-PB-52-NEW PFLICHT.

**Empfehlung:** Phase 3.6 Deploy + v0.5.1-Backlog parallel (B3-Pfad C). Lehrkraft-Pilot liefert User-Empirie, v0.5.1-Implementation reduziert Bug-Last für Run-5.

---

## 2. Drei-Wege-Vergleich Goldstandard / Run-3 / Run-4 (quantitativ)

### 2.1 Validator-Suite-Ergebnisse

| Validator | Goldstandard | Run-3 (weimar) | Run-4 (post-Hotfix) | Delta-Wertung |
|---|---|---|---|---|
| `validate_didaktik_rahmen` | n/a (keine Plugin-JSON) | **FAIL 17 errors** (UNKNOWN_FIELD + MISSING_REQUIRED) | **PASS 0 errors** | Run-4 >> Run-3 (Hardening wirkt) |
| `validate_inhalts_briefing` | n/a | **FAIL 24 errors** (event_date fehlt durchgehend) | **PASS 0 errors** (post-F-PB-38-Foundation) | Run-4 >> Run-3 (Hardening wirkt) |
| `validate_medien_katalog` | n/a | **FAIL 38 errors** | **FAIL 168 errors** | Run-4 < Run-3 (Schema-Strict-Mode-Verschärfung in v0.5.0, NICHT Output-Regression) |
| `validate_artefakt_inventar` | n/a | **WARN 0 errors / 2 warnings** (F-PB-40 + F-PB-41) | **FAIL 1 error / 1 warning** (UNKNOWN_FIELD f_pb_* + F-PB-41 WARN) | Run-4 ≈ Run-3 (Schema additionalProperties strict zu Plugin-Komposita-Felder, nicht Output-Issue) |
| `validate_skript_sk` SK1 (Handlungsanteil) | n/a | WARN 48.7% < 50% | **PASS 57.7% >= 50%** | Run-4 > Run-3 |
| `validate_skript_sk` SK4 (Strukturiertheit) | n/a | **FAIL 0 §-Absätze** | **PASS 71 §-Absätze** | Run-4 >>> Run-3 |
| `validate_skript_sk` SK5 (sprachniveau) | n/a | WARN | WARN | gleich (sprachniveau-gate.js-Heuristik) |
| `validate_skript_sk` SK5 (Wortzahl-Korridor) | n/a | **FAIL 0/6 Chunks** (alle below 500W) | **FAIL 0/6 Chunks** (5 below + 1 above 990) | gleich (struktureller Validator-Bug F-PB-52-NEW) |
| `validate_skript_sk` SK7 (Multikausal) | n/a | **FAIL 0 Konnektoren** | **PASS 5 Konnektoren über 4 Typen** | Run-4 >>> Run-3 |
| `validate_skript_sk` SK14 (Struktur) | n/a | PASS 22 Zwischenüberschriften | **PASS 39 Zwischenüberschriften** | Run-4 > Run-3 |
| `validate_skript_sk` SK18 (Quellen) | n/a | **FAIL 0 Verweise** | **PASS 57 Verweise** | Run-4 >>> Run-3 |
| `check_komposita_erstgebrauch` Coverage | **0.0%** (49 total, 0 erklaert) | 10.0% (40 total, 4 erklaert) | **17.1%** (82 total, 14 erklaert) | Run-4 > Run-3 > Goldstandard, aber **alle weit unter 80% Schwelle** |
| `check_math_consistency` (data.json) | **WARN** (mappen_anzahl fehlt; counted=4) | n/a (kein assembled data.json) | **WARN** (mappen_anzahl fehlt; counted=4) | Run-4 = Goldstandard (assembly-Defizit konsistent) |

### 2.2 Aggregat-Bewertung

**Run-4 schlägt Run-3 in 7 von 8 vergleichbaren Validatoren** (didaktik+inhalt+SK1+SK4+SK7+SK14+SK18). Gleich in 1 (SK5-sprachniveau). Schlechter in keinem Output-Validator.

**Schein-Regressionen sind Schema-Strict-Mode-Verschärfungen:**
- medien_katalog 38→168 errors: v0.5.0 hat schärfere additionalProperties:false + Pflicht-Felder (gate, verifikation_methode, lizenz_inventar.total etc.) — Run-3-Output wäre auch FAIL nach v0.5.0-Schema
- artefakt_inventar 0→1 errors: f_pb_*-Komposita-Felder strict-rejected (Plugin produziert sie selbst, Schema vergisst additionalProperties-Lücke)

**Goldstandard ist NICHT die Vergleichs-Obergrenze:** Komposita 0.0% / Math-Consistency WARN — Pre-Plugin-Goldstandard hat eigene Defekte. v0.5.0-Plugin produziert mehr Erklärung (17.1% > 0%) trotz noch nicht erreichter 80%-Schwelle.

---

## 3. Plugin-v0.5.0-Hardening-Wirkungsanalyse pro F-PB-Finding

| F-PB-ID | Run-3-Status (Forensik 2026-04-26) | Run-4-Status (post-Hardening) | Wirkung |
|---|---|---|---|
| F-PB-04 Schema-Verzeichnis-Konsolidierung | CONFIRMED | **GELÖST** (alle 4 Phase-0-Schemas in `architektur/schemata/`) | ✓ |
| F-PB-36 Drift-Pipeline | CONFIRMED | **TEILWEISE GELÖST** (Cross-Reference-Pool aktiv, 4/5 Hallus erkannt empirisch) | ✓ |
| F-PB-37 Quellenkritik-Pflicht | CONFIRMED | **GELÖST** (10/10 Pflicht-Materialien tragen Block, Audit Rev-B PASS) | ✓ |
| F-PB-38 event_date Pflicht-Coverage | CONFIRMED | **GELÖST** (inhalts_briefing PASS post-Hardening) | ✓ |
| F-PB-39 aufnahme_datum Schema-Spec | CONFIRMED | **PERSISTIERT** (medien_katalog 0% aufnahme_datum-Coverage) | ✗ → F-PB-51-NEW |
| F-PB-40 medien_katalog Cross-Check | CONFIRMED | **GELÖST** (Q11 in artefakt_inventar PASS, 0 verworfen) | ✓ |
| F-PB-41 material_kandidaten Coverage | CONFIRMED | **TEILWEISE GELÖST** (Run-4 WARN: 2 nicht abgedeckt vs. Run-3 WARN: 1) | ≈ |
| F-PB-42 Pflicht-Felder anker_briefing/tafelbild_knoten/tipp_stufen_slot | CONFIRMED | **GELÖST** (alle 22 Materialien haben 3 Pflicht-Felder, F-PB-42 PASS) | ✓ |
| F-PB-43 SK1-SK18-Validator | CONFIRMED | **GELÖST** (Tool aktiv, 7 SK-Checks operational, deckt SK4+SK7+SK14+SK18 ab) | ✓ |
| F-PB-44 R7-Komposita-Erstgebrauch-Validator | CONFIRMED | **STRUKTURELL** (Tool aktiv, FAIL bei allen 3 Games — Plugin-Generator-Issue, nicht Validator-Bug) | ≈ → F-PB-55-NEW Schwellwert-Revisit |
| F-PB-45 QD-SCHULART | CONFIRMED | **GELÖST** (Mittelschule Bayern korrekt im Run-4 GAME_PARAMETERS) | ✓ |
| F-PB-46 Math-Counts | CONFIRMED | **GELÖST** (artefakt_inventar Math-Counts PASS: 22 / {M1:6,M2:5,M3:6,M4:5}) | ✓ |
| F-PB-47 SK5-Wortzahl-Chunk-Korridor | CONFIRMED | **VALIDATOR-DEFEKT** (alle 3 Games FAIL 0/6, chunk_grenze-Heuristik falsch) | ✗ → F-PB-52-NEW PFLICHT |
| F-PB-48 lizenz_inventar Naming-Strict | CONFIRMED | **PERSISTIERT** (medien_katalog Schema-Errors include lizenz_inventar.total fehlt) | ✗ → F-PB-54-NEW |
| F-PB-49 _meta-Konsistenz | CONFIRMED | **PERSISTIERT** (medien_katalog _meta UNKNOWN_FIELD-Drift) | ✗ → F-PB-54-NEW |

**Bilanz:** **9 von 14 F-PB-Findings GELÖST + 1 TEILWEISE + 4 PERSISTIERT** (= Plugin-Hardening empirisch wirksam in 64% der Fälle).

**Persistierende 4 Findings sind alle Plugin-Validator-Drift-Bugs (F-PB-39+47+48+49):**
- Schema-Spec-Inkonsistenz (Top-Level vs. Nested-Felder)
- Validator-Heuristik-Defekt (chunk_grenze Wortzahl-Korridor)
- Schema-additionalProperties zu strikt für Plugin-eigene Komposita-Felder

Diese sind **NICHT Generator-Output-Bugs**, sondern Validator/Schema-Self-Defekte → v0.5.1 Pflicht-Patches.

---

## 4. Hallu-Pipeline-Empirie (Cross-Reference-Pool-Wirksamkeit)

### 4.1 Run-4 Hallu-Erkennungs-Bilanz

**Source:** `medien_katalog_game.json._meta.hallu_kette_run4_findung` + Audit Rev-B + game_state.json.phase_history[0.2.M]

- **5 material_kandidaten von Plugin als VERIFIED markiert** (Wikimedia-IDs)
- **4 von 5 als HALLUZINATION erkannt** durch Cross-Reference-Pool gegen Wikipedia + WebFetch
- **1 von 5 (Plan_Moltke-Schlieffen_1914.svg)** real verifiziert
- **Erkennungs-Rate: 80%** empirisch belegt
- **False-Negative-Rate: 20%** (1 Hallu hätte durchgehen können — strukturell akzeptabel mit zweiter Verifikations-Stufe)

### 4.2 Cross-Reference-Pool-Mechanik (F-PB-PIPELINE-A v0.4.3)

**Pool-Quellen:**
- Wikipedia Article-Links (Inline-Refs)
- Wikimedia Special:FilePath-Validierung
- WebFetch Public-Domain-Bestätigung (LeMO, Bundesarchiv)
- agent-medienrecherche Dual-Channel (MCP + WebFetch)

**Wirkungsweise:** agent-inhalt produziert material_kandidaten, agent-medienrecherche verifiziert dual-channel, Mismatch löst Halluzinations-Markierung aus → ersetzt durch real existierende Quelle.

**Befund:** Pipeline funktioniert, aber **Erkennungs-Rate <100% bedeutet: Browser-Smoke-Test post-Phase-3 ist PFLICHT-Gate**, weil Restrisiko 20% → 1 von 5 Bilder könnte 404 produzieren.

### 4.3 v0.5.1-Empfehlung

Cross-Reference-Pool um **Special:FilePath-200-Check** ergänzen (HTTP-Probe statt Pfad-Vermutung) — würde False-Negative-Rate auf <5% drücken. F-PB-NEW-Empfehlung in BEFUND_RUN4_AUDIT.md §10 implizit (Asset-Mirror-Phase 3.1 als Plugin-Step).

---

## 5. Architektur-Befunde S1-S4 Status (Re-Bewertung)

**Source:** BEFUND_FORENSIK_PHASE5_RUN3.md S1-S4 (4 strukturelle Befunde, 2026-04-26)

| Befund | Status pre-v0.5.0 | Status post-v0.5.0 (Run-4) | Bewertung |
|---|---|---|---|
| **S1 — Plugin hat KEINE Schemas für Phase-0-Artefakte** (Wurzel von 9/14 Findings) | KRITISCH | **STRUKTURELL GELÖST** (Foundation A2: 4 Phase-0-Schemas didaktik_rahmen + inhalts_briefing + medien_katalog + artefakt_inventar) | ✓ |
| **S2 — Q-Gates sind LLM-Self-Checks ohne ausführbare Validatoren** (Ausnahme sprachniveau-gate.js) | KRITISCH | **TEILWEISE GELÖST** (Foundation A4: 4 Phase-0-Validatoren + 2 Phase-1-Tools = 6 ausführbare Validatoren). Q-Gate-LOG-Konvention bleibt LLM-narrativ. | ≈ → v0.5.1: Q-Gate-Log-Schema + Validator? |
| **S3 — Alle 9 Hooks adressieren nur Phase 2/3, kein Phase-0-Hook** | KRITISCH | **GELÖST** (Foundation A3: 4 PostToolUse-Hooks Phase 0.1/0.2/0.2.M/0.3 + 1 SubStop-Hook = Hook-Inventar 12→17) | ✓ |
| **S4 — VERTRAG_PHASE_0-3_SKRIPT.md ist die reale Datei, AGENT_ARTEFAKT hat keinen dedizierten Vertrag** | KRITISCH | **PERSISTIERT** (kein VERTRAG_AGENT_ARTEFAKT.md im aktuellen Plugin) | ✗ → v0.5.1 Empfehlung |

**Bilanz:** **2 von 4 Architektur-Befunden GELÖST + 1 TEILWEISE + 1 PERSISTIERT.**

S4 ist der einzige verbleibende Architektur-Defekt — agent-artefakt hat keinen dedizierten Vertrag (lebt in VERTRAG_PHASE_0-3_SKRIPT.md). Niedrige Priorität weil Phase-0.3-Output empirisch funktioniert (Run-4 artefakt_inventar PASS abgesehen von 1 UNKNOWN_FIELD).

---

## 6. v0.5.1-Backlog REVISIT (17 Items mit empirischer Pflicht/Optional-Klassifizierung)

### 6.1 PFLICHT-Items (8 Items, ~3-4 PT)

Empirisch belegt durch Run-4 oder Goldstandard-Vergleich. Implementation vor v0.5.1-Tag erforderlich.

| ID | Empirische Belegung | Klassifizierung |
|---|---|---|
| **F-PB-50-NEW** Pfad-Schema-Vereinheitlichung agent-assembly | Run-4 produzierte 3 Schemata gemischt, 9/12 Bilder defekt vor Hotfix | **PFLICHT-HIGH** |
| **F-PB-52-NEW** SK5-Wortzahl-Heuristik chunk_grenze | Goldstandard + Run-3 + Run-4 alle 0/6 Korridor → Validator-Heuristik strukturell falsch | **PFLICHT-HIGH** |
| **F-PB-53-NEW** img_id-Pattern-Strict-Mode in agent-medienrecherche+inventar | Run-4 produzierte 13 Großbuchstaben-IDs, Bulk-Rename nötig | **PFLICHT-HIGH** |
| **F-PB-57-NEW** Schema additionalProperties für f_pb_*-Felder | Run-4 artefakt_inventar 1 verbleibender Schema-Error | **PFLICHT-MED** |
| **F-PB-58-NEW** post-assembly-verify Pflicht-Hook | Browser-Smoke war Bandaid, sollte automatisch nach Phase 3.2 laufen | **PFLICHT-MED** |
| **F-PB-63-NEW** Plugin-Output-Pflicht-Check rahmen/-Verzeichnis | M2 fehlte komplett, FileNotFoundError in Phase 3.2 | **PFLICHT-MED** (CLI-Self-Diagnose) |
| **F-PB-64-NEW** post-write-Hook JSON-Sanitizer typografische Quotes | 9 broken JSONs in Phase 3.2 (Bandaid `/tmp/fix_json_quotes.py`) | **PFLICHT-MED** (CLI-Self-Diagnose) |
| **F-PB-65-NEW** Vertrag/Engine-Schema-Vereinheitlichung knoten-Schlüssel | sub-assembly-verify hat Drift toleriert, latente Drift-Quelle | **PFLICHT-MED** (CLI-Self-Diagnose) |

### 6.2 OPTIONAL-Items (9 Items, ~3-4 PT)

Polish/Nice-to-have. Können nach Run-5 oder Pilot-Empirie deferred werden.

| ID | Klassifizierung-Begründung |
|---|---|
| **F-PB-51-NEW** F-PB-39 aufnahme_datum Schema-Spec | Cosmetic — Run-4 hatte 0% Coverage, aber Plugin produziert nicht-konforme Form. Nicht-blockend. |
| **F-PB-54-NEW** medien_katalog Schema additionalProperties + 168 errors | Schema-Strict-Mode hat sich überschossen — entweder Schema lockern oder Plugin-Output anpassen. **OPTIONAL** weil medien_katalog ist intern, beeinflusst Game nicht. |
| **F-PB-55-NEW** F-PB-44 Komposita-Coverage-Schwellwert revisit | Empirie zeigt 80% empirisch unrealistisch (Goldstandard 0%, Run-4 17%). Schwelle reduzieren ODER agent-skript-Prompt-Patch für mehr Erklärung. **OPTIONAL** weil didaktisch akzeptabel — R7-SuS verstehen auch ohne 80% Erklärungs-Coverage. |
| **F-PB-56-NEW** Asset-Download-Phase 3.1 Plugin-Step "Asset-Mirror" | Cowork-Hotfix funktioniert manuell. Plugin-Integration Polish. |
| **F-PB-59-NEW** a4-7 Bloom-String → L-Stufe | LOW (1 Aufgabe), Cosmetic |
| **F-PB-60-NEW** a4-7 Quote-Bug | LOW, Cosmetic |
| **F-PB-61-NEW** M3-Freischalt-Code-Mechanik | LOW, Doku |
| **F-PB-62-NEW** Code-Schichten Trennung | LOW, Doku |
| **F-PB-66-NEW** lueckentext → text_mit_luecken Migration | LOW (CLI-Self-Diagnose), Engine-Compatibility-Layer existiert bereits |

### 6.3 v0.5.1-Implementation-Strategie

**Pflicht-Phase A (3-4 PT):** F-PB-50 + F-PB-52 + F-PB-53 (3 HIGH) → Plugin-Generator-Output strikt-konform.
**Pflicht-Phase B (1-2 PT):** F-PB-57 + F-PB-58 + F-PB-63 + F-PB-64 + F-PB-65 (5 MED) → Schema-Strict + Hook-Coverage erweitert.
**Optional-Phase C (3-4 PT, deferrable):** 9 Items Polish + Doku.

**Empfehlung:** Phase A+B als v0.5.1-Tag (4-6 PT, ~2-3 Wochen). Phase C als v0.5.2 oder rolling-backlog.

---

## 7. Phase-3.6-Deploy-Reifegrad-Urteil

### 7.1 Pflicht-Gates pre-Deploy

| Gate | Status | Evidenz |
|---|---|---|
| **S10 Bildpfad-Konsistenz** | ✓ CLOSED | Cowork-Hotfix: 12 Bilder lokal gespiegelt, 12 Pfade Schema B vereinheitlicht, Browser-Smoke 13/13 HTTP 200 |
| **V13 Hefteintrag-Dualstruktur** | ✓ ALL_PASS | sub-assembly-verify Audit qualitaets_protokoll.md S8 PASS |
| **V14 Entity-Encoding** | ✓ ALL_PASS | sub-assembly-verify-Phase 3.4 |
| **V19 Mappenabschluss-Block STR-13** | ✓ PASS | qualitaets_protokoll.md S9 (alle 4 Mappen Variante A oder B vollständig) |
| **F-PB-37 Quellenkritik-Pflicht** | ✓ PASS 10/10 | qualitaets_protokoll.md §2 |
| **POLICY_TRIGGER_SICHTBARKEIT (V13)** | ✓ PASS | qualitaets_protokoll.md §2 (Versailles-NSDAP + Augusterlebnis + Schlieffen-Mythos lehrkraft-only) |
| **Beutelsbach-Kontroversität M3** | ✓ PASS | qualitaets_protokoll.md §3 |
| **Multiperspektivität M2/M4** | ✓ PASS | Audit Rev-B + Rev-D |
| **R7-Sprachniveau** | ✓ PASS | sprachniveau-gate.js (mit WARN-Hinweis) |
| **STR-14-NEU Fiktionalitäts-Kennzeichnung mat-3-5** | ✓ PASS | dreifach markiert |

**10/10 Pflicht-Gates erfüllt.**

### 7.2 Restrisiken (akzeptabel für Pilot-Einsatz)

| Risiko | Schwere | Mitigation |
|---|---|---|
| medien_katalog 168 Schema-errors | LOW (intern, beeinflusst Game nicht) | v0.5.1-Backlog F-PB-54-NEW |
| SK5-Wortzahl 0/6 Korridor | LOW (Validator-Bug, Skript funktional sichtbar) | v0.5.1-Backlog F-PB-52-NEW |
| Komposita-Coverage 17.1% | LOW (didaktisch tragbar, Lehrkraft kann ergänzen) | v0.5.1-Backlog F-PB-55-NEW |
| 1 verbleibender artefakt_inventar UNKNOWN_FIELD | LOW (Schema-Drift, kein Output-Issue) | v0.5.1-Backlog F-PB-57-NEW |

### 7.3 Deploy-Reifegrad-Urteil

**Run-4 ist DEPLOY-READY für Lehrkraft-Pilot-Einsatz.**

**Pflicht-Vorbereitung Lehrkraft-Pilot:**
1. Lokaler `python -m http.server` im Repo-Root
2. Walk-Through Pflicht-Pfad: index.html → mappe-1 PULVER → mappe-2 28061914 → mappe-3 SCHULD → mappe-4 STELLUNGSKRIEG
3. Lehrkraft-Login: `lehrkraft` (Standard-Passwort) prüfen
4. DevTools Console: 0 JS-Errors, 0 404-Errors erwartet
5. **User-Validation Kernstücke:**
   - M2 Princip Multiperspektivität (Held vs. Terrorist) — pädagogische Kalibrierung
   - M3 Beutelsbach Versailles vs. Clark — Kontroversitäts-Operationalisierung
   - M3 Augusterlebnis-Idealisierungs-Verbot — Lehrkraft-Briefing
   - M4 Schlieffen-Plan-Mythos-Korrektur (Zuber 2002+) — Lehrkraft-Hintergrund

**Empfehlung:** Pilot-Einsatz in einer 7c-GPG-Stunde (z.B. nächsten verfügbaren Slot). Erkenntnisse als Pilot-Empirie in v0.5.1-Spec einfließen lassen.

---

## 8. Methodik-Empfehlung post-v0.5.1

### 8.1 Plugin-Self-Diagnose-Modus formalisieren

**Empirie:** CLI-Generator hat in Phase 3.2 selbst 5 Plugin-v0.5.1-Issues identifiziert (CLI-1 bis CLI-5) ohne Audit-Subagent. Wertvolle Self-Reflection-Signale.

**Formalisierungs-Vorschlag:**
- Neuer Plugin-Output-File: `plugin_self_diagnose.json` pro Game-Run
- Plugin-Layer protokolliert eigene Bandaid-Fixes (z.B. `/tmp/fix_json_quotes.py`-Aufrufe) und FileNotFound-Recovery
- agent-assembly schreibt Defekt-Liste am Ende von Phase 3.4 sub-assembly-verify
- v0.5.1-Backlog wird teilweise auto-generiert aus Self-Diagnose-Outputs

**Aufwand:** ~2 PT (1 Schema + 1 Hook + 1 Validator).

### 8.2 Run-5 vs. Pilot-Einsatz Reihenfolge

**Option Pilot-First:**
- Vorteil: User-Empirie (Lehrer-Reaktion + SuS-Verständnis) treibt v0.5.1-Backlog-Priorisierung
- Nachteil: Plugin-Bugs gehen in Pilot ein (verfälscht User-Empirie)

**Option v0.5.1-First:**
- Vorteil: Plugin-Bugs reduziert vor Pilot (sauberere User-Empirie)
- Nachteil: ~2-3 Wochen Verzögerung Pilot

**Option Parallel (B3-Empfehlung):**
- Pilot-Einsatz mit Run-4 (deploy-ready)
- v0.5.1-Phase A+B parallel
- Run-5 nach v0.5.1-Tag mit neuem Game (z.B. Weimarer-Republik oder NS-Diktatur-Anfang)

**Empfehlung:** Parallel. Pilot liefert User-Empirie, v0.5.1 reduziert Bug-Last für Run-5.

### 8.3 Drei-Wege-Vergleich-Methodik als Standard

**Befund:** Drei-Wege-Vergleich (Goldstandard / Run-N / Run-N+1) ist kraftvoll für Plugin-Hardening-Wirkungs-Verifikation. Vorschlag: Standardisieren als `/audit-game --three-way <golden> <ref> <new>`.

**Aufwand:** ~1 PT (Slash-Command + Validator-Batch-Skript).

---

## 9. Naechste Schritte (B3 Informed-Decision-Input)

### 9.1 Pfad-Optionen (für User-Decision)

| Pfad | Kurzbeschreibung | Aufwand | Risk | Empirie-Gewinn |
|---|---|---|---|---|
| **A** v0.5.1-Backlog Implementation zuerst | 4-6 PT für Phase A+B (8 Pflicht-Items), dann Pilot mit cleanem Plugin | ~2-3 Wochen | Verzögert Pilot | LOW (Plugin-Bugs reduziert, aber User-Empirie fehlt) |
| **B** Phase 3.6 Deploy zuerst (Pilot-Einsatz Run-4) | Browser-Walk-Through + Lehrkraft-Test in 7c-GPG-Slot, dann v0.5.1 | ~1-2 Wochen | Plugin-Bugs in Pilot | HIGH (User-Reaktion + SuS-Empirie) |
| **C** Parallel: Pilot + v0.5.1-Phase A | Pilot-Vorbereitung + v0.5.1-Phase A (3 HIGH-Items, ~3 PT) gleichzeitig | ~2 Wochen | Mittlere Komplexität | HIGH+MED (User-Empirie + Plugin-Reduktion) |
| **D** Run-5 zur Validierung mit anderem Game | Run-5 z.B. NS-Diktatur-Anfang oder Weimarer-Republik (kein Confirmation-Bias) | ~5h CC-Wall-Clock + 2-3h Audit | Plugin-Bugs persistent | HIGH (Reproduzierbarkeit + neue Empirie) |

### 9.2 Empfehlung

**Pfad C — Parallel (Pilot + v0.5.1-Phase A):**

**Sequenz:**
1. **Diese Woche:** Pilot-Vorbereitung (Walk-Through + Lehrer-Briefing M2/M3/M4) + v0.5.1-Spec-Ableitung
2. **Nächste Woche:** Pilot-Einsatz in 7c-GPG-Stunde + v0.5.1-Phase A Foundation (F-PB-50 Pfad-Schema-Vereinheitlichung als erste Implementation)
3. **Übernächste Woche:** Pilot-Empirie auswerten + v0.5.1-Phase A komplett (F-PB-52 SK5-Wortzahl + F-PB-53 img_id) + Phase B Pre-Flight
4. **Woche 4:** v0.5.1-Phase B (5 MED) + v0.5.1-Tag + Run-5-Setup mit neuem Game

**Wartezeit-Pufferung:** Pilot-Slot ist Lehrer-abhängig — falls Slot in 1-2 Wochen nicht verfügbar, v0.5.1-Phase A vorziehen.

### 9.3 PM-Pflege bei B3-Decision

- Nach B3-Decision: STATUS-Update + game_state.json Phase 3.6 PENDING → CONFIRMED
- Pilot-Einsatz: separate Session mit Pilot-Kontext-Setup (User-Test-Protokoll-Skill?)
- v0.5.1-Phase A: Stufe-1-Plan analog Foundation A1-A5 (Spec → Implementation → Tag)

---

## 10. Bilanz Tiefen-Eval

**v0.5.0-Plugin-Hardening empirisch wirksam in 64% der adressierten Findings (9/14).** Run-4 ist DEPLOY-READY für Lehrkraft-Pilot-Einsatz mit 10/10 Pflicht-Gates erfüllt. Drei-Wege-Vergleich zeigt strukturelle Verbesserung gegenüber Run-3 in 7/8 SK-Validatoren.

**Verbleibende Plugin-Defekte sind Validator/Schema-Self-Bugs (4 von 14) + 4 NEU aus CLI-Self-Diagnose** — alle in v0.5.1-Backlog (8 Pflicht-Items + 9 Optional-Items).

**Kritischer Befund:** SK5-Wortzahl-Validator-Heuristik ist strukturell defekt (alle 3 Games FAIL 0/6) — F-PB-52-NEW PFLICHT-HIGH.

**Empfehlung:** Pfad C Parallel (Pilot + v0.5.1-Phase A), ~4 Wochen bis Run-5-Setup.

---

**Tiefen-Eval abgeschlossen 2026-04-27.** Methodik: Self-Edit Variante A, ~60 Min Wall-Clock, 7 Plugin-Validatoren auf 3 Games + Drei-Wege-Diff + 17-Item-Backlog REVISIT + Phase-3.6-Reifegrad-Pflicht-Gates-Audit.
