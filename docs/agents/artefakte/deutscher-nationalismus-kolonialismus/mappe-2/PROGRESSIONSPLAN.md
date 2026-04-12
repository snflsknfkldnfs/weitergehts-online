# Progressionsplan: Mappe 2 — Einheit von oben

**Game-ID:** `deutscher-nationalismus-kolonialismus`
**Mappe:** 2 / 4
**Erstellt:** 2026-04-12 (Phase 2.2a, AGENT_RAETSEL)
**Freischalt-Code:** EISEN
**Aufgabenzahl:** 5

---

## Aufgabenzahl-Herleitung

```
basis           = 5
knoten          = 6 (k2-1..k2-6)
materialien     = 6 (mat-2-1..mat-2-6)
knoten_faktor   = 1 (6 > 5)
material_faktor = 1 (6 > 4)
formel          = min(8, 5 + 1 + 1) = 7
```

**Abweichung auf 5 (begründet):** Das kontrastierende Ordnungsmuster erzeugt eine klare binäre Struktur (von unten vs. von oben), die keine feingliedrige Aufschlüsselung erfordert. Die 6 Knoten bilden 3 natürliche Paare (k2-1/k2-2, k2-3/k2-4, k2-5/k2-6), die je in einer Aufgabe diagnostiziert werden können. 2 C-Schritte (nicht 3+) erlauben Zusammenfassung. Freischalt-Code EISEN (5 Buchstaben) ist in meta.json fixiert.

---

## Bloom-Verteilung (Ziel)

```json
{
  "_meta": {
    "bloom_verteilung_ziel": {
      "L1_L2": "20% (1/5 — Pos 1)",
      "L3_L4": "60% (3/5 — Pos 2, 3, 4)",
      "L5_L6": "20% (1/5 — Pos 5)",
      "policy_A19_check": "PASS (max 40% L1-L2: 20% ✓ | min 30% L3-L4: 60% ✓ | min 20% L5-L6: 20% ✓)"
    }
  }
}
```

---

## Progressionstabelle

| Pos | SCPL-Zone | AFB | Bloom | Typ | Ziel-Material | Display-ID | TB-Knoten | Subagent |
|-----|-----------|-----|-------|-----|---------------|------------|-----------|----------|
| 1 | S/C1 | I | L2 | zuordnung | mat-2-1 | M1 | k2-1, k2-2 | SUB_AUFGABE_ZUORDNUNG |
| 2 | C2 | I-II | L2-L3 | reihenfolge | mat-2-2 | M2 | k2-3, k2-4 | SUB_AUFGABE_REIHENFOLGE |
| 3 | C2 | II | L3 | mc | mat-2-3 | M3 | k2-3 | SUB_AUFGABE_MC |
| 4 | P | II | L4 | vergleich | mat-2-4 + mat-2-5 | M4, M5 | k2-5 | SUB_AUFGABE_VERGLEICH |
| 5 | L | III | L5-L6 | freitext | mat-2-6 | M6 | k2-6 | SUB_AUFGABE_FREITEXT |

---

## Typauswahl-Begründung

| Pos | Typ | Begründung (Bloom-Stufe + Material-Struktur) |
|-----|-----|-----------------------------------------------|
| 1 | zuordnung | Kontrastierendes Ordnungsmuster der Mappe → Gegenüberstellung "von unten" vs. "von oben" ist die zentrale Strukturachse. mat-2-1 enthält Bismarcks Zitat im Kontext des gescheiterten Parlamentswegs. Die Gegenüberstellung (links/rechts) ist im Hefteintrag als Darstellung fixiert. Bloom L2: Kategorisierung bekannter Merkmale. |
| 2 | reihenfolge | mat-2-2 beschreibt drei Kriege (1864, 1866, 1870/71) + kleindeutsche Lösung als Ergebnis — eine eindeutige chronologisch-kausale Sequenz. Bloom L2-L3: Chronologie + Ursache-Wirkung-Ordnung. |
| 3 | mc | mat-2-3 (Tagebuch Soldat) erfordert Verständnis-Transfer: Warum entsteht Zusammengehörigkeitsgefühl im Krieg? Kein Fakten-Recall (wäre Lueckentext), sondern Sinnverständnis einer Perspektive. Transfer-MC bei AFB II. Bloom L3. Typ-Wiederholung: keine (mc erstmals verwendet). |
| 4 | vergleich | 2 Bildquellen desselben Ereignisses (Kaiserproklamation): Gemälde (offiziell, Triumph) vs. Karikatur (kritisch, Spott). Min. 3 trennscharfe Dimensionen: (1) Darstellung Bismarcks, (2) Stimmung/Tonalität, (3) Perspektive/Intention (Innen- vs. Außensicht). Bloom L4: Analyse entlang Dimensionen. Material-Struktur: 2 Objekte derselben Kategorienebene (Bildquelle über Reichsgründung). |
| 5 | freitext | Konvention: letzte Position = freitext, AFB III. mat-2-6 (enttäuschter Demokrat) verdichtet die Mappe-Spannung: Einheit ohne Freiheit. Synthese + Beurteilung: War die Reichsgründung das, wofür 1848 gekämpft wurde? Bloom L5-L6. |

