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

## §7 — Integrationsvorschlag: Phase 0.2.Z Zitat-Baustein-Kuratierung

### 7.1 — Architektur-Einordnung
| Quell-Kanal | Lizenz-Basis | Bearbeitungs-Erlaubnis | Ingest-Phase | Volltext-fuer-Sub-Agent |
|---|---|---|---|---|
| Wikipedia Kern-Artikel | CC-BY-SA 4.0 | JA (Share-Alike) | Phase 0.1 | JA |
| Wikimedia Commons Medien | div. frei (CC-BY, CC-BY-SA, PD) | JA (je nach Einzel-Lizenz) | Phase 0.2.M | JA (Bild-Nutzung) |
| **bpb.de (NEU)** | **CC BY-NC-ND 4.0** | **NEIN** | **Phase 0.2.Z (NEU)** | **NEIN — nur Zitat-Modus** |

### 7.2 — Phase 0.2.Z Sub-Agent-Kontrakt (Entwurf)
**Name:** `bpb_zitat_kurator`
**Input:** Liste von bpb-URLs (Dossier-Unterartikel), thematischer Fokus, max. Zitat-Anzahl pro Unterartikel.
**Output:** `zitat_katalog_game.json` mit Eintraegen:
```
{
  "id": "Z001",
  "quelle_url": "https://www.bpb.de/themen/erster-weltkrieg-weimar/ersterweltkrieg/155302/ausloesung-und-beginn-des-krieges/",
  "autor": "Wolfgang Kruse",
  "veroeffentlicht": "2013-02-18",
  "letzte_aenderung": "2026-02-26",
  "lizenz": "CC-BY-NC-ND-4.0",
  "lizenz_url": "https://creativecommons.org/licenses/by-nc-nd/4.0/deed.de",
  "zitat_wortgetreu": "...1-3 Saetze wortgetreu...",
  "wortanzahl": 42,
  "kontext_kapitel": "Julikrise 1914",
  "empfohlener_puzzle_typ": "quellenanalyse | textverstaendnis | historiker_zitat",
  "attribution_block": "Kruse, Wolfgang: Ausloesung und Beginn des Krieges, bpb.de 2013/2026, CC BY-NC-ND 4.0."
}
```
**Invarianten:**
- I1 PFLICHT wortgetreue Uebernahme, keine Paraphrase.
- I2 PFLICHT Zitat-Laenge 1-5 Saetze, max. 1 Absatz. Groessere Uebernahmen nur bei juristisch klarer Zitatzweck-Begruendung.
- I3 PFLICHT `attribution_block` vollstaendig, inkl. Lizenz und Lizenz-URL.
- I4 VERBOT automatische LLM-Neuformulierung des Zitats.
- I5 Dual-Kanal: markdownify fuer Volltext-Scan, WebFetch fuer Kontext/Gliederung.
- I6 Pre-Ingest-URL-Validierung analog zu R0.6 Wikipedia-Titel-Validierung: 404/Redirect/Formatfehler vor Zitat-Extraktion erkennen.

**Tool-Anforderungen:** markdownify `webpage-to-markdown` + WebFetch. Beide bereits verfuegbar, keine neue MCP-Installation noetig.

### 7.3 — Game-Einsatz-Muster
- **Station "Quellenanalyse":** Spieler liest bpb-Zitat (Kruse ueber Julikrise-Eskalation), beantwortet Fragen zur Argumentationsstruktur. Zitat im Footer mit Attribution sichtbar.
- **Station "Historiker-Vergleich":** Zwei bpb-Zitate aus unterschiedlichen Unterartikeln gegenueberstellen. Spieler identifiziert Perspektiv-Unterschiede.
- **Station "Fakten-Check":** Spieler hat eine Schueler-Behauptung. Soll sie durch ein bpb-Kurzzitat bestaetigen oder widerlegen.
- NICHT-Einsatz: "bpb-Text in Schuelersprache umformuliert" — verbotene Derivat-Bildung.

### 7.4 — Scope-Schaetzung
Dossier Erster Weltkrieg: 13 Fach-Unterartikel, angenommen je 2-4 kuratierte Zitate pro Artikel → 30-50 Zitate pro Dossier. Arbeitsaufwand fuer Sub-Agent unter 1h bei klarer Kapitel-Einordnung.

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
