# Q-Gate-Mechanik: Formale Pruef- und Bewertungslogik

**Erstellt:** 2026-04-02 (C+ Schritt 2)
**Kategorie:** Methoden-agnostisch (Prueflogik). Kriterien-Kataloge sind Game-spezifisch.
**Referenziert von:** VERTRAG_PHASE_2-1_MATERIAL.md, VERTRAG_PHASE_2-2b_AUFGABE.md, VERTRAG_PHASE_2-1c_CROSS.md, VERTRAG_PHASE_2-0_RAHMEN.md

---

## 1. Zweck

Q-Gates sind formale Qualitaets-Checkpoints innerhalb der Produktionspipeline. Jedes produzierte Artefakt (Material, Aufgabe, Rahmen, Cross-Konsistenz) durchlaeuft ein Q-Gate BEVOR es geschrieben wird. Dieses Dokument definiert die Prueflogik methoden-agnostisch. Die konkreten Kriterien (WAS geprueft wird) stehen in den jeweiligen Kriterien-Katalogen.

---

## 2. Bewertungsstufen

Jedes Einzelkriterium wird mit genau einer Stufe bewertet:

| Stufe | Bedeutung | Konsequenz |
|---|---|---|
| **PASS** | Kriterium vollstaendig erfuellt | Keine Aktion |
| **WARN** | Kriterium im Grenzbereich. Funktional erfuellt, aber suboptimal | Dokumentation in Q-GATE-LOG.md. Kein Ruecklauf. |
| **FAIL** | Kriterium nicht erfuellt. Artefakt hat einen Defekt | Nachbesserung PFLICHT (siehe §4) |

**Abgrenzung WARN vs. FAIL:**
- FAIL: Artefakt ist fachlich falsch, unvollstaendig, schema-inkompatibel, oder widerspricht einem MUSS-Kriterium.
- WARN: Artefakt ist korrekt und vollstaendig, aber ein SOLL-Kriterium wird nicht optimal erfuellt (z.B. Sprachregister grenzwertig, Textlaenge am oberen Limit, Elementarisierung koennte schaerfer sein).

---

## 3. Aggregationsregel (Gesamturteil)

Das Gesamturteil eines Q-Gates ergibt sich deterministisch aus den Einzelbewertungen:

```
GESAMT-PASS:  0 FAIL  UND  max 2 WARN
GESAMT-WARN:  0 FAIL  UND  3+ WARN
GESAMT-FAIL:  1+ FAIL (unabhaengig von WARN-Anzahl)
```

| Gesamt | Aktion |
|---|---|
| **GESAMT-PASS** | Artefakt wird geschrieben. Log-Eintrag. |
| **GESAMT-WARN** | Artefakt wird geschrieben. Log-Eintrag mit WARN-Details. Empfehlung: Nachbesserung der WARN-Kriterien bei naechster Gelegenheit (nicht blockierend). |
| **GESAMT-FAIL** | Artefakt wird NICHT geschrieben. Nachbesserungszyklus (§4). |

---

## 4. Nachbesserungslogik

```
1. GESAMT-FAIL → Identifikation der FAIL-Kriterien
2. Korrektur NUR der FAIL-Felder (keine Neuproduktion des gesamten Artefakts)
3. Erneutes Q-Gate (NUR die zuvor FAIL-Kriterien werden re-evaluiert,
   PASS/WARN-Kriterien behalten ihre Bewertung)
4. Bei erneutem PASS → Artefakt wird geschrieben
5. Bei erneutem FAIL → Finding in Q-GATE-LOG.md dokumentieren
   → User entscheidet: (a) 2. Nachbesserung, (b) Akzeptanz mit Finding, (c) Abbruch
```

**Max-Iterationen:** 1 automatische Nachbesserung. Danach User-Entscheidung. Verhindert Endlosschleifen.

---

## 5. Kriterien-Klassen

Jedes Kriterium gehoert zu genau einer Klasse. Die Klasse bestimmt, ob FAIL ein automatisches Nachbesserungsrecht hat:

| Klasse | Beispiele | FAIL-Behandlung |
|---|---|---|
| **SCHEMA** | Schema-Validierung, Pflichtfelder, Enum-Werte, Pattern | Automatisch korrigierbar (deterministisch). Immer 1 Nachbesserung. |
| **KONSISTENZ** | C1b Stundenfrage-Identitaet, Cross-Referenz-Pruefung, TB-Knoten-Abdeckung | Automatisch korrigierbar (Quelle ist definiert). Immer 1 Nachbesserung. |
| **INHALT** | Sachgemaessheit (M1), Quellenorientierung (M8), Vergegenwaertigung (DT-2) | Qualitative Bewertung. 1 Nachbesserung, danach Finding. |
| **DIDAKTIK** | Zielklarheit (M4), Erarbeitbarkeit (C6), AFB-Kongruenz (A1), Distractor-Qualitaet (A4-MC) | Qualitative Bewertung. 1 Nachbesserung, danach Finding. |
| **FORM** | Sprachregister (M2/DT-4), Textlaenge (DT-5), Strukturierung (M6) | Automatisch korrigierbar. Immer 1 Nachbesserung. |

---

## 6. Q-Gate-Ergebnis-Format (strukturiert)

Jedes Q-Gate produziert ein strukturiertes Ergebnis. Format:

```json
{
  "artefakt_id": "mat-3-1",
  "artefakt_typ": "material",
  "phase": "2.1",
  "datum": "2026-04-02",
  "gesamt": "PASS",
  "kriterien": [
    {
      "id": "SCHEMA-01",
      "name": "Schema-Validierung",
      "klasse": "SCHEMA",
      "stufe": "PASS",
      "detail": "material-output-schema.json: 0 Fehler"
    },
    {
      "id": "M1",
      "name": "Sachgemaessheit",
      "klasse": "INHALT",
      "stufe": "PASS",
      "detail": "Historische Fakten korrekt. Kausalzusammenhaenge plausibel."
    },
    {
      "id": "M2",
      "name": "Adressatengemaessheit (R7)",
      "klasse": "FORM",
      "stufe": "WARN",
      "detail": "Durchschnittliche Satzlaenge 16.2 Woerter (Limit: 15). Knapp ueber Grenzwert."
    }
  ],
  "nachbesserung": null,
  "finding": null
}
```

**Pflichtfelder im Ergebnis:**
- `artefakt_id`: Eindeutige ID des geprueften Artefakts
- `artefakt_typ`: material | aufgabe | rahmen | cross | progressionsplan
- `phase`: Vertrags-Phase (2.0, 2.1, 2.1c, 2.2a, 2.2b, 2.2c)
- `datum`: ISO-Datum
- `gesamt`: PASS | WARN | FAIL (berechnet nach §3)
- `kriterien[]`: Array aller geprueften Kriterien mit id, name, klasse, stufe, detail
- `nachbesserung`: null | Objekt mit iteration (1|2), korrigierte_kriterien[], neues_gesamt
- `finding`: null | String (Beschreibung des ungeloesten Problems bei finalem FAIL)

---

## 7. Q-Gate-Kataloge (Game-spezifisch, Escape-Game)

Die folgenden Kataloge definieren WELCHE Kriterien pro Artefakt-Typ geprueft werden. Die Kriterien selbst sind in den referenzierten Dokumenten spezifiziert.

### 7.1 Material-Q-Gate (Phase 2.1)

**Vertrag:** VERTRAG_PHASE_2-1_MATERIAL.md
**Referenz-Dokument:** QUALITAETSKRITERIEN_MATERIALPRODUKTION.md

| Reihenfolge | ID | Kriterium | Klasse | Stufe-Semantik |
|---|---|---|---|---|
| 1 | SCHEMA-01 | Schema-Validierung (material-output-schema.json) | SCHEMA | FAIL: JSON-Fehler oder fehlende Pflichtfelder. PASS: 0 Schema-Fehler. |
| 2 | MQ1 | Stundenfrage-Bezug | KONSISTENZ | FAIL: Material ignoriert Stundenfrage. PASS: Erkennbarer Beitrag zur Beantwortung. |
| 3 | MQ2 | Titel (Typ A/B) | FORM | FAIL: Weder Frage noch Statement. WARN: Frage bei BQ/KA (Typ B empfohlen). |
| 4 | M1 | Sachgemaessheit | INHALT | FAIL: Fachlicher Fehler. WARN: Vereinfachung grenzwertig. |
| 5 | M2 | Adressatengemaessheit (R7) | FORM | FAIL: >20 Woerter/Satz Durchschnitt oder >5 neue Fachbegriffe. WARN: 15-20 Woerter/Satz oder 4 Fachbegriffe. |
| 6 | M3 | Elementarisierung | DIDAKTIK | FAIL: Irrelevante Nebenstraenge. WARN: Leicht ueberladen. |
| 7 | M4 | Zielklarheit (TB-Knoten-Kongruenz) | DIDAKTIK | FAIL: Material deckt zugewiesene TB-Knoten nicht ab. PASS: Merksatz nach Lektuere in eigenen Worten formulierbar. |
| 8 | M5 | Aktivierung | DIDAKTIK | FAIL: Kein aktivierendes Element. WARN: Aktivierung vorhanden aber schwach. |
| 9 | C6/MQ6 | Erarbeitbarkeits-Plausibilitaet | DIDAKTIK | FAIL: SCPL-Schritt nicht erarbeitbar. WARN: Erarbeitbar, aber Fachbegriff nur erwaehnt statt entwickelt. |
| 10 | M8 | Quellenorientierung | INHALT | FAIL: Keine Quellenangabe bei historischen Fakten. WARN: Quelle vorhanden aber unspezifisch. |
| 11 | M10 | Sprachsensibilitaet | INHALT | FAIL: Propagandabegriff unreflektiert uebernommen. PASS: Zeitgenoessische Begriffe kontextualisiert. |
| 12 | TYP-* | Typ-spezifische Kriterien | INHALT/DIDAKTIK | Je nach Typ: DT-1 bis DT-6, QT-1 bis QT-6, BQ-1 bis BQ-8, KA-1 bis KA-7, ZL-1 bis ZL-6, ST-1 bis ST-6, TB-1 bis TB-6. Siehe QUALITAETSKRITERIEN_MATERIALPRODUKTION.md §3. |

