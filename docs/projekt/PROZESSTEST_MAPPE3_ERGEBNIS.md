# Prozesstest Mappe 3 — Ergebnis

**Erstellt:** 2026-04-03
**Grundlage:** AUSFUEHRUNGSPLAN_C_PLUS.md Schritt 8 (Prozesstest-Metriken) + Schritt 9 (Post-Produktion)
**Scope:** Phase 2.1 (Material-Produktion), 5 Materialien (mat-3-1 bis mat-3-5)
**Referenz-Baseline:** Mappe 2 (6 Materialien, monolithische Produktion, ~6h Nacharbeit)

---

## 1. Prozesstest-Metriken

### 1.1 Dispatches pro Material

| Material | Typ | Dispatch-Modus | Dispatches | Nachbesserung | Dispatcher-Korrektur |
|---|---|---|---|---|---|
| mat-3-1 | darstellungstext | monolithisch (Referenz) | 1 | 0 | 0 |
| mat-3-2 | bildquelle | Pipeline-Test (isoliert) | 2 | 1 (M2 Umlaut) | 0 |
| mat-3-3 | bildquelle | Pipeline-Kette (isoliert) | 1 | 0 | 0 |
| mat-3-4 | quellentext | Pipeline-Kette (isoliert) | 1 | 0 | 1 (Zweig-Quelltyp) |
| mat-3-5 | tagebuch | Pipeline-Kette (isoliert) | 1 | 0 | 0 |
| **Summe** | | | **6** | **1** | **1** |

Soll laut AUSFUEHRUNGSPLAN: 1 Dispatch pro Material, max 2. Ergebnis: 4/5 Materialien beim ersten Dispatch PASS. 1/5 benoetigte eine Nachbesserung (mat-3-2), die innerhalb des erlaubten Rahmens (max 1 Iteration) lag.

### 1.2 Q-Gate-Ergebnisse

| Material | FAIL | WARN | GESAMT | Nachbesserung noetig? |
|---|---|---|---|---|
| mat-3-1 | 0 | 1 (M8) | PASS | Nein |
| mat-3-2 | 0 (nach NB) | 1 (BQ-3) | PASS nach NB | Ja (1x: M2 Umlaut) |
| mat-3-3 | 0 | 1 (BQ-3) | PASS | Nein |
| mat-3-4 | 0 | 0 | PASS | Nein |
| mat-3-5 | 0 | 0 | PASS | Nein |

Aggregation: 5/5 GESAMT-PASS. Davon 4/5 First-Pass, 1/5 nach Nachbesserung.
WARN-Verteilung: 3 WARNs gesamt (1x M8 Quellenangabe unspezifisch, 2x BQ-3 Bild-Konstruiertheit).

### 1.3 Decision-Tree-Abdeckung

| Read-Step | Beschreibung | Exercised? | Befund |
|---|---|---|---|
| 1 | MATERIAL_GERUEST laden | Ja (alle 5) | Kein Befund |
| 1b | Sequenzkontext laden (SKRIPT + vorherige Materialien) | Ja (mat-3-2..3-5) | Kein Befund |
| 2 | SKRIPT-Chunk laden | Ja (alle 5) | Kein Befund |
| 3 | INHALTSBASIS laden | Ja (alle 5) | Kein Befund |
| 4 | TAFELBILD laden (hefteintrag.json) | Ja (alle 5) | Kein Befund |
| 5 | Einstieg laden (einstieg.json) | Ja (alle 5) | Kein Befund |
| 6 | SUB_MATERIAL_*-Prompt laden | Ja (4 Typen: DT, BQ, QT, TB) | Kein Befund |
| 7 (konditional) | ARTEFAKT_INVENTAR laden (BQ-Materialien) | Ja (mat-3-2, mat-3-3) | P1: Mappe-3-Eintraege fehlen, WARNUNG+weiter |
| 8 (konditional) | SCPL-Loesungen laden (sicherung/transfer) | Ja (mat-3-5) | Kein Befund |

