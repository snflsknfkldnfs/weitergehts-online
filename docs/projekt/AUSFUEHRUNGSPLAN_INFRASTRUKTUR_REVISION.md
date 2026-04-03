# Ausfuehrungsplan: Infrastruktur-Revision vor Mappe 4

**Erstellt:** 2026-04-03
**Grundlage:** GRUNDSATZENTSCHEIDUNG_REBUILD_VS_ITERATE.md §10 (Post-Mappe-3 Empirische Ergebnisse)
**Ausloeser:** User-Browser-Review Mappe 3: 11 Findings (2 BLOCKER, 3 HIGH, 4 MEDIUM, 2 LOW), davon 7 wiederkehrend aus Mappe 2.
**Ziel:** Alle 7 wiederkehrenden Infrastruktur-Maengel beheben + 2 Architektur-Revisionen (Hefteintrag, AGENT_RAETSEL Typauswahl) durchfuehren, BEVOR Mappe 4 in Produktion geht.
**Geschaetzter Gesamtaufwand:** 10-16h ueber 3-5 Sessions
**Erfolgskriterium:** Mappe 4 Browser-Review zeigt 0 wiederkehrende Findings aus B1-B10 und max 2 neue mappe-spezifische Findings.
**Abbruchkriterium:** Falls Mappe 4 nach dieser Revision erneut BLOCKERs oder >3 wiederkehrende Findings zeigt → Eskalation zu Option A (Full Rebuild).

---

## Phasenstruktur

### Phase A: Prompt/Vertrags-Patches (7 Findings)

Gezielte Patches in Vertraegen, Subagenten-Prompts und Q-Gate-Kriterien. Keine Architektur-Aenderung. Jeder Patch ist isoliert testbar.

### Phase B: Architektur-Revision (2 Findings)

Teil-Rebuilds zweier Subsysteme: Hefteintrag-Pipeline und AGENT_RAETSEL Typauswahl. Erfordern Neukonstruktion, nicht nur Patching.

### Phase C: Validierung + Mappe-3-Daten-Patch

Mappe-3-Daten retroaktiv patchen (10 Daten-Patches). Mappe 4 als Validierung der Revision.

---

## Phase A: Prompt/Vertrags-Patches (4-6h, 1-2 Sessions)

### A1: Encoding-Regel erweitern (B1 BLOCKER + B2 MEDIUM)

**Problem:** VERTRAG_PHASE_2-0 (Rahmen) hat keine Encoding-Regel. Die bestehende Encoding-Regel v3.2 in Phase 2.1 deckt nur UTF-8-Umlaute ab, nicht typographische Zeichen (Gedankenstriche, Anfuehrungszeichen).

**Betroffene Dokumente:**
- `docs/architektur/vertraege/VERTRAG_PHASE_2-0_RAHMEN.md` — Encoding-Regel hinzufuegen
- `docs/architektur/vertraege/VERTRAG_PHASE_2-1_MATERIAL.md` — Encoding-Regel erweitern
- `docs/architektur/vertraege/VERTRAG_PHASE_2-1c_CROSS.md` — Encoding-Regel hinzufuegen (Ueberleitungen)
- Alle 7 `SUB_MATERIAL_*.md` — Encoding-Regel auf typographische Zeichen erweitern
- Alle 5 `SUB_AUFGABE_*.md` — Encoding-Regel ergaenzen

