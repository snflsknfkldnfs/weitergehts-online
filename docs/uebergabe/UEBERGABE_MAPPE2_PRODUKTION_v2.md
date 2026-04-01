# Uebergabe: Mappe 2 Produktion — Das Attentat von Sarajevo (v2)

**Datum:** 2026-03-30
**Von:** Cowork (Projektmanagement)
**An:** Claude Code (Produktion)
**Ersetzt:** UEBERGABE_MAPPE2_PRODUKTION.md (v1 — gescheitert: Subagenten nicht dispatched)
**Commit-Prefix:** `v3.8:`

---

## KRITISCHE ANWEISUNG

Dieser Prompt verwendet eine **Subagenten-Architektur**. Du MUSST fuer JEDES Material und JEDE Aufgabe den angegebenen Subagenten-Prompt LESEN und dessen Produktionsregeln BEFOLGEN. Monolithische Produktion ohne Subagenten-Lektuere ist ein schwerer Prozessverstoss.

**Kanonische Dispatch-Sequenz:** `docs/architektur/WORKFLOW_v2.md`, Zeilen 626-648.

---

## Pre-Flight

- [ ] `git status` — Working Tree sauber
- [ ] `git pull` — Aktuell mit origin/main
- [ ] Revert ausfuehren: `git revert --no-edit a6aa589` (entfernt fehlgeschlagene Mappe 2)
- [ ] `git push origin main` (Revert committen)
- [ ] `escape-games/gpg-erster-weltkrieg-ursachen/data.json` lesen — MUSS genau 1 Mappe enthalten (mappe-1)
- [ ] Pruefe: data.json enthaelt KEINE mappe-2 (nach Revert)

Falls Pre-Flight fehlschlaegt: STOPP.

---

## Eingabe-Dokumente

| Dokument | Pfad | Rolle |
|---|---|---|
| MATERIAL_GERUEST Mappe 2 | `docs/agents/artefakte/MATERIAL_GERUEST_gpg-erster-weltkrieg-ursachen_Mappe2.md` | Was wird produziert (6 Materialien, Tafelbild, Einstieg, Sicherung) |
| SKRIPT Chunk 2 | `docs/agents/artefakte/SKRIPT_gpg-erster-weltkrieg-ursachen.md` (Abschnitt "Chunk 2") | Textgrundlage §1-§5 |
| INHALTSBASIS Mappe 2 | `docs/agents/artefakte/INHALTSBASIS_gpg-erster-weltkrieg-ursachen.md` (Abschnitt "Mappe 2") | Fakten, Chronologie, Wikimedia-Artefakte, Rollenprofile, Zitate |
| DIDAKTIK_RAHMEN | `docs/agents/artefakte/DIDAKTIK_RAHMEN_gpg-erster-weltkrieg-ursachen.md` | Lernziele (TZ2), KE-Matrix, AFB-Profil Mappe 2: AFB II |
| AGENT_MATERIAL | `docs/agents/AGENT_MATERIAL.md` | Orchestrator-Logik, Produktionskontext-Template |
| AGENT_RAETSEL | `docs/agents/AGENT_RAETSEL.md` | Aufgaben-Orchestrator-Logik, Progressionsplan, Konstruktionskontext |

**Lies alle 6 Dokumente ZUERST**, bevor du mit Schritt 1 beginnst.

---

## Subagenten-Prompts (Material)

| Subagent | Prompt-Datei | Fuer mat-IDs |
|---|---|---|
| SUB_MATERIAL_DARSTELLUNGSTEXT | `docs/agents/SUB_MATERIAL_DARSTELLUNGSTEXT.md` | mat-2-1 |
| SUB_MATERIAL_BILDQUELLE | `docs/agents/SUB_MATERIAL_BILDQUELLE.md` | mat-2-2, mat-2-3 |
| SUB_MATERIAL_QUELLENTEXT | `docs/agents/SUB_MATERIAL_QUELLENTEXT.md` | mat-2-4 |
| SUB_MATERIAL_ZEITLEISTE | `docs/agents/SUB_MATERIAL_ZEITLEISTE.md` | mat-2-5 |
| SUB_MATERIAL_TAGEBUCH | `docs/agents/SUB_MATERIAL_TAGEBUCH.md` | mat-2-6 |

