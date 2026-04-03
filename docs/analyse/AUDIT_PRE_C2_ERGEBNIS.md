# AUDIT-ERGEBNIS: Produktionsreife-Pruefung vor C2

**Datum:** 2026-04-03
**Methode:** 3 parallele Reviewer (agent-teams), PM-Konsolidierung mit Datenverifikation
**Briefing:** docs/analyse/AUDIT_BRIEFING_PRE_C2_PRODUKTIONSREIFE.md

---

## Gesamtentscheidung: PATCH-THEN-PROCEED

**3 Pre-C2-Patches erforderlich, 5 Stretch-Verbesserungen empfohlen, kein Redesign noetig.**

---

## 1. Konsolidierte Findings

### 1.1 Findings mit PM-Bewertung

Jedes Finding wurde gegen den tatsaechlichen Projektstand verifiziert. PM-Bewertung korrigiert Fehleinschaetzungen der Reviewer.

#### BLOCKER (nach PM-Bewertung: 0)

| Reviewer-ID | Reviewer-Severity | PM-Severity | Begruendung PM-Korrektur |
|---|---|---|---|
| A-1 (AFB fehlt) | BLOCKER | **LEGACY-ONLY** | AFB ist in `_meta.afb` vorhanden — aber nur Mappe 3. Mappe 1+2 wurden vor _meta-Infrastruktur produziert. Kein C2-Risiko: Mappe 4 nutzt aktuelle Infrastruktur mit _meta.afb. |
| A-2 (sequenz_kontext Typ) | BLOCKER | **LEGACY-ONLY** | Bestaetigt: Mappe 2 = String, Mappe 1+3 = Object. Mappe-2-Legacy. Engine ignoriert sequenz_kontext (C-013). Kein Rendering-Impact. |
| A-3 (aufgaben-schema.json) | BLOCKER | **LOW** | schemata/ existiert mit 5 Dateien, aber kein aufgaben-schema.json. Kein Dokument referenziert die Datei. Q-Gate-Validierung laeuft manuell, nicht per JSON-Schema. |
| C-007 (Statistik-Tabelle) | BLOCKER | **MEDIUM** | Statistik-Material wurde noch nie produziert. Risiko nur bei erstmaligem Einsatz in Mappe 4+. Engine-Validierung empfohlen, nicht blockierend fuer C2. |

#### HIGH (nach PM-Bewertung: 3 → Pre-C2-Patches)

| ID | Datei(en) | Befund | PM-Bewertung | Patch |
|---|---|---|---|---|
| **P1** (C-003) | escape-engine.js | Freitext validierung_schwelle ignoriert. Engine nutzt ALL-or-nothing auf loesung[]. _meta.validierung_schwelle + _meta.erwartete_begriffe werden nicht gelesen. | **HIGH — Pre-C2-Patch.** Workaround: loesung[] auf Minimum-Keywords setzen (Schwelle = Array-Laenge). Infrastruktur-Fix: SUB_AUFGABE_FREITEXT muss dokumentieren, dass loesung[] = Minimum-Keywords-Set ist (nicht Gesamt-Set). | Engine-Patch oder Prompt-Anpassung |
| **P2** (B-001/B-002) | AGENT_HEFTEINTRAG.md, GUETEKRITERIEN_HEFTEINTRAG_PRODUKT.md | Knoten-Elaborierung fehlt: k3-6 "Burgfrieden (SPD stimmt zu)" hat keinen merksatz. SCPL-Complication-Schritte ohne Elaborierungssaetze fuer R7. D3b hat problem.satz gepatcht, aber nicht die Knoten-Ebene. | **HIGH — Infrastruktur-Patch.** AGENT_HEFTEINTRAG muss Elaborierung pro komplexem Knoten erzwingen. Betrifft C2-Produktion direkt. | AGENT_HEFTEINTRAG + VERTRAG_PHASE_2-0 verschaerfen |
| **P3** (C-008) | escape-engine.js, SUB_AUFGABE_FREITEXT.md | _meta.teilfragen werden produziert aber nicht gerendert. Didaktisches Denkgeruest geht verloren. | **HIGH — Engine-Patch empfohlen vor C2.** Ohne Teilfragen-Rendering fehlt SuS die Strukturhilfe bei AFB-III-Aufgaben. | Engine-Patch: Teilfragen als Aufzaehlung vor Textarea rendern |

