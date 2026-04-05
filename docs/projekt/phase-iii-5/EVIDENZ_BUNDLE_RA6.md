# Evidenz-Bundle RA6 — Kontext-Kollision

**Zielgruppe:** RA6 Kontext-Kollisions-Pruefer (isoliert).

## Pflicht-Lektuere

1. `docs/projekt/phase-iii-5/CHARTA_RA6_KONTEXT.md`
2. `docs/projekt/D15B_OPTIMIERUNGS_STRATEGIEN.md`
3. **Alle 6 Gueteregel-Kataloge:**
   - `docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md` (G1-G14)
   - `docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG_PRODUKT.md` (HE1-HE13)
   - `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md` (A1-A18)
   - `docs/checklisten/GUETEKRITERIEN_SKRIPT.md` (SK1-SK15)
   - `docs/checklisten/GUETEKRITERIEN_SEQUENZIERUNG.md` (S1-S15)
   - `docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md` (M1-M12 + typ-spezifisch)
4. `docs/checklisten/Checkliste_Interaktive_Materialien.md`

## Kontextuelle Lektuere (nach STR-Bezug)

- `docs/architektur/WORKFLOW_v4.md`
- `docs/architektur/UPGRADE_PLAN_v4_PRODUKTIONSARCHITEKTUR.md`
- `docs/analyse/*` — nur die, auf die STR explizit verweisen.
- `docs/projekt/D15B_IMPLIKATIONS_MATRIX.md` — fuer Cluster-zu-Dokument-Mapping.

## Verboten

- `assets/js/*` — RA3-Scope.
- Vertraege + Agent-Definitionen — RA4-Scope.
- DAG-Analyse — RA2-Scope.
- Scope-Drift-Urteile — RA1-Scope.
- Andere RA-Berichte.

## Erwartete Output-Datei

`docs/projekt/phase-iii-5/BERICHT_RA6_KONTEXT.md` mit Dokument-zu-STR-Kollisions-Matrix und mindestens 8 Findings.

## Kritische Ankerpunkte

- **STR-01 Tiefenstruktur-Meta** ist der Mega-Hotspot fuer Gueteregel-Kollisionen — alle 6 Kataloge werden angefasst. Erstelle dafuer eine dedizierte Auswirkungs-Analyse.
- **STR-24 E6-Checkliste** ist komplementaer zu den Katalogen, nicht Ersatz — pruefe diese Abgrenzung auf Klarheit.
- **STR-12 Trigger-System Sichtbarkeits-Constraint** — kollidiert das mit Transparenz-Prinzipien in bestehenden Dokumenten?
- **STR-14-NEU Fiktionalitaets-Kennzeichnung** — ist das Kriterium in M-Katalog bereits enthalten oder neu?
- **Obsolet-Kandidaten:** `docs/analyse/`-Dokumente, die auf alte Scope-Ausdehnungen verweisen (vor Evaluations-Runde).
- **Dokumentations-Drift:** Welche Dokumente referenzieren auf STR-07/10/16/18 (gestrichen)?
