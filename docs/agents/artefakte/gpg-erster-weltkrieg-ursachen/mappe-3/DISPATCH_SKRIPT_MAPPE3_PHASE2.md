# Dispatch-Skript: Mappe 3 — Phase 2.1c bis 2.2c

**Erstellt:** 2026-04-03
**Zweck:** Steuerungsdokument fuer die verbleibende Mappe-3-Produktion. Ersetzt ad-hoc-Orchestrierung und Uebergabe-Prompts bei Session-Splits. Naechste Session liest dieses Skript, sieht Fortschritt, macht weiter.
**Vorbedingung:** Phase 2.0 DONE, Phase 2.1 DONE (5/5 Materialien). PROZESSTEST_MAPPE3_ERGEBNIS.md Phase 2.1 erstellt.

---

## Fortschritts-Tracker

| # | Dispatch | Status | Q-Gate | Metriken-Notiz |
|---|---|---|---|---|
| D0 | Phase 2.1c: Material-Cross + Ueberleitungen + Hefteintrag-Revision | DONE | GESAMT-PASS (0F, 0W) | Achsen 1-4: 4x PASS. Achse 5: 4/4 UE alle UE-1..5 PASS. Achse 6: 4 Formulierungsaenderungen, zusammenfassung 42W, ueberleitung produziert. Stufe-2 5/5 PASS. HE1-HE13 12/12 PASS. |
| D1 | Phase 2.2a: Progressionsplan | DONE | Kein formales Q-Gate | 5 Typen (LT/MC/ZU/RF/FT), AFB I-I-II-II-III, 6/6 TB-Knoten, 5/5 Mat-Abdeckung, 5/5 Gegenpruefungen PASS. Code: AUGUST. |
| D2 | Phase 2.2b-1: Aufgabe 1 (Position 1, AFB I) | DONE | GESAMT-PASS (0F, 0W) nach NB | Subagent + Dispatcher-Korrektur. agent-teams: 2 Kat-(b)-Befunde (A4-LT FAIL Synonym-Swap, A2 WARN frage-Spoiler). NB: Genus-Disambiguierung. Re-Q-Gate PASS. |
| D3 | Phase 2.2b-2: Aufgabe 2 (Position 2, AFB I) | DONE | GESAMT-PASS (0F, 0W) | Subagent + Dispatcher-Korrektur (Format). agent-teams: 1 Kat-(b) WARN (Distraktor-Systematik), 1 Kat-(c). Kein NB. |
| D4 | Phase 2.2b-3: Aufgabe 3 (Position 3, AFB II) | DONE | GESAMT-PASS (0F, 0W) nach NB | 3 Kategorien (Begeisterung/Angst/Pflicht). agent-teams: 1 Kat-(b) (Redundanz Elemente 1+5), 2 Kat-(c). NB: Element 5 ersetzt, Distribution 1:2:2. |
| D5 | Phase 2.2b-4: Aufgabe 4 (Position 4, AFB II) | DONE | GESAMT-PASS (0F, 0W) nach NB | 5→4 Elemente (SPD/Burgfrieden fusioniert). agent-teams: 2 Kat-(b) (Trennbarkeit, Passiv), 1 Kat-(b) akzeptiert (Parallelitaet). |
| D6 | Phase 2.2b-5: Aufgabe 5 (Position 5, AFB III, Freitext) | DONE | GESAMT-PASS (0F, 0W) nach NB | Subagent: 5→3 Keywords (3 nicht in Material), Display-Ref falsch. agent-teams: 2 Kat-(b) akzeptiert (Meinung generisch, Leitfrage steuernd), 1 Kat-(b) FAIL (Musterantwort-Sprache). NB: Tipp 3 in Schuelersprache. |
| D7 | Phase 2.2c: Cross-Konsistenz | DONE | GESAMT-PASS (9/9, 0F, 0W) | 5 Typen, 6/6 TB-Knoten, AFB I-I-II-II-III monoton, MQ3/MQ3b 5/5 clean. Kein Re-Dispatch. |

