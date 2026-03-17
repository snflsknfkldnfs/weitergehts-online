# AUDIT_SPECS_V1 – Praezisions-Audit der 14 "Eingearbeiteten" Findings

**Audit-Datum:** 2026-03-17
**Methode:** Spec-Audit — Verankerung in AGENT_MATERIAL.md und AGENT_RAETSEL.md pruefen + Bewertung der LLM-Operationalisierbarkeit
**Basis:** EVALUATION_V1_TESTMAPPE.md, Findings P4–P6, E2–E3, E5, E7, D1–D10

---

## PROZESS (P) — 3 Findings

### P4: Tafelbild als zentrales Strukturierungsinstrument staerken

**Verankerung:** AGENT_MATERIAL.md Zeilen 37–50 (Aufgabe 1.1) + Zeilen 169–186 (Aufgabe 2.2) + Zeilen 362–370 (Qualitaetsspezifikation)

**Bewertung:** **Teilweise**

**Begruendung:** Die Spezifikation definiert Qualitaetskriterien (Knoten-Komplexitaet, Verbindungs-Praezision, Material-Abdeckung), aber es fehlt eine operative Anleitung zur **Verifizierung faktischer Korrektheit**. Wie prueft das LLM, ob Verbindungsrichtungen sachlich stimmen (z.B. "Buendnis X → verschaerft Spannung → Aufruestung" vs. Umkehrung)? Es gibt kein Verifizierungs-Protokoll.

**Luecke:** Konkrete Checksum-Logik oder Validierungs-Workflow erforderlich:
- Schritt 1: Tafelbild-Knoten gegen Inhalts-MD abgleichen (alle Kernaussagen erfasst?)
- Schritt 2: Verbindungsrichtungen gegen Material und Fachliteratur pruefen
- Schritt 3: Labels auf Praezision pruefen (nicht "beeinflusst", sondern spezifisches Verb)

---

### P5: Aufgaben-Material-Alignment systematisch pruefen

**Verankerung:** AGENT_RAETSEL.md Zeilen 56–57 (Material-Alignment-Pflicht)

**Bewertung:** **Ja**

**Begruendung:** Die Instruktion ist explizit und operationalisierbar. Der Agent erhält klare Schritte: "Vor Finalisierung jeder Aufgabe: Begriffe auflisten → gegen Material-Texte pruefen → fehlende Begriffe melden (Rücklauf an AGENT_MATERIAL)." Ein LLM könnte diese Prozedur systematisch durchführen.

**Luecke:** Keine (Instruktion ist hinreichend praezise).

---

### P6: Quellenqualitaet systematisieren

**Verankerung:** AGENT_MATERIAL.md Zeilen 310–319 (quellentext-Qualitaetsspezifikation) + Zeilen 74–76 (Mindest-Materialien)

**Bewertung:** **Teilweise**

**Begruendung:** Die Spezifikation definiert, WAS gute Quellen sind ("Muss sich an einer realen historischen Quelle orientieren", "Perspektivitaet erkennbar"), aber nicht WIE sie recherchiert werden. Es fehlt konkrete Anleitung zur **Quellen-Beschaffungsstrategie** und zur Nutzung von MCP-Tools (wikimedia_search_images, markdownify:webpage-to-markdown, rijksmuseum:search_artwork).

**Luecke:**
- MCP-Tool-Workflow für Quellen-Recherche integrieren (z.B. "Nutze wikimedia_search_images mit [Suchbegriff], filtere nach CC0/PD")
- Konkrete Beschaffungsstrategie pro Quelltyp (Zeitungsberichte, Briefe, Augenzeugenberichte)
- Fallback-Strategie wenn keine historische Quelle auffindbar ("hochwertige Schulbuchdarstellungen")

---

## ENGINE/UI (E) — 4 Findings

### E2: Quellenangaben als Fussnoten statt inline

**Verankerung:** AGENT_MATERIAL.md Zeilen 280 (Kern-Prinzip 2: "Quellenangaben als **Fussnoten am Ende der Mappe**")

**Bewertung:** **Teilweise**

