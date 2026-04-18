# EVIDENZ_BUNDLE: Testrun `deutscher-nationalismus-kolonialismus`

**Zweck:** Vor-Sichtung + strukturierte Extrakte fuer die RA1-RA5 Subagenten. Ohne dieses Bundle muessten die RAs 15.8 MB JSONL selbst verarbeiten. Das Bundle komprimiert die Forensik auf navigierbare Einzel-Artefakte.

**Bearbeiter:** PM-Cowork (AUDIT-Modus) 2026-04-18.

---

## 1. Rohdaten-Inventar

| Session | Datei | Lines | Erste Nachricht | Letzte Nachricht | Span | Messages |
|---|---|---|---|---|---|---|
| A | session-export-1776530855635/50c63de7...jsonl | 647 | 2026-04-12T14:04Z | 2026-04-12T15:49Z | 1h 45min | 594 |
| B | session-export-1776530867968/5f831ba4...jsonl | 716 | 2026-04-12T15:49Z | 2026-04-12T17:47Z | 1h 58min | 672 |
| C | session-export-1776530819814/79320e70...jsonl | 1974 | 2026-04-12T17:48Z | 2026-04-17T10:33Z | 4 Tage 16h | 1732 |

**Session A:** Phase 0.1 (DIDAKTIK_RAHMEN) bis Phase 0.4 (TAFELBILDs), beginnt Phase 1.1 Mappe 1 Materialgeruest. Token-intensive Phase 0.2 (AGENT_INHALT) wurde korrekt an Claude Code delegiert (einziges CC-Feedback-Relay).
**Session B:** Phase 1.1 fortsetzung bis Phase 2.1c Mappe 1. Innerhalb Session B: V13-Patch (Assembly-Hefteintrag-Verschachtelung) nach User-Befund zum Rendering-Defekt Mappe 1.
**Session C:** Mappe 2 Phase 2.2 Start bis Ende-Testrun. Mappe 2 Produktion + Mappe 3 Produktion + Mappe 3 Live-Debugging + MV2 Medien-Befund + drei User-Upgrade-Plan-Notationen. Session C ist tatsaechlich 5 Tage kalendarisch ueber mehrere Arbeitssitzungen, nicht durchgehend produziert.

---

## 2. Extrakt-Dateien (`evidenz/`)

| Datei | Inhalt | Nutzung durch RAs |
|---|---|---|
| `summary.json` | Aggregat-Metriken je Session (Messages, Tool-Counts, Errors, Thinking-Blocks, Span) | Alle |
| `timeline.csv` | Alle Events chronologisch: ts, session, event, summary | RA1 (Prozess-Chronologie), RA5 |
| `user_messages.jsonl` | 95 User-Nachrichten (ohne tool_results) | Alle |
| `assistant_text.jsonl` | 429 Assistant-Prose-Bloecke | Alle |
| `tool_calls.jsonl` | 1153 Tool-Use-Events (name, input) | RA3 (Engine/Bash), RA4 (Wikimedia/WebFetch), RA5 |
| `tool_errors.jsonl` | 45 Tool-Errors (mit Preview) | RA1, RA5 |
| `subagent_spawns.jsonl` | 5 Agent-Spawns | RA5 (Multi-Agent-Nutzung) |
| `medien_events.jsonl` | 205 Medien-Events (Wikimedia/Commons/File:/Download) | RA4 Primaer |
| `phase_events.jsonl` | 1301 Phase-/Q-Gate-/Agenten-Markierungen | RA1 Primaer, RA2 |
| `milestones.json` | Gefilterte Schluessel-Events: phase_pass, q_gate_fail, halluzi, mv2_moment, hefteintrag, assembly_bug, sprache_zu_komplex | Alle |
| `session_handoffs.md` | 4 Uebergabe-Prompt-Segmente (last_A, first_B, last_B, first_C) | RA5 Primaer |
| `tool_counts_per_session.csv` | Tool-Histogramm je Session | RA5 |

