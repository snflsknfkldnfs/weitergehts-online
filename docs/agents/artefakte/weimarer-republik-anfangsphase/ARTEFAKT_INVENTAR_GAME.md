# ARTEFAKT_INVENTAR_GAME — weimarer-republik-anfangsphase

**Game-ID:** weimarer-republik-anfangsphase
**Run-ID:** run-3-2026-04-26
**Erstellt:** 2026-04-26 (Phase 0.3, AGENT_ARTEFAKT)
**Vertrag-Anker:** VERTRAG_PHASE_0-3_ARTEFAKT
**Bindet Guetekriterien:** AUFGABEN, MATERIALPRODUKTION
**Mappen-Anzahl:** 4
**Material-Anzahl gesamt:** 24 (M1: 6, M2: 7, M3: 6, M4: 6) — Patch v0.4.3-post-Audit (M1+1 Scheidemann-Portrait, M2+1 Statistik Wahlbeteiligung)
**Bilder verifiziert (medien_katalog_game.json):** 16
**Schema-Erweiterung post-Audit 2026-04-26:** Felder `anker_briefing` + `tafelbild_knoten` + `tipp_stufen_slot` ergaenzt (siehe Sektion "Schema-Erweiterung Patch")

---

## Lese-Konvention

- **Material-ID:** `m{n}-mat-{nr}-{typ}-{kuerzel}` (z.B. `m1-mat-01-bildquelle-scheidemann`)
- **Sequenz-Position:** Numerische Reihenfolge innerhalb der Mappe (Einstieg → Erarbeitung → Sicherung).
- **Aufgaben-Anker:** Vorlaeufige Verweise (a{n}-{nr}); finalisiert in agent-raetsel-progressionsplan.
- **Quelle "VERIFIED":** Wikimedia-verifiziert via medien_katalog_game.json (Phase 0.2.M).
- **Quelle "TBD":** Eigenkomposition, Phase 2.1 zu produzieren.
- **anker_briefing** (post-Audit Patch v0.4.3): Verweis auf konkreten schluessel_fakten-Hash aus inhalts_briefing.json (Phase-1-Traceability — Material -> exakter Briefing-Fakt).
- **tafelbild_knoten** (post-Audit Patch v0.4.3): Verweis auf Hefteintrag/Sicherungs-Knoten gemaess DIDAKTIK_RAHMEN Sektion 7 (Artikulationsstruktur pro Mappe).
- **tipp_stufen_slot** (post-Audit Patch v0.4.3): 3-Stufen-Tipp-Geruest-Slot pro Aufgaben-Anker (Phase-1-Vorbereitung; finale Befuellung in agent-raetsel).

---

## MAPPE 1 — November 1918: Eine neue Ordnung

**KE-Hauptanker:** GPG7_LB2_K_08 | **Bloom:** L1-L2 | **AFB:** I-II
**Material-Anzahl:** 6 (post-Audit: +1 Scheidemann-Portrait) | **Typen-Verteilung:** bildquelle (3), zeitleiste (1), quellentext (1), darstellungstext (1)

### m1-mat-01-bildquelle-scheidemann
- **Typ:** bildquelle (Foto)
- **Kerninhalt:** Scheidemann am Reichstagsfenster, ruft am 9.11.1918 die Republik aus.
- **Quelle (VERIFIED):** Wikimedia `Ausrufung_Republik_Scheidemann.jpg` (PD-old-70, Erich Greiser; img-m1-01)
- **Perspektive:** Sozialdemokratisch-parlamentarisch (Scheidemann/MSPD)
- **Sequenz-Position:** 1 (Einstieg / provokante Frage "Warum zweimal?")
- **Aufgaben-Anker:** a1-01 (Bildbeschreibung), a1-02 (Erschliessung Datum/Ort/Akteur)

### m1-mat-02-bildquelle-wilhelm-exil
- **Typ:** bildquelle (Foto)
- **Kerninhalt:** Wilhelm II. im niederlaendischen Exil (Doorn). Belegt Abdankung + Flucht 9.11.1918.
- **Quelle (VERIFIED):** Wikimedia `Bundesarchiv_Bild_136-C0804,_Kaiser_Wilhelm_II._im_Exil.jpg` (PD, Oscar Tellgmann; img-m1-03)
- **Perspektive:** Monarchisch-konservativ (Anhaenger Wilhelms II.)
- **Sequenz-Position:** 2 (Erarbeitung — Kontrast zur Republik-Ausrufung)
- **Aufgaben-Anker:** a1-03 (Vergleich Symbolik Monarchie/Republik)

### m1-mat-03-zeitleiste-okt-nov-1918
- **Typ:** zeitleiste (visuell-strukturiert)
- **Kerninhalt:** Mini-Zeitleiste 28. Okt - 11. Nov 1918 mit 5 Knoten (Marinebefehl, Matrosenaufstand Kiel, Abdankung, Doppelausrufung, Waffenstillstand Compiegne).
- **Quelle (TBD):** Eigenkomposition basierend auf wiki:Kiel_mutiny + wiki:Novemberrevolution (DHM-LeMO bestaetigt)
- **Perspektive:** Strukturierend (akteursneutral)
- **Sequenz-Position:** 3 (Erarbeitung — chronologische Verortung)
- **Aufgaben-Anker:** a1-04 (Reihenfolge sortieren), a1-05 (Kausalkette)

