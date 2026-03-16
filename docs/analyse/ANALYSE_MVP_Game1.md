# Problemanalyse MVP Game 1 "Pulverfass Europa"

**Datum:** 2026-03-15
**Analysiert:** data.json (386 Zeilen, 4 Mappen, 20 Aufgaben), escape-engine.js (1200 Zeilen), index.html, mappe-1.html bis mappe-4.html, lehrkraft.html
**Perspektive:** Ed-Tech / L&D-Beratung, Fachdidaktik GPG Mittelschule R7

---

## 1. Befundkategorien

| Kategorie | Schwere | Befunde |
|---|---|---|
| A: Fundamentaler Designfehler | Kritisch | 1 (kein Erarbeitungsmaterial) |
| B: Aufgabendesign-Fehler | Hoch | 3 (Reihenfolge, Freitext, Tipps) |
| C: Technischer Bug | Hoch | 1 (Code-Anzeige) |
| D: Architektur-Gaps | Mittel | 4 (Schema, Template, Engine, Agenten) |
| E: Didaktische Schwaechen | Mittel | 3 (Monotonie, Scaffolding, UE-Phasen) |

---

## 2. Befunde im Detail

### A1: KEIN ERARBEITUNGSMATERIAL (Kritisch)

**Befund:** Das Game ist ein reines Abfrage-Quiz. Es existiert keine Phase, in der SuS den Lerninhalt erarbeiten koennten. Alle 20 Aufgaben setzen Vorwissen voraus, das nirgends im Game vermittelt wird.

**Konsequenz:** Das Escape-Game ist in seiner jetzigen Form im Unterricht nicht einsetzbar — es prueft Wissen, das nicht vorhanden ist. Ein R7-Schueler ohne Vorwissen zu WWI-Buendnissen kann keine einzige Aufgabe loesen.

**Didaktische Einordnung:** Ein Escape-Game nach dem Arbeitsblattprinzip muss dem Dreischritt folgen: (1) Material/Quelle praesentieren → (2) Inhalt erarbeiten/verstehen → (3) Wissen anwenden/pruefen. Aktuell fehlt Schritt 1 und 2 komplett.

**Was fehlt pro Mappe (konkret):**

| Mappe | Fehlende Materialien |
|---|---|
| 1: Pulverfass Europa | Karte Europas 1914 mit Buendnislinien, Kurztext zu Imperialismus/Nationalismus, historische Quelle (z.B. zeitgenoessischer Pressetext zu Buendnissen) |
| 2: Attentat Sarajevo | Darstellungstext zum Attentat (Wer/Wo/Wann/Warum), Zeitleiste Julikrise als Schaubild, Pulverfass-Metapher als illustrierte Erklaerung |
| 3: Kriegsbegeisterung | Historische Bildquelle (Propagandaplakat 1914), Tagebucheintrag/Brief eines Soldaten, Gegenposition (Brief einer Mutter/Ehefrau) |
| 4: Schlieffen-Plan | Kartenskizze des Schlieffen-Plans (Belgien-Route), Erklaerungstext Zweifrontenproblematik, Kurzdarstellung Marne-Schlacht |

**Ziel-Architektur:** Jede Mappe muss VOR den Aufgaben eine Erarbeitungsphase enthalten. Materialien muessen so aufbereitet sein, dass alle Aufgaben ausschliesslich anhand des praesentieren Materials loesbar sind (keine externen Quellen, kein Vorwissen noetig).

---

### B1: Reihenfolge-Aufgaben verraten Loesung durch Zeitangaben (Hoch)

**Befund:** 2 von 3 Reihenfolge-Aufgaben enthalten Jahreszahlen/Datumsangaben direkt in den Optionen. Damit ist die korrekte Reihenfolge trivial ablesbar — es wird Sortierfaehigkeit statt historisches Verstaendnis getestet.

**Betroffene Aufgaben:**

| Aufgabe | Optionen mit Zeitangabe | Problem |
|---|---|---|
| aufgabe-1-3 | "Dreibund **(1882)**", "Franz.-russ. Buendnis **(1894)**", "Entente Cordiale **(1904)**", "Brit.-russ. Abkommen **(1907)**" | Loesungsreihenfolge = aufsteigende Jahreszahl |
| aufgabe-2-2 | Alle 6 Optionen mit Datum: "(28. Juni)", "(23. Juli)", "(28. Juli)", "(30. Juli)", "(1. August)", "(3. August)" | Triviale chronologische Sortierung |
| aufgabe-4-2 | Keine Zeitangaben | OK |

**Fix:** Jahreszahlen aus den Optionstext entfernen. Die Aufgabe muss historisches Verstaendnis testen ("Welches Buendnis kam als Reaktion auf welches?"), nicht Zahlensortierung.

---

### B2: Freitext-Code-Aufgaben: Exaktheit ueberfordert R7-SuS (Hoch)

**Befund:** 4 Freitext-Code-Aufgaben erfordern exakte Worteingabe. Die Engine vergleicht `eingabe.trim().toLowerCase() === loesung`. Kein Fuzzy-Matching, keine Toleranz fuer Tippfehler oder Umlaute.

