# F0e — AGENT-EXPERTISE-FORMING-SPIKE

**Datei:** `docs/projekt/f0e-agent-expertise/F0e_AGENT_EXPERTISE_SPIKE.md`
**Status:** AKTIV (geplant, v1.0 Initial)
**Erstellt:** 2026-04-21
**Modus:** Spike (zeitlich begrenzt, evidenzbasiert, Shadow-Implementation)
**Owner:** Paul (Execution) + Cowork-PM (Orchestrierung)
**Bezug:** F0d_BEFUND.md (MIXED mit M6-Caveat), AUDIT_QUELLENTEXT_CURRENT.md, gate-prototype/GATE_REPORT.md, UPGRADE_PLAN_v3-12 §20 PI-SCHEMA-STRICT-01 (Prototyp-Vorlauf), SUB_MATERIAL_QUELLENTEXT.md v3.10.4 (authoritativ, Generator-Repo)

---

## 0. Warum F0e

F0d hat bewiesen, dass Dispatch-Isolation (Arm B) Struktur-Varianz reduziert und Fail-Detection erhoeht (H1+H2 PASS). F0d hat gleichzeitig bewiesen, dass **der Subagent-Envelope selbst unabhaengig vom Dispatch-Modus nicht Schema-compliant ist** (M6 0/6 valid, H4 bestaetigt negativ). Bevor F0g (Agent-Dispatch-Refaktor) entblockt werden kann, muss der Subagent **inhaltlich gehaertet** werden, dass er auf eigenen Fuessen ein schema-valides Material liefert.

F0e ist der Spike, der diese Haertung **ohne Aenderung an autoritativen Agent-Dateien** mittels Shadow-Implementation-Pattern versucht (Prompt-Hardening-Overlay + zweistufiges Schema-Gate). F0e ist **Prerequisite fuer PI-SCHEMA-STRICT-01** und damit fuer F0g.

## 1. Hypothese

**H-E1 (Overlay-Wirksamkeit):** Ein Prompt-Hardening-Overlay, das die 5 systemischen Subagent-Defekte (D1-D5 aus GATE_REPORT §6.3) ueber eine wortgleiche Pre-Prompt-Injektion adressiert, reduziert die Partial-Gate-Fehlerrate auf 0 Fehler in 3/3 Regenerationen von `mat-4-3` — ohne inhaltliche Qualitaetsverluste gegenueber dem Baseline-Artefakt.

**H-E2 (Zweistufigkeit):** Partial-Gate + Full-Gate als Entry-Criterion eliminieren den Dispatcher-Ownership-Leak (19 der 32 F0d-Full-Gate-Errors, ~59 %) strukturell — der Subagent hat nach dem Gate keine Moeglichkeit, Dispatcher-Felder in den Output zu leaken.

**H-E3 (Didaktik-Stabilitaet):** Overlay-gehaertete Outputs sind didaktisch mindestens so einsetzbar wie das Baseline-`mat-4-3.json` (Einsetzbarkeits-Skala 1-5, Schwelle ≥ 4).

## 2. Scope (minimal, fokussiert)

**Ein Subagent:** `SUB_MATERIAL_QUELLENTEXT.md` (Generator-Repo, v3.10.4 authoritativ). Keine anderen Subagents.

**Ein realer Material-Case:** `mat-4-3` (Trothas Vernichtungsbefehl 1904, Mappe 4 `deutscher-nationalismus-kolonialismus`). Identisch zu F0d-Case — erlaubt Vergleich gegen F0d-Outputs ohne neuen Case-Setup-Overhead.

**Ein Dispatch-Modus:** Arm-B-analog (2 Task-Calls getrennt, Agent-Tool-Dispatch, fresher Envelope). Arm A / linear-Simulation entfaellt — F0e testet NICHT Dispatch-Varianten, sondern Subagent-Envelope-Haertung.

