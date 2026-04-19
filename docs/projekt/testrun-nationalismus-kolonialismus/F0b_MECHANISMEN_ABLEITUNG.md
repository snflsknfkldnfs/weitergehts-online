# F0b Mechanismen-Ableitungs-Matrix v2

**Status:** DRAFT v2 (F0b.1 — Pools entfernt, Prevent-first-Architektur)
**Erstellt:** 2026-04-19 / Rewrite 2026-04-19 Session 29
**Input:** Matrix v2.1 §6.1 (PQI-1 Findings), N-K Mappe 3 Testrun-Audit F0e.2 + F0e.2b
**Zweck:** Systematische Ableitung praeventiver Infrastruktur-Mechanismen aus Testrun-Findings unter Beruecksichtigung Zielsystem-Durchsetzbarkeit und Drift-Resistenz.
**Ebenen-Klarstellung:** Content-Patch-Hypothesen sind ANALYTISCHE GRUNDLAGE. Sie werden NICHT im Testrun-Artefakt ausgefuehrt. Jede Hypothese muendet in einen abgeleiteten Mechanismus im Generator-Infrastruktur-Stack.
**Architektur-Entscheidung v2:** Kein themenspezifischer Pool-Ansatz. Generator bleibt themen-unspezifisch. QM wird prozessual an der produzierenden Stelle verankert (Prevent-first), nicht nachtraeglich durch Vorrats-Inhalte absorbiert.

---

## 1. Methodik

### 1.1 Ableitungs-Spuren (9 Spalten)

| Spalte | Inhalt |
|---|---|
| **Finding-ID** | Referenz auf Matrix v2.1 §6.1 (A1-A21) + F-RA-Original |
| **PQI** | Produkt-Qualitaets-Impact 1-3 (nur PQI-1 in dieser Matrix) |
| **Patch-Hypothese (Analyse)** | Wie wuerde der Content-Patch aussehen? Analyse-Input, NICHT zur Ausfuehrung |
| **Abgeleiteter Mechanismus** | Praeventive Infrastruktur-Aenderung, themen-unspezifisch |
| **Haerte-Stufe** | 1-5 (siehe §1.2) |
| **Zielsystem-Durchsetzbarkeit** | Kann Mittelschul-R7-Lehrkraft mit typischem Fachdidaktik-Niveau den Mechanismus korrekt bedienen/befuellen? |
| **Drift-Fail-Safe** | Was passiert bei unzureichender Befuellung? Hard-Block / Silent-Degrade / Warning |
| **Ziel-Repo:Artefakt** | wo die Aenderung lebt |
| **Implementierungs-Kanal** | Cowork-Doc / CC-Handoff-Code / Beides |

### 1.2 Haerte-Stufen (Drift-Resistenz-Hierarchie)

```
Haerte 1: Schema-Validation           (Befuellung blockiert via JSON-Schema)
Haerte 2: Sub-Agent-Invariante        (Generator-Phase-Fail ohne korrekten Input)
Haerte 3: Q-Gate Auto-Check           (Pre-Flight-Block im LP-QM)
Haerte 4: Pflicht-Template            (Default-Werte + Pflichtfelder)
Haerte 5: Checkliste/Prosa            (nur wenn Automatisierung nicht sinnvoll)
```

### 1.3 Verankerungs-Prinzipien (neu in v2)

**Kein themenspezifischer Pool.** Generator bleibt themen-unspezifisch. Qualitaets-Risiken werden durch Prozess-Verankerung addressiert, nicht durch vorkuratierte Inhalts-Bestaende.

**Prevent-first-Stack pro Risiko:**
```
Priming-Artefakt Sub-Agent    ← PREVENT (aktive Formung im Input)
         ↓
Post-Generation-Gate          ← DETECT (Regeneration bei Violation)
         ↓
Vertrag der Phase             ← VERANKERN (Phase-Fail-Bedingung)
         ↓
LP-QM Q-Gate                  ← GATE (Pre-Deploy-Block)
```

**Wechselwirkung:** Prevent dominiert, Detect+Gate sind Absicherungs-Ebenen.

### 1.4 Scope-Abgrenzung

**IN Scope (F0b):** 9 PQI-1 Findings + vorgezogenes A-CODE-3 Entity-Scan (M11).
**OUT of Scope:** A-CONTENT-*-Items als Ausfuehrung (nur als Analyse-Input). Neu-Generierung Mappe 3 (v3.12-Pilot). PQI-2/PQI-3 Items (A7, A9-A19 ausser A-CODE-3, A-PROZ).

