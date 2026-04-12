# Hefteintrag: Mappe 2 — Einheit von oben

**Game-ID:** `deutscher-nationalismus-kolonialismus`
**Mappe:** 2 / 4
**Erstellt:** 2026-04-12 (Phase 0.4, AGENT_HEFTEINTRAG)
**Validierungsstatus:** ENTWURF
**Basis:** SKRIPT Chunk 2 + DIDAKTIK_RAHMEN (TZ2, KE LB2_K_04)

---

## Stundenfrage

Warum wurde Deutschland 1871 nicht durch das Volk, sondern durch Kriege geeint?

## Kernerkenntnisse

1. Bismarck einte Deutschland durch drei Kriege — eine Einigung "von oben", nicht "von unten".
2. Das Deutsche Reich von 1871 brachte Einheit, aber keine Freiheit.

## Ordnungsmuster

kontrastierend — Die Mappe stellt die gescheiterte demokratische Einigung "von unten" (1848) der machtpolitischen Einigung "von oben" durch Bismarck (1871) gegenüber.

## JSON-Repräsentation

```json
{
  "stundenfrage": "Warum wurde Deutschland 1871 nicht durch das Volk, sondern durch Kriege geeint?",
  "ordnungsmuster": "kontrastierend",
  "scpl": {
    "situation": {
      "kontextsatz": "Die Revolution von 1848 war gescheitert — der Wunsch nach deutscher Einheit blieb. Doch nun übernahm Preußen die Führung.",
      "fachbegriffe": []
    },
    "complication": [
      {
        "schritt": "1848 versuchte das Volk, Deutschland durch Reden und Parlament zu einen — 1862 erklärte Bismarck: 'Nicht durch Reden, sondern durch Blut und Eisen.'",
        "typ": "kontrastiv",
        "fachbegriff": "Blut und Eisen",
        "darstellung": {
          "typ": "gegenueberstellung",
          "links": {"titel": "Einigung von unten (1848)", "punkte": ["Reden und Parlament", "Verfassung und Grundrechte", "Gescheitert"]},
          "rechts": {"titel": "Einigung von oben (1871)", "punkte": ["Kriege und Militär", "Macht und Diplomatie", "Erfolgreich"]}
        },
        "erarbeitbarkeit": "DIRECT"
      },
      {
        "schritt": "Bismarck führte drei Kriege — gegen Dänemark, Österreich und Frankreich — und schmiedete die deutschen Staaten zusammen: kleindeutsche Lösung.",
        "typ": "kausal",
        "fachbegriff": "kleindeutsche Lösung",
        "darstellung": null,
        "erarbeitbarkeit": "DIRECT"
      }
    ],
    "problem": {
      "satz": "Am 18. Januar 1871 wurde das Deutsche Reich im Spiegelsaal von Versailles gegründet — nicht durch das Volk, sondern durch Fürsten und Militär: Kaiserproklamation.",
      "fachbegriff": "Kaiserproklamation"
    },
    "loesung": [
      "Bismarck einte Deutschland durch drei Kriege — Einigung 'von oben', nicht 'von unten'.",
      "Das Deutsche Reich von 1871 brachte Einheit, aber keine Freiheit."
    ]
  },
  "transfer": {
    "frage": "War Einheit den Preis wert, wenn Freiheit fehlte?"
  },
  "voraussetzungen": ["k1-6"],
  "knoten": [
    {"id": "k2-1", "text": "Bismarck — Ministerpräsident 1862", "typ": "person"},
    {"id": "k2-2", "text": "Blut und Eisen", "typ": "kernbegriff", "merksatz": "Einigung durch Militär statt durch Parlament"},
    {"id": "k2-3", "text": "Drei Einigungskriege 1864/66/70", "typ": "ereignis"},
    {"id": "k2-4", "text": "Kleindeutsche Lösung", "typ": "kernbegriff", "merksatz": "Deutschland ohne Österreich unter Preußens Führung"},
    {"id": "k2-5", "text": "Kaiserproklamation Versailles 1871", "typ": "ereignis"},
    {"id": "k2-6", "text": "Einheit ohne Freiheit", "typ": "wirkung", "merksatz": "Einheit erreicht, aber keine Demokratie"}
  ],
  "verbindungen": [
    {"von": "k2-1", "nach": "k2-2", "label": "verkündet", "typ": "kausal"},
    {"von": "k2-2", "nach": "k2-3", "label": "setzt um", "typ": "kausal"},
    {"von": "k2-3", "nach": "k2-4", "label": "bedeutet", "typ": "schlussfolgerung"},
    {"von": "k2-3", "nach": "k2-5", "label": "führt zu", "typ": "temporal"},
    {"von": "k2-5", "nach": "k2-6", "label": "Ergebnis", "typ": "schlussfolgerung"}
  ]
}
```

