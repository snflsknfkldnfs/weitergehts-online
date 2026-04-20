# F0d — DISPATCH-SPIKE-PLAN

**Datei:** `docs/projekt/F0d_DISPATCH_SPIKE_PLAN.md`
**Status:** AKTIV (geplant, v2.0 Realitaets-Refaktor)
**Erstellt:** 2026-04-20
**Refaktorisiert:** 2026-04-20 (Realitaets-Refaktor auf echte Artefakt-Basis)
**Modus:** Spike (zeitlich begrenzt, evidenzbasiert, nicht produktiv)
**Owner:** Paul (Execution) + Cowork-PM (Orchestrierung)
**Bezug:** UPGRADE_PLAN_v3-12 §20 (v1.4-Delta), PRE_PILOT_TRIAGE_MATRIX_v2 §6.1, RA5 F-RA5-11, VERTRAG_PHASE_2-1_MATERIAL, SUB_MATERIAL_QUELLENTEXT.md, F0B_PRIMING_INCLUDE.md, material-output-schema.json

---

## 0. Warum v2.0 (Refaktor)

v1.0 hatte minimal-synthetisches Input/Output-Schema. Das ist realitaetsfremd: Der Subagent erwartet laut Prozessstruktur 8 Read-Steps aus dem MATERIAL_GERUEST / INHALTSBASIS / SKRIPT / DIDAKTIK_RAHMEN / hefteintrag.json / einstieg.json / ARTEFAKT_INVENTAR plus den `F0B_PRIMING_v1`-Block und den `perspektiven_policy`-String. Der Output muss dem strict-validierten `material-output-schema.json` entsprechen (inkl. `_meta` als Pflichtfeld mit `artefakt_ref`, `tafelbild_knoten_abgedeckt`, `perspektive`, `trigger_flags`, `aufbereitung`, ggf. `rekonstruktions_begruendung`, `quellenkritische_impulse`, `erarbeitbarkeits_check`).

v2.0 ersetzt das Spielzeug-Schema durch einen **echten Artefakt-Bundle** aus dem produktiven Testrun `deutscher-nationalismus-kolonialismus/mappe-4` (konkreter Fall: `mat-4-3 Vernichtungsbefehl — was "Schutzgebiet" wirklich bedeutete`).

## 1. Hypothese

Technisch praezise Sub-Agent-Dispatches (Cowork Agent-Tool mit Kontext-Isolation) liefern im Vergleich zur aktuellen linearen Prompt-Interpolation:

- **H1 (Output-Varianz):** Geringere strukturelle Varianz zwischen Wiederholungen desselben Sub-Agent-Calls (Stabilitaet).
- **H2 (Q-Gate-Fail-Detection):** Hoehere Fail-Detection-Rate, wenn Q-Gates als eigenstaendige Agenten mit eigenem Kontext pruefen (kein Self-Check-Bias).
- **H3 (Token-Budget):** Aufwand pro Mappen-Generierung bleibt innerhalb +30 % des Baseline-Budgets (oekonomische Tragfaehigkeit).
- **H4 (Schema-Konformitaet):** Strict-Validation (SCHEMA-01 + MQ-STRICT) liegt bei B ≥ A.

## 2. Scope (minimal-ausreichend, realgetreu)

**Ein einziger realer Material-Case:**

- **Game-ID:** `deutscher-nationalismus-kolonialismus`
- **Mappe:** 4 (Kolonialherrschaft + Voelkermord Herero/Nama)
- **Material:** `mat-4-3`
- **Typ:** `quellentext`
- **Titel:** "Vernichtungsbefehl — was 'Schutzgebiet' wirklich bedeutete"
- **TB-Knoten:** `k4-3` (koloniale Gewalt)
- **Artefakt-Ref:** `pq-4-1` (Trothas Vernichtungsbefehl, Oktober 1904)
- **Trigger-Kategorien:** Kolonisierung, Gewalt, Macht-Asymmetrie, Unterdrueckung → MATERIAL-PERSPEKTIV-01 + TERMINOLOGIE-01 aktiv
- **Perspektiven-Policy:** `P1 Deutsche Reichsfuehrung | P2 Frankreich (Kolonialkonkurrenz) | P3 Kolonisierte (Herero/Nama)`
- **Jgst:** 9, Sprachniveau R7 (Mittelschule)
- **Didaktische Funktion:** `erarbeitung`

