#!/usr/bin/env python3
"""build.py — erzeugt die Unterricht-Übersicht und die Kursseiten aus unterricht/kurse.json.

  python3 tools/kurse/build.py            # schreibt unterricht/index.html + unterricht/k/<kurs>/index.html
  python3 tools/kurse/build.py --check    # BLOCKING: Pfade/Kurse gültig, Dateien aktuell (Exit 1 sonst)
  python3 tools/kurse/build.py --orphans  # ADVISORY: Materialseiten ohne Eintrag in kurse.json

Warum generiert: Übersicht und Kursseiten sind zwei Sichten auf einen Bestand; handgepflegt
driften sie. Spec: docs/website/specs/2026-10-15-kursseiten-design.md
Sichtbarkeit (Paul 2026-10-15): Übersicht öffentlich, aber ohne Kurskürzel und ohne Datum;
Kursseiten unverlinkt + noindex.
"""
from __future__ import annotations

import datetime as dt
import html
import json
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
UNTERRICHT = REPO / "unterricht"
QUELLE = UNTERRICHT / "kurse.json"
VERSIONS = REPO / "assets" / "versions.json"

ARTEN = {
    "escape-game": "Escape-Game",
    "quellen": "Quellen",
    "anordnen": "Anordnen",
    "werkzeug": "Werkzeug",
    "anleitung": "Anleitung",
    "recherche": "Recherche",
}

GENERIERT = "<!-- GENERIERT von tools/kurse/build.py aus unterricht/kurse.json — nicht von Hand editieren, sondern: make kurse -->"


def e(s: str) -> str:
    return html.escape(s, quote=True)


# ─────────────────────────── Aktuell ───────────────────────────

def aktuell(eintraege: list[dict], heute: dt.date) -> list[dict]:
    """Wählt die Einträge für den Block „Aktuell" oben auf einer Kursseite.

    eintraege: alle Zeilen der Kursseite, neueste zuerst sortiert; jede Zeile hat
               mindestens "titel", "art", "href" und "datum" (dt.date).
    heute:     Datum des jüngsten Eintrags dieses Kurses (= eintraege[0]["datum"]).
               Bewusst NICHT der Build-Tag: sonst würde `make check` jeden Tag
               „veraltet" melden und den Deploy blocken. „Letzte N Tage" heißt also:
               N Tage vor der jüngsten Stunde.
    Rückgabe:  die Teilmenge, die oben unter „Aktuell" stehen soll (leer = Block entfällt).
    """
    # TODO(Paul): Regel festlegen. Varianten aus der Spec: die letzte Stunde
    # (alle Einträge mit dem jüngsten Datum) · alles der letzten N Tage · feste Anzahl.
    return []


# ─────────────────────────── Laden + Prüfen ───────────────────────────

def laden() -> dict:
    return json.loads(QUELLE.read_text(encoding="utf-8"))


def ziel_existiert(pfad: str) -> bool:
    p = UNTERRICHT / pfad
    return (p / "index.html").is_file() if pfad.endswith("/") else p.is_file()


def fehler(daten: dict) -> list[str]:
    out = []
    kurse, faecher = daten["kurse"], daten["faecher"]
    for k, kurs in kurse.items():
        if kurs["fach"] not in faecher:
            out.append(f"Kurs {k}: unbekanntes Fach {kurs['fach']!r}")
    ids = set()
    for m in daten["materialien"]:
        wo = m.get("id", m["pfad"])
        if m.get("id") in ids:
            out.append(f"{wo}: id doppelt")
        ids.add(m.get("id"))
        for p in [m["pfad"]] + [t["pfad"] for t in m.get("teile", [])]:
            if not ziel_existiert(p):
                out.append(f"{wo}: Pfad existiert nicht: unterricht/{p}")
        if m["art"] not in ARTEN:
            out.append(f"{wo}: unbekannte Art {m['art']!r}")
        if m["fach"] not in faecher:
            out.append(f"{wo}: unbekanntes Fach {m['fach']!r}")
        for k in m.get("kurse", []):
            if k not in kurse:
                out.append(f"{wo}: unbekannter Kurs {k!r}")
            for d in [m.get("datum")] + [t.get("datum") for t in m.get("teile", [])]:
                if d is None:
                    out.append(f"{wo}: Kursmaterial ohne datum")
                    break
                try:
                    dt.date.fromisoformat(d)
                except ValueError:
                    out.append(f"{wo}: datum kein JJJJ-MM-TT: {d!r}")
            if not m.get("thema"):
                out.append(f"{wo}: Kursmaterial ohne thema")
    return out


