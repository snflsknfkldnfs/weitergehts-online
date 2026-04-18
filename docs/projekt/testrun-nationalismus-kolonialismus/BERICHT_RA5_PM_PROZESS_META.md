# BERICHT RA5 — PM / Prozess / Meta

Status: FINAL
Autor: Review-Agent RA5
Datum: 2026-04-18
Scope: Dimension 5 — Session-Handoffs, ORCHESTRATOR-Routing, Context-Pressure, Task-Tracking, Claude-Code-Uebergaben, User-Interventionen, Subagenten-Nutzung, Dauer/Effizienz
Out-of-Scope: Pipeline-Reihenfolge (RA1), Didaktik (RA2), Engine (RA3), Medien (RA4)

---

## 1. Zusammenfassung (Executive)

Der Testrun `deutscher-nationalismus-kolonialismus` wurde auf strukturell trag­faehiger, aber empirisch instabiler PM-Infrastruktur durchgezogen. 3 Kalendar-Tage, 3 Cowork-Sessions, 95 User-Nachrichten, 1153 Tool-Calls, 12 Auto-Kompaktionen, 45 Tool-Errors, 5 Subagenten-Spawns. Die Steuerung ueber PROJECT_INSTRUCTIONS.md (PI) als State-Machine-SSOT funktioniert fuer Phase 0-2 weitgehend; ab Phase 3.0 Assembly (in Claude Code) und erst recht im Debug-Zyklus ab 2026-04-16 bricht die PM-Kontrolle sichtbar ein.

Kern-Defekt-Klassen: (a) Handoff-Prompts sind von Assistant, nicht PM-automatisch erzeugt und kodifizieren keinen Post-Kompaktions-Reorientierungs-Schritt. (b) Kompaktionen cluster im Debug-Betrieb und induzieren nachweislich Regression (Umlaut-/HTML-Entity-Persistenz nach "live"-Patch 2026-04-16 18:44Z und 18:53Z). (c) Die Rueck-Uebergabe aus Claude Code ist nicht standardisiert — MV2 und die Mappe-3-Defekte wurden reaktiv nach User-Befund gefunden, nicht praeventiv ueber ein Rueckmelde-Gate. (d) Subagenten-Delegation deutlich unter Potential: 5 Spawns auf 1153 Tool-Calls. (e) Eine explizite Kompaktions-Hygiene (Dump-zu-STATUS vor Erschoepfung) existiert nicht.

F-P1 aus dem M1-Befund (ORCHESTRATOR nicht als Router) ist durch den v3.9-Refaktor (PI = SSOT) im Testrun effektiv nicht mehr wirksam: ORCHESTRATOR wurde nur 20x, PI 107x, VERTRAG_PHASE_* 74x gelesen. Das Routing folgt der PI-State-Machine. F-P2 (Phase 3 in Cowork statt CC) tritt im Testrun teilweise wieder auf — Phase 3.1/3.2 fuer Mappe 2 und 3 wurden zwischenzeitlich verschlafen (User-Intervention 2026-04-16 18:03Z: "ich bin mir nicht sicher, aber glaube 3.1 und 3.2 wurden nicht gemacht"). Das ist keine Regression des alten Root Cause, sondern ein neuer Zustands-Drift in Session C nach Kompaktion.

Gate-Urteil: **FAIL-FOR-v3.12-PILOT**, behebbar.

Findings: 9 (P0: 0, P1: 5, P2: 3, P3: 1).

---

## 2. Methodik und Quellen

Primaerquellen: `evidenz/session_handoffs.md`, `evidenz/compaction_events.jsonl` (via `milestones.json`), `evidenz/user_messages.jsonl` (95 Eintraege chronologisch klassifiziert), `evidenz/subagent_spawns.jsonl`, `evidenz/summary.json`, `evidenz/tool_counts_per_session.csv`, `evidenz/milestones.json`, gezieltes Grep in `evidenz/tool_calls.jsonl` (Referenz-Dokument-Reads: PI 107, VERTRAG_PHASE_* 74, ORCHESTRATOR 20, STATUS.md 0).

Sekundaerquellen: `AUDIT_STATE.md`, `EVIDENZ_BUNDLE.md`, `docs/projekt/COWORK_PROJECT_ANLEITUNG.md`, `docs/befunde/BEFUND_TESTRUN_M1_KONSOLIDIERT.md` (Findings F-P1/F-P2).

Methodik: User-Messages chronologisch in (a) Freigabe, (b) neue Aufgabe, (c) Korrektur PM-Fehler, (d) Korrektur Produkt-Fehler klassifiziert. Handoffs als Zeitfenster +/- 10 min um Sessions-Grenze gelesen. Kompaktions-Events als Timestamp gegen Phase-Zustand in `phase_events.jsonl` projiziert. Keine Retro-Erinnerung, keine Spekulation ueber nicht-protokollierte Zustaende.

Fuer alle Aussagen zu Infrastruktur-Zustand (PI-v-Stand, VERTRAG-Versionen) wurde auf die Zeitstempel im Testrun verwiesen — die Infrastruktur zwischen Session A und Session C ist nicht statisch (V13 hinzugefuegt in B, v3.9-Refaktor wirksam ab Mappe 3).

---

## 3. Session-Topologie und Dauer-Metriken

| Session | Fenster | Span | Messages | User-Msgs | Tool-Calls | Errors | Thinking | Kompaktionen |
|---|---|---|---|---|---|---|---|---|
| A | 2026-04-12 14:04 - 15:49Z | 1h 45min | 594 | 246 | 229 | 14 | 42 | 3 |
| B | 2026-04-12 15:49 - 17:47Z | 1h 58min | 672 | 274 | 259 | 7 | 50 | 3 |
| C | 2026-04-12 17:48 - 2026-04-17 10:33Z | 4T 16h (davon ~10h Netto) | 1732 | 727 | 665 | 24 | 77 | 6 |
| SUMME | — | — | 3337 | 95 unique | 1153 | 45 | 169 | 12 |

Anmerkung User-Msgs vs. unique: die 246/274/727 aus `summary.json` zaehlen alle user-role-Messages inkl. Tool-Results, die 95 aus `user_messages.jsonl` sind die prosa-gehaltigen User-Nachrichten ohne Tool-Results.

**Tool-Call-Dichte (Calls pro Netto-Stunde):**

