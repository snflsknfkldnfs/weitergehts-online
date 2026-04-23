# UPGRADE PLAN v3.12 — Escape-Game-Qualitaet (Runden-Architektur)

**Anlass:** `BEFUND_LIVE_SICHTUNG_G2_M1_2026-04-10.md` (8 Findings, systemisch bestaetigt durch Parallel-Sichtung Game 1/Ursachen) + `SCOPING_v3-12_QUELLEN_UND_OPTIONEN_2026-04-10.md` v2.1 + `AUDIT_FACHDIDAKTIK_v3-12_2026-04-11.md` + User-Entscheidungen zu 18 offenen Fragen am 2026-04-11.

**Zweck:** Operativer Upgrade-Plan, der die SCOPING-Entscheidungen in eine Runden-Architektur mit klaren Abhaengigkeiten, Scopes, Exit-Kriterien und Risiko-Gates uebersetzt. **Kein Scoping mehr, sondern Ausfuehrungsvorlage.**

**Status:** v1.2 — 2026-04-11. User-Entscheidungen zu allen 11 Detail-Fragen integriert (siehe §15.1). Runden-Struktur freigegeben. R0-R8 sind Infrastruktur-Arbeit am Generator + Engine und beruehren keine Live-Games. Archivierung bestehender Live-Games ist Pre-Pilotlauf-Task nach R8, nicht vor R0.

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

4. **Wikipedia-Artikel-Scope-Katalog fuer Ersttest.** Fuer das v3.12-Erstgame (Neu-Regeneration G1 Ursachen-und-Ausbruch gemaess §15.1 F11) werden die Kern-Artikel (Text-Scope) und der erweiterte Medien-Scope (tiefer, spezialisierte Wikipedia-Artikel fuer Medien-Extraktion) konkret benannt. Dient Runde 2 als Referenz-Datenpunkt fuer die Phase-0.2.M-Implementierung.

**Gates:**
- **G-0-1:** Reife-Matrix liegt vor und identifiziert mindestens die Sub-Agenten KARTE/ZEITLEISTE/STATISTIK als unreif (Hypothese aus Scoping §2 F-02).
- **G-0-2:** Zwei Umlaut-bug-behaftete Fragetypen sind eindeutig benannt.
- **G-0-3:** Vergleichs-Dokument G1/G2 bestaetigt Systemizitaet.

**Exit:** Alle vier Audit-Artefakte im Repo committet. Keine offenen Diagnose-Fragen mehr, die Runde 2 blockieren.

**Hinweis zu Live-Games:** R0 beruehrt keine Live-Games. Alle Runden R0-R8 sind Infrastruktur-Arbeit am Generator + Engine. Die Archivierung bestehender Live-Games (falls fuer spaeteren v3.12-Pilotlauf erforderlich) ist eine separate Folge-Task nach R8-Abschluss, nicht Teil von R0.

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

3. **Output-Schema `medien_katalog_game.json`.** Schema-Skizze:
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

7. **AGENT_MATERIAL-Kopplung.** Sub-Agenten `SUB_MATERIAL_BILDQUELLE` / `SUB_MATERIAL_KARTE` / `SUB_MATERIAL_ZEITLEISTE` / `SUB_MATERIAL_STATISTIK` ziehen ihre Assets aus `medien_katalog_game.json`, nicht aus freier Wikimedia-Suche. Notfall-Branch: wenn Katalog fuer den geforderten Typ weniger als zwei Treffer hat, darf der Sub-Agent freie Suche ausfuehren, muss aber `_meta.fallback_begruendung` setzen (neues Gate MED-FALLBACK in Runde 7).

8. **M-03-Reife-Programm.** Auf Basis der Reife-Matrix aus Runde 0: pro als unreif markierten Sub-Agenten die fehlenden Reife-Kriterien schliessen:
   - Template-Beispiele nachziehen (auf Basis eines neuen Marne-Test-Games oder eines frisch generierten Test-Games)
   - Asset-Pipeline anbinden (ueber `medien_katalog`)
   - Q-Gate-Testlauf-Log erstellen
   - Engine-Rendering verifizieren
   Der genaue Scope der unreifen Sub-Agenten haengt von Runde 0 ab.

**Gates:**
- **G-2-1:** Neues Schema `medien_katalog_game.json` ist definiert und mit einem Test-JSON validiert.
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

2. **Kopplung zu `medien_katalog_game` (Phase 0.2.M).** `medien_skizze` wird Input fuer den Medien-Extraktions-Sub-Agenten. Der Extraktions-Sub-Agent priorisiert empfohlene Typen bei der Durchsuchung der Kern- und erweiterten Scope-Artikel.

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
| **G-KATALOG-MIN** | 0.2.M | deterministisch | 2 | `medien_katalog_game` hat min 3 qualifizierte Medien |
| **G-PORTRAET-COMMONS** | 0.2.M | script | 2 | Portraet-URLs sind Commons-lizenz-verifiziert |
| **G-INFO-BOX-ZWECK** | 2.1 | deterministisch | 2/4 | `info_box.zweck` ist aus Enum gewaehlt |
| **G-FEEDBACK-MUSTER** | 2.2b | deterministisch | 6 | Aufgabe hat Musterloesung fuer Feedback-Anzeige |

---

## 12. Artefakte pro Runde

| Runde | Neue Dokumente | Veraenderte Dokumente |
|---|---|---|
| 0 | `M-03_REIFE_MATRIX_v3-12_*.md`, `VERGLEICH_G1_G2_SICHTUNG_*.md`, Addendum an `BEFUND_LIVE_SICHTUNG_G2_M1` | — |
| 1 | `tools/typ-check-aufgaben.sh` | VERTRAG_PHASE_0-1/0-2/0-3/0-4, Q-GATE-MECHANIK (STOP_DEFAULT), SUB_AUFGABE_*, SUB_MATERIAL_*, material-output-schema.json (Titel-Description) |
| 2 | `VERTRAG_PHASE_0-2-M_MEDIEN-EXTRAKTION.md`, `SUB_MEDIEN_EXTRAKTION.md`, Schema `medien_katalog_game.json` | PROJECT_INSTRUCTIONS (State-Machine), material-output-schema.json (Subtypen), AGENT_INHALT, AGENT_MATERIAL, escape-engine.js (Rendering), styles.css |
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

## 15.1 Entscheidungen zu Detail-Fragen (2026-04-11)

Dieser Abschnitt schliesst alle 11 Detail-Fragen aus §15 ab. Er wurde nach User-Input 2026-04-11 eingefuegt. Die Fragen selbst bleiben in §15 als Ableitungs-Nachweis erhalten.

### F11 (Vor Pilotlauf, nicht vor R0) — v3.12-Pilot-Game

**Entscheidung:** **Neu-Regeneration G1 (Ursachen-und-Ausbruch)** als v3.12-Pilot. Das bestehende G1 (Marne) wird als v3.12-Pilot nicht genutzt, weil R2-R6 Phase 0 betreffen (DIDAKTIK, INHALT, SKRIPT, HEFT-EINTRAG) und eine Voll-Neugenerierung erzwingen.

**Zeitpunkt der Archivierung:** Die Archivierung oder Entfernung des bestehenden Live-G1 geschieht **nicht vor R0**, sondern erst unmittelbar vor dem v3.12-Pilotlauf (nach Abschluss der Infrastruktur-Runden R0-R8). Grund: R0-R8 sind reine Generator- und Engine-Arbeit und beruehren Live-Games nicht. Erst wenn die neue Generierung laeuft und das neue Game deployed werden soll, entsteht Interferenz-Risiko mit dem Legacy-Game.

**Archivierungs-Varianten (zur spaeteren User-Wahl vor Pilotlauf):**
- Variante (a) **Archiv-Branch:** `git branch archiv/g1-v3-11-<thema>`, danach auf main entfernen. Nachteil: Live-Zugriff auf altes Game nur per Branch-Checkout.
- Variante (b) **Archiv-Unterordner:** Verschiebung nach `archiv/g1-v3-11-<thema>/` ausserhalb Deploy-Scope. Nachteil: Wiederherstellung braucht Rueckverschiebung.
- Variante (c) **Hard-Remove:** Loeschen via git, History bleibt.
- **Default-Vorschlag: Variante (b)** — schneller Vergleichs-Zugriff bleibt, keine Interferenz.

**Folge fuer Runden-Plan:** Keine. R0 bleibt unveraendert audit-only. Die Archivierung wird als Pre-Pilotlauf-Task nach R8 gefuehrt (siehe §18 Naechste Schritte).

### F1 (Vor R2) — SUB_MEDIEN_EXTRAKTION Architektur

**Entscheidung:** **Eigenstaendige Phase 0.2.M als Konsument des SUB_RECHERCHE-Outputs.** SUB_MEDIEN_EXTRAKTION ist neuer Sub-Agent, kein Part von SUB_RECHERCHE.

**Begruendung (3 Gruende):**
1. **Unterschiedliche Qualitaets-Kriterien.** SUB_RECHERCHE prueft inhaltliche Relevanz von Text-Passagen; SUB_MEDIEN_EXTRAKTION prueft Lizenz-Status, Bildqualitaet, Caption-Uebersetzbarkeit, Funktions-Zuweisung. Keine Synergie, sondern verschiedene Domaenen.
2. **Token-Oekonomie.** Medien-Extraktion muss nicht den Volltext der Artikel verarbeiten — Infobox, Gallery-Sektionen, Commons-Kategorien genuegen. Das ist ein anderer Lese-Modus als SUB_RECHERCHE.
3. **Wiederverwendbarkeit.** Der SUB_RECHERCHE-Output (Liste relevanter Artikel + Pfade) kann von mehreren Downstream-Konsumenten genutzt werden. Eine Kopplung an SUB_RECHERCHE waere architektonisch voreilig.

**Workflow:**
1. SUB_RECHERCHE liefert Artefakt `recherche_output.json` mit Liste relevanter Wikipedia-Artikel + Kernpfaden + Weiterfuehrenden Verweisen.
2. SUB_MEDIEN_EXTRAKTION liest `recherche_output.json`, iteriert ueber die genannten Artikel, extrahiert Medien-Kandidaten aus Infobox + Gallery + Commons-Verlinkung, qualifiziert sie (Commons-Check, Caption, Funktions-Vorschlag).
3. SUB_MEDIEN_EXTRAKTION darf zusaetzlich **potentiell verwertbare** Artikel ausserhalb des Kern-Scopes durchsuchen — aber nur solche, die ueber Wikilinks aus den Kern-Artikeln erreichbar sind (Tiefe 1). Diese Erweiterung ist der "erweiterte Medien-Scope" (siehe F2).
4. Output: `medien_katalog_game.json` (siehe F3 fuer Scope-Klarstellung).

**Betroffene Artefakte:** Neuer Vertrag `VERTRAG_PHASE_0-2-M_MEDIEN-EXTRAKTION.md`, neuer Sub-Agent `SUB_MEDIEN_EXTRAKTION.md`, Schema-Definition, Q-Gate `G-KATALOG-MIN`.

### F2 (Vor R2) — Dual-Scope-Prioritaet

