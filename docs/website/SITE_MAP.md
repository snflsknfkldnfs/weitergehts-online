# SITE_MAP — weitergehts.online

> **Ist-Zustand** der Site als Menge von **Verticals**. Anker für „wo gehört Neues hin".
> Soll-Architektur, Prämissen + Entscheidungs-Log: `ARCHITEKTUR.md`.
> Bei jeder neuen Sektion/Game/Seite hier eintragen. Stand: 2026-07-30 (nach E5-Akten-Look-Absorption).

## Verticals (Drei-Säulen-IA seit E3)

| Vertical | Verzeichnis | Content-Modell | Template | Status |
|---|---|---|---|---|
| **Root · Verteiler** | `index.html` | Nebel-&-Papier-Verteiler (`wg`-System): Hero + 2 Kacheln (Profil, Unterricht), 3. Slot für Zettelkasten reserviert (E4) | — | live |
| **Profil · Visitenkarte** | `profil/` | minimal: Porträt-Hero + Kindheitsfoto (bild-only, keine Prosa — Pauls Entscheid); Fotos in `profil/img/` | — | live |
| **Unterricht · Hub** | `unterricht/index.html` | Hub-Liste (Escape-Games + WiB); Discovery-Quelle für `check`/`smoke`; Staging-Flag `?staging=1` | — | live |
| **Unterricht · Escape-Games** | `unterricht/escape-games/<id>/` | `data.json` (meta+mappen+materialien+aufgaben) → gerendert von `unterricht/assets/js/escape-engine.js` | `unterricht/escape-games/_template/` | live (1 Game: Syrien) |
| **Unterricht · WiB-Tools** | `unterricht/wib/` | self-contained HTML (Chart.js via CDN), `localStorage`, kein Backend/Tracking | — | live (2 Tools: Haushaltsbuch + Geld-Wert) |
| **Unterricht · Lernraum** | `assets/data/*.json` | via `make lernraum` generierte Glossar-/KE-Daten | `tools/lernraum/` | Daten vorhanden; Konsument-Seiten teils mit Examens-Schiene archiviert |
| **Impressum** | `impressum/` | statische Pflichtangaben (§ 5 DDG) | — | live (⚠ Anschrift `TODO-PAUL`) |
| **Datenschutz** | `datenschutz/` | statische DSGVO-Erklärung (Hosting/Cookies/Fonts/Dritt-Inhalte/Rechte) | — | live (⚠ Anschrift `TODO-PAUL`) |
| **404** | `404.html` | „umgezogen"-Seite mit root-absoluten Links (unter beliebiger URL ausgeliefert) | — | live |
| **Zettelkasten** | `/zettelkasten/` *(geplant, E4)* | extern generierter Atlas-Mount (`zk-atlas` → statisches HTML, nie handeditiert) | — | geplant (s. `ARCHITEKTUR.md`) |

**Der eine URL-Bruch (E3):** Games/WiB sind von `escape-games/…` bzw. `sections/wib/…` nach
`unterricht/escape-games/…` bzw. `unterricht/wib/…` umgezogen. Bewusst einmalig; alte URLs
fängt `404.html` ab. Die Unterricht-**Assets** (`escape-engine.js`, `theme-gpg.css`) bleiben
unter `/assets/` — ihr Umzug fällt mit E5 zusammen (s. `ARCHITEKTUR.md`).

## Live-Games (Discovery aus `unterricht/index.html`)

`make check`/`smoke` leiten die „Live"-Menge automatisch aus **`unterricht/index.html`** ab
(seit E3; vorher `index.html`):

- `syrische-revolution-2011` — Syrische Revolution 2011 (GPG R7). Auf der geteilten Runtime unter
  `?v=`-Governance; game-lokal bleibt nur das Redesign-Overlay (`vendor/redesign*.css`,
  `rd-inject.js`, `media-placeholder.css`) als E5-Material.

**Archivierte Games** — bei der E3-Triage per `_archiv-`-Präfix aus Deploy + Checks genommen,
jederzeit reaktivierbar (Präfix entfernen + `<li>` in `unterricht/index.html`):
`_archiv-gpg-erster-weltkrieg-ursachen`, `_archiv-verlauf-erster-weltkrieg-marne-ende`,
`_archiv-deutscher-nationalismus-kolonialismus` (+ der ältere `_archiv-…-run4-v050`-Cut).
`_template/` = Scaffold für neue Games (nie live).

## Geteilte Assets (treffen alle Verticals)

