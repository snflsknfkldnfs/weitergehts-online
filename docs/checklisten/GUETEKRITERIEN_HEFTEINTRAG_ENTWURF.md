# Guetekriterien Hefteintrag — Entwurfsqualitaet (G1-G14)

**Datum:** 2026-03-26
**Status:** v1 — empirisch fundiert, bereit fuer AGENT_HEFTEINTRAG
**Quellen:**
- DG B2 Tafelbild.pdf (Bauer/Hartmann, Bausteinskript Fachdidaktik)
- 8 Excalidraw-Tafelbilder aus Silas' 1.WK-Sequenz (GPG7, 9 UEs)
- 8 Verlaufsplaene derselben Sequenz (Erarbeitungswege)

---

## 1. Leitsatz

> "Was nicht auf die Tafel passt, passt auch nicht in den Kopf."
> — DG B2, Grundsatz 1

> "Das Tafelbild und der daraus entstehende Hefteintrag sind die bleibende Lernessenz einer Unterrichtseinheit."
> — DG B2, Potthoff et al.

Das Tafelbild ist kein Zusammenfassungstext. Es ist eine **strukturierte Visualisierung der Kernerkenntnisse**, die Schueler:innen durch Materialarbeit selbst erschlossen haben. Der daraus abgeleitete Hefteintrag ist das bleibende Artefakt, an dem beim Lernen der Lernweg mental rekapituliert wird.

---

## 2. Synthese-Extraktion: Warum das Tafelbild NACH dem Skript steht

Im realen Unterricht entsteht das Tafelbild AM ENDE der Stunde: Schueler:innen erarbeiten Inhalte → Lehrkraft strukturiert Erkenntnisse an der Tafel → Schueler:innen uebertragen ins Heft.

Im **Designprozess** folgt AGENT_HEFTEINTRAG dem gleichen Prinzip — es arbeitet auf dem bereits didaktisierten Narrativ:
1. AGENT_SKRIPT (Phase 0.3) schreibt das didaktisierte Narrativ (600-900 W/Chunk) frei entlang DIDAKTIK_RAHMEN
2. AGENT_HEFTEINTRAG (Phase 0.4) **extrahiert** aus dem SKRIPT die Quintessenz: Kernerkenntnisse, Ordnungsmuster, Knoten-Struktur
3. AGENT_MATERIAL stellt sicher, dass jeder TB-Knoten durch konkretes Material **erarbeitbar** wird

Backward Design (Wiggins/McTighe) gilt auf KE-Ebene: DIDAKTIK_RAHMEN definiert Lernziele vor allem anderen. Auf TB-Ebene ist die Synthese-Extraktion aus dem didaktisierten SKRIPT die staerkere Architektur, weil Erarbeitbarkeit gegen das tatsaechliche Narrativ geprueft wird, nicht gegen Roh-Fakten (vgl. E5 in UPGRADE_PLAN_v3.md).

---

## 3. Empirische Muster aus 8 Praxis-Tafelbildern

### 3.1 Elementanzahl und Komplexitaet

| Metrik | Wert | Quelle |
|---|---|---|
| Durchschnittliche Elemente pro TB | 9,25 | 8 Excalidraw-TBs |
| Spannweite | 7-14 | 8 Excalidraw-TBs |
| Empfohlenes Limit | **max. 10 Elemente** | Synthese aus Empirie + DG B2 "Reduktion" |

### 3.2 Inhaltstypen und Textdichte (v2)

| Typ | Anteil | Verwendung | Max. Woerter |
|---|---|---|---|
| Knoten (Kurzphrasen) | ~40% | Strukturelemente, Kategorien, Fachbegriffe | 12 |
| Elaborierende Kurzesaetze | ~20% | Kausale Verbindungen, die im reinen Schaubild fuer R7-SuS nicht selbsttragend waeren | 15 |
| Merksatz | ~15% | Abschliessende Synthese als Antwort auf Stundenfrage (6/8 TBs) | 20 (pro Satz) |
| Verbindungs-Labels | ~25% | Pfeil-Beschriftungen (kausal, temporal, kontrastiv) | 5 |

**Schaubild-Elaborierungs-Modell (v2):** Der Hefteintrag ist ein Schaubild mit gezielter Elaborierung. Die Knoten und Pfeile bilden die Basis (identisch mit TB). Elaborierende Kurzesaetze ERGAENZEN die Schaubildstruktur, wo eine Verbindung fuer R7-SuS ohne Explizierung nicht selbsttragend ist. Die Elaborierung ERSETZT nicht die Struktur — Pfeile sind auch im Hefteintrag erwuenscht. Merksaetze duerfen elaborierter sein als im TB (1-3 Saetze statt 1 Nominalphrase), wenn die Elaborierung die Verankerung stuetzt.

