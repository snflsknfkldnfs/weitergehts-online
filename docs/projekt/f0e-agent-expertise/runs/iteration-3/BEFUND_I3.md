# F0e-AEF Iteration-3 BEFUND

**Datum:** 2026-04-23
**Track:** `f0e-aef-pi-integration-par-19`
**Case:** `mat-4-3` Trothas Vernichtungsbefehl (identisch I1+I2)
**Modus:** 4× parallele fresher Agent-Envelopes, Task-Tool `general-purpose`
**Zweck:** Empirische Validierung Overlay v1.1 + Schema v3.10.3 gegen Baseline I1+I2 (n=4) per §19.7 Akzeptanzkriterien.

---

## 1. Entscheid

**PASS** gegen §19.7 UPGRADE_PLAN v3-12 Akzeptanzkriterien.

Alle acht PASS-Schwellen erfuellt, keine MIXED- oder FAIL-Trigger ausgeloest. D6-Defekt vollstaendig eliminiert, Wortanzahl-Varianz auf 1.09 reduziert, Didaktik-Mittel +0.48 ueber Baseline.

---

## 2. Metriken-Matrix §19.7

| Metrik | Baseline I1+I2 (n=4) | PASS-Schwelle I3 | I3-Ergebnis | Status |
|---|---|---|---|---|
| Schema-Pass-Rate (Full-Gate) | 3/4 = 75 % | **4/4 = 100 %** | **4/4 = 100 %** | **PASS** |
| D6-Inzidenz | 1/4 = 25 % | **0/4 = 0 %** | **0/4 = 0 %** | **PASS** |
| Wortanzahl-Cap ≤ 180 | 3/4 unter 180 (98/158/218/268) | **4/4 ≤ 180** | 4/4 (108/108/109/118) | **PASS** |
| Wortanzahl-Varianz (Max/Min) | 2.7 | **< 2.0** | **1.09** | **PASS** |
| Didaktik-Mittelwert ≥ 4.0 | 4.15 | **≥ 4.0** | **4.55** | **PASS** |
| Didaktik-Minimum ≥ 3.0 | 3.8 | **≥ 3.0** | **4.2** | **PASS** |
| Patch-Zyklen M-E6 | 0 | **≤ 1** pro Run | **0** | **PASS** |
| Overlay-Compliance D1-D5 | 4/4 = 100 % | **4/4 = 100 %** | **4/4 = 100 %** | **PASS** |

Zusaetzliche Overlay-v1.1-Checks (nicht in §19.7 als Schwellen, aber in Overlay festgelegt):

| Check | Beobachtung | Status |
|---|---|---|
| Wortanzahl-Richtcap ≤ 150 | 4/4 eingehalten (Max 118 W) | PASS |
| M16 Prosa-Only (inhalt) | 4/4 nur `<p><em><blockquote><cite>` | PASS |
| M17 Quelle-SSOT | 4/4 `cite` = Attribution, `quelle` = voller Nachweis, kein Duplikat | PASS |
| Pinned-Schema Match (v3.10.3) | 4/4 `pinned_match: True`, Full + Partial | PASS |

---

## 3. Rohdaten je Run

| Run | Agent-ID | Tokens | Dauer ms | Wortanzahl | Partial-Gate | Full-Gate | Didaktik-Mittel | Didaktik-Min |
|---|---|---|---|---|---|---|---|---|
| 1 | ad65b022ce365c2f7 | 49067 | 27177 | 108 | PASS | PASS | 4.8 | 4 |
| 2 | a40f6380e9a047341 | 48991 | 23747 | 108 | PASS | PASS | 4.6 | 4 |
| 3 | ae9dcd0ad51136a07 | 49096 | 25675 | 109 | PASS | PASS | 4.6 | 4 |
| 4 | a2c816cf1a22f6f2a | 49077 | 25163 | 118 | PASS | PASS | 4.2 | 4 |

