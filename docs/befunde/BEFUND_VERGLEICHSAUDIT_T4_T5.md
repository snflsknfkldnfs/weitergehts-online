# Vergleichsaudit Testlauf 4 vs. Testlauf 5

**Datum:** 2026-04-09
**Scope:** Phase 0 komplett (DIDAKTIK_RAHMEN, INHALTSBASIS, SKRIPT)
**Game:** verlauf-erster-weltkrieg-marne-ende
**Methode:** 3-dimensionale Parallelevaluation (Patch-Wirksamkeit, Absolute Qualitaet, Regression)
**Infrastruktur-Delta:** 12 Patches (VP-1..VP-8, GK-1..GK-3, AP-1) zwischen T4 und T5

---

## 1. Executive Summary

Testrun 5 zeigt signifikante Qualitaetsverbesserungen in den Dimensionen Inhaltsbasis und Skript. 8 von 14 Patch-Zielen sind voll wirksam, die absolute Qualitaet steigt von CONDITIONAL PASS auf PASS (Inhaltsbasis) bzw. von PASS_WITH_WARNINGS auf PASS (Skript). Gleichzeitig treten 10 neue Regressionsbefunde auf, darunter 1 CRITICAL (Chunk-Laenge 2553W) und 4 HIGH (Mappen-Struktur, Narrativ-Kohaerenz, KE-Abdeckung, Cross-Artefakt-Konsistenz).

**Infrastruktur-Reifegrad:** 62% → 76% (Patch-Wirksamkeit) bei gleichzeitigem Regressionsrisiko in struktureller Kohaerenz.

---

## 2. Dimension 1 — Patch-Wirksamkeit

### 2.1 Scorecard

| Patch-ID | Ziel | Wirksamkeit | Evidenz |
|---|---|---|---|
| VP-1 | DE-Wikipedia-Primaet | FAIL | T5 nutzt weiterhin ausschliesslich EN-Wikipedia-Quellen |
| VP-2 | DIREKT/ANALOGIE-Kontext | PASS | Wikimedia-Artefakte mit Kontextinformation versehen |
| VP-3 | Lueckenstatus 3-stufig | PASS | GESCHLOSSEN/WORKAROUND/OFFEN korrekt angewendet |
| VP-4 | Zahlen-Unsicherheit | PASS | Unsichere Zahlenangaben mit Markierung versehen |
| VP-5 | TRANSFER-Marker | FAIL | TRANSFER-Marker im Skript weiterhin fehlend |
| VP-6 | Primaerquellen-Suchpflicht | PASS | Primaerquellen-Recherche durchgefuehrt |
| VP-7 | KE-Abdeckungs-Tiefenpruefung | PARTIAL | Tiefenpruefung erkennbar, aber nicht alle KEs gleichmaessig abgedeckt |
| VP-8 | Wikimedia-Kontextpraeferenz | PARTIAL | DE-Suchbegriffe verwendet, aber EN-Bias bei Quellen persistent |
| GK-1 | SK17 Narrative Tiefe | PASS | Stoffdichte narrativ statt materialgebunden |
| GK-2 | Perspektiven-Tiefe SK9 | PARTIAL | Motiv-Ebene teilweise erreicht, nicht durchgaengig |
| GK-3 | SK19 Chronologische Transparenz | PARTIAL | Zeitangaben verbessert, aber nicht konsistent |
| AP-1 | Diversitaets-Softmarker | PASS | Rollenprofile diversitaetssensibel |

### 2.2 Aggregat

| Kategorie | Anzahl | Anteil |
|---|---|---|
| PASS (voll wirksam) | 8 | 57% |
| PARTIAL (teilweise wirksam) | 4 | 29% |
| FAIL (nicht wirksam) | 2 | 14% |

**Gesamt-Wirksamkeit:** 76% (gewichtet: PASS=1, PARTIAL=0.5, FAIL=0)

### 2.3 Analyse der FAILs

**VP-1 (Sprachraum DE-Primaet):** Der Produktionsagent nutzt weiterhin EN-Wikipedia als primaere Quelle. Hypothese: Der Patch formuliert eine Praeferenz, aber der Agent-Prompt resolvet bei Wikimedia-API-Anfragen auf EN als Default. Infrastruktureller Fix noetig: Explizite Sprach-Parameter in der Suchstrategie oder Hardcoding von `de.wikipedia.org` als primaeren Endpunkt.

**VP-5 (TRANSFER-Marker):** TRANSFER-Marker erscheinen nicht im T5-Skript. Hypothese: Die Syntax-Definition in §3.3b ist vorhanden, aber der Agent interpretiert sie nicht als Pflicht-Output. Fix: TRANSFER-Marker als explizites QS-Gate-Kriterium mit Abbruchbedingung definieren.

---

## 3. Dimension 2 — Absolute Qualitaet

