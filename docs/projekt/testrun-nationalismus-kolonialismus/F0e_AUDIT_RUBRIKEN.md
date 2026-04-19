# F0e Audit-Rubriken — Didaktische PQI-Bewertung

**Version:** 1.0 (2026-04-19)
**Status:** READY fuer Subagent-Konsum (Agent-α + Agent-β)
**Parent-Plan:** `F0e_DIDAKTISCHES_AUDIT_PLAN.md` v1.1
**Scope:** Escape-Game "Deutscher Nationalismus & Kolonialismus" (R7 GPG Mittelschule Bayern), 3 Mappen, deployed + Source-Artefakte.

---

## 1. Zweck

Dieses Dokument operationalisiert die 6 PQI-Dimensionen aus dem F0e-Plan §3. Jede Dimension ist mit konkreten Level-Kriterien (PQI-1/2/3) + R7-GPG-spezifischen Beispielen + Edge-Cases spezifiziert, sodass Subagenten konsistente Bewertungen produzieren und Inter-Rater-Agreement maximiert wird.

**Anwendungs-Modus:** Subagent prueft jedes Finding/PI aus `PRE_PILOT_TRIAGE_MATRIX.md` v1 **plus** neue F-RA6-Findings gegen **alle 6 Dimensionen**. Finaler Finding-PQI = **Max** (= strengster, niedrigste Zahl). Begruendung muss angeben, welche Dimension den Max-Score getrieben hat.

---

## 2. PQI-Skala (Ueberblick)

| Level | Name | Semantik | Handlungs-Konsequenz |
|---|---|---|---|
| **PQI-1** | Fundamental | Lernziel wird aktiv gebrochen; Material produziert Fehllernen, macht Aufgabe unloesbar, oder waere ethisch/fachlich nicht vertretbar. | MUSS vor Pilot behoben werden, unabhaengig von Trigger-Probability. |
| **PQI-2** | Ernsthaft | Lernerfahrung messbar degradiert, aber Lehrkraft-Intervention oder Schueler-Selbstkorrektur kompensiert. Material bleibt nutzbar. | SOLL vor Pilot behoben werden, bei Klasse-A-Re-Klassifikation. |
| **PQI-3** | Kosmetisch | Defekt ohne didaktische Relevanz. Aesthetik, minor-Formulierung, Typografie. | KANN warten. Pilot-tolerabel. |

**Konservativ-Regel:** Bei Unsicherheit zwischen zwei Levels → **niedrigere Zahl** (= strenger). Begruendung: Schueler erleben den schlimmsten Punkt, nicht den Durchschnitt.

---

## 3. Dimensions-Definitionen

### D1 — Lernziel-Alignment

**Kern-Frage:** Adressiert das Artefakt LehrplanPlus R7 GPG (Nationalismus/Kolonialismus eingebettet in LB2 §6.2 "Zeit und Wandel") operativ — oder beruehrt es das Thema nur dekorativ?

**Primaer-Quelle:** `docs/fachdidaktik/LEHRPLAN_QM_GPG7_MITTELSCHULE.md` v1.0 (kanonisches LP-Fundamentartefakt).

**Fokus-Sektionen in LP-QM:**
- §6.2.1 Kompetenzerwartungen LB2 (verbatim) — insbesondere Spiegelpunkt "Imperialismus/Kolonialismus muendete in den Ersten Weltkrieg"
- §6.2.4 OH-5 (Ursachen vs. Ausloeser), OH-3 (Industrialisierung aus unterschiedlichen Perspektiven) — fuer Kolonialismus analog anwendbar
- §6.2.5 Coverage-Pruefpunkte CP-3/CP-8 (Perspektiv-Gegenueberstellung, Opferperspektive Pflicht bei Kolonialismus)
- §6.2.6 Beispielpaar 3 Kolonialismus Afrika (kompetent vs. nicht-kompetent) — direkt vergleichbar
- §6.2.7 UebZ-Verknuepfung U06 Kern (Interkulturelle Bildung) + U10 Kern + U15 Kern
- §6.2.8 AP-2 (Kolonialismus als Ressourcen-Wettrennen ohne Opferperspektive), AP-1 (Jahreszahlen-Quiz), AP-6 (Industrialisierung als Technik-Maerchen) — PQI-1-Trigger-Quellen

