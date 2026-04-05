# BLOOM-Klassifikation Mappen 1-4 (Auto-Klassifikator-Dispatch)

**Status:** FINAL (Phase IV Wave 1 AU-1 Block 2, 2026-04-05)
**Methode:** Option C Hybrid — Auto-Klassifikator-Subagent-Dispatch auf Bestandsaufgaben ohne inhaltliche Aenderung.
**Grundlage:** D15b STR-02 (Bloom-Tiefe als Pflicht), VERTRAG_PHASE_2-2b_AUFGABE.md Abschnitt "Bloom-Tiefe-Pflichtfeld".
**Quell-Datei:** `escape-games/gpg-erster-weltkrieg-ursachen/data.json` (Stand vor Wave 1)
**Ziel:** Fuer jede Bestandsaufgabe `_meta.bloom_level` (1-6) und `_meta.bloom_begruendung` vergeben; Mappen-Verteilung gegen A19-Policy (max 40 % L1-L2, min 30 % L3-L4, min 20 % L5-L6) pruefen.

**Bloom-Skala (Anderson/Krathwohl, revidiert):** L1 Erinnern · L2 Verstehen · L3 Anwenden · L4 Analysieren · L5 Bewerten · L6 Erschaffen.

**Klassifikator-Heuristik:**
- Operator im Fragestamm + Aufgabentyp + Material-Bezug → Stufen-Kandidat.
- Typ-Dach-Begrenzung: MC/Zuordnung/Lueckentext/Reihenfolge erreichen strukturell max L3 zuverlaessig; L4+ wird bei reinen Auswahl-Typen nur als L3 verbucht, auch wenn der Fragestamm einen L4-Operator traegt — die kognitive Leistung reduziert sich auf Wiedererkennen der richtigen Antwort. Freitext kann L3-L6 erreichen.
- Bei Mehrdeutigkeit wird die niedrigere Stufe gewaehlt (konservativ).

---

## Mappe 1 — Pulverfass Europa

| Aufgabe | Typ | Fragestamm (gekuerzt) | Bloom | Begruendung |
|---|---|---|---|---|
| aufgabe-1-1 | multiple-choice | Welche Laender bildeten den Dreibund? | **L1** | Reine Fakt-Wiedererkennung (Mitgliedsstaaten). Operator "welche" = Recall. |
| aufgabe-1-2 | lueckentext | Bernhard von Buelow forderte ... 'Platz an der ___' | **L1** | Fachbegriffs-Recall eines Zitat-Fragments. |
| aufgabe-1-3 | multiple-choice | Vergleiche die beiden Europakarten. Was hat sich veraendert? | **L3** | Operator "vergleiche" zielt auf L4, MC-Form begrenzt auf Wiedererkennen der richtigen Veraenderungsbeschreibung = Anwendung. |
| aufgabe-1-4 | multiple-choice | Was zeigt die Karikatur 'Der Koloss von Rhodos' ueber den Imperialismus? | **L2** | Bild-Interpretation (Verstehen einer Metapher). |
| aufgabe-1-5 | multiple-choice | Was bedeutet die Metapher 'Pulverfass Europa'? | **L2** | Metaphern-Verstaendnis. |

**Verteilung:** L1: 2 (40 %), L2: 2 (40 %), L3: 1 (20 %), L4-L6: 0 (0 %)
**A19-Policy-Check:** L1-L2 = 80 % (max 40 %) → **FAIL**. L3-L4 = 20 % (min 30 %) → **FAIL**. L5-L6 = 0 % (min 20 %) → **FAIL**.
**Verdikt:** Mappe 1 ist Bloom-strukturell flach. Nachbesserung in Wave 1 oder spaeter noetig (mindestens 1 L5-Aufgabe, 1 L3-L4-Aufgabe nachziehen).

---

## Mappe 2 — Das Attentat von Sarajevo

| Aufgabe | Typ | Fragestamm (gekuerzt) | Bloom | Begruendung |
|---|---|---|---|---|
| aufgabe-2-1 | multiple-choice | Illustration + Foto: was zeigen sie? | **L2** | Bild-Verstehen, Quellen-Interpretation. |
| aufgabe-2-2 | zuordnung | Ordne Sachverhalte dem Text zu | **L2** | Kategorien-Zuordnung auf Textbasis (Verstehen). |
| aufgabe-2-3 | reihenfolge | Stationen der Julikrise ordnen | **L2** | Chronologische Ordnung nach Zeitleiste (Material liefert Ordnung). |
| aufgabe-2-4 | lueckentext | Ultimatum-Fachbegriffe ergaenzen | **L1** | Fachbegriffs-Recall. |
| aufgabe-2-5 | freitext-code | 'Was wird aus uns?' — Folgen des Weltkriegs aus Sicht des Erzaehlers | **L5** | Stellungnahme-Freitext mit Bewertungs-/Reflexionscharakter (AFB III). |

