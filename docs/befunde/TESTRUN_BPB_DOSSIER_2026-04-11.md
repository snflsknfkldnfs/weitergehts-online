# Befund R0.7 — Viability-Evaluation bpb.de-Dossier als Quell-Kanal

**Datum:** 2026-04-11
**Runde:** R0.7 (Audit-Track, nach R0.6 Titel-Verifikation)
**Anlass:** User-Meldung: "hochwertiges bpb-Dossier zum Ersten Weltkrieg inkl. Medien gefunden — evaluiere, ob solche Dossiers standardisiert ueber Cowork abrufbar und nutzbar sind".
**Testobjekt:** https://www.bpb.de/themen/erster-weltkrieg-weimar/ersterweltkrieg/ (Dossier-Root) + Unterartikel 155302 "Ausloesung und Beginn des Krieges" (Wolfgang Kruse)
**Status:** ABGESCHLOSSEN, Verdikt siehe §1.

---

## §1 — Verdikt (TL;DR)

**Abruf:** JA, standardisiert moeglich ueber zwei bereits verfuegbare Cowork-Tools (WebFetch, markdownify). Kein dedizierter bpb-Connector im MCP-Registry noetig und auch nicht verfuegbar.

**Nutzung:** TEILWEISE, unter harten Lizenz-Restriktionen. bpb-Inhalte sind **NICHT** gleichwertig zu Wikipedia-Volltext-Quellen einsetzbar, weil die CC BY-NC-ND 4.0-Lizenz jede Bearbeitung (Paraphrase, Kuerzung, lernerorientierte Umarbeitung, Bild-Crop, Text-Overlay) untersagt.

**Integrationsmodus:** bpb ist KEIN dritter Volltext-Ingest-Kanal parallel zu Wikipedia Kern-Artikel. bpb ist ein **Zitat- und Referenz-Kanal** fuer wortgetreue Kurzzitate (gedeckt durch §51 UrhG unabhaengig von ND), fuer unveraenderte Grafik-Einbettung mit Lizenz-Footer und fuer die Identifizierung hochwertiger Commons-verfuegbarer Bundesarchiv-/PD-Bilder, die bpb bereits kuratiert hat.

**Plan-Impact:** Neue Phase 0.2.Z "Zitat-Baustein-Kuratierung (bpb + andere CC-BY-NC-ND-Quellen)" vorschlagen, parallel zu 0.2.M. Bestehende Dual-Scope-Architektur (Kern-Artikel + Medien-Scope) bleibt unveraendert.

---

## §2 — Test-Setup

| Parameter | Wert |
|---|---|
| Dossier-Root | bpb.de/themen/erster-weltkrieg-weimar/ersterweltkrieg/ |
| Getesteter Unterartikel | /155302/ausloesung-und-beginn-des-krieges/ (Kruse, 2013, letzte Aenderung 2026-02) |
| Getestete Tools | (a) WebFetch, (b) markdownify MCP `webpage-to-markdown`, (c) mcp-registry search |
| Verglichenes Referenz-Tool | Wikipedia-Vollextraktion aus R0.5 (mcp__wikipedia + WebFetch Dual-Kanal) |
| Ausgeschlossen | Bundesarchiv-Bilder-Abruf (laeuft ueber Commons-Kanal, bereits in R0.5 verifiziert) |

---

## §3 — Tool-Tauglichkeit

### 3.1 — `mcp-registry search`
Abfrage mit Keywords `["bpb", "bundeszentrale", "politische bildung", "dossier", "civic education"]` → **0 Treffer**. Kein dedizierter bpb-Connector existiert. Integration muss ueber generische Web-Tools erfolgen.

### 3.2 — WebFetch (AI-gestuetzt)
- Dossier-Root: erkennt Gliederung korrekt (13 Fach-Kapitel + 2 Quizze), extrahiert interne Links mit Titeln und Pfaden.
- Unterartikel: erkennt Autor, Veroeffentlichungsdatum, grobe Wortzahl, Medien-Anzahl und -Typen, Bildunterschriften, Lizenz-Vermerk. Keine exakten `img src`-URLs, weil das AI-Modell HTML→Markdown konvertiert.
- **Staerke:** hochabstraktive Strukturerfassung, inkl. Bildunterschriften und Lizenz-Hinweisen, die in reinem Markdown-Dump nicht sauber erkennbar waren.
- **Schwaeche:** keine maschinenlesbaren URLs der Medien-Assets. Nicht geeignet fuer automatische Asset-Download-Pipelines.
- **Einsatz-Rolle:** Dossier-Gliederung, Inventur, Lizenz-Erfassung, Bildunterschriften-Kuratierung.

### 3.3 — markdownify `webpage-to-markdown`
- Unterartikel (Kruse, 155302) liefert **62 372 Zeichen / 556 Zeilen** Markdown — vollstaendiger Fachtext mit Quellen, Fussnoten, Literaturangaben.
- Lizenz-Hinweis als Text extrahiert: `Creative Commons Lizenz "CC BY-NC-ND 4.0 ..." veroeffentlicht. Autor/-in: Wolfgang Kruse`.
- Autor-Biogramm, Literaturverzeichnis (inkl. Kruse 2009, WBG) extrahiert.
- PDF-Download-Link als Markdown-Link erhalten: `herunterladen](/system/files/dokument_pdf/Angriff1914.pdf?download=1)`.
- **Kritischer Defekt: nur 1 Markdown-Image im Output**, und dieses ist das CC-Lizenz-SVG, nicht der Schlieffenplan, nicht das Bundesarchiv-Foto, nicht das Kaulbach-Gemaelde. Die bpb-Seiten binden redaktionelle Bilder offenbar ueber Lazy-Load/JS oder CSS-Background ein, die markdownify nicht aufloest.
- **Staerke:** saubere Volltext-Extraktion aller Prosa-Inhalte, Fussnoten, Literatur. Direkt maschinenlesbar, Zitat-Extraktion trivial.
- **Schwaeche:** Medien-Inventur unzuverlaessig (1 von mind. 3 Bildern erfasst).
- **Einsatz-Rolle:** Volltext-Grundlage fuer Zitat-Extraktion.

### 3.4 — Konsequenz: Dual-Kanal auch fuer bpb
Die Dual-Kanal-Pflicht aus R0.5 wiederholt sich bei bpb in anderer Form:
- **Volltext-Kanal:** markdownify (Fach-Text, Zitat-Material, Literaturhinweise, Lizenz-Statement).
- **Medien-Inventur-Kanal:** WebFetch (Bildunterschriften, Anzahl, semantische Zuordnung) ODER haendische bpb-Sichtung.
- **Asset-Download-Kanal:** Nicht ueber markdownify/WebFetch. Bundesarchiv-Bilder via Wikimedia Commons (bereits in R0.5-Pipeline), PD-Kunstwerke via Commons, bpb-eigene Grafiken (Schlieffenplan-Rekonstruktion) bei Bedarf per Browser-Screenshot-Capture im manuellen PM-Arbeitsschritt.

