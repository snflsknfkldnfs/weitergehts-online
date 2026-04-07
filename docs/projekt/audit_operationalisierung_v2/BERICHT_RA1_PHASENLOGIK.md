# RA1: Operationalisierungs-Audit — Phasenlogik-Cluster (S1, S4, S5, S14)

**Auditor:** RA1 (Spezialisiert auf Phasenlogik-Sequenzierung)  
**Datum:** 2026-04-07  
**Testfall:** MATERIAL_GERUEST Mappe 4 — Der Schlieffen-Plan  
**Testfall-Status:** ENTWURF (User-Validierung nach D-1.5, Produktionssession C2)

---

## Audit-Methode

**Prüfdimensionen pro Kriterium:**
- **D1**: Inputverfügbarkeit — Sind alle benannten Input-Daten vorhanden und im erwarteten Format?
- **D2**: Entscheidungsdeterminiertheit — Führt die Prüflogik bei identischem Input immer zum selben PASS/FAIL?
- **D3**: Grenzfall-Robustheit — Funktioniert die Logik bei Randfällen (2 Materialien, 8+ Materialien, Misch-Perspektiven)?
- **D4**: Überlappungsfreiheit — Ist das Kriterium trennscharf gegenüber anderen S-Kriterien?
- **D5**: Nachbesserbarkeit — Kann der Agent die Nachbesserung autonom umsetzen?
- **D6**: Fachdidaktische Dichte — Bildet die Formalisierung den fachdidaktischen Kern vollständig ab?

**Bewertungsskala:** ROBUST / FRAGIL / DEFEKT

---

## S1: Artikulationsschema-Konformität (MUSS)

### Definition (aus GUETEKRITERIEN_SEQUENZIERUNG.md Sektion 4)

**Operationalisierung:** Sequenz folgt dem Artikulationsschema der zutreffenden GPG-Perspektive (historisch/geographisch/sozialpolitisch). Phasenfolge darf nicht verletzt werden.

**Schematische Aufbauten:**
- **Historisch:** Problembegegnung → Vergegenwärtigung → Besinnung → Sicherung
- **Geographisch:** Hinführung → Situationskonfrontation → Situationsanalyse → Situationsbeurteilung → Sicherung
- **Sozialpolitisch:** Problemstellung → Problementfaltung → Problemlösung → Wertung → Sicherung

### Prüflogik (Sektion 6, S1)

1. Bestimme Perspektive aus `DIDAKTIK_RAHMEN.perspektive`
2. Ordne jede Sequenzposition einer Schema-Phase zu:
   - `einstieg` → Phase 1 (Problembegegnung/Hinführung/Problemstellung)
   - `erarbeitung` (narrativ) → Phase 2 (Vergegenwärtigung/Situationskonfrontation)
   - `erarbeitung` (analytisch) + `vertiefung` → Phase 3 (Besinnung/Situationsanalyse/Problementfaltung)
   - `sicherung` → Phase 4 (Sicherung)
3. Pruefe: Ist Zuordnung monoton aufsteigend? (Keine spätere Phase vor früherer)

### D1: Inputverfügbarkeit — FRAGIL

**Befund am Testfall:**

Das MATERIAL_GERUEST dokumentiert:
```
Sequenzplan:
| # | Material-ID | Typ | Didaktische Funktion | TB-Knoten | SCPL-Phase |
| 1 | mat-4-1 | darstellungstext | erarbeitung | k4-2, k4-1, k4-3 | S+C1 |
| 2 | mat-4-2 | karte | erarbeitung | k4-1, k4-4 | C1+C2 |
| 3 | mat-4-3 | tagebuch | erarbeitung | k4-4 | C2 |
| 4 | mat-4-4 | karte | erarbeitung | k4-5 | C3 |
| 5 | mat-4-5 | bildquelle | sicherung | k4-6 | P |
```

Im Sequenzplan werden sowohl `didaktische_funktion` als auch (!) `SCPL-Phase` dokumentiert. **Aber die Prüflogik S1 basiert nur auf Mapping von `didaktische_funktion` → Artikulations-Phase, nicht auf SCPL-Zuordnungen.**

**Problem:** Die Sequenzplan-Tabelle befüllt SCPL-Phase bereits, aber S1 Prüflogik verwendet dieses Feld nicht. Statt dessen soll S1 nur aus `didaktische_funktion` ablesen.

**Fehlende Input-Felder für vollständige S1-Prüfung:**
- `DIDAKTIK_RAHMEN.perspektive` — nicht im Testfall dokumentiert (müsste aus DIDAKTIK_RAHMEN Datei kommen)
- `Material[].erzaehler_typ` oder `Material[].narrativitaet` — nicht im MATERIAL_GERUEST, aber in Prüflogik gefordert ("erarbeitung (narrativ)" vs. "erarbeitung (analytisch)")
- Explizite Unterscheidung: Welche `erarbeitung`-Materialien sind narrativ (Vergegenwärtigung), welche analytisch (Besinnung)?

**Folgerung:** D1 = FRAGIL. Die Unterscheidung zwischen narrativer und analytischer Erarbeitung ist in der Prüflogik zentral, aber nicht im MATERIAL_GERUEST-Format vorhanden.

**Testfall-konkret:** Für mat-4-1 bis mat-4-4 (alle `erarbeitung`) ist unklar, welche Phasengruppe sie bedienen:
- mat-4-1 (DT) → narrativ (Vergegenwärtigung) oder analytisch (Besinnung)?
- mat-4-3 (Tagebuch) → narrativ (Vergegenwärtigung) oder analytisch (Besinnung)?

### D2: Entscheidungsdeterminiertheit — FRAGIL

**Befund:**

Die Prüflogik in Sektion 6 (S1, Punkt 2) fordert eine Klassifizierung, die nicht deterministisch ist:

> Ordne jede Sequenzposition einer Phase des Schemas zu:
> - Historisch: `einstieg` → Problembegegnung, `erarbeitung` (narrativ) → Vergegenwärtigung, `erarbeitung` (analytisch) + `vertiefung` → Besinnung, `sicherung` → Sicherung

**Das Problem:** Die Unterscheidung "narrativ" vs. "analytisch" basiert auf **Interpretation des Materialinhalts**, nicht auf expliziten Flags. Zwei unabhängige Agenten könnten ein Tagebuch-Material unterschiedlich klassifizieren:
- Agent A: "Tagebuch = Vergegenwärtigung (Personalisierung, anschaulich)"
- Agent B: "Tagebuch mit Reflexion = Besinnung (Urteilsbildung)"

**Testfall-Beispiel — mat-4-3 (Tagebuch):**

MATERIAL_GERUEST beschreibt:
> "Personifiziert den Vormarsch aus Soldatenperspektive: von Siegeszuversicht zu Erschöpfung und Nachschubproblemen."

**Ist das Vergegenwärtigung oder Besinnung?**

Laut FD-Q2 (Roth) ist "Personalisierung" ein Kernelement der Vergegenwärtigung. Aber die Beschreibung enthält auch analytische Elemente: "von Siegeszuversicht zu Erschöpfung" = Widerspruch erkennen.

**Folgerung:** D2 = FRAGIL. Die Klassifizierung "narrativ/analytisch" ist unterbestimmt. Eine präzisere Operationalisierung ist nötig: z.B. "Enthält das Material einen expliziten Analyseauftrag?" oder "Fordert es Urteilsbildung?"

### D3: Grenzfall-Robustheit — DEFEKT

**Befund:**

**Grenzfall 1: Nur 2 Materialien in einer Mappe**

GUETEKRITERIEN_SEQUENZIERUNG.md Sektion 5 erwähnt für S5:
> Toleranz: Wenn Mappe nur 2-3 Materialien hat, genügt Vergegenwärtigung vor Besinnung (Unterscheidung sachbezogen/wertbezogen entfällt)

S1 hat keine solche Toleranzregel. Für eine Zwei-Material-Mappe:
- mat-A: `erarbeitung`
- mat-B: `sicherung`

**Was ist die Phase von mat-A?** Sie kann nicht beide Vergegenwärtigung UND Besinnung sein. Die Prüflogik zerfällt.

**Grenzfall 2: Material mit mehreren TB-Knoten aus verschiedenen SCPL-Phasen**

Im Testfall: mat-4-1 hat `TB-Knoten: k4-2, k4-1, k4-3` und `SCPL-Phase: S+C1`

Das ist ein Material, das Situation UND erste Complication bedient. Die Prüflogik S1 sieht nur eine `didaktische_funktion` (erarbeitung), kann aber nicht das heterogene TB-Gewicht ausdrücken.

**Ist das noch Vergegenwärtigung, wenn 50% des Materials die C-Phase abdeckt?**

**Grenzfall 3: Nur Sicherungs- oder Vertiefungsmaterialien, kein Einstieg**

Die Prüflogik zerlegt die Historische Perspektive als:
```
einstieg ← kein Material
erarbeitung (narrativ) ← mat-4-1 bis mat-4-4
sicherung ← mat-4-5
```

Die Phase "Problembegegnung" wird nur durch die `didaktische_funktion == einstieg` repräsentiert. Aber im Testfall gibt es **keinen expliziten `einstieg`-Funktion**. Statt dessen wird die Problembegegnung durch einen **Rahmen-Einstieg** (einstieg.json) abgedeckt, nicht durch die Material-Sequenz.

**Q-Gate-Dokument selbst sagt (Zeile 177):**
> S10 | Aktivierung am Sequenzbeginn | SOLL | FAIL | Pos 1 = erarbeitung mit Fachbegriffen. Begründung: Einstieg-Funktion durch Rahmen-einstieg.json abgedeckt.

**Aber S1 Prüflogik setzt voraus, dass `einstieg` = Position 1 ist.**

**Folgerung:** D3 = DEFEKT. Die Logik funktioniert nicht bei:
1. Mappen mit < 3 Materialien
2. Materialien mit heterogener TB-Abdeckung über Phasengrenzen
3. Einstieg durch Rahmen-Elemente, nicht durch Material-Sequenz

### D4: Überlappungsfreiheit — ROBUST

**Befund:**

S1 prüft nur die **Abfolge-Logik der Phasen**. Es prüft nicht:
- TB-Knoten-Abdeckung (das ist S3)
- Vorwissen-Progression (das ist S2)
- Didaktische Funktions-Sequenzlogik (das ist S4)
- Vergegenwärtigung-Besinnung-Reihenfolge (das ist S5)

S1 beantwortet nur eine Frage: "Wenn ich das Artikulationsschema der Perspektive anschaue und die `didaktische_funktion`-Abfolge lese — stimmt die Phase-Reihenfolge?"

Das ist **orthogonal** zu S3, S2, S4, S5.

**Allerdings:** S1 und S14 haben eine potenzielle Überlappung (siehe Cluster-Analyse unten).

**Folgerung:** D4 = ROBUST. S1 ist trennscharf gegenüber S2, S3, S4, S5.

### D5: Nachbesserbarkeit — ROBUST

Die Nachbesserung ist klar definiert:
> Nachbesserung: Material umpositionieren oder didaktische Funktion anpassen