---

## 3. Tool-Use-Profile (aus `summary.json`)

**Session A (Phase 0.1-0.4 + Beginn 1.1):** 229 Tool-Calls. Top: Read 77, TodoWrite 34, Bash 34, Edit 22, Glob 20, Write 18, **wikimedia-image-search 16**, ToolSearch 5, Grep 2, Agent 3 (Explore + 2x general-purpose fuer Phase 2.1b Didaktik-Review).
**Session B (Phase 1.1-2.1c + V13-Patch):** 259 Tool-Calls. Top: Read 96, TodoWrite 44, Bash 61, Edit 37, Grep 20, Glob 14, ToolSearch 7, Agent 3.
**Session C (Mappe 2 + Mappe 3 + Live-Debug + MV2):** 665 Tool-Calls. Top: Read 188, Edit 106, Bash 104, Grep 95, TodoWrite 77, Glob 35, Write 33, **WebFetch 14**, ToolSearch 10, Agent 2.

**Beobachtungen:**
- Wikimedia-Image-Search 16x in Session A (Phase 0.2-Nachbereitung waere plausibel, aber Phase 0.2 lief in Claude Code laut Feedback-Relay). Die 16 Aufrufe sind daher vermutlich Artefakt-Verifikation nach Phase 0.2 in Cowork — nicht Teil der kanonischen Pipeline.
- WebFetch nur 14x in Session C, ausschliesslich im Debug-Zeitraum nach MV2-Befund (17:53Z+). WebFetch wurde nicht prospektiv fuer Medien-Verifikation waehrend Phase 0.2/1.1 verwendet — reagativ nach Claude-Code-Fehlermeldung.
- Nur 5 Subagenten-Spawns ueber alle Sessions (4 general-purpose + 1 Explore). Kein paralleler Multi-Agent-Audit waehrend Produktion.

---

## 4. Schluessel-Momente (chronologisch, aus `milestones.json`)

### 4.1 Phasen-Abschluesse (28 PASS-Events)
- 2026-04-12T14:10Z — Phase 0.1 DIDAKTIK_RAHMEN PASS (4 Mappen definiert: Nationalgedanke → Reichsgruendung → Berliner Konferenz → Genozid Herero/Nama).
- 2026-04-12T14:35Z — Phase 0.2 AGENT_INHALT PASS (Claude-Code-Feedback-Relay).
- 2026-04-12T14:55Z — Phase 0.4 TAFELBILDs PASS (4 Tafelbilder, 1 WARN: M3 Stundenfrage 13W).
- 2026-04-12T15:20Z — Phase 2.0 Rahmen Mappe 1 PASS (5 Dateien).
- 2026-04-12T16:xxZ ff. — Phasen 2.1a/b/c Mappe 1 PASS (Session B).
- Weitere 24 PASS-Events siehe `milestones.json`.

### 4.2 Q-Gate-FAIL / Abbruchpunkte
- 2026-04-12T14:55Z — Nur 1 WARN (QH2 Mappe 3 Stundenfrage 13 Woerter vs. Constraint C1b). Kein harter FAIL im Verlauf des Test-Runs gefunden. Indiz fuer **F-PM-Latent**: entweder waren die Q-Gates extrem robust, oder Q-Gate-Versagen wurden nicht als solche protokolliert und gingen als PASS durch.

### 4.3 MV2-Befund (Medien-Halluzination)
- 2026-04-16T17:53:35Z — Claude-Code-Feedback: `Berlin_Conference,_1884-85.jpg` existiert nicht, Ersatz `Maréchal-Karikatur`.
- 2026-04-16T17:54:25Z — Systematische Wikimedia-API-Pruefung Mappe 3 (4 Dateinamen).
- 2026-04-16T17:55:22Z — **Gesamt-Audit ueber alle 4 Mappen: 6/18 halluzinierte Dateinamen** (img-1-2, img-2-2, img-3-2, img-4-1, img-4-3, img-4-4). 33% Hallu-Rate.
- 2026-04-16T17:55:40Z — MV2-Infrastruktur-Patch-Vorschlag formuliert.
- 2026-04-16T17:57:54Z — **User: "der prozess des findens von medien muss unbedingt noch mal tiefgreifend überarbeitet werden... setze das bitte auf den upgrade-plan für später und fahre zunächst mit der mappengenerierung von mappe 3 fort"** — explizite Deferral-Entscheidung.