---

## §4 — Lizenz-Analyse CC BY-NC-ND 4.0 (entscheidend)

Die bpb verwendet einheitlich **Creative Commons BY-NC-ND 4.0 International** fuer alle Volltexte des Dossiers. Verifiziert durch:
- Lizenz-SVG im Artikel-Footer (by-nc-nd-Logo)
- Klartext-Vermerk: *"Dieser Text ist unter der Creative Commons Lizenz 'CC BY-NC-ND 4.0 - Namensnennung - Nicht kommerziell - Keine Bearbeitungen 4.0 International' veroeffentlicht"*
- Link auf creativecommons.org/licenses/by-nc-nd/4.0/deed.de

### 4.1 — Was diese Lizenz erlaubt
| Nutzung | Erlaubt? | Voraussetzung |
|---|---|---|
| Text unveraendert einbetten (z.B. als Lese-Quelle) | JA | Autor + Quelle + Lizenz + Link |
| Text als Zitat (Auszug, wortgetreu) | JA, zusaetzlich gedeckt durch §51 UrhG Zitatrecht | Quellenangabe |
| Bild unveraendert einbetten | JA | Autor + Quelle + Lizenz |
| Dossier-Seite verlinken | JA | Keine |
| Nutzung im Schulunterricht (offline, non-profit) | JA | Standardregeln |
| Nutzung auf weitergehts.online (non-commercial) | JA (nicht-kommerziell) | Standardregeln |

### 4.2 — Was diese Lizenz VERBIETET
| Nutzung | Problem |
|---|---|
| Text paraphrasieren/umformulieren/vereinfachen | **ND-Verletzung** (Bearbeitung) |
| Text kuerzen/zu Puzzle-Haeppchen zerlegen | **ND-Verletzung** |
| Text uebersetzen | **ND-Verletzung** |
| Text als Sub-Agent-Input fuer LLM-Umarbeitung | **ND-Verletzung** |
| Bild croppen / rekolorieren / Text-Overlay | **ND-Verletzung** |
| Nutzung mit Werbe-Einblendung oder Paywall | **NC-Verletzung** |
| Share-Alike-Weitergabe unter anderer Lizenz | Nicht CC-kompatibel (im Gegensatz zu CC-BY-SA) |

### 4.3 — Konsequenzen fuer Escape-Game-Pipeline
- **Wikipedia-Volltext-Pipeline** (Phase 0.1 Kern-Artikel-Ingest → Phase 1.x lernerorientierte Umformulierung durch Sub-Agent) ist fuer bpb-Texte **NICHT ANWENDBAR**. Der Sub-Agent wuerde Derivatwerke erzeugen, die ND untersagt.
- **Wikipedia Share-Alike CC-BY-SA** erlaubt hingegen Ableitungen, solange das Derivat ebenfalls unter CC-BY-SA steht. Deswegen ist Wikipedia architektonisch privilegiert.
- bpb-Inhalte koennen nur als **Zitat-Bausteine** in das Escape-Game einflie"szen:
  - Wortgetreue Kurzzitate (typisch 1-3 Saetze bis max. 1 Absatz) als Material fuer Leseaufgaben, Quellenanalysen, "Was sagt der Historiker Kruse ueber X?"-Puzzles. Rechtlich doppelt gedeckt durch §51 UrhG (Zitatrecht) und die Lizenz selbst (unveraenderte Wiedergabe).
  - Fakten-Extraktion fuer spaetere Eigen-Formulierung ist hingegen problematisch: Einzelne Fakten sind urheberrechtlich frei, aber die spezifische Formulierungsweise nicht. Die Grenze ist in der Praxis unklar, und ein Escape-Game, das "bpb als Quelle" lose paraphrasiert, riskiert ND-Verletzung.

### 4.4 — Empfohlene Nutzungs-Modi
**Modus A — Zitat-Baustein (rechtssicher):**
Wortgetreues Kurzzitat, mit Autor, Titel, Jahr, Quelle-URL, Lizenz-Link. Einsatz als Lesematerial fuer Puzzle-Typen "Textanalyse", "Quellenvergleich", "Was sagt der Historiker X".

**Modus B — Medien-Einbettung unveraendert (rechtssicher):**
Bild/Grafik in Originalgroesse und -zustand, mit Bildunterschrift, Rechteinhaber, Lizenz-Link. Einsatz als Quellen-Grafik in Lernstationen.

**Modus C — Fakten-Referenz (Graubereich, vermeiden):**
Sub-Agent liest bpb-Text, extrahiert Fakten, formuliert neu. Rechtlich nur haltbar, wenn die Neuformulierung so weit vom Original entfernt ist, dass kein Derivat im Sinn der ND-Klausel mehr vorliegt. Da dies nicht automatisch verifizierbar ist: **vermeiden, Wikipedia bevorzugen**.

**Modus D — Strukturinspiration (unproblematisch):**
bpb-Dossier-Gliederung als Orientierungshilfe fuer PM-eigene Strukturierung. Gliederungsideen sind urheberrechtlich frei. Einsatz zur Kern-Artikel-Katalog-Validierung: Welche Aspekte deckt bpb, die der Wikipedia-Scope moeglicherweise uebersieht?

---

## §5 — Strukturanalyse Dossier "Der Erste Weltkrieg"

Aus dem WebFetch-Lauf sauber extrahierte Gliederung:

| Nr | Titel | URL-Pfad |
|---|---|---|
| 1 | Der Erste Weltkrieg als totaler Krieg | /155303/ |
| 2 | Ausloesung und Beginn des Krieges | /155302/ (getestet) |
| 3 | Kriegsverlauf und Au"sz enpolitik | /155304/ |
| 4 | Burgfrieden und Innenpolitik | /155305/ |
| 5 | Oekonomie des Krieges | /177509/ |
| 6 | Die Kriegsgesellschaft: Klassenspaltung, Verelendung, Militarisierung, sozialer Protest | /155311/ |
| 7 | Frauenarbeit und Geschlechterverhaeltnisse | /155330/ |
| 8 | Strategien und Waffen im industrialisierten Krieg | /155306/ |
| 9 | Soldatische Kriegserfahrungen im industrialisierten Krieg | /155307/ |
| 10 | Kriegsideologie, Propaganda und moderne Massenkultur | /155308/ |
| 11 | Zivilisationskrise und moderne Kunst | /155309/ |
| 12 | Das Ende des Kaiserreichs: Militaerischer Zusammenbruch und Revolution | /155331/ |
| 13 | Erbschaften des Krieges | /576269/ |
| Q1 | Quiz Anfaenger | (separat) |
| Q2 | Quiz Experten | (separat) |

