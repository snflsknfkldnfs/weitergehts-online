# Uebergabe-Prompt: v3.8 Mappe-1-Migration (C2-C5 auf data.json)

**Datum:** 2026-03-30
**Von:** Cowork (Architektur-Pflege)
**An:** Claude Code (Implementierung)
**Vorgaenger:** U1-U10 abgeschlossen (d233b74, 862af13, 5650157), Engine-Erweiterung [[mat-id|Text]] (eigener Prompt)

---

## Pre-Flight

- [ ] `git status` — Working Tree sauber
- [ ] `git pull` — Aktuell mit origin/main
- [ ] `escape-games/gpg-erster-weltkrieg-ursachen/data.json` lesen (NICHT aus dem Prompt uebernehmen)
- [ ] Engine-Erweiterung `_parseInlineMaterialLinks` ist committed (Voraussetzung fuer C3)

Falls Pre-Flight fehlschlaegt: STOPP.

---

## Kontext

v3.8 definiert 5 Content-Constraints (C1-C5). C1 (Stundenfrage) ist bereits korrekt in der data.json vorhanden (`sicherung.tafelbild.stundenfrage`). C2-C5 erfordern Aenderungen an bestehenden Feldern in Mappe 1. Keine strukturellen Schema-Aenderungen — alle Felder existieren bereits.

**Betroffene Datei:** `escape-games/gpg-erster-weltkrieg-ursachen/data.json` — NUR Mappe 1 (`mappen[0]`).

