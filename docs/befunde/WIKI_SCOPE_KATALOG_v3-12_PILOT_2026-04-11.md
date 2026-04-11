# R0.4 — Wikipedia-Artikel-Scope-Katalog fuer v3.12-Pilotlauf

**Datum:** 2026-04-11
**Arbeitspaket:** UPGRADE_PLAN_v3-12 §2 Runde 0 Arbeitspaket 4
**Pilot-Game:** Neu-Regeneration `gpg-erster-weltkrieg-ursachen` (gemaess §15.1 F11 nach R8-Abschluss)
**Zweck:** Referenz-Datenpunkt fuer die Phase-0.2.M-Implementierung in Runde 2. Konkret benennbare Kern-Artikel und erweiterten Medien-Scope liefern der Phase-0.2.M-Umsetzung ein Test-Input-Set, gegen das sich die Sub-Agent-Kontrakte validieren lassen.

**Scope-Architektur (gemaess UPGRADE_PLAN §4 Runde 2 Arbeitspaket 2):**
- **Kern-Artikel-Liste:** Wikipedia-Artikel, deren Volltext in Phase 0.2 INHALT gelesen wird und Sachanalyse + Skript-Grundierung speist.
- **Erweiterter Medien-Scope:** Wikipedia-Artikel, die nur fuer Medien-Extraktion durchsucht werden. Textinhalt wird explizit **nicht** in Inhaltsartefakt oder Skript uebernommen (Token-Effizienz).

**Dual-Scope-Regel (§15.1 F18 Default):** Pro Mappe maximal 5 Medien aus erweitertem Scope. Pro Game maximal 10 Artikel im erweiterten Scope (Wikilinks-Tiefe 1 vom Kern-Artikel aus). Der Katalog unterschreitet diese Grenzen, weil er der erste Pilot ist und konservative Startwerte setzt.

---

## 1. Game-uebersicht

**Game:** Der Erste Weltkrieg — Ursachen und Ausbruch
**Zielgruppe:** R7 GPG
**Mappen:** 4
**Didaktisches Ziel (aus v3.11 DIDAKTIK_RAHMEN uebernommen, in Runde 2 zu reverifizieren):** SuS rekonstruieren die Kausalkette von der Lager-Bildung Europas ueber das Attentat von Sarajevo und die Kriegsbegeisterung bis zum Scheitern des Schlieffen-Plans.

---

## 2. Kern-Artikel-Liste pro Mappe

### Mappe 1 — Pulverfass Europa

**Stundenfrage:** Warum war Europa vor 1914 ein "Pulverfass"?

**Kern-Artikel:**
1. `Juli-Krise` (Rahmen fuer die Vorgeschichte)
2. `Europaeische_Buendnisse_vor_dem_Ersten_Weltkrieg` oder alternativ `Dreibund` + `Entente`
3. `Deutsches_Kaiserreich#Aussenpolitik_Wilhelms_II.` (Weltpolitik, Flottenwettruesten)
4. `Britisch-deutsches_Wettruesten_zur_See` (Flottenwettruesten als konkreter Konflikt-Indikator)

**Didaktisch-inhaltliche Anker (aus G1 v3.11):** Buendnissysteme, Imperialismus, Wettruesten, Balkan als Unruhe-Zone, Wilhelm II. als personalisierter Fokus.

### Mappe 2 — Das Attentat von Sarajevo

**Stundenfrage:** Wie konnte ein einziger Mord einen Weltkrieg ausloesen?

**Kern-Artikel:**
1. `Attentat_von_Sarajevo`
2. `Juli-Krise` (Kausalkette 28. Juni bis 4. August)
3. `Ultimatum_an_Serbien` oder entsprechende Sektion in Juli-Krise

**Didaktisch-inhaltliche Anker:** Gavrilo Princip, Franz Ferdinand + Sophie, 37-Tage-Countdown, Ultimatum, Blankoscheck, Mobilmachung.

### Mappe 3 — Kriegsbegeisterung 1914

**Stundenfrage:** Waren die Menschen 1914 wirklich begeistert vom Krieg?

**Kern-Artikel:**
1. `Augusterlebnis` (Kern-Begriff der Forschung, neuere Historiografie-Debatte inkl.)
2. `Burgfriedenspolitik` (politischer Rahmen der scheinbaren Einigkeit)
3. `Kriegsbegeisterung_1914` falls vorhanden, sonst Sektion in `Erster_Weltkrieg`

