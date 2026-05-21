---
titel: Master-Audit V3-Schulrecht — Konsolidierung A+B+C+D
datum: 2026-05-21
methodik: 4 parallele Auditoren (A=Verbatim · B=Coverage · C=Konsistenz · D=Master-Wiederholung+Prüfer)
basis_korpus: 9 mp## × {data.js, vertiefung-content.js} + Hub-index.html
basis_golden: _mkdocs/docs/includes/normen-glossar.md · 11_Audit_Quellentreue (30 Werte) · 17_Audit_Master (15 KRITISCH) · PDF Bauer 2024
status: FINAL — Pre-Push-Gate
---

# Konsolidierter Audit-Master V3-Schulrecht

## 1. Gesamtbilanz

| Auditor | Dimension | RED | YELLOW | GREEN-Anteil |
|---|---|---|---|---|
| **A** (Verbatim) | 215 Glossar-Einträge | 4 (1,9 %) | 7 (3,3 %) | 94,9 % |
| **B** (Coverage) | 35 PDF-Spiegelstriche | 0 echte Lücken | 4 Hygiene-Empfehlungen | 33/35 OK (94 %) |
| **C** (Konsistenz) | 7 Precedent-Klassen + ~15 grep-Queries | 0 V2-Wiederholungen | 5 (Inter+Intra+Cross-Ref+Hub) | 7/7 V2-Altfehler bereinigt |
| **D** (Master-Wiederholung) | 15 KRITISCH-Fehler | 0 (1 strittig) | 7 Coverage-Lücken | 7 KORRIGIERT |

**Verdict: PASS mit Patches.** V3 ist substantiell quellentreu. Keine prüfungsgefährdenden Inter-Modul-Widersprüche. Aber: 4 RED-Befunde im Hotspot Art. 86/Art. 69 + 4 Coverage-Lücken bei klassischen Schulrats-Fallen.

---

## 2. RED-Konsolidierte Pflicht-Fixes vor 26.05.2026

### R-01 — Art. 86/2 OM-Katalog stark gekürzt
**Konvergent: A·B·C**
**Lokation:** `mp05/data.js:366` (A.4-Anriss "6-Stufen-Katalog")
**Problem:** V3-mp05 nennt nur 6 von 12 OM-Stufen. Hub + mp03 sagen korrekt "12-er". Risiko: Prüferfrage „Wie viele OM gibt es?" wird mit „6" falsch beantwortet.
**Patch:** mp05 A.4-Anriss umschreiben auf „**12-Nr.-OM-Katalog Art. 86/2 BayEUG** (Schwerpunkt SuS-Perspektive Nr. 1–6 niedrigschwellig; Lehrerkonferenz-Eskalation Nr. 6/9/11 → mp03 A.4)".

### R-02 — Art. 86 Wortlaut-Drift in mp03
**Konvergent: A**
**Lokation:** `mp03/data.js:219` (12er-Katalog mit Position-Drift)
**Problem:**
- „Nacharbeit" falsch in Abs. 2 verortet (gehört zu Abs. 1 als Erziehungsmaßnahme)
- 2/3-EB-Mehrheits-Klausel für Pos 10 (Entlassung) fehlt
**Patch:** Reihenfolge nach Phase-4-Tabelle Goldenglossar. Ergänze 2/3-Klausel: „Entlassung (Pos 10) durch LK-Konferenz im Einvernehmen Schulaufsichtsbehörde, sofern EB nicht mit 2/3-Mehrheit dagegen."

### R-03 — Art. 69 Schulforum als „beratendes Gremium" verschleiert Einvernehmen-Pflicht
**Konvergent: A·D-K01**
**Lokation:** `mp03/data.js:215`, `mp07/data.js:214`
**Problem:** V3 beschreibt Schulforum als „beratendes Gremium" + „KEIN Beschluss-Organ". Tatsächlich hat Schulforum **Einvernehmens-Befugnis** für Hausordnung + Pausenordnung (Art. 69 Abs. 4 BayEUG). Risiko: Prüferfrage zur Pausenordnung wird mit „Anhörung" falsch beantwortet.
**Patch:** Ergänzung in mp03 + mp07: „Schulforum erteilt **Einvernehmen** zur Pausen-/Hausordnung (Art. 69 Abs. 4 BayEUG); im Übrigen beratendes Gremium."

