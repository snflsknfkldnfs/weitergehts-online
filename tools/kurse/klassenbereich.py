#!/usr/bin/env python3
"""klassenbereich.py — baut den verschlüsselten Klassenbereich eines Kurses (Kurs → Sequenz → Stunde).

  python3 tools/kurse/klassenbereich.py gpg9a           # baut unterricht/k/gpg9a/ (braucht die Welt und das Passwort)
  python3 tools/kurse/klassenbereich.py gpg9a --passwort  # zeigt das Klassenpasswort
  python3 tools/kurse/klassenbereich.py --check         # ohne Schlüssel: Gerüst vollständig? (für make check / CI)

Warum verschlüsselt (Lehrkraft 14.11.2026): Blätter und Folien enthalten Bilder, die nur die Klasse sehen darf
(§ 60a UrhG, Gesamtvertrag Schulbücher). Das Repo und GitHub Pages sind öffentlich; ein Passwortfeld allein schützt
dort nichts. Darum liegt jede Seite und jede Datei nur als AES-GCM-Chiffrat im Repo; der Browser entschlüsselt mit
dem Klassenpasswort (PBKDF2-SHA256). Klartext und Passwort verlassen den Rechner der Lehrkraft nie.

Spec und Entscheide der Lehrkraft: docs/website/specs/2026-11-14-klassenbereich-design.md; Anleitung für einen neuen Kurs:
docs/website/VEROEFFENTLICHEN.md § Klassenbereich. Struktur und Material werden aus der Welt abgeleitet (struktur, stunde_auto);
die Auswahl-Datei trägt nur Ausnahmen.

Quellen (nie Inhalte im Repo):
  tools/kurse/klassenbereich/<kurs>.json    Auswahl je Stunde (Pfade in die Welt, Zuordnung Blatt ↔ Material)
  unterricht/kurse.json                     Kurs (Titel, Fach), Material-Links (Feld "stunde")
  <Welt>/<Kurs>/JAHRESPLAN.md, SEQUENZPLAN.md  das Jahr und die Stunden (Datum, Titel, Stundenfrage, gehalten)
  <Welt>/…/LOESUNG_*.md, PLANUNG.md         Hefteinträge; drucken/*.pdf Blätter; Folien-PDF; bilder/HERKUNFT.md
  ~/.config/weitergehts/klassenbereich.json Passwort und Salz je Kurs (außerhalb des Repos)

Deterministisch: gleicher Klartext → gleiche IV (HMAC) → gleiches Chiffrat, also kein Git-Rauschen bei Neubau.
Ausgabe neben den Seiten: unterricht/k/<kurs>/stand.json (nur Kennungen; liest der Sitzungsstart und make kursseite).
Nachführen nach einer Stunde: make kursseite K=<kurs> (tools/kurse/nachfuehren.py).
"""
from __future__ import annotations

import base64
import hashlib
import hmac
import html
import importlib.util
import json
import os
import re
import secrets
import subprocess
import sys
import tempfile
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
UNTERRICHT = REPO / "unterricht"
AUSWAHL = Path(__file__).resolve().parent / "klassenbereich"
GEHEIM = Path.home() / ".config" / "weitergehts" / "klassenbereich.json"
ITER = 600_000
MARKE = "<!-- KLASSENBEREICH: verschlüsselt erzeugt von tools/kurse/klassenbereich.py — nicht von Hand editieren -->"
DUCKAI = "https://duck.ai/?q="

_spec = importlib.util.spec_from_file_location("kurse_build", Path(__file__).resolve().parent / "build.py")
build = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(build)
e = build.e
WOCHENTAGE = build.WOCHENTAGE


# ─────────────────────────── Schlüssel ───────────────────────────

WOERTER = """apfel ampel anker ast baum bach ball berg birne blatt blitz boot brief brot bruecke burg dach dorf drache
eiche eimer eis ente erde esel fahne feder feld fenster fisch flamme floss fluss fuchs gabel garten geige glas glocke
gras hafen hahn hammer hase haus heft helm himmel hirsch hof honig horn hut igel insel jacke kaefer kamm kanne karte
katze kerze kette kiste klee knopf koffer kohle korb kran kreide krone kuchen kugel lampe laterne leiter licht linde
loewe loeffel luchs mantel markt mauer maus meer mond moos muehle muschel mutze nadel nebel nest netz nuss ofen palme
papier pfeil pferd pilz pinsel platz pumpe quelle rabe rad regen ring rose ruder sand schaf schiff schild schirm
schloss schnee schuh see segel seil sonne spiegel stern stiefel stein strand stuhl sturm tanne tasche teich teller
tiger tisch tor treppe tuer turm uhr ufer vogel wagen wald wal wand wasser welle wiese wind wolke wurm zange zaun
zelt ziege zug zwerg""".split()


def geheim(kurs: str, neu: bool = True) -> dict:
    daten = json.loads(GEHEIM.read_text(encoding="utf-8")) if GEHEIM.is_file() else {}
    if kurs not in daten:
        if not neu:
            sys.exit(f"Kein Passwort für {kurs} in {GEHEIM}")
        w = [secrets.choice(WOERTER) for _ in range(3)]
        daten[kurs] = {"passwort": f"{w[0]}-{w[1]}-{w[2]}-{secrets.randbelow(90) + 10}",
                       "salz": base64.b64encode(secrets.token_bytes(16)).decode()}
        GEHEIM.parent.mkdir(parents=True, exist_ok=True)
        GEHEIM.write_text(json.dumps(daten, ensure_ascii=False, indent=2), encoding="utf-8")
        os.chmod(GEHEIM, 0o600)
        print(f"neues Klassenpasswort für {kurs} angelegt in {GEHEIM}")
    return daten[kurs]


class Tresor:
    def __init__(self, passwort: str, salz_b64: str):
        from cryptography.hazmat.primitives import hashes
        from cryptography.hazmat.primitives.ciphers.aead import AESGCM
        from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
        self.salz = salz_b64
        self.key = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=base64.b64decode(salz_b64),
                              iterations=ITER).derive(passwort.encode("utf-8"))
        self.aes = AESGCM(self.key)

    def zu(self, klar: bytes) -> bytes:
        iv = hmac.new(self.key, b"iv" + klar, hashlib.sha256).digest()[:12]
        return iv + self.aes.encrypt(iv, klar, None)


# ─────────────────────────── Hefteinträge aus Markdown ───────────────────────────

def bereich(text: str, quelle: dict) -> list[str]:
    zeilen = text.splitlines()
    if quelle.get("abschnitt"):
        start = next(i for i, z in enumerate(zeilen) if z.startswith(quelle["abschnitt"]))
        ende = next((i for i in range(start + 1, len(zeilen)) if zeilen[i].startswith("## ")), len(zeilen))
        zeilen = zeilen[start + 1:ende]
    zeilen = zeilen[:next((i for i, z in enumerate(zeilen) if z.startswith(("### Lösung", "**Vorne liegt", "**Am Stundenende"))), len(zeilen))] \
        if quelle.get("abschnitt") else zeilen
    if quelle.get("bis"):
        zeilen = zeilen[:next((i for i, z in enumerate(zeilen) if z.startswith(quelle["bis"])), len(zeilen))]
    return [re.sub(r"^>\s?", "", z).rstrip() for z in zeilen]


def zellen(z: str) -> list[str]:
    return [c.strip() for c in z.strip().strip("|").split("|")]


# Zeilen einer Lösung, die die Lehrkraft beschreiben, nicht das Heft (GPG8a: „Gedruckt: …“, „Von Hand oben: …“)
META = re.compile(r"^(Erzeugt|Quelle|Gedruckt|Von Hand oben|Die Felder|Überschrift|Darüber|Das Heft, wie|Lösungen auf|Lösung —|"
                  r"Urteilszeile|Ich hätte|Hefteintrag \(von Hand|Vorne liegt|Am Stundenende|Steht in )", re.I)


def heft_aus_werkauftrag(pfad: Path) -> list[dict]:
    """Hefteintrag aus der Hefteintrag-Folie des Deck-Auftrags (`ue0n.werkauftrag.json`, Rolle `hefteintrag` mit Stichpunkten).
    WiB6b hat keine Einkleber: Der Eintrag steht dort als Stichpunkte und Merksatz. Nur auf Anforderung der Auswahl
    (`heft: [{"werkauftrag": "<Datei>"}]`), nie als Vorgabe: GPG-Kurse bleiben unverändert."""
    d = json.loads(pfad.read_text(encoding="utf-8"))
    folien = [f for f in d.get("folien", []) if f.get("rolle") == "hefteintrag" and f.get("punkte")]
    return [{"titel": f.get("ueberschrift") if len(folien) > 1 else None, "kopf": None, "zeilen": [],
             "antwort": f.get("merksatz") or None, "saetze": [], "punkte": [pk["text"] for pk in f["punkte"]]} for f in folien]


def heft_teile(quelle: dict, ordner: Path) -> list[dict]:
    if quelle.get("werkauftrag"):
        return heft_aus_werkauftrag(ordner / quelle["werkauftrag"])
    text = (ordner / quelle["datei"]).read_text(encoding="utf-8")
    zeilen = bereich(text, quelle)
    if quelle.get("nur_satz"):
        satz = next(z.split(quelle["nur_satz"], 1)[1].strip() for z in zeilen if quelle["nur_satz"] in z)
        return [{"titel": None, "kopf": None, "zeilen": [], "antwort": satz, "saetze": [], "punkte": []}]
    teile, t, tab = [], None, []

    def neu(titel=None):
        nonlocal t
        if t and (t["zeilen"] or t["antwort"] or t["punkte"]):
            teile.append(t)
        t = {"titel": titel, "kopf": None, "zeilen": [], "antwort": None, "saetze": [], "punkte": []}

    def tabelle_schliessen():
        nonlocal tab
        if tab:
            rows = [zellen(r) for r in tab if not re.fullmatch(r"\|?[\s:|-]+\|?", r.strip())]
            kopf, body = rows[0], rows[1:]
            rest = []
            for r in body:
                if r[0] == "Antwort":
                    t["antwort"] = " ".join(c for c in r[1:] if c)
                elif r[0] in quelle.get("saetze", {}):
                    label = quelle["saetze"][r[0]]  # "Label" oder ["Label", "Text für die Klasse statt der Erwartung"]
                    t["saetze"].append(tuple(label) if isinstance(label, list) else (label, " ".join(r[1:])))
                else:
                    rest.append(r)
            sep = quelle.get("umklappen")
            if sep and rest and all(sep in r[0] for r in rest):
                # Einkleber mit zwei Seiten, deren Zeilen verschieden sind: je Seite eine eigene Liste
                gruppen: dict[str, list] = {}
                for r in rest:
                    seite_, reihe = (x.strip() for x in r[0].split(sep, 1))
                    gruppen.setdefault(seite_, []).append([re.sub(r"\s{2,}", " – ", reihe), r[1]])
                saetze, t["saetze"] = t["saetze"], []
                for i, (seite_, zs) in enumerate(gruppen.items()):
                    if i:
                        neu()
                    t.update({"titel": seite_, "kopf": ["", "Lösung"], "zeilen": zs, "seite": seite_von(seite_)})
                t["saetze"] = saetze
                tab = []
                return
            if kopf[0] in ("Feld", "Reihe", "Zeile"):
                kopf[0] = ""
            t["kopf"], t["zeilen"] = kopf, t["zeilen"] + rest
        tab = []

    neu()
    for z in zeilen:
        if z.startswith("|"):
            tab.append(z)
            continue
        tabelle_schliessen()
        s = z.strip()
        if not s:
            continue
        punkt = re.match(r"^(?:[-*]|\d+\.)\s+(.*)$", s)
        inhalt = re.sub(r"\s*\[Sätze?[^\]]*\]", "", punkt.group(1) if punkt else s).strip()
        nackt = inhalt.replace("**", "")
        antwort = re.search(r"\b(Antwortsatz|Antwort|Merksatz)\b[^:]{0,40}:\s*(.+)$", nackt)
        if s.startswith("## "):
            neu(s[3:].strip())
        elif s.startswith("#") or META.match(nackt):
            continue
        elif antwort and not antwort.group(2).lower().startswith("frei"):
            t["antwort"] = antwort.group(2).strip().strip("*_ ").strip("„“\"")
        elif re.fullmatch(r"\*\*[^*]+\*\*:?", s):
            if t["zeilen"] or t["punkte"]:
                neu(s.strip("*:"))
            else:
                t["titel"] = s.strip("*:")
        elif punkt:
            if not re.search(r":\**\s*frei\b", inhalt):
                t["punkte"].append(inhalt)
        elif t["zeilen"] and not t["antwort"] and not s.startswith(("Erzeugt", "Quelle", "*")):
            t["antwort"] = s
    tabelle_schliessen()
    neu()
    return teile


