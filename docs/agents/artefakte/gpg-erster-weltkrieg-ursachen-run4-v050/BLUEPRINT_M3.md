# Material-Geruest: Mappe M3 — Augustfieber 1914 (Wer schuld ist und wer jubelt)

**Game-ID:** gpg-erster-weltkrieg-ursachen-run4-v050
**Run-ID:** run-4-2026-04-26-v050-pristine
**Mappe:** M3
**Stundenfrage:** Wer war im August 1914 begeistert — und wer hat heute die Schuld am Krieg?
**Erstellt:** 2026-04-26 (Phase 1, agent-material-design, Plugin v0.5.0)
**Validierungsstatus:** ENTWURF (User-Validierung nach Phase-1-Gate)
**Eingabe:** SKRIPT M3 §1-§7, HEFTEINTRAG_M3 (STRUKTUR-FREEZE), DIDAKTIK_RAHMEN, ARTEFAKT_INVENTAR M3 (6 Materialien), MEDIEN_KATALOG (4 Bilder VERIFIED, 1 PARTIAL)
**KE-Anker (haupt):** GPG7_LB3_K_03 (Ursachen + Kriegsschuldfrage)
**AFB:** II-III (Hoehepunkt der Mappen-Progression)
**Bloom:** Analysieren -> Beurteilen
**Konflikttyp:** TRUE
**Perspektiven-Policy:** "P1: Begeisterte Stadtbuerger 1914 | P2: Skeptische Land-Bevoelkerung+Arbeiter+SPD 1914 | P3: Versailler Sieger-Maechte 1919 | P4: Heutige Forschung Clark 2013 | P5: Reichstags-Inszenierung Burgfrieden"

---

## SCPL-Abdeckung (aus HEFTEINTRAG_M3, fixiert — STRUKTUR-FREEZE)

| SCPL-Zone | Kurztext | Fachbegriffe | Material-Abdeckung |
|---|---|---|---|
| **S** (Situation) | August 1914: Stimmung in deutschen Staedten — Maenner ziehen mit Blumen am Gewehr in den Krieg, Maedchen kuessen Soldaten am Bahnhof | Augusterlebnis / Augustbegeisterung | mat-3-1 (Luebeck-Foto), mat-3-2 (Bundesarchiv-Foto) |
| **C1** (Foto-Bias / Quellenkritik) | Aber: Die Fotos zeigen meist nur Stadt-Buerger. Auf dem Land + bei Arbeitern war die Stimmung oft skeptisch oder ablehnend | Quellenkritik, Foto-Bias | mat-3-1 (BU-Pflicht "Wer ist NICHT zu sehen?"), mat-3-2 (Inszenierungs-Hinweis), mat-3-5 (Tagebuch-Skeptiker als Anti-Bias-Stimme) |
| **C2** (Burgfrieden) | 4. August 1914: Sogar die SPD stimmt im Reichstag fuer Kriegskredite. Alle Parteien dafuer. Burgfrieden zerfaellt 1916/17 | Burgfrieden, Kriegskredite | mat-3-6 (Burgfriedens-Medaille als Inszenierungs-Beleg) — RESERVE-Material wegen PARTIAL-Verifikation |
| **P** (Kriegsschuldfrage) | Vier Jahre spaeter ist der Krieg verloren. Versailles 1919 (Art. 231): Deutschland und Verbuendete allein schuld. Aber stimmt das? | Kriegsschuldfrage, Kriegsschuld-Klausel | mat-3-3 (Versailles Art. 231 Quellentext) |
| **L** (Loesung/Synthese) | Heute: Clark 2013 — keine Macht hatte allein Schuld; mehrere Regierungen gemeinsam in den Krieg getaumelt (Wien+Berlin+Petersburg+Paris+London) | Schlafwandler-These | mat-3-4 (Clark-Forschungs-Paraphrase), Hefteintrag-Sicherung (Synthese 1919 vs. 2013) |

**DIRECT-Check:** 100% (5/5 Zonen DIRECT durch mindestens 1 Material erarbeitet). Schwelle 70% erreicht: **JA**. Inferential-Stuetzungs-Plan nicht erforderlich.

**STRUKTUR-FREEZE-Vermerk:** Alle SCPL-Zonen, Knoten K3-1 bis K3-6, Verbindungen und Fachbegriffe wurden 1:1 aus hefteintrag_struktur.json M3 uebernommen. Keine Aenderung durch agent-material-design.

---

## Material-Entwurf (6 Materialien, voll aus artefakt_inventar M3)

