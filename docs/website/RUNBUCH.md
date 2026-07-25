# RUNBUCH — weitergehts.online Website-Pflege

> Entscheidungsbaum für die wiederkehrenden Pflege-/Entwicklungs-Loops. Ergänzt
> `CLAUDE.md` (Rückgrat) und `SITE_MAP.md` (was wo liegt). Gehört zur **Website-Pflege-Schicht**
> — NICHT zum Generator-/PM-Apparat (externes Repo `~/escape-game-generator/`).

## „Ich will …" → Loop wählen

| Vorhaben | Loop |
|---|---|
| Tippfehler / Inhalt / Feedback in einem **bestehenden Game** korrigieren | **L1 data.json-Hotfix** |
| Geteilte **Engine / CSS** ändern (`escape-engine.js`, `base.css`, Theme) | **L2 Engine/CSS** |
| **Neues Escape-Game** auf die Site bringen | **L3 Game einspielen** |
| **Neue Seite / Säule / Vertical** (Standalone analog /profil/) | **L4 Seite/Vertical** |
| **Lernraum-Daten** (Glossare/KE-Stats) neu erzeugen | **L5 Lernraum** |
| Game **sichtbar/unsichtbar** schalten, Hub/Root pflegen | **L6 Sichtbarkeit/Hub** |

**Goldene Klammer für JEDEN Loop:** vor dem Push `make check` (BLOCKING grün) → committen
(pre-commit-Hook prüft erneut) → push `main` → CI-`validate` gated den Deploy.

---

## L1 — data.json-Hotfix (häufigster Fall)

1. Datei: `unterricht/escape-games/<game-id>/data.json` direkt editieren (Content/Feedback/Tipps/Quellen).
2. Lokal prüfen: `make check` (validiert JSON + Feedback-Schema + kein Lehrkraft-Meta-Leak).
3. Optional rendern: `make smoke` oder lokal `python3 -m http.server 8080` und Seite öffnen.
4. Stagen (explizit) + committen: `git add unterricht/escape-games/<game-id>/data.json && git commit -m "fix(<game>): …"`.
5. Push (auf Ansage) → CI gated → live.
- **Engine NICHT angefasst → kein Cache-Bust nötig.**

## L2 — Engine/CSS-Änderung (höchstes Risiko: trifft ALLE Games)

1. Editiere `assets/js/escape-engine.js` (~5150 Z.) bzw. `assets/css/base.css` / `assets/css/themes/theme-gpg.css`.
   - Große Engine: mit **serena** navigieren (`find_symbol`/`find_referencing_symbols`).
2. **Cache-Bust (Pflicht):** `make bump A=engine` (bzw. `A=base`, `A=theme`, `A=core`, `A=all`).
   Das erhöht den Token in `assets/versions.json` und gleicht **alle** `?v=` in den HTML an.
3. `make check` (prüft u.a. Versions-Konsistenz) **und** `make smoke` (alle Live-Seiten rendern fehlerfrei?).
4. Diff sichten: `/code-review` oder `/simplify` auf den Engine-Diff.
5. Stagen (Engine/CSS + `assets/versions.json` + die geänderten HTML) → commit → push.
- **Vergessenes Cache-Bust = check.sh ROT** (Drift wird gefangen, nicht still).

## L3 — Neues Escape-Game einspielen (Generator → Site)

> Produktion läuft im **Generator-Workflow** (anderes Repo/Plugin), nicht hier.

1. Game mit dem Plugin erzeugen: `/escape-game-generator:generate-game …` → landet in der Sandbox `~/.escape-games/<id>/<ts>/`.
2. Auf die Live-Site übertragen: `/escape-game-generator:sandbox-export` → Ziel `unterricht/escape-games/<id>/`
   (verifiziert Manifest/SHA-256). **⚠ Seit E3:** der sandbox-export muss sein TARGET von
   `escape-games/` auf `unterricht/escape-games/` nachziehen — in der **Generator-Welt**, s. Ansage-Punkt in `PROZESS.md`.
   Solange offen: Export-Baum von Hand nach `unterricht/escape-games/<id>/` verschieben.
   Zu beachten: Game-HTML lädt Assets mit **`../../../assets/`** (Tiefe 3, seit E3), nicht `../../`.
3. In die **Website-Schicht** zurück: `make check` + `make smoke` (rendert das neue Game sauber?).
4. **Hub** ergänzen (→ L6): `<li>` in `unterricht/index.html` (hub-relativer Link `escape-games/<id>/index.html`), zunächst `data-status="staging"`.
5. Cache-Bust prüfen: `python3 tools/website/bump-assets.py --check` (neue HTML müssen die aktuellen Tokens tragen; sonst `make bump` mit Sync).
6. Stagen → commit `feat(<game>): …` → push.

