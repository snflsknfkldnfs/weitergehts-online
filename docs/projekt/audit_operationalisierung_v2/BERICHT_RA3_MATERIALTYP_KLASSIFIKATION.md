# RA3: Materialtyp-Klassifikation-Cluster (S7, S8, S11, S12, S13)

**Auditor:** RA3 (Subagent — Operationalisierungs-Audit)
**Datum:** 2026-04-07
**Testfall:** MATERIAL_GERUEST Mappe 4 (Schlieffen-Plan, 5 Materialien, 4 Typen)
**Audit-Methode:** Systematische Operationalisierungs-Bewertung (D1-D6) pro Kriterium + Cluster-Analyse

---

## Zusammenfassung (Executive Summary)

Die 5 Kriterien S7, S8, S11, S12, S13 bilden einen **Materialtyp-Klassifikations-Cluster**, weil sie alle davon abhängen, wie präzise Materialtypen nach Funktion, Charakter und didaktischer Rolle klassifiziert werden. 

**Gesamteinschätzung:** Der Cluster ist **FRAGIL bis DEFEKT**. Grund:

1. **D1 (Inputverfügbarkeit):** DEFEKT — Die notwendigen Klassifikationsfelder (`bildfunktion`, `material_charakter`, `personalisiert`) existieren nicht im MATERIAL_GERUEST.
2. **D2 (Entscheidungsdeterminiertheit):** FRAGIL — S7, S8, S12, S13 haben Interpretationsspielraum, der zu nicht-deterministischen Bewertungen führt.
3. **D3 (Grenzfall-Robustheit):** FRAGIL — Kleine Material-Sets (2-3), Misch-Materialien und Sonderfälle werden nicht adäquat behandelt.
4. **D4 (Überlappungsfreiheit):** FRAGIL — S7, S12 überlappen; S13 ist zu eng mit S5 verknüpft.
5. **D5 (Nachbesserbarkeit):** ROBUST bei S7, S8, S11; FRAGIL bei S12, S13.
6. **D6 (Fachdidaktische Dichte):** FRAGIL — Die Abstraktionsskala (1-4) ist zu grob; Sprachregister-Progression ist vage.

**Kosten-Nutzen der Operationalisierung:**
- **S7:** NUTZEN mittel, KOSTEN niedrig → PATCH möglich
- **S8:** NUTZEN hoch, KOSTEN niedrig → PATCH notwendig
- **S11:** NUTZEN niedrig, KOSTEN niedrig → bereits PASS
- **S12:** NUTZEN mittel, KOSTEN hoch (neue Klassifikation `sprachregister`) → OPTIONAL
- **S13:** NUTZEN mittel, KOSTEN mittel (neue Klassifikation `personalisiert`) → OPTIONAL

---

## 1. S7: Vom Anschaulichen zum Abstrakten

### 1.1 Operationalisierungsdefinition (aus GUETEKRITERIEN_SEQUENZIERUNG.md)

**Intention:** Die Sequenz bewegt sich tendenziell von konkreten, anschaulichen Materialien (Bilder, Erzählungen, Fallbeispiele) zu abstrakteren Materialien (Begriffsarbeit, Strukturanalyse, Transfer).

**Formale Prueflogik:**
1. Ordne jedem Materialtyp einen Abstraktionsgrad zu:
   - 1 (konkret): `bildquelle`, `tagebuch`
   - 2 (narrativ): `darstellungstext`, `zeitleiste`
   - 3 (analytisch): `quellentext`
   - 4 (abstrakt): Begriffsarbeit, Strukturdiagramm
2. Berechne Durchschnitt der ersten Hälfte und zweiten Hälfte
3. Erwartung: Durchschnitt(1. Hälfte) ≤ Durchschnitt(2. Hälfte)
4. **FAIL wenn:** Durchschnitt(1. Hälfte) > Durchschnitt(2. Hälfte) + 0.5

### 1.2 Bewertung D1-D6

#### D1: Inputverfügbarkeit — **DEFEKT**

**Befund:**
Das MATERIAL_GERUEST enthält folgende Felder:
- `mat-ID`, `Typ`, `Skript-Ref`, `Artefakt-Ref`, `TB-Knoten`, `Funktion (didaktische_funktion)` (aus Sequenzplan)

Das Feld `didaktische_funktion` ist verfügbar (Position 5 in der Sequenzplan-Tabelle: "erarbeitung", "sicherung").

Das MATERIAL_GERUEST verfügt NICHT über:
- `bildfunktion` (illustrativ vs. heuristisch) — Nur Typ wird genannt, nicht die Funktion der Bildquelle
- `material_charakter` (vergegenwaertigung vs. besinnung) — Nicht explizit erfasst
- `abstraktionsgrad` (1-4 Scale) — Muss vom Typ inferiert werden, ist aber nicht explizit dokumentiert

**Testfall Mappe 4:**
```
| # | mat-ID | Typ | Funktion | Inferred Abstraktionsgrad |
|---|--------|-----|----------|--------------------------|
| 1 | mat-4-1 | darstellungstext | erarbeitung | 2 (narrativ) |
| 2 | mat-4-2 | karte | erarbeitung | ? (konkret oder narrativ?) |
| 3 | mat-4-3 | tagebuch | erarbeitung | 1 (konkret) |
| 4 | mat-4-4 | karte | erarbeitung | ? (konkret oder narrativ?) |
| 5 | mat-4-5 | bildquelle | sicherung | 1 (konkret, aber ankernde Funktion) |
```

**Problem:** Bei `karte` ist unklar, ob sie als 1 oder 2 eingestuft wird. Karten können sowohl illustrativ (konkrete Wege visualisieren) als auch analytisch (Strukturen, Muster zeigen) sein.

**Konkretes Beispiel:**
- mat-4-2 zeigt den Schlieffen-Plan als geographische Strategie (illustrativ, eher 1-2)
- mat-4-4 zeigt die Marne-Schlacht mit Flankenangriff und Rueckzug (analysierend, eher 2-3)

Die Operationalisierung unterscheidet nicht zwischen diesen beiden Kartentypen.

**Bewertung D1:** DEFEKT — Die Abstraktionsgradskala ist zu grob, um ohne zusätzliche Klassifikationsfelder deterministisch angewandt zu werden.

#### D2: Entscheidungsdeterminiertheit — **FRAGIL**

**Befund:**
Die Prueflogik ist formal deterministisch (Durchschnitstsvergleich), aber die Eingabe (Abstraktionsgradberechnung) ist NICHT deterministisch.

**Testfall Mappe 4:**
Zwei mögliche Interpretationen der Kartenfunktion:

**Szenario A (Karten als konkret=1):**
```
1. Haelfte (Pos 1-2.5):
   - mat-4-1: darstellungstext = 2
   - mat-4-2: karte = 1
   Durchschnitt 1. Hälfte = (2+1) / 2 = 1.5

2. Haelfte (Pos 3-5):
   - mat-4-3: tagebuch = 1
   - mat-4-4: karte = 1
   - mat-4-5: bildquelle = 1
   Durchschnitt 2. Hälfte = (1+1+1) / 3 = 1.0

Ergebnis: 1.5 > 1.0 + 0.5 = 1.5 → FAIL
```

**Szenario B (Karten als narrativ=2):**
```
1. Haelfte (Pos 1-2.5):
   - mat-4-1: darstellungstext = 2
   - mat-4-2: karte = 2
   Durchschnitt 1. Hälfte = (2+2) / 2 = 2.0

2. Haelfte (Pos 3-5):
   - mat-4-3: tagebuch = 1
   - mat-4-4: karte = 2
   - mat-4-5: bildquelle = 1
   Durchschnitt 2. Hälfte = (1+2+1) / 3 = 1.33

Ergebnis: 2.0 > 1.33 + 0.5 = 1.83 → FAIL
```

**Szenario C (mat-4-2 konkret, mat-4-4 narrativ):**
```
1. Haelfte (Pos 1-2.5):
   - mat-4-1: darstellungstext = 2
   - mat-4-2: karte (illustrativ) = 1
   Durchschnitt 1. Hälfte = 1.5

2. Haelfte (Pos 3-5):
   - mat-4-3: tagebuch = 1
   - mat-4-4: karte (analytisch) = 2
   - mat-4-5: bildquelle = 1
   Durchschnitt 2. Haelfte = 1.33

Ergebnis: 1.5 > 1.33 + 0.5? KNAPP AN GRENZE
```

**Ergebnis im Q-Gate Mappe 4 (aus MATERIAL_GERUEST Zeile 174):**
```
| S7 | Vom Anschaulichen zum Abstrakten | SOLL | PASS | 
    1. Haelfte: DT(2)+Karte(1)=1.5. 
    2. Haelfte: TB(1)+Karte(1)+BQ(1)=1.0. 
    Grenzwert nicht ueberschritten.
```

**Analyse:** Der Q-Gate-Prüfer hat anscheinend **beide Karten als 1 (konkret)** interpretiert, was zu 1.5 vs. 1.0 führt. Da 1.5 < 1.0 + 0.5 = 1.5, ist die Bedingung "Durchschnitt > Grenzwert + 0.5" NICHT verletzt → PASS.

**Problem:** Diese Bewertung ist nur dann reproduzierbar, wenn die Kartenbewertung explizit dokumentiert ist. Das ist nicht der Fall.

**Bewertung D2:** FRAGIL — Die Prueflogik ist formal deterministisch, aber die Klassifikation der Input-Daten (Abstraktionsgradberechnung pro Materialtyp) ist nicht deterministisch dokumentiert.

#### D3: Grenzfall-Robustheit — **FRAGIL**

**Test 1: Mappe mit 2 Materialien**
```
Pos 1: Bildquelle = 1
Pos 2: Darstellungstext = 2

1. Hälfte = (1) / 1 = 1.0 (nur Pos 1 anrechnen)
2. Hälfte = (2) / 1 = 2.0

Ergebnis: 1.0 < 2.0? PASS

Aber: Ist eine Mappe mit 2 Materialien didaktisch sinnvoll genug, um überhaupt geprüft zu werden?
```

**Test 2: Mappe mit 8+ Materialien und Typ-Mischung**
```
Pos 1-4: DT(2), Karte(1), TB(1), Quellentext(3)
Pos 5-8: Zeitleiste(2), Statistik(?), Bildquelle(1), Quellentext(3)

1. Hälfte (1-4): (2+1+1+3) / 4 = 1.75
2. Hälfte (5-8): (2+?+1+3) / 4 = abhängig von Statistik-Klassifikation

Problem: Statistik ist nicht in der Skala definiert.
```

**Test 3: "Hybridmaterialien" (z.B. "Karte mit Analyseauftrag")**
```
Das MATERIAL_GERUEST unterscheidet nicht zwischen:
- Karte als illustratives Material (konkreter visualisieren)
- Karte als heuristisches Material (Schüler sollen Muster erkennen)

Das würde einen Unterschied im Abstraktionsgrad implizieren.
```

**Test 4: Materialien mit sicherung-Funktion**
```
mat-4-5 ist Bildquelle mit Funktion "sicherung" — wird es als 1 (konkret) eingestuft?
Oder sollte die sicherungs-Funktion die Abstraktung beeinflussen?

Die Operationalisierung ist typ-basiert, nicht funktions-basiert. Das könnte zu Fehlklassifikationen führen.
```

**Bewertung D3:** FRAGIL — Die Prueflogik funktioniert bei "Standard"-Materialsets (3-5 Materialien), bricht aber bei Grenzfällen zusammen:
- Zu kleine/zu große Sets
- Hybrid-Materialien (Typ + heuristische/illustrative Dimension)
- Materialien mit dominanter sicherungs-Funktion

#### D4: Überlappungsfreiheit — **FRAGIL**

**Überlappung mit S5 (Vergegenwärtigung vor Besinnung):**

S5 definiert:
- Vergegenwärtigung (narrativ-anschaulich): Darstellungstext, Bildquelle illustrativ, Tagebucheintrag
- Besinnung (analytisch-urteilend): Quellentext mit Analyseauftrag, Bildquelle heuristisch

S7 definiert:
- Konkret (1-2): Bildquelle, Tagebuch, Darstellungstext
- Analytisch (3-4): Quellentext

**Das Problem:** Beide Kriterien versuchen, die gleiche Dimension (konkret → abstrakt) zu messen, aber mit unterschiedlichen Kategorien:
- S5 unterscheidet nach **Material-Charakter** (vergegenwaertigung/besinnung)
- S7 unterscheidet nach **Abstraktionsgrad** (1-4 Skala)