| ID | Typ | Titel | Skript-Absatz | SCPL-Zone | TB-Knoten | Artefakt-Ref | Quelle/Erstellung | W-Budget | sensibilitaets_markierung |
|---|---|---|---|---|---|---|---|---|---|
| mat-3-1 | bildquelle | Mobilmachung Luebeck — wer steht NICHT auf dem Foto? | §1-§2 | S, C1 | K3-2 | img-m3-01 (`IR_Lübeck_033_-_EB.jpg`, PD) | Wikimedia (Gebrueder Borchers) | n/a (Bild) | propaganda_kontextualisierung_noetig |
| mat-3-2 | bildquelle | Mobilmachung 1./2. August 1914 — die Frau mit den Blumen | §3 | S, C1 | K3-2 | img-m3-02 (`Bundesarchiv_Bild_146-1974-118-18`, CC-BY-SA-3.0-DE) | Bundesarchiv ueber Wikimedia | n/a (Bild) | propaganda_kontextualisierung_noetig |
| mat-3-6 | bildquelle | Burgfriedens-Medaille 4. August 1914 (RESERVE) | §4 | C2 | K3-3 | img-m3-03 (`Germany_entering_WWI_1914,_Silver_Medal,_obverse.jpg`, CC-BY-SA-4.0, **VERIFIED-PARTIAL**) | Wikipedia-Community | n/a (Bild) | propaganda_kontextualisierung_noetig |
| mat-3-3 | quellentext | Versailles Artikel 231 (Auszug, R7-vereinfacht) | §5 | P | K3-4 | zit-M3-1 (Wikisource Versailles-Volltext, PD 1919) | Eigenproduktion (Phase 2.1) | <=60 W | mythos_korrektur_noetig (Kriegsschuld-Luege als Folge — nur Lehrkraft) |
| mat-3-4 | darstellungstext | Christopher Clark — Die Schlafwandler (2013) | §6 | L | K3-5 | (kein img/zit; Forschungs-Paraphrase) | Eigenproduktion (Phase 2.1) | <=25 W (1 Kernsatz +Erlaeuterung; gesamt <=110 W) | keine |
| mat-3-5 | tagebuch | Skeptische Stimme 1914 — Tagebuch eines SPD-Anhaengers oder einer Bauern-Frau | §3 | S, C1 (Anti-Bias) | K3-2 | rolle-M3-1 (Quellen: Spirit_of_1914 Sektion Reception) | SUB_TAGEBUCH (Fiktion auf Datenbasis) | <=80 W | keine |

**Mindest-Check (Typenvielfalt):**
- 1 Darstellungstext: PASS (mat-3-4)
- 1 Quelle/Bild: PASS (mat-3-3 quellentext + mat-3-1, mat-3-2, mat-3-6 bildquellen)
- 1 personifiziert: PASS (mat-3-5 tagebuch)
- 1 visuell: PASS (mat-3-1, mat-3-2, mat-3-6 bildquellen)
- gesamt 6 (im Stoffdichte-Korridor 4-7)

**Medienvielfalt-Ratio MV1 (max 50% textbasiert bei 6 Materialien -> max 3 textbasiert):**
- textbasiert: mat-3-3 (quellentext), mat-3-4 (darstellungstext), mat-3-5 (tagebuch) = 3
- nicht-textbasiert: mat-3-1, mat-3-2, mat-3-6 (bildquelle) = 3
- Verhaeltnis 3:3 -> PASS (genau auf der Schwelle)

**RESERVE-Hinweis mat-3-6:** Quelle img-m3-03 ist VERIFIED-PARTIAL (Pool-Match Spirit_of_1914, Direkt-API-Verifikation Phase 0.2.M ausgesetzt). Vor Phase-2.1-Produktion MUSS Direkt-Verifikation der Wikimedia-Datei nachgeholt werden (DOWNGRADE-Pflicht im Q-Gate-Log dokumentiert). Falls Verifikation FAIL: Ersatz durch reinen Darstellungstext zum Burgfrieden (kein Bildmaterial verfuegbar).

---

## Quellentext-Subtypen-Klassifikation

| Material-ID | Subtyp | Begruendung | _meta.aufbereitung |
|---|---|---|---|
| mat-3-3 (Versailles Art. 231) | **quellentext_primaer** | Originalzitat aus Wikisource-Volltext, R7-vereinfacht (gekuerzt, sprachlich vereinfacht). Authentische Vorlage liegt vor | "gekuerzt-vereinfacht" |
| mat-3-5 (Tagebuch-Skeptiker) | **rekonstruiert** | Kein woertliches Originalzitat verfuegbar; Subagent SUB_TAGEBUCH schreibt fiktiven Eintrag auf Datenbasis Spirit_of_1914-Reception-Sektion | M14-Pflicht: Fiktionalitaets-Deklaration in Quelle (z.B. "Fiktiver Tagebucheintrag, basierend auf typischen Erfahrungsberichten von Land-Bevoelkerung und SPD-Anhaengern 1914.") |

---

## Sensibilitaets-Markierungen + Dispatch-Constraints

| Material-ID | sensibilitaets_markierung | Dispatch-Constraint (verbindlich an SUB_MATERIAL) |
|---|---|---|
| mat-3-1 | propaganda_kontextualisierung_noetig | `kontextualisierung_satz`-Pflicht in BU: "Das Foto zeigt Stadt-Buerger — Land-Bevoelkerung und Arbeiter sind nicht im Bild." Trigger-Vermerk `nationalismus+weltkrieg_grossereignis` (lehrkraft-only) |
| mat-3-2 | propaganda_kontextualisierung_noetig | `kontextualisierung_satz`-Pflicht in BU: "Inszenierungs-Topos 'Frau gibt Soldat Blumen' — patriotisch-mobilisierend; Skeptiker und Trauernde wurden nicht fotografiert." |
| mat-3-6 | propaganda_kontextualisierung_noetig | `kontextualisierung_satz`-Pflicht in BU: "Die Medaille zeigt eine offizielle Selbst-Inszenierung des Reichstags — der Burgfrieden zerfiel real ab 1916/17." |
| mat-3-3 | mythos_korrektur_noetig (Sprengkraft Lehrkraft-only) | KEIN explizites Kriegsschuld-Luege-NSDAP-Topic im Schueler-Text. Lehrkraft-Hinweis (POLICY_TRIGGER_SICHTBARKEIT V13) bleibt Lehrkraft-only. Korrektur erfolgt didaktisch ueber mat-3-4 (Clark-Gegenposition) — Multiperspektivitaet als Korrektur-Mechanik |
| mat-3-4 | keine | Standard. Forschungs-Paraphrase mit Quellenangabe Clark 2013 |
| mat-3-5 | keine | Standard. M14 Fiktionalitaets-Kennzeichnung verpflichtend (siehe Subtyp-Tabelle) |

