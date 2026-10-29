#!/usr/bin/env python3
"""check_material.py — jede Materialseite trägt die gemeinsame Gestaltung „Blatt" (BLOCKING in check.sh).

Prüft alle index.html unter unterricht/{quellen,ordnen,datenspuren,verteilen,abstimmen,begleiten}/ (ohne _-Ordner)
und die Vorlagen tools/datenspuren/seite_vorlage.html, tools/begleiten/seite_vorlage.html:
  1. material.css wird geladen, und zwar VOR dem Werkzeug-CSS (sonst fehlen die --m-*-Tokens);
  2. das Werkzeug-CSS (quellen.css, ordnen.css, datenspuren.css) enthält keine eigenen Farbwerte —
     Farben nur aus material.css, damit die drei Werkzeuge nicht wieder auseinanderlaufen.
Warum: Bauskripte der Kurs-Welten kopieren meist eine bestehende Hülle, einzelne schreiben sie selbst
(z. B. staat_bauen.py) — eine selbst geschriebene Hülle ohne material.css fiele sonst niemandem auf.
Spec: docs/website/specs/2026-10-21-material-design-design.md
"""
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
WERKZEUGE = ("quellen", "ordnen", "datenspuren", "verteilen", "abstimmen", "begleiten")


def huellen() -> list[Path]:
    out = []
    for w in WERKZEUGE:
        for f in sorted((REPO / "unterricht" / w).rglob("index.html")):
            if not any(t.startswith("_") for t in f.relative_to(REPO).parts):
                out.append(f)
    out.append(REPO / "tools" / "datenspuren" / "seite_vorlage.html")
    out.append(REPO / "tools" / "begleiten" / "seite_vorlage.html")
    return out


def main() -> int:
    fehler = []
    for f in huellen():
        s = f.read_text(encoding="utf-8")
        rel = f.relative_to(REPO).as_posix()
        m = s.find("material.css")
        w = re.search(r"(quellen|ordnen|datenspuren|verteilen|abstimmen|begleiten)\.css", s)
        if m < 0:
            fehler.append(f"{rel}: lädt material.css nicht (Hülle von einer bestehenden Seite kopieren)")
        elif w and w.start() < m:
            fehler.append(f"{rel}: material.css steht nach dem Werkzeug-CSS")
    for w in WERKZEUGE:
        css = REPO / "unterricht" / w / f"{w}.css"
        for nr, zeile in enumerate(css.read_text(encoding="utf-8").splitlines(), 1):
            if re.search(r"#[0-9a-fA-F]{3,8}\b|rgba?\(", zeile.split("/*")[0]):
                fehler.append(f"{css.relative_to(REPO).as_posix()}:{nr}: eigener Farbwert — nur --m-*-Tokens aus material.css")
    if fehler:
        print("Materialseiten-Gestaltung:\n" + "\n".join("  - " + x for x in fehler))
        return 1
    print(f"Materialseiten: {len(huellen())} Hüllen laden material.css, Werkzeug-CSS ohne eigene Farben")
    return 0


if __name__ == "__main__":
    sys.exit(main())