### 3.3 Organisationsmuster (v2 — erweitert auf 6 Typen, 2026-04-03)

Revidiert auf Basis gerendeter Screenshots (visuelle Struktur, nicht nur Textelemente):

| Muster | Haeufigkeit | Beschreibung | Referenz-TB |
|---|---|---|---|
| parallel-kausal | 2/8 | N parallele Ursachen-Spalten → gemeinsame Wirkung unten | Heimatfront, Kriegsende |
| sequenziell | 1/8 | Zeitliche Abfolge vertikal, Pfeile zwischen Schritten | Marne-Schlacht |
| kontrastierend | 1/8 | Zeitachse mit Pol-Wechsel + Kategorien-Boxen | Leben an der Front |
| metaphorisch | 1/8 | Visualisierte Metapher (Fass + Funke) mit Komponenten | Attentat/Sarajewo |
| relational | 1/8 | Gruppierungen (Dreibund/Entente) + Konflikte als Pfeile | Pulverfass Europa |
| konzept-beispiel | 1/8 | Oberbegriff → Beispiele → Schlussfolgerung | Warum Weltkrieg |
| raeumlich (Sonderfall) | 1/8 | Geografische Darstellung + Kurztext | Schlieffen-Plan |

Anmerkung: Der Typ "raeumlich" (kartenbasiert) ist fuer die Engine-Darstellung schwer abbildbar und wird nicht als Enum-Wert im JSON gefuehrt. Bei raeumlichen Themen → naechstliegendes Muster waehlen (meist sequenziell oder relational).

### 3.4 Raeumliche Struktur

Alle 8 TBs nutzen das Excalidraw-Schema: **Haupttafel** (zentraler Inhalt) + **Seitentafel links/rechts** (Vermutungen, Zusatzinfo). Dies entspricht der physischen Tafelteilung im Klassenzimmer.

### 3.5 Sprachregister-Progression

| UE-Bereich | Sprachregister | Beispiel |
|---|---|---|
| Politisch-diplomatisch (UE 1-3) | Fachbegrifflich-analytisch | "Dreibund", "Triple-Entente", "Imperialismus" |
| Militaerisch (UE 4) | Strategisch-beschreibend | "Bewegungskrieg", "Stellungskrieg" |
| Menschlich-sozial (UE 5-7) | Erfahrungsbezogen-emotional | "dreckige Schuetzengraeben", "Todesangst", "Hungersnot" |
| Synthese (UE 8) | Kausal-bilanzierend | "Militaerische Niederlage", "Wirtschaftliche Erschoepfung" |

---

## 4. Erarbeitungsweg: Wie das Tafelbild im Unterricht entsteht

### 4.1 Position im Stundenverlauf

Das Tafelbild wird in der **Sicherungsphase** (letzte 7-12 Minuten) aufgebaut — NACH der inhaltlichen Erarbeitung. Es ist kein Vorab-Strukturgeber fuer Schueler:innen, sondern die sichtbare Ordnung dessen, was sie bereits entdeckt haben.

### 4.2 Typischer Ablauf

```
1. Lehrkraft stellt Leitfrage ("Was habt ihr herausgefunden?")
2. SuS nennen Ergebnisse aus Materialarbeit
3. Lehrkraft schreibt/zeichnet in Echtzeit an der Tafel
4. Lehrkraft ordnet Beitraege in Kategorien/Hierarchien
5. Klasse verifiziert das fertige Tafelbild gemeinsam
6. SuS uebertragen ins Heft (5-7 Minuten)
```

### 4.3 Material-Tafelbild-Korrespondenz

Zentraler Befund: Die **analytischen Kategorien der Erarbeitungsmaterialien** spiegeln sich direkt in der **Struktur des Tafelbilds**. Beispiele:

| UE | Material-Kategorien | Tafelbild-Struktur |
|---|---|---|
| 1 (Pulverfass) | 4 Gruppentexte: Dreibund, Triple Entente, Balkankrise, Kolonien | Karte mit Laendernamen, Buendnislinien, Konfliktlinien |
| 5 (Front) | Chronologische Briefe + Fotos + Feldpost | Kategorien: Kampfbedingungen, Gefuehle, Veraenderung |
| 6 (Heimatfront) | Film + Beobachtungsbogen (Essen, Frauenarbeit, Stimmung) | Kategorien: Versorgungskrise, Arbeitswelt, Soziale Folgen |
| 8 (Kriegsende) | 4 Arbeitsblaetter (Militaer, USA, Erschoepfung, Revolution) | 4 Punkte mit Unterbullets unter exakt diesen Kategorien |