**Problem:** Beide Aktionen sind autonom durch AGENT_MATERIAL möglich:
1. Material umpositionieren: Zeile in Sequenzplan-Tabelle verschieben, Position neu nummerieren
2. Didaktische Funktion anpassen: Enum `erarbeitung` → `vertiefung` oder `erarbeitung` → `sicherung`

**Testfall konkret:** Wenn mat-4-3 (Tagebuch) als "analytisch" statt "narrativ" eingestuft würde, müsste es nach mat-4-4 (erarbeitung) zu `vertiefung` hochgestuft werden. Das ist autonom möglich.

**Folgerung:** D5 = ROBUST. Nachbesserung ist in der Regel eine Operationen auf Metadaten (Position, Funktion-Enum).

### D6: Fachdidaktische Dichte — FRAGIL

**Befund:**

Die Operationalisierung reduziert das Artikulationsschema auf **didaktische Funktionen (Enums)**. Das ist eine starke Kompression:

**Historisches Schema laut FD-Q1 enthält:**
1. Problembegegnung: Zeigt ein Phänomen/eine Frage, das zu klären ist
2. Vergegenwärtigung: Versetzen in Zeit/Raum, Handelnde kennenlernen, Anschaulichkeit
3. Besinnung: Sachbezogene Analyse (Was ist geschehen?) → Wertbezogene Beurteilung (War es richtig?)
4. Sicherung: Erkenntnisse strukturieren, ins System integieren

**Die Prüflogik S1 bildet das ab als:**
```
einstieg [Problembegegnung] ← ???
erarbeitung (narrativ) [Vergegenwärtigung] ← ???
erarbeitung (analytisch) + vertiefung [Besinnung] ← ???
sicherung [Sicherung] ← Material-Sequenz Position
```

**Die Probleme:**
1. "erarbeitung (narrativ)" vs. "erarbeitung (analytisch)" ist eine **externe Klassifizierung**, nicht im Enum `didaktische_funktion` codiert
2. Die Unterscheidung "sachbezogene vs. wertbezogene Besinnung" ist komplett wegoptimiert
3. Personalisierung als Kernmerkmal (Roth) wird nicht gemessen — nur die Sequenzposition

**Beispiel:** Ein Darstellungstext mit psychologischem Einblick:
> "Der General Schlieffen wollte um jeden Preis vermeiden, dass sein Plan scheitert. Doch er sah nicht, dass der Plan auf einer falschen Annahme basierte."

Das könnte als "erarbeitung (narrativ)" oder "erarbeitung (analytisch)" gelesen werden. Die Prüflogik sagt nicht, wie zu entscheiden ist.

**Folgerung:** D6 = FRAGIL. Die Formalisierung verliert Differenzierung und setzt voraus, dass Klassifizierung "narrativ/analytisch" extern erfolgt ist (was im MATERIAL_GERUEST nicht dokumentiert ist).

### Gesamt-Urteil S1

| Dimension | Bewertung | Begründung |
|---|---|---|
| D1 | FRAGIL | "narrativ" vs. "analytisch" nicht in Input-Schema; `DIDAKTIK_RAHMEN.perspektive` nicht im Testfall sichtbar |
| D2 | FRAGIL | Klassifizierung "narrativ/analytisch" nicht deterministisch (Interpretationsspielraum) |
| D3 | DEFEKT | Keine Grenzfall-Toleranzen (< 3 Materialien, heterogene TB-Abdeckung, Einstieg durch Rahmen) |
| D4 | ROBUST | Orthogonal zu S2, S3, S4, S5 |
| D5 | ROBUST | Nachbesserungen (Umpositionieren, Funktion-Enum ändern) sind autonom möglich |
| D6 | FRAGIL | Verliert Differenzierung (sachbezogene vs. wertbezogene Besinnung, Personalisierung als Messmetrik) |

**Status:** FRAGIL (3×FRAGIL, 2×ROBUST, 1×DEFEKT)

### Patch-Vorschlag S1

**Kernel-Problem:** Die Unterscheidung "erarbeitung (narrativ)" vs. "erarbeitung (analytisch)" ist zentral, aber nicht in den Input-Schemas operationalisiert.

**Lösung:**

1. **Erweiterung MATERIAL_GERUEST-Schema:**
   ```
   Neue Spalte: "Erarbeitungscharakter" (Enum)
   - narrativ-vergegenwaertigend
   - analytisch-besinnung-sachbezogen
   - analytisch-besinnung-wertbezogen
   - (mit Definitionen in Sektion 0.1)
   ```

2. **Explizite Klassifizierung durch AGENT_MATERIAL:**
   In Aufgabe 1.9.2 hinzufügen:
   ```markdown
   Klassifiziere jedes erarbeitung-Material:
   - Narrativ: Arbeitet mit Personalisierung, Anschaulichkeit, zeitlicher/räumlicher Verortung
   - Analytisch-Sachbezogen: Zerlegt Ursachen, Mechanismen, Strukturen
   - Analytisch-Wertbezogen: Enthält Bewertungs-/Urteilsauftrag
   
   Klarkriterium: Fordert das Material einen Analyseauftrag oder Urteilsbildung?
   - Ja → analytisch
   - Nein → narrativ
   ```

3. **Raffinierte S1-Prüflogik:**
   ```python
   # Sektion 6, S1, Punkt 2, neu:
   def klassifiziere_phase(material):
       if material.didaktische_funktion == "einstieg":
           return "Phase_1_Problembegegnung"
       elif material.didaktische_funktion == "erarbeitung":
           if material.erarbeitungscharakter == "narrativ-vergegenwaertigend":
               return "Phase_2_Vergegenwaertigung"
           elif material.erarbeitungscharakter in ["analytisch-besinnung-sachbezogen", 
                                                     "analytisch-besinnung-wertbezogen"]:
               return "Phase_3_Besinnung"
       elif material.didaktische_funktion in ["vertiefung", "transfer"]:
           return "Phase_3_Besinnung"  # Vertiefung = weitere Besinnung
       elif material.didaktische_funktion == "sicherung":
           return "Phase_4_Sicherung"
   ```

4. **Grenzfall-Toleranzen in S1:**
   ```markdown
   TOLERANZ: Mappen mit < 3 Materialien
   - Wenn nur 2 Materialien: Genügt einstieg → sicherung (Vergegenwärtigung entfällt)
   - Wenn 3 Materialien: Mindestens einstieg + erarbeitung + sicherung erforderlich
   
   TOLERANZ: Einstieg durch Rahmen-Elemente
   - Falls das erste Material didaktische_funktion = erarbeitung hat, aber ein Rahmen-einstieg.json
     vorhanden ist: Prüfung auf Phase-Reihenfolge beginnt ab Material 1 (nicht ab Rahmen)
   
   TOLERANZ: Materialien mit heterogener TB-Abdeckung
   - Material wird nach seiner primären TB-Knoten-Rolle klassifiziert (z.B. mat-4-1 primär S, 
     sekundär C1 → zählt als Vergegenwärtigung)
   ```

5. **Verantwortlichkeit:**
   - **AGENT_MATERIAL** (Aufgabe 1.9): Befüllt neue Spalte `erarbeitungscharakter` im MATERIAL_GERUEST
   - **SUB_MATERIAL_*** (im Produktions-Dispatch): Validiert, dass Materialtext tatsächlich das klassifizierte Charakterprofil erfüllt

---

## S4: Didaktische-Funktion-Sequenzlogik (MUSS)

### Definition (aus GUETEKRITERIEN_SEQUENZIERUNG.md Sektion 4)

**Operationalisierung:** Die didaktischen Funktionen folgen einer gültigen Reihenfolge: einstieg → erarbeitung → vertiefung → sicherung → transfer. Kein sicherung-Material vor dem letzten erarbeitung-Material. Kein transfer-Material vor sicherung.

### Prüflogik (Sektion 6, S4)

1. Definiere gültige Reihenfolge: `einstieg` < `erarbeitung` < `vertiefung` < `sicherung` < `transfer`
2. Für jedes Materialpaar (i, j) mit Position(i) < Position(j): Prüfe, ob `funktion(i) ≤ funktion(j)` (Monotonie)
3. Ausnahme: Mehrere `erarbeitung`-Materialien hintereinander sind erlaubt
4. Ausnahme: `vertiefung` darf nach `sicherung` stehen, wenn es sich um Transfer-Vertiefung handelt (dann `didaktische_funktion` = `transfer`)
5. **FAIL wenn:** `sicherung` vor letztem `erarbeitung` ODER `transfer` vor `sicherung`

### D1: Inputverfügbarkeit — ROBUST

**Befund am Testfall:**

```
| Position | Material-ID | Didaktische Funktion |
| 1        | mat-4-1     | erarbeitung          |
| 2        | mat-4-2     | erarbeitung          |
| 3        | mat-4-3     | erarbeitung          |
| 4        | mat-4-4     | erarbeitung          |
| 5        | mat-4-5     | sicherung            |
```

Das Feld `didaktische_funktion` ist **vollständig und eindeutig** befüllt. Alle benötigten Input-Daten sind vorhanden.

**Testfall-Abdeckung:** Alle 5 Materialien dokumentiert, keine fehlenden Werte.

**Folgerung:** D1 = ROBUST. Die Eingaben sind verfügbar und im erwarteten Enum-Format.

### D2: Entscheidungsdeterminiertheit — ROBUST

**Befund:**

Die Prüflogik ist **vollständig deterministisch:**

```
Eingabe: Liste der (Position, didaktische_funktion)-Paare
Ausgabe: PASS wenn Reihenfolge monoton, sonst FAIL

Beispiel Testfall:
Paare: [(1, erarbeitung), (2, erarbeitung), (3, erarbeitung), (4, erarbeitung), (5, sicherung)]

Prüfung:
- (1, erarbeitung) ≤ (2, erarbeitung)? Ja
- (2, erarbeitung) ≤ (3, erarbeitung)? Ja
- (3, erarbeitung) ≤ (4, erarbeitung)? Ja
- (4, erarbeitung) ≤ (5, sicherung)? Ja (erarbeitung < sicherung)

Ergebnis: PASS
```

Die Ordnung `einstieg` < `erarbeitung` < `vertiefung` < `sicherung` < `transfer` ist **antisymmetrisch und transitiv**. Die Monotonie-Prüfung ist ein klassisches O(n)-Problem.

**Zwei unabhängige Agenten würden bei identischem Input immer das gleiche Ergebnis produzieren.**

**Folgerung:** D2 = ROBUST. Deterministisch.

### D3: Grenzfall-Robustheit — ROBUST

**Grenzfall 1: Nur 1 Material**

```
Position | Funktion
1        | einstieg
```

Prüfung: Keine Paare zu vergleichen → trivial PASS. ✓

**Grenzfall 2: Nur einstieg + sicherung (keine erarbeitung)**

```
1 | einstieg
2 | sicherung
```

Prüfung: `einstieg ≤ sicherung`? Ja → PASS. ✓

Semantisch fraglich (wo ist die Erarbeitung?), aber syntaktisch gültig.

**Grenzfall 3: 10+ Materialien mit mehreren vertiefung-Blöcken**

```
1 | einstieg
2-5 | erarbeitung
6-7 | vertiefung
8 | sicherung
9-10 | transfer
```

