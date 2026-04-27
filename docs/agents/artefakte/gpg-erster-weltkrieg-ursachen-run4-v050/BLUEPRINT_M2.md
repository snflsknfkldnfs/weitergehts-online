# Material-Geruest: Mappe M2 — Sarajevo 1914

**Game-ID:** `gpg-erster-weltkrieg-ursachen-run4-v050`
**Run-ID:** `run-4-2026-04-26`
**Mappe:** M2 — Sarajevo 1914 — Ein Schuss, eine Welt im Krieg
**Stundenfrage:** Wie wurde aus dem Attentat in Sarajevo in fuenf Wochen ein Weltkrieg?
**Erstellt:** 2026-04-26 (Phase 1, agent-material-design, Plugin v0.5.0)
**Validierungsstatus:** ENTWURF (User-Validierung PFLICHT — Mappe 2 ist Strategie-Audit-E1-Kalibrierungs-Mappe)
**Eingabe:** SKRIPT M2 §1-§7, HEFTEINTRAG M2 (SCPL, STRUKTUR-FREEZE), DIDAKTIK_RAHMEN M2, artefakt_inventar M2, medien_katalog_game M2

**KE-Anker (haupt):** `GPG7_LB2_K_06` (Sarajevo + Ursache/Ausloeser)
**AFB:** II (Anwenden → Analysieren)
**Bloom:** Anwenden → Analysieren
**Konflikttyp:** `true`
**Perspektiven-Policy:** `P1: Bosnisch-serbische Nationalisten (Princip / Junges Bosnien) | P2: Habsburger / Oesterreich-Ungarn (Franz Ferdinand / Berchtold) | P3: Deutsches Reich (Wilhelm II. / Bethmann Hollweg) | P4: Russisches Zarenreich (Sasonow) | P5: Britische Regierung (Grey)`

---

## SCPL-Abdeckung (aus HEFTEINTRAG, fixiert)

Tafelbild-Visualisierung: Zeitstrahl mit Begriffsbox (`zeitstrahl_mit_begriffsbox`).

| SCPL-Zone | Knoten-ID | Kurztext | Fachbegriffe | Material-Abdeckung |
|---|---|---|---|---|
| **S** (Situation) | K2-2 | 28. Juni 1914 Sarajevo — Princip 19 J. erschiesst Franz Ferdinand + Sophie | Sarajevo, Schwarze Hand, Junges Bosnien | mat-2-2 (Tatortskizze), mat-2-3 (FF-Portrait), mat-2-4 (Princip-Foto) |
| **C1** (Complication 1) | K2-3 | Blanko-Scheck Berlin → Wien (5./6.7.) | Blanko-Scheck | mat-2-1 (Zeitleiste) |
| **C2** (Complication 2) | K2-4 | Ultimatum + Kriegserklaerung 28.7. (AT-UN → SR) | Ultimatum, Julikrise | mat-2-5 (Ultimatum-Quellentext), mat-2-1 (Zeitleiste) |
| **C3** (Complication 3) | K2-5 | Buendnis-Domino 1.-4. August (1.8. DT→RU, 3.8. DT→FR, 4.8. GB→DT) | Mobilmachung, Buendnisfall | mat-2-1 (Zeitleiste) |
| **P** (Problem) | — | 5 Wochen → Weltkrieg (kein eigener TB-Knoten, P-Funktion implizit) | — | mat-2-1 (Zeitleiste-Synthese) |
| **L** (Loesung) | K2-1 | Ausloeser vs. Ursache — brennbarer Wald (M1) + Zigarette (Princip) | Ursache, Ausloeser | mat-2-1 (TB-Sicherungs-Slot via Hefteintrag-Bezug) |

**SCPL-Hinweis:** Der HEFTEINTRAG legt fuer M2 die SCPL-Abbildung fest auf: Situation = 28.6.1914 Sarajevo / Complication = Julikrise + Domino / Problem = 5 Wochen → Weltkrieg / Loesung = Ursache vs. Ausloeser (Quelle: hefteintrag_struktur.json `cross_konsistenz_check.scpl_struktur_pro_mappe.M2`). Die L-Zone wird NICHT durch ein eigenes Material erarbeitet, sondern als Sicherungs-Schritt im Hefteintrag (B.3 Sicherungs-Text) verankert. Die fuenf Materialien dieser Mappe muessen die Erarbeitbarkeit der SCPL-Zonen S, C1-C3, P abdecken; L wird im Sicherungs-Text aus den erarbeiteten Materialien synthetisiert.

**DIRECT-Check:** 5/5 SCPL-Zonen mit Erarbeitungs-Funktion (S, C1, C2, C3, P) sind durch mindestens 1 Material DIRECT erarbeitbar. INFERENTIAL-Anteil: 0%. Schwelle 70% DIRECT erreicht: **JA** (100% DIRECT).

---

## Material-Entwurf

