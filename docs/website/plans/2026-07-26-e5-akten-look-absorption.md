# E5 Akten-Look-Absorption — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Das Syrien-Redesign-Overlay (`vendor/`) vollständig in die geteilte Schicht absorbieren (theme-gpg.css + escape-engine.js), Akten-Labels datengetrieben machen, Übersichts-Rendering in die Engine heben, danach die 4 Game-Assets nach `unterricht/assets/` umziehen — **Syrien bleibt pixel-identisch** (Vorher/Nachher-Screenshots), einzige gewollte Abweichung ist der separate Label-Fix-Commit (Task 10).

**Architecture:** Statische Vanilla-Site. Game-Ladekette bleibt `fonts.css → base.css → theme-gpg.css` (kein tokens.css). Absorption = „Overlay schrumpft mit": jedes Paket verschiebt Regeln aus `vendor/redesign*.css` in `theme-gpg.css` (Überschreiben → Ersetzen, `!important` fällt weg) UND löscht sie aus der vendor-Datei — dadurch ist jeder Zwischenstand per Screenshot-Diff gegen die Baseline prüfbar, obwohl vendor bis Task 9 geladen bleibt. Die 3 rd-inject-DOM-Jobs + das Übersichts-Inline-Script wandern in die Engine; der DOM-/CSS-Kontrakt (Klassennamen) ist eingefroren.

**Tech Stack:** HTML/CSS/JS vanilla · `make check`/`smoke`/`bump` · Playwright via `.venv/` (`make smoke-setup`, falls `.venv/` fehlt) · Pillow für Pixel-Diff (Task 1).

**Spec:** `docs/website/specs/2026-07-26-e5-akten-look-absorption-design.md` — bei Widerspruch gilt die Spec.

## Global Constraints

- Branch: `feat/e5-akten-look` (von `main` nach dem Plan-Commit). **Merge/Push nur auf Ansage.**
- **Explizit stagen**, nie `git add .`/`-A`. Vor jedem Commit `make check` BLOCKING-grün.
- **`?v=` nie von Hand** in Live-HTML (Ausnahme `_template/`, das bump ignoriert — s. Task 11). Engine-/Theme-Bump erst am Ende gesammelt (Task 12, `make bump A=all`); auf dem Branch ist Token-Drift unkritisch, weil `bump --check` nur HTML↔versions.json-Synchronität prüft.
- **Messlatte:** Screenshot-Diff gegen Baseline = **0 px** nach jedem Absorptions-Task (auf den betroffenen Seiten) und in der Gesamt-Abnahme (Task 9). Einzige erlaubte Abweichung: Task 10 (Label-Fix, eigener Commit, Diff dokumentiert).
- **CSS-Kontrakt eingefroren:** Klassennamen aus rd-inject/redesign (`.rd-leitfrage-strip`, `.rd-stempelfeld__cell`, `.aufgabe__typ-badge`, `.rd-karte-frame`, `.rd-foto-mount`, `.rd-foto-stage`, `.rd-stempel`, `.mappe-karte*`, …) werden NICHT umbenannt.
- **Nicht anfassen:** `theme-gpg.css` Sektion 6 (`.fortschritt*`, Z. 286–319), Sektion 12 (Lehrkraft), `.material--zeitleiste` (Z. 1142–1145 — rendert heute schon un-overlayt und muss exakt so bleiben), Print-Block, Differenzierungs-MVP; `core.js`; alle `_archiv-*`-Ordner; Generator-Welt.
- Zeilennummern in diesem Plan = Stand der Exploration 2026-07-26 (theme-gpg.css 2777 Z., redesign.css 835 Z., redesign-uebersicht.css 297 Z., escape-engine.js 5173 Z.). Bei Drift: die genannten Selektoren/Anker sind maßgeblich.
- Wikimedia-Bilder laden übers Netz: Screenshots mit `wait_until="networkidle"`; falls ein Diff ausschließlich in einer externen Bild-Region liegt, Bild-Regionen vergleichend prüfen bevor „Regression" gerufen wird.

---

### Task 1: Screenshot-Harness + Baseline „vorher"

**Files:**
- Create: `tools/smoke/screenshot.py`
- Output (gitignored via `tools/smoke/_out/`): `tools/smoke/_out/shots-vorher/*.png`

**Interfaces:**
- Produces: `shoot <label>` erzeugt 7 deterministische Voll-Seiten-PNGs; `diff <a> <b>` vergleicht pixel-genau (Exit 1 bei Diff, schreibt Diff-PNGs). Alle Absorptions-Tasks (3–9, 11) verifizieren hiermit.

- [ ] **Step 1: Branch anlegen + Umgebung sichern**

```bash
cd /Users/paulad/weitergehts.online/weitergehts-online
git checkout -b feat/e5-akten-look
[ -x .venv/bin/python3 ] || make smoke-setup
.venv/bin/pip install --quiet pillow
```

- [ ] **Step 2: `tools/smoke/screenshot.py` anlegen** (komplett):

