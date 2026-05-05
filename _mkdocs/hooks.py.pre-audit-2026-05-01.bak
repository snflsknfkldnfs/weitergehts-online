"""
hooks.py — mkdocs hook to wrap `§`/`Art.` patterns in <abbr> tags.

Background: python-markdown's `abbr` extension uses `\b...\b` regex which can
NOT match patterns starting with non-word chars like `§`. The standard abbr
glossar therefore covers patterns like `Art. 56/2` and `JuSchG § 1` but not
standalone `§ 12/3 MSO`, `§ 14/4 LDO`, `§ 23/2 BaySchO`, etc.

This hook fixes that by parsing the central glossar
(docs/includes/normen-glossar.md) for `*[KEY]: tooltip` definitions and
substituting matches in the page markdown with explicit `<abbr>` HTML, BEFORE
markdown processing.

Iter 12 — Hover-Coverage-Erweiterungen:
  (a) Multi-§-Pattern `§§ N/M(/L)*` → expandiere in einzelne `<abbr>`-Tags
      pro § mit Default-Norm-Suffix-Erkennung aus Kontext.
  (b) Slash-Liste Art. `Art. N1/N2/N3...` (≥3 Items) → einzelne Tooltips
      wenn Glossar-Defs existieren.
  (c) Tabellen-HTML-Cells: `<td>...</td>` und `<th>` werden NICHT mehr als
      Skip-Zone behandelt — innerer Markdown-Inhalt wird verarbeitet.
  (d) Auch Art./BV-Patterns ohne `§`-Prefix werden vom Hook gewrappt
      (vorher: nur abbr-Extension, die in HTML-Tabellen versagt).

Skip-Zonen: fenced code blocks, inline code, abbr-definitions, bestehende
<abbr>-Tags.
"""
from __future__ import annotations

import html
import re
from pathlib import Path

# Cache: parsed glossar abbrs (key → title), populated lazily
_ABBR_CACHE: dict[str, str] | None = None
_ABBR_PATTERN: re.Pattern | None = None
_ALL_KEYS_CACHE: dict[str, str] | None = None  # Auch nicht-§-Keys (Art./BV/Anker)


def _load_glossar(docs_dir: Path) -> tuple[dict[str, str], re.Pattern, dict[str, str]]:
    global _ABBR_CACHE, _ABBR_PATTERN, _ALL_KEYS_CACHE
    if _ABBR_CACHE is not None and _ABBR_PATTERN is not None and _ALL_KEYS_CACHE is not None:
        return _ABBR_CACHE, _ABBR_PATTERN, _ALL_KEYS_CACHE

    glossar_path = docs_dir / "includes" / "normen-glossar.md"
    abbrs: dict[str, str] = {}
    all_keys: dict[str, str] = {}
    if glossar_path.exists():
        for line in glossar_path.read_text(encoding="utf-8").splitlines():
            m = re.match(r"^\*\[(?P<key>[^\]]+)\]:\s*(?P<title>.*?)\s*$", line)
            if not m:
                continue
            key = m.group("key").strip()
            title = m.group("title").strip()
            all_keys[key] = title
            # Original behavior: only §-keys for the explicit hook-pass
            if key.startswith("§"):
                abbrs[key] = title

    keys = sorted(abbrs.keys(), key=len, reverse=True)
    if not keys:
        pattern = re.compile(r"(?!x)x")
    else:
        alts = []
        for k in keys:
            esc = re.escape(k)
            esc = re.sub(r"\\?\s+", r"\\s+", esc)
            alts.append(esc)
        pattern_str = r"(?<![A-Za-z0-9_§])(?:" + "|".join(alts) + r")(?![A-Za-z0-9_/])"
        pattern = re.compile(pattern_str)

    _ABBR_CACHE = abbrs
    _ABBR_PATTERN = pattern
    _ALL_KEYS_CACHE = all_keys
    return abbrs, pattern, all_keys


def _split_skip_zones(markdown: str) -> list[tuple[str, bool]]:
    """Split markdown into (segment, is_protected) tuples.

    Protected: fenced code blocks (``` ... ```).
    NICHT-protected (Iter 12): HTML-Tabellen-Cells — innerer Inhalt durchläuft.
    """
    out: list[tuple[str, bool]] = []
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


# ---------------------------------------------------------------------------
# Iter 12 — Multi-§-Expansion + Slash-Liste-Art-Expansion
# ---------------------------------------------------------------------------

