# F0d — DISPATCH-SPIKE-PLAN

**Datei:** `docs/projekt/F0d_DISPATCH_SPIKE_PLAN.md`
**Status:** AKTIV (geplant)
**Erstellt:** 2026-04-20
**Modus:** Spike (zeitlich begrenzt, evidenzbasiert, nicht produktiv)
**Owner:** Paul (Execution) + Cowork-PM (Orchestrierung)
**Bezug:** UPGRADE_PLAN_v3-12 §20 (v1.4-Delta), PRE_PILOT_TRIAGE_MATRIX_v2 §6.1, RA5 F-RA5-11

---

## 1. Hypothese

Technisch präzise Sub-Agent-Dispatches (Cowork Agent-Tool mit Kontext-Isolation) liefern im Vergleich zur aktuellen linearen Prompt-Interpolation:

- **H1 (Output-Varianz):** Geringere strukturelle Varianz zwischen Wiederholungen desselben Sub-Agent-Calls (Stabilität).
- **H2 (Q-Gate-Fail-Detection):** Höhere Fail-Detection-Rate, wenn Q-Gates als eigenständige Agenten mit eigenem Kontext prüfen (kein Self-Check-Bias).
- **H3 (Token-Budget):** Aufwand pro Mappen-Generierung bleibt innerhalb +30 % des Baseline-Budgets (ökonomische Tragfähigkeit).

## 2. Scope (minimal-ausreichend)

**Eingeschränkter Ausschnitt, um Spike kurz zu halten:**

- **1 Sub-Agent:** `SUB_MATERIAL_QUELLENTEXT` (generiert didaktisierten Quellentext für 1 Aufgabe, LB2 oder LB4).
- **1 Q-Gate:** `QG-06 MULTIPERSPEKTIV` (prüft, ob mind. 2 Perspektiven sauber gegenübergestellt sind).
- **1 Thema:** Ein Ausschnitt aus "Nationalismus + Kolonialismus" (bereits im Testrun-Inventar vorhanden).

Keine weiteren Sub-Agents, keine vollständige Mappe, kein Deploy.

## 3. A/B-Methodik

Drei Wiederholungen pro Arm, identische Inputs, identische Schemata.

| Arm | Dispatch | Q-Gate | Kontext |
|---|---|---|---|
| **A (Baseline)** | Linear im Chat (Ist-Zustand) | Linear im Chat nach Output | geteilter Orchestrator-Kontext |
| **B (Agent-Dispatch)** | Cowork Agent-Tool (Task-Call mit isoliertem Kontext) | Cowork Agent-Tool (separater Agent, eigener Kontext) | getrennt: Generator-Agent kennt Q-Gate-Prompt nicht; Q-Gate-Agent kennt Generator-Chain-of-Thought nicht |

## 4. Input-/Output-Schema

### 4.1 Input (identisch für A+B)

```json
{
  "thema": "Nationalismus-Kolonialismus",
  "lernbereich": "LB2",
  "aufgabe_id": "A-SPIKE-01",
  "anforderung": {
    "textlaenge_woerter": [250, 350],
    "perspektiven_min": 2,
    "sprachniveau": "A2-B1 (Mittelschule 7.-9. Jgst)",
    "didaktische_reduktion_stufe": 2
  },
  "quellen_hinweise": ["Primaerquelle P1", "Sekundaerquelle S1"]
}
```

### 4.2 Output (identisch für A+B)

```json
{
  "material_id": "MAT-SPIKE-01",
  "material_typ": "quellentext",
  "text": "...",
  "wortanzahl": 0,
  "perspektiven": ["...", "..."],
  "quellen_nachweis": [],
  "didaktische_reduktion_notizen": ""
}
```

### 4.3 Q-Gate-Return

```json
{
  "qgate_id": "QG-06",
  "pass": true,
  "evidence": {
    "perspektive_1": "",
    "perspektive_2": "",
    "gegenueberstellung_explizit": true
  },
  "begruendung": "..."
}
```

## 5. Metriken

