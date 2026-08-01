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

## Stand (2026-08-01)

| Schritt | Status |
|---|---|
| E0 Hygiene | ✅ deployt 2026-07-17 |
| A0 Architektur-Fundament | ✅ gemergt 2026-07-18 → `ARCHITEKTUR.md` |
| E2 Engine-Reunifikation | ✅ deployt 2026-07-18 (Commit 6fc0e0d; Spec/Plan unter `specs/`+`plans/`) |
| E1 Design-Fundament | ✅ deployt 2026-07-20 (FF-Merge 053baa0; schlanker Zuschnitt: tokens.css · Fonts self-hosted/DSGVO inkl. Noto-Sans-Arabic-Kanal in der Engine, v3.22 · base.css entmischt · ?v=-Lücken; Spec/Plan unter `specs/`+`plans/`) |
| Repo-Entmischung (Meta) | ✅ vollzogen 2026-07-25: Snapshot-Move ins Generator-Repo (dort Commits 24cd34b Move · 4795943 E3-TARGET in den Brücken-Skripten · 6e014b8 PROJECT_INSTRUCTIONS v2.11; 931/931 Dateien blob-identisch verifiziert). Website-seitig Lösch-Commit `119fa95` (936 Dateien, deploy-neutral) + Nacharbeit Teil 2 (check.sh-A2-Hinweis · CLAUDE.md/RUNBUCH/SITE_MAP-Verweise · projekt-website-Skill-Redirect). `bridge/` gelöscht 2026-07-21. Generator-seitiger Rest erledigt 2026-07-25 (sandbox-export-Skill + pfad-manifest auf E3-TARGET · STATUS.md-Topologie-Eintrag · Lehrplan-Verweise umgebogen); ~35 Pre-E3-Pfade im geparkten plugin-source trackt die Generator-STATUS.md (dort fällig vor dem nächsten Game-Bau). Warum/Verworfenes: `ARCHITEKTUR.md`-Log 2026-07-20. |
| E3 IA-Umsetzung (der eine URL-Bruch) | ✅ deployt 2026-07-23 (FF-Merge `ef56891`, live verifiziert): Root-Verteiler + /profil/ + /unterricht/-Hub + Impressum/Datenschutz (Anschrift eingetragen) + 404 + Favicon; „Nebel & Papier" via `tokens.css`/`wg.css` + 3 self-hosted Fonts; Games/WiB nach `unterricht/…` umgezogen + Gates nachgezogen; Spec/Plan unter `specs/`+`plans/`; 3 Gate-Härtungen im `ARCHITEKTUR.md`-Log |
| E4 Zettelkasten-Mount | offen (wartet auf `zk-atlas` Plan 5) |
| **E5 Akten-Look-Absorption (Theme+Engine)** | ✅ **deployt 2026-08-01** (Merge-Commit `bc12a7e`, `--no-ff` über 12 Task-Commits; live verifiziert: Übersicht + Mappe headless ohne JS-Fehler und ohne Fehl-Request, `vendor/redesign.css` 404, Labels live `AKTE 01 · DAS SCHWEIGEN` / `DOSSIER · GPG / R7`). Ergebnis: `vendor/`-Overlay (1194 Z. CSS/JS, 397 `!important`) vollständig in `theme-gpg.css` + Engine absorbiert · rd-inject-MutationObserver entfällt · Übersicht rendert die Engine (`initUebersicht`), Game-`index.html` schrumpft von 101 auf 36 Z. · Akten-Labels datengetrieben (`meta.akten_label`/`meta.dossier_label`/`mappen[i].akten_label`, mit Fallbacks) + WW1-Leftover korrigiert · Assets nach `unterricht/assets/` · `make bump A=all`. Abnahme: Screenshot-Diff 7×0 px gegen die Vor-E5-Baseline (einzige gewollte Abweichung: der Label-Fix-Commit, Diff nur in den Label-Zeilen) · Zustands-Fingerabdruck über 282 Computed-Style-Messpunkte inkl. Hover/Zustandsklassen · `make check`/`make smoke` grün · Netzwerk-Beweis ohne `vendor/`-Request · `!important` in `theme-gpg.css`: 6, nur Print-Block. Offener Befund (bewusst nicht repariert, im CSS kommentiert): der Korrekt-State der MC-Optionen war schon vor E5 unsichtbar, weil der Dark-Zweig ihn überstimmte. Spec + Plan (`specs/2026-07-26-…-design.md` + `plans/2026-07-26-e5-akten-look-absorption.md`, 12 Tasks) freigegeben 2026-07-26. Kern-Entscheide: pixel-identische Migration (Screenshot-Harness Task 1) · Übersicht→Engine `initUebersicht` · Labels Migration-treu + separater Fix-Commit (Task 10, Texte Paul-freigegeben) · Asset-Umzug `unterricht/assets/` als letzter Task · Distributions-Neutralität (Vertriebs-/Plattform-Frage bleibt offen). Plan-Korrekturen während der Umsetzung im `ARCHITEKTUR.md`-Log 2026-07-30 |

