"""
hooks.py — mkdocs hook to wrap `§ XYZ` patterns in <abbr> tags.

Background: python-markdown's `abbr` extension uses `\b...\b` regex which can
NOT match patterns starting with non-word chars like `§`. The standard abbr
glossar therefore covers patterns like `Art. 56/2` and `JuSchG § 1` but not
standalone `§ 12/3 MSO`, `§ 14/4 LDO`, `§ 23/2 BaySchO`, etc.

This hook fixes that by parsing the central glossar
(docs/includes/normen-glossar.md) for `*[§ ...]: tooltip` definitions and
substituting matches in the page markdown with explicit `<abbr>` HTML, BEFORE
markdown processing. Skip zones: fenced code blocks, inline code, HTML
admonition headers, mermaid blocks, abbr-definitions themselves.
"""
from __future__ import annotations

import html
import re
from pathlib import Path

# Cache: parsed glossar abbrs (key → title), populated lazily
_ABBR_CACHE: dict[str, str] | None = None
_ABBR_PATTERN: re.Pattern | None = None


def _load_glossar(docs_dir: Path) -> tuple[dict[str, str], re.Pattern]:
    global _ABBR_CACHE, _ABBR_PATTERN
    if _ABBR_CACHE is not None and _ABBR_PATTERN is not None:
        return _ABBR_CACHE, _ABBR_PATTERN

    glossar_path = docs_dir / "includes" / "normen-glossar.md"
    abbrs: dict[str, str] = {}
    if glossar_path.exists():
        for line in glossar_path.read_text(encoding="utf-8").splitlines():
            # Match *[KEY]: TITLE
            m = re.match(r"^\*\[(?P<key>[^\]]+)\]:\s*(?P<title>.*?)\s*$", line)
            if not m:
                continue
            key = m.group("key").strip()
            title = m.group("title").strip()
            # Only keep §-leading patterns (those the abbr extension can't handle).
            if key.startswith("§"):
                abbrs[key] = title

    # Build regex: longest-match-first, escape literal §, allow flexible whitespace
    keys = sorted(abbrs.keys(), key=len, reverse=True)
    if not keys:
        pattern = re.compile(r"(?!x)x")  # never-match
    else:
        # Replace literal whitespace runs with \s+ for tolerance
        alts = []
        for k in keys:
            esc = re.escape(k)
            esc = re.sub(r"\\?\s+", r"\\s+", esc)  # any whitespace
            alts.append(esc)
        # Boundary on the right ensures `§ 12` doesn't swallow into `§ 123`.
        # No left boundary needed (non-word char anyway), but require preceding
        # non-word-char OR start-of-string to avoid mid-word matches.
        pattern_str = r"(?<![A-Za-z0-9_§])(?:" + "|".join(alts) + r")(?![A-Za-z0-9_/])"
        pattern = re.compile(pattern_str)

    _ABBR_CACHE = abbrs
    _ABBR_PATTERN = pattern
    return abbrs, pattern


def _split_skip_zones(markdown: str) -> list[tuple[str, bool]]:
    """Split markdown into (segment, is_protected) tuples.

    Protected segments (no substitution): fenced code blocks, inline code,
    HTML tags, abbr definition lines.
    """
    out: list[tuple[str, bool]] = []
    # Fenced code blocks (``` ... ```), including ```mermaid
    fence_re = re.compile(r"```.*?```", re.DOTALL)
    pos = 0
    for m in fence_re.finditer(markdown):
        if m.start() > pos:
            out.append((markdown[pos : m.start()], False))
        out.append((m.group(0), True))
        pos = m.end()
    if pos < len(markdown):
        out.append((markdown[pos:], False))
    return out


def _process_segment(segment: str, abbrs: dict[str, str], pattern: re.Pattern) -> str:
    """Substitute § patterns in a non-protected segment."""
    # Protect inline code spans `...` and existing <abbr> tags.
    placeholders: list[str] = []

    def stash(m: re.Match) -> str:
        placeholders.append(m.group(0))
        return f"\x00PH{len(placeholders) - 1}\x00"

    # Inline code
    segment = re.sub(r"`[^`\n]+`", stash, segment)
    # Existing HTML tags (incl. abbr)
    segment = re.sub(r"<[^>]+>", stash, segment)
    # Abbr definition lines (`*[X]: Y`)
    segment = re.sub(r"(?m)^\*\[[^\]]+\]:.*$", stash, segment)

    # Now substitute § patterns
    def wrap(m: re.Match) -> str:
        key = m.group(0)
        # Normalize whitespace to single space for lookup
        norm_key = re.sub(r"\s+", " ", key).strip()
        title = abbrs.get(norm_key)
        if not title:
            # Try matching original key directly
            title = abbrs.get(key)
        if not title:
            return key
        return f'<abbr title="{html.escape(title, quote=True)}">{key}</abbr>'

    segment = pattern.sub(wrap, segment)

    # Restore placeholders
    def restore(m: re.Match) -> str:
        idx = int(m.group(1))
        return placeholders[idx]

    segment = re.sub(r"\x00PH(\d+)\x00", restore, segment)
    return segment


def on_page_markdown(markdown: str, page=None, config=None, files=None, **kwargs):
    """mkdocs hook: pre-process markdown to wrap §-patterns."""
    if config is None:
        return markdown
    docs_dir = Path(config.get("docs_dir", "docs"))
    abbrs, pattern = _load_glossar(docs_dir)
    if not abbrs:
        return markdown
    parts = _split_skip_zones(markdown)
    out = []
    for seg, protected in parts:
        if protected:
            out.append(seg)
        else:
            out.append(_process_segment(seg, abbrs, pattern))
    return "".join(out)
