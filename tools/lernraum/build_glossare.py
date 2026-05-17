#!/usr/bin/env python3
"""build_glossare.py — Lernraum-Redesign §11/§12

Erzeugt drei Glossar-JSON-Dateien aus den kanonischen Markdown-Quellen:

  assets/data/glossar-norm.json     <-  _mkdocs/docs/includes/normen-glossar.md
  assets/data/glossar-lp.json       <-  _Lehrplan_Zitatkonzentrat_Mathe.md
                                        + _Lehrplan_Zitatkonzentrat_Sk.md
  assets/data/glossar-prinzip.json  <-  _Glossar_Mathe_Schnellnachschlag.md
                                        + _Glossar_Sk_Schnellnachschlag.md

Aufruf (Repo-Root = `weitergehts-online/`):

  python3 tools/lernraum/build_glossare.py

Die Parser sind absichtlich tolerant gegenueber Markdown-Drift: Heading-Tree,
Blockzitate, Bullets und Backtick-Quellenblocks werden best-effort extrahiert.
"""

from __future__ import annotations

import json
import re
import sys
import unicodedata
from pathlib import Path

# --------------------------------------------------------------------------
# Konstanten / Pfade
# --------------------------------------------------------------------------

REPO_ROOT = Path(__file__).resolve().parents[2]  # weitergehts-online/
VAULT_ROOT = REPO_ROOT.parent                    # ~/weitergehts.online/

NORM_SOURCE = REPO_ROOT / "_mkdocs" / "docs" / "includes" / "normen-glossar.md"

FRAGENBEARBEITUNG = VAULT_ROOT / "Klassenleitung" / "Seminar" / "MuendlichePrüfungen" / "Fragenbearbeitung"

LP_SOURCES = [
    ("mathe", FRAGENBEARBEITUNG / "_Lehrplan_Zitatkonzentrat_Mathe.md"),
    ("sk",    FRAGENBEARBEITUNG / "_Lehrplan_Zitatkonzentrat_Sk.md"),
]

PRINZIP_SOURCES = [
    ("mathe", FRAGENBEARBEITUNG / "_Glossar_Mathe_Schnellnachschlag.md"),
    ("sk",    FRAGENBEARBEITUNG / "_Glossar_Sk_Schnellnachschlag.md"),
]

OUTPUT_DIR = REPO_ROOT / "assets" / "data"


# --------------------------------------------------------------------------
# Slug-Helper
# --------------------------------------------------------------------------

_SLUG_RE = re.compile(r"[^a-z0-9]+")


def slugify(text: str) -> str:
    """Markdown-Heading -> URL-safe slug."""
    text = unicodedata.normalize("NFKD", text)
    text = text.encode("ascii", "ignore").decode("ascii")
    text = text.lower()
    text = _SLUG_RE.sub("-", text)
    return text.strip("-")


# --------------------------------------------------------------------------
# 1) parse_norm — *[KEY]: title-Pattern (mkdocs-hook-kompatibel)
# --------------------------------------------------------------------------

NORM_LINE_RE = re.compile(r"^\*\[(?P<key>[^\]]+)\]:\s*(?P<rest>.+)$")


def parse_norm(md_path: Path) -> dict:
    """Parst normen-glossar.md.

    Format pro Zeile:  *[KEY]: title — definition
    HTML-Kommentare `<!-- ... -->` werden uebersprungen.
    """
    entries: dict[str, dict] = {}
    if not md_path.exists():
        print(f"[parse_norm] WARN Quelle fehlt: {md_path}", file=sys.stderr)
        return entries

    for line in md_path.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("<!--") or stripped.startswith("-->"):
            continue

        m = NORM_LINE_RE.match(stripped)
        if not m:
            continue

        key = m.group("key").strip()
        rest = m.group("rest").strip()

        # Splitten "title — definition" am ersten em-dash (—)
        if " — " in rest:
            title, definition = rest.split(" — ", 1)
        elif " - " in rest and "§" not in rest.split(" - ", 1)[0]:
            # Fallback ASCII-Dash
            title, definition = rest.split(" - ", 1)
        else:
            title, definition = rest, ""

        entries[key] = {
            "key": key,
            "title": title.strip(),
            "definition": definition.strip(),
            "type": "norm",
        }

    return entries


