# Workflow v3: Wikipedia-Anker + Artefakt-Pipeline + Tafelbild-Professionalisierung + Subagenten-Architektur

**Datum:** 2026-03-26 (v3)
**Basiert auf:** v2.1 (2026-03-25)
**Ersetzt:** WORKFLOW_v2.md (v2.1)
**v3 Aenderungen:** Tafelbild-Professionalisierung — AGENT_TAFELBILD als Phase 0.4 (nach SKRIPT), SKRIPT-Wortbudget 600-900 W/Chunk, Tafelbild-Entwurf aus SKRIPT entfernt, TB als fixierter Input fuer MATERIAL
**v2.1 Aenderungen:** Learnings aus Mappe-1-Deployment (Commit 5153466) — Download-Fix, Q-Gate-Enforcement, JSON-Validierung, Prozessoptimierung
**Kern-Prinzip:** Inhaltliche Kohaerenz zuerst — vom Wikipedia-Artikel zum schulernahen Skript zum Tafelbild zum Material
**Kanonisch fuer:** Agenten-Reihenfolge, Phasenstruktur, Artefakt-Definitionen, Schnittstellen

---

## 1. Warum v2/v3?

v1 hatte drei strukturelle Maengel, die sich im Testmappe-v1.1-Versuch manifestierten:

| Problem               | Symptom                                                  | Ursache                                                                               |
| --------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Token-Ineffizienz     | Kontextlimit nach wenigen Tool-Calls erreicht            | Recherche + Generierung + Assembly in einem Durchlauf                                 |
| Fehlende Zielklarheit | Tafelbild entsteht waehrend Design, nicht vorher         | Kein narrativ kohaerentes Inhaltsgeruest zwischen Didaktik-Rahmen und Material-Design |
| Blinde Recherche      | wikimedia/WebSearch liefert keine brauchbaren Ergebnisse | Kein Inhaltsanker — Suchbegriffe ohne Kontext                                         |

v2 loest alle drei durch eine vorgelagerte Inhaltsphase: Wikipedia als strukturierte Quelle → schulernahes Skript → Chunking in Mappen → gezielte Materialproduktion pro Mappe.

---

## 1b. v2.1 Learnings (Mappe-1-Deployment, 2026-03-25)

Das Mappe-1-Deployment (Commit 5153466) hat 7 Prozess-Learnings ergeben, die in v2.1 eingearbeitet sind:

| # | Learning | Problem | Fix in v2.1 |
|---|---|---|---|
| L1 | `curl` fuer Wikimedia-Downloads scheitert | Rate Limiting → 2 KB HTML-Fehlerseiten statt Bilder | Python `urllib` mit Bot-User-Agent + 2s Pausen als Pflichtmethode |
| L2 | Q-Gates nicht formal dokumentiert | Keine Nachvollziehbarkeit der Materialqualitaet | Q-Gate-Log als Pflicht-Output pro Material (siehe Phase 2.1) |
| L3 | Subagenten nicht als separate Iterationen | Materialqualitaet abhaengig vom Gesamtkontext | Explizite Dispatch-Sequenz: 1 Subagent pro Material-ID, Output isoliert |
| L4 | ARTEFAKT_INVENTAR nicht gelesen | Metadaten kamen indirekt | ARTEFAKT_INVENTAR als PFLICHT-Input in Uebergabe, vor Subagenten-Prompts |
| L5 | Deutsche Anfuehrungszeichen brechen JSON | `„"` nicht JSON-kompatibel → 3 Validierungsfehler | JSON-Encoding-Regeln in SUB_QUELLENTEXT + SUB_TAGEBUCH + Validierung als Pflichtschritt |
| L6 | `quellenangaben[]` Engine-Support fehlt | Quellenangaben gehen verloren | Quellenangaben in Material-HTML einbetten (`<cite>`) statt separates Array |
| L7 | Parallele Subagenten statt sequentiell | Kein Problem, spart Token — aber Q-Gate muss trotzdem pro Material laufen | Parallele Ausfuehrung erlaubt, Q-Gate-Log trotzdem pro Material Pflicht |

### Prozess-Entscheidungen v2.1

**Download-Methode (verbindlich):**
```python
import urllib.request, time, os

def download_image(url, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    req = urllib.request.Request(url, headers={
        'User-Agent': 'WeitergehtsOnline/1.0 (https://weitergehts.online; paulcebulla@gmx.de)'
    })
    with urllib.request.urlopen(req) as resp:
        with open(path, 'wb') as f:
            f.write(resp.read())
    assert os.path.getsize(path) > 10_000, f"Download fehlgeschlagen: {path} ist {os.path.getsize(path)} Bytes"
    time.sleep(2)  # Rate-Limiting respektieren
```

**Q-Gate-Log-Format (verbindlich):**
```markdown
### Q-Gate: mat-{N}-{M}
| # | Pruefpunkt | Ergebnis | Detail |
|---|---|---|---|
| Q1 | [aus Subagent] | PASS/FAIL | [Begruendung bei FAIL] |
| Q2 | ... | ... | ... |
**Gesamt:** PASS / FAIL (Q{X} nachgebessert)
```

**JSON-Validierung (verbindlich):**
Nach Assembly von data.json: `python3 -c "import json; json.load(open('data.json'))"` als Pflichtschritt. Bei Fehler: Sonderzeichen identifizieren und durch ASCII/HTML-Entities ersetzen.

**Quellenangaben-Workaround:**
Bis Engine `quellenangaben[]` unterstuetzt: Quellenangabe als `<cite>`-Element am Ende des Material-`inhalt`-HTML einbetten. Format: `<cite>Quelle: [Urheber], [Lizenz]</cite>`.

---

## 2. Phasenstruktur im Ueberblick

