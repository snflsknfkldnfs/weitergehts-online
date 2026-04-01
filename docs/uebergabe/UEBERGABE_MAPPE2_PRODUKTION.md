# Uebergabe-Prompt: Mappe 2 — Das Attentat von Sarajevo

## Kontext

Game: `gpg-erster-weltkrieg-ursachen` — Der Erste Weltkrieg: Ursachen und Ausbruch.
Mappe 1 ("Pulverfass Europa") ist produktionsreif deployed (9 Materialien, 5 Aufgaben, SCPL-Tafelbild).
v3.8 Infrastruktur vollstaendig auditiert (0 Blocker, alle 9 Findings behoben).
Jetzt: Mappe 2 als `mappen[1]` anfuegen.

**Stundenfrage (C1b — wortidentisch an 3 Stellen):**
```
Warum führte ein Mord in Sarajevo zum Weltkrieg?
```

## Pre-Flight

Vor der Arbeit sicherstellen:
- [ ] `git status` — Working Tree sauber (keine uncommitted changes)
- [ ] `git pull` — Lokaler Branch ist aktuell mit origin/main
- [ ] Aktuelle Version von `escape-games/gpg-erster-weltkrieg-ursachen/data.json` lesen (NICHT aus dem Prompt uebernehmen)
- [ ] Alle referenzierten Docs lesen (siehe Pflichtlektuere)

Falls Pre-Flight fehlschlaegt: STOPP. Nicht mit Stash/Force-Operationen improvisieren. Problem melden.

## Pflichtlektuere (vor Produktion lesen)

Diese Dateien MUESSEN gelesen werden bevor Material/Aufgaben produziert werden:

1. `docs/agents/artefakte/SKRIPT_gpg-erster-weltkrieg-ursachen.md` — Chunk 2 (§1-§5)
2. `docs/agents/artefakte/MATERIAL_GERUEST_gpg-erster-weltkrieg-ursachen_Mappe2.md` — Material-Entwurf + Einstieg/Sicherung
3. `docs/agents/artefakte/INHALTSBASIS_gpg-erster-weltkrieg-ursachen.md` — Mappe 2 Sektion (Fakten, Akteure, Fachbegriffe, Wikimedia-Artefakte, Zitate, Rollenprofile)
4. `docs/agents/artefakte/DIDAKTIK_RAHMEN_gpg-erster-weltkrieg-ursachen.md` — TZ2, KE-B, Schwierigkeitskurve, Differenzierungshinweise
5. `docs/agents/AGENT_MATERIAL.md` — Dispatcher-Logik, Feld-Semantik (Section 2.3), C1-C5 Constraints
6. `docs/agents/AGENT_TAFELBILD.md` — SCPL-Format, C1b-Constraint
7. `docs/agents/AGENT_RAETSEL.md` — Aufgaben-Dispatch an SUB_AUFGABE_*
8. Die 5 SUB_AUFGABE_*.md und die relevanten SUB_MATERIAL_*.md Subagenten-Prompts
9. `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md` — A1-A15
10. `docs/checklisten/GUETEKRITERIEN_TAFELBILD.md` — TB-Guetekriterien
11. `escape-games/gpg-erster-weltkrieg-ursachen/data.json` — Mappe 1 als Goldstandard fuer Struktur und Format

## Aufgabe: 5 Schritte

### Schritt 1: Bilder herunterladen

3 Wikimedia-Bilder fuer Mappe 2 herunterladen. Download-Methode: Python `urllib` mit Bot-User-Agent + 2s Pausen (KEIN curl).

| ID | Wikimedia-Dateiname | Ziel-Pfad | Format |
|---|---|---|---|
| img-2-1 | `File:DC-1914-27-d-Sarajevo-cropped.jpg` | `assets/img/gpg-erster-weltkrieg-ursachen/img-2-1.jpg` | jpg |
| img-2-2 | `File:Postcard_for_the_assassination_of_Archduke_Franz_Ferdinand_in_Sarajevo.jpg` | `assets/img/gpg-erster-weltkrieg-ursachen/img-2-2.jpg` | jpg |
| img-2-3 | `File:Archduke_Franz_Ferdinand_in_Sarajevo,_June_1914_Q91848.jpg` | `assets/img/gpg-erster-weltkrieg-ursachen/img-2-3.jpg` | jpg (Reserve, nur wenn img-2-2 Download scheitert) |

Thumbnail-Breite: 800px fuer Karten, 640px fuer Fotos/Illustrationen.
Validierung: Jede Datei muss > 10.000 Bytes sein.

### Schritt 2: Materialien produzieren (SUB_MATERIAL_* Dispatch)

6 Materialien gemaess MATERIAL_GERUEST. Dispatch an die jeweiligen Subagenten-Prompts.

