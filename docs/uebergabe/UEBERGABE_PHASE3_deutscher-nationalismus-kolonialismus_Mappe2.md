# Uebergabe: Phase 3 — deutscher-nationalismus-kolonialismus Mappe 2

## Pre-Flight (OPT-4/OPT-7)

```bash
cd /Users/paulad/weitergehts-online
git status          # Working Tree sauber?
git pull origin main # Aktueller Stand?
ls docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-2/rahmen/      # === 5 Dateien?
ls docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-2/materialien/ # === 6 Dateien?
ls docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-2/aufgaben/    # === 5 Dateien?
cat docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-2/ueberleitungen.json | python3 -c "import json,sys; d=json.load(sys.stdin); assert len(d['ueberleitungen'])==5" # 5 Ueberleitungen?
python3 -c "import json, glob; [json.load(open(f)) for f in glob.glob('docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-2/**/*.json', recursive=True)]"
# Bei Fehler: STOPP.
```

## Aufgabe

1. **Bild-Download:** 2 Bildquellen (mat-2-4, mat-2-5) benoetigen je 1 Bild:
   - **mat-2-4** (pb-2-1): Anton von Werner, „Die Proklamierung des Deutschen Kaiserreiches" (3. Fassung, 1885). Wikimedia Commons. Lizenz: Public Domain.
     - Suchbegriff: `Proklamation Deutsches Kaiserreich Anton von Werner 1885`
     - Erwarteter Dateiname (ca.): `File:Wernerprokla.jpg` oder `File:Anton von Werner - Kaiserproklamation am 18. Januar 1871 (3. Fassung 1885).jpg`
   - **mat-2-5** (pb-2-2): Niederlaendische Karikatur zur Reichsgruendung (1871). Rijksmuseum Amsterdam, RP-P-1914-4565. Wikimedia Commons. Lizenz: CC0.
     - Suchbegriff: `RP-P-1914-4565 Rijksmuseum Karikatur Reichsgruendung`
     - Erwarteter Dateiname (ca.): `File:Spotprent op de Duitse eenwording, RP-P-1914-4565.jpg`
   - Download via Wikimedia Commons API (siehe Bild-Download-Methode unten)
   - Zielverzeichnis: `assets/images/deutscher-nationalismus-kolonialismus/`
   - Breite: 800px

2. **Ueberleitung-Patching:** `ueberleitungen.json` lesen → pro Material-Objekt in data.json das Feld `ueberleitung_von` mit dem zugehoerigen `text`-Wert aus ueberleitungen.json befuellen (statt Material-ID). mat-2-1 (Position 1): `ueberleitung_von` bleibt null.

3. **Assembly:** Produktionsverzeichnis → Mappe-2-Objekt → data.json append (Mappe 2 anfuegen an bestehendes Mappe-1-Objekt)

4. **mappe-2.html erstellen** (Kopie von mappe-template.html mit Mappe-Nr 2)

5. **Engine-Patches:** Keine bekannt fuer diese Mappe.

## Bild-Download-Methode

Wikimedia Commons API — IMMER. Keine direkten URLs.

```python
api_url = f'https://commons.wikimedia.org/w/api.php?action=query&titles=File:{dateiname}&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json'
# Download von thumburl aus Response. User-Agent: WeitergehtsOnline/1.0
```

## Merge-Schutz

Bei Konflikten: NICHT automatisch aufloesen. Dateien auflisten, User-Entscheidung abwarten.

## Artefakt-Inventar Mappe 2

| Verzeichnis | Dateien | Anzahl |
|---|---|---|
| rahmen/ | hefteintrag.json, einstieg.json, sicherung.json, mappenabschluss_zone.json, meta.json | 5 |
| materialien/ | mat-2-1.json bis mat-2-6.json | 6 |
| aufgaben/ | aufgabe-2-1.json bis aufgabe-2-5.json | 5 |
| ./ | ueberleitungen.json, PROGRESSIONSPLAN.md, Q-GATE-LOG.md | 3 |

**Aufgaben-Typen:** zuordnung, reihenfolge, multiple-choice, vergleich, freitext-code
**Freischalt-Code:** EISEN (5 Buchstaben, 5 Aufgaben)
**Punkte-Summe:** 50

## Verifikation

- [ ] data.json ist valides JSON
- [ ] Mappe 2 hat 6 Materialien + 5 Aufgaben
- [ ] Alle `ueberleitung_von`-Felder in data.json enthalten narrativen Text (NICHT Material-IDs wie "mat-2-1")
- [ ] mat-2-1 hat `ueberleitung_von: null` (kein Vorgaenger)
- [ ] Alle Bilder heruntergeladen + >10 KB (2 Bilder: Kaiserproklamation, Karikatur)
- [ ] mappe-2.html existiert + verlinkt data.json korrekt
- [ ] Bestehende Mappe 1 unveraendert (diff check)
- [ ] `sicherung.hefteintrag` in data.json enthaelt `knoten[]` (len == 6), `scpl{}` (nicht null), `stundenfrage` (nicht leer) — V13
