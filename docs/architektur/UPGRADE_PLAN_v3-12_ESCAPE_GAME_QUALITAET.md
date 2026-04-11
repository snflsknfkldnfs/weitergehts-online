# UPGRADE PLAN v3.12 — Escape-Game-Qualitaet (Runden-Architektur)

**Anlass:** `BEFUND_LIVE_SICHTUNG_G2_M1_2026-04-10.md` (8 Findings, systemisch bestaetigt durch Parallel-Sichtung Game 1/Ursachen) + `SCOPING_v3-12_QUELLEN_UND_OPTIONEN_2026-04-10.md` v2.1 + `AUDIT_FACHDIDAKTIK_v3-12_2026-04-11.md` + User-Entscheidungen zu 18 offenen Fragen am 2026-04-11.

**Zweck:** Operativer Upgrade-Plan, der die SCOPING-Entscheidungen in eine Runden-Architektur mit klaren Abhaengigkeiten, Scopes, Exit-Kriterien und Risiko-Gates uebersetzt. **Kein Scoping mehr, sondern Ausfuehrungsvorlage.**

**Status:** VORSCHLAG v1 — 2026-04-11. Wartet auf User-Freigabe der Runden-Struktur. Offene Detail-Fragen in §8.

**Abgrenzung:** Der Plan schreibt NICHT die konkrete Implementierungs-Reihenfolge innerhalb einer Runde vor. Innerhalb einer Runde bleibt die Claude-Code-Seite (escape-game-generator) frei in der taktischen Umsetzung. Der Plan setzt nur Scope, Artefakte, Gates und Runden-Reihenfolge.

**Dual-Root-Scope:** Der Plan adressiert beide Repos: `escape-game-generator/` (Verträge, Sub-Agenten, Schemata, Phasen) UND `weitergehts-online/` (Engine `assets/escape-engine.js`, Live-Site, Dokumente). Engine-Eingriffe sind pro Runde markiert.

---

## 0. Ausgangslage und zentrale Entscheidungen

### 0.1 Was bereits entschieden ist (User 2026-04-11)

Die 18 Fragen aus SCOPING v2.1 §6 sind beantwortet. Tabellierte Fassung:

| # | Frage | Entscheidung | Quelle |
|---|---|---|---|
| 1 | Upgrade-Runden-Struktur | **Mehrere Runden, intelligent aufgeteilt** | User |
| 2 | M-01 Q-Gate-Enforcement-Audit | **Teil von v3.12** | User |
| 3 | M-03 Sub-Agent-Reife-Programm | **Voraussetzung fuer v3.12** | User |
| 4 | M-02 Phase 3.3 Live-Sichtung | **Optional, als Stop-Hinweis im ORCHESTRATOR, nicht als harte Phase** | User |
| 5 | Retroaktive Fixes bestehender Games | **Nein — Games werden neu generiert, nicht patched** | User |
| 6 | Phase 0.2.M (O-02-E) Verankerung | **Ausfuehrliche eigene Phase** (Vor-/Nachteile in §4 dieses Plans) | User |
| 7 | Umlaut-Fragetyp-Identifikation | **Im Implementierungs-Track, Retrofit wie fuer andere Typen** | User |
| 8 | O-01-E Dualistische Stundenfrage | **Ja, wie im Scoping vorgesehen** | User |
| 9 | Quellen-Authentizitaet als Top-Norm | **Ernst nehmen — aber Fiktions-Lizenz bleibt (didaktischer Wert von Personifizierung)** | User |
| 10 | Rollen-Doppel-Figuren | **Real belegte implizit bevorzugen, Loesungsprobleme in Check halten** | User |
| 11 | Alibi-Medien-Schutz | **NICHT kategorisch ausschliessen — dekorative Medien haben didaktische Funktionen (motivational, setting-lock-in, evokativ)** | User |
| 12 | Operator-Transparenz | **Sichtstruktur vs. Tiefenstruktur — Operator-Nennung nur wenn sie SuS nicht befremdet, sonst implizit; Operator = Bruecken-Fragment Sichtstruktur ↔ Tiefenstruktur** | User |
| 13 | Beutelsbach §3 als Prueflinse | **Nur konstruktiv, fliesst in Stundenfrage-Formulierung ein, blockt nicht** | User |
| 14 | Escape-Mechanik-Umbau (O-07-P-C) | **Variante (a): Antwort-Abgabe genuegt, Musterloesung danach** | User |
| 15 | Portraet-Fallback bei Fiktion | **Variante (b): Fiktive Figuren ohne Portraet zulaessig, Stilbruch akzeptiert** | User |
| 16 | Parallele Sichtung Game 1 | **Erfolgt — Befunde sind systemisch bestaetigt** | User |
| 17 | M-03 Reife-Matrix Timing | **Intelligent im Prozessablauf — wird in diesem Plan vor Rundenzerlegung platziert (Runde 0)** | Plan-Vorschlag |
| 18 | Wikipedia-Artikel-Scope O-02-E | **Zwei Scopes: Kern-Artikel (Text) + erweiterter Medien-Scope (tiefer, ggf. ohne Text-Uebernahme)** | User |

### 0.2 Architektonische Grundprinzipien v3.12

Drei Muster ziehen sich durch den gesamten Plan:

1. **Sichtstruktur ↔ Tiefenstruktur-Dualismus.** Eingeführt in Achse A (Stundenfrage `narrativ`/`operational`), wird zum wiederverwendbaren Pattern fuer jede Stelle, an der didaktisches Backend-Kriterium und SuS-sichtbares Frontend auseinanderfallen. Anwendung in mindestens: Stundenfrage (F-01), Aufgabe-7 (F-08), Operator-Nennung (F-12 Antwort). F-03 Titel bleibt monistisch typ-spezifisch.

2. **Funktionale Legitimation statt Form-Verbot.** Gilt fuer Medien (Antwort 11), fuer Fiktive Figuren (Antwort 9/10), fuer Operator-Nennung (Antwort 12). Kein Element wird kategorisch ausgeschlossen, wenn es eine dokumentierte didaktische Funktion erfuellt. **Begruendungspflicht** ersetzt **Form-FAIL**.

3. **Neu generieren statt patchen.** Legacy-Games (Marne, Ursachen) bleiben im alten Zustand. v3.12 zielt auf neue Generierungs-Laeufe. Das **eliminiert S1 (Vertrags-Retrograd-Bruch)** als Blocker — die Scoping-Warnung "bricht bestehende Games" ist nicht mehr relevant. Alle Verträge koennen haerter gezogen werden, ohne Legacy-Kompatibilitaet zu wahren.

### 0.3 Was dieser Plan NICHT leistet

- Keine Zeitschaetzung pro Runde
- Keine Personal-Zuweisung
- Keine Entscheidung zur Implementierungs-Reihenfolge **innerhalb** einer Runde
- Keine harten Daten fuer v3.12-Live-Go
- Keine neue Erzaehlerstimmen-Policy jenseits von Fiktions-Lizenz (Details in §8 Detail-Fragen)

---

## 1. Runden-Architektur — Uebersicht

Der Plan gliedert v3.12 in **9 Runden** (0 bis 8). Runden 0-1 sind Vor-Arbeiten, Runde 2 ist Infrastruktur-Gate, Runden 3-6 sind die fachdidaktischen Achsen, Runde 7 ist Enforcement-Framework, Runde 8 ist optionale Live-Sichtungs-Verankerung.

```
Runde 0 (Audits)  ──┬──► Runde 2 (Infrastruktur-Gate) ──┬──► Runde 3 (Achse A)
                    │                                    ├──► Runde 4 (Achse C)
Runde 1 (Bugfix)  ──┤                                    └──► Runde 5 (Achse B)
                    │                                                │
                    └──► Runde 6 (Feedback-First, engine-seitig, parallel)
                                            │
                                            ▼
                                Runde 7 (Enforcement-Framework)
                                            │
                                            ▼
                                Runde 8 (Optionale Sichtungs-Stops)
```

**Kritische Pfade:**

- **B.0-Gate:** Runde 2 muss vollstaendig fertig sein bevor Runden 3-5 starten koennen. Runde 2 enthaelt alle Schema-Erweiterungen (medien_katalog, QuellentextMehrstimmen, Portraet-Feld, info_box), die von den Policy-Runden konsumiert werden. Ohne Runde 2 operieren 3-5 auf Altschemata.
- **Reife-Matrix-Gate:** Runde 5 (Achse B) braucht das M-03-Reife-Programm, das in Runde 2 abgeschlossen wird. Wer Runde 5 vor Runde 2 zieht, laeuft in unreife Sub-Agenten.
- **Parallele Engine-Spur:** Runde 6 (Feedback-First) ist engine-seitig (weitergehts-online/assets) und kann parallel zu Runden 2-5 laufen. Nur die Integration ins Test-Game erfolgt nach Runde 5.
- **Enforcement-Abschluss:** Runde 7 braucht alle Gate-Definitionen aus Runden 2-6. Sie kann parallel zu Runden 3-6 entwickelt werden, wird aber erst dort vollstaendig, wo die neuen Gates (QUELL-INTEGRITAET, MED-FUNKTION etc.) definiert sind.