```
PHASE 0: INHALTSGERUEST (einmalig pro Game)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AGENT_DIDAKTIK → AGENT_INHALT → AGENT_ARTEFAKT → AGENT_SKRIPT
  User-Validierung: PFLICHT (Externer Audit empfohlen)
  → AGENT_TAFELBILD                                          ← NEU v3
Output: Gechunktes Skript (600-900 W/Chunk) + ARTEFAKT_INVENTAR + Tafelbild pro Mappe (JSON + Hefteintrag)
Ort: Cowork (DIDAKTIK, SKRIPT, TAFELBILD) + Claude Code (INHALT, ARTEFAKT)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    │
                    ▼
PHASE 1: MATERIAL-GERUEST (einmalig pro Game)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AGENT_MATERIAL (Design-Modus)
Output: Pro Mappe: Materialtyp-Zuordnung + Erarbeitbarkeits-Nachweis
User-Validierung: PFLICHT
Ort: Cowork
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    │
                    ▼
PHASE 2: MAPPEN-PRODUKTION (sequentiell, pro Mappe)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase 2.1: Subagenten pro Materialtyp → Material-JSONs
  SUB_DARSTELLUNGSTEXT | SUB_QUELLENTEXT | SUB_TAGEBUCH
  SUB_ZEITLEISTE | SUB_BILDQUELLE
Phase 2.2: AGENT_RAETSEL → Aufgaben auf Basis fertiger Materialien
Phase 2.3: Assembly → data.json Abschnitt pro Mappe
Output: data.json Abschnitt pro Mappe (materialien + aufgaben + einstieg + sicherung + tafelbild)
User-Validierung: PFLICHT (nach jeder Mappe)
Ort: Claude Code
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    │
                    ▼
PHASE 3: IMPLEMENTIERUNG (pro Mappe oder gesammelt)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AGENT_TECHNIK → AGENT_DESIGN → AGENT_QUALITAET
Output: Funktionale Mappe im Browser
User-Validierung: PFLICHT (Externer Audit empfohlen)
Ort: Claude Code
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 3. Agenten-Rollen (v3)

### Neue Reihenfolge

```
AGENT_DIDAKTIK (Phase 0, Schritt 1)
    → Lehrplan-Verankerung, KE-Matrix, Mappen-Struktur, Schwierigkeitskurve
    │
    ▼
AGENT_INHALT (Phase 0, Schritt 2a)
    → Wikipedia-Recherche, Sachanalyse, Fakten-Extraktion
    │  MCP: wikipedia: get_article, get_sections, get_links, get_summary
    │
    ▼
AGENT_ARTEFAKT (Phase 0, Schritt 2b) ← NEU
    → Artikelstrukturierte Artefakt-Sichtung (Bilder, Zitate, Rollenprofile)
    │  API: MediaWiki action=parse (Sektionen + Bilder) via markdownify
    │  API: MediaWiki action=query&prop=imageinfo (Metadaten, Lizenzen, URLs)
    │  Output: ARTEFAKT_INVENTAR (qualifizierte Artefakte mit Self-Hosting-Daten)
    │
    ▼
AGENT_SKRIPT (Phase 0, Schritt 3)
    → Lineares, schulernahes Skript (Jugendsachbuch-Stil, 600-900 W/Chunk)
    → Chunking in Mappen entlang DIDAKTIK-Struktur
    → Kein Tafelbild-Entwurf (v3: entfaellt — TB wird von AGENT_TAFELBILD erstellt)
    │
    ▼
AGENT_TAFELBILD (Phase 0, Schritt 4) ← NEU v3
    → Synthese-Extrakt aus SKRIPT: Quintessenz des Lernzuwachses pro Mappe
    → Dualer Output: JSON (knoten + verbindungen + merksatz) + Hefteintrag (80-120 W)
    → Guetekriterien G1-G13 (docs/checklisten/GUETEKRITERIEN_TAFELBILD.md)
    → Wird zur fixierten Zielstruktur fuer AGENT_MATERIAL
    │
    ▼
AGENT_MATERIAL (Phase 1)
    → Materialtyp-Zuordnung pro Mappe-Chunk (inkrementell)
    → Artefakt-Referenzen aus SKRIPT auswerten
    │
    ▼
Materialtyp-Subagenten (Phase 2.1) ← NEU
    → SUB_DARSTELLUNGSTEXT | SUB_QUELLENTEXT | SUB_TAGEBUCH
    → SUB_ZEITLEISTE | SUB_BILDQUELLE
    → Jeweils eigener Prompt: docs/agents/AGENT_SUB_*.md
    │
    ▼
AGENT_RAETSEL (Phase 2.2)
    → Aufgaben zu konkreten Materialien
    │
    ▼
AGENT_TECHNIK + AGENT_DESIGN + AGENT_QUALITAET (Phase 3)
    → Implementierung, Styling, Test
```

### Rollenprofil-Veraenderungen v1 → v3

| Agent | v1 | v2 | Aenderung |
|---|---|---|---|
| DIDAKTIK | KE-Matrix + didaktische Leitlinien (Ebene 0) | KE-Matrix + Mappen-Grobstruktur + Schwierigkeitskurve (Phase 0, Schritt 1) | **Vorgeschaltet** — laeuft VOR INHALT, gibt Zielstruktur vor |
| INHALT | Sachanalyse aus Schulbuch/TUVs/Web (Ebene 0) | Wikipedia-basierte Sachanalyse mit strukturiertem Output (Phase 0, Schritt 2a) | **Wikipedia-MCP** als primaere Quelle, Output geht an ARTEFAKT + SKRIPT |
| ARTEFAKT | — | **NEU.** Artikelstrukturierte Artefakt-Sichtung + Qualifizierung (Phase 0, Schritt 2b) | **Neuer Agent** — loest blinde Bildrecherche + Self-Hosting |
| SKRIPT | — | **NEU.** Schreibt lineares Skript + chunked es (600-900 W/Chunk, kein TB-Entwurf) | **Schluesselrolle** — Primaerquelle fuer TB-Extraktion + Material-Ableitung |
| TAFELBILD | — | **NEU v3.** Synthese-Extrakt aus SKRIPT (Phase 0.4), JSON + Hefteintrag | **Neuer Agent** — Eigenes Q-Gate (G1-G13), fixierte Zielstruktur fuer MATERIAL |
| MATERIAL | Design (Ebene 1) + Produktion (Ebene 2) | Design (Phase 1) + Dispatch an Subagenten (Phase 2). TB ist fixierter Input (v3). | **Entlastet** — Produktionsarbeit geht an Subagenten, TB-Detaillierung entfaellt |
| RAETSEL | Arbeitet auf MATERIAL-Output (Ebene 2) | Arbeitet auf konkreten Materialien (Phase 2) | Unveraendert |
| TECHNIK/DESIGN/QUALITAET | Ebene 3 | Phase 3 | Unveraendert |

---

## 4. Phase 0: Inhaltsgeruest

### Schritt 0.1: AGENT_DIDAKTIK

**Eingabe:** Thema + Lehrplanbezug + Jahrgangsstufe + Mappen-Anzahl

**Aufgabe:**
1. Kompetenzerwartungen (KE) aus Fachlehrplan extrahieren
2. KE den Mappen zuordnen (KE-Matrix)
3. Mappen-Grobstruktur festlegen (Titel, thematischer Schwerpunkt pro Mappe)
4. Schwierigkeitskurve definieren (AFB-Progression ueber Mappen)
5. Didaktische Leitlinien formulieren (Altersangemessenheit, Multiperspektivitaet, ethische Grenzen)

**Output:** `DIDAKTIK_RAHMEN_[game-id].md`

```markdown
# Didaktischer Rahmen: [Game-Titel]

