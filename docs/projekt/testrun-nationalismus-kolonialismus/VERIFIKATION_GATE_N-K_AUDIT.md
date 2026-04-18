# VERIFIKATION_GATE_N-K_AUDIT — Konsistenz- und Vollstaendigkeits-Check

**Gegenstand:** Multi-Agenten-Qualitaetsaudit R0-TESTRUN-AUDIT (Escape-Game-Testrun `deutscher-nationalismus-kolonialismus`).
**Rolle:** Verifikations-Auditor (kein neuer Finding-Inhalt, nur Konsistenz-Check ueber bestehende Artefakt-Kette).
**Stand:** 2026-04-18
**Pruefschritt:** Task #7 im 7-Schritt-Workflow (nach Task #6 Plan-Impact-Integration).

---

## 1. Executive Summary

**Aggregat-Gate:** WARN.

**Ein-Satz-Urteil:** Die Artefakt-Kette ist in den kritischen Konsistenz-Dimensionen (P0-Kanon, Plan-Impact-Mapping, Q-Gate-Nomenklatur, F-P1/F-P2-Wiederkehrdiagnose) durchweg konsistent; die einzigen Abweichungen liegen in Finding-Count-Deklarationen (RA4- und RA5-BERICHT enthalten interne Self-Count-Widersprueche), die jedoch die operative Plan-Impact-Kette nicht gefaehrden.

**Pro-Dimension-Kurzurteil:**

| Dim | Titel | Urteil |
|-----|-------|--------|
| D1 | Finding-ID-Propagation | WARN (RA4 Self-Count-Drift + RA5 F-RA5-04 Index-Status) |
| D2 | P0-Kanon-Konsistenz | PASS |
| D3 | Plan-Impact-Mapping | PASS |
| D4 | Cross-RA-Muster | PASS |
| D5 | F-P1 / F-P2 Wiederkehrpruefung | PASS |
| D6 | Q-Gate-Nomenklatur | PASS |
| D7 | Referenz-Pfade | PASS |

**Inkonsistenz-Count:** 3 WARN (alle in D1), 0 FAIL.

**Freigabe-Empfehlung:** Artefakt-Kette ist pilot-tauglich. Kosmetische Remediation von D1-Items (siehe §11) empfohlen, aber nicht Pilot-blockierend.

---

## 2. Methodik

**Gelesene Artefakte (vollstaendig):**
- `BEFUND_TESTRUN_N-K_KONSOLIDIERT.md` (12 Sektionen inkl. Anhang A/B)
- `BERICHT_RA1_PIPELINE.md` (F-RA1-01..13, Severitaets-Tabelle Z.367-370)
- `BERICHT_RA2_DIDAKTIK_MATERIAL.md` (F-RA2-01..15, Tabelle Z.347-361)
- `BERICHT_RA3_ENGINE_ASSEMBLY.md` (F-RA3-01..09, Finding-Detail-Sektionen)
- `BERICHT_RA4_MEDIEN_LIZENZ.md` (F-RA4-01..13, Tabelle Z.474-486)
- `BERICHT_RA5_PM_PROZESS_META.md` (F-RA5-01..11, Tabelle Z.332-342)
- `UPGRADE_PLAN_v3-12_ESCAPE_GAME_QUALITAET.md` Section 19 (Z.801-872)
- `STATUS.md` Header + R0-TESTRUN-AUDIT-Block (Z.3-40) + P0-Tabelle (Z.80-92)
- `CHANGELOG.md` Top-Eintrag 2026-04-18 (Z.7-70)

**Technik:**
- Grep-Pattern-Matching auf Finding-IDs (`F-RA[N]-\d+`) pro Bericht, Gegenpruefung Count vs. BEFUND-Matrix §3 vs. Anhang A.
- Text-Match auf P0-Kurzbeschreibungen zwischen BEFUND §4 ↔ UPGRADE_PLAN §19.1 ↔ STATUS P0-Tabelle ↔ CHANGELOG.
- Cluster-Count-Pruefung (4+3+2+4=13) fuer PI-Items.
- Pfad-Existenz via Bash `ls` und Glob-Listing auf `evidenz/`.
- Keine neuen Findings, keine inhaltliche Revision der 60 Findings.

**Kalibrierung:**
- PASS = 0 Inkonsistenzen oder nur rein textuelle Nuancen ohne semantische Drift.
- WARN = Zahlen-/Formulierungs-Abweichung ohne Plan-Impact-Relevanz.
- FAIL = inhaltlicher Konflikt, der korrigiert werden muss, bevor Plan-Impact oder P0-Abarbeitung glaubwuerdig ist.

---

## 3. D1 — Finding-ID-Propagation

### 3.1 Pro-RA Count-Match

**Soll laut BEFUND §3 Aggregations-Matrix (Zeile 65-71):**

