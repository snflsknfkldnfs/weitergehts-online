# Hefteintrag: Mappe 1 — Der Traum von der Einheit

**Game-ID:** `deutscher-nationalismus-kolonialismus`
**Mappe:** 1 / 4
**Erstellt:** 2026-04-12 (Phase 0.4, AGENT_HEFTEINTRAG)
**Validierungsstatus:** ENTWURF
**Basis:** SKRIPT Chunk 1 + DIDAKTIK_RAHMEN (TZ1, KE LB2_K_04)

---

## Stundenfrage

Warum kämpften Menschen 1848 für ein geeintes Deutschland?

## Kernerkenntnisse

1. Die Nationalbewegung forderte Einheit, Freiheit und eine Verfassung für alle Deutschen.
2. Die Revolution von 1848 und die Nationalversammlung scheiterten am Widerstand der Fürsten.

## Ordnungsmuster

sequenziell — Die Mappe folgt dem zeitlichen Ablauf von den Befreiungskriegen über die Nationalbewegung und die Märzrevolution bis zum Scheitern der Paulskirche.

## JSON-Repräsentation

```json
{
  "stundenfrage": "Warum kämpften Menschen 1848 für ein geeintes Deutschland?",
  "ordnungsmuster": "sequenziell",
  "scpl": {
    "situation": {
      "kontextsatz": "Anfang des 19. Jahrhunderts gab es kein 'Deutschland' — nur Dutzende Einzelstaaten. Nach den Kriegen gegen Napoleon entstand ein neuer Wunsch — der Nationalgedanke.",
      "fachbegriffe": ["Nationalgedanke"]
    },
    "complication": [
      {
        "schritt": "Auf dem Wartburgfest 1817 und dem Hambacher Fest 1832 forderten Tausende Einheit und Verfassung — die Fürsten antworteten mit Verboten: Nationalbewegung.",
        "typ": "kontrastiv",
        "fachbegriff": "Nationalbewegung",
        "darstellung": null,
        "erarbeitbarkeit": "DIRECT"
      },
      {
        "schritt": "Im März 1848 kämpften Arbeiter und Handwerker auf Barrikaden gegen die Armeen der Fürsten: Märzrevolution.",
        "typ": "narrativ",
        "fachbegriff": "Märzrevolution",
        "darstellung": null,
        "erarbeitbarkeit": "DIRECT"
      },
      {
        "schritt": "In der Paulskirche erarbeiteten Abgeordnete eine Verfassung mit Grundrechten — der König lehnte die Kaiserkrone ab: Nationalversammlung.",
        "typ": "narrativ",
        "fachbegriff": "Nationalversammlung",
        "darstellung": null,
        "erarbeitbarkeit": "DIRECT"
      }
    ],
    "problem": {
      "satz": "Der Traum von Einheit und Freiheit scheiterte 1849 — das Volk konnte sich gegen die Fürsten nicht durchsetzen: Volkssouveränität.",
      "fachbegriff": "Volkssouveränität"
    },
    "loesung": [
      "Die Nationalbewegung forderte Einheit, Freiheit und eine Verfassung für alle Deutschen.",
      "Die Revolution von 1848 scheiterte — die Fürsten behielten ihre Macht."
    ]
  },
  "transfer": {
    "frage": "Gibt es heute noch Kämpfe für Demokratie und Freiheit?"
  },
  "voraussetzungen": [],
  "knoten": [
    {"id": "k1-1", "text": "Befreiungskriege gegen Napoleon", "typ": "ereignis"},
    {"id": "k1-2", "text": "Wartburgfest 1817 / Hambacher Fest 1832", "typ": "ereignis"},
    {"id": "k1-3", "text": "Nationalbewegung", "typ": "kernbegriff", "merksatz": "Bürger fordern einen gemeinsamen Staat mit Verfassung"},
    {"id": "k1-4", "text": "Märzrevolution 1848", "typ": "ereignis"},
    {"id": "k1-5", "text": "Nationalversammlung Paulskirche", "typ": "ereignis"},
    {"id": "k1-6", "text": "Scheitern 1849", "typ": "wirkung", "merksatz": "König lehnt Kaiserkrone ab — Fürsten behalten Macht"},
    {"id": "k1-7", "text": "Volkssouveränität", "typ": "kernbegriff", "merksatz": "Alle Macht soll vom Volk ausgehen"}
  ],
  "verbindungen": [
    {"von": "k1-1", "nach": "k1-2", "label": "weckt", "typ": "kausal"},
    {"von": "k1-2", "nach": "k1-3", "label": "wächst zu", "typ": "kausal"},
    {"von": "k1-3", "nach": "k1-4", "label": "mündet in", "typ": "temporal"},
    {"von": "k1-4", "nach": "k1-5", "label": "führt zu", "typ": "temporal"},
    {"von": "k1-5", "nach": "k1-6", "label": "scheitert", "typ": "kausal"}
  ]
}
```

