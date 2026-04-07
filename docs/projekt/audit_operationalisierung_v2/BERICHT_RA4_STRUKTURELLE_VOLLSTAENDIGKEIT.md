# RA4: Strukturelle Vollstaendigkeit-Cluster (S3, S6, S15)

**Auditor:** RA4 (Subagent für Operationalisierungsqualität)
**Datum:** 2026-04-07
**Testfall:** MATERIAL_GERUEST_gpg-erster-weltkrieg-ursachen_Mappe4.md
**Scope:** Kriterien S3 (TB-Knoten-Abdeckung), S6 (Sequenzkontext-Vollstaendigkeit), S15 (Skript-Kongruenz)

---

## S3: TB-Knoten-Abdeckung (MUSS)

### Kriterium-Definition
**Quelle:** GUETEKRITERIEN_SEQUENZIERUNG.md, Sektion 6.1.3
**Prueflogik:**
1. Extrahiere alle TB-Knoten-IDs aus TAFELBILD (k4-1 bis k4-N)
2. Extrahiere alle in Sequenzplan-Spalte "TB-Knoten" referenzierten Knoten
3. Bilde Differenz → fehlende_knoten
4. **FAIL wenn:** fehlende_knoten nicht leer

**Schwelle für NACHBESSERUNG:** Jeder fehlende Knoten erfordert neues/erweitertes Material.

---

### D1: Inputverfuegbarkeit

**Bewertung:** ROBUST

**Begruendung:**
- **Tafelbild vorhanden:** MATERIAL_GERUEST Zeile 30-42 zeigt "TB-Abdeckungs-Nachweis" mit expliziter Knoten-Liste (k4-1 bis k4-6)
- **Sequenzplan vorhanden:** Zeilen 123-129 enthalten Sequenzplan-Tabelle mit Spalte "TB-Knoten" pro Material
- **Formate lesbar:** Knoten-IDs sind konform strukturiert (kN-M Pattern), Materialzuordnung ist unambiguo:
  - k4-1 → mat-4-1, mat-4-2
  - k4-2 → mat-4-1
  - k4-3 → mat-4-1
  - k4-4 → mat-4-2, mat-4-3
  - k4-5 → mat-4-4
  - k4-6 → mat-4-5

**Verfuegbarkeitsmerkmal:** Beide Input-Datenquellen (TAFELBILD-Extraktion + Sequenzplan-Tabelle) sind zum Q-Gate-Zeitpunkt (Phase 1.9) bereits vollständig kompiliert. Keine Abhängigkeiten von später befüllten Feldern.

**Risiko: NONE** — Inputzustand ist determiniert.

---

### D2: Entscheidungsdeterminiertheit

**Bewertung:** ROBUST

**Begruendung:**
Die Prueflogik ist mengentheoretisch trivial: Differenzmenge zweier Mengen ist bei fester Eingabe immer identisch. 
- Input: `tafelbild.knoten` = {k4-1, k4-2, k4-3, k4-4, k4-5, k4-6} (6 Elemente, Zeile 35-40)
- Input: `sequenzplan[].tb_knoten` = [k4-2, k4-1, k4-3, k4-1, k4-4, k4-4, k4-5, k4-6] (aggregiert aus Zeilen 123-129)
  - mat-4-1: k4-2, k4-1, k4-3
  - mat-4-2: k4-1, k4-4
  - mat-4-3: k4-4
  - mat-4-4: k4-5
  - mat-4-5: k4-6
- Union über Sequenzplan = {k4-1, k4-2, k4-3, k4-4, k4-5, k4-6} (6 Elemente)
- Differenz = {} (leere Menge)
- **Ergebnis: PASS**

**Determinismus:** Wenn identische Eingaben vorliegen, ist das Ergebnis garantiert reproduzierbar. Die Prueflogik ist nicht interpretationsabhängig. Zwei verschiedene Prüfer:innen würden identisch entscheiden.

**Risiko: NONE**

---

### D3: Grenzfall-Robustheit

**Bewertung:** ROBUST

**Test-Szenarien:**

**Szenario A: Material mit mehreren TB-Knoten (k4-1 mehrfach bedient)**
- mat-4-1 bedient k4-2, k4-1, k4-3 (3 Knoten)
- mat-4-2 bedient k4-1, k4-4 (2 Knoten, k4-1 redundant)
- **Prueflogik:** Union {k4-1, k4-2, k4-3} ∪ {k4-1, k4-4} = {k4-1, k4-2, k4-3, k4-4} ✓ Korrekt
- **Implikation:** Redundanz wird korrekt absorbiert. Keine Doppelzählung.

**Szenario B: 2-Material-Mappe (Grenzfall klein)**
- Hypothetisch: nur mat-4-1 + mat-4-5, 6 Knoten
- mat-4-1: {k4-1, k4-2, k4-3}
- mat-4-5: {k4-6}
- Union = {k4-1, k4-2, k4-3, k4-6}
- Differenz = {k4-4, k4-5} (fehlend)
- **Ergebnis:** FAIL (2 Knoten fehlend) ✓ Korrekt erkannt

**Szenario C: 8+-Material-Mappe (Grenzfall gross)**
- Prueflogik ist mengentheoretisch indifferent gegen Kardinalität. Keine Skalenungsprobleme.
- Auch mit 20 Materialien: `fehlende_knoten = tafelbild.knoten - union(sequenzplan.tb_knoten)` ist eindeutig definiert.

**Szenario D: Misch-Perspektiven (z.B. k-Knoten mit cross-map Referenzen)**
- Testfall Mappe 4 hat 1 Verweis auf k3-1 (Zeile 62): "Voraussetzung k3-1 (Kriegsbegeisterung) ... Quelle: Mappe 3, Hefteintrag"
- **Prueflogik S3 hat KEINE Voraussetzungs-Logik**: S3 prüft nur Abdeckung von Knoten aus dem **aktuellen** TAFELBILD
- k3-1 wird korrekt nicht in k4-x-Liste erwartet (Zeile 35-40: nur 6 Knoten)
- **Verhalten:** Korrekt. Sequenzmappenübergreifende Abhängigkeiten sind Sache von S2 (Vorwissen-Progression), nicht S3.

**Szenario E: Sonderefall — Material ohne TB-Knoten-Zuordnung**
- Hypothetisch: mat-4-6 mit tb_knoten = null oder []
- **Prueflogik:** Dieses Material trägt nicht zur Union bei
- Wenn davon ein Knoten unabgedeckt wird, FAIL
- **Aber:** Das MATERIAL_GERUEST hat keine solchen Materialien (alle haben explizite TB-Knoten)

**Gesamt-Robustheit:** ROBUST. Die Prueflogik ist gegen alle gängigen Grenzfälle immun.

---

### D4: Ueberlappungsfreiheit

**Bewertung:** ROBUST

**Analyse:**
S3 prüft **Knoten-Abdeckung** (existiert Erarbeitungsweg für jeden Knoten?). Das ist fokussiert und trennscharf:

| Kriterium | Prueft | S3-Relevanz |
|---|---|---|
| S1 (Artikulationsschema) | Phasenfolge | NEIN — keine Überschneidung |
| S2 (Vorwissen-Progression) | Verfügbarkeit von Fachbegriffen | Parallel, nicht überlappend (Vorwissen ≠ Abdeckung) |
| S4 (Didaktische-Funktion-Sequenzlogik) | Funktionsreihenfolge | NEIN — unabhängig von Knoten-Abdeckung |
| S5 (Vergegenwärtigung vor Besinnung) | Typ-basierte Reihenfolge | NEIN — Material kann TB-Knoten abdecken UND Vergegenwärtigung sein |
| S14 (SCPL-Korrespondenz) | SCPL-Aufbau-Monotonie | Potenziell parallel: S14 könnte Material umpositionieren, was S3 beeinflusst, ABER: S3 prüft nur Existenz (nicht Position). Daher: NICHT überlappend |
| S15 (Skript-Kongruenz) | SKRIPT-Reihenfolge | Parallel: Material folgt SKRIPT, aber S3 ist unabhängig davon |

**Trennschärfe:** S3 ist klar separiert. Es würde nur kollidieren, wenn ein Kriterium sagen würde "dieser Knoten soll NICHT abgedeckt werden" — das trifft nicht zu.

