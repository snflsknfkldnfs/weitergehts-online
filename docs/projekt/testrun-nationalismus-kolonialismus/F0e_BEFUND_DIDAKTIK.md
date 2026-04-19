# F0e — Konsolidierter Didaktischer Befund (Alpha + Beta)

**Version:** 1.0 (2026-04-19)
**Konsolidator:** PM-Cowork
**Quellen:**
- `F0e_BEFUND_DIDAKTIK_alpha.md` (Agent-alpha, 302 Zeilen, 3 neue F-RA6-alpha, COMPLETE)
- `F0e_BEFUND_DIDAKTIK_beta.md` (Agent-beta, 371 Zeilen, 4 neue F-RA6-beta, COMPLETE)
**Verifikation:** 6 Stichproben 100% bestaetigt (siehe F0e_VERIFIKATION_LOG.md oder STATUS-Notiz F0e.2-Verify)
**Zweck:** Single-Source-of-Truth fuer F0e.3 Matrix v2 + F0e.4 Batch-4-Scope
**Scope:** Mappen 1-3 deployed; Mappe 4 explizit OUT-OF-SCOPE

---

## 1. Executive Summary

### 1.1 Konvergenz-Qualitaet
- **Starke Konvergenz** auf 3 PQI-1-Befunde (alpha und beta beide, identische PQI, konsistente Evidenz)
- **Komplementaere Einzelbefunde** von je 1-3 PQI-1-Items pro Agent (je valide, Verifikation bestaetigt)
- **Eine echte Diskrepanz** auf F-RA1-05/06 (Auslegungsdivergenz LP-QM-Pflicht vs. Pipeline-Governance)
- **Keine falsifizierten Claims** — alle stichprobenartig gegen Evidenz gepruefte Findings halten

### 1.2 Konsolidiertes PQI-1-Ranking (11 Items)

| Rang | ID-Konsolidiert | Titel | Quelle | Konvergenz | Treiber |
|---|---|---|---|---|---|
| 1 | **F-RA6-01** | Mappe-4-Genozid-Cliffhanger ohne Resolution | alpha-01 + beta-01 | KONVERGENT | D1, D5, D6 |
| 2 | **F-RA6-02** (= F-RA2-03) | aufgabe-3-3 Deploy-Luecke bricht Bildkritik | alpha-02 + beta-04 | KONVERGENT | D1, D3 |
| 3 | **F-RA3-01** | Lueckentext-Pool-Reset-Bug | alpha + beta | KONVERGENT | D3 |
| 4 | **F-RA6-05** | Ueberleitung mat-3-4→3-5 Bismarck/Leopold-Falschaussage | beta-03 only | BETA-UNIQUE (verifiziert) | D2 |
| 5 | **F-RA4-10** | Hefteintrag M3 Opferperspektive nicht im SCPL-Kern | alpha only | ALPHA-UNIQUE | D1, D6 |
| 6 | **F-RA1-05** | 4-fach Kompetenzstruktur nicht durchgaengig explizit | alpha only | DIVERGENZ | D1 (LP-QM §7.2 QG-02) |
| 7 | **F-RA1-06** | Coverage-Pruefpunkte nicht belegt (CP-8 verfehlt) | alpha only | DIVERGENZ | D1 (LP-QM §7.5 QG-05) |
| 8 | **F-RA4-01** | Hallu-Rate 33% Wikimedia-Dateinamen (latent) | beta only | BETA-STRENGER | D2 |
| 9 | **F-RA4-02** | Kolonialterminologie-Endverifikation offen | alpha only | VERIFY-PENDING | D2, D6 |
| 10 | **F-RA4-04** | Karikaturen-Quellenkritik (gekoppelt an F-RA6-02) | alpha only | ALPHA-UNIQUE | D3 |
| 11 | **F-RA5-09** | Nicht-muttersprachliche SuS / Register-Dichte | alpha only | ALPHA-UNIQUE | D6 |

### 1.3 Konsolidierte PQI-Verteilung

