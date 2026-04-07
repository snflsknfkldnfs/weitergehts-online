# Evaluation: Fachdidaktische Ressourcen vs. GUETEKRITERIEN_SEQUENZIERUNG

**Datum:** 2026-04-07
**Scope:** Brauch-Geschichtsdidaktik-Uebersicht + Sequenzplanungs-Anleitung + FD-Q1 vs. S1-S15 (v1.1)
**Zweck:** Identifikation von Abdeckung, Luecken und Schaerfungsbedarf im bestehenden Framework

---

## 1. Quellen-Uebersicht

| Kuerzel | Dokument | Herkunft | Charakter |
|---|---|---|---|
| **BR** | Geschichtsdidaktik - Uebersicht nach Brauch Nicola | KI-generierte Zusammenfassung eines Hochschul-Lehrbuchs (Brauch, Geschichtsdidaktik) | Normativ-theoretisch, universitaer |
| **SP** | Anleitung zur Erstellung einer Sequenzplanung | Seminar-/Planungshilfe (vermutl. Fachseminar GPG) | Operativ-planerisch, schulpraktisch |
| **GK** | GUETEKRITERIEN_SEQUENZIERUNG S1-S15 v1.1 | Eigene Pipeline-Infrastruktur | Maschinell-operationalisiert, pipeline-spezifisch |

---

## 2. Abdeckungsmatrix: Brauch-Prinzipien vs. S1-S15

| BR-Prinzip / BR-Kompetenz | Status in GK | Abdeckendes Kriterium | Bewertung |
|---|---|---|---|
| **Gegenwartsbezug** | NICHT ABGEDECKT | — | GK regelt Sequenzierung innerhalb einer Mappe. Gegenwartsbezug ist eine Entscheidung auf Didaktik-Rahmen-Ebene (Phase 0.1), nicht auf Material-Sequenz-Ebene. Korrekt nicht in S1-S15. Aber: KE_KATALOG sollte Gegenwartsanschluss-Annotationen tragen → bereits implementiert (Lebensweltbezug-Annotation GERING/MITTEL/HOCH). **Kein Handlungsbedarf fuer GK.** |
| **Problemorientierung** | TEILWEISE | S1 (Artikulationsschema), S10 (Aktivierung) | S1 erzwingt Problembegegnung als Einstiegsphase im historischen Schema. S10 fordert aktivierenden Einstieg. Aber: Problemorientierung als durchgehendes Strukturprinzip (Leitfrage ueber gesamte Sequenz) ist nicht explizit kodifiziert. Zustaendig: AGENT_DIDAKTIK (Leitfrage in DIDAKTIK_RAHMEN), nicht GK. **Kein Schaerfungsbedarf in GK, aber Pruefpunkt fuer AGENT_DIDAKTIK-Spec.** |
| **Multiperspektivitaet** | NICHT IN GK (korrekt) | — | Multiperspektivitaet ist Materialproduktions-Kriterium, nicht Sequenzierungs-Kriterium. Bereits abgedeckt in STR-05 (konflikttyp/perspektiven_policy) und SK16. Architektonisch korrekt getrennt. **Kein Handlungsbedarf.** |
| **Handlungsorientierung** | NICHT IN GK (korrekt) | — | Handlungsorientierung betrifft Aufgabengestaltung und Methodik, nicht Materialreihenfolge. Liegt in der Escape-Game-Mechanik selbst (interaktive Raetsel = implizite Handlungsorientierung). **Kein Handlungsbedarf.** |
| **Sachkompetenz** | INDIREKT | S2 (Vorwissen-Progression), S3 (TB-Knoten-Abdeckung) | Sachkompetenz = Fachwissen. S2 stellt sicher, dass Fachwissen kumulativ aufgebaut wird. S3 stellt sicher, dass alle inhaltlichen Knoten erarbeitet werden. **Ausreichend abgedeckt.** |
| **Methodenkompetenz** | TEILWEISE | S8 (Kontextgebot Quellenarbeit) | S8 stellt sicher, dass Quellenarbeit kontextuell vorbereitet ist — eine Voraussetzung fuer Methodenkompetenz. Aber: systematische Methodenprogression (einfache → komplexe Methoden) ist nicht kodifiziert. Fuer unsere Pipeline: Methodenwahl liegt bei AGENT_MATERIAL (Materialtyp-Entscheidung), Progression waere ein SOLL-Kriterium. **Potenzielle Schaerfung: S-NEU "Methodenprogression" als KANN.** |
| **Orientierungskompetenz** | INDIREKT | S14 (SCPL-Korrespondenz) | SCPL-Aufbau erzwingt eine Sinnstruktur (S→C→P→L), die den SuS Orientierung gibt: erst Situation verstehen, dann Problem erkennen, dann Loesung erarbeiten. **Funktional abgedeckt, wenn auch nicht unter diesem Label.** |
| **Fragekompetenz** | NICHT IN GK (korrekt) | — | Fragekompetenz gehoert zur Aufgabengestaltung (GUETEKRITERIEN_AUFGABEN). Im Escape-Game: Raetsel SIND Fragen. **Kein Handlungsbedarf in GK.** |
| **Urteilskompetenz** | INDIREKT | S5 (Vergegenwaertigung vor Besinnung) | S5 stellt sicher, dass Urteilsbildung (Besinnung, wertbezogen) erst nach Faktenaufbau (Vergegenwaertigung) und Sachanalyse (Besinnung, sachbezogen) kommt. Das ist die sequenzielle Voraussetzung fuer Urteilskompetenz. **Ausreichend abgedeckt.** |
| **Lernaufgaben 1./2. Ordnung** | NICHT IN GK (korrekt) | — | Lernaufgaben 1. Ordnung = Sequenz-Ebene (Game als Ganzes). Lernaufgaben 2. Ordnung = Einzelstunden (Mappen). Diese Unterscheidung ist in unserer Architektur implizit: Game-Cluster (KE_KATALOG) = 1. Ordnung, Mappen = 2. Ordnung. Kein Bedarf, dies in GK zu kodifizieren — es ist eine Architektur-Eigenschaft, kein Sequenzierungskriterium. **Kein Handlungsbedarf.** |
| **Diagnose / Lernstandserhebung** | NICHT IN GK (korrekt) | — | Diagnose ist kein Sequenzierungskriterium. In unserer Pipeline nicht vorgesehen (Escape-Game hat kein Assessment-System). Bewusste Scope-Grenze. **Kein Handlungsbedarf.** |
| **Binnendifferenzierung** | NICHT IN GK (korrekt) | — | Differenzierung ist als separate Schicht definiert (DE-2 in AUSFUEHRUNGSPLAN). Nicht Bestandteil der Materialsequenzierung. **Kein Handlungsbedarf.** |

