# Dispatch-Skript: Mappe 4 — Phase 1 bis 4 (C2 Validierungstest)

**Erstellt:** 2026-04-03 (PM-Session 9)
**Zweck:** Steuerungsdokument fuer die vollstaendige Mappe-4-Produktion als Validierungstest der revidierten Infrastruktur (C2). Jede Produktionssession liest dieses Skript, sieht Fortschritt, macht weiter.
**Testcharakter:** Mappe 4 ist der erste vollstaendige Durchlauf mit allen Infrastruktur-Patches (A1-A7, B1-B2, C1-C1c, P1-P3). Ergebnis entscheidet ueber Pipeline-Reife.

## Erfolgskriterien (aus AUSFUEHRUNGSPLAN)

- 0 wiederkehrende Findings aus B1-B10 (Mappe-3-Browser-Review)
- Max 2 neue mappe-spezifische Findings
- Bei Verfehlung: Eskalation zu Option A (Full Rebuild)

## Testbedingungen (KRITISCH)

1. **Kein PM-Eingriff waehrend Produktion.** Der PM liefert nur dieses Dispatch-Skript und die Phase-0.4-Artefakte. Die Produktionssession arbeitet ausschliesslich mit den Infrastruktur-Dokumenten (Vertraege, Subagenten-Prompts, Q-Gate-Kriterien).
2. **Kein Zugriff auf Mappe-3-Produktionsartefakte als Vorlage.** Die Subagenten sollen aus ihren Prompts heraus korrekte Outputs erzeugen, nicht durch Kopieren von Mappe-3-Beispielen.
3. **Q-Gate-Ergebnisse vollstaendig dokumentieren.** Jedes FAIL wird im Fortschritts-Tracker erfasst — auch wenn nachgebessert wird.
4. **Session-Splits an definierten Punkten.** Token-Budget respektieren.

## Vorbedingungen (ERLEDIGT)

- [x] Phase 0 komplett (DIDAKTIK_RAHMEN, INHALTSBASIS, ARTEFAKT_INVENTAR, SKRIPT — Game-weit)
- [x] Phase 0.4: TAFELBILD_gpg-erster-weltkrieg-ursachen_Mappe4.md (Q-Gate G1-G14 PASS)
- [x] Infrastruktur-Revision: A1-A7, B1-B2, C1-C1c, P1-P3 alle DONE
- [ ] Phase 1: MATERIAL_GERUEST Mappe 4 — NOCH NICHT ERSTELLT (Teil des Tests)

---

## Fortschritts-Tracker

| # | Phase | Dispatch | Status | Q-Gate | Metriken-Notiz |
|---|---|---|---|---|---|
| D-1 | 1 | AGENT_MATERIAL Design-Modus (Materialtyp-Zuordnung) | DONE | — | 5 Materialien, 4 Typen (DT, Karte×2, Tagebuch, BQ). Alle 6 TB-Knoten + 6 Verbindungen abgedeckt. 3 Artefakte nicht als eigenes Material (img-4-4, zit-4-2, rolle-4-2) — begruendet. |
| D-1.5 | 1.5 | AGENT_MATERIAL Sequenzplanung (Reihenfolge, Funktionen, Ueberleitungen) | DONE | S1-S15 PASS (S10 SOLL-FAIL dok.) | 5 Pos: DT→Karte→TB→Karte→BQ. SCPL monoton S→C→P. Skript-kongruent. 4 Ueberleitungen inhaltlich motiviert. |
| D0 | 2.0 | Rahmen-Produktion (hefteintrag, einstieg, sicherung, meta) | DONE | §7.3 PASS (8/8, 0 FAIL, 0 WARN) | 6 Knoten, 5 Verbindungen, 3 Merksaetze (k4-1, k4-2, k4-6). SCPL-Texte C1/C3/P gekuerzt (FORMULIERUNGS-OFFEN). Freischalt-Code: MARNE. |
| D1 | 2.1-1 | Material 1 | DONE | M1-M12 + DT PASS (1 Nachbesserung: 153→150 W) | DT, 150 W, 3 Abs, 3 FB (Zweifrontenkrieg, Schlieffen-Plan, Mobilmachung). TB: k4-1, k4-2, k4-3. zit-4-1 eingebettet. |
| D2 | 2.1-2 | Material 2 | DONE | M1-M12 + KA PASS (0 FAIL, 0 WARN) | Karte (→bildquelle), img-4-1 Schlieffen_Plan.svg, BU 31 W. TB: k4-1, k4-4. Public Domain. |
| D3 | 2.1-3 | Material 3 | DONE | M1-M12 + TB PASS (0 FAIL, 0 WARN) | Tagebuch, 99 W, Figur Friedrich (22, Infanterist). TB: k4-4. Keine Nachbesserung. SQ-1 bis SQ-4 PASS. |
| D4 | 2.1-4 | Material 4 | DONE | M1-M12 + KA PASS (0 FAIL, 0 WARN) | Karte (→bildquelle), img-4-2 Battle_of_the_Marne 1914 (Maurice), BU 28 W. TB: k4-5. Public Domain. Keine Nachbesserung. SQ-1 bis SQ-4 PASS. |
| D5 | 2.1-5 | Material 5 | DONE | M1-M12 + BQ PASS (0 FAIL, 0 WARN) | BQ (nativ), img-4-3 IWM Q53490, BU 29 W. TB: k4-6. Sicherung + Kernerkenntnisse. Public Domain. Keine Nachbesserung. SQ-1 bis SQ-4 PASS. |
| D6 | 2.1c | Material-Cross + Ueberleitungen + Hefteintrag-Revision | OFFEN | §7.4 | |
| D7 | 2.2a | AGENT_RAETSEL: Progressionsplan | OFFEN | — | |
| D8 | 2.2b-1 | Aufgabe 1 | OFFEN | A1-A18 + typ | |
| D9 | 2.2b-2 | Aufgabe 2 | OFFEN | A1-A18 + typ | |
| D10 | 2.2b-3 | Aufgabe 3 | OFFEN | A1-A18 + typ | |
| D11 | 2.2b-4 | Aufgabe 4 | OFFEN | A1-A18 + typ | |
| D12 | 2.2b-5 | Aufgabe 5 | OFFEN | A1-A18 + typ | |
| D13 | 2.2c | Cross-Konsistenz (Orchestrator-Q-Gate) | OFFEN | §7.5 | |
| D14 | 3 | Assembly + HTML + Commit | OFFEN | JSON-valid | |
| D15 | 4 | Browser-Validierung | OFFEN | B1-B10 0 repeat | |