**Entscheidung:** **Hierarchie (a) > (b) > (c)** mit praeziser Anleitung:
- **(a) Primaerpfad — Kern-Artikel-Extraktion.** SUB_MEDIEN_EXTRAKTION wird zunaechst **intelligent enabled**, qualifizierte Medien aus den SUB_RECHERCHE-identifizierten Kern-Artikeln zu ziehen. Das ist der Default.
- **(b) Sekundaerpfad — Erweiterter Medien-Scope.** Innerhalb **vertretbaren Rahmens** (Tiefe 1 via Wikilinks aus Kern-Artikeln, pro Artikel max N Medien-Kandidaten, pro Game Gesamt-Limit). **Funktional praezise angeleitet** ueber Such-Prompt-Template im Vertrag.
- **(c) Notfallpfad — Freie Wikimedia-Suche.** Nur dann, wenn (a)+(b) zusammen nicht genuegend qualifizierte Medien fuer die Themen-Matrix (siehe F15) liefern. Erfordert `_meta.fallback_begruendung` im Katalog-Eintrag. Wird von Q-Gate `G-MED-FALLBACK` auf Grenzwert geprueft.

**Begruendung:** User-Position ist klar priorisiert. (a) ist tokeneffizient und qualifikations-stark (Wikipedia-Kontext buergt fuer Relevanz). (b) erschliesst Medien-Breite ohne Qualitaetsverlust. (c) ist Notfall, weil Wikimedia-Freisuche ohne Kontext schwer validierbar ist.

**Konkrete Limits (vorlaeufig, in R2-Vertrag zu verankern):**
- (b) Wikilinks-Tiefe: 1 (nur direkte Wikilinks aus Kern-Artikeln, keine Rekursion).
- (b) Max Medien-Kandidaten pro erweitertem Artikel: 5.
- (b) Max erweiterte Artikel pro Game: 10.
- (c) Max Wikimedia-Freisuchen pro Game: 3, mit `_meta.fallback_begruendung` je Eintrag.

### F3 (Vor R2) — Klarstellung Scope und Laufzeit

**User-Rueckfrage loest Architektur-Korrektur aus.** Der User hat korrekt hinterfragt, ob die Medien-Recherche **game-weit** laeuft und dann pro Mappe gefiltert wird. Antwort: **Ja, genau so ist es gedacht.** Die bisherige Benennung `medien_katalog_game.json` war irrefuehrend.

**Korrektur:**
- Umbenennung: `medien_katalog_game.json` → `medien_katalog_game.json`.
- **Laufzeit:** Phase 0.2.M laeuft **einmal pro Game**, nicht einmal pro Mappe. Der Sub-Agent iteriert ueber alle in der Rahmen-Architektur vorgesehenen Mappen-Themen, fuehrt Medien-Extraktion fuer alle aus, schreibt einen konsolidierten Game-Katalog.
- **Per-Mappe-Konsum:** Jede Mappe-Generierung (Phase 2.1 MATERIAL) liest den Game-Katalog und filtert per Thema/Funktion/Tag die fuer ihre Mappe relevanten Eintraege heraus. Das ist ein **Read-Query**, keine erneute Extraktion.

**Schema-Folge:** `medien_katalog_game.json` hat obere Ebene `games[0].mappen[]` mit pro Mappe gelisteten Medien (gefiltert aus Game-Pool). Zweite Ebene: `pool[]` mit allen extrahierten Medien (Game-weit), aus denen die Mappen-Filter greifen.

**Vorteil:** Einmal-Extraktion pro Game spart Token, sichert Konsistenz (selbe Medien koennen von mehreren Mappen genutzt werden), erlaubt Game-weite Diversitaets-Pruefung (G-MED-TYP-THEMA), und ermoeglicht Wiederverwendung.

### F4 (Vor R3) — Sichtstruktur-String F-08 Implementierung

**Entscheidung:** Default-Vorschlag aus §15 akzeptiert mit praeziser Implementierungs-Regel.

**Implementierungs-Regel:** Im data.json wird pro Aufgabe **ein einziger Fragestamm** gespeichert (der Sicht-Fragestamm). Die Tiefenstruktur liegt als **planungs-internes Meta-Feld** `aufgabe.planung.operational_target` vor, das von der Engine **nicht gerendert** wird. Die Engine hat keinen Zugriff auf das Planungs-Feld und zeigt nur den Sicht-Fragestamm.

**Konsequenz fuer Schema:** `aufgabe.fragestamm: string` (wie bisher) + optional `aufgabe.planung.operational_target: string` + optional `aufgabe.planung.sicht_struktur: string` + optional `aufgabe.planung.tiefen_struktur: string`. Das Planungs-Feld ist fuer Nachlese, Audit und Sub-Agent-Kontrolle wichtig.

**Begruendung:** Die Engine soll nicht wissen, was "Sicht" vs. "Tiefe" ist — sie rendert nur. Die Trennung liegt im Sub-Agenten (SUB_AUFGABE_FREITEXT wird angewiesen, Sicht-Fragestamm zu formulieren, aber Tiefen-Ziel zu notieren) und im Audit-Gate (G-SF-DUAL-01/02 prueft, dass beide existieren und plausibel sind).

**Offene Praezisierung in R3-Start:** Schema-Validator muss `aufgabe.planung` als optionales Objekt zulassen, ohne dass bestehende Mappen, die das Feld nicht haben, failen. Schema-Version-Bump. Migrationsstrategie: Bestehende Mappen erhalten das Feld nicht (Legacy), neue Mappen ab v3.12 erhalten das Feld pflichtig.

### F7 (Vor R3) — Beutelsbach-Judge Architektur

**Entscheidung:** **Regel-Modul in SUB_AUFGABE_FREITEXT**, kein eigenstaendiger Sub-Agent.

**Begruendung:**
1. Der Judge ist ein one-shot Regel-Check (nicht-blockend, konstruktiv-kommentierend), nicht ein Multi-Step-Reasoning-Task. Ein eigener Sub-Agent waere Overhead.
2. Der Judge braucht Zugriff auf den Aufgaben-Kontext, den SUB_AUFGABE_FREITEXT bereits im Arbeitsspeicher hat. Auslagerung wuerde Kontext-Duplikation erfordern.
3. Non-blocking Natur bedeutet: Judge-Output wird als Kommentar an die Aufgabe angehaengt (`aufgabe.planung.beutelsbach_notiz`), wird von AGENT_DIDAKTIK im naechsten Pass gelesen und optional zur Reformulierung genutzt.

**Zusaetzliche Abwaegungs-Direktive aus User-Position:** Der Judge muss zwei Kriterien gleichzeitig abwaegen:
- **Eigenstruktur des Themas gemaess Inhaltsbasis** (was ist inhaltlich kontrovers?)
- **Antizipierte Interessenstruktur des User-Pools** (welche Kontroverse ist fuer 7.-Klasse-SuS 2026 interpretierbar?)

Die Abwaegung wird im Judge-Prompt explizit gemacht: Der Judge gibt zwei getrennte Kurz-Einschaetzungen (eine pro Kriterium) und eine Gesamt-Empfehlung ab. Keine Mehrheitsregel, sondern getrennte Transparenz.

**Folge fuer R3-Vertrag:** `VERTRAG_PHASE_0-1_DIDAKTIK.md` (oder wo SUB_AUFGABE_FREITEXT angesiedelt ist) bekommt ein neues Unter-Kapitel "Beutelsbach-Judge als Regel-Modul" mit Prompt-Template, Output-Schema und non-blocking-Klausel.

### F8 (Vor R4) — Fiktions-Klausel B1/B2/B3

**Entscheidung:** **Alternativ (ODER-verknuepft).** User-Vorschlag akzeptiert. Eine der drei Bedingungen genuegt fuer Fiktions-Lizenz. Die Begruendung im `_meta.fiktiv_grund`-Feld verweist auf welche der drei Bedingungen erfuellt ist.

**B1/B2/B3 Kurz-Definition (aus SCOPING v2.1 uebernommen):**
- **B1 Didaktische Notwendigkeit:** Die Perspektive ist inhaltlich notwendig und durch kein real-belegtes Individuum abbildbar.
- **B2 Typen-Legitimitaet:** Die Figur ist erkennbar als Repraesentantin eines historischen Typus (Arbeiterin, Bauer, Staedter) und nicht als Einzelperson.
- **B3 Gattungs-Transparenz:** Der Text ist als didaktische Rekonstruktion markiert (Tagebuch-Simulation, fiktives Gespraech), nicht als historische Quelle.

**Q-Gate G-QUELL-INTEGRITAET prueft:** Ist `_meta.fiktiv: true` gesetzt, dann muss `_meta.fiktiv_grund` einen Wert aus {B1, B2, B3} haben. Keine weitere Prueftiefe (non-blocking constructive judge fuer Inhaltliche Plausibilitaet kommt separat).

### F14 (Vor R4) — `_meta.fiktiv` Scope

**Entscheidung:** **Generell erlaubt fuer Quellentext-Elemente.** User-Tendenz akzeptiert.

**Implementierung:** Das Feld `_meta.fiktiv: boolean` (mit Pflicht-Feld `_meta.fiktiv_grund`) ist gueltiges Schema-Element fuer alle Quellentext-Subtypen: `material.quellentext.*`, `material.tagebuch`, `material.portraet.dialog_portraet`, `material.quellentext_mehrstimmen`, und ggf. `material.statistik` (wenn didaktisch rekonstruiert).

**Begruendung:** 
1. Konsistenz — ein einheitliches Flag ueber alle Text-Elemente ist schematisch sauberer als ein Element-spezifisches Flag nur fuer `dialog_portraet`.
2. Erweiterbarkeit — zukuenftige Text-Materialtypen erben das Flag automatisch.
3. Enforcement — Q-Gate G-FIKTIV-META kann einmal definiert werden und auf alle Text-Elemente angewendet werden.

**Zusaetzliches Pflicht-Feld:** `_meta.fiktiv_label: string` — sichtbare Kennzeichnung fuer die Rendering-Engine ("Rekonstruierter Tagebuch-Eintrag", "Fiktiver Dialog", "Didaktische Simulation"). Die Engine rendert das Label immer prominent, wenn `_meta.fiktiv: true`.

**Q-Gate G-FIKTIV-META:** Wenn `_meta.fiktiv === true`, dann muss `_meta.fiktiv_grund in {B1,B2,B3}` und `_meta.fiktiv_label: string` gesetzt sein. Sonst FAIL.

### F15 (Vor R5) — Themen-Medien-Matrix Platzierung

**Entscheidung:** **Separates Katalog-Dokument**, nicht im Vertrag. User war unsicher; meine Position ist klar.

**Platzierung:** `escape-game-generator/architektur/kataloge/MEDIEN_THEMA_MATRIX.md`.

