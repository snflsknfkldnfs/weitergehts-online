# Material-Blueprint: Mappe M1 — Pulverfass Europa

**Game-ID:** `gpg-erster-weltkrieg-ursachen-run4-v050`
**Run-ID:** `run-4-2026-04-26`
**Mappe:** M1 — Pulverfass Europa
**Phase:** 1 (Material-Design, agent-material-design)
**Erstellt:** 2026-04-26 (Plugin v0.5.0)
**Validierungsstatus:** ENTWURF (User-Validierung ausstehend)
**KE-Anker (haupt):** `GPG7_LB2_K_05` (Maechterivalitaeten + Imperialismus)
**KE-Anker (neben):** `GPG7_LB3_K_03`
**AFB-Schwerpunkt:** I-II (Verstehen → Anwenden)
**Stundenfrage:** Warum war Europa vor 1914 ein "Pulverfass"?
**Eingabe:** SKRIPT M1 §1-§7 (612W), HEFTEINTRAG_M1 (STRUKTUR-FREEZE), artefakt_inventar.json M1 (6 Materialien), medien_katalog M1 (3 verifizierte Bilder)

---

## 0. F0b-Priming-Konformitaet

| Block | Geltung M1 | Status |
|---|---|---|
| §1 SPRACHNIVEAU-R7 | aktiv (alle Materialien) | wird in alle Subagent-Prompts uebernommen |
| §2 MATERIAL-PERSPEKTIV-01 (M4) | aktiv (`konflikt`, `kolonialismus`, `nationalismus` in trigger_flags) | min. 2 nicht-dominante Tags ueber alle 6 Materialien (Plan unten) |
| §3 TERMINOLOGIE-01 (M6) | aktiv (Kategorie `Kolonisierung` via `kolonialismus`) | Kolonial-Sprach-Sieb QG-07 verbindlich fuer mat-04 (Darstellungstext) und mat-06 (Karte Afrika) |
| §4 UEBERLEITUNG-01 (M2) | partiell aktiv | M1 ist Mappe 1 → kein Rueckbezug auf Vor-Mappe; Sandwich-Vorbezug auf M2 ("Wer wirft den Funken?") |
| §5 MULTIPERSPEKTIV-SYNTHESE (M3) | nicht aktiv (nur Mappenabschluss-Template) | — |

---

## 1. SCPL-Abdeckung (aus HEFTEINTRAG_M1, fixiert / STRUKTUR-FREEZE)

### 1.1 Tafelbild-Knoten + Material-Mapping

| Knoten-ID | Label | Position | Typ | Fachbegriffe | Material-Abdeckung |
|---|---|---|---|---|---|
| K1-1 | Pulverfass Europa | Zentrum | Leitbegriff | "Pulverfass-Metapher" | mat-04 (Darstellungstext) — Synthese-Funktion |
| K1-2 | Dreibund (1882) | links-oben | Buendnis-Block | Dreibund, Buendnis-System | mat-01 (Karte Buendnisse) + mat-04 (Darstellungstext) |
| K1-3 | Triple Entente (1907) | rechts-oben | Buendnis-Block | Triple Entente | mat-01 (Karte Buendnisse) + mat-04 (Darstellungstext) |
| K1-4 | Flotten-Wettlauf | rechts-unten | Spannungsfeld | Flotten-Wettlauf, HMS Dreadnought | mat-02 (Foto Dreadnought) + mat-05 (Statistik Flottenstaerke) |
| K1-5 | Wettlauf um Afrika / Marokko-Krisen | links-unten | Spannungsfeld | Kolonialwettlauf, Imperialismus, Marokko-Krisen | mat-06 (Karte Kolonien Afrika) + mat-03 (Wilhelm-II.-Portrait, Akteurs-Anker) |

### 1.2 SCPL-Struktur (aus Cross-Konsistenz-Check Phase 0.4)

> M1: Situation: Europa um 1900 / Complication: Buendnisse + Spannungen / Problem: Pulverfass / Loesung: Merksatz

| SCPL-Zone | Inhalt | Knoten | Material-Abdeckung |
|---|---|---|---|
| **S** (Situation) | Sechs europaeische Grossmaechte um 1900 | (Vor-Knoten zu K1-2/K1-3) | mat-01 (Karte) — Einstiegs-Topographie |
| **C1** (Complication 1) | Zwei feindliche Buendnis-Bloecke | K1-2 + K1-3 | mat-01 (Karte) + mat-04 (Darstellungstext §1-§2) |
| **C2** (Complication 2) | Flotten-Wettruesten DT vs. GB | K1-4 | mat-02 (Foto Dreadnought) + mat-05 (Statistik) |
| **C3** (Complication 3) | Kolonialwettlauf, Marokko-Krisen, Wettlauf um Afrika | K1-5 | mat-06 (Karte Afrika) + mat-03 (Wilhelm-II.-Portrait als Akteur) |
| **P** (Problem) | "Pulverfass Europa" — drei Spannungen + zwei Buendnisse | K1-1 (Synthese) | mat-04 (Darstellungstext §3 Synthese) |
| **L** (Loesung) | Merksatz: "Schon vor 1914 war Europa ein Pulverfass …" | (Hefteintrag-Sicherung) | Sicherungs-Block (kein eigenes Material — Hefteintrag-Funktion) |

**DIRECT-Check:** 6/6 Zonen DIRECT durch mind. 1 Material erarbeitbar (100%). Schwelle 70% erreicht: **JA**. Keine INFERENTIAL-Zonen.

### 1.3 SCPL-Uebergaenge + kausal_mechanismus

| Uebergang | Material | kausal_mechanismus (1 Satz) |
|---|---|---|
| S → C1 | mat-01 → mat-04 | Sechs Maechte ordnen sich in zwei Buendnisse → strukturelle Polarisierung als Ausgangs-Spannung |
| C1 → C2 | mat-04 → mat-02 | Polarisierte Buendnisse + DT-Welt-Politik (Tirpitz-Plan 1898) → britische Reaktion HMS Dreadnought 1906 → Wettruesten zur See |
| C2 → C3 | mat-02 → mat-05 → mat-06 | Quantitatives Wettruesten (29 vs. 17 Grossschiffe) + Welt-Politik-Anspruch ("Platz an der Sonne") → Kolonial-Konkurrenz in Afrika (Marokko-Krisen 1905+1911) |
| C3 → P | mat-06 → mat-03 → mat-04 | Marokko-Eskalationen unter Wilhelm II. + Berliner Konferenz 1884 → drei Spannungsfelder treffen auf zwei feindliche Buendnis-Bloecke = Pulverfass |
| P → L | mat-04 (Synthese) → Hefteintrag-Sicherung | Pulverfass-Metapher fasst alle drei Spannungsfelder + Buendnisse zusammen → Merksatz "Es braucht nur einen Funken" → Bruecke zu M2 |

