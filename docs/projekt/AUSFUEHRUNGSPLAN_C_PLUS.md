# Ausfuehrungsplan Option C+: Hybrid mit Architektur-Bewusstsein

**Erstellt:** 2026-04-02 (PM-Session 3)
**Grundlage:** GRUNDSATZENTSCHEIDUNG_REBUILD_VS_ITERATE.md §7+§9
**Ziel:** Vertrags-Fixes + Skill-Split mit Trennung Game-spezifisch vs. methoden-agnostisch, dann Mappe 3 als Prozesstest.
**Geschaetzter Gesamtaufwand:** 28-38h ueber 6-10 Sessions
**Erfolgskriterium:** mat-3-1 laeuft fehlerfrei durch verbesserten Vertrag (Schritt 7). Mappe 3 Vollproduktion ohne Wiederholung bekannter Fehlertypen (Schritt 8).
**Abbruchkriterium:** Falls Schritt 7 erneut blockierende Findings zeigt, die NICHT durch Fixes adressierbar sind → Eskalation zu Option A.

---

## Phasenstruktur

### Phase I: Vertrags-Fixes (Schritte 1-3)

Beheben die 3 HIGH-Findings aus comprehensive-review + das im Q1 Test-Dispatch aufgedeckte Sequenzkontext-Interface-Problem. Reihenfolge nach Abhaengigkeit: Schema zuerst (wird von Decision-Tree und Q-Gate referenziert).

### Phase II: Steuerungsschicht (Schritte 4-5)

Verbessert die Orchestrierung: maschinenlesbarer State + Skill-Aufspaltung. Keine Abhaengigkeit zu Phase I, kann parallel oder danach laufen.

### Phase III: Validierung (Schritte 6-7)

Optionale Auditrunde + Test-Dispatch als empirische Pruefung der Fixes.

### Phase IV: Produktion + Auswertung (Schritte 8-9)

Mappe 3 als Prozesstest. Post-Produktion entscheidet ueber Mappe-4-Strategie.

---

## Schritte im Detail

### Schritt 1: Output-JSON-Schema formal definieren

**Finding:** 1.1 (comprehensive-review) — kein formales Schema fuer mat-N-M.json
**Kategorie:** Game-spezifisch
**Aufwand:** 3-4h (1 Session)
**Abhaengigkeiten:** Keine. Kann sofort beginnen.

**Inputs lesen:**
- `escape-games/erster-weltkrieg-ursachen/materialien/mat-2-*.json` (alle 6 existierenden Materialien als Ist-Zustand)
- `docs/agents/SUB_MATERIAL_DARSTELLUNGSTEXT.md` (implizites Output-Format in Prompt)
- `docs/agents/SUB_MATERIAL_QUELLENTEXT.md`, `SUB_MATERIAL_TAGEBUCH.md`, `SUB_MATERIAL_ZEITLEISTE.md`, `SUB_MATERIAL_BILDQUELLE.md` (Output-Sektionen je Typ)
- `assets/escape-engine.js` (Engine-Erwartungen: welche Felder werden gelesen, welche sind pflicht/optional)
- `docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md` (MQ1-MQ5 typ-spezifisch)

**Lieferobjekte:**
1. `docs/architektur/schemata/material-output-schema.json` — JSON-Schema (draft-07) fuer mat-N-M.json. Definiert Pflichtfelder, optionale Felder, Enum-Werte, Format-Constraints pro Material-Typ.
2. Update `VERTRAG_PHASE_2-1_MATERIAL.md` — Schritt 11 referenziert Schema als Validierungsgrundlage.
3. Update je `SUB_MATERIAL_*.md` — Output-Sektion ersetzt durch Schema-Referenz + Beispiel.

**Akzeptanzkriterien:**
- Alle 6 existierenden mat-2-*.json validieren gegen das Schema (0 Fehler).
- Engine-relevante Felder (typ, titel, inhalt, quellenangaben, etc.) sind als REQUIRED markiert.
- Typ-spezifische Felder (eintraege bei Zeitleiste, quelle bei Bildquelle) sind korrekt conditional.

