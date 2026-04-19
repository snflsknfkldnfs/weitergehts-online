# CC-Cowork-Interop: Learnings (Kanon v1.1)

**Status:** KANON v1.1 — Evidenz-Basis n=4 (Batch-1 manuell, Batch-2 headless mit Recovery, Batch-3 headless mit Pre-Flight-Wrapper + Dashboard-Triade, F0b.2b headless mit v1→v2-Incident-Recovery + Prevent-First-Gate).
**Erstellt:** 2026-04-18 (v0.1)
**Promoted:** 2026-04-19 (v0.2 → v1.0 nach Batch-3-Validierung, F2 aus P0-Follow-up-Kanon)
**Letzte Aktualisierung:** 2026-04-19 (v1.1: +§1.1 Launcher-Kanon v2, +§1.2 Host-Dual-Root + Pfad-Praeflight-Pflicht, +§1.3 v1→v2-Incident F0b.2b; vorherige Updates: +§10 Batch-3-Evidenz, §9 Finalisierungs-Plan abgeloest durch §11 Offene Entscheidungspunkte)
**Verankerung:** `COWORK_PROJECT_ANLEITUNG.md` v2.3 Abschnitt 2 Pflichtlektuere (bei CC-Operationen) + Abschnitt 1 HANDOFF-Modus-Verweis auf §4.

Diese Datei konsolidiert operative Learnings zur Steuerung von Claude Code (CC) aus einer Cowork-PM-Session heraus via Host-MCP und Desktop-Commander-MCP. Ziel: reproduzierbarer Handoff-Workflow ohne stille Fehler.

---

## 1. CC-Steuerbarkeit (Minimal-Test bestaetigt)

**CLI-Position:** `/opt/homebrew/bin/claude` (v2.1.114, Homebrew). Annahme: stabil auf Dev-Maschine.

**Authentifizierung — KRITISCH (korrigiert 2026-04-18 nach Batch-2-Abbruch):**
- CC CLI hat ZWEI getrennte Auth-Pfade: **Claude-Subscription (Max/Pro/Team)** vs. **Anthropic Console API-Billing**. Der gewaehlte Pfad persistiert in CC-Config und ist NICHT automatisch an Max gebunden, auch wenn Keychain-OAuth-Creds existieren. Erst-Setup kann silent auf API-Billing landen.
- **Symptom wenn falsch konfiguriert:** Header-Zeile in CC-TUI zeigt `Sonnet 4.6 · API Usage Billing` statt `Opus 4.7 · Claude Max`. Run bricht mit `api_error_status: 400`, `result: "Credit balance is too low"`, `is_error: true` ab — obwohl Max-Plan voll unverbraucht.
- **Fix:** In interaktiver TUI `/login` → Option 1 "Claude account with subscription". Browser-OAuth-Flow → Code-Paste → Header wechselt auf `Claude Max · <org>`. Danach nutzt auch `-p` headless den Max-Pfad.
- **Pre-Flight-Check vor jedem Long-Run (verpflichtend):**
  ```bash
  claude -p --output-format json 'say OK' \
    | python3 -c "import sys,json; d=json.load(sys.stdin); \
      print('MAX-OK' if not d.get('is_error') else 'AUTH-BROKEN: '+d.get('result',''))"
  ```
  Exit mit "AUTH-BROKEN: Credit balance is too low" → Abbruch, `/login` ausfuehren, erst dann Handoff-Batch starten.
- **Kanonischer Wrapper:** `tools/cc-launch.sh` kapselt den Pre-Flight-Check + exec-claude in einem Aufruf. Fuer alle CC-Starts (interaktiv + headless) ab Batch-3 verpflichtend:
  ```bash
  # Headless-Start (mit Fallback-Abbruch bei Auth-Fehler):
  ./tools/cc-launch.sh -p --dangerously-skip-permissions \
    --add-dir /Users/paulad/escape-game-generator \
    --output-format stream-json --verbose \
    "$(cat /tmp/cc_batch_prompt.txt)"

  # Interaktiv-Start (Pre-Flight-Check → TUI):
  ./tools/cc-launch.sh
  ```
  Exit 2 bei AUTH-BROKEN, sonst exec claude mit User-Args. perl-alarm-Timeout (macOS-portabel, kein coreutils noetig).
- **Misleading:** `total_cost_usd` in JSON-Output wird auch bei Max-Nutzung als API-Referenz-Preis geliefert (z.B. $0.07 fuer Hello-World-Run). Heisst NICHT dass API-Account abgerechnet wurde. Auth-Pfad-Unterscheidung sicher NUR ueber TUI-Header oder initialen `/login`-Status.
- **Rate-Limit-Mechanik offen:** Wenn Max-5h-Fenster erschoepft, fallback auf API — dann wieder Credit-Fehler wenn API-Account leer. Verhalten nicht stichprobenartig getestet.
- **`--bare`:** DEPRECATED fuer diesen Workflow. Verlangt `ANTHROPIC_API_KEY`, liest weder Keychain noch OAuth. Nur fuer Sandbox-Szenarien.

