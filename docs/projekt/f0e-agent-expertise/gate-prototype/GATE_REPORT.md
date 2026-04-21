# F0e Schema-Gate — Ist-Gap-Report (Schritt A3)

**Datum:** 2026-04-21
**Validator:** `scripts/validate_material_output.py`
**Schema:** `schemas/material_quellentext_v3.10.2.json` (SHA-256 `632d7b47…a41ffa`, pinned)
**Input-Korpus:** 6 GENERATOR_OUTPUT.json aus F0d-Testrun (runs/A/A_{1,2,3}, runs/B/B_{1,2,3})
**Scope:** `typ=quellentext` (alle 6 Runs behandeln mat-4-3 Trothas Vernichtungsbefehl)

## TL;DR

**0/6 Outputs Draft7-valide.** F0d-M6-Befund repliziert und auf Fehler-Klassen-Ebene zerlegt. 5 primäre Defekt-Klassen identifiziert, davon 2 systemisch (in ≥4/6 Runs), 3 arm-spezifisch. Aggregat: 32 Einzelfehler über 6 Runs.

**Zentrale Erkenntnis:** Schema-Gate legt **zwei strukturell unterschiedliche Defekte** offen:
1. **Generator-seitig (Subagent):** `perspektiv_tags` (Extra-Field), `quellentyp="primaerquelle"` (Enum-Drift)
2. **Dispatcher-seitig:** In Arm B fehlen Top-Level-Struktur-Felder (`quelle`, `position`, `voraussetzung`, `ueberleitung_von`, `sequenz_kontext`) — also Felder, die laut Vertrag der **Dispatcher** aus MATERIAL_GERUEST ergänzt (`SUB_MATERIAL_QUELLENTEXT.md` Zeile 249: "Struktur-Felder … werden vom Dispatcher ergaenzt"). Der Generator-Output wurde im F0d-Spike ohne Dispatcher-Merge persistiert.

Damit ist der F0d-Output-Snapshot genau genommen **Subagent-Partial**, nicht finales Material. Das hat Konsequenzen für F0e (siehe §6).

## 1 Per-Run Übersicht

| Run | valid | errors | Klassen |
|-----|-------|--------|---------|
| A_1 | FAIL | 3  | ONEOF_MISMATCH×2, UNKNOWN_FIELD×1 |
| A_2 | FAIL | 5  | UNKNOWN_FIELD×2, ONEOF_MISMATCH×2, WRONG_TYPE×1 |
| A_3 | FAIL | 8  | MISSING_REQUIRED×4, UNKNOWN_FIELD×1, ENUM_VIOLATION×1, ONEOF_MISMATCH×1, WRONG_TYPE×1 |
| B_1 | FAIL | 9  | MISSING_REQUIRED×5, UNKNOWN_FIELD×1, ENUM_VIOLATION×1, ONEOF_MISMATCH×1, WRONG_TYPE×1 |
| B_2 | FAIL | 7  | MISSING_REQUIRED×5, UNKNOWN_FIELD×1, ENUM_VIOLATION×1 |
| B_3 | FAIL | 7  | MISSING_REQUIRED×5, UNKNOWN_FIELD×1, ENUM_VIOLATION×1 |

**Beobachtung:** Arm A konsistenter (3–8 Fehler), Arm B ballt sich (7–9 Fehler). Arm B liefert offenbar einen schmaleren Partial, der ohne Dispatcher-Merge mehr Required-Felder fehlen lässt.

## 2 Aggregierte Fehler-Klassen (alle 6 Runs)

| Klasse | Σ | Betroffen | Interpretation |
|--------|---|-----------|----------------|
| MISSING_REQUIRED | 19 | 4/6 | Top-Level-Felder fehlen (Dispatcher-Gap in Arm B + A_3) |
| UNKNOWN_FIELD    | 7  | 6/6 | `perspektiv_tags` (6/6), diverse Alt-Namen (A_2/A_3/B_1/B_2/B_3) |
| ONEOF_MISMATCH   | 6  | 4/6 | `sequenz_kontext.vorher/nachher` als String statt Objekt; `inhalt` als Objekt statt String |
| ENUM_VIOLATION   | 4  | 4/6 | `_meta.quellentyp` taxonomische Drift |
| WRONG_TYPE       | 3  | 3/6 | `_meta.perspektive` als Array (A_2); `inhalt` als Objekt (A_3, B_1) |

## 3 Systemische Defekt-Muster (6/6 oder ≥4/6)

### 3.1 UNKNOWN_FIELD: `perspektiv_tags` (6/6, Location-Drift)
Alle 6 Runs fügen `perspektiv_tags: [...]` ein, aber an unterschiedlicher Position:
- **In `_meta`:** A_1, A_2 (2/6, Arm-A-Muster)
- **Top-Level:** A_3, B_1, B_2, B_3 (4/6, Arm-B-Muster + A_3-Drift)