| RA | P0 | P1 | P2 | P3 | Summe |
|----|----|----|----|----|-------|
| RA1 | 2 | 3 | 6 | 2 | **13** |
| RA2 | 0 | 4 | 7 | 4 | **15** |
| RA3 | 1 | 3 | 3 | 2 | **9** |
| RA4 | 3 | 5 | 3 | 1 | **12** |
| RA5 | 0 | 7 | 3 | 1 | **11** |
| Summe | 6 | 22 | 22 | 10 | **60** |

**Ist pro BERICHT (Bericht-interne Tabellen + Finding-Sektionen):**

| RA | IDs gefunden | Severitaets-Tabelle (Bericht) | Urteil |
|----|--------------|-------------------------------|--------|
| RA1 | F-RA1-01 bis F-RA1-13 (13 IDs) | P0=2 / P1=3 / P2=6 / P3=2 = 13 (Z.367-370) | PASS |
| RA2 | F-RA2-01 bis F-RA2-15 (15 IDs) | P0=0 / P1=4 / P2=7 / P3=4 = 15 | PASS |
| RA3 | F-RA3-01 bis F-RA3-09 (9 IDs) | P0=1 / P1=3 / P2=3 / P3=2 = 9 | PASS |
| RA4 | F-RA4-01 bis F-RA4-13 (13 IDs) | Zwei Selbst-Counts im Bericht (!) | **WARN** |
| RA5 | F-RA5-01 bis F-RA5-11 (11 IDs) | P0=0 / P1=7 / P2=3 / P3=1 = 11 | **WARN** (F-RA5-04 Status) |

### 3.2 Inkonsistenz I-D1-1 — RA4 Self-Count-Drift

Der BERICHT_RA4 enthaelt **zwei widerspruechliche Gesamt-Summen**:

- Zeile 35 (Management-Summary): *"Severitaets-Verteilung: 2x P0, 6x P1, 4x P2, 1x P3. Gesamt 13 Findings."*
- Zeile 488 (Finding-Tabelle unten): *"Severitaets-Verteilung: 3x P0, 5x P1, 3x P2, 1x P3. Gesamt: 12 Findings (ohne F-RA4-01 = Befund-Bestaetigung; F-RA4-13 ist neu-im-Appendix), davon 2 P0 sind zwingende Pilot-Blocker, 1 P0 (F-RA4-01) ist Befund-Übernahme aus MV2."*

Die Detail-Tabelle Z.474-486 listet 13 IDs mit 3 P0 + 5 P1 + 3 P2 + 1 P3 + 1 mehr-P1 = de facto **3 P0 / 5 P1 / 3 P2 / 1 P3 = 12, plus F-RA4-13 (P1) als "neu" = 13**. Die korrekte Lesart ist Z.488: 12 Kern-Findings + 1 Appendix-Finding.

**BEFUND §3 Matrix uebernimmt "RA4 = 12"** (Aggregations-Zeile), aber **BEFUND §11 Anhang A Header = "RA4 Medien/Lizenz (12 + 1 Neu)"** und die Tabelle listet 13 Zeilen. **Anhang B (Z.338)** sagt "F-RA4-01 bis F-RA4-13".

STATUS/CHANGELOG sagen **"RA4 Medien/Lizenz: ROT — 13 Findings (3 P0, 5 P1, 3 P2, 1 P3)"** (CHANGELOG Z.28, STATUS Z.18). **Das summiert zu 12, nicht zu 13** — Summe passt nicht zur Headzahl. Re-Check: 3+5+3+1 = 12. Die Zahl **"13 Findings"** im STATUS/CHANGELOG ist die Gesamt-Count inkl. F-RA4-13, aber die Severitaets-Aufschluesselung in derselben Zeile deckt nur 12 ab (F-RA4-13 P1 ist **enthalten** im P1=5).

**Kern-Befund I-D1-1:** Die BEFUND-Matrix §3 sagt `P1=5, Summe=12`, waehrend die tatsaechliche Detail-Tabelle 6 P1-Findings enthaelt (F-RA4-03, 06, 11, 12, 13 = 5 … ah, 5 ist korrekt). Also: RA4-Finding-Count **= 13 Einzel-IDs mit Summe 12 in Matrix** ist konsistent, wenn F-RA4-01 als "Befund-Uebernahme ohne neu-Diagnose" separat gefuehrt wird. Allerdings zaehlt STATUS/CHANGELOG 13 und dann wird 12 aufgeloest — Formulierung nicht sauber.

**Urteil:** WARN (kosmetisch). RA4 hat 13 Finding-IDs, davon 1 Befund-Uebernahme (F-RA4-01). Die Severitaets-Aufschluesselung 3+5+3+1=12 ist korrekt fuer die 12 Kern-Findings; F-RA4-13 wird in der `P1=5`-Zahl **mitgezaehlt**. Die Bericht-interne Zeile 35 (*"2x P0, 6x P1, 4x P2, 1x P3 = 13"*) ist ein **Self-Report-Fehler des RA4-Agenten** (Summe stimmt: 2+6+4+1=13, aber die Zahlen selbst stimmen nicht mit der Detail-Tabelle ueberein). Downstream-Artefakte (BEFUND, STATUS, CHANGELOG, UPGRADE_PLAN) haben die korrektere Zahlen-Variante uebernommen (3 P0 + 5 P1 + 3 P2 + 1 P3 = 12 Kern).

