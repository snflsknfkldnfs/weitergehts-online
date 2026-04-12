# Uebergabe: Phase 3 — deutscher-nationalismus-kolonialismus Mappe 1

## Pre-Flight (OPT-4/OPT-7)
cd /Users/paulad/weitergehts-online
git status          # Working Tree sauber?
git pull origin main # Aktueller Stand?
ls docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-1/rahmen/      # === 4 Dateien?
ls docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-1/materialien/ # === 6 Dateien?
ls docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-1/aufgaben/    # === 7 Dateien?
cat docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-1/ueberleitungen.json | python3 -c "import json,sys; d=json.load(sys.stdin); assert len(d['ueberleitungen'])>0" # Ueberleitungen vorhanden?
python3 -c "import json, glob; [json.load(open(f)) for f in glob.glob('docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-1/**/*.json', recursive=True)]"
# Bei Fehler: STOPP.

## Aufgabe
1. Bild-Download: Fuer jede img-ID in materialien/*.json → ARTEFAKT_INVENTAR nachschlagen → API-Call ausfuehren → Download
2. Ueberleitung-Patching: `ueberleitungen.json` lesen → pro Material-Objekt in data.json das Feld `ueberleitung_von` mit dem zugehoerigen `text`-Wert aus ueberleitungen.json befuellen (statt Material-ID). mat-1-1 (Position 1): `ueberleitung_von` bleibt null.
3. Assembly: Produktionsverzeichnis → Mappe-Objekt → data.json append
4. mappe-1.html erstellen (Kopie von mappe-template.html mit Mappe-Nr)
5. Engine-Patches (falls in UEBERGABE dokumentiert)

## Bild-Download-Methode
Wikimedia Commons API — IMMER. Keine direkten URLs.
api_url = f'https://commons.wikimedia.org/w/api.php?action=query&titles=File:{dateiname}&prop=imageinfo&iiprop=url&iiurlwidth={breite}&format=json'
Download von thumburl aus Response. User-Agent: WeitergehtsOnline/1.0

## Merge-Schutz
Bei Konflikten: NICHT automatisch aufloesen. Dateien auflisten, User-Entscheidung abwarten.

## Verifikation
- [ ] data.json ist valides JSON
- [ ] Mappe 1 hat 6 Materialien + 7 Aufgaben
- [ ] Alle `ueberleitung_von`-Felder in data.json enthalten narrativen Text (NICHT Material-IDs wie "mat-1-2")
- [ ] mat-1-1 hat `ueberleitung_von: null` (kein Vorgaenger)
- [ ] Alle Bilder heruntergeladen + >10 KB
- [ ] mappe-1.html existiert + verlinkt data.json korrekt
- [ ] Bestehende Mappen unveraendert (diff check)

---

## Mappe-1-Zusammenfassung

| Parameter | Wert |
|---|---|
| Stundenfrage | Warum kaempften Menschen 1848 fuer ein geeintes Deutschland? |
| Materialien | 6 (1 tagebuch, 2 bildquelle, 1 quellentext, 1 darstellungstext, 1 quellentext) |
| Aufgaben | 7 (lueckentext, zuordnung, mc, reihenfolge, mc, quellenkritik, freitext-code) |
| TB-Knoten | 7 (k1-1 bis k1-7) |
| AFB-Progression | I → I → I-II → II → II → II-III → III |
| Bloom-Verteilung | L1: 1, L3: 4, L5: 2 |
| Freischalt-Code | EINHEIT |
| Q-GATE Phase 2.2c | PASS (2026-04-12) |

### Artefakt-Inventar (Bild-Downloads)

| Material | Artefakt-Ref | Beschreibung |
|---|---|---|
| mat-1-2 | pb-1-1, pb-1-4 | Hambacher Fest — Zug zum Schloss (Federlithographie) |
| mat-1-4 | pb-1-5 | Barrikadenkampf in Berlin — Maerz 1848 (Kreidelithographie) |

Quellentexte (mat-1-1, mat-1-3, mat-1-6) und Darstellungstext (mat-1-5) benoetigen keine Bild-Downloads.

### Didaktik-Findings (aus Phase 2.1b, in Aufgaben integriert)

| Finding | Beschreibung | Aufgaben-Integration |
|---|---|---|
| F1 | mat-1-1 Tagebuch-Fiktion nicht vor Quellenangabe erkennbar | Pos 1 (Lueckentext): Nicht thematisiert (AFB I). |
| F2 | mat-1-6 archaische Sprache R7-Grenzfall | Pos 6 (Quellenkritik): W-Frage "bedeutung" als Paraphrase integriert. |
