# Run-4 Tiefen-Evaluation — Lessons fuer kuenftige Game-Generierungs-Agenten

**Game:** `gpg-erster-weltkrieg-ursachen-run4-v050`
**Plugin:** escape-game-generator v0.5.0 (Hardening Release)
**Run-Zeitraum:** 2026-04-26 bis 2026-04-27
**Autor:** Tiefen-Evaluation post-Deploy
**Zweck:** Lernartefakt fuer kuenftige Agenten aehnlicher Game-Generierungsprozesse

---

## 1. Primary Request and Intent

User forderte tiefgreifende Evaluation des Gesamt-Runs (`/generate-game gpg-erster-weltkrieg-ursachen-run4-v050 7c 4` plus Phase 3 Assembly + Deploy) zur Identifikation suboptimaler Prozessstellen — als Lernartefakt fuer kuenftige Agenten aehnlicher Game-Generierungsprozesse. Strukturiert, schritthaft, actionable.

---

## 2. Phasen-Map mit Befund-Spalte

| # | Phase | Dauer/Iter | Befund | Schweregrad |
|---|---|---|---|---|
| 0 | Pre-Flight | 1x | PI-Zustandsblock stale (v0.4.2 Run-3 statt v0.5.0 Run-4) | **MEDIUM** |
| 0.1 | Didaktik | 1x | PASS, schema-Luecke `mappen_aufteilung.schema.json` fehlt in v0.5.0 | LOW |
| 0.2 | Inhalt | 1x | PASS, aber material_kandidaten Wikimedia-Filenames ohne Pre-Verifikation persistiert | **HIGH** |
| 0.2.M | Medien | 1x | Plugin-Schutz greift: 4/5 Hallus pre-empt erkannt — **Plugin-Erfolg** | — |
| 0.3 | Skript+Artefakt parallel | 1x | PASS | LOW |
| 0.4 | Hefteintrag | 1x | PASS | LOW |
| 1 | Material-Design (4x parallel) | 1x | **Concurrent-Write am Q-GATE-LOG.md -> 3 Append-Files** | **HIGH** |
| 2.1 M1 | Material seq | 1x | PASS | — |
| 2.1 M2 | Material seq | 1x | PASS aber **rahmen/-Verzeichnis fehlt** (still gefailed) | **HIGH** |
| 2.1 M3 | Material seq | **2x** | **STOP-AND-ASK ESKALATION** wg. game_state.json status=ONBOARDING + falsche Pfad-Annahme | **CRITICAL** |
| 2.1 M4 | Material seq | 1x | PASS | — |
| 2.2a | Progressionsplan (3x parallel) | 1x | PASS | — |
| 2.2b | Aufgaben seq | 1x je | PASS | — |
| 2.2c | Mappenabschluss (4x parallel) | 1x | PASS | — |
| 3.0 | Q-GATE-LOG-Konsolidierung | 1x | Manuell via cat-Pipeline (administrative Last) | LOW |
| 3.1 | Game-Verzeichnis | 1x | Trivial | — |
| 3.2 | data.json Assembly | **4x** | **9 broken JSONs + Schema-Drift x 5 Klassen** | **CRITICAL** |
| 3.4 | sub-assembly-verify | 2x | 1x FAIL -> fixen -> ALL_PASS | MEDIUM |
| 3.X | agent-qualitaet | 1x | **False-Positive S10** (las artefakte/ statt data.json) | **HIGH** |
| 3.5 | git commit | 1x | OK | — |
| 3.6 | Deploy | OK | "ist nicht live" war User-Cache/URL-Verwechslung | LOW |

---

## 3. Anti-Pattern-Katalog (8 Klassen)

### A1 — Stale State Single-Source-of-Truth
**Symptom:** PI-Zustandsblock zeigt Run-3 v0.4.2 obwohl Run-4 v0.5.0 laeuft. game_state.json ebenfalls stale (`status: ONBOARDING` waehrend Phase 2.1 laeuft).
**Wirkung:** agent-material-dispatcher M3 kombinierte stale state + Pfad-Fehlinterpretation -> Eskalations-Stop, der einen Re-Dispatch erforderte.
**Remediation:**
- Pflicht-Hook nach jeder Phase: `update game_state.json` mit phase_history-Append + status-Transition
- Frontmatter `state-advance-policy.md` als Pre-Run-Read in jeden Subagent-Prompt einbauen
- Subagent-Frontmatter MUSS Bash-`ls`-Pfad-Verifikation **vor** ABBRUCH-Entscheidung dokumentieren