Diese sind NICHT orthogonal:
- Ein Quellentext ist immer "Besinnung" (S5) und "analytisch" (S7)
- Ein Tagebuch ist immer "Vergegenwärtigung" (S5) und "konkret" (S7)
- Eine Bildquelle kann beides sein, je nach ihrer Funktion

**Konkretes Problem im Testfall Mappe 4:**
- mat-4-5 (Bildquelle) wird in S5 als "illustrativ" klassifiziert (Vergegenwärtigung)
- Aber die sicherungs-Funktion deutet auf eine "ankernde", eher synthetisierende Rolle hin
- In S7 wird sie als 1 (konkret) eingestuft
- **Interpretation:** Das Material ist sowohl "Vergegenwärtigung" (S5) als auch "Anker für Abstraktion" (S7) — das ist konsistent, aber nicht klar untereinander zu referenzieren

**Überlappung mit S12 (Sprachregister-Progression):**

S7 misst Abstraktionsgrad.
S12 misst Sprachregister.

Diese sind teilweise korreliert:
- Darstellungstext (konkret/narrativ) mit "erfahrungsbezogen-narrativ" Register
- Quellentext (analytisch) mit "fachbegrifflich-analytisch" Register

Aber **nicht eins-zu-eins:**
- Ein Tagebuch kann sehr literarisch (narrativ Register) ODER sehr faktisch (analytisches Register) sein
- Ein Quellentext kann emotiv (narrativ Register) oder kühl (analytisch Register) sein

**Bewertung D4:** FRAGIL — S7 überlappt mit S5 (beide messen Konkret→Abstrakt) und mit S12 (beide hängen von Register-Wahlen ab). Die Kriterien könnten sich widersprechen, wenn Register und Typ nicht konsistent sind.

#### D5: Nachbesserbarkeit — **ROBUST**

**Befund:**
Die Nachbesserung ("Konkrete Materialien nach vorne, abstrakte nach hinten verschieben") ist vollständig autonom durch AGENT_MATERIAL umsetzbar:

1. Berechne Abstraktionsgradscores pro Material (auch wenn grob)
2. Sortiere Material um, bis Bedingung erfüllt ist
3. Verifiziere, dass S1-S6 noch erfüllt sind (keine zirkulären Abhängigkeiten zu anderen Kriterien)

**Risiken:**
- Umpositionierung könnte S15 (Skript-Kongruenz) verletzen
- Umpositionierung könnte S5 (Vergegenwärtigung vor Besinnung) verletzen
- Aber: Diese Konflikte sind resolvierbar durch Neubetrachtung der Typzuordnung

**Beispiel aus Mappe 4:**
Wenn S7 FAIL würde, könnte man:
- mat-4-3 (Tagebuch, konkret) nach Position 2 verschieben
- mat-4-2 (Karte) nach Position 3 verschieben
- Dies hätte Konsequenzen für die Sequenzlogik (TB-Knoten-Abhängigkeiten), aber ist im Prinzip möglich

**Bewertung D5:** ROBUST — Die Nachbesserung ist autonom möglich, erfordert aber Konsistenz-Checks in anderen Kriterien.

#### D6: Fachdidaktische Dichte — **FRAGIL**

**Befund:**
Die Abstraktionsskala (1-4) ist zu grob und literarisch:

```
1 (konkret): bildquelle, tagebuch — aber:
   - Bildquelle eines Industriewerks ist sehr abstrakt (Struktur, Muster)
   - Tagebuch eines Philosophen ist sehr abstrakt (Gedanken, Theorien)

2 (narrativ): darstellungstext, zeitleiste — aber:
   - Darstellungstext kann hochgradig abstrakt sein (Systemanalyse)
   - Zeitleiste kann völlig konkret sein (Datumsabfolge ohne Analyse)

3 (analytisch): quellentext — aber:
   - Quellentext-Eintrag "die Sonne geht auf" ist sehr konkret
   - Quellentext mit theoretischer Analyse ist sehr abstrakt

4 (abstrakt): Begriffsarbeit, Strukturdiagramm — nur theoretisch erwähnt, nicht operationalisiert
```

**Das eigentliche Problem:** Die Skala misst nicht "Abstraktionsgrad" (kognitive Anforderung), sondern eher "Darstellungstyp" (Format). Das ist eine kategorienfehler.

**Fachdidaktischer Kern (verkannt):**

Die echte didaktische Progression ist:
1. **Konkretion:** Schüler erleben, sehen, fühlen (Sinnlich-konkret)
2. **Vergegenwärtigung:** Schüler rekonstruieren, verstehen (Handlungs-orientiert)
3. **Analyse:** Schüler untersuchen, vergleichen, interpretieren (Struktur-orientiert)
4. **Besinnung:** Schüler urteilen, bewerten, reflektieren (Wert-orientiert)

Das ist **nicht dasselbe** wie die 1-4 Skala in S7:
- Vergegenwärtigung kann narrativ (DT) oder konkret (Tagebuch) sein
- Analyse kann aus Quellentext (3) oder aus heuristischer Bildquelle (auch 1/2?) kommen

**Beispiel aus Mappe 4:**
- mat-4-1 (Darstellungstext): Typ 2 (narrativ), aber Funktion ANALYSE des Zweifrontenkriegs
- mat-4-5 (Bildquelle): Typ 1 (konkret), aber Funktion BESINNUNG (Anker der Erkenntnis)

Die Typen und die kognitiven Funktionen sind **orthogonal**, nicht diagonal.

**Bewertung D6:** FRAGIL — Die Abstraktionsskala (1-4) misst Darstellungstyp, nicht Abstraktionsgrad. Die fachdidaktische Dichte ist niedrig, weil der echte Progressionsgedanke (Konkretion → Vergegenwärtigung → Analyse → Besinnung) nicht abgebildet ist.

### 1.3 Testfall-Analyse Mappe 4

**Q-Gate Resultat (aus Zeile 174):**
```
| S7 | Vom Anschaulichen zum Abstrakten | SOLL | PASS | 
    1. Haelfte: DT(2)+Karte(1)=1.5. 
    2. Haelfte: TB(1)+Karte(1)+BQ(1)=1.0. 
    Grenzwert nicht ueberschritten.
```

**Recalc mit expliziter Typisierung:**
```
Sequenzplan:
1. mat-4-1 | darstellungstext → Grad 2
2. mat-4-2 | karte → Grad 1 (illustrativ: Angriffspfeile visualisieren)
3. mat-4-3 | tagebuch → Grad 1
4. mat-4-4 | karte → Grad 1 (illustrativ: Frontlinien-Verlauf)
5. mat-4-5 | bildquelle → Grad 1

1. Haelfte (Pos 1-2.5): (2 + 1) / 2 = 1.5
2. Haelfte (Pos 3-5): (1 + 1 + 1) / 3 = 1.0

Vergleich: 1.5 > 1.0 + 0.5?
→ 1.5 > 1.5? NEIN → PASS

Ergebnis: BORDERLINE PASS
```

**Fachdidaktisches Urteil:**
Die Sequenz ist NICHT wirklich "vom Anschaulichen zum Abstrakten":
- Pos 1: DT (Erklärung der Strategie) — bereits analytisch
- Pos 2-5: Konkrete Visualisierungen und Perspektiven — eher rückwärts

Tatsächlich ist die Progression:
- **Analytisch-narrativ** (mat-4-1: Plan erklären)
- → **Konkret-visuell** (mat-4-2: Karte des Plans)
- → **Konkret-personalisiert** (mat-4-3: Soldaten-Tagebuch)
- → **Konkret-visuell** (mat-4-4: Schlacht-Karte)
- → **Konkret-ankernd** (mat-4-5: Foto als Realitäts-Anker)

**Das ist eher konkretisierend als abstraktions-progressiv.**

**Fazit für S7 Mappe 4:** PASS (formal), aber **fachdidaktisch fragwürdig**. Das Kriterium wird erfüllt, aber der intendierte Lernprogress ist nicht nachvollziehbar.

### 1.4 Grenzfälle

**Grenzfall 1: Nur darstellungstext + bildquelle (2 Typen, beide konkret)**
```
Pos 1: DT = 2
Pos 2: BQ = 1

1. Hälfte: 2
2. Hälfte: 1

Resultat: 2 > 1 + 0.5 = 1.5 → FAIL
```

**Grenzfall 2: Zeitleiste am Anfang**
```
Zeitleiste ist als Typ 2 (narrativ) definiert, aber kann sehr unterschiedliche Abstraktionsgrade haben:
- "1914: Krieg beginnt" (konkret)
- "1914: Schlieffen-Plan erfordert schnellen Sieg gegen Frankreich" (analytisch)

Welcher Grad sollte zugewiesen werden?
```

**Grenzfall 3: Statistik-Material**
```
Statistiken sind gar nicht in der 1-4 Skala definiert.
Sind sie konkret (Daten-visualisierung) oder analytisch (Interpretation erforderlich)?
```

### 1.5 Gesamt-Urteil + Patch S7

**Urteil:** FRAGIL

**Defekte:**
- D1 DEFEKT: Keine Klassifikationsfelder für Bildfunktion, Material-Charakter
- D2 FRAGIL: Interpretation der Abstraktionsgradberechnung nicht deterministisch
- D3 FRAGIL: Grenzfälle (Hybrid-Materialien, zu kleine/große Sets) nicht robust
- D4 FRAGIL: Überlappung mit S5, S12
- D6 FRAGIL: Skala misst Darstellungstyp, nicht echten Abstraktionsgrad

**Patch-Vorschlag:**

**Optionen:**

**Option A (Minimal): Explizite Typisierung**
```
Füge in den Sequenzplan eine Spalte ein:

| Material-ID | Typ | Funktion | Abstraktionsgrad | Begründung |
|---|---|---|---|---|
| mat-4-1 | darstellungstext | erarbeitung | 2 | Erklärtext ist narrativ-analytisch |
| mat-4-2 | karte | erarbeitung | 1 | Illustriert konkrete Pfeile; keine eigenständige Analyse |
| ... | ... | ... | ... | ... |

Dann ist D1 ROBUST und D2 DETERMINISTISCH.
```

**Option B (Mittler): Bildfunktion-Feld**
```
Füge ein neues Feld hinzu:

| Material-ID | Typ | Bildfunktion | Abstraktionsgrad |
|---|---|---|---|
| mat-4-2 | karte | illustrativ | 1 |
| mat-4-4 | karte | analytisch | 2 |
| mat-4-5 | bildquelle | illustrativ | 1 |

Dies würde auch S5 und S8 robuster machen.
```

**Option C (Radikal): S7 mit Material-Charakter ersetzen**

Statt Abstraktionsskala:
```
Verwende die Kategorien aus S5:
- Position Material-Charakter: vergegenwaertigung → besinnung

Die Progression sollte dann sein:
- Erste Hälfte: überwiegend Vergegenwärtigung
- Zweite Hälfte: überwiegend Besinnung (mit Ankerung)

Dies würde S5 und S7 zusammenführen.
```

**Empfehlung:** **Option A (Minimal)** + **Option B (Bildfunktion)** kombinieren.

**Konkreter Patch:**

```markdown
### Sektion 4 (GUETEKRITERIEN_SEQUENZIERUNG.md) — Ergänzung zu S7

**Neuer Absatz nach S7-Operationalisierung:**

**Klassifikations-Felder für S7-Bewertung:**

Jedes Material in der Sequenzplan-Tabelle muss eines der folgenden Klassifikations-Merkmal explizit dokumentieren:

1. **Für Bildquellen und Karten:** `bildfunktion` ∈ {illustrativ, heuristisch}
   - illustrativ: Visualisiert bekannte Sachverhalte (z.B. Kartenpfeile des Plans)
   - heuristisch: Fordert Schüler zur eigenständigen Analyse auf (z.B. "Erkenne die Strategie aus der Karte")

2. **Für alle Materialien (optional):** `material_charakter` ∈ {vergegenwaertigung, besinnung}
   - vergegenwaertigung: Schüler sollen verstehen, nachvollziehen, sich vorstellen
   - besinnung: Schüler sollen analysieren, interpretieren, bewerten

**Revidierte Operationalisierung:**

Wenn `bildfunktion` oder `material_charakter` explizit dokumentiert ist, verwende diese Felder zur Bestimmung des Abstraktionsgrades:

- Vergegenwaertigung, illustrativ → Grad 1
- Vergegenwaertigung, heuristisch → Grad 1.5
- Besinnung, illustrativ → Grad 2.5
- Besinnung, heuristisch → Grad 3

Wenn diese Felder nicht dokumentiert sind, erfolgt die Einstufung nach Materialtyp (bisherige Logik).

**Beispiel Mappe 4:**

| mat-ID | Typ | bildfunktion | material_charakter | Inferred Grad |
|---|---|---|---|---|
| mat-4-1 | darstellungstext | — | besinnung (Analyse der Strategie) | 2 |
| mat-4-2 | karte | illustrativ | vergegenwaertigung | 1 |
| mat-4-3 | tagebuch | — | vergegenwaertigung | 1 |
| mat-4-4 | karte | heuristisch (Schüler sollen Rückzug erkennen) | vergegenwaertigung | 1.5 |
| mat-4-5 | bildquelle | illustrativ | besinnung (Anker der Erkenntnis) | 2.5 |

Neuer Durchschnitt:
- 1. Hälfte: (2 + 1) / 2 = 1.5
- 2. Hälfte: (1 + 1.5 + 2.5) / 3 = 1.67

Ergebnis: 1.5 ≤ 1.67 → PASS (mit größerem Spielraum und fachdidaktischer Transparenz)
```

