# AUSFUEHRUNGSPLAN: KE_KATALOG_GPG_R7.md

**Version:** v1.0
**Datum:** 2026-04-07
**Zweck:** PM-Prozess zur schrittweisen Erstellung eines optimalen, pipeline-kompatiblen Kompetenzerwartungs-Katalogs fuer GPG Mittelschule R7 (Bayern, LehrplanPLUS)
**Auftraggeber:** User (Session 16)
**Quelle:** LPP_GPG.pdf (Fachlehrplan-Auszuege Jg 5-9), User-Designentscheidungen (Session 16)

---

## 1. Zielbild

Ein maschinenlesbarer, pipeline-kompatibler Katalog aller Kompetenzerwartungen (KE) des GPG-Fachlehrplans R7, der:

1. **AGENT_DIDAKTIK** befaehigt, bei Phase-0.1-Intake automatisch die passenden KE zu einem Lehrer-Thema zu matchen (statt manueller KE-ID-Eingabe)
2. **Themen-Clustering** ermoeglicht: welche KE bilden natuerliche Escape-Game-Einheiten (typischerweise = 1 Lernbereich "Zeit und Wandel")
3. **Spiralcurriculum-Kontingenz** dokumentiert: welche KE bauen auf Jg-5/6-Vorwissen auf, welche bereiten Jg-8/9 vor
4. **Exemplarische Inhaltsauswahl** unterstuetzt: Inhalte sind Vorschlaege, nicht Pflicht — der Katalog markiert, welche Inhalte exemplarisch austauschbar sind vs. welche kompetenz-konstitutiv sind
5. **Game-1-Coverage** transparent macht: welche KE sind durch das bestehende Game "Industrialisierung" bereits abgedeckt

---

## 2. User-Designentscheidungen (verbindlich)

Aus Session 16, woertlich uebernommen als Leitplanken:

| ID | Entscheidung | Konsequenz fuer KE_KATALOG |
|---|---|---|
| DE-1 | Lehrkraft sieht Infrastruktur als "Escape-Game-Generator" — minimaler Intake | Katalog muss so reichhaltig sein, dass der Intake auf Thema + Lernbereich reduziert werden kann. Matching-Logik liegt im Katalog, nicht beim User. |
| DE-2 | Differenzierung als separates Layer auf Endprodukt, nicht im Intake | Katalog enthaelt KEINE Differenzierungshinweise. Schwierigkeitsstufen werden spaeter auf fertige Games gelegt. |
| DE-3 | Escape-Game deckt typischerweise gesamte Sequenz ab (= 1 LB "Zeit und Wandel") | Primaere Cluster-Einheit = Lernbereich. Cross-LB-Embedding ist Ausnahme, nicht Default. |
| DE-4 | Voraussetzungen minimal halten — Standardisierung und QM nicht gefaehrden | Katalog-Struktur muss stabil genug sein, dass AGENT_DIDAKTIK ohne Sonderfaelle arbeiten kann. Edge-Cases werden dokumentiert aber nicht als Default-Pfad modelliert. |

---

## 3. Inhaltliche Design-Prinzipien (aus User-Input)

### 3.1 Kompetenzorientierter Lehrplan

Der LehrplanPLUS Bayern ist kompetenzorientiert: Die "Inhalte zu den Kompetenzen" sind **Vorschlaege**, nicht Pflicht. Eine Kompetenz kann mit unterschiedlichen Inhalten erreicht werden. Der Katalog muss daher zwischen **Kompetenz** (verbindlich) und **Inhalt** (exemplarisch) trennen.

### 3.2 Schuelerorientierung

Niedrige Barrieren, hohe Motivation, Relevanz, Lebensweltbezug. Der Katalog annotiert pro KE, wo Lebensweltbezug-Potenzial liegt (fuer spaetere Narrativ-Generierung durch AGENT_SKRIPT).

### 3.3 Spiralcurriculum-Kontingenz

Kompetenzen bauen ueber Jahrgangsstufen aufeinander auf. Der Katalog dokumentiert:
- **Vorwissen (Jg 5/6):** Welche KE aus frueheren Stufen sind Voraussetzung?
- **Anschluss (Jg 8/9):** Welche KE werden in spaeteren Stufen vertieft?
- **Implikation:** AGENT_DIDAKTIK kann pruefen, ob ein Game Vorwissen voraussetzt, das nicht gesichert ist.

