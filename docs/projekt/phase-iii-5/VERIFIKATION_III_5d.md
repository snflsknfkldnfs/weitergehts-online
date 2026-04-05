# VERIFIKATION III.5d — Verifikations-Gate

**Zweck:** Systematische Verifikation der 5b/5c-Befunde vor Synthese (5e). Konsolidiert Kalibrierung, Blindspots, Konvergenz-Verdikte, ATOM-UNIT-Framework, Patch-Listen.

**Erstellt:** 2026-04-05
**Status:** COMPLETE
**Vorlage-Autoritaet:** `AUSFUEHRUNGSPLAN_D15B_PHASE_III_5_RISIKO_AUDIT.md`, `BERICHT_RA5_META.md`, `UEBERGABE_PHASE_III_5_5c.md`.

---

## 1. Kalibrierungs-Korrektur RA2

**RA5-Befund:** F-RA2-03 (4 gestrichene STR Cleanup, Severitaet P0) koennte inflationiert sein.

**Pruefung:**
- F-RA2-03 beschreibt: Referenz-Reste der gestrichenen STR-07/10/16/18 in Dependencies-Listen und DAG-Metadaten.
- Wirkung: Keine Runtime-Blockade. Keine Vertragsverletzung. Keine Benutzer-Sichtbarkeit. Reine Housekeeping-Luecke.
- P0 Definition (Projekt-Standard): "Blockiert Phase IV, Runtime-Fehler, Datenverlust, Kompatibilitaetsbruch."
- F-RA2-03 erfuellt KEINE P0-Kriterien.

**Entscheidung:** **F-RA2-03 DOWNGRADE P0 → P3 (Cleanup).** Wird in Phase IV als Housekeeping-Task vor Wave-1-Start eingeplant, nicht als Blocker.

**Wirkung auf RA2 Gesamt-Severitaet:**
- Vorher: 2×P0, 1×P1, 2×P2, 2×P3 (7 Findings)
- Nachher: 1×P0, 1×P1, 2×P2, 3×P3 (7 Findings)
- Verbleibende P0: F-RA2-01 Wave-1 ATOM-Unit-Ordering STR-02↔STR-11 (valide, bidirektionale Kopplung).

**Konsequenz fuer Portfolio:** P0-Count gesamt sinkt von 6 auf 5 (RA2:1 + RA4:2 + RA5:1 + RA6:2 − RA2:1 Downgrade = 5).

---

## 2. Blindspot-Entscheidungen (7 Blindspots)

| # | Blindspot | Schwere (RA5) | Entscheidung | Begruendung |
|---|---|---|---|---|
| B1 | **Datenschutz / DSGVO** | **CRITICAL** | **Zusaetzlicher RA7 in Phase III.5 nachtraeglich + Phase IV Pflicht-Gate** | Schule/Minderjaehrige. DSGVO-Verstoss juristisch und reputationell hoch. LocalStorage-Inhalte, Trigger-Warnungen, Progress-Tracking = personenbezogene Daten-Kandidaten. Kann nicht in Phase IV nachgezogen werden. |
| B2 | Performance (Rendering, Token, Engine-Durchsatz) | BLINDSPOT | **Phase IV Wave 0 Baseline-Benchmark** | Kein Blocker, aber Degradation-Risiko durch STR-03/04/20. Pre-Wave-1 Baseline pflicht, Post-Wave-3 Vergleich. |
| B3 | Sicherheit (Injection, XSS, Metadaten-Leaks) | PARTIAL | **Phase IV Wave 0 Mini-Audit (1 Session)** | RA6-05 + RA3-06 decken Teile ab. Formaler Mini-Audit auf escape-engine.js Eingabe-Pfade + Template-Interpolation vor STR-Rollout. |
| B4 | Operative Robustheit (Fehlerbehandlung, Offline) | BLINDSPOT | **Phase IV Wave 0 als Akzeptanz-Kriterium je ATOM-UNIT** | Nicht eigenstaendige Phase. Jede ATOM-UNIT muss graceful-failure-test erfuellen. |
| B5 | Rollback-Faehigkeit (Migration Mappen 1-4) | BLINDSPOT | **Phase IV PFLICHT-Protokoll vor jedem Deployment** | Besonders STR-03 Breaking Change. Feature-Flag + git tag + Deployment-Checkliste (siehe Engine-Patch-Liste). |
| B6 | Developer-Experience (Subagent-Prompts) | BLINDSPOT | **Pre-Phase-IV Dry-Run auf 1 Dummy-Mappe** | Vor Wave-1-Start 1 Subagent-Dry-Run gegen reduzierten Kontext, Output-Validitaet pruefen. Kein neuer RA noetig. |
| B7 | Dokumentations-Drift (Wartungs-SLA) | BLINDSPOT | **Folgeprojekt (post Phase IV)** | Kein Blocker fuer Phase IV. Wartungs-Modell nach Abnahme definieren. |

