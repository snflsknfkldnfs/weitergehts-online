# Uebergabe: Phase 2 Prototyp — Mappen 1+2 Produktion + Deployment

**Erstellt:** 2026-03-24
**Zweck:** Claude Code soll aus den validierten MATERIAL_GERUESTs (Mappen 1+2) ein spielbares Prototyp-Game erzeugen und deployen.
**Ziel:** Visuelles Review auf weitergehts.online, Prozess-Evaluation, Bug-Erkennung VOR Produktion von Mappen 3+4.

---

## Kontext

- **Phase:** Phase 2 (Mappen-Produktion), beschraenkt auf Mappen 1+2 als Prototyp
- **Workflow:** v2 (DIDAKTIK → INHALT → SKRIPT → MATERIAL_GERUEST → Produktion)
- **Game-ID:** gpg-erster-weltkrieg-ursachen
- **Game-Titel:** "Der Erste Weltkrieg — Ursachen und Ausbruch"
- **Repo:** weitergehts-online (GitHub Pages, Custom Domain weitergehts.online)
- **Template-Engine:** Steht (escape-engine.js, core.js, base.css, theme-gpg.css)
- **Bestehende v1-Daten:** escape-games/gpg-erster-weltkrieg-ursachen/ enthaelt altes data.json mit v1-Inhalten (Reporter-Narrativ). MUSS ERSETZT werden.

### Eingabe-Dokumente (alle unter docs/agents/artefakte/)

1. **MATERIAL_GERUEST_gpg-erster-weltkrieg-ursachen_Mappe1.md** — Material-Design Mappe 1 (6 Materialien, Tafelbild, Einstieg/Sicherung)
2. **MATERIAL_GERUEST_gpg-erster-weltkrieg-ursachen_Mappe2.md** — Material-Design Mappe 2 (6 Materialien, Tafelbild, Einstieg/Sicherung)
3. **SKRIPT_gpg-erster-weltkrieg-ursachen.md** — Lineares Skript (Chunk 1+2 fuer Textgrundlage)
4. **INHALTSBASIS_gpg-erster-weltkrieg-ursachen.md** — Faktenbasis, Wikimedia-Artefakte, Zitate, Rollenprofile
5. **DIDAKTIK_RAHMEN_gpg-erster-weltkrieg-ursachen.md** — KE-Matrix, Lernziele

### Referenz-Dokumente (Technik)

6. **escape-games/template/data.json** — Schema-Vorlage
7. **escape-games/template/mappe-template.html** — HTML-Template (Engine rendert aus data.json)
8. **assets/js/escape-engine.js** — Engine-Code (Materialtyp-Renderer, Aufgaben-Handler)
9. **assets/js/core.js** — Storage, Navigation, Feedback

---

## Aufgabe

Erzeuge ein neues `data.json` fuer `escape-games/gpg-erster-weltkrieg-ursachen/` mit v2-Inhalten fuer Mappen 1+2. Die bestehenden v1-Dateien werden ersetzt.

### Schritt 1: data.json — Meta

```json
{
  "meta": {
    "titel": "Der Erste Weltkrieg — Ursachen und Ausbruch",
    "fach": "GPG",
    "jahrgangsstufe": "R7 Mittelschule Bayern",
    "lehrplanbezug": "LB2 Zeit und Wandel, LB3 Politik und Gesellschaft",
    "schwierigkeit": "Basis → Mittel",
    "geschaetzte_dauer_min": 45,
    "narrativ": "Sommer 1914. Europa steht am Abgrund. Sechs Grossmaechte belauern sich — aufgeteilt in zwei Buendnisbloecke. Deine Aufgabe: Finde heraus, warum ein einziger Mord in Sarajevo einen Weltkrieg ausloesen konnte."
  }
}
```

**Aenderungen gegenueber v1:** Reporter-Narrativ entfernt. Neutrales Szenario. Dauer auf 45 Min (2 Mappen statt 4). Lehrplanbezug erweitert.

### Schritt 2: data.json — Mappe 1 "Pulverfass Europa"

**Quelle:** MATERIAL_GERUEST Mappe 1 + SKRIPT Chunk 1 + INHALTSBASIS Mappe 1