### 3.4 Exemplarische Inhaltsauswahl

Drei Qualitaetskriterien fuer Inhaltsauswahl:
- **Pars pro toto:** Ein Inhalt steht stellvertretend fuer ein Prinzip/Konzept
- **Konzeptreinheit des Exemplars:** Das Beispiel illustriert genau EINE Kompetenz, nicht mehrere vermischt
- **Konzeptdichte des Inhalts:** Der Inhalt ist reichhaltig genug fuer mehrere Mappen/Materialien

---

## 4. Lehrplan-Struktur (aus PDF-Analyse)

### 4.1 Gesamtstruktur

| Jg | LB1 Lebensraum Erde | LB2 Zeit und Wandel | LB3 Politik und Gesellschaft | LB4 Lebenswelt |
|---|---|---|---|---|
| 5 | Sonnensystem, Topographie, Bayern | Ur-/Fruehgeschichte, Aegypten, Rom | Aegypten Gesellschaft, Griechenland Demokratie | Konflikte, demokrat. Verhalten, Familie |
| 6 | Europa Topographie, Tourismus, Kolonialisierung, Naturgefahren | Mittelalter, Islam-Errungenschaften, Neuzeit-Erfindungen, Reformation | Kloster/Burg, Staendegesellschaft | Wohnort, Kommune, Buergerbeteiligung |
| **7 R7** | **Asien/Afrika, Entwicklung, Konsum** | **Absolutismus, Franz. Revolution, Industrialisierung, Reichsgruendung, Imperialismus, Erster Weltkrieg** | **Soziale Frage, Industriegesellschaft, Kriegsschuldfrage, Versailler Vertrag** | **Jugendstrafrecht, Jugendschutz** |
| 8 | Nordamerika, USA, Energie | Weimarer Republik, NS, Zweiter Weltkrieg, Nachkriegszeit | NS-Propaganda, Widerstand, Potsdamer Konf., Parlamentarismus | Politische Teilhabe, Sozialstaat, Oekologie |
| 9 | EU, Globalisierung, Klimawandel | NS-Gedenken, DDR/BRD, Wiedervereinigung, 9/11 | BRD/DDR Vergleich, Terrorismus, Friedenssicherung | Konflikte, Migration |

### 4.2 GPG7 R7 — Detail (Escape-Game-Zielgruppe)

**LB1 Lebensraum Erde (Geographie-Schwerpunkt):**
- 4 KE: Topographie Asien/Afrika, Entwicklungsstand, Lebensbedingungen-Vergleich, Konsumverhalten/Ressourcen
- Inhalte: Kontinente, Entwicklungszusammenhaenge, Ressourcen (Baumwolle, Coltan), Anbau-/Produktionsbedingungen
- **Escape-Game-Eignung:** MITTEL (eher kategorial/geographisch, weniger narrativ)

**LB2 Zeit und Wandel (Geschichte-Schwerpunkt):**
- 7 KE: Absolutismus vs. Demokratie, Franz. Revolution (nicht-linear), Industrialisierung (Perspektiven), Reichsgruendung, Imperialismus/Kolonialismus, Attentat Sarajevo, Erster Weltkrieg (Front + Heimat)
- Inhalte: Ludwig XIV., Franz. Revolution, Industrialisierung, Reichsgruendung, Imperialismus/Afrika, Erster Weltkrieg
- **Escape-Game-Eignung:** HOCH (starke Narrative, chronologisch, viele Quellen)
- **Bereits abgedeckt (Game 1):** Industrialisierung (Teilmenge von LB2 + LB3)

**LB3 Politik und Gesellschaft (Gesellschafts-Schwerpunkt):**
- 4 KE: Soziale Frage/Arbeitsleben, Stadtentwicklung/Industriegesellschaft, Kriegsschuldfrage, Versailler Vertrag
- Inhalte: Industrielle Revolution Gesellschaft, Soziale Frage, Kriegsschuldfrage, Versailler Vertrag
- **Escape-Game-Eignung:** HOCH (starke Verflechtung mit LB2, oft im selben Game behandelbar)
- **Cross-LB-Hinweis:** LB3-KE zu Industrialisierung/Soziale Frage sind eng mit LB2-KE zur Industrialisierung verknuepft. Typisch: 1 Game deckt LB2+LB3 fuer denselben Zeitraum ab.

