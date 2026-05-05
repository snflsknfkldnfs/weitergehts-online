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
    "MP_01_Messer_im_Unterricht.md": {
        "slug": "mp01",
        "title": "MP_01 — Messer im Unterricht · Beschlagnahme + Strafrechts-Schnittstelle",
        "anki_lerndeck": "https://weitergehts.online/lerndecks/schulrecht-mp01-messer-im-unterricht/",
        "themen_detail": "https://weitergehts.online/staatsexamen/schulrecht/1-messer-im-unterricht/",
        "card_count": 24,    # M01-M08 + 10 FA + 6 Verbatim
        "falle_count": 10,   # FA01-FA10
        "hochprior_count": 4,  # 4 Fallbeispiele
    },
    "MP_02_Hausaufgaben_Beschwerde.md": {
        "slug": "mp02",
        "title": "MP_02 — Hausaufgaben + Beschwerde-Verfahren",
        "anki_lerndeck": "https://weitergehts.online/lerndecks/schulrecht-mp02-hausaufgaben-beschwerde/",
        "themen_detail": "https://weitergehts.online/staatsexamen/schulrecht/2-hausaufgaben-beschwerde/",
        "card_count": 24,    # H01-H08 + 10 FA + 6 Verbatim
        "falle_count": 10,   # FA01-FA10
        "hochprior_count": 4,  # 4 Fallbeispiele
    },
    "MP_03_Gliederung_Bildungssystem.md": {
        "slug": "mp03",
        "title": "MP_03 — Gliederung des Bildungssystems · Bildungswege",
        "anki_lerndeck": "https://weitergehts.online/lerndecks/schulrecht-mp03-bildungssystem/",
        "themen_detail": "https://weitergehts.online/staatsexamen/schulrecht/2-gliederung-bildungssystem/",
        "card_count": 39,
        "falle_count": 12,
        "hochprior_count": 10,
    },
    "MP_04_Schulartenrecht_Schullaufbahn.md": {
        "slug": "mp04",
        "title": "MP_04 — Schulartenrecht · Schullaufbahn-Steuerung",
        "anki_lerndeck": "https://weitergehts.online/lerndecks/schulrecht-mp04-schulartenrecht-schullaufbahn/",
        "themen_detail": "https://weitergehts.online/staatsexamen/schulrecht/4-schulartenrecht-schullaufbahn/",
        "card_count": 8,    # S01-S08
        "falle_count": 10,  # FA01-FA10
        "hochprior_count": 5,  # 5 Fallbeispiele
    },
    "MP_05_Rechte_Pflichten_Schueler.md": {
        "slug": "mp05",
        "title": "MP_05 — Rechte und Pflichten der Schüler:innen",
        "anki_lerndeck": "https://weitergehts.online/lerndecks/schulrecht-mp05-rechte-pflichten/",
        "themen_detail": "https://weitergehts.online/staatsexamen/schulrecht/5-rechte-pflichten-schueler/",
        "card_count": 36,
        "falle_count": 10,
        "hochprior_count": 8,
    },
    "MP_06_Rechte_Pflichten_Lehrkraefte.md": {
        "slug": "mp06",
        "title": "MP_06 — Rechte und Pflichten der Lehrkräfte",
        "anki_lerndeck": "https://weitergehts.online/lerndecks/schulrecht-mp06-rechte-pflichten-lk/",
        "themen_detail": "https://weitergehts.online/staatsexamen/schulrecht/6-rechte-pflichten-lehrkraefte/",
        "card_count": 8,    # L01-L08
        "falle_count": 10,  # FA01-FA10
        "hochprior_count": 5,  # 5 Fallbeispiele
    },
    "MP_07_Disziplinar_Haftung.md": {
        "slug": "mp07",
        "title": "MP_07 — Disziplinarrecht und Haftung im Schuldienst",
        "anki_lerndeck": "https://weitergehts.online/lerndecks/schulrecht-mp07-disziplinar-haftung/",
        "themen_detail": "https://weitergehts.online/staatsexamen/schulrecht/7-disziplinar-haftung/",
        "card_count": 8,    # H01-H08
        "falle_count": 10,  # FA01-FA10
        "hochprior_count": 4,  # 4 Fallbeispiele
    },
    "MP_08_Kooperation_Bildungsdienste.md": {
        "slug": "mp08",
        "title": "MP_08 — Kooperation mit Bildungs- und Betreuungseinrichtungen",
        "anki_lerndeck": "https://weitergehts.online/lerndecks/schulrecht-mp08-kooperation/",
        "themen_detail": "https://weitergehts.online/staatsexamen/schulrecht/8-kooperation/",
        "card_count": 45,
        "falle_count": 11,
        "hochprior_count": 9,
    },
    "MP_09_Datenschutz_Schuelerakte.md": {
        "slug": "mp09",
        "title": "MP_09 — Datenschutz und Schülerakte im Schuldienst",
        "anki_lerndeck": "https://weitergehts.online/lerndecks/schulrecht-mp09-datenschutz-schuelerakte/",
        "themen_detail": "https://weitergehts.online/staatsexamen/schulrecht/9-datenschutz-schuelerakte/",
        "card_count": 8,    # D01-D08
        "falle_count": 10,  # FA01-FA10
        "hochprior_count": 5,  # 5 Fallbeispiele
    },
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