**Begruendung (3 Gruende):**
1. **Iterative Erweiterung.** Die Matrix wird ueber Zeit mit neuen Themen, neuen Erkenntnissen aus Live-Laeufen, neuen didaktischen Einsichten wachsen. Vertraege sind stabile Strukturen, die nicht bei jedem neuen Thema gebumpt werden sollten.
2. **Read-Zugriff getrennt von Struktur-Zugriff.** Die Matrix ist eine Referenz-Datenbank, auf die Sub-Agenten lesend zugreifen. Vertraege definieren Struktur und Ablauf. Trennung von Read-Content und Struktur-Doku.
3. **Vertrag referenziert Matrix per Pfad.** `VERTRAG_PHASE_0-2-M` enthaelt: "Die Themen-spezifischen Medien-Anforderungen sind in `kataloge/MEDIEN_THEMA_MATRIX.md` dokumentiert und muessen zur Extraktions-Prioritaet genutzt werden."

**Schema des Katalog-Dokuments:**
- YAML-Block pro Thema (z.B. `industrialisierung`, `erster-weltkrieg-ursachen`, `reichsgruendung`) mit:
  - `pflicht_medientypen: [...]` (z.B. `[karte, zeitleiste, bildquelle_atmosphaerisch, bildquelle_analytisch]`)
  - `empfohlene_medientypen: [...]` (Sekundaer-Wunsch)
  - `funktions_verteilung: {analytisch: min 2, atmospherisch: min 1, evokativ: 1, strukturierend: 1}` (Matrix pro Funktion)
  - `begruendung: string` (Kurzsatz warum)

**Q-Gate G-MED-TYP-THEMA prueft:** Der `medien_katalog_game.json` fuer das aktuelle Game muss die in `MEDIEN_THEMA_MATRIX.md` fuer das Thema definierten Pflicht-Medientypen erfuellen. FAIL-Hinweis gibt die Luecke an.

### F18 (Vor R5) — Denkmal-Bruecke Implementation

**Entscheidung:** **Tag auf Bildquelle**, kein neuer Medientyp. User war unsicher; meine Position ist klar.

**Implementierung:** Bestehender Materialtyp `material.bildquelle` erhaelt neues optionales Feld `bildquelle.rolle: string` mit moeglichen Werten `{"primaer", "denkmal_bruecke", "atmosphaerisch", "analytisch_detail"}`.

**Begruendung (3 Gruende):**
1. **Kein neuer Medientyp = kein Schema-Breakage.** Bestehende Mappen sind unveraendert lauffaehig, Engine-Rendering funktioniert ohne Code-Aenderung.
2. **Semantik bleibt sauber.** Ein Denkmal IST ein Bild (photographisches Abbild eines materiellen Objekts), nur mit besonderer didaktischer Funktion. Das Rollen-Tag drueckt die Funktion aus, ohne die Typologie zu verletzen.
3. **Gezielte Einbindung moeglich.** Sub-Agent `SUB_MATERIAL_BILDQUELLE` kann bei Rolle=`denkmal_bruecke` automatisch eine Transfer-Frage an SuS ergaenzen ("Warum errichtet die Gegenwart genau dieses Denkmal?"). Das ist die didaktische Bruecke, die der User in F-02-Feedback gemeint hat.

**Folge fuer R5:**
- `material-output-schema.json` → `material.bildquelle.rolle` optional.
- `SUB_MATERIAL_BILDQUELLE.md` → neues Unter-Kapitel "Rolle: Denkmal-Bruecke" mit Handling-Regeln.
- `MEDIEN_THEMA_MATRIX.md` → pro Thema optional Wunsch `denkmal_bruecke: 1` in den empfohlenen Typen.
- Engine-Rendering: keine Aenderung noetig, `rolle` ist ein stiller Planungs-Tag.

### F9 (Vor R6) — feedback_first_mode Default

**Entscheidung:** **Default: `true`.** User-Position akzeptiert.

**Implementierung:** 
- Engine liest `data.meta.feedback_first_mode` aus. 
- Wenn Feld fehlt, Engine verwendet Default `true` (= neues Verhalten).
- Legacy-Games behalten altes Verhalten durch **explizites** `data.meta.feedback_first_mode: false` in ihrer data.json.
- Migrations-Protokoll: Vor v3.12-Deploy werden die bestehenden Games ursachen/bayern/marne (falls nicht archiviert) um `feedback_first_mode: false` erweitert, um ihr bisheriges Verhalten zu bewahren.

**Begruendung:** Neue Games erhalten automatisch neues Verhalten, Alt-Games explizit Alt-Verhalten. Das ist die typische "new-default-opt-out-legacy"-Struktur und minimiert Pflege-Aufwand fuer Neu-Generierungen.

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

1. **Runden-Struktur ist freigegeben** (Plan v1.2). Detail-Fragen sind in §15.1 entschieden.
2. **R0 starten** — Audit-Track, kein Code-Eingriff. Vier Arbeitspakete: M-03 Reife-Matrix, Umlaut-Fragetyp-ID, G1/G2-Vergleichs-Konsolidierung, Wikipedia-Artikel-Scope-Katalog fuer v3.12-Pilotgame (Ursachen-und-Ausbruch Neu-Regeneration).
3. **STATUS.md v3.12-Track-Block** — einfuegen mit den 9 Runden als Fortschrittsmarker.
4. **Artefakt-Inventar aktualisieren** — neue Dateien (SUB_MEDIEN_EXTRAKTION.md, VERTRAG_PHASE_0-2-M_*.md, MEDIEN_THEMA_MATRIX.md) als geplante Eintraege.
5. **Pre-Pilotlauf-Task nach R8 (Vormerkung):** Archivierung bestehendes Live-G1 vor v3.12-Pilot-Deploy. Variante-Wahl (a/b/c, Default b) wird kurz vor Pilotlauf getroffen, nicht jetzt.

---

**Status:** v1.2, 2026-04-11. Alle 11 Detail-Fragen entschieden. R0 kann unmittelbar starten.

---

## 19. v1.3 Delta — Testrun-Audit `deutscher-nationalismus-kolonialismus` (2026-04-18)

**Quelle:** `docs/projekt/testrun-nationalismus-kolonialismus/BEFUND_TESTRUN_N-K_KONSOLIDIERT.md`. Vollaudit 5 RAs, 60 Findings, **6 P0-Blocker**, Gate Overall **ROT**.

**Pilot-Konsequenz:** v3.12-Pilot-Freigabe nicht moeglich ohne Abarbeitung der 6 P0 + mindestens CC BY-SA-Compliance + Mappe-4-Retro-Patch.

### 19.1 P0-Blocker-Kanon (Pilot-blockierend)

| ID | Finding-ID | Beschreibung | RA | Aufwand |
|----|-----------|-------------|-----|--------|
| P0-1 | F-RA1-05 | Phase 3.1 Deploy-Preparation Mappe 2+3 uebersprungen/unterdokumentiert | RA1 | 1h |
| P0-2 | F-RA1-06 | V13-Patch-Regression Hefteintrag-Verschachtelung Mappe 3 | RA1 | 1-2h |
| P0-3 | F-RA3-01 | Lueckentext-Pool-Reset-Bug `escape-engine.js` Z. 2814 (disabled-Check statt used-Klasse) | RA3 | 15 min + QA |
| P0-4 | F-RA4-04 | Source-Deploy-Drift `mat-3-4.json` (Hallu-Caption in Source, Ersatz nur in data.json) | RA4 | 30 min + Vertrag |
| P0-5 | F-RA4-10 | Mappe-4 Retro-Patch offen (img-4-1/-3/-4) blockt Wiederaufnahme | RA4 | 1-2h |
| P0-6 | F-RA4-02 | Keine prospektive Verifikation in Phase 0.2 (erste API-Pruefung reaktiv) | RA4 | 2h |

### 19.2 Neue Plan-Impact-Items (13, Ergaenzung zu den 17 aus R0-FINAL+)

**Cluster Medien (4):**
- **PI-MV2-EXT1** Source-Deploy-Propagation: Patches MUESSEN sowohl in Source-JSON (`docs/agents/artefakte/.../mat-*.json`) als auch in `data.json` erfolgen. Re-Assembly-Validator pruefen. Bezug: F-RA4-04, VERTRAG_PHASE_3-1 DEPLOY-06.
- **PI-MV2-EXT2** Mappe-4-Retro-Patch Task: Verifikation img-4-1, img-4-3, img-4-4 (Herero/Nama) via API-Query. Ersatz dokumentiert im `medien_ersatz_log.md` je Game.
- **PI-MV2-EXT3** CC BY-SA Attribution-Schema: `bildquelle`-Typ data.json-Felder erweitern um `urheber`, `commons_url`, `lizenz_deed_url`, `wikimedia_filename`, `urheberrecht_jahr`. Generalisierung O-02-E-Portrait-Subfelder auf alle bildquelle-Materialien.
- **PI-MV2-EXT4** Didaktisches Ersatz-Rueckkopplung: Bei Medien-Ersatz via Fallback-Heuristik Mini-Review Phase 2.1b (Didaktik-Quickcheck: aendert Ersatz die Aussage des Tafelbild-Knotens?). F-RA4-12.

**Cluster Engine (3):**
- **PI-ENGINE-1** Hefteintrag-Dualstruktur bereinigen: `data.json` enthaelt sowohl `hefteintrag` als auch `sicherung.hefteintrag`. Schema-Normierung auf eine Quelle. F-RA3-03.
- **PI-ENGINE-2** Assembly-Validator einfuehren: Post-Assembly-Pass, der (a) Entity-Encoding, (b) Hefteintrag-Struktur, (c) Aufgaben-Min-Count, (d) material_referenz-Rueckreferenzen, (e) Umlaut-Sanity prueft. F-RA3-04/07/08.
- **PI-ENGINE-3** Entity-Encoding-Pipeline-Hardening: Source → Assembly → Deploy UTF-8 durchgehend, Entity-Scan als Hard-Gate. F-RA3-02.

**Cluster Didaktik (2):**
- **PI-DIDAKTIK-1** Typ-Selektions-Katalog R7: Jahrgangsstufen-Constraint fuer Aufgaben-Typen in `VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN`. Typ `vergleich` (Matrix-Interface) erst ab R8/Gym7. F-RA2-13.
- **PI-DIDAKTIK-2** A18-Luecke-Schliessung: Jede perspektivtragende Materialquelle MUSS als `material_referenz` in mindestens einer Aufgabe auftreten. Hard-Gate Phase 2.2. F-RA2-09.

**Cluster PM/Prozess (4):**
- **PI-PM-1** Post-Kompaktions-Re-Orientation-Protokoll: Nach Auto-Kompaktion obligatorischer Schritt "STATUS + aktueller Patch-Status + naechste Aktion lesen, dann erst weiterarbeiten". Verhindert Kompaktions-induzierte Constraint-Drift. F-RA1-10, F-RA5-02.
- **PI-PM-2** CC→Cowork-Handoff-Template: Standardisiertes Rueckmeldungs-Schema fuer Claude-Code→Cowork-Transitionen (Phase 3.0/3.1/3.2). Pflicht-Felder: Commit-Hash, Push-Status, Patch-Inventar, Verifikations-Artefakte, Next-Action. F-RA5-11.
- **PI-PM-3** STATUS-Freeze bei Patch-Zyklen: Bei Live-Defekt-Patches (Hotfix-Mode) PI-Zustandsblock nicht inkrementieren, bis Claude-Code-Rueckmeldung mit Verifikations-Artefakt eingegangen. Verhindert MAPPEN_ABGESCHLOSSEN-Drift. F-RA5-06.
- **PI-PM-4** Re-Flag-Pattern-Detektor: Bei 2. User-Meldung desselben Problems innerhalb einer Session: PM stoppt neue Patches, erzwingt Verifikations-Gate (Live-Screenshot / Hard-Refresh-Beweis). F-RA5-10.