| PQI | Konvergent | Alpha-allein | Beta-allein | Summe |
|---|---|---|---|---|
| 1 (Fundamental) | 3 | 6 | 2 | **11** |
| 2 (Ernsthaft) | ~28 | ~4 | ~4 | ~36 |
| 3 (Kosmetisch/Pipeline) | ~40 | 2 | 2 | ~44 |
| **Total re-klassifiziert** | — | — | — | **91** (60 Findings + 30 PIs + 7 neue F-RA6-X) |

### 1.4 Headline-Kernaussage
Das Produkt ist in Mappe 1+2 didaktisch solide (PQI-Max = 2). **Kritische Defekte konzentrieren sich auf Mappe 3 + Pipeline-Uebergabe**: (a) Mappe-4-Cliffhanger ohne Resolution triggert AP-2-Naherung (LP-QM §6.2.8); (b) aufgabe-3-3-Deploy-Luecke bricht Bildkritik-Kompetenz; (c) Ueberleitungstext behauptet faktisch falsch Bismarck statt Leopold II.; (d) mehrere Coverage-/Strukturpflichten der LP-QM sind nicht explizit belegt. Gesamt-Produkt-PQI-Max = **1**, nicht freigabefaehig ohne A-Klasse-Patches.

---

## 2. Konvergenz-Matrix (neue F-RA6-Findings)

| Konsolidiert-ID | Alpha | Beta | PQI-Alpha | PQI-Beta | Resolution |
|---|---|---|---|---|---|
| **F-RA6-01** | alpha-01 Mappe-4-Cliffhanger | beta-01 Genozid-Cliffhanger | 1 (D1/D3/D5/D6=1) | 1 (D1/D5=1) | KONVERGENT. Uebernehme Alpha-Score (strenger D3=1). Evidenz beidseitig identisch (sicherung.json "besonders brutal"). |
| **F-RA6-02** | alpha-02 aufgabe-3-3-Luecke | beta-04 aufgabe-3-3-Luecke | 1 (D3=1) | 1 (D1/D3=1) | KONVERGENT. Beide stutzen gleiches Evidenzbild (Source vorhanden, Deploy sprung 3-2→3-4). Beta-Score strenger auf D1; uebernehme Beta. Dedup mit F-RA2-03. |
| **F-RA6-03** | alpha-03 Register-Drift | (beta-Pattern P5 + F-RA2-10) | 2 (D6=1 lokal, aber MIN=2) | 2 | KONVERGENT via unterschiedlichem Kanal (alpha als eigenes RA6, beta als Pattern ueber F-RA2-10). Keep als F-RA6-03 PQI-2. |
| **F-RA6-04** | — | beta-02 Erfundene Kompetenz-IDs | — | 2 | BETA-UNIQUE. Verifiziert (grep GPG7_LB2_K in LP-QM = 0 Treffer). Uebernehme PQI-2. |
| **F-RA6-05** | — | beta-03 Bismarck/Leopold | — | 1 (D2=1) | BETA-UNIQUE. Verifiziert (ueberleitungen.json mat-3-4→3-5 zitiert Bismarck; mat-3-4 zeigt Leopold II.). Uebernehme PQI-1. |
| (alpha-03 Register = F-RA6-03) | alpha-03 | — | 2 | — | Siehe F-RA6-03 oben. |

---

## 3. Diskrepanz-Resolution (bestehende 60 Findings)

### 3.1 F-RA1-05 / F-RA1-06 (4-fach-Kompetenzstruktur + Coverage-Pflichten)
- **Alpha:** PQI-1 mit D1=1, unter Verweis auf LP-QM §7.2 QG-02 (4-fach-Check Pflicht je Mappe) und §7.5 QG-05 (CP-Coverage ≥6/10 mit Pflicht-CPs).
- **Beta:** PQI-3 (Pipeline/Governance; "nicht SuS-sichtbarer Defekt").
- **Resolution:** Alpha-Lesart konservativ uebernommen. Begruendung: LP-QM ist **Primaerbezug** per Anleitung; QG-02 und QG-05 sind explizite QM-Tore mit Pflichtcharakter; ihre strukturelle Nichterfuellung ist D1-relevant, auch wenn sie nicht einzel-Schueler-sichtbar ist (sie manifestiert sich als F-RA6-01 und F-RA4-10 Schueler-sichtbar, also Kausalkette existiert). PQI-1 gilt.

