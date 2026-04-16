# Uebergabe: Phase 3 — deutscher-nationalismus-kolonialismus Mappe 3

## Pre-Flight (OPT-4/OPT-7)
```bash
cd /Users/paulad/weitergehts-online
git status          # Working Tree sauber?
git pull origin main # Aktueller Stand?
ls docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-3/rahmen/      # === 4 Dateien (meta, einstieg, sicherung, hefteintrag)
ls docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-3/materialien/ # === 6 Dateien (mat-3-1..mat-3-6)
ls docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-3/aufgaben/    # === 5 Dateien (aufgabe-3-1..aufgabe-3-5)
cat docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-3/ueberleitungen.json | python3 -c "import json,sys; d=json.load(sys.stdin); assert len(d['ueberleitungen'])>0" # Ueberleitungen vorhanden?
python3 -c "import json, glob; [json.load(open(f)) for f in glob.glob('docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-3/**/*.json', recursive=True)]"
# Bei Fehler: STOPP.
```

## Aufgabe

1. **Bild-Download** (Wikimedia Commons API):
   | artefakt_ref | Wikimedia-Dateiname | Ziel-Pfad | Breite |
   |---|---|---|---|
   | img-3-1 | Afrikakonferenz.jpg | assets/img/deutscher-nationalismus-kolonialismus/img-3-1.jpg | 800 |
   | img-3-2 | Berlin_Conference,_1884-85.jpg | assets/img/deutscher-nationalismus-kolonialismus/img-3-2.jpg | 800 |
   | img-3-4 | Colonial_Africa_1913_Germany_map.svg | assets/img/deutscher-nationalismus-kolonialismus/img-3-4.svg | 1200 |
   | img-3-5 | Colonial_Africa_1913_map.svg | assets/img/deutscher-nationalismus-kolonialismus/img-3-5.svg | 1200 |

   **API-Methode:**
   ```python
   api_url = f'https://commons.wikimedia.org/w/api.php?action=query&titles=File:{dateiname}&prop=imageinfo&iiprop=url&iiurlwidth={breite}&format=json'
   # Download von thumburl aus Response. User-Agent: WeitergehtsOnline/1.0
   ```

   **Hinweis:** img-3-3 (Deutsche_kolonien_1885_afrika_ausschnitt.jpg) wird in Mappe 3 NICHT referenziert — kein Download noetig. mat-3-1 (zit-3-1) und mat-3-6 (rolle-3-2) sind Texte, keine Bilder.

2. **Ueberleitung-Patching:**
   `ueberleitungen.json` lesen → pro Material-Objekt in data.json das Feld `ueberleitung_von` mit dem zugehoerigen `text`-Wert aus ueberleitungen.json befuellen.
   - mat-3-1 (Position 1): `ueberleitung_von: null` (kein Vorgaenger)
   - mat-3-2: ueberleitung von mat-3-1 → mat-3-2
   - mat-3-3: ueberleitung von mat-3-2 → mat-3-3
   - mat-3-4: ueberleitung von mat-3-3 → mat-3-4
   - mat-3-5: ueberleitung von mat-3-4 → mat-3-5
   - mat-3-6: ueberleitung von mat-3-5 → mat-3-6

3. **Assembly:** Produktionsverzeichnis → Mappe-Objekt → data.json `mappen[]` append als mappen[2] (Index 2, dritte Mappe)

4. **mappe-3.html erstellen:** Kopie von mappe-template.html mit Mappe-Nr 3

5. **Engine-Patches:** Keine bekannten Patches fuer Mappe 3 noetig. Alle Aufgabentypen (lueckentext, multiple-choice, vergleich, reihenfolge, freitext-code) sind in der Engine implementiert.

## Mappe-3-Spezifikation (Kurzreferenz)

| Feld | Wert |
|---|---|
| id | mappe-3 |
| titel | Deutschlands Griff nach der Welt |
| beschreibung | Vom "Platz an der Sonne" zur Berliner Konferenz — Imperialismus und Kolonialisierung Afrikas |
| freischalt_code | SONNE |
| materialien | 6 (mat-3-1..mat-3-6) |
| aufgaben | 5 (aufgabe-3-1..aufgabe-3-5) |
| stundenfrage | Warum teilten europaeische Maechte Afrika unter sich auf — ohne die Afrikaner zu fragen? |

## Merge-Schutz
Bei Konflikten: NICHT automatisch aufloesen. Dateien auflisten, User-Entscheidung abwarten.

## Verifikation
- [ ] data.json ist valides JSON
- [ ] Mappe 3 hat 6 Materialien + 5 Aufgaben
- [ ] Alle `ueberleitung_von`-Felder in data.json enthalten narrativen Text (NICHT Material-IDs wie "mat-3-2")
- [ ] mat-3-1 hat `ueberleitung_von: null` (kein Vorgaenger)
- [ ] Alle 4 Bilder heruntergeladen + >10 KB
- [ ] mappe-3.html existiert + verlinkt data.json korrekt
- [ ] Bestehende Mappen (1+2) unveraendert (diff check)
- [ ] `sicherung.hefteintrag` in data.json enthaelt `knoten[]` (len > 0), `scpl{}` (nicht null), `stundenfrage` (nicht leer) — V13
