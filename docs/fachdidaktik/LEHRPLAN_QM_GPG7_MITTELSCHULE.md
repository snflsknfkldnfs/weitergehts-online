# LEHRPLAN-QM GPG 7 Mittelschule Bayern

**Version:** 0.1 (L1 Framework)
**Stand:** 2026-04-19
**Status:** ENTWURF (L2 ausstehend)
**Owner:** PM (Paul) + Subagenten-Kette L1-L4
**Aufbau-Plan:** `docs/fachdidaktik/LP_QM_AUFBAU_PLAN.md`
**Typ:** Fundament-Artefakt (Single-Source-of-Truth-Referenz)

---

## §1 Zweck und Geltungsbereich

### 1.1 Zweck

Dieses Artefakt ist die **kanonische, actionable Single-Source-of-Truth (SSoT)** für alle Lehrplanbezüge im weitergehts.online-Projekt. Es exzerpiert und formatiert die LehrplanPlus-Setzungen Bayern für das Fach Geschichte/Politik/Geographie (GPG), Mittelschule, Jahrgangsstufe 7 (Mittlere-Reife-Klasse / Regelklasse), so dass:

1. **Auditor-Agenten** (z.B. F0e Didaktisches Audit) auf definierte Kompetenzen/Inhalte/Q-Gates referenzieren können, ohne selbst WebSearches ausführen zu müssen.
2. **Generator-Agenten** (Escape-Game-Generatoren) LP-Coverage prüfen können (welche Kompetenzen werden durch eine UE bedient).
3. **Schriftwesen-Skills** (gpg7b-/gpg7c-Schriftwesen) TUV-Lernziele aus kanonischen Kompetenzerwartungen ableiten.
4. **Entwickler/Lehrkraft** konsistente Operationalisierung ohne Lehrplan-Recherche-Overhead erhält.

### 1.2 Geltungsbereich

- **Fach:** Geschichte/Politik/Geographie (GPG)
- **Schulart:** Mittelschule Bayern
- **Jahrgangsstufe:** 7
- **Ausprägung:** Regelklasse + Mittlere-Reife-Klasse (im Fachlehrplan identisch)
- **Lernbereiche:** LB1-LB4 (alle vier)

### 1.3 Abgrenzung (Nicht-Scope)

- **Themenbezogene Deep-Dives** (Nationalismus/Imperialismus/Industrialisierung/1. Weltkrieg/Französische Revolution/Absolutismus/Jugendstrafrecht) → verschoben auf dedizierte Deep-Dive-Artefakte in weiteren Prozessen
- **Fächerverbindende Detail-Planung** → Integration durch Skill-Ebene (gpg7b/gpg7c)
- **Andere Jahrgangsstufen** (GPG5/6/8/9) → separate QM-Artefakte bei Bedarf
- **Andere Schularten** (Realschule/Gymnasium) → nicht abgedeckt

### 1.4 Versionierung

- **MAJOR:** Strukturelle Änderungen (neue Sektion, LB-Änderung im LP)
- **MINOR:** Inhalts-Befüllung (L1→L2→L3)
- **PATCH:** Fehlerkorrekturen, Formulierungsschliff
- Aktuelle Version: **v0.1** (L1 Framework ohne §6-Befüllung)

---

## §2 Quellen-Kanon

### 2.1 Primärquellen (LehrplanPlus Bayern, offiziell ISB)

| ID | Quelle | URL | Zugriff |
|----|--------|-----|---------|
| Q1 | Fachlehrplan GPG 7 Mittelschule Mittlere-Reife-Klasse | `lehrplanplus.bayern.de/fachlehrplan/mittelschule/7/gpg/mittlere-reife-klasse` | 2026-04-19 |
| Q2 | Fachprofil GPG Mittelschule 7 | `lehrplanplus.bayern.de/fachprofil/mittelschule/gpg/7` | 2026-04-19 |
| Q3 | Bildungs- und Erziehungsauftrag Mittelschule 7 GPG | `lehrplanplus.bayern.de/bildungs-und-erziehungsauftrag/mittelschule/7/gpg` | 2026-04-19 |
| Q4 | Übergreifende Bildungs- und Erziehungsziele GPG 7 | `lehrplanplus.bayern.de/uebergreifende-ziele/mittelschule/gpg/7` | 2026-04-19 |
| Q5 | Jahrgangsstufenprofil GPG 7 (Grundlegende Kompetenzen) | `lehrplanplus.bayern.de/jahrgangsstufenprofil/mittelschule/7/auspraegung/regelklasse/gpg` | 2026-04-19 |

### 2.2 Interner Entwurf (bereits abgelegt)

- `/sessions/admiring-optimistic-cerf/mnt/weitergehts-online/assets/Lehrplan_GPG7.md` — Entwurf mit LB1-LB4 verbatim + Jahrgangsstufenprofil verbatim (Stand vor diesem Dokument)

### 2.3 Zitier-Regeln

- **Verbatim** nur wenn durch Q1-Q5 belegt
- **Paraphrase/Synthese** klar als solche markiert (Tag: *Synthese*)
- **Zugriffsdatum zwingend** bei jedem Zitat (Bayern LP-Updates passieren einmal jährlich)
- **Bei Zweifel:** `PENDING: <Grund>` statt Halluzination

### 2.4 Bekannte Lücken (dieser Version)

- Q3 WebFetch lieferte nur generische Mittelschul-Inhalte, keine GPG-7-spezifische Erziehungsauftrag-Seite → §5 Abschnitt BuE stützt sich auf Bayerische Verfassung Art. 131 + Mittelschul-Allgemein
- Q2 WebFetch-Extrakt ist teils Paraphrase (keine 1:1-Zitate verfügbar) → §4 arbeitet mit Synthese-Tag

---

## §3 Kompetenzstrukturmodell GPG

### 3.1 Modell-Übersicht *[Quelle: Q2, Synthese]*

Das Kompetenzstrukturmodell GPG besteht aus **drei konzentrischen Ebenen**:

```
┌─────────────────────────────────────────────────────┐
│  Äußerer Ring: PROZESSBEZOGENE KOMPETENZEN          │
│  • Erkenntnisse gewinnen                            │
│  • Beurteilen und bewerten                          │
│  • Anwenden und handeln                             │
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │  Mittlerer Ring: PERSPEKTIVEN                 │  │
│  │  • historisch  • sozialwissenschaftlich       │  │
│  │  • geographisch                               │  │
│  │                                               │  │
│  │  ┌───────────────────────────────────────┐    │  │
│  │  │  Kern: GEGENSTANDSBEREICHE            │    │  │
│  │  │  • Räume       • Ordnungssysteme      │    │  │
│  │  │  • Interessen  • Kulturen  • Werte    │    │  │
│  │  └───────────────────────────────────────┘    │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### 3.2 Gegenstandsbereiche (5)

| Nr | Bereich | Kernfrage |
|----|---------|-----------|
| G1 | **Räume** | Wie orientieren sich Menschen in geographischen Räumen? |
| G2 | **Ordnungssysteme** | Welche gesellschaftlichen/wirtschaftlichen/politischen Strukturen wirken? |
| G3 | **Interessen** | Wie entstehen Konflikte, wie werden sie demokratisch gelöst? |
| G4 | **Kulturen** | Wie prägen kulturelle Einflüsse menschliches Zusammenleben? |
| G5 | **Werte** | Welche gemeinschaftstragenden Werte wirken in der Lebenswelt? |

### 3.3 Prozessbezogene Kompetenzen (3)

| Nr | Kompetenz | Operationalisierung |
|----|-----------|---------------------|
| P1 | **Erkenntnisse gewinnen** | Beobachtung, Interpretation, fachspezifische Arbeitsweisen (Kartenarbeit, Quellenkritik, Statistik) |
| P2 | **Beurteilen und bewerten** | Orientierung in Raum, Zeit, Gesellschaft aus verschiedenen Perspektiven; Multiperspektivität |
| P3 | **Anwenden und handeln** | Informationserschließung, Fachsprache, reflektiertes Handeln (Urteil → Handeln) |

### 3.4 Perspektiven (3)

| Nr | Perspektive | Fokus |
|----|-------------|-------|
| PE1 | **Historisch** | Entwicklung menschlicher Gesellschaft in Zeit und Raum |
| PE2 | **Sozialwissenschaftlich** | Politische/gesellschaftliche/wirtschaftliche Strukturen → demokratisches Bewusstsein |
| PE3 | **Geographisch** | Naturgeographische/ökologische/soziale Strukturen → Nachhaltigkeit |

### 3.5 Verbindliche Implikation für Audit und Generator

Jede UE muss sich **mindestens einer Perspektive (PE1/PE2/PE3)** klar zuordnen lassen UND **mindestens eine prozessbezogene Kompetenz (P1/P2/P3)** explizit fördern. Nachweis über Gegenstandsbereiche (G1-G5) zeigt inhaltliche Verankerung.

---

## §4 Fachprofil GPG Mittelschule 7 *[Quelle: Q2, Synthese]*

### 4.1 Selbstverständnis des Faches

> "Wechselseitige soziale und politische Beziehungen der Menschen in ihrem unmittelbaren Umfeld" werden aus historischer, sozialwissenschaftlicher und geographischer Perspektive behandelt. Zentral: Entwicklung von **Geschichtsbewusstsein** durch **narrative Kompetenz** (reflektiertes historisches Erzählen).

Kernauftrag der Jahrgangsstufe 7:
- Orientierung in Natur- und Kulturräumen der Erde (Asien, Afrika)
- Ressourcenbegrenzung + nachhaltige Lebensgestaltung
- Verhältnis Individuum ↔ Gesellschaft
- Demokratische Grundordnung verstehen
- Interkulturelle Perspektiven entwickeln

### 4.2 Aufbau des Fachlehrplans (4 Lernbereiche)

| LB | Titel | Kern |
|----|-------|------|
| **LB1** | Lebensraum Erde | Naturgeographische/ökologische/soziale Strukturen; zukunftsfähige Umweltgestaltung |
| **LB2** | Zeit und Wandel | Geschichtsbewusstsein durch Vergangenheit; Entwicklungszusammenhang zur Gegenwart |
| **LB3** | Politik und Gesellschaft | Politische Ordnungssysteme, Kulturen, Werte, Schlüsselprobleme |
| **LB4** | Lebenswelt | Lebensweltliche Themen + gesellschaftliche Partizipation |

### 4.3 Zusammenarbeit mit anderen Fächern

Anknüpfungspunkte: Deutsch, Mathematik, Natur und Technik, Kunst, Musik, Religionslehre, Ethik.
Fächerübergreifende Projekte sind besonders geeignet.
Mehrsprachige Schüler werden beim Fachsprachenerwerb unterstützt.

### 4.4 Beitrag zu übergreifenden Bildungszielen (Fachprofil-Synthese)

Das Fachprofil nennt als Schwerpunkte:
- Bildung für Nachhaltige Entwicklung (Zielkonflikte ökologisch/ökonomisch/sozial)
- Interkulturelle Bildung
- Kulturelle Bildung
- Medienbildung (kritische Mediennutzung)
- Politische Bildung (demokratische Urteilskompetenz)
- Soziale Bildung (Inklusion)
- Sprachliche Bildung (Fachsprache)
- Technische Bildung (Chancen/Risiken)
- Werteerziehung (demokratische Partizipation)
- Berufliche Orientierung (Wirtschaftsfaktoren)

(Vollständige UebZ-Matrix siehe §5.3.)

---

## §5 Bildungs- und Erziehungsauftrag + Übergreifende Ziele

### 5.1 Verfassungsgrundlage *[Quelle: Q3, Verbatim-Zitat Art. 131 BV]*

**Art. 131 Verfassung des Freistaates Bayern** (Auszug):

1. Die Schulen sollen nicht nur Wissen und Können vermitteln, sondern auch **Herz und Charakter bilden**.
2. Oberste Bildungsziele sind Ehrfurcht vor Gott, Achtung vor religiöser Überzeugung und vor der Würde des Menschen, Selbstbeherrschung, Verantwortungsgefühl, Hilfsbereitschaft, Aufgeschlossenheit für alles Wahre, Gute und Schöne, Umweltbewusstsein.
3. Die Schüler sind zu erziehen im Geiste der Demokratie, in der Liebe zur bayerischen Heimat und zum deutschen Volk und im Sinne der Völkerversöhnung.

### 5.2 Struktureller Rahmen des Erziehungsauftrags Mittelschule *[Quelle: Q3, Synthese]*

Sechs Hauptabschnitte definieren den Auftrag der Mittelschule:

| Nr | Abschnitt | Kern |
|----|-----------|------|
| A1 | Anspruch und Profil | Mittelschule als allgemeinbildende Schule (Regelklassen + Mittlere-Reife-Klassen) |
| A2 | Schülerinnen und Schüler | Entwicklungsstand, Peergroups, anschauliches Denken |
| A3 | Lernen, Leisten, Leben | Kompetenzorientierung, Lehrer als Lernbegleiter, Leistungskultur |
| A4 | Gesellschaftlicher Kontext | Schule als Lebensraum, Elternpartnerschaft, externe Kooperationen |
| A5 | Übergänge | Grundschule ↔ MS ↔ Beruf/weiterführende Schulen |
| A6 | Qualitätsentwicklung | Evaluation, kontinuierliche Verbesserung |

**Hinweis:** Die GPG-7-spezifische Ausprägung wird im LP nicht gesondert ausgeführt — der Auftrag wirkt über das Fachprofil (§4) in den Unterricht.

### 5.3 Übergreifende Bildungs- und Erziehungsziele (UebZ) — Matrix für GPG 7 *[Quelle: Q4, Synthese]*

15 UebZ sind formal verankert. Spalte "GPG-Relevanz" klassifiziert nach Intensität der Verankerung (**K** = Kernauftrag | **S** = starke thematische Berührung | **I** = indirekt).

| Nr | UebZ | GPG-Relevanz | Primärer LB-Anknüpfungspunkt |
|----|------|--------------|------------------------------|
| U01 | Alltagskompetenz und Lebensökonomie | I | LB4 (Lebenswelt) |
| U02 | Berufliche Orientierung | S | LB3, LB4 |
| U03 | Bildung für Nachhaltige Entwicklung | **K** | LB1 (Ressourcen) |
| U04 | Familien- und Sexualerziehung | I | (schulisches Gesamtkonzept) |
| U05 | Gesundheitsförderung | I | LB1 (Konsum-Reflexion), LB4 |
| U06 | Interkulturelle Bildung | **K** | LB1, LB2 (Kolonialismus), LB3 |
| U07 | Kulturelle Bildung | S | LB2 |
| U08 | Medienbildung/Digitale Bildung | S | alle LBs (Recherche/Quellenkritik) |
| U09 | Ökonomische Verbraucherbildung | S | LB1 (Textil/Coltan), LB3 (Industriegesellschaft) |
| U10 | Politische Bildung | **K** | LB2 (Absolutismus↔Demokratie, Revolution), LB3, LB4 |
| U11 | Soziales Lernen | S | LB3 (Soziale Frage), LB4 |
| U12 | Sprachliche Bildung | S | alle LBs (Fachsprache) |
| U13 | Technische Bildung | I | LB2 (Industrialisierung, Stellungskrieg) |
| U14 | Verkehrserziehung | I | — |
| U15 | Werteerziehung | **K** | LB2, LB3, LB4 |

**Implikation für Audit:**
- Kern-UebZ (**K**) = **U03, U06, U10, U15** MÜSSEN in jeder thematisch passenden UE aktiv angesprochen werden
- Starke (**S**) sollen bei thematischer Nähe explizit adressiert werden
- Eine UE, die thematisch U06 berührt (z.B. Kolonialismus) OHNE interkulturelle Sensibilität → Coverage-Gap

---

## §6 Lernbereiche LB1-LB4 (actionable Profile)

**Status:** Skeleton in v0.1. Sub-Sections 6.X.4 (Operationalisierungs-Hinweise), 6.X.5 (Coverage-Prüfpunkte), 6.X.6 (Beispiele kompetent/nicht-kompetent), 6.X.7 (UebZ-Verknüpfung konkret), 6.X.8 (Anti-Patterns) werden in **Phase L2** durch Subagent befüllt.

**Verbatim-Quellen:** Kompetenzerwartungen + Inhalte stammen aus Q1 (Fachlehrplan GPG 7), abgelegt in `assets/Lehrplan_GPG7.md`. Grundlegende Kompetenzen stammen aus Q5 (Jahrgangsstufenprofil).

---

### §6.1 LB1: Lebensraum Erde

#### 6.1.1 Kompetenzerwartungen *[Quelle: Q1, Verbatim]*

Die Schülerinnen und Schüler …

- orientieren sich topographisch und naturräumlich auf den Kontinenten Asien und Afrika mit verschiedenen geographischen Hilfsmitteln (z. B. Globus, Karte).
- stellen den aktuellen Entwicklungsstand ausgewählter Länder dar, indem sie die Wirtschafts- und Bevölkerungsentwicklung sowie die dortigen Lebensbedingungen unter ausgewählten Aspekten (z. B. Alltagsleben Gleichaltriger in der Großstadt und auf dem Land) miteinander vergleichen.
- recherchieren ausgehend von ihrem eigenen Konsumverhalten die Auswirkungen der Ressourcennutzung auf Mensch und Natur in ausgewählten Entwicklungs- und Schwellenländern (z. B. Textilproduktion, mobile Kommunikationsmittel) und reflektieren kritisch ihr eigenes Konsumverhalten.

#### 6.1.2 Inhalte *[Quelle: Q1, Verbatim]*

- Kontinente Asien, Afrika: Topographie, Naturraum, Klimazonen
- Entwicklungszusammenhänge (z. B. Ursachen der Armut in globaler Perspektive, Bildung als Schlüssel für Entwicklung) in Entwicklungs- und Schwellenländern (z. B. Kongo, Indien)
- Ressourcen (z. B. Baumwolle und „virtuelles Wasser" bei der Jeansproduktion, Coltan für mobile Kommunikationsgeräte)
- Anbau- und Produktionsbedingungen

#### 6.1.3 Grundlegende Kompetenzen (Auszug Jahrgangsstufenprofil) *[Quelle: Q5, Verbatim]*

- Die Schülerinnen und Schüler orientieren sich auf den Kontinenten Asien und Afrika auf der Grundlage eines vertieften Kartenverständnisses.
- Sie stellen den Entwicklungsstand ausgewählter Länder gegenüber und begründen deren Unterschiede.
- Die Schülerinnen und Schüler stellen Auswirkungen der Ressourcennutzung in ausgewählten Entwicklungs- und Schwellenländern dar und hinterfragen diesbezüglich ihr eigenes Konsumverhalten kritisch.

#### 6.1.4 Operationalisierungs-Hinweise

- **OH-1:** Topographie Asien/Afrika ist Mittel, nicht Zweck. Prüfbare Handlung: SuS lokalisieren ein Land auf Karte/Globus UND verknüpfen Lage mit einer naturräumlichen Eigenschaft (z. B. Klimazone, Großlandschaft). Reines Nachzeichnen/Beschriften genügt nicht. Kompetenzebene: P1 + PE3; Gegenstandsbereich: G1.
- **OH-2:** Entwicklungsstand vergleichen erfordert mindestens ZWEI Indikatoren aus mindestens zwei Dimensionen (z. B. Wirtschaft: BIP/Kopf; Bevölkerung: Säuglingssterblichkeit oder Analphabetenquote). Aufgabenstellung muss Gegenüberstellung (nicht Addition) verlangen. Kompetenzebene: P1 + P2; Perspektive: PE3 (sozialgeographisch).
- **OH-3:** "Alltagsleben Gleichaltriger" (LP-Beispiel) ist Personalisierungs-Anker: Eine SuS-adressierbare Vergleichsaufgabe (Kind in Mumbai vs. Kind in indischem Dorf, Schulweg/Mahlzeiten/Arbeit) ist LP-treuer als abstrakte Indikator-Tabelle. Beides ist zulässig, Personalisierung hat Priorität.
- **OH-4:** Konsum-Reflexion muss ICH-Bezug erzwingen. Prüfbare Handlung: SuS benennen ein konkretes Produkt aus eigenem Besitz (Jeans, Smartphone) UND leiten eine persönliche Handlungsoption (ändern/beibehalten/begründen) ab. Kompetenzebene: P2 + P3; UebZ: U03 Kern, U09.
- **OH-5:** Ressourcen-Kette ist Pflicht-Element: Rohstoff → Produktionsland → Auswirkung auf Mensch/Natur → Endprodukt in DE. Eine UE, die nur den Endkonsum thematisiert ohne Rückverfolgung, verfehlt den Lehrplanauftrag. LP-Beispiele (Baumwolle/virtuelles Wasser, Coltan) sind exemplarisch, nicht abschließend.

#### 6.1.5 Coverage-Prüfpunkte

Eine UE deckt LB1 substanziell ab, wenn:

- [ ] **CP-1:** Bearbeitet die UE mindestens einen der beiden LP-Kontinente (Asien ODER Afrika) mit konkretem Länderbezug (nicht generisch "Globaler Süden")?
- [ ] **CP-2:** Wird topographische/naturräumliche Orientierung aktiv gefordert (Kartenarbeit, Lagezuordnung, Klimazone), nicht nur als Illustration?
- [ ] **CP-3:** Enthält die UE einen expliziten Entwicklungsstand-Vergleich mit ≥2 Indikatoren (Wirtschaft UND Bevölkerung/Lebensbedingungen)?
- [ ] **CP-4:** Ist ein Ressourcen-Wertschöpfungsbezug (Rohstoff → Produktion → Konsum) hergestellt?
- [ ] **CP-5:** Wird eigenes Konsumverhalten der SuS explizit reflektiert (ICH-Bezug, nicht "man sollte")?
- [ ] **CP-6:** Ist mindestens eine Perspektive PE3 (geographisch) klar erkennbar, idealerweise ergänzt um PE2 (sozialwissenschaftlich)?
- [ ] **CP-7:** Wird mindestens eine prozessbezogene Kompetenz (P1 Erkenntnisse gewinnen, P2 Beurteilen, P3 Anwenden/Handeln) explizit gefordert?
- [ ] **CP-8:** Adressiert die UE das Kern-UebZ U03 (Nachhaltigkeit) substanziell (Zielkonflikt ökologisch/ökonomisch/sozial sichtbar)?
- [ ] **CP-9:** Ist U06 (Interkulturelle Bildung) durch Perspektivwechsel auf Menschen im Produktionsland eingebunden (nicht nur europäischer Blick)?
- [ ] **CP-10:** Sind die Materialien (Karten, Statistiken, Quellen) für MS-Jgst. 7 sprachlich und mengenmäßig angemessen (Fachsprachen-Gerüst vorhanden, vgl. U12)?

Mindest-Schwelle: **≥7 von 10** Items JA. Begründung: CP-1/2/3/4/5 sind Kernforderungen der drei Kompetenzerwartungen (6.1.1); CP-8 ist Kern-UebZ. Eine UE, die unter 7 JA fällt, hat entweder zu wenig LB1-Substanz oder bleibt auf Reproduktionsebene.

#### 6.1.6 Beispiele kompetent vs. nicht-kompetent

**Beispielpaar 1: Topographie Afrika**

- *Kompetent:* SuS erhalten eine stumme Afrika-Karte und eine Liste von fünf Ländern mit je einer kurzen Klima-/Landschaftsbeschreibung. Aufgabe: Land einordnen UND mit Klimazone/Vegetationszone abgleichen; Begründung mit Atlas-Evidenz.
- *Nicht kompetent:* SuS beschriften eine stumme Karte mit 10 Hauptstädten auswendig. Lösung ist reine Reproduktion.
- *Warum:* Die Kompetenzerwartung fordert "orientieren … mit verschiedenen geographischen Hilfsmitteln" — Zuordnung plus Begründung aktiviert P1/PE3, Beschriftung nicht.

**Beispielpaar 2: Entwicklungsstand Indien vs. Kongo**

- *Kompetent:* SuS füllen eine Vergleichstabelle (BIP/Kopf, Säuglingssterblichkeit, Alphabetisierung, Zugang sauberes Wasser) für Indien und Kongo aus Datenquelle aus und formulieren EINEN Satz: "Indien ist in X weiter, in Y zurück." Anschließend: Erklärungs-Hypothese.
- *Nicht kompetent:* SuS lesen einen Text über "arme Länder in Afrika" und kreuzen in einem Quiz an, welche der Länder "Entwicklungsland" sind.
- *Warum:* Die Kompetenzerwartung fordert "Wirtschafts- und Bevölkerungsentwicklung … miteinander vergleichen" — das setzt strukturierte Gegenüberstellung mit Indikatoren voraus, keine Kategorisierung.

**Beispielpaar 3: Konsum-Reflexion Jeans**

- *Kompetent:* SuS rechnen anhand einer Infografik das virtuelle Wasser EINES Kleidungsstücks aus ihrem eigenen Schrank aus, diskutieren in Partnerarbeit eine konkrete Handlungsoption (Second-Hand, weniger neu kaufen, gezielt Siegel), notieren ihre Entscheidung und begründen sie.
- *Nicht kompetent:* SuS bekommen eine Infografik "So viel Wasser braucht eine Jeans" und beantworten die Frage "Was sollte man tun?" in einem Satz.
- *Warum:* "reflektieren kritisch ihr eigenes Konsumverhalten" verlangt ICH-Bezug und Begründung einer Handlungsoption (P3). Generische Soll-Aussagen sind Meinung, nicht Reflexion.

#### 6.1.7 UebZ-Verknüpfung konkret

Gemäß §5.3 sind für LB1 relevant: **U03 (K), U06 (K), U08 (S), U09 (S)**.

- **U03 (Bildung für Nachhaltige Entwicklung, Kern):** Zielkonflikt wird konkret, wenn eine UE-Aufgabe drei Perspektiven gleichzeitig fordert — z. B. beim Coltan-Thema: ökologisch (Regenwald-Rodung), ökonomisch (Arbeitsplätze Kongo/Preise für DE-Konsumenten), sozial (Kinderarbeit). Sichtbar im Material: Drei-Säulen-Tabelle oder Dilemma-Karte.
- **U06 (Interkulturelle Bildung, Kern):** Wird sichtbar, wenn eine UE eine Stimme aus dem Produktionsland einbindet (Interview-Auszug einer Näherin in Bangladesch, O-Ton eines Coltan-Arbeiters, Alltag eines Gleichaltrigen in Mumbai). Rein deutsche/europäische Beobachterperspektive erfüllt U06 NICHT.
- **U08 (Medienbildung/Digitale Bildung, Stark):** Sichtbar, wenn SuS Quellen kritisch prüfen — z. B. zwei Infografiken zum virtuellen Wasser vergleichen, Herausgeber identifizieren (NGO vs. Industrie-Verband), Plausibilität bewerten.
- **U09 (Ökonomische Verbraucherbildung, Stark):** Sichtbar, wenn Preisbildung/Wertschöpfungskette thematisiert wird — z. B. "Wie viel vom Jeans-Verkaufspreis landet bei der Näherin?"-Aufgabe. Reines Moralappell-Material reicht nicht.

#### 6.1.8 Anti-Patterns

- **AP-1:** Afrika als "ein Land" — Symptom: UE spricht von "dem Afrikaner", "den afrikanischen Verhältnissen", ohne Länderdifferenzierung. Verstoß: Kompetenzerwartung fordert "ausgewählte Länder" explizit; U06 verletzt. Fix: Mindestens zwei konkrete Länder namentlich nennen und differenzieren (Kongo ≠ Südafrika).
- **AP-2:** Mitleids-Narrativ statt Analyse — Symptom: UE präsentiert Armut emotional (Fotos leidender Kinder) ohne strukturelle Ursachen. Verstoß: Kompetenzerwartung fordert "Entwicklungsstand darstellen" (analytisch) + "Ursachen" (Inhalte 6.1.2); U06 verletzt. Fix: Statistische/strukturelle Ursachen (Kolonialerbe, Handelsstrukturen, Bildungszugang) einfügen.
- **AP-3:** Konsumreflexion ohne ICH — Symptom: SuS beantworten "Was könnte man tun?" in allgemeiner Du-Form. Verstoß: LP verlangt "reflektieren kritisch ihr eigenes Konsumverhalten" — ICH-Bezug. Fix: Aufgabe umstellen auf "Ich trage gerade … — meine konkrete nächste Entscheidung ist …".
- **AP-4:** Karten-Deko statt Kartenarbeit — Symptom: Eine Afrika-Karte ist als Hintergrundbild abgebildet, aber Aufgabenstellung nutzt sie nicht. Verstoß: "orientieren sich topographisch … mit geographischen Hilfsmitteln"; P1 nicht aktiviert. Fix: Konkrete Leseaufgabe an die Karte binden (Ort lokalisieren, Entfernung schätzen, Klimazone ablesen).
- **AP-5:** Virtuelles-Wasser-Rechnen als Selbstzweck — Symptom: SuS rechnen Literzahlen aus, ohne Bedeutung für Konsumverhalten abzuleiten. Verstoß: LP-Kompetenz fordert Reflexion + Handlungsoption. Fix: Rechenergebnis an Konsumentscheidung koppeln.
- **AP-6:** Europäische Exotik-Brille — Symptom: Naturraum Asien/Afrika wird über "fremd/faszinierend"-Bilder (Wüste, Savanne, Elefanten) vermittelt, ohne Lebensrealität der Menschen. Verstoß: G1 (Räume) korrekt, aber G4 (Kulturen) und U06 fehlen. Fix: Mensch-Umwelt-Bezug statt Landschafts-Exotik.

---

### §6.2 LB2: Zeit und Wandel

#### 6.2.1 Kompetenzerwartungen *[Quelle: Q1, Verbatim]*

Die Schülerinnen und Schüler …

- nutzen den Vergleich zwischen absolutistischer und demokratischer Regierungsform, um den Wert der politischen Mitbestimmungsmöglichkeiten in einer Demokratie (z. B. in der Bundesrepublik Deutschland) beurteilen zu können.
- übertragen ihre Kenntnisse über den nicht linearen Verlauf der Französischen Revolution auf Revolutionen der Gegenwart, um vergleichbare aktuelle Entwicklungen nachvollziehen zu können.
- stellen in Grundzügen die Industrialisierung aus unterschiedlichen Perspektiven dar (z. B. technischer Wandel).
- beschreiben die nationalstaatlichen Einigungsbestrebungen und die deutsche Reichsgründung.
- erklären, dass die traditionellen europäischen Mächterivalitäten und der imperialistische Wettlauf um Kolonien in den Ersten Weltkrieg mündeten.
- stellen die Ereignisse des Attentats von Sarajevo dar und diskutieren den Zusammenhang zwischen Ursachen und Auslöser eines Konfliktes anhand eines aktuellen Beispiels.
- beschreiben anhand von historischen Spuren den Verlauf des Ersten Weltkrieges für die Menschen an der Front und in der Heimat.
- beschreiben die Auswirkungen des Ersten Weltkrieges auf den Alltag der Menschen in der Heimat sowie an der Front und diskutieren anhand aktueller Beispiele die unmittelbaren Folgen von Kriegen für die Menschen.

#### 6.2.2 Inhalte *[Quelle: Q1, Verbatim]*

- Selbstverständnis eines absolutistischen Herrschers am Beispiel Ludwig XIV., Selbstverständnis eines demokratischen Amtsinhabers
- Französische Revolution: wichtige Beweggründe, grober Verlauf einzelner Phasen (z. B. Napoleonische Ära)
- Industrialisierung: technische und wirtschaftliche Entwicklung
- deutsche Reichsgründung
- Imperialismus: Rivalität der europäischen Nationalstaaten, Kolonialisierung am Beispiel Afrikas
- Ursachen und Verlauf des Ersten Weltkrieges: Attentat von Sarajevo, Stellungskrieg, Technisierung des Krieges, Heimatfront

#### 6.2.3 Grundlegende Kompetenzen (Auszug Jahrgangsstufenprofil) *[Quelle: Q5, Verbatim]*

- Sie ordnen die Industrialisierung zeitlich und räumlich ein und stellen deren Auswirkungen auf Wirtschaft, Technik und Gesellschaft dar.
- Sie setzen sich mit politischen und sozialen Entwicklungen auseinander, um zu bewerten, warum diese in der Geschichte nicht nur linear verlaufen und weshalb politisches Engagement (z. B. Revolution 1848) nicht unmittelbar zum Erfolg führen muss.
- Die Schülerinnen und Schüler zeichnen wesentliche Ursachen, Auswirkungen und den Verlauf des Ersten Weltkrieges nach.
- Sie stellen Bezüge zwischen historischen Wertvorstellungen und der Entwicklung unseres heutigen Wertesystems her.

#### 6.2.4 Operationalisierungs-Hinweise

- **OH-1:** Absolutismus↔Demokratie-Vergleich ist Beurteilungs-Aufgabe, nicht Definitionsabfrage. Prüfbare Handlung: SuS ordnen je zwei Merkmale (z. B. Herrschaftslegitimation, Mitbestimmung, Rechtsbindung) Ludwig XIV. vs. einem demokratischen Amtsinhaber (z. B. BKanzler/-in) zu UND leiten daraus ein Werturteil zum Mitbestimmungs-Wert ab. Kompetenzebene: P2; Gegenstandsbereich: G2 + G5.
- **OH-2:** "Nicht linearer Verlauf" ist Schlüssel-Operator der Französischen Revolution. Prüfbare Handlung: SuS markieren auf einem Phasen-Zeitstrahl (1789 → Jakobinerdiktatur → Napoleon → Restauration) mindestens einen Rückschlag ODER Richtungswechsel UND übertragen das Muster auf ein aktuelles Revolutions-Beispiel (z. B. Arabischer Frühling). Rein chronologische Nacherzählung verfehlt die Kompetenz.
- **OH-3:** Industrialisierung "aus unterschiedlichen Perspektiven" verlangt mindestens zwei Sichtweisen (z. B. Fabrikbesitzer, Arbeiterin, Kind, Landbevölkerung). Aufgabenformat: Perspektiv-Karten-Set mit zwei O-Tönen oder Rollenmonologe. Einzelperspektive verfehlt LP-Wortlaut.
- **OH-4:** Reichsgründung/Einigungsbestrebungen — Operator "beschreiben" = Prozess, nicht Faktum. Prüfbare Handlung: SuS nennen mindestens zwei Einigungs-Etappen (z. B. Zollverein, Einigungskriege) UND ordnen 1871 als Ergebnis, nicht als Startpunkt, ein. Reine Jahreszahl-Abfrage verfehlt Operator.
- **OH-5:** Ursachen vs. Auslöser (Sarajevo) muss explizit unterschieden werden. Prüfbare Handlung: SuS ordnen je mindestens zwei Ursachen (Bündnisse, Imperialismus, Nationalismus, Wettrüsten) UND den einen Auslöser (Attentat) in eine Struktur ein UND übertragen die Denkfigur auf einen aktuellen Konflikt (z. B. ein beliebiger Regionalkonflikt aus aktueller Berichterstattung). Kompetenzebene: P1 + P2; Perspektive: PE1 + PE2.
- **OH-6:** Erster Weltkrieg — "Front + Heimat" ist Doppel-Pflicht. UE darf nicht ausschließlich militärisch (Schlachten, Waffen) oder ausschließlich zivil (Rationierung) sein. Prüfbare Handlung: SuS vergleichen mindestens eine Frontquelle (Feldpost, Soldatenfoto) mit mindestens einer Heimatquelle (Propagandaplakat, Frauenarbeits-Foto, Kochbuch Kriegszeit).

#### 6.2.5 Coverage-Prüfpunkte

Eine UE deckt LB2 substanziell ab, wenn:

- [ ] **CP-1:** Bearbeitet die UE mindestens EIN Pflicht-Thema aus 6.2.2 (Absolutismus, Französische Revolution, Industrialisierung, Reichsgründung, Imperialismus/Kolonialismus, Erster Weltkrieg) mit LP-konformer Tiefe?
- [ ] **CP-2:** Ist der historische Gegenstand mit einem Gegenwartsbezug verbunden (Demokratiewert, aktuelle Revolution, aktueller Konflikt, Folgen von Krieg)?
- [ ] **CP-3:** Werden mindestens zwei Perspektiven (Herrschende/Beherrschte, Europa/Kolonisierte, Front/Heimat, Arbeiter/Fabrikant) gegenübergestellt?
- [ ] **CP-4:** Fordert die UE Operatoren auf Beurteilungs-/Erklärungs-Ebene (beurteilen, erklären, diskutieren, übertragen) — nicht nur "benennen/nennen"?
- [ ] **CP-5:** Ist mindestens eine historische Quelle (Bild, Text, Statistik, Karte) eingebunden und als solche kenntlich gemacht?
- [ ] **CP-6:** Ist die Perspektive PE1 (historisch) klar, idealerweise ergänzt um PE2 (sozialwissenschaftlich) bei Revolutions-/Demokratie-Themen?
- [ ] **CP-7:** Adressiert die UE mindestens ein Kern-UebZ thematisch passend (U10 bei Revolution/Demokratie, U06 bei Kolonialismus, U15 bei Werte-/Friedensfragen)?
- [ ] **CP-8:** Bei Kolonialismus-Thema: Wird Perspektive der kolonisierten Bevölkerung explizit eingebunden (nicht nur europäische Mächte-Sicht)?
- [ ] **CP-9:** Bei Revolutions-Thema: Wird Nicht-Linearität (Rückschlag/Terror/Restauration) explizit thematisiert?
- [ ] **CP-10:** Werden Ursachen und Auslöser (Erster Weltkrieg) sauber getrennt?

Mindest-Schwelle: **≥6 von 10** Items JA, wobei CP-1 und CP-4 Pflicht-JA sind. Begründung: LB2 bündelt mehrere Großthemen; eine einzelne UE wird nie alles abdecken, muss aber ihr Thema LP-konform (CP-1) auf Beurteilungs-Ebene (CP-4) bearbeiten. Themenspezifische Pflicht-CPs: CP-8 bei Kolonialismus, CP-9 bei Revolution, CP-10 bei Erstem Weltkrieg.

#### 6.2.6 Beispiele kompetent vs. nicht-kompetent

**Beispielpaar 1: Reichsgründung 1871**

- *Kompetent:* SuS ordnen auf einem Zeitstrahl Zollverein (1834), Deutsch-Dänischer Krieg (1864), Deutsch-Französischer Krieg (1870/71), Kaiserproklamation Versailles (1871) ein und beantworten: "Warum ist 1871 kein plötzliches Ereignis?". Antwort in 3-4 Sätzen.
- *Nicht kompetent:* Rätsel verlangt als Lösungswort "1871" nach der Frage "Wann wurde das Deutsche Reich gegründet?".
- *Warum:* Kompetenzerwartung fordert "beschreiben nationalstaatliche Einigungsbestrebungen" (Prozess), nicht "Jahreszahl benennen" (Faktum).

**Beispielpaar 2: Französische Revolution**

- *Kompetent:* SuS bearbeiten ein Phasen-Schema (Ständegesellschaft → Erklärung Menschenrechte → Jakobinerdiktatur/Terror → Napoleon) und formulieren auf einem Transfer-Blatt: "In einer heutigen Revolution (z. B. Syrien, Ukraine-Maidan, Tunesien) sehe ich Phase … wieder, weil …"
- *Nicht kompetent:* SuS lesen einen Text "Die Französische Revolution 1789" und beantworten im Multiple-Choice, was die Erklärung der Menschen- und Bürgerrechte enthielt.
- *Warum:* Kompetenzerwartung fordert "übertragen … auf Revolutionen der Gegenwart" — ohne Transfer-Aufgabe wird die Kernkompetenz nicht erreicht.

**Beispielpaar 3: Kolonialismus Afrika**

- *Kompetent:* SuS erhalten zwei Quellen zum Kongo um 1900: eine Darstellung eines belgischen Kolonialbeamten UND einen O-Ton eines kongolesischen Zwangsarbeiters (Sekundärquelle/Zeitzeugenbericht). SuS vergleichen die Schilderung und diskutieren, welche Perspektive im Schulbuch meist fehlt.
- *Nicht kompetent:* SuS erstellen eine Karte, auf der die afrikanischen Kolonien den europäischen Mächten zugeordnet werden. Aufgabe: "Welche Gebiete hatten Deutschland, Frankreich, Großbritannien?"
- *Warum:* Kartenarbeit ist G1-legitim, aber allein verletzt sie U06 (Interkulturelle Bildung, Kern) — die Kompetenzerwartung "Imperialismus … mündete in den Ersten Weltkrieg" erfordert Auseinandersetzung mit dem Prozess, nicht nur mit dem Ergebnis. Kolonisierte müssen Stimme bekommen.

#### 6.2.7 UebZ-Verknüpfung konkret

Gemäß §5.3 sind für LB2 relevant: **U06 (K, bei Kolonialismus), U10 (K), U15 (K), U07 (S), U13 (I)**.

- **U06 (Interkulturelle Bildung, Kern):** Bei Imperialismus/Kolonialismus sichtbar, wenn Material Quellen/Stimmen der kolonisierten Bevölkerung (Widerstand, Alltag, Zwangsarbeit) enthält — nicht nur europäische Mächte-Karten. Konkret: Mindestens eine nicht-europäische Perspektive pro Kolonialismus-UE.
- **U10 (Politische Bildung, Kern):** Sichtbar beim Absolutismus-Demokratie-Vergleich und bei der Französischen Revolution: SuS formulieren konkret, welche Mitbestimmungsmöglichkeit in der Demokratie existiert (Wahlen ab 18, Parteien, Meinungsfreiheit, Petitionsrecht) und welche im Absolutismus nicht. Operator: "beurteilen den Wert" aus 6.2.1 direkt hier ankoppeln.
- **U15 (Werteerziehung, Kern):** Bei Erster-Weltkrieg-Thema und Revolutions-Thema: Material enthält Wert-Dilemmata (Gehorsam vs. Gewissen bei Soldatentum; Freiheit vs. Terror in der Revolution). Sichtbar durch Dilemma-Diskussion, nicht durch moralische Zuspitzung.
- **U07 (Kulturelle Bildung, Stark):** Bei Versailles/Ludwig XIV. sichtbar durch Auseinandersetzung mit Herrschaftsinszenierung (Hofkultur, Architektur). Bei Industrialisierung: Veränderung der Arbeits- und Alltagskultur.
- **U13 (Technische Bildung, Indirekt):** Sichtbar bei Industrialisierung (Dampfmaschine, Eisenbahn) und Erstem Weltkrieg (Stellungskrieg, MG, Gas, Tank). Aufgabenformat: SuS verknüpfen technische Innovation mit sozialer Folge — nicht reines Technik-Erklären.

#### 6.2.8 Anti-Patterns

- **AP-1:** Jahreszahlen-Quiz statt Prozessverständnis — Symptom: Rätsel fragen "1789, 1815, 1871, 1914" als Lösungs-Zahlen ab. Verstoß: Operatoren "beschreiben/erklären/beurteilen" (6.2.1) verlangen Prozess-Verständnis; P1/P2 nicht aktiviert. Fix: Mindestens eine Kausal-Frage pro Datum ("Warum ist 1871 ein langer Prozess?") ergänzen.
- **AP-2:** Kolonialismus als Ressourcen-Wettrennen ohne Opferperspektive — Symptom: Imperialismus wird nur aus europäischer Mächte-Sicht narratiert (Wer nahm welches Gebiet?). Verstoß: U06 Kern. Fix: Mindestens eine Quelle/Stimme der kolonisierten Bevölkerung + Widerstands-Perspektive.
- **AP-3:** Französische Revolution als lineare Heldenerzählung — Symptom: UE präsentiert 1789 → Erklärung der Menschenrechte → Erfolg. Verstoß: Kompetenzerwartung "nicht linearer Verlauf" explizit. Fix: Jakobinerdiktatur/Terror-Phase + Napoleonische Wende + Restauration einbeziehen.
- **AP-4:** Erster Weltkrieg als Militärgeschehen ohne Heimatfront — Symptom: Fokus nur auf Schlachten/Fronten/Kartenbewegungen. Verstoß: Kompetenzerwartung "Heimatfront" + "Menschen an der Front und in der Heimat". Fix: Quellen aus Heimat (Frauenarbeit, Rationierung, Propaganda) + Feldpost einbauen.
- **AP-5:** Absolutismus-Demokratie-Vergleich als Merkmalliste ohne Wertung — Symptom: SuS füllen Tabelle "Merkmale Absolutismus / Merkmale Demokratie" aus, ohne Beurteilung. Verstoß: Kompetenzerwartung fordert "Wert der politischen Mitbestimmungsmöglichkeiten … beurteilen"; P2 fehlt. Fix: Abschluss-Frage mit Begründung ("Warum ist Mitbestimmung ein Wert?").
- **AP-6:** Industrialisierung als Technik-Märchen — Symptom: UE erklärt Dampfmaschine, Eisenbahn, Fabrik als Fortschritt, ohne soziale Folgen. Verstoß: Kompetenzerwartung "aus unterschiedlichen Perspektiven"; U15 fehlt. Fix: Kinderarbeit, Landflucht, Arbeiterunruhen mitführen.

---

### §6.3 LB3: Politik und Gesellschaft

#### 6.3.1 Kompetenzerwartungen *[Quelle: Q1, Verbatim]*

Die Schülerinnen und Schüler …

- beschreiben die Lebens- und Arbeitsverhältnisse von Arbeiterinnen bzw. Arbeitern und deren Familien sowie Lösungsansätze der Sozialen Frage während der Industrialisierung.
- analysieren unter ausgewählten Aspekten (z. B. Bevölkerungswachstum, Arbeitsbedingungen) die Entwicklung einer Stadt Ende des 19. Jahrhunderts in Deutschland, um den Übergang von der Agrar- zur Industriegesellschaft darzustellen.
- erläutern die Ursachen des Ersten Weltkrieges und diskutieren die Kriegsschuldfrage unter Einbezug aktueller Forschungsergebnisse.
- erläutern die wesentlichen militärischen, territorialen und wirtschaftlichen Bestimmungen des Versailler Friedensvertrags, um die entstehende Unzufriedenheit der unterschiedlichen gesellschaftlichen Schichten im Deutschen Reich zu begründen.

*Hinweis:* Der Entwurf in `assets/Lehrplan_GPG7.md` enthält im ersten Spiegelpunkt den OCR-Fehler "Arbeitsreidelungen" → korrigiert zu "Arbeitsbedingungen" nach Q1.

#### 6.3.2 Inhalte *[Quelle: Q1, Verbatim]*

- Industrielle Revolution, Industriegesellschaft
- Soziale Frage zu Beginn des 20. Jahrhunderts und Lösungsansätze
- Kriegsschuldfrage und Versailler Vertrag

#### 6.3.3 Grundlegende Kompetenzen (Auszug Jahrgangsstufenprofil)

*Kein spezifisch LB3-kodierter Eintrag im Jahrgangsstufenprofil (Q5). Verweis auf LB2-Einträge "Industrialisierung zeitlich/räumlich einordnen" + "Ursachen/Auswirkungen/Verlauf Erster Weltkrieg".*

#### 6.3.4 Operationalisierungs-Hinweise

- **OH-1:** "Lebens- und Arbeitsverhältnisse" der Industriearbeiter-Familie muss konkret werden. Prüfbare Handlung: SuS beschreiben mindestens drei Lebensbereiche (Wohnen/Miete, Arbeitszeit/Lohn, Ernährung/Gesundheit, Kinderarbeit/Bildung) aus Quelle (Statistik, Tagebuch, Fotografie Elendsviertel). Allgemeines "es war schlimm" verfehlt LP.
- **OH-2:** Soziale Frage verlangt LÖSUNGSANSÄTZE, nicht nur Problembeschreibung. Prüfbare Handlung: SuS ordnen mindestens zwei Lösungsansätze (Arbeiterbewegung/Gewerkschaften, Sozialgesetze Bismarck, Unternehmer-Modellsiedlungen, Kirchen/Caritas) einer Akteursgruppe zu UND bewerten Wirksamkeit. Kompetenzebene: P1 + P2; Gegenstandsbereich: G2 + G3.
- **OH-3:** Stadtentwicklung Ende 19. Jh. ist Fallstudien-Operator. Prüfbare Handlung: SuS analysieren am Beispiel einer konkreten Stadt (z. B. Essen, Chemnitz, Berlin) mindestens zwei Indikatoren (Bevölkerungswachstum absolute Zahlen + Arbeitsbedingungen in Fabrik) für den Agrar-Industriegesellschafts-Übergang. Generischer "Industrialisierung allgemein"-Text reicht nicht.
- **OH-4:** Kriegsschuldfrage — "aktuelle Forschungsergebnisse" ist Pflicht-Element. Prüfbare Handlung: SuS erkennen, dass die frühere Alleinschuld-These (Versailler Artikel 231) historisch differenzierter gesehen wird (geteilte Verantwortung, Bündnis-Automatismen, deutsches Wettrüsten). Aufgabe: Zwei Sichten gegenüberstellen. Kompetenzebene: P2; Perspektive: PE1.
- **OH-5:** Versailler Vertrag — drei Bestimmungs-Dimensionen zwingend: militärisch (Heeresstärke 100.000, Entmilitarisierung Rheinland), territorial (Elsass-Lothringen, polnischer Korridor, Kolonien), wirtschaftlich (Reparationen). Prüfbare Handlung: SuS ordnen jeweils mindestens eine Bestimmung den drei Dimensionen zu UND leiten daraus eine gesellschaftliche Folge (Unzufriedenheit, welche Schicht betroffen) ab.

#### 6.3.5 Coverage-Prüfpunkte

Eine UE deckt LB3 substanziell ab, wenn:

- [ ] **CP-1:** Bearbeitet die UE mindestens EIN Pflicht-Thema aus 6.3.2 (Industriegesellschaft, Soziale Frage + Lösungsansätze, Kriegsschuldfrage, Versailler Vertrag)?
- [ ] **CP-2:** Ist die Industriegesellschaft konkret (Stadt-Beispiel, Bevölkerungszahlen, Arbeitsbedingungs-Quelle) — nicht generisch-abstrakt?
- [ ] **CP-3:** Werden bei "Sozialer Frage" sowohl Problembeschreibung ALS AUCH Lösungsansätze (mind. 2) behandelt?
- [ ] **CP-4:** Werden mindestens zwei Perspektiven/Schichten (Arbeiter, Fabrikant, Bürgertum, Staat) gegenübergestellt?
- [ ] **CP-5:** Bei Versailles: Werden alle drei Bestimmungs-Dimensionen (militärisch/territorial/wirtschaftlich) abgedeckt?
- [ ] **CP-6:** Bei Kriegsschuldfrage: Wird aktueller Forschungsstand (nicht nur Versailler Artikel 231) einbezogen?
- [ ] **CP-7:** Ist Perspektive PE2 (sozialwissenschaftlich) klar, ergänzt um PE1 (historisch)?
- [ ] **CP-8:** Adressiert die UE mindestens ein Kern-UebZ (U10 bei Gesellschaft/Konflikt, U15 bei Wertefragen)?
- [ ] **CP-9:** Fordert die UE Operatoren auf Analyse-/Erläuterungs-Ebene ("analysieren", "erläutern", "diskutieren") — nicht nur "aufzählen"?
- [ ] **CP-10:** Wird mindestens eine historische Quelle (Statistik, Foto, Gesetzestext, Zeitungsausschnitt) eingebunden?

Mindest-Schwelle: **≥6 von 10** Items JA, mit CP-1 und CP-9 als Pflicht-JA. Begründung: LB3 konzentriert Soziale Frage und Folgen des Ersten Weltkriegs; eine UE muss das gewählte Teilthema analytisch (CP-9) und LP-konform (CP-1) bearbeiten.

#### 6.3.6 Beispiele kompetent vs. nicht-kompetent

**Beispielpaar 1: Soziale Frage**

- *Kompetent:* SuS erhalten ein Statistik-Blatt (Wohnraum pro Person, Kinderarbeit in Prozent, durchschnittliche Arbeitszeit um 1890) und drei Lösungsansatz-Karten (Gewerkschaft, Bismarcks Sozialversicherung, Krupp-Werkssiedlung). Aufgabe: Welcher Ansatz greift welches Problem an? Welcher ist wirksamer — mit Begründung?
- *Nicht kompetent:* SuS lesen einen Text "Das Leben der Arbeiter war hart" und kreuzen im Quiz an, welche Aussagen stimmen.
- *Warum:* Kompetenzerwartung fordert "Lebens- und Arbeitsverhältnisse … sowie Lösungsansätze … beschreiben" — ohne Lösungsansätze fehlt die zweite Hälfte der Kompetenz; Analyse (G3 Interessen) nicht aktiviert.

**Beispielpaar 2: Stadtentwicklung Essen 1890**

- *Kompetent:* SuS bearbeiten ein Stadtprofil Essen (Einwohner 1850: ca. 9.000 → 1900: ca. 120.000) mit zwei Quellen (Stadtplan Wachstum, Arbeitervereins-Protokoll Krupp) und beantworten: "Wie hat sich Essen verändert?" strukturiert nach Bevölkerung + Arbeit + Wohnen.
- *Nicht kompetent:* SuS lesen einen Fließtext zur Industrialisierung in Deutschland allgemein und malen am Schluss ein Fabrikgebäude.
- *Warum:* Kompetenzerwartung fordert "Entwicklung einer Stadt … analysieren" — ohne konkrete Stadt und Indikatoren ist das keine Analyse.

**Beispielpaar 3: Versailler Vertrag**

- *Kompetent:* SuS erhalten einen gekürzten Vertragsauszug mit markierten Artikeln (z. B. Artikel 231, 232, 160, 87) und ordnen diese in eine 3-Spalten-Tabelle (militärisch/territorial/wirtschaftlich). Abschluss: Welche Schicht (Militärs, Unternehmer, Bauern, Arbeiter) ist wovon besonders betroffen — Hypothese bilden.
- *Nicht kompetent:* SuS hören einen Vortrag zum Versailler Vertrag und füllen einen Lückentext mit Zahlen (100.000 Soldaten, 269 Mrd. Goldmark).
- *Warum:* Kompetenzerwartung fordert "erläutern … um Unzufriedenheit … zu begründen" — Zuordnung plus Folgen-Hypothese aktiviert P1/P2; Lückentext bleibt Reproduktion.

#### 6.3.7 UebZ-Verknüpfung konkret

Gemäß §5.3 sind für LB3 relevant: **U10 (K), U15 (K), U11 (S), U09 (S), U13 (I)**.

- **U10 (Politische Bildung, Kern):** Sichtbar, wenn Arbeiterbewegung/Gewerkschaften/Sozialgesetzgebung als Formen politischer Interessenvertretung thematisiert werden (Parteigründung SPD, Streikrecht). Versailles: Verbindung zu demokratiefeindlichen Reaktionen (Dolchstoß-Legende) vorsichtig anlegen.
- **U15 (Werteerziehung, Kern):** Sichtbar in der Bewertungsfrage "Was ist eine gerechte Arbeitsverteilung? Was ist ein gerechter Friedensvertrag?". Aufgabenformat: Dilemma-Karten (Fabrikant-Sicht vs. Arbeiter-Sicht; Sieger-Sicht vs. Verlierer-Sicht) mit Argumentations-Gerüst.
- **U11 (Soziales Lernen, Stark):** Sichtbar durch Perspektiv-Übernahme-Aufgaben (Rollenbrief einer Näherin an Fabrikbesitzer; Brief eines Kriegsinvaliden 1919). SuS erleben Interessengegensätze nicht als abstrakt, sondern an Einzelschicksalen.
- **U09 (Ökonomische Verbraucherbildung, Stark):** Sichtbar bei Stadtentwicklung/Industriegesellschaft durch Preise, Löhne, Kaufkraft-Rechnung (Wie viele Arbeitsstunden für 1 kg Brot 1890?). Verbindung zu heute: eigener Konsum/Einkommen.
- **U13 (Technische Bildung, Indirekt):** Sichtbar, wenn Stadt-Strukturveränderung mit technischen Infrastrukturen (Eisenbahn, Fabrik-Dampfmaschinen, Mietskasernen-Bautechnik) verknüpft wird.

#### 6.3.8 Anti-Patterns

- **AP-1:** Soziale Frage ohne Lösungsansätze — Symptom: UE beschreibt Elend (Kinderarbeit, Mietskasernen), lässt aber Gewerkschaften/Bismarck/Unternehmer-Modelle aus. Verstoß: Kompetenzerwartung fordert beides; Kompetenz halbiert. Fix: Mindestens zwei Lösungsansatz-Karten einfügen.
- **AP-2:** Industriegesellschaft als abstrakter Begriff — Symptom: UE erklärt "Agrargesellschaft → Industriegesellschaft" ohne konkretes Stadt-Beispiel. Verstoß: LP fordert "Entwicklung einer Stadt Ende des 19. Jahrhunderts analysieren" konkret. Fix: Genau eine Stadt mit Zahlen wählen (Essen, Chemnitz, Berlin).
- **AP-3:** Kriegsschuld-Alleinschuld-These ohne Kritik — Symptom: Versailler Artikel 231 wird als Faktum dargestellt. Verstoß: LP fordert "aktuelle Forschungsergebnisse" einbeziehen. Fix: Mindestens einen Satz zur differenzierteren heutigen Sicht ergänzen (geteilte Verantwortung).
- **AP-4:** Versailles als Zahlen-Quiz — Symptom: SuS memorieren Reparationssumme + Heeresstärke. Verstoß: LP fordert "erläutern … um Unzufriedenheit … zu begründen" — Folgen-Analyse. Fix: Nach jeder Bestimmung Frage "Wer ist davon besonders betroffen?".
- **AP-5:** Arbeiter als homogene Opfer-Masse — Symptom: UE zeigt "die Arbeiter" als undifferenzierte Gruppe. Verstoß: G3 Interessen fordert Differenzierung (Facharbeiter vs. Hilfsarbeiter; Mann vs. Frau vs. Kind; Stadt vs. Land). Fix: Mindestens zwei Untergruppen mit unterschiedlicher Lage.
- **AP-6:** Moralischer Zeigefinger statt Analyse — Symptom: UE bewertet Fabrikbesitzer ausschließlich negativ ("ausbeuterisch"), ohne Interessen-Logik zu zeigen. Verstoß: P2 Multiperspektivität. Fix: Unternehmer-Perspektive als rationaler Akteur (Konkurrenzdruck, Rentabilität) einfügen, ohne zu verharmlosen.

---

### §6.4 LB4: Lebenswelt

#### 6.4.1 Kompetenzerwartungen *[Quelle: Q1, Verbatim]*

Die Schülerinnen und Schüler ...

- benennen die rechtsbedeutsamen Altersstufen für Jugendliche und übertragen die Bedeutung rechtlicher Regelungen auf das eigene Leben.
- fassen wesentliche Bestimmungen des Jugendschutzgesetzes und des Jugendstrafrechts zusammen und beurteilen die Bedeutsamkeit der Gesetze für den eigenen Lebensbereich.
- diskutieren grundlegende Bestimmungen des Jugendstrafrechts sowie die präventiv und pädagogisch ausgerichtete Strafzumessung anhand einer öffentlichen Gerichtsverhandlung.
- berichten über eine aktuelle kriminelle Tat (z. B. Jugendgewalt, Internetkriminalität) und diskutieren die möglichen Strafen für die Täterin bzw. den Täter.

*Hinweis:* Der Entwurf enthält OCR-Fehler "Straßemessung" → korrigiert zu "Strafzumessung" nach Q1.

#### 6.4.2 Inhalte *[Quelle: Q1, Verbatim]*

- rechtsbedeutsame Altersstufen für Jugendliche
- Jugendschutzgesetz
- Bestimmungen des Jugendstrafrechts, Funktionen von Strafe
- Rechtsverstöße und Konsequenzen an aktuellen Beispielen

#### 6.4.3 Grundlegende Kompetenzen (Auszug Jahrgangsstufenprofil) *[Quelle: Q5, Verbatim]*

- Die Schülerinnen und Schüler begründen die Schutz- und Fürsorgefunktion des Jugendschutzgesetzes für Jugendliche, indem sie wesentliche Bestimmungen benennen sowie deren Sinn aufzeigen und diskutieren.
- Sie erklären die Unterschiede zwischen Jugend- und Erwachsenenstrafrecht an Beispielen und begründen die besondere Funktion des Jugendstrafrechts.

#### 6.4.4 Operationalisierungs-Hinweise

- **OH-1:** "Rechtsbedeutsame Altersstufen" verlangt Übersicht UND Lebensbezug. Prüfbare Handlung: SuS ordnen mindestens vier Altersstufen (z. B. 7, 14, 16, 18) jeweils mindestens einer rechtlichen Konsequenz zu (bedingte Geschäftsfähigkeit, Strafmündigkeit, Genuss von Bier/Wein in Begleitung, Volljährigkeit) UND benennen je eine konkrete Folge für ihr eigenes Leben (z. B. "Mit 14 bin ich strafmündig — das heißt für mich …"). Kompetenzebene: P1 + P3.
- **OH-2:** Jugendschutzgesetz (JuSchG) ist anwendungsorientiert zu prüfen. Prüfbare Handlung: SuS entscheiden bei vorgegebenen Alltagssituationen (Disko-Besuch ab 16 mit/ohne Eltern, Energy-Drink-Konsum, FSK-Filme, Glücksspiel/Lootboxen) regelkonform UND begründen mit Paragraph oder Schutzziel. Reines "JuSchG verbietet …"-Aufzählen verfehlt LP.
- **OH-3:** Jugendstrafrecht muss vom Erwachsenenstrafrecht abgegrenzt werden. Prüfbare Handlung: SuS nennen mindestens zwei Unterschiede (Erziehungsgedanke statt Vergeltung, Erziehungsmaßregeln/Zuchtmittel/Jugendstrafe statt Geld-/Freiheitsstrafe, max. Strafmaß) UND begründen den Erziehungsgedanken am konkreten Fall. Kompetenzebene: P1 + P2; Gegenstandsbereich: G2 + G5.
- **OH-4:** Gerichtsverhandlungs-Bezug ist LP-Pflicht ("anhand einer öffentlichen Gerichtsverhandlung"). Prüfbare Handlung: SuS analysieren einen realen Fall (Pressebericht, dokumentierte Verhandlung, Schulprojekt-Besuch) entlang dreier Schritte: Tat → Strafzumessung (mit pädagogischer Begründung) → eigene Bewertung. Reine Fall-Erfindung ohne Quelle ist schwächer.
- **OH-5:** Aktueller-Fall-Diskussion (Jugendgewalt, Internetkriminalität) braucht Strafmaß-Reflexion. Prüfbare Handlung: SuS recherchieren eine konkrete aktuelle Tat aus Mediensuche (Lokalzeitung) UND diskutieren in Pro/Kontra mindestens zwei mögliche Strafen mit Begründung, ohne in Vorverurteilung abzugleiten. Medienkritik (U08) implizit mitprüfen.

#### 6.4.5 Coverage-Prüfpunkte

Eine UE deckt LB4 substanziell ab, wenn:

- [ ] **CP-1:** Bearbeitet die UE mindestens EIN Pflicht-Thema aus 6.4.2 (Altersstufen, Jugendschutzgesetz, Jugendstrafrecht/Funktionen von Strafe, aktuelle Rechtsverstöße)?
- [ ] **CP-2:** Wird ein expliziter ICH-Bezug der SuS hergestellt (eigene Lebensphase, eigene Alltagssituation, eigene Wertung)?
- [ ] **CP-3:** Werden Altersstufen mit konkreten Rechts-/Lebensfolgen verknüpft (nicht nur Liste)?
- [ ] **CP-4:** Wird das Jugendstrafrecht vom Erwachsenenstrafrecht abgegrenzt (Erziehungsgedanke benannt)?
- [ ] **CP-5:** Bei Strafzumessung: Wird der pädagogisch-präventive Aspekt explizit thematisiert (nicht nur Vergeltung)?
- [ ] **CP-6:** Ist mindestens eine konkrete Fall-/Verhandlungs-Quelle (Pressebericht, Gerichtsdokumentation, Fallakte) eingebunden?
- [ ] **CP-7:** Ist Perspektive PE2 (sozialwissenschaftlich/rechtlich) klar?
- [ ] **CP-8:** Adressiert die UE mindestens ein Kern-UebZ (U10 als Rechtskunde, U15 als Werte-/Fairness-Frage)?
- [ ] **CP-9:** Werden Funktionen von Strafe (Erziehung/Prävention/Sühne/Schutz der Allgemeinheit) zumindest in zwei Aspekten unterschieden?
- [ ] **CP-10:** Bleibt die UE altersgerecht (keine reißerischen Tat-Details, kein Voyeurismus, keine Vorverurteilung)?

Mindest-Schwelle: **≥7 von 10** Items JA, mit CP-2 (ICH-Bezug) und CP-10 (Altersgerechtheit) als Pflicht-JA. Begründung: LB4 ist explizit lebensweltlich — ohne ICH-Bezug verfehlt eine UE den Lernbereich; CP-10 schützt vor pädagogischen Schäden.

#### 6.4.6 Beispiele kompetent vs. nicht-kompetent

**Beispielpaar 1: Altersstufen**

- *Kompetent:* SuS erhalten eine Zeitleiste mit Altersstufen (7, 14, 16, 18, 21) und ordnen Recht-/Pflicht-Karten zu (Strafmündigkeit, Religionsmündigkeit, Wahlrecht Kommunal/Bundestag, beschränkte Geschäftsfähigkeit, Volljährigkeit). Abschluss: "Ich bin jetzt … alt — diese Regel gilt für mich heute zum ersten Mal: …"
- *Nicht kompetent:* SuS lernen eine Tabelle "Altersstufen und Rechte" auswendig und beantworten in einem Quiz "Mit wie viel Jahren bin ich strafmündig?".
- *Warum:* Kompetenzerwartung fordert "übertragen die Bedeutung rechtlicher Regelungen auf das eigene Leben" — ohne Übertragung bleibt es Reproduktion (P1 statt P3).

**Beispielpaar 2: Jugendschutzgesetz**

- *Kompetent:* SuS erhalten fünf Alltagsszenen (15-Jähriger im Club bis 22 Uhr ohne Eltern, 16-Jährige kauft Bier, 14-Jähriger spielt USK-18-Spiel, 17-Jähriger raucht in Schule, 13-Jährige im Casino) und entscheiden je: erlaubt/verboten + JuSchG-Schutzziel (Schutz vor Suchtgefährdung, Schutz vor Entwicklungs-Schäden).
- *Nicht kompetent:* SuS füllen Lückentext zu JuSchG-Paragraphen aus.
- *Warum:* "fassen wesentliche Bestimmungen … zusammen und beurteilen die Bedeutsamkeit" verlangt Anwendung + Wertung — Lückentext liefert nur Reproduktion.

**Beispielpaar 3: Jugendstrafrecht-Strafzumessung**

- *Kompetent:* SuS analysieren einen realen Fall (Pressebericht: 16-Jähriger, Diebstahl, Auseinandersetzung mit Strafmaß) und diskutieren in Pro/Kontra: Sozialstunden vs. Jugendarrest vs. Jugendstrafe — welche Maßnahme erfüllt welchen pädagogischen Zweck am besten? Abschluss: Eigene Empfehlung mit Begründung.
- *Nicht kompetent:* SuS bearbeiten ein Suchsel zu Begriffen (Erziehungsmaßregel, Zuchtmittel, Jugendstrafe).
- *Warum:* Kompetenzerwartung "diskutieren … die präventiv und pädagogisch ausgerichtete Strafzumessung anhand einer öffentlichen Gerichtsverhandlung" verlangt Fall-Diskussion und Begründung; Suchsel ist Vokabeltest.

#### 6.4.7 UebZ-Verknüpfung konkret

Gemäß §5.3 sind für LB4 relevant: **U10 (K), U15 (K), U11 (S), U01 (I)**.

- **U10 (Politische Bildung, Kern):** Sichtbar, wenn Recht als demokratisch legitimierte Ordnung thematisiert wird — z. B. "Wer macht das Jugendstrafrecht? Wie kann es geändert werden?"-Aufgabe; Rechtsstaats-Prinzip (Unschuldsvermutung, faires Verfahren) explizit.
- **U15 (Werteerziehung, Kern):** Sichtbar in der Strafzweck-Diskussion (Vergeltung vs. Erziehung vs. Schutz der Allgemeinheit) und in der Wertung "Ist das Jugendstrafrecht gerecht?". Aufgabenformat: Dilemma (Opferperspektive vs. Täterperspektive vs. Gesellschaftsperspektive).
- **U11 (Soziales Lernen, Stark):** Sichtbar, wenn UE Perspektivwechsel auf Opfer, Täter, Familie einschließt (z. B. "Wie geht es einem 15-Jährigen, der das erste Mal vor Gericht steht?"). SuS üben Empathie und differenziertes Urteilen.
- **U01 (Alltagskompetenz und Lebensökonomie, Indirekt):** Sichtbar, wenn Konsequenzen von Rechtsverstößen für Alltagsleben (Eintrag im Führungszeugnis, Auswirkung auf Bewerbung/Ausbildungsplatz) konkret werden.

#### 6.4.8 Anti-Patterns

- **AP-1:** Altersstufen als reine Auswendig-Liste — Symptom: SuS lernen eine Tabelle, ohne Lebensbezug. Verstoß: LP fordert "übertragen … auf das eigene Leben"; P3 fehlt. Fix: Pro Altersstufe eine ICH-Aufgabe ("Was bedeutet das für mich heute/in 2 Jahren?").
- **AP-2:** Sensationalisierung von Jugendgewalt — Symptom: UE arbeitet mit drastischen Tat-Details, Boulevard-Schlagzeilen ohne Distanz. Verstoß: U15, Kindeswohl; AP gegen pädagogisches Maß. Fix: Falldarstellung sachlich, Tat-Details auf das didaktisch Notwendige reduzieren, Opfer-Würde wahren.
- **AP-3:** Jugendstrafrecht = "härter werden" — Symptom: UE suggeriert, dass härtere Strafen besser wirken. Verstoß: LP fordert explizit "präventiv und pädagogisch ausgerichtete Strafzumessung"; Erziehungsgedanke verfehlt. Fix: Erziehungs-/Präventionsgedanke als Kernidee zentral; alternative Sanktionsformen (Sozialstunden, Anti-Gewalt-Training) gleichwertig diskutieren.
- **AP-4:** Vorverurteilung im aktuellen Fall — Symptom: UE lässt SuS über einen laufenden Fall urteilen, als sei Schuld bewiesen. Verstoß: U10 (Rechtsstaat, Unschuldsvermutung). Fix: Unschuldsvermutung explizit thematisieren; nur abgeschlossene Verfahren zur Beurteilung nutzen.
- **AP-5:** Jugendschutzgesetz als Verbots-Sammlung ohne Sinn — Symptom: SuS lernen nur "ab wann was verboten ist". Verstoß: LP fordert "Bedeutsamkeit … beurteilen"; Schutzziel fehlt. Fix: Pro Verbot mindestens das Schutzziel benennen ("warum"); Schutz- vs. Bevormundungsdiskussion zulassen.
- **AP-6:** Opferperspektive komplett fehlt — Symptom: UE fokussiert nur auf Täterstrafe, nicht auf Opfer/Tatfolgen. Verstoß: U11 + U15. Fix: Mindestens eine Aufgabe mit Opferperspektive (Brief, Aussage, Folgen für das Opfer).

---

## §7 Q-Gates (Qualitätstore)

Fünf verbindliche Gates. Eine UE/ein Artefakt gilt als LP-konform, wenn **alle fünf JA** sind. Gates werden vom F0e-Auditor und vom Generator-Coverage-Check identisch angewendet.

### QG-01 Verbatim-Treue (Zitat-Integrität)

- **Prüffrage:** Sind alle Kompetenzerwartungs-/Inhalts-/Grundlegende-Kompetenzen-Zitate, die in einer UE, einem Audit-Report oder einem Generator-Prompt referenziert werden, wortgleich mit §6.X.1/2/3?
- **Operationalisierung:** String-Match gegen Q1 (LB1-LB4) bzw. Q5 (Jahrgangsstufenprofil).
- **Fehler-Trigger:** OCR-Artefakte ("Arbeitsreidelungen", "Straßemessung"), Paraphrasen statt Originaltext, vertauschte Operatoren ("beschreiben" ≠ "erläutern").
- **Fix:** Jedes Zitat mit `*[Quelle: Q1, Verbatim]*` oder `*[Quelle: Q5, Verbatim]*` taggen und Text aus §6.X.1-3 kopieren.

### QG-02 Kompetenzstruktur-4fach-Check

- **Prüffrage:** Deckt die UE mindestens **ein G**, **ein P**, **eine PE** und **ein UebZ** explizit ab (§3)?
- **Operationalisierung:** Einträge-Liste "G/P/PE/U" im TUV-Kopf oder Audit-Befund; leer = Durchfall.
- **Fehler-Trigger:** UE nennt nur Thema (z. B. "Französische Revolution") ohne Kompetenz-Zuordnung.
- **Fix:** Codes aus §3 zuordnen (z. B. LB2 FR → G2 + P1/P2 + PE1 + U10/U15).

### QG-03 Kern-UebZ-Coverage

- **Prüffrage:** Bei thematischer Passung (§5.3) ist das Kern-UebZ explizit adressiert?
- **Operationalisierung:** LB1 → U03 + U06 Pflicht; LB2 → U10 + U15 Pflicht (U06 zusätzlich bei Kolonialismus); LB3 → U10 + U15 Pflicht; LB4 → U10 + U15 Pflicht. "Kern" = im Material sichtbar, nicht nur im Beipackzettel.
- **Fehler-Trigger:** Kolonialismus-UE ohne Opferperspektive (U06-Verstoß, vgl. §6.2.8 AP-2); Jugendstrafrecht ohne Strafzweck-Diskussion (U15-Verstoß, §6.4.8 AP-3).
- **Fix:** UebZ-Anker in §6.X.7 verwenden.

### QG-04 Anti-Pattern-Screen

- **Prüffrage:** Ist **keines** der in §6.X.8 gelisteten Anti-Patterns (je 6 pro LB) in der UE nachweisbar?
- **Operationalisierung:** Checkliste LB1 AP-1..AP-6, LB2 AP-1..AP-6, LB3 AP-1..AP-6, LB4 AP-1..AP-6 (Gesamt: 24 AP). Auditor prüft thematisch passende AP. Jeder getriggerte AP = Befund mit Verweis.
- **Fehler-Trigger:** Häufig: AP-3 (Französische Revolution linear), AP-1 (Altersstufen-Liste ohne ICH), AP-2 (Kolonialismus ohne Opferperspektive), AP-6 (Europäische Exotik-Brille).
- **Fix:** `Fix:`-Regel aus dem AP-Eintrag anwenden.

### QG-05 Jahrgangsstufenprofil-Alignment + Coverage-Schwelle

- **Prüffrage:** Bedient die UE **mindestens eine** "Grundlegende Kompetenz" aus Q5 (§6.X.3) UND erreicht **die Mindest-Schwelle** der CP-Liste aus §6.X.5 (LB1 ≥7/10, LB2 ≥6/10 mit CP-1+CP-4 Pflicht, LB3 ≥6/10 mit CP-1+CP-9 Pflicht, LB4 ≥7/10 mit CP-2+CP-10 Pflicht)?
- **Operationalisierung:** Zwei-Teil-Prüfung: (a) Verweis auf Q5-Eintrag im Audit, (b) CP-Score-Berechnung mit Pflicht-CP-Check.
- **Fehler-Trigger:** UE kompetent im Kompetenzmodell, aber unter Schwelle (z. B. LB4 ohne ICH-Bezug = CP-2-Verstoß → Durchfall trotz 7 JA).
- **Fix:** Pflicht-CPs zuerst reparieren, dann Schwelle.

### Gate-Matrix pro LB

| Gate | LB1 | LB2 | LB3 | LB4 |
|------|-----|-----|-----|-----|
| QG-01 Verbatim | §6.1.1/2/3 | §6.2.1/2/3 | §6.3.1/2/3 | §6.4.1/2/3 |
| QG-02 4-fach | §3 + §6.1.4 | §3 + §6.2.4 | §3 + §6.3.4 | §3 + §6.4.4 |
| QG-03 Kern-UebZ | U03+U06 | U10+U15 (+U06 Kol.) | U10+U15 | U10+U15 |
| QG-04 AP-Screen | §6.1.8 (6 AP) | §6.2.8 (6 AP) | §6.3.8 (6 AP) | §6.4.8 (6 AP) |
| QG-05 Schwelle | ≥7/10 | ≥6/10 + CP-1/4 | ≥6/10 + CP-1/9 | ≥7/10 + CP-2/10 |

---

## §8 Anwendungs-Matrix

Konkretes Routing — wer welche Sektion wann nutzt. Pfade sind absolut (`§X.Y`) und stabil über Versionen.

### 8.1 Rolle × Referenzpunkt

| Rolle | Use-Case | Primär-Pfad | Sekundär-Pfad |
|-------|----------|-------------|---------------|
| F0e Auditor-Agent (Dimension D1 Lernziel-Alignment) | UE auf LP-Treue prüfen | §6.X.1 (Kompetenzerwartung verbatim) + §6.X.4 (OH) + §6.X.5 (CP-Schwelle) | §3 (Kompetenzstruktur) für G/P/PE-Codes; §5.3 für UebZ |
| F0e Auditor-Agent (Dimension D2 Anti-Pattern-Screen) | UE-Material gegen 24 AP scannen | §6.X.8 (alle AP-Listen) | §6.X.6 (Beispielpaare als Referenz für "kompetent") |
| Generator-Agent (Coverage-Check vor Spawn) | LB+Thema → Pflicht-Codes | §6.X.1 + §3 | §7 QG-02 (4-fach-Check als Self-Test) |
| Generator-Agent (Konstruktion Aufgaben-Stack) | Operatoren-Wahl | §6.X.4 OH (prüfbare Handlungen) | §6.X.6 Beispielpaare (kompetent-Vorlagen) |
| gpg7b/7c-Schriftwesen-Skill (TUV-Lernziel-Ableitung) | Stundenslot → Lernziel-Formulierung | §6.X.1 (Kompetenzerwartung) + §6.X.3 (Grundlegende Kompetenz) | §6.X.4 (OH für prüfbare Handlung im Stundenkontext) |
| gpg7b/7c-Skill (Sequenzplan-Pflege) | Themenblock → LB-Mapping | §6.X.2 (Inhalte) | §5.3 UebZ-Verknüpfung für übergreifende Anker |
| Entwickler/Spielautor Escape-Game | Themenwahl → LP-Anbindung | §6.X.1 + §6.X.6 (was zählt als kompetent?) | §6.X.8 (was vermeiden) |
| Entwickler/Spielautor (Quality-Self-Check) | Material-Review vor Submission | §7 (5 Gates komplett) | §6.X.5 CP-Liste |
| PM (Audit-Vergabe) | Auftragsklärung an Auditor | §1 Zweck + §8 Anwendungs-Matrix | §7 Q-Gates (Definition of Pass) |
| PM (Onboarding neuer Akteure) | Schnell-Einstieg | §1-5 + §8.1 | §7 |

### 8.2 Lookup-Pfad nach Frage

| Frage | Antwort-Sektion |
|-------|-----------------|
| "Was muss eine UE über Französische Revolution leisten?" | §6.2.1 Spiegelpunkt 2 + §6.2.4 OH-2 + §6.2.6 Beispielpaar 2 |
| "Welche Codes für Kolonialismus-UE?" | §6.2 + §3 (G2/G4 + P2/P3 + PE1/PE2 + U06 Kern) |
| "Welche AP bei Jugendstrafrecht-Material?" | §6.4.8 AP-2/AP-3/AP-4/AP-6 |
| "CP-Schwelle für LB1?" | §6.1.5 Mindest-Schwelle ≥7/10 |
| "Ist diese UE LP-konform?" | §7 Gate-Matrix komplett durchprüfen |
| "Welches UebZ ist Kern für GPG 7?" | §5.3 Kern-Klassifikation: U03/U06/U10/U15 |
| "Wie wird ICH-Bezug operationalisiert?" | §6.1.4 OH-4 + §6.4.4 OH-1 + §6.4.5 CP-2 (Pflicht) |
| "Gegenstandsbereiche und Perspektiven?" | §3.1 + §3.3 |

---

## §9 Changelog

### v0.1 — 2026-04-19 — L1 Framework (Claude, PM Paul)

- Erstellt: §1-5 vollständig + §6 Skeleton mit verbatim Kompetenzerwartungen/Inhalten/Grundlegenden Kompetenzen aus LB1-LB4
- Quellen-WebSearch: Q2 (Fachprofil), Q3 (Bildungsauftrag), Q4 (UebZ) eingebunden
- OCR-Korrekturen gegenüber `assets/Lehrplan_GPG7.md`: "Arbeitsreidelungen" → "Arbeitsbedingungen" (§6.3.1); "Straßemessung" → "Strafzumessung" (§6.4.1)
- Status: §6.X.4-8 Sub-Sections (Operationalisierung/Coverage/Beispiele/UebZ-konkret/Anti-Patterns) als PENDING markiert für L2
- Nicht im Scope: Themenbezogene Deep-Dives (Deferred)

### v0.2 — 2026-04-19 — L2 Befüllung (Subagent `general-purpose`)

- §6.X.4-8 für LB1-LB4 vollständig befüllt (5 OH + 10 CP + 3 Beispielpaare + 4-5 UebZ-Einträge + 6 AP pro LB)
- Output-Ablage: `docs/fachdidaktik/LEHRPLAN_QM_GPG7_L2_BEFUELLUNG.md` (313 Zeilen)
- Self-Review-Tabelle: keine PENDING, keine Code-Halluzination, keine Deep-Dive-Drift
- Stichproben LB2 (Kolonialismus-AP-2, FR-Nicht-Linearität CP-9, Ursachen/Auslöser CP-10) und LB4 (Sensationalisierungs-AP-2, Vorverurteilungs-AP-4, Altersgerechtheit CP-10) bestanden

### v1.0 — 2026-04-19 — L3 Integration (Claude)

- L2-Output in Hauptdokument gemerged: §6.1.4-8, §6.2.4-8, §6.3.4-8, §6.4.4-8 — alle PENDING-Stubs ersetzt
- §7 Q-Gates ausgearbeitet: 5 Gates (Verbatim-Treue, Kompetenzstruktur-4fach, Kern-UebZ-Coverage, Anti-Pattern-Screen, Jahrgangsstufenprofil-Alignment + Coverage-Schwelle) mit Gate-Matrix LB1-LB4
- §8 Anwendungs-Matrix konkretisiert: Rolle×Use-Case-Tabelle (10 Einträge) + Lookup-Pfad-Tabelle (8 typische Fragen)
- §10 State-Marker aktualisiert: L1/L2/L3 FERTIG, L4 PENDING

### Geplant v1.1 (L4)

- Integration in F0e-Kette: `F0e_HANDOFF_DIDAKTIK_AUDITOR.md` §6 + `F0e_AUDIT_RUBRIKEN.md` §6 + Plan-State-Marker
- `docs/projekt/STATUS.md` und `CHANGELOG.md` aktualisieren
- Git-Commit gebündelt mit F0e.5

---

## §10 State-Marker (Compaction-Resistance)

| Phase | Status | Timestamp | Artefakt-Zustand |
|-------|--------|-----------|------------------|
| L1 Framework | **FERTIG** | 2026-04-19 | §1-5 vollständig, §6 Skeleton |
| L2 Befüllung | **FERTIG** | 2026-04-19 | §6.X.4-8 LB1-LB4 befüllt (via Subagent, Output-Ablage `LEHRPLAN_QM_GPG7_L2_BEFUELLUNG.md`) |
| L3 Integration | **FERTIG** | 2026-04-19 | §6 vollständig gemerged, §7 Q-Gates ausgearbeitet, §8 Anwendungs-Matrix konkret, §9 v1.0 |
| L4 F0e-Integration | PENDING | — | Handoff+Rubriken+STATUS+CHANGELOG aktualisieren, dann Commit mit F0e.5 |

**Letzter Checkpoint:** v1.0 vollständig geschrieben, Git-Commit ausstehend (gebündelt F0e.5). Keine PENDING-Tags, keine offenen Sub-Sections.
