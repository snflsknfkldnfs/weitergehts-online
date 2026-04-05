# Evidenz-Bundle RA3 — Code-Kopplung

**Zielgruppe:** RA3 Code-Kopplungs-Pruefer (isoliert).

## Pflicht-Lektuere

1. `docs/projekt/phase-iii-5/CHARTA_RA3_CODE_KOPPLUNG.md`
2. `docs/projekt/D15B_OPTIMIERUNGS_STRATEGIEN.md` — nur die STR, die Code-Bezug haben (erkennbar an Begriffen: Engine, Template, JS, CSS, Rendering, Schema, data.json, HTML).
3. `assets/js/escape-engine.js` — Haupt-Engine. Primaeres Code-Analyse-Objekt.
4. `assets/js/core.js` — unterstuetzende Logik.
5. `escape-games/gpg-erster-weltkrieg-ursachen/data.json` — Schema-Baseline. Grosses File, lies strategisch (Schema-Struktur, nicht jeden Inhalt).

## Kontextuelle Lektuere

- `escape-games/gpg-erster-weltkrieg-ursachen/mappe-3.html` und `mappe-4.html` — HTML-Einbettung der Engine, Cache-Busting-Parameter (`?v=`).
- `escape-games/gpg-erster-weltkrieg-ursachen/index.html`, `lehrkraft.html` — weitere HTML-Referenzen.
- `escape-games/template/` — falls vorhanden, Template-Engine-Input.

## Verboten

- Keine Scope-Diskussion (→ RA1).
- Keine DAG-Analyse (→ RA2).
- Keine Vertrags-/Agent-Analyse (→ RA4).
- Keine anderen RA-Berichte.

## Erwartete Output-Datei

`docs/projekt/phase-iii-5/BERICHT_RA3_CODE_KOPPLUNG.md` mit STR-zu-Code-Matrix und mindestens 10 Findings.

## Kritische Ankerpunkte

- **Produktions-Stand:** Mappe 1-4 sind bereits produziert und live. Jede Schema-Aenderung riskiert Regression.
- **Cache-Busting-Pflicht:** Bei JS/CSS-Aenderungen MUESSEN `?v=` Parameter in allen HTML-Referenzen hochgezaehlt werden (Memory-Eintrag Cache-Busting).
- **Wave 3 bundelt Frontend-Patches:** Pruefe Atomisierbarkeit.
- **data.json-Schema:** antwortpool, _meta.teilfragen, _meta.erwartete_begriffe, loesung[], quellenangaben[] sind bekannte Erweiterungs-Punkte. Welche STR aendert welches Feld?
- **Engine-Funktionen:** _renderLueckentext, _aktiviereLoesungswort sind dokumentierte Hotspots.
- **Q-Gate-Integration:** Python-JSON-Validierung als Pflicht-Schritt (IL-1 Patch) — beruehren STR diese Validierungs-Schicht?
