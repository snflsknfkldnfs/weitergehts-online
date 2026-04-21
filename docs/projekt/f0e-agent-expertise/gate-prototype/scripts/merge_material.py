#!/usr/bin/env python3
"""
merge_material.py — F0e Dispatcher-Merge-Skript

Zweck:
    Simuliert den Dispatcher-Merge aus AGENT_MATERIAL.md Phase 2.1:
    Kombiniert einen Subagent-Partial (nur Content-Felder + _meta) mit einem
    Dispatcher-Context (Struktur-Felder aus MATERIAL_GERUEST + Sequenzplan +
    Ueberleitungen) zu einem vollstaendigen Material-Objekt.

    Getrennt vom Subagent-Aufruf, um Zweistufigkeit des Schema-Gates zu
    ermoeglichen (Partial-Gate vor Merge, Full-Gate nach Merge).

Struktur-Feld-Ownership (laut SUB_MATERIAL_QUELLENTEXT.md Zeile 249):
    Dispatcher: id, typ, titel, position, didaktische_funktion,
                voraussetzung, ueberleitung_von, sequenz_kontext
    Subagent:   inhalt, quelle, _meta
    Konditional (typ=bildquelle|karte): bildunterschrift, lizenz — Subagent

Usage:
    python3 merge_material.py --partial <partial.json> --context <context.json> --out <out.json>
    python3 merge_material.py --partial <partial.json> --context <context.json>           # stdout

Dispatcher-Context Format:
    {
      "id": "mat-4-3",
      "typ": "quellentext",
      "titel": "Vernichtungsbefehl — was 'Schutzgebiet' wirklich bedeutete",
      "position": 3,
      "didaktische_funktion": "erarbeitung",
      "voraussetzung": ["mat-4-2"],
      "ueberleitung_von": "Der Wettlauf um Kolonien …",
      "sequenz_kontext": {
        "vorher": {"id": "mat-4-2", "typ": "darstellungstext", "kerninhalt": "…"},
        "nachher": {"id": "mat-4-4", "typ": "bildquelle", "kerninhalt": "…"}
      }
    }

Exit-Codes:
    0  — Merge erfolgreich, Output geschrieben/ausgegeben.
    1  — Partial-Input hat Dispatcher-Ownership-Felder (Kollision) oder fehlt Required-Subagent-Felder.
    2  — Context hat ungueltige Struktur-Felder oder fehlt Required-Dispatcher-Felder.
    3  — IO-/Parse-Fehler.

Author: F0e Gate-Prototyp
Date: 2026-04-21
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

DISPATCHER_OWNERSHIP = {
    "id",
    "typ",
    "titel",
    "position",
    "didaktische_funktion",
    "voraussetzung",
    "ueberleitung_von",
    "sequenz_kontext",
}

SUBAGENT_CONTENT_FIELDS = {
    "inhalt",
    "quelle",
    "_meta",
}

# Konditional: bei typ in {bildquelle, karte} auch
SUBAGENT_CONDITIONAL_FIELDS = {
    "bildunterschrift",
    "lizenz",
}

REQUIRED_DISPATCHER_FIELDS = {
    "id",
    "typ",
    "titel",
    "position",
    "didaktische_funktion",
    "voraussetzung",
    "ueberleitung_von",
    "sequenz_kontext",
}


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def check_partial(partial: dict[str, Any]) -> list[str]:
    errors: list[str] = []

    # Pflichtfelder Subagent
    for f in ("inhalt", "quelle", "_meta"):
        if f not in partial:
            errors.append(f"Partial fehlt Required-Feld: '{f}'")

    # Kollision mit Dispatcher-Ownership
    collisions = set(partial.keys()) & DISPATCHER_OWNERSHIP
    if collisions:
        errors.append(
            f"Partial enthaelt Dispatcher-Ownership-Felder (Kollision): "
            f"{sorted(collisions)}. Diese sind vom Subagent-Output auszuschliessen."
        )

    # Unbekannte Felder (nicht subagent-owned, nicht dispatcher-kollision)
    known_subagent = SUBAGENT_CONTENT_FIELDS | SUBAGENT_CONDITIONAL_FIELDS
    unknown = set(partial.keys()) - known_subagent - DISPATCHER_OWNERSHIP
    if unknown:
        errors.append(f"Partial enthaelt unbekannte Top-Level-Felder: {sorted(unknown)}")

    return errors


def check_context(context: dict[str, Any]) -> list[str]:
    errors: list[str] = []

    missing = REQUIRED_DISPATCHER_FIELDS - set(context.keys())
    if missing:
        errors.append(f"Context fehlt Required-Dispatcher-Felder: {sorted(missing)}")

    # Context darf keine Subagent-Felder haben
    leaked = set(context.keys()) & SUBAGENT_CONTENT_FIELDS
    if leaked:
        errors.append(
            f"Context enthaelt Subagent-Ownership-Felder (Leak): {sorted(leaked)}."
        )

    # Sequenz-Kontext Shape (Minimal-Check, vollstaendige Validierung durch Full-Gate)
    sk = context.get("sequenz_kontext")
    if isinstance(sk, dict):
        for slot in ("vorher", "nachher"):
            if slot not in sk:
                errors.append(f"Context.sequenz_kontext fehlt '{slot}'")
                continue
            v = sk[slot]
            if v is None:
                continue
            if not isinstance(v, dict):
                errors.append(
                    f"Context.sequenz_kontext.{slot} muss dict oder null sein, got {type(v).__name__}"
                )
                continue
            for req in ("id", "typ", "kerninhalt"):
                if req not in v:
                    errors.append(f"Context.sequenz_kontext.{slot} fehlt '{req}'")

    return errors


def merge(partial: dict[str, Any], context: dict[str, Any]) -> dict[str, Any]:
    merged: dict[str, Any] = {}
    # Dispatcher-Felder (erst Context, damit Order stabil)
    for k in ("id", "typ", "titel"):
        merged[k] = context[k]

    # Subagent-Content
    merged["inhalt"] = partial["inhalt"]
    merged["quelle"] = partial["quelle"]

    # Dispatcher-Struktur
    merged["position"] = context["position"]
    merged["didaktische_funktion"] = context["didaktische_funktion"]
    merged["voraussetzung"] = context["voraussetzung"]
    merged["ueberleitung_von"] = context["ueberleitung_von"]
    merged["sequenz_kontext"] = context["sequenz_kontext"]

    # Konditional (typ=bildquelle|karte) uebernimmt bildunterschrift/lizenz aus Partial
    typ = context["typ"]
    if typ in ("bildquelle", "karte"):
        for f in ("bildunterschrift", "lizenz"):
            if f in partial:
                merged[f] = partial[f]

    # Subagent-Meta
    merged["_meta"] = partial["_meta"]

    return merged


def main(argv: list[str]) -> int:
    p = argparse.ArgumentParser(description="F0e Dispatcher-Merge (Partial + Context -> Full-Material)")
    p.add_argument("--partial", type=Path, required=True, help="Subagent-Partial JSON")
    p.add_argument("--context", type=Path, required=True, help="Dispatcher-Context JSON")
    p.add_argument("--out", type=Path, help="Output-Pfad (default: stdout)")
    p.add_argument(
        "--strict",
        action="store_true",
        default=True,
        help="Strict-Mode: bricht bei jeglichem Ownership-Konflikt (default)",
    )
    p.add_argument(
        "--warn-only",
        action="store_true",
        help="Warnungs-Modus: Kollision/Leak nur als Warning auf stderr, Merge laeuft trotzdem",
    )
    args = p.parse_args(argv)

    try:
        partial = load_json(args.partial)
        context = load_json(args.context)
    except (OSError, json.JSONDecodeError) as e:
        print(f"IO-ERROR: {e}", file=sys.stderr)
        return 3

    partial_errors = check_partial(partial)
    context_errors = check_context(context)

    for e in partial_errors:
        print(f"PARTIAL: {e}", file=sys.stderr)
    for e in context_errors:
        print(f"CONTEXT: {e}", file=sys.stderr)

    if partial_errors and not args.warn_only:
        return 1
    if context_errors and not args.warn_only:
        return 2

    merged = merge(partial, context)

    output = json.dumps(merged, indent=2, ensure_ascii=False)
    if args.out:
        args.out.write_text(output + "\n", encoding="utf-8")
    else:
        print(output)

    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