### A2 — Concurrent Append-Write ohne Lock
**Symptom:** Phase 1 parallel x 4 -> 3 Append-Files mit unterschiedlichem Naming-Schema:
- `Q-GATE-LOG_phase-1-m1-append.md`
- `Q-GATE-LOG_M2_APPEND.md`
- `Q-GATE-LOG_PHASE-1_M3.md`
- nur M4 mergte sauber in `Q-GATE-LOG.md`

**Wirkung:** Konsolidierung als zusaetzliche Phase 3.0 noetig (3001 Zeilen via cat-Pipeline merged).
**Remediation:**
- **Konvention 1:** Pro-Mappe-Append-Datei mit kanonischem Naming: `Q-GATE-LOG_phase-{P}_M{N}.md` (im Frontmatter forciert)
- **Konvention 2:** Master-Q-GATE-LOG.md ist append-only Index, der alle Sub-Files referenziert
- Konsolidierung optional erst pre-deploy, nicht pre-phase

### A3 — Schema-Drift zwischen Plugin-Output und Engine-Schema
**5 dokumentierte Drift-Klassen:**

| Drift | Plugin-Output | Engine-erwartet | Phase entdeckt |
|---|---|---|---|
| Tafelbild-Knoten | `tafelbild_knoten` | `knoten` | 3.4 V13 FAIL |
| Tafelbild-Verbindungen | `tafelbild_verbindungen` | `verbindungen` | 3.4 V13 FAIL |
| Lueckentext-Feld | `lueckentext_template` / `lueckentext` | `text_mit_luecken` | 3.4 V10 FAIL |
| Mappe-Refs (M3 vs Rest) | `materialien_ref: [strings]` | `materialien: [{$ref}]` | 3.2 Iter 2 |
| v3.11.0+ Quellentext-ID | nur in `_meta`, kein Top-Level `id` | Top-Level `id` | 3.4 V05 FAIL |

**Wirkung:** Assembly-Script musste 5 Normalisierer einbauen (4 Iterationen).
**Remediation:**
- Frontmatter aller Subagenten verpflichtet auf **kanonisches Engine-Schema** statt Plugin-internem
- Validierungs-Hook `tools/check_engine_schema_compat.py` post-Phase-2.1 + 2.2b
- v3.11.0+ Route MUSS `id` im Top-Level-Output dupliziert haben (Path-Recovery defensive in Assembly OK, aber Source-Fix besser)

### A4 — Hallu-Risk bei Source-Persistierung ohne Pre-Verifikation
**Symptom:** agent-inhalt persistiert 5 Wikimedia-Dateinamen, davon 4 halluziniert (Sarajevo_assassination_map.svg, Adolf_Hitler_in_Crowd_at_the_Odeonsplatz_1914.jpg, Bundesarchiv_Bild_146-1970-073-04, Bundesarchiv_Bild_146-1981-046-09A).
**Wirkung:** Phase 0.2.M musste 4 Hallus erkennen + ersetzen (Plugin-Schutz greift, aber nicht-triviale Mehrarbeit).
**Remediation:**
- Frontmatter agent-inhalt: material_kandidaten Wikimedia-Filenames MUSS via `mcp__wikipedia__get_article images[]` vor Persistenz cross-checken
- Hook `pre-write-inhalts-briefing` mit Wikimedia-Existenz-Probe
- Idealfall: agent-inhalt schreibt nur _Suchbegriffe_; agent-medienrecherche resolved sie

### A5 — JSON-Persistierungs-Qualitaet
**Symptom:** 9 Files mit unescaped typografischen Anfuehrungszeichen — `„WORT"` statt `„WORT\"` -> JSON-Parse-Failure in Phase 3.2.
**Files:**
- mappe-2/materialien/mat-2-1.json, mat-2-4.json
- mappe-3/materialien/mat-3-5.json
- mappe-4/aufgaben/aufgabe-4-1.json, 4-5.json, 4-6.json, 4-7.json
- mappe-2/materialien/mat-2-5/material.json
- mappe-3/materialien/mat-3-3/material.json

**Wirkung:** Assembly-Iteration 1 komplett gescheitert; manueller Python-Fixer noetig.
**Remediation:**
- post-write-JSON-Hook: `python3 -c "import json; json.load(open(sys.argv[1]))"` als Validator
- Subagent-Frontmatter strict: deutsche typografische Anfuehrungszeichen IMMER escapen oder ASCII-Anfuehrungszeichen verwenden
- Pflicht: Subagent ruft `tools/validate_json_quotes.py` vor Persist

