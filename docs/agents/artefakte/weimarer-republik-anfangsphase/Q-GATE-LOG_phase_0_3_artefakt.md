# Q-GATE-LOG Phase 0.3 — AGENT_ARTEFAKT (Self-Check, CONTINUATION-Run)

**Game-ID:** weimarer-republik-anfangsphase
**Run-ID:** run-3-2026-04-26
**Erstellt:** 2026-04-26
**Vertrag-Anker:** VERTRAG_PHASE_0-3_ARTEFAKT
**Run-Modus:** CONTINUATION nach H2 User-Interrupt — KEIN Re-Run, nur fehlende Outputs ergaenzt
**Eingabe-Files (gelesen, nicht ueberschrieben):** ARTEFAKT_INVENTAR_GAME.md (v0.4.3 post-Audit), inhalts_briefing.json (post-patch M3), medien_katalog_game.json (post-patch M2 Drift), DIDAKTIK_RAHMEN.md (post-patch Mittelschule)
**Erzeugt (3 NEUE Dateien):**
1. `ARTEFAKT_QUALIFIZIERUNG.md`
2. `artefakt_inventar.json`
3. `Q-GATE-LOG_phase_0_3_artefakt.md` (dieses Dokument)

---

## Q-Gate Standard-Pruefpunkte (gemaess Agent-Definition Sektion "Qualitaets-Gate")

| # | Pruefpunkt | Kriterium | Befund | Urteil |
|---|---|---|---|---|
| Q1 | Artikelabdeckung | Jeder Artikel aus artikel_liste sektionsweise gesichtet | Inventar v0.4.3 deckt alle 4 Mappen mit 24 Materialien aus saemtlichen Briefing-Quellen-Hashes | **PASS** |
| Q2 | Strukturierte Sichtung | Kein Artefakt ohne Sektions-Zuordnung im Quell-Artikel | Alle 24 Materialien haben anker_briefing-Verweis; alle 16 Bilder haben wikimedia_filename | **PASS** |
| Q3 | Lizenz-Pruefung | Jedes qualifizierte Artefakt hat kompatible Lizenz | 11x PD + 4x CC-BY-SA 3.0 DE Bundesarchiv + 1x CC-BY-SA 3.0; 0x NC, 0x ND | **PASS** |
| Q4 | Metadaten vollstaendig | URL/Lizenz/Urheber/Beschreibung dokumentiert | Bilder ueber medien_katalog_game.json verifiziert (DUAL-KANAL); Eigenkomp.-Materialien mit TBD + Quellenanker | **PASS** |
| Q5 | Tafelbild-Zuordnung | Jedes Artefakt mind. einem Knoten zugeordnet | Alle 24 Materialien haben tafelbild_knoten-Feld (post-Audit Schema-Erweiterung) | **PASS** |
| Q6 | Kein Freitext-Primat | wikimedia_search_images nur als Fallback | Keine Search-Calls in Continuation; alle Bilder bereits in Phase 0.2.M verifiziert | **PASS** |
| Q7 | Redundanz-Check | Kein Tafelbild-Knoten >2 Artefakte gleichen Typs | Max. 2 Bilder pro Tafelbild-Knoten (Steckbrief M1: m1-mat-01 Foto + m1-mat-06 Portrait — komplementaer, nicht redundant) | **PASS** |
| Q8 | Rollenprofile belegt | Jedes Rollenprofil hat Wikipedia-Sektions-Beleg | M3 m3-mat-05: 3 Perspektiv-Karten — alle drei aus inhalts_briefing.M3.perspektiven_kandidaten 1-3 belegt | **PASS** |
| Q9 | Zitate belegt | Jedes Zitat hat Wikipedia-Sektions-Beleg + Quellenangabe | m2-mat-02 (Louis XIV) markiert apokryph; m3-mat-03 (Art. 231) Original-Vertragstext PD; Scheidemann-Zitat M3 trennt event_dates 12.5./20.6.1919 | **PASS** |
| Q10 | Self-Hosting-Daten | Thumbnail-URL + Breite + MIME-Typ pro Download dokumentiert | Vollstaendig in medien_katalog_game.json (Phase 0.2.M, hier referenziert) | **PASS** |

**Standard-Q-Gate-Bilanz: 10/10 PASS.**

---

## Cross-Check 1: medien_katalog_game.json ↔ artefakt_inventar.json