**Augusterlebnis-Idealisierung-Verbot (Lehrkraft-only):** Im Schueler-Material wird das Augusterlebnis NIEMALS positiv besetzt. Quellenkritik-Pflicht in 4 Materialien (mat-3-1, mat-3-2, mat-3-3, mat-3-6) macht die konstruierte Begeisterung als Inszenierung sichtbar. mat-3-5 liefert die explizite Anti-Bias-Stimme. Beutelsbach-Ueberwaeltigungsverbot: AKTIV.

---

## Zielklarheit-Pruefung

| Material | Funktion (1-Satz) | SCPL-Zone | Artefakt-Ref |
|---|---|---|---|
| mat-3-1 | SuS sehen die ikonische Augustbegeisterungs-Postkarte und lernen Quellenkritik anhand der Frage "Wer ist NICHT zu sehen?" — Stadt-Bias wird sichtbar | S, C1 | img-m3-01 |
| mat-3-2 | SuS erkennen das zweite Mobilmachungs-Foto als Inszenierungs-Topos "Frau gibt Soldat Blumen" und uebertragen die Quellenkritik-Methode | S, C1 | img-m3-02 |
| mat-3-3 | SuS lesen die Originalformulierung Versailles Art. 231 und identifizieren die Allein-Schuld-Zuweisung 1919 als historische Sieger-Position | P | zit-M3-1 |
| mat-3-4 | SuS lernen Christopher Clarks Schlafwandler-These (2013) als heutige Forschungsposition kennen und stellen sie der Versailles-Position gegenueber | L | (Forschungs-Paraphrase) |
| mat-3-5 | SuS hoeren eine bewusst skeptische Zeitgenossen-Stimme (Land/Arbeiter/SPD) und korrigieren das Begeisterungs-Bild durch Anti-Bias-Perspektive | S, C1 | rolle-M3-1 |
| mat-3-6 | SuS verstehen den Burgfrieden als institutionellen Konsens und erkennen die Medaille als Auftrags-Inszenierung des Reichstags | C2 | img-m3-03 (RESERVE) |

Jedes Material hat dokumentierten Zweck-Satz + SCPL-Zuordnung + Artefakt-Ref. **PASS.**

---

## Erarbeitbarkeits-Nachweis

### SCPL-Zonen-Erarbeitung

| SCPL-Zone | Material | Erarbeitungsweg |
|---|---|---|
| **S** (Augusterlebnis 1914) | mat-3-1 (Luebeck-Foto) + mat-3-2 (Bundesarchiv-Foto) | SuS sehen 2 zeitgenoessische Fotos der Mobilmachung. Sie erkennen visuell die Stimmung (Soldaten, Blumen, Bahnhofs-Szene) und benennen das Phaenomen als "Augusterlebnis" / "Augustbegeisterung". Skript M3 §1 fuehrt den Begriff im Erlaeuterungstext ein |
| **C1** (Foto-Bias / Quellenkritik) | mat-3-1 + mat-3-2 (BU-Pflicht "Wer ist NICHT zu sehen?") + mat-3-5 (Tagebuch-Skeptiker als Anti-Bias-Stimme) | SuS wenden die im Skript M3 §2 eingefuehrte Quellenkritik-Frage auf beide Fotos an: Fehlen Bauern, Arbeiter, aeltere Menschen? Tagebuch-Skeptiker (mat-3-5) liefert die fehlende Gegenstimme als historische Quelle. Forschung der 1970er Jahre (Skript M3 §3) wird im Subagenten-Begleittext gestuetzt |
| **C2** (Burgfrieden) | mat-3-6 (Burgfriedens-Medaille, RESERVE) + Hefteintrag-Schueler-Text | SuS sehen die Erinnerungsmedaille zum 4.8.1914 und erkennen die offizielle Selbst-Inszenierung. Skript M3 §4 erklaert SPD-Kriegskredite, Reichstagskonsens und das spaetere Zerbrechen 1916/17. Falls mat-3-6 wegen PARTIAL-Verifikation entfaellt: Hefteintrag-Schueler-Text traegt C2 inhaltlich allein |
| **P** (Kriegsschuldfrage) | mat-3-3 (Versailles Art. 231, Quellentext) | SuS lesen den Originaltext-Auszug und identifizieren: Wer schreibt? (Sieger 1919) Wann? (28.6.1919) Mit welchem Ziel? (Schuldzuweisung an Deutschland + Verbuendete). Skript M3 §5 fuehrt Begriff "Kriegsschuld-Klausel" und "Kriegsschuldfrage" ein |
| **L** (Loesung/Synthese 2013) | mat-3-4 (Clark Schlafwandler-Paraphrase) + Hefteintrag-Schueler-Text (Synthese-Satz) | SuS lesen die R7-Paraphrase der Clark-These und stellen sie der Versailles-Position gegenueber. Skript M3 §6 personalisiert Clark als heutigen Forscher (Australier, 2013). Synthese im Hefteintrag: "Die Frage 'Wer ist schuld?' hat keine einfache Antwort." |

### SCPL-Uebergangs-Erarbeitung (kausaler Mechanismus)

