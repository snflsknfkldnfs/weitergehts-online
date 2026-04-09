# BEFUND: Testrun Phase 2.1c + Phase 2.2a — Mappe 1

**Datum:** 2026-04-09
**Modus:** AUDIT
**Session:** 26 (Fortsetzung — PM-Evaluation des Produktions-Testruns)
**Scope:** Phase 2.1c (Cross-Konsistenz) + Phase 2.2a (Progressionsplan) + Prozesstreue des Gesamtablaufs

---

## 1. Zusammenfassung

| Kategorie | Findings |
|---|---|
| HIGH | 1 (H1: Phase 2.1b uebersprungen — Infrastruktur-Luecke) |
| MEDIUM | 2 (M1: Bloom-Typ-Alignment Pos 5, M2: Zitat-Rekonstruktionsmarker in sicherung.json) |
| LOW | 2 (L1: Q-GATE-LOG Wortanzahlen Phase 2.1 veraltet, L2: PROJECT_INSTRUCTIONS State Machine unvollstaendig) |

**Gesamturteil:** CONDITIONAL PASS — Die produzierten Artefakte (sicherung.json, PROGRESSIONSPLAN.md) sind inhaltlich solide. Phase 2.1b wurde uebersprungen, was die Validierungskette des Testruns unterbricht. Keine Blockierung fuer Phase 2.2b, aber Infrastruktur-Patch erforderlich.

---

## 2. Prozesstreue

### H1: Phase 2.1b (Didaktik-Review) uebersprungen — INFRASTRUKTUR-LUECKE

**Schwere:** HIGH
**Befund:** Die Produktions-Session sprang direkt von Phase 2.1 (Material-Produktion) zu Phase 2.1c (Cross-Konsistenz). Phase 2.1b (isolierter Didaktik-Review) wurde nicht ausgefuehrt. Es existiert kein DIDAKTIK_REVIEW_LOG.md.

**Root Cause:** Die PROJECT_INSTRUCTIONS.md State Machine — das autoritative Steuerungsdokument fuer Produktions-Sessions — wurde bei der v3.6-Patch-Runde NICHT um Phase 2.1b ergaenzt. Die Uebergangstabelle zeigt:

```
| 2.1  | 2.1 Material — Mappe [N], [M] Mat. | 2.1c Cross-Konsistenz Mappe [N] |
```

Es gibt keine Zeile `2.1b`. Der Produktions-Agent folgte korrekt seiner State Machine — die Luecke liegt in der Infrastruktur, nicht im Agent.

WORKFLOW_v4.md und ORCHESTRATOR.md enthalten Phase 2.1b korrekt. Aber PROJECT_INSTRUCTIONS.md (die State Machine, die der Agent tatsaechlich liest) wurde nicht synchronisiert.

**Auswirkung:** Der zentrale Mechanismus zur Brechung der Selbstreferenz-Bias (Tiefenaudit C-CRIT) wurde im Testrun nicht erprobt. Der Testrun validiert NICHT, ob Phase 2.1b funktioniert.

**Milderung:** Die User-seitigen v3.6-Patches (Erzaehlerstimme, BU-Beschraenkung, blockquote-Fix) wirken als manuelle Variante von 2.1b. Sie adressierten dieselben Defizite, die ein isolierter Review gefunden haette. Der didaktische Qualitaetseffekt ist eingetreten, aber der Prozess-Test fehlt.

**Patch:** PROJECT_INSTRUCTIONS.md State Machine um Phase 2.1b erweitern (Uebergangstabelle + Workflow-Sequenz). Dann: Phase 2.1b nachtraeglich als Validierungs-Testlauf ausfuehren (kann auch in dieser PM-Session gegen die gepatchten Materialien laufen).

### L2: PROJECT_INSTRUCTIONS.md State Machine unvollstaendig

**Schwere:** LOW (direkte Konsequenz von H1, eigener Finding weil Infrastruktur-Patch separat trackbar)
**Befund:** Die Uebergangstabelle in PROJECT_INSTRUCTIONS.md hat keinen Eintrag fuer Phase 2.1b. Auch die Workflow-Sequenz-Liste ([2.0] → [2.1] → [2.1c] → ...) enthaelt kein [2.1b].
**Patch:** Zeile `| 2.1b | 2.1b Didaktik-Review — Mappe [N] | 2.1c Cross-Konsistenz Mappe [N] |` einfuegen. Workflow-Sequenz um `[2.1b] Didaktik-Review (isoliert, Batch)` ergaenzen. Transition 2.1 → 2.1b, 2.1b → 2.1c.

---

## 3. Phase 2.1c (Cross-Konsistenz) — Artefakt-Evaluation

### sicherung.json