**Tool-Calls ohne Prompt:**
- `--dangerously-skip-permissions` notwendig fuer non-interactive Tool-Execution. Ohne den Flag blockieren Tool-Calls in `-p`-Mode.
- Risiko: CC kann beliebige Tools ausfuehren. Scope-Kontrolle ueber expliziten Prompt + `--allowedTools` optional.

**Output-Parsing:**
- `--output-format json` liefert Single-Result-Objekt mit Feldern: `result`, `session_id`, `is_error`, `stop_reason`, `total_cost_usd`, `permission_denials`, `usage`, `terminal_reason`.
- Session-ID ermoeglicht Resume via `--resume <uuid>`.
- `--output-format stream-json` fuer realtime-streaming (groesserer Parse-Aufwand, lohnt bei langen Runs).

**Projekt-Kontext:**
- `cd <repo_root> && claude -p ...` setzt CLAUDE.md-Discovery + MCP-Config + Skills auf den Root.
- `--add-dir <absolute_path>` erweitert File-Access-Scope auf zusaetzliche Verzeichnisse (Dual-Root-Faelle).

**Timings (empirisch):**
- Warm-Start (/tmp, minimal): 3 s
- Projekt-Start (weitergehts-online, volles Kontext-Load): 8 s
- Multi-Tool-Chain klein: 8 s
- Lang laufender Task mit WebFetch/MCP-Calls: min-Bereich (Stichprobe folgt aus Batch-2)

### 1.1 Launcher-Kanon v2 (post-F0b.2b, verpflichtend ab 2026-04-19)

Ein CC-Launcher-Skript (z.B. `docs/projekt/cc_prompts/cc_launch_<taskid>.sh`) muss **strukturell** drei Schichten hintereinander durchlaufen, jede mit expliziter Abbruch-Bedingung:

1. **Prevent-First-Gate** (`tools/cc-launch-preflight.sh`) — prueft Pfade + Prompt-Groesse + Host-Dual-Root-Nested-Pfad-Hits VOR Auth-Check. Exit 2 bei rotem Gate. Verhindert F0b.2b-Klasse-Fehler (ENOENT, argv-Hang, Prompt-Oversize).
2. **Auth-Pre-Flight** (`tools/cc-launch.sh`) — prueft Max-Subscription vs. API-Billing-Fallback. Exit 2 bei AUTH-BROKEN.
3. **Exec CC** — via stdin-pipe (`< "${PROMPT_FILE}"`), **nicht** via argv, weil Bun-runtime claude-CLI bei grossen Multi-Line-Prompts auf argv `kevent64`-Hang zeigt.

**Kanonisches Template:** `tools/cc-launch-TEMPLATE.sh` (v2). Fuer jeden neuen Launcher kopieren, Variablen-Block oben anpassen (LAUNCHER_LABEL, TASK_ID, REPO_ROOT, ADD_DIRS, PROMPT_FILE).

**Regel:** Kein neuer CC-Launcher darf direkt `exec claude` oder direkt `cc-launch.sh` aufrufen, ohne zuvor `cc-launch-preflight.sh` durchlaufen zu haben. Bei Abweichung → Gate-Eintrag in STATUS.md mit Begruendung + Gegenzeichnung.

**Gates in `cc-launch-preflight.sh`:**
| Gate | Pruefung | Rot bedeutet |
|---|---|---|
| 1 | `CC_PROMPT_FILE` gesetzt, existiert, lesbar, `<= CC_MAX_PROMPT_BYTES` (Default 32768) | argv-Hang-Risiko oder fehlender Prompt |
| 2 | `CC_PRIMARY_DIR` existiert (+ WARN wenn kein `.git`) | CC startet mit falschem CLAUDE.md-Discovery |
| 3 | Alle `CC_ADDITIONAL_DIRS`-Eintraege existieren | `--add-dir ENOENT` → v1-Incident-Klasse |
| 4 | Prompt enthaelt keinen Nested-Pfad `/Users/paulad/weitergehts.online/escape-game-generator` | Host-Dual-Root-Drift → ENOENT-Werte im Prompt |
| 5 | `cc-launch.sh` existiert + ausfuehrbar | Auth-Check nicht delegierbar |

### 1.2 Host-Dual-Root-Layout + Pfad-Praeflight-Pflicht

**Host-Layout (Stand 2026-04-19):**
```
/Users/paulad/
├── escape-game-generator/                          ← Repo 1 (Generator, Deploy-Source)
└── weitergehts.online/
    └── weitergehts-online/                         ← Repo 2 (PM-Working-Directory)
```

