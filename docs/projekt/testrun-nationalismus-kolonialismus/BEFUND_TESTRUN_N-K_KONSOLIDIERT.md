# BEFUND TESTRUN `deutscher-nationalismus-kolonialismus` — KONSOLIDIERT

**Gegenstand:** Vollaudit-Synthese der 5 Review-Dimensionen (RA1 Pipeline, RA2 Didaktik/Material, RA3 Engine/Assembly, RA4 Medien/Lizenz, RA5 PM/Prozess/Meta).
**Stand:** 2026-04-18
**Autor:** Cowork-PM (Synthese aus 5 Subagenten-Berichten)
**Scope:** Testrun 2026-04-10 bis 2026-04-16, 3 Sessions, 3337 Messages, 1153 Tool-Calls, 45 Errors, 12 Auto-Kompaktionen, 5 Subagenten-Spawns.
**Produkt-Status:** Mappen 1-3 live deployed; Mappe 4 Rahmen unvollstaendig.

---

## 0. Inhaltsverzeichnis

1. Executive Summary + Gate-Urteil Overall
2. Methodologie-Synthese
3. Finding-Kanon (60 Findings, priorisiert nach Severitaet und Cross-RA-Konvergenz)
4. P0-Blocker-Kanon (sofort-fix-pflichtig)
5. Cross-RA-Muster (Themen die in mehreren Dimensionen auftauchen)
6. Q-Gate-Auslastung (G-A1 bis G-A7)
7. Plan-Impact-Matrix (Mapping 60 Findings → UPGRADE_PLAN v3.12 Massnahmen)
8. UPGRADE_PLAN-Delta (neue Plan-Impact-Items)
9. Empfehlungs-Portfolio (Sofort / Kurzfrist / Mittelfrist)
10. Offene Fragen / Nicht-Resolvierbares
11. Anhang A: Alle 60 Findings mit Cross-Refs
12. Anhang B: Bericht-Pfade + Finding-IDs je RA

---

## 1. Executive Summary + Gate-Urteil Overall

**Gate-Urteil Overall: ROT** (6 P0-Blocker, 2 davon strukturell; 22 P1 quer durch alle Dimensionen).

**Ein-Satz-Befund:** Die Pipeline produziert didaktisch brauchbare Mappen (1+2 einsetzbar), aber die Medien-Dimension (RA4) und das Medium-term-Patch-Persistenz-Muster (RA5) blockieren eine Freigabe als v3.12-Pilot ohne sofortige Patches.

**Was funktioniert:**
- Phase 0 Recherche-Qualitaet (Quellen-Basis grundsolide).
- Phase 1 Rahmen-Gerueste (SCPL strukturell tragfaehig).
- Phase 2 Material/Aufgaben-Produktion fuer Mappen 1+2.
- v3.9 Steuerungsrefaktor (ORCH-als-Router-Defekt F-P1 aus M1 neutralisiert).
- Engine-Rendering grundsaetzlich (80%+ Game-Fluss).

**Was nicht funktioniert:**
- Medien-Verifikations-Pipeline: 33% Hallu-Rate (6/18 Wikimedia-Dateinamen), kein R0.5 Dual-Kanal, keine Lizenz-Pre-Checks, strukturell unvollstaendige Attribution.
- Source-Deploy-Konsistenz: Patches nur in data.json, nicht in Source-JSON (mat-3-4.json traegt noch Hallu-Caption — Re-Assembly reproduziert Defekt).
- Engine-Defekt Lueckentext-Reset (single-line fix verfuegbar, aber Ur-Ursache Validator-Kopplung).
- Kompaktions-induzierte Regressionen bei Patch-Zyklen (Umlaute/Entities persistierten trotz Live-Push).
- CC→Cowork-Rueckmelde-Luecke (User musste Mappe-Status 2-3x erfragen).
- Mappe 4 Rahmen-Status unklar (Retro-Patch-Pflicht fuer img-4-1/-3/-4 offen).

**Priorisierung:** P0 vor P1 vor P2. RA4 dominiert (3/6 P0). RA3 liefert den Single-Line-Engine-Fix (kritischer UX-Blocker, hoher Hebel).

