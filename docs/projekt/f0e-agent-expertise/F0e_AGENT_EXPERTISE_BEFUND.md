# F0e-AEF — AGENT-EXPERTISE-FORMING-SPIKE — BEFUND

**Datei:** `docs/projekt/f0e-agent-expertise/F0e_AGENT_EXPERTISE_BEFUND.md`
**Status:** BEFUND v1.0 — **MIXED** (I1 PASS, I2 2/3 PASS)
**Erstellt:** 2026-04-21
**Plan-Ref:** `F0e_AGENT_EXPERTISE_SPIKE.md` v1.0
**Runs-Root:** `docs/projekt/f0e-agent-expertise/runs/`
**Bezug:** F0d_BEFUND.md (MIXED, M6-Caveat 0/6 Schema-valide), AUDIT_QUELLENTEXT_CURRENT.md, gate-prototype/GATE_REPORT.md, UPGRADE_PLAN_v3-12 §19 PI-SCHEMA-STRICT-01

---

## 0. Klassifikation

**BEFUND: MIXED.**

Abgleich gegen Plan §12:
- PASS-Kriterium: I1 ≥ 4 Didaktik **UND** Partial+Full Gate beide 0 Fehler **UND** — falls I2 ausgefuehrt — 3/3 PASS. → **NICHT erfuellt** (I2: 2/3 Schema, 2/3 Didaktik).
- MIXED-Kriterium: "I1 PASS, I2 FAIL oder I2 nicht ausgefuehrt wg Budget". → **Erfuellt.** I1 PASS (1/1 Schema + Didaktik 4.4), I2 2/3 Schema-PASS + 2/3 Didaktik ≥ 4.
- FAIL-Kriterium: I1 FAIL nach 2 Patch-Zyklen ODER Didaktik < 3. → **Nicht einschlaegig** (keine Patch-Zyklen noetig, Didaktik-Min 3.8).

**Kern-Aussage:** Shadow-Overlay-Haertung eliminiert die 5 F0d-Baseline-Defekte (D1-D5) reproduzierbar ueber n=4 (100 % Compliance). Die zweistufige Gate-Chain faengt verbleibende Defekte ab, darunter einen **neu sichtbar gewordenen D6** (`_meta.quellenkritische_impulse` WRONG_TYPE), der im F0d-Baseline-Defekt-Pool nicht enthalten war. Schema-Pass-Rate 3/4 = 75 %. Didaktik-Pass-Rate 3/4 = 75 %. Laengen- und Multiperspektivitaets-Varianz bleiben ueber den Overlay hinweg unkontrolliert.

---

## 1. Hypothesen-Ergebnis

| ID | Hypothese | Ergebnis | Evidenz |
|---|---|---|---|
| H-E1 | Overlay reduziert D1-D5 auf 0 Fehler in 3/3 Regenerationen ohne Qualitaetsverlust | **PARTIELL PASS** (D1-D5 4/4, aber neuer D6 in 1/3 I2) | RUN_META §D-Defekt-Check |
| H-E2 | Partial+Full-Gate eliminiert Dispatcher-Ownership-Leak strukturell | **PASS** | 0/4 Runs Dispatcher-Felder im Subagent-Output (D5 PASS) |
| H-E3 | Overlay-gehaertete Outputs sind didaktisch ≥ 4 gegen Baseline | **PARTIELL PASS** (3/4 ≥ 4, 1/4 = 3.8) | review_iter1_run1.md + runs/iteration-2/run-{1,2,3}/review.md |

---

## 2. Metriken (Gesamt n=4, I1 + I2)

### 2.1 Harte Gate-Metriken

| ID | Metrik | Schwelle | Ist |
|---|---|---|---|
| M-E1 | Partial-Gate-PASS-Rate | I1: 1/1, I2: 3/3 | **I1: 1/1**, **I2: 2/3** |
| M-E2 | Full-Gate-PASS-Rate | I1: 1/1, I2: 3/3 | **I1: 1/1**, **I2: 2/3** |
| M-E5 | Didaktik-Einsetzbarkeit ≥ 4 | I1: ≥ 4, I2: 2/3 ≥ 4 | **I1: 4.4 PASS**, **I2: 2/3 ≥ 4 PASS** (Run-2 4.4, Run-1 4.0 an Schwelle, Run-3 3.8 FAIL) |
| M-E6 | Overlay-Patch-Zyklen | ≤ 2 | **0** (kein Patch noetig) |

