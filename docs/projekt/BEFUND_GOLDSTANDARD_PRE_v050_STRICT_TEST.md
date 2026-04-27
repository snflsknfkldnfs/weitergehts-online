# BEFUND: Plugin v0.5.0 Validatoren auf Pre-Plugin-Goldstandard

**Datum:** 2026-04-26 (parallel zu Run-4-Setup)
**Ziel:** Wieviel entspricht das manuelle Pre-Plugin-Game `gpg-erster-weltkrieg-ursachen` (2026-03-22, PASS-validiert) den v0.5.0-Hardening-Standards?
**Methode:** Plugin-v0.5.0-Validatoren auf altes Game READ-ONLY laufen lassen.

---

## 1. Anwendbarkeit-Check

| Validator | Anwendbar? | Begruendung |
|---|---|---|
| validate_didaktik_rahmen.py | JA | Markdown-Marker-Extraction, kompatibel |
| validate_inhalts_briefing.py | NEIN | Format-Mismatch: alt = INHALTSBASIS.md, neu = inhalts_briefing.json |
| validate_medien_katalog.py | NEIN | Altes Game hat keinen medien_katalog (Phase-0.2.M kam erst mit Plugin) |
| validate_artefakt_inventar.py | NEIN | Format-Mismatch: alt = MATERIAL_GERUEST_*.md (3 Files), neu = artefakt_inventar.json |
| validate_skript_sk.py | JA | Markdown SKRIPT.md kompatibel |
| check_math_consistency.py | JA | Mit data.json (Phase 3 deployed) |
| check_komposita_erstgebrauch.py | JA | Markdown SKRIPT/MATERIAL kompatibel |

**Aussagekraeftige Tests:** 4 von 7. Format-Drift (alt = .md, neu = .json) erschwert direkten Vergleich fuer Phase 0.2 + Phase 0.3 ARTEFAKT_INVENTAR.

---

## 2. Test-Ergebnisse

### T1: validate_didaktik_rahmen auf altes DIDAKTIK_RAHMEN.md → **rc=2 FAIL**

| Pruefpunkt | Status | Details |
|---|---|---|
| run_id-Marker | **FAIL** | Fehlt komplett (Plugin-Konvention, Goldstandard hat das nicht) |
| schulart-Marker | WARN | Nicht direkt im Header, Heuristik versucht implizite Detektion |
| jahrgangsstufe-Marker | WARN | Nicht direkt im Header |
| F-PB-45 Schulart-Lehrplan | WARN | Schulart-Marker nicht gefunden, kein Match-Test moeglich |
| F-PB-46 Math-Counts (Mappen) | PASS | 4 Mappen gezaehlt, konsistent |

**Befund:** Goldstandard hat **keine standardisierte Header-Struktur** (kein run_id, kein expliziter schulart/jahrgangsstufe-Marker). Plugin v0.5.0 strict-konstruiert. Inhalt-Quality hoch (4 KEs woertlich aus Lehrplan zitiert), Form unstandardisiert.

### T2: validate_skript_sk auf altes SKRIPT.md → **rc=2 FAIL** (1 error, 2 warnings)

| SK-Punkt | Status Goldstandard | Status Run-3 (Vergleich) |
|---|---|---|
| SK1 Handlungsanteil | WARN 49.0% (knapp <50%) | nicht gemessen |
| SK4 Strukturiertheit | **PASS** (26 Sektionen, 114 §-Absaetze) | **FAIL** (0 §-Absaetze) |
| SK5 Sprachniveau | WARN (sprachniveau-gate.js Schwellenverletzung) | WARN |
| SK5 Wortzahl-Chunk-Korridor | **FAIL** (0/7 im 600-900W-Korridor; alle Chunks 380-436W) | FAIL (0/6 im Korridor) |
| SK7 Multikausalitaet | **PASS** (5 Konnektoren ueber 4 Typen) | **FAIL** (0 Konnektoren) |
| SK14 Strukturmarkierung | **PASS** (55 Zwischenueberschriften) | nicht gemessen |
| SK18 Quellenorientierung | **PASS** (72 Quellen-/Material-Verweise) | unklar |