**Ein Scope-Fokus:** Schema-Compliance + Didaktik-Stabilitaet. M3/M4/M7/M8-Messungen sekundaer (informativ).

**Explizit ausserhalb Scope:**
- Aenderung an `SUB_MATERIAL_QUELLENTEXT.md` (Shadow-Pattern).
- Aenderung am Full-Schema `material-output-schema.json`.
- Andere Subagents (darstellungstext, bildquelle, karte usw.).
- Q-Gate-Checker-Haertung (QG-06 bleibt F0d-Stand).
- Architektur-Entscheidungen zu F0g-Rollout (erst nach F0e-Abschluss).

## 3. Methodik — Shadow-Implementation + Zweistufiges Gate

**Shadow-Implementation-Pattern:**
- Autoritative Datei `agents/SUB_MATERIAL_QUELLENTEXT.md` bleibt unveraendert.
- Vor dem Dispatch wird der Prompt-Hardening-Overlay `gate-prototype/overlays/PROMPT_HARDENING_QUELLENTEXT.md` wortgleich VOR die autoritative Agent-Datei in die Systemnachricht montiert.
- Bei Spike-Erfolg wird der Overlay-Inhalt als Vorlage fuer PI-SCHEMA-STRICT-01 promoted (dann offizieller Agent-Datei-Patch).

**Zweistufiges Schema-Gate (Entry-Criterion fuer jede Iteration):**

1. **Partial-Gate (post-Subagent, pre-Merge):** Subagent liefert AUSSCHLIESSLICH `{inhalt, quelle, _meta}`. Validierung gegen `schemas/material_quellentext_partial_v3.10.2.json` (`additionalProperties:false`). Bei Fehler: FAIL der Iteration (Overlay-Defekt-Klassifikation, kein Merge).
2. **Dispatcher-Merge:** Partial + Dispatcher-Context-Fixtur (`fixtures/dispatcher_context_mat-4-3.json`) → Full-Material via `scripts/merge_material.py`. Merge-Skript checkt Ownership-Kollisionen (Partial darf keine Dispatcher-Felder haben; Context darf keine Subagent-Felder haben). Bei Kollision: FAIL.
3. **Full-Gate (post-Merge):** Merged-Material gegen `schemas/material_quellentext_v3.10.2.json` (pinned SHA `632d7b47…`). Bei Fehler: FAIL (sollte unmoeglich sein, wenn 1+2 PASS + Fixtur valide — Full-Gate ist Regressions-Absicherung).

**Pipeline technisch validiert (Smoke-Test 2026-04-21):** baseline_partial → Partial-Gate PASS → Merge OK → Full-Gate PASS (Exit 0 in allen drei Stufen). Pipeline ist einsatzbereit.

**Vergleichs-Baseline:** Das existierende `mat-4-3.json` (schema-valide, Paul-validiert) ist Didaktik-Referenz. F0e misst, ob Overlay-gehaertete Regenerationen gleichwertig sind (nicht ob sie identisch sind).

## 4. Iteration-Design

### 4.1 Iteration-1 — Baseline-Regeneration (Pflicht)

**Ziel:** EINE schema-valide Regeneration von mat-4-3 aus frischem Agent-Envelope unter Overlay-Hardening. Nachweis, dass die Pipeline in der Realnutzung einen kompletten Dispatch-Zyklus PASS-end durchlaufen kann.

**Ausfuehrung:**
- Task-Call 1 (Subagent-Generator):
  - `subagent_type: general-purpose`
  - Systemprompt = `PROMPT_HARDENING_QUELLENTEXT.md` (wortgleich) + `SUB_MATERIAL_QUELLENTEXT.md` (wortgleich, Kopie aus Generator-Repo) + F0B_PRIMING_INCLUDE §1+§2+§3 (wortgleich)
  - User-Prompt = F0d-Input-Bundle `docs/projekt/testrun-dispatch-spike/input_bundle/bundle.md` (SHA-fixiert, reuse)
  - Erwartete Rueckgabe: Partial-JSON mit exakt `{inhalt, quelle, _meta}`