**Aktualisierungsregel:** Nach jedem Dispatch: Status auf DONE/FAIL setzen, Q-Gate-Ergebnis eintragen, Metriken-Notiz mit Auffaelligkeiten fuellen.

---

## Session-Split-Punkte

| Nach Dispatch | Split empfohlen? | Uebergabe-Prompt |
|---|---|---|
| D-1.5 (Phase 1 komplett) | JA | "Phase 1 DONE. Lies DISPATCH_SKRIPT_MAPPE4, weiter mit D0." |
| D0 (Rahmen) | MOEGLICH | "Phase 2.0 DONE. Lies DISPATCH_SKRIPT_MAPPE4, weiter mit D1." |
| D3 (nach Material 3) | JA (empfohlen) | "3/5 Materialien DONE. Lies DISPATCH_SKRIPT_MAPPE4, weiter mit D4." |
| D6 (Phase 2.1c) | JA (empfohlen) | "Phase 2.1c DONE. Lies DISPATCH_SKRIPT_MAPPE4, weiter mit D7." |
| D10 (nach Aufgabe 3) | MOEGLICH | "3/5 Aufgaben DONE. Lies DISPATCH_SKRIPT_MAPPE4, weiter mit D11." |
| D13 (Phase 2.2c) | JA (empfohlen) | "Phase 2 komplett. Lies DISPATCH_SKRIPT_MAPPE4, weiter mit D14 (Assembly)." |

**Uebergabe-Prompt-Template (bei Session-Split):**

```
Lies docs/agents/artefakte/produktion/gpg-erster-weltkrieg-ursachen/mappe-4/DISPATCH_SKRIPT_MAPPE4.md.
Fortschritts-Tracker zeigt aktuellen Stand. Naechster Dispatch: D[X].
Alle bisherigen Outputs liegen als Dateien im Produktionsverzeichnis.
Testbedingungen beachten: Kein PM-Eingriff, kein Kopieren aus Mappe-3-Artefakten.
```

---

## Phase 1: Material-Design (D-1 + D-1.5)

### D-1: AGENT_MATERIAL Design-Modus

**Vertrag:** WORKFLOW_v4.md Phase 1 (Aufgabe 1.1-1.8)
**Agent:** AGENT_MATERIAL

**Read-Steps:**

| # | Datei | Felder |
|---|---|---|
| 1 | TAFELBILD_gpg-erster-weltkrieg-ursachen_Mappe4.md | Vollstaendig (SCPL, Knoten, Stundenfrage) |
| 2 | SKRIPT_gpg-erster-weltkrieg-ursachen.md | Chunk 4 (§1-§6 + Artefakt-Zuordnung) |
| 3 | DIDAKTIK_RAHMEN_gpg-erster-weltkrieg-ursachen.md | KE-Matrix, Mappe-4-Grobstruktur |
| 4 | INHALTSBASIS_gpg-erster-weltkrieg-ursachen.md | Mappe 4 Sektion |

