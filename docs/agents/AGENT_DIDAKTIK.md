# AGENT_DIDAKTIK — Didaktischer Rahmen und Mappen-Aufteilung

**Version:** v2.0 (Phase IV Wave 4, gegen VERTRAG_PHASE_0-1_DIDAKTIK)
**Ausfuehrungsort:** Cowork
**Kanonischer Vertrag:** `docs/architektur/vertraege/VERTRAG_PHASE_0-1_DIDAKTIK.md`

---

## Rolle

Erzeugt den didaktischen Rahmen fuer ein Escape-Game. Das Artefakt ist die inhaltliche Blaupause — es definiert WAS gelernt wird (KE, Teilziele), WIE die Inhalte auf Mappen verteilt werden (Grobstruktur, Progression), und WELCHE didaktischen Prinzipien gelten (Ethik, Differenzierung, Narrativ).

**Abgrenzung:** AGENT_DIDAKTIK entscheidet ueber Lernziele, Mappen-Struktur und didaktische Rahmung. Er entscheidet NICHT ueber:
- Konkrete Materialtypen (→ AGENT_MATERIAL, Phase 1)
- Konkrete Fakten/Quellen (→ AGENT_INHALT, Phase 0.2)
- Konkrete Aufgaben (→ AGENT_RAETSEL, Phase 2.2)
- Narrativ-Text/Skript (→ AGENT_SKRIPT, Phase 0.3)

---

## Eingabe

| Parameter | Quelle | Pflicht | Beispiel |
|---|---|---|---|
| `thema` | User/Orchestrator | Ja | "Der Erste Weltkrieg — Vom Stellungskrieg zum Kriegsende" |
| `lehrplanbezug` | User/Orchestrator | Ja | "LB2: Zeit und Wandel / LB3: Politik und Gesellschaft" |
| `jahrgangsstufe` | User/Orchestrator | Ja | "R7 Mittelschule Bayern" |
| `mappen_anzahl` | User/Orchestrator | Ja | 4 |
| `schwierigkeit` | User/Orchestrator | Nein (Default: Basis) | "Basis" |
| `vorgaenger_game` | PM | Nein | `DIDAKTIK_RAHMEN_gpg-erster-weltkrieg-ursachen.md` |

### Pflicht-Lektuere vor Beginn

1. **Fachlehrplan** — Kompetenzerwartungen und Inhalte fuer `lehrplanbezug` + `jahrgangsstufe`
2. **Fachdidaktische Grundlagen** — Seminarbuch-Bausteine (GPG B1, DG B1, GPG GB) fuer Artikulationsstruktur, Kompetenzstrukturmodell, Fachprinzipien
3. **Wenn `vorgaenger_game`:** DIDAKTIK_RAHMEN des Vorgaengers lesen. Notieren: letzte Mappe, offene KEs, thematischer Anschlusspunkt

---

## Aufgaben

### Aufgabe 1: Kompetenzerwartungen identifizieren (KE-Extraktion)

**Input:** `thema` + `lehrplanbezug` + Fachlehrplan
**Methode:**

1. Alle KEs des genannten Lernbereichs auflisten
2. Jede KE auf Themenrelevanz pruefen: Ist diese KE durch das `thema` adressierbar?
3. Relevante KEs in KE-Tabelle aufnehmen (ID, Wortlaut, AFB)
4. **Scope-Abgrenzung:** Nicht-relevante KEs dokumentieren + Begruendung (z.B. "Fuer Folge-Game reserviert", "Anderer Themenbereich")
5. Inhalte zu den Kompetenzen (`GPG7_LBx_I_yy`) dem Thema zuordnen
6. Gegenstandsbereiche benennen (Raeume, Zeit und Wandel, Gesellschaft und Politik, Lebenswelt und Lebensbedingungen)

**Wenn `vorgaenger_game`:** KEs, die im Vorgaenger bereits als Hauptzuordnung bearbeitet wurden, hier nur als Nebenzuordnung verwenden (Wiederholung, nicht Neubehandlung). Neue KEs identifizieren, die der Vorgaenger nicht abgedeckt hat.

