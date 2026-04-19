# Pre-Pilot-Triage-Matrix v2 — PQI-integriert + Batch-4-Scope-Recommendation (F0e.3 + F0e.4)

**Version:** 2.1 (2026-04-19; F0e.4 Batch-4-Scope-Recommendation v2 integriert)
**Vorgaenger:** v2.0 (F0e.3 PQI-Integration) / v1.0 (F0.1 Triage-Matrix)
**Ergaenzt durch:** `F0e_BEFUND_DIDAKTIK.md` v1.0 (konsolidiert Alpha+Beta) + 6 verifizierte Stichproben
**Zweck:** Triage-Klassen (A/B/C) um PQI-Dimension erweitern, A-Klasse nach didaktischem Gewicht re-sortieren, 5 neue F-RA6-Findings + 1 neue PQI-1-Lesart F-RA4-01-Hallu integrieren. **v2.1:** Batch-4-Scope-Recommendation mit 3 Pfaden F0a/F0b/F0c, expliziter User-Decision-Prompt, Trade-off-Tabelle, Post-Pilot-Follow-up-Liste.
**Input fuer:** User-Entscheidung Batch-4-Scope → F0e.5 Commit

---

## 1. Methodik v2

### 1.1 Zwei-Achsen-Klassifikation

Matrix v1 klassifizierte **Pilot-Signal-Relevanz** (Trigger / Signal / Pre-Testbar → A/B/C).
Matrix v2 ergaenzt **Didaktisches Gewicht** aus F0e-Audit (PQI 1-3, D1-D6).

| Achse | Werte | Quelle |
|---|---|---|
| Triage-Klasse | A / B / C / Pipeline-B / Pipeline-C | Matrix v1 |
| PQI | 1 (Fundamental) / 2 (Ernsthaft) / 3 (Kosmetisch) | F0e_BEFUND_DIDAKTIK.md |
| Konvergenz | KONV (Alpha+Beta) / ALPHA / BETA / DIVERGENZ | F0e_BEFUND_DIDAKTIK.md |

### 1.2 Re-Sort-Logik A-Klasse

A-Klasse-Items werden nach Tuple `(PQI, Trigger-Prob, Aufwand_invers)` sortiert.
Die oberen 4-5 Items = **testrun-blockierend** (identisch zu F0e_BEFUND §5 A-Klasse A1-A4).
Die mittleren Items = **strukturell empfohlen** (A5-A9).
Die unteren Items = **pipeline-wichtig aber nicht PQI-1-Treiber**.

### 1.3 Integrations-Regeln

- **Neue F-RA6-Findings** (5 konsolidierte IDs) werden als eigene Zeile in §2.bis aufgenommen.
- **Finding-ID-Splits** (F-RA4-01 in Hallu-Lesart vs. Wartburgfest-Lesart) als zwei Zeilen gefuehrt.
- **Diskrepanz-Resolutionen** (F-RA1-05/06, F-RA4-10, F-RA5-09) uebernehmen Alpha-PQI-1-Bewertung wo Alpha strenger.
- **Out-of-Scope-Items** (Mappe-4-bezogen) bleiben OOS markiert, nicht in A-Scope.
- **Verify-Pending-Items** (F-RA4-02, F-RA2-09, F-RA6-beta-05) mit `[VP]`-Flag.

---

## 2. Neue F-RA6-Findings (konsolidiert)

