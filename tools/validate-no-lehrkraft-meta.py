#!/usr/bin/env python3
"""
validate-no-lehrkraft-meta.py — K2 Technical Enforcement

Policy (docs/agents/POLICY_TRIGGER_SICHTBARKEIT.md): Lehrkraft-Metadaten
(inkl. Trigger-Warnungen) duerfen niemals im Schueler-DOM landen.

Diese Pruefung verifiziert, dass weder `lehrkraft_meta` noch
`trigger_warnung` in einem auslieferbaren `escape-games/*/data.json`
auftauchen. Wird im Pre-Commit-Hook und manuell ausgefuehrt.

Exit-Codes: 0 = OK, 1 = Verletzung gefunden.
"""
import glob
import json
import sys

FORBIDDEN_KEYS = ("lehrkraft_meta", "trigger_warnung")


def walk(node, path, violations):
    if isinstance(node, dict):
        for key in FORBIDDEN_KEYS:
            if key in node:
                violations.append(f"{path} enthaelt verbotenes Feld '{key}'")
        for k, v in node.items():
            walk(v, f"{path}.{k}", violations)
    elif isinstance(node, list):
        for i, v in enumerate(node):
            walk(v, f"{path}[{i}]", violations)


def validate(path):
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    violations = []
    walk(data, path, violations)
    return violations


def main():
    ok = True
    files = sorted(glob.glob("escape-games/*/data.json"))
    if not files:
        print("[validate-no-lehrkraft-meta] WARNUNG: keine data.json gefunden")
        return 0
    for p in files:
        violations = validate(p)
        if violations:
            ok = False
            for v in violations:
                print(f"FEHLER: {v}")
        else:
            print(f"OK: {p}")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