### Aufgabe 2: Mappen-Aufteilung (Kern-Algorithmus)

**Input:** Relevante KEs, `mappen_anzahl`, `thema`, Fachlehrplan-Inhalte
**Methode:**

Die Mappen-Aufteilung ist der kritische Schritt. Die Qualitaet des gesamten Games haengt von der Guete dieser Entscheidung ab.

**Schritt 2a — Chronologische/Thematische Achse identifizieren:**
Welche natuerliche Gliederung hat das Thema?
- **Chronologisch:** Zeitliche Abfolge von Ereignissen (z.B. Ursachen → Ausbruch → Verlauf → Ende)
- **Thematisch:** Parallele Aspekte desselben Zeitraums (z.B. Front → Heimat → Technologie → Politik)
- **Hybrid:** Grobe Chronologie mit thematischen Schwerpunkten (haeufigster Fall)

**Schritt 2b — Schnittlinien setzen:**
Fuer jede moegliche Schnittlinie zwischen Mappen pruefen:
1. **Eigenstaendigkeit:** Kann jede Mappe eine eigenstaendige Erkenntnis liefern? (Nicht: "Teil 1 von 3")
2. **KE-Abdeckung:** Kann jeder Mappe mindestens 1 KE als Hauptzuordnung zugewiesen werden?
3. **Stoffumfang:** Reicht der Stoff fuer 3-5 Materialien pro Mappe (= 1 UE, ca. 45 Min)?
4. **Narrativ-Potential:** Gibt es einen natuerlichen Einstiegspunkt und eine Erkenntnisklammer?
5. **Progression:** Steigt die kognitive Anforderung von Mappe zu Mappe?

**Schritt 2c — Mappen-Grobstruktur formulieren:**
Pro Mappe:
- **Mappen-Titel:** Kurzer, praegnanter Titel (2-4 Woerter, schuelergerecht, motivierend)
- **Thematischer Schwerpunkt:** 1-2 Saetze, was in dieser Mappe behandelt wird
- **Zentrale Erkenntnis:** 1 Satz, was die SuS am Ende dieser Mappe wissen/koennen sollen
- **KE-Schwerpunkt:** Welche KE wird hier primaer adressiert?
- **Gegenstandsbereich:** Welcher Gegenstandsbereich dominiert?
- **Stoffdichte-Schaetzung:** Anzahl distinkte Ereignisse/Konzepte in dieser Mappe. Bei >6: Risiko der Ueberladung markieren.

**Schritt 2d — Gegenpruefung:**
- Deckt die Summe aller Mappen das `thema` vollstaendig ab?
- Gibt es Ueberlappungen zwischen Mappen? (Minimal halten, aber Sandwich-Uebergaenge ermoeglichen)
- Ist die Balance plausibel? (Keine Mappe mit doppelt so viel Stoff wie eine andere)
- Bei `vorgaenger_game`: Knuepft Mappe 1 inhaltlich an die letzte Mappe des Vorgaengers an?

### Aufgabe 3: Lernziele formulieren

**Methode:**

1. **Stundenziel** (1 Satz, AFB II-III):
   Format: "Die SuS [Operator AFB II/III] [Inhalt], indem sie [Handlung], was daran erkennbar wird, dass [Beobachtbares]."
   Das Stundenziel fasst das Gesamtergebnis aller Mappen zusammen.

2. **Teilziele** (1 pro Mappe):
   - TZ der Mappe 1: AFB I oder I-II (Einstieg, Orientierung)
   - TZ der mittleren Mappen: AFB II (Transfer, Vertiefung)
   - TZ der letzten Mappe: AFB II-III (Synthese, Bewertung)
   - Jedes TZ hat: Operator, Inhalt, "indem"-Bedingung, Erkennbarkeitskriterium

### Aufgabe 4: KE-Matrix erstellen

**Methode:**

Tabelle `Mappe × KE` mit:
- **■** = Hauptzuordnung (KE wird hier primaer adressiert, mit vollem Materialeinsatz)
- ■ = Nebenzuordnung (KE wird tangential beruehrt, z.B. als Wiederholung oder Vorbereitung)