```python
#!/usr/bin/env python3
"""screenshot.py — deterministische Voll-Seiten-Screenshots der Syrien-Seiten (E5-Abnahme).

Nutzung (aus dem Repo-Root):
  .venv/bin/python3 tools/smoke/screenshot.py shoot <label>       # -> tools/smoke/_out/shots-<label>/
  .venv/bin/python3 tools/smoke/screenshot.py diff <labelA> <labelB>

Gleiche Umgebung wie tools/smoke/smoke.py (.venv-Playwright, eigener http.server).
Seed-Varianten befuellen localStorage vor dem Laden (gelöste Aufgaben/abgeschlossene
Mappen), damit auch der solved-Look (Stempelfeld, Status-Stempel) verglichen wird.
"""
import json
import pathlib
import subprocess
import sys
import time

from playwright.sync_api import sync_playwright

REPO = pathlib.Path(__file__).resolve().parents[2]
OUT = REPO / "tools" / "smoke" / "_out"
PORT = 8123
GAME = "unterricht/escape-games/syrische-revolution-2011"
STORAGE_KEY = "escape-syrische-revolution-2011"

SEED = {
    "mappen": {
        "mappe-1": {
            "abgeschlossen": True,
            "aufgaben": {"auf-1-%d" % i: {"geloest": True} for i in range(1, 8)},
        },
        "mappe-2": {"aufgaben": {"auf-2-1": {"geloest": True}}},
    },
    "letzteAktivitaet": "2026-07-26T00:00:00.000Z",
}

PAGES = [  # (datei, seed?, shot-name)
    ("index.html", False, "uebersicht-clean"),
    ("index.html", True, "uebersicht-progress"),
    ("mappe-1.html", False, "mappe-1-clean"),
    ("mappe-1.html", True, "mappe-1-solved"),
    ("mappe-2.html", True, "mappe-2-teilsolved"),
    ("mappe-3.html", False, "mappe-3-clean"),
    ("mappe-4.html", False, "mappe-4-clean"),
]


def shoot(label):
    outdir = OUT / ("shots-" + label)
    outdir.mkdir(parents=True, exist_ok=True)
    server = subprocess.Popen(
        [sys.executable, "-m", "http.server", str(PORT), "--bind", "127.0.0.1"],
        cwd=REPO, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        time.sleep(1.0)
        with sync_playwright() as p:
            browser = p.chromium.launch()
            for page_file, seed, name in PAGES:
                ctx = browser.new_context(
                    viewport={"width": 1440, "height": 1000},
                    device_scale_factor=1, reduced_motion="reduce")
                if seed:
                    ctx.add_init_script(
                        "localStorage.setItem(%s, %s);"
                        % (json.dumps(STORAGE_KEY), json.dumps(json.dumps(SEED))))
                pg = ctx.new_page()
                pg.goto("http://127.0.0.1:%d/%s/%s" % (PORT, GAME, page_file),
                        wait_until="networkidle", timeout=45000)
                pg.wait_for_timeout(1200)
                pg.screenshot(path=str(outdir / (name + ".png")),
                              full_page=True, animations="disabled")
                ctx.close()
            browser.close()
    finally:
        server.terminate()
    print("OK: %d Screenshots -> %s" % (len(PAGES), outdir))


def diff(a, b):
    from PIL import Image, ImageChops
    da, db = OUT / ("shots-" + a), OUT / ("shots-" + b)
    fail = 0
    for f in sorted(da.glob("*.png")):
        g = db / f.name
        if not g.exists():
            print("FEHLT in %s: %s" % (b, f.name)); fail += 1; continue
        ia, ib = Image.open(f).convert("RGB"), Image.open(g).convert("RGB")
        if ia.size != ib.size:
            print("DIFF  %s: Groesse %s vs %s" % (f.name, ia.size, ib.size)); fail += 1; continue
        d = ImageChops.difference(ia, ib)
        if d.getbbox() is None:
            print("OK    %s: 0 px" % f.name)
        else:
            npx = sum(1 for px in d.getdata() if px != (0, 0, 0))
            dp = OUT / ("diff-%s-vs-%s-%s" % (a, b, f.name))
            d.save(dp)
            print("DIFF  %s: %d px (bbox %s) -> %s" % (f.name, npx, d.getbbox(), dp)); fail += 1
    sys.exit(1 if fail else 0)


if __name__ == "__main__":
    if len(sys.argv) >= 3 and sys.argv[1] == "shoot":
        shoot(sys.argv[2])
    elif len(sys.argv) >= 4 and sys.argv[1] == "diff":
        diff(sys.argv[2], sys.argv[3])
    else:
        print(__doc__); sys.exit(2)
```

- [ ] **Step 3: Baseline erzeugen + Selbsttest**

```bash
.venv/bin/python3 tools/smoke/screenshot.py shoot vorher
ls tools/smoke/_out/shots-vorher/          # Erwartet: 7 PNGs
.venv/bin/python3 tools/smoke/screenshot.py shoot selftest
.venv/bin/python3 tools/smoke/screenshot.py diff vorher selftest
```

Erwartet: `diff` meldet 7 × `OK … 0 px`, Exit 0. Falls einzelne Seiten flackern (externe Bilder/Timing): `wait_for_timeout` erhöhen und Baseline NEU schießen, bis der Selbsttest zweimal hintereinander 0 px liefert — sonst ist die Messlatte wertlos. `shots-selftest/` danach löschen.

- [ ] **Step 4: Sichtprüfung der Baseline** — `mappe-1-solved.png` zeigt volles Stempelfeld (7 ✓) und auf `uebersicht-progress.png` trägt Mappe 1 den Stempel „Archiviert", Mappe 2 „Dringend", Mappe 3/4 „Vertraulich" + ausgegraut.

- [ ] **Step 5: Commit**

```bash
git add tools/smoke/screenshot.py
git commit -m "chore(smoke): Screenshot-Harness fuer E5-Pixel-Abnahme (shoot/diff, Seed-Varianten)"
```

---

### Task 2: Akten-Token-Block in `theme-gpg.css`