**Kombinierter Mittelwert Didaktik (n=4):** (4.4 + 4.0 + 4.4 + 3.8) / 4 = **4.15**.

### 2.2 Informative Metriken

| ID | Metrik | Ist |
|---|---|---|
| M-E3 | Inhalts-Varianz (Wortanzahl) | 98..268, Faktor **2.7** (unkontrolliert) |
| M-E4 | `_meta`-Tag-Jaccard (`artefakt_ref` + `tafelbild_knoten_abgedeckt`) | **1.0** (4/4 exakt) |
| M-E7 | Token-Verbrauch je Run | I1: 24642, I2 Runs: 42576..42939 (+Shared-Prompt-Read) |
| M-E8 | Defekt-Klassen-Residuum | D1-D5: 0/4 Runs; **D6 (neu, WRONG_TYPE quellenkritische_impulse): 1/4** |

### 2.3 Overlay-Compliance (5-Punkte §3)

| Pruefpunkt | I1 | I2-R1 | I2-R2 | I2-R3 | Gesamt |
|---|---|---|---|---|---|
| Top-Level nur `{inhalt, quelle, _meta}` | ja | ja | ja | ja | **4/4** |
| `_meta` Whitelist-konform | ja | ja | ja | ja | **4/4** |
| `_meta.quellentyp` ∈ 9-Enum | ja | ja | ja | ja | **4/4** |
| `_meta.perspektive` String | ja | ja | ja | ja | **4/4** |
| `inhalt` String | ja | ja | ja | ja | **4/4** |

Overlay-Haertung auf Struktur-Ebene: **100 % reproduzierbar ueber n=4.**

---

## 3. D-Defekt-Evolution (F0d → F0e)

| Defekt | F0d-Failrate | F0e-Failrate n=4 | Delta |
|---|---|---|---|
| D1 `perspektiv_tags` (verboten, doch gesetzt) | 6/6 (100 %) | 0/4 (0 %) | **Eliminiert** |
| D2 `quellentyp` Alt-Werte ausserhalb Enum | 4/6 (67 %) | 0/4 (0 %) | **Eliminiert** |
| D3 `perspektive` als Array statt String | 1/6 (17 %) | 0/4 (0 %) | **Eliminiert** |
| D4 `inhalt` als Objekt statt String | 3/6 (50 %) | 0/4 (0 %) | **Eliminiert** |
| D5 Dispatcher-Felder im Subagent-Output | 4/6 (67 %) | 0/4 (0 %) | **Eliminiert** |
| **D6 (neu) `quellenkritische_impulse` WRONG_TYPE** | nicht in F0d-Pool | 1/4 (25 %) | **Neu sichtbar** |

**Interpretation D6:** In F0d wurde das Feld meist gar nicht geliefert oder als Array. Unter Overlay-Haertung liefern die Subagents das Feld reproduzierbar, aber eine Instanz (I2-R3) faellt auf String-Serialisierung zurueck. Gate-Chain faengt den Defekt ab → kein Leak. Overlay §1 adressiert Whitelist-Existenz, nicht Typ-Kontrakt innerhalb Whitelist-Feld.

---

## 4. R-E8 Modell-Varianz — Einschaetzung

### 4.1 Niedrig (stabil ueber alle 4 Runs)

- D1-D5 Overlay-Compliance (siehe §2.3).
- `_meta.quellentyp = "amtlich"`, `_meta.aufbereitung = "gemischt"`, `_meta.perspektive` als multiperspektivischer String.
- `artefakt_ref = ["pq-4-1"]`, `tafelbild_knoten_abgedeckt = ["k4-3"]` — exakt 4/4 (trivial, aus Bundle ableitbar).

### 4.2 Mittel

- `trigger_flags`-Taxonomie: I1 nutzt globale Flag-Liste, I2 folgt Bundle-`trigger_categories` 1:1, I2-R2+R3 ergaenzen Eigen-Tags (`Ueberwaeltigungsverbot_sensibel`, `Primaerquellen-Ausnahme-aktiv`). Schema akzeptiert beide; Downstream-Matching (Suche, Filter) waere uneinheitlich.
- `rekonstruktions_begruendung`: 4/4 gesetzt, Formulierungen variieren in Laenge und Primaerquellen-Nachweis-Tiefe.

