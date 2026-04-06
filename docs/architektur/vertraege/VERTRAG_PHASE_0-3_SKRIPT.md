# VERTRAG Phase 0.3 — AGENT_SKRIPT (Didaktisiertes Skript)

**Version:** v1.1 (Phase IV Architektur-Evaluation)
**Datum:** 2026-04-06
**Extrahiert aus:** ORCHESTRATOR.md §0.3, WORKFLOW_v4.md §3, GUETEKRITERIEN_SKRIPT.md (SK1-SK17), Game-1 SKRIPT (Ist-Format)
**Kanonisch fuer:** Phase 0.3 jedes neuen Escape-Games

---

## 1. Rolle

AGENT_SKRIPT transformiert die Sachanalyse (INHALTSBASIS) in ein **lineares, narratives Jugendsachbuch-Skript**, das als inhaltliche Vorlage fuer alle nachgelagerten Artefakte dient (Tafelbild, Materialien, Aufgaben). Das Skript ist keine Faktensammlung in Prosa, sondern eine fachdidaktische Vergegenwärtigung gemaess Roths Hauptforderungen (GPG B1).

**Abgrenzung:** AGENT_SKRIPT entscheidet ueber Narrativ, Chunking, Sprachregister und Artefakt-Zuordnung. Er entscheidet NICHT ueber Mappen-Struktur (→ AGENT_DIDAKTIK, Phase 0.1), Faktenauswahl (→ AGENT_INHALT, Phase 0.2) oder konkrete Aufgabenformate (→ AGENT_RAETSEL, Phase 2.2).

---

## 2. Input

| Parameter | Quelle | Pflicht |
|---|---|---|
| DIDAKTIK_RAHMEN_[game-id].md | Phase 0.1 | Ja |
| INHALTSBASIS_[game-id].md | Phase 0.2 | Ja |
| GUETEKRITERIEN_SKRIPT.md | Checklisten-Repository | Ja (Referenz) |
| vorgaenger_game_skript | PM (falls Sequenz) | Nein |

**Wenn `vorgaenger_game_skript` vorhanden:** Lesen. Narrativ-Anschluss pruefen: Chunk-1-Einstieg des neuen Games soll an den Sandwich-Ausblick des letzten Chunks des Vorgaengers anknuepfen. Sprachregister und Personalisierungsgrad uebernehmen.

**Pflicht-Lektuere vor Skript-Beginn:**
- DIDAKTIK_RAHMEN: Mappen-Grobstruktur, KE-Matrix, Teilziele, Schwierigkeitskurve, Narrativ-Rahmen
- INHALTSBASIS: Alle Fakten, Akteure, Fachbegriffe, Artefakte, Rollenprofile, Zitate
- GUETEKRITERIEN_SKRIPT: SK1-SK17 (fachdidaktische Qualitaetsdimension)

---

## 3. Chunking-Regeln

### 3.1 Chunk-Struktur

| Regel | Spezifikation |
|---|---|
| **Chunk-Anzahl** | 1 Chunk pro Mappe (= `mappen_anzahl` Chunks) |
| **Chunk-Laenge** | 600–900 Woerter pro Chunk |
| **Mappen-Alignment** | Chunk N = Mappe N. Keine Chunk-Mappe-Verschiebung |
| **Thematischer Fokus** | Jeder Chunk hat genau EINEN thematischen Schwerpunkt (= thematischer Schwerpunkt der Mappe laut DIDAKTIK_RAHMEN) |
| **Abgeschlossenheit** | Jeder Chunk ist eine eigenstaendige Erzaehl-Einheit mit eigener Erkenntnis. Auch bei isolierter Lektuere verstaendlich (mit Einstieg-Kontext) |

### 3.2 Chunk-Aufbau (pro Chunk)

| Sektion | Inhalt | Pflicht |
|---|---|---|
| **Einstieg-Kontext** | 2-3 Saetze: Was wissen die SuS bereits? Was ist die Ausgangslage? | Ja |
| **Skript-Text** | Narrativer Fliesstext in §-Absaetzen (§1, §2, ...). Fachdidaktische Vergegenwärtigung. ARTEFAKT-Marker inline. | Ja |
| **Artefakt-Zuordnung** | Tabelle: ID, Typ-Kandidat, Skript-Ref (§), Beschreibung | Ja |
| **Tafelbild-Entwurf** | Knoten (ID, Text, Typ, Skript-Ref) + Verbindungen (Von→Nach, Label) + Voraussetzungen | Ja |
| **Sandwich-Uebergang** | 2-3 Saetze: Sicherungs-Erkenntnis aufgreifen + neue Frage oeffnen. Entfaellt beim letzten Chunk. | Ja (ausser letzter Chunk) |

