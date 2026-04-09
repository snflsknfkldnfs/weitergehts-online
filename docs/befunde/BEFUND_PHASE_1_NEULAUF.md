# BEFUND: Phase-1-Neulauf (AGENT_MATERIAL Design-Modus)

**Datum:** 2026-04-09
**Session:** Cowork-Session `eloquent-wizardly-hawking` (102 Nachrichten, Compaction bei Msg 76)
**Game-ID:** verlauf-erster-weltkrieg-marne-ende
**Evaluator:** PM-Session 26, Dual-Agenten-Audit (Output-Compliance + Prozess-Compliance)
**Vertragsbasis:** AGENT_MATERIAL.md (post-Patch, SCPL-kompatibel, v2.0-Pflichtfelder)

---

## Gesamturteil

**CONDITIONAL PASS**

Output-Qualitaet: PASS (0 CRITICAL, 0 HIGH, 3 LOW). Alle 4 MATERIAL_GERUEST-Dateien sind vertragskonform und produktionsreif.
Prozess-Compliance: 8/10 Kriterien bestanden. 1 CRITICAL Finding (State-Machine nicht aktualisiert), 3 MEDIUM Findings (Token-Ineffizienz).

Bedingung fuer finalen PASS: State-Machine-Update (F-PROC-01) wird im Rahmen dieses PM-Arbeitsschritts nachgeholt.

---

## Dimension 1: Output-Compliance (MATERIAL_GERUEST vs. Vertrag)

### Template-Vollstaendigkeit

Alle 4 Dateien enthalten saemtliche 9 Pflichtsektionen aus §1.8b:

| Sektion | M1 | M2 | M3 | M4 |
|---|---|---|---|---|
| SCPL-Abdeckung | PASS | PASS | PASS | PASS |
| Material-Entwurf | PASS | PASS | PASS | PASS |
| Zielklarheit-Pruefung | PASS | PASS | PASS | PASS |
| Erarbeitbarkeits-Nachweis | PASS | PASS | PASS | PASS |
| Sequenzplan v2.0 (alle Felder) | PASS | PASS | PASS | PASS |
| Uebergangsobjekte | PASS | PASS | PASS | PASS |
| Sequenzkontext-Objekte | PASS | PASS | PASS | PASS |
| Einstieg/Sicherung | PASS | PASS | PASS | PASS |
| Q-Gate Self-Check (S1-S15) | PASS | PASS | PASS w/ WARN | PASS w/ WARN |

### SCPL-Treue

100% Entsprechung mit fixierten TAFELBILDs. Keine unerlaubten Zonen-Aenderungen. C2 in M3 korrekt als INFERENTIAL annotiert.

### Sequenzplan v2.0 Felder

Alle 8 Pflichtfelder (material_charakter, bildfunktion, analyseauftrag, personalisiert, primary_scpl_zone, aktivierungscharakter, fachbegriffe_eingefuehrt[], fachbegriffe_referenziert[]) in allen 20 Materialien vorhanden.

### Mindest-Materialien + Wortbudget

| Mappe | Materialien | DT | QT/BQ | Personifiziert | Visuell | W-Budget |
|---|---|---|---|---|---|---|
| M1 | 5 | 1 | 2 | 2 | 1 | ~500W |
| M2 | 5 | 1 | 2 | 2 | 1 | ~500W |
| M3 | 5 | 1 | 2 | 1 | 2 | ~490W |
| M4 | 5 | 1 | 2 | 2 | 1 | ~500W |

### Fachbegriff-Taxonomie

Keine Doppeleinfuehrungen ueber Mappen. Referenzierte Begriffe korrekt vorher eingefuehrt. Cross-Mappe-Referenzen (M3 ref Kriegsmuedigkeit aus M2) korrekt.

### Anti-Kontamination

PASS. Keine Knoten-IDs, keine k1-X-Notationen, keine Vorgaenger-Game-Referenzen. Die Anti-Kontaminations-Direktive im gepatchten Vertrag hat gewirkt.

---

## Dimension 2: Prozess-Compliance

### Findings

