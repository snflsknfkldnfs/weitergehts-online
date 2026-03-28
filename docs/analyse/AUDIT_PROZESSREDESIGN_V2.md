# Audit-Auftrag: Prozessredesign v1 → v2

**Datum:** 2026-03-18
**Auftraggeber:** Paul Cebulla (Lehrkraft, Projektleitung)
**Adressat:** Externer Auditor (Softwareentwicklung / Prozessdesign)
**Erwartetes Ergebnis:** Schriftliche Bewertung mit Freigabe / Freigabe unter Auflagen / Ablehnung

---

## 1. Kontext (Kurzfassung)

Das Projekt "weitergehts.online" entwickelt interaktive Escape-Games fuer den GPG-Unterricht (Geschichte/Politik/Geographie, Mittelschule Bayern, Jgst. 7). Die Materialproduktion wird von einem Team spezialisierter KI-Agenten (Claude) gesteuert, die in definierter Reihenfolge Artefakte erzeugen.

Der bisherige Workflow (v1) wurde nach einem gescheiterten Testlauf als strukturell unzureichend identifiziert. v2 ist das Redesign. Dieses Audit soll v2 vor der Implementierung bewerten.

### Was ein Escape-Game hier bedeutet

Ein browserbasiertes, thematisches Lernspiel mit 3-6 "Mappen" (Leveln). Jede Mappe enthaelt: Materialien (Darstellungstext, Quellentexte, Bildquellen, Karten, Zeitleisten, Statistiken, Tagebucheintraege), Aufgaben verschiedener Typen, ein Tafelbild (Wissensvisualisierung), Einstieg und Sicherung. Technisch: Statische Website (HTML/CSS/JS), gehostet auf GitHub Pages.

---

## 2. Was schief ging (v1-Probleme)

| # | Problem | Symptom im Testlauf |
|---|---|---|
| P1 | Token-Ineffizienz | Kontextlimit nach wenigen MCP-Tool-Calls erreicht. Recherche + Generierung + Assembly in einem Durchlauf nicht moeglich. |
| P2 | Fehlende Zielklarheit | Tafelbild-Entwurf entsteht waehrend Material-Design — aber ohne narratives Rueckgrat. Ergebnis: generisches, inhaltsleeres Tafelbild. |
| P3 | Blinde Recherche | wikimedia-Bildersuche ohne Inhaltsanker liefert irrelevante Ergebnisse. Suchbegriffe zu spezifisch oder zu generisch. |

**Kerndiagnose:** Zwischen dem formalen Didaktik-Rahmen (KE-Matrix, Leitlinien) und der konkreten Materialproduktion fehlt ein narrativ kohaerentes Inhaltsgeruest. AGENT_INHALT liefert Stichpunkte, AGENT_MATERIAL springt direkt in Materialtyp-Auswahl.

---

## 3. Was v2 aendert

| Aspekt | v1 | v2 |
|---|---|---|
| Phasenstruktur | 4 Ebenen (Game-Rahmen → Mappe-Blueprint → Produktion → Implementierung) | 4 Phasen (Inhaltsgeruest → Material-Geruest → Mappen-Produktion → Implementierung) |
| Inhaltsquelle | WebSearch + markdownify (unstrukturiert) | Wikipedia-MCP (strukturiert): get_article → get_sections → get_links |
| Zwischen-Artefakt | Inhalts-MDs (Kernaussagen als Stichpunkte) | SKRIPT (linearer Jugendsachbuch-Text, gechunkt in Mappen) |
| Neuer Agent | — | AGENT_SKRIPT: Schreibt Skript + chunked es entlang DIDAKTIK-Struktur |
| Didaktik-Timing | DIDAKTIK und INHALT parallel | DIDAKTIK vor INHALT (gibt Zielstruktur vor) |
| Materialproduktion | AGENT_MATERIAL monolithisch | AGENT_MATERIAL als Designer + Dispatcher, Subagenten pro Materialtyp |
| Mappen-Erstellung | Potenziell parallel | Strikt sequentiell: Mappe N validiert → Mappe N+1 |
| Bildrecherche | Blind (Keyword-Suche) | Gezielt (Wikipedia-Bilder als Anker fuer wikimedia-Suche) |
| User-Validierung | Am Ende | Nach Phase 0, nach Phase 1, nach jeder Mappe |
| Token-Management | Alles in einem Durchlauf | Recherche (Claude Code) und Design (Cowork) getrennt |

---

## 4. Zu auditierende Dokumente

Lesereihenfolge fuer effizienten Audit:

| # | Datei | Inhalt | Umfang |
|---|---|---|---|
| 1 | `docs/architektur/flowchart-status-quo.mermaid` | Visueller Ueberblick v1 + identifizierte Probleme | ~80 Zeilen |
| 2 | `docs/architektur/flowchart-neuausrichtung.mermaid` | Visueller Ueberblick v2 + markierte Deltas | ~90 Zeilen |
| 3 | `docs/architektur/WORKFLOW_v2.md` | **Kerndokument.** Phasenstruktur, Agenten-Rollen, Artefakt-Definitionen, Schnittstellen | ~400 Zeilen |
| 4 | `docs/agents/ORCHESTRATOR.md` | Agenten-Koordination, Workflow-Diagramm, Iterationsregeln | ~190 Zeilen |
| 5 | `docs/agents/AGENT_MATERIAL.md` | MCP-Tool-Workflows W-1 bis W-8 (bleiben in v2) | Abschnitt "MCP-Tool-Nutzung" (~100 Zeilen) |
| 6 | `docs/checklisten/MCP_TOOLS.md` | Verfuegbare MCP-Tools (30+) | Tabelle (~60 Zeilen) |