**LB4 Lebenswelt (Politik/Recht-Schwerpunkt):**
- 4 KE: Altersstufen Recht, Jugendschutzgesetz, Jugendstrafrecht/Gerichtsverhandlung, aktuelle kriminelle Tat
- Inhalte: Altersstufen, Jugendschutz, Jugendstrafrecht, Rechtsverstösse
- **Escape-Game-Eignung:** MITTEL-HOCH (konkreter Lebensweltbezug, aber weniger historisch-narrativ)

---

## 5. Prozess-Schritte

### Schritt 1: Roh-Extraktion (PM, kein User-Input noetig)

**Aufgabe:** Alle KE aus GPG7 R7 (LB1-LB4) extrahieren und in tabellarische Rohform bringen.

**Methode:**
- Pro Lernbereich: Jede Kompetenzerwartung als eigene Zeile
- Operator extrahieren (erklaeren, darstellen, vergleichen, beurteilen, analysieren, uebertragen, beschreiben, erlaeutern, diskutieren, recherchieren, benennen, fassen zusammen, berichten)
- AFB ableiten (I: benennen/beschreiben, II: erklaeren/darstellen/vergleichen/erlaeutern, III: beurteilen/diskutieren/uebertragen/analysieren)
- Inhalt-Vorschlaege zuordnen (aus "Inhalte zu den Kompetenzen")

**Output:** Rohtabelle mit Spalten: `KE-ID | LB | Operator | AFB | KE-Wortlaut | Inhalte (Vorschlaege)`

**KE-ID-Schema:** `GPG7_LB[N]_K_[NN]` (konsistent mit VERTRAG_PHASE_0-1_DIDAKTIK.md §5)

**Qualitaetskriterium:** Vollstaendigkeit — kein KE-Bullet aus der PDF darf fehlen. Zaehlung: LB1=4, LB2=7, LB3=4, LB4=4 = **19 KE total**.

---

### Schritt 2: Kompetenz/Inhalt-Trennung (PM, kein User-Input noetig)

**Aufgabe:** Pro KE die Trennung zwischen verbindlicher Kompetenz und exemplarischem Inhalt explizit machen.

**Methode:**
- Aus dem KE-Wortlaut den **Kompetenz-Kern** isolieren (was muss der Schueler KOENNEN, unabhaengig vom konkreten Inhalt)
- Die im Lehrplan genannten Inhalte als **Exemplar-Pool** markieren
- Pro Inhalt annotieren:
  - `KONSTITUTIV` — Inhalt ist kompetenz-konstitutiv, nicht austauschbar (z.B. "Attentat von Sarajevo" bei KE zu Ursachen des Ersten Weltkriegs)
  - `EXEMPLARISCH` — Inhalt ist pars-pro-toto, grundsaetzlich austauschbar (z.B. "Baumwolle" als Ressourcen-Beispiel)
  - `KONTEXTGEBUNDEN` — Inhalt ist im Lehrplan explizit genannt, aber die Kompetenz waere auch mit anderem Kontext erreichbar (z.B. "Ludwig XIV." als Beispiel fuer Absolutismus)

**Output:** Erweiterte Tabelle mit Spalten: `KE-ID | Kompetenz-Kern | Exemplar-Pool[] | Exemplar-Typ (K/E/KB)`

**User-Entscheidung noetig:** NEIN fuer Roh-Zuordnung. JA fuer Grenzfaelle (Schritt 5).

---

### Schritt 3: Spiralcurriculum-Mapping (PM, kein User-Input noetig)

**Aufgabe:** Pro KE dokumentieren, welche Vorwissen-KE (Jg 5/6) vorausgesetzt werden und welche Anschluss-KE (Jg 8/9) darauf aufbauen.