**Verifikation:** Programmatische Validierung: `ajv` oder Python `jsonschema` gegen alle mat-2-*.json.

---

### Schritt 2: Q-Gate-Semantik formalisieren

**Finding:** 5.1 (comprehensive-review) — keine formale Definition wann PASS/FAIL
**Kategorie:** Prueflogik methoden-agnostisch, Kriterien Game-spezifisch
**Aufwand:** 2-3h (1 Session, kombinierbar mit Schritt 1)
**Abhaengigkeiten:** Schritt 1 (Schema muss stehen, da Q-Gate auf Schema-Konformitaet pruefen soll).

**Inputs lesen:**
- `docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md` (MQ1-MQ5 + typ-spezifisch)
- `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md` (A1-A15)
- `VERTRAG_PHASE_2-1_MATERIAL.md` Schritt 10-12 (aktueller Q-Gate-Ablauf)
- `VERTRAG_PHASE_2-2b_AUFGABE.md` (Aufgaben-Q-Gate)

**Lieferobjekte:**
1. `docs/architektur/Q-GATE-MECHANIK.md` (NEU) — methoden-agnostische Q-Gate-Spezifikation:
   - Formales Bewertungsprotokoll: Jedes Kriterium → PASS/WARN/FAIL mit Begruendung
   - Aggregationsregel: Wann ist Gesamt-PASS (z.B. 0 FAIL + max 2 WARN)
   - Nachbesserungslogik: Bei FAIL welche Felder korrekturbeduertig, max 1 Iteration, dann Finding
   - Output-Format: Q-Gate-Ergebnis als strukturiertes JSON (nicht Prosa)
2. Update `VERTRAG_PHASE_2-1_MATERIAL.md` Schritt 10 — referenziert Q-GATE-MECHANIK.md
3. Update `VERTRAG_PHASE_2-2b_AUFGABE.md` — gleiche Q-Gate-Mechanik

**Akzeptanzkriterien:**
- Q-Gate-Ergebnis ist deterministisch: Gleicher Input → gleiches PASS/FAIL bei jedem Dispatch.
- Aggregationsregel ist ohne Interpretationsspielraum formuliert.
- WARN-Kategorie existiert fuer grenzwertige Befunde (nicht nur binaer PASS/FAIL).

**Verifikation:** Trockenlauf: 2 existierende mat-2-*.json durch formalisiertes Q-Gate bewerten, Ergebnis auf Konsistenz pruefen.

---

### Schritt 3: Conditional-Read-Logik als Decision-Tree

**Finding:** 2.1 (comprehensive-review) + Q1-Befund (BLOCKIEREND)
**Kategorie:** Game-spezifisch
**Aufwand:** 2-3h (1 Session)
**Abhaengigkeiten:** Keine direkte zu Schritt 1/2. Aber Schritt 1 (Schema) klaert, welche Felder der Decision-Tree liefern muss.

**Kernproblem (aus Q1):**
- Step 7: "Gesamte Datei bei DT/QT/TB/ZL" in NICHT-lesen-Spalte ist ambig. Soll DT das ARTEFAKT_INVENTAR lesen oder nicht?
- Sequenzkontext-Interface fehlt: SUB_MATERIAL_DT verlangt Sequenzkontext (v3.3 PFLICHT), aber Vertrag 2.1 spezifiziert keinen Read-Step dafuer.
- SCPL-Zone-Inferenz: Mapping tafelbild_knoten → scpl.situation/complication[i]/problem ist nicht dokumentiert.

**Inputs lesen:**
- `VERTRAG_PHASE_2-1_MATERIAL.md` (aktuelle Read-Steps 1-8)
- `docs/agents/SUB_MATERIAL_DARSTELLUNGSTEXT.md` (Sequenzkontext-Anforderung, v3.3 PFLICHT)
- `docs/agents/artefakte/MATERIAL_GERUEST_gpg-erster-weltkrieg-ursachen_Mappe3.md` (konkrete mat-IDs als Testfaelle)
- `docs/agents/artefakte/TAFELBILD_gpg-erster-weltkrieg-ursachen_Mappe3.md` (SCPL-Struktur, Knoten-Zuordnung)
- `escape-games/erster-weltkrieg-ursachen/rahmen/hefteintrag.json` (falls existent — Mappe 2)

