# STR Mutations-Beschluss — finale Verdikte aller 20 aktiven STR

**Datum:** 2026-04-05
**Status:** FINAL (Phase III.5e)
**Grundlage:** D15B_PHASE_III_5_SYNTHESE.md + RA7_NACHKALIBRIERUNG.md + ZWEITMEINUNG_VERGLEICH.md
**Vorgaenger:** D15B_OPTIMIERUNGS_STRATEGIEN.md (25 STR → 20 aktive nach Phase III Evaluation)

---

## 0. Meta

Aus urspruenglich 25 Strategien wurden in Phase III bereits 4 gestrichen (STR-07, STR-10, STR-16, STR-18) und 1 aufgegangen (STR-09 alt → STR-09-NEU). Aktiv verbleiben **20 STR**. Phase III.5 hat keine weiteren Streichungen ergeben. 1 MODIFY-SCOPE (STR-05), 1 Design-Change (STR-13), 18 ACCEPT (15 davon mit Patch/Constraint, 3 ohne).

## 1. Verdikt-Tabelle (final)

| STR | Kurzform | Verdikt | Patch/Constraint-Ref | Gate? |
|---|---|---|---|---|
| STR-01 | Rollen-System | ACCEPT | K1 Katalog-Patch (P0-Luecke Rollen-Definition) | G-2 BLOCKING |
| STR-02 | Spuren-Mechanik | ACCEPT | ATOM-UNIT AU-1 (mit STR-11) | G-6 |
| STR-03 | Feedback-Schema `{typ,text,ebene}` | ACCEPT | V2 Vertrags-Patch + E2 Legacy-Fallback | G-1 + G-4 BLOCKING |
| STR-04 | Aufgabentypologie | ACCEPT | V4 ATOM-UNIT-Framework, AU-2 | G-1 + G-6 BLOCKING |
| STR-05 | Session-Split | **MODIFY-SCOPE** | V1 ORCHESTRATOR-Enforcement, AU-4 | G-1 BLOCKING |
| STR-06 | Rueckblende | ACCEPT | (keine Patches, Zeit-Constraint bereits in Eval aufgeweicht) | — |
| STR-08 | Quellenkritik Progression | ACCEPT | V3 Bloom-Validation (Soft-Gate), AU-3 | G-1 (soft) |
| STR-09-NEU | Differenzierungs-Exit (Hover + KI-Prompts) | ACCEPT | **Folgeprojekt ausserhalb Phase IV** | — |
| STR-11 | neue Aufgabentypen | ACCEPT | E1 Renderer-Generalisierung, AU-3 | G-3 BLOCKING |
| STR-12 | Trigger-Warnungen Lehrkraft-Metadaten | ACCEPT | K2 Katalog-Patch + technischer Sichtbarkeits-Enforcement | G-5 BLOCKING |
| STR-13 | Mappenabschluss-Reflexions-Zone | **DESIGN-CHANGE** | D2 ohne Persistenz ODER In-App-Privacy-Notice | G-7 BLOCKING |
| STR-14-NEU | Fiktionalitaets-Kennzeichnung in Quellenangabe | ACCEPT | (keine Patches, bereits leichte Form) | — |
| STR-15 | Kooperations-Modus | ACCEPT | (keine Patches) | — |
| STR-17 | Geraete-Rotation | ACCEPT | (keine Patches) | — |
| STR-19 | Difficulty-Paths | ACCEPT | (keine Patches, ueberlappt mit STR-09-NEU) | — |
| STR-20 | Meta-Reflexion | ACCEPT | (keine Patches) | — |
| STR-21 | Lehrkraft-Dashboard | ACCEPT | (keine Patches) | — |
| STR-22 | Export-Funktion | ACCEPT | (keine Patches) | — |
| STR-23 | Quellen-Zitation | ACCEPT | (ueberlappt mit STR-14-NEU) | — |
| STR-24 | Mappen-Q-Gate Checkliste | ACCEPT | (bereits in Phase III praezisiert) | — |
| STR-25 | Auswertungs-Modus | ACCEPT | (keine Patches) | — |