**Methode:**
- Jg-5-PDF und Jg-6-PDF systematisch nach inhaltlichen Vorgaengern durchsuchen
- Jg-8-PDF und Jg-9-PDF nach inhaltlichen Nachfolgern durchsuchen
- Verknuepfungstyp markieren:
  - `VORAUSSETZUNG` — KE baut direkt auf Vorwissen auf (z.B. GPG7 LB2 Mittelalter-Gesellschaft baut auf GPG6 LB2/LB3 Mittelalter auf)
  - `VERTIEFUNG` — Spaetere Jg vertieft dieselbe Kompetenz (z.B. GPG7 LB2 Erster Weltkrieg → GPG8 LB2 Zweiter Weltkrieg)
  - `TRANSFER` — Kompetenz wird in anderem Kontext wieder angewendet (z.B. GPG7 LB2 Revolution → GPG9 LB2 DDR/Wende)

**Output:** Spiralcurriculum-Matrix: `KE-ID | Vorwissen-KE[] | Anschluss-KE[] | Verknuepfungstyp`

**Besonderheit GPG7 R7 LB2:** Starke Vorwissen-Abhaengigkeit von GPG6 LB2 (Mittelalter, Reformation) und starke Anschluss-Relevanz fuer GPG8 LB2 (Weimarer Republik als direkte Folge von Versailler Vertrag).

---

### Schritt 4: Themen-Clustering und Game-Sequenz (PM + User-Validierung)

**Aufgabe:** KE zu natuerlichen Escape-Game-Einheiten buendeln. Primaere Einheit = Lernbereich (DE-3). Cross-LB-Buendelung nur bei starker inhaltlicher Verflechtung.

**Methode:**
- Regelfall: 1 Game = 1 Lernbereich (oder thematisch zusammenhaengender Teil eines LB)
- Ausnahme-Pruefung: Gibt es LB3-KE, die so eng mit LB2-KE verflochten sind, dass sie im selben Game behandelt werden muessen? (Ja: Soziale Frage + Industrialisierung)
- Pro Cluster: Game-Eignung bewerten (narratives Potenzial, Quellenlage, Mappen-Zerlegbarkeit)
- Vorschlag fuer Game-Sequenz (welches Game zuerst, welches spaeter)

**Vorschlag (zu validieren):**

| Game | KE-Cluster | LB-Abdeckung | Mappen (geschaetzt) | Prioritaet |
|---|---|---|---|---|
| Game 1 (besteht) | Industrialisierung + Soziale Frage | LB2 (Teil) + LB3 (Teil) | 4 | DONE |
| Game 2 | Absolutismus → Franz. Revolution → Weg zur Demokratie | LB2 (Teil) | 4-5 | HOCH (Testlauf) |
| Game 3 | Imperialismus → Erster Weltkrieg → Versailler Vertrag | LB2 (Teil) + LB3 (Teil) | 4-5 | HOCH |
| Game 4 | Asien/Afrika: Entwicklung, Konsum, Ressourcen | LB1 | 3-4 | MITTEL |
| Game 5 | Jugendstrafrecht und Jugendschutz | LB4 | 3-4 | MITTEL |

**User-Entscheidung noetig:** JA — Clustering-Vorschlag und Game-Sequenz validieren.

---

### Schritt 5: Grenzfall-Klaerung (User-Input PFLICHT)

**Aufgabe:** Faelle identifizieren, in denen die Kompetenz/Inhalt-Trennung nicht eindeutig ist, und User-Entscheidung einholen.

**Erwartete Grenzfaelle (aus PDF-Analyse):**

1. **"am Beispiel Ludwig XIV."** — Ist Ludwig XIV. KONSTITUTIV (weil im Lehrplan explizit) oder KONTEXTGEBUNDEN (weil die Kompetenz "Absolutismus verstehen" auch mit Friedrich dem Grossen erreichbar waere)?
2. **"Attentat von Sarajevo"** — Im Lehrplan explizit als Inhalt zu KE "Ursachen Erster Weltkrieg". KONSTITUTIV oder KONTEXTGEBUNDEN?
3. **LB3 KE zur Kriegsschuldfrage** — Gehoert in Game 3 (Erster Weltkrieg) oder ist es ein eigenes Thema?
4. **LB1 Konsumverhalten-KE** — Hoher Lebensweltbezug, aber kaum narratives Escape-Game-Potenzial. Eigenes Game oder integriert in ein LB2-Game als "Gegenwartsbezug"?