Abdeckung: 9/9 Steps exercised. Alle konditionalen Pfade (Step 7: BQ-Bedingung, Step 8: Sicherungs-Bedingung) wurden aktiviert und korrekt ausgeloest.
Nicht-aktivierte Pfade: Step 7 fuer NICHT-BQ-Materialien (korrekt uebersprungen), Step 8 fuer NICHT-Sicherungs-Materialien (korrekt uebersprungen).
Unvorhergesehene Faelle: Keine.

### 1.4 Session-Splits

| Session | Materialien | Uebergabe-Qualitaet |
|---|---|---|
| Session 1 (02.04.) | mat-3-1 (monolithisch) + mat-3-2 (Pipeline-Test) + Rahmen (hefteintrag/einstieg) | Kein Split noetig |
| Session 2 (02.04.) | mat-3-3..3-5 (Pipeline-Kette) | Uebergabe via Context-Summary. Kein Datenverlust. |

Befund: 2 Sessions fuer 5 Materialien. Uebergabe funktionierte reibungslos — Sequenzkontext-Akkumulation (wachsendes VORAUSGESETZTES_WISSEN) wurde korrekt ueber Session-Grenze transportiert.

### 1.5 Schema-Validierung

| Material | Erst-Dispatch | Nach Nachbesserung |
|---|---|---|
| mat-3-1 | PASS | — |
| mat-3-2 | FAIL (Umlaute) | PASS |
| mat-3-3 | PASS | — |
| mat-3-4 | PASS | — |
| mat-3-5 | PASS | — |

4/5 Materialien bestanden Schema-Validierung beim ersten Dispatch. 1/5 nach Nachbesserung.

### 1.6 Zeitaufwand

| Phase | Geschaetzt (AUSFUEHRUNGSPLAN) | Real | Differenz |
|---|---|---|---|
| Phase 2.0 Rahmen | 1 Session | ~30 min (Teil von Session 1) | Unter Schaetzung |
| Phase 2.1 Materialien | 1-2 Sessions | 2 Sessions | Im Rahmen |
| Prozesstest-Dokumentation | In Schritt 9 | ~30 min | — |

---

## 2. Fehlertypen-Vergleich mit Mappe 2

### 2.1 Eliminierte Fehlertypen

| Fehlertyp (Mappe 2) | Status Mappe 3 | Ursache der Elimination |
|---|---|---|
| Unstrukturierte monolithische Produktion | ELIMINIERT | Dispatch-Isolation: Jedes Material als eigener Subagent-Call |
| Fehlende Sequenzkohaerenz | ELIMINIERT | Read-Step 1b + wachsendes VORAUSGESETZTES_WISSEN pro Dispatch |
| Ambige Read-Steps ("ggf.", "bei Bedarf") | ELIMINIERT | Decision-Tree mit deterministischen Bedingungen |
| Fehlende Q-Gate-Formalisierung | ELIMINIERT | Q-GATE-MECHANIK.md mit PASS/WARN/FAIL + Aggregationsregel |
| Kein Output-Schema | ELIMINIERT | material-output-schema.json (draft-07) |
| Inkonsistente Felder in mat-*.json | ELIMINIERT | Schema-Validierung als Q-Gate-Schritt SCHEMA-01 |

### 2.2 Neue Fehlertypen (Mappe 3)

| ID | Fehlertyp | Schwere | Aufgetreten bei | Status |
|---|---|---|---|---|
| P1 | ARTEFAKT_INVENTAR Mappe 3 fehlt | NIEDRIG | mat-3-2, mat-3-3 | OFFEN (Fallback WARNUNG+weiter funktioniert) |
| P2 | Umlaut-Pflicht nicht in allen SUB_MATERIAL-Prompts | MITTEL | mat-3-2 | GEFIXT (BQ-Prompt ergaenzt, Wirksamkeit bei mat-3-3 bestaetigt) |
| P3 | BQ-3 (Bild ≠ Wirklichkeit) zu schwach im Prompt | NIEDRIG | mat-3-2, mat-3-3 | OFFEN (funktional WARN, nicht FAIL) |