| 13 | TYP-01 | Typographische Korrektheit (v3.3) | FORM | FAIL: ASCII-Ersatzzeichen in SuS-sichtbaren Feldern (`--` statt `—`, `ae/oe/ue/ss` statt Umlaute, `'` statt `'`). PASS: Alle Felder konform mit Encoding-Regel v3.3. |

**Pruef-Reihenfolge:** SCHEMA zuerst. Bei SCHEMA-FAIL: sofort korrigieren, restliche Kriterien NICHT pruefen (Schema-Fehler verfaelschen Inhaltsbewertung). Nach SCHEMA-PASS: Kriterien 2-13 in angegebener Reihenfolge.

### 7.2 Aufgaben-Q-Gate (Phase 2.2b)

**Vertrag:** VERTRAG_PHASE_2-2b_AUFGABE.md
**Referenz-Dokument:** GUETEKRITERIEN_AUFGABEN.md

| Reihenfolge | ID | Kriterium | Klasse | Stufe-Semantik |
|---|---|---|---|---|
| 1 | SCHEMA-02 | JSON-Feld-Kompatibilitaet (Engine-Felder) | SCHEMA | FAIL: Falscher Feldname oder Typ. Q-M2-01/02. |
| 2 | A1 | AFB-Kongruenz | DIDAKTIK | FAIL: Tatsaechlicher AFB weicht vom geplanten ab (PROGRESSIONSPLAN). |
| 3 | A2 | Fragestamm-Klarheit | FORM | FAIL: Mehrdeutig oder >1 Anforderung. |
| 4 | A3 | Material-Kongruenz | KONSISTENZ | FAIL: Antwort nicht aus Ziel-Material ableitbar. |
| 5 | A4-* | Typ-spezifische Qualitaet | DIDAKTIK | MC: Distractor-Rang. ZU: Trennschaerfe. LT: Luecken-Eindeutigkeit. RF: Reihenfolge-Eindeutigkeit. |
| 6 | A6 | Tipp-Progression | FORM | FAIL: Tipps nicht 3-stufig oder Stufe 3 ohne Loesung. |
| 7 | A7 | Operator-Praezision | FORM | FAIL: Kein AFB-konformer Operator erkennbar. WARN: Implizit statt explizit. |
| 8 | MQ3 | Material-Referenz-Verbot in Frage | KONSISTENZ | FAIL: [[mat-id]] im frage-Feld. Q-M2-04. |
| 9 | A11-FT | Freitext-Qualitaet (NUR bei freitext-code) | DIDAKTIK | FAIL: Keine Leitfrage oder <3 Fachbegriffe. |
| 10 | TYP-01-A | Typographische Korrektheit Aufgaben (v3.3) | FORM | FAIL: ASCII-Ersatzzeichen in frage, optionen, loesung, tipps. |
| 11 | A2-KURZ | Fragestamm-Kurzregel (v3.3) | FORM | FAIL: Fragestellung > 15 Woerter. WARN: 13-15 Woerter. |

### 7.3 Rahmen-Q-Gate (Phase 2.0)

**Vertrag:** VERTRAG_PHASE_2-0_RAHMEN.md
**Referenz-Schemata:** hefteintrag-schema.json, rahmen-einstieg-schema.json, rahmen-sicherung-schema.json

