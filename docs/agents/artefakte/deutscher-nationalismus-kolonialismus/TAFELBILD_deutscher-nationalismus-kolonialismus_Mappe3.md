# Hefteintrag: Mappe 3 — Deutschlands Griff nach der Welt

**Game-ID:** `deutscher-nationalismus-kolonialismus`
**Mappe:** 3 / 4
**Erstellt:** 2026-04-12 (Phase 0.4, AGENT_HEFTEINTRAG)
**Validierungsstatus:** ENTWURF
**Basis:** SKRIPT Chunk 3 + DIDAKTIK_RAHMEN (TZ3, KE LB2_K_05)

---

## Stundenfrage

Warum teilten europäische Mächte Afrika unter sich auf — ohne die Afrikaner zu fragen?

## Kernerkenntnisse

1. Das Deutsche Reich wollte als Großmacht Kolonien — aus Wirtschaftsinteresse und nationalem Prestige.
2. Auf der Berliner Konferenz 1884 teilten Europäer Afrika auf — ohne einen Afrikaner zu fragen.

## Ordnungsmuster

konzept-beispiel — Die Mappe führt den Oberbegriff Imperialismus ein, illustriert ihn an konkreten Beispielen (Motive, Berliner Konferenz, Wettlauf um Afrika) und zieht die Schlussfolgerung der vollständigen Aufteilung des Kontinents.

## JSON-Repräsentation

```json
{
  "stundenfrage": "Warum teilten europäische Mächte Afrika unter sich auf — ohne die Afrikaner zu fragen?",
  "ordnungsmuster": "konzept-beispiel",
  "scpl": {
    "situation": {
      "kontextsatz": "Nach der Reichsgründung 1871 wollte Deutschland als Großmacht auch Kolonien besitzen — wie Großbritannien und Frankreich.",
      "fachbegriffe": []
    },
    "complication": [
      {
        "schritt": "Kaufleute suchten Rohstoffe, die Presse forderte Prestige — Deutschland verlangte seinen 'Platz an der Sonne': Imperialismus.",
        "typ": "konzeptuell",
        "fachbegriff": "Imperialismus",
        "darstellung": null,
        "erarbeitbarkeit": "DIRECT"
      },
      {
        "schritt": "Auf der Berliner Konferenz 1884/85 teilten 14 europäische Staaten Afrika auf — kein einziger Afrikaner saß am Tisch: Berliner Konferenz.",
        "typ": "kontrastiv",
        "fachbegriff": "Berliner Konferenz",
        "darstellung": null,
        "erarbeitbarkeit": "DIRECT"
      },
      {
        "schritt": "Innerhalb weniger Jahrzehnte war fast ganz Afrika in europäischer Hand — nur Äthiopien und Liberia blieben frei: Wettlauf um Afrika.",
        "typ": "kausal",
        "fachbegriff": "Wettlauf um Afrika",
        "darstellung": null,
        "erarbeitbarkeit": "ARTIFACT"
      }
    ],
    "problem": {
      "satz": "Europäische Mächte unterwarfen einen ganzen Kontinent politisch und wirtschaftlich — ohne Rücksicht auf die dort lebenden Menschen: Kolonialisierung.",
      "fachbegriff": "Kolonialisierung"
    },
    "loesung": [
      "Das Deutsche Reich wollte als Großmacht Kolonien — aus Wirtschaftsinteresse und nationalem Prestige.",
      "Auf der Berliner Konferenz 1884 teilten Europäer Afrika auf — ohne einen Afrikaner zu fragen."
    ]
  },
  "transfer": {
    "frage": "Welche Spuren hat die Aufteilung Afrikas bis heute hinterlassen?"
  },
  "voraussetzungen": ["k2-6"],
  "knoten": [
    {"id": "k3-1", "text": "Deutsches Kaiserreich als Großmacht", "typ": "kategorie"},
    {"id": "k3-2", "text": "Imperialismus", "typ": "kernbegriff", "merksatz": "Streben eines Staates, andere Länder zu unterwerfen"},
    {"id": "k3-3", "text": "'Platz an der Sonne'", "typ": "kernbegriff", "merksatz": "Deutschlands Forderung nach Kolonien und Weltgeltung"},
    {"id": "k3-4", "text": "Berliner Konferenz 1884/85", "typ": "ereignis"},
    {"id": "k3-5", "text": "Wettlauf um Afrika", "typ": "prozess"},
    {"id": "k3-6", "text": "Kolonialisierung Afrikas", "typ": "wirkung", "merksatz": "Fast ganz Afrika in europäischer Hand bis 1913"}
  ],
  "verbindungen": [
    {"von": "k3-1", "nach": "k3-2", "label": "treibt an", "typ": "kausal"},
    {"von": "k3-2", "nach": "k3-3", "label": "fordert", "typ": "kausal"},
    {"von": "k3-3", "nach": "k3-4", "label": "führt zu", "typ": "temporal"},
    {"von": "k3-4", "nach": "k3-5", "label": "löst aus", "typ": "kausal"},
    {"von": "k3-5", "nach": "k3-6", "label": "Ergebnis", "typ": "schlussfolgerung"}
  ]
}
```

