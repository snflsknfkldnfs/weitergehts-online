# Vergleichsaudit Testlauf 4 vs. Testlauf 5

**Datum:** 2026-04-09
**Scope:** Phase 0 komplett (DIDAKTIK_RAHMEN, INHALTSBASIS, SKRIPT)
**Game:** verlauf-erster-weltkrieg-marne-ende
**Methode:** 3-dimensionale Parallelevaluation (Patch-Wirksamkeit, Absolute Qualitaet, Regression)
**Infrastruktur-Delta:** 12 Patches (VP-1..VP-8, GK-1..GK-3, AP-1) zwischen T4 und T5
**Revision:** 2026-04-09 Rev.1 — Transkript-Gegenprüfung. 2 Findings invalidiert, 2 downgraded. Details: §4.4.

---

## 1. Executive Summary

Testrun 5 zeigt signifikante Qualitaetsverbesserungen in den Dimensionen Inhaltsbasis und Skript. 8 von 14 Patch-Zielen sind voll wirksam, die absolute Qualitaet steigt von CONDITIONAL PASS auf PASS (Inhaltsbasis) bzw. von PASS_WITH_WARNINGS auf PASS (Skript). Nach Transkript-Gegenprüfung verbleiben 6 valide Regressionsbefunde (0 CRITICAL, 1 HIGH, 4 MEDIUM, 1 LOW). Die urspruenglich gemeldeten 10 Befunde enthielten 2 Fehlalarme (User-initiierte Mappen-Expansion faelschlich als Agent-Regression gewertet) und 2 ueberbewertete Schweregrade (Chunk-Laenge auf Gesamtdokument statt Narrativtext berechnet).

**Infrastruktur-Reifegrad:** 76% Patch-Wirksamkeit bei stabilem Qualitaetsniveau. Kein strukturelles Regressionsrisiko.

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

**VP-1 (Sprachraum DE-Primaet):** Der Produktionsagent nutzt weiterhin EN-Wikipedia als primaere Quelle. **Root Cause identifiziert (Rev.1):** Das Wikipedia-MCP (github.com/Rudra-ravi/wikipedia-mcp) unterstuetzt Sprachauswahl ueber den Startup-Parameter `--language de`, laeuft aber ohne dieses Flag (Default: EN). Der Agent versuchte DE-Titel (Msg 143-148), das MCP resolvet aber immer auf EN. **Fix:** MCP-Konfiguration in der Produktions-Session auf `--language de` setzen. Kein Vertragspatch noetig — das Vertragsgebot ist korrekt, die MCP-Konfiguration war falsch.

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

### 4.1 Befunde (Rev.1 — nach Transkript-Gegenprüfung)

| ID | Schwere | Titel | Beschreibung | Status Rev.1 |
|---|---|---|---|---|
| ~~REG-1~~ | ~~HIGH~~ | ~~Mappen-Struktur 3→4 unkoordiniert~~ | ~~T5-Skript verwendet 4 Mappen statt 3.~~ | **INVALIDIERT** — User-initiiert (Msg 84: "M3 ist zu umfangreich"), DIDAKTIK_RAHMEN korrekt auf 4 aktualisiert, mappen_anzahl in PI gesetzt. |
| REG-2 | MEDIUM | Einleitungs-Chunk ueberladen | Chunk 1 enthaelt ~1091W Narrativtext (21% ueber 900W Korridor). Funktionsueberladung. | Bestaetigt. Chunk 1 ist tatsaechlich der laengste Chunk. |
| REG-3 | MEDIUM | Rollenprofil-Tiefe ungleich | Protagonist detailliert, Nebenfiguren skizzenhaft. | Bestaetigt. |
| REG-4 | LOW | Quellennummerierung inkonsistent | Fussnoten-Stil wechselt zwischen INHALTSBASIS-Abschnitten. | Bestaetigt. |
| ~~REG-5~~ | ~~CRITICAL~~ | ~~Chunk 3 = 2553W~~ | ~~Chunk 3 ueberschreitet Wortlimit um Faktor 2.8.~~ | **DOWNGRADE → MEDIUM**: Narrativtext Chunk 3 = ~956W (6% ueber 900W). 2553W war Gesamtlaenge inkl. Metadata/Tafelbild/Artefakt-Zuordnung. Chunk 1 (~1091W) ist das groessere Problem (= REG-2). |
| REG-6 | MEDIUM | TRANSFER-Marker fehlen | Trotz VP-5 keine TRANSFER-Marker im Skript. Verhindert saubere Phase-2-Uebergabe. | Bestaetigt (0 Marker im Dokument). |
| REG-7 | ~~HIGH~~ → MEDIUM | Narrativ-Kohaerenz Chunk 3 | Chunk 3 zeigt leichte Tendenz zur Faktenreihung in §1-§2, erholt sich ab §4 (Matrosenmeuterei). | **DOWNGRADE**: Ohne REG-5-Ueberlaenge faellt die Hauptursache weg. Leichtes Stilproblem, keine strukturelle Regression. |
| ~~REG-8~~ | ~~HIGH~~ | ~~Mappe 3 ohne Hauptzuordnung~~ | ~~KE-Luecke fuer Kriegsende/Revolution.~~ | **DOWNGRADE → LOW**: Im DIDAKTIK_RAHMEN explizit dokumentiert und begruendet ("Anmerkung zu Mappe 3": K_07+K_08 als Nebenzuordnung, M3 = narrative Bruecke). |
| REG-9 | MEDIUM | Cross-Artefakt Zahlen-Divergenz | Einzelne Zahlenangaben (Truppenstaerken) divergieren zwischen INHALTSBASIS und SKRIPT. | Bestaetigt. |
| ~~REG-10~~ | ~~HIGH~~ | ~~INHALTSBASIS↔SKRIPT Inkonsistenz Mappe 3/4~~ | ~~INHALTSBASIS 3 Mappen, SKRIPT 4.~~ | **INVALIDIERT** — INHALTSBASIS hat ebenfalls 4 Mappen (Zeilen 70, 181, 284, 398). Alle Artefakte konsistent. |

