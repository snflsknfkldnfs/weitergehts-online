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

## Stand (2026-07-23)

| Schritt | Status |
|---|---|
| E0 Hygiene | ✅ deployt 2026-07-17 |
| A0 Architektur-Fundament | ✅ gemergt 2026-07-18 → `ARCHITEKTUR.md` |
| E2 Engine-Reunifikation | ✅ deployt 2026-07-18 (Commit 6fc0e0d; Spec/Plan unter `specs/`+`plans/`) |
| E1 Design-Fundament | ✅ umgesetzt 2026-07-20 auf `feat/e1-design-fundament` (schlanker Zuschnitt: tokens.css · Fonts self-hosted/DSGVO inkl. Noto-Sans-Arabic-Kanal in der Engine · base.css entmischt · ?v=-Lücken; Spec/Plan unter `specs/`+`plans/`). Merge/Deploy auf Ansage. |
| **E3 IA-Umsetzung (der eine URL-Bruch)** | ✅ umgesetzt 2026-07-23 auf `feat/e3-ia-umsetzung` (Root-Verteiler + /profil/ + /unterricht/-Hub + Impressum/Datenschutz + 404 + Favicon; „Nebel & Papier" via `tokens.css`/`wg.css` + 3 self-hosted Fonts; Games/WiB nach `unterricht/…` umgezogen + Gates nachgezogen; Spec/Plan unter `specs/`+`plans/`; 3 Gate-Härtungen im `ARCHITEKTUR.md`-Log). **Merge/Deploy auf Ansage** — Voraussetzung: ladungsfähige Anschrift eingetragen (aktuell `TODO-PAUL` in Impressum/Datenschutz → Merge-Gate bewusst rot). |
| E4 Zettelkasten-Mount | offen (wartet auf `zk-atlas` Plan 5) |
| E5 Akten-Look-Absorption (Theme+Engine) | offen — Game-Triage erledigt (E3); jetzt fällig spätestens VOR dem nächsten neuen Game; Vorentscheidungen in E1-Spec §6 |

## Offene Ansage-Punkte (nur Paul entscheidet)

- **E3 mergen** (`feat/e3-ia-umsetzung` → `main`): **erst** nachdem die ladungsfähige Anschrift in
  `impressum/index.html` + `datenschutz/index.html` eingetragen ist (`grep -rn TODO-PAUL` muss leer sein).
  Merge-Reihenfolge-Hinweis: `chore/entmischung-nacharbeit` hängt ebenfalls am `ARCHITEKTUR.md`-Log-Ende →
  beim Zweit-Merge ggf. trivialer Append-Konflikt (beide Log-Einträge chronologisch behalten).
- **Generator-TARGET nachziehen** (sandbox-export → `unterricht/escape-games/` statt `escape-games/`) —
  in der **Generator-Welt** (Zwei-Welten-Boundary!), VOR dem nächsten Game-Export. Bis dahin: Export-Baum
  von Hand nach `unterricht/escape-games/<id>/` verschieben und die Asset-Pfad-Tiefe auf `../../../assets/` prüfen.
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