def inline(s: str) -> str:
    return re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", e(s))


WEST = ("usa", "brd", "west", "truman")
OST = ("sowjetunion", "ddr", "ost", "schdanow")


def seite_von(k: str) -> str:
    k = k.lower()
    return "west" if any(w in k for w in WEST) else "ost" if any(o in k for o in OST) else ""


def heft_html(teile: list[dict]) -> str:
    out = []
    for t in teile:
        out.append(f'<div class="heft-teil{" s-" + t["seite"] if t.get("seite") else ""}">')
        if t["titel"]:
            out.append(f'<h3 class="heft-titel">{inline(t["titel"])}</h3>')
        if t["zeilen"] and len(t["kopf"]) == 2 and t["kopf"][1] in ("Lösung", "Erwartete Antwort"):
            out.append(f'<dl class="heft-l s-{t.get("seite", "")}">' + "".join(
                f'<div><dt>{inline(r[0])}</dt><dd>{inline(r[1])}</dd></div>' for r in t["zeilen"]) + "</dl>")
        elif t["zeilen"]:
            kopf = t["kopf"]
            th = "".join(f'<th scope="col" class="s-{seite_von(k)}">{inline(k)}</th>' for k in kopf[1:])
            body = "".join(
                "<tr>" + f'<th scope="row">{inline(r[0])}</th>'
                + "".join(f'<td class="s-{seite_von(kopf[i + 1])}" data-label="{e(kopf[i + 1])}">{inline(c)}</td>'
                          for i, c in enumerate(r[1:]))
                + "</tr>" for r in t["zeilen"])
            out.append(f'<table class="heft-t"><thead><tr><td></td>{th}</tr></thead><tbody>{body}</tbody></table>')
        for label, satz in t["saetze"]:
            out.append(f'<p class="heft-satz"><span class="lbl">{e(label)}</span>{inline(satz)}</p>')
        if t["antwort"]:
            out.append(f'<p class="antwort"><span class="lbl">Antwortsatz</span>{inline(t["antwort"])}</p>')
        out.append("</div>")
    return "\n".join(out)


def heft_text(teile: list[dict]) -> str:
    """Klartext des Hefts für den Lernbegleiter."""
    out = []
    for t in teile:
        if t["titel"]:
            out.append(f"## {t['titel']}")
        kopf = t["kopf"] or []
        for r in t["zeilen"]:
            if len(kopf) == 2:
                out.append(f"- {r[0]}: {r[1]}")
            else:
                out.append(f"- {r[0]}: " + " | ".join(f"{kopf[i + 1]}: {c}" for i, c in enumerate(r[1:])))
        for pk in t.get("punkte", []):
            out.append(f"- {pk}")
        for label, satz in t["saetze"]:
            out.append(f"- {label}: {satz}")
        if t["antwort"]:
            out.append(f"Antwortsatz: {t['antwort']}")
    return "\n".join(re.sub(r"\*\*", "", z) for z in out)


def herkunft(ordner: Path) -> list[list[str]]:
    p = ordner / "bilder" / "HERKUNFT.md"
    if not p.is_file():
        return []
    rows = []
    for z in p.read_text(encoding="utf-8").splitlines():
        if z.startswith("| `") or z.startswith("| (") or re.match(r"^\| `", z):
            c = zellen(z)
            if len(c) >= 5:
                rows.append([c[1], c[2], c[4]])
    return rows


# ─────────────────────────── Dateien (Bilder, PDFs) ───────────────────────────

class Ablage:
    """Legt verschlüsselte Dateien unter k/<kurs>/dateien/ ab; Name = Hash des Klartexts."""

    def __init__(self, tresor: Tresor, ziel: Path):
        self.t, self.ziel, self.benutzt = tresor, ziel, set()
        self.seite: list[str] = []   # Dateien der Seite, die gerade entsteht (für den Stand)
        ziel.mkdir(parents=True, exist_ok=True)

    def ablegen(self, klar: bytes, endung: str) -> str:
        name = hashlib.sha256(self.t.key + klar).hexdigest()[:20] + endung + ".bin"
        p = self.ziel / name
        if not p.is_file():
            p.write_bytes(self.t.zu(klar))
        self.benutzt.add(name)
        self.seite.append(name)
        return name

    def aufraeumen(self) -> int:
        alt = [p for p in self.ziel.glob("*.bin") if p.name not in self.benutzt]
        for p in alt:
            p.unlink()
        return len(alt)


def seiten_bilder(pdf: Path, breite: int, qualitaet: int) -> list[bytes]:
    with tempfile.TemporaryDirectory() as tmp:
        r = subprocess.run(["pdftoppm", "-jpeg", "-jpegopt", f"quality={qualitaet}", "-scale-to", str(breite),
                            str(pdf), f"{tmp}/s"], capture_output=True, text=True)
        if r.returncode != 0:
            sys.exit(f"pdftoppm scheitert an {pdf}: {r.stderr}")
        return [p.read_bytes() for p in sorted(Path(tmp).glob("s-*.jpg"), key=lambda p: int(p.stem.split("-")[1]))]


# ─────────────────────────── Lernbegleiter ───────────────────────────

REGELN = """You are a friendly learning companion for a student about 14-15 years old in 9th grade at a Bavarian Mittelschule, who is revising history for a short test ("Probe"). The class is mixed: some read German well, some are still learning it. These rules never bend:
1. ANSWER ONLY in German, in short, plain, everyday sentences.
2. The student's notebook entry ("Heft") below is what the student must know. Help the student learn it: ask questions, listen, give feedback.
3. If the student is curious and asks for MORE - background, what happened before or after, what a word means, how people lived then - you MAY explain beyond the notebook with well-established facts, in a bit more detail than you would for younger students. Say clearly when something goes beyond the notebook ("Das steht nicht in deinem Heft, aber ..."). Never invent quotes or numbers; if you are not sure, say so honestly.
4. Present East and West fairly, with their claims and their reality. Never say which state was better; the student's own judgement counts. When asked for your opinion, ask back what the student thinks and why.
5. Never ask for the student's name or other personal information."""

WIE = """<HOW TO TALK>
- FIRST reply (2-3 sentences): greet briefly, name the topic in everyday words, and offer three ways to go on: (a) "Frag mich ab", (b) "Erklär mir etwas", (c) "Ich übe den Antwortsatz". Then wait.
- (a) Quiz: one question per turn. Start easy (Wer? Was? Wann?), then ask Warum- and Vergleich-questions. After each answer: say what is right, correct gently, add one small detail. After 4-5 questions give a short summary of what sits and what to repeat.
- (b) Explain step by step, one idea per turn, with an everyday comparison from a teenager's life, then one short question back.
- (c) Ask the student to write the answer to the lesson question in one sentence with "weil". Compare it with the notebook's answer sentence and give ONE concrete tip to improve it. Do not just hand over the notebook sentence.
- Explain every hard word (z. B. Planwirtschaft, Imperialisten, Reparationen) in plain words.
- Praise concrete thinking, not constantly.
</HOW TO TALK>

Remember: German only, short sentences, the notebook is the core, curiosity welcome, no verdict. Begin now with your short opening."""


def uebungsfragen(pool: list | None) -> str:
    """Fragen aus dem Pool der Probe für den Lernbegleiter (Lehrkraft 18.11.: KI-Hilfe auf das Üben zur Probe umbauen): die KI
    fragt sie ab, die Erwartung ist nur für sie."""
    if not pool:
        return ""
    zeilen = []
    for nr, block, art, form, typ, mat, frage, pkt, el, wo, vert in pool:
        if vert:
            continue
        zeilen.append(f"- ({pkt} P) {(mat + ' ') if mat else ''}{frage} || expected: " + "; ".join(x for x in el if not x.startswith("(")))
    return ("\n\n<PRACTICE QUESTIONS - from the real test pool. For option (a) ask THESE, one per turn, in mixed order, in the student's "
            "words of the notebook. The expected points are for you only: never show them before the student has answered; after "
            "the answer, say which points the student has and give a hint for each missing one, then the next question.>\n"
            + "\n".join(zeilen) + "\n</PRACTICE QUESTIONS>")


def prompt_stunde(st: dict, datum: str, teile: list[dict], pool: list | None = None) -> str:
    return (f"{REGELN}\n\n<LESSON>\nDate: {datum}\nTopic: {st['titel']}\nLesson question: {st.get('frage', '')}\n</LESSON>\n\n"
            f"<NOTEBOOK>\n{heft_text(teile)}\n</NOTEBOOK>{uebungsfragen(pool)}\n\n{WIE}\n")


def prompt_sequenz(s: dict, probe: str, stunden: list[tuple[dict, str, list[dict]]], pool: list | None = None) -> str:
    teile = "\n\n".join(f"### {datum}: {st['titel']} – {st.get('frage', '')}\n{heft_text(t)}" for st, datum, t in stunden)
    return (f"{REGELN}\n\n<TEST>\nThe test is on {probe}. Topic of the unit: {s['titel']}. Unit question: {s.get('frage', '')}\n"
            "Quiz across ALL lessons below, mixed, and also ask questions that connect two lessons "
            "(z. B. what a state promised on paper and what people experienced).\n</TEST>\n\n"
            f"<NOTEBOOK>\n{teile}\n</NOTEBOOK>{uebungsfragen(pool)}\n\n{WIE}\n")


