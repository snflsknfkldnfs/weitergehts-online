#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
smoke.py — Headless-Render-Smoke fuer alle deploybaren Seiten von weitergehts.online.

Laedt jede oeffentliche Seite in einem echten (headless) Chromium und faellt, wenn:
  - eine unbehandelte JS-Exception auftritt (pageerror),
  - console.error geloggt wird (ausser Allowlist),
  - eine Subressource mit HTTP >= 400 laedt (tote Assets / 404),
  - der erwartete Kern-DOM-Knoten fehlt.

Seitenliste ist SELBSTPFLEGEND: Home + jedes aus index.html verlinkte LIVE-Game
(dessen index.html, lehrkraft.html und alle mappe-*.html).

Voraussetzung lokal:  pip install playwright && python3 -m playwright install chromium
In CI:                 laeuft im Container mcr.microsoft.com/playwright/python (Browser vorinstalliert).

Aufruf:  python3 tools/smoke/smoke.py [BASE_URL]   (Default http://localhost:8080)
Exit:    0 = alle Seiten sauber, 1 = mindestens eine Seite mit Fehler.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_BASE = "http://localhost:8080"

# Bekannte, unkritische Meldungen/Requests (Substring-Match). Bewusst minimal halten;
# nur mit dokumentierter Begruendung erweitern.
#  - favicon.ico: Browser fragt sie automatisch an; die Site hat (noch) keine -> harmloser 404.
CONSOLE_ALLOWLIST: tuple[str, ...] = ("favicon.ico",)
RESPONSE_IGNORE: tuple[str, ...] = ("favicon.ico",)


def live_games() -> list[str]:
    idx = (REPO_ROOT / "index.html").read_text(encoding="utf-8")
    return sorted(set(re.findall(r"escape-games/([a-z0-9-]+)/", idx)))


def pages() -> list[str]:
    """Repo-relative URL-Pfade aller zu testenden Seiten."""
    urls = ["/index.html"]
    for g in live_games():
        gdir = REPO_ROOT / "escape-games" / g
        for name in ["index.html", "lehrkraft.html"]:
            if (gdir / name).exists():
                urls.append(f"/escape-games/{g}/{name}")
        for mappe in sorted(gdir.glob("mappe-*.html")):
            urls.append(f"/escape-games/{g}/{mappe.name}")
    return urls


def allowed(msg: str) -> bool:
    return any(sub in msg for sub in CONSOLE_ALLOWLIST)


def check_page(page, url: str) -> list[str]:
    problems: list[str] = []
    page.on("console", lambda m: (
        problems.append(f"console.{m.type}: {m.text}")
        if m.type == "error" and not allowed(m.text) else None))
    page.on("pageerror", lambda e: problems.append(f"pageerror: {e}"))

    def on_response(resp):
        if resp.status >= 400 and not any(sub in resp.url for sub in RESPONSE_IGNORE):
            problems.append(f"http {resp.status}: {resp.url}")
    page.on("response", on_response)

    resp = page.goto(url, wait_until="load", timeout=20000)
    if resp is not None and resp.status >= 400:
        problems.append(f"http {resp.status} (document): {url}")
    page.wait_for_timeout(600)  # kurzes Settle fuer late console/async render

    # Kern-DOM: jede Seite muss <main> ODER den Game-Container haben
    if page.locator("main, #game, .escape, body > *").count() == 0:
        problems.append("kein Kern-DOM-Knoten (main/#game/.escape) gefunden")
    return problems


def main() -> int:
    base = sys.argv[1].rstrip("/") if len(sys.argv) > 1 else DEFAULT_BASE
    urls = pages()
    print(f"smoke: {len(urls)} Seiten gegen {base}")
    fail = 0
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for path in urls:
            page = browser.new_page()
            problems = check_page(page, base + path)
            page.close()
            if problems:
                fail = 1
                print(f"  FAIL  {path}")
                for pr in problems:
                    print(f"          {pr}")
            else:
                print(f"  ok    {path}")
        browser.close()
    print("smoke:", "ROT" if fail else "GRUEN")
    return fail


if __name__ == "__main__":
    sys.exit(main())
