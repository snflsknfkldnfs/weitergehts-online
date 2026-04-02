# Tafelbild: Mappe 3 — Kriegsbegeisterung 1914

**Erstellt:** 2026-04-02 (Phase 0.4, AGENT_HEFTEINTRAG)
**Eingabe:** SKRIPT Chunk 3 (§1-§5), DIDAKTIK_RAHMEN (KE-C, KE-D), INHALTSBASIS Mappe 3, GUETEKRITERIEN_HEFTEINTRAG_ENTWURF (G1-G14), Tafelbild Mappe 2
**Encoding:** UTF-8 Umlaute (v3.2)

## Stundenfrage

Waren die Menschen 1914 wirklich begeistert vom Krieg?

## Kernerkenntnisse

1. Die Kriegsbegeisterung 1914 betraf vor allem die staedtische Mittel- und Oberschicht — Arbeiter und Landbevoelkerung waren ueberwiegend skeptisch.
2. Patriotismus, Propaganda, Abenteuerlust und gesellschaftlicher Druck trieben die Begeisterung an.
3. Der Burgfrieden vereinte sogar Kriegsgegner hinter der Regierung — doch die Einheit war truegerisch.

## Ordnungsmuster

multiperspektivisch — Die Mappe stellt Begeisterung und Gegenstimmen als zwei Perspektiven auf dasselbe Ereignis gegenueber. Das multiperspektivische Muster macht sichtbar, dass die Kriegsbegeisterung kein einheitliches Phaenomen war.

## JSON-Repraesentation

```json
{
  "stundenfrage": "Waren die Menschen 1914 wirklich begeistert vom Krieg?",
  "ordnungsmuster": "multiperspektivisch",
  "scpl": {
    "situation": {
      "kontextsatz": "Die Buendnisse haben aus einem Mord einen Weltkrieg gemacht. Millionen Soldaten werden mobilisiert — doch wie reagieren die Menschen?",
      "fachbegriffe": ["Mobilmachung"]
    },
    "complication": [
      {
        "schritt": "In den Grossstaedten herrscht Aufregung. Soldaten schreiben 'Ausflug nach Paris' auf ihre Zuege. Historiker nennen dieses Gefuehl das Augusterlebnis — die Kriegsbegeisterung.",
        "fachbegriff": "Kriegsbegeisterung (Augusterlebnis)",
        "darstellung": null
      },
      {
        "schritt": "Vier Gruende treiben die Begeisterung: Patriotismus, Abenteuerlust, gesellschaftlicher Druck und Propaganda. Die Regierung stellt den Krieg als reine Verteidigung dar.",
        "fachbegriff": "Propaganda",
        "darstellung": null
      },
      {
        "schritt": "Doch die Begeisterung ist nicht allgemein. 288 Anti-Kriegs-Versammlungen, 100.000 Demonstranten in Berlin. Auf dem Land herrscht Angst statt Freude.",
        "fachbegriff": "Gegenstimmen",
        "darstellung": null
      }
    ],
    "problem": {
      "satz": "Die SPD stimmt fuer die Kriegskredite — Burgfrieden. Die truegerische Einheit verdeckt die tiefen Risse in der Gesellschaft.",
      "fachbegriff": "Burgfrieden"
    },
    "loesung": [
      "Die Kriegsbegeisterung 1914 betraf vor allem die staedtische Mittel- und Oberschicht — Arbeiter und Landbevoelkerung waren ueberwiegend skeptisch.",
      "Patriotismus, Propaganda, Abenteuerlust und gesellschaftlicher Druck trieben die Begeisterung an.",
      "Der Burgfrieden vereinte sogar Kriegsgegner hinter der Regierung — doch die Einheit war truegerisch."
    ]
  },
  "transfer": {
    "frage": "Gibt es heute Situationen, in denen gesellschaftlicher Druck Menschen dazu bringt, eine Meinung oeffentlich zu vertreten, die sie privat nicht teilen?"
  },
  "voraussetzungen": ["k2-5 (Kettenreaktion der Kriegserklaerungen)"],
  "knoten": [],
  "verbindungen": []
}
```