**Nutzungs-Regel:**
- Score D1 basiert auf LP-QM-Verweis, NICHT auf freier WebSearch.
- WebSearch nur noch als Backup bei LP-QM-Luecken (selten).
- Zitier-Format: `LP-QM §6.2.X (v1.0): > <verbatim>` statt frei gegoogelte URLs.

**Level-Kriterien:**

**PQI-1 Fundamental (Lernziel-Bruch):**
- Artefakt adressiert Thema, das NICHT im R7-GPG-Lehrplan liegt (z.B. Reformation als Kern-Narrativ)
- Artefakt zementiert ein Gegen-Lernziel (z.B. unkritisches Kolonial-Heroisieren bei explizitem Lehrplan-Ziel Multiperspektivitaet)
- Kompetenz-Behauptung in Lehrkraft-Material (`lehrkraft.html`, `PROGRESSIONSPLAN.md`) widerspricht tatsaechlichem Aufgaben-Output (Kompetenz-Etikett-Schwindel)

**PQI-2 Ernsthaft (Alignment-Luecke):**
- Lehrplan-Kompetenz beruehrt, aber nur auf niedrigster Anforderungsstufe (nur Wiedergabe, wo Urteil gefordert)
- Methoden-Kompetenz nicht operationalisiert (z.B. Quellenkritik genannt aber keine Quelle kritisiert)
- Orientierungskompetenz (Gegenwartsbezug) genannt aber nicht gezogen
- Ein Teil-Inhalt aus 7.3 gaenzlich ignoriert (z.B. kein Bezug zu dt. Kolonialverbrechen Herero/Nama trotz Kern-Lehrplan-Punkt)

**PQI-3 Kosmetisch (Alignment intakt, minor):**
- Kompetenz-Formulierung im Lehrkraft-Material unscharf, aber Aufgabe liefert Kompetenz-Training
- Nebenthema nicht adressiert, das im Lehrplan nur als Exempel genannt ist

**R7-GPG-Beispiele fuer N-K:**
- PQI-1-Trigger: "Die deutschen Kolonialherren brachten Zivilisation nach Afrika." (positiv-wertende Aussage ohne Dekonstruktion) → Gegenposition zu LP-Urteilskompetenz
- PQI-2-Trigger: Aufgabe fragt nur "Nenne drei deutsche Kolonien" (Reproduktion), obwohl LP Urteil fordert
- PQI-3-Trigger: Lehrkraft-Material verwendet "Imperialismus" synonym zu "Kolonialismus" — fachlich unscharf, aber Schueler-Aufgabe bleibt korrekt

---

### D2 — Fachliche Korrektheit

**Kern-Frage:** Sind die historischen Aussagen (Fakten, Datumsangaben, Zuschreibungen, Kontext) korrekt? Werden Kontroversen/Multiperspektivitaet angemessen gehandhabt?

**Level-Kriterien:**

**PQI-1 Fundamental (Falsche Tatsache oder ethisch-fachlicher Bruch):**
- Historische Falschaussage (falsches Datum eines Ereignisses, falsche Person, erfundenes Ereignis)
- Einseitige Darstellung kolonialer Gewalt ohne Opfer-Perspektive (bei N-K: Herero/Nama-Voelkermord verharmlost oder nicht genannt)
- Anachronistische Zuschreibungen (z.B. moderne Nationalstaats-Begriffe auf vor-1800 angewandt)
- Quellen-Falschzuordnung (Bild X als Bild Y bezeichnet — Hallu-Caption wie bei P0-A5)
- Rassistische Terminologie unkommentiert reproduziert

**PQI-2 Ernsthaft (Verkuerzung oder Einseitigkeit ohne vollstaendigen Bruch):**
- Komplexer Sachverhalt stark vereinfacht mit Verzerrungs-Risiko (z.B. "der" Nationalismus ohne Differenzierung Formen)
- Multiperspektivitaet beruehrt aber nicht ausgefuehrt (nur eine Seite zitiert)
- Kontroversen in Forschung nicht transparent (z.B. Schuldfrage 1. Weltkrieg)
- Veraltete Forschungsstand-Darstellung
- Quellen-Einordnung fehlt (Quelle ohne Kontext-Angabe zu Autor/Entstehungskontext)

