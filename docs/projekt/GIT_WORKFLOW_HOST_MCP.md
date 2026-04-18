# Git-Workflow via Host-MCP — Kanonisches Protokoll

**Version:** 1.0 (2026-04-18)
**Status:** PFLICHT fuer alle git-Operationen aus Cowork.
**Geltungsbereich:** weitergehts-online + escape-game-generator (+ alle zukuenftigen Cowork-verwalteten Repos)
**Vorgaenger-Regeln:** Sandbox-Bash-git DEPRECATED. User-Terminal-Blocks nur noch Fallback.

---

## 1. Motivation

Die Cowork-Sandbox mountet Host-Repos via virtiofs. Dabei gilt:
- **Schreib-Einschraenkung:** `unlink()` auf Lock-Dateien (`.git/index.lock`, `.git/HEAD.lock`) schlaegt im Sandbox-Kernel mit `Operation not permitted` fehl.
- **Folge:** Nach jedem Sandbox-Crash / Cancel / Timeout bleibt ein stale Lock zurueck. Folgende git-Calls scheitern mit `fatal: Unable to create 'index.lock': File exists`.
- **Alte Workarounds:** User raeumt Lock + committet manuell auf Host-Terminal. Bruch des Automatisierungs-Flows, manuelle Arbeit, Copy-Paste-Reibung.

**Neue Primaer-Loesung:** Git-Operationen laufen ueber einen Host-Shell-MCP-Kanal, der NICHT durch virtiofs eingeschraenkt ist. Sandbox-Bash wird fuer git-Calls nicht mehr benutzt.

Aktuell verfuegbar: `mcp__Control_your_Mac__osascript` (Control-your-Mac MCP, eingebaut). Zukuenftig ggf. dedizierter Desktop-Commander-MCP nach separater Installation.

---

## 2. Host-Pfade pro Repo

| Repo | Host-Pfad | Sandbox-Mount |
|---|---|---|
| weitergehts-online | `/Users/paulad/weitergehts.online/weitergehts-online` | `/sessions/<id>/mnt/weitergehts-online` |
| escape-game-generator | `/Users/paulad/escape-game-generator` | `/sessions/<id>/mnt/escape-game-generator` |

Host-Pfad ist ausschlaggebend fuer jede git-Operation. Sandbox-Mount ist nur fuer File-Reads/Edits via Cowork-File-Tools relevant.

---

## 3. 5-Stufen-Protokoll

### Stufe 1 — PLAN

Cowork zeigt im Chat:
- Liste der zu stagenden Dateien (explizit, NIE `git add .` / `git add -A`)
- Commit-Message (vollstaendig formuliert)
- Erwartete Seiteneffekte (z.B. "schliesst Track X", "triggert CI-Workflow Y")

Keine Ausfuehrung. Keine osascript-Calls in dieser Stufe.

### Stufe 2 — USER-FREIGABE

User sagt "Go" (oder korrigiert).

Bei Korrektur: zurueck zu Stufe 1 mit Update.

### Stufe 3 — LOCK-CLEANUP (bedingt)

Cowork prueft:
```applescript
do shell script "cd /Users/paulad/<repo> && ls -la .git/index.lock 2>/dev/null || echo 'no-lock'"
```

Falls Lock existiert + Alter > 30s + kein anderer git-Prozess aktiv:
```applescript
do shell script "cd /Users/paulad/<repo> && rm -f .git/index.lock"
```

Stale-Lock-Heuristik: Wenn `ps aux | grep git` keinen laufenden git-Prozess zeigt, ist das Lock mit >99% Wahrscheinlichkeit stale.

### Stufe 4 — AUSFUEHRUNG

Kanonische osascript-Form:
```applescript
do shell script "cd /Users/paulad/<repo> && git add <datei-1> <datei-2> ... && git commit -m \"<commit-message>\""
```

Bei Commit-Messages mit Heredoc (mehrzeilig, Shell-Meta-Zeichen): Commit-Message in temporaere Datei schreiben, dann `git commit -F <datei>` nutzen, danach temp-Datei loeschen.

```applescript
do shell script "cat > /tmp/cowork-commit-msg.txt <<'EOF'
<message>
EOF
cd /Users/paulad/<repo> && git commit -F /tmp/cowork-commit-msg.txt && rm /tmp/cowork-commit-msg.txt"
```

Alternativ: File-Tool schreibt Commit-Message direkt in die Sandbox (z.B. `/sessions/.../scratch/commit-msg.txt`), osascript liest ueber `cat` aus dem Sandbox-Mount.

### Stufe 5 — VERIFIKATION

```applescript
do shell script "cd /Users/paulad/<repo> && git log --oneline -1 && git status --short"
```

Cowork liest Commit-Hash + Clean-Status zurueck, meldet PM-Report an User.

---

## 4. Push-Protokoll

Push bleibt **User-Freigabe-pflichtig pro Commit-Sequenz**, NICHT pro einzelnem Push.

Variante A (empfohlen): Cowork fuehrt `git push` nach expliziter User-Freigabe via osascript aus. Funktioniert, weil SSH-Credentials auf Host vorhanden sind.

