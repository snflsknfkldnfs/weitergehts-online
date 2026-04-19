# F0e Didaktisches Audit — Master-Plan (SSoT)

**Version:** 1.1 (2026-04-19, Dual-Subagent-Approach)
**Status:** PHASE-LP-QM-L4 LAUFEND (LP-QM v1.0 Fundamentartefakt erstellt, F0e.1 FERTIG, F0e.2 bereit fuer Spawn)
**Owner:** PM Cowork (Claude Opus) mit Subagent-Delegation fuer Audit-Execution
**Parent-Context:** `PRE_PILOT_TRIAGE_MATRIX.md` v1 (1-dim nach Trigger-Probability) ist unvollstaendig — Produkt-Qualitaets-Impact (PQI) fehlt. F0e schliesst diese Luecke via evidenz-basiertes didaktisches Audit der N-K-Output-Artefakte, liefert PQI-Scores und re-klassifiziert Matrix auf 2D `(Trigger × PQI)`.

**Kanon-Referenzen:**
- Matrix v1: `docs/projekt/testrun-nationalismus-kolonialismus/PRE_PILOT_TRIAGE_MATRIX.md`
- Upgrade-Plan v1.3: `docs/architektur/UPGRADE_PLAN_v3-12_ESCAPE_GAME_QUALITAET.md`
- Befund: `docs/projekt/testrun-nationalismus-kolonialismus/BEFUND_TESTRUN_N-K_KONSOLIDIERT.md`
- PM-Routing: `docs/projekt/COWORK_PROJECT_ANLEITUNG.md` v2.3

---

## 1. Scope & Non-Scope

### 1.1 Scope
- Produkt-Qualitaets-Audit der **deployten N-K-Escape-Game-Artefakte** (Mappe 1-3) aus didaktischer Perspektive.
- Liefert PQI-Scores (1-3) fuer **bestehende 60 Findings + 30 PIs** (Re-Klassifikation) und identifiziert **neue** Findings, die die Pipeline-Auditoren RA1-RA5 nicht erfasst haben (Blind-Spot: didaktische Produkt-Qualitaet stabiler Outputs).
- Merge-Ergebnis: `PRE_PILOT_TRIAGE_MATRIX.md` v2 mit 2D-Klassifikation `(Trigger-Probability × PQI)` und neuer Klasse-A-Definition.

### 1.2 Non-Scope
- Keine Re-Audits der Pipeline-Execution (bereits RA1-RA5).
- Kein LehrplanPlus-Gesamt-Alignment-Check (nur Bezug zum konkreten Thema R7 GPG Nationalismus/Kolonialismus).
- Keine neue Schueler-Erprobung, keine Erprobungs-Daten-Erhebung.
- Kein Re-Bau der Materialien — nur Befund + Klassifikation.
- Kein Skalen-Ausbau ueber N-K hinaus (andere Games) — F0e ist N-K-spezifisch.

### 1.3 Abgrenzung gegen Pilot
- F0e ist Pre-Pilot-Arbeit: liefert Input fuer Batch-4-Scope-Entscheidung.
- Nach F0e-Abschluss: Batch-4-Umsetzung → **dann** Pilot.
- F0e ersetzt **nicht** den spaeteren Pilot-Test in der Lerngruppe.

---

## 2. Audit-Input-Inventur (Was wird auditiert?)

### 2.1 Primaer-Input (Produkt-Artefakte)
Alle Pfade absolut, Repo-Root `/Users/paulad/weitergehts.online/weitergehts-online/` (Cowork-Mount `/sessions/admiring-optimistic-cerf/mnt/weitergehts-online/`):

**Deployed Game:**
- `escape-games/deutscher-nationalismus-kolonialismus/data.json` (Konfiguration + Meta)
- `escape-games/deutscher-nationalismus-kolonialismus/mappe-1.html`
- `escape-games/deutscher-nationalismus-kolonialismus/mappe-2.html`
- `escape-games/deutscher-nationalismus-kolonialismus/mappe-3.html`
- `escape-games/deutscher-nationalismus-kolonialismus/lehrkraft.html`
- `escape-games/deutscher-nationalismus-kolonialismus/index.html`

