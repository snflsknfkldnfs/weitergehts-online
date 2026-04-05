# Ausfuehrungsplan: D15b-Optimierung Phase III.5 — Pre-Implementation-Risiko-Audit

**Status:** AKTIV (verankert 2026-04-05, Session 10 Forts. 11)
**Vorgaenger:** Phase III (Strategien-Evaluation, 20 aktive STR)
**Nachfolger:** Phase IV (Implementierung der freigegebenen/mutierten STR in Waves 0-6)
**Ziel:** Gap-Audit der geplanten Infrastruktur-Aenderungen gegen Blindspot-Risiken VOR Umsetzung. Produktionsfaehigkeit und Verlaesslichkeit darf nicht gefaehrdet werden.

---

## 1. Architektur-Prinzipien

**P1 Rollen-Isolation.** Jeder Risiko-Auditor (RA) erhaelt eigene Charta, eigenes Evidenz-Bundle, keinen Session-Kontext, keine Sicht auf andere RAs. Kein Cross-Contamination. Analogiebasis: D15b-Multi-Agent-Audit-Pattern (bewaehrt).

**P2 Harte Artefakt-Checkpoints.** Jeder RA-Bericht liegt in VOLLER LAENGE als eigenstaendige Datei vor, bevor er weiterverarbeitet wird. Keine In-Memory-Synthese. Resilienz gegen Compaction/Interrupt.

**P3 State-File als Single Source of Truth.** `D15B_PHASE_III_5_AUDIT_STATE.md` traegt Sub-Phasen-Fortschritt, RA-Bericht-Vorhandensein, Verifikations-Gate-Status. STATUS.md bleibt PM-Ebene, verweist nur.

**P4 Uebergabe-Prompt-Faehigkeit.** Jeder Sub-Phasen-Start hat eigenen Uebergabe-Prompt (cold-session-fit), der nur die fuer diese Sub-Phase noetigen Dateien lesen muss.

**P5 Zwei-Meinungen-Prinzip.** Nach Abschluss des manuellen Audits wird ein zweiter Durchlauf mit `comprehensive-review:full-review` als Zweitmeinung durchgefuehrt. Vergleich der Befunde in III.5e.

**P6 Verifikations-Gate vor Weiterverarbeitung.** Jeder RA-Bericht durchlaeuft harte Checks (Mindest-Findings, Pflicht-Sektionen, DAG-Validitaet, Rubrik-Mindestscore) UND explizite User-Freigabe bevor Synthese startet.

---

## 2. Rollenbesetzung (6 Risiko-Auditoren)

| RA | Rolle | Primaer-Frage |
|---|---|---|
| **RA1** | Scope-Drift-Pruefer | Bewegt sich das STR-Paket im Infrastruktur-Scope (E0-E9) oder sickert Content-/Didaktik-/Lehrer-Scope ein? |
| **RA2** | STR-Abhaengigkeits-Pruefer | Sind DAG-Kanten, Waves und ATOM-UNIT-Kopplungen vollstaendig und konsistent? Zirkularitaeten, Tote Knoten, fehlende Praezedenzen? |
| **RA3** | Code-Kopplungs-Pruefer | Welche konkreten Code-Pfade (Engine, Templates, data.json-Schema, JS-Logik) werden beruehrt? Regressionsrisiko fuer bestehende Mappen 1-4? |
| **RA4** | Pipeline-Integritaets-Pruefer | Halten Phasen-Vertraege (VERTRAG_PHASE_2-0 bis 2-2c), ORCHESTRATOR, Subagenten-I/O-Kontrakte nach den STR-Mutationen? |
| **RA5** | Selbstprueferin / Meta-Auditor | Widersprueche zwischen RA1-RA4, blinde Flecken der Audit-Anlage selbst, Rubrik-Abdeckung. |
| **RA6** | Kontext-Kollisions-Pruefer | Kollidieren STR-Mutationen mit Inhalten in `docs/checklisten/`, `docs/agents/`, `docs/architektur/vertraege/`, `docs/analyse/`? Widerspruechliche Regeln? |

---

## 3. Sub-Phasen

### III.5a — Charten + Evidenz-Bundles (Vorbereitung)

