# Guetekriterien Hefteintrag (Sicherung)

**Datum:** 2026-04-03 (v2 — empirische Revision auf Basis 8 gerendeter Praxis-Tafelbilder)
**Status:** v2 — revidiert mit empirischem TB-Befund (8 Excalidraw-Tafelbilder, 4 Unterrichtsentwuerfe, Sequenz Erster Weltkrieg GPG7). v1-Basis: Audit Sicherungskette M9, EVALUATION_SCPL_HEFTEINTRAG.md, GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md Stufe-2, fachdidaktischer Recherche.
**Einsatzort:** Phase 2.1c Achse 6 (primaer), Phase 4 Browser-Validierung (sekundaer)

---

## 1. Abgrenzung zu GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md

GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md (G1-G14) prueft die **Entwurfsqualitaet** des Hefteintrags in Phase 0.4 — Struktur, Reduktion, Ordnungsmuster, Erarbeitbarkeit gegen Plan. Die Stufe-2 Re-Evaluation (G3, G5, G10, G12, G14 in Phase 2.1c) gleicht fuenf dieser Kriterien gegen produzierte Materialien ab.

Dieses Dokument prueft die **Produktqualitaet** des fertigen Hefteintrags nach Achse-6-Revision: Stimmt das Endprodukt als Lernwerkzeug fuer SuS? Sind zusammenfassung und ueberleitung didaktisch tragfaehig? Bildet der Hefteintrag den Material-Erarbeitungsweg ab?

Keine Redundanz: Stufe-2 Re-Evaluation bleibt in GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md. Dieses Dokument deckt ab, was dort nicht geprueft wird.

---

## 2. Leitsatz

Der Hefteintrag ist das bleibende Artefakt einer Unterrichtsstunde. Beim Lernen fuer eine Probe rekapituliert der SuS anhand des Hefteintrags mental den Erarbeitungsweg. Ein guter Hefteintrag macht das moeglich, ohne dass der SuS die Materialien erneut lesen muss. Er ist kein Zusammenfassungstext, sondern ein **strukturiertes Denkprotokoll** — die sichtbare Ordnung dessen, was SuS durch Materialarbeit entdeckt haben.

### 2.1 Empirischer Befund: Schaubild-Charakter (v2)

Analyse von 8 gerenderten Praxis-Tafelbildern (Sequenz Erster Weltkrieg, GPG7) + 4 Unterrichtsentwuerfen ergibt: Reale Hefteintraege sind **Schaubild-Kopien** mit gezielter Elaborierung. Nicht Fliesstext, nicht reine Nominalphrasen, sondern ein Zwischenformat:

- **Schaubild-Basis:** Knoten (kompakte Kurzphrasen), typisierte Pfeile (kausal, temporal, kontrastiv), Farbsemantik, raeumliche Ordnung — identisch mit dem Tafelbild.
- **Ergaenzende Elaborierung:** Kurzesaetze (max 15 Woerter), die Verbindungen zwischen Knoten explizieren, wo die reine Pfeilstruktur fuer R7-SuS nicht selbsttragend ist. Die Elaborierung ERSETZT nicht die Schaubildstruktur, sondern ERGAENZT sie.
- **Merksatz-Kalibrierung:** Der Merksatz (scpl.loesung[]) darf elaborierter sein als im TB — 1-3 Saetze als qualifizierte Antwort auf die Stundenfrage. Die TB-Konvention (1 kompakter Satz) ist Untergrenze, nicht Obergrenze.

**Invariante Drei-Ebenen-Architektur** (100% konsistent ueber alle 8 TBs):
1. **Ebene 1 (oben):** Stundenfrage
2. **Ebene 2 (mitte):** Erarbeitungszone (Knoten + Verbindungen + optionale Elaborierung)
3. **Ebene 3 (unten):** Merksatz / Schlussfolgerung

**Sechs empirische Ordnungsmuster-Typen:**
- parallel-kausal: N Ursachen-Spalten → gemeinsame Wirkung
- sequenziell: Zeitliche Abfolge mit Pfeilen
- kontrastierend: Gegenueberstellung mit Pol-Wechsel
- metaphorisch: Visualisierte Metapher mit Komponenten
- relational: Gruppierungen + Beziehungslinien
- konzept-beispiel: Oberbegriff → Beispiele → Schlussfolgerung