### 4.4 Assembly-Defekte (PATCH-M3-Vorgeschichte)
- 2026-04-12T16:38Z — User-Befund Mappe 1: "hefteintrag entspricht nicht meiner erwartung" (Rendering-Problem).
- 2026-04-12T16:39Z — Root-Cause analysiert: `sicherung.hefteintrag_verweis` (Text) statt `sicherung.hefteintrag` (Objekt mit SCPL).
- 2026-04-12T16:40Z — **User-Anforderung: "evaluiere, wie so ein fehler durch entsprechende anpasssung der prozessstruktur in zukunft möglichst vermieden werden kann"** — proaktive Prozess-Lerninstruktion.
- 2026-04-12T16:41Z — Drei-Ebenen-Befund: Vertrag korrekt aber nicht durchgesetzt (Claude Code ignorierte Spec).
- 2026-04-12T16:43Z — **V13 Prozess-Fix in VERTRAG_PHASE_3_ASSEMBLY** + DEPLOY-06 in VERTRAG_PHASE_3-1.
- 2026-04-16T18:14Z — **Identisches Problem manifestiert erneut in Mappe 3** (PATCH-M3 Finding 5). V13-Patch wurde entweder nicht retroaktiv in Mappe 3 durchgesetzt oder Claude Code hat V13 erneut ignoriert.
- 2026-04-16T18:15Z+ — 5 Findings Mappe-3-Live-Patch erstellt (Umlaute, HTML-Entities, Bildpfad M5, Aufgabe 3 Komplexitaet, Hefteintrag-Verschachtelung).
- 2026-04-16T18:27Z — User: "mappe 3 muss so gepatched werden dass sie fehlerfrei live ist bevor wir mit irgendwas anderem fortfahren können" — harter Stop fuer Patch-Durchsetzung.
- 2026-04-16T18:44Z — Patches live, aber **Umlaut-Problem + HTML-Entity-Rendering persistieren** (User-Rueckmeldung).
- 2026-04-16T18:53Z — Formatierungsfehler persistieren weiter.

### 4.5 UX-1 Meldungen (Sprachniveau / Lueckentext-Bug)
- 2026-04-16T15:43Z — User-Praxis-Feedback Mappe 1+2: "Bei fehlerhaftem lückentext werden die fehlerhaften lücken nicht wieder geleert, man muss die seite neu laden". **Erster Hinweis** auf Lueckentext-Disable-Bug, 3 Tage vor Testrun-Ende.
- 2026-04-17T10:33Z — Finale User-Nachricht: UX-1 Finding-Kern (Hefteintrag zu lang, Lueckentext-Bug, Vokabular zu komplex R7).

---

## 5. Kontext-Window-Pressure / Auto-Kompaktion

**12 Auto-Kompaktions-Ereignisse** ("This session is being continued from a previous conversation that ran out of context") im gesamten Testrun:

| Session | Ereignisse | Zeitpunkte |
|---|---|---|
| A | 3 | 14:45Z, 15:12Z, 15:27Z |
| B | 3 | 16:03Z, 16:57Z, 17:25Z |
| C | 6 | 18:04Z (gleicher Tag), 2026-04-16 15:47Z, 16:56Z, 17:22Z, 18:20Z, 18:56Z |

