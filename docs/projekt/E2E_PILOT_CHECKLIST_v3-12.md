# E2E-Pilot-Checklist v3.12 (F0b-Integration)

**Version:** 1.0
**Erstellt:** 2026-04-19
**Zweck:** Strukturierte Durchlauf-Checklist fuer den naechsten End-to-End-Pilot nach F0b-Implementierung. Prueft die 11 F0b-Mechanismen (M1-M11) in ihrer integrierten Wirkung ueber alle Phasen: Phase 0.2 bis Phase 3.2. Erfolgskriterium: kein Mechanismus bleibt ungeprueft; jedes FAIL wird mit Reproducer-Artefakt persistiert.
**Referenz-Kontext:** Baut auf F0b.1-Matrix v2, F0B_PRIMING_INCLUDE_v1, sprachniveau_include_registry.json, trigger_keywords.json, perspektiv_enum.json, kolonial_terminologie_blacklist.json, wortschatz_r7_core.json.
**Nicht-Ziel:** Dies ist keine Testrun-Spezifikation — das konkrete Pilot-Thema wird separat gewaehlt (Empfehlung siehe §7). Die Checklist ist themen-unspezifisch.

---

## 0. Voraussetzungen (Pre-Flight)

| # | Bedingung | Pruefmethode | Status |
|---|---|---|---|
| P1 | Pilot-Thema beschlossen und an INHALTSBASIS-Titel fixiert | Eintrag in Orchestrator-PI | — |
| P2 | CC-Session in Zielsystem via tools/cc-launch.sh geoeffnet | LEARNINGS §1 Pre-Flight | — |
| P3 | Scripts aus B7 vorhanden und ausfuehrbar (deploy-check.sh, source-deploy-parity.sh, trigger-detector.sh, titel-validator.js, sprachniveau-gate.js, coverage-report.sh, entity-scanner.js, terminologie-scanner.sh, multiperspektiv-sanity.js) | `test -x` pro Script | — |
| P4 | Schemata aus B7 im target/schemata/ eingespielt (material_source, material_text, entities, mappe_metadata, glossar_template, perspektiv_inventar) | `ls` + JSON-Validate | — |
| P5 | Engine-Fix escape-engine.js:2814 eingespielt + Jest-Test gruen | `npm test` | — |
| P6 | sprachniveau_include_registry.json im Repo-Head mit canonical_hash_sha256 passend zu agents/_includes/F0B_PRIMING_INCLUDE.md | `sha256sum` vs Registry | — |
| P7 | ORCHESTRATOR.md-Zustand: LETZTE_PHASE = 0.0, trigger_categories leer, alle LETZTE_*-Gates nicht-gesetzt | grep ORCHESTRATOR-Zustandsblock | — |

---

## 1. Phase 0.2 — INHALTSBASIS mit Titel-/Trigger-Validierung (M7)

| # | Schritt | Erwartetes Ergebnis | Artefakt | FAIL-Handling |
|---|---|---|---|---|
| 1.1 | AGENT_INHALT produziert INHALTSBASIS mit `title`, `lp_anker`, Sachanalyse-Text | INHALTSBASIS.json im target/ | INHALTSBASIS_<scope>.json | Wiederholen Phase 0.2 |
| 1.2 | Phase 0.2.M R-TITEL-1 (Praezision): Titel entspricht LP-Terminologie + keine Marketing-Vokabeln | titel-validator.js PASS | titel-validator.log | Titel nachjustieren |
| 1.3 | Phase 0.2.M R-TITEL-2 (LP-Anbindung): lp_anker deckt min 1 LB-ID + 1 Kompetenzerwartung | titel-validator.js PASS | titel-validator.log | lp_anker erweitern |
| 1.4 | Phase 0.2.M R-TITEL-3 (Perspektiv-Neutralitaet): kein dominanz-reproduzierender Titel | titel-validator.js PASS | titel-validator.log | Titel umformulieren |
| 1.5 | Phase 0.2.M Trigger-Detektion: scripts/trigger-detector.sh liefert trigger_categories[] | INHALTSBASIS.header.trigger_categories gesetzt (ggf. []) | trigger-detector.log | Scanner-Debug, keywords ergaenzen |
| 1.6 | Q-Gate QI-TV PASS + QI-TD PASS | Q-GATE-LOG enthaelt PASS-Block | Q-GATE-LOG.md | Re-Dispatch Phase 0.2 |

**State-Advance-Bedingung:** 1.1-1.6 alle PASS, INHALTSBASIS enthaelt trigger_categories-Pflichtfeld.

---

