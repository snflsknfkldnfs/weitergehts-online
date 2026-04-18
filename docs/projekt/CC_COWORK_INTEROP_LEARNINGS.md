# CC-Cowork-Interop: Learnings (Draft v0.2)

**Status:** DRAFT — Evidenz-Basis n=2 (Batch-1 manuell + Batch-2 headless mit Recovery)
**Erstellt:** 2026-04-18
**Letzte Aktualisierung:** 2026-04-18 (+§7 Recovery-Protokoll, +§8 Observability-Stack, +§1 Auth-Korrektur)
**Finalisierung:** nach Batch-3 → Promote zu v1.0 und Verankerung in COWORK_PROJECT_ANLEITUNG.md Pflichtlektuere

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

---

## 2. Background-Launch-Pattern

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

## 9. Finalisierungs-Plan

**Promote zu v1.0 nach:** Batch-2 + Batch-3 Abschluss (n=3 E2E-Runs).

**Kanon-Verankerung:**
- `COWORK_PROJECT_ANLEITUNG.md` Abschnitt 2 Vertiefungslektuere: Eintrag fuer dieses Dokument + `GIT_WORKFLOW_HOST_MCP.md`
- `COWORK_PROJECT_ANLEITUNG.md` Abschnitt 1 Modi: HANDOFF-Modus verweist auf §4 dieses Dokuments als Template-Quelle
- Neue Version bump auf v2.2 der ANLEITUNG

**Entscheidung offen:** Ob Stufe-2-Automation (PM-Cowork triggert CC headless ohne User-Freigabe pro Call) als Default oder nur bei explizitem User-Flag. Evidenz aus Batch-2-Run liefert Entscheidungsgrundlage.
