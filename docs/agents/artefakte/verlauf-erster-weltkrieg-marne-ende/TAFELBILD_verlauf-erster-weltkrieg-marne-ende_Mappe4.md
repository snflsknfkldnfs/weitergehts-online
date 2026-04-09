# Hefteintrag: Mappe 4 — Der Diktatfrieden

**Game-ID:** verlauf-erster-weltkrieg-marne-ende  
**Mappe:** 4 / 4  
**Erstellt:** 2026-04-09 (Phase 0.4, AGENT_HEFTEINTRAG)  
**Validierungsstatus:** ENTWURF (User-Validierung ausstehend)

---

## Stundenfrage

Warum wurde der Friedensvertrag zum Diktat?

## Kernerkenntnisse

1. Der Versailler Vertrag legte Deutschland harte Bedingungen auf — Gebietsverluste, Reparationen und Armeebegrenzung.
2. Artikel 231 gab Deutschland die alleinige Kriegsschuld — das empfanden die Deutschen als Demütigung.
3. Die Wut über den Vertrag und die Dolchstoßlegende vergifteten die junge Demokratie.

## Ordnungsmuster

kategorial — Die Bestimmungen des Versailler Vertrags werden nach Kategorien geordnet: militärisch, territorial, wirtschaftlich, Kriegsschuld — und ihre gemeinsame Wirkung (Wut) zusammengeführt.

## JSON-Repräsentation

```json
{
  "stundenfrage": "Warum wurde der Friedensvertrag zum Diktat?",
  "scpl": {
    "situation": {
      "kontextsatz": "Im Januar 1919 verhandeln die Siegermächte in Versailles über den Frieden — Deutschland sitzt nicht am Tisch: Diktatfrieden.",
      "fachbegriffe": ["Versailler Vertrag", "Diktatfrieden"]
    },
    "complication": [
      {
        "schritt": "Deutschland muss seine Armee auf 100.000 Mann begrenzen — keine Luftwaffe, keine U-Boote, keine Panzer: Abrüstung.",
        "fachbegriff": "Abrüstung",
        "typ": "kategorial",
        "erarbeitbarkeit": "DIRECT",
        "darstellung": null
      },
      {
        "schritt": "Deutschland verliert 13% seines Gebiets — Elsass-Lothringen an Frankreich, Posen und Westpreußen an Polen: Gebietsverluste.",
        "fachbegriff": "Gebietsverluste",
        "typ": "kategorial",
        "erarbeitbarkeit": "DIRECT",
        "darstellung": null
      },
      {
        "schritt": "Deutschland muss 132 Milliarden Goldmark Entschädigung zahlen — eine Summe für Jahrzehnte: Reparationen.",
        "fachbegriff": "Reparationen",
        "typ": "kausal",
        "erarbeitbarkeit": "DIRECT",
        "darstellung": null
      }
    ],
    "problem": {
      "satz": "Artikel 231 gibt Deutschland die alleinige Schuld am Krieg — die Deutschen empfinden das als Lüge und Demütigung: Kriegsschuldparagraph.",
      "fachbegriff": "Kriegsschuldparagraph"
    },
    "loesung": [
      {
        "kernerkenntnis": "Der Versailler Vertrag legte Deutschland harte Bedingungen auf — Gebietsverluste, Reparationen und Armeebegrenzung.",
        "erarbeitbarkeit": "DIRECT"
      },
      {
        "kernerkenntnis": "Artikel 231 gab Deutschland die alleinige Kriegsschuld — das empfanden die Deutschen als Demütigung.",
        "erarbeitbarkeit": "DIRECT"
      },
      {
        "kernerkenntnis": "Die Wut über den Vertrag und die Dolchstoßlegende vergifteten die junge Demokratie.",
        "erarbeitbarkeit": "DIRECT"
      }
    ]
  },
  "ordnungsmuster": "kategorial",
  "fachbegriffe": ["Versailler Vertrag", "Diktatfrieden", "Abrüstung", "Gebietsverluste", "Reparationen", "Kriegsschuldparagraph", "Dolchstoßlegende"],
  "knoten": [],
  "verbindungen": [],
  "transfer": {
    "frage": "Kann ein Friedensvertrag neuen Krieg verursachen?"
  },
  "voraussetzungen": {
    "vorgaenger_mappe": "Mappe 3: Waffenstillstand, Hoffnung auf gerechten Frieden (Wilsons 14 Punkte)"
  }
}
```

## Erarbeitbarkeits-Nachweis