---

## 2. Runde 0 — Audits & Voraussetzungen (Vor-Arbeit)

**Zweck:** Diagnose-Track. Keine Code-Aenderungen am Generator oder Engine. Ergebnis ist ein Satz Audit-Artefakte, die Runde 2 als Input konsumiert.

**Scope-Repos:** Nur lesend — `escape-game-generator/` und `weitergehts-online/` (Live-Games als Referenz fuer Sichtung-Konsolidierung).

**Arbeitspakete:**

1. **M-03 Sub-Agent-Reife-Matrix erstellen.** Pro Sub-Agent in `escape-game-generator/agents/SUB_*.md` eine Ampel-Bewertung auf fuenf Kriterien:
   - (i) Engine-Rendering existiert und funktioniert
   - (ii) Asset-Pipeline angebunden (Wikimedia, commons)
   - (iii) In mindestens einem Live-Game aktiv verwendet
   - (iv) Template-Beispiele vorhanden
   - (v) Q-Gate-Durchlauf-Log dokumentiert
   Output: `docs/befunde/M-03_REIFE_MATRIX_v3-12_2026-04-XX.md` mit Ampel-Tabelle + pro roten/gelben Sub-Agenten eine konkrete Reife-Aufgabenliste.

2. **Umlaut-Fragetyp-Identifikation.** Code-Lese der `SUB_AUFGABE_*.md`-Dateien und `architektur/Q-GATE-MECHANIK.md`. Identifizieren: welche zwei Fragetypen haben den Umlaut-Fix nicht erhalten? Hypothesen-Verifikation: CER-Freitext (SUB_AUFGABE_BEGRUENDUNG) und Multi-Begriff-Transfer (SUB_AUFGABE_FREITEXT). Output: Kurz-Addendum an `docs/befunde/BEFUND_LIVE_SICHTUNG_G2_M1_2026-04-10.md` mit den zwei Fragetyp-Namen, betroffenen Dateien und Retrofit-Checkliste.

3. **Konsolidierung Parallel-Sichtung Game 1.** User hat bereits Game 1 (Ursachen) gesichtet und die Befunde als systemisch bestaetigt. Dieser Schritt konsolidiert die bereits erhobenen Erkenntnisse in ein kurzes Vergleichs-Dokument. Output: `docs/befunde/VERGLEICH_G1_G2_SICHTUNG_2026-04-XX.md` — eine Seite, die pro F-LS-M1-Finding bestaetigt oder differenziert, ob es auch in G1 auftrat.

4. **Wikipedia-Artikel-Scope-Katalog fuer Ersttest.** Fuer das geplante v3.12-Erstgame (vermutlich Marne-Remake oder neues Thema, User-Entscheidung offen) werden die Kern-Artikel (Text-Scope) und der erweiterte Medien-Scope (tiefer, spezialisierte Wikipedia-Artikel fuer Medien-Extraktion) konkret benannt. Dient Runde 2 als Referenz-Datenpunkt fuer die Phase-0.2.M-Implementierung.

**Gates:**
- **G-0-1:** Reife-Matrix liegt vor und identifiziert mindestens die Sub-Agenten KARTE/ZEITLEISTE/STATISTIK als unreif (Hypothese aus Scoping §2 F-02).
- **G-0-2:** Zwei Umlaut-bug-behaftete Fragetypen sind eindeutig benannt.
- **G-0-3:** Vergleichs-Dokument G1/G2 bestaetigt Systemizitaet.

**Exit:** Alle vier Artefakte im Repo committet. Keine offenen Diagnose-Fragen mehr, die Runde 2 blockieren.

**Risiko:** Wenn die Reife-Matrix zeigt, dass auch vermeintlich reife Sub-Agenten Luecken haben (TAGEBUCH, QUELLENTEXT), vergroessert sich das M-03-Reife-Programm in Runde 2. Plan-Anpassung muss moeglich sein.

---

## 3. Runde 1 — v3.11.1 Bugfix-Bundle (parallel zu Runde 0)

**Zweck:** Chirurgische Einzelfixes mit niedrigem Risiko, unabhaengig vom grossen v3.12-Umbau. Diese Fixes sind sofort wirksam, werden aber wegen User-Entscheidung 5 (keine retroaktiven Patches) nicht in Legacy-Games eingespielt — sie wirken ab der naechsten Game-Generierung.

**Scope-Repo:** `escape-game-generator/` (keine Engine-Aenderungen).

**Arbeitspakete:**

1. **Umlaut-Retrofit** fuer die zwei in Runde 0 identifizierten Fragetypen. Uebernimmt den Fix-Mechanismus, den andere Fragetypen bereits haben (Template-Saeuberung, Fuzzy-Match-Whitelist). Begruendung Retrofit-Scope: reiner Propagations-Bug.

2. **O-07-U-A Phase-0-Vertraege auf UTF-8.** Ersetzt die Zeile *"Sprache: Deutsch, Umlaute als ae/oe/ue (Dateikompatibilitaet)"* in allen vier Phase-0-Vertraegen (`VERTRAG_PHASE_0-1_DIDAKTIK.md:123`, `0-2_INHALT.md:142`, `0-3_SKRIPT.md:166`, `0-4_HEFTEINTRAG.md:169`). Neu: *"Sprache: Deutsch, Umlaute als echte UTF-8 (ä/ö/ü/ß)."*.

3. **O-07-U-D Template-Saeuberung global.** ASCII-Beispiele in `SUB_AUFGABE_*.md`, `STOP_DEFAULT`-Listen in `Q-GATE-MECHANIK.md:207-220` auf UTF-8 umstellen.

4. **O-07-U-B Script-Checker als Gate.** Neuer `tools/typ-check-aufgaben.sh`-Checker, der gegen ASCII-Ersatz-Muster in allen Aufgaben-Feldern grept. Whitelist fuer legitime ASCII-Vorkommen (Eigennamen, Fachbegriffe, Lehnwoerter).

5. **O-03-A Schema-Description-Fix.** `material-output-schema.json:139-143` Description von `"Soll als Frage formuliert sein (SuS-aktivierend)"` auf typ-agnostische Formulierung umstellen.

6. **O-03-B Typ-spezifische Titel-Pattern.** `Titel-Pattern`-Feld in jedem `SUB_MATERIAL_*.md` einfuehren. Tagebuch: `"Tagebucheintrag von {figur.name}, {figur.rolle}"` oder `"Aus dem Tagebuch des {figur.rolle} {figur.name}"`. Bei fiktiven Figuren: `"Moegliches Tagebuch von..."` oder aehnliche Fiktions-Markierung (Rueckverweis auf Runde 4 Fiktions-Klausel). Quellentext-Einzelstimme: `"[Rolle] [Name] zu [Thema]"`. Darstellungstext: Frage erlaubt. Bildquelle: Kontextsatz.

**Gates:**
- **G-1-1:** UTF-8-Checker laeuft auf einem Test-Aufgaben-Artefakt gruen durch.
- **G-1-2:** Typ-spezifische Titel-Pattern sind in allen vier SUB_MATERIAL_-Dateien dokumentiert.

**Exit:** Commits auf escape-game-generator mit `v3.11.1` oder aehnlichem Tag. Bugfixes greifen ab naechster Game-Generierung.

**Risiko:** Niedrig. Runde 1 ist in sich abgeschlossen und kann notfalls zurueckgerollt werden ohne Auswirkung auf den Rest von v3.12.

**Abhaengigkeit:** Wartet auf **G-0-2** (Umlaut-Fragetyp-Identifikation) aus Runde 0. Ansonsten parallel zu Runde 0 moeglich.

---

## 4. Runde 2 — v3.12a Infrastruktur-Basis (kritischer Gate)

**Zweck:** Alle Schema-Erweiterungen, die neue Phase 0.2.M und das M-03-Reife-Programm. **Diese Runde ist Gate fuer die Achsen-Runden 3-5.** Kein Policy-Umbau kann starten, bevor Runde 2 die Datenschicht bereitgestellt hat.

**Scope-Repos:** `escape-game-generator/` (Schemata, neue Phase, Sub-Agenten-Reife) + `weitergehts-online/assets/escape-engine.js` (Engine-Seite fuer neue Material-Subtypen und `info_box`, aber nur Rendering-Grundgerust, kein Policy-Verhalten).

**Arbeitspakete:**

