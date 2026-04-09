# Befund: Phase 2.0 Rahmen-Produktion Mappe 1

**Evaluationstyp:** Prozesstreue + Output-Qualitaet + Optimierungspotential
**Evaluationsdatum:** 2026-04-09
**Evaluator:** PM (Cowork)
**Gegenstand:** Chatverlauf Phase 2.0, 5 Output-Dateien, Q-GATE-LOG.md
**Vertrag:** VERTRAG_PHASE_2-0_RAHMEN.md
**Game-ID:** verlauf-erster-weltkrieg-marne-ende, Mappe 1

---

## 1. Gesamtbewertung

**CONDITIONAL PASS** — Output funktional korrekt, Q-Gate-Ergebnis reproduzierbar. Zwei strukturelle Vorbedingungsfehler aus Phase 0.4 mussten kompensiert werden (H1, H2). Ein Vertragskriterium wurde inkorrekt als PASS gewertet (M1).

---

## 2. Prozesstreu-Analyse (Dispatch-Ablauf vs. Vertrag)

### 2.1 Read-Sequenz

| Vertrag-Schritt | Ausgefuehrt | Konform | Bemerkung |
|---|---|---|---|
| 1: TAFELBILD → hefteintrag.json | Ja | TEILWEISE | TAFELBILD hatte knoten=[], verbindungen=[]. Agent rekonstruierte aus SKRIPT (H1). |
| 1-pre: S-Zone-Autonomie-Filter | Ja | PASS | kontextsatz eigenstaendig, kein Vormappe-Rueckbezug. |
| 1-post: Knoten-Elaborierung | Ja | TEILWEISE | 3/4 noetige merksaetze produziert, k1-2 fehlt (M1). |
| 1a: Schaubild-Integritaet | Ja | PASS | 7 Knoten, 7 Verbindungen, IDs korrekt, min 3 Knoten erfuellt. |
| 1a-post: Ordnungsmuster-Konsequenz | Ja | PASS | parallel-kausal: 3 parallele Ursachen → gemeinsame Wirkung. Defensibel. |
| 1b: Text-Dichte | Ja | PASS | Alle Einheiten innerhalb Wortlimits (Q-GATE-LOG bestaetigt). |
| 2: MATERIAL_GERUEST Einstieg → einstieg.json | Ja | PASS | Narrativ + Problemstellung korrekt uebernommen. |
| 3: MATERIAL_GERUEST Sicherung → read | Ja | PASS | — |
| 4: hefteintrag.json → Konsistenzpruefung | Ja | PASS | scpl.loesung[] = 3 KE identisch mit TAFELBILD. |
| 5: sicherung.json | Ja | PASS | Placeholder korrekt, reflexionsimpuls disjunkt (Q-M2-09). |
| 6: meta.json | Ja | PASS | freischalt_code: GRABEN (6 Zeichen, A-Z). |
| 6b: Schlusszitat | Ja | PASS | Brit. Infanterist Somme 1916 — passt zu C3-Zone. |
| 7: C1b-Identitaetsregel | Ja | PASS | einstieg.problemstellung === hefteintrag.stundenfrage. |
| 8: Q-Gate | Ja | TEILWEISE | Q-Gate korrekt ausgefuehrt, aber HE16-Bewertung unpraezise (M1). |
| 9: Q-GATE-LOG | Ja | PASS | Vollstaendiges Log mit Text-Dichte-Tabelle. |

### 2.2 Dispatch-Isolation

PASS. Alle 5 Dateien in einem Dispatch produziert. Keine Fremd-Mappen-Artefakte gelesen.

### 2.3 Schema-Validierung

PASS. JSON-Parsing-Fehler (typographische Anfuehrungszeichen) wurde in-session erkannt und gefixt. Finale Dateien parsen fehlerfrei.

---

## 3. Findings

### H1 — TAFELBILD knoten[]/verbindungen[] leer (VORBEDINGUNGSFEHLER)