---

## 3. Abdeckungsmatrix: Sequenzplanungs-Anleitung vs. S1-S15

| SP-Komponente | Status in GK | Mapping | Bewertung |
|---|---|---|---|
| **1. Sequenztitel** | NICHT IN GK | — | Sequenztitel = Mappen-Titel. Wird von AGENT_DIDAKTIK generiert, nicht von GK geregelt. **Kein Handlungsbedarf.** |
| **2. Lehrplanbezug** | NICHT IN GK | — | Lehrplanbezug = KE_KATALOG-Referenz. Architektonisch auf Phase-0.1-Ebene. **Kein Handlungsbedarf.** |
| **3. Lernbereiche** | NICHT IN GK | — | Identisch zu Lehrplanbezug. **Kein Handlungsbedarf.** |
| **4. Kompetenzerwartungen** | NICHT IN GK | — | = KE_KATALOG. Phase-0.1-Ebene. **Kein Handlungsbedarf.** |
| **5. Inhalte zu Kompetenzen** | NICHT IN GK | — | = Exemplar-Pool im KE_KATALOG. Phase-0.1-Ebene. **Kein Handlungsbedarf.** |
| **6. Datum/UZE** | NICHT IN GK | — | Zeitplanung ist fuer unsere Pipeline nicht relevant (STR-06: "1 Mappe ≈ 1 UE" als weiche Orientierung, kein Gate-Kriterium). **Kein Handlungsbedarf.** |
| **7. Gegenstandsbereich** | NICHT IN GK (korrekt) | — | = GPG-Perspektive. Wird in DIDAKTIK_RAHMEN gesetzt. S1 nutzt diese Information als Input. **Indirekt referenziert, kein eigenes Kriterium noetig.** |
| **8. Prozessbezogene Kompetenzen** | NICHT IN GK | — | Prozessbezogene Kompetenzen (Erkenntnisse gewinnen, Beurteilen, Handeln) sind im bayerischen LP die uebergeordnete Kompetenzebene. Fuer unsere Pipeline: implizit durch Aufgabentyp-Auswahl abgedeckt (GUETEKRITERIEN_AUFGABEN). **Kein Handlungsbedarf in GK.** |
| **9. Perspektive** | ABGEDECKT | S1 (Artikulationsschema-Konformitaet) | S1 erzwingt perspektiv-konformes Artikulationsschema. **Voll abgedeckt.** |
| **10. Stundenthema** | NICHT IN GK | — | Stundenthema = Mappen-Thema. Phase-0.1-Ebene. **Kein Handlungsbedarf.** |
| **11. Kommentar** | NICHT IN GK | — | Methodische Anmerkungen. In unserer Pipeline: sequenz_kontext-Objekte (S6) erfuellen eine analoge Funktion auf Material-Ebene. **Funktional substituiert.** |
| **12. Querverbindungen** | NICHT IN GK | — | Spiralcurriculum-Mapping im KE_KATALOG (VW/AN) deckt dies auf KE-Ebene ab. Innerhalb einer Mappe sind Querverbindungen kein Sequenzierungskriterium. **Kein Handlungsbedarf.** |

### SP-Planungsprinzipien vs. GK