# --------------------------------------------------------------------------
# 2) parse_lp — Heading-Tree-Walker auf Mathe/Sk-LP-Zitatkonzentrat
# --------------------------------------------------------------------------

# Hilfsregex
HEADING_RE = re.compile(r"^(#{2,4})\s+(.+?)\s*$")
KE_BLOCKQUOTE_RE = re.compile(r"^>\s*(?:_|\*\*?)?(?:[„\"])?(.+?)$")
KE_BULLET_RE = re.compile(r"^[-*]\s+(?:\*\*[^*]+:\*\*\s+)?(?:_|\*)?(?:[„\"])?(.+?)$")
INHALTE_RE = re.compile(r"^Inhalte\s*[:：]\s*(.+)$", re.IGNORECASE)
MARKIERUNGEN_RE = re.compile(r"^Markierungen\s*[:：]\s*(.+)$", re.IGNORECASE)

# Section-Header-Patterns (welche `## N. Title` zaehlen als LP-Quelle?)
LP_INCLUDE_SECTION_RE = re.compile(r"^##\s*([0-3])\.\s")  # nur §1–§3 enthalten LP-Wortlaute

# Heading-Inhalts-Erkennung
JGST_LB_RE = re.compile(
    r"^(?:####\s*)?"
    r"(?P<jgst>M\d{1,2}[RM]?|GPG\s*\d{1,2}|M\d|GPG\d{1,2})"
    r"\s*(?:LB|LB-|·\s*LB)\s*"
    r"(?P<lb>\d+(?:[\.\-]\d+)?)"
    r"(?:\s*\(R\s*/\s*M\)|\s+R|\s+M)?",
    re.IGNORECASE,
)


def _clean_ke_text(s: str) -> str:
    """Strippt Markdown-Markup, Pflichtanker-Sterne und Quellen-Backticks."""
    s = s.strip()
    # entferne `…` Backtick-Suffixe (Quellen-Annotationen)
    s = re.sub(r"\s*`[^`]*`\s*$", "", s)
    # entferne fuehrenden Pflichtanker `★ ` oder `★★ `
    s = re.sub(r"^★+\s*", "", s)
    # entferne fuehrende Bold-Praefixe wie `**Argumentieren:**` (Fachprofil-KE)
    s = re.sub(r"^\*\*[^*]+:?\*\*\s*", "", s)
    # entferne fuehrende italic-/underscore-Marker
    s = re.sub(r"^[_*]+", "", s)
    # entferne fuehrende deutsche oeffnende Anf. + leading-Quote-Reste
    s = re.sub(r"^[„\"]+", "", s)
    # entferne trailing italic-close markers (inkl. Anf.-Strich davor)
    s = re.sub(r"[„\"]?[_*]+\.?\s*$", "", s)
    # entferne trailing-Quotes
    s = re.sub(r"[„\"”“]+$", "", s)
    # Doppelte Spaces
    s = re.sub(r"\s+", " ", s).strip()
    # Trailing punctuation normalisieren
    s = s.rstrip(",;").strip()
    return s


_JGST_TOKEN_RE = re.compile(r"\b(M[5-9]M?|M10M?|M\d{1,2}R|GPG\s?\d{1,2}|GPG10)\b", re.IGNORECASE)
_LB_HEADING_RE = re.compile(
    r"^"
    r"(?:(?P<jgst>M\d{1,2}R?M?|GPG\s?\d{1,2})\s+)?"
    r"LB\s?(?P<lb>\d+(?:[\.\-]\d+)?)"
    r"\b",
    re.IGNORECASE,
)
_MATHE_SECTION_LB_RE = re.compile(r"^\d+\.\d+\s+LB\s?(?P<lb>\d+(?:\.\d+)?)\b", re.IGNORECASE)


