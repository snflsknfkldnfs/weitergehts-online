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
import json
import re
from pathlib import Path

# Cache: parsed glossar abbrs (key → title), populated lazily
_ABBR_CACHE: dict[str, str] | None = None
_ABBR_PATTERN: re.Pattern | None = None
_ALL_KEYS_CACHE: dict[str, str] | None = None  # Auch nicht-§-Keys (Art./BV/Anker)
_NORM_URLS_CACHE: dict[str, str] | None = None  # KEY → URL aus norm_urls.json


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
    r"(?P<list>\d+[a-z]?"
    r"(?:\s*(?:\([^)]+\)\s*)?[/·,]\s*(?:und\s+)?\d+[a-z]?)+)"
)

# pre-track2-2026-05-05: `§§ N ff.` (offene Folge) — wrappe nur das erste §
_RE_FF_PARA = re.compile(
    r"§§\s*"
    r"(?P<num>\d+[a-z]?)"
    r"\s*ff\."
)

# pre-track2-2026-05-05: `§§ N–M` / `§§ N-M` (Range mit em-/en-dash oder Bindestrich) —
# wrappe Start- und End-§. Match auch reine `§§ 33–48` ohne weitere Trenner.
_RE_RANGE_PARA = re.compile(
    r"§§\s*"
    r"(?P<from>\d+[a-z]?)"
    r"\s*[–\-]\s*"
    r"(?P<to>\d+[a-z]?)"
    r"(?![/·,\d])"
)

# pre-track2-2026-05-05: `§ N/M/L` (≥2 slash-Items) für single-§ Slash-Listen,
# z.B. `MSO § 6/7/8`. Single-§ mit ≥2 slash-Trennern.
_RE_SLASH_PARA = re.compile(
    r"(?<![A-Za-z0-9_§])§\s*"
    r"(?P<list>\d+[a-z]?(?:/\d+[a-z]?){2,})"
    r"(?![/\d])"
)

# `Art. 62/62a/63/73` (≥3 Items, sonst kollidiert mit Art. N/M = Abs.)
_RE_SLASH_ART = re.compile(
    r"\bArt\.\s*"
    r"(?P<list>\d+[a-z]?(?:/\d+[a-z]?){2,})"
)

# pre-audit-2026-05-01: Bullet-Art-Listen `Art. 6/4 · 19 · 20 · 21 · 30a · 31/3 · 41 · 60 · 78`
# (≥2 Items, ·-getrennt). Items: N | N/M | Na | Na/M.
# Pflicht: mindestens ein `·` als Trenner, sonst greift _RE_SINGLE_ART.
_RE_BULLET_ART = re.compile(
    r"\bArt\.\s*"
    r"(?P<list>\d+[a-z]?(?:/\d+[a-z]?)?"
    r"(?:\s*·\s*\d+[a-z]?(?:/\d+[a-z]?)?)+)"
)