| SCPL-Uebergang | Material | Zusammenhang belegt durch | kausal_mechanismus |
|---|---|---|---|
| **S -> C1** | mat-3-1 + mat-3-2 (selbe Materialien, Perspektivwechsel durch BU-Frage) | "Wer ist NICHT zu sehen?" als Pflicht-Frage in beiden BUs | "Sichtbare Begeisterung im Foto -> Frage nach Unsichtbarem -> Erkenntnis: Foto ist Ausschnitt, nicht Repraesentation" (Quellenkritik-Mechanik) |
| **C1 -> C2** | mat-3-5 (Tagebuch) -> mat-3-6 (Medaille) | Skript M3 §3-§4 (Uebergang Foto-Bias -> Burgfrieden) | "Skepsis-Stimmen 1914 erkannt -> Aber 4.8.1914 stimmen sogar SPD-Vertreter zu -> Burgfrieden als institutioneller Konsens trotz Bevoelkerungs-Skepsis" (kontrastiv: Mehrheit vs. Reichstag) |
| **C2 -> P** | mat-3-6 -> mat-3-3 | Skript M3 §4-§5 (Burgfrieden zerfaellt 1916/17 -> Krieg verloren -> Versailles 1919 weist Schuld zu) | "Burgfrieden als Anfangsphase -> 4 Jahre Krieg -> Niederlage -> Schuldzuweisung durch Sieger" (temporal-kausal) |
| **P -> L** | mat-3-3 -> mat-3-4 | Hefteintrag-Sicherungs-Text + Skript M3 §6 | "Versailles-Position 1919 (Allein-Schuld) wird durch Forschung herausgefordert -> Clark 2013 (multi-kausal, 5 Maechte) -> Kontroverse als heutiger Forschungsstand" (kontrastiv-perspektivisch: 1919 vs. 2013) |

**Abdeckungs-Check:**
- Jede SCPL-Zone hat min. 1 Material-Zuordnung: **PASS**
- Jeder SCPL-Uebergang ist belegt: **PASS** (4/4 Uebergaenge)
- Kausale Mechanismen dokumentiert: **PASS** (1 Satz pro Uebergang)
- Voraussetzungs-Check: **PASS** — M3 setzt M2 (Ursache vs. Ausloeser) voraus, das ist im Hefteintrag M2 gesichert (key_concept "Ursache" + "Ausloeser"). M1 (Pulverfass + Buendnis-System) wird nicht direkt aktiviert, aber im Hefteintrag-Schueler-Text M3 implizit als Kontext mitgefuehrt
- Artefakt-Refs vollstaendig: **PASS** (3 img + 1 zit + 1 rolle + 1 reine Eigenproduktion mat-3-4)

---

## INFERENTIAL-Zonen-Stuetzungs-Plan

**Pruefung:** Alle 5 SCPL-Zonen sind DIRECT durch min. 1 Material erarbeitet. KEIN INFERENTIAL-Stuetzungs-Plan erforderlich.

**Hinweis fuer P (Kriegsschuldfrage):** Die Komplexitaets-Differenz zwischen Versailles 1919 (mat-3-3) und Clark 2013 (mat-3-4) verlangt von R7-SuS eine kontrastive Lesart. Diese ist altersangemessen, weil:
- Beide Positionen werden EXPLIZIT genannt (kein verstecktes Vorwissen)
- Die Differenz wird im Hefteintrag-Schueler-Text als Kernsatz formuliert
- Die 3-Stufen-Tipps (Stufe 3) liefern explizite Loesung als Sicherung
- Beutelsbach-Kontroversitaetsgebot wird durch Doppel-Position aktiv gestuetzt — kein Antwort-Vorgriff

---

## Sequenzplan (NEU v3.3)

**Reihenfolge-Begruendung:** Primaer SKRIPT-Reihenfolge §1-§6, sekundaer SCPL-Aufbau S->C1->C2->P->L. Beide Anker decken sich vollstaendig. SKRIPT-Position der Artefakt-Marker entspricht 1:1 der sequenz_position aus artefakt_inventar.json M3.

| # | Material-ID | Typ | Didaktische Funktion | SCPL-Zone | material_charakter | bildfunktion | analyseauftrag | personalisiert | primary_scpl_zone | aktivierungscharakter | fachbegriffe_eingefuehrt | fachbegriffe_referenziert | Voraussetzung | Kerninhalt (1 Satz) |
|---|-------------|-----|----------------------|-----------|--------------------|--------------|----------------|----------------|-------------------|-----------------------|--------------------------|---------------------------|---------------|---------------------|
| 1 | mat-3-1 | bildquelle | einstieg | S | vergegenwaertigung | heuristisch | true | false | S | bild | Augusterlebnis, Quellenkritik (Stufe 1 Begriff via BU) | (M2: Ursache, Ausloeser) | — | Postkarte Luebeck Hauptbahnhof 31.7.1914 — sichtbare Begeisterung loest Quellenkritik-Frage aus |
| 2 | mat-3-2 | bildquelle | erarbeitung | C1 | vergegenwaertigung | heuristisch | true | false | C1 | — | Foto-Bias, Inszenierung | Augusterlebnis, Quellenkritik | mat-3-1 | Bundesarchiv-Foto Mobilmachung 1./2.8.1914 — Inszenierungs-Topos "Frau mit Blumen" wird zur zweiten Quellen-Pruefung |
| 3 | mat-3-5 | tagebuch | erarbeitung | C1 (Anti-Bias) | besinnung_wertbezogen | n/a | true | true | C1 | — | (keine neuen Begriffe) | Augusterlebnis, Quellenkritik, Foto-Bias | mat-3-1, mat-3-2 | Tagebuch-Stimme Land/Arbeiter/SPD 1914 — historische Anti-Bias-Stimme zur Begeisterungs-Inszenierung |
| 4 | mat-3-6 | bildquelle | erarbeitung | C2 | vergegenwaertigung | heuristisch | true | false | C2 | — | Burgfrieden, Kriegskredite | Quellenkritik, Inszenierung | mat-3-5 | Burgfriedens-Medaille 4.8.1914 — Auftrags-Inszenierung des Reichstags-Konsens (RESERVE: PARTIAL-Verifikation) |
| 5 | mat-3-3 | quellentext | erarbeitung | P | besinnung_sachbezogen | n/a | true | false | P | — | Kriegsschuldfrage, Kriegsschuld-Klausel (Art. 231) | Burgfrieden, Quellenkritik | mat-3-6 | Versailles Art. 231 (1919) Original-Auszug — Sieger-Position weist Allein-Schuld zu |
| 6 | mat-3-4 | darstellungstext | sicherung | L | besinnung_sachbezogen | n/a | false | true | L | — | Schlafwandler-These | Kriegsschuldfrage, Kriegsschuld-Klausel | mat-3-3 | Christopher Clark "Die Schlafwandler" (2013) — heutige Forschung: keine Allein-Schuld, multi-kausale Mit-Verantwortung von 5 Maechten |