| ID | Titel | Quelle | PQI | Konv. | Triage | Begruendung |
|---|---|---|---|---|---|---|
| **F-RA6-01** | Mappe-4-Genozid-Cliffhanger ohne Resolution | alpha-01 + beta-01 | **1** | KONV | **A (inhaltlich)** | CP-8 LP-QM strukturell verfehlt; AP-2-Naherung aktiv. Testrun-Signal-Verschmutzung: Ja (D1+D5+D6=1). Pre-Testbar: Ja (Inhalt-Edit). |
| **F-RA6-02** (= F-RA2-03) | aufgabe-3-3 Deploy-Luecke | alpha-02 + beta-04 | **1** | KONV | **A (inhaltlich)** | Bildkritik-Kompetenz gebrochen. Pre-Testbar: Ja (mechanische Kopie Source→Deploy). |
| **F-RA6-03** (= F-RA2-10 erweitert) | Register-Drift Mappe 3 Fachwortdichte | alpha-03 + beta-Pattern-P5 | 2 (DaZ-Subgruppe PQI-1) | KONV | A (Glossar) | Gekoppelt mit F-RA5-09 PQI-1. Pre-Testbar: Ja (mat-3-glossar erstellen). |
| **F-RA6-04** | Erfundene Kompetenz-IDs in lehrkraft.html | beta-02 | 2 | BETA | A (Doku) | `GPG7_LB2_K_04/05` existieren nicht in LehrplanPLUS. Verifiziert (grep in LP-QM = 0 Treffer). Pre-Testbar: Ja (IDs entfernen). |
| **F-RA6-05** | Ueberleitung mat-3-4→3-5 Bismarck/Leopold-Falschaussage | beta-03 | **1** | BETA (verifiziert) | **A (inhaltlich)** | D2=1 faktische Falschaussage im SuS-sichtbaren Text. Pre-Testbar: Ja (1 Satz umformulieren). |

---

## 3. Inventur-Update F-RA-bestehende (Nur PQI-1 + Diskrepanz-Resolutionen)

| Finding | Titel | v1-Triage | PQI | Konv. | Update |
|---|---|---|---|---|---|
| **F-RA1-05** | 4-fach Kompetenzstruktur nicht durchgaengig | (nicht in v1) | **1** (Alpha) | DIVERGENZ (Alpha: 1, Beta: 3) | NEU in A: LP-QM §7.2 QG-02 Pflicht, strukturell noetig vor Pilot. Resolution: Alpha uebernommen. |
| **F-RA1-06** | Coverage-Pruefpunkte nicht belegt (CP-8) | (nicht in v1) | **1** (Alpha) | DIVERGENZ | NEU in A: gekoppelt mit F-RA6-01. Perspektiv-Inventar-Matrix R0-FINAL+-05 ist die Massnahme. |
| **F-RA2-03** | aufgabe-3-3 fehlt | B, residual | **1** | KONV | Upgrade auf **A** (didaktisch PQI-1, in F-RA6-02 aufgegangen). |
| F-RA2-09 | A18/mat-3-6 Authentizitaet | COVERED (PI-DIDAKTIK-2) | 2 [VP] | KONV | Keine Aenderung Triage. Methodik-Verify bleibt offen. |
| **F-RA2-10** | Sprachniveau-Drift R7 | A, residual | 2 (allg.) / **1** (DaZ) | KONV | Bleibt A, gekoppelt mit F-RA6-03 + F-RA5-09. |
| **F-RA3-01** | Lueckentext-Pool-Reset-Bug | (via PI-ENGINE-2 COVERED) | **1** | KONV | Upgrade auf eigene A-CODE-Zeile (A-CODE-14, siehe §6.1). Engine-Patch, 30 Min. |
| F-RA3-03 | Hefteintrag-Dualstruktur | COVERED (PI-ENGINE-1) | 2 | KONV | Keine Aenderung. |
| **F-RA4-01-Hallu** | Hallu-Rate 33% Wikimedia (latent) | (nicht explizit in v1, via R0-FINAL+ Item 9 abgedeckt) | **1** | BETA | Bestaetigt via R0-FINAL+-09 = A-CODE-9 Pre-Ingest-Titel-Validierung. |
| F-RA4-01-Wartburgfest | Liberal/national Erklaertiefe | B | 2 | ALPHA | Keine Aenderung. |
| **F-RA4-02** | Kolonialterminologie-Endverifikation | COVERED (PI-DIDAKTIK-2) | **1** [VP] | ALPHA | Upgrade: **Verify-Pending-Scan in F0e.3 → F0e.4-Scope aufnehmen** (20 Min Scan). |
| F-RA4-03 | Marechal-Ersatz Perspektiv-Drift | B (PI-MV2-EXT4) | 2 | KONV | Keine Aenderung. |
| **F-RA4-04** | Karikaturen-Quellenkritik | B | **1** (Alpha) | ALPHA | Upgrade: in F-RA6-02-Massnahme mitadressiert (aufgabe-3-3 bringt Quellenkritik zurueck). |
| **F-RA4-10** | Hefteintrag M3 Opferperspektive nicht im SCPL | (nicht in v1) | **1** (Alpha) | ALPHA | NEU in A: Hefteintrag-Patch knoten k3-6 umschreiben (45 Min). |
| **F-RA5-09** | Nicht-muttersprachliche SuS Register-Dichte | P3→B | **1** (Alpha, DaZ-D6=1) | ALPHA | Upgrade von P3 auf **A** — gebuendelt mit F-RA6-03 Glossar. |
| F-RA5-10 | Re-Flag-Events | C (PI-PM-4) | 3 | — | Keine Aenderung. |