def _detect_norm_suffix(context: str, before: bool = True) -> str:
    """
    Heuristik: Erkenne welche Norm (BaySchO/MSO/GrSO/...) aus dem Kontext gilt.
    `before=True`: schaue ~80 chars VOR der Multi-§-Stelle nach Norm-Hint.
    `before=False`: schaue ~30 chars NACH der Stelle.
    """
    norm_alts = ["BaySchO", "BayEUG", "MSO", "GrSO", "LDO", "BV", "GG", "DSGVO", "BayPrG", "SGB VIII", "SGB", "JuSchG", "KUG", "BeamtStG", "BayBG", "BayDG", "BayLBG", "BayPVG", "StGB", "BGB"]
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

        # pre-track2-2026-05-05: erlaube Klammer-Annotationen `6 (Gelenkklasse)`
        # zwischen Item und Trenner. Token-basiert splitten, um Annotations zu erhalten.
        # Token-Pattern: `<num>[a-z]? (annotation)?` getrennt durch /, ·, ,.
        token_re = re.compile(
            r"(?P<num>\d+[a-z]?)"
            r"(?P<ann>\s*\([^)]+\))?"
            r"(?P<sep>\s*(?:[/·,]\s*(?:und\s+)?)?)"
        )
        out_parts: list[str] = []
        any_token = False
        for tm in token_re.finditer(list_str):
            num = tm.group("num")
            ann = tm.group("ann") or ""
            sep_token = tm.group("sep") or ""
            if not num:
                continue
            any_token = True
            # pre-disambig-2026-05-06: suffixed-priority Lookup
            candidates = [
                f"§ {num} {norm}".strip() if norm else None,
                f"{norm} § {num}".strip() if norm else None,
                f"§ {num}",
            ]
            candidates = [c for c in candidates if c]
            title = None
            for c in candidates:
                c = c.strip()
                if c in abbrs_by_key:
                    title = abbrs_by_key[c]
                    break
                if c in all_keys:
                    title = all_keys[c]
                    break
            if title:
                wrapped = (f'<abbr title="{html.escape(title, quote=True)}">{num}</abbr>')
            else:
                wrapped = num
            out_parts.append(f"{wrapped}{ann}{sep_token}")
        if not any_token:
            return m.group(0)
        return "§§ " + "".join(out_parts)

    return _RE_MULTI_PARA.sub(_replace, segment)


def _lookup_para(item: str, norm: str, abbrs_by_key: dict[str, str], all_keys: dict[str, str]) -> str | None:
    """Helper: try multiple candidate keys for a §-item under norm-context.

    pre-disambig-2026-05-06: Lookup-Reihenfolge **suffixed > bare** ist hier
    erzwungen — `§ N <NORM>` bzw. `<NORM> § N` haben Vorrang vor bare `§ N`.
    Damit bekommen mehrdeutige §§ wie § 16 (LDO/BaySchO) oder § 22 (LDO/MSO/
    BaySchO/SGB VIII) bei vorhandenem Norm-Kontext den korrekten Tooltip.
    """
    candidates = [
        # 1. PRIORITÄT: norm-suffixed (eindeutig)
        f"§ {item} {norm}".strip() if norm else None,
        f"{norm} § {item}".strip() if norm else None,
        # 2. FALLBACK: bare-key (nur wenn keine suffixed-Version existiert)
        f"§ {item}",
    ]
    candidates = [c for c in candidates if c]
    for c in candidates:
        c = c.strip()
        if c in abbrs_by_key:
            return abbrs_by_key[c]
        if c in all_keys:
            return all_keys[c]
    return None


def _expand_ff_para(
    segment: str,
    abbrs_by_key: dict[str, str],
    all_keys: dict[str, str],
) -> str:
    """
    pre-track2-2026-05-05: `§§ N ff.` → `§§ <abbr>N</abbr> ff.` (single number wrap).
    Norm aus Kontext (vor + nach).
    """
    def _replace(m: re.Match) -> str:
        num = m.group("num")
        s, e = m.start(), m.end()
        ctx_before = segment[max(0, s - 80):s]
        ctx_after = segment[e:min(len(segment), e + 50)]
        norm = _detect_norm_suffix(ctx_before) or _detect_norm_suffix(ctx_after)
        title = _lookup_para(num, norm, abbrs_by_key, all_keys)
        if title:
            wrapped = f'<abbr title="{html.escape(title, quote=True)}">{num}</abbr>'
            return f"§§ {wrapped} ff."
        return m.group(0)
    return _RE_FF_PARA.sub(_replace, segment)


