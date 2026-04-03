# C1 Evaluationsbericht — Mappe 3 Hybrid-Patch

**Datum:** 2026-04-03
**Session:** 8 (Infrastruktur-Revision, Phase C1)
**Vorgehen:** Hybrid — mechanische Patches (Materialien/Rahmen) + Aufgaben-Neugenerierung via v2-Pipeline
**Artefakte:** 5 patched files (Stufe 1), PROGRESSIONSPLAN_v2.md + 7 Aufgaben-JSONs (Stufe 2), data.json-Patch (Stufe 3)

---

## 1. Vorher/Nachher-Vergleich (10 Dimensionen)

### D1: Aufgabenzahl
- **v1:** 5 (starr, Schablone)
- **v2:** 7 (inhaltsgesteuert: min(8, 5+1+1) = 7)
- **Delta:** +2 Aufgaben. Formel beruecksichtigt 6 TB-Knoten und 5 Materialien.

### D2: SCPL-Zonen-Abdeckung
- **v1:** Keine SCPL-Zonen-Zuweisung. Aufgaben implizit auf S/C verteilt, P und L nicht systematisch adressiert.
- **v2:** Explizites Mapping: S(1) → C1(1) → C2(1) → C3(1) → P(1) → L(2). Alle 6 Zonen abgedeckt.
- **Delta:** Von unstrukturiert zu vollstaendig kartiert. Keine Zone uebersprungen.

### D3: AFB-Progression
- **v1:** I → I → I-II → II → III (5 Stufen, groesster Sprung II→III)
- **v2:** I → I → I-II → II → II → II → III (7 Stufen, gradueller Anstieg)
- **Delta:** Feinere Abstufung. Der Sprung II→III tritt erst bei Pos 7 auf, nicht bei Pos 5.

### D4: Material-Aktivierung (A18)
- **v1:** mat-3-2 (BQ Stadtschloss) und mat-3-3 (BQ Truppentransport) nur in Tipps. Effektiv 3 von 5 Materialien als Primaerquelle.
- **v2:** Alle 5 Materialien als Primaerquelle. mat-3-2 → Pos 2, mat-3-3 → Pos 4.
- **Delta:** Kritischer Defekt behoben. 5/5 statt 3/5.

### D5: Typauswahl
- **v1:** LT, MC, ZU, RF, FT (5 Typen auf 5 Aufgaben — 1:1, keine Wiederholung, kein Begruendungszwang)
- **v2:** LT(2), MC(2), ZU(2), FT(1) — 4 Typen auf 7 Aufgaben, jede Wiederholung im Progressionsplan begruendet
- **Delta:** Von Diversitaetsquote zu inhaltsgesteuerter Auswahl. RF (reihenfolge) eliminiert — war in v1 problematisch (B8: ambige Chronologie).

### D6: Encoding
- **v1:** Gemischt — ASCII-Transliterationen in rahmen/sicherung.json, HTML-Entities in mat-3-4/3-5, Doppel-Hyphens
- **v2:** Sauber — UTF-8 Umlaute, guillemets, Gedankenstriche. 0 Findings.
- **Delta:** Encoding-Defekte vollstaendig behoben.

### D7: Quellenangaben-Trennung (B3)
- **v1:** mat-3-4 hatte `<p class="quellentext__nachweis">` inline im inhalt. mat-3-5 hatte `<cite>` inline.
- **v2:** mat-3-4 hat separates `quellenangaben[]`-Feld. mat-3-5 bereinigt.
- **Delta:** Strukturelle Trennung von Inhalt und Metadaten.

### D8: Einleitungen (B4)
- **v1:** mat-3-4 Einleitungen waren mehrsaetzig mit kontextuellen Details
- **v2:** Gekuerzt auf "Name+Rolle"-Format
- **Delta:** Praegnanter, weniger Lesetextmenge fuer SuS.

### D9: Hefteintrag
- **v1:** ASCII-Transliterationen, Ordnungsmuster "multiperspektivisch", Transfer-Feld, untypisierte Verbindungen
- **v2:** UTF-8, Ordnungsmuster "kontrastierend", kein Transfer-Feld, typisierte Verbindungen (kausal, kontrast, schlussfolgerung)
- **Delta:** Strukturelle und inhaltliche Korrektur (B10).