Schema v3.10.2 kennt dieses Feld an keiner Stelle (`additionalProperties: false` an Top-Level und in `_meta`).
**Deutung:** Generator folgt einer älteren oder halluzinierten Konvention. Das Feld existiert in keinem der gelesenen Vertragsdokumente explizit. Hypothese: Legacy aus Pre-T2-Ära oder Namens-Kollision mit `perspektiv_inventar.json`-Schema. Die Location-Drift (`_meta` vs Top-Level) korreliert mit dem Dispatch-Modus (Arm A behält _meta-Position, Arm B lifts to top).
**Konsequenz für F0e:** Overlay §1-D1 muss das Feld an BEIDEN Positionen explizit verbieten.

### 3.2 ENUM_VIOLATION: `_meta.quellentyp="primaerquelle"` (4/6)
A_3/B_1/B_2/B_3 liefern `quellentyp="primaerquelle"` oder `"primaerquelle_erlass"`. Schema-Enum: `verordnung | brief | tagebuch | zeitungsartikel | amtlich | augenzeugenbericht | propaganda | statistik | sonstiges`.
**Deutung:** Taxonomie-Drift. Das Subagent-Prompt beschreibt die Enum-Werte korrekt (Zeile 275 SUB_MATERIAL_QUELLENTEXT.md inkl. Migrations-Mapping alter Werte). Generator ignoriert die Enum-Beschränkung.
**Konsequenz für F0e:** Spike muss prüfen, ob eine formalisierte Enum-Exposition (Schema-Excerpt im Prompt) die Compliance erhöht.

### 3.3 MISSING_REQUIRED Top-Level (Arm B dominant)
In 4/6 Runs (A_3 + alle 3 B-Runs) fehlen top-level: `quelle`, `voraussetzung`, `ueberleitung_von`, `sequenz_kontext` (jeweils), teils `position`.
**Deutung:** Output ist **Subagent-Partial**, nicht Dispatcher-gemergte Endform. F0d hat den Subagent-Return direkt als `GENERATOR_OUTPUT.json` gespeichert, ohne MATERIAL_GERUEST-Merge.
**Konsequenz für F0e:** Gate muss zweistufig validieren: (a) Partial-Schema (nur Content + `_meta` required) für Subagent-Output, (b) Full-Schema (v3.10.2) für post-Dispatcher-Output.

## 4 Arm-spezifische Defekte

### Arm A (A_1, A_2)
- `sequenz_kontext.vorher/nachher` als **String** statt `{id, typ, kerninhalt}`-Objekt.
  - Deutung: Generator kollabiert Objekt-Struktur zu menschenlesbarer Zusammenfassung.
  - A_1: 2 Stellen, A_2: 2 Stellen.
- A_2 zusätzlich: `_meta.perspektive` als **Array** statt String.

### Arm A (A_3 Sonderfall)
- `inhalt` als Objekt `{einleitung, zitat, erlaeuterung, ...}` statt HTML-String.
- Top-Level-Alt-Felder: `entscheidungs_dokumentation`, `ueberleitung`, `game_id`, `mappe`.
- Deutung: A_3 weicht stark vom Schema ab — vermutlich Instruktions-Drift durch Arm-A-Dispatch-Modus (self-check intra-call → Selbstkorrektur hat Feld-Umbau erzeugt).

### Arm B (B_1, B_2, B_3)
- Konsistent: `quelle`, `voraussetzung`, `ueberleitung_von`, `sequenz_kontext` fehlen top-level.
- `perspektiv_tags` 1/Run (statt 2/Run wie A_2).
- B_1 zusätzlich: `inhalt` als Objekt.
- Extra Top-Level: `aufgabenstellung` (B_1/B_2/B_3), `ueberleitung` (B_1).

## 5 Top-10 Fehler-Pfade (Klasse × Pfad)

| # | Klasse | Pfad | Count |
|---|--------|------|-------|
| 1 | MISSING_REQUIRED | `/` (top-level) | 19/6 |
| 2 | UNKNOWN_FIELD | `/` (top-level) | 5/6 |
| 3 | ENUM_VIOLATION | `/_meta/quellentyp` | 4/6 |
| 4 | UNKNOWN_FIELD | `/_meta` | 2/6 |
| 5 | ONEOF_MISMATCH | `/sequenz_kontext/nachher` | 2/6 |
| 6 | ONEOF_MISMATCH | `/sequenz_kontext/vorher` | 2/6 |
| 7 | ONEOF_MISMATCH | `/inhalt` | 2/6 |
| 8 | WRONG_TYPE | `/inhalt` | 2/6 |
| 9 | WRONG_TYPE | `/_meta/perspektive` | 1/6 |