# `§§ 8/9/11` oder `§§ 8 · 9 · 11` oder `§§ 8, 9 und 11`
def _break_abbr_match(s: str) -> str:
    """
    Ersetze normales Space durch NBSP (\\u00A0) im umschlossenen Schlüssel,
    damit python-markdown's abbr-Extension den Schlüssel im resultierenden
    HTML-<abbr>-Inhalt NICHT erneut matcht (würde sonst Doppel-Wrap erzeugen).
    Visuell identisch in Browsern.
    """
    return s.replace(" ", " ")


_RE_MULTI_PARA = re.compile(
    r"§§\s*"
    r"(?P<list>\d+[a-z]?(?:\s*[/·,]\s*(?:und\s+)?\d+[a-z]?)+)"
)

# `Art. 62/62a/63/73` (≥3 Items, sonst kollidiert mit Art. N/M = Abs.)
_RE_SLASH_ART = re.compile(
    r"\bArt\.\s*"
    r"(?P<list>\d+[a-z]?(?:/\d+[a-z]?){2,})"
)


def _detect_norm_suffix(context: str, before: bool = True) -> str:
    """
    Heuristik: Erkenne welche Norm (BaySchO/MSO/GrSO/...) aus dem Kontext gilt.
    `before=True`: schaue ~80 chars VOR der Multi-§-Stelle nach Norm-Hint.
    `before=False`: schaue ~30 chars NACH der Stelle.
    """
    norm_alts = ["BaySchO", "BayEUG", "MSO", "GrSO", "LDO", "BV", "GG", "DSGVO", "BayPrG", "SGB VIII", "SGB", "JuSchG", "KUG"]
    # context bereits vorgeschnitten — finde den letzten Vorkommen
    for n in norm_alts:
        if n in context:
            return n
    return ""


def _expand_multi_para(
    segment: str,
    abbrs_by_key: dict[str, str],
    all_keys: dict[str, str],
) -> str:
    """
    Findet `§§ N/M/L` und ersetzt durch `§§ <abbr>N</abbr>/<abbr>M</abbr>/...`
    wenn entsprechende Glossar-Defs (mit oder ohne Norm-Suffix) gefunden werden.
    """
    def _replace(m: re.Match) -> str:
        full = m.group(0)
        list_str = m.group("list")
        # Ermittele Norm-Suffix aus Kontext (vor + nach)
        s, e = m.start(), m.end()
        ctx_before = segment[max(0, s - 80):s]
        ctx_after = segment[e:min(len(segment), e + 50)]
        norm = _detect_norm_suffix(ctx_before) or _detect_norm_suffix(ctx_after)

        # Items splitten: Trenner / · ,
        items = re.split(r"\s*[/·,]\s*(?:und\s+)?", list_str)
        parts: list[str] = []
        for item in items:
            item = item.strip()
            if not item:
                continue
            candidates = [
                f"§ {item} {norm}".strip(),
                f"§ {item}",
                f"{norm} § {item}".strip(),
            ]
            title = None
            matched_key = None
            for c in candidates:
                c = c.strip()
                if c in abbrs_by_key:
                    title = abbrs_by_key[c]
                    matched_key = c
                    break
                if c in all_keys:
                    title = all_keys[c]
                    matched_key = c
                    break
            if title:
                parts.append(f'<abbr title="{html.escape(title, quote=True)}">{item}</abbr>')
            else:
                parts.append(item)

        # Re-assemble: keep original separator from list_str approximately
        # Detect dominant separator
        if "·" in list_str:
            sep = " · "
        elif "/" in list_str:
            sep = "/"
        else:
            sep = ", "
        return f"§§ {sep.join(parts)}"

    return _RE_MULTI_PARA.sub(_replace, segment)


def _expand_slash_art(
    segment: str,
    all_keys: dict[str, str],
) -> str:
    """
    Findet `Art. N1/N2/N3...` (≥3 Items) und ersetzt durch
    `Art. <abbr>N1</abbr>/<abbr>N2</abbr>/...`.
    """
    def _replace(m: re.Match) -> str:
        full = m.group(0)
        list_str = m.group("list")
        s, e = m.start(), m.end()
        ctx_before = segment[max(0, s - 80):s]
        ctx_after = segment[e:min(len(segment), e + 50)]
        norm = _detect_norm_suffix(ctx_before) or _detect_norm_suffix(ctx_after) or "BayEUG"

        items = list_str.split("/")
        parts: list[str] = []
        for item in items:
            item = item.strip()
            candidates = [
                f"Art. {item} {norm}".strip(),
                f"Art. {item}",
                f"{norm} Art. {item}".strip() if norm == "BV" else None,
            ]
            candidates = [c for c in candidates if c]
            title = None
            for c in candidates:
                if c in all_keys:
                    title = all_keys[c]
                    break
            if title:
                parts.append(f'<abbr title="{html.escape(title, quote=True)}">{item}</abbr>')
            else:
                parts.append(item)

        return f"Art. {'/'.join(parts)}"

    return _RE_SLASH_ART.sub(_replace, segment)


