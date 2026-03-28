# Changelog: Interaktive Unterrichtsmaterialien -- weitergehts.online

Chronologisches Protokoll aller Arbeitsschritte. Neueste Einträge oben.

---

## 2026-03-28
### Phase v3-4: Uebergabe-Prompt Engine-Erweiterung formuliert
- **Phase:** v3-4 (Engine-Erweiterung)
- **Aufgabe:** Aenderungsbedarf fuer v3-Tafelbild-Features in Engine analysieren, Uebergabe-Prompt fuer Claude Code schreiben
- **Ergebnis:** Bestandsaufnahme escape-engine.js (Tafelbild-Renderer Z.965-1238, Sicherung-Renderer Z.910-950), theme-gpg.css (1055 Zeilen, Print Z.1031-1055), data.json Template + Testdaten. 4 Aenderungspakete definiert: (1) escape-engine.js: 4 neue Render-Bloecke in _renderSicherung() fuer merksatz, kernerkenntnisse, hefteintrag_verweis, reflexionsimpuls. (2) theme-gpg.css: Bildschirm-Styles + Print-Styles fuer neue Sicherungs-Elemente. (3) data.json Template: Schema um merksatz (Knoten), kernerkenntnisse (Tafelbild), hefteintrag_verweis + reflexionsimpuls (Sicherung). (4) Testdaten Mappe 1 mit Beispielwerten. Fallback-Logik fuer kernerkenntnisse (Sicherung- oder Tafelbild-Ebene) dokumentiert. Abwaertskompatibilitaet sichergestellt.
- **Artefakte:** `docs/uebergabe/UEBERGABE_v3-4_ENGINE_ERWEITERUNG.md` (neu), `docs/architektur/UPGRADE_PLAN_v3.md` (v3-4 Status aktualisiert), `docs/projekt/STATUS.md` (aktualisiert)
- **Naechster Schritt:** Prompt in Claude Code ausfuehren, dann Phase v3-5 (Validierung an Mappe 1)

