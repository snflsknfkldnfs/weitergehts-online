# F0d Dispatch-Spike — METRICS (M1-M8, blind-berechnet nach allen 6 Runs)

**Plan-Ref:** `docs/projekt/F0d_DISPATCH_SPIKE_PLAN.md` v2.1 (commit `ec5115d`).
**RUN_LOG-Ref:** `docs/projekt/testrun-dispatch-spike/RUN_LOG.md` v1.0.
**Berechnung-Timestamp:** 2026-04-20, nach Abschluss Runs A_1+A_2+A_3+B_1+B_2+B_3.
**Methodik:** blind (kein Run-spezifischer Bias), aus `RUN_META.json` + `QGATE_RETURN.json` + `GENERATOR_OUTPUT.json` pro Run, plus formale Draft7-Schema-Validierung via `jsonschema`-Lib gegen `escape-game-generator/architektur/schemata/material-output-schema.json`.

---

## 0. Roh-Datenmatrix pro Run

| Run | Arm | Bundle | Expected QG-06 | Actual QG-06 | schema_01 (self) | mq_strict (self) | Tokens gesamt | Dauer (ms) | Wortanzahl | perspektiv_tags |
|---|---|---|---|---|---|---|---:|---:|---:|---|
| A_1 | A | bundle.md | PASS | PASS | true | true | 21254 | 46460 | 312 | Opfer, Widerstand, Macht-Betroffen, Kritik |
| A_2 | A | bundle_injected.md | FAIL | **PASS (MISS)** | true | true | 20574 | 48297 | 248 | nicht-dominant, Opfer, Widerstand, Macht-Betroffen |
| A_3 | A | bundle_injected.md | FAIL | **FAIL (HIT)** | true | false | 19693 | 42361 | 198 | dominant, Macht-Ausuebung, Aussen |
| B_1 | B | bundle.md | PASS | PASS | true | true | 35491 | 51342 | 312 | Opfer, Widerstand, Macht-Ausuebung, Macht-Betroffen, Innen |
| B_2 | B | bundle_injected.md | FAIL | **FAIL (HIT)** | true | false | 38826 | 61206 | 278 | dominant, Macht-Ausuebung, Aussen |
| B_3 | B | bundle_injected.md | FAIL | **FAIL (HIT)** | true | false | 38362 | 54107 | 248 | dominant, Macht-Ausuebung, Aussen |

---

## 1. M1 — Strukturelle Varianz (JSON-Key-Set-Stabilitaet)

**Definition:** Jaccard-Similarity der Top-Level-Key-Sets innerhalb jedes Arms (hoeher = stabiler = weniger Varianz). Separat fuer `_meta`-Subkeys.

### Top-Level-Keys pro Run

- **A_1:** `{_meta, didaktische_funktion, id, inhalt, position, quelle, sequenz_kontext, titel, typ, ueberleitung_von, voraussetzung}` (11)
- **A_2:** `{_meta, didaktische_funktion, erarbeitbarkeits_check, id, inhalt, position, quelle, quellenkritische_impulse, sequenz_kontext, titel, typ, ueberleitung_von, voraussetzung}` (13)
- **A_3:** `{_meta, didaktische_funktion, entscheidungs_dokumentation, game_id, id, inhalt, mappe, perspektiv_tags, position, titel, typ, ueberleitung}` (12)
- **B_1:** `{_meta, aufgabenstellung, didaktische_funktion, id, inhalt, perspektiv_tags, titel, typ, ueberleitung}` (9)
- **B_2:** `{_meta, aufgabenstellung, didaktische_funktion, id, inhalt, perspektiv_tags, titel, typ}` (8)
- **B_3:** `{_meta, aufgabenstellung, didaktische_funktion, id, inhalt, perspektiv_tags, titel, typ}` (8)

### Jaccard-Berechnung

**Arm A Top-Level:**
- Intersection `{_meta, didaktische_funktion, id, inhalt, position, titel, typ}` = 7 Keys
- Union = 18 Keys
- **Jaccard = 7/18 = 0.389**

**Arm B Top-Level:**
- Intersection `{_meta, aufgabenstellung, didaktische_funktion, id, inhalt, perspektiv_tags, titel, typ}` = 8 Keys
- Union = 9 Keys
- **Jaccard = 8/9 = 0.889**

**Arm A `_meta`-Subkeys:**
- Intersection `{artefakt_ref, aufbereitung, perspektive, quellentyp, rekonstruktions_begruendung, tafelbild_knoten_abgedeckt, trigger_flags, wortanzahl}` = 8 Keys
- Union = 11 Keys
- **Jaccard = 8/11 = 0.727**

