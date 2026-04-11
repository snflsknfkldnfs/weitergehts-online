# R0.5 — Testrun Medien-Extraktion M4 Schlieffen-Plan

**Datum:** 2026-04-11
**Arbeitspaket:** Zwischenschritt R0.4 → Runde 2 (User-Auftrag Session 29)
**Ziel:** Viability-Test der Phase-0.2.M-Planung an einem konkreten Mappen-Scope, bevor die v3.12-Pipeline gegen sie gebaut wird.
**Methodik:** Trocken-Lauf ohne Engine-Integration. Nur Quellen-Inventur via (a) WebFetch auf de.wikipedia.org, (b) `wikimedia_search_images` MCP. Keine Game-Daten geaendert.

---

## 1. Zusammenfassung

**Viability-Verdikt:** **POSITIV mit drei Korrektur-Punkten.**

Die Dual-Scope-Architektur aus R0.4 ist an M4 erprobt worden. Medien-Ertrag ist quantitativ und qualitativ ausreichend fuer die Pilot-Mappen. Der MCP-Werkzeug-Mix (`wikimedia_search_images` + `wikipedia-mcp` + WebFetch-Fallback) funktioniert. Drei Korrekturen an Katalog und Infrastruktur sind noetig, bevor Runde 2 Arbeitspaket 2 die Phase-0.2.M-Implementierung angeht.

**Die drei Korrekturen:**
1. **Config-Fix (Infrastruktur):** `wikipedia-mcp` hat keine `--language`-Voreinstellung und defaultet auf Englisch. Alle Testrun-Aufrufe mit deutschen Titeln (`Juli-Krise`, `Schlieffen-Plan`, `Taxis_von_der_Marne`) schlugen fehl. Nur nach Umschalten auf englische Titel (`July Crisis`, `Schlieffen Plan`) kam eine Antwort. Config-Snippet in §7.
2. **Katalog-Korrektur M4:** `Taxis_von_der_Marne` und `Taxis_von_der_Marne_(1914)` sind beides 404 auf de.wikipedia.org. Der korrekte Artikel heisst im deutschsprachigen WP vermutlich anders (englisch: `Renault Taxi de la Marne`, `Marneschlacht`-Sektion koennte Ersatz sein). **Katalog-Ersatz noetig** bei der Kern-Artikel-Liste M4.
3. **Katalog-Erweiterung:** Drei hochwertige Medien wurden beim Testrun entdeckt, die im R0.4-Katalog fehlten (siehe §5). Aufnahme in den Katalog vor Pilot-Lauf.

---

## 2. Test-Setup

**Scope:** Mappe 4 "Der Schlieffen-Plan" aus dem R0.4-Katalog (Pilot-Game `gpg-erster-weltkrieg-ursachen`).

**Kern-Artikel M4 (geplant, R0.4):**
1. `Schlieffen-Plan`
2. `Erste_Schlacht_an_der_Marne`
3. `Westfront_(Erster_Weltkrieg)`

**Erweiterter Medien-Scope M4 (geplant, R0.4):**
1. `Alfred_von_Schlieffen`
2. `Deutscher_Einmarsch_in_Belgien_1914`
3. `Erste_Schlacht_an_der_Marne` (Dopplung zu Kern)
4. `Pariser_Taxis_von_der_Marne` bzw. `Taxis_von_der_Marne`

**Tools im Test:**
- `mcp__wikipedia__get_summary` (wikipedia-mcp, Rudra-ravi)
- `mcp__wikipedia__search_wikipedia`
- `mcp__wikimedia-image-search__wikimedia_search_images` (separate MCP, Language-unabhaengig)
- WebFetch auf `https://de.wikipedia.org/wiki/<titel>` (HTML-Inventur der Article-embedded Media)

---

## 3. Testlauf-Protokoll

### 3.1 wikipedia-mcp Sprach-Default-Defekt

**Call:** `mcp__wikipedia__get_summary({title: "Juli-Krise"})`
**Ergebnis:** `"No Wikipedia article found for 'Juli-Krise'."`

**Call:** `mcp__wikipedia__get_summary({title: "July Crisis"})`
**Ergebnis:** Erfolgreiche englische Zusammenfassung.

