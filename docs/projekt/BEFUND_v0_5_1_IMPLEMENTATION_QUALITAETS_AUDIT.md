# BEFUND: v0.5.1 Implementation-Qualitäts-Audit

**Datum:** 2026-04-28
**Methode:** 6 parallele general-purpose Subagent-Reviewer (RA1-RA6) gegen `/Users/paulad/escape-game-generator/` v0.5.1-Stand mit Run-4-Empirie als Anker.
**Auslöser:** User-Reflexion — Implementation-Wall-Clock ~5h für 39 Items + 10 Tools + 34 Vertrag-Patches = ~7-8 Min/Item; Verdacht auf oberflächliche Abdeckung.
**Konsolidiertes Verdikt:** **Run-5 NICHT BEREIT.** Phase-D-Erweiterung Pflicht.

---

## §1 RA1 — Vertrag-Tiefgang-Audit

**Ergebnis:** 270 F-PB-Token im Agent-Korpus, aber nach De-Duplikation nur **~24 logische Patches**. Tier-Verteilung: 6 Tier-A + 8 Tier-B + 6 Tier-C.

**Kritische Lücke:** **5 von 6 PFLICHT-HIGH-Items aus dem v0.5.1-Backlog (F-PB-52, F-PB-53, F-PB-58, F-PB-63, F-PB-68) haben KEINEN Vertrag-Patch im Agent-Korpus.** Sie sind ausschließlich in Hooks/Tools verankert, nicht im LLM-Vertrag der Subagents. Das bestätigt den 5h-Wall-Clock-Verdacht: Implementation hat MED/LOW-Schema-Drift-Cluster gewichtet, HIGH-Items strukturell unterabgedeckt.

**Tier-C-Risiko:** F-PB-51, -54, -55, -56, -60, -61 sind explizit als Polish-Sammel-Vertrag gebündelt — keine Enforcement-Wirkung erwartbar.

**Empirie-Verdikt:** Implementation-Tiefgang **MITTEL**, mit signifikanter HIGH-Lücke.

---

## §2 RA2 — Validator-Stress-Test

**Ergebnis pro Tool (10 Tools):**

| Tool | Self-Test | Real-Run-4 | Verdikt |
|---|---|---|---|
| check_hefteintrag_struktur | PASS | erkennt M1+M2-Defekte | **PRODUKTIONSREIF** |
| check_synthese_aufgabe | PASS | erkennt a-2-7+a-4-7 | **PRODUKTIONSREIF** |
| check_rahmen_completeness | PASS | erkennt M2/rahmen leer | **NACHBESSERUNG** (Doku-Drift Stage-Dir vs Final-Dir) |
| **check_img_id_pattern** | **FAIL** | **False-Negative** | **DEFEKT** (HTML-Substring-Walker fehlt) |
| **check_doppelfragen** | **FAIL** | 7/11 erkannt | **NACHBESSERUNG** (Pattern-Liste unvollständig) |
| check_ueberleitung_qualitaet | PASS | 0 Errors, 25 Warnings | **NACHBESSERUNG** (Floskel-Severity zu niedrig) |
| sanitize_json_quotes | PASS | Pair-Symmetrie defekt | **NACHBESSERUNG** |
| post_assembly_browser_smoke | PASS | Stufe-2 Stub | **NACHBESSERUNG** (kein Server-Auto-Start, Render-Stub) |
| migrate_v0_5_0_to_v0_5_1 | PASS | Drift-Fixture OK | **PRODUKTIONSREIF** |
| check_game_meta_completeness | PASS | 4 Warnings | **PRODUKTIONSREIF** |

**Systematischer Defekt:** **8/10 Tools crashen auf malformed-JSON** (kein try/except um `json.load()`). Plugin-Pipeline-Risiko bei korruptem Subagent-Output.

**Verdikt:** Validator-Suite **NICHT produktionsreif**. 1 DEFEKT + 4 NACHBESSERUNG + 1 systematischer Robustness-Bug.

---

## §3 RA3 — Hook-Pipeline-Integration

**Ergebnis:** **25 Hooks** (User-Erwartung 26 — Drift). Doku-Drift CHANGELOG (15) vs. empirisch (17 PostToolUse).

**Block-Verhalten:** Nur **5 von 25 Hooks** sind STRICT (exit 2). 20 sind WARN (exit 1) oder NONE.

**Kritische Defekte:**
- **F-PB-58 (post-assembly-browser-smoke)** ist WARN statt BLOCK — Spec forderte BLOCK exit 2.
- **F-PB-67 (mcp-pre-verify) NICHT IMPLEMENTIERT** — Zombie-Erwartung (im Backlog umgedeutet zu aufgabe._meta-Whitelist).
- **F-PB-77/78/79/80 keine dedizierten Hooks** — nur indirekt via Browser-Smoke (Single-Point-of-Defense, WARN).
- **8/17 PostToolUse-Hooks ohne `id`** — nicht selektiv abschaltbar/auditierbar.
- **`plugin.json` Version `0.5.0`** — Version-Drift, v0.5.1-Tag steht aus.