### 5.1 — Vergleich mit Wiki-Scope-Katalog §8 (R0.6 authoritative)
Der Wiki-Katalog enthaelt 14 Kern-Artikel + 16 erweiterter Scope. Thematische Ueberdeckung:

| Wiki-Scope-Milestone | bpb-Kapitel-Entsprechung | Gap? |
|---|---|---|
| M1 Ursachen/Julikrise | Kap. 2 Ausloesung und Beginn | deckungsgleich |
| M2 Kriegsbegeisterung/Augusterlebnis | Kap. 2 (Teil), Kap. 4 Burgfrieden | bpb deckt das innenpolitische Framing staerker |
| M3 Neue Waffen/Totaler Krieg | Kap. 1, Kap. 8 | bpb Kap. 1 "totaler Krieg" ist explizit — PRUEFEN ob Wiki-Kern-Artikel dies ausreichend abbildet |
| M4 Schlieffen-Plan/Marne/Stellungskrieg | Kap. 2, Kap. 3 | bpb Kap. 3 "Kriegsverlauf und Au"szenpolitik" deckt das ab |
| — | Kap. 5 Oekonomie des Krieges | **NEU: Wiki-Katalog hat keinen dedizierten Wirtschaftskriegs-Artikel** |
| — | Kap. 7 Frauenarbeit und Geschlechterverhaeltnisse | **NEU: Wiki-Katalog hat keinen Frauen-Heimatfront-Artikel** — Wiki hat zwar "Heimatfront" generisch, aber Gender-Aspekt ist unterrepraesentiert |
| M6 Versailler Vertrag/Kriegsende | Kap. 12, Kap. 13 | deckungsgleich |
| — | Kap. 11 Zivilisationskrise und moderne Kunst | **NEU: Interdisziplinaerer Kunst/Kultur-Aspekt fehlt im Wiki-Scope** |

**Befund:** bpb liefert drei Themenbereiche, die im aktuellen Wiki-Scope-Katalog (v3.12/§8) unterrepraesentiert sind:
1. Kriegsoekonomie / Rohstoffkrise / Kriegswirtschaft
2. Frauenarbeit und Geschlechterrollen an der Heimatfront
3. Kunst und Kulturkrise (Expressionismus, Dada, Literatur nach 1918)

Dies ist eine **Strukturkritik am Wiki-Scope**, nicht an bpb. Mindestens zu pruefen, ob einer der drei Bereiche den Lehrplan-Schwerpunkt eines Escape-Games bildet und Wiki-Ergaenzungen im Scope-Katalog eingezogen werden muessen.

---

## §6 — Medien-Inventur M3/M4-Aequivalent aus bpb

Aus dem Test-Unterartikel Kap. 2 (Kruse, Ausloesung und Beginn):

| # | Beschreibung | Medientyp | Lizenz | Commons-Quelle? | Verwendbarkeit |
|---|---|---|---|---|---|
| 1 | Mobilmachung 1914, Deutscher Truppentransport (Bundesarchiv Bild 146-1994-022-19A) | Foto s/w | CC-BY-SA 3.0 Germany (Bundesarchiv-Standard) | JA, Commons | EINSETZBAR ueber Commons-Kanal, auch in Wiki-Katalog bereits potentiell erfasst |
| 2 | "Germania" von Friedrich August von Kaulbach (1914) | Kunstwerk-Reproduktion | Public Domain (Kuenstler gest. 1920, >70J nach Tod als Gemeinfreiheits-Grundlage) | JA (Commons-Upload typisch) | EINSETZBAR ueber Commons-Kanal |
| 3 | Schlieffenplan von 1905 (bpb-eigene Rekonstruktion) | Grafik/Karte | CC BY-NC-ND 4.0 (bpb) | NEIN, bpb-exklusiv | EINSETZBAR nur unveraendert, mit bpb-Attribution, NICHT croppen oder modifizieren |
| 4 | PDF "Angriff1914.pdf" (1,2 MB, bpb-Hosting) | Download-PDF | CC BY-NC-ND 4.0 | NEIN | EINSETZBAR als Zusatzmaterial-Download-Link, nicht modifizieren |

**Erkenntnis:** 2 von 3 Bildern aus dem getesteten bpb-Artikel sind NICHT bpb-exklusiv und laufen korrekterweise bereits ueber den Commons-Kanal aus R0.5. Nur die Schlieffenplan-Rekonstruktion ist bpb-spezifisch.

**Implikation:** bpb-Dossiers bieten vorrangig **Kuratierungsleistung** ("welche Commons-Bilder illustrieren welches Thema gut?"), nicht eigenstaendige neue Medien. Die Hauptnutzung ist also:
- **Inspiration fuer Commons-Suchbegriffe:** bpb zeigt, welche Commons-Bilder zum Thema X didaktisch gesetzt werden koennen → PM uebernimmt die Commons-URL in medien_katalog_game.json.
- **Eigenstaendiger bpb-Beitrag:** bpb-eigene Grafiken wie Kartenrekonstruktionen (Schlieffenplan) als unveraendert einbettbare Zusatzassets.

---

## §7 — Integrationsvorschlag: Phase 0.2.Z bpb-Quell-Integration

**HINWEIS (Session 29, Nachtrag):** §7.2/§7.3/§7.4 im Original-Entwurf sahen einen `bpb_zitat_kurator` fuer wortgetreue Zitate aus bpb-Autorentext vor. Dieser Sub-Agent wird **GESTRICHEN**. Begruendung: die Grenze zwischen "zitatrechtliches Kurzzitat" und "Derivat durch selektive Rahmung im Schulmaterial-Kontext" ist juristisch unscharf. Verzicht auf bpb-Autorentext komplett. Stattdessen:
- Medien-Kuratierung als Qualitaetsstempel (§12.2 Muster B)
- PD-Primaerquellen-Extraktion (§12.3-§12.4 Muster C) — der eigentliche Hebel
- Dossier-Struktur als Q-Gate-Raster (§12.1 Muster A)

Die entscheidenden Spezifikationen stehen in §12 (Nutzungs-Muster), §13 (Plan-Impact-Konsolidierung) und §14 (Discovery-Mechanismus).

### 7.1 — Architektur-Einordnung (aktualisiert nach Streichung)
| Quell-Kanal | Lizenz-Basis | Bearbeitungs-Erlaubnis | Ingest-Phase | Volltext-fuer-Sub-Agent |
|---|---|---|---|---|
| Wikipedia Kern-Artikel | CC-BY-SA 4.0 | JA (Share-Alike) | Phase 0.1 | JA |
| Wikimedia Commons Medien | div. frei (CC-BY, CC-BY-SA, PD) | JA (je nach Einzel-Lizenz) | Phase 0.2.M | JA (Bild-Nutzung) |
| **bpb.de Autorentext (Kruse etc.)** | **CC BY-NC-ND 4.0** | **NEIN** | **AUSGESCHLOSSEN aus Pipeline** | **NEIN** |
| **bpb.de kuratierte Commons-Medien** | Commons (eigen) | JA | Phase 0.2.M + bpb-Tag | JA |
| **bpb.de zitierte Primaerquellen (PD)** | PD (nach Pruefung) | JA | Phase 0.2.Z → 0.1 | JA |
| **bpb.de Dossier-Gliederung** | Idee, urheberrechtsfrei | N/A | Phase 0.1 Handschritt | N/A |