**Neue PQI-1-Total in A-Klasse nach Matrix v2:** 9 Items (gegen 0 explizite PQI-Markierung in Matrix v1).

---

## 4. Out-of-Scope-Items (unveraendert)

- F-RA4-10-Beta (Mappe-4-Retro-Patch) — Beta-Label-Kollision, content OOS
- PI-MV2-EXT2 Mappe-4-Retro-Patch — CLOSED durch P0-A5 + OOS
- R0-FINAL+-#7 Plan-vs-Wirklichkeit M4-Vergleich — OOS
- F-RA4-11 R0.5 Dual-Kanal (A, residual v1) — bleibt A, didaktisch PQI-3 (pipeline)

---

## 5. Verify-Pending-Items (fuer F0e.4 oder spaeter)

| ID | Action | Aufwand | Deadline |
|---|---|---|---|
| F-RA4-02 | Volltext-Scan Mat-3-1..3-6 auf "Eingeborene"/"Haeuptlinge"/Schutzgebiet-Kontextualisierung | 20 Min Scan + 30 Min ggf. Patch | VOR Pilot |
| F-RA2-09 | QM-Methodik-Entscheid: reicht fiktive afrikanische Stimme? Entscheidungslog-Eintrag | 30 Min | VOR Pilot (Policy-Klaerung R0-FINAL+-04) |
| F-RA6-beta-05 | Source-Inkonsistenz knoten k3-2 Imperialismus: Deploy-Rendering pruefen | 15 Min | Kann in F0e.4 erledigt werden |

---

## 6. Klasse-A-Konsolidierung v2 (PQI-sortiert)

### 6.1 Klasse A Code/Schema — Batch-4a v2

**Sortiert nach (PQI ↑ → Trigger-Prob ↑ → Aufwand ↓)**