**Strukturelle Lücke:** **Kein PreToolUse-Hook für Schema-Validation auf `*data.json`.** PostToolUse kann architektur-bedingt nicht blocken (Tool-Call schreibt durch), Schema-Drift wird zu spät erkannt.

**Verdikt:** Hook-Pipeline **NICHT produktionsreif**.

---

## §4 RA4 — Subagent-Frontmatter-LLM-Wirkungs-Audit

**Korrektur zur Aufgabenstellung:** F-PB-78 ist in **24/24 Subagents** (nicht 19), aber durchgängig **Tier-C-Position** (88-99% des Files).

**F-PB-72 (Pre-Run-State):** **Tier-A**, Top-of-Body L9, wortgleich in 24/24, mit Bash-Probe + Negativ-Klausel + Empirie-Anker. **LLM-Compliance-Wahrscheinlichkeit: HOCH (75-85%).**

**F-PB-78 (Umlaut-Pflicht):** **Tier-C**, im letzten Drittel jedes Files (Position 88-99%), nach 200-800 Zeilen Q-Gates und Schema. **Plus: doppelte Erwähnung** (Kurzform in v3.3-Block + Langform am Ende → Wiederholung-Ignoranz-Risiko).

**Empirie:** Run-4 hatte trotz Plugin-Erwähnung 300+ Pseudo-ASCII-Wörter (Cowork-Bulk-Replace 807). v0.5.1 reproduziert die Schwäche (Tier-C-Position) ohne strukturelle Verbesserung.

**Verdikt:** F-PB-72 wirksam erwartbar. **F-PB-78 LLM-Drift-Risiko bleibt hoch (35-50% Compliance).** Pseudo-ASCII-Rückfall in Run-5 plausibel.

---

## §5 RA5 — Implizite-Qualitäts-Optimierungs-Audit (5 User-Pädagogen-Klassen)

**Alle 5 Klassen NUR DEKLARATIV verankert** (WARN statt BLOCK):

| Klasse | Schicht-Status | Run-5-Verletzungs-Wkt. |
|---|---|---|
| Multi-Kausalität (F-PB-85/86) | Vertrag + Validator-Inline + WARN | **MITTEL (~30-40%)** |
| Synthese-Aufgaben (F-PB-87) | Vertrag + Validator + post-hoc-WARN | **HOCH (~50-60%)** (Hook trifft erst Phase-3, Single-Aufgabe-Files Phase-2.2 ungeprüft) |
| Hefteintrag-Struktur (F-PB-84) | Vertrag + Strict-Validator + WARN | **MITTEL (~25-35%)** |
| Doppelfragen (F-PB-88) | 3 Subagent-Patches + Validator + WARN | **HOCH (~55-70%)** (agent-material-design Phase-1-Author OHNE Patch, Pattern-Liste eng) |
| Überleitungs-Qualität (F-PB-89) | Vertrag + Heuristik-Validator + WARN | **SEHR HOCH (~70-80%)** (5 Floskel-Patterns hardcoded, "Wo noch?"/generische Verweise umgehen Detection) |

**Spezial-Findings:**
- **Synthese-Validator misst Strukturfelder, nicht Verschränkungs-Erkenntnis** — False-Positives auf didaktisch-sinnvolle Aufgaben mit niedriger mat_refs-Count erwartbar.
- **Multi-Kausal-Trigger erkennt nur Stundenfrage-Pattern "Warum war X ein Y?"** — abweichend formulierte Fragen ("Welche Faktoren führten zu X?") fallen durch.

**Verdikt:** Implizite Qualitäts-Optimierung Run-5-effektiv: **NEIN.** Ohne Hook-Hochstufung auf BLOCK + Source-Phase-Hooks bleibt didaktische Tiefe Subagent-Zufall.

---

## §6 RA6 — Run-5-Defekt-Forecast (12 Klassen)

**Aggregat:** 3 ELIMINIERT / 7 TEILWEISE-ELIMINIERT / 4 WAHRSCHEINLICH-PERSISTIERT.

**ELIMINIERT (3):**
- F-PB-53 img_id-Pattern (PreToolUse BLOCK exit 2)
- F-PB-63 rahmen-Vollständigkeit (post-write BLOCK exit 2)
- F-PB-72 state-advance Drift (Tier-A-Frontmatter + pre-phase-transition-gate BLOCK)

**WAHRSCHEINLICH-PERSISTIERT (4):**
- **F-PB-77 mat.inhalt-Engine-Drift** (Run-4 CRITICAL, 9-12/22 broken images) — kein dedizierter Validator, nur Browser-Smoke post-Persist als WARN. **Persistenz-P: 55%.**
- F-PB-85/86 Multi-Kausalität SCPL — Vertrag-only, keine 2./3. Schicht. **P: 65%.**
- F-PB-78 Umlaut/Encoding — Sanitizer post-write idempotent, kein pre-Persist-Block. **P: 45%.**
- F-PB-66/79 Lückentext-Marker — Vertrag + Migration, aber LLM-Drift nicht gefangen. **P: 35%.**

