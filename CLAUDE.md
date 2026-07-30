# CLAUDE.md — weitergehts.online

> Auto-geladenes Rückgrat für **Claude-Code-Sessions in diesem Repo**. Bewusst schlank
> (Routing-Dokument, kein State-Dump). Alles Veränderliche lebt in `docs/website/` + Memory.

## Was das ist

`weitergehts.online` ist die **persönliche Website von Paul Cebulla** (Lehrkraft) — statisch,
vanilla HTML/CSS/JS, **kein Build/npm/Framework**, gehostet auf **GitHub Pages**.
Zielbild: **drei Säulen** (Soll-Architektur + Entscheidungs-Log: `docs/website/ARCHITEKTUR.md`):

- **Unterricht** — interaktive **Escape-Games** (GPG/Geschichte R7), datengetrieben:
  je Spiel `unterricht/escape-games/<id>/data.json` + geteilte `unterricht/assets/js/escape-engine.js` + Theme-CSS.
  Plus WiB-Tools (`unterricht/wib/`) + **Lernraum**-Daten (`assets/data/*.json`, via `make lernraum`).
- **Zettelkasten** — Mount des extern generierten PKM-Atlas (*geplant*, E4).
- **Profil** — Visitenkarte; Root wird neutraler Verteiler (*geplant*, E3).

## ⚠️ Zwei getrennte Welten — nicht vermischen

| Welt | Wo | Wofür |
|---|---|---|
| **Website-Pflege-Schicht** (= dieses Repo) | `CLAUDE.md`, `docs/website/`, `tools/`, `assets/`, `unterricht/`, `profil/`, `impressum/`, `datenschutz/`, `index.html` | Die Live-Site warten & erweitern. |
| **Generator-/PM-Apparat** (NICHT anfassen) | ausschließlich das externe Repo `~/escape-game-generator/` (seit der Entmischung 2026-07-25) | Produktion *neuer* Games (Plugin, STATUS.md, Vertraege, Q-Gates). Eigene Steuerung: dort `docs/projekt/COWORK_PROJECT_ANLEITUNG.md`. |

**Faustregel:** Website *pflegen/erweitern* → diese Schicht + `docs/website/RUNBUCH.md`.
*Neues Game produzieren* → Generator-Workflow im externen Repo (Plugin `escape-game-generator`,
dann `sandbox-export`; Export-Ziel seit E3: `unterricht/escape-games/<id>/`).
Diese Datei steuert NICHT die Generator-Entwicklung.

## Harte Regeln (Deploy = push auf `main` = in ~1 Min live für Schüler)

1. **Vor jedem Push: `make check`** (muss BLOCKING-grün sein). CI blockt sonst den Deploy.
2. **Pre-commit-Hook einmalig aktivieren:** `make install-hooks` (blockt kaputte Commits lokal).
3. **Cache-Bust nur via Script:** `make bump A=engine` (bzw. core/base/theme/all) — **niemals `?v=` von Hand** editieren. `assets/versions.json` ist die Single Source.
4. **Git:** auf `main` immer erst branchen; **explizit stagen, nie `git add .`/`-A`**; Push/PR nur auf Ansage.
5. **Deploy ist gescopt:** veröffentlicht wird nur `_site/` (Allowlist via `make site`) — `docs/`, `tools/`, `_archiv*`, `.claude/` gehen **nicht** live.

## Die wiederkehrenden Loops → `docs/website/RUNBUCH.md`

`data.json`-Hotfix · Engine/CSS-Änderung · neues Game einspielen · neue Sektion/Blog-Post ·
Lernraum neu bauen · Landing/Sichtbarkeit. Jeder Loop hat dort ein exaktes Rezept + die richtigen Guardrails.

## Schnellreferenz

```bash
make check          # DER Validierungs-Gate (BLOCKING + ADVISORY). Vor jedem Push.
make smoke          # Headless-Render-Smoke aller Live-Seiten inkl. sections/ (Playwright; lokal einmalig: make smoke-setup)
make bump A=engine  # escape-engine.js geändert → Token bumpen + alle HTML angleichen
make site           # baut _site/ = exakt der Public-Deploy-Baum (lokale Vorschau des Scopings)
make install-hooks  # pre-commit-Hook aktivieren (einmalig pro Clone)
python3 -m http.server 8080   # lokale Vorschau (oder .claude/launch.json "static-server")
```

- **Geteilte Runtime:** `unterricht/assets/js/escape-engine.js` (~5400 Z.) rendert *alle* Games aus
  `data.json` — seit E5 auch die Spiel-Übersicht (`EscapeEngine.initUebersicht()`) und den
  Akten-Look-DOM. Änderung daran trifft alle Spiele → danach `make bump A=engine` + `make smoke`.
  Für Navigation im großen File hilft das **serena**-Plugin; Diffs mit `/code-review`. Seit E2
  (07/2026) gibt es keinen Engine-Fork mehr — Bumps erreichen wieder ALLE Games.
- **Game-Assets liegen in der Säule:** `unterricht/assets/{js,css}/` (Engine, core, base,
  theme-gpg) — `fonts.css`/`assets/fonts/` bleiben site-geteilt unter `/assets/`. Game-HTML
  referenziert deshalb zwei Tiefen: Runtime `../../assets/…`, Fonts `../../../assets/…`.
  Der Akten-Look steckt seit E5 in `theme-gpg.css`; game-lokale `vendor/`-Overlays gibt es nicht
  mehr. Visuelle Regressionen prüfen: `.venv/bin/python3 tools/smoke/screenshot.py shoot <label>`
  + `diff <a> <b>` (pixelgenau).
- **Prozess-Stand** (wo stehen wir, nächster Schritt, Ansage-Punkte): `docs/website/PROZESS.md`
  — bei Weiterentwicklungs-Arbeit ZUERST lesen; Source of Truth vor dem Memory.
- **Karte der Site:** `docs/website/SITE_MAP.md`. **Memory** (Projekt-Fakten): siehe Recall.
- **Konventionen:** `_`-präfixierte Ordner (`_archive/`, …) = Scratch, werden weder geprüft noch deployt.

## Commit-Konventionen

Conventional Commits, deutsch, mit Scope: `feat(...)`, `fix(...)`, `ux(...)`, `chore(...)`, `docs(...)`.
Scope = Sektion/Game (`gpg-ww1`, `website-layer`, `blog`, `engine`). Aussagekräftiger Body.
