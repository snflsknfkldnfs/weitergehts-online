# Didaktischer Rahmen: Erster Weltkrieg — Ursachen + Ausbruch + Marne 1914

**Game-ID:** `gpg-erster-weltkrieg-ursachen-run4-v050`
**Run-ID:** `run-4-2026-04-26`
**Erstellt:** 2026-04-26 (Phase 0.1, agent-didaktik, Plugin v0.5.0)
**Schulart:** Mittelschule Bayern
**Jahrgangsstufe:** 7c
**Fach:** GPG (Geschichte / Politik / Geographie)
**Schwierigkeit:** Basis
**mappen_anzahl: 4** (Pflicht-Vorgabe)
**Vorgaenger-Game:** keiner (unabhaengiger Run-4-Empirie-Run)
**Validierungsstatus:** ENTWURF (User-Validierung ausstehend)

---

## 1. Lehrplanbezug

### Lernbereiche (LehrplanPLUS GPG R7 Mittelschule Bayern)

- **Primaer:** `GPG7_LB2` — "Lernbereich 2: Zeit und Wandel"
- **Sekundaer:** `GPG7_LB3` — "Lernbereich 3: Politik und Gesellschaft"

**Lehrplan-Quelle (PFLICHT QD-SCHULART F-PB-45):**
`docs/lehrplan/Fachlehrplan_GPG_R7_Mittelschule.md`
(Originaldatei im UEW_PATH: `7c/Input_Artefake/Lehrplan/GPG_R7/Fachlehrplan_GPG_R7.md`,
Profil: `Mittelschule_Jg7_GPG`, Quelle `LIS_PDF_09-09-2025.pdf`)

### Schulart-Lehrplan-Konsistenz-Check (F-PB-45 BLOCKER)

| Pruefung | Wert | Match |
|---|---|---|
| Header-Schulart | Mittelschule Bayern | — |
| Lehrplan-Quelle-Pfad | `Fachlehrplan_GPG_R7_Mittelschule.md` | enthaelt Token "Mittelschule" |
| Schulart-Token-Match | `mittelschule` ∈ Pfad | **PASS** |
| Konsistenzstatus | **PASS** | — |

### Kompetenzerwartungen (KE)

| ID | Kompetenzerwartung (woertlich aus Fachlehrplan) | AFB | Rolle |
|---|---|---|---|
| `GPG7_LB2_K_05` | "Sie erklaeren, dass die traditionellen europaeischen Maechterivalitaeten und der imperialistische Wettlauf um Kolonien in den Ersten Weltkrieg muendeten." | II | primaer |
| `GPG7_LB2_K_06` | "Sie stellen die Ereignisse des Attentats von Sarajevo dar und diskutieren den Zusammenhang zwischen Ursachen und Ausloeser eines Konfliktes anhand eines aktuellen Beispiels." | II-III | primaer |
| `GPG7_LB3_K_03` | "Sie erlaeutern die Ursachen des Ersten Weltkrieges und diskutieren die Kriegsschuldfrage unter Einbezug aktueller Forschungsergebnisse." | III | primaer |
| `GPG7_LB2_K_07` | "Sie beschreiben anhand von historischen Spuren den Verlauf des Ersten Weltkrieges fuer die Menschen an der Front und in der Heimat." | II | sekundaer-1 |

### Inhalte zu den Kompetenzen (Fachlehrplan)

- `GPG7_LB2_I_05`: "Imperialismus: Rivalitaet der europaeischen Nationalstaaten, Kolonialisierung am Beispiel Afrikas" → Mappe 1
- `GPG7_LB2_I_06`: "Ursachen und Verlauf des Ersten Weltkrieges: Attentat von Sarajevo, Stellungskrieg, Technisierung des Krieges, Heimatfront" → Mappe 2 + 4
- `GPG7_LB3_I_03`: "Kriegsschuldfrage und Versailler Vertrag" (nur Teil "Kriegsschuldfrage") → Mappe 3

### Gegenstandsbereiche