def _expand_range_para(
    segment: str,
    abbrs_by_key: dict[str, str],
    all_keys: dict[str, str],
) -> str:
    """
    pre-track2-2026-05-05: `§§ N–M` → `§§ <abbr>N</abbr>–<abbr>M</abbr>` (boundary-§ wrap).
    Norm aus Kontext (vor + nach).
    """
    def _replace(m: re.Match) -> str:
        a, b = m.group("from"), m.group("to")
        s, e = m.start(), m.end()
        sep_match = re.search(r"[–\-]", m.group(0))
        sep = sep_match.group(0) if sep_match else "–"
        ctx_before = segment[max(0, s - 80):s]
        ctx_after = segment[e:min(len(segment), e + 50)]
        norm = _detect_norm_suffix(ctx_before) or _detect_norm_suffix(ctx_after)
        title_a = _lookup_para(a, norm, abbrs_by_key, all_keys)
        title_b = _lookup_para(b, norm, abbrs_by_key, all_keys)
        out_a = (f'<abbr title="{html.escape(title_a, quote=True)}">{a}</abbr>'
                 if title_a else a)
        out_b = (f'<abbr title="{html.escape(title_b, quote=True)}">{b}</abbr>'
                 if title_b else b)
        return f"§§ {out_a}{sep}{out_b}"
    return _RE_RANGE_PARA.sub(_replace, segment)


def _expand_slash_para(
    segment: str,
    abbrs_by_key: dict[str, str],
    all_keys: dict[str, str],
) -> str:
    """
    pre-track2-2026-05-05: `§ N/M/L` (≥2 slash-Items) → einzelne <abbr>-Wraps.
    Beispiel: `MSO § 6/7/8` → `MSO § <abbr>6</abbr>/<abbr>7</abbr>/<abbr>8</abbr>`.
    Norm aus Kontext (vor).
    """
    def _replace(m: re.Match) -> str:
        list_str = m.group("list")
        s, e = m.start(), m.end()
        ctx_before = segment[max(0, s - 80):s]
        ctx_after = segment[e:min(len(segment), e + 50)]
        norm = _detect_norm_suffix(ctx_before) or _detect_norm_suffix(ctx_after)

        items = list_str.split("/")
        parts: list[str] = []
        for item in items:
            item = item.strip()
            title = _lookup_para(item, norm, abbrs_by_key, all_keys)
            if title:
                parts.append(f'<abbr title="{html.escape(title, quote=True)}">{item}</abbr>')
            else:
                parts.append(item)
        return f"§ {'/'.join(parts)}"

    return _RE_SLASH_PARA.sub(_replace, segment)


def _expand_bullet_art(
    segment: str,
    all_keys: dict[str, str],
) -> str:
    """
    pre-audit-2026-05-01: Findet `Art. N1 · N2 · N3...` (≥2 Items, ·-Trenner) und
    wrapt jedes Item einzeln in `<abbr>` mit Glossar-Lookup. Norm-Default: BayEUG
    (Kontext „BayEUG"-Header dominiert in MP_08-Tabellen).
    """
    def _replace(m: re.Match) -> str:
        list_str = m.group("list")
        s, e = m.start(), m.end()
        ctx_before = segment[max(0, s - 200):s]
        ctx_after = segment[e:min(len(segment), e + 80)]
        norm = _detect_norm_suffix(ctx_before) or _detect_norm_suffix(ctx_after) or "BayEUG"

        # Items splitten: nur ·
        items = re.split(r"\s*·\s*", list_str)
        parts: list[str] = []
        for item in items:
            item = item.strip()
            if not item:
                continue
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

        return f"Art. {' · '.join(parts)}"

    return _RE_BULLET_ART.sub(_replace, segment)


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
    # pre-track2-2026-05-05: Re-Stash nach Multi-§-Expansion, damit nachfolgende
    # Single-§-Substitutionen NICHT in die title-Attribute der frisch gewrappten
    # <abbr>-Tags reinpatchen (Doppel-Wrap-Bug bei `LDO §§ 2 · 3 · 4 · ...`).
    segment = re.sub(r"<abbr\b[^>]*>.*?</abbr>", stash, segment, flags=re.DOTALL)
    # 1b) pre-track2-2026-05-05: ff.-Suffix `§§ N ff.`
    segment = _expand_ff_para(segment, abbrs, all_keys)
    segment = re.sub(r"<abbr\b[^>]*>.*?</abbr>", stash, segment, flags=re.DOTALL)
    # 1c) pre-track2-2026-05-05: Range `§§ N–M`
    segment = _expand_range_para(segment, abbrs, all_keys)
    segment = re.sub(r"<abbr\b[^>]*>.*?</abbr>", stash, segment, flags=re.DOTALL)
    # 1d) pre-track2-2026-05-05: Slash-§ `§ N/M/L` (≥2 Items)
    segment = _expand_slash_para(segment, abbrs, all_keys)
    segment = re.sub(r"<abbr\b[^>]*>.*?</abbr>", stash, segment, flags=re.DOTALL)
    # 2a) pre-audit-2026-05-01: Bullet-Art-Listen `Art. N · M · L` (·-Trenner, ≥2 Items)
    #     vor Slash-Variante, damit gemischte Patterns wie `Art. 6/4 · 19` greifen.
    segment = _expand_bullet_art(segment, all_keys)
    segment = re.sub(r"<abbr\b[^>]*>.*?</abbr>", stash, segment, flags=re.DOTALL)
    # 2b) Slash-Liste Art. expandieren (vor Single-Art)
    segment = _expand_slash_art(segment, all_keys)
    segment = re.sub(r"<abbr\b[^>]*>.*?</abbr>", stash, segment, flags=re.DOTALL)
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


