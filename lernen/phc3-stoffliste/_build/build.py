#!/usr/bin/env python3
"""Baut den Datenblock von lernen/phc3-stoffliste/abfrage/index.html (Lernmodus).

Aufruf (aus dem Repo-Root oder von hier):  python3 lernen/phc3-stoffliste/_build/build.py

Quellen in diesem Ordner:
  karten.json               210 Karten (n, cat, ind, fg, het, note, svg) — SVGs aus RDKit, Stand 2026-10-09
  ordnung.tsv               30 Gerüst-Familien mit Leitstruktur, INN-Stamm, Altklausur-Häufigkeit (Aufgabe 1)
                            (Quelle: Bahar/Zulassungsklausur/02_Stoffliste/stoffliste_geordnet.tsv)
  chat_zeichnen_124.tsv     Prio A/B (zeichnen) + Altklausur-Semester + Gerüst-Hinweis, aus der Claude-Chat-Version
                            vom 2026-10-14 (Familien-Trefferquote über 5 Altklausuren)
  chat_indikationen_185.tsv Gebiet, Kurzantwort, Merkhilfe je Arzneistoff; zeichnen=True/False (False = nur erkennen)
  chat_gebiete_stems.json   12 Gebiete + 32 Wortstämme (Endung, Klasse, Indikation, Beispiele)

Abgeleitet je Karte:
  tier  A/B = zeichnen (Chat-Prio) · C = nur erkennen (Arzneistoff, zeichnen=False) · D = weglassen (Neurotransmitter, Aminosäuren)

Ergebnis: der Inhalt von <script type="application/json" id="data"> in abfrage/index.html wird ersetzt.
Die erste Seite lernen/phc3-stoffliste/index.html (einfache Karten, Stand 2026-10-09) wird NICHT berührt.
Die UI (HTML/CSS/JS) bleibt unangetastet — abfrage/index.html ist für sie die Quelle, nicht dieses Skript.
"""
import csv, json, re, sys
from collections import Counter
from pathlib import Path

HERE = Path(__file__).resolve().parent
PAGE = HERE.parent / 'abfrage' / 'index.html'   # die alte Seite (../index.html) bleibt unangetastet

def tsv(name):
    return list(csv.DictReader((HERE / name).open(encoding='utf-8'), delimiter='\t'))

cards = json.loads((HERE / 'karten.json').read_text(encoding='utf-8'))
rows = tsv('ordnung.tsv')
zeich = {r['name']: r for r in tsv('chat_zeichnen_124.tsv')}
indik = {r['name']: r for r in tsv('chat_indikationen_185.tsv')}
gs = json.loads((HERE / 'chat_gebiete_stems.json').read_text(encoding='utf-8'))

order, fams, leit = {}, [], {}
for i, r in enumerate(rows):
    order[r['name']] = (i, r)
    if r['familie'] not in leit:
        fams.append(r['familie']); leit[r['familie']] = r['geruest_familie']

names = {c['n'] for c in cards}
problems = []
problems += [f'ohne Ordnung: {n}' for n in names - set(order)]
problems += [f'Ordnung ohne Karte: {n}' for n in set(order) - names]
problems += [f'zeichnen_124 ohne Karte: {n}' for n in set(zeich) - names]
problems += [f'indikationen_185 ohne Karte: {n}' for n in set(indik) - names]
problems += [f'Arzneistoff ohne Indikations-Eintrag: {c["n"]}' for c in cards if c['cat'] == 'Arzneistoff' and c['n'] not in indik]
if problems:
    sys.exit('Daten-Mismatch:\n  ' + '\n  '.join(problems))

def tier(c):
    if c['cat'] != 'Arzneistoff':
        return 'D'
    if c['n'] in zeich:
        return zeich[c['n']]['tier']
    if indik[c['n']]['zeichnen'] == 'False':
        return 'C'
    sys.exit(f'{c["n"]}: Arzneistoff weder in zeichnen_124 noch als zeichnen=False markiert')

out = []
for c in sorted(cards, key=lambda c: order[c['n']][0]):
    r = order[c['n']][1]; z = zeich.get(c['n'], {}); k = indik.get(c['n'], {})
    out.append({
        'n': c['n'], 'cat': c['cat'], 'ind': c['ind'], 'fg': c['fg'], 'het': c['het'], 'note': c['note'],
        'fam': fams.index(r['familie']), 'stem': r['inn_stamm'], 'ak': int(r['altklausur_aufg1']),
        'tier': tier(c), 'aks': z.get('ak', ''), 'fh': z.get('fh', ''),
        'g': k.get('gebiet', ''), 'k': k.get('kurz', ''), 'h': k.get('merkhilfe', ''),
        'svg': c['svg'],
    })
payload = {'fams': [{'name': f, 'leit': leit[f]} for f in fams], 'geb': gs['gebiete'], 'stems': gs['stems'], 'cards': out}
blob = json.dumps(payload, ensure_ascii=False, separators=(',', ':'))
if '</script' in blob.lower():
    sys.exit('Datenblock enthält "</script" — abgebrochen')

html = PAGE.read_text(encoding='utf-8')
new, n = re.subn(r'(<script type="application/json" id="data">).*?(</script>)',
                 lambda m: m.group(1) + blob + m.group(2), html, count=1, flags=re.S)
if n != 1:
    sys.exit('Datenblock in abfrage/index.html nicht gefunden')
PAGE.write_text(new, encoding='utf-8')
print(f'abfrage/index.html: {len(out)} Karten, {len(fams)} Familien, Tier {dict(sorted(Counter(c["tier"] for c in out).items()))}, '
      f'{sum(1 for c in out if c["g"])} mit Indikationsdaten, {len(gs["stems"])} Wortstämme, {len(blob)//1024} KB Daten')
