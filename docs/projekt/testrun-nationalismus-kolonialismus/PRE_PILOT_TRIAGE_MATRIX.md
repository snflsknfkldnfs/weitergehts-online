# Pre-Pilot-Triage-Matrix (F0.1)

**Erstellt:** 2026-04-19
**Zweck:** Klassifikation aller nach P0-BATCH-3 offenen Plan-Impact-Items + Findings (v1.3 Delta + R0-FINAL+ + 22 P1 + 22 P2 + 10 P3) nach Pilot-Signal-Relevanz. Ziel: Pre-Pilot-Handoff-Scope (Batch-4) definieren, damit v3.12-Pilot-Run auswertbares Signal liefert.
**Quellen:** `UPGRADE_PLAN_v3-12_ESCAPE_GAME_QUALITAET.md` §19, `BEFUND_TESTRUN_N-K_KONSOLIDIERT.md` §7/§8/§11, `STATUS.md` Plan-Impact-Liste 1-17.
**Status:** DRAFT zur User-Freigabe vor Batch-4-Planung.

---

## 1. Methodik

### 1.1 Dreiklassige Klassifikation

| Klasse | Definition | Konsequenz |
|---|---|---|
| **A — Pre-Pilot-Pflicht** | Triggerwahrscheinlichkeit im Pilot ≥50% UND Messsignal-Verschmutzung bei Trigger UND ausserhalb Pilot testbar/implementierbar | In Batch-4 (vor Pilot-Start) abarbeiten |
| **B — Pilot-tolerabel** | Entweder niedrige Triggerwahrscheinlichkeit (z.B. N-K-spezifisch, nicht auf neues Spiel uebertragbar) oder bekanntes Residual das Messsignal nicht entwertet | Nach Pilot abarbeiten, in Pilot-Urteil explizit als Residual dokumentieren |
| **C — Erst-im-Pilot-testbar** | Verhaltens-/Laufzeit-Eigenschaft, die nur in realem Pilot-Run beobachtbar ist (z.B. Kompaktions-Verhalten unter Last, Pattern-Detektoren) | Im Pilot-Run evaluieren, Entscheidung im Pilot-Post-Mortem |

### 1.2 Klassifikations-Kriterien

Pro Item drei Ja/Nein-Pruefungen:
1. **Trigger-Pilot?** Wird das Item im typischen Pilot-Run (ein GPG-R7-Spiel, 4 Mappen, Full-Pipeline R0-R8) mit ≥50% Wahrscheinlichkeit aktiv?
2. **Signal-Verschmutzung?** Wuerde ein Trigger das Pilot-Urteil ueber Pipeline-Reife verzerren (falsche Diagnose, Re-Flag-Pattern, Drift)?
3. **Pre-Pilot-Testbar?** Laesst sich das Item ohne Pilot-Lauf implementieren + verifizieren?

Klasse A = (1) + (2) + (3) alle JA.
Klasse B = (1) NEIN ODER (2) NEIN (bekannt + tolerabel).
Klasse C = (3) NEIN (benoetigt Pilot-Lauf als Testbed).

### 1.3 Scope-Abgrenzung

- 6 P0-Items aus BEFUND: **alle CLOSED durch Batch-1/2/3**, nicht Teil dieser Matrix.
- 17 R0-FINAL+ Plan-Items: grossteils Pipeline-Design-Komponenten, die **im Pilot aktiv werden** (= Teil des Pilots, nicht Pre-Pilot-Fix). Werden unten mit Sonder-Klassifikation gefuehrt.
- 13 v1.3 Delta PIs: 2 CLOSED (EXT1 via P0-A4, EXT2 via P0-A5), 1 TEILW (PIPELINE-1 via source-deploy-parity.sh + SUB_ASSEMBLY_VERIFY), 10 OFFEN.
- 60 Findings: 6 P0 CLOSED. Von 22 P1 sind **14 via PI-Mapping gedeckt** (siehe §4). 8 P1 residual + 22 P2 + 10 P3 eigenstaendig klassifiziert.

---

## 2. Inventur-Tabelle v1.3 Delta PIs