---

## 2. Methodologie-Synthese

Die 5 RAs arbeiteten auf gemeinsamer Evidenz-Basis (`evidenz/` — 10+ strukturierte Extrakte aus 15.8MB JSONL), jeweils mit RA-spezifischer Pflicht-Lektuere (Chartas). Rollen-Isolation wurde eingehalten (keine Cross-Writes, keine Produkt-Patches). Jeder RA lieferte einen persistierten Bericht in `BERICHT_RA[N]_*.md` mit Pflicht-Sektionen 1-13 (bzw. 1-16 fuer RA5).

Severitaets-Kalibrierung erfolgte RA-intern je Charta, aber einheitlich entlang der AUDIT_STATE-Skala (P0 Live-Blocker → P3 Cosmetic). In der Konsolidierung wurden RA-Findings cross-gematched; Duplikate/Verschiebungen werden in Anhang A transparent gemacht.

---

## 3. Finding-Kanon (60 Findings, Overview)

Vollstaendige Liste in Anhang A. Aggregations-Matrix:

| Severitaet | RA1 | RA2 | RA3 | RA4 | RA5 | Summe |
|-----------|-----|-----|-----|-----|-----|-------|
| P0 | 2 | 0 | 1 | 3 | 0 | **6** |
| P1 | 3 | 4 | 3 | 5 | 7 | **22** |
| P2 | 6 | 7 | 3 | 3 | 3 | **22** |
| P3 | 2 | 4 | 2 | 1 | 1 | **10** |
| **Summe** | **13** | **15** | **9** | **12** | **11** | **60** |

---

## 4. P0-Blocker-Kanon

Kanonisiert aus den 5 Berichten. Jeder P0 blockiert die v3.12-Freigabe.

| ID | Finding-ID | Beschreibung | RA | Fix-Typ | Aufwand |
|----|-----------|-------------|-----|---------|--------|
| P0-1 | F-RA1-05 | Phase 3.1 Deploy-Preparation bei Mappe 2 und 3 uebersprungen oder unterdokumentiert | RA1 | Vertrags-Patch PHASE-3-1 + Deploy-Checkliste | 1h |
| P0-2 | F-RA1-06 | V13-Patch-Regression Hefteintrag-Verschachtelung in Mappe 3 (trotz V13-Claim gefixt) | RA1 | Regression-Root-Cause + Vertrags-Zusatz | 1-2h |
| P0-3 | F-RA3-01 | Lueckentext-Pool-Reset-Bug escape-engine.js Z. 2814 (disabled-Check statt used-Klasse) | RA3 | Engine-Single-Line-Fix | 15 min + QA |
| P0-4 | F-RA4-04 | Source-Deploy-Drift mat-3-4.json (Hallu-Caption persistiert in Source, Re-Assembly reproduziert Defekt) | RA4 | Source-Patch + Re-Assembly-Regel | 30 min + Vertrag |
| P0-5 | F-RA4-10 | Mappe-4-Retro-Patch offen (img-4-1/-3/-4 Herero/Nama nicht verifiziert/ersetzt) | RA4 | Medien-Recherche + Patch | 1-2h |
| P0-6 | F-RA4-02 | Keine prospektive Verifikation in Phase 0.2 (erste API-Pruefung reaktiv nach Phase 3.0) — strukturelle Pipeline-Luecke | RA4 | VERTRAG_PHASE_0-2 Verifikations-Gate | 2h |

**Zusatzliche P0-Kandidaten (nicht im Kanon, aber cross-validiert):**
- F-RA4-01 (Hallu-Rate 33% bestaetigt) wurde von RA4 als P0 markiert, ist aber eine Befund-Bestaetigung der MV2-Lage — kein neuer Defekt. Wird in Plan-Impact gebundelt.

**Details und Evidenz-Zitate:** siehe jeweiliger BERICHT_RA[N].md.

---

## 5. Cross-RA-Muster

Themen, die in mehreren Dimensionen auftauchen (fuer Plan-Impact relevant):

