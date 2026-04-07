# RA2: Vorwissen-Fachbegriff-Cluster (S2, S9, S10)

**Auditor:** RA2 (Subagent Operationalisierungs-Audit)
**Datum:** 2026-04-07
**Testfall:** MATERIAL_GERUEST Mappe 4 (Schlieffen-Plan)

---

## Zusammenfassung Executive Summary

Die drei Kriterien S2, S9 und S10 sind **strukturell unterversorgt** mit expliziten Eingabedaten und zeigen je nach Dimension kritische Fragilität. Der zentrale Defekt: Das `MATERIAL_GERUEST` verfügt über **keine strukturierten Fachbegriff-Listen** pro Material und keine **inhaltlichen Bezüge**-Objekte für Übergänge. Dies führt dazu, dass Prüflogiken D1 (Inputverfügbarkeit) scheitern und Kriterien D2 (Determiniertheit) auf interpretatives Reverse-Engineering ausweichen müssen.

**Gesamturteil des Clusters:** **FRAGIL** (teilweise deterministisch prüfbar, aber mit systematischen Eingabelücken)

---

## S2: Vorwissen-Progression

### D1-D6 Bewertungstabelle

| Dimension | Bewertung | Begründung |
|-----------|-----------|-----------|
| **D1: Inputverfügbarkeit** | **DEFEKT** | `MATERIAL_GERUEST` enthält keine strukturierte Liste `fachbegriffe_eingefuehrt[]` und `fachbegriffe_referenziert[]` pro Material. Manuelle Extraktion aus Textbeschreibungen notwendig. |
| **D2: Entscheidungsdeterminiertheit** | **FRAGIL** | Die Prueflogik aus §6 GUETEKRITERIEN ist präzise, aber ohne strukturierte Input-Felder muss jeder Agent manuell Konzepte extrahieren. Zwei Agents könnten unterschiedliche Konzeptlisten ableiten (z.B. ist "Mobilmachung" ein Fachbegriff oder wird es im Darstellungstext nur erwähnt?). |
| **D3: Grenzfall-Robustheit** | **FRAGIL** | Grenzfall "Implizit gelehrte Konzepte" nicht adressiert: mat-4-1 erwähnt "Russland langsam" (k4-3 = Zeitluecke-Konzept), aber wird "Infrastruktur-Asymmetrie" als separates Fachbegriff-Konzept eingeführt oder nur illustrativ erwähnt? Prueflogik hat keine Regel dafür. |
| **D4: Überlappungsfreiheit** | **ROBUST** | S2 ist trennscharf: S1-S5 prüfen Funktion/Reihenfolge/Abdeckung, S2 fokussiert spezifisch auf Konzept-Prerequisiten. Keine Überlappung mit S9 (Übergangskohaerenz) oder S10 (Aktivierung). |
| **D5: Nachbesserbarkeit** | **FRAGIL** | Wenn S2 FAIL zeigt, ist Nachbesserungsweg klar (Umpositionierung oder Vorwissensdeklaration), ABER: Ohne strukturierte Fachbegriff-Listen im Blueprint kann Agent nicht autonom entscheiden, ob Umpositionierung sinnvoll ist. Manueller Review notwendig. |
| **D6: Fachdidaktische Dichte** | **FRAGIL** | Kern ist korrekt formalisiert: "Konzepte müssen verfügbar sein, bevor referenziert". ABER: Fachbegriff-Hierarchie nicht erfasst (z.B. "Schlieffen-Plan" ist Top-Level-Konzept, "belgisches Territorium" ist Unterkategorie). Prueflogik arbeitet flat, nicht hierarchisch. |

### Testfall-Analyse: Mappe 4

Ich extrahiere manuell die Konzepte aus MATERIAL_GERUEST (Zeilen 14-18, 123-129):

**mat-4-1 (Darstellungstext, Position 1):**
- Laut MATERIAL_GERUEST: "Erklaert Zweifrontenkrieg als Problem, Schlieffen-Plan als Loesung, Zeitluecke als Praemisse."
- **Vermutete Konzepte eingefuehrt:** Zweifrontenkrieg, Schlieffen-Plan, Zeitluecke, Deutschland (geografisch zwischen FR+RU)
- **Vermutete Konzepte referenziert:** Keine (Position 1)
- **Status:** ✓ PASS (keine Vorgriffe angenommen)

**mat-4-2 (Karte, Position 2):**
- Laut MATERIAL_GERUEST: "Visualisiert den Schlieffen-Plan als geographische Strategie und den geplanten Einmarschweg durch Belgien."
- **Vermutete Konzepte referenziert:** Schlieffen-Plan (eingefuehrt in mat-4-1 ✓), Belgien, Einmarsch
- **Vermutete Konzepte eingefuehrt:** Geographische Route (visuell), möglicherweise "Flanke" oder "Umfassung" als implizites taktisches Konzept
- **Status:** ✓ PASS (Schlieffen-Plan aus Pos 1 verfügbar)

**mat-4-3 (Tagebuch, Position 3):**
- Laut MATERIAL_GERUEST: "Personifiziert den Vormarsch aus Soldatenperspektive: von Siegeszuversicht zu Erschoepfung und Nachschubproblemen."
- **Vermutete Konzepte referenziert:** Vormarsch (aus mat-4-2), Belgien/Frankreich (aus mat-4-2), Nachschublogistik
- **Vermutete Konzepte eingefuehrt:** Erschöpfung (militärische Realität), Nachschubprobleme
- **Status:** ⚠ FRAGIL — "Kriegslogistik" als konzeptueller Hintergrund wird nicht in Pos 1-2 explizit eingeführt, sondern erscheint in Pos 3 als Grund für Scheitern. Ist dies ein Vorgriff oder erlaubte implizite Überleitung?

**mat-4-4 (Karte, Position 4):**
- Laut MATERIAL_GERUEST: "Macht die Marne-Schlacht raeumlich nachvollziehbar: Gallieni-Flanke, Gegenoffensive, 65 km Rueckzug."
- **Vermutete Konzepte referenziert:** Schlieffen-Plan (gescheitert), Gegenoffensive, Flankenangriff
- **Vermutete Konzepte eingefuehrt:** Schlacht an der Marne, Gallieni-Flanke, Rueckzug
- **Status:** ⚠ FRAGIL — "Flankenangriff/Gallieni-Flanke" wird nicht in Pos 2 erwähnt (Karte zeigt nur Angriffspfeile). mat-4-4 führt neues taktisches Konzept "Flanke" ein, das mat-4-3 implizit voraussetzt? Oder ist dies akzeptable didaktische Progression?