def _load_norm_urls(config_dir: Path) -> dict[str, str]:
    """Lade norm_urls.json (KEY → URL-Mapping). Cached."""
    global _NORM_URLS_CACHE
    if _NORM_URLS_CACHE is not None:
        return _NORM_URLS_CACHE
    candidates = [
        config_dir / "norm_urls.json",
        config_dir.parent / "norm_urls.json",
    ]
    for p in candidates:
        if p.exists():
            try:
                _NORM_URLS_CACHE = json.loads(p.read_text(encoding="utf-8"))
                return _NORM_URLS_CACHE
            except Exception:
                pass
    _NORM_URLS_CACHE = {}
    return _NORM_URLS_CACHE


# pre-disambig-2026-05-06: Match-Pattern OHNE `(?<!>)`-Lookbehind, der
# fälschlich `<strong><abbr>...</abbr></strong>` und ähnliche Inline-Tag-
# Verschachtelungen blockierte. Stattdessen prüfen wir direkt im _replace,
# ob das <abbr> bereits in einem <a>-Tag steht (per Kontext-Check).
_ABBR_HTML_RE = re.compile(
    r'<abbr\s+title=(?P<q>["\'])(?P<title>[^"\']*)(?P=q)>(?P<label>[^<]+)</abbr>'
)
# Pattern: matche bereits-gewrappte `<a ...><abbr ...>...</abbr></a>` für Skip
_LINKED_ABBR_RE = re.compile(
    r'<a\s+[^>]*norm-link[^>]*>\s*<abbr\b[^>]*>[^<]*</abbr>\s*</a>'
)


def _normalize_label(label: str) -> str:
    """Whitespace-normalisierung für URL-Lookup."""
    return re.sub(r"\s+", " ", html.unescape(label)).strip()