**Didaktisch-inhaltliche Anker:** Jubelbilder, neuere Differenzierung (nicht alle waren begeistert), Stadt/Land-Unterschied, Frauen-Perspektive, Soldaten-Tagebuecher.

### Mappe 4 — Der Schlieffen-Plan

**Stundenfrage:** Warum scheiterte der Plan fuer einen schnellen Sieg?

**Kern-Artikel:**
1. `Schlieffen-Plan`
2. `Erste_Schlacht_an_der_Marne` (Scheiter-Punkt)
3. `Westfront_(Erster_Weltkrieg)` (Uebergang zum Stellungskrieg als Folge)

**Didaktisch-inhaltliche Anker:** Zwei-Fronten-Problem, Belgien-Route, neutralitaets-Bruch, 40-Tage-Plan, Marne als Stopp, Uebergang zum Stellungskrieg.

---

## 3. Erweiterter Medien-Scope pro Mappe

### Mappe 1 — Pulverfass Europa

**Medien-Scope-Artikel (Medien-Extraktion, kein Text-Ingest):**
1. `Wilhelm_II._(Deutsches_Reich)` — Portraet-Auswahl, Karikaturen
2. `SMS_Dreadnought` / `HMS_Dreadnought` — Flottenwettruesten-Bilder
3. `Bismarcks_Buendnissystem` oder Karten-Artikel zu europaeischer Buendniskonstellation
4. `Deutsche_Kolonien` — Weltpolitik-Kontext-Medien

**Zielmedien:** 1x historische Karte Buendnisse 1914, 1x Karikatur Wettruesten, 1x Portraet Wilhelm II., 1-2x Kolonialismus-Kontext-Bild.

### Mappe 2 — Das Attentat von Sarajevo

**Medien-Scope-Artikel:**
1. `Franz_Ferdinand_von_Oesterreich-Este` — Portraet, Attentats-Rekonstruktion
2. `Gavrilo_Princip` — Portraet, Biografie-Bild
3. `Latin-Bruecke` (Attentats-Ort) — Ort-Bild
4. `Museum_des_Ersten_Weltkriegs_Sarajevo` oder Denkmal-Artikel — Erinnerungs-Kontext

**Zielmedien:** 1x Portraet Franz Ferdinand/Sophie, 1x Portraet Princip, 1x historisches Foto der Latin-Bruecke, 1x Denkmal/Gedenkort-Bild.

### Mappe 3 — Kriegsbegeisterung 1914

**Medien-Scope-Artikel:**
1. `Mobilmachung_1914` — Fotomaterial Mobilmachungs-Szenen
2. `Berliner_Stadtschloss` — speziell fuer das beruehmte Jubel-Foto vom Balkon
3. `Langemarck-Mythos` — Propaganda-Material zur Kriegsbegeisterung-Historiografie

**Zielmedien:** 1x Jubel-Foto Berlin, 1x Truppentransport-Bahnhof-Foto, 1x Propaganda-Plakat Mobilmachung, 1x differenzierendes Foto (z. B. weinende Frau am Bahnhof) als Gegenbild.

### Mappe 4 — Der Schlieffen-Plan

**Medien-Scope-Artikel:**
1. `Alfred_von_Schlieffen` — Portraet, Plan-Dokument
2. `Deutscher_Einmarsch_in_Belgien_1914` — Belgien-Route-Karten, Photos
3. `Erste_Schlacht_an_der_Marne` (fuer spezifische Marne-Kartendarstellungen)
4. `Pariser_Taxis_von_der_Marne` — ikonisches Medium des Schlieffen-Plan-Scheiterns

**Zielmedien:** 1x historische Karte Schlieffen-Plan, 1x Portraet Schlieffen, 1x Foto Einmarsch Belgien, 1-2x Marne-Kontext (inkl. Pariser-Taxi-Motiv als narrativ attraktiver Anker).

---

## 4. Statistische Medien (neuer Typ, Reife-Schulden, siehe R0.1 M-03)

Die M-03-Reife-Matrix markiert SUB_MATERIAL_STATISTIK als ROT. Der v3.12-Pilot soll laut Plan mindestens eine Statistik-Instanz enthalten. Kandidaten aus dem Kern-Artikel-Pool:

| Mappe | Statistik-Kandidat | Quelle-Artikel |
|---|---|---|
| M1 | Ruestungsausgaben Gross-Maechte 1890-1914 | `Britisch-deutsches_Wettruesten_zur_See` |
| M4 | Mobilmachung: Mannstaerken 1914 pro Land | `Mobilmachung_1914` oder `Erster_Weltkrieg#Truppenstaerken` |

**Empfehlung:** M1 Ruestungsausgaben als Pilot-Statistik. Sie ist inhaltlich zentral fuer die Pulverfass-These und didaktisch leicht lesbar (Zeitreihe, Balkendiagramm).

---

## 5. Scope-Tabelle fuer die Phase-0.2.M-Umsetzung

| Mappe | Kern-Artikel (Count) | Erweiterter Medien-Scope (Count) | Ziel-Medien-Zahl | Ziel-Typen |
|---|---|---|---|---|
| M1 | 4 | 4 | 4-5 | bildquelle, karte, portraet, statistik |
| M2 | 3 | 4 | 4-5 | bildquelle, portraet, denkmal, karte(37-Tage-Zeitleiste) |
| M3 | 3 | 3 | 3-4 | bildquelle, quellentext-mehrstimmen, tagebuch |
| M4 | 3 | 4 | 4-5 | bildquelle, karte, portraet |

**Game-Gesamt:**
- Kern-Artikel: 13 Artikel (Volltext-Analyse)
- Erweiterter Medien-Scope: 15 Artikel (nur Medien)
- Geschaetzte Gesamt-Medien: 15-19 qualifizierte Kandidaten
- Dual-Scope-Budget: 10 Artikel/Game = **ueberschritten**. Anpassung noetig (siehe §6).

---

## 6. Anpassung an Dual-Scope-Budget

§15.1 F18 nennt als Default-Budget "max 10 Artikel/Game". Der oben aufgelistete erweiterte Scope (15 Artikel) ueberschreitet dieses Budget um 5. Zwei Optionen:

**Option A (empfohlen fuer Pilot):** Budget fuer den Pilot auf 15 Artikel/Game anheben. Begruendung: Der Pilot muss alle Reife-Luecken testen (inkl. STATISTIK, QUELLENKRITIK, Portraets), was mehr Quellen erfordert. Nach dem Pilot wird das Budget empirisch justiert.

**Option B:** Budget strikt halten und 5 Artikel priorisieren. Dann: M1 nur 3 Scope-Artikel (Wilhelm-II. + Dreadnought + Buendnisse), M2 nur 3 (Franz-Ferdinand + Princip + Latin-Bruecke), M3 nur 2 (Augusterlebnis-Foto-Material genuegt, Jubel-Stadtschloss + Langemarck), M4 nur 2 (Schlieffen-Portraet + Marne-Taxi).

**Empfehlung:** Option A fuer den v3.12-Pilot. User-Entscheidung einholen (siehe §7).

---

## 7. User-Entscheidungen (Session 29)

1. **Budget-Anpassung: Option A CONFIRMED.** 15 Artikel/Game im erweiterten Scope fuer den Pilot-Lauf. Nach Pilot wird das Budget empirisch justiert.
2. **M3 Quellentext-Mehrstimmen: NEU GENERIEREN CONFIRMED.** M3 wird im v3.12-Pilot vollstaendig neu erzeugt (nicht aus G1 uebernommen). Begruendung (User): "neu generieren waere der bessere test". Das testet die Pipeline gegen den neuen `QuellentextMehrstimmen`-Subtyp ohne Legacy-Altlasten.
3. **M4 Vergleich-Aufgabe: NEUESTE INFRASTRUKTUR CONFIRMED.** Der v3.12-Pilot soll, wo moeglich, die aktuellste Infrastruktur-Form testen. Fuer M4 bedeutet das: die Vergleich-Aufgabe wird mit der neuen Plan-vs-Wirklichkeit-Matrix aus Runde 2 Arbeitspaket 5 neu gebaut, nicht aus G1 v3.11 uebernommen. Damit laufen alle Runde-2-Policy-Aenderungen (Umlaut-Retrofit, IL-1, neue Medien-Funktions-Klassifikation) durch die M4-Vergleich-Aufgabe durch.