Prüfung: Linear, O(n) → funktioniert. ✓

**Grenzfall 4: vertiefung vor sicherung (sollte FAIL sein)**

```
1 | einstieg
2 | erarbeitung
3 | vertiefung
4 | sicherung
```

Prüfung: `vertiefung ≤ sicherung`? Ja → PASS (erlaubt). ✓

Das ist korrekt — Vertiefung vor Sicherung ist erlaubt (z.B. vertiefende Quellenarbeit vor Zusammenfassung).

**Grenzfall 5: transfer vor sicherung (sollte FAIL sein)**

```
1 | einstieg
2 | erarbeitung
3 | transfer
4 | sicherung
```

Prüfung: `transfer ≤ sicherung`? Nein (`transfer` > `sicherung` in Ordnung) → **FAIL**. ✓

Korrekt.

**Grenzfall 6: Mehrfach sicherung (z.B. sicherung nach erarbeitung, dann neue erarbeitung)**

```
1 | einstieg
2 | erarbeitung
3 | sicherung
4 | erarbeitung  ← Fehler
5 | sicherung
```

Prüfung: `sicherung ≤ erarbeitung`? Nein → **FAIL**. ✓

Korrekt.

**Folgerung:** D3 = ROBUST. Alle Grenzfälle funktionieren. Die Logik ist widerstandsfähig.

### D4: Überlappungsfreiheit — FRAGIL

**Befund:**

Es gibt eine potenzielle Überlappung zwischen **S4 und S5**:

**S4 prüft:** Funktions-Abfolge ist monoton
**S5 prüft:** Vergegenwärtigung vor Besinnung

**Szenario:** Ein Material mit `didaktische_funktion = erarbeitung` könnte
- nach S4-Logik gültig sein (ist ja eine `erarbeitung`)
- aber nach S5-Logik ungültig, wenn es analytisch-besinnung ist (sollte also später stehen)

**Konkretes Beispiel — hypothetisch:**

```
1 | einstieg
2 | erarbeitung (analytisch-besinnung) ← Verstößt gegen S5, aber nicht gegen S4!
3 | erarbeitung (narrativ-vergegenwaertigung)
4 | sicherung
```

S4 sagt: ✓ PASS (Abfolge ist monoton)
S5 sagt: ✗ FAIL (Besinnung vor Vergegenwärtigung)

**Im Testfall tritt das nicht auf**, aber es ist eine strukturelle Schwäche: S4 und S5 sollten koordiniert sein.

**Folgerung:** D4 = FRAGIL. S4 und S5 haben eine Überlappung im Bereich `erarbeitung`. S4 prüft nur Monotonie der Enums, nicht die **semantische Kohärenz** der Phasen.

### D5: Nachbesserbarkeit — ROBUST

**Befund:**

Die Nachbesserung ist trivial: Didaktische Funktion ändern oder Material umpositionieren.

**Beispiel:** Wenn eine Mappe ist `[einstieg, sicherung, erarbeitung, sicherung]`:
1. Entweder: Position 3 (erarbeitung) vor Position 2 (erste sicherung) schieben
2. Oder: Position 3 didaktische_funktion von `erarbeitung` zu `vertiefung` ändern (falls das semantisch sinnvoll ist)

Beide Aktionen sind autonom durch AGENT_MATERIAL möglich (Zeilen verschieben, Enum-Wert ändern).

**Folgerung:** D5 = ROBUST.

### D6: Fachdidaktische Dichte — ROBUST

**Befund:**

Die Prüflogik codiert eine **fundamentale didaktische Wahrheit**: Wissen wird aufgebaut, nicht durcheinander gewürfelt.

> "Strukturierung ist Erhellung von Zusammenhängen, [...] nicht Aneinanderreihen beziehungsloser Wissenselemente." — Brunnhuber

Die Monotonie-Prüfung garantiert, dass:
- Neues Wissen (erarbeitung) vor Fixation (sicherung) kommt
- Anwendung (transfer) nicht vor Erwerb (sicherung) kommt
- Eine logische Progression vorhanden ist

Das ist fachdidaktisch robust. Es gibt keine Vereinfachung, die den Kern verletzt.

**Folgerung:** D6 = ROBUST.

### Gesamt-Urteil S4

| Dimension | Bewertung | Begründung |
|---|---|---|
| D1 | ROBUST | Feld `didaktische_funktion` ist vollständig und im Enum-Format |
| D2 | ROBUST | Monotonie-Prüfung ist deterministisch |
| D3 | ROBUST | Alle Grenzfälle funktionieren, inkl. 1 Material, 10+ Materialien |
| D4 | FRAGIL | Überlappung mit S5: Beide prüfen erarbeitung-Sequenzierung |
| D5 | ROBUST | Nachbesserung ist autonom möglich (Umpositionieren, Enum ändern) |
| D6 | ROBUST | Codiert fachdidaktische Progressions-Wahrheit |

**Status:** ROBUST mit FRAGIL-Warnung (Überlappung mit S5)

### Patch-Vorschlag S4

**Keine kritischen Patches nötig.** S4 ist widerstandsfähig.

**Optional — zur Vermeidung von Redundanz mit S5:**

In Sektion 6, S4, Punkt 1-2, kann eine Anmerkung hinzugefügt werden:
```markdown
### Koordination mit S5 (Vergegenwärtigung vor Besinnung)

S4 prüft nur Monotonie der Funktions-Enums. S5 prüft, dass Vergegenwärtigung 
(narrativ, anschaulich) VOR Besinnung (analytisch, urteilend) steht.

Empfehlung: Wenn S4 PASS ist, aber mehrere erarbeitung-Materialien nebeneinander stehen,
sollte AGENT_MATERIAL zusätzlich prüfen (als Teil von Aufgabe 1.9), dass diese 
erarbeitung-Materialien nach ihrem Erarbeitungscharakter (narrativ → analytisch) 
geordnet sind. Das ist technisch nicht in S4 abgebildet, aber in S5.
```

---

## S5: Vergegenwärtigung vor Besinnung (MUSS)

### Definition (aus GUETEKRITERIEN_SEQUENZIERUNG.md Sektion 4)

**Operationalisierung:** Materialien mit narrativ-anschaulichem Charakter (Darstellungstext, Bildquelle illustrativ, Tagebucheintrag) stehen VOR Materialien mit analytisch-urteilendem Charakter (Quellentext mit Analyseauftrag, Bildquelle heuristisch mit Interpretationsauftrag).

Quellen: FD-Q2 (Roth), Vergegenwärtigung/Besinnung-Prinzip.

### Prüflogik (Sektion 6, S5)

1. Klassifiziere jedes Material:
   - **Vergegenwärtigung:** darstellungstext, tagebuch, bildquelle (illustrativ), zeitleiste
   - **Besinnung (sachbezogen):** quellentext (Analyse), bildquelle (heuristisch mit Interpretationsauftrag)
   - **Besinnung (wertbezogen):** Materialien mit Bewertungs-/Urteilsauftrag
2. Prüfe Reihenfolge: min(Position Vergegenwärtigung) < min(Position sachbezogene Besinnung) < min(Position wertbezogene Besinnung)
3. Toleranz: Wenn Mappe nur 2-3 Materialien hat, genügt Vergegenwärtigung vor Besinnung (Unterscheidung sachbezogen/wertbezogen entfällt)
4. **FAIL wenn:** Erste Besinnung vor erster Vergegenwärtigung

### D1: Inputverfügbarkeit — DEFEKT

**Befund am Testfall:**

Mappe 4 hat 5 Materialien. Um S5 auszuführen, brauchen wir:

**Input 1: Materialtyp (Spalte "Typ" im MATERIAL_GERUEST)**
```
mat-4-1: darstellungstext
mat-4-2: karte
mat-4-3: tagebuch
mat-4-4: karte
mat-4-5: bildquelle
```
✓ Vorhanden

**Input 2: Klassifizierung "illustrativ vs. heuristisch" für bildquelle- und quellentext-Materialien**

Die Prüflogik unterscheidet:
- bildquelle (illustrativ) = Vergegenwärtigung
- bildquelle (heuristisch mit Interpretationsauftrag) = Besinnung

**Das Testfall-MATERIAL_GERUEST sagt für mat-4-5:**
```
mat-4-5 | bildquelle | Zeigt den Stellungskrieg als konkrete Realitaet (Schuetzengraben-Foto) 
         |            | im Kontrast zum geplanten Bewegungskrieg.
```

**Ist das illustrativ oder heuristisch?**

- **Illustrativ:** Bestätigt das bereits Gelernte (Bewegungskrieg scheiterte → Stellungskrieg)
- **Heuristisch:** Fordert Entdeckung/Analyse (Was sagt das Foto über die Realität?)

Die MATERIAL_GERUEST sagt nicht explizit, welcher Modus vorgesehen ist.

**Input 3: Klassifizierung "Bewertungs-/Urteilsauftrag" für wertbezogene Besinnung**

Keines der 5 Materialien hätte einen expliziten `bewertungs_auftrag` Flag. Das müsste aus der Beschreibung oder dem `didaktische_funktion`-Enum abgeleitet werden.

**Problem-Zusammenfassung:**

Die Prüflogik S5 braucht **drei binäre Klassifizierungen:**
1. Materialtyp → Vergegenwärtigung? (Enum aus Materialtyp ableitbar: ✓)
2. Bildquelle/Quellentext → illustrativ oder heuristisch? (**NICHT im Schema**, muss extern klassifiziert sein)
3. Material → enthält Urteilsauftrag? (**NICHT im Schema**, muss aus Inhalt abgeleitet sein)

**Testfall-Befund:**

Die Klassifizierung fehlt für mat-4-5 (bildquelle):
- Ist `bildquelle` in Mappe 4 illustrativ (zeigt Stellungskrieg als Illustration zum Scheitern des Plans)?
- Oder heuristisch (fordert SuS auf, zu entdecken, wie der Graben aussieht)?

**Vermutung aus MATERIAL_GERUEST-Beschreibung:**
> "im Kontrast zum geplanten Bewegungskrieg"

Das klingt nach **Interpretation/Kontrast-Erkennung** = eher heuristisch/besinnend.

Aber in der Q-Gate-Auswertung (Zeile 175) wird S8 (Kontextgebot Quellenarbeit) bewertet als:
> S8 | Kontextgebot Quellenarbeit | SOLL | PASS | Kein Quellentext. BQ (Pos 5) hat 4 Kontextmaterialien vorangestellt.

Das impliziert, dass mat-4-5 **nicht** als "erster Quellentext/heuristisch" gilt. Also vielleicht **illustrativ**?

**Folgerung:** D1 = DEFEKT. Die notwendigen Klassifizierungen (illustrativ/heuristisch, Urteilsauftrag) sind nicht im Input-Schema vorhanden. AGENT_MATERIAL müsste sie extern dokumentieren.

### D2: Entscheidungsdeterminiertheit — FRAGIL

**Befund:**

Selbst wenn die Klassifizierungen vorhanden wären, wäre die Entscheidung nicht vollständig deterministisch.

**Beispiel — mat-4-5 (Bildquelle):**

Wenn die Materialität bekannt wäre (Foto eines Schützengrabens), würden zwei Agenten unterschiedlich klassifizieren können:

