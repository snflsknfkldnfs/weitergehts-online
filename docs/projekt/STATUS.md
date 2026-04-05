# Projektstatus: Interaktive Unterrichtsmaterialien -- weitergehts.online

**Letzte Aktualisierung:** 2026-04-05 (Session 10 Forts. 11, Phase III.5 Pre-Implementation-Risiko-Audit verankert)
**Aktuelle Phase:** **D15b-Optimierung Phase III.5 AKTIV (Pre-Implementation-Risiko-Audit). Ausfuehrungsplan + State-File angelegt. 5 Sub-Phasen (5a-5e), 6 Risiko-Auditoren, Zwei-Meinungen-Prinzip (manuell + comprehensive-review:full-review). Phase IV blockiert bis Abschluss III.5e.**
**Letzter Arbeitsschritt:** Phase III Evaluations-Runde: User hat die 25 Strategien durchevaluiert und 12 gezielte Rueckmeldungen gegeben. Umgesetzt in `D15B_OPTIMIERUNGS_STRATEGIEN.md`: (1) **4 STR gestrichen**: STR-07 Spatial-Contiguity (R4-Befund war Audit-Fehlannahme, keine Mobile-Probleme), STR-10 DaZ-System (aufgegangen in STR-09-NEU), STR-16 Lehrprobe (out of infrastructure scope), STR-18 Metakognition (out of scope). (2) **2 STR strukturell ersetzt**: STR-09 Tracks A/B/C → STR-09-NEU Differenzierungs-Exit-Architektur (Hover-Glossar + Clipboard-KI-Prompts, Status: Folgeprojekt ausserhalb Phase IV nach Stabilitaet der Kerninfrastruktur); STR-14 Meta-Reflexion → STR-14-NEU Fiktionalitaets-Kennzeichnung direkt in der Quellenangabe (kein Overhead-Aufgabentyp). (3) **4 STR abgeschwaecht/praezisiert**: STR-06 Zeit von hartem Gate auf weiche Orientierungsgroesse "1 Mappe ≈ 1 UE" (Budgets/OTL/Ablaufplaene entfernt, Aufwand L→S); STR-08 Quellenkritik von starrer Pflicht auf adaptive Entscheidung durch Progressionsplan-Agent; STR-11 Typologie-Erweiterung mit expliziter Anti-Quota-Klausel (verfuegbar, nicht quotiert); STR-12 Trigger-System mit Sichtbarkeits-Constraint (ausschliesslich Lehrkraft-Metadaten, NIE SuS-sichtbar). (4) **STR-13 umgebaut (Variante a)**: Reflexion raus aus Hefteintrag (bleibt reine Wissenssicherung), stattdessen neue statische Mappenabschluss-Zone mit fixem Template (1-2 Reflexionsfragen + Ueberleitungssatz), Assembly-Sub-Task. Zusaetzlicher Cleanup-Auftrag: Mappe-4-Mappenabschlussbereich praezise aufraeumen. (5) **STR-24 ergaenzt**: Abschnitt "Verhaeltnis zu E5 Gueteregel-Katalogen" — Checkliste ist komplementaeres Pre-Publish-Q-Gate auf Mappen-Ebene, nicht Ersatz der prozess-immanenten Kataloge. (6) **DAG und Waves neu gezeichnet**: Aufwandsschaetzung 7-9 Sessions Voll / 5-6 Sessions Kern (statt 10-12 / 6-7).
**Naechster Schritt:** **Phase III.5 Sub-Phase 5a starten** — zuerst Verifikations-Test von `agent-teams:team-spawn` mit 1 Dummy-Agent, danach 6 Rollen-Charten (RA1-RA6) + 6 Evidenz-Bundles anlegen. Quelle der Wahrheit fuer Fortschritt: `docs/projekt/D15B_PHASE_III_5_AUDIT_STATE.md`. Methodik + Tool-Matrix: `docs/projekt/AUSFUEHRUNGSPLAN_D15B_PHASE_III_5_RISIKO_AUDIT.md`. Die 4 Entscheidungspunkte fuer Phase IV (Scope-Cut, Engine-Session-Schnitt, Re-Audit-Scope, Mappe-4/5-Strategie) bleiben offen und werden durch Phase-III.5-Ergebnisse informiert.
**Offene Blocker:** quellenangaben[] Engine-Support fehlt (Workaround: cite-Einbettung). Flowcharts (mermaid) veraltet. ARTEFAKT_INVENTAR Mappe 2+3 nachpflegen. Engine-Erweiterungen O3/O5/O6 (Ordnungsmuster-Rendering, Pfeiltypen, Farbsemantik) als Stretch-Goal.

**Abgeschlossen seit letztem Update:**
- D15b-Optimierung Phase III.5 Verankerung (Session 10 Forts. 11):
  - `AUSFUEHRUNGSPLAN_D15B_PHASE_III_5_RISIKO_AUDIT.md` angelegt: 5 Sub-Phasen (5a Charten+Bundles, 5b Struktur-Audits RA1/RA2/RA6, 5c Tiefen-Audits RA3/RA4/RA5, 5d Verifikations-Gate, 5e Synthese+Zweitmeinung), 6 Risiko-Auditor-Rollen, P1-P6 Architektur-Prinzipien (Rollen-Isolation, Artefakt-Checkpoints, State-File-SSOT, Uebergabe-Prompts, Zwei-Meinungen, Verifikations-Gate).
  - Methodische Qualifizierung: Tool-Matrix pro Sub-Phase (llm-application-dev:prompt-engineering-patterns + prompt-optimize + ADR-Skill fuer 5a; agent-teams:team-spawn + multi-reviewer-patterns + mermaid-validator fuer 5b; comprehensive-review:code-reviewer (RA3) + architect-review (RA4) + plugin-eval:evaluation-methodology (RA5) fuer 5c; general-purpose Agent isoliert + comprehensive-review:full-review als Zweitmeinung + ADR fuer 5e). Explizite Negativliste (full-stack-orchestration, langchain-agent, rag, team-debug).
  - `D15B_PHASE_III_5_AUDIT_STATE.md` angelegt: Single Source of Truth fuer Sub-Phasen-Fortschritt, Artefakt-Register, RA-Bericht-Verifikations-Status, Resilience-Protokoll.
  - User-Entscheidungen verankert: (1) team-spawn + manuelle RA3/RA4/RA5-Konfiguration, (2) nach manuellem Audit zweiter Durchlauf mit comprehensive-review:full-review als Zweitmeinung, (3) Verifikations-Test von team-spawn mit 1 Dummy-Agent vor 5b.