**Arm B `_meta`-Subkeys:**
- Intersection = Union = 8 Keys
- **Jaccard = 1.000** (perfekte Stabilitaet)

### Zusammengefasste Strukturelle Stabilitaet

| Arm | Top-Level-Jaccard | Meta-Jaccard | Mittelwert |
|---|---:|---:|---:|
| A | 0.389 | 0.727 | **0.558** |
| B | 0.889 | 1.000 | **0.944** |

**Schwelle:** B ≤ A Varianz (d.h. B-Jaccard ≥ A-Jaccard).
**Ergebnis:** B-Mittelwert 0.944 >> A-Mittelwert 0.558. **M1 PASS.**

**Interpretation:** Dispatch-Isolation (Arm B) produziert JSON-Strukturen mit deutlich stabilerer Key-Set-Zusammensetzung. Arm A zeigt erhebliche intra-Arm-Strukturdrift (A_3 bricht mit `game_id/mappe/entscheidungs_dokumentation`-Feldern aus dem Schema aus). Arm B bleibt auf 8-Key-Core plus optionale `ueberleitung`-Ergaenzung in B_1.

---

## 2. M2 — Inhaltliche Varianz (informativ)

**Proxy-Metrik:** Wortanzahl-Spannbreite + perspektiv_tags-Pool-Divergenz.

| Arm | Wortanzahl-Range | Wortanzahl-Std | Tag-Pool-Wechsel (Dominant ↔ Nicht-Dominant) |
|---|---|---:|---|
| A | 198-312 | ~47 | 3 verschiedene Pool-Konstellationen: rein nicht-dominant (A_1), Mischung (A_2), rein dominant (A_3) |
| B | 248-312 | ~27 | 2 Pool-Konstellationen: rein nicht-dominant (B_1), rein dominant (B_2=B_3 identisch) |

**Ergebnis:** Arm B zeigt enger-konzentrierte inhaltliche Varianz. Bundle-abhaengig: bei gleichem Bundle (bundle_injected) liefert Arm B reproduzierbar dasselbe Tag-Set (B_2=B_3), Arm A hingegen divergent (A_2 Multi-Persp-Override vs A_3 Mono-Persp-Compliance). **Informativ, kein Gating.**

---

## 3. M3 — Q-Gate-Fail-Detection-Rate

**Definition:** Anteil der Injected-Runs (bundle_injected.md, FAIL erwartet), bei denen das Q-Gate tatsaechlich FAIL liefert.

| Arm | Injected-Runs | Davon FAIL-Hit | Rate | Anmerkung |
|---|---|---|---:|---|
| A | A_2, A_3 (n=2) | A_3 (1) | **50.0 %** | A_2 = Self-Check-Bias-MISS (Generator uebersteuerte mono-Policy mit multi-persp Material, intra-Call-Checker liess Mismatch durchgehen) |
| B | B_2, B_3 (n=2) | B_2, B_3 (2) | **100.0 %** | Beide Runs: Generator folgte Policy literal, isolierter Checker markierte explizit 2 Blocker (MQ-M4-COVERAGE-FAIL + MQ-POLICY-DIDAKTIK-KONFLIKT) |

**Schwelle:** B ≥ A + 20 pp.
**Delta:** B − A = 100 − 50 = **+50 pp**.
**Ergebnis:** **M3 PASS** (Delta 2.5x ueber Mindest-Schwelle).

**Interpretation:** Dispatch-Isolation erzwingt strukturelle Abwaegung zwischen Policy-Treue (perspektiven_policy §11) und Didaktik-Rahmen-Ethik-Vorgabe (Multiperspektivitaet zwingend). Arm B-Checker markiert diesen Konflikt reproduzierbar als Blocker; Arm A-Self-Check kann den Konflikt verstecken, wenn der Generator Policy uebersteuert (Fall A_2).

---

## 4. M4 — Token-Verbrauch (Dispatch-Overhead)

**Definition:** Gesamt-Tokens pro Run (Generator + Checker). Arm-Mittel.

| Arm | Run-Tokens | Arm-Mittel | vs. Arm A Mittel |
|---|---|---:|---:|
| A | 21254 / 20574 / 19693 | **20507** | 1.000 x |
| B | 35491 / 38826 / 38362 | **37560** | **1.831 x** |

**Schwelle:** B ≤ 1.3x A.
**Ergebnis:** **M4 FAIL** (1.831x = 0.531x ueber Schwelle).

