# SITE_MAP — weitergehts.online

> **Ist-Zustand** der Site als Menge von **Verticals**. Anker für „wo gehört Neues hin".
> Soll-Architektur, Prämissen + Entscheidungs-Log: `ARCHITEKTUR.md`.
> Bei jeder neuen Sektion/Game/Seite hier eintragen. Stand: 2026-07-18.

## Verticals

| Vertical | Verzeichnis | Content-Modell | Template | Status |
|---|---|---|---|---|
| **Home / Landing** | `index.html` | Hand-gepflegte `<ul>` der Games/Sektionen; Staging-Flag `?staging=1` | — | live |
| **Unterrichtsmaterial · Escape-Games** | `escape-games/<id>/` | `data.json` (meta+mappen+materialien+aufgaben) → gerendert von `assets/js/escape-engine.js` | `escape-games/_template/` | live (4 Games) |
| **Unterrichtsmaterial · Lernraum** | `assets/data/*.json` | aus externen Quellen via `make lernraum` generierte Glossar-/KE-Daten | `tools/lernraum/` | Daten vorhanden; Konsument-Seiten teils mit Examens-Schiene archiviert |
| **WiB · Wirtschaft (interaktive Tools)** | `sections/wib/` | self-contained HTML (Chart.js via CDN), `localStorage`, kein Backend/Tracking | — | live (2 Tools: Haushaltsbuch + Geld-Wert; Geld-Wert nur noch als eigenständige Seite — Duplikat-Tab im Haushaltsbuch am 17.07. entfernt) |
| **Zettelkasten** | `/zettelkasten/` *(geplant, E4)* | extern generierter Atlas-Mount (`zk-atlas` → statisches HTML, nie handeditiert) | — | geplant (s. `ARCHITEKTUR.md`) |
| **Weitere Sektionen** | `sections/<name>/` | je nach Bedarf | — | künftig |

## Live-Games (verlinkt aus `index.html`)

`make check`/`smoke` leiten die „Live"-Menge automatisch aus `index.html` ab:

- `gpg-erster-weltkrieg-ursachen` — Erster Weltkrieg: Ursachen und Ausbruch (GPG R7)
- `verlauf-erster-weltkrieg-marne-ende` — Erster Weltkrieg: Verlauf Marne→Ende (GPG R7)
- `deutscher-nationalismus-kolonialismus` — Deutscher Nationalismus und Kolonialismus (GPG R7)
- `syrische-revolution-2011` — Syrische Revolution 2011 (GPG R7). **⚠ Ausnahme:** nutzt eine eigene
  `vendor/`-Runtime (Engine-Fork +33 Zeilen, Redesign-CSS, ohne `?v=`-Governance) — `make bump A=engine`
  erreicht dieses Game NICHT; Rückführung geplant (E2 im Redesign-Prozess).

**Nicht-verlinkte Game-Verzeichnisse** — seit 17.07. per `_`-Präfix aus Deploy und Checks ausgenommen:
`_template/` (Scaffold für neue Games), `_archiv-gpg-erster-weltkrieg-ursachen-run4-v050/` (alter
Parallel-Cut) und `_dev-verlauf-erster-weltkrieg-marne-ende-diff/` (enthält die fertige Differenzierung
als Merge-Material für das Live-Pendant, das noch keine hat).

## Geteilte Assets (treffen alle Verticals)

| Datei | Rolle | Versionierung |
|---|---|---|
| `assets/js/escape-engine.js` | Game-Runtime (~5150 Z.) | `?v=` via `assets/versions.json` + `make bump A=engine` |
| `assets/js/core.js` | Storage/Nav/Utilities | `make bump A=core` |
| `assets/css/base.css` | Reset/Tokens/Layout | `make bump A=base` |
| `assets/css/themes/theme-gpg.css` | GPG-Theme | `make bump A=theme` |
| `assets/img/<game-id>/` | Game-Medien | — |
| `assets/data/*.json` | Lernraum-Daten (generiert) | `make lernraum` |

## Konventionen

- **Neue Sektion** = `sections/<name>/` + Eintrag hier + Link in `index.html`. Geteilte Assets mit
  `?v=`-Token referenzieren (von `bump-assets`/`check` automatisch erfasst).
- **`_`-präfixierte Ordner** (`_archive/`, `_smoketest_out/`, …) = nicht-deploybarer Scratch:
  von `check`, `bump` und dem Publish (`make site`) ausgeschlossen.
- **Deploy-Scope:** öffentlich = `index.html`, `escape-games/`, `assets/`, `sections/`, `CNAME`.
  Intern (nie live) = `docs/`, `tools/`, `bridge/`, `_archiv*`, `.claude/`, Repo-Meta.

## Offene IA-Fragen (für später)

- ~~Blog/Notizen-Modell~~ **beantwortet 2026-07-18 (A0):** kein Blog, sondern Zettelkasten-Mount
  (`ARCHITEKTUR.md`; Umsetzung E4).
- ~~Home-Seite~~ **beantwortet 2026-07-18 (A0):** Root wird neutraler Verteiler auf 3 Säulen;
  Umsetzung E3 (Design dort via `frontend-design`/`ui-design`).
- **Favicon** fehlt (harmloser 404) — wird in E3 miterledigt.
- ~~Smoke-Coverage `sections/`~~ **erledigt 2026-07-17:** `smoke.py` testet alle deploybaren
  `sections/**/*.html` mit (ohne `_`-Segmente). CDN-Policy weich: Subressourcen-Fehler fremder
  Hosts (z.B. cdn.jsdelivr.net) = WARN, same-origin-Fehler/pageerrors = FAIL.