| Aufgabe | Erwartete Loesung | Problem |
|---|---|---|
| aufgabe-1-5 | "buendnispolitik" | Zusammengesetztes Fremdwort, Umlaut ue/ue, SuS schreiben "Bündnis Politik" oder "bündnis-politik" |
| aufgabe-2-5 | "ultimatum" | Akzeptabel, lateinisches Fremdwort mit Tipp-Hinweis |
| aufgabe-3-5 | "weihnachten" | Einfach, aber kein fachliches Wissen — trivial |
| aufgabe-4-5 | "marne" | Geografisches Einzelwissen, ohne Kartenmaterial nicht ableitbar |

**Fix (2 Ebenen):**
1. **Engine:** Fuzzy-Matching einfuehren (Levenshtein-Distanz ≤ 2, Umlaut-Normalisierung ae/oe/ue, Bindestrich-Toleranz)
2. **Inhalt:** Aufgabenstellung so umformulieren, dass die Antwort aus dem Erarbeitungsmaterial eindeutig hervorgeht (nicht raten lassen)

---

### B3: Tipp-System verraet Loesungen zu frueh (Hoch)

**Befund:** Systematisch ueber alle 20 Aufgaben: Stufe-2-Tipps geben haeufig bereits die Loesung oder die Loesungsstruktur preis. Stufe-3-Tipps benennen ausnahmslos die vollstaendige Loesung explizit ("Richtig ist B:", "Loesung: X, Y, Z").

**Beispiele:**

| Aufgabe | Stufe | Text | Problem |
|---|---|---|---|
| aufgabe-1-1 | 2 | "Deutschland, OeU und Italien bildeten den Dreibund. Die anderen drei Laender gehoeren zur Triple Entente." | IST die Loesung |
| aufgabe-1-2 | 3 | "Richtig ist B:" | Benennt Buchstabe |
| aufgabe-2-2 | 3 | "Richtige Reihenfolge: 1. Attentat (28.6.), 2. Ultimatum (23.7.) ..." | Vollstaendige Loesung |

**Fix (Tipp-Design-Prinzip):**
- Stufe 1: Fragestellung reformulieren / Denkansatz ohne Richtung
- Stufe 2: Auf relevantes Material verweisen ("Schau dir die Karte nochmal an — welche Laender sind mit derselben Farbe markiert?")
- Stufe 3: Loesung ANDEUTEN, aber nie buchstaeblich wiedergeben. Stattdessen: Erklaerung des Zusammenhangs, die zur eigenen Ableitung fuehrt
- NIEMALS: "Richtig ist B" oder "Loesung: X, Y, Z"

---

### C1: Freischaltcode wird nicht automatisch angezeigt (Hoch)

**Befund:** Die Engine aktualisiert den Fortschrittsbalken nach jeder geloesten Aufgabe (`_updateFortschritt`), aber es gibt keinen Mechanismus, der den Freischaltcode einblendet oder sichtbar herleitet, wenn alle 5 Aufgaben einer Mappe geloest sind.

**Code-Analyse:** `_updateFortschritt()` (Zeile 1175) berechnet `percent` und setzt die Balkenbreite. Bei `percent === 100` passiert nichts Besonderes. Die Code-Eingabe-Section ist statisch im HTML — immer sichtbar, aber nie mit dem Code befuellt.

**Fix:** Nach Loesung aller Aufgaben (solved === total) muss:
1. Eine Erfolgsmeldung erscheinen ("Alle Aufgaben geloest! Dein Code fuer die naechste Ausgabe:")
2. Der Code visuell praesentiert werden (oder als Ergebnis der letzten Aufgabe herleitbar sein — didaktisch eleganter)
3. Die Code-Eingabe-Section hervorgehoben/animiert werden

---

### D1: data.json-Schema hat keine Material-Ebene (Architektur)

**Befund:** Das Schema kennt nur `meta` und `mappen[].aufgaben[]`. Es gibt kein Feld fuer Erarbeitungsmaterialien.

**Fehlend im Schema:**
```json
"mappen": [{
  "materialien": [
    {
      "typ": "darstellungstext | quellentext | bildquelle | karte | statistik | tagebuch | zeitleiste",
      "titel": "",
      "inhalt": "",
      "quelle": "",
      "lizenz": ""
    }
  ],
  "aufgaben": [...]
}]
```

---

### D2: Mappe-HTML-Template hat keine Material-Section (Architektur)

**Befund:** `mappe-template.html` und alle mappe-X.html gehen direkt von Header zu `<div id="aufgaben-container">`. Kein Platz fuer Material.

**Fehlend:** Eine `<section id="material-container">` vor dem Aufgaben-Container, mit eigenem Rendering in der Engine.

---

### D3: escape-engine.js hat keinen Material-Renderer (Architektur)

**Befund:** Die Engine rendert ausschliesslich Aufgaben (5 Typen). Es gibt keine Funktion, die Materialien (Texte, Bilder, Karten, Zeitleisten) in den DOM injiziert.

---

### D4: Agenten-Architektur erzeugt kein Material (Architektur)

