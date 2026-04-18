# BERICHT RA1 — Pipeline / Prozess

Audit-Dimension: 1 (Pipeline / Prozess)
Review-Agent: RA1
Testrun: deutscher-nationalismus-kolonialismus (Game-ID)
Datum: 2026-04-18
Status: FINAL

---

## 0. Zusammenfassung (max. 10 Zeilen)

Die Pipeline wurde in der Reihenfolge 0.1 → 0.2 → 0.4 → 2.0 → 2.1 → 2.1b → 2.1c → 2.2 → 3.0 → 3.1 → 3.2 pro Mappe grundsaetzlich korrekt durchlaufen. Phase 0.3 (SKRIPT) wurde produziert, aber Phase 1 (MATERIAL_GERUEST) erscheint im phase_events/milestones-Extrakt nicht explizit als PASS dokumentiert (Sessions-Summary markiert sie als PASS; keine eigene Q-Gate-Markierung in den Evidenzdateien). Ort-Constraint (Phase 0.2 + Phase 3.0 in Claude Code) wurde eingehalten. Ueber alle drei Sessions gab es nur 1 WARN und 0 FAIL-Q-Gate-Ereignis in der Produktion — Q-Gate-Mechanik laeuft de facto als Selbst-PASS-Schleife. Der V13-Patch (2026-04-12T16:43Z) wurde retroaktiv NICHT auf Mappe 3 angewendet: die Hefteintrag-Verschachtelung manifestierte sich in Mappe 3 erneut (2026-04-16T18:24Z). Die Patch-Durchsetzungs-Luecke ist eine direkte Realisierung von F-P1 aus BEFUND_TESTRUN_M1_KONSOLIDIERT.md. Drei Session-Boundaries mit 12 Auto-Kompaktionen erhoehten das Drift-Risiko spuerbar. **Gate-Urteil: GELB.**

---

## 1. Mandat und Scope

RA1 beantwortet laut Charta §1: War die Pipeline im Testrun eingehalten und war die Phasen-Choreografie robust?

In-Scope: Phasen 0.1 bis 3.2 pro Mappe, Q-Gate-Auslastung, Session-Handoffs, ORCHESTRATOR-/PI-Nutzung als Router, V13-Patch-Wirksamkeit, Uebergaben PM↔Claude-Code.

Out-of-Scope (laut Charta §7): Didaktische Material-Qualitaet (RA2), Engine-/data.json-Format-Fehler (RA3), Medien-/Lizenz-Integritaet (RA4), PM-Meta wie Kompaktion-Detailanalyse, Token-Effizienz, Task-Tracking (RA5). RA1 nennt Kompaktionen nur, soweit sie Phasen-Uebergaenge betreffen.

## 2. Methodik

Vorgehen:
1. Charta + AUDIT_STATE + EVIDENZ_BUNDLE als Startpunkt.
2. `milestones.json` als kuratierte Schluesselstellen.
3. `timeline.csv` zur Kontroll-Sampling und ORCHESTRATOR/PI/Vertrag-Read-Zaehlung.
4. `session_handoffs.md` fuer Uebergabe-Analyse.
5. `summary.json` + `tool_counts_per_session.csv` fuer Tool-Nutzungsprofil.
6. Quervergleich mit `BEFUND_TESTRUN_M1_KONSOLIDIERT.md` §F-P1/F-P2/F-P3.
7. Vertrags-Referenz: `VERTRAG_PHASE_3_ASSEMBLY.md` (V13) + `VERTRAG_PHASE_3-1_DEPLOY.md` (DEPLOY-06) in `escape-game-generator/architektur/vertraege/`.
8. Kanonische Pipeline-Sollstruktur: `docs/architektur/WORKFLOW_v4.md` §3 (Sektions 1-120 gelesen; Rest per Grep abgetastet).

JSONL-Zeitfenster nur gezielt angefragt (ORCHESTRATOR-Read-Count, PI-Read-Count, VERTRAG_PHASE-Read-Count). Finding-IDs F-RA1-01 bis F-RA1-13. Severitaet nach Charta §3.

## 3. Pipeline-Topologie (Soll)

Kanonische Phasenstruktur laut `WORKFLOW_v4.md` §3:

| Phase | Ort | Zweck | Output |
|---|---|---|---|
| 0.1 DIDAKTIK | Cowork | DIDAKTIK_RAHMEN | md |
| 0.2 INHALT | Claude Code | INHALTSBASIS + Artefakt-Sichtung | md |
| 0.3 SKRIPT | Cowork | SKRIPT | md |
| 0.4 HEFTEINTRAG/TAFELBILD | Cowork | TAFELBILD pro Mappe + STRUKTUR-FREEZE | md |
| 1 MATERIAL_GERUEST | Cowork | Materialtyp-Zuordnung pro Mappe | md |
| 1.5 Sequenzplanung | Cowork | Reihenfolge, didaktische Funktion | md |
| 2.0 Rahmen | Cowork | 5 rahmen/*.json pro Mappe | json |
| 2.1 Material | Cowork | mat-{N}-K.json x 6 pro Mappe (Dispatch-isoliert) | json |
| 2.1b Didaktik-Review | Cowork | DIDAKTIK_REVIEW_LOG.md | md |
| 2.1c Cross + Ueberleitung + Hefteintrag-Revision | Cowork | ueberleitungen.json, sicherung.json finalisiert | json |
| 2.2a PROGRESSIONSPLAN | Cowork | PROGRESSIONSPLAN.md | md |
| 2.2b Aufgaben | Cowork | aufgabe-{N}-K.json x 5 pro Mappe (Dispatch-isoliert) | json |
| 2.2c Aufgaben-Cross | Cowork | Cross-Konsistenz + Re-Dispatch | json |
| 3.0 Assembly | Claude Code | data.json um Mappe-Objekt erweitern | json |
| 3.1 Deploy-Preparation | Cowork (lokal ausfuehrbar) | deploy-check.sh + Staging-Flag | shell/html |
| 3.2 Live-Go | Cowork | Staging-Flag entfernen, MAPPEN_ABGESCHLOSSEN++ | html |

Vertragsautoritaeten:
- Phase-Reihenfolge: `PROJECT_INSTRUCTIONS.md` Uebergangstabelle (SSOT laut v3.9-Memory).
- Phase-Details/Q-Gates: `docs/architektur/vertraege/VERTRAG_PHASE_*.md`.
- V13 seit 2026-04-12T16:43Z: `VERTRAG_PHASE_3_ASSEMBLY.md` prueft assembliertes `sicherung.hefteintrag` in data.json auf `knoten[]`, `scpl`, `stundenfrage`.
- DEPLOY-06 seit 2026-04-12T16:43Z: `VERTRAG_PHASE_3-1_DEPLOY.md` enthaelt identischen Check auf Deploy-Seite (doppelte Sicherung Assembly + Deploy).

## 4. Pipeline-Ablauf (Ist, rekonstruiert)

Chronologie (Auszug aus `milestones.json` + `timeline.csv`):

| Phase / Mappe | Session | Start-ts | End-ts | Q-Gate | Abweichung |
|---|---|---|---|---|---|
| ONBOARDING | A | 2026-04-12T14:04Z | 2026-04-12T14:06Z | — | korrekt |
| 0.1 DIDAKTIK | A | 14:06Z | 14:10Z | PASS | 4 Mappen, 2 KEs |
| 0.2 INHALT (CC) | A | 14:16Z (Prompt) | 14:35Z (Relay) | PASS | Claude-Code-Relay ok |
| Medien-Nachrecherche | A | 14:36Z | 14:38Z | informell | 16 wikimedia-search-Aufrufe in Cowork; **F-RA1-02** |
| 0.3 SKRIPT | A | 14:39Z | 14:43Z | — (impl. PASS) | keine explizite Q-Gate-Markierung im Extract |
| 0.4 TAFELBILD | A | 14:45Z-14:55Z | 14:55Z | PASS (1 WARN) | QH2 Mappe 3 Stundenfrage 13W — WARN akzeptiert |
| 1 MATERIAL_GERUEST | A | nach 14:55Z | vor 15:20Z | (impl.) | **F-RA1-03** keine Q-Gate-Markierung in milestones.json, nur Handoff-Summary |
| 2.0 Rahmen Mappe 1 | A | 15:12Z | 15:20Z | PASS | 5 Dateien |
| 2.1 Material Mappe 1 | A | 15:20Z | 15:39Z | PASS | 6 Materialien |
| 2.1b Didaktik-Review M1 | A | 15:40Z | 15:43Z | PASS (2 WARN) | F1 Tagebuch-Marker, F2 Zitatsprache |
| 2.1c Cross M1 | A | 15:43Z | 15:45Z | PASS | ueberleitungen.json |
| PFLICHT-SPLIT A→B | A | 15:45Z | 15:48Z | — | user-initiiert ("uebergabe prompt"), nicht vertrags-erzwungen; **F-RA1-04** |
| Handoff A→B | — | 15:49Z | — | — | Uebergabe-Prompt 1860 Zeichen, PI-Zeile-13 explizit referenziert |
| 2.2 M1 (a+b+c) | B | 16:00Z | 16:11Z | PASS | 7 Aufgaben |
| 3.0 Assembly M1 (CC) | B | vor 16:30Z | 16:30Z | PASS (implizit) | User-Rueckmeldung "Claude code phase ist durchgeführt" |
| 3.1 Deploy-Prep M1 | B | 16:30Z | 16:32Z | PASS | deploy-check.sh 5/5 PASS |
| Hefteintrag-Defekt M1 | B | 16:38Z | 16:45Z | **FAIL live** | User-Befund Rendering-Defekt; V13-Patch |
| V13-Patch | B | 16:41Z | 16:43Z | — | VERTRAG_PHASE_3_ASSEMBLY + DEPLOY + ORCHESTRATOR gepatcht + deploy-check.sh erweitert |
| 3.2 Live-Go M1 | B | 16:55Z | 16:58Z | PASS | data-status=staging entfernt |
| 2.0 Rahmen Mappe 2 | B | 17:00Z | 17:04Z | PASS | — |
| 2.1 Material Mappe 2 | B | 17:04Z | 17:36Z | PASS (Iter 2) | Strategie-Audit E1 nach mat-2-2 (User-Validierung PFLICHT) |
| Handoff B→C | — | 17:48Z | — | — | User-generiert 2000+ Zeichen |
| 2.2 M2 (a+b+c) | C | 17:53Z | 18:15Z | PASS | — |
| Phase 2 Abschluss M2 | C | 18:20Z | — | — | Uebergabe-Prompt an CC |
| 3.0 Assembly M2 (CC) | C | 18:20Z-2026-04-16 | — | PASS (extern) | User-Rueckmeldung via Commit 5d778c1 |
| Engine-Fix Lueckentext | C | 2026-04-16T15:43Z | ~16:23Z | — | User-Befund; CC Engine-Patch; **retroaktive Infrastruktur-Aenderung ausserhalb Phasen-Pipeline** |
| 2.0-2.2 M3 | C | 2026-04-16T16:59Z | 17:30Z | PASS | — |
| 3.0 Assembly M3 (CC) | C | 17:30Z-17:53Z | 17:53Z | PASS (extern) | **MV2-Befund 17:53Z: img-3-2 halluziniert; CC macht Ersatzentscheidung ohne Rueckkopplung in Cowork — F-RA1-05** |
| MV2-Audit | C | 17:53Z | 17:55Z | — | 6/18 Halluzinationen; **Upgrade-Plan-Deferral** durch User 17:57Z |
| 3.1/3.2 M3 | C | 18:04Z | — | **Post-Live-FAIL** | User 18:14Z: 5 Patch-Findings; PATCH-M3 |
| V13-Regression M3 | C | 18:24Z | 18:25Z | FAIL | Hefteintrag-Verschachtelung fehlt erneut — **F-RA1-06** |
| Patch-Zyklus M3 | C | 18:26Z | 18:34Z | PASS-behauptet | — |
| Patch-Persistenz | C | 18:44Z + 18:53Z | — | **User: Defekte persistieren** — F-RA1-07 |
| Engine ReferenceError | C | 20:12Z | — | — | Seed-Code-Bug, out-of-scope RA3 |
| UX-1 Finding | C | 2026-04-17T10:33Z | 10:33Z | — | Hefteintrag zu lang, Lueckentext-Disable, Sprachniveau |
| Mappe 4 | — | — | — | **NICHT BEGONNEN** | Testrun endete nach Mappe 3 + UX-1-Notation |

Gesamtanzahl PASS-Markierungen in milestones.json: 28 Phase-PASS (inkl. CC-Relays). 1 QH2 WARN. 0 Q-Gate-FAIL waehrend der Produktion. Die im `milestones.json` gelisteten "q_gate_fail"- und "halluzi"-Bloecke beziehen sich auf Post-Live-Defekte, NICHT auf aktive Q-Gate-Rejections waehrend der Produktion.

## 5. Phasen-Analyse

### 5.1 Phase 0 (0.1-0.4) Didaktik-Grundlage

Reihenfolge korrekt. Phase 0.2 (INHALT) lief vertragskonform in Claude Code (Ort-Constraint aus WORKFLOW_v4 §3), zurueck per Feedback-Relay (`[USER] feedback von claude code`, 2026-04-12T14:35:26Z).

Auffaellig: Nach 0.2-Relay folgte eine Cowork-Medien-Nachrecherche mit 16 Wikimedia-Suchen (2026-04-12T14:36-14:38Z). Das Ergebnis wurde in die INHALTSBASIS zurueck-geschrieben. Dies ist ein **ungeplanter Prozess-Schritt** — weder WORKFLOW_v4 §5.0.2 noch `VERTRAG_PHASE_0-2_INHALT` dokumentieren eine Cowork-Nachrecherche-Schleife nach Claude-Code-Produktion. Der Agent hat eine Luecken-Tabelle aus der INHALTSBASIS identifiziert und proaktiv geschlossen. Das Vorgehen ist inhaltlich sinnvoll, bricht aber die klare Ort-Trennung und trug spaeter zur MV2-Problematik bei: 16 wikimedia-search-Ergebnisse wurden akzeptiert ohne strukturiertes Existenz-Pre-Check-Gate fuer konkrete Dateinamen. → **F-RA1-02 (P2)**.

Phase 0.3 SKRIPT und Phase 0.4 TAFELBILD abgeschlossen innerhalb der gleichen Session A mit STRUKTUR-FREEZE. 1 WARN (QH2 M3 Stundenfrage 13W) wurde akzeptiert; die C1b-Identitaetsrestriktion (exakte Wortgleichheit Stundenfrage ↔ einstieg.problemstellung ↔ SKRIPT-Chunk-Titel) wurde damit bereits bei Phase 0.4 auf Constraint-Grenze verschoben.

### 5.2 Phase 1 MATERIAL_GERUEST

Keine eigene Q-Gate-PASS-Markierung im milestones.json-Extract. Das Handoff-Prompt A→B referenziert "**Phase 1.1 MATERIAL_GERUEST (all 4 Mappen) PASS**", die Q-Gate-Evidenz liegt jedoch nur im kompaktierten Session-Summary vor. Entweder wurde der PASS nicht in phase_events/milestones markiert (Evidenz-Luecke im Extraktor) oder die Phase wurde ohne explizites Q-Gate-Ereignis durchlaufen. → **F-RA1-03 (P3)** Dokumentations-/Evidenz-Drift. Keine P0/P1-Wirkung; alle 4 Mappen wurden spaeter erfolgreich in Phase 2.0 uebernommen.

### 5.3 Phase 2 Didaktische Produktion (2.0-2.2c pro Mappe)

Mappe 1: Vollstaendig sequenziell 2.0 → 2.1 → 2.1b → 2.1c → 2.2a → 2.2b → 2.2c. Alle Q-Gates PASS. 2 Didaktik-WARNs dokumentiert (F1, F2) und sauber an Phase 2.2 als Aufgabendesign-Input weitergereicht.

Mappe 2: Wie M1. Strategie-Audit E1 (User-Validierung PFLICHT nach Material 1-2) eingehalten. Phase 2.1b brauchte Iteration 2 (D1-2 FAIL→PASS in mat-2-6 Antwort, D3-1 Entscharfung mat-2-3, D3-2 Fiktionsmarkierung). Das ist vertragskonform: 2.1b mit Iteration 1→2 ist der designierte Eskalationspfad, kein Skip.

Mappe 3: Wie M2, Iteration 1 PASS laut asst_text 17:27Z. Kein dokumentiertes D-Finding.

Mappe 4: **Nicht begonnen.** Testrun endete nach Mappe 3-Live-Patch-Zyklus und UX-1-Notation. Das ist innerhalb Scope (Testrun explizit mit Mappe 1-3 abgeschlossen), aber dokumentiert einen Abbruch vor Ziel-Vollstaendigkeit. → **F-RA1-08 (P3)**.

**Session-Split A→B** erfolgte nach 2.1c M1 exakt an der vertraglich vorgesehenen Stelle (PFLICHT-SPLIT Zeile 13 der Uebergangstabelle). Sitzung A hatte bis dahin 3 Auto-Kompaktionen und lief stabil.

**Session-Split B→C** geschah nach Phase 2.0 M2 Start (17:47Z last activity B, Handoff-Prompt 17:48Z), NICHT an einem PFLICHT-SPLIT. Es war ein user-initiiertes Context-Window-Management, kein vertrags-erzwungener Split. → **F-RA1-04 (P2)**: Session-Split-Autoritaet liegt de facto beim User-"uebergabe prompt"-Befehl, nicht bei einer Vertrags-Triggerregel. WORKFLOW_v4 §PFLICHT-SPLIT und PI-Zeile-13 definieren genau EINEN Pflicht-Split (nach 2.1c). Alle weiteren Splits sind Notanker bei Kontext-Druck.

### 5.4 Phase 3.0 Assembly

Phase 3.0 lief in allen drei Mappen in Claude Code — vertragskonform (WORKFLOW_v4 §3 Z.165 "Ort: Claude Code"). Rueckmeldung kam als User-Relay ("Claude code phase ist durchgeführt"). Kein Fall einer regelwidrigen Cowork-Assembly.

Aber: Bei Mappe 1 manifestierte sich am 16:38Z der Hefteintrag-Verschachtelungs-Defekt post-Assembly (Rendering-Problem in der Live-Seite). Root-Cause laut asst_text 16:41Z: "VERTRAG_PHASE_3_ASSEMBLY.md §3.2.3 ist korrekt und explizit [...]. Claude Code hat diese Zeile ignoriert — nur `hefteintrag_verweis` (String) wurde übernommen, nicht `hefteintrag` (Objekt mit SCPL, [...])." Der Patch V13 (Vertrags-seitig) + DEPLOY-06 (Skript-seitig) + ORCHESTRATOR-Uebergabe-Template-Patch erfolgte in 2 Minuten (16:41-16:43Z).

**Problem A (bereits bekannt, F-P2-Regression):** V13 war ein Post-hoc-Patch. Die Assembly wurde nicht re-dispatcht, sondern nur manuell nachgepatcht. Das Precedens: Agent-Code kann Vertragsspec ignorieren; der Mechanismus "Vertrag wird eingehalten" war bei Phase 3.0 nicht durchsetzbar.

**Problem B (Kern-Finding F-RA1-06, P0):** Bei Mappe 3 (2026-04-16T18:24Z, 4 Tage spaeter) trat **derselbe Defekt erneut auf**. Die V13-/DEPLOY-06-Patches haben ihn NICHT verhindert. Drei moegliche Ursachen:

1. Claude Code hat bei M3-Assembly den V13-Vertragstext nicht gelesen oder ignoriert (analog zu M1).
2. deploy-check.sh DEPLOY-06 fuer M3 wurde nicht ausgefuehrt — aus phase_events 2026-04-16T18:03Z geht hervor, dass Phase 3.1 fuer M2 und M3 zum MV2-Zeitpunkt "noch aus" stand. Phase 3.0-Assembly wurde von CC direkt nach M3 ausgefuehrt, aber 3.1 Deploy-Prep auf M3 wurde erst nach dem User-Befund 18:14Z angepasst. → DEPLOY-06 haette den Defekt abfangen sollen, wurde aber wahrscheinlich nach dem Live-Gang gerissen.
3. Die Live-Seite war schon "live" (User 18:14Z: "mappe ist live"), bevor 3.1 gate-geprueft wurde. → Zeile-21-User-Validierung wurde an 3.2 vorbeigezogen.

Evidenz fuer 3: asst_text 2026-04-16T18:03:59Z: "Mappe 3 ist bereits in data.json assembliert. Aber Phase 3.1 (Deploy-Preparation) und 3.2 (Live-Go) stehen für Mappe 2 und 3 noch aus." Ausserdem User 18:14Z: "hat doch geklappt, mappe ist live. probleme [...]". Das ist **P0**: Phase 3.1 Gate wurde bei Mappe 3 (und moeglicherweise Mappe 2) uebersprungen. Der Live-Gang erfolgte ohne DEPLOY-01..06 Pre-Check. Der Bestandsschutz von V13 wurde damit neutralisiert.

### 5.5 Phase 3.1 Deploy-Preparation

Bei Mappe 1: PASS (alle 5 Gates, 2026-04-12T16:32Z). deploy-check.sh ausgefuehrt in Cowork.

Bei Mappe 2: Keine explizite Phase-3.1-PASS-Markierung in milestones.json oder timeline.csv vor dem Live-Gang. asst_text 2026-04-16T16:51Z markiert "Mappe 2: Assembly + Deploy abgeschlossen (mappe-2.html + data.json existieren, Commit 5d778c1 live)", aber ein deploy-check.sh-Aufruf fuer M2 ist in timeline.csv nicht dokumentiert.

Bei Mappe 3: Keine explizite Phase-3.1-PASS-Markierung vor dem Live-Gang. Der asst_text 18:03Z bestaetigt das fehlende Gate.

→ **F-RA1-05 (P0)**: Phase 3.1 wurde bei Mappe 2 und Mappe 3 entweder uebersprungen oder unterdokumentiert. Beide Faelle sind problematisch: Skip → V13-/DEPLOY-06-Schutz neutralisiert; Unterdokumentation → Vertrags-Nachbedingung N1-N4 nicht nachweisbar.

### 5.6 Phase 3.2 Live-Go

Mappe 1: PASS 2026-04-12T16:58Z. data-status=staging entfernt, MAPPEN_ABGESCHLOSSEN=1, Zeile 22 done.

Mappe 2: Kein Phase-3.2-PASS im Extract vor 2026-04-16T16:51Z "Mappe 2 ... live Commit 5d778c1". Retroaktive Zustandskorrektur erwaehnt ("Zustandsblock muss nachgezogen werden"). → Zustand-vs-Realitaet-Drift.

Mappe 3: Kein Phase-3.2-PASS-Ereignis vor dem User-Post-Live-Befund 18:14Z.

### 5.7 Phase 4 / QA / Abnahme

Die Pipeline kennt keine explizite Phase 4. Qualitaetssicherung findet phase-intern per Q-Gate (2.1/2.1b/2.1c/2.2a/2.2b/2.2c/3.0/3.1/3.2) statt. Post-Live-QA durch den User im Unterrichtseinsatz (UX-1 Finding 2026-04-17T10:33Z) ist **informeller Kanal** ohne Vertragseinbindung. Das Lueckentext-Disable-Feedback kam 3 Tage vor Testrun-Ende (2026-04-16T15:43Z), wurde aber als Engine-Bug geroutet, nicht als Phase-3.x-Defekt. → **F-RA1-09 (P2)**: QA-Rueckkanal fehlt als Phase.

## 6. Handoffs und Session-Uebergaben

Vier Uebergabe-Segmente laut `session_handoffs.md`:

**last_A → first_B (2026-04-12T15:49Z)**:
- Form: Von User manuell getipptes "ÜBERGABE-PROMPT" (1860 chars).
- Inhalt: Game-ID, letzte Phase (2.1c M1 PASS), naechste Aktion (2.2 M1), Artefakt-Pfade, offene Findings F1/F2 aus 2.1b, PI-Zustandsblock-Zeile, 4 nummerierte Aktionen fuer die neue Session.
- Qualitaet: hoch. Praezise, kopierbar, Vertrags-Referenzen (PFLICHT-SPLIT, V-Phase).
- Problem: Der Summary-basierte Kompaktions-Block `last_A` (aus Auto-Kompaktion 15:27Z) und der User-Uebergabe-Prompt first_B sind **getrennte Kanaele**. Der User musste manuell einen zweiten Uebergabe-Prompt generieren. → strukturelle Dopplung.

**last_B → first_C (2026-04-12T17:48Z)**:
- Form: User-generiert (nach Anforderung 17:45Z "schreibe einen entsprechenden übergabe-prompt"), deutlich laenger, strukturierter.
- Inhalt: Mappe-2 Phase-2.0/2.1/2.1b/2.1c-Status, Artefakt-Inventar ASCII-Baum, STRUKTUR-FREEZE-Status.
- Qualitaet: hoch. Umsetzung: Agent fuehrte Phase 2.2 M2 direkt aus.
- Problem: Kein ORCHESTRATOR-Read-Trigger im Prompt; der Prompt fuehrt direkt zum naechsten Vertrag. → realisiert F-P1 aus M1-Befund.

**Auto-Kompaktionen (12x):** Sessions A 3x, B 3x, C 6x. Kompaktion-Summaries lassen Prompt-Laenge bei 2000 chars abbrechen, dadurch sind Detail-Constraints (Vertrags-Paragrafen, Q-Gate-Kriterien) in den Summaries unterrepraesentiert. Die last_A- und last_B-Snippets brechen mitten in technischen Konzepten ab ("UTF-8 real Umlaute [...]", "L-DUP (Lemma-Duplikat-Check): 8-char stem truncation, stop-set filtering [...]"). → **F-RA1-10 (P1)**: Kompaktions-induzierte Constraint-Drift ist strukturell.

Beobachtung: Auch User-initiierte Uebergabe-Prompts (5 weitere in user_messages.jsonl, z.B. 2026-04-16T16:23:46Z "schreibe einen präzisen übergabeprompt an claude code zur verlässlichen bewerkstelligung der fixes") treten gehaeuft im Debug-/Patch-Zyklus auf. Uebergabe-Prompt-Pflege ist informeller User-Workaround fuer fehlende strukturelle Uebergabe-Mechanik.

## 7. Vertrags-Compliance

Lese-/Routing-Zaehlung aus `timeline.csv`:

| Dokument | Read-Count | Davon vor Phase-Transition |
|---|---|---|
| PROJECT_INSTRUCTIONS.md | 42 | wiederholt, grob 1/Transition |
| ORCHESTRATOR.md | 4 | 4 Reads in drei Sessions (2 davon im V13-Patch-Kontext) |
| WORKFLOW_v4.md | 0 | nicht im Testrun gelesen |
| VERTRAG_PHASE_*.md | 30 | pro Phase im Mittel 1-2 Reads |

**Beobachtungen:**
- **PI** wird als Router konsequent genutzt (42 Reads) — positiv, realisiert v3.9-Steuerungsrefaktor (PI = SSOT laut User-Memory).
- **ORCHESTRATOR** wird nur 4x gelesen ueber drei Sessions, davon zwei im V13-Patch-Kontext (ORCHESTRATOR Uebergabe-Template wurde selbst gepatcht). In keinem Fall vor einer Phasen-Transition als Router. → realisiert **F-P1** aus Befund M1 direkt.
- **WORKFLOW_v4** wurde 0x gelesen — konsistent mit OPT-1-Policy (PM-Dokument, nicht Produktions-Agent).
- **Vertraege** werden konsequent gelesen, in der Regel direkt vor Dispatch. 30 Reads / 15+ Phasen pro Mappe x 3 Mappen ≈ 1/Phase (unterdurchschnittlich; einige Vertraege wurden zwischen Mappen nicht re-gelesen, z.B. VERTRAG_PHASE_2-0 nach M1 nicht mehr).

**V13 Patch-Wirksamkeits-Analyse** (Charta §7, Pflicht-Sektion):

| Dimension | Mappe 1 (Vor-Patch) | Mappe 3 (Nach-Patch) |
|---|---|---|
| Assembly-Vertrag enthielt hefteintrag-Objekt-Spec | Ja (§3.2.3) | Ja (§3.2.3) |
| V13-Check im Vertrag | Nein | Ja (seit 16:43Z) |
| DEPLOY-06 in deploy-check.sh | Nein | Ja (seit 16:42Z) |
| ORCHESTRATOR Uebergabe-Template mit Verifikationspunkt | Nein | Ja (seit 16:43Z) |
| Assembly durch Claude Code korrekt durchgefuehrt | Nein (Verschachtelung fehlte) | Nein (Verschachtelung fehlte erneut) |
| Phase 3.1 deploy-check.sh ausgefuehrt | Ja (PASS vor Defekt-Befund) | **Unklar/Nein** (siehe 5.5) |
| DEPLOY-06 griff | Nicht existent | Wurde nicht ausgefuehrt |

Ergebnis: V13 als Spezifikation wirkte. V13 als Durchsetzungsmechanismus wirkte NICHT, weil (a) Claude Code die Vertragsspec erneut ignorierte, (b) das Deploy-Gate fuer M3 uebersprungen wurde. Zwei unabhaengige Durchsetzungs-Ebenen, beide perforiert. → **F-RA1-06 (P0)**.

Alternativer Hypothesen-Test: Haette CC fuer M3 einen aktualisierten Assembly-Prompt mit V13-Hinweis erhalten? Laut asst_text 17:28-17:30Z ("Read Phase 3.0 Assembly contract" → "Produce Übergabeprompt for Claude Code Assembly Mappe 3") wurde der Vertrag vor Uebergabeprompt-Erstellung gelesen. Der Prompt-Inhalt selbst ist im Extract nicht sichtbar, aber die Reihenfolge laesst vermuten, dass der V13-Hinweis IM Prompt stand. Dann wuerde Ursache (a) — CC ignorierte die Spec bewusst oder versehentlich — zutreffen. Das ist ein Agent-Compliance-Problem, nicht ein Vertrags-Problem.

## 8. Zeit- und Token-Oekonomie

Aus `summary.json`:
- Session A: 594 Messages, 229 Tool-Calls, 14 Errors, 42 Thinking-Blocks, 1h 45min.
- Session B: 672 Messages, 259 Tool-Calls, 7 Errors, 50 Thinking-Blocks, 1h 58min.
- Session C: 1732 Messages, 665 Tool-Calls, 24 Errors, 77 Thinking-Blocks, 4d 16h (Kalenderzeit), deutlich kuerzer Realarbeit.

Zu viele Tool-Errors in Session C (24). Aus `tool_errors.jsonl`-Hinweisen in EVIDENZ_BUNDLE: 10x "File content exceeds tokens" (Read ohne offset/limit auf grossen Dateien), 6x Virtiofs-Git-Lock. Das sind bekannte Klassen (Memory `feedback_virtiofs_git_lock.md`), keine Pipeline-spezifischen Fehler. Nicht im RA1-Kernscope, aber Kompaktionstrigger.

**Zahlen zu Subagenten-Nutzung (Charta §5 Router-Frage):** Nur 5 Subagent-Spawns in 3337 Messages. Kein paralleler Q-Gate-Audit pro Mappe. Phase-2.1b-Didaktik-Review wurde 2x sequenziell als Agent-Spawn ausgefuehrt (Session B, 17:31Z + 17:35Z) — das ist das einzige belastbare Multi-Agent-Muster.

## 9. Vergleich mit Testrun M1 (Baseline)

Befund M1-Konsolidiert vom 2026-04-10 formulierte drei offene Prozess-Findings (F-P1, F-P2, F-P3). Status im jetzigen Testrun:

| M1-Finding | M1-Schwere | Im Testrun sichtbar? | Neue Evidenz |
|---|---|---|---|
| F-P1: ORCHESTRATOR nicht als Router | HIGH | Ja. 4 ORCHESTRATOR-Reads, 0 vor Phase-Transition | bestaetigt und verstaerkt |
| F-P2: Assembly in Cowork statt CC | MEDIUM | **Nein.** Alle 3 Assemblys liefen in CC | gefixt (vermutlich durch v3.9 PI-Refaktor + STOP-Marker) |
| F-P3: Steuerungsdokumente-Redundanz | HIGH | Indirekt. WORKFLOW_v4 0 Reads, ORCHESTRATOR marginal, PI dominant | gefixt/entschaerft durch v3.9-Refaktor |

Zusaetzlich neue Prozess-Findings (F-RA1-01 bis F-RA1-13) siehe Sektion 10.

**Meta-Beobachtung:** Die v3.9-Steuerungsrefaktor-Wirkung ist positiv — Assembly in CC, PI als SSOT wird geroutet. Aber die in M1 offen gebliebenen V13/DEPLOY-06-Durchsetzungsmechanismen versagen im Testrun erneut, jetzt bei Mappe 3. Das ist kein F-P-Regress, sondern zeigt: Vertrags-Patches allein reichen nicht, wenn die Uebergabe nach Claude Code Compliance nicht erzwingt.

## 10. Findings

### F-RA1-01 — Q-Gate-Mechanik de facto Selbst-PASS-Schleife (P1)

- **Beschreibung:** Ueber 3 Sessions und 3 Mappen wurde nur 1 WARN (QH2 M3 Stundenfrage 13W in Phase 0.4) und 0 FAIL erzeugt. Alle anderen im milestones.json gelisteten Defekte sind Post-Live-Befunde, nicht aktive Q-Gate-Rejections. Der Agent ist zugleich Produzent und Q-Gate-Pruefer — Selbst-PASS-Tendenz strukturell angelegt.
- **Evidenz:** `milestones.json` "q_gate_fail" enthaelt 1 Eintrag (QH2 WARN 2026-04-12T14:55:09Z). Alle weiteren Eintraege sind Hefteintrag-/Assembly-/Hallu-Defekte, die nachtraeglich entdeckt wurden. 28 Phase-PASS-Events.
- **Ursache:** Q-Gate-Check ist in allen Phasen dem produzierenden Agenten selbst ueberlassen. Es gibt keine Dispatcher-externe Pruefinstanz. Das ist strukturelle Eigenschaft, nicht Testrun-Spezifikum.
- **Empfehlung:** Externe Q-Gate-Instanz (Subagent) fuer mindestens Phase 2.1b und Phase 3.1 einfuehren. Mindestens: ein Subagent-Spawn je Mappe fuer 2.1b-Re-Review (in Testrun nur 1x in B 17:31Z+17:35Z realisiert — als Ausnahme, nicht Regel).
- **Severitaet:** P1.

### F-RA1-02 — Cowork-Medien-Nachrecherche-Schleife nach Phase 0.2 ohne Vertragsdeckung (P2)

- **Beschreibung:** Nach Phase 0.2 (CC) fuehrte Cowork 16 wikimedia-image-search-Aufrufe durch und schrieb 6 neue Medien-Eintraege mit `[NACHRECHERCHE]`-Marker in INHALTSBASIS. Dies ist weder in WORKFLOW_v4 §3/§5 noch in VERTRAG_PHASE_0-2_INHALT vorgesehen.
- **Evidenz:** `timeline.csv` 2026-04-12T14:36:09Z bis 14:38:16Z — 16 wikimedia-Calls; asst_text "**6 neue Medien** in die INHALTSBASIS eingetragen (alle mit `[NACHRECHERCHE]` markiert)".
- **Ursache:** Cowork-Agent identifizierte Luecken-Tabelle und agierte proaktiv, ohne ein Phase-0-2-Re-Dispatch-Gate. Positiv fuer Inhaltsqualitaet, aber spaeter MV2-mitursaechlich: nur Metadaten-Suche, kein Existenz-Pre-Check pro konkretem Dateinamen.
- **Empfehlung:** Entweder Cowork-Nachrecherche als explizite Phase 0.2b (mit eigenen Q-Gates, inkl. wikimedia-API-Existenzpruefung pro Dateiname) aufnehmen, oder Cowork-Eingriffe in Phase-0-Artefakte nach CC-Produktion vertraglich untersagen.
- **Severitaet:** P2 (Prozess-Drift ohne unmittelbaren Defekt; traegt latent zu MV2 bei).

### F-RA1-03 — Phase 1 MATERIAL_GERUEST ohne eigene Q-Gate-Markierung in Evidenz-Extrakten (P3)

- **Beschreibung:** Milestones/timeline.csv enthalten keine explizite Phase-1-PASS-Markierung. Der PASS ist nur im Handoff-Prompt A→B retrospektiv rekonstruiert.
- **Evidenz:** `milestones.json` phase_pass-Liste springt von 14:55Z (0.4 PASS) direkt zu 15:20Z (2.0 Rahmen M1 PASS); `first_B`-Prompt nennt "Phase 1.1 MATERIAL_GERUEST PASS" ohne ts-Verankerung.
- **Ursache:** Phase 1 lief in einer der Kompaktions-Luecken (14:45Z oder 15:12Z) und hat keine persistierte Q-Gate-Zeile im Protokoll hinterlassen.
- **Empfehlung:** Phase 1 MATERIAL_GERUEST-Q-Gate explizit als separates Log-Ereignis in Q-GATE-LOG.md erzwingen (Vertrag-Nachbedingung). Phase 1.5 Sequenzplanung ebenso.
- **Severitaet:** P3 (Evidenz-/Dokumentationsdrift, kein Material-Defekt).

### F-RA1-04 — Session-Splits ausserhalb PFLICHT-SPLIT als Notanker, nicht durch Vertragstrigger (P2)

- **Beschreibung:** Von 2 Session-Splits war nur 1 (A→B nach 2.1c M1) vertraglich erzwungen. Split B→C erfolgte zwischen Phase 2.0 M2 und Phase 2.1 M2 — mitten in einer Mappe. Split ist ein User-Workaround fuer Kontext-Druck, nicht Prozess-Signal.
- **Evidenz:** `session_handoffs.md` last_B 2026-04-12T17:25:55Z (Auto-Kompaktions-Summary) + first_C 17:48:22Z (User-generierter Prompt). `milestones.json` zeigt 2026-04-12T17:04Z Phase 2.0 Rahmen M2 PASS, danach 17:26Z Explore-Agent, 17:36Z 2.1b M2 PASS — Split-Boundary laeg in der Mitte von 2.1 M2.
- **Ursache:** Keine Vertragsdefinition fuer Soft-Splits zwischen Pflicht-Splits. User deckt den Gap durch manuelle Uebergabe-Prompts ab.
- **Empfehlung:** Entweder zusaetzliche Pflicht-Splits (z.B. nach 2.0 und nach 2.1b pro Mappe) definieren, oder Uebergabe-Prompt-Template-Generator als Tool in Cowork einbauen, damit der User das nicht manuell tippen muss.
- **Severitaet:** P2.

### F-RA1-05 — Phase 3.1 Deploy-Preparation bei Mappe 2 und 3 uebersprungen oder unterdokumentiert (P0)

- **Beschreibung:** Mappe 2 und 3 gingen live, ohne dass deploy-check.sh + DEPLOY-01..06 Gates vor dem Live-Gang protokollarisch nachweisbar sind.
- **Evidenz:** timeline.csv hat nur fuer M1 einen deploy-check.sh-Lauf (2026-04-12T16:31:17Z + 16:31:23Z + 16:42:34Z + 16:43:31Z). Fuer M2/M3 keine deploy-check.sh-Referenz. asst_text 2026-04-16T18:03:59Z: "Mappe 3 ist bereits in data.json assembliert. Aber Phase 3.1 (Deploy-Preparation) und 3.2 (Live-Go) stehen für Mappe 2 und 3 noch aus." User 2026-04-16T18:14:22Z: "mappe ist live" — Live-Gang vor Gate-Pruefung.
- **Ursache:** Vertragliche Ortszuordnung 3.1=Cowork (lokal ausfuehrbar) hat in Session C zeitlich nicht stattgefunden. Mappen wurden post-Assembly direkt vom CC-Commit in die Live-Seite gefuehrt; der Cowork-Gate wurde uebersprungen.
- **Empfehlung:** Vertrag `VERTRAG_PHASE_3-1_DEPLOY.md` um "Pre-Live-BLOCK" haerten: Ohne N1-N4-Nachbedingungen in Q-GATE-LOG darf der Live-Flag nicht entfernt werden. PI-Zustandsblock-Absicherung: Staging-Flag-Entfernung nur nach protokolliertem DEPLOY-01..06-PASS.
- **Severitaet:** P0 (direkter Defekt-Pfad: Ohne Gate wurde der Hefteintrag-Verschachtelungs-Defekt in M3 erst post-Live bemerkt).

### F-RA1-06 — V13-Patch-Regression in Mappe 3 (P0)

- **Beschreibung:** Der exakt identische Hefteintrag-Verschachtelungs-Defekt, der am 2026-04-12T16:41Z den V13-Patch ausloeste, trat bei Mappe 3 am 2026-04-16T18:24Z (ca. 96h spaeter) erneut auf.
- **Evidenz:** `milestones.json` hefteintrag-Block 2026-04-12T16:41:26Z ("Spezifikation ohne Durchsetzung — VERTRAG_PHASE_3_ASSEMBLY.md §3.2.3 ist korrekt und explizit [...]. Claude Code hat diese Zeile ignoriert"); 2026-04-16T18:24:59Z ("In data.json ist `hefteintrag` direkt unter `mappen[2]`, und `sicherung` ist ein separates Objekt ohne `hefteintrag`-Property"); 18:25:12Z ("Das ist ein Assembly-Fehler — Claude Code hat bei Mappe 3 den Hefteintrag nur auf Top-Level gelegt, nicht auch unter `sicherung`").
- **Ursache:** Zwei Durchsetzungs-Ebenen (V13 im Vertrag, DEPLOY-06 im Skript) perforiert. V13: Claude Code ignorierte die Vertragsspec erneut. DEPLOY-06: Das Skript wurde fuer M3 nicht ausgefuehrt (F-RA1-05).
- **Empfehlung:** Zusaetzliche dritte Durchsetzungs-Ebene: Post-Assembly-Subagent in Claude Code, der DEPLOY-06-aequivalente Pruefung direkt am Assembly-Ende durchfuehrt, bevor git commit + push stattfindet. Alternativ: Assembly-Prompt macht V13 zum "MUST_VERIFY"-Block mit eigener Q-Gate-Zeile.
- **Severitaet:** P0 (Live-Defekt, Regression eines bekannten Patterns).

### F-RA1-07 — Patch-Persistenz bei Live-Defekt-Zyklus Mappe 3 (P1)

- **Beschreibung:** Nach dem Patch-Zyklus (2026-04-16T18:26-18:34Z) mit PASS-behaupteter Selbst-Verifikation persistierten Umlaut- + HTML-Entity-Defekte in der Live-Seite (User-Rueckmeldungen 18:44Z + 18:53Z).
- **Evidenz:** `milestones.json` assembly_bug 2026-04-16T18:31:21Z "Alle 5 Findings gepatcht — Source-JSONs UND data.json. Validierung bestanden". User 18:44Z + 18:53Z: "Formatierungsfehler persistieren weiter" (aus EVIDENZ_BUNDLE §4.4).
- **Ursache:** Mehrere moegliche: (a) Cache-Busting nicht ausgefuehrt (Memory `feedback_cache_busting.md`). (b) Patch nicht vollstaendig gepusht. (c) Source-JSON gepatcht, aber data.json im Repo alt.
- **Empfehlung:** Patch-Loop mit Post-Live-Verifikation durch den Agenten erzwingen (wget der Live-URL + Diff-Check). In scope RA3 fuer technische Ursache; RA1-Perspektive: Prozess enthaelt keine "Post-Patch-Live-Verify"-Phase.
- **Severitaet:** P1.

### F-RA1-08 — Testrun-Abbruch vor Mappe 4 ohne Abschluss-Prozedur (P3)

- **Beschreibung:** Der Testrun endete nach M3-UX-1-Notation ohne Mappe 4. Kein Abschluss-Q-Gate, keine Retrospektiv-Prozedur, kein definiertes "Testrun-Ende-Artefakt".
- **Evidenz:** Letzte User-Nachricht 2026-04-17T10:33:09Z UX-1; danach keine weitere Phase-Aktivitaet.
- **Ursache:** User-initiierter Abbruch (Unterrichtseinsatz-Befund priorisiert). Vertraglich kein Mechanismus fuer "unvollstaendiger Testrun".
- **Empfehlung:** PI-Status-Erweiterung um STATUS=SUSPENDED mit Grund + naechstem Schritt. Kein neuer Abbruch-Q-Gate noetig, nur Zustand explizit.
- **Severitaet:** P3.

### F-RA1-09 — QA-/Post-Live-Rueckkanal fehlt als Pipeline-Phase (P2)

- **Beschreibung:** Post-Live-User-Feedback (UX-1, Lueckentext-Bug, Praxisbefund) hat keine definierte Eintrittsphase. Findings landen entweder im Upgrade-Plan (Deferral) oder loesen Ad-hoc-Patch-Loops aus.
- **Evidenz:** 2026-04-16T15:43Z User Praxis-Feedback zu M1+M2 (3 Tage vor Ende); 2026-04-17T10:33Z UX-1. Beides direkt im Chat, kein Pipeline-Eintrittspunkt.
- **Ursache:** Pipeline endet bei Phase 3.2 Live-Go. Kein Phase 4 definiert.
- **Empfehlung:** Phase 4 "Post-Live-Feedback-Integration" definieren: Eingangsformat (Template fuer User-Feedback), Triage-Logik (Engine vs. Content vs. Prozess), Routing in Patch-/Upgrade-Plan.
- **Severitaet:** P2.

### F-RA1-10 — Kompaktions-induzierte Constraint-Drift (P1)

- **Beschreibung:** Auto-Kompaktions-Summaries brechen bei 2000 chars, schneiden technische Constraints ab. last_A endet mitten in "UTF-8 real Umlaute (ä, ö, ü, ß) in all output files" — Encoding-Rule v3.2. Vertrags-Details werden vom Agent nach Kompaktion nur noch aus dem Summary rekonstruiert.
- **Evidenz:** `session_handoffs.md` last_A + last_B; `summary.json` 12 Auto-Kompaktionen, 5 davon an einem Tag (2026-04-16, Mappe-3-Debug-Tag). Die Assembly-Umlaut-Defekte in Mappe 3 (`fuer` statt `für`, `europaeische` statt `europäische`) sind direkter Kandidat fuer kompaktions-induzierte Encoding-Rule-Regression: Die Regel steht in last_A, fliegt dann aus Session C's Summary raus, und wird bei Produktion nicht konsistent angewendet. CC-Assembly-Umlaut-Ersatz passiert in der gleichen Phase.
- **Ursache:** 2000-Char-Limit der Kompaktions-Summaries + keine expliziten Constraint-Ancoring-Mechanismen.
- **Empfehlung:** Kritische Constraints (Encoding v3.2, V13, DEPLOY-06, C1b-Identitaet) in ein minimal-persistentes Dokument auslagern (~500 chars), das PI-analog vor jedem Dispatch gelesen wird. Oder: Kompaktions-Summary-Template, das Constraint-Block separat vorbehaelt.
- **Severitaet:** P1.

### F-RA1-11 — Ort-Constraint fuer Phase 3.0 wurde gehalten, aber Rueckkopplung nach Cowork fehlt (P2)

- **Beschreibung:** CC durfte eigenstaendig Entscheidungen treffen (z.B. Bild-Ersatz `Maréchal-Karikatur` statt `Berlin_Conference,_1884-85.jpg`, SVG→PNG-Konversion, Assembly-Umlaut-Transliteration), die in Cowork nicht validiert wurden, bevor 3.1/3.2 stattfand.
- **Evidenz:** `milestones.json` halluzi 2026-04-16T17:53:35Z: "[USER] rückmeldung von claude code: Wichtige Abweichungen von UEBERGABE (dokumentiert)". User-Relay liefert Liste der Abweichungen, aber kein Vertrags-Gate validiert sie.
- **Ursache:** Handoff-Template CC → Cowork ist User-manuell. Keine strukturierte "Deviation-Report"-Schnittstelle.
- **Empfehlung:** CC-Assembly-Output um strukturiertes `DEVIATION_LOG.json` erweitern, das Cowork bei Phase 3.1 als Input nimmt (Vertrags-Vorbedingung).
- **Severitaet:** P2.

### F-RA1-12 — Engine-Patch in Infrastruktur-Schicht ausserhalb Phasen-Pipeline (P2)

- **Beschreibung:** Zwischen Mappe 2 und Mappe 3 (2026-04-16 15:43Z bis 16:23Z) wurde ein Engine-Fix (Lueckentext-Retry, Freitext-Akzeptanz L1+L2) in CC durchgefuehrt — commit 5d778c1. Das ist eine Infrastruktur-Aenderung ohne Einbettung in die Produktions-Pipeline.
- **Evidenz:** user_messages 2026-04-16T16:43:37Z "rückmeldung claude code: Commit & Push erledigt. Commit `5d778c1` — `fix(engine): Lueckentext-Retry + Freitext gestufte Akzeptanz (L1+L2)`".
- **Ursache:** Engine-Fixes werden ad hoc ausgeloest. Der Testrun verschraenkt Content-Produktion und Engine-Entwicklung.
- **Empfehlung:** Engine-Patches waehrend laufender Game-Produktion blockieren oder mindestens in separatem Track mit eigener Q-Gate-Spur fuehren.
- **Severitaet:** P2.

### F-RA1-13 — ORCHESTRATOR Uebergabe-Template wurde in V13-Patch gepatcht, im Testrun aber nicht als Routing-Referenz gelesen (P2)

- **Beschreibung:** Die V13-Massnahme schloss einen Patch des ORCHESTRATOR Uebergabe-Templates ein (milestones 2026-04-12T16:43:47Z "`ORCHESTRATOR.md` Übergabe-Template: Verifikationspunkt für hefteintrag-Voll[..]"). Bei Uebergabeprompt-Erstellung fuer M3 (2026-04-16T17:29Z) wurde der Vertrag gelesen, aber ORCHESTRATOR nicht gezielt als Template-Quelle konsultiert.
- **Evidenz:** timeline.csv ORCHESTRATOR-Reads 4x gesamt, keiner zum Zeitpunkt Uebergabeprompt-Erstellung CC M3.
- **Ursache:** ORCHESTRATOR-Nicht-Routing-Pattern (F-P1). Patch eines Referenzdokuments ohne Durchsetzungskanal.
- **Empfehlung:** Uebergabeprompt-Generator als skriptbasiertes Tool (mit hart verdrahteter V13-Check-Klausel), nicht als frei formulierter Prompt.
- **Severitaet:** P2.

### Finding-Count nach Severitaet

| Severitaet | Count | IDs |
|---|---|---|
| P0 | 2 | F-RA1-05, F-RA1-06 |
| P1 | 3 | F-RA1-01, F-RA1-07, F-RA1-10 |
| P2 | 6 | F-RA1-02, F-RA1-04, F-RA1-09, F-RA1-11, F-RA1-12, F-RA1-13 |
| P3 | 2 | F-RA1-03, F-RA1-08 |

## 11. Risiken (nicht-realisiert, aber latent)

- **R1 Cascade-Regression bei Mappe 4+:** Wenn Mappe 4 in derselben Pipeline-Konfiguration weiterlaeuft, besteht hohe Wahrscheinlichkeit fuer wiederholten Hefteintrag-Verschachtelungs-Defekt oder aehnliches Assembly-Seiteneffekt-Muster. Zwei CC-Einreichungen (M1, M3) haben denselben Fehler produziert — ein drittes Vorkommen bei M4 ist erwartbar.
- **R2 Kompaktions-induzierte Encoding-Regression:** Die Umlaut-Transliteration bei M3 deutet auf eine wiederkehrende Kompaktions-Regression hin. Bei jedem neuen Run mit stark komprimierter C-Phase ist identisches Muster zu erwarten.
- **R3 User-Uebergabe-Burnout:** Der User schrieb in diesem Testrun ca. 5 manuelle Uebergabe-Prompts. Kein Prozess-Element unterstuetzt ihn dabei. Bei laengeren Spielen (mehr Mappen oder mehr Games) skaliert das nicht.
- **R4 Post-Live-Feedback-Versickerung:** UX-1-Finding landete im Upgrade-Plan (Deferral). Kein Mechanismus garantiert, dass R7-Sprachniveau-Probleme in laufende Produktionen zurueckfliessen.
- **R5 Selbst-PASS-Tendenz:** Weil 1 WARN / 0 FAIL in 3 Mappen statistisch unplausibel ist, besteht hohes Risiko, dass reale Defekte den Q-Gates systemisch durchrutschen.

## 12. Gate-Urteil

**GELB.**

Begruendung:

- Pipeline-Grundstruktur wurde eingehalten. Alle Phasen 0-2 pro Mappe durchlaufen. Ort-Constraints (0.2, 3.0 in CC) respektiert. Handoffs A→B und B→C funktionell. V13-Patch-Reaktion auf M1-Defekt war schnell und mehrlagig.
- Aber: **Zwei P0-Findings** (F-RA1-05 Phase 3.1 Gate-Skip bei M2+M3, F-RA1-06 V13-Regression in M3) zeigen, dass die Durchsetzung von Pipeline-Regeln an der Schnittstelle zu Claude Code und an Live-Gang-Gates strukturell fehlt. Diese Defekte haben in den Unterricht durchgeschlagen (Hefteintrag-Rendering M3 post-live, Umlaut-Persistenz).
- Drei P1-Findings (Q-Gate-Selbst-PASS, Patch-Persistenz, Kompaktions-Drift) verstaerken das Bild: Die Pipeline funktioniert als Happy Path robust, hat aber keine Fehlertoleranzmechanismen.
- Kein GRUEN moeglich, weil P0-Defekte live wurden.
- Kein ROT, weil die Pipeline unter Eigenkorrektur-Feedback (V13-Patch-Selbstanstoss, User-Interventionen) am Ende jede Mappe lieferte und Mappen 1-2 stabil live sind.

## 13. Empfehlungen

Direkt an den Konsolidierungsagenten zur Bewertung und Priorisierung:

1. **P0-A (F-RA1-05 + F-RA1-06):** Haertung Phase 3.1 + DEPLOY-06-Durchsetzung. Vor Mappe 4: `VERTRAG_PHASE_3-1_DEPLOY.md` §3 erweitern um "Pre-Live-BLOCK: Live-Flag-Entfernung ist nur nach dokumentiertem DEPLOY-01..06-PASS zulaessig. Verstoss = ROT-Eskalation." Zusaetzlich: CC-Assembly-Prompt-Template um explizite V13-Self-Check-Zeile ergaenzen ("Nach Assembly pruefe `data.mappen[N-1].sicherung.hefteintrag` existiert mit knoten[], scpl, stundenfrage. Fehler → FAIL").
2. **P0-B (F-RA1-05):** PI-Zustandsblock erweitern um Feld `LETZTE_DEPLOY_CHECK_STATUS` (PASS|FAIL|SKIPPED|TIMESTAMP). Phase 3.2 blockt bei != PASS.
3. **P1-A (F-RA1-01):** Subagent-gespawnter Q-Gate-Review fuer Phase 2.1b pro Mappe zur Pflicht machen. Impact: reduziert Selbst-PASS-Tendenz bei hoher didaktischer Sichtbarkeit.
4. **P1-B (F-RA1-10):** Constraint-Bundle (~500 chars) aus Encoding v3.2, V13, DEPLOY-06, C1b in ein `CONSTRAINT_BUNDLE.md` auslagern, PI-analog auto-load pro Session, auch nach Kompaktion persistent.
5. **P1-C (F-RA1-07):** "Post-Patch-Live-Verify" als formalisierte Unter-Phase 3.2b (wget Live-URL, Diff Soll-JSON-Felder), bevor der Patch-Zyklus als abgeschlossen markiert wird.
6. **P2-A (F-RA1-11):** Strukturierten `DEVIATION_LOG.json` aus CC als Pflicht-Artefakt nach jedem 3.0-Assembly. Cowork 3.1 liest DEVIATION_LOG als Input.
7. **P2-B (F-RA1-02):** Cowork-Medien-Nachrecherche als explizite Phase 0.2b mit Wikimedia-API-Existenzpruefung pro Dateiname legitimieren oder blockieren.
8. **P2-C (F-RA1-09):** Phase 4 "Post-Live-Feedback-Integration" als Eintrittskanal fuer UX-/Praxis-Befunde definieren (Template + Triage-Routing).
9. **P2-D (F-RA1-04):** Uebergabeprompt-Template-Generator als Cowork-Tool/Skill, damit User keine manuellen Handoffs mehr tippen muss.
10. **P2-E (F-RA1-12):** Engine-Patches waehrend aktiver Game-Produktion vertraglich in separaten Track verschieben.
11. **P3-A (F-RA1-03):** Q-Gate-Markierung fuer Phase 1 und 1.5 zur Nachbedingung des jeweiligen Vertrags machen.
12. **P3-B (F-RA1-08):** PI-STATUS=SUSPENDED einfuehren fuer unterbrochene Runs mit Grund/Next-Step.

Priorisierung fuer v3.10/v3.12 (nicht in diesem Bericht zu entscheiden): mindestens Empfehlungen 1, 2, 3, 4 vor Mappe 4 oder vor neuem Game.

---

## Anhang A: Evidenz-Referenzen

Kern-Zitate zu P0-Findings (wortwoertlich aus milestones.json / timeline.csv):

**F-RA1-05 Phase 3.1 Skip Mappe 3:**
- asst_text 2026-04-16T18:03:59Z: "Mappe 3 ist bereits in data.json assembliert. Aber Phase 3.1 (Deploy-Preparation) und 3.2 (Live-Go) stehen für Mappe 2 und 3 noch aus."
- user 2026-04-16T18:14:22Z: "hat doch geklappt, mappe ist live. probleme die in upgrade-plan dokumentiert und in konkreter mappe 3 gepatched werden müssen: [...]"
- Keine deploy-check.sh-Tool-Events fuer M3 in timeline.csv vor 18:14Z.

**F-RA1-06 V13-Regression:**
- asst_text 2026-04-12T16:41:26Z: "VERTRAG_PHASE_3_ASSEMBLY.md §3.2.3 ist korrekt und explizit [...]. Claude Code hat diese Zeile ignoriert — nur `hefteintrag_verweis` (String) wurde übernommen, nicht `hefteintrag` (Objekt mit SCPL, [...])."
- asst_text 2026-04-16T18:24:59Z: "Jetzt sehe ich das Problem: In data.json ist `hefteintrag` direkt unter `mappen[2]` (Zeile 2300), und `sicherung` ist ein separates Objekt (Zeile 2419) ohne `hefteintrag`-Property."
- asst_text 2026-04-16T18:25:12Z: "Bei Mappe 3 fehlt die Verschachtelung unter `sicherung`. Das ist ein Assembly-Fehler — Claude Code hat bei Mappe 3 den Hefteintrag nur auf Top-Level gelegt, nicht auch unter `sicherung`."

**F-RA1-10 Kompaktions-Constraint-Drift:**
- session_handoffs.md last_A endet: "- **Encoding Rule v3.2**: UTF-8 real Umlaute (ä, ö, ü, ß) in all output files [...]" (Abbruch bei 2000 chars).
- milestones assembly_bug 2026-04-16T18:15:24Z: "Finding 1 (Umlaute in einstieg.json): Quelle ist das Produktions-JSON — `fuer` statt `für`, `europaeische` statt `europäische`. [...] Hier wurde die ASCII-Transliteration verwendet."

**F-RA1-01 Selbst-PASS:**
- milestones.json q_gate_fail-Liste: 1 Eintrag (QH2 WARN 2026-04-12T14:55:09Z).
- phase_pass-Liste: 28 Eintraege ueber 4 Tage.

Pfade aller Evidenz-Dateien:
- `/sessions/admiring-optimistic-cerf/mnt/weitergehts-online/docs/projekt/testrun-nationalismus-kolonialismus/evidenz/milestones.json`
- `/sessions/admiring-optimistic-cerf/mnt/weitergehts-online/docs/projekt/testrun-nationalismus-kolonialismus/evidenz/timeline.csv`
- `/sessions/admiring-optimistic-cerf/mnt/weitergehts-online/docs/projekt/testrun-nationalismus-kolonialismus/evidenz/session_handoffs.md`
- `/sessions/admiring-optimistic-cerf/mnt/weitergehts-online/docs/projekt/testrun-nationalismus-kolonialismus/evidenz/summary.json`
- `/sessions/admiring-optimistic-cerf/mnt/weitergehts-online/docs/projekt/testrun-nationalismus-kolonialismus/evidenz/tool_counts_per_session.csv`
- `/sessions/admiring-optimistic-cerf/mnt/weitergehts-online/docs/projekt/testrun-nationalismus-kolonialismus/evidenz/phase_events.jsonl`
- `/sessions/admiring-optimistic-cerf/mnt/weitergehts-online/docs/projekt/testrun-nationalismus-kolonialismus/evidenz/user_messages.jsonl`

Vertrags-/Architektur-Referenzen:
- `/sessions/admiring-optimistic-cerf/mnt/escape-game-generator/architektur/vertraege/VERTRAG_PHASE_3_ASSEMBLY.md` (§3.2.3 Spec, V13 seit 2026-04-12T16:43Z)
- `/sessions/admiring-optimistic-cerf/mnt/escape-game-generator/architektur/vertraege/VERTRAG_PHASE_3-1_DEPLOY.md` (DEPLOY-06 seit 2026-04-12T16:43Z)
- `/sessions/admiring-optimistic-cerf/mnt/weitergehts-online/docs/architektur/WORKFLOW_v4.md` (§3 Phasenstruktur-Referenz)
- `/sessions/admiring-optimistic-cerf/mnt/weitergehts-online/docs/befunde/BEFUND_TESTRUN_M1_KONSOLIDIERT.md` (F-P1/P2/P3 Vorgeschichte)