**Zusammenfassung:**
- **1 neuer RA** (RA7 Datenschutz) in Phase III.5 nachtraeglich erforderlich.
- **3 Blindspots** als Phase-IV Wave-0-Pflichtaufgaben (Performance, Sicherheit, Rollback).
- **2 Blindspots** als ATOM-UNIT-Akzeptanzkriterien bzw. Dry-Run (Robustheit, DX).
- **1 Blindspot** als Folgeprojekt (Doku-Drift).

**Konsequenz:** Phase III.5 wird um Sub-Phase **III.5c-bis** erweitert (RA7 Datenschutz-Audit), bevor 5e startet. Alternativ kann 5e konditional auf RA7-Ergebnis gestartet werden (5e synthetisiert 6 RAs, RA7 wird als Anhang nachgereicht).

**Entscheidung fuer Reihenfolge:** **5c-bis VOR 5e.** Datenschutz CRITICAL muss in der Haupt-Synthese sein, nicht Anhang.

---

## 3. Konvergenz-Top-6 — Konsolidierte Verdikte

Basis: RA5-Konvergenz-Matrix (BERICHT_RA5_META.md Sektion 4+13).

| # | STR | Titel | Multi-RA-Befund | Konsolidiertes Verdikt | Bedingung |
|---|---|---|---|---|---|
| 1 | **STR-04** | 3-stufige Tipps | 2×P0 CRITICAL ATOM-UNIT (RA4, RA5) + HIGH Rendering (RA3) | **ACCEPT mit PATCH** | Engine-Patch (Aufgabentyp-Renderer) + ATOM-UNIT-Framework (RA1+RA3+RA4 Check) verpflichtend vor Wave-3-Start. |
| 2 | **STR-05** | Multiperspektivitaet | 4 RAs: Scope-Warnung (RA1) + ATOM-UNIT (RA2/4) + SK9-M9 Overlap (RA6) | **MODIFY-SCOPE** | Entscheidungslogik NICHT in E2 sickern lassen. Nur Kontent-Ebene (E1/E3/E5) anpassen. SK9/M9 Rollen klar getrennt. |
| 3 | **STR-12** | Trigger | 3 RAs: E7 Engine-Risiko (RA1) + Sichtbarkeit (RA4) + **Sicherheitsluecke (RA6-05 CRITICAL)** | **ACCEPT mit PATCH + SICHERHEITS-REVIEW** | Trigger-Kodifizierung in Katalog PFLICHT (Katalog-Patch). Engine-Component-Test auf Injection/Bypass PFLICHT vor Rollout. Zusaetzlich in Phase-IV Mini-Audit (B3) geprueft. |
| 4 | **STR-03** | Feedback-Schema | CRITICAL Legacy-Break (RA3) + P1 Schema-Migration (RA4) | **ACCEPT mit BLOCKING PATCH** | Vertrags-Patch VERTRAG_PHASE_2-2b (Feedback-Schema Migration dokumentieren) + Engine-Legacy-Fallback Z. 1919-1924 BLOCKING vor Wave-3-Start. Rollback-Protokoll (B5) pflicht. |
| 5 | **STR-08** | Quellenkritik | 3 RAs: Progressionsplan-Logik-Leak (RA1) + Aufgabentyp-Renderer fehlt (RA3) + Subagent-Komplexitaet | **ACCEPT mit PATCH** | Engine-Renderer fuer neuen Aufgabentyp PFLICHT. Progressionsplan-Agent Scope-Guard: Quellenkritik-Logik nur als Content-Tag, nicht als Entscheidungslogik. |
| 6 | **STR-11** | Aufgabentypologie | 3 RAs: ATOM-UNIT Sync (RA2/4) + Aufgabentyp-Renderer BLOCKER (RA3) | **ACCEPT mit BLOCKING PATCH** | Engine-Renderer-Erweiterung (F-RA3-05) ist Phase-IV-Blocker. ATOM-UNIT Framework erzwingen. |

**Verdikt-Verteilung Top-6:** 5× ACCEPT-mit-PATCH, 1× MODIFY-SCOPE, 0× REJECT, 0× DEFER. Keine Streichungen.

**Konsequenz:** Alle 6 Hotspots bleiben im Portfolio. Jeder braucht minimum 1 Patch (Vertrag, Katalog oder Engine). Phase IV Wave-3 blockiert bis Patches geliefert.

---

## 4. ATOM-UNIT-Framework (Finalisiert)

**Begruendung:** RA4 F-RA4-06 + RA5 F-RA5-01 (P0 CRITICAL PHASE-IV-BLOCKIEREND). RA2 P0 Wave-1 Ordering, RA1 vs RA4 Dissens-Aufloesung.