| ID | Severity | Kategorie | Beschreibung | Nachweis |
|---|---|---|---|---|
| F-PROC-01 | CRITICAL | State-Machine | PROJECT_INSTRUCTIONS.md State-Machine am Session-Ende nicht aktualisiert. Phase 1 Status haette auf "DONE → PENDING VALIDATION" gesetzt werden muessen. | Fehlt in Msg 96-101 |
| F-PROC-02 | MEDIUM | Token-Effizienz | AGENT_MATERIAL.md 4x gelesen (Msg 13, 23, 26, 30) statt einmalig vollstaendig. Geschaetzte Verschwendung ~15-20% der Orientierungsphase. | Msg 13/23/26/30 |
| F-PROC-03 | MEDIUM | Token-Effizienz | GUETEKRITERIEN_SEQUENZIERUNG 2x gelesen (Msg 50, 55). | Msg 50/55 |
| F-PROC-04 | MEDIUM | Compaction-Recovery | Post-Compaction (Msg 76): M1-GERUEST erneut gelesen (Msg 89) zur Template-Konsistenz. Pragmatisch, aber planbar gewesen. | Msg 89 |

### Bestandene Prozess-Kriterien

| Kriterium | Status | Nachweis |
|---|---|---|
| Orientierungsphase (PROJECT_INSTRUCTIONS zuerst) | PASS | Msg 5 |
| Zustandserkennung (Phase 0.4 DONE → Phase 1 PENDING) | PASS | Msg 10 (Thinking) |
| Vertragslektuere (AGENT_MATERIAL vollstaendig) | PASS | Msg 13-30 (multi-chunk) |
| Input-Vollstaendigkeit (alle Artefakte gelesen) | PASS | DIDAKTIK (35), INHALTSBASIS (53), SKRIPT (39/42), TB M1-M4 (37/44/46/48) |
| Game-Isolation (keine Cross-Game-Referenzen) | PASS | Null Zugriffe auf gpg-erster-weltkrieg-ursachen |
| Inkrementelle Abarbeitung (M1→M2→M3→M4) | PASS | Writes [61, 67, 73, 96] |
| Compaction-Resilienz (M4 nach Compaction) | PASS | M4 qualitativ gleichwertig mit M1-M3 |
| User-Validierung praesentiert | PASS | Msg 100 (detaillierte Zusammenfassung) |

---

## Dimension 3: Vergleich mit gescheitertem Testrun 1

| Kriterium | Testrun 1 (FAIL) | Neulauf (PASS) |
|---|---|---|
| Vertrag-SCPL-Kompatibilitaet | Knoten/Verbindungen statt SCPL | SCPL durchgaengig |
| v2.0-Sequenzplanfelder | 8 Felder fehlend | Alle 8 Felder vorhanden |
| Vorgaenger-Game-Kontamination | gpg-erster-weltkrieg-ursachen als Vorlage | Keine Cross-Game-Referenzen |
| Uebergangsobjekte | Fehlend | Vollstaendig (rueckbezug, vorausblick, kausalitaet, intentionsskizze) |
| Sequenzkontext-Objekte | Fehlend | Vollstaendig (vorher/nachher konsistent) |
| Fachbegriff-Taxonomie | Nicht vorhanden | Eingefuehrt/Referenziert korrekt getrennt |
| Q-Gate Self-Check | Nicht gegen S1-S15 | S1-S15 vollstaendig referenziert |

**Vertragspatch-Wirksamkeit: 100%.** Alle 3 Findings des Testrun 1 (MG-C1, MG-H1, MG-H2) sind im Neulauf behoben.

---

## Empfehlungen

1. **F-PROC-01 beheben:** State-Machine-Update wird im Rahmen des PM-Commits nachgeholt.
2. **F-PROC-02/03 (Token-Effizienz):** Fuer kuenftige Produktions-Sessions: Vertrag + Guetekriterien einmalig vollstaendig lesen, nicht inkrementell. Ggf. AGENT_MATERIAL §0 "Read-Sequenz-Anweisung" ergaenzen.
3. **F-PROC-04 (Compaction):** Bei 4-Mappen-Produktion ist Compaction erwartbar (~170K Tokens). Ggf. Split-Strategie: 2 Mappen pro Session.
4. **User-Validierung:** Die 4 MATERIAL_GERUESTs sind validierungsreif. Naechster Schritt ist inhaltliche Pruefung durch User.

---

## Fazit

Der Vertragspatch (Knoten→SCPL, Output-Template, v2.0-Pflichtfelder, Anti-Kontaminations-Direktive) hat die im Testrun 1 identifizierten Defekte vollstaendig behoben. Die Produktions-Pipeline liefert jetzt vertragskonformen Output. Die Token-Ineffizienz im Prozess ist optimierbar, aber kein Blocker. Phase 2.1 (Materialproduktion) kann nach User-Validierung starten.