1. **Phase 0.2.M als formale State-Machine-Sub-Phase.** Neue Sektion in `escape-game-generator/PROJECT_INSTRUCTIONS.md` (State-Machine): Phase 0.2 INHALT wird erweitert um 0.2.M MEDIEN_EXTRAKTION als eigene Sub-Phase. Neuer Vertrag `architektur/vertraege/VERTRAG_PHASE_0-2-M_MEDIEN-EXTRAKTION.md` mit den Pflichten: Input = Wikipedia-Artikel-Liste aus 0.2, Output = `medien_katalog_mappe_{N}.json`, Abschluss-Gate = mindestens drei qualifizierte Medien-Kandidaten pro Mappe. Begruendung fuer eigene Phase: (i) Medien-Qualitaet ist immens wichtig (User), (ii) Medien-Extraktion ist konzeptionell eigenstaendige Operation (Recherche + Qualifizierung), (iii) spaetere Optimierung der Extraktion muss isoliert moeglich sein ohne INHALT- oder SKRIPT-Phase zu beruehren.

2. **Medien-Scope-Definition (Dual-Scope).** Umsetzung der User-Entscheidung 18. Phase 0.2.M fuehrt zwei Listen:
   - **Kern-Artikel-Liste** (aus Phase 0.2 INHALT uebernommen) — diese Artikel werden volltext-analytisch verarbeitet (Sachanalyse, Skript-Grundierung).
   - **Erweiterter Medien-Scope** — spezialisierte Wikipedia-Artikel, die nur fuer Medien-Extraktion durchsucht werden. Textinhalt wird explizit **nicht** in Sachanalyse/Inhaltsartefakt/Skript uebernommen (Token-Effizienz). Beispiel: Fuer eine Mappe zu "Verdun" koennte der Kern-Artikel `Schlacht um Verdun` sein, der erweiterte Medien-Scope zusaetzlich `Fort Douaumont`, `Mort Homme (Verdun)`, `Memorial de Verdun` (Denkmaeler).

3. **Output-Schema `medien_katalog_mappe.json`.** Schema-Skizze:
   ```json
   {
     "mappe_id": "M1",
     "kern_artikel": ["Schlacht_an_der_Marne", "..."],
     "erweiterter_medien_scope": ["Fort_X", "Denkmal_Y"],
     "medien": [
       {
         "id": "med-m1-01",
         "wikimedia_url": "...",
         "commons_license": "...",
         "caption_original": "...",
         "caption_de": "...",
         "themen_zuordnung": "marne_vorbereitung",
         "typ": "bildquelle | karte | statistik | zeitleiste | portraet | denkmal",
         "funktion": "analytisch | atmospherisch | evokativ | strukturierend",
         "funktions_begruendung": "...",
         "scpl_zone_empfehlung": "S | C | P | L",
         "quelle_artikel": "Schlacht_um_Verdun"
       }
     ]
   }
   ```
   Das Schema ist normativer Kontrakt — AGENT_MATERIAL zieht nur aus diesem Katalog.

4. **Neuer Sub-Agent `SUB_MEDIEN_EXTRAKTION.md`.** Oder Erweiterung von AGENT_INHALT/AGENT_MATERIAL, je nach Architektur-Entscheidung (siehe §8 Detail-Frage 4). Default in diesem Plan: eigener Sub-Agent, weil die Operation strukturell eigenstaendig ist. Der Sub-Agent iteriert pro Mappe durch Kern-Artikel + erweiterten Scope, extrahiert Medien-Kandidaten, qualifiziert sie (Commons-License-Check, Caption-Uebersetzung, Funktions-Vorschlag), schreibt sie in den Katalog.

5. **Schema-Erweiterung `material-output-schema.json`.**
   - Neuer `oneOf`-Subtyp `QuellentextMehrstimmen` mit Feldern `{stimmen: [{sprecher, rolle, text, rekonstruiert, quelle, portraet?}]}`. Portraet-Subfeld enthaelt die O-05-E-Felder `{wikimedia_url, caption, commons_license, portraet_stil}`.
   - Erweiterung des Tagebuch-Subtyps um optionales Feld `figur_portraet` (gleiche Struktur wie stimmen[].portraet).
   - Neues optionales Top-Level-Feld `info_box: {titel, inhalt, zweck: "fachlicher_kontext" | "begriffsklaerung" | "weiterfuehrend"}`.
   - Neues optionales Feld `funktion` pro Material (fuer Runde 5 vorbereitend).

6. **Engine-Erweiterung (weitergehts-online).** `escape-engine.js` bekommt Rendering-Pfade fuer:
   - `QuellentextMehrstimmen`-Subtyp mit Portraet-Blockquote-Grid (passbild links/rechts, Quote rechts/links)
   - Tagebuch mit `figur_portraet` im Header
   - `info_box` als `<aside>`-Rendering (Schulbuch-Randspalte-Look)
   - Graceful Degradation: wenn `portraet` fehlt (fiktive Figur), wird ohne Portraet gerendert, Stilbruch akzeptiert (User-Entscheidung 15).

7. **AGENT_MATERIAL-Kopplung.** Sub-Agenten `SUB_MATERIAL_BILDQUELLE` / `SUB_MATERIAL_KARTE` / `SUB_MATERIAL_ZEITLEISTE` / `SUB_MATERIAL_STATISTIK` ziehen ihre Assets aus `medien_katalog_mappe.json`, nicht aus freier Wikimedia-Suche. Notfall-Branch: wenn Katalog fuer den geforderten Typ weniger als zwei Treffer hat, darf der Sub-Agent freie Suche ausfuehren, muss aber `_meta.fallback_begruendung` setzen (neues Gate MED-FALLBACK in Runde 7).

8. **M-03-Reife-Programm.** Auf Basis der Reife-Matrix aus Runde 0: pro als unreif markierten Sub-Agenten die fehlenden Reife-Kriterien schliessen:
   - Template-Beispiele nachziehen (auf Basis eines neuen Marne-Test-Games oder eines frisch generierten Test-Games)
   - Asset-Pipeline anbinden (ueber `medien_katalog`)
   - Q-Gate-Testlauf-Log erstellen
   - Engine-Rendering verifizieren
   Der genaue Scope der unreifen Sub-Agenten haengt von Runde 0 ab.

**Gates:**
- **G-2-1:** Neues Schema `medien_katalog_mappe.json` ist definiert und mit einem Test-JSON validiert.
- **G-2-2:** Phase 0.2.M ist in PROJECT_INSTRUCTIONS und als eigener Vertrag dokumentiert.
- **G-2-3:** `SUB_MEDIEN_EXTRAKTION` (oder Aequivalent) existiert als Sub-Agent-Datei.
- **G-2-4:** Schema-Erweiterung QuellentextMehrstimmen + Portraet + info_box ist in `material-output-schema.json` eingezogen und wird vom Engine gerendert (kleines Test-Material).
- **G-2-5:** Alle in Runde 0 als unreif markierten Sub-Agenten haben ihren Reife-Bericht aktualisiert (gruene Ampel oder explizit dokumentierte verbleibende Defizite).
- **G-2-6:** Ein Test-Durchlauf Phase 0.1 → 0.2 → 0.2.M → 2.1 laeuft auf einem kleinen Test-Thema durch (nicht das voll generierte Game, nur ein Durchstich).

**Exit:** Alle Schemata, Vertraege und Sub-Agenten sind aktualisiert. Der Test-Durchstich funktioniert. Runden 3-5 koennen starten.

**Risiko:** Hoch. Runde 2 ist die groesste Runde. Wenn ein Sub-Schritt (z.B. Engine-Rendering fuer Portraet-Grid) laenger dauert als erwartet, verzoegern sich alle Folge-Runden. **Fallback:** Engine-Rendering-Grid kann provisorisch als serielles Rendering ohne CSS-Grid umgesetzt werden (Portraet oben, Quote unten), waehrend das finale Grid-Layout in Runde 8 nachgezogen wird.

---

## 5. Runde 3 — v3.12b Stundenfrage + Operator-Dualismus (Achse A)

**Zweck:** Dualistische Stundenfrage-Architektur implementieren. Sichtstruktur/Tiefenstruktur-Pattern konsistent fuer Stundenfrage und Aufgabe 7.

**Scope-Repos:** `escape-game-generator/` (Phase-0.3 SKRIPT, Phase-0.4 HEFTEINTRAG, Phase-2.0 RAHMEN, Phase-2.2b AUFGABE, Sub-Agenten).

**Arbeitspakete:**

1. **Schema-Erweiterung Stundenfrage.** `stundenfrage` wird von String zu Objekt: `{narrativ: string, operational: string}`. Aenderung in allen betroffenen Schemata und in VERTRAG_PHASE_0-3_SKRIPT, 0-4_HEFTEINTRAG, 2-0_RAHMEN.