### m1-mat-04-quellentext-aufruf-rdv
- **Typ:** quellentext (gekuerzter Originalauszug)
- **Kerninhalt:** Aufruf des Rats der Volksbeauftragten 12.11.1918 — Acht-Stunden-Tag, Aufhebung der Pressezensur, Ankuendigung Frauenwahlrecht.
- **Quelle (TBD-Recherche, hochwahrscheinlich PD):** DHM-LeMO Aufruf RdV 12.11.1918 (amtliches Werk → PD)
- **Perspektive:** Sozialdemokratisch-parlamentarisch (Rat der Volksbeauftragten)
- **Sequenz-Position:** 4 (Erarbeitung — was bringt die Republik konkret?)
- **Aufgaben-Anker:** a1-06 (Inhalt erschliessen), a1-07 (Wirkung beurteilen)

### m1-mat-05-darstellungstext-steckbrief-9-nov
- **Typ:** darstellungstext (Hefteintrag-Kandidat — Steckbrief)
- **Kerninhalt:** Kompakter Steckbrief "9. November 1918": Datum, 2 Orte, 3 Akteure, 2 Republik-Visionen, 1 Schluesselsatz.
- **Quelle (TBD):** Eigenkomposition, basiert auf wiki:Novemberrevolution + wiki:Philipp_Scheidemann + wiki:Karl_Liebknecht
- **Perspektive:** Strukturierend (multiperspektivisch zusammenfassend)
- **Sequenz-Position:** 5 (Sicherung — Hefteintrag)
- **Aufgaben-Anker:** a1-08 (Steckbrief vervollstaendigen / Kontroll-Aufgabe)

### m1-mat-06-bildquelle-portrait-scheidemann (post-Audit Patch v0.4.3)
- **Typ:** bildquelle (Portrait — Akteurs-Identifikation, Steckbrief-Begleitbild)
- **Kerninhalt:** Reines Portrait Philipp Scheidemann; Begleit-Visual zu m1-mat-05 (Steckbrief).
- **Quelle (VERIFIED):** Wikimedia `Bundesarchiv_Bild_146-1970-096-13,_Philipp_Scheidemann.jpg` (CC BY-SA 3.0 DE; img-m1-02)
- **Perspektive:** Sozialdemokratisch-parlamentarisch (Scheidemann/MSPD)
- **Sequenz-Position:** 5b (Sicherung — Akteurs-Visual zum Steckbrief)
- **Aufgaben-Anker:** a1-08 (Steckbrief — Portrait einordnen)
- **Pflicht-BU:** "Philipp Scheidemann (Portrait, undatiert)" — KEIN Datum 1918 vorgaukeln (siehe Q-GATE-LOG_phase_0_2_m §Drift-Hinweise Item 1).
- **Hintergrund:** Vermutete Datei `Bundesarchiv 102-08214` zeigt 1929 (NICHT 1918), wurde durch reines Portrait ersetzt — daher Pflicht-Datierung "undatiert".

---

## MAPPE 2 — Eine Verfassung fuer eine Demokratie: Weimar 1919

**KE-Hauptanker:** GPG7_LB2_K_01 | **Bloom:** L2-L3 | **AFB:** II
**Material-Anzahl:** 7 (post-Audit: +1 Statistik Wahlbeteiligung) | **Typen-Verteilung:** bildquelle (3), quellentext (2), darstellungstext (1), statistik (1) — Hefteintrag-Slot inkl.

### m2-mat-01-bildquelle-louis-xiv
- **Typ:** bildquelle (Gemaelde — Vergleichsanker Absolutismus)
- **Kerninhalt:** Kroenungsportrait Ludwig XIV. (Hyacinthe Rigaud, 1701) als visueller Anker fuer absolutistisches Selbstverstaendnis.
- **Quelle (VERIFIED):** Wikimedia `Louis_XIV_of_France.jpg` (PD-old-100; img-m2-04)
- **Perspektive:** Vergleichs-Stimme (historisch absolutistisch)
- **Sequenz-Position:** 1 (Einstieg — provokative Gegenueberstellung)
- **Aufgaben-Anker:** a2-01 (Bildanalyse Macht-Symbolik)

### m2-mat-02-quellentext-zitat-louis-xiv
- **Typ:** quellentext (Kurzzitat + R7-Erlaeuterung)
- **Kerninhalt:** "L'etat c'est moi" — uebersetzt + 2 erlaeuternde Saetze zur absolutistischen Macht-Konzentration.
- **Quelle (TBD):** Standard-Schulbuch / wiki:Louis_XIV (Zuschreibung quellenkritisch markieren)
- **Perspektive:** Vergleichs-Stimme (historisch absolutistisch)
- **Sequenz-Position:** 2 (Einstieg — Quellen-Kontrast)
- **Aufgaben-Anker:** a2-02 (Zitat-Erschliessung), a2-03 (Vergleichsfrage Vorbereitung)