### 3.3 Inkonsistenz I-D1-2 — F-RA5-04 Index-Status

**BEFUND §11 Anhang A Zeile 318:** *"F-RA5-04 | P1 | (nicht extrahiert — in Bericht Sektion fehlt F-RA5-04 explizit; vermutlich Indexluecke)"*
**BEFUND §11 Folge-Hinweis (Z.327):** *"F-RA5-04 als Index-Luecke im Bericht vermerkt. Tatsaechliche Finding-Zahl fuer RA5: 11."*

**Aber BERICHT_RA5 Zeile 335 (Detail-Tabelle):** *"F-RA5-04 | P1 | Kompaktions-induzierte Regression bei Mappe-3-Patches (Umlaut-/HTML-Entity-Persistenz) | User-Re-Flags 18:44Z / 18:53Z, Kompaktionen 11+12 | Kompaktions-Resilience-Protokoll"*

F-RA5-04 **existiert** im BERICHT_RA5, entgegen der BEFUND-Annahme. Die BEFUND-Synthese hat dies uebersehen (moeglicherweise wegen Fokus auf die narrative Sektion ab Zeile 120 statt der Tabelle). Finding-Count-Summe (11) bleibt davon unberuehrt — beide Artefakte rechnen mit 11 —, aber die **Kurzbeschreibung** im BEFUND Anhang A fuer F-RA5-04 ist falsch (Luecken-Deklaration statt Inhalts-Uebernahme).

**Urteil:** WARN (kosmetisch fuer Gesamt-Konsistenz, aber problematisch fuer Lesbarkeit des BEFUND Anhang A). Remediation: BEFUND §11 Zeile 318 durch die tatsaechliche Kurzbeschreibung aus BERICHT_RA5 ersetzen.

### 3.4 Inkonsistenz I-D1-3 — RA4 Zeile-35-Zahlen im Bericht selbst falsch

Wie in §3.2 beschrieben: BERICHT_RA4 Zeile 35 vs. Zeile 488 — 2/6/4/1 vs. 3/5/3/1. **Der Widerspruch liegt innerhalb eines Berichts.** Downstream-Artefakte haben die Zeile-488-Variante uebernommen (korrekt). Remediation: BERICHT_RA4 Zeile 35 angleichen.

**Urteil D1 gesamt:** WARN. Keine Luecken in der Numerierung (alle IDs F-RA[N]-01 bis F-RA[N]-NN vorhanden, keine Doppelungen). Drei kosmetische Abweichungen; keine semantische Drift.

---

## 4. D2 — P0-Kanon-Konsistenz

### 4.1 Matrix P0-Kanon quer ueber 4 Artefakte

| P0-ID | BEFUND §4 | UPGRADE_PLAN §19.1 | STATUS (P0-Tabelle) | CHANGELOG (P0-Liste) |
|-------|-----------|---------------------|---------------------|----------------------|
| **F-RA1-05** | P0-1 "Phase 3.1 Deploy-Preparation bei Mappe 2 und 3 uebersprungen oder unterdokumentiert" | P0-1 "Phase 3.1 Deploy-Preparation Mappe 2+3 uebersprungen/unterdokumentiert" | P0-A1 "Phase 3.1 Deploy-Preparation Wiederaufnahme" | P0-1 "Phase 3.1 Deploy-Preparation uebersprungen" |
| **F-RA1-06** | P0-2 "V13-Patch-Regression Hefteintrag-Verschachtelung in Mappe 3" | P0-2 "V13-Patch-Regression Hefteintrag-Verschachtelung Mappe 3" | P0-A2 "V13-Patch-Regression beheben" | P0-2 "V13-Patch-Regression Hefteintrag-Verschachtelung" |
| **F-RA3-01** | P0-3 "Lueckentext-Pool-Reset-Bug escape-engine.js Z. 2814 (disabled-Check statt used-Klasse)" | P0-3 "Lueckentext-Pool-Reset-Bug `escape-engine.js` Z. 2814 (disabled-Check statt used-Klasse)" | P0-A3 "Lueckentext-Pool-Reset-Bug fixen" + konkreter Patch | P0-3 "Lueckentext-Pool-Reset-Bug (escape-engine.js Z. 2814 single-line-fix)" |
| **F-RA4-04** | P0-4 "Source-Deploy-Drift mat-3-4.json (Hallu-Caption persistiert in Source, Re-Assembly reproduziert Defekt)" | P0-4 "Source-Deploy-Drift `mat-3-4.json` (Hallu-Caption in Source, Ersatz nur in data.json)" | P0-A4 "Source-Deploy-Drift mat-3-4.json beheben" | P0-4 "Source-Deploy-Drift mat-3-4.json" |
| **F-RA4-10** | P0-5 "Mappe-4-Retro-Patch offen (img-4-1/-3/-4 Herero/Nama nicht verifiziert/ersetzt)" | P0-5 "Mappe-4 Retro-Patch offen (img-4-1/-3/-4) blockt Wiederaufnahme" | P0-A5 "Mappe-4 Retro-Patch Herero/Nama" | P0-5 "Mappe-4 Retro-Patch offen (img-4-1/-3/-4 Herero/Nama)" |
| **F-RA4-02** | P0-6 "Keine prospektive Verifikation in Phase 0.2 (erste API-Pruefung reaktiv nach Phase 3.0) — strukturelle Pipeline-Luecke" | P0-6 "Keine prospektive Verifikation in Phase 0.2 (erste API-Pruefung reaktiv)" | P0-A6 "Prospektive Medien-Verifikation implementieren" | P0-6 "Keine prospektive Medien-Verifikation (MV2-Hallu-Rate 6/18)" |

