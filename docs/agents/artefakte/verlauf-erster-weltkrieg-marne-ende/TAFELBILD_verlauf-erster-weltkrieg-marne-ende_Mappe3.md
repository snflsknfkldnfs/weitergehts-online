# Hefteintrag: Mappe 3 — Der Zusammenbruch

**Game-ID:** verlauf-erster-weltkrieg-marne-ende  
**Mappe:** 3 / 4  
**Erstellt:** 2026-04-09 (Phase 0.4, AGENT_HEFTEINTRAG)  
**Validierungsstatus:** ENTWURF (User-Validierung ausstehend)

---

## Stundenfrage

Warum endete der Krieg durch Revolution?

## Kernerkenntnisse

1. Die gescheiterte Frühjahrsoffensive 1918 zeigte, dass Deutschland den Krieg nicht gewinnen konnte.
2. Die Matrosenmeuterei in Kiel löste eine Revolution aus — der Kaiser dankte ab.
3. Am 11. November 1918 endete der Krieg durch einen Waffenstillstand.

## Ordnungsmuster

chronologisch — Die Ereignisse von 1917 bis November 1918 folgen einer zeitlichen Abfolge: USA-Eintritt → Offensive scheitert → Schwarzer Tag → Meuterei → Revolution → Waffenstillstand.

## JSON-Repräsentation

```json
{
  "stundenfrage": "Warum endete der Krieg durch Revolution?",
  "scpl": {
    "situation": {
      "kontextsatz": "Ab April 1917 kämpfen die USA auf Seiten der Gegner Deutschlands — der Kräftevorteil verschiebt sich: Alliierte.",
      "fachbegriffe": ["Alliierte"]
    },
    "complication": [
      {
        "schritt": "Die Frühjahrsoffensive 1918 gewinnt 60 Kilometer — doch dann fehlen die Reserven und der Angriff stoppt: Frühjahrsoffensive.",
        "fachbegriff": "Frühjahrsoffensive",
        "typ": "chronologisch",
        "erarbeitbarkeit": "DIRECT",
        "darstellung": null
      },
      {
        "schritt": "Am 8. August 1918 durchbrechen die Alliierten die Linien bei Amiens — Ludendorff sagt: Der Krieg ist verloren: Schwarzer Tag.",
        "fachbegriff": "Schwarzer Tag",
        "typ": "narrativ",
        "erarbeitbarkeit": "DIRECT",
        "darstellung": null
      },
      {
        "schritt": "Die Matrosen in Kiel verweigern den Befehl zur letzten Seeschlacht — die Rebellion breitet sich im Land aus: Meuterei.",
        "fachbegriff": "Meuterei",
        "typ": "narrativ",
        "erarbeitbarkeit": "DIRECT",
        "darstellung": null
      }
    ],
    "problem": {
      "satz": "Am 9. November 1918 dankt der Kaiser ab — nicht die Armee beendet den Krieg, sondern die Revolution: Novemberrevolution.",
      "fachbegriff": "Novemberrevolution"
    },
    "loesung": [
      {
        "kernerkenntnis": "Die gescheiterte Frühjahrsoffensive 1918 zeigte, dass Deutschland den Krieg nicht gewinnen konnte.",
        "erarbeitbarkeit": "DIRECT"
      },
      {
        "kernerkenntnis": "Die Matrosenmeuterei in Kiel löste eine Revolution aus — der Kaiser dankte ab.",
        "erarbeitbarkeit": "DIRECT"
      },
      {
        "kernerkenntnis": "Am 11. November 1918 endete der Krieg durch einen Waffenstillstand.",
        "erarbeitbarkeit": "DIRECT"
      }
    ]
  },
  "ordnungsmuster": "chronologisch",
  "fachbegriffe": ["Alliierte", "Frühjahrsoffensive", "Schwarzer Tag", "Meuterei", "Novemberrevolution", "Waffenstillstand"],
  "knoten": [],
  "verbindungen": [],
  "transfer": {
    "frage": "Kann ein Krieg auch heute durch Revolution enden?"
  },
  "voraussetzungen": {
    "vorgaenger_mappe": "Mappe 2: Kriegsmüdigkeit, Streiks, Vertrauensverlust in Regierung"
  }
}
```

## Erarbeitbarkeits-Nachweis