### 4.1 Definition

Eine **ATOM-UNIT** ist eine Gruppe von STR-Umsetzungen, die auf denselben E1/E3/E5-Artefakt-Typen operieren und NUR gemeinsam committed/deployed werden duerfen, um Konsistenz zu wahren.

### 4.2 Bekannte ATOM-UNITs

| ATOM-UNIT | STR-Mitglieder | Grund | Wave |
|---|---|---|---|
| AU-1 | STR-02, STR-11 | Aufgabentypologie-Schema bidirektional gekoppelt (RA2 P0) | Wave 1 |
| AU-2 | STR-03, STR-04 | Feedback-Schema + Tipp-Renderer gemeinsam (RA3/RA4) | Wave 3 |
| AU-3 | STR-08, STR-11 | Quellenkritik-Aufgabentyp benoetigt Typologie-Frame | Wave 3 |
| AU-4 | STR-05 (solo + sync) | Multiperspektivitaet Content-Ebene E1/E3/E5 synchron | Wave 2 |

### 4.3 ATOM-UNIT Pre-Commit-Gate (PFLICHT)

**Jede ATOM-UNIT muss vor Commit drei Checks bestehen:**

1. **RA1-Scope-Check:** Keine Entscheidungslogik in E2/E4/E6/E7. Nur Content-Ebene.
2. **RA3-Code-Check:** Engine-Renderer fuer alle neuen Aufgabentypen vorhanden. Legacy-Fallback funktioniert. Cache-Busting v= inkrementiert in ALLEN HTML synchron.
3. **RA4-Vertrags-Check:** I/O-Schema kompatibel. Vertrags-Patches appliziert. Bloom-Distribution validiert (fuer A1 Q-Gate).

**Ausfuehrung:** Checks sind dokumentiert als Commit-Message-Abschnitt `## ATOM-UNIT Pre-Commit-Gate` mit 3 Sub-Sektionen. Kein Commit ohne die 3 Sektionen ausgefuellt.

### 4.4 Deployment-Regel

ATOM-UNIT-Mitglieder werden **gemeinsam deployed**. Kein Teil-Deployment. Bei Rollback: alle Mitglieder zurueckrollen.

---

## 5. Vertrags-Patch-Liste (priorisiert)

Basis: RA4 F-RA4-01/02/03/06.

| Prio | Patch | Datei | Change | Phase-IV-Blocker? |
|---|---|---|---|---|
| **P0 BLOCKING** | **V1** | `docs/projekt/ORCHESTRATOR.md` | IL-4 Session-Split-Checkpoint in Template + explizite Checkpoint-Bedingung (Phase 2.1c→2.2a Token-Kontext-Flush). | **JA** |
| P0 | V2 | `docs/projekt/phase-iv/VERTRAG_PHASE_2-2b_AUFGABE.md` | STR-03 Feedback-Schema Migration dokumentieren: `string → {typ, text, ebene}`. Legacy-Fallback-Klausel. Engine-Kompatibilitaets-Matrix Mappen 1-4. | JA (Wave 3) |
| P0 | V3 | `docs/projekt/phase-iv/VERTRAG_PHASE_2-2c_CROSS.md` | Bloom-Distribution-Validation als A1 Q-Gate Criterion hinzufuegen. | JA (Wave 1) |
| P1 | V4 | `docs/projekt/ORCHESTRATOR.md` + Vertraege | ATOM-UNIT-Framework (Sektion 4) in Orchestrator + betreffende Vertraege als Pre-Commit-Gate verpflichtend machen. | JA |

**Phase-IV-Gate:** Keine Wave startet, bis V1+V3 gemerged. V2 spezifisch Wave-3-Blocker. V4 querschnittlich.

---

## 6. Katalog-Patch-Liste (priorisiert)

Basis: RA6 F-RA6-01/02/05 + RA5 F-RA5-05.

| Prio | Patch | Datei(en) | Change |
|---|---|---|---|
| **P0** | **K1** | `docs/kataloge/G-Katalog.md`, `HE-Katalog.md` | STR-01 Tiefenstruktur-Meta: Rollen G vs HE klaeren. Ueberschneidungen explizit entscheiden. Material-QA-Luecke M-Katalog schliessen. |
| P1 | K2 | `docs/kataloge/*.md` (alle betroffen) | STR-12 Trigger-Sensibilitaet als formale Katalog-Kategorie kodifizieren. Ethik-Kodex-Referenz. Kategorie-Liste (Gewalt, Tod, Krieg, etc.) verpflichtend. |
| P1 | K3 | `docs/kataloge/*.md` | Post-STR-01 Rollen-Neubewertung aller Kataloge. Drift-Check. |

---

## 7. Engine-Patch-Liste (priorisiert)

Basis: RA3 F-RA3-01/02/04/05/07.