def parse_lp(md_path: Path, fach: str) -> dict:
    """Parst Lehrplan-Zitatkonzentrat-MD und extrahiert KE-Cluster pro LB.

    Output-Slugs:
      m7r-lb1, m9r-lb3, m6-lb1-1, ...
      gpg7-lb4 (mit ke_liste-Eintraegen praefixiert [R]/[M])
      fp-mathe-2-7-... (Fachprofil-Anker)

    State-Machine: current_jgst wird aus den ## und ### Section-Headings
    abgeleitet, dann an LB-Sub-Headings vererbt.
    """
    entries: dict[str, dict] = {}
    if not md_path.exists():
        print(f"[parse_lp:{fach}] WARN Quelle fehlt: {md_path}", file=sys.stderr)
        return entries

    lines = md_path.read_text(encoding="utf-8").splitlines()

    # Section-Ranges (§1–§3 als Wortlaut-Zonen)
    section_starts = []
    for idx, line in enumerate(lines):
        m = re.match(r"^##\s+(\d+)\.\s+(.+?)\s*$", line)
        if m:
            section_starts.append((idx, int(m.group(1)), m.group(2)))
    section_starts.append((len(lines), 999, ""))

    include_ranges = []
    for i in range(len(section_starts) - 1):
        start_idx, num, _ = section_starts[i]
        end_idx, _, _ = section_starts[i + 1]
        if 1 <= num <= 4:  # §4 enthaelt M5/M6/M9R-LBs
            include_ranges.append((start_idx, end_idx))

    def in_include_range(idx: int) -> bool:
        return any(s <= idx < e for s, e in include_ranges)

    # State
    current_entry: dict | None = None
    current_slug: str | None = None
    variant: str | None = None        # 'r' | 'm' (Sk-R/M-Bullets)
    current_jgst: str | None = None   # vererbter Jgst-Context aus ## / ### Heading

    # Aus `## 3. Jahrgangsstufen-Zitate M7R Regelklasse …` extrahieren wir M7R
    # und nehmen ihn als Default fuer alle `### 3.X LBY …`-Sub-Sections.
    def extract_jgst_from_section(section_title: str) -> str | None:
        m = _JGST_TOKEN_RE.search(section_title)
        return m.group(1).replace(" ", "").upper() if m else None

    # Aus `### 4.1 M5 — Jgst. 5 Regelklasse (wörtlich)` extrahiere M5
    # Aus `### GPG5` extrahiere GPG5
    # Aus `### GPG7 (R / M)` extrahiere GPG7
    def extract_jgst_from_subsection(title: str) -> str | None:
        m = _JGST_TOKEN_RE.search(title)
        return m.group(1).replace(" ", "").upper() if m else None

    def flush():
        nonlocal current_entry, current_slug
        if current_slug and current_entry:
            # Nicht ueberschreiben falls Eintrag bereits mit KE-Listen befuellt
            if current_slug in entries and not current_entry["ke_liste"]:
                pass
            else:
                if current_slug in entries:
                    # mergen
                    entries[current_slug]["ke_liste"].extend(current_entry["ke_liste"])
                    if current_entry.get("inhalte"):
                        entries[current_slug]["inhalte"] = current_entry["inhalte"]
                    if current_entry.get("markierungen"):
                        entries[current_slug]["markierungen"] = current_entry["markierungen"]
                else:
                    entries[current_slug] = current_entry

    # Section-Tracker: bestimme bei jedem ## / ### Heading den aktuellen Jgst
    for idx, line in enumerate(lines):
        stripped = line.strip()

        # ## Section-Header (Top-Level)
        section_match = re.match(r"^##\s+(\d+)\.\s+(.+?)\s*$", stripped)
        if section_match:
            sec_num = int(section_match.group(1))
            sec_title = section_match.group(2)
            if sec_num == 3:
                # "## 3. Jahrgangsstufen-Zitate M7R Regelklasse..."
                current_jgst = extract_jgst_from_section(sec_title)
            elif sec_num == 4:
                current_jgst = None  # wird durch ### 4.X Sub gesetzt
            else:
                current_jgst = None
            continue

        if not in_include_range(idx):
            continue

        heading_match = HEADING_RE.match(stripped)
        if heading_match:
            level = len(heading_match.group(1))
            text = heading_match.group(2)
            stars = text.count("★")
            clean_text = text.replace("★", "").strip()

            # ### Sub-Section
            if level == 3:
                flush()
                current_entry = None
                current_slug = None
                variant = None

                # Setze Jgst aus Sub-Section-Titel
                new_jgst = extract_jgst_from_subsection(clean_text)
                if new_jgst:
                    current_jgst = new_jgst

                # Mathe-§3-Pattern: "### 3.1 LB1 — Prozentrechnung und Diagramme"
                mathe_section_lb = _MATHE_SECTION_LB_RE.match(clean_text)
                if mathe_section_lb and current_jgst:
                    lb_raw = mathe_section_lb.group("lb").replace(".", "-")
                    slug = f"{current_jgst.lower()}-lb{lb_raw}"
                    current_slug = slug
                    current_entry = entries.get(slug) or {
                        "key": f"{current_jgst} LB{lb_raw}",
                        "title": clean_text,
                        "fach": fach,
                        "jgst": current_jgst,
                        "lb": f"LB{lb_raw}",
                        "ke_liste": [],
                        "inhalte": "",
                        "markierungen": [],
                        "pflichtanker_level": stars,
                        "type": "lp",
                        "source": str(md_path.relative_to(VAULT_ROOT)),
                    }
                    continue

                # Fachprofil-Anker (### 2.7 Prozessbezogene Kompetenzen)
                fp_match = re.match(r"^(\d+\.\d+(?:\.\d+)?)\s+(.+)$", clean_text)
                if fp_match:
                    section_num = fp_match.group(1).replace(".", "-")
                    title_part = fp_match.group(2)
                    slug = f"fp-{fach}-{section_num}-{slugify(title_part)}"[:80]
                    current_slug = slug
                    current_entry = {
                        "key": f"Fachprofil {fach.upper()} §{fp_match.group(1)}",
                        "title": clean_text,
                        "fach": fach,
                        "jgst": "Fachprofil",
                        "lb": fp_match.group(1),
                        "ke_liste": [],
                        "inhalte": "",
                        "markierungen": [],
                        "pflichtanker_level": stars,
                        "type": "lp",
                        "source": str(md_path.relative_to(VAULT_ROOT)),
                    }
                    continue

                continue  # ### Heading ohne LB/FP — nur Jgst-Setter

            # #### LB-Heading
            if level == 4:
                flush()
                current_entry = None
                current_slug = None
                variant = None

                lb_match = _LB_HEADING_RE.match(clean_text)
                if lb_match:
                    explicit_jgst = lb_match.group("jgst")
                    jgst = (explicit_jgst or current_jgst or "").replace(" ", "").upper()
                    lb_raw = lb_match.group("lb").replace(".", "-")
                    if not jgst:
                        continue
                    slug = f"{jgst.lower()}-lb{lb_raw}"
                    current_slug = slug
                    if slug in entries:
                        current_entry = entries[slug]
                    else:
                        current_entry = {
                            "key": f"{jgst} LB{lb_raw}",
                            "title": clean_text,
                            "fach": fach,
                            "jgst": jgst,
                            "lb": f"LB{lb_raw}",
                            "ke_liste": [],
                            "inhalte": "",
                            "markierungen": [],
                            "pflichtanker_level": stars,
                            "type": "lp",
                            "source": str(md_path.relative_to(VAULT_ROOT)),
                        }
                    continue

        # **R:** / **M:**-Marker als eigenstaendige Zeile
        variant_marker = re.match(r"^\*\*(R|M)(?:\s*\([^)]*\))?\s*:?\*\*\s*$", stripped, re.IGNORECASE)
        if variant_marker and current_slug:
            variant = variant_marker.group(1).lower()
            continue

        if current_entry is not None:
            # Blockquote
            if stripped.startswith(">"):
                bq = KE_BLOCKQUOTE_RE.match(stripped)
                if bq:
                    ke = _clean_ke_text(bq.group(1))
                    if ke and len(ke) > 20:
                        tagged = f"[{variant.upper()}] {ke}" if variant else ke
                        current_entry["ke_liste"].append(tagged)
                    continue

            # Bullet
            bullet = KE_BULLET_RE.match(stripped)
            if bullet:
                ke = _clean_ke_text(bullet.group(1))
                if ke and len(ke) > 20:
                    tagged = f"[{variant.upper()}] {ke}" if variant else ke
                    current_entry["ke_liste"].append(tagged)
                continue

            inh = INHALTE_RE.match(stripped)
            if inh:
                current_entry["inhalte"] = inh.group(1).strip()
                continue
            mark = MARKIERUNGEN_RE.match(stripped)
            if mark:
                current_entry["markierungen"] = [
                    m.strip() for m in re.split(r"[·•,]", mark.group(1)) if m.strip()
                ]
                continue

    flush()
    return entries


