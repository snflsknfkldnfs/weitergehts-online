# Hefteintrag: Mappe 3 — Der Zusammenbruch

**Game-ID:** verlauf-erster-weltkrieg-marne-ende  
**Mappe:** 3 / 4  
**Erstellt:** 2026-04-09 (Phase 0.4, AGENT_HEFTEINTRAG)  
**Validierungsstatus:** VALIDIERT (User-Validierung 2026-04-09) — STRUKTUR-FREEZE aktiv  
**Revision:** v2 — Reframe IA-C1 (chronologisch → kausal)

---

## Stundenfrage

Warum endete der Krieg durch Revolution?

## Kernerkenntnisse

1. Deutschlands letzte Offensive scheiterte — militärisch war der Krieg verloren.
2. Die Militärführung schob die Verantwortung auf die Politiker — ein Vertrauensbruch mit Folgen.
3. Das Volk beendete den Krieg durch Revolution, nicht die Armee durch Kapitulation.

## Ordnungsmuster

kausal — Militärisches Scheitern + politischer Vertrauensbruch + Erschöpfung der Bevölkerung erzeugen zusammen die Revolution. Jede C-Zone verschärft das Problem aus einer anderen Dimension (militärisch → politisch), bis P den Bruch benennt.

## JSON-Repräsentation