**Agent A (Illustrativ):**
- "Das Foto zeigt eine konkrete Realität. Nach den vorherigen Materialien wissen SuS bereits, dass der Plan scheiterte. Das Foto illustriert diese Erkenntnis."
- Klassifizierung: Vergegenwärtigung

**Agent B (Heuristisch):**
- "Das Foto zeigt Details des Stellungskriegs. SuS müssen diese Details entdecken und interpretieren: Wie tief sind die Gräben? Wie primitive die Ausrüstung? Was sagt das über die Kriegsrealität aus?"
- Klassifizierung: Besinnung (sachbezogen)

**Die Unterscheidung hängt ab von:**
- Der erwarteten **Schüleraufgabe** (wird Bilderschliessung mit explizitem Auftrag erwartet?)
- Der **didaktischen Intention** (Illustration vs. Entdeckung)

Das ist **nicht allein aus dem Materialtyp ableitbar**. Es braucht eine **Funktion-Klassifizierung** im Material-Designen.

**Testfall-Konkret:**

Im MATERIAL_GERUEST (Sektion Erarbeitbarkeits-Nachweis, Zeile 74) steht:
```
P: Scheitern → Stellungskrieg | DIRECT + ARTIFACT | mat-4-5 (Bildquelle, img-4-3) | 
  Foto: Schuetzengraben-Bau 1914. Kontrast: geplant 40 Tage Sieg → 4 Jahre Graben. zit-4-2 (Moltke) in BU nutzbar.
```

Das deutet an: Das Foto dient der **Kontrast-Herstellung**, also einer interpretativ-analytischen Funktion. Das klingt nach **heuristisch/besinnend**.

Aber in der Q-Gate-Tabelle wird es als:
```
S5 | Vergegenwärtigung vor Besinnung | MUSS | PASS | Alle 5 Materialien Vergegenwärtigung-Typ. Kein Besinnungs-Material.
```

Klassifiziert. Das widerspreitet der Vermutung oben!

**Folgerung:** D2 = FRAGIL. Die Klassifizierung ist nicht deterministisch, und — wichtiger noch — **die bestehende Q-Gate-Auswertung selbst ist inkonsistent**.

### D3: Grenzfall-Robustheit — FRAGIL

**Grenzfall 1: Mappe mit nur 1 Material (Vergegenwärtigung)**

```
1 | darstellungstext | Vergegenwärtigung
```

Prüfung: Keine Besinnung vorhanden → PASS. ✓

**Grenzfall 2: Mappe mit 2 Materialien: Besinnung, dann Vergegenwärtigung (Reihenfolge falsch)**

```
1 | quellentext | Besinnung
2 | darstellungstext | Vergegenwärtigung
```

Prüfung: Erste Besinnung (Pos 1) vor erster Vergegenwärtigung (Pos 2) → **FAIL**. ✓

**Grenzfall 3: Mappe mit nur Besinnungs-Materialien**

```
1 | quellentext | Besinnung
2 | quellentext | Besinnung
```

Prüfung: Keine Vergegenwärtigung → FAIL. ✓ (Korrekt — Besinnung braucht Fundament)

**Aber:** Die Prüflogik sagt nicht, wie schwerwiegend dieser Fehler ist. Sollte die ganze Mappe redesignt werden? Kann man ein Vergegenwärtigung-Material hinzufügen?

**Grenzfall 4: Material mit BEIDEN Funktionen (z.B. illustratives Quellentext-Fragment)**

Ein Textquellen-Fragment könnte

- den **Originalwortlaut zeigen** (illustrativ, Anschaulichkeit)
- aber auch **Interpretation erfordern** (analytisch)

Die Prüflogik hat keine Regel für "Hybrid-Materialien".

**Grenzfall 5: Mappe mit 2 Materialien und Toleranz**

```
Toleranz: Wenn Mappe nur 2-3 Materialien hat, genügt Vergegenwärtigung vor Besinnung 
(Unterscheidung sachbezogen/wertbezogen entfällt)
```

**Mappe mit 2 Materialien:**

```
1 | darstellungstext | Vergegenwärtigung
2 | quellentext | Besinnung
```

Toleranz erlaubt das. ✓

Aber was ist mit:

```
1 | quellentext | Besinnung
2 | bildquelle | Vergegenwärtigung
```

Toleranz sagt nicht, dass das OK ist. Ist es ein FAIL trotz Toleranz?

**Folgerung:** D3 = FRAGIL. Die Toleranzregel für 2-3 Materialien ist unterbestimmt. Grenzfälle wie "Hybrid-Materialien" sind nicht adressiert.

### D4: Überlappungsfreiheit — FRAGIL

**Befund:**

S5 und S4 haben eine **konzeptuelle Überlappung im Bereich `erarbeitung`:**

**S4 sagt:** `erarbeitung` < `vertiefung` < `sicherung`

**S5 sagt:** Vergegenwärtigung (narrativ-erarbeitung) < Besinnung (analytisch-erarbeitung/vertiefung)

**Das Problem:** Beide Kriterien regeln die `erarbeitung`-Phase, aber auf verschiedenen Ebenen:
- S4: Sorgt für Monotonie der **Funktions-Enums**
- S5: Sorgt für Monotonie der **semantischen Phasen** (Vergegenwärtigung → Besinnung)

Ein Material könnte S4 erfüllen (Funktion monoton), aber S5 verletzen (Besinnung vor Vergegenwärtigung).

**Testfall — hypothetisches Szenario:**

```
Position | Material | Typ | Didaktische Funktion | Charakterisierung (nach Patch S1)
1 | mat-a | darstellungstext | erarbeitung | narrativ-vergegenwaertigend ← Vergegenwärtigung
2 | mat-b | quellentext | erarbeitung | analytisch-besinnung-sachbezogen ← Besinnung!
```

S4-Prüfung: erarbeitung < erarbeitung → PASS ✓
S5-Prüfung: Vergegenwärtigung < Besinnung → PASS ✓

Kein Problem hier. Aber das Szenario zeigt, dass S4 und S5 **notwendigerweise zusammenwirken müssen**.

**Noch kritischer:** Ein Fehler in S1 (falsche Charakterisierung) würde sich in S5 manifestieren.

**Folgerung:** D4 = FRAGIL. S5 hängt ab von korrekter Klassifizierung in S1 (wenn implementiert). Die Kriterien sind **nicht unabhängig**.

### D5: Nachbesserbarkeit — FRAGIL

**Befund:**

Nachbesserung erfordert:

1. **Klassifizierung korrigieren** (wenn die Klassifizierung im Testfall überhaupt dokumentiert wäre)
2. **Material umpositionieren** (einfach)
3. **Neues Material ergänzen** (wenn keine Vergegenwärtigung existiert)

**Testfall-Szenario — hypothetisch:**

Wenn mat-4-5 als "Besinnung (heuristisch)" klassifiziert würde (entgegen der aktuellen Q-Gate-Aussage), müsste AGENT_MATERIAL:

1. Entweder: Ein neues Vergegenwärtigung-Material (z.B. ein zweites Tagebuch) vor mat-4-5 einfügen
2. Oder: mat-4-5 als "illustrativ" umersetzen (weniger Interpretation, mehr Anschaulichkeit)

**Problem:** Option 2 ist nur schwer autonom möglich. Es würde erfordern, dass AGENT_MATERIAL den Material-Inhalt revidiert. Das ist aber **die Verantwortung des Subagenten** (SUB_MATERIAL_BILDQUELLE), nicht des Orchestrators.

**Folgerung:** D5 = FRAGIL. Nachbesserung ist manchmal erzwungen, Material zu ergänzen oder umzupositionieren. Manchmal erfordert sie aber, Material-Inhalt zu ändern, was außerhalb von AGENT_MATERIAL liegt.

### D6: Fachdidaktische Dichte — ROBUST

**Befund:**

Das Vergegenwärtigung-Besinnung-Prinzip ist das **Herzstück** der historischen Fachdidaktik (Roth, FD-Q2). Es ist nicht vereinfacht, es ist die konzeptuelle Fundamentales:

> "Geschichte in Handlung zurückverwandeln" (Roth Forderung 1)
> "Anschaulichkeit" (Roth Forderung 2)
> "Personalisierung" (Roth Forderung 3)

All das sind Elemente der Vergegenwärtigung, und die Prüflogik S5 garantiert, dass diese **vor** analytischer Zergliederung (Besinnung) stattfinden.

Das ist fachdidaktisch robust. Es codiert eine Wahrheit, die nicht verhandelt werden kann.

**Folgerung:** D6 = ROBUST.

### Gesamt-Urteil S5

| Dimension | Bewertung | Begründung |
|---|---|---|
| D1 | DEFEKT | Klassifizierung "illustrativ/heuristisch" und "Urteilsauftrag" fehlt im Input-Schema |
| D2 | FRAGIL | Klassifizierung ist nicht deterministisch; Q-Gate selbst zeigt Inkonsistenz (mat-4-5 klassifizierung) |
| D3 | FRAGIL | Grenzfall-Toleranzen unterbestimmt; Hybrid-Materialien nicht adressiert |
| D4 | FRAGIL | Abhängigkeit von S1 und S4; nicht unabhängig |
| D5 | FRAGIL | Nachbesserung manchmal erzwungen, Material zu ergänzen; manchmal extern (Subagent) |
| D6 | ROBUST | Codiert Roth'sche Vergegenwärtigung-Besinnung-Wahrheit |

**Status:** FRAGIL (mit DEFEKT in D1)

### Patch-Vorschlag S5

**Kernel-Problem:** Input-Schema für Klassifizierungen "illustrativ/heuristisch" und "Urteilsauftrag" fehlen.

**Lösung:**

1. **Erweiterung MATERIAL_GERUEST-Schema:**

   ```
   Neue Spalten für bildquelle und quellentext:
   - bildquelle_funktion: [illustrativ | heuristisch]
   - quellentext_funktion: [quellenlesung_authentizitaet | quellentext_analyse]
   - material_enthaelt_urteilsauftrag: [ja | nein]
   ```

2. **Klassifizierungslogik in S5 Punkt 1 (Sektion 6) überarbeiten:**

   ```python
   def klassifiziere_vergegenwärtigung_vs_besinnung(material):
       if material.typ in ["darstellungstext", "tagebuch", "zeitleiste"]:
           return "Vergegenwärtigung"
       elif material.typ == "bildquelle":
           if material.bildquelle_funktion == "illustrativ":
               return "Vergegenwärtigung"
           elif material.bildquelle_funktion == "heuristisch":
               return "Besinnung_sachbezogen"
       elif material.typ == "quellentext":
           if material.quellentext_funktion == "quellenlesung_authentizitaet":
               return "Vergegenwärtigung"
           elif material.quellentext_funktion == "quellentext_analyse":
               return "Besinnung_sachbezogen"
       
       if material.material_enthaelt_urteilsauftrag == "ja":
           return "Besinnung_wertbezogen"
       
       return None  # Unklassifizierbar
   ```