## KE-Matrix
| Mappe | KE | Thematischer Schwerpunkt |
|---|---|---|
| 1 | KE1.1, KE1.2 | [Titel + Schwerpunkt] |
| 2 | KE2.1 | [Titel + Schwerpunkt] |
| ... | ... | ... |

## Schwierigkeitskurve
| Mappe | AFB-Schwerpunkt | Prozessbezogene Kompetenz |
|---|---|---|
| 1 | I-II | Erkenntnisse gewinnen |
| ... | ... | ... |

## Didaktische Leitlinien
- [Prinzip 1]
- [Prinzip 2]
```

### Schritt 0.2a: AGENT_INHALT

**Eingabe:** DIDAKTIK_RAHMEN + Thema

**Aufgabe:**
1. Wikipedia-Hauptartikel zum Thema abrufen (`wikipedia: get_article`)
2. Artikelstruktur erfassen (`wikipedia: get_sections`)
3. **Quellen-Ergiebigkeit pruefen:** Wenn Hauptartikel < 5 Absaetze ODER keine Unterartikel verfuegbar → Fallback-Pfad (siehe unten)
4. Vertiefungsartikel identifizieren (`wikipedia: get_links`)
5. Pro Mappe (gemaess DIDAKTIK-Struktur) relevante Sektionen und Vertiefungsartikel lesen
6. Fakten, Chronologie, Akteure, Fachbegriffe, Zahlen extrahieren
7. **Wikimedia-Artefakte funktional dokumentieren:** Bilder, Karten, Illustrationen aus Wikipedia-Artikeln mit Dateiname, Lizenz und Einbettungsvorschlag erfassen (`wikimedia_search_images` fuer gezielte Suche)
8. **Originalzitate extrahieren:** Historische Zitate aus Wikipedia-Artikeln mit Sprecher, Wortlaut, Kontext und Quellenangabe erfassen
9. **Rollenprofile fuer Tagebuch-Material recherchieren:** Historisch belegte Personengruppen/Schicksale identifizieren, die als Basis fuer personifizierte Materialien dienen (keine fiktiven Rollen, sondern Wikipedia-belegte Lebensrealitaeten)

**Fallback-Pfad (wenn Wikipedia unzureichend):**

| Stufe | Bedingung | Aktion |
|---|---|---|
| 1 | Wikipedia-Hauptartikel duenn (< 5 Absaetze) | Verwandte Artikel ueber `get_links` + `get_summary` pruefen; ggf. uebergeordneten Artikel nutzen |
| 2 | Auch verwandte Artikel duenn | WebSearch + `markdownify: webpage-to-markdown` fuer ergaenzende Quellen |
| 3 | Auch WebSearch ergiebislos | User informieren: "Quellenlage fuer Mappe N duenn. Manuelle Quellenbereitstellung empfohlen." Im INHALTSBASIS-Output dokumentieren. |

**MCP-Tools:**
- `wikipedia: get_article` — Hauptartikel
- `wikipedia: get_sections` — Struktur
- `wikipedia: get_links` — Vertiefung
- `wikipedia: get_summary` — Kurzfassungen fuer Unterartikel
- `wikipedia: extract_key_facts` — Fakten-Extraktion
- `markdownify: webpage-to-markdown` — Fallback fuer Nicht-Wikipedia-Quellen

**Output:** `INHALTSBASIS_[game-id].md`

```markdown
# Inhaltsbasis: [Game-Titel]

## Wikipedia-Quellen
- Hauptartikel: [URL]
- Vertiefungsartikel: [URLs]

## Pro Mappe (gemaess DIDAKTIK-Struktur):

### Mappe [N]: [Titel]
#### Fakten und Chronologie
- [Fakt 1 mit Quellenangabe]
- [Fakt 2]

#### Akteure
- [Akteur 1: Rolle, Relevanz]

#### Fachbegriffe
| Begriff | Definition | Kontext |
|---|---|---|

#### Zahlen/Daten (fuer Statistik-Material)
- [Datensatz 1 mit Quelle]

#### Wikimedia-Artefakte (funktional)

| ID | Typ | Beschreibung | Wikimedia-Dateiname | Lizenz | Einbettungsvorschlag |
|---|---|---|---|---|---|
| img-[N]-1 | karte/foto/illustration | [Was zeigt das Bild?] | File:[Dateiname] | [CC-BY-SA/PD/...] | [Welcher Materialtyp? Welcher Skript-Absatz?] |

#### Zitate (aus Wikipedia extrahiert)

| ID | Sprecher | Wortlaut | Kontext | Wikipedia-Quelle (Artikel + Sektion) | Eignung |
|---|---|---|---|---|---|
| zit-[N]-1 | [Name, Rolle] | "[Originalwortlaut oder altersgerechte Paraphrase]" | [Historischer Kontext, 1 Satz] | [Artikel, Sektion] | [quellentext / einstieg / sicherung] |

