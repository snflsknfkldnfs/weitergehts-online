# Q-Gate-Log: Mappe 2 — Phase 2.0 (Rahmen-Produktion)

**Game-ID:** gpg-erster-weltkrieg-ursachen
**Mappe:** 2 — Das Attentat von Sarajevo
**Phase:** 2.0
**Datum:** 2026-04-01
**Vertrag:** VERTRAG_PHASE_2-0_RAHMEN.md

## Ergebnis: PASS

| # | Kriterium | Ergebnis | Detail |
|---|---|---|---|
| C1b | einstieg.problemstellung === tafelbild.stundenfrage | PASS | Beide: "Wie konnte ein einziger Mord einen Weltkrieg auslösen?" |
| M3b | sicherung.kernerkenntnisse[] === tafelbild.scpl.loesung[] | PASS | 3 Sätze identisch (wortgleich, nicht paraphrasiert) |
| V1 | zusammenfassung vorhanden | PASS | — |
| V2 | ueberleitung vorhanden | PASS | Verweist auf Mappe 3 (Kriegsbegeisterung/Reaktionen) |
| V3 | kernerkenntnisse[] vorhanden (3 Einträge) | PASS | — |
| V4 | reflexionsimpuls vorhanden | PASS | = transfer.frage aus Tafelbild |
| V5 | hefteintrag_verweis vorhanden | PASS | — |
| V6 | zitat-Objekt (Schritt 7b) | PASS | zit-2-1 aus MATERIAL_GERUEST Sicherung-Sektion übernommen |
| V7 | freischalt_code Konvention (A-Z, 4-8, keine Umlaute) | PASS | "FUNKE" (5 Zeichen, thematisch: Attentat als Funke) |

## Produzierte Dateien

```
rahmen/
  tafelbild.json    ✓ (1:1 TB-FREEZE)
  einstieg.json     ✓
  sicherung.json    ✓ (inkl. M3b + zitat)
  meta.json         ✓
```

---

# Q-Gate-Log: Mappe 2 — Phase 2.1 (Material-Produktion)

**Phase:** 2.1
**Datum:** 2026-04-01
**Vertrag:** VERTRAG_PHASE_2-1_MATERIAL.md
**User-Validierung E1:** PASS (nach mat-2-1 + mat-2-2)

## Materialien

| mat-ID | Typ | Titel | W | Q-Gate | TB-Knoten |
|---|---|---|---|---|---|
| mat-2-1 | darstellungstext | Warum schwelte es auf dem Balkan? | 148 | PASS | k2-6, k2-1, k2-2 |
| mat-2-2 | bildquelle | Wie stellte man sich das Attentat vor? | — | PASS | k2-1 |
| mat-2-3 | bildquelle | Die letzten Minuten vor dem Attentat | — | PASS | k2-1 |
| mat-2-4 | quellentext | Was forderte Österreich-Ungarn von Serbien? | 82 | PASS | k2-3, k2-4 |
| mat-2-5 | zeitleiste | Wie wurde aus einem Mord in 37 Tagen ein Weltkrieg? | 8 Eintr. | PASS | k2-3, k2-4, k2-5 |
| mat-2-6 | quellentext (tagebuch) | Wie erlebte ein Bewohner Sarajevos den 28. Juni 1914? | 118 | PASS | k2-6, k2-1 |

## Gesamt-Ergebnis Phase 2.1: PASS (6/6)

---

# Q-Gate-Log: Mappe 2 — Phase 2.1c (Material-Cross-Konsistenz)

**Phase:** 2.1c (Strategie-Audit E2)
**Datum:** 2026-04-01
**Vertrag:** VERTRAG_PHASE_2-1c_CROSS.md

## 4 Prüfachsen

| # | Achse | Ergebnis | Detail |
|---|---|---|---|
| 1 | Sequenz-Kohärenz | PASS | Kein Material setzt einen nicht-eingeführten Fachbegriff voraus. Erkenntnisweg: Balkankrise→Attentat→Auslöser/Ursache→Blankoscheck/Ultimatum→Kettenreaktion→Personifizierung |
| 2 | Fachbegriff-Konsistenz | PASS | 5 Fachbegriffe geprüft (Attentat, Auslöser vs. Ursache, Blankoscheck, Ultimatum, Annexion). Keine Widersprüche |
| 3 | Überleitung-Kohärenz | PASS | Alle 5 ueberleitung_von-Verweise korrekt: mat-2-1→2-2→2-3→2-4→2-5→2-6 |
| 4 | TB-Knoten-Gesamtabdeckung | PASS | 6/6 Knoten abgedeckt. k2-5 (Kettenreaktion) nur durch mat-2-5 — akzeptabel, da Zeitleiste den Knoten visuell stark transportiert |

## Gesamt-Ergebnis Phase 2.1c: PASS (4/4)

---

---

# Q-Gate-Log: Mappe 2 — Phase 2.2a (Progressionsplan)

