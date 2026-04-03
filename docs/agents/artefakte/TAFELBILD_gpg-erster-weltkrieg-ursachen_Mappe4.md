# Tafelbild: Mappe 4 — Der Schlieffen-Plan

**Erstellt:** 2026-04-03 (Phase 0.4, PM-Session 9 — C2-Vorbereitung)
**Eingabe:** SKRIPT Chunk 4 (§1-§6), DIDAKTIK_RAHMEN (KE-C), GUETEKRITERIEN_HEFTEINTRAG_ENTWURF (G1-G14), Tafelbild Mappe 3
**Encoding:** UTF-8 Umlaute (v3.2)

## Stundenfrage

Warum scheiterte der Plan für einen schnellen Sieg?

## Kernerkenntnisse

1. Der Schlieffen-Plan sollte den Zweifrontenkrieg lösen, indem Frankreich in 40 Tagen besiegt wird — bevor Russland bereit ist.
2. Die Schlacht an der Marne stoppte den deutschen Vormarsch — der Plan war gescheitert.
3. Statt eines schnellen Sieges begann der Stellungskrieg: vier Jahre Schützengräben von der Nordsee bis zur Schweiz.

## Ordnungsmuster

sequenziell — Chunk 4 erzählt eine chronologische Kette: strategisches Problem → Plan → Umsetzung → Scheitern → Konsequenz. Das sequenzielle Muster macht die Kausalität sichtbar: jeder Schritt folgt zwingend aus dem vorherigen.

## JSON-Repräsentation

```json
{
  "stundenfrage": "Warum scheiterte der Plan für einen schnellen Sieg?",
  "ordnungsmuster": "sequenziell",
  "scpl": {
    "situation": {
      "kontextsatz": "August 1914: Deutschland steht im Krieg gegen Frankreich und Russland gleichzeitig.",
      "fachbegriffe": ["Zweifrontenkrieg"]
    },
    "complication": [
      {
        "schritt": "General Schlieffen entwickelt einen Plan: Zuerst Frankreich in 40 Tagen besiegen, dann Russland angreifen — der Schlieffen-Plan.",
        "fachbegriff": "Schlieffen-Plan",
        "darstellung": null
      },
      {
        "schritt": "August 1914: Deutsche Truppen marschieren durch Belgien und kommen bis 40 Kilometer vor Paris.",
        "fachbegriff": null,
        "darstellung": null
      },
      {
        "schritt": "September 1914: An der Marne stoppen französische und britische Truppen den Vormarsch — die Deutschen müssen 65 Kilometer zurückweichen.",
        "fachbegriff": "Schlacht an der Marne",
        "darstellung": null
      }
    ],
    "problem": {
      "satz": "Der Schlieffen-Plan ist gescheitert. Statt eines schnellen Sieges graben sich beide Seiten in Schützengräben ein — der Stellungskrieg beginnt.",
      "fachbegriff": "Stellungskrieg"
    },
    "loesung": [
      "Der Schlieffen-Plan sollte den Zweifrontenkrieg lösen, indem Frankreich in 40 Tagen besiegt wird — bevor Russland bereit ist.",
      "Die Schlacht an der Marne stoppte den deutschen Vormarsch — der Plan war gescheitert.",
      "Statt eines schnellen Sieges begann der Stellungskrieg: vier Jahre Schützengräben von der Nordsee bis zur Schweiz."
    ]
  },
  "transfer": {
    "frage": "Warum gehen Pläne manchmal schief, obwohl sie auf dem Papier logisch klingen?"
  },
  "voraussetzungen": ["k3-1 (Kriegsbegeisterung — Glaube an schnellen Sieg)"],
  "knoten": [],
  "verbindungen": []
}
```

## Erarbeitbarkeits-Vorabprüfung

| SCPL-Schritt | Status | Skript-Referenz | Aktion |
|---|---|---|---|
| S: Zweifrontenkrieg als Problem | DIRECT | Chunk 4, §1 | — |
| C1: Schlieffen-Plan (Idee + Zeitlücke) | DIRECT + ARTIFACT | Chunk 4, §2-§3 + zit-4-1, img-4-1 | — |
| C2: Vormarsch durch Belgien | DIRECT + ARTIFACT | Chunk 4, §4 + img-4-4, rolle-4-1 | — |
| C3: Schlacht an der Marne | DIRECT + ARTIFACT | Chunk 4, §5 + img-4-2, rolle-4-2 | — |
| P: Scheitern → Stellungskrieg | DIRECT + ARTIFACT | Chunk 4, §6 + zit-4-2, img-4-3 | — |

Alle SCPL-Schritte DIRECT oder DIRECT+ARTIFACT. Kein Status UNKLAR.

## Q-Gate-Protokoll

### Q-Gate: Tafelbild Mappe 4

| # | Kriterium | Prio | Ergebnis | Detail |
|---|---|---|---|---|
| G1 | Lernziel-Kongruenz | MUSS | PASS | KE-C (Verlauf für Menschen, Stellungskrieg) → C2+C3+P. Schlieffen-Plan als strategischer Rahmen → C1. |
| G2 | Reduktion (max. 4 C-Schritte, max. 3 Merksätze) | MUSS | PASS | 3 C-Schritte, 3 Merksätze |
| G3 | Erarbeitbarkeit | MUSS | PASS | Alle 5 SCPL-Schritte DIRECT oder DIRECT+ARTIFACT (siehe Tabelle) |
| G4 | Strukturklarheit | MUSS | PASS | Ordnungsmuster: sequenziell (Plan → Umsetzung → Scheitern → Konsequenz), konsistent durchgehalten |
| G5 | Sprachliches Niveau | MUSS | PASS | Längster Merksatz: 18 Wörter ("Statt eines schnellen Sieges begann der Stellungskrieg: vier Jahre Schützengräben von der Nordsee bis zur Schweiz."). Alle Fachbegriffe in SKRIPT eingeführt. |
| G6 | Hefteintrag-Transfer | MUSS | PASS | ~100 Wörter (S+C+P+L), geschätzt 4 min Übertragung |
| G7 | Merksatz-Abschluss | SOLL | PASS | 3 Merksätze als ganze Aussagesätze |
| G8 | Anschaulichkeit | SOLL | PASS | Konkrete Zahlen (40 Tage, 40 km vor Paris, 65 km Rückzug, 4 Jahre) in C+P |
| G9 | Progression | SOLL | PASS | Voraussetzung: k3-1 aus Mappe 3 (Glaube an schnellen Sieg). Perspektivwechsel: Gesellschaft → Militärstrategie |
| G10 | Rekapitulierbarkeit | SOLL | PASS | SCPL-Bogen erkennbar: Zweifrontenkrieg → Schlieffen-Plan → Vormarsch → Marne → Stellungskrieg → Merksatz |
| G11 | Vermutungs-Sektion | KANN | N/A | Nicht vorhanden (Stundenfrage impliziert Ursachensuche — wird im Unterricht mündlich erarbeitet) |
| G12 | Sprachregister-Passung | KANN | PASS | Militärisch-strategisch → konkret-anschaulich (Taxis, 40 km vor Paris) |
| G13 | Stundenfrage als Titel | KANN | PASS | "Warum scheiterte der Plan für einen schnellen Sieg?" (9 Wörter, Frage) |
| G14 | SCPL-Kohärenz | KANN | PASS | S(Zweifrontenkrieg) → C1(Plan) → C2(Umsetzung) → C3(Scheitern) → P(Stellungskrieg) → L(Synthese). Chronologische Sequenz. Merkbox beantwortet Stundenfrage kausal. |
**Gesamt:** PASS