3. **Spezifische Anwendung auf Mappe 4 — mat-4-5:**

   AGENT_MATERIAL muss in Aufgabe 1.9 explizit entscheiden:
   ```markdown
   mat-4-5 (Bildquelle Schuetzengraben):
   - Bildquelle_funktion: illustrativ (zeigt die Realität, bestätigt Scheitern des Plans)
   - Material_enthaelt_urteilsauftrag: nein
   - Klassifizierung: Vergegenwärtigung
   ```

   Begründung: "Das Foto zeigt die Realität des Stellungskriegs. Nach den vorherigen 4 Materialien haben SuS bereits verstanden, dass der Plan scheiterte. Das Foto konkretisiert diese Erkenntnis visuell — es illustriert, es enthält keine neue analytische Frage."

4. **Verantwortlichkeit:**
   - **AGENT_MATERIAL** (Aufgabe 1.9): Entscheidet und dokumentiert `bildquelle_funktion`, `quellentext_funktion`, `material_enthaelt_urteilsauftrag`
   - **SUB_MATERIAL_BILDQUELLE / SUB_MATERIAL_QUELLENTEXT**: Validiert in SQ-1 bis SQ-4, dass Material-Inhalt tatsächlich die klassifizierte Funktion erfüllt

5. **Grenzfall-Toleranzen in S5 Sektion 6 überarbeiten:**

   ```markdown
   TOLERANZ 1: Mappe mit 2-3 Materialien
   - Wenn < 4 Materialien: Unterscheidung sachbezogene vs. wertbezogene Besinnung entfällt
   - Mindestanforderung: Erste Besinnung nach erster Vergegenwärtigung
   
   TOLERANZ 2: Hybrid-Materialien
   - Ein Material kann mehrere Klassifizierungen haben (z.B. Tagebuch mit analytischer Reflexion)
   - Klassifizierung: Primäre Funktion + optionale Nebenrolle dokumentieren
   - Beispiel: mat-3-5 = "tagebuch [Vergegenwärtigung primär, analytische Reflexion sekundär]"
   - Sequenz-Positionierung: Nach primärer Klassifizierung
   
   TOLERANZ 3: Quellentext mit reiner Authentizitätsfunktion
   - Quellentext, der nur zum "Hören der Original-Stimme" ohne Analyseauftrag dient:
     quellentext_funktion = quellenlesung_authentizitaet → Vergegenwärtigung
   - Beispiel: Ein Brief eines Soldaten, reine Lesung, kein Interpretationsauftrag
   ```

---

## S14: SCPL-Korrespondenz (MUSS)

### Definition (aus GUETEKRITERIEN_SEQUENZIERUNG.md Sektion 4)

**Operationalisierung:** Die Materialreihenfolge korrespondiert mit dem SCPL-Aufbau des Tafelbilds: Materialien, die Situation-Knoten (S) erarbeiten, stehen vor Complication-Knoten (C), diese vor Problem-Knoten (P), diese vor Lösungs-Knoten (L). Bei Materialien, die mehrere Knoten bedienen, zählt der primäre TB-Knoten.

Quelle: Tafelbild-Sinnstruktur als didaktischer Aufbaurahmen.

### Prüflogik (Sektion 6, S14)

1. Ordne jeden TB-Knoten einer SCPL-Phase zu:
   - Knoten, deren Inhalt im `scpl.situation`-Block steht oder deren Fachbegriffe dort erscheinen: **S**
   - Knoten, deren Inhalt in `scpl.complication[]`-Schritten steht: **C**
   - Knoten, deren Inhalt in `scpl.problem` steht: **P**
   - Knoten, deren Inhalt in `scpl.loesung[]` steht: **L**
2. Für jedes Material im Sequenzplan: Bestimme die SCPL-Phase seines primären TB-Knotens
3. Prüfe Monotonie: S-Materialien haben niedrigere Positionen als C-Materialien, C < P, P < L
4. Toleranz: Materialien mit reiner `einstieg`-Funktion (Position 1) sind phasen-neutral
5. Toleranz: Materialien, die sowohl S- als auch C-Knoten bedienen, werden nach ihrem primären Knoten eingeordnet
6. **FAIL wenn:** Ein P-Material steht vor dem letzten C-Material ODER ein L-Material vor dem letzten P-Material

### D1: Inputverfügbarkeit — FRAGIL

**Befund am Testfall:**

Das MATERIAL_GERUEST dokumentiert für jeden TB-Knoten eine SCPL-Phase-Zuordnung:

```
| TB-Knoten | SCPL-Phase | Material-Zuordnung |
| k4-1 | S | Schlieffen-Plan (Situationselement: Zweifrontenkrieg + Plan) |
| k4-2 | S | Zweifrontenkrieg (Problem) |
| k4-3 | S | Zeitluecke (Grundannahme des Plans) |
| k4-4 | C | Einmarsch ueber Belgien (Complication) |
| k4-5 | P | Schlacht an der Marne (scheitert an) |
| k4-6 | P | Stellungskrieg (Folge des Scheiterns) |
```

**Problem 1: k4-2 und k4-3 Klassifizierung**

MATERIAL_GERUEST sagt `k4-2 = Zweifrontenkrieg (Problem)`. Aber in der TB-Abdeckungs-Nachweis-Tabelle (Zeile 35-38) steht:

```
| k4-2 | Zweifrontenkrieg (Problem) | mat-4-1 (DT, §1) | DT erklaert geographische Lage DE zwischen FR und RU als unloesbares Dilemma. |
```

**Ist "Zweifrontenkrieg" ein S-Element oder ein P-Element?**

Im SCPL-Schema:
- **Situation:** Der Ausgangszustand (Deutschland nach Kriegserklärung, liegt zwischen zwei Gegnern)
- **Problem:** Der zentrale Knoten, der das Dilemma ausdrückt

Das ist **mehrdeutig**. Der Zweifrontenkrieg **ist** die Situierung (Deutschlands geografische Lage), kann aber auch als **Problem** verstanden werden (unlösbares Dilemma).

Im MATERIAL_GERUEST wird das dokumentiert als:
```
| # | mat-ID | Funktion (1 Satz) |
| 1 | mat-4-1 | Erklaert Zweifrontenkrieg als Problem, Schlieffen-Plan als Loesung, Zeitluecke als Praemisse. |
```

Also: **Problem-Lösungs-Struktur**. Der Zweifrontenkrieg ist das Problem (P).

Aber dann passt die SCPL-Phase-Zuordnung nicht:

```
| TB-Knoten | Beschreibung | Zuordnung in MATERIAL_GERUEST |
| k4-2 | Zweifrontenkrieg | S (in TB-Abdeckungs-Tabelle: "Sequenzplan" Zeile 14-15: k4-1 + k4-2 = S+C1)  |
```

**Zeile 14 sagt SCPL-Phase = `S+C1`** (gemischt!), aber Zeile 35 einzeln bewertet `k4-2 = Problem`.

**Das ist inkonsistent.**

**Problem 2: mat-4-1 SCPL-Zuordnung**

MATERIAL_GERUEST dokumentiert im Sequenzplan (Zeile 125):
```
| mat-4-1 | darstellungstext | erarbeitung | k4-2, k4-1, k4-3 | S+C1 |
```

Ein Material hat die SCPL-Phase `S+C1` (heterogen). Aber die Prüflogik S14 sagt:

> Bei Materialien, die mehrere Knoten bedienen, zählt der **primäre** TB-Knoten.

**Was ist der primäre TB-Knoten von mat-4-1?**

Der MATERIAL_GERUEST dokumentiert `TB-Knoten: k4-2, k4-1, k4-3` in dieser Reihenfolge. Das könnte bedeuten:
- Reihenfolge spiegelt Priorität: primär = k4-2?
- Oder: Reihenfolge im Tagebild, nicht in Priorität?

Das ist **nicht explizit dokumentiert**.

**Leseart A (SCPL-Phase in TB-Abdeckung Tabelle als Autorität):**

```
Sequenzplan behauptet:
| # | Material | TB-Knoten | SCPL-Phase |
| 1 | mat-4-1 | k4-2, k4-1, k4-3 | S+C1 |

TB-Abdeckung-Tabelle behauptet:
| k4-2 | Zweifrontenkrieg (Problem) | mat-4-1 | ... |
| k4-1 | Schlieffen-Plan | mat-4-1 | ... |
| k4-3 | Zeitluecke | mat-4-1 | ... |

Wenn TB-Abdeckung sagt k4-2 = Problem (P), dann ist mat-4-1 mindestens teilweise P-Material.
Das steht im Konflikt mit SCPL-Phase = S+C1.
```

**Folgerung:** D1 = FRAGIL. Die SCPL-Phase-Zuordnungen sind im MATERIAL_GERUEST dokumentiert, aber sie sind **intern inkonsistent**. Unterschiedliche Teile des Dokuments widersprechen sich.

### D2: Entscheidungsdeterminiertheit — FRAGIL

**Befund:**

Selbst wenn die SCPL-Phasen klar wären, wäre die Entscheidung "primärer TB-Knoten" nicht deterministisch.

**Testfall — mat-4-1:**

```
TB-Knoten: [k4-2, k4-1, k4-3]
SCPL-Phasen: [S oder P?, S, S]
```

Wie entscheide ich, welcher Knoten "primär" ist?

**Optionen:**
1. **Reihenfolge-primär:** Erster in der Liste (k4-2) ist primär
2. **Umfang-primär:** Der TB-Knoten, dem die meisten Sätze gewidmet sind
3. **Relevanz-primär:** Der TB-Knoten, der die Stundenfrage am direktesten beantwortet
4. **Tafelbild-primär:** Der TB-Knoten, der in höherer SCPL-Phase als andere steht

**Im Testfall:**

- Option 1 (Reihenfolge): Primär = k4-2 (Zweifrontenkrieg)
- Option 2 (Umfang): Wahrscheinlich = k4-1 (Schlieffen-Plan, mehrere Absätze)
- Option 3 (Relevanz): Wahrscheinlich = k4-1 (Plan ist die "Lösung", Hauptinhalt)
- Option 4 (Tafelbild): Primär = ?? (anhängig von SCPL-Klarheit)

**Die Prüflogik sagt nicht, wie zu entscheiden ist.**

**Folgerung:** D2 = FRAGIL. Primäre TB-Knoten sind nicht operationalisiert.

### D3: Grenzfall-Robustheit — ROBUST

**Grenzfall 1: Mappe mit nur S-Knoten (kein C, P, L)**

```
Sequenzplan:
1 | mat-a | erarbeitung | k1-1 | S
2 | mat-b | erarbeitung | k1-2 | S
```

S14-Prüfung: S < S → trivial PASS. ✓

**Grenzfall 2: Mappe mit nur P-Knoten**

```
1 | mat-x | einstieg | — | (neutral)
2 | mat-y | sicherung | k1-1 | P
```

S14-Prüfung: einstieg ist phasen-neutral, P nach einstieg → PASS. ✓

**Grenzfall 3: Komplexe Mappe mit S, C, C, P, L**

```
1 | mat-1 | erarbeitung | k1-1 | S
2 | mat-2 | erarbeitung | k1-2, k1-3 | C, C
3 | mat-3 | erarbeitung | k1-4 | P
4 | mat-4 | sicherung | k1-5 | L
```

S14-Prüfung: Monotonie S < C < P < L → PASS. ✓

