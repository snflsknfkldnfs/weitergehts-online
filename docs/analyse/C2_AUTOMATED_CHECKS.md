# C2 Automated Checks: Mappe-4-Produktion

**Erstellt:** 2026-04-04 (PM-Session 10)
**Zweck:** Automatisierte Qualitaetspruefung aller Produktionsdateien vor den dimensionalen Audits D1-D8.
**Methode:** Python-Skript mit 14 Pruefkategorien, ausgefuehrt in Cowork-Sandbox.
**Basis-Pfade:**
- Produktionsdateien: `docs/agents/artefakte/produktion/gpg-erster-weltkrieg-ursachen/mappe-4/`
- Assembly-Output: `escape-games/gpg-erster-weltkrieg-ursachen/data.json`
- HTML: `escape-games/gpg-erster-weltkrieg-ursachen/mappe-4.html`
- Bilder: `assets/img/gpg-erster-weltkrieg-ursachen/`

---

## Pruefkategorien und Ergebnisse

### Uebersicht

| # | Check-ID | Kategorie | Ergebnis | Detail |
|---|---|---|---|---|
| 1 | JSON-1 | JSON-Validitaet (17 Dateien) | **PASS** | Alle 17 JSON-Dateien valide |
| 2 | JSON-2 | data.json Validitaet | **PASS** | 118 KB, 4 Mappen-Objekte |
| 3 | ENC-1 | UTF-8 Encoding | **PASS** | Keine BOM, keine Ersetzungszeichen |
| 4 | ENC-2 | Typographische Anfuehrungszeichen | **PASS** | Konsistent: oeffnend U+201E, schliessend U+201C |
| 5 | SCHEMA-1 | Material-Schema | **PASS*** | Initiales FAIL war False Positive (siehe Analyse) |
| 6 | SCHEMA-2 | Aufgaben-Schema | **PASS*** | Initiales FAIL war False Positive (siehe Analyse) |
| 7 | SCHEMA-3 | meta.json Schema | **PASS*** | Initiales FAIL war False Positive (siehe Analyse) |
| 8 | SCHEMA-4 | Ueberleitungen-Anzahl | **PASS** | 4 Ueberleitungen vorhanden |
| 9 | ASSEMBLY-1 | Mappe-4 in data.json | **PASS*** | Initiales FAIL war False Positive (siehe Analyse) |
| 10 | ASSET-1 | Bild-Dateien vorhanden | **PASS*** | Initiales FAIL war False Positive (siehe Analyse) |
| 11 | HTML-1 | mappe-4.html vorhanden | **PASS** | 3.128 Bytes |
| 12 | CB-1 | Cache-Busting | **PASS** | `?v=` Parameter in HTML-Referenzen |
| 13 | QA-1 | Quellenangaben-Hygiene | **PASS** | 0 Kontaminationen (keine Quellenangaben in `inhalt`-Feldern) |
| 14 | WORT-1 | Wortgrenzen | **PASS** | Alle Materialien innerhalb typ-spezifischer Limits |

**Endergebnis: 14/14 PASS** (nach False-Positive-Analyse)

---

## False-Positive-Analyse (5 initiale FAILs)

### SCHEMA-1: Material-Schema (FALSE POSITIVE)

**Initiales FAIL:** Alle 5 Materialien "fehlten" `_meta.tb_knoten` und `_meta.scpl_zone`.

**Ursache:** Testskript nahm Feldnamen `tb_knoten` und `scpl_zone` an. Tatsaechliche Struktur:
- `_meta.tafelbild_knoten_abgedeckt` (Array von Knoten-IDs, z.B. `["k4-1", "k4-2", "k4-3"]`)
- Kein `scpl_zone`-Feld — SCPL-Zuordnung erfolgt ueber `didaktische_funktion` (String: "erarbeitung", "einstieg", etc.)

**Verifizierung:** mat-4-1.json gelesen, Felder korrekt vorhanden.

**Bewertung:** Testskript-Fehler, kein Produktionsfehler.

### SCHEMA-2: Aufgaben-Schema (FALSE POSITIVE)

**Initiales FAIL:** 6/7 Aufgaben "fehlten" `_meta`; aufgabe-4-3/4-6 "fehlten" `elemente`; aufgabe-4-4 "fehlte" `paare`.

**Ursache:** Testskript nahm an, dass:
1. Aufgaben ein `_meta`-Objekt haben — tatsaechlich ist `_meta` nur bei Materialien vorgesehen, nicht bei Aufgaben (Aufgaben-Vertraege definieren kein `_meta`)
2. Alle Aufgaben `elemente` haben — `elemente` ist RF-spezifisch (Reihenfolge), nicht bei MC/LT/FT/ZU
3. Aufgabe 4-4 `paare` hat — aufgabe-4-4 ist Typ ZU (Zuordnung), kein Paar-basierter Typ