#### Rollenprofile (fuer Tagebuch-Material)

| ID | Rolle | Historische Basis | Typische Erfahrung | Wikipedia-Beleg | Mappe-Eignung |
|---|---|---|---|---|---|
| rolle-[N]-1 | [z.B. Bauersfrau, Diplomat, Soldat] | [Belegstelle in Wikipedia] | [Was erlebt diese Person im Kontext der Mappe?] | [Artikel, Sektion] | [Mappe N] |

#### Recherche-Hinweise
- Quellenqualitaet: [Wikipedia-gestuetzt | WebSearch-gestuetzt | manuell ergaenzt]
- Gute Quellenlage fuer: [Aspekt X, Aspekt Y]
- Duenne Quellenlage fuer: [Aspekt Z — AGENT_SKRIPT markiert als LUECKE]
- Besonders ergiebige Wikipedia-Artikel: [Artikel-Titel]
```

### Schritt 0.2b: AGENT_ARTEFAKT ← NEU

**Eingabe:** INHALTSBASIS (Artikel-Liste) + DIDAKTIK_RAHMEN + Tafelbild-Entwuerfe aus SKRIPT (oder aus DIDAKTIK bei Erstdurchlauf)

**Aufgabe:**
1. **Artikelstruktur laden:** Fuer jeden Wikipedia-Artikel aus INHALTSBASIS die Sektionen via MediaWiki API abrufen (`action=parse&prop=sections`)
2. **Bilder pro Sektion sichten:** Fuer jede thematisch relevante Sektion die eingebetteten Bilder abrufen (`action=parse&section=N&prop=images`). Template-/UI-Bilder filtern.
3. **Metadaten qualifizieren:** Fuer jeden Bild-Kandidaten Lizenz, Urheber, Beschreibung, Thumbnail-URL via MediaWiki API abrufen (`action=query&prop=imageinfo`). CC-BY-NC verwerfen.
4. **Didaktisch bewerten:** Tafelbild-Zuordnung, Informationsgehalt, Altersangemessenheit pruefen. Bewertung: QUALIFIZIERT / RESERVE / VERWORFEN.
5. **Rollenprofile und Zitate sichten:** Aus Artikelsektionen historisch belegte Personengruppen und Originalzitate extrahieren.
6. **Self-Hosting-Daten dokumentieren:** Thumbnail-URL + Breite + MIME-Typ fuer jeden Download in Phase 3.

**API-Calls (alle via `markdownify: webpage-to-markdown` als Proxy):**

| Zweck | URL-Template |
|---|---|
| Sektionen | `https://en.wikipedia.org/w/api.php?action=parse&page={TITLE}&prop=sections&format=json` |
| Bilder pro Sektion | `https://en.wikipedia.org/w/api.php?action=parse&page={TITLE}&section={INDEX}&prop=images&format=json` |
| Bild-Metadaten | `https://en.wikipedia.org/w/api.php?action=query&titles=File:{FILENAME}&prop=imageinfo&iiprop=url\|extmetadata\|size\|mime&iiurlwidth={WIDTH}&format=json` |

**Kernprinzip:** Strukturierte Sichtung entlang der Artikel-Sachstruktur. KEIN `wikimedia_search_images` als Primaermethode. Fallback-Suche nur mit konkreten Eigennamen aus Artikeln, dokumentiert und begruendet.

**Output:** `ARTEFAKT_INVENTAR_[game-id].md` — Vollstaendiges Verzeichnis aller qualifizierten Artefakte (img-IDs mit Metadaten, rolle-IDs, zit-IDs). Aktualisiert ausserdem die INHALTSBASIS mit qualifizierten Artefakt-Tabellen.

**Prompt-Datei:** `docs/agents/AGENT_ARTEFAKT.md`

---

### Schritt 0.3: AGENT_SKRIPT

**Eingabe:** DIDAKTIK_RAHMEN + INHALTSBASIS + ARTEFAKT_INVENTAR

**Aufgabe:**
1. Lineares, schulernahes Skript schreiben (Stil: Jugendsachbuch)
   - Durchgaengige narrative Kohaerenz (kein Stichpunkt-Aggregat)
   - Zielgruppe R7 Mittelschule: Kurze Saetze, konkrete Beispiele, Fachbegriffe erklaert
   - Chronologische und/oder thematische Logik
   - Alle Fakten aus INHALTSBASIS einarbeiten
   - Lernziele aus DIDAKTIK_RAHMEN im Blick behalten

2. Skript in Mappen-Chunks aufteilen
   - Entlang der Mappen-Grobstruktur aus DIDAKTIK_RAHMEN
   - Sandwich-Methode: Erkenntnisse aus Mappe N im Einstieg Mappe N+1 aufgreifen
   - Ueberlappungszonen explizit markieren

3. **Artefakte aus INHALTSBASIS im Skript positionieren**
   - Wikimedia-Artefakte (img-IDs) an der narrativ passenden Stelle im Text referenzieren
   - Zitate (zit-IDs) dort einbetten, wo sie die Argumentation stuetzen
   - Rollenprofile (rolle-IDs) dem Chunk zuordnen, in dem die Perspektive narrativ passt
   - Marker-Format: `[ARTEFAKT: id | Typ-Kandidat | Kurzbeschreibung]`
   - Das SKRIPT ist damit die Primaerquelle fuer AGENT_MATERIAL: Alle Material-Entscheidungen leiten sich aus den positionierten Artefakten + Skript-Passagen ab

4. Chunking-Qualitaet pruefen
   - Jeder Chunk ist inhaltlich abgeschlossen (eigenstaendige Erkenntnis)
   - Jeder Chunk endet mit einem klaren Tafelbild-Ziel
   - Progression ueber Chunks ist erkennbar (aufbauend, nicht redundant)

**Output:** `SKRIPT_[game-id].md`