### 7.1 Anpassungen aus Testrun R0.5

Zusaetzlich zu den User-Entscheidungen hat der Testrun R0.5 (TESTRUN_MEDIEN_EXTRAKTION_M4_2026-04-11.md) drei Katalog-Korrekturen ergeben:

**A) `Taxis_von_der_Marne` aus M4 entfernt.** Der Titel existiert nicht auf de.wikipedia.org (404). Ersatz: Taxi-Abschnitt direkt im Kern-Artikel `Erste_Schlacht_an_der_Marne` nutzen (Option B aus R0.5 §8.1). Commons-Suche "Taxis Marne 1914" bleibt als Medien-Kanal erhalten.

**B) M4 erweitert um drei Medien-Cluster:**
- `Schlieffen-Denkschrift.jpg` — aus `Schlieffen-Plan`-Artikel. Pflicht-Quellenkritik-Anker fuer M-03-Reife (QUELLENKRITIK ROT, braucht Pflicht-Einsatz im Pilot). Funktionstyp: strukturierend.
- Marne-Generale-Portraet-Cluster: `Joseph_Joffre`, `Karl_von_Buelow`, `Alexander_von_Kluck`, `Ferdinand_Foch` — aus `Erste_Schlacht_an_der_Marne`-Artikel. Didaktisch stark fuer Zuordnungs- oder Vergleich-Aufgabe ("Wer kaempfte auf welcher Seite? Welche Rolle?"). Funktionstyp: analytisch.
- IWM-Belgien-Reportage-Cluster: sechs `Q53xxx`-Fotos (Commons, Public domain, Imperial War Museums). Zusammenhaengende Fotoreportage September 1914 (belg. Pioniere, Rueckzug nach Antwerpen, Trummerbilder Malines). Funktionstyp: evokativ + atmospherisch.

**C) Phase-0.2.M Dual-Kanal-Pflicht bestaetigt.** Sub-Agent muss WebFetch-Artikel-Inventur UND Commons-Suche kombinieren (siehe R0.5 §8.2). Wird in Runde 2 Arbeitspaket 2 in die Sub-Agent-Kontrakte eingebaut.

### 7.2 Infrastruktur-Gap (nicht-blockierend fuer Medien-Pipeline)

**wikipedia-mcp Sprach-Default:** Der MCP-Server defaultet auf Englisch (siehe R0.5 §3.1). Config-Fix vor Phase-0.2.M-Start:

```json
"wikipedia": {
  "command": "/Users/paulad/.local/bin/wikipedia-mcp",
  "args": ["--language", "de"]
}
```

**Status:** Vor Runde 2 Arbeitspaket 2 einzuspielen. Blockiert nur Text-Ingest (Volltext-Analyse der Kern-Artikel-Liste), nicht die Medien-Extraktions-Pipeline selbst (die laeuft ueber `wikimedia_search_images` + WebFetch, beide sprachunabhaengig).

---

## 8. Titel-Verifikation post-MCP-Config (Session 29, R0.6)

Nach dem wikipedia-mcp Config-Fix (`args: ["--language", "de"]` aktiv) wurden alle Kern-Artikel + erweiterter-Scope-Artikel per `mcp__wikipedia__get_summary` gegen de.wikipedia.org verifiziert. **Sieben Titel waren ungueltig** (aus §2 und §3 oben). Neun der 28 Titel des Original-Katalogs §2/§3 haben keinen 1:1-Artikel auf der dt. Wikipedia.

### 8.1 Verifizierter Katalog (autoritative Fassung fuer Runde 2 Arbeitspaket 2)

Diese Fassung ueberschreibt die Titel in §2/§3 und ist ab sofort verbindlich.

**Mappe 1 — Pulverfass Europa**