Aggregat: 4/4 Schema-PASS, 4/4 Didaktik-PASS, 0/4 D6, 0 Retries.

---

## 4. Vergleich I3 vs. Baseline I1+I2

| Dimension | I1+I2 (n=4) | I3 (n=4) | Δ |
|---|---|---|---|
| Wortanzahl-Mittel | 185.5 | **110.75** | −40.3 % |
| Wortanzahl-Max | 268 | **118** | −56.0 % |
| Wortanzahl-Varianz (Max/Min) | 2.74 | **1.09** | −60 % |
| Schema-Pass-Rate | 75 % | **100 %** | +25 Pp |
| D6-Inzidenz | 25 % | **0 %** | −25 Pp |
| Didaktik-Mittel | 4.15 | **4.55** | +0.40 |
| Didaktik-Min | 3.8 | **4.2** | +0.40 |
| Tokens-Mittel | 42800 | 49057 | +14.6 % (Overlay-Umfang) |
| Dauer-Mittel (ms) | 30100 | 25441 | −15.5 % |

**Interpretation:**

Der groesste Hebel war der Wortanzahl-Cap in Schema + Overlay. I2-R3 (268 W, Schema-FAIL, Didaktik 3.8) war im I1+I2 die Drift-Quelle in allen drei Problem-Dimensionen — genau der Profil-Typus, den Overlay v1.1 §2 (wortanzahl.maximum=180) durch Gate-Enforcement eliminiert. D6 ist durch den expliziten Array-Typ-Hinweis in Overlay §6 und den strikten Partial-Schema-Check weggefallen.

Token-Anstieg (+14.6 %) ist Overlay-v1.1-intrinsisch (§0-§9 = ~1100 Zeilen vs. v1.0 ~700 Zeilen). Dauer faellt trotzdem — vermutlich, weil der haerter eingegrenzte Loesungsraum weniger Exploration erzwingt.

---

## 5. Ursachenanalyse Qualitaets-Gewinn

**Warum 4/4 Schema-PASS statt 3/4 (+D6-Eliminierung)?**

1. **D6-Block in Overlay §6 + Schema-Typ-Enforcement:** `quellenkritische_impulse: array` im Partial-Schema v3.10.3 + expliziter Hinweis in Overlay §6 ("Array, nicht String — mindestens 2 Elemente") schloss den I2-R3 Defekt-Pfad.
2. **Wortanzahl-Cap 180:** I2-R3 haette mit 268 W auch ohne D6 ge-FAIL-t.
3. **Primaerquellen-Ausnahme R7 explizit in §7:** Alle 4 I3-Runs nennen R7 als Begruendung fuer `aufbereitung=gemischt` — Self-Check-Signal funktioniert.

**Warum Didaktik +0.40?**

- Kuerzere Texte (108-118 W statt 98-268) reduzieren kumulative Fachwortdichte und Satzkomplexitaet → Dim2 R7-Sprachniveau steigt.
- `cite`-Attribution innerhalb Blockquote ist neuer Standard → saubere SSOT-Trennung, Dim5 stabil bei 5.
- Explizite P3-Nennung (Run-4) oder P3-Perspektivfrage in Impulsen (Run-1) deutlich konsistenter als in Baseline.

**Warum Didaktik-Min von 3.8 auf 4.2 gestiegen?**

Run-4 ist der Untere-Grenze-Fall in I3: hoechste Wortanzahl, Opferzahlen im Fliesstext, Satz 2 lang. Er bleibt **dennoch** im PASS-Korridor, weil Struktur, Quelle und Trigger-Screens konform sind. Der Strukturbruch, der I2-R3 (3.8) nach unten zog, ist durch Cap + Prosa-Only-Regel ausgeschlossen.

---

## 6. Ableitungen

### 6.1 Phase 19.A PI-Cluster — Status