| Feld | Bewertung | Detail |
|---|---|---|
| reflexionsimpuls | PASS | Meta-kognitiv, disjunkt von loesung[]. Guter Impuls. |
| hefteintrag_verweis | PASS | Referenziert Tafelbild + Kernkonzepte korrekt. |
| zusammenfassung | PASS | Alle 5 Fachbegriffe (Stellungskrieg, Giftgas, Ausblutungsschlacht, Materialschlacht, Hoffnungslosigkeit) enthalten. Bogen S→P abgebildet. |
| ueberleitung | PASS | Bruecke zu Mappe 2 (Heimatfront: Frauen, Fabriken, Hunger). Text aus GERUEST uebernommen — korrekt. |
| zitat | **WARN** (→ M2) | Zitat stammt aus mat-1-4 (aufbereitung=rekonstruiert). urheber-Feld fehlt [sinngemäß]-Marker oder Rekonstruktions-Hinweis. |

### M2: Zitat-Rekonstruktionsmarker in sicherung.json fehlt

**Schwere:** MEDIUM
**Befund:** `zitat.text` = "Wir fielen wie Kaninchen im Gewehrfeuer." Dieses Zitat stammt aus mat-1-4, das `_meta.aufbereitung = "rekonstruiert"` traegt. Die Materialien selbst wurden in v3.6 korrekt mit [sinngemäß]-Marker versehen. Aber sicherung.json's `zitat.urheber` lautet "Britischer Infanterist, Schlacht an der Somme 1916" — ohne jeden Hinweis auf Rekonstruktion.

Fuer SuS, die das Zitat auf dem Sicherungs-Bildschirm sehen, entsteht der Eindruck eines Original-Zitats. Das widerspricht der v3.6-Transparenzregel.

**Empfehlung:** `zitat.urheber` ergaenzen: "Britischer Infanterist, Schlacht an der Somme 1916 [sinngemäß]" ODER `zitat.kontext` um "Rekonstruierter Text, kein woertliches Originalzitat." ergaenzen.

### Q-GATE-LOG Phase 2.1c

| Pruefpunkt | Bewertung | Kommentar |
|---|---|---|
| Fachbegriff-Progression | PASS | 5 Begriffe, lueckenlos, korrekte Reihenfolge |
| TB-Knoten 7/7 | PASS | Alle Knoten mindestens 1× abgedeckt |
| SCPL 5/5 | PASS | S, C1, C2, C3, P — alle DIRECT |
| Loesung[]-Erarbeitbarkeit | PASS | 3/3 Kernerkenntnisse ableitbar |
| Perspektiven 3/3 | PASS | P1, P2, P3 abgedeckt |
| Zusammenfassung | PASS | — |
| Ueberleitung | PASS | — |
| Wortbudget | PASS | ~480W < 500W |

**Bewertung Phase 2.1c:** PASS (7/8 Pruefpunkte direkt PASS, 1 WARN → M2 Zitat-Marker)

### L1: Q-GATE-LOG Phase 2.1 Wortanzahlen veraltet

**Schwere:** LOW
**Befund:** Q-GATE-LOG Phase 2.1 zeigt mat-1-2: 117W, mat-1-5: 110W. Nach v3.6-Patches sind die aktuellen Werte mat-1-2: 154W (Figur 117, Erzaehlerstimme 37), mat-1-5: 125W (Figur 107, Erzaehlerstimme 18). Der Log wurde nicht retroaktiv aktualisiert.

**Bewertung:** Kosmetisch. Die Wortanzahlen in den JSON-Dateien selbst sind korrekt. Der Q-GATE-LOG ist ein historisches Protokoll — die Phase-2.1-Zeilen spiegeln den Zustand zum Zeitpunkt der Evaluation. Nachtrag moeglich, aber nicht kritisch.

---

## 4. Phase 2.2a (Progressionsplan) — Artefakt-Evaluation

### Strukturelle Konformitaet

| Kriterium | Ergebnis | Detail |
|---|---|---|
| Aufgabenzahl-Formel | PASS | basis(5) + knoten(1) + material(1) = 7. Korrekt. |
| Bloom A19 L1-L2 max 40% | PASS | 29% (2/7) |
| Bloom A19 L3-L4 min 30% | PASS | 43% (3/7) |
| Bloom A19 L5-L6 min 20% | PASS | 29% (2/7) |
| Typvielfalt min 3 | PASS | 6 Typen |
| Max 3× gleicher Typ | PASS | MC 2×, alle anderen 1× |
| MC-Duplikat begruendet | PASS | Pos 1 AFB I, Pos 5 AFB II — unterschiedliche Bloom-Stufen |
| SCPL alle Zonen | PASS | S(1), C1(2), C2(3), C3(4), P(5), L(6,7) |
| TB-Knoten 7/7 | PASS | Alle 7 Knoten mindestens 1× adressiert |
| AFB-Progression monoton | PASS | I → I → II → II → II → III → III |
| Freitext an letzter Position | PASS | Pos 7 = freitext |
| Freischalt-Code | PASS | GRABEN (6 Zeichen, thematisch) |
| Anti-Quota begruendung | PASS | Echte Streitfrage (Generaele vs. Waffen), 2 vertretbare Positionen, belegfaehig |
| Anti-Quota quellenkritik | PASS | Korrekt NICHT eingesetzt (mat-1-4 = rekonstruiert, kein Primaerquellentext) |