**Konsequenz fuer AGENT_HEFTEINTRAG:** Jedes Tafelbild-Element muss einem geplanten Material zuordbar sein. Die Tafelbild-Struktur determiniert die Material-Struktur — nicht umgekehrt.

---

## 5. Guetekriterien-Katalog

Gewichtete Kriterien fuer den AGENT_HEFTEINTRAG Q-Gate. Drei Prioritaetsstufen: **MUSS** (Verletzung = FAIL), **SOLL** (Verletzung = Nachbesserung), **KANN** (Empfehlung).

### MUSS-Kriterien

| # | Kriterium | Operationalisierung | Herkunft |
|---|---|---|---|
| G1 | **Lernziel-Kongruenz** | Jede relevante KE aus DIDAKTIK_RAHMEN hat min. 1 Element im Tafelbild | DG B2 Grundsatz 2 |
| G2 | **Konsequente Reduktion** | Max. 10 Elemente (Knoten). Max. 3 Kernerkenntnisse (Merksaetze). | DG B2 Grundsatz 1 + Empirie (Durchschnitt 9,25) |
| G3 | **Erarbeitbarkeit** | Jedes TB-Element ist durch ein geplantes Material erarbeitbar (Abgleich mit INHALTSBASIS) | Empirischer Befund: Material-TB-Korrespondenz |
| G4 | **Strukturklarheit** | TB hat eine erkennbare Ordnung aus den 6 empirischen Typen: parallel-kausal, sequenziell, kontrastierend, metaphorisch, relational ODER konzept-beispiel. Ein TB darf EIN Primaermuster verwenden; Mischungen nur wenn Subsektionen klar getrennt. | DG B2 Grundsatz 5 + Empirie (8 Praxis-TBs, v2-Analyse 2026-04-03) |
| G5 | **Sprachliches Niveau** | Merksaetze: max. 15 Woerter, R7-Lesbarkeit. Fachbegriffe nur wenn in Material eingefuehrt. | DG B2 Grundsatz 4 + AGENT_SKRIPT Constraints |
| G6 | **Hefteintrag-Transferierbarkeit** | Hefteintrag-Repraesentation in max. 5 Minuten ins Heft uebertragbar (~80-120 Woerter) | Empirischer Befund: 5-7 min Uebertragungszeit |

### SOLL-Kriterien

| # | Kriterium | Operationalisierung | Herkunft |
|---|---|---|---|
| G7 | **Merksatz-Abschluss** | Mindestens 1 Merksatz als ganzer Satz (Synthese der Kernerkenntnis) | Empirie: 6/8 TBs haben Merksatz |
| G8 | **Anschaulichkeit** | Mindestens 1 visuell-strukturierendes Element: Pfeil, Klammer, Rahmen, Farbcodierung (in Textbeschreibung) | DG B2 Grundsatz 7 |
| G9 | **Progression** | Voraussetzungen aus vorherigen Mappen korrekt referenziert. TB baut auf Vorwissen auf, wiederholt nicht. | Empirie: Sequenz-Progression ueber 8 UEs |
| G10 | **Rekapitulierbarkeit** | Beim Lesen des Hefteintrags kann der Lernweg mental nachvollzogen werden (Benennung der Erarbeitungsschritte implizit sichtbar) | DG B2 Grundsatz 8 |

### KANN-Kriterien

| # | Kriterium | Operationalisierung | Herkunft |
|---|---|---|---|
| G11 | **Vermutungs-Sektion** | Optional: 1-2 Schueler-Hypothesen als "Seitentafel"-Element (werden durch Material bestaetigt/widerlegt) | Empirie: "Vermutungen:" in mehreren TBs |
| G12 | **Sprachregister-Passung** | Sprachregister passt zum Themencharakter (analytisch fuer Politik, erfahrungsbezogen fuer Alltag) | Empirie: Sprachregister-Progression |
| G13 | **Stundenfrage als Titel** | Hefteintrag-Titel als problemorientierte, schuelernahe Frage formuliert (max. 12 Woerter). Merksatz in Merkbox ist die qualifizierte Antwort. | Empirie: Alle 8 TBs nutzen Frage-Titel. v3.1 Design-Entscheidung: Stundenfrage als Pflicht. |
| G14 | **SCPL-Kohaerenz** | Jede SCPL-Zone baut logisch auf der vorherigen auf: Situation → Complication → Problem → Loesung. Keine Zone darf isoliert stehen oder eine vorherige Zone inhaltlich widersprechen. Loesung (Merkbox) muss die Stundenfrage direkt beantworten. | v3.1 SCPL-Evaluation (EVALUATION_SCPL_HEFTEINTRAG.md) |
| G15 | **Ordnungsmuster-Konsequenz** | Die SCPL-Textstruktur folgt dem Mapping des gewaehlten Ordnungsmusters. Bei "kontrastierend": Mindestens 1 Complication-Schritt als Pol-Gegenueberstellung (Pol A vs. Pol B mit Wer/Warum), nicht als lineare Narration. Bei "parallel-kausal": Complication als parallele Ursachen-Liste. Bei "sequenziell": Complication als chronologische Schritte. FAIL wenn: ordnungsmuster und SCPL-Textstruktur divergieren (z.B. "kontrastierend" gewaehlt, aber lineare Liste statt Gegenueberstellung). | Browser-Review Mappe 3 (D3c), empirische Ordnungsmuster-Analyse v2 |