**Quellenkritik-Entscheidung:** Nicht eingesetzt. mat-2-1 (Primärquelle) hätte Quellenkritik-Potenzial, ist aber auf Pos 1 (AFB I) — zu früh für L3-L5. mat-2-4/mat-2-5 werden im Vergleich (Pos 4) kontrastiert, was Perspektivitäts-Analyse implizit abdeckt. Anti-Quota-Klausel: kein Mappe-Mindest-Vorkommen.

**Begründung-Entscheidung:** Nicht eingesetzt. Keine echte Streitfrage mit min. 2 vertretbaren Positionen im Material. Die Bewertung "Einheit ohne Freiheit" ist im Freitext (Pos 5) als Stellungnahme-Variante (L5 ohne CER-Pflicht) besser aufgehoben.

---

## Validierungs-Checks

### Typvielfalt
5 verschiedene Typen: zuordnung, reihenfolge, mc, vergleich, freitext ✓ (min. 3 ✓, kein Typ >3x ✓, keine Wiederholung)

### TB-Knoten-Abdeckung
| Knoten | Aufgabe(n) |
|--------|-----------|
| k2-1 (Bismarck) | Pos 1 ✓ |
| k2-2 (Blut und Eisen) | Pos 1 ✓ |
| k2-3 (Drei Einigungskriege) | Pos 2, Pos 3 ✓ |
| k2-4 (Kleindeutsche Lösung) | Pos 2 ✓ |
| k2-5 (Kaiserproklamation) | Pos 4 ✓ |
| k2-6 (Einheit ohne Freiheit) | Pos 5 ✓ |

**Abdeckung:** 6/6 Knoten ✓

### Material-Aktivierung
| Material | Aufgabe (Primärquelle) |
|----------|----------------------|
| mat-2-1 | Pos 1 ✓ |
| mat-2-2 | Pos 2 ✓ |
| mat-2-3 | Pos 3 ✓ |
| mat-2-4 | Pos 4 ✓ |
| mat-2-5 | Pos 4 ✓ |
| mat-2-6 | Pos 5 ✓ |

**Aktivierung:** 6/6 Materialien ✓

### SCPL-Zonen-Abdeckung
| Zone | Aufgabe(n) |
|------|-----------|
| S/C1 | Pos 1 ✓ |
| C2 | Pos 2, Pos 3 ✓ |
| P | Pos 4 ✓ |
| L | Pos 5 ✓ |

**Abdeckung:** 4/4 Zonen ✓

### AFB-Progression
Pos 1 (I) → Pos 2 (I-II) → Pos 3 (II) → Pos 4 (II) → Pos 5 (III) — monoton steigend ✓

### Sachbezogen → Wertbezogen (A12)
Pos 1-3 (S/C-Zonen, sachbezogen) → Pos 4 (P-Zone, analytisch) → Pos 5 (L-Zone, wertbezogen) ✓

---

## Konstruktionskontexte