## 2. Phase 0.3 — Skript (mit Priming §1/§3/§4)

| # | Schritt | Erwartetes Ergebnis | Artefakt | FAIL-Handling |
|---|---|---|---|---|
| 2.1 | AGENT_SKRIPT bindet F0B_PRIMING_INCLUDE §1, §3, §4 wortgleich als Header-Block ein | Sub-Agent-Prompt enthaelt Marker-Tag | Prompt-Log | Prompt-Template korrigieren |
| 2.2 | Skript-Chunks pro Mappe erzeugt | skript_mappe_<N>.json pro Mappe | skript/ | Re-Dispatch |
| 2.3 | sprachniveau-gate.js auf Skript-Chunks: R7-Metriken innerhalb Grenzen | Gate PASS pro Chunk | sprachniveau-gate.log | Skript umschreiben |
| 2.4 | entity-scanner.js erzeugt entities.json-Registry aus Skript | registry/entities.json | entities.json | Skript-Entity-Inkonsistenz korrigieren |
| 2.5 | terminologie-scanner.sh auf Skript-Chunks: Blacklist-Scan PASS | terminologie-scanner.log | terminologie-scanner.log | Skript-Terminologie ersetzen |

---

## 3. Phase 0.4 — Hefteintrag (mit Priming §1/§3)

| # | Schritt | Erwartetes Ergebnis | Artefakt | FAIL-Handling |
|---|---|---|---|---|
| 3.1 | AGENT_HEFTEINTRAG bindet §1 + §3 ein | Prompt-Log | — | Prompt-Template korrigieren |
| 3.2 | scpl-Knoten pro Mappe erzeugt | hefteintrag_mappe_<N>.json | heftezintraege/ | Re-Dispatch |
| 3.3 | sprachniveau-gate.js auf scpl.knoten[].merksatz + stundenfrage | Gate PASS | sprachniveau-gate.log | Knoten-Texte umschreiben |
| 3.4 | terminologie-scanner.sh auf scpl-Knoten | PASS | terminologie-scanner.log | Begriff ersetzen |
| 3.5 | Ueberleitungs-Felder zwischen Hefteintrag-Mappen konsistent (Entity-Referenz) | entity-scanner.js --cross-mappe PASS | entity-scanner.log | Namen/Daten harmonisieren |

---

## 4. Phase 1 / 2.1 — Material (mit Priming §1/§2/§3)