def _wrap_abbr_with_link(html_content: str, urls: dict[str, str]) -> str:
    """
    Pre-render Hook (Post-Markdown): umschließe jedes <abbr title="...">LABEL</abbr>
    mit <a class="norm-link" href="URL" target="_blank" rel="noopener">...</a>,
    sofern norm_urls.json eine URL für LABEL kennt.

    LABEL-Lookup: probiere LABEL direkt + LABEL-Varianten (mit/ohne Norm-Suffix
    aus title-Attribut).
    """
    if not urls:
        return html_content

    def _replace(m: re.Match) -> str:
        # pre-disambig-2026-05-06: Doppelwrap-Schutz — wenn unmittelbar vor
        # dem <abbr> ein offenes `<a class="norm-link"`-Tag steht, skip.
        s = m.start()
        # Schaue 80 Zeichen davor nach `<a class="norm-link"`
        ctx_before = html_content[max(0, s - 80):s]
        last_open_a = ctx_before.rfind("<a ")
        if last_open_a > -1:
            close_after_a = ctx_before.find("</a>", last_open_a)
            close_self_a = ctx_before.find(">", last_open_a)
            # Wir sind innerhalb eines noch offenen <a>-Tags wenn:
            # - es ein `<a ` gibt
            # - kein `</a>` zwischen `<a >` und unserer Position
            # Idempotent: bei `<a class="norm-link"...>` bleiben wir hier.
            if close_after_a == -1 and "norm-link" in ctx_before[last_open_a:]:
                return m.group(0)

        label = m.group("label")
        title = html.unescape(m.group("title"))
        norm_label = _normalize_label(label)

        # Direkt-Lookup
        url = urls.get(norm_label)

        # Title-Parsing: Format meist 'LDO § 14 — ...' / 'BayEUG Art. 56 — ...'
        # / 'LDO § 14 Abs. 4 — ...' / 'BayEUG Art. 56 Abs. 2 — ...'
        title_abk: str | None = None
        title_para_or_art: str | None = None
        t_match = re.match(
            r"^(?P<abk>[A-Za-zÄÖÜä-üß]+(?:\s+VIII)?)\s+"
            r"(?P<para>(?:§|Art\.)\s*\d+[a-z]?(?:/\d+)?)"
            r"(?:\s+(?:Abs\.\s*\d+))?",
            title,
        )
        if t_match:
            title_abk = t_match.group("abk").strip()
            title_para_or_art = t_match.group("para").strip()

        if not url and title_abk and title_para_or_art:
            # Probiere "<para> <abk>" und "<abk> <para>"
            for cand in (
                f"{title_para_or_art} {title_abk}",
                f"{title_abk} {title_para_or_art}",
                title_para_or_art,
            ):
                cand = " ".join(cand.split())
                if cand in urls:
                    url = urls[cand]
                    break
        if not url and title_abk:
            # Fallback Norm-Wurzel
            if title_abk in urls:
                url = urls[title_abk]

        if not url:
            # Letzter Versuch: title beginnt mit Norm-Abk (z.B. "BayEUG ..." → BayEUG)
            first_word = title.split()[0] if title else ""
            if first_word and first_word in urls:
                url = urls[first_word]

        if not url:
            return m.group(0)  # nichts ändern

        # Escape URL für HTML
        url_esc = html.escape(url, quote=True)
        return (
            f'<a class="norm-link" href="{url_esc}" target="_blank" rel="noopener">'
            f'{m.group(0)}</a>'
        )

    return _ABBR_HTML_RE.sub(_replace, html_content)


def on_page_content(html: str, page=None, config=None, files=None, **kwargs):
    """Post-markdown Hook:
    1) entferne Nested-<abbr>-Doppel-Wraps
    2) umschließe <abbr>-Tags mit <a>-Tag zu Gesetze-Quelle (norm_urls.json)
    3) Skript-Redesign V2: Top-8 Reveal-Wrap + Falle-Atlas Konsolidierung
    """
    html = _dedupe_nested_abbr(html)
    if config is not None:
        docs_dir = Path(config.get("docs_dir", "docs"))
        # norm_urls.json liegt typischerweise im _mkdocs/-Ordner (parent von docs/)
        config_dir = docs_dir.parent if docs_dir.name == "docs" else docs_dir
        urls = _load_norm_urls(config_dir)
        html = _wrap_abbr_with_link(html, urls)

    # Skript-Redesign V2 Passes (idempotent, schalten sich nur in passenden Sections ein)
    html = wrap_top8_reveal(html)
    html = consolidate_falle_atlas(html)
    return html