**Interpretation:** Dispatch-Isolation verursacht durch den separaten Checker-Aufruf ca. 80 % Token-Mehrbedarf. Der Checker-Call erhaelt Bundle + Material-JSON und rebaut den Pruefkontext komplett, daher kein signifikanter Caching-Effekt moeglich. Dieser Overhead ist fuer Produktivbetrieb zu hoch; eine Dispatch-Generalisierung (F0g) muesste Optimierungspotenzial identifizieren (z.B. Bundle-Subset fuer Checker, Checker-Kontext-Caching).

---

## 5. M5 — Rueckmelde-Luecken (Self-Check-Bias-Indikatoren)

**Definition:** Anzahl dokumentierter Faelle, in denen intra-Call Self-Checker Policy-/Didaktik-Konflikte nicht markiert, obwohl sie objektiv vorlagen.

| Arm | Anzahl | Faelle |
|---|---:|---|
| A | **1** | A_2: Self-Checker deklarierte PASS trotz mono-perspektivischer Policy + aktiven Trigger-Kategorien; Konflikt zwischen perspektiven_policy §11 und DIDAKTIK_RAHMEN.ethische_hinweise wurde nicht als Blocker markiert. |
| B | **0** | Alle isolierten Checker (B_1, B_2, B_3) haben Konstellation korrekt bewertet; bei B_2 + B_3 explizit MQ-POLICY-DIDAKTIK-KONFLIKT als Blocker benannt. |

**Schwelle:** B ≤ A.
**Ergebnis:** **M5 PASS** (informativ, B strikt besser).

---

## 6. M6 — Schema-Konformitaet (Draft7 strict, ohne Patch)

**Definition:** Formale Validierung jedes `GENERATOR_OUTPUT.json` gegen `material-output-schema.json` (Draft7 strict, `additionalProperties: false`, Pflichtfelder). Kein Strip, kein Patch.

**Methode:** `python3 jsonschema.Draft7Validator.iter_errors()`.

| Run | Validation-Ergebnis | Fehleranzahl | Kernfehler |
|---|---|---:|---|
| A_1 | INVALID | 3 | `additionalProperties`-Verletzung (`perspektiv_tags` am Top-Level unerwartet; `id` in `ueberleitung_von` / `sequenz_kontext` hat falsche Form) |
| A_2 | INVALID | 5 | `additionalProperties`-Verletzungen (`perspektiv_tags`, `quellenkritische_impulse`, `erarbeitbarkeits_check` am Top-Level); perspektiv_tags-Typ-Mismatch |
| A_3 | INVALID | 8 | 4 required properties fehlen (`quelle`, `voraussetzung`, `ueberleitung_von`, `sequenz_kontext`); `inhalt` als Dict statt String; Top-Level-Fremdfelder `game_id`, `mappe`, `entscheidungs_dokumentation` |
| B_1 | INVALID | 9 | 5 required properties fehlen (`quelle`, `position`, `voraussetzung`, `ueberleitung_von`, `sequenz_kontext`); `inhalt` als Dict; `aufgabenstellung` am Top-Level statt im erwarteten Pfad |
| B_2 | INVALID | 7 | 5 required properties fehlen (identisch zu B_1); `aufgabenstellung` am Top-Level |
| B_3 | INVALID | 7 | identisch B_2 |

**Zusammenfassung:** **0/3 pro Arm formal valid.**

**Schwelle:** 3/3 pro Arm.
**Ergebnis:** **M6 FAIL** (beide Arme; systemische Non-Compliance).

**Interpretation (kritisch):** Self-declared `schema_01_pass=true` in allen 6 Runs ist empirisch falsch — jedes Material verletzt mindestens 3 Draft7-Regeln. Das ist *kein* Dispatch-spezifisches Problem, sondern ein Priming/Generator-Schwaechebefund: der `SUB_MATERIAL_QUELLENTEXT.md`-Systemprompt erzwingt das Draft7-Shape nicht, und die Self-Check-Routine prueft Shape nur oberflaechlich statt gegen das eigentliche Schema zu laufen. Gem. Plan §6: "M6 = FAIL → Arm-Ergebnis inhaltlich nicht auswertbar" — damit ist der Spike in der engen PASS-Definition nicht durch; die Dispatch-Vergleichshypothesen H1/H2/H3 bleiben jedoch orthogonal testbar (siehe Befund-Logik unten). Follow-Up: Schema-Validator-Integration in den Generator-Envelope (PI-SCHEMA-STRICT-01).

---

## 7. M7 — Q-Gate-Coverage