```json
{
  "stundenfrage": "Warum endete der Krieg durch Revolution?",
  "scpl": {
    "situation": {
      "kontextsatz": "Ende 1917 ist Deutschland militärisch und wirtschaftlich erschöpft — die Heimatfront bricht zusammen, gleichzeitig verstärken die USA die Gegenseite: Alliierte.",
      "fachbegriffe": ["Alliierte"]
    },
    "complication": [
      {
        "schritt": "Die Frühjahrsoffensive 1918 ist Deutschlands letzte Chance — 60 Kilometer Gewinn, dann fehlen die Reserven, der Angriff bricht zusammen: Frühjahrsoffensive.",
        "fachbegriff": "Frühjahrsoffensive",
        "typ": "kausal",
        "erarbeitbarkeit": "DIRECT",
        "darstellung": null
      },
      {
        "schritt": "Die Oberste Heeresleitung erkennt die Niederlage und fordert einen Waffenstillstand — doch sie schiebt die Verantwortung auf die Regierung: Waffenstillstandsgesuch.",
        "fachbegriff": "Waffenstillstandsgesuch",
        "typ": "kausal",
        "erarbeitbarkeit": "INFERENTIAL",
        "darstellung": null
      }
    ],
    "problem": {
      "satz": "Die Matrosen in Kiel verweigern einen sinnlosen Befehl — das Volk, nicht die Armee, beendet den Krieg: Novemberrevolution.",
      "fachbegriff": "Novemberrevolution"
    },
    "loesung": [
      {
        "kernerkenntnis": "Deutschlands letzte Offensive scheiterte — militärisch war der Krieg verloren.",
        "erarbeitbarkeit": "DIRECT"
      },
      {
        "kernerkenntnis": "Die Militärführung schob die Verantwortung auf die Politiker — ein Vertrauensbruch mit Folgen.",
        "erarbeitbarkeit": "INFERENTIAL"
      },
      {
        "kernerkenntnis": "Das Volk beendete den Krieg durch Revolution, nicht die Armee durch Kapitulation.",
        "erarbeitbarkeit": "DIRECT"
      }
    ]
  },
  "ordnungsmuster": "kausal",
  "fachbegriffe": ["Alliierte", "Frühjahrsoffensive", "Waffenstillstandsgesuch", "Meuterei", "Novemberrevolution"],
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
| S: Deutschland erschöpft, USA verstärkt Alliierte | DIRECT | Chunk 3 §1 (USA-Eintritt) + Chunk 2 §4–§5 (Kriegsmüdigkeit aus M2) | S | — |
| C1: Frühjahrsoffensive scheitert | DIRECT | Chunk 3, §2 | C | — |
| C2: OHL fordert Waffenstillstand, schiebt Schuld weiter | INFERENTIAL | Chunk 3 §3 (Ludendorff: "Krieg verloren") + Chunk 4 §6 (Dolchstoßlegende als Folge) | C | AGENT_MATERIAL: Quelle zur Verantwortungsverschiebung OHL→Regierung Sept. 1918 |
| P: Matrosen verweigern, Volk revolutioniert | DIRECT | Chunk 3, §4 (Meuterei), §5 (Kaiser-Abdankung) | P | — |
| L1: Offensive gescheitert → Krieg militärisch verloren | DIRECT | Chunk 3, §2–§3 (Synthese) | L | — |
| L2: Militärführung schiebt Verantwortung auf Politiker | INFERENTIAL | Chunk 3 §3 + Chunk 4 §6 (Synthese) | L | Stützt sich auf C2-Material |
| L3: Volk beendet Krieg durch Revolution | DIRECT | Chunk 3, §4–§6 | L | — |

**DIRECT + ARTIFACT Quote:** 71% (5/7 DIRECT). Schwelle 70% erreicht. C2 und L2 als INFERENTIAL markiert — AGENT_MATERIAL muss Quelle zur Verantwortungsverschiebung OHL→Regierung bereitstellen.

## Transfer-Frage

Kann ein Krieg auch heute durch Revolution enden?

## Fachbegriffe

| Fachbegriff | Erklärung | SCPL-Zone | Skript-Referenz |
|---|---|---|---|
| Alliierte | Die Kriegsgegner Deutschlands — vor allem Frankreich, Großbritannien und die USA | S | Chunk 3, §1 |
| Frühjahrsoffensive | Letzte große deutsche Offensive im Frühjahr 1918, auch Kaiserschlacht genannt | C1 | Chunk 3, §2 |
| Waffenstillstandsgesuch | Forderung der Militärführung an die Regierung, Friedensverhandlungen aufzunehmen | C2 | Chunk 3, §3 (implizit) |
| Meuterei | Verweigerung eines militärischen Befehls — hier: Matrosenaufstand in Kiel | P | Chunk 3, §4 |
| Novemberrevolution | Revolution im November 1918, die zur Abdankung des Kaisers und zur Republik führte | P | Chunk 3, §4–§5 |

## Q-Gate-Protokoll

| # | Kriterium | Prio | Ergebnis | Detail |
|---|---|---|---|---|
| G1 | Reduktion (≤10 Elemente) | MUSS | PASS | 6 Elemente (1S + 2C + 1P + 3L) — reduziert von 8 |
| G2 | Strukturiertheit | SOLL | PASS | Klare SCPL-Abfolge, kausal konsistent |
| G3 | Erarbeitbarkeit | MUSS | PASS | 71% DIRECT (5/7). C2/L2 INFERENTIAL mit Materiallücke dokumentiert |
| G4 | Visualisierbarkeit | KANN | PASS | Zwei Ursachenstränge (militärisch + politisch) münden in P |
| G5 | Artefakt-Integration | SOLL | PASS | img-3-1, zit-3-1, pq-3-2, rolle-3-1, rolle-3-2 stützen C1/P. C2 benötigt Zusatzmaterial |
| G6 | Merksatz als Stundenfragen-Antwort | MUSS | PASS | L1–L3 beantworten "Warum Revolution?" → Militär gescheitert + Verantwortung verschoben + Volk handelt |
| G7 | Ästhetik-Potential | KANN | PASS | Zwei Kausalstränge konvergieren in P — visuell als Y-Struktur |
| G8 | Sprachregister R7 | MUSS | PASS | Einfache Sätze, max 15W pro Merksatz (längster: 12W) |
| G9 | Progression | SOLL | PASS | Baut auf M2 (Kriegsmüdigkeit/Streiks → jetzt Revolution als Konsequenz) |
| G10 | Fachbegriffe korrekt verortet | SOLL | PASS | 5 Begriffe, per Doppelpunkt eingeführt |
| G11 | Keine Überladung (max 120W) | MUSS | PASS | ~98 Wörter Hefteintrag-Text |
| G12 | Lehrplan-Referenzierbarkeit | KANN | PASS | KE-A/KE-B Nebenzuordnung (Verlauf-Ende + Kriegsfolgen) |
| G13 | Multiperspektivität-Ansatz | KANN | PASS | Militärführung vs. Matrosen vs. Volk — drei Akteursebenen |
| G14 | SCPL-Kohärenz | MUSS | PASS | S→C1→C2→P→L bildet geschlossenen kausalen Bogen: Erschöpfung → militärisches Scheitern → politischer Vertrauensbruch → Volksrevolution |

**Gesamt:** PASS

**Revisionslog:**
- v1 → v2: Reframe IA-C1 (CRITICAL). Chronologische Ereigniskette ersetzt durch kausale SCPL-Struktur. 3 Complications auf 2 reduziert (Schwarzer Tag + Meuterei verschmolzen mit Offensive bzw. P). Kernerkenntnisse von Stationen zu Einsichten umformuliert. Ordnungsmuster chronologisch → kausal. Neue Materiallücke C2/L2 (Verantwortungsverschiebung OHL) dokumentiert.