**Nicht aendern:** Engine-Code, CSS, HTML-Templates, docs/**.

---

## C2: Material-Titel (Typ A / Typ B)

Zwei Titeltypen:
- **Typ A (Frage):** Fuer Materialien mit Erarbeitungsfunktion — Titel als Teilfrage oder praegnanter Kontextsatz
- **Typ B (Statement):** Fuer Bildquellen mit primaer ankernder/illustrierender Funktion — praegnanter Eindruck

### Typ-Zuordnung Mappe 1

| mat-ID | Typ | Position | Material-Art | Begruendung |
|--------|-----|----------|-------------|-------------|
| mat-1-1 | A | 1 | Darstellungstext | Erarbeitung |
| mat-1-4 | A | 2 | Quellentext | Erarbeitung |
| mat-1-8 | A | 3 | Bildquelle (Karikatur) | Erarbeitung — Karikatur erfordert Analyse |
| mat-1-5 | **B** | 4 | Bildquelle (Portrait) | Visueller Anker — Portrait illustriert Person |
| mat-1-7 | A | 5 | Karte | Erarbeitung |
| mat-1-3 | A | 6 | Zeitleiste | Erarbeitung — Titel bereits Frage |
| mat-1-2 | A | 7 | Karte | Erarbeitung |
| mat-1-6 | A | 8 | Tagebuch | Erarbeitung |
| mat-1-9 | **B** | 9 | Bildquelle (Foto) | Visueller Anker — Foto illustriert Wettruesting |

### Konkrete Aenderungen im `titel`-Feld

| mat-ID | Typ | Alt | Neu |
|--------|-----|-----|-----|
| mat-1-1 | A | "Pulverfass Europa — Spannungen vor 1914" | "Warum war Europa vor 1914 so gefährlich?" |
| mat-1-4 | A | "Platz an der Sonne — Deutschlands Anspruch" | "Was forderte Deutschland von der Welt?" |
| mat-1-8 | A | "Der Koloss von Rhodos — Karikatur zum Imperialismus" | "Wie weit ging der Griff nach Afrika?" |
| mat-1-5 | **B** | "Kaiser Wilhelm II." | "Kaiser Wilhelm II. — der Mann hinter der Weltpolitik" |
| mat-1-7 | A | "Bismarcks Bündnissystem — Europakarte vor 1890" | "Wie hielt Bismarck Europa im Gleichgewicht?" |
| mat-1-3 | — | "Wie spaltete sich Europa in zwei Lager?" | UNVERAENDERT (bereits Frage) |
| mat-1-2 | A | "Europakarte 1914: Bündnisse" | "In welche Lager war Europa 1914 gespalten?" |
| mat-1-6 | A | "Tagebuch eines Diplomaten" | "Wie fühlte sich die Spaltung Europas an?" |
| mat-1-9 | **B** | "Britisches Schlachtgeschwader (ca. 1914)" | "Die Macht der Flotten — Wettrüsten auf See" |

7 Aenderungen (mat-1-3 bleibt). Typ-B-Titel enden NICHT mit Fragezeichen.

**WICHTIG:** Titel-Texte oben verwenden echte UTF-8-Umlaute (ä, ö, ü, ß) — genau so in die data.json uebernehmen.

---

## C3: Inline-Material-Links in Tipps

Neue Konvention: `[[mat-id|Anzeigetext]]` — Engine rendert als klickbaren Link. Zusaetzlich `(M[position])` als Orientierungsmarker.

**Voraussetzung:** Engine-Erweiterung `_parseInlineMaterialLinks` ist committed.

### Mapping Mappe 1

```
mat-1-1 (position: 1) → M1    mat-1-5 (position: 4) → M4    mat-1-2 (position: 7) → M7
mat-1-4 (position: 2) → M2    mat-1-7 (position: 5) → M5    mat-1-6 (position: 8) → M8
mat-1-8 (position: 3) → M3    mat-1-3 (position: 6) → M6    mat-1-9 (position: 9) → M9
```

### Konkrete Aenderungen in `aufgaben[].tipps[].text`

#### aufgabe-1-1 (MC, material_referenz: mat-1-2)
- **Tipp 1 Alt:** "Schau dir die Europakarte 1914 genau an. Welche Länder sind grün markiert?"
- **Tipp 1 Neu:** "Schau dir die [[mat-1-2|Europakarte von 1914]] (M7) genau an. Welche Länder sind grün markiert?"
- Tipp 2, 3: Bleiben.

#### aufgabe-1-2 (Lueckentext, material_referenz: mat-1-4)
- **Tipp 1 Alt:** "Lies den Quellentext von Bülow genau durch."
- **Tipp 1 Neu:** "Lies den [[mat-1-4|Text von Bülow]] (M2) genau durch."
- Tipp 2, 3: Bleiben.

#### aufgabe-1-3 (MC, material_referenz: mat-1-7, mat-1-2)
- **Tipp 1 Alt:** "Schau dir beide Karten nacheinander an: Wie viele Farben/Gruppen gibt es auf jeder Karte?"
- **Tipp 1 Neu:** "Vergleiche die [[mat-1-7|Karte von Bismarcks Bündnissen]] (M5) mit der [[mat-1-2|Karte von 1914]] (M7): Wie viele Farben/Gruppen gibt es auf jeder Karte?"
- Tipp 2, 3: Bleiben.

#### aufgabe-1-4, aufgabe-1-5
- Keine Aenderungen (Tipps sind metaphorisch/bildlich ohne generische Typbezeichnung).

---

## C4: Didaktische Bildunterschriften

Die `bildunterschrift`-Felder der Bildquellen und Karten sollen rein didaktisch sein — Identifikation + Kontextualisierung fuer SuS. Quellenangaben (Kuenstler, Fotograf, Jahreszahl als Quellennachweis) gehoeren ausschliesslich in `quelle` + `lizenz`.

### mat-1-8 (bildquelle, position 3)
**Alt:** "The Rhodes Colossus: Cecil Rhodes als Riese, der mit gespreizten Beinen von Kairo bis Kapstadt steht. Karikatur von Edward Linley Sambourne, Punch, 1892."
**Neu:** "Cecil Rhodes als Riese, der mit gespreizten Beinen von Kairo bis Kapstadt steht — so stellte sich eine britische Zeitschrift den Griff nach ganz Afrika vor."

### mat-1-5 (bildquelle, position 4)
**Alt:** "Kaiser Wilhelm II. in Uniform, 1902 (Hofphotograph T. H. Voigt). Als Deutscher Kaiser (1888–1918) trieb er die Flottenrüstung voran und forderte Deutschlands 'Platz an der Sonne'."
**Neu:** "Kaiser Wilhelm II. in Paradeuniform. Als Deutscher Kaiser (1888–1918) trieb er die Flottenrüstung voran und forderte Deutschlands 'Platz an der Sonne'."

### mat-1-9 (bildquelle, position 9)
**Alt:** "Schiffe des 2. Schlachtgeschwaders der britischen Grand Fleet, ca. 1914. Die Flottenrüstung zwischen Deutschland und Großbritannien war ein zentraler Teil der Wettrüstung vor 1914."
**Neu:** "Kriegsschiffe der britischen Flotte kurz vor dem Ersten Weltkrieg. Deutschland und Großbritannien lieferten sich einen Wettlauf um die stärkste Marine — ein Zeichen dafür, wie angespannt die Lage war."

### mat-1-2 (karte, position 7)
**Alt:** "Europas Militärbündnisse 1914: Dreibund (grün: Deutschland, Österreich-Ungarn, Italien) und Triple Entente (lila: Frankreich, Russland, Großbritannien)."
**Neu:** "Europa 1914 — zwei feindliche Lager: Dreibund (grün) gegen Triple Entente (lila). Finde die sechs Großmächte und ordne sie den Bündnissen zu."

### mat-1-7 (karte, position 5)
Bleibt — bereits didaktisch ("Vergleiche mit der Karte von 1914 — was hat sich verändert?").

---

## C5: Abschluss-Impuls Variante A (Ueberleitung)

Mappe 1 ist NICHT die letzte Mappe → Variante A (impulsartige Ueberleitung, keine Frageform).

### sicherung.ueberleitung
**Alt:** "Doch wo ist der Funke? Am 28. Juni 1914 fällt in Sarajevo ein Schuss, der die Welt verändert."
**Neu:** "Wie ein einzelner Schuss in Sarajevo das Pulverfass zum Explodieren brachte, erfährst du in der nächsten Mappe."

### sicherung.reflexionsimpuls
**Alt:** "Warum konnte ein einzelner Schuss einen ganzen Kontinent in den Krieg stürzen?"
**Neu:** "Das Pulverfass war gefüllt — der Funke kam am 28. Juni 1914 in Sarajevo. Weiter in der nächsten Mappe."

(Reflexionsimpuls wird bei Variante A ebenfalls zur Ueberleitung. Keine Frageform.)

### sicherung.transfer.frage
**Alt:** "Doch wo war der Funke?"
**Neu:** "Weiter zur nächsten Mappe: Der Funke fällt in Sarajevo."

---

## Zusammenfassung der Aenderungen

| Constraint | Anzahl Aenderungen | Felder |
|------------|-------------------|--------|
| C2 | 7 Titel (5x Typ A, 2x Typ B) | `materialien[].titel` |
| C3 | 3 Tipps | `aufgaben[].tipps[].text` |
| C4 | 4 Bildunterschriften | `materialien[].bildunterschrift` |
| C5 | 3 Abschluss-Felder | `sicherung.ueberleitung`, `sicherung.reflexionsimpuls`, `sicherung.transfer.frage` |
| **Gesamt** | **17 Feldaenderungen** | Nur String-Werte, kein Schema-Change |

---

## Merge-Schutz

**NUR diese Datei aendern:** `escape-games/gpg-erster-weltkrieg-ursachen/data.json`

**NICHT aendern:** `docs/**`, Engine-Code, CSS, HTML-Templates, andere data.json.

---

## Ausfuehrungsreihenfolge

1. **Zuerst:** Engine-Erweiterung (UEBERGABE_v3-8_ENGINE_INLINE_LINKS.md) muss committed sein
2. **Dann:** Diese Migration ausfuehren

---

## Verifikations-Checkliste

Nach Implementierung pruefen:

1. [ ] JSON ist valide (`python3 -c "import json; json.load(open('data.json'))"`)
2. [ ] 5 Typ-A-Titel enden mit "?" (mat-1-1, mat-1-4, mat-1-8, mat-1-7, mat-1-2, mat-1-6)
3. [ ] 2 Typ-B-Titel enden NICHT mit "?" (mat-1-5, mat-1-9)
4. [ ] mat-1-3 Titel ist unveraendert ("Wie spaltete sich Europa in zwei Lager?")
5. [ ] Tipp in aufgabe-1-1 enthaelt `[[mat-1-2|Europakarte von 1914]]`
6. [ ] Tipp in aufgabe-1-2 enthaelt `[[mat-1-4|Text von Bülow]]`
7. [ ] Tipp in aufgabe-1-3 enthaelt `[[mat-1-7|` und `[[mat-1-2|`
8. [ ] mat-1-8 bildunterschrift enthaelt NICHT "Edward Linley Sambourne" oder "Punch, 1892"
9. [ ] mat-1-5 bildunterschrift enthaelt NICHT "Hofphotograph T. H. Voigt"
10. [ ] mat-1-9 bildunterschrift enthaelt NICHT "2. Schlachtgeschwaders"
11. [ ] sicherung.ueberleitung enthaelt KEIN Fragezeichen
12. [ ] sicherung.reflexionsimpuls enthaelt KEIN Fragezeichen
13. [ ] Alle `quelle`- und `lizenz`-Felder sind unveraendert
14. [ ] Alle `inhalt`-Felder sind unveraendert
15. [ ] Alle `id`-, `position`-, `typ`-Felder sind unveraendert
16. [ ] Website im Browser laden: Tipps mit [[...]]-Markup zeigen klickbare Links

---

## Commit-Konvention

```
v3.8: Mappe-1-Migration C2-C5 (Titel Typ A/B, Inline-Links, Bildunterschriften, Ueberleitung)
```