# ─────────────────────────── Rahmen (Topbar/Footer) ───────────────────────────

def css_links(tiefe: str, v: dict) -> str:
    return "\n".join(
        f'<link rel="stylesheet" href="{tiefe}assets/css/{n}?v={v[n]}">'
        for n in ("fonts.css", "tokens.css", "wg.css"))


MODUS_FRUEH = """<script>
  (function(){ try{ var m=localStorage.getItem('wg-mode'); var r=document.documentElement;
    r.classList.remove('mode-light','mode-dark'); r.classList.add(m==='light'?'mode-light':'mode-dark'); }catch(e){} })();
</script>"""

MODUS_SCHALTER = """<script>
(function(){
  var root=document.documentElement;
  var bL=document.getElementById('m-light'), bD=document.getElementById('m-dark');
  function paint(){ var d=root.classList.contains('mode-dark');
    bL.setAttribute('aria-pressed', d?'false':'true'); bD.setAttribute('aria-pressed', d?'true':'false'); }
  function set(d){ root.classList.remove('mode-light','mode-dark'); root.classList.add(d?'mode-dark':'mode-light');
    try{ localStorage.setItem('wg-mode', d?'dark':'light'); }catch(e){} paint(); }
  bL.addEventListener('click',function(){ set(false); });
  bD.addEventListener('click',function(){ set(true); });
  paint();
})();
</script>"""

# Listen-Muster der Übersicht (vorher inline in unterricht/index.html). Erste Spalte:
# Jahrgang (Übersicht) bzw. Datum (Kursseite) — gleiches Grid, ruhige Mono-Marken.
LISTEN_CSS = """  .hub-list { list-style: none; }
  .hub-list li { border-top: 1px solid var(--rule); }
  .hub-list li:last-child { border-bottom: 1px solid var(--rule); }
  .hub-list a { display: grid; grid-template-columns: 4.5rem 1fr auto; gap: 0 1.2rem;
                align-items: baseline; padding: 14px 4px;
                font-family: var(--serif); font-size: 1.15rem; }
  .hub-list a:hover { color: var(--accent); }
  /* Jahrgang/Datum und Format als ruhige Marken, nicht als zweite Überschrift */
  .hub-list .stufe, .hub-list .art { font-family: var(--ui); font-size: .72rem;
                letter-spacing: .08em; text-transform: uppercase; color: var(--ink-faint); }
  .hub-list .stufe { font-variant-numeric: tabular-nums; }
  .hub-list .art { white-space: nowrap; }
  .gruppe { margin-top: 2.5rem; }
  @media (max-width: 560px) {
    .hub-list a { grid-template-columns: 1fr auto; gap: 2px .8rem; }
    .hub-list .stufe { grid-column: 1; grid-row: 1; }
    .hub-list .art { grid-column: 2; grid-row: 1; }
    .hub-list .titel { grid-column: 1 / -1; grid-row: 2; }
  }"""

STAGING_CSS = """  /* Staging-Flag: blendet <li data-status="staging"> aus; sichtbar nur mit ?staging=1 */
  li[data-status="staging"] { display: none; }
  html.staging-mode li[data-status="staging"] {
    display: list-item;
    outline: 2px dashed #d97706;
    padding: 4px 8px;
    background: #fff7ed;
    color: #16170f;
  }
  html.staging-mode li[data-status="staging"]::after {
    content: " [STAGING — nicht live]";
    color: #d97706;
    font-weight: bold;
    font-size: 0.9em;
  }
  html.staging-mode body::before {
    content: "STAGING-MODUS aktiv (via ?staging=1)";
    display: block;
    background: #d97706;
    color: white;
    padding: 8px 16px;
    font-weight: bold;
    text-align: center;
  }"""

STAGING_JS = """<script>
  (function() {
    try {
      var params = new URLSearchParams(window.location.search);
      if (params.get('staging') === '1') {
        document.documentElement.classList.add('staging-mode');
      }
    } catch (e) { /* staging off */ }
  })();
</script>"""


