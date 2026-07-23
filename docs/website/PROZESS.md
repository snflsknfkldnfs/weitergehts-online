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
| E1 Design-Fundament | ✅ deployt 2026-07-20 (FF-Merge 053baa0; schlanker Zuschnitt: tokens.css · Fonts self-hosted/DSGVO inkl. Noto-Sans-Arabic-Kanal in der Engine, v3.22 · base.css entmischt · ?v=-Lücken; Spec/Plan unter `specs/`+`plans/`) |
| Repo-Entmischung (Meta) | ✅ entschieden 2026-07-20: JA — Snapshot-Move ohne History-Rewrite, koordiniert aus der Generator-Welt (Warum/Verworfenes: `ARCHITEKTUR.md`-Log). `bridge/` gelöscht 2026-07-21. Move ausstehend; danach website-seitig fällig: check.sh-A2-Hinweis · CLAUDE.md-Zwei-Welten-Kapitel · projekt-website-Skill-Redirect. E3 wartet nicht. |
| E3 IA-Umsetzung (der eine URL-Bruch) | ✅ deployt 2026-07-23 (FF-Merge `ef56891`, live verifiziert): Root-Verteiler + /profil/ + /unterricht/-Hub + Impressum/Datenschutz (Anschrift eingetragen) + 404 + Favicon; „Nebel & Papier" via `tokens.css`/`wg.css` + 3 self-hosted Fonts; Games/WiB nach `unterricht/…` umgezogen + Gates nachgezogen; Spec/Plan unter `specs/`+`plans/`; 3 Gate-Härtungen im `ARCHITEKTUR.md`-Log |
| E4 Zettelkasten-Mount | offen (wartet auf `zk-atlas` Plan 5) |
| **E5 Akten-Look-Absorption (Theme+Engine)** | **⬅ NÄCHSTER SCHRITT** (Website-Schicht) — Game-Triage erledigt (E3); fällig spätestens VOR dem nächsten neuen Game; Vorentscheidungen in E1-Spec §6 |

## Offene Ansage-Punkte (nur Paul entscheidet)

- **Generator-TARGET nachziehen** (sandbox-export → `unterricht/escape-games/` statt `escape-games/`) —
  in der **Generator-Welt** (Zwei-Welten-Boundary!), VOR dem nächsten Game-Export. Bis dahin: Export-Baum
  von Hand nach `unterricht/escape-games/<id>/` verschieben und die Asset-Pfad-Tiefe auf `../../../assets/` prüfen.
- **Domain-Sicherung** (optional, z. B. paulcebulla.de registrieren + Redirect): Pauls manueller
  Schritt außerhalb des Repos, kein Blocker (s. `ARCHITEKTUR.md` → Separierbarkeits-Regeln).
- **Generator-Umzug anstoßen** (Entmischung ist entschieden, s. Stand-Tabelle): Paul startet
  die Generator-Session mit dem übergebenen Snapshot-Move-Prompt; erst danach ist die
  website-seitige Nacharbeit (check.sh-A2 · CLAUDE.md · Skill-Redirect) fällig.
