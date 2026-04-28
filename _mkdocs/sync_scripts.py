#!/usr/bin/env python3
"""
sync_scripts.py — Kopiert Schulrecht-Skripte aus
~/weitergehts.online/Klassenleitung/Seminar/MuendlichePrüfungen/Schulrecht/Podcasts/Skripts/
nach ./docs/<mp_xx>/index.md.

Pre-Pend: Front-Matter + Cross-Links zu Anki-Lerndeck + ZALGM-Themen-Detailseite.
"""
import shutil
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent
DOCS_DIR = REPO_ROOT / "docs"

# Source-Repo-Pfad (außerhalb des weitergehts-online-Repos)
SOURCE_BASE = Path.home() / "weitergehts.online" / "Klassenleitung" / "Seminar" / \
              "MuendlichePrüfungen" / "Schulrecht" / "Podcasts" / "Skripts"

# Map: Skript-Datei → Ziel-Slug
MAPPING = {
    "MP_08_Kooperation_Bildungsdienste.md": {
        "slug": "mp08",
        "title": "MP_08 — Kooperation mit Bildungs- und Betreuungseinrichtungen",
        "anki_lerndeck": "https://weitergehts.online/lerndecks/schulrecht-mp08-kooperation/",
        "themen_detail": "https://weitergehts.online/staatsexamen/schulrecht/8-kooperation/",
        "card_count": 45,
        "falle_count": 11,
        "hochprior_count": 9,
    },
    # MP_03 später aktivieren wenn Source-Skript vorhanden
    # "MP_03_Gliederung_Bildungssystem.md": {...},
}

CTA_HEADER_TEMPLATE = """
!!! abstract "Begleit-Material"
    - 🃏 [**Anki-Lerndeck** ({card_count} Karten · {falle_count} Falle · {hochprior_count} Hochprior)]({anki_lerndeck})
    - 📑 [**Themen-Übersichtsseite**]({themen_detail})

"""


def sync_one(source_filename: str, meta: dict):
    src = SOURCE_BASE / source_filename
    if not src.exists():
        print(f"  ✗ Quelle fehlt: {src}")
        return False

    target_dir = DOCS_DIR / meta["slug"]
    target_dir.mkdir(parents=True, exist_ok=True)
    target = target_dir / "index.md"

    raw = src.read_text(encoding="utf-8")
    cta = CTA_HEADER_TEMPLATE.format(**meta)

    # Insert CTA-Block nach dem H1-Title und dem ersten Hinweis-Block
    # Pattern: H1-Zeile, dann optionaler "> **Hinweis** ..."-Block, dann ---
    lines = raw.splitlines(keepends=True)
    insert_at = None
    in_blockquote = False
    for i, line in enumerate(lines):
        if line.startswith("# "):
            in_blockquote = False
            continue
        if line.startswith("> "):
            in_blockquote = True
            continue
        if in_blockquote and line.strip() == "":
            continue
        if line.strip() == "---" and i > 0:
            insert_at = i + 2  # nach dem `---` und der Leerzeile
            break

    if insert_at is None:
        insert_at = 1  # nach H1
    out = "".join(lines[:insert_at]) + cta + "".join(lines[insert_at:])
    target.write_text(out, encoding="utf-8")
    print(f"  ✓ {source_filename} → {target.relative_to(REPO_ROOT)}")
    return True


def main():
    if not DOCS_DIR.exists():
        DOCS_DIR.mkdir(parents=True)
    print(f"Sync nach {DOCS_DIR}…")
    success = 0
    for fname, meta in MAPPING.items():
        if sync_one(fname, meta):
            success += 1
    print(f"\n{success}/{len(MAPPING)} Skripte synchronisiert.")


if __name__ == "__main__":
    main()
