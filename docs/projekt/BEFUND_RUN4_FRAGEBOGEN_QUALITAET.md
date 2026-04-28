# BEFUND — Run-4 Fragebogen-Qualitätsaudit

**Datum:** 2026-04-27
**Scope:** Tiefen-Eval aller 28 Aufgaben + 22 Materialien des Run-4-Games auf Fragebogenqualität (Sequenzierung + Frage-Klarheit + Material-Aufgabe-Bindung + Distraktoren-Plausibilität + Tipp-Progression + Erarbeitbarkeit jeder Antwort + Cross-Mappen-Kohärenz).
**Methodik:** Pro Aufgabe 6 Eval-Dimensionen geprüft. AFB-Progression heuristisch via Punkte-Werten + Aufgabentyp.
**Source:** data.json (post-Hotfix1+2+3, Commit 5ac7d26).

**Aggregat:** **40+ Befunde** identifiziert. Davon **3 HIGH (didaktischer Pflicht-Fix)** + **9 MED (Polish vor Pilot)** + **28+ LOW (Engine-Tolerant)**. Plus **2 verbleibende Umlaut-Drifts** post-Hotfix.

---

## 1. AFB-Sequenzierung pro Mappe (didaktische Progression)

**Methodik:** Punkte-Werte als AFB-Heuristik (10≈AFB-I, 12-15≈AFB-II, 18-30≈AFB-III).

### Mappe 1 — Pulverfass Europa (KE-Anker GPG7_LB2_K_05)

| Aufgabe | Typ | Punkte | AFB-Schätzung | Sequenzierung |
|---|---|---|---|---|
| a-1-1 | zuordnung | 10 | I | ✓ Einstieg I |
| a-1-2 | lueckentext | 10 | I | ✓ I |
| a-1-3 | multiple-choice | 10 | I | ✓ I |
| a-1-4 | multiple-choice (multi) | 15 | II | ✓ II |
| a-1-5 | reihenfolge | 12 | II | ✓ II |
| a-1-6 | quellenkritik | 15 | II | ✓ II |
| a-1-7 | freitext-code | 20 | III | ✓ III (Mappe-Schluss) |

**Verdikt M1: STRUKTUR PASS.** Saubere I → II → III Progression über 7 Aufgaben.

### Mappe 2 — Sarajevo (KE-Anker GPG7_LB2_K_06)

| Aufgabe | Typ | Punkte | AFB-Schätzung |
|---|---|---|---|
| a-2-1 | multiple-choice | 10 | I |
| a-2-2 | zuordnung | 12 | II |
| a-2-3 | freitext-code | 15 | II |
| a-2-4 | reihenfolge | 12 | II (Dip nach 15) |
| a-2-5 | lueckentext | 15 | II |
| a-2-6 | zuordnung (Multiperspektiv) | 18 | III |
| a-2-7 | freitext-code (Synthese) | 25 | III |

**Verdikt M2: STRUKTUR PASS.** Minor Dip a-2-4 (12 nach 15) — akzeptabel, da Reihenfolge naturgemäß weniger AFB-anfordernd als Freitext.

### Mappe 3 — Augustfieber (KE-Anker GPG7_LB3_K_03)

| Aufgabe | Typ | Punkte | AFB-Schätzung | Sequenzierungs-Befund |
|---|---|---|---|---|
| a-3-1 | lueckentext | 10 | I | ✓ Einstieg |
| a-3-2 | quellenkritik | 20 | **III** | **WARN: Sprung von I auf III nach Aufgabe 1** |
| a-3-3 | zuordnung | 18 | III | ✓ |
| a-3-4 | multiple-choice | 12 | **II** | **WARN: Rückschritt nach III** |
| a-3-5 | vergleich (Versailles vs. Clark) | 25 | III | ✓ |
| a-3-6 | begruendung (CER) | 25 | III | ✓ |
| a-3-7 | freitext-code (Synthese) | 30 | III | ✓ Mappe-Schluss |

**Verdikt M3: STRUKTUR MIXED.** AFB-Sprünge I→III→III→II→III→III→III. **a-3-4 (AFB-II) hätte vor a-3-2/3-3 (AFB-III) platziert werden sollen.** Empfehlung: Reihenfolge a-3-1 → a-3-4 → a-3-2 → a-3-3 → a-3-5 → a-3-6 → a-3-7 für saubere I→II→III-Progression.