# ---------------------------------------------------------------------------
# Iter 12 — Single Art./BV mit Glossar-Lookup (Hook-Bug-Fix)
# ---------------------------------------------------------------------------

# `Art. 56`, `Art. 56/2`, `BV Art. 128`, `Art. 56 BayEUG`
_RE_SINGLE_ART = re.compile(
    r"(?P<full>(?:BV\s+)?Art\.\s*\d+[a-z]?(?:/\d+)?(?:\s+(?:BayEUG|BV|GG|DSGVO|BayPrG))?)"
)


def _wrap_single_art(segment: str, all_keys: dict[str, str]) -> str:
    """
    Wrappt einzelne Art.-Refs wenn Glossar-Def existiert. Original abbr-Ext
    funktioniert in HTML-Tabellen-Cells nicht zuverlässig.
    """
    def _replace(m: re.Match) -> str:
        full = m.group("full").strip()
        # Normalisiere whitespace
        norm_full = re.sub(r"\s+", " ", full)
        # Direkt-Match?
        if norm_full in all_keys:
            return f'<abbr title="{html.escape(all_keys[norm_full], quote=True)}">{full}</abbr>'
        # Trim Suffix-Norm
        trimmed = re.sub(
            r"\s+(BayEUG|BV|GG|DSGVO|BayPrG)$",
            "",
            norm_full,
        )
        if trimmed != norm_full and trimmed in all_keys:
            return f'<abbr title="{html.escape(all_keys[trimmed], quote=True)}">{full}</abbr>'
        return full

    return _RE_SINGLE_ART.sub(_replace, segment)


# ---------------------------------------------------------------------------
# Iter 12 — Anker-Phrasen (KMBek, Vorkurs Deutsch 240, DeutschPLUS, etc.)
# ---------------------------------------------------------------------------

# Single §-Pattern OHNE expliziten Norm-Suffix (sonst hätte abbrs.py-Pattern
# bereits gewrappt). Erlaubt Trenner: WS, ,, ·, /, (, ), <.
_NORM_SUFFIX_RE = r"\s+(?:BaySchO|MSO|GrSO|LDO|JuSchG|KUG|SGB(?:\s+VIII)?|DSGVO|KMBek|BayEUG|BayPrG)\b"
_RE_SINGLE_PARA_NO_SUFFIX = re.compile(
    r"(?<![A-Za-z0-9_§])(§\s*\d+[a-z]?(?:/\d+)?)"
    r"(?!" + _NORM_SUFFIX_RE + r")"
    r"(?!\d)(?!/\d)(?![A-Za-z0-9_])"
)
# Single Art.-Pattern OHNE Norm-Suffix
_RE_SINGLE_ART_NO_SUFFIX = re.compile(
    r"(?<![A-Za-z0-9_])(Art\.\s*\d+[a-z]?(?:/\d+)?)(?!\s+(?:BayEUG|BV|GG|DSGVO|BayPrG))(?![A-Za-z0-9_])"
)

NORM_HINTS_PARA = ["BaySchO", "MSO", "GrSO", "LDO", "JuSchG", "KUG", "SGB VIII"]
NORM_HINTS_ART = ["BayEUG", "BV", "GG", "DSGVO", "BayPrG"]


def _wrap_para_with_context(segment: str, all_keys: dict[str, str]) -> str:
    """Wrappe `§ N`/`§ N/M` ohne explizites Norm-Suffix unter Nutzung des
    letzten Norm-Hints im Kontext (vorhergehende ~120 Chars)."""

    def _replace(m: re.Match) -> str:
        full = m.group(0).strip()
        # Bereits in <abbr>? — placeholder enthalten? (sollte nicht durch stash bereits weg sein)
        s = m.start()
        ctx_before = segment[max(0, s - 200):s]
        # Letzter Norm-Hint
        norm = None
        for h in NORM_HINTS_PARA:
            idx = ctx_before.rfind(h)
            if idx > -1:
                if norm is None or idx > segment.rfind(norm, 0, s):
                    norm = h
        if not norm:
            return full

        # Kandidaten
        candidates = [
            f"{full} {norm}",
            f"{norm} {full}",
        ]
        for c in candidates:
            if c in all_keys:
                title = all_keys[c]
                return f'<abbr title="{html.escape(title, quote=True)}">{full}</abbr>'
        return full

    return _RE_SINGLE_PARA_NO_SUFFIX.sub(_replace, segment)