### Audit-Remediation v3-3: 7 Findings behoben (CONDITIONAL GO → GO)
- **Phase:** v3-3 Audit-Remediation
- **Aufgabe:** Externen Audit-Report (27 Findings, 4 HIGH) evaluieren und valide Findings beheben
- **Ergebnis:** 7 Fixes: AGENT_MATERIAL Q-Gate Design-Modus: TB-Struktur-Checks durch TB-Abdeckungs-Checks ersetzt (#11/#12). W-8 "Iterieren bis Verifizierung bestanden" durch "[TB-REVISION NOETIG] markieren, an User eskalieren" ersetzt (#13). Abschnitt 2.4 JSON-Template: merksatz pro Knoten, kernerkenntnisse[], hefteintrag_verweis, reflexionsimpuls ergaenzt (#26). Output-Verweis von WORKFLOW_v1 Abschnitt 5 auf WORKFLOW_v2 (v3) Abschnitt 5 korrigiert (#15). WORKFLOW_v2.md: Abschnitt-Titel "v2" → "v3" (#2/#3). UPGRADE_PLAN Abschnitt 7: "WORKFLOW_v3.md NEU" → "WORKFLOW_v2.md (v3) IN-PLACE" (#1). 4 Findings als nicht-valide oder pre-existent eingestuft (#4/#5 ORCHESTRATOR Schema = Convenience-Abdruck, #14 V1-Kanonizitaet beabsichtigt, #21-23 ARTEFAKT-Luecke pre-existent).
- **Artefakte:** `docs/agents/AGENT_MATERIAL.md`, `docs/architektur/WORKFLOW_v2.md`, `docs/architektur/UPGRADE_PLAN_v3.md`, `docs/analyse/Audit-Report v3-3 — WORKFLOW + AGENT_MATERIAL + ORCHESTRATOR.md`, `docs/analyse/AUDIT_BRIEFING_v3-3.html`
- **Naechster Schritt:** Phase v3-4: Engine-Erweiterung (Claude Code)

## 2026-03-26
### Phase v3-3 abgeschlossen: WORKFLOW + AGENT_MATERIAL + ORCHESTRATOR auf v3-Pipeline aktualisiert
- **Phase:** v3-3
- **Aufgabe:** Drei Kerndokumente fuer v3-Pipeline aktualisieren: Phase 0.4 AGENT_TAFELBILD in Workflow einfuegen, AGENT_MATERIAL auf fixiertes TB umstellen, ORCHESTRATOR auf 8-Agenten-Sequenz aktualisieren
- **Ergebnis:** WORKFLOW_v2.md → v3: Header, Phasenstruktur (Phase 0.4 eingefuegt), Agenten-Rollen (TAFELBILD hinzugefuegt), Phase 0.3 SKRIPT (kein TB-Entwurf, 600-900W), neuer Schritt 0.4 (AGENT_TAFELBILD komplett), Phase 1 MATERIAL (TB fixiert, Sicherung = Hefteintrag-Verweis), Q-Gate SKRIPT (TB-Check entfernt). AGENT_MATERIAL.md: Rolle auf v3, TAFELBILD als Eingabe, Aufgabe 1.1 → TB-Abdeckungs-Verifizierung (TB-FREEZE statt TB-Detaillierung), Materialtyp-Auswahllogik auf v3, Aufgabe 1.5 → Erarbeitbarkeits-Dokumentation (3-Schritt statt 5-Schritt), Sicherung → Hefteintrag-Verweis + Reflexionsimpuls, Produktions-Modus 2.2 → TB uebernehmen statt produzieren (merksatz + kernerkenntnisse). ORCHESTRATOR.md: v3-Header, 8 Agenten, Phase 0.4 im Workflow-Diagramm, Ausfuehrungsorte ergaenzt, Ruecklauf-Zuordnung (AGENT_TAFELBILD), Agenten-Tabelle + Referenz-Dokumente aktualisiert. UPGRADE_PLAN_v3.md: v3-1/v3-2/v3-3 als abgeschlossen markiert, stale "0.2c" → "0.4" korrigiert, Naechster Schritt → v3-4.
- **Artefakte:** `docs/architektur/WORKFLOW_v2.md` (v3), `docs/agents/AGENT_MATERIAL.md` (v3), `docs/agents/ORCHESTRATOR.md` (v3), `docs/architektur/UPGRADE_PLAN_v3.md` (v3-3 abgeschlossen)
- **Naechster Schritt:** Phase v3-4: Engine-Erweiterung (Claude Code) — Uebergabe-Prompt formulieren

### Architektur-Revision: TB nach SKRIPT + Phase v3-2 AGENT_SKRIPT angepasst
- **Phase:** Architektur-Revision + v3-2
- **Aufgabe:** Pipeline-Reihenfolge revidieren (TB nach SKRIPT statt vor SKRIPT), alle betroffenen Dateien aktualisieren, AGENT_SKRIPT fuer v3 anpassen
- **Ergebnis:** Neue Pipeline: DIDAKTIK → INHALT → ARTEFAKT → SKRIPT → TAFELBILD (Phase 0.4) → MATERIAL. Begruendung (E5): (1) Erarbeitbarkeit gegen didaktisierten SKRIPT pruefen statt gegen Roh-Fakten. (2) SKRIPT schreibt frei, TB extrahiert Quintessenz. (3) Material basiert auf SKRIPT — TB-Erarbeitbarkeit natuerlich gegeben. (4) Naeher am realen Unterrichtsprozess. AGENT_SKRIPT v3: Aufgabe 5 (TB-Entwurf) entfaellt, Wortbudget 600-900 W/Chunk (erhoehte Substanz fuer TB-Extraktion + Material-Ableitung), Q6 entfaellt. AGENT_TAFELBILD revidiert: Primaerquelle SKRIPT statt INHALTSBASIS, skript_referenz direkt bei Erstellung, Erarbeitbarkeits-Entscheidungsbaum gegen SKRIPT. GUETEKRITERIEN G3 auf SKRIPT umgestellt. UPGRADE_PLAN: E1/E2 revidiert, E5 neu (Pipeline-Entscheidung), Risiken + TB-Governance aktualisiert.
- **Artefakte:** `docs/architektur/UPGRADE_PLAN_v3.md` (revidiert), `docs/agents/AGENT_TAFELBILD.md` (revidiert), `docs/agents/AGENT_SKRIPT.md` (v3-Update), `docs/checklisten/GUETEKRITERIEN_TAFELBILD.md` (G3 revidiert)
- **Naechster Schritt:** Phase v3-3: WORKFLOW + AGENT_MATERIAL + ORCHESTRATOR anpassen

### Phase v3-1 abgeschlossen + Audit-Remediation: AGENT_TAFELBILD.md + 6 Audit-Fixes
- **Phase:** v3-1 (AGENT_TAFELBILD erstellen) + Audit-Remediation
- **Aufgabe:** (1) AGENT_TAFELBILD.md als eigenstaendigen Agenten-Prompt schreiben. (2) Externen Audit der 3 v3-Dateien durchfuehren. (3) Alle Audit-Befunde beheben.
- **Ergebnis:** AGENT_TAFELBILD.md erstellt: Rolle (Sicherungsarchitekt), 6 Aufgaben (Kernerkenntnisse → Ordnungsmuster → Knoten → Erarbeitbarkeit → Hefteintrag → Q-Gate), dualer Output (JSON + Hefteintrag), Schnittstellen zu 6 Agenten. Audit-Briefing geschrieben, Audit durchgefuehrt (8 Dimensionen, A1-A8). Ergebnis: CONDITIONAL GO mit 2 BLOCKER + 3 HIGH + 1 MEDIUM. Alle 6 behoben: BLOCKER-1: Q-Gate-Operationalisierung mit maschinell pruefbarer Logik pro G1-G13 (neuer Abschnitt 8 in GUETEKRITERIEN). BLOCKER-2: Erarbeitbarkeits-Entscheidungsbaum DIRECT/ARTIFACT/INFERENTIAL/UNKLAR in AGENT_TAFELBILD Aufgabe 4. HIGH-1: Voraussetzungs-Sequenzierung praezisiert (Mappe 1 leer, Mappe 2+ nur N-1, Wiederholungsregel). HIGH-2: AGENT_SKRIPT v3-Aenderungen in UPGRADE_PLAN Phase v3-2 dokumentiert (skript_referenz, merksatz-Integration, Abgleich-Tabelle). HIGH-3: TB-Revisions-Governance in UPGRADE_PLAN (Freeze-Regel, Eskalationspfad). MEDIUM: Q/G-Nummerierung bereinigt, kernerkenntnisse vs merksatz Definition geklaert.
- **Artefakte:** `docs/agents/AGENT_TAFELBILD.md` (neu + Audit-Fix), `docs/checklisten/GUETEKRITERIEN_TAFELBILD.md` (Audit-Fix: Abschnitt 8 Q-Gate-Operationalisierung), `docs/architektur/UPGRADE_PLAN_v3.md` (Audit-Fix: Phase v3-2 Detail, TB-Governance, Q/G-Bereinigung), `docs/analyse/AUDIT_BRIEFING_v3_TAFELBILD.md` (neu)
- **Naechster Schritt:** Phase v3-2: AGENT_SKRIPT.md anpassen

### Phase v3-0 abgeschlossen: GUETEKRITERIEN_TAFELBILD.md empirisch fundiert
- **Phase:** v3-0 (Artefakt-Auswertung Guetekriterien)
- **Aufgabe:** Primaerquellen zu Tafelbild-Guetekriterien auswerten, empirische Muster extrahieren, kanonisches Referenzdokument schreiben
- **Ergebnis:** 3 Quellen ausgewertet: (1) DG B2 Tafelbild.pdf — 10 Grundsaetze (Reduktion, Lernziel-Kongruenz, Uebersichtlichkeit, Strukturierung, Rekapitulierbarkeit etc.), Leitsatz "TB + Hefteintrag = bleibende Lernessenz". (2) 8 Excalidraw-TBs aus Silas' 1.WK-Sequenz — Durchschnitt 9,25 Elemente, 60% Saetze / 40% Schlagwoerter, 3 Ordnungsmuster (kausal 50%, kategorial 37,5%, chronologisch 12,5%), Merksaetze in 6/8 TBs. (3) 8 Verlaufsplaene — TB entsteht in Sicherungsphase (7-12 min), Material-Kategorien spiegeln 1:1 TB-Struktur, kollaborative Lehrkraft-geleitete Entwicklung. Synthese: 13 gewichtete Kriterien (G1-G13: 6 MUSS, 4 SOLL, 3 KANN), Design-Inversion begruendet (Backward Design), duales Output-Format (JSON + Hefteintrag 80-120W), Q-Gate-Protokoll. UPGRADE_PLAN_v3.md aktualisiert: E1-E3 entschieden.
- **Artefakte:** `docs/checklisten/GUETEKRITERIEN_TAFELBILD.md` (neu), `docs/architektur/UPGRADE_PLAN_v3.md` (aktualisiert: Phase v3-0 als abgeschlossen, Entscheidungen E1-E3 getroffen)
- **Naechster Schritt:** Phase v3-1: AGENT_TAFELBILD.md schreiben

## 2026-03-25
### v3-Planung: Tafelbild-Professionalisierung — UPGRADE_PLAN_v3.md erstellt
- **Phase:** v3-Planung (Scope + Architektur)
- **Aufgabe:** Ist-Analyse Tafelbild in v2.1, v3-Scope evaluieren, Umsetzungsplan schreiben
- **Ergebnis:** UPGRADE_PLAN_v3.md erstellt. Kernentscheidungen: (1) AGENT_TAFELBILD als eigenstaendiger Agent in Phase 0.2c (zwischen ARTEFAKT und SKRIPT). (2) Duale Repraesentation: JSON (knoten[] + verbindungen[] + merksatz + kernerkenntnisse[]) fuer Engine + Hefteintrag-Text (~halbe DIN-A5, max. 120W) fuer Analogtransfer. (3) Tafelbild als Zielstruktur — SKRIPT erhaelt es als Eingabe. (4) Guetekriterien empirisch fundiert (DG B2 + 190 Hefteintrag-Beispiele + User-Artefakte). (5) 5-Phasen-Umsetzungsplan (v3-0 bis v3-5). 4 offene Entscheidungen (E1-E4).
- **Artefakte:** `docs/architektur/UPGRADE_PLAN_v3.md` (neu)
- **Naechster Schritt:** Phase v3-0: DG B2 Tafelbild.pdf auswerten → GUETEKRITERIEN_TAFELBILD.md

### Infrastruktur v2.1: 7 Learnings eingearbeitet (WORKFLOW + Subagenten + Template)
- **Phase:** Infrastruktur-Update (v2.0 → v2.1)
- **Ausloeser:** Claude Code Commit 5153466 (Mappe 1 v2, 9 Materialien, 5 Bilder self-hosted) — Rueckmeldung mit 7 Prozess-Abweichungen: curl blocked (→ Python urllib), Q-Gates nicht formal dokumentiert, Subagenten nicht als separate Iterationen, ARTEFAKT_INVENTAR nicht gelesen, JSON-Fehler durch deutsche typografische Anfuehrungszeichen.
- **Ergebnis:** WORKFLOW_v2.md auf v2.1 aktualisiert (7 Learnings L1-L7 dokumentiert, Phase 0 Pipeline: DIDAKTIK→INHALT→ARTEFAKT→SKRIPT, Phase 2.0 Bild-Download vor Material-Produktion, Python-urllib-Methode als verbindlich, Q-Gate-Log-Format, JSON-Validierung als Pflichtschritt, Quellenangaben-Workaround via cite-Einbettung). Alle 5 Subagenten-Prompts (SUB_DARSTELLUNGSTEXT, SUB_QUELLENTEXT, SUB_TAGEBUCH, SUB_ZEITLEISTE, SUB_BILDQUELLE) um JSON-Encoding-Regeln und cite-Einbettung erweitert. AGENT_ARTEFAKT Self-Hosting-Sektion auf Python/urllib-Methode aktualisiert. Standardisiertes Uebergabe-Template v2.1 erstellt (Platzhalter-basiert, wiederverwendbar fuer beliebige Games/Mappen, 10 Erfolgskriterien inkl. Q-Gate-Log + JSON-Validierung).
- **Artefakte:** `docs/architektur/WORKFLOW_v2.md` (v2.1, Header + Section 1b + Phase 2.0 + Phase 2.1 erweitert), `docs/agents/AGENT_ARTEFAKT.md` (Self-Hosting Python-Download verbindlich), `docs/agents/AGENT_SUB_DARSTELLUNGSTEXT.md` + `AGENT_SUB_QUELLENTEXT.md` + `AGENT_SUB_TAGEBUCH.md` + `AGENT_SUB_ZEITLEISTE.md` + `AGENT_SUB_BILDQUELLE.md` (alle: JSON-Encoding-Regeln + cite-Einbettung), `docs/uebergabe/UEBERGABE_TEMPLATE_v2.1.md` (neu, standardisiertes Template)
- **Offene Blocker:** quellenangaben[] Engine-Support fehlt (Workaround: cite-Einbettung in inhalt-HTML). Flowcharts (mermaid) veraltet.
- **Naechster Schritt:** v3-Optimierungen planen ODER Mappe 2 mit v2.1-Pipeline produzieren.

### Mappe 1 v2 deployed: 9 Materialien, 5 Bilder self-hosted (Commit 5153466)
- **Phase:** Phase 2.1 v2 (Material-Produktion mit verbesserter Pipeline)
- **Aufgabe:** Uebergabe-Prompt v2 (UEBERGABE_Phase2-1_v2_Mappe1.md) in Claude Code ausfuehren — 9 Materialien, Self-Hosting als Schritt 0, Q-Gates
- **Ergebnis:** 9/9 Materialien PASS. Self-Hosting: 5 Bilder heruntergeladen (urllib mit Bot-User-Agent, 2s Delays) → `assets/img/gpg-erster-weltkrieg-ursachen/`. Neue Artefakte erfolgreich eingebunden: img-1-3 Bismarck-Buendniskarte, img-1-4 Rhodes Colossus, img-1-5 2nd Battle Squadron. Artefakte laden auf Website. Abweichungen vom Prozess: curl blockiert → urllib-Fix ad hoc, Q-Gates nicht separat dokumentiert, ARTEFAKT_INVENTAR nicht gelesen, JSON-Fehler durch typografische Anfuehrungszeichen (3 Validierungsfehler behoben).
- **Artefakte:** `escape-games/gpg-erster-weltkrieg-ursachen/data.json` (9 Materialien v2), `assets/img/gpg-erster-weltkrieg-ursachen/` (5 selbstgehostete Bilder), Commit 5153466
- **Naechster Schritt:** Learnings in Infrastruktur einarbeiten (→ v2.1)

### ARTEFAKT_INVENTAR Mappe 1 + Uebergabe-Prompt v2
- **Phase:** Phase 0.2b (AGENT_ARTEFAKT) + Phase 2.1 Vorbereitung
- **Aufgabe:** AGENT_ARTEFAKT ausfuehren (artikelstrukturierte Sichtung fuer Mappe 1), ARTEFAKT_INVENTAR schreiben, Uebergabe-Prompt v2 erstellen
- **Ergebnis:** 4 Artikel gesichtet (Causes of WWI, Triple Alliance, Triple Entente, Imperialism) → 67 Bilder → 5 QUALIFIZIERT + 2 RESERVE. Neue Artefakte: Bismarck-Buendniskarte (Kartenvergleich), Rhodes Colossus (Karikatur-Analyse), 2nd Battle Squadron (Flottenrivalitaet). Uebergabe-Prompt v2: 9 Materialien, 5 Aufgaben, Self-Hosting-Download als Schritt 0.
- **Artefakte:** `docs/agents/artefakte/ARTEFAKT_INVENTAR_gpg-erster-weltkrieg-ursachen.md` (neu), `docs/uebergabe/UEBERGABE_Phase2-1_v2_Mappe1.md` (neu)
- **Naechster Schritt:** Uebergabe in Claude Code ausfuehren

### Artefakt-Pipeline-Redesign: AGENT_ARTEFAKT + Self-Hosting
- **Phase:** Pipeline-Architektur (Phase 0 Erweiterung)
- **Ausloeser:** Wikimedia 429-Fehler auf deployed Mappe 1 (upload.wikimedia.org/thumb/ CDN-Throttling seit Dez 2025). User-Anforderung: Artefakte entlang Wikipedia-Artikelstruktur sichten statt Freitext-Suche.
- **Diagnose:** (1) Wikipedia MCP `get_article` liefert KEINE Bild-/File-Referenzen (werden gestrippt). (2) MediaWiki API via `markdownify` als Proxy funktioniert: `action=parse&section=N&prop=images` liefert sektionsbasierte Bildlisten, `action=query&prop=imageinfo` liefert URLs + Lizenzen + Metadaten.
- **Ergebnis:** AGENT_ARTEFAKT als neuer Agent (Phase 0, Schritt 2b) zwischen AGENT_INHALT und AGENT_SKRIPT. Kernprinzip: Strukturierte Sichtung entlang Artikel-Sektionen, kein `wikimedia_search_images` als Primaermethode. Output: ARTEFAKT_INVENTAR mit qualifizierten Artefakten + Self-Hosting-Daten. SUB_BILDQUELLE auf Self-Hosting umgestellt (lokale Pfade `assets/img/{game-id}/` statt Wikimedia-CDN-URLs). WORKFLOW_v2 erweitert: Phase 0.2a (INHALT) / 0.2b (ARTEFAKT) Trennung.
- **Artefakte:** `docs/agents/AGENT_ARTEFAKT.md` (neu), `docs/architektur/WORKFLOW_v2.md` (erweitert: Phase 0.2b, Abgrenzungstabelle, Referenz-Dokumente), `docs/agents/AGENT_SUB_BILDQUELLE.md` (angepasst: Self-Hosting-Pfade, ARTEFAKT_INVENTAR-Integration)
- **Naechster Schritt:** Mappe 1 Bilder self-hosten → Mappe 2 mit neuer Pipeline

### Phase 2.1 Prototyp Mappe 1: Deployed (Commit a2b572e)
- **Phase:** Phase 2.1 (Material-Produktion mit Subagenten)
- **Aufgabe:** 6 Materialien fuer Mappe 1 mit Subagenten-Prompts produzieren, data.json assemblieren, auf weitergehts.online deployen
- **Ergebnis:** 6/6 Materialien PASS (mat-1-1 darstellungstext ~130W Q1-10 PASS, mat-1-2 karte Wikimedia CC-BY-SA 2.5 PASS, mat-1-3 zeitleiste 5 Eintraege Leitfrage PASS, mat-1-4 quellentext Buelow-Zitat blockquote PASS, mat-1-5 bildquelle Wilhelm II. 440px PASS, mat-1-6 tagebuch Diplomat ~115W Fiktion-Kennzeichnung PASS). Tafelbild 7 Knoten 6 Verbindungen. 3 Stub-Aufgaben (2x MC + 1x Lueckentext, Code PULVER). Engine-Inkompatibilitaet: quellenangaben[] nicht unterstuetzt → weggelassen (kein Breaking Change).
- **Artefakte:** `escape-games/gpg-erster-weltkrieg-ursachen/data.json` (komplett neu, v2-Inhalte), Commit a2b572e
- **Naechster Schritt:** Visuelles Review auf weitergehts.online → Findings → Entscheidung Prozess-Anpassung vs. Mappe 2

## 2026-03-24
### Subagenten-Architektur implementiert + Uebergabe-Prompt Mappe 1
- **Phase:** Phase 2.1 (Material-Produktion)
- **Aufgabe:** (1) Materialtyp-Subagenten als eigenstaendige Agenten-Prompts implementieren, (2) WORKFLOW_v2 um Phase 2.1/2.2/2.3 erweitern, (3) Uebergabe-Prompt nur Mappe 1 mit Subagenten-Referenz
- **Ergebnis:** 5 Subagenten-Prompts erstellt: SUB_DARSTELLUNGSTEXT (Sachtext, Sprachregister R7, Q1-Q10), SUB_QUELLENTEXT (Dreischritt Einleitung-Wortlaut-Impuls, Originalnaehe + Paraphrase, Q1-Q10), SUB_TAGEBUCH (Figurkonstruktion, historische Plausibilitaet, Ueberwaetigungsverbot, Perspektivitaet, Q1-Q12), SUB_ZEITLEISTE (Didaktische Reduktion max. 8 Eintraege, Leitfrage als Ueberschrift, Ankerpunkte, Q1-Q10), SUB_BILDQUELLE (URL-Verifikation, Dreifach-Bildunterschrift Identifikation+Kontext+Impuls, Lizenz-Check, Q1-Q10). WORKFLOW_v2.md: Phase 2 aufgeteilt in 2.1 (Subagenten), 2.2 (AGENT_RAETSEL), 2.3 (Assembly). Dispatch-Ablauf + Engine-Typ-Mapping dokumentiert. Uebergabe-Prompt Mappe 1 erstellt (UEBERGABE_Phase2-1_PROTOTYP_Mappe1.md) — reduziert auf Mappe 1 (Scope-Entscheidung: Token sparen), 6 Materialien mit Subagenten-Dispatch, 3 Stub-Aufgaben fuer Prototyp.
- **Artefakte:** `docs/agents/AGENT_SUB_DARSTELLUNGSTEXT.md` (neu), `docs/agents/AGENT_SUB_QUELLENTEXT.md` (neu), `docs/agents/AGENT_SUB_TAGEBUCH.md` (neu), `docs/agents/AGENT_SUB_ZEITLEISTE.md` (neu), `docs/agents/AGENT_SUB_BILDQUELLE.md` (neu), `docs/architektur/WORKFLOW_v2.md` (erweitert: Phase 2.1-2.3, Subagenten-Tabelle, Dispatch-Ablauf, Engine-Typ-Mapping, Referenz-Dokumente), `docs/uebergabe/UEBERGABE_Phase2-1_PROTOTYP_Mappe1.md` (neu, ersetzt UEBERGABE_Phase2_PROTOTYP_Mappen1-2.md)
- **Naechster Schritt:** Claude Code: Uebergabe-Prompt ausfuehren → Prototyp deployen → visuelles Review

### MATERIAL_GERUEST Mappen 1+2 validiert + Phase 2 Prototyp-Uebergabe
- **Phase:** Phase 1 → Phase 2 Uebergang
- **Aufgabe:** (1) MATERIAL_GERUEST Mappe 1 User-Validierung, (2) MATERIAL_GERUEST Mappe 2 erstellen + User-Validierung, (3) Prototyp-Deployment vorbereiten
- **Ergebnis:** Mappe 1 PASS (User-Validierung). Mappe 2 erstellt (6 Materialien: darstellungstext, 2 bildquellen Beltrame/Franz Ferdinand, quellentext Ultimatum, zeitleiste Julikrise, tagebuch Bewohner:in Sarajevo; Tafelbild 6 Knoten + Cross-Chunk-Rueckbezug k2-2→k1-1). Mappe 2 PASS (User-Validierung). Entscheidung: Vor Mappen 3+4 Website-Prototyp deployen — visuelles Review, Bug-Erkennung, Prozess-Schaerfung. Uebergabe-Prompt erstellt mit 10 Schritten: data.json v2-Inhalte, Materialtyp-Mapping (tagebuch→quellentext, karte→bildquelle), 3 Stub-Aufgaben pro Mappe, Tafelbild-Struktur, Wikimedia-Verifikation, Engine-Kompatibilitaetspruefung, v1-Artefakte aufraeumen.
- **Artefakte:** `docs/agents/artefakte/MATERIAL_GERUEST_gpg-erster-weltkrieg-ursachen_Mappe2.md` (neu), `docs/uebergabe/UEBERGABE_Phase2_PROTOTYP_Mappen1-2.md` (neu), `docs/projekt/STATUS.md` (aktualisiert)
- **Naechster Schritt:** Claude Code: Uebergabe-Prompt ausfuehren → Prototyp deployen → visuelles Review

## 2026-03-23
### Workflow-Optimierung: Artefakt-Kette + Aufgaben-Timing + Agenten-Updates
- **Phase:** Phase 1 (Prozesskorrektur nach Mappe-1-Erstdurchlauf)
- **Aufgabe:** Workflow-Infrastruktur optimieren basierend auf 5 identifizierten Prozess-Defiziten: (1) Aufgaben-Skizze in Phase 1 zu frueh, (2) INHALTSBASIS-Bilder nicht funktional, (3) keine Zitat-Extraktion, (4) Reporter-Rolle ueberschneidet Zeitungsartikel-Materialtyp, (5) Artefakte nicht im SKRIPT eingebettet
- **Ergebnis:** WORKFLOW_v2.md: Phase 0.2 um 3 Aufgaben erweitert (Wikimedia funktional, Zitate, Rollenprofile), INHALTSBASIS-Template mit 3 neuen Sektionen (Wikimedia-Artefakte mit Dateiname/Lizenz/Einbettungsvorschlag, Zitate mit Sprecher/Wortlaut/Kontext, Rollenprofile mit historischer Basis). Phase 0.3 um Aufgabe 3 erweitert (Artefakte positionieren), SKRIPT-Template um Artefakt-Zuordnungstabelle und [ARTEFAKT]-Marker, Qualitaets-Gate +3 Pruefpunkte. Phase 1 auf inkrementell pro Mappe umgestellt, Aufgaben-Skizze entfernt, Artefakt-Ref-Spalte im Material-Entwurf. AGENT_SKRIPT.md: Neue Aufgabe 6 (Artefakt-Einbettung mit Positionierungsregeln), Q11-Q13 im Qualitaets-Gate, Eingabe-Tabelle erweitert, Ausgabe-Template mit Artefakt-Zuordnung. AGENT_MATERIAL.md: v2-Eingabe (SKRIPT statt inhalts_md/game_blueprint), Aufgabe 1.3 (Aufgaben-Skizze) entfaellt in Phase 1, Abdeckungs-Check und Zielklarheit-Pruefung auf Artefakt-Ref umgestellt, alle Referenzen v1→v2 migriert.
- **Artefakte:** `docs/architektur/WORKFLOW_v2.md` (7 Edits), `docs/agents/AGENT_SKRIPT.md` (4 Edits), `docs/agents/AGENT_MATERIAL.md` (8 Edits)
- **Naechster Schritt:** INHALTSBASIS Mappe 1 nachbessern (Claude Code), SKRIPT Chunk 1 ueberarbeiten, MATERIAL_GERUEST Mappe 1 ueberarbeiten

## 2026-03-18
### Prozessredesign v1 → v2: Wikipedia-Anker + Skript-Artefakt + Subagenten
- **Phase:** Phase 3.2 Prozessredesign
- **Aufgabe:** (1) MCP-Tool-Pool evaluieren/dokumentieren, (2) Materialtyp-Workflows implementieren, (3) Testmappe v1.1 testen, (4) Prozessredesign evaluieren/entscheiden
- **Ergebnis:** MCP_TOOLS.md v2 (30+ Tools, 6 Kategorien). AGENT_MATERIAL.md mit W-1 bis W-8 Workflows. Testmappe-v1.1-Versuch abgebrochen — 3 strukturelle Probleme identifiziert (Token-Ineffizienz, fehlende Zielklarheit, blinde Recherche). Prozessredesign entschieden: Wikipedia-MCP als Inhaltsanker, neuer AGENT_SKRIPT (Jugendsachbuch-Stil), Subagenten pro Materialtyp. Flowcharts erstellt (Status Quo + Neuausrichtung). 3 neue MCP-Tools installiert (QuickChart, Mermaid Chart, svg-converter). Wikipedia-MCP installiert.
- **Artefakte:** `docs/checklisten/MCP_TOOLS.md` (v2, komplett neu), `docs/agents/AGENT_MATERIAL.md` (W-1 bis W-8), `docs/architektur/flowchart-status-quo.mermaid` (neu), `docs/architektur/flowchart-neuausrichtung.mermaid` (neu), `docs/projekt/STATUS.md` (Prozessredesign-Entscheidung dokumentiert)
- **Naechster Schritt:** WORKFLOW_v2.md schreiben, ORCHESTRATOR.md aktualisieren, AGENT_SKRIPT.md erstellen

### Infrastruktur-Update: WORKFLOW_v2.md + ORCHESTRATOR.md v2
- **Phase:** Phase 3.2 Prozessredesign
- **Aufgabe:** Kanonische v2-Dokumente erstellen und bestehende Docs aktualisieren
- **Ergebnis:** WORKFLOW_v2.md geschrieben (10 Sektionen: Phasenstruktur, Agenten-Rollen, Phase 0-3 Details, Externe Audits, v1-Abgrenzung). ORCHESTRATOR.md auf v2 aktualisiert (4-Phasen-Workflow mit AGENT_SKRIPT als [0.3], User-Validierung nach jeder Phase, Ausfuehrungsorte-Tabelle, Referenz-Dokumente). projekt-website Skill: Read-only, Update zurueckgestellt — Skill liest v2-Kontext aus STATUS.md/CHANGELOG.md ein.
- **Artefakte:** `docs/architektur/WORKFLOW_v2.md` (neu, kanonisch), `docs/agents/ORCHESTRATOR.md` (v2)
- **Naechster Schritt:** AGENT_SKRIPT.md erstellen. Erster Durchlauf Phase 0 (Wikipedia → Skript) fuer Game 1 testen.

## 2026-03-22
### Phase 0.1 abgeschlossen: DIDAKTIK_RAHMEN Game 1 erstellt
- **Phase:** Phase 0.1 (AGENT_DIDAKTIK)
- **Aufgabe:** DIDAKTIK_RAHMEN fuer Game 1 "Erster Weltkrieg — Ursachen und Ausbruch" erstellen
- **Ergebnis:** DIDAKTIK_RAHMEN_gpg-erster-weltkrieg-ursachen.md erstellt. 4 Kompetenzerwartungen gemappt (KE-A: GPG7_LB2_K_05 Maechterivalitaeten, KE-B: GPG7_LB2_K_06 Attentat/Ursache-Ausloeser, KE-C: GPG7_LB2_K_07 Verlauf fuer Menschen, KE-D: GPG7_LB3_K_03 Kriegsschuldfrage). KE-Matrix mit Haupt-/Nebenzuordnungen. 4 Mappen: (1) Pulverfass Europa — Imperialismus/Nationalismus/Buendnisse, (2) Attentat Sarajevo — Ursache vs. Ausloeser/Julikrise, (3) Kriegsbegeisterung 1914 — Propaganda/Perspektiven, (4) Schlieffen-Plan — Strategie/Scheitern/Stellungskrieg. Stundenziel AFB II-III + 4 Teilziele (TZ1-TZ4). Schwierigkeitskurve: I-II → II → II → II-III. Ethische Hinweise (Multiperspektivitaet, Kontroversitaet, Ueberwaetigungsverbot, Sensibilitaet, Aktualitaetsbezug). Narrativ-Rahmen: Zeitungsreporter Sommer 1914. 3-stufiges Tipp-System mit konkretem Beispiel. Verzeichnis docs/agents/artefakte/ neu angelegt.
- **Artefakte:** `docs/agents/artefakte/DIDAKTIK_RAHMEN_gpg-erster-weltkrieg-ursachen.md` (neu), `docs/agents/artefakte/` (neues Verzeichnis)
- **Naechster Schritt:** User-Validierung DIDAKTIK_RAHMEN (Pflicht). Dann Phase 0.2 (AGENT_INHALT) in Claude Code.

### Phase 0.3 abgeschlossen: SKRIPT Game 1 erstellt (Cowork)
- **Phase:** Phase 0.3 (AGENT_SKRIPT)
- **Aufgabe:** Lineares Jugendsachbuch-Skript schreiben, in 4 Mappen-Chunks aufteilen, Tafelbild-Entwuerfe ableiten
- **Ergebnis:** SKRIPT erstellt. 4 Chunks: C1 Pulverfass Europa (Imperialismus, Nationalismus, Buendnisse, Wettruestung), C2 Attentat Sarajevo (Balkankrise, Princip, Julikrise, Ursache vs. Ausloeser), C3 Kriegsbegeisterung (Augusterlebnis, 4 Gruende, Gegenstimmen, Burgfrieden), C4 Schlieffen-Plan (Zweifrontenkrieg, Zeitluecke, Marne-Schlacht, Stellungskrieg). Stil Jugendsachbuch, Saetze ≤20 Woerter, 16 Fachbegriffe bei Erstverwendung erklaert, Personifizierung pro Chunk. Tafelbild-Entwuerfe 6-7 Knoten pro Chunk mit Voraussetzungen-Kette. Sandwich-Uebergaenge komplett. KE-Abdeckung vollstaendig. Qualitaets-Gate: 10/10 PASS.
- **Artefakte:** `docs/agents/artefakte/SKRIPT_gpg-erster-weltkrieg-ursachen.md` (neu)
- **Naechster Schritt:** User-Validierung Phase 0 (Pflicht). Dann Phase 1 (AGENT_MATERIAL Design-Modus).

### Phase 0.2 abgeschlossen: INHALTSBASIS Game 1 erstellt (Claude Code)
- **Phase:** Phase 0.2 (AGENT_INHALT)
- **Aufgabe:** Wikipedia-basierte Sachanalyse fuer Game 1 "Erster Weltkrieg — Ursachen und Ausbruch"
- **Ergebnis:** INHALTSBASIS erstellt. 12 Wikipedia-Artikel ausgewertet (Hauptartikel World War I + 11 Vertiefungsartikel: Causes of WWI, Triple Alliance, Triple Entente, Imperialism, Assassination of Franz Ferdinand, July Crisis, Bosnian Crisis, Balkan Wars, Spirit of 1914, Schlieffen Plan, First Battle of the Marne). 14+ Fakten pro Mappe extrahiert. Alle 4 Inhaltsluecken aus Themen-Briefing geschlossen: Julikrise-Chronologie, Balkankrise-Kontext, Schlacht an der Marne, Quellenverifikation. Quellenangaben pro Fakt mit Wikipedia-Artikel + Sektion. Verfuegbare Bilder notiert. Recherche-Hinweise pro Mappe dokumentiert.
- **Artefakte:** `docs/agents/artefakte/INHALTSBASIS_gpg-erster-weltkrieg-ursachen.md` (neu)
- **Naechster Schritt:** Phase 0.3 (AGENT_SKRIPT) in Cowork — lineares Skript schreiben, chunken, Tafelbild-Entwuerfe.

### Audit v2 + Auflagen-Umsetzung: v2-Architektur freigegeben
- **Phase:** Phase 3.2 Prozessredesign (Abschluss)
- **Aufgabe:** (1) Audit-Auftrag erstellen, (2) Externes Audit durchfuehren, (3) Alle Auflagen + Empfehlungen umsetzen
- **Ergebnis:** Audit-Ergebnis: "Freigabe unter Auflagen" (5 Auflagen, 4 Empfehlungen). Alle 9 Massnahmen umgesetzt: AGENT_SKRIPT.md erstellt (Blocker — Schluessel-Agent der v2-Architektur mit Stil-Constraints, 10-Punkte-Qualitaets-Gate, Chunking-Mandat, Sandwich-Methode, Tafelbild-Entwurfsregeln). MATERIAL_GERUEST-Template in WORKFLOW_v2 spezifiziert (Blocker — v1-BLUEPRINT-Format adaptiert auf Skript-Chunks). ORCHESTRATOR data.json-Schema auf v1-erweitertes Schema aktualisiert (einstieg{}, materialien[], sicherung{}, tafelbild{}, quellenangaben[]). Wikipedia-Fallback-Pfad definiert (3-stufig). Material-Typ-Auswahllogik auf Skript-Passagen adaptiert (7 skript-basierte Trigger primaer, Tafelbild sekundaer). INHALTSBASIS-Template um Recherche-Hinweise ergaenzt. Sandwich-Validierung als Phase-2-Pruefpunkt. Quellenangaben-Assembly als Post-Subagenten-Schritt.
- **Artefakte:** `docs/agents/AGENT_SKRIPT.md` (neu), `docs/analyse/AUDIT_PROZESSREDESIGN_V2.md` (Audit-Auftrag), `docs/analyse/AUDIT_PROZESSREDESIGN_V2_ERGEBNIS.md` (Audit-Ergebnis + Umsetzungsnachweis), `docs/architektur/WORKFLOW_v2.md` (erweitert: MATERIAL_GERUEST-Template, Fallback-Pfad, Recherche-Hinweise, Sandwich-Pruefpunkt, Quellenangaben-Assembly), `docs/agents/ORCHESTRATOR.md` (data.json v1-Schema), `docs/agents/AGENT_MATERIAL.md` (Skript-basierte Auswahllogik)
- **Naechster Schritt:** Erster Durchlauf Phase 0 (DIDAKTIK → INHALT → SKRIPT) fuer Game 1 "Pulverfass Europa". Phase 0.1 in Cowork starten.

---

## 2026-03-17
### Docs-Konsolidierung + Evaluation v1-Testmappe + Agenten-Verschaerfung
- **Phase:** Phase 3.1 → 3.2 Uebergang
- **Aufgabe:** (1) Verzeichnisstruktur konsolidieren, (2) v1-Testmappe im Browser evaluieren, (3) Agenten-Instruktionen basierend auf Evaluation verschaerfen
- **Ergebnis:** Projekt_Website/ komplett nach docs/ migriert (9 Unterordner: agents, projekt, architektur, uebergabe, analyse, briefings, checklisten, testdaten, assets). Alle Querverweise in 8 aktiven Docs aktualisiert. PFAD_MANIFEST.md neu geschrieben. Skill projekt-website v2 mit konsolidierten Pfaden paketiert und installiert. Browser-Test + Lehrkraft-Evaluation: 23 Findings (6 Prozess, 9 Engine/UI, 10 Inhalt/Didaktik). 14 davon eingearbeitet in AGENT_MATERIAL.md (Qualitaetsspezifikationen fuer alle 7 Materialtypen + Tafelbild + Einstieg, 3 neue Kern-Prinzipien) und AGENT_RAETSEL.md (Material-Alignment-Pflicht, Freitext-Neudefinition, Lueckentext-Darstellungsregel, Tipp-UI-Regeln). 9 Findings offen (3 strategisch: MCP-Integration, QM-Struktur, Differenzierung; 6 technisch: Drag-and-drop, Hover, Sicherung-Bug, Header, Dropdown-Bug).
- **Artefakte:** `docs/` (neue Struktur), `docs/agents/AGENT_MATERIAL.md` (verschaerft), `docs/agents/AGENT_RAETSEL.md` (verschaerft), `docs/analyse/EVALUATION_V1_TESTMAPPE.md` (neu), `docs/agents/PFAD_MANIFEST.md` (neu geschrieben), `docs/agents/SKILL_projekt-website_v2.md` (neu)
- **Naechster Schritt:** Engine-Quick-Fixes (E6, E8, E9), dann MCP-Integration recherchieren (P1)

## 2026-03-16
### Code-Review Fixes + offene Findings dokumentiert
- **Phase:** Phase 3.1: Infrastruktur-Validierung
- **Aufgabe:** Systematisches Code-Review der v1-Engine, kritische Bugs fixen, restliche Findings dokumentieren
- **Ergebnis:** 7 Findings identifiziert (H1-H2, M1-M3, N1-N3). H1 behoben: `_checkLueckentext` nutzt jetzt `_fuzzyMatch` statt exaktem String-Vergleich — Schueler-Eingaben mit Umlauten (z.B. "Buendnisbloecke" vs "Bündnisblöcke") werden korrekt erkannt. H2 behoben: `_renderMaterialQuelle` hat jetzt `<h3 class="material__titel">` wie alle anderen 6 Material-Renderer. 5 weitere Findings (Tafelbild-Linien, Zuordnung-Duplikate, material_referenz-Scroll, CSS-Variable, SVG-Marker-ID) fuer kuenftige Zyklen dokumentiert.
- **Artefakte:** `escape-engine.js` (2 Fixes), `Projekt_Website/FIXES_ENGINE_V1_OFFEN.md` (neu, 6 Findings mit Loesungsansaetzen)
- **Naechster Schritt:** Browser-Test v1-Engine mit test-data, dann Ebene 0 (GAME_BLUEPRINT)

## 2026-03-16
### Engine v1-Readiness implementiert und deployed (Phase 3.1 abgeschlossen)
- **Phase:** Phase 3.1: Infrastruktur-Update (Engine v1-Readiness)
- **Aufgabe:** Engine auf v1-Schema-Kompatibilitaet bringen; alle 16 Teilauftraege aus UEBERGABE_ENGINE_V1.md umsetzen
- **Ergebnis:** Vollstaendige Implementierung in Claude Code. Commits: 8e1bb6c (Engine v1), 364a513 (Test-Deploy), 5b94d8e (MVP-Restore). Diff: +1.673 / -116 Zeilen in 12 Dateien. escape-engine.js von 1.214 auf 2.112 Zeilen (+940): Fuzzy-Matching (_fuzzyMatch, _normalizeUmlaute, _levenshtein), Code-Reveal (_revealFreischaltCode, auto nach allen Aufgaben), 7 Material-Renderer (darstellungstext, quellentext, bildquelle, karte, zeitleiste, statistik, tagebuch), Einstieg-Renderer, Sicherung-Renderer (hidden bis Code-Reveal), Tafelbild-SVG-Generator (Auto-Layout, 6 Knoten-Typen, Verbindungen mit Labels, Ghost-Knoten fuer voraussetzungen), Phasen-Renderer (_renderMappeV1 mit automatischem MVP-Fallback), material_referenz-Links in allen 5 Aufgaben-Renderern. theme-gpg.css +110 Zeilen: 2-Spalten-Grid (Desktop >= 768px, Sticky-Materialien), 7 BEM-Material-Typ-Styles, Einstieg/Sicherung-Styles, 6 Tafelbild-CSS-Variablen, material_referenz-Verweis-Style. mappe-template.html + mappe-1..4.html auf Phasen-Layout (Einstieg → Erarbeitung → Sicherung → Code). data.json Template auf v1-Schema. Test-Datensatz mit v1-Daten validiert, dann MVP-data.json wiederhergestellt. Live-Site (weitergehts.online) laeuft im MVP-Modus, Engine erkennt v1-Daten automatisch.
- **Artefakte:** `escape-engine.js` (erweitert), `theme-gpg.css` (erweitert), `base.css` (erweitert), `mappe-template.html` + `mappe-1..4.html` (Phasen-Layout), `template/data.json` (v1-Schema), `data-v1-test.json` (Referenz-Testdaten). Planungsdocs: `UEBERGABE_ENGINE_V1.md`, `test-data-v1.json`
- **Naechster Schritt:** Browser-Test v1-Engine, dann Ebene 0 (GAME_BLUEPRINT) oder offene Doc-Updates (AGENT_INHALT.md, AGENT_DIDAKTIK.md)

## 2026-03-16
### Vier-Ebenen-Architektur + Agenten-Docs v1 aktualisiert
- **Phase:** Phase 3.1: Infrastruktur-Update (Agenten-Docs)
- **Aufgabe:** Linearen 6-Agent-Workflow durch Vier-Ebenen-Architektur ersetzen, Agenten-Docs aktualisieren
- **Ergebnis:** Grundlegende Architektur-Neuausrichtung: Trennung Planung (Ebene 0+1, Cowork) von Produktion (Ebene 2+3, Claude Code). Tafelbild-Progression als aufbauendes Strukturprinzip ueber alle Mappen. 2 externe Audits durchlaufen und eingearbeitet. Kernentscheidungen: (1) Tafelbild-Datenmodell als JSON (knoten[], verbindungen[], voraussetzungen[]). (2) INHALT = Historiker (Ebene 0), MATERIAL = Lehrbuchautor (Ebene 1+2). (3) material_referenz als Array. (4) inhalt-Feld polymorph: HTML-Fragmente fuer Text-Typen, JSON-Sub-Schemas fuer zeitleiste/statistik. (5) Wortbudget max. 500 Woerter Lesetext pro Mappe. (6) MATERIAL produziert JSON (nicht Markdown), RAETSEL uebernimmt unveraendert. (7) Synthese-Checkliste fuer Tafelbild-Erstellung (7 Leitplanken). (8) Sequenz-Regel explizit im Uebergabe-Prompt-Template.
- **Artefakte:** `Projekt_Website/WORKFLOW_v1.md` (neu, kanonisch fuer Schema + Workflow), `docs/AGENT_MATERIAL.md` (neu), `docs/ORCHESTRATOR.md` (aktualisiert: 7-Agent, Vier-Ebenen), `docs/AGENT_RAETSEL.md` (aktualisiert: materialbasierte Tipps, Reihenfolge-Regel, Zusammenfuegung), `Projekt_Website/ARCHITEKTUR_v1.md` (teilweise superseded), `Projekt_Website/MATERIAL_PIPELINE.md` (superseded)
- **Naechster Schritt:** Ebene 0 starten (GAME_BLUEPRINT) oder Engine-Fixes (Uebergabe-Prompt)

## 2026-03-15
### MVP Game 1 deployed — Problemanalyse + v1-Architektur entworfen
- **Phase:** Phase 3: Pilot (MVP-Evaluation → v1-Planung)
- **Aufgabe:** MVP Game 1 "Pulverfass Europa" analysieren, Befunde kategorisieren, v1-Architektur entwerfen
- **Ergebnis:** MVP ist funktional deployed auf weitergehts.online, aber hat 11 Befunde in 5 Kategorien. Kritischster: Kein Erarbeitungsmaterial — das Game ist ein reines Quiz ohne Lerninhalt. Paradigmenwechsel definiert: Quiz → Interaktives Arbeitsblatt. v1-Architektur entwurfen: (1) data.json Schema-Erweiterung mit materialien[] (7 Material-Typen: darstellungstext, quellentext, bildquelle, karte, zeitleiste, statistik, tagebuch), einstieg{}, sicherung{}, material_referenz pro Aufgabe. (2) Neuer AGENT_MATERIAL zwischen INHALT und RAETSEL. (3) Engine-Erweiterungen: Material-Renderer, Code-Reveal nach allen Aufgaben, Fuzzy-Matching fuer Freitext. (4) Mappe-Template mit 3-Phasen-Layout (Einstieg → Erarbeitung → Sicherung), 2-Spalten-Grid (Material links, Aufgaben rechts). (5) Verschaerfte Tipp-Regeln und Reihenfolge-Aufgaben ohne Zeitangaben. 3-Iterationen-Plan: 3.1 Infrastruktur → 3.2 Inhalt/Material → 3.3 Feinschliff/QA.
- **Artefakte:** `Projekt_Website/ANALYSE_MVP_Game1.md` (Problemanalyse, 11 Befunde), `Projekt_Website/ARCHITEKTUR_v1.md` (Schema, Agent, Engine, Template, Regeln, Handlungsplan)
- **Naechster Schritt:** Phase 3.1 starten: AGENT_MATERIAL.md erstellen, ORCHESTRATOR.md + AGENT_RAETSEL.md aktualisieren, dann Uebergabe-Prompt fuer Engine-Fixes

## 2026-03-14
### MCP-Tools dokumentiert und Uebergabe-Prompt Game 1 erstellt
- **Phase:** Phase 3: Pilot (Vorbereitung)
- **Aufgabe:** 8 MCP-Server evaluieren und in Projekt-Infrastruktur integrieren; Uebergabe-Prompt fuer Game-1-Produktion erstellen
- **Ergebnis:** `docs/MCP_TOOLS.md` erstellt mit vollstaendiger Dokumentation aller MCP-Server (markdownify, mcp-pandoc, wikimedia-image-search, rijksmuseum, ElevenLabs, excalidraw, mapbox, website-downloader). Relevanz-Bewertung, Tool-Listen, Integrationspunkte pro Agent, Kostenregeln dokumentiert. ORCHESTRATOR.md, AGENT_INHALT.md, AGENT_DESIGN.md um MCP-Tool-Referenzen erweitert (markdownify-Preprocessing, wikimedia-Bilder, excalidraw-Tafelbilder, mapbox-Karten, ElevenLabs-Audio). Uebergabe-Prompt fuer Claude Code erstellt: 8-Schritt-Workflow (DIDAKTIK→INHALT→RAETSEL→TECHNIK→DESIGN→QUALITAET→Iteration→Commit), data.json-Loesungstypen spezifiziert, alle Quelldateien referenziert.
- **Artefakte:** `docs/MCP_TOOLS.md` (neu), `docs/ORCHESTRATOR.md` (MCP-Medien-Workflow), `docs/AGENT_INHALT.md` (Preprocessing + excalidraw), `docs/AGENT_DESIGN.md` (wikimedia + ElevenLabs), `Projekt_Website/UEBERGABE_Phase3_Game1_Pulverfass_Europa.md` (neu)
- **Naechster Schritt:** Uebergabe-Prompt in Claude Code ausfuehren

## 2026-03-14
### Phase 3 Themensetzung: Erster Weltkrieg, 2 Games, Workflow standardisiert
- **Phase:** Phase 3: Pilot
- **Aufgabe:** Thema festlegen, Quellmaterial auswerten, Themensetzungsprozess standardisieren
- **Ergebnis:** Thema "Der Erste Weltkrieg" gewaehlt (statt Industrialisierung). Aufteilung in 2 Games: Game 1 "Pulverfass Europa" (UE01-04, 4 Mappen: Ursachen → Ausbruch → Kriegsbegeisterung → Schlieffen-Plan), Game 2 "Der Grosse Krieg" (UE05-09, 5 Mappen: Stellungskrieg → Front → Heimat → Global → Ende). Zaesur historisch praezise (September 1914, Marne). Quellmaterial: 9 TUVs + 4 Loesungsblaetter + 3 Hintergrund-MDs eines Kollegen (Silas). Neuer standardisierter Prozess: Themen-Briefing als Phase 0 im ORCHESTRATOR-Workflow definiert. AGENT_INHALT.md um systematischen TUV-Auswertungs-Kanal erweitert (Quelldateien → Kernaussagen → Inhaltsluecken → gezielte Recherche).
- **Artefakte:** `Projekt_Website/THEMEN_BRIEFING_ErsterWeltkrieg_Game1.md`, `Projekt_Website/THEMEN_BRIEFING_ErsterWeltkrieg_Game2.md`, `docs/ORCHESTRATOR.md` (Themen-Briefing-Format + Phase 0), `docs/AGENT_INHALT.md` (TUV-Auswertung + Briefing-Eingabe)
- **Naechster Schritt:** Uebergabe-Prompt fuer Claude Code erstellen → Game 1 durch Agenten-Workflow produzieren

## 2026-03-14
### Phase 2 Audit-Fixes: 16/18 Fixes umgesetzt
- **Phase:** Phase 2: Template-Engine (Qualitaetssicherung)
- **Aufgabe:** Konsolidierte Fix-Liste aus 3 Audits abarbeiten (FIXES_Phase2_Konsolidiert.md)
- **Ergebnis:** 16 von 18 Fixes umgesetzt. Alle 6 Blocker behoben (kritischster: FIX-01 data.json loesung-Typ-Mismatch — Schema, ORCHESTRATOR.md und AGENT_RAETSEL.md korrigiert). Alle 3 Sollte-Fixes behoben. 7 Kann-Fixes behoben. 2 bewusst belassen (FIX-12 Reihenfolge-Text, FIX-17 Passwort). 11 Dateien geaendert.
- **Artefakte:** `escape-engine.js`, `core.js`, `base.css`, `theme-gpg.css`, `lehrkraft.html`, `index.html`, `mappe-template.html`, `data.json`, `ORCHESTRATOR.md`, `AGENT_RAETSEL.md`, `AGENT_TECHNIK.md` (alle aktualisiert). Commit `ddd0ab3` auf `main`.
- **Naechster Schritt:** Phase 3: Erstes Escape-Game (GPG, Industrialisierung) mit dem Agenten-Team produzieren

## 2026-03-13
### Phase 2 Audit: 3 unabhaengige Audits durchgefuehrt
- **Phase:** Phase 2: Template-Engine (Qualitaetssicherung)
- **Aufgabe:** Template-Engine-Code (8 Dateien) dreifach auditieren, Befunde konsolidieren
- **Ergebnis:** Erstaudit (13 Befunde: B1-B4, C1-C4, D1-D5), Verifizierungsaudit (+5 Blindstellen), externes Audit (+8 Befunde N1-N8). Konsolidiert zu 18 priorisierten Fixes. Kritischster Befund: N1/FIX-01 (data.json loesung als String, Engine erwartet Object/Array je Aufgabentyp — Blocker fuer Agent-Pipeline).
- **Artefakte:** `docs/AUDIT_Phase2_Template_Engine.md`, `docs/AUDIT_Phase2_Verifizierung.md`, `docs/FIXES_Phase2_Konsolidiert.md`
- **Naechster Schritt:** Fixes in Claude Code umsetzen

## 2026-03-13
### Phase 2 abgeschlossen: Template-Engine steht
- **Phase:** Phase 2: Template-Engine
- **Aufgabe:** Alle Shared-Code-Dateien und HTML-Templates erstellen, die die Agenten als Infrastruktur voraussetzen
- **Ergebnis:** 8 Dateien erstellt (2928 Zeilen Gesamtcode). base.css (318Z: Reset, Custom Properties, Responsive, Accessibility), theme-gpg.css (530Z: Archiv-Theme Navy/Gold/Pergament, BEM-Klassen, 5 Keyframe-Animationen), core.js (259Z: Storage/Nav/Feedback/Utils IIFE), escape-engine.js (1169Z: 7 API-Funktionen + 5 Aufgabentyp-Renderer), 3 HTML-Templates (index, mappe, lehrkraft), data.json-Schema. Syntaxcheck bestanden, valides JSON. Blocker B1 (zirkuläre Abhängigkeit) damit gelöst.
- **Artefakte:** `assets/css/base.css`, `assets/css/themes/theme-gpg.css`, `assets/js/core.js`, `assets/js/escape-engine.js`, `escape-games/template/index.html`, `escape-games/template/mappe-template.html`, `escape-games/template/lehrkraft.html`, `escape-games/template/data.json`
- **Nächster Schritt:** Phase 3: Erstes Escape-Game (GPG, Industrialisierung) mit dem Agenten-Team produzieren

## 2026-03-12
### Phase 2 gestartet: Übergabe-Prompt Template-Engine erstellt
- **Phase:** Phase 2: Template-Engine
- **Aufgabe:** Übergabe-Prompt für Claude Code erstellen (8 Dateien: base.css, theme-gpg.css, core.js, escape-engine.js, 3 HTML-Templates, data.json-Schema)
- **Ergebnis:** `UEBERGABE_Phase2_Template_Engine.md` erstellt. Spezifiziert alle CSS Custom Properties, JS-API-Signaturen (aus Audit-Fix H3), 5 Aufgabentyp-Renderer, localStorage-Schema, Template-Struktur. Konsolidiert AGENT_TECHNIK + AGENT_DESIGN-Spezifikationen in ausführbare Aufgaben.
- **Artefakte:** `UEBERGABE_Phase2_Template_Engine.md`
- **Nächster Schritt:** Übergabe-Prompt in Claude Code ausführen

## 2026-03-12
### Phase 1 Audit-Fixes erledigt (B2 + H1-H5)
- **Phase:** Phase 1: Subagent-Architektur (Nacharbeit abgeschlossen)
- **Aufgabe:** Übergabe-Prompt `UEBERGABE_Phase1_Fixes.md` in Claude Code ausführen -- 6 Aufgaben (B2, H1-H5)
- **Ergebnis:** Alle 6 Fixes committed + pushed. PFAD_MANIFEST.md (30 verifizierte Pfade), tipps-Schema vereinheitlicht (Objekte), TECHNIK/DESIGN-Abgrenzung, API-Signaturen, zuordnung→Dropdown, Medien-Workflow (MVP=textbasiert). Blocker B1 bleibt (wird durch Phase 2 gelöst).
- **Artefakte:** `docs/PFAD_MANIFEST.md` (neu), `docs/ORCHESTRATOR.md`, `docs/AGENT_RAETSEL.md`, `docs/AGENT_TECHNIK.md`, `docs/AGENT_DESIGN.md` (alle aktualisiert)
- **Nächster Schritt:** Phase 2: Template-Engine erstellen (löst B1)

## 2026-03-12
### Audit Phase 1: Agenten NICHT bereit für Phase 2
- **Phase:** Phase 1: Subagent-Architektur (Nacharbeit)
- **Aufgabe:** Externes Audit aller 8 Agenten-Dateien (docs/) durch separate KI-Instanz
- **Ergebnis:** 2 Blocker, 5 High-Priority, 7 Medium/Low Issues. Blocker 1: Zirkuläre Abhängigkeit (Agenten referenzieren Phase-2-Artefakte die noch nicht existieren). Blocker 2: Inkonsistente Quellpfade. Entscheidung: Phase 2 (Template-Engine) VOR erstem Agenten-Durchlauf. Blocker + High in einem Claude-Code-Durchgang beheben.
- **Artefakte:** `AUDIT_Phase1_Agenten.md` (Briefing), STATUS.md (Audit-Entscheidungstabelle ergänzt)
- **Nächster Schritt:** Übergabe-Prompt für Blocker+High-Behebung erstellen, in Claude Code ausführen

## 2026-03-12
### Phase 1 abgeschlossen: Subagent-Architektur steht
- **Phase:** Phase 1: Subagent-Architektur aufbauen
- **Aufgabe:** 7 Agenten-MDs und Qualitäts-Checkliste in Claude Code erstellen, committen, pushen
- **Ergebnis:** 8 Dateien unter `docs/` erstellt und auf `main` gepusht. ORCHESTRATOR.md (Workflow-Steuerung, data.json-Schema), 6 AGENT_*.md (Didaktik, Inhalt, Rätsel, Technik, Design, Qualität) mit GPG-Lehrplan- und Didaktik-Fundierung, Checkliste_Interaktive_Materialien.md (52 Prüfpunkte in 5 Kategorien). Agenten referenzieren vorhandene GPG-Ressourcen (Lehrplan R7, Didaktik, Methoden, LehrplanPLUS-Fachprofil).
- **Artefakte:** `docs/ORCHESTRATOR.md`, `docs/AGENT_DIDAKTIK.md`, `docs/AGENT_INHALT.md`, `docs/AGENT_RAETSEL.md`, `docs/AGENT_TECHNIK.md`, `docs/AGENT_DESIGN.md`, `docs/AGENT_QUALITAET.md`, `docs/Checkliste_Interaktive_Materialien.md`
- **Nächster Schritt:** Phase 2: Erstes Escape-Game produzieren (GPG, Industrialisierung)

## 2026-03-12
### Phase 1 initiiert: Übergabe-Prompt erstellt, GPG-Artefakte inventarisiert
- **Phase:** Phase 1: Subagent-Architektur aufbauen
- **Aufgabe:** Übergabe-Prompt für Claude Code erstellen, GPG-Didaktik-Artefakte im Filesystem verifizieren, Projektplan korrigieren
- **Ergebnis:** `UEBERGABE_Phase1_Agenten.md` erstellt mit Spezifikationen für 8 Dateien (ORCHESTRATOR.md, 6 AGENT_*.md, Checkliste_Interaktive_Materialien.md). GPG-Artefakt-Inventar durchgeführt -- Audit-Gap "GPG ohne Didaktik-Artefakte" widerlegt: umfangreiche GPG-Ressourcen unter `Repsitory Unterrichtsmaterial/GPG Ressourcen/` vorhanden (GPG_Anleitungen, GPG_Didaktik, GPG_UE, Lehrplan/GPG_R7). Projektplan Sektion 3.2 (Artefakt-Mapping) mit korrekten GPG-Pfaden aktualisiert. Phase-0-Checkboxes finalisiert.
- **Artefakte:** `UEBERGABE_Phase1_Agenten.md`, `Projektplan_Website_Interaktive_Materialien.md` (aktualisiert)
- **Nächster Schritt:** Übergabe-Prompt in Claude Code ausführen

## 2026-03-12
### Phase 0 abgeschlossen: Repository + Pages + Custom Domain
- **Phase:** Phase 0: Projektsetup
- **Aufgabe:** GitHub-Repository anlegen, Verzeichnisstruktur initialisieren, GitHub Pages aktivieren, Custom Domain anbinden
- **Ergebnis:** Repo `weitergehts-online` mit 15 Dateien gepusht (index.html, CNAME, data.json-Schema, Verzeichnisstruktur für assets/css/js/img/audio, escape-games/template, docs, .github/workflows). GitHub Pages auf Branch `main` aktiviert. Custom Domain `weitergehts.online` eingetragen. HTTPS-Zertifikat wird automatisch provisioniert (Let's Encrypt). DNS war bereits konfiguriert (vorheriger Schritt).
- **Artefakte:** https://github.com/snflsknfkldnfs/weitergehts-online (Remote), lokales Repo via Claude Code erstellt
- **Nächster Schritt:** Phase 1: Subagent-Architektur aufbauen

## 2026-03-12
### DNS-Konfiguration + Infrastruktur-Klärungen
- **Phase:** Phase 0: Projektsetup
- **Aufgabe:** Custom Domain für GitHub Pages vorbereiten, offene Infrastruktur-Fragen klären
- **Ergebnis:** DNS bei Namecheap konfiguriert (4x A-Record auf GitHub IPs, CNAME www→github.io). Zoho-Mail-Records (MX, SPF) bewahrt. GitHub-Account identifiziert (snflsknfkldnfs, bestehende User-Site). Entscheidung: kein neuer Account nötig (Custom Domain macht Username unsichtbar). GitHub-MCP evaluiert und verworfen (Aufwand > Nutzen bei <5 GitHub-Operationen). CNAME-Datei in Repo-Verzeichnisstruktur aufgenommen.
- **Artefakte:** `UEBERGABE_Phase0_GitHub.md` (aktualisiert: Custom Domain vollständig operationalisiert, Namecheap-spezifische DNS-Anleitung)
- **Nächster Schritt:** GitHub-Repository anlegen (Übergabe-Prompt ausführen)

## 2026-03-12
### Audit verarbeitet, MVP-Forward-Strategie festgelegt
- **Phase:** Phase 0: Projektsetup
- **Aufgabe:** Externes Audit-Ergebnis auswerten, Umgang mit identifizierten Gaps entscheiden
- **Ergebnis:** 3 kritische Gaps priorisiert (GPG-Didaktik, Interface-Formalisierung, Daten-Operationalisierung), alle für Phase-1-Integration vorgesehen. Sekundäre Gaps in Backlog. Entscheidung: MVP-Forward, Gaps im Prozess schließen.
- **Artefakte:** `STATUS.md` (Audit-Entscheidungstabelle ergänzt)
- **Nächster Schritt:** GitHub-Repository anlegen, Verzeichnisstruktur initialisieren

## 2026-03-12
### Audit-Briefing erstellt
- **Phase:** Phase 0: Projektsetup
- **Aufgabe:** Zusammenfassung für externe KI-Evaluation der SKILL.md
- **Ergebnis:** AUDIT_BRIEFING.md mit vollständigem Kontext (Zielsystem, Architektur, Skalierungsanspruch, vorhandene Artefakte, 8 Audit-Dimensionen)
- **Artefakte:** `AUDIT_BRIEFING.md`
- **Nächster Schritt:** Audit durch externe KI, dann Skill iterieren

## 2026-03-12
### Skill `projekt-website` erstellt
- **Phase:** Phase 0: Projektsetup
- **Aufgabe:** Projektmanagement-Skill bauen
- **Ergebnis:** Skill mit Onboarding-Flow, 3 Modi (Status/Execute/Update), Templates für STATUS/CHANGELOG/PROJEKTPLAN, Onboarding-Leitfaden
- **Artefakte:** `projekt-website.skill`, `STATUS.md`, `CHANGELOG.md`
- **Nächster Schritt:** Skill installieren, dann GitHub-Repo anlegen

## 2026-03-12
### Projektplan erstellt
- **Phase:** Phase 0: Projektsetup
- **Aufgabe:** Architekturentscheidungen und Phasenplan
- **Ergebnis:** Vollständiger Projektplan mit 5 Phasen, adaptierter Subagent-Architektur, Repository-Struktur, Risikomatrix
- **Artefakte:** `Projektplan_Website_Interaktive_Materialien.md`
- **Nächster Schritt:** Skill bauen

## 2026-03-12
### Inspirationsanalyse und Bestandsaufnahme
- **Phase:** Phase 0: Projektsetup
- **Aufgabe:** Archiv 45 (Joscha Falck) analysieren, vorhandene Artefakte inventarisieren
- **Ergebnis:** Referenzarchitektur verstanden (statisches HTML, 6 Subagents, GitHub Pages), umfangreiche Anleitungsartefakte im Bestand identifiziert
- **Artefakte:** Keine neuen Dateien
- **Nächster Schritt:** Projektplan erstellen
