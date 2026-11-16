# Klassenbereich: die Kursseite für Schülerinnen und Schüler (Spec, 14.11.2026)

> **Für wen:** jede Session, die einen Kurs als Klassenbereich anschließt, fortschreibt oder das Werkzeug ändert.
> **Was hier steht:** Zweck, Entscheide der Lehrkraft, Aufbau, woher jedes Datum kommt, was die Auswahl-Datei überschreiben
> darf, Prüfungen, Grenzen. **Wie man einen Kurs anschließt:** `../VEROEFFENTLICHEN.md` § Klassenbereich.
> Werkzeug: `tools/kurse/klassenbereich.py` · Auswahl je Kurs: `tools/kurse/klassenbereich/<kurs>.json` ·
> Seite im Browser: `unterricht/k/klassenbereich.{js,css}` · live: `https://weitergehts.online/unterricht/k/<kurs>/`
> Vorgänger: `2026-10-15-kursseiten-design.md` (öffentliche Kursseite nach Thema; gilt weiter für Kurse ohne Klassenbereich).

## 1 Zweck

Eine Schülerin oder ein Schüler soll den Verlauf des Kurses nachverfolgen und für eine Probe lernen können: je Stunde die
Stundenfrage, der Hefteintrag (der echte Einkleber, ausgefüllt), die Blätter und die iPad-Seiten der Stunde, die Folien; dazu
der Überblick über das Jahr und was als Nächstes kommt.

## 2 Entscheide der Lehrkraft (14.11.2026, in dieser Reihenfolge gefallen)

1. Erst Geschichtsstunden; Wochenrückblick-Stunden werden ausgespart (`ausblenden`).
2. Antwortsätze werden einfach gezeigt, ohne Vermerk, auch wenn sie in der Stunde nicht geschrieben wurden.
3. Kein Abdecken zum Selbsttest, sondern ein Lernbegleiter (KI-Knopf, duck.ai); als eigene Funktion später neu zu konzipieren.
4. Die Blätter, die die Klasse in der Stunde hatte, erscheinen auf der Stundenseite.
5. Bilder bleiben drin, auch Schulbuchbilder: Darum ist der Klassenbereich **verschlüsselt** und nur mit Klassenpasswort
   lesbar (§ 60a UrhG, Gesamtvertrag Schulbücher: nur für die Klasse). Bildnachweise stehen zugeklappt unten (§ 63 UrhG).
6. Designsprache und Ebenen wie die Ansicht Kurs der Matrixe, aber für Kinder vereinfacht: nichts, was nur die Lehrkraft
   braucht (Zeiträume auf den Tag, Phasen, Stundennummern, Legenden, Status-Wörter).
7. Ebene 1 (Jahr) und Ebene 3 (Stunde) sind eigene Seiten; Ebene 2 (die Stunden einer Sequenz) vermittelt dazwischen.
8. Der Hefteintrag ist eine Heftseite: Karopapier, Datum und Stundenfrage von Hand, der ausgefüllte Einkleber, der Antwortsatz
   von Hand.
9. Erarbeitung: iPad-Seite links, das zugehörige Blatt rechts; Einkleber-Vorlagen stehen dort nicht; Zeitkarten der Stunde
   stehen oben als Einstieg.
10. Jahresleiste lesbar (volle Namen, Monate) und seitlich scrollbar.
11. Folien, die ein Werkzeug der Website zeigen, tragen Code und Link; die letzte Folie zeigt auf die Kursseite (Werkzeugkasten
    CHANGELOG 172, Regeln `website_folie_qr_link` und `kursseite_letzte_folie` in `themes/regeln/GPG.json`).

## 3 Aufbau

| Seite | Adresse | Inhalt |
|---|---|---|
| Kursseite „Unser Jahr“ | `k/<kurs>/` | Jahresleiste (Sequenzen so breit wie ihre geplanten Stunden; jetzt = dicker Rahmen, vorbei = grau mit ✓, geplant = gestrichelt, Probe = Strich), Trichter, darunter die Stunden der gewählten Sequenz (Standard: die laufende; antippen wechselt, `#s01` merkt die Wahl) |
| Stundenseite | `k/<kurs>/<sequenz>/<ue>/` | oben „‹ Unser Jahr“ und die Stunden klein mit ‹ ›; Datum, Titel, Stundenfrage; Reiter **Heft** · **Erarbeitung** · **Folien**; Bildnachweise zugeklappt |
| Probenseite | `k/<kurs>/<sequenz>/<probe>/` | alle Stundenfragen der Sequenz mit Antwortsatz, Knopf „Mit KI für die Probe üben“ |