**PFLICHT:** Lies JEDEN Subagenten-Prompt VOR Produktion des jeweiligen Materials.

## Subagenten-Prompts (Aufgaben)

| Subagent | Prompt-Datei |
|---|---|
| SUB_AUFGABE_MC | `docs/agents/SUB_AUFGABE_MC.md` |
| SUB_AUFGABE_ZUORDNUNG | `docs/agents/SUB_AUFGABE_ZUORDNUNG.md` |
| SUB_AUFGABE_LUECKENTEXT | `docs/agents/SUB_AUFGABE_LUECKENTEXT.md` |
| SUB_AUFGABE_REIHENFOLGE | `docs/agents/SUB_AUFGABE_REIHENFOLGE.md` |
| SUB_AUFGABE_FREITEXT | `docs/agents/SUB_AUFGABE_FREITEXT.md` |

**PFLICHT:** Lies den jeweiligen Subagenten-Prompt VOR Konstruktion der jeweiligen Aufgabe.

---

## v3.8 Content-Constraints (C1-C5)

Diese Constraints gelten fuer ALLE produzierten Inhalte:

### C1b: Identitaets-Constraint
`einstieg.problemstellung` === `sicherung.tafelbild.stundenfrage` === SKRIPT-Chunk-Ueberschrift (wortidentisch).

**Mappe 2 Stundenfrage:** "Warum führte ein Mord in Sarajevo zum Weltkrieg?"

### C2: Material-Titel (Typ A / Typ B)
- **Typ A (Frage):** Materialien mit Erarbeitungsfunktion — Titel als Teilfrage
- **Typ B (Statement):** Bildquellen mit primaer illustrierender Funktion — praegnanter Eindruck, KEIN Fragezeichen

Typ-Zuordnung Mappe 2:

| mat-ID | Typ | Begruendung |
|--------|-----|-------------|
| mat-2-1 | A | Darstellungstext, Erarbeitung |
| mat-2-2 | B | Bildquelle, visueller Anker (Illustration) |
| mat-2-3 | B | Bildquelle, visueller Anker (Foto) |
| mat-2-4 | A | Quellentext, Erarbeitung |
| mat-2-5 | A | Zeitleiste, Erarbeitung |
| mat-2-6 | A | Tagebuch, Erarbeitung |

### C3: Inline-Material-Links
In `tipps[].text` und `fragestamm`: `[[mat-id|Anzeigetext]]` mit `(M[position])` als Orientierungsmarker.
Engine rendert diese automatisch als klickbare Links.

### C4: Didaktische Bildunterschriften
`bildunterschrift`-Felder: Identifikation + Kontextualisierung fuer SuS. Quellenangaben (Kuenstler, Jahreszahl) NUR in `quelle` + `lizenz`. Keine Quelleninfo in der Bildunterschrift.

### C5: Abschluss-Impuls
Mappe 2 ist NICHT die letzte Mappe (4 Mappen gesamt) → **Variante A** (impulsartige Ueberleitung zur naechsten Mappe, keine Frageform).

---

## Schritt 0: Revert + Bilder herunterladen

### 0a: Revert (in Pre-Flight)

Bereits in Pre-Flight abgehandelt.

### 0b: Wikimedia-Bilder herunterladen

Lege Bilder unter `assets/img/gpg-erster-weltkrieg-ursachen/` ab.

| Artefakt-ID | Wikimedia-Dateiname | Lokaler Dateiname | Lizenz |
|---|---|---|---|
| img-2-1 | `File:DC-1914-27-d-Sarajevo-cropped.jpg` | `img-2-1.jpg` | Public Domain |
| img-2-2 | `File:Postcard_for_the_assassination_of_Archduke_Franz_Ferdinand_in_Sarajevo.jpg` | `img-2-2.jpg` | CC-BY-SA 3.0 |