- **Mappe 1:** Raeume + Zeit und Wandel (Buendnis-System Europa, Kolonial-Wettlauf)
- **Mappe 2:** Zeit und Wandel + Gesellschaft und Politik (Sarajevo + Julikrise als Schluesselereignis)
- **Mappe 3:** Gesellschaft und Politik (Kriegsbegeisterung + Schuldfrage als Diskursphaenomen)
- **Mappe 4:** Zeit und Wandel + Lebenswelt (Schlieffen-Plan + Marne als Wendepunkt zum Stellungskrieg)

---

## 2. Lernziele

### Stundenziel (AFB II-III)

> Die SuS **erlaeutern** die Ursachen, den Ausloeser und die ersten Wochen des Ersten Weltkriegs, indem sie die langfristigen Maechterivalitaeten, das Attentat von Sarajevo, die Reaktion der Bevoelkerung und das Scheitern des Schlieffen-Plans an der Marne aufeinander beziehen, **was daran erkennbar wird, dass** sie den Unterschied zwischen Ursachen und Ausloeser am Ende mit eigenen Worten erklaeren und die Frage "Wer ist schuld?" mehrperspektivisch beantworten koennen.

### Teilziele (1 pro Mappe)

| ID | Teilziel | AFB | Mappe |
|---|---|---|---|
| **TZ1** | Die SuS **beschreiben** das System der europaeischen Buendnisse um 1914 und das Wettrennen um Kolonien, indem sie eine Karte und eine Buendnis-Tabelle auswerten, was daran erkennbar wird, dass sie die zwei grossen Buendnis-Bloecke (Dreibund / Triple-Entente) korrekt benennen und drei Spannungsfelder (Marokko, Balkan, Flotte) zuordnen koennen. | I-II | M1 |
| **TZ2** | Die SuS **stellen dar**, was am 28. Juni 1914 in Sarajevo geschah und wie aus einem einzigen Schuss in fuenf Wochen ein Weltkrieg wurde, indem sie eine Zeitleiste der Julikrise rekonstruieren, was daran erkennbar wird, dass sie das Datum des Attentats, die Reihenfolge der Kriegserklaerungen und den Begriff "Buendnisfall" mit eigenen Worten erklaeren koennen. | II | M2 |
| **TZ3** | Die SuS **diskutieren** die Kriegsschuldfrage und die "Augustbegeisterung" 1914, indem sie zwei Quellen (Kriegsbegeisterungs-Foto + heutige Forschungs-Aussage) vergleichen, was daran erkennbar wird, dass sie zwischen "Ursachen" und "Ausloeser" unterscheiden und mindestens zwei beteiligte Maechte (nicht nur Deutschland) als mitverantwortlich nennen koennen. | II-III | M3 |
| **TZ4** | Die SuS **erklaeren**, warum der geplante "kurze Krieg" der Deutschen an der Marne im September 1914 scheiterte, indem sie den Schlieffen-Plan und die Marne-Schlacht auf einer Karte nachzeichnen, was daran erkennbar wird, dass sie den Begriff "Stellungskrieg" als Folge der Marne mit einem eigenen Satz erklaeren koennen. | II | M4 |

---

## 3. KE-Matrix

| Kompetenzerwartung | Mappe 1 (Pulverfass) | Mappe 2 (Sarajevo) | Mappe 3 (Schuld + Jubel) | Mappe 4 (Marne) |
|---|---|---|---|---|
| `GPG7_LB2_K_05` (Maechterivalitaeten + Imperialismus) | **■ haupt** | ■ neben | ■ neben | — |
| `GPG7_LB2_K_06` (Sarajevo + Ursache/Ausloeser) | — | **■ haupt** | ■ neben | — |
| `GPG7_LB3_K_03` (Ursachen + Kriegsschuldfrage) | ■ neben | ■ neben | **■ haupt** | — |
| `GPG7_LB2_K_07` (historische Spuren Verlauf) | — | — | — | **■ haupt** |

**Legende:** **■ haupt** = Hauptzuordnung (volles Material-Aufgebot); ■ neben = Nebenzuordnung (Wiederholung / Vorbereitung).

**Konsistenz-Check (QD4):**
- Jede KE hat genau 1 Hauptzuordnung. ✓
- Jede Mappe hat mindestens 1 KE-Zuordnung. ✓
- M4 hat eine eigene Hauptzuordnung (`K_07` als sekundaer-1 im Lehrplan-Anker, aber primaer fuer M4). ✓

---

