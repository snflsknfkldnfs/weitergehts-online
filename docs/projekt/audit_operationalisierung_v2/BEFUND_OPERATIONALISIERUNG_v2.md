# Konsolidierter Befund: Operationalisierungs-Audit S1-S15 (v2)

**Datum:** 2026-04-07
**Methode:** 4 parallele Review-Agenten (RA1-RA4) mit isolierten Berichten, dann PM-Konsolidierung
**Testfall:** MATERIAL_GERUEST Mappe 4 (Schlieffen-Plan, 5 Materialien, 4 Typen)
**Framework:** 6-Dimensionen-Pruefung (D1-D6) pro Kriterium
**Einzelberichte:**
- `BERICHT_RA1_PHASENLOGIK.md` — S1, S4, S5, S14 (1.675 Zeilen)
- `BERICHT_RA2_VORWISSEN_FACHBEGRIFFE.md` — S2, S9, S10 (664 Zeilen)
- `BERICHT_RA3_MATERIALTYP_KLASSIFIKATION.md` — S7, S8, S11, S12, S13 (1.982 Zeilen)
- `BERICHT_RA4_STRUKTURELLE_VOLLSTAENDIGKEIT.md` — S3, S6, S15 (1.207 Zeilen)

---

## 1. Gesamt-Matrix

| S | Prio | RA | v1-Urteil | v2-Urteil | Abweichung | Kern-Problem |
|---|---|---|---|---|---|---|
| S1 | MUSS | RA1 | FRAGIL | FRAGIL | — | `erarbeitungscharakter` fehlt; Grenzfall-Toleranzen fehlen |
| S2 | MUSS | RA2 | DEFEKT | DEFEKT | — | `fachbegriffe_eingefuehrt[]`/`_referenziert[]` fehlen |
| S3 | MUSS | RA4 | ROBUST | **ROBUST** | — | Produktionsreif. Kein Handlungsbedarf. |
| S4 | MUSS | RA1 | FRAGIL | **ROBUST** | ↑ | Funktions-Monotonie ist deterministisch; D4-Schwaeche (S5-Koordination) minimal |
| S5 | MUSS | RA1 | FRAGIL | FRAGIL | — | `bildfunktion` + `material_enthaelt_urteilsauftrag` fehlen |
| S6 | MUSS | RA4 | FRAGIL | FRAGIL | — | Prozess-Metrik, nicht fachdidaktisch; Q-Gate-Fehlverortung |
| S7 | SOLL | RA3 | FRAGIL | FRAGIL | — | Abstraktionsgrad-Skala zu grob ohne `material_charakter` |
| S8 | SOLL | RA3 | FRAGIL | FRAGIL | — | `bildfunktion` + `analyseauftrag` fehlen |
| S9 | SOLL | RA2 | DEFEKT | FRAGIL | ↑ | Ueberleitungen als Freitext; deterministisch loesbar via strukturierte Objekte |
| S10 | SOLL | RA2 | FRAGIL | **DEFEKT** | ↓ | Rahmen-Sequenz-Ambiguitaet; `aktivierungscharakter` fehlt |
| S11 | KANN | RA3 | ROBUST | **ROBUST** | — | Kein Handlungsbedarf. |
| S12 | KANN | RA3 | DEFEKT | DEFEKT | — | Nicht operationalisierbar; in S7 integrierbar |
| S13 | KANN | RA3 | FRAGIL | FRAGIL | — | `personalisiert`-Feld fehlt |
| S14 | MUSS | RA1 | FRAGIL | FRAGIL | — | `primary_tb_knoten` nicht operationalisiert; SCPL-Zuordnung nicht im Schema |
| S15 | MUSS | RA4 | FRAGIL | FRAGIL | — | SKRIPT-Index unterspecifiziert; Schwelle nicht laengen-normiert |

**Zusammenfassung:** 3 ROBUST (S3, S4, S11) — 8 FRAGIL (S1, S5, S6, S7, S8, S13, S14, S15) — 4 DEFEKT (S2, S9→FRAGIL mit Patch, S10, S12)

**Abweichungen v1 → v2:**
- S4: FRAGIL → ROBUST (RA1 bestaetigt: Funktions-Monotonie ist deterministisch, D4-Schwaeche marginal)
- S9: DEFEKT → FRAGIL (RA2 zeigt: mit strukturierten Uebergangsobjekten deterministisch loesbar)
- S10: FRAGIL → DEFEKT (RA2 identifiziert: Rahmen-Sequenz-Ambiguitaet macht Prueflogik nicht ausfuehrbar)