Kern-Artikel:
1. `Julikrise` — **ersetzt** Original `Juli-Krise` (404).
2. `Dreibund` + `Triple_Entente` — **ersetzen** Original `Europaeische_Buendnisse_vor_dem_Ersten_Weltkrieg` (404). Split auf zwei separate Artikel. Didaktisch besser, weil die beiden Lager direkt benannt werden.
3. `Weltpolitik` + `Wilhelm_II._(Deutsches_Reich)` (Sektion: Weltpolitik-Aussenpolitik) — **ersetzen** Original `Deutsches_Kaiserreich#Aussenpolitik_Wilhelms_II.` / `Wilhelm_II_Aussenpolitik`. `Weltpolitik` ist der Sachbegriff, `Wilhelm_II. (Deutsches_Reich)` der Personen-Artikel.
4. `Flottengesetze` — **ersetzt** Original `Britisch-deutsches_Wettruesten_zur_See` (404). `Flottengesetze` ist der Hauptartikel und enthaelt explizit den Begriff "Deutsch-Britisches Marine-Wettruesten" + Link-Struktur.

**Mappe 2 — Das Attentat von Sarajevo**

Kern-Artikel:
1. `Attentat_von_Sarajevo` (unveraendert, Bestandsartikel bestaetigt).
2. `Julikrise` (unveraendert, ersetzt Juli-Krise-Schreibweise).
3. `Kriegserklärung_Österreich-Ungarns_an_Serbien` — **ersetzt** Original `Ultimatum_an_Serbien` (kein eigener Artikel). Enthaelt als Bestandsartikel den unmittelbaren Ultimatum-Kontext.

**Mappe 3 — Kriegsbegeisterung 1914**

Kern-Artikel:
1. `Augusterlebnis` (unveraendert, Bestandsartikel bestaetigt; enthaelt laut Suche die aktuelle Historiografie-Debatte zur "angeblichen" Kriegsbegeisterung).
2. `Burgfriedenspolitik` (unveraendert, Bestandsartikel bestaetigt).
3. **ENTFERNEN** Original `Kriegsbegeisterung_1914`. Kein eigener Artikel. Inhalt ist bereits in `Augusterlebnis` enthalten. Redundanz behoben.
4. *(neu)* `Ideen_von_1914` — im Suchtreffer prominent, deckt den ideologischen Ueberbau zur Kriegsbegeisterung ab. Optional als dritter Kern-Artikel aufnehmen, um die Mappe breiter zu machen (Augusterlebnis = Verhalten, Ideen_von_1914 = Deutung, Burgfriedenspolitik = Politik-Rahmen).

**Mappe 4 — Der Schlieffen-Plan**

Kern-Artikel:
1. `Schlieffen-Plan` (unveraendert, Bestandsartikel bestaetigt).
2. `Erste_Schlacht_an_der_Marne` (unveraendert, Bestandsartikel bestaetigt).
3. `Westfront_(Erster_Weltkrieg)` (unveraendert, Bestandsartikel bestaetigt).

**Erweiterter Medien-Scope M4 (post-R0.5 + post-R0.6):**
1. `Alfred_von_Schlieffen` (unveraendert, Bestandsartikel bestaetigt).
2. `Deutsches_Ultimatum_an_Belgien` + `Eroberung_von_Lüttich_(1914)` — **ersetzen** Original `Deutscher_Einmarsch_in_Belgien_1914` (404). Split auf zwei spezifische Artikel. `Deutsches_Ultimatum_an_Belgien` liefert den Auslser, `Eroberung_von_Lüttich` die erste grosse Gefechts-Dokumentation.
3. `Erste_Schlacht_an_der_Marne` (Dopplung zu Kern — bereits in R0.5 als Medien-Kanal bestaetigt).
4. **ENTFERNT** `Pariser_Taxis_von_der_Marne` / `Taxis_von_der_Marne` (404, R0.5 §8.1). Ersatz: Taxi-Sektion in `Erste_Schlacht_an_der_Marne` + Commons-Suche "Taxis Marne 1914".

### 8.2 Durchgaengige Prinzipien der Korrekturen

1. **Umlaut-Schreibweise:** Alle Artikel-Titel im Katalog ab sofort mit echten Umlauten (`ä/ö/ü`), weil der MCP-Server sie korrekt aufloest. Das Katalog-Dokument selbst nutzt trotzdem ASCII-Transliteration im Fliesstext (ae/oe/ue), weil UTF-8-Defekt in Schreibumgebung nicht geklaert ist — dies ist eine Wartungs-Inkonsistenz, die in Runde 1 Arbeitspaket 1 (Umlaut-Retrofit) nicht beruehrt wird.