---

## 2. Ableitungs-Matrix (9 PQI-1 Findings + vorgezogenes M11)

### 2.1 Cluster A — Fehlende Content-Teile / Kohaerenz-Bruch

#### A1 — F-RA6-02: aufgabe-3-3 fehlt in data.json → M1

| Feld | Wert |
|---|---|
| **Finding-ID** | A1 / A-CONTENT-1 / F-RA6-02 |
| **PQI** | 1 |
| **Patch-Hypothese (Analyse)** | aufgabe-3-3 aus Source-JSON in data.json uebernehmen. Symptom: Deploy-Artefakt inkonsistent zur Source. |
| **Abgeleiteter Mechanismus** | **M1 Deploy-Parity-Gate** (`source-deploy-parity.sh` als Pflicht-Hook in `VERTRAG_PHASE_3-1 DEPLOY-01`): jeder Deploy-Pass prueft byte-level dass alle aufgabe-*-Knoten aus Source in data.json landen. Fehlmenge → Deploy-Abbruch mit Diff-Report. |
| **Haerte-Stufe** | **2** (Sub-Agent-Invariante: Deploy-Phase-Fail) |
| **Zielsystem-Durchsetzbarkeit** | Vollautomatisch, Lehrkraft unbeteiligt. |
| **Drift-Fail-Safe** | Hard-Block mit Diff-Report. |
| **Ziel-Repo:Artefakt** | escape-game-generator:`scripts/source-deploy-parity.sh` + `VERTRAG_PHASE_3-1.md` DEPLOY-01 Hook |
| **Implementierungs-Kanal** | CC-Handoff (Shell-Script), Cowork-Doc (Vertrags-Edit) |

---

#### A2 — F-RA6-05: ueberleitungen.json falsche Figur → M2 (haengt an M11)

| Feld | Wert |
|---|---|
| **Finding-ID** | A2 / A-CONTENT-2 / F-RA6-05 |
| **PQI** | 1 |
| **Patch-Hypothese (Analyse)** | Ueberleitung mat-3-4→3-5 "Bismarck" statt "Leopold II.". Symptom: Ueberleitung referenziert falsche Akteur-Figur, Narrativ-Bruch. |
| **Abgeleiteter Mechanismus** | **M2 Sub-Agent-Invariante UEBERLEITUNG-01**: Generator-Phase "Ueberleitungen generieren" prueft pro Ueberleitung dass referenzierte Personen/Akteure in BEIDEN Bruecken-Mappen-Knoten (From+To) existieren. Named-Entity-Match gegen `entities.json` der jeweiligen Mappe (bereitgestellt durch M11). Bei Mismatch → Phase-Fail + Regenerations-Anforderung. |
| **Haerte-Stufe** | **2** (Sub-Agent-Invariante, hart durch M11) |
| **Zielsystem-Durchsetzbarkeit** | Vollautomatisch, Lehrkraft unbeteiligt. `entities.json` wird von M11 automatisch befuellt. |
| **Drift-Fail-Safe** | Hard-Block via Phase-Fail. Kein weicher Fallback mehr noetig (M11 in F0b vorgezogen). |
| **Ziel-Repo:Artefakt** | escape-game-generator:`VERTRAG_PHASE_2.md` + `SUB_ASSEMBLY_VERIFY` Extension + sub-agent-prompts/ueberleitung.md |
| **Implementierungs-Kanal** | Cowork-Doc (Vertrag + Invariante), CC-Handoff (Validator-Code) |

---

#### A3 — F-RA6-01: Multiperspektiv-Coverage Mappen-Abschluss → M3