**Abdeckungs-Check:** Jede Zone ≥1 Material; jeder Uebergang belegt; alle 5 Uebergaenge mit kausal_mechanismus dokumentiert.

---

## 2. Material-Entwurf (6 Materialien)

| # | mat-ID | Typ | Arbeits-Titel | SCPL-Zone | Skript-Ref | Artefakt-Ref | Quelle | Bloom | W-Budget | sensibilitaet |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | m1-mat-01 | karte | "Europa 1914 — Zwei Buendnisse, sechs Grossmaechte" | S + C1 | M1 §1, §5 | img-m1-02 | Wikimedia Commons `Map_Europe_alliances_1914-en.svg` (CC-BY-SA-2.5) | Verstehen | n/a (visuell) | keine |
| 2 | m1-mat-02 | bildquelle | "HMS Dreadnought 1906 — Das Wettruesten zur See" | C2 | M1 §3 | img-m1-01 | Wikimedia Commons `HMS_Dreadnought_1906_H61017.jpg` (PD-USNavy) | Verstehen → Anwenden | ~30W BU | keine |
| 3 | m1-mat-03 | bildquelle | "Wilhelm II. 1902 — Ein Kaiser inszeniert sich" | C3 (Akteur) | M1 §6 | img-m1-03 | Wikimedia Commons `Kaiser_Wilhelm_II_of_Germany_-_1902.jpg` (PD-old-100) | Anwenden (Quellenkritik) | ~50W BU + Quellenkritik-Frage | propaganda_kontextualisierung_noetig |
| 4 | m1-mat-04 | darstellungstext | "Was ist ein Buendnis-System?" | C1 + P | M1 §1-§2, §7 | — (Eigenproduktion) | Eigenkomposition; Datenbasis: wiki:Triple_Alliance_(1882) + wiki:Triple_Entente + wiki:Causes_of_World_War_I | Verstehen → Anwenden | ~120W (R7-Korridor) | keine |
| 5 | m1-mat-05 | statistik | "Schiffe zaehlen — Flotten-Wettlauf 1906/1914" | C2 | M1 §4 | — (Eigenproduktion, Datenbasis Wiki) | Eigenkomposition; Datenbasis: wiki:Anglo-German_naval_arms_race | Verstehen → Anwenden | ~60W Tabellen-Begleittext | keine |
| 6 | m1-mat-06 | karte | "Afrika 1914 — Wer beherrscht was?" | C3 | M1 §5 | TBD (PD-Karte aus wiki:Scramble_for_Africa) | Eigenkomposition / PD-Karte; Datenbasis: wiki:Scramble_for_Africa + wiki:First_Moroccan_Crisis + wiki:Agadir_Crisis | Verstehen → Anwenden | ~80W BU + Sprach-Sieb-konforme Begleitung | propaganda_kontextualisierung_noetig (Kolonial-Terminologie-Pflicht) |

**Mindest-Check:**
- 1 Darstellungstext (mat-04) — Basisinformation: **PASS**
- 1 Quellentext ODER Bildquelle (mat-02 + mat-03) — historische Authentizitaet: **PASS** (2 Bildquellen)
- 1 personifiziertes Material — Akteurs-Anker (mat-03 Wilhelm II. als personifizierter Treiber der Welt-Politik): **PASS** (im Sinne "Akteur sichtbar machen", auch wenn kein Tagebuch/Brief)
- 1 visuelles Material (mat-01 + mat-06 Karten, mat-05 Statistik): **PASS** (3 visuelle)
- Gesamt ≥4 Materialien: **PASS** (6 Materialien)

**Medienvielfalt-Ratio (MV1):**
- Textbasiert: 1 (mat-04 Darstellungstext)
- Nicht-textbasiert: 5 (mat-01 Karte, mat-02 Bildquelle, mat-03 Bildquelle, mat-05 Statistik, mat-06 Karte)
- Verhaeltnis 1/6 textbasiert = ca. 17 % — weit unter 50%-Schwelle: **PASS**
- Begruendung: M1 ist visuell dominant (Topographie, Akteure, Macht-Inszenierung). Der einzige Text (mat-04) leistet die begriffliche Synthese fuer das Tafelbild.

---

## 3. Lerntheoretische Ziele (pro Material)

### mat-01 — Karte "Europa 1914 — Zwei Buendnisse, sechs Grossmaechte"

| Feld | Wert |
|---|---|
| **Bloom-Ebene** | Verstehen (Reproduzieren von Buendnis-Strukturen aus visueller Repraesentation) |
| **AFB** | I-II |
| **Lerntheoretisches Ziel** | SuS koennen die zwei Buendnis-Bloecke (Dreibund / Triple Entente) anhand der Farb-Codierung benennen und ihre Mitglieder zuordnen. Die SuS erkennen die geographische Polarisierung Europas um 1914. |
| **Pflicht-Begriffe** | Dreibund, Triple Entente, Buendnis (Erstgebrauch im Begleit-BU) |
| **Erarbeitbarkeits-Nachweis (R7 7c)** | SuS lesen die Legende der SVG-Karte, erkennen Farben (gelb = Dreibund, blau = Triple Entente, grau = neutral). Sie ordnen die 6 Maechte den 2 Bloecken zu. Begleit-BU erlaeutert "Buendnis" als "Versprechen, dass alle helfen, wenn einer angegriffen wird". Visuelles Lernen — kein Lese-Hindernis. |
| **Tafelbild-Knoten** | K1-2 (Dreibund), K1-3 (Triple Entente) |
| **Aufgaben-Anker (vorbereitet, Phase 2.2)** | a1-01 (Buendnis-Zuordnung) |
| **Sicherungs-Funktion** | Hefteintrag-Slot: Karte wird in den Hefteintrag uebernommen |

### mat-02 — Bildquelle "HMS Dreadnought 1906 — Das Wettruesten zur See"