### 19.3 Pipeline-Patch

- **PI-PIPELINE-1** Patch-Propagation-Check im Deploy-Vertrag: VERTRAG_PHASE_3-1 DEPLOY-06 ergaenzen um Patch-Propagation-Regel: "Jede Source-JSON-Aenderung triggert Re-Assembly oder Assembly-Validator-Fail". F-RA1-07, F-RA4-04.

### 19.4 Q-Gate-Revision

Zusaetzliche Q-Gates fuer Pilot-Freigabe:
- **Q-MEDIEN-PROSPEKTIV** Phase 0.2: Alle Wikimedia-/Archiv-Dateinamen vor Weiterverarbeitung via API verifiziert. Kein Pipeline-Forward bei 404.
- **Q-LIZENZ-COMPLIANCE** Phase 2.1: Jedes bildquelle-Material mit vollstaendigem Attribution-Set (urheber, commons_url, deed_url).
- **Q-SOURCE-DEPLOY-PARITY** Phase 3.1: Source-JSON und data.json sind inhaltsgleich fuer Material-Content. Hash-Check oder Re-Assembly-Drift-Detect.
- **Q-TYP-R7-KONFORMITAET** Phase 2.2a: Aufgaben-Typ-Auswahl durch R7-Jahrgangs-Constraint gefiltert.

### 19.5 Aktualisierter Status F-P1 / F-P2 (aus M1-Befund)

- **F-P1** (ORCHESTRATOR nicht als Router): **NEUTRALISIERT** durch v3.9-Steuerungsrefaktor (PI=SSOT, ORCH=Referenz). Testrun-Evidenz: 20 ORCH-Reads vs. 107 PI-Reads vs. 74 VERTRAG_PHASE-Reads. Nicht wiederkehrend als Ursprungs-Defekt.
- **F-P2** (Phase 3 in Cowork statt Claude-Code): **TEILWEISE REZIDIV** als neue Variante "CC→Cowork-Rueckmelde-Luecke" (F-RA5-11). Ursprungs-Root-Cause bleibt behoben, aber Handoff-Richtung CC→Cowork ohne strukturiertes Rueckmeldungs-Schema fuehrt zu Re-Flag-Pattern und PI-Zustandsblock-Drift. Adressierung via PI-PM-2.

### 19.6 Neue Artefakte

- `docs/projekt/testrun-nationalismus-kolonialismus/BEFUND_TESTRUN_N-K_KONSOLIDIERT.md` — Konsolidierter Audit-Befund.
- `docs/projekt/testrun-nationalismus-kolonialismus/BERICHT_RA1_PIPELINE.md` bis `BERICHT_RA5_PM_PROZESS_META.md` — 5 RA-Teilberichte.
- `docs/projekt/testrun-nationalismus-kolonialismus/EVIDENZ_BUNDLE.md` — Forensische Evidenz-Synthese.
- `docs/projekt/testrun-nationalismus-kolonialismus/evidenz/*` — JSONL- und CSV-Extrakte.
- `docs/projekt/testrun-nationalismus-kolonialismus/CHARTA_RA1_*.md` bis `CHARTA_RA5_*.md` — Auftrags-Chartas der 5 Review-Agenten.

### 19.7 Total-Plan-Impact-Count

**30 Plan-Impact-Items** total (17 R0-FINAL+ + 13 v1.3 Delta).

---

## 20. v1.4 Delta — Agent-Dispatch-Architektur + Feld-Evidenz (2026-04-20)

### 20.1 Trigger

Zwei neue Befunde zum geplanten v3.12-Pilot-Launch machen ein Re-Gating erforderlich:

- **T1 — Feld-Evidenz (Paul, Unterricht 2026-04):** Generierte Mappen sind **zu schwer** bzw. **didaktisch zu wenig praezise**. F0b deckt 9/9 PQI-1, aber nicht den vollen 21er-A-CODE-Katalog und keine der 6 A-PROZ-Items.
- **T2 — Dispatch-Architektur-Diagnose:** Sub-Agenten werden aktuell nicht technisch via Task/Agent-Tool dispatched, sondern als lineare Prompt-Interpolation im Orchestrator-Kontext abgearbeitet. Q-Gates pruefen sich teils selbst (Self-Check-Bias). Empirisch korreliert mit RA5 F-RA5-11 "CC→Cowork-Rueckmelde-Luecke" und 12 Auto-Kompaktionen im Testrun.