def seite(*, titel: str, tiefe: str, v: dict, kopf_extra: str, css: str,
          nav_aktuell: bool, main: str) -> str:
    aria = ' aria-current="page"' if nav_aktuell else ""
    unterricht = "./" if nav_aktuell else f"{tiefe}unterricht/"
    return f"""<!DOCTYPE html>
{GENERIERT}
<html lang="de" class="mode-dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
{kopf_extra}<title>{e(titel)}</title>
{css_links(tiefe, v)}
{MODUS_FRUEH}
<style>
{css}
</style>
</head>
<body class="halo">
<div class="tapete" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>

<header class="topbar">
  <div class="wrap">
    <a class="brand" href="{tiefe}index.html"><span class="sq"></span></a>
    <nav class="nav">
      <a href="{tiefe}profil/">Profil</a>
      <a href="{unterricht}"{aria}>Unterricht</a>
    </nav>
    <div class="toggle" role="group" aria-label="Hell- oder Dunkelmodus">
      <button id="m-light" aria-pressed="false">Hell</button>
      <button id="m-dark" aria-pressed="true">Dunkel</button>
    </div>
  </div>
</header>

<main>
  <section class="block">
    <div class="wrap">
{main}
    </div>
  </section>
</main>

<footer id="kontakt">
  <div class="wrap foot">
    <span class="fmark">weitergehts.online</span>
    <span class="fline">
      <a href="{tiefe}index.html">Start</a>
      <a href="{tiefe}profil/">Profil</a>
    </span>
    <span class="fline">
      <a href="{tiefe}impressum/">Impressum</a>
      <a href="{tiefe}datenschutz/">Datenschutz</a>
    </span>
    <span class="fline">© 2026</span>
  </div>
</footer>

{MODUS_SCHALTER}
</body>
</html>
"""


def zeile(href: str, marke: str, titel: str, art: str, *, li_attr: str = "") -> str:
    return f"""        <li{li_attr}>
          <a href="{e(href)}">
            <span class="stufe">{e(marke)}</span>
            <span class="titel">{e(titel)}</span>
            <span class="art">{e(ARTEN[art])}</span>
          </a>
        </li>"""


# ─────────────────────────── Übersicht ───────────────────────────

def uebersicht(daten: dict, v: dict) -> str:
    teile = ["      <span class=\"cap\">Unterricht</span>",
             "      <h1>Interaktive Unterrichtsmaterialien</h1>"]
    for fach, name in daten["faecher"].items():
        ms = [m for m in daten["materialien"] if m["fach"] == fach]
        if not ms:
            continue
        ms.sort(key=lambda m: m["jahrgang"])  # stabil: innerhalb des Jahrgangs Reihenfolge der Quelle
        teile.append(f'\n      <h2 class="cap gruppe">{e(name)}</h2>\n      <ul class="hub-list">')
        for m in ms:
            attr = f' id="{e(m["id"])}"' if m.get("id") else ""
            if m.get("status") == "staging":
                attr += ' data-status="staging"'
            teile.append(zeile(m["pfad"], f"Kl. {m['jahrgang']}", m["titel"], m["art"], li_attr=attr))
        teile.append("      </ul>")
    return seite(titel="Unterricht — weitergehts.online", tiefe="../", v=v,
                 kopf_extra="", css=STAGING_CSS + "\n" + LISTEN_CSS, nav_aktuell=True,
                 main="\n".join(teile) + "\n" + STAGING_JS)


# ─────────────────────────── Kursseite ───────────────────────────

def kurs_eintraege(daten: dict, kurs: str) -> list[dict]:
    out = []
    for m in daten["materialien"]:
        if kurs not in m.get("kurse", []):
            continue
        for t in m.get("teile") or [m]:
            out.append({"titel": t["titel"], "art": m["art"], "thema": m["thema"],
                        "href": "../../" + t["pfad"],
                        "datum": dt.date.fromisoformat(t.get("datum") or m["datum"])})
    out.sort(key=lambda x: x["datum"], reverse=True)  # stabil: gleiche Daten in Quell-Reihenfolge
    return out