| Feld | Wert |
|---|---|
| **Bloom-Ebene** | Verstehen → Anwenden (technologischer Sprung als Symbol einer politischen Konkurrenz lesen) |
| **AFB** | II |
| **Lerntheoretisches Ziel** | SuS erkennen, dass die HMS Dreadnought (1906) die britische Antwort auf den deutschen Flotten-Aufbau (Tirpitz-Plan 1898) war und den deutsch-britischen Flotten-Wettlauf beschleunigte. Sie verstehen, dass technologische Neuerungen politische Spannungen verstaerken koennen. |
| **Pflicht-Begriffe** | Flotten-Wettlauf, HMS Dreadnought (BU-Erstgebrauch) |
| **Erarbeitbarkeits-Nachweis (R7 7c)** | SuS sehen das Foto eines grossen Schlachtschiffs. BU erklaert: erstes "All-big-gun"-Schiff, technische Zaesur, Royal Navy 1906. Brueckensatz erklaert: "Deutschland baute jetzt auch solche Schiffe — ein Wettrennen begann." Visuell + minimaler Lesetext (BU ~30W). 3-Stufen-Tipp aus artefakt_inventar slottable. |
| **Tafelbild-Knoten** | K1-4 (Flotten-Wettlauf) |
| **Aufgaben-Anker (Phase 2.2)** | a1-02 |
| **Quellenkritik** | nicht-pflicht (neutrale Marine-Dokumentation laut medien_katalog), aber BU markiert "spaetere ikonische Verwendung als Symbol" |

### mat-03 — Bildquelle "Wilhelm II. 1902 — Ein Kaiser inszeniert sich"

| Feld | Wert |
|---|---|
| **Bloom-Ebene** | Anwenden (Quellenkritik anwenden: Inszenierung als solche erkennen) |
| **AFB** | II |
| **Lerntheoretisches Ziel** | SuS erkennen, dass das Studio-Portrait eine Auftrags-Inszenierung ist und nicht ein neutrales Foto. Sie koennen die Frage "Was wollte der Kaiser zeigen — und was nicht?" auf das Bild anwenden. Sie verstehen Wilhelm II. als personifizierten Treiber der Welt-Politik (Flotten-Aufbau, Marokko-Eskalationen). |
| **Pflicht-Begriffe** | Imperialismus (BU-Erstgebrauch), "Welt-Macht-Politik" |
| **Erarbeitbarkeits-Nachweis (R7 7c)** | SuS sehen das Auftrags-Portrait (Uniform, Decorationen, Pose). BU + Quellenkritik-Frage fuehren sie zur Erkenntnis "bewusste Inszenierung". 3-Stufen-Tipp: Stufe 1 "Was traegt der Mann?" → Stufe 2 "Hofphotograph, Studio, bewusst inszeniert" → Stufe 3 "Welt-Macht-Politik, Flotten-Aufbau, Selbstdarstellung als maechtiger Kaiser". |
| **Tafelbild-Knoten** | K1-5 (Wettlauf um Afrika / Marokko-Krisen — Akteur-Anker) |
| **Aufgaben-Anker (Phase 2.2)** | a1-03 |
| **Quellenkritik** | **PFLICHT** (auftragskunst_flag=true, propaganda_kontext='kaiserliche Selbstdarstellung im Kontext Welt-Politik / Flotten-Aufbau') |
| **sensibilitaets_markierung** | `propaganda_kontextualisierung_noetig` — Dispatch-Constraint: `kontextualisierung_satz` als BU-Pflichtfeld (R7-konform: "Dieses Foto ist kein neutrales Bild. Der Kaiser liess sich bewusst so zeigen.") |

### mat-04 — Darstellungstext "Was ist ein Buendnis-System?"

| Feld | Wert |
|---|---|
| **Bloom-Ebene** | Verstehen → Anwenden (Begriff "Buendnis-System" verstehen und auf 1914 anwenden) |
| **AFB** | I-II |
| **Lerntheoretisches Ziel** | SuS koennen den Begriff "Buendnis-System" mit eigenen Worten erklaeren ("mehrere Buendnisse zusammen") und den Mechanismus "Wer angegriffen wird, dem helfen die anderen" wiedergeben. Synthese-Funktion am Mappen-Ende: SuS koennen die Pulverfass-Metapher mit den drei Spannungsfeldern verbinden. |
| **Pflicht-Begriffe** | Buendnis (Erstgebrauch zerlegt), Buendnis-System (Erstgebrauch zerlegt), Dreibund, Triple Entente, Imperialismus, Pulverfass-Metapher |
| **Erarbeitbarkeits-Nachweis (R7 7c)** | Text ~120W in 3 Absaetzen: (1) Buendnis-Begriff erklaeren mit Alltags-Analogie. (2) Dreibund + Triple Entente benennen mit Mitglieds-Listen. (3) Synthese: Buendnisse + Wettruesten + Kolonialstreit = Pulverfass. Saetze max. 15W (R7-Korridor). Hauptsatz-dominant. Komposita beim Erstgebrauch zerlegt. |
| **Tafelbild-Knoten** | K1-2 (Dreibund), K1-3 (Triple Entente), K1-1 (Pulverfass-Synthese) |
| **Aufgaben-Anker (Phase 2.2)** | a1-01 (Buendnis-Zuordnung), a1-04 (Synthese-Frage Pulverfass) |
| **Sicherungs-Funktion** | Hefteintrag-Slot: Synthese-Saetze fliessen in den Sicherungs-Text |
| **Quellenanker** | wiki:Triple_Alliance_(1882) + wiki:Triple_Entente + wiki:Causes_of_World_War_I |

### mat-05 — Statistik "Schiffe zaehlen — Flotten-Wettlauf 1906/1914"