Pruefe nach Download: Dateien existieren und sind > 10KB.

img-2-3 wird NICHT verwendet (Reserve laut MATERIAL_GERUEST).

---

## Schritt 1: Material-Produktion (Phase 2.1)

**Kanonische Sequenz (WORKFLOW_v2.md Z.626-648):**
1. Materialtyp bestimmen → Subagent waehlen
2. Eingabe-Paket zusammenstellen (mat-ID + Artefakt-Ref + SKRIPT-Passage + Tafelbild-Knoten)
3. Subagent-Prompt LESEN
4. Material produzieren nach Subagenten-Regeln
5. Q-GATE LOG schreiben (PFLICHT)
6. Bei FAIL: 1 Nachbesserung, dann Finding dokumentieren
7. Bei PASS: Material in materialien[] aufnehmen

### mat-2-1: Darstellungstext → SUB_MATERIAL_DARSTELLUNGSTEXT

**Lies:** `docs/agents/SUB_MATERIAL_DARSTELLUNGSTEXT.md`

```
mat_id: mat-2-1
titel: [Typ A — Frage formulieren, z.B. "Warum fielen in Sarajevo die Schuesse?"]
skript_chunk: SKRIPT Chunk 2, §1-§3 (Balkankrise, Attentat, Ursache-vs-Ausloeser)
tafelbild_knoten: k2-6 (Balkankrise), k2-1 (Attentat), k2-2 (Ursache vs. Ausloeser)
artefakt_ref: — (AGENT schreibt aus SKRIPT)
jahrgangsstufe: R7 Mittelschule Bayern
fach: GPG
vorgaenger_mappe: Mappe 1 "Pulverfass Europa" (Buendnisse, Imperialismus, Nationalismus)
funktion: Erarbeitung — Sachtext erklaert Balkankrise, Attentat und fuehrt Ursache-Ausloeser-Unterscheidung ein
```

**Q-Gate-Log mat-2-1:** `[PASS/FAIL + MQ1-MQ5 Details]`

---

### mat-2-2: Bildquelle (Illustration Beltrame) → SUB_MATERIAL_BILDQUELLE

**Lies:** `docs/agents/SUB_MATERIAL_BILDQUELLE.md`

```
mat_id: mat-2-2
titel: [Typ B — Statement, z.B. "Der Moment des Attentats — eine zeitgenoessische Illustration"]
artefakt_ref: img-2-1
bild_pfad: assets/img/gpg-erster-weltkrieg-ursachen/img-2-1.jpg
bild_daten: Typ: illustration, Kuenstler: Achille Beltrame, Publikation: Domenica del Corriere
lizenz: Public Domain
skript_chunk: SKRIPT Chunk 2, §2 (Attentat)
tafelbild_knoten: k2-1 (Attentat von Sarajevo)
bildunterschrift: [C4 — didaktisch, KEINE Quelleninfo. Z.B. "So stellte eine italienische Zeitung das Attentat dar — Gavrilo Princip erschiesst den Thronfolger und seine Frau."]
```

**Q-Gate-Log mat-2-2:** `[PASS/FAIL + MQ1-MQ5 Details]`

---

### mat-2-3: Bildquelle (Foto Franz Ferdinand) → SUB_MATERIAL_BILDQUELLE

**Lies:** `docs/agents/SUB_MATERIAL_BILDQUELLE.md` (bereits gelesen — Regeln anwenden)