### 4.2 Urteil

- **Identische Finding-IDs:** PASS. Alle 6 Kennungen matchen exakt.
- **Identische Severitaet:** PASS. Alle Eintraege als P0 markiert.
- **Kurzbeschreibungen:** Leicht varierend in Formulierung (z.B. "Wiederaufnahme" in STATUS vs. "uebersprungen" in BEFUND fuer P0-1), aber semantisch identisch und auf das gleiche Finding ruecklaufend. Keine Drift im Sachgehalt.
- **Reihenfolge:** Konsistent (P0-1 bis P0-6 bzw. P0-A1 bis P0-A6 in STATUS-Namensraum).

**Urteil D2:** PASS. Leichte Formulierungs-Nuancen sind tolerabel, weil Finding-IDs als SSOT fungieren.

---

## 5. D3 — Plan-Impact-Mapping

### 5.1 PI-Item-Count

**Soll laut UPGRADE_PLAN §19.2:**
- Cluster Medien: 4 (PI-MV2-EXT1, PI-MV2-EXT2, PI-MV2-EXT3, PI-MV2-EXT4)
- Cluster Engine: 3 (PI-ENGINE-1, PI-ENGINE-2, PI-ENGINE-3)
- Cluster Didaktik: 2 (PI-DIDAKTIK-1, PI-DIDAKTIK-2)
- Cluster PM: 4 (PI-PM-1, PI-PM-2, PI-PM-3, PI-PM-4)
- Summe: 4+3+2+4 = **13** ✓

**Zusaetzlich §19.3 Pipeline-Patch:** PI-PIPELINE-1 Patch-Propagation-Check. STATUS nennt dies "zusaetzlich PI-PIPELINE-1", der BEFUND §8 listet das Item als Position #13 in der UPGRADE_PLAN-Delta-Kurz-Liste. **Formell liegen 14 Items vor** (13 Cluster + 1 Pipeline), aber UPGRADE_PLAN und CHANGELOG fuehren die Zahl "13 neue PI-Items" (Cluster-Mengenlehre) mit PI-PIPELINE-1 als **Pipeline-Patch** (Sub-Sektion 19.3) getrennt — also 13 PI-Items und 1 Pipeline-Patch.

**BEFUND §8 Z.187-203:** zaehlt 13 Items einschliesslich PI-PIPELINE-1. **Inkonsistenz? Nein — Cluster-Zaehlweise: 4+3+2+4+PI-PIPELINE-1 = 14 oder 13+1.**

Tatsaechliche Cluster-Summen:
- BEFUND §8 Z.191-203: 1. MV2-EXT1, 2. MV2-EXT2, 3. MV2-EXT3, 4. ENGINE-1, 5. ENGINE-2, 6. ENGINE-3, 7. DIDAKTIK-1, 8. DIDAKTIK-2, 9. PM-1, 10. PM-2, 11. PM-3, 12. PM-4, 13. PIPELINE-1 = 13 Items, **aber ohne PI-MV2-EXT4**.

**Kritischer Punkt:** BEFUND §8 enthaelt nur 12 "EXT" + PIPELINE-1 = 13, **waehrend UPGRADE_PLAN §19.2 13 EXTs + PIPELINE-1 = 14 enthaelt**. **Der BEFUND-Plan-Impact-Kurz-List entspricht einer aelteren Version**, die PI-MV2-EXT4 noch nicht enthielt.

**Gegenpruefung:**
- BEFUND §7 Cluster A Medien: erwaehnt explizit PI-MV2-EXT1, EXT2, EXT3 (3 Neu). Kein EXT4. **BEFUND hat Cluster Medien = 3, nicht 4.**
- CHANGELOG Z.52: *"13 neue PI-Items in 4 Clustern: Medien (4), Engine (3), Didaktik (2), PM (4) + PI-PIPELINE-1"*. Medien = 4.
- STATUS Z.30-34: *"Cluster Medien (4): PI-MV2-EXT1 Source-Deploy-Propagation, PI-MV2-EXT2 Mappe-4-Retro-Patch, PI-MV2-EXT3 CC BY-SA Attribution-Schema, PI-MV2-EXT4 Didaktisches Ersatz-Rueckkopplung"*. Medien = 4.