**Phase:** 2.2a
**Datum:** 2026-04-01
**Vertrag:** VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md

## Progressionsplan

| Pos | AFB | Typ | Ziel-Material | TB-Knoten | Subagent |
|-----|-----|-----|---------------|-----------|----------|
| 1 | I | multiple-choice | mat-2-2 (M2) + mat-2-3 (M3) | k2-1 | SUB_AUFGABE_MC |
| 2 | I | zuordnung | mat-2-1 (M1) | k2-2, k2-6 | SUB_AUFGABE_ZUORDNUNG |
| 3 | II | reihenfolge | mat-2-5 (M5) | k2-3, k2-4, k2-5 | SUB_AUFGABE_REIHENFOLGE |
| 4 | II | lueckentext | mat-2-4 (M4) | k2-3, k2-4 | SUB_AUFGABE_LUECKENTEXT |
| 5 | III | freitext-code | mat-2-6 (M6) | k2-2, k2-5 | SUB_AUFGABE_FREITEXT |

## Validierung

| Kriterium | Ergebnis | Detail |
|-----------|----------|--------|
| A5 AFB-Progression | PASS | I → I → II → II → III (monoton steigend) |
| A9 TB-Abdeckung | PASS | Alle 6 Knoten (k2-1 bis k2-6) mind. 1x |
| A10 Typvielfalt | PASS | 5 Typen, keiner >1x, Freitext 1x (Pos 5) |
| A3 Material-Vollst. | PASS | Alle 6 Materialien mind. 1x referenziert |
| A12 Sachbez.→Wertbez. | PASS | Fakten (1-2) → Transfer (3-4) → Stellungnahme (5) |
| Freischalt-Code | PASS | FUNKE (5 Z., A-Z, thematisch) |

## Gesamt-Ergebnis Phase 2.2a: PASS

---

# Q-Gate-Log: Mappe 2 — Phase 2.2b (Aufgaben-Produktion)

**Phase:** 2.2b
**Datum:** 2026-04-01

## Aufgaben

### aufgabe-2-1 (MC, AFB I, Pos 1)

| Kriterium | Ergebnis | Detail |
|-----------|----------|--------|
| A1 AFB-Kongruenz | PASS | AFB I: Faktenwissen aus Bildunterschriften identifizieren |
| A2 Fragestamm-Klarheit | PASS | Eine kognitive Anforderung (identifiziere richtige Aussage) |
| A3 Material-Kongruenz | PASS | Princip, Franz Ferdinand, Sophie, 28.6.1914, Sarajevo — alles in mat-2-2 + mat-2-3 |
| A4-MC Distractor-Qualität | PASS | B: Rang 1 (Fehlvorstellung), C: Rang 2 (Teilwahrheit), D: Rang 2 (Teilwahrheit). 3/3 Rang 1-2 |
| A6 Tipp-Progression | PASS | Materialverweis → Ausschluss C+D → Lösung + Erklärung |
| A7 Operator-Präzision | PASS | Implizit "identifiziere" via "Welche Aussage ist richtig?" |
| MQ3 Display-Referenzen | PASS | `[[mat-2-2|...]]` (M2) + `[[mat-2-3|...]]` (M3) |

**Ergebnis: PASS**

### aufgabe-2-2 (Zuordnung, AFB I, Pos 2)

| Kriterium | Ergebnis | Detail |
|-----------|----------|--------|
| A1 AFB-Kongruenz | PASS | AFB I: Kategorisierung (Sachverhalte → Ursache/Auslöser) |
| A2 Fragestamm-Klarheit | PASS | Zuordnungslogik klar: Sachverhalt → Kategorie |
| A3 Material-Kongruenz | PASS | Alle 5 Elemente + Begriffsunterscheidung explizit in mat-2-1 |
| A4-ZU Trennschärfe | PASS | mat-2-1 definiert Auslöser/Ursache explizit. Asymmetrie 4:1 didaktisch gewollt |
| A6 Tipp-Progression | PASS | Absatzverweis → Verteilungslogik → Vollständig + Zitat |
| A7 Operator-Präzision | PASS | "Ordne ... zu" |
| MQ3 Display-Referenzen | PASS | `[[mat-2-1|...]]` (M1) |

**Ergebnis: PASS**

### aufgabe-2-3 (Reihenfolge, AFB II, Pos 3)

| Kriterium | Ergebnis | Detail |
|-----------|----------|--------|
| A1 AFB-Kongruenz | PASS | AFB II: Chronologische Reorganisation |
| A2 Fragestamm-Klarheit | PASS | Ordnungsprinzip explizit (Reihenfolge Auslöser → Weltkrieg) |
| A3 Material-Kongruenz | PASS | Alle 5 Elemente in mat-2-5 dokumentiert |
| A4-RF Eindeutigkeit | PASS | Paarweise: Attentat < Blankoscheck < Ultimatum < Kriegserklärung < GB-Eintritt |
| A6 Tipp-Progression | PASS | Startpunkt → Position 1+5 → Vollständig + Erklärung |
| A7 Operator-Präzision | PASS | "Bringe in die richtige Reihenfolge" |
| MQ3 Display-Referenzen | PASS | `[[mat-2-5|...]]` (M5) |
| Anti-Pattern Daten | PASS | Keine Datumsangaben in Elementen |

