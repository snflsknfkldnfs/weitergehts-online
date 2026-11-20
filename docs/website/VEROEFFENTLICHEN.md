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
aber in keiner Übersicht und auf keiner Kursseite zu finden. Seit 18.10.2026 **blockiert** `make check` eine verwaiste Seite (B5b; Befund: `quellen/versailles/` war live und verwaist, weil der Hinweis nur als ADVISORY lief). Stunden-Erzeuger schreiben den Eintrag selbst mit dem Werkzeugkasten-Baustein `/Users/paulad/werkzeugkasten/core/tools/material/kurse_eintrag.py` (`eintragen(WEBSITE, {...})`: fügt im Stil der Datei ein oder ersetzt, ruft `make kurse` und die Verwaist-Prüfung); Vorbild `welt/GPG8a/S01_weimar/UE08-09_2026-10-20_versailles/_render/seite_bauen.py`.

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
| `werkzeug` — Verteilen (Zeitbalken) | `unterricht/verteilen/<slug>/` | `verteilen.js` / `verteilen.css` | `WiB6b/S01_arbeit/UE06_…` |
| `werkzeug` — Abstimmen an der Tafel | `unterricht/abstimmen/<slug>/` | `abstimmen.js` / `abstimmen.css` | `GPG8a/S01_weimar/UE11-12_2026-10-27_…` |
| `werkzeug` — Begleiten: die Stunde Schritt für Schritt am iPad | `unterricht/begleiten/<slug>/` (`index.html` + `data.json` + `bilder/`) | `begleiten.js` / `begleiten.css`; Hülle aus `tools/begleiten/seite_vorlage.html` | `GPG8a/S01_weimar/UE13_2026-10-30_…/_render/begleiten_bauen.py` |
| `werkzeug` — Zeitkarte: Ereignisse auf einer Karte mit Zeitregler (auch Stufenregler für Werte) | `unterricht/zeitkarte/<slug>/` (`index.html` + `data.json` + `bilder/`) | `zeitkarte.js` / `zeitkarte.css`; Hülle aus `tools/zeitkarte/seite_vorlage.html` | `GPG8a/S01_weimar/UE14-15_2026-11-10_krisenjahr-1923/_render/seite_bauen.py` (`zeitkarte_bauen`) |
| `werkzeug` — Quiz: Fragen zum Üben zu Hause (Mehrfachwahl, „stimmt / stimmt nicht“; Runden zu zehn, je Stunde, „Falsche noch einmal“) | `unterricht/quiz/<slug>/` (`index.html` + `data.json`) | `quiz.js` / `quiz.css`; Hülle aus `unterricht/quiz/arbeit/index.html`; `data.json` nur vom Bauskript aus einem Fragen-Pool | `WiB6b/S01_arbeit/quiz/quiz_bauen.py` (aus `pool.tsv`, geprüft mit `quiz_pruefen.py`) |
| `werkzeug` — Fälle: ein ausgedachter Fall zum Üben zu Hause (Zeilen zuordnen, Antwort wählen, Position beurteilen) | `unterricht/faelle/<slug>/` (`index.html` + `data.json`) | `faelle.js` / `faelle.css`; Hülle aus `unterricht/faelle/arbeit/index.html`; `data.json` nur vom Bauskript aus den Fall-Dateien | `WiB6b/S01_arbeit/faelle/faelle_bauen.py` (aus `F0n_*.json`, geprüft mit `faelle_pruefen.py`) |
| `werkzeug` — Folien: die Folien einer Stunde als Webseite für den Beamer (Pfeiltasten, Aufdecken, Tippfeld, F = Vollbild, N = Notiz), wo das Gerät der Lehrkraft nicht an den Beamer geht | `unterricht/folien/<slug>/` (`index.html` + `data.json`) | `folien.js` / `folien.css`; Hülle aus `tools/folien/seite_vorlage.html`; `data.json` nur vom Bauskript der Stunde | `Inf6b/S02_datenspuren/UE05_2026-11-13_…/_render/folien_bauen.py` |
| `escape-game` | `unterricht/escape-games/<id>/` | `escape-engine.js` | Generator-Repo, dann `RUNBUCH.md` L3 |
| `anleitung` · `recherche` · `werkzeug` (Einzelseite) | `unterricht/<fach>/<slug>.html` oder `unterricht/<slug>/` | Site-Kette `fonts → tokens → wg` | `unterricht/gpg/wochenrueckblick.html`, `unterricht/smv/` |