**Lieferobjekte:**
1. Decision-Tree als Pseudocode-Tabelle in `VERTRAG_PHASE_2-1_MATERIAL.md` — ersetzt aktuelle Read-Step-Tabelle. Fuer jeden Step: exakte Bedingung, exakter Pfad, exakte Felder, Fallback bei Datei-nicht-gefunden.
2. Neuer Read-Step 1b: Sequenzkontext laden. Definiert: Quelle (SKRIPT Gesamtstruktur oder dediziertes Sequenzdokument), gelesene Felder (vorangehende + nachfolgende Materialien, Gesamterzaehlung der Mappe), Scope-Begrenzung.
3. SCPL-Zone-Mapping-Tabelle: tafelbild_knoten-Praefix → SCPL-Zone. Beispiel: k3-1 → situation, k3-2 → complication[0], k3-3 → complication[1], k3-4 → problem.
4. Update `SUB_MATERIAL_DARSTELLUNGSTEXT.md` — Sequenzkontext-Sektion referenziert neuen Read-Step 1b statt unspezifischer "v3.3 PFLICHT".

**Akzeptanzkriterien:**
- Jeder Read-Step hat genau 1 deterministischen Pfad (kein "ggf.", kein "bei Bedarf").
- Fuer alle 5 mat-3-* aus MATERIAL_GERUEST Mappe 3: Der Decision-Tree produziert eine eindeutige Read-Sequenz.
- Sequenzkontext-Interface ist spezifiziert: Welche Datei, welche Felder, welcher Scope.

**Verifikation:** Manueller Walkthrough: mat-3-1 (DT), mat-3-2 (BQ), mat-3-5 (TB) durch Decision-Tree fuehren. Jeder Step muss eindeutiges Ergebnis liefern.

---

### Schritt 4: state.json / YAML-Frontmatter in STATUS.md

**Quelle:** UPGRADE_PLAN_v5 E5, POOL P2
**Kategorie:** Methoden-agnostisch
**Aufwand:** 2-3h (1 Session)
**Abhaengigkeiten:** Keine. Kann parallel zu Phase I laufen.

**Lieferobjekte:**
1. YAML-Frontmatter in `docs/projekt/STATUS.md` — maschinenlesbarer Block am Dateianfang:
   ```yaml
   ---
   phase: "c-plus-fixes"
   step: 4
   mappe: 3
   last_material: null
   last_dispatch: "2026-04-02T..."
   blocker: ["quellenangaben-engine", "flowcharts-veraltet"]
   ---
   ```
2. Schema-Definition: Welche Felder, welche Werte, wann aktualisiert.
3. Update COWORK_PROJECT_ANLEITUNG.md — "BEI JEDER SESSION" Sektion: Frontmatter parsen.

**Akzeptanzkriterien:**
- Frontmatter ist mit Standard-YAML-Parser lesbar.
- Bestehender Prosa-Inhalt von STATUS.md bleibt unberuehrt (Frontmatter wird vorangestellt).
- Dispatcher-Skill (Schritt 5) kann Frontmatter lesen und daraus naechsten Schritt ableiten.

**Verifikation:** Python-Einzeiler: `yaml.safe_load(open('STATUS.md').read().split('---')[1])` liefert korrektes Dict.

---

### Schritt 5: Skill-Split — Dispatcher + Phasen-Referenz

**Quelle:** plugin-eval Test 3 (Skill-Score 3.61, OVER_CONSTRAINED, 8 Verantwortlichkeiten)
**Kategorie:** Dispatcher methoden-agnostisch, Phasen-Referenz Game-spezifisch
**Aufwand:** 4-5h (1-2 Sessions)
**Abhaengigkeiten:** Schritt 4 (Frontmatter muss stehen, Dispatcher liest es).