**PQI-3 Kosmetisch (Unschaerfe ohne Verzerrung):**
- Formulierung ungluecklich aber inhaltlich korrekt
- Begriff austauschbar verwendet ohne Interpretations-Risiko

**R7-GPG-Beispiele:**
- PQI-1-Trigger: "Deutsch-Suedwestafrika war eine Handelskolonie." (irrefuehrend; war Siedlungskolonie mit Kriegsverbrechen) — bei Schwerpunkt Kolonialismus kritisch
- PQI-2-Trigger: Narrativ erwaehnt dt. Kolonien aber nicht Herero-Nama-Genozid (unvollstaendig, nicht falsch)
- PQI-3-Trigger: "Um 1900" wo "zwischen 1884 und 1914" praeziser waere

---

### D3 — Didaktische Strukturierung

**Kern-Frage:** Progression sinnvoll? Scaffolding fuer heterogene Mittelschul-Jahrgangsstufe vorhanden? Differenzierungs-Angebote? Kognitive-Last-Management ueber Mappe 1 → 2 → 3?

**Level-Kriterien:**

**PQI-1 Fundamental (Strukturelle Unbrauchbarkeit):**
- Kein sinnvoller Aufbau (Mappe 3 setzt Inhalte voraus, die in Mappe 1/2 nicht vorkommen UND nicht dort sind, wo sie geholt werden koennten)
- Aufgabe ohne Vor-Wissen-Aufbau loesbar → Material ist nicht Lern-Material sondern Test
- Kein Scaffolding fuer schwache Lerner: Aufgabe springt direkt auf hohe Anforderungsstufe
- Rahmen-Einstieg-Konflikt: Narrativ widerspricht Aufgaben-Rahmen (siehe R0-FINAL+ Item 3)

**PQI-2 Ernsthaft (Progressions-Luecke oder Differenzierungs-Lueck):**
- Sprung in Schwierigkeit zwischen Mappen nicht didaktisch begruendet
- Keine Differenzierungs-Angebote (Hinweis-System, Tipp-Karten, Staffelung)
- Scaffolding unvollstaendig (z.B. Vokabular-Hilfe nur sporadisch)
- Lueckentext-Pool gemischt mit hoher Schwierigkeit ohne Einstiegs-Orientierung
- Heft-Eintraege beziehen sich nicht klar auf Aufgaben-Ergebnisse

**PQI-3 Kosmetisch (Progression OK, minor):**
- Einzelne Aufgaben-Reihenfolge haette optimiert werden koennen
- Ueberleitungs-Text koennte praeziser

**R7-GPG-Beispiele:**
- PQI-1-Trigger: Mappe 3 Aufgabe zur Bewertung kolonialer Motive, obwohl Motive-Typologie in Mappe 1/2 nicht aufgebaut wurde
- PQI-2-Trigger: Mappe 1 fuehrt "Imperialismus" ein ohne Arbeit am Begriff, Mappe 3 nutzt ihn selbstverstaendlich
- PQI-3-Trigger: Ueberleitung zwischen Mappe 2 und 3 erklaert Thema, koennte staerker motivieren

---

### D4 — Schwierigkeits-Kalibrierung

**Kern-Frage:** Sprach-Niveau A2-B1 fuer Mittelschule R7 passend? Kognitive Last pro Aufgabe angemessen? Komplexitaet gestaffelt?

**Level-Kriterien:**

**PQI-1 Fundamental (Niveau-Fehlzielung):**
- Sprach-Niveau dauerhaft C1+ (akademisch) → Aufgaben nicht bearbeitbar
- Kognitive Last in Einzelaufgabe sprengt Arbeitsspeicher (z.B. 6+ Konzepte gleichzeitig ohne Strukturhilfe)
- Komplette Mappe wesentlich zu schwer/zu leicht fuer Jahrgangsstufe
- Abstraktionsniveau uebersteigt formal-operationales Denken systematisch

**PQI-2 Ernsthaft (Kalibrierungs-Drift):**
- Einzelne Aufgabe zu schwer/zu leicht im Mappen-Kontext
- Sprach-Register schwankt stark (z.B. Mappe 1 einfach, Mappe 2 ploetzlich akademisch)
- Fachbegriff ohne Definition erstmals eingesetzt
- Quellen-Text zu lang fuer Arbeitstempo