**Diagnose:** Der `wikipedia-mcp`-Server mit der aktuellen Config (`"command": "/Users/paulad/.local/bin/wikipedia-mcp"`) hat keinen `--language`-Parameter und defaultet auf `en`. Laut README auf `github.com/Rudra-ravi/wikipedia-mcp` unterstuetzt der Server den Parameter explizit.

**Impact fuer Phase 0.2.M:** Ohne Config-Fix kann der Volltext-Ingest der Kern-Artikel-Liste nicht ueber `wikipedia-mcp` laufen. Zwei Optionen:
- (a) Config anpassen, pro `--language de` starten (empfohlen).
- (b) WebFetch-Fallback auf `https://de.wikipedia.org/wiki/<titel>` (funktioniert sofort, aber ohne MCP-Struktur-Parsing).

**Empfehlung:** Option (a). Config-Snippet in §7.

### 3.2 wikimedia-image-search ist Sprach-unabhaengig

Die Medien-Suche ueber `wikimedia_search_images` funktioniert ohne Konfiguration. Wikimedia Commons ist multilingual; Suchqueries liefern Ergebnisse in allen Sprachen gemischt. Keine Config-Aenderung noetig.

**Impact:** Medien-Extraktion kann unmittelbar starten, sobald Runde 2 die Sub-Agent-Kontrakte schreibt. Die Config-Luecke bei `wikipedia-mcp` blockt nur den Text-Ingest, nicht die Medien-Pipeline.

### 3.3 WebFetch auf de.wikipedia.org als Artikel-Medien-Inventur

Die HTML-Version eines de.wikipedia.org-Artikels exponiert alle eingebundenen Bilder als `<img>`-Tags mit vollstaendigen URLs und Captions (aus `<figcaption>`). WebFetch liefert diese strukturiert zurueck.

**Befund:** WebFetch ist ein tauglicher Fallback fuer die Artikel-interne Medien-Inventur, solange `wikipedia-mcp` noch nicht konfiguriert ist — und auch danach wertvoll, weil der MCP-Server selbst kein Bild-Extraktions-Tool hat (nur Text-Tools wie `get_article`, `get_summary`, `get_sections`, `get_links`).

**Konsequenz fuer Phase 0.2.M:** Die Sub-Agent-Instruktion fuer die Medien-Extraktion muss zwei Kanaele kombinieren:
1. WebFetch auf de.wikipedia.org fuer Artikel-embedded Media (Caption-Kontext vorhanden)
2. `wikimedia_search_images` fuer breitere Commons-Suche (Qualitaet-Reichweite, aber ohne Caption-Kontext aus Artikel)

---

## 4. Medien-Inventur M4

### 4.1 Kern-Artikel-Medien (WebFetch de.wikipedia.org)

**`Schlieffen-Plan`** (Artikel-embedded, 2 Bilder):

| Datei | Typ | Lizenz | Caption / Kontext | Funktionstyp |
|---|---|---|---|---|
| `Schlieffen_Plan_de_1905.svg` | karte | CC BY-SA 3.0 | Schlieffen-Plan 1905, deutsche Beschriftung | analytisch |
| `Schlieffen-Denkschrift.jpg` | primaerquelle | Public domain | Deckblatt der Denkschrift Schlieffens (Faksimile) | strukturierend (Quellenkritik-Anker) |

**`Erste_Schlacht_an_der_Marne`** (Artikel-embedded, 10 Bilder, top-5 relevant):

| Datei | Typ | Lizenz | Caption / Kontext | Funktionstyp |
|---|---|---|---|---|
| `German_soldiers_Battle_of_Marne_WWI.jpg` | bildquelle | Public domain | Deutsche Soldaten in Bewegung | atmospherisch |
| `Joseph_Joffre_Nw_joffre_02_nw.png` | portraet | Public domain | Joffre, franz. Oberbefehlshaber | analytisch |
| `Karl_von_Buelow_c1915.jpg` | portraet | Public domain | Generaloberst von Buelow (2. Armee) | analytisch |
| `Alexander_von_Kluck_(ca._1914).jpg` | portraet | Public domain | Generaloberst von Kluck (1. Armee) | analytisch |
| `Ferdinand_Foch_pre_1915.jpg` | portraet | Public domain | Foch, franz. Korpskommandeur | analytisch |