```applescript
do shell script "cd /Users/paulad/<repo> && git push origin <branch>"
```

Variante B (Fallback): User-Terminal-Block wenn Push-Credentials interaktiv abgefragt werden (z.B. Passphrase-Prompt).

**Push auf main/master braucht IMMER explizite User-Freigabe**, auch wenn Auto-Push fuer Feature-Branches aktiviert waere (aktuell nicht).

**Force-Push + Reset-Hard:** Nie ohne explizite, mit Zweck-Beschreibung versehene User-Anweisung.

---

## 5. Pflicht-Vorschritt: Pull

Vor **jeder inhaltlichen Arbeit in einem Repo** (Edit, Commit-Vorbereitung) laeuft:

```applescript
do shell script "cd /Users/paulad/<repo> && git pull --ff-only"
```

Bei Non-Fast-Forward: Abbruch, PM-Report an User mit `git status` + `git log origin/main..HEAD --oneline` + `git log HEAD..origin/main --oneline`. User entscheidet ueber Merge-Strategie.

---

## 6. Verbotene Operationen

Auch unter Host-MCP nicht ohne explizite User-Anweisung:
- `git add .` / `git add -A` (Risiko: ungewollte Dateien)
- `git commit --no-verify` (Hook-Skip)
- `git commit --amend` auf bereits gepushten Commits
- `git reset --hard`
- `git push --force` / `git push --force-with-lease`
- `git checkout .` / `git restore .`
- `git branch -D`
- `git config` (global oder repo)
- `git clean -f`

Policy: Bei jedem dieser Operationen zuerst Plan-Stufe, explizite User-Begruendung abholen, dann Ausfuehrung.

---

## 7. Fehler-Modes

| Fehler | Ursache | Handling |
|---|---|---|
| `fatal: Unable to create 'index.lock': File exists.` | Stale Lock | Stufe 3 Lock-Cleanup, dann Retry Stufe 4 |
| `fatal: Not a git repository` | Falscher Pfad | Host-Pfad pruefen, Repo neu klonen falls geloescht |
| `Everything up-to-date` bei `git push` | Nichts zu pushen | Kein Fehler, PM-Report mit Hinweis |
| `rejected` bei push | Remote ahead | `git pull --rebase` vorschlagen, User-Freigabe einholen |
| `Permission denied (publickey)` | SSH-Key-Problem | Fallback Variante B User-Terminal-Block |
| `could not execute: osascript` | MCP inaktiv | Pre-flight hat gescheitert, Fallback Host-Terminal-Block |
| osascript-stdout-Truncation | MCP-Limit bei grossem Output | Split in 2 Calls: `git log --oneline -1` separat von `git status` |

---

## 8. Pre-Flight-Check (einmal pro Session)

Zu Session-Beginn oder beim ersten git-Plan:

```applescript
do shell script "which git && cd /Users/paulad/weitergehts.online/weitergehts-online && git rev-parse --is-inside-work-tree"
```

Bei Rueckgabe `true`: MCP + Repo aktiv, Protokoll lebt.
Bei Fehler: auf User-Terminal-Block-Fallback wechseln, User-Hinweis dass Control-your-Mac-MCP aktiviert werden muss.

---

## 9. File-Ownership — Aenderung durch Host-MCP KEINE

Die File-Ownership-Regel aus COWORK_PROJECT_ANLEITUNG.md bleibt unveraendert:
- `docs/` (weitergehts-online) = PM-Cowork-Domaene
- `assets/`, `escape-games/`, `*.html` (weitergehts-online Root) = Claude-Code-Domaene
- Host-MCP ist nur ein Transport-Mechanismus, keine Berechtigung zur Cross-Domain-Edits.
- Cowork darf Claude-Code-Dateien **NICHT** in seine Commits staged aufnehmen, auch wenn sie modified sind. Claude-Code committet seine eigenen Dateien separat.

---

## 10. Verankerungs-Status

| Dokument | Status |
|---|---|
| `docs/projekt/COWORK_PROJECT_ANLEITUNG.md` | Verweist auf dieses Dokument, Abschnitt 1 GIT refaktoriert (v2.1) |
| `escape-game-generator/PROJECT_INSTRUCTIONS.md` | §GIT-PROTOKOLL refaktoriert (v2.9) |
| `escape-game-generator/ONBOARDING.md` | Kurze Query-Liste ergaenzt |
| Auto-Memory `feedback_virtiofs_git_lock.md` | DEPRECATED-Marker, Verweis hier |
| Auto-Memory `feedback_git_host_mcp.md` | NEU, primaere Regel |
| Auto-Memory `feedback_git_capabilities.md` | refaktoriert: Cowork kann add+commit+push via Host-MCP |

---

## 11. Aenderungshistorie

| Version | Datum | Aenderung |
|---|---|---|
| 1.0 | 2026-04-18 | Erstversion. Ersetzt Sandbox-Bash-git und User-Terminal-Block-Only-Policy. |
