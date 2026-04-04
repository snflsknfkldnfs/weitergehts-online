# C2 Konsolidiertes Verlaufsprotokoll: Mappe-4-Produktion

**Erstellt:** 2026-04-04 (PM-Session 10)
**Quellen:** C2_VERLAUF_SESSION_P-1.md bis P-6.md
**Zweck:** Referenzdokument fuer dimensionale Audits D1-D8. Aggregiert Metriken, Findings und Beobachtungen aus allen 6 Produktionssessions.

---

## 1. Gesamtueberblick

| Metrik | Wert |
|---|---|
| Sessions gesamt | 6 (P-1 bis P-6) |
| Umgebungen | 5× Cowork, 1× Claude Code (Worktree) |
| Gesamtdauer | 86 min (21:19 UTC 03.04. bis 09:04 UTC 04.04.) |
| Dispatches ausgefuehrt | 18 (D-1, D-1.5, D0-D14 inkl. D12b, D12c) |
| Dispatches offen | D15 (Browser-Validierung) |
| Compaction-Events | 2 (P-2 nach D2, P-5 nach D12c) |
| Tool-Calls gesamt | 343 |
| Output-Tokens gesamt | ~195.000 |
| Q-Gate PASS 1. Durchlauf | 16/16 (exkl. D7 Planungsartefakt, D-1, D-1.5) |
| Nachbesserungen Material | 1 (D1: 153→150 W) |
| Nachbesserungen Aufgaben | 0/7 |
| Nachbesserungen Assembly | 2 (JSON-Encoding aufgabe-4-1 + aufgabe-4-4) |
| User-Interventionen | 2 (P-4: fehlender Split-Prompt; P-6: git-push-Bestaetigung) |
| Cross-Konsistenz FAILs | 0 (Material 4/4, Aufgaben 10/10) |

---

## 2. Session-Chronologie

| Session | Datum/Zeit (UTC) | Dauer | Dispatches | Phase(n) | Compactions | Tool-Calls | Out-Tokens |
|---|---|---|---|---|---|---|---|
| P-1 | 03.04. 21:19–21:28 | 9 min | D-1, D-1.5 | 1 (Design + Sequenzierung) | 0 | 35 | ~29.000 |
| P-2 | 03.04. 21:28–21:48 | 19 min | D0, D1, D2, D3 | 2.0 + 2.1 (3 Mat.) | 1 | 75 | ~47.500 |
| P-3 | 04.04. 07:42–07:54 | 12 min | D4, D5 | 2.1 (2 Mat.) | 0 | 43 | ~28.600 |
| P-4 | 04.04. 07:56–08:05 | 8 min | D6 | 2.1c (Cross + UE + HE) | 0 | 37 | ~18.700 |
| P-5 | 04.04. 08:05–08:21 | 16 min | D7-D13 | 2.2a + 2.2b + 2.2c | 1 | 78 | ~48.900 |
| P-6 | 04.04. 08:42–09:04 | 22 min | D14 | 3 (Assembly) | 0 | 75 | ~21.200 |

### Phasen-Zuordnung

| Phase | Dispatches | Session(s) | Ergebnis |
|---|---|---|---|
| 1 (Design) | D-1, D-1.5 | P-1 | 5 Materialien, 6 TB-Knoten, Sequenzplan S1-S15 |
| 2.0 (Rahmen) | D0 | P-2 | hefteintrag, einstieg, sicherung, meta.json |
| 2.1 (Materialien) | D1-D5 | P-2, P-3 | 5/5 Mat. PASS, 1 Nachbesserung (D1) |
| 2.1c (Cross) | D6 | P-4 | Cross 4/4, UE 4/4, HE 5/5+17/17 |
| 2.2a (Progressionsplan) | D7 | P-5 | 7 Aufgaben, 5 Typen, AFB I→III |
| 2.2b (Aufgaben) | D8-D12c | P-5 | 7/7 Aufgaben PASS, 0 Nachbesserungen |
| 2.2c (Cross Aufgaben) | D13 | P-5 | Cross 10/10 PASS |
| 3 (Assembly) | D14 | P-6 | data.json, mappe-4.html, 3 Bilder, Commit 2badd4a |
| 4 (Browser-Val.) | D15 | — | OFFEN |