| Reihenfolge | ID | Kriterium | Klasse | Stufe-Semantik |
|---|---|---|---|---|
| 1 | SCHEMA-03 | Schema-Validierung (alle 3 Rahmen-Schemata) | SCHEMA | FAIL: JSON-Fehler. |
| 2 | C1b | Stundenfrage-Identitaet | KONSISTENZ | FAIL: einstieg.problemstellung !== hefteintrag.stundenfrage. |
| 3 | M3b | Kernerkenntnisse-Identitaet | KONSISTENZ | FAIL: scpl.loesung[] weicht von TAFELBILD-Entwurf ab. |
| 4 | Q-M2-09 | Disjunktionsregel | KONSISTENZ | FAIL: reflexionsimpuls paraphrasiert scpl.loesung[]. |
| 5 | Q-M2-08 | Quellenangabe-Hygiene | FORM | FAIL: Interne Artefakt-Namen in SuS-sichtbaren Texten. |
| 6 | V-RAHMEN | Vollstaendigkeit | SCHEMA | FAIL: Pflichtfeld fehlt oder ist leer (ausser zusammenfassung/ueberleitung als Placeholder). |
| 7 | TYP-01-R | Typographische Korrektheit Rahmen (v3.3) | FORM | FAIL: ASCII-Ersatzzeichen in einstieg/sicherung/hefteintrag-Feldern. |
| 8 | REG-01 | Sprachregister R7 Rahmentexte (v3.3) | FORM | FAIL: Didaktische Metakommentare oder Lehrerhandreichungs-Sprache in SuS-sichtbaren Rahmentexten (einstieg.narrativ, sicherung.zusammenfassung, sicherung.ueberleitung). WARN: Grenzwertig akademischer Ton. |

### 7.4 Cross-Konsistenz-Q-Gate (Phase 2.1c)

**Vertrag:** VERTRAG_PHASE_2-1c_CROSS.md

| Reihenfolge | ID | Kriterium | Klasse | Stufe-Semantik |
|---|---|---|---|---|
| 1 | CROSS-1 | Sequenz-Kohaerenz | KONSISTENZ | FAIL: Material setzt nicht-eingefuehrten Fachbegriff voraus. |
| 2 | CROSS-2 | Fachbegriff-Konsistenz | KONSISTENZ | FAIL: Gleicher Fachbegriff unterschiedlich definiert. |
| 3 | CROSS-3 | Ueberleitung-Kohaerenz | KONSISTENZ | FAIL: GERUEST-Ueberleitung referenziert nicht-vorhandene Inhalte. |
| 4 | CROSS-4 | TB-Knoten-Gesamtabdeckung | KONSISTENZ | FAIL: TB-Knoten von keinem Material abgedeckt. |
| 5 | UE-1..5 | Ueberleitung-Qualitaet (Achse 5) | DIDAKTIK | FAIL: Kein Rueckwaerts-Vektor oder kein Vorwaerts-Vektor. WARN: Vektoren vorhanden aber vage. |
| 6 | HE-REV | Hefteintrag-Revision (Achse 6) | KONSISTENZ | FAIL: STRUKTUR-FREEZE verletzt. WARN: FORMULIERUNGS-OFFEN-Felder nicht revidiert. |
| 7 | HE-PROD | Hefteintrag-Produktqualitaet (v3.3) | DIDAKTIK | Pruefung gegen GUETEKRITERIEN_HEFTEINTRAG_PRODUKT.md (HE1-HE13). FAIL: HE4 (Sprachliche Geschlossenheit) oder HE12 (Lernbarkeit) nicht erfuellt. WARN: Andere HE-Kriterien grenzwertig. |
| 8 | TYP-01-C | Typographische Korrektheit Cross-Artefakte (v3.3) | FORM | FAIL: ASCII-Ersatzzeichen in Ueberleitungen, zusammenfassung, ueberleitung, SCPL-Patches. |
| 9 | REG-01-C | Sprachregister Ueberleitungen (v3.3) | FORM | FAIL: Didaktische Metakommentare in Ueberleitungstexten. Pruefung gegen UE-3 (verschaerft). |

### 7.5 Progressionsplan-Q-Gate (Phase 2.2a)

**Vertrag:** VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md