| ID | Typ | Titel | Skript-Absatz | SCPL-Zone | TB-Knoten | Artefakt-Ref | Quelle/Erstellung | W-Budget | sensibilitaets_markierung |
|---|---|---|---|---|---|---|---|---|---|
| mat-2-1 | zeitleiste | Julikrise 1914 — vom Schuss zum Weltkrieg | §3-§5 | C1, C2, C3, P | K2-3, K2-4, K2-5 | (keine; Eigen-Zeitleiste, Datenbasis Wikipedia July_Crisis + WWI + Belgium-1914) | Eigenproduktion (SUB_ZEITLEISTE) | ~110W (≥6 Daten + Akteure) | keine |
| mat-2-2 | bildquelle (karte) | Tatortskizze Sarajevo 28.6.1914 | §2 | S | K2-2 | img-m2-01 (Sarajevo-assn-chart.svg, CC-BY-SA-3.0, Oni Lukos) | Wikimedia Commons VERIFIED | ~70W BU + ~60W Kontext | gewalt_altersfilter |
| mat-2-3 | bildquelle | Franz Ferdinand — der Thronfolger | §1 | S | K2-2 | img-m2-02 (Franz_ferdinand.jpg, PD, Carl Pietzner ca. 1896) | Wikimedia Commons VERIFIED | ~70W BU + ~50W Kontext | propaganda_kontextualisierung_noetig |
| mat-2-4 | bildquelle | Gavrilo Princip vor Gericht | §2 | S | K2-2 | img-m2-03 (Gavrilo_Princip,_outside_court.jpg, PD, anonym 1914) | Wikimedia Commons VERIFIED | ~70W BU + ~80W Kontext | propaganda_kontextualisierung_noetig |
| mat-2-5 | quellentext (primaer) | Auszug aus dem Wiener Ultimatum an Serbien (23.7.1914) | §4 | C2 | K2-4 | (keine Bilddatei; Textquelle Wikisource) | SUB_QUELLENTEXT, Datenbasis Wikisource Wien-Originaltext | ≤80W gekuerzter Auszug + ~40W Kontext | propaganda_kontextualisierung_noetig |

**Erlaeuterungen zu sensibilitaets_markierung:**

- **mat-2-2 (Tatortskizze)** → `gewalt_altersfilter`: SVG-Skizze ist bewusst die Sekundaer-Wahl statt eines Foto. Dispatch-Constraint `altersfilter_hinweis` (Pflichtfeld an SUB_BILDQUELLE): "Im Material klar benennen, dass dies eine Sekundaer-Skizze ohne Gewaltdarstellung ist; KEINE Beschreibung der Verletzungen oder des Sterbens."
- **mat-2-3 (Franz Ferdinand Hofportrait)** → `propaganda_kontextualisierung_noetig`: Auftrags-Inszenierung des Habsburger Hofs (Hofphotograph Carl Pietzner). Dispatch-Constraint `kontextualisierung_satz` (Pflichtfeld): "Klar benennen, dass dies ein offizielles Auftragsbild ist — kein neutrales Foto."
- **mat-2-4 (Princip Gerichtsfoto)** → `propaganda_kontextualisierung_noetig`: Multiperspektivitaets-Pflicht (QG-06): Princip wird in Serbien teils als Held, in Bosniaken/Kroaten teils als Terrorist erinnert. Dispatch-Constraint `kontextualisierung_satz` (Pflichtfeld): "Beide Erinnerungs-Perspektiven (serbisch-nationale Held-Sicht und habsburgisch-bosniakische Terrorist-Sicht) gleichberechtigt nennen, ohne wertende Etikettierung."
- **mat-2-5 (Wiener Ultimatum)** → `propaganda_kontextualisierung_noetig`: Primaerquelle der Habsburger Reichsfuehrung (Berchtold), bewusst formulierter Eskalations-Schritt. Dispatch-Constraint `kontextualisierung_satz` (Pflichtfeld): "In R7-tauglicher Sprache benennen, wer schreibt (Wien), an wen (Serbien), mit welchem Ziel (Eskalations-bereit, Wien wusste, dass Serbien ablehnen wuerde)."

**Mindest-Check (Material-Mix):**
- Mindestens 1 Darstellungstext: **NICHT erfuellt** (im artefakt_inventar nicht vorgesehen — siehe Cross-Konsistenz-Hinweis). **Begruendung der Abweichung:** Der Hefteintrag-Sicherungs-Text (B.3) und die Zeitleiste (mat-2-1) uebernehmen gemeinsam die Funktion eines klassischen Darstellungstexts: chronologische Strukturierung + Begriffs-Differenzierung Ursache/Ausloeser. Die Begriffs-Erklaerung "Blanko-Scheck", "Ultimatum", "Mobilmachung", "Buendnisfall" erfolgt in mat-2-1 (Zeitleiste-Begleittext) und mat-2-5 (Ultimatum-Kontextualisierung). Der zentrale Lern-Schritt "Ursache vs. Ausloeser" (L-Zone) wird im Hefteintrag verankert. **WARN-Finding** dokumentiert, kein BLOCKER (M2 ist nicht text-arm — die Zeitleiste enthaelt erklaerende Texte, der Quellentext ist ein Lese-Anker, beide BU-Texte sind ausfuehrlich).
- Mindestens 1 Quelle/Bild: **erfuellt** (4 Bilder + 1 Quellentext = 5 Quellen-/Bild-Materialien)
- Mindestens 1 personifiziert: **erfuellt** (mat-2-3 Franz Ferdinand, mat-2-4 Princip, mat-2-5 Princip-/Berchtold-Stimme im Ultimatum-Kontext)
- Mindestens 1 visuell: **erfuellt** (mat-2-1 Zeitleiste, mat-2-2 Karte, mat-2-3 + mat-2-4 Bildquellen)
- Gesamt ≥4: **erfuellt** (5 Materialien)