### 3.3 Artefakt-Marker-Syntax

Inline im Skript-Text:
```
[ARTEFAKT: {id} | {typ} | {beschreibung}]
```

Erlaubte Typen: `quellentext`, `tagebuch`, `bildquelle`, `karte`, `statistik`, `zeitleiste`, `darstellungstext`

Pro Chunk mindestens 3 Artefakt-Marker. Jedes Artefakt aus der INHALTSBASIS (img, zit, rolle) muss mindestens einmal referenziert werden.

### 3.4 Absatz-Regeln

| Regel | Spezifikation |
|---|---|
| **Satzlaenge** | Max. 20 Woerter pro Satz (Ziel: 12-16) |
| **Absatzlaenge** | Max. 5 Saetze pro §-Absatz |
| **Fachbegriffe** | Bei Erstverwendung erklaert (Apposition, Parenthese oder Folgesatz) |
| **Absaetze pro Chunk** | 4-6 §-Absaetze |

---

## 4. Output: SKRIPT_[game-id].md

### Pflicht-Sektionen (Dokument-Ebene)

| Sektion | Inhalt | Pruefung |
|---|---|---|
| **Header** | Game-ID, Erstellungsdatum, Phase, Validierungsstatus | QS1 |
| **Gesamtnarrativ** | 3-5 Saetze: Leitfrage, roter Faden, Spannungsbogen ueber alle Chunks | QS1 |
| **KE-Abdeckung** | Tabelle: KE × Chunk-Zuordnung × Skript-Stelle (§-Referenz) | QS2 |

### Pflicht-Sektionen (pro Chunk)

Gemaess §3.2 (Einstieg-Kontext, Skript-Text, Artefakt-Zuordnung, Tafelbild-Entwurf, Sandwich-Uebergang).

---

## 5. Q-Gate

### 5.1 Stufe 1: Operationale Pruefung (Q1-Q13)

Bestehende Self-Check-Pruefpunkte aus AGENT_SKRIPT. Binaer PASS/FAIL.

| ID | Kriterium | Severity |
|---|---|---|
| Q1 | Narrative Kohaerenz (Fliesstext, kein Aggregat) | BLOCKER |
| Q2 | Fakten-Vollstaendigkeit (alle Fakten aus INHALTSBASIS verarbeitet) | HIGH |
| Q3 | Fachbegriff-Erklaerung bei Erstverwendung | HIGH |
| Q4 | Satzlaenge ≤20 W, ≤5 Saetze/Absatz | MEDIUM |
| Q5 | Chunk-Abgeschlossenheit (eigenstaendige Erkenntnis) | HIGH |
| Q7 | Sandwich-Uebergaenge vorhanden (ausser letzter Chunk) | HIGH |
| Q8 | KE-Abdeckung (jede KE im Skript) | BLOCKER |
| Q9 | Personifizierung (mindestens 1 Person/Chunk) | HIGH |
| Q10 | Luecken-Markierung (duenne Stellen markiert) | MEDIUM |
| Q11-Q13 | Artefakt-Positionierung (img/zit/rolle platziert) | MEDIUM |

### 5.2 Stufe 2: Fachdidaktische Pruefung (SK1-SK17)

Gemaess GUETEKRITERIEN_SKRIPT.md. Dreistufig:

| Kategorie | Kriterien | Severity | Aktion bei Verletzung |
|---|---|---|---|
| MUSS | SK1-SK7 (Vergegenwärtigung, Elementarisierung, Anschaulichkeit, Strukturiertheit, Sprachliche Angemessenheit, Phasenfolge, Multikausualitaet) | BLOCKER | Ueberarbeitung vor User-Review |
| SOLL | SK8-SK12, SK16 (Gestaltungsprinzipien-Breite, Multiperspektivitaet, Sachbezogene Motivierung, Spannungsbogen, Sandwich-Qualitaet, Perspektiven-Diversitaet) | HIGH | Hinweis als [SK-HINWEIS] im Output |
| KANN | SK13-SK15, SK17 (Gegenwartsprinzip, Zeitkolorit, Kontroversitaet, Umfangs-Plausibilitaet) | MEDIUM | Nur bei expliziter Nachfrage |

### 5.3 Strukturelle Pruefung (neu)