**Grenzfall 4: Toleranz "Materialien mit rein `einstieg`-Funktion sind phasen-neutral"**

```
1 | mat-einstieg | einstieg | — | ???
2 | mat-p | erarbeitung | k1-1 | P
3 | mat-s | sicherung | k1-2 | L
```

S14-Prüfung: einstieg ist neutral, dann P, dann L → PASS. ✓

Aber semantisch: P steht vor S und C. Das ist **nicht S-phasen-korrekt**, wird aber als PASS bewertet.

**Das ist eine Schwachstelle**, aber die Toleranzregel ist explizit dokumentiert.

**Grenzfall 5: Material mit heterogener SCPL-Zuordnung (z.B. S+C+P)**

```
1 | mat-hybrid | erarbeitung | k1-1, k1-2, k1-3 | S, C, P
2 | mat-x | sicherung | k1-4 | L
```

Wie wird mat-hybrid klassifiziert?

Die Prüflogik sagt: "Bei Materialien, die mehrere Knoten bedienen, zählt der **primäre** TB-Knoten."

Aber ohne Operationalisierung "primär" ist das unbestimmt.

**Folgerung:** D3 = ROBUST für einfache Fälle, aber FRAGIL für heterogene Materialien.

### D4: Überlappungsfreiheit — ROBUST

**Befund:**

S14 prüft die **SCPL-Reihenfolge**, basierend auf TB-Knoten-Zuordnungen.

Andere Kriterien:
- **S1:** Prüft Artikulationsschema-Konformität (Phasenliste: Problembegegnung → Vergegenwärtigung → Besinnung → Sicherung)
- **S4:** Prüft Didaktische-Funktion-Monotonie
- **S3:** Prüft TB-Knoten-Abdeckung
- **S2:** Prüft Vorwissen-Progression

S14 ist **orthogonal** zu S1, S2, S3, S4 im Kern:
- S1, S4 prüfen **Funktions-Sequenzierung**
- S14 prüft **Content-Sequenzierung** (Welcher TB-Inhalt wird in welcher Reihenfolge präsentiert?)

**Allerdings:** Es gibt eine konzeptuelle Nähe zwischen S14 und S1:

- **S1 sagt:** Vergegenwärtigung (Phase 2) vor Besinnung (Phase 3)
- **S14 sagt:** Situation (S) vor Complication (C) vor Problem (P)

Sind diese äquivalent? Nicht ganz:
- S in S14 ≠ Problembegegnung in S1 (eher Teil der Vergegenwärtigung)
- C und P in S14 ≠ eindeutig einer Phase in S1 zugeordnet

**Beispiel — Konflikt:**

```
Material-Sequenz nach S1: [Einstieg, Vergegenwärtigung, Besinnung, Sicherung]
Material-Sequenz nach S14 möglich: [S, P, C, L] (wenn P-Knoten vor C-Knoten steht)

Das wäre S14-FAIL, aber möglicherweise S1-konform, wenn P-Material als "Vergegenwärtigung" klassifiziert wird.
```

**Folgerung:** D4 = ROBUST. S14 und S1 sind konzeptuelle Nachbarn, aber nicht vollständig überlappend. Die Kombination ist notwendig.

### D5: Nachbesserbarkeit — FRAGIL

**Befund:**

Nachbesserung erfordert:

1. **SCPL-Phase der TB-Knoten bestimmen** (extern, falls nicht im MATERIAL_GERUEST dokumentiert)
2. **Primären TB-Knoten identifizieren** (falls Material heterogen ist)
3. **Material umpositionieren** (einfach)

**Testfall-Szenario — hypothetisch:**

Wenn die S14-Prüfung sagt: "mat-4-5 (L-Material) steht vor mat-4-4 (C-Material) → FAIL", würde AGENT_MATERIAL:

1. Überprüfen, ob die SCPL-Phasen-Zuordnungen korrekt sind
   - Falls nein: SCPL-Zuordnung in TB-Abdeckung korrigieren
   - Falls ja: Weiter zu 2
2. Materialien umpositionieren (Zeilen vertauschen)

**Problem:** Wenn die SCPL-Phasen-Zuordnungen selbst falsch sind (was im Testfall der Fall zu sein scheint), muss AGENT_MATERIAL das **extern auflösen**. Das ist nicht autonom auf Meta-Ebene möglich.

**Zum Beispiel — mat-4-1:**

Falls S14 scheitert, weil mat-4-1 (dokumentiert als S+C1) nicht klar klassifizierbar ist:
- AGENT_MATERIAL muss das MATERIAL_GERUEST-TB-Abdeckung-Tabelle revisionieren
- Das bedeutet, TB-Knoten-Zuordnungen zu überdenken
- Das ist eine **Redesign-Aufgabe**, nicht eine Repositionierungsaufgabe

**Folgerung:** D5 = FRAGIL. Nachbesserung ist manchmal einfach (umpositionieren), manchmal erfordert es aber Redesign (TB-Knoten-Zuordnungen klären).

### D6: Fachdidaktische Dichte — ROBUST

**Befund:**

Das SCPL-Schema (Situation → Complication → Problem → Loesung) ist ein **narratives Grundmuster** für die Strukturierung von Lernstoff:

- **Situation:** Kontext, Ausgangslage
- **Complication:** Widerstand, Unerwartetes, Phänomen, das zu erklären ist
- **Problem:** Zentrale Krise, Dilemma, offene Frage
- **Loesung:** Antwort, Auflösung, Erkenntnis

Die Prüflogik S14 garantiert, dass diese Reihenfolge eingehalten wird. Das ist fachdidaktisch **notwendig**, um die **narrative Kohärenz** des Lernwegs zu bewahren.

Das ist keine Vereinfachung, das ist das **konzeptuelle Herz** der TAFELBILD-Struktur.

**Folgerung:** D6 = ROBUST.

### Gesamt-Urteil S14

| Dimension | Bewertung | Begründung |
|---|---|---|
| D1 | FRAGIL | SCPL-Phasen-Zuordnungen im Testfall intern inkonsistent (k4-2 als S und als P dokumentiert) |
| D2 | FRAGIL | "Primärer TB-Knoten" nicht operationalisiert (bei heterogenen Materialien) |
| D3 | ROBUST | Einfache Fälle funktionieren; heterogene Fälle schwach, aber toleranzregel vorhanden |
| D4 | ROBUST | Orthogonal zu S1-S4, notwendige zusätzliche Ebene |
| D5 | FRAGIL | Nachbesserung manchmal einfach (umpositionieren), manchmal extern (TB-Redesign) |
| D6 | ROBUST | Codiert narrative SCPL-Logik als essentiellen Kernrahmen |

**Status:** FRAGIL (mit kritischen Input-Problemen in D1)

### Patch-Vorschlag S14

**Kernel-Problem:** SCPL-Phasen-Zuordnungen sind im MATERIAL_GERUEST nicht konsistent dokumentiert.

**Lösung:**

1. **Auflösung der Inkonsistenz in Mappe 4:**

   Im MATERIAL_GERUEST Sequenzplan (Zeile 123-130) wird SCPL-Phase dokumentiert. Aber die TB-Abdeckungs-Tabelle (Zeile 30-56) widerspricht teilweise.

   **Klarstellung notwendig:**

   ```markdown
   Frage: Sind k4-2 (Zweifrontenkrieg) und k4-3 (Zeitluecke) Situation-Elemente oder Problem-Elemente?
   
   Leseart A [Situation-zentriert]:
   - Situation: Deutschland liegt zwischen Frankreich und Russland
   - Complication: Zeitluecke (Russland mobilisiert langsamer)
   - Problem: Militärischer Angriff muss perfekt timen
   - Lösung: Schlieffen-Plan
   
   Leseart B [Problem-zentriert]:
   - Situation: Kriegserklärung, Kriegsziel unklar
   - Complication: Zweifrontenkrieg
   - Problem: Wie lösen wir das?
   - Lösung: Schlieffen-Plan mit Zeitluecke
   
   Entscheidung: Leseart B (Problem-zentriert) ist fachdidaktisch sinnvoller.
   
   Neue SCPL-Zuordnung:
   | TB-Knoten | SCPL-Phase | Begründung |
   | k4-1 | S | Schlieffen-Plan ist Situationselement im TAFELBILD (nicht die Lösung selbst, sondern die historische Ausgangslage, von der aus wir erzählen) |
   | k4-2 | C | Zweifrontenkrieg ist die Complication: das militärische Dilemma |
   | k4-3 | C | Zeitluecke ist Teil der Complication: Russlands Langsamkeit als Chance |
   | k4-4 | C | Einmarsch ist die Complication: Versuch, Plan umzusetzen |
   | k4-5 | P | Schlacht an der Marne ist das zentrale Problem: Plan scheitert |
   | k4-6 | P | Stellungskrieg ist die Folge des Scheiterns: neue Problemrealität |
   ```

   **Alternativ:** Neu-Strukturierung des TAFELBILD könnte nötig sein (wenn die aktuelle SCPL-Struktur falsch ist). Das ist aber **TAFELBILD-Redesign**, nicht MATERIAL_GERUEST-Redesign.

2. **Operationalisierung "Primärer TB-Knoten" in Sektion 6, S14, Punkt 2:**

   ```markdown
   Beim Bestimmen der SCPL-Phase eines Materials mit mehreren TB-Knoten:
   
   Regel 1: Wenn ein TB-Knoten höherwertig ist (S > C > P > L), wähle die höchste Phase
   Regel 2: Wenn Knoten in gleicher Phase, wähle den in der TB-Reihenfolge ersten
   Regel 3: Falls ambig, dokumentiere Tie-Break-Kriterium in MATERIAL_GERUEST-Spalte "primärer_knoten"
   
   Beispiel mat-4-1:
   TB-Knoten: [k4-2, k4-1, k4-3]
   SCPL-Phasen: [C, S, C]
   Höchste Phase: S (k4-1)
   Primärer Knoten: k4-1
   Material-Klassifizierung für S14: S-Material
   ```

3. **Neue Spalte in MATERIAL_GERUEST Sequenzplan:**

   ```
   Spalte hinzufügen: "SCPL_Phase" (mit Begründung in separater Spalte bei komplexen Zuordnungen)
   
   Beispiel:
   | # | Material-ID | TB-Knoten | SCPL_Phase | Begründung (falls heterogen) |
   | 1 | mat-4-1 | k4-2, k4-1, k4-3 | S | Primär k4-1 (Schlieffen-Plan als historische Ausgangslage) |
   | 2 | mat-4-2 | k4-1, k4-4 | C | Primär k4-4 (Einmarsch als Complication, Plan-Umsetzung) |
   ```

4. **Verantwortlichkeit:**
   - **AGENT_HEFTEINTRAG** (Phase 0.4): Verifiziert, dass TAFELBILD-SCPL-Struktur konsistent ist
   - **AGENT_MATERIAL** (Aufgabe 1.9): Ordnet TB-Knoten eindeutig SCPL-Phasen zu, dokumentiert "primärer Knoten"
   - **S14-Prüflogik**: Nutzt diese Zuordnungen zur Monotonie-Prüfung

---

## Cluster-Analyse: Überlappung und Redundanz zwischen S1, S4, S5, S14