---

## 3. Tool-Call-Aggregation

| Tool | P-1 | P-2 | P-3 | P-4 | P-5 | P-6 | Gesamt |
|---|---|---|---|---|---|---|---|
| Read | 12 | 28 | 14 | 19 | 38 | 30 | **141** |
| Write | 0 | 3 | 2 | 1 | 8 | 1 | **15** |
| Edit | 2 | 10 | 4 | 2 | 18 | 4 | **40** |
| Bash | 0 | 8 | 5 | 5 | 2 | 20 | **40** |
| Grep | 2 | 4 | 3 | 1 | 1 | 1 | **12** |
| Glob | 0 | 1 | 0 | 0 | 0 | 1 | **2** |
| Agent | 2 | 2 | 0 | 0 | 0 | 1 | **5** |
| TodoWrite | 12 | 13 | 8 | 8 | 9 | 8 | **58** |
| ToolSearch | 0 | 1 | 2 | 1 | 2 | 3 | **9** |
| Wikimedia-Search | 0 | 0 | 5 | 0 | 0 | 0 | **5** |
| Claude-Preview | 0 | 0 | 0 | 0 | 0 | 5 | **5** |
| **Gesamt** | **30** | **70** | **43** | **37** | **78** | **74** | **332** |

**Hinweis:** TodoWrite-Calls (58) sind Overhead-Tools ohne Produktionswirkung. Produktive Tool-Calls: 332 - 58 - 9 (ToolSearch) = **265**.

**Verhaeltnis Read:Write+Edit:** 141 : 55 = 2.56:1

---

## 4. Compaction-Events

### Compaction 1 (P-2, nach D2)

| Aspekt | Beobachtung |
|---|---|
| Position | Zwischen D2 (mat-4-2 Karte) und D3 (mat-4-3 Tagebuch) |
| Recovery-Verhalten | Projektanweisung → Dispatch-Skript → Subagent-Prompt |
| Pfad-Fehler | SUB_MATERIAL_TAGEBUCH unter vertraege/ gesucht statt agents/ |
| Pfad-Recovery | Glob-Suche → korrekter Pfad gefunden |
| Sprach-Wechsel | Deutsch → Englisch nach Recovery |
| Vertrag re-gelesen | Nein (P2-F11) |
| Informationsverlust | Minimal — Vertrag nicht re-gelesen, aber Produktions-Output korrekt |

### Compaction 2 (P-5, nach D12c)

| Aspekt | Beobachtung |
|---|---|
| Position | Nach D12c (aufgabe-4-7 Freitext), vor Q-GATE-LOG-Nachfuehrung D10-D12c |
| Recovery-Verhalten | Q-GATE-LOG gelesen → Luecke D10-D12c erkannt → nachgetragen |
| Pfad-Fehler | Keiner |
| Sprach-Wechsel | Deutsch → Englisch nach Recovery |
| Aufgaben 4-7 re-gelesen | Nur 4-1 bis 4-3 (P5-F9) |
| Informationsverlust | Q-Gate-Eintraege D10-D12c temporaer verloren (persistent nachgeholt) |

### Compaction-Pattern

- **Sprach-Wechsel:** Reproduzierbar in beiden Compaction-Events. Englisch statt Deutsch nach Recovery.
- **Pfad-Fehler:** Nur bei Compaction 1 (Verzeichnisstruktur vergessen). Compaction 2 fehlerfrei.
- **Recovery-Qualitaet:** Beides Mal korrekte Identifikation des naechsten Dispatch. Kein Datenverlust bei persistierten Dateien.

---

## 5. Nachbesserungen

| # | Dispatch | Datei | Art | Detail |
|---|---|---|---|---|
| 1 | D1 (P-2) | mat-4-1.json | Wortgrenze | 153→150 Woerter (DT Max = 150). Auto-Korrektur nach Python-Validierung. |
| 2 | D14 (P-6) | aufgabe-4-1.json | Encoding | `„...U+0022` → `„...\u201c`. ASCII-Anführungszeichen brach JSON-Parser. |
| 3 | D14 (P-6) | aufgabe-4-4.json | Encoding | Gleiches Problem, mehrere Stellen. 2 Edits noetig. |