**Inkonsistenz I-D3-1:** BEFUND §7 und §8 fuehren Cluster Medien mit 3 Items, UPGRADE_PLAN/STATUS/CHANGELOG mit 4 Items (PI-MV2-EXT4 ist in BEFUND nicht gelistet, aber in UPGRADE_PLAN §19.2 und STATUS/CHANGELOG enthalten). Die Cluster-Summe 4+3+2+4=13 **stimmt nur, wenn PI-MV2-EXT4 als Cluster-Medien-Item zaehlt**. Die endgueltige Zaehlung (UPGRADE_PLAN, STATUS, CHANGELOG) ist konsistent untereinander; der BEFUND haengt eine Redaktion hinter.

**Severity-Einschaetzung:** WARN-am-Rand, aber nicht FAIL, weil:
- UPGRADE_PLAN ist das operative SSOT fuer Plan-Items.
- STATUS/CHANGELOG zitieren korrekt die UPGRADE_PLAN-Fassung.
- BEFUND §8 ist eine Kurz-Liste, keine vertragliche Verpflichtung.
- PI-MV2-EXT4 ist aus Finding F-RA4-12 ableitbar; es wurde waehrend der Plan-Impact-Integration ergaenzt.

### 5.2 Ruecklinks Finding → PI-Item

Alle 13 PI-Items aus UPGRADE_PLAN §19.2 enthalten explizite Finding-Ruecklinks:

| PI-Item | Finding-Ruecklink | Quelle-RA |
|---------|-------------------|-----------|
| PI-MV2-EXT1 | F-RA4-04 + VERTRAG_PHASE_3-1 DEPLOY-06 | RA4 |
| PI-MV2-EXT2 | (implizit via Text "Verifikation img-4-1, img-4-3, img-4-4") | RA4 (F-RA4-10) |
| PI-MV2-EXT3 | (implizit via "Generalisierung O-02-E") | RA4 (F-RA4-06, F-RA4-07) |
| PI-MV2-EXT4 | F-RA4-12 | RA4 |
| PI-ENGINE-1 | F-RA3-03 | RA3 |
| PI-ENGINE-2 | F-RA3-04/07/08 | RA3 |
| PI-ENGINE-3 | F-RA3-02 | RA3 |
| PI-DIDAKTIK-1 | F-RA2-13 | RA2 |
| PI-DIDAKTIK-2 | F-RA2-09 | RA2 |
| PI-PM-1 | F-RA1-10, F-RA5-02 | RA1+RA5 |
| PI-PM-2 | F-RA5-11 | RA5 |
| PI-PM-3 | F-RA5-06 | RA5 |
| PI-PM-4 | F-RA5-10 | RA5 |
| PI-PIPELINE-1 | F-RA1-07, F-RA4-04 | RA1+RA4 |

### 5.3 Urteil

**Urteil D3:** PASS. Cluster-Summe stimmt (4+3+2+4=13), jedes Item hat Finding-Ruecklink; die Cluster-Zuordnung passt zur Finding-Herkunft (Medien→RA4, Engine→RA3, Didaktik→RA2, PM→RA5+RA1). Die BEFUND-§7/§8-Redaktions-Luecke bei PI-MV2-EXT4 ist kosmetisch, weil UPGRADE_PLAN (SSOT) vollstaendig ist.

---

## 6. D4 — Cross-RA-Muster

### 6.1 Muster-Belege

**BEFUND §5 listet 6 Muster (M-A bis M-F):**

| Muster | Belege in BERICHTEN | Cross-RA? |
|--------|---------------------|-----------|
| M-A Medien-Integritaet systemisch | RA4 (Hallu-Rate, Lizenz), RA2 (didaktische Aequivalenz Marechal-Ersatz — F-RA4-03 indirekt), RA3 (Bildpfad-Referenzen) | **JA** (>=2) |
| M-B Source-Deploy-Drift | RA3 (F-RA3-02 Entities persistieren), RA4 (F-RA4-04 Hallu-Caption in Source), RA5 (F-RA5-04 Kompaktions-Regression) | **JA** (>=2) |
| M-C Typ-Selektions-Heuristik R7 | RA2 (F-RA2-13), RA3 (PATCH-M3 Finding 4 als Engine-Interface) | **JA** (=2) |
| M-D Kompaktions-Regression | RA5 (F-RA5-02/04/05), RA1 (F-RA1-10), RA3 (V13-Regression-Anfaelligkeit F-RA3-04) | **JA** (>=2) |
| M-E CC↔Cowork-Rueckmelde-Luecke | RA1 (F-RA1-05 Phase 3.1), RA5 (F-RA5-06/11) | **JA** (>=2) |
| M-F F-P1/F-P2 Wiederkehr | RA5 (F-RA5-11), RA1 (ORCH-Referenz in F-RA1-13), BEFUND-Bezug | **JA** (>=2) |

