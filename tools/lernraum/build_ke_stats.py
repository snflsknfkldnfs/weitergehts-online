#!/usr/bin/env python3
"""build_ke_stats.py — Lerndeck-Statistik-Aggregation

Erzeugt pro Fach eine Themenfeld-Statistik aus dem kuratierten TSV
(`mp_n18_*_v1.tsv` — die Anki-Pflege-Quelle). Output:

  assets/data/ke-stats-sk.json
  assets/data/ke-stats-mathe.json

Schema:
  {
    "fach": "sk",
    "source": "lerndecks/mp-n18-sk-pruefungsvorbereitung/mp_n18_sk_v1.tsv",
    "total": 85,
    "themen": [
       { "id": "beutelsbach", "label": "Beutelsbach", "cards": 8,
         "hochprior": 8, "card_ids": ["mp_n18_sk:beutelsbach:001", ...] },
       ...
    ]
  }

User-Status (offen/work/repeat/sit) liegt separat in localStorage und wird
nicht von diesem Skript erzeugt.
"""

from __future__ import annotations

import csv
import json
import re
import sys
import unicodedata
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
VAULT_ROOT = REPO_ROOT.parent

SOURCES = {
    "sk": REPO_ROOT / "lerndecks" / "mp-n18-sk-pruefungsvorbereitung" / "mp_n18_sk_v1.tsv",
    "mathe": VAULT_ROOT / "Klassenleitung" / "Seminar" / "MuendlichePrüfungen" / "KE_Matrix_Mathe" / "mp_n18_mathe_ke_v1.tsv",
}

OUTPUT_DIR = REPO_ROOT / "assets" / "data"


def slugify(s: str) -> str:
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode("ascii")
    s = re.sub(r"[^a-z0-9]+", "-", s.lower())
    return s.strip("-")


def parse_sk_tag(tag_string: str) -> dict:
    """Sk-Tags: 'MP_N18_Sk::Begriff MP_N18_Sk::Beutelsbach MP_N18_Sk::Hochprior'

    Themenfeld = der mittlere Tag (alles nach `::Begriff` und vor `::Hochprior`).
    """
    tags = [t.strip() for t in tag_string.split() if t.strip()]
    themen = []
    is_hochprior = False
    kategorie = None  # Begriff | LP | Methode | ...
    for t in tags:
        if "::" in t:
            _, suffix = t.split("::", 1)
        else:
            suffix = t
        if suffix == "Hochprior":
            is_hochprior = True
        elif suffix in ("Begriff", "LP", "Methode", "Modell", "Cluster"):
            kategorie = suffix
        else:
            themen.append(suffix)
    return {
        "themen": themen,
        "hochprior": is_hochprior,
        "kategorie": kategorie,
    }


def parse_mathe_tag(tag_string: str) -> dict:
    """Mathe-Tags: 'MP_N18_Mathe_KE anschluss M9R LB1 Anker Stufe1'

    Themenfeld = '{jgst} {lb}', also 'M9R LB1'.
    """
    tokens = tag_string.split()
    # Position 0: Deck-Tag (MP_N18_Mathe_KE)
    # Position 1: Rolle (kern | vorwissen | anschluss | ...)
    # Position 2: Jgst (M9R | M7R | GPG7 | ...)
    # Position 3: LB-Identifier (LB1 | LB4-5 | LB1-1)
    # Position 4: Konstante 'Anker'
    # Position 5: Stufe (Stufe1 | Stufe2 | Stufe3)
    rolle = tokens[1] if len(tokens) > 1 else None
    jgst = tokens[2] if len(tokens) > 2 else None
    lb = tokens[3] if len(tokens) > 3 else None
    stufe = tokens[5] if len(tokens) > 5 else None

    label = f"{jgst} {lb}" if (jgst and lb) else None
    return {
        "label": label,
        "jgst": jgst,
        "lb": lb,
        "stufe": stufe,
        "rolle": rolle,
    }