### A6 — Verifier-Source-Confusion
**Symptom:** agent-qualitaet meldete S10 Bildpfad-BLOCKER mit 3 Schemata gemischt — las jedoch die **artefakte/-Quelldateien** (Pre-Assembly), nicht die assemblierte data.json. Tatsaechlich waren alle 12 Pfade in data.json konsistent + alle 12 Assets vorhanden.
**Wirkung:** False-Positive Deploy-BLOCKER; Erratum musste nachgeliefert werden.
**Remediation:**
- agent-qualitaet Frontmatter explizit: **Single-Source-of-Truth ist die assemblierte `escape-games/{game-id}/data.json`**, nicht die Pre-Assembly-Quellen
- Verifier-Prompt-Template: input_canonical_path Pflicht-Parameter

### A7 — Output-Pflicht-Vollstaendigkeits-Check fehlt
**Symptom:** agent-material-dispatcher M2 erzeugte materialien/ aber **kein rahmen/{hefteintrag,einstieg,sicherung,meta}.json**. Andere Mappen (M1, M3, M4) hatten alle 4 Rahmen-Files.
**Wirkung:** V13-FAIL in Phase 3.4 fuer M2 (leeres hefteintrag); musste ueber Fallback aus globalem `hefteintrag_struktur.json` gemockt werden.
**Remediation:**
- Phase-Abschluss-Hook prueft Pflicht-Output-Inventar pro Mappe (4 rahmen-Files + N materialien + dispatch_meta.json)
- Frontmatter `agent-material-dispatcher` MUSS Pflicht-Output-Liste explizit deklarieren
- Pre-Phase-Transition-Gate D.4 erweitern um Output-Vollstaendigkeit-Check

### A8 — Token-Verbose Subagent-Reports
**Symptom:** Subagent-Output-Reports waren oft mehrseitige Essays (200-600 Zeilen Text). Beispiel: agent-material-dispatcher M3 Eskalations-Stop war ~50 Zeilen verbose Begruendung.
**Wirkung:** Token-Verbrauch hoch; Hauptthread-Kontext fuellt sich schnell.
**Remediation:**
- Subagent-Frontmatter MUSS strukturiertes JSON-Output-Schema vorgeben (z.B. `{verify, failed_checks, details}` fuer sub-assembly-verify) statt freies Markdown
- Verbose-Begruendungen in separate `_meta.notes`-Datei, Hauptreport kompakt

---

## 4. Critical Path Issues (chronologisch)

### CP1 — Phase 2.1 M3 Re-Dispatch-Cascade
**Was passiert ist:**
1. Subagent oeffnet game_state.json -> liest `status: ONBOARDING`
2. Subagent prueft `mappe-3/material_geruest_m3.json` -> existiert nicht (richtige Datei: `gpg-...run4-v050/material_geruest_m3.json`)
3. Subagent kombiniert beides -> ABBRUCH per Vertrag-Fallback-Regeln
4. 50-Zeilen-Eskalations-Message zurueck zum Hauptthread
5. Hauptthread musste game_state.json manuell updaten + RE-DISPATCH mit expliziten Pfaden

**Lessons:**
- Stale state ist gefaehrlicher als geglaubt — 1 falsches Feld im JSON kann Run halt-stoppen
- Subagenten muessen **defensive Pfad-Probes via Bash ls** machen bevor sie der State-Anzeige folgen
- "Tatsaechliche Files > deklarierte State-Anzeige" sollte Vertragsregel sein

### CP2 — Phase 3.2 Assembly-4-Iterationen
**Iteration 1:** 9 broken JSONs (typografische Anfuehrungszeichen) — gefixt mit `/tmp/fix_json_quotes.py`
**Iteration 2:** M3 0/0 weil `materialien_ref: [strings]` Format — gefixt mit dual-format-support
**Iteration 3:** sub-assembly-verify FAIL x 4 mit V05/V07/V10/V13 — gefixt mit normalize_hefteintrag + normalize_aufgabe + global hefteintrag fallback
**Iteration 4:** M2 id="material" wegen `Path("...mat-2-5/material.json").stem == "material"` — gefixt mit parent-dir-fallback

