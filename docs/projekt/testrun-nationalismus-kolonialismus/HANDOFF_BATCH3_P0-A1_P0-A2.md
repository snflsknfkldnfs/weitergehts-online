# HANDOFF BATCH-3: P0-A1 + P0-A2 (Pipeline-Regression)

**Erstellt:** 2026-04-18
**Empfaenger:** Claude Code (Dual-Root: weitergehts-online + escape-game-generator)
**Quelle:** R0-TESTRUN-AUDIT, BEFUND §4, BERICHT_RA1_PIPELINE §5.5 + §5.6 + §10.1
**Geschaetzter Aufwand:** 3-4h
**Rueckmelde-Protokoll:** Strukturierter JSON-kompatibler Report (s.u.)
**Voraussetzung:** Pre-Flight-Check PASS vor Launch (siehe CC_COWORK_INTEROP_LEARNINGS §1).

---

## Kontext

R0-TESTRUN-AUDIT hat in RA1 (Pipeline/Prozess) 13 Findings identifiziert, davon 2 P0. Batch-3 schliesst beide:

- **P0-A1 / F-RA1-05** Phase 3.1 Deploy-Preparation uebersprungen/unterdokumentiert bei Mappe 2+3
- **P0-A2 / F-RA1-06** V13-Patch-Regression Hefteintrag-Verschachtelung in Mappe 3

Beide Findings teilen dieselbe Ursache-Klasse: **Durchsetzungsschwaeche**. Vertragsspec + Skript-Gate waren perforiert (V13 wurde ignoriert, DEPLOY-06 wurde nicht ausgefuehrt). Fix: dritte Durchsetzungs-Ebene + Pre-Live-BLOCK.

Detaillierte Referenzen:
- `docs/projekt/testrun-nationalismus-kolonialismus/BEFUND_TESTRUN_N-K_KONSOLIDIERT.md` §4
- `docs/projekt/testrun-nationalismus-kolonialismus/BERICHT_RA1_PIPELINE.md` §5.5 (Phase 3.1), §5.6 (Phase 3.2), §10.1 (Empfehlungen P0-A + P0-B)
- Evidenz: milestones.json / timeline.csv (asst_text 2026-04-16T18:03:59Z, user 2026-04-16T18:14:22Z, asst_text 2026-04-16T18:24:59Z)

---

## Task A: P0-A1 Phase 3.1 Hardening (Pre-Live-BLOCK)

**Repos:** escape-game-generator (Vertrag + Orchestrator), weitergehts-online (deploy-check.sh)
**Aufwand:** 1-2h

### Bug-Beschreibung

Mappe 2 und Mappe 3 gingen live, ohne dass deploy-check.sh + DEPLOY-01..06-Gates protokollarisch nachweisbar durchlaufen wurden (timeline.csv hat deploy-check-Events nur fuer M1). V13-Schutzmechanismus neutralisiert, weil das Durchsetzungs-Skript fuer M3 uebersprungen wurde. Hefteintrag-Defekt wurde post-live bemerkt.

### Aufgabe

**A1.1 VERTRAG_PHASE_3-1_DEPLOY.md Haertung** (`architektur/vertraege/VERTRAG_PHASE_3-1_DEPLOY.md`, escape-game-generator):

- §3 "Gate-Liste" um zusaetzlichen Abschnitt **"Pre-Live-BLOCK"** erweitern:
  ```
  **Pre-Live-BLOCK (Pflicht-Invariante):**
  Die Staging-Flag-Entfernung (Phase 3.2 Live-Go) ist ausschliesslich zulaessig,
  wenn in der aktuellen Session ein dokumentierter DEPLOY-01..06-PASS vorliegt:
  - PI-Feld `LETZTE_DEPLOY_CHECK_STATUS` == `PASS`
  - PI-Feld `LETZTE_DEPLOY_CHECK_TS` existiert, ISO8601, und delta-to-now < 24h
  - PI-Feld `LETZTE_DEPLOY_CHECK_SCOPE` (game_id, mappe_n) matcht das Live-Go-Target
  Verstoss = ROT-Eskalation durch Orchestrator. Live-Go wird blockiert.
  Skip/Unterdokumentation == Verstoss.
  ```
- Bestehende Zeile 97 "Kein State-Advance bei FAIL" um Klausel erweitern: "Ohne LETZTE_DEPLOY_CHECK_STATUS=PASS bleibt Phase 3.2 unzugaenglich — kein implizites Fortschreiten durch Zeitablauf."