**Methode:** Liste der Grenzfaelle mit je 2 Optionen + PM-Empfehlung vorlegen. User entscheidet.

---

### Schritt 6: Pipeline-Kompatibilitaets-Pruefung (PM, kein User-Input noetig)

**Aufgabe:** Sicherstellen, dass das KE_KATALOG-Format kompatibel ist mit:
- VERTRAG_PHASE_0-1_DIDAKTIK.md (Input-Spezifikation: `lehrplanbezug`, KE-IDs, KE-Matrix)
- AGENT_DIDAKTIK.md (KE-Matching-Logik, QD1 Lehrplan-Abdeckung, QD2 KE-Vollstaendigkeit)
- GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md (KE-Referenzen in Kernerkenntnissen)

**Pruefpunkte:**
- [ ] KE-ID-Format stimmt mit Vertrags-Konvention ueberein (`GPG7_LB[N]_K_[NN]`)
- [ ] Jede KE hat AFB-Zuordnung (fuer QD6 Schwierigkeitskurve)
- [ ] Kompetenz-Kern ist so formuliert, dass Teilziel-Ableitung moeglich ist (QD3)
- [ ] Mappen-Grobstruktur-Ableitung aus Cluster moeglich (QD5)
- [ ] Spiralcurriculum-Daten ermoeglichen QD10 STRUKTUR-FREEZE-Tauglichkeit
- [ ] Game-1-Coverage dokumentiert (fuer `vorgaenger_game`-Input in Vertrag §2)

---

### Schritt 7: Artefakt-Produktion (PM)

**Aufgabe:** KE_KATALOG_GPG_R7.md als finales Artefakt schreiben.

**Zielstruktur des Artefakts:**

```markdown
# KE_KATALOG_GPG_R7 — Kompetenzerwartungs-Katalog GPG Mittelschule R7 (Bayern)

## Meta
- Version, Datum, Quelle (LehrplanPLUS GPG R7)
- Abkuerzungen und Legende

## 1. KE-Tabelle (Vollstaendig)
Pro KE: ID, LB, Operator, AFB, Wortlaut, Kompetenz-Kern, Exemplar-Pool

## 2. Kompetenz/Inhalt-Matrix
Pro Inhalt: Typ (KONSTITUTIV / EXEMPLARISCH / KONTEXTGEBUNDEN)

## 3. Spiralcurriculum-Kontingenz
Pro KE: Vorwissen (Jg 5/6), Anschluss (Jg 8/9), Verknuepfungstyp

## 4. Themen-Cluster und Game-Sequenz
Cluster-Definition, Game-Zuordnung, Abdeckungs-Matrix

## 5. Game-1-Coverage
Welche KE sind durch bestehendes Game abgedeckt (Ist-Stand)

## 6. Lebensweltbezug-Annotationen
Pro KE: Potenzial fuer Schuelerorientierung (hoch/mittel/gering)

## 7. Grenzfall-Entscheidungen
Dokumentierte User-Entscheidungen aus Schritt 5
```

**Ablageort:** `docs/agents/artefakte/KE_KATALOG_GPG_R7.md`

---

### Schritt 8: Review und Validierung (PM + User)

**Aufgabe:** Finales Artefakt gegen die Design-Prinzipien und Pipeline-Anforderungen pruefen.

**Review-Checkliste:**

| # | Kriterium | Pruefung |
|---|---|---|
| R1 | Vollstaendigkeit | Alle 19 KE aus GPG7 R7 LB1-LB4 enthalten |
| R2 | KE-ID-Konsistenz | Format `GPG7_LB[N]_K_[NN]`, keine Luecken |
| R3 | Kompetenz/Inhalt-Trennung | Jeder Inhalt als K/E/KB typisiert |
| R4 | Spiralcurriculum | Min. 1 Vorwissen- ODER Anschluss-Verweis pro LB2/LB3-KE |
| R5 | Game-Clustering | Jede KE genau einem Game-Cluster zugeordnet |
| R6 | Pipeline-Kompatibilitaet | Schritt-6-Checkliste vollstaendig bestanden |
| R7 | Design-Prinzipien | DE-1 bis DE-4 eingehalten, keine Differenzierung im Katalog |
| R8 | User-Validierung | Grenzfall-Entscheidungen dokumentiert, Game-Sequenz validiert |