```markdown
# Skript: [Game-Titel]

## Gesamtnarrativ
[2-3 Saetze: Worum geht es insgesamt?]

---

## Chunk 1: [Mappe-1-Titel]

### Einstieg-Kontext
[Wo stehen die SuS? Was wissen sie schon?]

### Skript-Text
[Linearer, schulernaher Text, 600-900 Woerter]
[Alle Fachbegriffe bei Erstverwendung erklaert]
[Konkrete Beispiele, Personifizierungen, Zahlen eingewoben]
[Absaetze nummeriert: §1, §2, ... (fuer Traceability)]
[ARTEFAKT-Marker inline an narrativ passender Stelle]

### Artefakt-Zuordnung
| ID | Typ-Kandidat | Skript-Ref | Beschreibung |
|---|---|---|---|
| img-1-1 | karte | §3-4 | Europakarte Buendnisse 1914 |
| zit-1-1 | quellentext | §2 | Buelow: "Platz an der Sonne" |
| rolle-1-1 | tagebuch | §1/§5 | [Rollenprofil: Beschreibung] |

### Sandwich-Uebergang zu Chunk 2
[1-2 Saetze: Was wird in Chunk 2 aufgegriffen?]

---

## Chunk 2: [Mappe-2-Titel]
[...]
```

**Qualitaets-Gate AGENT_SKRIPT:**
- [ ] Skript narrativ kohaerend (kein Stichpunkt-Aggregat)?
- [ ] Alle Fakten aus INHALTSBASIS eingearbeitet?
- [ ] Fachbegriffe bei Erstverwendung erklaert?
- [ ] Saetze ≤20 Woerter, Absaetze ≤5 Saetze?
- [ ] Jeder Chunk inhaltlich abgeschlossen?
- [ ] Sandwich-Uebergaenge vorhanden?
- [ ] KE aus DIDAKTIK_RAHMEN abgedeckt?
- [ ] Alle Wikimedia-Artefakte aus INHALTSBASIS im Skript positioniert (Artefakt-Zuordnungstabelle)?
- [ ] Alle Zitate aus INHALTSBASIS im Skript positioniert oder begruendet ausgeschlossen?
- [ ] Jeder Chunk hat mindestens 1 Rollenprofil-Zuordnung fuer Tagebuch-Material?

**User-Validierung (Phase 0 — SKRIPT):**
- Lehrkraft prueft fachwissenschaftliche Korrektheit
- Lehrkraft prueft didaktische Reduktion (zu komplex? zu vereinfacht?)
- Lehrkraft prueft Mappen-Aufteilung und Progression
- Externer Audit empfohlen (Fachkollege)

---

### Schritt 0.4: AGENT_TAFELBILD ← NEU v3

**Eingabe:**
- SKRIPT_[game-id].md (Phase 0.3, validiert)
- DIDAKTIK_RAHMEN (Phase 0.1 — KE-Matrix, Sicherungsziel pro Mappe)
- ARTEFAKT_INVENTAR (Phase 0.2b — qualifizierte Artefakte)
- GUETEKRITERIEN_TAFELBILD (docs/checklisten/GUETEKRITERIEN_TAFELBILD.md)
- Vorheriges Tafelbild (ab Mappe 2 — fuer Progression G9)

**Aufgabe:**
1. Pro Mappe die Quintessenz des Lernzuwachses aus dem SKRIPT-Chunk extrahieren
2. Knoten + Verbindungen als JSON-Struktur definieren (max. 10 Knoten, G2)
3. `skript_referenz` direkt setzen: `"[Chunk-ID, §N]"` (SKRIPT liegt vor)
4. Erarbeitbarkeits-Pruefung gegen SKRIPT: DIRECT / ARTIFACT / INFERENTIAL Entscheidungsbaum
5. Kernerkenntnisse (1-3 Saetze, Mappe-Ebene) + Merksatz pro Knoten formulieren
6. Hefteintrag verfassen (80-120 Woerter, halbe DIN-A5-Seite)

**Output:** `TAFELBILD_[game-id]_Mappe[N].md` — Dualer Output:
- **JSON-Repraesentation:** knoten[] (mit merksatz), verbindungen[], voraussetzungen[], kernerkenntnisse[]
- **Hefteintrag:** Strukturskizze + "Merke:"-Block

**Q-Gate:** 13 Kriterien (G1-G13) aus GUETEKRITERIEN_TAFELBILD.md. 6 MUSS, 4 SOLL, 3 KANN. Maschinelle Prueflogik in Abschnitt 8 der Guetekriterien.

**TB-FREEZE-Regel:** Nach Q-Gate PASS ist das Tafelbild eingefroren. AGENT_MATERIAL darf keine Knoten hinzufuegen, entfernen oder inhaltlich aendern. Eskalation: `[TB-REVISION NOETIG: kN-M — Grund]` → User-Entscheidung.

**Ort:** Cowork

**Prompt-Datei:** `docs/agents/AGENT_TAFELBILD.md`

---

## 5. Phase 1: Material-Geruest

### AGENT_MATERIAL (Design-Modus)

**Eingabe:** Validiertes SKRIPT (gechunkt, mit Artefakt-Zuordnungen) + TAFELBILD pro Mappe (fixiert, aus Phase 0.4)

**Vorgehen:** Inkrementell pro Mappe (Mappe 1 → Validierung → Mappe 2 → ...). Das spart Token und ermoeglicht fruehes Feedback.

**Aufgabe:** Pro Mappe-Chunk evaluieren:
1. Artefakt-Marker aus SKRIPT auswerten (img-IDs, zit-IDs, rolle-IDs → Materialtyp-Zuordnung)
2. Skript-Passagen auf zusaetzliche Material-Trigger pruefen (Skript-basierte Auswahllogik, siehe AGENT_MATERIAL.md)
3. Material-Entwuerfe skizzieren (Titel, Typ, Funktion, Tafelbild-Zuordnung, Artefakt-Referenz)
4. **Erarbeitbarkeits-Verifizierung** (v3): Tafelbild ist fixiert (TB-FREEZE). Fuer jeden TB-Knoten nachweisen, dass konkretes Material die Erarbeitung ermoeglicht. Keine Knoten hinzufuegen/aendern. Bei Nicht-Abdeckung: `[TB-REVISION NOETIG: kN-M — Grund]`
5. Erarbeitbarkeits-Nachweis fuehren
6. Einstieg und Sicherung entwerfen (Sicherung = Verweis auf Hefteintrag + Reflexionsimpuls)