Die beiden Repos sind **SIBLINGS** auf `/Users/paulad/-Ebene`, **NICHT** nested unter `/Users/paulad/weitergehts.online/`. Letzterer ist ein Ordner-Zwischenpfad, der nur `weitergehts-online/` enthaelt — `escape-game-generator` liegt dort **nicht**.

**Typischer Drift-Fehler (F0b.2b-v1-Run):** Launcher-Prompt oder Launcher-Script-Header referenziert `/Users/paulad/weitergehts.online/escape-game-generator/` (nested). Dieser Pfad existiert am Host nicht. CC erhaelt den String via `--add-dir` oder via Prompt-Inline-Referenz, sucht, findet nicht, gibt ENOENT zurueck oder scheitert an Schreib-Operationen mit halbherzigem Pfad-Default auf CWD. Ergebnis: v1-Run schrieb Artefakte ins falsche Repo oder brach silent ab.

**Regel (verpflichtend):**
- Jeder Launcher muss `CC_ADDITIONAL_DIRS` vor Exec via Preflight-Gate-3 pruefen (existenz-getestet).
- Jeder Prompt muss vor Exec via Preflight-Gate-4 auf Nested-Pfad-Hits gegreppt werden (Regex `/Users/paulad/weitergehts\.online/escape-game-generator`).
- Korrekturen im Prompt gehen an `/Users/paulad/escape-game-generator/` (ohne `weitergehts.online`-Zwischenpfad).

**Warum Gate 4 kein Nice-to-have ist:** Der Nested-Pfad wirkt plausibel (Repo-Namen sind aehnlich, Ordner `weitergehts.online` existiert als Zwischenlage). Menschliche Review faellt dem reliable zum Opfer. Maschinelle Regex-Pruefung ist der einzige sichere Gegen-Mechanismus.

### 1.3 v1→v2-Incident (F0b.2b, 2026-04-19)

**Kontext:** F0b.2b CC-Handoff A1-A4 sollte 10 Scripts + 6 Schemata + Engine-Fix generieren. v1-Launcher scheiterte; v2-Launcher erfolgreich nach Infrastruktur-Fix.

**v1-Symptome:**
- **Argv-Hang (`kevent64`):** Prompt (5546 Zeichen) als argv an `claude -p "$PROMPT"` uebergeben → Bun-runtime hing beim Argument-Parsing im `kevent64`-Syscall. Keine Error-Message, kein Timeout-Exit, PID zombified nach ~3 s CPU-Time. Reproduzierbar ab ~3 KB argv-size auf macOS-ARM.
- **ENOENT auf `--add-dir`:** Launcher referenzierte `/Users/paulad/weitergehts.online/escape-game-generator` (nested, existiert nicht). CC startete silent, fand den Pfad nicht, schrieb Artefakte in PM-Repo (`weitergehts-online`) statt Generator-Repo.
- **Pre-Flight-Auth-Check frass stdin:** `cc-launch.sh`-Pre-Flight nutzte stdin fuer `claude -p 'say OK'` — wenn Launcher `< "${PROMPT_FILE}"` pipe-te, hat der Pre-Flight-Hello-World-Run den Haupt-Prompt stdin-stream konsumiert, bevor der Exec-Call ihn sah.

**v2-Fixes (in Reihenfolge der Anwendung):**
1. **stdin-pipe statt argv** fuer Prompts (`< "${PROMPT_FILE}"` vor dem Pipe an tee). Loest argv-Hang strukturell.
2. **Pre-Flight stdin-Isolation** in `cc-launch.sh` → `perl -e 'alarm shift; exec @ARGV' ... claude -p ... < /dev/null`. Pre-Flight-Call bekommt eigenen leeren stdin, beruehrt den Haupt-Run-stdin nicht.
3. **Nested-Pfad-Korrektur** im Launcher: `GENERATOR_DIR="/Users/paulad/escape-game-generator"` (flat, Sibling zu weitergehts-online).
4. **Prevent-First-Gate** (`tools/cc-launch-preflight.sh`) — strukturell, nicht Protokoll-basiert. Siehe §1.1.

**Ergebnis v2-Run:** 10 scripts + 6 schemata generiert, F0b.2b-Erfolg. 10 dry-runs der generierten Scripts dokumentiert, A3.1 protokollkonform geskippt (siehe STATUS).

**Konsequenz fuer Kanon:** Launcher-Kanon v2 (§1.1) ist jetzt **verpflichtend** fuer alle neuen CC-Handoffs. Bestehende Launcher (Batch-1, Batch-2, Batch-3, F0b.2b-v2) bleiben Referenz-Artefakte — **nicht** rueckwirkend migrieren (Risk vs. Benefit: keine neue Ausfuehrung geplant).