**Schwere:** HIGH
**Quelle:** TAFELBILD_Mappe1.md JSON-Repraesentation: `"knoten": [], "verbindungen": []`
**Auswirkung:** Vertrag Schritt 1 fordert "1:1 Uebernahme" aus TAFELBILD. Agent musste stattdessen aus SKRIPT Tafelbild-Entwurf rekonstruieren. Die 7 Knoten und 7 Verbindungen in hefteintrag.json sind eine NEUKONSTRUKTION, keine Uebernahme.
**Verantwortung:** Phase 0.4 AGENT_HEFTEINTRAG. Der Agent produzierte knoten/verbindungen im Markdown-Tabellenformat (Erarbeitbarkeits-Nachweis, Fachbegriffe), aber befuellte die JSON-Repraesentation nicht.
**Risiko:** STRUKTUR-FREEZE-Untergrabung. Die Knoten-Struktur sollte in Phase 0.4 fixiert werden, nicht in Phase 2.0 nachkonstruiert werden. Das SKRIPT liefert Rohdaten, aber keine validierten/kurierten Knoten.
**Kompensation im Testlauf:** Agent hat Knoten-Typen aus dem SKRIPT (lebensbedingung, technologie, strategie, psychologisch) auf Schema-Enum gemappt (kernbegriff, ursache, wirkung, ereignis). Die Mappings sind vertretbar, aber nicht durch Phase 0.4 Q-Gate validiert.
**Massnahme:** AGENT_HEFTEINTRAG muss knoten[] und verbindungen[] in der JSON-Repraesentation populieren. Phase 0.4 Q-Gate muss `minItems: 3` pruefen.

### H2 — ordnungsmuster "kausal" nicht im Schema-Enum (VORBEDINGUNGSFEHLER)

**Schwere:** HIGH
**Quelle:** TAFELBILD_Mappe1.md: `"ordnungsmuster": "kausal"` — kein valider Schema-Wert.
**Auswirkung:** Agent musste in Phase 2.0 interpretieren: "kausal" → "parallel-kausal". Alternative waere "sequenziell" (chronologische Abfolge 1914→1915→1916). Die Entscheidung fuer parallel-kausal ist fachdidaktisch vertretbar (3 parallele Ursachen konvergieren auf Materialschlacht), aber es ist eine strukturelle Design-Entscheidung, die in Phase 0.4 haette fallen muessen.
**Konsequenz:** Der hefteintrag_verweis in sicherung.json beschreibt eine "Kausalkette: Stellungskrieg → Schuetzengraben → Giftgas → Ausblutungsschlacht → Materialschlacht → Hoffnungslosigkeit" — das ist eine LINEARE Darstellung, die dem parallel-kausalen ordnungsmuster widerspricht (M2).
**Massnahme:** AGENT_HEFTEINTRAG muss ordnungsmuster aus dem Schema-Enum waehlen. Phase 0.4 Schema-Validierung muss den Enum-Constraint pruefen.

### M1 — merksatz fehlt bei k1-2 (Schuetzengraben, typ=wirkung)

**Schwere:** MEDIUM
**Quelle:** hefteintrag.json: k1-2 hat typ=wirkung, text="Schuetzengraben: Naesse, Ratten, Tod", KEIN merksatz.
**Vertragsbezug:** Schritt 1-post: "Jeder Knoten mit typ=kernbegriff oder typ=wirkung, dessen text einen Fachbegriff enthaelt, der NICHT im allgemeinen R7-Wortschatz liegt, MUSS ein merksatz-Feld haben."
**Analyse:** "Schuetzengraben" ist in der Fachbegriffe-Liste der Mappe (TAFELBILD Z. 113). Als gelisteter Fachbegriff erfordert er per Definition explizite Einfuehrung. Der Q-Gate-Log bewertet HE16 als PASS mit "3 Eintraege" — korrekt waere 4 (k1-1, k1-2, k1-3, k1-6).
**Einschraenkung:** "Schuetzengraben" ist ein transparentes Kompositum, das R7-SuS erschliessen koennen. Die Grenzwertigkeit ist nachvollziehbar, aber der Vertrag laesst keine Grauzone — gelisteter Fachbegriff + wirkung-Typ = merksatz-Pflicht.
**Massnahme:** merksatz fuer k1-2 nachtragen (z.B. "Befestigte Graeben, in denen Soldaten monatelang lebten und kaempften."). HE16-Prueflogik automatisieren: knoten scannen → Fachbegriffe-Liste abgleichen → merksatz-Pflicht.