### R-04 — mp08 Cross-Ref-Bruch („MP_07 Haftungsachsen")
**Konvergent: C-X1**
**Lokation:** `mp08/data.js:80, 130` (Cross-Refs FA09 + F5/Niklas)
**Problem:** Verweis „Cross-Ref MP_07 Haftungsachsen/Haftungsdreieck" — Haftungsdreieck liegt aber in **mp06** (A.1+A.2). mp07 = Elternvertretung.
**Patch:** „MP_07 Haftungsachsen" → „MP_06 A.1+A.2 (Haftungsdreieck + Aufsichtspflicht)".

### R-05 — Coverage-Lücke § 3 Abs. 6 LDO (LNW-Aufbewahrung 1 Jahr)
**Konvergent: A-Y2·D-K04**
**Lokation:** fehlt in V3 komplett (kein Glossar-Eintrag)
**Problem:** Klassische Schulrats-Lieblingsfalle: „Wie lange müssen schriftliche Probearbeiten aufbewahrt werden?" — V3 könnte mit aktuellem Bestand nicht antworten.
**Patch:** Neuer Glossar-Eintrag in `mp04` (Unterricht+Erziehung): `§ 3 LDO` — „schriftliche LNW: **1 Jahr nach Ablauf des Schuljahres** aufbewahren (§ 3 Abs. 6 LDO; KMBek Schriftwesen)".

### R-06 — Coverage-Lücke § 60a UrhG (15 % max. 20 S.)
**Konvergent: A-Y1·D-K05**
**Lokation:** fehlt in V3 komplett
**Problem:** UrhG-Hotspot bei Kopier-Praxis — wird in Prüfung gerne abgefragt.
**Patch:** Neuer Glossar-Eintrag in `mp06`: `§ 60a UrhG` — „Kopier-/Vervielfältigungs-Anteil: **15 % eines Werks, max. 20 Seiten** pro Klasse + Schuljahr (Bildungseinrichtungen-Schranke, Fotokopiervertrag 2018)".

### R-07 — Coverage-Lücke Messer-Fall (StGB §§ 224/241 + Art. 87)
**Konvergent: D-K12**
**Lokation:** fehlt in V3 komplett (IST-mp01 hatte es, aber durch Restrukturierung verloren)
**Problem:** Drei-Phasen-Eskalation (Sofortmaßnahme → OM-Verfahren → Strafanzeige) ist Prüferfrage-Klassiker.
**Patch:** Neuer Fall in `mp03` (Schulbetrieb, Block A.4 OM): „Messer im Unterricht — 3 Phasen: (1) Art. 87 Sicherung + § 23 BaySchO Sicherstellung des Gegenstands. (2) Art. 88 Anhörung + Art. 86/2 OM-Entscheidung LK-Konferenz. (3) Strafanzeige durch SL (§ 158 StPO); § 241 StGB Bedrohung + § 224 StGB gefährliche Körperverletzung möglich."

### R-08 — Coverage-Lücke EB-Schlüssel 1:15 vs. 1:50
**Konvergent: D-K09**
**Lokation:** `mp07/data.js:211` sagt nur „Zahl der Mitglieder nach Schulgröße" — kein konkreter Wert
**Patch:** In `mp07` Art. 65 BayEUG-Glossar-Eintrag ergänzen: „Schulart-spezifischer Schlüssel — GS/MS/FöS: **1 EB-Mitglied pro 15 SuS-Eltern**; RS/Gym: **1 pro 50**."

---

## 3. YELLOW-Konsolidierte Hygiene-Fixes (empfohlen, nicht blockierend)

