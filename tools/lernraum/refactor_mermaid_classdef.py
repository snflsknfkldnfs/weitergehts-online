#!/usr/bin/env python3
"""refactor_mermaid_classdef.py — Mermaid-Norm-Hierarchie-Tokenisierung

Ersetzt die alten 5-Farben-classDef in mkdocs-Skript-Files durch das
wg.lernraum-Token-System (Spec §2: monochrom + 1px-Linien + semantische
Codierung ueber Border-Style + Label).

Mapping:
  bv     → schwarz solid 1.5px  (Verfassung = Hoechste Ebene)
  bay    → Olive   solid 1.5px  (Akzent = primaere Sk-Norm)
  vo     → muted   solid 1px    (Schulordnungen)
  km     → mute2   dashed 1px   (KMBek = nachgeordnet)
  kmbek  → mute2   dashed 1px   (alias)
  bund   → ink     dotted 1px   (Bundesrecht = Querverweis)

Aufruf:
  python3 tools/lernraum/refactor_mermaid_classdef.py        # dry-run
  python3 tools/lernraum/refactor_mermaid_classdef.py --apply
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
TARGETS = sorted((REPO_ROOT / "_mkdocs" / "docs").glob("mp*/index.md"))

REPLACEMENTS = {
    "bv":    "classDef bv fill:#ffffff,stroke:#0c0c0a,stroke-width:1.5px,color:#0c0c0a",
    "bay":   "classDef bay fill:#ffffff,stroke:#4a5d3b,stroke-width:1.5px,color:#0c0c0a",
    "vo":    "classDef vo fill:#fafaf6,stroke:#6b685f,stroke-width:1px,color:#0c0c0a",
    "km":    "classDef km fill:#fafaf6,stroke:#9b988e,stroke-width:1px,color:#0c0c0a,stroke-dasharray: 4 2",
    "kmbek": "classDef kmbek fill:#fafaf6,stroke:#9b988e,stroke-width:1px,color:#0c0c0a,stroke-dasharray: 4 2",
    "bund":  "classDef bund fill:#ffffff,stroke:#0c0c0a,stroke-width:1px,color:#0c0c0a,stroke-dasharray: 2 2",
}

CLASSDEF_RE = re.compile(r"^(\s*)classDef\s+(bv|bay|vo|km|kmbek|bund)\b[^\n]*$", re.MULTILINE)


def refactor_file(path: Path, apply: bool) -> tuple[int, list[str]]:
    text = path.read_text(encoding="utf-8")
    changes: list[str] = []

    def repl(m):
        indent = m.group(1)
        cls = m.group(2)
        new_line = indent + REPLACEMENTS[cls]
        old_line = m.group(0)
        if old_line != new_line:
            changes.append(f"  {cls}:  {old_line.strip()}  →  {new_line.strip()}")
        return new_line

    new_text, count = CLASSDEF_RE.subn(repl, text)

    if apply and count and new_text != text:
        path.write_text(new_text, encoding="utf-8")

    return count, changes


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true", help="Datei wirklich aendern (Default: dry-run)")
    args = ap.parse_args()

    total_files = total_lines = 0
    for path in TARGETS:
        rel = path.relative_to(REPO_ROOT)
        n, changes = refactor_file(path, apply=args.apply)
        if n:
            total_files += 1
            total_lines += n
            print(f"{'[APPLY]' if args.apply else '[DRY] '} {rel}  ({n} classDef-Zeilen)")
            for c in changes[:5]:
                print(c)
            if len(changes) > 5:
                print(f"  ... +{len(changes) - 5} weitere")

    mode = "APPLIED" if args.apply else "DRY-RUN"
    print()
    print(f"{mode}: {total_files} Files / {total_lines} classDef-Zeilen ueberschrieben.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