---

## 2. S8: Kontextgebot Quellenarbeit

### 2.1 Operationalisierungsdefinition

**Intention:** Quellentext- und Bildquellen-Materialien (Typ: quellentext, bildquelle) stehen NICHT an Position 1, es sei denn ihre didaktische Funktion ist `einstieg` mit reiner Problembegegnungs-Intention (kein Analyseauftrag). Vor jeder Quellenarbeit steht mindestens 1 kontextgebendes Material.

**Prueflogik:**
1. Identifiziere alle Materialien mit Typ `quellentext` oder `bildquelle` (heuristisch)
2. Für jedes solche Material an Position P:
   - Prüfe: Gibt es mindestens 1 Material an Position < P mit Typ ∈ {darstellungstext, zeitleiste, tagebuch}?
   - Ausnahme: Material hat `didaktische_funktion` = `einstieg` UND keinen Analyseauftrag
3. Erstelle Verletzungsliste
4. **FAIL wenn:** Quellenarbeit ohne vorheriges Kontextmaterial (und keine Einstiegs-Ausnahme)

### 2.2 Bewertung D1-D6

#### D1: Inputverfügbarkeit — **ROBUST**

**Befund:**
Das MATERIAL_GERUEST enthält:
- `Typ` (spalte 3) — verfügbar
- `didaktische_funktion` (aus Sequenzplan, nicht explicit in MATERIAL_GERUEST Tabelle, aber im Q-Gate-Protokoll)
- Material-Positionen (Zeilennummer = Position)

Das Feld `analyseauftrag` ist nicht explizit dokumentiert, aber kann aus der Sequenzplan-Beschreibung oder dem Material-Kontext (SCPL-Phase) inferred werden:
- Material in C- oder P-Phase mit Quellentyp → Analyse
- Material in S-Phase mit Quellentyp → Kontextgebendes oder einstieg

**Testfall Mappe 4:**
```
| # | mat-ID | Typ | Pos | Kontextmaterial vorher | Status |
|---|--------|-----|-----|------------------------|----|
| 1 | mat-4-1 | darstellungstext | 1 | — | Kontext-Material |
| 2 | mat-4-2 | karte | 2 | mat-4-1 (DT) | OK |
| 3 | mat-4-3 | tagebuch | 3 | mat-4-2 (Karte) | OK |
| 4 | mat-4-4 | karte | 4 | mat-4-3 (Tagebuch) | OK |
| 5 | mat-4-5 | bildquelle | 5 | mat-4-4 (Karte) | QUELLENARBEIT |

Für mat-4-5 (bildquelle):
- Position 5
- didaktische_funktion: sicherung (nicht einstieg)
- Kontextmaterialien vorher: mat-4-1, mat-4-2, mat-4-3, mat-4-4
- Von diesen: mat-4-1 (DT), mat-4-2 (Karte als Kontext), mat-4-3 (TB), mat-4-4 (Karte)
- ✓ Mindestens 1 Kontext-Material vorhanden (tatsächlich 4)

Ergebnis: PASS
```

**Bewertung D1:** ROBUST — Die notwendigen Felder (`Typ`, `didaktische_funktion`, Position) sind verfügbar. Nur `analyseauftrag` müsste explizit dokumentiert sein.

#### D2: Entscheidungsdeterminiertheit — **FRAGIL**

**Befund:**
Die Prueflogik ist formal deterministisch, aber die Klassifikation von "Analyseauftrag" ist NICHT deterministisch.

**Testfall Mappe 4 — mat-4-5 (Bildquelle):**

Die Operationalisierung definiert:
```
Ausnahme: Material hat `didaktische_funktion` = `einstieg` UND keinen Analyseauftrag
```

Aber was ist ein "Analyseauftrag"? Ist das:
1. **Ein expliziter Impulse im Material** ("Erkenne das Muster aus diesem Foto")?
2. **Die SCPL-Phase des Materials** (mat-4-5 ist in der P-Phase, also Analyse)?
3. **Die didaktische Funktion** ("sicherung" impliziert Synthese, nicht Analyse)?

**Interpretation A: Impulse-basiert**
```
mat-4-5 ist eine Bildquelle (Foto von Schützengraben).
Der Impulse könnte sein: "Vergleiche diesen Stellungskrieg mit dem geplanten Bewegungskrieg."
Das ist ein Analyseauftrag.

Aber dieser Impulse steht nicht im MATERIAL_GERUEST — er ist im konkreten Material-Text, nicht verfügbar.

Daher: Inputfeld `analyseauftrag` fehlt (D1-Problem).
```

**Interpretation B: SCPL-Phase-basiert**
```
mat-4-5 ist in der P-Phase (Problem: Stellungskrieg statt schneller Sieg).
P-Phase impliziert Problembegegnung, nicht Analyse.
Die Bildquelle zeigt das Problem konkret, fordert aber keine eigenständige Analyse.

Daher: Kein Analyseauftrag → Quellenarbeit ist OK ohne Ausnahme.
```

**Interpretation C: Funktion-basiert**
```
mat-4-5 hat didaktische_funktion = "sicherung".
Sicherung ist nicht dasselbe wie erarbeitung (Analyse).
Sicherung bedeutet: Ankerung einer bereits erarbeiteten Erkenntnis.

Daher: Kein Analyseauftrag → Quellenarbeit ist OK.
```

**Problem:** Alle drei Interpretationen sind plausibel, führen aber zu unterschiedlichen Ergebnissen.

**Bewertung D2:** FRAGIL — Das Konzept "Analyseauftrag" ist nicht operationalisiert. Die Entscheidung, ob ein Material "Quellenarbeit mit Analyseauftrag" ist, kann nicht deterministisch getroffen werden ohne zusätzliche Klassifikationsfelder.

#### D3: Grenzfall-Robustheit — **ROBUST**

**Grenzfall 1: Einstiegs-Bildquelle (Position 1)**
```
Material: Bildquelle mit didaktische_funktion = einstieg
Regel: Quellenarbeit an Position 1 ist OK, wenn keine Analyseauftrag

Logik: Unproblematisch. Bildquelle ohne Analyseauftrag ist problembegegnung (z.B. provokatives Foto).
```

**Grenzfall 2: Reines Quellentext-Set (3 Quellentext-Materialien hintereinander)**
```
Position 1: Quellentext (einstieg) — OK (Ausnahme)
Position 2: Quellentext (erarbeitung) — braucht Kontext
         Kontext: Position 1 (Quellentext, aber auch Quellentext-Kontext)
         Frage: Zählt Quellentext als "Kontextmaterial"?
         
Regel sagt: `{darstellungstext, zeitleiste, tagebuch}` sind Kontext-Typen.
Quellentext ist nicht included.

Aber sachlich: Position 1 (Quellentext als einstieg) KÖNNTE Kontext für Position 2 sein.

Grenzfall-Problem: Die Regel ist zu restriktiv.
```

**Grenzfall 3: Bildquelle illustrativ vs. heuristisch**
```
Eine Bildquelle kann:
- illustrativ sein (zeigt einen Sachverhalt, keine Analyse nötig)
- heuristisch sein (Schüler sollen Muster erkennen, also Analyse)

Die Regel unterscheidet nicht zwischen diesen.
Das ist aber relevant, weil:
- Illustrative BQ könnte auch ohne Kontext stehen (es zeigt ja nur)
- Heuristische BQ braucht Kontext (um Muster zu erkennen)
```

**Gesamteinschätzung:** Grenzfall 2 und 3 sind potenzielle Probleme, aber nicht kritisch für den Standard-Fall.

**Bewertung D3:** ROBUST — Die Logik funktioniert bei Standard-Sequenzen. Grenzfälle (Quellentext-Kaskaden, illustrativ vs. heuristisch) sind eher Verfeinerungen.

#### D4: Überlappungsfreiheit — **ROBUST**

**Befund:**
S8 ist orthogonal zu anderen Kriterien:
- **S1 (Artikulationsschema):** Definiert, welche Phasen in welcher Reihenfolge stattfinden. S8 reguliert nur die Positionierung von Quellenarbeit innerhalb dieser Phasen.
- **S2 (Vorwissen):** Definiert, welche Fachbegriffe verfügbar sein müssen. S8 definiert, dass Quellenarbeit Kontext-Material braucht. Kein Konflikt.
- **S3 (TB-Knoten-Abdeckung):** Definiert, welche Knoten abgedeckt sein müssen. S8 reguliert nur die Sequenzposition von Quellenarbeit.
- **S5 (Vergegenwärtigung vor Besinnung):** Bildquellen können both vergegenwärtigend (illustrativ) oder beson (heuristisch) sein. S8 reguliert nur, dass sie nicht ohne Kontext stehen.

**Keine echte Überlappung mit anderen SOLL/KANN-Kriterien.**

**Bewertung D4:** ROBUST — S8 ist orthogonal zu anderen Sequenzierungs-Kriterien.

#### D5: Nachbesserbarkeit — **ROBUST**

**Befund:**
Wenn S8 FAIL wird (Quellenarbeit ohne Kontext), ist die Nachbesserung einfach:
1. Kontextmaterial vor die Quellenarbeit verschieben
2. Oder die Quellenarbeit nach hinten verschieben
3. Oder beide Operationen kombinieren

Dies ist vollständig autonom durch AGENT_MATERIAL umsetzbar.

**Beispiel aus Mappe 4:**
Wenn mat-4-5 (Bildquelle) an Position 1 stünde (hypothetisch):
- mat-4-5 hat keine Ausnahme (didaktische_funktion = sicherung, nicht einstieg)
- Kein Kontextmaterial vorher
- S8 FAIL

Nachbesserung:
- Verschiebe mat-4-5 nach Position 5 (aktuell korrekt)
- Oder füge Kontext-Material (z.B. kurzer DT über Stellungskrieg) an Position 1 ein

Beide Lösungen sind umsetzbar.

**Bewertung D5:** ROBUST — Die Nachbesserung ist autonom möglich.

#### D6: Fachdidaktische Dichte — **ROBUST**

**Befund:**
Das "Kontextgebot" ist fachdidaktisch fundiert:

**Theoretischer Hintergrund:**
- Vorwissens-Prinzip (Bruner, Brunnhuber): Schüler verstehen Neues nur, wenn sie auf bestehendes Wissen zurückgreifen können.
- Quellenarbeit erfordert Interpretation, die ohne Kontext zu Interpretations-Chaos führt.
- Ein Darstellungstext, eine Zeitleiste oder ein Tagebuch bietet "Hintergrund", vor dem die Quelle lesbar wird.

**Beispiel Mappe 4:**
- mat-4-1 (DT) erklärt die Strategie des Schlieffen-Plans
- mat-4-5 (Bildquelle: Schützengraben-Foto) zeigt die Folge (Stellungskrieg)
- Ohne mat-4-1 wäre das Foto nur ein "Graben mit Soldaten"
- Mit mat-4-1 wird das Foto zu einem "Beweis des Scheiterns des Plans"

**Operationalisierungs-Qualität:**
Das Kriterium ist klar, ist fachdidaktisch begründet und ist operationalisierbar.

**Bewertung D6:** ROBUST — S8 hat hohe fachdidaktische Dichte und ist klar operationalisiert.

### 2.3 Testfall-Analyse Mappe 4

