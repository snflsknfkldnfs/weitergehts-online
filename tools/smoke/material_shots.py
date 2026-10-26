#!/usr/bin/env python3
"""material_shots.py — Voll-Seiten-Screenshots aller Materialseiten (Quellen, Anordnen, Datenspuren).

Nutzung (aus dem Repo-Root):
  .venv/bin/python3 tools/smoke/material_shots.py shoot <label>   # -> tools/smoke/_out/material-<label>/
  .venv/bin/python3 tools/smoke/material_shots.py liste           # welche Seiten erfasst werden

Erfasst jede index.html unter unterricht/{quellen,ordnen,datenspuren}/ (ohne _-Ordner) in zwei Größen:
Tablet quer 1180 × 820 und Handy 390 × 844. Math.random ist fest gesetzt (Anordnen mischt die Karten),
damit Vorher und Nachher vergleichbar sind. Eigener http.server auf Port 8124.
Spec: docs/website/specs/2026-10-21-material-design-design.md
"""
import pathlib
import subprocess
import sys
import time

REPO = pathlib.Path(__file__).resolve().parents[2]
OUT = REPO / "tools" / "smoke" / "_out"
PORT = 8124
GROESSEN = {"tablet": (1180, 820), "handy": (390, 844)}
RANDOM_STUB = """(() => { let s = 42; Math.random = () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; }; })();"""


def seiten() -> list[str]:
    out = []
    for werkzeug in ("quellen", "ordnen", "datenspuren", "verteilen"):
        for f in sorted((REPO / "unterricht" / werkzeug).rglob("index.html")):
            rel = f.relative_to(REPO)
            if any(t.startswith("_") for t in rel.parts):
                continue
            out.append("/" + rel.parent.as_posix() + "/")
    return out


def shoot(label: str) -> int:
    from playwright.sync_api import sync_playwright
    ziel = OUT / f"material-{label}"
    ziel.mkdir(parents=True, exist_ok=True)
    server = subprocess.Popen([sys.executable, "-m", "http.server", str(PORT)], cwd=REPO,
                              stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        time.sleep(0.8)
        with sync_playwright() as p:
            b = p.chromium.launch()
            for url in seiten():
                for name, (w, h) in GROESSEN.items():
                    pg = b.new_page(viewport={"width": w, "height": h})
                    pg.add_init_script(RANDOM_STUB)
                    pg.goto(f"http://localhost:{PORT}{url}")
                    pg.wait_for_load_state("networkidle")
                    pg.wait_for_timeout(300)
                    datei = ziel / (url.strip("/").replace("unterricht/", "").replace("/", "_") + f"__{name}.png")
                    pg.screenshot(path=str(datei), full_page=True)
                    pg.close()
            b.close()
    finally:
        server.terminate()
    print(f"{len(seiten())} Seiten × {len(GROESSEN)} Größen -> {ziel.relative_to(REPO)}")
    return 0


if __name__ == "__main__":
    if len(sys.argv) >= 2 and sys.argv[1] == "liste":
        print("\n".join(seiten()))
        sys.exit(0)
    if len(sys.argv) == 3 and sys.argv[1] == "shoot":
        sys.exit(shoot(sys.argv[2]))
    print(__doc__)
    sys.exit(2)