**Ein Q-Gate:** `QG-06 MULTIPERSPEKTIV` — prueft, ob mindestens zwei Perspektiven sauber gegenuebergestellt sind (M4 + STR-05, bei aktiver Trigger-Kategorie Pflicht).

**Zusatz-Q-Gates (Schema-strict) fuer beide Arme Pflicht:**

- SCHEMA-01 (jsonschema-validate gegen `material-output-schema.json`, Draft7Validator, strict)
- MQ-STRICT (kein Feld-Strip, kein Patch)
- MQ2 (Rekonstruktions-Vorrangregel: pq-4-1 = echte Quelle → `aufbereitung != "echt"` ist nur zulaessig, wenn Kontextualisierung + `rekonstruktions_begruendung` vorhanden; gekuerztes Original = `aufbereitung: "gemischt"`)

Keine weiteren Sub-Agents, keine vollstaendige Mappe, kein Deploy.

## 3. A/B-Methodik

Drei Wiederholungen pro Arm, identischer Input-Bundle (identische Dateien, identische Schemata, identischer Seed-Hinweis), identisches Q-Gate.

| Arm | Dispatch | Q-Gate | Kontext |
|---|---|---|---|
| **A (Baseline)** | Linear im Chat (Ist-Zustand): System- + User-Prompt werden vom Orchestrator-Chat zusammengebaut und inline ausgefuehrt. | Linear im Chat nach Output (Self-Check im gleichen Kontext). | geteilter Orchestrator-Kontext — Generator sieht Q-Gate-Prompt, Q-Gate sieht Generator-Chain-of-Thought |
| **B (Agent-Dispatch)** | Cowork Agent-Tool (Task-Call) mit isoliertem Kontext — Systemprompt = SUB_MATERIAL_QUELLENTEXT.md + F0B_PRIMING_INCLUDE §1+§2+§3, User-Prompt = Input-Bundle (§4.1). | Cowork Agent-Tool zweiter Call: separater Agent, Systemprompt = QG-06-Checker, Input = nur das generierte Material. | getrennt: Generator-Agent kennt Q-Gate-Prompt nicht; Q-Gate-Agent kennt Generator-Chain-of-Thought nicht. |

## 4. Input-/Output-Schema (real, Prozessstruktur-konform)

Beide Arme erhalten den gleichen Artefakt-Bundle. Bundle-Zusammenstellung = Pre-Run (P0).

### 4.1 Input-Bundle (identisch fuer A+B)

Persistierung: `docs/projekt/testrun-dispatch-spike/input_bundle/` (read-only fuer die 6 Runs).

| # | Artefakt | Quelldatei (real, produktiv) | Scope fuer Dispatch |
|---|---|---|---|
| 1 | **MATERIAL_GERUEST-Row mat-4-3** | (Synthese aus `mat-4-3.json` + SKRIPT §4/§5 Mappe 4) | typ, titel, skript_chunk ("§4-§5"), tafelbild_knoten [k4-3], artefakt_ref [pq-4-1], didaktische_funktion=erarbeitung |
| 2 | **SEQUENZKONTEXT** | abgeleitet aus allen 4 Materialien Mappe 4 | vorher=mat-4-2 (darstellungstext Weltpolitik+Marokkokrisen), nachher=mat-4-4 (bildquelle Herero-Foto), VORAUSGESETZTES_WISSEN=[k4-1, k4-2, k4-4], NOCH_NICHT_EINGEFUEHRT=[k4-5+] |
| 3 | **hefteintrag.json (Mappe 4)** | `docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-4/rahmen/hefteintrag.json` | stundenfrage + nur k4-3-Knoten + scpl-Zone gem. SCPL-Zone-Mapping |
| 4 | **SUB_MATERIAL_QUELLENTEXT.md** | `escape-game-generator/agents/SUB_MATERIAL_QUELLENTEXT.md` | vollstaendig als Systemprompt |
| 5 | **F0B_PRIMING_INCLUDE.md** (§1+§2+§3) | `escape-game-generator/agents/_includes/F0B_PRIMING_INCLUDE.md` | wortgleich eingebunden zwischen `[F0B_PRIMING_v1 BEGIN]` und `[F0B_PRIMING_v1 END]` |
| 6 | **SKRIPT-Chunk Mappe 4 §4+§5** | `docs/agents/artefakte/deutscher-nationalismus-kolonialismus/SKRIPT_deutscher-nationalismus-kolonialismus.md` | nur §4 (Trotha entsendet Soldaten, Omaheke) und §5 (Vernichtungsbefehl-Zitate) |
| 7 | **INHALTSBASIS Zitate-Rows** | `docs/agents/artefakte/deutscher-nationalismus-kolonialismus/INHALTSBASIS_deutscher-nationalismus-kolonialismus.md` | F4-4 bis F4-9 + A4-1/A4-2/A4-3 + Fachbegriffe Voelkermord/Vernichtungsbefehl/Landraub |
| 8 | **einstieg.json (Mappe 4)** | `docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-4/rahmen/einstieg.json` | nur `problemstellung` (C1b-Check + narrative Rahmung) |
| 9 | **ARTEFAKT_INVENTAR pq-4-1** | ARTEFAKT_REFS aus mat-4-3 nicht leer → Read-Step 7 aktiv | pq-4-1-Entry (Trotha, Vernichtungsbefehl, 2. Okt 1904, Quelle Wikipedia DE) |
| 10 | **DIDAKTIK_RAHMEN** | `docs/agents/artefakte/deutscher-nationalismus-kolonialismus/DIDAKTIK_RAHMEN_deutscher-nationalismus-kolonialismus.md` | nur Jgst + Sprachniveau-Target R7 + Trigger-Kategorien |
| 11 | **perspektiven_policy-String** | aus MATERIAL_GERUEST Mappe 4 (konflikttyp=true) | `"P1: Deutsche Reichsfuehrung (Trotha) \| P2: Frankreich (Kolonialkonkurrenz) \| P3: Kolonisierte (Herero/Nama als Opfer)"` |
| 12 | **KERNERKENNTNISSE (Read-Step 8)** | didaktische_funktion=erarbeitung → Read-Step 8 **entfaellt** | — |