**Definition:** Anteil der geforderten Pruef-Dimensionen, die im QGATE_RETURN.json pro Run adressiert sind. Geforderte Dimensionen laut Plan §7.1: MULTIPERSPEKTIV (M4), SCHEMA-01, MQ-STRICT, MQ1-MQ6, M1-M12, TYP-QUELLENTEXT.

| Run | MULTIPERSPEKTIV | SCHEMA-01 | MQ-STRICT | MQ1-MQ6 | M1-M12 | TYP-QUELLENTEXT | Score |
|---|---:|---:|---:|---:|---:|---:|---:|
| A_1 | ja | ja | ja | ja | nein | ja | 5/6 |
| A_2 | ja | ja | ja | ja | nein | ja | 5/6 |
| A_3 | ja | ja | ja | nein | nein | ja | 4/6 |
| B_1 | ja | ja | ja | ja | nein | ja | 5/6 |
| B_2 | ja | ja | ja | ja | nein | nein | 4/6 |
| B_3 | ja | ja | ja | ja | ja | ja | 6/6 |

| Arm | Score-Mittel |
|---|---:|
| A | 4.67/6 = 0.78 |
| B | 5.00/6 = 0.83 |

**Schwelle:** "alle adressiert" (keine strikte Quote).
**Ergebnis:** Arm B minimal besser, beide unter Vollabdeckung. **Informativ, kein Gating.** Unterversorgung bei M1-M12-Block (nur 1/6 Runs adressiert) und bei MQ1-MQ6 in einem Arm-A-Run — Q-Gate-Checker-Prompts muessten die Dimensionsliste expliziter fordern.

---

## 8. M8 — Realitaetsnaehe-Checkliste (§12)

**Definition:** §12 v2.1 enthaelt 9 Checkboxes (nach Plan-Haertung R6/R7/R8). Threshold gem. Plan §6 ist "≥ 6/7" (v2.0-basiert, v2.1 erweitert). Hier neu: ≥ 7/9 = "mehrheitlich erfuellt".

| # | Box | Status | Beleg |
|---|---|---|---|
| 1 | Alle 11 Input-Bundle-Artefakte aus produktiven Quellen | **ja** | mat-4-3 Trotha-Vernichtungsbefehl, realer Fall aus Mappe 4 Nationalismus-Kolonialismus; pq-4-1 Wikipedia-DE-Primaerquelle; alle SKRIPT-/INHALTSBASIS-/DIDAKTIK-Sektionen aus live-deployten Artefakten |
| 2 | F0B_PRIMING_INCLUDE §1+§2+§3 wortgleich eingebunden | **ja** | Bundle §5, Hash-Check ueber bundle_hash.txt vor jedem Run; alle 6 Runs dispatchen Priming-Inlcude wortgleich |
| 3 | Output gegen material-output-schema.json strict validiert, kein Strip/Patch | **ja (erstmals in P4 ausgefuehrt)** | Draft7-Validator-Lauf in diesem METRICS.md; Resultat 0/6 valid → M6 FAIL dokumentiert |
| 4 | QG-06 gegen Ist-Katalog geprueft | **teilweise** | QGATE_RETURN adressiert 4-6/6 Dimensionen pro Run (M7-Score); keine formale Katalog-Deckungsberechnung gegen Q-GATE-MECHANIK §7.1 durchgefuehrt |
| 5 | perspektiven_policy korrekt als 3-Eintrag-String (bundle.md) | **ja** | bundle.md §11 enthaelt P1+P2+P3; bundle_injected.md §11 kontrolliert reduziert auf P1 (Fehler-Injektion-Design) |
| 6 | Trigger-Kategorien aktivieren MATERIAL-PERSPEKTIV-01 + TERMINOLOGIE-01 | **ja** | Trigger-Flags `Kolonisierung, Gewalt, Macht-Asymmetrie, Unterdrueckung` aktiv, Priming §2+§3 wurde zur Laufzeit angewendet (Evidenz im Inhaltstext aller Runs: Anfuehrungszeichen um "Schutzgebiet"/"Untertanen", Kontextualisierung) |
| 7 | Fehler-Injektion nur auf perspektiven_policy, nicht auf Zitat | **ja** | bundle_injected.md Delta 2571 B = §11 only; Zitat pq-4-1 + Trigger + DIDAKTIK unveraendert (SHA-Check bestaetigt) |
| 8 | (v2.1) Arm A nicht im PM-Chat-Kontext sondern via Agent-Tool-Dispatch | **ja** | Alle Arm-A-Runs via `general-purpose` Agent-Tool, 1 vereinigter Call (Generator + Self-Check), dokumentiert in `runs/A/*/RUN_META.json` |
| 9 | (v2.1) Runs seriell A1→A2→A3→B1→B2→B3, Metriken-Berechnung blind nach allen 6 Runs | **ja** | Reihenfolge per Event-Log verifizierbar (Timestamps 22:16 → 22:48 CEST); METRICS.md wird erstmals nach Abschluss B_3 berechnet |