**Aktivierungscharakter Position 1 (S10-Pruefung):** mat-3-1 ist `bild`-aktivierend. Niedrigschwelliger Einstieg gemaess R3-S1 (kein Vorwissen-Anspruch im Schueler-Material; Stufe-1-Tipp "Was siehst du?"). PASS.

### Uebergangsobjekte (JSON-Schema gemaess GUETEKRITERIEN_SEQUENZIERUNG.md §4.4)

| Von -> Nach | rueckbezug_inhalt_ref | vorausblick_frage | kausalitaets_typ | intentionsskizze (2-3 Saetze) |
|---|---|---|---|---|
| mat-3-1 -> mat-3-2 | Das erste Foto aus Luebeck zeigt jubelnde Stadt-Buerger am Bahnhof | Aber war das ueberall in Deutschland so — oder zeigt jedes Foto denselben Ausschnitt? | vertiefend | Du hast die Augustbegeisterung in Luebeck gesehen. Schau dir jetzt ein zweites Foto an. Vergleiche: Was zeigen beide Fotos? Und was zeigen sie nicht? |
| mat-3-2 -> mat-3-5 | Beide Fotos inszenieren patriotische Begeisterung am Bahnhof oder bei der Mobilmachung | Was schrieben Menschen, die eben NICHT am Bahnhof jubelten — die zu Hause blieben oder skeptisch waren? | perspektivwechsel | Bilder zeigen, was vor der Kamera stand. Aber Tagebuecher zeigen, was Menschen wirklich dachten. Lies jetzt eine Stimme, die in keinem Foto vorkam |
| mat-3-5 -> mat-3-6 | Land-Bevoelkerung und Arbeiter waren oft skeptisch oder ablehnend gegenueber dem Krieg | Wenn die Bevoelkerung gespalten war — wie reagierten dann die Politiker im Reichstag? | kontrastiv | Auf der Strasse war die Stimmung gemischt. Im Reichstag aber waren am 4. August alle einer Meinung. Sogar die SPD. Diese politische Einigkeit hatte einen Namen — und einen offiziellen Beleg |
| mat-3-6 -> mat-3-3 | Die Medaille feiert den Burgfrieden 4.8.1914 als Reichstags-Konsens am Anfang des Krieges | Vier Jahre spaeter ist der Krieg verloren — wer bekommt jetzt die Schuld zugewiesen? | temporal | Der Burgfrieden war der Anfang. Vier Jahre Krieg spaeter ist Deutschland besiegt. Im Vertrag von Versailles steht 1919 ein wichtiger Satz — Artikel 231 |
| mat-3-3 -> mat-3-4 | Versailles Artikel 231 weist Deutschland und seinen Verbuendeten 1919 die Allein-Schuld zu | Aber stimmt das aus heutiger Forschungs-Sicht — oder sieht die Wissenschaft das ueber 100 Jahre spaeter anders? | kontrastiv | Die Sieger schrieben 1919 die Schuld auf. Aber Geschichte wird neu geschrieben. Heute sagt der Forscher Christopher Clark etwas anderes. Hoer dir seine These an |

**Hinweis:** Die `intentionsskizze` ist die Design-Absicht aus Phase 1. Die finalen Ueberleitungen werden in Phase 2.1c (VERTRAG_PHASE_2-1c, Achse 5) produziert. Die strukturierten Felder (`rueckbezug_inhalt_ref`, `vorausblick_frage`, `kausalitaets_typ`) sind pruefbar (S9) und bleiben bestehen.

### Sequenzkontext-Objekte (fuer SUB_MATERIAL-Dispatch)

| Material-ID | vorher (ID, Typ, Kerninhalt) | nachher (ID, Typ, Kerninhalt) |
|---|---|---|
| mat-3-1 | — (Sequenz-Anfang) | mat-3-2, bildquelle, "Bundesarchiv-Foto Mobilmachung 1./2.8.1914 — zweites Inszenierungs-Beispiel" |
| mat-3-2 | mat-3-1, bildquelle, "Postkarte Luebeck 31.7.1914 — erste Augusterlebnis-Quelle" | mat-3-5, tagebuch, "Skeptische Zeitgenossen-Stimme als Anti-Bias zu beiden Fotos" |
| mat-3-5 | mat-3-2, bildquelle, "Bundesarchiv-Inszenierungs-Topos 'Frau mit Blumen'" | mat-3-6, bildquelle, "Burgfriedens-Medaille — Inszenierung des Reichstags-Konsens 4.8.1914" |
| mat-3-6 | mat-3-5, tagebuch, "Tagebuch eines Skeptikers — Stimme der nicht-jubelnden Mehrheit" | mat-3-3, quellentext, "Versailles Art. 231 (1919) — Sieger-Position weist Allein-Schuld zu" |
| mat-3-3 | mat-3-6, bildquelle, "Burgfriedens-Medaille — Anfang des Krieges 1914" | mat-3-4, darstellungstext, "Clark-Schlafwandler-These (2013) — heutige Forschungsposition" |
| mat-3-4 | mat-3-3, quellentext, "Versailles Art. 231 — historische Sieger-Position 1919" | — (Sequenz-Ende, Sicherung schliesst zum Hefteintrag) |