---

## 2. Zentralbefund

### 2.1 Strukturelles Defizit: MATERIAL_GERUEST ist ein Index, kein Konzept-Inventar

Alle 4 Review-Agenten konvergieren auf denselben Kernbefund:

> Das MATERIAL_GERUEST dokumentiert **Positionen, Typen und TB-Knoten-Zuordnungen** — aber nicht die **semantischen Eigenschaften**, die fuer 12 von 15 Prueflogiken benoetigt werden.

**Fehlende Felder (konsolidiert ueber RA1-RA4):**

| # | Feld | Typ | Loest | Quelle |
|---|---|---|---|---|
| F1 | `erarbeitungscharakter` | Enum: `narrativ-vergegenwaertigend` / `analytisch-sachbezogen` / `analytisch-wertbezogen` | S1-D2, S5-D1/D2, S7-D2 | RA1, RA3 |
| F2 | `didaktische_funktion` | Enum (statt Freitext): `einstieg` / `erarbeitung` / `vertiefung` / `sicherung` / `transfer` | S4-D2 (praeventiv) | v1-P4 |
| F3 | `bildfunktion` | Enum: `illustrativ` / `heuristisch` (nur bei bildquelle/karte/statistik) | S5-D1, S7-D2, S8-D3 | RA1, RA3 |
| F4 | `analyseauftrag` | Boolean (nur bei quellentext/bildquelle) | S8-D2 | RA3 |
| F5 | `personalisiert` | Boolean | S13-D2 | RA3 |
| F6 | `primary_tb_knoten` | Einzelne TB-Knoten-ID (bei Multi-Knoten-Materialien) | S14-D2 | RA1 |
| F7 | `fachbegriffe_eingefuehrt[]` | Array of Strings | S2-D1/D2, S10-D2 | RA2 |
| F8 | `fachbegriffe_referenziert[]` | Array of Strings | S2-D1/D2 | RA2 |
| F9 | `aktivierungscharakter` | Enum: `frage` / `bild` / `provokation` / `hypothese` / `keine` | S10-D2 | RA2 |

### 2.2 Sekundaerbefund: Prueflogik-Revisionen

| # | Revision | Betrifft | Quelle |
|---|---|---|---|
| R1 | Ueberleitungen als strukturierte JSON-Objekte statt Freitext | S9 | RA2 |
| R2 | SCPL-Phase als Pflichtfeld pro TB-Knoten im TAFELBILD | S14 | RA1, v1-P6 |
| R3 | S15 SKRIPT-Index: "erste Absatz-Position des Materials" als Konvention | S15 | RA4 |
| R4 | S15 Schwelle: ⌊N/3⌋ statt fix 2 | S15 | RA4 |
| R5 | S6 aus Q-Gate auslagern → Pre-Check Phase 1.9.5 | S6 | RA4 |
| R6 | S12 in S7 integrieren oder als reine Dokumentation behalten | S12 | RA3 |
| R7 | S10 Rahmen-Sequenz-Interaktion explizit definieren | S10 | RA2 |
| R8 | Grenzfall-Toleranzen fuer S1, S5, S14 (< 3 Materialien, Hybrid, Einstieg via Rahmen) | S1, S5, S14 | RA1 |

### 2.3 Tertiaerbefund: Redundanz-Analyse

RA1 hat die Ueberlappung im Phasenlogik-Cluster (S1, S4, S5, S14) rigoros geprueft:

| Vergleich | Redundant? | Begruendung |
|---|---|---|
| S1 vs. S4 | Nein | S4 prueft Funktions-Monotonie (Enum-basiert), S1 prueft Artikulationsschema (Perspektiv-basiert). Bei korrektem S4 kann S1 trotzdem FAIL sein (wenn erarbeitung-Phasen falsch auf V/B gemappt) |
| S5 vs. S1 | Nein | S5 ist "Semantic Layer" ueber S1 — prueft, ob materialer Charakter der Phasenzuordnung entspricht |
| S14 vs. S4 | Nein | S4 PASS + S14 FAIL moeglich (parallele erarbeitung mit SCPL-Verletzung) |
| S1 vs. S14 | Nein | Orthogonal: Artikulationsschema vs. SCPL-Sinnstruktur |
| S7 vs. S12 | Teilweise | Beide messen konkret→abstrakt. S12 (KANN) als Dokumentation in S7 (SOLL) integrierbar |