### m2-mat-03-quellentext-wrv-art-1-22-109
- **Typ:** quellentext (Verfassungsartikel, gekuerzt)
- **Kerninhalt:** Auszuege Weimarer Reichsverfassung Art. 1 (Volkssouveraenitaet), Art. 22 (Wahlrecht ab 20 fuer Frauen+Maenner), Art. 109 (Gleichheit) — R7-passend gekuerzt, Originalsprache erhalten.
- **Quelle (VERIFIED):** verfassungen.de (amtliches Werk, PD; Hash wf-verfde-art1/22/109-2026-04-26)
- **Perspektive:** Verfassungsgeber (parlamentarisch-demokratisch)
- **Sequenz-Position:** 3 (Erarbeitung — Verfassungsartikel-Puzzle)
- **Aufgaben-Anker:** a2-04 (Artikel zuordnen), a2-05 (Kerngehalt formulieren), a2-06 (Vergleich mit m2-mat-02)

### m2-mat-04-bildquelle-nationalversammlung
- **Typ:** bildquelle (Foto — Innenraum Plenum)
- **Kerninhalt:** Plenum der Nationalversammlung Weimar im Deutschen Nationaltheater, Reichspraesident Ebert vorsitzend (Maerz 1919).
- **Quelle (VERIFIED):** Wikimedia `Enemy_Activities_-_German_Republic_-_German_congress_in_session_at_Weimar_-_President_Ebert_presiding_-_NARA_-_31478647.jpg` (PD/NARA; img-m2-01)
- **Perspektive:** Verfassungsgeber (institutionell-prozessbezogen)
- **Sequenz-Position:** 4 (Erarbeitung — der Ort, an dem es geschah)
- **Aufgaben-Anker:** a2-07 (Bildbeschreibung — wer tagt hier, wozu?)

### m2-mat-05-bildquelle-portrait-ebert
- **Typ:** bildquelle (Portraitfoto)
- **Kerninhalt:** Friedrich Ebert (Reichspraesident) — Wiedererkennungs-Portrait.
- **Quelle (VERIFIED):** Wikimedia `Bundesarchiv_Bild_102-00015,_Friedrich_Ebert.jpg` (CC BY-SA 3.0 DE; img-m2-03)
- **Perspektive:** Demokratischer Amtstraeger (Reichspraesident)
- **Sequenz-Position:** 5 (Erarbeitung — Personifizierung "Reichspraesident")
- **Cross-Mappen:** Wiedererkennung in M3 (Ebert unterzeichnet die WRV; Bezug zu Scheidemann-Ruecktritt)
- **Aufgaben-Anker:** a2-08 (Steckbrief Ebert)

### m2-mat-06-darstellungstext-vergleichstabelle-absolutismus-demokratie
- **Typ:** darstellungstext (Hefteintrag-Slot — Vergleichstabelle)
- **Kerninhalt:** Tabelle 4-spaltig: Dimension | Absolutismus (Ludwig XIV.) | Demokratie (Weimar 1919) | Konkrete Quelle. Dimensionen: Macht-Quelle, Wahlrecht, Begrenzung der Macht, Grundrechte.
- **Quelle (TBD):** Eigenkomposition, basiert auf m2-mat-02 + m2-mat-03 (Hefteintrag-Sicherung)
- **Perspektive:** Strukturierend (multiperspektivisch synthetisch)
- **Sequenz-Position:** 6 (Sicherung — Hefteintrag, lehrplanbindend zu LB2_K_01)
- **Aufgaben-Anker:** a2-09 (Tabelle vervollstaendigen — Sicherungs-Aufgabe)

### m2-mat-07-statistik-wahlbeteiligung-1919 (post-Audit Patch v0.4.3)
- **Typ:** statistik (kompakt, R7-aufbereitet)
- **Kerninhalt:** Drei Schluessel-Zahlen: Wahlbeteiligung 19. Januar 1919 ca. 83%, 37 weibliche Abgeordnete von 423 (= 8,7%), erstmals Frauen reichsweit wahlberechtigt + waehlbar. Kontextsatz: "Erste reichsweite Wahl mit Frauenwahlrecht."
- **Quelle (VERIFIED):** wiki:Weimar_National_Assembly (Hash wiki-weimarna-2026-04-26)
- **Perspektive:** Strukturierend (faktisch) + Lebenswelt-Bezug ueber Erstwaehlerin
- **Sequenz-Position:** 4b (Erarbeitung — Quantifizierung der "Premiere")
- **Aufgaben-Anker:** a2-07b (Zahlen einordnen — was bedeutet 83% / 37 Frauen?)
- **Hintergrund:** Briefing-Material-Kandidat M2 (inhalts_briefing.json:96) wurde im urspruenglichen Inventar ausgelassen; post-Audit-Nachzug.

---

## MAPPE 3 — Versailles 1919: Wie reagieren die Menschen?

**KE-Hauptanker:** GPG7_LB3_K_04 | **Bloom:** L3-L4 | **AFB:** II
**Material-Anzahl:** 6 | **Typen-Verteilung:** karte (1), bildquelle (2), quellentext (1), darstellungstext (1), statistik (1)

### m3-mat-01-karte-gebietsverluste
- **Typ:** karte (thematische Karte mit deutscher Legende)
- **Kerninhalt:** Karte der deutschen Gebietsabtretungen 1919 — Elsass-Lothringen, Polnischer Korridor (Westpreussen + Posen), Saargebiet, Nordschleswig, Eupen-Malmedy.
- **Quelle (VERIFIED):** Wikimedia `Versailler_Vertrag.png` (CC BY-SA 3.0, Matthias Kuech; img-m3-01)
- **Perspektive:** Strukturierend (geografisch-akteursneutral)
- **Sequenz-Position:** 1 (Einstieg — Karte mit Reparationszahl als Anker)
- **Aufgaben-Anker:** a3-01 (Karte erschliessen — was sehe ich?), a3-02 (Gebiete benennen)