```
mat_id: mat-2-3
titel: [Typ B — Statement, z.B. "Die letzten Minuten — Franz Ferdinand und Sophie in Sarajevo"]
artefakt_ref: img-2-2
bild_pfad: assets/img/gpg-erster-weltkrieg-ursachen/img-2-2.jpg
bild_daten: Typ: foto, historisches Foto vom 28.6.1914
lizenz: CC-BY-SA 3.0
skript_chunk: SKRIPT Chunk 2, §2 (Attentat)
tafelbild_knoten: k2-1 (Attentat von Sarajevo)
bildunterschrift: [C4 — didaktisch. Z.B. "Franz Ferdinand und Sophie verlassen das Rathaus von Sarajevo — wenige Minuten spaeter sind beide tot."]
```

**Q-Gate-Log mat-2-3:** `[PASS/FAIL + MQ1-MQ5 Details]`

---

### mat-2-4: Quellentext (Ultimatum) → SUB_MATERIAL_QUELLENTEXT

**Lies:** `docs/agents/SUB_MATERIAL_QUELLENTEXT.md`

```
mat_id: mat-2-4
titel: [Typ A — Frage, z.B. "Welche Forderungen stellte Oesterreich-Ungarn an Serbien?"]
artefakt_ref: zit-2-2
zitat_daten:
  sprecher: Oesterreich-Ungarns Regierung (paraphrasiert)
  wortlaut: "Oesterreich-Ungarn stellte Serbien ein Ultimatum mit bewusst unannehmbaren Forderungen — darunter die Teilnahme oesterreichischer Beamter an Ermittlungen auf serbischem Boden."
  kontext: 23. Juli 1914, 48-Stunden-Frist
  quelle: Wikipedia: July Crisis, Summary
skript_chunk: SKRIPT Chunk 2, §4 (Julikrise, Blankoscheck, Ultimatum)
tafelbild_knoten: k2-3 (Julikrise), k2-4 (Blankoscheck)
quellentyp: Paraphrase eines historischen Dokuments
```

**Q-Gate-Log mat-2-4:** `[PASS/FAIL + MQ1-MQ5 Details]`

---

### mat-2-5: Zeitleiste (Julikrise) → SUB_MATERIAL_ZEITLEISTE

**Lies:** `docs/agents/SUB_MATERIAL_ZEITLEISTE.md`

```
mat_id: mat-2-5
titel: [Typ A — Frage, z.B. "Wie wurde aus einem Mord ein Weltkrieg in nur sechs Wochen?"]
skript_chunk: SKRIPT Chunk 2, §4-§5 (Julikrise-Chronologie)
inhaltsbasis_chronologie: INHALTSBASIS Mappe 2, Zahlen/Daten:
  - 28. Juni 1914: Attentat in Sarajevo
  - 5./6. Juli 1914: Blankoscheck (DE → OeU)
  - 23. Juli 1914: Ultimatum an Serbien (48h)
  - 25. Juli 1914: Serbien akzeptiert weitgehend, aber nicht vollstaendig
  - 28. Juli 1914: Kriegserklaerung OeU → Serbien
  - 30. Juli 1914: Russische Generalmobilmachung
  - 1. August 1914: Kriegserklaerung DE → Russland
  - 3. August 1914: Kriegserklaerung DE → Frankreich
  - 4. August 1914: Einmarsch in Belgien, GB erklaert DE den Krieg
tafelbild_knoten: k2-3 (Julikrise), k2-4 (Blankoscheck), k2-5 (Kettenreaktion)
zeitspanne: 28. Juni – 4. August 1914
max_eintraege: 8 (Subagent-Regel)
```

**Q-Gate-Log mat-2-5:** `[PASS/FAIL + MQ1-MQ5 Details]`

---

### mat-2-6: Tagebuch (Bewohner:in Sarajevo) → SUB_MATERIAL_TAGEBUCH

**Lies:** `docs/agents/SUB_MATERIAL_TAGEBUCH.md`