2. **AGENT-Umstellung.** AGENT_SKRIPT produziert beide Varianten. AGENT_DIDAKTIK kann beide aus der didaktischen Grobplanung ableiten (`narrativ` als motivational-biographische Frage, `operational` als Kompetenz-orientierte Operator-Frage). AGENT_HEFTEINTRAG zieht `narrativ` als Hefteintrag-Stundenfrage.

3. **Kongruenz-Judge O-01-A (weich).** LLM-Judge prueft: sind `narrativ` und `operational` semantisch kongruent? Weiche Pruefung, nicht deterministisch — Ausgabe `kongruenz_score: float` + `begruendung`. Score unter Schwelle → WARN (kein FAIL).

4. **Beutelsbach-§3-Judge (konstruktiv, User-Entscheidung 13).** Weicher Judge prueft `narrativ` gegen Schueler-Interessen-Kriterien: Biographisch-motivationaler Zugang? Aktualitaets-/Lebenswelt-Bezug? Identifikations-Potenzial? Ausgabe ist kein PASS/FAIL, sondern **Formulierungs-Feedback**, das in die naechste Formulierungs-Runde einfliesst. Der Judge ist somit Teil der **Formulierungs-Schleife**, nicht der Validierungs-Schleife. Anti-Pattern: Judge wird nicht zum SKILL-Gate, weil das wieder zu Beutelsbach-Instrumentalisierung fuehren wuerde.

5. **C1b-Umstellung.** Der C1b-Identitaetsconstraint wird von `einstieg.problemstellung === hefteintrag.stundenfrage` auf `operational === material_grounding_gate_target` umgestellt. `narrativ` bleibt frei formulierbar; das Grounding laeuft gegen `operational`.

6. **O-01-B Grounding-Lemma gegen operational.** Deterministische Lemma-Intersection zwischen `operational` und dem Material der Mappe bleibt Gate, zielt aber auf `operational` statt `narrativ`.

7. **F-08 Aufgabe 7 dualistisch.** Gleiches Pattern fuer die Abschluss-Aufgabe:
   - `aufgabe_7.fragestamm: {narrativ, operational}` oder vereinfacht: Aufgabe hat ein internes `operational_target` (fuer Gate/Pruefung) + ein `fragestamm_sichtbar` (fuer SuS).
   - `operational_target` traegt den Klieme-Operator explizit.
   - `fragestamm_sichtbar` folgt **Antwort 12**: Operator wird **nur dann woertlich** genannt, wenn er SuS nicht befremdet. Ansonsten bleibt der Operator implizit in der Frage-Formulierung.
   - Kopplung zu O-01-E: Aufgabe 7 leitet ihr `operational_target` aus `stundenfrage.operational` ab, nicht aus `stundenfrage.narrativ`.

8. **SUB_AUFGABE_FREITEXT Kurzregel praezisieren (O-08-D).** Die Kurzregel *"Operator NICHT woertlich benennen"* (SUB_AUFGABE_FREITEXT:243) wird umformuliert zu: *"Operator nur dann woertlich nennen, wenn er nicht befremdlich wirkt und das Auseinandersetzungs-Flow stuetzt. In jedem Fall traegt das interne `operational_target` den expliziten Operator."*. Das eliminiert den Widerspruch zwischen v1-Regel und Klieme-Transparenz-Forderung.

**Neue Q-Gates:**
- **G-SF-DUAL-01:** `stundenfrage.narrativ` und `stundenfrage.operational` sind beide vorhanden und nicht leer.
- **G-SF-DUAL-02:** Kongruenz-Score liegt ueber Schwelle (z.B. 0.7).
- **G-AUFG-7-OPT:** Aufgabe 7 hat ein `operational_target` gesetzt und der Fragestamm ist daraus abgeleitet.

**Gates fuer Runden-Exit:**
- **G-3-1:** Ein Test-Game mit kompletter dualistischer Stundenfrage laeuft durch Phasen 0.3, 0.4, 2.0, 2.2b ohne Vertragsverletzung.
- **G-3-2:** Beutelsbach-Judge gibt konstruktives Feedback auf einer Test-Stundenfrage, das keine Blockade ausloest.

**Abhaengigkeit:** Wartet auf **Runde 2 G-2-1...G-2-4** (Schema-Erweiterungen).

**Risiko:** Mittel. Dualistische Stundenfrage ist konzeptionell klar, aber das Nachziehen in alle AGENT-Dateien und Sub-Agenten ist Detail-Arbeit mit Fehler-Potenzial. **Fallback:** Wenn Kongruenz-Judge unreliable ist, als TYP-Cheker beibehalten mit manueller Pruefung als Option.

---

## 6. Runde 4 — v3.12c Quellen-Integritaet mit Fiktions-Klausel (Achse C)

**Zweck:** Pfad C-ABSCHAFFEN umsetzen — v3.6-Erzaehlerstimmen-Policy abschaffen — aber mit expliziter Fiktions-Lizenz (User-Entscheidungen 9, 10, 15).

**Scope-Repos:** `escape-game-generator/` (Sub-Agenten, Vertraege, Schemata). Engine-Seite ist in Runde 2 bereits auf info_box und QuellentextMehrstimmen vorbereitet.

**Arbeitspakete:**

1. **v3.6-Policy aus `SUB_MATERIAL_TAGEBUCH.md` abschaffen.** Die Zeilen 127ff (Erzaehler-Einschub-Policy) werden ersetzt durch: *"Tagebuch-`inhalt` enthaelt ausschliesslich Figuren-Stimme. Systemisches/kontextualisierendes Wissen wird in die `info_box` des Materials oder in ein separates Darstellungstext-Material ausgelagert."*. TYP-TB-PERSPEKTIV-Gate wird umgewidmet: prueft Quellenreinheit, nicht Existenz-des-Einschubs.

2. **Rollen-Doppel-Figuren als Grundmuster.** Pro Mappe standardmaessig zwei Identifikations-Figuren (Front/Heimat, Offizier/Gefreiter, Soldat/Angehoerige — abhaengig vom Thema). Real belegte Personen werden bevorzugt, nicht erzwungen (Antwort 10).

3. **Fiktions-Klausel (Antwort 9 + 15).** Fiktive Personifizierungen bleiben legitim wenn eine der drei Bedingungen erfuellt ist:
   - **B1:** Keine real belegte Person mit der gewuenschten Perspektive (z.B. einfacher Rheinland-Gefreiter mit dokumentierten Marne-Erlebnissen) ist in der Wikipedia-Artikel-Scope auffindbar.
   - **B2:** Das didaktische Lernziel erfordert eine Identifikations-Figur mit spezifischen Eigenschaften (Alter, Herkunft, sozialer Stand), die keine reale dokumentierte Person traegt.
   - **B3:** Die Fiktion dient dem Schutz von R7-Affektregulation (z.B. traumatische Einzelschicksale werden durch fiktive Verfremdung gedaempft).
   Pflicht-Kennzeichnung: `_meta.fiktiv: true`, `_meta.fiktions_begruendung: string` (welche Bedingung greift). Titel-Pattern bei fiktiven Figuren: `"Moegliches Tagebuch von..."` oder aehnliche explizite Fiktions-Markierung. Damit wird die User-Trennschaerfe Quelle/Darstellung trotz Fiktion gewahrt.

4. **Portraet-Differenzierung (Antwort 15).** Real belegte Figuren bekommen `figur_portraet` aus `medien_katalog`. Fiktive Figuren bleiben ohne Portraet — Stilbruch akzeptiert. Alternative: Optionaler Platzhalter-Silhouette mit Beschriftung `"Fiktionale Figur — keine historische Person"` (Design-Entscheidung in §8 Detail-Frage 1).

5. **O-05-A QuellentextMehrstimmen angewendet.** Mehrstimmige Quellentexte (wie F-LS-M1-05) verwenden jetzt den Schema-Subtyp. Jede Stimme traegt Sprecher-Attribution, Rolle, Text, `rekonstruiert: bool`, Quelle. Portraet optional (Runde 2 vorbereitet, hier angewendet).

6. **O-06-A info_box angewendet.** Materialien bekommen optional eine `info_box` fuer fachlichen Kontext (Schulbuch-Randspalte-Pattern). v3.6-Wissen wandert hier hinein.

7. **Typ-spezifische Titel-Pattern greifen.** Aus Runde 1 bereits eingefuehrt. Erweitert um Fiktions-Markierung.

8. **Neues Q-Gate `QUELL-INTEGRITAET`** (deterministisch). Regex-/Pattern-Checker auf `material.inhalt` (Tagebuch, Quellentext): Keine erzaehlerisch-systemischen Einschuebe (kursive `<em>`-Rahmen mit Sachinformation ueber die Figuren-Perspektive hinaus). Heuristik: `<em>`-Block mit externer Sachinformation → FAIL; rein emotional-subjektiver `<em>`-Einschub innerhalb einer Figuren-Reflexion → PASS.

