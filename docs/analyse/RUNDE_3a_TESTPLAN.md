# Runde 3a: Testplan — v4 Prozesstest unter Realbedingungen

**Datum:** 2026-04-01 (aktualisiert)
**Ziel:** Mappe-2-Produktion (Phase 2.0 + 2.1 + 2.1c, optional 2.2) als kontrollierten Test der v4-Infrastruktur durchfuehren
**Game-ID:** gpg-erster-weltkrieg-ursachen
**Methode:** Realgetreuer Produktionslauf — Evaluation ausschliesslich post-hoc

---

## 1. Pre-Flight Checkliste

| # | Aktion | Status | Ergebnis |
|---|---|---|---|
| PF-1 | git revert c9eb9ec (Mappe-2-Altdaten entfernen) | DONE | Commit a1576d0 — data.json nur Mappe 1, Bilder + HTML geloescht |
| PF-2 | Produktionsverzeichnis anlegen | DONE | mappe-2/{rahmen,materialien,aufgaben} erstellt |
| PF-3 | MATERIAL_GERUEST gegen Audit-Fixes validieren | DONE | Kompatibel, keine Aenderungen noetig |
| PF-4 | HANDOFF_PHASE2.md erstellen | DONE | Referenzdokument im Produktionsverzeichnis (wird Agent NICHT aufgedraengt) |
| PF-5 | Repo-Update committen + pushen | DONE | 10 Commits (6852c54..d627924), 85 Dateien |

---

## 2. Testdurchfuehrung

### Prinzip: Realgetreuer Produktionslauf

Der Test simuliert eine echte Produktion — nicht einen Test ueber eine Produktion. Der ausfuehrende Agent erhaelt **keine Metainformationen** ueber:
- Das Evaluationsframework (Ebenen 1-4)
- Die Token-Messung
- Die Compaction-Stresstests
- Die Tatsache, dass es sich um einen Test handelt

**Kickoff-Prompt (frische Cowork-Session):**

```
Lies docs/agents/ORCHESTRATOR.md und fuehre Phase 2 fuer folgendes Game aus:

Game-ID: gpg-erster-weltkrieg-ursachen
Mappe: 2
Produktionsverzeichnis: docs/agents/artefakte/produktion/gpg-erster-weltkrieg-ursachen/mappe-2/
MATERIAL_GERUEST: docs/agents/artefakte/MATERIAL_GERUEST_gpg-erster-weltkrieg-ursachen_Mappe2.md

Phase 0 und Phase 1/1.5 sind abgeschlossen. Alle Eingabe-Artefakte validiert.
Beginne mit Phase 2.0 (Rahmen-Produktion).
```

Der Agent muss selbststaendig aus ORCHESTRATOR.md und den dort referenzierten Dokumenten ableiten, was zu tun ist. Jede Hilfestellung verfaelscht den Test.

### Session-Splits (Compaction-Stresstest)

Session-Splits werden durch natuerliche Unterbrechungen erzwungen, nicht angekuendigt:

| Split-Punkt | Ausloeser | Erwartung |
|---|---|---|
| Nach D03 (User-Validierung) | Neue Cowork-Session fuer D04 ff. | Agent arbeitet aus Dateien weiter (P1) |
| Nach D08 (CHECKPOINT) | Neue Cowork-Session fuer Phase 2.2 (falls Runde 3b) | PROGRESSIONSPLAN als Uebergabe-Artefakt genuegt |

### User-Interaktion waehrend Produktion

Nur an den im Workflow definierten Punkten:
- User-Validierung nach D02+D03 (PFLICHT, Strategie-Audit E1)
- CHECKPOINT nach D08 (Entscheidung: weiter oder Korrekturschleife)

Keine Korrekturhinweise ausserhalb dieser Punkte — es sei denn, ein offensichtlicher Strukturfehler macht Weiterarbeit sinnlos.

---

## 3. Post-hoc-Evaluationsframework

Die Evaluation erfolgt NACH Abschluss aller Dispatches, NICHT waehrend der Produktion. Eingaben: Produzierte .json-Dateien, Q-GATE-LOG.md, Konversationsverlaeufe der Sessions.

### Ebene 1: Prozesskonformitaet (binaer, pro Dispatch)

| Kriterium | Pruefmethode | PASS-Bedingung |
|---|---|---|
| P1-Einhaltung | Konversationsverlauf pruefen: Hat jeder Dispatch seine Eingaben aus Dateien gelesen? | Kein Dispatch nutzt Konversationskontext vorheriger Dispatches |
| P4-Einhaltung | Output-Verzeichnis pruefen: 1 Datei pro Dispatch? | Jeder Dispatch erzeugt genau 1 .json (Rahmen: 4 Dateien = 1 Dispatch) |
| P5-Einhaltung | Q-GATE-LOG.md pruefen: Jeder Dispatch mit Q-Gate? | Kein Dispatch ohne Q-Gate-Eintrag |
| P6-Einhaltung | Konversationsverlauf gegen Schnittstellen-Vertrag pruefen | Keine ueberfluessigen Reads, keine fehlenden Reads |
| Interface-Contracts | Output-JSON gegen WORKFLOW_v4.md Vertrag pruefen | Alle Pflichtfelder vorhanden, keine undefinierten Felder |

### Ebene 2: Artefaktqualitaet (Goldstandard-Vergleich)

