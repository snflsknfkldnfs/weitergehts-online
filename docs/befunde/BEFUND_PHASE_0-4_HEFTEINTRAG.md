# Evaluationsbefund Phase 0.4 AGENT_HEFTEINTRAG — Testrun 5

**Datum:** 2026-04-09
**Scope:** 4 TAFELBILD-Dateien (Mappe 1-4), VERTRAG_PHASE_0-4 v1.1, GUETEKRITERIEN_HEFTEINTRAG_ENTWURF G1-G14
**Game:** verlauf-erster-weltkrieg-marne-ende
**Methode:** Artefakt-gegen-Vertrag-Pruefung + JSON-Validierung + Wortzaehlung + Prozessrekonstruktion (Chat-Verlauf)

---

## 1. Gesamtbewertung

**CONDITIONAL PASS** — 1 Finding (G11 M3 Wortlimit, HIGH). Alle BLOCKER bestanden. Alle Mappen strukturell korrekt und Phase-2.0-kompatibel. SCPL-Qualitaet hoch. Ein Mappe ueberschreitet das 120W-Limit leicht (127W).

---

## 2. Vertragstreue

### 2.1 Operative Kriterien (QH1-QH7)

| Kriterium | M1 | M2 | M3 | M4 | Bewertung |
|---|---|---|---|---|---|
| QH1 Dokument-Struktur | PASS | PASS | PASS | PASS | Alle Pflicht-Sektionen vorhanden, Header korrekt |
| QH2 Stundenfrage | PASS (4W) | PASS (8W) | PASS (6W) | PASS (6W) | Alle problemorientiert, alle ≤12W |
| QH3 SCPL-Struktur | PASS | PASS | PASS | PASS | JSON valide, alle 4 Zonen, min. 1 Complication, typ-Feld vorhanden |
| QH4 Kernerkenntnisse | PASS | PASS | PASS | PASS | Je 3, alle ≤15W, alle im SKRIPT auffindbar |
| QH5 Erarbeitbarkeit | PASS | PASS | PASS | PASS | 100% DIRECT (32/32). Siehe §3.2 Anmerkung |
| QH6 Transfer-Frage | PASS | PASS | PASS | PASS | Alle offen, alle ueber Mappe hinausweisend |
| QH7 Fachbegriffe | PASS | PASS | PASS | PASS | 5/5/6/7 Begriffe, alle dokumentiert und verortet |

### 2.2 Guetekriterien G1-G14

| Kriterium | Prio | M1 | M2 | M3 | M4 |
|---|---|---|---|---|---|
| G1 Reduktion ≤10 | MUSS | PASS (8) | PASS (8) | PASS (8) | PASS (8) |
| G2 Strukturiertheit | SOLL | PASS | PASS | PASS | PASS |
| G3 Erarbeitbarkeit | MUSS | PASS | PASS | PASS | PASS |
| G4 Visualisierbarkeit | KANN | PASS | PASS | PASS | PASS |
| G5 Artefakt-Integration | SOLL | PASS | PASS | PASS | PASS |
| G6 Merksatz = Stundenfrage-Antwort | MUSS | PASS | PASS | PASS | PASS |
| G7 Aesthetik-Potential | KANN | PASS | PASS | PASS | PASS |
| G8 Sprachregister R7 | MUSS | PASS | PASS | PASS | PASS |
| G9 Progression | SOLL | PASS | PASS | PASS | PASS |
| G10 Fachbegriffe verortet | SOLL | PASS | PASS | PASS | PASS |
| G11 Max 120W | MUSS | PASS (119) | PASS (116) | **WARN (127)** | PASS (120) |
| G12 Lehrplan-Ref | KANN | PASS | PASS | PASS | PASS |
| G13 Multiperspektivitaet | KANN | PASS | PASS | PASS | PASS |
| G14 SCPL-Kohaerenz | MUSS | PASS | PASS | PASS | PASS |

### 2.3 Rueckwaerts-Kontingenz