## 4. Mappen-Grobstruktur

### Mappe 1: Pulverfass Europa

- **Thematischer Schwerpunkt:** Die europaeischen Grossmaechte um 1900 stehen sich in zwei Buendnis-Bloecken gegenueber (Dreibund: Deutschland, Oesterreich-Ungarn, Italien — Triple-Entente: Frankreich, Russland, Grossbritannien) und konkurrieren weltweit um Kolonien (vor allem in Afrika) und um die Flottenstaerke.
- **Zentrale Erkenntnis:** Schon vor 1914 war Europa wie ein Pulverfass: Buendnisse, Kolonialstreit und Wettruesten bauten ueber Jahrzehnte Spannungen auf.
- **KE-Schwerpunkt:** `GPG7_LB2_K_05` (haupt)
- **Gegenstandsbereich:** Raeume + Zeit und Wandel
- **Konkreter Anker (H5):** Marokko-Krise 1905/1911 (Tanger-Besuch Wilhelms II.) ODER Britisch-deutscher Flottenwettlauf 1898-1912 (HMS Dreadnought 1906) — exemplarisches Spannungsfeld mit Datum + Ort.
- **Stoffdichte-Check:** 4 Kernelemente (Dreibund, Triple-Entente, Kolonial-Wettlauf, Flottenwettruesten). Im Zielkorridor 3-5. PASS.

### Mappe 2: Sarajevo 1914 — Ein Schuss, eine Welt im Krieg

- **Thematischer Schwerpunkt:** Am 28. Juni 1914 erschiesst der Serbe Gavrilo Princip in Sarajevo den oesterreichisch-ungarischen Thronfolger Erzherzog Franz Ferdinand. Innerhalb von fuenf Wochen (Julikrise) erklaeren sich die europaeischen Grossmaechte ueber das Buendnissystem gegenseitig den Krieg.
- **Zentrale Erkenntnis:** Aus dem Attentat in Sarajevo wurde durch das Buendnissystem in fuenf Wochen ein Weltkrieg — der einzelne Schuss war der Ausloeser, nicht die Ursache.
- **KE-Schwerpunkt:** `GPG7_LB2_K_06` (haupt)
- **Gegenstandsbereich:** Zeit und Wandel + Gesellschaft und Politik
- **Konkreter Anker (H5):** Datum 28. Juni 1914, Ort Sarajevo, Personen Gavrilo Princip + Franz Ferdinand. Kettenreaktion: 28.07. AT-UN → Serbien, 01.08. DT → Russland, 03.08. DT → Frankreich, 04.08. GB → DT.
- **Stoffdichte-Check:** 5 Kernelemente (Attentat-Hergang, Juli-Ultimatum, Buendnisfall-Mechanik, Mobilmachungs-Reihenfolge, Begriff "Ausloeser" vs "Ursache"). Im Zielkorridor 3-5 (Obergrenze). PASS.

### Mappe 3: Augustfieber — Wer schuld ist und wer jubelt

- **Thematischer Schwerpunkt:** Im August 1914 ziehen viele junge Maenner mit Begeisterung in den Krieg ("Augusterlebnis"); zugleich streiten Politiker und Historiker bis heute um die Frage, wer den Ersten Weltkrieg ausgeloest hat (Kriegsschuldfrage). Aktuelle Forschung (Christopher Clark, "Die Schlafwandler", 2013) sieht keine Allein-Schuld Deutschlands, sondern ein Versagen mehrerer Maechte.
- **Zentrale Erkenntnis:** Die Kriegsbegeisterung von 1914 war real, aber nicht ueberall — und die Frage "Wer ist schuld?" hat heute keine einfache Antwort mehr.
- **KE-Schwerpunkt:** `GPG7_LB3_K_03` (haupt)
- **Gegenstandsbereich:** Gesellschaft und Politik
- **Konkreter Anker (H5):** Foto "Jubelnde Menge auf dem Odeonsplatz Muenchen, 02. August 1914" (mit Adolf Hitler im Bild) ODER Versammlung Berlin Lustgarten 01.08.1914 — datierbares Massenphaenomen, mit Quellenkritik (Foto-Bias).
- **Stoffdichte-Check:** 4 Kernelemente (Augusterlebnis-Phaenomen, Burgfrieden-Politik, Kriegsschuld-Artikel 231 als Ausblick, Forschungsstand Clark). Im Zielkorridor 3-5. PASS.

