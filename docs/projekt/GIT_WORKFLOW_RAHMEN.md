# Git-Workflow-Rahmen (PM-Infrastruktur)

**Etabliert:** 2026-04-05 (Session 13)
**Zweck:** Reduktion der Reibung bei Git-Operationen zwischen Cowork, Claude-Code und User. Ersetzt die bisherige Ausschliesslichkeit des Copy-Paste-Blocks durch ein gestuftes Zustimmungsmodell mit Audit-Spur. Senkt Lock-/Heredoc-/Worktree-Fehlerklassen.

**Ersetzt nicht:** Die File-Ownership-Regel (docs/ = Cowork, assets/escape-games/*.html = Claude-Code). Nicht das ATOM-UNIT-Commit-Gate. Nicht die Pre-Commit-Gate-3-Checks.

---

## 1. Ebenen-Rollen

| Rolle | Schreibrechte Repo | Push-Rechte | Terminal-Zugriff |
|-------|-------------------|-------------|------------------|
| **User (Paul)** | Voll | Voll | Nativ |
| **Cowork (Claude)** | docs/ direkt via File-Tools + Git-CLI in Sandbox-Mirror | Kein Push aus Sandbox; Push via osascript-Delegation moeglich | `mcp__Control_your_Mac__osascript` (gestuft, siehe §3) |
| **Claude-Code** | Eigener Worktree `.claude/worktrees/<name>` | Push auf Feature-Branch `claude/<name>` | Eigenes Terminal (PTY) |

---

## 2. Standard-Workflow (Default, ohne osascript)

1. Cowork arbeitet in docs/ direkt.
2. Am Ende einer ATOM-UNIT generiert Cowork einen **Copy-Paste-Block** mit `git add` / `git commit -F <msg-datei>` / `git push`. Commit-Message via Datei (nicht Heredoc) um zsh-`#`-Kommentarzeilen-Fallen zu umgehen.
3. User fuehrt den Block aus.
4. Bei Claude-Code-Handoff: Cold-Handoff-Dokument in `docs/uebergabe/`. Claude-Code arbeitet auf `claude/<name>`-Branch. User mergt manuell nach `main` via Merge-Block.

**Vorteil:** Volle Audit-Spur im Chat. Keine Out-of-Band-Aktionen.
**Nachteil:** Reibung, Heredoc/Lock-Fehlerklasse, Copy-Paste-Fehler.

---

## 3. Erweiterter Workflow (osascript-delegiert, Opt-in)

**Aktivierung pro Session:** User sagt explizit "Git-Workflow-Rahmen aktiv" oder erteilt fuer eine konkrete Einzeloperation Freigabe ("nutze den Rahmen um X zu beheben"). Ohne aktive Freigabe gilt §2.

### 3.1 Operations-Klassen

**Klasse L (Lesend, frei nach Session-Opt-in):**
`git status`, `git log`, `git diff`, `git fetch`, `git branch -l`, `git branch -a`, `git worktree list`, `git remote -v`, `git rev-parse HEAD`, `git show`, `gh pr list`, `gh pr view`.

**Klasse S (State-aendernd, pro Operation Freigabe):**
`git checkout <branch>`, `git pull --ff-only`, `git merge --ff-only <branch>`, `git commit`, `git add <spezifische-pfade>`, `git branch -d <branch>`, `git worktree remove <pfad>`, `git stash`, `git stash pop`.

**Klasse R (Remote-wirksam, pro Operation Freigabe, extra Bestaetigung bei main):**
`git push origin <branch>`, `git push origin --delete <branch>`, `gh pr create`, `gh pr merge`.

**Klasse V (Verboten ohne explizite, namentliche User-Aufforderung):**
`git push --force`, `git push --force-with-lease`, `git reset --hard`, `git clean -fd`, `git filter-branch`, `git reflog expire --expire=now`, `rm -rf .git/*`, `git commit --amend` (auf bereits gepushten Commits), `git rebase -i` (interaktiv nicht moeglich), `git add .` (zu breit — stattdessen explizite Pfade).

### 3.2 Ausfuehrungs-Protokoll

Pro osascript-Aufruf:

1. **Ankuendigung im Chat:** Welcher Befehl, welche Klasse (L/S/R), welches erwartete Ergebnis.
2. **Ausfuehrung:** `mcp__Control_your_Mac__osascript` mit AppleScript `tell application "Terminal" to do script` ODER direkt `do shell script "cd ~/weitergehts.online/weitergehts-online && <cmd>"` je nach Anforderung (Terminal-Fenster-Sichtbarkeit vs. headless).
3. **Ergebnis-Log:** Rohausgabe als kurzer Quote-Block im Chat.
4. **Session-Ende:** Sammelprotokoll aller osascript-Aufrufe als CHANGELOG-Unterpunkt "Git-Ops (osascript)" am Sessionabschluss.

### 3.3 Entscheidungsbaum

```
Anfrage: Git-Operation noetig
  |
  ├─ Nur Klasse L? → osascript ausfuehren, Ergebnis zeigen
  ├─ Klasse S, nicht main-mutierend? → Ankuendigen, auf "ok"/"ja"/"los" warten, dann ausfuehren
  ├─ Klasse S oder R auf main? → Ankuendigen mit Diff-Preview, auf explizites "ja, main mutieren" warten
  ├─ Klasse V? → VERWEIGERN, stattdessen kopierbaren Block anbieten
```

### 3.4 Recovery-Muster (dokumentiert)

**Index-Lock:**
```bash
ls -la .git/*.lock 2>/dev/null
# Nur wenn keine aktiven Git-Prozesse (pgrep git liefert leer):
rm -f .git/index.lock .git/HEAD.lock .git/refs/heads/main.lock
```

**Worktree-Leiche (nach Claude-Code-Session):**
```bash
git worktree list
git worktree remove .claude/worktrees/<name>   # Bricht ab bei uncommitted changes
git worktree remove --force .claude/worktrees/<name>   # Nur mit User-Freigabe
git branch -d claude/<name>                    # Nur wenn merged nach main
git branch -D claude/<name>                    # Klasse V — nur nach expliziter User-Bestaetigung
```

**Commit-Message mit `#`-Zeilen:** IMMER `-F <datei>` verwenden, niemals Heredoc mit `git commit -m "..."`.

**Heredoc-Alternative:** `git commit -F .git-commit-msg-$(date +%s).txt && rm .git-commit-msg-*.txt`.

---

## 4. Logging & Audit

Jede Git-Operation, die ueber einen kopierbaren Block hinausgeht (also alles in §3), erzeugt einen Eintrag im Format:

```
[YYYY-MM-DD HH:MM] Cowork osascript <Klasse>: <cmd>
  Result: <kurzer Status>
```

Diese Eintraege werden am Session-Ende in den CHANGELOG.md-Eintrag der Session unter "Git-Ops" uebernommen. Ziel: Git-History und Doku-History bleiben konsistent (adressiert F-RA4 Doku-Drift-Kategorie).

---

## 5. Abgrenzungen

- **Kein Ersatz fuer Claude-Code-Worktree-Pattern.** Claude-Code arbeitet weiter in `.claude/worktrees/`, Cowork merged nicht automatisch.
- **Kein Automatik-Push.** Jeder Push auf `main` erfordert User-Freigabe, auch unter Rahmen-Opt-in.
- **Keine Destruktiv-Bulk-Aufraeumer.** `git gc --prune`, `git remote prune origin` nur auf explizite User-Anfrage.
- **Kein Bypass der ATOM-UNIT-Pre-Commit-Gate-3-Checks** (RA1 Scope / RA3 Code-Kopplung / RA4 ATOM-UNIT). Der Rahmen steuert nur die Ausfuehrungs-Mechanik, nicht die inhaltliche Pruefung.

---

## 6. Aenderungshistorie

- **2026-04-05:** Etabliert in Session 13 nach wiederholten Git-Lock-/Heredoc-/Worktree-Cleanup-Friktionen in Sessions 11-12 (AU-0 Wave 0, AU-1 Wave 1). User-Freigabe: explizit fuer Cleanup-Aktion auf `festive-benz`-Worktree und gleichzeitige Rahmen-Etablierung.