---

## 3. Kriterien

Drei Prioritaetsstufen: **MUSS** (Verletzung = FAIL), **SOLL** (Verletzung = Nachbesserung), **KANN** (Empfehlung). Alle Kriterien beziehen sich auf den Hefteintrag NACH Achse-6-Revision.

### 3.1 SCPL-Text-Qualitaet nach Revision

| # | Kriterium | Operationalisierung | Prueflogik |
|---|---|---|---|
| HE1 | **Material-Konkretion** (MUSS) | SCPL-Texte (kontextsatz, schritt-Saetze, problem.satz) referenzieren konkrete Material-Erlebnisse, nicht abstrakte Beschreibungen. "Die Buendniskarte zeigt..." statt "Es gab Buendnisse." | Pro SCPL-Zone: Enthaelt mindestens 1 Formulierung, die auf ein spezifisches Material-Element rueckfuehrbar ist (Quelle, Karte, Tagebuch, Darstellungstext). FAIL wenn: Alle Zonen rein abstrakt formuliert. |
| HE2 | **Erarbeitungsnaehe** (SOLL) | SCPL-Schritte spiegeln den Erarbeitungsweg wider — die Reihenfolge und Art, wie SuS die Inhalte durch Materialarbeit erschlossen haben. | SCPL-Complication-Reihenfolge korrespondiert mit Material-Sequenz. Kein SCPL-Schritt beschreibt Wissen, das in keinem Material erarbeitet wird. |
| HE3 | **Fachbegriff-Identitaet** (MUSS) | Fachbegriffe im Hefteintrag verwenden exakt dieselbe Form wie im Material, in dem sie eingefuehrt werden. Kein stiller Begriffswechsel zwischen Material und Hefteintrag. | Pro Fachbegriff im SCPL-Text: Kommt derselbe Begriff in mindestens 1 Material-JSON vor (Feld: fachbegriffe oder inhalt). FAIL wenn: Hefteintrag-Fachbegriff in keinem Material vorkommt. |
| HE4 | **Strukturell-sprachliche Kohaerenz** (SOLL) | Der Hefteintrag bildet eine kohaerente Einheit aus Schaubild-Elementen (Knoten, Pfeile) und ergaenzender Elaborierung. Kein Registerwechsel innerhalb des Hefteintrags. Elaborierende Kurzesaetze muessen sich nahtlos in die Knotenstruktur einfuegen — sie ergaenzen Verbindungen, ersetzen nicht die Schaubildlogik. | Lese-Test: Stundenfrage → Erarbeitungszone (Knoten + Elaborierung) → Merksatz als strukturierte Einheit. Kein Stilbruch zwischen kompakten Knoten und elaborierten Verbindungstexten. Keine Prosa-Absaetze, die die Schaubildstruktur aufloesen. FAIL wenn: Elaborierung die Knotenstruktur verdraengt (Prosa statt Schaubild) ODER Knoten und Elaborierung sprachlich inkonsistent. |

### 3.2 zusammenfassung

| # | Kriterium | Operationalisierung | Prueflogik |
|---|---|---|---|
| HE5 | **Prozess-Synthese** (MUSS) | Die zusammenfassung beschreibt den Erarbeitungsprozess, nicht nur das Ergebnis. Sie macht sichtbar, WAS SuS GETAN haben (untersucht, verglichen, gelesen, analysiert), nicht nur was sie wissen sollen. | Mindestens 1 Handlungsverb oder erarbeitungsbezogene Formulierung. Kein reines Faktenreferat. FAIL wenn: zusammenfassung ist eine Inhaltswiedergabe ohne Prozessbezug. |
| HE6 | **Disjunktion zu Merksatz** (MUSS) | zusammenfassung wiederholt NICHT die Kernerkenntnisse / Merksaetze. Sie ergaenzt diese um den Erarbeitungsweg. | Kein Satz der zusammenfassung ist semantisch aequivalent zu einem Eintrag in scpl.loesung[]. FAIL wenn: zusammenfassung paraphrasiert Merksatz. |
| HE7 | **R7-Laenge** (SOLL) | zusammenfassung: 2-3 Saetze, max. 50 Woerter. Kein Aufsatz. SuS sollen den Text in unter 30 Sekunden lesen koennen. | Woerter zaehlen. Ziel: 30-50. |

