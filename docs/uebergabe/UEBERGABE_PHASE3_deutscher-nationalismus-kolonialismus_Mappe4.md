# Uebergabe: Phase 3 — deutscher-nationalismus-kolonialismus Mappe 4

## Pre-Flight (OPT-4/OPT-7)
```bash
cd /Users/paulad/weitergehts-online
git status          # Working Tree sauber?
git pull origin main # Aktueller Stand?
ls docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-4/rahmen/      # === 5 Dateien (meta, einstieg, sicherung, hefteintrag, mappenabschluss_zone)
ls docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-4/materialien/ # === 5 Dateien (mat-4-1..mat-4-5)
ls docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-4/aufgaben/    # === 6 Dateien (aufgabe-4-1..aufgabe-4-6)
cat docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-4/ueberleitungen.json | python3 -c "import json,sys; d=json.load(sys.stdin); assert len(d['ueberleitungen'])==4" # Genau 4 Ueberleitungen (mat1→2, 2→3, 3→4, 4→5)
python3 -c "import json, glob; [json.load(open(f)) for f in glob.glob('docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-4/**/*.json', recursive=True)]"
# Bei Fehler: STOPP.
```

## Aufgabe

1. **Bild-Download** (Wikimedia Commons API):

   | artefakt_ref | Ziel-Pfad | Breite | Wikimedia-Kandidat | Status |
   |---|---|---|---|---|
   | pb-4-1 (mat-4-1) | assets/img/deutscher-nationalismus-kolonialismus/img-4-1.jpg | 800 | `Dropping_the_Pilot.jpg` (Punch, 29. Maerz 1890, John Tenniel) | **MV2-VERIFIZIEREN** |
   | pb-4-2 (mat-4-4) | assets/img/deutscher-nationalismus-kolonialismus/img-4-2.jpg | 800 | Bundesarchiv-Kandidat: `Bundesarchiv_Bild_146-2003-0005_Schutztruppe_in_Deutsch-Suedwestafrika.jpg` oder analoge Bundesarchiv-Signatur „Gefangene Herero 1904" | **MV2-VERIFIZIEREN** |

   **MV2-Hinweis (PFLICHT vor Download):** Dieses Game hat KEIN `ARTEFAKT_INVENTAR_deutscher-nationalismus-kolonialismus.md` (Pre-GERUEST-Pfad Z). Wikimedia-Dateinamen sind NICHT dual-kanal-verifiziert. Auto-Memory MV2 dokumentiert 33% Halluzinationsrate bei nicht-verifizierten Wikimedia-Dateinamen. **Vor jedem Download:**
   - Kandidaten-Dateinamen per `action=query&titles=File:{dateiname}` gegen Wikimedia-API pruefen.
   - Bei 404/pageid=-1: Wikimedia-Suche (`action=query&list=search&srsearch=...`) mit Stichworten („Dropping the Pilot Punch Tenniel 1890" / „Bundesarchiv Herero 1904 Kriegsgefangene") durchfuehren.
   - Bei mehreren Treffern: Lizenz-Feld pruefen (Public Domain fuer pb-4-1; CC-BY-SA 3.0 DE fuer Bundesarchiv pb-4-2) und korrekte Datei auswaehlen.
   - Gefundenen verifizierten Dateinamen in `docs/agents/artefakte/deutscher-nationalismus-kolonialismus/UPSTREAM_PATCH_LOG.md` unter „MV2-Verifikation Mappe 4" protokollieren.

   **API-Methode:**
   ```python
   api_url = f'https://commons.wikimedia.org/w/api.php?action=query&titles=File:{dateiname}&prop=imageinfo&iiprop=url&iiurlwidth={breite}&format=json'
   # Download von thumburl aus Response. User-Agent: WeitergehtsOnline/1.0
   ```

   **Keine Downloads noetig fuer:** mat-4-2 (darstellungstext), mat-4-3 (quellentext Trotha-Befehl), mat-4-5 (tagebuch Kavezeri — selbst erzaehlend, kein Bild).