**Aktualisierungsregel:** Nach jedem Dispatch: Status auf DONE/FAIL setzen, Q-Gate-Ergebnis eintragen, Metriken-Notiz mit Auffaelligkeiten fuellen.

---

## Session-Split-Punkte

| Nach Dispatch | Split moeglich? | Was muss uebergeben werden |
|---|---|---|
| D0 (2.1c) | JA (empfohlen) | "Phase 2.1c DONE. Lies DISPATCH_SKRIPT, weiter mit D1." |
| D1 (2.2a) | JA | "PROGRESSIONSPLAN.md geschrieben. Lies DISPATCH_SKRIPT, weiter mit D2." |
| D3 (nach Aufgabe 2) | JA | "2/5 Aufgaben DONE. Lies DISPATCH_SKRIPT, weiter mit D4." |
| D6 (nach Aufgabe 5) | JA (empfohlen) | "5/5 Aufgaben DONE. Lies DISPATCH_SKRIPT, weiter mit D7." |
| D7 (2.2c) | NEIN | Abschluss — Metriken in PROZESSTEST ergaenzen. |

**Uebergabe-Prompt-Template (bei Session-Split):**

```
Lies docs/agents/artefakte/produktion/gpg-erster-weltkrieg-ursachen/mappe-3/DISPATCH_SKRIPT_MAPPE3_PHASE2.md.
Fortschritts-Tracker zeigt aktuellen Stand. Naechster Dispatch: D[X].
Alle bisherigen Outputs liegen als Dateien im Produktionsverzeichnis.
```

---

## D0: Phase 2.1c — Material-Cross + Ueberleitungen + Hefteintrag-Revision

**Vertrag:** VERTRAG_PHASE_2-1c_CROSS.md
**Dispatch-Typ:** Dispatcher-Arbeit (nicht isolierter Subagent)

### Read-Steps

| # | Datei | Felder |
|---|---|---|
| 1 | materialien/mat-3-1.json bis mat-3-5.json | titel, inhalt, ueberleitung_von, sequenz_kontext, _meta.tafelbild_knoten_abgedeckt |
| 2 | rahmen/hefteintrag.json | knoten[], stundenfrage, scpl (alle Zonen) |
| 3 | MATERIAL_GERUEST_Mappe3.md | Sequenzreihenfolge, didaktische_funktion, Ueberleitungen-Sektion |
| 4 | rahmen/einstieg.json | problemstellung |
| 5 | rahmen/sicherung.json + rahmen/hefteintrag.json | reflexionsimpuls, hefteintrag_verweis, scpl.loesung[] |

### Aufgaben (6 Achsen)

1. **Achsen 1-4:** Cross-Konsistenz pruefen (Sequenz-Kohaerenz, Fachbegriff-Konsistenz, Ueberleitung-Kohaerenz, TB-Knoten-Gesamtabdeckung)
2. **Achse 5:** 4 Ueberleitungen produzieren (mat-3-1→3-2, 3-2→3-3, 3-3→3-4, 3-4→3-5). Zwei-Vektoren-Bruecke (UE-1 bis UE-5). Output: ueberleitungen.json
3. **Achse 6:** Hefteintrag-Revision (FORMULIERUNGS-OFFEN-Felder, zusammenfassung + ueberleitung erstmalig). Stufe-2 Re-Evaluation (G3, G5, G10, G12, G14). HE1-HE13 Produktqualitaet.

### Erwarteter Output

- ueberleitungen.json (4 Eintraege)
- rahmen/sicherung.json (aktualisiert: zusammenfassung, ueberleitung)
- rahmen/hefteintrag.json (SCPL-Text-Patches, NUR Formulierung)
- Q-GATE-LOG.md (Achsen 1-6 Ergebnisse)

### Q-Gate

Katalog: Q-GATE-MECHANIK.md §7.4 (Cross-Konsistenz). Bei FAIL Achsen 1-4: Finding dokumentieren, User entscheidet.