| Feld | Wert |
|---|---|
| **Bloom-Ebene** | Verstehen → Anwenden (quantitative Daten lesen und als Eskalations-Indikator deuten) |
| **AFB** | II |
| **Lerntheoretisches Ziel** | SuS koennen aus der 2-Spalten-Tabelle (RoyalNavy / Kaiserliche Marine, 1906 / 1914) ablesen, dass beide Maechte Grossschiffe bauten und der britische Vorsprung blieb. Sie verstehen, dass Wettruesten ein quantitativer Vorgang ist (Zahlen wachsen ueber Jahre). |
| **Pflicht-Begriffe** | Wettruesten (BU-Erstgebrauch), Dreadnought (FB aus mat-02 referenziert) |
| **Erarbeitbarkeits-Nachweis (R7 7c)** | Tabelle mit max. 4 Datenzellen + Begleittext ~60W. SuS koennen Spalten- und Zeilenkoepfe lesen. 3-Stufen-Tipp aus artefakt_inventar: Stufe 1 "Wer hat mehr Schiffe?" → Stufe 2 "1906 GB Vorsprung; bis 1914 baute DT auf, GB blieb vorn" → Stufe 3 entfaellt (Tabelle selbsterklaerend). |
| **Tafelbild-Knoten** | K1-4 (Flotten-Wettlauf — 29 vs. 17 Grossschiffe 1914) |
| **Aufgaben-Anker (Phase 2.2)** | a1-02 (Querbezug zu mat-02 Dreadnought-Foto), a1-05 (Statistik-Lese-Aufgabe) |
| **Quellenanker** | wiki:Anglo-German_naval_arms_race (Sektion "Naval bills") |
| **Pflicht-Hinweis** | Zahlen mit "ca." kennzeichnen (laut artefakt_inventar TBD-Note) |

### mat-06 — Karte "Afrika 1914 — Wer beherrscht was?"

| Feld | Wert |
|---|---|
| **Bloom-Ebene** | Verstehen → Anwenden (Kolonialgebiete topographisch zuordnen + Marokko-Konfliktanker erkennen) |
| **AFB** | II |
| **Lerntheoretisches Ziel** | SuS koennen aus der Karte ablesen, dass Afrika um 1914 fast vollstaendig durch europaeische Grossmaechte aufgeteilt war (Schwerpunkte FR + GB). Sie erkennen Marokko als Konfliktanker zwischen DT und FR (1905, 1911) und verstehen "Kolonialwettlauf" als raeumlich-politisches Spannungsfeld. |
| **Pflicht-Begriffe** | Kolonialwettlauf, Imperialismus, Kolonie, Marokko-Krisen, Berliner Konferenz 1884 |
| **Erarbeitbarkeits-Nachweis (R7 7c)** | Karte mit Farb-Codierung der Kolonialmaechte + Markierung Marokko (Konfliktanker). Begleit-BU ~80W mit Sprach-Sieb-konformer Sprache. 3-Stufen-Tipp: Stufe 1 "Welche Laender haben grosse Gebiete?" → Stufe 2 "FR + GB am meisten, DT spaet" → Stufe 3 "Marokko: 1905+1911 Konflikt zwischen DT und FR". |
| **Tafelbild-Knoten** | K1-5 (Wettlauf um Afrika / Marokko-Krisen) |
| **Aufgaben-Anker (Phase 2.2)** | a1-06 |
| **Quellenanker** | wiki:Scramble_for_Africa + wiki:First_Moroccan_Crisis + wiki:Agadir_Crisis |
| **sensibilitaets_markierung** | `propaganda_kontextualisierung_noetig` — Dispatch-Constraint: Kolonial-Sprach-Sieb QG-07. Verbotene Begriffe: "Erschliessung", "Eingeborene", "zivilisatorische Mission", "Entdeckung". Pflicht-Formulierungen: "Aufteilung Afrikas durch europaeische Grossmaechte", "kolonisierte Bevoelkerung", "Eroberung und Aufteilung". |
| **Quellenkritik** | PFLICHT — die kartographische Aufteilungs-Perspektive ist die der europaeischen Maechte. BU thematisiert: "Die Karte zeigt, wie die europaeischen Maechte Afrika unter sich aufgeteilt haben. Die Bevoelkerung Afrikas wurde nicht gefragt." (in Anlehnung an Skript M1 §5) |

---

## 4. Quellen-Anker (zusammenfassend)

| mat-ID | Quelle | Lizenz | Verifikation |
|---|---|---|---|
| mat-01 | Wikimedia Commons `Map_Europe_alliances_1914-en.svg` (img-m1-02) | CC-BY-SA-2.5 (historicair / Fluteflute / Bibi Saint-Pol) | medien_katalog_game.json M1 PASS (Kanal A+B verified) |
| mat-02 | Wikimedia Commons `HMS_Dreadnought_1906_H61017.jpg` (img-m1-01) | PD-USNavy / PD-Mark-1.0 | medien_katalog M1 PASS |
| mat-03 | Wikimedia Commons `Kaiser_Wilhelm_II_of_Germany_-_1902.jpg` (img-m1-03) | PD-old-100 (Studio Voigt) | medien_katalog M1 PASS (mit auftragskunst_flag) |
| mat-04 | Eigenkomposition — Datenbasis: wiki:Triple_Alliance_(1882) (hash wiki-triple-alliance-2026-04-26) + wiki:Triple_Entente (hash wiki-triple-entente-2026-04-26) + wiki:Causes_of_World_War_I | Eigenproduktion | inhalts_briefing.json M1 schluessel_fakten 1+2 |
| mat-05 | Eigenkomposition — Datenbasis: wiki:Anglo-German_naval_arms_race (hash wiki-naval-race-2026-04-26) + wiki:HMS_Dreadnought_(1906) (hash wiki-dreadnought-2026-04-26) | Eigenproduktion | inhalts_briefing.json M1 schluessel_fakten 5+6 |
| mat-06 | Eigenkomposition / PD-Karte aus wiki:Scramble_for_Africa (hash wiki-scramble-2026-04-26) + Marokko-Krisen-Daten | TBD-PD-Recherche (Phase 2.1: SUB_KARTE prueft PD-Karte aus Wikimedia Commons; Fallback Eigenkomposition) | inhalts_briefing.json M1 schluessel_fakten 3+4+7 |

**Quellen-Verifikations-Hinweis:** Alle 3 Bild-Materialien (mat-01, mat-02, mat-03) sind dual-kanal verifiziert (Phase 0.2.M, agent-medienrecherche). mat-06 ist `quelle_status: TBD-PD-Recherche` — der Subagent SUB_MATERIAL_KARTE muss in Phase 2.1 entweder eine PD-Wikimedia-Karte qualifizieren ODER eine Eigenkomposition begruenden (Datenbasis Wiki-hashes vorhanden).

---

## 5. Sequenzplan (didaktisch begruendet, AFB-progressiv)

### 5.1 Reihenfolge (1-basiert)