**Source-Artefakte (pro Mappe 1-3):**
- `docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-{1,2,3}/materialien/mat-X-Y.json`
- `docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-{1,2,3}/aufgaben/`
- `docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-{1,2,3}/rahmen/`
- `docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-{1,2,3}/ueberleitungen.json`
- `docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-{1,2,3}/PROGRESSIONSPLAN.md`
- `docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-{1,2,3}/DIDAKTIK_REVIEW_LOG.md`
- `docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-{1,2,3}/Q-GATE-LOG.md`

**Medien (im Kontext der didaktischen Einbettung, nicht Lizenz-Re-Audit):**
- `assets/img/deutscher-nationalismus-kolonialismus/` — Bildunterschriften + didaktische Passung zu Aufgaben

### 2.2 Sekundaer-Input (Kontext fuer PQI-Kalibrierung)
- Existierende Audit-Berichte: `BERICHT_RA2_DIDAKTIK_MATERIAL.md`, `BERICHT_RA3_ENGINE_ASSEMBLY.md` (fuer Integrations-Logik), `BEFUND_TESTRUN_N-K_KONSOLIDIERT.md`
- Matrix v1: `PRE_PILOT_TRIAGE_MATRIX.md` (jeder bestehende PI/Finding bekommt PQI-Score)
- LehrplanPlus-Referenz R7 GPG 7.3 (extern ueber WebSearch/MCP falls fuer konkrete Finding-Evaluation noetig, keine Volltext-Ingestion)

### 2.3 Explizit ausgeschlossene Inputs
- Mappe-4-Artefakte (im N-K-Testrun nicht zu Ende gebaut, siehe P0-A5 Retro-Patch-Kanon).
- Raw-Evidenz-JSONL aus `evidenz/` (das sind Pipeline-Logs, nicht Produkt-Output).
- Andere Games (z.B. erster-weltkrieg-ursachen) — F0e ist N-K-scope.

---

## 3. Methodik

### 3.1 PQI-Skala (Product-Quality-Impact)
| Level | Definition | Operationalisierung |
|---|---|---|
| **PQI-1 Fundamental** | Defekt bricht Lernziel, produziert Fehllernen, macht Material unbrauchbar | Historische Falschaussage, Puzzle-Logik-Bruch ohne Loesbarkeit, Immersions-Kollaps (Task nicht durchfuehrbar), LehrplanPlus-Fehlausrichtung |
| **PQI-2 Ernsthaft** | Defekt degradiert Lernerfahrung messbar, aber kompensierbar durch Lehrkraft-Intervention | Schwierigkeits-Fehlkalibrierung, Narrativ-Inkohaerenz, Register-Bruch, Differenzierungs-Luecke, Scaffolding-Lueck |
| **PQI-3 Kosmetisch** | Defekt ohne didaktische Relevanz | Layout, Typografie, minor Formulierungs-Unschaerfe, die Lernerfahrung nicht degradiert |

### 3.2 PQI-Dimensionen (6 orthogonale Achsen)
Jedes Finding wird gegen **alle 6** gepruefft; PQI-Score = Max ueber Dimensionen (das strengste Urteil gewinnt, weil der Schueler den schlimmsten Punkt erlebt).

| # | Dimension | Kern-Fragen |
|---|---|---|
| **D1** | Lernziel-Alignment | Adressiert Artefakt LehrplanPlus R7 GPG 7.3-Kompetenzen? Wird die intendierte Kompetenz operationalisiert oder nur beruehrt? |
| **D2** | Fachliche Korrektheit | Sind historische Aussagen korrekt? Werden Kontroversen angemessen gehandhabt (z.B. Kolonial-Narrativ)? Quellen-Einordnung sauber? |
| **D3** | Didaktische Strukturierung | Progression sinnvoll? Scaffolding fuer heterogene Jahrgangsstufe (Mittelschule R7) vorhanden? Differenzierungs-Angebote? Kognitive-Last-Management? |
| **D4** | Schwierigkeits-Kalibrierung | Sprach-Niveau A2-B1 fuer Mittelschule R7 passend? Kognitive Last pro Aufgabe? Komplexitaet gestaffelt? |
| **D5** | Narrativ-/Immersions-Kohaerenz | Story-Logik konsistent? Raetsel-Kontext passt zu Narrativ? Motivationaler Aufbau ueber Mappe 1→3? Immersion nicht durch Mechanik-Bruch zerstoert? |
| **D6** | Register / Inklusion / Diversitaet | Sprach-Register homogen und adressatengerecht? Gender- und herkunfts-sensible Formulierungen? Kolonial-Themen mit Multiperspektivitaet? Barrierefreiheit (Bild-Alt-Texte didaktisch, nicht nur technisch)? |