### Konstruktionskontext 1 — Zuordnung (Pos 1/5)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 1 von 5 |
| AFB-Stufe | I |
| Ziel-Material | mat-2-1 (Quellentext: "Nicht durch Reden — sondern durch Blut und Eisen") — Volltext wird in Phase 2.2b gelesen |
| Material-Display-ID | M1 |
| Material-Zusammenfassungen | mat-2-2 (M2): Drei Einigungskriege und kleindeutsche Lösung. mat-2-3 (M3): Soldat erlebt Krieg gegen Frankreich, Zusammengehörigkeitsgefühl. mat-2-4 (M4): Gemälde Kaiserproklamation, Bismarck im Zentrum. mat-2-5 (M5): Niederländische Karikatur, kritische Außenperspektive. mat-2-6 (M6): Enttäuschter Demokrat 1871, Einheit ohne Freiheit. |
| Material-Position in Sequenz | 1 von 6 (didaktische Funktion: einstieg) |
| TB-Knoten | k2-1 (Bismarck — Ministerpräsident 1862), k2-2 (Blut und Eisen — Merksatz: "Einigung durch Militär statt durch Parlament") |
| Operationalisierungsziel | Ordne die Merkmale der Einigung "von unten" (1848) und "von oben" (1871) richtig zu. (Herleitung: AFB-I-Operator "ordne zu" + Hefteintrag-Gegenüberstellung links/rechts + k2-2-Merksatz "Einigung durch Militär statt durch Parlament") |
| Erarbeitbarkeits-Check | zuordnung auf mat-2-1 — PASS. Material enthält Bismarck-Zitat im Kontext des gescheiterten Parlamentswegs. Hefteintrag fixiert explizite Gegenüberstellung (links: Reden/Parlament/Verfassung/Gescheitert vs. rechts: Kriege/Militär/Macht/Erfolgreich). Pole disjunkt, min. 2 Kategorien. |
| Bereits getestete Inhalte | — (erste Aufgabe) |
| Noch nicht getestete TB-Knoten | k2-3, k2-4, k2-5, k2-6 |

---

### Konstruktionskontext 2 — Reihenfolge (Pos 2/5)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 2 von 5 |
| AFB-Stufe | I-II |
| Ziel-Material | mat-2-2 (Darstellungstext: "Wie setzte Bismarck seine Ankündigung in die Tat um?") — Volltext wird in Phase 2.2b gelesen |
| Material-Display-ID | M2 |
| Material-Zusammenfassungen | mat-2-1 (M1): Bismarcks "Blut und Eisen"-Rede, Bruch mit Parlamentsweg. mat-2-3 (M3): Soldat erlebt Krieg gegen Frankreich, Zusammengehörigkeitsgefühl. mat-2-4 (M4): Gemälde Kaiserproklamation, Bismarck im Zentrum. mat-2-5 (M5): Niederländische Karikatur, kritische Außenperspektive. mat-2-6 (M6): Enttäuschter Demokrat 1871, Einheit ohne Freiheit. |
| Material-Position in Sequenz | 2 von 6 (didaktische Funktion: erarbeitung) |
| TB-Knoten | k2-3 (Drei Einigungskriege 1864/66/70), k2-4 (Kleindeutsche Lösung — Merksatz: "Deutschland ohne Österreich unter Preußens Führung") |
| Operationalisierungsziel | Bringe Bismarcks Weg zur Reichsgründung in die richtige Reihenfolge. (Herleitung: AFB-I/II-Operator "ordne chronologisch" + k2-3 "Drei Einigungskriege 1864/66/70" als Sequenz + k2-4 "Kleindeutsche Lösung" als Ergebnis) |
| Erarbeitbarkeits-Check | reihenfolge auf mat-2-2 — PASS. Material beschreibt drei Kriege (Dänemark 1864, Österreich 1866, Frankreich 1870/71) + Reichsgründung als Ergebnis. Eindeutige chronologische Sequenz aus dem Material ableitbar. Min. 4 Elemente in klarer Ordnung. |
| Bereits getestete Inhalte | Pos 1 (Zuordnung, AFB I): Merkmale von unten/von oben zugeordnet (k2-1, k2-2) |
| Noch nicht getestete TB-Knoten | k2-4, k2-5, k2-6 |

---