### m3-mat-02-bildquelle-orpen-spiegelsaal
- **Typ:** bildquelle (Gemaelde — Quellenkritik-Hinweis Pflicht)
- **Kerninhalt:** William Orpen, "The Signing of Peace in the Hall of Mirrors, Versailles" (1919). Inszenierung der Unterzeichnung 28.6.1919.
- **Quelle (VERIFIED):** Wikimedia `William_Orpen_-_The_Signing_of_Peace_in_the_Hall_of_Mirrors,_Versailles.jpg` (PD-old-70; img-m3-02)
- **Perspektive:** Sieger-Inszenierung (britischer Auftrag) — quellenkritisch markieren
- **Sequenz-Position:** 2 (Einstieg/Erarbeitung — der Akt der Unterzeichnung visualisiert)
- **Aufgaben-Anker:** a3-03 (Bildanalyse mit Quellenkritik — "Wer malt wen wie?")

### m3-mat-03-quellentext-art-231
- **Typ:** quellentext (Kurzauszug)
- **Kerninhalt:** Artikel 231 ("Kriegsschuldartikel") — gekuerzt + R7-Erlaeuterung. Pflicht-Markierung als zeitgenoessische Sieger-Position, NICHT als historische Wahrheit.
- **Quelle (VERIFIED):** wiki:Article_231_of_the_Treaty_of_Versailles (Hash wiki-art231-2026-04-26)
- **Perspektive:** Sieger-Position (Verbuendete) — quellenkritisch markieren
- **Sequenz-Position:** 3 (Erarbeitung — wirtschaftliche Bestimmung + ihre Begruendung)
- **Aufgaben-Anker:** a3-04 (Inhalt erschliessen), a3-05 (Forschungsstand-Hinweis verstehen)

### m3-mat-04-statistik-zahlen-vertrag
- **Typ:** statistik (Daten-Anker, kompakt)
- **Kerninhalt:** Drei Schluessel-Zahlen — Heeresgroesse 100.000 (vs. ca. 800.000 vor 1914), Reparationen 132 Mrd. Goldmark, Kolonien-Verlust 100%.
- **Quelle (VERIFIED):** wiki:Treaty_of_Versailles + wiki:World_War_I_reparations
- **Perspektive:** Strukturierend (faktisch)
- **Sequenz-Position:** 4 (Erarbeitung — Zahlen verankern Bestimmungen)
- **Aufgaben-Anker:** a3-06 (Zahlen einordnen — Vergleich mit Vorkriegszeit)

### m3-mat-05-darstellungstext-perspektivkarten-3
- **Typ:** darstellungstext (3 Perspektiv-Karten parallel)
- **Kerninhalt:** Drei Reaktions-Perspektiven a 3-4 Saetze: (a) heimkehrender Frontsoldat, (b) Berliner Arbeiterfamilie, (c) SPD-Reichstagsabgeordneter (Pflicht-Argument). Jede Karte beruft sich auf konkrete Vertragsbestimmung.
- **Quelle (TBD):** Eigenkomposition basierend auf wiki:Treaty_of_Versailles + wiki:Philipp_Scheidemann (Scheidemann-Ruecktritt 20.6.1919 als Politiker-Anker) + DHM-LeMO bpb
- **Perspektive:** Multiperspektivisch (3 Schichten parallel — KEINE privilegieren)
- **Sequenz-Position:** 5 (Erarbeitung — Multiperspektiv-Kern)
- **Aufgaben-Anker:** a3-07 (Perspektive zuordnen), a3-08 (Vertragsbestimmung mit Reaktion verbinden), a3-09 (begruendete Eigen-Reaktion)

### m3-mat-06-bildquelle-vertragsdokument
- **Typ:** bildquelle (Dokumentenfoto — optionaler Authentizitaets-Anker)
- **Kerninhalt:** Originaldokument Versailler Vertrag (englische Fassung), Titel-/Signaturseite — visualisiert "Diktat" als reales Dokument.
- **Quelle (VERIFIED):** Wikimedia `Treaty_of_Versailles,_English_version.jpg` (PD/Government Work; img-m3-03)
- **Perspektive:** Strukturierend (dokumentarisch)
- **Sequenz-Position:** 6 (Sicherung — Tabelle Schichten-Reaktion abschliessend, Dokument als visueller Anker)
- **Aufgaben-Anker:** a3-10 (Dokumenten-Pruefung — was steht auf dem Titel?)

---

## MAPPE 4 — 1920-1923: Die Republik unter Druck

**KE-Hauptanker:** GPG7_LB2_K_01 (impl.) | **Bloom:** L4-L5 | **AFB:** II-III
**Material-Anzahl:** 6 | **Typen-Verteilung:** bildquelle (3), statistik (1), quellentext (1), tagebuch (1) — Krisen-Tabelle als Sicherung in m4-mat-06 (zeitleiste/darstellungstext-Hybrid)

