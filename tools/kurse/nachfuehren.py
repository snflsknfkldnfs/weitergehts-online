#!/usr/bin/env python3
"""nachfuehren.py — die Kursseite nach einer gehaltenen Stunde nachführen (make kursseite K=<kurs>).

  make kursseite K=gpg9a                    baut, prüft, berichtet in Worten der Stunde und hält an
  make kursseite K="gpg8a gpg9a"            mehrere Kurse, ein Bericht (ein Sammel-Ja deckt reine Nachführungen)
  make kursseite K=gpg9a JA="<Wortlaut>"    committet und pusht genau den berichteten Stand, mit dem Ja der Lehrkraft

Ablauf ohne JA: fester Arbeitsbaum ../_wt-kursseite (neben den anderen _wt-*), frisch ab origin/main → make klassenbereich
je Kurs → make kurse → make check → Bericht (neu, geändert, entfernt; aus stand.json vor und nach dem Bau) → Halt.
Ablauf mit JA: nur, wenn origin/main sich seit dem Bericht nicht bewegt hat, der Stand Byte für Byte der berichtete ist und
nur Seiten der Kurse (unterricht/k/<kurs>/, unterricht/index.html) sich ändern; dann Commit mit dem Wortlaut und Push.
Ändert sich etwas anderes, ist es keine Nachführung: kein Push über diesen Befehl.

Der Arbeitsbaum gehört diesem Befehl: Er setzt ihn bei jedem Lauf auf origin/main zurück. Nie darin von Hand arbeiten.
Anleitung: docs/website/VEROEFFENTLICHEN.md § Klassenbereich. Entscheide der Lehrkraft 18.11.2026: Pflege im Planungsweg,
Sammel-Ja für reine Nachführungen, Aufruf durch die Session der Nachbereitung.
"""
from __future__ import annotations

import contextlib
import hashlib
import importlib.util
import io
import json
import subprocess
import sys
from datetime import date
from pathlib import Path

HIER = Path(__file__).resolve()
REPO = HIER.parents[2]
NAME = "_wt-kursseite"
ZWEIG = "kursseite-nachfuehren"
BERICHT = "kursseite-bericht.json"   # im Git-Verzeichnis des Arbeitsbaums, nie im Repo


def git(*args: str, cwd: Path, check: bool = True) -> str:
    r = subprocess.run(["git", *args], cwd=cwd, text=True, capture_output=True)
    if check and r.returncode:
        sys.exit(f"git {' '.join(args)} schlug fehl:\n{r.stderr.strip()}")
    return r.stdout.strip()


def halt(text: str) -> int:
    print(f"HALT: {text}")
    return 1


# ─────────────────────────── außen: Arbeitsbaum vorbereiten ───────────────────────────

def aussen(kurse: list[str], ja: str | None, basis: str) -> int:
    haupt = Path(git("rev-parse", "--path-format=absolute", "--git-common-dir", cwd=REPO)).parent
    wt = haupt.parent / NAME
    git("fetch", "-q", "origin", cwd=haupt)
    if ja is None:
        if not wt.is_dir():
            git("worktree", "add", "-q", "-B", ZWEIG, str(wt), basis, cwd=haupt)
        else:
            if git("log", "--oneline", f"{basis}..HEAD", cwd=wt):
                return halt(f"{wt} trägt Commits, die nicht auf {basis} sind (ein Push schlug fehl?). Ansehen: "
                            f"git -C {wt} log {basis}..HEAD")
            git("reset", "-q", "--hard", cwd=wt)
            git("clean", "-fdq", "unterricht/k", cwd=wt)
            git("checkout", "-q", "-B", ZWEIG, basis, cwd=wt)
    elif not wt.is_dir():
        return halt("Kein Bericht: erst ohne JA bauen und den Bericht der Lehrkraft vorlegen.")
    args = [sys.executable, str(wt / "tools" / "kurse" / "nachfuehren.py"), "--im-arbeitsbaum", *kurse]
    if ja is not None:
        args += ["--push", ja]
    return subprocess.run(args, cwd=wt).returncode


# ─────────────────────────── innen: bauen, prüfen, berichten ───────────────────────────

def laden_kb():
    spec = importlib.util.spec_from_file_location("klassenbereich", HIER.parent / "klassenbereich.py")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def stand_alt(kurs: str) -> dict | None:
    r = subprocess.run(["git", "show", f"HEAD:unterricht/k/{kurs}/stand.json"], cwd=REPO, text=True, capture_output=True)
    return json.loads(r.stdout) if r.returncode == 0 else None


def tag(iso: str) -> str:
    d = date.fromisoformat(iso)
    return f"{['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'][d.weekday()]} {d.day:02d}.{d.month:02d}."


