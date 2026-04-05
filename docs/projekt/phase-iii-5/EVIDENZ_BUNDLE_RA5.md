# Evidenz-Bundle RA5 — Meta-Auditor

**Zielgruppe:** RA5 Selbstprueferin / Meta-Auditor (operiert NACH Abschluss von RA1-RA4, RA6).

## Pflicht-Lektuere

1. `docs/projekt/phase-iii-5/CHARTA_RA5_META.md`
2. **Die 5 fertigen RA-Berichte:**
   - `docs/projekt/phase-iii-5/BERICHT_RA1_SCOPE_DRIFT.md`
   - `docs/projekt/phase-iii-5/BERICHT_RA2_DEPENDENCIES.md`
   - `docs/projekt/phase-iii-5/BERICHT_RA3_CODE_KOPPLUNG.md`
   - `docs/projekt/phase-iii-5/BERICHT_RA4_PIPELINE.md`
   - `docs/projekt/phase-iii-5/BERICHT_RA6_KONTEXT.md`
3. **Die 5 Rollen-Charten** (um Scope-Disziplin der RAs beurteilen zu koennen):
   - `docs/projekt/phase-iii-5/CHARTA_RA1_SCOPE_DRIFT.md`
   - `docs/projekt/phase-iii-5/CHARTA_RA2_DEPENDENCIES.md`
   - `docs/projekt/phase-iii-5/CHARTA_RA3_CODE_KOPPLUNG.md`
   - `docs/projekt/phase-iii-5/CHARTA_RA4_PIPELINE.md`
   - `docs/projekt/phase-iii-5/CHARTA_RA6_KONTEXT.md`

## Kontextuelle Lektuere

- `docs/projekt/D15B_OPTIMIERUNGS_STRATEGIEN.md` — nur zur Verifikation einzelner Zitate aus RA-Berichten, nicht als eigene Analysebasis.

## Verboten

- Du fuehrst KEIN eigenes STR-Audit durch. Du bewertest die Berichte der anderen.
- Kein Durchreichen von Findings ohne Kommentar.
- Keine Code-Dateien.
- Keine Vertraege.

## Erwartete Output-Datei

`docs/projekt/phase-iii-5/BERICHT_RA5_META.md` mit Konvergenz-Matrix (Pflicht-Anhang) und Scoring-Tabelle aller 5 RAs.

## Kritische Ankerpunkte

- **Blind-Spot-Kategorien zu pruefen:** Performance, Sicherheit, Datenschutz, operative Robustheit, Rollback-Faehigkeit, Developer-Experience der Subagenten-Autoren, Dokumentations-Drift.
- **Konvergenz vs. Dissens:** Konvergente Findings bekommen hoeheres Gewicht in Phase 5e. Dissens muss identifiziert und klassifiziert werden (resolvable/fundamental).
- **Severitaets-Kalibrierung:** Unterschiede in Severity-Vergabe zwischen RAs koennen auf Kalibrierungs-Probleme hinweisen, nicht unbedingt auf inhaltliche Differenzen.
- **Scope-Disziplin:** Hat ein RA seinen Scope verlassen? Das ist ein CRITICAL Meta-Finding.
- **Rubrik-Selbstkritik:** Du musst deine eigene Rubrik als limitiert anerkennen — sie ist Erstversion.

## Werkzeug-Hinweis

Nutze `mcp__sequentialthinking__sequentialthinking` fuer die Cross-RA-Widerspruchs-Detektion. Schrittweise, nicht ad hoc.