- Partial-Gate: `scripts/validate_material_output.py --schema schemas/material_quellentext_partial_v3.10.2.json`
- Merge: `scripts/merge_material.py --partial <partial> --context fixtures/dispatcher_context_mat-4-3.json`
- Full-Gate: `scripts/validate_material_output.py` (default Schema)

**PASS-Kriterium Iteration-1:**
- Partial-Gate Exit 0 (0 Fehler)
- Merge Exit 0 (keine Ownership-Kollisionen)
- Full-Gate Exit 0 (pinned_match: True, 0 Fehler)
- Didaktik-Review (§10) ≥ 4/5

**FAIL-Kriterium Iteration-1:**
- Jede einzelne der drei Gate-Stufen FAIL → Iteration-1 FAIL → Overlay-Defekt-Analyse + Overlay-Patch + Wiederholung (max. 2 Patch-Zyklen, danach Spike-STOP siehe §6).

### 4.2 Iteration-2 — Varianz-Check (konditional)

**Bedingung:** Iteration-1 PASS + verbleibendes Iteration-Budget (Zeit + Token) > 40 %.

**Ziel:** n=3 Regenerationen mit identischem Bundle + Overlay → Varianz-Check.

**Metriken:**
- **M-E1 Partial-Gate-PASS-Rate:** 3/3 Regenerationen Partial-Gate PASS?
- **M-E2 Full-Gate-PASS-Rate:** 3/3 Regenerationen Full-Gate PASS?
- **M-E3 Inhalts-Jaccard:** Token-Set-Jaccard zwischen den 3 `inhalt`-Strings. Informativ (kein Hard-Threshold, F0e testet Haertung, nicht Reproduzierbarkeit).
- **M-E4 `_meta`-Tag-Jaccard:** Jaccard auf `trigger_flags` + `artefakt_ref` + `tafelbild_knoten_abgedeckt`. Erwartung: 1.0 (alle identisch, weil Dispatcher-fixiert via Bundle).

**PASS-Kriterium Iteration-2:**
- M-E1 = M-E2 = 3/3
- Didaktik-Review ≥ 4/5 in mindestens 2/3 Outputs.

## 5. Metriken (Gesamt)

| ID | Metrik | Messverfahren | Schwelle |
|---|---|---|---|
| M-E1 | Partial-Gate-PASS-Rate | Draft7Validator gegen Partial-Schema | I1: 1/1, I2: 3/3 |
| M-E2 | Full-Gate-PASS-Rate | Draft7Validator gegen Full-Schema | I1: 1/1, I2: 3/3 |
| M-E3 | Inhalts-Jaccard n=3 | Token-Set-Jaccard auf `inhalt` | informativ |
| M-E4 | Tag-Jaccard n=3 | Jaccard auf `_meta.{trigger_flags,artefakt_ref,tafelbild_knoten_abgedeckt}` | 1.0 |
| M-E5 | Didaktik-Einsetzbarkeit | Paul-Review Skala 1-5 (§10) | I1: ≥ 4, I2: 2/3 ≥ 4 |
| M-E6 | Overlay-Patch-Zyklen | Anzahl Overlay-Patches, bis I1 PASS | ≤ 2 (sonst STOP) |
| M-E7 | Token-Verbrauch | Summe In+Out Task-Call 1 | informativ (Vergleich mit F0d Arm B Mittel) |
| M-E8 | Defekt-Klassen-Residuum | Aggregation der Partial-Gate-Fehler ueber alle Iterationen | qualitativ (welche D1-D5 tauchen noch auf?) |

## 6. Stop-Gate

Der Spike wird **abgebrochen** (Status: FAIL, keine weiteren Iterationen), wenn eines dieser Kriterien eintritt:

1. **Overlay-Patch-Limit ueberschritten:** M-E6 > 2. Wenn der Overlay nach 2 Patch-Zyklen die 5 D-Defekte nicht eliminiert, liegt das Problem tiefer als prompt-engineerbar (z.B. Schema-Drift im authoritativen Agent-Dokument, Modell-Kompliance-Limit).
2. **Didaktik-Regression:** M-E5 < 3 in Iteration-1 trotz Partial-Gate + Full-Gate PASS. Schema-Compliance darf nicht mit Einsetzbarkeits-Verlust erkauft werden.
3. **Bundle-Invalidation:** Input-Bundle SHA-Abweichung gegenueber F0d-Freeze.

**Spike-Abbruch-Konsequenz:** F0e endet mit BEFUND "FAIL", PI-SCHEMA-STRICT-01 bleibt offen, F0g bleibt DEFERRED. Naechster Versuch der Haertung waere Ebene 2 — direkter Patch an autoritative Agent-Datei (hoher Aenderungs-Overhead + Generator-Repo-Synchronisation).

## 7. Ablaufplan

| Block | Dauer | Schritt |
|---|---|---|
| **P0** | done | Gate-Prototyp + Overlay (Schritt A+B+C2 abgeschlossen 2026-04-21) |
| **P1** | done | Plan-Dokument (dieses Dokument, Schritt C1) |
| **P2** | 30 min | Iteration-1 Dispatch (Task-Call 1 Subagent + Partial-Gate + Merge + Full-Gate) |
| **P3** | 20 min | Iteration-1 Didaktik-Review (§10 Protokoll) |
| **P3a** | 0-60 min | Falls I1 FAIL: Overlay-Patch + Re-Dispatch (max. 2 Zyklen, sonst STOP) |
| **P4** | 45 min | Iteration-2 Dispatch (3 Regenerationen seriell, pro Run frischer Envelope) — nur falls I1 PASS + Budget |
| **P5** | 30 min | Iteration-2 Auswertung M-E1..M-E4 + Didaktik-Reviews |
| **P6** | 20 min | F0e_BEFUND.md (PASS/MIXED/FAIL) + UPGRADE_PLAN §20 PI-Items aktualisieren |
| **P7** | 10 min | STATUS + CHANGELOG Update + TaskUpdate |

**Gesamt-Budget:** ~3 h reine Execution, realistisch 4 h inkl. Debug-Puffer.

## 8. Deliverables

- `docs/projekt/f0e-agent-expertise/F0e_AGENT_EXPERTISE_SPIKE.md` — dieses Plan-Dokument.
- `docs/projekt/f0e-agent-expertise/runs/iteration-1/` — Task-Call-Prompt + Partial + Merged + Gate-Reports.
- `docs/projekt/f0e-agent-expertise/runs/iteration-2/` — (konditional) 3 Regenerationen + Aggregat-Metriken.
- `docs/projekt/f0e-agent-expertise/F0e_BEFUND.md` — PASS/MIXED/FAIL mit Metriken-Nachweis.
- `docs/projekt/f0e-agent-expertise/gate-prototype/overlays/PROMPT_HARDENING_QUELLENTEXT.md` — ggf. Versions-Updates v1.1/v1.2 bei Patch-Zyklen.
- STATUS-Eintrag + CHANGELOG-Eintrag.
- UPGRADE_PLAN §20 Ergaenzung (4 PI-Items aktualisieren: PI-SCHEMA-STRICT-01 Status, ggf. neue abgeleitete Items).

## 9. Risiken

