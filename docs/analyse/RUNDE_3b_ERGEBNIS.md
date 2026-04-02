# Runde 3b: Ergebnis — v4 Prozesstest nach Infrastruktur-Optimierungen

**Datum:** 2026-04-01
**Evaluator:** Post-hoc-Rekonstruktion aus Chat-Transkript (3 Sessions)
**Vorgaenger:** RUNDE_3a_ERGEBNIS.md (Baseline)
**Optimierungen seit 3a:** Vertrags-Extraktion (6 Phasen-Vertraege), Dispatch-Isolation (P4 explizit), Q-GATE-LOG als Pflicht, Goldstandard-Rolle neu definiert, Phase-2-Abschluss verankert, TAFELBILD retroaktiv erstellt
**Sessions:** 2 Cowork + 1 Claude Code, mit Session-Split nach Phase 2.1c

---

## 0. Zusammenfassung

| Ebene | Ergebnis | Details |
|---|---|---|
| Ebene 1: Prozesskonformitaet | **PASS** | P1 konform, P4 konform (isolierte Dispatches), P5 konform (Q-GATE-LOG persistiert), P6 konform (Vertraege gelesen) |
| Ebene 2: Artefaktqualitaet | **PASS** | Alle Q-Gates PASS, M3b + C1b korrekt, Engine-Typen korrekt |
| Ebene 3: Compaction-Resilienz | **PASS** | Session-Split durchgefuehrt, Phase 2.2 in frischem Kontext erfolgreich |
| Ebene 4: Token-Effizienz | **DEUTLICH VERBESSERT** | Vertraege statt WORKFLOW, kein data.json-Read, TAFELBILD als kanonische Quelle |

**Entscheidung:** Alle HIGH-Befunde aus Runde 3a behoben. Prozessstruktur grundsaetzlich produktionsreif. Verbleibende Befunde betreffen Infrastruktur-Luecken und operationale Reibung (Git-Roundtrip, Worktree-Verwirrung), nicht Architektur.

---

## 1. Chronologischer Dispatch-Log

### Session 1: Cowork (Phase 2.0 — 2.1c)

| # | Phase | Dispatch | Aktion | Q-Gate | Anmerkungen |
|---|---|---|---|---|---|
| 1 | — | — | ORCHESTRATOR.md gelesen | — | Einstiegspunkt korrekt |
| 2 | — | — | VERTRAG_PHASE_2-0_RAHMEN.md gelesen | — | Vertrags-Extraktion greift: Agent liest Vertrag, nicht WORKFLOW |
| 3 | — | — | TAFELBILD_Mappe2.md + MATERIAL_GERUEST gelesen | — | TB-FREEZE-Artefakt als kanonische Quelle verfuegbar |
| 4 | — | — | SKRIPT Chunk 2 + DIDAKTIK_RAHMEN gelesen | — | Input-Artefakte gemaess Vertrag |
| 5 | 2.0 | D01 | tafelbild.json (1:1 aus TB-FREEZE) | 9/9 PASS | C1b, M3b explizit geprueft |
| 6 | 2.0 | D01 | einstieg.json | — | problemstellung === stundenfrage |
| 7 | 2.0 | D01 | sicherung.json (M3b: kernerkenntnisse === scpl.loesung) | — | Zitat zit-2-1 eingebunden |
| 8 | 2.0 | D01 | meta.json (freischalt_code: FUNKE) | — | Thematisch passend (Skript-Metapher) |
| 9 | 2.0 | D01 | Q-GATE-LOG.md erstellt | — | **Persistiert** (3a-Befund F-P5-1 behoben) |
| 10 | 2.1 | D02 | VERTRAG_PHASE_2-1_MATERIAL.md gelesen | — | Neuer Vertrag-Read pro Phase |
| 11 | 2.1 | D02 | SUB_MATERIAL_DARSTELLUNGSTEXT.md + QUALITAETSKRITERIEN gelesen | — | |
| 12 | 2.1 | D02 | INHALTSBASIS gelesen | — | Fuer Mappe-2-Quelldaten |
| 13 | 2.1 | D02 | mat-2-1.json (darstellungstext, 148 W) | 14/14 PASS | Isolierter Dispatch |
| 14 | 2.1 | D03 | SUB_MATERIAL_BILDQUELLE.md gelesen | — | Neuer Subagent-Read |
| 15 | 2.1 | D03 | ARTEFAKT_INVENTAR gelesen → **Luecke entdeckt** | — | Keine Mappe-2-Eintraege, Fallback auf INHALTSBASIS |
| 16 | 2.1 | D03 | mat-2-2.json (bildquelle, Beltrame) | PASS | Isolierter Dispatch |
| 17 | — | — | **E1 User-Validierung** nach mat-2-1 + mat-2-2 | **PASS** | Vertragsgemaess (Erstanwendung Mappe 2) |
| 18 | 2.1 | D04 | mat-2-3.json (bildquelle, Foto) | PASS | Isolierter Dispatch |
| 19 | 2.1 | D05 | SUB_MATERIAL_QUELLENTEXT.md gelesen → mat-2-4.json (quellentext, Ultimatum, 82 W) | PASS | Isolierter Dispatch |
| 20 | 2.1 | D06 | SUB_MATERIAL_ZEITLEISTE.md gelesen → mat-2-5.json (zeitleiste, 8 Eintraege) | PASS | Isolierter Dispatch |
| 21 | 2.1 | D07 | SUB_MATERIAL_TAGEBUCH.md gelesen → mat-2-6.json (tagebuch, 118 W) | PASS | Isolierter Dispatch |
| 22 | 2.1 | — | Q-GATE-LOG.md aktualisiert (Phase 2.1: 6/6 PASS) | — | |
| 23 | 2.1c | D08 | VERTRAG_PHASE_2-1c_CROSS.md gelesen | — | |
| 24 | 2.1c | D08 | Cross-Konsistenz: 4 Achsen | 4/4 PASS | Sequenz, Fachbegriffe, Ueberleitung, TB-Abdeckung |
| 25 | 2.1c | — | Q-GATE-LOG.md aktualisiert | — | |
| 26 | — | — | **SESSION-SPLIT** (User: "split") | — | Fortsetzungs-Prompt generiert |