**Begruendung:** Das konzeptuelle Prinzip ist klar und in den Kern-Prinzipien verankert. Aber die **technische Umsetzung** ist nicht spezifiziert. Wie sollen Fussnoten im JSON-Schema (material-mappe-N.json) oder HTML-Fragment dargestellt werden? Gibt es ein Markup-Format (z.B. `<sup>[1]</sup>`, `<a href="#fn1">` etc.)?

**Luecke:**
- Fussnoten-Format in data.json definieren (z.B. zusätzliches `footnotes` Array?)
- HTML-Markup für Fussnoten-Referenzen und -Liste spezifizieren
- Beispiel-Implementierung in material-mappe-N.json zeigen

---

### E3: Tipp-Buttons nebeneinander, sequentiell aufdeckbar

**Verankerung:** AGENT_RAETSEL.md Zeilen 79–82 (UI-Regeln für Tipp-Formulierung)

**Bewertung:** **Ja**

**Begruendung:** Die Constraint ist präzise und als Anforderung an die Tipp-Formulierung klar: "Tipp-Buttons nebeneinander (kompakt), immer nur ein Tipp-Inhalt gleichzeitig sichtbar" + "Tipp-Texte kurz halten (max. 2 Sätze pro Stufe)". Das LLM kann damit arbeiten und würde Tipps entsprechend formulieren.

**Luecke:** Keine (Instruktion ist hinreichend). Engine-Implementierung ist separate Aufgabe.

---

### E5: Stellungnahme-Aufgabentyp (ethisch/moralisch)

**Verankerung:** AGENT_RAETSEL.md Zeilen 31–37 (Freitext-Code Neudefinition v1.1)

**Bewertung:** **Ja**

**Begruendung:** Die Spezifikation ist explizit und adressiert ethisch/moralische Szenarien konkret: "Bei ethisch/moralischen Themen: Stellungnahme anleiten. Dilemma verständlich skizzieren, Perspektivität anregen, Teilfragen angeben." Der Agent hätte klare Anforderungen für solche Aufgaben.

**Luecke:** Keine (Instruktion ist operationalisierbar).

---

### E7: Lückentext-Dopplung (Angabe + ausfüllbarer Text identisch) + visuelles Sizing

**Verankerung:** AGENT_RAETSEL.md Zeilen 41–42 (Lückentext-Darstellungsregel)

**Bewertung:** **Ja**

**Begruendung:** Die Darstellungsregel ist unmissverständlich: "Es gibt nur EINE Darstellung: den Text mit Eingabefeldern an den Lückenstellen. Der Angabe-Text mit `___`-Platzhaltern ist nur ein internes Format für data.json, nicht für die UI." Ein LLM würde verstehen, nicht beide Versionen zu rendern.

**Luecke:** Keine (Instruktion ist hinreichend). UI-Implementierung (Sizing, Responsivität) ist Engine-Aufgabe.

---

## INHALT/DIDAKTIK (D) — 7 Findings

### D1: Setting motivierender (Geheimdienst statt Zeitung, Rollenzuweisung)

**Verankerung:** AGENT_MATERIAL.md Zeilen 372–380 (Einstieg-Qualitaetskriterien)

**Bewertung:** **Ja**

**Begruendung:** Die Spezifikation ist konkret und enthält explizites Beispiel: "Setting motivierend gestalten: Rollenzuweisung (z.B. Geheimdienstagent, Reporter, Zeitreisender)". Der Agent hätte klare Richtung, wie Einstiege gestaltet werden.

**Luecke:** Keine (Instruktion ist operationalisierbar).

---

### D2: Zeitsetting klarer, mit Illustration

**Verankerung:** AGENT_MATERIAL.md Zeilen 372–380 (Einstieg: "Zeitsetting klar und konkret") + Zeilen 142–145 (bildquelle-Spezifikation allgemein)

**Bewertung:** **Teilweise**

**Begruendung:** "Zeitsetting klar und konkret" ist spezifiziert. Aber "mit Illustration" ist nicht konkret adressiert. Die bildquelle-Spezifikation beschreibt, WAS gute Bilder sind, nicht WO/WIE sie im Einstieg eingebunden werden. Fehlt: Sollen Illustrationen als Material-Objekt referenziert oder inline eingefügt werden? Wo im JSON?