**PQI-3 Kosmetisch (im Zielkorridor mit minor-Abweichung):**
- Ein Satz haette einfacher formuliert sein koennen
- Wortlaenge einzelner Wahloptionen haette ausgeglichen sein koennen

**R7-GPG-Beispiele (Mittelschule R7 = 12-13 Jahre, sprachlich heterogen, oft Deutsch als Zweitsprache):**
- PQI-1-Trigger: Aufgabe verlangt Analyse eines Kaiser-Bismarck-Brief-Ausschnitts in Originalorthographie ohne Vereinfachung
- PQI-2-Trigger: Begriff "Nationalstaat" ohne Einfuehrung in Mappe 1
- PQI-3-Trigger: Wort "Souveraenitaet" statt "Selbstbestimmung"

---

### D5 — Narrativ-/Immersions-Kohaerenz

**Kern-Frage:** Story-Logik des Escape-Games konsistent? Raetsel-Kontext passt zu Narrativ? Motivationaler Aufbau ueber Mappe 1→3? Immersion nicht durch Mechanik-Bruch zerstoert?

**Level-Kriterien:**

**PQI-1 Fundamental (Immersions-Kollaps):**
- Narrativ-Rahmen bricht vollstaendig (z.B. Rahmen sagt "Detektivspiel 1914", Aufgaben fragen nach Inhalt auf Schulbuch-Niveau ohne Rollenbezug)
- Puzzle-Logik unloesbar im Narrativ-Kontext (fehlende Hinweise, Widersprueche zwischen Rahmen und Aufgabe)
- Raetsel-Loesung steht nicht zur Aufgabe in Bezug → Schueler fuehlt sich getaeuscht
- Narrativ macht Aufgaben-Beantwortung unethisch empfindbar (z.B. Schueler werden gebeten, in Rolle eines Kolonial-Herrn zu agieren, ohne Reflexions-Rahmen)

**PQI-2 Ernsthaft (Motivations-Drift, Kohaerenz-Luecken):**
- Rahmen-Story verliert sich in mittleren Mappen, wird spaet wieder aufgenommen
- Ueberleitungen bleiben formal ohne story-technische Funktion
- Mappen-Motivation unklar (warum jetzt DIESE Mappe?)
- Narrativ in `rahmen/` inkonsistent zu `ueberleitungen.json`
- Atmosphere-Elemente (wo vorhanden) in Loops ohne Mehrwert

**PQI-3 Kosmetisch (Immersion intakt, minor):**
- Ueberleitungs-Text koennte staerker motivieren
- Einzel-Rahmen-Formulierung bricht Register-Einhaltung kurz

**R7-GPG-Beispiele:**
- PQI-1-Trigger: Rahmen ist "Reporter in Afrika 1905", aber Aufgaben sind anonymisiert "Welche Jahreszahl..." ohne Rollen-Einbindung
- PQI-2-Trigger: Mappe 2 Raetsel fuehrt zu Zahlen-Code, der in Narrativ keine Bedeutung hat
- PQI-3-Trigger: Ueberleitung 2→3 ist formal, koennte narrative Spannung aufbauen

---

### D6 — Register / Inklusion / Diversitaet

**Kern-Frage:** Sprach-Register homogen und adressatengerecht? Gender- und herkunfts-sensible Formulierungen? Kolonial-Themen mit Multiperspektivitaet? Barrierefreiheit (Bild-Alt-Texte didaktisch, nicht nur technisch)?

**Level-Kriterien:**

**PQI-1 Fundamental (diskriminatorisch oder inklusions-sperrend):**
- Rassistische, sexistische oder herabsetzende Formulierung unkommentiert
- Einseitige Eurozentrik bei Kolonial-Themen (nur deutsche Perspektive, Stimmen der Kolonisierten nicht hoerbar)
- Barrierefreiheit-Bruch mit Lernziel-Konsequenz (Bild-Alt-Text nur "Bild", obwohl Bild-Inhalt Aufgaben-Relevanz hat)
- Sprachlich so voraussetzungsreich (Fremdwoerter ohne Glossar), dass DaZ-Schueler systematisch ausgeschlossen sind
- Rollen-Zuschreibungen diskriminierend (Frau = Gattin im Hintergrund, nicht-weisse Menschen als Objekt)