9. **Figurenwahl-Schleife O-04-D.** AGENT_MATERIAL bekommt pro Mappe eine kleine Vorab-Entscheidungsschleife: "Gibt es eine real belegte Person mit der gewuenschten Perspektive im `medien_katalog` (ueber erweiterten Medien-Scope)?" — wenn ja, Figur mit Portraet; wenn nein, fiktive Figur mit `_meta.fiktiv` und Titel-Fiktions-Markierung.

**Gates:**
- **G-4-1:** `SUB_MATERIAL_TAGEBUCH` enthaelt keine Erzaehlerstimmen-Policy mehr.
- **G-4-2:** QUELL-INTEGRITAET-Gate ist definiert und laeuft auf einem Test-Material.
- **G-4-3:** Fiktions-Klausel ist in SUB_MATERIAL_TAGEBUCH und SUB_MATERIAL_QUELLENTEXT dokumentiert, inkl. `_meta.fiktiv`-Pflicht.
- **G-4-4:** Ein Test-Tagebuch mit real belegter Figur + Portraet und ein Test-Tagebuch mit fiktiver Figur + Fiktions-Markierung werden beide gruen durchgelassen.

**Abhaengigkeit:** Runde 2 (Schemata + info_box) und idealerweise Runde 3 (Stundenfrage-Dualismus wegen Stundenfrage-Grounding-Kopplung). Runde 4 kann aber auch parallel zu Runde 3 starten, wenn die Schema-Basis aus Runde 2 steht.

**Risiko:** Mittel. Die Fiktions-Klausel ist der delikate Punkt. Wenn sie zu locker formuliert ist, laesst sie die v3.6-Symptome zurueckkehren (Autoritaets-Verschiebung durch Erzaehler). Wenn sie zu streng ist, sperrt sie legitime didaktische Personifizierungen aus. **Mitigation:** In §8 Detail-Frage 1 wird der Fiktions-Gate vor Runde 4-Start praezisiert.

---

## 7. Runde 5 — v3.12d Medien-Diversitaet funktional (Achse B)

**Zweck:** Medien-Diversitaet themengesteuert, mit expliziter **funktionaler Legitimation** dekorativer Medien (User-Entscheidung 11).

**Scope-Repos:** `escape-game-generator/` (Phase 0.1 DIDAKTIK, AGENT_MATERIAL, Sub-Agenten, Q-Gates).

**Arbeitspakete:**

1. **O-02-D Phase-0.1 `medien_skizze`.** AGENT_DIDAKTIK bekommt neuen Pflicht-Output: pro Mappe eine `medien_skizze` mit Empfehlungen fuer Medien-Typen auf Basis der Mappen-Natur (geographisch → Karte empfohlen; Prozess/Verlauf → Zeitleiste empfohlen; quantitativ → Statistik empfohlen). Die Skizze ist Empfehlung, nicht Zwang.

2. **Kopplung zu `medien_katalog_mappe` (Phase 0.2.M).** `medien_skizze` wird Input fuer den Medien-Extraktions-Sub-Agenten. Der Extraktions-Sub-Agent priorisiert empfohlene Typen bei der Durchsuchung der Kern- und erweiterten Scope-Artikel.

3. **O-02-C Sub-Agent-Reife-Verifikation.** Auf Basis der Reife-Arbeit in Runde 2 wird hier final verifiziert, dass KARTE/ZEITLEISTE/STATISTIK-Sub-Agenten produktionsreif sind. Falls ein Sub-Agent weiterhin unreif ist, bleibt sein Medien-Typ im Fallback-Branch (mit WARN) und wird in einem Folge-Track nachgezogen.

4. **Funktionale Medien-Klassifikation (Antwort 11).** Pflicht-Feld `material.funktion: "analytisch" | "atmospherisch" | "evokativ" | "strukturierend"` + `material.funktions_begruendung: string`.
   - **analytisch:** Material fuer Auswertung, Quellenkritik, Kontextualisierung (klassisches Analyse-Material).
   - **atmospherisch:** Setting-Lock-in, Immersions-Stuetze, Epochen-Zugang. Dekorative Medien fallen legitim in diese Kategorie.
   - **evokativ:** Nachdenk-Anreger, Diskussions-Oeffnung, emotionale Verdichtung. Beispiel: Ein Foto eines einsamen Gedenksteins im Feld kann evokativ sein ohne explizite Analyse-Aufgabe.
   - **strukturierend:** Karten, Zeitleisten, Statistiken, Uebersichten — ordnen das Gesehene.
   Jedes Medium fuehrt genau eine Primaer-Funktion. Sekundaer-Funktionen moeglich, aber nicht Pflicht.

5. **O-02-A themenspezifisch (kein genereller `min 1 nicht-Text`-Zwang).** Neu formuliert:
   - **geographisch-raumbezogenes Mappen-Thema → mindestens ein Medium `typ=karte, funktion=strukturierend`**
   - **prozess-/verlaufsbezogenes Thema → mindestens ein Medium `typ=zeitleiste, funktion=strukturierend`**
   - **quantitativ-vergleichendes Thema → mindestens ein Medium `typ=statistik, funktion=strukturierend`**
   - **dramaturgisch-identifikatorisches Thema → mindestens ein Medium `funktion=atmospherisch` oder `funktion=evokativ`** (dekorative/motivationale Medien explizit zugelassen)
   Themen-Klassifikation stammt aus der `medien_skizze` in Phase 0.1.

6. **Alibi-Medien-Schutz als WARN (nicht FAIL).** Medium ohne dokumentierte `funktion` + `funktions_begruendung` → WARN. Falls ein Medium nach Sub-Agent-Logik zwar existiert aber keine Funktion zugewiesen bekommt, wird es gekennzeichnet und der Author muss die Funktion im Review nachtragen. **Kein harter FAIL**, um dekorative Medien nicht versehentlich auszuschliessen.

7. **Denkmal-Bruecke in Transfer-Zone.** Pro Mappe max ein Medium mit `typ=denkmal` wird in SCPL-L-Zone positioniert, idealerweise mit `funktion=evokativ`. Nicht Pflicht, aber empfohlen. Extraktions-Sub-Agent aus Runde 2 versucht pro Mappe ein Denkmal aus dem erweiterten Medien-Scope zu finden.

**Neue Q-Gates:**
- **G-MED-FUNKTION:** Jedes Material hat `funktion` und `funktions_begruendung`. WARN bei fehlender Begruendung, FAIL bei fehlender Funktion.
- **G-MED-TYP-THEMA:** Themenspezifische Typ-Anforderung ist erfuellt (basierend auf `medien_skizze`).
- **G-MED-FALLBACK:** Wenn Sub-Agent auf freie Wikimedia-Suche zurueckfaellt, ist `_meta.fallback_begruendung` gesetzt. FAIL wenn fehlt.

**Gates fuer Runden-Exit:**
- **G-5-1:** Test-Mappe mit mindestens zwei Medien-Funktionen (z.B. analytisch + atmospherisch) laeuft durch das neue Gate-Set.
- **G-5-2:** Denkmal-Bruecke ist in einer Test-Mappe positioniert.
- **G-5-3:** Alle Sub-Agenten KARTE/ZEITLEISTE/STATISTIK sind produktionsreif oder explizit als Fallback markiert.

**Abhaengigkeit:** Runde 2 (medien_katalog + M-03-Reife-Programm). Kann parallel zu Runde 4 starten.

**Risiko:** Mittel. Die Funktions-Klassifikation ist der kritische Punkt — wenn Sub-Agenten die Funktion mechanisch befuellen statt reflektiert, verliert die Klassifikation ihren didaktischen Wert. **Mitigation:** Funktions-Begruendung als Pflicht-Feld zwingt zu reflektierter Zuweisung. In §8 Detail-Frage 3 wird die Funktions-Klassifikation vor Runde 5-Start ggf. verfeinert.

---

## 8. Runde 6 — v3.12e Feedback-First-Policy (Achse D.2, engine-parallel)

**Zweck:** O-07-P-C implementieren. Escape-Mechanik wird umgebaut: Antwort-Abgabe genuegt, Musterloesung wird danach angezeigt (Variante a, Antwort 14).

**Scope-Repos:** Primaer `weitergehts-online/assets/escape-engine.js` + `assets/styles.css`. Sekundaer `escape-game-generator/` fuer Schema-Doku.

**Arbeitspakete:**

1. **Engine-Umbau Progressions-Logik.** `escape-engine.js` hat aktuell die Policy: "naechste Aufgabe erst nach korrekter Loesung". Umbau auf: "naechste Aufgabe nach Antwort-Abgabe". Progress-State wird von `{status: "correct" | "wrong" | "pending"}` auf `{status: "answered" | "pending", answer_value: string}` umgestellt.

