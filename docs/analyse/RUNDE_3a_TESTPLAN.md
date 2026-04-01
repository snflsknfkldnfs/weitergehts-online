# Runde 3a: Testplan — v4 Prozesstest unter Realbedingungen

**Datum:** 2026-04-01
**Ziel:** Mappe-2-Produktion (Phase 2.0 + 2.1 + 2.1c, optional 2.2) als kontrollierten Test der v4-Infrastruktur durchfuehren
**Game-ID:** gpg-erster-weltkrieg-ursachen

---

## 1. Pre-Flight Checkliste

| # | Aktion | Status | Ergebnis |
|---|---|---|---|
| PF-1 | git revert c9eb9ec (Mappe-2-Altdaten entfernen) | AUSSTEHEND | data.json manuell bereinigt, git revert durch User |
| PF-2 | Produktionsverzeichnis anlegen | DONE | mappe-2/{rahmen,materialien,aufgaben} erstellt |
| PF-3 | MATERIAL_GERUEST gegen Audit-Fixes validieren | DONE | Kompatibel, keine Aenderungen noetig |
| PF-4 | HANDOFF_PHASE2.md erstellen | DONE | Simulierter Orchestrator-Handoff dokumentiert |

---

## 2. Evaluationsframework

### Ebene 1: Prozesskonformitaet (binaer, pro Dispatch)

| Kriterium | Pruefmethode | PASS-Bedingung |
|---|---|---|
| P1-Einhaltung | Dispatch-Protokoll pruefen: Alle Eingaben aus Dateien gelesen? | Kein Dispatch liest aus Konversationskontext vorheriger Dispatches |
| P4-Einhaltung | Output-Verzeichnis pruefen: 1 Datei pro Dispatch? | Jeder Dispatch erzeugt genau 1 .json (Rahmen: 4 Dateien = 1 Dispatch) |
| P5-Einhaltung | Q-GATE-LOG.md pruefen: Jeder Dispatch mit Q-Gate? | Kein Dispatch ohne Q-Gate-Eintrag |
| P6-Einhaltung | Read-Schritte gegen Schnittstellen-Vertrag pruefen | Keine ueberfluesigen Reads, keine fehlenden Reads |
| Interface-Contracts | Output-JSON gegen WORKFLOW_v4.md Vertrag pruefen | Alle Pflichtfelder vorhanden, keine undefinierten Felder |

### Ebene 2: Artefaktqualitaet (Goldstandard-Vergleich)

| Kriterium | Referenz | Pruefmethode |
|---|---|---|
| Strukturelle Isomorphie | Mappe-1-JSON in data.json | JSON-Keys von Mappe-2-Artefakten muessen identische Struktur wie Mappe-1-Pendants haben |
| Engine-Kompatibilitaet | escape-engine.js | typ, loesung, inhalt — korrekte Formate fuer _renderMaterial, _checkFreitextCode etc. |
| Inhaltliche Konsistenz | MATERIAL_GERUEST Mappe 2 | TB-Knoten → Material → Aufgabe Rueckverweise lueckenlos |
| Q-Gate-Qualitaet | QUALITAETSKRITERIEN_MATERIALPRODUKTION.md | MQ1-MQ5 + typ-spezifische Kriterien alle PASS |
| M3b-Constraint | rahmen/tafelbild.json | sicherung.kernerkenntnisse[] === tafelbild.scpl.loesung[] |

### Ebene 3: Compaction-Resilienz (Stresstest)

| Szenario | Durchfuehrung | Erwartung |
|---|---|---|
| Session-Split zwischen D03 und D04 | Neue Cowork-Runde nach User-Validierung | D04 arbeitet ausschliesslich aus Dateien, kein Informationsverlust |
| Session-Split zwischen D08 und D09 | CHECKPOINT = natuerlicher Split-Punkt | D09 (Progressionsplan) liest nur fertige Materialien + Rahmen |

---

## 3. Durchfuehrungsprotokoll

### Phase 2.0: Rahmen (1 Dispatch)