# ---------------------------------------------------------------------------
# Skript-Redesign V2 (handoff-skript-design-v2) — Section-Kind + Status-Stamp
# ---------------------------------------------------------------------------

# H1/H2-Titel -> Section-Kind (für CSS-Reorder via flex order)
SECTION_KINDS = (
    ("In aller Kürze",       "kurz"),
    ("Norm-Kartografie",     "karto"),
    ("Teil A",               "stoff"),
    ("Teil B",               "pflicht"),
    ("Teil C",               "fallen"),
    ("Teil D",               "faelle"),
    ("Querverweise",         "meta"),
    ("Quellen",              "meta"),
)

_RE_HEADING_H1H2 = re.compile(r"^(?P<lvl>#{1,2})\s+(?P<title>.+?)\s*$", re.M)
# Sub-Block: H2-Heading mit Anker-Pattern A.1 / B.2 / C.3 etc.
_RE_HEADING_SUBBLOCK_H2 = re.compile(
    r"^(?P<lvl>##)\s+(?P<ref>[A-Z]\.\d+)\s+(?P<title>.+?)\s*$", re.M
)


def _slugify(text: str) -> str:
    s = re.sub(r"[^A-Za-z0-9]+", "-", text.lower()).strip("-")
    return s or "section"


def stamp_section_kinds(markdown: str) -> str:
    """Tagged jede H1/H2 mit {.section-kind-X} attr_list, wenn der Titel
    einem der bekannten Section-Kind-Präfixe matcht. Für CSS-Reorder."""
    def repl(m):
        lvl = m.group("lvl")
        title = m.group("title").strip()
        # Skip wenn bereits attr_list im Titel
        if title.endswith("}"):
            return m.group(0)
        kind = None
        for prefix, k in SECTION_KINDS:
            if title.startswith(prefix):
                kind = k
                break
        if not kind:
            return m.group(0)
        return f"{lvl} {title} {{.section-kind-{kind}}}"
    return _RE_HEADING_H1H2.sub(repl, markdown)


def stamp_subblock_status(markdown: str, page_slug: str) -> str:
    """Hängt an jede Sub-Block-H2 (Pattern: ## A.1 …, ## B.2 …) ein
    {data-status-key="<page>.<sub>"} attr_list für die Status-Dot-Persistenz."""
    def repl(m):
        ref = m.group("ref").lower()  # a.1
        title = m.group("title").strip()
        if title.endswith("}"):
            return m.group(0)
        sub_slug = ref.replace(".", "-")  # a-1
        key = f"{page_slug}.{sub_slug}"
        return f"## {m.group('ref')} {title} {{data-status-key=\"{key}\"}}"
    return _RE_HEADING_SUBBLOCK_H2.sub(repl, markdown)


# ---------------------------------------------------------------------------
# Skript-Redesign V2 — on_page_content Helpers (Top-8 Reveal + Falle-Konsolidierung)
# ---------------------------------------------------------------------------