| # | Schritt | Erwartetes Ergebnis | Artefakt | FAIL-Handling |
|---|---|---|---|---|
| 4.1 | AGENT_MATERIAL Design-Modus: Perspektiv-Verteilungs-Plan pro Mappe (min 2 nicht-dominant wenn Trigger aktiv) | MATERIAL_GERUEST_Mappe_<N>.json | material-plan | Plan erweitern |
| 4.2 | SUB_MATERIAL_* (alle 7) binden §1+§2+§3 ein | Prompt-Log pro Sub | — | Prompt-Template korrigieren |
| 4.3 | materialien/*.json: perspektiv_tags[] Pflichtfeld gesetzt, Enum-konform (gegen perspektiv_enum.json) | Schema-Validate PASS | schema-validate.log | Tag korrigieren |
| 4.4 | sprachniveau-gate.js auf material.text (mit Primaerquellen-Ausnahme wenn markiert) | PASS pro Material | sprachniveau-gate.log | Text umschreiben |
| 4.5 | terminologie-scanner.sh auf alle Material-Text-Felder | PASS (Primaerquellen-Ausnahme respektiert) | terminologie-scanner.log | Begriff ersetzen |
| 4.6 | coverage-report.sh pro Mappe: bei aktiver Trigger-Kategorie min 2 nicht-dominant-Materialien | PASS | coverage-report.log | Material-Mix ergaenzen |

---

## 5. Phase 2.1b — Didaktik-Review (mit Achse D4-3 + D6)

| # | Schritt | Erwartetes Ergebnis | Artefakt | FAIL-Handling |
|---|---|---|---|---|
| 5.1 | D4-3 Sprachniveau-Rezipienten-Check qualitativ pro Mappe | Review-Memo | didaktik-review.md | Material nachbearbeiten |
| 5.2 | D6-1 QG-06 Coverage-Review (qualitative Kontrolle der quantitativen Coverage) | Review-Memo | didaktik-review.md | Material-Auswahl anpassen |
| 5.3 | D6-2 QG-07 Kolonialterminologie-Review | Review-Memo | didaktik-review.md | Begriff + Alternative diskutieren |
| 5.4 | D6-3 Perspektiv-Tag-Drift-Stichprobe (manuelle Validierung 3 zufaellig ausgewaehlter Tags gegen Material-Inhalt) | Review-Memo | didaktik-review.md | Tag korrigieren |

---

## 6. Phase 2.2 — Aufgaben (mit Priming §1/§3)

| # | Schritt | Erwartetes Ergebnis | Artefakt | FAIL-Handling |
|---|---|---|---|---|
| 6.1 | AGENT_RAETSEL + SUB_AUFGABE_* (8 Sub-Agents) binden §1+§3 ein | Prompt-Log | — | Prompt-Template korrigieren |
| 6.2 | aufgaben/*.json produziert, Typvielfalt ≥ 3 pro Mappe | Schema-Validate PASS | schema-validate.log | Typ-Auswahl ergaenzen |
| 6.3 | sprachniveau-gate.js auf stem + distraktoren[] + feedback + loesung | PASS | sprachniveau-gate.log | Text umschreiben |
| 6.4 | terminologie-scanner.sh auf alle Aufgaben-Text-Felder | PASS | terminologie-scanner.log | Begriff ersetzen |

---

## 7. Phase 2.3 — Mappenabschluss (mit Priming §1/§3/§5)

| # | Schritt | Erwartetes Ergebnis | Artefakt | FAIL-Handling |
|---|---|---|---|---|
| 7.1 | SUB_TEMPLATE_MAPPENABSCHLUSS bindet §1+§3+§5 ein | Prompt-Log | — | Prompt-Template korrigieren |
| 7.2 | perspektiv_inventar.json pro Mappe erzeugt (aus material.perspektiv_tags aggregiert) | perspektiv_inventar.json | registry/ | Aggregation debug |
| 7.3 | mappenabschluss/*.json mit reflexion_fragen + ueberleitungssatz | Schema-Validate PASS | schema-validate.log | Re-Dispatch |
| 7.4 | multiperspektiv-sanity.js bei aktiver Trigger-Kategorie: min 1 reflexion_frage adressiert Nicht-Dominant-Perspektive | PASS | multiperspektiv-sanity.log | Frage nacharbeiten |

---

## 8. Phase 3.0 — Assembly (mit SUB_ASSEMBLY_VERIFY V14-V20)

| # | Schritt | Erwartetes Ergebnis | Artefakt | FAIL-Handling |
|---|---|---|---|---|
| 8.1 | data.json assembliert | escape-games/<scope>/data.json | data.json | Re-Dispatch Phase 3.0 |
| 8.2 | V14 Entity-Scan (entity-scanner.js gegen entities.json) PASS | V14-Log PASS | assembly-verify.log | Entity-Inkonsistenz korrigieren |
| 8.3 | V15 Coverage-Report (coverage-report.sh, nur bei aktiver Trigger-Kategorie) PASS | V15-Log PASS | assembly-verify.log | Material-Mix ergaenzen |
| 8.4 | V16 Priming-Konformitaet (priming-hash-check.sh gegen Registry) PASS | V16-Log PASS | assembly-verify.log | Include-Block in Prompt korrigieren |
| 8.5 | V17 Runtime-Metrik (sprachniveau-gate.js auf data.json-Artefakte) PASS | V17-Log PASS | assembly-verify.log | Artefakt-Text nacharbeiten |
| 8.6 | V18 Kolonial-Blacklist-Scan (terminologie-scanner.sh) PASS | V18-Log PASS | assembly-verify.log | Begriff ersetzen |
| 8.7 | V19 Multiperspektiv-Synthese-Check (multiperspektiv-sanity.js, nur bei aktiver Trigger-Kategorie) PASS | V19-Log PASS | assembly-verify.log | reflexion_frage nacharbeiten |
| 8.8 | SUB_ASSEMBLY_VERIFY insgesamt PASS = Freigabe fuer git commit | Assembly-Verify-Master-Log | — | Wiederhole ab Fehlerstelle |

---

## 9. Phase 3.1 — Deploy-Preparation (mit DEPLOY-01..07)

| # | Schritt | Erwartetes Ergebnis | Artefakt | FAIL-Handling |
|---|---|---|---|---|
| 9.1 | tools/deploy-check.sh <scope> ausfuehren | Exit-Code 0, alle 7 Gates PASS | Q-GATE-LOG.md | Pro FAIL §3 FAIL-PROTOKOLL VERTRAG_PHASE_3-1_DEPLOY |
| 9.2 | DEPLOY-07 (Source-Deploy-Parity) aktiv: SOURCE_SHA256=DEPLOY_SHA256 | MATCH=yes in Log | source-deploy-parity.log | Re-Deploy triggern |
| 9.3 | Q-GATE-LOG-Block Phase 3.1 angehaengt (game-scope) | docs/agents/artefakte/<scope>/Q-GATE-LOG.md | — | Log nachtragen |
| 9.4 | Landing-Page-`<li>` data-status="staging" gesetzt | grep in index.html | — | Attribut nachtragen |
| 9.5 | Commit `v3.12 <scope> pilot-staging` angelegt | git log | — | Commit nachholen |
| 9.6 | PI-Felder LETZTE_DEPLOY_CHECK_STATUS=PASS + LETZTE_DEPLOY_CHECK_TS aktuell + LETZTE_DEPLOY_CHECK_SCOPE matcht | ORCHESTRATOR-Zustandsblock | — | PI nachpflegen |

---

## 10. Phase 3.2 — Live-Go (mit Pre-Live-BLOCK Invariante)

| # | Schritt | Erwartetes Ergebnis | Artefakt | FAIL-Handling |
|---|---|---|---|---|
| 10.1 | Pre-Live-BLOCK Invariante-Check: PI-Felder erfuellen §2.4 VERTRAG_PHASE_3-1 | Check PASS | — | Re-Check Phase 3.1 |
| 10.2 | Landing-Page-`<li>` data-status von "staging" auf "live" oder Attribut entfernen | grep | — | nachziehen |
| 10.3 | Commit `v3.12 <scope> live` | git log | — | Commit nachholen |
| 10.4 | Live-Site-Smoke-Test (URL oeffnen, Mappen durchlaufen, Hefteintrag rendert) | manuelle Validierung | screenshot | Fix + Re-Deploy |

---

## 11. Post-Pilot — Drift-Audit (als Teil von F0b.3b)

| # | Schritt | Erwartetes Ergebnis | Artefakt |
|---|---|---|---|
| 11.1 | Anzahl Gate-FAILs pro Phase erfasst | Stats-Tabelle | pilot-stats.md |
| 11.2 | False-Positive-Rate pro Scanner (trigger-detector, terminologie-scanner, sprachniveau-gate) | Stats | pilot-stats.md |
| 11.3 | Manuelle Stichproben-Gegenpruefung 3 Materialien pro Mappe (Tag, Sprache, Terminologie) | Review-Memo | drift-audit.md |
| 11.4 | Empfehlungen fuer Enum-/Blacklist-/Keyword-Justierung | Matrix | drift-audit.md |
| 11.5 | F0b-Close-Entscheidung: alle Mechanismen produktiv belegt = F0b abgeschlossen | Entscheidung | STATUS.md-Update |

---

## Operationelle Hinweise

- **Artefakt-Persistenz:** Alle *.log und Review-Memos unter `docs/projekt/pilot-f0b/<scope>/` ablegen. Keine Logs nur in stdout.
- **CC-vs-Cowork-Arbeitsteilung:** Phase 0.2-2.3 = Cowork Orchestrierung + Sub-Agent-Dispatches; Phase 3.0 Assembly = CC; Phase 3.1 Deploy-Check = CC (Script-Aufruf); Staging-Flag + Live-Go = CC.
- **Abbruch-Kriterium:** Bei 3 aufeinanderfolgenden FAILs am gleichen Gate Eskalation an Orchestrator, Re-Spezifikation der Mechanismus-Implementierung.
- **Themen-Wahl-Empfehlung:** Erster Pilot mit mittlerer Trigger-Aktivierung (z.B. LB2 Absolutismus/Revolution = macht_asymmetrie + revolution, aber keine unterdrueckung/kolonisierung) — test deckt Kern-Gates ab ohne Full-Stack-Aktivierung. Folge-Pilot LB4 fuer Full-Stack-Test.

## Referenzen

- `escape-game-generator/agents/_includes/F0B_PRIMING_INCLUDE.md`
- `escape-game-generator/architektur/sprachniveau_include_registry.json`
- `escape-game-generator/architektur/trigger_keywords.json`
- `escape-game-generator/architektur/perspektiv_enum.json`
- `escape-game-generator/architektur/kolonial_terminologie_blacklist.json`
- `escape-game-generator/architektur/wortschatz_r7_core.json`
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_0-2_INHALT.md` §3.4
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_2-0_RAHMEN.md`
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_2-1_MATERIAL.md`
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_2-1b_DIDAKTIK_REVIEW.md`
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_3_ASSEMBLY.md` §3.4.4
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_3-1_DEPLOY.md`
- `docs/fachdidaktik/LEHRPLAN_QM_GPG7_MITTELSCHULE.md` §7 Q-Gates
