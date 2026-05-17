#!/usr/bin/env python3
"""build_themen_mp.py — Themen↔MP-Manifest

Extrahiert die Themenfeld-zu-Pruefungsschwerpunkt-Zuordnung aus
`staatsexamen/schulrecht/index.html` und schreibt sie nach
`assets/data/themen-mp.json`.

Output-Schema:
  {
    "themen": [
      { "nr": "5", "titel": "...", "href": "skripts/mp05/",
        "mp_codes": ["MP_05"], "querschnitt": false,
        "anchor": "5-rechte-pflichten-schueler" },
      ...
    ],
    "schwerpunkte": [   # Querschnitt-Markierung ★
      { "titel": "...", "href": "skripts/mp05/", "mp_codes": ["MP_05"], ... }
    ]
  }
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
SOURCE = REPO_ROOT / "staatsexamen" / "schulrecht" / "index.html"
OUTPUT = REPO_ROOT / "assets" / "data" / "themen-mp.json"

# L2-Schulrecht (post-Lernraum-Spec-v1.1): Tabellen-Rows mit col-nr + theme-titel
# <tr data-status-id="..."> ... <td class="col-nr">N</td>
#   <td><span class="status-dot" data-status="..."></span></td>
#   <td><a href="..." class="theme-titel">TITEL</a><span class="theme-sub">MP_05 ...</span></td>
TR_RE = re.compile(
    r'<tr(?P<attrs>[^>]*data-status-id[^>]*)>'
    r'(?P<body>.+?)'
    r'</tr>',
    re.DOTALL,
)
COL_NR_RE = re.compile(r'<td class="col-nr">([^<]+)</td>')
STATUS_DOT_RE = re.compile(r'<span class="status-dot"[^>]*data-status="([^"]+)"')
THEMA_TITLE_RE = re.compile(
    r'<a[^>]*href="(?P<href>[^"]+)"[^>]*class="theme-titel"[^>]*>(?P<text>[^<]+)</a>'
    r'(?:\s*<span class="theme-sub">(?P<sub>[^<]+)</span>)?'
)
THEMA_TITLE_NOLINK_RE = re.compile(
    r'<span class="theme-titel">(?P<text>[^<]+)</span>'
    r'(?:\s*<span class="theme-sub">(?P<sub>[^<]+)</span>)?'
)
DATA_STATUS_ID_RE = re.compile(r'data-status-id="(?P<id>[^"]+)"')
MP_CODE_RE = re.compile(r'\bMP_(\d{2})\b')

# Anchor-Slug-Mapping fuer L3-Pfade (best-effort)
ANCHOR_MAP = {
    "skripts/mp03/": "2-gliederung-bildungssystem",
    "skripts/mp04/": "3-schulpflicht",   # mehrere Themen -> mp04
    "skripts/mp05/": "5-rechte-pflichten-schueler",
    "skripts/mp02/": "6-eom",
    "skripts/mp07/": "7-aufsicht-haftung",
    "skripts/mp08/": "8-kooperation",
    "skripts/mp06/": "9-dienstrecht-lehrkraft",
    "skripts/mp09/": "10-spezialthemen",
    "skripts/mp01/": "messer-jugendschutz",
}


def parse_themen(html: str) -> tuple[list[dict], list[dict]]:
    themen: list[dict] = []
    schwerpunkte: list[dict] = []

    for m in TR_RE.finditer(html):
        attrs = m.group("attrs") or ""
        body = m.group("body")

        nr_match = COL_NR_RE.search(body)
        num = nr_match.group(1).strip() if nr_match else ""

        status_match = STATUS_DOT_RE.search(body)
        status = status_match.group(1) if status_match else "open"

        thema_match = THEMA_TITLE_RE.search(body)
        if thema_match:
            href = thema_match.group("href")
            title = thema_match.group("text").strip()
            sub = thema_match.group("sub") or ""
        else:
            nolink = THEMA_TITLE_NOLINK_RE.search(body)
            if not nolink:
                continue
            href = None
            title = nolink.group("text").strip()
            sub = nolink.group("sub") or ""

        mp_codes = [f"MP_{c}" for c in MP_CODE_RE.findall(sub)]
        status_id_match = DATA_STATUS_ID_RE.search(attrs)
        status_id = status_id_match.group("id") if status_id_match else None

        is_querschnitt = num == "★" or (status_id and "qs-" in status_id)

        entry = {
            "nr": num,
            "titel": title.strip(" —·"),
            "sub": sub.strip(" —·"),
            "href": href,
            "mp_codes": mp_codes,
            "status_default": status,
            "status_id": status_id,
            "anchor": ANCHOR_MAP.get(href) if href else None,
            "querschnitt": is_querschnitt,
        }
        if is_querschnitt:
            schwerpunkte.append(entry)
        else:
            themen.append(entry)

    return themen, schwerpunkte


def _strip_html(s: str) -> str:
    return re.sub(r"<[^>]+>", "", s)


def main() -> int:
    if not SOURCE.exists():
        print(f"[build_themen_mp] FEHLER: Quelle fehlt: {SOURCE}", file=sys.stderr)
        return 1

    html = SOURCE.read_text(encoding="utf-8")
    themen, schwerpunkte = parse_themen(html)

    out = {
        "source": str(SOURCE.relative_to(REPO_ROOT)),
        "themen": themen,
        "schwerpunkte": schwerpunkte,
    }

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(
        json.dumps(out, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(
        f"[build_themen_mp] OK  themen={len(themen)}  schwerpunkte={len(schwerpunkte)}  "
        f"-> {OUTPUT.relative_to(REPO_ROOT)}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