**M-A Medien-Integritaet als systemischer Defekt:**
- RA4 dominant (Hallu-Rate, Lizenz, Ersatz).
- RA2 ergaenzt: didaktische Aequivalenz des Marechal-Ersatzes fragwuerdig (Leopold II. vs. Bismarck-Perspektive — Titel-Drift vs. Game-Thema).
- RA3 ergaenzt: Bildpfad-Referenzen in data.json sind RA3, aber Existenz-Pruefung ist RA4.
- **Plan-Impact:** R0.5 Dual-Kanal + R0.7 Lizenz-Pre-Check + neue MV2-Massnahmen zusammenfuehren.

**M-B Source-Deploy-Drift (Patch-Persistenz-Luecke):**
- RA3: Encoding-Drift (Entities im Live trotz Source-Update).
- RA4: Hallu-Caption nur in data.json, nicht in mat-3-4.json gefixt.
- RA5: Kompaktions-induzierte Regression bei Patch-Zyklen.
- **Plan-Impact:** Neuer Vertrags-Check "Patch-Propagation Source→Assembly→Deploy" + Re-Assembly-Validator.

**M-C Typ-Selektions-Heuristik bei R7:**
- RA2: Mappe-3-Aufgabe-3 (vergleich → begruendung) signalisiert Typ-Komplexitaets-Mismatch.
- RA3: PATCH-M3 Finding 4 als Engine-Interface-Problem klassifiziert.
- **Plan-Impact:** Aufgaben-Typ-Selektions-Katalog fuer R7 (welche Typen sind altersadaequat).

**M-D Context-Pressure / Kompaktions-Regression:**
- RA5: 12 Auto-Kompaktionen, Re-Flag-Pattern (User musste Umlaute 3x, Mappe-3-Status 2x).
- RA1: V13-Patch-Regression (Hefteintrag-Verschachtelung, Mappe 3).
- **Plan-Impact:** Post-Kompaktions-Re-Orientation-Protokoll + STATUS-Freeze bei Patch-Zyklen.

**M-E CC↔Cowork-Rueckmelde-Luecke:**
- RA1 + RA5: Phase 3.1/3.2-Rueckmelde-Struktur fehlt.
- **Plan-Impact:** Handoff-Template CC→Cowork mit Pflicht-Status-Payload.

**M-F F-P1/F-P2 aus M1-Befund — Status:**
- F-P1 (ORCH nicht als Router): durch v3.9 neutralisiert, **NICHT wiederkehrend**.
- F-P2 (Phase 3 in Cowork): teilweise wiederkehrend als CC→Cowork-Rueckmelde-Luecke, **nicht als Ursprungs-Root-Cause**.

---

## 6. Q-Gate-Auslastung

Die 7 Audit-Gates (G-A1 bis G-A7) aus AUDIT_STATE:

| Gate | Dimension | Urteil | Begruendung |
|------|-----------|--------|-------------|
| G-A1 | Pipeline-Konformitaet | GELB | F-P1 neutralisiert, aber Phasen-Uebergaenge ad-hoc bei Patch-Zyklen. |
| G-A2 | Didaktische Qualitaet R7 | GELB | Mappe 1+2 OK, Mappe 3 nicht live-reif (Aufgabe 3-3 + Sprachniveau). |
| G-A3 | Engine-Robustheit | GELB | 1 P0 Lueckentext-Reset (single-line fix), Dualstruktur hefteintrag als Nachfolge-Defekt. |
| G-A4 | Medien-Integritaet | ROT | 3 P0: Source-Drift, Mappe-4-offen, Lizenz-Gap. |
| G-A5 | PM-Prozess | ROT | 7 P1, conditional pass nach Patches; Kompaktions-Regression. |
| G-A6 | Q-Gate-Diszplin | GELB | Gates weitgehend durchlaufen, aber MV2 als Post-Hoc-Pruefung statt Pre-Check. |
| G-A7 | Gesamtbericht-Konsistenz | GRUEN | Alle 5 Berichte mit Gate-Urteil persistiert. |

**Overall-Gate-Urteil: ROT** (G-A4, G-A5 blockieren).

---

## 7. Plan-Impact-Matrix