### Mappe 4: Marne 1914 — Das Ende des kurzen Krieges

- **Thematischer Schwerpunkt:** Der deutsche Schlieffen-Plan sah einen schnellen Sieg ueber Frankreich in sechs Wochen vor — durchs neutrale Belgien. An der Marne (5.-12. September 1914) stoppen franzoesische und britische Truppen den deutschen Vormarsch. Der erhoffte "kurze Krieg" wird zum Stellungskrieg.
- **Zentrale Erkenntnis:** An der Marne im September 1914 endete der "kurze Krieg" und der Stellungskrieg begann — mit allen Folgen, die uns vier Jahre spaeter den Versailler Vertrag bringen.
- **KE-Schwerpunkt:** `GPG7_LB2_K_07` (haupt)
- **Gegenstandsbereich:** Zeit und Wandel + Lebenswelt
- **Konkreter Anker (H5):** Datum 5.-12. September 1914, Ort Marne (Frankreich nordoestlich Paris), Person General Joffre (FR) und General von Moltke (DT). Konkretion: Pariser Taxis transportieren Soldaten an die Front ("Taxi-Mythos der Marne").
- **Stoffdichte-Check:** 4 Kernelemente (Schlieffen-Plan-Idee, Belgien-Verletzung, Marne-Schlacht, Beginn Stellungskrieg). Im Zielkorridor 3-5. PASS.

---

## 5. Schwierigkeitskurve

| Mappe | AFB-Schwerpunkt | Bloom-Korridor | Prozesskompetenz | Begruendung |
|---|---|---|---|---|
| M1 | I-II | Verstehen → Anwenden | Erkenntnisse gewinnen (Karte/Tabelle auswerten) | Einstieg: Topographie + Buendnis-Schema reproduzieren und ordnen. AFB I dominant, Vergleichselemente bringen AFB II. |
| M2 | II | Anwenden → Analysieren | Erkenntnisse gewinnen + Beurteilen (Zeitleiste rekonstruieren, Begriff anwenden) | Vertiefung: Ursache/Ausloeser-Differenzierung erfordert Begriffs-Anwendung auf Sachverhalt — klar AFB II. |
| M3 | II-III | Analysieren → Beurteilen | Beurteilen und bewerten (Kriegsschuldfrage diskutieren) | Hoehepunkt der kognitiven Anforderung: Quellenkritik + Mehrperspektivitaet + heutige Forschung einbeziehen → AFB III. |
| M4 | II | Anwenden → Analysieren | Erkenntnisse gewinnen + Handeln (Kartenarbeit + Wendepunkt erklaeren) | Synthese: Ergebnis-Sicherung. Karte deuten + Folge-Begriff "Stellungskrieg" erklaeren. AFB II — bewusster Rueckgang nach Hoehepunkt M3, weil M4 Sicherung und Ueberleitung ist. |

**Progressions-Begruendung (QD6):** Kurve M1(I-II) → M2(II) → M3(II-III) → M4(II) ist nicht streng monoton steigend, sondern hat einen Spannungsbogen: Aufbau → Hoehepunkt → Sicherung. Begruendung: M3 ist die kognitiv anspruchsvollste Mappe (Multiperspektiv-Diskussion), M4 schliesst mit gesicherter Begriffs-Bildung ab (didaktischer Spannungsbogen). E-D3 nicht ausgeloest, weil dies eine **bewusste, dokumentierte Designentscheidung** ist — nicht ein nachtraeglicher Fix.

---

## 6. Ethische Hinweise

### Multiperspektivitaet (PFLICHT)

Mindestens drei Perspektiven werden im Game vertreten:

| Perspektive | Hauptort im Game | Funktion |
|---|---|---|
| Deutsche Perspektive (1914) | M1, M3, M4 | "Einkreisungs-Angst", Augustbegeisterung, Schlieffen-Plan |
| Franzoesische / britische Perspektive | M1 (Triple-Entente), M4 (Marne-Sieg) | Defensiv-Allianz, militaerische Reaktion auf Belgien-Verletzung |
| Serbische / oesterreichisch-ungarische Perspektive | M2 | Sarajevo-Attentat: Princip als nationalistischer Aktivist (Sicht der Serben), Franz Ferdinand als Reformversprechen (Sicht der Habsburger) |
| Heutige Forschung (Clark / Schlafwandler-These) | M3 | Korrektur der einseitigen Schuld-Zuweisung des Versailler Vertrags |