### 3.3 ueberleitung (Mappe-zu-Mappe)

| # | Kriterium | Operationalisierung | Prueflogik |
|---|---|---|---|
| HE8 | **Bruecke nach vorn** (MUSS, nicht-letzte Mappen) | Die ueberleitung verbindet die Kernerkenntnis dieser Mappe mit der Stundenfrage der naechsten Mappe. SuS sollen verstehen, warum die naechste Mappe relevant ist. | Ueberleitung referenziert inhaltlich (a) Ergebnis dieser Mappe und (b) offene Frage / naechstes Thema. FAIL wenn: Ueberleitung ist generisch ("Im naechsten Abschnitt...") ohne inhaltlichen Bezug. |
| HE9 | **Kein Spoiler** (MUSS) | Ueberleitung weckt Neugier, nimmt aber NICHT die Kernerkenntnis der naechsten Mappe vorweg. | Ueberleitung enthaelt keine Aussage, die in scpl.loesung[] der naechsten Mappe steht. |
| HE10 | **Letzte-Mappe-Variante** (MUSS, letzte Mappe) | Letzte Mappe hat keine ueberleitung, sondern einen Reflexionsimpuls. Dieser ist eine offene Transfer-Frage, die ueber den Escape-Game-Inhalt hinausweist. | Reflexionsimpuls endet mit "?" und adressiert Gegenwartsbezug oder persoenliche Stellungnahme. Keine geschlossene Frage (ja/nein). |

### 3.4 Schaubild-Strukturqualitaet (v2 — empirisch fundiert)

| # | Kriterium | Operationalisierung | Prueflogik |
|---|---|---|---|
| HE14 | **Schaubild-Charakter** (MUSS) | Der Hefteintrag ist primaer ein strukturiertes Schaubild (Knoten + Verbindungen), nicht ein Prosa-Text. Die Erarbeitungszone besteht aus kompakten Knoten (max 12 Woerter), verbunden durch typisierte Relationen. Elaborierende Kurzesaetze (max 15 Woerter) sind zulaessig, wo sie Verbindungen fuer R7-SuS explizieren, die sonst nicht selbsttragend waeren. | Zaehle Knoten vs. Prosa-Saetze in der Erarbeitungszone. Knoten muessen ueberwiegen. Kein SCPL-Schritt darf ein Prosa-Absatz (>15 Woerter) sein. FAIL wenn: Erarbeitungszone ueberwiegend aus Prosa-Saetzen besteht (>50% der Textmasse als Fliesstext statt als Knoten/Kurzphrasen). |
| HE15 | **Ordnungsmuster-Treue** (SOLL) | Der Hefteintrag folgt einem der 6 empirischen Ordnungsmuster-Typen (parallel-kausal, sequenziell, kontrastierend, metaphorisch, relational, konzept-beispiel). Die Knotenstruktur und Verbindungslogik passen zum gewaehlten Typ. | Pruefe: (a) ordnungsmuster ist eines der 6 Typen. (b) Verbindungs-Labels und -Richtungen passen zum Typ (kausal: Ursache→Wirkung; sequenziell: frueher→spaeter; kontrastierend: Pol A ↔ Pol B; etc.). FAIL wenn: Mischung aus inkompatiblen Ordnungslogiken ohne Kenntlichmachung. |
| HE16 | **Merksatz-Kalibrierung** (SOLL) | scpl.loesung[] enthaelt 1-3 Saetze als qualifizierte Antwort auf die Stundenfrage. Weder reine TB-Nominalphrase noch Prosa-Absatz. Jeder Satz liefert einen eigenstaendigen Erkenntnisbeitrag. Merksatz darf elaborierter sein als TB-Kompaktform, wenn die Elaborierung die Verankerung fuer R7-SuS stuetzt. | Pruefe: (a) 1-3 Eintraege in scpl.loesung[]. (b) Jeder Eintrag max 20 Woerter. (c) Jeder Eintrag beantwortet einen Aspekt der Stundenfrage. (d) Kein Eintrag ist eine reine Wiederholung eines Knotentexts. |
| HE17 | **S-Zone-Autonomie** (MUSS) | situation.kontextsatz ist ohne Kenntnis vorheriger Mappen verstaendlich und relevant fuer die aktuelle Stundenfrage. Keine Rekapitulation von Vormappe-Wissen. Der Kontextsatz fuehrt direkt in das Thema DIESER Stunde ein, nicht zurueck auf frueheres Wissen. | Pruefe: Enthaelt der Kontextsatz Inhalte, die primaer einer vorherigen Mappe angehoeren? FAIL wenn: Kontextsatz rekapituliert Vormappe-Erkenntnisse (z.B. "Buendnisse machten aus einem Mord einen Weltkrieg" als S-Zone fuer Mappe 3 "Kriegsbegeisterung"). PASS wenn: Kontextsatz setzt eigenstaendig den Rahmen fuer die aktuelle Stundenfrage. |
| HE18 | **Konzept-Elaborierung** (MUSS) | Jeder Knoten, der ein Fachkonzept benennt, das ueber eine einfache Definition hinausgeht (z.B. Burgfrieden, Merkantilismus, Stellungskrieg), hat eine beigefuegte Elaborierung (max 15 Woerter), die das Konzept fuer R7-SuS auf einen Satz reduziert. Pruefung: Wuerde ein R7-SuS den Knoten ohne die Elaborierung verstehen? | Pro Knoten mit komplexem Konzept: Existiert eine Elaborierung, die das Konzept erklaert? FAIL wenn: Komplexer Knoten steht ohne Erklaerung (z.B. "Burgfrieden (SPD stimmt zu)" ohne Erklaerung was Burgfrieden bedeutet). PASS wenn: Elaborierung vorhanden, z.B. "Burgfrieden: Alle Parteien stellen Streit ein und unterstuetzen gemeinsam den Krieg." |