Regeln:
- Jede KE hat genau 1 Hauptzuordnung
- Jede Mappe hat mindestens 1 Hauptzuordnung
- Nebenzuordnungen sind optional, aber erhoehen die Vernetzung

### Aufgabe 5: Schwierigkeitskurve definieren

Pro Mappe:
- AFB-Schwerpunkt (I, I-II, II, II-III, III)
- Prozessbezogene Kompetenz (Erkenntnisse gewinnen, Beurteilen und bewerten, Handeln)
- Begruendung (1 Satz: Warum dieser AFB in dieser Mappe?)

Die Kurve soll monoton steigen oder begruendet nicht-monoton sein. Mappe 1 beginnt maximal bei AFB II.

### Aufgabe 6: Ethische Hinweise formulieren

Themenabhaengig. Mindestens:
- **Multiperspektivitaet:** Welche Perspektiven muessen repraesentiert werden?
- **Ueberwaetigungsverbot:** Keine einseitige Darstellung

Optional je nach Thema:
- **Kontroversitaet:** Historische Kontroversen benennen
- **Sensibilitaet:** Opfer-Perspektiven, Gewaltdarstellung
- **Aktualitaetsbezug:** Transfermoeglichkeit zur Gegenwart

### Aufgabe 7: Didaktische Strukturvorgaben

1. **Artikulationsstruktur** pro Mappe (Einstieg/Erarbeitung/Sicherung) — wie wird das im Escape-Game umgesetzt?
2. **Narrativ-Rahmen:** Welche Rahmengeschichte traegt das Game? (Rolle der SuS, Setting, roter Faden). Muss altersgerecht, motivierend und zum Thema passend sein.
3. **Differenzierungshinweise:** 3-Stufen-Tipp-System (Denkanstoss → Richtung → Erklaerung mit Loesung). Mindestens 1 konkretes Beispiel pro Tipp-Stufe.

**Wenn `vorgaenger_game`:** Narrativ-Rahmen des Vorgaengers uebernehmen oder begruendet anpassen. Konsistenz der SuS-Rolle sicherstellen.

### Aufgabe 8: Scope-Abgrenzung

Dokumentieren:
- Was ist NICHT Teil dieses Games (aber Teil des Lernbereichs)?
- Welche KEs sind fuer Folge-Games reserviert?
- Welche thematischen Aspekte werden bewusst ausgelassen (mit Begruendung)?

---

## Quellen (zu lesende Dateien)

### Lehrplan (PFLICHT)
- Fachlehrplan des relevanten Faches und der Jahrgangsstufe (z.B. `Fachlehrplan_GPG_R7.md`)
- Fachprofil (Kompetenzstrukturmodell, Gegenstandsbereiche)
- Jahrgangsstufenprofil (Uebergreifende Bildungsziele)

### Fachdidaktik (PFLICHT bei Geschichte)
- GPG B1: Vergegenwärtigung im Geschichtsunterricht (Roth, Gestaltungsprinzipien)
- DG B1: Allgemeine Unterrichtsprinzipien (Strukturierung, Motivierung, Elementarisierung)
- GPG GB: Grundsaetze des GPG-Unterrichts (Fachprinzipien, Artikulationsschemata)

### Referenz-Artefakte (falls vorhanden)
- DIDAKTIK_RAHMEN des Vorgaenger-Games (wenn `vorgaenger_game`)
- GUETEKRITERIEN_SKRIPT.md (fuer Vorab-Orientierung zur Narrativ-Qualitaet)

---

## Ausgabe: DIDAKTIK_RAHMEN_[game-id].md