**Files:**
- Modify: `assets/css/themes/theme-gpg.css` (neuer `:root`-Nachtrag, Muster analog `--he-*` Z. 1312 / `--tb-*` Z. 1514 — platziert ans Datei-Ende als neue Sektion „21. E5: Akten-Token-Block")

**Interfaces:**
- Produces: die Tokens der Tabelle unten. Alle absorbierten Regeln (Tasks 3–6, 8) referenzieren AUSSCHLIESSLICH diese bzw. die vorhandenen `--color-*`-Tokens — nie mehr `--rd-*`/`--op-*`.

**Token-Mapping (verbindlich; Basis = heute AKTIVE Werte, d. h. `[data-bg="dark"]`+`humanist`-Zweig aus `redesign.css:44-45`, Übersicht aus `redesign-uebersicht.css:24-36`):**

| Neues Token | Wert | ersetzt | Entscheid |
|---|---|---|---|
| *(vorhanden)* `--color-primary` | `#1B2A4A` | `--rd-navy`, `--op-navy` | wertgleich → vorhandenes Token nutzen |
| *(vorhanden)* `--color-secondary` | `#C9A84C` | `--rd-gold`, `--op-gold` | wertgleich → nutzen |
| *(vorhanden)* `--color-success` | `#2D6A4F` | `--rd-success`, `--op-pin-done` | wertgleich → nutzen |
| *(vorhanden)* `--color-error` | `#9B2226` | `--rd-error`, `--op-pin-locked` | wertgleich → nutzen |
| *(vorhanden)* `--color-tipp` | `#4A6FA5` | `--rd-tipp` | wertgleich → nutzen |
| *(vorhanden)* `--font-fragebogen` | `'Architects Daughter', cursive` | `--rd-font-hand`, `--op-font-hand` | wertgleich → nutzen |
| `--akte-bg` | `#1F1812` | `--rd-bg` (Dark-Zweig) | neu |
| `--akte-paper` | `#2A211A` | `--rd-paper` (Dark) | neu |
| `--akte-cream` | `#2A211A` | `--rd-cream` (Dark) | neu (heute wertgleich mit paper — trotzdem eigenes Token, Rollen getrennt) |
| `--akte-ink` | `#E8E0D0` | `--rd-ink` (Dark) | neu |
| `--akte-muted` | `#B8AC95` | `--rd-muted` (Dark) | neu |
| `--akte-border` | `#4a3e2c` | `--rd-border` (Dark) | neu |
| `--akte-gold-light` | `#E0C57E` | `--rd-gold-light` | neu (≠ `--color-secondary-light #d4b86a` — getrennt lassen, pixel-treu) |
| `--akte-font-body` | `'Spectral', Georgia, serif` | `--rd-font-body` (humanist-Zweig) | neu |
| `--akte-font-display` | `'IM Fell English', Georgia, serif` | `--rd-font-display`, `--op-font-display` | neu |
| `--akte-font-mono` | `'Special Elite', 'Courier New', monospace` | `--rd-font-mono`, `--op-font-mono` | neu |
| `--akte-fs-body` | `17px` | `--rd-fs-body` | neu |
| `--akte-desk` | `#3A2616` | `--op-desk` | neu (Übersicht) |
| `--akte-dossier` | `#FAF3E3` | `--op-dossier` | neu (≠ `--rd-paper` hell — getrennt) |
| `--akte-dossier-ink` | `#2A1F0F` | `--op-ink` | neu (≠ `--rd-ink` — Tinte AUF Dossier-Papier, andere Rolle) |
| `--akte-dossier-meta` | `#5A4A2A` | `--op-meta` | neu |
| `--akte-label` | `#F5E6C0` | `--op-label` | neu |
| `--akte-pin-open` | `#D4A017` | `--op-pin-open` | neu |

Die hellen `:root`-Literale aus `redesign.css:25-42` sind heute **inaktiv** (alle 5 HTML setzen `data-bg="dark"`) und werden NICHT übernommen; `[data-bg="white"]`/`[data-fontset]`-Zweige entfallen ersatzlos (Spec E2-Präzisierung).

- [ ] **Step 1: Token-Block ans Ende von `theme-gpg.css` anhängen**

```css
/* ============================================================
   21. E5: Akten-Token-Block (2026-07)
   Vereinigt die vendor-Namensraeume --rd-* (Mappen, Dark-Zweig)
   und --op-* (Uebersicht). Rollennamen analog tokens.css,
   Praefix --akte- gegen Kollision mit der Site-Kette.
   Wertgleiche Rollen nutzen die --color-*-Tokens aus Sektion 1.
   ============================================================ */
:root {
  --akte-bg: #1F1812;
  --akte-paper: #2A211A;
  --akte-cream: #2A211A;
  --akte-ink: #E8E0D0;
  --akte-muted: #B8AC95;
  --akte-border: #4a3e2c;
  --akte-gold-light: #E0C57E;
  --akte-font-body: 'Spectral', Georgia, serif;
  --akte-font-display: 'IM Fell English', Georgia, serif;
  --akte-font-mono: 'Special Elite', 'Courier New', monospace;
  --akte-fs-body: 17px;
  /* Uebersicht (Schreibtisch/Dossier) */
  --akte-desk: #3A2616;
  --akte-dossier: #FAF3E3;
  --akte-dossier-ink: #2A1F0F;
  --akte-dossier-meta: #5A4A2A;
  --akte-label: #F5E6C0;
  --akte-pin-open: #D4A017;
}
```

- [ ] **Step 2: Verifizieren — reine Definition, keine Wirkung**

```bash
make check
.venv/bin/python3 tools/smoke/screenshot.py shoot t2 && .venv/bin/python3 tools/smoke/screenshot.py diff vorher t2
```

Erwartet: check grün, diff 7 × 0 px.

- [ ] **Step 3: Commit** — `git add assets/css/themes/theme-gpg.css && git commit -m "feat(engine): E5 Akten-Token-Block in theme-gpg (vendor-Namensraeume vereinigt)"`

---

### Tasks 3–6: CSS-Absorption in 4 Paketen — gemeinsame Methode

Jedes Paket überträgt einen vendor-Block nach `theme-gpg.css` und löscht ihn aus der vendor-Datei (Overlay schrumpft; vendor bleibt bis Task 9 verlinkt). **Transformationsregeln (gelten für alle 4 Pakete):**

1. **Kollisions-Regel** (vendor-Selektor hat theme-gpg-Gegenstück): die bestehende theme-gpg-Regel **in-place editieren** — Property-Werte durch die vendor-Werte ersetzen, vendor-only-Properties ergänzen, theme-gpg-only-Properties löschen, wenn der vendor sie neutralisiert hat (z. B. `background-image: none` gegen ein theme-Pergament ⇒ Property im Theme streichen statt none setzen). **Kein `!important` übernehmen.**
2. **Doppel-Definitionsorte** (`.aufgabe*` existiert in Sektion 7 UND spezifischer in Sektion 19c ab Z. 1566): der finale Wert gehört an den **gewinnenden** Ort = Sektion 19c; Sektion 7 nur anpassen, wo 19c die Property gar nicht setzt. Nach dem Paket per DevTools/Screenshot verifizieren, nicht raten.
3. **Additions-Regel** (kein Gegenstück — `.rd-*`-Komponenten, `.tagebuch__ort`, `.statistik__grafik`, `#nav-mappe-info`, `.sicherung__tafelbild-frame`, `.rd-stempel`, `#game-titel`, `#narrativ-text`): als neue Regeln in die thematisch passende theme-gpg-Sektion übernehmen (ohne `!important`, Tokens gemappt).
4. **Token-Mapping:** `--rd-*`/`--op-*` → Tabelle aus Task 2. Hartcodierte Hex-Werte in vendor-Regeln bleiben hartcodiert (keine Kreativ-Tokenisierung — pixel-treu, YAGNI).
5. **Label-Ausnahme:** die drei AKTE-/DOSSIER-`content`-Regeln (`redesign.css:64-66` Anteil `content:"AKTE 04 · PULVERFASS EUROPA"`, `redesign-uebersicht.css:80-81`, `:210-211`) bleiben **vorerst in der vendor-Datei** (wandern in Task 8 als DOM+CSS). Game-agnostische `content`-Texte („SICHERUNGSHEFT", „PHASE 3 · SICHERUNG", `"✓"`, Submit-Texte, `"↳"`, Deko-`content:""`) werden normal mit absorbiert.
6. **Verifikation je Paket:** `make check` grün + `screenshot.py shoot t<N>` + `diff vorher t<N>` = 7 × 0 px + Commit (`theme-gpg.css` + geschrumpfte vendor-Datei zusammen stagen).

Falls ein Paket-Diff ≠ 0: Kaskade prüfen (meist Spezifität Sektion 7 vs. 19c oder ein vergessenes vendor-`!important`, das vorher eine DRITTE Regel überstimmt hat), fixen, erneut schießen. Nicht mit bekanntem Diff weiterarbeiten.

### Task 3: Absorption I — Mappen-Gerüst (Body · Akten-Header · Grid · Einstieg) + Dark-Attribute

**Files:**
- Modify: `assets/css/themes/theme-gpg.css` (Sektionen 2/3/5/15), `unterricht/escape-games/syrische-revolution-2011/vendor/redesign.css` (Blöcke löschen), alle 5 Syrien-HTML (`<html>`-Attribute)

- [ ] **Step 1:** `redesign.css` Z. 23–53 (Tokens + Body-Basis) übertragen: Body-Regeln (Z. 48–53) in theme-gpg Sektion 2/3 einarbeiten (`background: var(--akte-bg)`, `color: var(--akte-ink)`, `font-family: var(--akte-font-body)`, `font-size: var(--akte-fs-body)`); danach den kompletten Token-/Varianten-Block Z. 23–46 UND Z. 48–53 aus `redesign.css` löschen.
- [ ] **Step 2:** `data-bg="dark" data-fontset="humanist"` aus dem `<html>`-Tag aller 5 Syrien-HTML entfernen (Zeile 2 je Datei) — die Zweige existieren nicht mehr, Dark ist Token-Default.
- [ ] **Step 3:** Akten-Header `redesign.css` Z. 55–96 **ohne** die Label-`content`-Zeilen (Z. 64–66 bleiben als Rumpf-Regel in redesign.css stehen) → theme-gpg Sektion 3/5 (`body > header`, `.mappe__titel` Z. 222, `.mappe__beschreibung` Z. 232 in-place ersetzen).
- [ ] **Step 4:** Zwei-Spalten-Grid Z. 139–163 → Sektion 15 (Z. 1060–1094, `.mappe__erarbeitung` Grid-Werte ersetzen); Einstieg Z. 165–196 → Sektion 17 (`.mappe__einstieg`/`.einstieg__*` Z. 243/250 ersetzen; der frühere Dark-Zweig Z. 191 IST jetzt der Normalzustand).
- [ ] **Step 5:** Verifikation + Commit gemäß Methode (`git add assets/css/themes/theme-gpg.css unterricht/escape-games/syrische-revolution-2011/vendor/redesign.css unterricht/escape-games/syrische-revolution-2011/*.html`), Message `feat(engine): E5-Absorption I — Mappen-Geruest dark-default in theme-gpg`.

### Task 4: Absorption II — Materialien + Überleitungen + media-placeholder

**Files:**
- Modify: `theme-gpg.css` (Sektionen 16 Z. 1095–1155, 19b Z. 1534–1565), `vendor/redesign.css` (Z. 198–405 raus), `vendor/media-placeholder.css` (leeren)

- [ ] **Step 1:** Material-Blöcke `redesign.css` Z. 198–364 → Sektion 16 (Kollisionen in-place: `.material`, `__flag`, `__titel`, `--darstellung`, `--tagebuch`/`--quelle`, `--karte`, `--bild`, `--statistik`; Additionen dazu: `.rd-karte-frame` (+Gitter-`::before`), `.rd-foto-mount`/`.rd-foto-stage`, `.tagebuch__ort`, `.statistik__grafik`, `.material--karte--dark`). **`.material--zeitleiste` (theme-gpg Z. 1142–1145) NICHT anfassen.**
- [ ] **Step 2:** Überleitungen Z. 365–405 → Sektion 19b (in-place ersetzen; Pin-/`"↳"`-`content` mitnehmen).
- [ ] **Step 3:** `media-placeholder.css` (9 Z., wörtlich dokumentiert in der Spec-Exploration) ans Ende von Sektion 16 übernehmen; vendor-Datei bis auf Kopfkommentar leeren.
- [ ] **Step 4:** Verifikation + Commit `feat(engine): E5-Absorption II — Material-Bloecke + Ueberleitungen + Placeholder`.

### Task 5: Absorption III — Sicherungsheft/Aufgaben + Sicherung + Footer-Nav

**Files:**
- Modify: `theme-gpg.css` (Sektionen 7 Z. 320–696, 19c Z. 1566–2160, 17 Sicherung), `vendor/redesign.css` (Z. 407–835 bis auf Label-Rumpf raus)

- [ ] **Step 1:** Der große Block `redesign.css` Z. 407–757 → Sektionen 7 + 19c nach Kollisions-/Doppel-Definitions-Regel (2). Enthaltene game-agnostische `content`-Texte („SICHERUNGSHEFT" Z. 443, `"✓"` Z. 519, Submit-Texte Z. 625/632) werden mit absorbiert. `.aufgabe__typ-badge` (theme-gpg Z. 352) bekommt die vendor-Optik (Z. 525).
- [ ] **Step 2:** Sicherung Z. 758–776 (inkl. „PHASE 3 · SICHERUNG") + Footer-Nav Z. 777–803 (`body > footer{display:none}` mitnehmen) + Tafelbild-Frame Z. 833–835 → passende Sektionen (17 / 3).
- [ ] **Step 3:** `.rd-tweaks`-Block Z. 805–831 **ersatzlos löschen** (verifiziert tot; Spec E2).
- [ ] **Step 4:** Nach diesem Task enthält `redesign.css` NUR noch: Kopfkommentar + Leitfrage-Strip/Stempelfeld-Block (Z. 98–137 — bleibt bis Task 7 hier? **Nein:** auch Z. 98–137 in diesem Task nach theme-gpg übernehmen (reine Addition, DOM kommt weiterhin von rd-inject) ) + die Label-Rumpf-Regel (`body > header::before` mit `content`). Prüfen: `grep -cv '^\s*$\|^\s*/\*\|\*/' unterricht/escape-games/syrische-revolution-2011/vendor/redesign.css` → nur noch die Label-Regel (≈ 3–10 Zeilen).
- [ ] **Step 5:** Verifikation (besonders `mappe-1-solved.png`/`mappe-2-teilsolved.png` — Stempelfeld, solved-✓s, Submit-Texte) + Commit `feat(engine): E5-Absorption III — Sicherungsheft/Aufgaben-Restyle in theme-gpg`.

### Task 6: Absorption IV — Übersicht (Dossier-Look)

**Files:**
- Modify: `theme-gpg.css` (Sektion 4 Z. 128–209, Sektion 11 `.narrativ` Z. 856–877, Sektion 3 header), `vendor/redesign-uebersicht.css` (alles bis auf die 2 Label-Regeln raus)

- [ ] **Step 1:** `redesign-uebersicht.css` Z. 39–47 (Schreibtisch-Body), 49–108 (Header/`#game-titel` OHNE Label-Regel Z. 80–81), 110–132 (Narrativ — statt `::before{display:none!important}` das `content:"📜"` in theme-gpg Z. 870 direkt entfernen), 134–297 (Grid/Dossier-Karten/`.rd-stempel`/Footer, OHNE Label-Regel Z. 210–211) → Sektion 4 in-place + neue Unterabschnitte. **Achtung Geltungsbereich:** diese Regeln gelten heute nur auf `index.html` (eigene Datei). Nach der Absorption gelten sie via theme-gpg auch auf Mappen-Seiten, wo dieselben Selektoren teils NICHT existieren (`.mappe-karte` etc. — unkritisch) aber `body`/`body > header`/`body > footer` SCHON (Kollision mit Task-3-Werten!). Deshalb: alle übersichts-spezifischen `body`-/`header`-/`footer`-/`main`-Regeln beim Übertragen mit `body.uebersicht`-Scope versehen — und `class="uebersicht"` auf das `<body>` der Syrien-`index.html` setzen (+ `_template/index.html` in Task 8). Das ist die einzige erlaubte DOM-Änderung dieses Tasks.
- [ ] **Step 2:** Verifikation: `uebersicht-clean.png`/`uebersicht-progress.png` = 0 px UND alle 5 Mappen-Shots = 0 px (beweist, dass der Scope hält). Commit `feat(engine): E5-Absorption IV — Dossier-Uebersicht in theme-gpg (body.uebersicht-Scope)`.

---

### Task 7: rd-inject → Engine (3 DOM-Jobs)

**Files:**
- Modify: `assets/js/escape-engine.js`, alle 5 Syrien-HTML (rd-inject-`<script>`-Zeile raus)
- Delete: `unterricht/escape-games/syrische-revolution-2011/vendor/rd-inject.js`

**Interfaces:**
- Consumes: CSS-Klassen aus Tasks 3–6 (Kontrakt eingefroren).
- Produces: Engine rendert `.aufgabe__typ-badge` (in `_renderAufgabe`), `.rd-leitfrage-strip`+`.rd-stempelfeld` (Ende `_renderMappeV1`), `.rd-karte-frame`/`.rd-foto-mount`+`.rd-foto-stage` (in den Material-Renderern); `_syncStempelfeld()` läuft am Ende von `_updateFortschritt`.

- [ ] **Step 1: `TYP_LABEL`-Konstante** neben `AufgabentypRegistry` (bei Z. 146) einfügen — erweitert um die 3 fehlenden Typen (für Syrien unsichtbar, da ungenutzt):

```js
var TYP_LABEL = {
  'multiple-choice': 'Multiple-Choice', 'zuordnung': 'Zuordnung',
  'lueckentext': 'Lückentext', 'reihenfolge': 'Reihenfolge',
  'freitext-code': 'Freitext', 'freitext': 'Freitext',
  'vergleich': 'Vergleich', 'begruendung': 'Begründung', 'quellenkritik': 'Quellenkritik'
};
```

- [ ] **Step 2: Typ-Badge in `_renderAufgabe`** — direkt nach `section.appendChild(header)` (Z. 2159):

```js
var typBadge = document.createElement('span');
typBadge.className = 'aufgabe__typ-badge';
typBadge.textContent = TYP_LABEL[aufgabe.typ] || aufgabe.typ;
header.appendChild(typBadge);
```

- [ ] **Step 3: Leitfrage-Strip + Stempelfeld** — zwei neue private Funktionen (neben `_updateFortschritt`, Z. 4455ff):

```js
function _renderLeitfragenStrip() {
  if (document.querySelector('.rd-leitfrage-strip')) return;
  var lf = document.querySelector('.einstieg__problemstellung');
  var aufg = document.querySelectorAll('.aufgabe');
  if (!lf || !aufg.length) return;
  var strip = document.createElement('div');
  strip.className = 'rd-leitfrage-strip';
  var label = document.createElement('span');
  label.className = 'rd-leitfrage-strip__label';
  label.textContent = 'Leitfrage';
  var text = document.createElement('span');
  text.className = 'rd-leitfrage-strip__text';
  text.textContent = lf.textContent;
  strip.appendChild(label); strip.appendChild(text);
  var stf = document.createElement('div');
  stf.className = 'rd-stempelfeld';
  stf.setAttribute('aria-label', 'Fortschritt');
  for (var i = 0; i < aufg.length; i++) {
    var c = document.createElement('span');
    c.className = 'rd-stempelfeld__cell';
    c.textContent = String(i + 1);
    stf.appendChild(c);
  }
  strip.appendChild(stf);
  var main = document.querySelector('.mappe') || document.body;
  main.parentNode.insertBefore(strip, main);
  _syncStempelfeld();
}

function _syncStempelfeld() {
  var cells = document.querySelectorAll('.rd-stempelfeld__cell');
  var aufg = document.querySelectorAll('.aufgabe');
  for (var j = 0; j < cells.length && j < aufg.length; j++) {
    var solved = aufg[j].classList.contains('aufgabe--solved');
    cells[j].classList.toggle('rd-stempelfeld__cell--solved', solved);
    var want = solved ? '' : String(j + 1);
    if (cells[j].textContent !== want) cells[j].textContent = want;
  }
}
```

Aufrufe: `_renderLeitfragenStrip();` als letzte Zeile des Render-Pfads in `_renderMappeV1` (nach dem Aufgaben-Loop Z. 2022–2029, vor dem Funktionsende Z. 2102 — an der Stelle, an der alle `.aufgabe`-Knoten und der Einstieg im DOM sind) **und** in `_renderMappe` (MVP-Pfad, vor Z. 2133, gleiche Begründung); `_syncStempelfeld();` als letzte Zeile von `_updateFortschritt` (vor Funktionsende Z. 4502 — läuft damit nach JEDEM Lösen, s. Explorations-Beleg: jede `_check<Typ>` endet mit `_updateFortschritt`).

- [ ] **Step 4: Material-Wrapper** — in `_renderMaterialKarte` (img-Zweig Z. 1092–1097): das `img` nicht mehr direkt an `inhaltDiv` hängen, sondern:

```js
var frame = document.createElement('span');
frame.className = 'rd-karte-frame';
frame.appendChild(img);
inhaltDiv.appendChild(frame);
```

(SVG-Zweig Z. 1090 unverändert — rd-inject wrappte nur `img`.) In `_renderMaterialBild` (Z. 1048–1052): statt `figure.appendChild(img)`:

```js
var mount = document.createElement('span');
mount.className = 'rd-foto-mount';
var stage = document.createElement('span');
stage.className = 'rd-foto-stage';
stage.appendChild(img);
mount.appendChild(stage);
figure.appendChild(mount);
```

- [ ] **Step 5:** `<script src="vendor/rd-inject.js"></script>` aus allen 5 Syrien-HTML löschen (index Z. 31, mappe-N Z. 43); `git rm unterricht/escape-games/syrische-revolution-2011/vendor/rd-inject.js`.
- [ ] **Step 6: Verifikation.** `make check` + Screenshot-Diff 7 × 0 px. Zusätzlich Live-Interaktion (der Teil, den Screenshots nicht abdecken): `python3 -m http.server 8080`, mappe-1 öffnen, eine Aufgabe lösen → Stempelfeld-Zelle wechselt SOFORT auf ✓ (vorher: MutationObserver-indirekt, jetzt `_updateFortschritt`-Hook). `make smoke` grün.
- [ ] **Step 7: Commit** `feat(engine): E5 rd-inject-Jobs in die Engine (Strip/Stempelfeld, Typ-Badges, Bild-Rahmen) — MutationObserver entfaellt`.

---

### Task 8: Übersicht → Engine (`initUebersicht`) + datengetriebene Akten-Labels

**Files:**
- Modify: `assets/js/escape-engine.js` (neue public API), `unterricht/escape-games/syrische-revolution-2011/index.html` (Inline-Script → Aufruf), `unterricht/escape-games/syrische-revolution-2011/data.json` (3 neue optionale Felder, Ist-Werte), `theme-gpg.css` (3 `content`-Regeln → Klassen-Regeln), `vendor/redesign.css` + `vendor/redesign-uebersicht.css` (Label-Rümpfe raus → Dateien leer), `unterricht/escape-games/_template/index.html` (Angleich)

**Interfaces:**
- Consumes: `data.json`-Felder `meta.titel|fach|jahrgangsstufe|narrativ`, `mappen[].id|titel|beschreibung`, Progress-Format (`escape-<slug>` → `{mappen:{<id>:{abgeschlossen,aufgaben}}}`).
- Produces: `EscapeEngine.initUebersicht()` (public); optionale `data.json`-Felder `meta.akten_label`, `meta.dossier_label`, `mappen[i].akten_label`; DOM-Klassen `.akten-label` (Header Übersicht + Mappen) und `.mappe-karte__dossier-label` (Kachel). Fallbacks: `meta.akten_label ?? "AKTE"`, `meta.dossier_label ?? "DOSSIER"`, `mappen[i].akten_label ?? "AKTE " + ('0'+(i+1)).slice(-2)`.

- [ ] **Step 1: `initUebersicht` in die Engine** — Portierung des Inline-Scripts der Syrien-`index.html` (Z. 32–96) als private Funktionen `_renderStartseite`/`_renderMappeKarte` + public `initUebersicht` im `EscapeEngine`-Return-Objekt. Funktionskörper wörtlich aus der index.html übernehmen (Formeln identisch: storageKey-Ableitung, `isCompleted = progress && progress.abgeschlossen`, `isLocked` über Vorgänger-`abgeschlossen`), mit genau diesen Änderungen:

```js
// public:
function initUebersicht() {
  fetch('data.json').then(function (r) {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  }).then(_renderStartseite)
    .catch(function (e) { if (window.console) console.error('Uebersicht:', e); });
}
```

  a) Alle `setText`/DOM-Zugriffe defensiv (`var el = document.getElementById(...); if (el) ...`) — das `_template` hat z. B. einen `game-schwierigkeit`-Span, Syrien nicht.
  b) Stempel-Texte als Konstante `var STEMPEL_LABEL = { completed: 'Archiviert', current: 'Dringend', locked: 'Vertraulich' };` (Ist-Texte aus index.html Z. 78–79 — beim Portieren wörtlich gegen das Original abgleichen und die Status→Text-Zuordnung exakt übernehmen).
  c) Akten-Label-DOM ergänzen (ersetzt die zwei `content`-Regeln der Übersicht):