**Lesson:** Strukturelle Gates (Shell-Script, Exit-Code) schlagen Protokoll-Gates (Checklist im Markdown). Ein menschlicher Reviewer uebersieht einen Nested-Pfad; ein `grep -c` nicht.

---

## 2. Background-Launch-Pattern

### 2.0 Ausfuehrungsmodi: Entscheidungsregel

CC wird ab Batch-3 situativ in zwei Modi gestartet. Wahl liegt beim PM-Cowork:

| Modus | Auslese | Dashboard? | Wann geeignet |
|---|---|---|---|
| **Interaktiv (TUI)** | `./tools/cc-launch.sh` (ohne Args) | TUI IST das Dashboard | Explorative Tasks, Live-Begleitung, Debug, Neustarts nach Stall, User-Interaction gewuenscht |
| **Headless (non-interactive)** | `./tools/cc-launch.sh -p --dangerously-skip-permissions ... "$PROMPT"` | Separates tail/jq-Dashboard + metrics-sampler | Batch-Handoffs mit festem Prompt, parallele PM-Arbeit, Auditierbarkeit ueber stream-json-Transcript, Wiederholbarkeit |

**Defaults:**
- P0-Batch-Handoffs (klarer Auftrag, bekannter Scope) → headless + Dashboard.
- Recovery-Runs nach Teil-Stall → headless + Dashboard (scope-enger Prompt).
- Diagnose-Sessions / unklarer Scope → interaktiv.

**Dashboard-Kombi fuer headless (3 osascript-Fenster bzw. -Tabs):**
1. Transcript-Live: `tail -F ~/.claude/projects/<slug>/<uuid>.jsonl | jq -c '...'` (siehe §8.1)
2. Metrics-Sampler: CSV-Schreiber, 3 s Intervall (siehe §8.2)
3. Post-Run-Audit: `tools/cc-session-audit.py <jsonl>` am Ende (siehe §8.3)

### 2.1 Background-Launch-Pattern (headless)

**Problem:** Desktop-Commander `start_process` ist BLOCKIEREND bis zum eigenen `timeout_ms` oder Prozess-Exit. Nicht geeignet fuer Long-Running-CC-Runs (>60-120 s).

**Loesung:** `nohup` + `&` via osascript + File-Output + PID-File.

**Kanonisches Pattern:**
```bash
# Launch-Skript nach /tmp/launch_cc_*.sh via osascript heredoc
rm -f /tmp/cc_<id>_output.json /tmp/cc_<id>_err.log /tmp/cc_<id>_pid.txt /tmp/cc_<id>_start.txt
cd /path/to/primary/repo || exit 2
PROMPT=$(cat /tmp/cc_<id>_prompt.txt)
nohup /opt/homebrew/bin/claude -p --dangerously-skip-permissions \
  --add-dir /path/to/secondary/repo \
  --output-format json \
  "$PROMPT" > /tmp/cc_<id>_output.json 2> /tmp/cc_<id>_err.log &
echo "$!" > /tmp/cc_<id>_pid.txt
date +%s > /tmp/cc_<id>_start.txt
```

**Polling-Loop (osascript `do shell script`):**
```bash
NOW=$(date +%s); START=$(cat /tmp/cc_<id>_start.txt)
echo elapsed=$((NOW-START))s
CCPID=$(cat /tmp/cc_<id>_pid.txt)
ps -p $CCPID -o pid,stat,time,rss 2>&1 | head -2
wc -c /tmp/cc_<id>_output.json /tmp/cc_<id>_err.log 2>&1
```

**Caveats:**
- **osascript `-e` default timeout ~60 s.** `with timeout of X seconds ... end timeout` funktioniert NICHT reliable in `osascript -e`-Argument (AppleScript-Parser-Problem). Workaround: keine sleeps >30 s innerhalb des Shell-Commands; polle stattdessen via separate osascript-Calls.
- **Sandbox-Pfade (`/sessions/.../mnt/...`) sind nicht am Host sichtbar.** Scripts fuer Host-Ausfuehrung muessen via osascript heredoc direkt nach `/tmp/` geschrieben werden, nicht via `cp` aus Sandbox.
- **PID-Capture ist Pflicht.** Ohne PID kein Prozess-Exit-Check, kein Kill. `echo $! > pidfile` sofort nach `&`.
- **JSON-Output ist Single-Shot am Ende.** Output-File ist bis zum Ende 0 bytes. Progress-Check primaer ueber `ps` (Status + CPU-Time) und `err.log`-Tail (stderr-warnings).

---

## 3. Git via Host-MCP (5-Stufen-Protokoll, validiert)

Kanonisches Dokument: `docs/projekt/GIT_WORKFLOW_HOST_MCP.md` v1.0.