---

## §8 — Konsequenzen fuer UPGRADE_PLAN v3.12 / STATUS.md

### 8.1 — Neue Plan-Impact-Punkte (Vorschlag)
**Punkt 10 (NEU):** Phase 0.2.Z "Zitat-Baustein-Kuratierung" als parallele Sub-Phase zu 0.2.M einziehen, optional (nur aktiv wenn Quell-Kanal "bpb" fuer ein Game gewaehlt wird).

**Punkt 11 (NEU):** Wiki-Scope-Katalog §8 um drei bislang fehlende Themenbereiche pruefen:
- Kriegsoekonomie / Rohstoffkrise (ggf. Artikel `Steckrübenwinter` + `Kriegswirtschaft_im_Ersten_Weltkrieg`)
- Frauen-Heimatfront / Gender (ggf. `Frauen_im_Ersten_Weltkrieg`)
- Kriegskunst/Kulturkrise (ggf. `Expressionismus_und_Erster_Weltkrieg` / `Dada` — nur wenn Lehrplanbezug)

Keine automatische Aufnahme — lehrplanabhaengige Entscheidung pro Escape-Game-Auftrag.

**Punkt 12 (NEU):** Subagenten-Kontrakt-Invariante fuer alle Nicht-Wikipedia-Quellen: **Lizenz-Pre-Check PFLICHT vor Ingest.** Quellen mit ND-Klausel duerfen nicht in die Volltext-Ingest-Pipeline, sondern nur in die Zitat-Pipeline.

### 8.2 — Kein Eingriff in R0-FINAL / R1-Start
Dieses Befund aendert den R0-FINAL-Zustand (Wiki-Scope-Katalog §8, wikipedia-mcp-Config) NICHT. Der R1-Start (v3.11.1 Bugfix-Bundle) ist weiterhin unverstellt. bpb ist ein **optionaler Quell-Kanal fuer spaetere Game-Auftraege** und verzoegert R1 nicht.

---

## §9 — Gate-Status

| Gate | Status | Begruendung |
|---|---|---|
| G-bpb.1 "standardisierter Abruf moeglich?" | PASS | markdownify + WebFetch funktionieren, kein Dedi-Connector noetig |
| G-bpb.2 "Volltext extrahierbar?" | PASS | 62KB Markdown, sauber |
| G-bpb.3 "Medien extrahierbar?" | PARTIAL | markdownify defekt bei JS-Lazy-Load-Bildern; Commons-Kanal deckt die meisten Medien redundant ab |
| G-bpb.4 "Lizenz-Vertraeglichkeit Volltext-Pipeline?" | **FAIL** | CC BY-NC-ND verbietet Derivatwerke, inkompatibel mit LLM-Umarbeitung |
| G-bpb.5 "Lizenz-Vertraeglichkeit Zitat-Pipeline?" | PASS | Wortgetreue Zitate durch §51 UrhG und Lizenz-Wortlaut gedeckt |
| G-bpb.6 "Plan-Impact fuer R1 blockierend?" | PASS (nicht blockierend) | bpb ist optionaler Zusatz-Kanal, R1 bleibt unveraendert |

---

## §10 — Quellen

- Dossier-Root Erster Weltkrieg: https://www.bpb.de/themen/erster-weltkrieg-weimar/ersterweltkrieg/
- Getesteter Unterartikel: https://www.bpb.de/themen/erster-weltkrieg-weimar/ersterweltkrieg/155302/ausloesung-und-beginn-des-krieges/
- Lizenz-Referenz: https://creativecommons.org/licenses/by-nc-nd/4.0/deed.de
- CC-BY-NC-ND 4.0 Deed (Rechtsfolgen): https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode.de
- UrhG §51 Zitatrecht: https://www.gesetze-im-internet.de/urhg/__51.html
- Voriges Befund R0.5: `docs/befunde/TESTRUN_MEDIEN_EXTRAKTION_M4_2026-04-11.md`
- Voriger Katalog §8: `docs/befunde/WIKI_SCOPE_KATALOG_v3-12_PILOT_2026-04-11.md`

---

## §11 — Zusammenfassung fuer STATUS.md

**R0.7 PASS mit Einschraenkung.** bpb.de ist standardisiert abrufbar (markdownify + WebFetch), aber rechtlich auf Zitat-Modus limitiert (CC BY-NC-ND). bpb wird NICHT als Volltext-Ingest-Kanal parallel zu Wikipedia integriert, sondern als optionale Phase 0.2.Z "Zitat-Baustein-Kuratierung". Drei Wiki-Scope-Luecken entdeckt (Kriegsoekonomie, Frauen-Heimatfront, Kulturkrise) zur lehrplanabhaengigen Pruefung. R1-Start nicht blockiert.

---

## §12 — Erweiterte Nutzungs-Muster (Nachtrag Session 29)

Ausgangspunkt: PM-Feedback, dass bpb-Volltext fuer SuS ohnehin zu komplex ist, Paraphrase also didaktisch noetig waere — aber durch ND verboten. Alternative Nutzungs-Muster identifiziert, die die Lizenz-Beschraenkung umgehen oder umgehbar machen:

### 12.1 — Muster A: Dossier-Struktur als Qualifizierungsraster (frei, unproblematisch)

**Rechtslage:** Gliederungsideen sind urheberrechtlich NICHT geschuetzt (§2 UrhG schuetzt Ausdrucksform, nicht die zugrundeliegende Idee). Kapitel-Reihenfolge, Themen-Auswahl, thematische Schwerpunkte sind frei uebernehmbar.

**Einsatz:**
- PM-Handschritt in Phase 0.1: Nach eigener Mappen-Strukturierung die bpb-Dossier-Gliederung als Vergleichsraster nutzen. Fragen: "Welche bpb-Kapitel decken wir ab? Welche ignorieren wir? Warum?". Ergebnis: expliziter Struktur-Entscheid mit Begruendung im Mappen-Plan.
- NEUES Q-Gate **Q-STRUKTUR-bpb-Coverage** (Runde 4 oder Phase 0.1-Schaerfung): fuer jeden bpb-Kapitel-Titel eine Mappen-Zuordnung oder eine explizite Ausschluss-Begruendung. Keine stille Luecken.
- Sub-Agent-Input: bpb-Dossier-Gliederung als strukturierter Katalog-Input (nur Titel + URL, kein Volltext), hilft bei Scope-Abgrenzung in Phase 0.1.