#### Einstieg
- Typ: szenario
- Text: Aus MATERIAL_GERUEST Mappe 1, Abschnitt "Einstieg" (HTML-formatiert mit <p>-Tags)
- Problemstellung: "Warum war Europa vor 1914 ein 'Pulverfass' — und warum genuegt ein einziger Funke?"

#### Materialien (6 Stueck, IDs beibehalten)

| mat-ID | Typ | Inhalt-Quelle | Anweisung |
|---|---|---|---|
| mat-1-1 | darstellungstext | SKRIPT Chunk 1 §1-§2 | Schreibe einen schulernahen Sachtext (max. 250 Woerter, Saetze ≤20 Woerter). Thema: Imperialismus und Nationalismus als Spannungsursachen. Fachbegriffe bei Erstverwendung erklaert. Pulverfass-Metapher einfuehren. HTML-formatiert (<p>, <strong> fuer Fachbegriffe). |
| mat-1-2 | karte | img-1-1 | Bild-URL: `https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Map_Europe_alliances_1914-en.svg/800px-Map_Europe_alliances_1914-en.svg.png`. Bildunterschrift: "Europa 1914: Dreibund und Triple Entente. Die Karte zeigt die Spaltung des Kontinents." Quelle: "Wikimedia Commons, CC-BY-SA 2.5". Typ im JSON: `bildquelle` (Engine rendert Bilder als bildquelle). |
| mat-1-3 | zeitleiste | SKRIPT §3-§4, INHALTSBASIS Chronologie | Array von {datum, text}-Objekten: 1879 Zweibund, 1882 Dreibund, 1894 Franko-Russische Allianz, 1904 Entente Cordiale, 1907 Triple Entente. Quelle: "Eigene Zusammenstellung auf Basis von Wikipedia". |
| mat-1-4 | quellentext | zit-1-1 (Buelow) | Inhalt: HTML mit Zitat in Anfuehrungszeichen. "Wir wollen niemand in den Schatten stellen, aber wir verlangen auch unseren Platz an der Sonne." Quelle: "Bernhard von Buelow, Reichstagsrede, 6. Dezember 1897". |
| mat-1-5 | bildquelle | img-1-2 (Wilhelm II.) | Bild-URL: `https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Kaiser_Wilhelm_II_of_Germany_-_1902.jpg/440px-Kaiser_Wilhelm_II_of_Germany_-_1902.jpg`. Bildunterschrift: "Kaiser Wilhelm II. in Uniform (1902). Er strebte nach Weltmachtstatus und trieb die Flottenruestung voran." Quelle: "T. H. Voigt, Wikimedia Commons, Public Domain". |
| mat-1-6 | quellentext | rolle-1-1 (Diplomat) | Schreibe einen fiktiven Tagebucheintrag (max. 200 Woerter). Perspektive: Diplomat im Auswaertigen Amt, erlebt Buendnisverhandlungen. Historisch plausibel (INHALTSBASIS Rollenprofil beachten). Ton: persoenlich, besorgt. Datierung: "Berlin, Fruehling 1907". Im JSON als typ "quellentext" mit Zusatz "(fiktiver Tagebucheintrag, historisch plausibel)" in der Quelle. |

**WICHTIG zum Materialtyp-Mapping:**
- Die Engine kennt diese Typen: `darstellungstext`, `quellentext`, `bildquelle`, `zeitleiste`, `statistik`, `karte`
- `tagebuch` existiert NICHT als Engine-Typ → als `quellentext` einfuegen
- `karte` existiert NICHT als Engine-Typ → als `bildquelle` einfuegen
- Pruefe in escape-engine.js, welche Typen die `_renderMaterial*`-Funktionen unterstuetzen, und mappe entsprechend

#### Aufgaben (Stub fuer Prototyp — 3 Stueck)

Da Aufgaben im v2-Workflow erst nach Material-Produktion entwickelt werden, erstelle 3 einfache Stub-Aufgaben zum Testen des Flows:

```
aufgabe-1-1: multiple-choice
  Frage: "Welche Laender bildeten den Dreibund?"
  Optionen: ["Deutschland, Oesterreich-Ungarn, Italien", "Frankreich, Grossbritannien, Russland", "Deutschland, Frankreich, Italien", "Grossbritannien, Oesterreich-Ungarn, Russland"]
  Loesung: "Deutschland, Oesterreich-Ungarn, Italien"
  material_referenz: ["mat-1-2"]
  Punkte: 10

aufgabe-1-2: lueckentext
  Frage: "Bernhard von Buelow forderte fuer Deutschland einen 'Platz an der ___'."
  Loesung: "Sonne"
  material_referenz: ["mat-1-4"]
  Punkte: 10

aufgabe-1-3: multiple-choice
  Frage: "Was bedeutet die Metapher 'Pulverfass Europa'?"
  Optionen: ["Europa war bereit fuer einen Krieg — ein kleiner Anlass genuegt", "Europa hatte zu viel Schiesspulver gelagert", "Die Fabriken in Europa produzierten Waffen", "Europa war von Vulkanen bedroht"]
  Loesung: "Europa war bereit fuer einen Krieg — ein kleiner Anlass genuegt"
  material_referenz: ["mat-1-1"]
  Punkte: 10
```

Tipps jeweils 3-stufig: Stufe 1 Hinweis auf Material, Stufe 2 inhaltlicher Hinweis, Stufe 3 fast die Antwort.

#### Sicherung

```json
{
  "tafelbild": {
    "knoten": [
      {"id": "k1-1", "text": "Pulverfass Europa", "typ": "kernbegriff"},
      {"id": "k1-2", "text": "Imperialismus", "typ": "ursache"},
      {"id": "k1-3", "text": "Nationalismus", "typ": "ursache"},
      {"id": "k1-4", "text": "Dreibund (DE, OeU, IT)", "typ": "kategorie"},
      {"id": "k1-5", "text": "Triple Entente (FR, GB, RU)", "typ": "kategorie"},
      {"id": "k1-6", "text": "Wettruestung", "typ": "ursache"},
      {"id": "k1-7", "text": "Kettenreaktion", "typ": "wirkung"}
    ],
    "verbindungen": [
      {"von": "k1-2", "nach": "k1-1", "label": "verschaerft Spannungen"},
      {"von": "k1-3", "nach": "k1-1", "label": "verschaerft Spannungen"},
      {"von": "k1-4", "nach": "k1-7", "label": "Buendnispflicht erzwingt"},
      {"von": "k1-5", "nach": "k1-7", "label": "Buendnispflicht erzwingt"},
      {"von": "k1-6", "nach": "k1-1", "label": "erhoeht Misstrauen"},
      {"von": "k1-1", "nach": "k1-7", "label": "ein Funke genuegt"}
    ],
    "voraussetzungen": []
  },
  "zusammenfassung": "[Text aus MATERIAL_GERUEST Mappe 1 Sicherung, inkl. Grey-Zitat zit-1-2]",
  "ueberleitung": "Doch wo ist der Funke? Am 28. Juni 1914 faellt in Sarajevo ein Schuss, der die Welt veraendert."
}
```

#### Freischalt-Code

`PULVER` (thematisch passend, leicht merkbar)

---

### Schritt 3: data.json — Mappe 2 "Das Attentat von Sarajevo"

**Quelle:** MATERIAL_GERUEST Mappe 2 + SKRIPT Chunk 2 + INHALTSBASIS Mappe 2

#### Einstieg
- Typ: rueckblick
- Text: Aus MATERIAL_GERUEST Mappe 2, Abschnitt "Einstieg" (HTML-formatiert)
- Problemstellung: "Was passiert am 28. Juni 1914 in Sarajevo? Und wie kann ein einziger Mord einen Weltkrieg ausloesen?"

#### Materialien (6 Stueck)