**Validiert in Batch-1 (6 Commits + 4 Pushes):**
- Kombi-Command (add + commit + push + verify) in einem osascript-Call: robust.
- Base64-Encoding fuer Commit-Messages mit Umlauten/Sonderzeichen: notwendig, AppleScript-Shell-Escaping ist unreliable sonst.
- Lock-Cleanup-Check vor Staging: Pflicht (virtiofs-Residuen von Sandbox-git-Versuchen).
- Explizite Dateinamen statt `git add .`: verhindert ungewolltes Staging von `.claude/worktrees`-Artefakten.

**Beispiel-Call:**
```
cd <repo> && <lock-check> && git add <explizit> \
  && echo <base64-msg> | base64 -d | git commit -F - \
  && git push origin main \
  && git log --oneline -1
```

---

## 4. Handoff-Protokoll (Pattern aus Batch-1 + 2)

**Struktur eines Handoff-Markdowns (empfohlen):**
1. **Kontext-Block** — Quelle, Aufwand, Empfaenger, Rueckmelde-Protokoll
2. **Task-Block je Task** mit Feldern:
   - Repo, Datei, Zeile, Aufwand
   - Bug-Beschreibung
   - Aufgabe (praezise, nummeriert)
   - Akzeptanzkriterien (Checklist)
   - Commit-Message-Vorlage
3. **JSON-kompatibles Rueckmelde-Protokoll** — Felder: commit-SHAs, acceptance-Urteil pro Task, deviations, elapsed
4. **Nicht-Ziele** — was NICHT in diesem Batch

**Pfad-Assertion-Regel (Learnings Batch-1):**
- `docs/agents/artefakte/` liegt in `weitergehts-online`, NICHT in `escape-game-generator`. Batch-1-Handoff hatte falschen Pfad angegeben — CC hat eigenstaendig korrekt lokalisiert. Fuer Automation unzuverlaessig.
- **Regel:** Jeder Pfad im Handoff muss mit `git ls-files | grep <path>` oder `ls` im richtigen Repo verifiziert sein vor Handoff-Commit.

**Rueckmelde-Format (maschinenlesbar-orientiert):**
```
BATCH-N REPORT
==============
task_a:
  commit: <SHA in repo_a>
  acceptance: PASS | PARTIAL (<details>)
task_b:
  commit: <SHA in repo_b>
  acceptance: PASS | PARTIAL (<details>)
deviations: <keine | beschrieben>
elapsed: <HH:MM>
```

---

## 5. Desktop Commander vs osascript (Entscheidungsregel)

| Scenario | Bevorzugtes Tool |
|---|---|
| Kurzlaufende Shell-Calls (<30 s), blockierend OK | osascript `do shell script` |
| Langlaufende Prozesse (>60 s), Background | osascript + `nohup &` + polling |
| File-Lesen/Schreiben am Host | Desktop Commander `read_file`/`write_file` |
| Interaktive Python/Node-REPL-Analysen | Desktop Commander `start_process` + `interact_with_process` |
| File-Search/Grep am Host | Desktop Commander `start_search` |
| Git-Operationen | osascript (Host-MCP-Protokoll) |
| CC headless starten | osascript nohup (NICHT Desktop Commander start_process) |

---

## 6. Offene Punkte / Risiken (noch nicht getestet)

- **Concurrent-CC-Runs:** mehrere `claude -p`-Prozesse parallel — theoretisch moeglich, nicht validiert. Session-IDs sind separat pro Run.
- **Error-Recovery:** CC-Hallu-Loop oder Permission-Denial-Kette — JSON-Output enthaelt `permission_denials[]` und `is_error` fuer Diagnose, aber Auto-Retry-Logik nicht implementiert.
- **Long-Running-Timeout:** Lang laufender CC-Run (>1 h) — Memory-Footprint, Compaction-Verhalten, API-Rate-Limits ungetestet.
- **MCP-Server-Zugriff aus Child-CC:** sollte via CLAUDE.md + `.mcp.json` auto-laden, nicht stichprobenartig verifiziert.
- **Rueckmelde-Format-Compliance:** CC koennte Report im Freitext zurueckgeben statt in strukturierter Form. Workaround: expliziter Prompt + `--append-system-prompt`.

---

## 7. Recovery-Protokoll (validiert Batch-2)

**Ausgangs-Szenario:** Long-Run bricht mid-flight ab (hier: `api_error_status: 400`, "Credit balance is too low" nach ca. 70 Turns Arbeit; Prozess hat Analysen gemacht, aber noch nicht committet). Handoff-Artefakt nicht persistiert, Arbeit faktisch verloren wenn nicht reproduzierbar.

**Prinzip:** Recovery-Run ist **kein** vollstaendiger Re-Run. Er haelt sich strikt am Commit-Stage auf (scope-filtern + sanity-check + stage + commit + push), ohne neu zu recherchieren oder konzeptionell nachzubessern. Andernfalls drifted das Ergebnis.