#### MEDIUM (Stretch-Verbesserungen, nicht blockierend)

| ID | Befund | Empfehlung |
|---|---|---|
| A-4 | Q-Gate-Kriterien auf VERTRAG_2-2b und 2-2c aufgeteilt, Zustaendigkeitstrennung nicht explizit | Kommentar in beide Vertraege: "2-2b = Subagent-Pruefung (Einzelaufgabe), 2-2c = Orchestrator-Pruefung (mappenweite Kriterien)" |
| A-9 | Kriterium-ID-Konflikt: MQ3 vs. Q-M2-04 fuer Material-Referenz-Verbot | Einheitliche ID festlegen, andere als Alias dokumentieren |
| A-13 | Kein zentraler Q-Gate-Index | docs/architektur/Q-GATE-INDEX.md erstellen (Wartbarkeit) |
| B-004 | Ueberleitung Mappe-3 knuepft nicht explizit an Mappe-3-Kernerkenntnis an | Formulierungs-Optimierung in Mappe-3-Daten |
| B-005 | Lueckentext als AFB-II-Instrument fragwuerdig (aufgabe-3-5) | AGENT_RAETSEL: Typ-AFB-Paarungsempfehlung ergaenzen |
| B-007 | Vergegenwaertigung in Darstellungstext koennte staerker sein | SK1-Operationalisierung in AGENT_SKRIPT praezisieren |
| B-013 | TB (Tagebuch) als didaktische_funktion "sicherung" statt "erarbeitung" | Korrektur in Mappe-3-Daten |
| C-001 | antwortpool: Schema sagt alphabetisch, Engine shuffled | Schema aktualisieren: "alphabetisch in JSON, Engine shuffled bei Anzeige" |
| C-004 | Zuordnung: loesung-Struktur nicht gegen elemente validiert | Engine-Warnung ergaenzen |
| C-006 | Reihenfolge: Fallback auf optionen wenn loesung fehlt | Engine-Guard: loesung PFLICHT, kein stilles Fallback |
| C-011 | MC: Keine Laengen-Pruefung auf optionen (erwartet 4) | Engine-Warnung ergaenzen |
| C-015 | Hefteintrag SCPL-Rendering: Fallback-Verhalten undokumentiert | Dokumentation in SUB_AUFGABE oder Rendering-Kontrakt |

#### LOW / FALSE POSITIVE (keine Aktion)

| ID | Befund | Begruendung |
|---|---|---|
| A-1 | AFB fehlt in Mappe 1+2 | Legacy-Daten, kein C2-Risiko |
| A-2 | sequenz_kontext String in Mappe 2 | Legacy-Daten, Engine ignoriert Feld |
| A-3 | aufgaben-schema.json fehlt | Keine Referenz, manuelle Q-Gate-Validierung |
| A-15 | Template data.json veraltet | Bekannt, nicht kritisch |
| B-009 | S-Zone-Autonomie verletzt | **BEREITS GEPATCHT** (D3a, Session 9) |
| B-010 | Merksatz zu lang (23 W.) | **VERIFIZIERT: 18 Woerter — PASS** (Reviewer hatte alte Version) |
| C-013 | sequenz_kontext ignoriert | Design-Entscheidung: Qualitaetssicherungs-Feld, nicht Rendering-Feld |
| C-014 | punkte nicht im Progress-State | Design-Entscheidung: kein Scoring-System im MVP |

---

## 2. Pre-C2-Patch-Plan

### P1: Freitext-Keyword-Logik klaeren

**Problem:** Engine prueft ALL keywords in loesung[]. Prompts erzeugen _meta.validierung_schwelle (z.B. 3 von 5), die ignoriert wird.

**Loesung (minimal, kein Engine-Patch):** SUB_AUFGABE_FREITEXT.md verschaerfen: "loesung[] enthaelt NUR die Minimum-Keywords (validierung_schwelle Stueck). erwartete_begriffe[] in _meta ist das Gesamt-Set fuer Tipp-3-Musterantwort. Engine prueft loesung[] ALL-or-nothing."

**Alternativ (besser, Engine-Patch):** validierung_schwelle implementieren. Aufwand: ~20 Zeilen in _checkFreitextCode.