def in_worten(rel: str, b: dict | None, datum: str = "") -> str:
    """„Jugend in Ost und West (Fr 13.11.) mit Heftseite, 2 Blättern und Folien“."""
    if not b:
        return f"Seite {rel}" + (f" ({tag(datum)})" if datum else "")
    if rel == "kursseite":
        return b["titel"]
    teile = []
    if b.get("heft"):
        teile.append("Heftseite")
    if b.get("blaetter"):
        teile.append("1 Blatt" if b["blaetter"] == 1 else f"{b['blaetter']} Blättern")
    if b.get("folien"):
        teile.append("Folien")
    mit = (" mit " + (", ".join(teile[:-1]) + " und " + teile[-1] if len(teile) > 1 else teile[0])) if teile else ""
    return f"{b['titel']} ({tag(b['datum'])}){mit}"


def geaendert_laut_git(kurs: str) -> set[str]:
    out = set()
    for z in git("status", "--porcelain", "--untracked-files=all", f"unterricht/k/{kurs}", cwd=REPO).splitlines():
        p = z[3:]
        if p.endswith("/index.html"):
            rel = p.removeprefix(f"unterricht/k/{kurs}/").removesuffix("index.html").strip("/")
            out.add(rel or "kursseite")
    return out


def kurs_bericht(kurs: str, alt: dict | None, neu: dict, bericht: dict) -> list[str]:
    n = neu["seiten"]
    dateien = geaendert_laut_git(kurs)
    if alt is None:   # erster Lauf mit Stand: die Seiten können schon da sein, Kennungen gibt es noch nicht
        zeilen = [f"  erster Lauf mit Stand: {len(n)} Seiten erfasst"]
        da = set(git("ls-files", f"unterricht/k/{kurs}", cwd=REPO).splitlines())
        for r in sorted(n, key=lambda r: n[r].get("datum", "")):
            pfad = f"unterricht/k/{kurs}/" + (f"{r}/" if r != "kursseite" else "") + "index.html"
            wie = "neu" if pfad not in da else "geändert" if r in dateien else "unverändert"
            zeilen.append(f"  {wie}: {in_worten(r, bericht.get(r))}")
        return zeilen
    a = alt["seiten"]
    zeilen = []
    for rel in sorted(set(n) - set(a), key=lambda r: n[r].get("datum", "")):
        zeilen.append(f"  neu: {in_worten(rel, bericht.get(rel))}")
    for rel in sorted(set(a) & set(n), key=lambda r: n[r].get("datum", "")):
        if a[rel]["kennung"] != n[rel]["kennung"]:
            zeilen.append(f"  geändert: {in_worten(rel, bericht.get(rel))}")
    for rel in sorted(set(a) - set(n)):
        zeilen.append(f"  entfernt: {in_worten(rel, None, a[rel].get('datum', ''))}")
    nur_leiste = sorted(r for r in dateien if r in a and r in n and a[r]["kennung"] == n[r]["kennung"])
    if nur_leiste:
        zeilen.append(f"  nur die Stundenleiste: {len(nur_leiste)} Seite(n)")
    if neu["ausgespart"]["daten"] != alt.get("ausgespart", {}).get("daten", neu["ausgespart"]["daten"]):
        zeilen.append(f"  gehalten ohne Seite: {', '.join(tag(d) for d in neu['ausgespart']['daten']) or 'keine'}")
    return zeilen


def fingerabdruck() -> str:
    git("add", "-A", cwd=REPO)
    diff = subprocess.run(["git", "diff", "--cached", "--binary", "HEAD"], cwd=REPO, capture_output=True).stdout
    return hashlib.sha256(diff).hexdigest()


def ausserhalb(kurse: list[str]) -> list[str]:
    erlaubt = tuple(f"unterricht/k/{k}/" for k in kurse) + ("unterricht/index.html",)
    return [p for p in git("diff", "--cached", "--name-only", "HEAD", cwd=REPO).splitlines() if not p.startswith(erlaubt)]