**Lizenz-Status:** gruen. Keine Attribution noetig fuer reine Struktur-Uebernahme, hoeflichkeitshalber aber Erwaehnung "bpb-Dossier als Strukturreferenz herangezogen" im Mappen-Plan.

### 12.2 — Muster B: Medien-Kuratierung als Qualitaets-Stempel (hybrid)

**Rechtslage:** bpb-Bildunterschriften sind CC BY-NC-ND, aber typischerweise 1-3 Saetze — wortgetreue Uebernahme als Kurzzitat erlaubt (§51 UrhG + Lizenz). Die **Tatsache**, dass bpb ein bestimmtes Commons-Bild didaktisch ausgewaehlt hat, ist reine Information ohne Urheberschutz.

**Einsatz:**
- medien_katalog_game.json Schema-Erweiterung:
  ```
  "bpb_verifiziert": true,
  "bpb_discovery_url": "https://www.bpb.de/...",
  "bpb_bildunterschrift_zitat": "Mobilmachung 1914: Deutscher Truppentransport. (Bundesarchiv, Bild 146-1994-022-19A)",
  "bpb_didaktische_einordnung": "zeigt Kriegs-Einstimmung der Bevoelkerung"
  ```
- Sub-Agent 0.2.M (Medien-Extraktor) liest bpb-Artikel-Medien parallel zu Commons-Suche, markiert gefundene Medien als `bpb_verifiziert: true` wenn Commons-Datei und bpb-Bild identifizierbar dieselbe sind (Match ueber Bundesarchiv-ID, Bildname, perceptual hash optional).
- Funktionale Klassifikation (analytisch/atmospherisch/etc.) aus R0.4 bekommt zusaetzliche Signalquelle aus bpb-Bildunterschriften.

**Lizenz-Status:** gruen fuer Commons-Assets (laufen ueber Commons-Lizenz weiter), gelb fuer wortgetreue bpb-Bildunterschrift-Uebernahme (mit Attribution), rot fuer bpb-eigene Grafiken ausser als unveraenderte Einbettung.

**Didaktischer Hebel:** bpb-Qualitaetsstempel reduziert Sichter-Workload in Runde 5 (Medien-Diversitaet), weil bpb-markierte Medien bereits didaktisch vorqualifiziert sind.

### 12.3 — Muster C: Primaerquellen-Extraktion (der eigentliche Hebel)

**Rechtliches Kernprinzip:** bpb's CC BY-NC-ND schuetzt nur den **Autoren-Text des bpb-Artikels** (Kruse's Kommentar, Einordnung, Analyse). Primaerquellen, die der bpb-Artikel zitiert (Kaiser-Rede, Tagebuch, Kriegserklaerung, Gedicht, Karikatur) haben ihr **eigenes** Urheberrecht, das am Original-Autor haengt. Wenn die Primaerquelle gemeinfrei ist, ist sie frei verwendbar — unabhaengig von bpb.

**PD-Pruefung pro Quellentyp (relevant fuer Scope Erster Weltkrieg 1914-1918):**

| Quellentyp | Schutzregel | Status fuer WWI-Scope |
|---|---|---|
| Amtliche Werke (§5 UrhG): Gesetze, Verordnungen, Kaiser-Erlasse, amtliche Bekanntmachungen, Kriegserklaerungen | zeitlos gemeinfrei | **alle PD** (z.B. Blankoscheck-Telegramm, Ultimatum an Serbien im Wortlaut, "Ich kenne keine Parteien mehr"-Thronrede als amtliche Reichstags-Rede moeglich-PD) |
| Reden von Politikern, Monarchen, Militaers | 70J nach Tod des Sprechers (§64 UrhG) | Wilhelm II. (†1941) PD seit 2012; Bethmann Hollweg (†1921) PD seit 1992; Tirpitz (†1930) PD seit 2001; Moltke d.J. (†1916) PD seit 1987; Falkenhayn (†1922) PD seit 1993; Ludendorff (†1937) PD seit 2008; Hindenburg (†1934) PD seit 2005; Clemenceau (†1929) PD seit 2000; Lloyd George (†1945) PD seit 2016. **ALLE zentralen Akteure PD.** |
| Soldaten-Tagebuecher, Feldpost-Briefe | 70J nach Tod des Verfassers | case-by-case. Gefallene Soldaten (Tod 1914-1918) PD seit spaetestens 1989. **Ueberlebende mit spaetem Todesjahr problematisch**: Ernst Juenger (†1998, PD erst 2069), Remarque (†1970, PD erst 2041). Wenn Name/Todesjahr unklar → NICHT verwenden. |
| Lichtbilder/Fotos 1914-1918 | §72 UrhG einfaches Lichtbild 50J nach Erstveroeffentlichung; Lichtbildwerk 70J nach Tod | typisch PD, insbesondere Presse-Fotos und Bundesarchiv-Bestaende. Bereits durch Commons-Kanal redundant abgedeckt. |
| Gedichte / Literatur | 70J nach Tod | Stadler (†1914) PD seit 1985; Heym (†1912) PD seit 1983; Trakl (†1914) PD seit 1985; Rilke (†1926) PD seit 1997. **Frueh-Expressionisten WWI-Scope alle PD.** |
| Karikaturen / Kunst | 70J nach Tod des Kuenstlers | Simplicissimus-Karikaturen 1914-18 typisch PD (Kuenstler aus der Zeit mit Tod vor 1956). |

**bpb-Editions-Schutz:** Die Transkription einer Primaerquelle durch bpb ist NUR geschuetzt, wenn eigenschoepferische Editions-Leistung vorliegt (Kollationierung mehrerer Ueberlieferungen, kritischer Apparat, Uebersetzung). Bei blo"szer Wortlaut-Wiedergabe einer bekannten Rede → keine Schoepfungshoehe → bpb hat kein eigenes Recht auf diese Transkription. Fuer WWI-Reden, Kriegserklaerungen, bekannte Feldpostbriefe: **bpb-Wiedergabe ist praktisch nie editions-schutzwuerdig**.

**Operative Regel:** bpb als **Discovery-Signal** nutzen, Primaerquelle aber immer aus **originaler Primaer-Quelle** (Wikisource, Bundesarchiv-Digitalisat, Deutsches Textarchiv, Europeana, Reichstag-Stenographische-Berichte digital) zitieren. Dies eliminiert jede bpb-Schutz-Frage. bpb liefert nur den Hinweis "diese Rede ist didaktisch relevant" + die didaktische Einordnung (letztere NICHT uebernehmen, nur inspirierend nutzen).

