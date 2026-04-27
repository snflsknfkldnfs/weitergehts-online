# Progressionsplan — Mappe 4: Marne 1914 — Das Ende des kurzen Krieges

**Game-ID:** `gpg-erster-weltkrieg-ursachen-run4-v050`
**Mappe:** M4 — Marne 1914
**Phase:** 2.2a (agent-raetsel-progressionsplan, Plugin v0.5.0)
**Erstellt:** 2026-04-26
**Schulart:** Mittelschule Bayern · Jahrgangsstufe 7c · Fach GPG
**KE-Anker (haupt):** `GPG7_LB2_K_07` — historische Spuren des Kriegsverlaufs (Bonus, Marne-Wende)
**AFB-Schwerpunkt:** **II — Sicherung (entlastend nach M3-Hoehepunkt)**
**Bloom-Korridor:** L2 Verstehen → L3 Anwenden → L4 Analysieren (Schwerpunkt L2-L4, kein L5/L6)
**Stundenfrage:** Warum scheiterte der deutsche Plan fuer einen schnellen Sieg an der Marne?
**Validierungsstatus:** ENTWURF (User-Validierung ausstehend)
**Eingaben:** VERTRAG_PHASE_2-2a · DIDAKTIK_RAHMEN.md · HEFTEINTRAG_M4.md · BLUEPRINT_M4.md · 6 Material-JSONs (mat-4-1..mat-4-6) · skript_struktur.json/M4

---

## F0b-Priming (Pflicht)

[F0B_PRIMING_v1] aktiv — Sprachniveau-R7 (Satzlaenge ≤15W, DaZ-tauglich, Komposita beim Erstgebrauch erklaert) und Terminologie-01 (kolonialsprachliche Blacklist; in M4 nicht thematisch beruehrt) gelten fuer alle Aufgaben-Stems, Distraktoren, Feedbacks und Loesungstexte. Laufzeit-Pruefung erfolgt in Phase 2.2b durch Subagenten + V16/V18.

---

## 1. Aufgabenzahl-Berechnung (inhaltsgesteuert v2)

```
basis            = 5
knoten_faktor    = ceil(5 / 5) = 1     (5 TB-Knoten K4-1..K4-5)
material_faktor  = 1                    (6 Materialien > 4)
aufgabenzahl     = min(8, 5 + 1 + 1) = 7
```

**Begruendung:** 5 TB-Knoten + 6 Materialien — inhaltsdichte Mappe, aber bewusst entlastend nach M3-Hoehepunkt. **7 Aufgaben** im Korridor 5-8: Plan-Idee + Belgien-Verletzung + Marne-Schlacht + Quellenkritik-Doppel + Wucht-Befund + Stellungskrieg-Sicherung + Game-Abschluss-Reflexion.

---

## 2. SCPL-Zonen-Mapping (aus BLUEPRINT_M4 §1, fixiert)

| SCPL-Zone | TB-Knoten | Kurztext | AFB-Korridor | Material-Abdeckung |
|---|---|---|---|---|
| **S** (Situation) | K4-2 | Schlieffen-Plan (1905/06) — 6 Wochen FR-Sieg ueber Belgien | I | mat-4-1 (Karte) |
| **C1** (Komplikation 1) | K4-3 | Belgien-Verletzung 4.8.1914 — Neutralitaets-Bruch + GB-Kriegseintritt | I-II | mat-4-2 (Zeitleiste) |
| **C2** (Komplikation 2) | K4-4 | Marne-Schlacht 5.-12.9.1914 — Joffre vs. Moltke | II | mat-4-2 + mat-4-3 + mat-4-4 |
| **P** (Problem/Wendepunkt) | K4-5 | Wendepunkt zum Stellungskrieg — Wettlauf zum Meer | II | mat-4-2 + mat-4-5 |
| **L** (Loesung/Sicherung) | K4-1 | Stellungskrieg — feste Stellungen, Schuetzen-Graeben | II | mat-4-6 |

**SCPL-Abdeckungs-Check (A17):** 5/5 Zonen mit ≥1 diagnostischer Aufgabe. PASS.

---

## 3. Aufgaben-Sequenz (Progressionsplan)

