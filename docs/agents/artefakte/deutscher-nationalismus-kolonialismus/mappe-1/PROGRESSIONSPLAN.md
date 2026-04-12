# Progressionsplan Mappe 1 — Der Traum von der Einheit

**Game-ID:** `deutscher-nationalismus-kolonialismus`
**Mappe:** 1
**Stundenfrage:** „Warum kämpften Menschen 1848 für ein geeintes Deutschland?"
**Erstellt:** 2026-04-12 (Phase 2.2a, AGENT_RAETSEL)
**Freischalt-Code:** `EINHEIT`

---

## Aufgabenzahl-Herleitung

```
basis          = 5
knoten_faktor  = 1   (7 Knoten → ceil(7/5)=2, gekappt auf 1)
material_faktor = 1   (6 Materialien > 4)
aufgabenzahl   = min(8, 5+1+1) = 7
```

---

## _meta.bloom_verteilung_ziel

| Bloom-Bereich | Soll (Policy) | Plan (7 Aufgaben) | Anteil |
|---|---|---|---|
| L1-L2 (Reproduktion) | max 40 % | 1 | 14,3 % ✓ |
| L3-L4 (Reorganisation/Transfer) | min 30 % | 4 | 57,1 % ✓ |
| L5-L6 (Reflexion/Urteil) | min 20 % | 2 | 28,6 % ✓ |

---

## SCPL-Zonen-Mapping

| Pos | SCPL-Zone | AFB | Bloom | Beschreibung |
|---|---|---|---|---|
| 1 | S (Situation) | I | L1 | Kontext/Vorwissen: Nationalgedanke nach Befreiungskriegen |
| 2 | C1 (Complication 1) | I | L3 | Erarbeitungsschritt 1a: Hambacher Fest — Symbole und Forderungen |
| 3 | C1 (Complication 1) | I-II | L3 | Erarbeitungsschritt 1b: Quellentext — Forderungen der Festredner |
| 4 | C2 (Complication 2) | II | L3 | Erarbeitungsschritt 2: Eskalation zur Märzrevolution |
| 5 | C3 (Complication 3) | II | L3 | Erarbeitungsschritt 3: Nationalversammlung und Verfassung |
| 6 | P (Problem) | II-III | L5 | Problemverständnis: Königs Ablehnung und Volkssouveränität |
| 7 | L (Lösung) | III | L5 | Transfer/Beurteilung: Scheitern der Revolution bewerten |

---

## Progressionstabelle

