# Kursseiten + vollständige Unterricht-Übersicht — Design

> Stand 2026-10-15 · Status: **Entwurf, wartet auf Pauls Freigabe** · Branch `feat/kursseiten`
> (Worktree `/Users/paulad/weitergehts.online/_wt-kursseiten`, abgezweigt von `origin/main` d69cc9d).

## Problem

Seit September ist viel Kursmaterial live gegangen (Quellenseiten, Anordnungsaufgaben,
Datenspuren, zweites Escape-Game). Die Übersicht `/unterricht/` wird von Hand gepflegt und
verlinkt **7 von ~20** Materialien; alle Quellenseiten, drei Anordnungsaufgaben und die
Anordnen-Übersicht sind nur per Direktlink erreichbar. Die eine Kursseite (`/unterricht/k/inf6b/`)
ist ein handgepflegter Zweitbestand außerhalb des Site-Designs. Welche Seite zu welchem Kurs
gehört, steht nur in Commit-Nachrichten.

## Entscheide (Paul, 2026-10-15)

1. **Gliederung der Kursseite:** oben *Aktuell* (die letzten Stunden), darunter *nach Thema*
   gruppiert, jeder Eintrag mit Datum + Art-Marke.
2. **Sichtbarkeit — Mittelweg:** Kursseiten **unverlinkt + `noindex`**, erreichbar per
   Direktlink/QR. Die öffentliche Übersicht ist **vollständig**, ordnet aber nur nach
   Fach + Jahrgang — **ohne Klassenbuchstaben, ohne Stundendatum** (kein ablesbarer
   Stundenplan in Kombination mit dem Impressum).
3. **Zuordnung** wie unten in der Startbefüllung (aus den Commits erschlossen, von Paul bestätigt).

## Lösung in einem Satz

Eine Datenquelle `unterricht/kurse.json` → ein Generator `tools/kurse/build.py` (`make kurse`)
schreibt die Übersicht `unterricht/index.html` und alle `unterricht/k/<kurs>/index.html` als
statisches HTML im „Nebel & Papier"-Design; `make check` meldet jede Materialseite ohne Eintrag.

Warum generiert statt handgepflegt: Übersicht und Kursseiten sind zwei Sichten auf denselben
Bestand — handgepflegt driften sie (genau das ist passiert). Generiert wird wie beim Lernraum
(`make lernraum`): Python im Repo, Ergebnis ist fertiges HTML, kein JS zur Laufzeit, kein npm.

## Datenmodell `unterricht/kurse.json`

```json
{
  "schuljahr": "2026/27",
  "faecher": {
    "gpg": "Geschichte · Politik · Geographie",
    "wib": "Wirtschaft und Beruf",
    "inf": "Informatik"
  },
  "kurse": {
    "gpg8a": { "fach": "gpg", "jahrgang": 8, "titel": "GPG 8a" },
    "gpg9a": { "fach": "gpg", "jahrgang": 9, "titel": "GPG 9a" },
    "inf6b": { "fach": "inf", "jahrgang": 6, "titel": "Informatik 6b" }
  },
  "materialien": [
    {
      "pfad": "quellen/kampf-1919/",
      "titel": "Kampf um Berlin 1919",
      "art": "quellen",
      "fach": "gpg", "jahrgang": 8,
      "kurse": ["gpg8a"],
      "thema": "Weimarer Republik",
      "datum": "2026-10-13"
    }
  ]
}
```

- `pfad` relativ zu `unterricht/`. `titel` ist der Listen-Titel (darf vom `<title>` abweichen).
- `art` ∈ `escape-game · quellen · anordnen · werkzeug · anleitung · recherche` → Marke in Versalien.
- `kurse` darf leer sein (Material nur in der Übersicht, z. B. Syrien-Game, WiB-Werkzeuge).
- `datum` = Datum der Stunde; erscheint **nur** auf Kursseiten.
- `status: "staging"` (optional) → in der Übersicht nur mit `?staging=1` (bestehender Mechanismus).
- `id` für Games bleibt `game-<ordner>`, damit `check.sh`/`smoke.py` ihre Live-Discovery aus
  `unterricht/index.html` unverändert behalten.

## Seiten

### Übersicht `/unterricht/` (generiert, öffentlich)

Bestehende `hub-list` bleibt das Muster (Haarlinien, Serifentitel, Mono-Marken). Pro Fach eine
Gruppe, darin **nach Jahrgang** sortiert, Spalten `KL. 8 · Titel · ART`. Neu: vollständig.
Mehrteiliges Material erscheint einmal (Datenspuren → Fall-Übersicht, nicht sieben Fälle;
Markt oder Plan West/Ost → zwei Einträge, da zwei Seiten). Keine Kursnamen, keine Daten,
kein Link auf `/k/`.

### Kursseite `/unterricht/k/<kurs>/` (generiert, unverlinkt, `noindex`)

Gleiche Topbar/Footer/Modus-Schalter wie die Übersicht, `<meta name="robots" content="noindex">`.

```
GPG 8A · GESCHICHTE · POLITIK · GEOGRAPHIE · 2026/27      (cap)
Unser Material                                             (h1)

AKTUELL                                                    (cap)
  16.10.   Schulproteste in Frankreich          QUELLEN
  13.10.   Der Weg zum Aufstand                 ANORDNEN

WEIMARER REPUBLIK                                          (cap)
  13.10.   Kampf um Berlin 1919                 QUELLEN
  13.10.   Der Weg zum Aufstand                 ANORDNEN
  05.10.   Räte oder Parlament?                 QUELLEN
  28.09.   Vom Kaiserreich zur Republik         ANORDNEN
WOCHENRÜCKBLICK
  …
```

