# C2 Audit D3-D8: Technische, Operative und Infrastrukturelle Dimensionen

**Erstellt:** 2026-04-04 (PM-Session 10)
**Auditor:** PM (Cowork)
**Quellen:** C2_VERLAUF_GESAMT.md, C2_VERLAUF_SESSION_P-1.md bis P-6.md, C2_AUTOMATED_CHECKS.md
**Methode:** Quantitative Analyse der Transcript-Metriken + qualitative Bewertung der Muster.

---

## D3: Technische Implementation

### Pruefgegenstand
JSON-Qualitaet, Encoding-Konsistenz, Schema-Konformitaet, Assembly-Integritaet der Produktionsdateien.

### Befunde

**JSON-Validitaet:** 17/17 Einzeldateien + data.json valide (C2_AUTOMATED_CHECKS: JSON-1 PASS, JSON-2 PASS). Kein einziger JSON-Syntaxfehler in den finalen Dateien.

**Encoding:** UTF-8 durchgaengig. Typographische Anfuehrungszeichen konsistent (oeffnend U+201E, schliessend U+201C) in der finalen Version (ENC-1 PASS, ENC-2 PASS).

**Encoding-Fehler waehrend Produktion (P6-F1, HIGH):** 2 Aufgaben-Dateien (aufgabe-4-1, aufgabe-4-4) hatten waehrend der Produktion in P-5 gemischte Anfuehrungszeichen (oeffnend U+201E + schliessend ASCII U+0022). Entdeckt und gefixt in P-6 (Assembly) durch Python-Validierung.

**Root-Cause-Analyse P6-F1:**
- Die Produktions-KI in P-5 erzeugte 7 Aufgaben in einer Session mit 9 Dispatches.
- Materialien (P-2, P-3) wurden nach jedem Dispatch per Python (`json.loads()`) validiert.
- Aufgaben (P-5) wurden NICHT per Python validiert — nur per Edit-Tool geschrieben und per Q-Gate-Checkliste geprueft.
- Der Encoding-Fehler ist ein **LLM-Output-Artefakt**: Das Modell generierte beim Schreiben von JSON-Strings gelegentlich ASCII-Anführungszeichen statt typographischer.
- Die Q-Gate-Checkliste (A1-A18) prueft Encoding nicht explizit — die Encoding-Pruefung A1 ist eine Infrastruktur-Regel, die Python-Validierung voraussetzt.

**Infrastruktur-Luecke:** Die Python-Validierung war in den Material-Subagenten-Prompts als Praxis etabliert, aber nicht in den Aufgaben-Subagenten-Prompts als PFLICHT kodifiziert.

> **D3-F1 (HIGH, = P6-F1):** Encoding-Fehler durch fehlende Python-Validierung bei Aufgaben. Behoben in Assembly. Infrastruktur-Patch noetig: Python-JSON-Validierung als PFLICHT in ALLE Subagenten-Prompts aufnehmen (nicht nur Material).

**Assembly-Integritaet:** data.json enthaelt Mappe-4 mit 5 Materialien, 7 Aufgaben, korrekt. mappe-4.html existiert (3.128 B). Cache-Busting vorhanden. Bilder heruntergeladen (3/3).

> **D3-F2 (INFO):** P-6 korrigierte img-4-1 von angenommenem PNG zu tatsaechlichem SVG (278 KB). Selbstkorrektur ohne User-Eingriff — zeigt, dass Assembly-Logik robust gegen Format-Annahmen ist.

### D3-Ergebnis: **PASS mit 1 HIGH Finding (behoben).**

Die technische Qualitaet der finalen Dateien ist einwandfrei. Der Encoding-Fehler wurde innerhalb der Pipeline entdeckt und behoben. Die Luecke (fehlende Python-Validierung fuer Aufgaben) ist eine Infrastruktur-Empfehlung, kein finaler Produktionsfehler.

---

## D4: Tool-Calling-Effizienz

### Pruefgegenstand
Verhaeltnis produktiver zu redundanter/fehlgeschlagener Tool-Calls. Lerneffekte innerhalb und zwischen Sessions.

### Quantitative Analyse

| Metrik | Wert |
|---|---|
| Tool-Calls gesamt | 332 (exkl. 58 TodoWrite Overhead) |
| Produktive Calls | 265 (332 - 58 TodoWrite - 9 ToolSearch) |
| Read:Write+Edit | 141:55 = 2.56:1 |
| Fehlgeschlagene Calls | Gering (P2-F2: 1 Pfadfehler nach Compaction, P3-F1: 4 Wikimedia-Suchen) |
| Redundante Calls | P3-F9: doppelte Python-Validierung, P5-F6: 6× Read Q-GATE-LOG nach Compaction |

