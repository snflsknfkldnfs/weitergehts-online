# Q-Gate A1-A18 — Mappe 3 v2 (7 Aufgaben)

**Datum:** 2026-04-03
**Pruefgegenstand:** aufgabe-3-1.json bis aufgabe-3-7.json (v2, inhaltsgesteuert)
**Progressionsplan:** PROGRESSIONSPLAN_v2.md
**Materialien:** mat-3-1 (DT), mat-3-2 (BQ), mat-3-3 (BQ), mat-3-4 (QT), mat-3-5 (TB)

---

## Stufe 1 — Prozedurale Pruefung (AGENT_RAETSEL-Regeln)

| Regel | Ergebnis | Beleg |
|---|---|---|
| Mind. 3 Typen | PASS | 4 Typen: LT(2), MC(2), ZU(2), FT(1) |
| AFB-Progression | PASS | I → I → I-II → II → II → II → III (monoton steigend) |
| Material-Alignment | PASS | Alle 7 Aufgaben referenzieren existierende Materialien |
| Encoding v3.3 | PASS | UTF-8 Umlaute, guillemets, Gedankenstriche — kein Fund |
| Loesung-Formate | PASS | LT: Array, MC: String, ZU: Object, FT: Array |
| Freitext letzte Position | PASS | aufgabe-3-7 = freitext-code |
| JSON-Validitaet | PASS | 7/7 valid |

**Stufe 1 Ergebnis: 7/7 PASS**

---

## Stufe 2 — Fachdidaktische Pruefung

### MUSS-Kriterien (A1-A7)

**A1 AFB-Kongruenz: PASS**
- Pos 1 (LT, AFB I): Fachbegriff-Recall aus DT → tatsaechlich Reproduktion. KONGRUENT.
- Pos 2 (MC, AFB I): Bildbeschreibung (Was zeigt das Foto?) → tatsaechlich Wiedergabe. KONGRUENT.
- Pos 3 (ZU, AFB I-II): Ursachen-Beschreibungen zuordnen → erfordert Kategorisierung, nicht nur Wiedergabe. KONGRUENT.
- Pos 4 (MC, AFB II): Widerspruch zwischen Foto und Quellen erklaeren → erfordert Vergleich + Transfer. KONGRUENT.
- Pos 5 (LT, AFB II): Kausalkette Burgfrieden → erfordert Zusammenhangsverstaendnis, nicht nur Begriffe. KONGRUENT.
- Pos 6 (ZU, AFB II): Perspektiven-Differenzierung (Begeisterung/Angst/Pflicht) → erfordert Analyse von Aussagen. KONGRUENT.
- Pos 7 (FT, AFB III): Beurteile gesellschaftlichen Druck damals vs. heute → Stellungnahme + Transfer. KONGRUENT.

**A2 Fragestaemme-Klarheit: PASS**
- Pos 1: "Ergaenze die fehlenden Fachbegriffe." — 1 Operator (ergaenze), 4 Woerter. OK.
- Pos 2: "Was zeigt das Foto vor dem Berliner Stadtschloss?" — 1 Frage, 8 Woerter. OK.
- Pos 3: "Ordne die Ursachen den Beschreibungen zu." — 1 Operator (ordne zu), 6 Woerter. OK.
- Pos 4: "Welche Aussage erklaert den Widerspruch zwischen Foto und Quellen?" — 1 Frage, 9 Woerter. OK.
- Pos 5: "Ergaenze die fehlenden Begriffe zum Burgfrieden." — 1 Operator, 6 Woerter. OK.
- Pos 6: "Ordne die Aussagen den Perspektiven zu." — 1 Operator, 6 Woerter. OK.
- Pos 7: "Beurteile, ob gesellschaftlicher Druck heute noch Menschen zum Schweigen bringt." — 1 Operator (beurteile), 10 Woerter. OK.
- Alle ≤12 Woerter (Fragestamm-Kurzregel). Keine Doppeloperatoren, keine Negationen.

**A3 Material-Aufgabe-Kongruenz: PASS**
- Pos 1 → mat-3-1: Fachbegriffe (Kriegsbegeisterung, Augusterlebnis, Patriotismus, Propaganda) im DT eingefuehrt. KONGRUENT.
- Pos 2 → mat-3-2: Foto zeigt jubelnde Menge vor Stadtschloss. Bildbeschreibung direkt ableitbar. KONGRUENT.
- Pos 3 → mat-3-1: Vier Ursachen (Patriotismus, Abenteuerlust, Druck, Propaganda) im DT erklaert. KONGRUENT.
- Pos 4 → mat-3-3 + mat-3-4: Foto (Truppentransport mit Slogans) vs. Quellen (weinende Muetter, Angst). Widerspruch belegbar. KONGRUENT.
- Pos 5 → mat-3-4: SPD, Kriegskredite, Hugo Haase, Burgfrieden in Haase-Quelle + Einleitungstext. KONGRUENT.
- Pos 6 → mat-3-4 + mat-3-5: Zitate korrekt den Quellen entnommen (Zweig, Freiwilliger, Bremen, Bauersfrau, Haase). KONGRUENT.
- Pos 7 → mat-3-5: Bauersfrau-Zitat als historischer Beleg. Transfer auf Gegenwart durch Scaffolding gestuetzt. KONGRUENT.