**Empfehlung RA1:** Alle 4 Phasenlogik-Kriterien behalten, aber operationalisierungstechnisch ueberarbeiten.

---

## 3. Fachbegriff-Taxonomie (RA2)

RA2 hat am Testfall Mappe 4 eine pragmatische 5-Stufen-Taxonomie entwickelt:

| Kategorie | Definition | Beispiel Mappe 4 | S2-Behandlung |
|---|---|---|---|
| **Struktur-FB** | Ordnet TB-Aufbau | Zweifrontenkrieg, Schlieffen-Plan | STRENG: Muss vor Referenz eingefuehrt sein |
| **Prozess-FB** | Beschreibt Kausalitaeten | Zeitluecke, Flankenangriff | NORMAL: Vor-Position pruefen |
| **Konzept-FB** | Kategoriales Gegensatzpaar | Bewegungskrieg ↔ Stellungskrieg | STRENG: Explizit einfuehren |
| **Kontext-FB** | Curriculum-relevant, teilweise Vorwissen | Erschoepfung, Kriegsbegeisterung | MILD: Kontextuelle Annahme erlaubt |
| **Nicht-FB** | Reine Lokalisierung | Belgien (Ort), 65 km | KEINE: Ignorieren |

**Befuellungs-Workflow:** AGENT_MATERIAL befuellt `fachbegriffe_eingefuehrt[]` und `fachbegriffe_referenziert[]` in Phase 1 (Design-Modus), Aufgabe 1.9 (neu: Schritt 1.9.2). Input: SKRIPT-Chunk + Taxonomie-Definition. SUB_MATERIAL_* validieren in Phase 2.1 gegen die Listen.

---

## 4. Pipeline-Timing (RA4)

| Kriterium | Zirkulaer? | Rolle im Workflow |
|---|---|---|
| S3 | Nein | Validiert TB-Abdeckung gegen fixiertes TAFELBILD (Phase 0.4) |
| S6 | Nein, aber fehlverortet | Validiert Prozess-Korrektheit (sequenz_kontext-Generierung), nicht Didaktik |
| S15 | Nein, aber hierarchisch | S14 > S15 bei Konflikt (SCPL trumpft SKRIPT-Reihenfolge) |

**Keine echte Zirkularitaet nachgewiesen.** S6 ist allerdings eine Prozess-Metrik im fachdidaktischen Q-Gate — Fehlverortung, nicht Zirkularitaet.

---

## 5. Konsolidierte Patch-Liste (priorisiert)

### Schritt 1: Schema-Erweiterung MATERIAL_GERUEST (blockierend)

**Aufwand:** GERING (Feld-Definitionen, kein Code)
**Loest:** 80% der FRAGIL-Bewertungen

| Patch | Feld | Werte | Loest |
|---|---|---|---|
| P1 | `erarbeitungscharakter` | narrativ-vergegenwaertigend / analytisch-sachbezogen / analytisch-wertbezogen | S1-D2, S5-D1/D2, S7-D2 |
| P2 | `didaktische_funktion` als Enum | einstieg / erarbeitung / vertiefung / sicherung / transfer | S4-D2 (praeventiv) |
| P3 | `bildfunktion` | illustrativ / heuristisch | S5-D1, S7-D2, S8-D3 |
| P4 | `analyseauftrag` | Boolean | S8-D2 |
| P5 | `personalisiert` | Boolean | S13-D2 |
| P6 | `primary_tb_knoten` | Einzelne TB-Knoten-ID | S14-D2 |

**Verantwortlichkeit:** AGENT_MATERIAL befuellt alle Felder in Aufgabe 1.9 (Design-Modus).

**Template nach Schritt 1:**

```markdown
| # | mat-ID | Typ | didaktische_funktion | erarbeitungscharakter | bildfunktion | analyseauftrag | personalisiert | primary_tb_knoten | TB-Knoten | Kerninhalt |
```

### Schritt 2: Fachbegriff-Felder + Uebergangs-Strukturierung (hoch)

**Aufwand:** MITTEL (erfordert Taxonomie-Konvention + Prompt-Ueberarbeitung AGENT_MATERIAL)