---

## 6. Output-Format fuer AGENT_HEFTEINTRAG (v3.1 — SCPL)

### JSON-Repraesentation (fuer Engine → CSS-Hefteintrag)

```json
{
  "stundenfrage": "Problemorientierte Frage, max. 12 Woerter?",
  "ordnungsmuster": "parallel-kausal | sequenziell | kontrastierend | metaphorisch | relational | konzept-beispiel",
  "scpl": {
    "situation": {
      "kontextsatz": "1-2 Saetze Ausgangslage. Fachbegriffe per Doppelpunkt/Gedankenstrich.",
      "fachbegriffe": ["Begriff1", "Begriff2"]
    },
    "complication": [
      {
        "schritt": "Sachverhalt als Satz, Fachbegriff am Ende nach Doppelpunkt: Fachbegriff.",
        "fachbegriff": "Fachbegriff",
        "darstellung": null
      },
      {
        "schritt": null,
        "fachbegriff": "Fachbegriff",
        "darstellung": {
          "typ": "gegenueberstellung",
          "links": { "titel": "Titel", "punkte": ["A", "B", "C"] },
          "rechts": { "titel": "Titel", "punkte": ["D", "E", "F"] }
        }
      }
    ],
    "problem": {
      "satz": "Zentrales Problem, Fachbegriff am Ende: Fachbegriff.",
      "fachbegriff": "Fachbegriff"
    },
    "loesung": [
      "Merksatz 1 = Kernerkenntnis 1. Max. 15 Woerter.",
      "Merksatz 2 = Kernerkenntnis 2. Max. 15 Woerter."
    ]
  },
  "voraussetzungen": [],
  "kernerkenntnisse": [
    "Merksatz 1",
    "Merksatz 2"
  ],
  "knoten": [
    {"id": "kN-1", "text": "Kernbegriff (max 12 W.)", "typ": "kernbegriff | ursache | wirkung | kategorie | beispiel"}
  ],
  "verbindungen": [
    {"von": "kN-1", "nach": "kN-2", "label": "Kurzlabel (max 5 W.)", "typ": "kausal | temporal | kontrast | schlussfolgerung"}
  ]
}
```

**v3.1 Aenderungen gegenueber v3.0:**
- **NEU:** `scpl`-Objekt (Situation, Complication[], Problem, Loesung) — primaerer Rendering-Input
- **ENTFERNT (v3.2):** `transfer.frage` — Transferimpuls gehoert in Sicherungs-Phase (rahmen/sicherung.json reflexionsimpuls), nicht ins Hefteintrag-Schema.
- **NEU:** `stundenfrage` als Pflichtfeld (ersetzt `titel`)
- **PRIMAER (v2):** `knoten[]` und `verbindungen[]` sind Pflichtfelder — sie bilden die Schaubild-Struktur ab. Jeder SCPL-Schritt korrespondiert mit 1+ Knoten. Die Knoten tragen die kompakten Kurzphrasen, die SCPL-Texte die optionale Elaborierung.
- **Engine-Routing:** `if (scpl) → _renderHefteintragSCPL() | else if (knoten[].length) → Legacy | else → Fallback`. knoten[]/verbindungen[] steuern zusaetzlich das Ordnungsmuster-Layout (Stretch-Goal: Engine-Erweiterung O3-O6).

### Stilregeln

1. **Fachbegriffe:** NIEMALS in Klammern. Immer per Doppelpunkt oder Gedankenstrich am Satzende.
2. **Pfeile:** Nur Symbole, kein qualifizierender Text (Ausnahme: fachlich mehrdeutige Verbindung).
3. **Merkbox:** Gelb umrandet, keine Ueberschrift/Label.
4. **Transferimpuls:** Lebt in rahmen/sicherung.json (reflexionsimpuls), NICHT im Hefteintrag-Schema.

Kanonische Referenz fuer Stilregeln: `docs/architektur/EVALUATION_SCPL_HEFTEINTRAG.md`, Section 7-8.