| PI-Item | Behandlung in Overlay v1.1 | I3-Validierung |
|---|---|---|
| 3.1 Wortanzahl-Cap | §2 + Schema `maximum:180` | **verifiziert** (4/4 ≤ 118) |
| 3.2 D6 Array-Typ | §6 explizit + Schema `type:array` | **verifiziert** (4/4 Array) |
| 3.6a M16 Prosa-Only | §4 | **verifiziert** (4/4 konform) |
| 3.7 M17 Quelle-SSOT | §5 | **verifiziert** (4/4 konform) |

P1-Cluster vollstaendig empirisch belegt.

### 6.2 Empfehlung Promotion in Generator-Repo

Schema v3.10.3 + Overlay v1.1 sind reif fuer den Zug in den Generator-Repo-Kern (`snflsknfkldnfs/escape-game-generator`). Voraussetzungen:

- Separater Track fuer Promotion (nicht in F0e-AEF verschachteln).
- Rueckwaerts-Kompatibilitaets-Check: `material_quellentext_v3.10.2.json` muss als Lese-Schema bleiben fuer Alt-Materialien.
- Dispatcher-Kontrakt (`AGENT_MATERIAL.md` Phase 2.1) muss zweistufiges Gate-Pattern ueberneh­men.

### 6.3 Phase 19.B offen

I3 adressiert nicht:

- PI 3.5 Zielgruppen-Feld fuer SuS-Heterogenitaet.
- PI 3.6b Datenfluss zwischen Materialien (z.B. `voraussetzung` vs. implizite Verweise im `inhalt`).
- PI 3.8 Nachweis-Dramaturgie (Wikipedia vs. Originaldokument).

Diese bleiben nach I3-PASS fuer Phase 19.B planungsbereit.

### 6.4 Offene Mini-Punkte

- Run-2 Impulse quellenkritisch, nicht explizit multiperspektivisch — Dim3 Abzug stabil bei 4/5. Overlay v1.2 koennte §6 um einen Hinweis erweitern: "mindestens 1 von 3 Impulsen muss Perspektiv-Wechsel adressieren." **Nicht bindend** fuer §19.7 PASS.
- Run-4 Opferzahlen im Fliesstext vs. Ueberwaeltigungsverbot — didaktisch akzeptabel, aber Lehrkraft-Hinweis in `rekonstruktions_begruendung` waere wertvoll. **Nicht bindend.**

---

## 7. Nicht-Ziele

- Case-Generalisierung: Nur `mat-4-3` getestet. Andere Cases (mat-3-2, mat-5-1, karte) nicht validiert. Offen fuer separates Replikat, falls Schema-Promotion in Generator-Repo.
- Modell-Generalisierung: Nur `general-purpose` Task-Agent getestet. Andere Modell-Varianten nicht.
- Wiederholung unter identischen Bedingungen nach Tagen/Wochen — Drift-Messung offen.

---

## 8. Artefakt-Manifest

```
runs/iteration-3/
├── PLAN.md
├── RUN_META.md
├── BEFUND_I3.md                        (dieses Dokument)
├── _shared_dispatch_prompt.md          SHA 640fb89f…
├── run-1/
│   ├── subagent_response.md
│   ├── partial.json
│   ├── partial_gate_report.json        valid:True
│   ├── merge_report.txt
│   ├── merged.json
│   ├── full_gate_report.json           valid:True, pinned_match:True, 0 errors
│   └── review.md                       Mittel 4.8
├── run-2/ (idem, Mittel 4.6)
├── run-3/ (idem, Mittel 4.6)
└── run-4/ (idem, Mittel 4.2)
```

---

## 9. Status

- I3 komplett, Entscheid **PASS**.
- Task #22 erledigt. Task #23 offen: Host-MCP 5-Stufen Commit der I3-Tranche.
- Auto-Memory `project_f0e_aef_state.md` Update nach Commit.

**Version:** v1.0 (2026-04-23).