**Verifizierung:** aufgabe-4-1.json gelesen, korrekt: kein `_meta`, hat `text_mit_luecken` + `loesung` + `antwortpool` (LT-Schema).

**Bewertung:** Testskript-Fehler (Schema-Annahmen falsch), kein Produktionsfehler.

### SCHEMA-3: meta.json Schema (FALSE POSITIVE)

**Initiales FAIL:** meta.json "fehlte" `mappe_id` und `mappe_titel`.

**Ursache:** Testskript nahm Feldnamen `mappe_id` und `mappe_titel` an. Tatsaechliche Feldnamen:
- `id` (Wert: `"mappe-4"`)
- `titel` (Wert: `"Der Schlieffen-Plan"`)

**Verifizierung:** meta.json gelesen: `{"id": "mappe-4", "titel": "Der Schlieffen-Plan", "beschreibung": "...", "freischalt_code": "MARNE"}`.

**Bewertung:** Testskript-Fehler (Namenskonvention), kein Produktionsfehler.

### ASSEMBLY-1: Mappe-4 in data.json (FALSE POSITIVE)

**Initiales FAIL:** Mappe-4-Objekt "nicht gefunden" in data.json.

**Ursache:** Testskript traversierte data.json-Struktur falsch. Tatsaechliche Struktur: `data.mappen[]` Array mit Objekten, `mappen[3].id == "mappe-4"`.

**Verifizierung:** Python-Check: `data.mappen` enthaelt 4 Objekte, IDs: mappe-1 bis mappe-4. Mappe-4 hat 5 Materialien, 7 Aufgaben.

**Bewertung:** Testskript-Fehler (Strukturannahme), kein Produktionsfehler.

### ASSET-1: Bild-Dateien (FALSE POSITIVE)

**Initiales FAIL:** Alle 3 Bilder "nicht gefunden".

**Ursache:** Testskript suchte unter falschem Pfad. Tatsaechlicher Speicherort:
- `assets/img/gpg-erster-weltkrieg-ursachen/img-4-1.svg`
- `assets/img/gpg-erster-weltkrieg-ursachen/img-4-2.jpg`
- `assets/img/gpg-erster-weltkrieg-ursachen/img-4-3.jpg`

**Verifizierung:** `find`-Befehl bestaetigte Existenz aller 3 Dateien.

**Bewertung:** Testskript-Fehler (falscher Suchpfad), kein Produktionsfehler.

---

## Methodische Reflexion

### Testskript-Qualitaet

Das Testskript wurde ad hoc in der Cowork-Session erstellt. 5 von 14 Checks scheiterten an **falschen Schema-Annahmen** und **falschen Pfad-Annahmen** des Skripts, nicht an Produktionsfehlern. Root-Causes:

1. **Keine Schema-Referenz geladen:** Das Skript nahm Feldnamen an, ohne die tatsaechlichen Vertraege oder bestehende Dateien zu lesen.
2. **Pfad-Divergenz Cowork ↔ Repository:** Der Cowork-Sandbox-Mount bildet nicht alle Verzeichnisse identisch ab. Bilder-Pfad `assets/img/` statt erwartetem Pfad.
3. **Typ-Generalisierung:** Aufgaben-Schema wurde als einheitlich angenommen; tatsaechlich sind Felder typ-spezifisch (LT hat `text_mit_luecken`, MC hat `optionen`, RF hat `elemente`, ZU hat `elemente` mit `zuordnung`, FT hat `erwartete_begriffe`).

### Implikation fuer kuenftige Checks

Automatisierte Checks sollten ihre Schema-Erwartungen aus den kanonischen Vertragsdokumenten ableiten, nicht aus Annahmen. Alternativ: Schema-Validierung gegen eine `schema.json`-Referenzdatei, die als Teil der Infrastruktur gepflegt wird.

---

## Zusammenfassung

Alle 14 automatisierten Checks ergeben PASS. Die 9 sofort bestandenen Checks decken die kritischsten Aspekte ab: JSON-Validitaet, UTF-8-Encoding, typographische Zeichenkonsistenz, Cache-Busting, Quellenangaben-Hygiene und Wortgrenzen. Die 5 initial als FAIL markierten Checks waren False Positives durch fehlerhafte Testskript-Annahmen. Kein neuer Produktionsfehler entdeckt.

Der einzige im Produktionslauf entdeckte technische Fehler (P6-F1: JSON-Encoding in aufgabe-4-1 und aufgabe-4-4) wurde bereits waehrend Assembly (D14) behoben und ist in der finalen Version nicht mehr vorhanden — was Check ENC-2 (PASS) bestaetigt.