### m4-mat-01-bildquelle-billionenschein
- **Typ:** bildquelle (Foto — haptisch-anschaulicher Einstieg)
- **Kerninhalt:** 100-Billionen-Mark-Reichsbanknote 1923 — groesste regulaere Stueckelung der Hyperinflation.
- **Quelle (VERIFIED):** Wikimedia `100-Billionen-Geldschein.jpg` (PD; img-m4-03)
- **Perspektive:** Alltagsbetroffen (Lebenswelt-Anker)
- **Sequenz-Position:** 1 (Einstieg — provokanter haptischer Anker "Was kann man damit kaufen?")
- **Aufgaben-Anker:** a4-01 (Schein-Beschreibung — Zahl entziffern)
- **Cross-Mappen:** keine direkten

### m4-mat-02-statistik-brotpreis-tabelle
- **Typ:** statistik (Tabelle mit zeitlicher Progression)
- **Kerninhalt:** Brotpreis Januar - November 1923, etwa 5 Stuetzpunkte — Anschauungsbeispiel Hyperinflation. Begleitsatz: "Lohn am Morgen, wertlos am Abend."
- **Quelle (VERIFIED-Daten):** wiki:Hyperinflation_in_the_Weimar_Republic + DHM-LeMO Inflation
- **Perspektive:** Strukturierend (faktisch) + Lebenswelt-Bezug ueber Begleitsatz
- **Sequenz-Position:** 2 (Erarbeitung — Inflation quantifiziert)
- **Aufgaben-Anker:** a4-02 (Zahlenreihe lesen), a4-03 (Auswirkung auf Familienalltag schlussfolgern)

### m4-mat-03-tagebuch-arbeiterfamilie-nov-1923
- **Typ:** tagebuch (kurzer Eintrag, R7-aufbereitet, quellengestuetzt)
- **Kerninhalt:** Fiktiver, aber quellengestuetzter Tagebucheintrag einer Berliner Arbeiterfamilie November 1923 (Inflations-Erleben, Brot-Kauf-Szene). 6-8 Saetze, max. 14 Woerter pro Satz.
- **Quelle (TBD):** Eigenkomposition basierend auf zeitgenoessischen Quellen (DHM-LeMO Inflation, wiki:Hyperinflation Augenzeugenberichte). Pflicht-Markierung "rekonstruiert auf Quellenbasis".
- **Perspektive:** Berliner Arbeiterfamilie 1923 (Lebenswelt-Anker, existentiell)
- **Sequenz-Position:** 3 (Erarbeitung — Existenznot menschlich konkret)
- **Trigger-Vermerk:** RELEVANT — `hyperinflation_existenznot_familien` → altersgemaess + sachlich, KEINE Schock-Effekte. Lehrkraft-Sichtbarkeit gemaess agent-didaktik Sektion 6.
- **Aufgaben-Anker:** a4-04 (Eintrag erschliessen), a4-05 (Bezug Brotpreis ↔ Erleben)

### m4-mat-04-bildquelle-kapp-putsch
- **Typ:** bildquelle (Foto — Krise von rechts)
- **Kerninhalt:** Geschuetz der Marinebrigade Ehrhardt am Pariser Platz/Brandenburger Tor, Kapp-Putsch Maerz 1920 — sichtbarer militaerischer Putsch im Regierungsviertel.
- **Quelle (VERIFIED):** Wikimedia `Bundesarchiv_Bild_183-H25109,_Kapp-Putsch,_Brigade_Erhardt,_Berlin.jpg` (CC BY-SA 3.0 DE; img-m4-05)
- **Perspektive:** Konservativ-monarchistische Putschisten (Republik-Gegner von rechts) — sichtbar gemacht ohne Verherrlichung
- **Sequenz-Position:** 4 (Erarbeitung — Krise 1: Kapp-Putsch)
- **Trigger-Vermerk:** RELEVANT — `politische_gewalt_putsche_1919_1923` → sachlich-dokumentarisch, KEIN heroisierender Ton. Generalstreik als Gegenkraft betonen.
- **Aufgaben-Anker:** a4-06 (Bildbeschreibung), a4-07 (Wer steht hier mit Waffen — wozu?)

### m4-mat-05-quellentext-aufruf-generalstreik
- **Typ:** quellentext (Auszug zeitgenoessischer Aufruf)
- **Kerninhalt:** Aufruf zum Generalstreik gegen Kapp-Putsch (Maerz 1920) — Auszug 4-6 Zeilen. Zeigt buergerschaftliche Republik-Verteidigung.
- **Quelle (TBD-Recherche, hochwahrscheinlich PD):** DHM-LeMO Kapp-Putsch (Aufruf der Reichsregierung + SPD/Gewerkschaften vom 13.3.1920)
- **Perspektive:** Gewerkschafter / Streikender Arbeiter (Republik-Verteidigung)
- **Sequenz-Position:** 5 (Erarbeitung — Krisen-Antwort: ziviler Widerstand rettet die Republik)
- **Aufgaben-Anker:** a4-08 (Aufruf erschliessen), a4-09 (Wirkung beurteilen — Republik durch Buerger gerettet)