| Rang | ID | Beschreibung | PQI | Aufwand | Abhaengigkeiten |
|---|---|---|---|---|---|
| **A1** | A-CONTENT-1 (F-RA6-02) | aufgabe-3-3 aus Source in data.json uebernehmen + source-deploy-parity.sh Re-Check | **1** | 15 Min | — |
| **A2** | A-CONTENT-2 (F-RA6-05) | ueberleitungen.json mat-3-4→3-5 "Bismarck" → "Leopold II./europ. Herrscher" | **1** | 10 Min | — |
| **A3** | A-CONTENT-3 (F-RA6-01) | Cliffhanger-Entschaerfung sicherung.json + Mappe-3-Abschluss-Opferperspektive-Vertiefung | **1** | 60 Min | Inhalts-Entscheidung (welche Opferperspektive?) |
| **A4** | A-CODE-14 (F-RA3-01) | Engine-Patch escape-engine.js:2814 Lueckentext-Pool-Reset | **1** | 30 Min | — |
| **A5** | A-CONTENT-4 (F-RA4-10) | Hefteintrag M3 knoten k3-6 umschreiben (afrikanische Stimme + konkrete Erfahrungsperspektive) | **1** | 45 Min | Inhalts-Entscheidung |
| **A6** | A-VERIFY-1 (F-RA4-02) | Mat-3-*-Volltextscan Kolonialterminologie + ggf. Kontextualisierungs-Patch | **1** [VP] | 20 Min + ggf. 30 Min | — |
| **A7** | A-DOC-1 (F-RA6-04) | `lehrkraft.html` erfundene Kompetenz-IDs GPG7_LB2_K_04/05 entfernen oder als "interne Paraphrase" markieren | 2 | 10 Min | — |
| **A8** | A-CODE-9 (F-RA4-01-Hallu) | Pre-Ingest-Titel-Validierung via get_summary als Hard-Gate (R0-FINAL+-09) | **1** | 1 h | Sub-Agent-Invariante Phase 0.2.M |
| **A9** | A-CODE-1 (PI-MV2-EXT3 + R0-FINAL+-12/13) | CC BY-SA Attribution-Schema + Lizenz-Pre-Check + medien_katalog_game.json | 2 | 3-4 h | Schema + Sub-Agent-Edit + Q-LIZENZ-Gate-Hook |
| **A10** | A-CODE-2 (PI-ENGINE-1) | Hefteintrag-Dualstruktur-Normierung | 2 | 2-3 h | Schema-Entscheidung + Migration |
| **A11** | A-CODE-3 (PI-ENGINE-2) | Assembly-Validator ergaenzen (Entity-Scan + Aufgaben-Min-Count + material_referenz-Rueckrefs) | 2 | 3-4 h | SUB_ASSEMBLY_VERIFY Extension |
| **A12** | A-CODE-4 (PI-ENGINE-3) | Entity-Encoding-Hardening Pipeline-Scan-Hook | 2 | 2 h | UTF-8 Source→Assembly→Deploy |
| **A13** | A-CODE-5 (PI-DIDAKTIK-1) | Typ-Selektions-Katalog R7 in VERTRAG_PHASE_2-2a | 2 | 1-2 h | R7-Jahrgangs-Constraint |
| **A14** | A-CODE-6 (PI-DIDAKTIK-2) | A18-Hard-Gate Phase 2.2 material_referenz-Rueckref-Pflicht | 2 | 1-2 h | — |
| **A15** | A-CODE-7 (R0-FINAL+-01 Umlaut-Retrofit) | Umlaut-Retrofit BEGRUENDUNG/VERGLEICH/QUELLENKRITIK/FREITEXT | 2 | 2 h | Template-Saeuberung |
| **A16** | A-CODE-8 (R0-FINAL+-02 O-07-U-B-Checker) | Pflicht-Gate-Hook statt optional | 2 | 1-2 h | — |
| **A17** | A-CODE-10 (R0-FINAL+-06/F-RA4-11) | Dual-Kanal-Cross-Check WebFetch+Commons | 2 | 2-3 h | Ueber Q-MEDIEN-PROSPEKTIV hinaus |
| **A18** | A-CODE-11 (PI-PIPELINE-1 Rest-Fix) | VERTRAG_PHASE_3-1 DEPLOY-06 Patch-Propagation | 3 | <1 h | Vertrags-Edit |
| **A19** | A-CODE-12 (F-RA1-01) | Q-Gate-Mechanik aus Selbst-PASS-Schleife loesen | 2 | 2-3 h | Externe Q-Gate-Evaluation |
| **A20** | A-CODE-13 (F-RA2-10 / F-RA6-03 / F-RA5-09) | Sprachniveau-Gate R7 + Mappe-3-Fachwortglossar | **1** (DaZ-D6) | 2-3 h | Gate + Inhalts-Artefakt |
| **A21** | F-RA1-05 + F-RA1-06 Coverage-Beleg | Perspektiv-Inventar-Matrix + Coverage-Report-Generator (R0-FINAL+-05 + R0-FINAL+-17) | **1** | 4 h | Strukturell |

**Batch-4a v2 Total:** 21 Items, **geschaetzt 28-38 h CC-Arbeit.**

### 6.2 Klasse A Prozess/Dokument — Batch-4b v2 (unveraendert gegen v1)

| ID | Beschreibung | PQI | Aufwand |
|---|---|---|---|
| A-PROZ-1 | PI-PM-1 Post-Kompaktions-Re-Orientation-Protokoll | 3 | 30 Min |
| A-PROZ-2 | PI-PM-2 CC→Cowork-Handoff-Template-Pflicht | 3 | 30 Min |
| A-PROZ-3 | PI-PM-3 STATUS-Freeze bei Patch-Zyklen | 3 | 15 Min |
| A-PROZ-4 | F-RA5-03 STATUS-als-Wiederaufsetz-Anker | 3 | 15 Min |
| A-PROZ-5 | F-RA5-05 Kompaktions-Resilience-Protokoll | 3 | 30 Min |
| A-PROZ-6 | R0-FINAL+-04 Fiktions-Klausel v3.6-Policy-Revidieren (haengt an F-RA2-09 VP) | 2 | 1-2 h |

**Batch-4b v2 Total:** 6 Items, 3-4 h PM-Arbeit.