**Ergebnis: PASS**

### aufgabe-2-4 (Lückentext, AFB II, Pos 4)

| Kriterium | Ergebnis | Detail |
|-----------|----------|--------|
| A1 AFB-Kongruenz | PASS | AFB II: Fachbegriffe in kausalem Zusammenhang ergänzen |
| A2 Fragestamm-Klarheit | PASS | "Ergänze die fehlenden Begriffe" |
| A3 Material-Kongruenz | PASS | Blankoscheck, Ultimatum, Ermittlungen, 48 — alle in mat-2-4 |
| A4-LT Lücken-Eindeutigkeit | PASS | Alle 4 Lücken eindeutig (keine Synonyme möglich) |
| A6 Tipp-Progression | PASS | Materialverweis → Thematische Eingrenzung → Alle + Erklärung |
| A7 Operator-Präzision | PASS | "Ergänze" |
| MQ3 Display-Referenzen | PASS | `[[mat-2-4|...]]` (M4) |

**Ergebnis: PASS**

### aufgabe-2-5 (Freitext, AFB III, Pos 5)

| Kriterium | Ergebnis | Detail |
|-----------|----------|--------|
| A1 AFB-Kongruenz | PASS | AFB III: Stellungnahme ("Beurteile, ob...") |
| A2 Fragestamm-Klarheit | PASS | Problemorientiert, 2 Perspektiven, keine Suggestivformulierung |
| A3 Material-Kongruenz | PASS | Alle 5 erwarteten Begriffe in Materialien eingeführt |
| A6 Tipp-Progression | PASS | Strukturhinweis → Perspektivwechsel → Musterantwort |
| A7 Operator-Präzision | PASS | "Beurteile" = AFB-III-Operator |
| A11-FT Freitext-Qualität | PASS | Leitfrage problemorientiert, 3 Teilfragen, 5 Fachbegriffe (Schwelle 3), 2 Perspektiven |
| MQ3 Display-Referenzen | PASS | `[[mat-2-6|...]]` (M6) + `[[mat-2-1|...]]` (M1) |

**Ergebnis: PASS**

## Gesamt-Ergebnis Phase 2.2b: PASS (5/5)

---

# Q-Gate-Log: Mappe 2 — Phase 2.2c (Cross-Konsistenz Aufgaben)

**Phase:** 2.2c
**Datum:** 2026-04-01

## Cross-Aufgaben-Prüfung

| Kriterium | Ergebnis | Detail |
|-----------|----------|--------|
| A5 AFB-Progression | PASS | I → I → II → II → III. Keine Regression |
| A3 Material-Vollständigkeit | PASS | 6/6 Materialien in mind. 1 Aufgabe referenziert |
| A8 Kognitive Aktivierung | PASS | Aufgabe 5 (Freitext) fordert eigenständige Beurteilung |
| A9 TB-Abdeckung | PASS | 6/6 Knoten in mind. 1 Aufgabe |
| A10 Typvielfalt | PASS | 5 Typen, keiner >1x, Freitext 1x (Pos 5) |
| A12 Sachbez.→Wertbez. | PASS | Fakten (1-2) → Transfer (3-4) → Stellungnahme (5) |
| Redundanz | PASS | Kein inhaltlicher Overlap zwischen Aufgaben |
| MQ3 Display-Referenzen | PASS | Alle Aufgaben nutzen `[[mat-id|Text]]` (M-Position) |

## Gesamt-Ergebnis Phase 2.2c: PASS

---

# Gesamtergebnis Phase 2 — Mappe 2

| Phase | Ergebnis | Aufgaben |
|-------|----------|----------|
| 2.0 Rahmen | PASS | tafelbild.json, einstieg.json, sicherung.json, meta.json |
| 2.1 Materialien | PASS (6/6) | mat-2-1 bis mat-2-6 |
| 2.1c Cross-Konsistenz | PASS (4/4) | Sequenz, Fachbegriffe, Überleitungen, TB-Abdeckung |
| 2.2a Progressionsplan | PASS | PROGRESSIONSPLAN.md |
| 2.2b Aufgaben | PASS (5/5) | aufgabe-2-1 bis aufgabe-2-5 |
| 2.2c Cross-Konsistenz | PASS | A5, A3, A8-A10, A12, Redundanz, MQ3 |

**Phase 2 Mappe 2: PASS. Bereit für Phase-2-Abschluss (Übergabe-Prompt für Claude Code).**