| PI-ID | Status | Trigger | Signal | Pre-Testbar | Klasse | Begruendung |
|---|---|---|---|---|---|---|
| PI-MV2-EXT1 Source-Deploy-Propagation | **CLOSED** (P0-A4 + source-deploy-parity.sh) | — | — | — | — | Bereits abgedeckt |
| PI-MV2-EXT2 Mappe-4-Retro-Patch | **CLOSED** (P0-A5) | — | — | — | — | Bereits abgedeckt |
| PI-MV2-EXT3 CC BY-SA Attribution-Schema | OFFEN | JA (jedes Game hat bildquellen) | JA (Lizenz-Luecke = Q-Gate-FAIL) | JA (Schema-Edit + Gate-Integration) | **A** | Harte Q-LIZENZ-COMPLIANCE-Voraussetzung |
| PI-MV2-EXT4 Didaktisches Ersatz-Rueckkopplung | OFFEN | NIEDRIG (nur bei Medien-Ersatz) | MITTEL | TEILW (Prozess, aber Test benoetigt Ersatz-Fall) | **B** | Triggert nicht zwangslaeufig im Pilot |
| PI-ENGINE-1 Hefteintrag-Dualstruktur | OFFEN (SUB_ASSEMBLY_VERIFY als Teil-Gate) | JA (jedes Mat mit hefteintrag) | JA (V13-Regressions-Risiko) | JA (Schema-Normierung) | **A** | Dualstruktur ist Regressions-Vector |
| PI-ENGINE-2 Assembly-Validator | TEILW (SUB_ASSEMBLY_VERIFY-Subagent existiert) | JA | JA | JA (Validator-Skript) | **A** | Ergaenzen: Entity-Scan, Aufgaben-Min-Count, material_referenz-Rueckreferenzen |
| PI-ENGINE-3 Entity-Encoding-Hardening | OFFEN | JA (UTF-8 durchlauf in allen Mats) | JA (Entity-Drift P1 im Testrun) | JA (Pipeline-Scan-Hook) | **A** | Hard-Gate an Source → Assembly → Deploy |
| PI-DIDAKTIK-1 Typ-Selektions-Katalog R7 | OFFEN | JA (Pilot ist R7) | JA (falsche Typen = didaktisch invalid) | JA (VERTRAG_PHASE_2-2a-Edit) | **A** | Jahrgangs-Constraint ohne das kein valider Pilot |
| PI-DIDAKTIK-2 A18-Luecken-Schliessung | OFFEN | JA (material_referenz-Vollstaendigkeit) | JA (A18 war P1 im Testrun) | JA (Phase-2.2-Hard-Gate) | **A** | Systemisches Perspektiv-Verankerungs-Problem |
| PI-PM-1 Post-Kompaktions-Re-Orientation | OFFEN (LEARNINGS §7-naher Prozess, aber PM-seitig nicht formalisiert) | JA (Kompaktionen in langen Runs) | JA (Kompaktions-Drift P1) | TEILW (Protokoll definierbar, Wirksamkeit C) | **A** (Protokoll-Anteil) + **C** (Wirksamkeits-Test) |
| PI-PM-2 CC→Cowork-Handoff-Template | TEILW (LEARNINGS §4 Template existiert, PM-seitig nicht als Pflicht-Artefakt pro Handoff) | JA (Phase 3 hat CC→Cowork-Transitionen) | JA (Re-Flag-Pattern + PI-Drift) | JA (Template-Dokument + Pflicht-Regel in ANLEITUNG) | **A** | PM-Seite der bereits vorhandenen LEARNINGS-Template-Quelle |
| PI-PM-3 STATUS-Freeze bei Patch-Zyklen | OFFEN | JA (Hotfix-Mode in Pilot wahrscheinlich) | JA (MAPPEN_ABGESCHLOSSEN-Drift P1) | JA (Prozess-Regel in ANLEITUNG) | **A** | Leichte Implementierung, hoher Signal-Gewinn |
| PI-PM-4 Re-Flag-Pattern-Detektor | OFFEN | UNKLAR (User-Message-Mustererkennung) | JA bei Trigger | NEIN (verhaltensbasiert, pilot-testbar) | **C** | Detektor ist Handlungs-Regel, Wirksamkeit nur im Pilot pruefbar |
| PI-PIPELINE-1 Patch-Propagation-Check | TEILW (source-deploy-parity.sh implementiert; VERTRAG_PHASE_3-1 DEPLOY-06-Regel-Ergaenzung offen) | JA (jeder Patch) | JA | JA (Vertrags-Edit) | **A** (Rest-Fix, <1h) |