---

## 7. Q-Gate-Protokoll

```markdown
### Q-Gate: Tafelbild Mappe [N]

| # | Kriterium | Prio | Ergebnis | Detail |
|---|---|---|---|---|
| G1 | Lernziel-Kongruenz | MUSS | PASS/FAIL | KE [X] abgedeckt durch k[N]-[M] |
| G2 | Reduktion (max. 10 Knoten, max. 3 Merksaetze) | MUSS | PASS/FAIL | [Anzahl] Knoten, [Anzahl] Merksaetze |
| G3 | Erarbeitbarkeit | MUSS | PASS/FAIL | Jeder Knoten → Skript-Passage oder Artefakt-Kandidat |
| G4 | Strukturklarheit | MUSS | PASS/FAIL | Ordnungsmuster: [parallel-kausal/sequenziell/kontrastierend/metaphorisch/relational/konzept-beispiel] |
| G5 | Sprachliches Niveau | MUSS | PASS/FAIL | Laengster Merksatz: [N] Woerter |
| G6 | Hefteintrag-Transfer | MUSS | PASS/FAIL | [N] Woerter, geschaetzte Uebertragungszeit [N] min |
| G7 | Merksatz-Abschluss | SOLL | PASS/FAIL | [Anzahl] Merksaetze als ganze Saetze |
| G8 | Anschaulichkeit | SOLL | PASS/FAIL | Visuelle Elemente: [Liste] |
| G9 | Progression | SOLL | PASS/FAIL | Voraussetzungen: [Liste] |
| G10 | Rekapitulierbarkeit | SOLL | PASS/FAIL | Lernweg implizit erkennbar |
| G11 | Vermutungs-Sektion | KANN | PASS/FAIL | vorhanden/nicht vorhanden |
| G12 | Sprachregister-Passung | KANN | PASS/FAIL | Register: [X] |
| G13 | Stundenfrage als Titel | KANN | PASS/FAIL | Frage: "...?" |
| G14 | SCPL-Kohaerenz | KANN | PASS/FAIL | Jede Zone baut auf vorheriger auf, Merkbox beantwortet Stundenfrage |
**Gesamt:** PASS / FAIL (G[X] nachgebessert)
```

---

## 8. Q-Gate-Operationalisierung (maschinell pruefbar)

Konkrete Prueflogik fuer jedes Kriterium, damit AGENT_HEFTEINTRAG das Q-Gate autonom ausfuehren kann.

### G1: Lernziel-Kongruenz (MUSS)

**Input-Daten:** `DIDAKTIK_RAHMEN.ke_matrix[mappe_n]` (Liste der KE-IDs dieser Mappe)
**Prueflogik:**
1. Extrahiere alle KE-IDs fuer diese Mappe aus DIDAKTIK_RAHMEN
2. Fuer jede KE-ID: Pruefe, ob mindestens 1 Knoten-Merksatz oder 1 Kernerkenntnis diese KE inhaltlich adressiert
3. Erstelle Mapping-Tabelle: `KE-ID → kN-M (Knoten-ID) | kernerkenntnisse[i]`
**FAIL wenn:** Mindestens 1 KE-ID hat keinen Eintrag in der Mapping-Tabelle
**Nachbesserung:** Fehlende KE identifizieren → Knoten ergaenzen oder bestehenden Knoten-Merksatz erweitern

### G2: Konsequente Reduktion (MUSS)

**Input-Daten:** `tafelbild.knoten[]`, `tafelbild.kernerkenntnisse[]`
**Prueflogik:**
1. Zaehle `len(knoten[])` — Ziel: ≤ 10
2. Zaehle `len(kernerkenntnisse[])` — Ziel: ≤ 3
**FAIL wenn:** `len(knoten[]) > 10` ODER `len(kernerkenntnisse[]) > 3`
**Nachbesserung:** Knoten zusammenfassen (aehnliche Inhalte unter 1 Oberbegriff) oder streichen (niedrigste KE-Relevanz zuerst)

### G3: Erarbeitbarkeit (MUSS)

**Input-Daten:** `tafelbild.knoten[]`, `SKRIPT_[game-id].md` (Chunk dieser Mappe), `ARTEFAKT_INVENTAR`
**Prueflogik — Entscheidungsbaum pro Knoten:**