```
mat_id: mat-2-6
titel: [Typ A — Frage, z.B. "Wie erlebte ein Mensch in Sarajevo den 28. Juni 1914?"]
artefakt_ref: rolle-2-1
rollenprofil:
  rolle: Bewohner:in von Sarajevo
  historische_basis: Multiethnische Stadt unter oesterreichisch-ungarischer Verwaltung seit 1878, Spannungen zwischen serbischer, kroatischer und muslimischer Bevoelkerung
  typische_erfahrung: Erlebt das Attentat als Schock, Angst vor Vergeltung; serbische Bewohner werden verdaechtigt und verhaftet
  wikipedia_beleg: Assassination of Archduke Franz Ferdinand, Summary; Bosnian crisis, Summary
skript_chunk: SKRIPT Chunk 2, §1/§2 (Balkankrise, Attentat)
tafelbild_knoten: k2-6 (Balkankrise), k2-1 (Attentat)
mappe_titel: "Das Attentat von Sarajevo"
engine_typ: quellentext (Engine kennt keinen Tagebuch-Renderer)
```

**Q-Gate-Log mat-2-6:** `[PASS/FAIL + MQ1-MQ5 Details]`

---

## Schritt 2: Aufgaben-Produktion (Phase 2.2)

### 2a: AGENT_RAETSEL — Orchestration

**Lies:** `docs/agents/AGENT_RAETSEL.md` (komplett)

Erstelle den **Progressionsplan** (5 Aufgaben, AFB I → II-III steigend) basierend auf:
- Fertige materialien[] aus Schritt 1
- Tafelbild (6 Knoten, 6 Verbindungen)
- DIDAKTIK_RAHMEN TZ2 (AFB II: Ursache-Ausloeser-Unterscheidung)
- AFB-Profil Mappe 2: Schwerpunkt AFB II

Pro Aufgabe: Operationalisierungsziel herleiten, Konstruktionskontext generieren, Typ zuweisen.

**Freischalt-Code:** Thematisch, A-Z, 4-8 Zeichen (z.B. SARAJEVO, FUNKE, JULIKRISE).

### 2b: Aufgaben-Dispatch (Phase 2.2b)

Fuer JEDE der 5 Aufgaben:

1. Typ bestimmen (aus Progressionsplan)
2. Subagenten-Prompt LESEN (`docs/agents/SUB_AUFGABE_[TYP].md`)
3. Konstruktionskontext uebergeben (Ziel-Material Volltext + Material-Zusammenfassungen + TB-Knoten + AFB + Position)
4. Aufgabe produzieren nach Subagenten-Regeln
5. Q-Gate-Log schreiben (PFLICHT)
6. Bei FAIL: 1 Nachbesserung

**Aufgabe 1:**
```
position: 1
typ: [aus Progressionsplan]
afb: I
subagent: [SUB_AUFGABE_MC / SUB_AUFGABE_ZUORDNUNG / ...]
→ Lies: docs/agents/SUB_AUFGABE_[TYP].md
konstruktionskontext: [Ziel-Material, TB-Knoten, Operationalisierungsziel]
```
**Q-Gate-Log aufgabe-2-1:** `[PASS/FAIL + A1-A7 Details]`

**Aufgabe 2:**
```
position: 2
typ: [aus Progressionsplan]
afb: I-II
subagent: [SUB_AUFGABE_...]
→ Lies: docs/agents/SUB_AUFGABE_[TYP].md
konstruktionskontext: [...]
```
**Q-Gate-Log aufgabe-2-2:** `[PASS/FAIL + A1-A7 Details]`

**Aufgabe 3:**
```
position: 3
typ: [aus Progressionsplan]
afb: II
subagent: [SUB_AUFGABE_...]
→ Lies: docs/agents/SUB_AUFGABE_[TYP].md
konstruktionskontext: [...]
```
**Q-Gate-Log aufgabe-2-3:** `[PASS/FAIL + A1-A7 Details]`

**Aufgabe 4:**
```
position: 4
typ: [aus Progressionsplan]
afb: II
subagent: [SUB_AUFGABE_...]
→ Lies: docs/agents/SUB_AUFGABE_[TYP].md
konstruktionskontext: [...]
```
**Q-Gate-Log aufgabe-2-4:** `[PASS/FAIL + A1-A7 Details]`