### 4.2 Priming-Paket pro Arm (neu in v2.0)

**Arm A — Baseline (linear im Orchestrator-Chat):**

```
[Orchestrator-System-Prompt: du bist AGENT_MATERIAL, produziere ein quellentext-Material, halte dich an VERTRAG_PHASE_2-1_MATERIAL, bette SUB_MATERIAL_QUELLENTEXT.md wortgleich ein, halte F0B_PRIMING_v1 ein.]

[User-Prompt: <kompletter Input-Bundle §4.1 als Markdown>]

[AFTER-OUTPUT: Q-Gate QG-06 inline pruefen — Perspektiv-Gegenueberstellung vorhanden? ja/nein + Begruendung.]
```

Die lineare Variante simuliert den heutigen Ist-Zustand: ein einziger langer Chat-Thread mit geteiltem Kontext zwischen Generator, Orchestrator und Q-Gate.

**Arm B — Agent-Dispatch (Cowork Agent-Tool):**

```
Task-Call 1 (Generator):
  subagent_type: "general-purpose"
  system_prompt:  <SUB_MATERIAL_QUELLENTEXT.md vollstaendig>
                  + [F0B_PRIMING_v1 BEGIN ... END]-Block
  user_prompt:    <Input-Bundle §4.1 als Markdown>
  expected_output: JSON-Material konform material-output-schema.json

Task-Call 2 (QG-06-Checker):
  subagent_type: "general-purpose"
  system_prompt:  "Du bist QG-06-MULTIPERSPEKTIV-Pruefer. Du kennst das zu pruefende
                   Material, den perspektiven_policy-String, die Trigger-Kategorien
                   und die F0b-M4-Invariante. Du kennst NICHT die Chain-of-Thought
                   des Generators. Liefere evidenzbasierten PASS/FAIL-Return."
  user_prompt:    <Material-JSON aus Task-Call 1> + <perspektiven_policy>
  expected_output: JSON-Return §4.4
```

Die isolierte Variante simuliert den Ziel-Zustand: separater Kontext pro Rolle, kein Self-Check-Bias.

### 4.3 Erwarteter Output (identisch fuer A+B, schema-strikt)