### Metriken erfassen

- Achsen 1-4: Wie viele PASS/WARN/FAIL?
- Achse 5: Alle UE-1 bis UE-5 PASS?
- Achse 6: Wie viele Formulierungsaenderungen? Stufe-2 Re-Evaluation PASS?
- Gesamtdauer D0

---

## D1: Phase 2.2a — Progressionsplan

**Vertrag:** VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md
**Dispatch-Typ:** Dispatcher-Arbeit (Orchestrator-Logik, kein isolierter Subagent)
**Vorbedingung:** D0 DONE (hefteintrag.json revidiert, Merksaetze aktuell)

### Read-Steps

| # | Datei | Felder |
|---|---|---|
| 1 | AGENT_RAETSEL.md | Vollstaendig |
| 2 | materialien/mat-3-*.json | NUR: id, typ, titel, _meta.tafelbild_knoten_abgedeckt |
| 3 | MATERIAL_GERUEST_Mappe3.md | didaktische_funktion pro mat-ID |
| 4 | rahmen/hefteintrag.json | knoten[], merksaetze[], stundenfrage |
| 5 | DIDAKTIK_RAHMEN | NUR Mappe 3: AFB-Schwerpunkt II, Kompetenz "Beurteilen und bewerten" |

### Aufgaben

1. Progressionsplan mit 5 Positionen erstellen (AFB I → I → II → II → III)
2. Pro Position: Typauswahl (mind. 3 Typen, kein Typ > 2x, Position 5 = Freitext)
3. Pro Position: Operationalisierungsziel herleiten (TB-Knoten-Merksatz + AFB-Operator)
4. Pro Position: Konstruktionskontext generieren (Ziel-Material, Material-Display-ID, TB-Knoten, AFB, bereits getestete Inhalte)
5. Freischalt-Code generieren (thematisch, A-Z, 4-8 Zeichen)

### Erwarteter Output

- PROGRESSIONSPLAN.md (5 Konstruktionskontexte + Freischalt-Code)

### Q-Gate

Kein formales Q-Gate fuer 2.2a. Qualitaetspruefung implizit durch 2.2c (Cross-Konsistenz). Dispatcher prueft: Typvielfalt-Regeln eingehalten? AFB-Progression monoton? Operationalisierungsziele aus Ziel-Material beantwortbar?

### Metriken erfassen

- Gewaehlte Typen + AFB-Zuweisungen (Tabelle)
- Operationalisierungsziele: Gegenpruefung bestanden?
- Gesamtdauer D1

---

## D2-D6: Phase 2.2b — 5 Aufgaben (je isolierter Subagent-Dispatch)

**Vertrag:** VERTRAG_PHASE_2-2b_AUFGABE.md
**Dispatch-Typ:** Isolierter Subagent via Agent-Tool (wie mat-3-3..3-5)
**Vorbedingung:** D1 DONE (PROGRESSIONSPLAN.md geschrieben)

### Dispatch-Template (pro Aufgabe)

**Read-Steps (Dispatcher sammelt vor Dispatch):**

| # | Datei | Felder |
|---|---|---|
| 1 | PROGRESSIONSPLAN.md | NUR Konstruktionskontext DIESER Aufgabe |
| 2 | materialien/mat-3-X.json | Volltext (Ziel-Material) |
| 3 | MATERIAL_GERUEST_Mappe3.md | Andere mat-IDs: NUR titel + didaktische_funktion |
| 4 | SUB_AUFGABE_[TYP].md | Vollstaendig |

**Dispatcher formuliert Uebergabe-Prompt mit:**
- Konstruktionskontext (aus PROGRESSIONSPLAN.md)
- Ziel-Material-Volltext
- Material-Zusammenfassungen (1 Satz pro anderes Material)
- SUB_AUFGABE-Regeln
- Bereits produzierte Aufgaben (Zusammenfassung: Position, Typ, AFB, getesteter Inhalt)
- Encoding-Regel (UTF-8-Umlaute)

**Subagent liefert:** aufgabe-3-M.json