**Aufgabe 5:**
```
position: 5
typ: freitext-code
afb: II-III
subagent: SUB_AUFGABE_FREITEXT
→ Lies: docs/agents/SUB_AUFGABE_FREITEXT.md
konstruktionskontext: Reflexionsaufgabe — Ursache vs. Ausloeser auf aktuelles Beispiel transferieren (KE-B Anforderung)
```
**Q-Gate-Log aufgabe-2-5:** `[PASS/FAIL + A1-A7 + A11-FT Details]`

### 2c: Cross-Konsistenz (Phase 2.2c)

Nach allen 5 Aufgaben — Orchestrator-Q-Gate:
- [ ] A1 AFB-Kongruenz Gesamtbild
- [ ] A3 Material-Kongruenz: Alle 6 Materialien in mind. 1 Aufgabe referenziert?
- [ ] A5 Schwierigkeits-Progression: Monoton steigend?
- [ ] A8 Kognitive Aktivierung: Mind. 1 denkanregende Aufgabe?
- [ ] A9 TB-Bezug: Mind. 1 Aufgabe pro TB-Knoten?

### C3 Inline-Material-Links

Alle Tipps MUESSEN `[[mat-id|Anzeigetext]]` verwenden wo Material referenziert wird.
Position-Mapping: mat-2-1=M1, mat-2-2=M2, mat-2-3=M3, mat-2-4=M4, mat-2-5=M5, mat-2-6=M6.

---

## Schritt 3: Tafelbild (SCPL-Format)

Tafelbild als JSON im SCPL-Format (situation → complication[] → problem → loesung[]):

```
tafelbild: {
  stundenfrage: "Warum führte ein Mord in Sarajevo zum Weltkrieg?",   ← C1b: wortidentisch mit einstieg.problemstellung
  knoten: [ k2-1 bis k2-6 aus MATERIAL_GERUEST ],
  verbindungen: [ 6 Verbindungen aus MATERIAL_GERUEST ],
  voraussetzungen: ["k1-1", "k1-4", "k1-5", "k1-7"],
  merksaetze: [ pro TB-Knoten 1 Merksatz ],
  scpl: {
    situation: "...",
    complication: ["...", "..."],
    problem: "...",
    loesung: ["...", "..."]
  }
}
```

---

## Schritt 4: Einstieg + Sicherung

### Einstieg

Aus MATERIAL_GERUEST Mappe 2:

```json
{
  "narrativ": "<p>Europa ist ein Pulverfass — zwei Bündnisblöcke stehen sich gegenüber, bewaffnet und misstrauisch. Doch noch herrscht Frieden. Dann, am 28. Juni 1914, fallen in Sarajevo Schüsse. Was genau passiert dort? Und wie kann ein einziger Mord einen Weltkrieg auslösen?</p>",
  "problemstellung": "Warum führte ein Mord in Sarajevo zum Weltkrieg?"
}
```

**C1b-Check:** `problemstellung` === `tafelbild.stundenfrage` → beide: "Warum führte ein Mord in Sarajevo zum Weltkrieg?"

### Sicherung

Aus MATERIAL_GERUEST Mappe 2 + C5 Variante A:

```json
{
  "zusammenfassung": "Das Attentat von Sarajevo war der Auslöser, aber nicht die Ursache des Krieges. Die Ursachen — Bündnisse, Rivalitäten, Misstrauen — lagen schon vorher bereit. Die Julikrise zeigt, wie schnell aus einem Mord ein Weltkrieg werden kann, wenn ein System aus Bündnispflichten und Blankoschecks die Eskalation antreibt.",
  "zitat": {
    "text": "The ostensible reason for armed conflict — the assassination of an archduke — had already become a side-note to a larger European war.",
    "quelle": "Wikipedia: July Crisis, Summary",
    "einbindung": "Schlusszitat: Der Anlass wurde zur Nebensache."
  },
  "ueberleitung": "Millionen Soldaten stehen nun bereit. Wie die Menschen auf den Kriegsausbruch reagierten — mit Angst oder mit Begeisterung — erfährst du in der nächsten Mappe.",
  "reflexionsimpuls": "Das Pulverfass explodierte — doch wie reagierten die Menschen? Weiter in der nächsten Mappe.",
  "tafelbild": { ... siehe Schritt 3 ... }
}
```