**Aufgaben-Skizze:** Wird NICHT in Phase 1 erstellt. Aufgaben werden erst nach Phase 2 (Material final produziert und formatiert) entwickelt, da sie auf tatsaechlich existierende Material-Stellen referenzieren muessen.

**Output:** `MATERIAL_GERUEST_[game-id]_Mappe[N].md` (ein Dokument pro Mappe)

**Output-Format:**

```markdown
# Material-Geruest: Mappe [N] — [Titel]

## Tafelbild-Abdeckung (v3: TB ist fixiert)

Quelle: TAFELBILD_[game-id]_Mappe[N].md (Phase 0.4, eingefroren nach Q-Gate PASS)

| TB-Knoten | Material-ID | Erarbeitungsweg | Status |
|---|---|---|---|
| k[N]-1: [Text] | mat-[N]-1 | [Wie SuS den Knoten erschliessen] | ABGEDECKT |
| k[N]-2: [Text] | mat-[N]-2 | [Wie SuS den Knoten erschliessen] | ABGEDECKT |
| k[N]-3: [Text] | — | — | [TB-REVISION NOETIG: Grund] |

**TB-FREEZE:** Keine Knoten hinzufuegen/aendern/entfernen. Bei Nicht-Abdeckung: Eskalation an User.

## Material-Entwurf

| ID | Typ | Titel | Skript-Absatz | Tafelbild-Knoten | Artefakt-Ref | Quelle/Erstellung | W-Ref |
|---|---|---|---|---|---|---|---|
| mat-[N]-1 | darstellungstext | [Titel] | §1-2 | k[N]-1, k[N]-2 | — | AGENT schreibt | W-1 |
| mat-[N]-2 | bildquelle | [Titel] | §3 | k[N]-2 | img-[N]-1 | wikimedia | W-3 |
| mat-[N]-3 | quellentext | [Titel] | §4 | k[N]-3 | zit-[N]-1 | Wikipedia-Zitat | W-2 |
| mat-[N]-4 | tagebuch | [Titel] | §1/§5 | k[N]-1 | rolle-[N]-1 | AGENT schreibt | W-7 |

Mindest-Materialien: 4 (1 darstellungstext, 1 Quelle/Bild, 1 personifiziert, 1 visuell)

## Erarbeitbarkeits-Nachweis

| Tafelbild-Knoten | Material | Erarbeitungsweg |
|---|---|---|
| k[N]-1: [Text] | mat-[N]-1 (Abs. 1-2) | SuS lesen Sachtext, extrahieren Kernbegriff |
| k[N]-2: [Text] | mat-[N]-2 (Bildquelle) + mat-[N]-1 (Abs. 3) | SuS analysieren Bild, vergleichen mit Text |
| k[N]-3: [Text] | mat-[N]-3 (Quellentext) | SuS erschliessen Wirkung aus Originalquelle |

## Einstieg und Sicherung

### Einstieg
Typ: [narrativ | szenario | rueckblick]
Text: [2-3 Saetze, Narrativ-Rahmen + Leitfrage]

### Sicherung (v3: Hefteintrag-Verweis)
Typ: [zusammenfassung | reflexion | transfer]
Hefteintrag: Verweis auf TAFELBILD_[game-id]_Mappe[N].md — Hefteintrag-Sektion
Reflexionsimpuls: [1 Satz: Was hat sich an deinem Bild von ... veraendert?]
Ueberleitung: [1-2 Saetze]
```

**User-Validierung:** Materialtyp-Zuordnung, Artefakt-Referenzen, Erarbeitbarkeits-Nachweis (TB-Abdeckung), Einstieg/Sicherung pruefen. Keine Aufgaben in Phase 1. Tafelbild ist fixiert — nur Abdeckungs-Verifizierung, keine Detaillierung.

---

## 6. Phase 2: Mappen-Produktion

### Sequentielles Vorgehen

Mappe N wird vollstaendig produziert und validiert, bevor Mappe N+1 beginnt. Das verhindert Fehlerfortpflanzung und ermoeglicht iteratives Lernen.

### Phase 2.0: Bild-Download (Self-Hosting) ← NEU v2.1

**VOR** der Material-Produktion muessen alle Bilder lokal vorliegen. Download-Methode ist verbindlich (siehe Sektion 1b).

```
Fuer jedes img-ID im ARTEFAKT_INVENTAR (Status: QUALIFIZIERT):
  1. Download via Python urllib mit Bot-User-Agent
  2. Speichern unter assets/img/{game-id}/{img-id}.{ext}
  3. Dateigroesse pruefen (> 10 KB)
  4. 2 Sekunden Pause vor naechstem Download
  5. Bei Fehler: RESERVE-Bild versuchen, Finding dokumentieren
```

**VERBOTEN:** `curl` fuer Wikimedia-Downloads (429 Rate Limiting).

### Phase 2.1: Material-Produktion (Subagenten)

Jeder Materialtyp hat einen spezialisierten Subagenten mit eigenem Prompt, Qualitaets-Gate und Output-Format.

#### Pflicht-Inputs (Lesereihenfolge)

1. **ARTEFAKT_INVENTAR** — Qualifizierte Bilder mit lokalen Pfaden, Lizenzen, Metadaten
2. **MATERIAL_GERUEST** — Materialtyp-Zuordnung, Tafelbild-Knoten, Erarbeitbarkeits-Nachweis
3. **Subagenten-Prompts** (AGENT_SUB_*.md) — Produktionsregeln pro Materialtyp
4. **SKRIPT** (relevanter Chunk) — Textgrundlage
5. **INHALTSBASIS** — Fakten, Zitate, Rollenprofile

#### Subagenten-Uebersicht