def ki_knopf(text: str, prompt: str) -> str:
    return (f'<div class="ki"><button type="button" class="knopf-neben ki-knopf" data-ki="{e(prompt)}">{e(text)}</button>'
            '<span class="ki-hinweis">öffnet duck.ai mit deinem Hefteintrag · schreib keinen Namen hinein</span></div>')


# ─────────────────────────── Seiten ───────────────────────────
# Zwei Seitenarten (Lehrkraft 14.11.2026): Kursseite = das Jahr (Ebene 1) und darunter die Stunden der laufenden
# Sequenz (Ebene 2, der Einstieg); Stundenseite = eine Stunde in Ruhe (Heft, Erarbeitung, Folien), oben die Ebene 2
# klein zum Weiterschalten. Formen wie in der Ansicht Kurs der Matrixe (oberflaeche/stil.css): gehalten grau mit ✓,
# kommt gestrichelt, hier dicker Rahmen, Probe unten dunkel. Was nur die Lehrkraft braucht, steht nicht da.

def datum_kurz(iso: str) -> str:
    import datetime as dt
    d = dt.date.fromisoformat(iso)
    return f"{WOCHENTAGE[d.weekday()]} {d.day:02d}.{d.month:02d}."


def datum_hand(iso: str) -> str:
    import datetime as dt
    d = dt.date.fromisoformat(iso)
    return f"{d.day:02d}.{d.month:02d}.{d.year}"


MONATE = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]


def monate(zeitraum: str) -> str:
    """„01.10.–20.11.2026“ → „Oktober bis November“; „Feb.–11.03.2027“ → „Februar bis März“. Kinder brauchen den Monat, nicht den Tag."""
    gefunden = []
    for teil in re.split(r"[–-]| bis ", zeitraum):
        m = re.search(r"\d{1,2}\.(\d{1,2})\.", teil)
        name = MONATE[int(m.group(1)) - 1] if m else next((x for x in MONATE if re.search(r"\b" + x[:3].lower(), teil.lower())), None)
        if name and name not in gefunden:
            gefunden.append(name)
    return " bis ".join(gefunden[:2]) if gefunden else ""


def stunden_leiste(stunden: list[dict], hier: str | None, aktuell: str | None, zu: str, gross: bool) -> str:
    """Ebene 2. gross: Kacheln mit Datum und Titel (Kursseite); sonst kleine Felder (Stundenseite)."""
    out = []
    for st in stunden:
        probe = st.get("art") == "probe"
        z = "p" if probe else "o" if st.get("kommt") else "g"
        kl = f"sf {z}" + (" hier" if st["id"] == hier else "") + (" ist" if st["id"] == aktuell else "")
        titel = "Probe" if probe else st["titel"]
        inhalt = (f'<span class="d">{e(datum_kurz(st["datum"]))}{" ✓" if z == "g" and not st.get("heute") else ""}</span>'
                  f'<span class="t">{e(titel)}</span>') if gross else ("✓" if z == "g" and not st.get("heute") else "")
        tip = f'{datum_kurz(st["datum"])} · {titel}'
        offen = (z == "g" and not st.get("ohne_seite")) or probe
        cur = ' aria-current="page"' if st["id"] == aktuell else ""
        if offen:
            out.append(f'<a class="{kl}" href="{zu}{st["id"]}/" title="{e(tip)}"{cur}>{inhalt}</a>')
        else:
            out.append(f'<span class="{kl}" title="{e(tip)}">{inhalt}</span>')
    return f'<nav class="seq-leiste{" gross" if gross else ""}" aria-label="Stunden">{"".join(out)}</nav>'


def schale(titel: str, tiefe: str, kurs: str, salz: str, payload: str, v: dict, kurs_titel: str, start: str) -> str:
    return f"""<!DOCTYPE html>
{MARKE}
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>{e(titel)}</title>
<link rel="stylesheet" href="{tiefe}unterricht/k/klassenbereich.css?v={v['klassenbereich.css']}">
</head>
<body>
<header class="kopf"><a class="kurs" href="{start}">{e(kurs_titel)}</a><span class="rechts"><button type="button" id="kb-abmelden" hidden>Abmelden</button></span></header>
<main id="kb" data-kurs="{e(kurs)}" data-salz="{e(salz)}" data-iter="{ITER}">
  <form class="tor" id="kb-tor" hidden>
    <h1>{e(kurs_titel)}</h1>
    <p>Gib das Passwort ein, das du in der Stunde bekommen hast. Dein Gerät merkt es sich.</p>
    <label for="kb-pw">Passwort</label>
    <div class="tor-zeile"><input id="kb-pw" type="password" autocomplete="current-password" autocapitalize="none" spellcheck="false" required><button type="submit" class="knopf-haupt">Öffnen</button></div>
    <p class="fehler" id="kb-fehler" role="alert"></p>
  </form>
  <noscript><p>Diese Seite braucht JavaScript.</p></noscript>
  <div id="kb-seite"></div>
</main>
<footer class="fuss"><a href="{tiefe}impressum/">Impressum</a> · <a href="{tiefe}datenschutz/">Datenschutz</a></footer>
<script type="application/octet-stream" id="kb-inhalt">{payload}</script>
<script src="{tiefe}unterricht/k/klassenbereich.js?v={v['klassenbereich.js']}"></script>
</body>
</html>
"""


def zuschneiden(png: bytes, block: bool = False) -> bytes:
    """Weißen Rand um einen Einkleber abschneiden (A5-PDF mit leerer unterer Hälfte, PNG mit Rand). block: nur den größten
    zusammenhängenden Inhalt behalten (Vordruck auf einer A4-Seite mit Schnittlinie weit darunter, GPG8a 29.09.)."""
    import io
    from PIL import Image, ImageChops, ImageOps
    im = Image.open(io.BytesIO(png)).convert("RGB")
    maske = ImageChops.difference(im, Image.new("RGB", im.size, (255, 255, 255))).convert("L").point(lambda x: 255 if x > 18 else 0)
    if block:
        zeilen = [maske.crop((0, y, im.width, y + 1)).getbbox() is not None for y in range(im.height)]
        bloecke, start, leer = [], None, 0
        for y, voll in enumerate(zeilen + [False] * 81):
            if voll:
                start = y if start is None else start
                leer = 0
            elif start is not None:
                leer += 1
                if leer > 80:
                    bloecke.append((start, y - leer + 1))
                    start, leer = None, 0
        if bloecke:
            oben, unten = max(bloecke, key=lambda b: sum(zeilen[b[0]:b[1]]))
            im, maske = im.crop((0, oben, im.width, unten)), maske.crop((0, oben, im.width, unten))
    box = maske.getbbox()
    if box:
        r = 16
        im = im.crop((max(0, box[0] - r), max(0, box[1] - r), min(im.width, box[2] + r), min(im.height, box[3] + r)))
    out = io.BytesIO()
    im.save(out, "JPEG", quality=82)
    return out.getvalue()


def einkleber_bilder(a: dict, ordner: Path) -> list[bytes]:
    out = []
    for b in a.get("heft_bild", []):
        if "bild" in b:
            out.append(zuschneiden((ordner / b["bild"]).read_bytes(), block=bool(b.get("vordruck"))))
        else:
            if "bau" in b:
                # Ergebnis zwischengespeichert (Schlüssel: Befehl und Inhalt der genannten Dateien), damit nicht jeder Bau
                # LibreOffice braucht; LibreOffice läuft unter der Sperre des Werkzeugkastens (nur eines zur Zeit).
                cmd0 = [x.replace("{ordner}", str(ordner)) for x in b["bau"]]
                h = hashlib.sha256(json.dumps(cmd0).encode())
                for x in cmd0:
                    q = Path(x) if Path(x).is_absolute() else REPO / x
                    for f in ([q] if q.is_file() else sorted(q.glob("*.py")) + sorted(q.glob("*.js")) if q.is_dir() else []):
                        h.update(f.read_bytes())
                cache = Path.home() / ".cache" / "weitergehts" / "einkleber" / f"{h.hexdigest()[:24]}.pdf"
                if not cache.is_file():
                    cache.parent.mkdir(parents=True, exist_ok=True)
                    sperre = Path("/Users/paulad/werkzeugkasten/out/.lauf.lock")
                    vor = ["/usr/bin/lockf", "-k", str(sperre)] if sperre.parent.is_dir() else []
                    r = subprocess.run(vor + cmd0 + [str(cache)], cwd=REPO, capture_output=True, text=True,
                                       env={**os.environ, "WERKZEUGKASTEN_SPERRE": "1"})
                    if r.returncode != 0 or not cache.is_file():
                        sys.exit(f"Einkleber-Bau scheitert ({' '.join(cmd0)}): {r.stderr}{r.stdout}")
                seiten = seiten_png(cache, 1600)
            else:
                seiten = seiten_png(ordner / b["pdf"], 1600)
            out.append(zuschneiden(seiten[0]))
    return out


def seiten_png(pdf: Path, breite: int) -> list[bytes]:
    with tempfile.TemporaryDirectory() as tmp:
        r = subprocess.run(["pdftoppm", "-png", "-scale-to", str(breite), str(pdf), f"{tmp}/s"], capture_output=True, text=True)
        if r.returncode != 0:
            sys.exit(f"pdftoppm scheitert an {pdf}: {r.stderr}")
        return [p.read_bytes() for p in sorted(Path(tmp).glob("s-*.png"), key=lambda p: int(p.stem.split("-")[1]))]


def hand_tabelle(t: dict) -> str:
    """Ein Raster, wie es die Klasse von Hand ins Heft schreibt (ohne Einkleber, GPG9a 08.10.)."""
    kopf = t["kopf"]
    th = "".join(f"<th>{inline(k)}</th>" for k in kopf[1:])
    body = "".join(f'<tr data-reihe="{e(_norm(r[0]))}"><th>' + inline(r[0]) + "</th>" + "".join(f"<td>{inline(c)}</td>" for c in r[1:])
                   + "</tr>" for r in t["zeilen"])
    return f'<table class="hand-t"><thead><tr><td></td>{th}</tr></thead><tbody>{body}</tbody></table>'


