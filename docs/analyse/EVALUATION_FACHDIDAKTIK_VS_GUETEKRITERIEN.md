# Evaluation: Fachdidaktische Ressourcen vs. GUETEKRITERIEN_SEQUENZIERUNG

**Datum:** 2026-04-07
**Scope:** Brauch-Geschichtsdidaktik-Uebersicht + Sequenzplanungs-Anleitung vs. S1-S15 (v1.1)
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

### 4.1 Luecke L1: Geschichtsdidaktische Idee als Sequenz-Anker

**Brauch-Prinzip:** Die Planung beginnt mit einer "geschichtsdidaktischen Idee" — einer fachlich fundierten, didaktisch begruendeten Leitidee, die kognitive Aktivierung erzeugt.

**Ist-Zustand in Pipeline:** AGENT_DIDAKTIK generiert DIDAKTIK_RAHMEN mit Leitfrage, Perspektive, KE-Matrix. Aber: ob diese Leitfrage als roter Faden die gesamte Materialsequenz durchzieht, wird in S1-S15 nicht explizit geprueft.

**Handlungsbedarf:** GERING. S14 (SCPL-Korrespondenz) erzwingt implizit eine Sinnstruktur, die einer Leitfrage entspricht (S→C→P→L = Situation aufwerfen → verkomplizieren → Problem benennen → loesen). Dennoch waere eine explizite Annotation im DIDAKTIK_RAHMEN ("Geschichtsdidaktische Idee: ...") sinnvoll. **Empfehlung: Pruefpunkt in AGENT_DIDAKTIK-Spec, nicht in GK.**

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

Die Haupterkenntnis: Die bestehenden Quellen (Bausteine Fachdidaktik AG MS-Seminarleiter) waren bereits die richtige Grundlage. Brauch liefert den theoretischen Ueberbau, den die Bausteine operationalisiert haben. Die Sequenzplanungs-Anleitung liefert ein Planungs-Template, das unsere Pipeline-Architektur bereits in maschineller Form abbildet.

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

(Wird sukzessive befuellt bei Skript-Uebergabe durch User.)