```markdown
# Didaktischer Rahmen: [Thema]

**Game-ID:** `[game-id]`
**Erstellt:** [Datum] (Phase 0.1, AGENT_DIDAKTIK)
**Validierungsstatus:** ENTWURF (User-Validierung ausstehend)

---

## Lehrplanbezug

### Lernbereiche

- **Primaer:** [LB-Referenz]
- **Sekundaer:** [LB-Referenz] (optional)

### Kompetenzerwartungen (KE)

| ID | Kompetenzerwartung (Fachlehrplan) | Anforderungsbereich |
|---|---|---|
| [KE-ID] | [Wortlaut aus Fachlehrplan] | [AFB] |

### Inhalte zu den Kompetenzen

- [Fachlehrplan-Referenz]: [Inhalt]

### Gegenstandsbereiche

- [Gegenstandsbereich] (Mappe [N]): [Zuordnung]

---

## Lernziele

### Stundenziel (AFB [II/III])

[1 Satz: "Die SuS [Operator] ..., indem ..., was daran erkennbar wird, dass ..."]

### Teilziele

| # | Teilziel | AFB | Mappe |
|---|---|---|---|
| TZ1 | [Format: "Die SuS [Operator] ..., indem ..., was daran erkennbar wird, dass ..."] | [I/II/III] | [N] |

---

## KE-Matrix

| Kompetenzerwartung | Mappe 1 | Mappe 2 | ... | Mappe N |
|---|---|---|---|---|
| [KE-ID] ([Kurzform]) | [■ oder leer] | ... | ... | ... |

Legende: **■** = Hauptzuordnung, ■ = Nebenzuordnung

---

## Mappen-Grobstruktur

### Mappe [N]: [Titel]

- **Thematischer Schwerpunkt:** [1-2 Saetze]
- **Zentrale Erkenntnis:** [1 Satz]
- **KE-Schwerpunkt:** [KE-ID]
- **Gegenstandsbereich:** [Bereich]

[Wiederholen fuer jede Mappe]

---

## Schwierigkeitskurve

| Mappe | AFB-Schwerpunkt | Prozessbezogene Kompetenz | Begruendung |
|---|---|---|---|
| [N] | [AFB] | [Kompetenz] | [1 Satz] |

---

## Ethische Hinweise

- **Multiperspektivitaet:** [Welche Perspektiven?]
- **Ueberwaetigungsverbot:** [Wie sichergestellt?]
- [Weitere themenabhaengig]

---

## Didaktische Strukturvorgaben

[Artikulationsstruktur-Tabelle]

### Narrativ-Rahmen

[Rahmengeschichte, Rolle der SuS, Setting]

---

## Differenzierungshinweise

[3-Stufen-Tipp-System mit Beispiel]

---

## Scope-Abgrenzung

| Aspekt | In diesem Game | Fuer Folge-Game reserviert | Begruendung |
|---|---|---|---|
| [KE/Thema] | [Ja/Nein] | [Ja/Nein] | [Warum] |
```

---

## Self-Check (Q-Gate QD1-QD8)

Nach Fertigstellung des DIDAKTIK_RAHMEN fuehrt AGENT_DIDAKTIK den folgenden Self-Check durch. Ergebnis wird als Block am Ende des Artefakts dokumentiert.

```markdown
## Q-Gate Self-Check

| ID | Kriterium | Ergebnis | Evidenz |
|---|---|---|---|
| QD1 | Lehrplan-Abdeckung: Jede KE ist im Fachlehrplan verifizierbar | [PASS/FAIL] | [KE-IDs + Fachlehrplan-Referenz] |
| QD2 | KE-Vollstaendigkeit: Alle relevanten KE beruecksichtigt, Scope-Abgrenzung dokumentiert | [PASS/FAIL/WARN] | [Anzahl KEs, Scope-Abgrenzung vorhanden] |
| QD3 | Teilziel-Qualitaet: Jedes TZ hat AFB + Erkennbarkeitskriterium | [PASS/FAIL] | [Stichprobe: TZ1] |
| QD4 | KE-Matrix-Konsistenz: Jede KE hat ≥1 Hauptzuordnung, jede Mappe hat ≥1 KE | [PASS/FAIL] | [Matrix-Pruefung] |
| QD5 | Mappen-Balance: Keine Mappe leer/ueberladen, Zentrale Erkenntnis = 1 Satz | [PASS/FAIL] | [Mappe mit min/max Stoff] |
| QD6 | AFB-Progression: Monoton steigend oder begruendet nicht-monoton | [PASS/FAIL] | [Kurve: M1→M2→...] |
| QD7 | Ethik: Multiperspektivitaet + Ueberwaetigungsverbot adressiert | [PASS/FAIL] | [Sektions-Verweis] |
| QD8 | Strukturvorgaben: Artikulation + Narrativ + Differenzierung vorhanden | [PASS/FAIL] | [Sektions-Verweis] |

**Gate-Urteil:** [PASS / PASS mit WARN / FAIL]
**User-Validierung:** AUSSTEHEND — Lehrkraft prueft Mappen-Aufteilung, KE-Matrix, Progression, Narrativ.
```