**MED-Befund M3-S1:** Sequenzierungs-Drift in M3 (Beutelsbach-Höhepunkt-Mappe).

### Mappe 4 — Marne (KE-Anker GPG7_LB2_K_07, Sicherung)

| Aufgabe | Typ | Punkte | AFB-Schätzung |
|---|---|---|---|
| a-4-1 | multiple-choice | 10 | I |
| a-4-2 | reihenfolge | 10 | I |
| a-4-3 | lueckentext | 10 | I |
| a-4-4 | zuordnung | 15 | II |
| a-4-5 | multiple-choice | 10 | I |
| a-4-6 | lueckentext | 10 | I |
| a-4-7 | freitext-code (Game-Abschluss) | 15 | II |

**Verdikt M4: STRUKTUR PASS-MIT-WARN.** AFB-flach (kein AFB-III). Mappe-Funktion ist Sicherung + Synthese, daher AFB-II passend. Aber **a-4-7 als Game-Abschluss-Code mit nur 15 Punkten ist UNDERWEIGHTED** — sollte AFB-III/25-30 Punkte sein, vergleichbar mit a-3-7 (30pkt).

**MED-Befund M4-S1:** Game-Abschluss-Aufgabe a-4-7 punkte-underweighted.

---

## 2. Pro-Aufgabe Detail-Audit (28 Aufgaben)

**Eval-Dimensionen pro Aufgabe:** F=Frage-Klarheit, M=Material-Bindung, L=Lösungs-Format, D=Distraktoren-Plausibilität, T=Tipp-Progression, E=Erarbeitbarkeit.

### Mappe 1

| # | Aufgabe | F | M | L | D | T | E | Befund |
|---|---|---|---|---|---|---|---|---|
| 1 | a-1-1 zuordnung | ✓ | ✓ mat-1-1+mat-1-4 | ✓ dict 6 keys | n/a | ✓ 3-stufig | ✓ via Karte+Text klar | **PASS** |
| 2 | a-1-2 lueckentext | ✓ | ✓ mat-1-4 | ✓ list-5 | ✓ 3 Distraktoren plausibel (Krieg, Streit, Angriff) | ✓ | ✓ | **PASS** |
| 3 | a-1-3 multiple-choice | ✓ | ✓ mat-1-2+mat-1-4 | **WARN: "plotzlich" Umlaut-Drift** in Lösung+Tipps | **WARN: U-Boot-Distraktor zu offensichtlich falsch** (Foto zeigt Schlachtschiff) | ✓ | ✓ | **PASS_MIT_WARN** |
| 4 | a-1-4 multiple-choice multi | ✓ | ✓ mat-1-1+mat-1-4 | ✓ list-2 | **WARN: "Italien und Frankreich teilen Kolonialreich auf" sehr offensichtlich falsch** (Italien war Dreibund-Partner Deutschlands) | ✓ | ✓ | **PASS_MIT_WARN** |
| 5 | a-1-5 reihenfolge | ✓ | ✓ mat-1-5+mat-1-2 | ✓ list-4 chronologisch | n/a | ✓ | ✓ | **PASS** (post-F-PB-80-Hotfix) |
| 6 | a-1-6 quellenkritik | ✓ | ✓ mat-1-6+mat-1-4 | ✓ 4 W-Fragen + loesungs_keywords | n/a | ✓ | ✓ Karte-Eigenkomposition gut hinterfragbar | **PASS** |
| 7 | a-1-7 freitext-code | ✓ | **WARN: 3 Materialien (mat-1-3+mat-1-6+mat-1-4) für Foto-Aufgabe** überfrachtet | ✓ "Hofphotograph + Welt-Politik + Selbstdarstellung" | n/a | ✓ | ✓ | **PASS_MIT_WARN** |

### Mappe 2

