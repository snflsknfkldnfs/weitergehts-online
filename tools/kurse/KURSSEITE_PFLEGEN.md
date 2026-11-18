# Kursseite pflegen (Klassenbereich) — Anleitung für jede Session

> Für eine Session, die die Kursseite eines Kurses fortschreibt, einen Kurs anschließt oder das Quiz zur Probe baut.
> Warum und was die Lehrkraft entschieden hat: `docs/website/specs/2026-11-14-klassenbereich-design.md`.
> Kurz-Rezept: `docs/website/VEROEFFENTLICHEN.md` § Klassenbereich. Stand 18.11.2026.

## 1 Was es ist

Je Kurs ein **verschlüsselter Klassenbereich** unter `https://weitergehts.online/unterricht/k/<kurs>/`. Die Adresse wird klein
geschrieben: `k/gpg9a`, nicht `k/GPG9a`. GitHub Pages unterscheidet Groß und Klein, sonst kommt ein 404.

| Seite | Adresse | Inhalt |
|---|---|---|
| Kursseite | `k/<kurs>/` | Jahresleiste (aus dem Jahresplan), darunter die Stunden der gewählten Sequenz |
| Stundenseite | `k/<kurs>/<sequenz>/<ue>/` | Reiter **Heft** (Heftseite mit dem echten, ausgefüllten Einkleber), **Erarbeitung** (iPad-Seite links, Blatt rechts, Zeitkarte oben), **Folien** |
| Probenseite | `k/<kurs>/<sequenz>/<probe>/` | Reiter **Üben** (Quiz aus dem Pool der Probe) und **Antwortsätze**, Knopf „Mit KI für die Probe üben“ |

Heute angeschlossen: GPG 9a, GPG 8a, WiB 6b. Kurse ohne Klassenbereich bekommen von `make kurse` die öffentliche Kursseite nach Thema.

## 2 Wo was liegt

| Was | Wo |
|---|---|
| Generator | `tools/kurse/klassenbereich.py` (`python3 tools/kurse/klassenbereich.py <kurs>` = `make klassenbereich K=<kurs>`) |
| Auswahl je Kurs (nur Ausnahmen, nie Inhalte) | `tools/kurse/klassenbereich/<kurs>.json` (Felder in der Spec § 5) |
| Liste aller Materialseiten und Kurse | `unterricht/kurse.json` (GPG 9a trägt dort auch `sequenzen`) |
| Entschlüsseln und Bedienen im Browser | `unterricht/k/klassenbereich.js`, `unterricht/k/klassenbereich.css` (nach Änderung `python3 tools/website/bump-assets.py --set <datei> <version>`) |
| Einkleber ohne Lösungsbild nachbauen | `tools/kurse/klassenbereich/einkleber_fuellen.py` (Ergebnis im Zwischenspeicher `~/.cache/weitergehts/einkleber/`) |
| Markierung im Quiz (Texterkennung macOS Vision) | `tools/kurse/klassenbereich/texterkennung.swift` (Zwischenspeicher `~/.cache/weitergehts/texterkennung/`) |
| Passwort und Salz je Kurs | `~/.config/weitergehts/klassenbereich.json`, **nur dort**; anzeigen: `python3 tools/kurse/klassenbereich.py <kurs> --passwort` |
| Leser für Jahresplan und Sequenzplan | aus der Matrixe nur lesend importiert: `/Users/paulad/die-matrixe/werkzeuge/oberflaeche.py` |
| Die Welt (Quelle aller Inhalte) | `/Users/paulad/Schule_2026-27/Unterrichtsplanung26_27/welt/<Kurs>/` |

## 3 Arbeitsbaum

Nie im Hauptcheckout arbeiten. Den bestehenden Arbeitsbaum nehmen oder einen neuen anlegen:

```bash
cd /Users/paulad/weitergehts.online/_wt-gpg9a-kursseite && git fetch -q origin && git status --short && git rebase origin/main
```