**A1.2 ORCHESTRATOR PI-Zustandsblock-Schema erweitern** (`agents/ORCHESTRATOR.md`, escape-game-generator):

- PI-Zustandsblock-Definition um drei Felder erweitern:
  ```
  LETZTE_DEPLOY_CHECK_STATUS: PASS | FAIL | SKIPPED | NONE
  LETZTE_DEPLOY_CHECK_TS:     <ISO8601> | null
  LETZTE_DEPLOY_CHECK_SCOPE:  <game_id>/mappe-<n> | null
  ```
- Phase 3.0 → 3.1 Transition: nach erfolgreichem Assembly PI-Feld `LETZTE_DEPLOY_CHECK_STATUS` auf `NONE` setzen (Reset, da neue Mappe pruefungspflichtig).
- Phase 3.1 → 3.2 Transition: **BLOCK** wenn Pre-Live-BLOCK-Klausel (s. A1.1) nicht erfuellt. Stattdessen ROT-Status + Empfehlung `deploy-check.sh` auszufuehren.
- Phase 3.2 Live-Go: Flag-Entfernung erst nach erneuter Pre-Live-BLOCK-Verifikation (idempotent, defensiv).

**A1.3 deploy-check.sh Q-GATE-LOG-Ausgabe** (`tools/deploy-check.sh`, weitergehts-online):

- Nach erfolgreichem Lauf (alle Gates PASS): **strukturierte Log-Zeile** auf stdout UND in dediziertes Log-File `tools/q-gate-log/<game_id>.log` (Append-only, erstellt bei Bedarf):
  ```
  [Q-GATE-LOG] DEPLOY_CHECK=PASS GAME=<game_id> MAPPE=<n|ALL> TS=<ISO8601_UTC> SCRIPT_VERSION=<git_sha_short>
  ```
- Bei FAIL: analog `DEPLOY_CHECK=FAIL` + `FAILED_GATES=DEPLOY-0X,DEPLOY-0Y` (Komma-Liste).
- Exit-Code unveraendert (0 bei PASS, 1 bei FAIL). Log-Zeile ist zusaetzliche Observability, kein Ersatz.
- Log-File-Schema: eine Zeile pro Lauf, Append-only, Parseable via `grep`/`awk`. `tools/q-gate-log/.gitkeep` anlegen falls Verzeichnis neu.

### Akzeptanzkriterien

- [ ] VERTRAG_PHASE_3-1_DEPLOY.md enthaelt "Pre-Live-BLOCK"-Abschnitt mit allen drei PI-Feld-Referenzen
- [ ] ORCHESTRATOR.md PI-Zustandsblock hat LETZTE_DEPLOY_CHECK_STATUS/TS/SCOPE-Felder
- [ ] ORCHESTRATOR.md Phase 3.1 → 3.2 Transition blockt bei != PASS explizit
- [ ] deploy-check.sh schreibt [Q-GATE-LOG]-Zeile auf stdout + Log-File bei PASS UND FAIL
- [ ] tools/q-gate-log/ existiert (mit .gitkeep)
- [ ] Sanity-Check: 1 Beispiel-Lauf `tools/deploy-check.sh deutscher-nationalismus-kolonialismus` erzeugt Log-Zeile

### Commit-Message-Vorlage (escape-game-generator)

```
feat(pipeline): Pre-Live-BLOCK + PI-Felder LETZTE_DEPLOY_CHECK_*

P0-A1 / F-RA1-05 aus R0-TESTRUN-AUDIT.

VERTRAG_PHASE_3-1_DEPLOY.md §3 erweitert um Pre-Live-BLOCK:
Live-Flag-Entfernung erfordert dokumentierten DEPLOY-01..06-PASS
mit LETZTE_DEPLOY_CHECK_STATUS=PASS, TS<24h, SCOPE-Match.

ORCHESTRATOR.md PI-Zustandsblock um drei Felder erweitert:
- LETZTE_DEPLOY_CHECK_STATUS (PASS|FAIL|SKIPPED|NONE)
- LETZTE_DEPLOY_CHECK_TS
- LETZTE_DEPLOY_CHECK_SCOPE
Transition 3.1→3.2 blockiert bei Verstoss = ROT-Eskalation.

Referenz: BERICHT_RA1 §10.1 P0-A+P0-B.
```