### 3.3 Evidenz-Standard
- Jeder PQI-Score = 1 Claim + ≥1 Evidenz-Citation (Datei:Zeile oder data.json-Pfad oder mat-X-Y.json-Schluessel).
- Bei Unsicherheit: PQI konservativ (niedrigere Zahl = strenger).
- Neue Findings (nicht in Matrix v1): eigene Finding-ID-Vergabe `F-RA6-NN` (RA6 = Didaktik-Retro), mit vollstaendiger Evidenz.

### 3.4 Output-Format (Audit-Befund-Schema)
Strukturiertes Markdown `F0e_BEFUND_DIDAKTIK.md` mit Sektionen:
1. Executive Summary (PQI-Verteilung, kritische Findings)
2. Pro Finding/PI aus Matrix v1: Tabellen-Zeile `ID | D1 | D2 | D3 | D4 | D5 | D6 | PQI-Max | Evidenz | Begruendung`
3. Neue Findings F-RA6-NN in gleichem Format
4. Aggregate (Wie viele PQI-1? Wo clustern sie? Patterns?)
5. Empfehlung: Welche Klasse-B/C-Items aus Matrix v1 werden durch PQI auf Klasse A gehoben?

---

## 4. Phasen-Plan (kleinschrittig, compaction-resistant)

Jeder Phasenschritt hat: **INPUT** → **AKTION** → **OUTPUT** → **VERIFY** → **NEXT**.

Bei Compaction zwischen Phasen: naechster Claude liest (a) dieses Plan-Artefakt, (b) Output der letzten Phase, (c) STATUS.md — und kann ohne Kontext-Historie fortsetzen.

### Phase F0e.0 — PM-Fundament (CURRENT)
- **INPUT:** `PRE_PILOT_TRIAGE_MATRIX.md` v1, User-Direktive F0e, `STATUS.md`, `CHANGELOG.md`
- **AKTION:** (1) Dieses Plan-Artefakt schreiben, (2) STATUS.md um F0e-Block erweitern, (3) Tasks #23-#30 in TaskCreate eroeffnen, (4) Go/NoGo-Prompt fuer Phase F0e.1 an User
- **OUTPUT:** Dieses Artefakt, STATUS-Update, Task-Liste
- **VERIFY:** Artefakt lesbar, STATUS referenziert F0e, Tasks existieren
- **NEXT:** Warten auf User-Go fuer F0e.1

### Phase F0e.1 — Audit-Prep (Rubric + Handoff) — Aufwand ~1h Claude
- **INPUT:** Abschnitte 2 + 3 dieses Artefakts
- **AKTION:**
  1. Rubric-Dokument schreiben: `F0e_AUDIT_RUBRIKEN.md` (elaboriert 6 Dimensionen × 3 PQI-Level mit Beispielen fuer R7 GPG)
  2. Audit-Handoff fuer Subagent schreiben: `F0e_HANDOFF_DIDAKTIK_AUDITOR.md` mit:
     - Rolle + Ziel + Nicht-Ziele
     - Input-Pfad-Manifest (alle Dateien aus §2.1)
     - Rubric-Referenz + Output-Schema
     - Working-Mode (Read-only, keine Code-Edits)
     - Ausgabe-Format + Datei-Pfad `F0e_BEFUND_DIDAKTIK.md`
     - Verifikations-Kriterien fuer den Befund
- **OUTPUT:** `F0e_AUDIT_RUBRIKEN.md`, `F0e_HANDOFF_DIDAKTIK_AUDITOR.md`
- **VERIFY:** Beide Dateien vollstaendig, Rubric hat konkrete Beispiele, Handoff ist self-contained
- **NEXT:** User-Bestaetigung Handoff, dann F0e.2