| Feld | Wert |
|---|---|
| **Finding-ID** | A3 / A-CONTENT-3 / F-RA6-01 |
| **PQI** | 1 |
| **Patch-Hypothese (Analyse)** | Mappe-3-Abschluss ohne Opferperspektive-Vertiefung. Cliffhanger unentschaerft. Symptom: LP-QM CP-8 (Opferperspektive Pflicht) verletzt. |
| **Abgeleiteter Mechanismus** | **M3 Q-Gate QG-06 "Multiperspektiv-Coverage"** (neu in LP-QM §7) + Trigger-Detector. Bei aktivem Trigger (themen-unspezifische Kategorien: Konflikt, Macht-Asymmetrie, Unterdrueckung, Gewalt) prueft das Gate gegen `perspektiv_inventar` der Mappe (siehe M9) dass minimum N Perspektiven bedient sind UND der Abschluss-Knoten mindestens eine betroffenen-seitige Quelle referenziert. Trigger-Detection: (a) Pflichtfeld `guetekriterien_trigger` im Mappen-Manifest (Lehrkraft-Input) + (b) heuristischer Trigger-Detector scannt Mappen-Titel/Lernziel auf Schluesselwort-Liste (themen-unspezifisch kuratiert: z.B. "Konflikt", "Unterdrueckung", "Gewalt") und setzt Flag automatisch bei Fehl-Klassifikation. **Kein themen-spezifischer Inhalts-Pool.** |
| **Haerte-Stufe** | **3** (Q-Gate Auto-Check, Pre-Deploy-Block) |
| **Zielsystem-Durchsetzbarkeit** | Mittel. Doppel-Fail-Safe: Lehrkraft-Flag + Heuristik-Detector kompensieren Fehl-Klassifikation. |
| **Drift-Fail-Safe** | Hard-Block bei fehlender Coverage. Trigger-Doppel-Detect vermeidet Silent-Skip. |
| **Ziel-Repo:Artefakt** | escape-game-generator:`docs/LP_QM.md` §7 QG-06 + `scripts/trigger-detector.sh` + `schemas/mappe_metadata.json` Pflichtfeld `guetekriterien_trigger` + `curated_lists/trigger_keywords.json` (themen-unspezifisch, nur Kategorie-Keywords) |
| **Implementierungs-Kanal** | Cowork-Doc (LP-QM §7 Edit + Kategorie-Keyword-Liste), CC-Handoff (Trigger-Detector + Schema-Extension) |

---

#### A5 — F-RA4-10: Material ohne Opferperspektive → M4

| Feld | Wert |
|---|---|
| **Finding-ID** | A5 / A-CONTENT-4 / F-RA4-10 |
| **PQI** | 1 |
| **Patch-Hypothese (Analyse)** | Hefteintrag M3 k3-6 ohne betroffenen-seitige Stimme. Symptom: AP-2 (Perspektiv-Defizit) im Material. |
| **Abgeleiteter Mechanismus** | **M4 Sub-Agent-Invariante MATERIAL-PERSPEKTIV-01** (Phase 2.3 Material-Generation). Bei aktivem Trigger (M3) erhaelt der Material-Sub-Agent im Priming den festen Auftrag, ein Material-Tupel (minimum Akteur-Perspektive + betroffene Perspektive + Beobachter-Perspektive) zu erzeugen, nicht ein Einzel-Material. Pro Perspektive muss der Sub-Agent eine verifizierbare Quelle referenzieren; Quelle wird via `get_summary`/WebSearch zur Laufzeit verifiziert (analog M7 Titel-Validierung). **Kein kuratierter Opferperspektive-Pool.** Generator recherchiert pro Lauf. Fehlt Quelle oder Perspektive → Phase-Fail + Regeneration. |
| **Haerte-Stufe** | **2** (Sub-Agent-Invariante, Phase-Fail) |
| **Zielsystem-Durchsetzbarkeit** | Vollautomatisch auf Sub-Agent-Ebene. Lehrkraft muss nur Trigger-Flag korrekt setzen (via M3 Doppel-Detect abgesichert). |
| **Drift-Fail-Safe** | Hard-Block via Phase-Fail. Regenerations-Loop mit Fail-Report an Sub-Agent. |
| **Ziel-Repo:Artefakt** | escape-game-generator:`sub-agent-prompts/materialdarstellung.md` (Priming-Block Multiperspektiv-Protokoll) + `VERTRAG_PHASE_2-3.md` Invariante MATERIAL-PERSPEKTIV-01 |
| **Implementierungs-Kanal** | Cowork-Doc (Invariante + Priming-Block), CC-Handoff (Sub-Agent-Prompt-Edit + Quellen-Verifikations-Hook) |

---

### 2.2 Cluster B — Engine/Pipeline-Korrektheit

#### A4 — F-RA3-01: Engine Lueckentext-Pool-Reset → M5

| Feld | Wert |
|---|---|
| **Finding-ID** | A4 / A-CODE-14 / F-RA3-01 |
| **PQI** | 1 |
| **Patch-Hypothese (Analyse)** | `escape-engine.js:2814` Lueckentext-Pool-Reset fehlt. Engine-Bug. |
| **Abgeleiteter Mechanismus** | **M5 Engine-Fix + CI-Test**: Pool-Reset-Logik + Jest-Test `engine.lueckentext.poolreset.test.js` in Pre-Deploy-CI. |
| **Haerte-Stufe** | **1** (CI-Block bei Test-Fail) |
| **Zielsystem-Durchsetzbarkeit** | Vollautomatisch, Lehrkraft unbeteiligt. |
| **Drift-Fail-Safe** | CI-Block. |
| **Ziel-Repo:Artefakt** | escape-game-generator:`engine/escape-engine.js` + `tests/engine.lueckentext.poolreset.test.js` + `.github/workflows/ci.yml` |
| **Implementierungs-Kanal** | CC-Handoff (Engine-Fix + Test) |