---

## Einstieg und Sicherung

### Einstieg
- **Typ:** narrativ + visueller Anker (Skript M3 Einstieg-Kontext)
- **Text (uebernommen aus SKRIPT M3 Einstieg-Kontext):** "In Mappe 2 hast du gelernt: Ausloeser und Ursache sind nicht das Gleiche. Jetzt liegt Mappe 3 vor dir. Im Deckel: zwei Fotos und eine Medaille. Auf der Medaille steht '4. August 1914'. Was war an diesem Tag los?"
- **Tafelbild-Voraussetzung:** Hefteintrag M2 (Begriffe Ursache vs. Ausloeser, Buendnisfall, Mobilmachung). Implizit auch M1 (Pulverfass-Metapher als Hintergrund), aber nicht aktiv abgefragt
- **Aktivierungs-Schritt:** mat-3-1 (Postkarte Luebeck) als Bild-Einstieg mit Quellenkritik-Frage "Was siehst du? Wer steht da? Wer ist NICHT zu sehen?" (Tipp Stufe 1)

### Sicherung
- **Typ:** zusammenfassung + reflexion (Hefteintrag-Schueler-Text + Merksatz)
- **Text (uebernommen aus HEFTEINTRAG_M3 B.3 + B.5):**
  > "Die Frage 'Wer ist schuld?' hat keine einfache Antwort. Begeisterung war Stadt-Sache. Schuld war geteilt."
  > Merksatz: **Die Augustbegeisterung 1914 war real, aber nicht ueberall. Die Frage 'Wer ist schuld?' hat heute keine einfache Antwort mehr — Versailles 1919 sagt: Deutschland allein. Clark 2013 sagt: mehrere Maechte gemeinsam.**
- **Ueberleitung:** "Die Maenner zogen los — was passierte, als sie ankamen?" (Sandwich-Anker M4, aus Hefteintrag M3 META + Skript M3 Sandwich-Uebergang)
- **Reflexionsimpuls (1 Satz):** "Welche Position findest du ueberzeugender — Versailles 1919 oder Clark 2013, und welche Argumente hast du?"

---

## Perspektiven-Abdeckungsmatrix (M9 + M13 — Konflikttyp TRUE)

5 Perspektiven aus DIDAKTIK_RAHMEN + Hefteintrag M3 lehrkraft.multiperspektivitaet:

| Perspektive | mat-3-1 | mat-3-2 | mat-3-5 | mat-3-6 | mat-3-3 | mat-3-4 | Abdeckung |
|---|---|---|---|---|---|---|---|
| P1: Begeisterte Stadtbuerger 1914 | X | X | | | | | 2/6 |
| P2: Skeptische Land-Bevoelkerung+Arbeiter+SPD 1914 | (negativ implizit) | (negativ implizit) | X | | | | 1/6 (explizit) |
| P3: Versailler Sieger-Maechte 1919 | | | | | X | | 1/6 |
| P4: Heutige Forschung (Clark 2013) | | | | | | X | 1/6 |
| P5: Reichstags-Inszenierung Burgfrieden | | | | X | | | 1/6 |

**Min-3-Pflicht (M13):** ERFUELLT (5/5 Perspektiven aus Policy vertreten). Keine Perspektive ueberwiegt durch Mehrfach-Repraesentation. PASS.

**Cross-Pruefung Phase 2.1c:** Achse Perspektiven-Diversitaet wird automatisch validieren — alle 5 deklarierten Perspektiven sind im Material-Set vertreten.

---

## F0b-Perspektiv-Tags (Pflicht pro Material, gemaess MATERIAL-PERSPEKTIV-01)

`trigger_categories` aus INHALTSBASIS-Header: enthaelt "Konflikt" (weltkrieg_grossereignis) + ggf. "Macht-Asymmetrie" (Sieger-Verlierer-Position Versailles). MATERIAL-PERSPEKTIV-01 ist AKTIV.

| Material-ID | perspektiv_tags[] (Plan, Subagent finalisiert in Phase 2.1) | Begruendung |
|---|---|---|
| mat-3-1 | [`dominant`, `Macht-Ausuebung`] | Stadt-Buergerliche Mittelschicht-Inszenierung (dominante Sicht) |
| mat-3-2 | [`dominant`, `Macht-Ausuebung`] | Bundesarchiv-Selbstdarstellung Heeresleitung (dominante Sicht) |
| mat-3-5 | [`nicht-dominant`, `Alltag`, `Kritik`] | Skeptische Stimme Land/Arbeiter/SPD (nicht-dominant; Kritik am Krieg) |
| mat-3-6 | [`dominant`, `Macht-Ausuebung`] | Reichstags-Auftrags-Inszenierung (dominante Sicht) |
| mat-3-3 | [`dominant`, `Macht-Ausuebung`] | Sieger-Maechte 1919 weisen Schuld zu (dominante Sicht der Sieger) |
| mat-3-4 | [`Kritik`, `nicht-dominant`] | Heutige Forschung kritisiert die monokausale Sicht von 1919 (Clark als Kritik der Allein-Schuld-These) |