**mat-4-5 (Bildquelle, Position 5):**
- Laut MATERIAL_GERUEST: "Zeigt den Stellungskrieg als konkrete Realitaet (Schuetzengraben-Foto) im Kontrast zum geplanten Bewegungskrieg."
- **Vermutete Konzepte referenziert:** Schlieffen-Plan (gescheitert), Bewegungskrieg (Antonym impliziert), Stellungskrieg
- **Vermutete Konzepte eingefuehrt:** Stellungskrieg (Schützengraben-Realität), Bewegungskrieg (als Kontrast)
- **Status:** ✓ PASS (Konzepte aus vorherigen Positionen aufgebaut)

**Gesamtbefund S2 an Mappe 4:** PASS mit Vorbehalten. Drei Grenzfälle sind nicht geklärt:
1. Ist "Kriegslogistik/Nachschubprobleme" in mat-4-1 genug angeteasert (§1-§3 erwähnen "Zeituecke" als Knappheit)?
2. Wird "Flankenangriff" tatsächlich erst in mat-4-4 eingeführt, oder ist es aus mat-4-2 ableitbar?
3. Impliziert "Bewegungskrieg als Gegenteil von Stellungskrieg" ausreichendes Vorwissen aus Pos 1-4?

### Grenzfälle

**Grenzfall 1: 2-Material-Mappe**
- S2-Prueflogik funktioniert: Initialisiere verfuegbares_wissen (Mappe-Voraussetzungen), prüfe Pos 1 (sollte keine neuen Begriffe einführen), dann Pos 2.
- Problem: MATERIAL_GERUEST würde keine `fachbegriffe_*`-Felder haben, Extraktion aus Kurzbeschreibungen wird noch fehlerhafter.
- **Robustheit:** FRAGIL

**Grenzfall 2: 8+ Material-Mappe**
- S2-Prueflogik skaliert (einfache Iteration), aber Fehlerrisiko wächst (mehr Konzepte, mehr Interpretationsspielraum).
- **Robustheit:** FRAGIL (Eingabe-abhängig)

**Grenzfall 3: Misch-Perspektiven (z.B. in Mappe mit historisch + geografisch)**
- S2 funktioniert perspektivunabhängig (Konzepte sind domänenübergreifend).
- **Robustheit:** ROBUST

**Grenzfall 4: Implizite vs. explizite Fachbegriffe**
- "Krieg dauert lang" ist implizit in SCPL, muss aber nicht als Fachbegriff in mat-4-1 expliziert sein.
- Prueflogik hat keine Regel für Impliziten. DEFEKT.

### Gesamt-Urteil S2 + Patch-Vorschlag

**Status:** PASS (Test-Mappe 4), aber **FRAGIL** bei Operationalisierung

**Patch-Anforderung:**

Ergänze `MATERIAL_GERUEST` um strukturierte Felder pro Material:

```markdown
## Material-Detail-Profil (Ergänzung zu Zeilen 14-18)

| mat-ID | Fachbegriffe eingefuehrt | Fachbegriffe referenziert | Konzept-Ebene | Quellen-Chunks |
|--------|--------------------------|---------------------------|---------------|----------------|
| mat-4-1 | [Zweifrontenkrieg, Schlieffen-Plan, Zeitluecke, Mobilmachungsasymmetrie] | [] | Strategie-Level | §1-§3 |
| mat-4-2 | [Belgischer Umfassungsmarsch, Flanke (ggf. implizit)] | [Schlieffen-Plan, Belgien, Zeitluecke] | Taktik-Level | §2, §4 |
| mat-4-3 | [Nachschubprobleme, Erschoepfung] | [Vormarsch, Belgien, Schlieffen-Plan] | Soldaten-Erfahrungs-Level | §4 |
| mat-4-4 | [Flankenangriff, Gallieni-Flanke, Marne-Schlacht, Rueckzug] | [Schlieffen-Plan, Gegenoffensive] | Taktik-Level | §5 |
| mat-4-5 | [Stellungskrieg, Schuetzengraben] | [Bewegungskrieg (Antonym), Schlieffen-Plan-Scheitern] | Realitaets-Level | §6 |
```

**Verantwortlichkeit:** AGENT_MATERIAL (Design-Modus, Phase 1) muss diese Tabelle generieren. Eingabe: SKRIPT-Chunks §1-§6, Doppel-Review mit Fachdidaktik.

---

## S9: Übergaps-Kohaerenz

### D1-D6 Bewertungstabelle

| Dimension | Bewertung | Begründung |
|-----------|-----------|-----------|
| **D1: Inputverfügbarkeit** | **FRAGIL** | MATERIAL_GERUEST Zeilen 131-136 enthält Übergänge als Textskizzen ("Intentionsskizzen"), nicht als strukturierte Objekte mit Rückbezug/Vorausblick-Feldern. Manual-Parse notwendig. |
| **D2: Entscheidungsdeterminiertheit** | **FRAGIL** | §9 GUETEKRITERIEN definiert Prueflogik, erfordert aber semantische Analyse: "Enthaelt die Ueberleitung einen Rueckbezug?" — Dies ist nicht vollautomatisierbar ohne NLP. Manueller Review nötig. |
| **D3: Grenzfall-Robustheit** | **DEFEKT** | Grenzfall "Zwei Übergänge identisch" nicht adressiert. Grenzfall "Übergänge bei Sonderformat (erste/letzte Position)" auch nicht adressiert (Mappe 4 Zeile 107 hat Variante B = Reflexionsimpuls statt Überleitung). |
| **D4: Überlappungsfreiheit** | **ROBUST** | S9 fokussiert spezifisch auf Übergangstexte. S10 (Aktivierung) prüft Position 1, S2 (Vorwissen) prüft Konzepte, S9 prüft Sinn. Keine Überlappung. |
| **D5: Nachbesserbarkeit** | **FRAGIL** | Nachbesserung ist sprachlich (neue Übergänge schreiben), Agent kann dies, ABER: Ohne klare Eingabe-Struktur (Rückbezug + Vorausblick als separate Felder) wird Nachbesserung heuristisch, nicht deterministisch. |
| **D6: Fachdidaktische Dichte** | **FRAGIL** | Formalisierung erfasst "inhaltliche Motivierung", aber nicht den **cognitiven Konnektivitätsgrad**: Ist eine Überleitung nur "sinngemäß" oder auch **explanativ**? Z.B.: "Das Tagebuch zeigt Erschöpfung" vs. "Die Erschöpfung führte zur Gegenoffensive" sind unterschiedlich starke Kausalitäten. Prueflogik prüft nur Präsenz, nicht Tiefe. |

### Testfall-Analyse: Mappe 4

Aus MATERIAL_GERUEST Zeilen 131-136:

**Übergang mat-4-1 → mat-4-2:**
```
"Du hast gelesen, dass der Schlieffen-Plan einen Angriff durch Belgien vorsah. 
Aber wie genau sah dieser Plan auf der Karte aus?"
```
- **Rückbezug:** "Du hast gelesen, dass der Schlieffen-Plan einen Angriff durch Belgien vorsah" ✓
- **Vorausblick:** "wie genau sah dieser Plan auf der Karte aus?" ✓
- **Länge:** 17 Wörter (>8, erfüllt Minimalanforderung)
- **Klassifizierung:** inhaltlich_motiviert ✓
- **Bewertung:** PASS (gut formuliert, Übergangspunkt ist Material-Transition mat-4-1→mat-4-2, Funktionswechsel: DT→Karte)

**Übergang mat-4-2 → mat-4-3:**
```
"Die Karte zeigt den geplanten Vormarsch. Doch wie erlebten die Soldaten 
diesen Marsch durch Belgien und Frankreich?"
```
- **Rückbezug:** "Die Karte zeigt den geplanten Vormarsch" ✓
- **Vorausblick:** "wie erlebten die Soldaten diesen Marsch?" ✓
- **Länge:** 18 Wörter ✓
- **Klassifizierung:** inhaltlich_motiviert ✓
- **Bewertung:** PASS (Übergangspunkt ist Perspektivwechsel: visuell→personal, Funktionswechsel: Karte→Tagebuch)

**Übergang mat-4-3 → mat-4-4:**
```
"Der Soldat beschreibt Erschoepfung und Hunger nach einem Monat Feldzug. 
Genau in diesem Moment beginnt die franzoesische Gegenoffensive."
```
- **Rückbezug:** "Der Soldat beschreibt Erschöpfung und Hunger..." ✓
- **Vorausblick:** "...beginnt die franzoesische Gegenoffensive" ✓
- **Länge:** 18 Wörter ✓
- **Kausalität:** STARK (Erschöpfung → Gegenoffensive Timing) ✓
- **Klassifizierung:** inhaltlich_motiviert ✓
- **Bewertung:** PASS (Übergangspunkt ist Kausal-Überleitung: Erschöpfung führt zum Moment der Gegenwehr, Funktionswechsel: Tagebuch→Karte)

**Übergang mat-4-4 → mat-4-5:**
```
"An der Marne mussten die deutschen Truppen 65 Kilometer zurueckweichen. 
Der Plan fuer einen schnellen Sieg war gescheitert. Was folgte stattdessen?"
```
- **Rückbezug:** "An der Marne mussten...65km zurückweichen" + "Plan war gescheitert" ✓
- **Vorausblick:** "Was folgte stattdessen?" ✓
- **Länge:** 19 Wörter ✓
- **Klassifizierung:** inhaltlich_motiviert ✓
- **Bewertung:** PASS (Übergangspunkt ist Konsequenz-Überleitung: Scheitern→Folge, Funktionswechsel: Karte→Foto, Funktionswechsel-Typ: Erarbeitung→Sicherung)

**Gesamtbefund S9 an Mappe 4:** 4/4 Übergänge inhaltlich motiviert.
- **Q-Gate-Ergebnis (Zeile 176):** "4/4 Ueberleitungen inhaltlich motiviert" ✓ PASS

### Grenzfälle

**Grenzfall 1: Erste Position (mat-4-1) — Übergang davor?**
- Laut GUETEKRITERIEN §9 (Zeile 290): "Fuer jede Ueberleitung (**ab Position 2**) pruefe..."
- Mappe 4 hat Einstieg-Entwurf (Zeilen 93-98) als separates Narrativ-Framing, nicht als Übergang im Sequenzplan.
- **Grenzfall-Handling:** ROBUST (Regel explizit ausgenommen)

**Grenzfall 2: Letzte Position (mat-4-5) — Übergang danach?**
- MATERIAL_GERUEST Zeile 107: "Variante B — letzte Mappe" → Reflexionsimpuls statt Ueberleitung.
- **Grenzfall-Handling:** ROBUST (Sonderfall explizit dokumentiert)

**Grenzfall 3: Semantische Bestimmung "inhaltlich motiviert"**
- Prueflogik verlangt: "Enthaelt die Ueberleitung einen Rueckbezug [...] und einen Vorausblick [...]?"
- Beispiel: Übergang "Du hast Material A gelesen. Jetzt kommt Material B." — Technisch erfüllt Struktur, aber inhaltlich trivial.
- **Test an Mappe 4:** Alle 4 Übergänge gehen über Struktur hinaus (z.B. "Erschöpfung → Gegenoffensive Timing"). ✓ PASS
- **Grenzfall-Handling:** FRAGIL (Prueflogik unterscheidet nicht zwischen "strukturell korrekt" und "kognitiv dicht")

**Grenzfall 4: Übergänge bei Misch-Funktionen**
- mat-4-4 (Karte) hat didaktische_funktion = `erarbeitung`, mat-4-5 (Bildquelle) hat `sicherung` (MATERIAL_GERUEST Zeile 129).
- Übergang muss Funktionswechsel signalisieren (Erarbeitung → Sicherung = Ende des Wissenserwerbs).
- **Test:** Übergang mat-4-4→mat-4-5 sagt "Der Plan war gescheitert. Was folgte stattdessen?" — Dies markiert Ende Erarbeitung (Scheitern ist Kernergebnis), Beginn Sicherung (Folge = Neubewertung).
- **Grenzfall-Handling:** ROBUST (Übergänge adressieren Funktionswechsel)

### Gesamt-Urteil S9 + Patch-Vorschlag

**Status:** PASS (Test-Mappe 4), aber **FRAGIL** bei Operationalisierung

**Zentrale Defizite:**
1. **Eingabe-Struktur:** Übergänge sind in MATERIAL_GERUEST (Zeilen 131-136) als Freitexte notiert, nicht als strukturierte Objekte. Prueflogik muss manuell parsen.
2. **Semantische Depth nicht gemessen:** Prueflogik prüft nur Präsenz (Rückbezug + Vorausblick), nicht Qualität (Kausalität, Explanatorik, Dichte).
3. **NLP-Abhängigkeit:** "Enthaelt die Ueberleitung einen Rueckbezug?" erfordert Textverständnis, nicht Feldprüfung.

**Patch-Anforderung:**

Ergänze `MATERIAL_GERUEST` um strukturierte Übergangsobjekte:

```markdown
## Ueberleitungen-Detail-Profil (Ergänzung zu Zeilen 131-136)

| von-zu | Position | Rueckbezug-Objekt | Vorausblick-Objekt | Kausalitaets-Typ | Volltext | Status |
|--------|----------|-------------------|--------------------|------------------|----------|--------|
| mat-4-1→mat-4-2 | 1→2 | {mat: mat-4-1, inhalt: "Schlieffen-Plan via Belgien"} | {mat: mat-4-2, inhalt: "visuelle Darstellung der Route"} | Präzisierung | "Du hast gelesen...auf der Karte?" | inhaltlich_motiviert |
| mat-4-2→mat-4-3 | 2→3 | {mat: mat-4-2, inhalt: "geplanter Vormarsch"} | {mat: mat-4-3, inhalt: "Soldaten-Erlebnis des Marsches"} | Perspektivwechsel | "Die Karte zeigt...die Soldaten?" | inhaltlich_motiviert |
| mat-4-3→mat-4-4 | 3→4 | {mat: mat-4-3, inhalt: "Erschöpfung nach Monat"} | {mat: mat-4-4, inhalt: "französische Gegenoffensive"} | Kausal-Temporal | "Der Soldat beschreibt...Gegenoffensive" | inhaltlich_motiviert |
| mat-4-4→mat-4-5 | 4→5 | {mat: mat-4-4, inhalt: "Plan gescheitert: 65km Rückzug"} | {mat: mat-4-5, inhalt: "Folge = Stellungskrieg-Realität"} | Konsequenz | "An der Marne...Was folgte?" | inhaltlich_motiviert |
```

**Verantwortlichkeit:** AGENT_MATERIAL (Design-Modus, Phase 1) mit SUB_MATERIAL_* (Produktions-Modus, Phase 2.1) zur Validierung und Verfeinering.

---

## S10: Aktivierung am Sequenzbeginn

### D1-D6 Bewertungstabelle

| Dimension | Bewertung | Begründung |
|-----------|-----------|-----------|
| **D1: Inputverfügbarkeit** | **FRAGIL** | MATERIAL_GERUEST enthält `didaktische_funktion` pro Material (✓ Zeile 126: mat-4-1 = `erarbeitung`), aber NICHT explizit für Position 1 markiert. Außerdem kein Feld `fachbegriffe_eingefuehrt[]` (siehe S2-Defizit). |
| **D2: Entscheidungsdeterminiertheit** | **FRAGIL** | Prueflogik hat zwei Teile: (1) `didaktische_funktion == einstieg`? (deterministisch), (2) "fuehrt 0 neue Fachbegriffe ein?" (nicht deterministisch ohne strukturierte Felder). (3) "hat aktivierenden Charakter?" (subjektiv: "Frage, Bild, Provokation, Hypothese — nicht Lehrtext"). |
| **D3: Grenzfall-Robustheit** | **DEFEKT** | Grenzfall "Material an Position 1, das gleichzeitig einstieg + erarbeitung ist" nicht adressiert (z.B. "Frage stellen, die auch Konzept erklärt"). Mappe 4 Situation (Zeile 177): mat-4-1 = `erarbeitung`, nicht `einstieg`. Einstieg kommt aus separatem Rahmen (einstieg.json). |
| **D4: Überlappungsfreiheit** | **FRAGIL** | S10 prüft Funktion (einstieg ja/nein) und Konzepte (0 Fachbegriffe). Dies überlappt mit S2 (Konzepte). Unterschied: S2 prüft "Konzept-Verfügbarkeit in ganzer Sequenz", S10 prüft "Position 1 führt keine Konzepte ein". Aber beide operieren auf Konzept-Ebene. Grenze ist nicht scharf. |
| **D5: Nachbesserbarkeit** | **FRAGIL** | Wenn S10 FAIL zeigt (z.B. "Position 1 = erarbeitung statt einstieg"), ist Nachbesserung komplex: Entweder (a) Einstiegsmaterial vorschalten (erfordert Sequenz-Neuplanung) oder (b) Position-1-Material als "einstieg" umlabeln und entfachbegrifflichen (inhaltliche Revision). |
| **D6: Fachdidaktische Dichte** | **FRAGIL** | Kern-Prinzip ist korrekt: "Einstieg aktiviert Vorwissen, führt keine Konzepte ein". ABER: (1) Keine Unterscheidung zwischen "Konzept-Einführung explicit" vs. "implicit" (mat-4-1 führt implizit "Kriegslogistik-Problem" ein, ist dies eine Verletzung?). (2) "aktivierender Charakter" ist unterdefniert — Was ist "Frage" ausreichend? Rethorische vs. echte Frage? |

### Testfall-Analyse: Mappe 4

**Situation in MATERIAL_GERUEST (Zeilen 93-106, Q-Gate Zeile 177):**

Position 1 = mat-4-1 (Darstellungstext)
```
Sequenzplan Zeile 125:
| 1 | mat-4-1 | darstellungstext | erarbeitung | k4-2, k4-1, k4-3 | S+C1 | — | Erklaert Zweifrontenkrieg...
```

Q-Gate-Ergebnis Zeile 177:
```
S10 | Aktivierung am Sequenzbeginn | SOLL | FAIL | Pos 1 = erarbeitung mit Fachbegriffen. 
    Begruendung: Einstieg-Funktion durch Rahmen-einstieg.json abgedeckt. Material-Sequenz beginnt mit Erarbeitung.
```

**Analyse der Prüflogik gegen S10-Definition (GUETEKRITERIEN §9, Zeilen 298-306):**

```
S10-Prueflogik:
1. didaktische_funktion == einstieg?  → mat-4-1 = erarbeitung  → NEIN ✗
2. Material fuehrt 0 neue Fachbegriffe ein?  → MATERIAL_GERUEST Zeile 125 sagt "Erklaert Zweifrontenkrieg als Problem, Schlieffen-Plan als Loesung, Zeitluecke"  
   → Drei Fachbegriffe eingefuehrt  → NEIN ✗
3. Material hat aktivierenden Charakter?  → MATERIAL_GERUEST Zeile 97 hat "Narrativ" mit Spannung ("Soldaten glauben...Plan wird scheitern")  
   → Potenziell JA ✓, aber überschattet durch Fehler 1+2
```

**S10 FAIL ist dokumentiert und begründet (Zeile 177):** "Einstieg-Funktion durch Rahmen-einstieg.json abgedeckt. Material-Sequenz beginnt mit Erarbeitung."

**Aber: Ist diese Begründung akzeptabel?**

Laut GUETEKRITERIEN §9 Zeile 303-305:
```
didaktische_funktion == einstieg?
Material fuehrt 0 neue Fachbegriffe ein?
Material hat aktivierenden Charakter?
FAIL wenn: Position 1 ist kein Einstieg ODER fuehrt Fachbegriffe ein
```

