# UPGRADE_PLAN v3.9: Steuerungsdokumente-Refaktor

**Datum:** 2026-04-10
**Ausloeser:** F-P1 / F-P2 / F-P3 aus BEFUND_TESTRUN_M1_KONSOLIDIERT.md
**Scope:** PROJECT_INSTRUCTIONS.md + ORCHESTRATOR.md (escape-game-generator Repo)
**Ziel:** Klare Autoritaetshierarchie, Redundanz-Elimination, Token-Reduktion

---

## 1. Problemanalyse

### 1.1 Quantitative Ist-Aufnahme

| Dokument | Zeilen | KB | ~Token | Auto-Load | Rolle (deklariert) |
|---|---|---|---|---|---|
| PROJECT_INSTRUCTIONS.md | 339 | 14 | 3.800 | Ja | State Machine |
| ORCHESTRATOR.md | 494 | 31 | 8.000 | Nein (manuell) | Steuerungsinstanz |
| WORKFLOW_v4.md | 977 | 57 | 15.000 | Nein (vermieden) | Kanonische Referenz |
| **Summe** | **1.810** | **102** | **26.800** | | |

### 1.2 Redundanz-Kartierung

Detaillierte Sektion-fuer-Sektion-Analyse (Quelle: Overlap-Audit Session 28):

**REDUNDANT (identische Information in beiden Dokumenten):**

| Inhalt | PROJECT_INSTRUCTIONS | ORCHESTRATOR | Umfang |
|---|---|---|---|
| Phase-0-Sequenz (0.1→0.4) | Z. 171-193 (~2.4 KB) | Z. 31-87 (~2.1 KB) | ~4.5 KB doppelt |
| Phase-1-Sequenz (1.1) | Z. 225-230 (~0.9 KB) | Z. 89-104 (~0.6 KB) | ~1.5 KB doppelt |
| Phase-2-Sequenz (2.0→3.0) | Z. 244-294 (~2.1 KB) | Z. 107-190 (~3.2 KB) | ~5.3 KB doppelt |
| Parameter-Definitionen | Z. 56-66 | Z. 8-23 | ~1.0 KB doppelt |
| Endzustand ABGESCHLOSSEN | Z. 298-303 | Z. 319-345 | ~0.7 KB doppelt |
| **Summe Redundanz** | | | **~13 KB / ~3.400 Token** |

**UNIQUE in PROJECT_INSTRUCTIONS (nicht im ORCHESTRATOR):**

| Inhalt | Zeilen | ~Token |
|---|---|---|
| Zustandsblock (SSOT) | 10-22 | 420 |
| Dual-Root Pfad-Aufloesung | 25-53 | 1.080 |
| ONBOARDING-Workflow | 75-152 | 3.120 |
| Self-Update-Protokoll | 306-321 | 560 |
| Git-Ownership | 335-340 | 200 |
| **Summe** | | **~5.380** |

**UNIQUE im ORCHESTRATOR (nicht in PROJECT_INSTRUCTIONS):**

| Inhalt | Zeilen | ~Token |
|---|---|---|
| Uebergabe-Template (OPT-1/4/5/7) | 215-271 | 2.280 |
| Session-Split-Template (OPT-8/IL-4) | 273-316 | 1.870 |
| Ausfuehrungsorte-Tabelle | 363-380 | 1.100 |
| data.json Schema + Konventionen | 381-448 | 2.040 |
| Medien-Workflow | 420-434 | 520 |
| Iterationsregeln (Q-Gate-FAIL) | 347-362 | 580 |
| Agenten-Roster | 464-480 | 960 |
| Referenz-Dokumente | 481-495 | 480 |
| **Summe** | | **~9.830** |

### 1.3 Testrun-Evidenz: Agenten-Verhalten

Aus Transkript-Analyse (4.938 Zeilen):