```json
{
  "id": "mat-4-3",
  "typ": "quellentext",
  "titel": "Vernichtungsbefehl — was 'Schutzgebiet' wirklich bedeutete",
  "inhalt": "<p><em>[R7-konforme Einleitung mit historischer Einordnung]</em></p><blockquote><p>[Vernichtungsbefehl-Zitat, gekuerzt mit [...]]</p></blockquote><p><em>[R7-konforme Nach-Erlaeuterung + Opferzahl + Anerkennung 2021]</em></p>",
  "quelle": "Lothar von Trotha, Vernichtungsbefehl, 2. Oktober 1904. Zitiert nach: Wikipedia — Voelkermord an den Herero und Nama. Gekuerzt. Auslassungen mit [...] gekennzeichnet.",
  "position": 3,
  "didaktische_funktion": "erarbeitung",
  "voraussetzung": ["mat-4-2"],
  "ueberleitung_von": "<R7-konformer Brueckensatz von mat-4-2>",
  "sequenz_kontext": {
    "vorher": {"id": "mat-4-2", "typ": "darstellungstext", "kerninhalt": "Weltpolitik, Marokkokrisen, wachsende Rivalitaet"},
    "nachher": {"id": "mat-4-4", "typ": "bildquelle", "kerninhalt": "Foto gefangener Herero"}
  },
  "_meta": {
    "wortanzahl": <int>,
    "quellentyp": "amtlich",
    "aufbereitung": "gemischt",
    "rekonstruktions_begruendung": "Original-Wortlaut des Vernichtungsbefehls vom 2. Oktober 1904 aus Wikipedia (Voelkermord an den Herero und Nama) uebernommen und gekuerzt (Auslassungen mit [...]). Einleitung und historische Einordnung agent-generiert, um Kontextualisierung fuer R7 zu liefern.",
    "artefakt_ref": ["pq-4-1"],
    "tafelbild_knoten_abgedeckt": ["k4-3"],
    "quellenkritische_impulse": ["<Impuls 1>", "<Impuls 2>"],
    "perspektive": "P1 Deutsche Reichsfuehrung (Trotha) / P3 Kolonisierte (Herero als Opfer)",
    "erarbeitbarkeits_check": "PASS — <Begruendung>",
    "trigger_flags": ["gewalt", "tod"]
  }
}
```

Schema-Reference: `escape-game-generator/architektur/schemata/material-output-schema.json` (Draft7, `additionalProperties: false`, `_meta` required, `MaterialMeta` strict: `wortanzahl`, `perspektive`, `artefakt_ref`, `tafelbild_knoten_abgedeckt`, `trigger_flags` required; bei `aufbereitung != "echt"` auch `rekonstruktions_begruendung` required).

### 4.4 Q-Gate-Return (QG-06)

```json
{
  "qgate_id": "QG-06",
  "pass": true,
  "evidence": {
    "perspektive_1_nachweis": "P1 Deutsche Reichsfuehrung — <Textstelle>",
    "perspektive_2_nachweis": "P3 Kolonisierte — <Textstelle>",
    "gegenueberstellung_explizit": true,
    "nicht_dominant_tag_erreicht": true
  },
  "begruendung": "<2-3 R7-Saetze>"
}
```

## 5. Metriken (erweitert)

| ID | Metrik | Messverfahren | Schwelle |
|---|---|---|---|
| M1 | Strukturelle Varianz | Schema-Feld-Vollstaendigkeit + Format-Compliance ueber 3 Laufe | A vs B: B ≤ A |
| M2 | Inhaltliche Varianz | Jaccard auf Perspektiv-Token-Set ueber 3 Laufe | informativ |
| M3 | Q-Gate-Fail-Detection | Rate, mit der QG-06 injizierte Fehler (Mono-Perspektive) erkennt | B ≥ A + 20 pp |
| M4 | Token-Verbrauch | Summe In+Out pro Material-Dispatch | B ≤ 1.3 × A |
| M5 | Rueckmelde-Luecken | Anzahl Faelle, in denen Agent "silently stalls" (RA5 F-RA5-11-Muster) | B ≤ A |
| **M6** | **Schema-Konformitaet (strict)** | `jsonschema.validate(output, material_output_schema, cls=Draft7Validator)` ohne Strip/Patch | **B ≥ A**, absolut: B ≥ 2/3 Laufe PASS |
| **M7** | **Q-Gate-Coverage (Mechanik-Katalog)** | Pruefung MQ-STRICT + MQ1-MQ6 + M1-M12 + TYP-QUELLENTEXT-Checks (Q-GATE-MECHANIK §7.1) gegen Output | informativ, Nachweis dass Output fortgeschriebene Q-Gates nicht verletzt |
| **M8** | **Didaktische Realitaetsnaehe (qualitativ)** | Paul beurteilt Einsetzbarkeit 1:1 in Mappe 4 des produktiven Games (Skala 1-5) | Signal-Metrik fuer Pilot-Re-Gating, informativ |