```
[D01] Rahmen-Dispatch
  Eingabe: MATERIAL_GERUEST (Einstieg + Sicherung), Tafelbild (FREEZE), ORCHESTRATOR, SKRIPT
  Output:  rahmen/meta.json, rahmen/einstieg.json, rahmen/sicherung.json, rahmen/tafelbild.json
  Q-Gate:  C1b-Identitaetsregel, M3b-Constraint
  Eval:    [ ] P1  [ ] P4  [ ] P5  [ ] P6  [ ] M3b
```

### Phase 2.1: Materialien (6 Dispatches)

```
[D02] mat-2-1 (darstellungstext)
  Subagent: SUB_MATERIAL_DARSTELLUNGSTEXT.md
  Eval:     [ ] P1  [ ] P4  [ ] P5  [ ] P6  [ ] MQ1-MQ5  [ ] DT1-DT6

[D03] mat-2-2 (bildquelle)
  Subagent: SUB_MATERIAL_BILDQUELLE.md
  Eval:     [ ] P1  [ ] P4  [ ] P5  [ ] P6  [ ] MQ1-MQ5  [ ] BQ1-BQ8

--- USER-VALIDIERUNG PFLICHT (Ton, Sprachregister, R7-Niveau) ---

[D04] mat-2-3 (bildquelle)
  Subagent: SUB_MATERIAL_BILDQUELLE.md
  Eval:     [ ] P1  [ ] P4  [ ] P5  [ ] P6  [ ] MQ1-MQ5  [ ] BQ1-BQ8

[D05] mat-2-4 (quellentext)
  Subagent: SUB_MATERIAL_QUELLENTEXT.md
  Eval:     [ ] P1  [ ] P4  [ ] P5  [ ] P6  [ ] MQ1-MQ5  [ ] QT1-QT6

[D06] mat-2-5 (zeitleiste)
  Subagent: SUB_MATERIAL_ZEITLEISTE.md
  Eval:     [ ] P1  [ ] P4  [ ] P5  [ ] P6  [ ] MQ1-MQ5

[D07] mat-2-6 (tagebuch → Engine: quellentext)
  Subagent: SUB_MATERIAL_TAGEBUCH.md
  Eval:     [ ] P1  [ ] P4  [ ] P5  [ ] P6  [ ] MQ1-MQ5
```

### Phase 2.1c: Cross-Konsistenz (1 Dispatch)

```
[D08] Material-Cross-Konsistenz
  Eingabe: Alle mat-2-*.json + rahmen/tafelbild.json + MATERIAL_GERUEST
  Pruefachsen: Sequenz-Kohaerenz, Fachbegriff-Konsistenz, Ueberleitung-Kohaerenz, TB-Abdeckung
  Eval:    [ ] P1  [ ] 4 Achsen PASS  [ ] Q-GATE-LOG
```

### CHECKPOINT

Entscheidung: Weiter zu Phase 2.2 (Aufgaben) oder Korrekturschleife.

---

## 4. Erfolgskriterien Runde 3a

| Kriterium | Schwelle | Bewertung |
|---|---|---|
| Prozesskonformitaet | 100% (alle Dispatches P1/P4/P5/P6 konform) | BLOCKER wenn < 100% |
| Q-Gate-Quote | >= 80% PASS beim ersten Durchlauf | HIGH wenn < 80% |
| Cross-Konsistenz | Alle 4 Achsen PASS | BLOCKER wenn eine Achse FAIL ohne Nachbesserung |
| Strukturelle Isomorphie | 100% Key-Match mit Mappe-1-Referenz | HIGH wenn < 100% |
| Compaction-Resilienz | Kein Informationsverlust nach Session-Split | BLOCKER wenn Verlust |

---

## 5. Ergebnis-Dokumentation

Nach Abschluss: `docs/analyse/RUNDE_3a_ERGEBNIS.md` mit:
- Dispatch-Protokoll (alle [ ] aufgeloest)
- Befunde pro Ebene
- Prozessverbesserungen fuer Runde 3b/4
- Entscheidung: v4-Infrastruktur produktionsreif ja/nein