### Phase F0e.2 — Dual-Subagent-Audit-Execution — Aufwand ~2-3h Agent-Time (parallel)
- **INPUT:** `F0e_HANDOFF_DIDAKTIK_AUDITOR.md`
- **AKTION:** Parallele Spawn von **zwei** Subagenten in einem Message-Block (Anthropic-SDK-Muster fuer parallele Tool-Calls):
  - **Agent-α:** `subagent_type`: `design:research-synthesis` → Output-Datei `F0e_BEFUND_DIDAKTIK_alpha.md`. Perspektive-Fokus: Research-Synthesis-Methodik, Themen-Cluster, Schueler-Erfahrung als "User-Segment".
  - **Agent-β:** `subagent_type`: `general-purpose` → Output-Datei `F0e_BEFUND_DIDAKTIK_beta.md`. Perspektive-Fokus: Evidenz-getriebene Code-/Content-Analyse mit breiter Tool-Palette (Read/Grep/WebSearch-LehrplanPlus).
  - Beide bekommen identischen Handoff + identisches Rubric. Unterschied nur `subagent_type` + Output-Pfad.
  - Prompt ist self-contained (Handoff-MD-Inhalt komplett); Agent bekommt zusaetzlich explizite Anweisung, seinen subagent_type-Identifier im Befund zu tagge, damit Consolidation-Phase Zuordnung hat.
- **OUTPUT:** 2 Befund-Dateien: `F0e_BEFUND_DIDAKTIK_alpha.md` + `F0e_BEFUND_DIDAKTIK_beta.md`
- **VERIFY (pro Befund):** (1) Alle 60 Findings + 30 PIs mit PQI-Score, (2) Neue F-RA6-NN mit Evidenz, (3) PQI-Verteilung plausibel, (4) 5 Stichproben-Findings manuell gegengeprueft pro Befund (10 Stichproben total)
- **NEXT:** Bei beiden-PASS → F0e.2b Consolidation. Bei einem-FAIL → Einzel-Agent-Patch, der andere bleibt gueltig. Bei beiden-FAIL → Rubric-Nachschaerfung in F0e.1, Re-Run.

### Phase F0e.2b — Befund-Konsolidierung (Inter-Rater-Analyse) — Aufwand ~1h Claude
- **INPUT:** `F0e_BEFUND_DIDAKTIK_alpha.md` + `F0e_BEFUND_DIDAKTIK_beta.md`
- **AKTION:** Join der beiden Befunde pro Finding/PI:
  1. Pro Zeile: PQI-Alpha vs. PQI-Beta. Bei Uebereinstimmung → uebernehmen. Bei Delta (±1 Level) → hoehere Strenge gewinnt (konservativ). Bei Delta (±2 Level, z.B. 1 vs 3) → als DISAGREEMENT flaggen, Claude faellt Schiedsentscheidung mit Evidenz-Begruendung.
  2. F-RA6-NN-Dedup: Semantisch gleiche neue Findings (unterschiedlich benannt in α vs β) werden gemerged; nicht-ueberlappende werden beide aufgenommen.
  3. Aggregate-Metrik: Inter-Rater-Agreement-Rate (% Zeilen mit identischem PQI). < 70% → Rubric nicht trennscharf → Mitigation-Entscheidung.
- **OUTPUT:** `F0e_BEFUND_DIDAKTIK_consolidated.md` mit konsolidierten PQI-Scores + DISAGREEMENT-Sektion + Agreement-Rate
- **VERIFY:** (1) Jedes Finding hat finalen PQI, (2) Alle DISAGREEMENTs aufgeloest, (3) Agreement-Rate dokumentiert
- **NEXT:** F0e.3

### Phase F0e.3 — PQI-Integration (Matrix v2) — Aufwand ~1h Claude
- **INPUT:** `F0e_BEFUND_DIDAKTIK_consolidated.md`, `PRE_PILOT_TRIAGE_MATRIX.md` v1
- **AKTION:**
  1. Matrix v1 laden, pro Zeile PQI-Score aus BEFUND ergaenzen
  2. Klasse-Neu-Berechnung: `(Trigger-Prob ≥ 50%) AND (PQI ≤ 2)` → Klasse A
  3. Neue F-RA6-NN einsortieren mit ihrer Trigger-Prob (aus didaktischer Diagnose abgeleitet)
  4. Matrix v2 schreiben als neue Version des Artefakts: `PRE_PILOT_TRIAGE_MATRIX.md` Header v2.0 + Changelog-Sektion
  5. Neue Batch-4a/Batch-4b-Umfang-Kalkulation