**QG-09 Coverage-Check (min. 2 nicht-dominante Tags ueber Mappe):** ERFUELLT
- nicht-dominante Tags: `nicht-dominant` (mat-3-5, mat-3-4), `Alltag` (mat-3-5), `Kritik` (mat-3-5, mat-3-4)
- Anzahl nicht-dominante Materialien: 2 (mat-3-5, mat-3-4)
- Schwelle min. 2: PASS

**Hinweis:** Final-Tags werden vom SUB_MATERIAL-Subagenten im Phase-2.1-Dispatch direkt gesetzt (KEINE nachgelagerte Tag-Suggest-Runde, gemaess F0b-M9). Diese Plan-Tags dienen als Constraint im Dispatch-Prompt.

---

## TERMINOLOGIE-01 (QG-07)

**Trigger:** `trigger_categories` enthaelt NICHT "Kolonisierung" (M3 hat Themen Augusterlebnis, Kriegsschuldfrage, Burgfrieden — keine kolonialen Inhalte).

**Pruefung:** TERMINOLOGIE-01 (Kolonialterminologie-Scan) ist fuer M3 **NICHT AKTIV**. Sprach-Sieb der Mappe konzentriert sich auf:
- Augusterlebnis-Idealisierungs-Verbot (siehe Lehrkraft-Sektion Hefteintrag M3.A.3)
- Kriegsschuld-Luege-NSDAP-Topos: BLEIBT IM LEHRKRAFT-Block (POLICY_TRIGGER_SICHTBARKEIT V13)

---

## Nicht verwendete Artefakte

| ID | Beschreibung | Begruendung |
|---|---|---|
| (keine) | — | Alle 4 verifizierten Bilder + 1 PARTIAL + 1 Quellentext + 1 Tagebuch-Slot fuer M3 sind im Material-Set verwendet. Vollstaendige Abdeckung aus artefakt_inventar.json M3 (6/6 Materialien) |

---

## Q-Gate Self-Check (Material-Geruest M3)

| Pruefung | Soll | Ergebnis | Evidenz |
|---|---|---|---|
| SCPL-Zone-Abdeckung 100% | ja | **PASS** | 5/5 Zonen DIRECT erarbeitet |
| SCPL-Uebergaenge belegt | ja | **PASS** | 4/4 Uebergaenge mit kausal_mechanismus dokumentiert |
| Mindest-Materialien (>=4, mit 1 DT, 1 QT/BQ, 1 personifiziert, 1 visuell) | ja | **PASS** | 6 Materialien (1 DT + 1 QT + 3 BQ + 1 TB) |
| Stoffdichte-Korridor 4-7 | ja | **PASS** | 6 (innerhalb Korridor) |
| Medienvielfalt-Ratio MV1 (max 50% textbasiert) | ja | **PASS** | 3:3 textbasiert : nicht-textbasiert |
| Konflikttyp-Flag korrekt | ja | **PASS** | konflikttyp=TRUE, perspektiven_policy mit 5 Perspektiven deklariert |
| Perspektiven-Abdeckung min. 3 (M13) | ja | **PASS** | 5/5 deklarierte Perspektiven vertreten |
| F0b-M4 MATERIAL-PERSPEKTIV-01 (min. 2 nicht-dominant) | ja | **PASS** | 2 Materialien mit nicht-dominanten Tags (mat-3-5, mat-3-4) |
| F0b-M9 perspektiv_tags[] geplant pro Material | ja | **PASS** | Pro Material Plan-Tags dokumentiert; Final-Tagging im Dispatch |
| F0b-M6 TERMINOLOGIE-01 | n/a (nicht aktiv fuer M3) | **N/A** | Keine Kolonisierungs-Kategorie im trigger_categories |
| Sensibilitaets-Markierung pro Material | ja | **PASS** | 4 Materialien mit propaganda_kontextualisierung_noetig + 1 mythos_korrektur_noetig + 2 keine |
| Quellentext-Subtyp-Klassifikation | ja | **PASS** | mat-3-3 = primaer (gekuerzt-vereinfacht), mat-3-5 = rekonstruiert (M14-Pflicht) |
| AFB-Korridor II-III (Hoehepunkt) | ja | **PASS** | Quellenkritik (II), Multiperspektivitaet (II-III), eigene Position bilden (III). 3-Stufen-Tipp-System aktiv (Hefteintrag A.4) |
| 3-Stufen-Tipp-System | ja | **PASS** | a3-01..a3-06 alle mit Stufen-Tipps in artefakt_inventar |
| Augusterlebnis-Idealisierung-Verbot | ja | **PASS** | 4 Materialien mit Quellenkritik-Pflicht; mat-3-5 als explizite Anti-Bias-Stimme; Beutelsbach-Ueberwaeltigungsverbot AKTIV |
| Kontroversitaet (Beutelsbach) | ja | **PASS** | mat-3-3 (Versailles 1919) vs. mat-3-4 (Clark 2013) als doppelte historische Position; kein Antwort-Vorgriff |
| Sequenzplan vollstaendig (S1-S17) | ja | **PASS** | Alle Pflichtfelder gesetzt; Aktivierung durch Bild bei Position 1; vorher/nachher pro Material; Uebergangsobjekte 5/5 |
| Niedrigschwelliger Einstieg (R3-S1) | ja | **PASS** | mat-3-1 als Bild-Einstieg, kein Vorwissen-Anspruch; Stufe-1-Tipp "Was siehst du?" |
| Identifikationsfiguren (R3-S2) | ja | **PASS** | Tagebuch mat-3-5 (skeptische Bauern-Frau/SPD-Anhaenger), Forschungs-Personifizierung mat-3-4 (Christopher Clark als Person) |
| Visuelle Klarheit (R3-S3) | ja | **PASS** | 3 zeitgenoessische Fotos mit BU-Pflicht (3-Funktions-BU); BUs strukturieren die Quellenkritik-Frage |
| Emotionale Ansprache (R3-S4) | ja | **PASS** | mat-3-1+mat-3-2 wecken Empathie via Bahnhofs-/Mobilmachungs-Szene; mat-3-5 macht Skepsis als Stimme erlebbar |
| RESERVE-Status mat-3-6 dokumentiert | ja | **PASS** | PARTIAL-Verifikation als Q-Gate-Eskalation Phase 0.2.M; Direkt-Verifikation in Phase 1 vor Final-Einsatz |
| Trigger-Sichtbarkeit V13 | ja | **PASS** | trigger_flags + Augusterlebnis-Idealisierungs-Verbot + Versailles-Sprengkraft NSDAP-Folge bleiben Lehrkraft-only |
| AFB-Hoehepunkt M3 mit Differenzierungs-Pflicht | ja | **PASS** | 3-Stufen-Tipp-System verbindlich aktiv; explizit in Hefteintrag M3 A.4 dokumentiert |