**Q-Gate Resultat (aus Zeile 175):**
```
| S8 | Kontextgebot Quellenarbeit | SOLL | PASS | 
    Kein Quellentext. BQ (Pos 5) hat 4 Kontextmaterialien vorangestellt.
```

**Verifizierung:**
```
Quellentext-Materialien: KEINE
Bildquelle-Materialien: mat-4-5 (Position 5)

Kontextmaterialien vor mat-4-5:
1. mat-4-1 (darstellungstext) ✓
2. mat-4-2 (karte) — ist das ein Kontextmaterial?
3. mat-4-3 (tagebuch) ✓
4. mat-4-4 (karte) — ist das ein Kontextmaterial?

Nach Regel: Kontextmaterialien sind ∈ {darstellungstext, zeitleiste, tagebuch}
→ mat-4-1 und mat-4-3 zählen explizit
→ mat-4-2 und mat-4-4 (Karten) zählen NICHT

Aber: Der Q-Gate-Prüfer hat "4 Kontextmaterialien" gezählt.

Das kann nur stimmen, wenn Karten als "Kontextmaterialien" mitgezählt werden.
Das ist NICHT in der Regel definiert.

Annahme: Der Q-Gate-Prüfer hat eine implizite Regel:
"Jedes Material, das vor Quellenarbeit steht, ist Kontext" (liberale Auslegung).
```

**Tatsächliches Urteil:** PASS (mit liberaler Auslegung der Kontextmaterial-Definition)

**Fachdidaktisches Urteil:** ROBUST. mat-4-5 hat absolut ausreichend Kontext (4 vorhergehende Materialien mit Kontextgehalt).

### 2.4 Grenzfälle

**Grenzfall 1: Bildquelle als einstieg (Position 1, keine Analyse)**
```
Position 1: Bildquelle (z.B. Kriegsfoto), didaktische_funktion = einstieg
Regel: OK, wenn kein Analyseauftrag

Frage: Wie wird "Analyseauftrag" erkannt?
Antwort (bislang): Nicht operationalisiert.
```

**Grenzfall 2: Quellentext-Kaskaden**
```
Position 1: Quellentext (einstieg)
Position 2: Quellentext (erarbeitung)

Regel: Position 2 braucht Kontext.
Kontext: Position 1 (Quellentext)
Frage: Zählt Quellentext als Kontext?
Antwort (bislang): NEIN (Regel sagt nur DT, ZL, TB)

Aber: Sachlich könnte Position 1 als Kontext für Position 2 dienen.
```

**Grenzfall 3: Bildquelle illustrativ OHNE Analyseauftrag**
```
Regel: Quellenarbeit braucht Kontext
Frage: Braucht illustrative Bildquelle (z.B. Landkarte) auch Kontext?

Antwort: Regel ist typ-basiert, nicht funktion-basiert.
→ Eine illustrative BQ wird gleich wie eine heuristische BQ behandelt
→ Beidemale wird Kontext verlangt
→ Das ist wahrscheinlich zu restriktiv (illustrative BQ kann auch alone stehen)
```

### 2.5 Gesamt-Urteil + Patch S8

**Urteil:** FRAGIL

**Defekte:**
- D2 FRAGIL: "Analyseauftrag" ist nicht operationalisiert
- D3 ROBUST (Standard), aber Grenzfälle (Quellentext-Kontext, illustrativ vs. heuristisch) nicht adäquat
- D6 ROBUST (fachdidaktisch fundiert)

**Patch-Vorschlag:**

```markdown
### Sektion 6 (GUETEKRITERIEN_SEQUENZIERUNG.md) — Ergänzung zu S8

**Verbesserte Operationalisierung:**

1. **Identifiziere Quellenarbeit-Materialien:**
   - Typ = quellentext ODER
   - Typ = bildquelle UND (didaktische_funktion ≠ einstieg ODER material_analyseauftrag = true)

2. **Für jedes Quellenarbeit-Material an Position P:**
   - Prüfe: ∃ Material an Position < P mit Typ ∈ {darstellungstext, zeitleiste, tagebuch} ODER (Typ = quellentext UND didaktische_funktion = einstieg) ODER (Typ = bildquelle UND material_charakter = illustrativ)?
   - Wenn JA: S8 PASS für dieses Material
   - Wenn NEIN und (didaktische_funktion ≠ einstieg oder material_analyseauftrag = true): S8 FAIL

3. **Neue Klassifikations-Felder (optional, für Genauigkeit):**
   - `material_analyseauftrag` ∈ {true, false}: Definiert, ob Material einen expliziten Analyse-Impuls hat
   - `material_charakter` ∈ {illustrativ, heuristisch, narrativ, analytisch}: Präzisiert die didaktische Funktion des Materials

**Beispiel Mappe 4:**

| mat-ID | Typ | Pos | didaktische_funktion | material_analyseauftrag | Quellenarbeit | Kontext vorher | S8-Status |
|---|---|---|---|---|---|---|---|
| mat-4-5 | bildquelle | 5 | sicherung | false | JA (sicherung impliziert keine Analyse, aber es ist Bildquelle) | mat-4-1 (DT), mat-4-3 (TB) | PASS |

Alternativ (liberale Auslegung):
| mat-4-5 | bildquelle | 5 | sicherung | false | NEIN (sicherung mit Bildquelle = Ankerung, keine Analyse) | — | PASS |
```

**Empfehlung:** Explizite Definition von `material_analyseauftrag` oder `material_charakter` hinzufügen, um D2 zu ROBUST zu machen.

---

## 3. S11: Materialtyp-Vielfalt

### 3.1 Operationalisierungsdefinition

**Intention:** Die Sequenz einer Mappe enthält mindestens 2 verschiedene Materialtypen.

**Prueflogik:**
```
len(set(materialtypen)) ≥ 2
```

**Kein FAIL möglich** — nur Empfehlung bei Monokultur.

### 3.2 Bewertung D1-D6

#### D1: Inputverfügbarkeit — **ROBUST**

**Befund:**
Das Feld `Typ` ist in Spalte 2 des MATERIAL_GERUEST verfügbar.

**Testfall Mappe 4:**
```
Materialtypen: darstellungstext, karte, tagebuch, bildquelle
Unique Typen: 4
len(set) = 4 ≥ 2 ✓
```

**Bewertung D1:** ROBUST — Das erforderliche Feld ist verfügbar.

#### D2: Entscheidungsdeterminiertheit — **ROBUST**

**Befund:**
Die Prueflogik ist trivial:
- Zähle die Anzahl unterschiedlicher Werte in der Spalte `Typ`
- Prüfe: ≥ 2?

Dies ist vollständig deterministisch.

**Bewertung D2:** ROBUST — Deterministische Zählung.

#### D3: Grenzfall-Robustheit — **ROBUST**

**Grenzfälle:**
```
1. Nur 1 Materialtyp: len(set) = 1 → Kein FAIL (nur Empfehlung)
2. Nur 2 Materialtypen: len(set) = 2 → PASS
3. 5+ Materialtypen: len(set) = 5 → PASS
```

Alle Fälle sind trivial.

**Bewertung D3:** ROBUST — Keine Grenzfall-Probleme.

#### D4: Überlappungsfreiheit — **ROBUST**

**Befund:**
S11 hat keine logische Verbindung zu anderen Kriterien. Es ist eine reine Vielfalt-Metrik.

**Bewertung D4:** ROBUST — Keine Überlappung.

#### D5: Nachbesserbarkeit — **ROBUST**

**Befund:**
Wenn S11 nicht erfüllt wird (nur 1 Materialtyp):
- Füge einen Material mit anderem Typ ein, oder
- Ersetze einen Material mit anderem Typ

Dies ist autonom umsetzbar.

**Bewertung D5:** ROBUST — Trivial nachbesserbar.

#### D6: Fachdidaktische Dichte — **FRAGIL**

**Befund:**
Das Kriterium "mindestens 2 Typen" ist didaktisch zu schwach:

**Beispiel 1: Monokultur mit 2 Typen**
```
Pos 1-5: DT, DT, DT, Zeitleiste, Zeitleiste
len(set) = 2 → PASS nach S11
Aber: Sehr monotone Sequenz, nur 2 Typen
Fachdidaktisch: Unbefriedigend
```

**Beispiel 2: Diverse, aber funktional redundant**
```
Pos 1: DT (erarbeitung)
Pos 2: DT (erarbeitung) — anderer Text, aber gleicher Typ und Funktion
Pos 3: Bildquelle (sicherung)
len(set) = 2 → PASS nach S11
Aber: DT-Redundanz
Fachdidaktisch: Suboptimal
```

**Problem:** S11 misst nur VIELFALT, nicht FUNKTIONALE DIVERSITÄT. Ein Kriterium wie "mindestens 1 visuelles Material + mindestens 1 narratives Material + mindestens 1 personalisiertes Material" wäre stärker.

**Bewertung D6:** FRAGIL — Das Kriterium ist zu schwach. Es zählt nur verschiedene Typen, nicht funktionale Komplementarität.

### 3.3 Testfall-Analyse Mappe 4

**Q-Gate Resultat (aus Zeile 178):**
```
| S11 | Materialtyp-Vielfalt | KANN | PASS | 
    4 verschiedene Typen (DT, Karte, Tagebuch, BQ).
```

**Verifizierung:**
```
Typen: darstellungstext, karte, tagebuch, bildquelle
Unique: 4 ≥ 2 ✓
```

**Urteil:** PASS (trivial)

**Fachdidaktisches Urteil:** Die Sequenz hat hohe Typ-Vielfalt. Aber das allein sagt nicht, ob die Typen FUNKTIONAL komplementär sind.

### 3.4 Grenzfälle

Keine nennenswerten Grenzfälle, da die Metrik trivial ist.

### 3.5 Gesamt-Urteil + Patch S11

**Urteil:** ROBUST (formal), aber **FACHDIDAKTISCH SCHWACH**

**Problem:**
Das Kriterium ist so minimal, dass es kaum einen Wert hat. Fast jede Mappe wird PASS.

**Alternative Formulierungen (Patches):**

**Option A (Nicht-Änderung):**
Behalte S11 wie ist. Es ist ein niedriger Mindeststandard, der selten verletzt wird.

**Option B (Staerkerer Standard):**
```
S11+: Funktionale Materialtyp-Diversität

Jede Mappe muss mindestens folgende funktionalen Typen enthalten:
1. Mindestens 1 narratives Material (DT, Zeitleiste, Tagebuch, Quellentext)
2. Mindestens 1 visuelles Material (Bildquelle, Karte, Statistik)
3. Mindestens 1 Material mit didaktischer Funktion erarbeitung
4. Mindestens 1 Material mit didaktischer Funktion sicherung

Beispiel Mappe 4:
- Narrativ: mat-4-1 (DT), mat-4-3 (TB) ✓
- Visuell: mat-4-2 (Karte), mat-4-4 (Karte), mat-4-5 (BQ) ✓
- Erarbeitung: mat-4-1, mat-4-2, mat-4-3, mat-4-4 ✓
- Sicherung: mat-4-5 ✓
→ S11+ PASS
```

**Empfehlung:** Behalte S11 wie ist (ist KANN-Kriterium) und ergänze optional S11+ für Mappen mit wenigen Materialien.

---

## 4. S12: Sprachregister-Progression

### 4.1 Operationalisierungsdefinition

**Intention:** Das Sprachregister der Materialien passt sich dem Themencharakter an und steigert sich progressiv: erfahrungsbezogen-narrativ → fachbegrifflich-analytisch → bilanzierend-urteilend.

**Prueflogik:**
```
Sprachregister der Materialien korreliert mit Themencharakter und steigt progressiv an 
(vgl. GUETEKRITERIEN_HEFTEINTRAG_ENTWURF Abschnitt 3.5).

Kein FAIL möglich — nur Dokumentation.
```

**Referenzen:**
- GUETEKRITERIEN_HEFTEINTRAG_ENTWURF Abschnitt 3.5 (nicht im Audit vorliegen)
- Empirie aus R3-Evaluation

### 4.2 Bewertung D1-D6

#### D1: Inputverfügbarkeit — **DEFEKT**

**Befund:**
Das MATERIAL_GERUEST enthält KEINE Informationen über:
- Sprachregister des Materials
- Register-Level (erfahrungsbezogen vs. fachbegrifflich vs. urteilend)
- Register-Kategorisierung

Das Dokument GUETEKRITERIEN_HEFTEINTRAG_ENTWURF Abschnitt 3.5 ist nicht in diesem Audit verfügbar.

