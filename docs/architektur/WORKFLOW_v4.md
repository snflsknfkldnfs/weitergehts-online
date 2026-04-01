# Workflow v4: Cowork-basierte Produktion + Praezise Schnittstellen

**Datum:** 2026-03-31 (v4)
**Basiert auf:** v3 (WORKFLOW_v2.md, 2026-03-26)
**Ersetzt:** WORKFLOW_v2.md (v3) als kanonische Referenz
**v4 Aenderungen:** Produktionsarchitektur — Phase 2 von Claude Code nach Cowork verlagert. Schnittstellen-Vertraege (P6). Compaction-Failsafe (P1). Rahmen stuetzt Inhalt (P3 verfeinert). Verlustfreie Transformation (P7). Phase 2.1c Material-Cross-Konsistenz (Strategie-Audit E2). User-Validierung PFLICHT nach Material 1-2 (E1).
**Vorgaenger-Learnings bewahrt:** L1-L7 (v2.1), SK1-SK15, G1-G14, TB-FREEZE, SCPL, Subagenten-Architektur, JSON-Encoding-Regeln, Engine-Typ-Mapping, Q-Gate-Formate, Download-Methode
**Audit 1:** docs/analyse/AUDIT_v4_ARCHITEKTUR_ERGEBNIS.md (2026-03-31) — 1 BLOCKER, 3 MEDIUM, eingearbeitet
**Audit 2:** docs/analyse/AUDIT_v4_STRATEGIE_ERGEBNIS.md (2026-03-31) — 4 Empfehlungen (E1-E4), eingearbeitet
**Audit 3:** docs/analyse/AUDIT_v4_PRODUKTIONSREIFE_ERGEBNIS.md (2026-03-31) — 0 BLOCKER, 3 HIGH, 6 MEDIUM, eingearbeitet
**Kern-Prinzip:** Inhaltliche Kohaerenz zuerst — vom Wikipedia-Artikel zum schulernahen Skript zum Tafelbild zum Material
**Kanonisch fuer:** Agenten-Reihenfolge, Phasenstruktur, Artefakt-Definitionen, Schnittstellen, Ausfuehrungsorte
**Vertrags-Extraktion (Runde 3a-Opt):** Die Schnittstellen-Vertraege pro Phase sind in `docs/architektur/vertraege/VERTRAG_PHASE_*.md` extrahiert. Diese Vertraege sind die operative Referenz fuer Dispatches — WORKFLOW_v4.md muss NICHT pro Dispatch gelesen werden.

---

## 1. Warum v4?

v3 hatte ein strukturelles Ausfuehrungsproblem, das sich in Mappe-2-Produktion v1 (Commit a6aa589) und v2 (Commit c9eb9ec) manifestierte:

| Problem | Symptom | Ursache |
|---|---|---|
| Monolithische Produktion | Alle Materialien + Aufgaben in einem Edit | Claude Code hat kein Konzept von Subagent-Isolation |
| Kein Q-Gate-Log | Qualitaetssicherung nicht dokumentiert | Kein Persistierungs-Zwischenschritt erzwungen |
| Engine-inkompatible JSON-Felder | 4/5 Aufgabentypen fehlerhaft | Subagenten-Schemata nicht isoliert angewendet |
| Compaction-Verlust | Subagenten-Prompts nach Batch-Read verloren | Flacher Kontext ohne Read-from-Artifact |

v4 loest alle vier durch Verlagerung der didaktischen Produktion (Phase 2) nach Cowork — mit isoliertem Dispatch, Datei-Persistierung pro Artefakt und praezisen Schnittstellen-Vertraegen.

### 1.1 Was v4 bewahrt (P7: Verlustfreie Transformation)

Alle folgenden Elemente aus v2/v3 bleiben unveraendert in v4:

| Element | Herkunft | Status v4 |
|---|---|---|
| L1: Python urllib statt curl | v2.1 | Bewahrt (Phase 3.1) |
| L2: Q-Gate-Log als Pflicht-Output | v2.1 | Bewahrt + verstaerkt (P5, Datei-Persistierung) |
| L3: Explizite Dispatch-Sequenz | v2.1 | Bewahrt + verstaerkt (P1, P4, P6) |
| L4: ARTEFAKT_INVENTAR als Pflicht-Input | v2.1 | Bewahrt (Phase 2.1 Vertrag) |
| L5: JSON-Encoding-Regeln | v2.1 | Bewahrt (Sektion 10) |
| L6: Quellenangaben in cite-Elementen | v2.1 | Bewahrt (Phase 2.1 Output) |
| L7: Q-Gate pro Material Pflicht | v2.1 | Bewahrt (P5) |
| SK1-SK15 Skript-Guetekriterien | v2.1/v3 | Bewahrt (Phase 0.3) |
| G1-G14 Tafelbild-Guetekriterien | v3 | Bewahrt (Phase 0.4) |
| TB-FREEZE-Regel | v3 | Bewahrt (Phase 0.4 → Phase 2) |
| SCPL-Struktur | v3.1 | Bewahrt (Phase 0.4) |
| Subagenten-Expertise (7 Material + 5 Aufgabe) | v3 | Bewahrt (Phase 2.1 + 2.2) |
| Engine-Typ-Mapping | v2.1 | Bewahrt (Sektion 10) |
| Download-Methode (Python urllib) | v2.1 | Bewahrt (Phase 3.1) |
| Sequentielles Mappen-Vorgehen | v2 | Bewahrt |
| User-Validierungspunkte | v2 | Bewahrt + erweitert (Phase 2.3) |

---

## 2. Architekturprinzipien

### Terminologie

Drei Abstraktionsebenen im Produktionsprozess:

| Ebene | Definition | Beispiel | Anzahl (Mappe mit 6 Mat.) |
|---|---|---|---|
| **Phase** | Logische Gruppierung von Dispatches mit einheitlichem Zweck | Phase 2.1 (Material-Produktion) | 7 Phasen (2.0, 2.1, 2.1c, 2.2a, 2.2b, 2.2c, 2.3) |
| **Dispatch** | Ein isolierter Agent-Aufruf in Cowork (= eine Agent-Tool-Invokation). Operative Einheit fuer P1, P4, P5 | mat-2-3 produzieren | 15 Dispatches |
| **Read-Schritt** | Ein einzelner Datei-Lese-Vorgang innerhalb eines Dispatch. Operative Einheit fuer P6 | SKRIPT Chunk §2 lesen | ~90 Read-Schritte |

P1 und P4 operieren auf Dispatch-Ebene. P6 operiert auf Read-Schritt-Ebene. Innerhalb eines Dispatch ist Context-Sharing zwischen Read-Schritten nicht nur erlaubt, sondern notwendig.

### Prinzipien

**P1: Read-from-Artifact, not from Context.**
Jeder **Dispatch** beginnt mit dem Einlesen seiner Eingabe-Artefakte aus dem Dateisystem. Kein Dispatch verlaesst sich auf Kontextinhalte aus vorherigen Dispatches. Das macht jeden Dispatch compaction-resistent. Innerhalb eines Dispatch duerfen Read-Schritte aufeinander aufbauen (der Agent hat alle gelesenen Dateien im Kontext).

**P2: Didaktische Entscheidungen in Cowork, technische Umsetzung in Claude Code.**
Cowork hat Agent-Dispatch mit isoliertem Kontext, Zwischenergebnisse als Dateien, Pruefschritte zwischen Dispatch-Aufrufen. Claude Code hat Dateisystem-Zugriff, Git, Shell. Die Aufgabenteilung folgt der Staerke.

**P3: Rahmen stuetzt Inhalt, nicht umgekehrt. Sicherung steuert vom Ende her.**
Tafelbild, Einstieg und Sicherung werden VOR den Materialien finalisiert (Rahmen-zuerst-Sequenz). Die Sicherung (Kernerkenntnisse, Hefteintrag) definiert das Lernziel — Materialien arbeiten darauf hin. Materialien stellen den fokussierten Kerninhalt in den Mittelpunkt. Der Rahmen stuetzt, qualifiziert und bettet die Materialien in den Lernprozess ein — er schraenkt den inhaltlichen Fokus nicht ein. Aufgaben referenzieren fertige Materialien + Rahmen.

**P4: Ein Artefakt pro Dispatch. DISPATCH-ISOLATION.**
Jedes Material und jede Aufgabe wird als eigene .json-Datei produziert und persistiert. Kein monolithischer Output. Jeder Fehler ist isoliert korrigierbar. **Jedes Material/jede Aufgabe wird als EIGENE Nachricht produziert. NICHT mehrere Materialien oder Aufgaben parallel in einer Nachricht.** Q-Gate-Ergebnis in Q-GATE-LOG.md PFLICHT vor naechstem Dispatch.