**Slug-Regel** — die Adresse ist öffentlich und bleibt für immer (QR-Codes):

- ✅ `quellen/kampf-1919/` · `ordnen/eigener-staat/` — Thema, Kleinbuchstaben, Bindestriche
- ❌ `quellen/gpg8a-1310/` — Kurs und Datum gehören nicht in die Adresse (ablesbarer Stundenplan)
- ❌ `datenspuren/mueller/` — nie ein Name; bei Fällen nur die Nummer

Neues JS/CSS: **sofort** Eintrag in `assets/versions.json` + `?v=`-Token im HTML (`CLAUDE.md` Regel 3).

**Begleiten und Zeitkarte zusammen (seit 2026-11-09, Vorbild GPG8a Krisenjahr 1923):** Eine Begleiten-Seite bettet die Zeitkarte
über `einbettung: {src, hoehe, titel}` in ein Material ein (ein Werkzeug je Bereich, nicht je Material). Weitere Begleiten-Felder:
`plakat.oben` (Bild vor dem Text), Schritt-Typ `rolle` (Zufallsrolle je Gerät, sichtbar erst mit `code`; `?rolle=<id>` setzt sie fest),
`reiter: false` (nie Reiter), `code_nach_seite` / `code_label` / `weiter_label` (Codefeld nur unter einer Seite, dezent).
Zeitkarte: `?start=JJJJ-MM-TT`, `?orte=alle` (alle Orte grau, für den Beamer), `?ansicht=werte` (Stufenregler). Beschreibung der
Felder jeweils im Kopf von `begleiten.js` und `zeitkarte.js`. Nach dem Push die echte Adresse durchklicken (Einbettung lädt? Code
öffnet?), nicht nur die lokale Vorschau: Am 09.11. blieb eine Einbettung mit `loading=lazy` nur live leer.

**Die Hülle (`index.html`) immer von einer bestehenden Seite desselben Werkzeugs kopieren** (Quellen:
`quellen/raete-parlament/index.html`, Anordnen: `ordnen/kaiserreich/index.html`; Datenspuren erzeugt der
Generator aus `tools/datenspuren/seite_vorlage.html`, Begleiten aus `tools/begleiten/seite_vorlage.html`), nur `<title>` ersetzen. Die Hülle lädt
`../../assets/css/material.css` vor dem Werkzeug-CSS — das ist die gemeinsame Gestaltung „Blatt" aller
Materialseiten. ❌ Eine selbst geschriebene Hülle (wie früher in `staat_bauen.py`) verliert sie;
`make check` blockt das (B6). Gestaltung nie pro Seite: keine `<style>`-Blöcke mit Farben, keine eigenen Knöpfe.

**Wortlaut für den KI-Hinweis** (`ki_hinweis` in `data.json`): Der Knopf heißt „Mit KI verstehen" —
✅ „Bei jeder Quelle kannst du auf „Mit KI verstehen" tippen …" (ältere Texte mit ✨ übersetzt das Werkzeug
beim Anzeigen). Erklärsätze der Lehrkraft (`{"eigen": …}`) brauchen kein Etikett; das Werkzeug setzt sie
sichtbar anders als den Wortlaut.

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

## Klassenbereich: ein Kurs hinter dem Klassenpasswort (seit 14.11.2026)

Einzige Anleitung zur Pflege der Kursseiten (Warum und Entscheide der Lehrkraft: `specs/2026-11-14-klassenbereich-design.md`).
Ein Kurs mit Klassenbereich hat statt der öffentlichen Kursseite eine verschlüsselte unter `https://weitergehts.online/unterricht/k/<kurs>/`
(**Kleinschreibung**: `k/gpg9a`, nicht `k/GPG9a`, sonst 404). Heute: GPG 9a, GPG 8a, WiB 6b.