### 6.3 Klasse C (Pilot-intern testbar, unveraendert)

- PI-PM-4 Re-Flag-Pattern-Detektor
- PI-PM-1 Wirksamkeit (Protokoll ist A, Wirksamkeit ist C)
- Kompaktions-Verhalten generell

---

## 7. Entscheidungs-Matrix v2

### 7.1 Drei Pfade (PQI-sensitiv neu kalibriert)

| Pfad | Items | Aufwand | Pilot-Signal-Qualitaet | PQI-1-Coverage |
|---|---|---|---|---|
| **P-DIDAKTIK-MIN** (NEU v2) | A1-A6 (alle PQI-1 inhaltlich) + A-PROZ alle | ~6 h CC + 3-4 h PM = **1 Tag** | MITTEL-HOCH didaktisch; Pipeline-Residual dokumentiert | **6 von 9** PQI-1 Items |
| **P-DIDAKTIK-FULL** (NEU v2) | A1-A8 + A20 + A21 + A-PROZ alle | ~15 h CC + 3-4 h PM = **2-3 Tage** | HOCH didaktisch | **9 von 9** PQI-1 |
| **P-FULL** (≈ Matrix v1 Full-Pre-Pilot) | A1-A21 + A-PROZ alle | 28-38 h CC + 3-4 h PM = **4-5 Tage** | HOCH didaktisch + HOCH pipeline | **9 von 9** PQI-1 + alle PQI-2-Pipeline |
| **P-MINIMAL-v1** (Matrix v1 Pfad, ohne Didaktik-Integration) | A-CODE-1/2/5/9/11 + A-PROZ | 10-14 h CC + 3-4 h PM = **2 Tage** | **NIEDRIG didaktisch** (nur 1 von 9 PQI-1 abgedeckt: A-CODE-9 = Hallu-Validierung) | **1 von 9** PQI-1 |

### 7.2 Kritische Beobachtung

Matrix v1 Minimal-Pre-Pilot deckt nur **1 von 9 konsolidierten PQI-1 Items** ab (A-CODE-9 = Pre-Ingest-Titel-Validierung, via F-RA4-01-Hallu). Die anderen 8 PQI-1 Items sind inhaltlich in Mappe 3 verortet und in v1 nicht prioritaer erfasst.

**→ Minimal-Pre-Pilot v1 ist didaktisch unzureichend.** P-DIDAKTIK-MIN (v2) ist der neue didaktisch-verantwortbare Minimalpfad.

---

## 8. Empfehlung v2

**Empfohlen: P-DIDAKTIK-MIN**

**Begruendung:**
- Deckt alle inhaltlichen PQI-1 Items (A1-A6) in ~3 h ab.
- A-PROZ alle in parallel PM-Session (3-4 h).
- Gesamt: 1 Tag Cowork-Arbeit (kein CC-Run noetig fuer A1-A6; mechanische Edits + kleine Engine-Patch).
- Pipeline-Residual dokumentiert (A9-A19 bleiben fuer Post-Pilot).
- A20 (Register-Glossar) + A21 (Coverage-Beleg) optional vor Pilot, billig bis mittel Aufwand.
- Verify-Pending A6 im Durchlauf enthalten.

**Falls zeitlich moeglich: P-DIDAKTIK-FULL.**

Zusaetzlicher Nutzen P-DIDAKTIK-FULL gegen P-DIDAKTIK-MIN:
- A8 (Hallu-Hard-Gate) verhindert Re-Assembly-Regression
- A20 (Sprach-Gate + Glossar) schliesst DaZ-PQI-1 explizit
- A21 (Coverage-Beleg) macht F-RA1-05/06 sichtbar auditierbar

**Nicht empfohlen:** P-MINIMAL-v1 (didaktisch unzureichend nach F0e-Audit).

---

## 9. Delta zu Matrix v1

| Aspekt | v1 | v2 |
|---|---|---|
| Achsen | Triage (A/B/C) | Triage + PQI + Konvergenz |
| Neue F-RA6-Findings | 0 | 5 (F-RA6-01 bis F-RA6-05) |
| PQI-1-Items in A | 0 markiert | 9 explizit |
| A-Klasse Sortierung | Schema-/Code-/Prozess-Gruppen | PQI-priorisiert |
| Minimal-Pfad | Code/Schema fokussiert | **Inhalt-fokussiert** (Mappe-3-Patches) |
| Neuer Pfad | — | P-DIDAKTIK-MIN (1 Tag) |