## Offene Ansage-Punkte (nur Paul entscheidet)

- **sandbox-export: Runtime-Tiefe `../../assets/` lernen** (Generator-Welt, fällig VOR dem
  nächsten Game-Export): seit E5 laden Game-HTML die Runtime aus `unterricht/assets/`
  (Tiefe 2), `fonts.css` weiterhin aus `/assets/` (Tiefe 3). Zusätzlich erzeugt das
  Export-Template keine Overlay-Dateien mehr (`vendor/` entfällt), die Übersicht braucht
  `class="uebersicht"` am `<body>` + `EscapeEngine.initUebersicht()` statt Inline-Script,
  und `data.json` kann optional `meta.akten_label` / `meta.dossier_label` /
  `mappen[i].akten_label` mitliefern (ohne die Felder greifen Fallbacks).
  **Übergeben 2026-08-01** in die Generator-Welt (dort Commit `46bc57d`): Befund + Soll-Tabelle
  in `~/escape-game-generator/docs/uebergabe/UEBERGABE_PORTABILITAET_HOSTING.md`, getrackt als
  Issue `I-10` (Export-Blocker: die dortige Pfadregel ist seit E5 *invertiert* und würde
  korrekte Pfade zerstören) in `docs/projekt/STATUS.md`. Hier nichts zu tun.
- **Portabilität der Games** (Generator-Welt, Paul entscheidet — `D-OPEN-7`): gemessen am
  Live-Stand nach E5 sind Games *nicht* self-contained (Ordner allein = 404-Ruine, `file://`
  scheitert, 29 nackte CSS-Element-Selektoren beanspruchen die ganze Seite). Keine Domain-,
  Backend- oder Token-Kopplung. Vorschlag: portabel als Default, diese Site biegt per
  `data-runtime-base` auf die geteilte Runtime um; Kernentscheid ist die CSS-Isolation
  (iframe-Ganzseitenvertrag vs. Wurzelklassen-Scoping). Beitrag dieser Schicht wäre klein
  (ein Body-Attribut) und erst nach dem Entscheid fällig. Vorlage: dieselbe Übergabe §3–§5.
- **Domain-Sicherung** (optional, z. B. paulcebulla.de registrieren + Redirect): Pauls manueller
  Schritt außerhalb des Repos, kein Blocker (s. `ARCHITEKTUR.md` → Separierbarkeits-Regeln).

## Track-Pause (Paul-Entscheid 2026-08-01)

Die Agenda ist mit E5 abgearbeitet; E4 bleibt blockiert (`zk-atlas` war am 30.07. aktiv, aber
Plan 5 Render/Publish ist nicht begonnen — `plan1`–`plan4` liegen als Diffs vor, kein
`out/deploy/public/`). **Paul hat den Track bewusst pausiert**, statt Ersatzarbeit zu beginnen.
Wieder-Einstiegspunkte, damit die nächste Session nicht neu sondieren muss:

- **Alt-Game-Bestand** (in dieser Session gefunden, sonst nirgends notiert): unter
  `unterricht/escape-games/` liegen vier `_archiv-`-Games, davon zwei **vollständige** —
  „Deutscher Nationalismus und Kolonialismus" (4 Mappen · 21 Aufgaben · 23 Materialien) und
  „Der Erste Weltkrieg — Ursachen und Ausbruch" (4 Mappen · 26 Aufgaben · 25 Materialien);
  dazu das Fragment „WW1 Verlauf Marne–Ende" (1 Mappe) und eine Run-Variante.
  **Keines hat ein `vendor/`-Overlay** — sie sind genau die nackte Bauform, die E5 zum Normalfall
  gemacht hat. Kaputt sind nur die Asset-Pfade (`../../assets/css/themes/…` = Prä-E3/E5-Stand);
  die Reparatur ist dasselbe Muster wie bei Syrien (Pfade + `class="uebersicht"` +
  `initUebersicht()` + `make bump` + Smoke). **Offene Vorfrage an Paul: warum wurden sie bei der
  E3-Triage archiviert?** Nur wegen der Pfade → Website-Arbeit von ~1 Nachmittag. Wegen
  didaktischer Qualität → Generator-Welt (dortiger Track „Wave-3 Daten-Regen", 117 Quality-Gaps).
- **Nebenbefund:** E5 ist bisher an **genau einem** Game verifiziert. Ein zweites Game auf der
  geteilten Schicht wäre der eigentliche Beleg, dass sie generisch trägt.
- Weitere erwogene, nicht gewählte Richtungen: E4-Vorarbeit ohne zk-atlas (Mount-Punkt,
  Deploy-Scope, Smoke-Policy, Design-Entscheid Atlas-eigen vs. Site-Tokens) · Profil/Inhalt
  (`/profil/` hat Porträt ohne Prosa, kein Blog).
