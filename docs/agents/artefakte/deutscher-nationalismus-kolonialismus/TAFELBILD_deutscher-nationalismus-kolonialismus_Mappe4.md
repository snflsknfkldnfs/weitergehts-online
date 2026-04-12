# Hefteintrag: Mappe 4 — Die andere Seite — Leben in den Kolonien

**Game-ID:** `deutscher-nationalismus-kolonialismus`
**Mappe:** 4 / 4
**Erstellt:** 2026-04-12 (Phase 0.4, AGENT_HEFTEINTRAG)
**Validierungsstatus:** ENTWURF
**Basis:** SKRIPT Chunk 4 + DIDAKTIK_RAHMEN (TZ4, KE LB2_K_05)

---

## Stundenfrage

Was bedeutete die deutsche Kolonialherrschaft für die Herero und Nama?

## Kernerkenntnisse

1. Die deutsche Kolonialherrschaft raubte den Herero und Nama Land, Freiheit und Leben.
2. Der Völkermord an den Herero und Nama wurde erst 2021 von Deutschland anerkannt.

## Ordnungsmuster

sequenziell — Die Mappe folgt dem zeitlichen Ablauf von der vorkolonialen Gesellschaft über Landraub und Aufstand bis zum Völkermord und seiner späten Anerkennung.

## JSON-Repräsentation

```json
{
  "stundenfrage": "Was bedeutete die deutsche Kolonialherrschaft für die Herero und Nama?",
  "ordnungsmuster": "sequenziell",
  "scpl": {
    "situation": {
      "kontextsatz": "Die Herero und Nama lebten im heutigen Namibia als eigenständige Völker mit eigenen Anführern und eigener Kultur.",
      "fachbegriffe": []
    },
    "complication": [
      {
        "schritt": "Deutsche Siedler eigneten sich das Land der Herero an — Weideflächen und Lebensgrundlage gingen verloren: Landraub.",
        "typ": "kausal",
        "fachbegriff": "Landraub",
        "darstellung": null,
        "erarbeitbarkeit": "DIRECT"
      },
      {
        "schritt": "Im Januar 1904 führte Samuel Maharero sein Volk in den Aufstand — ein Akt der Verzweiflung gegen die Kolonialherrschaft: Herero-Aufstand.",
        "typ": "narrativ",
        "fachbegriff": "Herero-Aufstand",
        "darstellung": null,
        "erarbeitbarkeit": "DIRECT"
      },
      {
        "schritt": "General von Trotha ließ die Wasserstellen abriegeln — Tausende Herero verdursteten in der Omaheke-Wüste: Vernichtungsbefehl.",
        "typ": "kausal",
        "fachbegriff": "Vernichtungsbefehl",
        "darstellung": null,
        "erarbeitbarkeit": "DIRECT"
      }
    ],
    "problem": {
      "satz": "Die deutsche Kolonialmacht vernichtete die Herero und Nama gezielt und systematisch — der erste Völkermord des 20. Jahrhunderts.",
      "fachbegriff": "Völkermord"
    },
    "loesung": [
      "Die deutsche Kolonialherrschaft raubte den Herero und Nama Land, Freiheit und Leben.",
      "Der Völkermord an den Herero und Nama wurde erst 2021 von Deutschland anerkannt."
    ]
  },
  "transfer": {
    "frage": "Was schulden wir den Nachfahren der Opfer des Kolonialismus?"
  },
  "voraussetzungen": ["k3-6"],
  "knoten": [
    {"id": "k4-1", "text": "Herero und Nama", "typ": "kategorie", "merksatz": "Eigenständige Völker im heutigen Namibia"},
    {"id": "k4-2", "text": "Landraub", "typ": "kernbegriff", "merksatz": "Deutsche Siedler nahmen den Herero ihr Weideland"},
    {"id": "k4-3", "text": "Zwangsarbeit und rassistische Gesetze", "typ": "wirkung"},
    {"id": "k4-4", "text": "Herero-Aufstand 1904", "typ": "ereignis"},
    {"id": "k4-5", "text": "Vernichtungsbefehl", "typ": "kernbegriff", "merksatz": "Trotha befahl die Tötung aller Herero"},
    {"id": "k4-6", "text": "Völkermord", "typ": "kernbegriff", "merksatz": "Gezielte, systematische Zerstörung einer ethnischen Gruppe"},
    {"id": "k4-7", "text": "Anerkennung 2021", "typ": "ereignis"}
  ],
  "verbindungen": [
    {"von": "k4-1", "nach": "k4-2", "label": "erleiden", "typ": "kausal"},
    {"von": "k4-2", "nach": "k4-3", "label": "dazu kommt", "typ": "temporal"},
    {"von": "k4-3", "nach": "k4-4", "label": "führt zu", "typ": "kausal"},
    {"von": "k4-4", "nach": "k4-5", "label": "Reaktion", "typ": "kausal"},
    {"von": "k4-5", "nach": "k4-6", "label": "bedeutet", "typ": "schlussfolgerung"},
    {"von": "k4-6", "nach": "k4-7", "label": "erst 2021", "typ": "temporal"}
  ]
}
```