| # | mat-ID | Typ | Didaktische Funktion | Primaerer Tafelbild-Knoten | SCPL-Zone | material_charakter | bildfunktion | analyseauftrag | personalisiert | aktivierungscharakter | FB eingefuehrt | FB referenziert | Voraussetzung | Kerninhalt (1 Satz) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | m1-mat-01 | karte | einstieg | K1-2 / K1-3 | S + C1 | vergegenwaertigung | n/a | false | false | bild | Buendnis (Stufe 2), Dreibund (Stufe 1), Triple Entente (Stufe 1) | — | — | Europa 1914: zwei Buendnisse, sechs Grossmaechte (Farb-Codierung). |
| 2 | m1-mat-04 | darstellungstext | erarbeitung | K1-2 / K1-3 (Begriffs-Verankerung) | C1 | vergegenwaertigung | n/a | false | false | — | Buendnis-System (Stufe 1), Imperialismus (Stufe 2), Pulverfass-Metapher (Stufe 4) | Buendnis, Dreibund, Triple Entente | mat-01 | Was ist ein "Buendnis-System"? — Begriff, Mitglieder, Mechanismus + Pulverfass-Synthese-Vorbereitung. |
| 3 | m1-mat-02 | bildquelle | erarbeitung | K1-4 | C2 | vergegenwaertigung | illustrativ | false | false | — | Flotten-Wettlauf (Stufe 1), HMS Dreadnought (Stufe 1), Tirpitz-Plan (Stufe 4) | Imperialismus | mat-04 | HMS Dreadnought 1906 als Symbol des deutsch-britischen Flotten-Wettlaufs. |
| 4 | m1-mat-05 | statistik | vertiefung | K1-4 | C2 | besinnung_sachbezogen | n/a | true | false | — | Wettruesten (Stufe 1) | Flotten-Wettlauf, HMS Dreadnought | mat-02 | Quantifizierung: 29 vs. 17 Grossschiffe 1914 — britischer Vorsprung blieb. |
| 5 | m1-mat-06 | karte | erarbeitung | K1-5 | C3 | vergegenwaertigung | heuristisch | true | false | — | Kolonialwettlauf (Stufe 1), Kolonie (Stufe 1), Marokko-Krisen (Stufe 1), Berliner Konferenz 1884 (Stufe 4) | Imperialismus | mat-04 | Afrika 1914: durch sieben europaeische Maechte aufgeteilt; Marokko = Konfliktanker DT vs. FR. |
| 6 | m1-mat-03 | bildquelle | sicherung | K1-5 (Akteur-Anker) + Brueckenfunktion zu K1-1 | C3 → P (Akteurs-Personifizierung) | besinnung_wertbezogen | heuristisch | true | true | — | (keine neuen FB) | Imperialismus, Kolonialwettlauf, Flotten-Wettlauf | mat-04, mat-05, mat-06 | Wilhelm II. als personifizierter Treiber: Flotten-Aufbau + Welt-Politik + Marokko-Eskalation. Quellenkritik der Inszenierung. |

**Ordnungsanker-Begruendung (S5 / S6 Sequenzkriterien):**

- **Primaer-Anker SKRIPT-Reihenfolge:** Skript M1 entwickelt §1 (Buendnisse) → §3-§4 (Flotte) → §5 (Afrika) → §6 (Wilhelm II.) → §7 (Pulverfass-Synthese). Material-Reihenfolge folgt diesem narrativen Pfad: mat-01/04 (Buendnisse §1-§2) → mat-02/05 (Flotte §3-§4) → mat-06 (Afrika §5) → mat-03 (Wilhelm II. §6) → mat-04 leistet zusaetzlich die Pulverfass-Synthese (§7) durch sein Sicherungs-Doppel (Funktion in Hefteintrag).
- **Kontroll-Anker SCPL:** S → C1 → C2 → C3 → P → L. Material-Reihenfolge folgt dieser Logik (mat-01 = S/C1, mat-04 = C1, mat-02/05 = C2, mat-06 = C3, mat-03 = C3-Akteur+Bruecke zu P, Hefteintrag = P/L).
- **Konvergenz:** Beide Anker zeigen denselben Aufbau. Keine Divergenz.
- **AFB-Progression:** I-II → I-II → II → II → II → II. Steigt monoton von Bloom-Ebene "Verstehen" (mat-01) zu "Verstehen → Anwenden" (mat-02/05/06) zu "Anwenden mit Quellenkritik" (mat-03 als Sicherung). Innerhalb des AFB-I-II-Korridors der Mappe (DR §5).

### 5.2 Uebergangsobjekte (Achse 5, Phase 2.1c — strukturierte Felder bereits jetzt fixiert)

| Von → Nach | rueckbezug_inhalt_ref (≥8W) | vorausblick_frage (≥8W) | kausalitaets_typ | intentionsskizze (2-3 Saetze) |
|---|---|---|---|---|
| mat-01 → mat-04 | Die Karte zeigt zwei Buendnis-Bloecke und sechs Grossmaechte um 1914. | Was bedeutet ueberhaupt "Buendnis" — und was ist daran gefaehrlich? | vertiefend | Vom Bild zur Begriff: Die Karte hat die Polarisierung gezeigt; jetzt brauchen die SuS den Begriff "Buendnis-System" und den Mechanismus dahinter. Brueckensatz erklaert das Versprechen "Wer angegriffen wird, dem helfen die anderen". |
| mat-04 → mat-02 | Du weisst jetzt: zwei feindliche Buendnisse stehen sich misstrauisch gegenueber. | Aber war das alles? Was war noch los — auf den Meeren? | kausal | Vom Buendnis-Begriff zum konkreten Spannungsfeld. Das Foto der HMS Dreadnought 1906 macht das Wettruesten zur See sinnlich greifbar. Brueckensatz: "Es gibt aber noch mehr Spannungen — schau dir dieses Schiff an." |
| mat-02 → mat-05 | Die HMS Dreadnought 1906 war Antwort auf den deutschen Flotten-Aufbau. | Wie viele solcher Schiffe haben die zwei Seiten bis 1914 gebaut? | vertiefend | Vom Einzelfoto zur Quantifizierung. Die Statistik-Tabelle zeigt das Wettruesten als Vorgang ueber 8 Jahre. SuS sehen: 29 vs. 17 Grossschiffe — GB Vorsprung, aber DT holt auf. |
| mat-05 → mat-06 | Beide Seiten haben gebaut — der britische Vorsprung blieb, die Spannung wuchs. | Aber das Wettruesten zur See war nicht der einzige Streit. Wo noch? | kontrastiv | Vom Wettruesten zur See zum Wettlauf an Land. Die Afrika-Karte oeffnet das dritte Spannungsfeld: Kolonien. Brueckensatz: "Nicht nur auf dem Meer kracht es. Schau auf Afrika." |
| mat-06 → mat-03 | Sieben europaeische Maechte teilen Afrika auf; Marokko ist zweimal Konfliktanker DT vs. FR. | Wer steht hinter dieser deutschen Welt-Politik? | perspektivwechsel | Von der Strukturkarte zum Akteurs-Portrait. Wilhelm II. wird als personifizierter Treiber sichtbar. Brueckensatz: "Hinter dem deutschen Anspruch auf Welt-Macht stand ein Mann — schau ihn dir an." Quellenkritik wird zur Sicherungs-Methode (zurueck zu allen drei Spannungsfeldern). |

