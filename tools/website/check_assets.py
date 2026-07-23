#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
check_assets.py — Technische-Integritaets-Checks fuer die ausgelieferte Website.

Deckt ab, was die didaktischen Generator-Validatoren NICHT pruefen:
  (1) JSON-Validitaet aller deploybaren Daten (escape-games/*/data.json,
      assets/data/*.json, assets/versions.json).
  (2) Asset-Link-Existenz: jede relative src=/href=-Referenz in den HTML-Seiten
      muss auf eine real existierende Datei zeigen (faengt Tippfehler, geloeschte
      Assets, falsche Pfade ab, bevor sie live 404en).

Scope = alles, was GitHub Pages ausliefert: escape-games/**, index.html, sections/**.
Externe (http/https/mailto/data/#) und reine Anchor-Links werden ignoriert.

Exit 0 = alle OK, Exit 1 = mindestens ein Defekt.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]

# (src|href)="..."  — wir interessieren uns nur fuer relative lokale Pfade
ATTR_RE = re.compile(r'(?:src|href)\s*=\s*"([^"]+)"')
SKIP_PREFIXES = ("http://", "https://", "mailto:", "tel:", "data:", "javascript:", "#", "//")


def _is_scratch(path: Path) -> bool:
    """Pfade mit einem '_'-praefixierten Segment (z.B. _archive/, _smoketest_out/)
    sind nicht-deploybarer Scratch/Archiv und werden ignoriert."""
    return any(part.startswith("_") for part in path.relative_to(REPO_ROOT).parts)


def deployed_html() -> list[Path]:
    # Scope = die komplexen Deploy-Artefakte (Escape-Games + WiB-Tools): ihre
    # relativen Asset-/Medien-Links (../../../assets/…) und ab E3 die site-absoluten
    # Footer-Links (/impressum/ …) muessen aufloesbar sein — genau das faengt
    # Umzugs-/Tippfehler ab, bevor sie live 404en.
    # Die einfachen, sich WECHSELSEITIG verlinkenden Site-Seiten (Root-Verteiler,
    # /unterricht/-Hub, /profil/, /impressum/, /datenschutz/, 404) werden per
    # Render-Smoke (tools/smoke/) validiert. Sie hier zu scannen wuerde waehrend des
    # inkrementellen IA-Aufbaus an Vorwaerts-Referenzen (Seite A linkt auf noch
    # nicht gebaute Seite B) scheitern — ein Artefakt der Baureihenfolge, kein Defekt.
    files = sorted(REPO_ROOT.glob("unterricht/escape-games/**/*.html"))
    files += sorted(REPO_ROOT.glob("unterricht/wib/**/*.html"))
    return [f for f in files if not _is_scratch(f)]


def deployed_json() -> list[Path]:
    files = sorted(REPO_ROOT.glob("unterricht/escape-games/*/data.json"))
    files += sorted(REPO_ROOT.glob("assets/data/*.json"))
    vj = REPO_ROOT / "assets" / "versions.json"
    if vj.exists():
        files.append(vj)
    return [f for f in files if not _is_scratch(f)]


def check_json() -> list[str]:
    errors = []
    for p in deployed_json():
        try:
            with p.open(encoding="utf-8") as fh:
                json.load(fh)
        except (json.JSONDecodeError, OSError) as exc:
            errors.append(f"INVALID JSON  {p.relative_to(REPO_ROOT)}: {exc}")
    return errors


def check_links() -> list[str]:
    errors = []
    for html in deployed_html():
        text = html.read_text(encoding="utf-8")
        for raw in ATTR_RE.findall(text):
            ref = raw.strip()
            if not ref or ref.lower().startswith(SKIP_PREFIXES):
                continue
            # ?v=... und #anchor abschneiden
            local = ref.split("?", 1)[0].split("#", 1)[0]
            if not local:
                continue
            # Site-absolute Links (/…) loesen ab dem Deploy-Root auf — GitHub Pages
            # liefert die Site unter der Custom-Domain ab / aus, nicht relativ zur Datei.
            if local.startswith("/"):
                target = (REPO_ROOT / local.lstrip("/")).resolve()
            else:
                target = (html.parent / local).resolve()
            # Pfad muss innerhalb des Repos bleiben und existieren
            try:
                target.relative_to(REPO_ROOT)
            except ValueError:
                errors.append(f"ESCAPES REPO  {html.relative_to(REPO_ROOT)} -> {ref}")
                continue
            if not target.exists():
                errors.append(f"DEAD LINK     {html.relative_to(REPO_ROOT)} -> {ref}")
    return errors


def main() -> int:
    errors = check_json() + check_links()
    if errors:
        print(f"check_assets: {len(errors)} Defekt(e):")
        for e in errors:
            print(f"  {e}")
        return 1
    n_json = len(deployed_json())
    n_html = len(deployed_html())
    print(f"check_assets: OK ({n_json} JSON valide, Asset-Links in {n_html} HTML aufloesbar).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