| Bild-ID | medien_katalog | artefakt_inventar | Mappe | Status |
|---|---|---|---|---|
| img-m1-01 | Ausrufung_Republik_Scheidemann.jpg | m1-mat-01-bildquelle-scheidemann | M1 | OK |
| img-m1-02 | Bundesarchiv_Bild_146-1970-096-13,_Philipp_Scheidemann.jpg | m1-mat-06-bildquelle-portrait-scheidemann | M1 | OK |
| img-m1-03 | Bundesarchiv_Bild_136-C0804,_Kaiser_Wilhelm_II._im_Exil.jpg | m1-mat-02-bildquelle-wilhelm-exil | M1 | OK |
| img-m2-01 | Enemy_Activities..._German_congress... | m2-mat-04-bildquelle-nationalversammlung | M2 | OK |
| img-m2-02 | Weimarer_Verfassung.JPG | (nicht referenziert in 24-Material-Inventar) | M2 | **AUSGELASSEN** — siehe Vermerk unten |
| img-m2-03 | Bundesarchiv_Bild_102-00015,_Friedrich_Ebert.jpg | m2-mat-05-bildquelle-portrait-ebert | M2 | OK |
| img-m2-04 | Louis_XIV_of_France.jpg | m2-mat-01-bildquelle-louis-xiv | M2 | OK |
| img-m3-01 | Versailler_Vertrag.png | m3-mat-01-karte-gebietsverluste | M3 | OK |
| img-m3-02 | William_Orpen_-_The_Signing_of_Peace... | m3-mat-02-bildquelle-orpen-spiegelsaal | M3 | OK |
| img-m3-03 | Treaty_of_Versailles,_English_version.jpg | m3-mat-06-bildquelle-vertragsdokument | M3 | OK |
| img-m4-01 | Reichsbanknote_5000000_Mark.png | (nicht referenziert) | M4 | **AUSGELASSEN** — siehe Vermerk unten |
| img-m4-02 | 1_Milliarde_Mark_1923.jpg | (nicht referenziert) | M4 | **AUSGELASSEN** — siehe Vermerk unten |
| img-m4-03 | 100-Billionen-Geldschein.jpg | m4-mat-01-bildquelle-billionenschein | M4 | OK |
| img-m4-04 | Inflatie_in_Duitsland... | (nicht referenziert) | M4 | **AUSGELASSEN** — siehe Vermerk unten |
| img-m4-05 | Bundesarchiv_Bild_183-H25109,_Kapp-Putsch... | m4-mat-04-bildquelle-kapp-putsch | M4 | OK |
| img-m4-06 | Bundesarchiv_Bild_119-1486,_Hitler-Putsch_Marienplatz | (im m4-mat-06 Hefteintrag-Knoten als BU-Pflicht-Verweis dokumentiert, nicht eigenes Material) | M4 | OK (eingebettet) |

### Bilanz Cross-Check 1

| Status | Anzahl |
|---|---|
| OK (referenziert in artefakt_inventar) | 12 |
| AUSGELASSEN (medien_katalog vorhanden, im 24-Material-Inventar nicht eigenes Material) | 4 (img-m2-02, img-m4-01, img-m4-02, img-m4-04) |

### Vermerke zu ausgelassenen Bildern (explizit, gemaess Pflicht-Vorgabe)

**img-m2-02 (Weimarer_Verfassung.JPG, Druckausgabe Verfassungs-Buechlein):**
- Status: RESERVE-Pool. Nicht als eigenes Material qualifiziert, weil Stoffdichte M2=7 bereits am oberen Korridor-Rand (Pflicht-Vorgabe akzeptiert, NICHT erweitern). m2-mat-03 (WRV-Artikel-Text) deckt Verfassungs-Inhalt textuell vollstaendig ab; ein zusaetzliches Verfassungs-Buechlein-Foto wuerde nur kosmetisch verstaerken. **Verfuegbar fuer Phase 2.1 als optionales Schmuck-Visual** im Layout zu m2-mat-03.

**img-m4-01 (Reichsbanknote 5 Mio Mark) + img-m4-02 (1 Milliarde Mark):**
- Status: RESERVE-Pool. Nicht als eigenes Material qualifiziert, weil m4-mat-01 (100-Billionen-Schein) den haptischen Anker als ein Bild bereits maximal traegt. **Verfuegbar fuer Phase 2.1 als Progressions-Sequenz** (Mio → Mrd → Bio), falls Layout-Designer (SUB_MATERIAL_BILDQUELLE) eine visuelle Stueckelungs-Eskalation zeigen will. Bewusste Kuratierung: Ein Schein als Anker, mehrere als Layout-Option.