- D15b-Optimierung Phase III Evaluations-Runde (Session 10 Forts. 11):
  - User-Evaluation der 25 Strategien mit 12 gezielten Rueckmeldungen.
  - 4 STR gestrichen (STR-07/10/16/18), 2 strukturell ersetzt (STR-09-NEU Exit-Architektur als Folgeprojekt; STR-14-NEU Fiktionalitaets-Kennzeichnung), 4 abgeschwaecht (STR-06/08/11/12), STR-13 umgebaut auf statische Mappenabschluss-Zone + Mappe-4-Cleanup, STR-24 um "Verhaeltnis zu E5-Katalogen" ergaenzt.
  - DAG neu, Waves neu, Aufwandsschaetzung 7-9 / 5-6 Sessions (statt 10-12 / 6-7).
  - STR-09-NEU dokumentiert als Folgeprojekt ausserhalb Phase IV.
  - 4 Entscheidungspunkte verbleiben offen (Scope-Cut, Engine-Session-Schnitt, Re-Audit-Scope, Mappe-4/5-Strategie).
- D15b-Optimierung Phase III (Session 10 Forts. 10):
  - `D15B_OPTIMIERUNGS_STRATEGIEN.md` von Template zur Vollbefuellung: 25 Strategien STR-01 bis STR-25.
  - STR-01 als Meta-Fundament (Tiefenstruktur-Refactor der 6 Gueteregel-Kataloge); Wave 0.
  - 6 ATOM-UNIT-Strategien mit E1↔E3-Kopplung kodifiziert (STR-02/03/04/08/09/11).
  - Wave 3 Engine-Session bundelt alle Frontend-Patches (STR-03/04/07/09/10 Engine-Teile + STR-20 A11y).
  - STR-24 konsolidiert alle E6-Checklisten-Anteile in einer Post-Publish-Checkliste.
  - STR-25 C2-Cross-Reference als Vorlauf vor Phase IV, kein Register-Merge.
  - DAG + 8 Execution-Waves. Parallelitaet: Wave 3 + Wave 6 koennen parallel zu Wave 1+2 laufen.
  - Aufwands-Schaetzung: 10-12 Sessions Voll / 6-7 Sessions P0+P1-Kern.
  - 4 Entscheidungspunkte fuer User-Freigabe formuliert.
- D15b-Optimierung Phase II (Session 10 Forts. 9):
  - `D15B_IMPLIKATIONS_MATRIX.md` vom Scaffold zur gefuellten Matrix umgebaut. 23 Netto-Cluster aus Phase I auf E0-E9 gemappt, jede Zelle A/M/D/E + Kurzskizze.
  - Hotspot-Analyse verifiziert: E5 ist Mega-Hotspot (20/23), gefolgt von E3/E6 (9), E1 (8), E7/E8 (6), E2/E9 (5), E0/E4 (1-2).
  - Zwei nicht-offensichtliche Erkenntnisse kodifiziert: (a) E1↔E3-Kopplung als harte Sequenzierungs-Regel fuer Phase III; (b) K13 Tiefenstruktur-Refactor als Meta-Patch, nicht als gleichrangiger Cluster.
  - Verdichtung: 23 Cluster → 6 strategische Bundle-Zonen. Das reduziert die Phase-III-Entscheidungslast erheblich.
  - STATUS.md + CHANGELOG.md aktualisiert.
- D15b-Optimierung Phase I (Session 10 Forts. 8):
  - Phase I.1 Parallel-Extraktion: 6 Subagenten, einer pro Audit-Datei R1-R6, ohne Kreuz-Kontamination. Ausgabe: 94 Rollen-Befunde mit Titel/Kernaussage/Evidenz/Objekt/Richtung/Severitaet/Verallgemeinerbarkeit/Konvergenz-Bezug.
  - Phase I.2 Konsolidierung: D15B_BEFUND_REGISTER.md Teil 2 mit strukturierten Tabellen pro Rolle ersetzt (Platzhalter raus, 94 Befunde rein). Gesamt 114 Eintraege.
  - Phase I.3 Cluster-Qualifizierung: 36 Cluster K01-K36 gebildet, pro Cluster Verdikt (accept P0/P1/P2, modify, reject, defer) mit Begruendung und Infrastruktur-Ebenen-Verweis. Netto-Optimierungs-Portfolio: 23 Cluster.
  - Phase I.4 Statistik: Befund-Statistik, Cluster-Bilanz, Severitaets-Verteilung, Verallgemeinerbarkeits-Verteilung in Teil 4 ergaenzt.
  - Erkenntnis: R4 und R6 (Theoretiker) und R2/R3/R5 (Praktiker) konvergieren ueberraschend stark auf K01 (Bloom-Tiefe) und K02 (Feedback-Qualitaet). Dissens D1 (Personalisierung Friedrich-Tagebuch) wird als parametrisierte Entscheidung aufgeloest (Personalisierung bleibt, mit Pflicht-Meta-Reflexions-Aufgabe). R3 liefert 4 positive Staerke-Befunde, die in Phase III als "Do-not-break"-Schutzregeln kodifiziert werden (K32).