**Aufgaben:**
1. Materialtyp-Zuordnung aus Artefakt-Referenzen im SKRIPT ableiten
2. TB-Abdeckungs-Nachweis: Jeder TB-Knoten durch min. 1 Material abgedeckt
3. Erarbeitbarkeits-Nachweis: Jeder SCPL-Schritt durch Material(ien) erarbeitbar
4. Mindest-Materialien-Check: 1 DT + 1 QT/BQ + 1 personifiziert + 1 visuell

**Output:** MATERIAL_GERUEST_gpg-erster-weltkrieg-ursachen_Mappe4.md

### D-1.5: Sequenzplanung

**Vertrag:** WORKFLOW_v4.md Phase 1.5 (Aufgabe 1.9-1.10)

**Aufgaben:**
1. Materialien in didaktisch sinnvolle Reihenfolge bringen
2. position, didaktische_funktion, voraussetzung pro Material definieren
3. Ueberleitungs-Skizzen zwischen Materialien
4. Sequenzkontext-Objekte fuer Subagenten generieren

**Output:** MATERIAL_GERUEST_Mappe4.md aktualisiert mit Sequenzplan-Abschnitt

**User-Validierung:** PFLICHT nach D-1.5 (Blueprint + Sequenz gemeinsam pruefen)

---

## Phase 2.0: Rahmen-Produktion (D0)

**Vertrag:** VERTRAG_PHASE_2-0_RAHMEN.md
**Dispatch-Typ:** 1 Dispatch, 4 Output-Dateien

**Read-Steps:** Gemaess Vertrag (TAFELBILD, MATERIAL_GERUEST Einstieg/Sicherung, ORCHESTRATOR)

**Besondere Pruefpunkte (aus C1c-Audit):**
- 1-pre: S-Zone-Autonomie (v3.4) — kontextsatz darf KEIN Mappe-3-Wissen rekapitulieren
- 1-post: Knoten-Elaborierung (v3.5) — merksatz fuer Fachbegriffe ausserhalb R7-Wortschatz
- 1a-post: Ordnungsmuster-Konsequenz (v3.4) — sequenziell → chronologische Schritte
- C1b: einstieg.problemstellung === hefteintrag.stundenfrage

**Output:**
```
rahmen/
  hefteintrag.json
  einstieg.json
  sicherung.json
  meta.json
```

---

## Phase 2.1: Material-Produktion (D1-D5)

**Vertrag:** VERTRAG_PHASE_2-1_MATERIAL.md
**Dispatch-Typ:** 1 Dispatch pro Material (P4: Dispatch-Isolation)

Pro Material:
1. Read-Steps gemaess Vertrag (Decision-Tree Steps 1-8)
2. Subagent aufrufen (SUB_MATERIAL_[TYP].md)
3. Q-Gate: M1-M12 + typ-spezifisch
4. Output: materialien/mat-4-[N].json
5. Q-Gate-Ergebnis in Q-GATE-LOG.md

**Encoding-Pruefung (A1):** UTF-8 Umlaute + typographische Zeichen (v3.3) bei jedem Material pruefen.
**Quellenangaben-Hygiene (A2):** Quellenangaben NUR in quellenangaben[], NICHT in inhalt.

**User-Validierung nach Material 1-2: EMPFOHLEN** (ab Mappe 3 herabgestuft, Mappe 4 = erste mit revidierter Infra → EMPFOHLEN beibehalten)

---

## Phase 2.1c: Cross-Konsistenz (D6)

**Vertrag:** VERTRAG_PHASE_2-1c_CROSS.md
**Dispatch-Typ:** 1 Dispatch (6 Achsen)

**Achsen:**
1. Sequenz-Kohaerenz
2. Fachbegriff-Konsistenz
3. Ueberleitung-Kohaerenz
4. TB-Knoten-Gesamtabdeckung
5. Zwei-Vektoren-Ueberleitungen (produzieren)
6. Hefteintrag-Revision (FORMULIERUNGS-OFFEN)

**Sprachregister-Pruefung (A3):** Ueberleitungen in R7-Sprachregister, max 2 Saetze, keine didaktischen Metakommentare.

**Output:** ueberleitungen.json, ggf. Patches sicherung.json + hefteintrag.json

---

## Phase 2.2: Aufgaben-Produktion (D7-D13)

### D7: Progressionsplan (AGENT_RAETSEL)

**Vertrag:** VERTRAG_PHASE_2-2a.md (implizit in AGENT_RAETSEL)

**Read-Steps:**
- Alle materialien/mat-4-*.json (fertig)
- rahmen/hefteintrag.json (TB-Knoten)
- TAFELBILD Mappe 4 (Kernerkenntnisse)

**Output:** PROGRESSIONSPLAN_Mappe4.md (5-8 Aufgaben, Typen, AFB-Progression, TB-Knoten-Zuordnung, Freischalt-Code)