def _wrap_art_with_context(segment: str, all_keys: dict[str, str]) -> str:
    """Wrappe `Art. N`/`Art. N/M` ohne explizites Norm-Suffix unter Nutzung
    des letzten Norm-Hints im Kontext."""

    def _replace(m: re.Match) -> str:
        full = m.group(0).strip()
        # Direkt-Match ohne Suffix?
        if full in all_keys:
            title = all_keys[full]
            return f'<abbr title="{html.escape(title, quote=True)}">{full}</abbr>'
        s = m.start()
        ctx_before = segment[max(0, s - 200):s]
        norm = None
        last_pos = -1
        for h in NORM_HINTS_ART:
            idx = ctx_before.rfind(h)
            if idx > last_pos:
                last_pos = idx
                norm = h
        if not norm:
            # Default: BayEUG (überwiegend in Schulrecht)
            norm = "BayEUG"

        candidates = [
            f"{full} {norm}",
            f"{norm} {full}",
        ]
        for c in candidates:
            if c in all_keys:
                title = all_keys[c]
                return f'<abbr title="{html.escape(title, quote=True)}">{full}</abbr>'
        # Letzter Versuch: ohne Suffix-Lookup
        return full

    return _RE_SINGLE_ART_NO_SUFFIX.sub(_replace, segment)


def _wrap_anchors_phrase(segment: str, all_keys: dict[str, str]) -> str:
    """
    Wrappt mehrwortige/Zahlen-haltige Anker-Phrasen, die markdown-abbr-Extension
    nicht zuverlässig matcht (Vorkurs Deutsch 240, DeutschPLUS, etc.).
    Nimmt KEINE §/Art./BV-Keys (markdown-abbr macht die).
    """
    anchors: list[str] = []
    for k in all_keys:
        if k.startswith("§") or k.startswith("Art.") or k.startswith("BV "):
            continue
        # Mehrwortig ODER mit Zahl ODER mixed-case unique
        if " " in k or any(c.isdigit() for c in k) or len(k) >= 4:
            anchors.append(k)
    if not anchors:
        return segment
    anchors = sorted(set(anchors), key=len, reverse=True)
    pat = re.compile(
        r"(?<!\w)(" + "|".join(re.escape(a) for a in anchors) + r")(?!\w)"
    )

    def _replace(m: re.Match) -> str:
        key = m.group(1)
        title = all_keys.get(key)
        if not title:
            return key
        return f'<abbr title="{html.escape(title, quote=True)}">{_break_abbr_match(key)}</abbr>'

    return pat.sub(_replace, segment)


# ---------------------------------------------------------------------------
# Process segment
# ---------------------------------------------------------------------------