**Risiko: NONE**

---

### D5: Nachbesserbarkeit

**Bewertung:** ROBUST

**Nachbesserungspfade bei FAIL:**

**Fall 1: k4-4 ist nicht abgedeckt**
- **Aktion:** 
  1. Bestehendes Material (z.B. mat-4-2) erweitern: TB-Knoten Spalte: "k4-1, k4-4" → "k4-1, k4-4, k4-4neu"
  2. ODER neues Material erstellen: mat-4-2b mit TB-Knoten = [k4-4]
  3. Sequenzplan updaten, Zeile ergänzen/editieren
  4. S6 Sequenzkontext-Objekte regenerieren
- **Autonom machbar:** JA. Der Agent kann:
  - Fehlende Knoten identifizieren
  - Passendes bestehendes Material identifizieren (inhaltlich kompatibel) oder neue mat-ID generieren
  - Sequenzplan updaten
  - Nachgabe an entsprechenden SUB_MATERIAL_* queuen

**Fall 2: Mehrere Knoten fehlen (k4-3, k4-5)**
- Priorisierung: Welches Material zuerst? → Lexikalisch oder nach TB-Abhängigkeitslogik
- **Autonom:** JA, aber erfordert zusätzliche Kontext-Logik (S14: SCPL-Korrespondenz beachten)

**Fehlerbehandlung:** Der Patch ist mechanisch, nicht kreativ. Autonome Nachbesserung ist möglich.

**Bewertung: ROBUST**

---

### D6: Fachdidaktische Dichte

**Bewertung:** ROBUST

**Analyse:** 
Operationalisiert die Kernfrage: "Sind alle lernzielrelevanten Inhalte (Tafelbild-Knoten) durch Materialien zugänglich?"

**Fachdidaktischer Kern:**
- Im GPG (Geschichtsunterricht) ist das Tafelbild die **Sinnstruktur** (SCPL-Logik + Fachbegriffe)
- Jeder Knoten ist didaktisch begründet: "Schlieffen-Plan" (k4-1), "Zweifrontenkrieg als Problem" (k4-2), etc.
- Ohne Knoten-Abdeckung können Schüler:innen den roten Faden nicht erschliessen

**Formalisierung deckt den Kern ab:**
- ✓ Existenz-Check (ist Materialien-Quellmenge nicht leer?)
- ✓ Vollständigkeit-Check (sind alle Knoten berücksichtigt?)
- ✓ Transparenz (welche Materialien bedienen welche Knoten?)

**Was S3 NICHT deckt:**
- Qualität der Erarbeitung (dafür: SQ-1 bis SQ-4 auf Subagenten-Ebene)
- Didaktischer Ort (zeitliche Position) — das ist S4, S5, S14
- Tiefgang vs. Oberflächlichkeit — das ist SUB_MATERIAL_* Verantwortung

**Bewertung: ROBUST** — Die Formalisierung bildet den fachdidaktischen Kern (Erarbeitbarkeit aller Lernziele) vollständig ab.

---

### Testfall-Analyse: Mappe 4 konkret

**Befund:** PASS (6/6 Knoten abgedeckt)

| Knoten | Mat-Zuordnung | Absatzreihe | Status |
|---|---|---|---|
| k4-1 (Schlieffen-Plan) | mat-4-1 (§2-§3), mat-4-2 (img-4-1) | §2-§3 | ✓ Mehrfach-Abdeckung |
| k4-2 (Zweifrontenkrieg) | mat-4-1 (§1) | §1 | ✓ |
| k4-3 (Zeitluecke) | mat-4-1 (§3) | §3 | ✓ |
| k4-4 (Einmarsch Belgien) | mat-4-2 (img-4-1), mat-4-3 (rolle-4-1) | §2, §4 | ✓ |
| k4-5 (Marne-Schlacht) | mat-4-4 (img-4-2) | §5 | ✓ |
| k4-6 (Stellungskrieg) | mat-4-5 (img-4-3) | §6 | ✓ |

**Detailebene:** Das MATERIAL_GERUEST nennt Feldnamen beim Namen (Zeile 12-18): `Skript-Ref` (z.B. §1-§3), `Artefakt-Ref` (z.B. zit-4-1, img-4-1), `TB-Knoten` (z.B. k4-1, k4-2, k4-3).

---

### Gesamt-Urteil S3

| Dimension | Bewertung | Begruendung |
|---|---|---|
| D1: Inputverfuegbarkeit | ROBUST | Alle Input-Daten zum Q-Gate-Zeitpunkt vorhanden; keine Zirkularitäten |
| D2: Entscheidungsdeterminiertheit | ROBUST | Mengentheoretische Logik ist funktional rein; reproduzierbar |
| D3: Grenzfall-Robustheit | ROBUST | Mehrfach-Abdeckung, 2er und 8+er Mappes, cross-map Refs korrekt behandelt |
| D4: Ueberlappungsfreiheit | ROBUST | Klar separiert von S1, S2, S4, S5, S14, S15 |
| D5: Nachbesserbarkeit | ROBUST | Autonome Patches möglich (Material erweitern/hinzufügen) |
| D6: Fachdidaktische Dichte | ROBUST | Operationalisiert den Kern (Erarbeitbarkeit aller Lernziele) |

**GESAMT-URTEIL: ROBUST**

**Recommendation:** S3 ist produktionsreif. Keine Änderungen erforderlich.

---

## S6: Sequenzkontext-Vollstaendigkeit (MUSS)

### Kriterium-Definition
**Quelle:** GUETEKRITERIEN_SEQUENZIERUNG.md, Sektion 6.1.6
**Prueflogik:**
1. Pro Material: `sequenz_kontext` muss vollständig sein mit `vorher` und `nachher`
2. `vorher` darf nur bei Position 1 leer sein
3. `nachher` darf nur bei letzter Position leer sein
4. Konsistenz-Check: `nachher` von Material N-1 muss mit `vorher` von Material N übereinstimmen
5. Jedes `vorher`/`nachher` Objekt hat: Material-ID, Typ, Kerninhalt (1 Satz)

**FAIL wenn:** Ein Objekt fehlt oder ist inkonsistent

---

### D1: Inputverfuegbarkeit

**Bewertung:** FRAGIL

**Begruendung:**

Das Testfall-MATERIAL_GERUEST enthält *bereits* die Sequenzkontext-Objekte (Zeilen 138-158):

```
**mat-4-1:**
- vorher: — (Position 1)
- nachher: mat-4-2 | karte | Visualisiert den Schlieffen-Plan: Angriffspfeile durch Belgien.

**mat-4-2:**
- vorher: mat-4-1 | darstellungstext | Erklaert Zweifrontenkrieg und Schlieffen-Plan als Strategie mit Zeitluecke.
- nachher: mat-4-3 | tagebuch | Personifiziert den Vormarsch: Siegeszuversicht → Erschoepfung.
```
[... etc ...]

**ABER: Kritische Frage zur Pipeline-Timing:**

Laut GUETEKRITERIEN_SEQUENZIERUNG Sektion 6.1.6:
> "Jedes Material hat ein vollständiges `sequenz_kontext`-Objekt"

Und laut AGENT_MATERIAL.md Aufgabe 1.9.5 (Zeile 236):
> "Sequenzkontext-Objekte generieren: Pro Material das `sequenz_kontext`-Objekt mit `vorher` und `nachher`."

**Timeline-Problem:**
- **Phase 1 (Design):** Sequenzplan wird erstellt → sequenz_kontext-Objekte müssen hier GENERIERT werden
- **Phase 2.1 (Produktion):** SUB_MATERIAL_* braucht sequenz_kontext als INPUT (AGENT_MATERIAL.md Read-Schritt 2: "NUR referenzierte knoten + stundenfrage")

**ABER:** Der Testfall ist ein `MATERIAL_GERUEST` (Entwurf). Es ist unklar, ob diese Objekte:
A) Vom Agent generiert wurden (erwartbar) → Output Phase 1
B) Vom User hinzugefügt wurden → nicht geprüfte Input
C) Zu Dokumentationszwecken nachträglich erstellt wurden → nicht real