| Pos | Typ | AFB | Bloom | Material | TB-Knoten | SCPL | Operationalisierungsziel | Typ-Begründung |
|---|---|---|---|---|---|---|---|---|
| 1 | lueckentext | I | L1 | mat-1-1 | k1-1 | S | Ergänze die Fachbegriffe zum Nationalgedanken nach den Befreiungskriegen. | Tagebuch führt Schlüsselbegriffe (Nationalgedanke, Befreiungskriege) ein → Lückentext testet Fachbegriff-Recall am Einstiegsmaterial. |
| 2 | zuordnung | I | L3 | mat-1-2 | k1-2, k1-3 | C1 | Ordne zu, welche Zeichen auf dem Bild des Hambacher Festes für welche Forderung der Nationalbewegung stehen. | Bildquelle enthält visuelle Symbole (Fahnen, Menschenmenge) + abstrakte Forderungen (Einheit, Freiheit) → Zuordnung testet Kategorisierung Bild-Konzept. |
| 3 | multiple-choice | I-II | L3 | mat-1-3 | k1-2, k1-3 | C1 | Erkenne, welche zentrale Forderung die Festredner auf dem Hambacher Fest erhoben. | Quellentext enthält explizite Forderungen in historischer Sprache → MC testet Transfer-Verständnis (Quellenzitat → richtige Zusammenfassung erkennen). |
| 4 | reihenfolge | II | L3 | mat-1-4 | k1-4 | C2 | Bringe die Schritte von der friedlichen Forderung zum bewaffneten Aufstand in die richtige Reihenfolge. | Bildquelle zeigt Endpunkt einer Eskalationskette → Reihenfolge testet Prozessverständnis (Forderung → Verbot → Barrikade → Revolution). |
| 5 | multiple-choice | II | L3 | mat-1-5 | k1-5 | C3 | Erkläre, welche Aufgabe die Nationalversammlung in der Paulskirche hatte. | Darstellungstext beschreibt Parlament, Verfassung, Grundrechte → MC testet Verständnis der Kernfunktion (Transfer: komplexer Text → korrekte Aussage auswählen). 2× MC begründet: Pos 1 = Fachbegriff-Recall (L1), Pos 5 = Transfer-Verständnis (L3) — unterschiedlicher AFB und Bloom-Level. |
| 6 | quellenkritik | II-III | L5 | mat-1-6 | k1-6, k1-7 | P | Untersuche das Zitat des Königs: Wer sprach, warum lehnte er ab, und was verrät das über seine Haltung zur Volkssouveränität? | Primärquelle mit eindeutiger Perspektive (Verachtung des Königs für Volkssouveränität) + archaische Sprache (F2: „imaginäre Krone, aus Dreck und Letten gebacken") → Quellenkritik testet W-Fragen-Analyse + Paraphrase + Perspektiv-Bewertung. Max 1 Quellenkritik/Mappe eingehalten. |
| 7 | freitext-code | III | L5 | mat-1-5, mat-1-6 | k1-7 | L | Beurteile, warum die Revolution von 1848 scheiterte und was das für die Idee der Volkssouveränität bedeutete. | Stundenfrage-Synthese erfordert offene Stellungnahme mit Material-Belegen → Freitext testet Bewertungskompetenz (L5) als Mappe-Abschluss. |

---

## AFB-Progression

```
Pos 1: AFB I   → Pos 2: AFB I   → Pos 3: AFB I-II → Pos 4: AFB II
→ Pos 5: AFB II → Pos 6: AFB II-III → Pos 7: AFB III
```

Monoton steigend ✓. Keine Regression.

---

## Typvielfalt-Check

| Typ | Vorkommen | Positionen |
|---|---|---|
| lueckentext | 1× | 1 |
| zuordnung | 1× | 2 |
| multiple-choice | 2× | 3, 5 |
| reihenfolge | 1× | 4 |
| quellenkritik | 1× | 6 |
| freitext-code | 1× | 7 |

6 verschiedene Typen (min 3 ✓). Kein Typ > 3× ✓.
MC-Wiederholung begründet: Pos 3 (AFB I-II, Quellenzitat-Verständnis) vs. Pos 5 (AFB II, Darstellungstext-Transfer) — unterschiedliches Material, unterschiedlicher AFB, unterschiedliche kognitive Anforderung.

---

## TB-Knoten-Abdeckung

| Knoten | Aufgabe(n) |
|---|---|
| k1-1 Befreiungskriege gegen Napoleon | Pos 1 |
| k1-2 Wartburgfest 1817 / Hambacher Fest 1832 | Pos 2, 3 |
| k1-3 Nationalbewegung | Pos 2 |
| k1-4 Märzrevolution 1848 | Pos 4 |
| k1-5 Nationalversammlung Paulskirche | Pos 5 |
| k1-6 Scheitern 1849 | Pos 6 |
| k1-7 Volkssouveränität | Pos 6, 7 |

7/7 Knoten abgedeckt ✓.

---

## Material-Aktivierung

| Material | Primärquelle in Aufgabe |
|---|---|
| mat-1-1 (tagebuch) | Pos 1 ✓ |
| mat-1-2 (bildquelle) | Pos 2 ✓ |
| mat-1-3 (quellentext) | Pos 3 ✓ |
| mat-1-4 (bildquelle) | Pos 4 ✓ |
| mat-1-5 (darstellungstext) | Pos 5, 7 ✓ |
| mat-1-6 (quellentext) | Pos 6, 7 ✓ |

6/6 Materialien als Primärquelle aktiviert ✓.

---

## Didaktik-Findings-Integration

| Finding | Aufgaben-Bezug |
|---|---|
| F1: mat-1-1 Tagebuch-Fiktion nicht vor Quellenangabe erkennbar | Pos 1 (Lückentext) — Fiktionalität wird NICHT in Pos 1 thematisiert (AFB I, zu früh). Kann im Tipp Stufe 3 als Hinweis erscheinen. |
| F2: mat-1-6 „imaginäre Krone, aus Dreck und Letten gebacken" R7-Grenzfall | Pos 6 (Quellenkritik) — Paraphrase des Zitats als W-Frage integriert (Was meint der König mit „Krone aus der Gosse"?). |