Bewertung: Kein neuer Fehlertyp ist systemisch oder blockierend. P2 wurde noch waehrend der Produktion gefixt. P1 und P3 sind Optimierungspotenzial, keine Pipeline-Defekte.

### 2.3 Dispatcher-Korrekturen

1 Dispatcher-Korrektur bei mat-3-4: Zweig-Quelltyp von "Tagebucheintrag" zu "Erinnerungen" korrigiert. Dies ist ein erwarteter Dispatcher-Eingriff (inhaltliche Qualitaetssicherung beim Merge), kein Pipeline-Defekt.

---

## 3. Q-Gate-Konsistenz

Prueffrage: War die Bewertung deterministisch (gleicher Input → gleiches Ergebnis)?

Evidenz: BQ-3 wurde bei mat-3-2 und mat-3-3 identisch bewertet (WARN, gleiche Begruendung: implizite, nicht explizite Konstruktionsreflexion). Dies zeigt Konsistenz der Q-Gate-Mechanik ueber mehrere Dispatches hinweg.

Alle Kriterien wurden nach Q-GATE-MECHANIK.md §3/§4/§6 bewertet. Kein Interpretationsspielraum bei PASS/FAIL-Entscheidungen. Die Aggregationsregel (0 FAIL + max 2 WARN = GESAMT-PASS) wurde korrekt angewendet.

Befund: Q-Gate-Bewertung war deterministisch und konsistent.

---

## 4. Didaktische Qualitaet der Prozess-Produkte

### 4.1 Sequenzkohaerenz

Die 5 Materialien bilden eine kohaerente didaktische Sequenz:

mat-3-1 (DT, Einstieg): Fuehrt k3-1..k3-4 ein. Endet mit offener Frage ("gab es auch andere Stimmen?").
mat-3-2 (BQ, Erarbeitung): Visualisiert k3-1 (Augusterlebnis). Vertieft Begeisterung.
mat-3-3 (BQ, Erarbeitung): Zweite Perspektive auf k3-1 + k3-4 (Aufbruch vs. Abschied).
mat-3-4 (QT, Erarbeitung): Fuehrt k3-5 (Gegenstimmen) + k3-6 (Burgfrieden) ueber Originalquellen ein.
mat-3-5 (TB, Sicherung): Konsolidiert alle Knoten in persoenlicher Erfahrung. Transportiert alle 3 Kernerkenntnisse.

VORAUSGESETZTES_WISSEN wuchs korrekt: {} → {k3-1..k3-4} → {+k3-1} → {+k3-1,k3-4} → {+k3-5,k3-6} → {alle}.
NOCH_NICHT_EINGEFUEHRT schrumpfte korrekt auf {} bei mat-3-5.

### 4.2 Sicherungs-Pruefung (mat-3-5)

Read-Step 8 wurde korrekt aktiviert (didaktische_funktion = sicherung). Alle 3 Kernerkenntnisse aus scpl.loesung[] sind im Tagebuch-Material transportiert:

1. Begeisterung = staedtisch, nicht allgemein → Stadt/Land-Kontrast der zwei Eintraege
2. Vier Gruende → Freiwilliger zeigt Abenteuerlust, Patriotismus, Druck; Propaganda implizit
3. Truegerische Einheit → Bauersfrau: "ja sagen obwohl ich nein schreie"

### 4.3 Materialtyp-Vielfalt

4 verschiedene Subagenten-Typen exercised: DT, BQ (2x), QT, TB. Alle produzierten typgerecht — die Subagenten-Prompts sind funktional.

---

## 5. Pipeline-Findings (konsolidiert)