### Muster-Analyse

**Read-Dominanz (141 Reads = 42% aller Calls):** Der hohe Read-Anteil ist kein Effizienzproblem, sondern Ausdruck des Decision-Tree-Patterns: Vor jedem Dispatch werden Vertrag, Materialien, SCPL-Kontext gelesen. Das ist infrastrukturbedingt korrekt. Read:Write+Edit von 2.56:1 bedeutet: pro geschriebener Datei wurden ~2.5 Dateien gelesen — das ist fuer eine vertragsbasierte Pipeline mit Q-Gates angemessen.

**Wikimedia-Suche (P-3):** 5 Wikimedia-Search-Calls fuer 2 Bilder. D4 (mat-4-4 Karte Marne) brauchte 4 Versuche, D5 (mat-4-5 Schuetzengraben) nur 1 — Intra-Session-Lerneffekt. P3-F1 klassifiziert die 4 Versuche bei D4 als LOW (Suchstrategie-Optimierung), P3-F8 dokumentiert den Lerneffekt bei D5 als PASS.

**Post-Compaction-Overhead (P-5):** Nach Compaction 2 las die KI Q-GATE-LOG 6× (P5-F6) — das ist redundant, aber der Zweck war Luecken-Erkennung (D10-D12c fehlten). Die 6 Reads fuehrten zur korrekten Nachtragung. Overhead: ~6 Calls = 2% der Gesamt-Calls.

**ToolSearch-Calls (9):** Wurden vor MCP-Aufrufen (Wikimedia, Claude-Preview) genutzt. Notwendig, da deferred Tools erst per ToolSearch geladen werden muessen. Kein Effizienzproblem — systembedingt.

> **D4-F1 (LOW, = P3-F1):** 4 Wikimedia-Suchen fuer ein Bild (Marne-Karte). Suchstrategie optimierbar: gezieltere Keywords in erster Suche.
> **D4-F2 (LOW, = P3-F9):** Doppelte Python-Validierung bei mat-4-4. Redundant, aber nicht schaedlich.
> **D4-F3 (LOW, = P5-F9):** Nach Compaction nur aufgabe-4-1 bis 4-3 re-gelesen, nicht 4-4 bis 4-7. Kein Datenverlust, aber incomplete Recovery-Read.

### D4-Ergebnis: **PASS.** Tool-Calling ist effizient. Redundanzen sind gering (<5% der Calls) und verursachten keinen Schaden. Lerneffekte innerhalb Sessions nachweisbar.

---

## D5: Token-Effizienz

### Pruefgegenstand
Output-Token-Verbrauch relativ zur Produktionsleistung. Overhead-Anteil.

### Quantitative Analyse

| Metrik | Wert |
|---|---|
| Output-Tokens gesamt | ~195.000 |
| Dispatches | 18 |
| Tokens pro Dispatch (Durchschnitt) | ~10.800 |
| Session mit hoechster Dichte | P-5: 9 Dispatches in ~48.900 Tokens = ~5.430/Dispatch |
| Session mit niedrigster Dichte | P-1: 2 Dispatches in ~29.000 Tokens = ~14.500/Dispatch |
| Session mit niedrigstem Output pro Dispatch | P-6: 1 Dispatch in ~21.200 Tokens (Assembly, hoher Bash-Anteil) |

### Analyse

**P-1 (Design) ist token-intensiv (14.500/Dispatch):** Erwartbar — Phase 1 erfordert TAFELBILD-Analyse, Skript-Lektuere, Materialtyp-Zuordnung, Sequenzplanung. Hoher Read-Anteil, viel Reasoning.

**P-5 (Aufgaben) ist token-effizient (5.430/Dispatch):** 9 Dispatches in 16 Minuten. Die Dispatch-Isolation (P4-Patch) erweist sich als token-effizient: Jeder Aufgaben-Dispatch hat einen kurzen Read-Write-Zyklus. Der Progressionsplan (D7) wird einmal gelesen, dann folgen 7 Aufgaben-Dispatches mit jeweils ~3.000-5.000 Tokens.