**Lessons:**
- Assembly ist **NICHT mechanisch** wenn die Sources Schema-Drift haben
- Plugin v0.5.0 Anspruch "Phase 3 ist mechanisch" trifft nicht zu — Assembly ist das groesste Defizit
- Eine kanonische Schema-Validation **vor** Phase 2.x-Persist haette alle 4 Iterationen erspart

---

## 5. Pre-Flight-Checklisten-Erweiterungen fuer kuenftige Runs

### Pflicht-Pre-Flight (zusaetzlich zu bestehender)

```
[ ] PI-Zustandsblock-Aktualitaet: STATUS-Feld matched aktuelles Game (kein stale Run-N-1)
[ ] game_state.json existiert UND status reflektiert tatsaechlichen Phase-Stand
[ ] Wenn HANDOVER-File vorhanden: Pause-Punkt + Resume-Trigger gelesen
[ ] mcp__wikipedia connectivity-Probe (bestehend)
[ ] PFAD_MANIFEST gelesen, alle 3 Roots non-empty
[ ] **NEU**: tools/check_engine_schema_compat.py --self-test PASS
[ ] **NEU**: tools/validate_json_quote_escaping.py --self-test PASS
[ ] **NEU**: Bestehender Game-Output-Verzeichnis-Status: leer ODER vollstaendige Run-Marker dokumentiert
```

### Pflicht-Phase-Transition-Hooks

```
post-phase-0.1 -> update game_state.json + Q-GATE-LOG-Append
post-phase-0.2 -> wikipedia-references-Verifikation (Hash-stable Versionsanker)
post-phase-0.2.M -> bilder physisch herunterladen ODER Pflicht-Stub-Marker
post-phase-1 -> 4x rahmen/-Verzeichnis-Vollstaendigkeit pro Mappe
post-phase-2.1 -> JSON-Quote-Escape-Validator + Pflicht-Output-Inventar
post-phase-2.2b -> engine-Schema-Compat-Check (knoten, text_mit_luecken, id, etc.)
post-phase-2.2c -> game_state.json final + UEBERGABE_PHASE_3.md
pre-phase-3 -> Q-GATE-LOG-Konsolidierung + Pre-Assembly-Smoke
post-phase-3.2 -> sub-assembly-verify direkt ohne Optionen
post-phase-3.4 -> agent-qualitaet MIT input_canonical_path=assemblierte data.json
```

---

## 6. Subagent-Frontmatter-Patches (konkret fuer v0.5.1)

### `agent-inhalt.md` — F-PB-50-NEU material_kandidaten-Pre-Verifikation
> Vor Persistenz von `material_kandidaten[].wikimedia_dateiname` MUSS Cross-Reference via `mcp__wikipedia__get_article` images[]-Liste erfolgen. Hash-Stable-URL persistieren statt freier Dateinamen.

### `agent-material-dispatcher.md` — F-PB-51-NEU rahmen-Output-Vollstaendigkeit
> Pflicht-Output-Inventar pro Mappe-Dispatch:
> - materialien/ mit N Files (Legacy oder v3.11.0+)
> - rahmen/{hefteintrag,einstieg,sicherung,meta}.json (4 Files)
> - dispatch_meta.json
> Bei FEHLENDEM File: Self-FAIL mit Detaildiagnose, NICHT silent.

### `agent-skript.md` + `agent-hefteintrag.md` — F-PB-52-NEU Engine-Schema-Pflicht
> Persistierte JSON-Schluessel MUSS Engine-Schema folgen:
> - `knoten` (nicht `tafelbild_knoten`)
> - `verbindungen` (nicht `tafelbild_verbindungen`)
> Plugin-interne Felder duerfen ZUSAETZLICH unter `_meta.plugin_internal.*` mitgegeben werden.

### `sub-aufgabe-lueckentext.md` — F-PB-53-NEU Engine-Feldname
> `text_mit_luecken` Pflicht-Feldname (nicht `lueckentext_template` oder `lueckentext`).

### `sub-material-quellentext.md` (v3.11.0+ Route) — F-PB-54-NEU Top-Level-id
> material.json MUSS Top-Level-`id` enthalten (nicht nur `_meta.id`). Engine + Verifier pruefen Top-Level.

### `agent-qualitaet.md` — F-PB-55-NEU Canonical-Source
> Frontmatter MUSS `input_canonical_path = {{TARGET_PATH}}/escape-games/{game-id}/data.json` deklarieren (NICHT artefakte/-Pre-Assembly-Quellen).

