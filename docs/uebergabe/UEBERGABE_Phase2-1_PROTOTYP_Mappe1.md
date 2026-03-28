# Uebergabe: Phase 2.1 Prototyp — Mappe 1 Material-Produktion + Deployment

**Erstellt:** 2026-03-24
**Ersetzt:** UEBERGABE_Phase2_PROTOTYP_Mappen1-2.md (veraltet — Scope reduziert auf Mappe 1)
**Zweck:** Claude Code produziert die Materialien fuer Mappe 1 mit Subagenten-Prompts und deployt sie als spielbaren Prototyp.

---

## Kontext

- **Game-ID:** gpg-erster-weltkrieg-ursachen
- **Mappe:** 1 ("Pulverfass Europa")
- **Workflow-Phase:** 2.1 (Material-Produktion mit Subagenten) + 2.2 (Stub-Aufgaben) + 2.3 (Assembly) + 3 (Deployment)
- **Template-Engine:** Steht (escape-engine.js, core.js, base.css, theme-gpg.css)
- **Bestehende v1-Daten:** `escape-games/gpg-erster-weltkrieg-ursachen/data.json` MUSS ERSETZT werden

## Eingabe-Dokumente (alle unter docs/agents/artefakte/)

| Dokument | Pfad | Rolle |
|---|---|---|
| MATERIAL_GERUEST Mappe 1 | `MATERIAL_GERUEST_gpg-erster-weltkrieg-ursachen_Mappe1.md` | Primaerquelle: Was wird produziert |
| SKRIPT | `SKRIPT_gpg-erster-weltkrieg-ursachen.md` (Chunk 1) | Textgrundlage, narrative Einbettung |
| INHALTSBASIS | `INHALTSBASIS_gpg-erster-weltkrieg-ursachen.md` (Mappe 1) | Fakten, Artefakt-Daten, Rollenprofile |
| DIDAKTIK_RAHMEN | `DIDAKTIK_RAHMEN_gpg-erster-weltkrieg-ursachen.md` | Zielgruppe, KE-Matrix |

## Subagenten-Prompts (unter docs/agents/)

| Subagent | Prompt-Datei | Fuer mat-IDs |
|---|---|---|
| SUB_DARSTELLUNGSTEXT | `AGENT_SUB_DARSTELLUNGSTEXT.md` | mat-1-1 |
| SUB_BILDQUELLE | `AGENT_SUB_BILDQUELLE.md` | mat-1-2 (Karte), mat-1-5 (Wilhelm II.) |
| SUB_ZEITLEISTE | `AGENT_SUB_ZEITLEISTE.md` | mat-1-3 |
| SUB_QUELLENTEXT | `AGENT_SUB_QUELLENTEXT.md` | mat-1-4 (Buelow-Zitat) |
| SUB_TAGEBUCH | `AGENT_SUB_TAGEBUCH.md` | mat-1-6 (Diplomat) |

---

## Schritt 1: Subagenten-Prompts lesen

Lies ZUERST alle 5 Subagenten-Prompts (AGENT_SUB_*.md). Sie definieren:
- Eingabe-Parameter pro Materialtyp
- Produktionsregeln (Sprachregister, Wortbudgets, didaktische Strukturen)
- Output-Format (JSON mit _meta)
- Qualitaets-Gate (Q1-Q10+)

Dann lies MATERIAL_GERUEST Mappe 1 + SKRIPT Chunk 1 + INHALTSBASIS Mappe 1.

## Schritt 2: Material-Produktion (Phase 2.1)

Produziere die 6 Materialien sequentiell. Fuer jedes Material:

### mat-1-1: Darstellungstext → SUB_DARSTELLUNGSTEXT

```
mat_id: mat-1-1
titel: "Pulverfass Europa — Spannungen vor 1914"
skript_chunk: SKRIPT Chunk 1, §1-§2 (Imperialismus, Nationalismus, Buendnisse)
tafelbild_knoten: k1-1 (Pulverfass Europa), k1-2 (Imperialismus), k1-3 (Nationalismus)
artefakt_ref: — (AGENT schreibt)
jahrgangsstufe: R7 Mittelschule Bayern
fach: GPG
vorgaenger_mappe: keine (erste Mappe)
```

### mat-1-2: Bildquelle (Karte) → SUB_BILDQUELLE

