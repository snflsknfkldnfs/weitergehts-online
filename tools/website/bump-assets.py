#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
bump-assets.py — Cache-Bust-Automatik fuer weitergehts.online

Single source of truth fuer die ?v=-Cache-Bust-Tokens der geteilten Assets ist
`assets/versions.json`. Dieses Script ist die EINZIGE erlaubte Art, die Tokens
in den HTML-Dateien zu aendern — `?v=` niemals von Hand editieren.

Hintergrund: Es gibt jeweils nur EINE physische Asset-Datei (escape-engine.js,
core.js, base.css, theme-gpg.css). Das `?v=`-Token ist reiner Cache-Buster.
Driftende Tokens (eine Seite linkt v3.16, eine andere v3.19 auf dieselbe Datei)
fuehren dazu, dass wiederkehrende Browser veraltete Versionen aus dem Cache
servieren. Darum: EIN Token pro Asset, ueberall identisch.

WORKFLOW
--------
  # Engine geaendert -> Minor-Bump + alle HTML angleichen (Standard-Fall):
  python3 tools/website/bump-assets.py --bump escape-engine.js
  python3 tools/website/bump-assets.py --bump engine          # Alias

  # Mehrere Assets bumpen:
  python3 tools/website/bump-assets.py --bump engine theme

  # Alle vier bumpen:
  python3 tools/website/bump-assets.py --bump all

  # Explizite Version setzen (z.B. nicht-numerische Schemata):
  python3 tools/website/bump-assets.py --set base.css 5.0

  # Nur synchronisieren (HTML an versions.json angleichen, kein Bump) — repariert Drift:
  python3 tools/website/bump-assets.py --sync
  python3 tools/website/bump-assets.py            # ohne Args == --sync

  # Drift-Check (kein Schreiben; Exit 1 bei Abweichung) — von check.sh genutzt:
  python3 tools/website/bump-assets.py --check

Exit-Codes: 0 = OK / synchron, 1 = Drift (nur --check) bzw. Fehler.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
VERSIONS_FILE = REPO_ROOT / "assets" / "versions.json"

# Kurz-Aliase -> kanonischer Asset-Key (muss in versions.json["assets"] existieren)
ALIASES = {
    "engine": "escape-engine.js",
    "core": "core.js",
    "base": "base.css",
    "theme": "theme-gpg.css",
    "fonts": "fonts.css",
    "tokens": "tokens.css",
    "wg": "wg.css",
}


def load_versions() -> dict:
    with VERSIONS_FILE.open(encoding="utf-8") as fh:
        data = json.load(fh)
    if "assets" not in data or not isinstance(data["assets"], dict):
        sys.exit(f"FEHLER: {VERSIONS_FILE} hat kein 'assets'-Objekt.")
    return data


def save_versions(data: dict) -> None:
    VERSIONS_FILE.write_text(
        json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )


def html_files() -> list[Path]:
    """Alle deploybaren HTML-Dateien, die geteilte Assets referenzieren koennen.
    '_'-praefixierte Scratch/Archiv-Segmente (z.B. _archive/) werden ignoriert."""
    files = list(REPO_ROOT.glob("unterricht/**/*.html"))
    for extra in ["index.html", "404.html"]:
        p = REPO_ROOT / extra
        if p.exists():
            files.append(p)
    files += list(REPO_ROOT.glob("profil/**/*.html"))
    files += list(REPO_ROOT.glob("impressum/**/*.html"))
    files += list(REPO_ROOT.glob("datenschutz/**/*.html"))
    return [
        f for f in files
        if not any(part.startswith("_") for part in f.relative_to(REPO_ROOT).parts)
    ]


def resolve_asset(name: str, assets: dict) -> str:
    key = ALIASES.get(name, name)
    if key not in assets:
        sys.exit(
            f"FEHLER: Unbekanntes Asset '{name}'. "
            f"Erlaubt: {', '.join(sorted(assets))} (oder Aliase {', '.join(sorted(ALIASES))})."
        )
    return key