**Pipeline-Konsequenz (das architektonisch Entscheidende):**
Primaerquellen-Texte sind nach PD-Verifikation **im vollen Wikipedia-artigen Volltext-Ingest-Modus verwendbar**. Das bedeutet:
- Phase 0.1 darf Primaerquelle als Volltext-Input an Sub-Agenten weitergeben.
- Sub-Agent darf paraphrasieren, kuerzen, lernerorientiert umformulieren.
- Schueler-sprachliche Vereinfachung erlaubt.
- Keine ND-Restriktion.

Damit wird bpb paradoxerweise zu einem **staerkeren** Quell-Kanal als nur Zitat-Baustein-Lieferant: bpb ist in dieser Rolle ein **Discovery-Mechanismus fuer gemeinfreie, didaktisch bereits vorqualifizierte Primaerquellen**, deren Text unbeschraenkt verarbeitet werden kann.

### 12.4 — Phase 0.2.Z Sub-Agent-Spezifikation

Phase 0.2.Z enthaelt **genau einen** Sub-Agent. Der urspruenglich in §7.2 entworfene `bpb_zitat_kurator` (bpb-Autorentext-Zitate) wurde nach PM-Entscheidung Session 29 vollstaendig gestrichen (Lizenzrisiko). Uebrig bleibt:

**Name:** `bpb_primaerquellen_extraktor`
**Input:** Liste von bpb-URLs (Dossier-Unterartikel), thematischer Fokus.
**Aufgabe:**
1. `markdownify` auf bpb-Artikel → Volltext.
2. Regex/Heuristik auf zitierte Primaerquellen (Anfuehrungszeichen, Einrueckungs-Muster, Zitat-Intros wie "Wilhelm II. erklaerte...", "Der Ultimatumstext lautete...", "Im Tagebuch von X heisst es").
3. Jede erkannte Primaerquelle: Autor + Datum extrahieren.
4. **PD-Pruefung per Autor-Wikipedia-Lookup** (`mcp__wikipedia__get_summary` → Todesjahr) und Regel: `todesjahr + 70 < aktuelles_jahr`. Amtliche Werke: immer PD.
5. **Original-Quelle suchen** in Wikisource, Deutsches Textarchiv, Bundesarchiv via WebSearch.
6. Output `primaerquellen_katalog_game.json`.

**Output-Schema:**
```
{
  "id": "PQ001",
  "typ": "rede | thronrede | erlass | kriegserklaerung | ultimatum | tagebuch | feldpost | gedicht | karikatur | amtliche_bekanntmachung",
  "sprecher_autor": "Wilhelm II.",
  "autor_todesjahr": 1941,
  "pd_status": "PD",
  "pd_grundlage": "§64 UrhG 70J nach Tod (Wilhelm II. †1941, PD seit 2012-01-01)",
  "entstehungsdatum": "1914-08-04",
  "titel": "Thronrede vor dem Reichstag",
  "volltext_wortgetreu": "...",
  "discovery_quelle_bpb": "https://www.bpb.de/.../155302/...",
  "bpb_didaktische_einordnung_notiz": "Kruse ordnet die Rede als Auftakt des 'Burgfriedens' ein",
  "original_archiv_url": "https://de.wikisource.org/wiki/Thronrede_Wilhelms_II._am_4._August_1914",
  "original_archiv_lizenz": "PD",
  "einsatz_pipeline": "Phase 0.1 Volltext-Ingest erlaubt (PD)",
  "ingest_erlaubnis": {
    "paraphrase": true,
    "kuerzung": true,
    "lernerorientierte_umformulierung": true,
    "uebersetzung": true
  }
}
```

**Invarianten:**
- PQI1 PD-Pruefung PFLICHT vor Aufnahme. Kein Auto-Bypass.
- PQI2 PFLICHT Original-Archiv-URL. bpb ist nur Discovery-Quelle, Zitat erfolgt aus Original.
- PQI3 PFLICHT bpb-didaktische-Einordnung als Notiz (nicht als zitierfaehiger Text) dokumentieren, da sie nicht urheberrechtlich verwertbar ist.
- PQI4 Bei PD-Unsicherheit oder fehlendem Todesjahr → **nicht aufnehmen** (konservativer Abbruch statt Heuristik).
- PQI5 Amtliche Werke (§5 UrhG) werden ohne Todesjahr-Check als PD markiert (pd_grundlage: "§5 UrhG").
- PQI6 Original-Archiv-URL wird nach Fundort priorisiert: Wikisource > Deutsches Textarchiv > Bundesarchiv-Digitalisat > Europeana > nur bpb. Nur-bpb-Fund = Warnung, manueller Review-Schritt.

### 12.5 — Konsolidierte Quell-Kanal-Matrix (nach Streichung Modus A)

| Kanal | Quelle | Lizenz | Phase | Volltext-Ingest | Paraphrase erlaubt | Typische Nutzung |
|---|---|---|---|---|---|---|
| 1 | Wikipedia Kern-Artikel | CC-BY-SA 4.0 | 0.1 | JA | JA | Fach-Grundlage, Faktenbasis |
| 2 | Wikimedia Commons Medien | div. frei | 0.2.M | JA (Bild) | JA (Bild-Nutzung) | Bilder, Karten, Grafiken |
| ~~3a~~ | ~~bpb Autoren-Text (Zitat)~~ | ~~CC BY-NC-ND~~ | **GESTRICHEN** | — | — | — |
| 3b | bpb-kuratierte Commons-Medien | Commons-Lizenz | 0.2.M + bpb-Tag | JA | JA | Didaktisch vorqualifizierte Bilder |
| 3c | bpb-entdeckte Primaerquellen | PD (nach Pruefung) | 0.2.Z → 0.1 | JA | JA | Reden, Erlasse, Tagebuecher, Gedichte als Volltext-Ingest |
| 3d | Dossier-Strukturreferenz | frei (Idee, nicht Ausdruck) | 0.1-Handschritt | (N/A) | (N/A) | Q-Gate-Coverage-Check |

Die drei Sub-Kanaele 3b-3d sind operativ getrennt, aber alle ueber denselben Discovery-Mechanismus (§14) adressierbar. Der Unterschied liegt im Extraktions-Filter und im nachfolgenden Rechtsstatus. bpb-Autorentext verlaesst die Pipeline nicht mehr, ausser als interne Heuristik fuer den Primaerquellen-Extraktor (Regex-Kontext, nicht Ausgabe).

### 12.6 — Didaktischer Hebel gegenueber "ohnehin zu komplex fuer SuS"

Das urspruengliche PM-Argument war: bpb-Texte sind sprachlich zu komplex fuer Mittelstufen-SuS, ND verbietet Vereinfachung, also bpb sinnlos. R0.7-Erweiterung kehrt das um, und die Modus-A-Streichung schaerft die Argumentation:
- **Muster A (Struktur)**: nutzt bpb-Denkleistung ohne Text-Verwendung.
- **Muster B (Medien-Kuratierung)**: nutzt bpb-Didaktik-Vorarbeit am Bild-Scope, ohne Autorentext zu verwenden.
- **Muster C (Primaerquellen)**: nutzt bpb als Such-Maschine fuer gemeinfreie Originaltexte, die dann unter PD-Regeln von der normalen Sub-Agent-Pipeline schueler-sprachlich umgeschrieben werden duerfen.

