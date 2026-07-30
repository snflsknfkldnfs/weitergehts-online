#!/usr/bin/env python3
"""screenshot.py — deterministische Voll-Seiten-Screenshots der Syrien-Seiten (E5-Abnahme).

Nutzung (aus dem Repo-Root):
  .venv/bin/python3 tools/smoke/screenshot.py shoot <label>       # -> tools/smoke/_out/shots-<label>/
  .venv/bin/python3 tools/smoke/screenshot.py diff <labelA> <labelB>

Gleiche Umgebung wie tools/smoke/smoke.py (.venv-Playwright, eigener http.server).
Seed-Varianten befuellen localStorage vor dem Laden (gelöste Aufgaben/abgeschlossene
Mappen), damit auch der solved-Look (Stempelfeld, Status-Stempel) verglichen wird.

Determinismus: Reihenfolge-Aufgaben werden per Fisher-Yates gemischt
(escape-engine.js, core.js) — ohne festen Seed flackern die Shots. RANDOM_STUB
ersetzt Math.random vor jedem Dokument-Script durch einen LCG mit fixem Startwert.
"""
import json
import pathlib
import subprocess
import sys
import time

from playwright.sync_api import sync_playwright

REPO = pathlib.Path(__file__).resolve().parents[2]
OUT = REPO / "tools" / "smoke" / "_out"
PORT = 8123
GAME = "unterricht/escape-games/syrische-revolution-2011"
STORAGE_KEY = "escape-syrische-revolution-2011"

# Deterministischer Ersatz fuer Math.random (sonst mischt der Shuffle je Lauf anders).
RANDOM_STUB = """(function () {
  var s = 42;
  Math.random = function () {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
})();"""

SEED = {
    "mappen": {
        "mappe-1": {
            "abgeschlossen": True,
            "aufgaben": {"auf-1-%d" % i: {"geloest": True} for i in range(1, 8)},
        },
        "mappe-2": {"aufgaben": {"auf-2-1": {"geloest": True}}},
    },
    "letzteAktivitaet": "2026-07-26T00:00:00.000Z",
}

PAGES = [  # (datei, seed?, shot-name)
    ("index.html", False, "uebersicht-clean"),
    ("index.html", True, "uebersicht-progress"),
    ("mappe-1.html", False, "mappe-1-clean"),
    ("mappe-1.html", True, "mappe-1-solved"),
    ("mappe-2.html", True, "mappe-2-teilsolved"),
    ("mappe-3.html", False, "mappe-3-clean"),
    ("mappe-4.html", False, "mappe-4-clean"),
]


def shoot(label):
    outdir = OUT / ("shots-" + label)
    outdir.mkdir(parents=True, exist_ok=True)
    server = subprocess.Popen(
        [sys.executable, "-m", "http.server", str(PORT), "--bind", "127.0.0.1"],
        cwd=REPO, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        time.sleep(1.0)
        with sync_playwright() as p:
            browser = p.chromium.launch()
            for page_file, seed, name in PAGES:
                ctx = browser.new_context(
                    viewport={"width": 1440, "height": 1000},
                    device_scale_factor=1, reduced_motion="reduce")
                ctx.add_init_script(RANDOM_STUB)
                if seed:
                    ctx.add_init_script(
                        "localStorage.setItem(%s, %s);"
                        % (json.dumps(STORAGE_KEY), json.dumps(json.dumps(SEED))))
                pg = ctx.new_page()
                pg.goto("http://127.0.0.1:%d/%s/%s" % (PORT, GAME, page_file),
                        wait_until="networkidle", timeout=45000)
                pg.wait_for_timeout(1200)
                # Die Engine stellt die letzte Scroll-Position wieder her. Sticky-/fixed-
                # Elemente (.rd-leitfrage-strip, .sticky-stundenfrage) frieren im full_page-
                # Shot an der Scroll-Position ein und ueberdecken sich dort. Zurueck auf 0:
                # der Leitfragen-Strip steht an seiner Fluss-Position und ist voll pruefbar.
                pg.evaluate("window.scrollTo(0, 0)")
                pg.wait_for_timeout(400)
                pg.screenshot(path=str(outdir / (name + ".png")),
                              full_page=True, animations="disabled")
                ctx.close()
            browser.close()
    finally:
        server.terminate()
    print("OK: %d Screenshots -> %s" % (len(PAGES), outdir))


def diff(a, b):
    from PIL import Image, ImageChops
    da, db = OUT / ("shots-" + a), OUT / ("shots-" + b)
    fail = 0
    for f in sorted(da.glob("*.png")):
        g = db / f.name
        if not g.exists():
            print("FEHLT in %s: %s" % (b, f.name)); fail += 1; continue
        ia, ib = Image.open(f).convert("RGB"), Image.open(g).convert("RGB")
        if ia.size != ib.size:
            print("DIFF  %s: Groesse %s vs %s" % (f.name, ia.size, ib.size)); fail += 1; continue
        d = ImageChops.difference(ia, ib)
        if d.getbbox() is None:
            print("OK    %s: 0 px" % f.name)
        else:
            npx = sum(1 for px in d.getdata() if px != (0, 0, 0))
            dp = OUT / ("diff-%s-vs-%s-%s" % (a, b, f.name))
            d.save(dp)
            print("DIFF  %s: %d px (bbox %s) -> %s" % (f.name, npx, d.getbbox(), dp)); fail += 1
    sys.exit(1 if fail else 0)


if __name__ == "__main__":
    if len(sys.argv) >= 3 and sys.argv[1] == "shoot":
        shoot(sys.argv[2])
    elif len(sys.argv) >= 4 and sys.argv[1] == "diff":
        diff(sys.argv[2], sys.argv[3])
    else:
        print(__doc__); sys.exit(2)
