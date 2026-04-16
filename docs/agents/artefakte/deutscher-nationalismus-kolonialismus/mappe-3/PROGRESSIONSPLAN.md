# Progressionsplan: Mappe 3 — Deutschlands Griff nach der Welt

**Game-ID:** `deutscher-nationalismus-kolonialismus`
**Mappe:** 3 / 4
**Erstellt:** 2026-04-16 (Phase 2.2a, AGENT_RAETSEL)
**Freischalt-Code:** SONNE
**Aufgabenzahl:** 5

---

## Aufgabenzahl-Herleitung

```
basis           = 5
knoten          = 6 (k3-1..k3-6)
materialien     = 6 (mat-3-1..mat-3-6)
knoten_faktor   = 1 (6 > 5)
material_faktor = 1 (6 > 4)
formel          = min(8, 5 + 1 + 1) = 7
```

**Abweichung auf 5 (begründet):** Das konzept-beispiel Ordnungsmuster erzeugt einen linearen Erkenntnisweg (Imperialismus als Konzept → Berliner Konferenz + Karte als Beispiele → Kolonialisierung als Ergebnis). Die 6 Knoten bilden 3 natürliche Cluster: Motive (k3-1/k3-2/k3-3), Umsetzung (k3-4/k3-5), Wirkung (k3-6). 5 Aufgaben decken alle Cluster ab. Freischalt-Code SONNE (5 Buchstaben) ist in meta.json fixiert.

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
| 1 | C1 | I | L2 | lueckentext | mat-3-2 | M2 | k3-1, k3-2 | SUB_AUFGABE_LUECKENTEXT |
| 2 | S/C1 | II | L3 | mc | mat-3-1 | M1 | k3-3 | SUB_AUFGABE_MC |
| 3 | C2 | II | L4 | vergleich | mat-3-3 + mat-3-4 | M3, M4 | k3-4 | SUB_AUFGABE_VERGLEICH |
| 4 | C1-C3 | I-II | L3 | reihenfolge | mat-3-2, mat-3-3, mat-3-5 | M2, M3, M5 | k3-4, k3-5 | SUB_AUFGABE_REIHENFOLGE |
| 5 | P/L | III | L5-L6 | freitext | mat-3-6 | M6 | k3-6 | SUB_AUFGABE_FREITEXT |

---

## Typauswahl-Begründung

| Pos | Typ | Begründung (Bloom-Stufe + Material-Struktur) |
|-----|-----|-----------------------------------------------|
| 1 | lueckentext | mat-3-2 (Darstellungstext) führt Imperialismus als Oberbegriff ein und benennt konkrete Motive. Lückentext testet kontextgetriebenen Begriffseinsatz: SuS müssen Schlüsselbegriffe (Imperialismus, Rohstoffe, Prestige, verspätete Nation) im Kontext platzieren. Bloom L2: begriffliches Recall + Kontextverständnis. Optimaler Einstieg in konzept-beispiel Ordnungsmuster — das Konzept muss sicher sitzen, bevor Beispiele kommen. |
| 2 | mc | mat-3-1 (Quellentext Bülow) enthält ein Schlagwort ("Platz an der Sonne"), das interpretiert werden muss. Transfer-MC: Was meinte Bülow damit? Richtige Antwort erfordert Sinnverständnis (Deutschland beanspruchte Kolonien und Weltgeltung), nicht bloßes Zitat-Recall. Distraktoren plausibel: Auswanderung, Tourismus, Sonnenkollektoren. Bloom L3: Sinnverständnis einer historischen Quelle. |
| 3 | vergleich | 2 Bildquellen desselben Ereignisses (Berliner Konferenz): Gartenlaube (offizielle Darstellung, neutral-sachlich) vs. Karikatur (kritisch-satirisch, Bismarck als Kuchenverteiler). Min. 3 trennscharfe Dimensionen: (1) Darstellung der Konferenz (Diplomatie vs. Verteilung), (2) Tonalität (sachlich-ernst vs. spöttisch-kritisch), (3) Perspektive/Intention (deutsche Innensicht vs. französische Außensicht). Bloom L4: Analyse entlang Dimensionen. Strukturell identisch mit Mappe-2 Pos 4 (Gemälde vs. Karikatur) — bewährtes Muster. |
| 4 | reihenfolge | Der konzept-beispiel Erkenntnisweg der Mappe bildet eine klare kausale Sequenz: Großmachtstreben → Motive/Imperialismus → Berliner Konferenz → Wettlauf um Afrika → Kolonialisierung. SuS ordnen die Schritte chronologisch-kausal. Min. 5 Elemente in eindeutiger Ordnung. Bloom L3: Ursache-Wirkung-Ordnung + Synthese des Gesamtwegs. Testet Verständnis der SCPL-Gesamtstruktur — nicht einzelne Materialien, sondern den Zusammenhang. |
| 5 | freitext | Konvention: letzte Position = freitext, AFB III. mat-3-6 (Tagebuch afrikanische Perspektive) verdichtet die Mappe-Spannung: Europäer teilten Afrika auf, ohne die Betroffenen zu fragen. Synthese + Beurteilung: War die Berliner Konferenz gerecht? Begründe aus der Perspektive des Tagebucheintrags. Bloom L5-L6. Rückbezug auf alle Materialien möglich (Motive → Konferenz → Karte → Betroffene). |