2. **Ueberleitung-Patching:**
   `ueberleitungen.json` lesen → pro Material-Objekt in data.json das Feld `ueberleitung_von` mit dem zugehoerigen `text`-Wert aus ueberleitungen.json befuellen.
   - mat-4-1 (Position 1): `ueberleitung_von: null` (kein Vorgaenger)
   - mat-4-2: Ueberleitung von mat-4-1 → mat-4-2 (Text: „Du hast in der Karikatur gesehen: 1890 uebernahm Wilhelm II. das Steuer von Bismarck. Doch wohin steuerte er das Kaiserreich?")
   - mat-4-3: Ueberleitung von mat-4-2 → mat-4-3 (Text: „Du hast erfahren, wie der Wettlauf um Kolonien Deutschland und Frankreich in zwei Marokkokrisen fuehrte. Doch was bedeutete dieser Wettlauf fuer die Menschen, die in den Kolonien lebten?")
   - mat-4-4: Ueberleitung von mat-4-3 → mat-4-4 (Text: „Du hast Trothas Befehl gelesen. Seine Worte waren kein Bluff — ein Foto aus dieser Zeit zeigt, was die Niederschlagung konkret bedeutete.")
   - mat-4-5: Ueberleitung von mat-4-4 → mat-4-5 (Text: „Du hast auf dem Foto gesehen, was nach dem Aufstand aus den Herero wurde. Doch wie erlebten sie die Jahre davor — bevor sie keinen anderen Ausweg mehr sahen?")

3. **Assembly:** Produktionsverzeichnis → Mappe-Objekt → data.json `mappen[]` append als `mappen[3]` (Index 3, vierte und letzte Mappe).

4. **mappe-4.html erstellen:** Kopie von `mappe-template.html` mit Mappe-Nr 4.

5. **Mappenabschluss-Zone (Variante B — letzte Mappe):** `mappe-4/rahmen/mappenabschluss_zone.json` enthaelt `_variante: "B"` mit 2 Reflexionsfragen (Mappen-Fokus + Gesamt-Sequenz-Bogen). KEINE `ueberleitungssatz`-Uebernahme noetig (Variante B, letzte Mappe hat keinen Nachfolger). In data.json als letzte Position der Mappe-4-Sicherungs-Struktur einbetten per Mappe-Anhang-Prozedur §C5-Variante-B.

6. **Engine-Patches:** Keine bekannten Patches fuer Mappe 4 noetig. Alle verwendeten Aufgabentypen (lueckentext, multiple-choice, reihenfolge, quellenkritik, vergleich, freitext-code) sind in `assets/js/escape-engine.js` implementiert (belegt durch Mappen 1-3 bereits produktiv).

## Mappe-4-Spezifikation (Kurzreferenz)

| Feld | Wert |
|---|---|
| id | mappe-4 |
| titel | Wettlauf um die Welt |
| beschreibung | Weltpolitik, Marokkokrisen und koloniale Gewalt — wie der Wettlauf um Kolonien Afrika und Europa veraenderte. |
| freischalt_code | AFRIKA (6 Buchstaben = 6 Aufgabenpositionen) |
| materialien | 5 (mat-4-1 bildquelle, mat-4-2 darstellungstext, mat-4-3 quellentext, mat-4-4 bildquelle, mat-4-5 tagebuch) |
| aufgaben | 6 (lueckentext, multiple-choice, reihenfolge, quellenkritik, vergleich, freitext-code) |
| stundenfrage | Welche Folgen hatte der Wettlauf um Kolonien — fuer Afrika und fuer Europa? |
| TB-Knoten | 4 (k4-1 Weltpolitik, k4-2 Marokkokrisen, k4-3 Koloniale Gewalt, k4-4 Rivalitaet) |
| AFB-Progression | I → II → II → II-III → II-III → III |
| Bloom-Verteilung | L1-L2=17%, L3-L4=50%, L5-L6=33% (PROGRESSIONSPLAN-Zielverteilung exakt) |
| Q-Gates Phase 2 | 2.0 PASS, 2.1 PASS (5/5), 2.1b PASS, 2.1c PASS, 2.2a PASS, 2.2b PASS (6/6, 114/114 Checks), 2.2c PASS (13/13 Kriterien) |
| Letzte-Mappe-Marker | Ja (mappen_anzahl=4). Mappenabschluss-Zone Variante B aktiv. |

## Merge-Schutz
Bei Konflikten: NICHT automatisch aufloesen. Dateien auflisten, User-Entscheidung abwarten.

## Verifikation
- [ ] data.json ist valides JSON (UTF-8, kein BOM)
- [ ] Mappe 4 hat 5 Materialien + 6 Aufgaben
- [ ] Alle `ueberleitung_von`-Felder in data.json enthalten narrativen Text (NICHT Material-IDs wie „mat-4-2")
- [ ] mat-4-1 hat `ueberleitung_von: null` (kein Vorgaenger)
- [ ] Beide Bilder (img-4-1, img-4-2) heruntergeladen + >10 KB + Wikimedia-Dateiname im UPSTREAM_PATCH_LOG.md verifiziert
- [ ] mappe-4.html existiert + verlinkt data.json korrekt
- [ ] Bestehende Mappen (1+2+3) unveraendert (diff check gegen vorherigen main-Stand)
- [ ] `sicherung.hefteintrag` in data.json enthaelt `knoten[]` (4 Knoten), `scpl{}` (nicht null), `stundenfrage` (String-exakt identisch zu `einstieg.problemstellung`) — V13
- [ ] Mappenabschluss-Zone Variante B in data.json korrekt eingebettet (2 Reflexionsfragen, kein ueberleitungssatz-Feld)
- [ ] MV2-Medien-Verifikation fuer pb-4-1 + pb-4-2 in UPSTREAM_PATCH_LOG.md protokolliert (Wikimedia-Dateiname, Lizenz-Feld, Timestamp)
- [ ] Engine-Smoke-Test: Mappe 4 laed ohne Console-Error, alle 6 Aufgabentypen rendern, freischalt_code AFRIKA loest Fortschritt aus, Mappenabschluss-Zone Variante B rendert 2 Reflexionsfragen

## MUST_VERIFY Post-Assembly (v3.12, P0-A)

Nach Assembly **und vor Commit/Push** ist Post-Assembly-Verifikation in Claude Code Pflicht gemaess ORCHESTRATOR.md §Phase-3.0-Transitions:

1. `python3 scripts/validate_data_json.py` (Schema-Full-Validation, alle 4 Mappen)
2. `python3 scripts/verify_mappe_completeness.py --mappe 4` (Materialien/Aufgaben/Rahmen-Vollstaendigkeit)
3. Local-Server-Smoke: `python3 -m http.server 8000` → Browser-Tab „http://localhost:8000/spiele/deutscher-nationalismus-kolonialismus/" → alle 4 Mappen durchklicken, keine Console-Fehler, alle Bilder laden
4. Ergebnis in `docs/agents/artefakte/deutscher-nationalismus-kolonialismus/POST_ASSEMBLY_VERIFY_Mappe4.md` dokumentieren (Pass/Fail je Check + Timestamp + evtl. Findings)

**Bei FAIL:** Assembly-Schritt lokalisieren, Fix in Claude Code, Re-Verify. Kein Push, solange FAIL.

## Game-Abschluss-Hinweis (Mappe 4 = letzte Mappe)

Nach erfolgreicher Mappe-4-Assembly und POST_ASSEMBLY_VERIFY PASS ist das Game **deutscher-nationalismus-kolonialismus** vollstaendig produziert (4/4 Mappen). Pflicht-Folge-Aktionen:

1. `escape-game-generator/PROJECT_INSTRUCTIONS.md` Zustandsblock auf `STATUS: ABGESCHLOSSEN`, `LETZTE_PHASE: 3.0 Assembly Mappe 4 — COMPLETE`, `NAECHSTE_AKTION: Keine. Game vollstaendig produziert.`, `MAPPEN_ABGESCHLOSSEN: 4` setzen (PI §Abschlussblock).
2. `PROJECT_INSTRUCTIONS_SNAPSHOT.md` in Game-Artefakt-Ordner schreiben fuer spaetere Re-Aufnahme.
3. Game-Level-`Q-GATE-LOG.md` (in `docs/agents/artefakte/deutscher-nationalismus-kolonialismus/Q-GATE-LOG.md`) um Game-Abschluss-Block mit Gesamt-Metriken (16 Phase-2-Q-Gates kumuliert alle PASS, 4 Mappen, 21 Materialien gesamt, 25 Aufgaben gesamt etc.) ergaenzen.
4. Deploy-Gate nach `docs/architektur/UPGRADE_PLAN_v3-11_DEPLOY_STATE_MACHINE.md` starten.