**Medienvielfalt-Ratio (MV1):**
- Textbasiert: mat-2-5 (Quellentext) = 1
- Nicht-textbasiert: mat-2-1 (Zeitleiste, visuell-strukturierend), mat-2-2 (Karte/Skizze), mat-2-3 (Bildquelle), mat-2-4 (Bildquelle) = 4
- 1/5 textbasiert (20%) — Schwelle 50% nicht ueberschritten. **PASS**.

---

## Zielklarheit-Pruefung

| Material | Funktion (1-Satz) | SCPL-Zone | Artefakt-Ref |
|---|---|---|---|
| mat-2-1 | Erarbeitet die Zeitstruktur der Julikrise (28.6. → 5./6.7. → 23.7. → 28.7. → 1.-4.8.) und macht den Buendnis-Domino-Mechanismus chronologisch sichtbar. | C1, C2, C3, P | (Eigen-Zeitleiste) |
| mat-2-2 | Erarbeitet die raeumlich-konkrete Situation des Attentats (Lateinerbruecke, Auto-Route, Standort Princip) — bewusste Sekundaer-Skizze ohne Gewaltdarstellung. | S | img-m2-01 |
| mat-2-3 | Erarbeitet die Person des Opfers (Franz Ferdinand) und macht die Habsburger Hof-Selbstdarstellung als Quelle einer Auftrags-Inszenierung sichtbar. | S | img-m2-02 |
| mat-2-4 | Erarbeitet die Person des Taeters (Princip, 19 Jahre, "Junges Bosnien") und die multiperspektivische Erinnerung (Held-vs.-Terrorist-Doppelung). | S | img-m2-03 |
| mat-2-5 | Erarbeitet den Eskalations-Schritt 23.7.: Welche Forderung Wien an Serbien stellte und warum die Forderung bewusst Eskalations-bereit war (Blanko-Scheck-Vertrauen). | C2 | (Wikisource-Volltext) |

Alle 5 Materialien haben dokumentierten Zweck-Satz + SCPL-Zuordnung + Artefakt-Ref oder explizite Begruendung.

---

## Nicht verwendete Artefakte

Aus dem SKRIPT M2 §1-§7 referenzierte Artefakte:

| ID | Verwendet in | Status |
|---|---|---|
| img-m2-01 (Tatortskizze) | mat-2-2 | verwendet |
| img-m2-02 (Franz Ferdinand) | mat-2-3 | verwendet |
| img-m2-03 (Princip vor Gericht) | mat-2-4 | verwendet |
| zit-M2-1 (Princip-Aussage Gericht 1914-10) | — | **NICHT VERWENDET** |

**zit-M2-1 (Princip-Aussage Gericht Oktober 1914)** — Begruendung der Nicht-Verwendung:

Das Skript referenziert in §4 zit-M2-1 als Princip-Selbst-Aussage vor Gericht ("Ich bin ein jugoslawischer Nationalist..."). Im artefakt_inventar.json ist fuer M2 jedoch KEIN entsprechendes Material-Slot eingerichtet (5 Materialien geplant, davon 1 Zeitleiste + 3 Bildquellen + 1 Quellentext-Ultimatum). Statt der Princip-Aussage wurde im artefakt_inventar bewusst der Ultimatum-Auszug (mat-2-5) als Primaer-Quellentext gesetzt — Begruendung: didaktische Zentralitaet fuer C2 (Ultimatum-Eskalation), waehrend die Princip-Aussage S/L-Zonen-Doppelung waere. Das zit-M2-1 wird im SUB_BILDQUELLE-Kontext fuer mat-2-4 (Princip-Foto) als R7-vereinfachter BU-Anker angerissen ("Vor Gericht sagte er: 'Ich bin jugoslawischer Nationalist'"), aber nicht als eigenes mat-Material produziert. **Reserve-Eignung:** Falls in Phase 2.1c eine zusaetzliche Princip-Stimme noetig wird, ist zit-M2-1 als Backup verfuegbar.

---

## Erarbeitbarkeits-Nachweis

### SCPL-Zonen-Abdeckung