## 6 Implikation für F0e-Spike

### 6.1 Gate-Zweistufigkeit (neu, nicht in Audit)
Der Schema-Gate muss im Spike **zwei separate Validierungs-Hops** haben:

1. **Partial-Gate (post Subagent):** Nur Subagent-Ownership-Felder. Required: `inhalt`, `quelle`, `_meta`. Kein Check auf `id`, `typ`, `titel`, `position`, `didaktische_funktion`, `voraussetzung`, `ueberleitung_von`, `sequenz_kontext` (Dispatcher-Verantwortung). `additionalProperties:false` aktiv — auch im Partial verboten.

2. **Full-Gate (post Dispatcher-Merge):** Vollschema v3.10.2 inkl. `allOf`-Branches. Hier fängt man Dispatcher-Merge-Bugs.

Der F0d-Korpus konnte nur 1/2 Hops testen (Partial), weil der Dispatcher-Merge im Spike nicht lief. F0e muss **beide Hops scharf schalten**, sonst wiederholt sich die F0d-Lücke.

### 6.2 Entry-Criterion-Vorschlag für F0e-Iteration 1

Vor Iteration-Start:
- [ ] Partial-Schema-Extraktion (Subset des v3.10.2) als separates JSON-Schema bauen.
- [ ] Dispatcher-Merge-Logik aus `AGENT_MATERIAL.md` skriptieren (Partial + MATERIAL_GERUEST → Full-Material).
- [ ] Iteration-1-Run liefert: (a) Partial → Partial-Gate PASS, (b) Merged → Full-Gate PASS.
- [ ] Bei Fail in einer Stufe: max 1 Re-Dispatch mit konkretem Fehler-Diff als Prompt-Annex. Bei zweitem Fail → HALT, Root-Cause-Analyse.

### 6.3 Erwartete Hauptbaustellen (priorisiert nach Frequenz)
1. **`perspektiv_tags` eliminieren** (6/6) — Subagent-Prompt-Hardening.
2. **`quellentyp` Enum-Konformität** (4/6) — Schema-Excerpt in Prompt einbetten.
3. **`sequenz_kontext.vorher/nachher` Objekt-Shape** (4/6 in A) — Dispatcher-Merge-Logik korrekt.
4. **`inhalt` String vs. Objekt** (3/6) — Eindeutige Typ-Constraint im Prompt.
5. **`_meta.perspektive` String vs. Array** (1/6) — Monitoring, nicht blocker.

### 6.4 Was der Gate NICHT misst
- Didaktische Qualität (User-Layer).
- Inhaltliche Richtigkeit (Q10 Historische Korrektheit).
- Q-Gates MQ2/Q1-Q10 aus Sub-Agent-Doku (semantisch, nicht strukturell).
- Strukturstabilität (Jaccard, für F0e gesondert zu messen).

## 7 Vergleich zu F0d-M6

| Aspekt | F0d-M6 | F0e Gate |
|--------|--------|----------|
| Aussage | 0/6 valid (self-declared 6/6 PASS) | 0/6 valid (identisch, jetzt mit Fehler-Zerlegung) |
| Fehler-Typen benannt? | Nein, nur Pass-Rate | Ja, 5 Klassen × Per-Run × Pfad |
| Systemik-Attribution | Nein | Ja (Dispatcher vs. Generator getrennt) |
| Gate-Prototyp? | Nein | Ja, deterministisch wiederholbar |

F0e-Gate ersetzt damit den Self-Check (H4 bestätigt negativ) durch harten Validator. Voraussetzung für jede sinnvolle F0e-Iteration.

## 8 Rolle im Gesamt-Weg

| Schritt | Status | Ergebnis |
|---------|--------|----------|
| A1 — Schema-Pin | DONE | `material_quellentext_v3.10.2.json` gepinned, SHA gehasht |
| A2 — Validator | DONE | `validate_material_output.py`, Draft7, JSON- + Human-Report |
| A3 — F0d-Regression Full-Gate | DONE | 0/6 valid, 32 Einzelfehler, 5 Klassen |
| B1 — Partial-Schema | DONE | `material_quellentext_partial_v3.10.2.json`, Draft7-selbst-valide |
| B2 — Prompt-Hardening-Overlay | DONE | `overlays/PROMPT_HARDENING_QUELLENTEXT.md`, Shadow-Pattern |
| B3 — Dispatcher-Merge-Skript | DONE | `scripts/merge_material.py`, Ownership-Check + Merge |
| B4 — Partial-Gate-Regression | DONE | 0/6 valid, aber nur 13 Einzelfehler (Isolation erfolgreich) |