### Commit-Message-Vorlage (weitergehts-online)

```
feat(tools): deploy-check.sh Q-GATE-LOG-Ausgabe + Log-File

P0-A1 / F-RA1-05 aus R0-TESTRUN-AUDIT.

deploy-check.sh schreibt nach jedem Lauf strukturierte Log-Zeile
auf stdout + Append-only File tools/q-gate-log/<game_id>.log:
  [Q-GATE-LOG] DEPLOY_CHECK={PASS|FAIL} GAME=<id> MAPPE=<n> TS=<iso>

Observability-Basis fuer PI-Feld LETZTE_DEPLOY_CHECK_STATUS
(s. escape-game-generator commit).

Referenz: BERICHT_RA1 §10.1 P0-B.
```

---

## Task B: P0-A2 V13-Enforcement (3. Durchsetzungs-Ebene)

**Repo:** escape-game-generator
**Aufwand:** 1-2h

### Bug-Beschreibung

V13 (Sicherung-Hefteintrag-Vollstaendigkeit) ist in `VERTRAG_PHASE_3_ASSEMBLY.md` als Struktur-Check spezifiziert. Bei M1-Assembly am 2026-04-12 ignoriert, Post-hoc-Patch war Reaktion. Bei M3-Assembly am 2026-04-16 (96h spaeter) **erneut ignoriert** — identischer Defekt. Zwei Durchsetzungs-Ebenen (Vertragsspec + DEPLOY-06-Skript) perforiert.

**Ziel:** dritte Durchsetzungs-Ebene zwischen `data.json`-Write und `git commit`, als Post-Assembly-Subagent.

### Aufgabe

**B1 VERTRAG_PHASE_3_ASSEMBLY.md V13 haerten** (`architektur/vertraege/VERTRAG_PHASE_3_ASSEMBLY.md`):

- V13-Definition Zeile 177 umformulieren als **"MUST_VERIFY Post-Assembly"**. Bestehende Struktur-Check-Formulierung bleibt, aber Verbindlichkeits-Marker + Pruef-Referenz ergaenzen:
  ```
  | V13 | MUST_VERIFY Post-Assembly: Sicherung-Hefteintrag-Vollstaendigkeit
         | `data.mappen[N-1].sicherung.hefteintrag` existiert als Objekt,
           enthaelt `knoten[]` (len > 0), `scpl` (nicht null),
           `stundenfrage` (nicht leer)
         | Pruefung durch SUB_ASSEMBLY_VERIFY nach data.json-Write,
           VOR git commit. Bei FAIL: commit blockiert, Orchestrator eskaliert. |
  ```
- Neuer Abschnitt `§4 Post-Assembly-Verifikation`: Pflicht-Einsatz von `SUB_ASSEMBLY_VERIFY` (Spec in B2). CC darf `data.json` erst als "assembliert" markieren und committen, wenn Sub-Agent `verify: PASS` zurueckgibt.
- Python-Snippet in §4 als Referenz-Implementierung einbetten (identisch zur DEPLOY-06-Logik, aber im CC-Kontext, nicht im Shell-Skript). Keine Abhaengigkeit zu deploy-check.sh.

**B2 Sub-Agent SUB_ASSEMBLY_VERIFY.md anlegen** (`agents/SUB_ASSEMBLY_VERIFY.md`, NEU):

- Spec-Struktur analog zu bestehenden SUB_*.md:
  ```
  # SUB_ASSEMBLY_VERIFY
  ## Rolle
  Post-Assembly-Verifier fuer Phase 3.0. Prueft die assemblierte data.json
  gegen Vertrag VERTRAG_PHASE_3_ASSEMBLY.md V1-V13, BEVOR git commit.
  ## Input
  - `data_json_path`: Pfad zur assemblierten data.json
  - `mappe_n`: Index der gerade assemblierten Mappe (1-basiert)
  ## Ausgabe
  {
    "verify": "PASS" | "FAIL",
    "failed_checks": ["V13", "V07", ...],
    "details": {"V13": "sicherung.hefteintrag fehlt knoten[]", ...}
  }
  ## Pruefungs-Logik
  V1-V13 programmatisch gegen data.json[mappen][N-1] pruefen. Jede V-Nummer
  entspricht einer Pflicht-Invariante aus VERTRAG_PHASE_3_ASSEMBLY §3.
  Bei einem einzigen FAIL: verify=FAIL, failed_checks enthaelt alle FAILs
  (nicht fail-fast — alle Checks laufen, um vollstaendiges Bild zu liefern).
  ## Verbotenes
  - Kein data.json schreiben (nur lesen).
  - Keine Heuristik / kein Interpretieren — nur exakte Struktur-Checks.
  - Kein Fallback auf "wahrscheinlich OK".
  ## Freigabe-Kriterium
  verify=PASS → Orchestrator gibt git-commit frei.
  verify=FAIL → Orchestrator eskaliert: data.json-Assembly erneut, mit
    Diagnose `failed_checks` als Input fuer den naechsten Assembly-Prompt.
  ```