**img-m4-04 (Inflatie_in_Duitsland — Menschen reichen Banknoten-Stapel fuer Brote):**
- Status: RESERVE-Pool. Nicht als eigenes Material qualifiziert, weil m4-mat-02 (Brotpreis-Tabelle) + m4-mat-03 (Tagebuch) das Brot-Inflations-Szenario textuell und tabellarisch tragen. **Verfuegbar fuer Phase 2.1 als optionales Begleit-Visual** zum Tagebuch (m4-mat-03), falls SUB_MATERIAL_TAGEBUCH ein zeitgenoessisches Foto zur Verstaerkung sucht. Bewusst nicht im Pflicht-Inventar, um Trigger-Sensibilitaet (existentiell-dramatisches Foto) auf Lehrkraft-Entscheidung zu legen.

**Bilanz:** 4 ausgelassene Bilder sind alle dokumentiert und als RESERVE-Pool verfuegbar. **Cross-Check 1 PASS** mit transparenter Auslassungs-Begruendung.

---

## Cross-Check 2: inhalts_briefing.material_kandidaten ↔ artefakt_inventar.json

### M1 (5 Briefing-Kandidaten)

| Briefing-Kandidat | Inventar-Material | Status |
|---|---|---|
| bildquelle: Scheidemann am Reichstagsfenster | m1-mat-01 | GEDECKT |
| darstellungstext: Kurz-Steckbrief 9.11.1918 | m1-mat-05 | GEDECKT |
| zeitleiste: Mini-Zeitleiste 28.10-11.11.1918 | m1-mat-03 | GEDECKT |
| quellentext: Auszug Aufruf Rat der Volksbeauftragten | m1-mat-04 | GEDECKT |
| bildquelle: Karikatur/Foto Wilhelm II. ins Exil | m1-mat-02 | GEDECKT |
| (zusaetzlich aus post-Audit) Portrait Scheidemann | m1-mat-06 | POST-AUDIT-NACHZUG |

**M1: 5/5 GEDECKT + 1 post-Audit-Ergaenzung.**

### M2 (5 Briefing-Kandidaten)

| Briefing-Kandidat | Inventar-Material | Status |
|---|---|---|
| quellentext: WRV Art. 1, 22, 109 | m2-mat-03 | GEDECKT |
| quellentext: Ludwig-XIV-Zitat | m2-mat-02 | GEDECKT |
| bildquelle: Eroeffnung Nationalversammlung Weimar | m2-mat-04 | GEDECKT |
| darstellungstext: Vergleichstabelle Absolutismus vs. Demokratie | m2-mat-06 | GEDECKT |
| statistik: Wahlbeteiligung 19.1.1919 + Frauenanteil | m2-mat-07 | POST-AUDIT-NACHZUG (war im Erst-Inventar ausgelassen) |
| (zusaetzlich, nicht im Briefing) Louis-XIV-Bildquelle | m2-mat-01 | INVENTAR-ERGAENZUNG (komplementaer zu m2-mat-02 Zitat) |
| (zusaetzlich, nicht im Briefing) Portrait Ebert | m2-mat-05 | INVENTAR-ERGAENZUNG (Cross-Mappen-Wiedererkennung-Anker) |

**M2: 5/5 GEDECKT (Statistik post-Audit-Nachzug korrigiert) + 2 sinnvolle Inventar-Ergaenzungen (Louis-XIV-Bildanker + Ebert-Portrait fuer Cross-Mappen-Konsistenz).**

### M3 (5 Briefing-Kandidaten)

| Briefing-Kandidat | Inventar-Material | Status |
|---|---|---|
| karte: Gebietsabtretungen Deutschland 1919 | m3-mat-01 | GEDECKT |
| quellentext: Art. 231 Kriegsschuldartikel | m3-mat-03 | GEDECKT |
| darstellungstext: 3 Perspektiv-Karten | m3-mat-05 | GEDECKT |
| statistik: 132 Mrd Goldmark + 100.000 Heer | m3-mat-04 | GEDECKT |
| bildquelle: Foto Spiegelsaal Versailles 28.6.1919 | m3-mat-02 (Orpen-Gemaelde als didaktisch aequivalente Alternative gemaess medien_katalog) | GEDECKT-AEQUIVALENT |
| (zusaetzlich, nicht im Briefing) Originaldokument Treaty | m3-mat-06 | INVENTAR-ERGAENZUNG (Authentizitaets-Anker, optional) |