**Testfall Mappe 4:**
```
| mat-ID | Typ | Register (INFERRED) |
|---|---|---|
| mat-4-1 | darstellungstext | Fachbegrifflich-analytisch (erklärende Sachtext) |
| mat-4-2 | karte | Visuell-deskriptiv (Legende, Labels) |
| mat-4-3 | tagebuch | Erfahrungsbezogen-narrativ (Soldaten-Perspektive) |
| mat-4-4 | karte | Visuell-analytisch (Pfeile, Bewegungen) |
| mat-4-5 | bildquelle | Visuell-konkret (Foto ohne Text) |
```

**Inferenz-Probleme:**
- Register ist nicht explizit dokumentiert
- Unterschied zwischen Tagebuch-Register und Bildquelle-Register ist unklar
- Visuelle Register sind nicht in der Skala definiert

**Bewertung D1:** DEFEKT — Das Feld `sprachregister` existiert nicht im MATERIAL_GERUEST. Die Referenz zu GUETEKRITERIEN_HEFTEINTRAG_ENTWURF ist nicht verfügbar/nicht nachvollziehbar.

#### D2: Entscheidungsdeterminiertheit — **DEFEKT**

**Befund:**
Ohne explizite Klassifikation des Sprachregisters kann die Progression NICHT deterministisch gemessen werden.

**Testfall Mappe 4:**
Zwei mögliche Interpretationen der Progression:

**Interpretation A (Register als Typ-Funktion):**
```
Pos 1: DT = erklärend, fachbegrifflich-analytisch
Pos 2: Karte = deskriptiv, visuell
Pos 3: Tagebuch = narrativ, erfahrungsbezogen
Pos 4: Karte = deskriptiv-analytisch, visuell
Pos 5: Bildquelle = konkret, visuell

Progression: Analytisch → Deskriptiv → Erfahrungsbezogen → Analytisch → Konkret

Das ist KEINE progressive Steigerung (zu chaotisch).
```

**Interpretation B (Register als Abstraktionsgrad):**
```
Pos 1-2: Fachbegrifflich-analytisch (DT, Karte mit Plan)
Pos 3: Erfahrungsbezogen-narrativ (Tagebuch)
Pos 4: Analytisch-visuell (Karte mit Strategie-Analyse)
Pos 5: Konkret-bildlich (Foto als Anker)

Progression: Analytisch → Narrativ → Analytisch → Konkret

Das ist auch KEINE progressive Steigerung.
```

**Tatsächliches Q-Gate Resultat (aus Zeile 179):**
```
| S12 | Sprachregister-Progression | KANN | PASS | 
    Narrativ-erklaerend → visuell-deskriptiv → personalisiert → visuell → ankernd.
```

**Analyse des Q-Gate-Urteils:**
Der Prüfer hat eine neue Kategorisierung eingeführt:
1. Narrativ-erklärend (mat-4-1: DT)
2. Visuell-deskriptiv (mat-4-2: Karte)
3. Personalisiert (mat-4-3: Tagebuch)
4. Visuell (mat-4-4: Karte)
5. Ankernd (mat-4-5: BQ)

**Das ist NICHT in der Standard-Operationalisierung definiert.**

Aber es ist nachvollziehbar, und es gibt eine Progression:
- Erklärung + Visualisierung → Personalisierung (Erfahrung) → Synthese (Ankerung)

**Problem:** Diese Kategorisierung wurde ad-hoc für diesen Fall erfunden. Sie ist nicht operationalisiert und nicht reproduzierbar.

**Bewertung D2:** DEFEKT — Die Operationalisierung ist so vage, dass jeder Prüfer eine andere Kategorisierung anwenden kann.

#### D3: Grenzfall-Robustheit — **FRAGIL**

**Grenzfall 1: Materialien ohne "Sprache" (z.B. reine Bilder)**
```
Bildquelle ohne Bildunterschrift: Wie wird das Register klassifiziert?
Statistik/Diagramm ohne Legende: Wie wird das Register klassifiziert?
```

**Grenzfall 2: Mehrsprachige Materialien**
```
Tagebuch in Originalsprache (alt-Deutsch): Wie wird das Register bewertet?
Quellentext mit moderner Erklärung: Welches Register zählt?
```

**Grenzfall 3: Register als "Ton" vs. "Ebene"**
```
Register = Ton (formal vs. informal)?
Register = Abstraktionsebene (konkret vs. abstrakt)?
Register = Audienzorientierung (Schüler vs. Fachpublikum)?

Die Operationalisierung unterscheidet nicht.
```

**Bewertung D3:** FRAGIL — Grenzfälle sind nicht adäquat behandelt.

#### D4: Überlappungsfreiheit — **FRAGIL**

**Überlappung mit S7 (Abstraktionsgrad):**

S7 misst: Abstraktionsgrad des Materials (1-4 Skala, Typ-basiert)
S12 misst: Sprachregister des Materials (erfahrungsbezogen → fachbegrifflich → urteilend)

Diese sind **stark korreliert**:
- Tagebuch = konkret (S7) und narrativ (S12)
- Quellentext = analytisch (S7) und fachbegrifflich/urteilend (S12)

**Problem:** Wenn ein Material das falsche Register hat, könnte es gegen S7 UND S12 verstoßen.

**Beispiel:**
```
Tagebuch mit sehr formaler, analytischer Sprache:
- S7: Material ist "konkret" (Typ tagebuch = 1)
- S12: Material sollte "narrativ" sein, ist aber "urteilend" → Widerspruch

Sollte man das Material als Quellentext einstufen statt Tagebuch?
Oder sollte man das Tagebuch Text rewrite, um narrativer zu sein?

Operationalisierung erlaubt keine klare Entscheidung.
```

**Überlappung mit S5 (Vergegenwärtigung vs. Besinnung):**

S5 unterscheidet:
- Vergegenwärtigung = narrative Charakter
- Besinnung = analytischer Charakter

S12 unterscheidet:
- Erfahrungsbezogen-narrativ
- Fachbegrifflich-analytisch
- Bilanzierend-urteilend

Diese sind QUASI-IDENTISCH. S12 ist eine Verfeinerung von S5.

**Problem:** Beide Kriterien messen die gleiche Dimension. Das ist redundant.

**Bewertung D4:** FRAGIL — S12 überlappt stark mit S7 und S5. Die Kriterien sind teilweise redundant.

#### D5: Nachbesserbarkeit — **FRAGIL**

**Befund:**
Die Nachbesserung einer Register-Progression ist NICHT einfach:

**Optionen:**
1. **Material-Text rewrite:** Ändere den Sprachton des Materials (z.B. Tagebuch mit narativerer Sprache). Das erfordert Subagenten-Dispatch und neue Text-Produktion.
2. **Material-Typ ändern:** Ersetze Tagebuch durch Quellentext. Das hat Konsequenzen für andere Kriterien (TB-Knoten-Abdeckung, Sequenzlogik).
3. **Sequenz-Umpositionierung:** Verschiebe Materialien, um andere Register-Progression zu erreichen.

**Problem:** Ohne explizite Register-Klassifikation kann der Agent nicht wissen, wie viel Text-Rewriting notwendig ist oder wie stark die Register-Progression ist.

**Bewertung D5:** FRAGIL — Die Nachbesserung ist möglich, aber erfordert neue Text-Produktion und ist nicht autonom ohne Subagenten-Dispatch.

#### D6: Fachdidaktische Dichte — **FRAGIL**

**Befund:**
Die Intention ("Sprachregister steigert sich progressiv") ist didaktisch sinnvoll, aber die Operationalisierung ist zu vage:

**Fachdidaktischer Kern:**
- Schüler brauchen am Anfang konkrete, narrative Erfahrung
- Dann gehören sie schrittweise zur Fachbegrifflichkeit und Analyse
- Am Ende können sie urteilen und synthetisieren

Das ist ein klassisches Modell der kognitiven Progression (Bruner, Piaget).

**Problem der Operationalisierung:**
- "Sprachregister" ist nicht klar definiert (Ton? Abstraktionsebene? Audienz?)
- Die Kategorien (erfahrungsbezogen → fachbegrifflich → urteilend) sind nicht orthogonal zu anderen Kriterien
- Die Messung ist subjektiv (jeder Prüfer würde anders kategorisieren)

**Bewertung D6:** FRAGIL — Der fachdidaktische Kern ist sound, aber die Operationalisierung ist unzureichend.

### 4.3 Testfall-Analyse Mappe 4

**Q-Gate Resultat (aus Zeile 179):**
```
| S12 | Sprachregister-Progression | KANN | PASS | 
    Narrativ-erklaerend → visuell-deskriptiv → personalisiert → visuell → ankernd.
```

**Verifizierung mit Standard-Kategorisierung:**
```
Pos 1: DT → "Narrativ-erklärend" (Sachtext mit Erklärung)
Pos 2: Karte → "Visuell-deskriptiv" (Visualisierung ohne Analyse)
Pos 3: Tagebuch → "Personalisiert" (individuelle Erfahrung)
Pos 4: Karte → "Visuell" (Visualisierung, etwas analytisch)
Pos 5: BQ → "Ankernd" (Realitäts-Anker, synthetisierend)

Progression: Erklärung → Visualisierung → Erfahrung → Synthese

Das ist eine intuitive Progression, aber:
- Pos 1-2: Kognitiv höher (Erklärung, Analyse)
- Pos 3: Kognitiv mittler (Erfahrung, Narrative)
- Pos 4-5: Kognitiv wieder höher (Synthese)

Das ist also NICHT "progressiv im Sinne von ansteigend", sondern eher "U-förmig" oder "zyklisch".
```

**Urteil des Q-Gate-Prüfers:** PASS

**Interpretation:** Der Prüfer hat die Progression als "narrativ-erklärend am Anfang, dann Personalisierung und Visualisierung, dann Ankerung am Ende" verstanden. Das ist akzeptabel als Progression.

**Fachdidaktisches Urteil:** Die Progression ist nachvollziehbar, aber nicht im klassischen Sinne "von konkret zu abstrakt".

### 4.4 Grenzfälle

**Grenzfall 1: Rein visuelle Mappe (keine Texte)**
```
Pos 1-5: Bildquellen, Karten, Statistiken (keine DT, keine Quellentext)

Wie wird das Register klassifiziert?
Visuell-konkret → Visuell-deskriptiv → Visuell-analytisch?

Das ist eine mögliche Progression, aber nicht in der Operationalisierung vorgesehen.
```

**Grenzfall 2: Quellentext-schwere Mappe**
```
Pos 1: Quellentext (einstieg)
Pos 2-5: Quellentext, Quellentext, Quellentext, DT

Alle Quellentexte haben vermutlich ähnliches Register (urteilend, analytisch).
Wo ist die Register-Progression?

Antwort: Nicht vorhanden. Die Mappe ist register-homogen.

S12 würde das als FAIL bewerten (wenn es ein FAIL-Kriterium wäre).
Aber S12 ist KANN-Kriterium, also nur Empfehlung.
```

### 4.5 Gesamt-Urteil + Patch S12

**Urteil:** DEFEKT

**Defekte:**
- D1 DEFEKT: Feld `sprachregister` existiert nicht
- D2 DEFEKT: Operationalisierung ist zu vage für deterministische Bewertung
- D3 FRAGIL: Grenzfälle nicht adäquat
- D4 FRAGIL: Überlappung mit S7, S5
- D5 FRAGIL: Nachbesserung erfordert Text-Rewriting
- D6 FRAGIL: Fachdidaktischer Kern sound, aber Operationalisierung schwach

**Patch-Vorschlag (Option A: Minimal):**