1. **PROJECT_INSTRUCTIONS wurde bei Session-Start auto-loaded** — der Agent las den Zustandsblock und wusste sofort, welche Phase als naechstes kommt. Funktioniert wie vorgesehen.
2. **ORCHESTRATOR wurde 10× gelesen, aber nicht an Phasen-Transitionen.** Der Agent las ihn bei Bedarf (Schema-Fragen, Assembly-Detail), nicht als Routing-Dokument. Rational: Der Agent findet Routing-Info bereits in PROJECT_INSTRUCTIONS.
3. **Phase 3 wurde in Cowork ausgefuehrt**, weil PROJECT_INSTRUCTIONS Z. 270 eine nahtlose Transition `2.2c → 3.0` zeigt — kein STOP-Marker, kein Ort-Constraint. Die Ort-Regel steht NUR im ORCHESTRATOR (Z. 379) und WORKFLOW_v4 (Z. 175/754), die der Agent zu diesem Zeitpunkt nicht gelesen hatte.
4. **Session-Split nach 2.1c wurde nicht erzwungen**, weil PROJECT_INSTRUCTIONS keinen Split-Marker enthaelt. Die Split-Pflicht (IL-4) steht NUR im ORCHESTRATOR (Z. 273-288).
5. **Vertraege wurden direkt gelesen** (VERTRAG_PHASE_*.md), ohne vorherigen ORCHESTRATOR-Read. Der Agent braucht den ORCHESTRATOR nicht als Router — er braucht ihn als Referenz fuer Regeln, die in PROJECT_INSTRUCTIONS fehlen.

### 1.4 Kern-Diagnose

**PROJECT_INSTRUCTIONS ist de facto das Steuerungsdokument** (auto-loaded, State Machine, Zustandsblock). Aber es enthaelt NICHT alle steuerungsrelevanten Constraints:

| Constraint | In PI? | In ORCH? | Im Testrun beachtet? |
|---|---|---|---|
| Phasen-Sequenz | Ja | Ja (redundant) | Ja (PI gelesen) |
| Ausfuehrungsort pro Phase | Nein | Ja (Z. 363-380) | **Nein** (ORCH nicht gelesen) |
| Session-Split nach 2.1c | Nein | Ja (Z. 273-288) | **Nein** (ORCH nicht gelesen) |
| Uebergabe-Prompt-Pflicht bei 2.2c→3.0 | Nein | Ja (Z. 178-185) | **Nein** (ORCH nicht gelesen) |
| Dispatch-Isolation (P4) | Nein (implizit) | Ja (Z. 126-128) | Ja (zufaellig / aus Vertrag) |
| Q-Gate-FAIL max 3 Iterationen | Rudimentaer (3 Zeilen) | Ja (Z. 347-362) | N/A (kein FAIL im Testrun) |

**Fazit:** Jeder Constraint, der NUR im ORCHESTRATOR steht, wurde im Testrun verletzt oder ignoriert. Der ORCHESTRATOR ist ein toter Brief, solange PROJECT_INSTRUCTIONS das einzige auto-loaded Dokument ist.

---

## 2. Loesungsoptionen

### Option A: PI-Erweiterung + ORCH-Reduktion (Refaktor)

**Prinzip:** PROJECT_INSTRUCTIONS wird zum einzigen Steuerungsdokument. Alle steuerungsrelevanten Constraints wandern dorthin. ORCHESTRATOR wird zur Referenz-Datei (Schema, Templates, Konventionen) — nur bei Bedarf gelesen.

**Aenderungen PROJECT_INSTRUCTIONS.md:**

| Aenderung | Detail | Token-Delta |
|---|---|---|
| Uebergangstabelle erweitern | Pro Transition: Vertrag, Ort, Preconditions, STOP-Marker wo noetig | +400 |
| Ausfuehrungsort-Spalte | In Uebergangstabelle integrieren: `Ort: Cowork` / `Ort: Claude Code` | +100 |
| STOP-Marker 2.2c→3.0 | `2.2c PASS → STOP. Output: Uebergabe-Prompt. Git-Commit. Phase 3 in Claude Code.` | +50 |
| Session-Split-Pflicht 2.1c | `2.1c PASS → PFLICHT-SPLIT. Split-Prompt generieren. Session beenden.` | +50 |
| Dispatch-Isolation-Regel (P4) | 1 Zeile: `Phase 2.1 + 2.2b: DISPATCH-ISOLATION. Ein Artefakt pro Nachricht.` | +30 |
| Redundante Phasen-Detail entfernen | Phase-0/1/2-Bloecke kuerzen: Nur State-Machine-Info, keine Agenten-I/O-Details | -1.500 |
| **Netto** | | **~-870 Token** |