**Score:** 8/9 (eine Teil-Erfuellung Box 4).
**Schwelle:** ≥ 7/9.
**Ergebnis:** **M8 PASS.**

---

## 9. Gesamt-Gating (Plan §6 v2.0)

**PASS-Formel:** M1 + M3 + M4 + M6 + M8 alle PASS.
**MIXED-Formel:** M1 + M3 PASS, M4 FAIL.
**FAIL sonst.**
**Sperr-Klausel:** M6 FAIL → "Arm-Ergebnis inhaltlich nicht auswertbar".

| Metrik | Gating | Ergebnis |
|---|---|---|
| M1 Strukturelle Varianz | ja | **PASS** |
| M3 Fail-Detection-Rate | ja | **PASS** (Delta +50 pp) |
| M4 Token-Verbrauch | ja | **FAIL** (1.831x vs ≤ 1.3x) |
| M6 Schema-Konformitaet | ja | **FAIL** (0/3 beide Arme) |
| M8 Realitaetsnaehe | ja | **PASS** (8/9) |
| M2, M5, M7 | informativ | M2 Arm-B enger; M5 Arm-B besser (0 vs 1); M7 Arm-B leicht besser |

**Formale Befund-Klassifikation:**
- PASS ausgeschlossen (M4 + M6 fehlen).
- MIXED-Kriterium (M1+M3 PASS, M4 FAIL) erfuellt, aber M6 FAIL zieht Sperrklausel.
- **Empfohlene Befund-Klassifikation: MIXED mit methodischem Caveat "M6 systemisch FAIL in beiden Arms — Generator-Shape-Compliance ist kein Dispatch-Problem".**

**Dispatch-Hypothesen-Bewertung (orthogonal zu Gating):**
- **H1 (Arm B geringere strukturelle Varianz):** JA, deutlich (M1 0.944 vs 0.558).
- **H2 (Arm B Fail-Detection +20 pp):** JA, +50 pp (M3).
- **H3 (Arm B Token-Overhead ≤ 1.3x):** NEIN, 1.831x (M4).
- **H4 (Schema-Konformitaet dispatch-unabhaengig):** JA — unabhaengig FAIL in beiden Arms (M6) → bestaetigt Null-Hypothese H4, aber mit negativem Vorzeichen (keine Konformitaet erreicht).

**Zusaetzliche Befunde:**
- Kontrast A_2 (MISS) vs B_2 (HIT) bei identischem Bundle demonstriert Self-Check-Bias-Kosten.
- Arm-A-Inkonsistenz A_2 vs A_3 (gleiches Bundle, gegensaetzliches Generator-Verhalten) zeigt, dass Arm A ohne Isolation reprodu­zier­bar­keits-schwach ist.
- B_2 und B_3 liefern identisches Tag-Set + identische Blocker bei identischem Bundle → Arm-B-Reproduzierbarkeit empirisch gestuetzt.

---

## 10. Follow-Up-Empfehlungen aus den Metriken

1. **PI-SCHEMA-STRICT-01 (dringlich):** Schema-Validator-Integration in `SUB_MATERIAL_QUELLENTEXT`-Envelope. Generator muss Draft7 strict validieren bevor er das Material ausliefert; aktuell produziert er in *jedem* Run fremde Top-Level-Felder und/oder fehlende Required-Properties.
2. **PI-DISPATCH-OVERHEAD-01:** Dispatch-Overhead-Optimierung fuer Arm-B-Muster in F0g (falls entblockt). Bundle-Subset fuer Checker oder kontext-reduziertes Material-Envelope pruefen, um M4-Schwelle zu erreichen.
3. **PI-M1-M12-COVERAGE-01:** Q-Gate-Checker-Prompts muessen M1-M12-Dimension explizit abfragen (aktuell nur 1/6 Runs adressiert).
4. **PI-SELFCHECK-BIAS-01:** Arm-A Self-Check-Variante sollte explizit den "policy-override-konflikt-check" als separaten Pruefschritt eingebaut bekommen (A_2-Miss-Muster).

---

**Metriken-Berechnung Abschluss:** 2026-04-20.
**Naechster Schritt:** P5 BEFUND-Artefakt (`docs/projekt/F0d_BEFUND.md`) basierend auf obigem Gating + Hypothesen-Bewertung + §12-Score.