**Dispatcher nach Rueckkehr:**
1. Merge: Subagent-Output + Dispatcher-Felder (id, position, material_referenz)
2. Q-Gate: Q-GATE-MECHANIK.md §7.2 (Aufgaben-Q-Gate). Kriterien: SCHEMA-01, A1-A7 + typ-spezifisch, MQ3 (Material-Referenz-Verbot in frage), Engine-Feld-Kompatibilitaet
3. Bei PASS: aufgabe-3-M.json schreiben
4. Bei FAIL: 1 Nachbesserung, dann Finding
5. Q-Gate-Ergebnis in Q-GATE-LOG.md

### agent-teams Multi-Review (P7) — nach Q-Gate PASS

**Wann:** Nach jedem Aufgaben-Dispatch (D2-D6), NACHDEM das manuelle Q-Gate PASS ergeben hat.
**Wie:** `agent-teams:team-review` mit 3 Reviewern:

| Dimension | Reviewer-Fokus | Referenz-Dokumente |
|---|---|---|
| Fachdidaktik | A1-A7 + typ-spezifisch, Operationalisierungsziel-Kongruenz | GUETEKRITERIEN_AUFGABEN.md |
| Engine-Kompatibilitaet | JSON-Schema, Feldnamen, Loesungsformat, Tipp-Struktur | material-output-schema.json, data.json-Template |
| Sprachqualitaet | Register R7, Satzlaenge, Fachbegriffe, Umlaut-Korrektheit | SUB_AUFGABE_[TYP].md Sprachregeln |

**Erfassung:** Reviewer-Befunde pro Aufgabe dokumentieren. Unterscheiden: (a) Befund deckt sich mit Q-Gate (Bestaetigung), (b) Befund ist NEU (Mehrwert), (c) Befund ist False Positive (Rauschen).

**Abbruchkriterium:** Falls bei D2+D3 alle Reviewer-Befunde Kategorie (a) oder (c) sind und kein (b)-Befund vorliegt → agent-teams fuer D4-D6 optional machen.

### Wachsender Kontext (analog zu Phase 2.1)

| Dispatch | Bereits getestete Inhalte (fuer Konstruktionskontext) |
|---|---|
| D2 (Aufgabe 1) | Keine |
| D3 (Aufgabe 2) | Aufgabe 1: [Typ, AFB, getesteter Inhalt] |
| D4 (Aufgabe 3) | Aufgaben 1-2 |
| D5 (Aufgabe 4) | Aufgaben 1-3 |
| D6 (Aufgabe 5) | Aufgaben 1-4 |

### Metriken erfassen (pro Aufgabe)

- Dispatches: 1 oder 2 (Nachbesserung)?
- Q-Gate: PASS/WARN/FAIL, welche Kriterien?
- agent-teams: Anzahl Befunde pro Dimension, Kategorie (a)/(b)/(c)
- Dispatcher-Korrekturen beim Merge?
- Subagent-Prompt-Findings (analog P1-P3)?

---

## D7: Phase 2.2c — Cross-Konsistenz

**Vertrag:** VERTRAG_PHASE_2-2c_CROSS.md
**Dispatch-Typ:** Dispatcher-Arbeit (kein isolierter Subagent)
**Vorbedingung:** D2-D6 DONE (5/5 Aufgaben geschrieben)

### Read-Steps

| # | Datei | Felder |
|---|---|---|
| 1 | aufgaben/aufgabe-3-*.json | Alle Felder |
| 2 | materialien/mat-3-*.json | id, typ, titel |
| 3 | rahmen/hefteintrag.json | knoten[], merksaetze[] |

### Pruefungen

