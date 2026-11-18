#!/usr/bin/env python3
"""markierung_pruefen.py — zeichnet jede Fundstelle des Quiz als Rahmen auf ihren Einkleber, zum Ansehen vor dem Deploy.

  python3 tools/kurse/klassenbereich/markierung_pruefen.py <kurs> <sequenz>/<probe> <zielordner>
  z. B.  python3 tools/kurse/klassenbereich/markierung_pruefen.py gpg9a s01/ue12-13 /tmp/markierung

Liest die gebaute, verschlüsselte Probenseite mit dem Schlüssel des Kurses (lokal), schreibt je Fundstelle ein JPG
„<Frage>_<n>.jpg“ und eine Übersicht „uebersicht_<k>.png“ (12 je Bild). Gefunden heißt nicht richtig markiert: ansehen.
"""
import base64, importlib.util, io, json, re, sys
from pathlib import Path
from PIL import Image, ImageDraw

REPO = Path(__file__).resolve().parents[3]
spec = importlib.util.spec_from_file_location("kb", REPO / "tools/kurse/klassenbereich.py")
kb = importlib.util.module_from_spec(spec); spec.loader.exec_module(kb)
kurs, seite, aus = sys.argv[1], sys.argv[2], Path(sys.argv[3])
aus.mkdir(parents=True, exist_ok=True)
g = kb.geheim(kurs, neu=False); t = kb.Tresor(g["passwort"], g["salz"])
def auf(b): return t.aes.decrypt(b[:12], b[12:], None)
html = (REPO / f"unterricht/k/{kurs}/{seite}/index.html").read_text()
k = auf(base64.b64decode(re.search(r'id="kb-inhalt">([^<]+)<', html).group(1))).decode()
d = json.loads(re.search(r'id="kb-quiz">(.*?)</script>', k, re.S).group(1).replace("<\\/", "</"))
vorlagen = dict(re.findall(r'<template data-heft="([^"]+)">(.*?)</template>', k, re.S))
bilder = {sid: re.findall(r'data-kb-src="\.\./\.\./dateien/([^"]+)"', h) for sid, h in vorlagen.items()}
namen = []
for f in d["fragen"]:
    for n, s in enumerate(f["stellen"]):
        if s.get("art") != "bild":
            print(f"{f['nr']}: {s.get('art') or 'Text'} {s.get('reihe') or s.get('text', '')}")
            continue
        im = Image.open(io.BytesIO(auf((REPO / f"unterricht/k/{kurs}/dateien/" / bilder[s["stunde"]][s["bild"]]).read_bytes()))).convert("RGB")
        W, H = im.size; x0, y0, x1, y1 = s["box"]
        ImageDraw.Draw(im).rectangle([x0 * W, y0 * H, x1 * W, y1 * H], outline=(255, 0, 180), width=8)
        im.thumbnail((700, 700)); name = f"{f['nr']}_{n}.jpg"; im.save(aus / name); namen.append(name)
for i in range(0, len(namen), 12):
    blatt = Image.new("RGB", (1400, 780), "white"); dr = ImageDraw.Draw(blatt)
    for j, name in enumerate(namen[i:i + 12]):
        im = Image.open(aus / name); im.thumbnail((340, 240))
        blatt.paste(im, ((j % 4) * 350, (j // 4) * 260 + 18)); dr.text(((j % 4) * 350 + 4, (j // 4) * 260 + 2), name, fill="black")
    blatt.save(aus / f"uebersicht_{i // 12}.png")
print(f"{len(namen)} Markierungen in {aus}")