Mapping der 60 Findings auf bestehende und neue Plan-Impact-Items. Ref: `UPGRADE_PLAN_v3-12_ESCAPE_GAME_QUALITAET.md` + `docs/analyse/Verlauf Game Imperialismus/UPGRADE_PLAN.md` (Testrun-Plan).

**Cluster A — Medien-Pipeline:**
- R0.5 Dual-Kanal-Pflicht (bereits im Plan) → bestaetigt + erweitert durch 12 RA4-Findings.
- R0.6 Titel-Validierung → verifiziert als notwendig.
- R0.7 bpb + Lizenz-Pre-Check → erweitert: urheber/commons_url/deed_url in data.json-Schema.
- **Neu:** PI-MV2-EXT1 Source-Deploy-Propagation (aus F-RA4-04).
- **Neu:** PI-MV2-EXT2 Mappe-4-Retro-Patch-Task (aus F-RA4-10).
- **Neu:** PI-MV2-EXT3 CC BY-SA Compliance Attribution-Schema.

**Cluster B — Engine-Defekte:**
- PATCH-M3 Findings 1-5 (bereits im Plan) → 4/5 gefixt, 1 (Entities) partial.
- UX-1 Finding 2 Lueckentext-Reset → P0-3 Fix-Spec verfuegbar.
- **Neu:** PI-ENGINE-1 Dualstruktur hefteintrag vs. sicherung.hefteintrag bereinigen (F-RA3-03).
- **Neu:** PI-ENGINE-2 Assembly-Validator (F-RA3-04/07).
- **Neu:** PI-ENGINE-3 Entity-Encoding-Pipeline-Hardening (F-RA3-Entities-Rest).

**Cluster C — Didaktik/Sprachniveau:**
- UX-1 Finding 1 (Sprachniveau) → bestaetigt durch RA2 F-RA2-Sprachniveau-Drift.
- UX-1 Finding 3 (Hefteintrag-Laenge) → bestaetigt.
- **Neu:** PI-DIDAKTIK-1 Typ-Selektions-Katalog R7 (aus Cross-RA-Muster M-C).
- **Neu:** PI-DIDAKTIK-2 A18-Luecke mat-3-6 afrikanische Perspektive (F-RA2-10).

**Cluster D — PM/Prozess:**
- F-P1/F-P2 aus M1 → Status aktualisiert (neutralisiert / teilweise wiederkehrend).
- **Neu:** PI-PM-1 Post-Kompaktions-Re-Orientation-Protokoll (aus Cross-RA-Muster M-D).
- **Neu:** PI-PM-2 CC→Cowork-Handoff-Template (aus Cross-RA-Muster M-E).
- **Neu:** PI-PM-3 STATUS-Freeze bei Patch-Zyklen.
- **Neu:** PI-PM-4 Re-Flag-Pattern-Detektor (User-Message-Klassifikator fuer wiederholte Eingaben).

**Cluster E — Pipeline-Vertraege:**
- F-RA1-P0-1, F-RA1-P0-2 → [aus BERICHT_RA1 ableiten, TBD bei Detail-Synthese]
- **Neu:** PI-PIPELINE-1 Patch-Propagation-Check im Deploy-Vertrag.

---

## 8. UPGRADE_PLAN-Delta (Kurz-Liste fuer Task #6)

Das bestehende UPGRADE_PLAN_v3-12 wird um folgende Plan-Impact-Items ergaenzt (Details in Anhang A und Bericht):

1. PI-MV2-EXT1 Source-Deploy-Propagation
2. PI-MV2-EXT2 Mappe-4-Retro-Patch
3. PI-MV2-EXT3 CC BY-SA Attribution-Schema
4. PI-ENGINE-1 Dualstruktur hefteintrag
5. PI-ENGINE-2 Assembly-Validator
6. PI-ENGINE-3 Entity-Encoding-Pipeline-Hardening
7. PI-DIDAKTIK-1 Typ-Selektions-Katalog R7
8. PI-DIDAKTIK-2 A18-Luecke Mappe 3
9. PI-PM-1 Post-Kompaktions-Re-Orientation
10. PI-PM-2 CC→Cowork-Handoff-Template
11. PI-PM-3 STATUS-Freeze-Protokoll
12. PI-PM-4 Re-Flag-Pattern-Detektor
13. PI-PIPELINE-1 Patch-Propagation-Check

