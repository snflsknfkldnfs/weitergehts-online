# Q-GATE-LOG — weimarer-republik-anfangsphase (Run-3)

**Game-Id:** weimarer-republik-anfangsphase
**Run-Id:** run-3-2026-04-26
**Initialisiert:** 2026-04-26

---

## Pre-Flight (Phase ONBOARDING -> 0.1)

| Check | Status | Details |
|---|---|---|
| Triple-Root: GENERATOR | PASS | `/Users/paulad/escape-game-generator` |
| Triple-Root: TARGET | PASS | `/Users/paulad/weitergehts.online/weitergehts-online` |
| Triple-Root: UEW | PASS | `/Users/paulad/weitergehts.online/Unterrichtseinwicklung` |
| Lehrplan-Anker | PASS | `Unterrichtseinwicklung/7c/Input_Artefake/Lehrplan/GPG_R7/Fachlehrplan_GPG_R7.md` referenziert |
| Run-2-Reference | PASS | Run-2-Output als orientierende Vorlage gelesen, eigenstaendige Q-Gate-Pruefung durchgefuehrt |
| game_state.json | PASS | Wird in Run-3-Output geschrieben |
| GAME_PARAMETERS.md | PASS | Wird in Run-3-Output geschrieben |

**Pre-Flight-Decision:** PASS — Phase 0.1 dispatcht.

---

## Phase-Eintraege

### Phase 0.1 — Didaktischer Rahmen (agent-didaktik)

**Abgeschlossen:** 2026-04-26
**Vertrag:** VERTRAG_PHASE_0-1_DIDAKTIK v1.2
**Outputs:** `DIDAKTIK_RAHMEN.md`, `didaktisches_konzept.json`, `mappen_aufteilung.json`, `GAME_PARAMETERS.md`, `game_state.json`

| Q-Gate | Kriterium | Status | Begruendung |
|---|---|---|---|
| QD1 | Lehrplan-Abdeckung: KE im Fachlehrplan verifizierbar | PASS | KE-IDs GPG7_LB2_K_01, GPG7_LB2_K_08, GPG7_LB3_K_04 woertlich aus Fachlehrplan_GPG_R7.md zitiert. Keine erfundenen IDs. |
| QD2 | KE-Vollstaendigkeit + Scope-Abgrenzung | PASS_WARN | LehrplanPLUS GPG R7 endet thematisch in LB3 mit Versailles. Weimar selbst ist kein eigener Jg.7-LB (systematisch erst Jg.8/9 Realschule). Game nutzt LB3_K_04 + LB2_K_01 als didaktische Bruecke. Scope-Abgrenzung dokumentiert in DIDAKTIK_RAHMEN Sektion 1 "Lehrplan-Scope-Hinweis" + Sektion 10 "Scope-Abgrenzung". User-Validierung pflicht. WARN, nicht FAIL — Bruecken-Argument fachdidaktisch tragfaehig (Run-2 hat dasselbe Brueckenargument bereits AKZEPTIERT bekommen). |
| QD3 | Teilziel-Qualitaet: AFB + Erkennbarkeit | PASS | TZ1-TZ4 vollstaendig nach Format "Die SuS [Operator] ..., indem ..., was daran erkennbar wird, dass ...". Alle 4 Teilziele mit AFB-Angabe + Erkennbarkeitskriterium. |
| QD4 | KE-Matrix-Konsistenz | PASS | 3 KEs, 3 Hauptzuordnungen (1:1). 4 Mappen, jede mit min. 1 KE-Bezug (M4 implizit-Anwendung K_01 dokumentiert). |
| QD5 | Mappen-Balance | PASS | Stoffdichte M1=4, M2=4, M3=5, M4=4 — alle im Zielkorridor 3-5. Zentrale Erkenntnis je 1 Satz. Gegenstandsbereich pro Mappe zugeordnet. |
| QD6 | AFB-Progression monoton | PASS | M1 I-II -> M2 II -> M3 II -> M4 II-III. Bloom L1/L2 -> L2/L3 -> L3/L4 -> L4/L5. Streng monoton. |
| QD7 | Ethik-Abdeckung | PASS | Multiperspektivitaet (M1 Doppelausrufung, M3 3-Schichten, M4 Bedrohung+Resilienz), Ueberwaeltigungsverbot (Beutelsbacher: keine teleologische Falle, kein 1933-Vorgriff bei Hitler-Putsch), Kontroversitaet (Kriegsschuldfrage), Sensibilitaet (Inflation, Gewalt), Aktualitaetsbezug (BRD-Vergleich). Multiperspektiv-Akteurs-Inventar mit 5 Perspektiven dokumentiert (Constraint mind. 3 erfuellt). |
| QD8 | Strukturvorgaben vollstaendig | PASS | Artikulationstabelle pro Mappe vorhanden. Narrativ-Rahmen "Berliner Zeitungsredaktion 1923" mit Begruendung (figuren-frei, Setting-Wahl-Argumentation). 3-Stufen-Tipp-System mit Beispiel M3. |
| QD9 | Sequenzierbarkeit + keine Ordnungs-Verschraenkung | PASS | SCPL-Begruendung dokumentiert. Hybrid-Ordnung chronologisch+thematisch. Drei Schnitte (M1/M2, M2/M3, M3/M4) trennscharf, jede Mappe in Materialien zerlegbar. |
| QD10 | STRUKTUR-FREEZE-Tauglichkeit | PASS | Jede "Zentrale Erkenntnis" tafelbild-faehig (1 Satz, konkrete Anker, Hefteintrag-ableitbar). |
| QD-TITEL | R-TITEL-3 Multiperspektiv-Neutralitaet | PASS (4/4) | M1 "November 1918 — Eine neue Ordnung" deskriptiv (5 Wortketten). M2 "Eine Verfassung fuer eine Demokratie — Weimar 1919" deskriptiv (6 Wortketten). M3 "Versailles 1919 — Wie reagieren die Menschen?" fragend (oeffnet Multiperspektive, KEIN "Schandfrieden", 6 Wortketten). M4 "1920-1923 — Die Republik unter Druck" deskriptiv ("Druck" sachlich, kein "Untergang"/"Endzeit", 5 Wortketten). FAIL-Pattern (wertende Adjektive, Konflikt-Seite-Privilegierung, Spoiler) durchgaengig vermieden. Alle Titel <= 6 Wortketten (R-TITEL-3-Limit eingehalten). |

