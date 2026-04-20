# F0d Dispatch-Spike v2.0 — Input-Bundle FEHLER-INJEKTION (M3 Fail-Detection)

**Kennung:** `F0d-INPUT-BUNDLE-INJECTED-v2.0`
**Basis:** `bundle.md` (v2.0) — Abschnitte 0-10 IDENTISCH.
**Differenz zu `bundle.md`:** Nur Abschnitt 11 (`perspektiven_policy`-String) manipuliert auf mono-perspektivisch (nur `P1`).
**Zweck:** M3 Fail-Detection-Rate messen (Plan §5). QG-06 muss FAIL liefern, weil M4-Invariante "mind. 2 nicht-dominante Tags" ueber diesen Material-Text nicht erreichbar waere.
**Nicht manipuliert (R3-Mitigation, Plan §11):** Zitat pq-4-1 bleibt wortgleich, Trigger-Kategorien bleiben aktiv, DIDAKTIK_RAHMEN-Ethik-Hinweise bleiben. Nur Policy-String reduziert.

---

## 0-10. Identisch zu `bundle.md`

Abschnitte 0 (Lese-Orientierung), 1 (MATERIAL_GERUEST-Row), 2 (SEQUENZKONTEXT), 3 (hefteintrag.json-Slice), 4 (SUB_MATERIAL_QUELLENTEXT.md-Systemprompt), 5 (F0B_PRIMING_INCLUDE §1+§2+§3), 6 (SKRIPT-Chunk §4+§5), 7 (INHALTSBASIS), 8 (einstieg.json), 9 (ARTEFAKT_INVENTAR pq-4-1), 10 (DIDAKTIK_RAHMEN) sind **byte-identisch** zu `bundle.md` und werden hier nicht wiederholt (siehe Hash in `bundle_hash.txt`).

---

## 11. perspektiven_policy-String (MANIPULIERT — mono-perspektivisch)

**ORIGINAL (bundle.md §11):**

```
P1: Deutsche Reichsfuehrung (Trotha, Kolonialverwaltung) | P2: Frankreich (Kolonialkonkurrenz, Kontext Mappe 3) | P3: Kolonisierte (Herero/Nama als Opfer und als Traeger des Widerstands)
```

**INJIZIERTER WERT (bundle_injected.md §11):**

```
P1: Deutsche Reichsfuehrung (Trotha, Kolonialverwaltung)
```

**Erwartetes Verhalten:**
- **Generator:** Kann bei mono-perspektivischer Policy kein multiperspektivisches Material produzieren (oder nur unter Bruch der Policy-Direktive). Ein Generator mit korrektem Priming (F0B_PRIMING_INCLUDE §2 MATERIAL-PERSPEKTIV-01) sollte trotzdem P3 abdecken — TRIGGER-Kategorien bleiben aktiv. Das ist genau der Stress-Test: Erkennt der Generator den Konflikt zwischen Policy-Engheit und M4-Invariante?
- **QG-06-Checker:** Muss FAIL liefern, weil der `perspektiven_policy`-String (den er als Input erhaelt) nur eine Perspektive enthaelt, gleichzeitig aber die Trigger-Kategorien `Kolonisierung` + `Gewalt` aktiv sind → M4-Invariante "mind. 2 nicht-dominante Tags" wird nicht erfuellt.

**Schwelle M3:** B ≥ A + 20 pp Fail-Detection-Rate. Injektion in 2 von 3 Runs pro Arm (also run_A_2, run_A_3, run_B_2, run_B_3 benutzen `bundle_injected.md`; run_A_1 und run_B_1 benutzen `bundle.md` fuer Baseline-PASS-Referenz).

---

**Ende Bundle-Injected v2.0.** Hash siehe `bundle_hash.txt`.
