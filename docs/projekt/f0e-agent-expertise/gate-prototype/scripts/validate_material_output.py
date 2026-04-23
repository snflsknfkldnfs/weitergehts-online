#!/usr/bin/env python3
"""
validate_material_output.py — F0e Schema-Gate-Prototyp

Zweck:
    Validiert ein Material-Output-JSON gegen das gepinnte Draft-7-Schema
    material_quellentext_v3.10.3.json (SHA-256: f08df7ee4c81ae3f21ec90381de0a7fc9a1dffe160d686247ba228757196244c).

    v3.10.3 (F0e-AEF §19.A): _meta.wortanzahl.maximum=180 erzwingt Max-Cap
    auf Schema-Ebene. Siehe Overlay PROMPT_HARDENING_QUELLENTEXT_v1-1.md §2.

    Abwaerts-Kompatibilitaet: --schema material_quellentext_v3.10.2.json
    funktioniert weiterhin; pinned_match wird dann False (dokumentiert).

    Ersetzt die self-declared schema_01_pass=true des Generators durch einen
    deterministischen Validator-Call. F0d zeigte 0/6 Compliance trotz self-PASS
    (Self-Check-Bias, H4 bestätigt).

Usage:
    python3 validate_material_output.py <pfad_zu_output.json>
    python3 validate_material_output.py --schema <pfad_schema> <pfad_zu_output.json>
    python3 validate_material_output.py --json-report <pfad_zu_output.json>

Exit-Codes:
    0  — PASS (Schema-valide)
    1  — FAIL (mindestens ein Schema-Fehler)
    2  — IO/Parse-Fehler (Input nicht lesbar/kein JSON)
    3  — Schema-Fehler (Schema nicht lesbar/ungueltig)

Output:
    Standard-Modus: Lesbarer Report auf stdout mit Fehler-Liste.
    --json-report: Strukturiertes JSON-Report auf stdout (maschinenlesbar).

Author: F0e Gate-Prototyp
Date: 2026-04-21
"""

from __future__ import annotations

import argparse
import hashlib
import json
import sys
from pathlib import Path
from typing import Any

import jsonschema
from jsonschema import Draft7Validator

# Pfad-Auflösung: Script in scripts/, Schema in ../schemas/
SCRIPT_DIR = Path(__file__).resolve().parent
DEFAULT_SCHEMA = SCRIPT_DIR.parent / "schemas" / "material_quellentext_v3.10.3.json"
PINNED_SCHEMA_HASH = "f08df7ee4c81ae3f21ec90381de0a7fc9a1dffe160d686247ba228757196244c"

# Historische Pins (Information, nicht Enforcement):
# - v3.10.2 Full:    632d7b4771bf19f007f66fb5442d1f6678cff50b6cade3fac7819c3522a41ffa
# - v3.10.2 Partial: 568c0622f51edd23646eb823cd9aa7b70aa531a68aa20c464fbc850948a7390b
# - v3.10.3 Partial: 0f3fe48e113de3f937e7f5997082069ac4525ff166307b282247501a9bdc6e38


def file_hash(path: Path) -> str:
    h = hashlib.sha256()
    h.update(path.read_bytes())
    return h.hexdigest()


def classify_error(err: jsonschema.ValidationError) -> str:
    """Grobe Fehler-Klassifikation fuer Report-Aggregation."""
    v = err.validator
    if v == "required":
        return "MISSING_REQUIRED"
    if v == "additionalProperties":
        return "UNKNOWN_FIELD"
    if v == "type":
        return "WRONG_TYPE"
    if v == "enum":
        return "ENUM_VIOLATION"
    if v == "pattern":
        return "PATTERN_MISMATCH"
    if v in ("minLength", "maxLength", "minItems", "maxItems", "minimum", "maximum"):
        return "CONSTRAINT_VIOLATION"
    if v == "oneOf":
        return "ONEOF_MISMATCH"
    if v == "allOf":
        return "ALLOF_MISMATCH"
    if v == "if":
        return "CONDITIONAL_MISMATCH"
    return f"OTHER:{v}"