| Subagent | Prompt-Datei | Materialtypen | Eingabe (neben MATERIAL_GERUEST) |
|---|---|---|---|
| SUB_DARSTELLUNGSTEXT | `AGENT_SUB_DARSTELLUNGSTEXT.md` | darstellungstext | SKRIPT-Chunk, Tafelbild-Knoten |
| SUB_QUELLENTEXT | `AGENT_SUB_QUELLENTEXT.md` | quellentext (echte Quellen) | INHALTSBASIS Zitat-Daten, SKRIPT-Kontext |
| SUB_TAGEBUCH | `AGENT_SUB_TAGEBUCH.md` | quellentext (fiktiv, aus Rollenprofil) | INHALTSBASIS Rollenprofil, SKRIPT-Kontext |
| SUB_ZEITLEISTE | `AGENT_SUB_ZEITLEISTE.md` | zeitleiste | SKRIPT-Chronologie, INHALTSBASIS-Fakten |
| SUB_BILDQUELLE | `AGENT_SUB_BILDQUELLE.md` | bildquelle (inkl. Karten) | ARTEFAKT_INVENTAR Bild-Metadaten |

#### Dispatch-Ablauf (pro Mappe) — v2.1

```
Schritt 0: Bilder herunterladen (Phase 2.0, siehe oben)

Fuer jedes mat-ID im MATERIAL_GERUEST:
  1. Materialtyp bestimmen → Subagent waehlen
  2. Eingabe-Paket zusammenstellen:
     - mat-ID + Artefakt-Ref + SKRIPT-Passage + Tafelbild-Knoten
     - Fuer bildquelle: lokaler Pfad + Lizenz + Urheber aus ARTEFAKT_INVENTAR
  3. Subagent ausfuehren → Material-JSON-Objekt erhalten
  4. Q-GATE LOG SCHREIBEN (Pflicht, Format siehe Sektion 1b)
  5. Bei FAIL: 1 Nachbesserungsiteration, dann Finding dokumentieren
  6. Bei PASS: Material in materialien[] aufnehmen
  7. Parallele Ausfuehrung mehrerer Subagenten ERLAUBT (Token-Effizienz)
     ABER: Q-Gate-Log MUSS trotzdem pro Material einzeln geschrieben werden

Nach allen Materialien:
  8. Quellenangaben: als <cite>-Elemente in Material-HTML einbetten (kein separates Array)
  9. Einstieg + Sicherung ausformulieren
  10. Tafelbild-JSON finalisieren
  11. JSON-VALIDIERUNG: python3 -c "import json; json.load(open('data.json'))" (PFLICHT)
```

#### JSON-Encoding-Regeln (v2.1)

| Zeichen | Problem | Loesung |
|---|---|---|
| `„` (U+201E) | Nicht JSON-kompatibel | Durch `"` (U+0022) ersetzen oder HTML-Entity `&#8222;` |
| `"` (U+201C) | Nicht JSON-kompatibel | Durch `"` (U+0022) ersetzen oder HTML-Entity `&#8220;` |
| `–` (U+2013) | Kann Probleme machen | Durch `--` oder `&#8211;` ersetzen |
| Alle >U+007F | Potentiell problematisch | Im Zweifel: HTML-Entities verwenden |

#### Engine-Typ-Mapping (Subagent-Output → data.json)

| Subagent-Output-Typ | data.json `typ` | Begruendung |
|---|---|---|
| darstellungstext | `darstellungstext` | Nativ |
| quellentext | `quellentext` | Nativ |
| tagebuch | `quellentext` | Engine kennt keinen Tagebuch-Renderer |
| zeitleiste | `zeitleiste` | Nativ |
| bildquelle | `bildquelle` | Nativ |
| karte | `bildquelle` | Engine kennt keinen Karten-Renderer |

#### Ausfuehrungsort

Claude Code. Der Uebergabe-Prompt referenziert die Subagenten-Prompts und orchestriert den Dispatch-Ablauf.

### Phase 2.2: AGENT_RAETSEL (Aufgaben-Produktion)

Arbeitet auf den konkreten, produzierten Materialien aus Phase 2.1. `material_referenz` zeigt auf tatsaechlich existierende Material-IDs mit finalen Inhalten.

**Eingabe:**
- Fertige materialien[] aus Phase 2.1
- MATERIAL_GERUEST (Tafelbild-Knoten-Zuordnung)
- `_meta.erschliessungsimpuls` aus SUB_BILDQUELLE (fuer Bild-Aufgaben)
- `_meta.quellenkritische_impulse` aus SUB_QUELLENTEXT (fuer Quellen-Aufgaben)

**Aufgabe:** Pro Mappe 3-5 Aufgaben erstellen, die:
- Auf konkrete Material-Stellen referenzieren (material_referenz + Absatz/Zeile)
- Tafelbild-Knoten pruefen (jeder Knoten mindestens 1x in einer Aufgabe)
- Aufgabentyp-Vielfalt sicherstellen (nicht nur Multiple-Choice)
- Freischalt-Code generieren

### Phase 2.3: Assembly + Quellenangaben

Nach Abschluss von Subagenten (2.1) und Raetsel (2.2):
1. Alle Material-JSONs in materialien[] zusammenfuehren
2. Alle Aufgaben-JSONs in aufgaben[] zusammenfuehren
3. Quellenangaben aus allen Subagenten-Outputs in quellenangaben[] aggregieren
4. Einstieg{}, Sicherung{}, Tafelbild{} finalisieren
5. Freischalt-Code setzen

**Output:** Vollstaendiger data.json-Abschnitt fuer diese Mappe.

### User-Validierung pro Mappe

Nach jeder fertigen Mappe: Browser-Test + inhaltliche Pruefung. Pruefpunkte:

1. Materialqualitaet (Inhalt, Sprache, Quellenangaben)
2. Aufgaben-Material-Match (jede Aufgabe referenziert existierendes Material)
3. Tafelbild-Vollstaendigkeit (alle Knoten durch Material erarbeitbar)
4. **Sandwich-Konsistenz:** Stimmt der Sandwich-Uebergang zur naechsten Mappe noch mit dem tatsaechlichen Sicherungs-Tafelbild ueberein? Falls das Tafelbild gegenueber dem SKRIPT-Entwurf geaendert wurde: Einstieg der naechsten Mappe anpassen.

Erst nach PASS → naechste Mappe.

---

## 7. Phase 3: Implementierung