PI-Zielgroesse: ~2.930 Token (von 3.800). Kompakter, aber mit allen Constraints.

**Aenderungen ORCHESTRATOR.md:**

| Aenderung | Detail | Token-Delta |
|---|---|---|
| Phasen-Sequenz-Flowchart entfernen | Z. 28-188 → Verweis auf PROJECT_INSTRUCTIONS Uebergangstabelle | -5.900 |
| Eingabe-Sektion entfernen | Z. 8-23 → Verweis auf PI GAME-PARAMETER | -620 |
| Phase 1/2 Detail entfernen | Redundant mit PI | -3.800 |
| Header anpassen | "Referenz-Dokument" statt "Steuerungsinstanz" | 0 |
| **Netto** | | **~-10.320 Token** |

ORCH-Zielgroesse: ~2.080 Token (von 8.000, nur UNIQUE-Sektionen verbleiben):
- Uebergabe-Template (~2.280 Token)
- Session-Split-Template-Format (~800 Token, Regelwerk nach PI, nur Template-Text hier)
- Ausfuehrungsorte-Tabelle (→ wandert nach PI, hier entfaellt)
- data.json Schema + Konventionen (~2.040 Token)
- Medien-Workflow (~520 Token)
- Iterationsregeln (~580 Token)
- Agenten-Roster (~960 Token)
- Referenz-Dokumente (~480 Token)

Korrektur: ORCH-Zielgroesse ~7.660 Token, aber nur ~2.000-3.000 werden bei einer typischen Phase gelesen (Schema nur bei Assembly, Template nur bei Split/Uebergabe).

**Trade-offs:**

| Vorteil | Nachteil |
|---|---|
| Alle Constraints in einem auto-loaded Dokument | PI wird zur kritischen Single-Point-of-Failure |
| ~3.400 Token Redundanz eliminiert | Einmaliger Refaktor-Aufwand 45-60 min |
| Agent muss ORCH nur noch bei Bedarf lesen | ORCH verliert Steuerungsfunktion — historischer Bruch |
| Kein Drift mehr zwischen PI und ORCH | PI muss bei neuen Phasen/Constraints aktualisiert werden |
| Testrun-beobachtete Fehler werden strukturell verhindert | |

### Option B: Inline-Routing in PI + ORCH-Sektions-Verweise

**Prinzip:** PROJECT_INSTRUCTIONS erhaelt pro Transition einen `LIES: ORCHESTRATOR.md §[Sektion]`-Verweis. ORCHESTRATOR bleibt inhaltlich unveraendert, wird aber nur sektionsweise gelesen.

**Aenderungen PROJECT_INSTRUCTIONS.md:**

| Aenderung | Detail | Token-Delta |
|---|---|---|
| Uebergangstabelle: LIES-Spalte | `LIES: ORCH §Session-Split` / `LIES: ORCH §Uebergabe-Template` | +200 |
| STOP-Marker 2.2c→3.0 | Wie Option A | +50 |
| **Netto** | | **+250 Token** |

**Aenderungen ORCHESTRATOR.md:**

| Aenderung | Detail | Token-Delta |
|---|---|---|
| Sektions-Anker einfuegen | `## §Session-Split`, `## §Uebergabe-Template`, `## §Schema` etc. | +100 |
| **Netto** | | **+100 Token** |

**Trade-offs:**