---

### 2.3 Cluster C — Sensible Terminologie

#### A6 — F-RA4-02: Terminologie-Scan → M6

| Feld | Wert |
|---|---|
| **Finding-ID** | A6 / A-VERIFY-1 / F-RA4-02 |
| **PQI** | 1 [VP] |
| **Patch-Hypothese (Analyse)** | Mat-3-Volltextscan problematische Kolonialterminologie. Ggf. Kontextualisierungs-Patch. |
| **Abgeleiteter Mechanismus** | **M6 Sub-Agent-Invariante TERMINOLOGIE-01 + Q-Gate QG-07**. Neuer Terminologie-Check-Sub-Agent in Phase 2.3: erhaelt pro Lauf einen LLM-generierten, themen-spezifischen Scan-Auftrag basierend auf `guetekriterien_trigger` + Mappen-Lernziel. Der Sub-Agent identifiziert themen-relevante sensible Begriffe selbst und validiert sie gegen Wikipedia/WebSearch-Kontext. **Kein statischer Blacklist-Pool.** Bei Treffer: Kontextualisierungs-Marker mit strukturiertem Schema (Anfuehrungszeichen + Quellen-Fussnote + didaktische Einordnung als Pflicht-Felder) muss gesetzt sein. Schema-Validator blockt unstrukturierte Kontextualisierung. |
| **Haerte-Stufe** | **2+3** (Invariante blockt ohne Marker + Q-Gate bei Haeufung) |
| **Zielsystem-Durchsetzbarkeit** | Vollautomatisch, themen-unspezifisch. Generator scannt sich selbst pro Lauf. |
| **Drift-Fail-Safe** | Hard-Block. Kontextualisierungs-Marker-Syntax in Schema vorgegeben. |
| **Ziel-Repo:Artefakt** | escape-game-generator:`sub-agent-prompts/terminologie.md` + `docs/LP_QM.md` §7 QG-07 + `schemas/material_source.json` Kontextualisierungs-Marker-Struktur + `VERTRAG_PHASE_2-3.md` Invariante TERMINOLOGIE-01 |
| **Implementierungs-Kanal** | Cowork-Doc (LP-QM + Priming + Vertrag + Schema), CC-Handoff (Schema-Validator-Hook) |

---

### 2.4 Cluster D — Generator-Infrastruktur

#### A8 — F-RA4-01-Hallu: Pre-Ingest-Titel-Validierung → M7

| Feld | Wert |
|---|---|
| **Finding-ID** | A8 / A-CODE-9 / F-RA4-01-Hallu / R0-FINAL+-09 |
| **PQI** | 1 |
| **Patch-Hypothese (Analyse)** | Generator halluzinierte Buchtitel. Pre-Ingest-Validierung fehlt. |
| **Abgeleiteter Mechanismus** | **M7 Sub-Agent-Invariante Phase-0.2.M "Titel-Validierung"**: jede referenzierte Primaer-/Sekundaerliteratur wird gegen Wikipedia `get_summary` gepruefen, Fallback Commons/OpenLibrary. No-Match in beiden → Phase-Fail. |
| **Haerte-Stufe** | **2** |
| **Zielsystem-Durchsetzbarkeit** | Vollautomatisch. |
| **Drift-Fail-Safe** | Hard-Block mit Titel-Report. |
| **Ziel-Repo:Artefakt** | escape-game-generator:`sub-agent-prompts/ingest.md` + `scripts/titel-validator.js` + `VERTRAG_PHASE_0.md` |
| **Implementierungs-Kanal** | Cowork-Doc (Vertrag), CC-Handoff (Validator-Code) |

---

#### A20 — F-RA2-10 / F-RA6-03 / F-RA5-09: Sprachniveau R7 + Fachwortglossar → M8' (Prevent-first-Stack)