### M2 — hefteintrag_verweis widerspricht ordnungsmuster

**Schwere:** MEDIUM
**Quelle:** sicherung.json: `hefteintrag_verweis: "Zeichne die Kausalkette: Stellungskrieg → Schuetzengraben → Giftgas → Ausblutungsschlacht → Materialschlacht → Hoffnungslosigkeit."`
**Problem:** Das ordnungsmuster ist "parallel-kausal", aber der hefteintrag_verweis beschreibt eine LINEARE Kette (A→B→C→D→E→F). Die tatsaechliche Knoten-Struktur zeigt: k1-1→k1-2, k1-3→k1-2, k1-6→k1-4, k1-6→k1-5, k1-2→k1-7, k1-4→k1-7, k1-5→k1-7 — ein konvergentes Netzwerk, keine Kette.
**Auswirkung:** SuS koennten ein falsches Diagramm zeichnen (linear statt konvergent). Die Instruktion passt nicht zum Artefakt.
**Massnahme:** hefteintrag_verweis umformulieren, z.B.: "Uebertrage das Tafelbild in dein Heft. Zeichne, wie Stellungskrieg, Giftgas und Ausblutungsschlacht gemeinsam zur Hoffnungslosigkeit fuehren."

### M3 — Typographische Anfuehrungszeichen verursachten JSON-Parser-Fehler

**Schwere:** MEDIUM (in-session behoben)
**Quelle:** Chatverlauf: Deutsche typographische Anfuehrungszeichen in JSON-Strings verursachten jq-Fehler.
**Analyse:** Die v3.3 Encoding-Regeln erlauben `„..."` oder `»...«` als deutsche Anfuehrungszeichen. In JSON sind diese als Zeichen INNERHALB von String-Werten erlaubt, aber der Agent hat sie moeglicherweise als JSON-Delimiters verwendet. Fix wurde in-session angewandt.
**Massnahme:** v3.3 Encoding-Regeln um Klarstellung ergaenzen: "Typographische Anfuehrungszeichen nur INNERHALB von JSON-String-Werten. JSON-String-Delimiters bleiben standard ASCII double-quotes."

### L1 — Token-Ineffizienz durch Rekonstruktionsarbeit

**Schwere:** LOW
**Quelle:** Chatverlauf
**Analyse:** Extensives Reasoning ueber Knoten-Typ-Mappings, Schema-Kompatibilitaet, ordnungsmuster-Interpretation. Die Rekonstruktion von knoten/verbindungen aus SKRIPT verbrauchte geschaetzt 30-40% des Gesamt-Token-Budgets. Mit korrekten Phase-0.4-Artefakten waere dies entfallen.

### L2 — voraussetzungen: Information korrekt leer, aber TAFELBILD-Format inkompatibel

**Schwere:** LOW
**Quelle:** TAFELBILD hat `"voraussetzungen": {"vorgaenger_mappe": "..."}` (Objekt), Schema erwartet `string[]`.
**Analyse:** Bei Mappe 1 ist voraussetzungen=[] korrekt ("Leer bei Mappe 1" laut Schema-Beschreibung). Aber bei Mappe 2-4 wird das TAFELBILD-Objekt-Format zu Parsing-Problemen fuehren.
**Massnahme:** AGENT_HEFTEINTRAG muss voraussetzungen als string[] (Knoten-IDs) formatieren.

---

## 4. Optimierungspotential (Infrastruktur-Patches)

