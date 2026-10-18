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


# ─────────────────────────── Zuletzt ───────────────────────────

def zuletzt(eintraege: list[dict], heute: dt.date) -> list[dict]:
    """Wählt die Einträge für den Block „Zuletzt" oben auf einer Kursseite.

    eintraege: alle Zeilen der Kursseite, neueste zuerst sortiert; jede Zeile hat
               mindestens "titel", "art", "href" und "datum" (dt.date).
    heute:     Datum des jüngsten Eintrags dieses Kurses (= eintraege[0]["datum"]).
               Bewusst NICHT der Build-Tag: sonst würde `make check` jeden Tag
               „veraltet" melden und den Deploy blocken. „Letzte N Tage" heißt also:
               N Tage vor der jüngsten Stunde.
    Rückgabe:  die Teilmenge, die oben unter „Zuletzt" stehen soll (leer = Block entfällt).
    """
    # Regel (Paul 2026-10-15): die letzte Stunde — alle Einträge mit dem jüngsten Datum.
    return [z for z in eintraege if z["datum"] == heute]


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
        # Sichtbarkeits-Wächter (Paul 2026-10-15): Titel erscheinen in der öffentlichen Übersicht —
        # dort darf kein Kurskürzel stehen (kein ablesbarer Stundenplan).
        flach = m["titel"].lower().replace(" ", "")
        for kk, kurs in kurse.items():
            if kk in flach or kurs["titel"].lower().replace(" ", "") in flach:
                out.append(f"{wo}: Titel nennt den Kurs {kurs['titel']!r} — Titel sind öffentlich, Kurs gehört nur in 'kurse'")
        if m["art"] not in ARTEN:
            out.append(f"{wo}: unbekannte Art {m['art']!r}")
        if m["fach"] not in faecher:
            out.append(f"{wo}: unbekanntes Fach {m['fach']!r}")
        else:
            straenge = faecher[m["fach"]].get("straenge")
            if straenge and m.get("strang") not in straenge:
                out.append(f"{wo}: strang fehlt/unbekannt ({m.get('strang')!r}), erlaubt: {', '.join(straenge)}")
            if not straenge and "strang" in m:
                out.append(f"{wo}: Fach {m['fach']!r} kennt keine straenge")
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
  .klasse { margin-top: 2.8rem; font-family: var(--ui); font-weight: 600; font-size: 1.35rem;
            letter-spacing: -.02em; }
  .unter { margin: 1.6rem 0 .4rem; }
  /* Fach-Reiter: Optik des Hell/Dunkel-Schalters (Haarlinie, aktiver Reiter invertiert).
     Ohne JS bleiben alle Panels sichtbar und die Reiterleiste versteckt. */
  .reiter { display: none; flex-wrap: wrap; border: 1px solid var(--hairline); width: fit-content;
            margin-top: 2rem; }
  .js .reiter { display: flex; }
  .reiter button { font-family: var(--mono); font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
            background: transparent; border: none; color: var(--ink-soft); padding: 9px 16px; cursor: pointer; }
  .reiter button:hover { color: var(--accent); }
  .reiter button[aria-selected="true"] { background: var(--ink); color: var(--paper); }
  .reiter button:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .js .fach[hidden], .js .klassen-panel[hidden] { display: none; }
  /* Zweite Ebene (Klassen): leiser als die Fach-Reiter — Text-Reiter mit Unterstrich, ohne Rahmen */
  .reiter.klassen { border: none; gap: 22px; margin-top: 1.6rem; border-bottom: 1px solid var(--rule);
            width: auto; }
  .reiter.klassen button { padding: 8px 0; border-bottom: 2px solid transparent; margin-bottom: -1px; }
  .reiter.klassen button[aria-selected="true"] { background: transparent; color: var(--ink);
            border-bottom-color: var(--accent); }
  .js .klassen-panel > .klasse { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  .js .klassen-panel > .unter:first-of-type { margin-top: 1.4rem; }
  .fach > h2 { margin-top: 2.5rem; }
  .js .fach > h2 { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  @media (max-width: 560px) {
    .hub-list a { grid-template-columns: 1fr auto; gap: 2px .8rem; }
    .hub-list .stufe { grid-column: 1; grid-row: 1; }
    .hub-list .art { grid-column: 2; grid-row: 1; }
    .hub-list .titel { grid-column: 1 / -1; grid-row: 2; }
  }"""

STAGING_CSS = """  /* Staging-Flag: blendet <li data-status="staging"> aus; sichtbar nur mit ?staging=1 */
  [data-status="staging"] { display: none !important; }
  html.staging-mode li[data-status="staging"] { display: list-item !important; }
  html.staging-mode div[data-status="staging"], html.staging-mode section[data-status="staging"] { display: block !important; }
  html.staging-mode button[data-status="staging"] { display: inline-block !important; }
  html.staging-mode li[data-status="staging"] {
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

REITER_JS = """<script>
/* Reiter in zwei Ebenen (ARIA-Tabs): Fach, darin Klasse. Die Wahl steht in der Adresse
   (#gpg-8 = GPG, Klasse 8), damit sie verlinkbar ist. Ohne JS bleibt alles untereinander. */
(function(){
  function sichtbar(t){ return getComputedStyle(t).display !== 'none'; }
  function tabsVon(l){ return [].slice.call(l.querySelectorAll('[role=tab]')); }
  function gewaehlt(l){ return l && tabsVon(l).filter(function(t){ return t.getAttribute('aria-selected') === 'true'; })[0]; }
  function adresse(){
    var f = gewaehlt(document.querySelector('.reiter.faecher'));
    if (!f) return;
    var k = gewaehlt(document.querySelector('#' + f.getAttribute('aria-controls') + ' .reiter.klassen'));
    try { history.replaceState(null, '', '#' + f.dataset.key + (k ? '-' + k.dataset.key : '')); } catch(e){}
  }
  function zeige(l, t, fokus, still){
    tabsVon(l).forEach(function(x){
      var an = x === t;
      x.setAttribute('aria-selected', an ? 'true' : 'false');
      x.tabIndex = an ? 0 : -1;
      document.getElementById(x.getAttribute('aria-controls')).hidden = !an;
    });
    if (fokus) t.focus();
    if (!still) adresse();
  }
  var listen = [].slice.call(document.querySelectorAll('.reiter'));
  function ausAdresse(){
    var h = location.hash.slice(1).split('-');
    listen.forEach(function(l){
      var tabs = tabsVon(l);
      var wunsch = l.classList.contains('faecher') ? h[0] : (l.dataset.fach === h[0] ? h[1] : null);
      var start = tabs.filter(function(t){ return t.dataset.key === wunsch && sichtbar(t); })[0]
               || gewaehlt(l) || tabs.filter(sichtbar)[0];
      if (start) zeige(l, start, false, true);
    });
  }
  listen.forEach(function(l){
    var tabs = tabsVon(l);
    tabs.forEach(function(t){
      t.addEventListener('click', function(){ zeige(l, t); });
      t.addEventListener('keydown', function(ev){
        var v = tabs.filter(sichtbar), j = v.indexOf(t), n = null;
        if (ev.key === 'ArrowRight') n = v[(j + 1) % v.length];
        if (ev.key === 'ArrowLeft')  n = v[(j - 1 + v.length) % v.length];
        if (ev.key === 'Home') n = v[0];
        if (ev.key === 'End')  n = v[v.length - 1];
        if (n) { zeige(l, n, true); ev.preventDefault(); }
      });
    });
  });
  ausAdresse();
  if (location.hash) adresse();
  window.addEventListener('hashchange', ausAdresse);
})();
</script>"""


def staging(ms: list[dict]) -> str:
    """Gruppe nur mit ?staging=1 zeigen, wenn ALLE ihre Materialien staging sind."""
    return ' data-status="staging"' if ms and all(m.get("status") == "staging" for m in ms) else ""


def hub_zeile(m: dict) -> str:
    attr = f' id="{e(m["id"])}"' if m.get("id") else ""
    if m.get("status") == "staging":
        attr += ' data-status="staging"'
    return f"""          <li{attr}>
            <a href="{e(m["pfad"])}">
              <span class="titel">{e(m["titel"])}</span>
              <span class="art">{e(ARTEN[m["art"]])}</span>
            </a>
          </li>"""


def uebersicht(daten: dict, v: dict) -> str:
    teile = ["      <span class=\"cap\">Unterricht</span>",
             "      <h1>Interaktive Unterrichtsmaterialien</h1>"]
    faecher = [(f, d, [m for m in daten["materialien"] if m["fach"] == f])
               for f, d in daten["faecher"].items()]
    faecher = [x for x in faecher if x[2]]
    teile.append('      <div class="reiter faecher" role="tablist" aria-label="Fächer">')
    for f, d, ms in faecher:
        teile.append(f'        <button role="tab" id="reiter-{f}" aria-controls="fach-{f}" '
                     f'data-key="{f}" aria-selected="false"{staging(ms)}>{e(d["reiter"])}</button>')
    teile.append("      </div>")
    for f, d, ms in faecher:
        teile.append(f'\n      <section class="fach" id="fach-{f}" role="tabpanel" '
                     f'aria-labelledby="reiter-{f}"{staging(ms)}>')
        teile.append(f'        <h2 class="cap">{e(d["name"])}</h2>')
        jahrgaenge = [(jg, [m for m in ms if m["jahrgang"] == jg]) for jg in sorted({m["jahrgang"] for m in ms})]
        teile.append(f'        <div class="reiter klassen" role="tablist" data-fach="{f}" '
                     f'aria-label="Klassen in {e(d["reiter"])}">')
        for jg, k_ms in jahrgaenge:
            teile.append(f'          <button role="tab" id="reiter-{f}-{jg}" aria-controls="fach-{f}-{jg}" '
                         f'data-key="{jg}" aria-selected="false"{staging(k_ms)}>{jg}. Klasse</button>')
        teile.append("        </div>")
        for jg, k_ms in jahrgaenge:
            teile.append(f'        <div class="klassen-panel" id="fach-{f}-{jg}" role="tabpanel" '
                         f'aria-labelledby="reiter-{f}-{jg}"{staging(k_ms)}>\n'
                         f'        <h3 class="klasse">{jg}. Klasse</h3>')
            gruppen = ([(name, [m for m in k_ms if m["strang"] == s_]) for s_, name in d["straenge"].items()]
                       if d.get("straenge") else [(None, k_ms)])
            for name, g in gruppen:
                if not g:
                    continue
                if name:
                    teile.append(f'        <h4 class="cap unter"{staging(g)}>{e(name)}</h4>')
                teile.append('        <ul class="hub-list zwei">')
                teile.extend(hub_zeile(m) for m in g)
                teile.append("        </ul>")
            teile.append("        </div>")
        teile.append("      </section>")
    css = STAGING_CSS + "\n" + LISTEN_CSS + """
  .hub-list.zwei a { grid-template-columns: 1fr auto; }
  @media (max-width: 560px) { .hub-list.zwei .titel { grid-row: 1; grid-column: 1; } }"""
    return seite(titel="Unterricht — weitergehts.online", tiefe="../", v=v,
                 kopf_extra="<script>document.documentElement.classList.add('js');</script>\n",
                 css=css, nav_aktuell=True,
                 main="\n".join(teile) + "\n" + STAGING_JS + "\n" + REITER_JS)


# ─────────────────────────── Kursseite ───────────────────────────

def kurs_eintraege(daten: dict, kurs: str) -> list[dict]:
    out = []
    for m in daten["materialien"]:
        if kurs not in m.get("kurse", []):
            continue
        for t in m.get("teile") or [m]:
            out.append({"titel": t["titel"], "art": m["art"], "thema": m["thema"],
                        "strang": m.get("strang"), "href": "../../" + t["pfad"],
                        "datum": dt.date.fromisoformat(t.get("datum") or m["datum"])})
    out.sort(key=lambda x: x["datum"], reverse=True)  # stabil: gleiche Daten in Quell-Reihenfolge
    return out


def kursseite(daten: dict, kurs: str, v: dict) -> str:
    k = daten["kurse"][kurs]
    fach = daten["faecher"][k["fach"]]
    eintraege = kurs_eintraege(daten, kurs)
    kopf = f"{k['titel']} · {fach['name']} · {daten['schuljahr']}"
    teile = [f'      <span class="cap">{e(kopf)}</span>',
             "      <h1>Unser Material</h1>"]

    def liste(kopf_html: str, zeilen: list[dict]) -> None:
        teile.append(kopf_html + '\n      <ul class="hub-list">')
        for z in zeilen:
            teile.append(zeile(z["href"], z["datum"].strftime("%d.%m."), z["titel"], z["art"]))
        teile.append("      </ul>")

    def nach_thema(zeilen: list[dict], ebene: str) -> None:
        themen: dict[str, list[dict]] = {}
        for z in zeilen:  # neueste zuerst → Thema mit der jüngsten Stunde steht vorn
            themen.setdefault(z["thema"], []).append(z)
        for name, tz in themen.items():
            klasse = "cap gruppe" if ebene == "h2" else "cap unter"
            liste(f'\n      <{ebene} class="{klasse}">{e(name)}</{ebene}>', tz)

    oben = zuletzt(eintraege, eintraege[0]["datum"]) if eintraege else []
    if oben:
        liste('\n      <h2 class="cap gruppe">Zuletzt</h2>', oben)
    if fach.get("straenge"):
        for s_, name in fach["straenge"].items():
            zs = [z for z in eintraege if z["strang"] == s_]
            if zs:
                teile.append(f'\n      <h2 class="klasse">{e(name)}</h2>')
                nach_thema(zs, "h3")
    else:
        nach_thema(eintraege, "h2")

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
    """Materialseiten unter unterricht/, die in kurse.json fehlen (BLOCKING seit 18.10.2026: eine verwaiste Seite ist
    live, aber in keiner Übersicht und auf keiner Kursseite — Befund quellen/versailles/)."""
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
        return 1 if (w and "--strict" in argv) else 0
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