**Fehler-Injektion (M3):** 2 von 3 Laufen erhalten manipuliertes Input (`perspektiven_policy` = nur "P1 Deutsche Reichsfuehrung" ohne P3) → QG-06 soll fail liefern, weil M4-Invariante (mind. 2 nicht-dominante Tags) ueber den Material-Text nicht erreichbar waere.

## 6. Gating (PASS/FAIL)

Spike gilt als **PASS**, wenn ALLE erfuellt:

- M1 (B strukturell nicht schlechter)
- M3 (B Fail-Detection signifikant hoeher)
- M4 (Token-Budget tragfaehig)
- **M6 neu (B schema-strict nicht schlechter als A)**

Sonst **FAIL** → keine Architektur-Investition in F0g, Fokus zurueck auf linearen Prozess + F0f-Feld-Evidenz.

**Mixed (M1+M3+M6 ja, M4 nein):** Bedingter PASS → F0g mit Budget-Restriktion.

**Bedingungs-Verschaerfung (v2.0):** Bei `trigger_categories` aktiv (wie hier Kolonisierung) zusaetzlich Nachweis MATERIAL-PERSPEKTIV-01-Coverage PASS in mindestens 2/3 Laufen pro Arm, sonst Gate-FAIL unabhaengig von M1-M6.

## 7. Tools

- **Dispatch-Layer:** Cowork Agent-Tool (`general-purpose` oder spezialisierter Subagent). Parent-Claude wickelt Orchestrierung in Cowork-Session ab.
- **Kein CC-Handoff:** Cowork-native Dispatch vermeidet Prevent-First-Gate-Narben (argv-Hang, Auth-Gate). CC-Handoff nur reserviert fuer Batch-Mass-Runs ausserhalb F0d-Scope.
- **Logging:** Prompts + Outputs je Lauf in `docs/projekt/testrun-dispatch-spike/` persistieren. Dateinamen:
  - `input_bundle/bundle.md` (einmalig)
  - `run_A_1_prompt.md`, `run_A_1_output.json`, `run_A_1_qgate.json`, `run_A_1_metrics.json`
  - analog A_2, A_3, B_1, B_2, B_3
- **Validator:** `scripts/validate-material.py` (neu falls nicht vorhanden) — Draft7 strict, kein Strip.

## 8. Ablaufplan (1 Arbeitstag, erweitert v2.0)

| Block | Dauer | Schritt |
|---|---|---|
| **P0 neu** | 30 min | **Input-Bundle-Beschaffung** — Artefakt-Extrakte aus produktiven Testrun-Quellen + perspektiven_policy + F0B_PRIMING_INCLUDE §1-§3 wortgleich + DIDAKTIK_RAHMEN-Ausschnitt + hefteintrag.json-Slice + einstieg.json-Slice zusammenstellen. Persistierung unter `testrun-dispatch-spike/input_bundle/`. Fehler-Injektions-Variante (mono-perspektivisch) als `bundle_injected.md` zusaetzlich. |
| P1 | 20 min | Input-Kit fixieren (A+B identisch, plus 1 Fehler-Injektions-Variante, Hash-Check) |
| P2 | 60 min | Arm A (Baseline, linear im Orchestrator-Chat) — 3 Laufe, Logs + schema-validate + QG-06-inline |
| P3 | 60 min | Arm B (Agent-Dispatch) — 3 Laufe, Logs + schema-validate + QG-06-isoliert |
| P4 | 45 min | Metriken berechnen M1-M8, Vergleichstabelle |
| P5 | 30 min | PASS/FAIL-Entscheidung + Entscheidungsnotiz `docs/projekt/F0d_BEFUND.md` |
| P6 | 15 min | STATUS + CHANGELOG Update + TaskUpdate |

## 9. Deliverables

- `docs/projekt/testrun-dispatch-spike/input_bundle/` — vollstaendiger realer Artefakt-Bundle (bundle.md + bundle_injected.md + referenzierte Auszuege)
- `docs/projekt/testrun-dispatch-spike/run_{A,B}_{1,2,3}_*.{md,json}` — 6 Run-Logs (Prompt + Output + QGate + Metrics je Lauf)
- `docs/projekt/F0d_BEFUND.md` — PASS/FAIL, Metriken M1-M8, Empfehlung
- STATUS-Eintrag + CHANGELOG-Eintrag
- Task #46 → completed (oder blocked mit Evidenz)

## 10. Folgeschritte