### 3.5 Lernprodukt-Qualitaet

| # | Kriterium | Operationalisierung | Prueflogik |
|---|---|---|---|
| HE11 | **Selbststaendigkeit** (MUSS) | Der Hefteintrag ist ohne Rueckgriff auf die Escape-Game-Materialien verstaendlich. SuS koennen ihn zum Lernen verwenden, auch wenn sie keinen Zugang zum digitalen Material mehr haben. | Lese-Test: Hefteintrag (SCPL + Merkbox + zusammenfassung) isoliert lesen. Kein Satz setzt Wissen voraus, das nur im Material steht und nirgends im Hefteintrag erklaert wird. |
| HE12 | **Lernbarkeit** (SOLL) | Hefteintrag folgt der empirischen Drei-Ebenen-Architektur: (1) Stundenfrage als Titel, (2) Erarbeitungszone mit klar erkennbaren Knoten + Verbindungen + optionaler Elaborierung, (3) Merksatz als visuell abgesetzter Abschluss. SuS erkennen auf einen Blick: Was sind die Kernbegriffe (Knoten)? Was sind die Zusammenhaenge (Pfeile/Elaborierung)? Was ist die Kernaussage (Merksatz)? | Pruefung: (a) Knoten sind als eigenstaendige Einheiten erkennbar, nicht in Prosa aufgeloest. (b) Merksatz (scpl.loesung[]) ist visuell abgesetzt — kein weiterer Text konkurriert. (c) Elaborierende Kurzesaetze sind von Knoten unterscheidbar (z.B. durch Position zwischen Knoten, nicht als Knoten-Ersatz). FAIL wenn: Erarbeitungszone als Prosa-Block erscheint ODER Merksatz nicht auf einen Blick identifizierbar. |
| HE13 | **Fachbegriff-Kennzeichnung** (SOLL) | Alle Fachbegriffe im Hefteintrag sind beim ersten Auftreten erkennbar markiert (per Engine: Doppelpunkt-/Gedankenstrich-Konvention). SuS koennen Fachbegriffe gezielt nachschlagen. | Pro Fachbegriff in scpl.*.fachbegriffe[]: Kommt in der zugehoerigen Zone per Doppelpunkt oder Gedankenstrich vor (Engine-Konvention). |

---

## 4. Q-Gate-Protokoll (Phase 2.1c Achse 6)