2. **Musterloesungs-Anzeige.** Nach Antwort-Abgabe wird eine Feedback-Card angezeigt mit:
   - Die SuS-Antwort (editierbar, damit SuS sie mit der Musterloesung vergleichen kann)
   - Die Musterloesung (aus `aufgabe.loesung.claim` + `reasoning` + `evidence`)
   - Hinweis-Text: *"Vergleiche deine Antwort mit der Musterloesung. Gehe weiter, wenn du bereit bist."*
   - `Weiter`-Button entkoppelt von Richtig-/Falsch-Bewertung.

3. **CER-Schema bleibt.** Die interne Pruefung (semantisch, CER-basiert) bleibt in `aufgabe.loesung` gespeichert, fungiert aber jetzt als **Musterloesung**, nicht als Gate. Fuer die Lehrkraft-Evaluation (Backend, Post-Game-Review) bleibt die semantische Pruefung als Diagnose-Signal verfuegbar, aber nicht als SuS-Blocker.

4. **Pruef-Logik-Rueckbau.** `pruef_modus`-Feld (aus O-07-P-B geplant) wird **nicht** eingefuehrt. Feedback-First macht es obsolet.

5. **Legacy-Games Kompatibilitaet.** Engine-Umbau muss so geschehen, dass Legacy-Games (Marne, Ursachen) weiterhin funktionieren oder explizit auf dem alten Verhalten bleiben. **Empfehlung:** Engine-Flag `feedback_first_mode: bool` im `data.meta`-Objekt. Neue Games (v3.12) setzen es auf `true`, Legacy-Games ohne Flag laufen im alten Modus. So koennen Legacy-Games ohne Migration weiterlaufen, bis sie irgendwann neu generiert werden.

6. **Feedback-UI-Polish.** CSS fuer Feedback-Card. Optional: Icon/Color-Coding zur Orientierung (nicht als Fail-Marker, sondern als Info-Marker).

7. **Q-Gate-Anpassung.** `A-Pruefstrenge`-Gates (falls vorhanden) werden so angepasst, dass sie im Feedback-First-Modus die Pruefung als "Diagnose-Signal" behandeln, nicht als Gate-Gate.

**Gates:**
- **G-6-1:** Feedback-First-Mode laeuft auf einem Test-Game mit mindestens drei Aufgaben (verschiedene Typen).
- **G-6-2:** Legacy-Game (Marne) laeuft ohne Feedback-First-Flag im alten Modus weiter.
- **G-6-3:** Musterloesungs-Anzeige rendert CER-Schema korrekt.

**Abhaengigkeit:** Keine harte Abhaengigkeit zu Runden 2-5. Kann parallel laufen. Integration ins v3.12-Test-Game erfolgt nach Runde 5.

**Risiko:** Mittel-hoch. Der Engine-Umbau ist der groesste Non-Schema-Eingriff des ganzen Plans. **Fallback:** Wenn der Umbau komplexer als erwartet ist, kann als Interim ein einfacher "Antwort zeigen"-Button hinzugefuegt werden, der die aktuelle Fail-Mechanik umgeht, waehrend die volle Feedback-Card spaeter nachgezogen wird.

---

## 9. Runde 7 — v3.12f Enforcement-Framework (M-01)

**Zweck:** Q-Gate-Enforcement-Audit und Framework. Macht die neuen Gates aus Runden 3-6 und die bestehenden Gates deterministisch pruefbar.

**Scope-Repos:** `escape-game-generator/` (Tools, Vertraege, Q-Gate-Mechanik).

**Arbeitspakete:**

1. **Audit-Script `tools/q-gate-audit.sh`.** Liest `architektur/Q-GATE-MECHANIK.md` und pruef pro Gate, ob ein deterministischer Enforcer existiert. Output-Tabelle: `gate_id | enforcer_path | enforcer_type (script/sub-agent/llm-judge/none) | phase`.

2. **Framework-Runner `tools/q-gate-run.sh <phase> <artefakt>`.** Einheitlicher Einstiegspunkt zum Ausfuehren aller Gates einer Phase gegen ein Artefakt. Ersetzt die verstreuten Ad-Hoc-Checks.

3. **Phasen-Vertrags-Erweiterung.** Jeder Phasen-Vertrag bekommt Pflicht-Sektion `"Gate-Enforcement-Map"`, die pro Gate den Enforcer-Pfad dokumentiert. Gates ohne Enforcer werden reklassifiziert:
   - mit deterministischem Script-Enforcer → PASS/FAIL-Gate
   - mit Sub-Agent- oder LLM-Judge-Enforcer → WARN/PASS-Gate
   - ohne Enforcer → WARN-Only-Gate, rot markiert fuer spaetere Implementierung

4. **Neue Gates aus Runden 3-6 integrieren.** G-SF-DUAL-01/02, G-AUFG-7-OPT, QUELL-INTEGRITAET, G-MED-FUNKTION/TYP-THEMA/FALLBACK werden alle in Q-GATE-MECHANIK aufgenommen mit dokumentierten Enforcern.

5. **Alte Gates ohne Enforcer reklassifizieren.** TYP-01-A und aehnliche Gates aus dem Scoping §5.2 bekommen entweder einen neuen Enforcer oder werden explizit als WARN-Only markiert.

**Gates:**
- **G-7-1:** `q-gate-audit.sh` laeuft durch und produziert die Enforcer-Tabelle.
- **G-7-2:** Alle neuen Gates aus Runden 3-6 haben dokumentierte Enforcer.
- **G-7-3:** Jeder Phasen-Vertrag hat eine aktualisierte Gate-Enforcement-Map.

**Abhaengigkeit:** Kann parallel zu Runden 3-6 laufen. Wird erst **vollstaendig abgeschlossen**, wenn alle neuen Gates aus Runden 3-6 definiert sind.

**Risiko:** Niedrig-mittel. Hauptrisiko: die Audit-Tabelle zeigt mehr Luecken als erwartet. **Mitigation:** Plan-Vorschlag ist, Runde 7 nicht als Blocker fuer v3.12-Go zu definieren, sondern als *Voraussetzung fuer langfristige Nachhaltigkeit*. Einzelne WARN-Only-Gates duerfen in v3.12 bleiben.

---

## 10. Runde 8 — v3.12g Optionale Sichtungs-Stops (M-02 abgeschwaecht)

**Zweck:** M-02 als **optionale Stop-Hinweise** im ORCHESTRATOR verankern, nicht als harte Phase (User-Entscheidung 4).

**Scope-Repos:** `escape-game-generator/agents/ORCHESTRATOR.md` + `weitergehts-online/docs/checklisten/` (Sichtungs-Template).

**Arbeitspakete:**

1. **Stop-Hinweis-Punkte im ORCHESTRATOR.** Zwei Stops werden als **optionale** Breakpoints eingezogen:
   - **Stop A:** Nach Phase 3.1 DEPLOY-PREP, vor 3.2 LIVE-GO. Hinweis: *"Optional: Pre-Deploy-Sichtung. Du kannst das generierte Game lokal testen, bevor es live geht. Falls du keine Zeit hast, ueberspringe diesen Stop."*
   - **Stop B:** Nach Phase 3.2 LIVE-GO, vor 4.x NACHBEREITUNG. Hinweis: *"Optional: Post-Deploy-Sichtung nach dem Unterrichtseinsatz. Falls du Befunde fuer die naechste Upgrade-Runde sammeln willst, dokumentiere sie in SICHTUNG_TEMPLATE."*
   Beide Stops sind **skippable**. Der ORCHESTRATOR fragt nicht nach, sondern weist nur hin. User entscheidet pro Game.

2. **Sichtungs-Template `docs/checklisten/SICHTUNG_TEMPLATE.md`.** Kurze Vorlage fuer Sichtungs-Befunde mit den Strukturen aus BEFUND_LIVE_SICHTUNG_G2_M1: Finding-Liste, Quellen-Trace, Achsen-Zuordnung. Kann der User selbst befuellen oder als Input fuer eine kuenftige Upgrade-Runde sammeln.

3. **Keine Phase 3.3.** Im Unterschied zum urspruenglichen M-02-Vorschlag wird **keine neue formale Phase** eingezogen. Stattdessen nur die zwei Stop-Hinweise. Begruendung: User will Kontingenzen der Erstellung nicht brechen (Antwort 4).

**Gates:**
- **G-8-1:** ORCHESTRATOR enthaelt die zwei Stop-Hinweise.
- **G-8-2:** SICHTUNG_TEMPLATE existiert.

**Abhaengigkeit:** Nach Runden 3-6 (damit die ORCHESTRATOR-Struktur stabil ist). Kann parallel zu Runde 7 laufen.

**Risiko:** Sehr niedrig.

---

## 11. Zusammenfassung der neuen Q-Gates

