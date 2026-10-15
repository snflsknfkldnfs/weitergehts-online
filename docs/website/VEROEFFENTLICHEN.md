# VERÖFFENTLICHEN — Material aus einer Kurssession auf weitergehts.online

> **Für wen:** jede Claude-Session, die Unterrichtsmaterial eines Kurses live bringt
> (Kurs-Welten unter `/Users/paulad/Schule_2026-27/Unterrichtsplanung26_27/welt/<Kurs>/`).
> **Was hier steht:** *wohin* eine Seite gehört, *wie* sie in Übersicht und Kursseite kommt,
> *welche Prüfungen* vor dem Push laufen. **Nicht hier:** wie das Material didaktisch entsteht
> (das regelt die Kurs-Welt, z. B. `welt/GPG/README.md`).
> Verwiesen aus: `welt/GPG/README.md`, `welt/Inf6b/CLAUDE.md`, `welt/WiB6b/CLAUDE.md` (Commit `4fb7105` dort).
> Stand 2026-10-15 · Spec: `specs/2026-10-15-kursseiten-design.md` · Website-Repo:
> `/Users/paulad/weitergehts.online/weitergehts-online/`

## Die Kette in einer Zeile

Erzeuger der Stunde (`welt/<Kurs>/…/_render/*_bauen.py`) → **Arbeitsbaum auf `origin/main`** →
Materialordner unter `unterricht/` → **Eintrag in `unterricht/kurse.json`** → `make kurse` →
`make check` → Commit (explizit gestagt) → **Push nur nach Freigabe der Lehrkraft** → ~1 Min. live.