- D15b Multi-Agent-Audit Mappe 4 (Session 10 Forts. 6):
  - Phase 1: D15b_EVIDENZ_BUNDLE_MAPPE4.md — Hauptoberflaeche via Chrome MCP erfasst, tipps/feedback via Backend-Extraktion (data.json + escape-engine.js) rekonstruiert. Anhang A (21 Tipps verbatim), Anhang B (Feedback-Tabelle), Anhang C (Loesungswort-Mechanik: collective unlock von "MARNE"-Pool via _aktiviereLoesungswort, kein 1:1 Aufgabe->Buchstabe-Mapping).
  - Phase 2: 6 isolierte Rollen-Agenten, jeder ohne Session-Kontext/Priming gespawnt, jeweils Chrome-MCP-Live-Zugriff + Evidenz-Bundle + maximal professionalisierte Rollen-Charta:
    - R1 Geschichtsdidaktik (Prof. Dr. Forstner, W3): Verdikt "einsetzbar mit Einschraenkungen". Kritisch: deutschzentriert, Multiperspektivitaet fehlt, keine Quellenkritik, 2/7 Pandel-Dimensionen, Fragekompetenz absent.
    - R2 Stadtrealschule/DaZ (Kilic): "Ja, mit Vorbereitung". Unique findings: DaZ-Glossar-Box fehlt, iPad-Touch-Ergonomie, Trigger-Sensitivitaet Kriegsgebiets-Familien.
    - R3 Landrealschule/bildungsfern (Hellermann): Personas Lars/Mandy/Olena/Tobias, Plan-B-Kultur, alte Laptops.
    - R4 Instructional Design (Dr. Raithel): "tragfaehig mit Nachschaerfungen". Split-Attention, engine-generic feedback d~0.20-0.30 vs. Ziel 0.70, ICAP 6/7 Active only.
    - R5 Seminarleiter Bayern (Kaltenbrunner): "fuer Lehrprobe empfehlbar mit Ergaenzungen". Doppelstunde noetig, 7/10 Meyer-Kriterien, Tagebuch hervorragend.
    - R6 Unterrichtsqualitaet empirisch (Prof. Dr. Heidacker): MITTEL, ~40-50% unter High-Quality-Benchmark. d~0.35-0.50 post, d~0.10-0.20 transfer, Bloom 1-3 in 6/7 Aufgaben, OTL ~20% vs. Ziel 30-40%.
  - Phase 3: D15b_MULTI_AUDIT_SYNTHESE_MAPPE4.md — neutraler Synthese-Agent, 11 Abschnitte + Anhang A Zitat-Register. Konvergenz: Klasse A (Sachkorrektheit 6/6, Elaborations-Luecke 6/6, DaZ-Luecke 4-6/6), Klasse B (Feedback schwach 4/6, Differenzierung 4/6, Motivation 4/6), Klasse C (Epistemologie 3:3), Klasse D (Digitalisierung 2:4, Tagebuch 3:3), Klasse F (Barrierefreiheit/Datenschutz/technische Robustheit ungeprueft). Top-10 Empfehlungen mit Aufwand/Wirkung. 3 Umsetzungs-Szenarien (Konservativ/Moderat/Optimistisch). QM-Rueckschluesse fuer Subagenten-Prompts.
  - Artefakte (8 Dateien): D15b_EVIDENZ_BUNDLE_MAPPE4.md, D15b_AUDIT_R1_GESCHICHTSDIDAKTIK.md (40 KB), D15b_AUDIT_R2_LEHRERIN_STADT.md (52 KB), D15b_AUDIT_R3_LEHRERIN_LAND.md (40 KB), D15b_AUDIT_R4_INSTRUCTIONAL_DESIGN.md (31 KB), D15b_AUDIT_R5_SEMINARLEITER.md (27 KB), D15b_AUDIT_R6_UNTERRICHTSQUALITAET.md (38 KB), D15b_MULTI_AUDIT_SYNTHESE_MAPPE4.md (45 KB).
  - Methodik-Innovation: Vollstaendige Rollen-Isolation (jeder Agent ohne Vorwissen), Text-Primat ueber Screenshots (Chrome-in-Claude-Overlay-Workaround), Inter-Rater-Reliability gewichtet nach theoretischer vs. praktischer Distanz.
- Infrastruktur-Patches Prioritaet 1 (Session 10):
  - IL-1 Patch: Python-JSON-Validierung als PFLICHT-Schritt nach Fertigstellung in alle 5 SUB_AUFGABE_*.md eingefuegt (MC, FREITEXT, LUECKENTEXT, REIHENFOLGE, ZUORDNUNG). Kein Rueckgabe-Output ohne erfolgreichen `python3 -c "import json; json.load(...)"`-Lauf. Schliesst root cause des C2-HIGH-Findings P6-F1 (asymmetrische Durchsetzung: Material ja, Aufgaben nein).
  - IL-4 Patch: Session-Split-Prompt nach Phase 2.1c als PFLICHT v4.0 in ORCHESTRATOR.md. Zwei Stellen: (a) CHECKPOINT-Markierung in Phase-2-Diagramm mit expliziter PFLICHT-Kennzeichnung, (b) Session-Split-Template-Sektion mit Durchsetzungs-Mechanismus. Split darf nicht mehr token-basiert sondern muss phasen-basiert ausgeloest werden. Adressiert C2-MEDIUM-Finding P4-F1.
- C2 Evaluation + Go/No-Go (Session 10):
  - C2_EVALUATION_MAPPE4.md: Gesamtsynthese ueber alle 8 Dimensionen, B1-B10-Regressionstest, Mappe-3-vs-Mappe-4-Vergleich, Infrastruktur-Empfehlungen, D15-Risikoanalyse.
  - Entscheidung: GO fuer D15 Browser-Validierung. Pipeline PRODUKTIONSREIF. Keine Eskalation zu Option A.
  - 13 C2-Analyse-Dokumente erstellt (Rahmen, 5 Verlaufsprotokolle, Gesamtprotokoll, Automated Checks, D1-Audit, D2-Audit, D3-D8-Audit, Evaluation).
  - Konsolidiertes Finding-Register: 21 Findings (1 HIGH behoben, 3 MEDIUM, 9 LOW, 8 INFO).
  - 5 Infrastruktur-Luecken identifiziert, priorisiert: IL-1 (Python-Validierung Aufgaben) + IL-4 (Session-Split-Prompt PFLICHT) als Prioritaet 1 vor Mappe-5.