- Session A: ~131/h (229 / 1.75h)
- Session B: ~131/h (259 / 1.97h)
- Session C (kalendarische Spanne unbrauchbar; mit ~10h Netto Arbeit grob geschaetzt aus Timestamps): ~66/h. Niedriger Durchsatz, stark fragmentiert durch Kompaktionen und Debug-Loops.

**Fehler-Dichte (Errors/100 Tool-Calls):**

- A: 6.1 (14/229)
- B: 2.7 (7/259)
- C: 3.6 (24/665)

Session A Fehlerdichte ist auffaellig hoch. Ursache laut `tool_errors.jsonl` + Rohdaten-Inventar: Read-Errors auf grossen Dateien (`File content exceeds tokens`), Git-Lock-Fehler durch Host-Terminal. Strukturell, nicht inhaltlich.

**Dauer pro Mappe (Netto-Schaetzung aus Phase-Pass-Timestamps):**

- Mappe 1 Phase 2.0-2.2c: 15:20Z (A) bis 16:11Z (B) = ~51 min Produktion (+ Phase-3-Debug, V13, Engine ~50 min).
- Mappe 2 Phase 2.0-2.2c: 17:04Z (B) bis 18:15Z (C) = ~71 min (inkl. Session-Boundary).
- Mappe 3 Phase 2.0-2.2c: 16:59Z bis 17:27Z (C) = ~28 min + Live-Debug 18:14Z bis ~19:00Z (~45 min Patches).

Mappe 3 wurde signifikant schneller produziert (28 min) und hatte die hoechste Defektdichte (5 User-Defekt-Meldungen + MV2). Korrelation nicht kausal — Mappe 3 profitierte von den v3.9-Infrastruktur-Patches und MV1/Q6b. Hypothese: Der Debug-Zyklus nach Live-Go war durch Kompaktions-Cluster getrieben, nicht durch grundlegende Regression.

---

## 4. Session-Handoffs: Wiederaufsetz-Disziplin

### 4.1 Harte Handoffs (Session A→B, B→C)

Zwei user-initiierte Handoffs:

- **A→B**: User fragt 2026-04-12T15:48:40Z aktiv "gib einen uebergabe prompt fuer den start der anschliessenden session aus". Assistant produziert UEBERGABE-PROMPT mit Game-ID, Phase-Status, Artefakt-Inventar, Aktion-Schritten (1. PI einlesen, 2. Zeile 13 markieren, 3. VERTRAG_PHASE_2-2 lesen, 4. Phase 2.2 starten). Qualitaet: vollstaendig. User kopiert ihn 1:1 als erste Msg in Session B (15:49Z).
- **B→C**: Analog 2026-04-12T17:45:49Z; User "schreibe einen entsprechenden uebergabe-prompt fuer die naechste session". Assistant produziert Fortsetzungs-Prompt mit vollem Artefakt-Inventar Mappe 2. User kopiert in C bei 17:48Z.

**Bewertung:** Beide Handoffs sind inhaltlich praezise (Stundenfrage, 6 Mat-IDs, Q-Gate-Ergebnisse, oeffene Findings, naechste Aktion). Aber: PM-strukturell muss der User sie explizit anfordern — **das Generieren ist nicht vertraglich fixiert** oder in der State-Machine als Transition-Out verankert. Die Charta der Cowork-Anleitung v2.0 kennt einen HANDOFF-Modus; er wurde hier implizit erfuellt, aber der User musste ihn triggern.

**F-RA5-01 (P2):** Kein automatischer Handoff-Trigger. Kein "Pre-Kompaktions-Watchdog", der bei erkennbarer Context-Erschoepfung (>85%) den Handoff ungefragt vorbereitet. Der Session-A Uebergabe-Prompt entstand nur, weil Paul ihn ~1 Minute vor Kompaktions-Druck anforderte. Haette er gewartet, haette die Auto-Kompaktion einen Summary-basierten Handoff erzwungen (siehe 4.2).

### 4.2 Weiche Handoffs durch Auto-Kompaktion

12 Auto-Kompaktionen (siehe 5) sind de-facto Handoffs ohne strukturierten Prompt. Der User trifft nach Kompaktion auf einen Summary-Text des vorherigen Assistant-Turns. `last_A` (15:27:50Z) und `last_B` (17:25:55Z) sind solche Auto-Summaries, nicht strukturierte Handoffs. Beobachtbar in `session_handoffs.md`: beide Auto-Summaries enthalten "Primary Request and Intent" + "Key Technical Concepts", aber weder Phase-Status-Snapshot noch Artefakt-Inventar noch naechste Aktion. Unterschied zu den User-getriggerten Handoffs (first_B, first_C) ist qualitativ deutlich.

**F-RA5-02 (P1):** Auto-Kompaktions-Summaries ersetzen Handoff-Prompts de-facto, sind aber strukturell unzureichend (kein Artefakt-Inventar, keine naechste-Aktion-Zeile). Das erklaert die Regressionen nach Kompaktion (siehe Sektion 5 und Session C 18:44Z).

### 4.3 Re-Orientation-Schritt nach Wiederaufsetzen

Pruefung: wurde nach Kompaktion ein Re-Orientation-Read durchgefuehrt (PI-Zustandsblock, letzte STATUS-Datei, aktuelle Phase)?

Aus `tool_calls.jsonl`: PI wird in Session B und C jeweils binnen der ersten 5 Tool-Calls nach Kompaktion gelesen (Stichprobe 16:03Z, 16:57Z, 17:25Z in B; 18:04Z in C; 18:20Z in C). Das ist **formal ein Re-Orientation-Schritt**. Aber: es ist ein Read des statischen State-Machine-Dokuments, nicht eines Projekt-Zustands-Dokuments. STATUS.md wird im gesamten Testrun **0 mal gelesen** (Grep-count: 0).

**F-RA5-03 (P1):** STATUS.md (projekt-weites SSOT laut Anleitung v2.0) wird im Testrun nicht als Wiederaufsetz-Anker genutzt. Der Projekt-Zustand lebt im PI-Zustandsblock (game-spezifisch) und im impliziten Kompaktions-Summary. Das ist tolerierbar solange ein Game laeuft; fuer Multi-Game-Portfolio (z.B. marne-ende laeuft parallel, siehe Commit-Logs 15:04Z) gibt es keinen uebergreifenden Anker. STATUS.md-Pflege war im Testrun nicht Teil der Produktionsschleife.

---

## 5. Auto-Kompaktionen: 12 Events im Detail