**Vergleich Mappe 3:** 4/5 Aufgaben-Nachbesserungen. Mappe 4: 0/7 inhaltliche Nachbesserungen (Encoding-Fehler sind technisch, nicht inhaltlich).

---

## 6. User-Interventionen

| # | Session | Art | Detail | Severity |
|---|---|---|---|---|
| 1 | P-4 | Prozess-Korrektur | "DU HAST KEINEN SESSION-SPLIT-PROMPT AUSGEGEBEN" — KI lieferte nach. | MEDIUM |
| 2 | P-6 | Bestaetigung | "JA" — git commit+push Bestaetigung. Erwartetes Verhalten. | — |

**Alle anderen Sessions (P-1, P-2, P-3, P-5):** Nur "WEITER" als User-Input. Volle Autonomie.

---

## 7. Findings-Gesamtregister

### Nach Severity

| Severity | Anzahl | Finding-IDs |
|---|---|---|
| HIGH | 1 | P6-F1 |
| MEDIUM | 2 | P2-F2, P4-F1 |
| LOW | 8 | P1-F1, P1-F2, P1-F3, P2-F3, P2-F10, P3-F1, P3-F9, P5-F4, P5-F9, P6-F2 |
| INFO | 14 | (diverse) |
| PASS | 28 | (diverse) |

### Nach Dimension

| Dimension | Findings (HIGH/MEDIUM/LOW) | PASS |
|---|---|---|
| D1 Prozesskongruenz | P4-F1 (MEDIUM) | P1-F5, P3-F4, P4-F8, P5-F2, P5-F10, P6-F7 |
| D2 Didaktik | — | P2-F8, P4-F4, P4-F5, P4-F7, P5-F7 |
| D3 Technik | P6-F1 (HIGH) | P1-F6, P2-F6, P3-F6, P6-F8 |
| D4 Tool-Calling | P3-F1 (LOW), P2-F10 (LOW), P3-F9 (LOW), P5-F9 (LOW) | P3-F8 |
| D5 Token-Effizienz | — | P3-F7, P5-F5 |
| D6 Compaction-Resilienz | P2-F2 (MEDIUM), P2-F3 (LOW), P5-F4 (LOW) | P5-F3 |
| D7 Usability | — | P1-F6 (sic, P3-F5), P4-F9, P5-F8, P6-F6 |
| D8 Infrastruktur | P6-F1 (HIGH, geteilt mit D3) | P4-F6, P5-F12 |

### HIGH Finding Detail

**P6-F1: JSON-Encoding-Fehler in 2 Aufgaben-Dateien**
- **Betroffene Dateien:** aufgabe-4-1.json, aufgabe-4-4.json
- **Root-Cause:** Produktions-KI (P-5, D8/D11) setzte schliessendes Anfuehrungszeichen als ASCII `"` (U+0022) statt typographisch `"` (U+201C) nach oeffnendem `„` (U+201E)
- **Entdeckung:** Erst bei Assembly (P-6, D14) durch Python-JSON-Validierung
- **Warum nicht frueher entdeckt:** P-5 fuehrte KEINE Python-Validierung fuer Aufgaben-JSONs durch (P5-F11). Materialien wurden in P-2/P-3 validiert, Aufgaben nicht.
- **Fix:** 3 Edit-Operationen in P-6
- **Infrastruktur-Implikation:** Encoding-Regel A1 nicht vollstaendig durchgesetzt. Python-Validierung sollte fuer ALLE JSON-Outputs Pflicht sein, nicht nur Materialien.

---

## 8. Produktions-Outputs (Inventar)

### Phase 1
- MATERIAL_GERUEST_gpg-erster-weltkrieg-ursachen_Mappe4.md

### Phase 2.0 (Rahmen)
- rahmen/hefteintrag.json
- rahmen/einstieg.json
- rahmen/sicherung.json (erweitert in D6: zusammenfassung + ueberleitung)
- rahmen/meta.json