| mat-ID | Typ | SUB_MATERIAL | Kern-Input |
|---|---|---|---|
| mat-2-1 | darstellungstext | SUB_MATERIAL_DARSTELLUNGSTEXT | SKRIPT §1-§3 (Balkan bis Ursache/Ausloeser) |
| mat-2-2 | bildquelle | SUB_MATERIAL_BILDQUELLE | img-2-1 (Beltrame-Illustration Attentat) |
| mat-2-3 | bildquelle | SUB_MATERIAL_BILDQUELLE | img-2-2 (Franz Ferdinand & Sophie, letzte Minuten) |
| mat-2-4 | quellentext | SUB_MATERIAL_QUELLENTEXT | zit-2-2 (Ultimatum an Serbien, paraphrasiert) |
| mat-2-5 | zeitleiste | SUB_MATERIAL_ZEITLEISTE | Julikrise-Chronologie: 28.6.–4.8.1914 (8 Daten aus INHALTSBASIS) |
| mat-2-6 | tagebuch | SUB_MATERIAL_TAGEBUCH | rolle-2-1 (Bewohner:in Sarajevo, erlebt Spannungen + Attentat) |

**C2 Titel-Typ-Differenzierung (v3.8):**
- **Typ A (Frage)** fuer mat-2-1 (einstieg/erarbeitung), mat-2-4 (erarbeitung): Titel als didaktische Frage
- **Typ B (Statement)** fuer mat-2-2, mat-2-3 (bildquellen als visuelle Anker): Titel als kompakter Statement-Titel

**C4 Bildunterschriften:**
Jedes bildbasierte Material braucht eine `bildunterschrift` (didaktischer Satz, nicht nur Beschreibung). Muster aus Mappe 1: "Cecil Rhodes als Riese, der mit gespreizten Beinen von Kairo bis Kapstadt steht — Symbol für den britischen Anspruch auf ein Kolonialreich quer durch Afrika."

**Materialien-Felder (Goldstandard aus Mappe 1):**
Jedes Material-Objekt braucht: `id`, `typ`, `titel`, `inhalt` (HTML-String), `quelle`, `position` (1-basiert), `didaktische_funktion` (einstieg|erarbeitung|vertiefung|sicherung), `voraussetzung` (Array von mat-IDs), `ueberleitung_von` (String), `sequenz_kontext` (vorher/nachher Objekte). Bildbasierte Materialien zusaetzlich: `bildunterschrift`, `bild` (relativer Pfad zu assets/img/).

### Schritt 3: Aufgaben produzieren (SUB_AUFGABE_* Dispatch)

5 Aufgaben, gestuft nach AFB (Schwerpunkt: AFB II gemaess Schwierigkeitskurve Mappe 2).
Dispatch an die jeweiligen Subagenten-Prompts. Aufgaben-Mix: mindestens 3 verschiedene Typen.

**C3 Inline-Material-Links (v3.8):**
ALLE Tipps und Fragestamm-Texte verwenden `[[mat-id|Anzeigetext]]`-Markup fuer Material-Referenzen.
Muster: `"Schau dir die [[mat-2-5|Zeitleiste der Julikrise]] (M5) genau an."`
Die Engine rendert das als klickbare Anker-Links.
KEINE generischen Verweise ("Schau im Material nach") — immer konkreter mat-id + beschreibender Anzeigetext.

**Tipps-Stufung (3 pro Aufgabe):**
- Stufe 1: Denkanstoss ohne Loesungsverraten (Verweis auf Material)
- Stufe 2: Loesungsrichtung andeuten (einschraenken, nicht loesen)
- Stufe 3: Erklaerung + Loesung

**Aufgaben-Vorschlag (orientierend, nicht bindend):**

| # | Typ-Kandidat | Inhalt | Material-Bezug | AFB |
|---|---|---|---|---|
| aufgabe-2-1 | multiple-choice | Balkankrise / Annexion Bosniens | mat-2-1 | I |
| aufgabe-2-2 | zuordnung | Julikrise-Stationen chronologisch zuordnen | mat-2-5 | I-II |
| aufgabe-2-3 | multiple-choice | Ursache vs. Ausloeser unterscheiden | mat-2-1, mat-2-2 | II |
| aufgabe-2-4 | lueckentext | Kettenreaktion der Kriegserklaerungen | mat-2-4, mat-2-5 | II |
| aufgabe-2-5 | freitext | Transfer: Ursache/Ausloeser auf aktuelles Beispiel anwenden | mat-2-1 (Konzept) | II-III |

### Schritt 4: SCPL-Tafelbild generieren (AGENT_TAFELBILD)