def path_str(err: jsonschema.ValidationError) -> str:
    return "/" + "/".join(str(p) for p in err.absolute_path) if err.absolute_path else "/"


def format_error(err: jsonschema.ValidationError) -> dict[str, Any]:
    return {
        "path": path_str(err),
        "validator": err.validator,
        "class": classify_error(err),
        "message": err.message,
        "schema_path": "/" + "/".join(str(p) for p in err.absolute_schema_path),
    }


def validate(
    output_path: Path, schema_path: Path, json_report: bool
) -> tuple[int, dict[str, Any]]:
    # Schema laden
    try:
        schema_raw = schema_path.read_bytes()
        schema = json.loads(schema_raw)
    except (OSError, json.JSONDecodeError) as e:
        return 3, {"error": f"Schema nicht lesbar: {e}", "schema_path": str(schema_path)}

    actual_hash = hashlib.sha256(schema_raw).hexdigest()
    hash_match = actual_hash == PINNED_SCHEMA_HASH

    # Validator konstruieren (Schema-Selbstpruefung)
    try:
        Draft7Validator.check_schema(schema)
    except jsonschema.SchemaError as e:
        return 3, {"error": f"Schema ungueltig: {e}", "schema_path": str(schema_path)}

    # Input laden
    try:
        instance = json.loads(output_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as e:
        return 2, {"error": f"Input nicht lesbar: {e}", "input_path": str(output_path)}

    # Validieren
    validator = Draft7Validator(schema)
    errors = sorted(validator.iter_errors(instance), key=lambda e: list(e.absolute_path))

    report: dict[str, Any] = {
        "input_path": str(output_path),
        "schema_path": str(schema_path),
        "schema_sha256": actual_hash,
        "schema_pinned_match": hash_match,
        "valid": len(errors) == 0,
        "error_count": len(errors),
        "errors": [format_error(e) for e in errors],
    }

    # Aggregation nach Klasse
    class_counts: dict[str, int] = {}
    for e in errors:
        cls = classify_error(e)
        class_counts[cls] = class_counts.get(cls, 0) + 1
    report["error_class_histogram"] = class_counts

    return (0 if report["valid"] else 1), report


def print_human_report(exit_code: int, report: dict[str, Any]) -> None:
    if exit_code == 3:
        print(f"SCHEMA-ERROR: {report.get('error')}", file=sys.stderr)
        return
    if exit_code == 2:
        print(f"IO-ERROR: {report.get('error')}", file=sys.stderr)
        return

    status = "PASS" if report["valid"] else "FAIL"
    print(f"[{status}] {report['input_path']}")
    print(f"  schema: {report['schema_path']}")
    print(f"  schema_sha256: {report['schema_sha256']}")
    print(f"  pinned_match: {report['schema_pinned_match']}")
    print(f"  error_count: {report['error_count']}")

    if report["errors"]:
        print("  error_class_histogram:")
        for cls, n in sorted(report["error_class_histogram"].items(), key=lambda x: -x[1]):
            print(f"    {cls}: {n}")
        print("  errors:")
        for e in report["errors"]:
            print(f"    - [{e['class']}] {e['path']}  ({e['validator']})")
            msg = e["message"].replace("\n", " ")
            if len(msg) > 200:
                msg = msg[:197] + "..."
            print(f"      msg: {msg}")


def main(argv: list[str]) -> int:
    p = argparse.ArgumentParser(description="F0e Schema-Gate fuer Material-Outputs")
    p.add_argument("input", type=Path, help="Pfad zum Material-Output-JSON")
    p.add_argument(
        "--schema",
        type=Path,
        default=DEFAULT_SCHEMA,
        help=f"Pfad zum Schema (default: {DEFAULT_SCHEMA})",
    )
    p.add_argument(
        "--json-report",
        action="store_true",
        help="Report als JSON auf stdout statt Human-Readable",
    )
    args = p.parse_args(argv)

    exit_code, report = validate(args.input, args.schema, args.json_report)

    if args.json_report:
        print(json.dumps(report, indent=2, ensure_ascii=False))
    else:
        print_human_report(exit_code, report)

    return exit_code


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