| Vorteil | Nachteil |
|---|---|
| Minimaler Aenderungsaufwand (20 min) | Redundanz bleibt bestehen (~3.400 Token doppelt) |
| ORCH behalt seine Rolle | Agent muss ORCH lesen — Token-Overhead bleibt bei Sektions-Read |
| Weniger Risiko durch kleinere Aenderung | LIES-Verweise sind nicht erzwingbar — Agent kann sie ignorieren |
| | Sektions-Anker koennen bei Edits driften (Zeilen-Instabilitaet) |
| | Drift PI↔ORCH bei Phasen-Sequenz bleibt moeglich |

### Option C: ORCH-Konsolidierung in PI (Merge)

**Prinzip:** ORCHESTRATOR.md wird vollstaendig in PROJECT_INSTRUCTIONS.md integriert. Ein Dokument fuer alles. ORCHESTRATOR.md wird geloescht oder zu einem Redirect.

**Aenderungen:**

PROJECT_INSTRUCTIONS.md uebernimmt ALLE UNIQUE-Sektionen aus ORCHESTRATOR (~9.830 Token). PI-Zielgroesse: ~5.380 (PI-UNIQUE) + ~9.830 (ORCH-UNIQUE) = ~15.210 Token.

**Trade-offs:**

| Vorteil | Nachteil |
|---|---|
| Ein Dokument = keine Drift-Moeglichkeit | 15.210 Token auto-loaded bei JEDEM Session-Start |
| Maximale Einfachheit | Signalverduennung: Agent bekommt Schema + Templates auch wenn er nur Routing braucht |
| | PI wird zu gross fuer Cowork Project Instructions Feld |
| | Gleiches Problem wie aktueller ORCH: Monolithisches Dokument mit gemischten Informationstypen |

### Option D: Dreistufige Architektur (PI → Phasen-Karten → Referenz)

**Prinzip:** PI bleibt kompakte State Machine. Pro Phase existiert eine eigene Phasen-Karte (~200-500 Token) mit ALLEN Constraints fuer genau diese Transition. ORCHESTRATOR wird Referenz-Dokument.

**Neue Artefakte:** `steuerung/PHASE_0.md`, `steuerung/PHASE_1.md`, `steuerung/PHASE_2_RAHMEN.md`, `steuerung/PHASE_2_MATERIAL.md`, etc.

**Aenderungen PROJECT_INSTRUCTIONS.md:**

Uebergangstabelle verweist auf Phasen-Karte statt auf ORCHESTRATOR:

```
| 2.0 | LIES: steuerung/PHASE_2_RAHMEN.md | 2.1 Material |
| 2.1 | LIES: steuerung/PHASE_2_MATERIAL.md | 2.1b Review |
```

Jede Phasen-Karte enthaelt:
- Vertrag(e) + Agenten-Prompt(s) (Pfade)
- Ausfuehrungsort
- Input-Artefakte
- Output-Artefakte
- Isolation-Regeln
- Q-Gate-Kriterien-Verweis
- STOP-Marker / Split-Pflicht (falls zutreffend)

**Trade-offs:**

| Vorteil | Nachteil |
|---|---|
| Minimaler Token-Overhead: PI (~3 KB) + 1 Phasen-Karte (~500 Token) = ~4.5 KB pro Transition | 8-10 neue Dateien verwalten |
| Kein Drift: Jede Phasen-Karte ist SSOT fuer ihre Phase | Mehr Dateien = mehr Wartungsaufwand bei Phasen-Aenderungen |
| ORCH wird echte Referenz (nur bei Schema/Template-Bedarf) | Agent muss neue Datei lesen — nicht auto-loaded |
| Praezise Signal-to-Noise: Agent liest NUR was er braucht | Ueber-Engineering fuer ein System mit 4 Phasen? |
| Skaliert gut bei neuen Phasen | Erfordert PFAD_MANIFEST-Update oder Konvention |

---

## 3. Bewertungsmatrix