Mappe 4 erfüllt beide FAIL-Bedingungen (kein Einstieg, führt Fachbegriffe ein). **S10 FAIL ist korrekt.**

**Aber: Ist die Design-Entscheidung, trotz S10 FAIL zu akzeptieren, fachdidaktisch gerechtfertigt?**

Argument aus MATERIAL_GERUEST Zeile 177: "Einstieg-Funktion durch Rahmen-einstieg.json abgedeckt."

- **Rahmen-einstieg.json:** AGENT_MATERIAL.md Zeile 40 erwähnt `rahmen/einstieg.json`, Zeile 44: "problemstellung (C1b = Stundenfrage)" — Dies ist ein **separates Dokument außerhalb der Material-Sequenz**.
- **Konsequenz:** mat-4-1 ist technisch "Material 1 der Sequenz", aber didaktisch nicht das erste Lernmaterial. Das Einstiegsmaterial kommt aus dem Rahmen.

**Grenzfall-Analyse:**

**Grenzfall 1: Separation von Einstieg (Rahmen) und Material-Sequenz**

S10-Prueflogik sagt: "Das erste Material (Position 1) hat die didaktische Funktion `einstieg`".

Mappe 4: Position 1 der Material-Sequenz ist mat-4-1 (erarbeitung), aber das übergeordnete Escape-Game-Einstieg ist einstieg.json + Narrativ (Zeilen 93-98).

**Ist S10 sinnvoll anwendbar, wenn Einstieg auf zwei Artefakte verteilt ist?**

**Antwort:** S10 ist unterdefniert. Es muss geklärt werden:
- Prüft S10 die **Material-Sequenz** oder die **gesamte didaktische Aktivierungskette** (Rahmen + Material)?
- Falls Material-Sequenz: Ist Mappe 4 korrekt, dass mat-4-1 erarbeitung ist (Einstieg kommt aus Rahmen)?
- Falls gesamte Kette: S10 ist nicht operationalisierbar (betrifft mehrere Agenten).

Aktuelle Dokumentation (GUETEKRITERIEN Zeile 300): "**Input-Daten:** Material an Position 1" — Dies deutet auf Material-Sequenz-Fokus.

**Grenzfall-Urteil:** DEFEKT (Interaktion mit Rahmen-Struktur nicht adressiert)

**Grenzfall 2: Zwei Mappen in Serie — carry-over von Aktivierung?**

Mappe 3 endet mit Sicherung (Kernerkenntnisse zu k3-1). Mappe 4 beginnt mit Erarbeitung (neue Knoten k4-1 bis k4-6).

- Ist Aktivierung von Mappe 3 noch relevant?
- Oder muss Mappe 4 neu aktivieren?

**S10 prüft nur Position 1 der aktuellen Mappe (Mappe 4).** Mappen-Grenzen werden nicht adressiert.

**Grenzfall-Urteil:** FRAGIL (inter-Mappen-Aktivierung nicht adressiert)

**Grenzfall 3: "0 neue Fachbegriffe" als strikte Regel**

Mappe 4, Einstieg-Narrativ (Zeile 95): "Soldaten glauben an einen schnellen Sieg...Generaele haben einen Plan — und dieser Plan wird scheitern."

- "schneller Sieg" = Konzept (Hoffnung)
- "Plan" = Konzept (Strategie-Abstraktum)
- "Soldaten" = Rollenreferenz (nicht Fachbegriff)

Sind diese Konzepte "neu" oder "Aktivierungsumfeld"?

**S10 Regeltext (Zeile 303): "fuehrt 0 neue Fachbegriffe ein? (Fachbegriffe erst ab Position 2)"**

"0 neue Fachbegriffe" ist zu strikt, wenn Aktivierungs-Narrativ automatisch Konzepte erwähnen muss (z.B. "Krieg", "Sieg" sind im Kontext schwer zu vermeiden).

**Grenzfall-Urteil:** FRAGIL (Unterscheidung "Fachbegriff" vs. "Aktivierungs-Kontext-Begriff" nicht definiert)

### Gesamt-Urteil S10 + Patch-Vorschlag

**Status:** FAIL (Test-Mappe 4, dokumentiert), aber **DEFEKT** bei Operationalisierung

**Zentrale Defizite:**
1. **Rahmen-Sequenz-Ambiguität:** S10 prüft Material-Position 1, aber Einstieg ist in AGENT_MATERIAL-Workflow auf Rahmen + Sequenz verteilt. Prueflogik adressiert nicht, wie diese beiden wirken.
2. **Fachbegriff-Definition:** Was ist "Fachbegriff" vs. "Kontext-Begriff"? Keine Taxonomie vorhanden.
3. **Aktivierungscharakter subjektiv:** "Frage, Bild, Provokation, Hypothese" sind zu vag. "Nicht Lehrtext" ist negativ definiert (was es nicht sein soll, nicht was es sein soll).
4. **Inter-Mappen-Durchgang nicht adressiert:** Wenn Mappe N mit Sicherung endet, muss Mappe N+1 neu aktivieren, oder reicht Carry-over?

**Patch-Anforderung:**

**Variante A: Material-Sequenz-Fokus (empfohlen)**

Ergänze GUETEKRITERIEN §9 S10-Definition:

```markdown
### S10: Aktivierung am Sequenzbeginn (SOLL) — ÜBERARBEITETE DEFINITION

**Kontext:** Material-Sequenz beginnt nach dem Rahmen-Einstieg (einstieg.json + Narrativ, AGENT_MATERIAL Aufgabe 1.3). 
Die erste Materialposition (Position 1) kann `einstieg`-Funktion haben (Aktivierungsmaterial INNERHALB Sequenz) 
ODER `erarbeitung`-Funktion (wenn Rahmen-Aktivierung ausreichend ist).

**Unterscheidung:**
- **Mappe mit separatem Rahmen-Einstieg (Standard):** Material Position 1 darf `erarbeitung` sein, Aktivierung kommt aus Rahmen. S10 PASS.
- **Mappe ohne separaten Rahmen-Einstieg (Ausnahme):** Material Position 1 MUSS `einstieg` sein. S10 FAIL wenn nicht.

**Input-Daten:** 
- Material an Position 1
- Rahmen-Einsteiger vorhanden ja/nein (aus rahmen/einstieg.json)
- Strukturierte Fachbegriff-Liste `fachbegriffe_eingefuehrt[]` für mat Position 1

**Prueflogik:**
1. Ist rahmen_einstieg vorhanden?
   - JA → Material Position 1 darf `erarbeitung` sein. S10 PASS. (Aktivierung extern abgedeckt)
   - NEIN → Schritt 2
2. `didaktische_funktion` von Position 1 == `einstieg`?
   - JA → Schritt 3
   - NEIN → S10 FAIL (Aktivierung fehlt völlig)
3. `fachbegriffe_eingefuehrt[]` ist leer?
   - JA → Schritt 4 (keine Fachbegriffe)
   - NEIN → S10 FAIL (Fachbegriffe-Einführung zu früh)
4. Material hat aktivierenden Charakter?
   - Definiert als: Enthält min. 1 von: {Frage (echo oder offen), Bild/Artefakt, Provokation (Paradox/Widerspruch), Hypothese}
   - JA → S10 PASS
   - NEIN → S10 FAIL

**FAIL wenn:** 
- rahmen_einstieg = false UND (didaktische_funktion ≠ einstieg ODER Material hat keinen aktivierenden Charakter)
- rahmen_einstieg = true UND fachbegriffe_eingefuehrt[] ≠ leer (auch mit externes Einstieg: Position 1 sollte neu eingeführte Fachbegriffe vermeiden)

**Nachbesserung:** 
- Wenn rahmen_einstieg = false: Einstiegsmaterial vorschalten (erfordert Sequenz-Neustrukturierung)
- Wenn rahmen_einstieg = true UND Fachbegriffe in Position 1: Material "entfachbegrifflichen" (Subagent SUB_MATERIAL_* revidiert)
```