### `sub-assembly-verify.md` — Iteration-Limit-Klaerung
> Aktuell: max 2 Re-Assembly-Iterationen. Nach Run-4-Empirie: schon Iteration 1 reicht meist nicht fuer 5 Drift-Klassen. Empfehlung: max 4 Iterationen ODER vorgelagerter Engine-Schema-Compat-Check.

---

## 7. Architektur-Empfehlungen (Plugin v0.6 Roadmap)

### R1 — Single Source of Truth fuer Engine-Schema
Heute: Engine-Schema ist implizit in der Live-Engine-Code (escape-engine.js). Subagenten erfinden ihre eigenen JSON-Strukturen. Vorschlag: `architektur/engine_schema.json` als kanonische JSON-Schema-Definition, gegen die ALLE Subagent-Outputs validiert werden.

### R2 — Phase 3 als echtes mechanisches Build
Heute: Phase 3 Assembly ist NICHT mechanisch wegen Schema-Drift. Vorschlag: Plugin v0.6 stellt `tools/assembly_runner.py` bereit, der direkt das Engine-Schema produziert — Phase 0/1/2 Outputs MUSS das Schema schon erfuellen.

### R3 — State-Machine als Service
Heute: game_state.json + PI-Zustandsblock manuell gepflegt -> drift-anfaellig. Vorschlag: `tools/state_machine_runner.py` als Pflicht-Wrapper fuer jeden Phase-Uebergang, der state, Q-GATE-LOG-Append, phase_history-Append in einem atomic write macht.

### R4 — Pre-Persist-Validation-Hook-Pipeline
Heute: post-write-Hooks (validators-as-warnings, exit 1). Vorschlag: pre-write-Hooks die Subagent-Output BLOCKEN bis Schema + Quote-Escape + Pflicht-Felder PASS sind.

### R5 — Concurrent-Safe Logging
Heute: Q-GATE-LOG.md ist append-only-Datei -> Konflikte. Vorschlag: append-only-Verzeichnis `Q-GATE-LOG/` mit Files `phase-{P}_M{N}_{timestamp}.md` und auto-merge-Tool.

---

## 8. Run-4-Erfolgs-Faktoren (was hat gut funktioniert)

1. **Plugin v0.5.0 Dual-Channel-Wikimedia-Verifikation** hat 4/5 Hallus pre-empt erkannt. Die F-PB-37/39/48/49-Investments sind klar wertschoepfend.
2. **Beutelsbach-Kontroversitaets-Operationalisierung M3** (vergleich L4 + begruendung CER L5) ohne Antwort-Vorgriff — didaktisch hochwertig.
3. **POLICY_TRIGGER_SICHTBARKEIT V13** strikt durchgehalten ueber 4 Mappen.
4. **F-PB-44 Komposita-Erstgebrauch** in allen Materialien dokumentiert.
5. **Self-Sustained-Run-Mechanik** (Auto Mode) trotz Eskalations-Stop fortsetzungsfaehig durch Hauptthread-State-Update + Re-Dispatch.
6. **sub-assembly-verify** findet V13-Regression zuverlaessig (P0-A2 / F-RA1-06 Schutz greift).

---

## 9. Severity-Ranking der Befunde

**CRITICAL (blockiert Run ohne Workaround):**
- A1 stale state + A3 Schema-Drift x 5 Klassen
- 9 broken JSONs (A5)

**HIGH (Run lief mit Mehrarbeit):**
- A2 Concurrent-Write
- A4 Hallu-Risk (Plugin-Schutz greift)
- A6 Verifier-Source-Confusion
- A7 fehlender Output-Vollstaendigkeits-Check (M2 rahmen/)

**MEDIUM:**
- Iterationen am Assembly-Script (4x)
- Q-GATE-LOG-Konsolidierung als manuelle Phase 3.0

**LOW:**
- A8 Token-Verbose Reports
- mappen_aufteilung.schema.json Luecke
- Stale PI-Zustandsblock-Header

---

## 10. Empfohlener Single-Action-Backlog fuer Plugin v0.5.1 (priorisiert)