| Pos | Aufgaben-ID | Typ | AFB | Bloom | SCPL-Zone | TB-Knoten | Material(ien) | Operationalisierungsziel |
|---|---|---|---|---|---|---|---|---|
| 1 | m4-a1 | multiple-choice | I | L2 Verstehen | **S** | K4-2 | mat-4-1 (Karte Schlieffen-Plan) | Benenne, was der Schlieffen-Plan vorsah — und durch welches Land der Bogen fuehrte. |
| 2 | m4-a2 | reihenfolge | I-II | L3 Anwenden | **C1** | K4-3 | mat-4-2 (Zeitleiste) | Ordne die vier Daten 02.08. / 04.08. / 07.08. / 20.08.1914 in die richtige Reihenfolge — und erkenne, an welchem Tag Grossbritannien dazu kam. |
| 3 | m4-a3 | lueckentext | II | L3 Anwenden | **C2** | K4-4 | mat-4-2 (Zeitleiste) | Ergaenze die Schluessel-Fakten der Marne-Schlacht: General Joffre stoppt den deutschen Vormarsch ca. 40 km vor Paris vom 5. bis 12. September 1914 — und Moltke wird abgesetzt. |
| 4 | m4-a4 | zuordnung | II-III | L4 Analysieren | **C2** | K4-4 | mat-4-3 (DT-Soldaten) + mat-4-4 (FR-Infanterie 1913) | Weise die zwei Inszenierungs-Befunde den richtigen Bildern zu — Decorations-Tragen DT 1914 (gestelltes Heeres-Foto) und Manoever-Aufnahme FR 1913 (Datums-Falle). |
| 5 | m4-a5 | multiple-choice | II | L4 Analysieren | **P** | K4-4 + K4-5 | mat-4-5 (Verluste-Statistik) | Erklaere, warum die Verlust-Zahl von > 500.000 in 7 Tagen die Idee vom „kurzen Krieg" zerstoert — und welche drei Konfliktparteien betroffen sind. |
| 6 | m4-a6 | lueckentext | II | L3 Anwenden | **L** | K4-1 + K4-5 | mat-4-6 (Darstellungstext) | Ergaenze den Begriff Stellungskrieg und den Wendepunkt-Befund: Aus geplanten sechs Wochen wurden vier Jahre Krieg. |
| 7 | m4-a7 | freitext-code | III | L4 Analysieren | **L** | K4-1 (Game-Abschluss) | mat-4-6 + Rueckblick M1+M2+M3 | Beurteile in 2-3 Saetzen: Welche vier Befunde aus M1-M4 ergeben den Schluessel-Code dieses Games? Und welche Frage bleibt offen fuer das naechste Game (Stellungskrieg / Heimatfront / Versailles)? |

### Typvielfalt-Pruefung (A10)

| Typ | Anzahl | Positionen | Begruendung Wiederholung |
|---|---|---|---|
| multiple-choice | 2 | Pos 1 (AFB I), Pos 5 (AFB II) | **Begruendet:** Pos 1 = Faktenwissen-Erkennung Schlieffen-Plan-Idee (S-Zone, AFB I); Pos 5 = Transfer-Beurteilung Verlust-Wucht (P-Zone, AFB II) — unterschiedliche kognitive Anforderung. |
| zuordnung | 1 | Pos 4 | — |
| lueckentext | 2 | Pos 3 (AFB II Marne-Fakten), Pos 6 (AFB II Stellungskrieg-Sicherung) | **Begruendet:** Pos 3 = Fachbegriff-Recall Marne-Schlacht (C2-Zone, Datums-/Akteurs-Fakten); Pos 6 = Begriffs-Sicherung Stellungskrieg/Wendepunkt (L-Zone, Merksatz-Anker). Unterschiedliche SCPL-Zonen + unterschiedliche Begriffs-Cluster. |
| reihenfolge | 1 | Pos 2 | — |
| freitext-code | 1 | Pos 7 | Pflicht (letzte Position, AFB III, Game-Abschluss-Reflexion) |

**Bilanz:** **5 verschiedene Typen** (≥3 PASS), kein Typ > 3x (max 2x PASS), Freitext-Code 1x am Ende (PASS), beide Wiederholungen didaktisch begruendet (PASS).

### AFB-Progression

```
Pos 1   2     3   4      5   6   7
AFB I   I-II  II  II-III II  II  III
```