### Phase 2.1 (Materialien)
- materialien/mat-4-1.json (DT, Schlieffen-Plan)
- materialien/mat-4-2.json (Karte, Vormarsch Belgien)
- materialien/mat-4-3.json (Tagebuch, Soldat Friedrich)
- materialien/mat-4-4.json (Karte, Marne-Schlacht)
- materialien/mat-4-5.json (BQ, Schuetzengraben-Foto)

### Phase 2.1c
- ueberleitungen.json (4 Ueberleitungen)

### Phase 2.2a
- PROGRESSIONSPLAN_Mappe4.md

### Phase 2.2b (Aufgaben)
- aufgaben/aufgabe-4-1.json (LT, AFB I)
- aufgaben/aufgabe-4-2.json (MC, AFB I)
- aufgaben/aufgabe-4-3.json (RF, AFB I-II)
- aufgaben/aufgabe-4-4.json (ZU, AFB II)
- aufgaben/aufgabe-4-5.json (MC, AFB II)
- aufgaben/aufgabe-4-6.json (RF, AFB II)
- aufgaben/aufgabe-4-7.json (FT, AFB III)

### Phase 3
- escape-games/gpg-erster-weltkrieg-ursachen/data.json (Mappe-4-Objekt)
- escape-games/gpg-erster-weltkrieg-ursachen/mappe-4.html
- assets/images/escape/gpg-erster-weltkrieg-ursachen/img-4-1.svg
- assets/images/escape/gpg-erster-weltkrieg-ursachen/img-4-2.jpg
- assets/images/escape/gpg-erster-weltkrieg-ursachen/img-4-3.jpg

### Steuerung
- DISPATCH_SKRIPT_MAPPE4.md (laufend aktualisiert)
- Q-GATE-LOG.md (laufend aktualisiert)

---

## 9. Vergleich Mappe 3 vs. Mappe 4

| Metrik | Mappe 3 | Mappe 4 | Delta |
|---|---|---|---|
| Materialien | 5 | 5 | = |
| Mat. Q-Gate PASS 1. Durchlauf | 5/5 (100%) | 5/5 (100%) | = |
| Mat. Nachbesserungen | 0 | 1 (Wortgrenze) | +1 |
| Aufgaben | 5 (nach B2: 7→5) | 7 | +2 |
| Aufg. Nachbesserungen | 4/5 (80%) | 0/7 (0%) | **-80pp** |
| Cross-Konsistenz FAILs | 0 | 0 | = |
| Encoding-Fehler (Assembly) | nicht gemessen | 2 Dateien | n/a |
| Dispatches | ~16 | 18 | +2 (D12b, D12c) |
| Infrastruktur-Version | Pre-Revision | Post-Revision (A1-A7, B1-B10, P1-P3) | Upgrade |
| Produktionsumgebung | Claude Code + Cowork PM | Cowork (separates Projekt) + Claude Code | Standardisiert |
| Compaction-Events | nicht gemessen | 2 | n/a |
| User-Interventionen (inhaltlich) | nicht gemessen | 0 | n/a |
| User-Interventionen (prozessual) | nicht gemessen | 1 (fehlender Split-Prompt) | n/a |

---

## 10. Offene Punkte fuer nachfolgende Audits

1. **D15 Browser-Validierung** — Nicht Teil der Prozessanalyse, aber OFFEN im Dispatch-Skript.
2. **Encoding-Root-Cause (P6-F1):** Warum hat die Cowork-KI in P-5 ASCII-Anführungszeichen produziert? Liegt es am Model-Verhalten, am Subagent-Prompt, oder am fehlenden Encoding-Check?
3. **Compaction-Sprach-Wechsel:** Reproduzierbares Pattern. Liegt es an der Compaction-Summary (englisch?) oder am Model-Default nach Context-Reset?
4. **Python-Validierung asymmetrisch:** Materialien wurden systematisch validiert (P-2, P-3), Aufgaben nicht (P-5). Infrastruktur-Luecke.
5. **ARTEFAKT_INVENTAR unvollstaendig (P3-F3):** Nur Mappe 1 enthalten. Mappe 4 nicht nachgetragen.
6. **Session-Split-Prompt-Zuverlaessigkeit:** 4/5 Cowork-Sessions korrekt, 1/5 vergessen (P-4). Claude-Code-Session (P-6) nicht anwendbar.