def _process_segment(
    segment: str,
    abbrs: dict[str, str],
    pattern: re.Pattern,
    all_keys: dict[str, str],
) -> str:
    """Substitute § / Art. / Anker patterns in a non-protected segment."""
    placeholders: list[str] = []

    def stash(m: re.Match) -> str:
        placeholders.append(m.group(0))
        return f"\x00PH{len(placeholders) - 1}\x00"

    # Inline code
    segment = re.sub(r"`[^`\n]+`", stash, segment)
    # Existing <abbr>-Tags (vermeide Doppel-Wrap)
    segment = re.sub(r"<abbr\b[^>]*>.*?</abbr>", stash, segment, flags=re.DOTALL)
    # Andere HTML-Tags (NICHT Inhalt) — Tags selbst stashen, nicht Inhalt
    # Achtung: stashen wir <td>...</td> als ganzes, ist Inhalt geschützt.
    # Iter 12: NUR die Tag-Klammern stashen, nicht den Inhalt.
    segment = re.sub(r"</?[a-zA-Z][^>]*>", stash, segment)
    # Abbr-Defs
    segment = re.sub(r"(?m)^\*\[[^\]]+\]:.*$", stash, segment)

    # 1) Multi-§ expandieren (vor Single-§)
    segment = _expand_multi_para(segment, abbrs, all_keys)
    # 2) Slash-Liste Art. expandieren (vor Single-Art)
    segment = _expand_slash_art(segment, all_keys)
    # 3) Single §-Patterns (existing logic)
    def wrap(m: re.Match) -> str:
        key = m.group(0)
        norm_key = re.sub(r"\s+", " ", key).strip()
        title = abbrs.get(norm_key) or abbrs.get(key)
        if not title:
            return key
        return f'<abbr title="{html.escape(title, quote=True)}">{_break_abbr_match(key)}</abbr>'

    segment = pattern.sub(wrap, segment)

    # Re-Stash neu erzeugte <abbr>-Tags, damit nachfolgende Steps sie nicht
    # matchen (Iter 12 — Doppel-Wrap-Schutz).
    segment = re.sub(r"<abbr\b[^>]*>.*?</abbr>", stash, segment, flags=re.DOTALL)

    # 3b) Single §/Art. mit Kontext-Norm-Disambiguation (Iter 12):
    #     bei `§ N` ohne Suffix → schau in den letzten 120 Chars nach
    #     letztem Norm-Hint (BaySchO/MSO/GrSO/...) und probiere
    #     `§ N <Hint>`-Lookup im all_keys. Das deckt Listen-Cells in
    #     Tabellen ab (z.B. `MSO § 6 · § 7 · § 8 · § 22`).
    segment = _wrap_para_with_context(segment, all_keys)
    segment = _wrap_art_with_context(segment, all_keys)

    # Re-Stash auch die kontext-disambiguierten Wraps
    segment = re.sub(r"<abbr\b[^>]*>.*?</abbr>", stash, segment, flags=re.DOTALL)

    # NB: Single Art./BV → markdown-abbr-Extension übernimmt diese, KEIN
    # eigenes Wrap (sonst Doppel-Wrap, weil markdown-abbr nach diesem Hook läuft).

    # 4) Anker-Phrasen — markdown-abbr-Extension matcht word-boundary-Anker
    #    bei Mehrwort-Phrasen NICHT zuverlässig (z.B. "Vorkurs Deutsch 240"
    #    enthält Zahlen, abbr-Ext stoppt). Daher hier Hook-Wrap NUR für
    #    Phrasen mit Whitespace + Zahlen.
    segment = _wrap_anchors_phrase(segment, all_keys)

    # Restore placeholders
    def restore(m: re.Match) -> str:
        idx = int(m.group(1))
        return placeholders[idx]

    segment = re.sub(r"\x00PH(\d+)\x00", restore, segment)
    return segment


def _dedupe_nested_abbr(html_content: str) -> str:
    """
    Entferne verschachtelte <abbr><abbr>...</abbr></abbr>-Konstrukte, die
    durch python-markdown abbr-Extension entstehen, wenn überlappende Keys
    (z.B. `Art. 56` UND `Art. 56/2`) im Glossar definiert sind.
    Behalte den INNEREN Tooltip (spezifischer).
    """
    pat = re.compile(
        r'<abbr\s+title=(?P<oq>["\'])(?P<outer>[^"\']*)(?P=oq)>'
        r'<abbr\s+title=(?P<iq>["\'])(?P<inner>[^"\']*)(?P=iq)>'
        r'(?P<content>[^<]*)</abbr></abbr>',
        re.DOTALL,
    )
    # 2-fach durchlaufen (kann mehrfach verschachtelt sein)
    def _sub(m):
        # Bevorzuge den INNEREN Tooltip (meist spezifischer, mein Hook setzt
        # ihn). Falls beide identisch, nehme einen.
        return (f'<abbr title="{m.group("inner")}">'
                f'{m.group("content")}</abbr>')

    for _ in range(3):
        new = pat.sub(_sub, html_content)
        if new == html_content:
            break
        html_content = new
    return html_content


def on_page_content(html: str, page=None, config=None, files=None, **kwargs):
    """Post-markdown Hook: entferne Nested-<abbr>-Doppel-Wraps."""
    return _dedupe_nested_abbr(html)


def on_page_markdown(markdown: str, page=None, config=None, files=None, **kwargs):
    """mkdocs hook: pre-process markdown to wrap §/Art./Anker-patterns."""
    if config is None:
        return markdown
    docs_dir = Path(config.get("docs_dir", "docs"))
    abbrs, pattern, all_keys = _load_glossar(docs_dir)
    if not abbrs and not all_keys:
        return markdown
    parts = _split_skip_zones(markdown)
    out = []
    for seg, protected in parts:
        if protected:
            out.append(seg)
        else:
            out.append(_process_segment(seg, abbrs, pattern, all_keys))
    return "".join(out)