| Patch | Aenderung | Loest |
|---|---|---|
| P7 | `fachbegriffe_eingefuehrt[]` + `fachbegriffe_referenziert[]` im MATERIAL_GERUEST | S2-D1/D2, S10-D2 |
| P8 | Uebergangsobjekte als JSON: `{von_mat, zu_mat, rueckbezug_inhalt_ref, vorausblick_frage, kausalitaets_typ}` | S9-D2 |

**P7 haengt an Taxonomie-Entscheidung:** Die 5-Stufen-Taxonomie (RA2) muss als Konvention in AGENT_MATERIAL dokumentiert werden.

### Schritt 3: Prueflogik-Revisionen (mittel)

| Patch | Aenderung | Loest |
|---|---|---|
| P9 | S15 SKRIPT-Index = erste Absatz-Position; Schwelle ⌊N/3⌋ | S15-D2/D3 |
| P10 | S9 Prueflogik: Feldpruefung statt NLP (rueckbezug_inhalt_ref != null ∧ vorausblick_frage != null ∧ woerter ≥ 8) | S9-D2 |
| P11 | S10: Rahmen-Sequenz-Interaktion definieren; `aktivierungscharakter`-Enum | S10-D2 |
| P12 | SCPL-Phase als Pflichtfeld pro TB-Knoten im TAFELBILD (AGENT_HEFTEINTRAG annotiert) | S14-D2 |

### Schritt 4: Bereinigung (optional)

| Patch | Aenderung | Loest |
|---|---|---|
| P13 | S6 von MUSS-Kriterium auf Pre-Check (Phase 1.9.5) auslagern | S6-D6 |
| P14 | S12 in S7 integrieren (Sprachregister als Teilaspekt Abstraktionsprogression) oder als KANN-Dokumentation behalten | S12-D2 |
| P15 | Grenzfall-Toleranzen: S1 (< 3 Mat: nur V-vor-B), S5 (Hybrid: primaerer Charakter zaehlt), S14 (Einstieg phasenneutral) | S1-D3, S5-D3, S14-D3 |

---

## 6. Erwartete Ergebnisse nach Patch-Umsetzung

| S | Aktuell | Nach Schritt 1 | Nach Schritt 1+2 | Nach Schritt 1-3 |
|---|---|---|---|---|
| S1 | FRAGIL | ROBUST (P1) | ROBUST | ROBUST |
| S2 | DEFEKT | DEFEKT | **ROBUST** (P7) | ROBUST |
| S3 | ROBUST | ROBUST | ROBUST | ROBUST |
| S4 | ROBUST | ROBUST | ROBUST | ROBUST |
| S5 | FRAGIL | ROBUST (P1, P3) | ROBUST | ROBUST |
| S6 | FRAGIL | FRAGIL | FRAGIL | **Pre-Check** (P13) |
| S7 | FRAGIL | ROBUST (P1, P3) | ROBUST | ROBUST |
| S8 | FRAGIL | ROBUST (P3, P4) | ROBUST | ROBUST |
| S9 | FRAGIL | FRAGIL | **ROBUST** (P8) | ROBUST (P10) |
| S10 | DEFEKT | DEFEKT | FRAGIL (P7 hilft) | **ROBUST** (P11) |
| S11 | ROBUST | ROBUST | ROBUST | ROBUST |
| S12 | DEFEKT | FRAGIL (P1 hilft) | FRAGIL | **Integriert** (P14) |
| S13 | FRAGIL | ROBUST (P5) | ROBUST | ROBUST |
| S14 | FRAGIL | FRAGIL (P6 hilft) | FRAGIL | **ROBUST** (P12) |
| S15 | FRAGIL | FRAGIL | FRAGIL | **ROBUST** (P9) |

**Nach Schritt 1:** 8 ROBUST (von 3), 4 FRAGIL, 3 DEFEKT
**Nach Schritt 1+2:** 11 ROBUST, 2 FRAGIL, 1 DEFEKT, 1 Pre-Check
**Nach Schritt 1-3:** 13 ROBUST, 0 FRAGIL, 0 DEFEKT, 1 Pre-Check, 1 Integriert

---

## 7. Schutzregeln-Pruefung

Alle vorgeschlagenen Patches wurden gegen R3-S1 bis R3-S4 geprueft (RA1, RA3, RA4 bestaetigen unabhaengig):

