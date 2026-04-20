# F0d Dispatch-Spike — BEFUND

**Klassifikation: MIXED (mit methodischem M6-Caveat)**

**Plan:** `docs/projekt/F0d_DISPATCH_SPIKE_PLAN.md` v2.1 (commit `ec5115d`)
**Metriken-SSOT:** `docs/projekt/testrun-dispatch-spike/METRICS.md` (commit `a9feb99`)
**Run-Artefakte:** `docs/projekt/testrun-dispatch-spike/runs/A/{A_1,A_2,A_3}/` + `runs/B/{B_1,B_2,B_3}/` + `RUN_LOG.md`
**Freeze-Commit:** `7968f5a` (Bundle + PM-Verankerung)
**Abschluss-Datum:** 2026-04-20
**Parent-Task:** #46 F0d Dispatch-Spike

---

## 1. Gesamt-Klassifikation

**MIXED.**

Die PASS-Formel des Plans (M1 + M3 + M4 + M6 + M8 alle PASS) wird nicht erfuellt. Das MIXED-Kriterium (M1 + M3 PASS, M4 FAIL) ist erfuellt, jedoch zieht M6 FAIL die Sperrklausel "Arm-Ergebnis inhaltlich nicht auswertbar". Der M6-Befund ist systemisch und identisch fuer beide Arme (0/3 valid), deshalb ist er kein Dispatch-Diskriminator, sondern ein orthogonales Generator-Shape-Problem.

Die eigentlichen Dispatch-Hypothesen H1 + H2 sind unabhaengig von M6 testbar und beide positiv beantwortet. H3 (Token-Overhead) ist negativ beantwortet: Dispatch-Isolation kostet 1.83x Tokens, nicht ≤ 1.3x.

**Kurzformel:** Dispatch-Isolation verbessert Struktur- und Fail-Detection-Qualitaet signifikant, kostet aber ca. 80 % mehr Tokens und heilt den darunterliegenden Schema-Shape-Bug nicht.

---

## 2. Hypothesen-Bewertung

| ID | Hypothese | Empirischer Befund | Status |
|---|---|---|---|
| H1 | Kontext-isolierte Cowork-Agent-Tool-Dispatches liefern geringere strukturelle Varianz als linear-gemeinsamer Orchestrator-Kontext | Jaccard-Stabilitaet Arm B 0.944 vs Arm A 0.558 (Top-Level + _meta). Arm B reproduziert auf B_2=B_3 identisches Tag-Set + identische Blocker. Arm A divergiert in A_1 vs A_2 vs A_3 stark (game_id/mappe/entscheidungs_dokumentation-Shape-Bruch in A_3). | **BESTAETIGT** |
| H2 | Fail-Detection-Rate des Q-Gates steigt bei Dispatch-Isolation um ≥ 20 pp | Arm A 50 % (A_2 Miss, A_3 Hit), Arm B 100 % (B_2 Hit, B_3 Hit). Delta +50 pp = 2.5x Mindest-Schwelle. Der A_2-Miss ist auf Self-Check-Bias zurueckfuehrbar (Self-Checker liess Policy-Override durchgehen), den der isolierte B-Checker reproduzierbar als MQ-POLICY-DIDAKTIK-KONFLIKT-Blocker markierte. | **BESTAETIGT** |
| H3 | Token-Overhead Arm B ≤ 1.3x Arm A | Arm B-Mittel 37560 Tok vs Arm A-Mittel 20507 Tok → 1.831x. Schwelle um ca. 0.53x verfehlt. Ursache: separater Checker-Call muss Bundle+Material-Kontext neu aufbauen; Caching nicht wirksam. | **WIDERLEGT** |
| H4 | Schema-Konformitaet des Material-Outputs ist unabhaengig vom Dispatch-Modus reproduzierbar | Draft7-Validator zeigt 0/3 valid in beiden Arms (Arm A 3/5/8 Errors; Arm B 9/7/7 Errors). Dispatch-Isolation reduziert Error-Varianz innerhalb Arm B (B_2=B_3 identisch 7 Errors), aendert aber nichts an der Compliance-Quote. Die Hypothese "dispatch-unabhaengig" ist bestaetigt, das damit bewiesene "unabhaengig von Dispatch non-compliant" ist jedoch negativer Vorzeichen und zeigt ein Generator-Envelope-Problem. | **BESTAETIGT (negativ)** |

---

## 3. Gating-Matrix (Plan §6 v2.0)