**P5: Q-Gate als Pflicht-Zwischenschritt.**
Zwischen Produktion und Persistierung steht eine Q-Gate-Pruefung. Erst bei PASS wird das Artefakt geschrieben. Bei FAIL: 1 Nachbesserung, dann Finding dokumentieren.

**P6: Praezise Schnittstellen-Vertraege (Occam's Razor).**
Jeder Dispatch definiert exakt seine Read-Schritte und seinen Output. Output-Qualitaet bestimmt die Input-Qualitaet des Folge-Dispatch. Occam's Razor: Jeder Read-Schritt liest NUR die nachweislich relevanten Felder — nicht mehr. Irrelevante Dateien werden nicht geladen (Token-Effizienz). Konditionale Reads (NUR WENN Bedingung erfuellt) vermeiden unnoetige Datei-Zugriffe.

**P7: Verlustfreie Transformation.**
Alle produktiven, qualitaetsmaximierenden Elemente und Entscheidungen aus v2/v3 bleiben erhalten. Nur Ausfuehrungsort und Persistierungsmethode aendern sich.

---

## 3. Phasenstruktur im Ueberblick

```
PHASE 0: INHALTSGERUEST (einmalig pro Game)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AGENT_DIDAKTIK → AGENT_INHALT → AGENT_ARTEFAKT → AGENT_SKRIPT
  User-Validierung: PFLICHT (Externer Audit empfohlen)
  → AGENT_TAFELBILD
Output: Gechunktes Skript (600-900 W/Chunk) + ARTEFAKT_INVENTAR + Tafelbild pro Mappe (JSON + Hefteintrag)
Ort: Cowork (DIDAKTIK, SKRIPT, TAFELBILD) + Claude Code (INHALT, ARTEFAKT)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    │
                    ▼
PHASE 1: MATERIAL-GERUEST (einmalig pro Game)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AGENT_MATERIAL (Design-Modus, Aufgabe 1.1-1.8)
Output: Pro Mappe: Materialtyp-Zuordnung + Erarbeitbarkeits-Nachweis (Blueprint)
Ort: Cowork
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    │
                    ▼
PHASE 1.5: SEQUENZPLANUNG (pro Mappe)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AGENT_MATERIAL (Aufgabe 1.9-1.10)
Input: Blueprint (Phase 1) + TAFELBILD + SKRIPT
Aufgabe: Materialien in didaktisch sinnvolle Reihenfolge bringen
  → position, didaktische_funktion, voraussetzung pro Material
  → Ueberleitungen zwischen Materialien formulieren
  → Sequenzkontext-Objekte fuer Subagenten generieren
Output: MATERIAL_GERUEST_Mappe_N mit Sequenzplan-Abschnitt
User-Validierung: PFLICHT (Blueprint + Sequenz gemeinsam)
Ort: Cowork
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    │
                    ▼
PHASE 2: DIDAKTISCHE PRODUKTION (sequentiell, pro Mappe)   ← NEU v4: Cowork
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase 2.0: Rahmen-Produktion (Cowork)
  → tafelbild.json, einstieg.json, sicherung.json, meta.json
  → C1b-Identitaetsregel setzen
  → User-Validierung EMPFOHLEN
Phase 2.1: Material-Produktion (Cowork, sequentiell pro Material)
  → Pro Material: Inputs aus Dateien lesen (P1+P6) → produzieren → Q-Gate → .json
  → Kerninhalt im Mittelpunkt, Rahmen stuetzt (P3)
  → Output: materialien/mat-N-1.json ... mat-N-M.json
  → **User-Validierung nach Material 1-2: PFLICHT (Mappe 2)** (Strategie-Audit E1)
    Kalibrierung: Ton, Sprachregister, Vergegenwaertigungstiefe
    Ab Mappe 3: Herabstufung auf EMPFOHLEN moeglich
Phase 2.1c: Material-Cross-Konsistenz (NEU — Strategie-Audit E2)
  → 1 Dispatch: Alle materialien/*.json lesen
  → 4 Pruefachsen: Sequenz-Kohaerenz, Fachbegriff-Konsistenz,
    Ueberleitung-Kohaerenz, TB-Knoten-Gesamtabdeckung
  → Output: Cross-Konsistenz-Ergebnis in Q-GATE-LOG.md
  ── CHECKPOINT: Session-Split (Audit S2 — Token-Budget) ──
Phase 2.2: Aufgaben-Produktion (Cowork, sequentiell)
  → 2.2a AGENT_RAETSEL: Progressionsplan (liest fertige materialien/*.json)
  → 2.2b Pro Aufgabe: SUB_AUFGABE_* → Q-Gate → .json
  → 2.2c Cross-Konsistenz-Pruefung (Orchestrator-Q-Gate)
  → Output: aufgaben/aufgabe-N-1.json ... aufgabe-N-5.json
Phase 2.3: User-Validierung EMPFOHLEN (Stichproben auf Aufgaben)
Ort: Cowork
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    │
                    ▼
PHASE 3: TECHNISCHE IMPLEMENTIERUNG (pro Mappe)            ← NEU v4: Rein mechanisch
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase 3.0: Pre-Flight (Revert + git pull + Zustandspruefung)
Phase 3.1: Bild-Download (Self-Hosting via Python urllib — L1)
Phase 3.2: Assembly (alle .json lesen → Mappe-Objekt → data.json Anhang)
Phase 3.3: mappe-N.html erstellen
Phase 3.4: JSON-Validierung + Integritaetschecks
Phase 3.5: git commit + push
KEINE didaktischen Entscheidungen. Nur Datei-I/O.
Ort: Claude Code
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    │
                    ▼
PHASE 4: BROWSER-VALIDIERUNG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
User + ggf. Cowork via Chrome
User-Validierung: PFLICHT (Externer Audit empfohlen)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 4. Agenten-Rollen (v4)

### Reihenfolge

```
AGENT_DIDAKTIK (Phase 0, Schritt 1)
    → Lehrplan-Verankerung, KE-Matrix, Mappen-Struktur, Schwierigkeitskurve
    │
    ▼
AGENT_INHALT (Phase 0, Schritt 2a)
    → Wikipedia-Recherche, Sachanalyse, Fakten-Extraktion
    │  MCP: wikipedia: get_article, get_sections, get_links, get_summary
    │
    ▼
AGENT_ARTEFAKT (Phase 0, Schritt 2b)
    → Artikelstrukturierte Artefakt-Sichtung (Bilder, Zitate, Rollenprofile)
    │  API: MediaWiki action=parse + action=query (via markdownify)
    │  Output: ARTEFAKT_INVENTAR (qualifizierte Artefakte mit Self-Hosting-Daten)
    │
    ▼
AGENT_SKRIPT (Phase 0, Schritt 3)
    → Lineares, schulernahes Skript (Jugendsachbuch-Stil, 600-900 W/Chunk)
    → Chunking in Mappen entlang DIDAKTIK-Struktur
    → Artefakt-Marker inline positioniert
    │
    ▼
AGENT_TAFELBILD (Phase 0, Schritt 4)
    → Synthese-Extrakt aus SKRIPT: Quintessenz des Lernzuwachses pro Mappe
    → Dualer Output: JSON (SCPL + knoten + verbindungen + merksatz) + Hefteintrag (80-120 W)
    → Guetekriterien G1-G14 (docs/checklisten/GUETEKRITERIEN_TAFELBILD.md)
    → Wird zur fixierten Zielstruktur fuer AGENT_MATERIAL (TB-FREEZE)
    │
    ▼
AGENT_MATERIAL (Phase 1 + 1.5)
    → Phase 1: Materialtyp-Zuordnung pro Mappe-Chunk (inkrementell)
    → Phase 1: Artefakt-Referenzen aus SKRIPT auswerten
    → Phase 1.5: Sequenzplanung — Reihenfolge, didaktische Funktion,
      Voraussetzungen, Ueberleitungen, Sequenzkontext fuer Subagenten
    → User-Validierung: Blueprint + Sequenz gemeinsam (Phase 1.5 Gate)
    │
    ▼
RAHMEN-PRODUKTION (Phase 2.0, Cowork)                      ← NEU v4
    → tafelbild.json, einstieg.json, sicherung.json, meta.json
    → C1b-Identitaetsregel gesetzt
    │
    ▼
Materialtyp-Subagenten (Phase 2.1, Cowork)                 ← NEU v4: Ort
    → SUB_DARSTELLUNGSTEXT | SUB_QUELLENTEXT | SUB_TAGEBUCH
    → SUB_ZEITLEISTE | SUB_BILDQUELLE | SUB_KARTE | SUB_STATISTIK
    → Jeweils eigener Prompt: docs/agents/SUB_MATERIAL_*.md
    → Jeder Subagent erhaelt Sequenzkontext als Pflicht-Input
    → Output: .json-Datei pro Material (P4)
    │
    ▼
AGENT_RAETSEL als Orchestrator (Phase 2.2a, Cowork)        ← NEU v4: Ort
    → Progressionsplan, Operationalisierungsziele, Konstruktionskontexte
    → Output: PROGRESSIONSPLAN.md
    │
    ▼
SUB_AUFGABE_* (Phase 2.2b, Cowork)                         ← NEU v4: Ort
    → SUB_AUFGABE_MC | SUB_AUFGABE_ZUORDNUNG | SUB_AUFGABE_LUECKENTEXT
    → SUB_AUFGABE_REIHENFOLGE | SUB_AUFGABE_FREITEXT
    → Output: .json-Datei pro Aufgabe (P4)
    │
    ▼
AGENT_RAETSEL Cross-Konsistenz (Phase 2.2c, Cowork)        ← NEU v4: Ort
    → Orchestrator-Q-Gate, Ruecklauf bei Findings
    │
    ▼
PHASE 3: Assembly (Claude Code)                             ← NEU v4: Nur Assembly
    → Rein mechanisch: .json lesen → data.json zusammenbauen → commit
```

### Rollenprofil-Veraenderungen v3 → v4

| Agent | v3 | v4 | Aenderung |
|---|---|---|---|
| DIDAKTIK | Phase 0, Schritt 1 | Unveraendert | — |
| INHALT | Phase 0, Schritt 2a | Unveraendert | — |
| ARTEFAKT | Phase 0, Schritt 2b | Unveraendert | — |
| SKRIPT | Phase 0, Schritt 3 | Unveraendert | — |
| TAFELBILD | Phase 0, Schritt 4 | Unveraendert | — |
| MATERIAL | Design (Phase 1+1.5) | Unveraendert | — |
| SUB_MATERIAL_* | Phase 2.1 in Claude Code | Phase 2.1 in Cowork, Output = .json-Datei | Ausfuehrungsort + Persistierung |
| RAETSEL | Phase 2.2 in Claude Code | Phase 2.2 in Cowork, PROGRESSIONSPLAN.md als Zwischenartefakt | Ausfuehrungsort + Persistierung |
| SUB_AUFGABE_* | Phase 2.2b in Claude Code | Phase 2.2b in Cowork, Output = .json-Datei | Ausfuehrungsort + Persistierung |
| TECHNIK/DESIGN/QUALITAET | Phase 3 (Vollproduktion) | Phase 3 (nur Assembly + Bilder) | Drastisch reduziert — keine Didaktik |

---

## 5. Phase 0: Inhaltsgeruest (unveraendert)

### Schritt 0.1: AGENT_DIDAKTIK

**Eingabe:** Thema + Lehrplanbezug + Jahrgangsstufe + Mappen-Anzahl

**Aufgabe:**
1. Kompetenzerwartungen (KE) aus Fachlehrplan extrahieren
2. KE den Mappen zuordnen (KE-Matrix)
3. Mappen-Grobstruktur festlegen (Titel, thematischer Schwerpunkt pro Mappe)
4. Schwierigkeitskurve definieren (AFB-Progression ueber Mappen)
5. Didaktische Leitlinien formulieren (Altersangemessenheit, Multiperspektivitaet, ethische Grenzen)

**Output:** `DIDAKTIK_RAHMEN_[game-id].md`
**Prompt-Datei:** `docs/agents/AGENT_DIDAKTIK.md`

### Schritt 0.2a: AGENT_INHALT

**Eingabe:** DIDAKTIK_RAHMEN + Thema

**Aufgabe:**
1. Wikipedia-Hauptartikel zum Thema abrufen (`wikipedia: get_article`)
2. Artikelstruktur erfassen (`wikipedia: get_sections`)
3. Quellen-Ergiebigkeit pruefen (< 5 Absaetze → Fallback-Pfad)
4. Vertiefungsartikel identifizieren (`wikipedia: get_links`)
5. Pro Mappe relevante Sektionen und Vertiefungsartikel lesen
6. Fakten, Chronologie, Akteure, Fachbegriffe, Zahlen extrahieren
7. Wikimedia-Artefakte funktional dokumentieren
8. Originalzitate extrahieren
9. Rollenprofile fuer Tagebuch-Material recherchieren

**Fallback-Pfad:**

| Stufe | Bedingung | Aktion |
|---|---|---|
| 1 | Wikipedia-Hauptartikel duenn (< 5 Absaetze) | Verwandte Artikel ueber `get_links` + `get_summary` pruefen |
| 2 | Auch verwandte Artikel duenn | WebSearch + `markdownify: webpage-to-markdown` |
| 3 | Auch WebSearch ergebnislos | User informieren, im INHALTSBASIS-Output dokumentieren |

**MCP-Tools:** `wikipedia: get_article`, `get_sections`, `get_links`, `get_summary`, `extract_key_facts`, `markdownify: webpage-to-markdown`

**Output:** `INHALTSBASIS_[game-id].md`
**Prompt-Datei:** `docs/agents/AGENT_INHALT.md`

### Schritt 0.2b: AGENT_ARTEFAKT

**Eingabe:** INHALTSBASIS (Artikel-Liste) + DIDAKTIK_RAHMEN

**Aufgabe:**
1. Artikelstruktur laden (MediaWiki `action=parse&prop=sections`)
2. Bilder pro Sektion sichten (`action=parse&section=N&prop=images`)
3. Metadaten qualifizieren (`action=query&prop=imageinfo`) — CC-BY-NC verwerfen
4. Didaktisch bewerten (QUALIFIZIERT / RESERVE / VERWORFEN)
5. Rollenprofile und Zitate sichten
6. Self-Hosting-Daten dokumentieren (Thumbnail-URL + Breite + MIME)

**Kernprinzip:** Strukturierte Sichtung entlang der Artikel-Sachstruktur. Kein `wikimedia_search_images` als Primaermethode.

**Output:** `ARTEFAKT_INVENTAR_[game-id].md`
**Prompt-Datei:** `docs/agents/AGENT_ARTEFAKT.md`

### Schritt 0.3: AGENT_SKRIPT

**Eingabe:** DIDAKTIK_RAHMEN + INHALTSBASIS + ARTEFAKT_INVENTAR

**Aufgabe:**
1. Lineares, schulernahes Skript schreiben (Jugendsachbuch-Stil)
   - Durchgaengige narrative Kohaerenz
   - Zielgruppe R7 Mittelschule: Kurze Saetze (≤20 W), konkrete Beispiele, Fachbegriffe erklaert
   - Absaetze ≤5 Saetze
   - Alle Fakten aus INHALTSBASIS einarbeiten
2. Skript in Mappen-Chunks aufteilen (600-900 W/Chunk)
   - Entlang der Mappen-Grobstruktur aus DIDAKTIK_RAHMEN
   - Sandwich-Methode: Erkenntnisse Mappe N im Einstieg Mappe N+1
   - Ueberlappungszonen markieren
3. Artefakte aus INHALTSBASIS im Skript positionieren
   - Marker-Format: `[ARTEFAKT: id | Typ-Kandidat | Kurzbeschreibung]`
   - SKRIPT ist Primaerquelle fuer AGENT_MATERIAL
4. Chunking-Qualitaet pruefen
   - Jeder Chunk inhaltlich abgeschlossen
   - Jeder Chunk endet mit klarem Tafelbild-Ziel
   - Progression erkennbar

**Output:** `SKRIPT_[game-id].md`

**Q-Gate Stufe 1 (Q1-Q13):**
- Narrativ kohaerend (kein Stichpunkt-Aggregat)?
- Alle Fakten aus INHALTSBASIS eingearbeitet?
- Fachbegriffe bei Erstverwendung erklaert?
- Saetze ≤20 W, Absaetze ≤5 Saetze?
- Jeder Chunk inhaltlich abgeschlossen?
- Sandwich-Uebergaenge vorhanden?
- KE aus DIDAKTIK_RAHMEN abgedeckt?
- Alle Wikimedia-Artefakte positioniert?
- Alle Zitate positioniert oder begruendet ausgeschlossen?
- Jeder Chunk hat mind. 1 Rollenprofil-Zuordnung?

**Q-Gate Stufe 2 (SK1-SK15):**
Kanonische Referenz: `docs/checklisten/GUETEKRITERIEN_SKRIPT.md`
- MUSS: SK1 Vergegenwaertigung (≥50% Handlungspassagen/Chunk), SK2 Elementarisierung, SK3 Anschaulichkeit, SK4 Strukturiertheit, SK5 Sprachliche Angemessenheit, SK6 Vergegenwaertigung vor Besinnung, SK7 Multikausalitaet
- SOLL: SK8-SK12 (Gestaltungsprinzipien, Multiperspektivitaet, Motivierung, Spannungsbogen, Sandwich-Qualitaet)
- KANN: SK13-SK15 (Gegenwartsprinzip, Zeitkolorit, Kontroversitaet)

**User-Validierung (Phase 0 — SKRIPT): PFLICHT**
**Prompt-Datei:** `docs/agents/AGENT_SKRIPT.md`

### Schritt 0.4: AGENT_TAFELBILD

**Eingabe:**
- SKRIPT_[game-id].md (validiert)
- DIDAKTIK_RAHMEN (KE-Matrix, Sicherungsziel)
- ARTEFAKT_INVENTAR (qualifizierte Artefakte)
- GUETEKRITERIEN_TAFELBILD (G1-G14)
- Vorheriges Tafelbild (ab Mappe 2 — fuer Progression G9)

**Aufgabe (SCPL-Struktur):**
1. Problemorientierte Stundenfrage formulieren (max. 12 Woerter)
2. Kernerkenntnisse extrahieren (max. 3, je max. 15 Woerter)
3. Ordnungsmuster waehlen (kausal | chronologisch | kategorial)
4. SCPL-Struktur aufbauen: Situation → Complication[] → Problem → Loesung
5. Erarbeitbarkeits-Pruefung pro SCPL-Schritt: DIRECT / ARTIFACT / INFERENTIAL
6. Stilregeln: Fachbegriffe per Doppelpunkt/Gedankenstrich (nie Klammern), Pfeile nur als Symbol

**Output:** `TAFELBILD_[game-id]_Mappe[N].md` — JSON mit `scpl`-Objekt
- scpl.situation, scpl.complication[], scpl.problem, scpl.loesung[]
- transfer.frage (offene Frage, ausserhalb Hefteintrag)
- Legacy: `knoten[]` und `verbindungen[]` als leere Arrays

**TB-FREEZE-Regel:** Nach Q-Gate PASS ist das Tafelbild eingefroren. AGENT_MATERIAL darf keine SCPL-Schritte aendern. Eskalation: `[TB-REVISION NOETIG — Grund]` → User-Entscheidung.

**Q-Gate:** G1-G14 (6 MUSS, 4 SOLL, 4 KANN). G14: SCPL-Kohaerenz.
**Ort:** Cowork
**Prompt-Datei:** `docs/agents/AGENT_TAFELBILD.md`

---

## 6. Phase 1: Material-Geruest (unveraendert)

### AGENT_MATERIAL (Design-Modus)

**Eingabe:** Validiertes SKRIPT (gechunkt, mit Artefakt-Zuordnungen) + TAFELBILD pro Mappe (fixiert, TB-FREEZE)

**Vorgehen:** Inkrementell pro Mappe (Mappe 1 → Validierung → Mappe 2 → ...).

**Aufgabe:** Pro Mappe-Chunk:
1. Artefakt-Marker aus SKRIPT auswerten (img-IDs, zit-IDs, rolle-IDs → Materialtyp)
2. Skript-Passagen auf zusaetzliche Material-Trigger pruefen
3. Material-Entwuerfe skizzieren (Titel, Typ, Funktion, TB-Zuordnung, Artefakt-Ref)
4. Erarbeitbarkeits-Verifizierung (TB-FREEZE): Fuer jeden TB-Knoten nachweisen, dass Material die Erarbeitung ermoeglicht
5. Erarbeitbarkeits-Nachweis fuehren
6. Einstieg und Sicherung entwerfen (Sicherung = Verweis auf Hefteintrag + Reflexionsimpuls)

**Aufgaben-Skizze:** Wird NICHT in Phase 1 erstellt. Aufgaben erst nach Phase 2.1 (Material final).

**Output:** `MATERIAL_GERUEST_[game-id]_Mappe[N].md`
**User-Validierung: PFLICHT**
**Ort:** Cowork
**Prompt-Datei:** `docs/agents/AGENT_MATERIAL.md`

---

## 6.5 Phase 1.5: Sequenzplanung (unveraendert)

### AGENT_MATERIAL (Aufgabe 1.9-1.10)

**Eingabe:** Blueprint (Phase 1) + TAFELBILD + SKRIPT

**Aufgabe:**
1. Materialien in didaktisch sinnvolle Reihenfolge bringen
2. position, didaktische_funktion, voraussetzung pro Material definieren
3. Ueberleitungen zwischen Materialien formulieren
4. Sequenzkontext-Objekte fuer Subagenten generieren

**Output:** MATERIAL_GERUEST_Mappe_N mit Sequenzplan-Abschnitt
**User-Validierung: PFLICHT (Blueprint + Sequenz gemeinsam)**
**Ort:** Cowork

---

## 7. Phase 2: Didaktische Produktion (NEU v4: Cowork)

### Sequentielles Vorgehen (bewahrt aus v2)

Mappe N wird vollstaendig produziert und validiert, bevor Mappe N+1 beginnt. Das verhindert Fehlerfortpflanzung und ermoeglicht iteratives Lernen.

### Artefakt-Verzeichnisstruktur (NEU v4)

```
docs/agents/artefakte/produktion/{game-id}/mappe-{N}/
  rahmen/
    meta.json          # freischalt_code, titel, beschreibung
    einstieg.json      # typ, narrativ, problemstellung
    sicherung.json     # typ, zusammenfassung, ueberleitung, reflexionsimpuls, kernerkenntnisse[], hefteintrag_verweis, zitat
    tafelbild.json     # scpl, knoten, verbindungen, voraussetzungen, stundenfrage, merksaetze
  materialien/
    mat-N-1.json       # Vollstaendiges Material-JSON-Objekt (Engine-kompatibel)
    mat-N-2.json
    ...
  aufgaben/
    aufgabe-N-1.json   # Vollstaendiges Aufgaben-JSON-Objekt (Engine-kompatibel)
    aufgabe-N-2.json
    ...
  PROGRESSIONSPLAN.md  # AGENT_RAETSEL Output (AFB-Zuweisung, Konstruktionskontexte)
  Q-GATE-LOG.md        # Gesammelt: Materialien + Aufgaben + Cross-Konsistenz
```

### Phase 2.0: Rahmen-Produktion

**Bedeutung:** Der Rahmen definiert die Zielstruktur der Mappe. Die Sicherung (Kernerkenntnisse, Hefteintrag) bestimmt, worauf alle Materialien hinarbeiten ("vom Ende her denken"). Der Einstieg setzt die Stundenfrage. Beide zusammen bilden den didaktischen Bogen, innerhalb dessen die Materialien operieren.

**Schnittstellen-Vertrag (P6):**

| Read-Schritt | Input-Datei | Gelesene Felder | Zweck |
|---|---|---|---|
| 1 | TAFELBILD_Mappe[N].md (Phase 0.4) | Vollstaendig (TB-FREEZE) | → rahmen/tafelbild.json (1:1 Uebernahme) |
| 2 | MATERIAL_GERUEST (Einstieg-Sektion) | typ, narrativ, problemstellung | → rahmen/einstieg.json |
| 3 | MATERIAL_GERUEST (Sicherung-Sektion) | typ, zusammenfassung, ueberleitung, reflexionsimpuls, hefteintrag_verweis, zitat | → rahmen/sicherung.json (Basis) |
| 4 | rahmen/tafelbild.json (gerade geschrieben) | scpl.loesung[] (= Merksaetze/Merkbox-Inhalt) | → sicherung.kernerkenntnisse[] (Constraint M3b) |
| 5 | ORCHESTRATOR.md | Freischalt-Code-Regeln | → rahmen/meta.json |
| 6 | MATERIAL_GERUEST (Header) | titel, beschreibung | → rahmen/meta.json |

**Dispatch-Ablauf (1 Dispatch, 4 Output-Dateien):**

```
1. TAFELBILD_Mappe[N].md lesen → rahmen/tafelbild.json schreiben (1:1, TB-FREEZE)
2. MATERIAL_GERUEST Einstieg-Sektion lesen → rahmen/einstieg.json schreiben
3. MATERIAL_GERUEST Sicherung-Sektion lesen
4. rahmen/tafelbild.json lesen → scpl.loesung[] extrahieren (Array von Merksaetzen)
5. sicherung.kernerkenntnisse[] := tafelbild.scpl.loesung[] (M3b-Constraint)
6. rahmen/sicherung.json schreiben (inkl. kernerkenntnisse aus Schritt 5)
7. ORCHESTRATOR + MATERIAL_GERUEST Header lesen → rahmen/meta.json schreiben
7b. NUR WENN SKRIPT-Chunk oder INHALTSBASIS ein historisches Schlusszitat enthaelt:
    sicherung.zitat-Objekt {text, urheber, kontext} in rahmen/sicherung.json ergaenzen.
    Quelle: SKRIPT oder INHALTSBASIS. Wenn kein Zitat vorhanden: Feld weglassen.
8. C1b-Identitaetsregel pruefen:
   einstieg.problemstellung === tafelbild.stundenfrage === SKRIPT-Chunk-Ueberschrift
   Bei Abweichung: Korrektur (Stundenfrage aus tafelbild.json hat Vorrang)
```

**M3b-Constraint (Sicherungs-Kernerkenntnisse):**
`sicherung.kernerkenntnisse[]` wird NICHT neu formuliert, sondern aus `tafelbild.scpl.loesung[]` (Merksaetze = Merkbox-Inhalt) abgeleitet. Begruendung: Die Kernerkenntnisse IM Hefteintrag und die Kernerkenntnisse IN der Sicherungsphase sind dasselbe — sie duerfen nicht divergieren. Die Autoritaet liegt beim Tafelbild (Phase 0.4, TB-FREEZE).

**User-Validierung: EMPFOHLEN**

### Phase 2.1: Material-Produktion (Subagenten in Cowork)

#### Subagenten-Uebersicht (bewahrt aus v3)

| Subagent | Prompt-Datei | Material-Typ | Engine-Typ | Eingabe (neben MATERIAL_GERUEST) |
|---|---|---|---|---|
| SUB_MATERIAL_DARSTELLUNGSTEXT | `SUB_MATERIAL_DARSTELLUNGSTEXT.md` | darstellungstext | darstellungstext | SKRIPT-Chunk (Volltext), Tafelbild-Knoten |
| SUB_MATERIAL_QUELLENTEXT | `SUB_MATERIAL_QUELLENTEXT.md` | quellentext | quellentext | INHALTSBASIS Zitat-Daten, SKRIPT-Kontext |
| SUB_MATERIAL_TAGEBUCH | `SUB_MATERIAL_TAGEBUCH.md` | tagebuch | quellentext | INHALTSBASIS Rollenprofil, SKRIPT-Kontext |
| SUB_MATERIAL_ZEITLEISTE | `SUB_MATERIAL_ZEITLEISTE.md` | zeitleiste | zeitleiste | SKRIPT-Chronologie, INHALTSBASIS-Fakten |
| SUB_MATERIAL_BILDQUELLE | `SUB_MATERIAL_BILDQUELLE.md` | bildquelle | bildquelle | ARTEFAKT_INVENTAR Bild-Metadaten |
| SUB_MATERIAL_KARTE | `SUB_MATERIAL_KARTE.md` | karte | bildquelle | ARTEFAKT_INVENTAR Karten-Metadaten |
| SUB_MATERIAL_STATISTIK | `SUB_MATERIAL_STATISTIK.md` | statistik | zeitleiste/bildquelle | INHALTSBASIS Statistik-Daten |

**Qualitaetskriterien-Referenz:** `docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md` (M1-M12 + typ-spezifisch)

#### Schnittstellen-Vertrag pro Material-Dispatch (P6)

| Read-Schritt | Input-Datei | Gelesene Felder/Sektionen | Bedingung | NICHT lesen |
|---|---|---|---|---|
| 1 | MATERIAL_GERUEST | NUR Zeile des aktuellen mat-ID (typ, titel, skript_chunk, tafelbild_knoten, artefakt_ref, didaktische_funktion) | immer | Andere mat-IDs |
| 2 | rahmen/tafelbild.json | NUR knoten die in tafelbild_knoten referenziert + stundenfrage | immer | Andere Knoten |
| 3 | SUB_MATERIAL_[TYP].md | Vollstaendig | immer | Andere SUB_MATERIAL_*.md |
| 4 | SKRIPT | NUR den in skript_chunk referenzierten Chunk (§-Bereich) | immer | Andere Chunks |
| 5 | INHALTSBASIS | NUR die zum Chunk gehoerende Mappe-Sektion | immer | Andere Mappen |
| 6 | rahmen/einstieg.json | problemstellung (fuer C1b-Konsistenz + Rahmung) | immer | — |
| 7 | ARTEFAKT_INVENTAR | NUR Eintraege mit artefakt_ref dieses Materials | **NUR WENN** artefakt_ref gesetzt (BQ, KA, ST) | Andere Artefakte; gesamte Datei bei DT/QT/TB/ZL |
| 8 | rahmen/sicherung.json | kernerkenntnisse[] | **NUR WENN** didaktische_funktion = `sicherung` oder `transfer` (Entscheidung nach Funktionswert, nicht Position. Falls letztes Material andere Funktion hat: Schritt 8 entfaellt) | Gesamte Datei bei einstieg/erarbeitung/vertiefung |

**Read-Schritt 7 (konditional):** Darstellungstexte, Quellentexte, Tagebuecher und Zeitleisten haben keine artefakt_ref → Schritt 7 entfaellt. Spart 3-4 Reads pro Mappe.

**Read-Schritt 8 (konditional, M3c):** Das letzte Material der Sequenz (typischerweise `sicherung` oder `transfer`) erhaelt die Kernerkenntnisse aus der Sicherung. Damit weiss der Subagent, worauf die Mappe hinarbeitet — er kann gezielt zur Synthese hinfuehren. Fuer alle anderen Materialien ist dieser Read ueberfluessig (sie erarbeiten einzelne TB-Knoten, nicht die Gesamtsynthese). Aufwand: 1 zusaetzlicher Read fuer 1 von 6 Materialien.

#### Dispatch-Ablauf (pro Mappe, v4)

```
Fuer jedes mat-ID im MATERIAL_GERUEST (sequentiell):

  1. MATERIAL_GERUEST lesen → mat-ID, typ, titel, skript_chunk, tafelbild_knoten,
     artefakt_ref, didaktische_funktion
  2. rahmen/tafelbild.json lesen → Relevante Knoten + Stundenfrage (P1 + P6)
  3. SUB_MATERIAL_[TYP].md lesen (P1 — NUR den passenden Subagenten)
  4. SKRIPT NUR relevanten Chunk lesen (P1 + P6)
  5. INHALTSBASIS NUR relevante Mappe-Sektion lesen (P1 + P6)
  6. rahmen/einstieg.json lesen → problemstellung (P6: 1 Feld, fuer Rahmung)
  7. NUR WENN artefakt_ref gesetzt: ARTEFAKT_INVENTAR → Eintraege dieses Materials (P6)
  8. NUR WENN didaktische_funktion = sicherung|transfer:
     rahmen/sicherung.json lesen → kernerkenntnisse[] (M3c: "vom Ende her")
  9. Material produzieren — Kerninhalt im Mittelpunkt, Rahmen stuetzt (P3)
  10. Q-Gate pruefen (MQ1-MQ5 + typ-spezifisch)
  11. Bei PASS: materialien/mat-N-M.json schreiben (P4)
  12. Bei FAIL: 1 Nachbesserung → erneut Q-Gate → bei FAIL: Finding in Q-GATE-LOG.md
  13. Q-Gate-Ergebnis in Q-GATE-LOG.md schreiben (L2, L7)

Compaction-Failsafe (P1):
  Schritte 1-8 lesen IMMER aus Dateien, nie aus dem Kontext.
  Bereits geschriebene .json-Dateien bleiben erhalten.
  Selbst nach Compaction beginnt der naechste Dispatch mit frischem Einlesen.
```

**Quellenangaben:** Als `<cite>`-Elemente in Material-HTML einbetten (L6). Kein separates Array.

**User-Validierung nach Material 1-2: PFLICHT (Mappe 2)** (Strategie-Audit E1)

Nach den ersten 2 produzierten Materialien (Darstellungstext + 1 visuelles Material) wird die Produktion pausiert. User prueft:
- Ton und Sprachregister: Entspricht R7-Niveau?
- Vergegenwaertigungstiefe: "Wuerde ein R7-Schueler diesen Text freiwillig lesen?"
- Fachbegriff-Einfuehrung: Verstaendlich, nicht ueberladen?

Bei Befund: Korrekturhinweise fliessen in verbleibende Material-Dispatches ein (als Praeambel).
Ab Mappe 3: Herabstufung auf EMPFOHLEN moeglich, wenn Mappe-2-Kalibrierung erfolgreich.

### Phase 2.1c: Material-Cross-Konsistenz (NEU — Strategie-Audit E2)

**Zweck:** Prueft, ob die isoliert produzierten Materialien als kohaerentes Ganzes funktionieren. Schliesst die strukturelle Luecke, die Isolation erzeugt: Jeder Dispatch kennt den Sequenzkontext (Phase 1.5), aber nicht die tatsaechlichen Ergebnisse der anderen Dispatches.

**Schnittstellen-Vertrag (P6):**

| Input-Datei | Gelesene Felder | Zweck |
|---|---|---|
| materialien/mat-N-*.json (alle) | titel, inhalt, ueberleitung_von, fachbegriffe, _meta.tafelbild_knoten_abgedeckt | Cross-Pruefung |
| rahmen/tafelbild.json | knoten[], stundenfrage | TB-Gesamtabdeckung |
| MATERIAL_GERUEST | Sequenzreihenfolge, didaktische_funktion pro mat-ID | Soll-Ist-Vergleich |

**4 Pruefachsen:**

1. **Sequenz-Kohaerenz:** Bilden die Materialien in Reihenfolge einen logischen Erkenntnisweg zum Tafelbild — oder stehen sie nebeneinander ohne Aufbau? FAIL wenn: Ein Material setzt einen Fachbegriff als bekannt voraus, der erst in einem spaeteren Material eingefuehrt wird.
2. **Fachbegriff-Konsistenz:** Wird ein Begriff in allen Materialien identisch verwendet? Keine widersprüchlichen Definitionen durch isolierte Produktion? FAIL wenn: Derselbe Fachbegriff wird in zwei Materialien unterschiedlich definiert oder verwendet.
3. **Ueberleitung-Kohaerenz:** Passt `ueberleitung_von` von Material N+1 zum tatsaechlichen Inhalt von Material N (nicht nur zum Sequenzkontext-Plan)? FAIL wenn: `ueberleitung_von` bezieht sich auf einen Inhalt, der im tatsaechlichen Vorgaenger-Material nicht vorkommt.
4. **TB-Knoten-Gesamtabdeckung:** Decken alle Materialien zusammen alle TB-Knoten ab? Kein Knoten unversorgt? FAIL wenn: Ein TB-Knoten wird von keinem Material abgedeckt (binaer pruefbar).

**Ablauf:**

```
1. Alle materialien/mat-N-*.json lesen (P1)
2. rahmen/tafelbild.json lesen (P1)
3. MATERIAL_GERUEST lesen (P1)
4. 4 Pruefachsen durchfuehren
5. Bei PASS: Ergebnis in Q-GATE-LOG.md
6. Bei FAIL: Betroffene Materialien + Finding dokumentieren
   → User entscheidet ueber Nachbesserung oder Akzeptanz
```

**Hinweis:** 1 Dispatch, nicht 6. Prueft das Zusammenspiel, nicht die Einzelqualitaet (dafuer sind die MQ1-MQ5 Q-Gates zustaendig).

**--- CHECKPOINT: Session-Split hier (Audit S2 — Token-Budget-Mitigation) ---**

### Phase 2.2: Aufgaben-Produktion

#### Phase 2.2a: AGENT_RAETSEL — Orchestration

**Schnittstellen-Vertrag (P6):**

| Read-Schritt | Input-Datei | Gelesene Felder | NICHT lesen |
|---|---|---|---|
| 1 | AGENT_RAETSEL.md | Vollstaendig (Orchestrationsregeln) | — |
| 2 | materialien/mat-N-*.json | NUR: id, typ, titel, _meta.tafelbild_knoten_abgedeckt | NICHT: inhalt (Volltext) — Token-Effizienz, Volltext erst in 2.2b |
| 3 | MATERIAL_GERUEST | NUR: didaktische_funktion pro mat-ID | — |
| 4 | rahmen/tafelbild.json | knoten[], merksaetze[], stundenfrage | — |
| 5 | DIDAKTIK_RAHMEN | NUR: AFB-Profil + Schwierigkeitskurve dieser Mappe | Andere Mappen |

**Begruendung Volltext-Ausschluss (Schritt 2):** Der Orchestrator braucht Material-Volltext nicht. Er trifft 3 Entscheidungen: AFB-Zuweisung (braucht TB-Knoten + Schwierigkeitskurve), Typauswahl (braucht Materialtyp + didaktische_funktion), Operationalisierungsziel (braucht TB-Knoten-Merksatz + AFB-Operator, beides aus tafelbild.json). Material-Zusammenfassungen im Konstruktionskontext werden aus `titel + didaktische_funktion` generiert. Der Volltext des Ziel-Materials wird erst vom Subagenten in Phase 2.2b gelesen (P1).

**Dispatch-Ablauf:**
1. AGENT_RAETSEL.md lesen
2. Alle materialien/mat-N-*.json lesen (NUR id, typ, titel, _meta — NICHT inhalt)
3. MATERIAL_GERUEST lesen (didaktische_funktion pro mat-ID)
4. rahmen/tafelbild.json lesen (knoten, merksaetze, stundenfrage)
5. DIDAKTIK_RAHMEN lesen (NUR AFB-Profil + Schwierigkeitskurve — P6)
5. Progressionsplan erstellen (5 Positionen, AFB-Zuweisung, Typauswahl)
6. Pro Aufgabe: Konstruktionskontext generieren (Ziel-Material-ID, TB-Knoten, AFB, Operationalisierungsziel)
7. Freischalt-Code generieren (thematisch, A-Z, 4-8 Zeichen)
8. PROGRESSIONSPLAN.md schreiben

**Output:** `PROGRESSIONSPLAN.md` mit 5 Konstruktionskontexten + Dispatch-Anweisungen
**Prompt-Datei:** `docs/agents/AGENT_RAETSEL.md`

#### Phase 2.2b: SUB_AUFGABE_* — Typ-spezifische Aufgabenkonstruktion

**Subagenten (bewahrt aus v3):**

| Subagent | Primaerer AFB | Kernexpertise | Prompt |
|---|---|---|---|
| SUB_AUFGABE_MC | I (auch II) | Distractor-Konstruktion | `docs/agents/SUB_AUFGABE_MC.md` |
| SUB_AUFGABE_ZUORDNUNG | I-II | Pole-Trennschaerfe | `docs/agents/SUB_AUFGABE_ZUORDNUNG.md` |
| SUB_AUFGABE_LUECKENTEXT | I-II | Lueckenauswahl, Fachbegriff-Recall | `docs/agents/SUB_AUFGABE_LUECKENTEXT.md` |
| SUB_AUFGABE_REIHENFOLGE | II | Element-Eindeutigkeit | `docs/agents/SUB_AUFGABE_REIHENFOLGE.md` |
| SUB_AUFGABE_FREITEXT | II-III | Leitfragen-Design, Scaffolding | `docs/agents/SUB_AUFGABE_FREITEXT.md` |

**Schnittstellen-Vertrag pro Aufgaben-Dispatch (P6):**

| Schritt | Input-Datei | Gelesene Felder | NICHT lesen |
|---|---|---|---|
| 1 | PROGRESSIONSPLAN.md | NUR Konstruktionskontext dieser Aufgabe | Andere Aufgaben |
| 2 | materialien/mat-N-X.json | Volltext (Ziel-Material) | — |
| 3 | MATERIAL_GERUEST (andere mat-IDs) | NUR titel + didaktische_funktion | Nicht: materialien/*.json inhalt (Token-Effizienz) |
| 4 | SUB_AUFGABE_[TYP].md | Vollstaendig | Andere SUB_AUFGABE_*.md |

**Dispatch-Ablauf (v4):**

```
Fuer jede Aufgabe im PROGRESSIONSPLAN (sequentiell):

  1. PROGRESSIONSPLAN.md lesen → NUR Konstruktionskontext dieser Aufgabe (P1 + P6)
  2. Ziel-Material .json lesen (Volltext) (P1)
  3. MATERIAL_GERUEST lesen (andere mat-IDs: NUR titel + didaktische_funktion — P6)
  4. SUB_AUFGABE_[TYP].md lesen (P1 — NUR den passenden Subagenten)
  5. Aufgabe produzieren (nach Subagenten-Regeln)
  6. Q-Gate pruefen (A1-A7 + typ-spezifisch)
  7. Bei PASS: aufgaben/aufgabe-N-M.json schreiben (P4)
  8. Bei FAIL: 1 Nachbesserung → erneut Q-Gate → bei FAIL: Finding in Q-GATE-LOG.md
  9. Q-Gate-Ergebnis in Q-GATE-LOG.md

Compaction-Failsafe (P1):
  Schritte 1-4 lesen IMMER aus Dateien. Bereits geschriebene .json bleiben erhalten.
```

**Subagenten-Q-Gate (Einzelaufgaben-Ebene, bewahrt aus v3):**
- A1 AFB-Kongruenz (Einzelaufgabe)
- A2 Fragestaemme-Klarheit (genau 1 Anforderung)
- A3 Material-Kongruenz (aus Ziel-Material beantwortbar)
- A4-* Typ-spezifisch: A4-MC (Distraktoren), A4-ZU (Trennschaerfe), A4-LT (Luecken-Eindeutigkeit), A4-RF (Reihenfolge-Eindeutigkeit)
- A6 Tipp-Progression: Richtung → Einschraenkung → Loesung+Erklaerung
- A7 Operator-Praezision (AFB-Taxonomie)
- A11-FT Freitext-Qualitaet (nur SUB_AUFGABE_FREITEXT)

#### Phase 2.2c: AGENT_RAETSEL — Cross-Konsistenz

**Schnittstellen-Vertrag (P6):**

| Input | Gelesene Felder | Volltext nur bei |
|---|---|---|
| aufgaben/aufgabe-N-*.json | Alle Felder | — |
| materialien/mat-N-*.json | id, typ, titel | Findings (dann Volltext) |
| rahmen/tafelbild.json | knoten[], merksaetze[] | — |

**Cross-Konsistenz-Pruefung (Orchestrator-Q-Gate, bewahrt aus v3):**
- A1 AFB-Kongruenz (Gesamtbild): AFB-Zuweisung stimmt mit Progressionsplan ueberein?
- A3 Material-Kongruenz (Vollstaendigkeit): Alle Materialien in mind. 1 Aufgabe referenziert?
- A5 Schwierigkeits-Progression: Monoton steigend ueber 5 Aufgaben?
- A8 Kognitive Aktivierung: Mind. 1 denkanregende Aufgabe?
- A9 TB-Bezug: Mind. 1 Aufgabe pro TB-Knoten?
- A10 Typvielfalt: Mind. 3 Typen, kein Typ > 2x, Freitext genau 1x?
- A12 Sachbezogen-vor-Wertbezogen: Fakten → Transfer → Stellungnahme?
- KANN: A13-A15 (Gegenwartsbezug, Fehler-Antizipation, Implizite Differenzierung)

**Ruecklauf-Mechanismus:** Bei Finding: Re-Dispatch an betroffenen Subagenten mit korrigiertem Konstruktionskontext. Max. 2 Re-Dispatch pro Aufgabe.

### Phase 2.3: User-Validierung (Aufgaben)

**EMPFOHLEN** (Stichproben-Review auf 1-2 Aufgaben).

Materialien werden bereits in Phase 2.1 (PFLICHT nach Material 1-2) und Phase 2.1c (Cross-Konsistenz) validiert.

Pruefpunkte fuer Aufgaben:
1. Aufgaben-Material-Match (jede Aufgabe referenziert existierendes Material, aus Ziel-Material beantwortbar)
2. Tafelbild-Vollstaendigkeit (alle Knoten durch mindestens 1 Aufgabe abgedeckt)
3. Schwierigkeitsprogression (AFB-Verlauf plausibel)
4. Sandwich-Konsistenz (Uebergang zur naechsten Mappe)

Erst nach PASS → Phase 3 oder naechste Mappe.

### Phase 2 Abschluss

**Phase 2 endet nach Phase 2.3. KEIN Assembly in Cowork.**

Ausgabe am Ende von Phase 2: Uebergabe-Prompt fuer Claude Code (Phase 3: Assembly + Bilder + HTML + Git).
Inhalt des Uebergabe-Prompts: Produktionsverzeichnis-Pfad, Game-ID, Mappe-Nr. KEINE Dateiinhalte kopieren — Claude Code liest selbst.

---

## 8. Phase 3: Technische Implementierung (NEU v4: Rein mechanisch)

### Uebergabe-Schnittstelle (P6)

```
Eingabe:
  docs/agents/artefakte/produktion/{game-id}/mappe-{N}/
    rahmen/*.json
    materialien/*.json
    aufgaben/*.json
    PROGRESSIONSPLAN.md (fuer Freischalt-Code)

Output:
  escape-games/{game-id}/data.json (Mappe-Anhang)
  escape-games/{game-id}/mappe-{N}.html
  assets/img/{game-id}/*.{ext} (heruntergeladene Bilder)
```

### Phase 3.0: Pre-Flight

```
1. Fehlgeschlagenen Commit revert (falls vorhanden)
2. git pull (aktueller Stand)
3. escape-games/{game-id}/data.json lesen → bestehende Mappen pruefen
4. Integritaetspruefung (Audit S3):
   a. Produktionsverzeichnis existiert?
   b. Alle erwarteten .json vorhanden (rahmen/4 + materialien/N + aufgaben/5)?
   c. Jede .json ist valides JSON? (python3 -c "import json; json.load(open(f))")
   d. Alle mat-IDs aus MATERIAL_GERUEST in materialien/*.json abgedeckt?
5. Engine-Patch: escape-engine.js Zeile 2279
   ALT:  var text = aufgabe.frage || '';
   NEU:  var text = aufgabe.text_mit_luecken || aufgabe.frage || '';
   (Audit BLOCKER B2-#1 — Lueckentext Schema-Mismatch)
```

### Phase 3.1: Bild-Download (Self-Hosting — L1)

**URL-Quelle (verbindlich):** Thumbnail-URL aus ARTEFAKT_INVENTAR verwenden. KEINE URLs manuell konstruieren. Wikimedia-Thumb-Pfade enthalten einen Hash-Prefix, der nicht aus dem Dateinamen ableitbar ist — manuell gebaute URLs liefern 404.

**Download-Methode (verbindlich, bewahrt aus v2.1):**

```python
import urllib.request, json, time, os

HEADERS = {'User-Agent': 'WeitergehtsOnline/1.0 (https://weitergehts.online; paulcebulla@gmx.de)'}

def download_image(url, path):
    """Download mit Thumbnail-URL aus ARTEFAKT_INVENTAR."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req) as resp:
        with open(path, 'wb') as f:
            f.write(resp.read())
    assert os.path.getsize(path) > 10_000, f"Download fehlgeschlagen: {path} ist {os.path.getsize(path)} Bytes"
    time.sleep(2)  # Rate-Limiting respektieren

def resolve_url_via_api(wiki_filename, width=640):
    """Fallback: URL ueber Wikimedia API aufloesen wenn INVENTAR-URL 404 liefert.
    wiki_filename: z.B. 'DC-1914-27-d-Sarajevo-cropped.jpg' (ohne 'File:'-Prefix)"""
    api_url = (
        f"https://commons.wikimedia.org/w/api.php?action=query"
        f"&titles=File:{wiki_filename}&prop=imageinfo"
        f"&iiprop=url&iiurlwidth={width}&format=json"
    )
    req = urllib.request.Request(api_url, headers=HEADERS)
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read())
    page = list(data["query"]["pages"].values())[0]
    info = page["imageinfo"][0]
    return info.get("thumburl") or info["url"]
```

```
Fuer jedes img-ID im ARTEFAKT_INVENTAR (Status: QUALIFIZIERT):
  1. Thumbnail-URL aus ARTEFAKT_INVENTAR lesen (NICHT manuell konstruieren)
  2. Download via download_image() mit Bot-User-Agent
  3. Bei HTTP 404: Fallback via resolve_url_via_api() mit Wikimedia-Dateiname
     aus INVENTAR + erneuter Download
  4. Speichern unter assets/img/{game-id}/{img-id}.{ext}
  5. Dateigroesse pruefen (> 10 KB)
  6. 2 Sekunden Pause vor naechstem Download
  7. Bei erneutem Fehler: RESERVE-Bild versuchen, Finding dokumentieren
```

**VERBOTEN:**
- `curl` fuer Wikimedia-Downloads (429 Rate Limiting)
- Manuelle Konstruktion von Thumb-URLs (z.B. `commons/thumb/2/2e/...`) — der Hash-Pfad ist nicht aus dem Dateinamen ableitbar, fuehrt zu 404
- Mehr als 1 Retry-Runde pro Bild — wenn API-Fallback auch scheitert, RESERVE-Bild oder Finding

### Phase 3.2: Assembly

```
1. Alle rahmen/*.json lesen
2. Alle materialien/mat-N-*.json lesen (sortiert nach position)
3. Alle aufgaben/aufgabe-N-*.json lesen (sortiert nach position)
4. Mappe-Objekt assemblieren:
   meta.json → Mappe-Header (titel, beschreibung, freischalt_code)
   einstieg.json → mappe.einstieg
   materialien/*.json → mappe.materialien[] (sortiert)
   aufgaben/*.json → mappe.aufgaben[] (sortiert)
   sicherung.json + tafelbild.json → mappe.sicherung
5. data.json lesen (aktuell aus Repo)
6. mappen[N-1] anfuegen (Mappe-Anhang-Prozedur aus ORCHESTRATOR.md)

KEINE Inhalte modifizieren. Nur zusammenbauen.
```

### Phase 3.3: mappe-N.html

Aus Template generieren. Keine inhaltlichen Entscheidungen.

### Phase 3.4: JSON-Validierung + Integritaetschecks

```
1. python3 -c "import json; json.load(open('data.json'))" (PFLICHT — L5)
2. Alle mat-IDs in materialien[] vorhanden?
3. Alle aufgabe-IDs in aufgaben[] vorhanden?
4. Alle Bild-Pfade in assets/img/ existent und > 10 KB?
5. Freischalt-Code gesetzt?
6. C1b: einstieg.problemstellung === tafelbild.stundenfrage?
```

### Phase 3.5: Git

```
git add escape-games/{game-id}/data.json
git add escape-games/{game-id}/mappe-{N}.html
git add assets/img/{game-id}/*
git commit -m "v3.8: Mappe {N} — {Titel}"
git push
```

---

## 9. Externe Audits (bewahrt aus v3)

| Audit-Punkt | Wer | Wann | Prueft was |
|---|---|---|---|
| Skript (Phase 0) | Lehrkraft + opt. Fachkollege | Nach AGENT_SKRIPT, vor Phase 1 | Fachwiss. Korrektheit, didaktische Reduktion |
| Material-Geruest (Phase 1) | Lehrkraft | Nach AGENT_MATERIAL Design, vor Phase 2 | Materialtyp-Passung, Erarbeitbarkeit, Progression |
| Fertige Mappe (Phase 2+3) | Lehrkraft + opt. Schueler-Test | Nach Phase 4 | Materialqualitaet, Aufgaben-Material-Match, UX |
| Prozessdesign | Softwareentwickler | Bei Bedarf | Technische Machbarkeit, Schnittstellen |

---

## 10. Referenz-Tabellen (bewahrt aus v2.1)

### JSON-Encoding-Regeln

| Zeichen | Problem | Loesung |
|---|---|---|
| `\u201E` (U+201E) | Nicht JSON-kompatibel | Durch `"` (U+0022) ersetzen oder HTML-Entity `&#8222;` |
| `\u201C` (U+201C) | Nicht JSON-kompatibel | Durch `"` (U+0022) ersetzen oder HTML-Entity `&#8220;` |
| `\u2013` (U+2013) | Kann Probleme machen | Durch `--` oder `&#8211;` ersetzen |
| Alle >U+007F | Potentiell problematisch | Im Zweifel: HTML-Entities verwenden |

### Engine-Typ-Mapping (Subagent-Output → data.json)

| Subagent-Output-Typ | data.json `typ` | Begruendung |
|---|---|---|
| darstellungstext | `darstellungstext` | Nativ |
| quellentext | `quellentext` | Nativ |
| tagebuch | `quellentext` | Engine kennt keinen Tagebuch-Renderer |
| zeitleiste | `zeitleiste` | Nativ |
| bildquelle | `bildquelle` | Nativ |
| karte | `bildquelle` | Engine kennt keinen Karten-Renderer |
| statistik | `zeitleiste` oder `bildquelle` | Zahlenreihen→zeitleiste, Diagramm-Bild→bildquelle |

### Q-Gate-Log-Format (verbindlich, bewahrt aus v2.1)

```markdown
### Q-Gate: mat-{N}-{M}
| # | Pruefpunkt | Ergebnis | Detail |
|---|---|---|---|
| Q1 | [aus Subagent] | PASS/FAIL | [Begruendung bei FAIL] |
| Q2 | ... | ... | ... |
**Gesamt:** PASS / FAIL (Q{X} nachgebessert)
```

### Quellenangaben-Workaround (bewahrt aus v2.1)

Bis Engine `quellenangaben[]` unterstuetzt: Quellenangabe als `<cite>`-Element am Ende des Material-`inhalt`-HTML einbetten. Format: `<cite>Quelle: [Urheber], [Lizenz]</cite>`.

---

## 11. Abgrenzung v3 → v4

| Aspekt                | v3 (WORKFLOW_v2.md)                             | v4 (dieses Dokument)                                             |
| --------------------- | ----------------------------------------------- | ---------------------------------------------------------------- |
| Phase 2 Ort           | Claude Code                                     | Cowork                                                           |
| Phase 2 Persistierung | Monolithischer data.json-Edit                   | .json-Datei pro Artefakt (P4)                                    |
| Phase 3 Umfang        | Vollproduktion + Implementierung                | Nur Assembly + Bilder (rein mechanisch)                          |
| Compaction-Schutz     | Nicht adressiert                                | P1 Read-from-Artifact als Architekturprinzip                     |
| Schnittstellen        | Implizit (Pflicht-Input-Listen)                 | Explizite Vertraege mit Feld-Granularitaet (P6)                  |
| Token-Effizienz       | Nicht adressiert                                | Occam's Razor in jedem Dispatch-Vertrag (P6)                     |
| Rahmen-Sequenz        | Einstieg+Sicherung nach Materialien (Phase 2.3) | Rahmen VOR Materialien (Phase 2.0), stuetzt aber Kerninhalt (P3) |
| Phase 0-1.5           | —                                               | Unveraendert                                                     |
| Subagenten-Prompts    | —                                               | Inhaltlich unveraendert, nur Ausfuehrungsort                     |
| Engine-Code           | —                                               | 1 Fix (Lueckentext `text_mit_luecken \|\| frage`)                |
| Material-Validierung  | User-Validierung am Ende (EMPFOHLEN)            | PFLICHT nach Material 1-2 + Phase 2.1c Cross-Konsistenz          |
| Cross-Konsistenz      | Nur Aufgaben (Phase 2.2c)                       | Materialien (Phase 2.1c) + Aufgaben (Phase 2.2c)                 |
| data.json-Schema      | —                                               | Keine Aenderungen                                                |

---

## 12. v4-spezifische Risiken

| Risiko                                                      | Wahrscheinlichkeit | Mitigation                                                                                          |
| ----------------------------------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------- |
| Cowork-Session reicht nicht fuer 6 Materialien + 5 Aufgaben | Mittel             | Session-Splitting: A = Rahmen + Materialien, B = Aufgaben. PROGRESSIONSPLAN.md als Uebergabe        |
| Compaction waehrend Material-Produktion                     | Niedrig-Mittel     | P1: Jeder Schritt liest aus Dateien. Geschriebene .json bleiben erhalten                            |
| .json in Cowork-Workspace vs. Git-Repo                      | Niedrig            | Dateien liegen in docs/ (Cowork-Domaene). Claude Code liest per Pfad                                |
| Assembly produziert fehlerhafte Zusammenstellung            | Niedrig            | Mechanisch (kein Interpretationsspielraum). Python-basierte Checks in Phase 3.4                     |
| Interface-Bruch zwischen Phasen                             | Niedrig            | P6: Explizite Vertraege. Jeder Vertrag ist testbar                                                  |
| Systematischer Subagenten-Bias (Strategie-Audit S6)         | Mittel             | User-Validierung PFLICHT nach Material 1-2 (E1) + Phase 2.1c Cross-Konsistenz (E2)                  |
| Freitext-Aufgabe unbespielbar (Strategie-Audit S6)          | Mittel             | `loesung` als Keyword (3-5 Woerter) statt Mustersatz (E3). Mittelfristig: Engine erwartete_begriffe |
| Kein Lerneffekt zwischen Mappen (Strategie-Audit S4)        | Niedrig            | Optionale Mappe-N-Retrospektive vor Phase 2 der Folge-Mappe (E4)                                    |