```js
// in _renderStartseite, nach dem Setzen von #game-titel:
var header = document.querySelector('body > header');
if (header && !header.querySelector('.akten-label')) {
  var akte = document.createElement('span');
  akte.className = 'akten-label';
  akte.textContent = (data.meta && data.meta.akten_label) || 'AKTE';
  header.insertBefore(akte, header.firstChild);
}
// in _renderMappeKarte, vor dem Titel-<h2> (Signatur um `meta` erweitern
// bzw. `data.meta` aus der Closure von _renderStartseite durchreichen):
var dossier = document.createElement('span');
dossier.className = 'mappe-karte__dossier-label';
dossier.textContent = (meta && meta.dossier_label) || 'DOSSIER';
article.appendChild(dossier);   // Position vor titel — Reihenfolge wie ::before visuell
```

- [ ] **Step 2: Mappen-Header-Label** — neue private Funktion, aufgerufen aus `init()` nach `_updateSeitenTitel` (Konsument: `body > header` der mappe-N.html):

```js
function _renderAktenLabel() {
  var header = document.querySelector('body > header');
  if (!header || header.querySelector('.akten-label')) return;
  var idx = -1;
  for (var i = 0; i < _state.data.mappen.length; i++) {
    if (_state.data.mappen[i].id === _state.mappeId) { idx = i; break; }
  }
  var mappe = idx >= 0 ? _state.data.mappen[idx] : null;
  var nr = ('0' + (Math.max(idx, 0) + 1)).slice(-2);
  var label = (mappe && mappe.akten_label) || ('AKTE ' + nr);
  var el = document.createElement('span');
  el.className = 'akten-label';
  el.textContent = label;
  header.insertBefore(el, header.firstChild);
}
```

  (Fallback-Verhalten: mappe-3 ohne Feld ⇒ „AKTE 03".)

- [ ] **Step 3: CSS umstellen** — die 3 Label-`content`-Regeln werden Klassen-Regeln in theme-gpg (Positions-/Font-Properties 1:1 aus den vendor-Rümpfen übernehmen, `content`-Zeile entfällt): `body > header::before` (redesign.css-Rumpf) → `body > header .akten-label` · `#game-titel::before` (uebersicht Z. 80–81) → `body.uebersicht header .akten-label` · `.mappe-karte__titel::before` (Z. 210–211) → `.mappe-karte__dossier-label`. Danach sind beide vendor-CSS bis auf Kopfkommentare leer.
- [ ] **Step 4: `data.json` — Ist-Werte eintragen** (Migration treu, Spec E4-Präzisierung):

```json
"meta": {
    "titel": "Syrische Revolution 2011",
    "akten_label": "LAGEBESPRECHUNG · AKTE 14",
    "dossier_label": "DOSSIER · GPG / R7",
    ...unverändert...
}
```

und in **jeder** der 4 Mappen: `"akten_label": "AKTE 04 · PULVERFASS EUROPA",` (ja, 4× der Ist-Leftover — wird in Task 10 korrigiert).

- [ ] **Step 5: Syrien-`index.html` umbauen** — Inline-Script-Block (Z. 32–96) ersetzen durch:

```html
<script>EscapeEngine.initUebersicht();</script>
```

- [ ] **Step 6: `_template/index.html` angleichen** — Inline-Script ebenfalls durch den `initUebersicht()`-Aufruf ersetzen, `class="uebersicht"` aufs `<body>` (Task-6-Scope), damit neue Games das Muster erben. (Versions-Token des Templates erst in Task 11.)
- [ ] **Step 7: Verifikation** — Screenshot-Diff 7 × 0 px (Labels sehen exakt aus wie vorher, kommen aber aus DOM+Daten); `make check` (B4-Schema-Check muss die neuen optionalen Felder tolerieren — falls FAIL: Befund stoppen und melden, NICHT das Schema-Tool anpassen ohne Rückfrage); `make smoke`.
- [ ] **Step 8: Commit** `feat(engine): E5 Uebersicht in die Engine (initUebersicht) + datengetriebene Akten-Labels`.

---

### Task 9: `vendor/` löschen — Absorptions-Abnahme

**Files:**
- Delete: `unterricht/escape-games/syrische-revolution-2011/vendor/` (komplett)
- Modify: alle 5 Syrien-HTML (vendor-`<link>`-Zeilen raus)

- [ ] **Step 1:** Die 2 vendor-`<link>`-Zeilen je HTML entfernen (index Z. 10–11: `redesign-uebersicht.css` + `media-placeholder.css`; mappe-N Z. 10–11: `redesign.css` + `media-placeholder.css`). `git rm -r unterricht/escape-games/syrische-revolution-2011/vendor/`.
- [ ] **Step 2: Gesamt-Abnahme Absorption:**

```bash
make check && make smoke
.venv/bin/python3 tools/smoke/screenshot.py shoot nach-absorption
.venv/bin/python3 tools/smoke/screenshot.py diff vorher nach-absorption   # Erwartet: 7 x 0 px
grep -rn "vendor/" unterricht/escape-games/syrische-revolution-2011/ && echo "FEHLER: vendor-Referenz uebrig" || echo "OK: keine vendor-Referenzen"
grep -c '!important' assets/css/themes/theme-gpg.css   # Erwartet: 6 (nur der Print-Block; Zahl im Commit-Body dokumentieren)
```

- [ ] **Step 3: Netzwerk-Beweis** — `python3 -m http.server 8080`, DevTools-Netzwerk auf index + mappe-1: kein Request auf `vendor/*`; alle Requests 200.
- [ ] **Step 4: Commit** `feat(engine): E5 vendor-Overlay geloescht — Akten-Look vollstaendig in der geteilten Schicht` (Body: Abnahme-Ergebnis, `!important`-Zählung).

---

### Task 10: Label-Fix-Commit (korrekte Syrien-Texte)

**Files:**
- Modify: `unterricht/escape-games/syrische-revolution-2011/data.json` (nur die 3 Label-Felder)

- [ ] **Step 1:** Werte ersetzen (Paul-freigegeben via Plan-Review; Formulierungen bei Bedarf im Review anpassen):

| Feld | alt (Leftover) | neu |
|---|---|---|
| `meta.akten_label` | `LAGEBESPRECHUNG · AKTE 14` | `LAGEBESPRECHUNG · SYRIEN 2011` |
| `meta.dossier_label` | `DOSSIER · GPG / R7` | *(bleibt — ist korrekt)* |
| `mappen[0].akten_label` | `AKTE 04 · PULVERFASS EUROPA` | `AKTE 01 · DAS SCHWEIGEN` |
| `mappen[1].akten_label` | `AKTE 04 · PULVERFASS EUROPA` | `AKTE 02 · DER FUNKE` |
| `mappen[2].akten_label` | `AKTE 04 · PULVERFASS EUROPA` | `AKTE 03 · KRIEG UND SCHULD` |
| `mappen[3].akten_label` | `AKTE 04 · PULVERFASS EUROPA` | `AKTE 04 · DIE MENSCHEN` |

- [ ] **Step 2:** `make check` grün; `screenshot.py shoot nach-labelfix` + `diff nach-absorption nach-labelfix` → Diffs NUR in den Label-Regionen (Header-Zeile aller Seiten) — Diff-PNGs sichten und im Commit-Body benennen.
- [ ] **Step 3: Commit** `fix(gpg-syrien): korrekte Akten-Labels statt WW1-Leftover (datengetrieben seit E5)`.

---

### Task 11: Asset-Umzug nach `unterricht/assets/`

**Files:**
- Move (git mv): `assets/js/escape-engine.js` → `unterricht/assets/js/escape-engine.js` · `assets/js/core.js` → `unterricht/assets/js/core.js` · `assets/css/base.css` → `unterricht/assets/css/base.css` · `assets/css/themes/theme-gpg.css` → `unterricht/assets/css/theme-gpg.css` (themes/-Zwischenebene entfällt)
- Modify: 5 Syrien-HTML + 3 `_template`-HTML (Pfade), `docs/`-Doku erst in Task 12

**Vorab-Fakten (Exploration):** `versions.json`-Keys sind bare Dateinamen, `bump-assets.py`/`check_assets.py`/`check.sh`/`Makefile` enthalten KEINE hartcodierten Asset-Pfade — es sind ausschließlich HTML-Attributwerte zu ändern. `unterricht/assets/` liegt automatisch in der `make site`-Allowlist (Unterordner von `unterricht/`). `fonts.css` bleibt unter `/assets/` (site-geteilt) — gemischte Tiefen auf denselben Seiten sind die gewollte Konsequenz.

- [ ] **Step 1: Verschieben**

```bash
mkdir -p unterricht/assets/js unterricht/assets/css
git mv assets/js/escape-engine.js unterricht/assets/js/
git mv assets/js/core.js unterricht/assets/js/
git mv assets/css/base.css unterricht/assets/css/
git mv assets/css/themes/theme-gpg.css unterricht/assets/css/
rmdir assets/css/themes assets/js
```

- [ ] **Step 2: Pfade in den 5 Syrien-HTML** (je Datei 4 Attributwerte; `fonts.css`-Zeile NICHT anfassen):
`../../../assets/css/base.css` → `../../assets/css/base.css` · `../../../assets/css/themes/theme-gpg.css` → `../../assets/css/theme-gpg.css` · `../../../assets/js/core.js` → `../../assets/js/core.js` · `../../../assets/js/escape-engine.js` → `../../assets/js/escape-engine.js` (`?v=`-Token unverändert lassen — bump-agnostisch).
- [ ] **Step 3: `_template`-HTML angleichen** (index/lehrkraft/mappe-template): gleiche Pfad-Umstellung; dabei die veralteten Token von Hand auf den aktuellen versions.json-Stand setzen (bump ignoriert `_`-Ordner): `base.css?v=4.7`, `theme-gpg.css?v=3.17`, `core.js?v=4.6`, `escape-engine.js?v=3.22`.
- [ ] **Step 4: Sweep + Verifikation**

```bash
grep -rn "assets/js/escape-engine\|assets/js/core\|assets/css/base\|themes/theme-gpg" \
  --include='*.html' --include='*.md' --include='*.py' --include='*.sh' --include='*.json' . \
  | grep -v "_archiv" | grep -v "unterricht/assets" | grep -v docs/
# Erwartet: keine Treffer (docs/ folgt in Task 12)
make check && make smoke
python3 tools/website/bump-assets.py --check       # Erwartet: OK, alle Token synchron
.venv/bin/python3 tools/smoke/screenshot.py shoot nach-umzug
.venv/bin/python3 tools/smoke/screenshot.py diff nach-labelfix nach-umzug   # Erwartet: 7 x 0 px
make site && ls _site/unterricht/assets/js/        # Erwartet: beide JS im Deploy-Baum
```

- [ ] **Step 5: Commit** `feat(unterricht): E5 Asset-Umzug in den Saeulen-Baum (unterricht/assets/, fonts bleiben site-geteilt)`.

---

### Task 12: `make bump A=all` + Doku + Gesamt-Abnahme

**Files:**
- Modify: `assets/versions.json` + alle Live-HTML (via bump) · `docs/website/SITE_MAP.md` · `docs/website/RUNBUCH.md` (L2/L3-Pfade, Engine-Zeilenzahl, Tiefen-Hinweis `../../assets/`) · `docs/website/PROZESS.md` (E5 ✅ + neuer Ansage-Punkt Generator-Export-Tiefe) · `docs/website/ARCHITEKTUR.md` (Log-Eintrag) · `CLAUDE.md` (Schnellreferenz: Engine-Pfad `unterricht/assets/js/escape-engine.js`)

- [ ] **Step 1:** `make bump A=all` (bumpt alle 7 Keys, gleicht alle Live-HTML an; Engine landet auf 3.23, theme auf 3.18 usw.). `make check` grün.
- [ ] **Step 2: Doku nachziehen** — SITE_MAP: Asset-Tabelle (neue Pfade, vendor-Zeile bei Syrien raus, Ladeketten-Absatz „Unterricht-Assets seit E5 unter `unterricht/assets/`"); RUNBUCH L2 (Pfade), L3 (Asset-Tiefe `../../assets/` für Runtime, `../../../assets/` für fonts); PROZESS (E5 ✅ mit Datum + Ansage-Punkt „sandbox-export: Runtime-Tiefe `../../assets/` lernen — Generator-Welt, fällig vor dem nächsten Export"); ARCHITEKTUR-Log (Absorption vollzogen, Übersicht→Engine-Erweiterung, Label-Migration+Fix, Umzug); CLAUDE.md Schnellreferenz.
- [ ] **Step 3: Gesamt-Abnahme** (Spec-Abnahmeliste komplett):

```bash
make check && make smoke
.venv/bin/python3 tools/smoke/screenshot.py shoot final
.venv/bin/python3 tools/smoke/screenshot.py diff nach-umzug final
# Erwartet: 7 x 0 px (?v=-Bump aendert kein Rendering).
```

Plus manuell: Interaktions-Stichprobe (Aufgabe lösen → Stempel), DevTools: kein vendor-Request, kein 404. Vorher/Nachher-Paar (`shots-vorher` vs. `shots-final`) als Abnahme-Beleg behalten bis zum Merge.

- [ ] **Step 4: Commit** `docs(website-layer): E5 abgeschlossen — Doku/Prozess-Stand + Cache-Bust A=all` — danach **STOPP: Merge/Push nur auf Pauls Ansage** (Vorher/Nachher-Screenshots vorzeigen).

---

## Self-Review (durchgeführt beim Schreiben)

- **Spec-Coverage:** Entscheidung 1 → Tasks 1/9 (Messlatte) · E2 → Tasks 2–6 · E3 (+Erweiterung Übersicht) → Tasks 7/8 · E4 (+Präzisierungen) → Tasks 8/10 · E5 → Task 11 · E6 (Distributions-Neutralität) → keine neuen root-absoluten Pfade in keinem Task; neue Felder generisch · E7 (Reihenfolge) → Task-Folge · Abnahme → Tasks 9/12.
- **Bekannte Rest-Unschärfe (bewusst):** Die CSS-Absorptions-Tasks 3–6 kopieren nicht jeden Property-Wert in den Plan — Quelle der Wahrheit sind die vendor-Dateien im Repo; der Plan fixiert Blöcke, Ziel-Sektionen, Transformationsregeln und die 0-px-Verifikation je Paket. Das ist die belastbarste Form für 1100+ Zeilen CSS-Transfer.
- **Typ-Konsistenz:** `initUebersicht`/`_renderLeitfragenStrip`/`_syncStempelfeld`/`_renderAktenLabel` konsistent benannt; Label-Fallback-Formeln identisch zur Spec; Token-Namen der Tabelle werden in Tasks 3–6/8 wörtlich verwendet.