**Gate-Urteil Phase 0.1:** PASS_MIT_1_WARN (QD2 Lehrplan-Scope-Bruecke).

**Begruendung Gesamturteil PASS_WARN:**
Der LehrplanPLUS GPG R7 Bayern Realschule deckt die Weimarer Republik nicht als eigenen Lernbereich ab — sie ist erst Lerngegenstand der Jahrgangsstufe 8/9. Dieses Game nutzt die thematische Bruecke ueber LB3_K_04 (Versailler Vertrag → Unzufriedenheit) als legitimen Anker und LB2_K_01 (Vergleich Absolutismus vs. Demokratie) als didaktischen Hauptanker (Weimar = erstes deutsches Modell konstitutioneller parlamentarischer Demokratie). Diese Bruecken-Argumentation ist fachdidaktisch vertretbar und wurde in Run-2 bereits von der Lehrkraft AKZEPTIERT. Nicht FAIL, weil:
1. Alle drei genannten KE-IDs sind im Fachlehrplan verifizierbar (QD1 PASS).
2. Die Scope-Abgrenzung ist transparent dokumentiert (Sektion 1 + Sektion 10).
3. Der inhaltliche Bezug zum Lehrplan ist substantiell (nicht beiwerk).

Eskalation E-D2 (KE-Scope-Reduktion) NICHT ausgeloest, weil der Scope so definiert ist wie didaktisch sinnvoll — keine kuenstliche Reduktion noetig.

**Eskalation ausgeloest:** Keine.

**User-Validierung:** PFLICHT vor Phase-0.2-Dispatch — Schwerpunkt:
1. Lehrplan-Scope-Brueckenargument akzeptabel? (Run-2-Praezedenz: AKZEPTIERT)
2. Mappen-Aufteilung 4er-Sequenz tragfaehig?
3. Narrativ "Berliner Zeitungsredaktion 1923" passend?
4. Mappen-Titel R-TITEL-3-konform und R7-Sprachniveau?