### m4-mat-06-zeitleiste-krisen-1920-1923
- **Typ:** zeitleiste (Hefteintrag-Slot — Krisen-Tabelle/Krisen-Zeitleiste)
- **Kerninhalt:** 4-Knoten-Zeitleiste 1920-1923: (1) Kapp-Putsch Maerz 1920 (Antwort: Generalstreik), (2) Ruhrbesetzung Jan 1923 (Antwort: passiver Widerstand), (3) Hyperinflation Hoehepunkt Nov 1923 (Antwort: Rentenmark 15.11.1923), (4) Hitler-Putsch 8./9. Nov 1923 in Muenchen (Antwort: Polizei + Gerichtsverfahren — gescheitert). Spalten: Krise | Ursache | Antwort/Stuetze.
- **Quelle (TBD):** Eigenkomposition basierend auf wiki:Kapp_Putsch + wiki:Occupation_of_the_Ruhr + wiki:Hyperinflation + wiki:Beer_Hall_Putsch (Hefteintrag-Sicherung)
- **Perspektive:** Strukturierend (synthetisch — Krise UND Stuetze parallel)
- **Sequenz-Position:** 6 (Sicherung — Hefteintrag, ermoeglicht begruendetes Krisenresilienz-Urteil)
- **Trigger-Vermerk:** RELEVANT — Hitler-Putsch streng als gescheiterter Putsch 1923 darstellen, KEIN Vorgriff auf 1933. Tote bei Feldherrnhalle benennen, ohne Putschisten zu heroisieren.
- **Aufgaben-Anker:** a4-10 (Zeitleiste vervollstaendigen — Antwort-Spalte), a4-11 (begruendetes Urteil "Hat die Republik bestanden? Warum?")
- **Cross-Mappen:** Rueckverweis auf m3-mat-04 (Reparationen → Ursache Ruhrbesetzung → Ursache Hyperinflation); Rueckverweis auf m1-mat-04 (Acht-Stunden-Tag, Wahlrecht — was die Republik geschaffen hat, lohnt sich zu verteidigen).

---

## Cross-Mappen-Konsistenz (Game-weite Bezuege)

| Bezug | Verweis-Mappe | Ziel-Mappe | Funktion |
|---|---|---|---|
| Scheidemann-Wiedererkennung | M1 (m1-mat-01) | M3 (Politiker-Perspektive m3-mat-05; Ruecktritt 20.6.1919) | Personen-Kontinuitaet |
| Ebert-Wiedererkennung | M2 (m2-mat-05) | M3/M4 (Reichspraesident im Krisenkontext) | Institution + Person |
| Versailles-Reparationen → Hyperinflation | M3 (m3-mat-04) | M4 (m4-mat-06 Ursachenspalte) | Kausalkette |
| Republik-Errungenschaften (Wahlrecht, 8-h-Tag) → "wert verteidigt zu werden" | M1 (m1-mat-04) + M2 (m2-mat-03) | M4 (m4-mat-05 Generalstreik-Aufruf) | Wertfundament der Krisenresilienz |
| Doppelausrufung-Spannung | M1 (m1-mat-01 + Steckbrief) | M4 (Republik-Gegner von links/rechts; Kontext zu Putschen) | Politisches Spektrum |

---

## Multiperspektiv-Verteilung (Pflicht: mind. 3 Perspektiven pro Mappe)

| Mappe | Perspektiven via Material | Anzahl | Status |
|---|---|---|---|
| M1 | (1) Sozialdem.-parlamentarisch (m1-mat-01, m1-mat-04) — (2) Monarchisch-konservativ (m1-mat-02) — (3) Strukturierend/Akteure-Mix (m1-mat-03, m1-mat-05) — Raete-revolutionaer im Steckbrief erwaehnt | 3+ | PASS |
| M2 | (1) Verfassungsgeber/Demokratisch (m2-mat-03, m2-mat-04, m2-mat-05) — (2) Vergleichs-Stimme Absolutismus (m2-mat-01, m2-mat-02) — (3) Strukturierend-vergleichend (m2-mat-06) | 3 | PASS |
| M3 | (1) Frontheimkehrer (m3-mat-05a) — (2) Arbeiterfamilie (m3-mat-05b) — (3) SPD-Politiker (m3-mat-05c) — Sieger-Position via m3-mat-03 + m3-mat-02 (quellenkritisch) | 4 | PASS |
| M4 | (1) Putschisten von rechts (m4-mat-04, m4-mat-06 Hitler-Putsch-Knoten) — (2) Gewerkschafter/Republikverteidiger (m4-mat-05) — (3) Berliner Arbeiterfamilie/Alltag (m4-mat-03, m4-mat-01, m4-mat-02) | 3 | PASS |

---

## Hefteintrag-Slots (explizit markiert)

| Mappe | Material-ID | Hefteintrag-Funktion | Lehrplan-Bindung |
|---|---|---|---|
| M1 | m1-mat-05 | Steckbrief 9. November 1918 | LB2_K_08 (Kriegsfolgen → Republikgruendung) |
| M2 | m2-mat-06 | Vergleichstabelle Absolutismus vs. Demokratie | LB2_K_01 (Kern-KE-Operationalisierung) |
| M3 | m3-mat-05 (+ Synthese in Mappe) | Schichten-Reaktions-Tabelle (3 Perspektiv-Karten ergeben Tabelle) | LB3_K_04 (Bestimmungen → Schichten-Unzufriedenheit) |
| M4 | m4-mat-06 | Krisen-Zeitleiste/Tabelle 1920-1923 (Krise / Ursache / Stuetze) | LB2_K_01 (Krisenresilienz-Urteil) + LB3_K_04 (Versailles-Folgewirkung) |

---

## Lizenz-Inventar (Verwendungs-Pflichten)