**Interpretation:**
- Session A: Kompaktion ca. alle 20-30 Minuten — hoher Kontext-Druck in der Phase 0.x-Produktion.
- Session B: Kompaktion ca. alle 30-60 Minuten.
- Session C: 6 Kompaktionen, davon 5 am 2026-04-16 (Mappe-3-Debug-Tag). Kompaktions-Risiko steigt nachweislich mit Debug-/Patch-Intensitaet.

**Implikation fuer RA5:** Kompaktionen induzieren Summary-basierte Kontext-Rekonstruktion. Das Risiko liegt in verloren gegangenen Detail-Constraints (Vertrags-Paragrafen, Q-Gate-Kriterien) — Claude haelt nach Kompaktion den Kontext-Summary fuer ausreichend und erzeugt Drift. Die 2026-04-16 18:44Z-Persistenz des Umlaut-Problems nach einem "live"-Patch ist ein direkter Kandidat fuer Kompaktions-induzierte Regression.

---

## 6. Subagenten-Nutzung

Nur 5 Subagenten-Spawns ueber 3337 Messages. Zeitpunkte:

| Session | Zeit | Typ | Zweck |
|---|---|---|---|
| B | 2026-04-12T17:26Z | Explore | Find img-2-1 artefakt details |
| B | 2026-04-12T17:31Z | general-purpose | Phase 2.1b Didaktik-Review |
| B | 2026-04-12T17:35Z | general-purpose | Phase 2.1b Re-Review iteration 2 |
| C | 2026-04-16T16:07Z | ? (type not recorded) | Verify infrastructure changes consistency |
| C | 2026-04-16T16:44Z | ? (type not recorded) | Full plan compliance verification |

**Beobachtung fuer RA5:**
- Kein paralleler Multi-Agent-Review (etwa fuer Q-Gate-Audit je Mappe).
- Kein Claude-Code-Subagent gespawnt (nur Feedback-Relay via Mensch).
- Phase 2.1b Didaktik-Review wurde 2x sequenziell gespawnt — hilfreiches Pattern, aber nicht parallelisiert.

---

## 7. User-Interventionen (Korrekturen, Steuerung, Meta-Anweisungen)

7 Eindeutige Korrektur-/Steuerungs-Momente:

1. **2026-04-12T16:38Z (B)** — Hefteintrag-Rendering-Defekt Mappe 1 gemeldet.
2. **2026-04-12T16:40Z (B)** — Prozess-Lerninstruktion ("evaluiere wie solche Fehler vermieden werden").
3. **2026-04-16T15:43Z (C)** — Praxis-Feedback Mappe 1+2 (Lueckentext-Reset-Bug + weitere).
4. **2026-04-16T17:57Z (C)** — Upgrade-Plan-Deferral-Entscheidung Medien-Prozess.
5. **2026-04-16T18:14Z (C)** — 5 Mappe-3-Patch-Findings aufgelistet.
6. **2026-04-16T18:27Z (C)** — Harter Stop: Mappe 3 fehlerfrei bevor Fortsetzung.
7. **2026-04-16T18:44Z / 18:53Z (C)** — Persistenz-Rueckmeldung Umlaute + Bildunterschriften.

Drei Upgrade-Plan-Notationen (2026-04-16T17:57, 2026-04-16T18:14, 2026-04-17T10:33) — User nutzt Upgrade-Plan-Dokument bewusst als Pendenzen-Liste, nicht als Prozess-Steuerungsersatz.

---

## 8. Tool-Error-Profile (45 Errors)

| Typ | Anzahl | Beispiele |
|---|---|---|
| File content exceeds tokens | 10+ | Read ohne offset/limit auf grossen Dateien |
| Bash exit code 2 | 2 | Falsche Pfade |
| Glob/Bash Cancelled (parallel) | 5 | Parallel-Aufruf-Cancel-Effekte |
| Git-Auth / Virtiofs | 6 | github.com Credentials, unlink Operation not permitted auf `.git` |
| WebFetch 403 | 1 | 2026-04-16T19:38Z |
| Sonstige | 20+ | - |