**Monoton steigend mit didaktischer Plateau-Phase auf AFB II (Pos 3-6) und AFB-III-Spitze am Ende (Pos 7).** Kein Rueckschritt — Pos 4 (II-III) baut auf Pos 3 (II) auf, Pos 5 (II) bleibt auf gleichem Niveau wie Pos 4-Korpus, Pos 7 (III) als Game-Abschluss-Spitze. Konsistent mit DIDAKTIK_RAHMEN §5: M4 = AFB II Sicherung mit AFB-III-Reflexionsspitze als Folge-Game-Bruecke.

---

## 4. Konstruktionskontext-Tabelle (fuer Phase 2.2b)

Die Tabelle liefert pro Aufgabe alles, was der Typ-Subagent in Phase 2.2b braucht — ohne den Material-Volltext (der wird per `material-orchestrator-2-2b` aus den Material-JSONs nachgeladen).

| Aufgabe | Typ-Subagent | Material(ien) | TB-Knoten | Operationalisierungsziel | Ziel-Erkennbarkeit (was ist „richtig"?) | Sprachniveau-Anker |
|---|---|---|---|---|---|---|
| **m4-a1** | SUB_AUFGABE_MC | mat-4-1 (Karte) | K4-2 | Benenne, was der Schlieffen-Plan vorsah — und durch welches Land der Bogen fuehrte. | Korrekt: „Frankreich in 6 Wochen besiegen — durch Belgien." Distraktoren: „Russland in 6 Wochen" / „direkter Marsch ueber die DT-FR-Grenze" / „Krieg gegen GB". 4 Optionen, 1 richtig. | R7-15W, „Schlieffen-Plan" als Eigenname (in mat-4-1 mit Bindestrich-Erklaerung eingefuehrt). |
| **m4-a2** | SUB_AUFGABE_REIHENFOLGE | mat-4-2 (Zeitleiste) | K4-3 | Ordne die vier Daten 02.08. / 04.08. / 07.08. / 20.08.1914 in die richtige Reihenfolge — und erkenne, an welchem Tag Grossbritannien dazu kam. | Korrekte Reihenfolge: 02.08. (Ultimatum an Belgien) → 04.08. (DT-Einmarsch + GB-Kriegseintritt) → 07.08. (Lueck faellt) → 20.08. (Bruessel faellt). 4 Karten zum Drag-and-Drop-Sortieren. | R7-15W, „Ultimatum" als Apposition erklaeren („Frist mit Drohung"). |
| **m4-a3** | SUB_AUFGABE_LUECKENTEXT | mat-4-2 (Zeitleiste) | K4-4 | Ergaenze die Schluessel-Fakten der Marne-Schlacht. | 4 Luecken: (a) „Joffre" als FR-General, (b) „40" km vor Paris, (c) „5. bis 12. September 1914" als Datums-Spanne, (d) „Moltke" wird am 14.09. abgesetzt. | R7-15W, Datums-Schreibweise wie in mat-4-2. |
| **m4-a4** | SUB_AUFGABE_ZUORDNUNG | mat-4-3 + mat-4-4 (Bildquellen-Doppel) | K4-4 | Weise die zwei Inszenierungs-Befunde den richtigen Bildern zu. | Karte 1 (DT-Soldaten 1914) → Befund „gestelltes Foto, Decorations-Tragen unueblich im Kampf"; Karte 2 (FR-Infanterie) → Befund „Manoever-Aufnahme 1913, vor der Marne-Schlacht entstanden"; Distraktor „echtes Kampf-Foto vom 10.9.1914" → keiner der beiden. **F-PB-37 Quellenkritik-Aufgabe Pflicht erfuellt.** | R7-15W, „Inszenierung" und „Manoever" als Apposition erklaeren. |
| **m4-a5** | SUB_AUFGABE_MC | mat-4-5 (Statistik) | K4-4 + K4-5 | Erklaere, warum die Verlust-Zahl von > 500.000 in 7 Tagen die Idee vom „kurzen Krieg" zerstoert. | Korrekt: „Eine so hohe Zahl in nur einer Woche zeigt: Der Krieg wird kein schneller Sieg, sondern teuer und lang — die drei betroffenen Laender sind Frankreich, Grossbritannien und Deutschland." 4 Optionen, 1 richtig. Multiperspektiv-Distraktor: „Nur Deutschland war betroffen" → falsch (Sieger-Verlierer-Mythos-Korrektur). | R7-15W, Zahl als Faktum (kein Visualisieren), „ca." in Distraktor-Logik einbauen. |
| **m4-a6** | SUB_AUFGABE_LUECKENTEXT | mat-4-6 (Darstellungstext) | K4-1 + K4-5 | Ergaenze den Begriff Stellungskrieg und den Wendepunkt-Befund. | 3 Luecken: (a) „Stellungskrieg" als Begriff, (b) „Schuetzen-Graeben" als konkreter Bestandteil, (c) „vier Jahre" als Krieg-Dauer (statt sechs Wochen Plan). Merksatz-Anker aus B.5. | R7-15W, Begriffe wortlautnah aus mat-4-6 / Hefteintrag B.5. |
| **m4-a7** | SUB_AUFGABE_FREITEXT | mat-4-6 + Rueckblick M1+M2+M3 | K4-1 (Game-Abschluss) | Beurteile in 2-3 Saetzen: Welche vier Befunde aus M1-M4 ergeben den Schluessel-Code dieses Games? Und welche Frage bleibt offen fuer das naechste Game? | Erwartete Schueler-Antwort (Code-Konzept): „M1 = Pulverfass Europa, M2 = Sarajevo als Ausloeser, M3 = Augustbegeisterung + geteilte Schuld, M4 = Stellungskrieg statt kurzer Krieg. Offene Frage: Wie lebten die Soldaten im Schuetzen-Graben — und wie endete der Krieg 1918?" Bewertung: 3-stufig (Anker / Volltext / Begruendung). | R7-15W pro Satz, du-Form, Rueckverweis auf M1-M3-Hefteintraege erlaubt. |