### D10: Q-Gate A1-A18
- **v1:** Nicht durchlaufen (Kriterien A16-A18 existierten noch nicht)
- **v2:** 25/25 PASS (7 prozedural, 7 MUSS, 8 SOLL, 3 KANN)
- **Delta:** Erste Mappe mit vollstaendigem Q-Gate-Durchlauf.

---

## 2. Zusammenfassung nach Kategorie

| Kategorie | v1-Status | v2-Status | Behoben |
|---|---|---|---|
| Encoding (B2) | 3 Findings | 0 | Ja |
| Quellenangaben (B3) | 2 Findings | 0 | Ja |
| Einleitungen (B4) | 1 Finding | 0 | Ja |
| Reihenfolge-Typ (B8) | 1 Finding (ambig) | 0 (Typ eliminiert) | Ja |
| Hefteintrag (B10) | 4 Findings | 0 | Ja |
| Sicherung ASCII (B11) | 1 Finding | 0 | Ja |
| Material-Aktivierung (A18) | 2 Materialien ohne Primaeraufgabe | 0 | Ja |
| SCPL-Mapping (A16/A17) | Nicht vorhanden | Vollstaendig | Neu |
| Inhaltsgesteuerte Typauswahl (A10) | Diversitaetsquote | Operationalisierungsziel-basiert | Neu |

---

## 3. Learnings fuer Mappe-4-Produktion

### L1: Hybrid-Patch ist der richtige Ansatz
Mechanische Patches (Encoding, Quellenangaben, Einleitungen) sind isoliert und schnell. Aufgaben-Neugenerierung ist noetig, wenn sich die Pipeline-Architektur (hier: A16-A18, variable Aufgabenzahl) geaendert hat. Symptom-Patches (die 10 Original-Patches B1-B11) haetten das A18-Defizit nicht behoben.

### L2: PROGRESSIONSPLAN_v2 vor Einzelaufgaben
Der Progressionsplan als vorgelagertes Dokument (SCPL-Mapping, Typ-Begruendungen, Material-Aktivierung, Erarbeitbarkeits-Gegenpruefung) verhindert systematische Fehler. In der v1-Produktion fehlte dieses Dokument — Aufgaben wurden sequentiell ohne Gesamtplan erstellt.

### L3: Erarbeitbarkeits-Gegenpruefung eliminiert A3-Risiken
Die explizite Gegenpruefung (7/7 PASS im Progressionsplan) stellt sicher, dass jede Aufgabe aus dem Material loesbar ist. Fuer Mappe 4: Gegenpruefung in den AGENT_RAETSEL-Workflow einbauen (nach Typauswahl, vor Subagenten-Dispatch).

### L4: Reihenfolge-Typ vermeiden oder streng absichern
Der RF-Typ wurde in v2 durch LT ersetzt, weil die Burgfrieden-Chronologie nicht eindeutig ordnungsbar war. Fuer Mappe 4: RF nur verwenden, wenn paarweise klare Ordnungsrelation besteht (z.B. Eskalationsstufen mit Jahreszahlen).

### L5: BQ/QT als Primaerquelle ist Pflicht
Die A18-Regel (Bildquellen und Quellentexte duerfen nicht nur in Tipps vorkommen) hat das zentrale Defizit der v1-Aufgaben behoben. Fuer Mappe 4: A18 bereits im Progressionsplan pruefen, nicht erst im Q-Gate.

### L6: Freischalt-Code ist thematisch, nicht laengenabhaengig
AUGUST funktioniert fuer 7 Aufgaben genauso wie fuer 5. Die Code-Laenge hat keinen Zusammenhang mit der Aufgabenzahl. Fuer Mappe 4: Code aus zentralem Fachbegriff der Mappe ableiten.

### L7: Assembly als Skript, nicht als Uebergabe-Prompt
data.json-Assembly per Python-Skript ist zuverlaessiger als ein Uebergabe-Prompt — keine Interpretationsschicht, keine Copy-Paste-Fehler. Fuer Mappe 4: Assembly-Skript standardisieren (Parametrisierung: Mappe-ID, Aufgabenzahl).

---

## 4. Offene Punkte

1. **Browser-Test**: data.json ist gepatcht, aber die Website wurde nicht im Browser getestet. Erfordert User-Review (GitHub Pages Build + visueller Test).
2. **Mappe 4**: Naechster Schritt laut AUSFUEHRUNGSPLAN ist Phase C2 (Mappe 4 als Validierung der Revision).
3. **Assembly-Skript standardisieren**: L7 umsetzen als wiederverwendbares Tool.