- **OUTPUT:** `PRE_PILOT_TRIAGE_MATRIX.md` v2.0 mit 2D-Klassifikation
- **VERIFY:** (1) Jede Zeile hat PQI, (2) Klasse-Zuordnung entspricht 2D-Regel, (3) §6 Batch-4-Scope neu berechnet, (4) Diff gegen v1 klar dokumentiert
- **NEXT:** F0e.4

### Phase F0e.4 — Re-Triage + Batch-4-Scope-Recommendation — Aufwand ~30 min Claude
- **INPUT:** Matrix v2
- **AKTION:**
  1. Neue Empfehlung-Sektion (§8 v2) mit 3 Pfaden `F0a Minimal / F0b Full / F0c Direkt` unter 2D-Perspektive
  2. Aufwand-Re-Kalibrierung (Klasse A gewachsen um X Items? → neue Stunden)
  3. User-Decision-Prompt mit expliziten Trade-offs
- **OUTPUT:** `PRE_PILOT_TRIAGE_MATRIX.md` v2.1 (Empfehlung aktualisiert)
- **VERIFY:** Empfehlung zitiert konkrete PQI-gewichtete Items, Trade-off-Tabelle stimmt
- **NEXT:** F0e.5

### Phase F0e.5 — PM-Close (Commit + STATUS + CHANGELOG) — Aufwand ~15 min Claude + User
- **INPUT:** Alle F0e-Artefakte
- **AKTION:**
  1. STATUS.md: F0e-Block abschliessen, "Naechster Schritt" = User-Entscheidung Batch-4-Scope
  2. CHANGELOG.md: Neuer Eintrag `F0e Didaktisches Audit ABGESCHLOSSEN`
  3. Commit via Host-MCP, Repo weitergehts-online, Branch main
  4. Verify SYNC_OK
- **OUTPUT:** Commit (1), STATUS + CHANGELOG aktualisiert
- **VERIFY:** Git status clean auf main, commit in GitHub sichtbar, STATUS verweist auf Matrix v2.1
- **NEXT:** User-Entscheidung Batch-4a/b/c → dann Implementierung

---

## 5. Compaction-Resistance-Protokoll

Wenn waehrend F0e-Ausfuehrung Compaction eintritt, rekonstruiert der naechste Claude F0e-Zustand durch diesen 3-Step-Readin:

1. **Lesen:** `F0e_DIDAKTISCHES_AUDIT_PLAN.md` (dieses Artefakt) — kompletter Plan
2. **Lesen:** Aktueller Phasen-Output entsprechend letzter in STATUS gemeldeter Phase:
   - F0e.0 done → `PRE_PILOT_TRIAGE_MATRIX.md` v1 + dieses Artefakt
   - F0e.1 done → `F0e_AUDIT_RUBRIKEN.md` + `F0e_HANDOFF_DIDAKTIK_AUDITOR.md`
   - F0e.2 done → `F0e_BEFUND_DIDAKTIK.md`
   - F0e.3 done → `PRE_PILOT_TRIAGE_MATRIX.md` v2.0
   - F0e.4 done → `PRE_PILOT_TRIAGE_MATRIX.md` v2.1
3. **Lesen:** STATUS.md F0e-Block fuer letzten State-Marker

Pflicht-Konvention: Jeder Phasen-Abschluss schreibt `STATUS.md` F0e-Block neu mit: `Letzte abgeschlossene Phase: F0e.X`, `Naechste Phase: F0e.(X+1)`, `Blockierende Abhaengigkeiten: <liste>`, `Artefakt-Verweise: <liste>`.

Pflicht-Konvention: Alle F0e-Artefakte stehen in `docs/projekt/testrun-nationalismus-kolonialismus/` mit Praefix `F0e_`.

---

## 6. Task-ID-Schema (PM-Integration)