**Effekt auf D1-Bewertung:**
- Die Objekte SIND verfügbar im Testfall
- ABER die semantische Verfügbarkeit zum Q-Gate-Zeitpunkt ist fraglich
- **Verfügbarkeitsbewertung: FRAGIL** — Input existiert, aber sein Ursprung/Zuverlässigkeit ist unklar

---

### D2: Entscheidungsdeterminiertheit

**Bewertung:** FRAGIL

**Analyse:**

Die Prueflogik basiert auf **Zeichenketten-Konsistenz**:
- `nachher` von mat-N muss `vorher` von mat-(N+1) entsprechen

**Problem 1: Was bedeutet "entsprechen"?**

Testfall Zeile 145-146:
```
**mat-4-2:**
- vorher: mat-4-1 | darstellungstext | Erklaert Zweifrontenkrieg und Schlieffen-Plan als Strategie mit Zeitluecke.
```

Testfall Zeile 140-142:
```
**mat-4-1:**
- vorher: — (Position 1)
- nachher: mat-4-2 | karte | Visualisiert den Schlieffen-Plan: Angriffspfeile durch Belgien.
```

**Konsistenz-Check:**
- `mat-4-1.nachher.id` = "mat-4-2" ✓
- `mat-4-2.vorher.id` = "mat-4-1" ✓ (Symmetrie korrekt)

**ABER: Kerninhalt-String ist unterschiedlich!**
- `mat-4-1.nachher.kerninhalt` = "Visualisiert den Schlieffen-Plan: Angriffspfeile durch Belgien."
- `mat-4-2.vorher.kerninhalt` = "Erklaert Zweifrontenkrieg und Schlieffen-Plan als Strategie mit Zeitluecke."

Diese sind **inhaltlich komplementär** (nicht identisch). Sie beschreiben das Gleiche Material aus zwei Perspektiven:
- Aus Position 1: "Was kommt danach?" (Forward-Perspective)
- Aus Position 2: "Was kommt davor?" (Backward-Perspective)

**Prueflogik-Frage:** Ist "inhaltliche Komplementarität" ausreichend oder wird "exakte Zeichenketten-Übereinstimmung" erwartet?

Das GUETEKRITERIEN_SEQUENZIERUNG.md Sektion 6.1.6 sagt:
> "`vorher` von Material N muss mit `nachher` von Material N-1 **übereinstimmen**"

**Das Wort "übereinstimmen" ist mehrdeutig:**
- Interpretation A: exakte Zeichenketten-Gleichheit
- Interpretation B: semantische Äquivalenz

Testfall PASS (Interpretation B), FAIL (Interpretation A).

**Problem 2: Kerninhalt-Länge hat keine Schwelle**

Sequenzkontext-Objekt bei mat-4-1.nachher (Zeile 142):
> "Visualisiert den Schlieffen-Plan: Angriffspfeile durch Belgien."

Länge: 14 Wörter.

Alternative (hypothetisch):
> "Karte zeigt Plan"

Länge: 3 Wörter.

Prueflogik hat **keine Schwelle** für Kerninhalt-Mindestkomplexität. Agent könnte sagen: "nachher: mat-4-2 | karte | Plan" — ist das PASS oder FAIL?

**Determinismus-Bewertung:**
- Objektexistenz (vorher/nachher felder da?) → DETERMINIERT
- Objektkonsistenz (Übereinstimmung) → FRAGIL (wegen Mehrdeutigkeit der Prüfregel)
- Kerninhalt-Qualität → UNGEPRÜFT (kein Schwellenwert)

---

### D3: Grenzfall-Robustheit

**Bewertung:** DEFEKT

**Grenzfall 1: Material mit sehr langem/kurzem Kerninhalt**

Testfall mat-4-4.nachher (Zeile 154):
> "Schuetzengraben-Foto: Stellungskrieg statt schnellem Sieg."

Länge: 8 Wörter.

Hypothetisch:
```
nachher: mat-4-5 | bildquelle | Foto
```

**Prueflogik:** Überprüft nur Existenz von `nachher`-Objekt und dass es Material-ID + Typ + Kerninhalt hat. Nicht die Qualität des Kerninhalts.

**Grenzfall-Szenario:** Ein Agent könnte alle `nachher`-Felder mit "..." füllen. Prueflogik würde PASS sagen, obwohl Sequenzkontext inhaltlich leer ist.

**Befund: DEFEKT** — Prueflogik hat keine Validierung für Kerninhalt-Minimalstandard.

**Grenzfall 2: Position-1 Material hat non-empty `vorher`**

Testfall mat-4-1 (Zeile 140):
```
- vorher: — (Position 1)
```

Hypothetisch:
```
- vorher: mat-0-99 | darstellungstext | Etwas aus Mappe 0
```

**Prueflogik (Sektion 6.1.6, Punkt 2):**
> "`vorher` darf nur bei Position 1 leer sein"

Umkehrlogik: "Wenn Position 1, dann `vorher` = empty ODER `vorher.id` = null/—"

**Beobachtung:** Das Testfall-MATERIAL_GERUEST sagt "—" (Bindestrich), nicht null.

Ist "—" äquivalent zu null? Prueflogik spricht nicht klar.

**Grenzfall-Szenario:** Agent füllt bei Position 1 ein echtes vorher-Objekt → Prueflogik FAIL oder PASS?

Hypothetisch: mat-4-1.vorher = {id: "mat-3-5", typ: "darstellungstext", kerninhalt: "Kriegsbegeisterung..."}

**Prueflogik hat keine Schwelle zur Erkennung dieses Fehlers.**

**Befund: DEFEKT** — Prueflogik validiert nicht, dass Position-1-Material Null-vorher haben muss.

**Grenzfall 3: Letzte Position mit non-empty `nachher`**

Testfall mat-4-5 (Zeile 156-158):
```
- vorher: mat-4-4 | karte | Zeigt die Marne-Schlacht: Gegenoffensive und deutscher Rueckzug.
- nachher: — (letzte Position)
```

Hypothetisch:
```
- nachher: mat-5-1 | darstellungstext | Transfer-Material Mappe 5
```

**Prueflogik (Punkt 3):**
> "`nachher` darf nur bei letzter Position leer sein"

Umkehrlogik: "Wenn letzte Position, dann `nachher` = empty"

**Grenzfall-Szenario:** Agent verbindet Mappe 4 und 5 über sequenz_kontext → Prueflogik detektiert das nicht.

**Befund: DEFEKT** — Prueflogik validiert nicht Position-Kongruenz.

---

### D4: Ueberlappungsfreiheit

**Bewertung:** FRAGIL

**Analyse:**

S6 prüft **Sequenzkontext-Vollständigkeit** (jedes Material hat korrektes vorher/nachher).

| Kriterium | Prueft | S6-Relevanz | Kollidiert? |
|---|---|---|---|
| S1 (Artikulationsschema) | Phasenfolge | NEIN | NEIN |
| S2 (Vorwissen-Progression) | Fachbegriff-Verfügbarkeit | NEIN | NEIN |
| S3 (TB-Knoten-Abdeckung) | Knoten-Abdeckung | NEIN | NEIN |
| S4 (Didaktische-Funktion-Sequenzlogik) | Funktionsreihenfolge | **JA** | **JA — Potenzielle Redundanz** |
| S5 (Vergegenwärtigung vor Besinnung) | Typ-Reihenfolge | NEIN | NEIN |
| S9 (Uebergangs-Kohaerenz) | Ueberleitungstexte | **JA** | **JA — Kerninhalt-Beschreibung könnte mit Ueberleitung konkurrieren** |
| S14 (SCPL-Korrespondenz) | SCPL-Aufbau-Monotonie | **JA** | **JA — Nachher von mat-N korrespondiert mit Material-Reihenfolge** |
| S15 (Skript-Kongruenz) | SKRIPT-Reihenfolge | **JA** | **JA — impliziert Sequenzreihenfolge** |

**Redundanz S4 ↔ S6:**
- S4 prüft: Sind die `didaktische_funktion` Werte monoton aufsteigend?
- S6 prüft: Sind die `sequenz_kontext` Objekte konsistent?
- Wenn S6 PASS (nachher-IDs folgen korrekt), ist implizit auch S4-Reihenfolge etabliert
- Aber S4 prüft den **Wert** der Funktion, nicht nur die Reihenfolge → Keine vollständige Redundanz