| Seite | Adresse | Inhalt |
|---|---|---|
| Kursseite | `k/<kurs>/` | Jahresleiste (aus dem Jahresplan), darunter die Stunden der gewählten Sequenz |
| Stundenseite | `k/<kurs>/<sequenz>/<ue>/` | **Heft** (Heftseite mit dem echten, ausgefüllten Einkleber), **Erarbeitung** (iPad-Seite links, Blatt rechts, Zeitkarte oben), **Folien**; in der Stunde, der ein Pool zugeordnet ist, zuerst **Üben** (Quiz) |
| Kommende Stunde | wie Stundenseite | die **nächste** Stunde einer Sequenz, sobald ihr Ordner eine `PLANUNG.md` hat: nur **Folien** (und **Üben**, wenn ihr der Pool gehört); Heft und Blätter erst, wenn sie gehalten ist, damit keine Lösung vorab sichtbar ist |
| Probenseite | `k/<kurs>/<sequenz>/<probe>/` | **Antwortsätze**, „Mit KI für die Probe üben“, ein Link zum Quiz in der Übungsstunde (liegt der Pool auf keiner Stunde, steht das Quiz hier als Reiter **Üben**) |

**Wo was liegt:** Generator `tools/kurse/klassenbereich.py` (`make klassenbereich K=<kurs>`) · Auswahl je Kurs, nur Ausnahmen,
nie Inhalte: `tools/kurse/klassenbereich/<kurs>.json` (Felder: Spec § 5) · Bedienung im Browser `unterricht/k/klassenbereich.{js,css}`
(nach Änderung `python3 tools/website/bump-assets.py --set <datei> <version>`) · Einkleber ohne Lösungsbild nachbauen:
`tools/kurse/klassenbereich/einkleber_fuellen.py` · Texterkennung für die Markierung im Quiz: `tools/kurse/klassenbereich/texterkennung.swift`
· Passwort und Salz je Kurs **nur** in `~/.config/weitergehts/klassenbereich.json` (anzeigen: `python3 tools/kurse/klassenbereich.py <kurs> --passwort`)
· Leser für Jahres- und Sequenzplan aus der Matrixe, nur lesend: `/Users/paulad/die-matrixe/werkzeuge/oberflaeche.py` · Inhalte: die Welt
`/Users/paulad/Schule_2026-27/Unterrichtsplanung26_27/welt/<Kurs>/`. Zwischenspeicher (Einkleber, Texterkennung): `~/.cache/weitergehts/`.

**Arbeitsbaum:** wie Schritt 0, z. B. `/Users/paulad/weitergehts.online/_wt-gpg9a-kursseite`. Andere Sessions schreiben auch auf `main`:
vor jedem Bau `git fetch -q origin && git rebase origin/main`. Konflikte in `assets/versions.json` lösen, indem beide Zeilen bleiben;
danach `make kurse`.

**Einen Kurs anschließen (einmal):**
1. Auswahl-Datei anlegen, nur mit dem Nötigen: `tools/kurse/klassenbereich/<kurs>.json`
   `{"kurs": "<kurs>", "welt": "/Users/paulad/Schule_2026-27/Unterrichtsplanung26_27/welt/<Kurs>", "ausblenden": ["s00"], "stunden": {}}`
2. In `unterricht/kurse.json` beim Kurs `"klassenbereich": true` setzen (dann schreibt `make kurse` die öffentliche Kursseite nicht mehr).
3. Bauen: `make klassenbereich K=<kurs>`. Beim ersten Mal legt das ein Klassenpasswort an; die Lehrkraft kann es ersetzen.
4. Ansehen (lokal, Desktop und Handy): jede Stunde öffnen, Heft · Erarbeitung · Folien. Was die Ableitung falsch wählt, als Ausnahme
   in die Auswahl-Datei, nie im Generator für einen Kurs.
5. `make kurse`, `make check`, Commit, **Push nur nach Freigabe der Lehrkraft**.
6. Im Werkzeugkasten `themes/regeln/GPG.json` → `kursseite.kurse` den Kurs ergänzen: dann verlangt der Folienbau Code und Link
   der Kursseite auf der letzten Folie (CHANGELOG 172; Folien mit Website-Werkzeug brauchen ohnehin Code und Link).