def minor_increment(version: str) -> str:
    """3.20 -> 3.21, 4.6 -> 4.7. Nicht-numerische Schemata erfordern --set."""
    m = re.fullmatch(r"(\d+)\.(\d+)", version.strip())
    if not m:
        sys.exit(
            f"FEHLER: Version '{version}' ist nicht im Schema MAJOR.MINOR — "
            f"bitte explizit via --set <asset> <version> setzen."
        )
    return f"{m.group(1)}.{int(m.group(2)) + 1}"


def scan(assets: dict):
    """Liefert (mismatches, total) ueber alle HTML-Dateien.
    mismatch = (datei, asset_key, gefundene_version, soll_version)."""
    mismatches = []
    total = 0
    for path in html_files():
        text = path.read_text(encoding="utf-8")
        for key, want in assets.items():
            for found in re.findall(re.escape(key) + r"\?v=([^\"'\s>]*)", text):
                total += 1
                if found != want:
                    rel = path.relative_to(REPO_ROOT)
                    mismatches.append((str(rel), key, found, want))
    return mismatches, total


def sync(assets: dict) -> int:
    """Schreibt alle ?v=-Tokens auf die Soll-Versionen. Idempotent. Gibt Anzahl geaenderter Dateien."""
    changed = 0
    for path in html_files():
        text = path.read_text(encoding="utf-8")
        new = text
        for key, want in assets.items():
            new = re.sub(
                re.escape(key) + r"\?v=[^\"'\s>]*",
                f"{key}?v={want}",
                new,
            )
        if new != text:
            path.write_text(new, encoding="utf-8")
            changed += 1
    return changed


def main() -> int:
    ap = argparse.ArgumentParser(description="Cache-Bust-Automatik (versions.json -> HTML).")
    g = ap.add_mutually_exclusive_group()
    g.add_argument("--check", action="store_true",
                   help="Nur pruefen: Exit 1 bei Drift (kein Schreiben).")
    g.add_argument("--sync", action="store_true",
                   help="HTML an versions.json angleichen (Default ohne Args).")
    g.add_argument("--bump", nargs="+", metavar="ASSET",
                   help="Minor-Bump der Assets (oder 'all') + sync.")
    g.add_argument("--set", nargs=2, metavar=("ASSET", "VERSION"),
                   help="Explizite Version setzen + sync.")
    args = ap.parse_args()

    data = load_versions()
    assets = data["assets"]

    if args.check:
        mism, total = scan(assets)
        if mism:
            print(f"CACHE-BUST-DRIFT: {len(mism)}/{total} ?v=-Token weichen von versions.json ab:")
            for rel, key, found, want in mism[:40]:
                print(f"  {rel}: {key}?v={found}  (soll {want})")
            if len(mism) > 40:
                print(f"  ... (+{len(mism) - 40} weitere)")
            print("Fix: python3 tools/website/bump-assets.py --sync")
            return 1
        print(f"OK: alle {total} ?v=-Token synchron mit versions.json.")
        return 0

    if args.bump:
        targets = list(assets) if args.bump == ["all"] else [resolve_asset(a, assets) for a in args.bump]
        for key in targets:
            old = assets[key]
            assets[key] = minor_increment(old)
            print(f"BUMP {key}: {old} -> {assets[key]}")
        save_versions(data)
    elif args.set:
        key = resolve_asset(args.set[0], assets)
        print(f"SET {key}: {assets[key]} -> {args.set[1]}")
        assets[key] = args.set[1]
        save_versions(data)

    changed = sync(assets)
    mism, total = scan(assets)
    print(f"SYNC: {changed} Datei(en) angeglichen, {total} ?v=-Token geprueft, {len(mism)} Drift verbleibend.")
    return 1 if mism else 0


if __name__ == "__main__":
    sys.exit(main())