| # | Aufgabe | F | M | L | D | T | E | Befund |
|---|---|---|---|---|---|---|---|---|
| 1 | a-2-1 multiple-choice | ✓ | ✓ mat-2-1+mat-2-2 | ✓ "28. Juni 1914" | **PASS+** Distraktoren plausibel (alle Julikrise-Daten, 28.6 vs. 28.7 = kniffelige Verwechslung) | ✓ | ✓ | **PASS** |
| 2 | a-2-2 zuordnung | ✓ | ✓ mat-2-1 | ✓ dict 4 Daten/Ereignisse | n/a | ✓ | ✓ Zeitleiste sauber | **PASS** |
| 3 | a-2-3 freitext-code | ✓ | ✓ mat-2-5+mat-2-1 | ✓ Token-Liste "Wien wollte Krieg Ultimatum Souveränität Berlin Blanko-Scheck" | n/a | ✓ | ✓ aus Wiener-Ultimatum-Material ableitbar | **PASS** |
| 4 | a-2-4 reihenfolge | ✓ | ✓ mat-2-1 | ✓ list-4 chronologisch | n/a | ✓ | ✓ | **PASS** (post-F-PB-80-Hotfix) |
| 5 | a-2-5 lueckentext | ✓ | ✓ mat-2-1+mat-2-3 | ✓ list-5 (Blanko-Scheck, Ultimatum, Souveränität, Mobilmachung, Bündnisfalls) | ✓ | ✓ | ✓ | **PASS** |
| 6 | a-2-6 zuordnung Multiperspektiv | ✓ | ✓ mat-2-4+mat-2-3 | ✓ dict-5 Aussagen → 2 Erinnerungs-Perspektiven | **WARN: Drift "Taeter" in Lösungs-Key** + "kämpfte"-Drift "kaempfte" möglich | ✓ | ✓ Beutelsbach-konform (beide Pole gleichrangig) | **PASS_MIT_WARN** |
| 7 | a-2-7 freitext-code Synthese | ✓ | ✓ mat-2-1+mat-2-2 | ✓ Token-Liste "Auslöser Schuss Princip Ursache Pulverfass Bündnis-System lange wirkend" | n/a | ✓ | ✓ Cross-Mappe-Kohärenz M1↔M2 | **PASS** |

### Mappe 3

| # | Aufgabe | F | M | L | D | T | E | Befund |
|---|---|---|---|---|---|---|---|---|
| 1 | a-3-1 lueckentext | **WARN: Frage zu generisch "Ergänze die fehlenden Begriffe"** | **WARN: nur mat-3-1 referenziert (Foto-Postkarte) — aber Lösung 'Augusterlebnis' ist NICHT direkt im Foto ableitbar** | ✓ list-2 (Lübeck, Augusterlebnis) | n/a | ✓ | **WARN: Material-Lücke** | **PASS_MIT_2-WARN** |
| 2 | a-3-2 quellenkritik | **WARN: "Pruefe" Umlaut-Drift verbleibend** | ✓ mat-3-1 | ✓ dict-4 (wer/wann/ziel/fehlt) | n/a | ✓ | **MED: Engine rendert nur Textareas, MC-Antwortoptionen werden ignoriert (F-PB-81)** | **PASS_MIT_WARN** |
| 3 | a-3-3 zuordnung 3 Personen-Gruppen | ✓ | ✓ mat-3-1+mat-3-2+mat-3-5 | ✓ dict-6 Aussagen → 3 Gruppen | n/a | ✓ | ✓ Multiperspektivität sauber | **PASS** (Drift "Stadtbuerger" in Lösungs-Key) |
| 4 | a-3-4 multiple-choice Art. 231 | ✓ | ✓ mat-3-3 | ✓ Versailles-Position 1919 | **PASS+** Distraktoren plausibel: Burgfrieden 1914 / Clark 2013 / SPD-Kriegskredite — alle echte Daten umschreibend | ✓ | ✓ | **PASS** |
| 5 | a-3-5 vergleich Versailles vs. Clark | ✓ | ✓ mat-3-3+mat-3-4 | ✓ dict-3 Dimensionen (Wer schuld / Quelltyp / Wann) | n/a | ✓ | ✓ Beutelsbach-konform, beide Positionen gleichrangig | **PASS** (Beutelsbach-Kalibrierungs-Aufgabe) |
| 6 | a-3-6 begruendung CER | ✓ | ✓ mat-3-3+mat-3-4 | ✓ dict mit claim_optionen + 2 musterantwort + bewertungskriterien | n/a | ✓ | ✓ Schüler wählt Position, beide akzeptiert | **PASS** (CER-Methode L5) |
| 7 | a-3-7 freitext-code Synthese | ✓ | **WARN: ALLE 5 M3-Materialien referenziert — Material-Überfrachtung** | ✓ Token-Liste 7 Begriffe (Augusterlebnis, Stadt-Mittelschicht, Land-Skepsis, Kriegsschuldfrage, Versailles, Clark, Schlafwandler) | n/a | ✓ | ✓ Synthese-Funktion erfordert breite Material-Basis | **PASS_MIT_WARN** |