Zusammen mit bestehenden 17 Plan-Impacts aus R0-FINAL+: **30 Plan-Impact-Items** total.

---

## 9. Empfehlungs-Portfolio

**Sofort (vor Mappe-4-Abschluss / v3.12-Pilot):**
- P0-3 Engine-Fix (15 min + QA).
- P0-4 Source-Drift mat-3-4.json (30 min).
- P0-6 Lizenz-Attribution Backfill fuer Mappen 1-3 (2-3h).
- P0-1, P0-2 RA1-Pipeline-Patches (siehe BERICHT_RA1).

**Kurzfrist (vor naechstem Testrun):**
- Mappe-4-Retro-Patch (P0-5).
- R0.5 Dual-Kanal implementieren.
- Post-Kompaktions-Re-Orientation-Protokoll etablieren.
- Aufgabe-3-3 nachliefern, A18-Luecke schliessen.

**Mittelfrist (Pipeline-Upgrade v3.13):**
- Assembly-Validator.
- Typ-Selektions-Katalog R7.
- CC→Cowork-Handoff-Template standardisieren.
- Source-JSON-Schema um Lizenz-Felder erweitern.

---

## 10. Offene Fragen / Nicht-Resolvierbares

- F-RA4-img-2-2 Live-Herkunft ungeklaert (MISSING in INHALTSBASIS, aber img-2-2.jpg deployed).
- F-RA3-Entities-Rest: 5 verbleibende Entities in Mappe 3 — Quelle unklar.
- RA5 Subagenten-Nutzung: 5 Spawns / 3337 Messages = strukturell unter-delegiert? Empfehlung unklar ob Problem oder bewusste Wahl.

---

## 11. Anhang A: Alle 60 Findings mit Cross-Refs

### RA1 Pipeline (13)

| ID | Sev | Kurzbeschreibung |
|----|-----|------------------|
| F-RA1-01 | P1 | Q-Gate-Mechanik de facto Selbst-PASS-Schleife |
| F-RA1-02 | P2 | Cowork-Medien-Nachrecherche-Schleife nach Phase 0.2 ohne Vertragsdeckung |
| F-RA1-03 | P3 | Phase 1 MATERIAL_GERUEST ohne eigene Q-Gate-Markierung in Evidenz-Extrakten |
| F-RA1-04 | P2 | Session-Splits ausserhalb PFLICHT-SPLIT als Notanker, nicht durch Vertragstrigger |
| **F-RA1-05** | **P0** | **Phase 3.1 Deploy-Preparation bei Mappe 2 und 3 uebersprungen oder unterdokumentiert** |
| **F-RA1-06** | **P0** | **V13-Patch-Regression in Mappe 3 (Hefteintrag-Verschachtelung trotz V13-Patch-Claim)** |
| F-RA1-07 | P1 | Patch-Persistenz bei Live-Defekt-Zyklus Mappe 3 (Umlaute/Entities ueberleben Push) |
| F-RA1-08 | P3 | Testrun-Abbruch vor Mappe 4 ohne Abschluss-Prozedur |
| F-RA1-09 | P2 | QA-/Post-Live-Rueckkanal fehlt als Pipeline-Phase |
| F-RA1-10 | P1 | Kompaktions-induzierte Constraint-Drift |
| F-RA1-11 | P2 | Ort-Constraint fuer Phase 3.0 gehalten, aber Rueckkopplung nach Cowork fehlt |
| F-RA1-12 | P2 | Engine-Patch in Infrastruktur-Schicht ausserhalb Phasen-Pipeline |
| F-RA1-13 | P2 | ORCHESTRATOR Uebergabe-Template nach V13-Patch im Testrun nicht als Routing-Referenz gelesen |

### RA2 Didaktik/Material (15)