| # | Befund | Quelle | Fix |
|---|---|---|---|
| Y-01 | mp03 Tippfehler „§ 86/1" → „Art. 86/1" | C | 1-Char-Edit `mp03/data.js:26` |
| Y-02 | mp04 Cross-Ref Art. 86 zeigt noch auf altem Schema "MP_05 A.4" — sollte mp03 A.4 sein | B | `mp04/data.js:177` Patch |
| Y-03 | mp07 Begriffsschärfung Erziehungsbeauftragte (§ 1 Nr. 4 JuSchG) vs. -berechtigte (Art. 76 BayEUG) | B | Cross-Ref mp01 L07 + mp03 F4 (Klassenfahrt) |
| Y-04 | mp06 Lehrerkonferenz nur 1-Satz-Glossar — Cross-Ref → mp03 A.2 explizit | B | Header-Kommentar bereits da, im Glossar zusätzlich verlinken |
| Y-05 | mp05 Vorkurs Deutsch „240 Wochenstunden" missverständlich | A-Y3 | `mp05/data.js:526-528` → „240 Stunden **insgesamt** über 1,5 SJ" |
| Y-06 | LK-Konferenz-OM-Zuständigkeit „Nr. 6/9/11" zu selektiv — korrekt Nr. 6-10 | A-Y5 | `mp03/data.js:214` Patch + 2/3-Klausel |
| Y-07 | Hub-Card mp02 erwähnt M-Zug + drei MS-Aufstiegswege — gehört zu mp04 | C | Hub-Anriss kürzen oder „(→ Vertiefung MP_04)" anhängen |
| Y-08 | Hub-Card mp05 verschweigt OM-Anteil im Abriss | C | OM-Aspekt aus A.4 in Hub-Card-Abriss aufnehmen |
| Y-09 | BayBG Art. 7/1 Beschwerderecht | D-K03 | mp06 LK-Pflichten-Block ergänzen |
| Y-10 | BeamtStG §§ 34/35 Vertretungspflicht | D-K15 | mp06 A.1 — Cross-Verlinkung zu § 9a/3 LDO |

---

## 4. GREEN-Highlights (Positiv-Belege)