---

## 10. Naechste Schritte

1. **User-Entscheidung Batch-4-Scope:** F0a / F0b / F0c (siehe §11-§13).
2. **F0e.5 PM-Close:** Matrix v2.1 + BEFUND + STATUS + CHANGELOG commit via Host-MCP.
3. Nach Batch-4-Umsetzung: Pilot in Lerngruppe.

---

## 11. Batch-4-Scope-Recommendation v2 (F0e.4)

### 11.1 Pfad-Benennung (F0a / F0b / F0c)

Die in §7-§8 definierten Pfade werden fuer Batch-4-Scope-Entscheidung umbenannt:

| F0e-Bezeichnung | Batch-4-Label | Kurzbeschreibung |
|---|---|---|
| P-DIDAKTIK-MIN | **F0a — Minimal-Didaktik** | Inhaltliche PQI-1-Fixes Mappe 3 + Prozess-Protokolle. 1 Tag. |
| P-DIDAKTIK-FULL | **F0b — Full-Didaktik** | F0a + Hallu-Hard-Gate + Sprach-Gate/Glossar + Coverage-Beleg. 2-3 Tage. |
| P-FULL | **F0c — Full-Pre-Pilot** | Alle A-Klasse-Items (Inhalt + Pipeline + Prozess). 4-5 Tage. |
| P-MINIMAL-v1 (DEPRECATED) | — | Nicht mehr angeboten. Deckt nur 1 von 9 PQI-1. Didaktisch unzureichend. |

### 11.2 Aufwand-Re-Kalibrierung (v2 ggue v1)

| Pfad | v1-Schaetzung | v2-Schaetzung | Delta | Ursache |
|---|---|---|---|---|
| Minimal | ~2 Tage (5 Code-Items) | **F0a: 1 Tag** (3-6 h Inhaltspatches) | **-1 Tag** | Fokus auf mechanische Inhaltspatches statt Pipeline-Infrastruktur; PQI-1-First-Sortierung |
| Full | 4-5 Tage (13 Code + 6 Prozess) | **F0c: 4-5 Tage** (21 Code + 6 Prozess) | unveraendert | 8 neue F-RA6/PQI-Items absorbiert durch PQI-1-Priorisierung; A-CODE-14 (Engine-Patch) + A-CONTENT-1..4 sind leichtgewichtig |
| — (neu) | — | **F0b: 2-3 Tage** | neu | F0a + 3 strukturelle A-CODE-Items (Hallu-Gate + Sprach-Gate + Coverage) |

### 11.3 Trade-off-Tabelle

| Dimension | F0a Minimal-Didaktik | F0b Full-Didaktik | F0c Full-Pre-Pilot |
|---|---|---|---|
| **Aufwand Cowork (h)** | 3-4 h Inhaltspatches | 12-15 h (F0a + 8-11 h CC-Strukturarbeit) | 28-38 h CC + 3-4 h PM |
| **Kalenderzeit** | 1 Tag | 2-3 Tage | 4-5 Tage |
| **PQI-1-Coverage** | 6 von 9 (67%) | 9 von 9 (100%) | 9 von 9 (100%) |
| **Pilot-Signal-Qualitaet Didaktik** | MITTEL-HOCH | HOCH | HOCH |
| **Pilot-Signal-Qualitaet Pipeline** | NIEDRIG (Residual) | MITTEL | HOCH |
| **Risiko: Pilot fehlschlaegt wegen PQI-1-Defekt** | NIEDRIG fuer inhaltliche Defekte, MITTEL fuer Hallu-Regression | NIEDRIG | NIEDRIG |
| **Risiko: Pilot-Signal durch Pipeline-Bug verschmutzt** | MITTEL (z.B. Assembly-Regression) | MITTEL | NIEDRIG |
| **Post-Pilot-Follow-up Aufwand** | ~20-30 h (A7-A21 offen) | ~15-25 h (A9-A19 offen) | ~3-5 h (nur C-Klasse + Verify-Extended) |
| **Blockt Pilot-Start bis:** | Ende Tag 1 | Ende Tag 3 | Ende Tag 5 |
| **Didaktisch verantwortbar?** | Ja, wenn Pilot-Lerngruppe ueber Residual-Defekte informiert | Ja | Ja |