| mat-ID | Typ | Inhalt-Quelle | Anweisung |
|---|---|---|---|
| mat-2-1 | darstellungstext | SKRIPT Chunk 2 §1-§3 | Schulernaher Sachtext (max. 300 Woerter). Thema: Balkankrise → Attentat → Ursache-vs-Ausloeser-Unterscheidung. Fachbegriffe erklaert. HTML-formatiert. |
| mat-2-2 | bildquelle | img-2-1 (Beltrame) | Bild-URL: Suche auf Wikimedia Commons nach `DC-1914-27-d-Sarajevo-cropped.jpg` und verwende die korrekte Thumbnail-URL. Falls nicht auffindbar: wikimedia_search_images mit "assassination Sarajevo 1914 Beltrame". Bildunterschrift: "Illustration des Attentats von Sarajevo, Achille Beltrame (1914)." Quelle + Lizenz aus INHALTSBASIS. |
| mat-2-3 | bildquelle | img-2-2 (Franz Ferdinand) | Bild-URL: Suche auf Wikimedia Commons nach dem Dateinamen aus INHALTSBASIS. Bildunterschrift: "Erzherzog Franz Ferdinand und seine Frau Sophie kurz vor dem Attentat am 28. Juni 1914." Quelle + Lizenz. |
| mat-2-4 | quellentext | zit-2-2 (Ultimatum) | Schreibe eine schuelergerechte Paraphrase des oesterreichischen Ultimatums an Serbien (max. 150 Woerter). Kernforderungen nennen. Quelle: "Oesterreichisch-ungarisches Ultimatum an Serbien, 23. Juli 1914 (vereinfacht)". |
| mat-2-5 | zeitleiste | SKRIPT §4-§5, INHALTSBASIS Julikrise | Array von {datum, text}: 28.6. Attentat, 5.7. Blankoscheck, 23.7. Ultimatum, 25.7. Serbiens Antwort, 28.7. OeU erklaert Krieg, 30.7. Russland mobilisiert, 1.8. DE erklaert RU Krieg, 3.8. DE erklaert FR Krieg, 4.8. DE marschiert in Belgien ein / GB erklaert DE Krieg. |
| mat-2-6 | quellentext | rolle-2-1 (Bewohner:in Sarajevo) | Fiktiver Tagebucheintrag (max. 200 Woerter). Perspektive: Bewohner:in von Sarajevo erlebt den 28. Juni 1914. Historisch plausibel (Rollenprofil aus INHALTSBASIS). Ton: Schock, Angst. Datierung: "Sarajevo, 28. Juni 1914, abends". Im JSON als "quellentext". |

#### Aufgaben (Stub — 3 Stueck)

```
aufgabe-2-1: multiple-choice
  Frage: "Wer wurde beim Attentat von Sarajevo ermordet?"
  Optionen: ["Erzherzog Franz Ferdinand und seine Frau Sophie", "Kaiser Wilhelm II.", "Der serbische Koenig", "Otto von Bismarck"]
  Loesung: "Erzherzog Franz Ferdinand und seine Frau Sophie"
  material_referenz: ["mat-2-1"]
  Punkte: 10

aufgabe-2-2: multiple-choice
  Frage: "Was ist der Unterschied zwischen 'Ursache' und 'Ausloeser' des Ersten Weltkriegs?"
  Optionen: ["Ursachen sind die tieferliegenden Gruende (Buendnisse, Rivalitaeten); der Ausloeser ist das Attentat", "Ursache und Ausloeser bedeuten dasselbe", "Der Ausloeser sind die Buendnisse; die Ursache ist das Attentat", "Es gibt keinen Unterschied"]
  Loesung: "Ursachen sind die tieferliegenden Gruende (Buendnisse, Rivalitaeten); der Ausloeser ist das Attentat"
  material_referenz: ["mat-2-1"]
  Punkte: 10

aufgabe-2-3: lueckentext
  Frage: "Deutschland gab Oesterreich-Ungarn einen '___' — die Zusicherung unbedingter Unterstuetzung."
  Loesung: "Blankoscheck"
  material_referenz: ["mat-2-4", "mat-2-5"]
  Punkte: 10
```

#### Sicherung

Tafelbild aus MATERIAL_GERUEST Mappe 2 (6 Knoten, 6 Verbindungen, Voraussetzungen: k1-1, k1-4, k1-5, k1-7).
Zusammenfassung + zit-2-1 als Schlusszitat.
Ueberleitung: "Millionen Soldaten stehen nun bereit. Doch wie reagieren die Menschen auf den Kriegsausbruch? Ziehen sie mit Angst oder mit Begeisterung in den Krieg?"

#### Freischalt-Code

`FUNKE` (thematisch: der Funke im Pulverfass)

---

### Schritt 4: Mappen 3+4 entfernen

Das Prototyp-Game hat NUR 2 Mappen. Entferne Mappen 3+4 aus data.json. Entferne oder deaktiviere mappe-3.html und mappe-4.html (umbenennen zu .bak oder loeschen — Dateien sind in Git versioniert).