def _wrap_grid_card_inner(html_content: str) -> str:
    """In MP_05 ist die grid-cards-Quelle ohne Space nach `-:material-`. mkdocs
    parsed sie nicht als <ul><li>, sondern als <p>-Folge mit führendem `-`.
    Strategie: jede `<p>-…</p>` als Karten-Titel erkennen; alle nachfolgenden
    `<p>` bis zum nächsten `<p>-…</p>` als Karten-Body gruppieren; Block in
    `<div class="reveal-card" data-reveal="closed">…</div>` wrappen.
    Funktioniert auch für proper <ul><li>-Variante als Fallback."""
    # Fall A: echte <ul><li>-Listen (proper material grid-cards)
    if "<li>" in html_content:
        return re.sub(
            r"<li>([\s\S]*?)</li>",
            lambda m: f'<li class="reveal-card" data-reveal="closed">{m.group(1)}</li>',
            html_content,
        )
    # Fall B: <p>- …</p>-Folge — gruppieren
    # Token-Liste der Paragraphen + ggf. zwischen-tags
    paragraphs = re.split(r"(?=<p>)", html_content)
    out_parts: list[str] = []
    current_card: list[str] = []

    def flush():
        if current_card:
            inner = "\n".join(current_card)
            out_parts.append(f'<div class="reveal-card" data-reveal="closed">{inner}</div>')
            current_card.clear()

    for chunk in paragraphs:
        # Prüfe: ist es ein `<p>-`-Karten-Titel?
        m = re.match(r"\s*<p>-\s*(?:<span[^>]*>[\s\S]*?</span>\s*)?(<strong>[\s\S]*?)</p>", chunk)
        if m:
            # Neuer Karten-Titel — vorigen Card flushen
            flush()
            title_inner = m.group(1)
            # Trim trailing </p> aus title_inner Strong
            current_card.append(f"<p class=\"reveal-card__title\">{title_inner}</p>")
            # Rest hinter dem </p> als trailing chunk (selten, idR leer)
            tail = chunk[m.end():]
            if tail.strip():
                current_card.append(tail)
        elif chunk.strip().startswith("<p>") and current_card:
            # Folge-Paragraph dieser Karte
            current_card.append(chunk.rstrip())
        else:
            # Kein Karten-Kontext (z.B. erste leere chunk vor erstem <p>)
            flush()
            out_parts.append(chunk)
    flush()
    return "".join(out_parts)


def wrap_top8_reveal(html_content: str) -> str:
    """Im 'pflicht'-Bereich (Teil B) jede grid-cards-Karte mit data-reveal stempeln.
    Aufruf in on_page_content nach Markdown→HTML. Greift nur wenn section-kind-pflicht
    bereits per attr_list-Stamp gesetzt ist."""
    if "section-kind-pflicht" not in html_content:
        return html_content
    # Match grid-cards-Container und wrap Inhalt
    return re.sub(
        r'(<div class="grid cards"[^>]*>\s*)([\s\S]*?)(\s*</div>\s*(?=<p>🃏|<hr|<h1|<h2))',
        lambda m: m.group(1) + _wrap_grid_card_inner(m.group(2)) + m.group(3),
        html_content, count=1,
    )


# Falle-Atlas Tabelle → 10 falle-card-Blöcke (Single source of truth: Tabelle)
_RE_FA_TABLE = re.compile(
    r'<table>\s*<thead>\s*<tr>\s*'
    r'<th>\s*ID\s*</th>\s*'
    r'<th>\s*Falle\s*</th>\s*'
    r'<th>\s*Korrekte\s+Auflösung\s*</th>\s*'
    r'</tr>\s*</thead>\s*'
    r'<tbody>([\s\S]*?)</tbody>\s*</table>',
    re.IGNORECASE,
)
_RE_FA_ROW = re.compile(
    r'<tr>\s*<td>\s*(?P<id>FA\d+)\s*</td>\s*'
    r'<td>(?P<frage>[\s\S]*?)</td>\s*'
    r'<td>(?P<antwort>[\s\S]*?)</td>\s*</tr>',
    re.IGNORECASE,
)
# Existing manual <div class="falle-card">…</div> blocks (Pre-Konsolidierung)
_RE_FA_CARD = re.compile(
    r'<div class="falle-card"[^>]*>([\s\S]*?)</div>\s*</div>',
    re.IGNORECASE,
)
_RE_FA_CARD_ID = re.compile(r'(FA\d+)\s*·', re.IGNORECASE)