### 11.4 Go/No-Go-Kriterien pro Pfad

**F0a — Go wenn:**
- Zeitdruck hoch (z.B. konkreter Pilot-Termin in naechster Woche).
- Pilot fokussiert auf didaktische Signale (SuS-Rezeption, Lernwirksamkeit, Zeitbudget), nicht auf Pipeline-Regressionen.
- User akzeptiert, dass A7-A21 als Post-Pilot-Work-Stream bleiben.

**F0a — No-Go wenn:**
- Pilot auch Pipeline-Stress-Test sein soll (Lizenz-Pre-Check, Umlaut-Retrofit, Assembly-Validator fehlen).
- DaZ-Subgruppe im Pilot zentral (F-RA5-09 PQI-1 nicht geschlossen ohne A20).
- F-RA1-05/06 Coverage-Beleg ist Pflicht-Dokumentation fuer Pilot-Auswertung.

**F0b — Go wenn:**
- F0a-Trigger + die drei F0b-Exklusiv-Items (Hallu-Gate, Sprach-Gate/Glossar, Coverage-Beleg) werden als pilot-relevant eingeschaetzt.
- Zeitbudget 2-3 Tage vor Pilot verfuegbar.
- DaZ-Subgruppe im Pilot.

**F0b — No-Go wenn:**
- Zeitbudget < 2 Tage.
- Pipeline-Bugs (Dualstruktur, Entity-Encoding, Typ-Selektion) sind bereits in Pilot-Lerngruppe toleriert worden in frueheren Runs.

**F0c — Go wenn:**
- Pilot soll Benchmark fuer v3.12-Release sein, nicht nur Feldstudie.
- Zeitbudget 4-5 Tage verfuegbar.
- User will vor Pilot-Auswertung "kein offenes Infrastruktur-Item".

**F0c — No-Go wenn:**
- Zeitbudget < 4 Tage.
- Pipeline-Items A9-A19 sind nicht Pilot-Outcome-bestimmend (z.B. Lizenz-Compliance, Umlaut-Retrofit) — deren Wirksamkeit misst man ohnehin erst in v3.12-Release, nicht im Pilot.

### 11.5 Post-Pilot-Follow-up-Liste (wenn F0a oder F0b gewaehlt)

**Nach F0a offen (→ Post-Pilot):**
- A7 F-RA6-04 lehrkraft.html Kompetenz-ID-Bereinigung (10 Min)
- A8 F-RA4-01-Hallu Hard-Gate (1 h) — **kritisch, da Assembly-Regression moeglich**
- A9-A17 Code-Items (14-20 h)
- A18-A19 Rest-Fix + Q-Gate-Externalisierung (3-4 h)
- A20 F-RA5-09/F-RA6-03 Sprachniveau-Gate + Glossar (2-3 h) — **kritisch, wenn DaZ im Pilot**
- A21 F-RA1-05/06 Coverage-Beleg + Perspektiv-Inventar (4 h) — **Pflicht-Doku**
- Verify-Pending F-RA2-09 Policy-Klaerung (30 Min)
- F-RA6-beta-05 Source-Inkonsistenz knoten k3-2 (15 Min)

**Nach F0b offen (→ Post-Pilot):**
- A7 (10 Min) + A9-A19 (14-20 h) + A18-A19 (3-4 h) + Verify-Pending F-RA2-09 + F-RA6-beta-05
- A8, A20, A21 bereits in F0b enthalten.

**Nach F0c offen (→ Post-Pilot):**
- Nur C-Klasse + Verify-Extended.

### 11.6 Pflicht-Verankerung pro Pfad (nicht-verhandelbar)

Unabhaengig vom gewaehlten Pfad MUSS vor Pilot-Start abgeschlossen sein:
- **A1-A6 (alle PQI-1 inhaltlich)** — weil Mappe 3 sonst mit Falschaussagen und fehlender Aufgabe deployed ist.
- **A-PROZ 1-5** — PM-Protokolle, billig, erforderlich fuer Pilot-Auswertung.