- Python-Pruef-Code als Referenz in Spec (inline), damit CC ihn direkt reproduzieren kann.

**B3 ORCHESTRATOR Phase 3.0 Transition erweitern** (`agents/ORCHESTRATOR.md`):

- Phase 3.0 State-Machine: nach `data.json`-Write explizit SUB_ASSEMBLY_VERIFY-Aufruf einfuegen.
- Transition 3.0 → 3.1 nur bei `verify=PASS`. Bei `FAIL`: Rollback (git-Stash oder Dateirueckrollung) + Re-Assembly mit `failed_checks` als Kontext. Max. 2 Iterationen, dann ROT-Eskalation an User.
- State-Diagramm-Anpassung optional (falls ORCHESTRATOR.md ein Mermaid-Diagramm enthaelt, Knoten `ASSEMBLY_VERIFY` zwischen 3.0 und 3.1 einfuegen).

**B4 Regression-Test auf N-K Mappe 3** (optional, Evidenz):

- SUB_ASSEMBLY_VERIFY-Pruef-Code auf bestehende `weitergehts-online/escape-games/deutscher-nationalismus-kolonialismus/data.json` Mappe 3 anwenden.
- Erwartbar: V13-FAIL, weil Hefteintrag-Verschachtelung dort historisch fehlte (Live-Defekt-Reproduktion).
- Falls durch Post-Live-Patch inzwischen korrigiert: V13-PASS, aber Kommentar im Rueckmelde-Bericht.
- Kein Git-Commit dieses Tests — nur Ergebnis im Report.

### Akzeptanzkriterien

- [ ] VERTRAG_PHASE_3_ASSEMBLY.md V13 als "MUST_VERIFY Post-Assembly" gekennzeichnet
- [ ] VERTRAG_PHASE_3_ASSEMBLY.md §4 "Post-Assembly-Verifikation" existiert mit Python-Snippet
- [ ] agents/SUB_ASSEMBLY_VERIFY.md existiert, vollstaendige Spec (Rolle, I/O, Logik, Verbotenes, Freigabe)
- [ ] ORCHESTRATOR.md Phase 3.0 ruft SUB_ASSEMBLY_VERIFY vor Transition 3.0 → 3.1
- [ ] Rollback-Mechanismus + Re-Assembly-Iteration spezifiziert (max. 2)
- [ ] B4 Regression-Test-Ergebnis im Rueckmelde-Bericht (PASS|FAIL|N/A)

### Commit-Message-Vorlage (escape-game-generator)

```
feat(contracts): SUB_ASSEMBLY_VERIFY + V13 als MUST_VERIFY Post-Assembly

P0-A2 / F-RA1-06 aus R0-TESTRUN-AUDIT.

Dritte Durchsetzungs-Ebene gegen V13-Regression (Hefteintrag-
Verschachtelung M1 + M3). V13 im Vertrag sowie DEPLOY-06 im Skript
waren perforiert: CC ignorierte Vertragsspec, deploy-check.sh fuer
M3 uebersprungen.

Neu:
- VERTRAG_PHASE_3_ASSEMBLY.md: V13 als MUST_VERIFY Post-Assembly.
  §4 ergaenzt mit Python-Referenz-Implementierung.
- agents/SUB_ASSEMBLY_VERIFY.md (NEU): Post-Assembly-Verifier Spec.
  Input: data.json + mappe_n. Output: verify + failed_checks.
- agents/ORCHESTRATOR.md: Phase 3.0 ruft Verifier VOR git commit.
  verify=FAIL blockt, max. 2 Re-Assembly-Iterationen.

Regression-Test (B4): <PASS|FAIL|N/A> auf N-K Mappe 3.

Referenz: BERICHT_RA1 §10.1 P0-A.
```

