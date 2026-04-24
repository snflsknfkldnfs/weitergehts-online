# Projektstatus: Interaktive Unterrichtsmaterialien -- weitergehts.online

**Letzte Aktualisierung:** 2026-04-24 (**Track C2 MVP DONE + FF-merged** — Gen-Repo main HEAD `1c86806` (FF-merge von Feature-Branch `c2/revisor-modus-quellentext` mit 3 Commits: `c696196` reviewer v0.1.1 + `7e9c3b8` SUB_MATERIAL_QUELLENTEXT v3.12.0 + `1c86806` BEFUND_C2 + Spike-Plan v1.5). Feature-Branch lokal + remote geloescht. **Track C3 Dispatcher-Integration (G3-Phase + Phase 2.0b Sequenzkontext-Pre-Computation + Pro-Material-Verzeichnis-Struktur + Schema v3.10.4) entblockt und startet als naechster Track.** Aufwand laut Spike-Plan §C3: 3-5 Tage. Kritischer Pfad fuer Track-C-Abschluss. Offene Spec-Refinements aus C2 (§J.6 material_id + Reviewer v0.1.2 Recommendations-Priorisierung) opportunistisch in C3-Commits gebuendelt. Vorheriger Eintrag: **Track C2 Revisor-Modus DONE** — Feature-Branch `c2/revisor-modus-quellentext` Gen-Repo mit 3 Commits pushed, **KEIN Merge zu main vor User-Review BEFUND_C2**. Spec-Updates: reviewer-material-quellentext v0.1.0→v0.1.1 (BEFUND_C1 §6 Klarstellungen, Commit `c696196`) + SUB_MATERIAL_QUELLENTEXT v3.11.0→v3.12.0 (§0 Pre-Flight + §J Revisor-Modus 8 Sub-Abschnitte, Commit `7e9c3b8`) + BEFUND_C2 v1.0 + Spike-Plan v1.4→v1.5. End-to-End-Test (3 Opus-Dispatches, 202k Tokens, 395s): Generate→FAIL (SQ-2 Waterberg + Q10 Herero-Adressat) → Revise → Re-Review WARN (beide urspruengliche FAILs PASS, 4 WARN persistiert/emergiert). T2.2 Diff-Lokalisierung 100% (0 kollaterale Aenderungen, 5 inhalt-Edits alle Findings-adressierend, 5 _meta-Edits alle J.3-Ausnahmeliste-legitimiert oder Findings-adressierend). Beide Akzeptanzkriterien C2 erfuellt. Sub-Status MIXED bei Severity-Emergenz: Revisor-Korrektur "vernichten" triggert neuen Q10-WARN (didaktische Vorweginterpretation — Verb nicht im Zitat-Wortlaut). Reviewer-v0.1.2-Refinement-Kandidat (Recommendations-Priorisierung) offen, C3-gekoppelt. Offene Spec-Refinements: §J.6 `material_id` + Schema v3.10.4 fuer `review_iteration`/`review_warnings`/`revisor_notes` (C3-Dispatcher-Scope). Gen-Repo main unveraendert `16b2e21` — Merge pending. Vorheriger Eintrag **Track C1 MVP DONE** — A/B-Test `reviewer-material-quellentext` Opus vs. Sonnet via Cowork-Task-Tool-Pattern, beide 5/5 hart bestanden auf empirischen Smoke-Defekten (Waterberg SQ-1 + Herero-Adressat Q10), confidence 0.92 / 0.91, JSON parsbar. Severity-Kalibrierung divergent (Opus strenger semantisch-didaktisch, Sonnet strenger schema-formal), keine FAIL-Klassen-Inversion, False-Positive-Rate 0/0. Model-Default Opus beibehalten (n=1 Laufzeit-Anomalie Sonnet 3.5x langsamer — Default-Wechsel erfordert n>=3 Retest, opportunistisch in C2/C10). BEFUND `docs/projekt/F0e_REVIEW_AGENT_BEFUND_C1.md` v1.0 committed + FF-Merge Feature-Branch → main (Gen-Repo `bc41627..16b2e21`), Feature-Branch lokal + remote geloescht. Gen-Repo main HEAD `16b2e21`. Spike-Plan v1.3 → v1.4 mit §16 Nachtrag. Drei Spec-v0.1.1-Klarstellungen (MQ-HARD-STOP-Scope, Voelkermord-Severity-Rulebook, Prompt-Strictness-Sentinel) an C2-Auftakt zugeordnet. C2 Revisor-Modus-Integration jetzt entblockt. Vorheriger Eintrag F0e-AEF **Iteration-3 PASS** — Overlay v1.1 + Schema v3.10.3 empirisch gegen Baseline I1+I2 validiert (n=4, `mat-4-3`). §19.7-Akzeptanzkriterien vollstaendig erfuellt: Schema-Pass-Rate **4/4 = 100 %** (Baseline 3/4), D6-Inzidenz **0/4** (Baseline 1/4), Wortanzahl-Cap ≤ 180 **4/4** (108/108/109/118, Varianz Max/Min **1.09** vs. Baseline 2.74), Didaktik-Mittel **4.55** (Baseline 4.15, Min **4.2** vs. Baseline 3.8), D1-D5-Compliance 4/4, Patch-Zyklen 0. **P1-Cluster CLOSED** — PI 3.1 (D6+Schema-Strict), 3.2 (Content-Length), 3.6a (Inhalt-Prosa-Only), 3.7 (Quelle-SSOT) alle empirisch verifiziert. Commit **692e051** auf main gepusht, 36 Dateien. Deliverables: `runs/iteration-3/{PLAN,RUN_META,BEFUND_I3}.md` v1.0 + 4 Runs komplett (subagent_response + partial + merged + 2× gate-report + review), Dispatch-Prompt v2 SHA `640fb89f…`, Schema v3.10.3 Full SHA `f08df7ee…` + Partial SHA `0f3fe48e…` + PROVENANCE-Eintrag, Validator-PIN auf `f08df7ee…`. Promotion Schema v3.10.3 + Overlay v1.1 in Generator-Repo-Kern = separater Track, nicht F0e-Scope. Phase 19.B (PI 3.5/3.6b/3.8) + Phase 19.C (PI 3.4/3.9/3.10) offen. Vorheriger MIXED-Eintrag 2026-04-21 **SUPERSEDED** durch I3-PASS.)
**Modus:** F0e-AEF I3 PASS → Promotion-Track B DONE + gemerged → Pipeline-Aktivierungs-Smoke PASS → Track C0 PM-Verankerung DONE inkl. §22.13-22.17 Nachtraege → Track C1 MVP DONE + gemerged `16b2e21` → **Track C2 MVP DONE + FF-merged Gen-Repo main `1c86806` (2026-04-24)** → **Track C3 Dispatcher-Integration startend (naechster Schritt)**. Tracks C3-C10 im Plugin-Format mit Hybrid-Dev-Workflow. Spec-Refinements aus C2 (§J.6 material_id + Reviewer v0.1.2 Recommendations-Priorisierung) opportunistisch in C3 gebuendelt. Track D reduziert zu Plugin-Publikation + E2E-Performance-Validierung + Checkpoint/Resume post-C10 (5-8 Tage). Phase 19.B/19.C weiter offen. Parallel: F0f Feld-Evidenz (#47) bleibt aktiv. F0g (#48) teil-entblockt durch P1-Cluster-Closure. F0b.2b bleibt DONE.
**Aktiver Upgrade-Plan:** `docs/architektur/UPGRADE_PLAN_v3-12_ESCAPE_GAME_QUALITAET.md` **v1.6** (Runden R0-R8 + v1.3 Delta §19 + v1.4 Delta §20 + v1.5 Delta §21 + **v1.6 Delta §22 Review-Agent-Architektur + Parallel-Dispatch-Infrastruktur, 2026-04-23**). **v1.6 Delta:** Externe Q-Gate-Pruefung via REVIEWER_MATERIAL_<TYP>-Dispatches (BASE + 7 Typ-Specializations), Revisor-Modus in Sub-Material-Agents via Pre-Flight-File-Check, neue Phase 2.0b Sequenzkontext-Pre-Computation (Parallel-Dispatch-Voraussetzung), Breaking-Change Pro-Material-Verzeichnis-Struktur ab v3.11.0, Re-Dispatch-Budget differenziert (G1 max 2 / G2 max 1 / G3 max 1 Revisions-Iteration). Model-Default: Opus bevorzugt, Sonnet Fallback, Haiku ausgeschlossen. Track C0 PM-Verankerung aktiv, Tracks C1-C10 geplant, kritischer Pfad C0-C3: 8-10 Tage. **Empirischer Ausloeser:** Pipeline-Aktivierungs-Smoke mit v3.11.0 quellentext (Gen-Repo post-Merge) bestand alle 6 harten Schema-Akzeptanzkriterien, aber Paul-Review identifizierte 2 strukturelle Defekte (Sequenz-Kohaerenz: "Waterberg" ausserhalb Vorwissen; Fakten: "Befehl an Herero" Adressat-Fehlinterpretation), die Schema-Gates nicht finden koennen — F0d-Confirmation-Bias-Evidenz bestaetigt. **v1.5 Delta:** 10 neue PI-Items (PI 3.1/3.2/3.4/3.5/3.6a/3.6b/3.7/3.8/3.9/3.10), 3.3 gestrichen. 3 neue Q-Gates M16 Prosa-Only (DONE 4/4), M17 Quelle-SSOT (DONE 4/4), M18 Sprachliche Vorentlastung (in 21.B aktivieren). 3 Umsetzungs-Phasen 21.A (P1, DONE via I3-PASS Commit 692e051 + 9d94ca8) / 21.B (P2, offen) / 21.C (P3, offen, PI 3.4 deferred an Promotion-Track). §21.12 I3-PASS-Status-Block mit Metriken-Matrix + Commit-Kette. Entwurfsdatei `F0e_UPGRADE_PLAN_v3-12_PARAGRAPH_19_DRAFT.md` geloescht (Content vollstaendig in §21 ueberfuehrt). Lokaler Branch `claude/silly-shirley` (obsolete §19-Ueberschreibung) geloescht. v1.4 Delta: Trigger T1 Feld-Evidenz + T2 Dispatch-Diagnose. 4 neue PI-Items (PI-DISPATCH-1/2/3 + PI-FELDEVIDENZ-1). 1 neues Q-Gate Q-DISPATCH-ISOLATION (bedingt an F0d-PASS). Pilot-Re-Gating: #39 blockedBy [#46, #47]. Total Plan-Impact-Count **44** (17 R0-FINAL+ + 13 v1.3 Delta + 4 v1.4 Delta + 10 v1.5 Delta). Vorgaenger v3.11 COMPLETE + gepusht. v1.3 Delta §19 Historie unveraendert.

**R0-Befunde (Gate-Status):**
- **G-0-1** (Reife-Matrix): ERFUELLT. `docs/befunde/M-03_REIFE_MATRIX_v3-12_2026-04-11.md`. STATISTIK + QUELLENKRITIK ROT; KARTE/ZEITLEISTE GELB (nicht ROT — Hypothese partiell falsifiziert); BEGRUENDUNG/VERGLEICH/FREITEXT GELB (Kopplung an R0.2).
- **G-0-2** (Umlaut-Fragetyp-ID): ERFUELLT mit Korrektur. `docs/befunde/UMLAUT_FRAGETYP_FORENSIK_R0_2026-04-11.md`. **Drei** (nicht zwei) Sub-Agenten ohne Retrofit (BEGRUENDUNG, VERGLEICH, QUELLENKRITIK) + **ein** Sub-Agent mit Regel-aber-nicht-Enforcement (FREITEXT). O-07-U-B-Checker wird primaerer Schutzmechanismus statt Template-Saeuberung.
- **G-0-3** (G1/G2-Vergleich): ERFUELLT. `docs/befunde/VERGLEICH_G1_G2_SICHTUNG_2026-04-11.md`. 5 von 8 Findings systemisch bestaetigt, 2 v3.6-Policy-spezifisch (G2-exklusiv, Policy-Defekt), G1→G2-Umlaut-Regression dokumentiert.
- **R0.4 Wiki-Scope-Katalog:** LIEGT VOR + aktualisiert mit User-Entscheidungen. `docs/befunde/WIKI_SCOPE_KATALOG_v3-12_PILOT_2026-04-11.md`. Budget Option A (15 Artikel/Game) CONFIRMED. M3 neu generieren CONFIRMED. M4 neueste Infrastruktur CONFIRMED. Drei Katalog-Korrekturen aus R0.5 eingepflegt (Taxis-Titel entfernt, Schlieffen-Denkschrift + Marne-Generale-Cluster + IWM-Belgien-Reportage aufgenommen).
- **R0.5 Testrun Medien-Extraktion M4:** LIEGT VOR. `docs/befunde/TESTRUN_MEDIEN_EXTRAKTION_M4_2026-04-11.md`. Viability POSITIV. Dual-Kanal-Pflicht (WebFetch + Commons) bestaetigt. Drei Korrekturen: (a) wikipedia-mcp Config-Fix `--language de`, (b) Katalog-Ersatz fuer Taxis_von_der_Marne, (c) Medien-Erweiterung um 3 Cluster. Alle 21 inventarisierten Medien lizenzkonform (15 PD, 6 CC BY-SA, 0 Blocker).
- **R0.6 Titel-Verifikation (MCP-gestuetzt):** LIEGT VOR. Im WIKI_SCOPE_KATALOG §8 eingepflegt. **9 von 28 Original-Titeln ungueltig.** Korrekturen: `Juli-Krise`→`Julikrise`, `Europaeische_Buendnisse`→`Dreibund`+`Triple_Entente`, `Wilhelm_II_Aussenpolitik`→`Weltpolitik`+`Wilhelm_II._(Deutsches_Reich)`, `Britisch-deutsches_Wettruesten_zur_See`→`Flottengesetze`, `Kriegsbegeisterung_1914`→ENTFERNT (redundant zu Augusterlebnis), `Ultimatum_an_Serbien`→`Kriegserklaerung_Oesterreich-Ungarns_an_Serbien`, `Deutscher_Einmarsch_in_Belgien_1914`→`Deutsches_Ultimatum_an_Belgien`+`Eroberung_von_Luettich_(1914)`, `Taxis_von_der_Marne`→ENTFERNT (R0.5). Neue Game-Gesamtzahl: 14 Kern-Artikel + 16 Scope-Artikel. Pflicht-Invariante fuer Phase-0.2.M Sub-Agent: Pre-Ingest-Titel-Validierung via `get_summary`.
- **R0.7 bpb.de-Dossier Viability-Eval:** LIEGT VOR (inkl. §12-Erweiterung). `docs/befunde/TESTRUN_BPB_DOSSIER_2026-04-11.md`. PASS mit Einschraenkung + vier erweiterte Nutzungs-Muster. bpb-Dossiers sind standardisiert abrufbar via markdownify `webpage-to-markdown` (Volltext, 62KB/Artikel) + WebFetch (Medien-Inventur). Kein dedizierter MCP-Connector noetig. **Lizenz CC BY-NC-ND 4.0** verbietet bpb-Autorentext in Volltext-Ingest-Pipeline. **Aber**: §12 identifiziert vier Umgehungs-/Erweiterungs-Muster: (A) Dossier-Struktur als Q-Gate-Coverage-Raster (Ideen sind frei), (B) Medien-Kuratierung als Qualitaetsstempel (bpb-Commons-Medien laufen ueber Commons-Lizenz weiter, bpb-Bildunterschriften als Kurzzitat), (C) **Primaerquellen-Extraktion** (Reden/Erlasse/Tagebuecher, die bpb zitiert, haben eigenes Urheberrecht am Original-Autor; fuer WWI-Scope typisch PD: Wilhelm II. †1941 seit 2012, Bethmann Hollweg †1921 seit 1992, Tirpitz, Moltke d.J., Ludendorff, Hindenburg, Clemenceau alle PD; amtliche Werke §5 UrhG zeitlos gemeinfrei), (D) reine Struktur-Inspiration. **Architektonisch entscheidend**: PD-Primaerquellen duerfen in Phase 0.1 Volltext-Ingest mit Paraphrase/Kuerzung/Schueler-Vereinfachung — das hebelt die NC-ND-Beschraenkung systematisch aus. bpb wird damit zu einem Discovery-Mechanismus fuer didaktisch vorqualifizierte, gemeinfreie Primaerquellen. Drei Wiki-Scope-Luecken: Kriegsoekonomie, Frauen-Heimatfront, Kulturkrise. Phase 0.2.Z enthaelt nach User-Direktive 2026-04-11 (`bpb_zitat_kurator` streichen um kein Lizenz-Risiko einzugehen) **genau einen** Sub-Agent `bpb_primaerquellen_extraktor` mit PD-Pruefung via Wikipedia-Autor-Todesjahr-Lookup. Invarianten PQI1-PQI6 in §12.4. bpb-Autorentext ist vollstaendig aus der Pipeline ausgeschlossen. Discovery = optionale URL-Eingabe durch Lehrkraft (§14, refaktoriert 2026-04-12).

**R0-TESTRUN-AUDIT (Stand 2026-04-18, Gate ROT):**
- **Scope:** Retrospektive 5-RA-Multi-Agenten-Audit auf Testrun-Artefakt `deutscher-nationalismus-kolonialismus` (3 Sessions, 3337 Messages, 1153 Tool-Calls, 12 Auto-Kompaktionen, 5 Subagenten-Spawns). Verzeichnis: `docs/projekt/testrun-nationalismus-kolonialismus/`.
- **5 RAs + Gate-Urteile:** RA1 Pipeline (GELB, 13 Findings), RA2 Didaktik/Material (GELB, 15 Findings), RA3 Engine/Assembly (AMBER, 9 Findings), RA4 Medien/Lizenz (ROT, 13 Findings), RA5 PM/Prozess/Meta (ROT, 11 Findings). Aggregat-Gate: ROT (durchgetrieben durch RA4 + RA5).
- **Finding-Bilanz:** 60 Findings total — **6 P0**, 22 P1, 22 P2, 10 P3.
- **P0-Blocker-Kanon (v3.12-Pilot blockierend):**
  - P0-1 F-RA1-05 Phase 3.1 Deploy-Preparation uebersprungen (Pipeline-Defekt)
  - P0-2 F-RA1-06 V13-Patch-Regression Hefteintrag-Verschachtelung
  - P0-3 F-RA3-01 Lueckentext-Pool-Reset-Bug (escape-engine.js Z. 2814 single-line-fix)
  - P0-4 F-RA4-04 Source-Deploy-Drift mat-3-4.json (Hallu-Caption persistiert in Source)
  - P0-5 F-RA4-10 Mappe-4 Retro-Patch offen (img-4-1/-3/-4 Herero/Nama)
  - P0-6 F-RA4-02 Keine prospektive Medien-Verifikation (MV2-Hallu-Rate 6/18)
- **F-P1/F-P2-Wiederkehrpruefung:** F-P1 (ORCH als Router) **NEUTRALISIERT** durch v3.9 Steuerungsrefaktor. F-P2 (Phase 3 in Cowork) **TEILWEISE REZIDIV** in neuer Variante "CC→Cowork-Rueckmelde-Luecke" (RA5 F-RA5-11).
- **Cross-RA-Muster:** MV2-Hallu-Rate 6/18 bestaetigt mit Typ-Klassen-Analyse (Hallus bei Archiv-Signaturen + Eigennamen + konstruierten Deskriptiven). R0.5 Dual-Kanal strukturell nicht implementiert. CC BY-SA Attribution unvollstaendig. Kompaktions-induzierte Regressionen bei Patch-Zyklen. Re-Flag-Pattern: User musste Umlaute 3x, Mappe-3-Status 2x melden.
- **Plan-Impact v1.3 Delta (13 neue PI-Items):**
  - Cluster Medien (4): PI-MV2-EXT1 Source-Deploy-Propagation, PI-MV2-EXT2 Mappe-4-Retro-Patch, PI-MV2-EXT3 CC BY-SA Attribution-Schema, PI-MV2-EXT4 Didaktisches Ersatz-Rueckkopplung
  - Cluster Engine (3): PI-ENGINE-1 Hefteintrag-Dualstruktur, PI-ENGINE-2 Assembly-Validator, PI-ENGINE-3 Entity-Encoding-Pipeline-Hardening
  - Cluster Didaktik (2): PI-DIDAKTIK-1 Typ-Selektions-Katalog R7, PI-DIDAKTIK-2 A18-Luecke
  - Cluster PM (4): PI-PM-1 Post-Kompaktions-Re-Orientation, PI-PM-2 CC→Cowork-Handoff-Template, PI-PM-3 STATUS-Freeze bei Patch-Zyklen, PI-PM-4 Re-Flag-Pattern-Detektor
  - zusätzlich PI-PIPELINE-1 Patch-Propagation-Check
- **Neue Q-Gates (4):** Q-MEDIEN-PROSPEKTIV (MV2-Pre-Ingest-Verifikation via Commons-API), Q-LIZENZ-COMPLIANCE (CC BY-SA Attribution-Schema-Enforcement), Q-SOURCE-DEPLOY-PARITY (mat-*.json Source↔Deploy-Hash-Check), Q-TYP-R7-KONFORMITAET (Typ-Selektions-Katalog-Enforcement).
- **Referenzen:**
  - Konsolidierter Befund: `docs/projekt/testrun-nationalismus-kolonialismus/BEFUND_TESTRUN_N-K_KONSOLIDIERT.md`
  - 5 Einzelberichte: `BERICHT_RA{1,2,3,4,5}_*.md` in `docs/projekt/testrun-nationalismus-kolonialismus/`
  - UPGRADE_PLAN v1.3 Delta: `docs/architektur/UPGRADE_PLAN_v3-12_ESCAPE_GAME_QUALITAET.md` Section 19
- **Naechster Schritt:** Task #7 Verifikations-Gate (Konsistenz-Check BEFUND ↔ 5 BERICHTE ↔ UPGRADE_PLAN ↔ STATUS ↔ CHANGELOG ↔ CHARTAS). Danach P0-Blocker-Abarbeitung als Pre-Pilotlauf-Task-Paket.

---

## F0e Didaktisches Audit (Work-Stream, Stand 2026-04-19 ABGESCHLOSSEN)

**Grund:** Pre-Pilot-Triage v1 klassifiziert nur nach Pipeline-Trigger-Wahrscheinlichkeit. Blind-Spot: Produkt-Qualitaets-Impact (PQI) stabiler didaktischer Defekte, die in jedem Run mitshippen. F0e integriert PQI als 2. Klassifikations-Achse.

**SSoT-Artefakte (final):**
- `docs/projekt/testrun-nationalismus-kolonialismus/F0e_DIDAKTISCHES_AUDIT_PLAN.md` v1.2 (Master-Plan; alle Phasen DONE).
- `docs/fachdidaktik/LEHRPLAN_QM_GPG7_MITTELSCHULE.md` v1.0 (Fundamentartefakt committed ec3f971).
- `docs/fachdidaktik/LP_QM_AUFBAU_PLAN.md` (Build-Plan, DONE).
- `docs/projekt/testrun-nationalismus-kolonialismus/F0e_BEFUND_DIDAKTIK.md` v1.0 (konsolidierter Dual-Auditor-Befund; 9 PQI-1, Diskrepanz-Resolution, 6 Stichproben-Verifikation).
- `docs/projekt/testrun-nationalismus-kolonialismus/F0e_BEFUND_DIDAKTIK_alpha.md` (Alpha-Auditor-Output; 302 Z.).
- `docs/projekt/testrun-nationalismus-kolonialismus/F0e_BEFUND_DIDAKTIK_beta.md` (Beta-Auditor-Output; 371 Z., 60 Findings re-klassifiziert).
- `docs/projekt/testrun-nationalismus-kolonialismus/PRE_PILOT_TRIAGE_MATRIX_v2.md` v2.1 (3-Achsen-Klassifikation + Batch-4-Scope F0a/F0b/F0c + Trade-off-Tabelle + User-Decision-Prompt).

**Phasen-Fortschritt:**
- F0e.0 Plan geschrieben — **DONE** (Task #23)
- F0e.0 STATUS + CHANGELOG — **DONE** (Task #24)
- F0e.1 Rubric + Handoff — **DONE** (Task #25/#26) mit LP-QM-Primaer-Ankopplung
- LP-QM L1-L4 (Fundamentartefakt) — **DONE** (Task #33-36, commit ec3f971)
- F0e.2 Dual-Subagent-Audit-Run Alpha+Beta — **DONE** (Task #27/#28)
- F0e.2b Befund-Konsolidierung Alpha+Beta — **DONE** (Task #32, F0e_BEFUND_DIDAKTIK.md v1.0)
- F0e.3 Matrix v2 PQI-Integration — **DONE** (Task #29, PRE_PILOT_TRIAGE_MATRIX_v2.md v2.0)
- F0e.4 Batch-4-Scope-Recommendation v2 — **DONE** (Task #30, PRE_PILOT_TRIAGE_MATRIX_v2.md v2.1)
- F0e.5 PM-Close + Commit — **IN_PROGRESS** (Task #31, dieser STATUS+CHANGELOG-Edit, dann Commit via Host-MCP)

**Kern-Ergebnis F0e:**
- 9 PQI-1 Findings konsolidiert (3 KONV, 6 ALPHA-unique, 2 BETA-unique)
- 21 A-CODE + 6 A-PROZ Items in Matrix v2.1 mit Pflicht-Verankerung A1-A6 + A-PROZ 1-5
- 3 Batch-4-Pfade: F0a Minimal (1 Tag, 6/9 PQI-1) / F0b Full-Didaktik (2-3 Tage, 9/9) / F0c Full-Pre-Pilot (4-5 Tage)
- **Primaer-Empfehlung F0b** (Hallu-Hard-Gate + Sprach-Gate + Coverage-Beleg fuer pilot-valide Auswertung noetig)

**Artefakt-Inventar F0e (final):**
- `F0e_DIDAKTISCHES_AUDIT_PLAN.md` v1.2 (Master-SSoT, alle Phasen DONE)
- `F0e_AUDIT_RUBRIKEN.md` v2 (committed ec3f971)
- `F0e_HANDOFF_DIDAKTIK_AUDITOR.md` v2 (committed ec3f971)
- `LEHRPLAN_QM_GPG7_MITTELSCHULE.md` v1.0 (committed ec3f971)
- `LP_QM_AUFBAU_PLAN.md` (committed ec3f971)
- `LEHRPLAN_QM_GPG7_L2_BEFUELLUNG.md` (committed ec3f971)
- `F0e_BEFUND_DIDAKTIK_alpha.md` (NEW, Alpha-Auditor-Output, 302 Z.)
- `F0e_BEFUND_DIDAKTIK_beta.md` (NEW, Beta-Auditor-Output, 371 Z., 60 Findings)
- `F0e_BEFUND_DIDAKTIK.md` v1.0 (NEW, konsolidierter Befund, 9 PQI-1)
- `PRE_PILOT_TRIAGE_MATRIX.md` v1 (Vorgaenger)
- `PRE_PILOT_TRIAGE_MATRIX_v2.md` v2.1 (NEW, 3-Achsen + Batch-4-Scope-Recommendation)

**Naechster Schritt F0e:** F0e.5-Commit-Freigabe durch User (4 neue Artefakte + STATUS + CHANGELOG via Host-MCP staging). Danach User-Entscheidung Batch-4-Scope F0a/F0b/F0c.

**Compaction-Protokoll:** Bei Kontext-Verlust liest naechster Claude (1) `F0e_DIDAKTISCHES_AUDIT_PLAN.md` §10 State-Marker, (2) `LP_QM_AUFBAU_PLAN.md` §6 State-Marker, (3) diesen STATUS-Block — rekonstruiert Zustand vollstaendig.

**Plan-Impact R0-Befunde (muss in UPGRADE_PLAN v1.3 nachgezogen werden):**
1. Runde 1 Arbeitspaket 1 Umlaut-Retrofit: Scope **drei** Fragetypen (nicht zwei).
2. Runde 1 Arbeitspaket 4 O-07-U-B-Checker: nicht optional, sondern Pflicht-Gate-Hook.
3. Runde 2 Arbeitspaket 8 M-03-Reife-Programm: STATISTIK + QUELLENKRITIK Pflicht-Einsatz im Pilot. Pflicht-Anker fuer QUELLENKRITIK = `Schlieffen-Denkschrift.jpg` in M4 (R0.5-Empfehlung).
4. Runde 4 Fiktions-Klausel: muss v3.6-Erzaehlerstimmen-Policy revidieren (H2 aus R0.3).
5. Runde 5 Medien-Diversitaet: Pflicht-Quoten-Q-Gate (nicht nur Sub-Agenten-Verbesserung).
6. Runde 2 Arbeitspaket 2 Phase-0.2.M: Dual-Kanal-Pflicht fuer Medien-Sub-Agent (WebFetch-Artikel-Inventur + Commons-Suche, R0.5 §8.2). Pre-Requisite: wikipedia-mcp Config-Fix `--language de` (R0.5 §7).
7. Runde 2 Arbeitspaket 5 Plan-vs-Wirklichkeit-Matrix: M4-Vergleich-Aufgabe wird darueber neu gebaut (User-Entscheidung Session 29), nicht aus G1 v3.11 uebernommen.
8. Runde 2 Arbeitspaket 5 QuellentextMehrstimmen: M3-Pilot-Fall = komplette Neu-Generierung (User-Entscheidung Session 29).
9. Runde 2 Arbeitspaket 2 Phase-0.2.M: Pre-Ingest-Titel-Validierung via `mcp__wikipedia__get_summary` PFLICHT (R0.6). Kein Auto-Swap, kein Fallback-Heuristik — harter Abbruch bei ungueltigem Titel.
10. NEU Phase 0.2.Z "bpb-Quell-Integration" (R0.7, refaktoriert 2026-04-11 nach User-Direktive `bpb_zitat_kurator` streichen um kein Risiko einzugehen): Optionale Sub-Phase parallel zu 0.2.M, aktiv nur wenn bpb fuer ein Game via User-Bestaetigung freigegeben wurde. Enthaelt **genau einen** Sub-Agent `bpb_primaerquellen_extraktor` (kein `bpb_zitat_kurator`, kein bpb-Autorentext-Ingest). Tools: markdownify + WebFetch + `mcp__wikipedia__get_summary`. bpb-Autorentext ist vollstaendig aus der Pipeline ausgeschlossen (keine Zitate, keine Bildunterschriften). bpb fungiert ausschliesslich als Discovery-Mechanismus fuer (a) PD-Primaerquellen, (b) didaktisch qualifizierte Commons-Medien, (c) Dossier-Gliederung als Q-Gate-Raster.
11. NEU Wiki-Scope-Katalog-Luecken-Pruefung (R0.7): Drei bpb-Themenbereiche pruefen, die im aktuellen §8-Katalog fehlen — Kriegsoekonomie, Frauen-Heimatfront, Kulturkrise. Lehrplan-abhaengig aufnehmen (nicht automatisch).
12. NEU Sub-Agenten-Invariante "Lizenz-Pre-Check" (R0.7): Fuer alle Nicht-Wikipedia-Quellen gilt vor Ingest ein Lizenz-Check. Quellen mit ND-Klausel duerfen nicht in die Volltext-Ingest-Pipeline. bpb-Text ist dauerhaft gesperrt. Pflicht-Gate-Hook analog zu Titel-Validierung aus R0.6.
13. NEU medien_katalog_game.json Schema-Erweiterung (R0.7 §12.2, refaktoriert): Felder `bpb_verifiziert`, `bpb_discovery_url`, `bpb_didaktische_einordnung` (nur Paraphrase/Notiz, kein wortgetreues Zitat). Feld `bpb_bildunterschrift_zitat` **gestrichen** nach User-Direktive. Sub-Agent 0.2.M erweitert um parallele bpb-Abfrage, Match ueber Bundesarchiv-ID / Bildname. bpb-Kuratierung als didaktischer Qualitaetsstempel, reduziert Sichter-Workload in Runde 5. Medien selbst laufen weiter ueber Commons-Lizenz.
14. NEU Artefakt `primaerquellen_katalog_game.json` (R0.7 §12.3-§12.4): Paralleler Katalog-Typ zu medien_katalog_game.json. Enthaelt PD-verifizierte Primaerquellen (Reden, Erlasse, Tagebuecher, Gedichte, amtliche Werke) inklusive Original-Archiv-URL. Darf in Phase 0.1 Volltext-Ingest-Pipeline, weil PD = keine Bearbeitungs-Beschraenkung. Discovery erfolgt ueber bpb-Artikel, Volltext erfolgt aus Original-Archiv (Wikisource, Deutsches Textarchiv, Bundesarchiv). Artefakt `zitat_katalog_game.json` ist mit Streichung `bpb_zitat_kurator` **entfallen**.
15. NEU Q-Gate "Q-STRUKTUR-bpb-Coverage" (R0.7 §12.1): Runde 4 oder Phase 0.1-Schaerfung. Pflicht-Mapping jeder bpb-Dossier-Kapitel auf Mappen-Zuordnung oder explizite Ausschluss-Begruendung. Keine stille Luecken. Gliederungsuebernahme ist urheberrechtlich unproblematisch (Idee vs. Ausdruck).
16. NEU Sub-Agent `bpb_primaerquellen_extraktor` (R0.7 §12.4): Einziger Sub-Agent in Phase 0.2.Z. Workflow: markdownify → Regex/Heuristik auf Primaerquellen-Zitate → Autor-Todesjahr via `mcp__wikipedia__get_summary` → PD-Regel `todesjahr + 70 < aktuelles_jahr` → Original-Archiv-Suche via WebSearch auf Wikisource/DTA/Bundesarchiv → Aufnahme in primaerquellen_katalog_game.json. Invarianten PQI1-PQI6. Amtliche Werke (§5 UrhG) auto-PD ohne Todesjahr-Check. Bei PD-Unsicherheit: konservativer Abbruch.
17. NEU bpb-Discovery-Mechanismus (R0.7 §14, refaktoriert 2026-04-12 nach User-Direktive): Optionale URL-Eingabe durch Lehrkraft ueber Game-Metadaten-Feld `bpb_dossier_url`. Kein Registry-Artefakt, kein Discovery-Sub-Agent, kein Bestaetigungs-Persistenz-Artefakt. Wenn URL vorhanden: markdownify + `bpb_primaerquellen_extraktor` + Medien-Hook. Wenn keine URL: Pipeline laeuft Wikipedia-only (Standard). Begruendung: URL-Recherche ist fuer Lehrkraft trivial (`bpb.de → Themen → Bereich` oder `site:bpb.de [thema]`). Wikipedia-Kern-Artikel muessen allein zu hinreichender Qualitaet fuehren. bpb erweitert, ersetzt nicht. Ueberproportionaler Automatisierungsaufwand (Registry + Discovery-Agent + Bestaetigungs-Gate) steht nicht im Verhaeltnis zum Nutzen.
**Offene Folgetickets:**
- ~~**P1-NEU Ursachen-Titel-Drift**~~ **CLOSED 2026-04-10**: Richtung A umgesetzt. Landing-Page `<li id="game-gpg-erster-weltkrieg-ursachen">`-Text geaendert von "Pulverfass Europa – Der Erste Weltkrieg (GPG R7)" zu "Der Erste Weltkrieg — Ursachen und Ausbruch (GPG R7)". `data.json.meta.titel` unveraendert als Single-Source. Regression-Check via `./tools/deploy-check.sh gpg-erster-weltkrieg-ursachen` + Marne-Regression: beide PASS. Marketing-Framing "Pulverfass Europa" entfallen — ggf. in Folgeprojekt als separater Untertitel-Block nachziehen falls pedagogisch gewuenscht.
- **P1 v3.10-Folgearbeiten** (zurueckgestellt per Q5=c waehrend v3.11 lief): T2.F (typ-spezifische Meta-Sub-Schemata via oneOf-Discriminator), 21 mat-*.json Migrations-Backlog (Q4 vorwaertsgetrieben, siehe `docs/projekt/berichte/BERICHT_SCHEMA_MIGRATION_2026-04-10.md`).

---

## F0b Full-Didaktik (Work-Stream, Stand 2026-04-19 — B1-B7 + CC-Handoff A1-A4 AUSGEFUEHRT)

**Grund:** F0e-Primaer-Empfehlung. 11 Mechanismen M1-M11 aus PQI-1 Findings + LP-QM-Koppelung in 7 Bundles (B1-B7) umgesetzt. Prevent-first-Architektur: Priming > Schema > Q-Gate > Template > Prosa-Checkliste. Ebenen-Trennung strikt: Content (Testrun-Befunde) ist Grundlage, Ausfuehrung bleibt themen-unspezifisch.

**Bundle-Fortschritt:**
- B1 F0B_PRIMING_INCLUDE.md SSoT + Hash-kanonisierung — **DONE**
- B2 4 Config-JSONs (themen-unspezifisch) — **DONE**
- B3 VERTRAG + Sub-Agent-Ebene-0 + ORCH Q-Gate-Taxonomie — **DONE**
- B4 22 Sub-Agent-Prompt-Edits (Marker-Block-Verweise auf SSoT + agent-spezifische Zusatzinvarianten) — **DONE**
- B5 Config-JSONs in architektur/ platziert + Registry mit sha256-Hash + scope_nutzung — **DONE**
- B6 E2E-Pilot-Checklist v3.12 (Pre-Flight bis Post-Pilot-Drift-Audit, 11 Sektionen, themen-unspezifisch) — **DONE**
- B7 CC-Handoff-Paket HANDOFF_CC_F0b_v1.md (A1-A4, JSON-Rueckmelde-Protokoll) — **DONE**
- F0b.2b CC-Handoff-Ausfuehrung A1+A2+A4 — **DONE** (2026-04-19 Run-ts 20:20 UTC; Rueckmeldung `docs/projekt/cc_responses/response_f0b_a1-a4.json` 7818 Bytes; Hash-Check MATCH f6e826..., 22/22 consumers_with_marker; 2 Commits lokal escape-game-generator `5a458b3` + weitergehts-online `506e127`, UNGEPUSHT)
- F0b.2b CC-Handoff A3.1 Engine-Fix — **WITHDRAWN** (2026-04-19; doppelt obsolet: (1) HANDOFF-Spec beschrieb Phantom-SCPL-`kinder[]`-Rekursion die in der Engine nie existierte, (2) der real existierende F-RA3-01 Pool-Reset-Bug an Z. 2798 wurde bereits **2026-04-18 in Commit `a4f8c19`** gefixt (`fix(engine): Lueckentext-Pool-Reset verwendet Klasse statt disabled-Attribut`); Verifikation 2026-04-19: `assets/js/escape-engine.js:2798` prueft `classList.contains('aufgabe__pool-wort--used')`, nicht `.disabled`; kein CC-Rerun, kein Fake-Dogfood; HANDOFF-Block auf WITHDRAWN gesetzt; F-RA1-06 Hefteintrag-Verschachtelung bleibt offen, Re-Triage in F0b.3b)
- Push beider Repos via Host-MCP — **DONE** (2026-04-19; 3 Tranchen je Repo; escape-game-generator HEAD nach Push: B3-B4-Agents; weitergehts-online HEAD: docs(f0b))
- Prevent-First-Gate §3+§2+§5 (tools/cc-launch-preflight.sh + tools/cc-launch-TEMPLATE.sh + CC_COWORK_INTEROP_LEARNINGS.md §1.x) — **DONE** (2026-04-19; 5-Gate-Praeflight Pfad+Prompt-Size+Nested-Pfad-Detektor+cc-launch-Praesenz; TEMPLATE mit stdin-pipe + Preflight-Hookup; Interop v1.1 mit §1.1 Launcher-Kanon v2 / §1.2 Host-Dual-Root-Regel / §1.3 v1→v2-Incident; Self-Test 3/3 PASS: valid-config, nested-pfad-detect, add-dir-enoent; verpflichtend fuer alle neuen CC-Handoffs)
- A3.1 HANDOFF-Korrektur + CC-Mini-Rerun — **CANCELLED** (obsolet; A3.1 WITHDRAWN weil Fix bereits in a4f8c19 2026-04-18 im Code; Gate-Dogfood folgt bei F0b.3 E2E-Pilot-Launch)
- E2E-Pilot v3.12 Durchfuehrung — **PENDING** (braucht A3.1-Rerun-PASS + Thema-Wahl)
- F0b.3b Drift-Audit nach Pilot — **PENDING**
- F0b.4 Close + Commit — **PENDING**

**SSoT-Artefakte F0b (final):**
- `escape-game-generator/agents/_includes/F0B_PRIMING_INCLUDE.md` (Priming-Kanon, sha256 `f6e826428046284accf404b927ebddac00554ee549f7427ff414f9d6ea4f7ac7`)
- `escape-game-generator/architektur/sprachniveau_include_registry.json` (22 Konsumenten + Marker-Tags + scope_nutzung + Aktualisierungs-Protokoll)
- `escape-game-generator/architektur/trigger_keywords.json` (6 Kategorien, scan_ziel, aktiviert_gates)
- `escape-game-generator/architektur/perspektiv_enum.json` (10 Werte, harte Pool-Trennung dominant/nicht_dominant, coverage_regel_qg06)
- `escape-game-generator/architektur/kolonial_terminologie_blacklist.json` (11 Muster + Alternativen + Primaerquellen-Ausnahme-Kontext)
- `escape-game-generator/architektur/wortschatz_r7_core.json` (R7-Fachwort-Lexikon LB1-LB4, Morphem/Nominalstil/Konjunktiv-Heuristiken, DaZ-Regeln)
- 22 Agent-Prompt-Edits in `escape-game-generator/agents/` (AGENT_MATERIAL/HEFTEINTRAG/RAETSEL/SKRIPT/INHALT, SUB_TEMPLATE_MAPPENABSCHLUSS, SUB_ASSEMBLY_VERIFY, 7 SUB_MATERIAL_*, 8 SUB_AUFGABE_*)
- `weitergehts-online/docs/projekt/E2E_PILOT_CHECKLIST_v3-12.md` (11 Sektionen Pre-Flight → Post-Pilot)
- `weitergehts-online/docs/projekt/HANDOFF_CC_F0b_v1.md` (Task-Block A1 8 primaere + 2 Ergaenzungs-Scripts, A2 6 Schemata, A3 Engine-Fix escape-engine.js:2814 + Jest-Test, A4 Marker-Tag-Kanon + CI-Hook)
- VERTRAG-Updates in Sub-Agent-Dateien (Ebene-0-Invarianten + Q-Gate-Taxonomie in ORCH bereits in B3 committed)

**Mechanismen-Abdeckung M1-M11:**
- M1 R7-Sprachniveau-Gate (Ø≤15, max≤25, Fachwort-Dichte ≤12%, Nominalstil ≤20%, Konjunktiv ≤5%, Morpheme ≤4) → Priming §2 + `wortschatz_r7_core.json` + V17 Runtime-Metrik (Script-Target Batch A1)
- M2 Titel-Validierung R-TITEL-1..3 + `trigger_categories[]` Pflichtfeld → Phase 0.2.M Invariante in AGENT_INHALT.md + `trigger_keywords.json` (Script-Target Batch A1)
- M3 Perspektiv-Enum mit harter Pool-Trennung → `perspektiv_enum.json` + SUB_MATERIAL_* Invarianten + QG-06 Durchsetzung (Script-Target coverage-report.sh)
- M4 Trigger-Kategorien-Gate-Aktivierung → `trigger_keywords.json` + Sub-Agent-Prompt-§3 in allen 22 Dateien
- M5 Kolonial-Terminologie-Blacklist mit Primaerquellen-Ausnahme → `kolonial_terminologie_blacklist.json` + SUB_MATERIAL_QUELLENTEXT-Sonderregel (Script-Target terminologie-scanner.sh V18)
- M6 Entity-Konsistenz-Scan V14 → AGENT_SKRIPT §4 + AGENT_MATERIAL + SUB_AUFGABE_* (Script-Target entity-scanner.js)
- M7 Assembly-Verify-Kette V14-V20 → SUB_ASSEMBLY_VERIFY.md Hook-Dokumentation
- M8 Priming-Include-Hash-Drift-Check V16 → `sprachniveau_include_registry.json` + priming-hash-check.sh (Script-Target A1 Ergaenzung)
- M9 Multiperspektiv-Synthese-Rubrik → SUB_TEMPLATE_MAPPENABSCHLUSS §5 (Script-Target multiperspektiv-sanity.js V19)
- M10 Source-Deploy-Parity-Referenz V20 → bereits P0-A4 (tools/source-deploy-parity.sh) + Verlinkung in SUB_ASSEMBLY_VERIFY
- M11 Pflicht-Marker-Tag-Kanon `[F0B_PRIMING_v1 BEGIN ... END]` → durchgezogen in allen 22 Prompts + CI-Hook priming-hash-check.sh (Script-Target A4)

**Naechster Schritt F0b:** (1) E2E-Pilot v3.12 mit Thema-Wahl LB2 (Absolutismus/Revolution, mittlere Trigger-Aktivierung) oder LB4 (Imperialismus/Kolonialismus, hohe Trigger-Aktivierung, Stress-Test Nicht-Dominant-Perspektiven + Blacklist) — Launcher-Erstellung via Kopie `tools/cc-launch-TEMPLATE.sh` (erster Gate-Dogfood). (2) F0b.3b Drift-Audit nach Pilot. (3) F0b.4 Close + Commit.

**F0b.2b-Ausfuehrungs-Nachweis (Dry-Runs, alle auf Fixture `escape-games/deutscher-nationalismus-kolonialismus`):**
- priming_hash_check --strict: PASS (hash_match=true, 22/22 Konsumenten mit Marker-Tag)
- source_deploy_parity_nk: MATCH (Live-Repo = Source)
- trigger_detector_nk: PASS (6/6 Kategorien via Markdown-INHALTSBASIS)
- titel_validator_nk: PASS (fail=0, warn=1 kein LB-kanonischer Terminus)
- coverage_report_nk: PASS (4 Mappen, 4x qg06_pass=true via trigger_relevant=false)
- entity_scanner_nk: PASS (91 Files, 207/297/5/58 Entities, cross_violations=0)
- terminologie_scanner_nk: FAIL erwartet (2 schutzgebiet-Treffer = Legacy-N-K-Content vor F0b-Regeln)
- sprachniveau_gate_nk: FAIL erwartet (82/268 fields_failed = Legacy-N-K-Content)
- deploy_check_nk inkl. DEPLOY-07: GESAMT=PASS (DEPLOY-01..07 + DEPLOY-07-SHA)
- multiperspektiv_sanity_nk: SKIPPED (perspektiv_inventar-Fixture fehlt — A1.5 hat bei trigger_relevant=false leeres Inventar erzeugt)

**Pfad-Drift-Learning (F0b.2b):** Host-Layout ist **dual-root** auf `/Users/paulad/`-Ebene — `escape-game-generator/` und `weitergehts.online/weitergehts-online/` sind Geschwister, nicht verschachtelt. HANDOFF nutzte relative Pfade (korrekt); v1-Launcher + v1-Prompt hatten fehlerhafte Nested-Pfade, v2 korrigiert. Invariante: Alle CC-Handoff-Launcher + -Prompts MUESSEN absolute Pfade gegen den Host-Dual-Root pruefen (Prevent-First-Gate §2).

**Ablage-Vereinheitlichung (F0b.2b):** Alle A1-Scripts liegen in `escape-game-generator/tools/` (nicht separates `scripts/`-Verzeichnis). HANDOFF-Preamble hatte `tools/` vorgegeben; `scripts/...`-Einzelparagraphen war Pfad-Prefix-Konvention aus Vertragstexten. Entscheidung: Single-Location `tools/` kanonisch fuer alle F0b-Utilities.

**Compaction-Protokoll F0b:** Bei Kontext-Verlust liest naechster Claude (1) `F0b/F0B_PRIMING_INCLUDE.md` SSoT, (2) `sprachniveau_include_registry.json` Registry, (3) `HANDOFF_CC_F0b_v1.md` CC-Task-Block-Liste, (4) `E2E_PILOT_CHECKLIST_v3-12.md`, (5) `docs/projekt/cc_responses/response_f0b_a1-a4.json` F0b.2b-Rueckmeldung, (6) diesen STATUS-F0b-Block. Rekonstruiert Zustand vollstaendig.

**Nicht-Ziele F0b.2:** kein Content-Artefakt generiert, keine VERTRAG-Scope-Erweiterungen ausserhalb Ebene-0-Invarianten, keine Testrun-Starts, keine Git-Write-Operations ohne User-Freigabe.

**Pilot-Zurueckstellung 2026-04-20:** F0b.3 E2E-Pilot (Task #39) ist blockiert durch Task #46 (F0d Dispatch-Spike) + Task #47 (F0f Feld-Evidenz). Siehe F0d + F0f Work-Stream-Bloecke unten und UPGRADE_PLAN §20.

---

## F0d Dispatch-Spike (Work-Stream, Stand 2026-04-20 — **CLOSED, Befund MIXED mit M6-Caveat**)

**Befund-SSOT:** `docs/projekt/F0d_BEFUND.md` (commit `80c0682`).
**Metriken-SSOT:** `docs/projekt/testrun-dispatch-spike/METRICS.md` (commit `a9feb99`).
**6 Run-Artefakte:** `docs/projekt/testrun-dispatch-spike/runs/A/{A_1,A_2,A_3}/*` + `runs/B/{B_1,B_2,B_3}/*`.

**Gesamt-Ergebnis: MIXED.** H1 (Struktur-Varianz B<A) + H2 (Fail-Detection +20pp) empirisch BESTAETIGT. H3 (Token <=1.3x) WIDERLEGT (1.83x). H4 (Schema dispatch-unabhaengig) BESTAETIGT negativ: 0/6 Draft7-valid, systemisches Generator-Shape-Problem. Gating: M1+M3+M8 PASS, M4+M6 FAIL. PASS ausgeschlossen. MIXED-Kriterium (M1+M3 ja, M4 nein) erfuellt, M6-Sperrklausel limitiert inhaltliche Arm-Auswertung.

**Folge-Entscheidung F0g (#48):** Bleibt **DEFERRED** statt "reduziert". Begruendung: M4 FAIL (1.83x Token-Overhead) + M6 FAIL (Generator-Shape-Non-Compliance) machen Produktiv-Rollout unwirtschaftlich/riskant. Entblockung erst nach Abschluss PI-SCHEMA-STRICT-01 + PI-DISPATCH-OVERHEAD-01.

**Neue PI-Items fuer UPGRADE_PLAN §20-Nachtrag:**
- PI-SCHEMA-STRICT-01 "Draft7-Validator in SUB_MATERIAL-Envelope" (dringlich).
- PI-DISPATCH-OVERHEAD-01 "Arm-B-Checker-Kontext-Optimierung" (Prereq F0g).
- PI-M1-M12-COVERAGE-01 "Q-Gate-Checker-Prompt auf M1-M12-Dimension erweitern".
- PI-SELFCHECK-BIAS-01 "Arm-A Policy-Override-Konflikt-Pruefschritt".

**Dispatch-Muster-Empfehlung (vorlaeufig):** Isolierter Q-Gate-Checker-Dispatch nur bei hoher Kritikalitaet (Lehrprobe/ELP), nicht fuer Bulk-Generierung. Produktive Materialgenerierung weiterhin mit externer Schema-Validation bis PI-SCHEMA-STRICT-01 geschlossen ist.

**Tasks #46 + #50-#60 alle completed.** Closing-Commit Historie: `7968f5a` Freeze / `ec5115d` Plan-v2.1 / per-Run-Commits A_1..A_3+B_1 / `f2cb2f1` A_2 / `19769b0` B_2 / `168036a` B_3 / `a9feb99` METRIKEN / `80c0682` BEFUND.

**Historische Beschreibung (archiviert):**

## F0d Dispatch-Spike (Historie, Plan-Ausgangslage 2026-04-20)

**Grund:** Sub-Agenten werden aktuell nicht via Agent-Tool technisch dispatched; Generierung und Q-Gate-Pruefung laufen im selben linearen Orchestrator-Kontext → struktureller Self-Check-Bias + Rueckmelde-Luecke (RA5 F-RA5-11). Architektur-Hypothese: Kontext-isolierte Cowork-Agent-Tool-Dispatches liefern geringere strukturelle Varianz + hoehere Q-Gate-Fail-Detection. Spike evaluiert Hypothese empirisch an minimalem Scope.

**SSoT-Artefakte:**
- `docs/projekt/F0d_DISPATCH_SPIKE_PLAN.md` **v2.0** (Realitaets-Refaktor, 11-Artefakte-Bundle, Priming-Paket pro Arm, M1-M8, §12 Realitaetsnaehe-Checkliste).
- `docs/projekt/testrun-dispatch-spike/RUN_LOG.md` — Compaction-safe Run-State-SSOT (Bundle-Hashes, Run-Plan-Matrix, P-Block-Checkpoints, Metriken-Tabelle).
- `docs/projekt/testrun-dispatch-spike/input_bundle/` — FROZEN Bundle (4 Files).

**Scope:** 1 Sub-Agent (`SUB_MATERIAL_QUELLENTEXT`) + Q-Gates (`QG-06 MULTIPERSPEKTIV` + `SCHEMA-01` + `MQ-STRICT` + MQ1-MQ6 + M1-M12 + TYP-QUELLENTEXT). 1 realer Fall `deutscher-nationalismus-kolonialismus/mappe-4/mat-4-3` (Trotha-Vernichtungsbefehl, Jgst 9 R7, konflikttyp=true, Trigger Kolonisierung/Gewalt/Macht-Asymmetrie/Unterdrueckung). Keine vollstaendige Mappe, kein Deploy.

**A/B-Methodik:** 3x Arm A (Baseline linear im Chat) vs 3x Arm B (Cowork Agent-Tool Dispatch mit Kontext-Isolation). 2/3 Runs pro Arm mit Fehler-Injektion (`bundle_injected.md` — nur `perspektiven_policy` mono-perspektivisch; Zitat + Trigger + DIDAKTIK-Ethik unveraendert, R3-Mitigation).

**Bundle-Freeze (P0 completed 2026-04-20):**
- `bundle.md` SHA-256 `419c6440a4ebcf9959fc0eca59974f493d2a95104a72dfc5ab96a5533c417658` (18913 B, 11 Artefakte).
- `bundle_injected.md` SHA-256 `f44fb3d0fd924adb02230089b6f0e55744e19873f197ebcfbcd68bc1d085a174` (2571 B, Delta §11).
- Pre-Run-Integritaetscheck via `sha256sum -c bundle_hash.txt` Pflicht.

**Metriken M1-M8:**
- M1 Strukturelle Varianz (B ≤ A) — Gating.
- M2 Inhaltliche Varianz (informativ).
- M3 Q-Gate-Fail-Detection (B ≥ A + 20 pp) — Gating.
- M4 Token-Verbrauch (B ≤ 1.3 × A) — Gating.
- M5 Rueckmelde-Luecken (B ≤ A).
- M6 Schema-Konformitaet Draft7 strict (3/3 pro Arm) — Gating (neu v2.0).
- M7 Q-Gate-Coverage (alle Gates vs nur QG-06) — informativ.
- M8 Realitaetsnaehe (§12-Checkliste ≥ 6/7) — Gating (neu v2.0).

**Gating (v2.0 verschaerft):** PASS = M1 + M3 + M4 + M6 + M8. MIXED = M1+M3 ja, M4 nein. FAIL sonst. M6=FAIL → Arm-Ergebnis inhaltlich nicht auswertbar.

**Dispatch-Layer:** Cowork Agent-Tool. CC-Handoff ausgeschlossen (vermeidet Prevent-First-Gate-Klasse).

**Ablauf P0-P6 (Tasks #50-#60):**
- P0 Bundle-Beschaffung + Hashing (#50) — **completed 2026-04-20**.
- P1 Freeze (atomic Host-MCP Commit: Bundle + RUN_LOG + STATUS + CHANGELOG + auto-memory) (#51) — **in_progress**.
- P2 Arm A Runs 1-3 (#52 bundle.md PASS → #53 injected FAIL → #54 injected FAIL).
- P3 Arm B Runs 1-3 (#55 bundle.md PASS → #56 injected FAIL → #57 injected FAIL).
- P4 Metriken M1-M8 (#58, blockedBy #54 + #57).
- P5 BEFUND PASS/FAIL/MIXED `docs/projekt/F0d_BEFUND.md` (#59).
- P6 Close: STATUS + CHANGELOG + Task #46 completed (#60).

**Deliverables:** 6 Run-Ordner `docs/projekt/testrun-dispatch-spike/runs/<arm>/<run_id>/` (INPUT_MANIFEST + GENERATOR_OUTPUT + QGATE_RETURN + RUN_META) + `METRICS.md` + `F0d_BEFUND.md` + STATUS/CHANGELOG-Updates.

**Folgeschritte:**
- PASS → Task #48 F0g entblockt (PI-DISPATCH-1/2/3 Refaktor).
- FAIL → PI-DISPATCH-Items auf DEFERRED, UPGRADE_PLAN §20 Nachtrag.
- MIXED → F0g reduziert (nur Q-Gates).

**Kopplung:** Task #46 (parent), blockedBy [#60]. Unabhaengig von F0f, entkoppelt, parallel lauffaehig.

---

## F0e-AEF Agent-Expertise-Forming-Spike (Work-Stream, Stand 2026-04-21 — **VOR-ARBEIT COMPLETE, Iteration-1 PENDING**)

**Grund:** F0d hat bewiesen, dass Dispatch-Isolation Struktur-Varianz reduziert (H1 PASS) und Fail-Detection erhoeht (H2 PASS). F0d hat gleichzeitig bewiesen, dass der Subagent-Envelope unabhaengig vom Dispatch-Modus nicht Schema-compliant ist (M6 0/6 valid, H4 negativ). F0e-AEF haertet den Quellentext-Subagent via Shadow-Implementation (Prompt-Hardening-Overlay + zweistufiges Schema-Gate), ohne autoritative Agent-Datei zu aendern. Prerequisite fuer PI-SCHEMA-STRICT-01 und damit fuer F0g-Entblockung.

**Nicht zu verwechseln mit:** F0e Didaktisches Audit (Work-Stream oben, abgeschlossen 2026-04-19). Namenskollision aus historischen Gruenden; neuer Spike traegt Suffix "-AEF" (Agent-Expertise-Forming).

**SSoT-Artefakte (Vor-Arbeit commit-ready):**
- `docs/projekt/f0e-agent-expertise/F0e_AGENT_EXPERTISE_SPIKE.md` v1.0 (Plan-SSOT; Iteration-1 Pflicht, Iteration-2 konditional, Stop-Gate bei Overlay-Patch > 2 oder Didaktik < 3).
- `docs/projekt/f0e-agent-expertise/AUDIT_QUELLENTEXT_CURRENT.md` (Infrastruktur-Audit, read-only).
- `docs/projekt/f0e-agent-expertise/gate-prototype/GATE_REPORT.md` (Full-Gate + Partial-Gate Befund gegen 6 F0d-Outputs; §6.3 D-Defekt-Katalog, §9 Partial-Gate-Befund).
- `docs/projekt/f0e-agent-expertise/gate-prototype/schemas/material_quellentext_v3.10.2.json` (Full, pinned SHA `632d7b47…`).
- `docs/projekt/f0e-agent-expertise/gate-prototype/schemas/material_quellentext_partial_v3.10.2.json` (Partial, `additionalProperties:false`).
- `docs/projekt/f0e-agent-expertise/gate-prototype/schemas/PROVENANCE.md` (Schema-Versionierungs-Protokoll).
- `docs/projekt/f0e-agent-expertise/gate-prototype/scripts/validate_material_output.py` (Draft7-Validator + Fehler-Klassifikation).
- `docs/projekt/f0e-agent-expertise/gate-prototype/scripts/merge_material.py` (Dispatcher-Merge mit Ownership-Kollisionscheck).
- `docs/projekt/f0e-agent-expertise/gate-prototype/scripts/extract_partial.py` (F0d-Regressions-Helfer).
- `docs/projekt/f0e-agent-expertise/gate-prototype/overlays/PROMPT_HARDENING_QUELLENTEXT.md` v1.0 (D1-D5 addressiert).
- `docs/projekt/f0e-agent-expertise/gate-prototype/fixtures/dispatcher_context_mat-4-3.json` (Dispatcher-Ownership aus Baseline).
- `docs/projekt/f0e-agent-expertise/gate-prototype/fixtures/baseline_partial_mat-4-3.json` + `smoke_merged_mat-4-3.json` (Smoke-Test-Artefakte).
- `docs/projekt/f0e-agent-expertise/gate-prototype/reports/` (Full-Gate + Partial-Gate-Reports gegen alle 6 F0d-Runs, 18 JSON-Reports).

**Pipeline Smoke-Test (2026-04-21):** baseline_partial → Partial-Gate PASS (Exit 0) → Merge OK (Exit 0) → Full-Gate PASS (pinned_match True, Exit 0). End-to-End validiert.

**Zentrale Befunde aus GATE_REPORT (gegen 6 F0d-Outputs, alle FAIL):**
- Full-Gate: 32 Errors total, 5 Klassen (MISSING_REQUIRED, UNKNOWN_FIELD, ONEOF_MISMATCH, ENUM_VIOLATION, WRONG_TYPE).
- Partial-Gate: 13 echte Subagent-Defekte, 19 Dispatcher-Ownership-Lecks (~59 % der Full-Gate-Errors waren Dispatcher-Leck, kein Subagent-Defekt).
- 5 systemische D-Defekte (D1 `perspektiv_tags` verboten, D2 `quellentyp` Enum scharf, D3 `perspektive` String NIE Array, D4 `inhalt` String NIE Objekt, D5 keine Dispatcher-Felder).
- Location-Drift bei `perspektiv_tags`: 2/6 in `_meta`, 4/6 Top-Level (nicht triviale Overlay-Loesung).

**Iteration-Plan:**
- **Iteration-1 (Pflicht):** 1 Regeneration von `mat-4-3` via Overlay + zweistufiges Gate + Didaktik-Review. PASS = beide Gates Exit 0 + Didaktik ≥ 4/5.
- **Iteration-2 (konditional):** n=3 Varianz-Check, nur bei I1 PASS + Budget > 40 %.
- **Stop-Gate:** Overlay-Patch-Zyklen > 2 oder Didaktik-Regression < 3 → Spike-FAIL, PI-SCHEMA-STRICT-01 muss auf Ebene 2 (autoritativer Agent-Patch) eskaliert werden.

**Metriken:** M-E1 Partial-Gate-Rate, M-E2 Full-Gate-Rate, M-E3 Inhalts-Jaccard, M-E4 Tag-Jaccard, M-E5 Didaktik-Einsetzbarkeit, M-E6 Overlay-Patch-Zyklen, M-E7 Token-Verbrauch, M-E8 Defekt-Klassen-Residuum.

**Didaktik-Review-Protokoll:** 5 Dimensionen (Einsetzbarkeit 1:1, Sprachniveau R7, Multiperspektivitaet P1+P3, Trigger-Behandlung, Quellen-Integritaet), Skala 1-5, Persistenz in `runs/iteration-{N}/review_iter{N}_run{k}.md`.

**Ablaufplan:** P0 done (Gate-Prototyp), P1 done (Plan-Doc), P2 Iteration-1 Dispatch ~30 Min, P3 Didaktik-Review 20 Min, P3a bedingt Overlay-Patch, P4 Iteration-2 ~45 Min konditional, P5 Auswertung 30 Min, P6 F0e-AEF_BEFUND.md 20 Min, P7 STATUS/CHANGELOG/TaskUpdate 10 Min.

**Folgeschritte:**
- PASS → PI-SCHEMA-STRICT-01 IN_PROGRESS, F0g (#48) aus DEFERRED auf PENDING (weiterhin geblockt durch PI-DISPATCH-OVERHEAD-01).
- MIXED → PI-SCHEMA-STRICT-01 bleibt PENDING mit "Overlay funktioniert einmalig; Reproduzierbarkeit offen".
- FAIL → Eskalation auf Ebene 2 (autoritativer Agent-Patch + Generator-Repo-Synchronisation).

**Kopplung:** Unabhaengig von F0f (#47, parallel lauffaehig). Prerequisite fuer F0g (#48). Keine Pilot-Kopplung.

---

## F0f Feld-Evidenz (Work-Stream, Stand 2026-04-20 PENDING)

**Grund:** Paul beobachtet im Unterricht Jgst 7-9, dass generierte Mappen zu schwer / didaktisch zu wenig praezise sind. F0b deckt 9/9 PQI-1, aber nicht den vollen 21er A-CODE + 6 A-PROZ Katalog. Feld-Evidenz wird strukturiert erhoben und gegen Matrix v2.1 gemappt, um Coverage-Gap zu beziffern und als Pilot-Re-Gating-Input zu liefern.

**SSoT-Artefakt:** `docs/projekt/F0f_FELD_EVIDENZ_PLAN.md` v1.0 (Erhebungsbogen, Matrix-Mapping-Workflow, Gap-Report-Template).

**Scope:** Mindestens 3 Mappen retrospektiv auswerten, mindestens 8 Beobachtungen. Fokus: Schwere + Didaktisierung, nicht Technik-Bugs. Coverage-Check gegen alle 21 A-CODE + 6 A-PROZ.

**Klassifikation pro Beobachtung:**
- **C1 (abgedeckt):** F0b adressiert, greift aber nicht → Ueberweisung an Task #40 F0b.3b Drift-Audit.
- **C2 (teilweise):** F0b formal adressiert, didaktische Tiefe fehlt → Neuer PI-Vorschlag UPGRADE_PLAN §20.
- **C3 (nicht abgedeckt):** Kein F0b-Bezug → Neuer PI-Vorschlag (meist A-PROZ oder A-CODE ausserhalb der 9/9 PQI-1).

**Ablauf (0.5 Arbeitstag):** P1 Erhebungsbogen instantiieren → P2 Beobachtungen retrospektiv erfassen → P3 Matrix-Lookup + Klassifikation → P4 Gap-Report + PI-Vorschlaege → P5 UPGRADE_PLAN §20.2 fuellen → P6 STATUS/CHANGELOG.

**Deliverables:**
- `docs/projekt/testrun-feld-evidenz/ERHEBUNG_<datum>_<klasse>.md` — mind. 1 Bogen pro Mappe
- `docs/projekt/FELD_EVIDENZ_REGISTER.md` — SSoT Gap-Report
- PI-Vorschlaege in UPGRADE_PLAN §20.2 PI-FELDEVIDENZ-1 integriert

**Pilot-Re-Gating:** Gap-Report ist Pflicht-Input fuer #39. Pilot-Start erst wieder zulaessig wenn alle C3-Gaps entweder geschlossen oder explizit pilot-unkritisch markiert + alle C2-Gaps gefixt oder unter Beobachtung deklariert.

**Kopplung:** Task #47. Unabhaengig von F0d, entkoppelt, parallel lauffaehig.

---

## Konsolidierter Projektstatus (Stand 2026-04-08)

### Abgeschlossene Grossprojekte

| Projekt | Status | Referenz |
|---|---|---|
| UPGRADE_PLAN v4 Runden 0-4 | COMPLETE | `docs/architektur/UPGRADE_PLAN_v4_PRODUKTIONSARCHITEKTUR.md` |
| D15b Phase III.5 Risiko-Audit (7 RAs) | COMPLETE | `docs/projekt/D15B_PHASE_III_5_AUDIT_STATE.md` |
| D15b Phase IV Waves 1-4 | COMPLETE | Commits: AU-1 `5b470c5`, AU-2a `bcb9eeb`, AU-2b `3f1d89f`, AU-2c `a3a1db1`, AU-3+4 `5c80ea7`/`24f6ff9`, Wave 3 PM `24f6ff9`, Wave 4 W4-A/B/C |
| Operationalisierungs-Audit v2 (P1-P15) + Infrastruktur-Patch (S16-S17) | COMPLETE | GUETEKRITERIEN_SEQUENZIERUNG.md v2.3. S1-S17 (13 Original + 2 Neu). S16 Zonen-Last-Limit, S17 Materialtyp-SCPL-Kongruenz |
| Checkpoint-1 + Checkpoint-2 Infrastruktur-Audits | COMPLETE | `docs/befunde/BEFUND-CHECKPOINT-{1,2}-INFRASTRUKTUR.md` |

### Offene Arbeitsstroeme nach Prioritaet

**AKTIV 2026-04-20 (Dispatch + Feld-Evidenz Pivot):**

| Task | Subjekt | Status | blockedBy | SSoT |
|---|---|---|---|---|
| #46 | F0d Dispatch-Spike | **completed (MIXED)** | — | `docs/projekt/F0d_BEFUND.md` (commit `80c0682`) |
| #47 | F0f Feld-Evidenz | pending | — | `docs/projekt/F0f_FELD_EVIDENZ_PLAN.md` |
| #49 | UPGRADE_PLAN v1.4-Delta + STATUS/CHANGELOG | in_progress | — | UPGRADE_PLAN §20 (F0d-Nachtrag: 4 neue PI-Items) |
| #48 | F0g Agent-Dispatch-Refaktor (bedingt) | pending | PI-SCHEMA-STRICT-01, PI-DISPATCH-OVERHEAD-01 | UPGRADE_PLAN §20.2 PI-DISPATCH-1/2/3 + F0d-BEFUND §5.1 |
| #39 | F0b.3 E2E-Pilot v3.12 | pending (BLOCKED) | #46, #47 | `docs/projekt/E2E_PILOT_CHECKLIST_v3-12.md` |
| #40 | F0b.3b Qualitaets-Drift-Audit | pending | #39 | — |
| #41 | F0b.4 F0b-Close + Commit | pending | #39, #40 | — |

**P0 — Alle CLOSED (R0-TESTRUN-AUDIT P0-Kanon 6/6 geschlossen, v3.12-Pilot-Start entsperrt durch P0-Kanon, aber v1.4-Delta Re-Gating durch #46+#47 aktiv):**

| ID | Aufgabe | Quelle | Naechster Schritt |
|---|---|---|---|
| ~~P0-A1~~ | ~~F-RA1-05 Phase 3.1 Deploy-Preparation Wiederaufnahme~~ | ~~R0-TESTRUN-AUDIT (BEFUND §4)~~ | **CLOSED** (2026-04-18, commits 79232f7 escape-game-generator + ad7df55 weitergehts-online): Pre-Live-BLOCK vor Phase 3 in PROJECT_INSTRUCTIONS verankert, PI-Felder `LETZTE_DEPLOY_CHECK_TS/RESULT/GAME` eingefuehrt, `tools/deploy-check.sh` um Q-GATE-LOG-Ausgabe + Log-File erweitert. Via CC-Headless (Batch-3, Task A). B4-Regression auf N-K Mappe 3 PASS. Abweichung v. HANDOFF: A1.1 §2.4 statt §3 positioniert, A1.2 PI-Template nicht modifiziert (Follow-up), A1.3 `.gitignore`-Zeile statt Pfad-Konvention |
| ~~P0-A2~~ | ~~F-RA1-06 V13-Patch-Regression beheben~~ | ~~R0-TESTRUN-AUDIT (BEFUND §4)~~ | **CLOSED** (2026-04-18, commit 4f33baf escape-game-generator): `SUB_ASSEMBLY_VERIFY.md` als Post-Assembly MUST_VERIFY-Subagent, V13-Hefteintrag-Dualstruktur-Check integriert. Via CC-Headless (Batch-3, Task B). Abweichung v. HANDOFF: B1 Phase 3.4 statt Phase 3.3 Einhaengung. B4-Regression N-K Mappe 3 Hefteintrag-Verschachtelung PASS |
| ~~P0-A3~~ | ~~F-RA3-01 Lueckentext-Pool-Reset-Bug fixen~~ | ~~R0-TESTRUN-AUDIT (BEFUND §4)~~ | **CLOSED** (2026-04-18, commit a4f8c19): escape-engine.js Z. 2798 gepatcht (`disabled` → `classList.contains('aufgabe__pool-wort--used')`). Cache-Bust `?v=3.13`→`?v=3.14` auf 4 Games + Template. Verifikation via Host-MCP |
| ~~P0-A4~~ | ~~F-RA4-04 Source-Deploy-Drift mat-3-4.json beheben~~ | ~~R0-TESTRUN-AUDIT (BEFUND §4)~~ | **CLOSED** (2026-04-18, commit 2f841a3): mat-3-4.json mit Maréchal/Le-Frondeur-Content synchronisiert. Q-SOURCE-DEPLOY-PARITY-Tool `tools/source-deploy-parity.sh` (134 LOC, 18/18 SYNC PASS) implementiert |
| ~~P0-A5~~ | ~~F-RA4-10 Mappe-4 Retro-Patch Herero/Nama~~ | ~~R0-TESTRUN-AUDIT (BEFUND §4)~~ | **CLOSED** (2026-04-18, commit 2f41ca8 weitergehts-online): img-4-1 korrigiert von Hallu `Bundesarchiv_Bild_183-R24738` auf verifiziertes `Bundesarchiv_Bild_105-DSWA0095,_Deutsch-Süd-Westafrika,_Kamelreiterpatrouille.jpg` mit `didaktische_aequivalenz: DRIFT` dokumentiert. Dual-Kanal-Verifikation (WebFetch + Commons). Task A via CC-Headless |
| ~~P0-A6~~ | ~~F-RA4-02 Prospektive Medien-Verifikation implementieren~~ | ~~R0-TESTRUN-AUDIT (BEFUND §4)~~ | **CLOSED** (2026-04-18, commit bbac715 escape-game-generator): Q-MEDIEN-PROSPEKTIV als Pflicht-Gate in Phase 0.2.M verankert (VERTRAG + ORCHESTRATOR + AGENT_MEDIENRECHERCHE + SUB_MATERIAL_DARSTELLUNGSTEXT). Task B via CC-Headless Recovery-Run nach Auth-Fehler. Audit via `tools/cc-session-audit.py` PASS |
| ~~P0-1~~ | ~~SKRIPT-Persistenz im Repo~~ | ~~Session 23 Meta-Task~~ | **CLOSED** (Session 24): ORCHESTRATOR Persistenz-Checkpoint + VERTRAG_PHASE_0-3 Persistenz-PFLICHT |
| P0-2 | Produktions-Testlauf v2.4 | Operationalisierungs-Audit v2 Abschluss | **Testlauf 5 PASS. VP-10/VP-11 gepatcht. VP-1r dokumentiert.** Naechst: Phase 0.4 AGENT_HEFTEINTRAG fortsetzen |
| P0-3 | Zweiter Testfall Grenzfaelle | Operationalisierungs-Audit v2 P15 | Mappe mit quellentext + bildquelle heuristisch, Rahmen-Einstieg-Konflikt, oder <3 Mat |

**P1 — Wichtig, nicht blockierend:**

| ID | Aufgabe | Quelle | Status |
|---|---|---|---|
| P1-1 | Wave 3 Code-Strang (STR-12 Engine-Unterdrueckung + STR-13 Mappenabschluss-Rendering) | D15b Phase IV Wave 3 | Uebergabe geschrieben: `UEBERGABE_PHASE_IV_WAVE_3_STR_12_13.md`. Ausfuehrung in Claude Code ausstehend |
| ~~P1-2~~ | ~~DOK1 Evaluations-Transkripte Personenbezugs-Pruefung~~ | ~~D15b SYNTHESE 3.5~~ | **CLOSED** (Session 24): PASS — kein substantieller Personenbezug, Gitignore ausreichend. Befund: `docs/befunde/DOK1_TRANSKRIPT_PII_PRUEFUNG.md` |
| P1-3 | quellenangaben[] Engine-Support | Offener Blocker (persistent) | Workaround: cite-Einbettung. Eigener Engine-Patch noetig |
| P1-4 | D3 datenschutz.html Minimal-Erklaerung | D15b SYNTHESE 3.4 | Soft-Gate, 2 Wochen nach Live |
| P1-5 | DOK2 GitHub AVV Schultraeger-Klaerung | D15b SYNTHESE 3.5 | Dokumentationspflicht, nicht BLOCKING |

**P2 — Nachrangig / Stretch:**

| ID | Aufgabe | Quelle |
|---|---|---|
| P2-1 | UPGRADE_PLAN v4 M5-M9 (Prioritaet 2/3 Restposten) | UPGRADE_PLAN Sektion 4 |
| P2-2 | ARTEFAKT_INVENTAR Mappe 2+3 nachpflegen | Offener Blocker (persistent) |
| P2-3 | Flowcharts (Mermaid) veraltet | Offener Blocker (persistent) |
| P2-4 | Engine-Erweiterungen O3/O5/O6 (Ordnungsmuster, Pfeiltypen, Farbsemantik) | Offener Blocker (Stretch-Goal) |
| P2-5 | UPGRADE_PLAN v4 Runde 5 Retrospektive + Skill-Update | UPGRADE_PLAN Sektion 4 (nach naechster Produktion) |

**DEFERRED (Folgeprojekt):**

| ID | Aufgabe | Quelle |
|---|---|---|
| DEF-1 | STR-09-NEU Differenzierungs-Exit-Architektur | D15b Phase III Eval (Folgeprojekt nach Kerninfrastruktur-Stabilitaet) |

### Kritischer Pfad

```
[DONE] P0-1 SKRIPT-Persistenz scopen
  [DONE] P0-2a Repo-Separation + Audit-Patches (B1, B2, H2, H4, M1)
    [DONE] P0-2c Phase 0 Testlauf (v2.4, Testlauf 4 PASS)
      [DONE] P0-2e Testlauf 5 + Vergleichsaudit T4/T5 Rev.1 (76% Patch-Wirksamkeit, 7 valide Findings: 0C/0H/5M/2L)
        [DONE] P0-2f VP-10/VP-11 gepatcht (VERTRAG_0-3 v1.4), VP-1r = MCP-Konfiguration (--language de)
          [DONE] P0-2d Phase 1 + Phase 2.0 Rahmen M1 (CONDITIONAL PASS, 2H/3M/2L)
            [DONE] P0-2g Phase 2.1 Material-Produktion M1 (PASS, 0H/2M/2L)
              [DONE] Tiefenaudit + v3.6 Infrastruktur-Patches (5 SUB_MATERIAL + 3 Q-Gate-Kriterien + Phase 2.1b Vertrag)
                [SKIP] P0-2g2 Phase 2.1b M1 (uebersprungen, v3.6-Patches manuell, Prozess-Test bei M2)
                  [DONE] P0-2g3 Phase 2.1c Cross-Konsistenz M1 (PASS)
                    [DONE] P0-2g4 Phase 2.2a Progressionsplan M1 (PASS, 7 Aufgaben)
                      [DONE] P0-2g5 v3.7 Scope-Patch (D5 aus 2.1b, State Machine, Bloom-Fix, Zitat-Fix)
                        [DONE] P0-2h Phase 2.2b Aufgaben-Produktion M1 (PASS, 0H/1M/2L, 7/7 Q-Gates PASS)
                          [DONE] P0-2i Phase 2.2c Aufgaben-Cross M1 (PASS, 10/10)
                            [DONE] P0-2j Phase 3.0 Assembly M1 (PASS, 0H/2M/1L)
                              [DONE] P0-2k v3.9 Steuerungsrefaktor (Option A): PI = SSOT Steuerung, ORCH = Referenz. Commit escape-game-generator Session 28.
                              [DONE] P0-2k1 v3.9.1 Struktur-Audit-Patch: 2H+4M+4L Findings konsolidiert. Q-GATE-FAIL-PROTOKOLL als SSOT, Phase-0.4 innere Schleife explizit, Zeile-11 Strategie-Audit E1 in Zeile 10 integriert (Renumbering 12→11 ff.), Q-GATE-LOG-Format-Ref zu Q-GATE-MECHANIK.md §8 korrigiert, WORKFLOW_v4 Tiebreaker entfernt, VERTRAG_PHASE_0-* Header + VERTRAG_PHASE_2-1b Actor auf PI/Cowork-Session umgestellt, PFAD_MANIFEST Dokumentations-Section aktualisiert.
                              [DONE] P0-2k2 v3.9.2 Follow-up-Patches: (1) F-M1 Engine zitat-Rendering: `_renderSicherung()` in escape-engine.js um sicherung.zitat-Block (text/urheber/kontext) erweitert (figure/blockquote/figcaption), .sicherung__zitat* CSS in theme-gpg.css, Cache-Bust auf ?v=3.9.2 in allen HTML-Refs. (2) F-L1 Pfad-Move: VERTRAG_PHASE_3_ASSEMBLY.md von `agents/` nach `architektur/vertraege/`, ONBOARDING.md + PFAD_MANIFEST.md aktualisiert. (3) P0-2k4 Legacy AGENT_TECHNIK-Refs in 12 Dateien (Abgrenzungstabellen + Prosa) auf "Engine (escape-engine.js) / Claude-Code-Assembly [ehem. AGENT_TECHNIK, Legacy ab v3.9]" umgestellt; ORCHESTRATOR/PFAD_MANIFEST historische Marker bewusst behalten.
                                → P0-3 Mappe 2 Produktion ← NAECHSTER SCHRITT
              → P2-5 Runde 5 Retrospektive
```

Parallel dazu: P1-1 Wave 3 Code-Strang (unabhaengig, Claude Code).

---

**Architektur-Entscheidung (Session 25, 2026-04-08):**
Generator wird eigenstaendiges Repo (`escape-game-generator/`). Begruendung: (1) Produkt soll vertriebsfaehig sein, (2) Pfad-Isolation eliminiert Grep-Drift zwischen PM und Produkt, (3) Agenten-Dateien haben hardcodierte `docs/`-Pfade die bei Koexistenz im selben Repo zu Ambiguitaet fuehren. Konsequenzen: Alle internen Pfade werden Repo-relativ umgeschrieben, PROJECT_INSTRUCTIONS.md erhaelt Dual-Root-Logik (GENERATOR_ROOT + TARGET_ROOT), `weitergehts-online/docs/agents/` etc. werden zu Legacy (Quelle der Wahrheit ist Generator-Repo). Audit-Befund: 2 BLOCKER, 4 HIGH, 4 MEDIUM, 2 LOW — werden im Rahmen der Migration gepatcht.

**Letzter Arbeitsschritt:** Session 28 (Forts.): Konsolidierter Befund Testrun M1. Alle Findings aus 6 Einzelbefunden zusammengefuehrt. 3H/10M/9L + 2 Prozess. Davon gepatcht (v3.6-v3.8): 3H+5M+5L. Prozess-Audit: ORCHESTRATOR nicht als Router genutzt (F-P1), Assembly in Cowork statt Claude Code (F-P2). Befund: `docs/befunde/BEFUND_TESTRUN_M1_KONSOLIDIERT.md`.
**Naechster Schritt:** v3.9 Infrastruktur-Patches (4 offene Findings): (1) F-P1: ORCHESTRATOR-Read als Phasen-Precondition in PROJECT_INSTRUCTIONS + ORCHESTRATOR. (2) F-P2: Phase-3-STOP-Marker + Ort-Constraint. (3) F-L1: Assembly-Vertrag nach vertraege/ verschieben. (4) F-M1 Rest: Engine zitat-Rendering (Claude Code, P1-Scope).

### Abgeschlossene Bilanzen (Referenz)

**Wave-4-Bilanz:** W4-A: 3 Vertraege + 3 Audit-Patches. W4-B: 11 Findings (2 HIGH gepatcht). W4-C: AGENT_DIDAKTIK v2.0 (8 Aufgaben, 7 Heuristiken, Q-Gate Self-Check), Testrun Game 2 (PASS mit 1 WARN), 5 Prozess-Findings (1 HIGH: fehlender KE-Katalog), 2 Agent-Patches (M2 Mappen-Titel, M3 Stoffdichte-Heuristik H7).
**Wave-3-Bilanz:** 5 STR gepatcht (STR-06, STR-12, STR-13, STR-14-NEU, STR-15). PM-Strang: 18 Dateien modifiziert, 2 neu erstellt. Code-Strang: Uebergabe geschrieben.
**Wave-2-Bilanz:** AU-4 CLOSED (STR-05, `24f6ff9`). AU-3 CLOSED (STR-08 + STR-11, `24f6ff9` + `5c80ea7`, 8 Aufgabentypen in Engine).
**Wave-1-Bilanz:** AU-1 CLOSED (`5b470c5`). AU-2a CLOSED (`bcb9eeb`). AU-2b CLOSED (`3f1d89f`). AU-2c CLOSED (`a3a1db1`). Checkpoint-1: 16 Findings, Gate GRUEN.
**Checkpoint-2-Bilanz:** 11 Findings, Gate GRUEN. 1 Blind-Spot gefixt (SUB_MATERIAL_DARSTELLUNGSTEXT Multiperspektivitaet-Policy).
**D15b III.5 Bilanz:** 7 RAs, 63 Findings (1 P0, 23 P1, 25 P2, 14 P3). Gate: BEDINGTES GO. 8 Gates definiert. STR-Portfolio: 20 aktiv, 0 Streichungen, 1 MODIFY-SCOPE (STR-05), 1 Design-Change (STR-13).

**Abgeschlossen seit letztem Update:**
- **PHASE IV WAVE 2 COMPLETE (Session 13):**
  - AU-4 `24f6ff9` (PM): STR-05 Multiperspektivitaet MODIFY-SCOPE (konflikttyp/perspektiven_policy, M13, SK16, Achse 5 Cross).
  - AU-3 `24f6ff9` (PM) + `5c80ea7` (Code): STR-08 Quellenkritik + STR-11 Teil 2 (SUB_AUFGABE_QUELLENKRITIK, A27, Engine-Registry 8 Typen, Renderer + Check, Cache-Bust v=4.4).
- **PHASE IV WAVE 1 COMPLETE (Session 13):**
  - AU-1 `5b470c5`: STR-02 Bloom-Tiefe + STR-11 Teil 1 (Vergleich L4 + Begruendung L5 CER).
  - AU-2a `bcb9eeb`: STR-03 Feedback-Schema Rollout (26 Aufgaben / 79 Eintraege).
  - AU-2b `3f1d89f`: STR-04 Tipp-Haertegrade Infrastruktur (normalizeTipps + Validator + Anti-Leak).
  - AU-2c `a3a1db1`: BEFUND-AU-1-UI-01 Vergleich-Zellenhoehe (input→textarea + CSS).
  - Checkpoint-1 Infrastruktur-Audit: 16 Findings, 7 Prompt-Patches angewendet, Gate GRUEN.
  - Grundsatzentscheidung: Infrastruktur-First, Game 1 = Testumgebung.
- Zeitfenster-A Prompt-Patches COMPLETE (Session 13):
  - 7 Findings aus BEFUND-CHECKPOINT-1 gepatcht: F-CP1-02 (Freitext Bloom-Beispiel→analyse), F-CP1-03 (Reihenfolge L2-Beispiel+korrektur), F-CP1-04 (typ-Enum in 7/7 Prompts), F-CP1-06 (Freitext Anti-Leak praezisiert), F-CP1-07 (freitext→freitext-code im Vertrag), F-CP1-08 (optionen[] Reihenfolge im Vertrag), F-CP1-12 (Vergleich T2/T3-Abgrenzung mit Beispielen).
  - Dateien: 7× SUB_AUFGABE_*.md + VERTRAG_PHASE_2-2b_AUFGABE.md + BEFUND aktualisiert.
  - Checkpoint-1 Gate-Urteil jetzt GRUEN fuer naechsten Generierungslauf.
- Phase IV Wave 1 AU-2b CLOSED (Session 13):
  - PM-Strang: VERTRAG_PHASE_2-2b A6 Tipp-Schema, 7× SUB_AUFGABE Haertegrad+Anti-Leak, GUETEKRITERIEN A21, Cold-Handoff.
  - Code-Strang Commit `3f1d89f` (Claude-Code, 9 Dateien, 148 Insertions): normalizeTipps() Safety-Net, validate-feedback-schema.js Tipp-Erweiterung + Anti-Leak A21, Cache-Bust v=4.1→v=4.2.
  - Grundsatzentscheidung Infrastruktur-First: Kein Backfill, Game 1 = Testumgebung.
- Checkpoint-1 Infrastruktur-Audit COMPLETE (Session 13):
  - 4 parallele Review-Agenten (Schema-Konsistenz, Coverage-Gaps, Didaktische Kohaerenz, Engine-Kompatibilitaet).
  - 16 Findings konsolidiert: 2 CRITICAL, 6 HIGH, 6 MEDIUM, 2 LOW.
  - Gate-Urteil: GRUEN fuer AU-2b Code-Strang, GELB fuer naechsten Generierungslauf (7 Prompt-Patches noetig).
  - Befund: `docs/befunde/BEFUND-CHECKPOINT-1-INFRASTRUKTUR.md`.
- Phase IV Wave 1 AU-2a CLOSED (Session 13):
  - PM-Strang Commits `0af35f3` (18 Dateien, Block 1) + `2de4f9e` (User-Signoff). STR-03 Feedback-Schema Rollout: VERTRAG_FEEDBACK_SCHEMA §9 Backfill-Spec, 7× SUB_AUFGABE Feedback-Bloecke, A25/A26, Dispatch 26 Aufgaben/79 Eintraege, Cold-Handoff AU-2a.
  - Code-Strang Commit `bcb9eeb` (Claude-Code): normalizeFeedback Log-Warning, validate-feedback-schema.js (26/26 PASS, 3 WARN konform), data.json Backfill 26 Aufgaben, Cache-Bust v=4.0→v=4.1.
- Phase IV Wave 1 AU-1 CLOSED (Session 12 Commit + Session 13 Merge + Cleanup):
  - PM-Strang Commit `5c718df` (14 Dateien, 832 Insertions): STR-02 Bloom-Tiefe-Pflicht + STR-11 Teil 1 (Vergleich L4 + Begruendung L5 CER). Block 1 Vertraege/Subagenten/Guetekriterien + Block 2 BLOOM_KLASSIFIKATION_MAPPEN_1_4.md.
  - Code-Strang Commit `5b470c5` (Claude-Code Worktree `festive-benz`): Engine-Registry +2 Typen `vergleich` + `begruendung`, Mappe-4 data.json Patch mit bloom_level-Feldern + 2 neuen Exemplaren (aufgabe-4-8 Vergleich, aufgabe-4-9 Begruendung CER), Cache-Bust v=3.9→v=4.0. FF-merged in main.
  - Smoke-Test Claude-Code gruen: Rendering + Validierung beider neuer Typen korrekt.
  - **1 UI-Befund** (nicht blockierend): Vergleich-Input-Zellen im Notizbuch-Handschrift-Theme → Text horizontal abgeschnitten wegen zu niedriger Zellenhoehe. Erfasst als `docs/befunde/BEFUND-AU-1-UI-01.md`, Zuweisung AU-2c.
  - Session-13-Cleanup: alle Claude-Code-Alt-Worktrees entfernt (festive-benz, elegant-wilson, heuristic-galileo), Branch `fix/mappe2-quality-patches` geloescht (merged-verifiziert), D15B_OPTIMIERUNGS_STRATEGIEN.md Formatierungs-Noise revertiert. Repo-State: `main @ 5b470c5`, 1 Worktree, 1 Branch, clean.
  - **Framework etabliert:** `docs/projekt/GIT_WORKFLOW_RAHMEN.md` — gestuftes osascript-Modell (Operations-Klassen L/S/R/V mit Audit-Spur), loest rekurrente Heredoc-/Lock-/Worktree-Leichen-Fehlerklasse.
  - **Masterplan persistiert:** `docs/projekt/SESSION_13_MASTERPLAN.md` — E1=B/E2=B/E3=Split-AU-2 mit Begruendung, Ausfuehrungsplan mit Abbruch-/Recovery-Punkten zur Kompaktions-Resilienz.
- D15b-Optimierung Phase III.5c-bis COMPLETE (Session 11, RA7 Datenschutz-Audit):
  - State-File auf `III.5c-bis IN_PROGRESS` gesetzt.
  - Datenschutz-relevante Artefakte im Repo identifiziert: localStorage-Wrapper in core.js Z. 20-86, Progress/State-Logik in escape-engine.js Z. 40-500, Production-HTML ohne externe Ressourcen (Grep-Verifikation), Evaluations-Transkripte in docs/analyse/ als potentiell personenbezogen markiert.
  - `CHARTA_RA7_DATENSCHUTZ.md` erstellt (17 Pflicht-Sektionen, adaptierte P0-P3 Severitaets-Definitionen fuer Datenschutz, strikte Rollen-Isolation).
  - `EVIDENZ_BUNDLE_RA7.md` erstellt (Datei-Liste mit Zeilen-Hinweisen, vorab dokumentierte localStorage-Struktur, STR-Impact-Hinweise fuer STR-03/08/11/12/13/24, Hosting-Kontext GitHub Pages Schrems-II).
  - RA7-Subagent gespawnt (general-purpose, direct-write), las Charta + Evidenz-Bundle + core.js + escape-engine.js (Z. 40-500) + Production-HTML + Lehrkraft-Seite + Evaluations-Transkript-Metadata + D15B_OPTIMIERUNGS_STRATEGIEN.md.
  - **`BERICHT_RA7_DATENSCHUTZ.md` (876 Zeilen, 17 Pflicht-Sektionen + 2 Anhaenge, 13 Findings):**
    - **Gate-Urteil: ROT.** Blockiert Live-Nutzung UND Phase IV.
    - **6× P0 CRITICAL:** (1) Keine gueltige DSGVO Art. 6 Rechtsgrundlage. (2) Art. 8 Einwilligung der Erziehungsberechtigten fehlt. (3) STR-13 Reflexions-Zone unverschluesselt potentiell personenbezogen. (4) Art. 13 Informations-Pflichten vollstaendig unerfuellt (keine Datenschutzerklaerung, kein Verantwortlicher). (5) STR-12 Trigger-Flag-Sichtbarkeit technisch nicht abgesichert. (6) Drittanbieter-Disclosure (Wikimedia IP + GitHub Schrems-II).
    - **5× P1 HIGH:** Keine Auskunftsfunktion Art. 15, `antwort_state` Freitext, keine Verschluesselung Art. 32, Transkripte im Repo, GitHub AVV-Status unbekannt.
    - **2× P2 MEDIUM:** Kein Datenpannen-Protokoll, Kontakt-Infos fehlen.
    - Remediations-Timeline: Woche 1-2 Schule entscheidet Verantwortlichkeit + Datenschutzerklaerung + Transkripte; Woche 2-3 Wikimedia-Bilder lokal + Auskunftsfunktion + STR-13 Verschluesselung; Woche 4 RA7-Follow-up.
    - 7 offene Fragen an User/Schule in Sektion 17 (Verantwortlichkeits-Modell, GitHub-Akzeptanz, STR-13-Design, Transkript-Handling, Datenpannen-Kontakt).
  - Pre-Check PASS (876 Z, 13 F, 17 Sektionen, P0-Count plausibel, Risiko-Matrix vorhanden, Gate-Urteil vorhanden).
  - `UEBERGABE_PHASE_III_5_5c_bis.md` angelegt.
  - State-File, STATUS, CHANGELOG aktualisiert.
  - **Portfoliowide P0-Count:** 5 (post-5d) + 6 (RA7) = 11 P0. Phase-IV-Go/No-Go NEU zu bewerten.
- D15b-Optimierung Phase III.5d COMPLETE (Session 11, Verifikations-Gate):
  - `VERIFIKATION_III_5d.md` (10 Sektionen) erstellt.
  - **RA2-Kalibrierung:** F-RA2-03 Downgrade P0→P3 (Cleanup, kein Runtime-Blocker). Portfolio P0-Count 6→5.
  - **7 Blindspot-Entscheidungen:** B1 Datenschutz CRITICAL → NEUE Sub-Phase III.5c-bis (RA7) + Phase IV Pflicht-Gate. B2 Performance → Phase IV Wave 0 Baseline. B3 Sicherheit → Phase IV Wave 0 Mini-Audit. B4 Operative Robustheit → ATOM-UNIT Akzeptanzkriterium. B5 Rollback → Phase IV PFLICHT-Protokoll. B6 DX → Pre-Phase-IV Subagent-Dry-Run. B7 Doku-Drift → Folgeprojekt.
  - **6 Konvergenz-Hotspots konsolidiert:** STR-04 ACCEPT+PATCH, STR-05 MODIFY-SCOPE, STR-12 ACCEPT+PATCH+SICHERHEITS-REVIEW, STR-03 ACCEPT+BLOCKING-PATCH, STR-08 ACCEPT+PATCH, STR-11 ACCEPT+BLOCKING-PATCH. 5×ACCEPT-mit-PATCH, 1×MODIFY-SCOPE, 0×REJECT/DEFER.
  - **ATOM-UNIT-Framework finalisiert:** 4 ATOM-UNITs (AU-1 STR-02+11, AU-2 STR-03+04, AU-3 STR-08+11, AU-4 STR-05). Pre-Commit-Gate PFLICHT mit 3 Checks (RA1-Scope, RA3-Code, RA4-Vertrag). Commit-Message-Sektion `## ATOM-UNIT Pre-Commit-Gate` verpflichtend.
  - **Vertrags-Patches (4):** V1 BLOCKING ORCHESTRATOR Session-Split, V2 VERTRAG_PHASE_2-2b Feedback-Schema Migration, V3 VERTRAG_PHASE_2-2c Bloom-Validation, V4 ATOM-UNIT-Framework.
  - **Katalog-Patches (3):** K1 G/HE/M-Katalog STR-01 Rollen-Klaerung, K2 STR-12 Trigger-Kodifizierung, K3 Post-STR-01 Drift-Check.
  - **Engine-Patches (6):** E1 BLOCKING Aufgabentyp-Renderer STR-08/11, E2 BLOCKING Legacy-Feedback-Fallback, E3 Cache-Busting v=4.0, E4 3-stufige Tipps, E5 WCAG 2-Phasen-Deployment, E6 Trigger-Injection-Guard.
  - **Phase-IV Gate-Matrix (8 Gates)** definiert. Startbedingung: G-1 (RA7) + G-5 + G-7 + G-8 gemerged.
  - **Gate-Urteil 5d:** BEDINGT freigegeben fuer 5e. Bedingung: III.5c-bis RA7 Datenschutz-Audit vor 5e.
  - `UEBERGABE_PHASE_III_5_5d.md` angelegt.
  - State-File auf `5d COMPLETE`, neue Zeile `5c-bis RA7 Datenschutz` im Sub-Phasen-Register hinzugefuegt.
- D15b-Optimierung Phase III.5c COMPLETE (Session 11):
  - State-File auf `III.5c IN_PROGRESS` gesetzt.
  - 2 parallele Subagenten (RA3 + RA4, subagent_type general-purpose) in EINER Nachricht via `Agent` Tool gespawnt.
  - **BERICHT_RA3_CODE_KOPPLUNG.md** (636 Z, 12 Pflicht-Sektionen, 11 Findings):
    - F-RA3-01 CRITICAL (escape-engine.js Z. 1919-1924): Legacy-Feedback-Kompatibilitaet erforderlich, sonst brechen Mappen 1-4 bei STR-03 Rollout.
    - F-RA3-05 CRITICAL/BLOCKER (escape-engine.js Z. 1868-1945): STR-08/11 neue Aufgabentypen ohne Renderer.
    - F-RA3-04 CRITICAL: Cache-Busting v=3.9→v=4.0 in ALLEN HTML synchron (Projekt-Regel).
    - F-RA3-02 HIGH: STR-04 3-stufige Tipps brauchen Engine-Renderer-Erweiterung.
    - F-RA3-07 HOCH: STR-20 WCAG Rendering-Impact unklar.
    - Wave-3-Atomisierung: STR-03+STR-04 atomar, STR-20 nicht rein atomar (CSS+JS gemischt).
  - **BERICHT_RA4_PIPELINE.md** (818 Z, 15 Pflicht-Sektionen, 12 Findings inkl. Vertrags-Kontrakt-Map, STR-zu-Vertrag-Matrix):
    - F-RA4-02 P0 BLOCKING (ORCHESTRATOR.md v4.0 IL-4): Session-Split-Enforcement-Gap — PFLICHT im Text, aber nicht im Template/Checkpoint-Mechanismus. Phase 2.1c→2.2a Token-Kontext-Leak-Risiko.
    - F-RA4-01 P1 HIGH (VERTRAG_PHASE_2-2b_AUFGABE.md): STR-03 Feedback-Schema Breaking Change (string → `{typ, text, ebene}`), Engine-Kompatibilitaet nicht dokumentiert.
    - F-RA4-03 P1 HIGH (VERTRAG_PHASE_2-2c_CROSS.md): Bloom-Validation fehlt in A1 Q-Gate, STR-02 Durchsetzung unmoeglich.
    - F-RA4-06 P0 CRITICAL: ATOM-UNIT Synchronisation STR-04/05/08/11 nicht vertraglich erzwungen.
    - Vertrags-Patch-Prioritaeten: ORCHESTRATOR Session-Split-Checkpoint, VERTRAG_PHASE_2-2b Feedback-Schema Migration, VERTRAG_PHASE_2-2c Bloom-Distribution-Validation.
  - Pre-Check RA3+RA4 PASS.
  - **RA5 Meta-Auditor seriell gespawnt** (nach RA3+RA4 Abschluss). RA5 las alle 5 anderen Berichte (RA1, RA2, RA3, RA4, RA6).
  - **BERICHT_RA5_META.md** (384 Z, 14 Pflicht-Sektionen, 6 Meta-Findings):
    - **Konvergenz-Matrix** STR×RA: Top-6 Multi-RA-Hotspots: (1) STR-04 3 RAs, 2×P0 CRITICAL; (2) STR-05 4 RAs; (3) STR-12 3 RAs inkl. Sicherheitsluecke; (4) STR-03 2 RAs CRITICAL+P1; (5) STR-08 3 RAs; (6) STR-11 3 RAs.
    - **Dissens-Register:** Kein direkter Verdikt-Dissens. Nur koordinative Spannungen (RA1/RA4 ATOM-UNIT komplementaer; RA6/RA1 STR-05/14 unterschiedliche Ebenen).
    - **Blindspot-Map:** 7 Blindspots — Datenschutz/DSGVO **CRITICAL nicht abgedeckt**, Performance (keine Benchmarks), Sicherheit (nur gestreift), Operative Robustheit, Rollback-Faehigkeit, Developer-Experience (keine Prompt-Test-Runs), Dokumentations-Drift (keine SLA).
    - **Severitaets-Kalibrierung:** RA1/RA3/RA4/RA6 gut kalibriert. **RA2 leichte Inflations-Tendenz** (F-RA2-03 Cleanup-Befund koennte P3 statt P0 sein).
    - **Scope-Disziplin:** Alle 5 RAs STRIKT DISZIPLINIERT. RA4 minimal-legitime Erweiterung auf Orchestrator-Kontext.
    - **Adaptierte Rubrik** fuer III.5d Verifikations-Gate.
    - 6 Meta-Findings: F-RA5-01 P0 ATOM-UNIT Sync-Enforcement (PHASE-IV-BLOCKIEREND), F-RA5-02 P1 Feedback-Schema Breaking Change, F-RA5-03 P1 Trigger-Sicherheit, F-RA5-04 P2 Subagent-DX, F-RA5-05 P1 Katalog-Rollen nach STR-01, F-RA5-06 P1 Koordinations-Luecken.
  - Pre-Check RA5 PASS.
  - `UEBERGABE_PHASE_III_5_5c.md` angelegt mit vollstaendiger Befund-Synthese, Konvergenz-Top-6, Dissens, Blindspots, Kalibrierung, Naechster-Schritt-Protokoll fuer 5d (Verifikations-Gate) und 5e (Synthese + Zweitmeinung via comprehensive-review:full-review).
  - `D15B_PHASE_III_5_AUDIT_STATE.md` aktualisiert: 5c COMPLETE, Artefakt-Register mit Pre-Check-Ergebnissen.
- D15b-Optimierung Phase III.5b COMPLETE (Session 11):
  - State-File auf `III.5b IN_PROGRESS` gesetzt.
  - 3 parallele Subagenten (RA1 + RA2 + RA6, subagent_type general-purpose) in EINER Nachricht via `Agent` Tool gespawnt. Jeder las seine Charta + Evidenz-Bundle und schrieb Bericht direkt in seine BERICHT-Datei.
  - **BERICHT_RA1_SCOPE_DRIFT.md** (492 Zeilen, 9 Pflicht-Sektionen, 9 Findings: 2 HIGH / 6 MEDIUM / 1 LOW. Kritischste: F-RA1-02 STR-12 Trigger-Engine, F-RA1-01 STR-05 Multiperspektivitaet-Logik, F-RA1-03 STR-08 Progressionsplan-Entscheidungsregel. Verdikte: 12 accept / 6 modify-scope / 0 reject).
  - **BERICHT_RA2_DEPENDENCIES.md** (533 Zeilen, 10 Pflicht-Sektionen inkl. Mermaid-Anhang mit annotiertem DAG, 7 Findings: P0 Wave-1 ATOM-Ordering STR-02/STR-11 + E1↔E3↔E5 Sync-Timing, P1 kritischer Pfad, P2 Engine-Kopplung. DAG azyklisch verifiziert, keine verwaisten Kanten nach Streichung 07/10/16/18).
  - **BERICHT_RA6_KONTEXT.md** (452 Zeilen, alle Pflicht-Sektionen, 8 Findings: 2 P0 / 3 P1 / 3 P2. Kritischste: F-RA6-01 STR-01 Katalog-Rollen-Unklarheit G vs HE, F-RA6-02 STR-01 M-Katalog Tiefenstruktur-Drift, F-RA6-05 STR-12 Trigger-Sensibilitaet Ethik-Luecke in Katalogen).
  - Pre-Check aller 3 Berichte PASS (Zeilen, Pflicht-Sektionen, Findings-Mindest).
  - Erste informelle Konvergenz-Hinweise: STR-12 (RA1+RA6), STR-01 (RA2+RA6), STR-02/11 (RA1+RA2) als Multi-RA-Hotspots. Formelle Konvergenz-Matrix erfolgt durch RA5 in III.5c.
  - `UEBERGABE_PHASE_III_5_5b.md` angelegt als Cold-Session-Wiederaufnahme mit Pre-Check-Tabelle, Konvergenz-Hinweisen, bekannten Limits, Naechster-Schritt-Protokoll fuer 5c.
  - `D15B_PHASE_III_5_AUDIT_STATE.md` aktualisiert: 5b COMPLETE, Artefakt-Register mit Pre-Check-Ergebnissen.
- D15b-Optimierung Phase III.5a COMPLETE (Session 10 Forts. 11):
  - `docs/projekt/phase-iii-5/` Verzeichnis angelegt.
  - **Verifikations-Test Subagent-Spawning PASS:** 1 Dummy-Agent (Explore subagent_type) mit trivialer Dateisystem-Task erfolgreich gespawnt, isoliert ausgefuehrt, Ergebnis zurueckgegeben, korrekt terminiert. Report: `VERIFIKATIONSTEST_TEAM_SPAWN.md`. Entscheidung: Primaerer Mechanismus fuer 5b/5c = parallele `Agent`-Tool-Aufrufe in einer Nachricht.
  - **6 Rollen-Charten** verfasst mit Rollen-Definition, Primaerfrage, Scope-Grenzen, Methodik, Output-Schema (Pflicht-Sektionen), Anti-Kontaminations-Regeln, Verbotenes, Freigabe-Kriterium: CHARTA_RA1_SCOPE_DRIFT, CHARTA_RA2_DEPENDENCIES, CHARTA_RA3_CODE_KOPPLUNG, CHARTA_RA4_PIPELINE, CHARTA_RA5_META, CHARTA_RA6_KONTEXT.
  - **6 Evidenz-Bundles** mit Pflicht-Lektuere, kontextueller Lektuere, expliziten Verboten (Scope-Abgrenzung zu anderen RAs), erwarteter Output-Datei, kritischen Ankerpunkten: EVIDENZ_BUNDLE_RA1 bis EVIDENZ_BUNDLE_RA6.
  - `UEBERGABE_PHASE_III_5_5a.md` als Cold-Session-Wiederaufnahme-Prompt mit Entscheidungen, Naechster-Schritt-Protokoll, Checkpoint-Protokoll.
  - `D15B_PHASE_III_5_AUDIT_STATE.md` aktualisiert: 5a COMPLETE, Artefakt-Register auf COMPLETE.
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
