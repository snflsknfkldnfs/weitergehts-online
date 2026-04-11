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

## 7. Offene Punkte fuer User-Entscheidung (Input fuer Runde 2)

1. **Budget-Anpassung:** Option A (15 Artikel) vs. Option B (10 Artikel) — fuer den Pilot-Lauf.
2. **M3 Quellentext-Mehrstimmen-Beispiel:** Der neue `QuellentextMehrstimmen`-Subtyp (Runde 2 Arbeitspaket 5) braucht einen geeigneten Pilot-Fall. M3 hat mit "Drei Stimmen zum Kriegsausbruch" bereits eine Kandidaten-Stelle. Soll der Pilot diese Stelle regenerieren oder neu komponieren (z. B. eine Stimme aus Frankreich, eine aus Russland, eine aus Deutschland)?
3. **M4 Vergleich-Aufgabe mit neuer Plan-vs-Wirklichkeit-Matrix:** G1 v3.11 hat aufgabe-4-8 (vergleich) bereits mit dieser Struktur. Soll der v3.12-Pilot die Aufgabe uebernehmen, erweitern, oder auf Runde 3-5 Policy-Aenderungen anpassen?

---

## 8. Quellen

- `weitergehts-online/escape-games/gpg-erster-weltkrieg-ursachen/data.json` (G1 v3.11 als inhaltliche Referenz)
- `weitergehts-online/docs/architektur/UPGRADE_PLAN_v3-12_ESCAPE_GAME_QUALITAET.md` §4 Runde 2 Arbeitspaket 2 (Dual-Scope-Definition), §15.1 F18 (Budget-Default)
- `weitergehts-online/docs/befunde/M-03_REIFE_MATRIX_v3-12_2026-04-11.md` (Reife-Luecken-Scope)
- Wikipedia-Artikel-Namen sind deutschsprachig (de.wikipedia.org) und werden in Phase 0.2.M vor Volltext-Ingest auf Existenz geprueft.