## 9 Partial-Gate-Befund (Subagent-Isolation)

Nach Extraktion der Subagent-Ownership-Felder (`inhalt`, `quelle`, `_meta`) aus den F0d-Outputs zeigt der Partial-Gate **nur die Subagent-Defekte**, isoliert von Dispatcher-Lecks.

| Run | valid | errors | Klassen |
|-----|-------|--------|---------|
| A_1 | FAIL | 1 | UNKNOWN_FIELD=1 |
| A_2 | FAIL | 2 | UNKNOWN_FIELD=1, WRONG_TYPE=1 |
| A_3 | FAIL | 3 | MISSING_REQUIRED=1, ENUM_VIOLATION=1, WRONG_TYPE=1 |
| B_1 | FAIL | 3 | MISSING_REQUIRED=1, ENUM_VIOLATION=1, WRONG_TYPE=1 |
| B_2 | FAIL | 2 | MISSING_REQUIRED=1, ENUM_VIOLATION=1 |
| B_3 | FAIL | 2 | MISSING_REQUIRED=1, ENUM_VIOLATION=1 |

**Aggregat Partial-Gate:** MISSING_REQUIRED=4, ENUM_VIOLATION=4, WRONG_TYPE=3, UNKNOWN_FIELD=2. **Gesamt 13 Fehler** (Full-Gate: 32).

**Interpretation:**
- **19 der 32 Fehler (59%)** sind Dispatcher-Ownership-Lecks (Top-Level MISSING_REQUIRED durch fehlenden Merge). Nach Partial-Extraktion verschwinden sie — Subagent hatte diese Felder nie zu liefern.
- **Echte Subagent-Defekte:** 13 Fehler, davon dominant:
  - `quellentyp="primaerquelle"` Enum-Drift (4/6, Arm B + A_3)
  - `quelle` fehlt (4/6, Arm B + A_3) — kritisch, da Subagent-Ownership
  - `inhalt` als Objekt statt String (3/6, A_2/A_3/B_1)
  - `perspektiv_tags` in `_meta` (2/6, nur A_1/A_2 Arm A)
  - `perspektive` als Array (1/6, A_2)

**Neue Erkenntnis:** Arm B liefert keine `quelle` in 3/3 Runs. Das ist ein echter Subagent-Defekt (keine Dispatcher-Frage), sondern der Subagent ignoriert in Arm B die `quelle`-Pflicht. Hypothese: Isoliertes Dispatch in Arm B kürzt Subagent-Prompt oder Subagent interpretiert `quelle` als vom Dispatcher gestellt (Verwechslung mit `artefakt_ref`).

**Konsequenz:** Overlay §1 D0 (Ausgabe-Kontrakt) muss `quelle` explizit als Subagent-Ownership fordern. Bereits im aktuellen Overlay abgedeckt (§1 fordert implizit über Schema-Excerpt).

## 10 Nächster Schritt (User-Freigabe nötig)

**Schritt A + Schritt B abgeschlossen.** Gate-Prototyp + Overlay + Merge-Skript + Partial-Schema liegen als Spike-Lokal-Artefakte vor.

Für F0e-Iteration 1:

**Option C1 — Plan-Dokument jetzt aufsetzen:**
- `F0e_AGENT_EXPERTISE_SPIKE.md` analog F0d v2.1 (Scope, Methodik, Iterations-Gate, Deliverables, Akzeptanz-Kriterien, Risiko-Katalog).
- Entry-Criterion: Partial-Gate PASS + Full-Gate PASS nach Dispatcher-Merge.
- Iteration-1-Target: Re-Generierung mat-4-3 mit Overlay aktiv → Vergleich gegen existierendes `artefakte/.../mat-4-3.json`.
- Stop-Gate: 2 aufeinanderfolgende Fails → HALT.
- Didaktik-Review-Protokoll (User-Layer nach Gate-PASS).

**Option C2 — Erst Dispatcher-Context für mat-4-3 extrahieren:**
- Aus `artefakte/deutscher-nationalismus-kolonialismus/mappe-4/materialien/mat-4-3.json` (baseline) + `mappe-4/ueberleitungen.json` einen `dispatcher_context_mat-4-3.json` bauen.
- Dient als Fixtur-Eingabe für Merge-Skript in Iteration 1.
- Aufwand: 30 Min. Reduziert Iteration-1-Setup-Kosten.

**Empfehlung:** C2 zuerst (kleiner Prep-Schritt), dann C1 (Plan). Oder parallel: Plan referenziert Dispatcher-Context-Extraktion als Iteration-1-Preface-Task.

**Entscheidung:** Plan jetzt (C1), Context-Fixtur zuerst (C2), oder parallel?
