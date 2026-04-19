# HANDOFF CC-F0b v1 — Scripts, Schemata, Engine-Fix

**Erstellt:** 2026-04-19
**Ziel-Instanz:** Claude Code via `tools/cc-launch.sh` (headless + Dashboard empfohlen fuer Batch-Execution).
**Ziel-Repos:** (A) Generator-Repo `escape-game-generator/`, (B) Live-Site-Repo `weitergehts-online/`.
**Auftragsgrund:** F0b.2 Mechanismen-Implementierung erfordert 8 neue Scripts, 6 Schema-Erweiterungen, 1 Engine-Fix. Cowork (PM) hat Vertraege, Priming-Include, Registry, Configs und Checklist bereitgestellt — die Ausfuehrungs-Artefakte gehoeren in CC-Ownership.

---

## KONTEXT-BLOCK

**Bereits durch Cowork (PM) abgeschlossen (Quellen-Artefakte):**
- `agents/_includes/F0B_PRIMING_INCLUDE.md` (v1.0, canonical hash siehe Registry)
- `architektur/sprachniveau_include_registry.json`
- `architektur/trigger_keywords.json`
- `architektur/perspektiv_enum.json`
- `architektur/kolonial_terminologie_blacklist.json`
- `architektur/wortschatz_r7_core.json`
- VERTRAG-Updates in `architektur/vertraege/VERTRAG_PHASE_0-2_INHALT.md`, `VERTRAG_PHASE_2-0_RAHMEN.md`, `VERTRAG_PHASE_2-1_MATERIAL.md`, `VERTRAG_PHASE_2-1b_DIDAKTIK_REVIEW.md`, `VERTRAG_PHASE_3_ASSEMBLY.md`, `VERTRAG_PHASE_3-1_DEPLOY.md`
- Priming-Include-Header in 22 Agent-Prompt-Dateien
- `docs/projekt/E2E_PILOT_CHECKLIST_v3-12.md`

**Nicht-Ziel:** CC macht KEINE Inhaltsproduktion (keine Escape-Game-Assembly im Scope dieses Handoffs). Scope ist reiner Infrastruktur-Build.

---

## TASK-BLOCK A1 — Scripts (8 Stueck)

**Ablage:** `escape-game-generator/tools/` (mit chmod +x). Alle Scripts geben Exit-Code 0 bei PASS, 1 bei FAIL, 2 bei Script-Bug.

### A1.1 `scripts/source-deploy-parity.sh <game-id>`
Hash-Vergleich zwischen source-`escape-games/<game-id>/data.json` (git-HEAD) und deployed data.json (Pages-Build URL oder lokal gerenderter Build-Output). Ausgabe: `SOURCE_SHA256=... DEPLOY_SHA256=... MATCH=yes|no`. Referenz: VERTRAG_PHASE_3-1_DEPLOY §2.2 DEPLOY-07.

### A1.2 `scripts/trigger-detector.sh <inhaltsbasis-path>`
Liest INHALTSBASIS.json, scant title+lp_anker+sachanalyse.text gegen `architektur/trigger_keywords.json`. Gibt JSON-Array `trigger_categories[]` auf stdout + schreibt es in INHALTSBASIS-Header (optional via --write). Referenz: VERTRAG_PHASE_0-2_INHALT §3.4 QI-TD.

### A1.3 `tools/titel-validator.js <inhaltsbasis-path>`
Node-CLI. Prueft R-TITEL-1 (Praezision), R-TITEL-2 (LP-Anbindung via lp_anker), R-TITEL-3 (Perspektiv-Neutralitaet). Regeln:
- R-TITEL-1: Titel enthaelt LB-kanonischen Terminus; keine Marketing-Keywords (z.B. "spannend", "cool", "super")
- R-TITEL-2: lp_anker enthaelt min 1 LB-ID-Referenz + 1 Kompetenzerwartungs-Referenz
- R-TITEL-3: Titel enthaelt keine dominanz-reproduzierenden Begriffe (Abgleich gegen kolonial_terminologie_blacklist.json + heuristische Herrscher-Vokabel-Liste)