| Task-ID | Phase | Beschreibung | Dauer | Blocked-By |
|---|---|---|---|---|
| #23 | F0e.0 | Plan-Artefakt schreiben | 30 min | — |
| #24 | F0e.0 | STATUS + CHANGELOG F0e-Block | 10 min | #23 |
| #25 | F0e.1 | Rubric-Dokument | 30 min | User-Go |
| #26 | F0e.1 | Handoff-Dokument fuer Subagent | 30 min | #25 |
| #27 | F0e.2 | Dual-Subagent-Spawn (α+β) parallel + Monitoring | 2-3h | #26 |
| #28 | F0e.2 | Befund-Verifikation Stichproben (5 pro Agent = 10 total) | 45 min | #27 |
| #28b | F0e.2b | Befund-Konsolidierung Alpha+Beta → consolidated | 1h | #28 |
| #29 | F0e.3 | Matrix v2 (PQI-Integration aus consolidated) | 1h | #28b |
| #30 | F0e.4 | Batch-4-Scope-Recommendation v2 | 30 min | #29 |
| #31 | F0e.5 | Commit + STATUS/CHANGELOG-Close | 15 min | #30 |

Task #19 (bisherige F0.1-Klassifikations-Matrix) + Task #20 (Artefakt-Erstellung) werden in der Tasks-Liste als `completed` markiert (Produkt = Matrix v1, jetzt durch F0e ueberholt).

Task #21 (Verifikations-Schritt Matrix↔BEFUND↔UPGRADE_PLAN) wird reaktiviert **nach** F0e.3, weil Matrix v2 die Basis fuer Konsistenz-Check ist — macht Sinn erst nach PQI-Integration.

Task #22 (STATUS+CHANGELOG+Commit-Plan) wird durch #31 substituiert (Scope identisch).

---

## 7. Risiken & Mitigationen

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|---|---|---|---|
| Subagent produziert PQI-Scores ohne echtes didaktisches Urteilsvermoegen (LLM-Hallu) | Mittel | Hoch | Strenger Rubric mit Beispielen + Stichproben-Gegenpruefung in F0e.2 (5 Items manuell pro Agent = 10 total) + Konservativ-Default (bei Unsicherheit niedrigere PQI-Zahl = strenger) + **Dual-Subagent + Inter-Rater-Check** (Agreement-Rate <70% signalisiert Rubric-Unschaerfe oder LLM-Noise) |
| LehrplanPlus-Halluzination (erfundene Kompetenz-IDs / Standards) | Mittel | Hoch | D2-Entscheidung: **WebSearch-Pflicht** fuer LehrplanPlus-Referenzen. Subagent darf nur zitieren, was aus lehrplanplus.de / Bayerisches Staatsministerium-Quelle abgerufen wurde. Bei Nicht-Auffindbarkeit: "LehrplanPlus-Verify-PENDING"-Tag statt erfundener Referenz |
| Agent-Runtime laeuft in Tool-Call-Limit | Mittel | Mittel | Handoff strukturiert mit Phasen-Checkpoints: Mappe-1-Audit → Write Zwischen-Befund → Mappe-2 → Write → Mappe-3 → Write → Aggregate. Bei Abbruch Fortsetzung moeglich |
| Neue F-RA6-NN Findings ueberlappen mit bestehenden Findings → Doppel-Zaehlung | Niedrig | Niedrig | Dedup-Check in F0e.3 (Claude review): Vor Aufnahme einer F-RA6 pruefen, ob semantisch bereits als F-RA1-NN/P1/P2-X erfasst |
| PQI-Verteilung zu streng (100% PQI-1) oder zu lax (100% PQI-3) | Niedrig | Hoch | Rubric kalibriert mit Beispielen; Verify-Kriterium in F0e.2 prueft Verteilungs-Plausibilitaet |
| LehrplanPlus-Referenz nicht verifizierbar ohne externe Quelle | Mittel | Niedrig | Rubric nutzt bereits bekannte Kompetenz-Cluster R7 GPG 7.3; Bei Unsicherheit markiert Subagent "LehrplanPlus-Verify-Pending" als Meta-Tag, Claude/User klaeren in F0e.3 |
| Compaction mitten in F0e.2 (Subagent-Run) | Mittel | Mittel | Subagent-Output wird **sofort** persistiert (Teil-Befunde schreiben pro Mappe); Master-Claude-Context muss Subagent-Run nicht halten, weil Plan + Handoff im Repo liegen |

---

## 8. Open Decisions (User-Entscheidungen 2026-04-19)