### Inhaltliche Qualitaet Konstruktionskontexte

| Pos | Bewertung | Kommentar |
|---|---|---|
| 1 (mc, S, AFB I) | PASS | Bildquelle + Stellungskrieg-Wiedererkennung. Solide Einstiegsaufgabe. |
| 2 (lueckentext, C1, AFB I) | PASS | Fachbegriffe im TB-Kontext einsetzen. Korrekt an Erzaehlerstimme-Passage gekoppelt. |
| 3 (reihenfolge, C2, AFB II) | PASS | Kausale Abfolge Giftgas. 5 Schritte aus DT ableitbar. Gute Operationalisierung. |
| 4 (zuordnung, C3, AFB II) | PASS | Dual-Voice Falkenhayn/Soldat. Klare Zuordnungskriterien (Perspektive, Wortwahl). |
| 5 (mc, P, AFB II) | **WARN** (→ M1) | Bloom L4 zugewiesen, aber MC reicht laut Typauswahl-Heuristik nur bis L3. |
| 6 (begruendung, L, AFB III) | PASS | CER-Struktur, echte Streitfrage, 2 Evidenz-Quellen. Didaktisch stark. |
| 7 (freitext, L, AFB III) | PASS | Stundenfrage-Synthese ueber alle Knoten. Offene Antwortstruktur. |

### M1: Bloom-Typ-Alignment Pos 5

**Schwere:** MEDIUM
**Befund:** Pos 5 ist als MC mit Bloom L4 (Analysieren) deklariert. Die Typauswahl-Heuristik in VERTRAG_PHASE_2-2a definiert MC als "L1-L3". L4 liegt ausserhalb des Typ-Gueltigkeitsbereichs.

Die Frage ("Warum schreibt Friedrich nicht mehr, dass alles gut wird?") ist inhaltlich eher L3 (Transfer: Fakten auf emotionale Wirkung anwenden) als L4 (systematische Analyse). Der AFB-Operator "erklaeren" (II) passt zu L3, nicht L4.

**Auswirkung:** Wenn Pos 5 als L3 neu klassifiziert wird, aendert sich die Bloom-Verteilung zu: L1-L2: 2 (29%), L3-L4: 3 (43%, aber alle L3), L5-L6: 2 (29%). Policy A19 bleibt PASS. Kein funktionales Problem — nur Deklarationsfehler.

**Empfehlung:** Bloom-Wert in PROGRESSIONSPLAN von L4 auf L3 korrigieren.

---

## 5. Gesamtbewertung

| Dimension | Bewertung |
|---|---|
| Prozesstreue | CONDITIONAL PASS — H1 ist Infrastruktur-Luecke, kein Agent-Fehler |
| Phase 2.1c Artefakt-Qualitaet | PASS (1 WARN: M2 Zitat-Marker) |
| Phase 2.2a Artefakt-Qualitaet | PASS (1 WARN: M1 Bloom-Typ-Alignment) |
| Q-Gate-Log Konsistenz | PASS (1 LOW: L1 Wortanzahlen) |
| Infrastruktur-Patch-Propagation | FAIL — L2 zeigt unvollstaendige Synchronisation |

**CONDITIONAL PASS (1H / 2M / 2L)**

Die Artefakte sind produktionstauglich. Die Progression ist didaktisch sinnvoll, die Cross-Konsistenz ist gegeben. Der kritische Mangel ist prozessual: Phase 2.1b wurde uebersprungen, weil die State Machine nicht aktualisiert wurde. Dies muss vor Phase 2.2b gepatcht werden.

---

## 6. Empfohlene Aktionen (priorisiert)

| Prio | Aktion | Aufwand |
|---|---|---|
| 1 | PROJECT_INSTRUCTIONS.md: Phase 2.1b in State Machine einfuegen | 5 min |
| 2 | Phase 2.1b nachtraeglich ausfuehren (Validierungs-Testlauf) | 15-20 min |
| 3 | PROGRESSIONSPLAN Pos 5: Bloom L4 → L3 korrigieren | 1 min |
| 4 | sicherung.json zitat.urheber: [sinngemäß] ergaenzen | 1 min |
| 5 | Q-GATE-LOG Phase 2.1 Wortanzahlen-Nachtrag (optional) | 2 min |