### 4.2 Aggregat (Rev.1)

| Schwere | Urspruenglich | Nach Rev.1 |
|---|---|---|
| CRITICAL | 1 | **0** |
| HIGH | 4 | **0** |
| MEDIUM | 4 | **4** (REG-2, REG-5↓, REG-6, REG-7↓) + REG-9 = **5** |
| LOW | 1 | **1** (REG-4) + REG-8↓ = **2** |
| INVALIDIERT | 0 | **2** (REG-1, REG-10) |
| **Valide Gesamt** | **10** | **7** (0C/0H/5M/2L) |

### 4.3 Cluster-Analyse (Rev.1)

~~**Cluster A — Mappen-Expansion:**~~ **AUFGELOEST.** Die Mappen-Expansion war User-Entscheidung, nicht Agent-Regression. Alle Artefakte sind konsistent auf 4 Mappen. REG-1, REG-10 invalidiert, REG-5/REG-7/REG-8 auf andere Ursachen zurueckgefuehrt.

**Cluster B — Agent-Compliance (REG-6, VP-5 FAIL):** Bestaetigt. Der Agent ignoriert TRANSFER-Marker-Anforderungen. Syntax-Definition reicht nicht; QS-Gate mit Abbruchbedingung noetig.

**Cluster C — Chunk-Laenge (REG-2, REG-5↓):** Chunk 1 (~1091W) und Chunk 3 (~956W) ueberschreiten den 900W-Korridor leicht. Kein spielbarkeitskritisches Problem, aber Vertrags-Compliance-Luecke.

**VP-1 Prozess-Befund:** Orchestrator versuchte DE-Wikipedia-Suche (Msg 143-148: "Erster Weltkrieg", "Schlacht um Verdun", "Friedensvertrag von Versailles"). MCP-Tool resolvet auf EN-Wikipedia. Agent erkannte Limitation (Msg 156: "MCP nutzt EN-Wikipedia") und wechselte bewusst zu EN. **Root Cause: MCP-Tool-Limitation, nicht Vertragsmissachtung.** VP-1 kann nicht durch Vertragsformulierung allein geloest werden — erfordert MCP-Konfiguration oder alternativen Suchmechanismus.

### 4.4 Transkript-Gegenprüfung (Revision 1)

**Quelle:** Session-Export `session-export-1775723222387/` (Cowork-Session `3c86d2b9`, 351 Messages, 4 Subagents)

**Methode:** Vollstaendige Rekonstruktion des Produktionsprozesses anhand des Haupttranskripts und der Subagent-Transkripte. Abgleich jeder Regression gegen tatsaechlichen Prozessverlauf.

**Korrekturen:**