**Verantwortlichkeit:** 
- **AGENT_MATERIAL (Design-Modus):** Setzt `rahmen_einstieg` Flag, strukturiert `fachbegriffe_eingefuehrt[]`
- **AGENT_HEFTEINTRAG (Phase 0.4):** Validiert rahmen/einstieg.json, Signal an AGENT_MATERIAL
- **SUB_MATERIAL_* (Produktion):** Revidiert Position-1-Material, entfernt Fachbegriff-Definitionen falls nötig

---

## Cluster-Analyse: Zentrales Defizit Fachbegriff-Felder

### Feldbilanz in MATERIAL_GERUEST Mappe 4

**Vorhandene Felder pro Material (Zeilen 12-18):**
```
| # | mat-ID | Typ | Skript-Ref | Artefakt-Ref | TB-Knoten | Funktion (1 Satz) |
```

**Fehlende Felder zur Unterstützung von S2, S9, S10:**

| Feld | Typ | Für | Warum fehlt | Impact |
|------|-----|-----|-----------|--------|
| `fachbegriffe_eingefuehrt[]` | Array | S2, S10 | Keine Struktur-Vorgabe in AGENT_MATERIAL.md | S2 FRAGIL (manuelle Extraktion), S10 FRAGIL (unmöglich, 0 FB zu prüfen) |
| `fachbegriffe_referenziert[]` | Array | S2 | Keine Struktur-Vorgabe | S2 FRAGIL (keine deterministischen Voraussetzungs-Prüfung) |
| `ueberleitungen[{von, zu, rueckbezug, vorausblick, text}]` | Array of Objects | S9 | Text-Skizzen statt strukturierter Daten | S9 FRAGIL (manuelles Parsing, keine Tiefenprüfung) |
| `aktivierungscharakter` | Enum (`frage|bild|provokation|hypothese|keine`) | S10 | Keine Feldvorgabe | S10 DEFEKT (nicht prüfbar) |
| `rahmen_einstieg_abgedeckt` | Boolean | S10 | Abhängig von rahmen/einstieg.json Existenz, nicht im MATERIAL_GERUEST dokumentiert | S10 FRAGIL (inter-Dokument-Abhängigkeit) |

### Taxonomie: Wann ist ein Begriff ein "Fachbegriff"?

Aus dem Testfall Mappe 4 ergeben sich Grenzfälle:

**Fachbegriffe (ja):**
- "Zweifrontenkrieg" — Fachkonzept der Militärgeschichte (Strukturproblem)
- "Schlieffen-Plan" — Konkretes historisches Artefakt/Strategie
- "Zeitluecke" — Konzeptuelle Praemisse (Asymmetrie)
- "Belgien" — Geografischer Ort als Konzept in Kontext (Neutrale vs. besetzte Territorium)
- "Stellungskrieg" vs. "Bewegungskrieg" — Kategoriales Gegensatzpaar
- "Marne-Schlacht" — Konkretes historisches Ereignis
- "Flankenangriff/Gallieni-Flanke" — Taktisches Manöver

**Grenzfälle (?):**
- "Erschöpfung" — Ist dies Fachbegriff (militärische Realität) oder Alltags-Konzept (Müdigkeit)?
  - **Antwort:** Kontextabhängig. In mat-4-3 (Tagebuch) ist es Soldaten-Erlebnis (Alltag), wird aber didaktisch als "Grund für Planscheitern" funktionalisiert (Fachkontext).
  - **Taxonomie:** Grenzfall-Fachbegriff (halbimplizit)

- "Krieg dauert lang" — Ist "Dauer" ein Fachbegriff?
  - **Antwort:** In mat-4-1 (Zeituecke-Konzept) ist "Dauer/Zeitaspekt" Teil der strategischen Praemisse (Fachkontext).
  - **Taxonomie:** Implizit-Fachbegriff (nur als Komponente eines größeren Konzepts)

- "Glaube an schnellen Sieg" — Ist "Kriegsbegeisterung/Enthusiasmus" ein Fachbegriff oder psychologisches Allgemeinwissen?
  - **Antwort:** In diesem Kontext wird es als Kernmotiv im TAFELBILD strukturiert (k3-1 Voraussetzung aus Mappe 3 per Zeile 62). Also: Ja, Fachbegriff in diesem Curriculum.
  - **Taxonomie:** Kontext-Fachbegriff (strukturell relevant)

- "Belgien" als Ort vs. "belgisches Territorium als Neutralität" — Ist der geografische Name selbst ein Fachbegriff?
  - **Antwort:** Nein. "Belgien" ist Ort-Referenz. "Verletzung belgischer Neutralität" ist Fachkonzept.
  - **Taxonomie:** Nicht-Fachbegriff (reine Lokalisierung)

**Pragmatische Taxonomie für Mappe 4:**