Der Eintrag in `kurse.json` ist der Schritt, der früher fehlte: Ohne ihn ist die Seite zwar live,
aber in keiner Übersicht und auf keiner Kursseite zu finden (`make check` meldet sie als „verwaist").

## Schritt 0 — Arbeitsbaum, nie der Hauptcheckout

Der Hauptcheckout steht oft auf einem alten Zweig und hinter `origin/main` (Stand 15.10.: 17 Commits).

```bash
git -C /Users/paulad/weitergehts.online/weitergehts-online fetch origin
git -C /Users/paulad/weitergehts.online/weitergehts-online worktree add \
  /Users/paulad/weitergehts.online/_wt-<kurs>-<slug> -b feat/<slug> origin/main
```

Erzeuger schreiben mit `WEBSITE_REPO=<dieser Arbeitsbaum>` (Konvention aus `welt/GPG/README.md`).

## Schritt 1 — Wohin gehört die Seite?

| Art (`art` in kurse.json) | Ordner im Repo | Werkzeug (geteilt) | Vorbild-Erzeuger in der Kurs-Welt |
|---|---|---|---|
| `quellen` — Quellenarbeit am iPad | `unterricht/quellen/<slug>/` (`index.html` + `data.json`) | `quellen.js` / `quellen.css` | `GPG8a/S01_weimar/UE03-04_…/_render/quellen_bauen.py` |
| `anordnen` — Karten in Reihenfolge | `unterricht/ordnen/<slug>/` (`index.html` + `data.json` + `bilder/`) | `ordnen.js` / `ordnen.css` | `GPG8a/S01_weimar/UE01-02_…/_render/karten_bauen.py` |
| `werkzeug` — Fall eines Web-Werkzeugs (Datenspuren) | `unterricht/datenspuren/<nummer>/` | `datenspuren.js` | Generator im Website-Repo: `tools/datenspuren/build_datensatz.py` |
| `escape-game` | `unterricht/escape-games/<id>/` | `escape-engine.js` | Generator-Repo, dann `RUNBUCH.md` L3 |
| `anleitung` · `recherche` · `werkzeug` (Einzelseite) | `unterricht/<fach>/<slug>.html` oder `unterricht/<slug>/` | Site-Kette `fonts → tokens → wg` | `unterricht/gpg/wochenrueckblick.html`, `unterricht/smv/` |

**Slug-Regel** — die Adresse ist öffentlich und bleibt für immer (QR-Codes):

- ✅ `quellen/kampf-1919/` · `ordnen/eigener-staat/` — Thema, Kleinbuchstaben, Bindestriche
- ❌ `quellen/gpg8a-1310/` — Kurs und Datum gehören nicht in die Adresse (ablesbarer Stundenplan)
- ❌ `datenspuren/mueller/` — nie ein Name; bei Fällen nur die Nummer

Neues JS/CSS: **sofort** Eintrag in `assets/versions.json` + `?v=`-Token im HTML (`CLAUDE.md` Regel 3).

## Schritt 2 — Eintrag in `unterricht/kurse.json`

Ein Objekt in `materialien` (Reihenfolge egal; der Generator sortiert):

```json
{ "id": "quellen-kampf-1919", "pfad": "quellen/kampf-1919/",
  "titel": "Kampf um Berlin 1919",
  "art": "quellen", "fach": "gpg", "strang": "geschichte", "jahrgang": 8,
  "kurse": ["gpg8a"], "thema": "Weimarer Republik", "datum": "2026-10-13" }
```

| Feld | Pflicht | Regel |
|---|---|---|
| `id` | ja | `<art-ordner>-<slug>`; Games: `game-<id>` (die Spiel-Discovery von `check`/`smoke` liest das) |
| `pfad` | ja | relativ zu `unterricht/`; Ordner mit `/` am Ende, Einzelseite mit `.html` |
| `titel` | ja | **öffentlich** (steht in der Übersicht). Kein Kurskürzel — `make check` blockt „GPG 8a" im Titel |
| `art` | ja | `quellen` · `anordnen` · `werkzeug` · `anleitung` · `recherche` · `escape-game` |
| `fach` | ja | Schlüssel aus `faecher` (`gpg`, `wib`, `inf`) — neues Fach dort anlegen |
| `strang` | bei GPG | `aktuelles` oder `geschichte` (s. u.) |
| `jahrgang` | ja | Zahl; ergibt den Klassen-Reiter der Übersicht („8. Klasse") |
| `kurse` | — | Liste von Kurs-Schlüsseln; leer = nur Übersicht, keine Kursseite |
| `thema` | bei Kurs | Gruppe auf der Kursseite. **Wörtlich gleich schreiben** wie bei den Geschwistern — ein abweichender Name macht eine neue Gruppe |
| `datum` | bei Kurs | `JJJJ-MM-TT` der Stunde, **in der das Material eingesetzt wird** (nicht der Bau-Tag). Nur auf der Kursseite sichtbar |
| `teile` | — | Unterseiten, die auf der Kursseite einzeln erscheinen (Datenspuren-Fälle): `[{ "pfad", "titel", "datum" }]` |
| `status` | — | `"staging"` = in der Übersicht nur mit `?staging=1`; auf der Kursseite trotzdem sichtbar |

**Strang bei GPG** (Lehrkraft 2026-10-15: „GPG gliedert sich immer in Aktuelles und Geschichte"):

- `aktuelles` — Gegenwart und Politik: Wochenrückblick, Tagespolitik, SMV, Staat und Wirtschaft heute
- `geschichte` — eine historische Sequenz: Weimar, Zweiter Weltkrieg, geteiltes Deutschland
- Zweifel (z. B. „Markt oder Plan" als Systemvergleich 1949 → `geschichte`): nach der Sequenz
  entscheiden, in der die Stunde steht; ein `thema` liegt immer ganz in einem Strang.

**Neuer Kurs** (z. B. WiB6b): Eintrag in `kurse`, Schlüssel = Kurskürzel klein (`"wib6b"`).
Der Schlüssel ist die Adresse `unterricht/k/wib6b/` — **nach dem ersten QR-Code nie mehr umbenennen.**

## Schritt 3 — Bauen und prüfen

```bash
make kurse    # schreibt unterricht/index.html + unterricht/k/<kurs>/index.html
make check    # B5: kurse.json gültig + generierte Seiten aktuell; A3: verwaiste Seiten
make smoke    # bei neuer Seite oder neuem Werkzeug (einmalig: make smoke-setup)
```

`make check` muss BLOCKING-grün sein **und** A3 „keine verwaisten Materialseiten" zeigen.

## Schritt 4 — Commit

Explizit stagen (nie `git add -A`): Materialordner + `unterricht/kurse.json` +
`unterricht/index.html` + `unterricht/k/<kurs>/index.html` (+ ggf. `assets/versions.json`).

Commit-Betreff mit Kurs und Stunde (Commits sind nicht öffentlich, die Seite schon):
`feat(quellen): Seite „Kampf um Berlin 1919" (GPG8a, Di 13.10.2026)`

## Schritt 5 — Push und Link an die Klasse

- **Push nur nach Freigabe der Lehrkraft.** Danach ~1 Minute bis live.
- Link an die Klasse ist **die Kursseite** `https://weitergehts.online/unterricht/k/<kurs>/`
  (QR-Code, Computerraum-Lesezeichen) — sie zeigt oben unter „Zuletzt" alles mit dem jüngsten `datum`
  (= die letzte Stunde) und darunter alles nach Thema. Darum `datum` immer auf die Stunde setzen, in der das Material dran ist.
  Direktlinks auf eine einzelne Materialseite sind für Arbeitsblätter weiter in Ordnung.
- Nicht die Übersicht `/unterricht/` als Klassenlink verwenden — sie ist bewusst kursneutral.

## Grenzen

- ❌ `unterricht/index.html` oder `unterricht/k/*/index.html` von Hand oder mit einem anderen
  Werkzeug schreiben (auch nicht mit `werkzeugkasten/core/tools/material/linkseite.py`) —
  `make check` blockt jede Abweichung vom Generator, und `linkseite.py` verweigert diese Ziele seit 15.10.
  (Werkzeugkasten `33a0080`). ✅ Eintrag in `kurse.json` + `make kurse`.
- ❌ Kurskürzel, Datum oder Namen in `titel`, `pfad`, Ordner- oder Dateinamen.
- ❌ Kursseite in der Übersicht oder auf anderen öffentlichen Seiten verlinken (Kursseiten sind
  unverlinkt + `noindex`; das ist Unsichtbarkeit, kein Zugriffsschutz — nichts Vertrauliches darauf).
- ❌ Geteiltes Werkzeug (`quellen.js`, `ordnen.js`, Engine) für eine einzelne Stunde umbauen.
  Änderungen daran treffen alle Seiten → eigener Schritt mit `make bump` + `make smoke`.
- `unterricht/kurse.json` geht nicht live (`make site` nimmt sie aus dem Deploy).