Konsequenz: **v3.12-Pilot (Task #39) wird zurueckgestellt** bis F0d und F0f PASS/FAIL liefern.

### 20.2 Neue PI-Items

Cluster "Agent-Dispatch-Architektur":

- **PI-DISPATCH-1** Sub-Agent-Dispatch-Refaktor: Alle Sub-Agent-Rollen (`SUB_AUFGABE_GENERATOR`, `SUB_MATERIAL_QUELLENTEXT`, `SUB_MATERIAL_BILD`, etc.) werden als eigenstaendige Cowork-Agent-Calls mit isoliertem Kontext implementiert. Kein geteilter Orchestrator-Kontext. Vertrags-Definition: Input-JSON-Schema + Output-JSON-Schema je Rolle.
- **PI-DISPATCH-2** Q-Gate-Dispatch-Separation: Q-Gate-Agenten werden separat vom erzeugenden Agenten dispatched. Q-Gate-Agent kennt Generator-Chain-of-Thought **nicht**. Pruefer-Bias eliminiert.
- **PI-DISPATCH-3** Return-Schema-Vertraege: Jeder Agent-Call liefert strukturiertes JSON (kein Freitext), damit Orchestrator deterministisch weiterrouten kann. Schema versioniert, Mismatch = Hard-Fail.

Cluster "Feld-Evidenz":

- **PI-FELDEVIDENZ-1** A-CODE-Coverage-Gap: Feld-Evidenz-Register `docs/projekt/FELD_EVIDENZ_REGISTER.md` als neue SSOT fuer Pilot-Gating. Klassifikation C1/C2/C3 der Beobachtungen gegen Matrix v2.1. C3-Gaps muessen entweder geschlossen oder als pilot-unkritisch gekennzeichnet sein. Detaillierte Methodik: `docs/projekt/F0f_FELD_EVIDENZ_PLAN.md`.

### 20.3 Neues Q-Gate

- **Q-DISPATCH-ISOLATION** (Phase 2.1 und 2.2a): Jeder Sub-Agent-Output + jeder Q-Gate-Pass wird durch Kontext-Isolation-Check validiert: Agent hatte keinen Zugriff auf fremde Chain-of-Thought. Nachweis-Artefakt pro Run: Agent-ID + Dispatch-Kontext-Hash. Aktivierung bedingt an F0d PASS.

### 20.4 Pilot-Re-Gating-Regel

v3.12-Pilot (Task #39) ist **blocked_by**:

- Task #46 (F0d Dispatch-Spike) muss PASS oder MIXED liefern, oder explizit FAIL + UPGRADE_PLAN-Nachtrag (PI-DISPATCH-1/2/3 auf DEFERRED).
- Task #47 (F0f Feld-Evidenz) muss Gap-Report liefern, alle C3-Gaps klassifiziert (geschlossen oder pilot-unkritisch).

Erst danach entscheidet Paul ueber Pilot-Fortsetzung (Task #39 entblockt).

### 20.5 Dispatch-Layer-Wahl

**Default:** Cowork Agent-Tool (Task-Call mit isoliertem Kontext). Vorteil: vermeidet Prevent-First-Gate-Klasse an Fehlern (argv-Hang, ENOENT, Auth-Gate) vollstaendig, da kein Cross-Process-Handoff.

**Reserviert fuer CC-Handoff:** Ausschliesslich Batch-Mass-Runs (z.B. 20+ Mappen parallel fuer Evaluierungs-Korpus). CC-Handoff bleibt dokumentiert, aber nicht mehr Standard-Pfad der Mappen-Generierung.

### 20.6 Neue Artefakte

- `docs/projekt/F0d_DISPATCH_SPIKE_PLAN.md` — Spike-Methodik (Hypothese, A/B, Metriken, Gating). **v2.0 (2026-04-20) Realitaets-Refaktor:** Scope auf realen Fall `mat-4-3 Vernichtungsbefehl` Mappe 4 Nationalismus-Kolonialismus, Input-Bundle aus 11 produktiven Artefakten (MATERIAL_GERUEST-Row / SEQUENZKONTEXT / hefteintrag.json / SUB_MATERIAL_QUELLENTEXT.md / F0B_PRIMING_INCLUDE §1-§3 / SKRIPT §4+§5 / INHALTSBASIS F4-4 bis F4-9 / einstieg.json / ARTEFAKT_INVENTAR pq-4-1 / DIDAKTIK_RAHMEN / perspektiven_policy), Priming-Paket pro Arm explizit, Output gegen `material-output-schema.json` strict-validiert. Neue Metriken M6 Schema-Konformitaet, M7 Q-Gate-Coverage, M8 didaktische Realitaetsnaehe.
- `docs/projekt/F0f_FELD_EVIDENZ_PLAN.md` — Erhebungsbogen, Matrix-Mapping, Gap-Report-Template.
- `docs/projekt/FELD_EVIDENZ_REGISTER.md` — **zu erstellen** im Rahmen Task #47.
- `docs/projekt/F0d_BEFUND.md` — **zu erstellen** im Rahmen Task #46.
- `docs/projekt/testrun-dispatch-spike/` — Run-Logs (3 A + 3 B) + `input_bundle/` (Pre-Run-Fixierung + SHA-256-Hash).
- `docs/projekt/testrun-feld-evidenz/` — Erhebungsboegen.

### 20.7 Aktualisierter Total-Plan-Impact-Count

**34 Plan-Impact-Items** total (17 R0-FINAL+ + 13 v1.3 Delta + 4 v1.4 Delta).

v1.4 Delta = 4 Items: PI-DISPATCH-1, PI-DISPATCH-2, PI-DISPATCH-3, PI-FELDEVIDENZ-1.
(Q-DISPATCH-ISOLATION ist Q-Gate, nicht PI-Item im Zaehler.)

### 20.8 Task-Kopplung

| Task | Subjekt | Status | blockedBy |
|---|---|---|---|
| #46 | F0d Dispatch-Spike | pending | — |
| #47 | F0f Feld-Evidenz | pending | — |
| #48 | F0g Agent-Dispatch-Refaktor | pending (conditional) | #46 (PASS) |
| #49 | UPGRADE_PLAN v1.4 eingearbeitet | in_progress | — |
| #39 | F0b.3 E2E-Pilot v3.12 | pending | #46, #47 |
| #40 | F0b.3b Qualitaets-Drift-Audit | pending | #39 |

---

**Status:** v1.4, 2026-04-20. Pilot-Re-Gating aktiviert. Dispatch-Architektur + Feld-Evidenz parallel priorisiert.

---

## 21. v1.5 Delta — F0e-AEF Material-Subagent-Haertung (2026-04-23)

### 21.1 Problem-Kontext

F0e-AEF-Spike (Agent-Expertise-Forming) hat am Fallstudien-Material `mat-4-3` (Trothas Vernichtungsbefehl 1904, Mappe 4 Kolonialismus) den Shadow-Overlay + zweistufiges Schema-Gate-Mechanismus validiert. Paul-Review der 4 Generierungs-Runs (I1 + I2 n=3) identifizierte 8 wiederkehrende Qualitaets-Defizite, deren Strukturanalyse ergab: ueberwiegend **Enforcement-Luecken** zwischen bestehenden authoritative Regeln (ENUM_TRIGGER_FLAGS, Phase 2.1c `ueberleitungen.json`, SUB_AUFGABE_QUELLENKRITIK W-Fragen-Schema) und dem Material-Subagent-Overlay v1.0.

**Spike-Artefakte:**
- `docs/projekt/f0e-agent-expertise/F0e_VERGLEICHS_REVIEW.md` (Paul-Sign-Off 2026-04-21)
- `docs/projekt/f0e-agent-expertise/F0e_PI_AUDIT_REPORT.md` (architect-review, 2026-04-23)
- `docs/projekt/f0e-agent-expertise/F0e_PI_AUDIT_DECISIONS.md` (Paul-Entscheidungen, 2026-04-23)
- `docs/projekt/f0e-agent-expertise/F0e_PI_ITEMS_FINAL.md` (finalisierte PI-Liste)
- `docs/projekt/f0e-agent-expertise/runs/iteration-3/BEFUND_I3.md` (I3 PASS, 2026-04-23)

### 21.2 Strukturursachen (5, aus Paul-Feedback + Audit-Revision)

1. **Lerngruppen-Profil fehlt im Dispatcher-Priming.** Subagent kennt Jahrgangsstufe/Schulart/DaZ-Anteil nicht explizit. → Kategorie C (neue Regel). PI 3.5.

2. **Material vs. Aufgaben-Phasen-Trennung nicht durchgesetzt.** Phase 2.1c (`ueberleitungen.json`) + `SUB_AUFGABE_QUELLENKRITIK` existieren. Overlay v1.0 verweist nicht darauf, Material-Subagent erzeugt "Denk nach:"-Bloecke und Fragestellungen im `inhalt`. → Kategorie A (Enforcement). PI 3.6a + 3.6b.

3. **SSOT-Quellenangabe nicht durchgesetzt.** Feld `quelle` ist SSOT laut Schema, aber `inhalt` enthaelt Duplikate/Fussnoten. → Kategorie A + C. PI 3.7.

4. **Wortanzahl-Obergrenze fehlt kalibriert.** Runs variierten zwischen 98 und 268 Woertern. → Kategorie C. PI 3.2.

5. **Nachweis-Dramaturgie + Titel-Funktion nicht spezifiziert.** Meta-Bewertung in Einleitungs-Prosa, inhaltsleere Titel-Formulierung. → Kategorie C. PI 3.9 + 3.10.

Zusaetzliche abgeleitete Regeln: D6-Typ-Haertung (Array vs. String) PI 3.1, Sprachliche Vorentlastung via Priming PI 3.8, ENUM_TRIGGER_FLAGS-Compliance PI 3.4.

### 21.3 PI-Items (Referenz)

Vollstaendige Spezifikation: `docs/projekt/f0e-agent-expertise/F0e_PI_ITEMS_FINAL.md`.

| ID | Titel | Kategorie | Prio | I3-Status |
|---|---|---|---|---|
| 3.1 | PI-SCHEMA-STRICT-01 (+D6) | A+E | P1 | **VERIFIED** |
| 3.2 | PI-CONTENT-LENGTH-01 | C | P1 | **VERIFIED** |
| 3.4 | PI-TRIGGERFLAG-ENUM-01 | A | P3 (deferred) | offen |
| 3.5 | PI-ZIELGRUPPE-PROFIL-01 | C | P2 | offen |
| 3.6a | PI-INHALT-PROSA-ONLY-01 | A | P1 | **VERIFIED** |
| 3.6b | PI-DATENFLUSS-IMPULSE-AUFGABE-01 | B | P2 | offen |
| 3.7 | PI-QUELLE-SSOT-01 | A+C | P1 | **VERIFIED** |
| 3.8 | PI-SPRACHLICHE_VORENTLASTUNG-01 | C | P2 | offen |
| 3.9 | PI-NACHWEIS-DRAMATURGIE-01 | C | P3 | offen |
| 3.10 | PI-META-BEZEICHNUNG-01 | C | P3 | offen |

Gestrichen: 3.3 PI-MULTIPERSPEKTIVE-INHALT-01 (redundant mit MATERIAL-PERSPEKTIV-01 im Overlay).

### 21.4 Neue Q-Gates

Zusaetzlich zu M1-M15 aus `QUALITAETSKRITERIEN_MATERIALPRODUKTION.md`:

- **M16 Prosa-Only:** `quellentext.inhalt` enthaelt keine "Denk nach:", keine isolierten Fragestellungen, keine Aufgaben-Operatoren (Heuristik-Regex). Owner: PI 3.6a. **I3-Status:** 4/4 PASS.
- **M17 Quelle-SSOT:** Keine Quellenangabe-Duplikate im `inhalt`-Feld (Regex mit `<p>`-Scope, `<blockquote>`-Attributionen ausgenommen). Owner: PI 3.7. **I3-Status:** 4/4 PASS.
- **M18 Sprachliche Vorentlastung:** weich. Priming-Compliance-Check im Material-Subagent-Output (keine Glossar-Bloecke, Prosa-Fluss mit Appositionen). Owner: PI 3.8. Aktivierung in Phase 21.B.

### 21.5 Umsetzungs-Phasen

**Phase 21.A (P1, Overlay v1.1 + Schema-Gate-Promotion) — DONE 2026-04-23:**
- PI 3.1 Schema-Gate-Promotion (Pinned SHA + D6-Typ-Haertung) — verified via I3 (Partial-Schema `type:array` minItems=2).
- PI 3.2 Cap-Staffelung + Priming-Direktive — verified via I3 (Schema `maximum:180`, 4/4 ≤ 118 W).
- PI 3.6a Prosa-Only-Regel mit Phase-2.1c-Verweis — verified via I3 (Overlay §4, 4/4 konform).
- PI 3.7 Quelle-SSOT-Regel mit `<p>`-Scope — verified via I3 (Overlay §5, 4/4 `cite`=Attribution).
- Deliverable: Overlay v1.1 + Schema v3.10.3 Full+Partial + Validator mit PINNED_SCHEMA_HASH `f08df7ee…` produktiv.
- Commit-Kette: `9fcc919` Overlay v1.1, `692e051` I3 PASS Empirie, `9d94ca8` STATUS/CHANGELOG-Pflege.

**Phase 21.B (P2, Datenfluss-Vertraege + Zielgruppe) — offen:**
- PI 3.5 Zielgruppen-Profil-Priming.
- PI 3.6b `VERTRAG_PHASE_2-2b` + `SUB_AUFGABE_QUELLENKRITIK` + `SUB_MATERIAL_QUELLENTEXT` Vertrags-Update.
- PI 3.8 Sprachliche Vorentlastung (Priming, M18-Aktivierung).
- Deliverable: Vertrags-Revision + Overlay-Ergaenzung v1.2 + I4-Validierung (n=4, `mat-4-3` + ggf. Case-Erweiterung).

**Phase 21.C (P3, Enum-Enforcement + Stil-Regeln) — offen, PI 3.4 gekoppelt an Promotion-Track:**
- PI 3.4 ENUM_TRIGGER_FLAGS als separate Datei + Schema-Gate-Enforcement (deferred an Generator-Repo-Promotion).
- PI 3.9 Nachweis-Dramaturgie.
- PI 3.10 Meta-Bezeichnung + Positiv-Beispiel-Bibliothek.
- Deliverable: Enum-SSOT-Datei + Overlay-Ergaenzung.

### 21.6 Betroffene Artefakte

| Datei | Phase | Aenderungs-Typ |
|---|---|---|
| `docs/projekt/f0e-agent-expertise/gate-prototype/schemas/material_quellentext_v3.10.3.json` (Full+Partial) | 21.A (DONE) | Neu, pinned SHA |
| `docs/projekt/f0e-agent-expertise/gate-prototype/overlays/PROMPT_HARDENING_QUELLENTEXT_v1-1.md` | 21.A (DONE) | Neu, loest v1.0 ab |
| `docs/projekt/f0e-agent-expertise/gate-prototype/scripts/validate_material_output.py` | 21.A (DONE) | PIN-Update |
| `docs/agents/SUB_MATERIAL_QUELLENTEXT.md` (Generator-Repo v3.10.4) | Promotion-Track | Regel-Ergaenzungen v3.11.0 |
| `docs/agents/SUB_AUFGABE_QUELLENKRITIK.md` | 21.B | Auswahl-Heuristik + Trigger-Priming |
| `docs/architektur/vertraege/VERTRAG_PHASE_2-2b_AUFGABE.md` | 21.B | Eingabe-Definition erweitern |
| `docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md` | 21.A/B/C | M16 (DONE) / M17 (DONE) / M18 (21.B) hinzufuegen |
| `docs/agents/ENUM_TRIGGER_FLAGS.md` (neu, Generator-Repo) | 21.C | SSOT-Datei ausgliedern |

### 21.7 Akzeptanzkriterien

Phase 21.A (I3) — ALLE ERFUELLT:
- Schema-Pass-Rate 4/4 = 100 % (Baseline 3/4).
- D6-Inzidenz 0/4 (Baseline 1/4).
- Wortanzahl-Cap ≤ 180 4/4 (Max 118, Varianz Max/Min 1.09 vs. Baseline 2.74).
- Didaktik-Mittel 4.55 (Baseline 4.15), Didaktik-Min 4.2 (Baseline 3.8).
- Patch-Zyklen 0. Overlay-Compliance D1-D5 4/4.

Phase 21.B (kuenftig): M18 aktiv, I4 n=4 gegen P2-Cluster mit Didaktik-Mittel ≥ 4.2, Zielgruppen-Profil sichtbar im Output.

Phase 21.C (kuenftig): ENUM_TRIGGER_FLAGS-Compliance 100 % in Re-Run, Nachweis-Dramaturgie + Meta-Bezeichnung in Paul-Review ≥ 4.0.

### 21.8 Abhaengigkeiten und Reihenfolge

**Vorbedingung Phase 21.A:** Schema-Prototyp + Gate-Chain (Commit `2636120`), Overlay v1.0-Shadow (Commit `dc1a91a`).
**Durchgefuehrt:** Phase 21.A = DONE via I3-PASS (Commit-Kette bis `9d94ca8`).
**Kopplung Phase 21.C PI 3.4:** Promotion-Track Schema v3.10.3 + Overlay v1.1 in `snflsknfkldnfs/escape-game-generator` Kern (separater Track, nicht F0e-Scope). ENUM_TRIGGER_FLAGS-Ausgliederung ist Teil dieses Promotion-Tracks.
**Optional synergetisch:** v3.6 AGENT_DIFFERENZIERUNG uebernimmt langfristig `erklaerungen[]` und `aufgabenstellung_daz` (PI 3.8 Langfrist-Pfad).

### 21.9 Risiken

- **R-§21-1 Overlay-Drift bei erweiterten Cases:** I3 nur gegen `mat-4-3` validiert. Andere Cases (mat-3-2, mat-5-1, karte, bildquelle) nicht getestet. Mitigation: Phase 21.B I4-Validierung mit Case-Erweiterung, oder separater Case-Generalisierungs-Track.
- **R-§21-2 Schema-Gate-Drift:** Pinned SHA `f08df7ee…` muss gegen Stille-Updates abgesichert werden. Mitigation: SHA-Hash in `PROVENANCE.md` eingecheckt, Validator enforcet PIN.
- **R-§21-3 Cap 180W-Restriktion:** kann bei komplexen Quellen zu Kontextverlust fuehren. Mitigation: Overlay v1.1 §2 gestaffelt 120/150/180 mit Begruendungs-Pflicht, I3 zeigt 4/4 ≤ 118 W ohne Qualitaets-Verlust.
- **R-§21-4 Enum-Promotion-Coupling:** ENUM_TRIGGER_FLAGS-Ausgliederung betrifft 7 Subagent-Specs. Mitigation: Single-Commit im Promotion-Track, alle Dateien gleichzeitig.
- **R-§21-5 Regression Bestands-Mappen:** M16/M17 koennten Bestands-Materialien retrogressiv invalidieren. Mitigation: Warn-Gate statt Fail-Gate in der ersten 2 Wochen nach Promotion, gefolgt von Fix-Wave.

### 21.10 Out-of-Scope

- **AGENT_UEBERLEITUNG** (F-A5 Szenario B): optional fuer v4.1.
- **v3.6 AGENT_DIFFERENZIERUNG**: langfristig, nicht F0e-PI.
- **F-A2 offene Fragen** (Schweregrad-Mapping / Alternative-Material-Katalog / Over-Flagging-Schwelle): separater Task.
- **Weitere Material-Typen** (bildquelle, darstellungstext, karte, zeitleiste, statistik, tagebuch): F0e-PI fokussiert auf quellentext. Uebertragung nach Phase 21.A-Promotion (Promotion-Track B-Scope).
- **Case-Generalisierung**: Nur `mat-4-3` getestet in I3. Andere Cases offen fuer separates Replikat.

### 21.11 Referenzen

- `docs/projekt/f0e-agent-expertise/F0e_VERGLEICHS_REVIEW.md`
- `docs/projekt/f0e-agent-expertise/F0e_PI_AUDIT_REPORT.md`
- `docs/projekt/f0e-agent-expertise/F0e_PI_AUDIT_DECISIONS.md`
- `docs/projekt/f0e-agent-expertise/F0e_PI_IMPULSE_OWNERSHIP_IMPL_CHECK.md`
- `docs/projekt/f0e-agent-expertise/F0e_FA2_TRIGGER_FLAGS_KONSUMENTEN_SCAN.md`
- `docs/projekt/f0e-agent-expertise/F0e_FA5_MAPPEN_NARRATIV_LUECKEN_CHECK.md`
- `docs/projekt/f0e-agent-expertise/F0e_PI_ITEMS_FINAL.md`
- `docs/projekt/f0e-agent-expertise/gate-prototype/overlays/PROMPT_HARDENING_QUELLENTEXT_v1-1.md`
- `docs/projekt/f0e-agent-expertise/gate-prototype/schemas/material_quellentext_v3.10.3.json` + Partial + `PROVENANCE.md`
- `docs/projekt/f0e-agent-expertise/runs/iteration-3/BEFUND_I3.md` v1.0 (I3-PASS-Dokumentation)

### 21.12 I3-PASS-Status (2026-04-23)

**Entscheid:** Phase 21.A **DONE**. Overlay v1.1 + Schema v3.10.3 empirisch validiert (n=4, `mat-4-3`), §19.7-Akzeptanzkriterien der Iteration-3 vollstaendig erfuellt (Kreuzref: `runs/iteration-3/BEFUND_I3.md` v1.0).

**Metriken-Matrix (Baseline I1+I2 → I3):**

| Metrik | Baseline (n=4) | I3 (n=4) | Delta |
|---|---|---|---|
| Schema-Pass-Rate | 3/4 = 75 % | 4/4 = 100 % | +25 Pp |
| D6-Inzidenz | 1/4 = 25 % | 0/4 | −25 Pp |
| Wortanzahl-Max (W) | 268 | 118 | −56 % |
| Wortanzahl-Varianz (Max/Min) | 2.74 | 1.09 | −60 % |
| Didaktik-Mittel | 4.15 | 4.55 | +0.40 |
| Didaktik-Minimum | 3.8 | 4.2 | +0.40 |
| Patch-Zyklen | 0 | 0 | — |

**P1-Cluster CLOSED:** PI 3.1 / 3.2 / 3.6a / 3.7 empirisch verifiziert. M16 + M17 4/4 PASS.

**Commit-Kette Phase 21.A:**
- `2636120` Vor-Arbeit Gate-Prototyp + Plan + Fixtur.
- `dc1a91a` Iteration-1 PASS Shadow-Overlay + Gate-Chain.
- `8e51a8b` + `979c0c2` Iteration-2 BEFUND MIXED + Audit + PI-Items final.
- `9fcc919` Overlay v1.1 Phase 21.A P1-Cluster-Haertung.
- `692e051` I3 PASS Empirie (4/4, Schema v3.10.3 + Overlay v1.1).
- `9d94ca8` STATUS/CHANGELOG-Pflege-Commit.

**Naechste Schritte:**
- **Promotion-Track B** (separat, nicht F0e): Schema v3.10.3 + Overlay v1.1 in `snflsknfkldnfs/escape-game-generator` Kern uebernehmen. Voraussetzungen: v3.10.2 als Lese-Schema behalten, `AGENT_MATERIAL.md` Phase 2.1 um zweistufiges Gate-Pattern erweitern, Rueckwaerts-Test Alt-Materialien.
- **Phase 21.B** (P2, offen): PI 3.5/3.6b/3.8, Overlay v1.2, I4-Validierung.
- **Phase 21.C** (P3, offen, PI 3.4 gekoppelt an Promotion-Track): Nachweis-Dramaturgie + Meta-Bezeichnung.

### 21.13 Total-Plan-Impact-Count

**v1.5 Delta = 10 neue PI-Items** (3.1, 3.2, 3.4, 3.5, 3.6a, 3.6b, 3.7, 3.8, 3.9, 3.10) + 3 neue Q-Gates (M16, M17, M18). 3.3 gestrichen.

Aggregat: **44 Plan-Impact-Items** total (17 R0-FINAL+ + 13 v1.3 Delta + 4 v1.4 Delta + 10 v1.5 Delta).

---

**Status:** v1.5, 2026-04-23. §21 F0e-AEF Integration eingefuegt, Phase 21.A DONE via I3-PASS. Phase 21.B/21.C + Promotion-Track B offen.

---

## 22. v1.6 Delta — Review-Agent-Architektur + Parallel-Dispatch-Infrastruktur (2026-04-23)

### 22.1 Problem-Kontext + Motivation

**Empirischer Ausloeser:** Nach Promotion-Track B FF-Merge (Gen-Repo `9b24b39`) wurde ein Pipeline-Aktivierungs-Smoke mit v3.11.0 quellentext durchgefuehrt (Task-Tool-Dispatch, Case `mat-4-3`). Akzeptanzmatrix 6/6 hart PASS: Partial-Gate + Full-Gate + Schema-PIN + Didaktik-Mittel 4.6. Paul-Review des generierten Outputs identifizierte **zwei strukturelle Defekt-Klassen, die Schema-Gates nicht gefunden haben**:

1. **Sequenz-Kohaerenz-Verletzung:** Einleitungssatz referenziert "Schlacht am Waterberg" — historisch korrekt, aber NICHT im "Vorausgesetzten Wissen" des Sequenzkontexts. Verletzt bestehende Stilregel SQ-1/SQ-2 (seit v3.3 dokumentiert, Self-Check enforcet nicht).
2. **Fakten-Fehler:** "Befehl an die Herero" — der Vernichtungsbefehl war formal an die deutsche Schutztruppe adressiert, die Herero waren Objekt. Grammatikalische Fehlinterpretation der Proklamations-Struktur unter didaktischem Vereinfachungs-Druck.

**Strukturelle Ursache:** Schema-Gates (G1/G2) sind deterministisch fuer strukturelle Regel-Verletzungen, **nicht** fuer semantische/didaktische Defekte. Subagent-Self-Check hat Confirmation-Bias (F0d-Evidenz: 0/6 Compliance trotz self-PASS).

**Loesungs-Ansatz:** Externalisierte Q-Gate-Pruefung via separater Review-Agent-Dispatch (PI-DISPATCH-2 aus §20 v1.4 Delta, jetzt konkretisiert mit Revisor-Modus und Parallel-Dispatch-Infrastruktur).

### 22.2 Architektur — Komponenten-Uebersicht

**Phasen-Diagramm (erweitert):**

```
Phase 2.0  Rahmen-Dateien (hefteintrag.json, einstieg.json, sicherung.json)
Phase 2.0b NEU Sequenzkontext-Pre-Computation (tools/compute_sequenzkontext.py)
           - Pro Material: sequenzkontext_{mat-id}.json mit
             - "Vorausgesetztes Wissen" (Union Vorgaenger fachbegriffe_eingefuehrt)
             - "Noch nicht eingefuehrt" (Union Nachfolger fachbegriffe_eingefuehrt)
             - dispatch-ready BEVOR Parallel-Dispatch startet
Phase 2.1  SUB_MATERIAL_<TYP> Dispatch (parallel oder sequentiell)
           Pre-Flight-Check: existiert material.json + review_v*.json(FAIL)?
             JA → Revisor-Modus (liest Vorlage + Review-Bericht, korrigiert gezielt)
             NEIN → Generator-Modus
Phase 2.1.G1  Partial-Gate (Python, deterministisch, 0 Token)
Phase 2.1.M   Dispatcher-Merge (mechanisch)
Phase 2.1.G2  Full-Gate (Python, deterministisch, 0 Token)
Phase 2.1.M16 Regex Prosa-Only (Python, deterministisch, 0 Token)
Phase 2.1.M17 Regex Quelle-SSOT (Python, deterministisch, 0 Token)
Phase 2.1.G3  NEU REVIEWER_MATERIAL_<TYP> Dispatch (LLM, semantisch)
           - Input: merged.json + sequenzkontext-Auszug + Q-Gate-Set + Spec-Auszuege
           - Output: strukturierter Review-JSON mit Findings
           - Persistiert: {mat-id}/review_v{N}.json
FAIL-Loop   → zurueck zu Phase 2.1 Revisor-Modus (max 1 Revisions-Iteration)
PASS        → Material persistiert in {mat-id}/material.json
Phase 2.1c  Cross-Material-Konsistenz (unveraendert)
Phase 2.2-3 unveraendert
```

**Komponenten:**

| Komponente | Typ | Neu/Bestehend |
|---|---|---|
| `tools/compute_sequenzkontext.py` | Python-Tool | **neu** |
| `tools/validate_material_output.py` | Python-Tool (Schema-Gate) | bestehend (Track B1) |
| `tools/check_prosa_only.py` (M16-Regex) | Python-Tool | **neu** |
| `tools/check_quelle_ssot.py` (M17-Regex) | Python-Tool | **neu** |
| `agents/REVIEWER_MATERIAL_BASE.md` | Agent-Spec | **neu** |
| `agents/REVIEWER_MATERIAL_<TYP>.md` × 7 | Agent-Spec pro Material-Typ | **neu** |
| `agents/SUB_MATERIAL_<TYP>.md` | Subagent-Spec | bestehend, Revisor-Modus-Ergaenzung |
| `agents/AGENT_MATERIAL.md` | Dispatcher-Spec | bestehend, §2.1.G3 + Revisor-Integration neu |
| Pro-Material-Verzeichnis | File-Struktur | **neu** (Breaking-Change ab v3.11.0) |

### 22.3 Sub-Agent-Modus-Erweiterung (Generator + Revisor)

**Architektur-Entscheidung:** Gleicher Agent-Typ (`SUB_MATERIAL_<TYP>`), Modus-Bestimmung via **Pre-Flight-File-Check** (nicht via Dispatch-Parameter).

**Pre-Flight-Logik:**

```
1. Arbeits-Verzeichnis: {game-id}/mappe-{N}/materialien/{mat-id}/
2. Pruefe:
   - material.json vorhanden?
   - review_v*.json vorhanden? Welcher hoechste Index?
   - Letzter Review-Status?
3. Entscheidungs-Tabelle:

| material.json | review_v*.json | Letzter Review | Modus |
|---|---|---|---|
| nein | — | — | GENERATOR |
| ja | nein | — | (inkonsistent, Warn) |
| ja | ja | FAIL | REVISOR |
| ja | ja | PASS | (bereits fertig, Skip) |
```

**Revisor-Modus-Pflicht-Lektuere:**
1. Vorherige material.json (Vorlage).
2. Hoechster review_v{N}.json (Findings).
3. sequenzkontext_{mat-id}.json (Kontext).
4. Eigene Subagent-Spec (inkl. v3.11.0-Ausgabe-Haertung).

**Revisor-Modus-Direktive:**
- Verstehe **jedes** Finding im Review-Bericht.
- Korrigiere **PRAEZISE** die Stellen, die im Bericht adressiert sind.
- Aendere **NICHT** andere Teile des Materials (keine Re-Generierung).
- Dokumentiere Korrektur-Entscheidungen implizit im Output.

**Modus-Gleichheit:** Q-Gate-Kriterien, Sprachregeln, Schema-Konformitaet identisch. Nur Ausgangspunkt (leeres Template vs. Vorlage + Bericht) unterscheidet sich.

### 22.4 Reviewer-Agent-Spec-Standard

**Architektur: Hybrid-Template-Pattern (BASE + 7 Typ-Specializations).**

**BASE (`REVIEWER_MATERIAL_BASE.md`):**
- Generic Q-Gates: SQ-1/SQ-2 (Sequenz-Kohaerenz), Q8 (Perspektivitaet), Q10 (Fakten-Plausibilitaet), KONTEXT-DRIFT.
- Input-Vertrag: merged.json + sequenzkontext-Auszug + Q-Gate-Set + Spec-Auszuege.
- Output-Vertrag: strukturiertes Review-JSON (siehe unten).
- **Adversarial-Prompt:** "Finde Schwaechen. Liste jede Kritik, die ein strenger Geschichtslehrer vorbringen kann. Keine PASS-Bestaetigung ohne strenge Pruefung."
- Model-Default: Opus (Fallback Sonnet), Haiku ausgeschlossen.

**Typ-Specializations:**
- `REVIEWER_MATERIAL_QUELLENTEXT.md` — BASE + QT-1..QT-6 (Originalnaehe, Dreischritt-Aufbereitung, Rekonstruktions-Vorrangregel v3.10.4).
- `REVIEWER_MATERIAL_DARSTELLUNGSTEXT.md` — BASE + DT-1..DT-6 (Narrative Kohaerenz, Fachbegriff-Progression).
- `REVIEWER_MATERIAL_BILDQUELLE.md` — BASE + BQ-1..BQ-6 (3-Funktions-Bildunterschrift, Lizenz, MV2-Hallu-Check).
- `REVIEWER_MATERIAL_KARTE.md` — BASE + KA-1..KA-6 (Legende, Orientierung, topographische Korrektheit).
- `REVIEWER_MATERIAL_ZEITLEISTE.md` — BASE + ZL-1..ZL-5 (Leitfrage, Eintragskount ≤ 8).
- `REVIEWER_MATERIAL_STATISTIK.md` — BASE + ST-1..ST-6 (Diagrammtyp R7, Datenquellen-Nachweis).
- `REVIEWER_MATERIAL_TAGEBUCH.md` — BASE + TB-1..TB-6 (Figurkonstruktion, historische Plausibilitaet).

**Output-Vertrag (JSON-Schema):**

```json
{
  "reviewer_id": "REVIEWER_MATERIAL_QUELLENTEXT_v1.0",
  "review_iteration": 1,
  "material_id": "mat-4-3",
  "reviewed_at": "2026-04-23T14:00:00Z",
  "overall": "PASS | WARN | FAIL",
  "gate_results": [
    {
      "gate": "SQ-1",
      "category": "Sequenz-Kohaerenz",
      "result": "FAIL",
      "findings": [
        {
          "severity": "FAIL | WARN",
          "location": "inhalt/einleitung/satz-2",
          "quote": "nach der Schlacht am Waterberg",
          "description": "Waterberg nicht im Vorausgesetzten Wissen dieser Position (mat-4-3).",
          "recommendation": "Kontext auf Oktober-1904-Situation ohne Militaer-Detail, z.B. 'waehrend des Herero-Aufstands in Deutsch-Suedwestafrika'."
        }
      ]
    },
    {
      "gate": "Q10",
      "category": "Fakten-Korrektheit",
      "result": "FAIL",
      "findings": [
        {
          "severity": "FAIL",
          "location": "inhalt/einleitung/satz-2",
          "quote": "einen Befehl an die Herero",
          "description": "Befehl war formal an deutsche Schutztruppe adressiert, Herero waren Objekt. Grammatikalische Fehlinterpretation der Proklamations-Struktur.",
          "recommendation": "Formulierung: 'erliess er einen Befehl zur Vernichtung der Herero'."
        }
      ]
    }
  ],
  "warnings_for_meta": ["Opferzahlen im Fliesstext grenzwertig Ueberwaeltigungsverbot — Lehrkraft-Hinweis empfohlen"],
  "confidence": 0.92
}
```

### 22.5 Dispatcher-Kontrakt-Erweiterung (G3 + Re-Dispatch-Loop)

**AGENT_MATERIAL.md §2.1-Gates wird erweitert:**

```
Phase 2.1 Dispatch (Generator- oder Revisor-Modus via Pre-Flight)
  ↓
Phase 2.1.G1 Partial-Gate (Python-Validator, v3.10.3 Partial)
  ↓ PASS (bei FAIL: Re-Dispatch an Subagent, max 2×)
Phase 2.1.M  Dispatcher-Merge
  ↓
Phase 2.1.G2 Full-Gate (Python-Validator, v3.10.3 Full)
  ↓ PASS (bei FAIL: Eskalation User, Dispatcher-Bug-Signal, max 1 Re-Dispatch)
Phase 2.1.M16 Regex Prosa-Only (Python-Tool)
  ↓ PASS (bei FAIL: Re-Dispatch, zaehlt zu G1-Budget)
Phase 2.1.M17 Regex Quelle-SSOT (Python-Tool)
  ↓ PASS (bei FAIL: idem)
Phase 2.1.G3 REVIEWER_MATERIAL_<TYP>-Dispatch
  - Model: Opus (default), Sonnet (fallback)
  - Input: merged.json + sequenzkontext-Auszug + Q-Gate-Set + Spec-Auszuege
  - Output: review_v{N}.json strukturiert
  ↓
  Auswertung:
    overall=PASS → Material persistiert in {mat-id}/material.json
    overall=FAIL → Re-Dispatch an Subagent im Revisor-Modus (max 1 Iteration)
                   Nach 2. G3-FAIL: Eskalation User
    overall=WARN → Persistierung mit review_warnings[] in _meta
```

**Re-Dispatch-Budget (Konsolidiert):**

| Gate | Budget | Grund |
|---|---|---|
| G1 Partial | max 2 Re-Dispatch | Schema-Verletzungen korrigierbar, Subagent lernt aus Validator-Report |
| G2 Full | max 1 Re-Dispatch | Dispatcher-Bug-Signal, nach 1 FAIL Eskalation User |
| M16/M17 | zaehlen zu G1-Budget | Regex-Verletzungen sind strukturell, mit G1 behandelt |
| G3 Reviewer | max 1 Revisions-Iteration | Semantische Revisions koennen endlos loopen, Hard-Budget verhindert Perfektions-Spirale |

### 22.6 Q-Gate-Split + Gate-Verzahnung

**Aufteilung Deterministik vs. LLM:**

| Gate | Executor | Typ | Kosten |
|---|---|---|---|
| G1 Partial-Schema | Python-Validator | deterministisch | 0 Token, <1s |
| G2 Full-Schema | Python-Validator | deterministisch | 0 Token, <1s |
| M16 Prosa-Only | Python-Regex | deterministisch | 0 Token, <0.1s |
| M17 Quelle-SSOT | Python-Regex | deterministisch | 0 Token, <0.1s |
| G3 SQ-1 Sequenz-Kohaerenz | LLM-Reviewer | semantisch | ~25k Tokens |
| G3 SQ-2 Nicht-eingefuehrte Begriffe | LLM-Reviewer | semantisch | idem |
| G3 Q8 Perspektivitaet | LLM-Reviewer | semantisch | idem |
| G3 Q10 Fakten-Korrektheit | LLM-Reviewer | semantisch | idem |
| G3 KONTEXT-DRIFT (neu) | LLM-Reviewer | semantisch | idem |
| G3 Typ-spezifisch QT-/DT-/BQ-/... | LLM-Reviewer | semantisch | idem |

**Reihenfolge-Begruendung (G1/G2/M16/M17 → G3):**
- Deterministische Gates sind 0-Token, 0-Latenz — keine Einsparung bei Reihenfolge-Umkehr.
- Schema-FAIL macht semantisches Review unsinnig (struktur-kaputter Input → unbrauchbare Findings).
- Fehler-Klassen-Trennung: strukturell (G1/G2/M16/M17) vs. semantisch (G3) mit unterschiedlichen Handler-Pfaden.

**Material-Status:** Material ist **nicht endgueltig** bis G3 PASS. G1-M17 sind **notwendig**, G3 ist **hinreichend**. Persistierung in `material.json` erst nach G3 PASS.

### 22.7 Phase 2.0b Sequenzkontext-Pre-Computation (NEU — Parallel-Dispatch-Voraussetzung)

**Problem:** Parallel-Dispatch von N Material-Subagenten bricht Sequenz-Kohaerenz, weil jeder Subagent die Outputs der Vorgaenger noch nicht kennt.

**Loesung:** Dispatcher pre-computiert vor Parallel-Dispatch den vollstaendigen Sequenzkontext-Block pro Material aus bereits verfuegbaren Quellen:
- Sequenzplan §1.9 mit `fachbegriffe_eingefuehrt` + `fachbegriffe_referenziert` pro Material.
- MATERIAL_GERUEST mit `voraussetzung`-Kette.
- Topologische Sortierung der Material-Abhaengigkeiten.

**Output-Struktur:**

```json
// {mat-id}/sequenzkontext.json
{
  "mat_id": "mat-4-3",
  "position_in_mappe": "3 von 6",
  "didaktische_funktion": "erarbeitung",
  "vorausgesetztes_wissen": {
    "fachbegriffe": ["Kolonie", "Weltpolitik", "Marokkokrise", "Schutzgebiet"],
    "source_materialien": ["mat-4-1", "mat-4-2"]
  },
  "noch_nicht_eingefuehrt": {
    "fachbegriffe": ["Konzentrationslager", "Reparationszahlungen", "Genfer Konvention"],
    "source_materialien": ["mat-4-4", "mat-4-5", "mat-4-6"]
  },
  "vorheriges_material": {"id": "mat-4-2", "typ": "darstellungstext", "kerninhalt": "..."},
  "naechstes_material": {"id": "mat-4-4", "typ": "bildquelle", "kerninhalt": "..."},
  "zugeordneter_tb_knoten": {"id": "k4-3", "text": "Koloniale Ausbeutung und Gewalt"},
  "dominante_perspektive": "P1: Deutsche Reichsfuehrung"
}
```

**Tool:** `tools/compute_sequenzkontext.py` (neu in Track C).

**Benefit auch fuer sequentielle Generierung:** Pre-Computation ist deterministisch + fehlerfrei. Ersetzt LLM-Ableitung des Sequenzkontexts durch den Subagenten aus unstrukturiertem MATERIAL_GERUEST-Text.

### 22.8 Persistenz-Modell (Pro-Material-Verzeichnis)

**Breaking-Change ab v3.11.0:** Neue Verzeichnis-Struktur pro Material.

```
docs/agents/artefakte/{game-id}/mappe-{N}/materialien/
├── {mat-id}/
│   ├── sequenzkontext.json    (Pre-Computation-Output Phase 2.0b)
│   ├── partial.json           (Subagent-Output vor Merge, Audit)
│   ├── material.json          (Final-Output nach G3 PASS — das eigentliche Material)
│   ├── review_v1.json         (erste Review-Iteration)
│   ├── review_v2.json         (falls Revisor-Modus erneut gelaufen, max 1 Iteration)
│   └── dispatch_meta.json     (Agent-IDs, Tokens, Dauer, Gate-Reports)
├── {mat-id-naechstes}/
│   └── ...
```

**Migration-Strategie:**
- **Cut-over:** Neue Struktur ab v3.11.0-Produktion (naechste Mappe-Generierung). Alt-Materialien bleiben flat.
- **Alt-Materialien:** unveraendert in v3.10.2-Reader-Route (Fallback-Tabelle aus §21.6 B2 unveraendert).
- **Optional-Migration-Track:** separater Track (nicht MVP), migriert 168 Alt-Materialien. Niedrig-Prio.

**Dispatcher-Impact:**
- AGENT_MATERIAL.md Phase 2.4 Output-Pfad: `{mat-id}/material.json` statt `{mat-id}.json`.
- Phase 3 Assembly-Read-Pfad entsprechend angepasst.

### 22.9 Implementation-Phasen-Plan (Track C)

**Track C0 PM-Verankerung (1-1.5 Tage) — aktiv:**
- §22 v1.6 Delta (dieses Dokument).
- `F0e_REVIEW_AGENT_SPIKE_PLAN.md` in Gen-Repo.
- STATUS + CHANGELOG + Auto-Memory-Pflege.

**Track C1 REVIEWER_MATERIAL_BASE + QUELLENTEXT (3-5 Tage):**
- `agents/REVIEWER_MATERIAL_BASE.md` schreiben.
- `agents/REVIEWER_MATERIAL_QUELLENTEXT.md` als erste Specialization.
- Model-A/B-Test Opus vs. Sonnet auf Stufe-1-Output.
- Akzeptanz: Reviewer findet die 2 Pauls-Defekte (Waterberg + Adressat) = 2/2 Detection-Rate.

**Track C2 Revisor-Modus in SUB_MATERIAL_QUELLENTEXT (2-3 Tage):**
- Pre-Flight-File-Check-Spec in Subagent-Doku.
- Revisor-Modus-Kapitel.
- End-to-End-Test: Generate → Review FAIL → Revise → Re-Review PASS.

**Track C3 Dispatcher-Integration G3 + Phase 2.0b + Verzeichnis-Struktur (3-5 Tage):**
- AGENT_MATERIAL.md §2.1-Gates um G3 erweitern.
- Phase 2.0b Sequenzkontext-Pre-Computation dokumentiert.
- Neue Verzeichnis-Struktur spec-konform.
- `tools/compute_sequenzkontext.py` implementieren.
- `tools/check_prosa_only.py` (M16) + `tools/check_quelle_ssot.py` (M17) implementieren.

**Tracks C4-C9 Template-Replikation (je 2-3 Tage, parallel moeglich):**
- C4 REVIEWER_MATERIAL_BILDQUELLE (hoechste Prio wegen MV2-Hallu-Problem bekannt)
- C5 REVIEWER_MATERIAL_DARSTELLUNGSTEXT
- C6 REVIEWER_MATERIAL_KARTE
- C7 REVIEWER_MATERIAL_TAGEBUCH
- C8 REVIEWER_MATERIAL_ZEITLEISTE
- C9 REVIEWER_MATERIAL_STATISTIK

**Track C10 Abschluss + Parallel-Dispatch-Aktivierung (2-3 Tage):**
- Agent-Teams-Integration fuer parallele Dispatches.
- Gesamt-BEFUND mit Kosten/Latenz-Messung.
- §22 v1.6 → v1.7 Finalisierung.

**Track C-OPT Alt-Material-Migration (2-3 Tage, niedrig-Prio):**
- 168 Alt-Materialien in Neu-Verzeichnis-Struktur migrieren.

**Gesamt-Aufwand:** 25-35 Tage fuer vollstaendige Architektur. Kritischer Pfad C0-C3: 8-10 Tage. C4-C9 parallelisierbar.

### 22.10 Kosten-Modell + Model-Wahl

**Model-Default:**
- **Generator:** Opus (komplexer CREATE-Task, didaktische Tiefe).
- **Reviewer:** Opus (bevorzugt). Sonnet Fallback bei Token-Budget-Constraint. Haiku **ausgeschlossen** (nicht nuancenfaehig genug fuer akademische Review-Tasks).

**A/B-Test-Protokoll (Track C1.4):**

| Reviewer | Model | Messung |
|---|---|---|
| R-Opus | claude-opus-4-6 | Defekt-Detection-Rate, Tokens, Latenz |
| R-Sonnet | claude-sonnet-4-6 | idem |
| R-Haiku | — | ausgeschlossen |

Input: Stufe-1-Output (Agent `a45565508c7f8f3c6`) mit bekannten 2 Defekten (Waterberg, Adressat).

Akzeptanz-Schwelle: Reviewer findet 2/2 Defekte mit Severity FAIL.

Default-Entscheidung:
- Opus 2/2 + Sonnet 2/2 mit >95% Parity → Sonnet (Kosten-Optimierung).
- Opus 2/2, Sonnet <2/2 → **Opus Default**, Sonnet Fallback.

**Token-Budget-Schaetzung:**

| Dispatch | Input-Tokens | Output-Tokens | Total |
|---|---|---|---|
| Generator (Opus) | ~50k | ~2-3k | ~52-53k |
| Reviewer (Opus, minimal) | ~15k | ~3-5k | ~18-20k |
| Pro Material | Generator + Reviewer | | **~70-73k** |
| Pro Mappe (6 Materialien) | | | **~420-440k** |
| Pro Game (4 Mappen) | | | **~1.7M** |

**Overhead vs. Status Quo:** +30-40% Token-Kosten durch Reviewer-Dispatches. Rechtfertigt sich durch Qualitaets-Gain (Confirmation-Bias-Elimination, 2/2 Defekt-Detection).

### 22.11 Risiken + Mitigations

| Risiko | Impact | Mitigation |
|---|---|---|
| R-§22-1 Reviewer-Confirmation-Bias 2. Art (LLM-Reviewer produziert selbst PASS-biased Output) | hoch | Adversarial-Prompt: "Finde Schwaechen, nicht Bestaetigungen." + Optional Dual-Review als Spike-Option in C1.5 |
| R-§22-2 Parallel-Dispatch bricht Sequenz-Kohaerenz ohne Pre-Computation | hoch | Phase 2.0b vor Parallel-Dispatch Pflicht (22.7) |
| R-§22-3 Re-Dispatch-Endlos-Loop bei semantischen FAILs | mittel | Hard-Budget G3 = max 1 Revisions-Iteration, dann Eskalation |
| R-§22-4 Breaking-Change Verzeichnis-Struktur bricht bestehende Read-Pfade | mittel | Cut-over ab v3.11.0, Alt-Materialien unveraendert in Fallback-Route |
| R-§22-5 Reviewer-Kosten-Eskalation bei Mass-Gen-Szenarien | mittel | Sonnet-Fallback auf A/B-Test-Basis, Kosten-Monitoring pro Game |
| R-§22-6 Reviewer-Spec-Pflege-Overhead bei 7 Typ-Specializations | niedrig | Hybrid-Template BASE + Extension, Aenderung Universal-Gate nur in BASE |
| R-§22-7 Typ-spezifische Reviewer finden typ-spezifische Defekte nicht (QT-/DT-/BQ-Kriterien zu allgemein) | mittel | Iterative Verfeinerung via empirische Replikations-Tests pro Typ (C1-C9) |

### 22.12 Aktualisierter Total-Plan-Impact-Count

**v1.6 Delta = 0 neue PI-Items** (v1.6 ist Architektur-Vertiefung bestehender PI-DISPATCH-1 + PI-DISPATCH-2 aus §20, plus neu Phase 2.0b als Infrastruktur-Baustein). Keine Neu-PI-Nummerierung.

Aggregat bleibt: **44 Plan-Impact-Items** (17 R0-FINAL+ + 13 v1.3 Delta + 4 v1.4 Delta + 10 v1.5 Delta). v1.6 Delta erweitert v1.4 Delta PI-DISPATCH-1/2 um Implementation-Details + fuegt Phase 2.0b als Infrastruktur hinzu.

---

**Status:** v1.6, 2026-04-23. §22 Review-Agent-Architektur + Parallel-Dispatch-Infrastruktur eingefuegt. Track C0 PM-Verankerung aktiv, Tracks C1-C10 geplant. Kritischer Pfad C0-C3: 8-10 Tage.