### Ueberwaeltigungsverbot (Beutelsbacher Konsens)

- Die "Augustbegeisterung 1914" wird **nicht idealisiert**. SuS lernen explizit, dass nicht alle Deutschen jubelten (laendliche Bevoelkerung, Sozialdemokraten, viele Frauen waren skeptisch oder ablehnend) und dass die Foto-Quelle "jubelnde Menge" eine bestimmte Stadt-Schicht zeigt.
- Die Kriegsschuldfrage wird **nicht eindeutig beantwortet**. SuS lernen, dass dies eine kontroverse historische Frage ist, deren Antwort sich seit 1919 mehrfach gewandelt hat.
- Keine heroische oder verharmlosende Darstellung von Krieg. M4 endet mit dem Begriff "Stellungskrieg" als Vorausverweis auf die Schrecken 1915-1918 (kein Triumphismus).

### Kontroversitaetsgebot

- Kriegsschuldfrage M3 wird als **echte historische Kontroverse** dargestellt: Versailler Vertrag Artikel 231 (1919, "Alleinschuld Deutschlands") vs. Christopher Clark "Die Schlafwandler" (2013, "kollektives Versagen mehrerer Maechte"). SuS bilden eigene Position.

### Sensibilitaet

- Sarajevo-Attentat: keine Foto-Darstellung von Leichen. Quelle ist Tatortskizze + Augenzeugenbericht.
- Marne-Schlacht: Fokus auf strategischen Wendepunkt, nicht auf Gefallenen-Zahlen (~500.000 Tote/Verwundete) — diese werden als Faktum genannt, nicht visuell aufbereitet.

### Aktualitaetsbezug

- M2 (Ursache vs. Ausloeser) wird durch ein aktuelles Beispiel illustriert (Konflikt-Eskalations-Mechanik gilt auch heute, z.B. in regionalen Konflikten — konkretes aktuelles Beispiel waehlt agent-skript in Phase 0.3, hier nur Strukturvorgabe).

---

## 7. Didaktische Strukturvorgaben

### 7.1 Artikulationsstruktur pro Mappe

| Mappe | Einstieg (im Escape-Game) | Erarbeitung | Sicherung |
|---|---|---|---|
| M1 | Karten-Raetsel: Europa-Karte 1914, Buendnisse einfaerben | Tabelle: 6 Maechte → 2 Bloecke + Spannungsfelder zuordnen | Merksatz "Pulverfass Europa" + Begriff "Buendnis-System" |
| M2 | Schluessel-Raetsel: Datum 28.06.1914 als Code | Zeitleiste Julikrise rekonstruieren (5 Karten in richtige Reihenfolge) | Definition Ursache/Ausloeser nebeneinander aufschreiben |
| M3 | Quellen-Vergleichs-Raetsel: 2 Foto-Quellen + 1 Forschungs-Text | Diskussion in Kleingruppen: "Wer ist schuld?" — 4 Akteure abwaegen | Position aufschreiben + Begruendung mit Forschungsbezug |
| M4 | Karten-Skizzen-Raetsel: Schlieffen-Plan-Pfeile vs. tatsaechlicher Verlauf | Vergleich Plan vs. Realitaet — was ging schief? | Begriff "Stellungskrieg" + Ueberleitung "und nun 4 Jahre …" |

### 7.2 Narrativ-Rahmen (Pflicht QD8)

**Setting:** Die SuS sind eine Gruppe **junger Spurensucher / Geheimagenten im Auftrag eines Geschichts-Archivs**. Sie haben den Auftrag, vier verschlossene Mappen aus dem "Archiv 1914" zu oeffnen, um die Frage zu beantworten: "Wie konnte der Erste Weltkrieg ausbrechen — und warum hat ihn niemand verhindert?"

**SuS-Rolle:** Spurensucher / Detektive im Archiv. Du-Form, Anrede direkt: "Du hast vier Mappen vor dir. Pack die erste an."