def heftseite(st: dict, a: dict, teile: list[dict], bilder: list[str]) -> str:
    vordruck = any(b.get("vordruck") for b in a.get("heft_bild", []))
    """Die Heftseite: Karopapier, Datum und Frage von Hand, der Einkleber, der Antwortsatz von Hand."""
    out = ['<div class="heft">', f'<p class="h-datum">{e(datum_hand(st["datum"]))}</p>']
    titel_je_teil = len(bilder) > 1 and len(bilder) == len(teile) and all(t["titel"] for t in teile)
    if not titel_je_teil:
        out.append(f'<p class="h-frage">{e(st.get("frage", st["titel"]))}</p>')
    if a.get("hinweis"):
        out.append(f'<p class="h-hinweis">{e(a["hinweis"])}</p>')
    antworten_von_hand = not a.get("antwort_im_einkleber")
    if bilder:
        for i, src in enumerate(bilder):
            if titel_je_teil:
                out.append(f'<p class="h-frage">{inline(teile[i]["titel"])}</p>')
            out.append(f'<figure class="einkleber"><img data-kb-src="{src}" data-kb-typ="image/jpeg" '
                       f'alt="Einkleber, ausgefüllt"></figure>')
    if not bilder or vordruck:
        for t in teile:
            if t["titel"]:
                out.append(f'<p class="h-titel">{inline(t["titel"])}</p>')
            if t["zeilen"]:
                out.append(hand_tabelle(t))
            if t.get("punkte"):
                out.append('<ul class="hand-l">' + "".join(f"<li>{inline(pk)}</li>" for pk in t["punkte"]) + "</ul>")
    if antworten_von_hand:
        for t in teile:
            if t["antwort"]:
                out.append(f'<p class="h-antwort" data-ziel="antwort">{inline(t["antwort"])}</p>')
    out.append("</div>")
    return "\n".join(out)


def kopfzeile(stunden, hier, aktuell, i_vor, i_nach, seq) -> str:
    vor = (f'<a class="pfeil" href="../{i_vor["id"]}/" aria-label="Stunde davor" rel="prev">‹</a>' if i_vor
           else '<span class="pfeil aus">‹</span>')
    nach = (f'<a class="pfeil" href="../{i_nach["id"]}/" aria-label="Stunde danach" rel="next">›</a>' if i_nach
            else '<span class="pfeil aus">›</span>')
    return (f'<div class="oben"><a class="zurueck" href="../../#{seq}">‹ Unser Jahr</a>'
            f'<div class="schalter">{vor}{stunden_leiste(stunden, None, aktuell, "../", False)}{nach}</div></div>')  # klein: nur „diese Stunde“ markiert


MATRIXE_LESER = Path("/Users/paulad/die-matrixe/werkzeuge/oberflaeche.py")


def matrixe_leser():
    """Die Leser für Sequenzplan und Jahresplan aus der Matrixe (nur lesend importiert): eine Stelle, die die Pläne der
    Lehrkraft versteht, statt einer zweiten hier (Lehrkraft 14.11.2026, Stufe 2)."""
    spec = importlib.util.spec_from_file_location("matrixe_oberflaeche", MATRIXE_LESER)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


# Nicht in die Erarbeitung: was ins Heft gehört (Einkleber, Heft-Vordrucke), was nicht von der Lehrkraft ist (Kollegin), was nur
# Einzelne betrifft (Vortrag, Namensschild, Notfall-Ersatz ohne iPad), Leistungsnachweise und Graufassungen für den Kopierer.
AUSSCHLUSS_BLAETTER = ["Einkleber", "Kollegin", "Wochenrueckblick", "_grau", "Mitschreiben", "Karten_", "Hefteintrag", "_Heft",
                       "Namensschild", "Notfall", "LN_", "Vortrag", "Zuhoeren", "Dilemma"]
ARTEN_BLATT = [("Beobachtungsbogen", "Beobachtungsbogen"), ("Vertiefung", "Für Schnelle"), ("AB_", "Arbeitsblatt")]


def pdf_titel(pdf: Path) -> str:
    """Die Überschrift auf Seite 1 eines Blatts (nach Kopfzeile „GPG · Datum …“ und „Name:“), sonst leer."""
    r = subprocess.run(["pdftotext", "-l", "1", str(pdf), "-"], capture_output=True, text=True)
    zeilen = [z.strip() for z in r.stdout.splitlines() if z.strip()]
    nach_name = next((zeilen[i + 1] for i, z in enumerate(zeilen[:-1]) if z.startswith("Name:")), "")
    if nach_name and len(nach_name) <= 70:   # Blätter des Bauwegs: die Überschrift steht unter „Name:“
        return nach_name.replace("–", "-").replace(" - ", " – ")
    for z in r.stdout.splitlines():
        z = z.strip()
        if not z or " · " in z or z.startswith(("Name:", "✂", "hier ")) or len(z) > 70 or len(z.split()) < 2:
            continue
        return z.replace("–", "-").replace(" - ", " – ")
    return ""


def blatt_titel(name: str) -> tuple[str, str]:
    """„25x_doppelseitig_AB_Zwei-Reden-1947.pdf“ → („Arbeitsblatt: Zwei Reden 1947“, „Arbeitsblatt“)."""
    n = re.sub(r"^\d+x_(einseitig|doppelseitig)_", "", Path(name).stem)
    n = re.sub(r"_A5-.*$", "", n)
    art = next((a for k, a in ARTEN_BLATT if k in n), "Blatt")
    rest = re.sub(r"^(AB|Beobachtungsbogen)_", "", n).replace("_", " ").replace("-", " ").strip()
    rest = rest[:1].upper() + rest[1:]
    return (f"{art}: {rest}" if art != "Blatt" else rest), art


def planung_kopf(ordner: Path) -> tuple[str, str]:
    """Titel und Stundenfrage aus dem Kopf der PLANUNG.md („# Stunde: Kurs · Datum · UE nn … · Titel“, „Stundenfrage: …“)."""
    p = ordner / "PLANUNG.md"
    if not p.is_file():
        return "", ""
    titel = frage = ""
    for z in p.read_text(encoding="utf-8").splitlines()[:12]:
        if z.startswith("# Stunde:") and not titel:
            titel = z.split(" · ")[-1].strip()
            titel = re.sub(r"\s*\((vorne|Doppelstunde)[^)]*\)", "", titel).strip()
        m = re.match(r"\*{0,2}Stundenfrage\*{0,2}:\*{0,2}\s*(.+)", z.strip())
        if m and not frage:
            frage = re.sub(r"\s*\*\(.*$", "", m.group(1)).replace("**", "").strip().strip("„“\" ")
    return titel, frage


def stunde_auto(ordner: Path, ueber: dict, materialien_der_stunde: list[dict]) -> dict:
    """Was zu einer Stunde gehört, aus ihrem Ordner in der Welt abgeleitet; `ueber` (Auswahl je Stunde) überschreibt Feld für
    Feld. Abgeleitet: Hefteintrag (Lösung des Einklebers oder Hefteintrags, sonst § Sicherung der Planung), der ausgefüllte
    Einkleber als Bild (bilder/einkleber_loesung.png, sonst LOESUNG_Einkleber*.pdf), die Blätter der Klasse aus drucken/ ohne
    Einkleber und fremdes Material, die Folien (folien.pdf oder <Datum>_<Kurs>_*.pdf), das iPad-Material zum Blatt."""
    a: dict = {}
    ek, he = sorted(ordner.glob("LOESUNG_Einkleber*.md")), sorted(ordner.glob("LOESUNG_Hefteintrag*.md"))
    md = he if (len(ek) > 1 and he) else (ek or he)   # zwei Einkleber (16.10.): die Lösung des ganzen Hefteintrags
    if md:
        a["heft"] = [{"datei": md[0].name}]
    elif (ordner / "PLANUNG.md").is_file() and "## Sicherung" in (ordner / "PLANUNG.md").read_text(encoding="utf-8"):
        a["heft"] = [{"datei": "PLANUNG.md", "abschnitt": "## Sicherung", "bis": "**Vorne liegt"}]
    else:
        a["heft"] = []
    # Was im Heft klebt: zuerst das ausgefüllte Bild (Lösung des Einklebers, gefülltes Tafelbild), sonst der gedruckte Vordruck
    # (Bild-Zeitleiste, Kette), zu dem dann die Punkte von Hand erscheinen (GPG8a 29.09., 06.10.)
    gefuellt = next((f"bilder/{n}" for n in ("einkleber_loesung.png", "tafel_voll.png", "hefteintrag_tafel.png")
                     if (ordner / "bilder" / n).is_file()), None)
    if gefuellt:
        a["heft_bild"] = [{"bild": gefuellt}]
    elif (pdfs := sorted(ordner.glob("LOESUNG_Einkleber*.pdf"))):
        a["heft_bild"] = [{"pdf": p.name} for p in pdfs]
    else:
        vordruck = sorted((ordner / "drucken").glob("*_Heft.png")) + sorted((ordner / "bilder").glob("*heftstreifen*.png"))
        a["heft_bild"] = [{"bild": str(p.relative_to(ordner)), "vordruck": True} for p in vordruck[:1]]
    if len(a["heft_bild"]) > 1:
        a["antwort_im_einkleber"] = True
    blaetter = []
    werkzeuge = [m for m in materialien_der_stunde if not m["pfad"].startswith("zeitkarte/")]
    for p in sorted((ordner / "drucken").glob("*.pdf")) if (ordner / "drucken").is_dir() else []:
        if any(x.lower() in p.name.lower() for x in AUSSCHLUSS_BLAETTER) or p.name.endswith("_farbe.pdf"):
            continue
        titel, art = blatt_titel(p.name)
        kopf = pdf_titel(p)
        if kopf:
            titel = kopf if kopf.split()[0].lower() == art.split()[0].lower() or art == "Blatt" else f"{art}: {kopf}"
        blaetter.append({"datei": f"drucken/{p.name}", "titel": titel, "art": art, "zu": []})
    # iPad-Material zum Blatt: gleicher Name (West/Ost), sonst je Arbeitsblatt der Reihe nach
    frei = list(werkzeuge)
    woerter = {m["id"]: set(re.findall(r"[a-zäöü]{3,}", m["pfad"].lower())) for m in werkzeuge}
    gemeinsam = set.intersection(*woerter.values()) if len(woerter) > 1 else set()
    for b in blaetter:
        if b["art"] != "Arbeitsblatt":
            continue
        name = b["datei"].lower()
        wertung = [(sum(w in name for w in woerter[m["id"]] - gemeinsam), m) for m in frei]
        bester = max(wertung, key=lambda x: x[0], default=(0, None))
        einziges = sum(1 for x in blaetter if x["art"] == "Arbeitsblatt") == 1
        treffer = bester[1] if bester[0] else (frei[0] if frei and einziges else None)
        if treffer:
            b["zu"] = [treffer["id"]]
            frei.remove(treffer)
    a["blaetter"] = blaetter
    folien = [ordner / "folien.pdf"] if (ordner / "folien.pdf").is_file() else sorted(ordner.glob("20??-??-??_*.pdf"))
    if folien:
        a["folien"] = folien[0].name
    a.update(ueber)
    return a