**Luecke:**
- Klären, ob Illustration als separates Material (z.B. `bildquelle` in materialien[]) oder als Teil des Einstiegs-Narrativs (inline in einstieg.narrativ HTML)
- Falls Material: Workflow für Illustrations-Beschaffung definieren (MCP: Canva generate-design? wikimedia_search_images?)
- Beispiel in material-mappe-N.json zeigen

---

### D3: Einfuehrungstext: Schuelernaeher, Anschluss an Vorphase

**Verankerung:** AGENT_MATERIAL.md Zeilen 300–308 (darstellungstext-Qualitaetskriterien)

**Bewertung:** **Ja**

**Begruendung:** Die Spezifikation ist detailliert und operationalisierbar:
- "Schülernah geschrieben: direkte Ansprache oder lebendige Sprache"
- "Anschluss an Vorphase/Vormappe explizit herstellen ('In der letzten Sonderausgabe hast du erfahren, dass...')"

Ein LLM könnte damit konkrete Texte schreiben.

**Luecke:** Keine (Instruktion ist hinreichend praezise).

---

### D4: Quellentext: Naehe zu Realitaet, Zeitungsformat, Perspektivitaet

**Verankerung:** AGENT_MATERIAL.md Zeilen 310–319 (quellentext-Qualitaetskriterien)

**Bewertung:** **Ja**

**Begruendung:** Alle drei Anforderungen sind spezifiziert:
- Nähe zu Realität: "Muss sich an einer realen historischen Quelle orientieren"
- Format: "Form muss dem Quelltyp entsprechen (Zeitungsbericht = Zeitungsformat, Brief = Briefformat)"
- Perspektivität: "Perspektivität muss erkennbar sein: Wer schreibt? Wann? Welches Interesse?"

Ein LLM hätte klare Anforderungen.

**Luecke:** Keine (Instruktion adäquat, siehe auch P6 für Recherche-Ergänzung).

---

### D5: Zeitstrahl: Beschreibende Ueberschrift, Flaggen, Pfeilstruktur, bekannte Datenpunkte

**Verankerung:** AGENT_MATERIAL.md Zeilen 331–339 (zeitleiste-Qualitaetskriterien)

**Bewertung:** **Teilweise**

**Begruendung:** Folgende Elemente sind spezifiziert:
- Überschrift beschreibend: ✓ ("Überschrift beschreibend, nicht 'Zeitleiste'")
- Pfeilstruktur: ✓ ("Pfeilstruktur/Richtung visuell klar hervorgehoben")
- Bekannte Datenpunkte: ✓ ("bereits bekannte Datenpunkte visuell abgehoben")
- **Flaggen:** ✗ Nicht erwähnt

"Flaggen" als Anforderung ist nicht in der Spezifikation verankert. Unklar: Sind Emoji-Flaggen gemeint? Landesflaggen-Icons? Wer umsetzt die Visualisierung?

**Luecke:**
- Flaggen-Anforderung explizieren (Emoji, SVG-Icons, Canva?)
- Wo werden Flaggen im JSON eingebunden? (metadata? inhalt?)
- Auf welche Länder/Akteure reduzieren (zu viele Flaggen = unübersichtlich)?

---

### D6: Tabelle: Didaktischer Sinn schaerfen, Diagramm-Alternative

**Verankerung:** AGENT_MATERIAL.md Zeilen 341–349 (statistik-Qualitaetskriterien)

**Bewertung:** **Ja**

**Begruendung:** Beide Anforderungen sind explizit:
- Didaktischer Sinn: "Didaktischer Sinn muss explizit klar sein: Welche Erkenntnis sollen SuS aus den Daten ziehen?"
- Diagramm-Alternative: "Wenn die Erkenntnis in einer Visualisierung (Balkendiagramm, Vergleichsgrafik) besser rüberkommt, diese zusätzlich oder stattdessen verwenden"

Ein LLM würde verstehen, diese Kriterien zu beachten.

**Luecke:** Keine (Instruktion ist operationalisierbar).

---

### D7: Tagebuch: Perspektivitaet, Personifizierung, historische Korrektheit