| Kriterium | Gewicht | A (Refaktor) | B (Sektions-Ref) | C (Merge) | D (Phasen-Karten) |
|---|---|---|---|---|---|
| Redundanz-Elimination | 25% | 5 (vollstaendig) | 1 (bleibt) | 5 (vollstaendig) | 5 (vollstaendig) |
| Token-Effizienz pro Transition | 25% | 4 (~3 KB PI auto + 0-3 KB ORCH bei Bedarf) | 2 (~3.8 KB PI + 2-4 KB ORCH-Sektion) | 1 (15 KB auto-load) | 5 (~3 KB PI + 0.5 KB Karte) |
| Drift-Resistenz | 20% | 4 (Constraints in PI, Referenz in ORCH) | 2 (zwei Quellen, beide editierbar) | 5 (eine Quelle) | 4 (PI + Karten, ORCH ist Referenz) |
| Implementierungs-Aufwand | 15% | 3 (45-60 min) | 5 (20 min) | 2 (60-90 min) | 2 (60-90 min + Dateien) |
| Wartungsaufwand laufend | 15% | 4 (2 Dateien, klare Rollen) | 2 (2 Dateien, unklare Rollen) | 4 (1 Datei) | 3 (10+ Dateien) |
| **Gewichteter Score** | | **4.10** | **2.15** | **3.35** | **4.10** |

### Empfehlung

**Option A und D scoren gleich, aber aus verschiedenen Gruenden:**

- **Option A** ist der pragmatische Sweet Spot: Eliminiert Redundanz, bringt alle Constraints in PI, minimaler laufender Wartungsaufwand. ORCH bleibt als Referenz-Dokument erhalten — kein historischer Bruch.
- **Option D** ist die sauberste Architektur: Maximale Token-Effizienz, perfekte Separation of Concerns. Aber: 8-10 neue Dateien fuer ein System mit 4 Phasen und ~12 Sub-Phasen ist Overhead, der erst bei deutlich mehr Phasen oder mehreren parallelen Games Sinn ergibt.

**Empfehlung: Option A.**

Begruendung: (1) Der Testrun hat gezeigt, dass der Agent PROJECT_INSTRUCTIONS als Steuerungsdokument behandelt — wir folgen seinem Verhalten statt dagegen zu arbeiten. (2) Die Token-Einsparung (~3.400 eliminiert + ORCH nur bei Bedarf) ist signifikant. (3) Option D waere Ueber-Engineering fuer den aktuellen Scale. Falls spaeter mehr Games parallel produziert werden oder die Phase-Zahl steigt, kann D als v4.0-Upgrade nachgezogen werden.

---

## 4. Implementierungsplan (Option A)

### Phase 1: PROJECT_INSTRUCTIONS.md erweitern (25 min)

**Schritt 1.1:** Uebergangstabelle (Z. 260-271) ersetzen durch erweiterte Version:

```markdown
| Abgeschlossen | NAECHSTE_AKTION | Vertrag/Prompt | Ort | Constraint |
|---|---|---|---|---|
| ONBOARDING | 0.1 AGENT_DIDAKTIK | VERTRAG_PHASE_0-1_DIDAKTIK | Cowork | — |
| 0.1 | 0.2 AGENT_INHALT | VERTRAG_PHASE_0-2_INHALT | Claude Code | MCP: wikipedia, wikimedia |
| 0.2 | 0.3 AGENT_SKRIPT | VERTRAG_PHASE_0-3_SKRIPT | Cowork | — |
| 0.3 | USER-VALIDIERUNG (PFLICHT) | — | — | STOP. Warte auf User PASS. |
| 0.3 PASS | PERSISTENZ-CHECKPOINT | — | — | git commit Phase-0-Artefakte |
| CHECKPOINT | 0.4 AGENT_HEFTEINTRAG | VERTRAG_PHASE_0-4_HEFTEINTRAG | Cowork | — |
| 0.4 | 1.1 AGENT_MATERIAL | VERTRAG_PHASE_2-1_MATERIAL | Cowork | — |
| 1.1 | USER-VALIDIERUNG (PFLICHT) | — | — | STOP. Warte auf User PASS. |
| 1.1 PASS | 2.0 Rahmen Mappe [N] | (kein Vertrag, Rahmen-Dispatch) | Cowork | — |
| 2.0 | 2.1 Material Mappe [N] | VERTRAG_PHASE_2-1_MATERIAL | Cowork | DISPATCH-ISOLATION (P4): 1 Material pro Nachricht |
| 2.1 | 2.1b Didaktik-Review | VERTRAG_PHASE_2-1b_DIDAKTIK_REVIEW | Cowork | Input-Isolation: mat-*.json OHNE _meta |
| 2.1b | 2.1c Cross-Konsistenz | (kein separater Vertrag) | Cowork | 6 Achsen |
| 2.1c | **PFLICHT-SPLIT** | — | — | **STOP. Split-Prompt generieren. Session beenden. Kein Phase-2.2 im selben Kontext.** |
| SPLIT → 2.2a | Progressionsplan | VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN | Cowork | mat-*.json NUR Metadaten (NICHT Volltext) |
| 2.2a | 2.2b Aufgaben | VERTRAG_PHASE_2-2b_AUFGABE | Cowork | DISPATCH-ISOLATION (P4): 1 Aufgabe pro Nachricht |
| 2.2b | 2.2c Aufgaben-Cross | VERTRAG_PHASE_2-2c_CROSS | Cowork | — |
| 2.2c | **STOP** | — | — | **Uebergabe-Prompt generieren (Format: ORCH §Uebergabe-Template). Git-Commit. Phase 3 in CLAUDE CODE.** |
| 3.0 Assembly | 2.0 Mappe [N+1] oder ABGESCHLOSSEN | VERTRAG_PHASE_3_ASSEMBLY | Claude Code | Rein mechanisch. KEINE didaktischen Entscheidungen. |
```

**Schritt 1.2:** Phase-0/1/2-Detail-Bloecke (Z. 157-294) kuerzen. Entfernen:
- Agenten-I/O-Details (stehen in Vertraegen)
- Phasen-Ablauf-Listen (stehen jetzt in erweiterter Uebergangstabelle)
- Beibehalten: Zustandsblock-Templates, Self-Update-Protokoll, Q-Gate-FAIL-Protokoll

**Schritt 1.3:** Dispatch-Isolation-Regel als eigene Sektion (3 Zeilen):

```markdown
## DISPATCH-ISOLATION (P4)
Phase 2.1 (Material) + Phase 2.2b (Aufgaben): JEDES Artefakt wird als EIGENE Nachricht produziert.
NICHT mehrere Materialien/Aufgaben in einer Nachricht. Jeder Dispatch liest aus persistierten Artefakten (P1).
```

**Schritt 1.4:** Referenz auf ORCHESTRATOR anpassen:

```markdown
## REFERENZ-DOKUMENT
Fuer Schema-Definitionen, Uebergabe-Templates und Konventionen: `agents/ORCHESTRATOR.md`.
NUR bei Bedarf lesen (Assembly, Session-Split-Format, data.json-Schema). NICHT bei jeder Transition.
```

### Phase 2: ORCHESTRATOR.md reduzieren (20 min)

**Schritt 2.1:** Header aendern: "Steuerungsinstanz" → "Referenz-Dokument fuer Escape-Game-Produktion"

**Schritt 2.2:** Entfernen (redundant mit erweiterter PI-Uebergangstabelle):
- Workflow-Flowchart (Z. 28-188, ~5.900 Token)
- Eingabe-Sektion (Z. 8-23, ~620 Token)
- Phase-1/2-Detail (in Flowchart enthalten)

**Schritt 2.3:** Beibehalten (UNIQUE):
- Mappe-Anhang-Prozedur / Assembly-Detail (Z. 192-213)
- Uebergabe-Template (Z. 215-271)
- Session-Split-Template-FORMAT (Z. 290-316) — Regelwerk (IL-4 PFLICHT) wandert nach PI, nur das Template-Format bleibt
- Iterationsregeln (Z. 347-362)
- Ausfuehrungsorte-Tabelle → ENTFAELLT (wandert in PI-Uebergangstabelle Spalte "Ort")
- data.json Schema + Konventionen (Z. 381-448)
- Medien-Workflow (Z. 420-434)
- Agenten-Roster (Z. 464-480)
- Referenz-Dokumente (Z. 481-495)