### 5.3 Sequenzkontext-Objekte (pro Material — fuer SUB-Dispatch in Phase 2.1)

| mat-ID | vorher (id, typ, Kerninhalt) | nachher (id, typ, Kerninhalt) |
|---|---|---|
| mat-01 | — | mat-04, darstellungstext, "Was ist ein Buendnis-System? Begriff, Mitglieder, Mechanismus." |
| mat-04 | mat-01, karte, "Europa 1914: zwei Buendnisse, sechs Grossmaechte." | mat-02, bildquelle, "HMS Dreadnought 1906 — Symbol des Flotten-Wettlaufs." |
| mat-02 | mat-04, darstellungstext, "Buendnis-System: Mitglieder + Mechanismus." | mat-05, statistik, "Quantifizierung: 29 vs. 17 Grossschiffe 1914." |
| mat-05 | mat-02, bildquelle, "HMS Dreadnought als Symbol des Flotten-Wettlaufs." | mat-06, karte, "Afrika 1914 — durch sieben europaeische Maechte aufgeteilt." |
| mat-06 | mat-05, statistik, "Britischer Vorsprung blieb (29 vs. 17)." | mat-03, bildquelle, "Wilhelm II. als personifizierter Treiber der Welt-Politik." |
| mat-03 | mat-06, karte, "Afrika-Aufteilung; Marokko = Konfliktanker DT vs. FR." | — (Sicherung in Hefteintrag) |

---

## 6. Perspektiven-Matrix (Multiperspektivitaet)

### 6.1 Matrix Perspektiven × Materialien

| Perspektive | mat-01 (Karte Buendnisse) | mat-02 (Dreadnought) | mat-03 (Wilhelm II.) | mat-04 (Darstellungstext) | mat-05 (Statistik) | mat-06 (Karte Afrika) | Abdeckung (von 6) |
|---|---|---|---|---|---|---|---|
| **Deutsche Reichsfuehrung** (Wilhelm II., Tirpitz) | (Mitglied DT-Block) | indirekt (Tirpitz-Plan als Ausloeser) | **HAUPT-PERSPEKTIVE** | indirekt | indirekt (DT-Spalte) | indirekt (DT-Maerkte) | 1 haupt + 5 indirekt |
| **Britische Reichsregierung** (Asquith, Grey, Royal Navy) | (Mitglied Triple Entente) | **HAUPT-PERSPEKTIVE** (RN-Selbstdoku) | — | (Triple Entente erwaehnt) | indirekt (GB-Spalte) | indirekt (GB-Kolonialgebiete) | 1 haupt + 4 indirekt |
| **Franzoesische Republik** | (Mitglied Triple Entente) | — | indirekt (Marokko-Konflikt) | (Triple Entente erwaehnt) | — | indirekt (FR-Maerkte, Marokko) | 0 haupt + 4 indirekt |
| **Russisches Zarenreich** | (Mitglied Triple Entente) | — | — | (Triple Entente erwaehnt) | — | — | 0 haupt + 2 indirekt |
| **Oesterreich-Ungarn / Italien** (Dreibund-Mitglieder) | (Mitglieder Dreibund) | — | — | (Dreibund erwaehnt) | — | — | 0 haupt + 2 indirekt |
| **Kolonisierte Bevoelkerung Afrikas** | — | — | — | indirekt (Kolonial-Begriffsfeld) | — | **HAUPT-PERSPEKTIVE** (BU markiert "Bevoelkerung wurde nicht gefragt") | 1 haupt + 1 indirekt |
| **Pazifisten / Kritiker DT-Welt-Politik** | — | — | indirekt (Quellenkritik dekonstruiert Inszenierung) | indirekt (im Synthese-Absatz "viele in DT unzufrieden") | — | — | 0 haupt + 2 indirekt |

### 6.2 Perspektiv-Tags-Plan (F0b §2 MATERIAL-PERSPEKTIV-01 / Inline-Tag-Pflicht F0b §M9)

| mat-ID | perspektiv_tags[] (Plan, wird inline im Material-Output gesetzt) | Begruendung |
|---|---|---|
| mat-01 | `["Aussen", "dominant"]` | Dominante europaeische Macht-Architektur, Aussenperspektive (Karten-Sicht) |
| mat-02 | `["dominant", "Macht-Ausuebung"]` | Britische Royal Navy als dominanter Akteur, technologische Macht-Ausuebung |
| mat-03 | `["dominant", "Macht-Ausuebung", "Kritik"]` | Kaiser-Selbstdarstellung (dominant, Macht-Ausuebung) ABER Quellenkritik macht es zu `Kritik`-Tag (Dekonstruktion der Inszenierung) — **NICHT-DOMINANT-Beitrag 1** |
| mat-04 | `["Aussen", "dominant"]` | Strukturanalyse aus europaeischer Sicht |
| mat-05 | `["Macht-Ausuebung", "dominant"]` | Quantitative Macht-Demonstration |
| mat-06 | `["Macht-Betroffen", "Kritik"]` | Sprach-Sieb-konforme BU thematisiert "Bevoelkerung wurde nicht gefragt" + Kritik der Aufteilungs-Perspektive — **NICHT-DOMINANT-Beitrag 2** |

**Coverage-Check (F0b §2):** 2 nicht-dominante Tags ueber alle 6 Materialien (`Kritik` in mat-03 + `Macht-Betroffen` + `Kritik` in mat-06). Ziel "min. 2 nicht-dominante Tags" **PASS**.

**Hinweis:** Die finalen `perspektiv_tags[]`-Arrays setzt der jeweilige SUB_MATERIAL-Subagent inline beim Material-Output (Phase 2.1, Schema-Pflichtfeld `perspektiv_tags`). Der Plan oben ist Dispatch-Constraint.