**`Westfront_(Erster_Weltkrieg)`** (Artikel-embedded, 5 relevante Bilder zu M4-Thema):
- Uebergangs-Bilder Bewegungskrieg zu Stellungskrieg (nicht im Detail inventarisiert, da auf M4-Bereich "Marne als Endpunkt des Bewegungskriegs" fokussiert).

### 4.2 Erweiterter-Scope-Medien (Commons + Artikel)

**`Alfred_von_Schlieffen`** (WebFetch + Commons):

| Datei | Typ | Lizenz | Caption / Kontext | Funktionstyp |
|---|---|---|---|---|
| `Alfred_von_Schlieffen_1906_(cropped).jpg` | portraet | Public domain | Schlieffen in Uniform | analytisch |
| `Invalidenfriedhof,_Grabmal_von_Schlieffen.jpg` | denkmal | CC BY-SA | Grabmal auf dem Invalidenfriedhof Berlin | evokativ |

**`Deutscher_Einmarsch_in_Belgien_1914`** (Commons "German invasion Belgium 1914"):

Sechs IWM-Fotos (alle Public domain, UK Imperial War Museums):
- `The_German_Invasion_of_Belgium,_1914_Q53248.jpg` — belgische Infanterie zerstoert Eisenbahnbruecke Termonde
- `The_German_Invasion_of_Belgium,_September_1914_Q53241.jpg` — belgische Infanterie auf Rueckzug nach Antwerpen
- `The_German_Invasion_of_Belgium,_September_1914_Q53240.jpg` — belgischer Wachposten in Trummern von Malines
- `The_German_Invasion_of_Belgium,_September_1914_Q53238.jpg` — Maenner retten Gemaelde aus St. Rumbolds Kathedrale
- `The_German_Invasion_of_Belgium,_1914_Q53249.jpg` — belg. Pioniere zerstoeren Eisenbahnbruecke
- `The_German_Invasion_of_Belgium,_September_1914_Q53243.jpg` — belg. Soldaten auf Place d'Armes Gent

**Befund:** Fotoreportage-Qualitaet, Narrativ-Potenzial, Lizenz sauber. Fuer M4-Unterrichtsszenario "Wie machte sich der Schlieffen-Plan vor Ort bemerkbar?" sehr gut geeignet.

**`Helmuth_Moltke_der_Juengere`** (Commons "Helmuth Moltke Younger 1914"):

| Datei | Typ | Lizenz | Caption / Kontext | Funktionstyp |
|---|---|---|---|---|
| `Gw_moltke_01.jpg` | portraet | Public domain | Moltke ca. 1900, Uniformbild | analytisch |
| `Generalleutnant_von_Moltke,_der_neue_Chef_des_Generalstabs,_1906.jpg` | portraet | Public domain | Moltke 1906 als neuer Generalstabschef | analytisch |
| `The_Kaiser_William_II_and_Count_von_Moltke_(the_Younger)_(14802236753).jpg` | bildquelle | No restrictions | Wilhelm II. + Moltke zusammen 1914 | analytisch (Zwei-Personen-Bezug) |

**Schlieffen-Plan-Karten (Commons, zusaetzlich zum Artikel):**

| Datei | Typ | Lizenz | Caption / Kontext |
|---|---|---|---|
| `Schlieffen_Plan_de_1905.svg` | karte | CC BY-SA 3.0 | siehe Artikel-Inventur oben |
| `Schlieffen_Plan_fr_1905.svg` | karte | CC BY-SA 3.0 | Franz. Variante (derselbe Kartograph Tinodela) |
| `German_advance_through_Belgium,_August_1914.png` | karte | CC BY-SA 3.0 | Vormarsch-Karte August 1914 |
| `Western_front_1914_NO.jpg` | karte | CC BY-SA 3.0 | Westfront 1914 (Norwegisch) |

**`Taxis_von_der_Marne`** (R0.4 geplant):