| Lizenz-Typ | Anzahl Bilder | Attribution-Pflicht |
|---|---|---|
| Public Domain | 6 (img-m1-01, img-m1-03, img-m2-01, img-m2-02, img-m2-04, img-m3-02, img-m3-03, img-m4-01, img-m4-02, img-m4-03, img-m4-04) | Quellen-Vermerk empfohlen, Kennzeichnung "gemeinfrei" |
| CC BY-SA 3.0 DE (Bundesarchiv) | 4 (img-m2-03 Ebert, img-m4-05 Kapp, img-m4-06 Hitler-Putsch — sowie m1-mat-02 ist PD via 136-C-Serie) | "Bundesarchiv, Bild XXX / Fotograf / CC-BY-SA 3.0" |
| CC BY-SA 3.0 | 1 (img-m3-01 Karte Kuech) | "Matthias Kuech / Wikimedia Commons / CC BY-SA 3.0" |

Alle Lizenzen sind GitHub-Pages-kompatibel (kein NC, kein ND).

---

## Stoffdichte-Pruefung R7

| Mappe | Material-Anzahl | Korridor 4-7 | Status |
|---|---|---|---|
| M1 | 5 | ja | PASS |
| M2 | 6 | ja | PASS |
| M3 | 6 | ja | PASS |
| M4 | 6 | ja | PASS |

**Typen-Vielfalt pro Mappe (mind. 3 unterschiedliche Typen):** M1: 4 Typen | M2: 4 Typen (post-Audit +Statistik) | M3: 5 Typen | M4: 5 Typen — alle PASS, keine Quellentext-Monokultur.

---

## Schema-Erweiterung Patch v0.4.3 (post-Audit 2026-04-26)

Nach Audit Review-D wurden drei Pflicht-Felder fuer Phase-1-Traceability ergaenzt. Die folgende Cross-Reference-Tabelle bindet jedes Material an konkrete Briefing-Fakten und Tafelbild-Knoten — sodass agent-quellentext / agent-bildquelle / agent-aufgabe in Phase 1 exakt produzieren koennen.

### M1 Cross-Reference

| Material-ID | anker_briefing (schluessel_fakten / kerninhalt) | tafelbild_knoten (DIDAKTIK_RAHMEN §7 / Hefteintrag) |
|---|---|---|
| m1-mat-01 (Foto Scheidemann) | wiki-doppel-ausrufung-2026-04-26 (Doppelausrufung 9.11.1918) | Steckbrief 9.11.1918: Akteur "Scheidemann am Reichstag" |
| m1-mat-02 (Wilhelm Exil) | wiki-wilhelm2-2026-04-26 (Abdankung Wilhelm II.) | Steckbrief 9.11.1918: Kontrast "Kaiser dankt ab" |
| m1-mat-03 (Zeitleiste) | wiki-kielmutiny-2026-04-26 + wiki-novemberrevolution-2026-04-26 | Steckbrief 9.11.1918: zeitliche Verortung |
| m1-mat-04 (Aufruf RdV) | wiki-novemberrevolution-2026-04-26 (erste Reformen Acht-Stunden-Tag etc.) | Steckbrief 9.11.1918: "Was änderte sich" (Wahlrecht, 8-h-Tag) |
| m1-mat-05 (Steckbrief) | M1 kerninhalt 1-5 (Synthese) | **Hefteintrag M1 (Steckbrief)** |
| m1-mat-06 (Portrait Scheidemann) | wiki-doppel-ausrufung-2026-04-26 (Akteurs-Identifikation) | Steckbrief 9.11.1918: Akteurs-Visual |

### M2 Cross-Reference

