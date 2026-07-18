# CLAUDE.md — weitergehts.online

> Auto-geladenes Rückgrat für **Claude-Code-Sessions in diesem Repo**. Bewusst schlank
> (Routing-Dokument, kein State-Dump). Alles Veränderliche lebt in `docs/website/` + Memory.

## Was das ist

`weitergehts.online` ist die **persönliche Website von Paul Cebulla** (Lehrkraft) — statisch,
vanilla HTML/CSS/JS, **kein Build/npm/Framework**, gehostet auf **GitHub Pages**.
Zielbild: **drei Säulen** (Soll-Architektur + Entscheidungs-Log: `docs/website/ARCHITEKTUR.md`):

- **Unterricht** — interaktive **Escape-Games** (GPG/Geschichte R7), datengetrieben:
  je Spiel `escape-games/<id>/data.json` + geteilte `assets/js/escape-engine.js` + Theme-CSS.
  Plus WiB-Tools (`sections/wib/`) + **Lernraum**-Daten (`assets/data/*.json`, via `make lernraum`).
- **Zettelkasten** — Mount des extern generierten PKM-Atlas (*geplant*, E4).
- **Profil** — Visitenkarte; Root wird neutraler Verteiler (*geplant*, E3).

## ⚠️ Zwei getrennte Welten — nicht vermischen

| Welt | Wo | Wofür |
|---|---|---|
| **Website-Pflege-Schicht** (HIER relevant) | `CLAUDE.md`, `docs/website/`, `tools/website/`, `tools/smoke/`, `assets/`, `escape-games/`, `index.html`, `sections/` | Die Live-Site warten & erweitern. |
| **Generator-/PM-Apparat** (NICHT anfassen) | `docs/projekt/`, `docs/agents/`, `docs/architektur/`, `bridge/`, externes Repo `~/escape-game-generator/` | Produktion *neuer* Games (Plugin, STATUS.md, Vertraege, Q-Gates). Eigene Steuerung (`docs/projekt/COWORK_PROJECT_ANLEITUNG.md`). |

**Faustregel:** Website *pflegen/erweitern* → diese Schicht + `docs/website/RUNBUCH.md`.
*Neues Game produzieren* → Generator-Workflow (Plugin `escape-game-generator`, dann `sandbox-export`).
Diese Datei steuert NICHT die Generator-Entwicklung.

## Harte Regeln (Deploy = push auf `main` = in ~1 Min live für Schüler)

1. **Vor jedem Push: `make check`** (muss BLOCKING-grün sein). CI blockt sonst den Deploy.
2. **Pre-commit-Hook einmalig aktivieren:** `make install-hooks` (blockt kaputte Commits lokal).
3. **Cache-Bust nur via Script:** `make bump A=engine` (bzw. core/base/theme/all) — **niemals `?v=` von Hand** editieren. `assets/versions.json` ist die Single Source.
4. **Git:** auf `main` immer erst branchen; **explizit stagen, nie `git add .`/`-A`**; Push/PR nur auf Ansage.
5. **Deploy ist gescopt:** veröffentlicht wird nur `_site/` (Allowlist via `make site`) — `docs/`, `tools/`, `bridge/`, `_archiv*`, `.claude/` gehen **nicht** live.

## Die wiederkehrenden Loops → `docs/website/RUNBUCH.md`

`data.json`-Hotfix · Engine/CSS-Änderung · neues Game einspielen · neue Sektion/Blog-Post ·
Lernraum neu bauen · Landing/Sichtbarkeit. Jeder Loop hat dort ein exaktes Rezept + die richtigen Guardrails.

## Schnellreferenz

```bash
make check          # DER Validierungs-Gate (BLOCKING + ADVISORY). Vor jedem Push.
make smoke          # Headless-Render-Smoke aller Live-Seiten inkl. sections/ (Playwright; lokal: pip install playwright)
make bump A=engine  # escape-engine.js geändert → Token bumpen + alle HTML angleichen
make site           # baut _site/ = exakt der Public-Deploy-Baum (lokale Vorschau des Scopings)
make install-hooks  # pre-commit-Hook aktivieren (einmalig pro Clone)
python3 -m http.server 8080   # lokale Vorschau (oder .claude/launch.json "static-server")
```

- **Geteilte Runtime:** `assets/js/escape-engine.js` (~5150 Z.) rendert *alle* Games aus `data.json`.
  Änderung daran trifft alle Spiele → danach `make bump A=engine` + `make smoke`. Für Navigation im
  großen File hilft das **serena**-Plugin; Diffs mit `/code-review`.
  **Ausnahme (Stand 07/2026):** `syrische-revolution-2011` bindet eine eigene `vendor/`-Kopie der
  Runtime ein (Engine-Fork, ohne `?v=`) — bis zur Rückführung (E2) erreichen Engine-Bumps dieses
  Game NICHT.
- **Prozess-Stand** (wo stehen wir, nächster Schritt, Ansage-Punkte): `docs/website/PROZESS.md`
  — bei Weiterentwicklungs-Arbeit ZUERST lesen; Source of Truth vor dem Memory.
- **Karte der Site:** `docs/website/SITE_MAP.md`. **Memory** (Projekt-Fakten): siehe Recall.
- **Konventionen:** `_`-präfixierte Ordner (`_archive/`, …) = Scratch, werden weder geprüft noch deployt.

## Commit-Konventionen

Conventional Commits, deutsch, mit Scope: `feat(...)`, `fix(...)`, `ux(...)`, `chore(...)`, `docs(...)`.
Scope = Sektion/Game (`gpg-ww1`, `website-layer`, `blog`, `engine`). Aussagekräftiger Body.