**Roter Faden:** Die vier Mappen ergeben am Ende einen "Schluessel-Code", der die Tuer zum Folge-Game (Stellungskrieg / Heimatfront / Versailler Vertrag) oeffnet — Code-Elemente sind die vier Zentralen Erkenntnisse pro Mappe.

**Begruendung:** Spurensucher-Setting eignet sich fuer Quellen-Arbeit (Geschichte ist Spurensuche), motiviert R7-SuS (Detektiv-Topos altersgerecht), und das Mappen-Format ist im Narrativ-Rahmen authentisch begruendet (Archiv-Mappen). Vergleichbar mit dem Pre-Plugin-Game `gpg-erster-weltkrieg-ursachen`, aber bewusst ohne Vorgaenger-Anschluss (Run-4 ist eigenstaendig).

### 7.3 Differenzierungshinweise (3-Stufen-Tipp-System)

Pro Mappe stehen 3 Tipp-Stufen bereit. Beispiel fuer Mappe 2 (Sarajevo):

| Stufe | Inhalt (Beispiel M2) |
|---|---|
| **Stufe 1 — Denkanstoss** | "Schau dir das Datum auf der ersten Karte an. Was ist da passiert?" |
| **Stufe 2 — Richtung** | "Das Attentat war am 28. Juni. Wer wurde erschossen? Und welches Land hat dann zuerst den Krieg erklaert? Schau auf die Buendnis-Tabelle aus Mappe 1." |
| **Stufe 3 — Erklaerung mit Loesung** | "Princip erschoss Franz Ferdinand. Oesterreich-Ungarn erklaerte Serbien den Krieg. Russland half Serbien (Buendnisfall). Deutschland half Oesterreich-Ungarn (Buendnisfall). Frankreich half Russland (Buendnisfall). Grossbritannien kam dazu, weil Deutschland durch Belgien marschierte. Trage die Reihenfolge auf der Zeitleiste ein." |

**R7-Sprachniveau-Pruefung (F0B-Priming):** Alle Tipp-Stufen folgen R7-Regeln (Satzlaenge ~12-15 Woerter, DaZ-tauglich, Komposita beim Erstgebrauch erklaert: "Buendnisfall = wenn ein Buendnis-Partner angegriffen wird, muessen die anderen helfen").

### 7.4 R7-Sprachniveau-Kalibrierung (vertraglich F0B)

| Parameter | Wert |
|---|---|
| Satzlaenge max. Woerter | 15 |
| Hauptsatz-Dominanz | true (>=70% Hauptsaetze, max. 1 Nebensatz pro Satz) |
| Kompositum max. Glieder | 3 (z.B. "Buend-nis-system" ok, "Welt-kriegs-grund-anlass" verboten) |
| Nominalstil vermeiden | true |
| DaZ-vertraeglich | true |
| Anrede | du-form |
| Negativ-Liste | "ergo", "diesbezueglich", "infolgedessen", "Konsequenz" (statt "Folge") |

**Pflicht-Begriffe pro Mappe** (zur Sicherung):
- M1: Buendnis, Triple-Entente, Dreibund, Imperialismus, Kolonie, Flottenwettruesten
- M2: Attentat, Sarajevo, Julikrise, Buendnisfall, Mobilmachung, Ausloeser, Ursache
- M3: Augustbegeisterung, Burgfrieden, Kriegsschuld, Versailles (Vorausverweis), Quellenkritik
- M4: Schlieffen-Plan, Marne, Stellungskrieg, Wendepunkt

---

## 8. Scope-Abgrenzung