| Feld | Wert |
|---|---|
| **Finding-ID** | A20 / A-CODE-13 / F-RA2-10 / F-RA6-03 / F-RA5-09 |
| **PQI** | 1 (DaZ-D6) |
| **Patch-Hypothese (Analyse)** | Material-Texte ueberschreiten R7-Sprachniveau. Fachwort-Glossar fehlt. Symptom: DaZ + schwache R7-Lerner ueberlastet. |
| **Abgeleiteter Mechanismus** | **M8' Sprachniveau 5-Ebenen-Stack (Prevent-first).** Sprachniveau wird praeskriptiv-formend waehrend der Generation durchgesetzt, nicht nachtraeglich korrigiert. |
| **Haerte-Stufe** | **1+2+3+5 kombiniert** |

**Stack-Details:**

**Ebene 1 (NEU) — Normativer Vertrag `VERTRAG_SPRACHNIVEAU_R7.md`**
Generator-Repo. Enthaelt:
- Praeskriptive Formungs-Direktiven (nicht nur Metrik-Grenzen): "Formuliere kurze Hauptsatz-Ketten. Vermeide nominale Umstaende. Verwende aktive Verbformen. Waehle konkrete Substantive vor abstrakten."
- Stilproben Positiv/Negativ pro Texttyp (Aufgabenstellung, Hefteintrag, Sicherung, Dialog, Ueberleitung).
- DaZ-Sensitivitaets-Regeln (Fachwort-Einfuehrung vor Gebrauch, Kompositum-Aufloesung als Wahlpflicht).
- Harte Metrik-Grenzen als Validierungs-Anker: Satzlaenge ≤15 Worte, Fachwort-Dichte ≤12% gegen R7-Kern-Wortschatz, Kompositum-Laenge ≤4 Morpheme.
- Themen-unspezifisch, generisch-didaktische Norm.

**Ebene 2 — Priming-Include in Frontend-facing Sub-Agents**
Feste Include-Direktive:
```
[INCLUDE: VERTRAG_SPRACHNIVEAU_R7.md]
Dein Output wird anhand dieser Direktiven bewertet und bei Abweichung verworfen.
Wende die Formungs-Regeln WAEHREND der Generierung an, nicht nachtraeglich.
```
Scope-Liste Priming-Pflicht:
- Material-Erstellung (Phase 2.3)
- Hefteintrag-Generierung (Phase 2.4)
- Aufgabenstellungs-Generator (Phase 2.5)
- Ueberleitungs-Generator (Phase 2.6)
- Sicherungs-Generator (Phase 2.7)
- Dialog/Begleitungs-Text (falls vorhanden)

NICHT Priming-Pflicht (intern / Lehrkraft-facing): Q-Gate-Reports, Logs, Lehrkraft-Doku.

**Ebene 3 — Post-Gen-Gate (Detect-Redundanz)**
`scripts/sprachniveau-gate.js` validiert pro Output gegen Metrik-Grenzen. Bei Violation → Regenerations-Request mit konkretem Fail-Report ("Satz X hatte 23 Worte, kuerzen"). Sub-Agent lernt iterativ aus Fail-Feedback.

**Ebene 4 — Vertragliche Verankerung (VERTRAG_PHASE_2 Meta-Invariante)**
Orchestrator-Pre-Flight prueft, dass alle Frontend-facing Sub-Agents die Include-Direktive tragen. Phase-Start blockiert bei fehlender Verankerung.

**Ebene 5 — LP-QM Q-Gate QG-Sprachniveau-R7**
Pre-deploy aggregierter Coverage-Report ueber alle Sichtstruktur-Outputs. Deploy-Block bei Gesamt-Violation-Rate >5%.

**Glossar-Mechanik:**
Schema-Pflicht `glossar_template.json` als Pflicht-Begleiter pro Mappe. Generator befuellt automatisch: pro Material-Text werden alle Fachwoerter (Dichte-Check > Schwellwert) mit R7-Kurz-Definition aus `wortschatz_r7_core.json`-Referenz-Check + `get_summary`-basierten Kurz-Definitionen versehen. Lehrkraft muss nichts manuell pflegen. `wortschatz_r7_core.json` ist KEIN themen-spezifischer Pool, sondern linguistischer Referenz-Datensatz fuer Metrik (Fachwort-Dichte-Berechnung).