| ID | Sev | Kurzbeschreibung |
|----|-----|------------------|
| F-RA2-01 | P2 | HE17: S-Zone Mappe 2 rekapituliert Mappe-1-Kernerkenntnis ("Scheitern von 1848") |
| F-RA2-02 | P2 | HE15: Ordnungsmuster-Deklaration "konzept-beispiel" faelsch (Struktur sequenziell-kausal) |
| F-RA2-03 | P1 | aufgabe-3-3 fehlt in Live-data.json (PATCH-M3 Finding 4 Umbau nicht assembliert) |
| F-RA2-04 | P2 | A17: SCPL-Zonen-Abdeckung Mappe 3 marginal, keine dedizierte Problem-Zonen-Aufgabe |
| F-RA2-05 | P2 | AFB-Feld fehlt bei allen Mappe-3-Aufgaben (null) — Produktions-Drift vs. M1+M2 |
| F-RA2-06 | P3 | AFB-Bloom-Inkonsistenz Mappe 1 (AFB I, Bloom 3) |
| F-RA2-07 | P3 | Fachbegriff "verspaetete Nation" in Aufgabe, nicht im Hefteintrag verankert |
| F-RA2-08 | P2 | Hefteintrag-Wortzahl Self-Report-Drift Mappe 3 (Q-Gate ~106W, tatsaechlich 125W) |
| F-RA2-09 | P1 | A18-Verletzung: mat-3-6 (afrikanische Perspektive) in keiner Aufgabe referenziert |
| F-RA2-10 | P1 | Sprachniveau-Drift Mappe 3 (Satzlaenge 13.0W, mat-3-1 ueber R7-Schwelle) — UX-1 F3 reproduziert |
| F-RA2-11 | P2 | Fachwortdichte Mappe 3 hoch, kein Dichte-Gate im Katalog |
| F-RA2-12 | P2 | Bildunterschriften alle Mappen 46-71W mit 4-5 Saetzen (UX-1 Ziel max 2 Saetze verfehlt) |
| F-RA2-13 | P1 | Typ vergleich R7-untauglich (PATCH-M3 F4) — Jahrgangs-Constraint fehlt |
| F-RA2-14 | P3 | zusammenfassung-Wortzahlen ungezaehlt, vermutlich ueber 50W-Ziel |
| F-RA2-15 | P3 | Niedrigschwelliger Einstieg R3-S1 in allen Mappen PASS (Bestaetigung, kein Handlungsbedarf) |

### RA3 Engine/Assembly (9)

| ID | Sev | Kurzbeschreibung |
|----|-----|------------------|
| **F-RA3-01** | **P0** | **Lueckentext-Pool-Reset-Bug escape-engine.js Z. 2814 (single-line-fix)** |
| F-RA3-02 | P2 | Persistente HTML-Entities Mappe 3 (5 Reste nach Push) |
| F-RA3-03 | P1 | Hefteintrag-Dualstruktur in data.json (`hefteintrag` vs `sicherung.hefteintrag`) |
| F-RA3-04 | P1 | V13-Patch-Regression-Anfaelligkeit (kein Post-V13-Validator) |
| F-RA3-05 | P2 | Lueckentext `--correct`-Persistenz ohne Sperre |
| F-RA3-06 | P3 | Cache-Bust-Versions-Divergenz |
| F-RA3-07 | P1 | Data-Validator fehlt zwischen Assembly und Deploy |
| F-RA3-08 | P2 | Entity-Scan fehlt in Post-Assembly |
| F-RA3-09 | P3 | Pool-Reset-Perf-Smell |

### RA4 Medien/Lizenz (12 + 1 Neu)