**Output:**
- `docs/projekt/phase-iii-5/CHARTA_RA1_SCOPE_DRIFT.md`
- `docs/projekt/phase-iii-5/CHARTA_RA2_DEPENDENCIES.md`
- `docs/projekt/phase-iii-5/CHARTA_RA3_CODE_KOPPLUNG.md`
- `docs/projekt/phase-iii-5/CHARTA_RA4_PIPELINE.md`
- `docs/projekt/phase-iii-5/CHARTA_RA5_META.md`
- `docs/projekt/phase-iii-5/CHARTA_RA6_KONTEXT.md`
- `docs/projekt/phase-iii-5/EVIDENZ_BUNDLE_RA<1-6>.md` (je Auditor eigenes Bundle)
- `docs/projekt/phase-iii-5/VERIFIKATIONSTEST_TEAM_SPAWN.md` (1 Dummy-Agent, End-to-End durchtesten)

**Methoden-Tooling:**
- `llm-application-dev:prompt-engineering-patterns` → Charten-Formulierung (Rolle, Scope-Grenzen, Anti-Kontamination, Output-Schema).
- `llm-application-dev:prompt-optimize` → Charten-Nachschaerfung, Ambiguitaeten eliminieren.
- `documentation-generation:architecture-decision-records` → Jeder RA-Auftrag als ADR-Stub (Kontext/Decision/Consequences).
- `mcp__sequentialthinking__sequentialthinking` → Evidenz-Bundle-Strukturierung (welche Dateien/Zeilen-Bereiche pro RA).
- `conductor:track-management` → Referenz-Pattern fuer Sub-Phasen-Lifecycle (nicht Vollstruktur).

**Verifikations-Test fuer `agent-teams:team-spawn`:** 1 Dummy-RA (triviales Audit-Mini-Task) durch team-spawn laufen lassen. Pruefen: Subagent-Start, File-Ownership, Terminierung, Ergebnis-Einsammlung. Ergebnis dokumentieren in VERIFIKATIONSTEST_TEAM_SPAWN.md. Falls fail: Fallback auf manuelle Task-Tool-Explore-Agents.

**Checkpoint 5a:** Alle 6 Charten + 6 Evidenz-Bundles + Verifikationstest-Report vorhanden. User-Freigabe einholen: "5a komplett, freigabe fuer 5b?".

---

### III.5b — Parallele Struktur-Audits (RA1 + RA2 + RA6)

**Rationale fuer Gruppierung:** Struktur-Ebene, kein Code-Zugriff noetig, parallel isoliert ausfuehrbar.

**Output:**
- `docs/projekt/phase-iii-5/BERICHT_RA1_SCOPE_DRIFT.md`
- `docs/projekt/phase-iii-5/BERICHT_RA2_DEPENDENCIES.md`
- `docs/projekt/phase-iii-5/BERICHT_RA6_KONTEXT.md`

**Methoden-Tooling:**
- `agent-teams:team-spawn` preset `review` → 3 Subagenten parallel, file-ownership-boundaries.
- `agent-teams:team-communication-protocols` → Keine Quer-Kommunikation (Isolation erzwingen).
- `agent-teams:multi-reviewer-patterns` → Severity-Kalibrierung, Finding-Format-Standardisierung.
- `mcp__48177e08...__validate_and_render_mermaid_diagram` → RA2 pruefbar: DAG-Rendering als Bericht-Anhang.

**Bericht-Pflicht-Sektionen (jeder RA):**
1. Rollen-Charta-Rekapitulation
2. Methodik
3. Findings (mit ID, Severitaet, Evidenz-Zitat, Impact)
4. Risiko-Matrix (Wahrscheinlichkeit x Schaden)
5. Empfehlungen (accept/modify/reject/defer pro STR)
6. Selbstkritik / Limits

**Checkpoint 5b:** 3 Berichte vorhanden, Vollstaendigkeit + Pflicht-Sektionen verifiziert. User-Freigabe einholen.

---

### III.5c — Parallele Tiefen-Audits (RA3 + RA4 + RA5)

**Rationale:** Code-/Pipeline-/Meta-Ebene, benoetigen tiefen Datei-Lese-Zugriff, parallel isoliert.

**Output:**
- `docs/projekt/phase-iii-5/BERICHT_RA3_CODE_KOPPLUNG.md`
- `docs/projekt/phase-iii-5/BERICHT_RA4_PIPELINE.md`
- `docs/projekt/phase-iii-5/BERICHT_RA5_META.md`