Tafelbild-Entwurf aus SKRIPT Chunk 2 in SCPL-Format konvertieren (Struktur wie Mappe 1 tafelbild).

**Knoten aus SKRIPT (6 Stueck):**

| ID | Text | Typ |
|---|---|---|
| k2-1 | Attentat von Sarajevo (28.6.1914) | ereignis |
| k2-2 | Ursache vs. Ausloeser | kernbegriff |
| k2-3 | Julikrise | ereignis |
| k2-4 | Blankoscheck (DE → OeU) | ereignis |
| k2-5 | Kettenreaktion der Kriegserklaerungen | wirkung |
| k2-6 | Balkankrise (Vorgeschichte) | ursache |

Jeder Knoten braucht einen `merksatz` (1 Satz, R7-verstaendlich, fasst den Kerninhalt zusammen).

**Verbindungen aus SKRIPT (6 Stueck):**

| Von → Nach | Label |
|---|---|
| k2-6 → k2-1 | Spannungen fuehren zu |
| k2-1 → k2-3 | loest aus |
| k2-4 → k2-5 | ermutigt Eskalation |
| k2-3 → k2-5 | muendet in |
| k2-2 → k2-1 | erklaert: Ausloeser |
| k2-2 → k1-1 | erklaert: Ursache (Pulverfass) |

**Voraussetzungen aus Mappe 1:** `["k1-1", "k1-4", "k1-5", "k1-7"]`

**SCPL generieren:** situation → complication[] → problem → loesung[]. Ordnungsmuster: `chronologisch` (Balkankrise → Attentat → Julikrise → Kettenreaktion).

**C1b Pflicht:** `stundenfrage` im tafelbild MUSS wortidentisch sein: `"Warum führte ein Mord in Sarajevo zum Weltkrieg?"`

**transfer.frage:** Echte Transferfrage (NICHT Ueberleitung). Bezug auf KE-B: "Ursache vs. Ausloeser anhand eines aktuellen Beispiels diskutieren." Beispiel: "Gibt es ein aktuelles Beispiel, bei dem ein einzelnes Ereignis eine Kette von Reaktionen ausgelöst hat?"

### Schritt 5: data.json Mappe-Anhang-Prozedur

1. **data.json lesen** — aktuelle Version (NICHT aus diesem Prompt uebernehmen)
2. **mappen[1] anfuegen** — Neues Mappe-Objekt als letztes Element in `mappen[]`
3. **meta unveraendert** — `meta{}` wird NICHT modifiziert
4. **mappen[0] unveraendert** — Mappe 1 wird NICHT angefasst (einzige Ausnahme: Punkt 5)
5. **Ueberleitung pruefen** — Mappe 1 hat bereits eine C5-Ueberleitung auf Mappe 2 ("Wie ein einzelner Schuss in Sarajevo das Pulverfass zum Explodieren brachte, erfährst du in der nächsten Mappe."). Falls OK: nicht aendern.
6. **Mappe 2 ist NICHT die letzte Mappe** (4 Mappen total). Also: C5 Variante A (Ueberleitung auf Mappe 3, Thema Kriegsbegeisterung).

**Mappe-2-Objekt Struktur:**

```json
{
  "id": "mappe-2",
  "titel": "Das Attentat von Sarajevo",
  "beschreibung": "...",
  "freischalt_code": "[4-6 Buchstaben, thematisch passend]",
  "einstieg": {
    "narrativ": "<p>[Rueckblick auf Mappe 1 + Hinführung zum Attentat, ca. 3-4 Saetze HTML]</p>",
    "problemstellung": "Warum führte ein Mord in Sarajevo zum Weltkrieg?"
  },
  "materialien": [ /* 6 Materialien aus Schritt 2 */ ],
  "aufgaben": [ /* 5 Aufgaben aus Schritt 3 */ ],
  "sicherung": {
    "kernerkenntnisse": [ /* 3 Saetze */ ],
    "hefteintrag_verweis": "...",
    "reflexionsimpuls": "[Echte Reflexionsfrage, NICHT Ueberleitung]",
    "zusammenfassung": "[Kernunterscheidung Ursache vs. Ausloeser + Julikrise-Logik. zit-2-1 als Schlusszitat einbauen]",
    "ueberleitung": "[C5 Variante A: Bruecke zu Mappe 3 'Kriegsbegeisterung'. Muster: Neugier-Impuls + 'erfaehrst du in der naechsten Mappe']",
    "tafelbild": { /* SCPL aus Schritt 4 */ }
  }
}
```

**Einstieg-Orientierung (aus MATERIAL_GERUEST, als Richtschnur):**
"Europa ist ein Pulverfass — zwei Buendnisbloecke stehen sich gegenueber, bewaffnet und misstrauisch. Doch noch herrscht Frieden. Dann, am 28. Juni 1914, fallen in Sarajevo Schuesse."