| ID | Sev | Kurzbeschreibung |
|----|-----|------------------|
| F-RA4-01 | P0 | Halluzinations-Rate 33% (6/18) bestaetigt (Befund-Uebernahme MV2) |
| **F-RA4-02** | **P0** | **Keine prospektive Verifikation in Phase 0.2 (erste API-Pruefung reaktiv)** |
| F-RA4-03 | P1 | Ersatz-Wahl Marechal didaktisch nicht validiert (Perspektiv-Drift Bismarck → Leopold II.) |
| **F-RA4-04** | **P0** | **Source-Deploy-Drift mat-3-4.json (Hallu-Caption in Source, Ersatz nur in data.json)** |
| F-RA4-05 | P3 | Zwei tot-heruntergeladene Assets (img-1-4, img-3-4 nach PATCH-M3) |
| F-RA4-06 | P1 | Lizenz-Attribution strukturell unvollstaendig (urheber, commons_url, deed_url fehlen) |
| F-RA4-07 | P2 | Kombiniertes Lizenz-Feld fuer img-1-1+img-1-4 nicht je Bild zuordenbar |
| F-RA4-08 | P2 | Kein globales Bildnachweis-Register (CREDITS.md / lehrkraft.html-Sektion) |
| F-RA4-09 | P2 | Lizenz-Feld fehlt bei mehreren quellentext-Materialien |
| **F-RA4-10** | **P0** | **Mappe-4 Retro-Patch offen (img-4-1/-3/-4) blockt Wiederaufnahme** |
| F-RA4-11 | P1 | R0.5 Dual-Kanal nicht implementiert (16 MCP + 5 WebFetch ohne Cross-Check) |
| F-RA4-12 | P1 | Ersatz-Workflow didaktisch nicht rueckgekoppelt (kein Phase-2.1b-Mini-Review) |
| F-RA4-13 | P1 | img-2-2 Live-Herkunft ungeklaert (Spotprent MISSING in INHALTSBASIS, Asset im Deploy) |

### RA5 PM/Prozess/Meta (11)

| ID | Sev | Kurzbeschreibung |
|----|-----|------------------|
| F-RA5-01 | P2 | Kein automatischer Pre-Kompaktions-Watchdog (Handoff nur auf User-Trigger) |
| F-RA5-02 | P1 | Auto-Kompaktions-Summaries ersetzen Handoff-Prompts, strukturell unzureichend |
| F-RA5-03 | P1 | STATUS.md nicht als Wiederaufsetz-Anker im Testrun genutzt |
| F-RA5-04 | P1 | (nicht extrahiert — in Bericht Sektion fehlt F-RA5-04 explizit; vermutlich Indexluecke) |
| F-RA5-05 | P1 | Kein Kompaktions-Resilience-Protokoll (kein Patch-Status-Dump vor Kompaktions-Druck) |
| F-RA5-06 | P1 | PI-Zustandsblock nicht synchron zu CC-Rueckmeldungen (MAPPEN_ABGESCHLOSSEN-Drift) |
| F-RA5-07 | P2 | Kein automatisches Zustandsblock-Audit am Session-Start |
| F-RA5-08 | P2 | Subagenten-Delegation ad-hoc (nur 2 Didaktik-Reviews in B, kein struktureller PM-Baustein) |
| F-RA5-09 | P3 | 10+ `File content exceeds tokens`-Fehler vermeidbar (Read-Pattern-Disziplin) |
| F-RA5-10 | P1 | Re-Flag-Events in Session C gehaeuft (kein Verifikations-Gate nach Patch-Push) |
| F-RA5-11 | P1 | Rueck-Uebergabe aus Claude Code nicht einheitlich (freitextlich vs. strukturiert) |

**Hinweis:** F-RA5-04 als Index-Luecke im Bericht vermerkt. Tatsaechliche Finding-Zahl fuer RA5: **11** (wie vom Agenten gemeldet).

---

## 12. Anhang B: Bericht-Pfade + Finding-IDs je RA

| RA | Bericht-Pfad | Finding-ID-Range | Bericht-Groesse |
|----|--------------|------------------|-----------------|
| RA1 | `BERICHT_RA1_PIPELINE.md` | F-RA1-01 bis F-RA1-13 | 44.7 KB |
| RA2 | `BERICHT_RA2_DIDAKTIK_MATERIAL.md` | F-RA2-01 bis F-RA2-15 | 37.2 KB |
| RA3 | `BERICHT_RA3_ENGINE_ASSEMBLY.md` | F-RA3-01 bis F-RA3-09 | 29.3 KB |
| RA4 | `BERICHT_RA4_MEDIEN_LIZENZ.md` | F-RA4-01 bis F-RA4-13 | 42.7 KB |
| RA5 | `BERICHT_RA5_PM_PROZESS_META.md` | F-RA5-01 bis F-RA5-11 | 37.0 KB |