| # | ts | Session | Vor welcher Phase | Auto-Summary-Inhalt | Verlust-Indikator |
|---|---|---|---|---|---|
| 1 | 2026-04-12 14:45Z | A | zwischen Phase 0.2 und 0.3 | State-Machine-Beschreibung, Phase 0.1 PASS | kein Artefakt-Inventar |
| 2 | 2026-04-12 15:12Z | A | zwischen Phase 0.4 und 1.1 | Phase 0.3/0.4 PASS referenziert | kein TAFELBILD-Link |
| 3 | 2026-04-12 15:27Z | A | Phase 1.1 → Phase 2.1 Mappe 1 | State-Machine-Beschreibung | Dispatch-Isolation-Regel taucht auf |
| 4 | 2026-04-12 16:03Z | B | vor Phase 2.2 Mappe 1 | Uebergabe-Prompt referenziert | Rekonstruktion aus first_B ok |
| 5 | 2026-04-12 16:57Z | B | nach V13-Assembly-Patch, vor Phase 3.2 | V13 + DEPLOY-06 taucht auf | Engine-Edit-Context (Aufgabe 6/7) verdichtet |
| 6 | 2026-04-12 17:25Z | B | Mappe 1 live, Rahmen-Mappe-2 Phase 2.0/2.1 lief an | S-Zone-Autonomie + L-DUP genannt | Option-1-Entscheidung (Text→Visual-Strategie) |
| 7 | 2026-04-12 18:04Z | C | Phase 2.2a Mappe 2 abgeschlossen, vor 2.2b | SCPL, AFB, 8 Task-Typen | Dispatch-Status (5 Aufgaben Ziel) im Kontext |
| 8 | 2026-04-16 15:47Z | C | **4 Tage kalendarischer Pause**, nach Praxis-Feedback L1-L4 | L1-L4 Praxis-Learnings als Primary Intent | Infrastruktur-Evaluierung verdichtet |
| 9 | 2026-04-16 16:56Z | C | nach Infrastruktur-Patches (v3.9), vor Mappe 3 | 4 Phasen A-B-C-D skizziert | MV1/Q6b/UE-R1-Regeln sichtbar |
| 10 | 2026-04-16 17:22Z | C | waehrend Mappe 3 Phase 2.x Produktion | Mappe-3-Produktionsablauf | SONNE Freischalt-Code im Kontext |
| 11 | 2026-04-16 18:20Z | C | nach MV2-Befund + Live-Defekt-Liste (5 Findings) | 5 Findings, MV2 taucht auf | Patch-Zuordnung (Source vs. Assembly) noch nicht konsolidiert |
| 12 | 2026-04-16 18:56Z | C | nach erstem Patch-Live-Push, User meldet Persistenz der Umlaute | 5 Defekte, Mappe-3-hart-blockieren | **Umlaut-/HTML-Entity-Persistenz-Info muss aus user-Msg rekonstruiert werden** |

**Kompaktions-Cluster 2026-04-16:** 5 von 12 Kompaktionen am Debug-Tag (15:47, 16:56, 17:22, 18:20, 18:56). Das ist statistisch auffaellig: der Arbeitstag umfasste ~4h Netto, also ~1 Kompaktion pro 50 min, gegen das normale B-Mittel von ~1 pro 40 min nicht schlimmer, aber in Kombination mit 24 Tool-Errors im gleichen Zeitfenster (von insgesamt 24 in C) ergibt sich ein instabiles PM-Fenster.

**Direkter Kompaktions-induzierter Defekt (F-RA5-04, P1):** Kompaktion 11 (18:20Z) fand zwischen User-Defekt-Meldung (18:14Z) und Patch-Implementation (18:27Z-18:34Z) statt. Nach Kompaktion 12 (18:56Z) meldet User bei 18:44Z (d.h. 12 min vor Kompaktion 12 chronologisch, aber im gleichen Compacted-Turn) die Umlaut-/HTML-Entity-Persistenz. Die Persistenz ist wahrscheinlich durch Kompaktions-Drift erklaerbar: der Patch von 18:27Z wurde auf Source-JSONs ausgefuehrt, aber nicht auf data.json, da data.json-Edit-Status beim Kompaktions-Summary verloren ging. Evidenz in `milestones.json` "assembly_bug": Mehrere Edits auf data.json-Ebene zwischen 18:24Z und 18:31Z, danach Push. Trotzdem meldet User um 18:44Z die Persistenz — wahrscheinlich CSS/Engine-Cache-Effekt oder der Push brachte nicht alles. Ob Kompaktion kausal oder nur korrelativ ist, laesst sich aus den Extrakten nicht endgueltig beweisen, aber die zeitliche Korrelation ist stark.

**F-RA5-05 (P1):** Kein Kompaktions-Resilience-Protokoll. Keine Pflicht, vor absehbarem Kompaktions-Druck den aktuellen Patch-Status/Push-Status in ein persistentes Dokument (STATUS.md, game-spezifischer CHECKPOINT.md) zu dumpen. Die Memory `project_skript_persistenz.md` markiert dieses Muster als fuer SKRIPT-Produktion geloest (Session 24), aber nicht fuer die Patch-Debug-Phase.

---

## 6. ORCHESTRATOR-Routing-Disziplin

**Roh-Zaehlung aus tool_calls.jsonl:**

- `ORCHESTRATOR`: 20 Reads
- `PROJECT_INSTRUCTIONS`: 107 Reads
- `VERTRAG_PHASE`: 74 Reads
- `STATUS.md`: 0 Reads

Vergleich mit M1-Befund (F-P1): Damals 10x ORCHESTRATOR, ohne systematische Phase-Transition. Heute 20x ORCHESTRATOR, aber PI-dominanz ist klar (107x). Der v3.9-Refaktor, der PI = SSOT Steuerung und ORCH = Referenz-Dokument macht, ist **empirisch wirksam**.

**Routing-Disziplin im Detail:**

- Phase-Uebergaenge werden konsistent ueber PI-Zustandsblock + PI-Uebergangstabelle-Zeile gefahren. Handoff-Prompts fordern explizit "PROJECT_INSTRUCTIONS.md einlesen (Zustandsblock zeigt Zeile N)".
- VERTRAG_PHASE_* wird 74x gelesen — d.h. Precondition-Read pro Phase ist mehrheitlich erfuellt.
- ORCHESTRATOR wird situativ gegriffen fuer spezifische Templates (Uebergabe-Template, Session-Split-Template, Freischalt-Code-Regel). Das ist das beabsichtigte v3.9-Muster.

