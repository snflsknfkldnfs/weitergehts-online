# Progressionsplan: Mappe 4 — Der Schlieffen-Plan

**Erstellt:** 2026-04-04 (D7, Produktionssession C2)
**Agent:** AGENT_RAETSEL (Orchestrator)
**Eingabe:** mat-4-1 bis mat-4-5 (Metadaten), hefteintrag.json, TAFELBILD Mappe 4, DIDAKTIK_RAHMEN (AFB II-III)

---

## Aufgabenzahl-Ableitung

```
basis          = 5
knoten_faktor  = 1   (6 Knoten > 5 → 1)
material_faktor = 1   (5 Materialien > 4 → 1)
aufgabenzahl   = min(8, 5 + 1 + 1) = 7
```

**Ergebnis: 7 Aufgaben.**

---

## SCPL-Zonen-Mapping + AFB-Progression

| Pos | SCPL-Zone | AFB | Typ | Ziel-Material | TB-Knoten | Operationalisierungsziel |
|-----|-----------|-----|-----|---------------|-----------|--------------------------|
| 1 | S | I | lueckentext | mat-4-1 (M1) | k4-2, k4-1, k4-3 | Ergänze die Fachbegriffe zum Zweifrontenkrieg und zum Schlieffen-Plan. |
| 2 | C1 | I | multiple-choice | mat-4-2 (M2) | k4-1 | Erkenne, warum der Schlieffen-Plan den Angriff durch Belgien vorsah. |
| 3 | C2 | I-II | reihenfolge | mat-4-3 (M3) | k4-4 | Ordne Friedrichs Erlebnisse auf dem Vormarsch in die richtige Reihenfolge. |
| 4 | C3 | II | zuordnung | mat-4-4 (M4) | k4-5 | Unterscheide, was der Schlieffen-Plan vorsah und was an der Marne tatsächlich geschah. |
| 5 | P | II | multiple-choice | mat-4-5 (M5) | k4-6 | Erkenne, warum das Foto einen Stellungskrieg statt eines schnellen Sieges zeigt. |
| 6 | L | II | reihenfolge | alle | k4-1→k4-6 | Ordne die Schritte vom Schlieffen-Plan bis zum Stellungskrieg in die richtige Reihenfolge. |
| 7 | L | III | freitext-code | alle (bes. M5) | Stundenfrage | Beurteile, warum der Plan für einen schnellen Sieg scheitern musste. |

### AFB-Progression

I → I → I-II → II → II → II → III. Monoton steigend. PASS.

### Typvielfalt

5 verschiedene Typen: lueckentext, multiple-choice, reihenfolge, zuordnung, freitext-code.

**Typ-Wiederholungen (begruendet):**
- 2× multiple-choice: Pos 2 testet Faktenwissen (AFB I, Kartenablesung), Pos 5 testet Transfer-Erkennung (AFB II, Foto-Analyse im Kontrast zum Plan).
- 2× reihenfolge: Pos 3 testet Mikro-Chronologie innerhalb eines Materials (Soldatentagebuch), Pos 6 testet Makro-Kausalsequenz über alle Materialien hinweg (strategische Gesamtkette).

### SCPL-Zonen-Abdeckung

| Zone | Aufgabe(n) |
|------|------------|
| S | Pos 1 |
| C1 | Pos 2 |
| C2 | Pos 3 |
| C3 | Pos 4 |
| P | Pos 5 |
| L | Pos 6, Pos 7 |

Alle Zonen abgedeckt. PASS.

### Material-Aktivierung (A18)

| Material | Primärquelle in |
|----------|----------------|
| mat-4-1 (M1) | Pos 1 |
| mat-4-2 (M2) | Pos 2 |
| mat-4-3 (M3) | Pos 3 |
| mat-4-4 (M4) | Pos 4 |
| mat-4-5 (M5) | Pos 5 |

Alle 5 Materialien als Primärquelle aktiviert. PASS.

### TB-Knoten-Abdeckung (A9)

| Knoten | Getestet in |
|--------|-------------|
| k4-1 (Schlieffen-Plan) | Pos 1, Pos 2 |
| k4-2 (Zweifrontenkrieg) | Pos 1 |
| k4-3 (Zeitlücke) | Pos 1 |
| k4-4 (Einmarsch Belgien) | Pos 3 |
| k4-5 (Schlacht Marne) | Pos 4 |
| k4-6 (Stellungskrieg) | Pos 5, Pos 6 |