### These: Die 4 Kriterien sind redundant strukturiert

Das Phasenlogik-Cluster prüft die **Sequenzierung** aus 4 verschiedenen Blickwinkeln, was zu konzeptuellen Überlappungen führt:

| Kriterium | Prüft | Input-Quelle | Kontext |
|---|---|---|---|
| S1 | Artikulationsschema-Konformität (Phase-Abfolge) | Didaktik-Rahmen + Funktions-Enums | Perspektive-spezifisch |
| S4 | Funktions-Monotonie | Funktions-Enums allein | Perspektive-agnostisch |
| S5 | Vergegenwärtigung-Besinnung-Ordnung | Material-Typen + externe Klassifizierungen | Fachdidaktisches Roth-Prinzip |
| S14 | SCPL-Reihenfolge | TB-Knoten + SCPL-Phasen | Narrative Sinnstruktur |

### Überlappungsanalyse: Kann S1 PASS aber S4 FAIL sein?

**Hypothetisches Szenario:**

```
Mappe: [einstieg, sicherung, erarbeitung, sicherung]
Funktions-Sequenz nach S1-Logik:
- einstieg (Phase 1)
- sicherung (Phase 4) ← Verletzung der Phasenfolge!
- erarbeitung (Phase 2) ← Zu spät
```

Nach S1-Prüflogik:
- einstieg ≠ erarbeitung (narrativ) ≠ sicherung → **Phasen sind nicht monoton → S1-FAIL**

Nach S4-Prüflogik:
- einstieg < sicherung? Ja
- sicherung < erarbeitung? Nein (sicherung > erarbeitung) → **S4-FAIL**

**Ergebnis:** Beide schlagen fehl. Es gibt kein Szenario, in dem S1 PASS aber S4 FAIL ist (wenn S1 Prüflogik korrekt operationalisiert ist).

### Überlappungsanalyse: Ist S5 ein Spezialfall von S1?

**These:** S5 ist nicht ein Spezialfall von S1, sondern eine **zusätzliche, semantischere Ebene**.

**Begründung:**

- **S1** prüft, ob die Funktions-Enums der Phasenlogik folgen
- **S5** prüft, ob die **materiale Realität** (ist dieses Material wirklich narrativ-anschaulich?) der Phasenlogik folgt

**Beispiel — Material, das S1 PASS aber S5 FAIL sein kann:**

```
Material 1: Quellentext mit Analyseauftrag
- didaktische_funktion: erarbeitung
- S1 Klassifizierung (wenn S1 sagt "erarbeitung = Besinnung"): Phase 3
- S5 Klassifizierung: Besinnung (analytisch)

Material 2: Darstellungstext (rein narrativ)
- didaktische_funktion: erarbeitung
- S1 Klassifizierung (wenn S1 sagt "erarbeitung = Vergegenwärtigung"): Phase 2
- S5 Klassifizierung: Vergegenwärtigung (narrativ)

Sequenz: [Material 1, Material 2]

S1-Prüfung: erarbeitung < erarbeitung → PASS (kein Phasenstoß erkannt)
S5-Prüfung: Besinnung vor Vergegenwärtigung → FAIL
```

**Folgerung:** S5 ist **nicht redundant zu S1**. S5 ist ein **Semantic-Layer**, der prüft, ob die materiale Realität der abstrakten Phase-Ordnung entspricht.

### Überlappungsanalyse: Ist S14 redundant zu S4?

**These:** S14 ist **nicht redundant zu S4**, sondern auf einer anderen Ebene.

**Begründung:**

- **S4** prüft, ob die **Funktions-Abfolge** monoton ist (einstieg < erarbeitung < sicherung)
- **S14** prüft, ob die **TB-Knoten-SCPL-Abfolge** monoton ist (S < C < P < L)

**Szenario, in dem S4 PASS aber S14 FAIL sein kann:**

```
Sequenzplan:
| # | Material | Didaktische Funktion | TB-Knoten | SCPL-Phase |
| 1 | mat-a | einstieg | — | — |
| 2 | mat-b | erarbeitung | k1-1 | P |
| 3 | mat-c | erarbeitung | k1-2 | S |
| 4 | mat-d | sicherung | k1-3 | L |

S4-Prüfung: einstieg ≤ erarbeitung ≤ erarbeitung ≤ sicherung → PASS ✓
S14-Prüfung: — ≤ P ≤ S ≤ L → FAIL (P vor S ist falsch) ✗
```

S4 schlägt nicht fehl, weil beide Materialien `erarbeitung` sind (parallele erarbeitung erlaubt).
S14 schlägt fehl, weil P vor S steht (SCPL-Ordnung verletzt).

**Folgerung:** S14 ist **nicht redundant zu S4**. S14 prüft eine **inhaltliche** Sinnstruktur, die S4 nicht erfasst.

### Redundanzanalyse: S1 und S14

**These:** S1 und S14 sind konzeptuelle Nachbarn und könnten potenziell zusammengefasst werden.

**Vergleich:**

| Kriterium | Phasen | Quelle | Perspektive-Abhängig? |
|---|---|---|---|
| S1 | Problembegegnung → Vergegenwärtigung → Besinnung → Sicherung | Artikulationsschema aus Fachdidaktik | JA (historisch/geographisch/sozialpolitisch) |
| S14 | Situation → Complication → Problem → Lösung | TAFELBILD-Struktur | NEIN (allgemein narrative Struktur) |

**Können diese äquivalent sein?**

Wenn das Artikulationsschema = SCPL-Struktur:
```
Historisch: Problembegegnung ≈ S, Vergegenwärtigung ≈ C, Besinnung ≈ P, Sicherung ≈ L
```

Dann wären S1 und S14 **redundant**.

**Aber ist das Äquivalenz gerechtfertigt?**

Empirisch: Im Testfall (Mappe 4) ist das TAFELBILD-SCPL nicht äquivalent zum Artikulationsschema:

```
TAFELBILD SCPL: S (Plan) → C (Einmarsch, Zeitkalkül) → P (Marne) → L (Stellungskrieg)
Artikulationsschema: Problembegegnung (?) → Vergegenwärtigung (Plan+Einmarsch) → Besinnung (Marne) → Sicherung (Stellungskrieg)
```

**Das passt, aber nicht perfekt.** Das liegt daran, dass:
- **S1** prüft, ob die **didaktische Progression** korrekt ist
- **S14** prüft, ob die **narrative Sinnstruktur** (SCPL) korrekt ist

Die beiden sind **orthogonal**, nicht äquivalent.

### Empfehlung: Cluster-Struktur optimieren

Basierend auf der Überlappungsanalyse:

| Kriterium | Status | Empfehlung |
|---|---|---|
| S1 | FRAGIL, problematisch | ÜBERARBEITEN: Input-Schema für "narrativ/analytisch" Klassifizierung ergänzen. Grenzfall-Toleranzen hinzufügen. |
| S4 | ROBUST | BEHALTEN: Kernmechanismus ist solid. Optional: Fußnote zu S5-Koordination. |
| S5 | FRAGIL, Eingabefehler | ÜBERARBEITEN: Input-Schema für "illustrativ/heuristisch" und "Urteilsauftrag" ergänzen. Hybrid-Material-Toleranzen hinzufügen. |
| S14 | FRAGIL, Konsistenzproblem | ÜBERARBEITEN: Konsistenz-Prüfung in TB-Abdeckung hinzufügen. "Primärer Knoten"-Operationalisierung präzisieren. |

**Nicht empfohlen:** S1 und S14 zusammenzufassen. Sie sind konzeptuell unterschiedlich (Artikulationsschema vs. SCPL-Sinnstruktur).

---

## Empfehlungen: Konkrete Massnahmen (priorisiert)

### Priorität 1: KRITISCH — Input-Schema-Erweiterung

**Problem:** S5 und S1 brauchen Input-Felder, die im aktuellen MATERIAL_GERUEST-Format fehlen.

**Aktion:**

1. **MATERIAL_GERUEST-Schema erweitern (Phase 1):**

   ```markdown
   Neue Spalten im Sequenzplan-Abschnitt:
   
   - `erarbeitungscharakter` (Enum): [narrativ-vergegenwaertigend | analytisch-sachbezogen | analytisch-wertbezogen]
     Verantwortung: AGENT_MATERIAL (Aufgabe 1.9)
     Validierung: Subagent in SQ-1 bis SQ-4
   
   - `bildquelle_funktion` (Enum, nur für bildquelle-Materialien): [illustrativ | heuristisch]
     Verantwortung: AGENT_MATERIAL (Aufgabe 1.9)
   
   - `quellentext_funktion` (Enum, nur für quellentext-Materialien): [quellenlesung_authentizitaet | quellentext_analyse]
     Verantwortung: AGENT_MATERIAL (Aufgabe 1.9)
   
   - `material_enthaelt_urteilsauftrag` (ja/nein): [ja | nein]
     Verantwortung: AGENT_MATERIAL (Aufgabe 1.9)
   
   - `primary_tb_knoten` (single TB-Knoten-ID): Bei heterogenen Materialien explizit benennen
     Verantwortung: AGENT_MATERIAL (Aufgabe 1.9)
   ```

2. **AGENT_MATERIAL Aufgabe 1.9 anpassen:**

   Neu-Schritte in Aufgabe 1.9.2 (Sequenzplanung):

   ```markdown
   Schritt 1.9.2a: Klassifiziere erarbeitungscharakter
   Für jedes Material mit didaktische_funktion = erarbeitung:
   - Narrativ-vergegenwaertigend: Arbeitet mit Personalisierung, Anschaulichkeit, zeitlich/räumlicher Verortung, emotionaler Nähe
   - Analytisch-sachbezogen: Zerlegt Mechanismen, Strukturen, Ursachen; fordert Analyse, aber noch nicht Wertung
   - Analytisch-wertbezogen: Fordert Urteilsbildung, Bewertung, Stellungnahme
   
   Operationales Kriterium: "Enthält das Material einen Analyseauftrag?"
   - Nein → narrativ-vergegenwaertigend
   - Ja, sachbezogen → analytisch-sachbezogen
   - Ja, Wertung → analytisch-wertbezogen
   
   Schritt 1.9.2b: Klassifiziere bildquelle_funktion und quellentext_funktion
   [wie oben dokumentiert]
   
   Schritt 1.9.2c: Benenne primary_tb_knoten (bei heterogenen Materialien)
   [wie oben dokumentiert]
   ```

3. **Q-Gate S1, S5 überarbeiten (Sektion 6):**

   Nutze die neuen Input-Felder in der Prüflogik.

**Verantwortung:** AGENT_MATERIAL (Prompt erweitern), Q-Gate-Dokument überarbeiten
**Timeline:** Vor nächste Mappe
**Testfall-Validierung:** Mappe 4 neu durchlaufen mit erweitertem Schema

---

### Priorität 2: HOCH — Konsistenz-Checks in TB-Abdeckung

**Problem:** MATERIAL_GERUEST Mappe 4 hat intern inkonsistente SCPL-Zuordnungen.

**Aktion:**