## Erarbeitbarkeits-Nachweis

| SCPL-Schritt | Status | Skript-Referenz | TB-Knoten | scpl_phase | Aktion |
|---|---|---|---|---|---|
| S: Deutschland will Kolonien | DIRECT | C3 Einstieg-Kontext, §1 | k3-1 | S | — |
| C1: Motive, "Platz an der Sonne", Imperialismus | DIRECT | C3 §1-§2 | k3-2, k3-3 | C | — |
| C2: Berliner Konferenz, kein Afrikaner am Tisch | DIRECT | C3 §3-§4 | k3-4 | C | — |
| C3: Aufteilung Afrikas, Karte 1913 | ARTIFACT | C3 §5 + img-3-4/img-3-5 | k3-5, k3-6 | C | Karten als Artefakt-Basis |
| P: Unterwerfung des Kontinents | DIRECT | C3 §6 | k3-6 | P | — |

**Erarbeitbarkeits-Quote:** 4/5 DIRECT + 1/5 ARTIFACT = 100% ≥ 70% ✓

## Fachbegriffe

| Begriff | Erklärung | SCPL-Zone | SKRIPT-Ref |
|---|---|---|---|
| Imperialismus | Streben eines Staates, andere Länder politisch und wirtschaftlich zu unterwerfen | C1 | C3 §6 |
| Platz an der Sonne | Schlagwort für Deutschlands Weltmachtanspruch unter Wilhelm II. | C1 | C3 §2 |
| Berliner Konferenz | Treffen 1884/85, auf dem europäische Staaten Afrika unter sich aufteilten | C2 | C3 §3-§4 |
| Wettlauf um Afrika | Schnelle Aufteilung des Kontinents durch europäische Kolonialmächte | C3 | C3 §5 |
| Kolonialisierung | Unterwerfung und Ausbeutung fremder Länder durch europäische Mächte | P | C3 §1, §6 |

## Q-Gate-Protokoll

| # | Kriterium | Prio | Ergebnis | Detail |
|---|---|---|---|---|
| G1 | Lernziel-Kongruenz | MUSS | PASS | TZ3 → KE1 (Motive Kolonialerwerb) + KE2 (Berliner Konferenz). LB2_K_05 (Imperialismus, Mächterivalität) abgedeckt. |
| G2 | Reduktion (max. 4 C, max. 3 Merksätze) | MUSS | PASS | 3 C-Schritte, 2 Merksätze. |
| G3 | Erarbeitbarkeit | MUSS | PASS | 4 DIRECT + 1 ARTIFACT = 100%. |
| G4 | Strukturklarheit | MUSS | PASS | Ordnungsmuster: konzept-beispiel (Imperialismus → Beispiele → Ergebnis), konsistent. |
| G5 | Sprachliches Niveau | MUSS | PASS | Längster Merksatz: 14W. Alle ≤15W. |
| G6 | Hefteintrag-Transfer | MUSS | PASS | ~106W, ca. 5-6 min Übertragung. |
| G7 | Merksatz-Abschluss | SOLL | PASS | 2 Merksätze als ganze Aussagesätze. |
| G8 | Anschaulichkeit | SOLL | PASS | Konkrete Beispiele: Bülow-Zitat, Karikatur "Afrika-Kuchen", Karte 1913. |
| G9 | Progression | SOLL | PASS | Voraussetzung: k2-6 (Einheit ohne Freiheit → Großmachtstreben). Komplexitätssteigerung: konzept-beispiel erfordert Abstraktion (Imperialismus als Oberbegriff). |
| G10 | Rekapitulierbarkeit | SOLL | PASS | SCPL-Bogen: S (will Kolonien) → C (Motive, Konferenz, Wettlauf) → P (Kontinent unterworfen) → L (Erkenntnis). |
| G11 | Vermutungs-Sektion | KANN | N/A | Nicht vorgesehen in Phase 0.4. |
| G12 | Sprachregister-Passung | KANN | PASS | R7-Mittelschule. |
| G13 | Stundenfrage als Titel | KANN | WARN | 13W — 1W über 12W-Limit. C1b-Identitätsconstraint (wortidentisch mit SKRIPT) hat Vorrang. |
| G14 | SCPL-Kohärenz | KANN | PASS | Oberbegriff → Beispiele → Schlussfolgerung. Geschlossener Bogen. |

**Gesamt: PASS** — Alle BLOCKER bestanden. 1 KANN-WARN (G13: 13W statt 12W, durch C1b-Constraint bedingt).