### A1.4 `tools/sprachniveau-gate.js <file-or-dir>`
Node-CLI. Liest Text-Artefakte (materialien/*.json, aufgaben/*.json, hefteintrag/*.json, skript/*.json/*.md) und berechnet pro Text-Feld:
- Ø Satzlaenge (Wortzahl / Satzanzahl) ≤ 15
- max Satzlaenge ≤ 25 (pro Satz)
- Fachwort-Dichte ≤ 12% (Anteil Woerter aus `wortschatz_r7_core.r7_fachwoerter_lexikon.*` an Gesamt-Wortzahl; zweite Erwaehnungen zaehlen nicht)
- Morpheme pro Wort ≤ 4 (Heuristik: Silben-Schaetzung + `morphem_heuristik.trennungs_signale`)
- Nominalstil-Anteil ≤ 20% (Anteil Woerter mit `nominalstil_endungen.marker`)
- Konjunktiv-Anteil ≤ 5% (Saetze mit `konjunktiv_marker.formen`)

Primaerquellen-Ausnahme: Felder mit `is_original_zitat=true` werden uebersprungen. Output: Report pro File mit FAIL-Zeilen + Aggregat. Referenz: F0B_PRIMING_INCLUDE §1, VERTRAG_PHASE_3_ASSEMBLY V17.

### A1.5 `scripts/coverage-report.sh <scope>`
Aggregiert `material.perspektiv_tags[]` pro Mappe aus `escape-games/<scope>/materialien/*.json`. Loadet `perspektiv_enum.json`. Ausgabe:
- Pro Mappe: Zaehlung pro `pool` (dominant vs nicht_dominant)
- QG-06-Check bei aktiver Trigger-Kategorie (gelesen aus INHALTSBASIS.trigger_categories): min 2 nicht-dominant-Materialien pro Mappe.
- Zusaetzlich: Erzeugen von `registry/perspektiv_inventar.json` pro Mappe (aggregierte Tag-Liste fuer multiperspektiv-sanity.js).

### A1.6 `tools/entity-scanner.js <scope>`
Node-CLI. Scant skript/*.md|*.json, materialien/*.json, hefteintrag/*.json, aufgaben/*.json nach Eigennamen + Datumsangaben. Erzeugt/aktualisiert `escape-games/<scope>/registry/entities.json`. Unterstuetzt `--cross-mappe` fuer Entity-Konsistenz-Check ueber Mappen (Ueberleitung-01 V14, F0B_PRIMING_INCLUDE §4).

### A1.7 `scripts/terminologie-scanner.sh <file-or-dir>`
Scant Text-Felder gegen `architektur/kolonial_terminologie_blacklist.json`. Respektiert Primaerquellen-Ausnahme (is_original_zitat=true). FAIL listet Fundstelle + vorgeschlagene Alternativen aus Blacklist-Eintrag. Referenz: F0B_PRIMING_INCLUDE §3, V18.

### A1.8 `tools/multiperspektiv-sanity.js <scope> <mappe-n>`
Node-CLI. Liest `perspektiv_inventar.json` + `mappenabschluss_mappe_<N>.json`. Prueft: Bei aktiver Trigger-Kategorie (INHALTSBASIS) muss min 1 reflexion_frage der Mappe explizit eine Nicht-Dominant-Perspektive aus perspektiv_inventar adressieren (keyword-match auf Enum-Label + Nicht-Dominant-Pool). Referenz: F0B_PRIMING_INCLUDE §5, V19.

### A1.9 Ergaenzung `tools/deploy-check.sh` (vorhanden, erweitern)
Bisher DEPLOY-01..06. Ergaenzen um DEPLOY-07 (Aufruf `scripts/source-deploy-parity.sh`). Bei MATCH=no: Exit 1 mit Diagnose.

### A1.10 Zusatz `tools/priming-hash-check.sh` (V16)
Liest `architektur/sprachniveau_include_registry.json`. Computet sha256 von `agents/_includes/F0B_PRIMING_INCLUDE.md`. Vergleich mit `canonical_hash_sha256`. Optional `--strict` checkt dass alle Konsumenten-Prompts den Marker-Block `[F0B_PRIMING_v1 BEGIN ... END]` enthalten. FAIL = Drift.

---

## TASK-BLOCK A2 — Schema-Erweiterungen (6 Stueck)

**Ablage:** `architektur/schemata/`. JSON-Schema draft 2020-12. Backwards-Compatible wenn moeglich (neue Felder required nur wenn notwendig).

### A2.1 `material_source.json`
Schema fuer Quellen-Material (Originalzitat-Scope). Pflichtfelder:
- `is_original_zitat: boolean` (true = Primaerquellen-Ausnahme aktiv)
- `quellenangabe: string` (Autor, Werk, Jahr, Archiv)
- `perspektiv_tags: array of perspektiv_enum.id` (min 1, max 3, Enum-Validierung)
- `kontextualisierung: { vorwort, glossar[], kritische_einordnung }` (Pflicht wenn is_original_zitat=true)

### A2.2 `material_text.json`
Schema-Erweiterung fuer Darstellungstext/Tagebuch/Statistik/Karte/Bildquelle/Zeitleiste (shared base). Pflichtfelder:
- `perspektiv_tags: array of perspektiv_enum.id` (min 1, max 3)
- Bestehende Felder bleiben.

### A2.3 `entities.json` (Registry-Schema)
Schema fuer Entity-Registry pro Scope. Struktur:
```
{
  "personen": [ { "name", "variants": [], "erste_mappe", "kontext" } ],
  "orte": [ ... ],
  "ereignisse": [ { "name", "jahr", "variants": [] } ],
  "daten": [ { "datum", "ereignis" } ]
}
```
Enforcement durch entity-scanner.js.

### A2.4 `mappe_metadata.json`
Erweiterung der Mappe-Metadaten-Struktur um:
- `trigger_categories_active: array` (kopiert aus INHALTSBASIS.header.trigger_categories, Subset wenn Mappe-bezogen einschraenkt)
- `perspektiv_inventar_ref: string` (Pfad zu perspektiv_inventar.json dieser Mappe)

### A2.5 `glossar_template.json`
Schema fuer Glossar-Eintraege in Materialien (insb. Primaerquellen). Pflichtfelder:
- `begriff: string`
- `erklaerung_r7: string` (R7-Sprache, max 25 Wort/Satz)
- `alternative_begriffe: array` (bei kolonialsprachlichen Begriffen Pflicht, Alternativen aus Blacklist referenzieren)

### A2.6 `perspektiv_inventar.json`
Schema fuer pro-Mappe-Aggregation. Struktur:
```
{
  "mappe_n": integer,
  "tags_aggregiert": [ { "enum_id", "pool", "material_ids": [] } ],
  "nicht_dominant_count": integer,
  "qg06_pass": boolean
}
```
Erzeugt durch coverage-report.sh.

---

## TASK-BLOCK A3 — Engine-Fix

### A3.1 `escape-engine.js:2814` + Jest-Test
Ausgangspunkt: Issue aus N-K-Testrun (Mappe 3 Hefteintrag-Verschachtelung, F-RA1-06). Engine rendert `scpl.knoten[].kinder[]` nicht, wenn Parent-Knoten selbst `merksatz`-Feld fehlt. Fix:
- Line 2814 — Rekursions-Logik so anpassen, dass fehlende merksatz-Felder kein `return null` ausloesen, sondern Parent-Knoten als Container gerendert wird und kinder[] trotzdem iteriert werden.
- Regressionsweg: Check in SUB_ASSEMBLY_VERIFY V13 bleibt bestehen (Verschachtelung bleibt Vertragsdefekt), ABER die Engine rendert nicht ins Leere wenn V13 irrtuemlich leakt.
- Jest-Test: `tests/engine.hefteintrag-nested.test.js` — fixture mit 2-Ebenen-SCPL, Assertions gegen DOM-Output (beide Ebenen sichtbar).

---

## TASK-BLOCK A4 — Priming-Include-Mechanismus

### A4.1 Marker-Tag-Kanon
Pruefen dass in allen 22 Konsumenten (Liste siehe `sprachniveau_include_registry.json:includes[0].konsumenten`) der Block
```
[F0B_PRIMING_v1 BEGIN — ...
...
[F0B_PRIMING_v1 END]
```
praesent ist. Falls ein Agent fehlt: Fehlerbericht an Cowork (PM), NICHT selbst ergaenzen (Prompt-Template ist PM-Ownership).

### A4.2 CI-Hook `tools/priming-hash-check.sh` als Pre-Commit + Assembly-Verify-Step
Bei Push/Merge aufs Main: Hash-Check blockt wenn Drift. Assembly-Verify V16 ruft denselben Check auf.

---

## JSON-KOMPATIBLES RUECKMELDE-PROTOKOLL

Nach Task-Completion bitte Rueckmeldung als JSON:

```json
{
  "batch": "F0b-CC-Handoff-v1",
  "completed": {
    "A1": ["A1.1", "A1.2", "..."],
    "A2": ["A2.1", "..."],
    "A3": ["A3.1"],
    "A4": ["A4.1", "A4.2"]
  },
  "failed": [],
  "skipped": [],
  "notes": [
    "Script X nutzt Node 20+ wegen JSON-Schema-Validator-Abhaengigkeit",
    "Engine-Fix braucht dependent Test-Fixtures in tests/fixtures/..."
  ],
  "artefakte": {
    "tools": ["source-deploy-parity.sh", "..."],
    "schemata": ["material_source.json", "..."],
    "engine_patches": ["escape-engine.js", "tests/engine.hefteintrag-nested.test.js"]
  },
  "next_check": "Cowork E2E-Pilot-Checklist v3.12 Pre-Flight"
}
```

---

## NICHT-ZIELE (Scope-Abgrenzung)

1. **Kein Content-Produktion:** CC generiert KEINE Escape-Game-Inhalte in diesem Handoff.
2. **Keine Vertrag-Aenderungen:** Vertraege sind PM-Ownership. CC-Scripts MUESSEN sich an die Vertrags-Spezifikation halten.
3. **Keine Registry-Aenderungen:** Registry (`sprachniveau_include_registry.json`) ist PM-Ownership; wenn CC feststellt, dass Konsumenten-Liste nicht mit Realitaet matcht → Fehlerbericht, kein Selbst-Fix.
4. **Keine Testrun-Starts:** E2E-Pilot startet erst NACH Close dieses Handoffs via separater Session.
5. **Keine Git-Commit-Strategie-Aenderung:** Kanonisches Host-MCP-Protokoll bleibt; Commits im CC werden ueber etablierten Workflow eingebracht.

---

## REFERENZEN (Handoff-Pflichtlektuere)

1. `docs/projekt/CC_COWORK_INTEROP_LEARNINGS.md` §1 Pre-Flight, §2.0 Modi, §4 Handoff-Template, §7 Recovery
2. `docs/projekt/GIT_WORKFLOW_HOST_MCP.md` (falls CC commit/push selbststaendig)
3. F0B_PRIMING_INCLUDE.md §0-§6 (inhaltliche Spezifikation aller Invarianten)
4. E2E_PILOT_CHECKLIST_v3-12.md (Zielbild der Script-Aufrufe)
5. F0b.1-Matrix v2 (Ableitungs-Grundlage der Mechanismen, falls noch zur Vertiefung benoetigt)