| Reihenfolge | ID | Kriterium | Klasse | Stufe-Semantik |
|---|---|---|---|---|
| 1 | A5 | AFB-Progression | KONSISTENZ | FAIL: Regression (AFB sinkt). WARN: Plateau >2 Aufgaben auf gleichem AFB. |
| 2 | A9 | TB-Abdeckung | KONSISTENZ | FAIL: TB-Knoten in keiner Aufgabe. |
| 3 | A10 | Typvielfalt | FORM | FAIL: Ein Aufgabentyp >2x. WARN: Freitext nicht an letzter Position. |
| 4 | A3-PP | Material-Vollstaendigkeit | KONSISTENZ | FAIL: Material in keiner Aufgabe referenziert. |
| 5 | A12 | Sachbezogen → Wertbezogen | DIDAKTIK | FAIL: Wertbezogene Aufgabe vor sachbezogener. |

### 7.6 Cross-Aufgaben-Q-Gate (Phase 2.2c)

**Vertrag:** VERTRAG_PHASE_2-2c_CROSS.md

| Reihenfolge | ID | Kriterium | Klasse | Stufe-Semantik |
|---|---|---|---|---|
| 1 | A5-X | AFB-Progression (Ist-Pruefung) | KONSISTENZ | FAIL: Tatsaechlicher AFB der Aufgaben widerspricht Progressionsplan. |
| 2 | A8 | Kognitive Aktivierung | DIDAKTIK | FAIL: Keine Aufgabe verlangt eigene Stellungnahme/Beurteilung. |
| 3 | A9-X | TB-Abdeckung (Ist-Pruefung) | KONSISTENZ | FAIL: TB-Knoten in keiner Aufgabe geprüeft. |
| 4 | REDUNDANZ | Inhaltlicher Overlap | KONSISTENZ | FAIL: Zwei Aufgaben pruefen identischen Sachverhalt. WARN: Aehnlich aber komplementaer. |

---

## 8. Q-Gate-Log-Format

Q-Gate-Ergebnisse werden in `Q-GATE-LOG.md` pro Mappe protokolliert. Format:

```markdown
# Q-Gate-Log: Mappe N — Phase X.Y (Bezeichnung)

**Phase:** X.Y
**Datum:** YYYY-MM-DD
**Vertrag:** VERTRAG_PHASE_X-Y_*.md

## Ergebnis: PASS | WARN | FAIL

| # | ID | Kriterium | Klasse | Stufe | Detail |
|---|---|---|---|---|---|
| 1 | SCHEMA-01 | Schema-Validierung | SCHEMA | PASS | 0 Fehler |
| 2 | M1 | Sachgemaessheit | INHALT | PASS | ... |
| ... | ... | ... | ... | ... | ... |

## Nachbesserung (falls FAIL)
- Iteration 1: [korrigierte Kriterien], neues Ergebnis: [PASS|FAIL]
- Finding (falls erneut FAIL): [Beschreibung]

## Produzierte Dateien
[Liste der geschriebenen Dateien]
```

**Retro-Kompatibilitaet:** Das bestehende Q-GATE-LOG.md (Mappe 2) verwendet ein aelteres Prosa-Format. Neue Eintraege ab Mappe 3 verwenden das formalisierte Format. Bestehende Eintraege werden NICHT migriert.

---

## 9. Determinismus-Garantie

Zwei Instanzen, die dasselbe Artefakt gegen denselben Kriterienkatalog pruefen, MUESSEN zum gleichen Gesamturteil kommen. Voraussetzungen:

1. **SCHEMA-Kriterien:** Deterministisch per Definition (programmatische Validierung).
2. **KONSISTENZ-Kriterien:** Deterministisch — Vergleich zweier definierter Werte (z.B. C1b: String-Vergleich).
3. **FORM-Kriterien:** Quantifizierbar (Satzlaenge, Feldlaenge, Anzahl). Schwellenwerte in Stufe-Semantik definiert.
4. **INHALT/DIDAKTIK-Kriterien:** Qualitativ. Determinismus durch Operationalisierung (jedes Kriterium hat eine konkrete Prueffrage mit FAIL-Bedingung). Ermessensspielraum bei WARN vs. PASS — aber FAIL-Schwelle ist hart definiert.

**Grenzfaelle:** Wenn die Einstufung WARN vs. PASS unklar ist: WARN waehlen (konservativ). Wenn die Einstufung WARN vs. FAIL unklar ist: die in Stufe-Semantik definierte FAIL-Bedingung ist ausschlaggebend.

---

## 10. Integration in Vertraege

Jeder Vertrag referenziert dieses Dokument fuer die Prueflogik und seinen spezifischen Katalog (§7) fuer die Kriterien:

```
Q-Gate-Mechanik:  docs/architektur/Q-GATE-MECHANIK.md (§3 Aggregation, §4 Nachbesserung, §6 Output-Format)
Q-Gate-Katalog:   §7.X dieses Dokuments
Kriterien-Detail: [jeweiliges Referenz-Dokument]
```