| Schutzregel | Gefaehrdung | Status |
|---|---|---|
| R3-S1 (Niedrigschwelliger Einstieg) | KEINE — Patches betreffen Schema-Felder, nicht Materialinhalt | SAFE |
| R3-S2 (Identifikationsfiguren) | KEINE — P5 (`personalisiert`) unterstuetzt sogar Personalisierung | SAFE |
| R3-S3 (Visuelle Klarheit) | KEINE — P3 (`bildfunktion`) klassifiziert, aendert nicht | SAFE |
| R3-S4 (Emotionale Ansprache) | KEINE — Keine inhaltlichen Aenderungen | SAFE |

---

## 8. Implementierungsrisiken und Mitigationen (IR-Annex)

Post-Audit-Evaluation: 7 Implementierungsrisiken identifiziert, Entscheidungen dokumentiert.

### IR1: Enum-Inkonsistenz `material_charakter` (RA1 vs. RA3)

**Problem:** RA1 schlaegt 3er-Enum `erarbeitungscharakter` vor, RA3 schlaegt 2er-Enum `material_charakter` vor.
**Entscheidung:** 3er-Enum. Feldname: `material_charakter`.
**Werte:** `vergegenwaertigung` / `besinnung_sachbezogen` / `besinnung_wertbezogen`
**Begruendung:** S5 erfordert die Unterscheidung sachbezogen/wertbezogen fuer die Prueflogik `min(V) < min(B_sach) < min(B_wert)`. Eine 2er-Variante wuerde S5-D2 nicht vollstaendig loesen.
**Anwendungskontext-Check:** Bei geographischer Perspektive (Situationsanalyse vs. Situationsbeurteilung) und sozialpolitischer Perspektive (Problemloesung vs. Wertung) bildet die 3er-Variante ebenfalls die relevante Unterscheidung ab.

### IR2: Feld-Proliferation und Token-Budget

**Problem:** Sequenzplan-Tabelle waechst von 7 auf 13 Spalten. Bei 4 Mappen × 5-8 Materialien × 13 Spalten steigt der Token-Verbrauch im AGENT_MATERIAL-Kontext.
**Mitigation:** (a) Felder `bildfunktion` und `analyseauftrag` sind konditional (nur bei bestimmten Typen → NULL bei anderen, spart Spaltenbreite). (b) Token-Budget-Test: Mappe-4-Retrofit mit vollstaendigem neuem Template, Token-Zaehlung vor/nach. (c) Falls kritisch: `personalisiert` und `analyseauftrag` koennen als Flags in Klammern hinter Typ stehen statt als eigene Spalten.
**Grenzwert:** Wenn Sequenzplan-Tabelle > 40% des AGENT_MATERIAL-Kontextbudgets (Design-Modus) einnimmt, Schema komprimieren.

### IR3: Rueckwaerts-Kompatibilitaet (Mappe 3+4)

**Problem:** Bestehende MATERIAL_GERUESTs haben die neuen Felder nicht.
**Entscheidung:** Mappe 4 als Referenz-Retrofit. Mappe 3 optional.
**Workflow:** PM fuellt neue Felder fuer Mappe-4-Sequenzplan nachtraeglich aus (anhand bestehender Materialbeschreibungen + Q-Gate-Ergebnis). Dient als Validierung: Sind die Felder eindeutig befuellbar? Wo entsteht Ambiguitaet?
**Erwartetes Ergebnis:** Retrofit deckt potenzielle Zuweisungsprobleme auf, bevor AGENT_MATERIAL-Prompt geaendert wird.

### IR4: Inter-Agenten-Konsistenz (AGENT_MATERIAL vs. SUB_MATERIAL_*)

**Problem:** AGENT_MATERIAL klassifiziert in Phase 1, SUB_MATERIAL_* produziert in Phase 2.1. Keine Validierung, ob produzierter Text zum klassifizierten Charakter passt.
**Mitigation:** SQ-Kriterien (SQ-1 bis SQ-4) um Charakter-Konformitaetspruefung erweitern. Neues SQ-5: "Produziertes Material ist konsistent mit `material_charakter` aus MATERIAL_GERUEST." Aufwand: 1 Satz pro SUB_MATERIAL_*-Prompt.
**Timing:** Nach Schritt 1, parallel zu Schritt 2.

### IR5: Fachbegriff-Taxonomie als potentieller Bottleneck