| SP-Prinzip | Status in GK | Bewertung |
|---|---|---|
| **Ganzheitlicher Blick** | ABGEDECKT durch Architektur | Game-Cluster-Ebene (KE_KATALOG) + Mappen-Sequenzierung (GK) = zwei Zoom-Stufen. **Architektonisch geloest.** |
| **Kompetenzorientierung** | ABGEDECKT | KE_KATALOG als Constraint-System. S3 (TB-Knoten = Lernziel-Abdeckung). **Kern der Pipeline.** |
| **Vernetzung/Querverbindungen** | TEILWEISE | Spiralcurriculum im KE_KATALOG. Innerhalb einer Mappe: S9 (Uebergangs-Kohaerenz) stellt inhaltliche Verbindungen zwischen Materialien sicher. Cross-Mappen-Vernetzung nicht in GK (korrekterweise — liegt auf Game-Architektur-Ebene). **Ausreichend.** |
| **Differenzierung** | NICHT IN GK (korrekt) | Separate Schicht (DE-2). **Bewusste Scope-Grenze.** |
| **Flexibilitaet** | NICHT IN GK (korrekt) | Flexibilitaet ist ein Planungsprinzip fuer Lehrkraefte. In einer standardisierten Pipeline: Flexibilitaet wird durch Modularitaet (austauschbare Exemplare im KE_KATALOG) und durch den AGENT_DIDAKTIK (Themenauswahl-Freiheit) gewaehrleistet. **Architektonisch geloest, kein GK-Kriterium noetig.** |
| **Kooperation** | N/A | Bezieht sich auf Zusammenarbeit zwischen Lehrkraeften. Fuer unsere Pipeline nicht relevant. |

---

## 4. Identifizierte Luecken

### 4.1 Luecke L1: Geschichtsdidaktische Idee als Sequenz-Anker [UPGRADE: HOCH]

**Brauch-Prinzip:** Die Planung beginnt mit einer "geschichtsdidaktischen Idee" — einer fachlich fundierten, didaktisch begruendeten Leitidee, die kognitive Aktivierung erzeugt.

**GPG-GB-Bestaetigung (Skript 1, Sektion 3.3.2 Modell 2):** Die geschichtsdidaktische Idee ist nicht optional — sie IST die Problemstruktur, die das gesamte Artikulationsschema durchzieht. Modell 2 zeigt: Problemfindung (Motivation) → Problemloesung (Vergegenwaertigung) → Problemauswertung (Besinnung) → Ergebnissicherung (Bewaeltigung). Das Problem ist der rote Faden. Ohne explizite geschichtsdidaktische Idee wird SCPL (S→C→P→L) eine mechanische Struktur ohne kognitive Kohaerenz.

**Ist-Zustand in Pipeline:** AGENT_DIDAKTIK generiert DIDAKTIK_RAHMEN mit Leitfrage, Perspektive, KE-Matrix. Aber: (a) ob die Leitfrage als Problemstruktur die gesamte Materialsequenz durchzieht, wird in S1-S15 nicht geprueft; (b) SCPL wird formal erzwungen (S14), aber die Verbindung "S14-Monotonie MUSS aus der geschichtsdidaktischen Idee folgen, nicht aus formaler Zuordnung" fehlt.

**Handlungsbedarf:** HOCH. Zweifacher Eingriff noetig:
1. **AGENT_DIDAKTIK-Spec:** Pflichtfeld `geschichtsdidaktische_idee` im DIDAKTIK_RAHMEN. Format: "Die Leitfrage [X] erzeugt die Problemstruktur [S: ..., C: ..., P: ..., L: ...]". Damit wird die SCPL-Struktur des Tafelbilds nicht post-hoc formalisiert, sondern aus der didaktischen Idee abgeleitet.
2. **S14 Schaerfung (optional):** Ergaenzender Pruefhinweis: "Die SCPL-Zuordnung muss inhaltlich aus der geschichtsdidaktischen Idee im DIDAKTIK_RAHMEN ableitbar sein, nicht nur formal monoton."

**Nicht-Eingriff in GK vertretbar, wenn AGENT_DIDAKTIK das Pflichtfeld zuverlaessig liefert.** Die Luecke liegt primaer in Phase 0.1, nicht in Phase 1.9.

### 4.2 Luecke L2: Lernaufgaben-Hierarchie (1. und 2. Ordnung)

**Brauch-Prinzip:** Lernaufgaben 1. Ordnung (uebergeordnete Problemstellung der gesamten Reihe) und 2. Ordnung (Einzelstunden-Beitraege zur uebergeordneten Frage).

**Ist-Zustand:** Game-Cluster = implizite Lernaufgabe 1. Ordnung. Mappen = implizite Lernaufgaben 2. Ordnung. Aber: die explizite Verknuepfung ("Mappe X traegt Teilergebnis Y zur uebergeordneten Frage Z bei") ist nicht formalisiert.

**Handlungsbedarf:** MITTEL, aber nicht in GK. Gehoert auf Game-Architektur-Ebene (ORCHESTRATOR oder Game-Rahmen-Dokument). **Empfehlung: Im ORCHESTRATOR oder einem neuen Artefakt GAME_RAHMEN die Lernaufgabe 1. Ordnung explizit benennen und Mappen als Beitraege zuordnen. Nachrangig gegenueber Phase-0-Standardisierung.**

### 4.3 Luecke L3: Kontextualisierung als explizites Prinzip

**Brauch-Prinzip:** Medien muessen Kontextualisierung ermoeglichen — SuS sollen historische Ereignisse in groessere Zusammenhaenge einordnen koennen.

**Ist-Zustand:** S2 (Vorwissen-Progression) stellt sicher, dass Konzepte vor ihrer Referenzierung eingefuehrt werden. S8 (Kontextgebot Quellenarbeit) fordert Kontext vor Quellenarbeit. Aber: "Kontextualisierung" als explizites Qualitaetsmerkmal (= jedes Material verortet seinen Inhalt im groesseren Zusammenhang) ist nicht kodifiziert.