| SCPL-Zone | Material | Stelle | Erarbeitungsweg |
|---|---|---|---|
| S: 28.6.1914 Sarajevo | mat-2-2 (Tatortskizze) | gesamtes Material | SuS sehen Lateinerbruecke + Fahrtroute Auto + Standort Princip; rekonstruieren raeumlich, was passierte (ohne Gewaltdarstellung). Der BU-Text benennt das Datum, die Personen (Princip, FF, Sophie), den Ort. |
| S: Akteur Opfer (FF) | mat-2-3 (FF-Portrait) | gesamtes Material | SuS sehen, wer der Thronfolger war (Alter, Funktion, Hof-Inszenierung); Quellenkritik macht das Auftragsbild als Quelle der Habsburger Selbstdarstellung lesbar. |
| S: Akteur Taeter (Princip) | mat-2-4 (Princip-Foto) | gesamtes Material | SuS sehen, wer der Taeter war (19 Jahre, Schueler, Junges Bosnien); BU benennt die multiperspektivische Erinnerung (Held vs. Terrorist). |
| C1: Blanko-Scheck (5./6.7.) | mat-2-1 (Zeitleiste) | Eintrag #2 | SuS lesen das Datum 5./6.7.1914 + Akteure (Wilhelm II. → Berchtold) + Aktion ("Blanko-Scheck: Versprechen ohne Bedingungen"). |
| C2: Ultimatum 23.7. | mat-2-5 (Ultimatum-Auszug) + mat-2-1 (Zeitleiste #3) | Auszug + Eintrag #3 | mat-2-5 zeigt im R7-vereinfachten Auszug die Forderung an Serbien (Hauptforderung: oesterreichische Beamte ermitteln in Serbien gegen Schwarze Hand). mat-2-1 fixiert das Datum 23.7. + 48-h-Frist. |
| C2: Kriegserklaerung 28.7. AT-UN → SR | mat-2-1 (Zeitleiste) | Eintrag #4 | SuS lesen das Datum + den Akteur (AT-UN) + die Aktion (Kriegserklaerung an Serbien) + den Bezug (1 Monat nach Attentat). |
| C3: Buendnis-Domino 1.-4.8. | mat-2-1 (Zeitleiste) | Eintraege #5-#7 | SuS lesen die drei Dominosteine: 1.8. DT→RU, 3.8. DT→FR, 4.8. GB→DT (wegen Belgien-Verletzung). Buendnisfall + Mobilmachung im Begleittext erklaert. |
| P: 5 Wochen → Weltkrieg | mat-2-1 (Zeitleiste-Gesamt) | Synthese-BU | Die Zeitleiste macht das Phaenomen sichtbar: 7 Daten in 5 Wochen, 6 Akteure, 1 Schuss am Anfang, ein Welt-Krieg am Ende. |

### SCPL-Uebergangs-Erarbeitbarkeit (kausaler Mechanismus)

| Uebergang | Material | Zusammenhang belegt durch | kausal_mechanismus |
|---|---|---|---|
| S → C1 (Sarajevo → Blanko-Scheck) | mat-2-1 Eintraege #1+#2 + mat-2-4 (Princip-Kontext) | Zeitleiste zeigt: Attentat 28.6. → 8 Tage spaeter Blanko-Scheck. mat-2-4 BU benennt: Wien wuetend, traut sich aber nicht alleine, fragt Berlin. | Attentat erzeugt Habsburger Praeventivkriegs-Wunsch → Wien sucht deutsche Rueckendeckung → Berlin gibt Blanko-Scheck (kausal). |
| C1 → C2 (Blanko-Scheck → Ultimatum) | mat-2-1 Eintrag #3 + mat-2-5 (Ultimatum-Auszug) | Zeitleiste-BU + mat-2-5 Kontextualisierung: "Wien hatte freie Hand und wagte das Risiko." | Berliner Rueckendeckung gibt Wien diplomatischen Spielraum → Wien stellt Ultimatum, das so streng ist, dass Serbien ablehnen muss (kausal-strategisch). |
| C2 → C3 (Ultimatum/AT-Krieg → Buendnis-Domino) | mat-2-1 Eintraege #4-#7 + Hefteintrag-Sicherungs-Text | Zeitleiste zeigt: AT-UN → SR (28.7.) → 4 Tage Domino. Begleittext erklaert Buendnisfall = Pflichthilfe-Mechanik. | Lokal-Krieg AT-UN/SR aktiviert Buendnisstrukturen aus M1 (Russland Schutzmacht SR, DT Buendnispartner AT-UN, FR Buendnispartner RU, GB-Garantie Belgien) → Kettenreaktion (kausal-strukturell). |
| C3 → P (Domino → 5 Wochen Weltkrieg) | mat-2-1 (Zeitleiste-Gesamt) | Zeitleiste-Synthese: 28.6. - 4.8. = 5 Wochen 6 Tage; 6 Kriegserklaerungen | Buendnis-Domino summiert sich zu globaler Eskalation in nur 5 Wochen (temporal-quantitativ). |
| P → L (5 Wochen → Ursache vs. Ausloeser) | (Hefteintrag-Sicherungs-Text B.3, kein eigenes Material) | Hefteintrag B.3 verankert die Begriffs-Differenzierung: "Eine Ursache wirkt lange (Pulverfass aus M1). Ein Ausloeser ist der Funke." | Aus dem Sachverhalt (5 Wochen, Buendnis-Mechanik aus M1 wird sichtbar) abstrahieren SuS die Begriffe — Sicherungs-Schritt im Hefteintrag, nicht eigenes Material (bewusste didaktische Designentscheidung des Hefteintrags: "erst Sachverhalt, dann Begriffe"). |

**Abdeckungs-Check:**
- Jede SCPL-Zone (S, C1, C2, C3, P) hat ≥1 Material-Zuordnung. **PASS**
- Jeder SCPL-Uebergang ist mit kausal_mechanismus dokumentiert. **PASS** (5/5 Uebergaenge)
- Voraussetzungs-Check: M1-Voraussetzung ("Pulverfass Europa", Buendnisstrukturen Dreibund/Triple Entente) wird in M1-Hefteintrag B.3 + B.4 gesichert. **PASS**

### INFERENTIAL-Zonen-Stuetzung

Keine SCPL-Zone ist als INFERENTIAL markiert. Alle 5 Erarbeitungs-Zonen (S, C1, C2, C3, P) sind DIRECT durch Materialien erarbeitbar. **n/a**.

**Anmerkung zur L-Zone:** Die L-Zone (Ursache vs. Ausloeser) wird NICHT durch ein eigenes Material erarbeitet, sondern als Sicherungs-Schritt im Hefteintrag verankert. Dies ist eine bewusste didaktische Designentscheidung des HEFTEINTRAG (Aufbau-Anweisung A.2: "Begriffsbox K2-1 erst am Ende als Sicherung — bewusst NACH dem Ablauf, damit SuS aus dem Sachverhalt erst die Begriffe abstrahieren"). AGENT_MATERIAL respektiert den STRUKTUR-FREEZE und legt KEIN zusaetzliches Material fuer L an.

---

## Sequenzplan

Die Reihenfolge folgt dem Primaer-Anker SKRIPT (§1 → §2 → §3 → §4 → §5) und dem Kontroll-Anker SCPL-Aufbau (S → C1 → C2 → C3 → P → L).

**Begruendung der Sequenz:**

1. **mat-2-1 (Zeitleiste) auf Position 1** — als Einstiegs-Anker: Die Zeitleiste gibt SuS sofort die Gesamt-Struktur der 5 Wochen. Sie funktioniert hier als visuelle Karte ("Wo bist du?"), die SuS waehrend der Mappe immer wieder konsultieren. Die Detail-Erarbeitung des Attentats (S) folgt unmittelbar danach mit den Bildquellen. **Abweichung vom strikten SKRIPT-Reihenfolge-Anker:** Das SKRIPT beginnt §1 mit Franz Ferdinand und §2 mit Princip; aus didaktischer Sicht ist die Zeitleiste jedoch die orientierende Klammer fuer alle folgenden Detail-Materialien. Begruendung: SuS verstehen Detail-Materialien besser, wenn sie die Gesamt-Struktur bereits kennen (Advance-Organizer-Prinzip).
2. **mat-2-2 (Tatortskizze) auf Position 2** — beginnt die Detail-Erarbeitung der S-Zone mit der raeumlich-konkreten Situation (ohne Gewaltdarstellung).
3. **mat-2-3 (Franz Ferdinand) auf Position 3** — Akteur Opfer, vertieft S-Zone, fuehrt Habsburger-Perspektive ein.
4. **mat-2-4 (Princip) auf Position 4** — Akteur Taeter, vertieft S-Zone, fuehrt bosnisch-serbische Nationalisten-Perspektive ein, kontrastiert direkt mit mat-2-3 (Habsburger vs. Junges Bosnien).
5. **mat-2-5 (Wiener Ultimatum) auf Position 5** — vertieft C2-Zone mit Primaer-Quelle, ergaenzt die Zeitleiste-Skelett-Information (Datum + Akteure) um die inhaltliche Forderung.

### Sequenzplan-Tabelle

| # | Material-ID | Typ | Didaktische Funktion | SCPL-Zone | material_charakter | bildfunktion | analyseauftrag | personalisiert | primary_scpl_zone | aktivierungscharakter | fachbegriffe_eingefuehrt | fachbegriffe_referenziert | Voraussetzung | Kerninhalt (1 Satz) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | mat-2-1 | zeitleiste | einstieg | C1, C2, C3, P | vergegenwaertigung | n/a | false | false | C2 | bild | Julikrise, Blanko-Scheck, Ultimatum, Mobilmachung, Buendnisfall | Buendnis-System (M1), Dreibund (M1), Triple Entente (M1) | — | Vom Schuss in Sarajevo zum Weltkrieg in 5 Wochen (7 Daten, 6 Akteure). |
| 2 | mat-2-2 | bildquelle (karte) | erarbeitung | S | vergegenwaertigung | heuristisch | true | false | S | — | Sarajevo, Lateinerbruecke | Junges Bosnien, Schwarze Hand | mat-2-1 | Tatortskizze: Wo das Attentat raeumlich stattfand. |
| 3 | mat-2-3 | bildquelle | erarbeitung | S | vergegenwaertigung | heuristisch | true | true | S | — | Thronfolger | Habsburger, Oesterreich-Ungarn (M1) | mat-2-1 | Wer war Franz Ferdinand — und wie inszenierte sich der Habsburger Hof? |
| 4 | mat-2-4 | bildquelle | erarbeitung | S | vergegenwaertigung | heuristisch | true | true | S | — | Junges Bosnien, Schwarze Hand | Sarajevo (mat-2-2), Thronfolger (mat-2-3) | mat-2-3 | Wer war Princip — und warum erinnern Serben und Bosniaken ihn unterschiedlich? |
| 5 | mat-2-5 | quellentext (primaer) | vertiefung | C2 | besinnung_sachbezogen | n/a | true | false | C2 | — | Ultimatum, Souveraenitaet | Blanko-Scheck (mat-2-1), Schwarze Hand (mat-2-4) | mat-2-1, mat-2-4 | Auszug aus dem Wiener Ultimatum: Was Wien forderte und warum es bewusst Eskalations-bereit war. |

### Uebergangsobjekte

| Von → Nach | rueckbezug_inhalt_ref | vorausblick_frage | kausalitaets_typ | intentionsskizze |
|---|---|---|---|---|
| (—) → mat-2-1 | (Einstieg, kein Vorgaenger) | Was ist auf der Zeitleiste das erste Datum — und was ist da passiert? | temporal | Du oeffnest Mappe 2. Auf dem Deckblatt: 28. Juni 1914. Auf der Zeitleiste folgt eine Kette aus 7 Daten in 5 Wochen — am Ende ist Europa im Krieg. Diese Kette ist deine Karte fuer die naechsten Materialien. |
| mat-2-1 → mat-2-2 | Auf der Zeitleiste hast du das erste Datum gesehen: 28. Juni 1914 in Sarajevo — das Attentat. | Wo genau in Sarajevo war das? Wie konnte ein 19-Jaehriger einen Thronfolger erschiessen? | vertiefend | Die Zeitleiste hat dir den Tag gezeigt. Jetzt zoomst du in den Tag hinein. Die Tatortskizze zeigt dir den Ort, die Fahrtroute, den Standort des Schuetzen — ohne dass du die Tat selbst sehen musst. |
| mat-2-2 → mat-2-3 | Auf der Tatortskizze hast du gesehen, WO und WIE Princip Franz Ferdinand traf. | Wer war eigentlich Franz Ferdinand — und wie wollte er sich der Welt zeigen? | vertiefend | Du kennst den Tatort. Aber wer war das Opfer? Das Hofportrait Franz Ferdinands zeigt dir, wie sich der Habsburger Hof selbst inszenierte — und was solche Auftragsbilder wert sind, wenn man sie als Quelle nutzt. |
| mat-2-3 → mat-2-4 | Du hast Franz Ferdinand als Habsburger Thronfolger kennengelernt — Uniform, Decorationen, Hof-Auftragsbild. | Und auf der anderen Seite? Wer war Princip — Held oder Terrorist? | perspektivwechsel | Bisher hast du die Habsburger Seite gesehen. Jetzt wechselst du die Perspektive: Princip war 19, Schueler, Mitglied von Junges Bosnien. Sein Foto vor Gericht zeigt nicht 'den Terroristen' und nicht 'den Helden' — beide Erinnerungen existieren bis heute. |
| mat-2-4 → mat-2-5 | Du kennst Tat, Opfer und Taeter — und du hast die Zeitleiste gesehen, die zum Krieg fuehrt. | Was hat Wien Serbien eigentlich genau gefordert? Und warum wurde das Forderung zum Krieg? | kausal | Du weisst: Am 23. Juli stellte Wien ein Ultimatum. Aber was stand drin? Der Auszug zeigt dir die Hauptforderung im Original-Wortlaut (R7-tauglich) — und warum Wien wusste, dass Serbien ablehnen wuerde. Damit verstehst du den Schritt von Mat 1 (Datum) zu C2 (warum es kein Zufall war). |

### Sequenzkontext-Objekte

| Material-ID | vorher (ID, Typ, Kerninhalt) | nachher (ID, Typ, Kerninhalt) |
|---|---|---|
| mat-2-1 | — | mat-2-2, bildquelle (karte), Tatortskizze des Attentats |
| mat-2-2 | mat-2-1, zeitleiste, Vom Schuss in Sarajevo zum Weltkrieg in 5 Wochen | mat-2-3, bildquelle, Hofportrait Franz Ferdinand |
| mat-2-3 | mat-2-2, bildquelle (karte), Tatortskizze des Attentats | mat-2-4, bildquelle, Princip vor Gericht |
| mat-2-4 | mat-2-3, bildquelle, Hofportrait Franz Ferdinand | mat-2-5, quellentext, Wiener Ultimatum-Auszug |
| mat-2-5 | mat-2-4, bildquelle, Princip vor Gericht | — |

---

## Einstieg und Sicherung

### Einstieg
**Typ:** narrativ (Spurensucher-Setting fortgesetzt)
**Text:** "Du legst Mappe 1 zur Seite. Dein Befund: Europa war ein Pulverfass, lange bevor irgendjemand schoss. Aber wer hat den Funken geworfen? Mappe 2 zeigt dir den 28. Juni 1914. Ein Datum. Eine Stadt. Ein Schuss."
**Tafelbild-Voraussetzung:** M1-Hefteintrag (Pulverfass Europa, Dreibund vs. Triple Entente, Spannungsfelder). Diese Voraussetzung ist im M1-Hefteintrag (B.3 Sicherungs-Text + B.4 Schluessel-Begriffe) gesichert.
**Problemstellung (Leitfrage Mappe):** Wie wurde aus dem Attentat in Sarajevo in fuenf Wochen ein Weltkrieg?

### Sicherung
**Typ:** Hefteintrag-Verweis + Reflexionsimpuls + Ueberleitung
**Text:** Verweis auf HEFTEINTRAG_M2.md B.3 (Sicherungs-Text, 150 Wo), B.4 (7 Schluessel-Begriffe), B.5 (Merksatz: "Aus dem Attentat in Sarajevo wurde durch das Buendnis-System in fuenf Wochen ein Weltkrieg. Der einzelne Schuss war der Ausloeser — die wahren Ursachen lagen tiefer.")
**Reflexionsimpuls:** "Was hat sich an deinem Bild von 'Wer ist schuld am Krieg?' veraendert, seit du weisst, dass der Schuss nur der Ausloeser war?"
**Ueberleitung:** "Wenn der Schuss nur Ausloeser war — wer ist dann schuld? Mappe 3 zeigt dir, wer im August 1914 jubelte und wer schwieg, und wie heute ueber die Schuldfrage gestritten wird."

---

## Perspektiven-Abdeckungsmatrix (SOLL)

Aus DIDAKTIK_RAHMEN §6 + HEFTEINTRAG-Lehrkraft-Sektion A.4 + inhalts_briefing.json M2 perspektiven_kandidaten:

| Perspektive | mat-2-1 | mat-2-2 | mat-2-3 | mat-2-4 | mat-2-5 | Abdeckung |
|---|---|---|---|---|---|---|
| P1: Bosnisch-serbische Nationalisten (Princip / Junges Bosnien) | (X als Akteur) | X (Princip-Standort) | — | **X (Hauptperspektive)** | (X als Adressat-Gegenseite) | 4/5 |
| P2: Habsburger / Oesterreich-Ungarn (Franz Ferdinand / Berchtold) | X (Akteur Wien) | (X als Opfer-Auto) | **X (Hauptperspektive)** | (X als Anklaeger) | **X (Hauptperspektive Berchtold)** | 5/5 |
| P3: Deutsches Reich (Wilhelm II. / Bethmann Hollweg) | **X (Hauptakteur Blanko-Scheck)** | — | — | — | (X als impliziter Rueckhalt) | 2/5 |
| P4: Russisches Zarenreich (Sasonow / Nikolaus II.) | **X (Hauptakteur Mobilmachung)** | — | — | — | — | 1/5 |
| P5: Britische Regierung (Grey) | **X (Hauptakteur 4.8.)** | — | — | — | — | 1/5 |

**Abdeckungsstatus:**
- 5/5 Perspektiven aus perspektiven_policy mindestens 1x repraesentiert. **PASS** (Multiperspektivitaets-Policy STR-05 erfuellt; QG-06 erfuellt).
- Perspektivische Schwerpunkte: P1 + P2 dominant (Sarajevo-Attentat zentral), P3 + P4 + P5 strukturell ueber Zeitleiste abgedeckt.
- **Fehlende Perspektiven:** keine. Akzeptabel: P3-P5 nur strukturell ueber mat-2-1 — diese Perspektiven werden in M3 (Schuldfrage) und M4 (Marne/Belgien) vertieft. Bewusste Designentscheidung: M2 fokussiert auf Akt + Eskalations-Auftakt; die volle Mehr-Akteur-Perspektive ist M3-Aufgabe.

**Inline-Perspektiv-Tags (F0b-M9, Pflicht im material_source.json pro Material — wird in Phase 2.1 gesetzt, hier nur Plan):**
- mat-2-1 (Zeitleiste) → `nicht-dominant` (mehrperspektivische Akteurs-Liste, keine Privilegierung), `Macht-Betroffen` (Serbien als kleinerer Akteur unter Druck)
- mat-2-2 (Tatortskizze) → `nicht-dominant` (didaktische Sekundaer-Skizze ohne Privilegierung)
- mat-2-3 (FF-Portrait) → `dominant`, `Macht-Ausuebung` (Habsburger Hof-Selbstdarstellung), `Aussen` (Auftrags-Inszenierung)
- mat-2-4 (Princip) → `Widerstand`, `Macht-Betroffen` (Junges Bosnien gegen Habsburger), `Innen` (Aussage vor Gericht: Selbstdeutung)
- mat-2-5 (Ultimatum) → `dominant`, `Macht-Ausuebung` (Wien diktiert Serbien)

**M4-Coverage-Check (mind. 2 nicht-dominante Tags ueber alle Materialien):**
- nicht-dominant: mat-2-1, mat-2-2 (2x)
- Widerstand: mat-2-4
- Macht-Betroffen: mat-2-1, mat-2-4
- Innen: mat-2-4
- **Coverage: ≥2 nicht-dominante Tags erreicht (mat-2-2 + mat-2-4 + mat-2-1).** **PASS** (QG-09).

---

## Cross-Konsistenz-Check (Phase-0-Outputs)

| Pruefung | Quelle | Ergebnis |
|---|---|---|
| Stundenfrage M2 identisch | DIDAKTIK_RAHMEN §4 / HEFTEINTRAG_M2 / SKRIPT M2 / artefakt_inventar M2 | **PASS** (alle: "Wie wurde aus dem Attentat in Sarajevo in fuenf Wochen ein Weltkrieg?") |
| KE-Anker M2 identisch | DR + HE + SKRIPT + AI | **PASS** (alle: GPG7_LB2_K_06) |
| AFB M2 identisch | DR §5 (II) / HE M2 (II) / AI M2 (II) | **PASS** (alle: II) |
| TB-Knoten 1:1 aus skript_struktur uebernommen | hefteintrag_struktur cross_konsistenz_check | **PASS** (5/5 Knoten + 5/5 Verbindungen) |
| Material-Anzahl M2 = 5 | artefakt_inventar.json _meta.material_pro_mappe.M2 = 5 | **PASS** (5 Materialien geplant + 5 designed) |
| Material-Typen aus artefakt_inventar uebernommen | AI M2 materialien[] | **PASS** (1 zeitleiste + 3 bildquelle + 1 quellentext, davon img-m2-01 als Karte/SVG) |
| Bilder verifiziert (medien_katalog) | medien_katalog_game.json M2 | **PASS** (img-m2-01 CC-BY-SA-3.0, img-m2-02 PD, img-m2-03 PD — alle dual-kanal verified) |
| Sandwich-Anschluss M2→M3 | HE M2 sandwich_anschluss_naechste_mappe | **PASS** ("Wenn der Schuss nur Ausloeser war — wer ist dann schuld?") |
| Trigger-Flags M2 | HE M2 trigger_flags_mappe + SKRIPT M2 trigger_flags_im_skript | **PASS** (gewalt_attentat + nationalismus, beide adressiert ueber sensibilitaets_markierung gewalt_altersfilter (mat-2-2) + propaganda_kontextualisierung_noetig (mat-2-3, mat-2-4, mat-2-5)) |
| POLICY_TRIGGER_SICHTBARKEIT | _meta.trigger_sichtbarkeit_policy | **PASS** (alle Trigger-Hinweise im Lehrkraft-A-Block oder Dispatch-Constraint, kein Schueler-sichtbarer Trigger-Wortlaut) |
| Schulart-Konsistenz | DR §1 Mittelschule + HE _meta.schulart | **PASS** (Mittelschule Bayern Jg 7c GPG) |
| Sprachniveau R7 | inhalts_briefing M2 sprachniveau_marker | **PASS** (Komposita-Erstgebrauch geplant: Buendnisfall, Mobilmachung, Blanko-Scheck — pro Material in Dispatch dokumentiert) |
| Konflikttyp-Flag aktiviert | DR §6 (Konfliktthema) | **PASS** (konflikttyp: true; perspektiven_policy gesetzt) |

---

## Q-Gate Self-Check

| Pruefkriterium | Severity | Status | Evidenz |
|---|---|---|---|
| SCPL-Abdeckung vollstaendig (alle Erarbeitungs-Zonen mit Material) | BLOCKER | **PASS** | 5/5 Zonen mit Material; L als Sicherungs-Schritt im HE verankert (bewusste Designentscheidung HE) |
| SCPL-Uebergaenge dokumentiert mit kausal_mechanismus | BLOCKER | **PASS** | 5/5 Uebergaenge dokumentiert |
| Erarbeitbarkeits-Nachweis vollstaendig | BLOCKER | **PASS** | Tabelle SCPL-Zonen + Uebergaenge + INFERENTIAL-Stuetzung (n/a) |
| Mindest-Materialien (1 Text/1 Quelle/1 personifiziert/1 visuell, ≥4 gesamt) | HIGH | **WARN** | DT fehlt strikt; Funktion durch Zeitleiste-Begleittext + HE-Sicherungs-Text uebernommen — bewusste Designentscheidung dokumentiert |
| Medienvielfalt-Ratio MV1 (max. 50% textbasiert) | HIGH | **PASS** | 1/5 = 20% textbasiert |
| Zielklarheit pro Material | HIGH | **PASS** | 5/5 Materialien mit Zweck-Satz + SCPL-Zone + Artefakt-Ref/Begruendung |
| Sequenzplan vollstaendig (alle Pflichtfelder) | HIGH | **PASS** | Alle Felder + Uebergangsobjekte + Sequenzkontext-Objekte |
| Perspektiven-Matrix (≥3 Perspektiven, alle ≥1 Material) | HIGH | **PASS** | 5/5 Perspektiven repraesentiert |
| Inline-Perspektiv-Tags geplant (≥2 nicht-dominante) | HIGH | **PASS** | 3 nicht-dominante Tags (mat-2-1, mat-2-2, mat-2-4) |
| Cross-Konsistenz mit Phase-0-Outputs | BLOCKER | **PASS** | 13/13 Pruefungen PASS |
| sensibilitaets_markierung pro Material | HIGH | **PASS** | 4/5 Materialien mit Sensibilitaets-Markierung + Dispatch-Constraint; 1/5 (mat-2-1) = keine |
| Konflikttyp + perspektiven_policy gesetzt | HIGH | **PASS** | konflikttyp: true; 5 Perspektiven dokumentiert |
| R7-Altersgemaeßheit der Erarbeitungs-Wege | HIGH | **PASS** | Alle Materialien mit konkreten Personen/Daten/Orten; Begriffe via Komposita-Erstgebrauch im Dispatch eingeplant; Inferenz-Anteil 0% |

**Gesamturteil Phase-1-Material-Design-M2:** **PASS mit 1 WARN** (DT-Mindest-Material; Begruendung dokumentiert, kein BLOCKER).

**Validierungsstatus:** ENTWURF — User-Validierung PFLICHT (Mappe 2 Strategie-Audit E1 Kalibrierungs-Mappe).

---

## Naechste Schritte

1. **User-Validierung dieses Blueprints** (PFLICHT, Phase 1.5 Gate; Mappe 2 = Strategie-Audit E1 Kalibrierungs-Mappe — keine Herabstufung auf EMPFOHLEN)
2. Nach Freigabe: Phase 2.1 Material-Produktion via SUB_MATERIAL-Subagenten (5 Dispatches, isoliert — VERTRAG_PHASE_2-1_MATERIAL §Dispatch-Ablauf):
   - Dispatch mat-2-1 → SUB_MATERIAL_ZEITLEISTE
   - Dispatch mat-2-2 → SUB_MATERIAL_BILDQUELLE (Subtyp Karte/Skizze)
   - Dispatch mat-2-3 → SUB_MATERIAL_BILDQUELLE
   - Dispatch mat-2-4 → SUB_MATERIAL_BILDQUELLE
   - Dispatch mat-2-5 → SUB_MATERIAL_QUELLENTEXT (Subtyp `quellentext_primaer`, _meta.aufbereitung NICHT rekonstruiert)
3. Phase 2.1c Cross-Konsistenz (Achse Perspektiven-Diversitaet, Achse 6 SCPL-Formulierung, Achse 5 Ueberleitungen produzieren aus intentionsskizzen)
4. Phase 3 Aufgaben-Entwicklung via agent-raetsel-progressionsplan + agent-raetsel-dispatcher (Aufgaben-Anker a2-01 bis a2-06 aus artefakt_inventar)