Falls bei F0a User sich entscheidet A20 oder A21 in F0a hineinzuziehen: Pfad wird zu "F0a-erweitert" und naehert sich F0b an.

### 11.7 Empfehlung v2.1

**Primaer-Empfehlung: F0b (Full-Didaktik, 2-3 Tage)**

Begruendung:
- F0a laesst A8 Hallu-Hard-Gate offen — Assembly-Regressions-Risiko nach Source-Edits A1-A5.
- F0a laesst A21 Coverage-Beleg offen — Pilot-Auswertung muss Perspektiv-Inventar auditierbar haben.
- F0a laesst A20 offen — DaZ-Subgruppe im Pilot strukturell unversorgt.
- F0b schliesst alle 9 PQI-1 Items + bringt 3 strukturelle Pilot-Enabler in 2-3 Tagen.
- F0c investiert 2 zusaetzliche Tage in Pipeline-Items, deren Wirksamkeit der Pilot gar nicht misst.

**Fallback-Empfehlung: F0a + erzwungen A8 (Hallu-Gate)** — bei harten Zeitdruck-Szenarien (~1.5 Tage).

**Nicht empfohlen:** F0c (over-invest vor Pilot; Pipeline-Items gehoeren in v3.12-Release-Konsolidierung, nicht Pre-Pilot).

---

## 12. Explicit User-Decision-Prompt

Zur User-Entscheidung:

**Frage 1 — Zeitbudget:**
- a) < 1.5 Tage verfuegbar → **F0a** (Minimal-Didaktik, didaktisch verantwortbar; A8 als Assembly-Regressions-Schutz zumindest stichprobenartig mitpruefen)
- b) 2-3 Tage verfuegbar → **F0b** (Full-Didaktik, empfohlen)
- c) 4-5 Tage verfuegbar → **F0b oder F0c** (F0b empfohlen, weil F0c nicht mehr Pilot-Signal-relevant)

**Frage 2 — Pilot-Fokus:**
- Wenn **didaktisches Signal** (SuS-Rezeption, Lernwirksamkeit, Zeitbudget, Differenzierung): F0b reicht.
- Wenn zusaetzlich **Pipeline-Stress-Test** (v3.12-Release-Benchmark): F0c.

**Frage 3 — DaZ-Subgruppe:**
- DaZ-SuS im Pilot → A20 Pflicht → F0b oder erweitert F0a (F0a + A20 = ~1.5 Tage).

**Frage 4 — Post-Pilot-Kapazitaet:**
- Wenn Post-Pilot-Arbeit in ~1-2 Wochen moeglich: F0a / F0b ausreichend (Residual-Fixes dort).
- Wenn Post-Pilot-Arbeit zeitlich eng: F0c um weniger offene Items zu haben.

**Entscheidungs-Hinweis:** Die Pilot-Auswertung hat vorrangig Erkenntnis-Wert fuer SuS-Rezeption und didaktische Struktur — nicht fuer Pipeline-Code-Korrektheit. Daher fokussiert F0e.4 auf PQI-1-Vollabdeckung, nicht auf Pipeline-Zero-Defect.

---

## 13. Delta zu Matrix v1 und v2.0

| Aspekt | v1 | v2.0 | v2.1 |
|---|---|---|---|
| Achsen | Triage | Triage + PQI + Konvergenz | — |
| PQI-1-Items in A | 0 markiert | 9 explizit | — |
| Pfad-Benennung | Minimal/Full | +P-DIDAKTIK-MIN/FULL | **F0a/F0b/F0c** |
| Trade-off-Tabelle | nein | nein | **ja, 9 Dimensionen** |
| Go/No-Go-Kriterien | nein | nein | **ja, pro Pfad** |
| Post-Pilot-Follow-up-Liste | nein | nein | **ja, pro Pfad** |
| Pflicht-Verankerung | nein | implizit | **explizit (A1-A6 + A-PROZ 1-5)** |
| Explicit User-Decision-Prompt | nein | nein | **ja, 4 Fragen** |
| Empfehlung | Minimal (ohne Didaktik-Eval) | P-DIDAKTIK-MIN | **F0b primaer, F0a-erweitert Fallback** |

---

**Status:** Matrix v2.1 COMPLETE (F0e.3 + F0e.4). Bereit fuer User-Entscheidung Batch-4-Scope + F0e.5 Commit.