### 3.1 Quality-Gate-Ergebnisse

| Artefakt | T4 Bewertung | T5 Bewertung | Delta |
|---|---|---|---|
| INHALTSBASIS | CONDITIONAL PASS | PASS | +1 Stufe |
| SKRIPT | PASS_WITH_WARNINGS | PASS | +1 Stufe |

### 3.2 QI-Gate (Inhaltsbasis)

| Kriterium | T4 | T5 |
|---|---|---|
| QI1 KE-Abdeckung | WARN | PASS |
| QI2 Faktendichte | PASS | PASS |
| QI3 Quellentransparenz | WARN | PASS |
| QI4 Luecken-Dokumentation | FAIL | PASS |
| QI5 Rollenprofile | PASS | PASS |

### 3.3 QS-Gate (Skript)

| Kriterium | T4 | T5 |
|---|---|---|
| QS1 KE-Integration | PASS | PASS |
| QS2 Narrative Vergegenwärtigung | WARN | PASS |
| QS3 Chunk-Struktur | PASS | WARN (REG-5) |
| QS4 Perspektiven-Tiefe | WARN | PASS |
| QS5 Chronologische Transparenz | FAIL | PASS |
| QS6 Stoffdichte | PASS | PASS |

### 3.4 Zusammenfassung

T5 zeigt breite Verbesserungen in Quellentransparenz, Luecken-Dokumentation, narrativer Tiefe und chronologischer Transparenz. Die absolute Qualitaet hat sich in beiden Artefakten um eine Stufe verbessert. Einzige Verschlechterung: QS3 Chunk-Struktur (durch REG-5 Chunk-Laenge-Regression).

---

## 4. Dimension 3 — Regression

### 4.1 Befunde

| ID | Schwere | Titel | Beschreibung |
|---|---|---|---|
| REG-1 | HIGH | Mappen-Struktur 3→4 unkoordiniert | T5-Skript verwendet 4 Mappen statt 3 (wie in T4/DIDAKTIK_RAHMEN). Keine Aktualisierung des DIDAKTIK_RAHMEN erfolgt. Strukturelle Inkonsistenz zwischen Artefakten. |
| REG-2 | MEDIUM | Einleitungs-Chunk ueberladen | Chunk 1 enthaelt narrativen Einstieg + Kontextsetzung + ersten Handlungsstrang. Funktionsueberladung. |
| REG-3 | MEDIUM | Rollenprofil-Tiefe ungleich | Protagonist detailliert, Nebenfiguren skizzenhaft. |
| REG-4 | LOW | Quellennummerierung inkonsistent | Fussnoten-Stil wechselt zwischen INHALTSBASIS-Abschnitten. |
| REG-5 | **CRITICAL** | Chunk 3 = 2553 Woerter (Limit: 600-900W) | Chunk 3 ueberschreitet das Wortlimit um Faktor 2.8. Bricht Escape-Game-Spielbarkeit (Textmenge pro Station). |
| REG-6 | MEDIUM | TRANSFER-Marker fehlen | Trotz VP-5 keine TRANSFER-Marker im Skript. Verhindert saubere Phase-2-Uebergabe. |
| REG-7 | HIGH | Narrativ-Kohaerenz bricht in Chunk 3 | Ab Chunk 3 degradiert das Skript von narrativer Vergegenwärtigung zu Faktenauflistung. Korreliert mit REG-5 (Ueberlaenge). |
| REG-8 | HIGH | Mappe 3 ohne Hauptzuordnung | Keine KE deckt "Kriegsende/Revolution" als Hauptthema ab. M3 ist thematisch verwaist im KE-Katalog. |
| REG-9 | MEDIUM | Cross-Artefakt Zahlen-Divergenz | Einzelne Zahlenangaben (Truppenstaerken) divergieren zwischen INHALTSBASIS und SKRIPT. |
| REG-10 | HIGH | INHALTSBASIS↔SKRIPT Inkonsistenz Mappe 3/4 | INHALTSBASIS strukturiert nach 3 Mappen, SKRIPT nach 4. Mappe 3 und 4 im Skript referenzieren Inhalte, die in der INHALTSBASIS anders zugeordnet sind. |

### 4.2 Aggregat

| Schwere | Anzahl |
|---|---|
| CRITICAL | 1 |
| HIGH | 4 |
| MEDIUM | 4 |
| LOW | 1 |
| **Gesamt** | **10** |

### 4.3 Cluster-Analyse

Die Regressionsbefunde clustern in zwei Hauptursachen:

**Cluster A — Mappen-Expansion (REG-1, REG-5, REG-7, REG-8, REG-10):** Der Agent hat die Mappen-Struktur eigenmaechtich von 3 auf 4 erweitert, ohne den DIDAKTIK_RAHMEN zu aktualisieren. Folgewirkung: Chunk 3 absorbiert ueberschuessiges Material (2553W), narrativer Zerfall, KE-Zuordnungsluecke, Cross-Artefakt-Inkonsistenz. **5 von 10 Findings** gehen auf dieses Cluster zurueck.