| Kategorie | Definition | Beispiele Mappe 4 | S2-Behandlung |
|-----------|-----------|-------------------|---------------|
| **Struktur-Fachbegriff** | Ordnet den TB-Aufbau. Muss vorher eingefuehrt sein. | Zweifrontenkrieg, Schlieffen-Plan, Marne-Schlacht | **STRENG:** Voraussetzungs-Prüfung |
| **Prozess-Fachbegriff** | Beschreibt Kausalitäten/Operationen. Kann in Prozesskontext eingefuhert werden. | Zeitluecke, Flankenangriff, Gegenoffensive | **NORMAL:** Vor-Position prüfen |
| **Konzept-Fachbegriff** | Kategoriales Gegensatzpaar/Systemkonzept. Muss explizit eingefuehrt sein. | Bewegungskrieg ↔ Stellungskrieg | **STRENG:** Voraussetzungs-Prüfung |
| **Kontext-Fachbegriff** | Ist relevant im Lehr-Kontext, aber in allgemeinem Wissen teilweise vorhanden. Halbimplizit erlaubt. | Erschöpfung (als Grund), Kriegsbegeisterung | **MILD:** Kontextuelle Annahme erlaubt |
| **Nicht-Fachbegriff** | Reine Lokalisierung/Allgemeininformation. Keine Voraussetzungs-Prüfung. | Belgien (Ort), Frankreich (Ort), 65 km (Metrik) | **KEINE:** Ignorieren |

### Befüllungs-Workflow: Wer erstellt die Fachbegriff-Listen?

**Phase 0.3 (AGENT_SKRIPT):**
- Input: INHALTSBASIS Mappe 4, didaktisches Skript-Gerüst
- Output: SKRIPT mit Chunk-Struktur (§1-§6) und Artefakt-Markern (zit-IDs, img-IDs, rolle-IDs)
- **Fachbegriff-Extraktion:** Nicht AGENT_SKRIPT-Aufgabe (SKRIPT fokussiert narrative Sequenz, nicht Konzept-Explizitheit)

**Phase 0.4 (AGENT_HEFTEINTRAG):**
- Input: SKRIPT, DIDAKTIK_RAHMEN (KE-Matrix, Kernerkenntnisse)
- Output: TAFELBILD mit scpl{situation, complication[], problem, loesung[]}
- **Fachbegriff-Extraktion:** AGENT_HEFTEINTRAG muss diese prüfen (TAFELBILD.knoten[].fachbegriff_label), aber dies ist bereits TB-Funktion
- **Aber:** TB-Fachbegriffe ≠ Material-Fachbegriffe. TB definiert, was konzeptionell zentral ist, NICHT was in welchem Material eingefuehrt wird.

**Phase 1 (AGENT_MATERIAL Design-Modus):**
- Input: SKRIPT (§1-§6), TAFELBILD (Knoten), DIDAKTIK_RAHMEN
- Output: MATERIAL_GERUEST mit Typ-Zuordnung und Sequenzplan
- **Fachbegriff-Extraktion:** AGENT_MATERIAL MUSS diese durchführen:
  1. Für jedes Material: Lese SKRIPT-Chunk und Artefakt-Kontext
  2. Extrahiere Fachbegriffe, klassifiziere nach Taxonomie (Struktur/Prozess/Konzept/Kontext/Nicht)
  3. Trage in `fachbegriffe_eingefuehrt[]` und `fachbegriffe_referenziert[]` ein
  4. Validiere gegen S2-Prueflogik (verfügbares_wissen-Aufbau)
  5. Dokumentiere in MATERIAL_GERUEST (neue Tabelle: Material-Detail-Profil, siehe S2-Patch)

**Phase 2.1 (SUB_MATERIAL_* Produktion-Modus):**
- Input: MATERIAL_GERUEST-Zeile (mit Fachbegriff-Listen aus Phase 1)
- Output: Produziertes Material als mat-N-M.json
- **Validierung:** Subagent SUB_MATERIAL_* prüft, dass produzierter Text exakt die Fachbegriffe aus Phase 1 einführt (oder expliziert), nicht mehr, nicht weniger.

**Workflow-Diagramm:**

```
INHALTSBASIS (Mappe 4)
    ↓ (Phase 0.3)
AGENT_SKRIPT → SKRIPT (§1-§6, Artefakt-Marker)
                   ↓ (Phase 0.4)
              AGENT_HEFTEINTRAG → TAFELBILD (Knoten + Kernerkenntnisse)
                   ↓ (Phase 0.1)
              AGENT_DIDAKTIK (KE-Matrix) ← DIDAKTIK_RAHMEN
                   ↓ (Phase 1 — Design-Modus)
              AGENT_MATERIAL:
                - 1.1: TB-Abdeckung (Knoten-Zuordnung zu Materialien)
                - 1.9.1: Fachbegriff-Extraktion pro Material
                  (Input: SKRIPT-Chunk + Taxonomie-Definition)
                  (Output: fachbegriffe_eingefuehrt[], fachbegriffe_referenziert[])
                - 1.9.2: S2-Prueflogik (verfügbares_wissen-Aufbau)
                - 1.9.3: S9-Ueberleitung-Strukturierung
                - 1.9.4: S10-Aktivierungscharakter-Bestimmung
                    ↓ (Phase 1.5 — Q-Gate S1-S15)
              MATERIAL_GERUEST → User-Validierung
                    ↓ (Phase 2.1 — Produktions-Modus)
              SUB_MATERIAL_* (pro Material):
                - Ließt Fachbegriff-Listen aus MATERIAL_GERUEST
                - Produziert Material-JSON
                - Validiert gegen Fachbegriff-Explizitheit (SQ-1 bis SQ-4)
                    ↓ (Phase 3 — Montage)
              AGENT_TECHNIK → data.json (Assembly aus materialien/*.json)
```

### Wie wird S9 deterministisch, ohne NLP?

**Problem:** S9-Prueflogik verlangt "Enthaelt die Ueberleitung einen Rueckbezug?" — Dies erfordert Textverständnis.

**Lösung:** Strukturierte Übergangsobjekte (statt Freitexte) + minimale Feldprüfung

**Struktur (aus S9-Patch vorgeschlagen):**

```
ueberleitungen: [
  {
    von_mat: "mat-4-1",
    zu_mat: "mat-4-2",
    rueckbezug_material: "mat-4-1",
    rueckbezug_inhalt_ref: "Schlieffen-Plan-via-Belgien",
    vorausblick_material: "mat-4-2",
    vorausblick_frage: "wie sah plan auf karte aus",
    kausalitaets_typ: "Präzisierung",  # Enum: Präzisierung|Perspektivwechsel|Kausal-Temporal|Konsequenz|Kontrast
    volltext_ueberleitung: "Du hast gelesen, dass der Schlieffen-Plan einen Angriff durch Belgien vorsah. Aber wie genau sah dieser Plan auf der Karte aus?",
    woerter: 17,
    status: "inhaltlich_motiviert"
  }
]
```

**Prueflogik (nun deterministisch):**