**NEUE-DEFEKT-KLASSEN-RISIKO durch v0.5.1:**
- **N1:** Hook-Pipeline-Reihenfolge-Drift (7 Hooks matchen `*data.json`, 4 anonym) — Fehlermeldungs-Lawine maskiert Root-Cause.
- **N2:** Migration-Skript korrumpiert Live-Daten via Nicht-Idempotenz — kein Schema-Version-Guard.
- **N3:** **Validator-WARN-Inflation** (9 NEUE post-write-Hooks alle exit 1) → LLM-Lerneffekt-Erosion. Run-4 bewies: 9 broken JSONs persistierten **trotz** post-write-Validation.
- **N4:** Subagent-Frontmatter-Overload (24 Patches × N Pflicht-Blöcke) — Frontmatter > ~150 LOC → LLM-Verdrängung der NEUEN Validator-Verträge.

---

## §7 Konsolidiertes Verdikt + Empfehlung

**Run-5-GO/NO-GO: NO-GO ohne Phase-D-Erweiterung.**

**Begründung:** Asymmetrische Schicht-Abdeckung. 3-Schicht-Verankerung nur bei 3/14 Klassen. CRITICAL F-PB-77 ohne dedizierten Validator. WARN-Inflation als systemisches Anti-Pattern. Subagent-Frontmatter-Verdrängung-Risiko durch Tier-C-Position F-PB-78.

**Phase-D-Pflicht-Items vor Run-5 (Aufwand ~1.5-2 PT, ~1 Woche):**

| ID | Item | Begründung |
|---|---|---|
| **D.1** | `check_mat_inhalt_url_only.py` + pre-write-data.json BLOCK | F-PB-77 CRITICAL ohne Validator |
| **D.2** | `check_lueckentext_marker.py` (sucht `{{N}}`-Reste) + pre-write BLOCK | F-PB-66/79 LLM-Drift |
| **D.3** | Browser-Smoke WARN → BLOCK exit 2 | Single-Point-of-Defense für visuelle Drifts |
| **D.4** | Hook-`id`-Pflicht + dokumentierte Reihenfolge | N1-Mitigation |
| **D.5** | `_includes/state-advance-policy.md` zentralisieren + Frontmatter-LOC-Cap 200 | N4-Mitigation |
| **D.6** | F-PB-78 Top-of-Body Re-Position (24 Subagents) | RA4 Tier-C → Tier-A |
| **D.7** | `check_img_id_pattern.py` HTML-Substring-Walker | RA2 DEFEKT |
| **D.8** | try/except um `json.load()` in 8 Tools | RA2 Robustness |
| **D.9** | Migration-Skript Schema-Version-Guard | N2-Mitigation |
| **D.10** | Plugin.json Version-Bump 0.5.0 → 0.5.1 | RA3 Drift |

**Optionale Phase-D-Erweiterung (Run-5-Qualität ↑):**
- F-PB-89 Floskel-Liste 5 → ≥15 Patterns + 4-Komponenten-Pflicht Strict (RA5)
- F-PB-88 Hook-Matcher auf `*aufgabe-*.json` erweitern + agent-material-design Patch (RA5)
- Vertrag-Patches für F-PB-52/F-PB-68 in Agent-Files nachholen (RA1)

**v0.6-Sprung:** **NICHT jetzt.** R1-R5 Roadmap (33-52 PT, 4-6 Monate) korrekt aufgehoben. Engine-Schema-SSoT (R1) würde Klassen 1+11+12 strukturell erschlagen — Phase-D D.1-D.3 sind Brücken-Patches. F-PB-77 ist symptomatisch für R1; D.1 persistiert ohne R1.

---

## §8 Empfehlung Cowork-Aktion

**Nächster Schritt (eindeutig):** Phase-D D.1-D.10 als neuer Track im escape-game-generator-Repo. Aufwand-Plan ~1.5-2 PT. Track-Name: `v0_5_1_PHASE_D_RUN5_VORSICHERUNG`.

**Reihenfolge (kritischer Pfad):**
1. D.7 (img_id-Pattern fix) + D.8 (Robustness) → Validator-Suite stabil
2. D.1 + D.2 (mat.inhalt + lueckentext-Marker neue Validatoren) → CRITICAL-Klassen abgesichert
3. D.3 + D.4 (BLOCK-Eskalation + Hook-id) → Pipeline-Hardening
4. D.5 + D.6 (Frontmatter-Refactor) → LLM-Wirksamkeit
5. D.9 + D.10 (Migration-Guard + Version-Bump) → Release-Readiness

Erst danach: Plugin-Validator-Run + Run-5-Pristine-Test.

---

**Pointer:**
- RA-Berichte: in dieser Datei §1-§6 konsolidiert
- v0.5.1-Spec: `escape-game-generator/docs/projekt/PLUGIN_v0_5_1_HARDENING_SPEC.md`
- v0.6-Roadmap: `escape-game-generator/docs/projekt/PLUGIN_v0_6_ARCHITEKTUR_ROADMAP.md`
- Run-4-Empirie: `weitergehts-online/docs/projekt/BEFUND_RUN4_*.md`
- Plugin-Repo HEAD: `escape-game-generator` commits `37d1446` + `cbe4f14`