**Methoden-Tooling:**
- `agent-teams:team-spawn` preset `review` → 3 Subagenten parallel.
- `comprehensive-review:code-reviewer` (per subagent_type) → RA3 Code-Kopplung: statische Analyse-Patterns, Regressionsrisiko.
- `comprehensive-review:architect-review` (per subagent_type) → RA4 Pipeline-Integritaet: Phasen-Vertraege, Subagent-I/O-Kontrakte.
- `plugin-eval:evaluation-methodology` → RA5 Meta-Auditor: adaptierte Rubrik fuer Audit-Berichts-Qualitaet (Triggering, Scope, Vollstaendigkeit, Widerspruchs-Detektion).
- `mcp__sequentialthinking__sequentialthinking` → RA5-Chains zwischen RA1-RA4-Berichten.

**Wichtig:** RA5 erhaelt ALS EINZIGER auch die RA1-RA3-Berichte (durch File-Ownership explizit lesbar gemacht) — RA5 prueft Meta-Konsistenz.

**Checkpoint 5c:** 3 Berichte vorhanden, Vollstaendigkeit verifiziert. User-Freigabe einholen.

---

### III.5d — Verifikations-Gate (Harte Checkpoints)

**Output:** `docs/projekt/phase-iii-5/VERIFIKATIONS_GATE_PROTOKOLL.md`

**Pro RA-Bericht pruefen:**
- [ ] Mindest-Zeilenanzahl erreicht (>300 Zeilen Regelwert)
- [ ] Alle 6 Pflicht-Sektionen vorhanden
- [ ] Mindestens X Findings (RA1: >=8, RA2: >=6, RA3: >=10, RA4: >=8, RA5: >=6, RA6: >=8)
- [ ] Severitaet-Verteilung plausibel (nicht alle LOW, nicht alle CRITICAL)
- [ ] Jedes Finding mit Evidenz-Zitat oder Datei-Referenz
- [ ] RA2-DAG via mermaid-Validator gerendert
- [ ] RA5-Rubrik-Score >= Mindest-Schwelle

**Methoden-Tooling:**
- `mcp__48177e08...__validate_and_render_mermaid_diagram` → DAG-Validitaet.
- `Bash` + `Grep` → Zeilen-, Sektions-, Finding-Count.
- `plugin-eval:evaluation-methodology` Rubrik → RA5-Scoring-Check.
- Manuelle User-Freigabe pro RA-Bericht (keine Automation).

**Checkpoint 5d:** Gate-Protokoll vollstaendig, alle 6 Berichte verifiziert oder mit Korrektur-Auftrag zurueckgespiegelt.

---

### III.5e — Synthese + Risiko-Register + Zweitmeinung

**Output:**
- `docs/projekt/phase-iii-5/SYNTHESE_RISIKO_REGISTER.md` (primaere Synthese, manueller Audit)
- `docs/projekt/phase-iii-5/ZWEITMEINUNG_FULL_REVIEW.md` (comprehensive-review:full-review)
- `docs/projekt/phase-iii-5/VERGLEICH_MANUELL_VS_FULL_REVIEW.md` (Delta, Konvergenz, Dissens)
- `docs/projekt/phase-iii-5/STR_MUTATIONS_BESCHLUSS.md` (Final: pro STR accept/modify/reject/defer + Begruendung)

**Methoden-Tooling:**
- `Agent` Tool `subagent_type: general-purpose` mit isoliertem Kontext → Synthese-Agent bekommt alle 6 RA-Berichte + Rollen-Charten, KEINE anderen Projektdateien.
- `agent-teams:multi-reviewer-patterns` → Finding-Deduplikation, Severity-Kalibrierung ueber RA-Grenzen.
- `comprehensive-review:full-review` → zweiter Durchlauf als unabhaengige Zweitmeinung auf dasselbe STR-Paket (nicht auf die RA-Berichte!).
- `documentation-generation:architecture-decision-records` → finale STR-Mutations-Entscheidungen als ADRs.
- `mcp__sequentialthinking__sequentialthinking` → Risiko-Register-Chain, Finding-zu-STR-Mutation-Mapping.

**Konvergenz-/Dissens-Logik fuer Zweitmeinung:**
- Konvergenz (beide Audits finden X) → hoheres Gewicht, Priorisierung.
- Dissens (nur einer findet X) → in Vergleichsdokument dokumentieren, User entscheidet.
- Nur-Full-Review-Findings → pruefen, ob blind spot des manuellen Audits.

**Checkpoint 5e:** Synthese + Zweitmeinung + Vergleich + Mutations-Beschluss vollstaendig. User-Freigabe fuer Transition zu Phase IV einholen.

---

## 4. State-File-Pattern