- C2-Vorbereitung (Session 9):
  - P3 Engine-Patch v3.9 ausgefuehrt: Teilfragen-Rendering (_meta.teilfragen → sichtbare Aufzaehlung vor Textarea). 22 Zeilen JS + 31 Zeilen CSS. Cache-Busting ?v=3.9 auf 5 HTML-Dateien. Commit 5bf49ce, gemergt in 67c222b.
  - TAFELBILD_gpg-erster-weltkrieg-ursachen_Mappe4.md erstellt (Phase 0.4). Ordnungsmuster: sequenziell. 6 TB-Knoten (k4-1 bis k4-6). 3 Kernerkenntnisse. Q-Gate G1-G14 PASS.
  - DISPATCH_SKRIPT_MAPPE4.md erstellt: 15 Dispatches (D-1 bis D15), Phase 1-4, Session-Split-Punkte, Testbedingungen (kein PM-Eingriff, kein Kopieren von Mappe-3-Artefakten), Erfolgskriterien (0 wiederkehrende B1-B10 Findings).
- C1c Produktionsreife-Audit + Pre-C2-Patches (Session 9):
  - Audit: 3 Dimensionen (Technische Kohaerenz, Didaktische Kalibrierung, Engine-Schema), 3 parallele Reviewer, PM-Konsolidierung. Ergebnis: PATCH-THEN-PROCEED, 0 Blocker nach PM-Verifikation (4 Reviewer-BLOCKER als FALSE POSITIVE / LEGACY-ONLY downgraded).
  - P1: SUB_AUFGABE_FREITEXT.md — Zwei-Ebenen-Modell (loesung[] = Minimum-Keywords, _meta.erwartete_begriffe = Gesamt-Set). Engine-ALL-or-nothing-Logik dokumentiert.
  - P2: AGENT_HEFTEINTRAG.md + VERTRAG_PHASE_2-0 — Knoten-Elaborierungs-PFLICHT (v3.5): merksatz fuer Fachbegriffe ausserhalb R7-Wortschatz. k3-6 merksatz retroaktiv in data.json.
  - P3: UEBERGABE_v3-9_TEILFRAGEN_RENDERING.md — Engine-Patch fuer _meta.teilfragen-Rendering (JS+CSS). Noch nicht ausgefuehrt.
  - Artefakte: AUDIT_PRE_C2_ERGEBNIS.md, UEBERGABE_v3-9_TEILFRAGEN_RENDERING.md
- Mappe-3-Daten-Nachpatch D2+D3 (Session 9):
  - D2 aufgabe-3-4: "Welche Aussage erklaert den Widerspruch zwischen Foto und Quellen?" → "Warum zeigt das Foto Jubel und »Ausflug nach Paris«, aber die Quellen berichten von weinenden Muettern?"
  - D2 aufgabe-3-6: "Ordne die Aussagen den Perspektiven zu." → "Ordne die Zitate aus den Quellen und Tagebuechern den Haltungen Begeisterung, Angst und Pflicht zu."
  - D3a kontextsatz: "Buendnisse machen aus einem Mord einen Weltkrieg" (Mappe-2-Rekap) → "August 1914: Die Mobilmachung beginnt. Millionen Soldaten ziehen in den Krieg." (autonom)
  - D3b Burgfrieden: Konzept elaboriert ("alle Parteien stehen zusammen, das nennt man Burgfrieden")
  - D3c Ordnungsmuster: Gegenueberstellung explizit ("Die eine Seite" / "Die andere Seite") in SCPL-Complication-Schritten
  - D2-Infrastruktur: A2b Inhaltliche Verankerung als PFLICHT-Q-Gate-Pruefschritt in alle 5 SUB_AUFGABE_*.md eingetragen (mit FAIL/PASS-Beispielen und Pruefmethode)
- Engine v3.6c (Drag & Drop Antwortpool) — Browser-PASS:
  - v3.6: Engine-Patch _renderLueckentext erkennt antwortpool, rendert klickbare Pool-Buttons + Pool-kompatible Validierung.
  - v3.6b: Drag & Drop statt Click. Pool unterhalb Lueckentext. Luecken als Inline-Elemente (kein Lesefluss-Bruch).
  - v3.6c: Kontrast-Fix (explizite helle Farben, kein --color-primary-light). Label entfernt. Cache-Busting ?v=3.6c auf 8 HTML-Dateien.
  - data.json: antwortpool fuer alle 4 LT-Aufgaben (Mappe 1-3) mit N+1 Distraktoren.
  - SUB_AUFGABE_LUECKENTEXT: Rendering-Kontrakt v3.6b, visuelle PFLICHT-Constraints.
  - Architektur-Regel installiert: Cache-Busting bei jedem Asset-Update PFLICHT (Memory + COWORK_PROJECT_ANLEITUNG).
- Browser-Review Mappe 3 → 5 Architektur-Patches (D1-D3c):
  - D1: Antwortpool-Pflicht fuer Lueckentexte (N+1 Begriffe, sichtbar). SUB_AUFGABE_LUECKENTEXT + A4-LT. Engine-Aenderung noetig.
  - D2: Inhaltliche Verankerung aller Fragestellungen (konkretes Element statt Metasprache). A2 + AGENT_RAETSEL + alle 5 SUB_AUFGABE_*.md.
  - D3a: S-Zone-Autonomie (kein Vormappe-Wissen im Kontextsatz). VERTRAG_PHASE_2-0 + HE17.
  - D3b: Konzept-Elaborierung (komplexe Knoten brauchen Erklaerung). HE18.
  - D3c: Ordnungsmuster-Templates (Muster steuert SCPL-Textstruktur). VERTRAG_PHASE_2-0 + G15.
  - 12 Dateien gepatcht, 0 Engine-Dateien (Engine-Patch D1 als separater Claude-Code-Dispatch).
