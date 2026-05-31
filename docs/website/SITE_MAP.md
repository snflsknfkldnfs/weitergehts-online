# SITE_MAP — weitergehts.online

> Informationsarchitektur der Site als Menge von **Verticals**. Anker für „wo gehört Neues hin".
> Bei jeder neuen Sektion/Game/Seite hier eintragen. Stand: 2026-05-31.

## Verticals

| Vertical | Verzeichnis | Content-Modell | Template | Status |
|---|---|---|---|---|
| **Home / Landing** | `index.html` | Hand-gepflegte `<ul>` der Games/Sektionen; Staging-Flag `?staging=1` | — | live |
| **Unterrichtsmaterial · Escape-Games** | `escape-games/<id>/` | `data.json` (meta+mappen+materialien+aufgaben) → gerendert von `assets/js/escape-engine.js` | `escape-games/template/` | live (3 Games) |
| **Unterrichtsmaterial · Lernraum** | `assets/data/*.json` | aus externen Quellen via `make lernraum` generierte Glossar-/KE-Daten | `tools/lernraum/` | Daten vorhanden; Konsument-Seiten teils mit Examens-Schiene archiviert |
| **Blog / Notizen** | `sections/blog/` *(geplant)* | offen (statische HTML; optional datengetrieben) | *noch zu definieren* | **im Aufbau** |
| **Weitere Sektionen** | `sections/<name>/` | je nach Bedarf | — | künftig |

## Live-Games (verlinkt aus `index.html`)

`make check`/`smoke` leiten die „Live"-Menge automatisch aus `index.html` ab:

- `gpg-erster-weltkrieg-ursachen` — Erster Weltkrieg: Ursachen und Ausbruch (GPG R7)
- `verlauf-erster-weltkrieg-marne-ende` — Erster Weltkrieg: Verlauf Marne→Ende (GPG R7)
- `deutscher-nationalismus-kolonialismus` — Deutscher Nationalismus und Kolonialismus (GPG R7)

**Nicht-verlinkte Game-Verzeichnisse** (`*-run4-v050`, `*-diff`, `template/`) sind Dev-/Vorlagen-Stände —
liegen im Baum, aber nicht in der Landing. (Aufräum-Kandidaten, s. Repo-Hygiene.)

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

- Blog/Notizen: statisch-handgepflegt vs. datengetrieben (JSON/Markdown→Render)? Navigation/Menü der Gesamtsite?
- Eigentliche **Home-Seite** ist aktuell nur eine Game-Liste — für eine „komplette persönliche Website"
  perspektivisch echte Landing/Navigation (Design via `frontend-design`/`ui-design`).
- **Favicon** fehlt (harmloser 404) — Mini-Win bei nächstem Sektions-Ausbau.