- Erste Spalte = Datum `TT.MM.` statt Jahrgang (gleiches Grid wie `hub-list`).
- Themen-Reihenfolge: das Thema mit der jüngsten Stunde zuerst; innerhalb neueste zuerst.
- *Aktuell*-Auswahl: **offener Entscheidungspunkt** (Funktion `aktuell()` im Generator, s. u.).
- Nur für Schüler auf dem Tablet gedacht: große Trefferflächen (bestehende 14 px Padding reichen),
  mobil Datum + Art in Zeile 1, Titel in Zeile 2 (bestehende Media-Query).

### `k/inf6b/` — Übernahme

Die Adresse bleibt (QR-Codes im Umlauf). Inhalt wird vom Generator überschrieben; die sieben
Fälle laufen als Einträge mit Thema „Datenspuren". Die heutige Sonder-Optik (rosa Kästen) entfällt.

## Prüfung (`make check`)

Neuer Check `tools/kurse/build.py --check` (in `check.sh` eingehängt):

- **BLOCKING:** jeder `pfad` in `kurse.json` existiert; jeder Kurs-Verweis ist definiert;
  die generierten Dateien sind aktuell (Generator im Trockenlauf = Dateien auf Platte, sonst
  „`make kurse` vergessen").
- **ADVISORY:** jede Materialseite unter `unterricht/` (Ordner mit `index.html` bzw.
  Einzel-`.html` in `gpg/`, `wib/`), die nicht in `kurse.json` steht → „verwaist".
  Ausgenommen: `_`-Ordner, `assets/`, `k/`, Unterseiten von Games (`mappe-*`, `tafelbild/`,
  `lehrkraft.html`) und Unterseiten eines gelisteten Materials.

## Startbefüllung

| Material | Art | Kl. | Kurs | Thema | Datum* |
|---|---|---|---|---|---|
| escape-games/syrische-revolution-2011 | escape-game | 7 | — | — | — |
| wib/haushaltsbuch.html | werkzeug | 7 | — | — | — |
| wib/geldwert.html | werkzeug | 7 | — | — | — |
| smv/ | recherche | 8 | gpg8a | SMV | 2026-09-24 |
| ordnen/kaiserreich/ | anordnen | 8 | gpg8a | Weimarer Republik | 2026-09-28 |
| quellen/raete-parlament/ | quellen | 8 | gpg8a | Weimarer Republik | 2026-10-05 |
| quellen/kampf-1919/ | quellen | 8 | gpg8a | Weimarer Republik | 2026-10-13 |
| ordnen/eskalation-1919/ | anordnen | 8 | gpg8a | Weimarer Republik | 2026-10-13 |
| quellen/schulproteste-frankreich/ | quellen | 8 | gpg8a | Wochenrückblick | 2026-10-16 |
| escape-games/zweiter-weltkrieg-ende-1945 | escape-game | 9 | gpg9a | Zweiter Weltkrieg | 2026-09-21 |
| gpg/wochenrueckblick.html | anleitung | 9 | gpg9a | Wochenrückblick | 2026-09-24 |
| quellen/fruehstartrente/ | quellen | 9 | gpg9a | Wochenrückblick | 2026-10-05 |
| quellen/wehrdienst/ | quellen | 9 | gpg9a | Wochenrückblick | 2026-10-08 |
| quellen/markt-oder-plan-west/ | quellen | 9 | gpg9a | Markt oder Plan | 2026-10-08 |
| quellen/markt-oder-plan-ost/ | quellen | 9 | gpg9a | Markt oder Plan | 2026-10-08 |
| ordnen/eigener-staat/ | anordnen | 9 | gpg9a | Markt oder Plan | 2026-10-16 |
| datenspuren/ (+ 7 Fälle auf der Kursseite) | werkzeug | 6 | inf6b | Datenspuren | 2026-10-08 / 2580: 2026-10-16 |
| ordnen/ (Übersicht Anordnen) | — | — | — | Unterseite-Hub, nicht gelistet | — |

\* Datum = Erst-Commit bzw. Stundendatum aus der Commit-Nachricht; **Paul korrigiert** beim Review.
Themen-Namen sind Vorschläge.

## Offener Entscheidungspunkt: Was ist „Aktuell"?

`aktuell(materialien, heute)` im Generator. Varianten: die letzte Stunde (alle Einträge mit dem
jüngsten Datum) · alles der letzten 7 Tage · feste Anzahl (2–3). Abwägung: Die Seite ist statisch
— „heute" ist der Build-Tag, nicht der Besuchstag. Eine Zeitfenster-Regel veraltet also, wenn
länger nichts gebaut wird; „letzte Stunde" ist build-tag-unabhängig. Paul schreibt diese Funktion.

## Nicht im Umfang

- `/lernen/` (PhC III) — kein Kursmaterial, bleibt unberührt.
- Inhalte der Materialseiten (nur Listung/Navigation), Root-Verteiler, Profil.
- Archiv vergangener Schuljahre (Modell trägt es über `schuljahr`; Umsetzung, wenn es ansteht).
- Zugriffsschutz: `noindex` + Unverlinkung ist Unsichtbarkeit, keine Zugangssperre.

## Abnahme

- `make kurse` erzeugt Übersicht + 3 Kursseiten; zweiter Lauf ändert nichts (idempotent).
- `make check` grün; Negativprobe: Eintrag aus `kurse.json` entfernen → Verwaist-Meldung;
  Pfad vertippen → BLOCKING.
- `make smoke` grün (Übersicht + Kursseiten ohne JS-Fehler); Games-Discovery unverändert
  (gleiche Menge wie vorher).
- Screenshot hell/dunkel, Desktop + 375 px, Übersicht und eine Kursseite.
- Kein Klassenkürzel und kein Datum im generierten `unterricht/index.html` (grep-Probe).
