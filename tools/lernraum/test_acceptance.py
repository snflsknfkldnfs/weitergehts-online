#!/usr/bin/env python3
"""test_acceptance.py — Lernraum-Redesign Akzeptanzkriterien-Suite

Statische Pruefung aller migrierten Pages gegen die PR-Checkliste
aus `04-akzeptanzkriterien.md` + Pre-Akzeptanz-Token-Disziplin aus
`00-ANTWORTEN_PAUL.md` Modifikation 3.

Exit-Code:
  0   alle Checks bestanden
  1   mindestens ein Check FAIL
  2   Skript-Fehler (Datei fehlt, Schema kaputt, etc.)

Aufruf vom Repo-Root:
  python3 tools/lernraum/test_acceptance.py
  python3 tools/lernraum/test_acceptance.py --quiet
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]

# Alle Pages, die unter wg.lernraum-Spec migriert wurden.
LERNRAUM_PAGES = [
    "staatsexamen/index.html",
    "staatsexamen/schulrecht/index.html",
    "staatsexamen/schulrecht/5-rechte-pflichten-schueler/index.html",
    "staatsexamen/schulrecht/2-gliederung-bildungssystem/index.html",
    "staatsexamen/schulrecht/8-kooperation/index.html",
    "staatsexamen/fachdidaktik/index.html",
    "staatsexamen/fachdidaktik/n18-sozialkunde/index.html",
]

# Drill-Tools — duerfen v3.4-Style behalten, brauchen aber LR.Status.migrate-Hook
DRILL_TOOLS = [
    ("lerndecks/ke-umsetzungsmatrix-sk/index.html", "mp_n18_sk_ke_progress_v1"),
    ("lerndecks/mp-n18-sk-pruefungsvorbereitung/index.html", "mp_n18_sk_progress_v1"),
    ("lerndecks/ke-matrix-mathe/index.html", "mp_n18_mathe_ke_progress_v1"),
]

GLOSSARE = ("norm", "lp", "prinzip")


@dataclass
class CheckResult:
    name: str
    passed: bool
    detail: str = ""


@dataclass
class Report:
    results: list[CheckResult] = field(default_factory=list)

    def add(self, name: str, passed: bool, detail: str = "") -> None:
        self.results.append(CheckResult(name, passed, detail))

    @property
    def failed(self) -> list[CheckResult]:
        return [r for r in self.results if not r.passed]

    def render(self, quiet: bool = False) -> None:
        for r in self.results:
            if quiet and r.passed:
                continue
            mark = "OK  " if r.passed else "FAIL"
            print(f"  [{mark}] {r.name}")
            if r.detail and (not r.passed or not quiet):
                for line in r.detail.splitlines():
                    print(f"          {line}")


# ---------------------------------------------------------------------------
# Einzelchecks
# ---------------------------------------------------------------------------


def check_files_exist(report: Report) -> None:
    for p in LERNRAUM_PAGES:
        report.add(f"file-exists · {p}", (REPO_ROOT / p).is_file())
    for p, _ in DRILL_TOOLS:
        report.add(f"file-exists · {p}", (REPO_ROOT / p).is_file())
    for t in GLOSSARE:
        f = REPO_ROOT / "assets" / "data" / f"glossar-{t}.json"
        report.add(f"file-exists · {f.relative_to(REPO_ROOT)}", f.is_file())


def check_token_disziplin(report: Report) -> None:
    """Spec §2 + 04-akzeptanzkriterien Token-Disziplin-Block."""
    for rel in LERNRAUM_PAGES:
        path = REPO_ROOT / rel
        if not path.is_file():
            continue
        content = path.read_text(encoding="utf-8")

        # 1. Keine Inline-Hex-Werte in HTML
        hex_inline = re.findall(r'style="[^"]*#[0-9a-fA-F]', content)
        report.add(
            f"token · no-inline-hex · {rel}",
            len(hex_inline) == 0,
            f"{len(hex_inline)} Verstoesse",
        )

        # 2. Keine style="..."-Attribute mit > 2 Properties
        gt2 = []
        for m in re.finditer(r'\bstyle="([^"]+)"', content):
            props = [p for p in m.group(1).split(";") if p.strip()]
            if len(props) > 2:
                gt2.append(m.group(1)[:80])
        report.add(
            f"token · style-attr<=2-props · {rel}",
            len(gt2) == 0,
            "\n".join(gt2[:5]),
        )

        # 3. border-radius global 0 (im Page-<style>-Block keine >=1px)
        # (nur lokaler <style>, nicht im base.css)
        style_block_match = re.search(r"<style>(.*?)</style>", content, re.DOTALL)
        if style_block_match:
            block = style_block_match.group(1)
            bad_radius = re.findall(r"border-radius:\s*[1-9]\d*", block)
            report.add(
                f"token · no-border-radius · {rel}",
                len(bad_radius) == 0,
                f"{len(bad_radius)} Verstoesse",
            )

            # 4. Keine box-shadow
            shadows = re.findall(r"box-shadow:\s*[^n;]", block)
            report.add(
                f"token · no-box-shadow · {rel}",
                len(shadows) == 0,
                f"{len(shadows)} Verstoesse",
            )

            # 5. Inline-<style> mit > 2 Hardcode-Hex (Pre-Akzeptanz Modifikation 3)
            hex_in_block = re.findall(r"#[0-9a-fA-F]{3,6}\b", block)
            report.add(
                f"token · style-block-hex<=2 · {rel}",
                len(hex_in_block) <= 2,
                f"{len(hex_in_block)} Hex-Werte im <style>-Block (max 2 erlaubt)",
            )


def check_lernraum_activation(report: Report) -> None:
    for rel in LERNRAUM_PAGES:
        c = (REPO_ROOT / rel).read_text(encoding="utf-8")
        report.add(f"a11y · data-lernraum-body · {rel}", "data-lernraum" in c)
        report.add(f"a11y · skip-link · {rel}", "skip-link" in c)
        # ARIA-Layer: mindestens ein aria-label oder aria-labelledby pro Page
        has_aria = bool(re.search(r'aria-(label|labelledby|describedby|hidden|live|pressed|expanded|modal)', c))
        report.add(f"a11y · aria-vorhanden · {rel}", has_aria)


def check_anchor_tag_coverage(report: Report) -> None:
    """Jeder Anchor-Tag muss einen Eintrag im jeweiligen Glossar haben."""
    gloss = {}
    for t in GLOSSARE:
        f = REPO_ROOT / "assets" / "data" / f"glossar-{t}.json"
        if not f.is_file():
            report.add(f"glossar · file-exists · {t}", False)
            continue
        gloss[t] = json.loads(f.read_text(encoding="utf-8"))

    atag_re = re.compile(
        r'<button[^>]*class="anchor-tag"[^>]*data-type="([^"]+)"[^>]*data-ref="([^"]+)"'
    )
    total = hits = 0
    misses = []
    for rel in LERNRAUM_PAGES:
        c = (REPO_ROOT / rel).read_text(encoding="utf-8")
        for m in atag_re.finditer(c):
            total += 1
            t, ref = m.group(1), m.group(2)
            if ref in gloss.get(t, {}):
                hits += 1
            else:
                misses.append((rel, t, ref))

    report.add(
        f"glossar · anchor-tag-coverage ({hits}/{total})",
        len(misses) == 0,
        "\n".join(f"{r} · {t}={ref}" for r, t, ref in misses[:10]),
    )


def check_glossar_schema(report: Report) -> None:
    expected = {
        "norm":    {"key", "title", "definition", "type"},
        "lp":      {"key", "title", "fach", "type"},
        "prinzip": {"key", "title", "fach", "definition", "type"},
    }
    for t in GLOSSARE:
        f = REPO_ROOT / "assets" / "data" / f"glossar-{t}.json"
        if not f.is_file():
            report.add(f"schema · {t} · file", False)
            continue
        data = json.loads(f.read_text(encoding="utf-8"))
        miss_keys = []
        for slug, entry in data.items():
            missing = expected[t] - set(entry.keys())
            if missing:
                miss_keys.append(f"{slug} -> fehlt {missing}")
        report.add(
            f"schema · {t} · pflichtfelder ({len(data)} Eintraege)",
            len(miss_keys) == 0,
            "\n".join(miss_keys[:5]),
        )


def check_status_migration_wiring(report: Report) -> None:
    """Drill-Tools müssen LR.Status.migrate() im Bootstrap aufrufen."""
    for rel, legacy_key in DRILL_TOOLS:
        c = (REPO_ROOT / rel).read_text(encoding="utf-8")
        has_core = "/assets/js/core.js" in c or "assets/js/core.js" in c
        has_migrate = f"LR.Status.migrate('{legacy_key}')" in c
        report.add(
            f"v3.4-erhalt · {rel} · core.js-include",
            has_core,
            "core.js-Script-Tag fehlt",
        )
        report.add(
            f"v3.4-erhalt · {rel} · status-migrate-call",
            has_migrate,
            f"LR.Status.migrate('{legacy_key}') fehlt",
        )


def check_no_emoji_section_marker(report: Report) -> None:
    """Spec §6: keine Section-Marker-Emojis 📚 🖨 📥 📖 in migrierten Pages."""
    bad_emojis = ["📚", "🖨", "📥", "📖"]
    for rel in LERNRAUM_PAGES:
        c = (REPO_ROOT / rel).read_text(encoding="utf-8")
        found = [e for e in bad_emojis if e in c]
        report.add(
            f"spec-§6 · keine-section-emojis · {rel}",
            len(found) == 0,
            f"gefunden: {found}",
        )


def check_base_css_lernraum_block(report: Report) -> None:
    """base.css muss den wg.lernraum-Block enthalten (Schritt 1)."""
    base = REPO_ROOT / "assets" / "css" / "base.css"
    if not base.is_file():
        report.add("schritt-1 · base.css · file", False)
        return
    c = base.read_text(encoding="utf-8")
    must_have = [
        "body[data-lernraum]",
        "--bg:",
        "--paper:",
        "--ink:",
        "--accent:",
        "--status-work",
        "--lr-font-mono",
        ".anchor-tag",
        ".status-dot",
        ".slideover",
        ".lernpfad-card",
    ]
    for token in must_have:
        report.add(f"schritt-1 · base.css enthaelt `{token}`", token in c)


def check_core_js_lr_module(report: Report) -> None:
    """core.js muss LR-Modul mit Status/Glossar/AnchorTag/Slideover exportieren."""
    core = REPO_ROOT / "assets" / "js" / "core.js"
    if not core.is_file():
        report.add("schritt-2 · core.js · file", False)
        return
    c = core.read_text(encoding="utf-8")
    must_have = [
        "var LR = (function",
        "wg.lernraum.status.",
        "function statusMigrate",
        "function glossarLoad",
        "function slideoverOpen",
        "function anchorTagBind",
        "Auto-Bootstrap",
    ]
    for token in must_have:
        report.add(f"schritt-2 · core.js enthaelt `{token}`", token in c)


def check_html_basics(report: Report) -> None:
    """Minimaler HTML-Smoke: doctype, charset, balanced body/main."""
    for rel in LERNRAUM_PAGES:
        c = (REPO_ROOT / rel).read_text(encoding="utf-8")
        report.add(f"html · doctype · {rel}", c.lstrip().lower().startswith("<!doctype html>"))
        report.add(f"html · utf-8-charset · {rel}", 'charset="UTF-8"' in c or 'charset="utf-8"' in c)
        # exakt 1 <body>/</body>
        report.add(
            f"html · body-balanced · {rel}",
            c.count("<body") == 1 and c.count("</body>") == 1,
        )


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--quiet", action="store_true", help="Nur FAIL-Zeilen zeigen")
    args = ap.parse_args()

    report = Report()

    print("=== Lernraum-Redesign Akzeptanzkriterien-Suite ===\n")

    print("[1] Dateien vorhanden")
    check_files_exist(report)

    print("[2] Token-Disziplin (Spec §2 + 04-akzeptanzkriterien)")
    check_token_disziplin(report)

    print("[3] Lernraum-Aktivierung + a11y (data-lernraum, Skip-Link, ARIA)")
    check_lernraum_activation(report)

    print("[4] Anchor-Tag-Glossar-Coverage (Spec §4 + §12)")
    check_anchor_tag_coverage(report)

    print("[5] Glossar-JSON-Schema")
    check_glossar_schema(report)

    print("[6] v3.4-Erhalt · Status-Migration-Wiring (Spec §11.3)")
    check_status_migration_wiring(report)

    print("[7] Spec §6 · keine Emoji-Section-Marker in migrierten Pages")
    check_no_emoji_section_marker(report)

    print("[8] Schritt 1: base.css wg.lernraum-Block")
    check_base_css_lernraum_block(report)

    print("[9] Schritt 2: core.js LR-Modul")
    check_core_js_lr_module(report)

    print("[10] HTML-Basics (Doctype, UTF-8, balanced)")
    check_html_basics(report)

    print()
    report.render(quiet=args.quiet)

    failed = report.failed
    total = len(report.results)
    print()
    print("=" * 60)
    if failed:
        print(f"FAIL  {len(failed)}/{total} Checks fehlgeschlagen")
        return 1
    print(f"OK    {total}/{total} Checks bestanden")
    return 0


if __name__ == "__main__":
    sys.exit(main())