def innen_bauen(kurse: list[str]) -> int:
    kb = laden_kb()
    texte, hinweise = [], []
    for kurs in kurse:
        alt = stand_alt(kurs)
        bericht: dict = {}
        puffer = io.StringIO()
        with contextlib.redirect_stdout(puffer):
            rc = kb.bauen(kurs, bericht)
        hinweise += [z for z in puffer.getvalue().splitlines() if z.startswith(("HINWEIS", "WARN", "FEHLER"))]
        if rc:
            print(puffer.getvalue())
            return halt(f"make klassenbereich K={kurs} endete mit {rc}.")
        neu = json.loads((REPO / "unterricht" / "k" / kurs / "stand.json").read_text(encoding="utf-8"))
        zeilen = kurs_bericht(kurs, alt, neu, bericht)
        texte.append(f"{kurs}:" + ("" if zeilen else " aktuell, nichts nachzuführen"))
        texte += zeilen
    for schritt in (["python3", "tools/kurse/build.py"], ["./tools/website/check.sh"]):
        r = subprocess.run(schritt, cwd=REPO, text=True, capture_output=True)
        if r.returncode:
            print((r.stdout + r.stderr)[-3000:])
            return halt(f"{' '.join(schritt)} endete mit {r.returncode}; nichts wird gepusht.")
    druck = fingerabdruck()
    fremd = ausserhalb(kurse)
    gitdir = Path(git("rev-parse", "--path-format=absolute", "--git-dir", cwd=REPO))
    leer = not git("diff", "--cached", "--name-only", "HEAD", cwd=REPO)
    print("Bericht der Kursseite (gebaut ab " + git("rev-parse", "--short", "HEAD", cwd=REPO) + ", make check grün)")
    print("\n".join(texte))
    for h in hinweise:
        print("  " + h)
    if leer:
        (gitdir / BERICHT).unlink(missing_ok=True)
        print("Kein Unterschied zum veröffentlichten Stand: nichts zu pushen.")
        return 0
    if fremd:
        print("Außerhalb der Kursseiten geändert (keine reine Nachführung, kein Push über diesen Befehl):")
        print("\n".join("  " + p for p in fremd))
    (gitdir / BERICHT).write_text(json.dumps({"kurse": kurse, "fingerabdruck": druck, "text": texte, "ausserhalb": fremd},
                                             ensure_ascii=False, indent=1), encoding="utf-8")
    k = " ".join(kurse)
    print(f'HALT: Push erst nach dem Ja der Lehrkraft: make kursseite K="{k}" JA="<Wortlaut des Ja>"')
    return 0


def innen_push(kurse: list[str], ja: str) -> int:
    if not ja.strip():
        return halt("JA ist leer; der Wortlaut des Ja der Lehrkraft gehört hinein.")
    gitdir = Path(git("rev-parse", "--path-format=absolute", "--git-dir", cwd=REPO))
    if not (gitdir / BERICHT).is_file():
        return halt("Kein Bericht: erst ohne JA bauen und den Bericht der Lehrkraft vorlegen.")
    b = json.loads((gitdir / BERICHT).read_text(encoding="utf-8"))
    if sorted(b["kurse"]) != sorted(kurse):
        return halt(f"Der Bericht gilt für {' '.join(b['kurse'])}, nicht für {' '.join(kurse)}.")
    if git("rev-parse", "HEAD", cwd=REPO) != git("rev-parse", "origin/main", cwd=REPO):
        return halt(f'origin/main hat sich seit dem Bericht bewegt: neu bauen (make kursseite K="{" ".join(kurse)}") '
                    "und den neuen Bericht vorlegen.")
    if fingerabdruck() != b["fingerabdruck"]:
        return halt("Der Stand im Arbeitsbaum ist nicht mehr der berichtete: neu bauen und neu vorlegen.")
    if b["ausserhalb"]:
        return halt("Der Stand ändert mehr als die Kursseiten; das ist keine Nachführung (eigener Zweig, eigenes Ja).")
    kopf = "; ".join(z.strip() for z in b["text"] if z.startswith("  neu:"))[:120] or "Seiten aktualisiert"
    nachricht = (f"Kursseite {' '.join(kurse)} nachgeführt: {kopf}\n\n" + "\n".join(b["text"])
                 + f"\n\nJa der Lehrkraft: „{ja.strip()}“\n(make kursseite, tools/kurse/nachfuehren.py)")
    git("commit", "-q", "-m", nachricht, cwd=REPO)
    r = subprocess.run(["git", "push", "-q", "origin", "HEAD:main"], cwd=REPO, text=True, capture_output=True)
    if r.returncode:
        git("reset", "-q", "--soft", "HEAD~1", cwd=REPO)
        return halt(f"Push abgelehnt, Commit zurückgenommen:\n{r.stderr.strip()}")
    (gitdir / BERICHT).unlink(missing_ok=True)
    print(f"gepusht: {git('rev-parse', '--short', 'HEAD', cwd=REPO)} auf origin/main; GitHub Pages baut die Seite neu.")
    return 0


def main(argv: list[str]) -> int:
    innen = "--im-arbeitsbaum" in argv
    argv = [a for a in argv if a != "--im-arbeitsbaum"]
    ja = basis = None
    if "--push" in argv:
        i = argv.index("--push")
        if i + 1 >= len(argv):
            return halt("--push braucht den Wortlaut des Ja.")
        ja = argv.pop(i + 1)
        argv.pop(i)
    if "--basis" in argv:   # nur für die Probe eines Zweigs vor dem Merge; gepusht wird nie von dort
        i = argv.index("--basis")
        basis = argv.pop(i + 1)
        argv.pop(i)
    kurse = [k for a in argv for k in a.split()]
    if not kurse:
        print(__doc__)
        return 2
    fehlt = [k for k in kurse if not (HIER.parent / "klassenbereich" / f"{k}.json").is_file()]
    if fehlt:
        return halt(f"Kein Klassenbereich für {', '.join(fehlt)} (tools/kurse/klassenbereich/<kurs>.json fehlt).")
    if not innen:
        return aussen(kurse, ja, basis or "origin/main")
    return innen_push(kurse, ja) if ja is not None else innen_bauen(kurse)


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