| Feld | Wert |
|---|---|
| **Zielsystem-Durchsetzbarkeit** | Vollautomatisch (Prevent+Detect). Lehrkraft unbeteiligt. |
| **Drift-Fail-Safe** | 4-fach redundant: Priming-Prevent + Post-Gate-Detect + Phase-Invariante + Q-Gate-Deploy-Block. |
| **Ziel-Repo:Artefakt** | escape-game-generator:`VERTRAG_SPRACHNIVEAU_R7.md` (NEU) + Priming-Edits aller Frontend-facing Sub-Agent-Prompts + `scripts/sprachniveau-gate.js` + `schemas/glossar_template.json` + `schemas/material_text.json` Pflicht-Rueckref + `curated_lists/wortschatz_r7_core.json` + `VERTRAG_PHASE_2.md` Meta-Invariante + `docs/LP_QM.md` §7 QG-Sprachniveau |
| **Implementierungs-Kanal** | Cowork-Doc (Vertrag SPRACHNIVEAU_R7 + LP-QM + Meta-Invariante + R7-Wortschatz), CC-Handoff (Gate-Script + Glossar-Auto-Befueller + Sub-Agent-Prompt-Edits) |

---

#### A21 — F-RA1-05 + F-RA1-06: Perspektiv-Inventar + Coverage-Report → M9 (mit 5c Inline-Tag)

| Feld | Wert |
|---|---|
| **Finding-ID** | A21 / F-RA1-05 / F-RA1-06 / R0-FINAL+-05 / R0-FINAL+-17 |
| **PQI** | 1 |
| **Patch-Hypothese (Analyse)** | Kein strukturelles Perspektiv-Inventar pro Mappe. Coverage-Beleg fehlt. |
| **Abgeleiteter Mechanismus** | **M9 Schema `perspektiv_inventar.json` + `scripts/coverage-report.sh` + Inline-Tag-Pflicht (5c).** Mappe deklariert im Manifest Perspektiv-Achsen (Minimum 3 von {Taeter, Opfer, Beobachter, Wirtschaft, Kultur, Geographie}). **Material-Erstellungs-Sub-Agent setzt Perspektiv-Tags inline im Output-Schema als Pflicht-Enum-Array** (`schemas/material_source.json` Pflichtfeld `perspektiv_tags`). Keine LLM-Tag-Suggest-Mehrkosten, keine Lehrkraft-Tag-Pflege. Coverage-Report-Generator aggregiert Tags pro Mappe und prueft Achsen-Minimum. Fehlt → Hard-Block. |
| **Haerte-Stufe** | **1+3** (Schema-Enum-Pflicht + Q-Gate-Coverage) |
| **Zielsystem-Durchsetzbarkeit** | Vollautomatisch. Schema-Enum-Restriktion auf 6 Achsen, keine Frei-Tags. Sub-Agent-seitige Tag-Erzeugung, Lehrkraft unbeteiligt. |
| **Drift-Fail-Safe** | Hard-Block via Schema-Enum + Q-Gate. Visual Coverage-Report zeigt fehlende Achsen explizit. |
| **Ziel-Repo:Artefakt** | escape-game-generator:`schemas/perspektiv_inventar.json` + `schemas/material_source.json` Pflichtfeld `perspektiv_tags` (Enum) + `scripts/coverage-report.sh` + `docs/LP_QM.md` §7 Coverage-Gate + Priming-Edit Material-Sub-Agent (Tag-Output-Pflicht) |
| **Implementierungs-Kanal** | Cowork-Doc (Schema + LP-QM), CC-Handoff (Coverage-Report-Script + Priming-Edit) |

---

#### [NEU in F0b] — A-CODE-3 Assembly-Validator Entity-Scan → M11

| Feld | Wert |
|---|---|
| **Finding-ID** | A-CODE-3 (PI-ENGINE-2, vorgezogen aus PQI-2) |
| **PQI** | 2 (regulaer) — in F0b vorgezogen weil M2 hart-Variante darauf baut |
| **Patch-Hypothese (Analyse)** | Assembly-Phase soll pro Mappe automatisch ein `entities.json`-Register erzeugen (Named-Entity-Scan ueber alle Material-/Hefteintrag-/Aufgaben-Texte). |
| **Abgeleiteter Mechanismus** | **M11 Assembly-Validator Entity-Scan**: Neue Invariante in Phase 2.8 (Assembly). Named-Entity-Recognition-Pass (LLM oder spaCy-basiert) ueber alle Mappen-Texte. Ergebnis als `entities.json` pro Mappe persistiert (Personen, Institutionen, Orte, Ereignisse). Ermoeglicht M2 (Ueberleitung-Integritaet) und M9 (Perspektiv-Inventar-Cross-Check). |
| **Haerte-Stufe** | **2** (Sub-Agent-Invariante in Assembly) |
| **Zielsystem-Durchsetzbarkeit** | Vollautomatisch. |
| **Drift-Fail-Safe** | Phase-Fail bei Scan-Error. |
| **Ziel-Repo:Artefakt** | escape-game-generator:`scripts/entity-scanner.js` + `schemas/entities.json` + `VERTRAG_PHASE_2-8.md` + `SUB_ASSEMBLY_VERIFY` Extension |
| **Implementierungs-Kanal** | CC-Handoff (Entity-Scanner-Code + Schema), Cowork-Doc (Vertrags-Edit) |