---

## 5. Freischalt-Code-Konzept M4

**Code-Logik (Game-Abschluss):** Die vier Mappen ergeben am Ende einen 4-stelligen „Schluessel-Code", der die Tuer zum Folge-Game oeffnet. Jede Mappe steuert ein Code-Element bei — abgeleitet aus dem Merksatz / der Zentralen Erkenntnis.

| Mappe | Code-Element | Quelle |
|---|---|---|
| M1 | **PULVERFASS** (oder: Buendnis-Bloecke 2) | M1 Hefteintrag B.5 / Zentrale Erkenntnis DR §4 |
| M2 | **AUSLOESER** (oder: Datum 28.06.1914) | M2 Hefteintrag B.5 / Zentrale Erkenntnis DR §4 |
| M3 | **AUGUSTBEGEISTERUNG** (oder: 1914-Forschung-Clark-Schlafwandler) | M3 Hefteintrag B.5 / Zentrale Erkenntnis DR §4 |
| M4 | **STELLUNGSKRIEG** | M4 Hefteintrag B.5 Merksatz / mat-4-6 |

**Aufgaben-Bezug M4:** Code-Element „STELLUNGSKRIEG" wird in **m4-a6 (lueckentext)** als Hauptluecke (a) abgefragt. Die richtige Loesung dieser Aufgabe schaltet das M4-Code-Element frei. Phase 2.2b uebersetzt das in den konkreten Lueckentext-Aufbau.

**Game-Abschluss-Code (komplett):** `PULVERFASS — AUSLOESER — AUGUSTBEGEISTERUNG — STELLUNGSKRIEG` als 4-Wort-Schluessel; alternative numerische Codierung pro Mappe via Distraktor-Antworten denkbar (Phase 2.2b entscheidet Format).

---

## 6. Game-Abschluss-Reflexion-Anker (Folge-Game-Bruecke)

**Pflicht-Q-Gate (M4-spezifisch):** Letzte Aufgabe (m4-a7) leitet Game-Abschluss-Reflexion ein.

### m4-a7 als Reflexions-Anker

Die Freitext-Aufgabe m4-a7 verbindet drei Funktionen:

1. **Synthese-Funktion:** Die SuS rekapitulieren die vier Befunde der vier Mappen — kein neuer Stoff, sondern strukturierte Verdichtung.
2. **Schluessel-Code-Funktion:** Die vier Befunde sind zugleich die vier Code-Elemente (Pulverfass / Ausloeser / Augustbegeisterung / Stellungskrieg).
3. **Folge-Game-Bruecke-Funktion:** Die offene Frage am Ende benennt explizit die drei Folge-Game-Themen — Stellungskrieg-Alltag, Heimatfront, Versailles 1919.

### Erwartungs-Horizont fuer m4-a7