**Summary v1.3 Delta (13 Items):** 2 CLOSED + 7 A + 1 B + 1 C + 2 A-TEILW = 9 A-Items (davon 2 mit TEILW-Vorarbeit), 1 B, 1 C.

---

## 3. Inventur-Tabelle 17 R0-FINAL+ Items (STATUS.md Plan-Impact 1-17)

Diese Items wurden VOR dem Testrun-Audit im UPGRADE_PLAN v3.12 Runden 1-8 als Pipeline-Komponenten definiert. Sie werden im Pilot als Teil der Pipeline aktiv.

| # | Item | Typ | Klasse | Begruendung |
|---|---|---|---|---|
| 1 | Umlaut-Retrofit drei Fragetypen (R1 AP1) | Code-Fix | **A** | Bereits im Testrun als Re-Flag-Pattern aufgefallen; vor Pilot noetig |
| 2 | O-07-U-B-Checker Pflicht-Gate (R1 AP4) | Gate-Hook | **A** | Pflicht-Gate-Hook statt optional → strukturell vor Pilot |
| 3 | M-03-Reife-Programm STATISTIK+QUELLENKRITIK Pflicht (R2 AP8) | Sub-Agent-Invariante | **Pipeline-B** | Ist Teil des Pilots (erste produktive Nutzung der Sub-Agenten) |
| 4 | Fiktions-Klausel v3.6-Policy-Revidieren (R4) | Policy-Doc | **A** | Widerspruch v3.6 vs. R0.3 muss vor Pilot aufgeloest sein, sonst Policy-Drift |
| 5 | Medien-Diversitaet Pflicht-Quoten-Q-Gate (R5) | Q-Gate | **Pipeline-B** | Gate wird im Pilot erstmals scharfgeschaltet |
| 6 | Phase-0.2.M Dual-Kanal-Pflicht (R2 AP2) | Sub-Agent | **A** | **Ueberlappt F-RA4-11.** Q-MEDIEN-PROSPEKTIV aus P0-A6 setzt Prospektiv-Pruefung, aber WebFetch+Commons-Cross-Check strukturell fehlt noch |
| 7 | Plan-vs-Wirklichkeit-Matrix M4-Vergleich neu (R2 AP5) | Sub-Agent-Aufgabe | **B** | M4-spezifisch, erst im Mappe-4-Kontext relevant |
| 8 | QuellentextMehrstimmen M3-Pilot-Fall Neu-Gen (R2 AP5) | Sub-Agent-Output | **Pipeline-C** | Pilot-Aktivitaet selbst |
| 9 | Pre-Ingest-Titel-Validierung via get_summary (R2 AP2) | Sub-Agent-Invariante | **A** | Harte Invariante muss vor Pilot scharf sein (sonst Hallu-Risiko) |
| 10 | Phase 0.2.Z bpb-Quell-Integration (R0.7) | Sub-Phase | **Pipeline-B** | Optional, aktiv nur bei bpb-URL im Game-Metadaten |
| 11 | Wiki-Scope-Katalog-Luecken-Pruefung (R0.7) | Prozess | **Pipeline-B** | Lehrplan-abhaengig, erst bei Katalog-Erweiterung |
| 12 | Sub-Agenten-Invariante Lizenz-Pre-Check (R0.7) | Gate-Hook | **A** | Parallel zu PI-MV2-EXT3, darf nicht parallel entwickelt werden ohne Integration |
| 13 | medien_katalog_game.json Schema-Erweiterung (R0.7) | Schema | **A** (ueberlappt PI-MV2-EXT3) | Gemeinsam mit PI-MV2-EXT3 behandeln |
| 14 | primaerquellen_katalog_game.json Artefakt-Typ (R0.7) | Artefakt | **Pipeline-B** | Optional, nur bei bpb-Aktivierung |
| 15 | Q-STRUKTUR-bpb-Coverage Q-Gate (R0.7) | Q-Gate | **Pipeline-B** | Nur bei bpb-URL aktiv |
| 16 | Sub-Agent bpb_primaerquellen_extraktor (R0.7) | Sub-Agent | **Pipeline-B** | Nur bei bpb-URL aktiv |
| 17 | bpb-Discovery-Mechanismus (R0.7) | Metadata-Feld | **Pipeline-B** | Optionaler Trigger fuer Items 10/14/15/16 |