| Finding | Aenderung | Evidenz |
|---|---|---|
| REG-1 | INVALIDIERT | User Msg 84: "Habe das Gefühl M3 ist zu umfangreich". Orchestrator schlaegt 4 Mappen vor. User Msg 90: "ja". DIDAKTIK_RAHMEN Edits Msg 97-121. mappen_anzahl=4 in PI Msg 121. |
| REG-5 | CRITICAL→MEDIUM | Python-Wortzaehlung: Chunk 3 Narrativtext (§1-§6) = 956W. Metadata/Tafelbild/Artefakt-Zuordnung = ~1597W zusaetzlich. Audit-Agents zaehlten Gesamtblock. |
| REG-8 | HIGH→LOW | DIDAKTIK_RAHMEN Zeile 67: Explizite "Anmerkung zu Mappe 3" mit Begruendung (K_07+K_08 Nebenzuordnung, narrative Bruecke). |
| REG-10 | INVALIDIERT | INHALTSBASIS Zeilen 70/181/284/398: 4 Mappen-Sektionen. Identische Struktur wie SKRIPT. |
| VP-1 | FAIL bestaetigt, Root Cause praezisiert | Msg 143-148: DE-Suchversuche ("Erster Weltkrieg" etc.). Msg 156: "MCP nutzt EN-Wikipedia". Root Cause = MCP-Limitation, nicht Agent-Compliance. |

**Bewertung der urspruenglichen Audit-Agents:** Die 3 Parallel-Agents hatten keinen Zugang zum Produktionstranskript und evaluierten nur Artefakt-gegen-Artefakt. Dies fuehrte zu 2 Fehlalarmen und 2 Schweregrad-Ueberbewertungen. Kuenftige Audits sollten bei strukturellen Findings (Mappen-Anzahl, Cross-Artefakt) das Produktionstranskript als Gegenprobe einbeziehen.

---

## 5. Infrastruktur-Ableitung (Rev.1)

### 5.1 Erforderliche Patches (naechste Iteration)

| ID | Prioritaet | Massnahme | Ziel-Datei |
|---|---|---|---|
| VP-10 | MEDIUM | Chunk-Wortlimit als harte Obergrenze (max 900W Narrativtext) mit expliziter Pruefanweisung im Q-Gate Self-Check. Aktuell: Chunk 1 = 1091W, Chunk 3 = 956W. | VERTRAG_PHASE_0-3_SKRIPT |
| VP-11 | HIGH | TRANSFER-Marker als QS-Gate-Pflichtkriterium mit FAIL-Konsequenz (nicht nur Syntax-Definition). Aktuell: 0 Marker trotz VP-5. | VERTRAG_PHASE_0-3_SKRIPT |
| VP-1r | MEDIUM | VP-1 Revision: Wikipedia-MCP mit `--language de` starten (Startup-Parameter, nicht per-Tool). Siehe github.com/Rudra-ravi/wikipedia-mcp — unterstuetzt 140+ Sprachen via `--language`/`--country`. Aktuell: Default EN. Fix: MCP-Konfiguration in Produktions-Session aendern. Kein Vertragspatch noetig. | MCP-Konfiguration (Cowork/Claude Code Settings) |

~~VP-9 (Mappen-Invariante):~~ Entfaellt — Mappen-Expansion war User-Entscheidung, kein Agent-Defekt. Bestehende Infrastruktur hat korrekt reagiert (DIDAKTIK_RAHMEN-Update, PI-Update).
~~VP-12 (Cross-Artefakt-Check):~~ Entfaellt — alle Artefakte waren konsistent.

### 5.2 Infrastruktur-Reifegrad

| Metrik | T4 | T5 | Trend |
|---|---|---|---|
| Patch-Wirksamkeit | — | 76% | Baseline |
| Absolute Qualitaet IB | CONDITIONAL PASS | PASS | ↑ |
| Absolute Qualitaet SK | PASS_WITH_WARNINGS | PASS | ↑ |
| Regressions-Findings (valide) | — | 7 (0C/0H/5M/2L) | Baseline |
| Strukturelle Kohaerenz | OK | OK (4 Mappen konsistent, User-validiert) | → |

---

## 6. Empfehlung (Rev.1)

1. **VP-11 (TRANSFER-Marker-Pflicht) patchen.** Einziger HIGH-Befund. Blockiert saubere Phase-2-Uebergabe. QS-Gate muss FAIL bei fehlenden Markern liefern.
2. **VP-10 (Chunk-Wortlimit) im selben Patch-Zyklus.** 21% Ueberschreitung in Chunk 1 ist kein Blocker, aber Vertrags-Compliance-Luecke.
3. **VP-1r abwaegen.** Root Cause ist MCP-Tool-Limitation, nicht Agent-Verhalten. Loesung erfordert entweder MCP-Konfiguration (DE-Wikipedia-Endpunkt) oder Vertragsanpassung (EN akzeptabel mit Dokumentation). Kein Patch im Generierungs-Vertrag allein loesbar.
4. **Kein Testrun 6 erforderlich.** Die validen Regressionsbefunde sind alle MEDIUM oder LOW. Die absolute Qualitaet ist PASS. Phase 0.4 → Phase 1 → Phase 2 kann fortgesetzt werden nach VP-11-Patch.

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
| T5 Produktions-Transkript | `docs/analyse/session-export-1775723222387/` (351 Msgs, 4 Subagents) |
