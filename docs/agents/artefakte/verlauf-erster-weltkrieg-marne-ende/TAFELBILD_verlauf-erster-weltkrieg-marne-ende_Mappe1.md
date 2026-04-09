# Hefteintrag: Mappe 1 — Leben und Sterben im Schützengraben

**Game-ID:** verlauf-erster-weltkrieg-marne-ende  
**Mappe:** 1 / 4  
**Erstellt:** 2026-04-09 (Phase 0.4, AGENT_HEFTEINTRAG)  
**Validierungsstatus:** VALIDIERT (User-Validierung 2026-04-09) — STRUKTUR-FREEZE aktiv

---

## Stundenfrage

Wer überlebt im Schützengraben?

## Kernerkenntnisse

1. Der Stellungskrieg zwang Soldaten jahrelang in Schützengräben unter unmenschlichen Bedingungen.
2. Neue Waffen wie Giftgas machten jeden Angriff zur Todesfalle.
3. Bei Verdun und der Somme 1916 starben Hunderttausende — die Front verschob sich kaum.

## Ordnungsmuster

kausal — Die Bedingungen des Stellungskriegs erzeugen eine kausale Kette von Ursache und Wirkung: Grabenkrieg → unmenschliche Bedingungen → neue Waffen → Massenschlachten → Hoffnungslosigkeit.

## JSON-Repräsentation

```json
{
  "stundenfrage": "Wer überlebt im Schützengraben?",
  "scpl": {
    "situation": {
      "kontextsatz": "Ab Herbst 1914 graben sich die Armeen auf 700 Kilometern ein — der Bewegungskrieg wird zum Stellungskrieg.",
      "fachbegriffe": ["Stellungskrieg"]
    },
    "complication": [
      {
        "schritt": "Soldaten leben in Schützengräben voller Wasser, Ratten und Leichen — ständig bedroht durch Artillerie: Schützengraben.",
        "fachbegriff": "Schützengraben",
        "typ": "narrativ",
        "erarbeitbarkeit": "DIRECT",
        "darstellung": null
      },
      {
        "schritt": "1915 setzen die Deutschen bei Ypern erstmals Chlorgas ein — 90.000 Soldaten sterben im Krieg durch diese Waffe: Giftgas.",
        "fachbegriff": "Giftgas",
        "typ": "narrativ",
        "erarbeitbarkeit": "DIRECT",
        "darstellung": null
      },
      {
        "schritt": "Bei Verdun 1916 sterben 600.000 Soldaten für wenige Kilometer Boden — der General nennt es Ausblutungsschlacht.",
        "fachbegriff": "Ausblutungsschlacht",
        "typ": "kausal",
        "erarbeitbarkeit": "DIRECT",
        "darstellung": null
      }
    ],
    "problem": {
      "satz": "Die Technologie der Abwehr ist stärker als der Angriff — Maschinengewehre und Stacheldraht machen jeden Sturmangriff zum Massensterben: Materialschlacht.",
      "fachbegriff": "Materialschlacht"
    },
    "loesung": [
      {
        "kernerkenntnis": "Der Stellungskrieg zwang Soldaten jahrelang in Schützengräben unter unmenschlichen Bedingungen.",
        "erarbeitbarkeit": "DIRECT"
      },
      {
        "kernerkenntnis": "Neue Waffen wie Giftgas machten jeden Angriff zur Todesfalle.",
        "erarbeitbarkeit": "DIRECT"
      },
      {
        "kernerkenntnis": "Bei Verdun und der Somme 1916 starben Hunderttausende — die Front verschob sich kaum.",
        "erarbeitbarkeit": "DIRECT"
      }
    ]
  },
  "ordnungsmuster": "kausal",
  "fachbegriffe": ["Stellungskrieg", "Schützengraben", "Giftgas", "Ausblutungsschlacht", "Materialschlacht"],
  "knoten": [],
  "verbindungen": [],
  "transfer": {
    "frage": "Gibt es heute noch Stellungskriege — oder kämpfen Armeen anders?"
  },
  "voraussetzungen": {
    "vorgaenger_mappe": "Vorgänger-Game Chunk 4: Schlieffen-Plan gescheitert, Stellungskrieg beginnt"
  }
}
```