Optional (Hintergrund):

| Datei | Wofuer |
|---|---|
| `docs/architektur/WORKFLOW_v1.md` | Verstaendnis der abgeloesten Architektur |
| `docs/analyse/EVALUATION_V1_TESTMAPPE.md` | Details zum gescheiterten Testlauf |
| `docs/testdaten/test-data-v1.json` | Konkretes Beispiel einer Mappe (data.json) |

---

## 5. Audit-Fragen

Bitte zu jeder Frage eine kurze Bewertung (OK / Bedenken / Kritisch) mit Begruendung.

### 5.1 Architektur

A1. Loest die Einfuehrung von AGENT_SKRIPT das identifizierte Kohaerenz-Problem (P2)? Gibt es Faelle, in denen ein lineares Skript die Materialqualitaet nicht verbessert oder verschlechtert?

A2. Ist die sequentielle Abhaengigkeitskette DIDAKTIK → INHALT → SKRIPT zu rigide? Gibt es Szenarien, in denen Parallelisierung besser waere?

A3. Ist das Token-Management-Konzept (Recherche in Claude Code, Design in Cowork) tragfaehig? Wird der Kontextverlust zwischen den Umgebungen ausreichend durch die Zwischen-Artefakte kompensiert?

A4. Skaliert die strikt sequentielle Mappen-Produktion (Mappe N → Validierung → Mappe N+1)? Ab welcher Mappen-Anzahl wird das ein Bottleneck?

### 5.2 Agenten-Design

B1. Hat AGENT_SKRIPT eine klar abgegrenzte Verantwortung, oder ueberlappt er mit AGENT_INHALT (Faktenaufbereitung) oder AGENT_MATERIAL (Chunking)?

B2. Ist die Doppelrolle von AGENT_MATERIAL (Phase 1: Design-Modus, Phase 2: Dispatch an Subagenten) sauber trennbar, oder entsteht daraus Verantwortungsdiffusion?

B3. Sind die 5 geplanten Subagenten (Text, Quellen, Bild, Struktur, Tafelbild) sinnvoll geschnitten? Gibt es Ueberlappungen oder Luecken?

### 5.3 Schnittstellen

C1. Sind die Zwischen-Artefakte (DIDAKTIK_RAHMEN, INHALTSBASIS, SKRIPT, MATERIAL_GERUEST) hinreichend definiert, um als Schnittstellen zwischen Agenten zu funktionieren? Fehlen Felder?

C2. Ist der Uebergang von Skript-Chunk (Prosa) zu Material-Geruest (Materialtyp-Zuordnung) zu AGENT_MATERIAL nachvollziehbar spezifiziert?

C3. Funktioniert die Sandwich-Methode (Ueberlappung zwischen Mappen) bei sequentieller Produktion? Kann Mappe N+1 die Sicherung von Mappe N korrekt aufgreifen, wenn sie unabhaengig produziert wird?

### 5.4 Risiken

D1. Was passiert, wenn der Wikipedia-Artikel zum gewaehlten Thema duenn oder nicht vorhanden ist? Gibt es einen Fallback?

D2. Was passiert, wenn AGENT_SKRIPT ein qualitativ schlechtes Skript produziert? Wie wird das erkannt, bevor Material darauf aufbaut?

D3. Gibt es Single Points of Failure in der Architektur?

D4. Wie robust ist die Architektur gegenueber Aenderungen der MCP-Tool-Verfuegbarkeit (z.B. Wikipedia-MCP faellt aus, Mermaid-Connector antwortet nicht)?

### 5.5 Offene Punkte (Bewertung erbeten)

E1. materialerstellung-skill: Claude Code Uebergabe-Prompt vs. eigenstaendiger Cowork-Skill — welche Variante ist architektonisch sauberer?

E2. Phase 3 (Implementierung): Pro Mappe oder gesammelt nach allen Mappen — welche Variante empfiehlst du und warum?

E3. Fehlt etwas Grundsaetzliches in der Architektur?

---

## 6. Bewertungskriterien

| Kriterium | Beschreibung |
|---|---|
| Kohaerenz | Sind Phasen, Agenten, Artefakte und Schnittstellen widerspruchsfrei definiert? |
| Vollstaendigkeit | Deckt der Workflow alle notwendigen Schritte von Themenauswahl bis fertiges Game ab? |
| Fehlertoleranz | Gibt es Feedback-Schleifen, Fallbacks, Iterationsmoeglichkeiten? |
| Skalierbarkeit | Funktioniert der Workflow auch fuer andere Themen, Faecher, Mappen-Anzahlen? |
| Praktikabilitaet | Ist der Workflow mit den verfuegbaren Tools (Claude, MCP, GitHub Pages) umsetzbar? |
| Token-Effizienz | Wird der begrenzte Kontext sinnvoll genutzt? Keine unnoetige Redundanz? |

---

## 7. Erwartetes Deliverable

Ein Dokument (Freitext oder strukturiert) mit:

1. Bewertung pro Audit-Frage (5.1-5.5)
2. Gesamtbewertung: Freigabe / Freigabe unter Auflagen / Ablehnung
3. Falls Auflagen: Konkrete Aenderungen, die vor Phase-0-Durchlauf umgesetzt werden muessen
4. Optional: Verbesserungsvorschlaege, die nicht blockierend sind

Ablagepfad fuer das Ergebnis: `docs/analyse/AUDIT_PROZESSREDESIGN_V2_ERGEBNIS.md`