```markdown
### Sektion 6 (GUETEKRITERIEN_SEQUENZIERUNG.md) — Ergänzung/Überarbeitung zu S12

**Revidierte Operationalisierung:**

S12 ist OPTIONAL und DOKUMENTARISCH. Es gibt keine PASS/FAIL-Entscheidung.

**Register-Kategorien (explizit):**

Für jedes Material wird das Sprachregister einer der folgenden Kategorien zugeordnet:

| Register | Definition | Beispiel-Materialtypen |
|---|---|---|
| Erfahrungsbezogen-narrativ | Unmittelbare Erfahrung, Erzählung, subjektive Perspektive | Tagebuch, Brief, Interview |
| Sachlich-informativ | Vermittlung von Information, erklärend, neutral | Darstellungstext, Zeitleiste |
| Fachbegrifflich-analytisch | Verwendung von Fachbegriffen, Analyse, Struktur-Fokus | Quellentext mit Analyseauftrag, analytische Bildquelle |
| Visuell-konkret | Bilder, Karten, Diagramme ohne Text | Bildquelle, Karte, Statistik |
| Bilanzierend-urteilend | Synthese, Bewertung, Reflexion | Sicherungs-Material, Transfer-Material |

**Progressions-Erwartung:**

Die ideale Progression einer Mappe sollte sein:
```
Sachlich-informativ → Erfahrungsbezogen-narrativ → Fachbegrifflich-analytisch → Bilanzierend-urteilend
```

Aber: Das ist keine starre Regel. Register können sich überschneiden, und Visualisierungen können überall stehen.

**Dokumentation statt Prüfung:**

Für den Sequenzplan dokumentiere die Register-Progression in einer Spalte:

| mat-ID | Typ | didaktische_funktion | sprachregister | Bemerkung |
|---|---|---|---|---|
| mat-4-1 | darstellungstext | erarbeitung | sachlich-informativ | Erklärt die Strategie |
| mat-4-2 | karte | erarbeitung | visuell-konkret | Visualisiert den Plan |
| mat-4-3 | tagebuch | erarbeitung | erfahrungsbezogen-narrativ | Soldaten-Perspektive |
| mat-4-4 | karte | erarbeitung | visuell-analytisch | Zeigt Flankenattacke und Rückzug |
| mat-4-5 | bildquelle | sicherung | visuell-bilanzierend | Foto als Realitäts-Anker |

**Bewertung (dokumentarisch, kein FAIL):**

Die Progression in Mappe 4 ist:
```
Sachlich-informativ → Visuell-konkret → Erfahrungsbezogen-narrativ → Visuell-analytisch → Visuell-bilanzierend
```

Das zeigt eine Mischung aus Informationsvermittlung, Erfahrung und Visualisierung. Nicht linear progressiv, aber funktional sinnvoll: Erklärung → Veranschaulichung → Personalisierung → Analyse → Synthese.

**Kein FAIL möglich.** S12 bleibt KANN-Kriterium mit dokumentarischem Charakter.
```

**Empfehlung:** Behalte S12 als KANN-Kriterium mit expliziter Register-Kategorisierung. Keine Umwandlung in MUSS-Kriterium, da die Operationalisierung zu weich ist.

**Alternative (Option B: Zusammenführung mit S7):**

Erwäge, S12 vollständig in S7 zu integrieren. S7 könnte dann "Vom Anschaulichen zum Abstrakten (inkl. Register-Progression)" heißen.

---

## 5. S13: Personalisierung in Früphase

### 5.1 Operationalisierungsdefinition

**Intention:** Mindestens 1 Material in der ersten Sequenzhalfte hat einen personalisierten Zugang (individuelle Perspektive, Identifikationsfigur, Tagebuch, Brief).

**Prueflogik:**
```
Mindestens 1 Material in Position 1 bis ⌈N/2⌉ hat Typ `tagebuch` 
ODER Materialinhalt mit individueller Perspektive/Identifikationsfigur.

Kein FAIL möglich — nur Empfehlung.
```

### 5.2 Bewertung D1-D6

#### D1: Inputverfügbarkeit — **FRAGIL**

**Befund:**
Das MATERIAL_GERUEST enthält:
- `Typ` (verfügbar)
- Position (Zeilennummer)
- Mappen-Größe (abzählbar aus Zeilen)

Das MATERIAL_GERUEST enthält NICHT:
- Ein Feld `personalisiert` (true/false)
- Ein Feld `identifikationsfigur` (ja/nein, wen?)
- Ein Feld `perspektive` (omniscient, ich-erzaehler, dritt-person?)

**Testfall Mappe 4:**
```
N = 5 Materialien
Erste Hälfte = Position 1 bis ⌈5/2⌉ = 3

| # | mat-ID | Typ | Pos | Personalisiert? | Identifikationsfigur |
|---|--------|-----|-----|---|---|
| 1 | mat-4-1 | darstellungstext | 1 | NEIN (Sachtext, keine Perspektive) | — |
| 2 | mat-4-2 | karte | 2 | NEIN (Visualisierung, keine Perspektive) | — |
| 3 | mat-4-3 | tagebuch | 3 | JA (Soldaten-Tagebuch) | Soldaten (Infanterist) |
| 4 | mat-4-4 | karte | 4 | NEIN | — |
| 5 | mat-4-5 | bildquelle | 5 | NEIN | — |

Ergebnis: mat-4-3 ist personalisiert und in der ersten Hälfte (Pos 3 ≤ 3) ✓
→ S13 PASS
```

**Problem:** Die Identifikation "ist mat-4-3 personalisiert" erfolgt anhand des Typs (tagebuch), nicht anhand expliziter Metadaten. Das ist fraglich bei Hybrid-Materialien.

**Beispiel-Problem:**
```
Quellentext-Material: "Ich, der Soldat, schreibe diesen Brief..."
Typ: quellentext (nicht tagebuch)
Aber: Hat eine Identifikationsfigur (Soldat mit Ich-Perspektive)

Sollte das als "personalisiert" zählen?
Die Operationalisierung sagt nur: "Typ tagebuch ODER individueller Perspektive"

Das "ODER" ist subjektiv (wann ist Perspektive "individuell"?).
```

**Bewertung D1:** FRAGIL — Der Typ `tagebuch` ist verfügbar, aber die Klassifikation "ist Material personalisiert?" ist nur fallweise anhand des Typs, fallweise anhand von Text-Inhalt zu beurteilen.

#### D2: Entscheidungsdeterminiertheit — **FRAGIL**

**Befund:**
Die Prueflogik ist formal deterministisch (zähle personalisierten Materialien in Position ≤ N/2), aber die Klassifikation "ist Material personalisiert?" ist NICHT deterministisch.

**Testfall Mappe 4:**
```
mat-4-3: Typ = tagebuch → eindeutig personalisiert (Typ-basiert)
mat-4-1: Typ = darstellungstext, aber mit Sätzen wie "Die Generäle vertrauten..."
      → Könnte als "objektivierend" oder "perspektiviert" interpretiert werden

Frage: Zählt mat-4-1 als personalisiert, wenn es aus einer abstrakten Perspektive erzählt,
aber die Gedanken/Gefühle der Generäle vermittelt?

Antwort: Operationalisierung ist unklar.
```

**Bewertung D2:** FRAGIL — Die Klassifikation hängt von der Text-Analyse ab, die nicht operationalisiert ist.

#### D3: Grenzfall-Robustheit — **FRAGIL**

**Grenzfall 1: Tagebuch-Ähnliches (z.B. historischer Brief oder Interview-Transskript)**
```
Material: Historischer Brief eines Soldaten (Typ: quellentext)
Identifikationsfigur: Ja (Soldat mit Namen und Perspektive)
Frage: Zählt das als personalisiert?

Operationalisierung sagt: Typ tagebuch ODER individueller Perspektive
→ Ja, sollte zählen

Aber: Material ist nicht vom Typ tagebuch
→ Klassfizierung hängt von Text-Analyse ab ("ist es individuell"?)
```

**Grenzfall 2: Sehr kleine Mappe (2 Materialien)**
```
N = 2
Erste Hälfte = Position 1 bis ⌈2/2⌉ = 1

Pos 1: DT (nicht personalisiert)
Pos 2: Tagebuch (personalisiert)

Ergebnis: Kein personalisiertes Material in der ersten Hälfte → S13 FAIL?

Aber: Bei nur 2 Materialien ist die "Früphase" sehr kurz. Ist das Kriterium noch sinnvoll?
```

**Grenzfall 3: Mehrere personalisierte Materialien**
```
Pos 1: Tagebuch (personalisiert)
Pos 2: Quellentext mit Ich-Perspektive (personalisiert)
Pos 3: DT (nicht personalisiert)

S13 prüft nur: Mindestens 1 personalisiert in Früphase?
→ Ja, Pos 1 ✓ PASS

Aber: Zwei Personalisierungen übereinander könnte übertrieben sein.
Operationalisierung hat da keine Obergrenze.
```

**Bewertung D3:** FRAGIL — Grenzfälle (kleine Mappen, Nicht-Tagebuch-Personalisierungen, Hybrid-Typen) sind nicht adäquat behandelt.

#### D4: Überlappungsfreiheit — **FRAGIL**

**Überlappung mit S5 (Vergegenwärtigung vor Besinnung):**

S5 sagt: Vergegenwärtigung (narrative, anschaulich) vor Besinnung (analytisch).
S13 sagt: Personalisierung in der Früphase.

**Zusammenhang:** Personalisierte Materialien (Tagebuch, Brief mit Ich-Perspektive) sind TYPISCHERWEISE Vergegenwärtigungsmaterialien.

**Problem:** S13 überlappiert mit S5:
- Tagebuch ist immer Vergegenwärtigung (S5) und immer personalisiert (S13)
- Ein Quellentext kann Besinnung sein (S5) und trotzdem personalisiert (wenn Ich-Perspektive)

**Beispiel-Konflikt:**
```
Material: Quellentext-Brief eines Soldaten ("Ich frage mich, was meine Taktik war...")
- S5 würde das als "Besinnung" klassifizieren (Analyse)
- S13 würde das als "personalisiert" klassifizieren (Ich-Perspektive)

Das ist kein logischer Konflikt, aber es zeigt, dass die Dimensionen nicht orthogonal sind.
```

**Überlappung mit S12 (Sprachregister):**

S12 befasst sich mit "erfahrungsbezogen-narrativ" Register.
S13 befasst sich mit Personalisierung.

Diese sind **korreliert, aber nicht identisch:**
- Tagebuch ist personalisiert und hat erfahrungsbezogen-narratives Register (beide)
- Quellentext mit Ich-Perspektive ist personalisiert, aber kann fachbegrifflich-analytisches Register haben (Konflikt)

**Bewertung D4:** FRAGIL — S13 überlappt mit S5 und S12. Die Dimensionen sind nicht orthogonal.

#### D5: Nachbesserbarkeit — **ROBUST**

**Befund:**
Wenn S13 nicht erfüllt wird (kein personalisiertes Material in Früphase):
1. Füge ein Tagebuch-Material in die Früphase ein, oder
2. Umpositioniere bestehendes Tagebuch in die Früphase

Beide Operationen sind autonom möglich.

**Beispiel aus Mappe 4:**
Wenn mat-4-3 (Tagebuch) an Position 4 stünde (hypothetisch):
- Erste Hälfte = Pos 1-2.5
- mat-4-3 ist in Pos 4 > 2.5 → S13 FAIL
- Nachbesserung: Verschiebe mat-4-3 auf Pos 2 oder 3

Das ist möglich, hätte aber Konsequenzen für TB-Knoten-Abhängigkeiten.

**Bewertung D5:** ROBUST — Die Nachbesserung ist autonom möglich.

#### D6: Fachdidaktische Dichte — **ROBUST**

**Befund:**
Das Kriterium "Personalisierung in Früphase" ist fachdidaktisch fundiert:

**Theoretischer Hintergrund:**
- Roth (Personalisierung): Schüler lernen besser, wenn sie sich mit Personen identifizieren können
- Vergegenwärtigungsprinzip: Konkrete, menschliche Perspektiven sind ein Anker für Verständnis
- Lernpsychologie: Early engagement mit interessanten, personalisierten Inhalten erhöht Motivation

**Fachdidaktische Relevanz:**
Die "Früphase" ist strategisch wichtig, weil Schüler dort "abgeholt" werden sollten (Aktivierungsprinzip).

Ein personalisiertes Material (z.B. Tagebuch) am Anfang schafft emotionale Verbindung und Neugier.

**Beispiel Mappe 4:**
- Pos 1: DT erklärt Strategie (kognitiv)
- Pos 2: Karte zeigt Plan (kognitiv)
- Pos 3: Tagebuch personalisiert (emotional, motivierend)

Die Personalisierung am Anfang (Pos 3 < 3) ist didaktisch sinnvoll: Schüler verstehen erst den Plan, dann erleben sie ihn durch eine Soldaten-Perspektive.

**Bewertung D6:** ROBUST — Das Kriterium ist fachdidaktisch fundiert.

### 5.3 Testfall-Analyse Mappe 4

**Q-Gate Resultat (aus Zeile 180):**
```
| S13 | Personalisierung in Fruehphase | KANN | PASS | 
    mat-4-3 (Tagebuch) an Pos 3 = erste Haelfte.
```