---

## 3. Aggregation: 11 abgeleitete Mechanismen

| # | Mechanismus | Haerte | Ursprungs-Finding | Ziel-Artefakt |
|---|---|---|---|---|
| M1 | Deploy-Parity-Gate | 2 | A1 | scripts/source-deploy-parity.sh + VERTRAG_PHASE_3-1 |
| M2 | Invariante UEBERLEITUNG-01 (hart via M11) | 2 | A2 | VERTRAG_PHASE_2 + SUB_ASSEMBLY_VERIFY |
| M3 | Q-Gate QG-06 Multiperspektiv-Coverage + Trigger-Detector (ohne Pool) | 3 | A3 | LP_QM §7 + scripts/trigger-detector.sh + schemas/mappe_metadata.json + curated_lists/trigger_keywords.json |
| M4 | Invariante MATERIAL-PERSPEKTIV-01 (Priming-Auftrag + Quellen-Verifikation) | 2 | A5 | sub-agent-prompts/materialdarstellung.md + VERTRAG_PHASE_2-3 |
| M5 | Engine-Fix Lueckentext-Pool-Reset + CI-Test | 1 | A4 | engine/ + tests/ + CI |
| M6 | Invariante TERMINOLOGIE-01 + QG-07 (LLM-Scan-Auftrag pro Lauf) | 2+3 | A6 | sub-agent-prompts/terminologie.md + LP_QM §7 + schemas/material_source.json + VERTRAG_PHASE_2-3 |
| M7 | Invariante Phase-0.2.M Titel-Validierung | 2 | A8 | sub-agent-prompts/ingest.md + scripts/titel-validator.js + VERTRAG_PHASE_0 |
| M8' | **Sprachniveau 5-Ebenen-Stack (Prevent-first)** | 1+2+3+5 | A20 | VERTRAG_SPRACHNIVEAU_R7 (NEU) + Priming-Edits Frontend-Sub-Agents + scripts/sprachniveau-gate.js + schemas/glossar_template.json + schemas/material_text.json + curated_lists/wortschatz_r7_core.json + VERTRAG_PHASE_2 Meta + LP_QM §7 |
| M9 | Schema perspektiv_tags (5c inline) + coverage-report.sh | 1+3 | A21 | schemas/perspektiv_inventar.json + schemas/material_source.json + scripts/coverage-report.sh + Priming-Edit Material-Sub-Agent |
| M10 | E2E-Pilot-Checklist v3.12 | 5 | Meta | docs/E2E_PILOT_CHECKLIST_v3.12.md |
| M11 | Assembly-Validator Entity-Scan (vorgezogen A-CODE-3) | 2 | A-CODE-3 | scripts/entity-scanner.js + schemas/entities.json + VERTRAG_PHASE_2-8 |

---

## 4. Qualitaets-Drift-Audit (F0b.3b Gate)

Drei Drift-Fragen pro Mechanismus:

1. **Silent-Degrade-Check**: Wird bei unzureichender Befuellung korrekt blockiert / laut gemeldet / still degradiert?
2. **Kompetenz-Schwellen-Check**: Welches fachdidaktische/technische Qualifikationsniveau noetig? Uebersteigt R7-Lehrkraft-Realitaet?
3. **Fallback-Check**: Greift automatischer Fallback bei unzureichender Lehrkraft-Eingabe?

**Audit-Ergebnis:**

| Mechanismus | Silent-Degrade | Kompetenz-Schwelle | Fallback | Gesamt |
|---|---|---|---|---|
| M1 | Hard-Block | Keine (Lehrkraft unbeteiligt) | n.a. | **PASS** |
| M2 | Hard-Block | Keine | n.a. | **PASS** |
| M3 | Hard-Block | Niedrig (Flag-Setzung) | Heuristik-Detector | **PASS** |
| M4 | Hard-Block | Keine (Sub-Agent-Auftrag) | Quellen-Suche Laufzeit | **PASS** |
| M5 | CI-Block | Keine | n.a. | **PASS** |
| M6 | Hard-Block | Keine (LLM-Scan-Auftrag) | n.a. | **PASS** |
| M7 | Hard-Block | Keine | Commons/OpenLibrary | **PASS** |
| M8' | 4-fach redundant | Keine (Prevent via Priming) | Post-Gate-Regeneration | **PASS** (staerkster Stack) |
| M9 | Hard-Block via Schema | Keine (Sub-Agent inline) | Enum-Restriktion | **PASS** |
| M10 | Adressat PM/User | n.a. (nicht Lehrkraft-facing) | Pilot-Protokoll | **CONDITIONAL PASS** |
| M11 | Phase-Fail | Keine | n.a. | **PASS** |