| ID | Kriterium | Pruefung | Severity |
|---|---|---|---|
| QS1 | Dokument-Vollstaendigkeit | Header, Gesamtnarrativ, KE-Abdeckung vorhanden. Pro Chunk: alle 5 Sektionen (§3.2) vorhanden. | BLOCKER |
| QS2 | KE-Matrix-Konsistenz | Jede KE aus DIDAKTIK_RAHMEN hat mindestens 1 Chunk-Zuordnung. Keine KE ohne Skript-Stelle. KE-Abdeckungstabelle stimmt mit Skript-Text ueberein. | BLOCKER |
| QS3 | Chunking-Konformitaet | Chunk-Anzahl = mappen_anzahl. Chunk-Laenge 600-900 W (±10% Toleranz). Mappen-Alignment korrekt. AGENT_SKRIPT gibt pro Chunk den Word-Count an (Skript-Text §-Absaetze, ohne Einstieg-Kontext/Tabellen). | HIGH |
| QS4 | Artefakt-Vollstaendigkeit | Jedes Artefakt aus INHALTSBASIS (img, zit, rolle) ist mindestens einmal im Skript referenziert. ≥3 Artefakt-Marker pro Chunk. Marker-Syntax korrekt. | HIGH |
| QS5 | Tafelbild-Plausibilitaet | Jeder Tafelbild-Entwurf hat ≥4 Knoten, ≥3 Verbindungen. Kernbegriff der Mappe ist als Knoten vorhanden. Verbindungen haben semantische Labels (nicht nur Pfeile). | MEDIUM |
| QS6 | Umfangs-Plausibilitaet (SK17) | Skript-Gesamtumfang laesst 3-5 Materialien pro Mappe bei max. 700-900 W Materialtext erwarten. Bei Ueberschreitung: WARN + Hinweis an Phase 2 Vertrag. | MEDIUM |
| QS7 | Interne Sequenzierbarkeit (F-A3) | Jeder Chunk enthaelt thematisch trennbare Einheiten, die in Phase 1.5 in verschiedene Materialreihenfolgen gebracht werden koennen. Kein Chunk, in dem alle Informationen chronologisch so verzahnt sind, dass nur eine einzige Material-Reihenfolge moeglich waere. | HIGH |
| QS8 | TAFELBILD-Ableitbarkeit (F-A4) | Tafelbild-Entwurf pro Chunk muss als Grundlage fuer Phase-0.4-AGENT_HEFTEINTRAG dienen koennen. Kernbegriffe, Ordnungsmuster-Hinweis und Verbindungsstruktur muessen erkennbar sein. | HIGH |

**Gate-Urteil:** PASS wenn alle BLOCKER bestanden + max 2 HIGH als WARN. Sonst: Nachbesserung.

**User-Validierung:** PFLICHT nach Q-Gate. Lehrkraft prueft: Fachliche Korrektheit, didaktische Reduktion, Mappen-Aufteilung, Progression, Sprachregister, Artefakt-Eignung.

**Ruecklauf-Szenario:** Wenn User-Validierung oder AGENT_HEFTEINTRAG (Phase 0.4) ein strukturelles Problem im SKRIPT aufdeckt (z.B. SCPL nicht ableitbar, Chunk nicht sequenzierbar): Ruecklauf zu AGENT_SKRIPT mit praezisem Finding. AGENT_SKRIPT ueberarbeitet den betroffenen Chunk. Max. 1 Iteration pro Chunk. Wenn nach Iteration nicht loesbar: Finding dokumentieren + User-Entscheidung (ggf. Ruecklauf bis AGENT_DIDAKTIK, wenn das Mappen-Zuschnitt-Problem ist).

---

## 6. Konventionen

- **Sprache:** Deutsch, Umlaute als ae/oe/ue (Dateikompatibilitaet)
- **Sprachregister:** Jugendsachbuch-Ton (R7-Mittelschule). Weder infantil noch wissenschaftlich. Orientierung: "Was ist was"-Reihe, Niveau 12-13 Jahre.
- **Game-ID:** Uebernommen aus DIDAKTIK_RAHMEN
- **Dateiname:** `SKRIPT_[game-id].md`
- **Ablageort:** `docs/agents/artefakte/`
- **Ort der Ausfuehrung:** Cowork (narrative Qualitaet erfordert iterative Arbeit)
- **Referenz-Dokument:** GUETEKRITERIEN_SKRIPT.md ist kanonisch fuer alle fachdidaktischen Qualitaetskriterien. Dieser Vertrag referenziert, dupliziert nicht.