**Verankerung:** AGENT_MATERIAL.md Zeilen 351–360 (tagebuch-Qualitaetskriterien)

**Bewertung:** **Ja**

**Begruendung:** Alle drei Aspekte sind konkret spezifiziert:
- Perspektivität: "Wer schreibt? Woher? Welche gesellschaftliche Position?"
- Personifizierung: "Name, Alter, Beruf der Figur erkennbar" + "Nicht generisch, sondern konkret"
- Historische Korrektheit: "Historisch plausibel: keine anachronistischen Begriffe, keine modernen Denkmuster"

Ein LLM hätte klare Anforderungen für glaubwürdige Tagebuch-Einträge.

**Luecke:** Keine (Instruktion ist hinreichend).

---

### D8: Tafelbild: Faktisch falsch, zu rudimentaer

**Verankerung:** AGENT_MATERIAL.md Zeilen 362–370 (Tafelbild-Qualitaetsspezifikation)

**Bewertung:** **Teilweise**

**Begruendung:** Die gleiche Verankerung wie P4. Qualitaetskriterien vorhanden, aber keine operativen Verifizierungs-Schritte für **faktische Korrektheit** oder **Komplexitäts-Nachweis**. "Min. 4 Knoten, min. 5 Verbindungen" ist spezifiziert, aber wie prüft das LLM die Faktizität der Ursache-Wirkung-Verbindungen?

**Luecke:** Wie P4 — Verifizierungs-Workflow erforderlich.

---

### D9: Freitext: Zusammenfassung statt Einzelwort, Leitfragen, Fachbegriff-Punkte

**Verankerung:** AGENT_RAETSEL.md Zeilen 31–37 (Freitext-Code Neudefinition v1.1)

**Bewertung:** **Ja**

**Begruendung:** Alle Anforderungen sind explizit:
- Zusammenfassung statt Einzelwort: "Freitext soll eine eigenständige Zusammenfassung oder Stellungnahme der SuS provozieren"
- Leitfragen: "Problemorientierte Leitfrage(n) vorgeben"
- Fachbegriff-Validierung: "Mindestens N Fachbegriffe müssen vorkommen"

Ein LLM könnte solche Aufgaben strukturiert konstruieren.

**Luecke:** Keine (Instruktion ist operationalisierbar).

---

### D10: Zielklarheit insgesamt zu niedrig — fehlende inhaltlich-didaktische Strukturierung

**Verankerung:** AGENT_MATERIAL.md Zeilen 290–292 (Kern-Prinzip 8: "Didaktische Zielklarheit")

**Bewertung:** **Teilweise**

**Begruendung:** Das Prinzip ist klar formuliert: "Jedes Material muss einen klar benennbaren Beitrag zum Tafelbild leisten. Wenn nicht klar ist, welche Erkenntnis SuS aus einem Material ziehen sollen, fehlt die Zielklarheit — Material überarbeiten oder streichen."

Aber: Wie prüft das LLM dies operativ? Fehlt eine **Checkliste oder ein Prüfworkflow**. Der Agent erhält Anforderung, nicht Verfahren.

**Luecke:**
- Operativen Prüfworkflow definieren: Pro Material abfragen "Welche konkrete Erkenntnis trägt dieses Material zum Tafelbild bei?" + Antwort dokumentieren
- Checkliste für Zielklarheit: (1) Material-Funktion benannt? (2) Tafelbild-Knoten zugeordnet? (3) Aufgaben nutzen dieses Material?
- Fallback-Regel: Wenn Zielklarheit nicht herstellbar → Material streichen oder neu gestalten

---

## ZUSAMMENFASSUNG

### Zaehlung

| Status | Anzahl | Findings |
|---|---|---|
| **Ja** (präzise genug für verlässliche LLM-Umsetzung) | **9** | P5, E3, E5, E7, D1, D3, D4, D6, D7, D9 |
| **Teilweise** (Konzept da, aber operative Lücken) | **5** | P4, P6, E2, D2, D5, D8, D10 |
| **Nein** (nicht verankert) | **0** | — |

**Gesamt: 14 Findings geprüft. 9 verlässlich operationalisierbar, 5 mit Implementierungs-Lücken.**