**Gesamt:** 10 PASS + 1 CONDITIONAL PASS (M10, da Haerte 5 nur prozess-intern, nicht User-facing).

Alle themen-spezifischen Pools entfernt. Keine Lehrkraft-Fachdidaktik-Abhaengigkeit in der Qualitaets-Produktion.

---

## 5. Kanal-Verteilung F0b.2 Implementierung (aktualisiert)

| Kanal | Anteil | Deliverables |
|---|---|---|
| **Cowork-Docs** | ~60% | LP_QM §7 (QG-06, QG-07, QG-Sprachniveau, QG-Coverage), 4 Vertrags-Edits (PHASE_0, PHASE_2 Meta + 2-3 + 2-8, PHASE_3-1), **VERTRAG_SPRACHNIVEAU_R7.md (NEU)**, Priming-Block-Definitionen fuer 6 Frontend-Sub-Agents (Material, Hefteintrag, Aufgabenstellung, Ueberleitung, Sicherung, Dialog), 4 Sub-Agent-Invarianten (UEBERLEITUNG-01, MATERIAL-PERSPEKTIV-01, TERMINOLOGIE-01, Phase-0.2.M), 2 kuratierte Listen (trigger_keywords.json, wortschatz_r7_core.json — beide themen-unspezifisch), E2E-Pilot-Checklist v3.12 |
| **CC-Handoff-Code** | ~40% | 6 Scripts (source-deploy-parity.sh, trigger-detector.sh, titel-validator.js, sprachniveau-gate.js, coverage-report.sh, entity-scanner.js), 4 Schemas (mappe_metadata.json, glossar_template.json, perspektiv_inventar.json, entities.json) inkl. material_source.json + material_text.json Extensions, Engine-Fix + Regressions-Test, Priming-Include-Mechanismus fuer Sub-Agent-Prompts |

**Aufwand-Schaetzung (aktualisiert):** ~1.5-2.5 Tage Cowork-Arbeit (PM-led) + 1 CC-Batch ~8-10h Code.
- +2h fuer VERTRAG_SPRACHNIVEAU_R7 Artefakt-Autor-Arbeit (Stilproben + Direktiven + Metrik-Anker)
- +4h fuer M11 Entity-Scanner (vorgezogen aus PQI-2)
- +1h fuer Priming-Include-Mechanismus

---

## 6. F0b-Taskchain

| Task | Beschreibung | Status |
|---|---|---|
| F0b.1 | Ableitungs-Matrix v2 schreiben (DIESES DOKUMENT) | DONE |
| F0b.2 | Mechanismen-Implementierung (11 Mechanismen, bundled) | OPEN |
| F0b.3 | E2E-Checklist v3.12 + Coverage-Tool-Lauf (CC-Handoff) | OPEN |
| F0b.3b | Qualitaets-Drift-Audit final (nach Implementierung) | OPEN |
| F0b.4 | F0b-Close + Git-Commit + STATUS/CHANGELOG | OPEN |

---

## 7. Aenderungen gegenueber v1

- **Entfernt:** `opferperspektive_pool.json`, `kolonialterminologie.json` (themen-spezifische Pools).
- **Umgebaut:** M3, M4, M6 auf prozess-verankerte Prevent-first-Stacks ohne Inhalts-Vorrat.
- **Neu aufgebaut:** M8' 5-Ebenen-Sprachniveau-Stack mit praeskriptiv-formender Priming-Ebene (ersetzt alte Post-Gate-dominante Variante).
- **Neu aufgenommen:** M11 Assembly-Validator Entity-Scan (A-CODE-3 vorgezogen aus PQI-2).
- **Aktualisiert:** M9 mit Inline-Tag-Ausgabe (Option 5c) statt LLM-Tag-Suggest.
- **Klaerung:** `wortschatz_r7_core.json` ist linguistischer Referenz-Datensatz (themen-unspezifisch), kein Inhalts-Pool.

---

**Status:** F0b.1 v2 DONE — Freigabe F0b.2 Mechanismen-Implementierung ausstehend.