def struktur(kurs: str, auswahl: dict, daten: dict, welt: Path) -> tuple[list[dict], list[dict]]:
    """Sequenzen mit ihren Stunden und das Jahr. Trägt kurse.json für den Kurs `sequenzen`, gilt diese Struktur (von Hand,
    GPG9a seit 13.11.); sonst kommt sie aus Jahresplan und Sequenzplänen der Welt (Leser der Matrixe)."""
    M = matrixe_leser()
    aus = auswahl.get("ausblenden", [])
    jp = M.jahresplan_sequenzen(welt / auswahl.get("jahresplan", "JAHRESPLAN.md"))
    reihe = []
    if daten.get("sequenzen", {}).get(kurs):
        for s in daten["sequenzen"][kurs]["reihe"]:
            if s["id"] in aus:
                continue
            ordner = (auswahl.get("sequenzen", {}).get(s["id"], {}).get("ordner")
                      or next((x["ordner"] for x in jp if x["nr"].lower() == s["id"]), ""))
            reihe.append({**s, "ordner": welt / ordner if ordner else None,
                          "stunden": [st for st in s["stunden"] if f"{s['id']}/{st['id']}" not in aus]})
    else:
        for x in jp:
            sid = x["nr"].lower()
            if sid in aus or not x["ordner"] or not (welt / x["ordner"] / "SEQUENZPLAN.md").is_file():
                continue
            plan = welt / x["ordner"] / "SEQUENZPLAN.md"
            zeilen = M.sequenzplan_zeilen(plan)
            ordner_am = {}
            for p in (welt / x["ordner"]).glob("UE*_20??-??-??_*"):
                if p.is_dir():
                    ordner_am[re.search(r"20\d\d-\d\d-\d\d", p.name).group(0)] = p
            probe_am = x["probe"]["datum"] if x["probe"] else ""
            stunden = []
            for datum in sorted(set(zeilen) | set(ordner_am)):
                z = zeilen.get(datum, {"thema": "", "frage": "", "zustand": "", "lnw": "", "ue": ""})
                if z["zustand"] == "faellt_aus":
                    continue
                f = ordner_am.get(datum)
                probe = z["lnw"] == "gross" or datum == probe_am
                gehalten = z["zustand"] == "gehalten" or bool(f and (f / "NACHBEREITUNG.md").is_file())
                if not (f or probe or z["ue"] or (z["frage"] and not gehalten)):
                    continue   # Wandertag, Praktikum, Ausblick: keine Stunde
                sid_st = (f.name.split("_")[0].lower() if f else ("ue" + z["ue"].lower() if z["ue"] else
                          ("probe-" if probe else "d") + datum))
                if f"{sid}/{sid_st}" in aus or any(st["id"] == sid_st for st in stunden):
                    continue
                p_titel, p_frage = planung_kopf(f) if f else ("", "")
                titel = "Probe" if probe else (p_titel or z["thema"] or z["frage"] or "Stunde")
                titel = titel.replace("**", "").strip()
                stunden.append({"id": sid_st, "datum": datum, "titel": titel, "frage": p_frage or z["frage"].replace("**", "").strip("„“ "),
                                "kommt": not gehalten and f"{sid}/{sid_st}" not in auswahl.get("zeigen", []),
                                **({"heute": True} if not gehalten and f"{sid}/{sid_st}" in auswahl.get("zeigen", []) else {}),
                                **({"art": "probe"} if probe else {}),
                                **({"_ordner": f.name} if f else {})})
            m = re.search(r"\*\*Sequenzfrage[^*]*\*\*:?\s*(.+)", plan.read_text(encoding="utf-8"))
            frage = auswahl.get("sequenzen", {}).get(sid, {}).get("frage") or (m.group(1).strip().strip("*") if m else "")
            if stunden:
                reihe.append({"id": sid, "titel": x["name"], "frage": frage, "ordner": welt / x["ordner"], "stunden": stunden})
    # Das Jahr: Stand nach der jüngsten gehaltenen Stunde (nicht nach dem Bautag, sonst wäre der Bau nicht wiederholbar)
    gehalten = [st["datum"] for s in reihe for st in s["stunden"] if not st.get("kommt") and st.get("art") != "probe"]
    heute = max(gehalten) if gehalten else ""
    jahr_ = []
    for x in jp:
        if x["nr"].lower() in aus:
            continue
        laufend = next((s["id"] for s in reihe if any(st.get("kommt") for st in s["stunden"])), None)
        laeuft = x["nr"].lower() == laufend
        fertig = x["abgeschlossen"] or (x["bis"] and heute and x["bis"] < heute)
        stand = "läuft" if laeuft else "fertig" if fertig else "geplant"
        probe = ""
        if x["probe"] and not x["probe"]["vorlaeufig"]:
            probe = "Probe " + datum_kurz(x["probe"]["datum"])
        jahr_.append({"id": x["nr"].lower(), "titel": x["lang"], "kurz": x["name"], "zeitraum": x["zeitraum"],
                      "probe": probe, "stand": stand, "umfang": x["ue"] or 6})
    return reihe, jahr_


def kennung(tresor: Tresor, kern: str) -> str:
    """Hash dessen, was eine Seite aus der Welt trägt, mit dem Schlüssel des Kurses (verrät nichts über den Klartext)."""
    return hmac.new(tresor.key, kern.encode("utf-8"), hashlib.sha256).hexdigest()[:16]


def hat_nachbereitung(ordner: Path) -> bool:
    """Gehalten heißt hier wie im Sitzungsstart (werkzeugkasten/core/tools/kalender/session_start.py): NACHBEREITUNG.md nicht leer."""
    try:
        return bool((ordner / "NACHBEREITUNG.md").read_text(encoding="utf-8").strip())
    except OSError:
        return False


def stand_schreiben(ziel: Path, kurs: str, welt: Path, auswahl: dict, seiten: dict) -> dict:
    """unterricht/k/<kurs>/stand.json: welche Stunde der Welt auf der Kursseite steht, ohne Inhalt. Liest der Sitzungsstart
    (meldet Stunden mit Nachbereitung, die fehlen) und make kursseite (Bericht: neu, geändert, entfernt). Nicht veröffentlicht.
      seiten     Datum → {seite, kennung}; Kennung = Hash von Heft, Blättern, Folien und Dateien der Stunde (ohne die Leiste)
      ausgespart ordner: ausgeblendete Sequenzen (gilt auch für ihre künftigen Stunden); daten: gehaltene Stunden ohne Seite"""
    aus = auswahl.get("ausblenden", [])
    jp = matrixe_leser().jahresplan_sequenzen(welt / auswahl.get("jahresplan", "JAHRESPLAN.md"))
    aus_ordner = sorted(Path(x["ordner"]).name for x in jp if x["nr"].lower() in aus and x["ordner"])
    am = {v["datum"] for k, v in seiten.items() if v.get("datum")}
    daten = set()
    for p in welt.rglob("UE*_20??-??-??_*"):
        if not p.is_dir() or "protokoll" in p.parts or any(o in p.parts for o in aus_ordner):
            continue
        m = re.search(r"_(20\d\d-\d\d-\d\d)_", p.name)
        if m and m.group(1) not in am and hat_nachbereitung(p):
            daten.add(m.group(1))
    stand = {"_comment": "Erzeugt von tools/kurse/klassenbereich.py, nicht von Hand. Nur Kennungen, kein Inhalt; nicht veröffentlicht.",
             "kurs": kurs, "welt_kurs": welt.name,
             "seiten": {k: seiten[k] for k in sorted(seiten)},
             "ausgespart": {"ordner": aus_ordner, "daten": sorted(daten)}}
    text = json.dumps(stand, ensure_ascii=False, indent=1, sort_keys=True) + "\n"
    p = ziel / "stand.json"
    if not p.is_file() or p.read_text(encoding="utf-8") != text:
        p.write_text(text, encoding="utf-8")
        print(f"geschrieben: {p.relative_to(REPO)}")
    return stand