Andere Sessions schreiben auch auf `main` (WiB-Werkzeuge, Arbeitskreis). Darum vor jedem Bau erst `git rebase origin/main`.
Gibt es Konflikte in `assets/versions.json`, behalten beide Seiten ihre Zeilen. Danach `make kurse`.

## 4 Nach jeder Stunde (der Normalfall)

1. In der Welt muss die Stunde ihren Ordner `UE<nr>_<JJJJ-MM-TT>_<slug>/` haben, mit `NACHBEREITUNG.md` (erst dann gilt sie
   als gehalten) oder mit ✅ im Sequenzplan.
2. Nur bei GPG 9a: In `unterricht/kurse.json` → `sequenzen.gpg9a` die Stunde eintragen bzw. `"kommt": true` streichen. Die
   übrigen Kurse leiten ihre Struktur aus dem Sequenzplan ab.
3. Bauen und prüfen:
   ```bash
   make klassenbereich K=<kurs>
   make kurse
   make check
   ```
   Ein zweiter Bau muss nichts mehr schreiben.
4. Im Browser ansehen, die Vorschau läuft mit `preview_start` `kursseite-wt` (Port 8093, aus `welt/GPG9a/.claude/launch.json`):
   die neue Stunde mit Heft, Erarbeitung und Folien, am Desktop und in Handybreite. Das Passwort tippst du nur in die
   lokale Vorschau, nie in die öffentliche Seite.
5. Commit: Pfade ausdrücklich stagen, auch `unterricht/k/<kurs>/dateien` mit `git add -A`, damit gelöschte Dateien mitgehen.
6. **Push nur nach dem Ja der Lehrkraft:** `git push origin HEAD:main`. Den Deploy abwarten (`gh run list --branch main --limit 1`).
7. Live prüfen, ohne das Passwort in die öffentliche Seite zu tippen:
   - die Dateien Byte für Byte gegen den lokalen Stand vergleichen (`curl -s https://weitergehts.online/<pfad> | cmp - <pfad>`);
   - eine Seite mit dem `Tresor` des Generators entschlüsseln (Python, Beispiel in der Spec § 7).

## 5 Wenn etwas fehlt oder falsch ist (Ableitung prüfen, dann Ausnahme)

| Befund | Ursache | Abhilfe |
|---|---|---|
| Stunde fehlt | kein Ordner `UE…_<Datum>_…`, keine `NACHBEREITUNG.md`, kein ✅ | in der Welt nachholen; für eine Stunde, die angezeigt werden soll, bevor sie gehalten ist: `zeigen` |
| Heft leer | Lösung hat ein unbekanntes Format | `heft` in der Auswahl setzen: `{datei, abschnitt, bis}`; Leser `heft_teile` liest Tabellen, Listen und „Antwortsatz:/Merksatz:“ |
| Einkleber-Bild fehlt | weder `bilder/einkleber_loesung.png` noch `tafel_voll.png`, `hefteintrag_tafel.png`, `LOESUNG_Einkleber*.pdf` | `heft_bild` setzen: `{bild}`, `{pdf}` oder `{bau: [Befehl]}` (Beispiel 09.10. in `gpg9a.json`) |
| falsches Blatt oder falsche iPad-Seite | Ausschlussliste oder Wortvergleich | `blaetter` der Stunde in der Auswahl setzen |
| „**“ oder Meta-Zeilen im Heft | neue Schreibweise in der Lösung | im Generator lösen (`META`, `planung_kopf`), nicht in der Auswahl |
| Wochenrückblick soll nicht erscheinen | Entscheid der Lehrkraft | `ausblenden: ["s01/ue07"]` |

Grundsatz: Was für einen Kurs gilt, gehört in seine Auswahl-Datei, was für alle gilt, in den Generator. Danach müssen GPG 8a
und 9a mit derselben Prüfsumme bauen wie vorher, außer an der beabsichtigten Stelle.

## 6 Quiz zur Probe (Reiter „Üben“)