**Context-Reuse (P3-F7 PASS, P5-F5 PASS):** Innerhalb einer Session werden Ergebnisse vorheriger Dispatches wiederverwendet. mat-4-1 wird in P-2 fuer D1 gelesen und ist fuer D2+D3 im Kontext verfuegbar. Kein erneutes Lesen noetig. In P-5 wird der Progressionsplan (D7) einmal gelesen und fuer D8-D13 wiederverwendet. Das ist ein messbarer Effizienzgewinn.

**TodoWrite-Overhead:** 58 TodoWrite-Calls = 17.5% aller Calls. Das ist systembedingt (Cowork-UI erwartet Fortschrittsanzeige) und keine Ineffizienz im engeren Sinne.

### D5-Ergebnis: **PASS.** Token-Verbrauch ist angemessen. Dispatch-Isolation erweist sich als token-effizient (nicht -ineffizient, wie man vermuten koennte). Context-Reuse funktioniert.

---

## D6: Compaction-Resilienz

### Pruefgegenstand
Verhalten der Produktions-KI nach Context-Compaction. Informationsverlust, Recovery-Qualitaet, Fehlerrate.

### Analyse der 2 Compaction-Events

**Compaction 1 (P-2, nach D2):**

| Aspekt | Bewertung |
|---|---|
| Dispatch-Identifikation | PASS — D3 korrekt als naechster Dispatch erkannt |
| Pfad-Recovery | PARTIAL — initialer Pfadfehler (P2-F2 MEDIUM), dann Glob-Korrektur |
| Vertrag-Re-Lektuere | FAIL — VERTRAG_PHASE_2-1 nicht re-gelesen (P2-F11/D1-F1) |
| Output-Qualitaet | PASS — mat-4-3.json ist inhaltlich und technisch korrekt |
| Sprach-Wechsel | FAIL — Deutsch → Englisch (P2-F3 LOW) |
| Gesamt | Funktional korrekt, prozessual unvollstaendig |

**Compaction 2 (P-5, nach D12c):**

| Aspekt | Bewertung |
|---|---|
| Dispatch-Identifikation | PASS — D13 (Cross-Konsistenz) korrekt erkannt |
| Q-Gate-Log-Recovery | PASS — Luecke D10-D12c erkannt und nachgetragen |
| Aufgaben-Re-Lektuere | PARTIAL — nur 4-1 bis 4-3, nicht 4-4 bis 4-7 (P5-F9 LOW) |
| Output-Qualitaet | PASS — Cross-Konsistenz-Check korrekt durchgefuehrt |
| Sprach-Wechsel | FAIL — Deutsch → Englisch (P5-F4 LOW) |
| Gesamt | Funktional korrekt, Recovery-Breite unvollstaendig |

### Compaction-Recovery-Muster

Das Recovery-Protokoll (definiert in COWORK_PROJECT_ANLEITUNG_PRODUKTION.md) sieht 6 Schritte vor:
1. Projektanweisung lesen
2. Dispatch-Skript lesen
3. Q-GATE-LOG lesen (Fortschritt)
4. Naechsten Dispatch identifizieren
5. Subagent-Prompt lesen
6. Produktion fortsetzen

**Tatsaechliches Verhalten:**
- Schritt 1-4: Beide Compactions korrekt.
- Schritt 5: Compaction 1 — Pfadfehler, dann korrigiert. Compaction 2 — kein Subagent-Prompt noetig (D13 = Orchestrator-Cross-Check).
- Schritt 6: Beide korrekt.

**Nicht im Protokoll, aber beobachtet:** Vertrag wird nicht re-gelesen (weder C1 noch C2). Das Recovery-Protokoll erwaehnt "Subagent-Prompt lesen", aber nicht explizit "Vertrag re-lesen". Das ist eine **Protokoll-Luecke**, nicht ein KI-Fehler.

> **D6-F1 (LOW):** Recovery-Protokoll in COWORK_PROJECT_ANLEITUNG_PRODUKTION.md sollte explizit "Vertrag der aktuellen Phase re-lesen" als Schritt aufnehmen.
> **D6-F2 (LOW):** Sprach-Wechsel nach Compaction ist reproduzierbar (2/2). Ursache wahrscheinlich: Compaction-Summary wird auf Englisch generiert (System-Default), und die KI uebernimmt die Sprache. Abmilderung: Projektanweisung koennte "Antwortsprache: Deutsch" als ersten Satz enthalten.