| Niveau | Antwort-Beispiel |
|---|---|
| Anker (Mindeststandard, AFB II) | „M1 Buendnisse, M2 Sarajevo, M3 Schuld, M4 Stellungskrieg. Ich frage mich, wie es weiter ging." |
| Volltext (Regelstandard, AFB II-III) | „Vor dem Krieg gab es Buendnisse und einen Wettlauf um Kolonien (M1). Dann erschoss Princip Franz Ferdinand in Sarajevo (M2). Viele jubelten im August 1914, aber heute wissen wir: Mehrere Maechte waren schuld (M3). Der Plan vom kurzen Krieg scheiterte an der Marne — der Stellungskrieg begann (M4). Offen: Wie war das Leben im Schuetzen-Graben? Und wie endete der Krieg?" |
| Begruendung (Maximalstandard, AFB III) | Wie Volltext + Eigenposition: „Mich beeindruckt am meisten, dass niemand den Krieg verhindert hat, obwohl alle die Folgen ahnten. Im naechsten Game will ich verstehen, was Versailles bedeutete — und ob das vermeidbar war." |

### Folge-Game-Bruecke (3 Anker)

Die Aufgabe m4-a7 nennt explizit drei Folge-Themen, die in Folge-Games adressiert werden:

- **Stellungskrieg / Schuetzen-Graben-Alltag** (Folge-Game „WK1-Stellungskrieg")
- **Heimatfront** (Folge-Game „WK1-Heimatfront", Hunger / Frauen-Erwerb / Burgfrieden-Bruch)
- **Versailler Vertrag 1919** (Folge-Game „WK1-Ende-und-Versailles", KE `GPG7_LB3_K_04`)

**Begruendung Sandwich-Anschluss:** Hefteintrag M4 A.5 markiert M4 als Schlusspunkt dieses Games und kuendigt Folge-Game-Bruecke an, **ohne inhaltlich vorzugreifen**. m4-a7 setzt diesen Auftrag operativ um: Das Schueler-Reflexion-Format „2-3 Saetze + offene Frage" oeffnet den Anschlusspunkt, ohne den Stoff der Folge-Games schon zu liefern.

---

## 7. Cross-Konsistenz-Check (M1+M2+M3 → M4)

| Vor-Mappe | Vorwissen-Anker | Aktivierung in M4 | Status |
|---|---|---|---|
| M1 | Buendnis-System Triple-Entente / Dreibund + GB-FR-Buendnis | mat-4-1 verweist auf „Buendnis-System (M1)"; mat-4-2 nutzt GB-Kriegseintritt 4.8. als Buendnis-Folge; m4-a7 rekapituliert M1-Befund | **GESICHERT** |
| M2 | Mobilmachung + Buendnisfall + Belgien-Neutralitaet (M2 §5 Tipp-Slot) | mat-4-1 referenziert „Neutralitaet (M2)"; mat-4-2 nutzt Belgien-Bruch als Erweiterung der Mobilmachung; m4-a2 baut auf Datums-Logik der Julikrise auf | **GESICHERT** |
| M3 | Augustbegeisterung + „kurzer-Krieg-Glaube" + Quellenkritik | M4-Skript §1 nimmt M3-Sandwich-Bruecke auf („Maenner glaubten an einen kurzen Krieg"); mat-4-3 + mat-4-4 referenzieren explizit „Quellenkritik (M3)" und wenden sie auf Marne-Bilder an; m4-a4 baut die F-PB-37-Quellenkritik-Aufgabe auf M3-Vorwissen auf | **GESICHERT** |

**Cross-Konsistenz-Bilanz:** Alle drei Vor-Mappen werden in M4 aktiviert — **M1 strukturell** (Buendnisse), **M2 ereignishaft** (Belgien-Neutralitaet + GB-Kriegseintritt-Mechanik), **M3 methodisch** (Quellenkritik-Anwendung). PASS.

---

## 8. Q-Gate Self-Check (Orchestrator-Ebene)

Pflicht-Referenz: `checklisten/GUETEKRITERIEN_AUFGABEN.md` (A1-A18) + Pflicht-Q-Gates aus dem Auftrag.

### A1-A18 (Standardkriterien)

| ID | Kriterium | Ergebnis | Evidenz |
|---|---|---|---|
| A1 | AFB-Kongruenz (Gesamtbild) | **PASS** | AFB-Verteilung I/I-II/II/II-III/II/II/III stimmt mit DIDAKTIK_RAHMEN §5 ueberein (M4 = AFB II Sicherung mit AFB-III-Spitze am Ende). |
| A3 | Material-Kongruenz (Vollstaendigkeit) | **PASS** | Alle 6 Materialien aktiviert: mat-4-1 (a1), mat-4-2 (a2+a3), mat-4-3+mat-4-4 (a4), mat-4-5 (a5), mat-4-6 (a6+a7). 6/6 Materialien in ≥1 Aufgabe. |
| A5 | Schwierigkeits-Progression | **PASS** | I → I-II → II → II-III → II → II → III. Keine Regression — Pos 5+6 bleiben auf AFB II Plateau (Sicherung), Pos 7 als AFB-III-Spitze. |
| A8 | Kognitive Aktivierung | **PASS** | m4-a4 (Quellenkritik-Doppel) + m4-a5 (Wucht-Befund) + m4-a7 (Reflexion) sind alle denkanregend. |
| A9 | TB-Bezug | **PASS** | 5/5 TB-Knoten K4-1..K4-5 in mind. 1 Aufgabe adressiert. |
| A10 | Typvielfalt | **PASS** | 5 verschiedene Typen, kein Typ > 2x, beide Wiederholungen (MC + Lueckentext) didaktisch begruendet (siehe §3 Typvielfalt-Pruefung). |
| A12 | Sachbezogen-vor-Wertbezogen | **PASS** | Pos 1-3 = sachbezogen (S/C1/C2 Faktenwissen + Reihenfolge); Pos 4-6 = analytisch (Quellenkritik / Wucht-Befund / Sicherung); Pos 7 = wertbezogen (Reflexion). Phasenlogik eingehalten. |
| A16 | Fragebogen-Kohaerenz | **PASS** | Aufgabensequenz S → C1 → C2 → C2 → P → L → L bildet SCPL-Erarbeitungsweg ab. |
| A17 | SCPL-Zonen-Abdeckung | **PASS** | S (a1) / C1 (a2) / C2 (a3+a4) / P (a5) / L (a6+a7) — alle 5 Zonen ≥1 Aufgabe. |
| A18 | Material-Aktivierung | **PASS** | Alle 6 Materialien sind in mind. 1 Aufgabe Primaerquelle (nicht nur Tipp). |
| MQ3 | Material-Referenz-Verbot in `frage` | **PFLICHT-WEITERGABE an Phase 2.2b** | Orchestrator markiert: Kein Fragestamm darf `[[mat-id|...]]`-Links oder `(M[position])`-Verweise enthalten. |
| MQ3b | Display-Referenzen in Tipps | **PFLICHT-WEITERGABE an Phase 2.2b** | Orchestrator markiert: Tipp Stufe 1 jeder Aufgabe MUSS `[[mat-id|Anzeigetext]]`-Inline-Link + (M[position]) enthalten. |

### Pflicht-Q-Gates aus Auftrag (M4-spezifisch)

| ID | Kriterium | Ergebnis | Evidenz |
|---|---|---|---|
| QM4-1 | AFB II Sicherung (entlastend) | **PASS** | Plateau AFB II auf Pos 3-6, AFB I-Einstieg auf Pos 1, AFB-III-Spitze nur am Ende — bewusst entlastend nach M3-Hoehepunkt. |
| QM4-2 | Schlieffen-Plan-Mythos-Korrektur operationalisiert | **PASS** | mat-4-1 traegt `mythos_korrektur_realisiert: true` (Zuber-Forschung in Quellenkritik-BU). m4-a1 nutzt mat-4-1 als Karte und transportiert die Plan-Idee, der Mythos-Korrektur-Hinweis ist im Material verankert (kein Verstoss durch Aufgabe). Phase 2.2b sichert: Distraktoren werden NICHT die Mythos-Verankerung („einziger fertiger Plan") wiederholen. |
| QM4-3 | F-PB-37 Quellenkritik-Aufgabe Pflicht bei mat-4-3 + mat-4-4 | **PASS** | m4-a4 (zuordnung) ist genau diese Quellenkritik-Aufgabe — Inszenierungs-Doppel DT 1914 + FR 1913. AFB II-III. |
| QM4-4 | Multiperspektivitaet Sieger-Verlierer-Mythos | **PASS** | m4-a4 zeigt: Beide Seiten haben sich aehnlich inszeniert (DT-Decorations + FR-Manoever) → kein Sieger-Verlierer-Bias. m4-a5 zeigt: Drei Konfliktparteien (FR/GB/DT) sind alle betroffen → Drei-Parteien-Statistik korrigiert Mythos. |
| QM4-5 | Pro Material mind. 1 Aufgabe | **PASS** | mat-4-1→a1, mat-4-2→a2+a3, mat-4-3→a4, mat-4-4→a4, mat-4-5→a5, mat-4-6→a6+a7. 6/6. |
| QM4-6 | Letzte Aufgabe (m4-aN) leitet Game-Abschluss-Reflexion ein (Folge-Game-Bruecke) | **PASS** | m4-a7 ist freitext-code AFB III mit explizitem Folge-Game-Anker (Stellungskrieg / Heimatfront / Versailles). Siehe §6. |
| QM4-7 | Cross-Konsistenz mit M1+M2+M3 | **PASS** | Siehe §7 — alle drei Vor-Mappen aktiviert. |

### Gate-Urteil

**PASS (alle BLOCKER + alle HIGH PASS, keine WARN-Eskalation noetig).**

**Weitergabe an Phase 2.2b:** Dispatcher (`agent-raetsel-dispatcher`) erhaelt diese 7 Aufgaben-Auftraege mit Konstruktionskontext-Tabelle (§4) als Schnittstelle. Pro Aufgabe wird ein Typ-Subagent (`SUB_AUFGABE_MC` / `SUB_AUFGABE_REIHENFOLGE` / `SUB_AUFGABE_LUECKENTEXT` / `SUB_AUFGABE_ZUORDNUNG` / `SUB_AUFGABE_FREITEXT`) instanziiert und mit Material-Volltext (aus mat-4-N.json `inhalt`-Feld) versorgt.

---

## 9. Bloom-Verteilung (gegen DIDAKTIK_RAHMEN §5 + Auftragsvorgabe „Schwerpunkt L2-L4")

| Bloom-Stufe | Aufgaben | Anteil |
|---|---|---|
| L1 Erinnern | — | 0% |
| **L2 Verstehen** | a1 | 1/7 = 14% |
| **L3 Anwenden** | a2, a3, a6 | 3/7 = 43% |
| **L4 Analysieren** | a4, a5, a7 | 3/7 = 43% |
| L5 Bewerten | (Anker in a7 Maximalstandard) | (optional, in Aufgabe enthalten) |
| L6 Erschaffen | — | 0% |

**Schwerpunkt L2-L4 = 100%.** PASS gegen Auftragsvorgabe „entlastend nach M3, Schwerpunkt L2-L4". L5 (Bewerten) erscheint nur als optionale Maximalstandard-Auspraegung in m4-a7 (Reflexions-Begruendung) — vertretbar als didaktischer Spitzenwert ohne Korridor-Verletzung.

---

## 10. Meta

| Feld | Wert |
|---|---|
| schema_version | progressionsplan_v2 |
| vertrag_version | VERTRAG_PHASE_2-2a v1.0 |
| agent | agent-raetsel-progressionsplan |
| phase | 2.2a |
| created_at | 2026-04-26 |
| game_id | gpg-erster-weltkrieg-ursachen-run4-v050 |
| run_id | run-4-2026-04-26 |
| mappe_id | M4 |
| ke_anker_haupt | GPG7_LB2_K_07 |
| afb_schwerpunkt | II (Sicherung, entlastend) |
| bloom_korridor | L2-L4 (Schwerpunkt L3+L4 je 43%) |
| aufgabenzahl | 7 |
| typvielfalt | 5 Typen (MC 2x, Lueckentext 2x, Zuordnung 1x, Reihenfolge 1x, Freitext 1x) |
| scpl_zonen_abdeckung | 5/5 (S, C1, C2, P, L) |
| material_aktivierung | 6/6 |
| f_pb_addressed | F-PB-37 (Quellenkritik mat-4-3 + mat-4-4 in m4-a4) |
| schluessel_code_element_m4 | STELLUNGSKRIEG (in m4-a6 als Hauptluecke) |
| folge_game_anker | Stellungskrieg / Heimatfront / Versailles (in m4-a7) |
| plugin_version | v0.5.0 |
| validierungsstatus | ENTWURF (User-Validierung ausstehend) |
| naechste_phase | Phase 2.2b — agent-raetsel-dispatcher delegiert 7 Aufgaben an Typ-Subagenten |
