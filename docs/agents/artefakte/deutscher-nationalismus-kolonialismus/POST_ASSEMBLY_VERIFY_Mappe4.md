# POST_ASSEMBLY_VERIFY — Mappe 4

**Timestamp:** 2026-04-19
**Game:** deutscher-nationalismus-kolonialismus
**Mappe:** 4 (letzte Mappe, mappen_anzahl=4)

## Checks

| # | Check | Status | Befund |
|---|---|---|---|
| 1 | data.json ist valides JSON (UTF-8, kein BOM) | PASS | `json.load` ohne Fehler; BOM-Prüfung `False` |
| 2 | data.json enthält 4 Mappen | PASS | `len(mappen)=4` |
| 3 | Mappe 4 hat 5 Materialien + 6 Aufgaben | PASS | Exakt 5 / 6 |
| 4 | Alle `ueberleitung_von` in Mappe 4 sind narrativer Text (keine IDs) | PASS | mat-4-2..mat-4-5 enthalten vollständige Sätze; mat-4-1 = `null` |
| 5 | mat-4-1 hat `ueberleitung_von: null` | PASS | confirmed |
| 6 | img-4-1.jpg heruntergeladen (>10 KB) | PASS | 293 585 Bytes (800×1253, JPEG baseline) |
| 7 | img-4-2.jpg heruntergeladen (>10 KB) | PASS | 125 607 Bytes (800×452, JPEG baseline) |
| 8 | MV2-Verifikation beider Bilder in UPSTREAM_PATCH_LOG.md protokolliert | PASS | Datei erstellt, Pageids 71046245 + 5419709 notiert |
| 9 | mappe-4.html existiert und verlinkt data.json korrekt | PASS | EscapeEngine.init('mappe-4'), Navigation-Label "Mappe 4 von 4" |
| 10 | Bestehende Mappen 1+2+3 unverändert (Diff gegen origin/main) | PASS | Alle drei Objekte byte-identisch |
| 11 | V13: sicherung.hefteintrag enthält knoten[] (4 Knoten) + scpl{} (non-null) + stundenfrage (identisch zu einstieg.problemstellung) | PASS | 4 Knoten (k4-1..k4-4), scpl mit 3 Complication-Schritten, stundenfrage-Match `True` |
| 12 | Mappenabschluss-Zone Variante B korrekt eingebettet (2 Reflexionsfragen, kein ueberleitungssatz) | PASS | `_variante: "B"`, `reflexion_fragen` len=2, kein `ueberleitungssatz`-Feld |
| 13 | Engine-Smoke (Local HTTP 8765): data.json, mappe-4.html, beide Bilder, index.html laden | PASS | Alle Endpunkte → 200 |

## Q-Gate-Summary (G2/G5/G6 Hefteintrag)

- G2: 3 C-Schritte (Limit 3), 3 Merksätze — PASS
- G5: Längster Merksatz 9W — PASS (Limit 15W)
- G6: ~118W — PASS (harte Grenze 120W)

## Eingeschränkt verifizierte Checks

- **`scripts/validate_data_json.py`** (v3.12 MUST_VERIFY Schritt 1): Skript existiert im Repo nicht → durch inline Python-Schema-Check substituiert (Check #1–#3 oben).
- **`scripts/verify_mappe_completeness.py`** (v3.12 MUST_VERIFY Schritt 2): Skript existiert nicht → durch inline Vollständigkeits-Check substituiert (Check #3, #4, #5, #11, #12).
- **Browser-Click-Through alle 4 Mappen**: Nur Server-Smoke (HTTP 200). Keine Console-Log-Auswertung oder DOM-Interaktion in dieser Phase. Visueller Smoke-Test im Browser empfohlen vor Deploy-Gate.

## Ergebnis

**ALL PASS** — Mappe 4 ist vollständig assembliert; bestehende Mappen bleiben unberührt; MV2-Verifikation protokolliert. Game-Level-Abschluss (PROJECT_INSTRUCTIONS-Zustandsblock, Q-GATE-LOG, Deploy-Gate) gemäß Uebergabe §Game-Abschluss-Hinweis folgt als separate Aktion.