## Erarbeitbarkeits-Vorabpruefung

| SCPL-Schritt | Status | Skript-Referenz | Aktion |
|---|---|---|---|
| S: Mobilmachung, Reaktion der Menschen | DIRECT | Chunk 3, §1 (Aufgriff Chunk 2) | — |
| C1: Augusterlebnis, Kriegsbegeisterung | DIRECT + ARTIFACT | Chunk 3, §1 + img-3-1, img-3-2, rolle-3-1 | — |
| C2: Vier Gruende (Patriotismus, Propaganda, Druck, Abenteuer) | DIRECT | Chunk 3, §2 | — |
| C3: Gegenstimmen (Demos, Arbeiter, Bauern) | DIRECT + ARTIFACT | Chunk 3, §3-§4 + zit-3-2, rolle-3-2 | — |
| P: Burgfrieden, truegerische Einheit | DIRECT + ARTIFACT | Chunk 3, §5 + zit-3-1, zit-3-3 | — |

Alle SCPL-Schritte DIRECT oder DIRECT+ARTIFACT. Kein Status UNKLAR.

## Q-Gate-Protokoll

### Q-Gate: Tafelbild Mappe 3

| # | Kriterium | Prio | Ergebnis | Detail |
|---|---|---|---|---|
| G1 | Lernziel-Kongruenz | MUSS | PASS | KE-C (Verlauf fuer Menschen) → C3+P. KE-D (Ursachen erlaeutern) → C2. Transfer: gesellschaftlicher Druck heute |
| G2 | Reduktion (max. 4 C-Schritte, max. 3 Merksaetze) | MUSS | PASS | 3 C-Schritte, 3 Merksaetze |
| G3 | Erarbeitbarkeit | MUSS | PASS | Alle 5 SCPL-Schritte DIRECT oder DIRECT+ARTIFACT (siehe Tabelle) |
| G4 | Strukturklarheit | MUSS | PASS | Ordnungsmuster: multiperspektivisch (Begeisterung vs. Gegenstimmen), konsistent durchgehalten |
| G5 | Sprachliches Niveau | MUSS | PASS | Laengster Merksatz: 17 Woerter. Alle Fachbegriffe in SKRIPT eingefuehrt |
| G6 | Hefteintrag-Transfer | MUSS | PASS | ~120 Woerter (S+C+P+L), geschaetzt 5 min Uebertragung |
| G7 | Merksatz-Abschluss | SOLL | PASS | 3 Merksaetze als ganze Aussagesaetze |
| G8 | Anschaulichkeit | SOLL | PASS | Konkrete Zahlen (288 Versammlungen, 100.000 Demonstranten) in C3 |
| G9 | Progression | SOLL | PASS | Voraussetzung: k2-5 aus Mappe 2. Perspektivwechsel Politik → Gesellschaft |
| G10 | Rekapitulierbarkeit | SOLL | PASS | SCPL-Bogen erkennbar: Mobilmachung → Begeisterung → Gruende → Gegenstimmen → Burgfrieden → Merksatz |
| G11 | Vermutungs-Sektion | KANN | N/A | Nicht vorhanden (Stundenfrage impliziert Ja/Nein-Vermutung — wird im Unterricht muendlich abgefragt) |
| G12 | Sprachregister-Passung | KANN | PASS | Gesellschaftlich-emotional → analytisch (Propaganda, Burgfrieden) |
| G13 | Stundenfrage als Titel | KANN | PASS | "Waren die Menschen 1914 wirklich begeistert vom Krieg?" (9 Woerter, Frage) |
| G14 | SCPL-Kohaerenz | KANN | PASS | S(Mobilmachung) → C1(Begeisterung) → C2(Gruende) → C3(Gegenstimmen) → P(Burgfrieden) → L(Synthese). Perspektivwechsel pro/contra ist Kernstruktur. Merkbox beantwortet Stundenfrage differenziert. |
**Gesamt:** PASS