def consolidate_falle_atlas(html_content: str) -> str:
    """In Teil C (section-kind-fallen): parsed die Falle-Atlas-Tabelle und ALLE
    bestehenden falle-card-Blöcke. Generiert genau 10 falle-card-Blöcke in
    FA-ID-Reihenfolge. Bevorzugt manuell-gepflegten Karten-Inhalt (richer Wortlaut)
    über Tabellen-Zeile (knapper)."""
    if "section-kind-fallen" not in html_content:
        return html_content

    table_m = _RE_FA_TABLE.search(html_content)
    if not table_m:
        return html_content

    # Parse Tabellenzeilen
    table_rows = {}
    for rm in _RE_FA_ROW.finditer(table_m.group(1)):
        fa_id = rm.group("id").upper()
        frage = rm.group("frage").strip()
        antwort = rm.group("antwort").strip()
        table_rows[fa_id] = (frage, antwort)

    if not table_rows:
        return html_content

    # Parse bestehende manuelle falle-cards (Region nach der Tabelle)
    after_table = html_content[table_m.end():]
    # Stop-Anker: nächste H1 (Teil D) — innerhalb dieser Region liegen die Manual-Cards
    next_h1 = re.search(r'<h1[^>]*>', after_table)
    region = after_table[: next_h1.start()] if next_h1 else after_table

    manual_cards = {}  # FA-ID -> (frage_html, antwort_html)
    for cm in re.finditer(
        r'<div class="falle-card"[^>]*>\s*'
        r'<span class="falle-frage">([\s\S]*?)</span>\s*'
        r'<div class="falle-antwort"[^>]*>([\s\S]*?)</div>\s*</div>',
        region,
    ):
        frage_raw = cm.group(1).strip()
        antwort_raw = cm.group(2).strip()
        id_m = _RE_FA_CARD_ID.search(frage_raw)
        if not id_m:
            continue
        fa_id = id_m.group(1).upper()
        # Frage: nach „FA0X · " trimmen für den Card-Titel
        frage_clean = re.sub(r'^FA\d+\s*·\s*', '', frage_raw).strip()
        manual_cards[fa_id] = (frage_clean, antwort_raw)

    # Build merged 10 Cards in FA-ID-Reihenfolge
    sorted_ids = sorted(table_rows.keys(), key=lambda x: int(re.sub(r'\D', '', x)))
    out_cards = []
    for fa_id in sorted_ids:
        if fa_id in manual_cards:
            frage, antwort = manual_cards[fa_id]
        else:
            frage, antwort = table_rows[fa_id]
        out_cards.append(
            f'<div class="falle-card" data-fa-id="{fa_id}">\n'
            f'<span class="falle-frage">{fa_id} · {frage}</span>\n'
            f'<div class="falle-antwort">\n{antwort}\n</div>\n</div>'
        )
    new_block = "\n\n".join(out_cards)

    # Original-Region (Tabelle + Interaktiv-Paragraph + Manual-Cards) löschen
    # Region-Ende = vor next_h1 (Teil D) oder Ende der Region
    region_end_in_html = table_m.end() + (next_h1.start() if next_h1 else len(after_table))
    # Optional: zusätzlich "Interaktiv-Modus"-Paragraph wegfegen (ist in region drin, wird mit ersetzt)
    return (
        html_content[: table_m.start()]
        + new_block
        + "\n\n"
        + html_content[region_end_in_html:]
    )


def on_page_markdown(markdown: str, page=None, config=None, files=None, **kwargs):
    """mkdocs hook: pre-process markdown to wrap §/Art./Anker-patterns.
    Skript-Redesign V2: Section-Kind-Stamp + Sub-Block-Status-Stamp vorgeschaltet."""
    if config is None:
        return markdown

    # Section-Kind-Stamp + Sub-Block-Status-Stamp (idempotent, vor Norm-Wrap)
    page_slug = "page"
    if page is not None and getattr(page, "url", None):
        # page.url Bsp.: 'mp05/' -> 'mp05'
        page_slug = page.url.strip("/").split("/")[-1] or "index"
    markdown = stamp_section_kinds(markdown)
    markdown = stamp_subblock_status(markdown, page_slug)

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