```
mat_id: mat-1-2
titel: "Europakarte 1914: Buendnisse"
artefakt_ref: img-1-1
bild_daten: (aus INHALTSBASIS) Typ: karte, File:Map_Europe_alliances_1914-en.svg, CC-BY-SA 2.5
skript_chunk: SKRIPT Chunk 1, §3-§4 (Buendnisbildung)
tafelbild_knoten: k1-4 (Dreibund), k1-5 (Triple Entente)
```

### mat-1-3: Zeitleiste → SUB_ZEITLEISTE

```
mat_id: mat-1-3
titel: [Subagent formuliert als Leitfrage]
skript_chunk: SKRIPT Chunk 1, §3-§4 (Chronologie Buendnisbildung)
inhaltsbasis_chronologie: INHALTSBASIS Mappe 1, Zahlen/Daten
tafelbild_knoten: k1-4 (Dreibund), k1-5 (Triple Entente)
zeitspanne: 1879–1907
```

### mat-1-4: Quellentext (Buelow-Rede) → SUB_QUELLENTEXT

```
mat_id: mat-1-4
titel: "Platz an der Sonne — Deutschlands Anspruch"
artefakt_ref: zit-1-1
zitat_daten: (aus INHALTSBASIS) Sprecher: Bernhard von Buelow, Wortlaut: "Wir wollen niemand in den Schatten stellen, aber wir verlangen auch unseren Platz an der Sonne.", Kontext: Reichstagsrede 1897
skript_chunk: SKRIPT Chunk 1, §2 (Imperialismus)
tafelbild_knoten: k1-2 (Imperialismus)
```

### mat-1-5: Bildquelle (Wilhelm II.) → SUB_BILDQUELLE

```
mat_id: mat-1-5
titel: "Kaiser Wilhelm II."
artefakt_ref: img-1-2
bild_daten: (aus INHALTSBASIS) Typ: foto, File:Kaiser_Wilhelm_II_of_Germany_-_1902.jpg, Public Domain
skript_chunk: SKRIPT Chunk 1, §5 (Wettruestung, Flottenrivalitaet)
tafelbild_knoten: k1-6 (Wettruestung)
```

### mat-1-6: Tagebuch (Diplomat) → SUB_TAGEBUCH

```
mat_id: mat-1-6
titel: "Tagebuch eines Diplomaten"
artefakt_ref: rolle-1-1
rollenprofil: (aus INHALTSBASIS) Rolle: Diplomat im Auswaertigen Amt, Historische Basis: Diplomaten verhandelten Buendnisvertraege, erlebten Einkreisungsangst, Typische Erfahrung: Spannung zwischen Buendnispflege und Misstrauen
skript_chunk: SKRIPT Chunk 1, §3-§5 (Buendnisverhandlungen, Einkreisung)
tafelbild_knoten: k1-7 (Kettenreaktion)
mappe_titel: "Pulverfass Europa"
```

## Schritt 3: Qualitaets-Gate pro Material

Nach jeder Material-Produktion: Qualitaets-Gate aus dem jeweiligen Subagenten-Prompt durchlaufen. Ergebnis pro Material dokumentieren:

```
mat-1-1: Q1-Q10 [PASS/FAIL + Details]
mat-1-2: Q1-Q10 [PASS/FAIL + Details]
...
```

Bei FAIL: Nachbessern (1 Iteration). Falls nach Nachbesserung immer noch FAIL: Finding dokumentieren, trotzdem deployen (Prototyp-Zweck).

## Schritt 4: Stub-Aufgaben (Phase 2.2 — vereinfacht fuer Prototyp)

AGENT_RAETSEL ist noch nicht als Subagent implementiert. Fuer den Prototyp: 3 einfache Aufgaben erstellen, die den Engine-Flow testen:

```
aufgabe-1-1: multiple-choice
  Frage: "Welche Laender bildeten den Dreibund?"
  Optionen: ["Deutschland, Oesterreich-Ungarn, Italien", "Frankreich, Grossbritannien, Russland", "Deutschland, Frankreich, Italien", "Grossbritannien, Oesterreich-Ungarn, Russland"]
  Loesung: "Deutschland, Oesterreich-Ungarn, Italien"
  material_referenz: ["mat-1-2"]
  Tipps: [{"stufe": 1, "text": "Schau dir die Europakarte genau an."}, {"stufe": 2, "text": "Die gruen markierten Laender bilden den Dreibund."}, {"stufe": 3, "text": "Es sind drei Laender in Mittel- und Suedeuropa."}]
  Punkte: 10

aufgabe-1-2: lueckentext
  Frage: "Bernhard von Buelow forderte fuer Deutschland einen 'Platz an der ___'."
  Loesung: "Sonne"
  material_referenz: ["mat-1-4"]
  Tipps: [{"stufe": 1, "text": "Lies den Quellentext von Buelow genau."}, {"stufe": 2, "text": "Es geht um Kolonialpolitik — Deutschland wollte auch Kolonien."}, {"stufe": 3, "text": "Das Wort reimt sich auf Wonne."}]
  Punkte: 10

aufgabe-1-3: multiple-choice
  Frage: "Was bedeutet die Metapher 'Pulverfass Europa'?"
  Optionen: ["Europa war bereit fuer einen Krieg — ein kleiner Anlass genuegt", "Europa hatte zu viel Schiesspulver gelagert", "Die Fabriken in Europa produzierten Waffen", "Europa war von Vulkanen bedroht"]
  Loesung: "Europa war bereit fuer einen Krieg — ein kleiner Anlass genuegt"
  material_referenz: ["mat-1-1"]
  Tipps: [{"stufe": 1, "text": "Denk an ein Fass voller Schiesspulver. Was passiert, wenn ein Funke hineinfaellt?"}, {"stufe": 2, "text": "Die Buendnisse und Rivalitaeten machten Europa explosiv."}, {"stufe": 3, "text": "Ein einziger Konflikt konnte eine Kettenreaktion ausloesen."}]
  Punkte: 10
```

## Schritt 5: Assembly (Phase 2.3)

Baue das data.json zusammen. Struktur:

```json
{
  "meta": {
    "titel": "Der Erste Weltkrieg — Ursachen und Ausbruch",
    "fach": "GPG",
    "jahrgangsstufe": "R7 Mittelschule Bayern",
    "lehrplanbezug": "LB2 Zeit und Wandel, LB3 Politik und Gesellschaft",
    "schwierigkeit": "Basis",
    "geschaetzte_dauer_min": 25,
    "narrativ": "Sommer 1914. Europa steht am Abgrund. Sechs Grossmaechte belauern sich. Deine Aufgabe: Finde heraus, warum ein Kontinent in zwei feindliche Lager zerfallen ist — und warum das so gefaehrlich war."
  },
  "mappen": [
    {
      "id": "mappe-1",
      "titel": "Pulverfass Europa",
      "beschreibung": "Europa vor 1914 — Buendnisse, Rivalitaeten und ein Kontinent am Abgrund.",
      "freischalt_code": "PULVER",
      "einstieg": { ... },
      "materialien": [ ... die 6 Material-JSONs aus Schritt 2 ... ],
      "aufgaben": [ ... die 3 Stub-Aufgaben aus Schritt 4 ... ],
      "sicherung": { ... Tafelbild + Zusammenfassung + Grey-Zitat (zit-1-2) + Ueberleitung ... },
      "quellenangaben": [ ... aggregiert aus allen Material-Outputs ... ]
    }
  ]
}
```

**Nur 1 Mappe im Prototyp.** Keine Mappen 2-4.

### Einstieg (aus MATERIAL_GERUEST Mappe 1)

```json
{
  "narrativ": "<p>Sommer 1914. Europa ist in zwei feindliche Lager gespalten. Sechs Grossmaechte belauern sich — bereit zum Krieg. Doch wie konnte es so weit kommen?</p>",
  "problemstellung": "Warum war Europa vor 1914 ein 'Pulverfass' — und warum genuegt ein einziger Funke?"
}
```