- Phase C1 Mappe-3-Hybrid-Patch (4 Stufen):
  - Stufe 1: 6 mechanische Patches auf mat-3-4, mat-3-5, einstieg, sicherung, hefteintrag (Encoding, Quellenangaben, Einleitungen, Hefteintrag v2). Alle JSON-validiert.
  - Stufe 2: PROGRESSIONSPLAN_v2.md + 7 Aufgaben (aufgabe-3-1..3-7) neu generiert. v1-Aufgaben archiviert nach _v1_archiv/. Zentrale Verbesserungen: mat-3-2/mat-3-3 als Primaerquelle (A18), RF-Typ eliminiert (B8), SCPL-Zonen explizit (A16/A17).
  - Stufe 3: data.json Assembly per Python-Skript. 7 Aufgaben + 5 Materialien + Hefteintrag v2 integriert.
  - Stufe 4: Q-Gate A1-A18: 25/25 PASS. C1_EVALUATION_MAPPE3.md mit 7 Learnings (L1-L7).
  - Artefakte: Q_GATE_A1_A18_MAPPE3_v2.md, C1_EVALUATION_MAPPE3.md, PROGRESSIONSPLAN_v2.md
- Infrastruktur-Revision verankert:
  - GRUNDSATZENTSCHEIDUNG_REBUILD_VS_ITERATE.md §10: Post-Mappe-3 Empirische Ergebnisse. 11 Findings, 7 wiederkehrend. Revidierte Entscheidung: C+ + Infrastruktur-Revision.
  - AUSFUEHRUNGSPLAN_INFRASTRUKTUR_REVISION.md (NEU): 3 Phasen (A: 7 Patches 4-6h, B: 2 Architektur-Revisionen 6-10h, C: Daten-Patch + Mappe-4-Validierung 2-4h).
  - AUSFUEHRUNGSPLAN_C_PLUS.md Schritt 9 finalisiert (DONE).
- Mappe 3 Produktion komplett (Phase 2→3→4):
  - Phase 3.3: mappe-3.html erstellt (aus Template, strukturell validiert).
  - Phase 4.1: Funktionstest 13/13 PASS.
  - Phase 4.2: WCAG-Audit 11/11 PASS, 2 Warnings.
  - Phase 4.3: User-Browser-Review: 11 Findings (B1-B11), Ursachen-Synthese, Daten-Patch-Tabelle in Q-GATE-LOG.md.
- DISPATCH_SKRIPT_MAPPE3_PHASE2.md erstellt:
  - Steuerungsdokument fuer Phase 2.1c-2.2c (8 Dispatches D0-D7).
  - Fortschritts-Tracker, Session-Split-Punkte, Metriken-Gesamttabelle mit Phase 2.1 Baseline.
  - agent-teams Multi-Review (P7) bei Phase 2.2b integriert. Abbruchkriterium definiert.
  - Ablage: docs/agents/artefakte/produktion/gpg-erster-weltkrieg-ursachen/mappe-3/DISPATCH_SKRIPT_MAPPE3_PHASE2.md
- Tool-Integrations-Roadmap (ENTSCHIEDEN):
  - Pool um P13 (WCAG-Audit), P14 (E2E-Testing), P15 (Prompt-Optimierung) erweitert.
  - 3 konkrete Integrationspunkte definiert: P7 bei Phase 2.2b, P13 bei Phase 4, P15 nach Mappe 3.
  - AUSFUEHRUNGSPLAN Schritt 8 + 9 um Tool-Integrationspunkte ergaenzt.
- C+ Schritt 8 Pipeline-Fazit (PROZESSTEST_MAPPE3_ERGEBNIS.md):
  - 8 Sektionen: Metriken, Fehlertypen-Vergleich, Q-Gate-Konsistenz, Didaktische Qualitaet, Findings, Nacharbeit, offene Punkte, Fazit.
  - Entscheidungsmatrix: Nacharbeit ~17 min (< 3h), 0 systemische Fehler → C+ FORTSETZEN.
  - AUSFUEHRUNGSPLAN_C_PLUS.md Schritte 7+8 als DONE markiert, Schritt 9 als TEILWEISE.
- C+ Schritt 7 Pipeline-Kette mat-3-3..3-5:
  - mat-3-3 (BQ, Truppentransport): Isolierter Subagent. Q-Gate GESAMT-PASS (0F, 1W BQ-3). P2-Fix bestaetigt (UTF-8 korrekt). k3-1 + k3-4 abgedeckt.
  - mat-3-4 (QT, Drei Stimmen): Erster Quellentext-Dispatch. 3 Originalzitate (Zweig, SPD Bremen, Haase). Q-Gate GESAMT-PASS (0F, 0W). k3-5 + k3-6 erstmals eingefuehrt. Dispatcher-Korrektur: Zweig "Tagebucheintrag" → "Erinnerungen".
  - mat-3-5 (TB, Zwei Welten): Erster Tagebuch-Dispatch. 2 fiktive Eintraege (Freiwilliger + Bauersfrau). Read-Step 8 aktiv (sicherung → Kernerkenntnisse). Q-Gate GESAMT-PASS (0F, 0W). Alle 3 Kernerkenntnisse transportiert. k3-1 + k3-4 + k3-5 abgedeckt.
  - Pipeline-Befunde: P2-Fix wirksam. P1 (ARTEFAKT_INVENTAR Mappe 3) weiterhin offen. P3 (BQ-3) weiterhin offen.
  - Mappe 3 Material-Bestand: 5/5 Materialien komplett (mat-3-1 DT, mat-3-2 BQ, mat-3-3 BQ, mat-3-4 QT, mat-3-5 TB).
- C+ Schritt 7 Pipeline-Test mat-3-2 (BQ): P2-Findings identifiziert + gefixt. P2 in allen 7 SUB_MATERIAL-Prompts korrigiert.
- C+ Schritt 7 (Test-Dispatch mat-3-1):
  - Phase 2.0 Rahmen Mappe 3: 3 JSON-Dateien (hefteintrag, einstieg, sicherung). 2 Schema-Fixes (multiperspektivisch, null zitat).
  - Decision-Tree Read-Steps 1-8: Alle 8 Schritte durchlaufen. Step 7+8 korrekt uebersprungen (ARTEFAKT_REFS leer, DIDAKT_FN=einstieg).
  - mat-3-1 produziert: DT, 115 Woerter, 3 Absaetze, TB-Knoten k3-1/k3-2/k3-3/k3-4 abgedeckt. Sequenz-Kohaerenz: k3-5/k3-6 korrekt gesperrt.
  - Q-Gate GESAMT-PASS: 17 Kriterien geprueft (SCHEMA-01 + MQ1/MQ2 + M1-M10 + DT-1 bis DT-6 + SQ-1 bis SQ-4). 1 WARN (M8). 0 FAIL.
  - Q-GATE-LOG.md fuer Mappe 3 angelegt.