**Legende:** "Pipeline-B/C" = Komponente des Pilots selbst, nicht Pre-Pilot-Fix. Wird im Pilot-Run erstmals geprueft.

**Summary R0-FINAL+ (17 Items):** 5 A + 12 Pipeline-B/C (davon 2 A-ueberlappend mit v1.3 Delta PI-MV2-EXT3).

---

## 4. Inventur P1-Findings (22), PI-Mapping

14 von 22 P1-Findings sind via v1.3 Delta PI gedeckt (kein separater Eintrag noetig). 8 P1 residual.

| Finding | PI-Coverage | Status |
|---|---|---|
| F-RA1-01 Q-Gate Selbst-PASS-Schleife | kein PI | **A, residual** |
| F-RA1-07 Patch-Persistenz Live-Defekt | PI-PIPELINE-1 + PI-ENGINE-3 | COVERED |
| F-RA1-10 Kompaktions-Drift | PI-PM-1 | COVERED |
| F-RA2-03 aufgabe-3-3 fehlt | kein PI, N-K-spezifisch | **B, residual** |
| F-RA2-09 A18-Verletzung | PI-DIDAKTIK-2 | COVERED |
| F-RA2-10 Sprachniveau-Drift R7 | kein PI | **A, residual** |
| F-RA2-13 Typ vergleich R7-untauglich | PI-DIDAKTIK-1 | COVERED |
| F-RA3-03 Hefteintrag-Dualstruktur | PI-ENGINE-1 | COVERED |
| F-RA3-04 V13-Regression-Anfaelligkeit | PI-ENGINE-2 (SUB_ASSEMBLY_VERIFY) | COVERED |
| F-RA3-07 Data-Validator fehlt Assembly→Deploy | PI-ENGINE-2 | COVERED |
| F-RA4-03 Ersatz-Wahl Marechal didaktisch | PI-MV2-EXT4 (B) | B |
| F-RA4-06 Lizenz-Attribution unvollstaendig | PI-MV2-EXT3 | COVERED |
| F-RA4-11 R0.5 Dual-Kanal nicht implementiert | Teil von R0-FINAL+ Item 6 | **A, residual** |
| F-RA4-12 Ersatz-Workflow Rueckkopplung | PI-MV2-EXT4 (B) | B |
| F-RA4-13 img-2-2 Herkunft ungeklaert | kein PI, N-K-spezifisch | **B, residual** |
| F-RA5-02 Auto-Kompaktions-Summaries unzureichend | PI-PM-1 | COVERED |
| F-RA5-03 STATUS.md nicht Wiederaufsetz-Anker | kein PI | **A, residual** |
| F-RA5-04 Index-Luecke | kein PI, formal | **B, residual** |
| F-RA5-05 Kompaktions-Resilience-Protokoll | verwandt mit PI-PM-1, aber eigenstaendiges Patch-Status-Dump-Element | **A, residual** (Ergaenzung PI-PM-1) |
| F-RA5-06 PI-Zustandsblock nicht synchron | PI-PM-3 | COVERED |
| F-RA5-10 Re-Flag-Events | PI-PM-4 (C) | C |
| F-RA5-11 CC-Rueck-Uebergabe nicht einheitlich | PI-PM-2 | COVERED |

**P1 Residual-Summary:** 8 Items residual — 5 A (F-RA1-01, F-RA2-10, F-RA4-11, F-RA5-03, F-RA5-05), 3 B (F-RA2-03, F-RA4-13, F-RA5-04).

