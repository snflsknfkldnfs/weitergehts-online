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

## Stand (2026-07-25)

| Schritt | Status |
|---|---|
| E0 Hygiene | ✅ deployt 2026-07-17 |
| A0 Architektur-Fundament | ✅ gemergt 2026-07-18 → `ARCHITEKTUR.md` |
| E2 Engine-Reunifikation | ✅ deployt 2026-07-18 (Commit 6fc0e0d; Spec/Plan unter `specs/`+`plans/`) |
| E1 Design-Fundament | ✅ deployt 2026-07-20 (FF-Merge 053baa0; schlanker Zuschnitt: tokens.css · Fonts self-hosted/DSGVO inkl. Noto-Sans-Arabic-Kanal in der Engine, v3.22 · base.css entmischt · ?v=-Lücken; Spec/Plan unter `specs/`+`plans/`) |
| Repo-Entmischung (Meta) | ✅ vollzogen 2026-07-25: Snapshot-Move ins Generator-Repo (dort Commits 24cd34b Move · 4795943 E3-TARGET in den Brücken-Skripten · 6e014b8 PROJECT_INSTRUCTIONS v2.11; 931/931 Dateien blob-identisch verifiziert). Website-seitig Lösch-Commit `119fa95` (936 Dateien, deploy-neutral) + Nacharbeit Teil 2 (check.sh-A2-Hinweis · CLAUDE.md/RUNBUCH/SITE_MAP-Verweise · projekt-website-Skill-Redirect). `bridge/` gelöscht 2026-07-21. Warum/Verworfenes: `ARCHITEKTUR.md`-Log 2026-07-20. |
| E3 IA-Umsetzung (der eine URL-Bruch) | ✅ deployt 2026-07-23 (FF-Merge `ef56891`, live verifiziert): Root-Verteiler + /profil/ + /unterricht/-Hub + Impressum/Datenschutz (Anschrift eingetragen) + 404 + Favicon; „Nebel & Papier" via `tokens.css`/`wg.css` + 3 self-hosted Fonts; Games/WiB nach `unterricht/…` umgezogen + Gates nachgezogen; Spec/Plan unter `specs/`+`plans/`; 3 Gate-Härtungen im `ARCHITEKTUR.md`-Log |
| E4 Zettelkasten-Mount | offen (wartet auf `zk-atlas` Plan 5) |
| **E5 Akten-Look-Absorption (Theme+Engine)** | **⬅ NÄCHSTER SCHRITT** (Website-Schicht) — Game-Triage erledigt (E3); fällig spätestens VOR dem nächsten neuen Game; Vorentscheidungen in E1-Spec §6 |

## Offene Ansage-Punkte (nur Paul entscheidet)

- **Entmischungs-Restfragen** (aus der Generator-Session-Rückmeldung 2026-07-25):
  (a) `docs/Lehrplan_GPG7.md` — mitnehmen oder Generator-seitig Verweise auf die dortigen
  aktuelleren Lehrplan-Quellen umbiegen? (b) ~11 MB ungetrackte/gitignorierte Reste unter
  `docs/{projekt,agents,architektur,analyse,checklisten,uebergabe}` + `tools/q-gate-log` löschen?
  (git fasst sie nicht an — Löschung ist endgültig).
- **sandbox-export-Skill zeigt noch auf den Pre-E3-Pfad** (`plugin-source/skills/sandbox-export`,
  Generator-Welt, beim Move bewusst nicht angefasst): VOR dem nächsten Game-Export dort nachziehen —
  Ziel `unterricht/escape-games/<id>/`, Asset-Tiefe `../../../assets/`. Die Brücken-Skripte
  (deploy-check, tiefen-agnostisch via normpath) sind bereits umgestellt.
- **Domain-Sicherung** (optional, z. B. paulcebulla.de registrieren + Redirect): Pauls manueller
  Schritt außerhalb des Repos, kein Blocker (s. `ARCHITEKTUR.md` → Separierbarkeits-Regeln).