## 2. Portfoliowide-Statistik (final nach Zweitmeinung)

- **Aktive STR:** 20
- **Gestrichene STR:** 0 neu (4 bereits in Phase III)
- **MODIFY-SCOPE:** 1 (STR-05)
- **DESIGN-CHANGE:** 1 (STR-13)
- **ACCEPT mit BLOCKING-Patch:** 7 (STR-01, STR-03, STR-04, STR-05, STR-11, STR-12, STR-13)
- **ACCEPT mit SOFT-Gate:** 1 (STR-08)
- **ACCEPT ohne Patch:** 11
- **BLOCKING-Gates abgedeckt durch STR-Mutationen:** G-1, G-2, G-3, G-4, G-5, G-6, G-7

## 3. Implementation-Reihenfolge (Phase IV Waves)

### Wave 0 — Pre-Implementation (BLOCKING vor erster Aufgaben-Arbeit)
1. V1 ORCHESTRATOR Session-Split (STR-05)
2. V2 Feedback-Schema (STR-03)
3. V4 ATOM-UNIT-Framework (STR-04)
4. K1 STR-01 Rollen-Definition
5. E1 Renderer-Generalisierung (STR-11)
6. E2 Legacy-Feedback-Fallback (STR-03)
7. D1 Wikimedia-Bilder lokalisieren
8. Transkript-Pruefung DOK1

### Wave 1 — Trigger/Sichtbarkeit/Q-Gate
9. K2 + technischer Sichtbarkeits-Enforcement (STR-12)
10. STR-13 Design-Entscheidung (ohne Persistenz vs. In-App-Notice)
11. STR-24 Q-Gate-Katalog

### Wave 2 — Content-STR
12. STR-02, STR-04, STR-08, STR-11 Aufgaben-Erstellung (ATOM-UNITs)
13. STR-06 Rueckblenden punktuell

### Wave 3 — Lehrkraft/Export
14. STR-21 Dashboard, STR-22 Export, STR-25 Auswertungs-Modus

### Wave 4 — Optional/Folgeprojekt
15. STR-09-NEU Differenzierungs-Exit (Folgeprojekt)
16. STR-15 Kooperation, STR-17 Rotation, STR-19 Difficulty-Paths, STR-20 Meta-Reflexion

## 4. Dissens-Register (final)

Kein offener Dissens. Einziger historischer Dissens (RA7-Original vs. Nachkalibrierung) aufgeloest durch User-Faktenkorrektur zugunsten Nachkalibrierung. Zweitmeinung bestaetigt alle 7 RAs + Nachkalibrierung + Synthese ohne Dissens.

## 5. Phase-IV Startbedingungen (Go-Kriterien)

Phase IV darf starten sobald:
1. Commits fuer Wave 0 Punkte 1-7 merged sind (atomarer Commit-Verbund empfohlen).
2. DOK1 Transkript-Pruefung abgeschlossen, kein Personenbezug gefunden ODER pseudonymisiert.
3. State-File auf `Phase IV Wave 0 DONE, Wave 1 IN_PROGRESS` gesetzt.
4. Phase-IV Runde-1 Uebergabe-Prompt erstellt.

Soft-Gates (innerhalb 2 Wochen nach Phase-IV-Start):
- D3 datenschutz.html schreiben
- DOK2 GitHub AVV Schultraeger-Klaerung initiieren
- V3 Bloom-Validation aktivieren

## 6. Abgrenzung zu Folgeprojekten

Ausserhalb Phase IV Scope (explizit):
- STR-09-NEU Differenzierungs-Exit (Folgeprojekt nach Stabilitaet Kerninfrastruktur)
- EU-Hosting-Migration (falls GitHub AVV nicht akzeptabel, mittelfristig evaluieren)
- RA7-Follow-up-Audit nach Implementierung D1+D2 (Soft)

---

**Status:** FINAL. Eingang in `UEBERGABE_PHASE_III_5_5e.md` als autoritative STR-Beschluss-Basis fuer Phase IV Wave 0.