**Nach jeder Stunde (seit 18.11.2026 im Planungsweg, ohne LLM-Arbeit):** Die Session der Nachbereitung ruft nach der Auswertung
`make kursseite K=<kurs>` auf (mehrere Kurse: `K="gpg8a gpg9a"`), aus jedem Checkout des Website-Repos. Der Befehl
(`tools/kurse/nachfuehren.py`) setzt den festen Arbeitsbaum `../_wt-kursseite` auf `origin/main` zurück, baut den Klassenbereich,
dann `make kurse` und `make check`, und berichtet in Worten der Stunde (neu, geändert, entfernt, nur die Stundenleiste), dann
hält er an. Vor dem Ja ansehen, wo es um Neues geht: `preview_start` `kursseite-wt` (Port 8093,
`welt/GPG9a/.claude/launch.json`; das Passwort nur in die lokale Vorschau tippen). Den Bericht der Lehrkraft vorlegen; nach ihrem Ja `make kursseite K=<kurs> JA="<Wortlaut des Ja>"`: Commit mit dem
Wortlaut und Push, aber nur, wenn `origin/main` sich seit dem Bericht nicht bewegt hat, der Stand Byte für Byte der berichtete ist
und sich nur Seiten der Kurse ändern. Ein Sammel-Ja deckt reine Nachführungen (Entscheid der Lehrkraft 18.11.2026); ein neues
Werkzeug oder eine neue Seitenart kommt über einen eigenen Zweig mit eigenem Ja, nie über diesen Befehl. Im Arbeitsbaum
`_wt-kursseite` nie von Hand arbeiten. Nach dem Push: Deploy abwarten (`gh run list --branch main --limit 1`) und live prüfen,
ohne das Passwort in die öffentliche Seite zu tippen: Dateien Byte für Byte vergleichen (`curl -s https://weitergehts.online/<pfad> | cmp - <pfad>`)
und eine Seite mit dem `Tresor` des Generators entschlüsseln (Spec § 7).

Eine Stunde erscheint, sobald ihr Ordner eine `NACHBEREITUNG.md` hat oder der Sequenzplan sie mit ✅ führt; Struktur, Titel und
Fragen kommen für alle Kurse aus Jahres- und Sequenzplan (GPG 9a seit 18.11.2026, vorher von Hand in `kurse.json`). Ausnahmen nur
in der Auswahl-Datei (`ausblenden`, `zeigen`, `sequenzen.<seq>.frage`, `stunden.<seq/ue>.titel|frage|blaetter|…`).

**Was liegen blieb, meldet der Sitzungsstart** (`werkzeugkasten/core/tools/kalender/session_start.py`): `KURSSEITE: GPG9a UE11
(Do 19.11.) hat eine Nachbereitung und fehlt auf der Kursseite`. Grundlage ist `unterricht/k/<kurs>/stand.json` auf `origin/main`,
den der Bau schreibt: je Seite Datum und Kennung (Hash dessen, was sie aus der Welt trägt, mit dem Kursschlüssel), dazu ausgesparte
Sequenzen und Stunden; kein Inhalt, nicht veröffentlicht (`make site` lässt ihn weg). Fehlt nichts, steht nichts.

**Wenn die Ableitung etwas falsch wählt:**

| Befund | Ursache | Abhilfe |
|---|---|---|
| Stunde fehlt | kein Ordner `UE…_<Datum>_…`, keine `NACHBEREITUNG.md`, kein ✅ (die nächste Stunde erscheint schon mit `PLANUNG.md`, nur mit Folien) | in der Welt nachholen; eine spätere Stunde vorher zeigen: `zeigen` |
| Heft leer | Lösung in unbekannter Form | `heft` setzen: `{datei, abschnitt, bis}` (Leser: Tabellen, Listen, „Antwortsatz:/Merksatz:“) |
| Einkleber-Bild fehlt | weder `einkleber_loesung.png`, `tafel_voll.png`, `hefteintrag_tafel.png` noch `LOESUNG_Einkleber*.pdf` | `heft_bild`: `{bild}`, `{pdf}` oder `{bau: [Befehl]}` (Beispiel 09.10. in `gpg9a.json`) |
| falsches Blatt oder iPad-Seite | Ausschlussliste oder Wortvergleich | `blaetter` der Stunde setzen |
| „**“ oder Zeilen über die Lösung im Heft | neue Schreibweise | im Generator lösen (`META`, `planung_kopf`), dann bauen GPG 8a und 9a gleich bis auf diese Stelle |
| Wochenrückblick soll nicht erscheinen | Entscheid der Lehrkraft | `ausblenden: ["s01/ue07"]` |