| Kriterium | Referenz | Pruefmethode |
|---|---|---|
| Strukturelle Isomorphie | Mappe-1-JSON in data.json | JSON-Keys von Mappe-2-Artefakten muessen identische Struktur wie Mappe-1-Pendants haben |
| Engine-Kompatibilitaet | escape-engine.js | typ, loesung, inhalt — korrekte Formate fuer _renderMaterial, _checkFreitextCode etc. |
| Inhaltliche Konsistenz | MATERIAL_GERUEST Mappe 2 | TB-Knoten → Material → Aufgabe Rueckverweise lueckenlos |
| Q-Gate-Qualitaet | QUALITAETSKRITERIEN_MATERIALPRODUKTION.md | MQ1-MQ5 + typ-spezifische Kriterien alle PASS |
| M3b-Constraint | rahmen/tafelbild.json | sicherung.kernerkenntnisse[] === tafelbild.scpl.loesung[] |

### Ebene 3: Compaction-Resilienz

| Kriterium | Pruefmethode | PASS-Bedingung |
|---|---|---|
| Kein Informationsverlust nach Session-Split | D04-Output mit D02/D03-Output vergleichen: Konsistente Qualitaet? | Keine Regression in Struktur oder Inhalt |
| Artefakt-Autarkie | Koennte ein voellig kontextfreier Agent aus den geschriebenen Dateien weiterarbeiten? | Alle Informationen in Dateien persistiert |

### Ebene 4: Token-Effizienz (NEU)

| Metrik | Messmethode | Ziel |
|---|---|---|
| Kontext-Aufbau pro Dispatch | Gelesene Dateien + geschaetzte Token-Summe | Baseline fuer Optimierung |
| WORKFLOW_v4.md-Anteil | Wie viel von WORKFLOW_v4 wurde pro Dispatch gelesen? | Identifiziere ueberfluessige Reads |
| ORCHESTRATOR.md-Anteil | Wurde ORCHESTRATOR komplett gelesen oder nur phasen-relevant? | Identifiziere Redundanz |
| Nutz-Token-Ratio | (Output-Tokens) / (Input-Tokens) pro Dispatch | Baseline (kein Zielwert fuer Runde 3a) |
| Gesamtverbrauch Runde 3a | Summe aller Dispatch-Token (In + Out) | Baseline fuer Vergleich mit optimierter Runde 3b |

---

## 4. Dispatch-Referenz (Post-hoc-Auswertungsbogen)

Pro Dispatch nach Abschluss ausfuellen:

```
[D##] _______________
  Status:     [ ] PASS  [ ] FAIL  [ ] PASS mit Nachbesserung
  P1:         [ ] konform  [ ] verletzt (Detail: ___)
  P4:         [ ] konform  [ ] verletzt (Detail: ___)
  P5:         [ ] Q-Gate geschrieben  [ ] fehlt
  P6:         [ ] konform  [ ] ueberfluessige Reads: ___  [ ] fehlende Reads: ___
  Token-est:  Input ~___ | Output ~___
  Dateien gelesen: ___
  Dateien geschrieben: ___
  Befunde: ___
```

### Dispatch-Liste

D01: Rahmen (Phase 2.0) — 4 Output-Dateien
D02: mat-2-1 darstellungstext
D03: mat-2-2 bildquelle
--- USER-VALIDIERUNG PFLICHT ---
D04: mat-2-3 bildquelle
D05: mat-2-4 quellentext
D06: mat-2-5 zeitleiste
D07: mat-2-6 tagebuch (Engine: quellentext)
D08: Material-Cross-Konsistenz (Phase 2.1c)
--- CHECKPOINT ---

---

## 5. Erfolgskriterien Runde 3a

| Kriterium | Schwelle | Bewertung |
|---|---|---|
| Prozesskonformitaet | 100% (alle Dispatches P1/P4/P5/P6 konform) | BLOCKER wenn < 100% |
| Q-Gate-Quote | >= 80% PASS beim ersten Durchlauf | HIGH wenn < 80% |
| Cross-Konsistenz | Alle 4 Achsen PASS | BLOCKER wenn eine Achse FAIL ohne Nachbesserung |
| Strukturelle Isomorphie | 100% Key-Match mit Mappe-1-Referenz | HIGH wenn < 100% |
| Compaction-Resilienz | Kein Informationsverlust nach Session-Split | BLOCKER wenn Verlust |
| Token-Baseline | Gesamtverbrauch dokumentiert | Informativ (kein Schwellenwert) |

---

## 6. Ergebnis-Dokumentation

Nach Abschluss: `docs/analyse/RUNDE_3a_ERGEBNIS.md` mit:

1. **Dispatch-Protokoll:** Alle Auswertungsboegen (Sektion 4) ausgefuellt
2. **Befunde pro Ebene:** Ebene 1-4 Ergebnisse
3. **Token-Profil:** Tabellarische Uebersicht Input/Output pro Dispatch, Gesamtverbrauch, WORKFLOW/ORCHESTRATOR-Leseanteil
4. **Optimierungsempfehlungen:** Konkrete Massnahmen fuer Token-Reduktion (→ Vertrags-Extraktion, Orchestrator-Schlankung)
5. **Prozessverbesserungen:** Fuer Runde 3b/4
6. **Entscheidung:** v4-Infrastruktur produktionsreif ja/nein