- **PASS:** F0g Agent-Dispatch-Refaktor (Task #48) wird entblockt, UPGRADE_PLAN v1.4 PI-DISPATCH-1/2/3 werden in Backlog gezogen.
- **FAIL:** F0g bleibt deferred. PI-DISPATCH-Items erhalten Status `DEFERRED (Spike-FAIL)`, UPGRADE_PLAN §20 Nachtrag.
- **MIXED:** F0g mit reduziertem Scope (nur Q-Gates, nicht Sub-Agents).

## 11. Risiken

| ID | Risiko | Mitigation |
|---|---|---|
| R1 | Cowork Agent-Tool limitiert in Kontext/Tokens | Input-Bundle knapp halten — nur die 11 Artefakt-Ausschnitte aus §4.1, nicht ganze Dateien |
| R2 | Varianz-Messung zu klein (n=3) → statistisch schwach | Spike ist Richtungsentscheidung, nicht Publikation; n=3 ausreichend fuer Signal |
| R3 | Fehler-Injektion zu offensichtlich → Q-Gate faengt zu leicht | Injektion subtil: nur `perspektiven_policy` beschneiden, Zitat bleibt identisch — Q-Gate muss Fehlen der nicht-dominanten Perspektive im Output eigenstaendig feststellen |
| R4 | Subagent-Output divergiert vom Schema nicht wegen Dispatch-Typ, sondern wegen unklarem Priming | F0B_PRIMING_INCLUDE §1-§3 + SUB_MATERIAL_QUELLENTEXT.md wortgleich in beiden Armen. Differenz nur in Kontext-Isolation, nicht in Prompt-Inhalt |
| R5 | Bundle-Dateien koennten zwischen Runs mutieren | Bundle wird vor Run-Start eingefroren (Git-Commit auf testrun-dispatch-spike/input_bundle/) und SHA-256-Hash in `bundle_hash.txt` hinterlegt. Jeder Run-Log referenziert diesen Hash. |

## 12. Realitaetsnaehe-Checkliste (v2.0)

Dieser Plan ist realitaetsnah nur, wenn:

- [ ] Alle 11 Input-Bundle-Artefakte (§4.1) aus produktiven Quellen stammen, nicht syntetisch konstruiert.
- [ ] F0B_PRIMING_INCLUDE §1+§2+§3 wortgleich eingebunden ist (Hash-Check gegen `F0B_PRIMING_v1`).
- [ ] Output gegen `material-output-schema.json` strict validiert, kein Strip/Patch.
- [ ] QG-06 gegen Ist-Katalog (Q-GATE-MECHANIK §7.1) prueft, nicht gegen eine simplifizierte Ad-hoc-Definition.
- [ ] `perspektiven_policy` korrekt als 3-Eintrag-String uebergeben (STR-05).
- [ ] Trigger-Kategorien aktivieren MATERIAL-PERSPEKTIV-01 + TERMINOLOGIE-01 tatsaechlich im Priming-Block.
- [ ] Fehler-Injektion auf `perspektiven_policy` und nicht auf Zitat (sonst Quellen-Korrumpierung).

---

**Status:** v2.0, 2026-04-20 (Realitaets-Refaktor)

## Aenderungshistorie

| Version | Datum | Aenderung |
|---|---|---|
| 2.0 | 2026-04-20 | Realitaets-Refaktor. Scope auf realen Fall `mat-4-3 Vernichtungsbefehl` Mappe 4 Nationalismus-Kolonialismus. Input-Bundle aus 11 produktiven Artefakten (MATERIAL_GERUEST-Row, SEQUENZKONTEXT, hefteintrag.json, SUB_MATERIAL_QUELLENTEXT.md, F0B_PRIMING_INCLUDE §1-§3, SKRIPT §4+§5, INHALTSBASIS F4-4 bis F4-9, einstieg.json, ARTEFAKT_INVENTAR pq-4-1, DIDAKTIK_RAHMEN, perspektiven_policy). Priming-Paket §4.2 pro Arm explizit. Output-Schema §4.3 gegen material-output-schema.json (Draft7, strict, _meta Pflichtfeld). Neue Metriken M6 Schema-Konformitaet, M7 Q-Gate-Coverage, M8 didaktische Realitaetsnaehe. Gating-Verschaerfung: M6 PASS + MATERIAL-PERSPEKTIV-01-Coverage bei aktiver Trigger-Kategorie. Neuer Block P0 Bundle-Beschaffung (30 min) im Ablaufplan. §12 Realitaetsnaehe-Checkliste. |
| 1.0 | 2026-04-20 | Initial (minimal-synthetisch). |
