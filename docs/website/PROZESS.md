# PROZESS — Website-Weiterentwicklung weitergehts.online

> **Prozess-Stand + Arbeitsmuster** der Website-Pflege-Schicht. Source of Truth für „wo stehen
> wir, was ist als Nächstes dran“ — das Claude-Memory ist nur Zeiger/Cache hierauf.
> **Pflege-Regel:** Stand-Änderung im selben Commit wie die Arbeit, die sie auslöst.
> Zielbild/Prämissen + Entscheidungs-Log: `ARCHITEKTUR.md` · Ist: `SITE_MAP.md` · Rezepte: `RUNBUCH.md`.

## Einstiegs-Ritual (neue Session, Website-Arbeit)

1. `CLAUDE.md` (auto-geladen) → 2. **diese Datei** (Stand + nächster Schritt) →
3. `ARCHITEKTUR.md` (Zielbild/Prämissen) → 4. bei Umsetzung: zugehörige Spec/Plan unter
`docs/website/specs/` + `docs/website/plans/`.

## Arbeitsmuster (je Prozess-Schritt)

Brainstorm/Entscheidung (**Paul entscheidet**) → Spec (`specs/JJJJ-MM-TT-<thema>-design.md`) →
Plan (`plans/JJJJ-MM-TT-<thema>.md`) → Umsetzung auf Branch, explizit stagen → `make check`
(+ `make smoke` bei Render-Änderungen) → Merge/Push **nur auf Ansage** → Stand HIER nachziehen
(+ ggf. Log-Eintrag in `ARCHITEKTUR.md`).
Kleinkram (Hotfix, Typo, Content) läuft ohne Spec/Plan direkt über die RUNBUCH-Loops.

## Stand (2026-07-18)

| Schritt | Status |
|---|---|
| E0 Hygiene | ✅ deployt 2026-07-17 |
| A0 Architektur-Fundament | ✅ gemergt 2026-07-18 → `ARCHITEKTUR.md` |
| E2 Engine-Reunifikation | ✅ umgesetzt 2026-07-18 auf `feat/e2-engine-reunifikation` (Spec/Plan unter `specs/`+`plans/`; Merge auf Ansage) |
| **E1 Design-Fundament** | **⬅ NÄCHSTER SCHRITT:** Syrien-Redesign-Overlay (`vendor/redesign*.css`, `rd-inject.js`, `fonts/`) → Site-weites Token-Fundament in `assets/css/` |
| E3 IA-Umsetzung (der eine URL-Bruch) | offen (nach E1) |
| E4 Zettelkasten-Mount | offen (wartet auf `zk-atlas` Plan 5) |

## Offene Ansage-Punkte (nur Paul entscheidet)

- **Remote-Branch-Löschung** (6 obsolete, alle nachweislich in `main`):
  `git push origin --delete feat/marne-diff-v2 fix/marne-diff-frage6 fix/marne-diff-kiprompt
  fix/marne-diff-meta-flag fix/mappe2-quality-patches skript-redesign-v2-werkbank`
  — NICHT anfassen: `wave-1-engine-patches` (ungemergt), `claude/silly-shirley` (fachfremd).
- **Domain-Sicherung** (optional, z. B. paulcebulla.de registrieren + Redirect): Pauls manueller
  Schritt außerhalb des Repos, kein Blocker (s. `ARCHITEKTUR.md` → Separierbarkeits-Regeln).
- **Repo-Entmischung** (Grundsatzfrage, unentschieden; sinnvoll VOR E3 entscheiden): Generator-/
  PM-Apparat (`docs/projekt/`, `docs/agents/`, `docs/architektur/`, `bridge/` u. a.) aus dem
  Website-Repo in den Generator-Kontext verlagern → Ein-Zweck-Repo. Öffentliches Leak-Risiko ist
  bereits durch das Allowlist-Deploy geschlossen; Nutzen ist Session-Klarheit + Repo-Gewicht.
  Wenn ja: eigener Schritt, vom Generator-Workflow aus koordiniert (Zwei-Welten-Boundary!),
  NICHT nebenbei in einer Website-Session.