def bauen(kurs: str, bericht: dict | None = None) -> int:
    """Baut den Klassenbereich. `bericht` (von tools/kurse/nachfuehren.py) bekommt je Seite, was sie in Worten der Stunde zeigt:
    Seite → {titel, datum, heft, blaetter, folien}; das steht nur im Speicher, nie im Repo."""
    bericht = {} if bericht is None else bericht
    auswahl = json.loads((AUSWAHL / f"{kurs}.json").read_text(encoding="utf-8"))
    welt = Path(auswahl["welt"])
    daten = build.laden()
    v = json.loads(build.VERSIONS.read_text(encoding="utf-8"))["assets"]
    g = geheim(kurs)
    tresor = Tresor(g["passwort"], g["salz"])
    ziel = UNTERRICHT / "k" / kurs
    ablage = Ablage(tresor, ziel / "dateien")
    k = daten["kurse"][kurs]
    fach = daten["faecher"][k["fach"]]
    materialien = {m["id"]: m for m in daten["materialien"] if kurs in m.get("kurse", []) and m.get("id")}
    reihe, jahrplan = struktur(kurs, auswahl, daten, welt)
    geschrieben: set[Path] = set()
    seiten: dict[str, dict] = {}   # für stand.json: Seite → {datum, kennung}

    def schreiben(rel: str, titel: str, tiefe: str, start: str, inhalt: str, kern: str | None = None,
                  datum: str = "") -> None:
        seiten[rel or "kursseite"] = {"kennung": kennung(tresor, inhalt if kern is None else kern),
                                      **({"datum": datum} if datum else {})}
        p = ziel / rel / "index.html" if rel else ziel / "index.html"
        p.parent.mkdir(parents=True, exist_ok=True)
        payload = base64.b64encode(tresor.zu(inhalt.encode("utf-8"))).decode()
        text = schale(titel, tiefe, kurs, g["salz"], payload, v, k["titel"], start)
        if not p.is_file() or p.read_text(encoding="utf-8") != text:
            p.write_text(text, encoding="utf-8")
            print(f"geschrieben: {p.relative_to(REPO)}")
        geschrieben.add(p)

    def mat_der_stunde(s, st):
        ref = f"{s['id']}/{st['id']}"
        return [m for m in materialien.values() if m.get("stunde") == ref or (not m.get("stunde") and m.get("datum") == st["datum"])]

    leisten = []   # je Sequenz die Stundenleiste der Kursseite
    for s in reihe:
        stunden = s["stunden"]
        gehalten = [st for st in stunden if not st.get("kommt") and st.get("art") != "probe"]
        hier = gehalten[-1]["id"] if gehalten else None
        offen = [st for st in stunden if not st.get("kommt") or st.get("art") == "probe"]
        gesammelt = []
        seiten_ids = set()
        pool = auswahl.get("uebung_pool", {}).get(s["id"])   # Fragen-Pool der Probe: Reiter „Üben“ auf der Probenseite
        P = pool_laden(Path(pool)) if pool else None
        hefte: dict = {}
        for st in gehalten:
            ref = f"{s['id']}/{st['id']}"
            ueber = auswahl.get("stunden", {}).get(ref, {})
            if s["ordner"] is None:
                continue
            kand = ([s["ordner"] / ueber["ordner"]] if ueber.get("ordner") else [s["ordner"] / st["_ordner"]] if st.get("_ordner") else
                    sorted(p for p in s["ordner"].glob(f"{st['id'].upper()}_{st['datum']}*") if p.is_dir()))
            if not kand:
                print(f"HINWEIS {ref}: kein Stundenordner {st['id'].upper()}_{st['datum']}_… in {s['ordner'].name} — Stunde ohne Seite")
                continue
            ordner = kand[0]
            a = stunde_auto(ordner, ueber, mat_der_stunde(s, st))
            if P:   # Fragen des Pools, die auf diese Stunde zeigen: der Lernbegleiter der Stunde fragt sie ab
                a["_pool"] = [x for x in P.POOL if any(f_[0] == ref for f_ in P.FUNDSTELLEN[x[0]])]
            teile = []
            for q in a["heft"]:
                teile += heft_teile(q, ordner)
            if not (a.get("uebung") or a.get("ohne_heft")):   # Übungsstunde oder Stunde ohne Eintrag: nicht in der Probe-Liste
                gesammelt.append((st, datum_kurz(st["datum"]), teile))
            seiten_ids.add(st["id"])
            if pool and not (a.get("uebung") or a.get("ohne_heft")):   # für das Quiz: dieselbe Heftseite, mit Texterkennung
                jpgs = einkleber_bilder(a, ordner)
                pfade = ["../../dateien/" + ablage.ablegen(j, ".jpg") for j in jpgs]
                hefte[st["id"]] = {"html": heftseite(st, a, teile, pfade), "teile": teile, "datum": datum_kurz(st["datum"]),
                                   "titel": st["titel"], "ocr": [texterkennung(j) for j in jpgs]}
            i = offen.index(st)
            ablage.seite = []
            inhalt = stundenseite(s, st, a, ordner, teile, stunden, hier, offen[i - 1] if i else None,
                                  offen[i + 1] if i + 1 < len(offen) else None, ablage, materialien, mat_der_stunde(s, st))
            kern = json.dumps({"stunde": {x: st.get(x) for x in ("titel", "frage", "datum")}, "auswahl": a, "heft": teile,
                               "dateien": ablage.seite}, ensure_ascii=False, sort_keys=True, default=str)
            schreiben(ref, f"{st['titel']} · {k['titel']}", "../../../../../", "../../", inhalt, kern, st["datum"])
            bericht[ref] = {"titel": st["titel"], "datum": st["datum"], "heft": bool(teile or a.get("heft_bild")),
                            "blaetter": len(a.get("blaetter", [])), "folien": bool(a.get("folien"))}
        mit_seite = seiten_ids
        for st in stunden:   # gehaltene Stunden ohne Ordner bekommen keinen Link
            if not st.get("kommt") and st.get("art") != "probe" and st["id"] not in mit_seite:
                st["ohne_seite"] = True

        probe = next((st for st in stunden if st.get("art") == "probe"), None)
        if probe:
            i = offen.index(probe)
            out = [kopfzeile(stunden, hier, probe["id"], offen[i - 1] if i else None, None, s["id"]),
                   f'<p class="dat">Probe · {e(datum_kurz(probe["datum"]))}</p>',
                   '<h1 class="frage">Für die Probe lernen</h1>',
                   '<p class="leise">Stoff: deine Hefteinträge. Hier steht jede Stunde mit ihrer Frage und ihrem Antwortsatz. '
                   'Tipp auf eine Stunde, um den ganzen Hefteintrag zu sehen.</p>',
                   ki_knopf("Mit KI für die Probe üben", prompt_sequenz(s, datum_kurz(probe["datum"]), gesammelt, P.POOL if pool else None)),
                   '<ol class="probe-liste">']
            if pool:
                quiz_html, quiz_fehler = quiz_bauen(P, hefte, s["id"])
                if quiz_fehler:
                    sys.exit("Quiz: Fundstellen nicht gefunden:\n  " + "\n  ".join(quiz_fehler))
                out[3:3] = ['<div class="reiter" role="tablist"><button role="tab" aria-selected="true" data-zu="ueben">Üben</button>'
                            '<button role="tab" aria-selected="false" data-zu="saetze">Antwortsätze</button></div>',
                            f'<section class="tafel" id="ueben" role="tabpanel">{quiz_html}</section>',
                            '<section class="tafel" id="saetze" role="tabpanel" hidden>']
            for st, datum, teile in gesammelt:
                antw = "".join(f'<p class="pl-antwort">{inline(t["antwort"])}</p>' for t in teile if t["antwort"])
                out.append(f'<li><a href="../{st["id"]}/"><span class="d">{e(datum)}</span>'
                           f'<span class="pl-frage">{e(st.get("frage") or st["titel"])}</span></a>{antw}</li>')
            out.append("</ol>" + ("</section>" if pool else ""))
            schreiben(f"{s['id']}/{probe['id']}", f"Probe · {k['titel']}", "../../../../../", "../../", "\n".join(out),
                      "\n".join(out[1:]), probe["datum"])   # ohne die Leiste
            bericht[f"{s['id']}/{probe['id']}"] = {"titel": "Probe", "datum": probe["datum"], "probe": True}
        leisten.append((s, hier))

    # ── Kursseite: das Jahr, darunter die Stunden einer Sequenz (Standard: die laufende) ──
    laufend = next((s for s, _ in leisten if any(st.get("kommt") for st in s["stunden"])), leisten[-1][0] if leisten else None)
    mit_stunden = {s["id"] for s, _ in leisten}
    js = []
    for x in jahrplan:
        kl = "js " + {"läuft": "jetzt", "fertig": "vorbei", "geplant": "entw"}[x["stand"]]
        kl += " gewaehlt" if laufend and x["id"] == laufend["id"] else ""
        mark = '<span class="lnw" title="Probe"></span>' if x["probe"] else ""
        inner = (f'<span class="nm">{"✓ " if x["stand"] == "fertig" else ""}{e(x["kurz"])}</span>'
                 f'<span class="zr">{e(monate(x["zeitraum"]))}</span>{mark}')
        if x["id"] in mit_stunden:
            js.append(f'<button type="button" class="{kl}" data-seq="{x["id"]}" style="flex:{x["umfang"]} 1 0" title="{e(x["titel"])}">{inner}</button>')
        else:
            js.append(f'<span class="{kl}" style="flex:{x["umfang"]} 1 0" title="{e(x["titel"])}">{inner}</span>')
    out = [f'<h1 class="kurs-name">{e(k["titel"])}</h1>',
           f'<p class="leise">Unser Jahr in {e(fach["name"].replace(" · ", ", ").replace(", G", " und G"))}.</p>' if k["fach"] == "gpg"
           else f'<p class="leise">Unser Jahr in {e(fach["name"])}.</p>',
           f'<div class="jahr-leiste">{"".join(js)}</div>',
           '<div class="trapez"><svg id="trapez" preserveAspectRatio="none" aria-hidden="true"></svg></div>']
    for s, hier in leisten:
        sichtbar = laufend and s["id"] == laufend["id"]
        out.append(f'<div class="seq-block" data-seq="{s["id"]}"{"" if sichtbar else " hidden"}>'
                   f'<p class="leitfrage"><b>{e(s["titel"])}</b>' + (f' · {e(s["frage"])}' if s.get("frage") else "") + "</p>"
                   + stunden_leiste(s["stunden"], hier, None, f"{s['id']}/", True) + "</div>")
    out.append('<p class="leise tipp">Tipp auf eine Stunde: Dort findest du deinen Hefteintrag, die Blätter und die Folien.</p>')
    schreiben("", f"{k['titel']} · Unser Jahr", "../../../", "./", "\n".join(out))
    bericht["kursseite"] = {"titel": "Kursseite (Jahr und Stundenleiste)"}
    stand_schreiben(ziel, kurs, welt, auswahl, seiten)

    for p in ziel.rglob("index.html"):
        if p not in geschrieben and MARKE in p.read_text(encoding="utf-8"):
            p.unlink()
            print(f"entfernt: {p.relative_to(REPO)}")
    weg = ablage.aufraeumen()
    groesse = sum(p.stat().st_size for p in (ziel / "dateien").glob("*.bin"))
    print(f"Klassenbereich {kurs}: {len(geschrieben)} Seiten, {len(ablage.benutzt)} Dateien ({groesse / 1e6:.1f} MB)"
          + (f", {weg} alte Dateien entfernt" if weg else ""))
    return 0


def uebungsseite(s, st, a, ordner, stunden, hier, vor, nach, ablage, materialien) -> str:
    """Übungsstunde (Auswahl `uebung: [<Material-id>, …]`): statt Heft und Erarbeitung je Werkzeug ein Reiter (Quiz, Fälle),
    in dem die Seite direkt bedienbar eingebettet ist (wie die Zeitkarte), dazu die Folien. Reiter statt Blattwahl: Die
    Blattwahl blendet ein `.paar` nur über `hidden` aus, und `.paar { display: grid }` überstimmt das (WiB6b, 16.11.2026)."""
    unt = "../../../../"
    dat = "../../dateien/"
    werkzeuge = [materialien[mid] for mid in a["uebung"]]
    tabs = "".join(f'<button role="tab" aria-selected="{"true" if n == 0 else "false"}" data-zu="ueben-{n}">{e(m["titel"])}</button>'
                   for n, m in enumerate(werkzeuge))
    out = [kopfzeile(stunden, hier, st["id"], vor, nach, s["id"]),
           f'<p class="dat">{e(datum_kurz(st["datum"]))} · {e(st["titel"])}</p>',
           f'<h1 class="frage">{e(st.get("frage", st["titel"]))}</h1>',
           '<div class="reiter" role="tablist">' + tabs
           + ('<button role="tab" aria-selected="false" data-zu="folien">Folien</button>' if a.get("folien") else "") + "</div>"]
    for n, m in enumerate(werkzeuge):
        out.append(f'<section class="tafel" id="ueben-{n}" role="tabpanel"{" hidden" if n else ""}>'
                   f'<div class="spalte einstieg"><div class="spalte-kopf"><span>{e(m["titel"])}</span>'
                   f'<button type="button" class="ln" data-voll>groß</button>'
                   f'<a class="ln" href="{unt}{e(m["pfad"])}" target="_blank" rel="noopener">eigenes Fenster</a></div>'
                   f'<iframe data-src="{unt}{e(m["pfad"])}" title="{e(m["titel"])}"></iframe></div></section>')   # ohne loading=lazy: WebKit (iPad) lädt einen später eingeblendeten lazy-Rahmen nicht
    if a.get("folien"):
        ohne = set(a.get("folien_ohne", []))
        folien = [f for n, f in enumerate(seiten_bilder(ordner / a["folien"], 1280, 70)) if n + 1 not in ohne]
        out.append('<section class="tafel" id="folien" role="tabpanel" hidden><div class="folien">'
                   + "".join(f'<button type="button" class="folie"><img data-kb-src="{dat}{ablage.ablegen(fb, ".jpg")}" '
                             f'data-kb-typ="image/jpeg" alt="Folie {n + 1}"></button>' for n, fb in enumerate(folien))
                   + "</div></section>")
    return "\n".join(out)