### Konstruktionskontext 3 — Multiple Choice (Pos 3/5)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 3 von 5 |
| AFB-Stufe | II |
| Ziel-Material | mat-2-3 (Tagebuch: "Wie erlebte ein Soldat den Krieg gegen Frankreich?") — Volltext wird in Phase 2.2b gelesen |
| Material-Display-ID | M3 |
| Material-Zusammenfassungen | mat-2-1 (M1): Bismarcks "Blut und Eisen"-Rede, Bruch mit Parlamentsweg. mat-2-2 (M2): Drei Einigungskriege und kleindeutsche Lösung. mat-2-4 (M4): Gemälde Kaiserproklamation, Bismarck im Zentrum. mat-2-5 (M5): Niederländische Karikatur, kritische Außenperspektive. mat-2-6 (M6): Enttäuschter Demokrat 1871, Einheit ohne Freiheit. |
| Material-Position in Sequenz | 3 von 6 (didaktische Funktion: erarbeitung) |
| TB-Knoten | k2-3 (Drei Einigungskriege 1864/66/70) — hier: Perspektive auf den Krieg, nicht Fakten (die hat Pos 2 abgedeckt) |
| Operationalisierungsziel | Warum fühlte sich der Soldat nach der Schlacht zum ersten Mal als Deutscher? (Herleitung: AFB-II-Operator "erkläre" + mat-2-3 Soldatenperspektive + k2-3 Einigungskriege als Erfahrungsraum, nicht als Faktenliste) |
| Erarbeitbarkeits-Check | mc auf mat-2-3 — PASS. Transfer-MC: richtige Antwort erfordert Verständnis der Verbindung Kriegserlebnis → Zusammengehörigkeitsgefühl. Distraktoren plausibel (z.B. Befehl des Königs, Siegesfeier, politische Überzeugung). Richtige Antwort aus Material begründbar. |
| Bereits getestete Inhalte | Pos 1 (Zuordnung, AFB I): von unten vs. von oben (k2-1, k2-2). Pos 2 (Reihenfolge, AFB I-II): Chronologie der Einigungskriege (k2-3, k2-4). |
| Noch nicht getestete TB-Knoten | k2-5, k2-6 |

**Abgrenzung zu Pos 2:** Pos 2 testet die Fakten-Chronologie der Einigungskriege (k2-3 als Ereigniskette). Pos 3 testet das Verstehen der Soldatenperspektive auf denselben Knoten — keine Redundanz, da unterschiedlicher kognitiver Zugang (Chronologie vs. Perspektivverständnis).

---

### Konstruktionskontext 4 — Vergleich (Pos 4/5)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 4 von 5 |
| AFB-Stufe | II (Bloom-Ziel: L4 Analyse) |
| Ziel-Material | mat-2-4 (Bildquelle: Kaiserproklamation, Anton von Werner) + mat-2-5 (Bildquelle: Niederländische Karikatur) — Volltext wird in Phase 2.2b gelesen |
| Material-Display-IDs | M4 (Gemälde), M5 (Karikatur) |
| Material-Zusammenfassungen | mat-2-1 (M1): Bismarcks "Blut und Eisen"-Rede, Bruch mit Parlamentsweg. mat-2-2 (M2): Drei Einigungskriege und kleindeutsche Lösung. mat-2-3 (M3): Soldat erlebt Krieg gegen Frankreich, Zusammengehörigkeitsgefühl. mat-2-6 (M6): Enttäuschter Demokrat 1871, Einheit ohne Freiheit. |
| Material-Positionen in Sequenz | 4 und 5 von 6 (didaktische Funktion: erarbeitung + vertiefung) |
| TB-Knoten | k2-5 (Kaiserproklamation Versailles 1871 — Merksatz: "Feierliche Ausrufung Wilhelms I. zum Kaiser") |
| Operationalisierungsziel | Vergleiche, wie das Gemälde und die Karikatur die Reichsgründung darstellen. (Herleitung: AFB-II-Operator "vergleiche" + k2-5-Merksatz + 2 Objekte (Gemälde/Karikatur) + min. 3 Dimensionen: (1) Darstellung Bismarcks/Wilhelms, (2) Stimmung (Triumph vs. Spott), (3) Perspektive (deutsche Innensicht vs. niederländische Außensicht)) |
| Vergleichs-Dimensionen (Vorschlag) | D1: Darstellung Bismarcks (Zentrum vs. Karikaturfigur). D2: Stimmung/Tonalität (feierlich-patriotisch vs. spöttisch-kritisch). D3: Perspektive/Intention (offizielle Selbstdarstellung vs. kritische Außensicht). Optional D4: Publikum/Adressat (Deutsche Nation vs. niederländische Öffentlichkeit). |
| Erarbeitbarkeits-Check | vergleich auf mat-2-4 + mat-2-5 — PASS. 2 Objekte derselben Kategorienebene (Bildquelle über Reichsgründung). Min. 3 trennscharfe Dimensionen ableitbar. Bloom-Ziel L4 durch Mappe gefordert (DIDAKTIK_RAHMEN: AFB II mit Transfer). |
| Bereits getestete Inhalte | Pos 1: von unten/oben (k2-1, k2-2). Pos 2: Chronologie Einigungskriege (k2-3, k2-4). Pos 3: Soldatenperspektive (k2-3). |
| Noch nicht getestete TB-Knoten | k2-6 |