Alle 6 Knoten mindestens 1× getestet. PASS.

---

## Freischalt-Code

**MARNE** (bereits in meta.json gesetzt, 5 Buchstaben, A-Z, thematischer Bezug: Schlacht an der Marne als Wendepunkt).

---

## Konstruktionskontexte

### Aufgabe 1 (aufgabe-4-1)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 1 von 7 |
| AFB-Stufe | I |
| Typ | lueckentext |
| SCPL-Zone | S (Situation) |
| Ziel-Material | mat-4-1 (M1, Darstellungstext: „Wie wollte Deutschland den Krieg an zwei Fronten gewinnen?") |
| Material-Display-ID | M1 |
| Material-Zusammenfassungen | mat-4-2 (M2): Karte des Schlieffen-Plans mit Angriffspfeilen durch Belgien. mat-4-3 (M3): Tagebuch eines Soldaten auf dem Vormarsch durch Belgien. mat-4-4 (M4): Karte der Schlacht an der Marne mit deutschem Rückzug. mat-4-5 (M5): Foto eines Schützengrabens als Beginn des Stellungskriegs. |
| Material-Position in Sequenz | 1 von 5; didaktische Funktion: erarbeitung |
| TB-Knoten | k4-2 (Zweifrontenkrieg — „Krieg an zwei Seiten gleichzeitig"), k4-1 (Schlieffen-Plan — „Frankreich in 40 Tagen besiegen, bevor Russland angreifen kann"), k4-3 (Zeitlücke — kein Merksatz, Typ: ursache) |
| Operationalisierungsziel | Ergänze die Fachbegriffe zum Zweifrontenkrieg und zum Schlieffen-Plan. Herleitung: AFB-I-Operator „ergänze" + TB-Knoten k4-2/k4-1/k4-3 als Fachbegriff-Recall. |
| Bereits getestete Inhalte | — (erste Aufgabe) |
| Noch nicht getestete TB-Knoten | k4-4, k4-5, k4-6 |
| Erarbeitbarkeits-Check | lueckentext auf mat-4-1 — PASS. Drei Fachbegriffe (Zweifrontenkrieg, Schlieffen-Plan, Mobilmachung) werden im Material DEFINIERT (mit Klammererklärung), nicht nur erwähnt. Eindeutige Lückenbegriffe. |
| Fragestamm-Kurzregel | Max 1 Satz, max 12 Wörter. Kein Operator wörtlich. |

### Aufgabe 2 (aufgabe-4-2)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 2 von 7 |
| AFB-Stufe | I |
| Typ | multiple-choice |
| SCPL-Zone | C1 (Schlieffen-Plan) |
| Ziel-Material | mat-4-2 (M2, Karte: „Welchen Weg plante die deutsche Armee durch Europa?") |
| Material-Display-ID | M2 |
| Material-Zusammenfassungen | mat-4-1 (M1): Erklärt Zweifrontenkrieg als Problem und Schlieffen-Plan als Strategie mit Zeitlücke. mat-4-3 (M3): Tagebuch eines Soldaten auf dem Vormarsch. mat-4-4 (M4): Karte der Marne-Schlacht. mat-4-5 (M5): Schützengraben-Foto. |
| Material-Position in Sequenz | 2 von 5; didaktische Funktion: erarbeitung |
| TB-Knoten | k4-1 (Schlieffen-Plan — „Deutschlands Plan, Frankreich in 40 Tagen zu besiegen, bevor Russland angreifen kann.") |
| Operationalisierungsziel | Erkenne, warum der Schlieffen-Plan den Angriff durch Belgien vorsah. Herleitung: AFB-I-Operator „benenne/erkenne" + k4-1-Merksatz als Kartenablesung. |
| Bereits getestete Inhalte | Aufgabe 1 (LT, AFB I): Fachbegriffe Zweifrontenkrieg, Schlieffen-Plan, Mobilmachung |
| Noch nicht getestete TB-Knoten | k4-4, k4-5, k4-6 |
| Erarbeitbarkeits-Check | multiple-choice auf mat-4-2 — PASS. Karte zeigt Angriffspfeile durch Belgien; richtige Antwort (Umgehung der befestigten Grenze) direkt aus Karte + BU ableitbar. Plausible Distraktoren: Belgien war verbündet / Kürzester Weg / Russland zuerst angreifen. Alle eindeutig falsch. |
| Fragestamm-Kurzregel | Max 1 Satz, max 12 Wörter. |

### Aufgabe 3 (aufgabe-4-3)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 3 von 7 |
| AFB-Stufe | I-II |
| Typ | reihenfolge |
| SCPL-Zone | C2 (Vormarsch durch Belgien) |
| Ziel-Material | mat-4-3 (M3, Tagebuch: „Wie erlebten die Soldaten den Vormarsch?") |
| Material-Display-ID | M3 |
| Material-Zusammenfassungen | mat-4-1 (M1): Erklärt Zweifrontenkrieg und Schlieffen-Plan. mat-4-2 (M2): Karte des Schlieffen-Plans. mat-4-4 (M4): Karte der Marne-Schlacht. mat-4-5 (M5): Schützengraben-Foto. |
| Material-Position in Sequenz | 3 von 5; didaktische Funktion: erarbeitung |
| TB-Knoten | k4-4 (Einmarsch über Belgien) |
| Operationalisierungsziel | Ordne Friedrichs Erlebnisse auf dem Vormarsch in die richtige Reihenfolge. Herleitung: AFB-I/II-Operator „ordne chronologisch" + k4-4 als konkreter Vormarsch aus Soldatenperspektive. |
| Bereits getestete Inhalte | Aufgabe 1 (LT, AFB I): Fachbegriffe. Aufgabe 2 (MC, AFB I): Angriffsweg durch Belgien. |
| Noch nicht getestete TB-Knoten | k4-5, k4-6 |
| Erarbeitbarkeits-Check | reihenfolge auf mat-4-3 — PASS. Tagebuch enthält eindeutige chronologische Sequenz: (1) Stolzer Aufbruch → (2) Schneller Vormarsch durch Belgien → (3) Erschöpfung und Nachschubprobleme → (4) Zweifel am Plan. Alle Elemente im Material klar datiert/sequenziert. |
| Fragestamm-Kurzregel | Max 1 Satz, max 12 Wörter. |

### Aufgabe 4 (aufgabe-4-4)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 4 von 7 |
| AFB-Stufe | II |
| Typ | zuordnung |
| SCPL-Zone | C3 (Schlacht an der Marne) |
| Ziel-Material | mat-4-4 (M4, Karte: „Wo stoppten die Franzosen den deutschen Vormarsch?") |
| Material-Display-ID | M4 |
| Material-Zusammenfassungen | mat-4-1 (M1): Erklärt Zweifrontenkrieg und Schlieffen-Plan. mat-4-2 (M2): Karte des Schlieffen-Plans. mat-4-3 (M3): Tagebuch des Vormarschs. mat-4-5 (M5): Schützengraben-Foto. |
| Material-Position in Sequenz | 4 von 5; didaktische Funktion: erarbeitung |
| TB-Knoten | k4-5 (Schlacht an der Marne, Sept. 1914) |
| Operationalisierungsziel | Unterscheide, was der Schlieffen-Plan vorsah und was an der Marne tatsächlich geschah. Herleitung: AFB-II-Operator „unterscheide" + k4-5 im Kontrast zu k4-1. Zwei Pole: „Schlieffen-Plan (geplant)" vs. „Marne (tatsächlich)". |
| Bereits getestete Inhalte | Aufgabe 1-3: Fachbegriffe, Angriffsweg, Vormarsch-Chronologie |
| Noch nicht getestete TB-Knoten | k4-6 |
| Erarbeitbarkeits-Check | zuordnung auf mat-4-4 — PASS. Karte zeigt geplante Positionen UND tatsächliche Rückzugsbewegungen. Zwei disjunkte Kategorien (Plan vs. Wirklichkeit) mit je 3-4 Elementen aus mat-4-2 (Plan) und mat-4-4 (Realität). Trennschärfe gegeben: z.B. „Frankreich in 40 Tagen besiegen" (Plan) vs. „65 km Rückzug" (Wirklichkeit). |
| Fragestamm-Kurzregel | Max 1 Satz, max 12 Wörter. |

### Aufgabe 5 (aufgabe-4-5)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 5 von 7 |
| AFB-Stufe | II |
| Typ | multiple-choice |
| SCPL-Zone | P (Stellungskrieg) |
| Ziel-Material | mat-4-5 (M5, Bildquelle: „Statt 40 Tagen — vier Jahre Schützengräben") |
| Material-Display-ID | M5 |
| Material-Zusammenfassungen | mat-4-1 (M1): Erklärt Zweifrontenkrieg und Schlieffen-Plan. mat-4-2 (M2): Karte des Schlieffen-Plans. mat-4-3 (M3): Tagebuch des Vormarschs. mat-4-4 (M4): Karte der Marne-Schlacht. |
| Material-Position in Sequenz | 5 von 5; didaktische Funktion: sicherung |
| TB-Knoten | k4-6 (Stellungskrieg — „Beide Seiten graben sich in Schützengräben ein und kämpfen jahrelang um wenige Meter.") |
| Operationalisierungsziel | Erkenne, warum das Foto einen Stellungskrieg statt eines schnellen Sieges zeigt. Herleitung: AFB-II-Operator „erkenne/erkläre" + k4-6-Merksatz als Transfer (Foto-Befund → Schlieffen-Plan-Scheitern). |
| Bereits getestete Inhalte | Aufgabe 1-4: Fachbegriffe, Angriffsweg, Vormarsch, Plan vs. Marne |
| Noch nicht getestete TB-Knoten | — (k4-6 wird hier getestet, alle vorherigen abgedeckt) |
| Erarbeitbarkeits-Check | multiple-choice auf mat-4-5 — PASS. Transfer-MC (AFB II): Foto zeigt Schützengräben. Richtige Antwort erklärt Kontrast zum Bewegungskrieg. Distraktoren: z.B. „Das Foto zeigt eine Übung" / „Die Gräben dienten als Nachschubroute" / „Der Stellungskrieg dauerte nur wenige Wochen". Alle eindeutig falsch. 2× MC begründet: Pos 2 Faktenwissen-MC (Kartenablesung), Pos 5 Transfer-MC (Foto → strategisches Scheitern). |
| Fragestamm-Kurzregel | Max 1 Satz, max 12 Wörter. |

### Aufgabe 6 (aufgabe-4-6)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 6 von 7 |
| AFB-Stufe | II |
| Typ | reihenfolge |
| SCPL-Zone | L (Lösung/Synthese) |
| Ziel-Material | alle Materialien (Synthese-Aufgabe, kein einzelnes Primärmaterial) |
| Material-Display-ID | M1-M5 |
| Material-Zusammenfassungen | mat-4-1 (M1): Erklärt Zweifrontenkrieg und Schlieffen-Plan. mat-4-2 (M2): Karte des Schlieffen-Plans. mat-4-3 (M3): Tagebuch des Vormarschs. mat-4-4 (M4): Karte der Marne-Schlacht. mat-4-5 (M5): Schützengraben-Foto. |
| Material-Position in Sequenz | Übergreifend (alle 5 Materialien) |
| TB-Knoten | k4-1 → k4-4 → k4-5 → k4-6 (Gesamtsequenz) |
| Operationalisierungsziel | Ordne die Schritte vom Schlieffen-Plan bis zum Stellungskrieg in die richtige Reihenfolge. Herleitung: AFB-II-Operator „rekonstruiere die Abfolge" + Gesamtsequenz k4-1→k4-6 als kausale Kette. |
| Bereits getestete Inhalte | Aufgabe 1-5: Alle TB-Knoten einzeln getestet |
| Noch nicht getestete TB-Knoten | — (Synthese) |
| Erarbeitbarkeits-Check | reihenfolge auf alle Materialien — PASS. Gesamtsequenz hat eindeutige chronologisch-kausale Ordnung: Zweifrontenkrieg → Schlieffen-Plan → Einmarsch Belgien → Marne → Stellungskrieg. 5 Elemente, jedes durch eigenes Material fundiert. 2× RF begründet: Pos 3 testet Mikro-Chronologie innerhalb eines Tagebuchs (Soldatenperspektive), Pos 6 testet Makro-Kausalsequenz über alle Materialien (strategische Gesamtkette). |
| Fragestamm-Kurzregel | Max 1 Satz, max 12 Wörter. |

### Aufgabe 7 (aufgabe-4-7)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 7 von 7 |
| AFB-Stufe | III |
| Typ | freitext-code |
| SCPL-Zone | L (Lösung/Transfer) |
| Ziel-Material | mat-4-5 (M5) + Gesamtkontext |
| Material-Display-ID | M5 (primär), M1-M4 (Kontext) |
| Material-Zusammenfassungen | mat-4-1 (M1): Erklärt Zweifrontenkrieg und Schlieffen-Plan. mat-4-2 (M2): Karte des Schlieffen-Plans. mat-4-3 (M3): Tagebuch des Vormarschs. mat-4-4 (M4): Karte der Marne-Schlacht. mat-4-5 (M5): Schützengraben-Foto. |
| Material-Position in Sequenz | Übergreifend (Abschluss) |
| TB-Knoten | Stundenfrage: „Warum scheiterte der Plan für einen schnellen Sieg?" |
| Operationalisierungsziel | Beurteile, warum der Plan für einen schnellen Sieg scheitern musste. Herleitung: AFB-III-Operator „beurteile" + Stundenfrage als Transferfrage. SuS sollen mindestens 2 konkrete Gründe aus den Materialien nennen (z.B. Erschöpfung/Nachschub aus M3, französische Gegenoffensive aus M4) und ein begründetes Urteil formulieren. |
| Bereits getestete Inhalte | Aufgabe 1-6: Alle TB-Knoten, Einzel- und Gesamtsequenz |
| Noch nicht getestete TB-Knoten | — (Synthese + Transfer) |
| Erarbeitbarkeits-Check | freitext-code auf alle Materialien — PASS. Erwartete Antwort enthält objektivierbare Inhaltselemente: Fachbegriffe (Schlieffen-Plan, Stellungskrieg, Zweifrontenkrieg), Fakten (40-Tage-Kalkül, Marne, 65 km Rückzug), Ursachen (Erschöpfung, Nachschub, Gegenoffensive). Minimum-Keywords für ALL-or-nothing: 2-3 (AFB III). |
| Fragestamm-Kurzregel | Max 1 Satz, max 12 Wörter. |
| _meta.teilfragen | Empfohlen: 2 Leitfragen als Scaffolding (z.B. „Nenne zwei Gründe, warum der Schlieffen-Plan scheiterte." + „Erkläre, was statt des schnellen Sieges geschah.") |

---

## Dispatch-Anweisungen (D8-D12)

| Dispatch | Aufgabe | Subagent | Vertrag |
|----------|---------|----------|---------|
| D8 | aufgabe-4-1 (Lückentext, AFB I) | SUB_AUFGABE_LUECKENTEXT | VERTRAG_PHASE_2-2b |
| D9 | aufgabe-4-2 (MC, AFB I) | SUB_AUFGABE_MC | VERTRAG_PHASE_2-2b |
| D10 | aufgabe-4-3 (Reihenfolge, AFB I-II) | SUB_AUFGABE_REIHENFOLGE | VERTRAG_PHASE_2-2b |
| D11 | aufgabe-4-4 (Zuordnung, AFB II) | SUB_AUFGABE_ZUORDNUNG | VERTRAG_PHASE_2-2b |
| D12 | aufgabe-4-5 (MC, AFB II) | SUB_AUFGABE_MC | VERTRAG_PHASE_2-2b |

**Aufgaben 6 und 7 (aufgabe-4-6, aufgabe-4-7):** Werden als D12b und D12c dispatcht (Reihenfolge → SUB_AUFGABE_REIHENFOLGE, Freitext → SUB_AUFGABE_FREITEXT). Dispatch-Skript-Update erforderlich.

**Hinweis:** Das Dispatch-Skript definiert D8-D12 als 5 Aufgaben-Slots. Die Aufgabenzahl-Ableitung ergibt 7 Aufgaben. Die zusätzlichen Dispatches D12b und D12c müssen im Fortschritts-Tracker ergänzt werden.