def stundenseite(s, st, a, ordner, teile, stunden, hier, vor, nach, ablage, materialien, material_der_stunde) -> str:
    if a.get("uebung"):
        return uebungsseite(s, st, a, ordner, stunden, hier, vor, nach, ablage, materialien)
    unt = "../../../../"   # von k/<kurs>/<s>/<ue>/ nach unterricht/
    dat = "../../dateien/"
    heft_da = not a.get("ohne_heft")   # Stunde, in der kein Eintrag geschrieben wurde: ohne Reiter „Heft“
    out = [kopfzeile(stunden, hier, st["id"], vor, nach, s["id"]),
           f'<p class="dat">{e(datum_kurz(st["datum"]))} · {e(st["titel"])}</p>',
           f'<h1 class="frage">{e(st.get("frage", st["titel"]))}</h1>',
           '<div class="reiter" role="tablist">'
           + ('<button role="tab" aria-selected="true" data-zu="heft">Heft</button>' if heft_da else "")
           + f'<button role="tab" aria-selected="{"false" if heft_da else "true"}" data-zu="erarbeitung">Erarbeitung</button>'
           + ('<button role="tab" aria-selected="false" data-zu="folien">Folien</button>' if a.get("folien") else "")
           + "</div>"]

    if heft_da:
        bilder = [dat + ablage.ablegen(b, ".jpg") for b in einkleber_bilder(a, ordner)]
        out.append('<section class="tafel" id="heft" role="tabpanel">')
        out.append(heftseite(st, a, teile, bilder))
        out.append(ki_knopf("Mit KI lernen", prompt_stunde(st, datum_kurz(st["datum"]), teile, a.get("_pool"))))
        out.append("</section>")

    # Erarbeitung: Blatt links, iPad-Seite rechts
    blaetter = []
    for b in [b for b in a["blaetter"] if b["art"] != "Einkleber"]:   # Einkleber stehen im Heft (Lehrkraft 14.11.)
        pdf = ordner / b["datei"]
        seiten = "".join(f'<img data-kb-src="{dat}{ablage.ablegen(sb, ".jpg")}" data-kb-typ="image/jpeg" alt="{e(b["titel"])}, Seite {n + 1}">'
                         for n, sb in enumerate(seiten_bilder(pdf, 1240, 72)))
        ipad = [materialien[mid] for mid in b.get("zu", [])]
        blaetter.append((b, seiten, dat + ablage.ablegen(pdf.read_bytes(), ".pdf"), ipad))
    gezeigt = {m["id"] for _, _, _, ms in blaetter for m in ms}
    lose = [m for m in material_der_stunde if m["id"] not in gezeigt]
    # Zeitkarten der Stunde stehen am Anfang der Erarbeitung, wie in der Stunde (Einstieg; Lehrkraft 14.11.)
    zeitkarten = [m for m in lose if m["pfad"].startswith("zeitkarte/")]
    lose = [m for m in lose if m not in zeitkarten]
    out.append('<section class="tafel" id="erarbeitung" role="tabpanel"' + (" hidden" if heft_da else "") + ">")
    for m in zeitkarten:
        out.append(f'<div class="spalte einstieg"><div class="spalte-kopf"><span>Zum Einstieg: {e(m["titel"])}. '
                   f'Schieb den Regler und schau, was sich ändert.</span>'
                   f'<button type="button" class="ln" data-voll>groß</button>'
                   f'<a class="ln" href="{unt}{e(m["pfad"])}" target="_blank" rel="noopener">eigenes Fenster</a></div>'
                   f'<iframe data-src="{unt}{e(m["pfad"])}" title="{e(m["titel"])}" loading="lazy"></iframe></div>')
    if len(blaetter) > 1:
        out.append('<div class="blatt-wahl">' + "".join(
            f'<button type="button" data-blatt="{n}" aria-pressed="{"true" if n == 0 else "false"}">{e(b["titel"])}</button>'
            for n, (b, _, _, _) in enumerate(blaetter)) + "</div>")
    for n, (b, seiten, pdf, ipad) in enumerate(blaetter):
        zwei = bool(ipad)
        out.append(f'<div class="paar{" zwei" if zwei else ""}" data-blatt="{n}"{" hidden" if n else ""}>')
        if zwei:   # iPad links, das Blatt dazu rechts (Lehrkraft 14.11.)
            m = ipad[0]
            out.append('<div class="umschalter" role="group"><button type="button" data-seite="ipad" aria-pressed="true">iPad</button>'
                       '<button type="button" data-seite="blatt" aria-pressed="false">Blatt</button></div>')
            out.append(f'<div class="spalte ipad-spalte"><div class="spalte-kopf"><span>iPad: {e(m["titel"])}</span>'
                       f'<a class="ln" href="{unt}{e(m["pfad"])}" target="_blank" rel="noopener">eigenes Fenster</a></div>'
                       f'<iframe data-src="{unt}{e(m["pfad"])}" title="{e(m["titel"])}" loading="lazy"></iframe></div>')
        out.append(f'<div class="spalte blatt-spalte"><div class="spalte-kopf"><span>{e(b["titel"])}</span>'
                   f'<a class="ln" data-kb-pdf="{pdf}" href="#">Drucken</a></div><div class="seiten">{seiten}</div></div>')
        out.append("</div>")
    if lose:
        out.append('<p class="lose">Außerdem: ' + " · ".join(
            f'<a class="ln" href="{unt}{e(m["pfad"])}" target="_blank" rel="noopener">{e(m["titel"])}</a>' for m in lose) + "</p>")
    if not blaetter and not lose:
        out.append('<p class="leise">In dieser Stunde gab es kein Blatt, das hier steht.</p>')
    out.append("</section>")

    if a.get("folien"):
        ohne = set(a.get("folien_ohne", []))
        folien = [f for n, f in enumerate(seiten_bilder(ordner / a["folien"], 1280, 70)) if n + 1 not in ohne]
        out.append('<section class="tafel" id="folien" role="tabpanel" hidden><div class="folien">'
                   + "".join(f'<button type="button" class="folie"><img data-kb-src="{dat}{ablage.ablegen(fb, ".jpg")}" '
                             f'data-kb-typ="image/jpeg" alt="Folie {n + 1}"></button>' for n, fb in enumerate(folien))
                   + "</div></section>")

    hk = herkunft(ordner)
    if hk:
        out.append('<details class="nachweis"><summary>Bildnachweise</summary><ul>'
                   + "".join(f"<li>{inline(m)} · {inline(u)} · {inline(q)}</li>" for m, u, q in hk) + "</ul></details>")
    return "\n".join(out)


# ─────────────────────────── Üben: Quiz mit Heft daneben ───────────────────────────
# Lehrkraft 18.11.2026 (GPG9a): Übungs-Quiz zur Probe; jede Frage zeigt, wo im Hefteintrag die Antwort steht, die Stelle
# wird markiert. Fragen aus dem Pool der Probe (pool.py, POOL + FUNDSTELLEN), nie abgeschrieben. Eine Entscheidung je
# Bildschirm (wie das Quiz WiB6b); Freitext: eigene Antwort, dann vergleichen und abhaken; vier Formen tippt man an.

TEXTERKENNUNG = Path(__file__).resolve().parent / "klassenbereich" / "texterkennung.swift"


def texterkennung(jpg: bytes) -> list[dict]:
    """Textzeilen eines Einkleber-Bilds mit Lage (macOS Vision), zwischengespeichert nach dem Inhalt des Bilds."""
    cache = Path.home() / ".cache" / "weitergehts" / "texterkennung" / (hashlib.sha256(jpg).hexdigest()[:24] + ".json")
    if cache.is_file():
        return json.loads(cache.read_text(encoding="utf-8"))
    with tempfile.TemporaryDirectory() as tmp:
        b = Path(tmp) / "b.jpg"
        b.write_bytes(jpg)
        r = subprocess.run(["swift", str(TEXTERKENNUNG), str(b)], capture_output=True, text=True)
        if r.returncode != 0:
            sys.exit(f"Texterkennung scheitert: {r.stderr[-400:]}")
    zeilen = json.loads(r.stdout)
    cache.parent.mkdir(parents=True, exist_ok=True)
    cache.write_text(json.dumps(zeilen, ensure_ascii=False), encoding="utf-8")
    return zeilen


def _norm(t: str) -> str:
    return re.sub(r"[^a-zäöüß0-9]+", " ", t.lower()).strip()


def _passt(zeile: str, wort: str) -> bool:
    z, w = _norm(zeile), _norm(wort)
    return bool(z) and len(z) >= 3 and (w.startswith(z) or z.startswith(w))