**Inputs lesen:**
- `docs/agents/SKILL_projekt-website_v3.md` (aktueller monolithischer Skill, 371 Zeilen)
- `docs/architektur/UPGRADE_PLAN_v5_PLUGIN_ARCHITEKTUR.md` (Zielarchitektur, Dispatcher-Spec)
- `docs/projekt/POOL_PM_INFRASTRUKTUR_ENHANCEMENTS.md` (plugin-eval Ergebnis, Refactoring-Empfehlungen)

**Lieferobjekte:**
1. `docs/agents/SKILL_projekt-website_v4.md` — Neuer Cowork-Skill (Dispatcher). Verantwortlichkeiten:
   - STATUS.md Frontmatter lesen → Phase + Schritt identifizieren
   - Naechste Aktion bestimmen (Vertrag laden, Subagent dispatchen, Q-Gate triggern)
   - Session-Split erkennen (Token-Abschaetzung)
   - Uebergabe-Prompt generieren
   - NICHT: Produktionslogik, Inhalte, Architektur-Details
2. `docs/architektur/PHASEN_REFERENZ.md` (NEU) — Game-spezifisches Nachschlagewerk:
   - Vertrags-Index (alle 6 Vertraege mit Scope, Input, Output, Q-Gate)
   - Subagenten-Index (alle 12 SUB_MATERIAL/AUFGABE mit Typ-Zuordnung)
   - Artefakt-Pfade pro Mappe
   - Q-Gate-Kriterienkataloge-Referenz
3. Cowork-Skill `projekt-website-v4-2` aktualisieren (SKILL.md im Skills-Verzeichnis), ODER separaten neuen Skill registrieren — je nach aktuellem Setup.

**Akzeptanzkriterien:**
- Dispatcher-Skill < 8 KB (vs. aktuell 22 KB).
- plugin-eval Score > 4.0/5.0 (vs. aktuell 3.61).
- Dispatcher kann aus Frontmatter `{phase: "produktion", step: "2-1", mappe: 3, last_material: "mat-3-2"}` ableiten: "Naechster Dispatch: mat-3-3 via VERTRAG_PHASE_2-1".
- PHASEN_REFERENZ ist ein reines Nachschlagewerk, keine Logik.

**Verifikation:** plugin-eval auf neuen Dispatcher-Skill ausfuehren. Score dokumentieren.

---

### Schritt 6: Fachdidaktische Auditrunde (OPTIONAL)

**Quelle:** Q6 User-Einschaetzung ("ausreichend, ggf. kleine Auditrunde")
**Kategorie:** Game-spezifisch
**Aufwand:** 2-4h (1 Session)
**Abhaengigkeiten:** Schritt 1 (Schema muss stehen fuer Output-Bewertung).
**Entscheidung:** Ausfuehren wenn Phase I < 8h dauerte und Zeitbudget es erlaubt. Sonst nach Mappe 3.

**Lieferobjekte:**
1. agent-teams Audit: 3 Reviewer (Fachdidaktik, Sprachqualitaet, Schema-Konformitaet) auf SUB_MATERIAL_DARSTELLUNGSTEXT.md
2. Befundliste mit Schwere-Einstufung
3. Falls HOCH-Befunde: Fixes in Subagenten-Prompts

**Akzeptanzkriterien:**
- Kein HOCH-Befund unbehandelt.
- Subagenten-Prompts konsistent mit neuem Schema (Schritt 1).

---

### Schritt 7: Test-Dispatch mat-3-1 mit verbessertem System ✓ DONE (2026-04-02)

**Kategorie:** Validierung (systemisch)
**Aufwand:** 2-3h (1 Session)
**Abhaengigkeiten:** Schritte 1+2+3 MUESSEN abgeschlossen sein. Schritte 4+5 SOLLTEN abgeschlossen sein.
**Gate:** Dies ist das zentrale Validierungs-Gate. Ergebnis entscheidet ob Mappe 3 Vollproduktion startet.

**Vorgehen:**
1. Phase 2.0 (Rahmen) zuerst ausfuehren — erzeugt hefteintrag.json + einstieg.json
2. mat-3-1 (DT "Begeisterung und Angst") durch verbesserten Vertrag 2.1 dispatchen
3. Subagent fuehrt alle Read-Steps durch (neuer Decision-Tree)
4. Output gegen Schema validieren (Schritt 1)
5. Q-Gate formal durchfuehren (Schritt 2)
6. Befunde dokumentieren