**Patch-Inhalt:**
- Encoding-Regel v3.3: "Alle Textfelder in UTF-8. Umlaute als Klartext (ae→ä, oe→ö, ue→ü, ss→ß). Typographische Zeichen: Gedankenstrich als `—` (nicht `--`), Anfuehrungszeichen als `„..."` (deutsch) oder `»...«`. Keine ASCII-Ersatzzeichen."
- In VERTRAG_PHASE_2-0: Als Pflicht-Regel in Output-Spezifikation aufnehmen.

**Akzeptanzkriterium:** Kein `--`, kein `ae/oe/ue/ss` in produzierten JSONs.

---

### A2: Quellenangaben-Feld klaren (B3 MEDIUM)

**Problem:** SUB_MATERIAL-Prompts schreiben Quellenangaben sowohl in den `inhalt`-Body (als cite-Tags oder Nachweis-Zeilen) als auch ins dedizierte `quelle`-Feld. Die Engine rendert beide — Doppelung im Browser.

**Betroffene Dokumente:**
- `docs/agents/SUB_MATERIAL_QUELLENTEXT.md` — Anweisung: Quellenangaben NUR in `quellenangaben[]`, NICHT in `inhalt`
- `docs/agents/SUB_MATERIAL_TAGEBUCH.md` — Gleiche Anweisung
- `docs/agents/SUB_MATERIAL_BILDQUELLE.md` — Pruefen ob betroffen
- `docs/agents/SUB_MATERIAL_DARSTELLUNGSTEXT.md` — Pruefen ob betroffen

**Patch-Inhalt:**
- Explizite Trennregel: "`inhalt` enthaelt den reinen Materialtext. Quellenangaben (Autor, Titel, Jahr, Fundstelle) gehoeren ausschliesslich in das `quellenangaben`-Array. Im `inhalt`-Feld duerfen Sprecher-/Rollennamen erscheinen (z.B. 'Stefan Zweig:'), aber NICHT bibliographische Angaben."

**Akzeptanzkriterium:** `grep` auf produzierte JSONs: Kein bibliographischer Nachweis in `inhalt`-Feldern.

---

### A3: Sprachregister fuer Ueberleitungen (B5 MEDIUM)

**Problem:** VERTRAG_PHASE_2-1c (Cross-Validierung) definiert 6 Achsen fuer Ueberleitungen, aber keine Sprachregister-Vorgabe. Resultat: Ueberleitungen klingen nach didaktischem Kommentar statt nach schuelergerechtem Text.

**Betroffene Dokumente:**
- `docs/architektur/vertraege/VERTRAG_PHASE_2-1c_CROSS.md` — Achse 5 um Sprachregister ergaenzen

**Patch-Inhalt:**
- Achse 5 (Ueberleitungen): Ergaenzen: "Sprachregister R7 (wie Materialien). Zielgruppe: 7. Klasse Mittelschule. Maximal 2 Saetze. Keine didaktischen Metakommentare ('macht die Perspektiven erlebbar'). Stattdessen: direkte Ankuendigung ('Wie hat sich das angefuehlt? Zwei Menschen erzaehlen.')."
- Beispiel fuer gute vs. schlechte Ueberleitung aufnehmen.

**Akzeptanzkriterium:** Ueberleitungen lesen sich wie Moderationstexte, nicht wie Lehrerhandreichungen.

---

### A4: Fragestamm-Kurzregel (B6 HIGH)

**Problem:** Subagenten uebernehmen Operator und Kontext woertlich in Fragestellungen. Resultat: sperrige, ueberladene Aufgabenstellungen ("Ergaenze die fehlenden Fachbegriffe im folgenden Lueckentext, um den Zusammenhang zwischen Kriegsbegeisterung und gesellschaftlichem Druck im August 1914 darzustellen").

**Betroffene Dokumente:**
- `docs/agents/AGENT_RAETSEL.md` — Konstruktionskontext: Fragestamm-Kurzregel hinzufuegen
- Alle 5 `SUB_AUFGABE_*.md` — Fragestellungs-Sektion verschaerfen

**Patch-Inhalt:**
- Regel: "Fragestellung = Handlungsimpuls. Max 1 Satz, max 12 Woerter. Operator NICHT woertlich benennen. Kontext (Zeit, Ort, Material-Bezug) nur wenn nicht aus Setting ableitbar. Der Quellenbezug gehoert in Tipp 1, nicht in die Fragestellung."
- Negativbeispiel: "Ergaenze die fehlenden Fachbegriffe im folgenden Lueckentext, um den Zusammenhang zwischen..."
- Positivbeispiel: "Ergaenze die fehlenden Fachbegriffe."

**Akzeptanzkriterium:** Keine Fragestellung > 15 Woerter in produzierten Aufgaben.

---

### A5: Tipp-2 Wortpool bei Lueckentexten (B7 MEDIUM)

**Problem:** SUB_AUFGABE_LUECKENTEXT generiert als Tipp 2 eine Paraphrase/Erklaerung, die bei Lueckentexten kontraproduktiv ist. Sinnvoller waere ein randomisierter Wortpool (alle oder Teilmenge der einzusetzenden Begriffe).

**Betroffene Dokumente:**
- `docs/agents/SUB_AUFGABE_LUECKENTEXT.md` — Tipp-2-Schema aendern

**Patch-Inhalt:**
- Tipp 2 bei Lueckentext: "Antwortpool: Liste aller einzusetzenden Begriffe in randomisierter Reihenfolge. Format: 'Diese Begriffe gehoeren in die Luecken: [Begriff1], [Begriff2], [Begriff3], ...' Optional: 1-2 Distraktoren beimischen."

**Akzeptanzkriterium:** Tipp 2 bei Lueckentexten ist immer ein Wortpool, nie eine Paraphrase.

---

### A6: Freitext-Bewertungskonzept (B9 HIGH)

**Problem:** Freitext-Aufgaben (Typ "freitext") verwenden kategoriale Keywords als Loesung. Bei persoenlichen Meinungsaeusserungen ist automatisierte kategoriale Bewertung grundsaetzlich unscharf — "richtige" Keywords koennen das Verfehlen des Kerns maskieren.

**Betroffene Dokumente:**
- `docs/agents/SUB_AUFGABE_FREITEXT.md` — Bewertungslogik differenzieren
- `docs/agents/AGENT_RAETSEL.md` — Konstruktionskontext: Freitext nur fuer geeignete Aufgabentypen

**Patch-Inhalt:**
- Freitext-Aufgaben duerfen NUR eingesetzt werden, wenn die erwartete Antwort objektivierbare Inhaltselemente enthaelt (Fachbegriffe, konkrete Fakten, benennbare Zusammenhaenge).
- Bei persoenlicher Meinungsaeusserung/Beurteilung: Operator aus Fragestellung entfernen, Bewertung auf "Abgegeben/Nicht abgegeben" reduzieren (kein kategoriales Scoring), stattdessen Musterloesung als Vergleichstext anzeigen.
- AGENT_RAETSEL: Bei Aufgaben mit AFB III (Beurteilen, Bewerten) → Freitext nur mit reduzierter Bewertungslogik dispatchen.

**Akzeptanzkriterium:** Keine Freitext-Aufgabe mit Beurteilungs-Operator UND kategorialem Keyword-Scoring.

---

### A7: Q-Gate-Erweiterung (praeventiv)

**Problem (aus §10.6):** Q-Gates pruefen nicht auf Sprachregister, Typographie, Formatierungs-Usability, Hefteintrag-Qualitaet.

**Betroffene Dokumente:**
- `docs/architektur/Q-GATE-MECHANIK.md` — Neue Kriterien ergaenzen

**Patch-Inhalt:**
- Neues Kriterium TYP-01: Typographische Korrektheit (keine ASCII-Ersatzzeichen).
- Neues Kriterium REG-01: Sprachregister R7 (alle schuelergerichteten Texte: Ueberleitungen, Einstieg, Sicherung).
- Phase-2.0-Q-Gate: HE1-HE13 als Pflichtpruefung fuer Hefteintrag.

**Akzeptanzkriterium:** Q-Gate-Mechanik deckt alle 7 wiederkehrenden Befund-Typen ab.

---

## Phase B: Architektur-Revision (6-10h, 2-3 Sessions)

### B1: Hefteintrag-Pipeline Neukonstruktion (B10 BLOCKER)

**Problem:** Die aktuelle Pipeline produziert Hefteintraege als zusammenhaengende Fliesstext-Absaetze. Der User erwartet ein visuelles Denkprotokoll: Fachbegriffe als Knoten, Stichpunkte statt Prosa, Pfeilstrukturen, kompakter Merksatz als qualifizierte Antwort auf die Stundenfrage. Die GUETEKRITERIEN_HEFTEINTRAG_PRODUKT (HE1-HE13) wurden beim Generierungsprozess nicht wirksam angewendet — moegliche Ursache: zu starke Zergliederung im Generierungsprozess zerreisst die Gesamtgestalt.

**Empirischer Befund (2026-04-03):** Analyse von 8 gerenderten Praxis-Tafelbildern (Screenshots) + 4 Unterrichtsentwuerfen. Ergebnis:

- Reale Hefteintraege = Tafelbild-Kopien mit gezielter Elaborierung (Schaubild-Charakter)
- Invariante Drei-Ebenen-Architektur: Stundenfrage → Erarbeitungszone (Knoten + Pfeile) → Merksatz
- 6 empirische Ordnungsmuster: parallel-kausal, sequenziell, kontrastierend, metaphorisch, relational, konzept-beispiel
- Keine Prosa-Absaetze — nur Kurzphrasen (max 12 W.) und elaborierende Kurzesaetze (max 15 W.)
- Pfeile im Hefteintrag explizit erwuenscht (nicht nur im TB)
- Merksatz darf elaborierter sein als reine TB-Kompaktform (1-3 Saetze, max 20 W./Satz)
- Elaborierung ERGAENZT Schaubildstruktur, ERSETZT sie nicht

**Betroffene Dokumente — UMGESETZT:**
- `docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG_PRODUKT.md` — v2: HE4/HE12 revidiert, HE14-HE16 neu (Schaubild-Charakter, Ordnungsmuster-Treue, Merksatz-Kalibrierung), Leitsatz mit empirischem Befund, 6 Ordnungsmuster-Typen
- `docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md` — G4 auf 6 Typen erweitert, Sektion 3.2/3.3 revidiert, knoten[]/verbindungen[] als Pflichtfelder (nicht mehr Legacy), verbindungen[].typ-Feld neu
- `docs/architektur/vertraege/VERTRAG_PHASE_2-0_RAHMEN.md` — Dispatch-Schritt 1a/1b: Schaubild-Integritaet + Text-Dichte-Pruefung, HE14-HE16 als Pre-Check im Q-Gate

**Betroffene Dokumente — OFFEN (Engine-Bereich, benoetigt Uebergabe-Prompt):**
- Engine-Erweiterung O3: ordnungsmuster als Rendering-Steuerung (6 Typen → 6 Layouts)
- Engine-Erweiterung O5: verbindungen[].typ fuer Pfeilstil-Differenzierung
- Engine-Erweiterung O6: knoten[].typ fuer Farbsemantik

**Vorgehen (revidiert):**
1. ~~Analyse~~ → ERLEDIGT (2026-04-03): 8 TB-Screenshots + 4 UE-Dateien + Mappe-3-Hefteintrag analysiert.
2. ~~Gegenmodell~~ → ERLEDIGT: Empirisches Modell statt manuellem Referenz-Entwurf. Befunde in GUETEKRITERIEN_HEFTEINTRAG_PRODUKT.md §2.1 dokumentiert.
3. ~~Vertrag redesignen~~ → ERLEDIGT: VERTRAG_PHASE_2-0 Dispatch-Schritte 1a/1b + Q-Gate erweitert.
4. ~~Transferfrage~~ → ERLEDIGT (2026-04-03): Entscheidung ENTFERNEN. transfer-Objekt aus hefteintrag-schema.json und GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md entfernt. Transferimpuls lebt in rahmen/sicherung.json (reflexionsimpuls).
5. **Test:** Hefteintrag fuer Mappe 3 mit neuem Vertrag regenerieren, gegen HE1-HE16 pruefen.
6. **Engine-Uebergabe:** Uebergabe-Prompt fuer O3/O5/O6 formulieren (Stretch-Goal, nicht blockierend fuer Mappe 4).

**Akzeptanzkriterien (revidiert):**
- HE4 (Strukturell-sprachliche Kohaerenz) PASS
- HE12 (Lernbarkeit / Drei-Ebenen-Architektur) PASS
- HE14 (Schaubild-Charakter) PASS — Knoten ueberwiegen Prosa
- HE15 (Ordnungsmuster-Treue) PASS — Konsistentes Ordnungsmuster
- HE16 (Merksatz-Kalibrierung) PASS — 1-3 Saetze, max 20 W.
- Kein SCPL-Textblock > 15 Woerter
- Keine Transferfrage im Hefteintrag (ENTSCHIEDEN: entfernt)

**Aufwand (revidiert):** ~3h verbleibend (Analyse + Vertrag: ERLEDIGT ~3h. Offen: Test 1-2h, Engine-Uebergabe 1h)

---

### B2: AGENT_RAETSEL Didaktische Professionalisierung (B8 HIGH — Scope erweitert Session 8)

**Urspruengliches Problem:** AGENT_RAETSEL waehlt Aufgabentypen ohne Gegenpruefung gegen Lerninhalt (B8).
**Erweiterter Scope (Session 8):** Vollstaendige didaktische Professionalisierung — variable Aufgabenzahl, SCPL-Fragebogen-Modell, inhaltsgesteuerte Typauswahl, neue Qualitaetskriterien.

**Betroffene Dokumente:**
- `docs/agents/AGENT_RAETSEL.md` — Sektionen 1 (Progressionsplan v2), 2 (Operationalisierungsziel SCPL-Kontext), 3 (Konstruktionskontext), 5 (Cross-Konsistenz A16-A18), Q-Gate (A10v2, A16, A17, A18), Assembly
- `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md` — A5 (variable 5-8), A10 (inhaltsgesteuerte Typauswahl), A16 (Fragebogen-Kohaerenz), A17 (SCPL-Zonen-Abdeckung), A18 (Material-Aktivierung), Sektionen 2.5/2.6 (SCPL-Modell), Operationalisierungen 6.7-6.10

**Durchgefuehrte Schritte:**
1. Empirische Analyse: 7 reale UE-Muster (7-14 Aufgaben, 4-Stufen-Progression) + Mappe-2/3-Evaluation (mat-3-2/3 Gap diagnostiziert)
2. AGENT_RAETSEL.md v2: Sektion 1 (1a Variable Aufgabenzahl, 1b SCPL-Zonen-Mapping, 1c Inhaltsgesteuerte Typauswahl), Sektion 2 (SCPL-Kontext), Sektion 5 (A16/A17/A18 Cross-Checks), Q-Gate (A10v2 + A16-A18), Assembly (5-8 Positionen)
3. GUETEKRITERIEN_AUFGABEN.md v2: A5 revidiert, A10 vollstaendig revidiert, A16/A17/A18 mit Operationalisierung (6.7-6.10), Sektionen 2.5/2.6 SCPL-Modell, Pruefinstanz-Zuordnung 3.4 erweitert, Q-Gate 5.2 aktualisiert

**Akzeptanzkriterien:**
- Kein Aufgabentyp wird dispatcht ohne dokumentierte Erarbeitbarkeits-Begruendung (original B8)
- Variable Aufgabenzahl 5-8 pro Mappe, abgeleitet aus Inhaltskomplexitaet
- SCPL-Zonen-Mapping im Progressionsplan dokumentiert
- Typ-Wiederholung nur mit didaktischer Begruendung
- Alle Materialien als Primaerquelle aktiviert (A18)
- Cross-File-Konsistenz: AGENT_RAETSEL ↔ GUETEKRITERIEN_AUFGABEN ↔ Q-Gate

**Status:** ERLEDIGT (Session 8, 2026-04-03)
**Aufwand:** ~4h (Analyse 1h, Architektur 1.5h, GUETEKRITERIEN 1h, Cleanup 0.5h)

---

## Phase C: Validierung + Daten-Patch (2-4h, 1 Session)

### C1: Mappe-3-Hybrid-Patch + Aufgaben-Neugenerierung (revidiert Session 8) — ERLEDIGT

**Revision gegenueber Originalplan:** B2 (Didaktische Professionalisierung) hat die Aufgaben-Architektur fundamental geaendert (variable 5-8, SCPL-Zonen, A16-A18). Die urspruenglichen Aufgaben-Patches B6-B9 waeren Symptombehandlung am alten Output — stattdessen Aufgaben-Neugenerierung via v2-Pipeline. Maximiert Signaldichte fuer Prozesstest.

#### Stufe 1: Mechanische Patches (Material + Rahmen)

Patches auf Quelldaten in `docs/agents/artefakte/produktion/.../mappe-3/`. Rein mechanisch, keine didaktische Entscheidung.

| # | Befund | Betroffene Datei(en) | Patch | Domaene |
|---|---|---|---|---|
| 1 | B1 | rahmen/einstieg.json, rahmen/sicherung.json | Encoding: Umlaute korrigieren (ae→ä etc.) | docs/ |
| 2 | B2 | mat-3-5.json titel, ueberleitungen.json | Typographie: `--` → `—` | docs/ |
| 3 | B3 | mat-3-4.json inhalt, mat-3-5.json inhalt | Quellenangaben aus inhalt-Feld entfernen (→ quellenangaben[]) | docs/ |
| 4 | B4 | mat-3-4.json inhalt | Kuerzere Einleitungen: Name+Rolle statt voller Nachweis | docs/ |
| 5 | B10 | rahmen/hefteintrag.json | Ersetzen durch hefteintrag_B1_TEST.json (bereits produziert + validiert) | docs/ |
| 6 | B11 | rahmen/sicherung.json ueberleitung | Stilistisch glaetten | docs/ |

Patches B6-B9 (Aufgaben) ENTFALLEN — werden durch Stufe 2 (Neugenerierung) ersetzt.

#### Stufe 2: Aufgaben-Neugenerierung (Prozesstest B2)

Vollstaendige Neugenerierung der Mappe-3-Aufgaben nach AGENT_RAETSEL v2. Testet die gesamte revidierte Pipeline unter Realbedingungen.

**Eingabe (nach Stufe 1):**
- 5 gepatchte Materialien (mat-3-1..3-5)
- Gepatchter Hefteintrag (hefteintrag_B1_TEST.json: 6 Knoten, 5 Verbindungen, SCPL-Struktur)
- Stundenfrage: "Waren die Menschen 1914 wirklich begeistert vom Krieg?"

**Durchfuehrung (in dieser Cowork-Session, PM fuehrt AGENT_RAETSEL-Logik manuell aus):**
1. Aufgabenzahl ableiten (Formel: basis=5, knoten_faktor=ceil(6/5)=1, material_faktor=1 if >4 else 0 → 5+1+1=7 oder 5+1+0=6)
2. SCPL-Zonen-Mapping erstellen (S, C1, C2, C3, P, L → Aufgaben-Positionen)
3. Progressionsplan v2 schreiben (AFB-Zuweisung, Typauswahl mit Begruendung, Operationalisierungsziele)
4. Pro Aufgabe: Konstruktionskontext generieren + Aufgabe formulieren (Orchestrator-Rolle, nicht Subagent-Dispatch)
5. Cross-Konsistenz pruefen (A5, A10, A12, A16, A17, A18)
6. Q-Gate A1-A18 durchlaufen

**Vereinfachung gegenueber Vollproduktion:** Kein isolierter Subagenten-Dispatch (Token-Effizienz in Cowork). Orchestrator + Subagent-Logik in einem Durchlauf. Qualitaetsanspruch identisch.

**Output:** aufgabe-3-1.json bis aufgabe-3-N.json (N=Ergebnis aus Schritt 1) + PROGRESSIONSPLAN_v2.md + Q-GATE-LOG Aufgaben-Sektion

#### Stufe 3: Assembly + data.json-Patch

Neue Aufgaben + gepatchte Materialien/Rahmen in data.json assemblieren.

**Ausfuehrung:** Claude-Code-Session mit Uebergabe-Prompt. File-Ownership: escape-games/ ist Claude-Code-Domaene.
**Scope:** data.json Mappe-3-Sektion ersetzen (meta, materialien, aufgaben, rahmen). Mappen 1+2 unberuehrt.

#### Stufe 4: Evaluationsbericht (C1-EVALUATION.md)

Strukturierter Vorher/Nachher-Vergleich. Wird VOR Browser-Review geschrieben (Prozess-Evaluation), ergaenzt NACH Browser-Review (Produkt-Evaluation).

**Evaluationsrahmen:**

| Dimension | Messung | Vergleichsbasis |
|---|---|---|
| Aufgabenzahl | N (neu) vs. 5 (alt) | Ist die Erhoehung inhaltlich begruendet? |
| SCPL-Zonen-Abdeckung | Zonen mit/ohne Aufgabe (A17) | Alt: keine Zonen-Zuordnung. Neu: explizit |
| Fragebogen-Kohaerenz | Sequenz-Mapping Aufgaben → SCPL (A16) | Alt: keine Kohaerenz-Pruefung |
| Material-Aktivierung | Primaerquellen-Matrix (A18) | Alt: mat-3-2, mat-3-3 nur in Tipps |
| Typauswahl-Begruendung | Jede Typ-Wiederholung dokumentiert? (A10) | Alt: 5 verschiedene Typen ohne Begruendung |
| AFB-Progression | Monotonie-Check (A5) | Alt: 5 Stufen. Neu: N Stufen |
| Fragestamm-Laenge | Wortanzahl pro Aufgabe (B6) | Alt: Durchschnitt X Woerter. Neu: max 12W |
| Tipp-Qualitaet | Stufe-2-Typ (B7) | Alt: Paraphrase. Neu: Wortpool/Einschraenkung |
| Erarbeitbarkeit | Gegenpruefung pro Aufgabe (B8) | Alt: keine. Neu: dokumentiert |
| A1-A18 Gesamt | PASS/FAIL-Tabelle | Alt: A1-A15 (A16-A18 nicht existent) |

**Learnings-Extraktion:**
- Was hat die v2-Pipeline veraendert gegenueber v1?
- Welche Kriterien waren schwer zu erfuellen? (→ Vertrag/Prompt-Optimierung vor Mappe 4)
- Aufwands-Vergleich: v1-Patches vs. v2-Neugenerierung
- Empfehlung: v2-Neugenerierung auch fuer Mappe 2 retroaktiv? Oder nur forward fuer Mappe 4+?

**Artefakt:** `docs/projekt/C1_EVALUATION_MAPPE3.md`

### C1b: Browser-Review-Patches D1-D3c — ERLEDIGT

Browser-Review Mappe 3 ergab 3 Findings, die auf 3 generalisierbare Architektur-Defizite zurueckgefuehrt wurden:

| Patch | Finding | Betroffene Dateien | Engine? |
|---|---|---|---|
| D1 | LT ohne Antwortpool | SUB_AUFGABE_LT, GUETEKRITERIEN_AUFGABEN (A4-LT) | Ja |
| D2 | Fragestellungen zu abstrakt | GUETEKRITERIEN_AUFGABEN (A2), AGENT_RAETSEL, 5x SUB_AUFGABE_*.md | Nein |
| D3a | S-Zone rekapituliert Vormappe | VERTRAG_PHASE_2-0, GUETEKRITERIEN_HE_PRODUKT (HE17) | Nein |
| D3b | Komplexe Konzepte ohne Erklaerung | GUETEKRITERIEN_HE_PRODUKT (HE18) | Nein |
| D3c | Ordnungsmuster steuert Text nicht | VERTRAG_PHASE_2-0, GUETEKRITERIEN_HE_ENTWURF (G15) | Nein |

**Status:** KOMPLETT. 12 docs/-Dateien gepatcht (Phase A+B). Engine-Patch D1 ERLEDIGT (v3.6c, Browser-PASS 2026-04-03). data.json: antwortpool-Felder ERLEDIGT (alle 4 LT-Aufgaben). D2 Fragestamm-Verankerung ERLEDIGT (aufgabe-3-4, aufgabe-3-6 rewritten mit konkreten Inhaltsankern). D3a/b/c Hefteintrag-Nachpatch ERLEDIGT (kontextsatz autonom, Burgfrieden elaboriert, Gegenueberstellung explizit). D2-Infrastruktur verschaerft: A2b als PFLICHT-Q-Gate-Pruefschritt in alle 5 SUB_AUFGABE_*.md. Cache-Busting-System installiert.

### C1c: Produktionsreife-Audit (Pre-C2) — IN ARBEIT

Vor Mappe-4-Vollproduktion (12-16h) externe Pruefung der Gesamtkohaerenz aller Infrastruktur-Dokumente. 3 parallele Dimensionen:

| Dimension | Prueffrage | Reviewer-Typ |
|---|---|---|
| A: Technische Kohaerenz | Schema-Konsistenz, Q-Gate-Vollstaendigkeit, Referenz-Integritaet, Rendering-Kontrakt vs. Engine | Architektur |
| B: Paedagogisch-Didaktisch | Guetekriterien-Kalibrierung fuer R7/GPG, SCPL-Struktur, AFB-Progression, Aufgabentyp-Balance | Didaktik |
| C: Engine-Schema-Kompatibilitaet | JSON-Schema in Prompts vs. tatsaechliches Engine-Rendering, Edge Cases, Stretch-Features | Code |

**Methode:** agent-teams, 3 parallele Reviewer.
**Briefing:** docs/analyse/AUDIT_BRIEFING_PRE_C2_PRODUKTIONSREIFE.md
**Ergebnis:** docs/analyse/AUDIT_PRE_C2_ERGEBNIS.md
**Entscheidung:** PROCEED / PATCH-THEN-PROCEED / REDESIGN

**Status:** AUDIT_BRIEFING erstellt (2026-04-03). Audit-Durchfuehrung steht aus.

### C2: Mappe 4 als Validierung

Mappe 4 Vollproduktion (Phase 2.0→4) mit allen Patches und Architektur-Revisionen aktiv. Browser-Review als empirische Pruefung der Revision.

**Erfolgskriterien:** Siehe Kopf dieses Dokuments.

---

## Reihenfolge und Abhaengigkeiten

```
Phase A (parallel ausfuehrbar):
  A1 (Encoding) ──┐
  A2 (Quellen)  ──┤
  A3 (Sprache)  ──┤── Alle unabhaengig, parallel moeglich
  A4 (Fragestamm)─┤
  A5 (Tipp-2)  ──┤
  A6 (Freitext) ──┤
  A7 (Q-Gate)   ──┘