## Erarbeitbarkeits-Nachweis

| SCPL-Schritt | Status | Skript-Referenz | TB-Knoten | scpl_phase | Aktion |
|---|---|---|---|---|---|
| S: Revolution gescheitert, Preußen übernimmt | DIRECT | C2 Einstieg-Kontext | — | S | — |
| C1: Volk vs. Bismarck, "Blut und Eisen" | DIRECT | C2 §1 | k2-1, k2-2 | C | — |
| C2: Drei Einigungskriege, kleindeutsche Lösung | DIRECT | C2 §2-§4 | k2-3, k2-4 | C | — |
| P: Kaiserproklamation Versailles | DIRECT | C2 §5 | k2-5 | P | — |

**Erarbeitbarkeits-Quote:** 4/4 DIRECT = 100% ≥ 70% ✓

## Fachbegriffe

| Begriff | Erklärung | SCPL-Zone | SKRIPT-Ref |
|---|---|---|---|
| Blut und Eisen | Bismarcks Strategie: Einigung durch Kriege statt Parlamentsdebatten | C1 | C2 §1 |
| kleindeutsche Lösung | Deutschland ohne Österreich, unter preußischer Führung | C2 | C2 §2 |
| Kaiserproklamation | Ausrufung Wilhelms I. zum Kaiser im Spiegelsaal von Versailles | P | C2 §5 |

## Q-Gate-Protokoll

| # | Kriterium | Prio | Ergebnis | Detail |
|---|---|---|---|---|
| G1 | Lernziel-Kongruenz | MUSS | PASS | TZ2 → KE1 (Bismarck, Kriege, "von oben") + KE2 (Einheit ohne Freiheit). LB2_K_04 (Reichsgründung) abgedeckt. |
| G2 | Reduktion (max. 4 C, max. 3 Merksätze) | MUSS | PASS | 2 C-Schritte, 2 Merksätze. |
| G3 | Erarbeitbarkeit | MUSS | PASS | 4/4 DIRECT (100%). |
| G4 | Strukturklarheit | MUSS | PASS | Ordnungsmuster: kontrastierend (von unten vs. von oben), konsistent. |
| G5 | Sprachliches Niveau | MUSS | PASS | Längster Merksatz: 13W. Alle ≤15W. |
| G6 | Hefteintrag-Transfer | MUSS | PASS | ~105W, ca. 5-6 min Übertragung. |
| G7 | Merksatz-Abschluss | SOLL | PASS | 2 Merksätze als ganze Aussagesätze. |
| G8 | Anschaulichkeit | SOLL | PASS | Gegenüberstellung von unten/von oben als Darstellung. Konkrete Beispiele: Versailles, Bismarck. |
| G9 | Progression | SOLL | PASS | Voraussetzung: k1-6 (Scheitern 1849) aus Mappe 1. Mappe 2 setzt dort an. Komplexitätssteigerung: kontrastierendes Muster statt sequenziell. |
| G10 | Rekapitulierbarkeit | SOLL | PASS | SCPL-Bogen: S (1848 gescheitert) → C (Bismarck wählt anderen Weg) → P (Kaiserproklamation) → L (Einheit ohne Freiheit). |
| G11 | Vermutungs-Sektion | KANN | N/A | Nicht vorgesehen in Phase 0.4. |
| G12 | Sprachregister-Passung | KANN | PASS | R7-Mittelschule. |
| G13 | Stundenfrage als Titel | KANN | PASS | 12W = exakt am Limit. |
| G14 | SCPL-Kohärenz | KANN | PASS | Jede Zone baut auf vorheriger auf. Kontrast unten/oben zieht sich durch. |

**Gesamt: PASS** — Alle BLOCKER bestanden, keine HIGH-Verletzung.