Damit wird der eigentliche Wert eines bpb-Dossiers in der Escape-Game-Pipeline **nicht der Autorentext** (der wird in keinerlei Form uebernommen), sondern die darunterliegenden didaktisch kuratierten Commons-Medien und Primaerquellen-Verweise, plus die Gliederungs-Struktur als Q-Gate-Raster. bpb wird zu **Discovery-Infrastruktur**, nicht zu einer Sekundaerquelle.

---

## §13 — Konsolidierte Plan-Impact-Punkte (ersetzt §8.1, nach Modus-A-Streichung)

- **Punkt 10 (REFAKTORIERT)**: Phase 0.2.Z enthaelt **genau einen** Sub-Agent: `bpb_primaerquellen_extraktor` (Modus C). Kein bpb-Autorentext-Zitat-Kurator. Kein Artefakt `zitat_katalog_game.json`. Phase-0.2.Z-Zweck ist ausschliesslich PD-Primaerquellen-Extraktion aus bpb-Discovery.
- **Punkt 11**: Wiki-Scope-Katalog-Luecken-Pruefung (Kriegsoekonomie, Frauen-Heimatfront, Kulturkrise).
- **Punkt 12**: Sub-Agenten-Invariante "Lizenz-Pre-Check" fuer alle Nicht-Wikipedia-Quellen. Bei CC-BY-NC-ND-Quellen darf der Sub-Agent den Autorentext nur als **interne Regex-Kontextsuche** verwenden, nicht als Ausgabe.
- **Punkt 13**: medien_katalog_game.json Schema-Erweiterung um Felder `bpb_verifiziert`, `bpb_discovery_url`, `bpb_didaktische_einordnung` (NICHT mehr `bpb_bildunterschrift_zitat` — auch Bildunterschriften werden nach Modus-A-Streichung nicht mehr uebernommen). bpb-Kontext wird als interne Qualitaetsreferenz gespeichert, nicht als dargestellter Text.
- **Punkt 14**: Neues Artefakt `primaerquellen_katalog_game.json` mit Schema aus §12.4.
- **Punkt 15**: Q-Gate "Q-STRUKTUR-bpb-Coverage" (Runde 4 oder Phase 0.1).
- **Punkt 16**: PD-Pruef-Workflow `bpb_primaerquellen_extraktor`: Invarianten PQI1-PQI6, Autor-Todesjahr via `mcp__wikipedia__get_summary`, amtliche Werke per §5 UrhG-Regel auto-PD. Bei Unsicherheit konservativer Abbruch.
- **Punkt 17 (NEU)**: bpb-Discovery-Mechanismus mit dreistufigem Hybrid-Modell (§14). Statische Registry + Discovery-Sub-Agent + User-Bestaetigungsschritt. Pflicht-User-Bestaetigung vor jedem Phase-0.2.Z-Start.

---

## §14 — bpb-Discovery-Mechanismus (Spezifikation)

**Problem:** Wie weiss die Pipeline, welche bpb-Dossiers fuer ein gegebenes Game-Thema relevant sind? Reine User-Abfrage ueberlastet den Lehrer, reine Auto-Suche produziert false-positives.

**Loesung:** Dreistufiges Hybrid-Modell mit Pflicht-User-Bestaetigung als Sicherheitsanker.

### 14.1 — Stufe 1: Statische Registry `bpb_dossier_registry.json`

**Ort:** `escape-game-generator/data/bpb_dossier_registry.json` (Generator-Repo, nicht weitergehts-online/)
**Pflege:** PM-Handarbeit, einmaliger Aufbau + gelegentliche Updates
**Umfang Initial:** 10-20 Dossiers fuer die GPG-Lehrplan-Schwerpunkte Mittelschule 7-10 (Erster Weltkrieg, Weimarer Republik, NS-Zeit, 2. Weltkrieg, Kalter Krieg, Mauerbau/Wiedervereinigung, EU, Menschenrechte, Demokratie-Grundlagen, Migration, Klima).
**Schema:**
```
{
  "registry_version": "1.0",
  "last_updated": "2026-04-11",
  "entries": [
    {
      "id": "bpb-dossier-erster-weltkrieg",
      "titel": "Der Erste Weltkrieg",
      "url_root": "https://www.bpb.de/themen/erster-weltkrieg-weimar/ersterweltkrieg/",
      "thema_tags": ["erster-weltkrieg", "wk1", "1914", "julikrise", "kaiserreich-ende"],
      "lehrplan_bezug_gpg": ["M7_L5", "R9_G3"],
      "autor_primaer": "Wolfgang Kruse",
      "unterartikel_anzahl": 13,
      "qualitaet_pm_note": "Fachautor WBG-Standard, dichte Primaerquellenzitate",
      "zuletzt_pm_geprueft": "2026-04-11"
    }
  ]
}
```

**Verantwortung:** PM pflegt und erweitert. Jede neue Generierung eines Games zu einem Thema, fuer das noch kein Registry-Eintrag existiert, triggert einen manuellen Registry-Pflege-Schritt (alternativ Stufe 2).

### 14.2 — Stufe 2: Discovery-Sub-Agent `bpb_discovery_agent`

**Phase:** Phase 0.0 (vor Phase 0.1 Kern-Artikel-Ingest), optional aktivierbar per Game-Metadaten-Flag `nutze_bpb_quelle: true`.

**Input:**
- `thema_lehrplan`: Klartext-Thema des Games (z.B. "Erster Weltkrieg — Ursachen und Ausbruch")
- `tag_set`: aus Game-Metadaten, z.B. ["erster-weltkrieg", "julikrise", "kaiserreich"]
- `lehrplan_code`: z.B. "M7_L5" (optional)

**Workflow:**
1. **Registry-Lookup (primaer):** Match gegen `thema_tags` und `lehrplan_bezug_gpg` in Registry. Bei Treffer: Kandidat mit `quelle: "registry"`, `relevanz_score: 1.0`.
2. **WebSearch-Fallback (sekundaer, nur bei Registry-Miss oder unvollstaendigem Treffer):** Query `site:bpb.de dossier [thema_lehrplan]`. Heuristik auf URL-Pattern `/themen/[bereich]/[dossier-slug]/` oder `/shop/zeitschriften/[izpb|apuz]/[dossier-slug]/`. Ausschluss: Shop-Produkt-Seiten ohne Volltext, Video-Only-Seiten.
3. **Kandidaten-Scoring:** Titel-Keyword-Match + URL-Pattern-Match + PM-gepflegte Quality-Note (wenn aus Registry). Score 0.0-1.0.
4. **Ausgabe:** sortierte Kandidaten-Liste, top 3-5.