### 4.3 Hoch

- **Wortanzahl:** 98..268, Faktor 2.7. Keine strukturelle Begrenzung im Overlay.
- **inhalt-Aufbau:** I1 = 3-Schritt + `<strong>Denk nach</strong>`. I2-R1 = 3-Schritt ohne Denk-Block. I2-R2 = 3-Schritt + Quellen-Dopplung aus `quelle` im `inhalt`. I2-R3 = 5-Block + `<sup>1</sup>`-Fussnote + Denkanstoss-Block.
- **Multiperspektivitaet im `inhalt`:** 4/4 lagern P3-Perspektive primaer in Impuls-Fragen aus. Didaktisch grenzwertig — M-E5 Dim 3 hat entsprechend nur 3/5 bei I1 und I2-R1, 2/5 bei I2-R3.

### 4.4 Neu beobachteter Defekt (D6)

- `_meta.quellenkritische_impulse` String statt Array in I2-R3. Gate-Chain-Catch, nicht Overlay-Scope.
- Konsequenz: Overlay braucht Typ-Hinweis im Whitelist-Abschnitt (Addition-Kandidat fuer PI-SCHEMA-STRICT-01).

---

## 5. PI-Items (Promotion-Kandidaten)

### 5.1 PI-SCHEMA-STRICT-01 (Promotion-Status: PENDING → **READY FOR PROMOTION mit D6-Addition**)

**Inhalt:** Overlay-Inhalt aus `gate-prototype/overlays/PROMPT_HARDENING_QUELLENTEXT.md` v1.0 wird in autoritativen Agent `agents/SUB_MATERIAL_QUELLENTEXT.md` (Generator-Repo, v3.10.4 → v3.11.0) als §3.X "Subagent-Output-Vertrag" eingearbeitet.

**D6-Addition (neu):** Im Whitelist-Abschnitt §1-D1 explizite Typ-Angaben je Feld ergaenzen:
- `perspektive: string` (bereits D3-Overlay)
- `aufbereitung: enum string`
- `quellenkritische_impulse: array of string` (D6-Addition)
- `rekonstruktions_begruendung: string | absent`
- `quellentyp: enum string` (bereits D2-Overlay)
- `trigger_flags: array of string`
- `erarbeitbarkeits_check: string | absent`
- `artefakt_ref: array of string`
- `tafelbild_knoten_abgedeckt: array of string`

**Begruendung Promotion:** n=4 Shadow-Runs zeigen 4/4 D1-D5-Compliance — der Overlay-Mechanismus funktioniert. D6 ist kein Overlay-Versagen, sondern ein neuer sichtbarer Defekt, den die Promotion direkt mitadressieren kann.

### 5.2 PI-CONTENT-LENGTH-01 (neu, **ergaenzt PI-Register**)

**Inhalt:** Didaktische Wortanzahl-Grenze fuer `typ=quellentext`-Materialien als Q-Gate im Quality-Pipeline-Schritt (nicht als Schema-Gate). Schwelle-Kandidat: `wortanzahl <= 150` (begruendet aus Baseline-`mat-4-3.json` ~95 W + Aufschlag fuer didaktische Erlaeuterung).

**Begruendung:** Varianz-Faktor 2.7 bei identischem Prompt ist nicht-didaktisch. Der Overlay kann die strukturelle Haertung leisten, aber nicht die didaktische Laengen-Disziplin. Q-Gate-Place: nach Schema-Gate, vor Didaktik-Review.

**Platzierung:** UPGRADE_PLAN §19 neu als PI-CONTENT-LENGTH-01.

### 5.3 PI-MULTIPERSPEKTIVE-INHALT-01 (neu, schwach, **ergaenzt PI-Register**)

**Inhalt:** Q-Gate pruefen, ob P3-Perspektive im `inhalt`-String substanziell vertreten ist — nicht nur als Impuls-Frage. Konkret: mindestens ein Satz mit Subjekt in der dominierten Perspektive (Beispiel: "Fuer die Herero bedeutete 'Schutzgebiet' Landraub.") oder expliziter multiperspektivischer Kontrast im Einleitungs-/Nachweis-Absatz.

**Begruendung:** 4/4 Runs verlagern P3 in Impuls-Fragen. MATERIAL-PERSPEKTIV-01 fordert *Multiperspektivitaet im Material*, nicht *Multiperspektivitaet im Impuls-Nachklapp*.