**KERN-BEFUND:**
- **Goldstandard ist deutlich besser als Run-3** in SK4 (§-Absaetze) + SK7 (Multikausalitaet)
- **ABER: SK5-Wortzahl-Korridor 600-900W wird auch im Goldstandard nicht erreicht** (Chunks 380-436W)
- **→ Konsequenz:** SK5-Korridor ist **Vertrag-Issue, kein Generator-Issue**. Auch das Pre-Plugin-Goldstandard erfuellt die VERTRAG_PHASE_0-3 §3.4-Vorgabe nicht. Empfehlung: Vertrag-Anpassung auf realistischen Korridor (ggf. 350-900W) in v0.5.1.

### T3: check_math_consistency auf data.json (Phase 3 assembled) → **rc=1 WARN**

| Pruefpunkt | Status | Details |
|---|---|---|
| mappen_anzahl_consistency | WARN | mappen_anzahl-Feld fehlt im data.json, counted=4 |
| materialien_anzahl_per_mappe | PASS | mappe-1: 9, mappe-2: 6, mappe-3: 5, mappe-4: 5 — alle internal-konsistent |

**Befund:** data.json hat kein explizites `mappen_anzahl`-Feld (Format-Drift gegenueber v0.5.0-Schema). Pflicht-Patch in v0.5.1 oder Run-4: data.json-Schema-Erweiterung um `mappen_anzahl` Pflicht-Feld.

### T4: check_komposita_erstgebrauch auf altes SKRIPT.md → **rc=2 FAIL Coverage 4.9%**

| Vergleich | Coverage |
|---|---|
| Goldstandard (Pre-Plugin) | **4.9%** (8/163 Komposita erklaert) |
| Run-3 (Plugin v0.4.3) | 24.2% (8/33) |
| Schwellwert PASS | >=80% |

**Befund:** Komposita-Erklaerung wird **systematisch unter-adressiert** in beiden Games. Goldstandard schlechter (deutlich mehr Komposita ohne Erklaerung), aber Run-3 auch weit unter Schwelle. Plugin v0.5.0 hat F-PB-44 erstmals strukturell adressiert (VERTRAG_SPRACHNIVEAU_R7 §6 + Validator-Tool). Goldstandard hat das gar nicht thematisiert.

**Strukturelle Konsequenz:** Die Komposita-Erklaerungs-Pflicht ist ein **echtes neues Hardening** in v0.5.0 — kein bestehendes Pre-Plugin-Verfahren wuerde 80%-Schwelle erreichen. Run-4 testet, ob agent-skript v0.5.0 die Schwelle erreicht (vs. Goldstandard 4.9% + Run-3 24.2%).

---

## 3. Strukturelle Erkenntnisse

### S1 — Plugin v0.5.0 ist stricter als Goldstandard in Form-Konventionen

- **run_id** + **schulart/jahrgangsstufe-Header-Marker:** Plugin-Pflicht, Goldstandard ohne
- **mappen_anzahl im data.json:** Plugin-Pflicht (F-PB-46), Goldstandard ohne

**Konsequenz:** Plugin-Validatoren markieren Goldstandard als FAIL/WARN, obwohl Inhalt-Quality hoch ist. Das ist **gewolltes Hardening** — Plugin enforced Reproduzierbarkeit + Audit-Trail, der manuelle Pre-Plugin-Workflow nicht hatte.

### S2 — Goldstandard hat hoehere narrative Quality als Run-3

Empirie SK4/SK7/SK14/SK18:
- SK4: Goldstandard PASS (114 §-Absaetze) vs. Run-3 FAIL (0)
- SK7: Goldstandard PASS (5 Konnektoren) vs. Run-3 FAIL (0)
- SK14: Goldstandard PASS (55 Zwischenueberschriften)
- SK18: Goldstandard PASS (72 Quellen-Verweise)

**Konsequenz:** Plugin v0.4.3 hatte Generation-Layer-Drift (SKRIPTE als Stichpunkt-/Listen-Format). v0.5.0-AGENT_SKRIPT-Patches sollten das beheben. Run-4 = Validation: erreicht v0.5.0 die Goldstandard-narrative-Quality?

### S3 — SK5-Wortzahl-Korridor ist Vertrag-Issue, kein Generator-Issue

Beide Games (Goldstandard + Run-3) erreichen die 600-900W-Korridor-Vorgabe NICHT. Empirisch belegt: VERTRAG_PHASE_0-3 §3.4 ist real zu strict. Empfehlung: v0.5.1-Patch zu lockerem Korridor (z.B. 350-900W) oder differenzierte Korridore pro Mappen-Typ (Hinfuehren/Erarbeiten/Vertiefen/Sichern).

### S4 — Komposita-Erklaerung ist echtes neues v0.5.0-Hardening