### 3.2 F-RA4-01 (Hallu-Rate Wikimedia-Dateinamen)
- **Alpha:** PQI-2 (Wartburgfest-Erklaertiefe, anderer Content-Referenz).
- **Beta:** PQI-1 (D2=1, Hallu-Rate 33% in RA4-Evidenz).
- **Resolution:** Unterschiedliche Content-Interpretation des RA4-01-Labels. Beide Claims valide **auf je ihrer Domaene**. Konsolidiere: **F-RA4-01-Hallu (PQI-1)** = beta-Reading, **F-RA4-01-Wartburgfest (PQI-2)** = alpha-Reading, als getrennte Items fuehren. Vorschlag F0e.3: umnummerieren.

### 3.3 F-RA4-10 (Nummer-Kollision Hefteintrag-Opferperspektive vs. Mappe-4-Retro-Patch)
- **Alpha:** F-RA4-10 = Hefteintrag M3 Opferperspektive nicht im SCPL-Kern. PQI-1 (D1+D6=1).
- **Beta:** F-RA4-10 = Mappe-4-Retro-Patch → OUT-OF-SCOPE.
- **Resolution:** Unterschiedliche Original-Matrix-Bezuege. Alpha-F-RA4-10 bleibt PQI-1 (valides didaktisches Finding). Beta-F-RA4-10 Out-of-Scope-Vermerk in Meta aufnehmen.

### 3.4 F-RA5-09 (Nicht-muttersprachliche SuS)
- **Alpha:** PQI-1 (D6=1, Register-Dichte Mappe 3).
- **Beta:** nicht explizit re-gescored (RA5 alle PQI-3 Cluster).
- **Resolution:** Uebernehme Alpha. Beta hat diesen Audit-Aspekt via Pattern P5 + F-RA2-10 PQI-2 abgedeckt; Alphas strengere D6=1-Einstufung fuer spezifisch DaZ-Gruppe ist valide. PQI-1 gilt.

### 3.5 F-RA4-02 (Kolonialterminologie)
- **Alpha:** PQI-1 mit Verify-Pending-Flag.
- **Beta:** PQI-3 (Pipeline).
- **Resolution:** Alpha-Verify-Pending uebernehmen. Terminologie-Audit (Eingeborene/Haeuptlinge/Schutzgebiet-Kontextualisierung) ist AP-2-relevant. Bei Verifikation PQI-1; falls Verifikation ergibt, dass Mat-3-*-Volltexte sauber distanziert formulieren, Downgrade zu PQI-2. **Aktion F0e.3:** Volltext-Check einplanen.

### 3.6 F-RA2-09 (mat-3-6 Authentizitaet)
- **Alpha:** PQI-2 (Verify-Pending methodisch).
- **Beta:** PQI-2 (Revision gegenueber RA2-v1 Original-Claim, mat-3-6 IST primaer referenziert in aufgabe-3-5).
- **Resolution:** KONVERGENT PQI-2. Beide Reasonings valide, ergaenzen sich (Alpha: methodologische Offenheit fiktive Stimme; Beta: Deploy-Evidenz der Referenz-Tiefe).

### 3.7 F-RA3-02 bis F-RA3-10 (technische Interaktion)
- **Alpha:** durchgehend PQI-2 (D3/D4 minor).
- **Beta:** gemischt PQI-2/3 (F-RA3-02 Entities PQI-2 D6, F-RA3-05 PQI-2 D3, Rest PQI-3).
- **Resolution:** Uebernehme Alpha-Systematik (strenger auf D3/D4-Interaktionsqualitaet), behalte Beta-Details wo spezifischer (F-RA3-02 D6-Accessibility-Zusatz).

---

## 4. Patterns (konsolidiert)