**Quellenkritik-Entscheidung:** Nicht eingesetzt. mat-3-1 (Bülow-Rede) hätte Quellenkritik-Potenzial (klare Perspektive: deutsche Weltmachtpolitik). Aber: Das Zitat ist kurz (1 Satz), die W-Fragen-Analyse wäre dünn. Der MC (Pos 2) deckt das Sinnverständnis ab, der Vergleich (Pos 3) deckt Perspektivitäts-Analyse ab. Anti-Quota-Klausel: kein Mappe-Mindest-Vorkommen.

**Begründung-Entscheidung:** Nicht eingesetzt. Die Beurteilung der Berliner Konferenz ist im Freitext (Pos 5) als Stellungnahme-Variante (L5 ohne CER-Pflicht) besser aufgehoben — kein CER-Gitter nötig, da die moralische Dimension (Fremdbestimmung ohne Beteiligung) keiner Evidenzstruktur im klassischen Sinn bedarf, sondern einer Perspektivübernahme.

---

## Validierungs-Checks

### Typvielfalt
5 verschiedene Typen: lueckentext, mc, vergleich, reihenfolge, freitext ✓ (min. 3 ✓, kein Typ >3x ✓, keine Wiederholung)

### TB-Knoten-Abdeckung
| Knoten | Aufgabe(n) |
|--------|-----------|
| k3-1 (Kaiserreich als Großmacht) | Pos 1 ✓ |
| k3-2 (Imperialismus) | Pos 1 ✓ |
| k3-3 ("Platz an der Sonne") | Pos 2 ✓ |
| k3-4 (Berliner Konferenz) | Pos 3, Pos 4 ✓ |
| k3-5 (Wettlauf um Afrika) | Pos 4 ✓ |
| k3-6 (Kolonialisierung Afrikas) | Pos 5 ✓ |

**Abdeckung:** 6/6 Knoten ✓

### Material-Aktivierung
| Material | Aufgabe (Primärquelle) |
|----------|----------------------|
| mat-3-1 | Pos 2 ✓ |
| mat-3-2 | Pos 1, Pos 4 ✓ |
| mat-3-3 | Pos 3, Pos 4 ✓ |
| mat-3-4 | Pos 3 ✓ |
| mat-3-5 | Pos 4 ✓ |
| mat-3-6 | Pos 5 ✓ |

**Aktivierung:** 6/6 Materialien ✓

### SCPL-Zonen-Abdeckung
| Zone | Aufgabe(n) |
|------|-----------|
| S/C1 | Pos 1, Pos 2 ✓ |
| C2 | Pos 3 ✓ |
| C3 | Pos 4 ✓ |
| P/L | Pos 5 ✓ |

**Abdeckung:** 4/4 Zonen ✓

### AFB-Progression
Pos 1 (I) → Pos 2 (II) → Pos 3 (II) → Pos 4 (I-II) → Pos 5 (III) — grundsätzlich steigend ✓ (Pos 4 leichter Rückgang auf I-II ist vertretbar: Reihenfolge testet Gesamtstruktur-Verständnis, nicht Einzelwissen)

### Sachbezogen → Wertbezogen (A12)
Pos 1-2 (S/C1-Zonen, sachbezogen) → Pos 3 (C2, analytisch) → Pos 4 (C1-C3, strukturell) → Pos 5 (P/L, wertbezogen) ✓