```
Fuer jeden Knoten kN-M:
├── DIRECT: Gibt es im SKRIPT-Chunk einen Absatz/Passage, der diesen Knoten direkt behandelt?
│   └── JA → Status: DIRECT, Skript-Referenz: [Chunk-ID, §N]
├── ARTIFACT: Gibt es im ARTEFAKT_INVENTAR ein Artefakt (im SKRIPT positioniert), das diesen Knoten stuetzt?
│   └── JA → Status: ARTIFACT, Material-Kandidat: [Artefakt-ID, Skript-Ref]
├── INFERENTIAL: Kann der Knoten aus 2+ anderen DIRECT/ARTIFACT-Knoten logisch erschlossen werden?
│   └── JA → Status: INFERENTIAL, Herleitung: [kN-X + kN-Y → kN-M]
└── KEINE: Kein Weg zum Knoten
    └── Status: UNKLAR → Knoten entfernen oder Luecke markieren
```

**Output-Tabelle:**

| Knoten | Status | Skript-Referenz / Herleitung |
|---|---|---|
| kN-1 | DIRECT | Chunk 1, §3: "Die Grossmaechte schlossen..." |
| kN-2 | ARTIFACT | img-1-3 (Buendniskarte), Chunk 1 §4 |
| kN-3 | INFERENTIAL | kN-1 + kN-2 → Schlussfolgerung |

**FAIL wenn:** Mindestens 1 Knoten hat Status UNKLAR
**Nachbesserung:** Knoten entfernen ODER `[ERARBEITBARKEIT UNKLAR: kN-M — keine Skript-Passage]` markieren fuer AGENT_MATERIAL

### G4: Strukturklarheit (MUSS)

**Input-Daten:** `tafelbild.ordnungsmuster`, `tafelbild.verbindungen[]`
**Prueflogik:**
1. Pruefe: Ist `ordnungsmuster` genau eines der 6 empirischen Typen?
   - parallel-kausal: N Ursachen-Spalten → gemeinsame Wirkung (Labels: "fuehrt zu", "verursacht", "bewirkt")
   - sequenziell: Zeitliche Abfolge (Labels: "danach", "fuehrt zu", "loest aus")
   - kontrastierend: Gegenueberstellung mit Transformation (Labels: "vs.", "aber", "stattdessen")
   - metaphorisch: Visualisierte Metapher mit Komponenten (Labels: "ist Teil von", "enthaelt", "symbolisiert")
   - relational: Gruppierungen + Beziehungslinien (Labels: "verbuendet mit", "Konflikt mit", "gehoert zu")
   - konzept-beispiel: Oberbegriff → Beispiele → Schlussfolgerung (Labels: "zum Beispiel", "zeigt sich in")
2. Pruefe Konsistenz: Passen alle Verbindungs-Labels zum gewaehlten Muster?
3. Pruefe: Gibt es Verbindungen, die dem Muster widersprechen?
**FAIL wenn:** Kein Muster gesetzt ODER ≥2 Verbindungen widersprechen dem Muster
**Nachbesserung:** Widersprechende Verbindungen umformulieren oder Muster wechseln

### G5: Sprachliches Niveau (MUSS)

**Input-Daten:** Alle `knoten[].merksatz`, alle `kernerkenntnisse[]`
**Prueflogik:**
1. Fuer jeden Merksatz: Zaehle Woerter → Ziel: ≤ 15
2. Fuer jeden Fachbegriff in Merksaetzen: Pruefe, ob er in INHALTSBASIS definiert/eingefuehrt ist
3. Lesbarkeits-Heuristik: Keine Schachtelsaetze (max. 1 Nebensatz), keine Passivkonstruktionen
**FAIL wenn:** Ein Merksatz > 15 Woerter ODER ein Fachbegriff nicht in INHALTSBASIS eingefuehrt
**Nachbesserung:** Merksatz kuerzen (Nebensatz abspalten) oder Fachbegriff durch R7-Alternative ersetzen

### G6: Hefteintrag-Transferierbarkeit (MUSS)

**Input-Daten:** Hefteintrag-Text (Abschnitt B der Ausgabe)
**Prueflogik:**
1. Zaehle Woerter im Hefteintrag (ohne "Merke:"-Block) → Ziel: 80-120
2. Schaetze Uebertragungszeit: Woerter / 15 + Skizzen-Elemente * 0,5 min → Ziel: ≤ 5 min
3. Pruefe: Enthaelt der Hefteintrag visuelle Hinweise ("Zeichne...", "Pfeil von...") fuer mind. 1 Skizzen-Element?
**FAIL wenn:** Woerter < 80 ODER > 120 ODER geschaetzte Zeit > 5 min
**Nachbesserung:** Kuerzen (Details streichen) oder ergaenzen (fehlende Verbindungen als Saetze)

### G7: Merksatz-Abschluss (SOLL)