**RA3-/RA5-relevant:** Die Virtiofs-Git-Lock-Errors matchen die Memory `feedback_virtiofs_git_lock.md` — bekannte Infrastruktur-Klasse. Nicht neu, aber trat 6x auf und koennte commits verzoegert haben.

---

## 9. Pflicht-Leseliste fuer RA-Agenten

Jeder RA liest:
- `AUDIT_STATE.md` (dieses Verzeichnis) — Scope + Severitaets-Skala
- Eigene `CHARTA_RA[N]_*.md` (wird in Task #3 erstellt)
- `EVIDENZ_BUNDLE.md` (dieses Dokument)
- Zugewiesene Extrakt-Dateien aus `evidenz/`
- Bei Bedarf gezielte JSONL-Excerpts (Pfade in Anhang B dieses Dokuments)
- Existierender UPGRADE_PLAN: `docs/analyse/Verlauf Game Imperialismus/UPGRADE_PLAN.md`

RA-spezifische Pflichtlektuere:
- **RA1 Pipeline:** `docs/agents/ORCHESTRATOR.md`, `docs/architektur/WORKFLOW_v4.md`, `docs/architektur/vertraege/` (Phasen-Vertraege)
- **RA2 Didaktik/Material:** `docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md`, `GUETEKRITERIEN_AUFGABEN.md`, `GUETEKRITERIEN_SKRIPT.md`, `QUALITAETSKRITERIEN_MATERIALPRODUKTION.md`
- **RA3 Engine/Assembly:** `escape-game-generator/` Repo-Files (VERTRAG_PHASE_3_ASSEMBLY.md, VERTRAG_PHASE_3-1_DEPLOY.md, AGENT_TECHNIK / escape-engine.js)
- **RA4 Medien/Lizenz:** Existente Medien-Pipeline in `AGENT_INHALT.md` + `docs/architektur/UPGRADE_PLAN_v3-12_ESCAPE_GAME_QUALITAET.md` (Runden-Design)
- **RA5 PM-Meta:** `docs/projekt/COWORK_PROJECT_ANLEITUNG.md`, `docs/projekt/STATUS.md`, `docs/befunde/BEFUND_TESTRUN_M1_KONSOLIDIERT.md` (F-P1/F-P2 als Vorgeschichte)

---

## Anhang A: Severitaets-Kalibrierungs-Anker

Die drei UPGRADE_PLAN-Kern-Findings werden so eingeordnet (Vorschlag des PM, RA-Agenten duerfen revidieren):

| Finding | UPGRADE_PLAN-Einstufung | PM-Vorschlag |
|---|---|---|
| MV2 Medien-Halluzination | Prio HOCH | P0 (Medien-Integritaet → Lernmittel-Richtigkeit → Schulrechtliches Risiko) |
| PATCH-M3 Live-Defekte | Prio SOFORT | P0 / P1 pro Teilfinding |
| UX-1 Sprachniveau + Lueckentext-Bug | Prio HOCH | P1 (Zielgruppen-Passung) / P0 (Lueckentext-Bug = UX-Blocker) |

---

## Anhang B: JSONL-Excerpt-Bereiche fuer Tiefenanalyse

Bei Bedarf koennen RAs einzelne Message-UUIDs oder Timestamp-Bereiche aus den JSONLs nachladen:

- **Hefteintrag-Bug-Diskussion Session B:** 2026-04-12T16:38Z bis 16:45Z
- **MV2-Befund + API-Pruefung Session C:** 2026-04-16T17:53Z bis 17:58Z
- **Mappe-3-Live-Patch-Zyklus:** 2026-04-16T18:14Z bis 19:22Z
- **V13-Implementation:** 2026-04-12T16:43Z Edits in VERTRAG_PHASE_3_ASSEMBLY.md

Pfade zu JSONL-Dateien stehen in Abschnitt 1.