| SCPL-Schritt | Status | Skript-Referenz | scpl_phase | Aktion |
|---|---|---|---|---|
| S: Versailles — Deutschland nicht am Tisch | DIRECT | Chunk 4, §1 | S | — |
| C1: Militärische Bestimmungen (Abrüstung) | DIRECT | Chunk 4, §2 | C | — |
| C2: Territoriale Verluste (13%) | DIRECT | Chunk 4, §2 | C | — |
| C3: Reparationen (132 Mrd. Goldmark) | DIRECT | Chunk 4, §3 | C | — |
| P: Artikel 231 Kriegsschuldparagraph | DIRECT | Chunk 4, §4, §5 | P | — |
| L1: Harte Bedingungen | DIRECT | Chunk 4, §2, §3 (Synthese) | L | — |
| L2: Alleinige Kriegsschuld als Demütigung | DIRECT | Chunk 4, §4 | L | — |
| L3: Wut + Dolchstoßlegende → Demokratie-Skepsis | DIRECT | Chunk 4, §6 | L | — |

**DIRECT + ARTIFACT Quote:** 100% (8/8 DIRECT). Schwelle 70% erreicht.

## Transfer-Frage

Kann ein Friedensvertrag neuen Krieg verursachen?

## Fachbegriffe

| Fachbegriff | Erklärung | SCPL-Zone | Skript-Referenz |
|---|---|---|---|
| Versailler Vertrag | Friedensvertrag von 1919, der den Ersten Weltkrieg beendete | S | Chunk 4, §1–§5 |
| Diktatfrieden | Frieden, der dem Verlierer ohne Verhandlung aufgezwungen wird | S | Chunk 4, §1 |
| Abrüstung | Begrenzung der deutschen Armee auf 100.000 Mann, Verbot schwerer Waffen | C1 | Chunk 4, §2 |
| Gebietsverluste | Abtretung von 13% des deutschen Territoriums an Nachbarstaaten | C2 | Chunk 4, §2 |
| Reparationen | Entschädigungszahlungen in Höhe von 132 Milliarden Goldmark | C3 | Chunk 4, §3 |
| Kriegsschuldparagraph | Artikel 231 — Deutschland trägt die alleinige Schuld am Krieg | P | Chunk 4, §4 |
| Dolchstoßlegende | Falsche Behauptung, die Revolution habe der Armee den Sieg gestohlen | L3 | Chunk 4, §6 |

## Q-Gate-Protokoll

| # | Kriterium | Prio | Ergebnis | Detail |
|---|---|---|---|---|
| G1 | Reduktion (≤10 Elemente) | MUSS | PASS | 8 Elemente (1S + 3C + 1P + 3L) |
| G2 | Strukturiertheit | SOLL | PASS | Klare SCPL-Abfolge, kategorial konsistent |
| G3 | Erarbeitbarkeit | MUSS | PASS | 100% DIRECT (8/8) |
| G4 | Visualisierbarkeit | KANN | PASS | Drei Kategorien als Spalten, münden in P → L |
| G5 | Artefakt-Integration | SOLL | PASS | img-4-1, img-4-2, pq-4-1, zit-4-1, zit-4-2, rolle-4-1, rolle-4-2 stützen C1–P |
| G6 | Merksatz als Stundenfragen-Antwort | MUSS | PASS | L1–L3 beantworten "Warum Diktat?" → Harte Bedingungen + Alleinschuld + Wut |
| G7 | Ästhetik-Potential | KANN | PASS | Kategoriale Darstellung mit Zusammenführung |
| G8 | Sprachregister R7 | MUSS | PASS | Einfache Sätze, max 15W pro Merksatz |
| G9 | Progression | SOLL | PASS | Baut auf M3 (Waffenstillstand/Hoffnung → Enttäuschung Versailles) |
| G10 | Fachbegriffe korrekt verortet | SOLL | PASS | 7 Begriffe, je 1–2 pro Zone, per Doppelpunkt eingeführt |
| G11 | Keine Überladung (max 120W) | MUSS | PASS | ~109 Wörter Hefteintrag-Text |
| G12 | Lehrplan-Referenzierbarkeit | KANN | PASS | KE-C (K_04) Haupt, KE-D (K_03) Neben |
| G13 | Multiperspektivität-Ansatz | KANN | PASS | Siegermächte + deutsche Bevölkerung (Arbeiter, Industrieller, Lehrer) |
| G14 | SCPL-Kohärenz | MUSS | PASS | S→C1→C2→C3→P→L bildet geschlossenen Bogen |

**Gesamt:** PASS