**Verifizierung:**
```
N = 5
Erste Hälfte = Position 1 bis ⌈5/2⌉ = 3

mat-4-3: Position 3, Typ tagebuch
→ Personalisiert? JA (Typ = tagebuch)
→ In Früphase? JA (Pos 3 = ⌈5/2⌉)

Ergebnis: S13 PASS
```

**Urteil:** PASS (korrekt)

**Fachdidaktisches Urteil:** Die Personalisierung am Anfang ist motivierend und sinnvoll. Das Material "humanisiert" die abstrakten Konzepte des Plans.

### 5.4 Grenzfälle

**Grenzfall 1: Quellentext mit Ich-Perspektive**
```
Material: Historischer Soldaten-Brief ("Ich, Heinrich Schmidt, schreibe diesen Brief nach unserem Marsch...")
Typ: quellentext (nicht tagebuch)

Frage: Zählt das als "personalisiert"?
Operationalisierung sagt: Typ tagebuch ODER "individueller Perspektive"

Das "ODER" ist subjektiv. Das Material hat Ich-Perspektive, sollte also zählen.
Aber: Nur, wenn das Material als quellentext typisiert und die Ich-Perspektive in Beschreibungen dokumentiert ist.

Das ist NICHT automatisch erkennbar.
```

**Grenzfall 2: Tagebuch mit generalisierter Perspektive**
```
Material: "Das Tagebuch eines Soldaten: Licht und Schatten des Krieges"
Typ: tagebuch

Aber: Der Text ist hochgradig verallgemeinert ("Man denkt über die Zukunft nach...").

Ist das immer noch personalisiert?
Typ-basiert: JA (Typ = tagebuch)
Inhalt-basiert: Fragwürdig (Verallgemeinerung, nicht echte Individuation)

Das ist ein Problem der Operationalisierung: Sie vertraut zu sehr auf den Typ.
```

**Grenzfall 3: Sehr kleine Mappe**
```
N = 2
Erste Hälfte = Position 1

Pos 1: DT (nicht personalisiert)
Pos 2: Tagebuch (personalisiert)

S13 FAIL (kein personalisiertes Material an Pos 1)

Aber: Bei nur 2 Materialien ist die Anwendung des Kriteriums fragwürdig.
Sollte es ein Mindestschwellwert (z.B. N ≥ 3) geben?
```

### 5.5 Gesamt-Urteil + Patch S13

**Urteil:** FRAGIL

**Defekte:**
- D1 FRAGIL: Klassifikation "ist personalisiert" ist nur typ-basiert, nicht explizit dokumentiert
- D2 FRAGIL: Nicht-Tagebuch-Personalisierungen sind subjektiv zu bewerten
- D3 FRAGIL: Grenzfälle (kleine Mappen, Quellentext mit Ich-Perspektive, tagebuch-ähnliche Quellen) nicht adäquat
- D4 FRAGIL: Überlappung mit S5, S12
- D5, D6 ROBUST

**Patch-Vorschlag:**

```markdown
### Sektion 6 (GUETEKRITERIEN_SEQUENZIERUNG.md) — Ergänzung zu S13

**Neues Klassifikations-Feld: `personalisiert`**

Für jedes Material in der Sequenzplan-Tabelle: Dokumentiere, ob es personalisiert ist.

| Material-ID | Typ | didaktische_funktion | personalisiert | Identifikationsfigur | Bemerkung |
|---|---|---|---|---|---|
| mat-4-1 | darstellungstext | erarbeitung | NEIN | — | Sachtext, keine Perspektive |
| mat-4-2 | karte | erarbeitung | NEIN | — | Visualisierung, keine Perspektive |
| mat-4-3 | tagebuch | erarbeitung | JA | Infanterist (namentlich oder allgemein?) | Soldaten-Perspektive |
| ... | ... | ... | ... | ... | ... |

**Kriterium-Definition:**

Ein Material ist personalisiert, wenn:
1. Typ = tagebuch ODER
2. Material eine einzelne, benannte Identifikationsfigur hat (z.B. "Soldat Heinrich", "Die Krankenschwester Anna") ODER
3. Material eine Ich-Perspektive oder Du-Perspektive hat (nicht "man" oder passive Form) ODER
4. Material zeigt die Gedanken, Gefühle, oder Dilemmas einer Einzelperson

**Operationalisierung für S13-Prüfung:**

1. Identifiziere alle personalisierten Materialien (anhand obiger Definition)
2. Bestimme Positionen dieser Materialien
3. Prüfe: ∃ mindestens 1 personalisiertes Material in Position 1 bis ⌈N/2⌉?
4. Wenn JA: S13 PASS
5. Wenn NEIN und N ≥ 3: S13 FAIL (Empfehlung: Personalisiertes Material in Früphase einfügen)
6. Wenn NEIN und N < 3: S13 NEUTRAL (Kriterium nicht anwendbar bei sehr kleinen Mappen)

**Beispiel Mappe 4:**

| mat-ID | Typ | personalisiert | Position | In Früphase (≤3)? |
|---|---|---|---|---|
| mat-4-1 | darstellungstext | NEIN | 1 | N/A |
| mat-4-2 | karte | NEIN | 2 | N/A |
| mat-4-3 | tagebuch | JA | 3 | JA ✓ |
| mat-4-4 | karte | NEIN | 4 | N/A |
| mat-4-5 | bildquelle | NEIN | 5 | N/A |

Ergebnis: S13 PASS (mat-4-3 ist personalisiert und in Position 3 ≤ 3)

**Mindestschwelle:**

S13 wird nur angewandt, wenn N ≥ 3. Bei N < 3 ist das Kriterium nicht aussagekräftig.
```

**Empfehlung:** Explizites Feld `personalisiert` in Sequenzplan-Tabelle einfügen. Dann ist D1 ROBUST und D2 DETERMINISTISCH.

---

## Cluster-Analyse: Klassifikations-Lücken im MATERIAL_GERUEST

### 6.1 Synthese der Defekte

Alle 5 Kriterien (S7, S8, S11, S12, S13) haben ein gemeinsames Problem: Sie hängen davon ab, dass Materialtypen nach feingranularen Klassifikationen eingeteilt sind. Aber das MATERIAL_GERUEST enthält nur:
- `Typ` (z.B. darstellungstext, karte, tagebuch, bildquelle, quellentext)
- `didaktische_funktion` (z.B. einstieg, erarbeitung, sicherung)

Es fehlen:
1. **`bildfunktion` {illustrativ, heuristisch}** — für S5, S7, S8
2. **`material_charakter` {vergegenwaertigung, besinnung, analytisch}** — für S5, S7, S12
3. **`personalisiert` {true, false}** — für S13
4. **`sprachregister` {erfahrungsbezogen, sachlich, fachbegrifflich, urteilend}** — für S12
5. **`analyseauftrag` {true, false}** — für S8
6. **`identifikationsfigur` {string, z.B. "Infanterist"}** — für S13

### 6.2 Kosten-Nutzen-Analyse

| Klassifikations-Feld | Nutzen | Kosten | Priorität | Empfehlung |
|---|---|---|---|---|
| `bildfunktion` | HOCH (hilft S5, S7, S8 werden robust) | MITTEL (manuell pro Material, aber einfach) | 1 (höchste) | MUSS hinzufügen |
| `material_charakter` | HOCH (hilft S5, S7 werden robust) | MITTEL (manuell, aber klar definierbar) | 1 (höchste) | MUSS hinzufügen |
| `personalisiert` | MITTEL (hilft S13 robust) | NIEDRIG (einfach: ja/nein) | 2 | SOLLTE hinzufügen |
| `sprachregister` | MITTEL (hilft S12 dokumentieren) | HOCH (subjektiv, erfordert Text-Analyse) | 3 | KANN hinzufügen (optional) |
| `analyseauftrag` | MITTEL (hilft S8 robust) | NIEDRIG (einfach: ja/nein) | 2 | SOLLTE hinzufügen |
| `identifikationsfigur` | NIEDRIG (nur wenn `personalisiert = true`) | NIEDRIG (Text-Info) | 3 | OPTIONAL |

### 6.3 Abstraktionsgrad-Skala (S7): Validierungstest

Die aktuelle Skala in S7:
```
1 (konkret): bildquelle, tagebuch
2 (narrativ): darstellungstext, zeitleiste
3 (analytisch): quellentext
4 (abstrakt): Begriffsarbeit, Strukturdiagramm
```

**Test mit Mappe 4:**

| Kriterium | Typ | Aktuell | Mit `bildfunktion` | Mit `material_charakter` | Empfehlung |
|---|---|---|---|---|---|
| mat-4-1 | darstellungstext | 2 | 2 | 2 (erklärt, analytisch) | 2 ✓ |
| mat-4-2 | karte | 1 | 1 (illustrativ) | 1 (vergegenwaertigung) | 1 ✓ |
| mat-4-3 | tagebuch | 1 | — | 1 (vergegenwaertigung) | 1 ✓ |
| mat-4-4 | karte | 1 | 2 (heuristisch) | 2 (besinnung/analyse) | 2 (besser) |
| mat-4-5 | bildquelle | 1 | 1 (illustrativ) | 2.5 (sicherung/ankernd) | 2-2.5 (besser) |

**Validierungs-Ergebnis:**
```
Mit nur Typ-basierter Klassifikation:
1. Hälfte: (2+1) / 2 = 1.5
2. Hälfte: (1+1+1) / 3 = 1.0
→ PASS (aber knapp an Grenzwert)

Mit `bildfunktion` + `material_charakter`:
1. Hälfte: (2+1) / 2 = 1.5
2. Hälfte: (1+2+2.5) / 3 = 1.83
→ PASS (mit größerem Margin)

Mit refinement:
mat-4-4 von 1 auf 2: Verdeutlicht die Analyse-Funktion (Flankenattacke erkennen)
mat-4-5 von 1 auf 2.5: Verdeutlicht die synthetisierende Funktion

Verbesserter Durchschnitt (2. Hälfte): 1.83 statt 1.0 → Besseres Verständnis
```

**Fazit:** Die Abstraktionsgrad-Skala (1-4) ist VALIDE, aber GROB. Mit zusätzlichen Klassifikationsfeldern wird sie PRÄZISER.

### 6.4 Interdependenzen zwischen S7, S8, S11, S12, S13

**Struktur des Clusters:**

```
         S5 (Vergegenw. v. Besinnung)
          ↑
          |
        [Kern: Material-Charakter]
          |
    ┌─────┴─────────┬──────────┐
    |               |          |
   S7            S12         S13
(Abstraktung) (Register)  (Personalisierung)
    |               |          |
    └─────┬─────────┴──────────┘
          ↓
       [Feld: bildfunktion, 
        material_charakter,
        personalisiert]
          |
         S8 (Kontextgebot)
```

**Abhängigkeiten:**
- S5, S7, S12, S13 alle hängen von der Klassifikation eines Materials ab (Charakter, Register, Personalisierung)
- S8 hängt von S7 teilweise ab (Quellenarbeit = analytisch)
- S11 ist unabhängig (nur Zählung verschiedener Typen)

**Folge:** Wenn man S7 robust macht (mit `bildfunktion`, `material_charakter`), werden auch S5, S8, S12 robuster.

### 6.5 S12 vs. S7: Zusammenführungs-Überlegung

**Frage:** Sollte S12 in S7 aufgelöst werden?

**Argumente für Zusammenführung:**
- S7 misst Abstraktionsgrad (1-4 Skala)
- S12 misst Sprachregister (erfahrungsbezogen → fachbegrifflich → urteilend)
- Beide messen im Grunde die gleiche Dimension (konkret → abstrakt)
- Eine kombinierte Operationalisierung wäre eleganter

**Argumente gegen Zusammenführung:**
- S7 ist ein SOLL-Kriterium (PASS/FAIL)
- S12 ist ein KANN-Kriterium (dokumentarisch)
- Sie sind in unterschiedlichen Kategorisierungen ausgedrückt
- Eine Zusammenführung könnte zu FAIL-Entscheidungen führen, die nicht notwendig sind

**Empfehlung:** Behalte S7 und S12 separate, aber **verlinke sie explizit**. In der Operationalisierung:
```
S7 [SOLL, formal]: Misst Abstraktionsgrad pro Typ (1-4 Skala)
S12 [KANN, dokumentarisch]: Dokumentiert Sprachregister-Progression (erfahrungsbezogen → urteilend)

Hinweis: S7 und S12 messen teilweise die gleiche Dimension. 
Eine Mappe, die S7 erfüllt, sollte auch ein plausibles S12-Muster zeigen.
```

---

## 7. Empfehlungen: Priorisierte Massnahmen