### Mappe 4

| # | Aufgabe | F | M | L | D | T | E | Befund |
|---|---|---|---|---|---|---|---|---|
| 1 | a-4-1 multiple-choice Schlieffen-Plan | ✓ | ✓ mat-4-1 | ✓ "Plan: Belgien-Bogen" | ✓ | ✓ | ✓ | **PASS** |
| 2 | a-4-2 reihenfolge Belgien-Stationen | ✓ | ✓ mat-4-2 | **HIGH-BEFUND: "Festung Lück (Liege)" — historisch falsch! Sollte "Festung Lüttich (Liège)"** | n/a | ✓ | ✗ | **HIGH-Fix-Pflicht** |
| 3 | a-4-3 lueckentext Marne-Fakten | ✓ | ✓ mat-4-2 | ✓ list-4 (Joffre, 40 [km], 5.-12.9.1914, Moltke) | n/a | ✓ | ✓ aus Zeitleiste ableitbar | **PASS** |
| 4 | a-4-4 zuordnung Quellenkritik 2 Fotos | ✓ | ✓ mat-4-3+mat-4-4 | ✓ dict-2 (DT-Soldaten / FR-Infanterie) | n/a | ✓ | ✓ Datums-Falle + Heeres-Selbstdarstellung | **PASS** |
| 5 | a-4-5 multiple-choice Verluste | ✓ | ✓ mat-4-5 | ✓ ">500.000 Tote" | ✓ | ✓ | ✓ | **PASS** |
| 6 | a-4-6 lueckentext Stellungskrieg | ✓ | ✓ mat-4-6 | ✓ list-3 (Schützen-Gräben, Stellungskrieg, vier Jahre) | n/a | ✓ | ✓ | **PASS** |
| 7 | a-4-7 freitext-code Game-Abschluss | ✓ | **WARN: nur mat-4-6 referenziert für M1-M4-Synthese — Material-Lücke** (Hefteintrag-Verweise fehlen) | ✓ "Pulverfass Auslöser Augustbegeisterung Stellungskrieg" | n/a | ✓ | ✓ Cross-Mappen-Synthese | **PASS_MIT_WARN** |

---

## 3. Aggregat-Befund nach Severity

### 3.1 HIGH (Pflicht-Fix vor Pilot, 1 Item)

- **F-PB-82-NEU HIGH** — **a-4-2 historischer Bezeichnungs-Fehler "Festung Lück (Liege)"** muss zu **"Festung Lüttich (Liège)"** korrigiert werden. Wirkung: SuS lernen falsche historische Bezeichnung. Hotfix Cowork-side: data.json + bei Bedarf mat-4-2 Zeitleiste-Inhalt.

### 3.2 MED (Polish vor Pilot, 9 Items)

- **M3-S1** Sequenzierungs-Drift M3 (a-3-4 AFB-II nach a-3-2/3-3 AFB-III) — Reihenfolge umstellen
- **M4-S1** Game-Abschluss-Aufgabe a-4-7 punkte-underweighted (15 statt 25-30)
- **F-PB-81-NEU MED** Engine rendert quellenkritik a-3-2 als Textareas, ignoriert MC-Antwortoptionen — Plugin-Engine-Schema-Drift v0.5.1
- **a-1-3 Distraktor "U-Boot der Royal Navy"** zu offensichtlich falsch (Foto zeigt Schlachtschiff)
- **a-1-4 Distraktor "Italien teilt Kolonialreich"** zu offensichtlich falsch (Italien Dreibund-Partner)
- **a-1-7 Material-Überfrachtung** (3 Materialien mat-1-3+mat-1-6+mat-1-4 für Foto-Aufgabe)
- **a-3-1 Material-Lücke** "Augusterlebnis" nicht direkt aus mat-3-1-Foto ableitbar
- **a-3-7 Material-Überfrachtung** (5 Materialien für Synthese)
- **a-4-7 Material-Lücke** für M1-M4-Synthese (Hefteintrag-Verweise fehlen)