- C+ Phase I komplett (Schritte 1-3):
  - Schritt 3: Decision-Tree in VERTRAG_PHASE_2-1. Read-Step 1b (Sequenzkontext). SCPL-Zone-Mapping. Walkthrough verifiziert.
  - Schritt 2: Q-GATE-MECHANIK.md. 6 Vertraege aktualisiert. Trockenlauf verifiziert.
  - Schritt 1: 5 JSON-Schemata. 3 Vertraege + 7 SUB_MATERIAL-Prompts aktualisiert.
- PM-Session 3: Grundsatzentscheidung Option C+.
- PM-Session 1+2: Plugin-Architektur-Evaluation.

**Zuvor abgeschlossen:**
- Runde 3b (Commit 0c0e1ee): Mappe 2 "Das Attentat von Sarajevo" live — 6 Materialien, 5 Aufgaben, 2 Bilder, Engine-Patch, mappe-2.html
- Runde 3a-Opt: 6 Vertrags-Dateien extrahiert, ORCHESTRATOR + WORKFLOW aktualisiert, TAFELBILD_Mappe2.md erstellt, Goldstandard-Rolle redefiniert
- Runde 3a-Eval: RUNDE_3a_ERGEBNIS.md — 8 Befunde, alle in 3a-Opt adressiert
- Runde 3a: Erster Prozesstest (1 Cowork-Session), RUNDE_3a_ERGEBNIS.md als Baseline

**Zuvor abgeschlossen:**
- v3.5d Bugfix (Commit bc5a208): 4 Fixes — Fehlversuche-System (eliminated-Optionen, globaler Counter, alle 5 Aufgabentypen), Material-Titel statt "M1.2", Tipp-used visuell, Loesungswort-Reveal+Animation
- v3.5c Bugfix (Commit 072cbfd): 5 Fixes — background-attachment:local, Material-Ref in Tipps, Loesungscode-Kaestchen, MC-Shuffle, Tipp-Pillen+Akkordeon
- v3.5b Bugfix (Commit a53c914): 8 Fixes — Material-Flag, Zentrierung, Blocksatz, Karo em-basiert, Nummer-Kreis, Interaktivitaet, Sicherung-Display
- v3.5 Layout-Redesign implementiert (Commit 9c6f7e7): 2/3-1/3 Grid, Notizbuch-Fragebogen, Lochrand, Architects Daughter, Material-Fortschritt, Aufgaben-Dots
- v3.5 Cowork-Vorbereitung: Design-Spec, HTML-Prototyp, Uebergabe-Prompt
- ORCHESTRATOR.md: Fehlende Q-Gate-Referenzen nachgetragen (A1-A18, SK1-SK15, S1-S15 in Referenz-Dokumente + Phase-2.2-Box)
- v3.3b Nachmigration SCPL-Umordnung (Commit 9df75cc): Material-Reihenfolge nach SCPL-Aufbau, Browser-Check bestanden
- v3.4 GUETEKRITERIEN_AUFGABEN.md (A1-A18): AFB-Kongruenz, Operator-Praezision, Distractor-Qualitaet, kognitive Aktivierung, Besinnungsphasen
- AGENT_RAETSEL.md: 2-Stufen-Q-Gate (prozedural + A1-A18 fachdidaktisch)
- WORKFLOW_v2.md Phase 2.2: Q-Gate mit Stufe 1 + Stufe 2
- v3.3 Material-Sequenzierung (Commit f87dd8b): Schema + Engine + Migration
- v3-4 Engine-Erweiterung (Commit a3ea44b): Merksaetze, Kernerkenntnisse, Hefteintrag, Reflexionsimpuls
- v3.1-3 Hefteintrag-Engine (Commit 71a5896): CSS-basierter SCPL-Renderer
- v3.2 Umlaut-Fix (Commit 2561066): UTF-8-Migration
- GUETEKRITERIEN_SEQUENZIERUNG.md v1.1: S14 SCPL-Korrespondenz + S15 Skript-Kongruenz als MUSS, 2-Anker-Verfahren in AGENT_MATERIAL
- GUETEKRITERIEN_SKRIPT.md v1: SK1-SK15 fachdidaktische Q-Gate-Ebene fuer Phase 0.3
- AGENT_SKRIPT.md: 2-Stufen-Q-Gate (Q1-Q13 operativ + SK1-SK15 fachdidaktisch)

---

## Architektur-Entscheidung: Prozessredesign v1 → v2 (2026-03-18)

### Ausloeser

Testmappe-v1.1-Versuch (Mappe 1 "Pulverfass Europa" mit neuen W-1 bis W-8 Workflows) abgebrochen nach Erkennung von 3 strukturellen Problemen:

1. **Token-Ineffizienz:** Recherche (WebSearch, markdownify) und Generierung in einem Cowork-Durchlauf uebersteigt Kontextlimits
2. **Fehlende inhaltliche Zielklarheit:** Kein kohaerentes Inhaltsgeruest zwischen DIDAKTIK-Rahmen und MATERIAL-Design — Tafelbild entsteht erst waehrend Design (Henne-Ei)
3. **Blinde Quellenrecherche:** wikimedia_search_images ohne Inhaltsanker liefert keine brauchbaren Ergebnisse

### Kerndiagnose

Vermischung der Agenten-Zustaendigkeiten: INHALT liefert Kernaussagen (Stichpunkte), DIDAKTIK liefert formalen Rahmen (KE-Matrix), aber niemand erzeugt ein **narrativ kohaerentes, schulernahes Inhaltsgeruest**. MATERIAL springt direkt in Materialtyp-Auswahl ohne narratives Rueckgrat.

### Entschiedene Aenderungen