---

## Konstruktionskontexte

### Konstruktionskontext 1 — Lückentext (Pos 1/5)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 1 von 5 |
| AFB-Stufe | I |
| Ziel-Material | mat-3-2 (Darstellungstext: "Warum wollte Deutschland Kolonien?") — Volltext wird in Phase 2.2b gelesen |
| Material-Display-ID | M2 |
| Material-Zusammenfassungen | mat-3-1 (M1): Bülow-Rede "Platz an der Sonne", deutscher Weltmachtanspruch. mat-3-3 (M3): Gartenlaube-Darstellung der Kongokonferenz, Diplomaten am Tisch. mat-3-4 (M4): Karikatur Bismarck verteilt Afrika-Kuchen. mat-3-5 (M5): Karte Afrika 1913, fast ganz Afrika europäisch. mat-3-6 (M6): Tagebuch afrikanische Perspektive, Land auf fremder Karte aufgeteilt. |
| Material-Position in Sequenz | 2 von 6 (didaktische Funktion: erarbeitung) |
| TB-Knoten | k3-1 (Deutsches Kaiserreich als Großmacht), k3-2 (Imperialismus — Merksatz: "Streben eines Staates, andere Länder zu unterwerfen") |
| Operationalisierungsziel | Setze die fehlenden Begriffe in den Text über Deutschlands Kolonialstreben ein. (Herleitung: AFB-I-Operator "setze ein" + k3-2-Merksatz + mat-3-2 Darstellungstext mit Schlüsselbegriffen Imperialismus, Rohstoffe, Prestige, verspätete Nation) |
| Erarbeitbarkeits-Check | lueckentext auf mat-3-2 — PASS. Material enthält Fachbegriff Imperialismus mit Definition, Motive (Rohstoffe, Absatzmärkte, Prestige), Einordnung "verspätete Nation". Min. 4 sinntragende Lücken aus Material ableitbar. Lücken kontextgesteuert (nicht beliebig austauschbar). |
| Bereits getestete Inhalte | — (erste Aufgabe) |
| Noch nicht getestete TB-Knoten | k3-3, k3-4, k3-5, k3-6 |

---

### Konstruktionskontext 2 — Multiple Choice (Pos 2/5)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 2 von 5 |
| AFB-Stufe | II |
| Ziel-Material | mat-3-1 (Quellentext: "Was forderte Deutschland als neue Großmacht?") — Volltext wird in Phase 2.2b gelesen |
| Material-Display-ID | M1 |
| Material-Zusammenfassungen | mat-3-2 (M2): Motive des Kolonialerwerbs, Imperialismus als Oberbegriff. mat-3-3 (M3): Gartenlaube-Darstellung Kongokonferenz. mat-3-4 (M4): Karikatur Bismarck verteilt Afrika-Kuchen. mat-3-5 (M5): Karte Afrika 1913. mat-3-6 (M6): Tagebuch afrikanische Perspektive. |
| Material-Position in Sequenz | 1 von 6 (didaktische Funktion: einstieg) |
| TB-Knoten | k3-3 ("Platz an der Sonne" — Merksatz: "Deutschlands Forderung nach Kolonien und Weltgeltung") |
| Operationalisierungsziel | Was meinte Bülow mit "Platz an der Sonne"? (Herleitung: AFB-II-Operator "erkläre" + k3-3-Merksatz + Bülow-Zitat als Interpretationsanlass. Transfer-MC: richtige Antwort erfordert Sinnverständnis, nicht Zitat-Wiedergabe.) |
| Erarbeitbarkeits-Check | mc auf mat-3-1 — PASS. Zitat "Platz an der Sonne" muss interpretiert werden. Richtige Antwort: Deutschland beanspruchte Kolonien und Weltgeltung. Distraktoren: (a) Auswanderung in sonnige Länder, (b) bessere Handelsbeziehungen mit Südeuropa, (c) militärische Stützpunkte im Mittelmeer. Aus Materialkontext eindeutig lösbar. |
| Bereits getestete Inhalte | Pos 1 (Lückentext, AFB I): Imperialismus-Motive (k3-1, k3-2) |
| Noch nicht getestete TB-Knoten | k3-4, k3-5, k3-6 |

---