| Aspekt | In diesem Game | Fuer Folge-Game reserviert | Begruendung |
|---|---|---|---|
| Maechterivalitaeten + Imperialismus (KE-A) | Ja (M1) | — | Voraussetzung fuer Verstaendnis |
| Sarajevo + Ursache/Ausloeser (KE-B) | Ja (M2) | — | Schluesselereignis |
| Kriegsschuldfrage (KE-C) | Ja (M3, ohne Versailles-Detail) | Versailles-Vertrag-Detail (KE `GPG7_LB3_K_04`) → Folge-Game "WK1-Ende-und-Versailles" | Versailles-Bestimmungen (militaerisch/territorial/wirtschaftlich) sind eigener Lernschwerpunkt |
| Verlauf an der Front (KE-Sek `K_07`) | Teilweise (M4: nur Marne 1914) | Stellungskrieg 1915-1918, Verdun, Somme, Kriegstechnik (Gas, Panzer, U-Boote) → Folge-Game "WK1-Stellungskrieg" | Stoffumfang sprengt 4-Mappen-Game |
| Heimatfront (KE `K_08`) | Nein | Folge-Game "WK1-Heimatfront" | Eigener Themenkreis (Hunger, Frauen-Erwerb, Burgfrieden-Bruch) |
| Auswirkungen + Folgen (KE `K_08`) | Nur Vorausverweis | Folge-Game "WK1-Ende-und-Versailles" | — |
| Kriegsende + Novemberrevolution | Nein | Folge-Game "WK1-Ende" | Eigener Ereigniskomplex |

**Begruendung der Scope-Wahl:** Run-4 fokussiert auf Phase "Vor dem Krieg + Ausbruch + erste Schlacht" und endet bewusst mit dem Beginn des Stellungskriegs. Damit ist das Game in 4 Mappen gut bewaeltigbar (1 UE = ca. 45 Min Reinzeit) und schafft einen sauberen Anschlusspunkt fuer Folge-Games. Die Hauptzuordnung der KE `K_07` an M4 ist eine bewusste Akzent-Setzung — strenger Lehrplan-Verlauf wuerde `K_07` an M3-M4 mit Heimat-Front-Aspekt platzieren, aber die Heimat-Front ist hier explizit ausgeklammert.

---

## 9. Eskalations-Log

Keine Eskalation ausgeloest in diesem Lauf.

| # | Typ | Ausloeser | Massnahme | Q-Gate-Ergebnis |
|---|---|---|---|---|
| — | — | — | (kein Fallback noetig) | — |

**Anmerkung zur Progression M3→M4 (AFB II-III → II):** Bewusste Designentscheidung (didaktischer Spannungsbogen, M4 als Sicherung). KEIN E-D3-Fallback noetig, weil Begruendung in §5 Schwierigkeitskurve direkt mitgeliefert wird (vorausschauende Dokumentation).

---

## 10. Q-Gate Self-Check

| ID | Kriterium | Ergebnis | Evidenz |
|---|---|---|---|
| QD1 | Lehrplan-Abdeckung: Jede KE im Fachlehrplan verifizierbar | **PASS** | KE-IDs `GPG7_LB2_K_05/06/07`, `GPG7_LB3_K_03` direkt aus `Fachlehrplan_GPG_R7.md` Zeile 100-122, 198-205 zitiert |
| QD2 | KE-Vollstaendigkeit: Themenrelevante KE beruecksichtigt + Scope-Abgrenzung dokumentiert | **PASS** | 4 KE als haupt+sekundaer; KE `K_08` (Auswirkungen) explizit in §8 als Folge-Game-Reserve markiert |
| QD3 | Teilziel-Qualitaet: AFB + Erkennbarkeitskriterium pro TZ | **PASS** | TZ1-TZ4 alle nach Format "Die SuS [Operator] ..., indem ..., was daran erkennbar wird, dass ..." formuliert |
| QD4 | KE-Matrix-Konsistenz: Jede KE >=1 Hauptzuordnung, jede Mappe >=1 KE | **PASS** | Matrix §3: 4 KE / 4 Hauptzuordnungen / je 1 pro Mappe |
| QD5 | Mappen-Balance: Keine Mappe leer/ueberladen, Zentrale Erkenntnis = 1 Satz | **PASS** | Stoffdichte 4-5 Kernelemente je Mappe, im Zielkorridor 3-5; Zentrale Erkenntnis je 1 Satz |
| QD6 | AFB-Progression: Monoton steigend ODER begruendet nicht-monoton | **PASS (mit Begruendung)** | Kurve I-II → II → II-III → II ist Spannungsbogen, in §5 dokumentiert |
| QD7 | Ethik: Multiperspektivitaet + Ueberwaeltigungsverbot adressiert | **PASS** | §6: 4 Perspektiven (DT/FR-GB/SR-AT/Forschung), Augustbegeisterung explizit nicht-idealisiert, Kriegsschuldfrage kontrovers |
| QD8 | Strukturvorgaben: Artikulation + Narrativ + Differenzierung vorhanden | **PASS** | §7.1 Artikulation, §7.2 Narrativ (Spurensucher-Archiv), §7.3 3-Stufen-Tipp-Beispiel M2 |
| QD9 | Sequenzierbarkeit: Jede Mappe in mehrere Materialien zerlegbar | **PASS** | M1 Karte+Tabelle, M2 Datum+Zeitleiste, M3 Foto+Forschungstext+Diskussion, M4 Karte+Skizze — alle >=2 Material-Sloots |
| QD10 | STRUKTUR-FREEZE-Tauglichkeit fuer TAFELBILD | **PASS** | Zentrale Erkenntnis pro Mappe ist 1-Satz-Hefteintrag-faehig; konkrete Anker (Datum/Ort/Person) liefern Tafel-Knoten |
| QD-TITEL | R-TITEL-3 Multiperspektiv-Neutralitaet pro Mappen-Titel | **PASS** (siehe Detail unten) | M1 metaphorisch-deskriptiv, M2 deskriptiv+Datum, M3 fragend+Phaenomen-Doppel, M4 deskriptiv+Wendepunkt |
| QD-SCHULART | F-PB-45 Schulart-Lehrplan-Konsistenz | **PASS** | Schulart "Mittelschule Bayern" + Lehrplan-Pfad-Token "Mittelschule" → Match |

