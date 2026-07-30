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

## Stand (2026-07-30)

| Schritt | Status |
|---|---|
| E0 Hygiene | ✅ deployt 2026-07-17 |
| A0 Architektur-Fundament | ✅ gemergt 2026-07-18 → `ARCHITEKTUR.md` |
| E2 Engine-Reunifikation | ✅ deployt 2026-07-18 (Commit 6fc0e0d; Spec/Plan unter `specs/`+`plans/`) |
| E1 Design-Fundament | ✅ deployt 2026-07-20 (FF-Merge 053baa0; schlanker Zuschnitt: tokens.css · Fonts self-hosted/DSGVO inkl. Noto-Sans-Arabic-Kanal in der Engine, v3.22 · base.css entmischt · ?v=-Lücken; Spec/Plan unter `specs/`+`plans/`) |
| Repo-Entmischung (Meta) | ✅ vollzogen 2026-07-25: Snapshot-Move ins Generator-Repo (dort Commits 24cd34b Move · 4795943 E3-TARGET in den Brücken-Skripten · 6e014b8 PROJECT_INSTRUCTIONS v2.11; 931/931 Dateien blob-identisch verifiziert). Website-seitig Lösch-Commit `119fa95` (936 Dateien, deploy-neutral) + Nacharbeit Teil 2 (check.sh-A2-Hinweis · CLAUDE.md/RUNBUCH/SITE_MAP-Verweise · projekt-website-Skill-Redirect). `bridge/` gelöscht 2026-07-21. Generator-seitiger Rest erledigt 2026-07-25 (sandbox-export-Skill + pfad-manifest auf E3-TARGET · STATUS.md-Topologie-Eintrag · Lehrplan-Verweise umgebogen); ~35 Pre-E3-Pfade im geparkten plugin-source trackt die Generator-STATUS.md (dort fällig vor dem nächsten Game-Bau). Warum/Verworfenes: `ARCHITEKTUR.md`-Log 2026-07-20. |
| E3 IA-Umsetzung (der eine URL-Bruch) | ✅ deployt 2026-07-23 (FF-Merge `ef56891`, live verifiziert): Root-Verteiler + /profil/ + /unterricht/-Hub + Impressum/Datenschutz (Anschrift eingetragen) + 404 + Favicon; „Nebel & Papier" via `tokens.css`/`wg.css` + 3 self-hosted Fonts; Games/WiB nach `unterricht/…` umgezogen + Gates nachgezogen; Spec/Plan unter `specs/`+`plans/`; 3 Gate-Härtungen im `ARCHITEKTUR.md`-Log |
| E4 Zettelkasten-Mount | offen (wartet auf `zk-atlas` Plan 5) |
| **E5 Akten-Look-Absorption (Theme+Engine)** | ✅ **umgesetzt 2026-07-30** auf Branch `feat/e5-akten-look` (12 Tasks, 12 Commits; **Merge/Push steht aus — nur auf Pauls Ansage**). Ergebnis: `vendor/`-Overlay (1194 Z. CSS/JS, 397 `!important`) vollständig in `theme-gpg.css` + Engine absorbiert · rd-inject-MutationObserver entfällt · Übersicht rendert die Engine (`initUebersicht`), Game-`index.html` schrumpft von 101 auf 36 Z. · Akten-Labels datengetrieben (`meta.akten_label`/`meta.dossier_label`/`mappen[i].akten_label`, mit Fallbacks) + WW1-Leftover korrigiert · Assets nach `unterricht/assets/` · `make bump A=all`. Abnahme: Screenshot-Diff 7×0 px gegen die Vor-E5-Baseline (einzige gewollte Abweichung: der Label-Fix-Commit, Diff nur in den Label-Zeilen) · Zustands-Fingerabdruck über 282 Computed-Style-Messpunkte inkl. Hover/Zustandsklassen · `make check`/`make smoke` grün · Netzwerk-Beweis ohne `vendor/`-Request · `!important` in `theme-gpg.css`: 6, nur Print-Block. Offener Befund (bewusst nicht repariert, im CSS kommentiert): der Korrekt-State der MC-Optionen war schon vor E5 unsichtbar, weil der Dark-Zweig ihn überstimmte. Spec + Plan **freigegeben 2026-07-26** (`specs/2026-07-26-…-design.md` + `plans/2026-07-26-e5-akten-look-absorption.md`, 12 Tasks). **Nächster Schritt: Umsetzung in frischer Dev-Session** auf Branch `feat/e5-akten-look` (Muster E3; Plan-Header nennt das Ausführungs-Skill). Kern-Entscheide: pixel-identische Migration (Screenshot-Harness Task 1) · Übersicht→Engine `initUebersicht` · Labels Migration-treu + separater Fix-Commit (Task 10, Texte Paul-freigegeben) · Asset-Umzug `unterricht/assets/` als letzter Task · Distributions-Neutralität (Vertriebs-/Plattform-Frage bleibt offen). Merge/Push nur auf Ansage; danach Ansage-Punkt Generator-Export-Tiefe eintragen |

## Offene Ansage-Punkte (nur Paul entscheidet)

- **E5-Merge/Push** (fällig): Branch `feat/e5-akten-look` ist fertig und abgenommen, aber
  bewusst nicht gemergt. Vorher/Nachher-Screenshots liegen unter `tools/smoke/_out/`
  (`shots-vorher` vs. `shots-final`).
- **sandbox-export: Runtime-Tiefe `../../assets/` lernen** (Generator-Welt, fällig VOR dem
  nächsten Game-Export): seit E5 laden Game-HTML die Runtime aus `unterricht/assets/`
  (Tiefe 2), `fonts.css` weiterhin aus `/assets/` (Tiefe 3). Zusätzlich erzeugt das
  Export-Template keine Overlay-Dateien mehr (`vendor/` entfällt), die Übersicht braucht
  `class="uebersicht"` am `<body>` + `EscapeEngine.initUebersicht()` statt Inline-Script,
  und `data.json` kann optional `meta.akten_label` / `meta.dossier_label` /
  `mappen[i].akten_label` mitliefern (ohne die Felder greifen Fallbacks).
- **Domain-Sicherung** (optional, z. B. paulcebulla.de registrieren + Redirect): Pauls manueller
  Schritt außerhalb des Repos, kein Blocker (s. `ARCHITEKTUR.md` → Separierbarkeits-Regeln).