| ID | Frage | Entscheidung |
|---|---|---|
| D1 | Subagent-Typ | **Dual-Spawn:** `design:research-synthesis` (α) + `general-purpose` (β) parallel, Konsolidierung in F0e.2b (Inter-Rater-Analyse) |
| D2 | LehrplanPlus-Bezug | **WebSearch-Pflicht** (lehrplanplus.de / isb.bayern.de). Keine Memory-Zitate. Bei Nicht-Auffindbarkeit PENDING-Tag |
| D3 | Pilot-Wahl orthogonal zu F0e | **Ja.** F3 bleibt entkoppelt; F0e informiert nur Batch-4-Scope |
| D4 | Freigabe F0e.1-Start | **Go** (2026-04-19) |

---

## 9. Erfolgs-Kriterien (Definition of Done)

F0e ist abgeschlossen wenn alle folgenden Bedingungen erfuellt:

1. `F0e_BEFUND_DIDAKTIK.md` existiert, deckt 60 Findings + 30 PIs mit PQI-Score ab, enthaelt ≥5 neue F-RA6-NN Findings (falls didaktisch gerechtfertigt; ≥0 formal erlaubt wenn tatsaechlich keine neuen Issues identifiziert).
2. `PRE_PILOT_TRIAGE_MATRIX.md` v2.1 existiert, jede Zeile hat 2D-Klassifikation, Empfehlung-§8 aktualisiert.
3. `STATUS.md` zeigt F0e als CLOSED, verweist auf Matrix v2.1, naechster-Schritt = User-Entscheidung Batch-4.
4. `CHANGELOG.md` enthaelt F0e-Eintrag.
5. Commit auf `main` mit SYNC_OK, Branch clean.

---

## 10. State-Marker (aktualisiert pro Phase)

**Letzte abgeschlossene Phase:** LP-QM-Aufbau (L1-L3 FERTIG, L4 LAUFEND)
**Naechste Phase:** F0e.2 (Dual-Subagent-Spawn parallel) — jetzt entsperrt durch LP-QM v1.0 als Primaer-Quelle
**Blocker:** User-Go fuer Spawn (Token-Budget + Runtime-Commitment) — LP-QM-Blocker entfernt
**Artefakt-Inventar F0e:** `F0e_DIDAKTISCHES_AUDIT_PLAN.md` v1.2, `F0e_AUDIT_RUBRIKEN.md` v1.1 (LP-QM-Primaer), `F0e_HANDOFF_DIDAKTIK_AUDITOR.md` v1.1 (LP-QM-Primaer), `docs/fachdidaktik/LEHRPLAN_QM_GPG7_MITTELSCHULE.md` v1.0 (NEU)
**Update-Historie:**
- 2026-04-19 v1.0: Plan-Artefakt erstellt (Phase F0e.0 initial)
- 2026-04-19 v1.1: User-Entscheidungen D1-D4 eingearbeitet. D1 Dual-Subagent (α+β parallel + Konsolidierung), D2 WebSearch-Pflicht fuer LehrplanPlus, D3 F3 orthogonal, D4 Go fuer F0e.1. Neue Phase F0e.2b (Konsolidierung) zwischen F0e.2 und F0e.3 eingefuegt. Neue Task #28b. Risiken-Tabelle um LehrplanPlus-Hallu-Mitigation erweitert.
- 2026-04-19 F0e.1 abgeschlossen: `F0e_AUDIT_RUBRIKEN.md` v1.0 (10 Sektionen, 6 Dim × PQI-Skala mit R7-GPG-Beispielen + Worked Examples) und `F0e_HANDOFF_DIDAKTIK_AUDITOR.md` v1.0 (Self-contained Spawn-Prompt mit Platzhaltern fuer AGENT_ID/SUBAGENT_TYPE/OUTPUT_PATH). Bereit fuer Dual-Spawn.
- 2026-04-19 v1.2 LP-QM-Integration: LP-QM v1.0 (`docs/fachdidaktik/LEHRPLAN_QM_GPG7_MITTELSCHULE.md`) als Primaer-Quelle fuer D1 etabliert. Rubriken §6 + Handoff §6 umgestellt (WebSearch nur noch Backup). Subagent nutzt ab sofort Q-Gates §7, CP-Schwellen §6.X.5, AP-Screen §6.X.8 als kanonische Checklisten. Risiko-Reduktion: LP-Halluzinationsgefahr geringer, da SSoT exisitiert.