Unveraendert gegenueber v1:
- AGENT_TECHNIK: HTML-Generierung, Engine-Integration, data.json Assembly
- AGENT_DESIGN: CSS, Responsive, Material-Typ-Styles
- AGENT_QUALITAET: Browser-Test, Lehrplan-Abdeckung, Erarbeitbarkeit

Kann pro Mappe oder gesammelt nach allen Mappen laufen (Entscheidung nach erstem Durchlauf).

---

## 8. Externe Audits

| Audit-Punkt | Wer | Wann | Prueft was |
|---|---|---|---|
| Skript (Phase 0) | Lehrkraft + opt. Fachkollege | Nach AGENT_SKRIPT, vor Phase 1 | Fachwiss. Korrektheit, didaktische Reduktion, Vollstaendigkeit |
| Material-Geruest (Phase 1) | Lehrkraft | Nach AGENT_MATERIAL Design, vor Phase 2 | Materialtyp-Passung, Aufgaben-Skizzen, Progression |
| Fertige Mappe (Phase 2+3) | Lehrkraft + opt. Schueler-Test | Nach jeder Mappe | Materialqualitaet, Aufgaben-Material-Match, UX |
| Prozessdesign | Softwareentwickler | Bei Bedarf | Technische Machbarkeit, Schnittstellen, Skalierbarkeit |

---

## 9. Abgrenzung zu v1

| Aspekt | v1 (WORKFLOW_v1.md) | v2 (dieses Dokument) |
|---|---|---|
| Phasenstruktur | 4 Ebenen (Game-Rahmen, Mappe-Blueprint, Produktion, Implementierung) | 4 Phasen (Inhaltsgeruest, Material-Geruest, Mappen-Produktion, Implementierung) |
| Inhaltsquelle | WebSearch + markdownify (unstrukturiert) | Wikipedia-MCP (strukturiert) |
| Zwischen-Artefakt | Inhalts-MDs (Kernaussagen-Listen) | SKRIPT (linearer Jugendsachbuch-Text, gechunkt) |
| Schluessel-Agent | AGENT_MATERIAL (monolithisch) | AGENT_SKRIPT (neu) + Subagenten |
| Didaktik-Timing | Parallel zu INHALT | VOR INHALT (gibt Zielstruktur vor) |
| Mappen-Erstellung | Potenziell parallel | Strikt sequentiell mit User-Validierung |
| Bildrecherche | Blind (Keyword-Suche) | Strukturiert (Artikel-Sektionen → eingebettete Bilder → Metadaten-Qualifizierung) |
| Bild-Hosting | Hotlink auf Wikimedia-CDN (429-Fehler) | Self-Hosting in assets/img/ (Download in Phase 3) |
| Artefakt-Agent | — | AGENT_ARTEFAKT (Phase 0, Schritt 2b) — dedizierte Sichtung + Qualifizierung |

### Was aus v1 uebernommen wird

- data.json Schema (materialien[], aufgaben[], einstieg{}, sicherung{}, quellenangaben[])
- Material-Typen (darstellungstext, quellentext, bildquelle, karte, zeitleiste, statistik, tagebuch)
- Tafelbild-Datenmodell (knoten[], verbindungen[], voraussetzungen[])
- Qualitaetsspezifikationen pro Materialtyp (AGENT_MATERIAL.md)
- MCP-Tool-Workflows W-1 bis W-8 (AGENT_MATERIAL.md)
- Engine + Template (escape-engine.js, theme-gpg.css, etc.)
- Wortbudgets, Quellenangaben-Standard, Erarbeitbarkeits-Nachweis

### Was aus v1 ersetzt wird

- Vier-Ebenen-Terminologie → Phasen-Terminologie
- INHALT-Output (Inhalts-MDs) → SKRIPT-Output (gechunktes Skript)
- MATERIAL als monolithischer Produzent → MATERIAL als Designer + Dispatcher
- Agenten-Parallelitaet DIDAKTIK/INHALT → Strikt sequentiell DIDAKTIK → INHALT → SKRIPT

---

## 10. Referenz-Dokumente

| Dokument | Relevanz |
|---|---|
| `docs/architektur/WORKFLOW_v1.md` | Vorgaenger — data.json Schema, Material-Typen, Engine-Spezifikationen bleiben gueltig |
| `docs/agents/AGENT_MATERIAL.md` | MCP-Tool-Workflows W-1 bis W-8, Qualitaetsspezifikationen pro Materialtyp |
| `docs/agents/AGENT_ARTEFAKT.md` | Neuer Agent — Artikelstrukturierte Artefakt-Sichtung + Self-Hosting (Phase 0, Schritt 2b) |
| `docs/agents/AGENT_SKRIPT.md` | Skript-Erstellung + Chunking (600-900 W/Chunk, kein TB-Entwurf) |
| `docs/agents/AGENT_TAFELBILD.md` | Synthese-Extrakt aus SKRIPT (Phase 0.4), JSON + Hefteintrag, Q-Gate G1-G13 |
| `docs/agents/AGENT_SUB_DARSTELLUNGSTEXT.md` | Subagent — Sachtext-Produktion (Phase 2.1) |
| `docs/agents/AGENT_SUB_QUELLENTEXT.md` | Subagent — Quellentext-Aufbereitung (Phase 2.1) |
| `docs/agents/AGENT_SUB_TAGEBUCH.md` | Subagent — Fiktive Tagebucheintraege (Phase 2.1) |
| `docs/agents/AGENT_SUB_ZEITLEISTE.md` | Subagent — Zeitleisten-Strukturierung (Phase 2.1) |
| `docs/agents/AGENT_SUB_BILDQUELLE.md` | Subagent — Bildquellen-Aufbereitung (Phase 2.1) |
| `docs/agents/ORCHESTRATOR.md` | Gesamtkoordination (v3 aktualisiert) |
| `docs/checklisten/MCP_TOOLS.md` | Vollstaendige MCP-Tool-Dokumentation |
| `docs/architektur/flowchart-status-quo.mermaid` | Flowchart v1 (fuer Vergleich) |
| `docs/architektur/flowchart-neuausrichtung.mermaid` | Flowchart v2 (veraltet — v3-Flowchart ausstehend) |