---

## Rueckmelde-Protokoll (JSON-kompatibel)

Nach Abschluss beider Tasks — strukturierter Report am Ende der CC-Session:

```
BATCH-3 REPORT
==============
task_a_p0_a1:
  commit_eg:  <SHA in escape-game-generator>
  commit_wo:  <SHA in weitergehts-online>
  files_touched_eg:
    - architektur/vertraege/VERTRAG_PHASE_3-1_DEPLOY.md
    - agents/ORCHESTRATOR.md
  files_touched_wo:
    - tools/deploy-check.sh
    - tools/q-gate-log/.gitkeep (ggf. neu)
  sanity_checks:
    pre_live_block_in_vertrag:         PASS | FAIL
    pi_felder_in_orchestrator:         PASS | FAIL
    q_gate_log_stdout_zeile:           PASS | FAIL
    q_gate_log_file_write:             PASS | FAIL
    beispiel_lauf_deploy_check:        PASS | FAIL
  acceptance: PASS | PARTIAL (<welche Checks fehlen>)

task_b_p0_a2:
  commit_eg:  <SHA in escape-game-generator>
  files_touched_eg:
    - architektur/vertraege/VERTRAG_PHASE_3_ASSEMBLY.md
    - agents/SUB_ASSEMBLY_VERIFY.md (NEU)
    - agents/ORCHESTRATOR.md
  sanity_checks:
    v13_must_verify_marker:            PASS | FAIL
    vertrag_§4_python_snippet:         PASS | FAIL
    sub_assembly_verify_vollstaendig:  PASS | FAIL
    orchestrator_transition_patch:     PASS | FAIL
    rollback_max_2_iter:               PASS | FAIL
  regression_test_b4:
    n_k_mappe_3_v13:                   PASS | FAIL | N_A
    details:                           <1-2 Saetze>
  acceptance: PASS | PARTIAL (<welche Checks fehlen>)

deviations: <keine | beschrieben>
elapsed: <HH:MM>
```

PM-Cowork aktualisiert danach:
- `docs/projekt/STATUS.md` P0-Tabelle (A1 + A2 CLOSED → 6/6 P0 CLOSED)
- `docs/projekt/CHANGELOG.md` Batch-3-Eintrag
- `docs/projekt/CC_COWORK_INTEROP_LEARNINGS.md` v0.2 → v1.0 promoten + Verankerung in `COWORK_PROJECT_ANLEITUNG.md`
- v3.12-Pilot-Freigabe pruefen

---

## Nicht-Ziele dieses Batches

- P1-Findings aus BERICHT_RA1 (F-RA1-01, F-RA1-07, F-RA1-10) — Folge-Batch
- CONSTRAINT_BUNDLE.md (F-RA1-10) — P1, separat
- Post-Patch-Live-Verify Phase 3.2b (F-RA1-07) — P1, separat
- Kompaktions-Drift-Mitigation — out-of-scope
- Mappe-4-Assembly (ausstehend aus Batch-2 Task A) — folgt natuerlichem Pipeline-Lauf

---

## Pre-Flight-Protokoll (verpflichtend vor CC-Launch)

1. Pre-Flight-Check (CC_COWORK_INTEROP_LEARNINGS §1):
   ```bash
   claude -p --output-format json 'say OK' \
     | python3 -c "import sys,json; d=json.load(sys.stdin); \
       print('MAX-OK' if not d.get('is_error') else 'AUTH-BROKEN: '+d.get('result',''))"
   ```
   Exit mit `AUTH-BROKEN` → `/login` in TUI ausfuehren, erst dann Launch.
2. Lock-Cleanup in beiden Repos: `ls .git/index.lock` muss "No such file" zurueckgeben.
3. Background-Launch-Pattern (CC_COWORK_INTEROP_LEARNINGS §2) mit `/tmp/cc_batch3_*`-Namensraum.
4. Live-Transcript-Viewer + Metrics-Sampler (CC_COWORK_INTEROP_LEARNINGS §8) aktivieren.
5. Post-Run: Audit-Tool auf Transcript (`tools/cc-session-audit.py`) — Compliance-Matrix: Scope-konform (keine Out-of-Scope-Files), Errors=0.