| # | Ziel | Betroffene Datei | Prioritaet | Abhaengigkeit |
|---|---|---|---|---|
| OPT-1 | AGENT_HEFTEINTRAG: knoten[]/verbindungen[] in JSON populieren | agents/AGENT_HEFTEINTRAG.md | HOCH | Behebt H1 fuer kuenftige Games |
| OPT-2 | AGENT_HEFTEINTRAG: ordnungsmuster aus Schema-Enum waehlen | agents/AGENT_HEFTEINTRAG.md | HOCH | Behebt H2 fuer kuenftige Games |
| OPT-3 | Phase 0.4 Q-Gate: knoten minItems:3 + ordnungsmuster-Enum pruefen | checklisten/GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md | HOCH | Abhaengig von OPT-1/OPT-2 |
| OPT-4 | v3.3 Encoding: JSON-Delimiter-Klarstellung | architektur/vertraege/VERTRAG_PHASE_2-0_RAHMEN.md | NIEDRIG | Behebt M3 |
| OPT-5 | AGENT_HEFTEINTRAG: voraussetzungen als string[] | agents/AGENT_HEFTEINTRAG.md | MITTEL | Behebt L2 fuer Mappen 2-4 |
| OPT-6 | HE16-Prueflogik: automatisierte Fachbegriff-merksatz-Abgleich | checklisten/GUETEKRITERIEN_HEFTEINTRAG_PRODUKT.md | MITTEL | Behebt M1 fuer kuenftige Games |

### Entscheidungsfrage an User

Die Patches OPT-1 bis OPT-3 betreffen AGENT_HEFTEINTRAG (Phase 0.4 Infrastruktur). Zwei Optionen:

**Option A (Retroaktiv + Infrastruktur):** TAFELBILD_Mappe1.md JSON-Repraesentation nachpatchen (knoten/verbindungen/ordnungsmuster befuellen), dann AGENT_HEFTEINTRAG + GUETEKRITERIEN patchen. Stellt sicher, dass hefteintrag.json tatsaechlich "1:1 Uebernahme" ist. Verzoegert Phase 2.1 um 1 Session.

**Option B (Forward-only):** hefteintrag.json M1 als faktisch korrekt akzeptieren (Knoten stimmen inhaltlich), Infrastruktur-Patches nur fuer kuenftige Games. M1-merksatz k1-2 + hefteintrag_verweis M2 direkt in den Artefakten fixen. Phase 2.1 kann sofort starten.

**Empfehlung:** Option B. Die Rekonstruktion ist inhaltlich korrekt, und retroaktives TAFELBILD-Patching schafft keinen Mehrwert fuer das laufende Game. Infrastruktur-Patches separat ausfuehren.

---

## 5. Q-Gate-Korrektur

Das Q-GATE-LOG.md bewertet alle Kriterien als PASS. Nach dieser Evaluation:

| Kriterium | Original | Korrigiert | Begruendung |
|---|---|---|---|
| HE16 (Merksatz-Kalibrierung) | PASS (3 Eintraege) | WARN (3/4 Eintraege) | k1-2 fehlt merksatz (M1) |

Gesamt-Gate-Ergebnis bleibt PASS (WARN loest kein FAIL aus), aber HE16 muss als WARN vermerkt werden.

---

## 6. Zusammenfassung Prozesstreue

| Dimension | Bewertung | Detail |
|---|---|---|
| Dispatch-Isolation | PASS | 1 Dispatch, 5 Dateien, keine Fremd-Reads |
| Read-Sequenz | PASS | Alle 9 Vertrag-Schritte ausgefuehrt |
| Schema-Konformitaet | PASS | Alle 5 Dateien valide (nach in-session Fix) |
| Q-Gate-Vollstaendigkeit | PASS | 8/8 Kriterien + 3/3 Pre-Checks geprueft |
| Q-Gate-Praezision | WARN | HE16 zu optimistisch bewertet (M1) |
| STRUKTUR-FREEZE-Einhaltung | WARN | knoten/verbindungen NICHT aus TAFELBILD sondern rekonstruiert (H1) |
| Vorbedingungen aus Phase 0.4 | 2x FAIL | H1 (leere Arrays), H2 (invalides ordnungsmuster) |