## Erarbeitbarkeits-Nachweis

| SCPL-Schritt | Status | Skript-Referenz | TB-Knoten | scpl_phase | Aktion |
|---|---|---|---|---|---|
| S: Kein 'Deutschland', Nationalgedanke nach Befreiungskriegen | DIRECT | C1 §1 | k1-1, k1-3 | S | — |
| C1: Wartburgfest, Hambacher Fest, Fürsten unterdrücken | DIRECT | C1 §2-§3 | k1-2, k1-3 | C | — |
| C2: Märzrevolution, Barrikadenkämpfe | DIRECT | C1 §4 | k1-4 | C | — |
| C3: Paulskirche, Verfassung, König lehnt ab | DIRECT | C1 §5-§6 | k1-5 | C | — |
| P: Scheitern der Revolution | DIRECT | C1 §6 | k1-6 | P | — |

**Erarbeitbarkeits-Quote:** 5/5 DIRECT = 100% ≥ 70% ✓

## Fachbegriffe

| Begriff | Erklärung | SCPL-Zone | SKRIPT-Ref |
|---|---|---|---|
| Nationalgedanke | Wunsch nach einem geeinten deutschen Staat | S | C1 §1 |
| Nationalbewegung | Bürger, die für Einheit und Verfassung eintreten | C1 | C1 §2-§3 |
| Märzrevolution | Aufstand im März 1848 in den deutschen Staaten | C2 | C1 §4 |
| Nationalversammlung | Erstes frei gewähltes gesamtdeutsches Parlament 1848 | C3 | C1 §5 |
| Volkssouveränität | Grundsatz: Alle Macht geht vom Volk aus | P | C1 §3 |

## Q-Gate-Protokoll

| # | Kriterium | Prio | Ergebnis | Detail |
|---|---|---|---|---|
| G1 | Lernziel-Kongruenz | MUSS | PASS | TZ1 → KE1 (Einheit, Freiheit, Verfassung) + KE2 (Scheitern 1848). LB2_K_04 abgedeckt. |
| G2 | Reduktion (max. 4 C, max. 3 Merksätze) | MUSS | PASS | 3 C-Schritte, 2 Merksätze. |
| G3 | Erarbeitbarkeit | MUSS | PASS | 5/5 DIRECT (100%). |
| G4 | Strukturklarheit | MUSS | PASS | Ordnungsmuster: sequenziell, konsistent durchgehalten. |
| G5 | Sprachliches Niveau | MUSS | PASS | Längster Merksatz: 13W. Alle ≤15W. |
| G6 | Hefteintrag-Transfer | MUSS | PASS | ~101W, ca. 5-6 min Übertragung. |
| G7 | Merksatz-Abschluss | SOLL | PASS | 2 Merksätze als ganze Aussagesätze. |
| G8 | Anschaulichkeit | SOLL | PASS | Konkrete Beispiele: Wartburgfest, Hambacher Fest, Barrikaden, Paulskirche. |
| G9 | Progression | SOLL | N/A | Mappe 1 — kein Vorgänger. |
| G10 | Rekapitulierbarkeit | SOLL | PASS | SCPL-Bogen erkennbar: S (kein Deutschland) → C (Bewegung wächst) → P (scheitert) → L (Erkenntnis). |
| G11 | Vermutungs-Sektion | KANN | N/A | Nicht vorgesehen in Phase 0.4. |
| G12 | Sprachregister-Passung | KANN | PASS | R7-Mittelschule, einfache Sprache. |
| G13 | Stundenfrage als Titel | KANN | PASS | "Warum kämpften Menschen 1848 für ein geeintes Deutschland?" — 9W ≤ 12W. |
| G14 | SCPL-Kohärenz | KANN | PASS | Jede Zone baut auf vorheriger auf. S→C→P→L bildet geschlossenen Bogen. |

**Gesamt: PASS** — Alle BLOCKER bestanden, keine HIGH-Verletzung.