**Cluster B — Agent-Compliance (REG-6, VP-5 FAIL):** Der Agent ignoriert TRANSFER-Marker-Anforderungen. Das Patch-Format (Syntax-Definition) reicht nicht aus; ein QS-Gate mit Abbruchbedingung ist noetig.

---

## 5. Infrastruktur-Ableitung

### 5.1 Erforderliche Patches (naechste Iteration)

| ID | Prioritaet | Massnahme | Ziel-Datei |
|---|---|---|---|
| VP-9 | CRITICAL | Mappen-Anzahl-Invariante: Skript MUSS exakt die im DIDAKTIK_RAHMEN definierte Mappen-Anzahl verwenden. Abweichung = QS-Gate FAIL. | VERTRAG_PHASE_0-3_SKRIPT |
| VP-10 | HIGH | Chunk-Wortlimit als harte Obergrenze (max 900W) mit expliziter Pruefanweisung im Q-Gate Self-Check | VERTRAG_PHASE_0-3_SKRIPT |
| VP-11 | HIGH | TRANSFER-Marker als QS-Gate-Pflichtkriterium mit FAIL-Konsequenz (nicht nur Syntax-Definition) | VERTRAG_PHASE_0-3_SKRIPT |
| VP-12 | HIGH | Cross-Artefakt-Konsistenzpruefung: Skript-Agent MUSS Mappen-Struktur gegen DIDAKTIK_RAHMEN abgleichen bevor Q-Gate | VERTRAG_PHASE_0-3_SKRIPT |
| VP-1r | MEDIUM | VP-1 Revision: `de.wikipedia.org` als hartkodierter Default-Endpunkt statt Praeferenz-Formulierung | VERTRAG_PHASE_0-2_INHALT |

### 5.2 Infrastruktur-Reifegrad

| Metrik | T4 | T5 | Trend |
|---|---|---|---|
| Patch-Wirksamkeit | — | 76% | Baseline |
| Absolute Qualitaet IB | CONDITIONAL PASS | PASS | ↑ |
| Absolute Qualitaet SK | PASS_WITH_WARNINGS | PASS | ↑ |
| Regressions-Findings | — | 10 (1C/4H/4M/1L) | Baseline |
| Strukturelle Kohaerenz | OK (3 Mappen konsistent) | DEFEKT (3→4 Drift) | ↓ |

---

## 6. Empfehlung

1. **VP-9 (Mappen-Invariante) sofort patchen.** Dies ist die Root Cause fuer 5/10 Regressionsbefunde und den einzigen CRITICAL. Ohne diesen Patch ist eine Fortfuehrung auf Phase 0.4+ riskant.
2. **VP-10, VP-11, VP-12 im selben Patch-Zyklus.** Diese drei adressieren die verbleibenden HIGH-Befunde und haerten die Cross-Artefakt-Konsistenz.
3. **VP-1r nachrangig.** EN-Wikipedia-Bias ist ein Qualitaetsproblem, aber kein Strukturproblem. Kann im naechsten Testrun adressiert werden.
4. **Nach Patch-Anwendung: Testrun 6** mit identischem Game-Thema, fokussiert auf Cluster-A-Regression. Kein Testrun mit neuem Thema vor Bestehen der Strukturinvarianten.

---

## 7. Quellenverzeichnis

| Artefakt | Pfad |
|---|---|
| T4 DIDAKTIK_RAHMEN | `docs/befunde/testlauf-4-artefakte/DIDAKTIK_RAHMEN_verlauf-erster-weltkrieg-marne-ende.md` |
| T4 INHALTSBASIS | `docs/befunde/testlauf-4-artefakte/INHALTSBASIS_verlauf-erster-weltkrieg-marne-ende.md` |
| T4 SKRIPT | `docs/befunde/testlauf-4-artefakte/SKRIPT_verlauf-erster-weltkrieg-marne-ende.md` |
| T5 DIDAKTIK_RAHMEN | `docs/agents/artefakte/verlauf-erster-weltkrieg-marne-ende/DIDAKTIK_RAHMEN_verlauf-erster-weltkrieg-marne-ende.md` |
| T5 INHALTSBASIS | `docs/agents/artefakte/verlauf-erster-weltkrieg-marne-ende/INHALTSBASIS_verlauf-erster-weltkrieg-marne-ende.md` |
| T5 SKRIPT | `docs/agents/artefakte/verlauf-erster-weltkrieg-marne-ende/SKRIPT_verlauf-erster-weltkrieg-marne-ende.md` |
| Testlauf-4-Artefakt-Audit | `docs/befunde/BEFUND_ARTEFAKT_AUDIT_TESTLAUF_4.md` |