**Pattern:**
1. **Ursachen-Diagnose:** Fehler aus `err.log`/`output.json` klassifizieren. Bei Auth/Billing → §1 Pre-Flight-Check + `/login` Fix. Bei Credit-fail: **nicht** wiederholt neu starten — dieselbe Config produziert denselben Fehler.
2. **Recovery-Prompt schreiben** mit drei harten Blocks:
   - **Whitelist** der In-Scope-Files (explizit, keine Globs)
   - **Blacklist** der Out-of-Scope-Files (z.B. `.obsidian/`, `.DS_Store`, nicht-verwandte Markdown-Entwuerfe)
   - **Sanity-Check-Liste** als Boolean-Kontrakt (`sanity_checks: {name: PASS|FAIL}`) — CC muss jede Invariante pruefen, Fehler stoppen Commit
3. **Formulierung:** "NICHT neu recherchieren. NICHT konzeptionell nachbessern. Nur scope-filtern + sanity-check + commit + push." in Prompt expliziter Anfang.
4. **Pre-Flight-Check** (§1) VOR Recovery-Launch.
5. **Launch** via §2 Background-Pattern mit `/tmp/cc_<id>_recovery_*`-Namensraum.
6. **Validation:** Audit-Tool (§8) auf Transcript laufen lassen. Pruefe: 0 Write/Edit-Ops, 0 WebFetch, Git-Ops zeigen nur whitelistete Files.

**Batch-2-Recovery-Metriken (Referenz):** 11 Turns, 65 s Tool-Zeit, 4:06 min Wall-Clock (Delta = startup + auth + assembly). 0 errors. 10 Tool-Calls: 7 Bash + 3 Grep. Commit `bbac715` + Push.

**Recovery-Anti-Patterns:**
- Recovery-Prompt ohne Whitelist → CC committet auch Entwurfs-Markdowns, `.DS_Store`, `.obsidian/`
- Recovery ohne Pre-Flight-Check → verbrennt 2. Run auf identischen Auth-Fehler
- "Vollstaendiger Re-Run" statt Recovery → doppelter Research-Aufwand, nicht-deterministische Abweichungen zur urspruenglichen Arbeit

---

## 8. Observability-Stack (3-teilig)

Audit- und Debug-Infrastruktur fuer CC-Headless-Runs. Ziel: jeden Run post-mortem rekonstruieren koennen und waehrend des Runs live beobachten.

### 8.1 Live-Transcript-Viewer
Session-Transcripts werden live in `~/.claude/projects/<repo-slug>/<uuid>.jsonl` geschrieben (ein JSON-Event pro Zeile, Append-only).

```bash
# Neueste Session finden + live tailen (JSON pretty)
TRANSCRIPT=$(ls -t ~/.claude/projects/-Users-paulad-.../*.jsonl | head -1)
tail -F "$TRANSCRIPT" | jq -c '
  if .type=="assistant" then
    {turn:.message.id[0:8], ts:.timestamp[11:19],
     tools:[.message.content[]?|select(.type=="tool_use")|.name],
     text:[.message.content[]?|select(.type=="text")|.text[0:120]][0]}
  elif .type=="user" then
    {ts:.timestamp[11:19], tool_results:[.message.content[]?|select(.type=="tool_result")|{err:.is_error}]}
  else . end'
```

Nutzen: waehrend Run sichtbar welches Tool gerade laeuft, welcher Text generiert wird, ob Tool-Results Errors zurueckgeben.

### 8.2 Metrics-Sampler (CSV)
Parallel zum Run sampelt ein Shell-Skript alle 3 s Prozess-Metriken.

```bash
# /tmp/cc_<id>_sampler.sh
CCPID=$(cat /tmp/cc_<id>_pid.txt); START=$(cat /tmp/cc_<id>_start.txt)
OUT=/tmp/cc_<id>_metrics.csv
echo "ts,elapsed_s,stat,cpu_pct,rss_kb,fd_count,output_bytes,transcript_lines" > "$OUT"
while ps -p $CCPID > /dev/null 2>&1; do
  NOW=$(date +%s); EL=$((NOW-START))
  PS=$(ps -p $CCPID -o stat=,%cpu=,rss= | awk '{print $1","$2","$3}')
  FD=$(lsof -p $CCPID 2>/dev/null | wc -l | tr -d ' ')
  OB=$(stat -f%z /tmp/cc_<id>_output.json 2>/dev/null || echo 0)
  TL=$(wc -l < "$TRANSCRIPT" 2>/dev/null || echo 0)
  echo "$(date -u +%FT%TZ),$EL,$PS,$FD,$OB,$TL" >> "$OUT"
  sleep 3
done
echo "SAMPLER_EXITED at $(date -u +%FT%TZ)" >> "$OUT"
```