## Erarbeitbarkeits-Nachweis

| SCPL-Schritt | Status | Skript-Referenz | scpl_phase | Aktion |
|---|---|---|---|---|
| S: Stellungskrieg ab Herbst 1914 | DIRECT | Chunk 1, §1 | S | — |
| C1: Schützengraben-Alltag | DIRECT | Chunk 1, §1, §2, §6 | C | — |
| C2: Giftgas bei Ypern 1915 | DIRECT | Chunk 1, §3 | C | — |
| C3: Verdun 1916 Ausblutungsschlacht | DIRECT | Chunk 1, §4 | C | — |
| P: Materialschlacht — Abwehr stärker als Angriff | DIRECT | Chunk 1, §5, §6 | P | — |
| L1: Stellungskrieg unmenschliche Bedingungen | DIRECT | Chunk 1, §1–§6 (Synthese) | L | — |
| L2: Giftgas als Todesfalle | DIRECT | Chunk 1, §3 | L | — |
| L3: Verdun/Somme Hunderttausende Tote | DIRECT | Chunk 1, §4, §5 | L | — |

**DIRECT + ARTIFACT Quote:** 100% (8/8 DIRECT). Schwelle 70% erreicht.

## Transfer-Frage

Gibt es heute noch Stellungskriege — oder kämpfen Armeen anders?

## Fachbegriffe

| Fachbegriff | Erklärung | SCPL-Zone | Skript-Referenz |
|---|---|---|---|
| Stellungskrieg | Krieg aus festen Gräben ohne Frontbewegung | S | Chunk 1, §1 |
| Schützengraben | Befestigte Gräben, in denen Soldaten lebten und kämpften | C1 | Chunk 1, §1, §2, §6 |
| Giftgas | Chemische Waffe (Chlorgas), erstmals 1915 bei Ypern eingesetzt | C2 | Chunk 1, §3 |
| Ausblutungsschlacht | Strategie, den Gegner durch maximale Verluste zu zermürben | C3 | Chunk 1, §4 |
| Materialschlacht | Krieg, in dem Technik und Masse über Sieg oder Niederlage entscheiden | P | Chunk 1, §5, §6 |

## Q-Gate-Protokoll

| # | Kriterium | Prio | Ergebnis | Detail |
|---|---|---|---|---|
| G1 | Reduktion (≤10 Elemente) | MUSS | PASS | 8 Elemente (1S + 3C + 1P + 3L) |
| G2 | Strukturiertheit | SOLL | PASS | Klare SCPL-Abfolge, kausal konsistent |
| G3 | Erarbeitbarkeit | MUSS | PASS | 100% DIRECT (8/8) |
| G4 | Visualisierbarkeit | KANN | PASS | Kausalkette vertikal darstellbar |
| G5 | Artefakt-Integration | SOLL | PASS | img-1-1, img-1-2, zit-1-1, zit-1-2, pq-1-1, rolle-1-1 stützen C1–C3 |
| G6 | Merksatz als Stundenfragen-Antwort | MUSS | PASS | L1–L3 beantworten "Wer überlebt?" → Niemand unbeschadet |
| G7 | Ästhetik-Potential | KANN | PASS | Kausalkette mit Pfeildarstellung |
| G8 | Sprachregister R7 | MUSS | PASS | Einfache Sätze, max 15W pro Merksatz |
| G9 | Progression | SOLL | PASS | Baut auf Vorgänger-Game (Schlieffen-Plan → Stellungskrieg) |
| G10 | Fachbegriffe korrekt verortet | SOLL | PASS | 5 Begriffe, je 1 pro Zone, per Doppelpunkt eingeführt |
| G11 | Keine Überladung (max 120W) | MUSS | PASS | ~113 Wörter Hefteintrag-Text |
| G12 | Lehrplan-Referenzierbarkeit | KANN | PASS | KE-A (K_07) direkt adressiert |
| G13 | Multiperspektivität-Ansatz | KANN | PASS | Deutsche + brit./franz. Perspektive im SKRIPT |
| G14 | SCPL-Kohärenz | MUSS | PASS | S→C1→C2→C3→P→L bildet geschlossenen Bogen |

**Gesamt:** PASS