**A4 Typ-spezifische Konstruktionsqualitaet: PASS**
- A4-MC (Pos 2): 4 Distraktoren, 3 falsche — Arbeiterdemonstration (plausible Fehlvorstellung: Protest statt Jubel), Soldatenmarsch (verwechselbar mit Truppentransport-Foto), Friedensfeier (zeitliche Verwechslung). Keine absurden Optionen.
- A4-MC (Pos 4): 4 Optionen differenzieren zwischen "eine Seite" (korrekt), "gefaelscht" (Fehlvorstellung), "Quellen weniger zuverlaessig" (Quellenkritik-Fehler), "alle gleichermassen begeistert" (Mythos). Alle plausibel als Schuelerfehlvorstellungen.
- A4-ZU (Pos 3): 4 Beschreibungen → 4 disjunkte Kategorien (Patriotismus, Abenteuerlust, Druck, Propaganda). Trennscharf.
- A4-ZU (Pos 6): 5 Aussagen → 3 Kategorien (Begeisterung, Angst, Pflicht). Zitate eindeutig zuordenbar. Trennscharf.
- A4-LT (Pos 1): 4 Luecken, je 1 korrekte Antwort. Keine gleichwertigen Synonyme (Kriegsbegeisterung ≠ Augusterlebnis in Luecke 1 vs. 2). EINDEUTIG.
- A4-LT (Pos 5): 4 Luecken (SPD, Kriegskredite, Hugo Haase, Burgfrieden). Keine Synonyme moeglich. EINDEUTIG.

**A5 Schwierigkeits-Progression: PASS**
- Sequenz: I → I → I-II → II → II → II → III
- Monoton steigend (kein Rueckfall). Erste = AFB I, letzte = AFB III.
- Aufgabenzahl 7 begruendet durch Formel: min(8, 5+1+1) = 7. Inhaltlich motiviert.

**A6 Tipp-Progression: PASS**
Stichproben-Pruefung (Pos 2, 5, 7):
- Pos 2: S1 = "Schau dir das Foto genau an" (Richtung, keine Loesung). S2 = "Zwei Optionen zeigen Ereignisse, die das Foto nicht zeigt" (Einschraenkung). S3 = vollstaendige Erklaerung mit didaktischem Kontext. KORREKT.
- Pos 5: S1 = "Lies die dritte Quelle" (Richtung). S2 = "Die erste Luecke ist eine Partei" (Einschraenkung). S3 = vollstaendige Loesung + Erklaerung. KORREKT.
- Pos 7: S1 = "Lies den Tagebucheintrag nochmal" (Richtung). S2 = "Denke an drei Bereiche: Schule, soziale Medien, Familie" (Geruest). S3 = Musterantwort + Begriffe. KORREKT.
- Keine Stufe 1 verrät die Loesung.

**A7 Operator-Praezision: PASS**
- Verwendete Operatoren: ergaenze (AFB I), ordne zu (AFB I-II), erklaere (AFB II), beurteile (AFB III).
- Alle aus der AFB-Operatoren-Tabelle. Kein "Was weisst du ueber...?" oder aehnliche Anti-Patterns.

**MUSS-Ergebnis: 7/7 PASS — keine Ueberarbeitung noetig.**

---

### SOLL-Kriterien (A8-A12, A16-A18)

**A8 Kognitive Aktivierung: PASS**
- Pos 4 = Schlussfolgerungsfrage (Widerspruch erklaeren)
- Pos 7 = Problemloesefrage (Transfer Vergangenheit → Gegenwart)
- Mindestens 2 denkanregende Aufgaben vorhanden.

**A9 Tafelbild-Bezug: PASS**
- TB-Knoten abgedeckt: k3-1 (Pos 1, 2), k3-2 (Pos 3), k3-3 (Pos 3), k3-4 (Pos 3, 7), k3-5 (Pos 4, 6), k3-6 (Pos 5, 6).
- Alle 6 TB-Knoten des Hefteintrags in mindestens 1 Aufgabe adressiert.
- Pos 7 (letzte) reflektiert Gesamterkenntnis (gesellschaftlicher Druck als durchgaengiges Thema).