| ID | Metrik | Messverfahren | Schwelle |
|---|---|---|---|
| M1 | Strukturelle Varianz | Schema-Feld-Vollstaendigkeit + Format-Compliance ueber 3 Laufe | A vs B: B ≤ A |
| M2 | Inhaltliche Varianz | Jaccard auf Perspektiv-Token-Set ueber 3 Laufe | informativ |
| M3 | Q-Gate-Fail-Detection | Rate, mit der QG-06 injizierte Fehler (Mono-Perspektive) erkennt | B ≥ A + 20 pp |
| M4 | Token-Verbrauch | Summe In+Out pro Mappen-Generierung | B ≤ 1.3 × A |
| M5 | Rueckmelde-Luecken | Anzahl Faelle, in denen Agent "silently stalls" (RA5 F-RA5-11-Muster) | B ≤ A |

**Fehler-Injektion (M3):** 2 von 3 Laufen erhalten manipuliertes Input (Quellen-Hinweis nur 1 Perspektive) → QG-06 soll fail liefern.

## 6. Gating (PASS/FAIL)

Spike gilt als **PASS**, wenn:

- M1 erfuellt (B strukturell nicht schlechter)
- M3 erfuellt (B Fail-Detection signifikant hoeher)
- M4 erfuellt (Token-Budget tragfaehig)

Sonst **FAIL** → keine Architektur-Investition in F0g, Fokus zurueck auf linearen Prozess + F0f-Feld-Evidenz.

**Mixed (M1+M3 ja, M4 nein):** Bedingter PASS → F0g mit Budget-Restriktion.

## 7. Tools

- **Dispatch-Layer:** Cowork Agent-Tool (`general-purpose` oder spezialisierte Subagents).
- **Kein CC-Handoff:** Cowork-native Dispatch vermeidet Prevent-First-Gate-Narben (argv-Hang, Auth-Gate). CC-Handoff nur reserviert fuer Batch-Mass-Runs ausserhalb F0d-Scope.
- **Logging:** Prompts + Outputs je Lauf in `docs/projekt/testrun-dispatch-spike/` persistieren (Dateinamen `run_A_1.json`, `run_B_1.json` etc.).

## 8. Ablaufplan (1 Arbeitstag)

| Block | Dauer | Schritt |
|---|---|---|
| P1 | 30 min | Input-Kit fixieren (identisches JSON fuer beide Arme, inkl. 2 Fehler-Injektionen) |
| P2 | 60 min | Arm A (Baseline) — 3 Laufe, Logs schreiben |
| P3 | 60 min | Arm B (Agent-Dispatch) — 3 Laufe, Logs schreiben |
| P4 | 45 min | Metriken berechnen, Vergleichstabelle erstellen |
| P5 | 30 min | PASS/FAIL-Entscheidung + Entscheidungsnotiz `docs/projekt/F0d_BEFUND.md` |
| P6 | 15 min | STATUS + CHANGELOG Update + TaskUpdate |

## 9. Deliverables

- `docs/projekt/testrun-dispatch-spike/` — 6 Run-Logs (3 A + 3 B)
- `docs/projekt/F0d_BEFUND.md` — PASS/FAIL, Metriken, Empfehlung
- STATUS-Eintrag + CHANGELOG-Eintrag
- Task #46 → completed (oder blocked mit Evidenz)

## 10. Folgeschritte

- **PASS:** F0g Agent-Dispatch-Refaktor (Task #48) wird entblockt, UPGRADE_PLAN v1.4 PI-DISPATCH-1/2/3 werden in Backlog gezogen.
- **FAIL:** F0g bleibt deferred. PI-DISPATCH-Items erhalten Status `DEFERRED (Spike-FAIL)`, UPGRADE_PLAN §20 Nachtrag.
- **MIXED:** F0g mit reduziertem Scope (nur Q-Gates, nicht Sub-Agents).

## 11. Risiken

| ID | Risiko | Mitigation |
|---|---|---|
| R1 | Cowork Agent-Tool limitiert in Kontext/Tokens | Scope schmal halten (1 Sub-Agent, 1 Q-Gate) |
| R2 | Varianz-Messung zu klein (n=3) → statistisch schwach | Spike ist Richtungsentscheidung, nicht Publikation; n=3 ausreichend fuer Signal |
| R3 | Fehler-Injektion zu offensichtlich → Q-Gate faengt zu leicht | Injektion subtil halten (Perspektive-2 nur 1-2 Saetze, nicht vollstaendig entfernt) |

---

**Status:** v1.0, 2026-04-20