**Input-Daten:** `tafelbild.kernerkenntnisse[]`
**Prueflogik:** Mindestens 1 Eintrag in `kernerkenntnisse[]` ist ein ganzer Aussagesatz (Subjekt + Praedikat + Objekt/Ergaenzung)
**FAIL wenn:** `kernerkenntnisse[]` leer ODER kein Eintrag ist ein vollstaendiger Satz
**Nachbesserung:** Wichtigste Kernerkenntnis als Aussagesatz ausformulieren

### G8: Anschaulichkeit (SOLL)

**Input-Daten:** Hefteintrag-Text, `tafelbild.verbindungen[]`
**Prueflogik:** Mindestens 1 visuell-strukturierendes Element vorhanden: Pfeil-Hinweis, Klammer, Rahmen, Farbcodierung (in Textbeschreibung)
**FAIL wenn:** Kein visueller Hinweis im Hefteintrag UND keine Verbindungen im JSON
**Nachbesserung:** "Zeichne einen Pfeil von X nach Y" oder Rahmen-Hinweis ergaenzen

### G9: Progression (SOLL)

**Input-Daten:** `tafelbild.voraussetzungen[]`, vorheriges Tafelbild (Mappe N-1)
**Prueflogik:**
- **Mappe 1:** `voraussetzungen[]` MUSS leer sein (kein Vorwissen aus Escape-Game)
- **Mappe 2+:** `voraussetzungen[]` darf NUR Knoten-IDs aus Mappe N-1 enthalten (keine Spruenge ueber Mappen hinweg). Jede referenzierte ID muss im vorherigen Tafelbild existieren.
- Wiederholungsregel: Kein Knoten-Text darf woertlich aus dem vorherigen TB uebernommen werden
**FAIL wenn:** Mappe 1 hat nicht-leere Voraussetzungen ODER Mappe 2+ referenziert nicht-existierende IDs
**Nachbesserung:** Ungueltige Voraussetzungen entfernen oder IDs korrigieren

### G10: Rekapitulierbarkeit (SOLL)

**Input-Daten:** Hefteintrag-Text
**Prueflogik:** Der Hefteintrag muss den Lernweg implizit erkennbar machen — beim Lesen soll nachvollziehbar sein, WELCHE Erarbeitungsschritte zu den Erkenntnissen fuehrten. Pruefe: Enthaelt der Hefteintrag mindestens 1 Handlungs- oder Prozessverb ("Die Schueler untersuchten...", "Durch Vergleich von...") oder eine erarbeitungsbezogene Formulierung?
**FAIL wenn:** Hefteintrag liest sich wie reines Faktenwissen ohne Bezug zum Erarbeitungsweg
**Nachbesserung:** 1-2 Formulierungen ergaenzen, die den Erarbeitungsweg andeuten

### G11: Vermutungs-Sektion (KANN)

**Prueflogik:** Optional. Wenn vorhanden: Max. 2 Schueler-Hypothesen, die durch Material bestaetigt/widerlegt werden.
**Kein FAIL moeglich** — nur Dokumentation ob vorhanden.

### G12: Sprachregister-Passung (KANN)

**Input-Daten:** `tafelbild.knoten[].merksatz`, Themencharakter aus DIDAKTIK_RAHMEN
**Prueflogik:** Sprachregister des Tafelbilds soll zum Themencharakter passen:
- Politisch-diplomatische Themen → fachbegrifflich-analytisch
- Militaerische Themen → strategisch-beschreibend
- Menschlich-soziale Themen → erfahrungsbezogen-emotional
- Synthese-Themen → kausal-bilanzierend
**Kein FAIL moeglich** — nur Empfehlung zur Anpassung.

### G13: Stundenfrage als Titel (KANN)

**Input-Daten:** `tafelbild.stundenfrage`
**Prueflogik:** `stundenfrage` endet mit "?" (Fragezeichen), max. 12 Woerter, schuelernahes Register.
**Kein FAIL moeglich** — nur Empfehlung.

### G14: SCPL-Kohaerenz (KANN)

**Input-Daten:** `tafelbild.scpl` (Situation, Complication[], Problem, Loesung)
**Prueflogik:**
1. Situation setzt den Kontext, der in Complication aufgegriffen wird
2. Jeder Complication-Schritt baut auf dem vorherigen auf (keine isolierten Bloecke)
3. Problem folgt logisch aus der letzten Complication
4. Loesung (Merkbox) beantwortet die Stundenfrage direkt
5. Fachbegriffe werden in der Zone eingefuehrt, in der sie inhaltlich relevant sind (nicht vorher)
**Kein FAIL moeglich** — aber Dokumentation der Kohaerenz-Bewertung. Bei schwacher Kohaerenz: Nachbesserungsempfehlung.

---

## 9. Referenz-Tafelbild: Mappe 1 "Pulverfass Europa" (Silas)

Zum Abgleich — so sieht ein gutes Praxis-TB zu genau dem Thema unserer Mappe 1 aus:

**Elemente (~14):**
Laendernamen (Deutschland, Oesterreich-Ungarn, Italien, Frankreich, Grossbritannien, Russland), Buendnisbezeichnungen ("Dreibund", "Triple-Entente"), Konfliktfelder, abschliessende Erklaerung

**Ordnungsmuster:** Raeumlich-relational (Karte mit Buendnislinien und Konfliktlinien)

**Merksatz:** Erklaerung, warum Europa ein "Pulverfass" war (Buendnispflichten erzwingen Kettenreaktion)

**Besonderheit:** 4 Gruppentexte (Dreibund, Triple Entente, Balkankrise, Kolonien) fuehren direkt zu 4 TB-Bereichen. Material-TB-Korrespondenz = 1:1.

---

## 10. Stufe-2 Re-Evaluation (Phase 2.1c Achse 6)

Die Guetekriterien G1-G14 werden in Phase 0.4 (Stufe 1) erstmalig gegen den Plan geprueft. Fuenf davon erfordern eine **Re-Evaluation in Phase 2.1c** gegen die tatsaechlich produzierten Materialien, weil ihre Pruefaussage erst mit Material-Kontext vollstaendig bewertbar ist.

### Stufe-2-Kriterien

| # | Kriterium | Stufe-1 Pruefung (Phase 0.4) | Stufe-2 Re-Evaluation (Phase 2.1c Achse 6) |
|---|---|---|---|
| G3 | **Erarbeitbarkeit** | Jeder SCPL-Schritt hat Skript-Passage oder Artefakt-Kandidat (theoretische Abdeckung) | Jeder SCPL-Schritt ist durch ein **konkretes produziertes Material** erarbeitbar (faktische Abdeckung). Pruefung gegen materialien/mat-N-*.json, nicht gegen Plan. |
| G5 | **Sprachliches Niveau** | Merksaetze ≤ 15 Woerter, R7-Lesbarkeit gegen SKRIPT | SCPL-Texte (nach Formulierungs-Revision) sind sprachlich konsistent mit den produzierten Materialien. Fachbegriffe werden in derselben Form verwendet wie im Material. |
| G10 | **Rekapitulierbarkeit** | Lernweg implizit erkennbar (gegen Plan) | Hefteintrag laesst den **tatsaechlichen** Material-Erarbeitungsweg erkennen. SuS koennen anhand des Hefteintrags rekonstruieren, was sie in den Materialien erarbeitet haben. |
| G12 | **Sprachregister-Passung** | Register passt zum Themencharakter (gegen DIDAKTIK_RAHMEN) | Register der SCPL-Texte harmoniert mit dem Register der produzierten Materialien. Kein Register-Bruch zwischen Material-Sprache und Hefteintrag-Sprache. |
| G14 | **SCPL-Kohaerenz** (partiell) | Jede Zone baut logisch auf vorheriger auf (Struktur-Pruefung) | SCPL-Texte (nach Revision) bilden einen **inhaltlich kohaerenten Bogen**, der die Material-Erfahrungen widerspiegelt. Kontextsatz referenziert konkreten Material-Einstieg, nicht abstrakte Beschreibung. |

### Operationalisierung

Die Stufe-2 Re-Evaluation erfolgt im selben Dispatch wie Achse 6 (Hefteintrag-Revision) in VERTRAG_PHASE_2-1c_CROSS.md. Input: alle materialien/mat-N-*.json + rahmen/hefteintrag.json (Stufe-1-Output). Bei FAIL eines Stufe-2-Kriteriums: Begruendung in Q-GATE-LOG.md + Nachbesserung der FORMULIERUNGS-OFFEN-Felder (NICHT der STRUKTUR-FREEZE-Felder).

**Nicht re-evaluiert** werden: G1 (Lernziel-Kongruenz — KE-Matrix stabil), G2 (Reduktion — Knotenanzahl stabil), G4 (Strukturklarheit — Ordnungsmuster stabil), G6 (Hefteintrag-Transfer — Wortanzahl stabil), G7-G9, G11, G13 (unveraendert nach Phase 0.4).

---

## 11. Abgrenzung: Was AGENT_HEFTEINTRAG NICHT tut

| Nicht-Zustaendigkeit | Zustaendig |
|---|---|
| Narrativen Text schreiben | AGENT_SKRIPT |
| Materialtypen zuordnen | AGENT_MATERIAL |
| Aufgaben formulieren | AGENT_RAETSEL |
| SVG/HTML rendern | AGENT_TECHNIK |
| Material produzieren | SUB_*-Subagenten |
| Didaktischen Rahmen definieren | AGENT_DIDAKTIK |