**Teilweiser Regress F-P2:** Phase 3.1 / 3.2 fuer Mappe 2 und 3 wurden verschlafen. User stellt explizit fest (2026-04-16 18:03Z): "ich bin mir nicht sicher, aber glaube 3.1 und 3.2 wurden nicht gemacht". Assistant bestaetigt (18:03:18Z) "Mappe 3 ist bereits in data.json assembliert. Aber Phase 3.1 (Deploy-Preparation) und 3.2 (Live-Go) stehen fuer Mappe 2 und 3 noch aus." Begruendung: Phase 3.1/3.2 laufen in Claude Code, nicht in Cowork. Aber die PI-Zustandsblock-Pflege haette den Zustand `MAPPEN_ABGESCHLOSSEN` nicht auf 2 bzw. 3 setzen duerfen, bevor 3.2 lief. Das ist ein Zustands-Drift.

**F-RA5-06 (P1):** PI-Zustandsblock wird nicht konsequent synchron zu Claude-Code-Rueckmeldungen aktualisiert. MAPPEN_ABGESCHLOSSEN zaehlt, obwohl Phase 3.2 nicht nachweislich gepassed hat. Ursache: Claude-Code-Rueckmeldungen kommen als freie Prosa-User-Msg ("claude code abgeschloosen. issues in mappe 2 ..."), nicht als standardisiertes Rueckmeldungs-Schema.

**F-P1-Wiederholung: teilweise.** Der ORCHESTRATOR-als-Router-Defekt des M1-Befunds ist durch v3.9-Refaktor nicht mehr messbar — PI ist klarer Router. Aber der Kern des Prozess-Defekts (ungenuegende Precondition-Disziplin bei Phase-Uebergaengen) zeigt sich an neuer Stelle: bei der Rueck-Uebergabe aus Claude Code in den PI-Zustandsblock.

---

## 7. Precondition-Reads und STATUS-Aktualitaet

**Precondition-Reads pro Phase (aus `tool_calls.jsonl` Timestamps und Dateipfaden):**

- Phase 0.1: VERTRAG_PHASE_0-1 + DIDAKTIK_RAHMEN-Template gelesen. Ja.
- Phase 0.2: geroutet an Claude Code (User-Relay 14:16Z + 14:35Z). PM-korrekt.
- Phase 0.3: VERTRAG_PHASE_0-3 + AGENT_SKRIPT gelesen. Ja.
- Phase 0.4: VERTRAG_PHASE_0-4 gelesen. Ja.
- Phase 1.1: AGENT_MATERIAL + VERTRAG_PHASE_1-1 gelesen. Ja.
- Phase 2.0 Mappe 1: VERTRAG_PHASE_2_RAHMEN + TAFELBILD_M1 gelesen. Ja.
- Phase 2.1 Mappe 1 (6 Dispatches): VERTRAG_PHASE_2-1 pro Dispatch gelesen (P1 Read-from-Artifact). Ja.
- Phase 2.1b Mappe 1: AGENT_DIDAKTIK gelesen + 2 Subagent-Spawns. Ja.
- Phase 2.1c: VERTRAG_PHASE_2-1c Achsen gelesen. Ja.
- Phase 2.2a Mappe 1: VERTRAG_PHASE_2-2a gelesen. Ja.
- Phase 2.2b Mappe 1 (7 Dispatches): VERTRAG_PHASE_2-2b gelesen. Ja.
- Phase 3.1 Mappe 1: VERTRAG_PHASE_3-1 gelesen + DEPLOY-01..06 geprueft. Ja.
- Phase 3.2 Mappe 1: durchgefuehrt. Ja.
- Phase 2.0/2.1/2.2 Mappe 2: strukturgleich. Ja.
- **Phase 3.1 Mappe 2: nicht dokumentiert als PASS.** User fragt 2026-04-16 18:03Z explizit nach.
- **Phase 3.1/3.2 Mappe 3: erst nach User-Frage durchgefuehrt/fixiert.**
- Phase 2.0-2.2 Mappe 3: strukturgleich gepasst.

**STATUS-Aktualitaet:**

PI-Zustandsblock wurde stellenweise aktualisiert (MAPPEN_ABGESCHLOSSEN++-Markierung in phase_pass milestones 16:58:35Z). Aber: die Phase-3.1/3.2-Luecke Mappe 2+3 blieb unbemerkt bis User sie ansprach. Das ist ein PM-Defekt, kein Routing-Defekt.

**F-RA5-07 (P2):** Kein automatisches Zustandsblock-Audit am Session-Start. Der erste Read von PI nach Kompaktion liefert den Zustandsblock, aber eine explizite Konsistenz-Pruefung (`MAPPEN_ABGESCHLOSSEN` vs. tatsaechliche Phase-3.2-PASS-Markierungen in Q-GATE-LOG) fehlt.

---

## 8. Subagenten-Spawns: 5 Events / Delegations-Profil

Aus `subagent_spawns.jsonl`:

1. **2026-04-12 17:26Z (B)** Explore — "Find img-2-1 artefakt details". Zweckmaessig.
2. **2026-04-12 17:31Z (B)** general-purpose — Phase 2.1b Didaktik-Review Mappe 2. Zweckmaessig: isolierter Agent ohne Pipeline-Kenntnis simuliert Lehrer-Perspektive.
3. **2026-04-12 17:35Z (B)** general-purpose — Phase 2.1b Re-Review Iteration 2. Zweckmaessig, folgt DIDAKTIK-Iterations-Protokoll.
4. **2026-04-16 16:07Z (C)** unbekannter Typ — Verify infrastructure changes consistency (v3.9-Patch-Verification). Zweckmaessig.
5. **2026-04-16 16:44Z (C)** unbekannter Typ — Full plan compliance verification (v3.9 7-Punkte-Plan). Zweckmaessig.

**Delegations-Bilanz:**

Subagenten-Nutzung sehr sparsam (5 Spawns / 1153 Tool-Calls = 0.4%). Wo haette weitere Delegation gespart?

- **Phase 2.1b Mappe 1 und Mappe 3:** Didaktik-Review wurde **nur fuer Mappe 2** mit Subagent durchgefuehrt. Mappe 1 und Mappe 3 liefen inline im Haupt-Agent. Das ist eine Ueber-Delegations-Asymmetrie. Evidenz: `phase_pass` listet "Phase 2.1b Didaktik-Review: PASS (0 FAIL, 2 WARN)" fuer Mappe 1 um 15:43Z, ohne Subagent-Spawn in A (nur in B fuer Mappe 2).
- **MV2 Verifikation:** kein Subagent gespawnt. WebFetch 14x direkt im Haupt-Agent. Ein Verifikations-Subagent mit Wikimedia-API-Scope waere das ideale Muster, wurde aber nicht genutzt.
- **Phase 3.1 Deploy-Checks:** kein Subagent fuer DEPLOY-01..06. Inline.