| Metrik | Schwelle | Ist | Gating | Ergebnis |
|---|---|---|---|---|
| M1 Strukturelle Varianz | B ≤ A | B 0.944 vs A 0.558 | ja | **PASS** |
| M3 Q-Gate-Fail-Detection | B ≥ A + 20 pp | B 100 % vs A 50 %, Delta +50 pp | ja | **PASS** |
| M4 Token-Verbrauch | B ≤ 1.3x A | 1.831x | ja | **FAIL** |
| M6 Schema-Konformitaet | 3/3 pro Arm | 0/3 beide Arme | ja (mit Sperrklausel) | **FAIL (systemisch)** |
| M8 Realitaetsnaehe §12 | ≥ 7/9 (v2.1) | 8/9 | ja | **PASS** |
| M2 Inhaltliche Varianz | informativ | Arm B enger | nein | Arm B besser |
| M5 Self-Check-Bias | informativ (B ≤ A) | Arm A 1 Fall, Arm B 0 | nein | Arm B strikt besser |
| M7 Q-Gate-Coverage | informativ | Arm A 4.67/6, Arm B 5.00/6 | nein | Arm B leicht besser |

**Formale Auswertung:**
- PASS-Formel: M1 + M3 + M4 + M6 + M8 → **M4 + M6 FAIL** → PASS ausgeschlossen.
- MIXED-Formel: M1 + M3 ja, M4 nein → erfuellt.
- M6-Sperrklausel: "Arm-Ergebnis inhaltlich nicht auswertbar" → inhaltliche Arm-Qualitaet nicht zertifizierbar, Dispatch-Verhalten bleibt auswertbar.

**Klassifikation: MIXED mit M6-Caveat.**

---

## 4. §12 Realitaetsnaehe-Checkliste (Status, v2.1 9 Boxes)

- [x] Alle 11 Input-Bundle-Artefakte (§4.1) aus produktiven Quellen stammen, nicht syntetisch konstruiert.
- [x] F0B_PRIMING_INCLUDE §1+§2+§3 wortgleich eingebunden ist (Hash-Check gegen F0B_PRIMING_v1).
- [x] Output gegen material-output-schema.json strict validiert, kein Strip/Patch. (Erstmals in P4 ausgefuehrt; Ergebnis 0/6 valid → fuehrte zu M6 FAIL)
- [~] QG-06 gegen Ist-Katalog (Q-GATE-MECHANIK §7.1) prueft, nicht gegen eine simplifizierte Ad-hoc-Definition. (Teilabdeckung 4-6/6 Pruef-Dimensionen pro Run)
- [x] perspektiven_policy korrekt als 3-Eintrag-String uebergeben (STR-05).
- [x] Trigger-Kategorien aktivieren MATERIAL-PERSPEKTIV-01 + TERMINOLOGIE-01 tatsaechlich im Priming-Block.
- [x] Fehler-Injektion auf perspektiven_policy und nicht auf Zitat (sonst Quellen-Korrumpierung).
- [x] (v2.1) Arm A nicht im PM-Chat-Kontext, sondern via Agent-Tool-Dispatch ausgefuehrt (R6-Mitigation).
- [x] (v2.1) Runs seriell A1→A2→A3→B1→B2→B3, pro Run frischer Agent-Envelope, Metriken-Berechnung blind nach allen 6 Runs (R7+R8-Mitigation).

**Score: 8/9 (Box 4 teilweise).**

---

## 5. Folge-Entscheidungen fuer abhaengige Tasks

### 5.1 F0g Agent-Dispatch-Refaktor (#48)

**Plan-Kopplung:** PASS → entblockt; FAIL → DEFERRED; MIXED → "F0g reduziert (nur Q-Gates)".

**Entscheidung:** **F0g bleibt DEFERRED statt "reduziert".** Begruendung: M4 FAIL (1.83x Token-Overhead) + M6 FAIL (Schema-Shape-Bug) machen einen Produktiv-Rollout des Arm-B-Musters unwirtschaftlich und riskant. Erst nach Behebung von PI-SCHEMA-STRICT-01 + PI-DISPATCH-OVERHEAD-01 soll F0g reaktiviert werden.

**#48 bleibt `pending, blockedBy [PI-SCHEMA-STRICT-01, PI-DISPATCH-OVERHEAD-01]`**, bis diese Prevention Items adressiert sind.

### 5.2 PI-DISPATCH-Items (UPGRADE_PLAN §20)

**Ergaenzen:**
- PI-SCHEMA-STRICT-01 "Draft7-Validator in SUB_MATERIAL-Envelope" — dringlich, adressiert systemische Non-Compliance.
- PI-DISPATCH-OVERHEAD-01 "Arm-B-Checker-Kontext-Optimierung" — Prereq fuer F0g.
- PI-M1-M12-COVERAGE-01 "Q-Gate-Checker-Prompt-Erweiterung auf M1-M12-Dimension".
- PI-SELFCHECK-BIAS-01 "Arm-A Policy-Override-Konflikt-Pruefschritt".