- **Quelle:** der Fragen-Pool der Probe als Python-Datei mit `POOL`, `BLOECKE`, `FUNDSTELLEN` und `pruefen()`. Eingetragen ist er in
  der Auswahl als `"uebung_pool": {"s01": "<pfad>/pool.py"}`. GPG 9a nimmt
  `/Users/paulad/Schule_2026-27/Unterrichtsplanung26_27/.b/entwurf/GPG9a/S01_geteiltes-land/UE12-13_2026-11-20_probe/pool/pool.py`.
- **`FUNDSTELLEN[nr]`:** eine Liste aus `(Stunde, Reihe, Spalte | None)`, Reihe und Spalte im Wortlaut des Einklebers.
  `"Antwortsatz"` meint den Satz unter dem Einkleber, `"Karte"` ein Blatt in der Mappe, eine leere Liste steht für Vertiefung.
  Der Bau sucht jede Stelle (Texterkennung im Einkleber-Bild, sonst die Zeile der Tabelle) und **bricht ab**, wenn er eine nicht findet.
- **Formen:** Richtig/falsch, Ankreuzen, Ordnen und Sortieren tippt das Kind an; das Quiz prüft dann selbst. Das Bauprotokoll
  schreibt je Frage `Quiz <nr> (<form>): <Lösung>` – das gegen die Erwartung im Pool lesen. Ein Fehler am 18.11. war eine vertauschte
  Zuordnung bei 8.2; darum ordnet `_zuordnen` jetzt über Wortstämme und global beste Paare. Alles andere ist Freitext:
  eigene Antwort, „Vergleichen“, abhaken, dazu „Mit KI über meine Antwort sprechen“.
- **Markierung prüfen:** jede Fundstelle als Bild mit Rahmen ausgeben und ansehen (`python3 tools/kurse/klassenbereich/markierung_pruefen.py <kurs> s01/probe1 <ziel>`; Stand und Befunde der
  Bau-Session, `/Users/paulad/Schule_2026-27/Unterrichtsplanung26_27/.b/entwurf/GPG9a/S01_geteiltes-land/UE12-13_2026-11-20_probe/pool/QUIZ_AUFTRAG.md`).

## 7 Lernbegleiter (KI)

Die Knöpfe öffnen duck.ai mit einer vorbereiteten Aufforderung und kopieren sie zugleich. Ist ein Pool eingetragen, fragt
„Mit KI lernen“ auf der Stundenseite die Pool-Fragen dieser Stunde ab, „Mit KI für die Probe üben“ auf der Probenseite alle.
Im Quiz prüft „Mit KI über meine Antwort sprechen“ die eigene Antwort an der Erwartung und gibt Tipps statt einer
Musterlösung. Die Regeln dafür stehen in `REGELN`, `WIE` und `QUIZ_REGELN` im Generator.
Grenze: Lange Aufforderungen (Probenseite etwa 19 000 Zeichen) können in der Adresse abgeschnitten werden; dann fügt das Kind
den kopierten Text ein.

## 8 Fallstricke

- ❌ Inhalte (Hefteinträge, Fragen, Lösungen) oder das Passwort unverschlüsselt ins Repo, in Commits oder in den Chat.
  Das Repo ist öffentlich. `make check` B5c prüft, dass unter `k/<kurs>/` nur Chiffrat liegt.
- ❌ `unterricht/k/<kurs>/` von Hand ändern. Immer über den Generator.
- ❌ Das Passwort in die öffentliche Seite tippen, um zu testen. Stattdessen Byte-Vergleich und Entschlüsseln in Python (§ 4.7).
- ❌ LibreOffice parallel zu einer anderen Session starten. Der Einkleber-Bau läuft unter `/usr/bin/lockf` mit der Sperre des
  Werkzeugkastens (`/Users/paulad/werkzeugkasten/out/.lauf.lock`).
- Folien mit Website-Werkzeug brauchen Code und Link, die letzte Folie zeigt auf die Kursseite (Werkzeugkasten CHANGELOG 172).
  Ein neuer Kurs kommt in `themes/regeln/GPG.json` → `kursseite.kurse`.
- Die Zeitkarte ordnet sich eingebettet selbst an (Karte links, Ablauf rechts); am Beamer im eigenen Fenster bleibt sie wie bisher.
