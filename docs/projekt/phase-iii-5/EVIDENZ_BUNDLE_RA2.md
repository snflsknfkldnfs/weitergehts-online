# Evidenz-Bundle RA2 — STR-Abhaengigkeiten

**Zielgruppe:** RA2 Dependency-Pruefer (isoliert).

## Pflicht-Lektuere

1. `docs/projekt/phase-iii-5/CHARTA_RA2_DEPENDENCIES.md`
2. `docs/projekt/D15B_OPTIMIERUNGS_STRATEGIEN.md` — Fokus auf:
   - STR-Register-Tabelle (20 aktive + 4 gestrichen + 2 ersetzt)
   - Mermaid-DAG (neueste Version nach Evaluations-Runde)
   - Execution-Waves-Tabelle
   - Arbeitsprotokoll (Historie der Mutationen)
3. `docs/projekt/D15B_IMPLIKATIONS_MATRIX.md` — E0-E9-Cluster fuer ATOM-UNIT-Analyse.

## Kontextuelle Lektuere

- `docs/projekt/D15B_BEFUND_REGISTER.md` — Cluster K01-K36 mit Verdikten (fuer Dependency-Rekonstruktion bei unklaren Kanten).

## Verboten

- Keine Code-Dateien.
- Keine Vertraege.
- Keine anderen RA-Berichte.
- Keine STATUS.md, CHANGELOG.md.

## Erwartete Output-Datei

`docs/projekt/phase-iii-5/BERICHT_RA2_DEPENDENCIES.md` mit Pflicht-Mermaid-DAG-Anhang.

## Werkzeug-Hinweis

Nutze `mcp__48177e08-3adc-4088-9cc4-b22583106eab__validate_and_render_mermaid_diagram` zur Validierung deines rekonstruierten DAG. Wenn der Validator failed → DAG im Quelldokument ist kaputt, Finding mit CRITICAL Severitaet.

## Kritische Ankerpunkte

- STR-07/10/16/18 sind GESTRICHEN — jede Kante, die noch auf sie verweist, ist verwaist.
- STR-09 → STR-09-NEU ist strukturell ersetzt — Kanten muessen migriert sein.
- STR-14 → STR-14-NEU ebenfalls.
- STR-01 ist Meta-Wave-0-Fundament — alle STR, die Gueteregel-Kataloge beruehren, haengen hart von STR-01 ab.
- Wave 3 Engine-Session bundelt mehrere Frontend-STR — pruefe, ob die Bundling-Entscheidung DAG-konform ist.
- ATOM-UNITs (E1↔E3↔E5) sind explizit kodifiziert fuer STR-02/03/04/08/09/11 — gibt es weitere, die es sein muessten?