### Konstruktionskontext 3 — Vergleich (Pos 3/5)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 3 von 5 |
| AFB-Stufe | II (Bloom-Ziel: L4 Analyse) |
| Ziel-Material | mat-3-3 (Bildquelle: Gartenlaube-Darstellung der Kongokonferenz) + mat-3-4 (Bildquelle: Karikatur Bismarck schneidet Afrika-Kuchen) — Volltext wird in Phase 2.2b gelesen |
| Material-Display-IDs | M3 (Gartenlaube), M4 (Karikatur) |
| Material-Zusammenfassungen | mat-3-1 (M1): Bülow "Platz an der Sonne". mat-3-2 (M2): Motive Kolonialerwerb, Imperialismus. mat-3-5 (M5): Karte Afrika 1913. mat-3-6 (M6): Tagebuch afrikanische Perspektive. |
| Material-Positionen in Sequenz | 3 und 4 von 6 (didaktische Funktion: erarbeitung + vertiefung) |
| TB-Knoten | k3-4 (Berliner Konferenz 1884/85) |
| Operationalisierungsziel | Vergleiche, wie die Gartenlaube und die Karikatur die Berliner Konferenz darstellen. (Herleitung: AFB-II-Operator "vergleiche" + k3-4 + 2 Objekte (Gartenlaube/Karikatur) + min. 3 Dimensionen) |
| Vergleichs-Dimensionen (Vorschlag) | D1: Darstellung der Konferenz (diplomatisches Treffen vs. Kuchenverteilung). D2: Tonalität (sachlich-ernst vs. spöttisch-kritisch). D3: Perspektive/Intention (deutsche/neutrale Innensicht vs. französische kritische Außensicht). Optional D4: Was wird betont (Verhandlung vs. Machtpolitik). |
| Erarbeitbarkeits-Check | vergleich auf mat-3-3 + mat-3-4 — PASS. 2 Objekte derselben Kategorienebene (Bildquelle über Berliner Konferenz). Min. 3 trennscharfe Dimensionen ableitbar. Bloom-Ziel L4 durch DIDAKTIK_RAHMEN gefordert (AFB II mit Analyse). |
| Bereits getestete Inhalte | Pos 1: Imperialismus-Motive (k3-1, k3-2). Pos 2: "Platz an der Sonne" (k3-3). |
| Noch nicht getestete TB-Knoten | k3-5, k3-6 |

---

### Konstruktionskontext 4 — Reihenfolge (Pos 4/5)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 4 von 5 |
| AFB-Stufe | I-II |
| Ziel-Material | mat-3-2 (Darstellungstext: Motive), mat-3-3 (Bildquelle: Kongokonferenz), mat-3-5 (Karte: Afrika 1913) — Volltext wird in Phase 2.2b gelesen |
| Material-Display-IDs | M2, M3, M5 |
| Material-Zusammenfassungen | mat-3-1 (M1): Bülow "Platz an der Sonne". mat-3-4 (M4): Karikatur Afrika-Kuchen. mat-3-6 (M6): Tagebuch afrikanische Perspektive. |
| Material-Positionen in Sequenz | 2, 3, 5 von 6 |
| TB-Knoten | k3-4 (Berliner Konferenz 1884/85), k3-5 (Wettlauf um Afrika) |
| Operationalisierungsziel | Bringe die Schritte von Deutschlands Kolonialstreben bis zur Aufteilung Afrikas in die richtige Reihenfolge. (Herleitung: AFB-I/II-Operator "ordne" + konzept-beispiel Ordnungsmuster als kausal-chronologische Sequenz: Großmachtstreben → "Platz an der Sonne" → Berliner Konferenz → Wettlauf um Afrika → Kolonialisierung) |
| Erarbeitbarkeits-Check | reihenfolge auf mat-3-2 + mat-3-3 + mat-3-5 — PASS. Konzept-Beispiel-Muster der Mappe bildet eine eindeutige kausale Sequenz mit min. 5 Elementen: (1) Deutschland will Großmacht sein, (2) Motive: Rohstoffe, Prestige, Rivalität, (3) Berliner Konferenz 1884 — Europäer teilen Afrika auf, (4) Wettlauf um Afrika, (5) 1913: fast ganz Afrika in europäischer Hand. Chronologisch + kausal geordnet. |
| Bereits getestete Inhalte | Pos 1: Imperialismus-Motive (k3-1, k3-2). Pos 2: "Platz an der Sonne" (k3-3). Pos 3: Gartenlaube vs. Karikatur (k3-4). |
| Noch nicht getestete TB-Knoten | k3-6 |

