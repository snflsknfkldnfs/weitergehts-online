#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
validate_bloom_distribution.py  -  Phase IV Wave 1 AU-1 (STR-02 Bloom-Tiefe)

Prueft Bloom-Pflichtfelder und Verteilungs-Policy pro Mappe.

Policy (A19, VERTRAG_PHASE_2-2b_AUFGABE.md):
    - max 40 %  L1-L2  (Erinnern/Verstehen)
    - min 30 %  L3-L4  (Anwenden/Analysieren)
    - min 20 %  L5-L6  (Bewerten/Erschaffen)

Pflichtfelder pro Aufgabe:
    _meta.bloom_level        Integer 1..6
    _meta.bloom_begruendung  String, nicht leer

Aufruf-Modi:
    # (A) Mappen-Ordner (mit progressionsplan.json + aufgaben/*.json)
    python3 tools/validate_bloom_distribution.py escape-games/pulverfass-europa/mappe-4

    # (B) Monolithische data.json mit "mappen": [{aufgaben: [...]}] (Gameplay-Repo)
    python3 tools/validate_bloom_distribution.py escape-games/gpg-erster-weltkrieg-ursachen/data.json
    python3 tools/validate_bloom_distribution.py escape-games/gpg-erster-weltkrieg-ursachen/data.json --mappe mappe-4

Exit-Code: 0 = PASS fuer alle geprueften Mappen, 1 = mindestens ein FAIL.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from typing import List, Tuple


def _load_json(path: str):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def _collect_from_mappen_dir(pfad: str) -> List[Tuple[str, List[dict]]]:
    """Modus A: progressionsplan.json + aufgaben/aufgabe-*.json."""
    aufgaben = []
    aufgaben_dir = os.path.join(pfad, "aufgaben")
    if os.path.isdir(aufgaben_dir):
        for name in sorted(os.listdir(aufgaben_dir)):
            if name.startswith("aufgabe-") and name.endswith(".json"):
                aufgaben.append(_load_json(os.path.join(aufgaben_dir, name)))
    mappe_id = os.path.basename(os.path.normpath(pfad)) or pfad
    return [(mappe_id, aufgaben)]


def _collect_from_data_json(pfad: str, mappe_filter: str | None) -> List[Tuple[str, List[dict]]]:
    """Modus B: monolithische data.json."""
    data = _load_json(pfad)
    mappen = data.get("mappen", [])
    result = []
    for m in mappen:
        mid = m.get("id", "<unbenannt>")
        if mappe_filter and mid != mappe_filter:
            continue
        result.append((mid, m.get("aufgaben", []) or []))
    return result


def _pct(n: int, total: int) -> float:
    return (n / total * 100.0) if total else 0.0


def validate_mappe(mappe_id: str, aufgaben: List[dict]) -> Tuple[bool, List[str], dict]:
    errors: List[str] = []
    stats = {"L1": 0, "L2": 0, "L3": 0, "L4": 0, "L5": 0, "L6": 0}

    if not aufgaben:
        errors.append(f"[{mappe_id}] Keine Aufgaben gefunden.")
        return False, errors, stats

    for idx, auf in enumerate(aufgaben):
        aid = auf.get("id", f"#{idx}")
        meta = auf.get("_meta") or {}
        lvl = meta.get("bloom_level")
        begr = meta.get("bloom_begruendung")

        if not isinstance(lvl, int) or lvl < 1 or lvl > 6:
            errors.append(
                f"[{mappe_id}/{aid}] _meta.bloom_level fehlt oder ungueltig "
                f"(erwartet Integer 1..6, gefunden: {lvl!r})."
            )
            continue

        if not isinstance(begr, str) or not begr.strip():
            errors.append(
                f"[{mappe_id}/{aid}] _meta.bloom_begruendung fehlt oder leer."
            )
            # Stats trotzdem zaehlen, um Policy-Check auszufuehren

        stats[f"L{lvl}"] += 1

    total = sum(stats.values())
    if total == 0:
        errors.append(f"[{mappe_id}] Keine klassifizierten Aufgaben fuer Policy-Check.")
        return False, errors, stats

    l12 = stats["L1"] + stats["L2"]
    l34 = stats["L3"] + stats["L4"]
    l56 = stats["L5"] + stats["L6"]
    p12, p34, p56 = _pct(l12, total), _pct(l34, total), _pct(l56, total)

    if p12 > 40.0:
        errors.append(
            f"[{mappe_id}] Policy-FAIL L1-L2: {p12:.1f} % (>{40} % erlaubt, "
            f"Werte {l12}/{total})."
        )
    if p34 < 30.0:
        errors.append(
            f"[{mappe_id}] Policy-FAIL L3-L4: {p34:.1f} % (<{30} % gefordert, "
            f"Werte {l34}/{total})."
        )
    if p56 < 20.0:
        errors.append(
            f"[{mappe_id}] Policy-FAIL L5-L6: {p56:.1f} % (<{20} % gefordert, "
            f"Werte {l56}/{total})."
        )

    passed = len(errors) == 0
    stats["_total"] = total
    stats["_pct_L12"] = p12
    stats["_pct_L34"] = p34
    stats["_pct_L56"] = p56
    return passed, errors, stats


def main(argv: List[str]) -> int:
    parser = argparse.ArgumentParser(
        description="Validiert Bloom-Verteilung einer Mappe (A19-Policy 40/30/20)."
    )
    parser.add_argument(
        "pfad",
        help="Pfad zu Mappen-Ordner ODER zu monolithischer data.json",
    )
    parser.add_argument(
        "--mappe",
        default=None,
        help="(nur fuer data.json) Beschraenke Pruefung auf diese mappe-id.",
    )
    args = parser.parse_args(argv)

    if not os.path.exists(args.pfad):
        print(f"FEHLER: Pfad nicht gefunden: {args.pfad}", file=sys.stderr)
        return 1

    if os.path.isdir(args.pfad):
        mappen = _collect_from_mappen_dir(args.pfad)
    elif args.pfad.endswith(".json"):
        mappen = _collect_from_data_json(args.pfad, args.mappe)
    else:
        print("FEHLER: Pfad muss Verzeichnis oder .json sein.", file=sys.stderr)
        return 1

    if not mappen:
        print("FEHLER: Keine Mappen zum Pruefen gefunden.", file=sys.stderr)
        return 1

    gesamt_pass = True
    for mid, aufgaben in mappen:
        ok, errs, stats = validate_mappe(mid, aufgaben)
        total = stats.get("_total", 0)
        print(f"=== {mid} ===")
        if total:
            print(
                f"  Verteilung: L1={stats['L1']}  L2={stats['L2']}  "
                f"L3={stats['L3']}  L4={stats['L4']}  "
                f"L5={stats['L5']}  L6={stats['L6']}  (n={total})"
            )
            print(
                f"  Zonen: L1-L2 {stats['_pct_L12']:.1f} %  "
                f"L3-L4 {stats['_pct_L34']:.1f} %  "
                f"L5-L6 {stats['_pct_L56']:.1f} %"
            )
        if ok:
            print("  Status: PASS")
        else:
            print("  Status: FAIL")
            for e in errs:
                print(f"    - {e}")
            gesamt_pass = False

    print()
    print("GESAMT:", "PASS" if gesamt_pass else "FAIL")
    return 0 if gesamt_pass else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