### QD-TITEL Detail-Pruefung (R-TITEL-3, F-PB-29-Fix)

| Mappe | Titel | Stil-Kategorie | FAIL-Test | PASS-Begruendung |
|---|---|---|---|---|
| M1 | "Pulverfass Europa" | Metaphorisch-deskriptiv | Kein wertendes Adjektiv (Pulverfass ist etablierte Geschichts-Metapher, keine politische Wertung) | Beschreibt Spannungs-Zustand neutral; multiperspektivisch offen (alle Maechte tragen bei) |
| M2 | "Sarajevo 1914 — Ein Schuss, eine Welt im Krieg" | Deskriptiv + Datum | Kein wertendes Adjektiv; "Schuss" ist Faktum, nicht Wertung | Datum + Ort als Anker, Konsequenz-Beschreibung neutral |
| M3 | "Augustfieber — Wer schuld ist und wer jubelt" | Fragend + Doppelphaenomen | "Augustfieber" ist zeitgenoessischer Begriff, nicht Wertung des Agenten; "Wer schuld ist" als Frage-Impuls (kein Antwort-Vorgriff) | Multiperspektiv-Frage explizit; oeffnet Diskussion |
| M4 | "Marne 1914 — Das Ende des kurzen Krieges" | Deskriptiv + Datum + Wendepunkt | Kein wertendes Adjektiv; "kurzer Krieg" in Anfuehrungs-Logik (zeitgenoessische Erwartung), "Ende" beschreibend | Beschreibt historischen Wendepunkt sachlich |

**FAIL-Pattern-Pruefung:** Keiner der Titel enthaelt wertende Adjektive ("ruhmreich", "schaendlich", "tragisch") oder personalisiert reduktiv ("Hitlers ...", "Wilhelms II. Krieg") oder privilegiert eine Konfliktseite. **PASS pro Mappe.**

### Gate-Urteil

**PASS (alle BLOCKER + alle HIGH PASS, keine WARN-Eskalation noetig).**

**User-Validierung:** AUSSTEHEND — Lehrkraft prueft Mappen-Aufteilung, KE-Matrix, Progression, Narrativ, Titel-Multiperspektivitaet.

---

## 11. Meta

| Feld | Wert |
|---|---|
| created_at | 2026-04-26 |
| schema_version | didaktik_rahmen_v1 |
| vertrag_version | VERTRAG_PHASE_0-1_DIDAKTIK v1.2 + v0.5.0 QD-SCHULART |
| agent | agent-didaktik |
| f_pb_addressed | F-PB-45 (QD-SCHULART), F-PB-46 (Math-Counts), F-PB-29-Fix (QD-TITEL R-TITEL-3) |
| plugin_version | v0.5.0 |