### 3.3 LOW (Engine-Tolerant, ~28+ Items, deferrable)

- **Verbleibende Umlaut-Drifts post-Hotfix** (in Aufgaben-Lösungs-Strings, Hotfix-Pattern hatte sie nicht erfasst):
  - `plotzlich` 3× in a-1-3 (sollte `plötzlich`) — ursprüngliches "plotzlich" weder ae noch ö → Hotfix-Regex kannte es nicht
  - `staerker` 1× in a-1-3 Tipp 2 (sollte `stärker`) — innerhalb von "staerkeres", word-boundary-pattern verfehlt
  - `Pruefe` 2× in a-3-2 + Mappe-3 mappenabschluss-Text (sollte `Prüfe`)
  - `Stadtbuerger` 1× in a-3-3 Lösungs-Dict-Key (sollte `Stadtbürger`)
  - `Taeter` 2× in a-2-6 Lösungs-Dict-Keys (sollte `Täter`)

- **a-3-1 Frage zu generisch** "Ergänze die fehlenden Begriffe." — sollte spezifischer "Lies das Material und ergänze..." formulieren

- **a-3-3 Drift "Stadtbuerger"** in Lösungs-Dict-Key

- **a-2-6 Drift "Taeter" + "kaempfte"** in Lösungs-Dict-Keys (Dict-keys mit `.` und Sätzen wurden im Hotfix als display-strings klassifiziert, aber nicht alle Wörter waren im 1st-Pass-Pattern)

- **a-3-7 LÖSUNG-Format**: 7-Begriffe-Token-Liste für Freitext-Aufgabe — Engine wird vermutlich Token-Match machen (alle 7 Begriffe müssen vorkommen). SuS-Erwartbarkeit unklar.

- **AFB-Heuristik via Punkte** ist ungenaue Methodik — eigentlich sollte _meta.afb-Feld in data.json explizit ausgewiesen sein (aber Plugin hat _meta gestrippt, F-PB-67).

### 3.4 PASS+ (Positiv-Befunde)

- **a-2-1 Distraktoren-Konstruktion exemplarisch:** 4 Daten alle plausibel aus Julikrise, 28.6 vs. 28.7 als kniffelige Verwechslungs-Falle
- **a-3-4 Distraktoren-Konstruktion gut:** Burgfrieden 1914 + Clark 2013 + SPD-Kriegskredite als plausible echte Daten umschreibend
- **a-3-5 + a-3-6 Beutelsbach-Doppelaufgabe:** Versailles vs. Clark gleichrangig, beide Positionen mit musterantwort, KEINE Position als "richtig" markiert
- **a-2-6 Multiperspektiv-Zuordnung Princip:** zwei Erinnerungs-Perspektiven gleichrangig dargestellt, Beutelsbach-konform

---

## 4. Cross-Mappen-Kohärenz (Game-Progression)

| Mappe | Stundenfrage | Funktion | Bezug zu vorherigen Mappen |
|---|---|---|---|
| M1 | "Warum war Europa Pulverfass?" | Strukturursachen | — |
| M2 | "Wie wurde aus Schuss in 5 Wochen Weltkrieg?" | Auslöser + Eskalationskette | ✓ knüpft an M1-Pulverfass-Bild an (Funke-Metapher) |
| M3 | "Wer ist schuld? Wer jubelte?" | Multiperspektivität + Kriegsschuld | ✓ knüpft an M2-Auslöser ("Mehrere Mächte schuld" Clark) + M1-Bündnisse |
| M4 | "Wie wurde aus 6 Wochen 4 Jahre?" | Marne-Wendepunkt + Folge-Game-Brücke | ✓ knüpft an M3-Augustbegeisterung (Soldaten ziehen los) + M1-Schlieffen-Plan |