**Handlungsbedarf:** GERING. S2 + S8 + S9 (Uebergangs-Kohaerenz) decken die Funktion ab. Kontextualisierung als eigenes Kriterium waere redundant. **Kein Handlungsbedarf.**

---

## 5. Schaerfungsbedarf an bestehenden Kriterien

### 5.1 S10 (Aktivierung am Sequenzbeginn) — Brauch-Abgleich

**Brauch:** Einstieg soll "kognitiv aktivieren" und "Relevanz aufzeigen" (Gegenwartsbezug). S10 fordert: Vorwissen aktivieren ODER Neugier wecken. Keine neuen Fachbegriffe.

**Befund:** S10 ist konsistent mit Brauch, aber etwas enger formuliert. Brauch betont zusaetzlich: Gegenwartsbezug im Einstieg. Fuer die Pipeline ist dies eine AGENT_DIDAKTIK-Entscheidung (Einstiegsmaterial mit Lebensweltbezug), nicht ein Sequenzierungskriterium.

**Empfehlung:** S10 bleibt unveraendert. Lebensweltbezug-Annotation im KE_KATALOG (bereits vorhanden) informiert AGENT_DIDAKTIK ueber Einstiegs-Potenzial.

### 5.2 S11 (Materialtyp-Vielfalt) — Brauch-Abgleich

**Brauch:** "Methodenvielfalt", "Multiple Document Literacy", "unterschiedliche Medien". S11 fordert: mindestens 2 verschiedene Materialtypen pro Mappe.

**Befund:** S11 ist minimalistisch (≥2 Typen). Brauch wuerde staerkere Diversitaet fordern (Primaer-/Sekundaerquellen, verschiedene Medienarten). Fuer R7-Mappen mit 3-5 Materialien ist ≥2 angemessen.

**Empfehlung:** S11 bleibt unveraendert. Staerkere Diversitaet waere KANN-Kriterium mit fraglichem Mehrwert bei kleinen Mappen.

---

## 6. Verwertungsbilanz

### 6.1 Brauch-Uebersicht

| Element | Verwertung | Ziel |
|---|---|---|
| Reflektiertes Geschichtsbewusstsein | BEREITS ABGEDECKT | Pipeline-Gesamtziel (implizit in KE-Formulierungen) |
| 4 Grundprinzipien | 2 ABGEDECKT (Problemorientierung, Multiperspektivitaet), 2 ARCHITEKTONISCH GELOEST (Gegenwartsbezug, Handlungsorientierung) | Keine GK-Aenderung noetig |
| 5 Kompetenzbereiche | 3 INDIREKT ABGEDECKT (Sach, Orientierung, Urteil), 2 IN ANDEREN KATALOGEN (Methode, Frage) | Keine GK-Aenderung noetig |
| Geschichtsdidaktische Idee | LUECKE L1 | Pruefpunkt in AGENT_DIDAKTIK-Spec |
| Lernaufgaben 1./2. Ordnung | LUECKE L2 | Game-Architektur-Ebene |
| Diagnose/Foerderung/Differenzierung | OUT OF SCOPE (korrekt) | Bewusste Scope-Grenze |

### 6.2 Sequenzplanungs-Anleitung

| Element | Verwertung | Ziel |
|---|---|---|
| 12-Komponenten-Template | 10 von 12 IN PIPELINE-ARCHITEKTUR ABGEDECKT (KE_KATALOG, DIDAKTIK_RAHMEN, sequenz_kontext). 2 N/A (Datum, Kooperation) | Keine GK-Aenderung noetig |
| 6 Planungsprinzipien | 3 ABGEDECKT, 2 ARCHITEKTONISCH GELOEST, 1 N/A | Keine GK-Aenderung noetig |
| Beispiel-Sequenz (Aegypten) | NUTZBAR als Referenz | Validierung: Stimmen unsere S1-S15 mit der Beispielstruktur ueberein? |

### 6.3 Gesamturteil

**GUETEKRITERIEN_SEQUENZIERUNG v1.1 ist fachdidaktisch solide.** Die beiden Ressourcen decken keine signifikanten Luecken auf, die in S1-S15 geschlossen werden muessten. Die identifizierten Luecken L1-L3 betreffen andere Architektur-Ebenen (AGENT_DIDAKTIK, ORCHESTRATOR), nicht die Materialsequenzierung.

Die Haupterkenntnis: Die bestehenden Quellen (Fachdidaktische Grundlagentexte AG MS-Seminarleiter) waren bereits die richtige Grundlage. Brauch liefert den theoretischen Ueberbau, den die Bausteine operationalisiert haben. Die Sequenzplanungs-Anleitung liefert ein Planungs-Template, das unsere Pipeline-Architektur bereits in maschineller Form abbildet.

---

## 7. Offene Punkte fuer Skript-Analyse

Die folgenden Fragen koennten durch Analyse weiterer geschichtsdidaktischer Skripte geschaerft werden:

1. **Narrativitaet als Sequenzprinzip:** Gibt es in der Geschichtsdidaktik formalisierte Kriterien fuer narrative Kohaerenz innerhalb einer Materialsequenz (ueber S9 Uebergangs-Kohaerenz hinaus)?
2. **Kontroversitaet/Werturteilsbildung:** Gibt es Sequenzierungsregeln fuer kontroverse Themen (wann darf/muss eine Kontroverse eroeffnet werden in der Sequenz)?
3. **Quellenarten-Progression:** Gibt es fachdidaktische Normen fuer die Reihenfolge verschiedener Quellenarten (z.B. Sachtext vor Primaerquelle vor Sekundaerquelle)?
4. **Elementarisierungs-Stufen:** Gibt es operationalisierbare Elementarisierungs-Modelle, die ueber Schroeders "Einfaches vor Komplexem" hinausgehen?

Diese Fragen definieren den Analyse-Fokus fuer die angekuendigten 4-8 geschichtsdidaktischen Skripte.

---

## 8. Prozess: Skript-Einzeluebergabe

### 8.1 Rahmenbedingungen

- 4-8 geschichtsdidaktische Skripte (Universitaets-/Seminar-Texte)
- Token-effiziente Einzelanalyse pro Skript
- Kumulativer Erkenntnisgewinn ueber die Skript-Reihe

### 8.2 Ablauf pro Skript

1. **User laedt Skript hoch** (Upload oder Pfad)
2. **PM liest Skript** und prueft gegen:
   - a) Bestehende S1-S15 → Bestaetigung oder Widerspruch?
   - b) Offene Punkte aus Sektion 7 → Antworten?
   - c) KE_KATALOG GPG_R7 → Anwendbarkeitsbezug?
   - d) Schutzregeln R3-S1 bis R3-S4 → Konsistenz?
3. **PM dokumentiert Befund** als Appendix in diesem Dokument (Sektion 9.N)
4. **Nach letztem Skript:** Konsolidierter Gesamt-Befund → ggf. Patch-Vorschlaege fuer S1-S15 oder andere Artefakte

### 8.3 Analyse-Template pro Skript

```markdown
### 9.N — [Skript-Titel]

**Quelle:** [Autor, Titel, Kontext]
**Relevanz fuer Pipeline:** [HOCH/MITTEL/GERING]

**Bestaetigung bestehender Kriterien:**
- S[X]: [Befund]

**Neue Perspektiven:**
- [Perspektive]: [Beschreibung] → Handlungsbedarf: [JA/NEIN, wo]

**Antworten auf offene Punkte (Sektion 7):**
- Frage [N]: [Antwort oder "nicht adressiert"]

**Verwertungsentscheidung:** [INTEGRIEREN / NOTIEREN / VERWERFEN]
```

---

## 9. Skript-Einzelbefunde

### 9.1 — FD-Q1: Grundsaetze des GPG-Unterrichts

**Quelle:**  Fachdidaktische Grundlagentexte GPG, Baustein GB. 
**Relevanz fuer Pipeline:** HOCH — ist bereits Primaerquelle fuer S1-S15. Extraktion-Vollstaendigkeits-Pruefung.

**Bestaetigung bestehender Kriterien:**

- **S1:** Artikulationsschemata alle drei Perspektiven korrekt extrahiert. GK-Tabelle (S. 1, Sektion 2.1) stimmt mit FD-Q1 Sektionen 3.3, 4.3, 5.5 ueberein.
- **S5:** Vergegenwaertigung-Besinnung-Prinzip korrekt. FD-Q1 Modell 1 (S. 5-6) differenziert sachbezogene Besinnung (3.1: "Eindringen in den sachlichen Gehalt") und wertbezogene Besinnung (3.2: "Wertende Aufbereitung, Bezuege zur Gegenwart"). GK S5 bildet diese Zweistufigkeit korrekt ab.
- **S4:** Didaktische-Funktion-Sequenzlogik konsistent mit allen drei Strukturmodellen. Monotonie-Anforderung in S4 spiegelt die Phasenfolge aller drei Perspektiven.
- **S10:** Aktivierung am Sequenzbeginn gedeckt durch alle drei Modelle: historisch 1.1 "Motivation/Weckung der Aufmerksamkeit", geographisch 1. "Hinfuehrung", sozialpolitisch 1.1 "Problemorientierung/Darstellung einer Situation".
- **S7:** Vom Anschaulichen zum Abstrakten gedeckt durch Geographie-Prinzip "Exemplarisches Lernen" (4.2.3: "Vom Speziellen zum Allgemeinen, induktives Vorgehen").

**Neue Perspektiven:**

1. **Zwei Modelle fuer historische Perspektive:** FD-Q1 enthaelt Modell 1 (detailliert, 4 Hauptphasen mit Subphasen 1.1-1.4, 2.1-2.3, 3.1-3.2, 4) UND Modell 2 (kompakt, 4 Phasen: Motivation→Vergegenwaertigung→Besinnung→Bewaeltigung). GK S1 arbeitet mit einer Mischform. Kein Problem — beide Modelle sind konsistent, Modell 2 ist die Zusammenfassung von Modell 1. Aber: **Modell 1 liefert Sub-Phasen-Granularitaet**, die fuer AGENT_SKRIPT-Phasen-Annotation nuetzlich sein koennte (z.B. "Vermutungen" als eigene Sub-Phase vor "Informationsgewinnung").
   → Handlungsbedarf: NEIN fuer GK. JA fuer AGENT_SKRIPT-Spec (Sub-Phasen als optionale Annotation).