**Quiz zur Probe (Reiter „Üben“, seit 18.11.2026), datengetrieben:** Das Werkzeug ist generisch: Generator (`quiz_bauen`) und
Bedienung (`quiz()` in `klassenbereich.js`). Eine neue Probe braucht nur Daten: einen Pool als Python-Datei mit `POOL`, `BLOECKE`,
`FUNDSTELLEN` und `pruefen()` (Vorbild GPG 9a:
`/Users/paulad/Schule_2026-27/Unterrichtsplanung26_27/.b/entwurf/GPG9a/S01_geteiltes-land/UE12-13_2026-11-20_probe/pool/pool.py`)
und in der Auswahl die Zeile `"uebung_pool": {"<sequenz>": {"pool": "<pfad>/pool.py", "stunde": "<ue der Übungsstunde>"}}`
(GPG 9a: `"stunde": "ue11"`, Adresse `k/gpg9a/s01/ue11/#ueben`). Das Quiz liegt dann in der Stunde, in der damit geübt wird;
die Probenseite verlinkt dorthin. Hat diese Stunde noch keinen Ordner mit `PLANUNG.md`, meldet der Bau einen HINWEIS und legt
das Quiz auf die Probenseite. Ohne `stunde` (nur der Pfad) liegt das Quiz auf der Probenseite: so stand es bis 18.11. für GPG 9a,
und die Lehrkraft rügte es („liegt aber in der falschen UE, also im slot am 20.11. statt am slot für 19.11.“). QR-Code und Folie
der Übungsstunde zeigen auf die Adresse der Stunde. Ein Passwort für alles: das der Kursseite. Das Quiz liegt im Klassenbereich und nicht
öffentlich wie `ordnen/` oder `quellen/`, weil es die Einkleber (Bilder nur für die Klasse) einblendet.
- `FUNDSTELLEN[nr]`: Liste `(Stunde, Reihe, Spalte | None)` im Wortlaut des Einklebers. `"Antwortsatz"` meint den Satz unter dem Einkleber,
  `"Karte"` ein Blatt in der Mappe, eine leere Liste steht für Vertiefung. Der Bau findet jede Stelle (Texterkennung, sonst Tabellenzeile)
  oder bricht ab.
- Richtig/falsch, Ankreuzen, Ordnen und Sortieren werden angetippt, das Quiz prüft selbst. Das Bauprotokoll nennt je Frage die Lösung:
  gegen den Pool lesen. Am 18.11. war 8.2 vertauscht, seither ordnet der Bau über Wortstämme. Alles andere ist Freitext: eigene Antwort,
  Vergleichen, Abhaken.
- `BILDER[nr] = (absoluter Pfad, Lizenzklasse)` (optional): ein kleines Bild über der Frage als Setting und Stütze, nie als
  Lösungshinweis, verschlüsselt wie die Einkleber (darum auch § 60a, Spec Nr. 5); Nachweis im Fuß der Frage aus Urheber
  (`bilder/HERKUNFT.md` neben dem Bild) und Lizenzklasse. Fehlt ein Bild, bricht der Bau ab.
- Markierungen vor dem Deploy ansehen: `python3 tools/kurse/klassenbereich/markierung_pruefen.py <kurs> <sequenz>/<probe> <ziel>`.

**Lernbegleiter (KI):** Die Knöpfe öffnen duck.ai und kopieren die Aufforderung zugleich. Mit Pool fragt „Mit KI lernen“ die Fragen
der Stunde ab, „Mit KI für die Probe üben“ alle; im Quiz prüft „Mit KI über meine Antwort sprechen“ die eigene Antwort an der
Erwartung (Tipps statt Musterlösung). Regeln: `REGELN`, `WIE`, `QUIZ_REGELN` im Generator. Grenze: sehr lange Aufforderungen
(Probenseite etwa 19 000 Zeichen) kann die Adresse abschneiden; dann fügt das Kind den kopierten Text ein.

**Grenzen:** ❌ Inhalte (Hefteinträge, Fragen, Lösungen) in die Auswahl-Datei oder sonst unverschlüsselt ins Repo (B5c prüft
`k/<kurs>/`); ❌ Passwort ins Repo, in Commits oder in Chat-Zusammenfassungen; ❌ `unterricht/k/<kurs>/` von Hand ändern;
❌ das Passwort zum Testen in die öffentliche Seite tippen; ❌ LibreOffice neben einer anderen Session starten (der Einkleber-Bau
läuft unter `/usr/bin/lockf` mit `/Users/paulad/werkzeugkasten/out/.lauf.lock`).

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