```python
def pruefe_s9_uebergang(uebergang):
  checks = [
    ("rueckbezug_vorhanden", uebergang.rueckbezug_inhalt_ref is not None and len(uebergang.rueckbezug_inhalt_ref) > 0),
    ("vorausblick_vorhanden", uebergang.vorausblick_frage is not None and len(uebergang.vorausblick_frage) > 0),
    ("mindestlaenge", uebergang.woerter >= 8),
    ("kausalitaets_typ_valide", uebergang.kausalitaets_typ in ["Präzisierung", "Perspektivwechsel", "Kausal-Temporal", "Konsequenz", "Kontrast"])
  ]
  return all([check[1] for check in checks])
```

**Anwendung auf Mappe 4 (mat-4-3→mat-4-4):**
```
rueckbezug_vorhanden: TRUE (ref="Erschöpfung nach Monat")
vorausblick_vorhanden: TRUE (frage="französische Gegenoffensive")
mindestlaenge: TRUE (18 Worte)
kausalitaets_typ_valide: TRUE ("Kausal-Temporal")
→ S9 PASS
```

**Verantwortlichkeit:** AGENT_MATERIAL (Phase 1) muss Übergangsobjekte strukturiert erzeugen.

---

## Empfehlungen (Priorisiert)

### Priority 1: CRITICAL — Struktur-Lücken in MATERIAL_GERUEST

**Maßnahme:** Ergänze AGENT_MATERIAL-Aufgabe 1.9 mit neuen Output-Tabellen

**Konkret:**
1. **Aufgabe 1.9.2 (NEU): Fachbegriff-Profil-Generierung**
   - Input: SKRIPT-Chunks, Taxonomie-Definition (Struktur/Prozess/Konzept/Kontext/Nicht)
   - Output: Tabelle "Material-Detail-Profil" (pro Material)
   - Verantwortlichkeit: AGENT_MATERIAL
   - Validierung: Fachdidaktik-Review (manuell, Phase 1.5)

2. **Aufgabe 1.9.3 (NEU): Übergänge-Strukturierung**
   - Input: Sequenzplan (Positionen 1-N)
   - Output: Übergangsobjekte mit rueckbezug/vorausblick/kausalitaets_typ
   - Verantwortlichkeit: AGENT_MATERIAL
   - Validierung: S9-Prueflogik (automatisiert)

3. **Aufgabe 1.9.4 (ERWEITERT): Aktivierungscharakter-Bestimmung**
   - Input: Material Position 1, rahmen_einstieg Status
   - Output: Aktivierungscharakter-Enum + aktivierungsmarker
   - Verantwortlichkeit: AGENT_MATERIAL
   - Validierung: S10-Prueflogik (automatisiert, mit neuer Logik)

**Zeitaufwand:** 1-2 Stunden AGENT_MATERIAL-Prompt-Überarbeitung + Testlauf Mappe 4-5

---

### Priority 2: HIGH — S10-Definition überarbeiten

**Maßnahme:** Ersetze S10-Definition (GUETEKRITERIEN §9 Zeilen 298-306) durch Variante A (aus S10-Patch oben)

**Konkret:**
1. Dokumentiere Rahmen-Sequenz-Interaktion explizit
2. Definiere "Fachbegriff" vs. "Kontext-Begriff" mit Beispielen
3. Enumisiere "Aktivierungscharakter" (frage|bild|provokation|hypothese|keine)
4. Ergänze Failsafe: "Wenn rahmen_einstieg = true, Position 1 darf keine neuen Struktur-Fachbegriffe einführen"

**Zeitaufwand:** 30 Minuten GUETEKRITERIEN-Überarbeitung

---

### Priority 3: HIGH — S2-Prueflogik Grenzfälle adressieren

**Maßnahme:** Erweitere S2-Prueflogik (GUETEKRITERIEN §6.2, Zeilen 201-211) um Fachbegriff-Hierarchie

**Konkret:**
1. Definiere "Fachbegriff-Ebenen": Top-Level (Strukturkonzepte) vs. Sub-Level (Unterkategorien)
2. Klärungsregel: Top-Level-Fachbegriffe MÜSSEN explizit eingefuehrt sein, Sub-Level-Begriffe dürfen implizit sein (wenn Top-Level verfügbar)
3. Beispiel Mappe 4: "Schlieffen-Plan" = Top-Level, "belgischer Umfassungsmarsch" = Sub-Level (erlaubt implizit)

**Zeitaufwand:** 45 Minuten GUETEKRITERIEN-Überarbeitung + 1 Testlauf

---

### Priority 3: MEDIUM — S9-Determinismus verbessern

**Maßnahme:** Mandate strukturierte Übergangsobjekte statt Freitexte

**Konkret:**
1. AGENT_MATERIAL-Prompt erweitern: Übergänge als JSON-Objekte, nicht als Textskizzen
2. SUB_MATERIAL_*-Prompt erweitern: Validierung der Übergangsobjekte gegen Produktions-Kontext
3. Beispiel: Wenn Übergangsobjekt sagt "rueckbezug_inhalt_ref = Erschöpfung", MUSS produziertes Material (mat-4-3) "Erschöpfung" explizit nennen

**Zeitaufwand:** 2 Stunden (AGENT_MATERIAL + alle SUB_MATERIAL_*-Prompts)

---

### Priority 4: MEDIUM — Test-Durchlauf Mappe 4-5 mit neuer Struktur

**Maßnahme:** Produktions-Modus Phase 2.1 mit neuen MATERIAL_GERUEST-Feldern durchführen

**Konkret:**
1. AGENT_MATERIAL generiert erweiterte MATERIAL_GERUEST (mit Fachbegriff-Listen + Übergangsobjekten)
2. SUB_MATERIAL_* validieren gegen S2/S9/S10
3. Q-Gate prüft S1-S15 mit neuer Logik
4. Dokumentiere Lessons-Learned

**Zeitaufwand:** 4-6 Stunden (pro Mappe)

---

## Fazit

Die drei Kriterien S2, S9, S10 sind **fachdidaktisch gut durchdacht**, aber **operationalisierungstechnisch unterversorgt**. 

**Kern-Defekt:** Das `MATERIAL_GERUEST` ist ein "Text-Indexing"-Artefakt (Positionen, Typen, TB-Knoten), nicht ein "Konzept-Inventar" (Fachbegriffe, Übergänge, Aktivierungsmarker).

**Lösung:** 
1. Ergänze MATERIAL_GERUEST um **strukturierte Metadaten** (Fachbegriff-Listen, Übergangsobjekte)
2. Verlagere **Determinierungslast** von Prueflogik (S2/S9/S10) auf Input-Struktur
3. Mache Übergänge **feldbasiert**, nicht textbasiert

Mit diesen Patches wird der Cluster von **FRAGIL** zu **ROBUST**.

---

**Bericht erstellt:** RA2 Subagent, 2026-04-07