Nutzen: Memory-Leaks (RSS-Kurve), CPU-Stalls (cpu_pct=0 ueber mehrere Samples), FD-Leaks, Pace der Token-Generierung (transcript_lines/elapsed_s).

### 8.3 Post-Run-Audit-Tool
`tools/cc-session-audit.py` (parst JSONL-Transcript, erzeugt strukturierten Report).

```bash
python3 tools/cc-session-audit.py <transcript.jsonl>          # Markdown
python3 tools/cc-session-audit.py <transcript.jsonl> --json   # JSON
```

**Report-Sektionen:**
- **Meta:** session_id, cwd, git_branch, model, entrypoint, permission_mode, version, first/last ts, event_count
- **Summary:** Assistant-Turns, User-Events, Tool-Calls total + by-name + OK/Errors
- **Tool-Call-Inventory:** Tabelle pro Tool mit Calls/OK/Errors
- **File-Ops:** Writes (unique paths), Edits (unique files + total ops), Reads (unique + ops)
- **Git-Ops:** alle `git `-Commands aus Bash-Inputs
- **WebFetch/MCP:** URL-Liste + MCP-Call-Counter
- **Errors:** alle `is_error: true` Tool-Results mit Preview
- **Text-Blocks:** Assistant-Text-Previews pro Turn

**Compliance-Matrix (Anwendung Batch-2-Recovery):**
- Expected: 0 Writes, 0 Edits, 0 WebFetch, 0 MCP, ≤1 Commit, 1 Push → **PASS** (0/0/0/0/1/1)
- Expected: Grep-Calls fuer sanity-checks sichtbar → **PASS** (3 Greps)
- Expected: keine Errors → **PASS** (0/10)

**Audit-Use-Cases:**
- Post-Run-Compliance-Check (Scope eingehalten?)
- Forensik bei unerwartetem Commit-Diff (Welche Tools wurden aufgerufen?)
- Debugging von Hallu-Loops (Error-Preview pro Tool)
- Kosten-/Zeit-Analyse pro Tool-Kategorie

---

## 9. Versions-Historie + Kanon-Status

| Version | Datum | Scope | Evidenz-Basis |
|---|---|---|---|
| v0.1 (Draft) | 2026-04-18 | Initial-Konsolidierung §1-§6 nach Batch-1 (6 Commits + 4 Pushes, manuelle osascript-Chains) | n=1 (Batch-1 manuell) |
| v0.2 (Draft) | 2026-04-18 | §7 Recovery-Protokoll + §8 Observability-Stack nach Batch-2-Abbruch + Recovery (commit `bbac715`) | n=2 (Batch-1 + Batch-2-Recovery) |
| v1.0 (Kanon) | 2026-04-19 | Promotion nach Batch-3-Abschluss (6/6 P0 Tasks A+B, 0 Errors, cc-launch.sh erstmals produktiv, Dashboard-Triade validiert) | n=3 (Batch-1 manuell, Batch-2 headless+Recovery, Batch-3 headless+Wrapper+Dashboard) |

**Kanon-Verankerung (v1.0, 2026-04-19):**
- `COWORK_PROJECT_ANLEITUNG.md` v2.3 Abschnitt 2: Pflichtlektuere bei CC-Operationen (analog `GIT_WORKFLOW_HOST_MCP.md` bei Git-Operationen).
- `COWORK_PROJECT_ANLEITUNG.md` v2.3 Abschnitt 1 HANDOFF-Modus: Verweist auf §4 (Handoff-Protokoll-Template) als Quelle.
- `COWORK_PROJECT_ANLEITUNG.md` v2.3 Abschnitt 1 CC-HANDOFF: Verweist auf §1 (Pre-Flight + cc-launch.sh) + §2.0 (Ausfuehrungsmodi-Regel).

**Fortschreibungs-Regel:** Neue Evidenz aus weiteren Batches (Batch-4+) wird in §10 angehaengt, neue Sektionen bei strukturellem Pattern-Zuwachs (>1 Wiederholung). Minor-Versionen (v1.1, v1.2) bei Praezisierungen; Major (v2.0) bei Bruch mit Host-MCP/osascript-Paradigma.

---

## 10. Batch-3-Evidenz (2026-04-18, P0-BATCH-3)

**Run-Profil:**
- Scope: 6/6 P0 Tasks (A1.1 Policy-Edit + A1.3 .gitignore, B1 Phase-3.4 + B2 Phase-4-Audit-Scope + B3 Capture-Scope + B4 YAML-Regression).
- Dauer: 13:27 min Wall-Clock, 67 Turns, 0 Errors, $5.78 Kosten.
- Commits: 3 (2x EGG `79232f7` + `ad7df55`, 1x WO `4f33baf`).