| ID | Beschreibung | Schwere | Status | Empfehlung |
|---|---|---|---|---|
| P1 | ARTEFAKT_INVENTAR hat keine Mappe-3-Eintraege | NIEDRIG | OFFEN | Vor Mappe-4-Produktion ergaenzen. Fuer Mappe 3 war Fallback ausreichend. |
| P2 | SUB_MATERIAL_BILDQUELLE.md fehlte Umlaut-Pflicht | MITTEL | GEFIXT | Fix in BQ-Prompt. Wirksamkeit bestaetigt (mat-3-3). Pruefen ob andere SUB_MATERIAL-Prompts ebenfalls explizite Umlaut-Pflicht brauchen. |
| P3 | BQ-3 (Bild ≠ Wirklichkeit) wird von isolierten Subagenten nur implizit adressiert | NIEDRIG | OFFEN | SUB_MATERIAL_BILDQUELLE.md um expliziten BQ-3-Hinweis ergaenzen. Kein Blocker — WARN, nicht FAIL. |

---

## 6. Nacharbeit-Bewertung

### 6.1 Tatsaechliche Nacharbeit Mappe 3 (Phase 2.1)

| Kategorie | Aufwand |
|---|---|
| Nachbesserungen (Q-Gate-initiiert) | 1x mat-3-2 Umlaut-Fix (~5 min) |
| Dispatcher-Korrekturen | 1x mat-3-4 Zweig-Quelltyp (~2 min) |
| Pipeline-Fix (P2) | BQ-Prompt-Ergaenzung (~10 min) |
| Gesamt Nacharbeit Phase 2.1 | **~17 min** |

### 6.2 Vergleich mit Mappe 2

| Metrik | Mappe 2 | Mappe 3 |
|---|---|---|
| Nacharbeit gesamt | ~6h | ~17 min |
| Materialien mit Nachbesserung | n/a (kein Q-Gate) | 1/5 (20%) |
| Systemische Fehler | Mehrere (Sequenz, Schema, Ambiguitaet) | 0 |
| First-Pass-Rate | n/a | 80% (4/5) |

Reduktion: ~95% weniger Nacharbeit gegenueber Mappe 2.

### 6.3 Entscheidungsmatrix (AUSFUEHRUNGSPLAN Schritt 9)

Kriterium: Nacharbeit < 3h UND keine neuen systemischen Fehler → C+ fortsetzen.

Ergebnis: Nacharbeit = ~17 min (< 3h). Neue Fehlertypen = 3, davon 0 systemisch (P1 = fehlende Daten, P2 = gefixt, P3 = kosmetisch).

**Entscheidung: C+ FORTSETZEN.**

---

## 7. Offene Punkte fuer Mappe-3-Restproduktion

Die Phase 2.1 (Materialien) ist abgeschlossen. Folgende Phasen stehen noch aus:

1. Phase 2.2a: Progressionsplan erstellen
2. Phase 2.2b: 5 Aufgaben produzieren (via VERTRAG_PHASE_2-2b)
3. Phase 2.2c: Cross-Validierung (Aufgaben ↔ Materialien)
4. Phase 3: Assembly (data.json erzeugen, Claude Code Uebergabe)
5. Phase 4: Browser-Validierung

Vor Aufgaben-Produktion zu klaren: P1 (ARTEFAKT_INVENTAR Mappe 3 ergaenzen, falls fuer Aufgaben relevant).

---

## 8. Fazit

Die C+-Pipeline hat den Prozesstest bestanden. Die drei Vertrags-Fixes (Schema, Q-Gate-Mechanik, Decision-Tree) adressieren die Mappe-2-Defizite wirksam. Die Dispatch-Isolation produziert didaktisch kohaerente Materialien bei drastisch reduzierter Nacharbeit. Die Pipeline ist bereit fuer die Restproduktion von Mappe 3 und anschliessend Mappe 4.