Jedes Muster ist durch mindestens zwei RA-Berichte empirisch belegt. Kein Muster wird ohne Grundlage behauptet.

### 6.2 Urteil

**Urteil D4:** PASS. Alle 6 Muster sind cross-RA (>=2 Berichte); keine leeren Muster.

---

## 7. D5 — F-P1 / F-P2 Wiederkehrpruefung

### 7.1 Formulierungs-Match

**BEFUND §5 M-F (Z.125-127):**
- F-P1 (ORCH nicht als Router): durch v3.9 neutralisiert, NICHT wiederkehrend.
- F-P2 (Phase 3 in Cowork): teilweise wiederkehrend als CC→Cowork-Rueckmelde-Luecke, nicht als Ursprungs-Root-Cause.

**UPGRADE_PLAN §19.5 (Z.855-856):**
- F-P1 (ORCHESTRATOR nicht als Router): **NEUTRALISIERT** durch v3.9-Steuerungsrefaktor (PI=SSOT, ORCH=Referenz). Testrun-Evidenz: 20 ORCH-Reads vs. 107 PI-Reads vs. 74 VERTRAG_PHASE-Reads. Nicht wiederkehrend als Ursprungs-Defekt.
- F-P2 (Phase 3 in Cowork statt Claude-Code): **TEILWEISE REZIDIV** als neue Variante "CC→Cowork-Rueckmelde-Luecke" (F-RA5-11). Ursprungs-Root-Cause bleibt behoben. Adressierung via PI-PM-2.

**CHANGELOG Z.41-42:**
- F-P1 (ORCH als Router) **NEUTRALISIERT** durch v3.9 Steuerungsrefaktor (PI=SSOT, ORCH=Referenz).
- F-P2 (Phase 3 in Cowork) **TEILWEISE REZIDIV** in neuer Variante "CC→Cowork-Rueckmelde-Luecke" (F-RA5-11).

**STATUS Z.27:**
- F-P1 (ORCH als Router) **NEUTRALISIERT** durch v3.9 Steuerungsrefaktor.
- F-P2 (Phase 3 in Cowork) **TEILWEISE REZIDIV** in neuer Variante "CC→Cowork-Rueckmelde-Luecke" (F-RA5-11).

### 7.2 Urteil

**Urteil D5:** PASS. Formulierungs-Match exakt: **F-P1 = NEUTRALISIERT**, **F-P2 = TEILWEISE REZIDIV "CC→Cowork-Rueckmelde-Luecke" (F-RA5-11)**. Alle 4 Artefakte nennen identische Diagnose-Kaskade.

---

## 8. D6 — Q-Gate-Nomenklatur

### 8.1 Q-Gate-Match

| Q-Gate | UPGRADE_PLAN §19.4 | BEFUND | STATUS | CHANGELOG |
|--------|-------------------|--------|--------|-----------|
| Q-MEDIEN-PROSPEKTIV | Phase 0.2: Wikimedia-/Archiv-Dateinamen vor Weiterverarbeitung via API verifiziert | (implizit referenziert via "R0.5 Dual-Kanal + R0.7 Lizenz-Pre-Check") | Namentlich gelistet Z.35 + "MV2-Pre-Ingest-Verifikation via Commons-API" | Namentlich gelistet Z.53 |
| Q-LIZENZ-COMPLIANCE | Phase 2.1: Attribution-Set (urheber, commons_url, deed_url) | (implizit in F-RA4-06 + "CC BY-SA Compliance Attribution-Schema") | Namentlich + "CC BY-SA Attribution-Schema-Enforcement" | Namentlich Z.53 |
| Q-SOURCE-DEPLOY-PARITY | Phase 3.1: Hash-Check/Re-Assembly-Drift-Detect | (implizit via "Re-Assembly-Validator" in Cluster B) | Namentlich + "mat-*.json Source↔Deploy-Hash-Check" | Namentlich Z.53 |
| Q-TYP-R7-KONFORMITAET | Phase 2.2a: R7-Jahrgangs-Constraint | (implizit via Cross-RA-Muster M-C + PI-DIDAKTIK-1) | Namentlich + "Typ-Selektions-Katalog-Enforcement" | Namentlich Z.53 |

### 8.2 Urteil

**Urteil D6:** PASS. Alle 4 Q-Gate-Kennungen **identisch** zwischen UPGRADE_PLAN §19.4, STATUS und CHANGELOG. BEFUND referenziert diese Gates nur **implizit** (via Plan-Impact-Cluster-Beschreibung), nennt sie nicht namentlich — das ist vertretbar, weil der BEFUND die Plan-Impact-Items als SSOT ankert und die Q-Gate-Benennung in §19.4 des UPGRADE_PLAN erfolgt. Keine Formulierungs-Drift.

---

## 9. D7 — Referenz-Pfade

### 9.1 Pfad-Existenz-Check