---

## Konstruktionskontexte

### Aufgabe 1 — Lückentext (Pos 1, S-Zone)

| Feld | Wert |
|---|---|
| Aufgaben-Position | 1 von 7 |
| AFB-Stufe | I |
| Bloom-Level | L1 (Erinnern) |
| Ziel-Material | mat-1-1 (Tagebuch: Ein Student auf dem Wartburgfest) |
| Material-Display-ID | M1 |
| Material-Zusammenfassungen | mat-1-2 (M2): Bild des Hambacher Festes zeigt die Nationalbewegung als Massenphänomen. mat-1-3 (M3): Rede auf dem Hambacher Fest fordert Einheit, Freiheit, Volkssouveränität. mat-1-4 (M4): Barrikadenkampf in Berlin zeigt Eskalation zur Märzrevolution. mat-1-5 (M5): Darstellungstext über Nationalversammlung, Verfassung und Grundrechte. mat-1-6 (M6): König lehnt Kaiserkrone ab — Revolution scheitert. |
| Material-Position in Sequenz | 1 von 6 (didaktische Funktion: einstieg) |
| TB-Knoten | k1-1 (Befreiungskriege gegen Napoleon) |
| Operationalisierungsziel | Ergänze die Fachbegriffe zum Nationalgedanken nach den Befreiungskriegen. (Herleitung: AFB-I-Operator „nenne/ergänze" + k1-1 Befreiungskriege → Nationalgedanke als Schlüsselbegriff) |
| Erarbeitbarkeits-Check | lueckentext auf mat-1-1 — Tagebuch enthält die Fachbegriffe „Befreiungskriege" und „Nationalgedanke" in definierendem Kontext. PASS. |
| Bereits getestete Inhalte | — (erste Aufgabe) |
| Noch nicht getestete TB-Knoten | k1-2, k1-3, k1-4, k1-5, k1-6, k1-7 |

### Aufgabe 2 — Zuordnung (Pos 2, C1-Zone)

| Feld | Wert |
|---|---|
| Aufgaben-Position | 2 von 7 |
| AFB-Stufe | I |
| Bloom-Level | L3 (Anwenden) |
| Ziel-Material | mat-1-2 (Bildquelle: Das Hambacher Fest — Zug zum Schloss) |
| Material-Display-ID | M2 |
| Material-Zusammenfassungen | mat-1-1 (M1): Tagebuch eines Studenten auf dem Wartburgfest 1817 — Nationalgedanke nach Befreiungskriegen. mat-1-3 (M3): Rede auf dem Hambacher Fest fordert Einheit, Freiheit, Volkssouveränität. mat-1-4 (M4): Barrikadenkampf in Berlin zeigt Eskalation zur Märzrevolution. mat-1-5 (M5): Darstellungstext über Nationalversammlung, Verfassung und Grundrechte. mat-1-6 (M6): König lehnt Kaiserkrone ab — Revolution scheitert. |
| Material-Position in Sequenz | 2 von 6 (didaktische Funktion: erarbeitung) |
| TB-Knoten | k1-2 (Wartburgfest/Hambacher Fest), k1-3 (Nationalbewegung — Merksatz: „Bürger fordern einen gemeinsamen Staat mit Verfassung") |
| Operationalisierungsziel | Ordne zu, welche Zeichen auf dem Bild des Hambacher Festes für welche Forderung der Nationalbewegung stehen. (Herleitung: AFB-I-Operator „ordne zu" + k1-3 Merksatz → visuelle Symbole den Forderungen zuordnen) |
| Erarbeitbarkeits-Check | zuordnung auf mat-1-2 — Bildquelle enthält distinkte visuelle Elemente (schwarz-rot-goldene Fahne, Menschenmenge, Redner) und die Bildunterschrift benennt Forderungen. Min 2 disjunkte Kategorien (Symbole / Forderungen) ableitbar. PASS. |
| Bereits getestete Inhalte | Pos 1 (Lückentext, AFB I): Fachbegriffe Befreiungskriege/Nationalgedanke |
| Noch nicht getestete TB-Knoten | k1-4, k1-5, k1-6, k1-7 |

### Aufgabe 3 — Multiple-Choice (Pos 3, C1-Zone)

| Feld | Wert |
|---|---|
| Aufgaben-Position | 3 von 7 |
| AFB-Stufe | I-II |
| Bloom-Level | L3 (Anwenden) |
| Ziel-Material | mat-1-3 (Quellentext: „Hoch lebe das freie, das einige Deutschland!") |
| Material-Display-ID | M3 |
| Material-Zusammenfassungen | mat-1-1 (M1): Tagebuch eines Studenten auf dem Wartburgfest 1817 — Nationalgedanke nach Befreiungskriegen. mat-1-2 (M2): Bild des Hambacher Festes zeigt die Nationalbewegung als Massenphänomen. mat-1-4 (M4): Barrikadenkampf in Berlin zeigt Eskalation zur Märzrevolution. mat-1-5 (M5): Darstellungstext über Nationalversammlung, Verfassung und Grundrechte. mat-1-6 (M6): König lehnt Kaiserkrone ab — Revolution scheitert. |
| Material-Position in Sequenz | 3 von 6 (didaktische Funktion: erarbeitung) |
| TB-Knoten | k1-2 (Wartburgfest/Hambacher Fest), k1-3 (Nationalbewegung — Merksatz: „Bürger fordern einen gemeinsamen Staat mit Verfassung") |
| Operationalisierungsziel | Erkenne, welche zentrale Forderung die Festredner auf dem Hambacher Fest erhoben. (Herleitung: AFB-I/II-Operator „erkenne/nenne" + k1-3 Merksatz → Quellenaussage korrekt zusammenfassen) |
| Erarbeitbarkeits-Check | multiple-choice auf mat-1-3 — Quellentext enthält explizite Forderungen (Einheit, Freiheit). Distraktoren plausibel konstruierbar (z.B. Rückkehr zur Monarchie, Krieg gegen Frankreich). Richtige Antwort aus Material begründbar. PASS. |
| Bereits getestete Inhalte | Pos 1 (LT, AFB I): Befreiungskriege/Nationalgedanke. Pos 2 (ZU, AFB I): Symbole des Hambacher Festes. |
| Noch nicht getestete TB-Knoten | k1-4, k1-5, k1-6, k1-7 |

### Aufgabe 4 — Reihenfolge (Pos 4, C2-Zone)

| Feld | Wert |
|---|---|
| Aufgaben-Position | 4 von 7 |
| AFB-Stufe | II |
| Bloom-Level | L3 (Anwenden) |
| Ziel-Material | mat-1-4 (Bildquelle: Barrikadenkampf in Berlin — März 1848) |
| Material-Display-ID | M4 |
| Material-Zusammenfassungen | mat-1-1 (M1): Tagebuch eines Studenten auf dem Wartburgfest 1817 — Nationalgedanke nach Befreiungskriegen. mat-1-2 (M2): Bild des Hambacher Festes zeigt die Nationalbewegung als Massenphänomen. mat-1-3 (M3): Rede auf dem Hambacher Fest fordert Einheit, Freiheit, Volkssouveränität. mat-1-5 (M5): Darstellungstext über Nationalversammlung, Verfassung und Grundrechte. mat-1-6 (M6): König lehnt Kaiserkrone ab — Revolution scheitert. |
| Material-Position in Sequenz | 4 von 6 (didaktische Funktion: erarbeitung) |
| TB-Knoten | k1-4 (Märzrevolution 1848) |
| Operationalisierungsziel | Bringe die Schritte von der friedlichen Forderung zum bewaffneten Aufstand in die richtige Reihenfolge. (Herleitung: AFB-II-Operator „ordne" + k1-4 Märzrevolution → Eskalationskette rekonstruieren) |
| Erarbeitbarkeits-Check | reihenfolge auf mat-1-4 — Bildunterschrift + bisherige Materialien liefern eindeutige chronologisch-kausale Sequenz (Forderungen → Verbote → Unruhen → Barrikadenkämpfe). 4 Elemente in eindeutiger Abfolge. PASS. |
| Bereits getestete Inhalte | Pos 1-3: Nationalgedanke, Wartburgfest/Hambacher Fest, Forderungen der Nationalbewegung. |
| Noch nicht getestete TB-Knoten | k1-5, k1-6, k1-7 |

### Aufgabe 5 — Multiple-Choice (Pos 5, C3-Zone)

| Feld | Wert |
|---|---|
| Aufgaben-Position | 5 von 7 |
| AFB-Stufe | II |
| Bloom-Level | L3 (Anwenden) |
| Ziel-Material | mat-1-5 (Darstellungstext: Die Nationalversammlung in der Paulskirche) |
| Material-Display-ID | M5 |
| Material-Zusammenfassungen | mat-1-1 (M1): Tagebuch eines Studenten auf dem Wartburgfest 1817 — Nationalgedanke nach Befreiungskriegen. mat-1-2 (M2): Bild des Hambacher Festes zeigt die Nationalbewegung als Massenphänomen. mat-1-3 (M3): Rede auf dem Hambacher Fest fordert Einheit, Freiheit, Volkssouveränität. mat-1-4 (M4): Barrikadenkampf in Berlin zeigt Eskalation zur Märzrevolution. mat-1-6 (M6): König lehnt Kaiserkrone ab — Revolution scheitert. |
| Material-Position in Sequenz | 5 von 6 (didaktische Funktion: erarbeitung) |
| TB-Knoten | k1-5 (Nationalversammlung Paulskirche) |
| Operationalisierungsziel | Erkläre, welche Aufgabe die Nationalversammlung in der Paulskirche hatte. (Herleitung: AFB-II-Operator „erkläre" + k1-5 → Kernfunktion des ersten gesamtdeutschen Parlaments verstehen) |
| Erarbeitbarkeits-Check | multiple-choice auf mat-1-5 — Darstellungstext beschreibt Paulskirche, Verfassung, Grundrechte explizit. Distraktoren konstruierbar (z.B. Kriegserklärung, Handelsvertrag). Richtige Antwort aus Material begründbar. PASS. MC-Wiederholung (2×): Pos 3 = Quellenzitat-Verständnis (AFB I-II), Pos 5 = Darstellungstext-Transfer (AFB II). Unterschiedliches Material, unterschiedlicher AFB. |
| Bereits getestete Inhalte | Pos 1-4: Nationalgedanke, Hambacher Fest (Symbole + Forderungen), Eskalation zur Revolution. |
| Noch nicht getestete TB-Knoten | k1-6, k1-7 |

### Aufgabe 6 — Quellenkritik (Pos 6, P-Zone)

| Feld | Wert |
|---|---|
| Aufgaben-Position | 6 von 7 |
| AFB-Stufe | II-III |
| Bloom-Level | L5 (Bewerten) |
| Ziel-Material | mat-1-6 (Quellentext: „Eine Krone aus der Gosse — Der König lehnt ab") |
| Material-Display-ID | M6 |
| Material-Zusammenfassungen | mat-1-1 (M1): Tagebuch eines Studenten auf dem Wartburgfest 1817 — Nationalgedanke nach Befreiungskriegen. mat-1-2 (M2): Bild des Hambacher Festes zeigt die Nationalbewegung als Massenphänomen. mat-1-3 (M3): Rede auf dem Hambacher Fest fordert Einheit, Freiheit, Volkssouveränität. mat-1-4 (M4): Barrikadenkampf in Berlin zeigt Eskalation zur Märzrevolution. mat-1-5 (M5): Darstellungstext über Nationalversammlung, Verfassung und Grundrechte. |
| Material-Position in Sequenz | 6 von 6 (didaktische Funktion: sicherung) |
| TB-Knoten | k1-6 (Scheitern 1849 — Merksatz: „König lehnt Kaiserkrone ab — Fürsten behalten Macht"), k1-7 (Volkssouveränität — Merksatz: „Alle Macht soll vom Volk ausgehen") |
| Operationalisierungsziel | Untersuche das Zitat des Königs: Wer sprach, warum lehnte er ab, und was verrät das über seine Haltung zur Volkssouveränität? (Herleitung: AFB-II/III-Operator „untersuche/beurteile" + k1-6 + k1-7 Merksätze → Quellenanalyse mit Perspektiv-Bewertung) |
| Quellenkritik-Eignung | Primärquelle: JA (historisches Zitat Friedrich Wilhelms IV.). Erkennbare Perspektive: JA (Verachtung für Volkssouveränität, „Krone aus der Gosse"). Didaktisches Ziel: Perspektiv-Reflexion zum Scheitern der Revolution. Anti-Automatismus-Check: Kein neutrales Dokument — hochpolitische Ablehnung mit ideologischem Gehalt. Max 1/Mappe: JA. |
| F2-Integration | Archaische Sprache („imaginäre Krone, aus Dreck und Letten gebacken") → W-Frage „Was meint der König mit ‚Krone aus der Gosse'?" als Paraphrase-Aufgabe integriert. |
| Erarbeitbarkeits-Check | quellenkritik auf mat-1-6 — Primärquelle mit Verfasser (König), Datum (1849), Kontext (Kaiserkrone-Ablehnung), Perspektive (gegen Volkssouveränität). W-Fragen (wer, wann, warum, fuer_wen, was_fehlt) aus Material beantwortbar. PASS. |
| Bereits getestete Inhalte | Pos 1-5: Nationalgedanke, Hambacher Fest, Forderungen, Märzrevolution, Nationalversammlung. |
| Noch nicht getestete TB-Knoten | — (k1-6 und k1-7 werden hier abgedeckt; k1-7 zusätzlich in Pos 7) |

### Aufgabe 7 — Freitext (Pos 7, L-Zone)

| Feld | Wert |
|---|---|
| Aufgaben-Position | 7 von 7 |
| AFB-Stufe | III |
| Bloom-Level | L5 (Bewerten) |
| Ziel-Material | mat-1-5 (Darstellungstext: Die Nationalversammlung), mat-1-6 (Quellentext: König lehnt ab) |
| Material-Display-ID | M5, M6 |
| Material-Zusammenfassungen | mat-1-1 (M1): Tagebuch eines Studenten auf dem Wartburgfest 1817 — Nationalgedanke nach Befreiungskriegen. mat-1-2 (M2): Bild des Hambacher Festes zeigt die Nationalbewegung als Massenphänomen. mat-1-3 (M3): Rede auf dem Hambacher Fest fordert Einheit, Freiheit, Volkssouveränität. mat-1-4 (M4): Barrikadenkampf in Berlin zeigt Eskalation zur Märzrevolution. |
| Material-Position in Sequenz | 5-6 von 6 (Synthese über gesamte Mappe) |
| TB-Knoten | k1-7 (Volkssouveränität — Merksatz: „Alle Macht soll vom Volk ausgehen") |
| Operationalisierungsziel | Beurteile, warum die Revolution von 1848 scheiterte und was das für die Idee der Volkssouveränität bedeutete. (Herleitung: AFB-III-Operator „beurteile" + k1-7 Merksatz → Synthese der Stundenfrage mit Stellungnahme) |
| Erarbeitbarkeits-Check | freitext-code auf mat-1-5 + mat-1-6 — Darstellungstext liefert Fakten (Verfassung, Grundrechte, Ablehnung), Quellentext liefert Perspektive des Königs. Erwartete Keywords objektivierbar: Volkssouveränität, Kaiserkrone, Fürsten, Macht. PASS. |
| Bereits getestete Inhalte | Pos 1-6: Alle TB-Knoten k1-1 bis k1-7. |
| Noch nicht getestete TB-Knoten | — (alle abgedeckt) |

---

## Dispatch-Anweisungen

| Pos | Subagent | Prompt-Datei |
|---|---|---|
| 1 | SUB_AUFGABE_LUECKENTEXT | agents/SUB_AUFGABE_LUECKENTEXT.md |
| 2 | SUB_AUFGABE_ZUORDNUNG | agents/SUB_AUFGABE_ZUORDNUNG.md |
| 3 | SUB_AUFGABE_MC | agents/SUB_AUFGABE_MC.md |
| 4 | SUB_AUFGABE_REIHENFOLGE | agents/SUB_AUFGABE_REIHENFOLGE.md |
| 5 | SUB_AUFGABE_MC | agents/SUB_AUFGABE_MC.md |
| 6 | SUB_AUFGABE_QUELLENKRITIK | agents/SUB_AUFGABE_QUELLENKRITIK.md |
| 7 | SUB_AUFGABE_FREITEXT | agents/SUB_AUFGABE_FREITEXT.md |

**Dispatch-Isolation (P4):** Jede Aufgabe wird als eigene Nachricht produziert. Kein paralleler Dispatch.