| Aenderung | Alt (v1) | Neu (v2) |
|---|---|---|
| Inhaltsquelle | WebSearch + markdownify (blind) | Wikipedia-MCP als primaerer Anker (`get_article` → `get_sections` → `get_links`) |
| Inhaltsgeruest | Inhalts-MDs (Kernaussagen-Listen) | **SKRIPT-Artefakt**: linearer, schulernaher Text wie Jugendsachbuch |
| Neuer Agent | — | **AGENT_SKRIPT** (eigenstaendig, nach AGENT_INHALT) |
| Agenten-Reihenfolge | DIDAKTIK → INHALT parallel | DIDAKTIK → INHALT → SKRIPT (sequentiell) |
| Chunking | Implizit in Ebene 0 | Explizit durch AGENT_SKRIPT, entlang DIDAKTIK-Struktur |
| Materialproduktion | AGENT_MATERIAL monolithisch | materialerstellung-skill mit Subagenten pro Materialtyp (Scope offen) |
| Mappen-Erstellung | Alle Mappen in einem Durchlauf | Sequentiell: Mappe N fertig + validiert → Mappe N+1 |
| Bildrecherche | wikimedia blind | Wikipedia-Bilder als Anker → gezielte wikimedia-Suche |

### Neue Agenten-Sequenz (v2)

```
Phase 0: AGENT_DIDAKTIK → AGENT_INHALT → AGENT_SKRIPT
         Output: Gechunktes Skript (1 Chunk pro Mappe, inkl. Tafelbild-Entwurf)
         User-Validierung: PFLICHT

Phase 1: Pro Mappe sequentiell:
         AGENT_MATERIAL (Design) → User-Validierung
         → materialerstellung-skill (Subagenten) → AGENT_RAETSEL
         → AGENT_TECHNIK + DESIGN → User-Validierung
         → Naechste Mappe
```

### Offene Entscheidungen

- materialerstellung-skill: Claude Code Uebergabe-Prompt oder eigenstaendiger Cowork-Skill?
- Wird spaeter evaluiert basierend auf erstem Skript-Durchlauf

### Referenz-Dokumente

- Flowcharts: `docs/architektur/flowchart-status-quo.mermaid`, `docs/architektur/flowchart-neuausrichtung.mermaid`
- Workflow v2: `docs/architektur/WORKFLOW_v2.md` (kanonisch, mit MATERIAL_GERUEST-Template, Fallback-Pfad, Sandwich-Pruefpunkt)
- Audit-Ergebnis: `docs/analyse/AUDIT_PROZESSREDESIGN_V2_ERGEBNIS.md`
- Neuer Agent: `docs/agents/AGENT_SKRIPT.md`

---

## Audit-Entscheidung: Phase 2 Template-Engine (2026-03-13/14)

3 unabhaengige Audits der 8 Template-Engine-Dateien durchgefuehrt. 18 Fixes identifiziert, 16 umgesetzt, 2 bewusst belassen.

### Umgesetzte Fixes (Commit ddd0ab3)

| Prio | Fixes | Status |
|---|---|---|
| BLOCKER | FIX-01 (data.json loesung-Typ), FIX-02 (hardcoded "5"), FIX-03 (Lehrkraft Storage), FIX-04 (Inline-Styles), FIX-05 (Mappe-Kopier-Doku), FIX-06 (Fehlermeldung data.json) | Alle 6 behoben |
| SOLLTE | FIX-07 (Navigationslogik/ID-Konvention), FIX-08 (Lueckentext-Wortlimit), FIX-09 (Storage-Fehler-Feedback) | Alle 3 behoben |
| KANN | FIX-10 (base.css neutrale Defaults), FIX-11 (fadeIn-Duplikat), FIX-13 (Storage.clear scope), FIX-14 (ASCII-Umlaute), FIX-15 (Tippfehler), FIX-16 (Freitext exact-match) | Alle 6 behoben |
| KANN nach MVP | FIX-18 (Storage-Roundtrip) | Behoben |

### Bewusst belassen

| Fix | Grund |
|---|---|
| FIX-12 (Reihenfolge doppelter Text) | Nicht kritisch, UX-Entscheidung bei Pilottest evaluieren |
| FIX-17 (Passwort im Klartext) | Fuer MVP akzeptabel, kein didaktisch sensibles Material |

### Geaenderte Dateien (11)

`escape-engine.js`, `core.js`, `base.css`, `theme-gpg.css`, `lehrkraft.html`, `index.html`, `mappe-template.html`, `data.json`, `ORCHESTRATOR.md`, `AGENT_RAETSEL.md`, `AGENT_TECHNIK.md`

### Audit-Dokumentation

- `docs/AUDIT_Phase2_Template_Engine.md` — Erstaudit (13 Befunde)
- `docs/AUDIT_Phase2_Verifizierung.md` — Verifizierung + 5 Blindstellen
- `docs/FIXES_Phase2_Konsolidiert.md` — Konsolidierte Fix-Liste (18 Fixes, priorisiert)

---

## Audit-Entscheidung: Agenten-Architektur (2026-03-12)

Externes Audit aller 8 Agenten-Dateien (docs/) durchgeführt. Ergebnis: **NICHT bereit für Phase 2.** 2 Blocker, 5 High-Priority-Issues.

### Blocker

| # | Blocker | Beschreibung | Lösung |
|---|---|---|---|
| ~~B1~~ | ~~Zirkuläre Abhängigkeit Templates/Engine~~ | ~~AGENT_TECHNIK referenziert Template/Engine die nicht existierten~~ | **ERLEDIGT** (2026-03-13): Phase 2 Template-Engine erstellt. 8 Dateien unter assets/ und escape-games/template/. Commit 71ea9ca. |
| ~~B2~~ | ~~Inkonsistente Quellpfade~~ | ~~Pfade über Agenten hinweg uneinheitlich~~ | **ERLEDIGT** (2026-03-12): `docs/PFAD_MANIFEST.md` mit 30 verifizierten Pfaden, alle Agenten-MDs korrigiert |

### High Priority