# --------------------------------------------------------------------------
# 3) parse_prinzip — `### Begriff`-Section-Splitter
# --------------------------------------------------------------------------

PRINZIP_HEADING_RE = re.compile(r"^###\s+(.+?)\s*$")
QUELLE_BACKTICK_RE = re.compile(r"`\[([^\]]+)\]`")
BOLD_RE = re.compile(r"\*\*([^*]+)\*\*")


def parse_prinzip(md_path: Path, fach: str) -> dict:
    """Parst Schnellnachschlag-Glossar (Begriffsliste mit ### Headings).

    Nur Sections, die in `## A`–`## Z` (alphabetische Liste) liegen,
    werden geparst — Cluster/Phrasen/Lueckenlisten am Ende ausgeschlossen.
    """
    entries: dict[str, dict] = {}
    if not md_path.exists():
        print(f"[parse_prinzip:{fach}] WARN Quelle fehlt: {md_path}", file=sys.stderr)
        return entries

    text = md_path.read_text(encoding="utf-8")
    lines = text.splitlines()

    # Section-Header `## X` identifizieren — alle alphabetischen Buckets
    in_glossar_zone = False
    glossar_zone_lines: list[tuple[int, str]] = []  # (idx, line)
    for idx, line in enumerate(lines):
        section_m = re.match(r"^##\s+(.+?)\s*$", line)
        if section_m:
            section_text = section_m.group(1)
            # "## A — Alphabetische Begriffsliste" (Mathe) ODER
            # "## A" / "## B" / ... / "## Z" (Sk)
            # NICHT: "## B — Schnellabruf-Cluster" / "## Schnellabruf-Cluster" / "## C — Phrasen-Bausteine" / "## D — Lueckenliste" / "## E — Quellenkuerzel"
            header_letter = section_text.split()[0] if section_text.split() else ""
            is_single_letter = len(header_letter) == 1 and header_letter.isalpha() and header_letter.isupper()
            is_alphabet_header = section_text.startswith("A —") or (is_single_letter and "Cluster" not in section_text and "Phrasen" not in section_text and "Lueckenliste" not in section_text and "Quellenk" not in section_text)
            # Negative Filter
            if any(neg in section_text for neg in ("Cluster", "Phrasen-Baust", "Lueckenliste", "Lückenliste", "Quellenkürzel", "Quellenkurzel", "Schnellabruf")):
                in_glossar_zone = False
                continue
            in_glossar_zone = is_alphabet_header
            continue
        if in_glossar_zone:
            glossar_zone_lines.append((idx, line))

    # Section-Walker auf gefilterte Zeilen
    i = 0
    while i < len(glossar_zone_lines):
        _, line = glossar_zone_lines[i]
        h = PRINZIP_HEADING_RE.match(line.strip())
        if not h:
            i += 1
            continue

        heading_text = h.group(1).strip()
        # Sterne extrahieren
        stars = heading_text.count("★")
        title = heading_text.replace("★", "").strip()
        # Slug aus Heading-Text vor `—` oder `(` oder ` ★`
        key_text = re.split(r"\s+[—–\-]\s+|\s*\(", title, maxsplit=1)[0].strip()
        slug = slugify(key_text)
        if not slug:
            i += 1
            continue

        # Definition: alle Folgezeilen bis naechstem `### ` oder `---` oder Section-End
        def_lines = []
        j = i + 1
        while j < len(glossar_zone_lines):
            _, nxt = glossar_zone_lines[j]
            ns = nxt.strip()
            if ns.startswith("### ") or ns.startswith("## ") or ns == "---":
                break
            def_lines.append(nxt)
            j += 1

        raw_def = "\n".join(def_lines).strip()

        # Quellen extrahieren
        quellen = []
        for q_m in QUELLE_BACKTICK_RE.finditer(raw_def):
            for q in q_m.group(1).split(";"):
                qs = q.strip()
                if qs:
                    quellen.append(qs)
        # Quellen aus Definition entfernen
        clean_def = QUELLE_BACKTICK_RE.sub("", raw_def).strip()
        # Mehrfach-Whitespace
        clean_def = re.sub(r"\n{2,}", "\n\n", clean_def)

        # Cross-Refs aus **Bold**-Markern (heuristisch: in der Definition + `Vgl. **X**`)
        cross_raw = BOLD_RE.findall(clean_def)
        cross_refs = []
        for cr in cross_raw:
            cr_slug = slugify(cr)
            if cr_slug and cr_slug != slug and cr_slug not in cross_refs and len(cr_slug) >= 3:
                cross_refs.append(cr_slug)

        entries[slug] = {
            "key": key_text,
            "title": title,
            "fach": fach,
            "definition": clean_def,
            "quellen": list(dict.fromkeys(quellen)),  # de-dup, order-stable
            "pflichtanker_level": stars,
            "cross_refs": cross_refs[:8],  # cap auf 8
            "type": "prinzip",
        }

        i = j

    return entries