### 6.3 Fehlende Perspektiven (bewusste Luecken — Multiperspektiv-Policy STR-05)

| Fehlende Perspektive | Begruendung / Kompensation |
|---|---|
| Pazifistische Stimmen 1900-1914 (Bertha von Suttner, SPD-Antimilitarismus) | Nicht in M1, weil M1 Strukturen zeigt (vor dem Krieg). Pazifistische Stimmen werden in **M3** kompensiert (skeptische Land-Bevoelkerung, SPD-Anhaenger 1914). |
| Bosnisch-serbische / serbische Perspektive | Nicht relevant in M1; **M2** ist hierfuer der Hauptort (Princip, Junges Bosnien). |
| Belgische Bevoelkerung | Nicht relevant in M1; **M4** ist hierfuer der Hauptort (Belgien-Verletzung). |

Multiperspektivitaets-Policy STR-05 (`konflikttyp: true`) wird durch Hefteintrag M1 multiperspektivitaet[]-Block bereits deklariert (5 Perspektiven aufgefuehrt). Die Material-Realisierung deckt 4 davon direkt oder indirekt ab; die Kolonisierte-Bevoelkerung-Perspektive wird in mat-06 strukturell adressiert (Sprach-Sieb-Pflicht).

---

## 7. Erarbeitbarkeits-Nachweis (R7-altersgerecht, 7c)

### 7.1 Pro SCPL-Zone

| SCPL-Zone | Material(ien) | Erarbeitungsweg fuer 7c-SuS |
|---|---|---|
| **S** (Situation: Europa um 1900, sechs Grossmaechte) | mat-01 (Karte Buendnisse) | SuS lesen die Karten-Legende, identifizieren die 6 Maechte und ordnen sie den Bloecken zu. Visuelles Lernen, kein Lese-Hindernis. |
| **C1** (Buendnis-Bloecke) | mat-01 + mat-04 | Karte zeigt Bloecke; Darstellungstext erklaert den Begriff "Buendnis" und den Mechanismus. R7-Saetze (max. 15W, hauptsatz-dominant). |
| **C2** (Flotten-Wettruesten) | mat-02 + mat-05 | Foto + BU machen die Konkurrenz sinnlich greifbar; Statistik quantifiziert. SuS lesen 4-Zellen-Tabelle, vergleichen Spalten. |
| **C3** (Kolonialwettlauf, Marokko-Krisen) | mat-06 + mat-03 | Karte Afrika zeigt raeumliche Aufteilung; Wilhelm-II.-Portrait zeigt Akteur. SuS verstehen "Aufteilung" + "personifizierter Treiber". |
| **P** (Pulverfass) | mat-04 (Synthese-Absatz) | Drei Spannungen + zwei Buendnisse → Pulverfass-Metapher. SuS koennen Metapher mit eigenen Worten erklaeren (Alltags-Wissen "Pulverfass"). |
| **L** (Loesung / Merksatz) | Hefteintrag-Sicherung (kein eigenes Material) | Merksatz aus Hefteintrag-Sicherungs-Text uebernommen. |

### 7.2 Pro SCPL-Uebergang (kausal_mechanismus belegt)

| Uebergang | Material-Beleg | Wie SuS den Zusammenhang erschliessen |
|---|---|---|
| S → C1 | mat-01 → mat-04 | Karte (visuell) + Brueckensatz im Darstellungstext §1: "Sechs Maechte stehen sich gegenueber. Sie schliessen sich zu zwei Buendnissen zusammen." |
| C1 → C2 | mat-04 → mat-02 | Brueckensatz im Sequenz-Uebergang ("Aber war das alles? Was war noch los — auf den Meeren?"). Verknuepfung: Polarisierung → Wettruesten zur See. |
| C2 → C3 | mat-05 → mat-06 | Brueckensatz: "Beide Seiten haben gebaut — der britische Vorsprung blieb, die Spannung wuchs. Aber das Wettruesten zur See war nicht der einzige Streit." Verknuepfung Wettruesten-Eskalation → Kolonialkonkurrenz. |
| C3 → P | mat-06 → mat-03 → mat-04 (Synthese-Absatz) | Akteurs-Portrait Wilhelm II. macht den Treiber sichtbar (kausaler Mechanismus). Synthese-Absatz in mat-04 fasst alle drei Spannungsfelder zusammen. |
| P → L | mat-04 → Hefteintrag-Sicherung | Hefteintrag-Sicherungs-Text + Merksatz uebernehmen die Pulverfass-Metapher als Loesung. |

### 7.3 Voraussetzungs-Check (Vor-Mappe-Wissen)

M1 ist die **erste** Mappe — keine Vor-Mappe-Voraussetzungen. Alltags-Wissen wird angesprochen:
- "Pulverfass" als Metapher (alltagssprachlich)
- "Versprechen" als Konzept (Buendnis-Erklaerung)
- "Wettrennen" als Konzept (Flotten-Wettlauf)
- "Aufteilen" als Konzept (Kolonialwettlauf)

Alle vier Konzepte sind im R7-Wortschatz vorhanden — keine externen Voraussetzungen.

### 7.4 INFERENTIAL-Zonen-Check

Keine SCPL-Zone ist als INFERENTIAL gekennzeichnet. Alle 6 Zonen werden DIRECT durch Material erarbeitet (DIRECT-Quote 100%). `inferenz_stuetzen`-Plan entfaellt.

---

## 8. Einstieg und Sicherung

### 8.1 Einstieg

**Typ:** narrativ (Spurensucher-Setting fortgefuehrt)

**Text (Skript M1 Einstiegs-Kontext + agent-material-design Anpassung):**

> *Du oeffnest die erste Mappe. Auf dem Deckblatt steht ein einziges Wort: "Pulverfass". Was meint das? Du weisst: Ein Pulverfass kann jederzeit hochgehen. Es braucht nur einen Funken. Aber warum war Europa vor dem Krieg so ein Pulverfass? Die Antwort beginnt mit zwei grossen Buendnissen — und mit einem Wettlauf um Schiffe und um Land.*

**Tafelbild-Voraussetzung:** keine (M1 ist erste Mappe)

**Stundenfrage (aus Hefteintrag uebernommen):** Warum war Europa vor 1914 ein "Pulverfass"?

### 8.2 Sicherung