**Entscheidung:** Prompt-Anpassung jetzt (5 Min), Engine-Patch als Stretch vor C2.

### P2: Knoten-Elaborierung in AGENT_HEFTEINTRAG

**Problem:** Komplexe Hefteintrag-Knoten (Fachbegriffe wie Burgfrieden, Stellungskrieg) ohne merksatz/Elaborierung. R7-SuS koennen Knoten-Listen nicht selbst verknuepfen.

**Loesung:** AGENT_HEFTEINTRAG.md und VERTRAG_PHASE_2-0 ergaenzen: "Jeder Knoten mit typ=kernbegriff oder typ=wirkung, dessen text einen Fachbegriff enthaelt, der nicht im allgemeinen R7-Wortschatz liegt, MUSS ein merksatz-Feld haben (max 15 Woerter, erklaert den Begriff)."

**Retroaktiv Mappe 3:** k3-6 merksatz ergaenzen: "Alle Parteien stellen Streit ein und stuetzen gemeinsam den Krieg."

### P3: Teilfragen-Rendering (Engine-Patch)

**Problem:** _meta.teilfragen werden produziert aber nicht gerendert. Freitext-Aufgaben ohne Strukturhilfe.

**Loesung:** Engine-Patch: _renderFreitextCode erweitern. Wenn aufgabe._meta.teilfragen existiert, als `<ul class="aufgabe__teilfragen">` vor dem Textarea rendern. CSS in theme-gpg.css ergaenzen.

**Aufwand:** ~15 Zeilen JS + ~10 Zeilen CSS.

---

## 3. Reviewer-Gesamtbewertungen

| Dimension | Reviewer-Urteil | PM-Korrektur |
|---|---|---|
| A: Technische Kohaerenz | NICHT PRODUKTIONSREIF (3 BLOCKER) | **BEDINGT PRODUKTIONSREIF** — alle 3 "BLOCKER" sind Legacy-Daten oder fehlende Referenzen, keine akuten Schema-Widersprueche |
| B: Didaktische Kalibrierung | BEDINGT PRODUKTIONSREIF (1 BLOCKER, 4 HIGH) | **BEDINGT PRODUKTIONSREIF** — BLOCKER (Elaborierung) bestaetigt als P2. 2 von 4 HIGH bereits gepatcht (D3a/D3b). |
| C: Engine-Schema | BEDINGT PRODUKTIONSREIF (1 BLOCKER, 3 HIGH) | **BEDINGT PRODUKTIONSREIF** — BLOCKER (Statistik) betrifft ungenutzen Materialtyp. 2 HIGH als P1+P3 uebernommen. |

**Konsolidiert: BEDINGT PRODUKTIONSREIF → PATCH-THEN-PROCEED**

---

## 4. Risikobewertung fuer C2

| Risiko | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Freitext-Aufgaben: False-Negatives durch ALL-keyword-Logik | HOCH (wenn validierung_schwelle < loesung.length) | MITTEL (SuS-Frustration) | P1: Prompt-Anpassung |
| Hefteintrag-Knoten ohne Elaborierung | HOCH (systematisch) | HOCH (R7-Verstaendnis) | P2: AGENT_HEFTEINTRAG patchen |
| Teilfragen nicht sichtbar | SICHER (100%) | MITTEL (fehlende Strukturhilfe) | P3: Engine-Patch |
| Statistik-Tabellen nicht validiert | NIEDRIG (Typ noch nicht genutzt) | HOCH (wenn genutzt) | Engine-Guard bei Erstnutzung |
| Legacy-Inkonsistenzen Mappe 1-2 | NIEDRIG (keine Regression) | NIEDRIG | Kein Patch noetig |

---

## 5. Naechste Schritte

1. **P1 ausfuehren:** SUB_AUFGABE_FREITEXT.md Prompt-Anpassung (loesung = Minimum-Keywords)
2. **P2 ausfuehren:** AGENT_HEFTEINTRAG.md + VERTRAG_PHASE_2-0 + k3-6 merksatz in data.json
3. **P3 als Uebergabe-Prompt:** Engine-Patch fuer Teilfragen-Rendering (Claude Code)
4. **Commit + Push**
5. **C2 starten:** Mappe-4-Validierung