**Redundanz S9 ↔ S6:**
- S9 prüft: Sind die Ueberleitungstexte inhaltlich motiviert?
- S6 prüft: Sind die sequenz_kontext.kerninhalt Felder vollständig?
- `kerninhalt` ist eine 1-Satz-Zusammenfassung des Materials
- `ueberleitung` ist ein Brückensatz zwischen zwei Materialien
- Diese sind konzeptuell unterschiedlich, aber beide beschreiben Sequenzkonnektivität

**Befund:**
- S6 und S4 sind **teilweise redundant** (Reihenfolge impliziert)
- S6 und S9 sind **komplementär** (Kerninhalt vs. Brückensatz sind unterschiedlich)
- S6 und S14 sind **komplementär** (SCPL-Struktur vs. Sequenzkontext sind orthogonal)

**Trennschärfe-Bewertung: FRAGIL**

Empfehlung: S6 könnte auf Position-ID-Validierung reduziert werden (technische Konsistenz) und die Kerninhalt-Beschreibung könnte zu S9 migrieren.

---

### D5: Nachbesserbarkeit

**Bewertung:** FRAGIL

**Nachbesserungsfall 1: fehlende nachher-Objekt bei mat-4-3**

```
**mat-4-3:**
- vorher: mat-4-2 | ... (vorhanden)
- nachher: [FEHLT]
```

**Autonom nachzubessern?**
- Agent kann `nachher` generieren aus Sequenzplan-Zeile für Position 4 (mat-4-4)
- Kerninhalt kann aus Sequenzplan Spalte "Kerninhalt" entnommen werden (Zeile 128)
- **Autonom: JA, relativ einfach**

**Nachbesserungsfall 2: Inkonsistenz zwischen mat-4-1.nachher und mat-4-2.vorher**

```
mat-4-1.nachher = "Visualisiert...Belgien" (14 Wörter)
mat-4-2.vorher = "Erklaert...Zeitluecke" (11 Wörter)
```

**Aktion:** Welche Version ist "korrekt"?
- Option A: Sie sollten identisch sein (Sektion 6.1.6 "übereinstimmen")
- Option B: Sie sollten sich ergänzen (was ich beobachte)

Ohne Klarheit in D2, kann Agent nicht autonom entscheiden.

**Nachbesserungsfall 3: mat-4-1 hat non-empty vorher**

```
mat-4-1.vorher = {id: "mat-3-99", ...}  # FEHLER, Pos 1 sollte leer sein
```

**Autonom nachzubessern?**
- Agent kann Fehler detektieren: "mat-4-1.vorher sollte null sein"
- Agent kann korrigieren: `vorher = null`
- **Autonom: JA, trivial**

**Gesamtbewertung: FRAGIL**
- Einfache Fehler (fehlende Objekte, Position-Verletzungen) sind autonom behebbar
- Zeichenketten-Inkonsistenzen erfordern Interpretation und sind nicht trivial

---

### D6: Fachdidaktische Dichte

**Bewertung:** DEFEKT

**Kritische Analyse:**

Was ist der fachdidaktische Sinn von S6?

**These aus GUETEKRITERIEN_SEQUENZIERUNG:**
> "Sequenzkontext-Objekte werden später als Pflicht-Input an die Materialtyp-Subagenten übergeben" (AGENT_MATERIAL.md Zeile 236)

**Subagenten-Kontext:** Laut AGENT_MATERIAL.md Read-Schritt 2 (Phase 2.1):
> "rahmen/hefteintrag.json | NUR referenzierte knoten + stundenfrage | immer"

Das bedeutet: Subagenten kriegen das Tafelbild, ABER ausschliesslich die für **ihr Material relevanten Knoten**.

Frage: Brauchen Subagenten also `sequenz_kontext`?

**Hypothese:** `sequenz_kontext` soll dem Subagenten sagen: "Dein Material steht in einer Kette zwischen mat-4-2 und mat-4-4. Das sind deine didaktischen Bezugsrahmem."

**Aber:** Das ist **organisatorische Metainformation**, nicht fachdidaktische Substanz.

**Fachdidaktischer Kern von Sequenzierung:**
1. Materialien folgen dem Artikulationsschema (S1)
2. Fachbegriffe werden progressiv eingführt (S2)
3. Alle Lernziele (TB-Knoten) werden abgedeckt (S3)
4. Funktionen sind monoton (S4)
5. Vergegenwärtigung vor Besinnung (S5)
6. Übergänge sind kohärent (S9)
7. Reihenfolge folgt dem Skript (S15)

**S6 fügt *nicht* zu diesem Kern bei.** Es ist eine Meta-Ebene für Subagenten-Dispatch.

**Alternativer Ansatz (sollte erwogen werden):**
- S6 als **Pre-Check** auslagern: Vor eigentlichem Q-Gate automatisch vom Choreografen durchführen
- S6 in Phase 1.5 (User-Validierung) durchführen: User bestätigt Sequenzreihenfolge, sequenz_kontext wird mechanisch generiert
- Nicht als MUSS-Kriterium behandeln, das den Q-Gate verzögert

**Fachdidaktische Bewertung: DEFEKT**
S6 operationalisiert nicht einen fachdidaktischen Kern, sondern eine technische Prozessanforderung. Es gehört nicht in den Q-Gate, sondern in die Subagenten-Input-Vorbereitung.

---

### Testfall-Analyse: Mappe 4 konkret

**Beobachtung:** Alle sequenz_kontext-Objekte sind vorhanden und syntaktisch konsistent (Zeilen 138-158).

**Detailbewertung je Material:**

| Material | Vorher-Status | Nachher-Status | Konsistenz |
|---|---|---|---|
| mat-4-1 | "—" (korrekt Pos 1) | mat-4-2 | ✓ nachher.id passt zu mat-4-2 |
| mat-4-2 | mat-4-1 | mat-4-3 | ✓ vorher.id passt zu mat-4-1, nachher.id zu mat-4-3 |
| mat-4-3 | mat-4-2 | mat-4-4 | ✓ Konsistent |
| mat-4-4 | mat-4-3 | mat-4-5 | ✓ Konsistent |
| mat-4-5 | mat-4-4 | "—" (korrekt letzte Pos) | ✓ nachher leer |

**Kerninhalt-Qualität (subjektiv):**
- mat-4-1.nachher: "Visualisiert den Schlieffen-Plan: Angriffspfeile durch Belgien." — gut (prägnant, 1 Satz)
- mat-4-2.vorher: "Erklaert Zweifrontenkrieg und Schlieffen-Plan als Strategie mit Zeitluecke." — gut
- Alle anderen: vergleichbar gut

**Testfall-Ergebnis: PASS** (auf syntaktischer Ebene)

---

### Gesamt-Urteil S6

| Dimension | Bewertung | Begruendung |
|---|---|---|
| D1: Inputverfuegbarkeit | FRAGIL | Objekte sind im Testfall vorhanden, aber Pipeline-Timing (wann werden sie generiert?) ist unklar |
| D2: Entscheidungsdeterminiertheit | FRAGIL | "Übereinstimmung" ist mehrdeutig; Kerninhalt-Qualität hat keine Schwelle |
| D3: Grenzfall-Robustheit | DEFEKT | Keine Validierung für: Kerninhalt-Minimalstand, Position-1-Null-vorher, letzte-Position-Null-nachher |
| D4: Ueberlappungsfreiheit | FRAGIL | Teilweise redundant mit S4 (Reihenfolge-Implikation), komplementär zu S9 und S14 aber nicht klar abgegrenzt |
| D5: Nachbesserbarkeit | FRAGIL | Einfache Fehler sind autonom behebbar, Inkonsistenzen erfordern Interpretation |
| D6: Fachdidaktische Dichte | DEFEKT | S6 ist Meta-Prozess, nicht fachdidaktischer Kern; gehört nicht in Q-Gate |

**GESAMT-URTEIL: FRAGIL**

**Hauptprobleme:**
1. Prueflogik hat Mehrdeutigkeiten (D2)
2. Validierungsregeln fehlen (D3)
3. Fachdidaktische Begründung fehlt (D6)

---

### Empfohlene Patch S6