**A10 Inhaltsgesteuerte Typauswahl: PASS**
- 4 verschiedene Typen: LT, MC, ZU, FT. ≥3 Typen erfuellt.
- Maximale Haeufigkeit: 2x (LT, MC, ZU). <3x Grenze eingehalten.
- FT: 1x, letzte Position. Erfuellt.
- Typ-Wiederholungen im Progressionsplan begruendet (MC: AFB I vs. AFB II; LT: Fachbegriffe vs. Kausalkette; ZU: Fakten vs. Perspektiven). Alle Begruendungen stichhaltig.

**A11 Freitext-Qualitaet: PASS**
- aufgabe-3-7: Problemorientierte Leitfrage (beurteile gesellschaftlichen Druck).
- 3 Teilfragen in _meta.teilfragen (oeffentlich vs. privat; Rolle des Drucks; Alltagsbeispiele).
- Erwartete Begriffe: gesellschaftlicher Druck, Angst, Meinung, Schweigen.
- Validierung_schwelle: 3 (mind. 3 von 4 Begriffen).
- AFB III (Stellungnahme/Beurteilung). Alle Unterkriterien erfuellt.

**A12 Sachbezogen-vor-Wertbezogen: PASS**
- S/C-Zonen (Pos 1-4): sachbezogen — Fachbegriffe, Bilderkennung, Zuordnung, Quellenvergleich.
- P-Zone (Pos 5): analytisch — Burgfrieden als Zusammenhang.
- L-Zone (Pos 6-7): synthese/wertbezogen — Perspektiven-Differenzierung + Transfer auf Gegenwart.
- Sequenz korrekt: sachbezogen VOR wertbezogen.

**A16 Fragebogen-Kohaerenz: PASS**
- Aufgabensequenz spiegelt SCPL-Erarbeitungsweg:
  S (Pos 1) → C1 (Pos 2) → C2 (Pos 3) → C3 (Pos 4) → P (Pos 5) → L (Pos 6) → L (Pos 7)
- Keine Zone uebersprungen. Reihenfolge korrespondiert mit SCPL-Zonen.
- L-Zone hat 2 Aufgaben (Synthese + Transfer) — begruendet durch AFB-Steigerung II → III.

**A17 SCPL-Zonen-Abdeckung: PASS**
- S-Zone: Pos 1 (1 Aufgabe)
- C1-Zone: Pos 2 (1 Aufgabe)
- C2-Zone: Pos 3 (1 Aufgabe)
- C3-Zone: Pos 4 (1 Aufgabe)
- P-Zone: Pos 5 (1 Aufgabe)
- L-Zone: Pos 6 + 7 (2 Aufgaben)
- Alle 6 Zonen abgedeckt. Keine Zone ungetestet.

**A18 Material-Aktivierung: PASS**
- mat-3-1 (DT): Primaerquelle in Pos 1, 3. PASS.
- mat-3-2 (BQ): Primaerquelle in Pos 2. PASS. (v1: FAIL — nur in Tipps)
- mat-3-3 (BQ): Primaerquelle in Pos 4. PASS. (v1: FAIL — nur in Tipps)
- mat-3-4 (QT): Primaerquelle in Pos 4, 5, 6. PASS.
- mat-3-5 (TB): Primaerquelle in Pos 6, 7. PASS.
- Alle 5 Materialien als Primaerquelle aktiviert. Kein Material nur in Tipps.

**SOLL-Ergebnis: 8/8 PASS — kein Optimierungshinweis.**

---

### KANN-Kriterien (A13-A15)

**A13 Gegenwartsbezug: PASS** — Pos 7 (Transfer: gesellschaftlicher Druck damals vs. heute, Beispiele Schule/Social Media/Familie).

**A14 Fehler-Antizipation: PASS** — MC-Distraktoren in Pos 2 und 4 antizipieren typische Schuelerfehlvorstellungen (Kriegsende 1914, Foto als Faelschung, Gleichsetzung aller Quellen).

**A15 Implizite Differenzierung: PASS** — 3-Stufen-Tipp-System bietet Scaffolding ohne Niveaukennzeichnung.

**KANN-Ergebnis: 3/3 PASS.**

---

## Gesamtergebnis

| Kategorie | Geprueft | PASS | FAIL |
|---|---|---|---|
| Prozedural (Stufe 1) | 7 | 7 | 0 |
| MUSS (A1-A7) | 7 | 7 | 0 |
| SOLL (A8-A12, A16-A18) | 8 | 8 | 0 |
| KANN (A13-A15) | 3 | 3 | 0 |
| **Gesamt** | **25** | **25** | **0** |

**Q-Gate-Ergebnis: BESTANDEN — 25/25 PASS. Keine Ueberarbeitung, keine Optimierungshinweise.**

Die v2-Pipeline mit inhaltsgesteuerter Typauswahl, SCPL-Zonen-Mapping und variabler Aufgabenzahl produziert Aufgaben, die alle 18 Qualitaetskriterien erfuellen. Besonders hervorzuheben: A18 (Material-Aktivierung), das zentrale Defizit der v1-Aufgaben, ist vollstaendig behoben.