**Typ:** zusammenfassung + reflexion + ueberleitung (Sandwich-Anschluss zu M2)

**Verweis:** Sicherungs-Text + Merksatz aus HEFTEINTRAG_M1.md §B.3 + §B.5 (STRUKTUR-FREEZE, formulierungs-offen bis Phase 2.1c).

**Reflexionsimpuls (1 Satz):**
> *Was hast du jetzt verstanden — warum war Europa vor 1914 wie ein Pulverfass?*

**Ueberleitung zu M2 (Sandwich aus Skript M1):**
> *Du legst Mappe 1 zur Seite. Dein Befund: Europa war ein Pulverfass, lange bevor irgendjemand schoss. Aber wer hat den Funken geworfen? Mappe 2 zeigt dir den 28. Juni 1914. Ein Datum. Eine Stadt. Ein Schuss.*

---

## 9. Q-Gate Self-Check

| ID | Kriterium | Severity | Status | Evidenz |
|---|---|---|---|---|
| **MQ1** | SCPL-Abdeckung vollstaendig | BLOCKER | **PASS** | 6/6 Zonen DIRECT durch ≥1 Material erarbeitbar (§1.2) |
| **MQ2** | SCPL-Uebergaenge: jeder Uebergang ≥1 Material + kausal_mechanismus 1 Satz | BLOCKER | **PASS** | 5/5 Uebergaenge belegt (§1.3) |
| **MQ3** | Mindest-Material-Mix (1 Text, 1 Quelle/Bild, 1 personifiziert, 1 visuell, gesamt ≥4) | HIGH | **PASS** | 1 Darstellungstext + 2 Bildquellen + 1 Akteurs-Anker (mat-03) + 3 visuelle (mat-01/05/06); gesamt 6 (§2) |
| **MQ4** | Medienvielfalt-Ratio MV1 (max. 50% textbasiert) | HIGH | **PASS** | 1/6 textbasiert ≈ 17 % (§2) |
| **MQ5** | Erarbeitbarkeits-Nachweis pro Zone und Uebergang | BLOCKER | **PASS** | §7.1 + §7.2 vollstaendig |
| **MQ6** | Voraussetzungs-Check (kein ungesichertes Vorwissen) | HIGH | **PASS** | M1 ist erste Mappe, nur Alltags-Wissen referenziert (§7.3) |
| **MQ7** | Zielklarheit pro Material (Funktion + SCPL-Zone + Artefakt-Ref/Begruendung) | HIGH | **PASS** | §3 dokumentiert pro Material (6/6) |
| **MQ8** | Sequenzplan vollstaendig (Position, Funktion, FB, Uebergangsobjekte, Sequenzkontext) | HIGH | **PASS** | §5.1 + §5.2 + §5.3 |
| **MQ9** | Multiperspektiv-Matrix + Coverage min. 2 nicht-dominante Tags ueber Mappe (F0b §2) | BLOCKER | **PASS** | §6.1 Matrix mit 7 Perspektiv-Achsen; §6.2 Tag-Plan mit Coverage 2 nicht-dominant |
| **MQ10** | TERMINOLOGIE-01 (F0b §3, QG-07): Kolonial-Sprach-Sieb fuer mat-06 als verbindlicher Dispatch-Constraint dokumentiert | BLOCKER (bei Kategorie Kolonisierung) | **PASS** | §3 mat-06 mit `propaganda_kontextualisierung_noetig` + verbotene/erlaubte Begriffe explizit (mat-04 zusaetzlich gepruef-pflichtig) |
| **MQ11** | Cross-Konsistenz mit Phase-0-Outputs | HIGH | **PASS** | KE-Anker matcht DR §3; Tafelbild-Knoten 1:1 aus skript_struktur.json M1 + hefteintrag_struktur.json M1; alle 3 Bilder aus medien_katalog M1 verifiziert; alle 6 Materialien aus artefakt_inventar M1 uebernommen |
| **MQ12** | Bloom-/AFB-Konsistenz mit DR §5 | HIGH | **PASS** | Material-AFB I-II → II innerhalb DR-Korridor I-II (DR §5) |
| **MQ-SCHULART** | F-PB-45 Schulart-Konsistenz | BLOCKER | **PASS** | Header schulart "Mittelschule Bayern" konsistent mit DIDAKTIK_RAHMEN + Lehrplan-Pfad-Token "Mittelschule" |
| **F0b-PRIMING** | F0B_PRIMING_v1 Block aktiv (R7-Sprachniveau, MATERIAL-PERSPEKTIV-01, TERMINOLOGIE-01, UEBERLEITUNG-01) | BLOCKER | **PASS** | §0 dokumentiert + Dispatch-Constraints fuer SUB_MATERIAL-Agenten gesetzt |

### Gate-Urteil Phase 1 (Material-Design M1)

**PASS** — Alle BLOCKER (MQ1, MQ2, MQ5, MQ9, MQ10, MQ-SCHULART, F0b-PRIMING) PASS. Alle HIGH (MQ3, MQ4, MQ6, MQ7, MQ8, MQ11, MQ12) PASS. Keine WARN, keine FAIL. Blueprint ist bereit fuer User-Validierung (Phase 1.5 Gate). Erst nach User-Freigabe wird Phase 2.1 (Subagenten-Produktion) gestartet.

**Validierungsstatus:** ENTWURF (User-Validierung ausstehend).

---

## 10. Meta

| Feld | Wert |
|---|---|
| game_id | gpg-erster-weltkrieg-ursachen-run4-v050 |
| run_id | run-4-2026-04-26 |
| mappe_id | M1 |
| phase | 1 (Material-Design) |
| agent | agent-material-design |
| schema_version | material_geruest_v1 |
| vertrag_version | VERTRAG_PHASE_2-1_MATERIAL (Design-Schritt) + Plugin v0.5.0 |
| f_pb_addressed | F-PB-45 (QD-SCHULART), F-PB-47 (Skript-Wortzahl-Korridor referenziert), F-PB-44 (Trigger-Sichtbarkeit-Policy) |
| trigger_flags_aktiv | konflikt, kolonialismus, nationalismus, weltkrieg_grossereignis |
| F0b-Block-Hash-Kennung | F0B_PRIMING_v1 |
| naechste_phase | Phase 1.5 User-Validierung → Phase 2.1 (agent-material-dispatcher orchestriert SUB_MATERIAL-Agenten pro Material) |