**Patch A: Klärung der Prueflogik (D2)**

```markdown
### S6 REVISED: Sequenzkontext-Vollstaendigkeit

**Prueflogik:**
1. Fuer jedes Material in Sequenzplan pruefe:
   - `sequenz_kontext.vorher` hat Struktur {id, typ, kerninhalt} ODER id=null (bei Pos 1)
   - `sequenz_kontext.nachher` hat Struktur {id, typ, kerninhalt} ODER id=null (bei letzte Pos)
2. Konsistenz-Check (reine ID-Ebene, nicht Zeichenketten):
   - `sequenz_kontext[N].nachher.id == sequenz_kontext[N+1].vorher.id` (für N < M-1)
   - `sequenz_kontext[N].nachher.typ == sequenz_kontext[N+1].typ`
3. Kerninhalt-Validierung:
   - Jeder kerninhalt ist 8-25 Wörter (Minimalstand und Maximalstand)
   - Kerninhalt enthält das Material-Verb (z.B. "Visualisiert", "Erklaert", "Zeigt")

**FAIL wenn:** Position-Regel verletzt ODER Kerninhalt außerhalb Bandbreite
```

**Patch B: Auslagerung als Pre-Check (D6)**

Statt S6 als MUSS-Kriterium des Q-Gates:
- **Phase 1.8.5:** Nach Sequenzplan-Erstellung (Aufgabe 1.9.1-1.9.4) → Automatischer Pre-Check: sequenz_kontext-Objekte generieren
- **Phase 1.5 (User-Validierung Gate):** User bestätigt Materialreihenfolge visual
- **Phase 2.1 (Produktion):** sequenz_kontext-Objekte sind bereits im MATERIAL_GERUEST und werden an Subagenten weitergeleitet

Dies würde:
- S6 als Q-Gate-Kriterium entlasten (reine Technikalität)
- Den Workflow streamlinen (sequenz_kontext ist für Subagenten-Dispatch essentiell, nicht für Q-Gate)
- Die fachdidaktischen Kriterien (S1-S5, S9, S14, S15) fokussiert halten

---

## S15: Skript-Kongruenz (MUSS)

### Kriterium-Definition
**Quelle:** GUETEKRITERIEN_SEQUENZIERUNG.md, Sektion 6.1.15
**Prueflogik:**
1. Für jedes Material: Bestimme die Quellpassage im SKRIPT (Artefakt-Marker oder Absatz-Referenz)
2. Ordne jedem Material einen SKRIPT-Index zu (Reihenfolge des Auftretens im Chunk)
3. Pruefe: Ist die Sequenzplan-Reihenfolge kongruent mit der SKRIPT-Index-Reihenfolge?
4. Abweichungen dokumentieren mit Begruendung
5. **FAIL wenn:** Mehr als 2 Materialien abweichen UND keine Begruendung

---

### D1: Inputverfuegbarkeit

**Bewertung:** ROBUST

**Analyse:**

**SKRIPT-Input:** Das Testfall-MATERIAL_GERUEST enthält Spalte "Skript-Ref" (Zeilen 12-18):
- mat-4-1: §1-§3
- mat-4-2: §2, §4
- mat-4-3: §4
- mat-4-4: §5
- mat-4-5: §6

**SKRIPT-Kontext:** AGENT_MATERIAL.md sagt (Zeile 26):
> "SKRIPT: Validiertes Skript (gechunkt, mit Artefakt-Zuordnungen: img-IDs, zit-IDs, rolle-IDs)"

Testfall hat alle Skript-Referenzen konkret benannt (Paragraphenzahlen).

**Sequenzplan:** Zeilen 123-129 zeigen die aktuelle Reihenfolge:
1. mat-4-1
2. mat-4-2
3. mat-4-3
4. mat-4-4
5. mat-4-5

**Index-Konstruktion:**
- SKRIPT-Index für mat-4-1: 1 (§1 kommt zuerst)
- SKRIPT-Index für mat-4-2: 2 (§2 kommt nach §1)
- SKRIPT-Index für mat-4-3: 3 (§4 aber nach §2)
- SKRIPT-Index für mat-4-4: 4 (§5 kommt nach §4)
- SKRIPT-Index für mat-4-5: 5 (§6 kommt nach §5)

**Verfügbarkeit: ROBUST**
Alle Input-Daten sind vorhanden und lesbar.

---

### D2: Entscheidungsdeterminiertheit

**Bewertung:** FRAGIL

**Kritischer Punkt:** Was ist der "SKRIPT-Index"?

**Interpretation A: Index nach Absatz-Auftauchen (kanonisch)**
```
§1 (k4-2: Zweifrontenkrieg) → Index 1
§2 (k4-1: Schlieffen-Plan) → Index 2
§3 (k4-3: Zeitluecke) → Index 3
§4 (k4-1, k4-4: Plan + Einmarsch) → Index 4
§5 (k4-5: Marne) → Index 5
§6 (k4-6: Stellungskrieg) → Index 6
```

Nach dieser Interpretation: Mat-IDs müssen in Reihenfolge ihrer Ersterwähnung angeordnet sein:
- mat-4-1 (§1-§3) → Index 1.5 (erstes und anderes Material ab §1-§3 Bereich)
- mat-4-2 (§2, §4) → Index 2.5 (erscheint ab §2, hat aber auch §4)
- mat-4-3 (§4) → Index 4
- mat-4-4 (§5) → Index 5
- mat-4-5 (§6) → Index 6

**Interpretation B: Index nach "dominantem" Paragraph**
Wenn Material multiple Paragraphen abdeckt, zählt der erste:
- mat-4-1: dominiert in §1 → Index 1
- mat-4-2: dominiert in §2 → Index 2
- mat-4-3: §4 → Index 4
- mat-4-4: §5 → Index 5
- mat-4-5: §6 → Index 6

**Interpretation C: Index nach "relevantem" TB-Knoten**
Wenn Material primären TB-Knoten hat, indiziere nach dessen SKRIPT-Position:
- mat-4-1: primär k4-2 (in §1) → Index 1
- mat-4-2: primär k4-1 (in §2) → Index 2.5
- mat-4-3: primär k4-4 (in §4) → Index 4
- mat-4-4: primär k4-5 (in §5) → Index 5
- mat-4-5: primär k4-6 (in §6) → Index 6

**Problemlandschaft:**

**Kriterium S15 sagt (Sektion 6.1.15, Punkt 1-2):**
> "Für jedes Material: Bestimme die Quellpassage im SKRIPT (Artefakt-Marker oder Absatz-Referenz)"

"Quellpassage" ist mehrdeutig:
- Option 1: Erste Passage (mat-4-2 hat §2 als erste)
- Option 2: Passage mit Artefakt-Marker (mat-4-2 hat img-4-1 in §2 oder §4?)
- Option 3: Passage mit primärem TB-Knoten

Die Prueflogik gibt nicht preis, welche Interpretation korrekt ist.

**Deteminismus-Bewertung: FRAGIL**

Zwei verschiedene Auditor:innen könnten mat-4-2 unterschiedlich indizieren (Index 2 vs. 2.5 vs. 4).

---

### D3: Grenzfall-Robustheit

**Bewertung:** DEFEKT

**Grenzfall 1: Material mit Skript-Referenzen über mehrere "Blöcke"**

Testfall mat-4-2:
- Skript-Ref: §2, §4
- TB-Knoten: k4-1, k4-4

Frage: Welcher Paragraph ist "der" Index?
- §2 (erstes Auftreten) → Index 2
- §4 (letztes Auftreten) → Index 4
- Durchschnitt (heuristisch) → Index 3
- "Beliebig"

**Prueflogik antwortet nicht.** Sie sagt nur:
> "Bestimme die Quellpassage... Ordne... einen SKRIPT-Index zu"

Das ist **prozedural unterspecifiziert.**

**Grenzfall-Szenario:**
```
mat-4-2.skript_ref = ["§2", "§4"]
Agent1 indiziert: Index 2
Agent2 indiziert: Index 4
Kongruenz-Check:
- Agent1: [1, 2, 4, 5, 6] → mat-4-3 steht bei Index 4 (Abweichung nicht erkannt?)
- Agent2: [1, 2.5, 4, 5, 6] → mat-4-3 steht bei Index 4 (ok, aber mat-4-2 hat Index 4?)
Kollidieren Agent1 und Agent2?
```