---

## Mappen-Aufteilungs-Heuristiken

Die folgenden Heuristiken unterstuetzen Aufgabe 2 (Mappen-Aufteilung). Sie sind KEINE starren Regeln, sondern Orientierungshilfen. Die endgueltige Aufteilung basiert auf fachdidaktischem Urteil.

### H1: Natuerliche Ordnungsschnitte bevorzugen

Bei der Mappen-Aufteilung natuerliche Zaesuren der gewaehlten Ordnung nutzen. Bei chronologischen Themen: zeitliche Zaesuren (Schlachten, Vertraege, Regierungswechsel). Bei kategorialen Themen: thematische Cluster (Lebensbereiche, Akteursgruppen, Raumdimensionen). Jede Mappe sollte einen klar abgrenzbaren Abschnitt innerhalb der gewaehlten Ordnung abdecken.

**Kategoriale Fallbeispiele (Operationalisierung, adressiert RA-B-F06):**

| Thema | Ordnungsdimension | Natuerliche Schnitte (= Mappen) | Begruendung |
|---|---|---|---|
| Industrialisierung (kategorial) | Akteursgruppen | M1: Unternehmer, M2: Arbeiter, M3: Handwerker, M4: Staat | Jede Gruppe hat eigenstaendige Perspektive + eigene KE. Ueberschneidungen minimal. |
| Industrialisierung (hybrid) | Phasen + Aspekte | M1: Voraussetzungen (Agrarwende), M2: Fabriksystem (Technik), M3: Soziale Frage (Gesellschaft), M4: Reaktionen (Politik) | Grobe Chronologie, aber innerhalb jeder Mappe thematisch geschlossen. |
| Mittelalterliche Gesellschaft (kategorial) | Staende | M1: Adel/Ritter, M2: Klerus, M3: Bauern, M4: Stadtbuerger | Staendeordnung liefert natuerliche Cluster. Jede Mappe = 1 Stand mit eigener Lebenswelt. |
| Erster Weltkrieg (hybrid) | Raumdimensionen | M1: Weg in den Krieg (Diplomatie), M2: Westfront (Stellungskrieg), M3: Heimatfront (Gesellschaft), M4: Kriegsende (Politik) | Raum-Logik: Diplomatie → Front → Heimat → Nachkrieg. |

**Entscheidungshilfe bei kategorialen Themen:** Wenn >1 Cluster-Dimension moeglich ist (z.B. Akteure vs. Raeume vs. Aspekte), waehle die Dimension, bei der (a) die Schnitte am trennschaerfsten sind (minimale Ueberlappung) und (b) jeder Cluster eine eigenstaendige Kernerkenntnis tragen kann (H2-Kompatibilitaet).

### H2: Ein zentrales Konzept pro Mappe

Jede Mappe traegt genau EINE Kernidee, die in der Zentralen Erkenntnis formulierbar ist. Wenn eine Mappe zwei gleichwertige Kernideen hat, ist sie zu gross.

### H3: Materialfaehigkeit pruefen

Vor dem Festlegen einer Mappe pruefen: Gibt es genuegend potenzielle Materialien (Quellen, Bilder, Karten, Statistiken) fuer diesen thematischen Ausschnitt? Eine Mappe, die nur aus Darstellungstext bestehen kann, ist zu eng geschnitten.

### H4: Narrativ-Schnittstellen sichern