Phase B (nach Phase A empfohlen, aber nicht blockiert):
  B1 (Hefteintrag) ── Benoetigt User-Input fuer Referenz-Hefteintrag
  B2 (Didaktische Professionalisierung)  ── Unabhaengig von B1

Phase C (nach A+B):
  C1-Stufe1 (Mechanische Patches)      ── Benoetigt A (Encoding/Typographie)
  C1-Stufe2 (Aufgaben-Neugenerierung)  ── Benoetigt B2 (AGENT_RAETSEL v2) + C1-Stufe1
  C1-Stufe3 (Assembly data.json)       ── Benoetigt C1-Stufe1 + C1-Stufe2
  C1-Stufe4 (Evaluation)               ── Benoetigt C1-Stufe2 (Prozess) + C1-Stufe3 (Produkt nach Browser-Review)
  C2 (Mappe 4)                         ── Benoetigt C1-Stufe4 (Learnings)
```

---

## Zeitplan

| Session | Schritte | Meilenstein | Aufwand |
|---|---|---|---|
| 1 | A1-A7 (alle Patches) | Alle Vertraege + Subagenten gepatcht | 4-6h |
| 2 | B1 (Hefteintrag Analyse + Gegenmodell) | Referenz-Hefteintrag steht | 3-4h |
| 3 | B1 (Vertrag) + B2 (Didaktische Professionalisierung) | Architektur-Revisionen abgeschlossen | 3-4h |
| 4 | C1-S1+S2 (Patches + Aufgaben-Neugenerierung) | Mappe 3 v2-Aufgaben stehen, Q-Gate A1-A18 PASS | 3-4h | **DONE** |
| 4b | C1-S3+S4 (Assembly + Evaluation) | data.json gepatcht, Evaluationsbericht steht | 1-2h | **DONE** |
| 5+ | C2 (Mappe 4 Produktion) | Validierung der Revision | 12-16h | OFFEN |

**Kritischer Pfad:** A* → B1+B2 → C1 (S1→S2→S3→S4) → C1b (D1-D3) → C1c (Audit) → C2. C1+C1b ERLEDIGT (Session 8+9). C1c IN ARBEIT (Briefing erstellt). Naechster Schritt: Audit-Durchfuehrung, dann C2.

---

## Governance

- Jeder Patch-Schritt (A1-A7) endet mit Commit. Patch-Inhalt im Commit-Message referenzieren (z.B. "A1: Encoding-Regel v3.3 in 15 Dokumenten").
- Phase B Zwischenergebnisse (Analyse, Gegenmodell) als eigenstaendige Dokumente ablegen.
- CHANGELOG.md pro Session aktualisieren.
- STATUS.md Frontmatter nach jedem Meilenstein aktualisieren.
- Eskalation zu Option A nur bei empirischem Befund nach Mappe 4, nicht praeventiv.