**Befund: DEFEKT** — Keine Schwellenwertdefinition für Mehrabsatz-Materialien.

**Grenzfall 2: Material ohne explizite Skript-Referenz**

Hypothetisch: mat-4-6 (Transfer, nicht im Skript-Chunk vorgesehen)
- skript_ref = null oder "interpoliert"

**Prueflogik:** Punkt 1 sagt "Artefakt-Marker **oder** Absatz-Referenz"

Was wenn weder noch? Das ist nicht adressiert.

**Befund: DEFEKT**

**Grenzfall 3: SKRIPT-Reihenfolge widerspricht S14 (SCPL-Korrespondenz)**

Hypothetisch:
- SKRIPT-Reihenfolge: mat-4-5 (§6, P-Knoten) vor mat-4-3 (§4, C-Knoten)
- SCPL-Korrespondenz (S14): C-Knoten müssen vor P-Knoten stehen

**Prueflogik S15 sagt (Sektion 6.1.15, Punkt 4):**
> "Abweichungen dokumentieren mit Begruendung (z.B. 'S14: SCPL-Korrespondenz erfordert Umstellung')"

Das bedeutet: Wenn SKRIPT und S14 in Konflikt stehen, kann Agent S15 mit Begruendung nicht bestehen.

**FAIL-Schwelle (Punkt 5):**
> "FAIL wenn: Mehr als 2 Materialien von der SKRIPT-Reihenfolge abweichen UND keine Begruendung"

**Interpretation:** "Mehr als 2" bedeutet: 3+ Materialien ohne Begruendung → FAIL. Mit Begruendung (wie S14-Konflikt) → PASS?

**Aber:** Das ist zirkulär! S14 ist das obergeordnete Kriterium (SCPL ist Sinnstruktur). S15 kann nicht überlagert werden, aber der Schwellenwert (2) ist willkürlich.

**Befund: DEFEKT** — Die Schwelle "mehr als 2 Abweichungen" ist nicht längennormiert. Eine 5-Material-Mappe mit 3 Abweichungen → FAIL. Eine 12-Material-Mappe mit 3 Abweichungen → FAIL (gleich). Das ist nicht proportional.

---

### D4: Ueberlappungsfreiheit

**Bewertung:** FRAGIL

**Analyse:**

S15 prüft **Skript-Kongruenz** (Materialreihenfolge folgt Skript-Reihenfolge).

| Kriterium | Prueft | S15-Überlappung? |
|---|---|---|
| S1 | Artikulationsschema-Phasenfolge | Parallel, nicht überlappend |
| S2 | Vorwissen-Progression | Parallel |
| S3 | TB-Knoten-Abdeckung | NEIN (Existenz vs. Reihenfolge) |
| S4 | Didaktische-Funktion-Sequenzlogik | **JA — Reihenfolgeimplikation** |
| S5 | Vergegenwärtigung vor Besinnung | **JA — Typ-Reihenfolge impliziert Skript-Position** |
| S14 | SCPL-Korrespondenz | **JA — Obergeordnete Reihenfolgelogik** |

**Kollidierendes Beispiel:**

Hypothetisch: Skript sagt mat-4-5 vor mat-4-4, aber S14 sagt P vor C unmöglich.
- S14 PASS ← Reihenfolge mat-4-4 dann mat-4-5
- S15 FAIL ← Skript ist mat-4-5 dann mat-4-4

**Auflösung:** S15 Punkt 4 sagt: "mit Begruendung (z.B. S14-Konflikt) dokumentieren"

Das bedeutet: S15 hat eine **Escape-Klausel** für Konflikte mit höherrangigen Kriterien.

**Aber:** Das macht S15 nicht "überlappungsfrei" — es ist eher **subordiniert**.

**Trennschärfe-Bewertung: FRAGIL**

S15 ist nicht trennscharf unabhängig definiert. Es ist an S14 gekoppelt.

---

### D5: Nachbesserbarkeit

**Bewertung:** FRAGIL

**Nachbesserungsfall 1: mat-4-3 folgt nicht Skript-Reihenfolge**

Hypothetisch:
- Aktuell: mat-4-3 steht nach mat-4-2 (Position 3)
- SKRIPT-Reihenfolge: mat-4-3 sollte nach mat-4-4 stehen (wegen §4 vs. §5 Absatzfolge)

**Aktion:**
1. Material umpositionieren: Position 4 statt 3
2. Sequenzplan Zeilen umnummerieren
3. `sequenz_kontext` Objekte regenerieren
4. S4 (Funktion-Monotonie) prüfen → nicht verletzt (beide erarbeitung)
5. S14 (SCPL) prüfen → nicht verletzt (beide C-Knoten)

**Autonom nachzubessern: JA, technisch möglich**

**Nachbesserungsfall 2: Begruendung für Abweichung einreichen**

Aktuell (testfall): mat-4-2 (§2, §4) steht bei Position 2. Nach strikter §-Reihenfolge müsste §2-Material zuerst kommen. Mat-4-2 kommt aber nicht sofort nach §1 (mat-4-1 kommt dazwischen).

**Kann Agent autonom Begruendung generieren?**

Hypothetisch:
```
mat-4-2 Abweichung Begruendung:
"S4: Didaktische-Funktion-Sequenzlogik erlaubt mehrere erarbeitung-Materialien parallel.
 mat-4-1 (erarbeitung, §1-§3) und mat-4-2 (erarbeitung, §2,§4) können parallel zur
 Erarbeitung von C1 (Schlieffen-Plan Idee + Zeitluecke) verwendet werden. Reihenfolge
 mat-4-1 → mat-4-2 ist didaktisch begründet (erst Idee erklärt, dann visualisiert)."
```

**Probleme:**
1. Agent muss S4-Logik verstehen und anwenden
2. Agent muss "didaktisch begründet" Argument formulieren (kreativ, nicht trivial)
3. "Ich folge S14 statt SKRIPT" ist nicht immer ausreichend ohne konkrete Begruendung

**Autonom nachzubessern: FRAGIL** — Begruendung ist teilweise autonom möglich, teilweise erfordert Urteil.

---

### D6: Fachdidaktische Dichte

**Bewertung:** ROBUST

**Analyse:**

Operationalisiert die Frage: "Folgt die Materialsequenz dem narrativen Aufbau des Skripts?"

**Fachdidaktischer Kern:**
- Im v4-Workflow ist das SKRIPT eine "didaktisierte Erzählung" (AGENT_MATERIAL.md Zeile 18): "AGENT_MATERIAL transformiert diese Substanz in didaktisch wirksame Lernmaterialien."
- Die SKRIPT-Reihenfolge ist keine zufällige Aneinanderreihung, sondern eine **narrative Sequenz**: konkret → abstrakt, bekannt → unbekannt
- S15 validiert, dass diese Narrativität in der Materialsequenz erhalten bleibt

**Was S15 sichert:**
- Lernende erleben denselben "roten Faden" wie im Skript
- Keine "Sprünge" in der Argumentation
- Kumulativer Aufbau ist gewährleistet

**Was S15 NICHT sichert:**
- Dass die Reihenfolge optimal ist (dafür: S1, S4, S5, S14)
- Dass individuelle Materialien hochwertig sind (dafür: SUB_MATERIAL_*, SQ-1 bis SQ-4)

**Fachdidaktisches Kernverständnis: ROBUST**
S15 bildet den Kern (Narrativität der Sequenz) vollständig ab.

---

### Testfall-Analyse: Mappe 4 konkret

**SKRIPT-Reihenfolge-Rekonstruktion:**

Das Testfall-MATERIAL_GERUEST nennt SKRIPT-Referenzen:
```
mat-4-1: Skript-Ref: §1-§3
mat-4-2: Skript-Ref: §2, §4
mat-4-3: Skript-Ref: §4
mat-4-4: Skript-Ref: §5
mat-4-5: Skript-Ref: §6
```

**Kanonische SKRIPT-Absatzfolge (§1, §2, §3, §4, §5, §6):**
- mat-4-1 tritt zuerst auf (§1)
- mat-4-2 tritt auf in §2 (parallel zu mat-4-1? oder später?)
- mat-4-3 tritt auf in §4
- mat-4-4 tritt auf in §5
- mat-4-5 tritt auf in §6

