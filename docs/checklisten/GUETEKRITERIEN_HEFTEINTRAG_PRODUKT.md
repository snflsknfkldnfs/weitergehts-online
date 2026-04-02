# Guetekriterien Hefteintrag (Sicherung)

**Datum:** 2026-04-02
**Status:** v1 — abgeleitet aus Audit Sicherungskette M9, EVALUATION_SCPL_HEFTEINTRAG.md, GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md Stufe-2, fachdidaktischer Recherche
**Einsatzort:** Phase 2.1c Achse 6 (primaer), Phase 4 Browser-Validierung (sekundaer)

---

## 1. Abgrenzung zu GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md

GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md (G1-G14) prueft die **Entwurfsqualitaet** des Hefteintrags in Phase 0.4 — Struktur, Reduktion, Ordnungsmuster, Erarbeitbarkeit gegen Plan. Die Stufe-2 Re-Evaluation (G3, G5, G10, G12, G14 in Phase 2.1c) gleicht fuenf dieser Kriterien gegen produzierte Materialien ab.

Dieses Dokument prueft die **Produktqualitaet** des fertigen Hefteintrags nach Achse-6-Revision: Stimmt das Endprodukt als Lernwerkzeug fuer SuS? Sind zusammenfassung und ueberleitung didaktisch tragfaehig? Bildet der Hefteintrag den Material-Erarbeitungsweg ab?

Keine Redundanz: Stufe-2 Re-Evaluation bleibt in GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md. Dieses Dokument deckt ab, was dort nicht geprueft wird.

---

## 2. Leitsatz

Der Hefteintrag ist das bleibende Artefakt einer Unterrichtsstunde. Beim Lernen fuer eine Probe rekapituliert der SuS anhand des Hefteintrags mental den Erarbeitungsweg. Ein guter Hefteintrag macht das moeglich, ohne dass der SuS die Materialien erneut lesen muss. Er ist kein Zusammenfassungstext, sondern ein **strukturiertes Denkprotokoll** — die sichtbare Ordnung dessen, was SuS durch Materialarbeit entdeckt haben.

---

## 3. Kriterien

Drei Prioritaetsstufen: **MUSS** (Verletzung = FAIL), **SOLL** (Verletzung = Nachbesserung), **KANN** (Empfehlung). Alle Kriterien beziehen sich auf den Hefteintrag NACH Achse-6-Revision.

### 3.1 SCPL-Text-Qualitaet nach Revision

| # | Kriterium | Operationalisierung | Prueflogik |
|---|---|---|---|
| HE1 | **Material-Konkretion** (MUSS) | SCPL-Texte (kontextsatz, schritt-Saetze, problem.satz) referenzieren konkrete Material-Erlebnisse, nicht abstrakte Beschreibungen. "Die Buendniskarte zeigt..." statt "Es gab Buendnisse." | Pro SCPL-Zone: Enthaelt mindestens 1 Formulierung, die auf ein spezifisches Material-Element rueckfuehrbar ist (Quelle, Karte, Tagebuch, Darstellungstext). FAIL wenn: Alle Zonen rein abstrakt formuliert. |
| HE2 | **Erarbeitungsnaehe** (SOLL) | SCPL-Schritte spiegeln den Erarbeitungsweg wider — die Reihenfolge und Art, wie SuS die Inhalte durch Materialarbeit erschlossen haben. | SCPL-Complication-Reihenfolge korrespondiert mit Material-Sequenz. Kein SCPL-Schritt beschreibt Wissen, das in keinem Material erarbeitet wird. |
| HE3 | **Fachbegriff-Identitaet** (MUSS) | Fachbegriffe im Hefteintrag verwenden exakt dieselbe Form wie im Material, in dem sie eingefuehrt werden. Kein stiller Begriffswechsel zwischen Material und Hefteintrag. | Pro Fachbegriff im SCPL-Text: Kommt derselbe Begriff in mindestens 1 Material-JSON vor (Feld: fachbegriffe oder inhalt). FAIL wenn: Hefteintrag-Fachbegriff in keinem Material vorkommt. |
| HE4 | **Sprachliche Geschlossenheit** (SOLL) | Der revidierte SCPL-Text liest sich als kohaerente Einheit — kein Bruch zwischen Situation und Complication, kein Registerwechsel innerhalb des Hefteintrags. | Lese-Test: Kontextsatz → Complication-Schritte → Problem-Satz → Merkbox als fortlaufenden Text. Kein Stilbruch, keine Wiederholung, kein thematischer Sprung. |

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

### 3.4 Lernprodukt-Qualitaet

| # | Kriterium | Operationalisierung | Prueflogik |
|---|---|---|---|
| HE11 | **Selbststaendigkeit** (MUSS) | Der Hefteintrag ist ohne Rueckgriff auf die Escape-Game-Materialien verstaendlich. SuS koennen ihn zum Lernen verwenden, auch wenn sie keinen Zugang zum digitalen Material mehr haben. | Lese-Test: Hefteintrag (SCPL + Merkbox + zusammenfassung) isoliert lesen. Kein Satz setzt Wissen voraus, das nur im Material steht und nirgends im Hefteintrag erklaert wird. |
| HE12 | **Lernbarkeit** (SOLL) | Hefteintrag hat eine klare visuelle Hierarchie: Stundenfrage (Titel) → SCPL-Schritte (Argumentationsfluss) → Merkbox (Kernaussage, hervorgehoben) → zusammenfassung. SuS erkennen auf einen Blick, was der zentrale Merksatz ist. | Merkbox enthaelt genau die Kernerkenntnisse, sonst nichts. Kein weiterer Text konkurriert visuell mit der Merkbox. |
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
| HE9 | Kein Spoiler | MUSS* | PASS/FAIL | Keine Vorwegnahme Mappe-N+1-Merksatz |
| HE10 | Letzte-Mappe-Variante | MUSS** | PASS/FAIL | Reflexionsimpuls: offene Transfer-Frage |
| HE11 | Selbststaendigkeit | MUSS | PASS/FAIL | Isoliert verstaendlich: ja/nein |
| HE12 | Lernbarkeit | SOLL | PASS/FAIL | Visuelle Hierarchie klar |
| HE13 | Fachbegriff-Kennzeichnung | SOLL | PASS/FAIL | [Anzahl] korrekt markiert / [Gesamt] |
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
| **HE1-HE13** | **Dieses Dokument** | **2.1c Achse 6 + Phase 4** | **Produktqualitaet des fertigen Hefteintrags** |

Reihenfolge innerhalb Phase 2.1c Achse 6: Zuerst Stufe-2 Re-Evaluation (G3/G5/G10/G12/G14), dann HE1-HE13. Begruendung: Die Stufe-2-Pruefung kann Formulierungs-Revisionen ausloesen, die HE-Pruefung soll auf dem revidierten Text operieren.

---

## 6. Nutzungshinweis

Phase 2.1c Achse 6 liest dieses Dokument NICHT als Runtime-Lektuere (Vertrag bleibt schlank). Die Kriterien HE1-HE13 sind als Prueflogik im Vertrag selbst operationalisiert. Dieses Dokument dient als kanonische Referenz bei Audits, Qualitaetsbefunden und Skill-Orientierung.