### Session 2: Cowork (Phase 2.2a — Abschluss)

| # | Phase | Dispatch | Aktion | Q-Gate | Anmerkungen |
|---|---|---|---|---|---|
| 27 | — | — | ORCHESTRATOR.md gelesen (frischer Kontext) | — | Korrekt: Neu-Read nach Split |
| 28 | — | — | VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md gelesen | — | |
| 29 | — | — | AGENT_RAETSEL.md gelesen | — | |
| 30 | — | — | Alle mat-2-*.json (Metadaten) + rahmen/*.json gelesen | — | Per Subagenten parallelisiert |
| 31 | 2.2a | D09 | PROGRESSIONSPLAN.md erstellt (5 Positionen) | PASS | AFB I→I→II→II→III, 5 Typen, 6 Materialien abgedeckt |
| 32 | 2.2b | D10 | SUB_AUFGABE_MC.md + mat-2-2 + mat-2-3 gelesen → aufgabe-2-1.json | PASS | Isolierter Dispatch |
| 33 | 2.2b | D11 | SUB_AUFGABE_ZUORDNUNG.md + mat-2-1 gelesen → aufgabe-2-2.json | PASS | Isolierter Dispatch |
| 34 | 2.2b | D12 | SUB_AUFGABE_REIHENFOLGE.md + mat-2-5 gelesen → aufgabe-2-3.json | PASS | Isolierter Dispatch |
| 35 | 2.2b | D13 | SUB_AUFGABE_LUECKENTEXT.md + mat-2-4 gelesen → aufgabe-2-4.json | PASS | Isolierter Dispatch |
| 36 | 2.2b | D14 | SUB_AUFGABE_FREITEXT.md + mat-2-6 gelesen → aufgabe-2-5.json | PASS | Isolierter Dispatch |
| 37 | 2.2c | D15 | Cross-Konsistenz: A5, A3, A8-A10, A12, MQ3 | ALL PASS | |
| 38 | 2.2c | — | Q-GATE-LOG.md aktualisiert | — | |
| 39 | Abschluss | — | WORKFLOW_v4.md gelesen (fuer Uebergabe-Format) | — | Einziger WORKFLOW-Read im gesamten Prozess |
| 40 | Abschluss | — | UEBERGABE_PROMPT_PHASE3.md erstellt | — | **3a-Befund F-P2-2 behoben** |
| 41 | — | — | Git-Commit-Befehle an User uebergeben | — | Sandbox-Restriction: Cowork kann nicht committen |

### Session 3: Claude Code (Phase 3)

| # | Phase | Aktion | Status | Anmerkungen |
|---|---|---|---|---|
| 42 | 3.0 | UEBERGABE_PROMPT_PHASE3.md gelesen | OK | Einstieg ueber Uebergabe-Prompt (nicht ORCHESTRATOR) |
| 43 | 3.0 | git pull → Already up to date (falsches Repo) | **PROBLEM** | Worktree-Verwirrung: Projekt_Website statt weitergehts-online |
| 44 | 3.0 | Pfadwechsel zu weitergehts-online | OK | Manuell korrigiert |
| 45 | 3.0 | ls rahmen/ → 3 Dateien (einstieg, meta, sicherung) | **AUFFAELLIG** | tafelbild.json nicht gelistet — moeglicherweise Display-Truncation |
| 46 | 3.0 | 15 JSONs validiert (python3 json.load) | ALL OK | |
| 47 | 3.0 | data.json Mappe 1 gelesen | OK | Glob-Suche noetig (Worktree vs. Hauptrepo) |
| 48 | 3.1 | Engine-Patch: text_mit_luecken \|\| frage (Z.2279) | DONE | BLOCKER B2-#1 behoben |
| 49 | 3.1 | Bild-Download: direkte Thumbnail-URLs | **404** | Hash-Pfad nicht aus Dateiname ableitbar |
| 50 | 3.1 | Bild-Download: API-Fallback (resolve_url_via_api) | OK | img-2-1: 611 KB, img-2-2: 118 KB |
| 51 | 3.2 | Assembly: Python-Skript baut Mappe-2-Objekt | OK | _meta entfernt, sortiert nach position/ID |
| 52 | 3.2 | data.json: Mappe 2 appended (mappen[1]) | OK | Mappe 1 unberuehrt |
| 53 | 3.3 | mappe-2.html erstellt (aus mappe-1.html Template) | OK | |
| 54 | 3.4 | Validierung: 8/8 Checks PASS | ALL PASS | JSON, IDs, Bilder, Code, C1b, Mappe-1-Integritaet |
| 55 | 3.5 | git commit 0c0e1ee + push | OK | "v3.8: Mappe 2 — Das Attentat von Sarajevo" |

**Gesamt: 15 Dispatches, 55 Prozessschritte, 3 Sessions.**

---

## 2. Prozesskonformitaet: 3a-Befunde im Vergleich

| 3a-Befund | Schwere | 3b-Status | Nachweis |
|---|---|---|---|
| F-P4-1: Batch-Produktion | HIGH | **BEHOBEN** | Alle 11 Material-/Aufgaben-Dispatches isoliert (je 1 Artefakt pro Nachricht) |
| F-P5-1: Kein Q-GATE-LOG.md | HIGH | **BEHOBEN** | Q-GATE-LOG.md nach jeder Phase aktualisiert (2.0, 2.1, 2.1c, 2.2b, 2.2c) |
| F-INFRA-1: Kein TAFELBILD-Artefakt | HIGH | **BEHOBEN** | TAFELBILD_Mappe2.md existiert, TB-FREEZE respektiert, tafelbild.json 1:1 abgeleitet |
| F-P6-1: Ueberfluessige Reads | MEDIUM | **BEHOBEN** | Kein HANDOFF gelesen, kein data.json gelesen (explizit verboten in Vertraegen) |
| F-P6-2: WORKFLOW nicht gelesen | MEDIUM | **BEHOBEN (Design)** | Vertraege statt WORKFLOW. WORKFLOW nur 1x gelesen (Phase-2-Abschluss, Uebergabe-Format) |
| F-P2-1: Phase 3 in Cowork | MEDIUM | **BEHOBEN** | Phase 3 in Claude Code, Uebergabe-Prompt als Schnittstelle |
| F-GOLD-1: data.json als Template | MEDIUM | **BEHOBEN** | data.json nur in Phase 3 gelesen (Assembly-Ziel), nie als Schema-Vorlage |
| F-P2-2: Kein Uebergabe-Prompt | MEDIUM | **BEHOBEN** | UEBERGABE_PROMPT_PHASE3.md generiert und verwendet |

**Alle 8 Befunde aus Runde 3a sind behoben.**

---

## 3. Neue Befunde

### F-3b-INVENTAR: ARTEFAKT_INVENTAR ohne Mappe-2-Eintraege (MEDIUM)

**Soll:** ARTEFAKT_INVENTAR enthaelt alle Artefakt-Referenzen (img-*, zit-*, rolle-*) fuer die aktuelle Mappe.
**Ist:** Nur Mappe-1-Eintraege vorhanden. Agent entdeckt Luecke bei D03 (mat-2-2, Bildquelle), nutzt INHALTSBASIS Wikimedia-Artefakte-Tabelle als Fallback.
**Konsequenz:** Funktional kein Problem — INHALTSBASIS enthaelt alle noetigen Daten. Aber: Verletzung des Vertragsprinzips (ARTEFAKT_INVENTAR ist im Read-Contract fuer Bildquellen vorgesehen). Der Agent muss ad hoc entscheiden, wo die Daten liegen.
**Ursache:** ARTEFAKT_INVENTAR wurde in Phase 0 nur fuer Mappe 1 befuellt. Kein automatischer Mechanismus fuer Folgemappen.
**Massnahme:** Phase 0.2 (AGENT_INHALT) oder Phase 1 (AGENT_MATERIAL) muss ARTEFAKT_INVENTAR pro Mappe erweitern. Alternativ: ARTEFAKT_INVENTAR als Mappe-uebergreifendes Dokument definieren, das in Phase 0 komplett befuellt wird.

### F-3b-GIT-1: Cowork-Sandbox kann nicht committen (HIGH operativ)

**Soll:** Phase 2 produziert Dateien → Phase 3 liest sie.
**Ist:** Cowork schreibt in Workspace-Mount. Claude Code arbeitet auf Git-Klon. Ohne Git-Commit sind die Dateien fuer Claude Code unsichtbar. User muss manuell 18 Dateien committen und pushen.
**Konsequenz:** Prozessbruch: Der User wird zum manuellen Relay zwischen zwei Tool-Umgebungen. Fehleranfaellig (vergessene Dateien, falsche Pfade). In Runde 3b funktional kein Problem, aber bei Skalierung (viele Mappen) unhaltbar.
**Ursache:** Cowork-Sandbox hat keine Git-Write-Berechtigung. Architektonische Einschraenkung des Tools, nicht des Prozesses.
**Massnahme:** Zwei Optionen: (A) Cowork generiert exakte git-add/commit/push-Befehle, User fuehrt aus (aktueller Workaround, funktioniert). (B) Phase 2 + Phase 3 komplett in Claude Code (eliminiert Uebergabe, aber verliert Cowork-Kontext-Vorteile). Empfehlung: Option A beibehalten, Commit-Befehle als Pflicht-Output des Phase-2-Abschlusses definieren.

### F-3b-WORKTREE: Claude Code Worktree-Verwirrung (LOW)

**Soll:** Claude Code arbeitet im weitergehts-online Repository.
**Ist:** Claude Code startete in Projekt_Website Worktree (.claude/worktrees/naughty-brattain). Erster git pull schlug fehl (kein Tracking). ls auf Produktionsverzeichnis funktionierte nur ueber absoluten Pfad.
**Konsequenz:** Mehrere verlorene Schritte zur Pfadkorrektur. Shell-cwd wurde wiederholt auf Worktree zurueckgesetzt.
**Ursache:** Claude Code hatte einen aktiven Worktree aus einem anderen Projekt. Der Uebergabe-Prompt enthielt keine explizite cd-Anweisung.
**Massnahme:** Uebergabe-Prompt muss absoluten Pfad als erste Zeile enthalten: `cd /absolute/path/to/weitergehts-online`.

### F-3b-TBJSON: tafelbild.json moeglicherweise nicht in rahmen/ gelistet (LOW)

**Soll:** rahmen/ enthaelt 4 Dateien: tafelbild.json, einstieg.json, sicherung.json, meta.json.
**Ist:** Claude Code's `ls rahmen/` zeigte nur 3 Dateien (einstieg, meta, sicherung). Die JSON-Validierungsschleife lief nur ueber 3 rahmen/*.json.
**Konsequenz:** Unklar ob tafelbild.json tatsaechlich fehlte oder ob Display-Truncation im Transkript vorliegt. Die Assembly verwendete tafelbild.json korrekt (aus Produktionsverzeichnis gelesen), also lag die Datei vor. Moeglicherweise Commit-Luecke (User hat Datei nicht gestaged) oder ls-Output-Truncation.
**Massnahme:** Pre-Flight-Check in Phase 3.0 muss explizit `ls -la rahmen/` mit Dateizaehlung ausfuehren und 4 Dateien als Erwartungswert pruefen.

### F-3b-IMG404: Wikimedia-Thumbnail-URLs nicht direkt ableitbar (LOW)

**Soll:** Bild-Download ueber konstruierte Thumbnail-URL.
**Ist:** Direkte URL-Konstruktion (commons/thumb/[initial]/[hash]/filename/640px-filename) liefert 404. Hash-Pfad ist nicht aus Dateiname deterministisch ableitbar.
**Konsequenz:** Erster Download-Versuch scheitert. API-Fallback (resolve_url_via_api) funktioniert zuverlaessig.
**Massnahme:** Phase-3-Bild-Download soll direkt die API verwenden, ohne erst direkte URL zu versuchen. In Uebergabe-Prompt oder WORKFLOW dokumentieren.

---

## 4. Dispatch-Statistik

### Dispatch-Isolation (P4)

| Phase | Dispatches | Isolation eingehalten? |
|---|---|---|
| 2.0 Rahmen | 1 (4 Dateien als Block) | Ja (Vertrag: Rahmen = 1 Dispatch) |
| 2.1 Material | 6 (je 1 Material) | **Ja** (3a: Nein) |
| 2.1c Cross | 1 | Ja |
| 2.2a Progressionsplan | 1 | Ja |
| 2.2b Aufgaben | 5 (je 1 Aufgabe) | **Ja** (3a: Nein) |
| 2.2c Cross | 1 | Ja |
| **Gesamt** | **15** | **15/15 konform** |

### Q-Gate-Protokollierung (P5)

| Phase | Q-Gate geschrieben? | Inhalt |
|---|---|---|
| 2.0 | Ja | 9/9 PASS (C1b, M3b, Vollstaendigkeit, ...) |
| 2.1 (pro Material) | Ja (6x) | MQ2, Q1-Q10, SQ-1 bis SQ-4 |
| 2.1c | Ja | 4/4 Achsen PASS |
| 2.2a | Ja | A5, A9, A10, A3, A12, MQ3 |
| 2.2b (pro Aufgabe) | Ja (5x) | A1-A7 + typspezifisch |
| 2.2c | Ja | Cross-Kriterien ALL PASS |

### Vertrag-Reads (P6)

| Vertrag | Gelesen in | Token (~) |
|---|---|---|
| VERTRAG_PHASE_2-0_RAHMEN.md | Session 1, vor Phase 2.0 | ~500 |
| VERTRAG_PHASE_2-1_MATERIAL.md | Session 1, vor Phase 2.1 | ~650 |
| VERTRAG_PHASE_2-1c_CROSS.md | Session 1, vor Phase 2.1c | ~400 |
| VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md | Session 2, vor Phase 2.2a | ~400 |
| SUB_AUFGABE_*.md (5x) | Session 2, je vor Dispatch | ~500 je |
| VERTRAG_PHASE_2-2c_CROSS.md | implizit (Orchestrator-Kriterien) | ~0 |
| WORKFLOW_v4.md | Session 2, Phase-2-Abschluss | ~7.000 (einmalig) |

**Vergleich 3a:** In Runde 3a las der Agent WORKFLOW_v4.md nie und data.json stattdessen (~5.000 Token). In 3b: 6 Vertraege (~3.450 Token) + 1x WORKFLOW fuer Uebergabe-Format (~7.000). Der WORKFLOW-Read am Ende ist vermeidbar — Uebergabe-Format sollte im Vertrag oder ORCHESTRATOR stehen.

---

## 5. Token-Effizienz (geschaetzt)

### Session 1 (Phase 2.0 — 2.1c)

| Kategorie | Dateien | ~Token |
|---|---|---|
| Orchestrator + Vertraege | ORCHESTRATOR, VERTRAG_2-0, VERTRAG_2-1, VERTRAG_2-1c | ~4.000 |
| Input-Artefakte | TAFELBILD_Mappe2, MATERIAL_GERUEST, SKRIPT Ch.2, DIDAKTIK_RAHMEN, INHALTSBASIS, ARTEFAKT_INVENTAR | ~10.000 |
| Subagent-Definitionen | SUB_MATERIAL_DT, _BQ, _QT, _ZL, _TB, QUALITAETSKRITERIEN | ~4.000 |
| Produktion (Output) | 4 rahmen + 6 mat + Q-GATE-LOG (Updates) | ~6.000 |
| **Session 1 Gesamt** | | **~24.000** |

### Session 2 (Phase 2.2a — Abschluss)

| Kategorie | Dateien | ~Token |
|---|---|---|
| Orchestrator + Vertraege | ORCHESTRATOR (Re-Read), VERTRAG_2-2a, WORKFLOW_v4 | ~10.000 |
| Input-Artefakte | AGENT_RAETSEL, mat-2-*.json (Metadaten), rahmen/*.json | ~3.000 |
| Subagent-Definitionen | SUB_AUFGABE_MC, _ZU, _RF, _LT, _FT | ~3.500 |
| Produktion (Output) | PROGRESSIONSPLAN + 5 aufgabe + Q-GATE-LOG + UEBERGABE | ~8.000 |
| **Session 2 Gesamt** | | **~24.500** |

### Session 3: Claude Code (Phase 3)

| Kategorie | Dateien | ~Token |
|---|---|---|
| UEBERGABE_PROMPT | 1 Datei | ~800 |
| Alle JSONs (Read) | 15 Dateien + data.json Mappe 1 | ~5.000 |
| Assembly-Skript + Validierung | Python-Code | ~3.000 |
| **Session 3 Gesamt** | | **~8.800** |

### Vergleich mit 3a

| Metrik | Runde 3a | Runde 3b | Delta |
|---|---|---|---|
| Sessions | 1 Cowork (+ Phase 3 in Cowork) | 2 Cowork + 1 Claude Code | +2 Sessions (aber korrekte Architektur) |
| Geschaetzter Token-Verbrauch | ~58.000 (1 Session) | ~57.300 (3 Sessions) | ~-1% gesamt, aber verteilt auf 3 Kontexte |
| WORKFLOW_v4 gelesen | 0x (nie) | 1x (Uebergabe-Format) | +7.000 Token (vermeidbar) |
| data.json als Template | 1x (~5.000 Token) | 0x | -5.000 Token |
| Vertraege gelesen | 0x | 6x (~3.450 Token) | +3.450 Token (gewollt) |
| Compaction-Risiko | Hoch (1 Session, alles akkumuliert) | Niedrig (Split bei ~24k) | Deutliche Verbesserung |

---

## 6. Prozessqualitaet: Beobachtungen

### 6.1 Korrekt umgesetzte Mechanismen

- **E1 User-Validierung:** Nach mat-2-1 + mat-2-2 ausgefuehrt (Vertragsgemaess). Agent legte 3 Kalibrierungsfragen vor (Ton, Sprachregister, Vergegenwartigungstiefe). User: PASS.
- **Session-Split:** Agent bot Split am Checkpoint an. User wahlte Split. Fortsetzungs-Prompt enthielt Status, naechsten Schritt, und Read-Anweisungen. Frischer Kontext in Session 2 funktionierte ohne Informationsverlust.
- **TB-FREEZE:** Keine Aenderungen an SCPL-Schritten in gesamtem Prozess. tafelbild.json ist 1:1-Ableitung aus TAFELBILD_Mappe2.md.
- **Subagent-Reads:** Jeder Material-Dispatch las den typ-spezifischen SUB_MATERIAL_*.md. Jeder Aufgaben-Dispatch las den typ-spezifischen SUB_AUFGABE_*.md. Konsistent.
- **Sequenzkontext:** Jedes Material dokumentierte Vorgaenger, Nachfolger, eingefuehrte und noch nicht eingefuehrte Begriffe. Kein Vorgriff auf spaetere Materialien.

### 6.2 Auffaelligkeiten im Denkprozess

- **mat-2-1 Wortlimit-Konflikt:** Agent erkannte Widerspruch zwischen Q1 (≤150 W, SUB_MATERIAL_DT) und DT-5 (200-300 W, QUALITAETSKRITERIEN). Entschied sich korrekt fuer das spezifischere Dokument (SUB_MATERIAL_DT). Zeigt: Vertragshierarchie funktioniert, aber Inkonsistenz sollte bereinigt werden.
- **mat-2-2 Titel-Typ-Entscheidung:** Agent wahlte MQ2 Typ A (Frage-Titel) fuer Erarbeitungs-Bildquelle, Typ B (Statement) fuer visuellen Anker (mat-2-3). Begruendung im Transkript nachvollziehbar.
- **aufgabe-2-2 Zuordnung 4:1-Asymmetrie:** Agent ueberlegte mehrere Ansaetze (Konzept-Definition vs. Kategorisierung), entschied sich fuer die Kategorisierung mit 4 Ursachen vs. 1 Ausloeser. Begruendung: Asymmetrie spiegelt das didaktische Verhaeltnis wider. Paedagogisch sinnvoll.
- **aufgabe-2-3 Anti-Pattern Datumsangaben:** Agent entfernte bewusst Datumsangaben aus Reihenfolge-Elementen, um kausale Logik statt chronologisches Auswendiglernen zu erzwingen. Vertragsgemaess (A4-RF Anti-Pattern).
- **WORKFLOW-Read fuer Uebergabe-Format:** Agent las WORKFLOW_v4.md (~7.000 Token) nur um das Uebergabe-Format zu bestimmen. Hinweis: Das Format sollte im ORCHESTRATOR oder im Vertrag stehen, nicht im WORKFLOW.

---

## 7. Optimierungskandidaten

### OPT-1: WORKFLOW-Read am Phase-2-Abschluss eliminieren (TOKEN)

**Problem:** Agent liest ~7.000 Token WORKFLOW_v4.md nur fuer Uebergabe-Prompt-Format.
**Loesung:** Uebergabe-Format in ORCHESTRATOR.md Phase-2-Abschluss-Sektion definieren oder als eigenen Vertrag VERTRAG_PHASE_2-ABSCHLUSS.md extrahieren (~200 Token).
**Einsparung:** ~6.800 Token pro Mappe.

### OPT-2: ARTEFAKT_INVENTAR pro Mappe befuellen (INFRASTRUKTUR)

**Problem:** Nur Mappe-1-Eintraege vorhanden. Agent muss Fallback-Quellen suchen.
**Loesung:** Phase 0.2 (AGENT_INHALT) erweitern: ARTEFAKT_INVENTAR wird fuer alle Mappen auf einmal befuellt, nicht nur fuer Mappe 1. Alternativ: In Phase 1 (AGENT_MATERIAL, Design-Modus) die Mappe-spezifischen Eintraege nachpflegen.

### OPT-3: Bild-Download direkt per API (PHASE 3)

**Problem:** Direkte Thumbnail-URL-Konstruktion schlaegt fehl (404). API-Fallback funktioniert, kostet aber einen Extra-Schritt.
**Loesung:** In UEBERGABE_PROMPT oder WORKFLOW Phase 3.1 dokumentieren: "Verwende immer Wikimedia Commons API fuer Thumbnail-URLs. Konstruiere keine URLs direkt."

### OPT-4: Uebergabe-Prompt mit cd-Anweisung (PHASE 3)

**Problem:** Claude Code startet in falschem Verzeichnis (Worktree).
**Loesung:** Erste Zeile des Uebergabe-Prompts: `cd [absoluter Pfad zum Repo]`. Im ORCHESTRATOR Phase-2-Abschluss als Pflichtbestandteil definieren.

### OPT-5: Git-Commit-Befehle als Pflicht-Output (PHASE 2)

**Problem:** User muss manuell committen. Kein standardisierter Befehlssatz.
**Loesung:** Phase-2-Abschluss generiert neben UEBERGABE_PROMPT auch einen Git-Befehlsblock (git add [alle Dateien], git commit -m "[standardisierte Nachricht]", git push). Der User kopiert und fuehrt aus.

### OPT-6: Wortlimit-Inkonsistenz bereinigen (QUALITAET)

**Problem:** SUB_MATERIAL_DT Q1 sagt ≤150 W, QUALITAETSKRITERIEN DT-5 sagt 200-300 W.
**Loesung:** Einen der beiden Werte anpassen. Empfehlung: SUB_MATERIAL_DT als autoritativ festlegen (≤150 W), QUALITAETSKRITERIEN entsprechend aktualisieren.

### OPT-7: Pre-Flight-Checkliste in Phase 3.0 formalisieren (PHASE 3)

**Problem:** Mehrere Pruefschritte (Dateizaehlung, tafelbild.json-Existenz, JSON-Validierung) wurden ad hoc durchgefuehrt.
**Loesung:** Standardisierte Pre-Flight-Checkliste im Uebergabe-Prompt: (1) cd zum Repo, (2) git pull, (3) ls rahmen/ === 4 Dateien, (4) ls materialien/ === N Dateien, (5) ls aufgaben/ === M Dateien, (6) JSON-Validierung aller Dateien.

### OPT-8: Session-2 ORCHESTRATOR-Re-Read reduzieren (TOKEN)

**Problem:** Nach Session-Split wird ORCHESTRATOR.md komplett neu gelesen (~2.500 Token), obwohl Session 2 nur Phase 2.2 benoetigt.
**Loesung:** Fortsetzungs-Prompt enthaelt die relevanten ORCHESTRATOR-Auszuege inline (Phase 2.2 Dispatch-Sequenz, ~300 Token). Vollstaendiger Re-Read nur bei Unklarheiten.

---

## 8. Gesamtbewertung

### Was funktioniert

1. **Vertrags-Extraktion:** Agent liest Vertraege statt WORKFLOW. Token-Overhead pro Dispatch auf ~400-650 reduziert.
2. **Dispatch-Isolation:** Jedes Material und jede Aufgabe als eigener Dispatch. Keine Batch-Kontaminierung.
3. **Q-Gate-Persistierung:** Q-GATE-LOG.md existiert und wird kontinuierlich aktualisiert. Auditierbar.
4. **Session-Split:** Funktioniert ohne Informationsverlust. Compaction-Risiko eliminiert.
5. **Phase-2/3-Trennung:** Uebergabe-Prompt als Schnittstelle. Claude Code assembliert, Cowork produziert.
6. **TB-FREEZE:** Wird respektiert. SCPL-Daten unveraendert durchgereicht.
7. **Artefaktqualitaet:** Alle Q-Gates PASS. Didaktische Kohaerenz hoch.

### Was verbleibt

1. **Git-Roundtrip-Reibung:** Cowork → manueller Commit → Claude Code. Funktional, aber fragil.
2. **ARTEFAKT_INVENTAR-Luecke:** Mappe 2 nicht abgedeckt. Kein Blocker, aber Vertragsverletzung.
3. **WORKFLOW-Read am Ende:** 7.000 Token fuer Uebergabe-Format. Leicht eliminierbar (OPT-1).
4. **Worktree-Verwirrung:** Claude Code startet im falschen Verzeichnis. Leicht behebbar (OPT-4).
5. **Wortlimit-Inkonsistenz:** SUB_MATERIAL vs. QUALITAETSKRITERIEN. Bereinigung noetig (OPT-6).

### Fazit

Runde 3b bestaetigt: Die v4-Produktionsarchitektur mit Vertrags-Extraktion, Dispatch-Isolation und Session-Split ist **produktionsreif**. Alle 8 HIGH/MEDIUM-Befunde aus Runde 3a sind behoben. Die 5 neuen Befunde betreffen operationale Reibung (Git, Worktree) und Infrastruktur-Luecken (ARTEFAKT_INVENTAR), nicht die Kernarchitektur. Die 8 Optimierungskandidaten sind inkrementelle Verbesserungen, keine Voraussetzungen fuer die naechste Produktion.