### D8-D12: Einzelne Aufgaben (SUB_AUFGABE_*)

**Vertrag:** VERTRAG_PHASE_2-2b (implizit in SUB_AUFGABE_*.md)
**Dispatch-Typ:** 1 Dispatch pro Aufgabe (P4)

Pro Aufgabe:
1. PROGRESSIONSPLAN lesen → Aufgaben-Spezifikation
2. Material(ien) lesen
3. Subagent aufrufen (SUB_AUFGABE_[TYP].md)
4. Q-Gate: A1-A18 + typ-spezifisch + A2b Inhaltliche Verankerung (v3.4, PFLICHT)
5. Output: aufgaben/aufgabe-4-[N].json
6. Q-Gate-Ergebnis in Q-GATE-LOG.md

**Freitext-Pruefung (P1):** loesung[] = NUR Minimum-Keywords (ALL-or-nothing). erwartete_begriffe in _meta.
**Verankerung (D2):** Jeder Fragestamm mind. 1 konkretes Element. Keine abstrakten Metabegriffe ohne Bezug.

### D13: Cross-Konsistenz (Orchestrator-Q-Gate)

**Vertrag:** VERTRAG_PHASE_2-2c (implizit)

Prueft:
- Typendiversitaet (min. 3 verschiedene Typen)
- AFB-Progression (monoton steigend, I→III)
- TB-Knoten-Vollabdeckung (alle 6 Knoten min. 1× getestet)
- MQ3/MQ3b (Material-Referenz-Verbot in frage / Display-Referenzen in Tipps)
- Freischalt-Code korrekt

---

## Phase 3: Assembly (D14)

**Ort:** Claude Code (Uebergabe-Prompt)
**Vertrag:** WORKFLOW_v4.md Phase 3

**Aufgaben:**
1. Pre-Flight: git pull, Zustandspruefung
2. Bild-Download: Python urllib fuer wikimedia-Artefakte
3. Assembly: Alle .json → data.json Mappe-4-Objekt anhaengen
4. mappe-4.html aus Template erstellen
5. JSON-Validierung
6. Cache-Busting: ?v= auf allen HTML-Referenzen pruefen
7. git commit + push

---

## Phase 4: Browser-Validierung (D15)

**Ort:** User + ggf. Cowork via Chrome (accessibility-compliance Plugin)

**Pruefschritte:**
1. Funktionstest: Alle Aufgabentypen durchspielen, Loesungswort pruefen
2. WCAG-Audit (accessibility-compliance Plugin)
3. User-Browser-Review: Visuell, didaktisch, sprachlich

**Erfolgskriterien-Pruefung:**
- Mappe-3-Findings B1-B10 checken: Keines darf wiederkehren
- Neue Findings zaehlen: Max 2 erlaubt
- Ergebnis in C2_EVALUATION_MAPPE4.md dokumentieren

---

## Metriken-Gesamttabelle

| Metrik | Mappe 3 (Baseline) | Mappe 4 (C2) | Delta |
|---|---|---|---|
| Materialien: Anzahl | 5 | | |
| Materialien: Q-Gate PASS-Rate (1. Durchlauf) | 5/5 (100%) | | |
| Aufgaben: Anzahl | 7 (dann 5 nach B2) | | |
| Aufgaben: Q-Gate PASS-Rate (1. Durchlauf) | — (v1 nicht vergleichbar) | | |
| Aufgaben: Nachbesserungen | 4/5 (D2-D6) | | |
| Cross-Konsistenz: FAILs | 0 | | |
| Browser-Findings: Wiederkehrend (B1-B10) | 7 von 10 | | |
| Browser-Findings: Neu | — | | |
| Gesamtdauer (Dispatches) | ~16h (8+9) | | |

---

## Referenz-Dokumente (Pflichtlektuere fuer Produktionssession)

| Dokument | Wann lesen |
|---|---|
| Dieses Dispatch-Skript | Session-Start, jeder Session-Split |
| ORCHESTRATOR.md | Einmalig bei Session-Start |
| WORKFLOW_v4.md | Bei Unklarheit ueber Phasenstruktur |
| VERTRAG_PHASE_2-0_RAHMEN.md | Vor D0 |
| VERTRAG_PHASE_2-1_MATERIAL.md | Vor D1 |
| VERTRAG_PHASE_2-1c_CROSS.md | Vor D6 |
| AGENT_RAETSEL.md | Vor D7 |
| SUB_AUFGABE_*.md (je nach Typ) | Vor D8-D12 |
| Q-GATE-MECHANIK.md | Bei jeder Q-Gate-Pruefung |
| TAFELBILD Mappe 4 | D-1, D0, D7 |
| SKRIPT Chunk 4 | D-1, D1-D5 |