**C5-Check:** Ueberleitung und Reflexionsimpuls sind Variante A (impulsartig, keine Frageform, verweisen auf naechste Mappe).

---

## Schritt 5: Assembly — Mappe-Anhang-Prozedur

**Kanonische Prozedur:** `docs/agents/ORCHESTRATOR.md`, Zeilen 120-131.

1. **data.json lesen** — Aktuelle Version aus Repo (NICHT aus diesem Prompt). MUSS genau 1 Mappe enthalten.
2. **mappen[1] anfuegen** — Neues Mappe-2-Objekt als zweites Element in `mappen[]`.
3. **meta unveraendert** — `meta{}` wird NICHT modifiziert.
4. **mappen[0] unveraendert** — Mappe 1 wird NICHT angefasst.
5. **Ueberleitung Mappe 1 pruefen** — Mappe 1 hat bereits C5-Ueberleitung ("Wie ein einzelner Schuss in Sarajevo das Pulverfass zum Explodieren brachte, erfährst du in der nächsten Mappe."). Falls spezifischer gewuenscht: einzige erlaubte Aenderung.
6. **mappe-2.html erstellen** — Kopiere `mappe-1.html`, aendere Mappe-Index auf 1 (0-basiert).

### Mappe-2-Struktur

```json
{
  "id": "mappe-2",
  "titel": "Das Attentat von Sarajevo",
  "beschreibung": "Der Funke im Pulverfass — ein Mord in Sarajevo, die Julikrise und der Weg in den Weltkrieg.",
  "freischalt_code": "[aus Schritt 2a]",
  "einstieg": { ... aus Schritt 4 ... },
  "materialien": [ ... 6 Material-JSONs aus Schritt 1 ... ],
  "aufgaben": [ ... 5 Aufgaben-JSONs aus Schritt 2 ... ],
  "sicherung": { ... aus Schritt 4 ... }
}
```

---

## Schritt 6: Validierung

1. **JSON-Validierung:** `python3 -c "import json; json.load(open('escape-games/gpg-erster-weltkrieg-ursachen/data.json'))"` (PFLICHT)
2. **C1b-Check:** `einstieg.problemstellung` === `sicherung.tafelbild.stundenfrage` (wortidentisch)
3. **Materialien-Count:** Genau 6 Materialien in mappe-2
4. **Aufgaben-Count:** Genau 5 Aufgaben in mappe-2
5. **Mappe-1-Integritaet:** mappen[0] unveraendert gegenueber Pre-Flight
6. **Engine-Typ-Check:** Alle `typ`-Werte in {darstellungstext, quellentext, bildquelle, zeitleiste} (Engine-kompatibel). Tagebuch → quellentext, Karte → bildquelle.
7. **Aufgabentyp-Check:** Alle Aufgabentypen in {multiple-choice, zuordnung, lueckentext, reihenfolge, freitext-code}
8. **Tipp-Stufung:** Jede Aufgabe hat genau 3 Tipps (Stufe 1-2-3)
9. **Inline-Links:** Tipps mit Material-Referenz verwenden `[[mat-id|Text]]`

---

## Schritt 7: Git Commit + Push

```bash
git add assets/img/gpg-erster-weltkrieg-ursachen/img-2-1.jpg
git add assets/img/gpg-erster-weltkrieg-ursachen/img-2-2.jpg
git add escape-games/gpg-erster-weltkrieg-ursachen/data.json
git add escape-games/gpg-erster-weltkrieg-ursachen/mappe-2.html
git commit -m "v3.8: Mappe 2 'Das Attentat von Sarajevo' — Subagenten-produziert (6 mat, 5 aufg, SCPL-TB)"
git push origin main
```