### 7.1 KRITISCH (Implementierung notwendig)

**1. Klassifikations-Felder in MATERIAL_GERUEST hinzufügen**

**Felder:**
- `bildfunktion` {illustrativ, heuristisch} — nur für Typ ∈ {bildquelle, karte, statistik}
- `material_charakter` {vergegenwaertigung, besinnung} — für alle Typen
- `personalisiert` {true, false} — für alle Typen
- `analyseauftrag` {true, false} — für Typ ∈ {quellentext, bildquelle}

**Aufwand:** 5-10 Minuten pro Mappe (manuell, aber einfach)

**Impact:** D1, D2 werden ROBUST für S7, S8, S13

**Template:**

```markdown
| # | mat-ID | Typ | didaktische_funktion | bildfunktion | material_charakter | personalisiert | analyseauftrag | TB-Knoten |
|---|--------|-----|----------------------|---|---|---|---|---|
| 1 | mat-4-1 | darstellungstext | erarbeitung | — | besinnung | false | false | k4-1, k4-2, k4-3 |
| 2 | mat-4-2 | karte | erarbeitung | illustrativ | vergegenwaertigung | false | false | k4-1, k4-4 |
| 3 | mat-4-3 | tagebuch | erarbeitung | — | vergegenwaertigung | true | false | k4-4 |
| 4 | mat-4-4 | karte | erarbeitung | heuristisch | besinnung | false | true | k4-5 |
| 5 | mat-4-5 | bildquelle | sicherung | illustrativ | besinnung | false | false | k4-6 |
```

### 7.2 HOCH (Operationalisierung verbessern)

**2. S7-Operationalisierung mit Klassifikationsfeldern erweitern**

**Änderung:**
- Aktuelle Logik bleibt, aber mit expliziter Berücksichtigung von `bildfunktion` und `material_charakter`
- Abstraktionsgradberechnung wird damit deterministisch

**3. S8-Operationalisierung präzisieren**

**Änderung:**
- Definiere klar, was "Analyseauftrag" ist
- Nutze `analyseauftrag`-Feld zur Bestimmung von Quellenarbeit
- Erlauben Sie illustrative Bildquellen ohne Kontext (optional)

**4. S13-Operationalisierung mit `personalisiert`-Feld verknüpfen**

**Änderung:**
- Prüfe nur Materialien mit `personalisiert = true`
- Mindestschwellwert: N ≥ 3

### 7.3 MITTEL (Optional, für Transparenz)

**5. S12-Operationalisierung mit Kategorie-Tabelle erweitern**

**Änderung:**
- Definiere explizit die Register-Kategorien (erfahrungsbezogen, sachlich, fachbegrifflich, urteilend)
- Dokumentiere das Register jedes Materials in einer Spalte
- S12 bleibt KANN-Kriterium, wird aber transparenter

**6. S7 und S12 explizit verlinken**

**Änderung:**
- Hinweis in der Operationalisierung, dass beide Kriterien die Abstraktions-/Register-Progression messen
- Erwäge eine gemeinsame Spalte `abstraktionsgrad_und_register`

### 7.4 NIEDRIG (Langfristig erwägen)

**7. Zusammenführung oder Auflösung von überlappenden Kriterien**

**Möglichkeiten:**
- Zusammenführung S7 + S12 → "Abstraktion und Sprachregister-Progression"
- Auflösung S13 in S5 → "Personalisierung vor Besinnung"

**Status:** Erst nach weiterer Evaluation, da beide Kriterien derzeit separate Informationen liefern.

---

## 8. Konkrete Patches (Zur sofortigen Implementierung)

### Patch 1: MATERIAL_GERUEST-Template erweitern

**Datei zu ändern:** `docs/checklisten/GUETEKRITERIEN_SEQUENZIERUNG.md`, Sektion 4.2 (Operationalisierungstabelle)

**Änderung:**
```markdown
## 4.2 Input-Struktur für Operationalisierung

Jedes Material im Sequenzplan MUSS dokumentieren:

| Feld | Beschreibung | Beispiel |
|---|---|---|
| `mat-ID` | Eindeutige Material-ID | mat-4-1 |
| `Typ` | Materialtyp aus Standard-Liste | darstellungstext, karte, tagebuch, bildquelle, quellentext, zeitleiste, statistik |
| `didaktische_funktion` | SCPL-Funktion | einstieg, erarbeitung, vertiefung, sicherung, transfer |
| `bildfunktion` | [NEU] Funktion visueller Materialien | illustrativ, heuristisch (nur wenn Typ ∈ {bildquelle, karte, statistik}) |
| `material_charakter` | [NEU] Didaktischer Charakter | vergegenwaertigung, besinnung |
| `personalisiert` | [NEU] Hat individuelle Perspektive | true, false |
| `analyseauftrag` | [NEU] Fordert Analyse | true, false (nur bei quellentext, bildquelle) |
| `TB-Knoten` | Zugeordnete Tafel-Knoten | k4-1, k4-2 (Komma-getrennt) |
| `Sequenzposition` | Position in Mappe | 1, 2, 3, ... |
```

### Patch 2: S7-Operationalisierung mit Klassifikationsabhängigkeit

**Datei zu ändern:** `docs/checklisten/GUETEKRITERIEN_SEQUENZIERUNG.md`, Sektion 6, S7-Definition

**Ergänzung nach Zeile 272:**
```markdown
### S7+: Präzisierte Klassifikation mit Feldern

Wenn `bildfunktion` und `material_charakter` dokumentiert sind, verwende folgende Skala:

| Klassifikation | Abstraktionsgrad |
|---|---|
| vergegenwaertigung + illustrativ | 1 |
| vergegenwaertigung + heuristisch | 1.5 |
| vergegenwaertigung + (keine bildfunktion) | 1.5 |
| besinnung + illustrativ | 2 |
| besinnung + heuristisch | 2.5 |
| (keine material_charakter, Typ = quellentext) | 3 |
| (keine material_charakter, Typ = begriffsarbeit) | 4 |

**Beispiel Mappe 4:**
1. Hälfte (Pos 1-2.5): DT(material_charakter=besinnung, 2) + Karte(illustrativ, vergegenwaertigung, 1) = 1.5
2. Hälfte (Pos 3-5): TB(vergegenwaertigung, 1) + Karte(heuristisch, besinnung, 2.5) + BQ(illustrativ, besinnung, 2) = 1.83

Vergleich: 1.5 < 1.83 ✓ PASS
```

### Patch 3: S8-Operationalisierung mit analyseauftrag-Feld

**Datei zu ändern:** `docs/checklisten/GUETEKRITERIEN_SEQUENZIERUNG.md`, Sektion 6, S8-Definition

**Änderung nach Zeile 284:**
```markdown
**Klassifikation von Quellenarbeit:**

Ein Material erfordert Kontext, wenn:
- Typ ∈ {quellentext, bildquelle} UND
- (didaktische_funktion ≠ einstieg ODER analyseauftrag = true)

Ein Material kann ohne Kontext an Position 1 stehen, wenn:
- (didaktische_funktion = einstieg UND analyseauftrag = false) ODER
- (bildfunktion = illustrativ UND material_charakter = vergegenwaertigung)
```

### Patch 4: S13-Operationalisierung mit personalisiert-Feld

**Datei zu ändern:** `docs/checklisten/GUETEKRITERIEN_SEQUENZIERUNG.md`, Sektion 6, S13-Definition

**Änderung nach Zeile 321:**
```markdown
**Präzisierte Prüflogik:**

1. Identifiziere alle Materialien mit `personalisiert = true`
2. Bestimme, ob mindestens eines davon in Position 1 bis ⌈N/2⌉ steht
3. Nur für Mappen mit N ≥ 3 anwenden
4. Ergebnis: PASS oder NICHT_ANWENDBAR (bei N < 3)
```

---

## 9. Abschließendes Fazit: Operationalisierungsqualität

### 9.1 Zusammenfassung Bewertungen

| Kriterium | D1 | D2 | D3 | D4 | D5 | D6 | Gesamt | Status |
|---|---|---|---|---|---|---|---|---|
| **S7** | DEFEKT | FRAGIL | FRAGIL | FRAGIL | ROBUST | FRAGIL | FRAGIL | Patch notwendig |
| **S8** | ROBUST | FRAGIL | ROBUST | ROBUST | ROBUST | ROBUST | FRAGIL | Patch notwendig |
| **S11** | ROBUST | ROBUST | ROBUST | ROBUST | ROBUST | FRAGIL | ROBUST | OK (schwach aber OK) |
| **S12** | DEFEKT | DEFEKT | FRAGIL | FRAGIL | FRAGIL | FRAGIL | DEFEKT | Überarbeitung notwendig |
| **S13** | FRAGIL | FRAGIL | FRAGIL | FRAGIL | ROBUST | ROBUST | FRAGIL | Patch notwendig |

### 9.2 Cluster-Diagnose

**Problem:** Alle 5 Kriterien sind vom selben Kern abhängig: **Die Klassifikation von Materialtypen nach Funktion, Charakter und Personalisierung.**

**Ursache:** Das MATERIAL_GERUEST enthält nur `Typ` und `didaktische_funktion`, nicht aber die feingranularen Klassifikationsfelder (`bildfunktion`, `material_charakter`, `personalisiert`).

**Folge:** 
- D1 (Inputverfügbarkeit) ist in allen 5 Kriterien DEFEKT oder FRAGIL
- D2 (Entscheidungsdeterminiertheit) ist in 4/5 Kriterien FRAGIL
- Die Operationalisierung ist nicht reproduzierbar

**Lösung:** Klassifikationsfelder in MATERIAL_GERUEST Struktur integrieren. **Das ist eine Struktur-Reform, nicht nur ein Text-Patch.**

### 9.3 Empfohlene Priorisierung

**Phase 1 (SOFORT):**
1. Klassifikationsfelder definieren und dokumentieren (Patch 1)
2. S7 mit Klassifikationsabhängigkeit rewrite (Patch 2)
3. S8 mit analyseauftrag-Feld präzisieren (Patch 3)
4. S13 mit personalisiert-Feld verknüpfen (Patch 4)

**Phase 2 (ITERATIV):**
5. S12 überarbeiten oder auflösen (Optional)
6. S11 mit funktionaler Vielfalt ergänzen (Optional)

**Phase 3 (LANGFRISTIG):**
7. Cluster-Review nach Mappe 4+ Implementierung

### 9.4 Regressions-Check (Schutzregeln)

**Überprüfung der R3-Schutzregeln (aus Sektion 8):**

| Schutzregel | Gefährdung durch Patches | Massnahme |
|---|---|---|
| R3-S1 (Niedrigschwelliger Einstieg) | KEINE — Patches ändern nichts am Einstiegs-Material | ✓ OK |
| R3-S2 (Identifikationsfiguren) | NIEDRIG — S13-Patch unterstützt sogar Personalisierung | ✓ OK |
| R3-S3 (Visuelle Klarheit) | KEINE — Patches betreffen nur Klassifikation, nicht Visualisierung | ✓ OK |
| R3-S4 (Emotionale Ansprache) | KEINE — Patches betreffen nur Operationalisierung, nicht Inhalte | ✓ OK |

**Ergebnis:** Alle Patches sind SAFE. Keine Regression zu erwarten.

---

## 10. Dokumen-Referenzen und Quellenbelege

**Primäre Quellen:**
- `/sessions/ecstatic-stoic-albattani/mnt/weitergehts-online/docs/checklisten/GUETEKRITERIEN_SEQUENZIERUNG.md` (Zeilen 142-178, 260-322) — Operationalisierungen S7, S8, S11, S12, S13
- `/sessions/ecstatic-stoic-albattani/mnt/weitergehts-online/docs/agents/artefakte/produktion/gpg-erster-weltkrieg-ursachen/mappe-4/MATERIAL_GERUEST_gpg-erster-weltkrieg-ursachen_Mappe4.md` (vollständig) — Testfall Mappe 4
- `/sessions/ecstatic-stoic-albattani/mnt/weitergehts-online/docs/agents/AGENT_MATERIAL.md` (Zeilen 1-100) — Feldverfügbarkeit und Struktur

**Audit-Protokoll:**
- Audit durchgeführt am 2026-04-07 von RA3
- Audit-Typ: Operationalisierungs-Audit (6-Dimensionen-Framework)
- Testfall: MATERIAL_GERUEST Mappe 4 (5 Materialien, 4 Typen)

---

**BERICHT ABGESCHLOSSEN**

**Status:** READY FOR REVIEW