| Status | Befund |
|---|---|
| WebFetch `Taxis_von_der_Marne` | **404** |
| WebFetch `Taxis_von_der_Marne_(1914)` | **404** |
| `search_wikipedia "Taxis Marne 1914"` (en) | Englisch: `Renault Taxi de la Marne` (pageid 6846311) |
| Commons "Taxis Marne 1914" | 6 Treffer, meist Renault Type AG Museumsfotos |

**Diagnose:** Der dt. Wikipedia-Titel aus dem R0.4-Katalog existiert so nicht. Vermutlich gibt es im dt. WP nur einen Abschnitt innerhalb `Erste Schlacht an der Marne` (nicht verifiziert) oder der Eintrag nutzt das englische Lemma `Renault Taxi de la Marne`. **Katalog-Ersatz noetig.** Commons-Medien sind trotzdem abrufbar (Renault Type AG Museumsbilder + evtl. zeitgenoessische Fotos).

---

## 5. Katalog-Erweiterungen (neu entdeckt im Testrun)

Diese Medien waren **nicht** im R0.4-Katalog, sind aber im Testrun aufgetaucht und hochwertig genug, um in den Pilot-Scope aufgenommen zu werden.

### 5.1 Schlieffen-Denkschrift (primaerquelle)

**Datei:** `Schlieffen-Denkschrift.jpg` (direkt im `Schlieffen-Plan`-Artikel eingebunden)

**Warum relevant:** Faksimile-Deckblatt einer Primaerquelle. Idealer Anker fuer **Quellenkritik-Aufgabe** (der QUELLENKRITIK-Sub-Agent ist in M-03 als ROT markiert und braucht einen Pflicht-Einsatz im v3.12-Pilot). M4 kann diese Pflicht-Quellenkritik-Aufgabe halten.

**Funktionstyp:** strukturierend (Anker fuer die Bloom-Taxonomie-Stufe "Bewerten").

**Didaktischer Einsatz:** "Hier siehst du die Original-Denkschrift Alfred von Schlieffens. Pruefe folgende Punkte: (a) Wer ist der Autor? (b) Wann wurde das Dokument verfasst? (c) Ist es eine Primaer- oder Sekundaerquelle? (d) Welche Absicht hatte der Autor?"

### 5.2 Marne-Generale-Portraet-Cluster

**Dateien:**
- `Joseph_Joffre_Nw_joffre_02_nw.png` (Frankreich, Oberbefehlshaber)
- `Karl_von_Buelow_c1915.jpg` (Deutschland, 2. Armee)
- `Alexander_von_Kluck_(ca._1914).jpg` (Deutschland, 1. Armee)
- `Ferdinand_Foch_pre_1915.jpg` (Frankreich, Korpskommandeur)

**Warum relevant:** Der R0.4-Katalog nennt nur "Schlieffen-Portraet" fuer M4. Der Marne-Artikel liefert vier weitere hochrangige Generale, die das Scheitern des Plans personalisieren koennten. Didaktisch stark fuer eine **Zuordnungsaufgabe** ("Wer kaempfte auf welcher Seite?") oder eine **Vergleich-Aufgabe** ("Welche Rolle spielte welcher General?").

**Funktionstyp:** analytisch (Portraets mit direkter inhaltlicher Kopplung an Stundenfrage M4).

### 5.3 IWM Belgien-Fotoreportage

**Dateien:** Sechs `Q53xxx`-IWM-Fotos (siehe §4.2).

**Warum relevant:** Der R0.4-Katalog sagt nur "Belgien-Einmarsch-Fotos". Der Testrun zeigt, dass es in Commons eine **zusammenhaengende Fotoreportage** vom September 1914 gibt (belg. Pioniere, Rueckzug nach Antwerpen, Trummerbilder Malines). Narrativ-Qualitaet ueber ad-hoc-Einzelbildern. Empfehlung: die Reportage **als Cluster** ueber den `SUB_MATERIAL_BILDQUELLE`-Sub-Agent einbinden.

**Funktionstyp:** evokativ + atmospherisch (mehrstimmige Reportage, nicht nur Einzelbild).

---

## 6. Qualitaet-Check

### 6.1 Licensing