| Prio | Patch | Datei / Zeilen | Change |
|---|---|---|---|
| **P0 BLOCKING** | **E1** | `escape-engine.js` Z. 1868-1945 | Aufgabentyp-Renderer fuer STR-08 (Quellenkritik) + STR-11 (neue Typologie). BLOCKER Phase IV Wave 3. |
| **P0 BLOCKING** | **E2** | `escape-engine.js` Z. 1919-1924 | Legacy-Feedback-Fallback (string-Schema) — verhindert Mappen-1-4-Breakage bei STR-03. |
| P0 | E3 | Alle `*.html` Mappen | Cache-Busting-Protokoll: `?v=3.9 → ?v=4.0` synchron in ALLEN HTML-Referenzen. Checkliste vor Deployment. |
| P1 | E4 | `escape-engine.js` Tipps-Rendering | STR-04 3-stufige Tipps Renderer-Erweiterung. |
| P1 | E5 | `escape-engine.js` + CSS | STR-20 WCAG-Rendering-Impact. 2-Phasen-Deployment (CSS separat von JS). |
| P1 | E6 | Neuer Input-Sanitizer | STR-12 Trigger-Injection-Guard (Sicherheits-Review B3). |

---

## 8. Pre-Phase-IV Gate-Matrix

| Gate | Quelle | Art | Status |
|---|---|---|---|
| G-1 RA7 Datenschutz-Audit | B1 | Neue Sub-Phase III.5c-bis | **TODO** |
| G-2 Performance-Baseline | B2 | Phase IV Wave 0 | PLAN |
| G-3 Sicherheits-Mini-Audit | B3 | Phase IV Wave 0 | PLAN |
| G-4 Subagent-Dry-Run | B6 | Pre-Phase-IV | PLAN |
| G-5 Vertrags-Patches V1+V3+V4 | §5 | Merge vor Wave 1 | TODO Phase IV |
| G-6 Engine-Patches E1+E2+E3 | §7 | Merge vor Wave 3 | TODO Phase IV |
| G-7 Katalog-Patch K1 | §6 | Merge vor Wave 1 | TODO Phase IV |
| G-8 ATOM-UNIT Framework in Orchestrator | §4 / V4 | Merge vor Wave 1 | TODO Phase IV |

**Phase IV Startbedingung:** G-1 (RA7) abgeschlossen + G-5 + G-7 + G-8 gemerged. G-2/G-3/G-4 innerhalb Wave 0. G-6 vor Wave 3.

---

## 9. Re-Kalibrierte Severitaets-Bilanz Portfolio (post-5d)

| RA | P0 | P1 | P2 | P3 | Summe |
|---|---|---|---|---|---|
| RA1 | 0 | 2 (F-RA1-01, F-RA1-02) | 6 | 1 | 9 |
| RA2 | 1 (F-RA2-01) | 1 | 2 | 3 | 7 |
| RA3 | 3 (F-RA3-01, 04, 05) | 2 | 4 | 2 | 11 |
| RA4 | 2 (F-RA4-02, 06) | 3 | 5 | 2 | 12 |
| RA5 | 1 (F-RA5-01) | 4 | 1 | 0 | 6 |
| RA6 | 2 (F-RA6-01, 02) | 3 | 3 | 0 | 8 |
| **Gesamt** | **9** | **15** | **21** | **8** | **53** |

(RA7 Datenschutz noch offen.)

---

## 10. Verifikations-Gate Urteil

**Freigabe fuer Phase III.5e (Synthese + Zweitmeinung):** **BEDINGT.**

**Bedingung:** III.5c-bis (RA7 Datenschutz-Audit) muss VOR 5e abgeschlossen sein. RA7 wird als regulaerer Audit-Run mit eigener Charta + Evidenz-Bundle gestartet, Bericht BERICHT_RA7_DATENSCHUTZ.md. 5e synthetisiert dann 6 Primaer-RAs (RA1/2/3/4/6/7) + RA5 Meta (+ RA5-Supplement auf RA7).

**Alternative (nicht empfohlen):** 5e ohne RA7 starten, RA7 als Anhang. Wird verworfen wegen Datenschutz CRITICAL-Status.

**Scope-Stabilitaet:** Keine weiteren Streichungen. 20 aktive STR bleiben. Alle 6 Konvergenz-Hotspots ACCEPT-mit-PATCH oder MODIFY-SCOPE.

**Offene Punkte fuer 5e:**
- Full-Review-Zweitmeinung via `comprehensive-review:full-review` auf 6 Primaer-RAs (exklusive RA5) als Kontroll-Instanz.
- Vergleichs-Dokument manueller Audit vs. Tool-Audit.
- Finale Patch-Liste als Phase-IV-Vorbereitungs-Dokument.
- Phase-IV-Go/No-Go-Empfehlung.