---

## JSON-Encoding-Regeln

| Zeichen | Loesung |
|---|---|
| Echte Umlaute (ä, ö, ü, ß) | ERLAUBT in data.json (UTF-8) |
| „ " (typographische Anfuehrungszeichen) | Durch `"` ersetzen oder HTML-Entity |
| – (Halbgeviertstrich) | Durch ` — ` (Geviertstrich) oder `--` ersetzen |
| Alle Sonderzeichen > U+007F | Im Zweifel: HTML-Entities |

---

## Merge-Schutz

**Aendern:**
- `escape-games/gpg-erster-weltkrieg-ursachen/data.json` (Mappe-2-Anhang)
- `escape-games/gpg-erster-weltkrieg-ursachen/mappe-2.html` (neu)
- `assets/img/gpg-erster-weltkrieg-ursachen/img-2-1.jpg` (neu)
- `assets/img/gpg-erster-weltkrieg-ursachen/img-2-2.jpg` (neu)

**NICHT aendern:** `docs/**`, Engine-Code (`assets/js/**`), CSS (`assets/css/**`), andere HTML-Dateien, mappen[0] in data.json (ausser Ueberleitungs-Spezifizierung).

---

## Erfolgskriterien

1. Jedes Material hat den Q-Gate-Log des jeweiligen SUB_MATERIAL_*-Subagenten bestanden
2. Jede Aufgabe hat den Q-Gate-Log des jeweiligen SUB_AUFGABE_*-Subagenten bestanden
3. Cross-Konsistenz-Pruefung (Orchestrator-Q-Gate) bestanden
4. C1b wortidentisch
5. C2 Titel korrekt typisiert (A/B)
6. C3 Inline-Links in Tipps
7. C4 Didaktische Bildunterschriften
8. C5 Variante A Ueberleitung
9. JSON valide
10. Mappe 1 unveraendert

---

## Nach Abschluss — Bericht an Cowork

```
Update: Mappe 2 Produktion erledigt.
Commit: [Hash]

Material-Q-Gates:
- mat-2-1 (darstellungstext → SUB_MATERIAL_DARSTELLUNGSTEXT): [PASS/FAIL + Details]
- mat-2-2 (bildquelle → SUB_MATERIAL_BILDQUELLE): [PASS/FAIL + Details]
- mat-2-3 (bildquelle → SUB_MATERIAL_BILDQUELLE): [PASS/FAIL + Details]
- mat-2-4 (quellentext → SUB_MATERIAL_QUELLENTEXT): [PASS/FAIL + Details]
- mat-2-5 (zeitleiste → SUB_MATERIAL_ZEITLEISTE): [PASS/FAIL + Details]
- mat-2-6 (tagebuch → SUB_MATERIAL_TAGEBUCH): [PASS/FAIL + Details]

Aufgaben-Q-Gates:
- aufgabe-2-1 ([typ] → SUB_AUFGABE_[TYP]): [PASS/FAIL + Details]
- aufgabe-2-2 ([typ] → SUB_AUFGABE_[TYP]): [PASS/FAIL + Details]
- aufgabe-2-3 ([typ] → SUB_AUFGABE_[TYP]): [PASS/FAIL + Details]
- aufgabe-2-4 ([typ] → SUB_AUFGABE_[TYP]): [PASS/FAIL + Details]
- aufgabe-2-5 (freitext-code → SUB_AUFGABE_FREITEXT): [PASS/FAIL + Details]

Cross-Konsistenz: [PASS/FAIL]
C1b: [PASS/FAIL]
C2-C5: [PASS/FAIL pro Constraint]
Bild-URLs: [alle OK / welche fehlgeschlagen]
JSON: [valide / Fehler]
Mappe-1-Integritaet: [unveraendert / Aenderungen]
```