**PQI-2 Ernsthaft (Register-Inkonsistenz oder Inklusions-Luecke):**
- Register wechselt zwischen umgangssprachlich und akademisch ohne didaktische Funktion
- Multiperspektivitaet beruehrt, aber nicht operationalisiert
- Bild-Alt-Texte rein deskriptiv, keine didaktische Unterstuetzung
- Gendersensible Sprache unsystematisch
- Fachsprache und Alltagssprache unzureichend vermittelt

**PQI-3 Kosmetisch (Register OK, minor):**
- Einzelner Begriff weniger inklusiv als moeglich
- Bild-Alt-Text koennte bildungsspezifischer

**R7-GPG-Beispiele:**
- PQI-1-Trigger: Text nutzt "Neger" in Zitat ohne Einordnung/Kommentar → rassistisch-reproduktiv
- PQI-2-Trigger: Kolonial-Kapitel zitiert nur deutsche Kolonialbeamte, keine afrikanische Stimme
- PQI-3-Trigger: "Soldat" ueberall statt gelegentlich "Soldatin" bei dokumentierten Faellen

---

## 4. PQI-Max-Rule (Wie Finding-PQI berechnen)

Pro Finding: Dimensions-Score in D1-D6 vergeben. Finder-Finding-PQI = **min der 6 Zahlen** (= niedrigste = strengste). Begruendung MUSS angeben: `PQI-Treiber: D<N> (<Name>)` + 1-3 Saetze, warum diese Dimension den Max-Score lieferte.

**Beispiel:**
- Finding X: D1=3, D2=1, D3=3, D4=3, D5=3, D6=3 → Finding-PQI = 1, PQI-Treiber: D2 Fachliche Korrektheit (erfundene Jahreszahl zum Versailler Vertrag).

---

## 5. Evidenz-Standards

Jeder PQI-Score MUSS mit Evidenz belegt werden. Evidenz-Typen:

| Evidenz-Typ | Format | Beispiel |
|---|---|---|
| Datei-Zeile | `<relativer-pfad>:<zeile>` | `docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-2/materialien/mat-2-3.json:42` |
| JSON-Pfad | `<datei>#<jq-pfad>` | `data.json#.mappen[1].aufgaben[3].frage` |
| HTML-Selektor | `<datei>#<css-selector>` | `escape-games/deutscher-nationalismus-kolonialismus/mappe-2.html##aufgabe-2-3` |
| LP-QM-Sektion (Primaer) | `LP-QM §6.X.Y (v1.0)` + Kurzzitat | `LP-QM §6.2.1 (v1.0): "Imperialismus … muendete in den Ersten Weltkrieg"` |
| WebSearch-Quelle (Backup, selten) | `<URL> (abgerufen <datum>)` + Kurzzitat | `https://www.lehrplanplus.bayern.de/... (2026-04-19) "..."` |
| RA-Bericht-Verweis | `BERICHT_RA<n>_<scope>.md:<zeile>` | `BERICHT_RA2_DIDAKTIK_MATERIAL.md:156` |

**Regel:** Keine Evidenz → kein PQI. Bei Evidenz-Luecke Score mit `PQI-Tag: NO-EVIDENCE` markieren und zum Review-Pool legen.

---

## 6. LP-QM-Referenz-Protokoll (D1-spezifisch, ab 2026-04-19 v2)

**PRIMAER-QUELLE:** `docs/fachdidaktik/LEHRPLAN_QM_GPG7_MITTELSCHULE.md` v1.0.

**Pflicht:** Fuer jede D1-Bewertung, die sich auf konkrete Kompetenz-Erwartungen bezieht, MUSS der Subagent die relevante LP-QM-Sektion zitieren und gegen die 5 Q-Gates (§7 QG-01..QG-05) pruefen.

**Verwendung der LP-QM-Sektionen pro D1-Auditbefund:**

