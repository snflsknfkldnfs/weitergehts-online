#!/usr/bin/env python3
"""einkleber_fuellen.py — baut einen Einkleber (Bauweg einkleber_bauen.py + einkleber_docx.js der Stunde) ausgefüllt mit der Lösung.

  python3 einkleber_fuellen.py <_render-Ordner der Stunde> <LOESUNG_Einkleber_*.md> <Ziel.pdf>

Für Einkleber, deren Lösung es nur als Tabelle „Seite · Zeile | Lösung“ gibt (GPG9a 09.10.). Der Satz kommt aus dem
Werkzeug der Stunde, damit der Einkleber im Klassenbereich genau so aussieht wie der eingeklebte; geschrieben wird nur
das Ziel (außerhalb der Welt), nie in den Stundenordner.
"""
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

render, loesung, ziel = Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3])
sys.path.insert(0, str(render))
import einkleber_bauen as E  # noqa: E402

werte = {}
for z in loesung.read_text(encoding="utf-8").splitlines():
    c = [x.strip() for x in z.strip().strip("|").split("|")]
    if len(c) == 2 and " · " in c[0]:
        seite, zeile = (x.strip() for x in c[0].split(" · ", 1))
        werte[(seite.lower(), re.split(r"\s{2,}", zeile)[0])] = c[1]

neu = []
for zeile, west, ost in E.TABELLE:
    felder = []
    for seite, inhalt in (("west", west), ("ost", ost)):
        w = werte.get((seite, zeile)) or next((v for (s_, z_), v in werte.items()   # „Wer bestimmt?“ → „Wer bestimmt in der Wirtschaft?“
                                               if s_ == seite and zeile.startswith(z_.rstrip("?"))), None)
        if inhalt is None:
            inhalt = w if w else None
        elif inhalt.startswith(E.BEGRIFF) and w:
            inhalt = f"{w[0].upper() + w[1:]}: {inhalt[len(E.BEGRIFF):]}"
        felder.append(inhalt)
    neu.append((zeile, *felder))
E.TABELLE = neu

with tempfile.TemporaryDirectory() as tmp:
    tmp = Path(tmp)
    docx = tmp / "einkleber.docx"
    E.bauen(docx)
    r = subprocess.run(["/Applications/LibreOffice.app/Contents/MacOS/soffice", "--headless", "--convert-to", "pdf",
                        "--outdir", str(tmp), str(docx)], capture_output=True, text=True)
    pdf = tmp / "einkleber.pdf"
    if r.returncode != 0 or not pdf.exists():
        sys.exit(f"PDF-Umwandlung gescheitert: {r.stderr}")
    ziel.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy(pdf, ziel)
print(ziel)