**Hinweis F-RA4-11:** Ueberlappt R0-FINAL+ Item 6. Gemeinsame Implementation.

---

## 5. Inventur P2-Findings (22) + P3-Findings (10)

Komplett-Klassifikation summarisch. Details im BEFUND §11 Anhang A.

**P2-Findings (22) — uebergreifend B, mit Ausnahmen:**
- **Klasse B (20):** Meist Detail-Drifts in N-K-Mappen, nicht pipeline-systematisch. Beispiele: F-RA1-02/04/09/11/12/13, F-RA2-01/02/04/05/08/11/12, F-RA3-02/05/08, F-RA4-07/08/09, F-RA5-01/07/08. Nach Pilot im Post-Mortem bearbeiten.
- **Klasse A-Kandidat (2, grenzwertig):** F-RA3-02 Persistente HTML-Entities Mappe 3 (ueberlappt PI-ENGINE-3 → in A als Teil von PI-ENGINE-3), F-RA3-08 Entity-Scan fehlt Post-Assembly (ueberlappt PI-ENGINE-2 → in A als Teil von PI-ENGINE-2). Keine eigenstaendige A-Eintragung noetig.

**P3-Findings (10) — komplett B:**
F-RA1-03/08, F-RA2-06/07/14/15, F-RA3-06/09, F-RA4-05, F-RA5-09. Alle pilot-tolerabel, im Post-Mortem bearbeiten.

---

## 6. Klasse-A-Konsolidierung (Batch-4-Scope)

Alle A-Items aus §2, §3, §4 dedupliziert und gebuendelt:

### 6.1 Klasse A Code/Schema (Batch-4a — CC-Handoff empfohlen)

| ID | Beschreibung | Aufwands-Schaetzung | Abhaengigkeiten |
|---|---|---|---|
| **A-CODE-1** | PI-MV2-EXT3 CC BY-SA Attribution-Schema + R0-FINAL+ Item 12/13 Lizenz-Pre-Check + medien_katalog_game.json | 3-4h | Schema-Doc + Sub-Agent-Edit + Q-LIZENZ-COMPLIANCE-Gate-Hook |
| **A-CODE-2** | PI-ENGINE-1 Hefteintrag-Dualstruktur-Normierung | 2-3h | Schema-Entscheidung `hefteintrag` vs. `sicherung.hefteintrag`, Migration aller mat-*.json |
| **A-CODE-3** | PI-ENGINE-2 Assembly-Validator ergaenzen (SUB_ASSEMBLY_VERIFY bereits Teil-Gate) | 3-4h | Entity-Scan + Aufgaben-Min-Count + material_referenz-Rueckrefs |
| **A-CODE-4** | PI-ENGINE-3 Entity-Encoding-Hardening Pipeline-Scan-Hook | 2h | UTF-8-Durchlauf Source → Assembly → Deploy, Hard-Gate |
| **A-CODE-5** | PI-DIDAKTIK-1 Typ-Selektions-Katalog R7 in VERTRAG_PHASE_2-2a | 1-2h | R7-Jahrgangs-Constraint-Matrix, Typ `vergleich` erst R8+ |
| **A-CODE-6** | PI-DIDAKTIK-2 A18-Hard-Gate in Phase 2.2 | 1-2h | Rueckref-Pflicht jeder material_referenz |
| **A-CODE-7** | R0-FINAL+ Item 1 Umlaut-Retrofit drei Fragetypen (BEGRUENDUNG, VERGLEICH, QUELLENKRITIK, FREITEXT-Enforcement) | 2h | Template-Saeuberung + O-07-U-B-Checker-Integration |
| **A-CODE-8** | R0-FINAL+ Item 2 O-07-U-B-Checker Pflicht-Gate-Hook | 1-2h | Status optional → Pflicht |
| **A-CODE-9** | R0-FINAL+ Item 9 Pre-Ingest-Titel-Validierung get_summary als Hard-Gate | 1h | Sub-Agent-Invariante Phase 0.2.M |
| **A-CODE-10** | R0-FINAL+ Item 6 / F-RA4-11 Dual-Kanal-Cross-Check (WebFetch+Commons parallel, Ergebnis-Diff = Fail) | 2-3h | Ueber Q-MEDIEN-PROSPEKTIV hinaus |
| **A-CODE-11** | PI-PIPELINE-1 Rest-Fix VERTRAG_PHASE_3-1 DEPLOY-06 Patch-Propagation-Regel | <1h | Vertrags-Edit, source-deploy-parity.sh bereits vorhanden |
| **A-CODE-12** | F-RA1-01 Q-Gate-Mechanik-Verschaerfung (aus Selbst-PASS-Schleife rausloesen) | 2-3h | Q-Gate-Evaluations-Kriterien extern definiert, nicht Sub-Agent-intern |
| **A-CODE-13** | F-RA2-10 Sprachniveau-Gate R7 (Satzlaenge, Fachwortdichte) | 2-3h | Neues Gate oder Erweiterung vorhandenes Gate |