| SCPL-Schritt | Status | Skript-Referenz | scpl_phase | Aktion |
|---|---|---|---|---|
| S: USA-Kriegseintritt April 1917 | DIRECT | Chunk 3, §1 | S | — |
| C1: Frühjahrsoffensive 1918 scheitert | DIRECT | Chunk 3, §2 | C | — |
| C2: Schwarzer Tag bei Amiens 8. August 1918 | DIRECT | Chunk 3, §3 | C | — |
| C3: Matrosenmeuterei Kiel Oktober 1918 | DIRECT | Chunk 3, §4 | C | — |
| P: Novemberrevolution — Kaiser dankt ab | DIRECT | Chunk 3, §5 | P | — |
| L1: Frühjahrsoffensive gescheitert | DIRECT | Chunk 3, §2, §3 (Synthese) | L | — |
| L2: Meuterei → Revolution → Kaiser-Abdankung | DIRECT | Chunk 3, §4, §5 | L | — |
| L3: Waffenstillstand 11. November 1918 | DIRECT | Chunk 3, §6 | L | — |

**DIRECT + ARTIFACT Quote:** 100% (8/8 DIRECT). Schwelle 70% erreicht.

## Transfer-Frage

Kann ein Krieg auch heute durch Revolution enden?

## Fachbegriffe

| Fachbegriff | Erklärung | SCPL-Zone | Skript-Referenz |
|---|---|---|---|
| Alliierte | Die Kriegsgegner Deutschlands — vor allem Frankreich, Großbritannien und die USA | S | Chunk 3, §1 |
| Frühjahrsoffensive | Letzte große deutsche Offensive im Frühjahr 1918, auch Kaiserschlacht genannt | C1 | Chunk 3, §2 |
| Schwarzer Tag | 8. August 1918 — Durchbruch der Alliierten bei Amiens, Wendepunkt des Krieges | C2 | Chunk 3, §3 |
| Meuterei | Verweigerung eines militärischen Befehls — hier: Matrosenaufstand in Kiel | C3 | Chunk 3, §4 |
| Novemberrevolution | Revolution im November 1918, die zur Abdankung des Kaisers und zur Republik führte | P | Chunk 3, §5 |
| Waffenstillstand | Vereinbarung zur Einstellung der Kampfhandlungen am 11. November 1918 | L3 | Chunk 3, §6 |

## Q-Gate-Protokoll

| # | Kriterium | Prio | Ergebnis | Detail |
|---|---|---|---|---|
| G1 | Reduktion (≤10 Elemente) | MUSS | PASS | 8 Elemente (1S + 3C + 1P + 3L) |
| G2 | Strukturiertheit | SOLL | PASS | Klare SCPL-Abfolge, chronologisch konsistent |
| G3 | Erarbeitbarkeit | MUSS | PASS | 100% DIRECT (8/8) |
| G4 | Visualisierbarkeit | KANN | PASS | Zeitleiste vertikal darstellbar |
| G5 | Artefakt-Integration | SOLL | PASS | img-3-1, img-3-2, zit-3-1, pq-3-1, pq-3-2, rolle-3-1, rolle-3-2 stützen C1–P |
| G6 | Merksatz als Stundenfragen-Antwort | MUSS | PASS | L1–L3 beantworten "Warum durch Revolution?" → Militär gescheitert + Volk rebelliert |
| G7 | Ästhetik-Potential | KANN | PASS | Zeitleiste mit Pfeildarstellung |
| G8 | Sprachregister R7 | MUSS | PASS | Einfache Sätze, max 15W pro Merksatz |
| G9 | Progression | SOLL | PASS | Baut auf M2 (Kriegsmüdigkeit/Streiks → Revolution) |
| G10 | Fachbegriffe korrekt verortet | SOLL | PASS | 6 Begriffe, je 1 pro Zone, per Doppelpunkt eingeführt |
| G11 | Keine Überladung (max 120W) | MUSS | PASS | ~115 Wörter Hefteintrag-Text |
| G12 | Lehrplan-Referenzierbarkeit | KANN | PASS | KE-A/KE-B Nebenzuordnung (Verlauf-Ende + Kriegsfolgen) |
| G13 | Multiperspektivität-Ansatz | KANN | PASS | Generäle, Matrosen, Arbeiter, Politiker im SKRIPT |
| G14 | SCPL-Kohärenz | MUSS | PASS | S→C1→C2→C3→P→L bildet geschlossenen chronologischen Bogen |

**Gesamt:** PASS