**P1 — Asymmetrische Mappen-Qualitaet:** Mappe 1 + 2 robust (PQI-Max=2), Mappe 3 fragil (PQI-Max=1). Korreliert mit fehlendem DIDAKTIK-Review-Log in Mappe 3 (beta-Befund). Alpha-Pattern "D1+D6-Kopplung bei Kolonialismus" identisches Phaenomen, andere Beschreibung.

**P2 — Source-Deploy-Parity als Haupt-Vektor:** F-RA6-02 (aufgabe-3-3), F-RA3-03 (Hefteintrag-Dual), F-RA6-05 (Ueberleitung) sind alle "Source korrekt, Deploy unvollstaendig/falsch" — Assembly-Validator-Luecke struktureller Pipeline-Defekt mit direkter didaktischer Konsequenz.

**P3 — LP-QM-AP-2-Naherung (Kolonialismus ohne Opferperspektive):** Im Deploy-Zustand aktiv, durch F-RA6-01 + F-RA4-10 + F-RA4-02-Verify-Pending triangulaer verstaerkt. Beide Auditoren identifizieren identische Struktur, unterschiedliche Einzel-Einstiege.

**P4 — Fiktions-Quoten-Risiko:** 4 fiktive Ego-Dokumente in 3 Mappen (mat-1-1, mat-2-3, mat-2-6, mat-3-6). Sauber markiert, aber im Produkt-Ganzen (mit F-RA6-01 Cliffhanger) D2-Druck auf Primaerquellen-Pflicht. R0-FINAL+-04/17 Handling.

**P5 — Register-Drift Mappe 3:** Fachwortdichte systematisch erhoeht ohne Glossar-Kompensation. Alpha als F-RA6-03 / F-RA5-09; Beta als Pattern P5 + F-RA2-10. Resolution: PQI-2 strukturell, PQI-1 fuer DaZ-Untergruppe.

---

## 5. A-Klasse-Empfehlung (konsolidiert, testrun-blockierend)

| Rang | ID | Quelle | Massnahme | Aufwand | Trigger-Prob |
|---|---|---|---|---|---|
| **A1** | F-RA6-02 | konvergent | aufgabe-3-3.json aus Source in data.json uebernehmen (mechanisch) | 15 Min | 90% |
| **A2** | F-RA6-05 | beta-unique verifiziert | ueberleitungen.json mat-3-4→3-5: "Bismarck verteilte Afrika..." → "Leopold II. und die europaeischen Herrscher verteilten Afrika..." | 10 Min | 60% |
| **A3** | F-RA6-01 | konvergent | Option (a) Cliffhanger-Entschaerfung in sicherung.json + Mappe-3-Abschluss mit Opferperspektive-Vertiefung ODER (b) Mappe 4 deployen | (a) 60 Min, (b) 3-4 h | 80% |
| **A4** | F-RA3-01 | konvergent | Engine-Patch escape-engine.js:2814 Lueckentext-Pool-Reset | 30 Min | 100% |
| **A5** | F-RA4-10 | alpha-unique | Hefteintrag M3 SCPL-Problem-Satz um afrikanische Stimme ergaenzen (knoten k3-6 umschreiben) | 45 Min | 70% |
| **A6** | F-RA4-02 | alpha-Verify-Pending | Mat-3-*-Volltexte auf "Eingeborene"/"Haeuptlinge"/"Schutzgebiet" ohne Anfuehrungszeichen scannen; ggf. Kontextualisierung ergaenzen | 20 Min Scan + 30 Min Patch | 50% |
| **A7** | F-RA4-01-Hallu | beta-unique | Assembly-Validator + Pre-Ingest-Titel-Validierung (PI-ENGINE-2) aktivieren (latentes Re-Assembly-Risiko) | 2 h | 30% (nur bei Re-Assembly) |
| **A8** | F-RA1-05 + F-RA1-06 | alpha-unique, gebuendelt | Coverage-Report-Generator + Perspektiv-Inventar-Matrix (PI-v1.3-06 + R0-FINAL+-05 + R0-FINAL+-17 gekoppelt) | 4 h | — (struktureller Pre-Pilot-Pflichtteil) |
| **A9** | F-RA5-09 / F-RA6-03 | alpha-unique, gebuendelt | Mappe-3-Fachwortglossar oder Paraphrasen-Layer (R0-FINAL+-09) | 2 h | 70% fuer DaZ-Gruppe |

