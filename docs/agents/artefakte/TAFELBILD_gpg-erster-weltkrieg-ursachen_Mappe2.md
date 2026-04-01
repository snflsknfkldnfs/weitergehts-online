# Tafelbild: Mappe 2 — Das Attentat von Sarajevo

**Erstellt:** 2026-04-01 (Phase 0.4, AGENT_TAFELBILD)
**Eingabe:** SKRIPT Chunk 2 (§1-§5), DIDAKTIK_RAHMEN (KE-B), ARTEFAKT_INVENTAR, GUETEKRITERIEN_TAFELBILD (G1-G14), Tafelbild Mappe 1
**Encoding:** UTF-8 Umlaute (v3.2)

## Stundenfrage

Wie konnte ein einziger Mord einen Weltkrieg auslösen?

## Kernerkenntnisse

1. Das Attentat von Sarajevo war der Auslöser des Ersten Weltkriegs, nicht seine Ursache.
2. Der Blankoscheck und das Ultimatum trieben die Julikrise zur Eskalation.
3. Die Bündnispflichten machten aus einem Mord eine Kettenreaktion der Kriegserklärungen.

## Ordnungsmuster

chronologisch — Die Mappe folgt dem zeitlichen Ablauf: Balkankrise → Attentat → Julikrise → Kettenreaktion. Das chronologische Muster macht die Eskalationsgeschwindigkeit sichtbar.

## JSON-Repräsentation

```json
{
  "stundenfrage": "Wie konnte ein einziger Mord einen Weltkrieg auslösen?",
  "ordnungsmuster": "chronologisch",
  "scpl": {
    "situation": {
      "kontextsatz": "Auf dem Balkan schwelen seit Jahren Konflikte. 1908 hat Österreich-Ungarn Bosnien-Herzegowina annektiert — das Nachbarland Serbien protestiert.",
      "fachbegriffe": ["Annexion", "Balkankrise"]
    },
    "complication": [
      {
        "schritt": "Am 28. Juni 1914 erschießt Gavrilo Princip den österreichisch-ungarischen Thronfolger Franz Ferdinand in Sarajevo: Attentat.",
        "fachbegriff": "Attentat",
        "darstellung": null
      },
      {
        "schritt": "Der Mord ist der Funke — aber nicht das Pulverfass. Ohne Bündnisse, Rivalitäten und Misstrauen kein Weltkrieg: Auslöser und Ursache sind zweierlei.",
        "fachbegriff": "Auslöser vs. Ursache",
        "darstellung": null
      },
      {
        "schritt": "Deutschland sichert Österreich-Ungarn bedingungslose Unterstützung zu — der Blankoscheck. Österreich-Ungarn stellt Serbien ein Ultimatum mit unannehmbaren Forderungen.",
        "fachbegriff": "Blankoscheck",
        "darstellung": {
          "typ": "zeitleiste",
          "eintraege": [
            {"datum": "28.06.", "text": "Attentat in Sarajevo"},
            {"datum": "05.07.", "text": "Blankoscheck (DE → Ö-U)"},
            {"datum": "23.07.", "text": "Ultimatum an Serbien"},
            {"datum": "28.07.", "text": "Ö-U erklärt Serbien den Krieg"},
            {"datum": "01.08.", "text": "DE erklärt RU den Krieg"},
            {"datum": "03.08.", "text": "DE erklärt FR den Krieg"},
            {"datum": "04.08.", "text": "GB erklärt DE den Krieg"}
          ]
        }
      }
    ],
    "problem": {
      "satz": "Innerhalb von sechs Wochen stehen fast alle Großmächte im Krieg — eine Kettenreaktion der Bündnispflichten.",
      "fachbegriff": "Kettenreaktion"
    },
    "loesung": [
      "Das Attentat von Sarajevo war der Auslöser des Ersten Weltkriegs, nicht seine Ursache.",
      "Der Blankoscheck und das Ultimatum trieben die Julikrise zur Eskalation.",
      "Die Bündnispflichten machten aus einem Mord eine Kettenreaktion der Kriegserklärungen."
    ]
  },
  "transfer": {
    "frage": "Kennst du einen heutigen Konflikt, bei dem Auslöser und Ursache verwechselt werden?"
  },
  "voraussetzungen": ["k1-1 (Pulverfass Europa)", "k1-4 (Dreibund)", "k1-5 (Triple Entente)", "k1-7 (Kettenreaktion)"],
  "kernerkenntnisse": [
    "Das Attentat von Sarajevo war der Auslöser des Ersten Weltkriegs, nicht seine Ursache.",
    "Der Blankoscheck und das Ultimatum trieben die Julikrise zur Eskalation.",
    "Die Bündnispflichten machten aus einem Mord eine Kettenreaktion der Kriegserklärungen."
  ],
  "knoten": [],
  "verbindungen": []
}
```