### D6-Ergebnis: **PASS mit Einschraenkungen.** Beide Compaction-Events fuehrten zu korrektem Output. Die Schwaechen (Pfadfehler, Sprach-Wechsel, unvollstaendige Re-Lektuere) beeintraechtigten das Ergebnis nicht. Recovery-Protokoll hat 2 Luecken.

---

## D7: Usability

### Pruefgegenstand
Autonomiegrad der Produktions-KI. User-Interventionsbedarf. Vorhersagbarkeit des Verhaltens.

### Analyse

**User-Input-Profil:**

| Session | User-Inputs | Typ |
|---|---|---|
| P-1 | "WEITER" (1×) | Fortfahren |
| P-2 | "WEITER" (2×) | Fortfahren |
| P-3 | "WEITER" (1×) | Fortfahren |
| P-4 | "DU HAST KEINEN SESSION-SPLIT-PROMPT AUSGEGEBEN" | Prozess-Korrektur |
| P-5 | "WEITER" (1×) | Fortfahren |
| P-6 | "JA" (1×) | git-push-Bestaetigung |

**Autonomiegrad:** 5/6 Sessions liefen vollstaendig autonom (nur "WEITER"). Die einzige inhaltliche Intervention (P-4) betraf einen prozessualen Fehler (fehlender Split-Prompt), keinen inhaltlichen.

**Inhaltliche Interventionen:** 0. Kein Material und keine Aufgabe musste vom User korrigiert werden. Q-Gate PASS 1. Durchlauf: 16/16 (Materialien + Aufgaben + Cross).

**Vorhersagbarkeit:** Die KI folgte dem Dispatch-Skript deterministisch. Dispatches wurden in der vorgesehenen Reihenfolge abgearbeitet. Dynamische Erweiterungen (D12b, D12c) folgten aus dem Progressionsplan — vorhersagbar.

> **D7-F1 (INFO):** Der User brauchte im gesamten Produktionslauf (86 min, 18 Dispatches) nur 1 prozessuale Korrektur und 0 inhaltliche Korrekturen. Das ist eine signifikante Verbesserung gegenueber Mappe 3, wo die Interventionsdichte nicht gemessen wurde, aber retroaktiv hoeher geschaetzt wird.

### D7-Ergebnis: **PASS.** Hohe Autonomie, minimaler Interventionsbedarf. Die Produktions-KI arbeitete weitgehend selbststaendig und korrekt.

---

## D8: Infrastruktur-Wirksamkeit

### Pruefgegenstand
Haben die Infrastruktur-Patches (A1-A7, B1-B2, P1-P3) die intendierten Wirkungen erzielt?

### Patch-Wirkungs-Analyse

| Patch | Intendierte Wirkung | Mappe-3-Problem | Mappe-4-Beobachtung | Wirkung |
|---|---|---|---|---|
| A1 (Encoding UTF-8) | Konsistente typographische Zeichen | Encoding-Probleme | 2 Aufgaben mit Encoding-Fehler (P6-F1), in Assembly gefixt | **PARTIAL** — Regel existiert, aber Durchsetzung asymmetrisch (Material ja, Aufgaben nein) |
| A2 (Quellenangaben-Hygiene) | Quellen nur in `quelle`-Feld, nicht in `inhalt` | Quellen in inhalt | 0 Kontaminationen (QA-1 PASS) | **WIRKSAM** |
| A3 (Sprachregister Ueberleitungen) | R7-Niveau, max 2 Saetze | Ueberleitung zu lang/abstrakt | 4 Ueberleitungen, alle R7-konform, 1-2 Saetze | **WIRKSAM** |
| B1 (Antwortpool LT) | N+1 Begriffe sichtbar | Lueckentext ohne Pool | aufgabe-4-1: Pool mit 4 Begriffen (3 korrekt + 1 Distraktor) | **WIRKSAM** |
| B2 (Inhaltliche Verankerung) | Konkreter Bezug statt Metasprache | Abstrakte Fragestellungen | 7/7 Aufgaben mit konkretem Materialbezug | **WIRKSAM** |
| P1 (Freitext-Keywords) | Minimum-Keywords in loesung[], Rest in _meta | Freitext-Validierung unklar | aufgabe-4-7: loesung=2 Keywords, _meta.erwartete_begriffe=5 | **WIRKSAM** |
| P2 (Knoten-Elaborierung) | merksatz fuer komplexe Fachbegriffe | Fachbegriffe ohne Erklaerung | k4-1, k4-2, k4-6 haben merksatz. k4-3, k4-4, k4-5 ohne (weil typ=ursache/ereignis, nicht kernbegriff) | **WIRKSAM** (regelkonform: merksatz nur bei kernbegriff-Typ) |
| P3 (Teilfragen-Rendering) | _meta.teilfragen sichtbar in Engine | Teilfragen nicht gerendert | aufgabe-4-7 hat _meta.teilfragen. Engine-Patch v3.9 bereits deployed. | **WIRKSAM** |