2. **Split statt Sammelartikel:** Wo die dt. WP keinen Sammelartikel hat, splittet der Katalog auf zwei bis drei spezifische Artikel. Beispiele: `Europaeische_Buendnisse` → `Dreibund` + `Triple_Entente`; `Deutscher_Einmarsch_in_Belgien_1914` → `Deutsches_Ultimatum_an_Belgien` + `Eroberung_von_Lüttich`.

3. **Kein Sektions-Deeplink als Kern-Artikel:** Das Original nutzte `Deutsches_Kaiserreich#Aussenpolitik_Wilhelms_II.` als Kern-Artikel. Solche Sektions-Deeplinks sind fuer die Phase-0.2.M-Ingest-Logik fragiler als ganze Artikel (Sektions-IDs koennen sich durch Artikel-Bearbeitung aendern). Der Katalog ersetzt sie durch stabilere Haupt-Artikel (`Weltpolitik`, `Wilhelm II. (Deutsches_Reich)`).

4. **Redundanz-Bereinigung:** `Kriegsbegeisterung_1914` war redundant zu `Augusterlebnis`. Entfernt.

### 8.3 Auswirkungen auf §5 Scope-Tabelle und §6 Budget

| Mappe | Kern-Artikel neu | Erweiterter Medien-Scope neu |
|---|---|---|
| M1 | 5 (Julikrise, Dreibund, Triple_Entente, Weltpolitik, Flottengesetze) | unveraendert 4 |
| M2 | 3 (Attentat_von_Sarajevo, Julikrise-Dopplung, Kriegserklaerung_OeUng_an_Serbien) | unveraendert 4 |
| M3 | 3 (Augusterlebnis, Burgfriedenspolitik, Ideen_von_1914 optional) | unveraendert 3 |
| M4 | 3 (Schlieffen-Plan, Erste_Schlacht_an_der_Marne, Westfront) | 5 (Alfred_von_Schlieffen, Deutsches_Ultimatum_an_Belgien, Eroberung_Luettich, Marne-Dopplung, Moltke-optional) |

**Game-Gesamt neu:**
- Kern-Artikel: **14** (vorher 13, +1 durch M1-Split und M3-Ergaenzung trotz Kriegsbegeisterung-Streichung)
- Erweiterter Medien-Scope: **16** (vorher 15, +1 durch M4-Split Belgien)
- Budget Option A (15 Artikel/Game) um 1 ueberschritten in M4. **Empfehlung:** `Moltke` in M4 optional halten und nur nutzen, wenn ein Marne-Scheiter-Narrativ mit Personen-Fokus gewuenscht ist. Sonst bleibt M4 bei 4 Scope-Artikeln und Budget haelt.

### 8.4 Impact auf Phase-0.2.M Sub-Agent-Kontrakt

Die Sub-Agent-Instruktion muss ab Runde 2 Arbeitspaket 2 folgende Invariante tragen:

> **Pre-Ingest-Titel-Validierung (Pflicht):**
> Bevor der Volltext-Ingest eines Kern-Artikels startet, pruefe die Existenz per `mcp__wikipedia__get_summary({title: <Titel>})`. Bei "No Wikipedia article found" bricht der Lauf ab und meldet den Titel als Katalog-Defekt. Keine Fallback-Heuristik, kein Auto-Swap.

Begruendung: Der R0.6-Befund zeigt, dass selbst ein per Hand kuratierter Katalog 9 von 28 ungueltige Titel enthalten konnte. Automatische Pre-Validierung ist guenstiger als manuelle Re-Kuration nach Fehllauf.

---

## 9. Quellen

- `weitergehts-online/escape-games/gpg-erster-weltkrieg-ursachen/data.json` (G1 v3.11 als inhaltliche Referenz)
- `weitergehts-online/docs/architektur/UPGRADE_PLAN_v3-12_ESCAPE_GAME_QUALITAET.md` §4 Runde 2 Arbeitspaket 2 (Dual-Scope-Definition), §15.1 F18 (Budget-Default)
- `weitergehts-online/docs/befunde/M-03_REIFE_MATRIX_v3-12_2026-04-11.md` (Reife-Luecken-Scope)
- Wikipedia-Artikel-Namen sind deutschsprachig (de.wikipedia.org) und werden in Phase 0.2.M vor Volltext-Ingest auf Existenz geprueft.