---

### Konstruktionskontext 5 — Freitext (Pos 5/5)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 5 von 5 |
| AFB-Stufe | III |
| Ziel-Material | mat-2-6 (Tagebuch: "War die Reichsgründung das, wofür man 1848 gekämpft hatte?") — Volltext wird in Phase 2.2b gelesen |
| Material-Display-ID | M6 |
| Material-Zusammenfassungen | mat-2-1 (M1): Bismarcks "Blut und Eisen"-Rede, Bruch mit Parlamentsweg. mat-2-2 (M2): Drei Einigungskriege und kleindeutsche Lösung. mat-2-3 (M3): Soldat erlebt Krieg gegen Frankreich, Zusammengehörigkeitsgefühl. mat-2-4 (M4): Gemälde Kaiserproklamation, Bismarck im Zentrum. mat-2-5 (M5): Niederländische Karikatur, kritische Außenperspektive. |
| Material-Position in Sequenz | 6 von 6 (didaktische Funktion: sicherung) |
| TB-Knoten | k2-6 (Einheit ohne Freiheit — Merksatz: "Einheit erreicht, aber keine Demokratie") |
| Operationalisierungsziel | War die Reichsgründung 1871 das, wofür die Menschen 1848 gekämpft hatten? Begründe. (Herleitung: AFB-III-Operator "beurteile/nimm Stellung" + k2-6-Merksatz "Einheit erreicht, aber keine Demokratie" + Rückbezug auf Mappe-1-Wissen: Forderungen der Nationalbewegung 1848) |
| Erarbeitbarkeits-Check | freitext auf mat-2-6 — PASS. Tagebuch des enttäuschten Demokraten liefert die Spannung (Einheit ja, Freiheit nein). Erwartete Antwort enthält objektivierbare Inhaltselemente: Forderungen 1848 (Einheit, Freiheit, Verfassung) vs. Ergebnis 1871 (Einheit ohne Demokratie). Stellungnahme-Variante (L5 ohne CER-Pflicht). |
| Bereits getestete Inhalte | Pos 1: von unten/oben (k2-1, k2-2). Pos 2: Chronologie Einigungskriege (k2-3, k2-4). Pos 3: Soldatenperspektive (k2-3). Pos 4: Gemälde vs. Karikatur (k2-5). |
| Noch nicht getestete TB-Knoten | — (alle abgedeckt) |

---

## Dispatch-Anweisungen (Phase 2.2b)

Für jeden Konstruktionskontext 1-5:

1. `PROGRESSIONSPLAN.md` lesen — NUR den jeweiligen Konstruktionskontext
2. Ziel-Material(ien) lesen — Volltext aus `materialien/mat-2-*.json`
3. `MATERIAL_GERUEST` lesen — NUR titel + didaktische_funktion der anderen mat-IDs
4. Passenden `SUB_AUFGABE_[TYP].md` lesen
5. Aufgabe produzieren → `aufgaben/aufgabe-2-[pos].json`
6. Q-Gate durchlaufen (A1-A3, A4-*, A6-A7, A11-FT)

**Dispatch-Reihenfolge:** Pos 1 → Pos 2 → Pos 3 → Pos 4 → Pos 5 (sequentiell, P4 Dispatch-Isolation)

---

## Freischalt-Code

| Feld | Wert |
|------|------|
| freischalt_code | EISEN |
| Länge | 5 Buchstaben |
| Thematischer Bezug | "Blut und Eisen" — Bismarcks Leitspruch, zentraler Fachbegriff der Mappe |
| Validierung | A-Z ✓, keine Sonderzeichen ✓, 4-8 Zeichen ✓, thematisch passend ✓ |
| Konsistenz | Bereits in meta.json fixiert (Phase 2.0) ✓ |