| Kriterium | Ergebnis | Detail |
|---|---|---|
| QH-RC1 Phase-2.0-Kompatibilitaet | PASS | JSON-Struktur 1:1 uebernehmbar. Alle Pflichtfelder vorhanden (scpl, stundenfrage, ordnungsmuster, fachbegriffe, knoten[], verbindungen[]). |
| QH-RC2 Phase-1-Erarbeitbarkeit | PASS | Fuer jeden SCPL-Schritt ist Materialarbeit denkbar. Kein reiner Lehrervortrag-Schritt. |
| QH-RC3 Kernerkenntnisse-Konsistenz | PASS | scpl.loesung[] korrespondiert mit KE-Matrix aus DIDAKTIK_RAHMEN. M1→K_07, M2→K_08, M3→K_07/K_08, M4→K_04/K_03. |

---

## 3. Findings

### 3.1 HE-W1 (HIGH): M3 G11 Wortlimit ueberschritten

**Befund:** Mappe 3 SCPL-Inhalt = 127 Woerter (Limit: 120W). Ueberschreitung 5.8%.

**Agent-Self-Check Diskrepanz:** Agent meldete ~115W. Tatsaechlich 127W. Delta = 12W. Die Zaehlung des Agents schliesst vermutlich Fachbegriff-Erklaerungen innerhalb der SCPL-Schritte nicht vollstaendig ein.

**Empfehlung:** Complication-Schritte in M3 kuerzen. C1 (Fruehjahrsoffensive) und C2 (Schwarzer Tag) koennten je 3-4 Woerter verlieren ohne Informationsverlust. Alternativ: P-Satz kuerzen ("Am 9. November 1918 dankt der Kaiser ab — nicht die Armee beendet den Krieg, sondern die Revolution: Novemberrevolution." → 20W, koennte auf ~15W gekuerzt werden).

**Severity:** HIGH (MUSS-Kriterium). Blockiert nicht die Validierung, aber erfordert Korrektur vor STRUKTUR-FREEZE.

### 3.2 HE-I1 (INFO): 100% DIRECT Erarbeitbarkeit — Plausibilitaetsanmerkung

**Befund:** Alle 32 SCPL-Schritte ueber 4 Mappen sind als DIRECT markiert. 0% ARTIFACT, 0% INFERENTIAL.

**Bewertung:** Formal korrekt — alle Schritte sind tatsaechlich im SKRIPT-Text direkt auffindbar. Allerdings werden Kernerkenntnisse (L1-L3) per Definition durch Synthese mehrerer §-Absaetze gewonnen, was eher INFERENTIAL als DIRECT ist. Die 70%-Schwelle ist so grosszuegig, dass selbst bei Umklassifizierung aller L-Schritte zu INFERENTIAL noch 75% DIRECT verbleiben wuerden (24/32). Kein funktionales Problem, aber die Selbstbewertung ist wohlwollend.

**Severity:** INFO (kein Handlungsbedarf).

### 3.3 HE-I2 (INFO): Ordnungsmuster-Diversitaet

**Befund:** M1 und M2 verwenden beide "kausal". M3 "chronologisch", M4 "kategorial".

**Bewertung:** Die Wahl ist inhaltlich jeweils passend. 2x kausal ist vertretbar — M1 (Waffentechnik → Bedingungen → Tote) und M2 (Blockade → Hunger → Widerstand) haben genuegend unterschiedliche Kausalketten. Kein Progression-Problem (G9). Positiv: M3 und M4 bringen Variation.

**Severity:** INFO.

---

## 4. Prozess-Evaluation

### 4.1 Vertragstreue des Agenten

| Aspekt | Bewertung | Detail |
|---|---|---|
| Input-Lektuere | PASS | AGENT_HEFTEINTRAG.md, VERTRAG, SKRIPT, DIDAKTIK_RAHMEN gelesen |
| Verarbeitungsreihenfolge | PASS | M1→M4 sequentiell (G9 Progression erfordert Vorgaenger) |
| JSON-Schema-Konformitaet | PASS | Alle Pflichtfelder vorhanden, knoten/verbindungen als leere Arrays |
| Q-Gate-Self-Check | WARN | G11 Wortzaehlung bei M3 fehlerhaft (115 gemeldet, 127 tatsaechlich) |
| SCPL-Extraktion | PASS | Kernerkenntnisse konsistent aus SKRIPT extrahiert, keine Erfindungen |
| Fachbegriff-Einfuehrung | PASS | Per Doppelpunkt, nie Klammern (Stilregel eingehalten) |
| Dateinamen | PASS | TAFELBILD_[game-id]_Mappe[N].md korrekt |