**Problem:** 5-Stufen-Taxonomie (Struktur/Prozess/Konzept/Kontext/Nicht-FB) wurde nur an Mappe 4 entwickelt. Neue Mappen produzieren neue Grenzfaelle.
**Mitigation:** (a) Taxonomie als Heuristik definieren, nicht als striktes Regelwerk. AGENT_MATERIAL dokumentiert Grenzfall-Entscheidungen in einem `taxonomie_notizen`-Feld (Freitext, 1 Satz). (b) S2-Prueflogik prueft nur Struktur-FB und Konzept-FB streng; Prozess-FB normal; Kontext-FB mild. Dadurch betreffen Grenzfaelle primaer die MILD-Kategorie, wo sie per Definition toleriert werden. (c) Taxonomie-Beispielbank: Pro Game werden 5-10 Grenzfall-Entscheidungen dokumentiert. Waechst organisch.
**Anwendungskontext-Check:** Bei anderen Themen (z.B. Industrialisierung, Imperialismus) werden Struktur-FB anders verteilt sein. Die Kategorien selbst sind themen-agnostisch.

### IR6: P12-Abhaengigkeit (AGENT_HEFTEINTRAG → AGENT_MATERIAL)

**Problem:** P12 (SCPL-Phase pro TB-Knoten) muss in AGENT_HEFTEINTRAG (Phase 0.4) umgesetzt werden, bevor AGENT_MATERIAL (Phase 1) die Daten nutzen kann.
**Entscheidung:** P12 in Schritt 1 vorziehen (war Schritt 3). AGENT_HEFTEINTRAG-Prompt erhaelt einen Zusatz: "Pro Knoten: `scpl_phase: S|C|P|L` annotieren."
**Retrofit:** Fuer bestehende Mappen 3+4 sind die SCPL-Zuordnungen aus dem TAFELBILD-JSON trivial ableitbar (Knoten-Inhalt steht bereits in scpl.situation/complication/problem/loesung). PM fuellt bei Mappe-4-Retrofit mit.

### IR7: Testabdeckung (nur 1 Testfall)

**Problem:** Alle RA-Agenten haben nur an Mappe 4 getestet (historische Perspektive, 5 Materialien, kein quellentext, kein Rahmen-Einstieg-Konflikt).
**Mitigation:** Mappe-4-Retrofit ist Minimal-Test. Volle Testabdeckung erfordert mindestens:
- 1 Mappe mit quellentext + bildquelle (heuristisch) → testet S8 + bildfunktion
- 1 Mappe mit Rahmen-Einstieg → testet S10-Ambiguitaet
- 1 Mappe mit < 3 Materialien → testet Grenzfall-Toleranzen (S1, S5, S15)
- Optional: 1 nicht-historische Perspektive → testet Artikulationsschema-Mapping
**Realistisch:** Mappen 1-3 decken teilweise ab. Nach Retrofit Mappe 4: Mappe 1 oder 2 als zweiten Testfall pruefen.

---

## 9. Naechster Schritt

Die 15 Patches (P1-P15) sind priorisiert, Implementierungsrisiken identifiziert und mitigiert. Umsetzungsplan:

**Schritt 1 (blockierend, revidiert):**
- P1-P6 + P12: Schema-Felder in GUETEKRITERIEN_SEQUENZIERUNG.md Sektion 4+6 definieren
- AGENT_HEFTEINTRAG-Prompt: `scpl_phase` pro TB-Knoten als Pflichtfeld ergaenzen
- Mappe-4-Retrofit: Sequenzplan mit allen neuen Feldern nachtraeglich befuellen
- Token-Budget pruefen

**Schritt 2 (hoch):**
- P7-P8: Fachbegriff-Felder + Uebergangs-Strukturierung
- Taxonomie-Konvention dokumentieren (5-Stufen + Beispielbank)
- AGENT_MATERIAL-Prompt ueberarbeiten (Aufgabe 1.9 erweitern)
- SQ-5 (Charakter-Konformitaet) in SUB_MATERIAL_*-Prompts ergaenzen

**Schritt 3 (mittel):**
- P9-P11: Prueflogik-Revisionen (S15, S9, S10)
- Grenzfall-Toleranzen (P15) in S1, S5, S14

**Schritt 4 (bereinigung):**
- P13-P14: S6-Auslagerung, S12-Integration

**Validierung nach jedem Schritt:** Mappe-4-Sequenzplan gegen S1-S15 mit neuer Prueflogik laufen lassen. Erwartete ROBUST-Quote dokumentieren.