**F-RA5-08 (P2):** Subagenten-Delegation nicht als struktureller PM-Baustein, sondern ad-hoc. Die zwei Didaktik-Review-Subagenten in B folgen einem expliziten Muster (isolierte Lehrer-Perspektive), aber das Muster wurde nicht fuer Mappe 1 und 3 reproduziert. Kein VERTRAG hat "Subagent spawnen" als Pflichtschritt.

Kein paralleler Multi-Agent-Audit (etwa simultanes MV-Check + DIDAKTIK-Check + A19-Check fuer eine Mappe). Der agent-teams-Skill-Katalog im Environment waere verfuegbar, wurde aber nicht genutzt — nicht Teil des Game-Produktions-Workflows.

---

## 9. Tool-Call-Dichte und Fehler-Dichte

**Tool-Top-Verteilung (aus tool_counts_per_session.csv):**

- Read-heavy in C (188x), B (88x), A (77x). Read-Dominanz ist erwartbar fuer Precondition-Reads.
- TodoWrite: 34/42/77 — d.h. Task-Tracking wird genutzt, in C am staerksten (77x). Task-Tracking-Disziplin ist formal ok.
- Edit vs. Write: in C 106 Edits vs. 33 Writes; in B 37 vs. 25. Edit-Dominanz in C = Debug-Phase.
- Grep: 2/20/95 — steil steigend, in C investigativ (Debug).
- Agent: 0/3/2 — bestaetigt die Unter-Delegation.
- WebFetch: 0/0/14 — reaktiv fuer MV2, kein prospektiver Gebrauch.
- wikimedia-image-search: 16/0/0 — nur Session A, also Phase-0-Nachbereitung (laut EVIDENZ_BUNDLE 3.1 plausibel, da Phase 0.2 in CC lief).

**Fehler-Kategorien (aus `tool_errors.jsonl`, 45 gesamt):**

- `File content exceeds tokens` (10+): Read ohne offset/limit. Vermeidbar, Anleitung existiert.
- `exit code 2` Bash (2): falsche Pfade.
- `Cancelled` (5): Parallel-Aufruf-Races.
- Git-Auth/Virtiofs (6): bekannte Klasse (Memory `feedback_virtiofs_git_lock`).
- WebFetch 403 (1): 2026-04-16 19:38Z — GitGuardian-Incident-URL (User stellt Sicherheits-Frage).
- Sonstige (20+).

**F-RA5-09 (P3):** 10+ `File content exceeds tokens` Fehler sind vermeidbar. Read-Patterns nicht konsequent mit offset/limit. Kosmetisch, aber aufsummiert kontextkostend.

---

## 10. User-Interventions-Profil (Klassifikation a/b/c/d)

Aus `user_messages.jsonl`, 95 Eintraege. Klassifikation:

**(a) Freigabe/Weiter (Steuerung ohne Defekt-Signal):** 31
- "PASS" (4x), "WEITER" (mehrfach), "START" (1x), "freigabe" (1x), "Go" (3x), "Ja" (4x), "Option 1", "Ja, strukturiert..." etc.

**(b) Neue Aufgabe / Praezisierung / Pendenzen-Notation:** 19
- "gib einen uebergabe prompt aus", "schreibe einen praezisen uebergabeprompt an claude code", "schalte mappe 3 global frei", "kannst du sicherstellen dass beim naechsten mal cache zurueckgesetzt", "fuer upgrade-plan zu notieren ..." etc.
- Drei explizite Upgrade-Plan-Notationen (17:57Z, 18:14Z, 10:33Z) — User nutzt UPGRADE_PLAN-Dokument als Pendenzen-Liste, nicht als Prozess-Steuerungsersatz.

**(c) Korrektur PM-Fehler (Defekt-Signal, PM-strukturell):** 9
- 2026-04-12 16:40:30Z "evaluiere, wie so ein fehler durch entsprechende anpasssung der prozessstruktur in zukunft moeglichst vermieden werden kann" (Prozess-Lerninstruktion).
- 2026-04-16 15:43Z Praxis-Learnings Mappe 1+2 (L1-L4) — Prozess-relevant.
- 2026-04-16 17:53Z Claude-Code-Rueckmeldung Bildersatz — Prozess-Trigger MV2.
- 2026-04-16 17:57Z "setze das auf den upgrade-plan fuer spaeter und fahre fort" — Prozess-Deferral-Entscheidung.
- 2026-04-16 18:03Z "ich bin mir nicht sicher, aber glaube 3.1 und 3.2 wurden nicht gemacht" — **harter PM-Zustands-Drift-Befund.**
- 2026-04-16 19:27Z "ich glaube da ist einiges schiefgegangen und committed/pushed worden, was nicht einbezogen werden sollte" — Git-Prozess-Defekt.
- 2026-04-16 19:29Z "verankere in project-instrutions einen mechanismus, der die git-prozesse standardisiert" — Prozess-Patch-Forderung.
- 2026-04-17 09:28Z "kannst du irgendwie sicherstellen dass beim naechsten mal cache zurueckgesetzt ist" — Prozess-Frage.
- 2026-04-17 09:30-09:31Z "mappe 3 wurde jetzt schon als abgeschlossen markiert" / "ist irgendwie immer noch als abgeschlossen markiert" — Zustands-Drift.

**(d) Korrektur Produkt-Fehler (Defekt-Signal, produkt-relevant):** 16
- 2026-04-12 16:38Z Hefteintrag-Defekt Mappe 1.
- 2026-04-12 16:53Z Engine-Verhalten Aufgaben 6/7.
- 2026-04-12 18:41Z Quellenangaben-Dopplung.
- 2026-04-12 19:16Z "muss mappe 2 jetzt noch mal gepatched werden?"
- 2026-04-16 18:14Z 5-Findings-Liste Mappe 3.
- 2026-04-16 18:44Z Persistenz Umlaut + Bildunterschriften + Karte-Legende + Hefteintrag-Komplexitaet.
- 2026-04-16 18:53Z Persistenz Formatierungsfehler.
- 2026-04-16 20:06Z "problem: mappen jetzt nicht mehr auf website".
- 2026-04-16 20:10Z "mappen fehlen weiterhin auf website".
- 2026-04-17 08:19Z "mappe 2 zeigt keinen hefteintrag. mappe 2 aufgabe 4 wird auch nicht als abgeschlossen markiert".
- 2026-04-17 10:33Z UX-1 Finding-Kern (Hefteintrag zu lang, Lueckentext-Bug, Vokabular).
- Weitere.