**Gate-Urteil Phase 1 Material-Design M3: PASS**

Alle BLOCKER-Kriterien (SCPL-Abdeckung, Konflikttyp, M9/M13, sequenz_kontext) PASS. Alle HIGH (Stoffdichte, Medienvielfalt, Sensibilitaet, Sprach-Sieb) PASS. RESERVE-Hinweis mat-3-6 dokumentiert (PARTIAL-Verifikation in Phase 1 nachzuholen).

**Validierungsstatus:** ENTWURF (User-Validierung nach Phase-1-Gate ausstehend).

---

## Hand-off an Phase 2.1 (agent-material-dispatcher)

**Dispatch-Reihenfolge (Pflicht: 1 Material = 1 Nachricht, P4):**
1. mat-3-1 -> SUB_MATERIAL_BILDQUELLE.md
2. mat-3-2 -> SUB_MATERIAL_BILDQUELLE.md
3. mat-3-5 -> SUB_MATERIAL_TAGEBUCH.md
4. mat-3-6 -> SUB_MATERIAL_BILDQUELLE.md (NACH Direkt-Verifikation img-m3-03 in Phase 1)
5. mat-3-3 -> SUB_MATERIAL_QUELLENTEXT.md (Subtyp: primaer; aufbereitung: gekuerzt-vereinfacht)
6. mat-3-4 -> SUB_MATERIAL_DARSTELLUNGSTEXT.md (Forschungs-Paraphrase Clark)

**Dispatch-Constraints (uebergreifend):**
- Sprachniveau-R7-Priming-Include verbindlich (alle Materialien)
- Post-Gen-Metrik-Gate: scripts/sprachniveau-gate.js (alle Materialien)
- Schema-Strict-Validation gegen material-output-schema.json (alle Materialien)
- Trigger-Sichtbarkeit V13: trigger_flags bleiben in `_meta`, NIE im Schueler-Text
- Quellenangaben als <cite>-Element in Material-HTML (kein separates Array, L6)

**Spezial-Constraint mat-3-3 + mat-3-4:** Beide Materialien bilden den Kontroversitaets-Pol P vs. L. Im Dispatch-Prompt EXPLIZIT auf Gegenposition referenzieren (sequenz_kontext). Keine vorzeitige Synthese.

**Spezial-Constraint mat-3-6 (RESERVE):** VOR Dispatch in Phase 2.1 muss agent-material-dispatcher die Direkt-Verifikation der Wikimedia-Datei `Germany_entering_WWI_1914,_Silver_Medal,_obverse.jpg` durchfuehren (Q-GATE-LOG-Pflicht-Eintrag Phase 0.2.M-Followup). Bei FAIL: Material 3-6 entfaellt, C2-Erarbeitung nur durch Hefteintrag-Schueler-Text (DOWNGRADE-Notiz im Q-GATE-LOG).

---

## Referenz-Dokumente (Phase-1-Eingabe)

| Dokument | Status |
|---|---|
| VERTRAG_PHASE_2-1_MATERIAL.md | gelesen (Schnittstellenvertrag, SCPL-Zone-Mapping, F0b-M4/M6/M9/M14) |
| QUALITAETSKRITERIEN_MATERIALPRODUKTION.md | gelesen (M1-M15 + typ-uebergreifend; M13 + M14 aktiv) |
| HEFTEINTRAG_M3.md | gelesen (STRUKTUR-FREEZE, dual-Struktur Lehrkraft/Schueler) |
| hefteintrag_struktur.json M3 | gelesen (TB-Knoten K3-1..K3-6, Verbindungen, scpl_struktur, schueler_text) |
| SKRIPT.md M3 §1-§7 | gelesen (Artefakt-Marker, Sandwich-Uebergaenge M2->M3, M3->M4) |
| artefakt_inventar.json M3 | gelesen (6 Materialien, anker_briefing, tafelbild_knoten, tipp_stufen_slot) |
| medien_katalog (Phase 0.2.M) | indirekt referenziert via artefakt_inventar (4 verifizierte Bilder + 1 PARTIAL) |

**Validierungsstatus:** ENTWURF — User-Validierung nach Phase-1-Gate ausstehend.