### Mappe-3-vs-4-Vergleich (Infrastruktur-Impact)

| Metrik | Mappe 3 | Mappe 4 | Interpretation |
|---|---|---|---|
| Aufgaben-Nachbesserungen | 4/5 (80%) | 0/7 (0%) | **Dramatische Verbesserung.** A2b (Verankerung), verbesserte SUB_AUFGABE-Prompts und Dispatch-Isolation (P4) wirken gemeinsam. |
| Cross-Konsistenz FAILs | 0 | 0 | Stabil. Infrastruktur hat nichts verschlechtert. |
| User-Interventionen (inhaltlich) | nicht gemessen | 0 | Infrastruktur ermoeglicht volle Autonomie. |
| Encoding-Fehler | nicht gemessen | 2 (Assembly-gefixt) | **Neue Fehlerquelle** — A1-Regel existiert, aber Durchsetzungsmechanismus (Python-Validierung) nicht universal kodifiziert. |

### Infrastruktur-Luecken identifiziert

| # | Luecke | Herkunft | Empfehlung |
|---|---|---|---|
| IL-1 | Python-Validierung nicht in Aufgaben-Subagenten-Prompts | P6-F1 Root-Cause | PFLICHT-Schritt in alle 5 SUB_AUFGABE_*.md: `python3 -c "import json; json.load(open('...'))"` nach jedem Write |
| IL-2 | Recovery-Protokoll ohne Vertrag-Re-Lektuere | D6-F1 | COWORK_PROJECT_ANLEITUNG_PRODUKTION.md Schritt 5 erweitern |
| IL-3 | Keine Sprach-Steuerung nach Compaction | D6-F2 | Projektanweisung: "Antwortsprache: Deutsch" als TOP-Anweisung |
| IL-4 | Session-Split-Prompt nicht 100% zuverlaessig | P4-F1 | ORCHESTRATOR.md: Session-Split-Prompt als PFLICHT-Output nach jedem Dispatch-Block, nicht optional |
| IL-5 | ARTEFAKT_INVENTAR nicht aktualisiert | P3-F3 | Automatisierung: Inventar-Update als Teil von Assembly (D14) |

> **D8-F1 (MEDIUM):** Infrastruktur-Luecke IL-1 (Python-Validierung bei Aufgaben) ist der einzige Patch-Versager — A1 existiert als Regel, aber der Durchsetzungsmechanismus fehlt fuer einen Artefakttyp. Alle anderen Patches wirken wie intendiert.

### D8-Ergebnis: **PASS mit 1 MEDIUM Finding.** 7/8 Patches wirken vollstaendig. 1 Patch (A1 Encoding) wirkt partial — Regel existiert, Mechanismus fehlt bei Aufgaben. 5 Infrastruktur-Luecken identifiziert, alle patchbar.

---

## Konsolidierte Findings D3-D8

| Finding | Dimension | Severity | Detail |
|---|---|---|---|
| D3-F1 | D3 | HIGH | = P6-F1: Encoding-Fehler, behoben. Python-Validierung fuer Aufgaben fehlt. |
| D3-F2 | D3 | INFO | img-4-1 PNG→SVG Selbstkorrektur |
| D4-F1 | D4 | LOW | 4 Wikimedia-Suchen fuer 1 Bild |
| D4-F2 | D4 | LOW | Doppelte Python-Validierung |
| D4-F3 | D4 | LOW | Incomplete Re-Read nach Compaction |
| D6-F1 | D6 | LOW | Recovery-Protokoll ohne Vertrag-Re-Lektuere |
| D6-F2 | D6 | LOW | Sprach-Wechsel nach Compaction (reproduzierbar) |
| D7-F1 | D7 | INFO | 0 inhaltliche User-Interventionen in 86 min |
| D8-F1 | D8 | MEDIUM | A1-Durchsetzung asymmetrisch (Materialien ja, Aufgaben nein) |

**Severities D3-D8:** 1 HIGH (behoben), 1 MEDIUM, 5 LOW, 2 INFO.