---

## PRIORISIERTE NACHBESSERUNGS-LISTE

### Hochste Prioritaet (Impact auf Workflow)

#### 1. **P4 + D8: Tafelbild-Verifizierungs-Workflow**

   **Problem:** Qualitätskriterien existieren, aber kein Verifizierungs-Protokoll. Wie prüft Agent faktische Korrektheit?

   **Losung:**
   - Operativen Workflow in AGENT_MATERIAL.md ergänzen (nach 1.4 Erarbeitbarkeits-Nachweis):
     ```
     1.5 Tafelbild-Verifizierung:
     - Schritt 1: Jede Verbindung gegen Inhalts-MD abgleichen — Ist die Ursache-Wirkung sachlich belegt?
     - Schritt 2: Verbindungs-Labels gegen Fachliteratur pruefen — Stimmt die Aussage?
     - Schritt 3: Knoten-Komplexitaet (min 4, max 8) + Verbindungs-Komplexitaet (min 5, max 10) zaehlen
     - Schritt 4: Pro Verbindung dokumentieren: "Wovon wird dies behauptet?" → Material-Referenz
     ```
   - Konkrete Checksum: Wenn ein Knoten oder eine Verbindung nicht im Material verankert ist → Ruecklauf an AGENT_INHALT

   **Aufwand:** Mittel (Workflow-Dokumentation)

---

#### 2. **E2: Quellenangaben-Format (Fussnoten-Markup)**

   **Problem:** Konzept (Fussnoten statt inline) klar, aber technisches Format fehlt.

   **Losung:**
   - In AGENT_MATERIAL.md Abschnitt 2.1 ergänzen:
     ```
     Quellenangaben-Format (Fussnoten):
     - Jede Quellenangabe erhaelt ID: [1], [2], etc.
     - Im Material-Text: <a href="#fn-1">[1]</a>
     - Am Ende der materialien[]-Liste:
       "quellenangaben": [
         {"id": 1, "text": "Archivname (Datum/Signatur) oder Schulbuch (Autor, Seite)"},
         ...
       ]
     - HTML-Renderer montiert Fussnoten-Section am Ende der Mappe
     ```
   - Beispiel in material-mappe-N.json ergaenzen (mit quellenangaben-Feld)

   **Aufwand:** Niedrig-Mittel (Markup + JSON-Schema-Ergaenzung)

---

#### 3. **P6: Quellenrecherche-Workflow (MCP-Tools)**

   **Problem:** Qualitätskriterien für Quellen klar, aber operative Recherche-Strategie fehlt.

   **Losung:**
   - In AGENT_MATERIAL.md Abschnitt 2.1 (nach Wortbudgets) neue Subsection:
     ```
     Quellenrecherche-Workflow:

     1. Quelltyp identifizieren (Zeitung, Brief, Rede, Augenzeugenbericht):
        → Begriffssuche im Inhalts-MD oder Tafelbild-Knoten

     2. Recherche-Strategie pro Typ:
        - Zeitungsberichte/offizielle Quellen: markdownify:webpage-to-markdown
        - Historische Bilder/Dokumente: wikimedia_search_images (CC0/PD filter)
        - Kunstwerke/Propaganda: rijksmuseum:search_artwork

     3. Fallback wenn keine historische Quelle:
        → Hochwertige Schulbuchdarstellung (authentisches Zitat paraphrasieren)

     4. Quellenangabe dokumentieren (nicht "basierend auf Schulbuchdarstellungen"):
        - Falls Schulbuch: Autor, Titel, Seite
        - Falls Wiki/Archiv: URL + Zugriffsdatum
        - Falls paraphrasiert: "paraphrasiert nach [Quelle]"
     ```
   - Konkrete MCP-Tool-Links einfuegen (wikimedia_search_images, markdownify etc.)

   **Aufwand:** Mittel (Workflow + MCP-Integration)

---

### Hohe Prioritaet (Qualitaetsmerkmale)