Goldstandard 4.9% + Run-3 24.2% — beide weit unter v0.5.0-Schwelle 80%. Plugin v0.5.0 enforced via VERTRAG + Tool ein Quality-Niveau, das im Pre-Plugin-Workflow nie thematisiert wurde. Run-4 testet, ob agent-skript v0.5.0 das erreicht.

---

## 4. Vergleichsmatrix Goldstandard vs. Run-3 vs. (erwartet) Run-4 v0.5.0

| Dimension | Goldstandard | Run-3 v0.4.3 | erwartet Run-4 v0.5.0 |
|---|---|---|---|
| run_id-Header-Marker | NEIN | JA (Plugin v0.4.3+) | JA |
| Schulart-Lehrplan-Konsistenz (F-PB-45) | nicht geprueft | PASS_WARN (Schulart-Drift Run-3 manuell-gepatcht) | PASS via QD-SCHULART-Q-Gate |
| event_date pro Fakt (F-PB-38) | nicht geprueft | FAIL (23 Fakten ohne event_date) | PASS via Schema |
| quellenkritik-Block (F-PB-37) | nicht geprueft | FAIL (16/16 ohne quellenkritik) | PASS via AGENT_MEDIENRECHERCHE-Patch |
| material_kandidaten (F-PB-41) | nicht geprueft | partiell (in Cowork-Patch) | PASS via VERTRAG-Pflicht |
| anker_briefing/tafelbild_knoten/tipp_stufen_slot (F-PB-42) | NEIN | partiell (Cowork-Patch) | PASS via Schema |
| SK4 §-Absaetze | PASS (114) | FAIL (0) | PASS (erwartet) |
| SK7 Multikausal-Konnektoren | PASS (5) | FAIL (0) | PASS (erwartet, agent-skript-Patch) |
| SK5-Wortzahl-Korridor | FAIL (0/7) | FAIL (0/6) | wahrscheinlich FAIL (Vertrag-Issue) |
| Komposita-Coverage (F-PB-44) | FAIL 4.9% | FAIL 24.2% | erwartet >=80% |
| Math-Consistency (F-PB-46) | WARN (mappen_anzahl fehlt in data.json) | PASS (post-Cowork-Patch P8) | PASS via Hook |

---

## 5. Backlog-Empfehlungen aus diesem Befund

| ID | Severity | Inhalt |
|---|---|---|
| F-PB-50-NEW | LOW | data.json-Schema um Pflicht-Feld `mappen_anzahl` ergaenzen (Phase-3-Assembly-Verify-Tool + post-assemble-math-check Hook fuer assembled Output) |
| F-PB-51-NEW | MED | VERTRAG_PHASE_0-3 §3.4 Wortzahl-Korridor evaluieren — empirisch belegt 0/X bei beiden Games. Anpassung auf realistischen Korridor (350-900W) ODER differenzierte Korridore pro Mappen-Typ |
| F-PB-52-NEW | LOW | Backward-compat-Validator-Modus fuer Pre-Plugin-Goldstandard-Files (akzeptiert fehlende run_id/schulart-Header als WARN statt FAIL bei explizit `--legacy-mode`) |

---

## 6. Vorbedingung fuer Run-4-Eval

**Run-4 sollte zeigen:**
1. Schulart-Lehrplan-Match PASS (F-PB-45 Plugin-Pflicht)
2. SK4 + SK7 mind. Goldstandard-Niveau (PASS)
3. SK5-Wortzahl-Korridor wahrscheinlich FAIL (gleicher Vertrag-Issue) — als WARN markieren, nicht als Plugin-Defekt
4. Komposita-Coverage deutlich >24.2% (Run-3-Stand) — ideal >=80%
5. event_date + quellenkritik + material_kandidaten + anker_briefing/tafelbild_knoten/tipp_stufen_slot ALL PASS via Schema-Layer

**Wenn Run-4 SK4/SK7 erreicht:** Plugin v0.5.0 = Goldstandard-vergleichbar an Generation-Quality (mit Plugin-Hardening-Premium). 

**Wenn Run-4 SK5/Komposita-Schwellen verfehlt:** v0.5.1-Patch (Vertrag-Anpassung + ggf. agent-skript-Prompt-Erweiterung).

---

**Goldstandard-Test abgeschlossen.** Befunde + Backlog-Empfehlungen dokumentiert. Run-4-Eval kann diesen Befund als Vergleichs-Anker nutzen.