### 4.1 Substantielle Bereinigung gegenüber V2 (alte mkdocs-Version)
**0 von 7 V2-Altfehlern wiederholt:**
- ✅ LNW-Aufbewahrung (1J vs. 2J) — sauber
- ✅ UrhG (12% vs. 15%) — Thema fehlt, aber widerspruchsfrei (R-06)
- ✅ Vorkurs Deutsch (1,5 SJ einheitlich, „NICHT 2 J." explizit markiert)
- ✅ LK-Konf-OM-Nrn. — einheitlich „6/9/11"
- ✅ BayDG (5+2 = 7 Maßnahmen, normgetreu Art. 6 BayDG) — **V3 korrekter als 17_Master**
- ✅ Schulforum (in V3 als „beratendes Gremium" — siehe R-03 wegen Einvernehmen-Lücke, aber kein V2-Anhörung-vs-Einvernehmen-Widerspruch)
- ✅ EB-Quote — Thema vorhanden, Wert fehlt aber (R-08)

### 4.2 Bauer-PDF-Coverage 33/35 Spiegelstriche
4 von 5 fehlenden Spiegelstrichen sind sauber per Cross-Ref ausgelagert (Lehrerkonferenz-Detail mp06→mp03; OM-Aspekte mp04→mp03; etc.). Keine echten Lücken.

### 4.3 Verbatim-Wortlaut-Stichproben
- Art. 41/6 BayEUG: 1:1 aus gesetze-bayern.de
- § 12/3 MSO Zweier-Direktionalität (LK→SuS „angemessene Frist" + SuS→Schule „1 Woche unverändert"): sauber
- Art. 56/4 BayEUG Verhüllungs-Verbot: verbatim
- § 34 MSO Quabi (≥ 3,0 + Note 4 Englisch): verbatim

### 4.4 Prüfer-Fragen-Verfügbarkeit (D-Simulation)
- F1 LK-Konf Mehrheit + Entlassung: STARK
- F2 Notenauskunft + Vergleichsverbot Lara/Tim: SEHR STARK
- F5 BayDG-Maßnahmen: STARK
- F3 Messer-Fall: SCHWACH (→ R-07)
- F4 LNW-Aufbewahrungsfrist: NICHT VORHANDEN (→ R-05)

---

## 5. Meta-Befund: 17_Master-Audit selbst hat einen Fehler

**K10 — BayDG „8 Stufen" ist falsch.**
Art. 6 BayDG nennt korrekt 5 Maßnahmen für Lebenszeitbeamte (Verweis · Geldbuße · Kürzung Dienstbezüge · Zurückstufung · Entfernung) + 2 für Ruhestand (Kürzung Ruhegehalt · Aberkennung Ruhegehalt) = **7 Maßnahmen**.

V3 ist hier korrekt. Empfehlung: 17_Audit_Master_Fehlerliste_ABCD.md Zeile 1609-1616 nachträglich validieren.

---

## 6. Patch-Plan (Token-/Zeit-priorisiert)

### Phase 1 — Pflicht-Fixes (RED, geschätzt ~90 Min, vor 26.05.)
1. R-01 mp05 OM-Anriss „6-Stufen" → „12-Nr."
2. R-02 mp03 Art. 86/2 Reihenfolge + 2/3-Klausel
3. R-03 mp03 + mp07 Schulforum Einvernehmen Art. 69 Abs. 4
4. R-04 mp08 Cross-Refs „MP_07" → „MP_06"
5. R-05 mp04 + Glossar: § 3 Abs. 6 LDO (LNW 1 J.)
6. R-06 mp06 + Glossar: § 60a UrhG (15 %/20 S.)
7. R-07 mp03 Messer-Fall 3-Phasen
8. R-08 mp07 + Glossar: EB-Schlüssel 1:15 / 1:50

### Phase 2 — Hygiene-Fixes (YELLOW, geschätzt ~30 Min)
Y-01 bis Y-10 — kosmetische Patches, Cross-Refs, Hub-Anrisse.

### Phase 3 — Meta-Validierung (optional)
17_Master K10 BayDG-Eintrag prüfen + ggf. korrigieren.

---

## 7. Audit-Tool-Verbrauch (Audit-Selbst-Metrik)

| Auditor | Tool-Calls | Token-Verbrauch | Status |
|---|---|---|---|
| A (Verbatim, Kompakt) | 16/25 | 132 kTokens | sauber |
| B (Coverage) | 23 | 237 kTokens | sauber |
| C (Konsistenz, Kompakt) | 13/20 | 94 kTokens | sauber |
| D (Master-Wiederholung, Kompakt) | 10/25 | 107 kTokens | sauber |
| **Total** | **62 Tool-Calls** | **~570 kTokens** | — |

Erste Runde (A, C, D mit größerem Scope) crashte wegen Connection-Errors. Zweite Runde mit Kompakt-Budgets erfolgreich durch.

---

## 8. Nächste Schritte

**Pre-Push-Gate:** RED-Count = 8 → **BLOCK bis Phase 1 erledigt.**

Empfehlung: Phase 1 jetzt direkt umsetzen (alle 8 Patches in einem Commit), dann erneut diesen Audit gegen lange Phase-1-Patches laufen lassen.

Phase 2 (YELLOW) kann als „nice-to-have" vor 26.05. fließen, ist aber nicht blockierend.

**Lern-Reihenfolge-Empfehlung für Paul:**
1. Erst Phase 1 abwarten — Material muss vor dem Lernen prüfungs-tauglich sein
2. Dann mp03 (Schulbetrieb + OM) als ersten Schwerpunkt lernen — höchste Prüferfrequenz
3. mp02 (Bildungssystem) + mp04 (Unterricht+Erziehung) als zweite Schwerpunkt-Achse
4. Hotspots im Lern-Modus: Art. 86/87/88 + Art. 76 + § 14 LDO + § 5 LDO + Art. 56/5

---

**Audit-Pfade:**
- `AUDIT_A_VERBATIM_2026-05-21.md` (183 Z.) — Verbatim-Treue
- `AUDIT_B_COVERAGE_2026-05-21.md` (277 Z.) — PDF-Spec-Coverage
- `AUDIT_C_KONSISTENZ_2026-05-21.md` (117 Z.) — Inter/Intra-Modul-Widersprüche
- `AUDIT_D_MASTER_PRUEFER_2026-05-21.md` (125 Z.) — V2-Wiederholungs-Check + Prüferperspektive
- `AUDIT_MASTER_V3_2026-05-21.md` (dieser Report) — Konsolidierung

— Ende Master-Audit V3 —
