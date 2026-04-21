#!/usr/bin/env python3
"""
extract_partial.py — Hilfsskript fuer F0e Gate-Prototyp

Zweck:
    Extrahiert aus einem Full-Material-JSON (oder F0d-Output mit gemischten
    Feldern) NUR die Subagent-Ownership-Felder (inhalt, quelle, _meta) und
    schreibt sie als Partial aus.

    Dient als Regressions-Hilfe gegen die 6 F0d-Outputs: isoliert den
    Subagent-Return-Anteil, damit der Partial-Gate nur Subagent-Defekte
    misst — nicht Dispatcher-Ownership-Lecks.

Usage:
    python3 extract_partial.py <input.json> --out <output.json>
    cat input.json | python3 extract_partial.py - --out output.json
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

KEEP_FIELDS = {"inhalt", "quelle", "_meta", "bildunterschrift", "lizenz"}


def main(argv: list[str]) -> int:
    p = argparse.ArgumentParser()
    p.add_argument("input", type=Path, help="Full-Material oder F0d-Output JSON")
    p.add_argument("--out", type=Path, required=True)
    args = p.parse_args(argv)

    data = json.loads(args.input.read_text(encoding="utf-8"))
    partial = {k: v for k, v in data.items() if k in KEEP_FIELDS}

    args.out.write_text(
        json.dumps(partial, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