---

## 6. Abhaengigkeiten und Reihenfolge

```
Schritt 1 (Roh-Extraktion)
    |
Schritt 2 (Kompetenz/Inhalt-Trennung)
    |
Schritt 3 (Spiralcurriculum) ----+
    |                              |
Schritt 4 (Clustering)            |
    |                              |
Schritt 5 (Grenzfaelle) ←---------+  [User-Input PFLICHT]
    |
Schritt 6 (Pipeline-Pruefung)
    |
Schritt 7 (Artefakt-Produktion)
    |
Schritt 8 (Review + User-Validierung)  [User-Input PFLICHT]
```

**Parallelisierbar:** Schritt 3 kann parallel zu Schritt 2 laufen (verschiedene Datenquellen).
**Blockierend:** Schritt 5 blockiert Schritt 7 (Grenzfaelle muessen vor Produktion geklaert sein).
**User-Gates:** Schritt 5 (Grenzfall-Entscheidungen) und Schritt 8 (Final-Validierung).

---

## 7. Aufwandsschaetzung

| Schritt | Aufwand | Wer |
|---|---|---|
| 1 Roh-Extraktion | S (< 1 Session-Block) | PM |
| 2 Kompetenz/Inhalt | S | PM |
| 3 Spiralcurriculum | M (Cross-Jg-Analyse) | PM |
| 4 Clustering | S | PM |
| 5 Grenzfaelle | S (Vorlage) + User-Wartezeit | PM + User |
| 6 Pipeline-Pruefung | S | PM |
| 7 Produktion | M | PM |
| 8 Review | S + User-Wartezeit | PM + User |

**Gesamt:** 1-2 Sessions (PM-Anteil), davon 2 User-Interaktionspunkte.

---

## 8. Risiken

| Risiko | Eintrittswahrscheinlichkeit | Massnahme |
|---|---|---|
| KE-Zaehlung aus PDF ungenau (OCR-Artefakte) | GERING (PDF ist sauber) | Schritt 1 endet mit expliziter Zaehlung, Abgleich mit PDF |
| Kompetenz/Inhalt-Trennung subjektiv | MITTEL | Drei-Stufen-Modell (K/E/KB) mit klaren Kriterien, Grenzfaelle via User |
| Game-1-Coverage unklar | MITTEL (kein DIDAKTIK_RAHMEN in artefakte/) | Aus bestehendem Game-1-Code + TAFELBILD-Artefakten ableiten |
| Spiralcurriculum-Luecken | GERING | Systematischer Cross-Jg-Abgleich, nicht nur LB2 |

---

## 9. Beziehung zu Phase-0.0 Intake

Der KE_KATALOG ist **Voraussetzung** fuer den geplanten VERTRAG_PHASE_0-0_INTAKE.md. Ohne Katalog kann kein automatisches Lehrplan-Matching stattfinden. Die Intake-Standardisierung (M2-M5 aus dem Phase-0-Plan) wird NACH dem KE_KATALOG fortgesetzt.

**Abhaengigkeitskette:**
```
KE_KATALOG_GPG_R7.md (dieses Artefakt)
    → VERTRAG_PHASE_0-0_INTAKE.md (Intake-Standardisierung)
    → AGENT_DIDAKTIK Input-Spec Update (lehrplanbezug wird automatisch befuellt)
    → Testlauf Phase 0.1+0.2 mit Game-2-Thema
```

---

## 10. Naechster Schritt

Schritt 1 + 2 koennen sofort ausgefuehrt werden (keine User-Abhaengigkeit). Schritt 3 parallel. Erster User-Gate bei Schritt 5 (Grenzfaelle).

**Empfehlung:** Schritte 1-4 in einem Block ausfuehren, dann Schritt 5 als User-Vorlage praesentieren.