| ID | Risiko | Mitigation |
|---|---|---|
| R-E1 | Overlay kollidiert mit autoritativer Agent-Datei (widerspruechliche Anweisungen) | Overlay steht VOR autoritativer Datei, erklaerte Prioritaets-Order in Overlay-Kopf. Overlay ist additiv: verschaerft Format-Constraints, widerspricht nicht inhaltlichen Prinzipien. |
| R-E2 | Generator interpretiert Overlay als Test-Prompt und ignoriert es | Overlay-Kopf stellt klar, dass es ein operativer Pre-Prompt fuer Produktion ist. Self-Check-Liste in Overlay §3 erzwingt pre-return-Validierung. |
| R-E3 | Partial-Gate PASS, aber `inhalt`-Qualitaet leidet (z.B. zu kurz, unklare Erlaeuterung) | Didaktik-Review §10 als Schutz. M-E5 ≥ 4 ist Hard-Kriterium neben Schema-Compliance. |
| R-E4 | Dispatcher-Context-Fixtur ist hartkodiert auf mat-4-3 → F0e bleibt Einzelfall | Bewusst akzeptiert: F0e testet Schema-Haertung, nicht Context-Generierung. Generalisierung = Folge-Spike (F0h o.ae.), nicht F0e. |
| R-E5 | Iteration-2 Varianz kostet mehr Tokens als Budget zulaesst | Iteration-2 ist konditional, nicht Pflicht. Iteration-1 PASS reicht fuer Spike-PASS-Votum bei kritischem Token-Engpass. |
| R-E6 | Overlay-Erfolg ist case-spezifisch (quellentext-Format) und nicht auf andere typ-Werte uebertragbar | Overlay-Header deklariert explizit `typ=quellentext`-Scope. PI-SCHEMA-STRICT-01 muss pro typ einen eigenen Overlay (oder generalisierten) vorsehen. |
| R-E7 | Subagent ignoriert Dispatcher-Ownership-Verbot und liefert Dispatcher-Felder trotz Overlay | Partial-Gate faengt dies deterministisch ab (`additionalProperties:false`). Iteration wird FAIL markiert, Overlay-Patch addressiert das konkrete Feld. |
| R-E8 | Modell-Varianz zwischen I1 und I2-Runs (trotz identischem Prompt) fuehrt zu inkonsistenten Partial-Gate-Ergebnissen | Pro Run frischer Agent-Envelope (kein Shared Context). Bei 2+/3 Partial-Gate FAIL → M-E1 FAIL, Overlay unzureichend, STOP. |

## 10. Didaktik-Review-Protokoll (M-E5)

Paul reviewt jedes Iteration-Output gegen das Baseline-`mat-4-3.json` und das existierende Didaktik-Rahmenwerk (Mappe 4, Sprachniveau R7, Trigger-Kategorien). Bewertung nach folgendem Protokoll (Skala 1-5):

**1 Einsetzbarkeit 1:1:** Koennte das Material in Mappe 4 des produktiven Games ohne weitere Redaktion eingesetzt werden?
- 5: ja, ohne Aenderung.
- 4: ja, mit kosmetischen Aenderungen (Interpunktion, Whitespace).
- 3: ja, nach inhaltlicher Mikro-Redaktion (1-2 Saetze umformulieren).
- 2: nur nach groesserer Ueberarbeitung.
- 1: nicht einsetzbar.

**2 Sprachniveau R7:** Ist `inhalt` R7-konform (Wortschatz, Satzbau, Komplexitaet)?

**3 Multiperspektivitaet (MATERIAL-PERSPEKTIV-01):** Sind mindestens 2 Perspektiven sauber gegenuebergestellt (P1 Deutsche Reichsfuehrung + P3 Kolonisierte)?

**4 Trigger-Behandlung (TERMINOLOGIE-01):** Sind `trigger_flags` korrekt gesetzt und im `inhalt` angemessen kontextualisiert (Gewalt nicht verharmlost, nicht sensationalistisch)?

**5 Quellen-Integritaet:** Ist `quelle` vollstaendig (Autor + Titel + Fundort + Aufbereitungs-Kennzeichnung) und passt zu `_meta.aufbereitung`?