**Akzeptanzkriterien:**
- Subagent durchlaeuft alle Read-Steps ohne Ambiguitaet.
- Output validiert gegen Schema (0 Fehler).
- Q-Gate produziert strukturiertes Ergebnis (PASS/WARN/FAIL je Kriterium).
- Keine neuen blockierenden Findings.

**Bei FAIL:** Befunde in GRUNDSATZENTSCHEIDUNG §6.3 nachtragen. Wenn Fixes moeglich: zurueck zu Phase I. Wenn systemisch: Eskalation zu Option A.

---

### Schritt 8: Mappe 3 Vollproduktion als Prozesstest — Phase 2.1 DONE (2026-04-03)

**Kategorie:** Produktion (Game-spezifisch)
**Aufwand:** 12-16h (3-4 Sessions)
**Abhaengigkeiten:** Schritt 7 PASS.
**Zwischenstand:** Phase 2.0 DONE, Phase 2.1 DONE (5/5 Materialien, Pipeline-Fazit erstellt). Naechste: Phase 2.2a (Progressionsplan).

**Phasen:**
1. Phase 2.0: Rahmen (hefteintrag.json, einstieg.json) — 1 Session — **DONE**
2. Phase 2.1: 5 Materialien (mat-3-1 bis mat-3-5) — 1-2 Sessions — **DONE**
3. Phase 2.2a: Progressionsplan — in Session mit letztem Material
4. Phase 2.2b: 5 Aufgaben — 1 Session — **+ agent-teams Multi-Review (P7)**
5. Phase 2.2c: Cross-Validierung — in Aufgaben-Session
6. Phase 3: Assembly (Claude Code Uebergabe) — 1 Session
7. Phase 4: Browser-Validierung — in Assembly-Session — **+ WCAG-Audit (P13)**

**Tool-Integration (ENTSCHIEDEN 2026-04-03, Details: POOL_PM_INFRASTRUKTUR_ENHANCEMENTS.md):**
- Phase 2.2b: `agent-teams:team-review` — 3 parallele Reviewer (Fachdidaktik A1-A15, Engine-Kompatibilitaet, Sprachqualitaet) auf jede Aufgabe nach Q-Gate. Additiv, nicht substitutiv.
- Phase 4: `accessibility-compliance:wcag-audit-patterns` — WCAG 2.2 AA Audit auf mappe-3.html vor Deployment. Schulkontext = Barrierefreiheit nicht optional.

**Prozesstest-Metriken (erfassen waehrend Produktion):**
- Dispatches pro Material: Soll 1, max 2 (Nachbesserung)
- Q-Gate-Ergebnisse: PASS/WARN/FAIL-Verteilung
- Decision-Tree-Abdeckung: Wurden alle Pfade benutzt? Gab es unvorhergesehene Faelle?
- Session-Splits: Wann, warum, wie smooth war die Uebergabe?
- Schema-Validierung: Fehler nach Dispatch vs. nach Nachbesserung
- Zeitaufwand pro Phase (real vs. geschaetzt)

**Dokumentation:** Jede Session → CHANGELOG.md. Prozesstest-Befunde in separatem Dokument (`docs/projekt/PROZESSTEST_MAPPE3_ERGEBNIS.md`).

---

### Schritt 9: Post-Produktion — Learnings + Mappe-4-Entscheidung ✓ DONE (2026-04-03)

**Kategorie:** Methoden-agnostisch (PM)
**Aufwand:** 4-6h (1-2 Sessions)
**Abhaengigkeiten:** Schritt 8 abgeschlossen.