`docs/projekt/D15B_PHASE_III_5_AUDIT_STATE.md` fuehrt:
- Sub-Phase (5a/5b/5c/5d/5e)
- Artefakt-Status pro erwarteter Datei (pending/in-progress/complete/verified)
- RA-Bericht-Status pro RA1-RA6
- Verifikations-Gate-Status pro RA
- Offene Blocker
- Naechster auszufuehrender Schritt (cold-session-fit)

Bei JEDER Sub-Phasen-Aktion: State-File aktualisieren BEVOR weitergearbeitet wird.

---

## 5. Compaction-/Interrupt-Resilienz

**Szenario A — Compaction waehrend Sub-Phase:** Naechste Session liest (1) STATUS.md → (2) D15B_PHASE_III_5_AUDIT_STATE.md → (3) AUSFUEHRUNGSPLAN_D15B_PHASE_III_5_RISIKO_AUDIT.md → (4) UEBERGABE_PHASE_III_5_<subphase>.md. Nimmt Arbeit am naechsten pending-Artefakt auf.

**Szenario B — Interrupt zwischen Sub-Phasen:** State-File zeigt, welche Sub-Phase gerade komplett ist. Naechste Session startet Folge-Sub-Phase.

**Szenario C — Einzel-RA-Bericht korrupt/unvollstaendig:** Verifikations-Gate markiert als fail, Einzel-Re-Run dieses RAs moeglich ohne gesamtes Audit zu wiederholen (File-Ownership + State-File machen das moeglich).

---

## 6. Uebergabe-Prompt-Templates

Pro Sub-Phase eigener Uebergabe-Prompt in `docs/uebergabe/UEBERGABE_PHASE_III_5_<5a|5b|5c|5d|5e>.md`. Template in III.5a anlegen, danach pro Sub-Phase fuellen.

---

## 7. Methodisches Tool-Matrix (Quick-Reference)

| Sub-Phase | Primaer-Tooling | Sekundaer |
|---|---|---|
| 5a Charten + Bundles | llm-application-dev:prompt-engineering-patterns, llm-application-dev:prompt-optimize, documentation-generation:architecture-decision-records | sequentialthinking, conductor:track-management (nur Referenz) |
| 5b Struktur-Audits | agent-teams:team-spawn, agent-teams:team-communication-protocols, agent-teams:multi-reviewer-patterns | mermaid-validator (RA2) |
| 5c Tiefen-Audits | agent-teams:team-spawn, comprehensive-review:code-reviewer (RA3), comprehensive-review:architect-review (RA4), plugin-eval:evaluation-methodology (RA5) | sequentialthinking (RA5) |
| 5d Verifikations-Gate | mermaid-validator, plugin-eval:evaluation-methodology, Bash/Grep | manuelle User-Freigabe |
| 5e Synthese + Zweitmeinung | Agent Tool general-purpose (isoliert), comprehensive-review:full-review, agent-teams:multi-reviewer-patterns, documentation-generation:architecture-decision-records | sequentialthinking |

**Explizit NICHT einsetzen:**
- full-stack-orchestration:* (Scope-Mismatch: CI/CD).
- llm-application-dev:langchain-agent (ueberdimensioniert).
- llm-application-dev:rag-implementation (kein Retrieval-Bedarf).
- accessibility-compliance:* (erst Phase IV relevant, Post-Implementierung STR-20).
- agent-teams:team-debug (falscher Preset: wir auditieren geplante Changes, nicht existierende Bugs).

---

## 8. Entscheidungen (User-Freigabe 2026-04-05)

1. **Team-Spawn vs. Task-Explore:** `agent-teams:team-spawn`, verbunden mit manueller RA3/RA4/RA5-Konfiguration.
2. **Zweitmeinung:** Nach Abschluss des manuellen Audits zweiter Durchlauf mit `comprehensive-review:full-review`. Vergleichs-Dokument in III.5e.
3. **Verifikations-Test:** Vor III.5b End-to-End-Test von team-spawn mit 1 Dummy-Agent. Fallback definiert.

---

## 9. Transition nach Phase IV

Nach III.5e-Abschluss + STR_MUTATIONS_BESCHLUSS.md + User-Freigabe:
- Phase III Strategien-Register updaten (Mutationen einarbeiten).
- Waves neu durchlaufen (koennte sich durch Mutationen veraendern).
- Dann erst STR-25 C2-Cross-Reference, dann Wave 0 STR-01.

**Phase IV startet NICHT ohne Phase-III.5-Abschluss.**