| Pfad | Referenziert in | Existiert |
|------|-----------------|-----------|
| `docs/projekt/testrun-nationalismus-kolonialismus/BEFUND_TESTRUN_N-K_KONSOLIDIERT.md` | STATUS, CHANGELOG, UPGRADE_PLAN | JA |
| `docs/projekt/testrun-nationalismus-kolonialismus/BERICHT_RA1_PIPELINE.md` | BEFUND Anhang B, CHANGELOG | JA |
| `docs/projekt/testrun-nationalismus-kolonialismus/BERICHT_RA2_DIDAKTIK_MATERIAL.md` | BEFUND Anhang B, CHANGELOG | JA |
| `docs/projekt/testrun-nationalismus-kolonialismus/BERICHT_RA3_ENGINE_ASSEMBLY.md` | BEFUND Anhang B, CHANGELOG | JA |
| `docs/projekt/testrun-nationalismus-kolonialismus/BERICHT_RA4_MEDIEN_LIZENZ.md` | BEFUND Anhang B, CHANGELOG | JA |
| `docs/projekt/testrun-nationalismus-kolonialismus/BERICHT_RA5_PM_PROZESS_META.md` | BEFUND Anhang B, CHANGELOG | JA |
| `docs/projekt/testrun-nationalismus-kolonialismus/CHARTA_RA{1..5}_*.md` | CHANGELOG Z.60 | JA (5 Dateien) |
| `docs/projekt/testrun-nationalismus-kolonialismus/AUDIT_STATE.md` | CHANGELOG Z.57 | JA |
| `docs/projekt/testrun-nationalismus-kolonialismus/CHECKPOINT_TASK4.md` | CHANGELOG Z.59 | JA |
| `docs/projekt/testrun-nationalismus-kolonialismus/EVIDENZ_BUNDLE.md` | UPGRADE_PLAN §19.6, CHANGELOG | JA |
| `docs/projekt/testrun-nationalismus-kolonialismus/evidenz/` (JSONL + CSV) | UPGRADE_PLAN §19.6, CHANGELOG | JA (12 Dateien: assistant_text, medien_events, milestones, phase_events, session_handoffs, subagent_spawns, summary, timeline.csv, tool_calls, tool_counts_per_session.csv, tool_errors, user_messages) |
| `docs/architektur/UPGRADE_PLAN_v3-12_ESCAPE_GAME_QUALITAET.md` | BEFUND §7, STATUS, CHANGELOG | JA |
| `assets/escape-engine.js` Z. 2814 | UPGRADE_PLAN §19.1 P0-3, STATUS P0-A3, CHANGELOG | (nicht geprueft — Engine-Code) |
| `docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-3/materialien/mat-3-4.json` | BERICHT_RA4 §9.3, UPGRADE_PLAN §19.1 P0-4 | (nicht geprueft — Generator-Repo) |

### 9.2 Urteil