**Vor Pilot absolute Pflicht:** A1 + A2 + A3 + A4 (alle konvergent PQI-1, realistisch umsetzbar in ≤ 2 h Gesamt).
**Vor Pilot stark empfohlen:** A5 + A6 + A9 (didaktisch substantiell, ≤ 4 h).
**Vor Pilot strukturell empfohlen:** A8 (Coverage-Beleg, strategische Freigabe-Voraussetzung).
**Optional bzw. Batch 5:** A7 (Re-Assembly-Hardening).

---

## 6. OUT-OF-SCOPE und Verify-Pending

### 6.1 OUT-OF-SCOPE (nicht in dieser Konsolidierung bewertet)
- F-RA4-10-Beta (Mappe-4-Retro-Patch) — Mappe 4 scope-exkludiert
- PI-MV2-EXT2 (Mappe-4-Retro-Patch) — analog
- R0-FINAL+-#7 (Plan-vs-Wirklichkeit M4-Vergleich) — analog

### 6.2 Verify-Pending (nachzuziehen in F0e.3 oder spaeter)
1. **F-RA4-02** Kolonialterminologie-Volltextscan (Mat-3-1..3-6).
2. **F-RA2-09** methodologische QM-Frage: reicht fiktive afrikanische Stimme bei duenner Quellenlage? Entscheidungslog eintragen.
3. **F-RA6-beta-05** (Beta-Offene Frage): Source-Inkonsistenz Mappe 3 hefteintrag-knoten (k3-2 Imperialismus fehlt im knoten-Array). Deploy-Rendering pruefen.

---

## 7. Verankerungs-Hinweise (fuer F0e.3 + F0e.4)

- **F0e.3 Matrix v2 Input:** Nutze diese Konsolidierung als Achse "Konsolidierter PQI" + "Alpha/Beta-Quelle" + "Konvergenz-Status". Die beiden Befund-Files bleiben Detailquelle fuer Dimensionen-Begruendungen.
- **F0e.4 Scope-Recommendation Input:** A-Klasse §5 ist direkt uebernehmbar. Aufwandsschaetzungen beidseitig plausibilisiert.
- **F0e.5 Commit-Bundle:** Diese Datei + Matrix v2 + Scope-Recommendation v2 + STATUS-Update + CHANGELOG-Eintrag.

---

## 8. Meta

**Unabhaengigkeits-Verifikation:** Beide Auditoren haben unabhaengig gearbeitet (alpha §7.2, beta §7 dokumentieren Nicht-Lesen des jeweils anderen Befunds). Konvergenz auf 3 PQI-1-Items ist damit **echte unabhaengige Validierung**, nicht Echoeffekt.

**Verifikations-Log:** 6 Stichproben gegen Source-Evidenz (2026-04-19):
- Cliffhanger-Text in sicherung.json = BESTAETIGT
- aufgabe-3-3-Luecke in data.json (nur 3-1/2/4/5) = BESTAETIGT
- Bismarck/Leopold-Inkonsistenz in ueberleitungen.json + mat-3-4 = BESTAETIGT
- Erfundene GPG7_LB2_K_04/05 IDs (0 Treffer in LP-QM) = BESTAETIGT
- mat-3-6 als Primaer-Referenz in aufgabe-3-5 (Revision F-RA2-09 korrekt) = BESTAETIGT
- aufgabe-3-3 Source-Typ "begruendung" (Retro-Fix F-RA2-13) = BESTAETIGT

**Konsolidator-Einschaetzung:** Audit-Qualitaet beidseitig hoch; kein Echo, klare Konvergenz auf die kritischsten Defekte, komplementaere Einzelbefunde erhoehen Coverage signifikant. Duales Audit-Protokoll als Methode validiert.

**STATUS: COMPLETE — Konsolidierung abgeschlossen, Input fuer F0e.3 freigegeben.**