### 5.3 Dispatch-Muster-Empfehlung fuer produktive Q-Gates (vorlaeufig)

- **Bis PI-DISPATCH-OVERHEAD-01 implementiert:** Q-Gate-Checker *kann* isoliert via Agent-Tool dispatcht werden, wenn Fail-Detection-Kritikalitaet den Token-Overhead rechtfertigt (z.B. Lehrprobe/ELP-Materialien). Fuer Bulk-Generierung nicht empfohlen.
- **Generator-Envelope:** Bleibt bis PI-SCHEMA-STRICT-01 ohne Draft7-Durchsetzung — jedes Material muss nach Generierung extern validiert werden.
- **Arm-A-Muster (1 Call vereinigt):** In aktueller Form fuer kritische Konflikt-Policies (wie mono-perspektivische Fehler-Injektion) nicht zuverlaessig; Self-Check-Bias-Risiko empirisch belegt (A_2 MISS).

---

## 6. Aussagekraefte und Grenzen des Spikes

**Belastbare Aussagen (H1 + H2, gestuetzt durch Replikation B_2=B_3):**
- Dispatch-Isolation reduziert strukturelle JSON-Varianz signifikant.
- Dispatch-Isolation erhoeht Fail-Detection-Rate bei Policy-Didaktik-Konflikten signifikant.
- Arm-B-Reproduzierbarkeit bei identischem Bundle empirisch belegt (2 Replikate identisch).

**Grenzen (Scope-Konsequenz):**
- n=3 pro Arm, n=2 pro Injected-Bedingung — Statistik-Konfidenzintervalle nicht belastbar, Trends nur direktional.
- Nur 1 Sub-Agent (SUB_MATERIAL_QUELLENTEXT), 1 Q-Gate (QG-06), 1 realer Fall — keine Generalisierung auf andere Sub-Agents/Q-Gates zulaessig.
- M6-Systemfehler ueberstrahlt inhaltliche Arm-Qualitaet; pre-Gating-Bewertung des Materials nicht moeglich.
- M4 allein reicht schon um PASS auszuschliessen; tieferes Throughput-Tuning erforderlich.

**Methodik-Qualitaet:**
- Plan v2.1 Dispatch-Symmetrie (Arm A auch via Agent-Tool) funktionierte — kein PM-Chat-Kontext-Bias.
- Serielle Ausfuehrung + blind-Berechnung verhinderte Inter-Run-Kontaminations-Artefakte.
- Bundle-Integritaet (SHA-Check) ueber alle 6 Runs stabil.

---

## 7. Evidenz-Index

| Evidenz-Typ | Pfad |
|---|---|
| RUN_LOG SSOT | `docs/projekt/testrun-dispatch-spike/RUN_LOG.md` |
| METRIKEN-Berechnung | `docs/projekt/testrun-dispatch-spike/METRICS.md` |
| Run-Artefakte Arm A | `docs/projekt/testrun-dispatch-spike/runs/A/{A_1,A_2,A_3}/*` |
| Run-Artefakte Arm B | `docs/projekt/testrun-dispatch-spike/runs/B/{B_1,B_2,B_3}/*` |
| Input-Bundle FROZEN | `docs/projekt/testrun-dispatch-spike/input_bundle/*` (SHA-Manifest `bundle_hash.txt`) |
| Plan-SSOT | `docs/projekt/F0d_DISPATCH_SPIKE_PLAN.md` v2.1 |
| Commits | `7968f5a` Freeze, `ec5115d` Plan-v2.1, Per-Run f2cb2f1 / A_3 / B_1-commit / `19769b0` B_2 / `168036a` B_3 / `a9feb99` METRIKEN |

---

## 8. Befund-Abschluss

- **Klassifikation: MIXED.**
- **Kurzbegruendung:** Dispatch-Isolation-Hypothese bestaetigt (H1 + H2), aber Token-Oekonomie (H3) und Schema-Shape-Compliance (H4) verhindern PASS-Votum.
- **Folgetasks:** 4 PI-Items + F0g bleibt DEFERRED bis PI-SCHEMA-STRICT-01 + PI-DISPATCH-OVERHEAD-01 geschlossen sind.
- **Spike-Artefakte archiviert und auditierbar ueber oben stehenden Evidenz-Index.**

**Befund signiert durch Verkettung der 6 serialisierten Runs + Plan-v2.1-Methodik-Haertung + blind-Berechnung nach Gesamt-Abschluss.**