**Erstmals produktiv:**
- `tools/cc-launch.sh` Pre-Flight-Wrapper (perl-alarm-Timeout, Max-OK-Parse vor exec). 0 Auth-Fehler ueber gesamte Runtime.
- Dashboard-Triade parallel: tail-F+jq Live-Viewer, metrics-sampler CSV (3s-Intervall, RSS-Kurve sauber), completion-watcher mit Bell+Banner+Notification.

**Bestaetigte Patterns:**
- §1 Pre-Flight-Check verhindert silent API-Billing-Fallback (Batch-2-Incident nicht-reproduzierbar in Batch-3).
- §2.1 Background-Launch via nohup+PID-File: stabil ueber 13 min ohne osascript-Timeout.
- §4 Handoff-Protokoll-Struktur (Kontext + Task-Blocks + JSON-Rueckmeldung + Nicht-Ziele): komplett befolgt von CC, strukturierter Report mit SHA-Refs + acceptance pro Task.
- §8.1-§8.3 Observability-Stack: alle drei Kanaele live-nutzbar, keine Blinden Flecken mid-run.

**Neue Erkenntnisse (nicht in §1-§8 abgedeckt):**
- **Push-Gap-Risiko:** CC committet zuverlaessig, aber Push-Verifikation ist PM-Cowork-Pflicht. Batch-3 zeigte mehrere lokale Commits ohne Push — erfordert expliziten Push-Schritt im PM-Closeout. Fix: Handoff-Rueckmelde-Format muss `pushed: <remote>/<branch>` verlangen, nicht nur `commit: <sha>`.
- **HANDOFF-Abweichungen als normale Klasse:** CC interpretiert Paragraph-Referenzen eigenstaendig (A1.1 fand §2.4 korrekter als vorgegebenen §3, A1.2 blieb ungetouched weil PI-Template nicht explizit im Handoff). Kein Fehler-Modus, aber muss im Rueckmelde-Format als `deviations:` Feld kanonisch sein. Bereits in §4 JSON-Struktur enthalten — bestaetigt.
- **Regression-Tests inline:** B4 YAML-Regression im gleichen Run wie B1-B3 durchgefuehrt (kein separater Audit-Batch noetig). Sparte ca. 30% Setup-Overhead.

**Metriken-Referenz (aus §8.2 CSV):**
- Peak RSS: ~420 MB (Turn 45, waehrend Bash-heavy Multi-Grep-Phase).
- Durchschnitt cpu_pct: 18% (nicht-CPU-bound, I/O-dominiert).
- FD-Count: stabil zwischen 45-60, kein Leak.
- Transcript-Lines/min: ~5 (gleichmaessige Generierung, keine Stalls).

---

## 11. Offene Entscheidungspunkte

**E1: Stufe-2-Automation (PM triggert CC ohne Call-by-Call-Freigabe).**
- Stand: Offen seit Batch-2. Batch-3-Evidenz stuetzt Machbarkeit (0 Errors, 0 Permission-Denials, Pre-Flight-Wrapper faengt Auth-Incidents ab).
- Pro: 13:27 min Batch mit manueller Freigabe pro Turn waere faktisch doppelt so teuer an PM-Zeit. Wrapper + Dashboard decken die Beobachtbarkeit ab.
- Contra: Scope-Drift-Risiko nur durch Prompt-Qualitaet gebremst. §7 Recovery-Pattern bleibt noetig als Fallback.
- Empfehlung (zur User-Entscheidung): Default weiterhin Call-by-Call. Stufe-2 nur per explizitem Flag in Handoff-Prompt (`automation_mode: stufe-2-freigegeben`). Kein blanket-default.
- Entscheidungstrigger: Naechster P0-Batch der klar scope-begrenzt ist + User-Freigabe → Stufe-2 einmalig testen und in §10 dokumentieren.

**E2: Push-Gap-Kanonisierung im Handoff-Rueckmelde-Format.**
- Stand: In Batch-3 aufgefallen, §10 dokumentiert. Noch nicht in §4 Handoff-Template-Struktur nachgezogen.
- Aktion: §4 Rueckmelde-Format um Pflichtfeld `pushed: <remote>/<branch> | UNGEPUSHT` pro Task ergaenzen.
- Aufwand: <5 min Edit. Nicht in v1.0-Promotion enthalten → v1.1 Kandidat.

**E3: Parallele CC-Runs (aus §6 Risiken).**
- Stand: Ungetestet. Dual-Root-Setup in Batch-3 validiert (WO + EGG via `--add-dir`), aber nur sequenziell ein CC-Prozess.
- Relevanz: niedrig bis P1 (kein aktueller Use-Case mit Parallelitaetsbedarf).
- Parking: in §6 belassen, keine aktive Klaerung.