| Status | Anzahl |
|---|---|
| Public domain | 15 der 21 inventarisierten Medien |
| CC BY-SA (3.0 / 4.0) | 6 |
| No known restrictions | 1 |
| **Blocker (unfreie Lizenz)** | **0** |

**Alle M4-Kandidaten sind lizenzkonform einsetzbar**, sofern die Engine bei CC-BY-SA-Medien eine Autoren-Attribution rendert (Sub-Agent BILDQUELLE pflegt das Feld bereits, Engine muss nur rendern).

### 6.2 Caption-Kontext

| Kanal | Caption-Qualitaet |
|---|---|
| Artikel-embedded (WebFetch) | Hoch. Captions aus `<figcaption>` enthalten didaktisch brauchbare Kurzbeschreibungen. |
| Commons-Suche (`wikimedia_search_images`) | Variabel. Manche Treffer haben reiche Metadaten, andere nur Datei-Namen. Ergaenzung durch Sub-Agent (SUB_MATERIAL_BILDQUELLE) empfohlen. |

### 6.3 Dual-Scope-Balance

Die R0.4-Regel "max. 5 Medien/Mappe aus erweitertem Scope" ist in M4 **eingehalten** nach Testrun-Inventur:

| Scope | Zahl Kandidaten | Zur Pilot-Verwendung empfohlen |
|---|---|---|
| Kern-Artikel-Medien (Volltext-Ingest + Media) | 12 | 4-5 |
| Erweiterter Medien-Scope | 14 | 4-5 |
| **Pilot-Zielzahl M4** | — | **8-10 Medien total** |

Die Budget-Obergrenze aus R0.4 §6 Option A (15 Artikel/Game im erweiterten Scope) wird mit M4 alleine nicht verletzt. Die Gesamtbilanz ueber alle 4 Mappen bleibt beim Pilot-Lauf zu pruefen, aber die M4-Zahl ist konservativ.

---

## 7. Config-Snippet wikipedia-mcp (Claude Desktop)

**Aktuell:**
```json
"wikipedia": {
  "command": "/Users/paulad/.local/bin/wikipedia-mcp"
}
```

**Korrigiert (deutsche Wikipedia):**
```json
"wikipedia": {
  "command": "/Users/paulad/.local/bin/wikipedia-mcp",
  "args": ["--language", "de"]
}
```

**Schritte:**
1. Claude Desktop beenden.
2. `~/Library/Application Support/Claude/claude_desktop_config.json` oeffnen.
3. `wikipedia`-Block durch die obige Variante ersetzen.
4. Claude Desktop neu starten.
5. Test: `mcp__wikipedia__get_summary({title: "Juli-Krise"})` sollte jetzt eine deutsche Zusammenfassung zurueckgeben.

**Quelle:** README von `github.com/Rudra-ravi/wikipedia-mcp` (via WebFetch im Testrun).

**Hinweis:** Der Server unterstuetzt laut README nur eine Sprache pro Serverinstanz. Soll die Pipeline spaeter beide Sprachen nutzen (z.B. englische Artikel fuer Spezialthemen), braeuchte es eine zweite Serverinstanz unter anderem Namen in der Config (`wikipedia-en` mit `args: ["--language", "en"]`).

---

## 8. Konsequenzen fuer Runde 2

### 8.1 Katalog-Korrekturen (WIKI_SCOPE_KATALOG_v3-12_PILOT §3 M4)

**Entfernen:**
- `Taxis_von_der_Marne` als Kern- oder Scope-Artikel (Titel existiert nicht).

**Ersetzen durch:**
- Option A: `Marneschlacht` + direkte Commons-Suche "Taxis Marne 1914" fuer Renault-Type-AG-Bilder.
- Option B: Im Kern-Artikel `Erste_Schlacht_an_der_Marne` nach Taxi-Abschnitt durchsuchen (Strg-F nach "Taxi") und diesen Abschnitt als Quelle benutzen.

**Empfehlung:** Option B (konservativer, spart einen Scope-Artikel).