def kursseite(daten: dict, kurs: str, v: dict) -> str:
    k = daten["kurse"][kurs]
    eintraege = kurs_eintraege(daten, kurs)
    kopf = f"{k['titel']} · {daten['faecher'][k['fach']]} · {daten['schuljahr']}"
    teile = [f'      <span class="cap">{e(kopf)}</span>',
             "      <h1>Unser Material</h1>"]

    def liste(name: str, zeilen: list[dict]) -> None:
        teile.append(f'\n      <h2 class="cap gruppe">{e(name)}</h2>\n      <ul class="hub-list">')
        for z in zeilen:
            teile.append(zeile(z["href"], z["datum"].strftime("%d.%m."), z["titel"], z["art"]))
        teile.append("      </ul>")

    oben = aktuell(eintraege, eintraege[0]["datum"]) if eintraege else []
    if oben:
        liste("Aktuell", oben)
    themen: dict[str, list[dict]] = {}
    for z in eintraege:  # neueste zuerst → Thema mit der jüngsten Stunde steht vorn
        themen.setdefault(z["thema"], []).append(z)
    for name, zeilen in themen.items():
        liste(name, zeilen)

    return seite(titel=f"{k['titel']} · weitergehts.online", tiefe="../../../", v=v,
                 kopf_extra='<meta name="robots" content="noindex">\n', css=LISTEN_CSS,
                 nav_aktuell=False, main="\n".join(teile))


# ─────────────────────────── Ausgabe ───────────────────────────

def soll(daten: dict) -> dict[Path, str]:
    v = json.loads(VERSIONS.read_text(encoding="utf-8"))["assets"]
    out = {UNTERRICHT / "index.html": uebersicht(daten, v)}
    for kurs in daten["kurse"]:
        out[UNTERRICHT / "k" / kurs / "index.html"] = kursseite(daten, kurs, v)
    return out


def verwaist(daten: dict) -> list[str]:
    """Materialseiten unter unterricht/, die in kurse.json fehlen (ADVISORY)."""
    gelistet = {m["pfad"].removesuffix("index.html") for m in daten["materialien"]}
    gelistet |= {t["pfad"] for m in daten["materialien"] for t in m.get("teile", [])}
    gelistet |= set(daten.get("hubs", []))
    out = []
    for f in sorted(UNTERRICHT.rglob("*.html")):
        rel = f.relative_to(UNTERRICHT)
        teile = rel.parts
        if any(p.startswith("_") for p in teile) or teile[0] in ("assets", "k") or rel == Path("index.html"):
            continue
        if teile[0] == "escape-games":  # Game-Unterseiten (mappe-*, tafelbild/, lehrkraft) gehören zum Game
            seite_ = f"escape-games/{teile[1]}/"
        elif f.name == "index.html":
            seite_ = rel.parent.as_posix() + "/"
        else:
            seite_ = rel.as_posix()
        # Unterseiten eines gelisteten Materials (nicht eines Hubs) zählen als gelistet
        materialien = gelistet - set(daten.get("hubs", []))
        if seite_ not in gelistet and not any(g.endswith("/") and seite_.startswith(g) for g in materialien):
            out.append(seite_)
    return sorted(set(out))


def main(argv: list[str]) -> int:
    daten = laden()
    probleme = fehler(daten)
    if "--orphans" in argv:
        w = verwaist(daten)
        for s in w:
            print(f"verwaist (nicht in kurse.json): unterricht/{s}")
        if not w:
            print("keine verwaisten Materialseiten")
        return 0
    if probleme:
        print("kurse.json ungültig:\n" + "\n".join("  - " + p for p in probleme))
        return 1
    dateien = soll(daten)
    if "--check" in argv:
        alt = [p.relative_to(REPO).as_posix() for p, s in dateien.items()
               if not p.is_file() or p.read_text(encoding="utf-8") != s]
        if alt:
            print("Kursseiten veraltet (fix: make kurse): " + ", ".join(alt))
            return 1
        print(f"kurse.json gültig, Übersicht + {len(daten['kurse'])} Kursseiten aktuell")
        return 0
    for p, s in dateien.items():
        p.parent.mkdir(parents=True, exist_ok=True)
        if not p.is_file() or p.read_text(encoding="utf-8") != s:
            p.write_text(s, encoding="utf-8")
            print(f"geschrieben: {p.relative_to(REPO).as_posix()}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
