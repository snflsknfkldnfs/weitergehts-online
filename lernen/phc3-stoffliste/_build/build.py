#!/usr/bin/env python3
"""Baut den Datenblock von lernen/phc3-stoffliste/abfrage/index.html (Lernmodus) aus karten.json + ordnung.tsv.

Aufruf (aus dem Repo-Root oder von hier):  python3 lernen/phc3-stoffliste/_build/build.py

karten.json  : 210 Karten (n, cat, ind, fg, het, note, svg) — SVGs aus RDKit, Stand 2026-10-09
ordnung.tsv  : Gerüst-Familien, INN-Stamm, Prioritätsstufe (A–D), Altklausur-Häufigkeit
               (Quelle: Bahar/Zulassungsklausur/02_Stoffliste/stoffliste_geordnet.tsv)

Ergebnis: der Inhalt von <script type="application/json" id="data"> in abfrage/index.html wird ersetzt.
Die erste Seite lernen/phc3-stoffliste/index.html (einfache Karten, Stand 2026-10-09) wird NICHT berührt.
Die UI (HTML/CSS/JS) bleibt unangetastet — index.html ist für sie die Quelle, nicht dieses Skript.
"""
import csv, json, re, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
PAGE = HERE.parent / 'abfrage' / 'index.html'   # die alte Seite (../index.html) bleibt unangetastet

cards = json.loads((HERE / 'karten.json').read_text(encoding='utf-8'))
rows = list(csv.DictReader((HERE / 'ordnung.tsv').open(encoding='utf-8'), delimiter='\t'))

order = {}
fams = []          # Reihenfolge der Familien wie in der Tabelle
leit = {}          # Familie -> Leitstruktur
for i, r in enumerate(rows):
    order[r['name']] = (i, r)
    if r['familie'] not in leit:
        fams.append(r['familie'])
        leit[r['familie']] = r['geruest_familie']

missing = [c['n'] for c in cards if c['n'] not in order]
extra = [n for n in order if n not in {c['n'] for c in cards}]
if missing or extra:
    sys.exit(f'Namens-Mismatch: ohne Ordnung={missing} ohne Karte={extra}')

out = []
for c in sorted(cards, key=lambda c: order[c['n']][0]):
    r = order[c['n']][1]
    out.append({
        'n': c['n'], 'cat': c['cat'], 'ind': c['ind'], 'fg': c['fg'], 'het': c['het'], 'note': c['note'],
        'fam': fams.index(r['familie']), 'stufe': r['stufe'], 'stem': r['inn_stamm'], 'ak': int(r['altklausur_aufg1']),
        'svg': c['svg'],
    })
payload = {'fams': [{'name': f, 'leit': leit[f]} for f in fams], 'cards': out}
blob = json.dumps(payload, ensure_ascii=False, separators=(',', ':'))
if '</script' in blob:
    sys.exit('Datenblock enthält "</script" — abgebrochen')

html = PAGE.read_text(encoding='utf-8')
new, n = re.subn(r'(<script type="application/json" id="data">).*?(</script>)',
                 lambda m: m.group(1) + blob + m.group(2), html, count=1, flags=re.S)
if n != 1:
    sys.exit('Datenblock in index.html nicht gefunden')
PAGE.write_text(new, encoding='utf-8')
from collections import Counter
print(f'index.html: {len(out)} Karten, {len(fams)} Familien, Stufen {dict(Counter(c["stufe"] for c in out))}, {len(blob)//1024} KB Daten')