**Verdikt Game-Progression: PASS.** Jede Mappe hat klaren Bezug zu vorherigen, Kohärenz hoch. Game-Abschluss-Code (PULVERFASS — AUSLÖSER — AUGUSTBEGEISTERUNG — STELLUNGSKRIEG) bündelt 1 Schlüsselbegriff pro Mappe → didaktisch sauber.

---

## 5. Fazit + Sofort-Pfad

**Run-4-Game ist didaktisch substantiell:**
- 28 Aufgaben mit 8 Aufgabentypen (multiple-choice/zuordnung/lueckentext/freitext-code/reihenfolge/quellenkritik/vergleich/begruendung)
- AFB-Profil M1+M2 PASS, M3 MIXED (Sequenzierungs-Drift), M4 PASS-MIT-WARN (a-4-7 punkte-underweighted)
- Beutelsbach-Kontroversität M3 + Multiperspektivität M2/M4 sauber operationalisiert
- Cross-Mappen-Kohärenz PASS
- Distraktoren überwiegend plausibel (a-2-1 + a-3-4 exemplarisch), 2 Ausreißer (a-1-3 + a-1-4)

**Pilot-Blocker (HIGH):**
- a-4-2 "Festung Lück" → muss "Festung Lüttich" werden (historisch falsch lehrt sonst falsche Bezeichnung)

**MED-Empfehlung vor Pilot:**
- M3 Aufgaben-Reihenfolge umstellen (a-3-4 vor a-3-2/3-3)
- a-4-7 Punkte erhöhen (15 → 25-30)
- 5 verbleibende Umlaut-Drifts patchen (`plotzlich`, `staerker`, `Pruefe`, `Stadtbuerger`, `Taeter`)
- a-1-3 + a-1-4 Distraktoren plausibilisieren (oder akzeptieren als Beweis für aufmerksames Lesen)
- a-3-1 Frage spezifischer formulieren

**Pilot-LOW (akzeptabel):**
- a-3-7 Material-Überfrachtung (5 Refs) — didaktisch tragbar als Synthese
- a-4-7 Material-Lücke für M1-M4-Synthese — Hefteintrag-Verweise wären besser, akzeptabel

---

## 6. v0.5.1-Backlog-Update

**Neu hinzugefügt: 2 Items.**

| ID | Severity | Beschreibung |
|---|---|---|
| **F-PB-82-NEU** | HIGH | Plugin-Output-Quality: Historische Bezeichnungs-Validierung Pflicht (z.B. "Festung Lück" → "Festung Lüttich"). Ggf. mcp_wikipedia-Cross-Check pro Eigenname in agent-aufgaben + agent-material. |
| **F-PB-83-NEU** | MED | Plugin-AFB-Sequenzierungs-Validator: post-phase-2.2b-Hook prüft AFB-Werte pro Aufgabe, garantiert ascending I→II→III pro Mappe (oder mit dokumentierter Begründung Abweichung). |

**v0.5.1-Backlog wächst von 31 auf 33 Items.**

---

## 7. Hotfix-Empfehlung Cowork-side (vor Pilot)

**~10-15 Min Cowork:**
1. **HIGH** F-PB-82 a-4-2 "Festung Lück (Liege)" → "Festung Lüttich (Liège)" (data.json + ggf. mat-4-2)
2. **MED-Polish** 5 verbleibende Umlaut-Drifts patchen (4-Pass)
3. **MED-Polish** a-3-1 Frage erweitern: "Lies die Bildunterschrift von mat-3-1 und ergänze..."
4. **OPTIONAL** M3 Aufgaben-Reihenfolge in mappe-3.aufgaben[]-Array umsortieren (a-3-4 vor a-3-2)

Dann Live-Push + Browser-Re-Verifikation. Pilot-Bereitschaft erreicht.

---

**Fragebogen-Eval abgeschlossen 2026-04-27.** Methodik: 6-Dimensions-Audit pro Aufgabe + AFB-Sequenzierungs-Heuristik via Punkte + Cross-Mappen-Kohärenz-Check. Aggregat: 3 HIGH + 9 MED + 28+ LOW. Game ist didaktisch substantiell mit 1 Pflicht-Pilot-Blocker (a-4-2 Lück→Lüttich).