1. **LB-Zuordnung:** N-K-Material gehoert zu §6.2 (LB2 Zeit und Wandel, Kolonialismus im Imperialismus-Spiegelpunkt).
2. **Kompetenzerwartung zitieren:** §6.2.1 Spiegelpunkt verbatim.
3. **Operationalisierung pruefen:** §6.2.4 OH-3/OH-5 → ist prueferbare Handlung erreicht?
4. **Coverage-Schwelle berechnen:** §6.2.5 ≥6/10 CP + Pflicht-CP-1 + Pflicht-CP-4; bei Kolonialismus zusaetzlich CP-8 als Pflicht.
5. **UebZ-Kern-Check:** §6.2.7 → U06 Pflicht bei Kolonialismus; sichtbar durch Opferperspektive im Material.
6. **Anti-Pattern-Screen:** §6.2.8 → insbesondere AP-2 (Kolonialismus ohne Opferperspektive) als PQI-1-Trigger.

**Zitier-Format (Primaer):**
```
LP-QM §6.2.X (v1.0, 2026-04-19):
> <verbatim-Zitat>
```

**Backup WebSearch** (nur bei LP-QM-Luecke, selten):
- Such-Strategie: `site:lehrplanplus.bayern.de Mittelschule R7 GPG Imperialismus`
- Zitier-Format: `LehrplanPlus (abgerufen <ISO-Datum> von <URL>): > <Zitat>`

**Bei LP-QM- und WebSearch-Luecke:**
- Score mit Tag `[LP-QM-Verify-PENDING]` vergeben
- Alternative Begruendung (z.B. KMK-Bildungsstandards)
- Im Aggregate-Teil Liste aller PENDING-Tags

**Verbot:** Subagent darf KEINE Kompetenz-IDs oder Zitate aus Training-Data / Memory / Annahmen erfinden. Bei Zweifel: PENDING-Tag.

---

## 7. Neue Findings (F-RA6-NN)

Subagent darf **ueber die 60 bestehenden Findings + 30 PIs hinaus** neue Findings vergeben, wenn didaktischer Defekt identifiziert wird, den die Pipeline-Auditoren RA1-RA5 nicht erfasst haben.

**F-RA6-Naming-Konvention:**
- `F-RA6-<agent-id>-<laufnummer>` mit agent-id = `α` oder `β`
- Beispiel Agent-α: `F-RA6-α-01`, `F-RA6-α-02`, ...
- Beispiel Agent-β: `F-RA6-β-01`, ...
- In Konsolidierung (F0e.2b) werden semantisch gleiche Alpha/Beta-Findings gemerged → neue ID `F-RA6-<laufnummer>` ohne Suffix

**Pflichtangaben pro F-RA6:**
- Titel (≤ 100 Zeichen)
- Betroffene Artefakte (Pfade)
- Dimension(en) mit Scores
- PQI (Max)
- Begruendung (3-5 Saetze)
- Evidenz-Liste

**Dedup-Heuristik (in F0e.2b):**
- Alpha-Finding und Beta-Finding referenzieren die GLEICHE Datei-Stelle UND beschreiben die GLEICHE Dimension → merge.
- Unterschiedliche Stellen ABER gleiches Muster (z.B. "Register-Bruch in Mappe 1" und "Register-Bruch in Mappe 2") → 2 getrennte Findings.

---

## 8. Output-Format (`F0e_BEFUND_DIDAKTIK_<α|β>.md`)

Vorgabe-Sektionen:

```markdown
# F0e Didaktischer Befund — Agent-<α|β>

**Agent:** <subagent_type>
**Datum:** <ISO-Datum>
**Audit-Scope:** Escape-Game N-K Mappe 1-3
**Rubric-Version:** F0e_AUDIT_RUBRIKEN.md v1.0
**Runtime:** <minuten>

## 1. Executive Summary
- PQI-Verteilung (counts): PQI-1: X, PQI-2: Y, PQI-3: Z, NO-EVIDENCE: N
- Dimension-Hotspots (in welcher Dimension clustern PQI-1?)
- Neue F-RA6-Findings: Anzahl + Top-3
- LP-QM-Verify-PENDING Anzahl

## 2. Re-Klassifikation bestehender Findings (Matrix v1)
Tabelle: | ID | Titel | D1 | D2 | D3 | D4 | D5 | D6 | PQI-Max | Treiber | Evidenz (1-N) | Begruendung |

## 3. Re-Klassifikation bestehender PIs (Matrix v1)
Tabelle wie §2.

## 4. Neue Findings F-RA6-<agent>-<NN>
Pro Finding: Titel, Artefakte, Dimensions-Scores, PQI, Begruendung, Evidenz.

## 5. Aggregate & Patterns
Freitext-Analyse: Welche Muster? Welche Mappe/Aufgaben-Typ/Medien-Kategorie clustert Defekte?

## 6. Empfehlung Subset (was MUSS in Klasse A, aus Agent-Sicht)
Liste der Finding-IDs mit PQI <= 2 UND Trigger-Prob (aus Matrix v1) >= 50%.

## 7. Meta
- LP-QM-Verify-PENDING-Liste
- NO-EVIDENCE-Liste
- Offene Fragen (an Claude/User fuer Consolidation-Phase)
```