| Pri | Item | Linkage | Effort |
|---|---|---|---|
| 1 | Engine-Schema-Compat-Tool + post-phase-2.x-Hook | A3 | M |
| 2 | JSON-Quote-Escape-Validator als pre-write-Hook | A5 | S |
| 3 | rahmen/-Output-Vollstaendigkeits-Check post-phase-2.1 | A7 | S |
| 4 | game_state.json auto-update zwischen Phasen | A1 | M |
| 5 | agent-inhalt material_kandidaten Pre-Verifikation | A4 | S |
| 6 | Sequenzielle Phase-1 ODER kanonisches Append-Naming | A2 | S |
| 7 | agent-qualitaet input_canonical_path deklarieren | A6 | XS |
| 8 | sub-aufgabe-lueckentext text_mit_luecken Engine-Feldname | A3 | XS |
| 9 | v3.11.0+ Top-Level-id Pflicht | A3 | S |
| 10 | tafelbild_knoten -> knoten Vertrag-Vereinheitlichung | A3 | M |

---

## 11. Files & Code Sections der Run-4-Geschichte

### Erstellte Files (gesamt 92+ in artefakte/, 8 in escape-games/)

**Phase 0/1 Outputs (artefakte/):**
- DIDAKTIK_RAHMEN.md, didaktisches_konzept.json, mappen_aufteilung.json
- inhalts_briefing.json, Quellenverzeichnis.md
- medien_katalog_game.json (13 dual-kanal-verifizierte Bilder)
- SKRIPT.md, skript_struktur.json, artefakt_inventar.json
- HEFTEINTRAG_M{1..4}.md, hefteintrag_struktur.json
- BLUEPRINT_M{1..4}.md, material_geruest_m{1..4}.json
- 4x PROGRESSIONSPLAN_Mappe_{1..4}.md
- 4x mappe-N/{materialien, aufgaben, rahmen}/* + mappe-N/data.json + mappe-N/mappenabschluss.json

**Phase 3 Outputs:**
- escape-games/gpg-erster-weltkrieg-ursachen-run4-v050/{index.html, lehrkraft.html, mappe-1..4.html, data.json}
- assets/img/gpg-erster-weltkrieg-ursachen-run4-v050/{12 Asset-Files}

**Tracking/Meta:**
- game_state.json (4 Updates ueber Run hinweg)
- Q-GATE-LOG.md (3001 Zeilen nach Konsolidierung)
- UEBERGABE_PHASE_3.md
- qualitaets_protokoll.md (mit Erratum-Sektion)

### Custom-Tools generiert (in /tmp/, Wegwerf)
- `/tmp/assemble_data_json.py` (4 Iterationen, Final v4)
- `/tmp/fix_json_quotes.py` (typografische-Anfuehrungszeichen-Fixer)

### Git Commits in weitergehts-online (Auszug)
- Run-4 v0.5.0 Game-Assembly
- Run-4 PM-Pflege STATUS+CHANGELOG
- Run-4 PM-Pflege: Phase 3 Deploy-Ready-Status + S10-Erratum
- BEFUND_RUN4_TIEFEN_EVAL: Drei-Wege-Vergleich

---

## 12. Live-Status (zum Zeitpunkt dieser Evaluation)

- Game live: https://weitergehts.online/escape-games/gpg-erster-weltkrieg-ursachen-run4-v050/
- HTTP 200 auf allen URLs (index.html, lehrkraft.html, mappe-1..4.html, data.json)
- Last GitHub-Pages-Deploy: 2026-04-27 08:49:15 UTC
- 5 Workflow-Runs PASS (18-24s je)
- alle 12 Bild-Assets physisch vorhanden, alle 4 Mappen V1-V13 PASS

**Empfehlung User:** Hard-Reload (Cmd+Shift+R) im Browser falls "nicht live" wahrgenommen.

---

## 13. Final-Reflexion

Der Run war **strukturell erfolgreich** (alle Phasen DONE, Game live), aber **prozessual von 8 dokumentierten Anti-Patterns gepraegt**. Plugin v0.5.0 ist deutlich gehaerteter als v0.4.x (F-PB-Items wirken), aber die letzte Meile (Phase 3 Assembly, Schema-Drift, Output-Vollstaendigkeit) ist noch nicht mechanisch. Kuenftige Agenten profitieren am meisten von:

1. **Engine-Schema als Single Source of Truth** etablieren (R1, R2)
2. **Pre-Persist-Validation-Hooks** statt post-Write-Warnings (R4)
3. **State-Machine als Service** mit atomic Phase-Transitions (R3)
4. **Subagent-Frontmatter-Patches F-PB-50..55** (Section 6)

Diese 4 strukturellen Investments wuerden die Mehrarbeit dieses Runs (4 Assembly-Iterationen + 1 Re-Dispatch + 1 Erratum + manuelle Q-GATE-Konsolidierung) auf ~0 reduzieren.

---

**Ende Evaluation.**