| Kriterium | Beschreibung | PASS/FAIL |
|---|---|---|
| A1 | AFB-Kongruenz Gesamtbild (stimmt mit PROGRESSIONSPLAN ueberein) | |
| A3 | Material-Kongruenz (alle 5 Materialien referenziert) | |
| A5 | Schwierigkeits-Progression (monoton steigend) | |
| A8 | Kognitive Aktivierung (mind. 1 denkanregende Aufgabe) | |
| A9 | TB-Bezug (mind. 1 Aufgabe pro TB-Knoten) | |
| A10 | Typvielfalt (mind. 3 Typen, kein Typ > 2x, Freitext 1x) | |
| A12 | Sachbezogen-vor-Wertbezogen | |
| MQ3 | Material-Referenz-Verbot in frage-Feldern | |
| MQ3b | Display-Referenzen in Tipps korrekt | |

### Bei FAIL

Betroffene Aufgaben identifizieren → Re-Dispatch mit korrigiertem Konstruktionskontext (max 2 Re-Dispatch pro Aufgabe). Re-Dispatch folgt VERTRAG_PHASE_2-2b.

### Erwarteter Output

- Q-GATE-LOG.md (Cross-Konsistenz-Ergebnis, Format §8)
- Ggf. korrigierte aufgabe-3-M.json (bei Re-Dispatch)

### Metriken erfassen

- Cross-Konsistenz: PASS oder FAIL? Welche Kriterien?
- Re-Dispatches noetig? Wie viele? Welche Aufgaben betroffen?
- Gesamtdauer D7

---

## Metriken-Gesamttabelle (nach Abschluss ausfuellen)

| Metrik | Phase 2.1 (Baseline) | Phase 2.1c | Phase 2.2a-c |
|---|---|---|---|
| Dispatches gesamt | 6 (5 Material + 1 NB) | 1 | 7 (5 Aufgaben + 1 Progressionsplan + 1 Cross) |
| First-Pass-Rate | 80% (4/5) | 100% | 20% (1/5 Aufgaben ohne NB: D3) |
| Q-Gate WARN gesamt | 3 | 0 | 0 (nach NB) |
| Q-Gate FAIL gesamt | 0 (nach NB) | 0 | 0 (nach NB) |
| Nacharbeit gesamt | ~17 min | — | 4 NB (D2: Genus, D4: Redundanz, D5: Merge+Passiv, D6: Sprache) |
| agent-teams Mehrwert-Befunde | n/a | n/a | 7 Kat-(b) ueber D2-D6, davon 5 fixed, 2 akzeptiert |
| Cross-Konsistenz Re-Dispatches | n/a | 0 | 0 |
| Session-Splits | 1 | 0 | 2 (Context-Recovery) |
| Neue Findings | P1, P2 (fixed), P3 | — | Alle Subagenten brauchen Dispatcher-Korrektur (id, format, display-ref) |

**Nach Abschluss:** Metriken in PROZESSTEST_MAPPE3_ERGEBNIS.md (Sektion 1) ergaenzen. Vergleich Phase 2.1 vs. Phase 2.2 als Indikator fuer Pipeline-Reife.

---

## Abhaengigkeitsgraph

```
D0 (2.1c: Cross + Ueberleitungen + HE-Revision)
  │
  ├── Output: ueberleitungen.json
  ├── Output: hefteintrag.json (revidiert)
  ├── Output: sicherung.json (aktualisiert)
  │
  ▼
D1 (2.2a: Progressionsplan)
  │   Liest: hefteintrag.json (revidierte Merksaetze)
  │
  ├── Output: PROGRESSIONSPLAN.md
  │
  ▼
D2 → D3 → D4 → D5 → D6 (2.2b: 5 Aufgaben, sequenziell)
  │   Jeder liest: PROGRESSIONSPLAN.md + Ziel-Material + SUB_AUFGABE
  │   Wachsender Kontext: "bereits getestete Inhalte"
  │   Nach jedem: Q-Gate + agent-teams Review
  │
  ├── Output: aufgabe-3-1.json bis aufgabe-3-5.json
  │
  ▼
D7 (2.2c: Cross-Konsistenz)
      Liest: alle aufgabe-JSONs + mat-Metadaten + hefteintrag
      Bei FAIL: Re-Dispatch → zurueck zu D2-D6
```