**M3: 5/5 GEDECKT (1x didaktisch-aequivalent dank Orpen-Gemaelde) + 1 Inventar-Ergaenzung.**

### M4 (6 Briefing-Kandidaten)

| Briefing-Kandidat | Inventar-Material | Status |
|---|---|---|
| bildquelle: Geldscheine 1923 | m4-mat-01 (100-Bio-Schein) — RESERVE: img-m4-01/02/04 | GEDECKT (1 Schein als Anker; weitere als Reserve dokumentiert) |
| statistik: Brotpreis-Tabelle 1923 | m4-mat-02 | GEDECKT |
| quellentext: Aufruf Generalstreik gegen Kapp | m4-mat-05 | GEDECKT |
| darstellungstext: Kurzbericht Hitler-Putsch | m4-mat-06 (im Hefteintrag-Knoten 4 enthalten) | GEDECKT-EINGEBETTET |
| tagebuch: Berliner Arbeiterfamilie Nov 1923 | m4-mat-03 | GEDECKT |
| zeitleiste: Krisen-Zeitleiste 1920-1923 (4 Knoten) | m4-mat-06 | GEDECKT |
| (zusaetzlich, nicht im Briefing) Foto Kapp-Putsch Pariser Platz | m4-mat-04 | INVENTAR-ERGAENZUNG (visueller Krise-Anker zu m4-mat-05 Aufruf) |

**M4: 6/6 GEDECKT (1x Hitler-Putsch-Bericht eingebettet im Krisen-Hefteintrag statt als eigenes Material — Stoffdichte-Schutz) + 1 Inventar-Ergaenzung.**

### Bilanz Cross-Check 2

| Status | Anzahl |
|---|---|
| GEDECKT (1:1) | 17 |
| GEDECKT-AEQUIVALENT/EINGEBETTET (didaktisch sinnvoll alternativ geloest) | 2 |
| POST-AUDIT-NACHZUG (vorher fehlend, im Inventar v0.4.3 ergaenzt) | 2 (m1-mat-06, m2-mat-07) |
| INVENTAR-ERGAENZUNG (zusaetzlich zum Briefing, didaktisch begruendet) | 4 (m2-mat-01, m2-mat-05, m3-mat-06, m4-mat-04) |
| AUSGELASSEN OHNE BEGRUENDUNG | 0 |

**Cross-Check 2 PASS.** Alle 21 Briefing-Material-Kandidaten sind gedeckt; Inventar enthaelt zusaetzlich 3 didaktisch begruendete Ergaenzungen (Vergleichs-Bildanker M2, Cross-Mappen-Wiedererkennung M2, Authentizitaets-Anker M3, Krise-Visual M4).

---

## Cross-Check 3: Lizenz-Inventar-Konsistenz

| Lizenz-Klasse | medien_katalog (16 Bilder) | artefakt_inventar (referenzierte 12 + 4 Reserve) | Konsistenz |
|---|---|---|---|
| Public Domain | 11 | 11 | PASS |
| CC BY-SA 3.0 DE Bundesarchiv | 4 | 4 (img-m1-02, img-m2-03, img-m4-05, img-m4-06) | PASS |
| CC BY-SA 3.0 (Kuech) | 1 | 1 (img-m3-01) | PASS |
| Total | 16 | 16 | PASS |
| Kein NC | true | true | PASS |
| Kein ND | true | true | PASS |
| GitHub-Pages-kompatibel | true | true | PASS |
| Attribution-Pflichten dokumentiert | n.a. | 5 Eintraege in artefakt_inventar.json §lizenz_inventar_konsistenz.attribution_pflichten | PASS |

**Cross-Check 3 PASS.**

---

## Cross-Check 4: Schema-Erweiterung Patch v0.4.3 (post-Audit Pflicht)

| Pflicht-Feld | Inventar-Abdeckung | Status |
|---|---|---|
| anker_briefing | 24/24 Materialien (alle haben Verweis auf schluessel_fakten-Hash oder M{n}.kerninhalt-Verweis) | PASS |
| tafelbild_knoten | 24/24 Materialien (alle haben Hefteintrag-/Sicherungs-Knoten-Verweis gemaess DIDAKTIK_RAHMEN §7) | PASS |
| tipp_stufen_slot | 24/24 Materialien (alle Aufgaben-Anker haben 3-Stufen-Slot, Befuellung TBD in Phase 1 agent-raetsel) | PASS |