**Verteilung:** L1: 1 (20 %), L2: 3 (60 %), L3: 0, L4: 0, L5: 1 (20 %), L6: 0
**A19-Policy-Check:** L1-L2 = 80 % (max 40 %) → **FAIL**. L3-L4 = 0 % (min 30 %) → **FAIL**. L5-L6 = 20 % (min 20 %) → **PASS**.
**Verdikt:** Oberes Ende (Freitext-Stellungnahme) ist ok. Mittlere Zone (L3-L4) fehlt komplett. Eine Transfer- oder Analyse-Aufgabe nachziehen.

---

## Mappe 3 — Kriegsbegeisterung 1914

| Aufgabe | Typ | Fragestamm (gekuerzt) | Bloom | Begruendung |
|---|---|---|---|---|
| aufgabe-3-1 | lueckentext | Fachbegriffe ergaenzen | **L1** | Recall. |
| aufgabe-3-2 | multiple-choice | Was zeigt das Foto vor dem Stadtschloss? | **L2** | Bild-Verstehen. |
| aufgabe-3-3 | zuordnung | Ursachen-Beschreibungen | **L2** | Kategorien-Zuordnung (Verstehen). |
| aufgabe-3-4 | multiple-choice | Warum zeigt Foto Jubel, aber Quellen Angst? (Quellenkritik) | **L3** | Operator "warum" + Quellenkritik-Anforderung. MC-Form begrenzt L4 auf L3 (Anwenden der Quellenkritik-Regel auf Fallbeispiel). |
| aufgabe-3-5 | lueckentext | Burgfrieden-Begriffe | **L1** | Recall. |
| aufgabe-3-6 | zuordnung | Zitate → Haltungen (Begeisterung/Angst/Pflicht) | **L3** | Anwendung einer Kategorisierung auf neue Quellen-Zitate. |
| aufgabe-3-7 | freitext-code | Beurteile, ob gesellschaftlicher Druck heute Menschen zum Schweigen bringt | **L5** | Bewertungs-Stellungnahme mit Gegenwartsbezug. AFB III. |

**Verteilung:** L1: 2 (28,6 %), L2: 2 (28,6 %), L3: 2 (28,6 %), L4: 0, L5: 1 (14,3 %), L6: 0
**A19-Policy-Check:** L1-L2 = 57,1 % (max 40 %) → **FAIL** (knapp). L3-L4 = 28,6 % (min 30 %) → **FAIL** (knapp). L5-L6 = 14,3 % (min 20 %) → **FAIL** (knapp).
**Verdikt:** Beste bisherige Verteilung. Nah an Policy, aber alle drei Zonen noch nicht erfuellt. Eine Aufgabe von L2 auf L4 anheben (z.B. aufgabe-3-4 als echten Vergleich/Begruendung in Wave 1 umbauen) und eine zusaetzliche L5-Aufgabe waere Policy-konform.

---

## Mappe 4 — Der Schlieffen-Plan

| Aufgabe | Typ | Fragestamm (gekuerzt) | Bloom | Begruendung |
|---|---|---|---|---|
| aufgabe-4-1 | lueckentext | Fachbegriffe ergaenzen | **L1** | Recall. |
| aufgabe-4-2 | multiple-choice | Warum plante D Angriff ueber Belgien? | **L2** | Begruendungs-Wiedergabe aus Material (Verstehen). |
| aufgabe-4-3 | reihenfolge | Friedrichs Erlebnisse chronologisch | **L2** | Chronologische Ordnung. |
| aufgabe-4-4 | zuordnung | Geplant vs. wirklich an der Marne | **L3** | Gegenueberstellung Soll/Ist — Anwendung eines Vergleichsschemas, in Zuordnungsform. |
| aufgabe-4-5 | multiple-choice | Was zeigt Foto ueber Scheitern des Plans? | **L2** | Bild-Verstehen. |
| aufgabe-4-6 | reihenfolge | Weg Schlieffen-Plan → Stellungskrieg | **L3** | Anwendung einer Ursache-Wirkung-Logik auf Ereigniskette. |
| aufgabe-4-7 | freitext-code | Warum musste der Plan scheitern? | **L4** | Analytische Zerlegung der Scheiterungsursachen (kausale Analyse, Freitext erlaubt L4). |

**Verteilung:** L1: 1 (14,3 %), L2: 3 (42,9 %), L3: 2 (28,6 %), L4: 1 (14,3 %), L5: 0, L6: 0
**A19-Policy-Check:** L1-L2 = 57,1 % (max 40 %) → **FAIL**. L3-L4 = 42,9 % (min 30 %) → **PASS**. L5-L6 = 0 % (min 20 %) → **FAIL**.
**Verdikt:** Mittlere Zone ok, Oben und Unten verletzen Policy. Mappe 4 ist Test-Mappe fuer Wave-1-Neu-Produktion: neue `begruendung`-Aufgabe (L5) als Exemplar kann gleichzeitig die Policy-Luecke schliessen.