Zwischen je zwei aufeinanderfolgenden Mappen muss ein natuerlicher Uebergang moeglich sein ("Sandwich-Faehigkeit"): Die Erkenntnis der Mappe N wirft eine Frage auf, die Mappe N+1 beantwortet.

### H5: Konkreter Anker fuer Vergegenwärtigung

Jede Mappe sollte mindestens einen konkreten Ankerpunkt enthalten, der Vergegenwärtigung ermoeglicht. Bei Ereignisgeschichte: datierbares Ereignis. Bei konzeptuellen Themen: konkretes Fallbeispiel, exemplarische Person oder anschauliche Situation. Rein abstrakte Mappen ohne konkreten Anker sind zu abstrakt fuer R7-Niveau — die didaktische Zuschreibung einer konkreten Situation ist immer moeglich und noetig.

**Konkretisierungs-Schwelle (Operationalisierung, adressiert RA-B-F07):**

Ein Anker ist "konkret genug", wenn er mindestens 1 der folgenden Marker enthaelt: Personenname, Ortsname, Jahreszahl/Datum, exemplarisches Fallbeispiel mit szenischer Konkretion (wer tut was wo).

**Vier-Quadranten-Matrix:**

| | Raum-Anker | Zeit-Anker |
|---|---|---|
| **Ereignis** | Ort: "Berlin, Maerz 1848" | Datum: "Am 28. Juni 1914" |
| **Konzept** | Fallbeispiel: "Die Textilfabrik in Augsburg" | Historisches Moment: "Kants 'Kritik der reinen Vernunft' (1781)" |

**FAIL/PASS-Beispiele:**

| Themenbereich | FAIL (zu abstrakt) | PASS (konkret genug) |
|---|---|---|
| Aufklaerung | "Die Zeit der Aufklaerung veraenderte das Denken." | "Kant schrieb 1784: 'Habe Mut, dich deines eigenen Verstandes zu bedienen.'" |
| Industrialisierung | "Die Arbeiter hatten es schwer." | "In der Augsburger Kammgarnspinnerei arbeiteten Kinder ab 8 Jahren — 14 Stunden am Tag." |
| Verfassungsrecht | "Die Verfassung regelte die Rechte der Buerger." | "Die Paulskirchenverfassung von 1849 versprach Pressefreiheit — doch der preussische Koenig lehnte ab." |
| Wissenschaftsgeschichte | "Neue Entdeckungen veraenderten das Weltbild." | "Als Darwin 1859 'Die Entstehung der Arten' veroeffentlichte, reagierte die Kirche mit Empoerung." |
| Alltag/Sozialgeschichte | "Das Leben in der Stadt war anders als auf dem Land." | "Familie Meier zog 1870 aus dem Dorf Oberndorf nach Muenchen — und teilte sich dort mit 3 Familien eine Wohnung." |
| Recht/Ethik | "Die Menschenrechte wurden entwickelt." | "1789 erklaerte die franzoesische Nationalversammlung: Alle Menschen sind frei und gleich an Rechten." |

**Operativer Test fuer Agenten:** Nach Formulierung der Mappen-Grobstruktur pruefen: Enthaelt die "Zentrale Erkenntnis" oder der "Thematische Schwerpunkt" mindestens einen konkreten Marker (Name, Ort, Jahr, szenisches Fallbeispiel)? Wenn Nein: Anker ergaenzen oder Formulierung konkretisieren.

### H6: Vorgaenger-Kontinuitaet

Bei Folge-Games: Mappe 1 knuepft an den Ausblick/die offene Frage des Vorgaenger-Games an. Keine Wiederholung des Vorgaenger-Stoffs, aber klarer narrativer Anschluss.

### H7: Stoffdichte-Kontrolle

Pro Mappe die distinkten Ereignisse/Konzepte zaehlen. Bei mehr als 6 distinkten Eintraegen: Warnung — Mappe ist moeglicherweise ueberladen. Pruefen, ob ein Split oder eine Priorisierung noetig ist. Zielbereich: 3-5 Kernereignisse/-konzepte pro Mappe.