2. **Multikausalitaet** (3.2): "Erkennen unterschiedlicher Strukturen, Unterscheidung zwischen Ursache, Grund und Ausloeser." Nicht in S1-S15 (kein Sequenzierungs-Kriterium). Relevant fuer AGENT_SKRIPT: kausale Strukturen muessen differenziert dargestellt werden, nicht mono-kausal.
   → Handlungsbedarf: NEIN fuer GK. NOTIEREN fuer AGENT_SKRIPT/GUETEKRITERIEN_SKRIPT.

3. **Kontroversitaet** (3.2): "Deutungsabhaengigkeit historischen Wissens, fachwissenschaftliche Diskurse." Bereits in STR-05 (Multiperspektivitaet) adressiert.
   → Handlungsbedarf: NEIN.

4. **Narrative Kompetenz** (1.1): "Historisches Lernen ist Bildung von Geschichtsbewusstsein durch Erzaehlen. Eine zentrale Bedeutung nimmt hierbei die narrative Kompetenz ein." Dies verbindet sich direkt mit L1 (geschichtsdidaktische Idee): Die Idee MUSS narrativ strukturierbar sein, weil historisches Lernen narrativ funktioniert. SCPL IST eine Narrations-Struktur (Situation→Komplikation→Problem→Loesung = klassischer Erzaehlbogen).
   → Handlungsbedarf: Verstaerkt L1-Upgrade. AGENT_DIDAKTIK muss die geschichtsdidaktische Idee als narrativ formulierbare Problemstruktur liefern.

5. **Bewaeltigungsphase oeffnet neues Problem** (Modell 2, S. 7): "Entdeckung eines neuen Problems" als letzter Schritt der Bewaeltigungsphase. Fuer unsere Pipeline: Die Sicherung einer Mappe koennte einen Ausblick auf die naechste Mappe enthalten (Cross-Mappen-Verknuepfung).
   → Handlungsbedarf: GERING. Fuer ORCHESTRATOR als optionales Feature bei Multi-Mappen-Games. Nicht in GK.

6. **Geographie: "Vom Nahen zum Fernen"** (4.2.3): Grundprinzip des Geographie-Unterrichts. Nicht in S1-S15, weil aktueller Scope historische Perspektive (LB2). Bei zukuenftigen LB3/LB4-Mappen mit geographischer Perspektive muesste S7 um dieses Prinzip erweitert werden.
   → Handlungsbedarf: NEIN aktuell. NOTIEREN fuer zukuenftige Perspektiv-Erweiterung.

7. **Sozialpolitisch: Sehen→Beurteilen→Handeln** (5.3): Drei-Schritt-Grundsatz. S1 deckt dies ueber das Artikulationsschema ab (Problemstellung→Problementfaltung→Problemloesung→Wertung→Sicherung). Der Drei-Schritt ist die didaktische Kurzformel dafuer.
   → Handlungsbedarf: NEIN. Bereits abgedeckt.

8. **Sub-Phasen-Granularitaet aller drei Perspektiven:** FD-Q1 liefert deutlich mehr Subphasen als GK S1 abbildet. Beispiel historisch: 1.1 Motivation, 1.2 Zeitliche/raeumliche Einordnung, 1.3 Problemisolierung, 1.4 Zielangabe. Beispiel geographisch: 3.1 Vermutungen, 3.2 Zielklaerung, 3.3 Organisationsplanung, 3.4 Bearbeitung, 3.5 Ergebnispresentation. Diese Subphasen sind fuer Material-Sequenzierung zu granular (eine Mappe hat 3-5 Materialien, nicht 12+ Subphasen), aber fuer AGENT_SKRIPT-Strukturierung wertvoll.
   → Handlungsbedarf: NEIN fuer GK. NOTIEREN fuer AGENT_SKRIPT.

**Antworten auf offene Punkte (Sektion 7):**

- **Frage 1 (Narrativitaet):** TEILWEISE BEANTWORTET. FD-Q1 bestaetigt: Historisches Lernen ist narrativ ("Bildung von Geschichtsbewusstsein durch Erzaehlen"). Aber: formalisierte Kriterien fuer narrative Kohaerenz ueber S9 hinaus liefert FD-Q1 nicht. Die Narrativitaet wird als Grundprinzip gesetzt, nicht als Pruefkatalog operationalisiert.
- **Frage 2 (Kontroversitaet):** NICHT ADRESSIERT als Sequenzregel. Kontroversitaet wird als Prinzip genannt (3.2), aber ohne Sequenzierungsvorschrift ("wann in der Sequenz darf eine Kontroverse eroeffnet werden").
- **Frage 3 (Quellenarten-Progression):** NICHT ADRESSIERT. FD-Q1 nennt diverse Quellenarten (Modell 2 Vergegenwaertigungsphase: "Quellen, Medien, Lehrerbericht, -erzaehlung") ohne Reihenfolge-Norm.
- **Frage 4 (Elementarisierungs-Stufen):** TEILWEISE BEANTWORTET. Modell 1 Subphasen implizieren eine Elementarisierung: erst "Vergegenwärtigung der geschichtlichen Inhalte" (2.1-2.3), dann "Eindringen in den sachlichen Gehalt" (3.1). Das ist eine Zwei-Stufen-Elementarisierung (Oberflaechenwissen→Tiefenstruktur), aber kein formales Modell.