**Interpretationsfall: mat-4-2 mit §2, §4**

Annahme A: §2 ist "dominierende" Position → Index 2
- Sequenz nach SKRIPT-Index: [1, 2, 4, 5, 6] (mat-IDs)
- Aktuelle Sequenz (Testfall): [mat-4-1, mat-4-2, mat-4-3, mat-4-4, mat-4-5] = [1, 2, 3, 4, 5]
- Kongruenz: Ja (sortiert)

Annahme B: Reihenfolge der Index-Konstruktion
- mat-4-1: Index 1 (erstes Material, §1 Absatz)
- mat-4-2: Index 2 oder 4? (Mehrabsatz-Material)
- mat-4-3: Index 4 (§4)
- mat-4-4: Index 5
- mat-4-5: Index 6

**Testfall-Ergebnis (Interpretation A): PASS**

Die Sequenzplan-Reihenfolge folgt (grosso modo) der Skript-Reihenfolge.

**Dokumentierte Abweichungen (Sektion 6.1.15, Punkt 4):**

Das Testfall-MATERIAL_GERUEST (Zeile 120) sagt:
> "Ordnungsrahmen: SKRIPT-Absatzfolge (Primaer) + SCPL-Aufbau (Kontrolle). Keine Divergenz — beide kongruent."

Das heisst: Der Tester hat bereits verifiziert, dass SKRIPT und SCPL nicht divergieren. **S15 ist gepasst.**

---

### Gesamt-Urteil S15

| Dimension | Bewertung | Begruendung |
|---|---|---|
| D1: Inputverfuegbarkeit | ROBUST | Skript-Referenzen sind explizit benannt (§1-§6) |
| D2: Entscheidungsdeterminiertheit | FRAGIL | SKRIPT-Index-Definition ist mehrdeutig (erster Absatz vs. Primärer Knoten vs. Artefakt-Marker) |
| D3: Grenzfall-Robustheit | DEFEKT | Keine Schwellenwertdefinition für Mehrabsatz-Materialien, keine Behandlung skript_ref=null, Schwelle "2 Abweichungen" nicht längennormiert |
| D4: Ueberlappungsfreiheit | FRAGIL | Subordiniert unter S14 (SCPL-Korrespondenz); Escape-Klausel macht Unabhängigkeit fragwürdig |
| D5: Nachbesserbarkeit | FRAGIL | Umpositionierung ist autonom möglich, Begruendung erfordert Urteil |
| D6: Fachdidaktische Dichte | ROBUST | Operationalisiert die Narrativität der Sequenz vollständig |

**GESAMT-URTEIL: FRAGIL**

**Hauptprobleme:**
1. SKRIPT-Index ist unterspecifiziert (D2)
2. Grenzfälle haben keine Behandlung (D3)
3. Schwellenwert nicht proportional (D3)
4. S15 ist subordiniert unter S14 (D4)

---

## Cluster-Analyse: Pipeline-Timing und Zirkularitaet

### 1. Artefakt-Lebenszyklus in der Pipeline

**Phase 0 (Vorbereitung):**
- Phase 0.1: DIDAKTIK_RAHMEN (Lernziele, Kompetenzmatrix)
- Phase 0.2: INHALTSBASIS (fachliche Substanz)
- Phase 0.3: SKRIPT (narrativ strukturiert, gechunkt)
- Phase 0.4: TAFELBILD (fixiert nach Q-Gate G1-G14)

**Phase 1 (Design):**
- Aufgabe 1.1-1.8: Material-Blueprint-Erstellung
- Aufgabe 1.9: **Sequenzplanung inkl. sequenz_kontext-Generierung**
  - Sequenzplan (Tabelle)
  - Ueberleitungen (Intentionsskizzen)
  - **sequenz_kontext-Objekte pro Material**
- Q-Gate: S1-S15 Pruefung
- Phase 1.5: User-Validierung

**Phase 2 (Produktion):**
- Phase 2.1: Subagenten-Dispatch (SUB_MATERIAL_*)
  - Input: MATERIAL_GERUEST (mit sequenz_kontext)
  - Input: rahmen/hefteintrag.json, SKRIPT, INHALTSBASIS
  - Output: mat-N-M.json (einzelne Materialien)
- Phase 2.2-2.5: Weitere Refinement
- Phase 3: Assembly zu data.json

### 2. S6 und das Timing-Problem

**Situation:**
- S6 prüft: `sequenz_kontext`-Objekte sind vollständig und konsistent
- Diese Objekte werden in **Phase 1, Aufgabe 1.9.5** generiert
- Aber S6 ist auch ein **MUSS-Kriterium** des Q-Gates (Phase 1.9)

**Zirkularitätsfrage:** Ist das zirkulär?

**Analyse:**
- Phase 1.9.1-1.9.4: Sequenzplan wird entworfen (Tabelle, Ueberleitungen, erste 4/5 von S1-S15)
- Phase 1.9.5: sequenz_kontext-Objekte werden aus Sequenzplan mechanisch generiert
- Phase 1.9.6-1.9.N: Uebrige Kriterien S1-S15 prüfen (inkl. S6)

**Das ist NICHT zirkulär**, sondern **sequenziell**:
1. Sequenzplan entwirft
2. sequenz_kontext daraus generieren (mechanisch)
3. S6 validiert, dass die Generierung korrekt war

**Aber:** Das macht S6 zu einem "Qualitätskontroll-Kriterium für einen Prozessschritt", nicht zu einem "didaktischen Qualitätskriterium".

### 3. S15 und SKRIPT-Kongruenz: Timing-Issue

**Situation:**
- S15 prüft: Materialreihenfolge folgt SKRIPT-Reihenfolge
- SKRIPT ist in Phase 0.3 validiert
- Sequenzplan wird in Phase 1.9 entworfen

**Frage:** Kann es sein, dass Sequenzplan von SKRIPT-Reihenfolge abweicht?

**Antwort:** JA, und das ist sogar erwünscht (wenn S14 SCPL-Korrespondenz dies erfordert).

**Beispiel aus Testfall:**
- SKRIPT hat §1-§6 in dieser Reihenfolge
- Aber Sequenzplan könnte (hypothetisch) mat-4-5 (§6, P-Knoten) vor mat-4-3 (§4, C-Knoten) setzen, weil S14 das erfordert
- S15 würde dann mit Begruendung PASS geben

**Timing-Konsequenz:**
- S15 Validierung erfolgt in Phase 1.9, nachdem S14 validiert wurde
- S15 muss S14 als "Übergeordnete Regel" anerkennen
- Das ist nicht Zirkularität, sondern **Hierarchie** (S14 > S15 bei Konflikt)

### 4. S3 und die Tafelbild-Freeze

**Situation:**
- S3 prüft: Alle TB-Knoten aus TAFELBILD werden von Materialien abgedeckt
- TAFELBILD ist nach Phase 0.4 fixiert (STRUKTUR-FREEZE)

**Timing:** 
- TAFELBILD-Knoten sind zum Start von Phase 1 bereits definiert (unveränderbar)
- Material-Blueprint wird gegen diese Knoten designed
- S3 prüft Abdeckung → FAIL bedeutet: Material-Blueprint muss überarbeitet werden, NICHT Tafelbild

**Keine Zirkularität, sondern klare **Priorität: TAFELBILD > MATERIAL_BLUEPRINT**

### 5. Pipeline-Kongruenz insgesamt

**Erkenntnis:**

Die drei Kriterien haben **unterschiedliche Rollen im Workflow**:

| Kriterium | Rolle | Timing | Abhängigkeiten |
|---|---|---|---|
| S3 | Validiert Einsatz-Vollständigkeit | Phase 1.9 | Abhängig von TAFELBILD (Phase 0.4) |
| S6 | Validiert Prozess-Korrektheit | Phase 1.9 | Abhängig von Sequenzplan (Phase 1.9.1-1.9.4) |
| S15 | Validiert narrative Kongruenz | Phase 1.9 | Abhängig von SKRIPT (Phase 0.3) + S14 (hierarchisch) |