1. **Mappe 4 TB-Abdeckung überprüfen und klarifizieren:**

   ```markdown
   Frage 1: Sind k4-2 (Zweifrontenkrieg) und k4-3 (Zeitluecke) S- oder C-Elemente?
   
   Entscheidung-Prozess:
   - Lies TAFELBILD Mappe 4 (wo stehen diese Knoten im SCPL-Block?)
   - Lies SKRIPT Chunk 4 (wie werden diese Elemente narrativ eingeführt?)
   - Diskutiere mit AGENT_HEFTEINTRAG (wurden diese als S oder C intendiert?)
   
   Dokumentiere die Entscheidung explizit in MATERIAL_GERUEST TB-Abdeckungs-Tabelle.
   ```

2. **Konsistenz-Check-Mechanismus für alle Mappen einführen:**

   In Q-Gate Sektion 5, neue Prüfschritt vor S1-S15:

   ```markdown
   Konsistenz-Pre-Check (vor S1-S15):
   
   | Schritt | Pruefung |
   |---|---|
   | 1 | Jeder TB-Knoten in TAFELBILD hat genau eine SCPL-Phase-Zuordnung (nicht mehrere, nicht ambig) |
   | 2 | MATERIAL_GERUEST TB-Abdeckungs-Tabelle ist konsistent mit TAFELBILD SCPL-Zuordnung |
   | 3 | Jedes Material im Sequenzplan hat primary_tb_knoten benannt (falls heterogen) |
   | 4 | SCPL-Phase des primary_tb_knoten ist dokumentiert |
   
   FAIL wenn: Ein Schritt fehlschlägt → Revision notwendig vor Sequenz-Q-Gate
   ```

**Verantwortung:** AGENT_MATERIAL, AGENT_HEFTEINTRAG (koordiniert)
**Timeline:** Sofort für Mappe 4 (vor User-Validierung), dann für alle zukünftigen Mappen

---

### Priorität 3: HOCH — Grenzfall-Toleranzen hinzufügen

**Problem:** S1, S5 haben keine Grenzfall-Toleranzen für kleine Mappen (2-3 Materialien), heterogene Materialien, etc.

**Aktion:**

In GUETEKRITERIEN_SEQUENZIERUNG.md Sektion 6, für S1, S5, S14:

```markdown
### Grenzfall-Toleranzen (neu hinzufügen)

#### S1 Grenzfall-Toleranzen

TOLERANZ 1: Mappe mit < 3 Materialien
- Wenn 2 Materialien: einstieg → sicherung ist erlaubt (Vergegenwärtigung entfällt)
- Wenn 1 Material: einstieg allein ist erlaubt

TOLERANZ 2: Einstieg durch Rahmen-Elemente
- Falls kein Material mit didaktische_funktion = einstieg, aber einstieg.json vorhanden:
  Prüfung der Phasenliste beginnt ab Material 1 (Material 1 kann erarbeitung sein)

TOLERANZ 3: Heterogene Materialien (mehrere TB-Knoten)
- Material wird nach primary_tb_knoten klassifiziert
- Sekundäre Knoten-Bedienung wird ignoriert

[... ähnlich für S5, S14 ...]
```

**Verantwortung:** GUETEKRITERIEN_SEQUENZIERUNG.md überarbeiten
**Timeline:** Vor nächste Mappe

---

### Priorität 4: MITTEL — Sub-Agenten SQ-1 bis SQ-4 Koordination

**Problem:** S1, S5, S14 erfordern Klassifizierungen, die nicht nur AGENT_MATERIAL, sondern auch SUB_MATERIAL_* Subagenten betreffen.

**Aktion:**

In SUB_MATERIAL_*.md-Dateien (DARSTELLUNGSTEXT, BILDQUELLE, QUELLENTEXT, etc.):

```markdown
### SQ-Kohaerenz mit Sequenzplan-Klassifizierungen

Bei Produktion des Materials:

1. Lies MATERIAL_GERUEST Zeile dieses Materials
2. Prüfe, welche Klassifizierungen AGENT_MATERIAL gesetzt hat:
   - erarbeitungscharakter
   - bildquelle_funktion
   - quellentext_funktion
   - material_enthaelt_urteilsauftrag
3. Validiere in SQ-K (neue Regel):
   - Wenn erarbeitungscharakter = narrativ-vergegenwaertigend:
     Enthält Material Personalisierung, Anschaulichkeit, emotionale Nähe?
   - Wenn bildquelle_funktion = illustrativ:
     Wird das Bild als Bestätigung (nicht als Analyseanforderung) eingesetzt?
   - [... ähnlich für autres Klassifizierungen ...]
4. Bei Unstimmigkeit: Melde an AGENT_MATERIAL zur Redesign
```

**Verantwortung:** Alle SUB_MATERIAL_*.md Dateien
**Timeline:** Parallel mit Aktion Priorität 1

---

### Priorität 5: NIEDRIG — Dokumentation und Schulung

**Aktion:**

1. **Schreibe ein Operationalisierungs-Handbuch:**

   Datei: `/docs/projekt/audit_operationalisierung_v2/HANDBUCH_PHASENLOGIK.md`

   Inhalt:
   - Schritt-für-Schritt Anleitung zur Anwendung von S1, S4, S5, S14
   - Worked Examples (Mappe 4 mit allen Klassifizierungen)
   - FAQ (häufige Fehler und deren Behebung)
   - Entscheidungsbäume für ambige Fälle

2. **Schulung für AGENT_MATERIAL und Subagenten:**

   Vor nächste Mappe: Durchlauf des erweiterten Schemas mit Mappe 4 als Test-Anwendung

---

## Zusammenfassung: Operationalisierungsqualität

### Status nach Audit

| Kriterium | Gesamtstatus | Kritische Schwächen | Patch-Aufwand |
|---|---|---|---|
| S1 | FRAGIL | Input-Schema unvollständig, Grenzfälle nicht robust | HOCH |
| S4 | ROBUST | Minimale (Koordination mit S5) | NIEDRIG |
| S5 | FRAGIL | Input-Schema unvollständig, Klassifizierungen ambig, interne Inkonsistenz | HOCH |
| S14 | FRAGIL | SCPL-Zuordnungen in Testfall inkonsistent, "primärer Knoten" ambig | MITTEL |

### Cluster-Gesamtscore

**Operationalisierungsqualität: 2.0/5.0** (auf Skala: 1=Defekt, 5=Exzellent)

**Begründung:**
- Alle 4 Kriterien sind **konzeptuell sinnvoll** (D6=ROBUST für alle)
- Aber **3 von 4 sind operationalisierungstechnisch fragil** wegen fehlender Eingaben und unterbestimmter Klassifizierungen
- S4 allein ist ROBUST, reicht aber nicht aus
- Die Patches sind **machbar**, aber **zeitaufwändig** (besonders Priorität 1)

### Empfehlung: Freigabe und Patch-Strategie

**Sofort umzusetzen (vor nächste Mappe):**
1. Mappe 4 TB-Abdeckung konsistenz-prüfen und klären
2. MATERIAL_GERUEST-Schema um neue Felder erweitern
3. AGENT_MATERIAL Aufgabe 1.9 neu schreiben (mit Klassifizierungen)
4. Q-Gate Sektion 6 (S1, S5, S14) überarbeiten

**Nach Mappe 5 Review:**
1. Handbuch schreiben
2. Schulung durchführen
3. Grenzfall-Toleranzen basierend auf praktischen Erfahrungen verfeinern

**Nicht aufschieben:**
Ohne diese Patches wird die Operationalisierung fragil bleiben, und Agent-Fehler (falsche Klassifizierungen) werden sich durch die ganze Produktionspipeline fortpflanzen.

---

## Appendix: Testfall-Konkrete Fehlerrekonstruktion

**Mappe 4 — Wo sind die S1/S5/S14 Probleme?**

### Problem 1: mat-4-3 (Tagebuch) Klassifizierung

**Im MATERIAL_GERUEST dokumentiert als:**
```
mat-4-3 | tagebuch | Personifiziert den Vormarsch aus Soldatenperspektive: von Siegeszuversicht zu Erschoepfung.
```

**S5-Frage:** Ist das Vergegenwärtigung oder Besinnung?

**Ohne Klassifizierung:** FRAGIL. Die Beschreibung könnte beide sein.
**Mit erweitertem Schema:** Wahrscheinlich narrativ-vergegenwaertigend (Personalisierung, emotionale Progression, ohne expliziten Analyseauftrag).

### Problem 2: mat-4-5 (Bildquelle) Klassifizierung

**Im MATERIAL_GERUEST dokumentiert als:**
```
mat-4-5 | bildquelle | Zeigt den Stellungskrieg als konkrete Realitaet im Kontrast zum geplanten Bewegungskrieg.
```

**S5-Frage:** Ist das illustrativ oder heuristisch?

**Q-Gate selbst sagt:** "Alle 5 Materialien Vergegenwärtigung-Typ. Kein Besinnungs-Material."

Das würde bedeuten: **illustrativ** (zeigt Realität, bestätigt Plan-Scheitern).

**Aber:** Die Formulierung "im Kontrast zum geplanten Bewegungskrieg" klingt nach **interpretativem Auftrag** (Schüler sollen den Kontrast erkenne).

**Ohne Klassifizierung:** AMBIG. Mit erweitertem Schema: Müsste explizit entschieden werden.

### Problem 3: mat-4-1 (DT) und SCPL-Heterogenität

**Im Sequenzplan dokumentiert als:**
```
mat-4-1 | darstellungstext | erarbeitung | k4-2, k4-1, k4-3 | S+C1 |
```

**S14-Frage:** Ist mat-4-1 S-Material oder C-Material?

**Ohne primary_tb_knoten:** AMBIG.

**Mit erweitertem Schema:** AGENT_MATERIAL müsste dokumentieren:
```
primary_tb_knoten: k4-1 (Schlieffen-Plan ist die Leitidee)
sekundäre Knoten: k4-2, k4-3 (Zweifrontenkrieg, Zeitluecke sind Kontextinformationen)
SCPL-Klassifizierung für S14: S (basierend auf primary k4-1)
```

Aber das erfordert **inhaltliche Entscheidung**, nicht nur mechanische Erfassung.

---

## Abschlusswort

Das Phasenlogik-Cluster ist **konzeptuell wertvoll** und das Fundament für konsistente Sequenzierung. Nach diesem Audit sind aber **kritische Operationalisierungs-Lücken** identifiziert worden, die behoben werden müssen, bevor das Q-Gate robust genug ist für volle Automatisierung.

**Die gute Nachricht:** Die Lücken sind **nicht konzeptueller Natur** (die Kriterien sind sound), sondern **administrativ-schematisch**. Sie sind durch Erweiterung der Eingabe-Schemas und Präzisierung der Klassifizierungsregeln **lösbar**.

**Die Warnung:** Ohne diese Patches wird AGENT_MATERIAL und die Subagenten Fehlklassifizierungen produzieren, die sich durch die ganze Produktions-Pipeline fortpflanzen und zu didaktisch minderwertigen Mappen führen.

**Empfehlung:** Hiermit beantrage ich, dass Priorität 1-3 **vor Mappe 5 Produktion** umgesetzt werden. Die dann folgenden Patches (Priorität 4-5) können parallel zur Produktionslaufzeit erfolgen.