---

## Gesamtbefund Mappen 1-4

| Mappe | L1-L2 % | L3-L4 % | L5-L6 % | Policy |
|---|---|---|---|---|
| 1 | 80 | 20 | 0 | FAIL × 3 |
| 2 | 80 | 0 | 20 | FAIL × 2 |
| 3 | 57 | 29 | 14 | FAIL × 3 (knapp) |
| 4 | 57 | 43 | 0 | FAIL × 2 |

**Strukturelle Erkenntnis:** Der Bestand ueberrepraesentiert L1-L2 (Typ-Dach MC/Lueckentext/Zuordnung) und unterrepraesentiert L5-L6. Kein Typ-Dach-Problem fuer L3-L4 — das wird erreicht, wenn der Operator klug gewaehlt wird. Das L5-L6-Defizit ist systemisch und begruendet exakt die STR-11-Erweiterung: `begruendung` erzwingt L5 strukturell.

**Nachpflege-Policy (Option C Hybrid):**
- Block 2 (dieser Doc): Vergabe von `_meta.bloom_level` + `_meta.bloom_begruendung` fuer alle 24 Aufgaben der Mappen 1-4 durch Claude-Code in data.json-Patch (AU-1-Code-Strang).
- KEINE inhaltliche Umgestaltung bestehender Aufgaben in AU-1. Policy-Luecken werden durch neue Aufgaben in Wave 1+ geschlossen, nicht durch nachtraegliches Umschreiben.
- Mappe 4 erhaelt in AU-1 zusaetzlich 1 `vergleich`- und 1 `begruendung`-Exemplar als End-to-End-Test (siehe UEBERGABE_PHASE_IV_WAVE_1_AU_1.md Abschnitt C).

## Claude-Code-Datenquelle (data.json Patch)

Die folgende Tabelle ist die verbindliche Zuweisungs-Quelle fuer den Code-Strang-Commit. Jede Aufgabe erhaelt im `_meta`-Objekt beide Felder.

```
aufgabe-1-1  L1  "Fakt-Recall der Dreibund-Mitgliedstaaten (Operator 'welche')."
aufgabe-1-2  L1  "Zitat-Fragment-Recall (Fachbegriff 'Sonne')."
aufgabe-1-3  L3  "Vergleichs-Operator in MC-Form reduziert auf Anwenden einer Veraenderungs-Erkennung."
aufgabe-1-4  L2  "Karikaturen-Interpretation (Bild-Verstehen)."
aufgabe-1-5  L2  "Metaphern-Verstaendnis (Begriffsbedeutung)."
aufgabe-2-1  L2  "Bild-Interpretation von Illustration und Foto."
aufgabe-2-2  L2  "Zuordnung von Sachverhalten zu Textaussagen (Verstehen)."
aufgabe-2-3  L2  "Chronologische Ordnung gemaess Zeitleiste im Material."
aufgabe-2-4  L1  "Fachbegriffs-Recall zum Ultimatum-Text."
aufgabe-2-5  L5  "Stellungnahme-Freitext zu Kriegsfolgen (AFB III, Bewertung)."
aufgabe-3-1  L1  "Fachbegriffs-Recall."
aufgabe-3-2  L2  "Bild-Interpretation des Jubel-Fotos."
aufgabe-3-3  L2  "Zuordnung von Ursachen zu Beschreibungen (Verstehen)."
aufgabe-3-4  L3  "Quellenkritik-Anwendung (Widerspruch Bild vs. Quelle) in MC-Form."
aufgabe-3-5  L1  "Fachbegriffs-Recall zum Burgfrieden."
aufgabe-3-6  L3  "Anwendung einer Haltungs-Typologie auf neue Quellen-Zitate."
aufgabe-3-7  L5  "Bewertungs-Freitext mit Gegenwartsbezug (AFB III)."
aufgabe-4-1  L1  "Fachbegriffs-Recall zum Schlieffen-Plan."
aufgabe-4-2  L2  "Begruendungs-Wiedergabe (Verstehen der Planlogik)."
aufgabe-4-3  L2  "Chronologische Ordnung der Erlebnisse."
aufgabe-4-4  L3  "Soll-Ist-Gegenueberstellung Marne (Anwendung Vergleichsschema)."
aufgabe-4-5  L2  "Bild-Interpretation (Scheitern-Foto)."
aufgabe-4-6  L3  "Ursache-Wirkung-Kette vom Plan zum Stellungskrieg (Anwendung)."
aufgabe-4-7  L4  "Kausale Analyse der Scheiterungsgruende (Freitext, AFB III)."
```

**Hinweis:** Begruendungs-Texte sind auf max 1 Satz normiert (A24-Pflicht). Der Auto-Klassifikator folgt der konservativen Regel: bei Mehrdeutigkeit wird die niedrigere Stufe vergeben.