**Schwach** weil: Heuristisches Q-Gate, kein harter Kontrakt moeglich — Overlay kann Hinweis geben, aber Enforcement waere NL-basierte Pruefung mit False-Positives.

### 5.4 PI-TRIGGERFLAG-ENUM-01 (optional, **ergaenzt PI-Register**)

**Inhalt:** `trigger_flags` von `items: string` auf `items: enum`-Form verengen (kanonische Trigger-Taxonomie: `gewalt`, `tod`, `krieg`, `diskriminierung`, `sexualisierung`, `trauma`, ggf. domain-spezifische Erweiterungen).

**Begruendung:** Cross-Run-Interoperabilitaet. Downstream-Systeme (Material-Suche, MAT-Coverage-Reports) koennen nur gegen Enum filtern. Freie Eigen-Tags (`Ueberwaeltigungsverbot_sensibel`, `Primaerquellen-Ausnahme-aktiv`) sind didaktisch legitim, aber Matching-Rauschen.

**Optional** weil: geringere Prioritaet als PI-SCHEMA-STRICT-01, eigenstaendig schliessbar nach Overlay-Promotion.

---

## 6. Folgeschritte (gemaess Plan §12)

### 6.1 Promotion-Pfad (bei MIXED weiterhin berechtigt)

- **PI-SCHEMA-STRICT-01:** Status PENDING → **READY FOR PROMOTION**. Nicht automatisch IN_PROGRESS, weil die Promotion das Generator-Repo-Agent-File modifizieren muss (Dual-Root-Sync).
- **Overlay v1.0 → v1.1:** D6-Typ-Hinweis einarbeiten. Optional vor Promotion, damit autoritative Datei auf stabilem Overlay-Stand basiert.
- **F0g:** bleibt DEFERRED bis PI-SCHEMA-STRICT-01 IN_PROGRESS / DONE + PI-DISPATCH-OVERHEAD-01 geklaert.

### 6.2 Optional Iteration-3 (nicht jetzt)

- Zweiter Case (z.B. `mat-1-2` aus Mappe 1 oder `mat-3-4` aus Mappe 3) mit n=3, um Case-Unabhaengigkeit zu pruefen.
- Hypothese: Laengen-Varianz und Multiperspektivitaets-Schwaeche sind Overlay-unabhaengig, also Case-unabhaengig. Bei Bestaetigung rechtfertigt das PI-CONTENT-LENGTH-01 ueber quellentext hinaus.

### 6.3 UPGRADE_PLAN §19 Update (post-Befund)

- PI-SCHEMA-STRICT-01: READY FOR PROMOTION, D6-Addition dokumentiert.
- PI-CONTENT-LENGTH-01: neu aufgenommen.
- PI-MULTIPERSPEKTIVE-INHALT-01: neu aufgenommen (schwach).
- PI-TRIGGERFLAG-ENUM-01: neu aufgenommen (optional).
- PI-DISPATCH-OVERHEAD-01: unveraendert (I2-Dispatch +1 Tool-Use kostet ~18k zusaetzliche Tokens pro Run — bestaetigt den PI-Bedarf).

---

## 7. Realitaetsnaehe-Nachweis (Plan §11)

| Pruefpunkt | Erfuellt |
|---|---|
| Autoritative `SUB_MATERIAL_QUELLENTEXT.md` unveraendert | **ja** (Shadow wahr, Overlay via Dispatch-Prompt montiert) |
| Overlay wortgleich VOR Agent-Datei montiert | **ja** (SHA-fixiert: `_shared_dispatch_prompt.md` af89515fc…) |
| Input-Bundle identisch zum F0d-Bundle | **ja** (SHA `419c6440a4ebcf9959fc0eca59974f493d2a95104a72dfc5ab96a5533c417658`) |
| Zweistufiges Gate (Partial + Full) genutzt | **ja** (Partial + Merge + Full je Run) |
| Dispatcher-Context-Fixtur unveraendert | **ja** (`fixtures/dispatcher_context_mat-4-3.json`) |
| Pro Run frischer Agent-Envelope | **ja** (I1: inline Prompt; I2: 3× parallele fresher Task-Calls) |
| Didaktik-Review separat vom Schema-Gate | **ja** (§10-Protokoll post-Merge, SELF-Review Claude + pending Paul-Sign-Off) |
| Iteration-2 nur nach I1 PASS | **ja** (I1 PASS verifiziert vor I2-Dispatch) |