**Befund:** Der aktuelle Workflow DIDAKTIK→INHALT→RAETSEL→TECHNIK→DESIGN→QUALITAET produziert:
- AGENT_INHALT: Strukturierte Inhalts-MDs (Kernaussagen, Fachbegriffe) — aber keine Materialien/Quellen/Artefakte
- AGENT_RAETSEL: Aufgaben + data.json — aber kein Material

**Fehlende Agenten-Rolle:** Ein Agent (oder Sub-Agent), der zwischen INHALT und RAETSEL steht und didaktische Materialien entwirft:
- Quellenauswahl (historische Texte, Bilder, Karten)
- Material-Aufbereitung (SuS-gerecht, altersangemessen)
- Progressive Disclosure (Motivation → Information → Detail)
- MCP-Tool-Nutzung (wikimedia-Bilder, excalidraw-Diagramme, ggf. Miro-Board)

---

### E1: Aufgaben-Monotonie innerhalb Mappen (Mittel)

**Befund:** Alle 4 Mappen folgen demselben Schema: 5 Aufgaben hintereinander, keine Abwechslung im Interaktionsmuster. Keine visuellen Elemente, keine Quellenbezuege, kein Narrativ-Fortschritt innerhalb der Mappe.

**Ziel:** Aufgaben sollen in den Erarbeitungsfluss eingebettet sein — nicht als Block danach.

---

### E2: Kein didaktisches Scaffolding (Mittel)

**Befund:** Aufgaben steigen nicht in der Komplexitaet. Mappe 1 beginnt mit einer Zuordnung (6 Laender → 2 Buendnisse), was ohne Vorwissen R7-Niveau uebersteigt. Keine einfache Einstiegsfrage, die Orientierung schafft.

**Fix:** Pro Mappe: Einfache Orientierungsfrage zuerst (z.B. "Schau dir die Karte an: In wie viele Gruppen waren die Laender Europas aufgeteilt?" → "2"). Dann steigern.

---

### E3: Keine UE-Phasenstruktur in Mappen (Mittel)

**Befund:** Mappen haben keine erkennbare Phasenstruktur (Motivation/Einstieg → Erarbeitung → Sicherung → Transfer). Die Mappe ist ein flacher Container mit Titel + 5 Fragen.

**Ziel-Phasenstruktur pro Mappe:**
1. **Einstieg/Motivation** (Narrativ-Fortschritt, Problemstellung, Handlungsdruck im Setting)
2. **Materialpool** (Quellen, Texte, Bilder — erarbeitbar)
3. **Erarbeitungsaufgaben** (verwoben mit Material, nicht danach)
4. **Sicherung** (Code-Ergebnis, Zusammenfassung, Transfer zur naechsten Mappe)

---

## 3. Zusammenfassung: Was muss v1 leisten?

### Paradigmenwechsel: Quiz → Interaktives Arbeitsblatt

| Dimension | MVP (ist) | v1 (soll) |
|---|---|---|
| Grundprinzip | Quiz (reine Abfrage) | Interaktives Arbeitsblatt (Erarbeitung + Anwendung) |
| Materialien | Keine | Darstellungstexte, Quellen, Bilder, Karten, Zeitleisten |
| Aufgaben-Einbettung | Block nach leerem Raum | Verwoben mit Material (Quelle links, Frage rechts) |
| Mappe-Struktur | Titel → 5 Aufgaben | Einstieg → Material → Erarbeitung → Sicherung |
| Tipp-System | Loesungsverrat | Materialverweis + Denkansatz |
| Reihenfolge-Aufgaben | Zeitangaben in Optionen | Inhaltliche Beschreibungen ohne Daten |
| Freitext | Exact-Match | Fuzzy-Matching + bessere Fragestellungen |
| Code-System | Manuell raten | Automatische Anzeige nach Loesung aller Aufgaben |
| Narrativ | Nur in meta.narrativ | Fortlaufend pro Mappe (Reporter recherchiert weiter) |

### Betroffene Infrastruktur-Komponenten

| Komponente | Aenderungsumfang |
|---|---|
| `data.json` Schema | Erweitern: `materialien[]` pro Mappe, ggf. `phasen[]` |
| `escape-engine.js` | Erweitern: Material-Renderer, Code-Anzeige-Logik, Fuzzy-Matching |
| `mappe-template.html` | Redesign: Material-Section, Phasenstruktur |
| `ORCHESTRATOR.md` | Workflow erweitern: Material-Agent einfuegen |
| `AGENT_INHALT.md` | Ausdifferenzieren: Material-Erstellung als Kernausgabe |
| Neuer Agent | `AGENT_MATERIAL.md` oder Erweiterung von AGENT_INHALT |
| `AGENT_RAETSEL.md` | Tipp-Design-Prinzipien verschaerfen, Reihenfolge-Regeln |
| `Checkliste` | Neue Pruefpunkte: Material vorhanden? Aufgaben aus Material loesbar? |
| CSS | Layout-Erweiterung: 2-Spalten (Material + Aufgabe) |
| MCP-Tools | Aktiv nutzen: wikimedia (Bilder), excalidraw (Diagramme), ggf. Miro |