### Schritt 5: HTML-Dateien aktualisieren

- **index.html** (Game-Startseite): Titel aktualisieren auf "Der Erste Weltkrieg — Ursachen und Ausbruch". Beschreibung anpassen. Nur 2 Mappen anzeigen.
- **mappe-1.html** und **mappe-2.html**: Sollten bereits korrekt sein (Template laedt aus data.json). Pruefe, ob die Pfade zu CSS/JS stimmen.
- **lehrkraft.html**: Codes aktualisieren (PULVER, FUNKE). Nur 2 Mappen zeigen.

### Schritt 6: Wikimedia-Bilder verifizieren

Fuer jede Bild-URL im data.json:
1. Pruefe, ob die URL erreichbar ist (kein 404)
2. Falls 404: Nutze `wikimedia_search_images` MCP-Tool mit dem Suchbegriff aus INHALTSBASIS, um eine funktionierende URL zu finden
3. Notiere Lizenz korrekt

### Schritt 7: Engine-Kompatibilitaet pruefen

Lies escape-engine.js und pruefe:
1. Welche `typ`-Werte werden in der Material-Rendering-Logik unterstuetzt?
2. Passt das Tafelbild-Schema (knoten, verbindungen, voraussetzungen) zur Engine?
3. Funktioniert die Zeitleiste mit dem {datum, text}-Array-Format?
4. Wie rendert die Engine den Einstieg (narrativ + problemstellung)?

Falls Inkompatibilitaeten: Dokumentiere sie in einem Kommentar oben in data.json UND passe data.json an die Engine an (nicht umgekehrt — Engine-Code nicht aendern im Prototyp).

### Schritt 8: Lokaler Test

1. Oeffne die Website lokal (oder per GitHub Pages nach Push)
2. Pruefe: Laden alle Materialien? Werden Bilder angezeigt? Funktioniert die Zeitleiste? Sind Aufgaben beantwortbar? Wird das Tafelbild gerendert?
3. Dokumentiere Ergebnisse

### Schritt 9: Git Commit + Push

```
git add escape-games/gpg-erster-weltkrieg-ursachen/data.json
git add escape-games/gpg-erster-weltkrieg-ursachen/index.html
git add escape-games/gpg-erster-weltkrieg-ursachen/lehrkraft.html
# mappe-1.html und mappe-2.html nur wenn geaendert
git commit -m "Phase 2 Prototyp: Mappen 1+2 mit v2-Inhalten (MATERIAL_GERUEST)"
git push origin main
```

### Schritt 10: Alte v1-Artefakte aufraeumen

Die alten Markdown-Dateien im Game-Verzeichnis sind v1-Relikte:
- `didaktischer-rahmen.md`, `inhalt-mappe-*.md`, `raetsel-mappe-*.md`, `qualitaets-report.md`
- `data-mvp-backup.json`, `data-v1-test.json`

Diese koennen geloescht werden (Versionierung in Git). Oder in einen `_archive/`-Unterordner verschieben.

---

## Erfolgskriterium

1. weitergehts.online/escape-games/gpg-erster-weltkrieg-ursachen/ laedt fehlerfrei
2. Mappe 1: 6 Materialien werden angezeigt (Darstellungstext, Karte/Bild, Zeitleiste, Quellentext, Bildquelle, Tagebuch)
3. Mappe 2: 6 Materialien werden angezeigt
4. Stub-Aufgaben sind beantwortbar
5. Tafelbild wird nach Aufgaben-Loesung angezeigt
6. Bilder (Wikimedia) laden korrekt
7. Freischalt-Codes funktionieren (PULVER → Mappe 1, FUNKE → Mappe 2)
8. Lehrkraft-Seite zeigt Codes und Loesungen fuer 2 Mappen
9. Keine JavaScript-Konsolenfehler

## Nach Abschluss

Melde den Abschluss in Cowork mit:
```
Update: Phase 2 Prototyp deployed. Ergebnis: [Anzahl Mappen], [gefundene Probleme], [URL].
```

Liste explizit auf:
- Welche Materialtypen korrekt gerendert werden
- Welche Materialtypen Probleme haben (und welche)
- Ob Bilder laden
- Ob Tafelbild funktioniert
- Engine-Inkompatibilitaeten (falls vorhanden)