**Sicherung-Orientierung (aus MATERIAL_GERUEST):**
"Das Attentat von Sarajevo war der Ausloeser, aber nicht die Ursache des Krieges. Die Ursachen — Buendnisse, Rivalitaeten, Misstrauen — lagen schon vorher bereit. Die Julikrise zeigt, wie schnell aus einem Mord ein Weltkrieg werden kann, wenn ein System aus Buendnispflichten und Blankoschecks die Eskalation antreibt."
Schlusszitat (zit-2-1): "The ostensible reason for armed conflict — the assassination of an archduke — had already become a side-note to a larger European war."

## Dateien

| Pfad | Aenderungsart |
|---|---|
| `escape-games/gpg-erster-weltkrieg-ursachen/data.json` | ERWEITERN (mappen[1] anfuegen) |
| `assets/img/gpg-erster-weltkrieg-ursachen/img-2-1.jpg` | NEU ERSTELLEN (Download) |
| `assets/img/gpg-erster-weltkrieg-ursachen/img-2-2.jpg` | NEU ERSTELLEN (Download) |
| `assets/img/gpg-erster-weltkrieg-ursachen/img-2-3.jpg` | NEU ERSTELLEN (Reserve, nur bei Bedarf) |

## Merge-Schutz

Wenn bei `git pull` oder `git push` Konflikte auftreten:
1. NICHT automatisch aufloesen (kein --theirs, kein --ours)
2. Konflikt-Dateien auflisten und dem User melden
3. Warten auf User-Entscheidung

## Encoding-Regeln

- **data.json / HTML**: Echte UTF-8-Umlaute (ä, ö, ü, ß, Ö, Ü, Ä)
- **Deutsche Anfuehrungszeichen**: NICHT verwenden. Stattdessen: einfache gerade Anfuehrungszeichen oder gar keine. Reason: „" bricht JSON-Parsing.
- **Zitat-Einbettung in HTML**: `<cite>` fuer Quellenangaben

## Erfolgskriterium

- data.json hat 2 Eintraege in `mappen[]`
- mappen[1] hat: 6 materialien, 5 aufgaben, einstieg mit problemstellung === stundenfrage, sicherung mit tafelbild (SCPL)
- Stundenfrage wortidentisch an 3 Stellen (C1b): einstieg.problemstellung, sicherung.tafelbild.stundenfrage, Chunk-2-Titel im SKRIPT
- Alle [[mat-id|...]] Inline-Links in Tipps/Fragestamm (C3)
- Alle Bilder lokal vorhanden (> 10 KB)
- `python3 -c "import json; d=json.load(open('escape-games/gpg-erster-weltkrieg-ursachen/data.json')); assert len(d['mappen'])==2; m=d['mappen'][1]; assert len(m['materialien'])==6; assert len(m['aufgaben'])==5; assert m['einstieg']['problemstellung']==m['sicherung']['tafelbild']['stundenfrage']; print('PASS')"` gibt PASS
- Browser-Test: `mappe-2.html` zeigt alle Materialien, Aufgaben funktionieren, Tafelbild rendert, Sticky-Header zeigt Stundenfrage

## Verifikation

- [ ] JSON-Validierung: `python3 -c "import json; json.load(open('escape-games/gpg-erster-weltkrieg-ursachen/data.json'))"` fehlerfrei
- [ ] Struktur-Check: 2 Mappen, 6 Materialien, 5 Aufgaben in Mappe 2
- [ ] C1b: Stundenfrage wortidentisch an 3 Stellen
- [ ] C3: Mindestens 4 von 5 Aufgaben haben [[...]] Inline-Links in Tipps
- [ ] Bilder: `ls -la assets/img/gpg-erster-weltkrieg-ursachen/img-2-*.jpg` zeigt Dateien > 10 KB
- [ ] Mappe 1 unveraendert: `python3 -c "import json; d=json.load(open('escape-games/gpg-erster-weltkrieg-ursachen/data.json')); assert len(d['mappen'][0]['materialien'])==9; assert len(d['mappen'][0]['aufgaben'])==5; print('Mappe 1 OK')"` gibt OK
- [ ] Keine `console.error` in Browser DevTools bei Laden von mappe-2.html

## Commit

Prefix: `v3.8:` — Beispiel: `v3.8: Mappe 2 'Das Attentat von Sarajevo' (6 mat, 5 aufg, SCPL-TB)`

## Nach Abschluss

Melde den Abschluss in Cowork mit: "Update: Mappe 2 Produktion erledigt. Commit: [hash]. Ergebnis: [Kurzfassung]"