**Verwertungsentscheidung:** INTEGRIEREN (L1-Upgrade bestaetigt, Sub-Phasen-Granularitaet als AGENT_SKRIPT-Input notiert, 2 von 4 offenen Fragen teilweise beantwortet).

### 9.2 — FD-Q2: Vergegenwaertigung im Geschichtsunterricht und die Bedeutung der Besinnungsphase

**Quelle:**  Fachdidaktische Grundlagentexte GPG, Baustein B1. 
**Relevanz fuer Pipeline:** HOCH — Primaerquelle fuer S5 (Vergegenwaertigung vor Besinnung) und Sektion 2.2 (Roths 10 Forderungen). Extraktion-Vollstaendigkeits-Pruefung.

**Bestaetigung bestehender Kriterien:**

- **S5:** Kernkriterium dieses Dokuments. Bestaetigt und praezisiert: Vergegenwaertigung = Kenntnisse (geschichtlicher Vordergrund, Faktenwissen), Besinnung = Erkenntnisse (geschichtlicher Hintergrund, Tiefendimension). Diagramm S. 12 zeigt den Abstraktionsprozess explizit. S5-Operationalisierung (sachbezogene vor wertbezogener Besinnung) ist korrekt aus §10 extrahiert.
- **S7 (Vom Anschaulichen zum Abstrakten):** Direkt bestaetigt durch den Abstraktionsprozess-Pfeil (S. 12): Vergegenwaertigung→Besinnung = konkret→abstrakt = Vordergrund→Hintergrund. S7 ist die Generalisierung dieses Prinzips.
- **S8 (Kontextgebot Quellenarbeit):** Verstaerkt durch §11 Karikaturen: "verlangen Abstraktionsfaehigkeit, Symbole muessen gedeutet werden (Sachwissen!)". Karikaturen erfordern MEHR Vorwissen als Standard-Bildquellen → S8 greift hier besonders strikt.
- **S13 (Personalisierung in Fruehphase):** Bestaetigt durch Roth #7 ("personalisieren, lokalisieren, in Szene setzen") und §7.5 Gestaltungsprinzip "Personifiziere". Schutzregel R3-S2 (Starke Identifikationsfiguren) ist direkt aus diesem Baustein abgeleitet.
- **Schutzregeln R3-S1 bis R3-S4:** Alle vier Schutzregeln sind in FD-Q2 fundiert: R3-S1 (niedrigschwelliger Einstieg) = Roth #9 (Sozialsprache), R3-S2 (Identifikationsfiguren) = Roth #7 + §7, R3-S3 (visuelle Klarheit) = Roth #2/#3, R3-S4 (emotionale Ansprache) = §7.3 ("Erzaehlungen wecken Emotionen und Affekte").

**Neue Perspektiven:**

1. **Roths 10 Hauptforderungen — Vollstaendigkeits-Check:** GK Sektion 2.2 listet 6 der 10 Forderungen. Die 4 fehlenden:
   - Roth #3 (graphisch/kartographisch Darstellbares zugaenglich machen): Materialproduktions-Ebene, nicht Sequenzierung. Kein GK-Bedarf.
   - Roth #4 (wirkliche Begegnung mit Ueberresten, Dokumenten): Im Escape-Game-Kontext nur als digitale Reproduktion moeglich. Kein GK-Bedarf, aber AGENT_MATERIAL-Hinweis: wenn moeglich, digitalisierte Originalquellen verwenden.
   - Roth #8 (Zeitatmosphaere durch Detailschilderung und farbenkraeftiges Kolorieren): AGENT_SKRIPT-Produktionsregel, nicht Sequenzierung.
   - Roth #9 (abstrakte Begriffe vermeiden, Sozialsprache): Sprachregister-Frage. S12 (Sprachregister-Progression) deckt dies als KANN-Kriterium ab. Kein Schaerfungsbedarf.
   → Handlungsbedarf: NEIN fuer GK. Die 4 fehlenden Forderungen sind korrekterweise nicht in S1-S15, weil sie Produktions-Kriterien sind, keine Sequenzierungs-Kriterien.

2. **Kausalzusammenhang dynamisch vs. Strukturzusammenhang statisch** (§10.1): Sachbezogene Besinnung unterscheidet zwei Formen: (a) dynamischer Kausalzusammenhang (Ursache→Wirkung im zeitlichen Nacheinander, z.B. Weltwirtschaftskrise→Arbeitslose→Radikalisierung) und (b) statischer Strukturzusammenhang (Gegenstand determiniert durch viele Komponenten in Wechselbeziehung). Fuer die Pipeline: SCPL bildet primaer dynamische Kausalzusammenhaenge ab (S→C→P→L = zeitliche Abfolge). Statische Strukturzusammenhaenge (z.B. Gesellschaftspyramide, Feudalsystem) erfordern moeglicherweise ein anderes SCPL-Muster (S = Zustand, C = Spannung im System, P = Widerspruch, L = Erkenntnis ueber Struktur).
   → Handlungsbedarf: NOTIEREN fuer AGENT_HEFTEINTRAG. SCPL muss beide Zusammenhangstypen abbilden koennen. Kein GK-Eingriff, aber Pruefpunkt bei SCPL-Erstellung.