| Datei | Rolle | Versionierung |
|---|---|---|
| `unterricht/assets/js/escape-engine.js` | Game-Runtime (~5400 Z.); rendert seit E5 auch die Spiel-Übersicht (`initUebersicht`) + Akten-Look-DOM | `?v=` via `assets/versions.json` + `make bump A=engine` |
| `unterricht/assets/js/core.js` | Storage/Nav/Utilities | `make bump A=core` |
| `unterricht/assets/css/base.css` | Reset/Tokens/Layout (Game-Kette) | `make bump A=base` |
| `unterricht/assets/css/theme-gpg.css` | GPG-Theme **inkl. Akten-Look** (Game-Kette); seit E5 ohne game-lokales Overlay | `make bump A=theme` |
| `assets/css/fonts.css` + `assets/fonts/` | self-gehostete Webfonts (10 Familien; E3 +Newsreader/Archivo/Space Mono) | `make bump A=fonts` |
| `assets/css/tokens.css` | **Site**-Token-Vokabular „Nebel & Papier" (`.mode-light`/`.mode-dark`/`:root`); seit E3 aktiv geladen | `make bump A=tokens` |
| `assets/css/wg.css` | **Site**-Komponenten (Topbar/Hero/Gateways/Footer/…); Site-Kette `fonts → tokens → wg` | `make bump A=wg` |
| `assets/css/lernraum.css` | ausgelagerter wg.lernraum-Block (ungeladen, bereitliegend) | — |
| `assets/img/site/` | Root/Profil-Fotos (`gleise-ueberwachsen`, `museum-blick`, `turm-beton`; Profil-Fotos in `profil/img/`) | — |
| `assets/img/<game-id>/` | Game-Medien | — |
| `assets/data/*.json` | Lernraum-Daten (generiert) | `make lernraum` |

**Zwei Ladeketten:** Site-Seiten `fonts.css → tokens.css → wg.css` · Games `fonts.css → base.css → theme-gpg.css`.
Games laden `tokens.css`/`wg.css` NICHT.

**Unterricht-Assets seit E5 unter `unterricht/assets/`.** Die vier game-only-Dateien
(Engine, core, base, theme-gpg) liegen in der Unterricht-Säule; `fonts.css` + `assets/fonts/`
bleiben site-geteilt unter `/assets/`. Game-HTML referenziert deshalb **zwei Tiefen**:
Runtime `../../assets/…`, Fonts `../../../assets/css/fonts.css`. Der `themes/`-Zwischenordner
entfällt. Das game-lokale `vendor/`-Overlay (Akten-Look) existiert nicht mehr — der Look
steckt vollständig in `theme-gpg.css` + Engine, jedes neue Game erbt ihn.

## Konventionen

- **Neues Unterrichtsmaterial** = unter `unterricht/…` (Game via Generator-Export nach
  `unterricht/escape-games/<id>/`, Tool als `unterricht/wib/…`) + Eintrag hier + `<li>` in
  `unterricht/index.html`. Geteilte Assets mit `?v=`-Token (von `bump-assets`/`check` erfasst).
- **Neue Säule/Seite** (analog /profil/) = eigener Top-Level-Ordner + Kachel im Root + Allowlist
  in `Makefile` (`site`-Target) + hier eintragen.
- **`_`-präfixierte Ordner** (`_archiv-…`, `_template/`, `_smoketest_out/`, …) = nicht-deploybarer
  Scratch/Archiv: von `check`, `bump` und Publish (`make site`) ausgeschlossen.
- **Deploy-Scope (Allowlist, `make site`):** öffentlich = `index.html`, `404.html`, `favicon.svg`,
  `favicon.ico`, `unterricht/`, `assets/`, `profil/`, `impressum/`, `datenschutz/`, `CNAME`.
  Intern (nie live) = `docs/`, `tools/`, `_archiv*`, `_design-scoping/`, `.claude/`, Repo-Meta.

## Offene IA-Fragen (für später)

- ~~Blog/Notizen-Modell~~ **beantwortet 2026-07-18 (A0):** kein Blog, sondern Zettelkasten-Mount
  (`ARCHITEKTUR.md`; Umsetzung E4). Das Blog-Konzept aus `_design-scoping/claude-design/blog/`
  wurde in E3 NICHT übernommen (E4-Vorbehalt).
- ~~Home-Seite~~ **beantwortet + umgesetzt E3:** Root ist neutraler Verteiler auf die Säulen.
- ~~Favicon fehlt~~ **erledigt E3:** `favicon.svg` (+ `.ico`-Fallback).
- **Generator-TARGET** muss noch nachgezogen werden (sandbox-export → `unterricht/escape-games/`,
  Generator-Welt) — s. `PROZESS.md` Ansage-Punkte.