**Schritt 2.4:** Neuen Header-Block einfuegen:

```markdown
# ORCHESTRATOR — Referenz-Dokument Escape-Game-Produktion

**Rolle:** Nachschlagewerk fuer Schema, Templates und Konventionen.
**NICHT das Steuerungsdokument.** Phasen-Routing, Constraints und State Machine: → PROJECT_INSTRUCTIONS.md
**Wann lesen:** Bei Assembly (Phase 3), Session-Split (Template-Format), Schema-Fragen (data.json).
```

### Phase 3: Verifikation (10 min)

**Schritt 3.1:** Grep-Pruefung: Kein Constraint darf NUR noch im ORCHESTRATOR stehen.

Checklist:
- [ ] Ausfuehrungsort pro Phase: In PI-Uebergangstabelle?
- [ ] Session-Split-Pflicht nach 2.1c: In PI-Uebergangstabelle (STOP-Marker)?
- [ ] Uebergabe-Prompt-Pflicht bei 2.2c→3.0: In PI-Uebergangstabelle (STOP-Marker)?
- [ ] Dispatch-Isolation P4: In PI eigene Sektion?
- [ ] Q-Gate-FAIL max 3 Iterationen: In PI Q-Gate-FAIL-Protokoll?

**Schritt 3.2:** Token-Zaehlung Soll/Ist:

| Dokument | Ist | Soll | Delta |
|---|---|---|---|
| PROJECT_INSTRUCTIONS.md | 3.800 | ~3.000 | -800 |
| ORCHESTRATOR.md | 8.000 | ~4.500 | -3.500 |
| **Summe Steuerung** | **11.800** | **~7.500** | **-4.300 (~36%)** |

**Schritt 3.3:** Simulierter Walkthrough — Eine Phasen-Transition (z.B. 2.1c → Split → 2.2a) durchspielen:
1. Agent liest PI (auto-loaded, ~3.000 Token)
2. Uebergangstabelle zeigt: `2.1c → PFLICHT-SPLIT. STOP.`
3. Agent generiert Split-Prompt (Format aus ORCH §Session-Split-Template, ~800 Token bei Bedarf)
4. Neue Session: PI auto-loaded, Zustandsblock zeigt `NAECHSTE_AKTION: 2.2a`
5. Uebergangstabelle zeigt: `Vertrag: VERTRAG_PHASE_2-2a, Ort: Cowork, Constraint: Metadaten only`
6. Agent liest Vertrag (~1.500 Token). Kein ORCH-Read noetig.
7. **Total Steuerungs-Overhead: ~3.000 Token** (vs. aktuell ~11.800 wenn ORCH gelesen wird)

---

## 5. Risiken

| Risiko | Eintrittswahrscheinlichkeit | Mitigation |
|---|---|---|
| PI wird zur Single-Point-of-Failure | Mittel | WORKFLOW_v4 bleibt als Architektur-Backup. PM prueft PI bei jedem Patch. |
| PI-Uebergangstabelle wird zu komplex | Niedrig | 18 Zeilen — ueberschaubar. Bei >25 Transitionen: Option D evaluieren. |
| Agent liest ORCH nicht mehr bei Assembly | Niedrig | PI-Transition `2.2c → STOP` verweist explizit auf ORCH §Uebergabe-Template. |
| Bestehende Verweise auf ORCHESTRATOR in Vertraegen brechen | Mittel | Grep nach `ORCHESTRATOR` in allen Vertraegen. Verweise auf Phasen-Sequenz entfernen/umleiten. |
| Session-Split-Template-Format im ORCH wird nicht gefunden | Niedrig | PI-Transition enthaelt Verweis mit Sektions-Anker: `Format: ORCH §Session-Split-Template` |

---

## 6. Entscheidung

Offen. Optionen A-D sind ausgearbeitet. Naechster Schritt: User-Entscheidung, dann Implementierung.