| Gate-ID | Phase | Typ | Runde | Beschreibung |
|---|---|---|---|---|
| **G-SF-DUAL-01** | 0.3/0.4/2.0 | deterministisch | 3 | `stundenfrage.narrativ` + `stundenfrage.operational` vorhanden |
| **G-SF-DUAL-02** | 0.3/0.4 | llm-judge | 3 | Kongruenz-Score narrativ ↔ operational ueber Schwelle |
| **G-BEUTELSBACH-CONSTR** | 0.3 | llm-judge | 3 | Konstruktives Feedback Schueler-Interessen (non-blocking) |
| **G-AUFG-7-OPT** | 2.2b | deterministisch | 3 | Aufgabe 7 hat `operational_target` + abgeleiteten Fragestamm |
| **G-QUELL-INTEGRITAET** | 2.1 | script | 4 | Figuren-Text ohne erzaehlerisch-systemische Einschuebe |
| **G-FIKTIV-META** | 2.1 | deterministisch | 4 | Wenn `_meta.fiktiv=true`, dann `_meta.fiktions_begruendung` + Titel-Fiktions-Markierung |
| **G-MED-FUNKTION** | 2.1 | deterministisch | 5 | Jedes Medium hat `funktion` + `funktions_begruendung` |
| **G-MED-TYP-THEMA** | 2.1 | script | 5 | Themenspezifische Typ-Anforderung erfuellt |
| **G-MED-FALLBACK** | 0.2.M/2.1 | deterministisch | 5 | Freie-Wikimedia-Suche nur mit `_meta.fallback_begruendung` |
| **G-KATALOG-MIN** | 0.2.M | deterministisch | 2 | `medien_katalog_mappe` hat min 3 qualifizierte Medien |
| **G-PORTRAET-COMMONS** | 0.2.M | script | 2 | Portraet-URLs sind Commons-lizenz-verifiziert |
| **G-INFO-BOX-ZWECK** | 2.1 | deterministisch | 2/4 | `info_box.zweck` ist aus Enum gewaehlt |
| **G-FEEDBACK-MUSTER** | 2.2b | deterministisch | 6 | Aufgabe hat Musterloesung fuer Feedback-Anzeige |

---

## 12. Artefakte pro Runde

| Runde | Neue Dokumente | Veraenderte Dokumente |
|---|---|---|
| 0 | `M-03_REIFE_MATRIX_v3-12_*.md`, `VERGLEICH_G1_G2_SICHTUNG_*.md`, Addendum an `BEFUND_LIVE_SICHTUNG_G2_M1` | — |
| 1 | `tools/typ-check-aufgaben.sh` | VERTRAG_PHASE_0-1/0-2/0-3/0-4, Q-GATE-MECHANIK (STOP_DEFAULT), SUB_AUFGABE_*, SUB_MATERIAL_*, material-output-schema.json (Titel-Description) |
| 2 | `VERTRAG_PHASE_0-2-M_MEDIEN-EXTRAKTION.md`, `SUB_MEDIEN_EXTRAKTION.md`, Schema `medien_katalog_mappe.json` | PROJECT_INSTRUCTIONS (State-Machine), material-output-schema.json (Subtypen), AGENT_INHALT, AGENT_MATERIAL, escape-engine.js (Rendering), styles.css |
| 3 | — | VERTRAG_PHASE_0-3/0-4/2-0/2-2b, AGENT_SKRIPT, AGENT_DIDAKTIK, AGENT_HEFTEINTRAG, SUB_AUFGABE_FREITEXT, Schemata (Stundenfrage-Objekt) |
| 4 | — | SUB_MATERIAL_TAGEBUCH, SUB_MATERIAL_QUELLENTEXT, VERTRAG_PHASE_2-1, AGENT_MATERIAL, Q-GATE-MECHANIK (neue Gates) |
| 5 | — | VERTRAG_PHASE_0-1, VERTRAG_PHASE_2-1, AGENT_DIDAKTIK, AGENT_MATERIAL, SUB_MATERIAL_*, Q-GATE-MECHANIK |
| 6 | — | escape-engine.js, styles.css, VERTRAG_PHASE_2-2b, Q-GATE-MECHANIK (Feedback-Mode), evtl. data.meta-Schema |
| 7 | `tools/q-gate-audit.sh`, `tools/q-gate-run.sh` | Alle Phasen-Vertraege (Gate-Enforcement-Map), Q-GATE-MECHANIK |
| 8 | `docs/checklisten/SICHTUNG_TEMPLATE.md` | ORCHESTRATOR.md (zwei Stop-Hinweise) |

---

## 13. Reihenfolge und Parallelitaet (Empfehlung)

**Konservativ (seriell, wo moeglich):**
Runde 0 → Runde 1 → Runde 2 → Runde 3 → Runde 4 → Runde 5 → Runde 6 → Runde 7 → Runde 8

**Optimiert (parallel, wo moeglich):**
```
R0 ─┬─► R1
    └─► R2 ─┬─► R3 ─┬─► R8
            ├─► R4 ─┤
            ├─► R5 ─┤
            └─► R6 ─┴─► R7
```

- **R0 und R1 parallel:** Runde 1 braucht nur G-0-2 (Umlaut-Fragetyp-ID) aus Runde 0, kein vollstaendiges Reife-Audit.
- **R3, R4, R5 parallel nach R2:** Alle drei operieren auf verschiedenen Dateien (Achse A = Phase 0.3-2.2b Stundenfrage; Achse C = SUB_MATERIAL_TAGEBUCH/QUELLENTEXT; Achse B = Phase 0.1 + 2.1 Medien). File-Ownership-Konflikte sind gering.
- **R6 parallel zu R2-R5:** Engine-Arbeit betrifft nur weitergehts-online, keine Konflikte mit Generator-Verträgen.
- **R7 parallel zu R3-R6:** Audit-Arbeit ist lesend; Framework-Runner ist neue Datei.
- **R8 am Ende:** ORCHESTRATOR-Aenderungen sollten nach stabilisierten Achsen-Runden erfolgen.

**Empfehlung:** Optimiert-parallel, sofern die Umsetzung mehrere Agenten-Durchlaeufe gleichzeitig verarbeiten kann. Bei Single-Agent-Sequenzierung: R0 → R1 → R2 → R3 → R4 → R5 → R6 → R7 → R8.

---

## 14. Risiken und Fallbacks

| Risiko | Ebene | Mitigation |
|---|---|---|
| Reife-Matrix offenbart mehr unreife Sub-Agenten als erwartet | hoch | Runde 2 Scope-Erweiterung, ggf. R5 vertagen |
| Dualistische Stundenfrage-Kongruenz-Judge unreliable | mittel | Auf deterministischen Subset-Check zurueckfallen (Lemma-Intersection) |
| Fiktions-Klausel zu locker → v3.6-Symptome kehren zurueck | mittel | G-FIKTIV-META Pflicht, QUELL-INTEGRITAET deterministisch enforcen |
| Fiktions-Klausel zu streng → legitime Personifizierungen blockiert | mittel | Bedingungen B1/B2/B3 sind alternativ (ODER), nicht kumulativ |
| Feedback-First Engine-Umbau komplexer als geplant | mittel-hoch | Interim-Button als Fallback (siehe R6 Arbeitspaket 1) |
| Medien-Funktions-Klassifikation wird mechanisch befuellt | mittel | Begruendungspflicht + Sub-Agent-Prompt erzwingt Reflexion |
| Runde 2 blockiert alle Folge-Runden ueber lang | hoch | Runde 2 in drei Teilrunden R2a/R2b/R2c zerlegen (Schema / Phase 0.2.M / Reife-Programm) |
| O-02-E Extraktions-Sub-Agent liefert schlechte Medien-Qualitaet | hoch | Qualifizierungs-Schritt mit Commons-License-Check + Caption-Verifikation + ggf. LLM-Judge auf medien_katalog |
| Wikipedia-Artikel-Scope fuer erweiterte Medien-Suche zu breit (Token-Explosion) | hoch | Medien-Extraktion operiert nur auf Infobox + Galerie-Abschnitten, nicht auf Volltext; pro Artikel Limit von N Medien-Kandidaten |
| Legacy-Games Kompatibilitaet mit Engine-Umbau | mittel | `feedback_first_mode`-Flag im data.meta, Legacy-Games bleiben unflagged |

---

## 15. Offene Detail-Fragen (vor Runden-Start klaeren)

Diese Fragen koennen im Plan nicht abgeschlossen werden und benoetigen User-Antworten, bevor die entsprechende Runde startet. Sie blockieren nicht die Gesamt-Planung, nur die Detail-Umsetzung der jeweiligen Runde.

### Vor Runde 2:

1. **SUB_MEDIEN_EXTRAKTION vs. AGENT_INHALT-Erweiterung:** Soll der Medien-Extraktions-Workflow als eigener neuer Sub-Agent realisiert werden, oder als Erweiterung in AGENT_INHALT (mit Splitting in 0.2 Text und 0.2.M Medien)? Argument fuer eigenen Sub-Agenten: isolierte Token-Budgets, klare Trennung Text/Medien. Argument fuer AGENT_INHALT-Erweiterung: weniger Dateien, weniger Dispatch-Komplexitaet.