**Ergebnis:**
1. `docs/projekt/PROZESSTEST_MAPPE3_ERGEBNIS.md` — Pipeline-internes Fazit: 95% Nacharbeit-Reduktion, 0 systemische Fehler. Initiale Empfehlung: C+ FORTSETZEN.
2. **User-Browser-Review (Phase 4.3):** 11 Findings (2 BLOCKER, 3 HIGH, 4 MEDIUM, 2 LOW). 7/11 wiederkehrend aus Mappe 2. Pipeline-interne Metriken unterschaetzten reale Qualitaetsdefizite massiv. Dokumentiert in Q-GATE-LOG.md.
3. **GRUNDSATZENTSCHEIDUNG aktualisiert:** §10 Post-Mappe-3 Empirische Ergebnisse. Revidierte Entscheidung: C+ fortsetzen + Infrastruktur-Revision vor Mappe 4.
4. **Neuer Ausfuehrungsplan:** `docs/projekt/AUSFUEHRUNGSPLAN_INFRASTRUKTUR_REVISION.md` — 3 Phasen (A: 7 Prompt/Vertrags-Patches, B: 2 Architektur-Revisionen, C: Daten-Patch + Mappe-4-Validierung). Geschaetzter Aufwand: 10-16h.
5. Prompt-Optimierung (P15) wird in Phase A integriert (Patches adressieren gleiche Defizite gezielter als generische Prompt-Optimierung).

**Entscheidung:** Abbruchkriterium "gleiche Fehlertypen wie Mappe 2" TEILWEISE ERFUELLT. Eskalation zu Option A NICHT angemessen — stattdessen gezielte Infrastruktur-Revision (Kategorie 1: Patches + Kategorie 2: Teil-Rebuilds). Neues Abbruchkriterium: Falls Mappe 4 nach Revision erneut BLOCKERs oder >3 wiederkehrende Findings → Option A.

---

## Zeitplan (realistisch)

| Woche | Sessions | Schritte | Meilenstein |
|---|---|---|---|
| 1 | 1-2 | 1, 2, (4 parallel) | Schema + Q-Gate-Mechanik stehen |
| 2 | 3-4 | 3, 5 | Decision-Tree + Dispatcher fertig |
| 3 | 5 | (6), 7 | Validierungs-Gate: Test-Dispatch PASS |
| 4-5 | 6-8 | 8 (Phase 2.0-2.2c) | Mappe 3 Materialien + Aufgaben produziert |
| 5-6 | 9-10 | 8 (Phase 3-4), 9 | Mappe 3 live, Post-Analyse, Mappe-4-Entscheidung |

**Kritischer Pfad:** Schritte 1 → 2 → 3 → 7 → 8 → 9. Schritte 4+5 sind parallel zu 1-3 ausfuehrbar.

---

## Risikomanagement

| Risiko | Wahrscheinlichkeit | Mitigation |
|---|---|---|
| Schema-Definition dauert laenger (Engine-Analyse komplex) | MITTEL | Timebox: 4h. Bei Ueberschreitung: minimales Schema (nur Pflichtfelder), Rest post-Mappe-3. |
| Test-Dispatch (Schritt 7) FAIL trotz Fixes | NIEDRIG | Befunde pruefen: Sind es neue Findings oder alte? Neue → Fix + erneut testen. Alte → Option A. |
| Phase 2.0 (Rahmen) hat eigene Defizite | MITTEL | Vertrag 2.0 bisher nicht reviewed. Vor Schritt 7: Quick-Scan auf VERTRAG_PHASE_2-0. |
| Skill-Split (Schritt 5) erzeugt Regressions | NIEDRIG | plugin-eval als Gate. Alter Skill bleibt als Fallback erhalten. |
| Mappe-3-Produktion zeigt gleiche Fehlertypen wie Mappe 2 | MITTEL | Ist das explizite Abbruchkriterium. Dann Option A — aber mit empirischer Begruendung. |

---

## Governance

- **Jeder Schritt endet mit Commit.** Kein Schritt ohne persistiertes Ergebnis.
- **STATUS.md Frontmatter wird ab Schritt 4 bei jedem Commit aktualisiert.** Vorher: Prosa-Update wie bisher.
- **CHANGELOG.md pro Session**, nicht pro Schritt.
- **Eskalation zu Option A** nur bei empirischem Befund (Schritt 7 FAIL oder Schritt 9 Nacharbeit > 6h), nicht bei Bauchgefuehl.
- **Schritt 6 (Auditrunde)** wird am Ende von Woche 2 entschieden, nicht vorab.