**Erweitern um:**
- `Schlieffen-Denkschrift.jpg` (aus Schlieffen-Plan-Artikel) als Pflicht-Quellenkritik-Anker fuer M4.
- Marne-Generale-Cluster (Joffre/Buelow/Kluck/Foch) als Portraet-Cluster fuer M4-Zuordnungsaufgabe.
- IWM-Belgien-Reportage-Cluster (6 Fotos) als Bildquelle-Cluster fuer M4 "Plan trifft Wirklichkeit"-Moment.

### 8.2 Phase-0.2.M-Sub-Agent-Anforderungen (neu bestaetigt)

Der Testrun bestaetigt die Architektur aus R0.4 und ergaenzt sie um folgende Anforderungen an die noch zu schreibenden Phase-0.2.M-Sub-Agenten:

1. **Dual-Kanal-Pflicht:** Sub-Agent muss WebFetch-Artikel-Inventur UND Commons-Suche kombinieren. Nur Commons-Suche reicht nicht (verpasst Artikel-Caption-Kontext). Nur WebFetch reicht nicht (verpasst breitere Commons-Reichweite).
2. **Lizenz-Feld-Pflicht:** Jedes Medium braucht einen Lizenz-Eintrag (`lizenz.name`, `lizenz.url`, `artist`). Die Engine muss diese Felder rendern (R0.4 §2 offen).
3. **Caption-Erhalt:** Wenn ein Medium aus einem Artikel kommt, muss die Original-Caption erhalten bleiben (Sub-Agent kopiert sie in ein `caption_original`-Feld und darf das Feld fuer den didaktischen Einsatz umformulieren).
4. **Cluster-Typen:** Die R0.4-Medien-Klassifikation (analytisch/atmospherisch/evokativ/strukturierend) muss in der Sub-Agent-Ausgabe erscheinen. Zusatz-Typ "Primaerquelle-Faksimile" koennte noetig sein — auf Runde 2 zu pruefen.

### 8.3 R0.6-Kandidat (optional)

Der Testrun zeigt, dass ein **zweiter Mini-Testrun** sinnvoll waere, um die Dual-Kanal-Methodik auf einer anderen Mappe zu verifizieren. Kandidat: **M2 Attentat von Sarajevo** (hoher Portraet-Anteil, reichlich Commons-Material, Franz-Ferdinand-Attentats-Rekonstruktion). Das waere R0.6. **Empfehlung:** Nicht-blockierend, in Runde 2 Arbeitspaket 2 als Validierungs-Schritt einbauen, nicht R0 verlaengern.

---

## 9. Gate-Status (Self-Report)

| Gate | Status | Begruendung |
|---|---|---|
| M4-Viability | GRUEN | Ausreichend qualifizierte Medien, Licensing sauber, Dual-Kanal funktioniert. |
| Wikipedia-MCP Config | ROT | Config-Fix noetig (§7), sonst Text-Ingest blockiert. Nicht-blockierend fuer Medien-Pipeline selbst. |
| Katalog-Korrektur | GELB | §8.1 Aenderungen in WIKI_SCOPE_KATALOG noetig, niedriger Aufwand. |

---

## 10. Quellen

- `weitergehts-online/docs/befunde/WIKI_SCOPE_KATALOG_v3-12_PILOT_2026-04-11.md` (R0.4, Test-Basis)
- `weitergehts-online/docs/befunde/M-03_REIFE_MATRIX_v3-12_2026-04-11.md` (R0.1, Reife-Kontext fuer QUELLENKRITIK-Pflicht-Einsatz)
- Testrun-Calls:
  - `mcp__wikipedia__get_summary`, `mcp__wikipedia__search_wikipedia`
  - `mcp__wikimedia-image-search__wikimedia_search_images` (9 Queries)
  - WebFetch auf `de.wikipedia.org/wiki/Schlieffen-Plan`, `de.wikipedia.org/wiki/Erste_Schlacht_an_der_Marne`, `de.wikipedia.org/wiki/Alfred_von_Schlieffen`, `de.wikipedia.org/wiki/Westfront_(Erster_Weltkrieg)`, `de.wikipedia.org/wiki/Taxis_von_der_Marne` (404), `de.wikipedia.org/wiki/Taxis_von_der_Marne_(1914)` (404)
- `github.com/Rudra-ravi/wikipedia-mcp` README (via WebFetch)