2. **Medien-Extraktions-Tiefe im erweiterten Scope:** Wer entscheidet, welche spezialisierten Wikipedia-Artikel in den erweiterten Scope fallen? Drei Varianten:
   - (a) AGENT_INHALT entscheidet es in Phase 0.2 und uebergibt an 0.2.M
   - (b) SUB_MEDIEN_EXTRAKTION iteriert selbststaendig ueber Wikilinks der Kern-Artikel (Tiefe N)
   - (c) Menschliche Kuration — User gibt erweiterten Scope vor
   Default-Vorschlag: (a) mit Option auf (c), (b) als Fallback bei zu wenig Treffern.

3. **Dual-Scope-Pflicht:** Ist der erweiterte Medien-Scope pflichtig pro Mappe oder optional? Default-Vorschlag: **optional** — wenn der Kern-Artikel selbst genug qualifizierte Medien enthaelt, wird nicht erweitert. Das spart Token und ist konsistent mit User-Antwort 18 (*"tief nur wenn noetig"*).

### Vor Runde 3:

4. **Beutelsbach-Judge Platzierung:** Wirkt der konstruktive Feedback-Judge in AGENT_SKRIPT oder in AGENT_DIDAKTIK? AGENT_DIDAKTIK ist die fruehere Phase und besser fuer Formulierungs-Schleifen geeignet; AGENT_SKRIPT hat die narrative Fein-Formulierung. Default-Vorschlag: **AGENT_DIDAKTIK** (Grob-Formulierung) mit Nach-Durchlauf in **AGENT_SKRIPT** (Fein-Formulierung), beide non-blocking.

5. **F-08 Aufgabe-7 Schema-Variante:** Vollstaendiger Dualismus `fragestamm: {narrativ, operational}` oder vereinfacht `fragestamm: string` + `operational_target: string` (nur interner Zusatz)? Default-Vorschlag: **vereinfacht**, weil der Operator-Sichtstruktur-Fall nur sichtbar den einen Fragestamm hat, waehrend das Backend-Target ein Planungs-Feld ist.

### Vor Runde 4:

6. **Fiktive Figuren Platzhalter-Portraet:** Wenn eine Figur fiktiv ist und kein real-belegtes Portraet existiert, wird (a) ohne Portraet gerendert (Stilbruch zum Grid-Pattern) oder (b) Platzhalter-Silhouette mit Beschriftung `"Fiktionale Figur"` gerendert? User-Antwort 15 sagt (b) — "rekonstruierte Figuren ohne Portraet akzeptiert". Default-Implementierung: **Variante (a) — ohne Portraet**, Grid-Pattern akzeptiert Stilbruch. Variante (b) als Option.

7. **Fiktions-Bedingungen B1/B2/B3 als alternativ oder kumulativ:** Default-Vorschlag: **alternativ (ODER-verknuepft)** — eine der drei Bedingungen genuegt fuer Fiktions-Lizenz, Begruendung verweist auf welche. Kumulativ waere zu streng und wuerde legitime Personifizierungen ausschliessen.

### Vor Runde 5:

8. **Funktions-Klassifikation Erweiterung:** Sind die vier Funktions-Kategorien `analytisch / atmospherisch / evokativ / strukturierend` hinreichend, oder braucht es eine fuenfte (z.B. `dokumentarisch` fuer Photo-Beweismittel)? Default-Vorschlag: **vier genuegen**, dokumentarisches Material faellt unter `analytisch`.

9. **Primaer- vs. Sekundaer-Funktion pro Medium:** Soll `material.funktion` ein Array sein (mehrere Funktionen moeglich) oder Single-Value (genau eine Primaer-Funktion)? Default-Vorschlag: **Single-Value**, um Klarheit zu erzwingen. Sekundaer-Funktionen koennen in `funktions_begruendung` erwaehnt werden.

### Vor Runde 6:

10. **Feedback-Card Antwort-Editierbarkeit:** Soll die SuS-Antwort in der Feedback-Card editierbar sein (SuS kann Antwort korrigieren und vergleichen) oder read-only? Default-Vorschlag: **read-only**, aber mit `Noch einmal versuchen`-Button, der die Antwort zurueckfuehrt.

### Vor Runde 0:

11. **Wahl des v3.12-Erst-Games:** Wird das neue v3.12-Test-Game Marne neu generieren oder ein neues Thema? User-Entscheidung 5 laesst beides offen. Default-Vorschlag: **Marne neu generieren** fuer direkten Vergleich mit dem Legacy-Befund, plus optional ein neues Thema als Diversitaetstest.

---

## 16. Zusammenhang zu anderen Upgrade-Plaenen

- `UPGRADE_PLAN_v3-9_STEUERUNGSREFAKTOR.md` — bereits committed, Grundlage des aktuellen Steuerungs-Gefuges. v3.12 setzt darauf auf.
- `UPGRADE_PLAN_v3-10_GENERATOR_HARDENING.md` — offene T2.F-Luecke (oneOf-Diskriminator-Ausweitung). Wird durch Runde 2 Schema-Erweiterung teilweise mit-adressiert; Details siehe SCOPING §2 F-03 O-03-D.
- `UPGRADE_PLAN_v3-11_DEPLOY_STATE_MACHINE.md` — Phase 3.x State-Machine. Runde 8 erweitert ORCHESTRATOR-Stops in dieser Phase.
- `UPGRADE_PLAN_v4_PRODUKTIONSARCHITEKTUR.md` — uebergeordnete Produktions-Architektur-Vision. v3.12 ist eine Teilrunde innerhalb v4.

---

## 17. Referenzen

### Primaerquellen
- `docs/befunde/BEFUND_LIVE_SICHTUNG_G2_M1_2026-04-10.md` — 8 Findings Grundlage
- `docs/befunde/SCOPING_v3-12_QUELLEN_UND_OPTIONEN_2026-04-10.md` v2.1 — Optionen und Empfehlungen
- `docs/befunde/AUDIT_FACHDIDAKTIK_v3-12_2026-04-11.md` — fachdidaktisches Audit

### Generator-Infrastruktur (zu beruehrende Dateien)
- `escape-game-generator/PROJECT_INSTRUCTIONS.md` (State-Machine, Phase 0.2.M)
- `escape-game-generator/agents/ORCHESTRATOR.md` (Stop-Hinweise)
- `escape-game-generator/agents/AGENT_INHALT.md`, `AGENT_MATERIAL.md`, `AGENT_DIDAKTIK.md`, `AGENT_SKRIPT.md`, `AGENT_HEFTEINTRAG.md`
- `escape-game-generator/agents/SUB_MATERIAL_{TAGEBUCH,QUELLENTEXT,KARTE,ZEITLEISTE,STATISTIK,BILDQUELLE}.md`
- `escape-game-generator/agents/SUB_AUFGABE_{BEGRUENDUNG,FREITEXT,...}.md`
- `escape-game-generator/architektur/Q-GATE-MECHANIK.md`
- `escape-game-generator/architektur/schemata/material-output-schema.json`
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_0-1_DIDAKTIK.md`, `0-2_INHALT.md`, `0-3_SKRIPT.md`, `0-4_HEFTEINTRAG.md`, `2-0_RAHMEN.md`, `2-1_MATERIAL.md`, `2-2b_AUFGABE.md`
- **neu in Runde 2:** `VERTRAG_PHASE_0-2-M_MEDIEN-EXTRAKTION.md`, `SUB_MEDIEN_EXTRAKTION.md`

### Engine-Seite (weitergehts-online)
- `assets/escape-engine.js` (Runde 2 Rendering, Runde 6 Feedback-First)
- `assets/styles.css` (Portraet-Grid, Feedback-Card)

### Fachdidaktik (Begruendungs-Basis)
Siehe SCOPING v2.1 §9 fuer vollstaendige Referenzliste (Droysen, Pandel, Ruesen, Bergmann, Beutelsbacher Konsens, Klieme, Black/Wiliam, Hattie, Deci/Ryan, LehrplanPLUS GPG 7 Bayern).

---

## 18. Naechste Schritte

1. **User-Freigabe dieses Plans** — insbesondere der Runden-Struktur und der Abhaengigkeits-Logik.
2. **Antworten zu den Detail-Fragen in §15** — mindestens die Vor-Runde-0- und Vor-Runde-2-Fragen (Frage 1-3 und 11) vor Runde-0-Start.
3. **Start Runde 0** — Audit-Track, kein Code-Eingriff.
4. **Status-Tracking** — STATUS.md bekommt einen v3.12-Track-Block mit den 9 Runden als Fortschrittsmarker.

---

**Status:** VORSCHLAG v1, 2026-04-11. Wartet auf User-Freigabe.