## Erarbeitbarkeits-Vorabprüfung

| SCPL-Schritt | Status | Skript-Referenz | Aktion |
|---|---|---|---|
| S: Balkankrise, Annexion | DIRECT | Chunk 2, §1 | — |
| C1: Attentat Sarajevo | DIRECT + ARTIFACT | Chunk 2, §2 + img-2-1, img-2-2 | — |
| C2: Auslöser vs. Ursache | DIRECT | Chunk 2, §3 | — |
| C3: Blankoscheck, Ultimatum, Zeitleiste | DIRECT + ARTIFACT | Chunk 2, §4-§5 + zit-2-2 | — |
| P: Kettenreaktion | DIRECT | Chunk 2, §4-§5 | — |

Alle SCPL-Schritte DIRECT oder DIRECT+ARTIFACT. Kein Status UNKLAR.

## Q-Gate-Protokoll

### Q-Gate: Tafelbild Mappe 2

| # | Kriterium | Prio | Ergebnis | Detail |
|---|---|---|---|---|
| G1 | Lernziel-Kongruenz | MUSS | PASS | KE-B (Attentat, Ursache vs. Auslöser) → C1+C2+P. Diskussion aktuelles Beispiel → transfer.frage |
| G2 | Reduktion (max. 4 C-Schritte, max. 3 Merksätze) | MUSS | PASS | 3 C-Schritte, 3 Merksätze |
| G3 | Erarbeitbarkeit | MUSS | PASS | Alle 5 SCPL-Schritte DIRECT oder DIRECT+ARTIFACT (siehe Tabelle) |
| G4 | Strukturklarheit | MUSS | PASS | Ordnungsmuster: chronologisch, konsistent (28.06. → 05.07. → ... → 04.08.) |
| G5 | Sprachliches Niveau | MUSS | PASS | Längster Merksatz: 14 Wörter. Alle Fachbegriffe in SKRIPT eingeführt |
| G6 | Hefteintrag-Transfer | MUSS | PASS | ~105 Wörter (S+C+P+L), geschätzt 4-5 min Übertragung |
| G7 | Merksatz-Abschluss | SOLL | PASS | 3 Merksätze als ganze Aussagesätze |
| G8 | Anschaulichkeit | SOLL | PASS | Zeitleiste-Darstellung in C3 (chronologische Eskalation) |
| G9 | Progression | SOLL | PASS | Voraussetzungen: k1-1, k1-4, k1-5, k1-7 aus Mappe 1. Kein Knoten aus Mappe 1 wiederholt |
| G10 | Rekapitulierbarkeit | SOLL | PASS | SCPL-Bogen erkennbar: Balkankrise → Attentat → Eskalation → Kettenreaktion → Merksatz |
| G11 | Vermutungs-Sektion | KANN | N/A | Nicht vorhanden (nicht nötig — Stundenfrage impliziert Vermutung) |
| G12 | Sprachregister-Passung | KANN | PASS | Politisch-diplomatisch → fachbegrifflich-analytisch (Blankoscheck, Ultimatum, Kettenreaktion) |
| G13 | Stundenfrage als Titel | KANN | PASS | "Wie konnte ein einziger Mord einen Weltkrieg auslösen?" (10 Wörter, Frage) |
| G14 | SCPL-Kohärenz | KANN | PASS | S(Balkankrise) → C1(Attentat) → C2(Auslöser≠Ursache) → C3(Eskalation) → P(Kettenreaktion) → L(Synthese). Jede Zone baut auf vorheriger auf. Merkbox beantwortet Stundenfrage direkt. |
**Gesamt:** PASS
