# Hefteintrag: Mappe 2 — Der Krieg hinter der Front

**Game-ID:** verlauf-erster-weltkrieg-marne-ende  
**Mappe:** 2 / 4  
**Erstellt:** 2026-04-09 (Phase 0.4, AGENT_HEFTEINTRAG)  
**Validierungsstatus:** ENTWURF (User-Validierung ausstehend)

---

## Stundenfrage

Was bedeutete der Krieg für die Menschen zuhause?

## Kernerkenntnisse

1. Die britische Seeblockade führte zu Hunger — im Steckrübenwinter starben Hunderttausende Zivilisten.
2. Frauen übernahmen die Arbeit der Männer in Fabriken und veränderten die Gesellschaft.
3. Kriegsmüdigkeit und Hunger trieben die Menschen zu Streiks und Widerstand.

## Ordnungsmuster

kausal — Die Seeblockade erzeugt eine kausale Kette: Blockade → Hunger → Frauenarbeit → Kriegsmüdigkeit → Streiks → Vertrauensverlust.

## JSON-Repräsentation

```json
{
  "stundenfrage": "Was bedeutete der Krieg für die Menschen zuhause?",
  "scpl": {
    "situation": {
      "kontextsatz": "Ab 1914 sperrt die britische Marine die deutschen Häfen — kein Getreide, kein Fett erreicht Deutschland: Seeblockade.",
      "fachbegriffe": ["Seeblockade"]
    },
    "complication": [
      {
        "schritt": "Die Regierung führt Brotkarten ein — jede Person darf nur noch eine bestimmte Menge pro Woche kaufen: Rationierung.",
        "fachbegriff": "Rationierung",
        "typ": "kausal",
        "erarbeitbarkeit": "DIRECT",
        "darstellung": null
      },
      {
        "schritt": "Im Steckrübenwinter 1916/17 hungern Hunderttausende — bis zu 763.000 Zivilisten sterben an Unterernährung: Steckrübenwinter.",
        "fachbegriff": "Steckrübenwinter",
        "typ": "narrativ",
        "erarbeitbarkeit": "DIRECT",
        "darstellung": null
      },
      {
        "schritt": "Frauen übernehmen die Arbeit der eingezogenen Männer — bis 1918 ist ein Drittel aller Fabrikarbeiter weiblich: Frauenarbeit.",
        "fachbegriff": "Frauenarbeit",
        "typ": "konzeptuell",
        "erarbeitbarkeit": "DIRECT",
        "darstellung": null
      }
    ],
    "problem": {
      "satz": "Hunger, Erschöpfung und der Widerspruch zwischen Propaganda und Wirklichkeit zerstören das Vertrauen in die Regierung: Kriegsmüdigkeit.",
      "fachbegriff": "Kriegsmüdigkeit"
    },
    "loesung": [
      {
        "kernerkenntnis": "Die britische Seeblockade führte zu Hunger — im Steckrübenwinter starben Hunderttausende Zivilisten.",
        "erarbeitbarkeit": "DIRECT"
      },
      {
        "kernerkenntnis": "Frauen übernahmen die Arbeit der Männer in Fabriken und veränderten die Gesellschaft.",
        "erarbeitbarkeit": "DIRECT"
      },
      {
        "kernerkenntnis": "Kriegsmüdigkeit und Hunger trieben die Menschen zu Streiks und Widerstand.",
        "erarbeitbarkeit": "DIRECT"
      }
    ]
  },
  "ordnungsmuster": "kausal",
  "fachbegriffe": ["Seeblockade", "Rationierung", "Steckrübenwinter", "Frauenarbeit", "Kriegsmüdigkeit"],
  "knoten": [],
  "verbindungen": [],
  "transfer": {
    "frage": "Wie verändert ein Krieg heute den Alltag der Menschen zuhause?"
  },
  "voraussetzungen": {
    "vorgaenger_mappe": "Mappe 1: Stellungskrieg, Hoffnungslosigkeit der Soldaten"
  }
}
```

## Erarbeitbarkeits-Nachweis