| # | Issue | Beschreibung | Zuständig |
|---|---|---|---|
| ~~H1~~ | ~~data.json Tipps-Schema~~ | ~~Inkonsistenz String vs. Objekt~~ | **ERLEDIGT**: tipps als Objekte (stufe/text) in ORCHESTRATOR + AGENT_RAETSEL |
| ~~H2~~ | ~~Styling-Zuständigkeit~~ | ~~Überlappung TECHNIK/DESIGN~~ | **ERLEDIGT**: Abgrenzungstabelle in beiden Agenten (HTML-Struktur vs. CSS-Styling) |
| ~~H3~~ | ~~API-Signaturen~~ | ~~Parameter/Returns fehlten~~ | **ERLEDIGT**: 7 Signaturen mit Params + Return-Types in AGENT_TECHNIK |
| ~~H4~~ | ~~D&D zu komplex~~ | ~~zuordnung als Drag-and-Drop~~ | **ERLEDIGT**: Dropdown-Select für MVP, D&D als Post-MVP-Option |
| ~~H5~~ | ~~Medien-Workflow~~ | ~~Kein Prozess definiert~~ | **ERLEDIGT**: MVP = textbasiert + Unicode + CSS, Medien ab Post-MVP |

### Medium/Low (Backlog)

| # | Issue | Prio | Adressierung |
|---|---|---|---|
| M1 | AGENT_INHALT zu dünn (fehlende Output-Tiefe, kein Mapping Kernaussagen→Lernziele) | Mittel | Bei Agenten-Korrektur mitfixen |
| M2 | Kein min-type-spread für Aufgabenvielfalt | Mittel | AGENT_RAETSEL.md ergänzen |
| M3 | localStorage-Fortschrittsschema undefiniert | Mittel | ORCHESTRATOR.md oder AGENT_TECHNIK.md |
| M4 | Zeichenlimits für Texte fehlen | Niedrig | AGENT_RAETSEL.md |
| M5 | mappen_anzahl Bounds fehlen (3-6) | Niedrig | ORCHESTRATOR.md |
| M6 | Checkliste: DSGVO, Offline-Robustheit, Print, Zeitbudget fehlen | Niedrig | Checkliste_Interaktive_Materialien.md |
| M7 | Samsung Internet in Browsertest unnötig | Niedrig | AGENT_QUALITAET.md |

### Strategie

Blocker + High-Priority in einem Durchgang beheben (Übergabe-Prompt für Claude Code). Medium/Low bei Gelegenheit oder nach erstem Pilotlauf.

---

## Audit-Entscheidung: SKILL.md (2026-03-12, historisch)

Früheres Audit der SKILL.md. Strategie: MVP-Forward -- Gaps im Prozess schließen.

| Gap | Kritikalität | Adressierung |
|---|---|---|
| GPG ohne Didaktik-Artefakte | Kritisch | Phase 1: In AGENT_DIDAKTIK.md GPG-spezifische Kriterien mitentwickeln |
| Cowork↔Claude-Code-Interface informell | Kritisch | Ab sofort: Strukturierte Übergabe-Prompts (Kontext/Aufgabe/Erfolgskriterium/Rückmeldung) |
| Onboarding-Daten nicht operationalisiert | Kritisch | Phase 1: Mapping Erhebungsdaten→Agenten-Parameter definieren |
| Kein ROLLBACK-Modus | Sekundär | Bei Bedarf in Skill-Iteration ergänzen |
| STATUS mischt dynamisch/statisch | Sekundär | Bei Bedarf splitten |
| Kein Zeitbudget/Taxonomie im Onboarding | Sekundär | Phase 1: Bei Agent-Prompt-Erstellung evaluieren |
| Kein Feedback-Loop Unterricht→System | Sekundär | Phase 4: In Dokumentation integrieren |

---

## Schulkontext

| Merkmal | Wert |
|---|---|
| Schulart | Mittelschule |
| Bundesland | Bayern |
| Besonderheiten | Auen-Mittelschule Schweinfurt |

## Unterrichtete Fächer

| Fach | Klasse(n) | Priorität | Vorhandene Artefakte |
|---|---|---|---|
| GPG | 7b, 7c | MVP | Lehrplan-MDs, Fachprofil, Jahrgangsstufenprofil, Sequenzplanungen |
| WiB | 7b, 7c | Phase 2 | Umfangreiche Anleitungen (Qualitätskriterien, TUV, Methoden, Lernziele, Sequenzplanung) |
| Mathematik | 7c | Phase 2 | Lehrplan-MDs, Sequenzbeispiele |
| Sport | - | Später | Sequenzplanungs-Anleitungen |

## Lerngruppencharakteristika

### GPG 7b / 7c
- **Klassenstärke:** ~22 (heterogen)
- **Sprachniveau:** [NOCH ZU ERHEBEN]
- **Digital Literacy:** [NOCH ZU ERHEBEN]
- **Gewohnte Methoden:** [NOCH ZU ERHEBEN]
- **Besonderheiten:** [NOCH ZU ERHEBEN]

## Technische Rahmenbedingungen

| Merkmal | Status |
|---|---|
| Klassenraum-Ausstattung | [NOCH ZU ERHEBEN] |
| Schüler-Endgeräte | [NOCH ZU ERHEBEN] |
| WLAN | [NOCH ZU ERHEBEN] |
| Internetfilter | [NOCH ZU ERHEBEN] |

## Technischer Status Lehrkraft

| Merkmal | Status |
|---|---|
| GitHub-Account | Vorhanden (Username: snflsknfkldnfs), bestehende User-Site aktiv |
| Repository | `weitergehts-online` angelegt, 15 Dateien, Verzeichnisstruktur steht |
| GitHub Pages | Aktiv, Branch `main`, Custom Domain `weitergehts.online` eingetragen |
| HTTPS | Zertifikat pending (Let's Encrypt, automatisch) |
| Claude Code Erfahrung | Fortgeschritten (Cowork + Skills aktiv) |
| HTML/CSS/JS | [NOCH ZU ERHEBEN] |
| Domain/Hosting | weitergehts.online bei Namecheap, DNS auf GitHub Pages konfiguriert (A-Records + CNAME) |
| E-Mail | Zoho Mail aktiv (MX-Records + SPF konfiguriert, bleibt unberührt) |