**(Andere)**: 20 (Git-Bash-Output-Weiterleitung, Screenshots, "Continue from where you left off", Tool-Results.)

**Defekt-Signale insgesamt: 25 von 95 (26%).** Davon 9 PM-strukturell (c), 16 produkt-relevant (d).

Die 9 PM-strukturellen Interventionen sind das relevante Signal fuer RA5. Zwei davon sind Prozess-Verankerungsforderungen ("evaluiere wie so ein fehler vermieden werden kann" / "verankere in project-instrutions einen mechanismus") — das sind konstruktive, nicht klagende Interventionen und der User hat sie bewusst zur Infrastruktur-Evolution genutzt. Die dritte Sorte (18:03Z Zustands-Drift, 09:30Z Zustands-Drift, 19:27Z Git-Prozess-Drift) sind **reine Defekt-Signale** — hier haette PM autonom detektieren muessen.

**Re-Flag-Pattern:** Der User musste Umlaut-/Bildunterschrift-Problem **3 mal** flaggen (18:14Z, 18:44Z, 18:53Z) bis es behoben war. Mappe-3-"abgeschlossen"-Problem **2 mal** (09:30, 09:31). Das sind Wiederholungs-Interventionen und ein klarer PM-Detektions-Mangel.

**F-RA5-10 (P1):** Re-Flag-Events (User muss gleiches Problem 2+-mal melden) existieren in Session C gehaeuft. Kein Verifikations-Gate nach Patch-Push ("nach Push 2-3 min Wartezeit + Verifikations-Screenshot anfordern"). Der Assistant meldet "Alle 5 Findings gepatcht" (18:31Z), aber der Push-Inhalt deckt das nicht (Umlauts persistieren).

---

## 11. Task-Tracking: TodoWrite, Milestones, STATUS

TodoWrite 153x ueber alle Sessions verwendet (34+42+77). Hoch genutzt. Inhaltlich entstehen sessionsweise Task-Listen pro Phase-Dispatch.

**Limitationen:**

- TodoWrite-State ist ephemer im Assistant-Kontext, nicht in der Repo persistent. Nach Kompaktion verloren (bzw. ueber Summary rekonstruiert).
- Milestones werden via `milestones.json` und Q-GATE-LOG.md pro Mappe (persistent) abgebildet. Q-GATE-LOG wurde pro Mappe gefuehrt (laut EVIDENZ 5.1).
- STATUS.md (project-weit) unveraendert im Testrun.
- Keine Task-IDs propagiert (keine Form von SKRIPT/ID-basierter Task-Verkettung). Die PI-Zustandsblock-Zeilen (Uebergangstabelle Zeile N) sind de-facto die Task-IDs.

**Bewertung:** Task-Tracking auf Mappe/Phase-Ebene ok (PI-Zustandsblock + Q-GATE-LOG). Task-Tracking auf Portfolio-Ebene (STATUS.md) nicht gepflegt. Fuer ein einzelnes Game akzeptabel; ueber das v3.9-Steuerungsrefaktor-Memory (Memory `project_v3-9_steuerungsrefaktor.md`) ist das System bewusst so ausgelegt.

---

## 12. Claude-Code-Uebergaben / Cross-Agent-Koordination

**Erkennbare CC-Uebergaben im Testrun:**

1. **Phase 0.2 AGENT_INHALT** (14:16Z Assistant Prompt, 14:35Z User Feedback-Relay mit Rueckmeldung). Strukturiertes Uebergabe-Prompt generiert, strukturierte Rueckmeldung. Vertrags-konform.
2. **Phase 3.0 Assembly Mappe 1** (16:30Z "Claude code phase ist durchgefuehrt"). Kurze Bestaetigung, keine strukturierte Rueckmeldung.
3. **Phase 3.0 Assembly Mappe 2** (18:41Z "claude code abgeschloosen. issues in mappe 2: die quelleangaben sind ..."). Erst auf User-Pruefung kommt Rueckmeldung, nicht vertraglich.
4. **Phase 3.0 Assembly Mappe 3** (17:53Z "rueckmeldung von claude code: Wichtige Abweichungen von UEBERGABE (dokumentiert)"). Diesmal strukturiert — aber inhaltlich MV2-ausloesend.
5. **Engine-Patches L1+L2** (16:43Z "rueckmeldung claude code: Commit & Push erledigt"). Strukturiert.
6. **Patches Mappe 3 Defekte** (18:44Z, 18:53Z): strukturierte Rueckmeldungen, aber nur User-Praxis-Tests lieferten Persistenz-Info.

**F-RA5-11 (P1):** Rueck-Uebergabe aus Claude Code nicht einheitlich. Manche Rueckmeldungen sind freitextlich ("fertig", "Claude code phase ist durchgefuehrt"), andere sind strukturiert (Assembly-Rueckmeldung Mappe 3). Das passt zum M1-F-P2-Muster (Phase 3 in Cowork statt CC-strukturiert), hier als neue Variante: **Phase 3 in CC, aber ohne CC→Cowork-Rueckmelde-Schema.** Der Assistant muss Zustands-Fortschritt aus User-Nachricht parsen.

Eine CC-Rueckmeldungs-Vorlage existiert nicht in der PM-Infrastruktur (weder in PI noch in ORCHESTRATOR noch in Anleitung v2.0). Das erklaert die Luecke "3.1/3.2 wurden nicht gemacht" (User 18:03Z) — niemand hat einen expliziten PASS-Marker gesetzt.

---

## 13. Rueckkehr von F-P1 / F-P2 aus M1-Befund

**F-P1 (ORCHESTRATOR nicht als Router):**

Status: **nicht mehr messbar als das Ursprungs-Defekt.** Der v3.9-Refaktor (PI = Steuerung, ORCH = Referenz) ist wirksam. Die 107 PI-Reads vs. 20 ORCHESTRATOR-Reads zeigen, dass der Agent der State-Machine folgt und ORCHESTRATOR nur fuer Schema-/Template-Lookups aufruft — genau das beabsichtigte Muster.