---

## 8. Dauer-Bilanz

| Phase | Plan-Budget | Ist |
|---|---|---|
| P2 Iteration-1 Dispatch | 30 min | ~7 min |
| P3 Iteration-1 Didaktik-Review | 20 min | ~15 min |
| P3a Overlay-Patch-Zyklen | 0-60 min | **0 min** (keine Patches noetig) |
| P4 Iteration-2 Dispatch (3 parallele) | 45 min | ~2 min Parallel-Burst + < 3 s Gate-Chain kumulativ |
| P5 Iteration-2 Auswertung | 30 min | ~20 min (inline) |
| P6 F0e_BEFUND.md | 20 min | dieser Schritt |
| P7 STATUS + CHANGELOG | 10 min | anschliessend |

**Gesamt:** Plan ~3 h. Ist deutlich unter Budget (Primaer-Einsparung: Shadow-Overlay funktionierte first-pass, keine Patch-Zyklen).

---

## 9. Offene Restfragen (fuer Folge-Arbeit)

1. Ist die I1→I2 Token-Differenz (24k → 42k) rein durch +1 Tool-Use erklaerbar, oder fliessen zusaetzliche Reasoning-Pfade mit ein? — Fuer Produktions-Dispatcher: Inline-Prompt ~50 % guenstiger.
2. Koennte ein **strikter Output-Formatvorlage-Block** im Overlay (z.B. "EINLEITUNG max 2 Saetze, ZITAT, NACHWEIS max 2 Saetze") die wortanzahl- und inhalt-Aufbau-Varianz reduzieren? Hypothese fuer Overlay v1.2 oder eine moegliche I3.
3. Ist D6 Modell-Artefakt oder systemische Schwaeche? Bei n=1 Auftritt in n=4 nicht abschliessend zu beurteilen. Zweite Replikation wuerde Klarheit schaffen.
4. Paul-Sign-Off auf allen 4 Review-Files steht aus (non-blocking, parallel).

---

## 10. Deliverable-Inventar

| Datei | Status |
|---|---|
| `F0e_AGENT_EXPERTISE_SPIKE.md` v1.0 | committed (996248d pre-F0e, siehe CHANGELOG) |
| `runs/iteration-1/` (README, RUN_META, dispatch_prompt, partial, merged, 3× gate-report, subagent_response, review_iter1_run1) | committed (dc1a91a) |
| `runs/iteration-2/_shared_dispatch_prompt.md` | neu, uncommitted |
| `runs/iteration-2/RUN_META.md` | neu, uncommitted |
| `runs/iteration-2/varianz_report.md` | neu, uncommitted |
| `runs/iteration-2/run-{1,2,3}/partial.json` | neu, uncommitted |
| `runs/iteration-2/run-{1,2,3}/merged.json` (Run-3 FAIL-State) | neu, uncommitted |
| `runs/iteration-2/run-{1,2,3}/{partial_gate,merge,full_gate}_report.txt` | neu, uncommitted |
| `runs/iteration-2/run-{1,2,3}/subagent_response.md` | neu, uncommitted |
| `runs/iteration-2/run-{1,2,3}/review.md` | neu, uncommitted |
| `F0e_AGENT_EXPERTISE_BEFUND.md` (dieses Dokument) | neu, uncommitted |
| STATUS + CHANGELOG Update | anschliessend |

---

## 11. Fazit

F0e-AEF BEFUND **MIXED** — valid und abschlussreif.

Strukturelle Overlay-Haertung ist **reproduzierbar wirksam** (D1-D5 4/4). Der Mechanismus "Shadow-Overlay + zweistufiges Gate" ist der richtige Hebel fuer Schema-Haertung von Subagent-Envelopes. PI-SCHEMA-STRICT-01 ist **ready for promotion** mit D6-Addition.

Inhaltliche Varianz (Laenge, Multiperspektivitaet-im-inhalt) ist **nicht ueber Overlay steuerbar** — benoetigt separate Q-Gates (PI-CONTENT-LENGTH-01, PI-MULTIPERSPEKTIVE-INHALT-01).

F0g bleibt DEFERRED, aber der Blocker auf PI-SCHEMA-STRICT-01 ist technisch aufloesbar sobald die Generator-Repo-Agent-Datei den Overlay-Inhalt integriert.