Formen (aus `die-matrixe/oberflaeche/stil.css`): hell, Systemschrift, Haarlinien, Ecken 3–4 px; Farbe nur im Heft (Füllerblau,
rote Unterstreichung; Blau/Rot für West/Ost bringen die Einkleber selbst mit). Handschrift: Caveat (`assets/fonts/`, OFL).

## 4 Woher jedes Datum kommt (Ableitung aus der Welt)

Nichts wird von Hand in die Website übertragen; der Generator liest die Welt bei jedem Bau.

| Was | Quelle | Regel |
|---|---|---|
| Sequenzen, Zeitraum, Probe, Umfang | `welt/<Kurs>/JAHRESPLAN.md` | Leser der Matrixe `jahresplan_sequenzen` (nur lesend importiert aus `die-matrixe/werkzeuge/oberflaeche.py`) |
| Stunden einer Sequenz | `S??_*/SEQUENZPLAN.md` + Stundenordner `UE*_JJJJ-MM-TT_*` | Leser `sequenzplan_zeilen`; Nummer aus dem Ordnernamen; **gehalten** = ✅ im Plan oder `NACHBEREITUNG.md` im Ordner; Zeilen ohne Ordner, Nummer und Frage (Wandertag, Praktikum, Ausblick) entfallen; Probe = Leistungsnachweis im Plan oder Probedatum des Jahresplans |
| Titel, Stundenfrage | Kopf der `PLANUNG.md` (`# Stunde: … · Titel`, `Stundenfrage: …`) | sonst Thema und Frage aus dem Sequenzplan |
| Hefteintrag (Text, Antwortsatz, KI) | `LOESUNG_Einkleber*.md`; bei zwei Einklebern `LOESUNG_Hefteintrag*.md`; sonst `PLANUNG.md` § Sicherung | Tabellen und „**Antwortsatz …:**“ werden gelesen |
| Einkleber (Bild) | `bilder/einkleber_loesung.png`, sonst `LOESUNG_Einkleber*.pdf` | weißer Rand abgeschnitten; ohne beides: das Raster von Hand aus dem Text |
| Blätter | `drucken/*.pdf` | ohne Einkleber, Heft-Vordrucke, Kollegin, Wochenrückblick, Vortrag, Namensschild, Notfall-Ersatz, Leistungsnachweis, Graufassung (`AUSSCHLUSS_BLAETTER`); Titel = Überschrift unter „Name:“ auf Seite 1 |
| iPad-Seite zum Blatt | `unterricht/kurse.json` (Material des Kurses mit `stunde` oder gleichem `datum`) | Zuordnung über das unterscheidende Wort der Adresse (west/ost, anna/emma); ein einziges Arbeitsblatt bekommt das einzige Werkzeug |
| Zeitkarte | Material mit Pfad `zeitkarte/…` | oben in der Erarbeitung |
| Folien | `folien.pdf`, sonst `JJJJ-MM-TT_*.pdf` im Stundenordner | `folien_ohne` blendet einzelne Folien aus |
| Bildnachweise | `bilder/HERKUNFT.md` | Motiv · Urheber · Quelle |

Trägt `unterricht/kurse.json` für den Kurs `sequenzen`, gilt diese Struktur statt der Ableitung (GPG 9a, von Hand seit 13.11.).

## 5 Die Auswahl-Datei `tools/kurse/klassenbereich/<kurs>.json`

Pflicht: `kurs`, `welt`. Alles andere sind Ausnahmen; die Datei enthält nur Pfade und Wörter, nie Inhalte (das Repo ist öffentlich).

| Feld | Wirkung |
|---|---|
| `ausblenden` | Sequenzen (`"s00"`) oder Stunden (`"s01/ue07"`), die nicht erscheinen |
| `sequenzen.<id>.ordner` / `.frage` | Ordner oder Leitfrage einer Sequenz, wenn die Ableitung sie nicht findet |
| `stunden.<seq/ue>` | überschreibt Feld für Feld, was `stunde_auto` ableitet: `ordner`, `heft` (Liste `{datei, abschnitt?, bis?, nur_satz?, umklappen?, saetze?}`), `heft_bild` (`{bild}` · `{pdf}` · `{bau: [Befehl], …}`), `antwort_im_einkleber`, `hinweis`, `blaetter` (`{datei, titel, art, zu: [Material-ids]}`), `folien`, `folien_ohne` |