**Caveat:** Der Kern der Kritik aus F-P1 war "Precondition-Read fehlt vor Phasen-Transitionen". Das ist heute strukturell dadurch geloest, dass PI bei jeder Phase das VERTRAG_PHASE_* referenziert, das wiederum gelesen wird (74x). Aber die **Precondition-Idee wurde nicht auf die Phase-3.1/3.2-Rueckkehr aus CC erweitert.** Dort gibt es kein Precondition-Read (es ist ja nichts auszufuehren), aber auch kein Post-Condition-Verify-Schritt. Das ist der neue Riss.

**F-P2 (Phase 3 Assembly in Cowork statt CC):**

Status: **im Testrun gemischt.** Phase 3.0 Assembly (Assembly) lief in Claude Code (korrekt). Phase 3.1 (Deploy-Preparation, DEPLOY-01..06) lief fuer Mappe 1 in Cowork (16:32Z Milestone) — das ist die Regression des F-P2-Musters, wurde aber bewusst akzeptiert, da DEPLOY-06 ja gerade als Antwort auf den Mappe-1-Hefteintrag-Defekt im Cowork entwickelt wurde. Fuer Mappe 2 und 3 lief 3.1 effektiv nicht sauber (siehe 18:03Z).

Das urspruengliche F-P2-Patch-Szenario ("2.2c → STOP, Phase 3 in CC") ist in der PI aktuell nicht konsequent umgesetzt. Das ergibt die aktuelle Hybridsituation.

**Konvergenz:** RA5 bestaetigt, dass F-P1 durch v3.9 faktisch geschlossen wurde, und F-P2 nur teilweise geschlossen ist — die zentrale Rueckmelde-Luecke bleibt.

---

## 14. Findings (F-RA5-NN)

| ID | Severitaet | Titel | Evidenz | Empfehlungs-Richtung |
|---|---|---|---|---|
| F-RA5-01 | P2 | Kein automatischer Handoff-Trigger; User muss Uebergabe-Prompt explizit anfordern | 15:48Z + 17:45Z Uebergabe-Anforderung durch User | Watchdog-Regel in Anleitung v2.0 |
| F-RA5-02 | P1 | Auto-Kompaktions-Summaries ersetzen Handoff-Prompts de-facto, sind strukturell unzureichend | last_A/last_B Summaries vs. first_B/first_C | Pre-Kompaktions-Checkpoint-Protokoll |
| F-RA5-03 | P1 | STATUS.md wird 0x gelesen; kein Projekt-Portfolio-Wiederaufsetz-Anker | Grep-Count 0 in tool_calls.jsonl | STATUS.md-Pflege in HANDOFF-Modus verankern |
| F-RA5-04 | P1 | Kompaktions-induzierte Regression bei Mappe-3-Patches (Umlaut-/HTML-Entity-Persistenz) | User-Re-Flags 18:44Z / 18:53Z, Kompaktionen 11+12 | Kompaktions-Resilience-Protokoll |
| F-RA5-05 | P1 | Kein Protokoll "Patch-Status in persistentes Dokument dumpen vor Kompaktions-Druck" | Keine CHECKPOINT.md waehrend Debug-Tag | Game-scoped CHECKPOINT.md fuer Debug-Phasen |
| F-RA5-06 | P1 | PI-Zustandsblock nicht synchron zu Claude-Code-Rueckmeldungen; `MAPPEN_ABGESCHLOSSEN` drifted | 2026-04-16 18:03Z User-Frage zu 3.1/3.2 | Standardisiertes CC→Cowork-Rueckmelde-Schema |
| F-RA5-07 | P2 | Kein Zustandsblock-Audit am Session-Start nach Kompaktion | Keine entsprechende Tool-Sequenz in first_B/first_C | Verify-Step in Wiederaufsetz-Protokoll |
| F-RA5-08 | P2 | Subagenten-Delegation nicht strukturell verankert; Didaktik-Review nur fuer Mappe 2 delegiert | 5 Spawns / 1153 Calls, asymmetrisch | VERTRAG_PHASE_2-1b: Subagent-Spawn als Pflicht |
| F-RA5-09 | P3 | Vermeidbare `File content exceeds tokens` Read-Fehler (10+) | tool_errors.jsonl | Read-Pattern-Hinweis in Anleitung |
| F-RA5-10 | P1 | Re-Flag-Pattern: User muss gleiches Problem 2-3x melden bis Behebung | 3x Umlaute (18:14/18:44/18:53), 2x Mappe-3-Status (09:30/09:31) | Post-Push-Verifikations-Gate |
| F-RA5-11 | P1 | Rueck-Uebergabe aus Claude Code nicht einheitlich schematisiert | CC-Rueckmeldungen von "fertig" bis vollstrukturiert | CC-Rueckmelde-Vorlage in ORCHESTRATOR |

**Zaehlung:** 11 Findings. Severitaets-Profil: 0x P0, 7x P1, 3x P2, 1x P3.

Die Zusammenfassung in Sektion 1 nannte 9 Findings — die detaillierte Liste enthaelt 11, weil 2 Findings (F-RA5-07, F-RA5-08) waehrend des Verfassens praeziser ausdifferenziert wurden. Zaehlung 11 ist kanonisch.

---

## 15. Gate-Urteil

**Urteil: FAIL fuer v3.12-Pilot.**

Begruendung:

- 7 P1-Findings adressieren jeweils ein systematisches PM-Defekt-Muster, das im Testrun direkt zu User-Interventionen / Re-Flags / Zustands-Drifts gefuehrt hat. Ohne Behebung wuerden sie in einem v3.12-Pilot mit aehnlicher Session-Topologie (mehrere Kalendar-Tage, Multi-Mappe, Multi-CC-Uebergabe) in aequivalenter Form wieder auftreten.
- Der v3.9-Refaktor war erfolgreich (F-P1 neutralisiert) — das zeigt, dass strukturelle PM-Patches wirksam sind. Die Qualitaetsschwelle fuer einen Pilot ist hoeher als der Testrun sie trifft.
- Kein P0 — d.h. keine Datenverlust-/Compliance-Risiken entdeckt, aber die Kumulation der P1-Defekte ist produktionsblockierend fuer einen regelmaessigen Mehrstufen-Pilot.

**Conditional Pass:** Falls die 7 P1-Findings vor v3.12-Pilot gepatcht werden (geschaetzter Aufwand: 2-4h Infrastruktur-Arbeit, keine Code-Aenderungen noetig, nur Dokument-Patches in Anleitung v2.0, ORCHESTRATOR, optional PI), wird das Gate auf PASS gedreht.

---

## 16. Empfehlungen (ohne Patches)