---

## 9. Kalibrierungs-Beispiele (Worked Examples)

### Beispiel 1 (bestehendes Finding F-RA4-10)
**Finding:** "Mappe-4 img-4-1 Herero/Nama Hallu-Caption"
**Dimensions-Analyse:**
- D1 Lernziel-Alignment: Bild wird fuer LP-Kompetenz "kritische Auseinandersetzung mit dt. Kolonialverbrechen" eingesetzt. Falsche Caption = Lernziel-Verfaelschung. **D1 = 1**
- D2 Fachliche Korrektheit: Archiv-Signatur erfunden = Falschaussage. **D2 = 1**
- D3 Didaktische Strukturierung: Aufgabe bleibt strukturell OK, Caption-Fehler beschaedigt Progression minimal. **D3 = 3**
- D4 Schwierigkeit: unaffected. **D4 = 3**
- D5 Narrativ: unaffected. **D5 = 3**
- D6 Register/Inklusion: Bei kolonialem Bildmaterial ist Fehlzuschreibung zusaetzlich ethisch relevant (Opfer-Geschichten verbreiten sich mit falschem Kontext). **D6 = 2**

**PQI-Max = 1**, Treiber D1+D2, Evidenz `mat-4-1.json#.bildquelle`, `BEFUND_TESTRUN_N-K_KONSOLIDIERT.md` §4 P0-5.

### Beispiel 2 (hypothetisches neues Finding)
**Finding:** "Mappe 2 Ueberleitung nutzt 'Neger' ohne Einordnung"
**Dimensions-Analyse:**
- D1: Thema OK, aber Kontext waere Multiperspektivitaet, deren Operationalisierung gebrochen wird. **D1 = 1**
- D2: Quelle ist ggf. historisch, aber unkommentiert = fachlich falsch eingeordnet. **D2 = 2**
- D3: unaffected. **D3 = 3**
- D4: unaffected. **D4 = 3**
- D5: unaffected. **D5 = 3**
- D6: Rassistische Terminologie unkommentiert. **D6 = 1**

**PQI-Max = 1**, Treiber D1+D6.

### Beispiel 3 (PQI-3 zur Kalibrierung, NICHT ueber-streng sein)
**Finding:** "Titel Material 1-3 heisst 'Foto' statt 'Fotografie'"
**Dimensions-Analyse:**
- D1-D6: jeweils **= 3** (Terminus-Unschaerfe, kein Lernziel-Impact)

**PQI-Max = 3**, Treiber keiner einzeln — echte Kosmetik.

---

## 10. Anti-Patterns (bitte vermeiden)

- **Ueber-Strenge bei Kosmetik:** Nicht jede Formulierung = PQI-1. PQI-1 ist der Bruch. Kalibrierung siehe §9 Beispiel 3.
- **Unter-Strenge bei Kolonial-/NS-Themen:** Bei historisch-sensiblen Inhalten ist D6 haeufig schwerer als auf ersten Blick. Multiperspektivitaet ist Pflicht im LP R7.
- **Halluzinierte LehrplanPlus-Referenzen:** Bei fehlender WebSearch-Verifikation: PENDING-Tag, nicht Erfindung.
- **Kopie der Pipeline-Auditoren-Finding-Beschreibungen:** Die Audit-Berichte RA1-RA5 sind Sekundaer-Input — nicht Pflicht-Quelle. Primaer-Input sind die Artefakte selbst.
- **Alpha-Beta-Alignment-Bias:** Subagent-α und Subagent-β arbeiten unabhaengig. Keine Cross-Reading waehrend Audit.

---

**Ende Rubric v1.0.**