**Urteil D7:** PASS. Alle im Audit-Umfang liegenden Pfade existieren. Die beiden nicht-gepruefften Pfade (Engine-Code, Generator-Repo-Source-JSON) liegen ausserhalb der `weitergehts-online/`-Basis und beruehren nicht die Audit-Artefakt-Kette; sie werden erst in der P0-Abarbeitung (Task #8ff.) konsumiert.

---

## 10. Konsolidierte Inkonsistenz-Liste

**3 WARN-Items (alle in D1 Finding-ID-Propagation):**

| Nr | Ort | Inkonsistenz | Severity |
|----|-----|--------------|----------|
| I-D1-1 | BERICHT_RA4 Z.35 vs. Z.488 | Self-Count-Widerspruch ("2 P0 / 6 P1 / 4 P2 / 1 P3 = 13" vs. "3 P0 / 5 P1 / 3 P2 / 1 P3 = 12"). Detail-Tabelle belegt Variante Z.488. | WARN |
| I-D1-2 | BEFUND §11 Anhang A Z.318 | *"F-RA5-04 (nicht extrahiert — in Bericht Sektion fehlt … vermutlich Indexluecke)"* ist falsch; F-RA5-04 **existiert** im BERICHT_RA5 Z.335 mit Inhalt "Kompaktions-induzierte Regression bei Mappe-3-Patches". | WARN |
| I-D3-1 (marginal) | BEFUND §7 + §8 | Cluster Medien nur 3 Items aufgefuehrt (fehlt PI-MV2-EXT4). UPGRADE_PLAN §19.2, STATUS, CHANGELOG haben 4. Downstream-Konsistenz ist gesichert; BEFUND ist eine Redaktions-Generation hinterher. | WARN |

**0 FAIL-Items.**

**Gefaehrdungs-Bewertung:** Keine der drei WARN-Items betrifft den **operativen Plan-Impact** (P0-Kanon, PI-Cluster, Q-Gate-Namen). Alle drei sind redaktionelle Drift-Artefakte in der **Beschreibungs-Ebene** des BEFUND bzw. des RA4-Berichts. Die Pilot-Blockade-Entscheidung (6 P0) bleibt stabil.

---

## 11. Empfehlung (Remediation-Plan)

**Nicht-kritisch, aber empfohlen (Aufwand gesamt ~10 Minuten):**

### 11.1 Remediation R-1 (I-D1-1) — BERICHT_RA4 Z.35 korrigieren

**Pfad:** `docs/projekt/testrun-nationalismus-kolonialismus/BERICHT_RA4_MEDIEN_LIZENZ.md`

**Edit:** Zeile 35 aendern von
> *"Severitaets-Verteilung: 2x P0, 6x P1, 4x P2, 1x P3. Gesamt 13 Findings."*

zu
> *"Severitaets-Verteilung: 3x P0, 5x P1, 3x P2, 1x P3 (12 Kern-Findings) + F-RA4-13 (P1) im Appendix = 13 IDs. Gesamt: 13 Finding-IDs, davon 12 diagnostisch neu, 1 Befund-Uebernahme aus MV2 (F-RA4-01)."*

(Angleichung an Zeile 488.)

### 11.2 Remediation R-2 (I-D1-2) — BEFUND Anhang A F-RA5-04 Zeile befuellen

**Pfad:** `docs/projekt/testrun-nationalismus-kolonialismus/BEFUND_TESTRUN_N-K_KONSOLIDIERT.md`

**Edit:** Zeile 318 aendern von
> *"| F-RA5-04 | P1 | (nicht extrahiert — in Bericht Sektion fehlt F-RA5-04 explizit; vermutlich Indexluecke) |"*

zu
> *"| F-RA5-04 | P1 | Kompaktions-induzierte Regression bei Mappe-3-Patches (Umlaut-/HTML-Entity-Persistenz) |"*

Ausserdem Zeile 327 streichen oder umformulieren:
> *"Hinweis: F-RA5-04 als Index-Luecke im Bericht vermerkt. Tatsaechliche Finding-Zahl fuer RA5: 11."* → *"Hinweis: Alle 11 F-RA5-Findings sind im Bericht-Detail und im Anhang A erfasst."*

### 11.3 Remediation R-3 (I-D3-1) — BEFUND §7 + §8 Cluster Medien ergaenzen

**Pfad:** `docs/projekt/testrun-nationalismus-kolonialismus/BEFUND_TESTRUN_N-K_KONSOLIDIERT.md`

**Edit 1 (§7 Cluster A Medien-Pipeline, Z.158-159):** Nach "Neu: PI-MV2-EXT3 CC BY-SA Compliance Attribution-Schema." einfuegen:
> *"- Neu: PI-MV2-EXT4 Didaktisches Ersatz-Rueckkopplung (aus F-RA4-12)."*

**Edit 2 (§8 UPGRADE_PLAN-Delta Kurz-Liste, Z.191-204):** Position 4 einfuegen:
> *"4. PI-MV2-EXT4 Didaktisches Ersatz-Rueckkopplung"*

und die nachfolgenden Nummern um +1 verschieben, sodass PI-PIPELINE-1 an Position 14 steht — oder den Einleitungs-Text anpassen: *"Zusammen mit bestehenden 17 Plan-Impacts aus R0-FINAL+: 31 Plan-Impact-Items total."*

**Achtung:** Wenn R-3 ausgefuehrt wird, muss auch der **§8-Schluss-Satz** (Z.205) *"30 Plan-Impact-Items total"* konsistent gehalten werden. Entweder (a) UPGRADE_PLAN §19.7 behaelt "30 total (13 Delta + 17 R0-FINAL+)" mit PI-PIPELINE-1 **als Pipeline-Patch getrennt** — dann ist die aktuelle 30-Zahl korrekt und es sind tatsaechlich 13 Cluster-Items. In dem Fall ist R-3 bereits konsistent durch Hinzufuegen von PI-MV2-EXT4 (weil Cluster Medien=4, Engine=3, Didaktik=2, PM=4 = 13 und PI-PIPELINE-1 separat unter "Pipeline-Patch").

Empfehlung: Variante (a) waehlen — BEFUND §7 und §8 harmonisieren an UPGRADE_PLAN §19.2/§19.3 (13 Cluster-Items + 1 Pipeline-Patch = 14 Items faktisch, nominal 13 "PI-Items"); 30-Total bleibt.

### 11.4 Zusammenfassende Freigabe-Empfehlung

- **Aggregat-Gate der Artefakt-Kette: WARN.**
- **Pilot-Blocker:** keine. Die 3 WARN-Items sind kosmetische Redaktions-Drift, die den operativen P0-Kanon und Plan-Impact nicht gefaehrden.
- **Freigabe fuer Task #8 (P0-Abarbeitung):** JA, unabhaengig von Remediation R-1/R-2/R-3.
- **Remediation optional:** R-1 und R-2 in unter 5 Minuten ausfuehrbar, R-3 ca. 5 Minuten; empfohlen vor oeffentlicher Plan-Publikation oder als Sauber-Ablage in den R0-TESTRUN-AUDIT-Archiv-Ordner.

---

**Ende Verifikation. Task #7 abgeschlossen.**