**Batch-4a Total:** 13 Items, **geschaetzt 23-32h CC-Arbeit.** Ein einzelner CC-Run ueberfordert, **Split empfohlen in 2-3 Teil-Batches** oder laengerer Run mit Checkpoints.

### 6.2 Klasse A Prozess/Dokument (Batch-4b — PM-Arbeit in Cowork)

| ID | Beschreibung | Aufwand |
|---|---|---|
| **A-PROZ-1** | PI-PM-1 Post-Kompaktions-Re-Orientation-Protokoll in ANLEITUNG | 30 min |
| **A-PROZ-2** | PI-PM-2 CC→Cowork-Handoff-Template-Pflicht (Template existiert in LEARNINGS §4, als Pflicht-Artefakt in ANLEITUNG verankern) | 30 min |
| **A-PROZ-3** | PI-PM-3 STATUS-Freeze bei Patch-Zyklen als Regel in ANLEITUNG | 15 min |
| **A-PROZ-4** | F-RA5-03 STATUS-als-Wiederaufsetz-Anker-Pflicht in ANLEITUNG | 15 min |
| **A-PROZ-5** | F-RA5-05 Kompaktions-Resilience-Protokoll (Patch-Status-Dump vor Kompaktion) | 30 min |
| **A-PROZ-6** | R0-FINAL+ Item 4 Fiktions-Klausel v3.6-Policy-Revidieren | 1-2h (erfordert Policy-Entscheidung) |

**Batch-4b Total:** 6 Items, **geschaetzt 3-4h PM-Arbeit** (in Cowork, 1 WO-Commit).

### 6.3 Klasse C (Pilot-intern testbar)

- PI-PM-4 Re-Flag-Pattern-Detektor (Wirksamkeit unter Last)
- PI-PM-1 Wirksamkeit (das Protokoll existiert in A-PROZ-1, die Verhaltens-Wirksamkeit ist C)
- Kompaktions-Verhalten generell (CC + Cowork gemeinsam)

---

## 7. Gegenargument + Abweichungs-Pfad

**Gegenargument (fuer reduzierten Batch-4-Scope):**
23-32h CC-Arbeit fuer Batch-4a ist ein 2-3-Tages-Aufwand. Alternative: Nur Kritisch-A (Blocker-Substitute) vor Pilot, Rest nach Pilot mit Priorisierung aus Pilot-Findings.

**Kritisch-A (Minimal-Pre-Pilot):**
- A-CODE-1 (CC BY-SA Schema) — sonst Lizenz-FAIL im Pilot
- A-CODE-2 (Hefteintrag-Dualstruktur) — sonst V13-Regression-Wiederkehr
- A-CODE-5 (Typ R7-Katalog) — sonst didaktisch invalider Pilot
- A-CODE-9 (Titel-Validierung) — sonst Hallu-Risiko sofort
- A-CODE-11 (PIPELINE-1 Rest-Fix) — <1h, Pflicht
- Alle A-PROZ Items (3-4h) — Prozess-Fundament