**Weitere Felder (WiB6b, 16.11.2026; ändern nichts für Kurse, die sie nicht setzen, belegt: GPG 8a und 9a bauen byte-gleich):**
`zeigen` (Liste wie `["s01/ue08"]`): die aktuelle, noch nicht gehaltene Stunde erscheint schon, ohne ✓ (Klasse `heute`); sonst erscheint eine Stunde erst mit ✅ oder `NACHBEREITUNG.md`.
Je Stunde: `heft: [{"werkauftrag": "ue0n.werkauftrag.json"}]` liest den Hefteintrag aus der Hefteintrag-Folie des Deck-Auftrags (Stichpunkte, Merksatz; für Kurse ohne Einkleber, nur auf Anforderung); `ohne_heft: true` lässt den Reiter „Heft“ weg und nimmt die Stunde aus „Für die Probe lernen“; `uebung: [<Material-id>, …]` macht die Stunde zur Übungsstunde: ein Reiter je Werkzeug-Seite (Quiz, Fälle), direkt eingebettet bedienbar, dazu die Folien; kein Heft, keine Erarbeitung, nicht in der Probenliste.

Beispiel für einen Bau-Befehl: der Einkleber vom 09.10. (GPG 9a) hat kein Lösungsbild; `einkleber_fuellen.py` setzt ihn mit dem
Werkzeug der Stunde und der Lösung neu (`{ordner}` = Stundenordner, das Ziel hängt der Generator an).

## 6 Verschlüsselung

AES-256-GCM; Schlüssel aus dem Klassenpasswort mit PBKDF2-SHA256 (600 000 Runden, Salz je Kurs). IV = HMAC des Klartexts
(gleicher Inhalt → gleiches Chiffrat, kein Git-Rauschen). Seiten tragen ihren Inhalt als Chiffrat in `<script id="kb-inhalt">`,
Bilder und PDFs liegen als `dateien/<hash>.bin`. Der Browser leitet den Schlüssel einmal ab und merkt ihn im `localStorage`
(„Abmelden“ löscht ihn). Passwort und Salz liegen nur in `~/.config/weitergehts/klassenbereich.json` (Rechte 600).
Passwort wechseln: dort eintragen, `make klassenbereich K=<kurs>`, pushen (alle Dateien werden neu verschlüsselt).
Grenze: ein Passwort aus Wörtern lässt sich offline mit Aufwand erraten; für Unterrichtsmaterial vertretbar, zum Schuljahresende
oder nach Weitergabe wechseln.

## 7 Prüfungen

- `make check` B5c (`klassenbereich.py --check`, ohne Schlüssel, läuft auch in CI): jede erwartete Seite liegt da, trägt die
  Marke und nur Chiffrat; keine Klartext-Datei unter `k/<kurs>/`; ein Kurs mit Auswahl-Datei trägt `"klassenbereich": true`.
- Bau zweimal hintereinander: der zweite schreibt nichts (Reproduzierbarkeit).
- Nach dem Deploy: Dateien live gegen lokal (Byte-Vergleich) und eine Seite live entschlüsseln (Python, `Tresor`), statt das
  Passwort in die öffentliche Seite zu tippen.

## 8 Offen

- Lernbegleiter als eigene Funktion (Probe-Training über die Sequenz, Fortschritt), nicht nur ein Knopf.
- WiB6b angeschlossen (16.11.2026, Entscheid der Lehrkraft). Inf6b, E5: Ableitung prüfen, je Kurs mit Entscheid der Lehrkraft.
- **Offener Fehler (nicht behoben):** `.paar { display: grid }` in `klassenbereich.css` überstimmt `hidden`; die Blattwahl blendet ein zweites Blatt deshalb nicht aus. Behebung (`.paar[hidden] { display: none }`) braucht neue CSS-Version und Neubau aller Kurse, eigener Schritt.
- Blatt der Kollegin (GPG 9a, 01.10.): nur mit ihrem Okay.