**Gesamt-Score:** Arithmetisches Mittel der 5 Einzel-Scores, gerundet auf ganze Zahl. M-E5-Schwelle ≥ 4.

Review-Persistenz: `runs/iteration-{N}/review_iter{N}_run{k}.md` (markdown mit Einzel-Scores + freier Textbegruendung).

## 11. Realitaetsnaehe-Checkliste

F0e ist realitaetsnah nur, wenn:

- [ ] Autoritative `SUB_MATERIAL_QUELLENTEXT.md` unveraendert bleibt (Shadow-Pattern wahr).
- [ ] Overlay `PROMPT_HARDENING_QUELLENTEXT.md` wortgleich VOR der Agent-Datei montiert wird (Hash-Check optional).
- [ ] Input-Bundle identisch zum F0d-Bundle (SHA-Match gegen `testrun-dispatch-spike/input_bundle/bundle_hash.txt`).
- [ ] Zweistufiges Gate genutzt (Partial + Full), nicht nur Full.
- [ ] Dispatcher-Context-Fixtur identisch zu `fixtures/dispatcher_context_mat-4-3.json` (unveraenderte Dispatcher-Ownership).
- [ ] Pro Run frischer Agent-Envelope (kein Chain-of-Call, keine Shared PM-Historie).
- [ ] Didaktik-Review separat von Schema-Gate (kein Review-waehrend-Dispatch-Bias).
- [ ] Iteration-2 nur nach I1 PASS (keine Metriken-Kombination ueber FAIL-Iterationen).

## 12. Folgeschritte (post-F0e)

**Bei PASS (I1 ≥ 4 Didaktik UND Partial+Full Gate beide 0 Fehler UND — falls I2 ausgefuehrt — 3/3 PASS):**
- PI-SCHEMA-STRICT-01 von PENDING auf IN_PROGRESS, Overlay-Inhalt als Vorlage fuer autoritative Agent-Datei-Aenderung.
- F0g kann aus DEFERRED auf PENDING zurueck (weiterhin geblockt durch PI-DISPATCH-OVERHEAD-01).
- UPGRADE_PLAN §20 aktualisieren.

**Bei MIXED (I1 PASS, I2 FAIL oder I2 nicht ausgefuehrt wg Budget):**
- PI-SCHEMA-STRICT-01 bleibt PENDING, aber mit Evidenz "Overlay funktioniert einmalig; Reproduzierbarkeit n=3 offen".
- Folgespike mit reinem Varianz-Fokus moeglich (F0e-II).

**Bei FAIL (I1 FAIL nach 2 Patch-Zyklen ODER Didaktik < 3):**
- PI-SCHEMA-STRICT-01 muss auf Ebene 2 (autoritativer Agent-Datei-Patch) eskaliert werden.
- F0g bleibt DEFERRED.
- Generator-Repo-Synchronisation notwendig — hoeherer Aenderungs-Overhead.

**In jedem Fall:**
- F0f (#47 Feld-Evidenz) bleibt unabhaengig, kann parallel weiterlaufen.
- UPGRADE_PLAN §20 mit 4 abgeleiteten PI-Items pflegen: PI-SCHEMA-STRICT-01, PI-DISPATCH-OVERHEAD-01, PI-M1-M12-COVERAGE-01, PI-SELFCHECK-BIAS-01.

---

**Status:** v1.0 Initial, 2026-04-21. Bereit fuer Iteration-1-Eintritt (P2).

## Aenderungshistorie

| Version | Datum | Aenderung |
|---|---|---|
| 1.0 | 2026-04-21 | Initial. Scope auf Quellentext-Haertung durch Shadow-Overlay. Zweistufiges Schema-Gate als Entry-Criterion. Iteration-1 Pflicht, Iteration-2 konditional. Stop-Gate bei Overlay-Patch-Zyklen > 2 oder Didaktik-Regression. Didaktik-Review-Protokoll mit 5 Dimensionen. |