## Erarbeitbarkeits-Nachweis

| SCPL-Schritt | Status | Skript-Referenz | TB-Knoten | scpl_phase | Aktion |
|---|---|---|---|---|---|
| S: Herero und Nama als eigenständige Völker | DIRECT | C4 §1 | k4-1 | S | — |
| C1: Landraub, Verlust der Lebensgrundlage | DIRECT | C4 §2 | k4-2, k4-3 | C | — |
| C2: Samuel Maharero, Aufstand 1904 | DIRECT | C4 §3 | k4-4 | C | — |
| C3: Trotha, Wasserstellen, Vernichtungsbefehl | DIRECT | C4 §4-§5 | k4-5 | C | — |
| P: Völkermord an Herero und Nama | DIRECT | C4 §5 | k4-6 | P | — |

**Erarbeitbarkeits-Quote:** 5/5 DIRECT = 100% ≥ 70% ✓

## Fachbegriffe

| Begriff | Erklärung | SCPL-Zone | SKRIPT-Ref |
|---|---|---|---|
| Landraub | Systematische Aneignung des Landes durch Siedler und Kolonialverwaltung | C1 | C4 §2 |
| Herero-Aufstand | Widerstand der Herero gegen die deutsche Kolonialmacht 1904 | C2 | C4 §3 |
| Vernichtungsbefehl | Trothas Befehl, alle Herero zu töten | C3 | C4 §5 |
| Völkermord | Vorsätzliche, systematische Zerstörung einer ethnischen Gruppe | P | C4 §5 |

## Q-Gate-Protokoll

| # | Kriterium | Prio | Ergebnis | Detail |
|---|---|---|---|---|
| G1 | Lernziel-Kongruenz | MUSS | PASS | TZ4 → KE1 (Landraub, Freiheit, Leben) + KE2 (Anerkennung 2021). LB2_K_05 (Kolonialisierung am Beispiel Afrikas) abgedeckt. Perspektive der Kolonisierten eingenommen. |
| G2 | Reduktion (max. 4 C, max. 3 Merksätze) | MUSS | PASS | 3 C-Schritte, 2 Merksätze. |
| G3 | Erarbeitbarkeit | MUSS | PASS | 5/5 DIRECT (100%). |
| G4 | Strukturklarheit | MUSS | PASS | Ordnungsmuster: sequenziell (vorkolonial → Landraub → Aufstand → Völkermord → Erinnerung), konsistent. |
| G5 | Sprachliches Niveau | MUSS | PASS | Längster Merksatz: 14W. Alle ≤15W. |
| G6 | Hefteintrag-Transfer | MUSS | PASS | ~106W, ca. 5-6 min Übertragung. |
| G7 | Merksatz-Abschluss | SOLL | PASS | 2 Merksätze als ganze Aussagesätze. |
| G8 | Anschaulichkeit | SOLL | PASS | Konkrete Beispiele: Samuel Maharero, Trotha, Omaheke-Wüste, Anerkennung 2021. |
| G9 | Progression | SOLL | PASS | Voraussetzung: k3-6 (Kolonialisierung Afrikas) aus Mappe 3. Mappe 4 konkretisiert an Deutsch-Südwestafrika. Komplexitätssteigerung: AFB II-III (Perspektivwechsel, Urteilsbildung). |
| G10 | Rekapitulierbarkeit | SOLL | PASS | SCPL-Bogen: S (eigenständige Völker) → C (Landraub, Aufstand, Vernichtung) → P (Völkermord) → L (Erkenntnis + Erinnerung). |
| G11 | Vermutungs-Sektion | KANN | N/A | Nicht vorgesehen in Phase 0.4. |
| G12 | Sprachregister-Passung | KANN | PASS | R7-Mittelschule. Sachliche Darstellung ohne Reißerei (Überwältigungsverbot). |
| G13 | Stundenfrage als Titel | KANN | PASS | 10W ≤ 12W. |
| G14 | SCPL-Kohärenz | KANN | PASS | Jede Zone baut auf vorheriger auf. Geschlossener Bogen bis zur Gegenwart (2021). |

**Gesamt: PASS** — Alle BLOCKER bestanden, keine HIGH-Verletzung.

**Ethik-Hinweis:** Mappe 4 behandelt den Völkermord an den Herero und Nama sachlich und faktenbasiert. Die Darstellung folgt dem Überwältigungsverbot (keine Schockbilder, keine reißerische Sprache). Die Herero und Nama werden als eigenständige Gesellschaft mit eigener Kultur gezeigt (S-Zone), nicht als passive Opfer. Der Aufstand wird als berechtigter Widerstand eingeordnet (C2). Die Transferfrage öffnet die Diskussion über historische Verantwortung, ohne eine bestimmte Meinung vorzugeben.
