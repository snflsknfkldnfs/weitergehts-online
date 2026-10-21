# Materialseiten-Design „Blatt" — Design

> Stand 2026-10-21 · Status: **Richtung von Paul entschieden**, Umsetzung auf Branch `feat/material-design`
> (Arbeitsbaum `/Users/paulad/weitergehts.online/_wt-material-design`, abgezweigt von `origin/main` 4788c22).
> Entwürfe (echte Seite „Kampf um Berlin 1919", Tablet quer): `material-design-entwuerfe/quellen_{jetzt,a,b}.png`.

## Problem

Die Materialseiten (Quellen, Anordnen, Datenspuren) laufen auf drei geteilten Werkzeugen, von denen jedes eine
eigene Gestaltung mitbringt: dreimal kopierte, schon auseinanderlaufende Farbpaletten (`--q-*`, `--o-*`, `--d-*`),
Systemschrift, farbig gefüllte Kopfzeilen, weiche Schatten, Etiketten in Versalien („ERKLÄRT:", „DARUM GEHT ES"),
Emoji-Knöpfe (✨). Es gibt keinen gemeinsamen Ort, an dem „wie sieht Material aus" entschieden ist; jede neue
Seite erbt das Aussehen ihres Werkzeugs, jedes Werkzeug driftet für sich.

## Entscheide (Paul, 2026-10-21)

1. **Richtung A „Blatt"** — Maß ist der minimalistische Wireframe der D-Matrix-Umgebung
   (`~/die-matrixe/spiel/DESIGN/GRUNDSAETZE.md` Nr. 6, `entwuerfe/pult/index.html`): grauer Grund, weiße Blätter mit
   dünner Linie und harter grauer Kante, schwarze Tinte, keine Farbflächen, Systemschrift; Serifenschrift nur für
   den Wortlaut einer Quelle. (Nicht gewählt: B „Nebel & Papier hell" mit den Website-Schriften; A mit B-Schriften.)
2. **Keine Etiketten** (Grundsatz 2): „ERKLÄRT:" entfällt. Erklärsatz und Wortlaut unterscheiden sich durch die
   Form — Wortlaut: Serif, Absatznummer; Erklärsatz der Lehrkraft: ohne Serifen, ohne Nummer, Linie links.
3. **KI-Knopf heißt „Mit KI verstehen"** (Grundsatz 1, Handlung statt Emoji), gerahmter 44-px-Knopf.

## Übertragene Grundsätze (aus D-Matrix, für Schüler-Seiten gelesen)

| D-Matrix | auf der Materialseite |
|---|---|
| 1 semantisch beschriften | Knöpfe sagen die Handlung: „Mit KI verstehen", „Prüfen", „Bild groß", „Schließen" |
| 2 keine Etiketten | keine Versal-Marken über Abschnitten; Fragen-Kasten trägt nur seinen Satz |
| 4 Fließtext meiden | unverändert Sache der Daten; das Werkzeug setzt Absätze mit Luft und Nummer |
| 6 Wireframe als Maß, heller Grund | Blatt-Optik, siehe Werte unten |
| 7 Form nie Farbe allein | Seiten einer Quelle (blau/rot): dünne Farblinie oben **und** Seitenwort im Kopf; Anordnen-Fix-Karte: Rahmen gestrichelt + Nummer, nicht nur Farbe |
| „Was quer gilt" | Grundschrift ≥ 16 px (Tablet 17), Lesetext-Kontrast ≥ 7 : 1 auf Blatt, Grund und Notiz (gemessen, WCAG-Formel), Klickflächen ≥ 44 px, Zeilenlänge ≤ 66 Zeichen, kein Hover-Zwang |

Die Lehrer-spezifischen Dinge (Korrekturrot „Deine Hand", Spuren, Lupe) gelten hier nicht.

## Werte (Single Source: `unterricht/assets/css/material.css`)

| Token | Wert | Rolle | Kontrast Weiß / Grund / Notiz |
|---|---|---|---|
| `--m-grund` | `#e6e6e6` | Seitengrund | — |
| `--m-blatt` | `#ffffff` | Blatt, Knopf | — |
| `--m-tinte` | `#141414` | Lesetext, Ränder aktiver Knöpfe | 18,4 / 14,8 / 16,2 |
| `--m-leise` | `#474747` | Nebentext, Nachweise | 9,3 / 7,4 / 8,2 |
| `--m-linie` | `#8a8a8a` | Blattrand | — |
| `--m-linie-hell` | `#c4c4c4` | Trennlinien im Blatt | — |
| `--m-kante` | `#a9a9a9` | harte Kante `5px 5px 0` | — |
| `--m-notiz` | `#f0f0f0` | Fachwort-Erklärung, Reiter-Grund | — |
| `--m-blau` | `#1b4a7a` | Seite einer Quelle (Linie + Kennung) | 9,1 / 7,3 / 8,0 |
| `--m-rot` | `#8f1a0f` | Seite einer Quelle (Linie + Kennung) | 9,0 / 7,2 / 7,9 |
| `--m-gut` | `#14532c` | „richtig" beim Prüfen (immer mit ✓) | 9,1 / 7,3 / 8,0 |
| Schrift | `system-ui, -apple-system, "Segoe UI", sans-serif` 17/1.5 | alles Bedienbare | |
| Wortlaut | `Georgia, "Times New Roman", serif` 1.1rem/1.65 | nur Quellen-Wortlaut | |

## Architektur

- **Neu: `unterricht/assets/css/material.css`** — Tokens + geteilte Bausteine (Grund, Blatt, Knopf, Reiter,
  Fachwort-Notiz, Kopf, Vollbild). Eintrag in `assets/versions.json`, `?v=` in jeder Seiten-Hülle.
- **Werkzeug-CSS** (`quellen.css`, `ordnen.css`, `datenspuren.css`) behalten nur ihr Layout und nutzen
  ausschließlich `--m-*`-Tokens; eigene Paletten entfallen.
- **Seiten-Hüllen:** jede `index.html` unter `quellen/`, `ordnen/`, `datenspuren/` lädt
  `material.css` vor dem Werkzeug-CSS (Tiefe `../../assets/css/`, Fall-Übersicht `../assets/css/`);
  ebenso `tools/datenspuren/seite_vorlage.html`.
- **Warum das für künftige Seiten reicht:** Die Bauskripte der Kurs-Welten schreiben nur `data.json` und
  **kopieren `index.html` von einer bestehenden Seite** (Vorbild `quellen/raete-parlament/index.html`,
  Datenspuren aus der Vorlage im Repo). Neue Seiten erben die neue Hülle; keine Kurs-Welt muss etwas ändern.
- **Datenformat unverändert.** `✨` in vorhandenen Texten (`ki_hinweis`, Auftrag; 10 Seiten) wird beim Anzeigen
  zu „Mit KI verstehen" übersetzt, damit alte Texte zum neuen Knopf passen.

## Befunde während der Umsetzung

- **`make smoke` prüfte die Materialseiten gar nicht** (nur Spiele, WiB, Kursseiten) — jetzt aufgenommen (42 Seiten).
- **Zwei Seiten hatten eigene Inline-Stile:** `ordnen/index.html` mit den alten `--o-*`-Variablen (Karte fiel weg →
  Stile nach `ordnen.css` umgezogen) und `ordnen/eigener-staat/` mit kompakten Karten für die Tafel (bleibt; die
  Pfeile stehen dafür generell nebeneinander, 44 × 44 px, damit kompakte Karten flach bleiben).
- **Eine Hülle wird nicht kopiert, sondern geschrieben:** `welt/GPG9a/…/staat_bauen.py` (Seite `eigener-staat`).
  Liefe es erneut, fehlte `material.css` → Wächter B6 blockt jetzt jede Hülle ohne `material.css`.
- Der Datenspuren-Generator setzt jetzt auch das `material.css`-Token aus `versions.json` (vorher nur seine zwei Dateien);
  ein Neulauf erzeugt die Seiten byte-gleich.

## Nicht im Umfang

- Inhalte, Datenfelder, Funktionen (Fachwort antippen, Bild groß, KI-Prompt, Leichter lesen, Prüfen, Filter).
- Escape-Games (eigene Ladekette `theme-gpg.css`), WiB-Werkzeuge, Anleitungen (`gpg/`, `smv/`), Übersicht/Kursseiten.
- Dunkelmodus der Materialseiten (heute keiner; Arbeitsblatt-Logik bleibt hell).

## Abnahme

- Vorher-/Nachher-Bilder jeder Materialseite (Tablet quer 1180 × 820, Handy 390 × 844),
  `tools/smoke/material_shots.py`.
- Funktionsprobe je Werkzeug im Browser: Fachwort auf/zu, Leichter lesen, Bild groß/zu, KI-Knopf öffnet duck.ai;
  Anordnen: verschieben, Prüfen; Datenspuren: Filter, Eingabe.
- `make check` + `make smoke` grün; `make bump` für die drei Werkzeug-CSS/JS.
- Kontrast-Prüfung der Tokens per Skript (Lesetext ≥ 7 : 1).
- Kein „ERKLÄRT:", kein `✨` mehr im gerenderten DOM (Probe per Skript).