**Output-Schema:**
```
{
  "game_id": "gpg-erster-weltkrieg-ursachen",
  "thema_lehrplan": "Erster Weltkrieg — Ursachen und Ausbruch",
  "kandidaten": [
    {
      "id": "bpb-dossier-erster-weltkrieg",
      "titel": "Der Erste Weltkrieg",
      "url_root": "https://www.bpb.de/themen/erster-weltkrieg-weimar/ersterweltkrieg/",
      "summary_1_satz": "13-teiliges Fach-Dossier zum WK1 von Wolfgang Kruse (Univ. Hagen), CC BY-NC-ND, enthaelt zentrale Primaerquellen (Thronrede, Blankoscheck, Schlieffen-Plan).",
      "quelle": "registry",
      "relevanz_score": 1.0,
      "pm_geprueft": true,
      "unterartikel_relevant": [
        "/155302/ausloesung-und-beginn-des-krieges/",
        "/155304/kriegsverlauf-und-aussenpolitik/"
      ]
    }
  ]
}
```

**Tools:** Registry-Datei-Lookup + WebSearch. Kein markdownify, kein WebFetch in Stufe 2 (Inhalt wird erst in Stufe 4 geladen). Stufe 2 ist bewusst leichtgewichtig.

### 14.3 — Stufe 3: User-Bestaetigung (PFLICHT-Gate)

**Prinzip:** Kein Auto-Ingest. Der Lehrer sieht die Kandidaten, markiert was er verwenden will, und bestaetigt. Das ist der Qualitaets-Sicherheitsanker.

**Darstellung (PM-Prompt-Format fuer Claude-Code-Uebergabe):**
```
bpb-Discovery fuer Game "[thema]" hat folgende Kandidaten gefunden:

1. [titel]
   URL: [url_root]
   [summary_1_satz]
   Quelle: [registry|websearch]  Relevanz: [score]
   Empfohlene Unterartikel fuer diesen Game-Scope:
     a) [unterartikel_relevant_1]
     b) [unterartikel_relevant_2]

   [ ] Diesen Dossier verwenden?   [ja/nein]
   [ ] Welche Unterartikel?         [alle/keine/a,b,...]

2. [naechster Kandidat]
...

Bitte bestaetigen und fortfahren.
```

**User-Entscheidungen sind persistent:** werden in `docs/agents/artefakte/[game-id]/bpb_discovery_bestaetigung.json` abgelegt mit Zeitstempel. Bei spaeterer Re-Generierung wird die Bestaetigung wiederverwendet (ausser explizit invalidiert).

**Fallback bei "nein" fuer alle Kandidaten:** Phase 0.2.Z wird uebersprungen, Game laeuft wie bisher ueber Wikipedia-Pipeline allein. bpb ist und bleibt optional.

### 14.4 — Stufe 4: `bpb_primaerquellen_extraktor` auf bestaetigten URLs

Der in §12.4 spezifizierte Sub-Agent erhaelt als Input ausschliesslich die vom User in Stufe 3 bestaetigten Unterartikel-URLs. Er arbeitet auf jedem Unterartikel den vollen PD-Pruef-Workflow ab (markdownify → Regex auf Primaerquellen-Zitate → Autor-Todesjahr-Lookup → Original-Archiv-Suche → primaerquellen_katalog_game.json).

**Parallel dazu:** der Medien-Kuratierungs-Hook (§12.2 Muster B) in Sub-Agent 0.2.M wird aktiviert. 0.2.M liest die bestaetigten bpb-Unterartikel, inventarisiert Medien, matcht gegen Commons-Funde, markiert Treffer als `bpb_verifiziert: true`.

### 14.5 — Diagramm Discovery-Flow

```
Game-Metadaten (thema_lehrplan, tag_set, nutze_bpb_quelle)
        │
        ▼
┌────────────────────────┐
│ Stufe 1: Registry      │◄──── bpb_dossier_registry.json (PM-gepflegt)
│ Lookup nach Tag/Lehrpl.│
└────────────────────────┘
        │
        ▼ (Treffer/Miss)
┌────────────────────────┐
│ Stufe 2: Fallback      │◄──── WebSearch site:bpb.de
│ Nur bei Miss           │
└────────────────────────┘
        │
        ▼
   Kandidaten-Liste
        │
        ▼
┌────────────────────────┐
│ Stufe 3: User-Bestaet. │◄──── Lehrer markiert verwenden/nicht
│ PFLICHT-Gate           │      bpb_discovery_bestaetigung.json
└────────────────────────┘
        │
        ▼ (nur bestaetigte URLs)
┌────────────────────────┐
│ Stufe 4: Ingest        │
│ - bpb_primaerquellen_  │
│   extraktor            │
│ - 0.2.M Medien-bpb-Tag │
└────────────────────────┘
        │
        ▼
   primaerquellen_katalog_game.json
   medien_katalog_game.json (mit bpb_verifiziert=true)
```

### 14.6 — Registry-Initial-Befuellung als separater PM-Task

Der Aufbau der ersten Registry-Version ist ein **eigenstaendiger PM-Task**, nicht Teil dieses R0.7-Befunds. Vorschlag: Nach R1 (v3.11.1 Bugfix-Bundle) abgeschlossen, in Runde 2 als Arbeitspaket 2b "bpb-Registry Initial-Aufbau" einziehen. Scope: 10-20 Dossiers fuer die tatsaechlich geplanten Games 2026-2027 (Erster Weltkrieg, Weimar, NS-Zeit als Priositaet 1; Kalter Krieg, EU, Demokratie als Prioritaet 2).

### 14.7 — Warum nicht reine User-Abfrage

- Lehrer-Workload: URL-Recherche fuer jedes Game ist keine PM-skalierbare Praxis.
- Registry ist einmal-gepflegt, dann stabil. 10 Dossiers decken 80 % der Lehrplan-Themen.
- Stufe-3-Bestaetigung garantiert, dass der Lehrer trotzdem die Kontrolle hat.

### 14.8 — Warum nicht rein automatisch

- WebSearch-Treffer sind nicht didaktisch qualifiziert. Ein bpb-APuZ-Fachbeitrag fuer Oberstufen-Politik-LK ist URL-relevant, aber fuer Mittelstufen-GPG-Game niveau-ungeeignet.
- Der Lehrer hat Lehrplan- und Lerngruppen-Wissen, das der Agent nicht hat.
- Ein falsch ingestierter bpb-Dossier-Inhalt verschwendet Pipeline-Zeit (PD-Pruefung, Original-Archiv-Suche, Katalog-Bau) — die Kosten eines false-positive sind hoch genug, um Stufe 3 zu rechtfertigen.