```markdown
### Q-Gate: Hefteintrag Mappe [N] — Produktqualitaet (HE1-HE13)

| # | Kriterium | Prio | Ergebnis | Detail |
|---|---|---|---|---|
| HE1 | Material-Konkretion | MUSS | PASS/FAIL | [Anzahl] Zonen mit Material-Bezug / [Gesamt] |
| HE2 | Erarbeitungsnaehe | SOLL | PASS/FAIL | SCPL-Reihenfolge ↔ Material-Sequenz |
| HE3 | Fachbegriff-Identitaet | MUSS | PASS/FAIL | [Anzahl] Begriffe geprueft, [Anzahl] identisch |
| HE4 | Sprachliche Geschlossenheit | SOLL | PASS/FAIL | Kohaerenz-Bewertung |
| HE5 | Prozess-Synthese | MUSS | PASS/FAIL | zusammenfassung enthaelt Handlungsverb: ja/nein |
| HE6 | Disjunktion zu Merksatz | MUSS | PASS/FAIL | Keine Paraphrase von scpl.loesung[] |
| HE7 | R7-Laenge | SOLL | PASS/FAIL | zusammenfassung: [N] Woerter (Ziel: 30-50) |
| HE8 | Bruecke nach vorn | MUSS* | PASS/FAIL | Inhaltlicher Bezug zu Mappe N+1 |
| HE17 | S-Zone-Autonomie | MUSS | PASS/FAIL | Kein Vormappe-Wissen im Kontextsatz |
| HE18 | Konzept-Elaborierung | MUSS | PASS/FAIL | Komplexe Knoten mit Erklaerung |
| HE9 | Kein Spoiler | MUSS* | PASS/FAIL | Keine Vorwegnahme Mappe-N+1-Merksatz |
| HE10 | Letzte-Mappe-Variante | MUSS** | PASS/FAIL | Reflexionsimpuls: offene Transfer-Frage |
| HE11 | Selbststaendigkeit | MUSS | PASS/FAIL | Isoliert verstaendlich: ja/nein |
| HE12 | Lernbarkeit | SOLL | PASS/FAIL | Visuelle Hierarchie klar |
| HE13 | Fachbegriff-Kennzeichnung | SOLL | PASS/FAIL | [Anzahl] korrekt markiert / [Gesamt] |
| HE14 | Schaubild-Charakter | MUSS | PASS/FAIL | Knoten-Anteil vs. Prosa-Anteil in Erarbeitungszone |
| HE15 | Ordnungsmuster-Treue | SOLL | PASS/FAIL | Typ: [X], Verbindungslogik konsistent: ja/nein |
| HE16 | Merksatz-Kalibrierung | SOLL | PASS/FAIL | [N] Eintraege, max [N] Woerter, Stundenfrage beantwortet: ja/nein |
**Gesamt:** PASS / FAIL (HE[X] nachgebessert)

*HE8/HE9: Nur fuer nicht-letzte Mappen. **HE10: Nur fuer letzte Mappe.
```

---

## 5. Zusammenspiel mit bestehenden Pruefschritten

| Pruefschritt | Dokument | Phase | Prueft |
|---|---|---|---|
| G1-G14 Stufe 1 | GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md | 0.4 | Entwurfsqualitaet (Struktur, Reduktion, Ordnungsmuster) |
| G3/G5/G10/G12/G14 Stufe 2 | GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md Sek. 10 | 2.1c Achse 6 | Re-Evaluation gegen produzierte Materialien |
| UE-1 bis UE-5 | VERTRAG_PHASE_2-1c_CROSS.md Achse 5 | 2.1c Achse 5 | Material-zu-Material-Ueberleitungen |
| **HE1-HE16** | **Dieses Dokument** | **2.1c Achse 6 + Phase 4** | **Produktqualitaet des fertigen Hefteintrags (inkl. Schaubild-Struktur v2)** |

Reihenfolge innerhalb Phase 2.1c Achse 6: Zuerst Stufe-2 Re-Evaluation (G3/G5/G10/G12/G14), dann HE1-HE13. Begruendung: Die Stufe-2-Pruefung kann Formulierungs-Revisionen ausloesen, die HE-Pruefung soll auf dem revidierten Text operieren.

---

## 6. Nutzungshinweis

Phase 2.1c Achse 6 liest dieses Dokument NICHT als Runtime-Lektuere (Vertrag bleibt schlank). Die Kriterien HE1-HE13 sind als Prueflogik im Vertrag selbst operationalisiert. Dieses Dokument dient als kanonische Referenz bei Audits, Qualitaetsbefunden und Skill-Orientierung.