## L4 — Neue Seite / Säule / Vertical

> Seit E3 (säulen-basierte IA) zwei Fälle:
> **(a) Unterrichtsmaterial** → unter `unterricht/…` (z.B. `unterricht/wib/<tool>.html`); im Hub verlinken.
> **(b) Neue Säule / Standalone** (analog `/profil/`) → eigener Top-Level-Ordner + Root-Kachel + `Makefile`-Allowlist.

1. Verzeichnis/Datei anlegen. **Ladekette Site-Seiten** (nicht Games!): `fonts.css → tokens.css → wg.css`
   mit `?v=0`, dann `python3 tools/website/bump-assets.py --sync` normalisiert die Tokens. Für Layout die
   `wg`-Komponenten nutzen (`.topbar`/`.hero`/`.gw-grid`/`.block`/`.foot`); `<html class="mode-dark">` +
   Inline-Mode-Script (localStorage `wg-mode`). Die Referenz `_design-scoping/claude-design/` zeigt weitere Muster.
2. Verlinken (Root-Kachel `.gw` bzw. Hub-`<li>`, → L6). Bei neuem Top-Level-Ordner: `Makefile`-Allowlist
   (`site`-Target) ergänzen. `SITE_MAP.md` aktualisieren.
3. `make check` (Asset-Links + JSON) + `make smoke` (neue Seiten werden automatisch mitgetestet — Site-Seiten
   werden vom Render-Smoke validiert; `check_assets` prüft Dead-Links nur im Game/WiB-Baum).
4. Stagen → commit `feat(<vertical>): …` → push.
- **Blog/Notizen:** bleibt E4-Vorbehalt (Zettelkasten-Mount, s. `ARCHITEKTUR.md`); Konzept liegt in `_design-scoping/`.

## L5 — Lernraum-Daten neu bauen

1. Quellen liegen **außerhalb** des Repos (s. `SITE_MAP.md` / ggf. `tools/lernraum/SOURCES.json`). Quelle editieren.
2. `make lernraum` (erzeugt `assets/data/glossar-*.json`, `themen-mp.json`, `ke-stats-*.json`).
3. `make check` (JSON-Validität) → stagen der generierten JSONs → commit `build(lernraum): …` → push.
- Nur relevant, solange der Lernraum aktiv gepflegt wird (Examens-Schiene Mai 2026 abgeschlossen).

## L6 — Sichtbarkeit / Hub / Root

- **Games + WiB-Tools** listet der Hub `unterricht/index.html` (= Discovery-Quelle für `check`/`smoke`).
  **Staging-Mechanik** (dort): `<li data-status="staging">` ist versteckt, nur mit `?staging=1` sichtbar
  (gelber Banner). So lässt sich Neues live deployen, aber für Besucher verborgen testen.
  Game live schalten = `data-status="staging"` entfernen.
- **Root `index.html`** = Verteiler-Kacheln (Säulen), keine per-Game-Liste. Neue Säule = neue `.gw`-Kachel.
- Nach Edit: `make check` (Asset-Link-Sanity) → commit → push.

---

## Deploy, Vorschau, Recovery

- **Lokale Vorschau:** `python3 -m http.server 8080` (oder `.claude/launch.json` → „static-server"). Exakter Public-Baum: `make site && python3 -m http.server -d _site 8080`.
- **Deploy:** push `main` → CI-Job `validate` (`make check` + `make smoke`) MUSS grün sein, sonst läuft `deploy` nicht. Publish = nur `_site/` (Allowlist).
- **Gate lokal reproduzieren:** `make check && make smoke` — identisch zur CI.
- **Bewusster Hook-Override** (Ausnahme): `git commit --no-verify` (nur mit gutem Grund).
- **Wenn CI rot:** Logs zeigen den fehlgeschlagenen Check; lokal `make check`/`make smoke` nachstellen, fixen, neu pushen. Es ging nichts Kaputtes live (Deploy war geblockt).

## Was NICHT hierher gehört

Generator-/Plugin-Entwicklung, STATUS.md/CHANGELOG/Vertraege/Q-Gates, Bridge-Pairs, didaktische
Audits → externes Repo `~/escape-game-generator/` (dort `docs/projekt/COWORK_PROJECT_ANLEITUNG.md`).
Bloom-Verteilung u.ä. sind
**ADVISORY** in `make check` (Content-Hoheit Generator), blocken den Website-Deploy nicht.