3. **Erzaehlung als didaktisches Kernmedium der Vergegenwaertigung** (§7): Umfangreiche Behandlung (Gestaltungsprinzipien, Vor-/Nachteile, Beispiel "Der arme Konrad"). Fuer die Pipeline: Der SKRIPT-Output IST funktional eine Geschichtserzaehlung — er muss die Gestaltungsprinzipien (§7.5: Detailliere, Motiviere, Verkindliche, Dramatisiere, Personifiziere, Lokalisiere, Kostümiere, Vereinfache) einhalten. §7.7 warnt vor Nachteilen: Personalisierung kann zur "Geschichte grosser Maenner" verzerren, suggestive Darstellung kann manipulieren.
   → Handlungsbedarf: NOTIEREN fuer GUETEKRITERIEN_SKRIPT. 8 Gestaltungsprinzipien als Pruefpunkte. §7.7-Warnungen als Anti-Patterns (Ueberbetonung Akteure, suggestive Darstellung, Geschlossenheit auf Kosten von Genauigkeit). Kein GK-Eingriff.

4. **Roth #10 und Teleologie-Warnung:** "Die oft sehr verwickelten kausalen, teleologischen und anderen Zusammenhaenge sind auf die Hauptlinie zu vereinfachen, ohne dass die Tatsachen selbst verbogen oder verfaelscht werden." Dies BESTAETIGT die Teleologie-Warnung im KE_KATALOG_GPG_R7 (§9): Vereinfachung ja, aber keine teleologische Verformung ("es musste so kommen"). Roth selbst fordert: vereinfachen, nicht verfaelschen.
   → Handlungsbedarf: NEIN. Bereits im KE_KATALOG verankert.

5. **Karikaturen als Sonder-Materialtyp** (§11): Karikaturen erfordern: (a) Sachwissen als Voraussetzung, (b) Abstraktionsfaehigkeit, (c) politische Sensibilitaet. Fuer die Pipeline: Wenn AGENT_MATERIAL eine Karikatur in die Sequenz einbaut, muss S8 besonders strikt angewendet werden — Karikatur darf NIE an Position 1 stehen und braucht mindestens 2 vorausgehende Kontextmaterialien.
   → Handlungsbedarf: GERING. S8 deckt dies generisch ab ("Quellenarbeit braucht Kontext"). Optionale Schaerfung: Karikatur als Spezialfall in S8-Operationalisierung erwaehnen. **Empfehlung: Bei naechster GK-Revision als Anmerkung in S8 ergaenzen, nicht blockierend.**

**Antworten auf offene Punkte (Sektion 7):**

- **Frage 1 (Narrativitaet als Sequenzprinzip):** BEANTWORTET. FD-Q2 §7 liefert die Begruendung: Erzaehlung ist das didaktische Kernmedium der Vergegenwaertigungsphase. Die 8 Gestaltungsprinzipien (§7.5) sind formalisierte Kriterien fuer narrative Qualitaet — allerdings auf Produktions-Ebene, nicht auf Sequenzierungs-Ebene. Fuer Sequenzierung gilt: das narrative Material MUSS in der fruehen Sequenzhaelfte stehen (= S5 + S13). Narrative Kohaerenz ueber die gesamte Sequenz ist eine AGENT_SKRIPT-Verantwortung, nicht GK.
- **Frage 2 (Kontroversitaet):** NICHT ADRESSIERT. FD-Q2 behandelt Kontroversitaet nicht.
- **Frage 3 (Quellenarten-Progression):** TEILWEISE BEANTWORTET. §11 etabliert eine implizite Hierarchie: Karikaturen erfordern mehr Vorwissen als Standard-Bildquellen, Standard-Bildquellen mehr als Darstellungstexte. Daraus folgt eine Sequenzierungsregel: Darstellungstext → Bildquelle → Karikatur → Quellentext (aufsteigend nach Kontextbedarf). Aber: FD-Q2 formalisiert diese Reihenfolge nicht explizit. Sie ergibt sich logisch aus S2 (Vorwissen-Progression) + S8 (Kontextgebot).
- **Frage 4 (Elementarisierungs-Stufen):** BEANTWORTET. §3 (Aufgabe des Lehrers) und §9.2 (Diagramm) liefern ein Zwei-Stufen-Modell: (1) Vergegenwaertigung = Elementarisierung auf Faktenniveau (Kenntnisse, Vordergrund, Addition historischer Fakten), (2) Besinnung = Abstraktion auf Erkenntnissniveau (Erkenntnisse, Hintergrund, Zusammenhang/Einordnung/Wertung). Das ist kein mehrstufiges Elementarisierungsmodell, sondern eine binaere Unterscheidung. Fuer unsere Pipeline: Die SCPL-Struktur bildet dies ab — S/C = Vergegenwaertigungsebene (was passiert?), P/L = Besinnungsebene (was bedeutet es?).

**Verwertungsentscheidung:** INTEGRIEREN (S5 bestaetigt, Roth-Extraktion vollstaendig, 3 AGENT_SKRIPT-Notizen, Karikatur-Sonderfall fuer S8, 3 von 4 offenen Fragen jetzt beantwortet oder teilbeantwortet).