#### 4. **D10: Zielklarheit-Prüfworkflow**

   **Problem:** Konzept (didaktische Zielklarheit pro Material) existiert, aber kein Prüfprotokoll.

   **Losung:**
   - Kern-Prinzip 8 ausbauen mit Prüf-Checkliste:
     ```
     Zielklarheit-Pruefung (pro Material):
     - [ ] Funktion benannt? ("Dieses Material erklaert: [konkrete Erkenntnis]")
     - [ ] Tafelbild-Knoten zugeordnet? (Welcher Knoten wird durch dieses Material erarbeitet?)
     - [ ] Material-Referenz in mind. 1 Aufgabe? (Wird dieses Material tatsaechlich genutzt?)
     - Wenn alle drei NEIN: Material streichen oder umdesignen
     ```
   - In Design-Modus (1.2 Material-Entwurf) einfuegen

   **Aufwand:** Niedrig (Checklisten-Dokumentation)

---

#### 5. **D2: Illustration-Integration im Einstieg**

   **Problem:** "Mit Illustration" gefordert, aber Umsetzungs-Pfad unklar.

   **Losung:**
   - In AGENT_MATERIAL.md Einstieg-Spezifikation ergaenzen:
     ```
     Illustration im Einstieg (optional):
     - Falls Rollenszene zeitgebuendet ist (z.B. "Juni 1914 Wien"):
       → Illustrations-Material beschaffen (Stadtfoto, Zeitungsausschnitt, histor. Karte)
       → Als bildquelle-Material in materialien[] anlegen
       → Im einstieg.narrativ HTML referenzieren: <img src="[material-url]" alt="...">
     - Workflow: Canva generate-design (infographic, R7-gerecht) oder wikimedia_search_images
     ```
   - Konkretes Beispiel in material-mappe-N.json zeigen

   **Aufwand:** Niedrig-Mittel (Spezifikation + Beispiel)

---

### Mittlere Prioritaet (Optional-Features)

#### 6. **D5: Flaggen in Zeitstraehlen**

   **Problem:** "Mit Flaggen" gefordert, aber Umsetzungsdetails unklar.

   **Losung:**
   - In zeitleiste-Spezifikation ergaenzen:
     ```
     Flaggen in Zeitstraehlen:
     - Laender/Akteure visuell kennzeichnen (Emoji-Flaggen oder SVG-Icons)
     - Pro Eintrag: maximal 2-3 Flaggen (sonst unübersichtlich)
     - Im JSON: "inhalt": [{datum, text, flaggen: ["🇩🇪", "🇦🇹"]}, ...]
     - Engine rendert Flaggen neben dem Textblock
     ```
   - Entscheidung: Emoji-Flaggen (einfach, aber klein) oder SVG-Icons (poliert, aber Aufwand)?
   - Post-MVP (v2): Ausarbeiten, jetzt: Platzhalter lassen

   **Aufwand:** Niedrig (Placeholder), Hoch (vollständige Impl.)

---

## HANDLUNGS-EMPFEHLUNGEN

### Immediate (vor nächstem Einstieg)

1. **P4/D8 + D10:** Prüf-Workflows in AGENT_MATERIAL.md einfuegen (Zeilen 290–370 Region überarbeiten)
2. **E2:** Fussnoten-Format im Schema definieren + material-mappe-N.json-Beispiel
3. **P6:** MCP-Recherche-Strategie in AGENT_MATERIAL.md Abschnitt 2.1 ergaenzen

### Kurz-/Mittelfristig

4. **D2:** Illustration-Integration spezifizieren (optional, als Best-Practice)
5. **D5:** Flaggen-Placeholder mit Post-MVP-Vermerk (entscheidung verschieben)

### Qualitaets-Impaktion

- Nach Nachbesserungen: Alle 5 **Teilweise**-Findings sollten zu **Ja** werden
- **9 Ja-Findings** bleiben stabil (verlässliche LLM-Operationalisierung gesichert)
- **Gesamtaussage:** Nach Nachbesserungen sind 14/14 Findings mit hoher Verl assligkeit umsetzbar

---

**Audit abgeschlossen: 2026-03-17**
**Nächster Schritt:** Nachbesserungen in AGENT_MATERIAL.md und AGENT_RAETSEL.md durchführen, dann v1.1 freigeben.