| Material-ID | anker_briefing | tafelbild_knoten |
|---|---|---|
| m2-mat-01 (Louis XIV Portrait) | M2 kerninhalt 5 (Vergleich Selbstverstaendnis) | Vergleichstabelle Absolutismus-Spalte: Macht-Symbolik |
| m2-mat-02 (Zitat L'etat) | M2 kerninhalt 5 | Vergleichstabelle Absolutismus-Spalte: "Macht beim Herrscher" |
| m2-mat-03 (WRV Art. 1/22/109) | wf-verfde-art1/22/109-2026-04-26 | Vergleichstabelle Demokratie-Spalte: 3 Verfassungs-Anker |
| m2-mat-04 (Plenum Weimar) | wiki-weimarna-2026-04-26 | Vergleichstabelle: institutioneller Anker |
| m2-mat-05 (Portrait Ebert) | wiki-wrv-2026-04-26 (Reichspraesident-Rolle) | Vergleichstabelle Demokratie-Spalte: Amtstraeger. **BU-Pflicht "1925"** (Drift-Hinweis) |
| m2-mat-06 (Vergleichstabelle) | M2 kerninhalt synthetisch | **Hefteintrag M2 (Vergleichstabelle)** |
| m2-mat-07 (Statistik Wahlbeteiligung) | wiki-weimarna-2026-04-26 (83%, 37 Frauen) | Vergleichstabelle Demokratie-Spalte: Wahlrecht-Quantifizierung |

### M3 Cross-Reference

| Material-ID | anker_briefing | tafelbild_knoten |
|---|---|---|
| m3-mat-01 (Karte Gebietsverluste) | wiki-treaty-2026-04-26 (Gebiete) | Schichten-Tabelle: Spalte "Territoriale Bestimmungen" |
| m3-mat-02 (Orpen-Gemaelde) | wiki-treaty-2026-04-26 (Unterzeichnung 28.6.1919). **Quellenkritik-Pflicht** | Schichten-Tabelle: Inszenierungs-Anker (Lehrkraft-sichtbar) |
| m3-mat-03 (Art. 231) | wiki-art231-2026-04-26 | Schichten-Tabelle: Spalte "Wirtschaftliche Bestimmungen" + Kriegsschuld-Lehrkraft-Hinweis |
| m3-mat-04 (Statistik 100k/132Mrd) | wiki-treaty-2026-04-26 + wiki-londonschedule-2026-04-26 | Schichten-Tabelle: Quantifizierung |
| m3-mat-05 (3 Perspektiv-Karten) | M3 perspektiven_kandidaten 1-3 + wiki-scheidemann-2026-04-26 (Politiker-Anker; Zitat 12.5.1919 vs. Ruecktritt 20.6.1919 separat) | **Hefteintrag M3 (Schichten-Reaktion)** |
| m3-mat-06 (Originaldokument) | wiki-treaty-2026-04-26 | Schichten-Tabelle: visueller Schluss-Anker |

### M4 Cross-Reference

| Material-ID | anker_briefing | tafelbild_knoten |
|---|---|---|
| m4-mat-01 (Billionenschein) | wiki-hyperinfl-2026-04-26 | Krisen-Tabelle: Krise "Hyperinflation" haptisch |
| m4-mat-02 (Brotpreis-Tabelle) | wiki-hyperinfl-2026-04-26 | Krisen-Tabelle: Krise "Hyperinflation" quantifiziert |
| m4-mat-03 (Tagebuch Arbeiterfamilie) | M4 kerninhalt 4 (Lebenswelt-Anker) | Krisen-Tabelle: Krise "Hyperinflation" existentiell |
| m4-mat-04 (Foto Kapp-Putsch) | wiki-kapp-2026-04-26 (Marinebrigade Ehrhardt) | Krisen-Tabelle: Krise "Kapp-Putsch" |
| m4-mat-05 (Aufruf Generalstreik) | wiki-kapp-2026-04-26 (Generalstreik 13.-17.3.1920) | Krisen-Tabelle: Stuetze "Generalstreik" |
| m4-mat-06 (Krisen-Zeitleiste) | wiki-kapp + wiki-ruhr + wiki-hyperinfl + wiki-beerhall (alle 2026-04-26) | **Hefteintrag M4 (Krisen-Tabelle)**. Hitler-Putsch-Knoten: BU-Pflicht "Marienplatz Muenchen, 9.11.1923" (Drift-Hinweis Item 3) |

---

## 3-Stufen-Tipp-Geruest (Phase-1-Vorbereitung, post-Audit Patch v0.4.3)

**Konvention:** Pro Aufgaben-Anker werden 3 Tipp-Stufen vorbereitet (gemaess DIDAKTIK_RAHMEN §7 Differenzierungshinweise). Hier nur Slot-Geruest pro Mappe; finale Tipp-Texte werden in agent-raetsel (Phase 1) befuellt.

### M1 Tipp-Slots

| Aufgaben-ID | Stufe-1-Slot (Denkanstoss) | Stufe-2-Slot (Richtung) | Stufe-3-Slot (Erklaerung mit Loesung) |
|---|---|---|---|
| a1-01 Bildbeschreibung | TBD | TBD | TBD |
| a1-02 Erschliessung Datum/Ort/Akteur | TBD | TBD | TBD |
| a1-03 Vergleich Symbolik | TBD | TBD | TBD |
| a1-04 Reihenfolge sortieren | TBD | TBD | TBD |
| a1-05 Kausalkette | TBD | TBD | TBD |
| a1-06 Inhalt erschliessen Aufruf | TBD | TBD | TBD |
| a1-07 Wirkung beurteilen | TBD | TBD | TBD |
| a1-08 Steckbrief vervollstaendigen | TBD | TBD | TBD |

### M2 Tipp-Slots

| Aufgaben-ID | Stufe-1-Slot | Stufe-2-Slot | Stufe-3-Slot |
|---|---|---|---|
| a2-01 bis a2-09 | TBD | TBD | TBD |

### M3 Tipp-Slots (DIDAKTIK_RAHMEN §7 Beispiel-Befuellung verfuegbar)

| Aufgaben-ID | Stufe-1 | Stufe-2 | Stufe-3 |
|---|---|---|---|
| a3-01 bis a3-10 | TBD (Beispiel a3-07 Perspektive zuordnen vorhanden in DIDAKTIK_RAHMEN §7) | TBD | TBD |

### M4 Tipp-Slots

| Aufgaben-ID | Stufe-1 | Stufe-2 | Stufe-3 |
|---|---|---|---|
| a4-01 bis a4-11 | TBD | TBD | TBD |

**Hinweis fuer agent-raetsel (Phase 1):** Pro Stufe gilt: Stufe 1 fragt zurueck (kognitive Aktivierung), Stufe 2 fokussiert auf relevantes Material/Indiz, Stufe 3 liefert die Loesungs-Lesart inkl. Begruendung. R7-Sprachvertrag (max. 14 Woerter / Satz, Du-Form) gilt durchgaengig.