| SCPL-Schritt | Status | Skript-Referenz | scpl_phase | Aktion |
|---|---|---|---|---|
| S: Seeblockade ab 1914 | DIRECT | Chunk 2, §1 | S | — |
| C1: Rationierung / Brotkarten | DIRECT | Chunk 2, §1 | C | — |
| C2: Steckrübenwinter 1916/17 | DIRECT | Chunk 2, §2 | C | — |
| C3: Frauenarbeit in Fabriken | DIRECT | Chunk 2, §3 | C | — |
| P: Kriegsmüdigkeit und Vertrauensverlust | DIRECT | Chunk 2, §4, §5 | P | — |
| L1: Seeblockade → Hunger → Steckrübenwinter | DIRECT | Chunk 2, §1–§2 (Synthese) | L | — |
| L2: Frauenarbeit verändert Gesellschaft | DIRECT | Chunk 2, §3 | L | — |
| L3: Kriegsmüdigkeit → Streiks | DIRECT | Chunk 2, §4, §5 | L | — |

**DIRECT + ARTIFACT Quote:** 100% (8/8 DIRECT). Schwelle 70% erreicht.

## Transfer-Frage

Wie verändert ein Krieg heute den Alltag der Menschen zuhause?

## Fachbegriffe

| Fachbegriff | Erklärung | SCPL-Zone | Skript-Referenz |
|---|---|---|---|
| Seeblockade | Absperrung der Häfen durch die britische Marine, um die Versorgung abzuschneiden | S | Chunk 2, §1 |
| Rationierung | Staatliche Zuteilung von Lebensmitteln per Brotkarte | C1 | Chunk 2, §1 |
| Steckrübenwinter | Winter 1916/17, als die Versorgungslage so schlecht war, dass Menschen Futterrüben aßen | C2 | Chunk 2, §2 |
| Frauenarbeit | Übernahme von Fabrikarbeit durch Frauen, weil die Männer im Krieg waren | C3 | Chunk 2, §3 |
| Kriegsmüdigkeit | Zunehmende Erschöpfung und Ablehnung des Krieges in der Bevölkerung | P | Chunk 2, §4, §5 |

## Q-Gate-Protokoll

| # | Kriterium | Prio | Ergebnis | Detail |
|---|---|---|---|---|
| G1 | Reduktion (≤10 Elemente) | MUSS | PASS | 8 Elemente (1S + 3C + 1P + 3L) |
| G2 | Strukturiertheit | SOLL | PASS | Klare SCPL-Abfolge, kausal konsistent |
| G3 | Erarbeitbarkeit | MUSS | PASS | 100% DIRECT (8/8) |
| G4 | Visualisierbarkeit | KANN | PASS | Kausalkette vertikal darstellbar |
| G5 | Artefakt-Integration | SOLL | PASS | pq-2-1, zit-2-1, img-2-1, img-2-2, rolle-2-1, rolle-2-2 stützen C1–C3/P |
| G6 | Merksatz als Stundenfragen-Antwort | MUSS | PASS | L1–L3 beantworten "Was bedeutete der Krieg zuhause?" → Hunger, Frauenarbeit, Widerstand |
| G7 | Ästhetik-Potential | KANN | PASS | Kausalkette mit Pfeildarstellung |
| G8 | Sprachregister R7 | MUSS | PASS | Einfache Sätze, max 15W pro Merksatz |
| G9 | Progression | SOLL | PASS | Baut auf M1 (Stellungskrieg-Elend → Perspektivwechsel Heimat) |
| G10 | Fachbegriffe korrekt verortet | SOLL | PASS | 5 Begriffe, je 1 pro Zone, per Doppelpunkt eingeführt |
| G11 | Keine Überladung (max 120W) | MUSS | PASS | ~112 Wörter Hefteintrag-Text |
| G12 | Lehrplan-Referenzierbarkeit | KANN | PASS | KE-B (K_08) direkt adressiert |
| G13 | Multiperspektivität-Ansatz | KANN | PASS | Arbeiterinnen, Mütter, Aktivisten im SKRIPT |
| G14 | SCPL-Kohärenz | MUSS | PASS | S→C1→C2→C3→P→L bildet geschlossenen Bogen |

**Gesamt:** PASS