### 4.2 Prozess-Beobachtungen aus Chat-Verlauf

1. **Schema-Konflikt erkannt und geloest:** Agent identifizierte Diskrepanz zwischen AGENT-Definition (HEFTEINTRAG-Dateiname) und VERTRAG (TAFELBILD-Dateiname). Korrekt zugunsten des VERTRAGs entschieden.

2. **Encoding-Konventionen beachtet:** Agent erkannte Trennung zwischen ae/oe/ue in Dateinamen und UTF-8 im Inhalt.

3. **Keine Delegation an Subagent:** Agent schrieb alle 4 Dateien selbst. Fuer Phase 0.4 vertretbar (Extraktion, nicht Generierung). Kein Qualitaetsverlust erkennbar.

4. **Detaillierte Planungsphase:** Umfangreiche Ueberlegungen zu SCPL-Struktur, JSON-Schema-Merge, Wortzaehlung. Zeigt tiefes Vertragsverstaendnis.

5. **Self-Check unpraezise bei Wortzaehlung:** Agent zaehlte bei M3 falsch (115 statt 127) und bei M4 deutlich daneben (109 statt 120). Infrastrukturelles Problem: Kein automatisierter Word-Count im Q-Gate.

---

## 5. Qualitaets-Urteil

### 5.1 Fachdidaktische Qualitaet

| Dimension | Bewertung |
|---|---|
| Stundenfragen | Ausgezeichnet. Alle problemorientiert, praeknant, durch Materialarbeit beantwortbar. M4 ("Warum Diktat?") besonders stark. |
| SCPL-Kohaerenz | Stark. Jede Mappe bildet einen geschlossenen S→C→P→L-Bogen. Complication-Types sinnvoll zugewiesen. |
| Kernerkenntnisse | Stark. Direkt aus SKRIPT ableitbar, keine Erfindungen. Sprachlich praezise und altersgerecht. |
| Ordnungsmuster-Passung | Gut. Kausal (M1, M2), chronologisch (M3), kategorial (M4) — jeweils inhaltlich begruendet. |
| Progression (Cross-Mappe) | Stark. M1→M2 (Front → Heimat), M2→M3 (Kriegsmuedigkeit → Revolution), M3→M4 (Waffenstillstand → Frieden). Logischer Aufbau. |
| Transfer-Fragen | Gut. Alle offen, alle gegenwartsrelevant. M4 ("Kann ein Friedensvertrag neuen Krieg verursachen?") didaktisch wertvoll. |

### 5.2 Phase-2.0-Bereitschaft

| Aspekt | Status |
|---|---|
| JSON 1:1 uebernehmbar | Ja |
| scpl.loesung[] als Merkbox | Ja |
| Ordnungsmuster fuer Tafelbild-Rendering | Ja |
| Fachbegriffe fuer Glossar-Generierung | Ja |
| STRUKTUR-FREEZE nach Validierung | Bereit (nach HE-W1-Korrektur) |

---

## 6. Empfehlung

1. **HE-W1 beheben:** M3 SCPL-Text um ~7W kuerzen. Vorschlag: C1 oder P-Satz straffen.
2. **Nach Korrektur: STRUKTUR-FREEZE aktivieren.** Alle 4 TAFELBILDer sind dann EINGEFROREN.
3. **Infrastruktur-Anmerkung:** Kuenftig automatisierten Word-Count im Q-Gate-Self-Check einbauen (der Agent zaehlt unzuverlaessig). Moeglicher Patch: Bash-basierte Wortzaehlung als Pflichtschritt vor Gate-Urteil.