def stelle_finden(zeilen: list[dict], reihe: str, spalte: str | None, titel: set[str] = frozenset()) -> list[float] | None:
    """Rahmen [x0, y0, x1, y1] (Anteile) um die Reihe des Einklebers, deren Titel mit `reihe` beginnt; mit `spalte` nur das Feld
    unter dem Spaltenkopf. Die Reihe endet vor dem nächsten bekannten Reihentitel (`titel`) in derselben Spalte des Bilds,
    sonst nach einer Lücke. Spalten beginnen dort, wo der Text der Reihe beginnt (Köpfe sind mal mittig, mal linksbündig)."""
    sortiert = sorted(zeilen, key=lambda z: (z["y"], z["x"]))
    anker = next((z for z in sortiert if _passt(z["t"], reihe)), None)
    if not anker:
        return None
    andere = [t for t in titel | {"Antwort", "Antwortsatz", "Merksatz"} if _norm(t) != _norm(reihe)]
    hoehe = sorted(z["h"] for z in zeilen)[len(zeilen) // 2] if zeilen else 0.03
    spalte_l = sorted((z for z in zeilen if abs(z["x"] - anker["x"]) < 0.02 and z["y"] > anker["y"] + 1e-6), key=lambda z: z["y"])
    naechste, letzte = None, anker["y"] + anker["h"]
    for z in spalte_l:
        if any(_passt(z["t"], t) for t in andere) or z["y"] - letzte > 1.6 * hoehe:
            naechste = z
            break
        letzte = z["y"] + z["h"]
    unten = max(z["y"] + z["h"] for z in zeilen) + 0.015
    y0, y1 = max(0.0, anker["y"] - 0.02), min(1.0, (naechste["y"] - 0.012) if naechste else unten)
    x0, x1 = max(0.0, anker["x"] - 0.015), 0.995
    if spalte:
        koepfe = [z for z in zeilen if z["y"] < anker["y"] and _passt(z["t"].split(":")[0], spalte.split(":")[0])]
        if not koepfe:
            return None
        kopf = max(koepfe, key=lambda z: z["y"])
        mitte = kopf["x"] + kopf["w"] / 2
        inhalt = sorted({round(z["x"], 2) for z in zeilen if y0 <= z["y"] < y1 and z["x"] > anker["x"] + anker["w"] * 0.6})
        starts = []
        for x in inhalt:   # Textanfänge der Reihe zu Spalten bündeln
            if not starts or x - starts[-1] > 0.04:
                starts.append(x)
        if not starts:
            return None
        j = max([i for i, x in enumerate(starts) if x <= mitte + 0.02] or [0])
        x0 = max(0.0, starts[j] - 0.012)
        x1 = (starts[j + 1] - 0.012) if j + 1 < len(starts) else 0.995
    return [round(x0, 4), round(y0, 4), round(x1, 4), round(y1, 4)]


def pool_laden(pfad: Path):
    spec = importlib.util.spec_from_file_location("probe_pool", pfad)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    mod.pruefen()
    return mod


def _teile(text: str, nach: str = ":") -> list[str]:
    """„Richtig oder falsch? a) … b) …“ → Aussagen; „Westen oder Osten? A · B · C“ → Begriffe."""
    rest = text.split(nach, 1)[1] if nach in text else text
    return [x.strip(" .") for x in rest.split(" · ") if x.strip(" .")]


def _staemme(t: str) -> set[str]:
    """Wortstämme (erste fünf Buchstaben) ab vier Buchstaben: „versprach“ und „versprochen“ treffen sich."""
    return {w[:5] for w in _norm(t).split() if len(w) >= 4}


def _zuordnen(karten: list[str], gruppen: dict[str, list[str]]) -> dict[str, str] | None:
    """Karten (langer Text) den Gruppen zuordnen, deren Kurzformen sie am meisten teilen: immer das insgesamt beste Paar
    zuerst, jede Kurzform und jede Karte genau einmal, Rest durch Ausschluss. None, wenn es nicht eindeutig aufgeht
    (dann bleibt die Frage Freitext)."""
    kurz = [(g, k) for g, ks in gruppen.items() for k in ks]
    paare = sorted(((len(_staemme(c) & _staemme(k)), c, g, k) for c in karten for g, k in kurz), key=lambda x: -x[0])
    zu, frei_k, frei_c = {}, set(kurz), set(karten)
    for wert, c, g, k in paare:
        if wert == 0:
            break
        if c in frei_c and (g, k) in frei_k:
            zu[c] = g
            frei_c.discard(c)
            frei_k.discard((g, k))
    if len(frei_c) == 1 and len(frei_k) == 1:
        zu[frei_c.pop()] = next(iter(frei_k))[0]
    return zu if len(zu) == len(karten) else None


def frage_form(nr, typ, mat, frage, el) -> dict:
    """Die vier Formen zum Antippen (Lehrkraft 18.11.: eindeutig prüfbar); sonst Freitext mit Selbstkontrolle."""
    if typ == "Richtig oder falsch":
        aussagen = re.split(r"\s*[a-h]\)\s*", frage)[1:]
        loes = [("richtig" in x.split(")", 1)[1]) for x in el]
        if len(aussagen) == len(loes):
            return {"form": "rf", "aussagen": aussagen, "loesung": loes,
                    "hinweise": [x.split(")", 1)[1].strip() for x in el]}
    if typ == "Ankreuzen":
        begriffe = _teile(frage, "?")
        gruppen = {g.split(":")[0].strip(): [x.strip() for x in g.split(":", 1)[1].split(",")] for g in el if ":" in g and not g.startswith("(")}
        loes = {}
        for b in begriffe:
            treffer = [g for g, ks in gruppen.items() if any(_norm(k) == _norm(b) for k in ks)]
            if len(treffer) != 1:
                break
            loes[b] = treffer[0]
        if len(loes) == len(begriffe):
            return {"form": "wahl", "begriffe": begriffe, "gruppen": list(gruppen), "loesung": loes}
    if typ == "Ordnen":
        karten = _teile(frage, ":")
        schritte = [x.strip() for x in el[0].split("(")[0].split("→")]
        zu = _zuordnen(karten, {str(i): [s_] for i, s_ in enumerate(schritte)})
        if zu and len(set(zu.values())) == len(karten):
            return {"form": "ordnen", "karten": karten, "loesung": sorted(karten, key=lambda k: int(zu[k]))}
    if typ == "Sortieren" and mat:
        karten = _teile(mat, ":")
        gruppen = {g.split(":")[0].strip(): [x.strip() for x in g.split(":", 1)[1].split("·")] for g in el if ":" in g and not g.startswith("(")}
        zu = _zuordnen(karten, gruppen)
        if zu:
            return {"form": "wahl", "begriffe": karten, "gruppen": list(gruppen), "loesung": zu}
    return {"form": "frei"}


QUIZ_REGELN = """You are a fair, friendly checker for a student about 14-15 years old in 9th grade at a Bavarian Mittelschule, who practises for a history test ("Probe"). Rules that never bend:
1. Answer ONLY in German, short plain sentences.
2. Compare the student's answer with the expected points below. Say which points the student already has (in the student's own words counts), which are missing, and why a point matters. Be generous with wording, strict with content.
3. Do not just hand over a model answer. For each missing point, give a hint where it stands in the notebook (Heft) and ask the student to improve the answer. Only after a second try, show the missing point plainly.
4. Points: say "Das wären etwa X von Y Punkten" (whole points only). No grades.
5. You may explain background if the student asks; say when something is not in the notebook. Never invent facts or numbers. Present East and West fairly.
6. Never ask for the student's name."""


def quiz_prompt(frage_text: str, mat: str | None, el: list[str], punkte: int, heft: str) -> str:
    return (f"{QUIZ_REGELN}\n\n<QUESTION>\n{(mat + chr(10)) if mat else ''}{frage_text}\n(max. {punkte} points)\n</QUESTION>\n\n"
            "<EXPECTED - one point each, never paste this list as is>\n" + "\n".join(f"- {x}" for x in el) + "\n</EXPECTED>\n\n"
            f"<NOTEBOOK - where it stands>\n{heft}\n</NOTEBOOK>\n\n"
            "<STUDENT ANSWER>\n{ANTWORT}\n</STUDENT ANSWER>\n\nBegin now: first one sentence what is already good, then the missing points as hints.\n")


def quiz_bauen(P, hefte: dict, sequenz: str) -> tuple[str, list[str]]:
    """HTML des Reiters „Üben“ (Daten als JSON, Hefte als Vorlagen) und die Liste der Fehler (leer = alles gefunden)."""
    fehler, fragen, benutzt = [], [], set()
    for nr, block, art, form, typ, mat, frage, pkt, el, wo, vert in P.POOL:
        stellen = []
        for st, reihe, spalte in P.FUNDSTELLEN[nr]:
            sid = st.split("/", 1)[1] if st.startswith(sequenz + "/") else None
            h = hefte.get(sid)
            if reihe == "Karte":
                stellen.append({"stunde": sid, "text": "Das steht auf deiner Karte in der Mappe (Blatt vom " + (h["datum"] if h else "01.10.") + ")."})
                continue
            if not h:
                fehler.append(f"{nr}: Stunde {st} hat keine Heftseite")
                continue
            benutzt.add(sid)
            ziel = None
            if reihe == "Antwortsatz":
                ziel = {"art": "antwort"}
            elif any(any(_norm(r[0]) == _norm(reihe) for r in t["zeilen"]) for t in h["teile"]) and not h["ocr"]:
                ziel = {"art": "reihe", "zeile": _norm(reihe)}
            else:
                titel = ({r[0] for t in h["teile"] for r in t["zeilen"]} | {pk.split(":")[0].replace("**", "") for t in h["teile"] for pk in t["punkte"]}
                         | {r_ for st_, r_, _ in (x for fs in P.FUNDSTELLEN.values() for x in fs) if st_ == st})
                for i, zeilen in enumerate(h["ocr"]):
                    box = stelle_finden(zeilen, reihe, spalte, titel)
                    if box:
                        ziel = {"art": "bild", "bild": i, "box": box}
                        break
            if not ziel:
                fehler.append(f"{nr}: „{reihe}“{' / ' + spalte if spalte else ''} nicht gefunden im Heft vom {h['datum']}")
                continue
            stellen.append({"stunde": sid, "datum": h["datum"], "titel": h["titel"], "reihe": reihe, "spalte": spalte, **ziel})
        heft_text_ = "\n".join(f"{s_['datum']} {s_['titel']}: {s_['reihe']}{' (' + s_['spalte'] + ')' if s_.get('spalte') else ''}"
                               for s_ in stellen if s_.get("reihe"))
        f = {"nr": nr, "block": block, "art": art, "typ": typ, "material": mat, "frage": frage, "punkte": pkt,
             "elemente": [x for x in el if not x.startswith("(")], "vertiefung": vert, "stellen": stellen,
             **frage_form(nr, typ, mat, frage, el)}
        if f["form"] == "frei":
            f["ki"] = quiz_prompt(frage, mat, f["elemente"], pkt, heft_text_ or wo)
        fragen.append(f)
    for f in fragen:   # zum Gegenlesen im Bauprotokoll: was das Quiz bei den Formen zum Antippen als richtig zählt
        if f["form"] != "frei":
            print(f"Quiz {f['nr']} ({f['form']}): {f['loesung']}")
    daten = {"bloecke": {str(k): v.split(" (")[0] for k, v in P.BLOECKE.items()}, "fragen": fragen, "runde": 10}
    vorlagen = "".join(f'<template data-heft="{sid}">{hefte[sid]["html"]}</template>' for sid in sorted(benutzt))
    roh = json.dumps(daten, ensure_ascii=False).replace("</", "<\\/")
    teil = f'<div id="quiz" class="quiz"></div><script type="application/json" id="kb-quiz">{roh}</script>' + vorlagen
    return teil, fehler


# ─────────────────────────── Prüfung ohne Schlüssel ───────────────────────────

def pruefen() -> list[str]:
    """Für make check / CI: jeder Klassenbereich-Kurs hat seine Seiten, verschlüsselt, ohne Klartext-Reste."""
    out = []
    daten = build.laden()
    for f in sorted(AUSWAHL.glob("*.json")):
        kurs = f.stem
        auswahl = json.loads(f.read_text(encoding="utf-8"))
        if not daten["kurse"].get(kurs, {}).get("klassenbereich"):
            out.append(f"{kurs}: Auswahl vorhanden, aber kurse.json setzt nicht \"klassenbereich\": true")
        ziel = UNTERRICHT / "k" / kurs
        soll = [ziel / "index.html"]   # die Seiten der Stunden nennt der Stand des letzten Baus
        if (ziel / "stand.json").is_file():
            stand = json.loads((ziel / "stand.json").read_text(encoding="utf-8"))
            soll += [ziel / rel / "index.html" for rel in stand["seiten"] if rel != "kursseite"]
        for p in soll:
            if not p.is_file():
                out.append(f"fehlt: {p.relative_to(REPO)} (fix: make klassenbereich K={kurs})")
            elif MARKE not in (t := p.read_text(encoding="utf-8")) or 'id="kb-inhalt"' not in t:
                out.append(f"nicht verschlüsselt: {p.relative_to(REPO)}")
        for p in ziel.rglob("*"):
            if p.is_file() and p.suffix not in (".html", ".bin") and p != ziel / "stand.json":
                out.append(f"Klartext-Datei im Klassenbereich: {p.relative_to(REPO)}")
    return out


def main(argv: list[str]) -> int:
    if "--check" in argv:
        p = pruefen()
        if p:
            print("Klassenbereich unvollständig:\n" + "\n".join("  - " + x for x in p))
            return 1
        print(f"Klassenbereich: {len(list(AUSWAHL.glob('*.json')))} Kurs(e) verschlüsselt und vollständig")
        return 0
    if not argv:
        print(__doc__)
        return 2
    kurs = argv[0]
    if "--passwort" in argv:
        print(geheim(kurs, neu=False)["passwort"])
        return 0
    return bauen(kurs)


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