def aggregate_sk(tsv_path: Path) -> dict:
    themen_idx: dict[str, dict] = {}
    total = 0
    with tsv_path.open(encoding="utf-8") as f:
        reader = csv.reader(f, delimiter="\t")
        for row in reader:
            if not row or row[0].startswith("#"):
                continue
            if len(row) < 4:
                continue
            front, _back, _quelle, tags = row[0], row[1], row[2], row[3]
            total += 1
            meta = parse_sk_tag(tags)
            card_id = slugify(front)[:60] or f"card-{total}"

            for thema in meta["themen"]:
                key = slugify(thema)
                if key not in themen_idx:
                    themen_idx[key] = {
                        "id": key,
                        "label": thema,
                        "cards": 0,
                        "hochprior": 0,
                        "kategorien": {},
                        "card_ids": [],
                    }
                themen_idx[key]["cards"] += 1
                if meta["hochprior"]:
                    themen_idx[key]["hochprior"] += 1
                if meta["kategorie"]:
                    themen_idx[key]["kategorien"][meta["kategorie"]] = (
                        themen_idx[key]["kategorien"].get(meta["kategorie"], 0) + 1
                    )
                themen_idx[key]["card_ids"].append(card_id)

    themen = sorted(themen_idx.values(), key=lambda t: (-t["cards"], t["label"]))
    return {
        "fach": "sk",
        "source": str(tsv_path.relative_to(REPO_ROOT)) if str(tsv_path).startswith(str(REPO_ROOT)) else str(tsv_path),
        "total": total,
        "themen": themen,
    }


def aggregate_mathe(tsv_path: Path) -> dict:
    themen_idx: dict[str, dict] = {}
    total = 0
    with tsv_path.open(encoding="utf-8") as f:
        reader = csv.reader(f, delimiter="\t")
        for row in reader:
            if not row or row[0].startswith("#"):
                continue
            if len(row) < 4:
                continue
            front, _back, _quelle, tags = row[0], row[1], row[2], row[3]
            total += 1
            meta = parse_mathe_tag(tags)
            if not meta["label"]:
                continue
            key = slugify(meta["label"])
            card_id = slugify(front)[:60] or f"card-{total}"

            if key not in themen_idx:
                themen_idx[key] = {
                    "id": key,
                    "label": meta["label"],
                    "jgst": meta["jgst"],
                    "lb": meta["lb"],
                    "cards": 0,
                    "stufen": {"Stufe1": 0, "Stufe2": 0, "Stufe3": 0},
                    "rollen": {},
                    "card_ids": [],
                }
            themen_idx[key]["cards"] += 1
            if meta["stufe"] in themen_idx[key]["stufen"]:
                themen_idx[key]["stufen"][meta["stufe"]] += 1
            if meta["rolle"]:
                themen_idx[key]["rollen"][meta["rolle"]] = (
                    themen_idx[key]["rollen"].get(meta["rolle"], 0) + 1
                )
            themen_idx[key]["card_ids"].append(card_id)

    themen = sorted(themen_idx.values(), key=lambda t: (t["jgst"] or "", t["lb"] or ""))
    try:
        rel = tsv_path.relative_to(VAULT_ROOT)
    except ValueError:
        rel = tsv_path
    return {
        "fach": "mathe",
        "source": str(rel),
        "total": total,
        "themen": themen,
    }


def main() -> int:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    rc = 0

    for fach, path in SOURCES.items():
        if not path.exists():
            print(f"[build_ke_stats:{fach}] WARN Quelle fehlt: {path}", file=sys.stderr)
            rc = 1
            continue
        agg = aggregate_sk(path) if fach == "sk" else aggregate_mathe(path)
        out = OUTPUT_DIR / f"ke-stats-{fach}.json"
        out.write_text(json.dumps(agg, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(
            f"[build_ke_stats:{fach}] OK  total={agg['total']}  themen={len(agg['themen'])}  "
            f"-> {out.relative_to(REPO_ROOT)}"
        )

    return rc


if __name__ == "__main__":
    sys.exit(main())