# --------------------------------------------------------------------------
# Main
# --------------------------------------------------------------------------


def write_json(path: Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(data, ensure_ascii=False, indent=2, sort_keys=True) + "\n",
        encoding="utf-8",
    )
    print(f"  -> {path.relative_to(REPO_ROOT)}  ({len(data)} Eintraege)")


def main() -> int:
    print("[build_glossare] Quellen-Audit ...")
    for name, path in (
        ("norm", NORM_SOURCE),
        *[(f"lp-{fach}", p) for fach, p in LP_SOURCES],
        *[(f"prinzip-{fach}", p) for fach, p in PRINZIP_SOURCES],
    ):
        exists = "OK " if path.exists() else "FAIL"
        print(f"  {exists}  {name:<14}  {path}")

    print()
    print("[build_glossare] Parsing ...")

    norm = parse_norm(NORM_SOURCE)

    lp_merged: dict[str, dict] = {}
    for fach, path in LP_SOURCES:
        for slug, entry in parse_lp(path, fach).items():
            if slug in lp_merged:
                slug = f"{slug}-{fach}"
            lp_merged[slug] = entry

    prinzip_merged: dict[str, dict] = {}
    for fach, path in PRINZIP_SOURCES:
        for slug, entry in parse_prinzip(path, fach).items():
            if slug in prinzip_merged:
                # Faecher-Cross-Listing erlauben, separate Eintraege
                slug = f"{slug}-{fach}"
            prinzip_merged[slug] = entry

    print()
    print("[build_glossare] Schreiben ...")
    write_json(OUTPUT_DIR / "glossar-norm.json", norm)
    write_json(OUTPUT_DIR / "glossar-lp.json", lp_merged)
    write_json(OUTPUT_DIR / "glossar-prinzip.json", prinzip_merged)

    print()
    print(f"[build_glossare] OK  norm={len(norm)}  lp={len(lp_merged)}  prinzip={len(prinzip_merged)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