### Sicherung (aus MATERIAL_GERUEST Mappe 1)

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
  "zusammenfassung": "Europa war vor 1914 ein Pulverfass: Imperialismus, Nationalismus und Wettruestung hatten den Kontinent in zwei feindliche Buendnisbloecke gespalten. Jeder kleine Konflikt konnte durch die Buendnispflichten eine Kettenreaktion ausloesen. Der britische Aussenminister Edward Grey fasste es spaeter zusammen: 'The lamps are going out all over Europe, we shall not see them lit again in our lifetime.'",
  "ueberleitung": "Doch wo ist der Funke? Am 28. Juni 1914 faellt in Sarajevo ein Schuss, der die Welt veraendert."
}
```

## Schritt 6: Engine-Kompatibilitaet pruefen

Lies `assets/js/escape-engine.js` und pruefe:

1. Welche `typ`-Werte unterstuetzt die Material-Rendering-Logik? (`_renderMaterial*`-Funktionen)
2. Stimmt das Tafelbild-Schema (knoten[], verbindungen[], voraussetzungen[]) mit der Engine ueberein?
3. Funktioniert die Zeitleiste mit dem `[{datum, text}]`-Array-Format?
4. Wie rendert die Engine `einstieg` (narrativ + problemstellung)?
5. Gibt es ein `quellenangaben[]`-Rendering?
6. Stimmt das `bildunterschrift`-Feld bei bildquelle?

Falls Inkompatibilitaeten: data.json an die Engine anpassen (Engine-Code NICHT aendern im Prototyp). Inkompatibilitaeten dokumentieren.

## Schritt 7: HTML-Dateien aktualisieren

- **index.html** (Game-Startseite): Titel "Der Erste Weltkrieg — Ursachen und Ausbruch". Nur 1 Mappe anzeigen. Hinweis "Prototyp — Mappe 1 von 4".
- **mappe-1.html**: Pruefen ob Pfade zu CSS/JS stimmen.
- **mappe-2/3/4.html**: Deaktivieren (umbenennen zu .bak oder Hinweis "Coming soon").
- **lehrkraft.html**: Code PULVER. Nur 1 Mappe. Loesungen anzeigen.

## Schritt 8: v1-Artefakte aufraeumen

Alte Markdown-Dateien im Game-Verzeichnis sind v1-Relikte:
```
didaktischer-rahmen.md, inhalt-mappe-*.md, raetsel-mappe-*.md, qualitaets-report.md
data-mvp-backup.json, data-v1-test.json
```
In `_archive/` verschieben (Git-Versionierung schuetzt vor Datenverlust).

## Schritt 9: Wikimedia-URLs verifizieren

Fuer jede Bild-URL im finalen data.json:
1. Pruefe ob URL erreichbar ist (kein 404)
2. Falls 404: `wikimedia_search_images` MCP-Tool mit Suchbegriff
3. Lizenz korrekt notiert

## Schritt 10: Git Commit + Push

```bash
git add escape-games/gpg-erster-weltkrieg-ursachen/data.json
git add escape-games/gpg-erster-weltkrieg-ursachen/index.html
git add escape-games/gpg-erster-weltkrieg-ursachen/lehrkraft.html
git commit -m "Phase 2.1 Prototyp: Mappe 1 mit Subagenten-produzierten Materialien"
git push origin main
```

---

## Erfolgskriterium

1. weitergehts.online/escape-games/gpg-erster-weltkrieg-ursachen/ laedt fehlerfrei
2. 6 Materialien werden korrekt angezeigt (Darstellungstext, Karte, Zeitleiste, Quellentext, Bildquelle, Tagebuch)
3. Bilder (Wikimedia) laden korrekt
4. Zeitleiste rendert als CSS-Timeline
5. Tafelbild wird nach Aufgaben-Loesung angezeigt
6. Stub-Aufgaben sind beantwortbar
7. Freischalt-Code PULVER funktioniert
8. Keine JavaScript-Konsolenfehler
9. Jedes Material hat das Qualitaets-Gate des jeweiligen Subagenten bestanden (oder Finding dokumentiert)

## Nach Abschluss

Melde den Abschluss in Cowork mit:

```
Update: Phase 2.1 Prototyp Mappe 1 deployed.
- Materialien: [PASS/FAIL pro mat-ID mit Details]
- Engine-Inkompatibilitaeten: [Liste oder "keine"]
- Bild-URLs: [alle OK / welche fehlgeschlagen]
- Tafelbild: [gerendert / nicht gerendert]
- Aufgaben-Flow: [funktioniert / Probleme]
- URL: weitergehts.online/escape-games/gpg-erster-weltkrieg-ursachen/
```