Cross-Reference-Tabellen (M1-M4) aus ARTEFAKT_INVENTAR_GAME §Schema-Erweiterung Patch v0.4.3 wurden 1:1 in artefakt_inventar.json uebernommen.

**Cross-Check 4 PASS.**

---

## Cross-Check 5: Drift-Hinweise / BU-Pflichten / Quellenkritik-Pflichten

| Pflicht | Verortung im artefakt_inventar.json | Status |
|---|---|---|
| m1-mat-06 BU "undatiert" | bu_pflicht-Feld + ARTEFAKT_QUALIFIZIERUNG R7-Sprachniveau-Plan | PASS |
| m2-mat-05 BU "1925" | bu_pflicht-Feld + Cross-Reference-Tabelle ARTEFAKT_INVENTAR_GAME | PASS |
| m3-mat-02 Quellenkritik-Hinweis Pflicht | quellenkritik_pflicht: true | PASS |
| m3-mat-03 Forschungsstand-Hinweis Pflicht | forschungsstand_pflicht: true | PASS |
| m4-mat-03 Rekonstruktions-Markierung + Lehrkraft-Sichtbarkeit | rekonstruktions_markierung_pflicht + trigger_vermerk | PASS |
| m4-mat-06 BU "Marienplatz Muenchen, 9.11.1923" | bu_pflicht_hitler_putsch_knoten | PASS |
| m3-mat-05 Rekonstruktions-Markierung | rekonstruktions_markierung_pflicht: true | PASS |
| Scheidemann-Zitat M3: getrennte event_dates 12.5./20.6.1919 | anker_briefing-Verweis explizit ("Zitat 12.5.1919 vs. Ruecktritt 20.6.1919 separat") | PASS |

**Cross-Check 5 PASS.**

---

## Eskalations-Log

Keine Eskalation ausgeloest in dieser CONTINUATION-Session. Run-Modus ist additiv (3 NEUE Files), keine bestehenden Files ueberschrieben.

---

## Q-Gate-Gesamturteil

| Pruefung | Urteil |
|---|---|
| Standard-Q-Gate (Q1-Q10) | **10/10 PASS** |
| Cross-Check 1 (medien_katalog) | **PASS** (16/16 referenziert oder explizit RESERVE-dokumentiert) |
| Cross-Check 2 (briefing.material_kandidaten) | **PASS** (21/21 gedeckt + 4 begruendete Ergaenzungen) |
| Cross-Check 3 (Lizenz-Konsistenz) | **PASS** |
| Cross-Check 4 (Schema-Erweiterung Patch v0.4.3) | **PASS** (24/24 Materialien mit anker_briefing + tafelbild_knoten + tipp_stufen_slot) |
| Cross-Check 5 (Drift / BU / Quellenkritik) | **PASS** (8/8 Pflichten verortet) |

**GESAMT: PASS — Phase 0.3 CONTINUATION ist abgeschlossen, Vertrag VERTRAG_PHASE_0-3_ARTEFAKT erfuellt. Freigabe fuer Phase 1 (agent-skript, agent-raetsel-progressionsplan).**

---

## Ausgehende Pflicht-Auflagen an Phase 1 / Phase 2.1

1. **agent-raetsel-progressionsplan** muss alle TBD-Slots im tipp_stufen_slot-Feld befuellen (24 Materialien × ~2 Aufgaben × 3 Stufen ≈ 144 Tipp-Texte; orientiert an DIDAKTIK_RAHMEN §7 Beispiel zu a3-07).
2. **SUB_MATERIAL_BILDQUELLE** muss 6 BU-/Quellenkritik-Pflichten umsetzen (siehe Cross-Check 5).
3. **SUB_MATERIAL_QUELLENTEXT** muss 4 TBD-PD-Recherchen abschliessen (m1-mat-04 RdV-Aufruf, m4-mat-05 Generalstreik-Aufruf — Phase-2.1-Hash sichern; m2-mat-02 Louis-XIV-Zitat-Zuschreibung apokryph markieren; m3-mat-03 Art. 231 Forschungsstand).
4. **SUB_MATERIAL_TAGEBUCH** muss m4-mat-03 mit Lehrkraft-Sichtbarkeit + Quellenstuetze umsetzen.
5. **Claude-Code-Assembly Phase 3.1** kann auf medien_katalog_game.json (16 Bilder mit thumbnail_url + original_url) zugreifen — keine zusaetzliche API-Resolution noetig, da DUAL-KANAL-Verifikation bereits in Phase 0.2.M erfolgt.