**Nicht-Kritisch-A (pilot-tolerabel mit dokumentiertem Residual):**
- A-CODE-3/4 Assembly-Validator + Entity-Hardening — SUB_ASSEMBLY_VERIFY als Teil-Gate bereits aktiv, Entity-Drift wird im Pilot sichtbar aber nicht blockierend
- A-CODE-6 A18-Hard-Gate — Manuelle PM-Nachkontrolle im Pilot moeglich
- A-CODE-7/8 Umlaut-Retrofit + O-07-U-B-Checker — im Pilot via explizite Pruefung abfangen
- A-CODE-10 Dual-Kanal-Cross-Check — Q-MEDIEN-PROSPEKTIV + manueller Cross-Check ausreichend fuer Pilot-Bewertung
- A-CODE-12/13 Q-Gate-Verschaerfung + Sprachniveau-Gate — ueber Pilot-Post-Mortem nachziehbar

**Minimal-Pre-Pilot-Aufwand:** ~6 Code-Items (ca. 10-14h CC) + 6 Prozess-Items (3-4h PM) = **1 CC-Run + 1 PM-Session**, realistisch in 2 Tagen machbar.

**Full-Pre-Pilot-Aufwand:** 13 Code + 6 Prozess = **2-3 CC-Runs + 1 PM-Session**, 4-5 Tage.

---

## 8. Empfehlung

**Entscheidungs-Matrix:**

| Pfad | Aufwand | Pilot-Signal-Qualitaet | Risiko |
|---|---|---|---|
| Minimal-Pre-Pilot (A-CODE-1/2/5/9/11 + alle A-PROZ) | 2 Tage | MITTEL-HOCH | Restliche A-Items koennen im Pilot triggern; Pilot-Findings sind interpretierbar wenn Residuals dokumentiert |
| Full-Pre-Pilot (alle A) | 4-5 Tage | HOCH | Pipeline-Hardening vor erster Produktion, aber Verzoegerung + Over-Engineering-Risiko ohne Pilot-Validierung |
| Direkt-Pilot ohne F0.2/F0.3 | 0 Tage | NIEDRIG | Multi-Finding-Run, Ursachen-Attribution schwer, Re-Flag-Pattern wahrscheinlich |

**Empfehlung: Minimal-Pre-Pilot** (Pfad 1). Begruendung:
- Deckt die 5 hoechsten Signal-Verschmutzer ab (Lizenz, Dualstruktur, Typ-R7, Titel-Validierung, Patch-Propagation).
- Alle A-PROZ sind billig und verhindern bekannte Prozess-Fallen.
- Rest-A bleibt dokumentiert als Residual in Pilot-Urteil.
- Verhinderte Verzoegerung: ~3 Tage.
- Pilot liefert Evidenz fuer Priorisierung der Rest-A-Items.

**Alternativ: Full-Pre-Pilot** wenn zeitlich kein Druck und User-Praeferenz fuer maximale Pilot-Ergebnis-Qualitaet.

---

## 9. Nicht-Ziele

- Keine Bewertung der CLOSED-P0-Items (Batch-3 bereits verifiziert).
- Keine Vorwegnahme der Pilot-Wahl F3a/F3b/F3c (Re-Run N-K vs. neuer Pilot) — orthogonale Entscheidung.
- Keine Implementation in dieser Matrix-Datei. Nur Inventur + Klassifikation.
- Keine Bewertung von Plaenen ausserhalb v3.12 (v5 Plugin-Architektur etc.).

---

## 10. Naechste Schritte

1. **User-Entscheidung:** Minimal-Pre-Pilot vs. Full-Pre-Pilot vs. Direkt-Pilot.
2. **Bei Minimal oder Full:** F0.2 = Handoff-Markdown fuer Batch-4a (Code) schreiben, F0.3 = Batch-4b (Prozess) in Cowork direkt umsetzen.
3. **STATUS.md:** Diese Matrix als Referenz in "Naechster Schritt" verankern, Batch-4-Scope dokumentieren.
4. **Nach Batch-4:** F3 Pilot-Wahl (F3a/F3b/F3c) mit sauberem Signal.

---

**Status:** F0.1 DRAFT. Wartet auf User-Entscheidung.