**Abgrenzung zu Pos 3:** Pos 3 testet die analytische Kontrastierung zweier Bilder der Berliner Konferenz (k3-4 als Analyse-Objekt). Pos 4 testet die Einordnung der Konferenz in den Gesamtweg (k3-4 als Sequenz-Glied + k3-5 als Ergebnis). Keine Redundanz — unterschiedlicher kognitiver Zugang (Analyse vs. Strukturverständnis).

---

### Konstruktionskontext 5 — Freitext (Pos 5/5)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 5 von 5 |
| AFB-Stufe | III |
| Ziel-Material | mat-3-6 (Tagebuch: "Mein Land auf einer fremden Karte") — Volltext wird in Phase 2.2b gelesen |
| Material-Display-ID | M6 |
| Material-Zusammenfassungen | mat-3-1 (M1): Bülow "Platz an der Sonne". mat-3-2 (M2): Motive Kolonialerwerb. mat-3-3 (M3): Gartenlaube-Darstellung Kongokonferenz. mat-3-4 (M4): Karikatur Afrika-Kuchen. mat-3-5 (M5): Karte Afrika 1913. |
| Material-Position in Sequenz | 6 von 6 (didaktische Funktion: sicherung) |
| TB-Knoten | k3-6 (Kolonialisierung Afrikas — Merksatz: "Fast ganz Afrika in europäischer Hand bis 1913") |
| Operationalisierungsziel | War es gerecht, dass Europäer über Afrika entschieden, ohne die Afrikaner zu fragen? Begründe mit dem Tagebucheintrag. (Herleitung: AFB-III-Operator "beurteile/nimm Stellung" + k3-6-Merksatz + Tagebuch-Perspektive der Betroffenen + Rückbezug auf Stundenfrage "Warum teilten europäische Mächte Afrika unter sich auf — ohne die Afrikaner zu fragen?") |
| Erarbeitbarkeits-Check | freitext auf mat-3-6 — PASS. Tagebuch der afrikanischen Perspektive liefert die emotionale und moralische Dimension (Ohnmacht, Fremdbestimmung). Erwartete Antwort enthält objektivierbare Inhaltselemente: Europäer entschieden am grünen Tisch, kein Afrikaner war dabei, Land und Lebensgrundlagen wurden willkürlich aufgeteilt. Stellungnahme-Variante (L5 ohne CER-Pflicht). |
| Bereits getestete Inhalte | Pos 1: Imperialismus-Motive (k3-1, k3-2). Pos 2: "Platz an der Sonne" (k3-3). Pos 3: Gartenlaube vs. Karikatur (k3-4). Pos 4: Gesamtweg Großmachtstreben → Kolonialisierung (k3-4, k3-5). |
| Noch nicht getestete TB-Knoten | — (alle abgedeckt) |

---

## Dispatch-Anweisungen (Phase 2.2b)

Für jeden Konstruktionskontext 1-5:

1. `PROGRESSIONSPLAN.md` lesen — NUR den jeweiligen Konstruktionskontext
2. Ziel-Material(ien) lesen — Volltext aus `materialien/mat-3-*.json`
3. `MATERIAL_GERUEST` lesen — NUR titel + didaktische_funktion der anderen mat-IDs
4. Passenden `SUB_AUFGABE_[TYP].md` lesen
5. Aufgabe produzieren → `aufgaben/aufgabe-3-[pos].json`
6. Q-Gate durchlaufen (A1-A3, A4-*, A6-A7, A11-FT)

**Dispatch-Reihenfolge:** Pos 1 → Pos 2 → Pos 3 → Pos 4 → Pos 5 (sequentiell, P4 Dispatch-Isolation)

---

## Freischalt-Code

| Feld | Wert |
|------|------|
| freischalt_code | SONNE |
| Länge | 5 Buchstaben |
| Thematischer Bezug | "Platz an der Sonne" — Bülows Schlagwort, zentrales Motiv der Mappe |
| Validierung | A-Z ✓, keine Sonderzeichen ✓, 4-8 Zeichen ✓, thematisch passend ✓ |
| Konsistenz | Bereits in meta.json fixiert (Phase 2.0) ✓ |