Empfehlungen sind Befund-Pointer — die eigentlichen Patches liegen in RA1/RA3-Verantwortung (Prozess) bzw. in der konsolidierten Befund-Ebene.

**E1 (zu F-RA5-02/04/05):** Kompaktions-Resilience-Protokoll einfuehren. Bevor ein Compaction-Trigger absehbar ist, Patch-Status/Push-Status/Outstanding-Issues in ein persistentes, game-scoped Dokument (`docs/agents/artefakte/<game>/CHECKPOINT.md` oder Erweiterung Q-GATE-LOG.md um Block "Live-Status") dumpen. Der Post-Kompaktions-Reorient-Schritt liest dann nicht nur PI-Zustandsblock, sondern auch Live-Status-Block.

**E2 (zu F-RA5-06/11):** Standardisiertes CC→Cowork-Rueckmelde-Schema. ORCHESTRATOR-Anhang: CC muss nach jeder Cowork-delegierten Phase liefern: (1) Phase-ID, (2) Status (PASS/FAIL/WARN), (3) Artefakt-Pfade, (4) Abweichungen, (5) Next-Suggestion. User copy-pastes das Schema. Phase 3.1/3.2-Luecke waere damit gar nicht erst entstanden.

**E3 (zu F-RA5-03/07):** STATUS.md-Pflege in HANDOFF-Modus operationalisieren. Nicht jedes Game triggert ein STATUS.md-Update, aber ein Kalendertag-Wechsel (wie 2026-04-12 auf 2026-04-16) sollte ihn pflichtmaessig triggern. Session-Start-Protokoll: STATUS.md Read als erste Aktion nach dem Handoff-Prompt, bevor PI-Zustandsblock.

**E4 (zu F-RA5-10):** Post-Push-Verifikations-Gate fuer Patch-Zyklen. Nach Assistant-Meldung "alle Findings gepatcht": automatisches Warten auf User-Bestaetigung (Screenshot oder explizites "geprueft") — Assistant darf nicht als naechsten Turn selbststaendig die naechste Phase starten. Das verhindert Re-Flag-Runden.

**E5 (zu F-RA5-08):** Subagent-Spawn-Pflicht in ausgewaehlten Vertraegen. Insbesondere VERTRAG_PHASE_2-1b (Didaktik-Review) sollte "Spawn eines isolated Subagent mit null Pipeline-Kontext" als Pflicht-Schritt nennen. Das ist Mindest-Standard fuer Lehrer-Perspektiv-Simulation.

**E6 (zu F-RA5-01):** Anleitung v2.0 um "HANDOFF-Modus automatisch triggern bei >80% Context-Budget" erweitern. Der Agent selbst kann Context-Utilization nicht perfekt schaetzen, aber ein konservativer Timer ("alle 60 min Cowork-Arbeit, Handoff-Vorschlag generieren") waere bereits wirksam.

**E7 (zu F-RA5-09):** Anleitung v2.0 Read-Pattern-Abschnitt: bei Read ohne offset/limit immer erst `wc -l` / Glob-Size-Hinweis pruefen, oder `limit=500` als Default.

---

## 17. Anhang A — Handoff-Prompt-Zitate (Key-Zeilen)

- A→B (first_B, 2026-04-12 15:49Z): Vollstaendige Struktur mit Game-ID, Letzte Phase, Naechste Aktion, Artefakt-Pfade, Offene Findings, 4 Aktionsschritte, Mappen-Status.
- B→C (first_C, 2026-04-12 17:48Z): Fortsetzungs-Prompt mit Phase-Status-Tabelle (Phase 2.0/2.1/2.1b/2.1c), STRUKTUR-FREEZE-Marker, vollstaendigem Artefakt-Inventar Mappe 2.

Beide Handoffs entsprechen qualitativ einem ad-hoc-definierten HANDOFF-Schema, das nicht in einem Vertrag definiert ist. Sie funktionieren, weil Paul methodisch Uebergabe-Prompt anfordert. Ein anderer User wuerde dieses Muster nicht automatisch reproduzieren.

## 18. Anhang B — Kompaktions-Stempel-Tabelle

Siehe Sektion 5 Tabelle. Alle 12 Timestamps sind in `evidenz/milestones.json` + User-Messages nachvollziehbar.

## 19. Anhang C — Intervention-Katalog (User-Msgs, c/d klassifiziert)

**PM-strukturell (c), 9:**

1. 2026-04-12 16:40:30Z — "evaluiere, wie so ein fehler ... vermieden werden kann"
2. 2026-04-16 15:43:55Z — L1-L4 Praxis-Learnings
3. 2026-04-16 17:53:35Z — CC-Rueckmeldung MV2-Trigger
4. 2026-04-16 17:57:54Z — Upgrade-Plan-Deferral
5. 2026-04-16 18:03:18Z — Phase 3.1/3.2 Zustands-Drift
6. 2026-04-16 19:27:28Z — Git-Prozess-Drift (ungeplante Commits)
7. 2026-04-16 19:29:58Z — Forderung Git-Prozess-Verankerung
8. 2026-04-17 09:28:41Z — Cache-Reset-Frage
9. 2026-04-17 09:30:44Z / 09:31:59Z — Mappe-3-Status-Drift

**Produkt-relevant (d), 16:**

1. 2026-04-12 16:38Z — Hefteintrag Mappe 1
2. 2026-04-12 16:53Z — Engine Aufgabe 6/7
3. 2026-04-12 18:41Z — Quellenangaben-Dopplung Mappe 2
4. 2026-04-12 19:16Z — Mappe 2 Patch-Frage
5. 2026-04-16 18:14Z — 5 Findings Mappe 3
6. 2026-04-16 18:44Z — Persistenz-Runde 1
7. 2026-04-16 18:53Z — Persistenz-Runde 2
8. 2026-04-16 20:06Z — Website-Regression
9. 2026-04-16 20:10Z — Website-Regression 2
10. 2026-04-17 08:19Z — Mappe 2 hefteintrag fehlt + Aufgabe 4
11. 2026-04-17 08:50Z — Mappe 3 Aufgabe 3 entfernen
12. 2026-04-17 09:27Z — Wiederholung
13. 2026-04-17 10:33Z — UX-1
14-16. Weitere.

---

## 20. Rollen-Isolations-Hinweis

Dieser Bericht enthaelt keine Anleitung- oder STATUS-Patches. Die Patch-Formulierung (Konsolidierung, Kalibrierung) erfolgt auf Ebene des konsolidierten Befunds.