**Keine Zirkularität nachgewiesen.** Aber:
- S6 ist eine **Prozess-Validierung**, nicht eine fachdidaktische Validierung
- S3 und S15 sind **fachdidaktische Validierungen**

**Empfehlung:** S6 sollte aus dem Q-Gate ausgelagert werden (siehe Patch S6).

---

## Zusammenfassung: Drei-Kriterien-Cluster

### Operationalisierungsqualität insgesamt

| Kriterium | Urteil | Kritikalität | Empfohlene Aktion |
|---|---|---|---|
| S3 | ROBUST | Zentral (TB-Abdeckung) | Produktionsreif; keine Änderung |
| S6 | FRAGIL | Prozess (nicht fachdidaktisch) | Auslagerung als Pre-Check oder Subagenten-Input |
| S15 | FRAGIL | Zentral (Narrativität) | Klärung der SKRIPT-Index-Definition + längennormierte Schwelle |

### Detaillierte Empfehlungen

#### Empfehlung 1: S3 bleibt unverändert
S3 ist robust operationalisiert und brauchbar. Der einzige Verbesserungsvorschlag ist eine leichte Klarifikation in der Dokumentation (welche Felder sind erforderlich), aber die Prueflogik selbst ist solide.

#### Empfehlung 2: S6 umdefinieren oder auslagern

**Option A: Auslagerung als Pre-Check (empfohlen)**
```
Phase 1.9.5 (neu): Vor S1-S15-Q-Gate
- Sequenzplan ist abgeschlossen (Aufgabe 1.9.1-1.9.4)
- Automatischer Pre-Check: sequenz_kontext-Objekte generieren und validieren (nur Syntax)
- ODER: User wird aufgefordert, Sequenzplan zu bestätigen → sequenz_kontext-Generierung durch System
- Danach: S1-S15 Q-Gate (ohne S6)
```

**Option B: S6 redefinieren (wenn Auslagerung nicht möglich)**
```
### S6 REVISED: Sequenzkontext-Vollstaendigkeit (MUSS)

**Prueflogik:**
1. Fuer jedes Material pruefe: `sequenz_kontext` Objekt existiert mit Struktur:
   ```json
   {
     "vorher": { "id": "...", "typ": "...", "kerninhalt": "..." } OR null (nur Pos 1),
     "nachher": { "id": "...", "typ": "...", "kerninhalt": "..." } OR null (nur letzte Pos)
   }
   ```
2. Reine ID-Konsistenz: `sequenz_kontext[N].nachher.id == sequenz_kontext[N+1].vorher.id`
3. Kerninhalt-Minimalstandard: 8-25 Wörter, mit Material-Verb (z.B. "Visualisiert", "Erklaert")

**FAIL wenn:** Position-Regel verletzt (Position 1 hat non-null vorher) ODER Kerninhalt außerhalb Bandbreite
```

#### Empfehlung 3: S15 präzisieren

**Patch S15: SKRIPT-Index-Definition klären**

```markdown
### S15 REVISED: Skript-Kongruenz (MUSS)

**Input-Daten:** Sequenzplan, SKRIPT-Chunk mit Absatz-Struktur

**SKRIPT-Index-Definition (neu):**
1. Fuer jedes Material: Bestimme die **erste Absatz-Position** im SKRIPT,
   in der das Material-Artefakt (img-ID, zit-ID, rolle-ID) oder das TB-Knoten erstmals erwähnt wird.
2. Materialien mit Artefakt-Marker: Index = Absatz des Markers
3. Materialien ohne Artefakt (z.B. reine TB-Erarbeitung): Index = Absatz, in dem TB-Knoten erstmals erwähnt
4. Bei Mehrabsatz-Material: Index = **Minimum über alle Absätze** (erste Erwähnung zählt)

**Prueflogik:**
1. Konstruiere SKRIPT-Index-Vektor: [idx(mat-4-1), idx(mat-4-2), ..., idx(mat-4-N)]
2. Konstruiere Sequenzplan-Vektor: [pos1, pos2, ..., posN]
3. Pruefe: Ist Sequenzplan-Vektor sortiert nach SKRIPT-Index-Vektor?
4. Abweichungen-Zähler: Wie viele Materialien stehen nicht in SKRIPT-Ordnung?
5. **FAIL-Schwelle (längennormiert):**
   - Abweichungen ≤ ⌊N/3⌋ → PASS (mit Begruendung)
   - Abweichungen > ⌊N/3⌋ → FAIL (ohne Begruendung akzeptiert als Fehler)
   - Bei N=5: ⌊5/3⌋ = 1 → max. 1 Abweichung erlaubt mit Begruendung

**Beispiel für Testfall (N=5):**
- SKRIPT-Index: [1, 2, 4, 5, 6] (nach Material)
- Sequenzplan: [1, 2, 3, 4, 5] (nach Position)
- Ordnung: Ist [1,2,3,4,5] sortiert nach [1,2,4,5,6]? Ja (monoton aufsteigend in Index)
- Abweichungen: 0
- Ergebnis: PASS
```

---

## Schlussfolgerungen und Priorisierte Massnahmen

### Befund insgesamt

Der "Strukturelle Vollstaendigkeit-Cluster" (S3, S6, S15) ist **teilweise operationalisiert, teilweise fragil**.

**Robuste Teile:**
- S3 (TB-Knoten-Abdeckung) ist klar, deterministisch und fachdidaktisch begründet
- S15 (Skript-Kongruenz) hat einen soliden fachdidaktischen Kern, aber operative Unterspecifizierung

**Fragile/Defekte Teile:**
- S6 (Sequenzkontext-Vollstaendigkeit) ist eine Prozess-Validierung, nicht fachdidaktisch
- S15 hat Mehrdeutigkeiten in der Index-Definition und nicht-längennormierte Schwellenwerte

### Priorisierte Massnahmen

**P1 (Kritisch, sofort):**
1. **S15-Klärung umsetzen:** SKRIPT-Index-Definition in GUETEKRITERIEN_SEQUENZIERUNG.md einfügen
2. **S15-Längennormierung:** Schwelle "mehr als 2 Abweichungen" durch ⌊N/3⌋ ersetzen
3. **S6-Statusüberprüfung:** Team diskutiert, ob S6 eine fachdidaktische oder nur prozessuale Regel ist

**P2 (Wichtig, Phase 1.10):**
4. Wenn S6 Prozess bleibt: Auslagerung aus Q-Gate-Katalog vorbereiten (wird zu Phase-1.9-Pre-Check)
5. Wenn S6 fachdidaktisch begründet sein soll: Vollständige Umdefinition mit Kerninhalt-Schwellen

**P3 (Dokumentation, mittel):**
6. S3 ist robust, aber Feldnamen-Dokumentation könnte präzisiert werden (z.B. "TB-Knoten ist ein Array von Strings wie ['k4-1', 'k4-2']")

### Testfall-Befunde (Mappe 4)

| Kriterium | Testfall-Ergebnis | Ist Operationalisierung schuld? |
|---|---|---|
| S3 | PASS (6/6 Knoten) | NEIN — Operationalisierung ist robust, Testfall erfüllt Anforderungen |
| S6 | PASS (5/5 sequenz_kontext) | JA, teilweise — Operationalisierung zu schwach (keine Kerninhalt-Validierung) |
| S15 | PASS (Sequenz folgt SKRIPT) | JA, teilweise — Operationalisierung unterspecifiziert (Index-Ambiguität) aber Testfall zufällig korrekt |

---

## Fazit

Der "Strukturelle Vollstaendigkeit-Cluster" ist **FRAGIL insgesamt**, mit ROBUST-Anteilen (S3) und DEFEKT-Anteilen (S6). 

**Zentrale Erkenntnisse:**
1. **S3 ist gut.** Keine Änderungen erforderlich. Kann produktionsreif sein.
2. **S6 ist fehl am Platz.** Es ist eine Prozess-Metrik, keine Qualitäts-Metrik. Sollte aus dem fachdidaktischen Q-Gate ausgelagert werden.
3. **S15 braucht Klärung.** Die SKRIPT-Index-Definition ist unterspecifiziert; die Schwelle ist nicht längennormiert.

**Gesamtempfehlung:** Den Cluster überarbeiten, den genannten Patches folgen, und S6 neu bewerten.

