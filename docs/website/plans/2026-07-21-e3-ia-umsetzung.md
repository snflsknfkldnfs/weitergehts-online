# E3 IA-Umsetzung — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Drei-Säulen-IA live schalten — Root-Verteiler + `/profil/` im Nebel-&-Papier-System (Referenz-Integration aus `_design-scoping/claude-design/`), Umzug nach `/unterricht/…`, Game-Triage, Impressum/Datenschutz, Favicon; der eine erlaubte URL-Bruch.

**Architecture:** Statische Vanilla-Site (GitHub Pages, kein Build). Site-Seiten laden `fonts.css → tokens.css → wg.css` (neu); Games laden unverändert `fonts.css → base.css → themes/theme-gpg.css`. Die Gates (check/smoke/bump/site) sind selbstpflegend über die Game-Links in einer Index-Datei und ziehen mit um.

**Tech Stack:** HTML/CSS/JS vanilla · Make-Targets (`check`, `smoke`, `bump`, `site`) · Python-Tooling unter `tools/` · Playwright-Smoke via `.venv/` (`make smoke-setup` einmalig, falls `.venv` fehlt).

**Spec:** `docs/website/specs/2026-07-21-e3-ia-umsetzung-design.md` — bei Widerspruch gilt die Spec.

## Global Constraints

- Branch: `feat/e3-ia-umsetzung` (existiert; Spec-Commits liegen drauf). **Merge/Push nur auf Ansage.**
- **Explizit stagen** (`git add <pfade>`), niemals `git add .` / `-A`.
- **`?v=` nie von Hand pflegen:** neue HTML-Links mit `?v=0` schreiben, danach `python3 tools/website/bump-assets.py --sync` (normalisiert gegen `assets/versions.json`).
- Games bleiben visuell unverändert; einzige Game-Datei-Änderungen: Pfad-Tiefe (`../../` → `../../../`) und ein Footer-Link auf der Syrien-`index.html`. Kein Engine-, `base.css`-, `theme-gpg.css`-, `vendor/`-, `data.json`-Touch.
- `_design-scoping/claude-design/` ist die Referenz (read-only Spiegel); `blog/*` daraus wird NICHT übernommen (E4-Vorbehalt).
- `image-slot.js`-Script-Tags und `data-comment-anchor`-Attribute der Referenz sind Design-Umgebungs-Artefakte — in übernommenen Seiten entfernen.
- Commits: Conventional Commits, deutsch, Scope `website-layer`/`assets`/`unterricht` passend.
- Vor jedem Commit: `make check` BLOCKING-grün.

## Voraussetzungen (Content-Übergabe Paul — blockiert Tasks 6+7, nicht 1–5)

Paul legt 5 Original-Fotos (Dateinamen exakt) nach `_design-scoping/claude-design/img/photos/`:
`gleise-ueberwachsen.jpg` · `museum-blick.jpg` · `turm-beton.jpg` · `paul-portrait.jpg` · `kindheit-frankfurterschule.jpg`.
Außerdem (für Task 7, dürfen bis zur Abnahme als `TODO-PAUL` markiert bleiben, aber **nicht mergen** solange vorhanden): Kontakt-Mail-Adresse, Impressums-Angaben (Name, ladungsfähige Anschrift).

---

### Task 1: Fonts self-hosten (Newsreader · Archivo · Space Mono)

**Files:**
- Create: `assets/fonts/newsreader-var-{normal,italic}-latin{,-ext}.woff2`, `assets/fonts/archivo-var-normal-latin{,-ext}.woff2`, `assets/fonts/space-mono-{400,700}-normal-latin{,-ext}.woff2`, `assets/fonts/space-mono-400-italic-latin{,-ext}.woff2` (12 Dateien)
- Modify: `assets/css/fonts.css` (Blöcke anhängen)

**Interfaces:**
- Produces: `font-family`-Namen `"Newsreader"`, `"Archivo"`, `"Space Mono"` — `tokens.css` (Task 2) referenziert sie via `--serif`/`--ui`/`--mono`.

- [ ] **Step 1: Variable/statische woff2 herunterladen (Verfahren identisch zu E1)**

```bash
cd /Users/paulad/weitergehts.online/weitergehts-online
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
curl -sS -A "$UA" 'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..600;1,6..72,400..500&family=Archivo:wght@400..700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap' -o /tmp/gf-wg.css
grep -c '@font-face' /tmp/gf-wg.css   # Erwartet: >= 12 Blöcke (je Familie/Style/Subset)
```

Aus `/tmp/gf-wg.css` je `font-family` × `font-style` × Subset-Kommentar (`/* latin */`, `/* latin-ext */`) die `url(...woff2)` ablesen und gezielt laden (Zuordnung im File nachlesen, nicht raten):

```bash
curl -sS -o assets/fonts/newsreader-var-normal-latin.woff2      '<URL Newsreader normal latin>'
curl -sS -o assets/fonts/newsreader-var-normal-latin-ext.woff2  '<URL Newsreader normal latin-ext>'
curl -sS -o assets/fonts/newsreader-var-italic-latin.woff2      '<URL Newsreader italic latin>'
curl -sS -o assets/fonts/newsreader-var-italic-latin-ext.woff2  '<URL Newsreader italic latin-ext>'
curl -sS -o assets/fonts/archivo-var-normal-latin.woff2         '<URL Archivo latin>'
curl -sS -o assets/fonts/archivo-var-normal-latin-ext.woff2     '<URL Archivo latin-ext>'
curl -sS -o assets/fonts/space-mono-400-normal-latin.woff2      '<URL SpaceMono 400 normal latin>'
curl -sS -o assets/fonts/space-mono-400-normal-latin-ext.woff2  '<URL SpaceMono 400 normal latin-ext>'
curl -sS -o assets/fonts/space-mono-700-normal-latin.woff2      '<URL SpaceMono 700 normal latin>'
curl -sS -o assets/fonts/space-mono-700-normal-latin-ext.woff2  '<URL SpaceMono 700 normal latin-ext>'
curl -sS -o assets/fonts/space-mono-400-italic-latin.woff2      '<URL SpaceMono 400 italic latin>'
curl -sS -o assets/fonts/space-mono-400-italic-latin-ext.woff2  '<URL SpaceMono 400 italic latin-ext>'
```

Fallback, falls die css2-Antwort für Newsreader/Archivo keine Range-Varianten liefert: statische Instanzen anfragen (`Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500` usw.) und die Dateien pro Gewicht benennen (`newsreader-400-normal-latin.woff2` …) — dann in Step 3 pro Gewicht einen eigenen `@font-face`-Block mit festem `font-weight` schreiben.

- [ ] **Step 2: Magic-Bytes + Größe verifizieren**

```bash
for f in assets/fonts/newsreader-* assets/fonts/archivo-* assets/fonts/space-mono-*; do
  printf '%s  %s  %s\n' "$f" "$(head -c4 "$f")" "$(stat -f%z "$f")"
done
```

Erwartet: 12 Zeilen, jede beginnt mit `wOF2`, jede Größe > 4000. HTML/Fehlertext ⇒ Download wiederholen.

- [ ] **Step 3: `@font-face`-Blöcke an `assets/css/fonts.css` anhängen**

Muster (die `unicode-range`-Zeilen wörtlich aus den zugehörigen Blöcken in `/tmp/gf-wg.css` übernehmen — NICHT erfinden; `../fonts/`-Pfad wie in den bestehenden E1-Blöcken der Datei):

```css
/* ---- E3: Site-Fonts (Nebel & Papier) — Newsreader · Archivo · Space Mono ---- */
@font-face {
  font-family: "Newsreader"; font-style: normal; font-weight: 400 600; font-display: swap;
  src: url("../fonts/newsreader-var-normal-latin.woff2") format("woff2");
  unicode-range: /* aus /tmp/gf-wg.css, Newsreader normal, latin-Block */;
}
@font-face {
  font-family: "Newsreader"; font-style: normal; font-weight: 400 600; font-display: swap;
  src: url("../fonts/newsreader-var-normal-latin-ext.woff2") format("woff2");
  unicode-range: /* latin-ext-Block */;
}
@font-face {
  font-family: "Newsreader"; font-style: italic; font-weight: 400 500; font-display: swap;
  src: url("../fonts/newsreader-var-italic-latin.woff2") format("woff2");
  unicode-range: /* latin-Block */;
}
@font-face {
  font-family: "Newsreader"; font-style: italic; font-weight: 400 500; font-display: swap;
  src: url("../fonts/newsreader-var-italic-latin-ext.woff2") format("woff2");
  unicode-range: /* latin-ext-Block */;
}
@font-face {
  font-family: "Archivo"; font-style: normal; font-weight: 400 700; font-display: swap;
  src: url("../fonts/archivo-var-normal-latin.woff2") format("woff2");
  unicode-range: /* latin-Block */;
}
@font-face {
  font-family: "Archivo"; font-style: normal; font-weight: 400 700; font-display: swap;
  src: url("../fonts/archivo-var-normal-latin-ext.woff2") format("woff2");
  unicode-range: /* latin-ext-Block */;
}
@font-face {
  font-family: "Space Mono"; font-style: normal; font-weight: 400; font-display: swap;
  src: url("../fonts/space-mono-400-normal-latin.woff2") format("woff2");
  unicode-range: /* latin-Block */;
}
@font-face {
  font-family: "Space Mono"; font-style: normal; font-weight: 400; font-display: swap;
  src: url("../fonts/space-mono-400-normal-latin-ext.woff2") format("woff2");
  unicode-range: /* latin-ext-Block */;
}
@font-face {
  font-family: "Space Mono"; font-style: normal; font-weight: 700; font-display: swap;
  src: url("../fonts/space-mono-700-normal-latin.woff2") format("woff2");
  unicode-range: /* latin-Block */;
}
@font-face {
  font-family: "Space Mono"; font-style: normal; font-weight: 700; font-display: swap;
  src: url("../fonts/space-mono-700-normal-latin-ext.woff2") format("woff2");
  unicode-range: /* latin-ext-Block */;
}
@font-face {
  font-family: "Space Mono"; font-style: italic; font-weight: 400; font-display: swap;
  src: url("../fonts/space-mono-400-italic-latin.woff2") format("woff2");
  unicode-range: /* latin-Block */;
}
@font-face {
  font-family: "Space Mono"; font-style: italic; font-weight: 400; font-display: swap;
  src: url("../fonts/space-mono-400-italic-latin-ext.woff2") format("woff2");
  unicode-range: /* latin-ext-Block */;
}
```

- [ ] **Step 4: Bump + Gate**

```bash
make bump A=fonts    # fonts.css-Version hoch + alle bestehenden ?v=-Links angleichen
make check           # Erwartet: BLOCKING-Tier GRUEN
```

- [ ] **Step 5: Commit**

```bash
git add assets/fonts/ assets/css/fonts.css assets/versions.json escape-games/
git status --short   # prüfen: NUR fonts/, fonts.css, versions.json + durch den Sync angefasste Game-HTML
git commit -m "feat(assets): Site-Fonts self-hosted — Newsreader/Archivo/Space Mono (E3 Task 1)"
```

(Hinweis: `make bump` fasst per Sync auch Game-HTMLs mit `fonts.css?v=`-Links an — diese Änderungen gehören MIT in den Commit; `escape-games/` als explizites Pfad-Argument deckt sie ab.)

---

### Task 2: `tokens.css`-Umbau + neues `wg.css` + Governance

**Files:**
- Modify: `assets/css/tokens.css` (Inhalt komplett ersetzen)
- Create: `assets/css/wg.css`
- Modify: `assets/versions.json` (+ `"wg.css": "1.0"`), `tools/website/bump-assets.py:52-59` (+ Alias `wg`), `.gitignore` (+ `_design-scoping/`)

**Interfaces:**
- Consumes: Font-Familien aus Task 1.
- Produces: `assets/css/tokens.css` (Token-Vokabular `.mode-light`/`.mode-dark`/`:root`) und `assets/css/wg.css` (Komponenten) — Tasks 5–7 laden beide in der Kette `fonts.css → tokens.css → wg.css`.

- [ ] **Step 1: Token-Block extrahieren → `tokens.css` ersetzen**

```bash
cd /Users/paulad/weitergehts.online/weitergehts-online
{
  cat <<'HDR'
/* ==========================================================================
   tokens.css — Site-Identitäts-Vokabular „Nebel & Papier" (E3, aus dem
   claude-design-Scoping wg.css Z. 9–31 übernommen; Spec 2026-07-21-e3).
   Konsum-Konvention (Site-Seiten): <html class="mode-dark"> als Default +
   Inline-Mode-Script (localStorage 'wg-mode'); Ladekette
   fonts.css → tokens.css → wg.css. Games laden diese Datei NICHT.
   ========================================================================== */
HDR
  sed -n '9,31p' _design-scoping/claude-design/assets/css/wg.css
} > assets/css/tokens.css
grep -c -- '--paper\|--fog\|--serif' assets/css/tokens.css   # Erwartet: >= 5 Treffer
```

- [ ] **Step 2: Komponenten-Teil als `assets/css/wg.css` anlegen**

```bash
{
  cat <<'HDR'
/* ==========================================================================
   wg.css — Komponenten des Site-Designsystems „Nebel & Papier" (E3).
   Erwartet tokens.css (Variablen) + fonts.css (Familien) VOR dieser Datei.
   Quelle: claude-design-Scoping wg.css ab Z. 33 (+ Reset Z. 7).
   ========================================================================== */

*,*::before,*::after{ box-sizing:border-box; margin:0; padding:0; }

HDR
  sed -n '33,238p' _design-scoping/claude-design/assets/css/wg.css
} > assets/css/wg.css
tail -1 assets/css/wg.css    # Sichtkontrolle: letzte Zeile der Referenz-Datei, kein Abschnitt fehlt
```

- [ ] **Step 3: Governance — `versions.json`, Alias, `.gitignore`**

In `assets/versions.json` im `"assets"`-Objekt ergänzen (Komma-Disziplin beachten):

```json
    "wg.css": "1.0"
```

In `tools/website/bump-assets.py` im `ALIASES`-Dict (Z. 52–59) ergänzen:

```python
    "wg": "wg.css",
```

An `.gitignore` anhängen:

```
_design-scoping/
```

- [ ] **Step 4: Bump tokens + Gate**

```bash
make bump A=tokens
make check    # Erwartet: BLOCKING-Tier GRUEN
```

- [ ] **Step 5: Commit**

```bash
git add assets/css/tokens.css assets/css/wg.css assets/versions.json tools/website/bump-assets.py .gitignore
git commit -m "feat(assets): tokens.css auf Nebel-&-Papier umgestellt + wg.css-Komponenten (E3 Task 2)"
```

---

### Task 3: Game-Triage (nur Syrien bleibt gelistet)

**Files:**
- Modify: `index.html:50-72` (drei `<li>`-Blöcke entfernen)
- Rename: `escape-games/{deutscher-nationalismus-kolonialismus,gpg-erster-weltkrieg-ursachen,verlauf-erster-weltkrieg-marne-ende}` → `_archiv-<id>`-Präfix

- [ ] **Step 1: Die drei Alt-Game-`<li>` aus `index.html` löschen**

In `index.html` die kompletten Blöcke `<li id="game-gpg-erster-weltkrieg-ursachen">…</li>`, `<li id="game-verlauf-erster-weltkrieg-marne-ende">…</li>`, `<li id="game-deutscher-nationalismus-kolonialismus">…</li>` (Z. 52–66) entfernen. Übrig bleibt in der Escape-Games-`<ul>` nur `<li id="game-syrische-revolution-2011">`.

- [ ] **Step 2: Ordner archivieren (bestehende `_`-Konvention)**

```bash
git mv escape-games/deutscher-nationalismus-kolonialismus escape-games/_archiv-deutscher-nationalismus-kolonialismus
git mv escape-games/gpg-erster-weltkrieg-ursachen escape-games/_archiv-gpg-erster-weltkrieg-ursachen
git mv escape-games/verlauf-erster-weltkrieg-marne-ende escape-games/_archiv-verlauf-erster-weltkrieg-marne-ende
```

(Nicht verwechseln: `escape-games/_archiv-gpg-erster-weltkrieg-ursachen-run4-v050/` existiert bereits und bleibt unangetastet.)

- [ ] **Step 3: Gate — LIVE_GAMES == genau Syrien**

```bash
make check 2>&1 | grep -i 'syrische\|LIVE\|leer'
```

Erwartet: BLOCKING GRUEN; Prüfzeilen erwähnen nur noch `syrische-revolution-2011`; keine Zeile zu den drei Alt-IDs.

- [ ] **Step 4: Commit**

```bash
git add index.html escape-games
git commit -m "feat(website-layer): Game-Triage — nur Syrien bleibt live, 3 Alt-Games ins _archiv (E3 Task 3)"
```

---

### Task 4: Der Umzug — `unterricht/`-Baum + Gates ziehen mit

**Files:**
- Rename: `escape-games/` → `unterricht/escape-games/`, `sections/wib/` → `unterricht/wib/`
- Modify: `unterricht/escape-games/syrische-revolution-2011/{index,mappe-1,mappe-2,mappe-3,mappe-4}.html` (Pfad-Tiefe), `index.html` (Links), `Makefile:53-62`, `tools/website/check.sh`, `tools/smoke/smoke.py`, `tools/website/bump-assets.py:76-88`, ggf. `tools/source-deploy-parity.sh`, `tools/website/check_assets.py`

**Interfaces:**
- Produces: den Pfad-Namensraum `/unterricht/escape-games/<id>/` und `/unterricht/wib/…` — Tasks 5–8 verlassen sich exakt darauf.

- [ ] **Step 1: Vorbedingung prüfen, dann verschieben**

```bash
ls sections/        # Erwartet: NUR "wib". Falls mehr: STOPP, Rückfrage (Spec deckt nur wib).
mkdir -p unterricht
git mv escape-games unterricht/escape-games
git mv sections/wib unterricht/wib
rmdir sections 2>/dev/null || git rm -r sections   # sections/ muss danach weg sein
```

- [ ] **Step 2: Syrien-Pfad-Tiefe anpassen (5 Dateien, je 5 Treffer)**

```bash
cd unterricht/escape-games/syrische-revolution-2011
sed -i '' 's#\.\./\.\./assets/#../../../assets/#g' index.html mappe-1.html mappe-2.html mappe-3.html mappe-4.html
cd /Users/paulad/weitergehts.online/weitergehts-online
grep -c '\.\./\.\./\.\./assets/' unterricht/escape-games/syrische-revolution-2011/*.html
# Erwartet: 5 Dateien × 5 Treffer
grep -rn '\.\./\.\./assets/' unterricht/escape-games/syrische-revolution-2011/ && echo "FEHLER: Altpfade übrig" || echo OK
```

- [ ] **Step 3: Alte Root-`index.html` auf neue Pfade umstellen (Übergangszustand)**

```bash
sed -i '' -e 's#href="escape-games/#href="unterricht/escape-games/#g' -e 's#href="sections/wib/#href="unterricht/wib/#g' index.html
grep -n 'unterricht/' index.html   # Erwartet: Syrien-Link + 2 WiB-Links
```

- [ ] **Step 4: Werkzeug-Sweep — alle Pfad-Bezüge nachziehen**

Mapping: `escape-games/` → `unterricht/escape-games/` · `sections/` → entfällt (WiB liegt jetzt in `unterricht/wib/`).

```bash
grep -rn 'escape-games\|sections' Makefile tools/website/ tools/smoke/ tools/hooks/ tools/*.sh 2>/dev/null | grep -v '_archiv\|Binary'
```

Jeden Treffer anpassen. Verbindliche Ziel-Zustände:

**(a) `Makefile` site-Target** (Z. 53–62) — neue Fassung der Quellzeilen:

```make
site: clean-site
	mkdir -p _site
	cp index.html _site/
	cp CNAME _site/ 2>/dev/null || true
	[ -f favicon.ico ] && cp favicon.ico _site/ || true
	rsync -a --exclude='_*/' --exclude='.DS_Store' unterricht _site/
	rsync -a --exclude='_*/' --exclude='.DS_Store' assets _site/
	touch _site/.nojekyll
	@echo "_site/ gebaut (Allowlist: index.html, CNAME, unterricht/, assets/)."
```

(Die `sections`-Zeile entfällt ersatzlos; `escape-games` wird zu `unterricht`. Kommentar Z. 51–52 sinngemäß angleichen. 404/favicon.svg/profil/impressum/datenschutz kommen in Tasks 6–7 dazu.)

**(b) `tools/website/check.sh`**: Die Discovery-Regex `escape-games/[a-z0-9-]+/` bleibt UNVERÄNDERT (sie matcht auch in `unterricht/escape-games/…`-Links; Quell-Datei-Wechsel kommt in Task 5). Aber ALLE Pfad-Konstruktionen `escape-games/$g` bzw. `"escape-games/…"` im Skript werden zu `unterricht/escape-games/$g`. Ebenso in `tools/source-deploy-parity.sh` (Deploy-Seite des Vergleichs) und, falls Treffer, `tools/website/check_assets.py`.

**(c) `tools/smoke/smoke.py`**: `pages()` (Z. 51–67) durch diese finale Fassung ersetzen (Existenz-Guards machen sie schon jetzt korrekt, obwohl 404/profil/… erst in Tasks 6–7 entstehen):

```python
def pages():
    urls = []
    for static in ["index.html", "404.html", "profil/index.html",
                   "impressum/index.html", "datenschutz/index.html",
                   "unterricht/index.html"]:
        if (REPO_ROOT / static).exists():
            urls.append("/" + static)
    for g in live_games():
        gdir = REPO_ROOT / "unterricht" / "escape-games" / g
        for name in ["index.html", "lehrkraft.html"]:
            if (gdir / name).exists():
                urls.append(f"/unterricht/escape-games/{g}/{name}")
        for mappe in sorted(gdir.glob("mappe-*.html")):
            urls.append(f"/unterricht/escape-games/{g}/{mappe.name}")
    for f in sorted((REPO_ROOT / "unterricht" / "wib").glob("*.html")):
        rel = f.relative_to(REPO_ROOT)
        if any(part.startswith("_") for part in rel.parts):
            continue
        urls.append("/" + str(rel))
    return urls
```

(`live_games()` Z. 45–47 bleibt in Task 4 unverändert — es liest weiter `index.html`; Umstellung auf `unterricht/index.html` in Task 5.)

**(d) `tools/website/bump-assets.py` `html_files()`** (Z. 76–88): Globs ersetzen durch

```python
    files = list(REPO_ROOT.glob("unterricht/**/*.html"))
    for extra in ["index.html", "404.html"]:
        p = REPO_ROOT / extra
        if p.exists():
            files.append(p)
    files += list(REPO_ROOT.glob("profil/**/*.html"))
    files += list(REPO_ROOT.glob("impressum/**/*.html"))
    files += list(REPO_ROOT.glob("datenschutz/**/*.html"))
```

(Den bestehenden `_`-Filter am Ende der Funktion unverändert lassen.)

- [ ] **Step 5: Gates fahren**

```bash
python3 tools/website/bump-assets.py --sync   # keine Drift
make check    # Erwartet: BLOCKING GRUEN, Prüfungen laufen über unterricht/escape-games/syrische-revolution-2011
make smoke    # Erwartet: alle Seiten OK, inkl. /unterricht/escape-games/…/mappe-*.html und /unterricht/wib/*.html
make site && find _site -maxdepth 1 -type d   # Erwartet: _site/unterricht, _site/assets — KEIN escape-games/sections
```

- [ ] **Step 6: Commit**

```bash
git add unterricht/ index.html Makefile tools/
git status --short   # Kontrolle: Renames als R (git mv hat sie schon gestagt), dazu die editierten Dateien
git commit -m "feat(website-layer): Umzug nach /unterricht/ — Games+WiB, Pfad-Tiefe, Gates nachgezogen (E3 Task 4)"
```

---

### Task 5: Unterricht-Hub (`unterricht/index.html`) + Discovery-Umstellung

**Files:**
- Create: `unterricht/index.html`
- Modify: `tools/website/check.sh` (Discovery-Quelle), `tools/smoke/smoke.py:45-47` (`live_games()`-Quelle)

**Interfaces:**
- Consumes: `tokens.css`/`wg.css` (Task 2), Pfad-Namensraum (Task 4).
- Produces: `unterricht/index.html` mit game-relativen Links `escape-games/<id>/index.html` — die Discovery beider Gates liest ab jetzt DIESE Datei.

- [ ] **Step 1: Hub-Seite anlegen** — `unterricht/index.html` mit exakt diesem Inhalt:

```html
<!DOCTYPE html>
<html lang="de" class="mode-dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Unterricht — weitergehts.online</title>
<link rel="stylesheet" href="../assets/css/fonts.css?v=0">
<link rel="stylesheet" href="../assets/css/tokens.css?v=0">
<link rel="stylesheet" href="../assets/css/wg.css?v=0">
<script>
  (function(){ try{ var m=localStorage.getItem('wg-mode'); var r=document.documentElement;
    r.classList.remove('mode-light','mode-dark'); r.classList.add(m==='light'?'mode-light':'mode-dark'); }catch(e){} })();
</script>
<!-- Staging-Flag (aus dem alten Root übernommen): blendet <li data-status="staging"> aus; sichtbar nur mit ?staging=1 -->
<style>
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
  }
  .hub-list { list-style: none; }
  .hub-list li { border-top: 1px solid var(--rule); }
  .hub-list li:last-child { border-bottom: 1px solid var(--rule); }
  .hub-list a { display: block; padding: 14px 4px; font-family: var(--serif); font-size: 1.15rem; }
  .hub-list a:hover { color: var(--accent); }
</style>
<script>
  (function() {
    try {
      var params = new URLSearchParams(window.location.search);
      if (params.get('staging') === '1') {
        document.documentElement.classList.add('staging-mode');
      }
    } catch (e) { /* staging off */ }
  })();
</script>
</head>
<body class="halo">
<div class="tapete" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>

<header class="topbar">
  <div class="wrap">
    <a class="brand" href="../index.html"><span class="sq"></span></a>
    <nav class="nav">
      <a href="../profil/">Profil</a>
      <a href="./" aria-current="page">Unterricht</a>
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
      <span class="cap">Unterricht</span>
      <h1>Interaktive Unterrichtsmaterialien</h1>

      <h2 class="cap" style="margin-top:2.5rem">Escape-Games</h2>
      <ul class="hub-list">
        <li id="game-syrische-revolution-2011">
          <a href="escape-games/syrische-revolution-2011/index.html">
            Syrische Revolution 2011 (GPG R7)
          </a>
        </li>
      </ul>

      <h2 class="cap" style="margin-top:2.5rem">WiB · Wirtschaft</h2>
      <ul class="hub-list">
        <li id="tool-wib-haushaltsbuch">
          <a href="wib/haushaltsbuch.html">
            Mein Haushaltsbuch — Wohin geht mein Geld? (WiB 7)
          </a>
        </li>
        <li id="tool-wib-geldwert">
          <a href="wib/geldwert.html">
            Wie viel ist mein Geld wert? — Drei Schritte: Budget · Beruf · Reiche (WiB 7)
          </a>
        </li>
      </ul>
    </div>
  </section>
</main>

<footer id="kontakt">
  <div class="wrap foot">
    <span class="fmark">weitergehts.online</span>
    <span class="fline">
      <a href="../index.html">Start</a>
      <a href="../profil/">Profil</a>
    </span>
    <span class="fline">
      <a href="../impressum/">Impressum</a>
      <a href="../datenschutz/">Datenschutz</a>
    </span>
    <span class="fline">© 2026</span>
  </div>
</footer>

<script>
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
</script>
</body>
</html>
```

- [ ] **Step 2: Discovery-Quelle umstellen**

- `tools/website/check.sh`: im Discovery-Block (Z. 46–50) `index.html` → `unterricht/index.html` (die Regex `escape-games/[a-z0-9-]+/` bleibt — die Hub-Links sind hub-relativ und matchen exakt).
- `tools/smoke/smoke.py` `live_games()` (Z. 45–47): die eingelesene Datei `index.html` → `unterricht/index.html`.

- [ ] **Step 3: Sync + Gates**

```bash
python3 tools/website/bump-assets.py --sync    # ersetzt die ?v=0 im Hub durch die echten Versionen
make check    # GRUEN; LIVE_GAMES weiterhin genau syrische-revolution-2011 (jetzt aus unterricht/index.html)
make smoke    # inkl. /unterricht/index.html
```

- [ ] **Step 4: Lokale Sichtprüfung**

```bash
python3 -m http.server 8080 &
# Browser: http://localhost:8080/unterricht/index.html  → dunkle Hub-Seite, Toggle Hell/Dunkel funktioniert,
# http://localhost:8080/unterricht/index.html?staging=1 → Staging-Banner erscheint.
# Syrien-Link klicken → Game lädt vollständig (Engine, Theme, Medien). Danach Server beenden:
kill %1
```

- [ ] **Step 5: Commit**

```bash
git add unterricht/index.html tools/website/check.sh tools/smoke/smoke.py
git commit -m "feat(unterricht): Säulen-Hub mit Staging-Mechanik; Gate-Discovery liest unterricht/index.html (E3 Task 5)"
```

---

### Task 6: Root-Verteiler + 404 + Favicon

**Files:**
- Create: `assets/img/site/{gleise-ueberwachsen,museum-blick,turm-beton}.jpg` (aus Pauls Lieferung), `404.html`, `favicon.svg`, `favicon.ico`
- Modify: `index.html` (komplett ersetzen), `Makefile` (cp-Zeilen)

**Interfaces:**
- Consumes: Fotos aus der Content-Übergabe; `tokens.css`/`wg.css`; Hub-URL `/unterricht/`.
- Produces: Root im wg-System mit 2 Kacheln; `404.html`; Favicon-Dateien.

- [ ] **Step 1: Foto-Vorbedingung prüfen (STOPP falls fehlt)**

```bash
cd /Users/paulad/weitergehts.online/weitergehts-online
mkdir -p assets/img/site
for f in gleise-ueberwachsen museum-blick turm-beton; do
  test -f "_design-scoping/claude-design/img/photos/$f.jpg" || { echo "FEHLT: $f.jpg — Paul liefern lassen, Task pausieren"; break; }
  cp "_design-scoping/claude-design/img/photos/$f.jpg" "assets/img/site/$f.jpg"
done
ls -la assets/img/site/   # Erwartet: 3 Dateien, jede > 50 KB (sonst = abgeschnittene API-Torsi, verwerfen)
```

- [ ] **Step 2: `index.html` komplett ersetzen** — exakt dieser Inhalt (aus `_design-scoping/claude-design/Startseite.html` abgeleitet: 2 Kacheln, Blog raus, self-hosted Fonts, Favicon, keine Design-Umgebungs-Artefakte):

```html
<!DOCTYPE html>
<html lang="de" class="mode-dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>weitergehts.online</title>
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="stylesheet" href="assets/css/fonts.css?v=0">
<link rel="stylesheet" href="assets/css/tokens.css?v=0">
<link rel="stylesheet" href="assets/css/wg.css?v=0">
<script>
  (function(){ try{ var m=localStorage.getItem('wg-mode'); var r=document.documentElement;
    r.classList.remove('mode-light','mode-dark'); r.classList.add(m==='light'?'mode-light':'mode-dark'); }catch(e){} })();
</script>
</head>
<body class="halo">
<div class="tapete" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>

<header class="topbar">
  <div class="wrap">
    <a class="brand" href="index.html"><span class="sq"></span></a>
    <nav class="nav">
      <a href="profil/">Profil</a>
      <a href="unterricht/">Unterricht</a>
      <a href="#kontakt">Kontakt</a>
    </nav>
    <div class="toggle" role="group" aria-label="Hell- oder Dunkelmodus">
      <button id="m-light" aria-pressed="false">Hell</button>
      <button id="m-dark" aria-pressed="true">Dunkel</button>
    </div>
  </div>
</header>

<section class="hero">
  <figure class="hero-bleed">
    <img src="assets/img/site/gleise-ueberwachsen.jpg" alt="Überwachsene, stillgelegte Gleise im Abendlicht">
  </figure>
  <div class="wrap hero-text">
    <h1>weitergehts.online</h1>
    <p class="lede">Illusionen + Simulationen</p>
  </div>
</section>

<section class="block">
  <div class="wrap">
    <span class="cap">Bereiche</span>
    <div class="gw-grid">
      <a class="gw" href="profil/">
        <img class="thumb" src="assets/img/site/museum-blick.jpg" alt="Blick aus einem Museumsraum auf eine Landschaft">
        <h3>Profil / Visitenkarte</h3>
        <p>Wer hinter der Seite steht — das öffentliche Gesicht.</p>
      </a>
      <a class="gw" href="unterricht/">
        <img class="thumb" src="assets/img/site/turm-beton.jpg" alt="Betonturm mit Uhr vor blauem Himmel">
        <h3>Unterricht</h3>
        <p>Interaktive Lernmaterialien und Escape-Games für meine Schülerinnen und Schüler.</p>
      </a>
      <!-- E4: dritter Slot reserviert für die Zettelkasten-Kachel (.gw analog, Thumb zeitschriften.jpg) -->
    </div>
  </div>
</section>

<footer id="kontakt">
  <div class="wrap foot">
    <span class="fmark">weitergehts.online</span>
    <span class="fline">
      <a href="mailto:TODO-PAUL">Kontakt</a>
      <a href="impressum/">Impressum</a>
      <a href="datenschutz/">Datenschutz</a>
    </span>
    <span class="fline">© 2026</span>
  </div>
</footer>

<script>
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
</script>
</body>
</html>
```

- [ ] **Step 3: `404.html` anlegen** (root-absolute Pfade — die Seite wird unter beliebigen URLs ausgeliefert):

```html
<!DOCTYPE html>
<html lang="de" class="mode-dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Seite umgezogen — weitergehts.online</title>
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="stylesheet" href="/assets/css/fonts.css?v=0">
<link rel="stylesheet" href="/assets/css/tokens.css?v=0">
<link rel="stylesheet" href="/assets/css/wg.css?v=0">
<script>
  (function(){ try{ var m=localStorage.getItem('wg-mode'); var r=document.documentElement;
    r.classList.remove('mode-light','mode-dark'); r.classList.add(m==='light'?'mode-light':'mode-dark'); }catch(e){} })();
</script>
</head>
<body class="halo">
<div class="tapete" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>
<main>
  <section class="block">
    <div class="wrap">
      <span class="cap">404</span>
      <h1>Diese Seite ist umgezogen.</h1>
      <p class="lede">Die Website wurde neu geordnet — die Inhalte findest du hier:</p>
      <ul style="list-style:none; margin-top:1.5rem">
        <li style="padding:8px 0"><a href="/" style="color:var(--accent)">→ Startseite</a></li>
        <li style="padding:8px 0"><a href="/profil/" style="color:var(--accent)">→ Profil</a></li>
        <li style="padding:8px 0"><a href="/unterricht/" style="color:var(--accent)">→ Unterricht (Escape-Games &amp; WiB-Tools)</a></li>
      </ul>
    </div>
  </section>
</main>
</body>
</html>
```

- [ ] **Step 4: Favicon erzeugen** — `favicon.svg` mit exakt diesem Inhalt:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#0f110d"/>
  <text x="10" y="46" font-family="Archivo, system-ui, sans-serif" font-weight="700" font-size="40" fill="#e9e6dc">w</text>
  <circle cx="50" cy="44" r="5" fill="#5e6e77"/>
</svg>
```

Dann `favicon.ico` als 32-px-PNG-Render (PNG-in-.ico wird von allen modernen Browsern akzeptiert; Playwright liegt im Smoke-`.venv`):

```bash
.venv/bin/python - <<'PY'
from playwright.sync_api import sync_playwright
import pathlib
svg = pathlib.Path("favicon.svg").resolve()
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 32, "height": 32})
    pg.goto(svg.as_uri())
    pg.screenshot(path="favicon.ico")
    b.close()
PY
file favicon.ico   # Erwartet: PNG image data, 32 x 32
```

- [ ] **Step 5: Makefile-Allowlist ergänzen** — im `site`-Target nach der `cp index.html`-Zeile:

```make
	cp 404.html _site/ 2>/dev/null || true
	[ -f favicon.svg ] && cp favicon.svg _site/ || true
```

(`favicon.ico`-Zeile existiert bereits mit Guard.)

- [ ] **Step 6: Sync + Gates + Sichtprüfung**

```bash
python3 tools/website/bump-assets.py --sync
make check && make smoke
make site && ls _site/ | sort   # Erwartet u. a.: 404.html, favicon.ico, favicon.svg, index.html, unterricht, assets
python3 -m http.server 8080 &
# Browser: http://localhost:8080/ → Hero mit Gleise-Foto, 2 Kacheln, Dark-Default, Toggle OK,
# DevTools-Netzwerk: KEIN Request an fonts.googleapis.com/fonts.gstatic.com.
# http://localhost:8080/404.html → rendert. Danach: kill %1
```

- [ ] **Step 7: Commit**

```bash
git add index.html 404.html favicon.svg favicon.ico assets/img/site/ Makefile
git commit -m "feat(website-layer): Root-Verteiler im Nebel-&-Papier-System, 404, Favicon (E3 Task 6)"
```

---

### Task 7: `/profil/` + `/impressum/` + `/datenschutz/` + Footer-Links

**Files:**
- Create: `profil/index.html`, `profil/img/{paul-portrait,kindheit-frankfurterschule}.jpg`, `impressum/index.html`, `datenschutz/index.html`
- Modify: `unterricht/escape-games/syrische-revolution-2011/index.html` (Footer-Link), `unterricht/wib/haushaltsbuch.html` + `unterricht/wib/geldwert.html` (Footer-Links)

- [ ] **Step 1: Foto-Vorbedingung**

```bash
mkdir -p profil/img
for f in paul-portrait kindheit-frankfurterschule; do
  test -f "_design-scoping/claude-design/img/photos/$f.jpg" || { echo "FEHLT: $f.jpg — Paul liefern lassen"; break; }
  cp "_design-scoping/claude-design/img/photos/$f.jpg" "profil/img/$f.jpg"
done
ls -la profil/img/   # 2 Dateien, je > 50 KB
```

- [ ] **Step 2: `profil/index.html` anlegen** — exakt dieser Inhalt (aus `ueber.html` abgeleitet: Porträt-Hero + Kindheitsfoto als reines Bild-Element, Prosa raus, Kontakt real):

```html
<!DOCTYPE html>
<html lang="de" class="mode-dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Profil — weitergehts.online</title>
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="stylesheet" href="../assets/css/fonts.css?v=0">
<link rel="stylesheet" href="../assets/css/tokens.css?v=0">
<link rel="stylesheet" href="../assets/css/wg.css?v=0">
<script>
  (function(){ try{ var m=localStorage.getItem('wg-mode'); var r=document.documentElement;
    r.classList.remove('mode-light','mode-dark'); r.classList.add(m==='light'?'mode-light':'mode-dark'); }catch(e){} })();
</script>
</head>
<body class="halo">
<div class="tapete" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>

<header class="topbar">
  <div class="wrap">
    <a class="brand" href="../index.html"><span class="sq"></span></a>
    <nav class="nav">
      <a href="./" aria-current="page">Profil</a>
      <a href="../unterricht/">Unterricht</a>
      <a href="#kontakt">Kontakt</a>
    </nav>
    <div class="toggle" role="group" aria-label="Hell- oder Dunkelmodus">
      <button id="m-light" aria-pressed="false">Hell</button>
      <button id="m-dark" aria-pressed="true">Dunkel</button>
    </div>
  </div>
</header>

<main>
  <section class="hero hero--portrait">
    <figure class="hero-bleed">
      <img src="img/paul-portrait.jpg" alt="Porträt von Paul Cebulla">
      <figcaption class="bleed-credit">Foto: Uwe Niklas</figcaption>
    </figure>
    <div class="wrap hero-text">
      <h1>Paul Cebulla</h1>
    </div>
  </section>

  <section class="hero hero--kind">
    <figure class="hero-bleed">
      <img src="img/kindheit-frankfurterschule.jpg" alt="Paul als Kind vor der Tafel »Die Neue Frankfurter Schule«">
    </figure>
  </section>
</main>

<footer id="kontakt">
  <div class="wrap foot">
    <span class="fmark">weitergehts.online</span>
    <span class="fline">
      <a href="../index.html">Start</a>
      <a href="../unterricht/">Unterricht</a>
    </span>
    <span class="fline">
      <a href="mailto:TODO-PAUL">TODO-PAUL</a>
      <a href="../impressum/">Impressum</a>
      <a href="../datenschutz/">Datenschutz</a>
    </span>
    <span class="fline">© 2026</span>
  </div>
</footer>

<script>
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
</script>
</body>
</html>
```

Sichtprüfung nach Step 6: wirkt die bild-only `hero--kind`-Sektion ohne Text-Spalte unausgewogen, `.hero-text`-freie Variante beibehalten (KEINE Prosa ergänzen — Pauls Minimal-Entscheid) und ggf. nur Abstände über eine lokale `<style>`-Regel in der Seite justieren.

- [ ] **Step 3: `impressum/index.html` anlegen:**

```html
<!DOCTYPE html>
<html lang="de" class="mode-dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Impressum — weitergehts.online</title>
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="stylesheet" href="../assets/css/fonts.css?v=0">
<link rel="stylesheet" href="../assets/css/tokens.css?v=0">
<link rel="stylesheet" href="../assets/css/wg.css?v=0">
<script>
  (function(){ try{ var m=localStorage.getItem('wg-mode'); var r=document.documentElement;
    r.classList.remove('mode-light','mode-dark'); r.classList.add(m==='light'?'mode-light':'mode-dark'); }catch(e){} })();
</script>
</head>
<body class="halo">
<div class="tapete" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>
<header class="topbar">
  <div class="wrap">
    <a class="brand" href="../index.html"><span class="sq"></span></a>
    <nav class="nav">
      <a href="../profil/">Profil</a>
      <a href="../unterricht/">Unterricht</a>
    </nav>
  </div>
</header>
<main>
  <section class="block">
    <div class="wrap">
      <span class="cap">Impressum</span>
      <h1>Angaben gemäß § 5 DDG</h1>
      <div class="prose" style="margin-top:1.5rem">
        <p>TODO-PAUL Vorname Name<br>
        TODO-PAUL Straße Hausnummer<br>
        TODO-PAUL PLZ Ort</p>
        <p>Kontakt: <a href="mailto:TODO-PAUL">TODO-PAUL</a></p>
        <p>Verantwortlich für den Inhalt: TODO-PAUL Vorname Name (Anschrift wie oben).</p>
      </div>
    </div>
  </section>
</main>
<footer>
  <div class="wrap foot">
    <span class="fmark">weitergehts.online</span>
    <span class="fline">
      <a href="../index.html">Start</a>
      <a href="../datenschutz/">Datenschutz</a>
    </span>
    <span class="fline">© 2026</span>
  </div>
</footer>
</body>
</html>
```

- [ ] **Step 4: `datenschutz/index.html` anlegen** (gleiches Seitengerüst wie Impressum — Kopf/Topbar/Footer identisch übernehmen, nur `<title>Datenschutz — weitergehts.online</title>`, `cap` = „Datenschutz", `h1` = „Datenschutzerklärung", Footer-Querlink auf `../impressum/`). `<div class="prose">`-Inhalt:

```html
<p>Verantwortlich: TODO-PAUL Vorname Name, TODO-PAUL Anschrift, <a href="mailto:TODO-PAUL">TODO-PAUL</a></p>

<h2>Hosting (GitHub Pages)</h2>
<p>Diese Website wird bei GitHub Pages gehostet (GitHub Inc., 88 Colin P. Kelly Jr. St,
San Francisco, CA 94107, USA). Beim Aufruf werden technisch notwendig IP-Adresse,
Zeitpunkt und abgerufene Datei in Server-Logs von GitHub verarbeitet
(Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse am sicheren Betrieb).
Ich selbst habe auf diese Logs keinen Zugriff. Details:
<a href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement">GitHub Privacy Statement</a>.</p>

<h2>Keine Cookies, kein Tracking</h2>
<p>Diese Website setzt keine Cookies und verwendet keine Analyse- oder Tracking-Dienste.
Im lokalen Speicher deines Browsers (localStorage) werden ausschließlich funktionale
Einstellungen abgelegt: die Hell/Dunkel-Wahl (<code>wg-mode</code>), der Spielstand der
Escape-Games (<code>escape-…</code>) und die Sprachwahl (<code>escape_sprache</code>).
Diese Daten verlassen dein Gerät nicht und können jederzeit über die
Browser-Einstellungen gelöscht werden.</p>

<h2>Schriften</h2>
<p>Alle Schriften werden lokal von dieser Website ausgeliefert (self-hosted).
Es findet keine Verbindung zu Google Fonts statt.</p>

<h2>Eingebundene Inhalte Dritter</h2>
<p>Einzelne Unterrichtsmaterialien laden beim Aufruf Inhalte von Drittservern:
historische Bilder von Wikimedia Commons (<code>upload.wikimedia.org</code>) in den
Escape-Games sowie die Diagramm-Bibliothek Chart.js vom CDN jsDelivr
(<code>cdn.jsdelivr.net</code>) in den WiB-Tools. Dabei wird deine IP-Adresse an den
jeweiligen Anbieter übermittelt (Art. 6 Abs. 1 lit. f DSGVO — Darstellung der Inhalte).</p>

<h2>Deine Rechte</h2>
<p>Du hast nach der DSGVO das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung
der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie ein Beschwerderecht bei
einer Datenschutz-Aufsichtsbehörde (für Bayern: BayLDA, Ansbach). Da diese Website
selbst keine personenbezogenen Daten erhebt oder speichert, richte Anfragen formlos an
die oben genannte Kontaktadresse.</p>
```

- [ ] **Step 5: Footer-Links auf Game- und WiB-Seiten (≤2-Klick-Erreichbarkeit)**

In `unterricht/escape-games/syrische-revolution-2011/index.html` direkt vor `</body>` einfügen (stil-neutral, erbt Game-Styles nicht sichtbar-invasiv):

```html
<footer style="text-align:center; padding:24px 0; font-size:0.8rem; opacity:0.6">
  <a href="/impressum/">Impressum</a> · <a href="/datenschutz/">Datenschutz</a>
</footer>
```

In `unterricht/wib/haushaltsbuch.html` und `unterricht/wib/geldwert.html`: im bestehenden Footer (Suchanker: der Link `href="https://weitergehts.online"`) danach ergänzen:

```html
 · <a href="/impressum/">Impressum</a> · <a href="/datenschutz/">Datenschutz</a>
```

- [ ] **Step 6: Sync + Gates + Sichtprüfung**

```bash
python3 tools/website/bump-assets.py --sync
make check && make smoke   # smoke rendert jetzt auch /profil/ /impressum/ /datenschutz/
python3 -m http.server 8080 &
# Browser: /profil/ → Porträt + Credit + Kindheitsfoto, keine Prosa; /impressum/ + /datenschutz/ lesbar,
# von /unterricht/escape-games/syrische-revolution-2011/index.html aus: Footer-Links funktionieren.
kill %1
```

- [ ] **Step 7: Commit**

```bash
git add profil/ impressum/ datenschutz/ unterricht/escape-games/syrische-revolution-2011/index.html unterricht/wib/
git commit -m "feat(website-layer): /profil/ (Bild-Paar, minimal) + Impressum/Datenschutz + Footer-Links (E3 Task 7)"
```

---

### Task 8: Doku + Gesamt-Abnahme

**Files:**
- Modify: `docs/website/SITE_MAP.md` (Karte neu), `docs/website/RUNBUCH.md` (Pfade der Loops), `docs/website/PROZESS.md` (Stand), `docs/website/ARCHITEKTUR.md` (2 Log-Einträge)

- [ ] **Step 1: `ARCHITEKTUR.md` — zwei Log-Einträge anhängen** (Format der Datei; Wortlaut-Basis, bei Bedarf glätten):

```markdown
- **2026-07-21 — Site-Design-Identität = „Nebel & Papier“ (claude-design-Scoping).** Die
  Site-Ebene (Root, /profil/, später /zettelkasten/) übernimmt das von Paul gescopte
  System (Referenz: claude.ai/design „website allgemein“, lokal `_design-scoping/`):
  Papier-/Nebel-Palette, Newsreader/Archivo/Space Mono (self-hosted), eckig/Haarlinien,
  Dark-Default via `wg-mode`. Der Akten-Look (Navy/Gold) wird Game-Theme → E5; E5 mappt
  `--rd-*`/`--op-*` auf einen theme-internen Akten-Token-Block (Präzisierung E1-Spec §6).
  Zwei Ladeketten: Site `fonts → tokens → wg` · Games `fonts → base → theme-gpg`.
  Verworfen: Akten-Identität site-weit (Dossier-Kostüm für Person/PKM); Neubau statt
  Referenz-Integration (wirft lauffähige High-Fidelity-Referenz weg).
- **2026-07-21/… — E3 IA-Umsetzung (der eine URL-Bruch) umgesetzt.** Root = Verteiler
  (2 Kacheln, 3. Slot für Zettelkasten/E4 reserviert), /profil/ minimal (Porträt +
  Kindheitsfoto, keine Prosa), /unterricht/ = Hub + Games + WiB (Umzug; Alt-Games →
  `_archiv-`), /impressum/ + /datenschutz/, 404.html, Favicon; Gates-Discovery liest
  `unterricht/index.html`. **Quittierte Abweichung vom A0-Umbau-Pfad:** die
  Unterricht-Assets (`escape-engine.js`, `theme-gpg.css`) bleiben unter `/assets/`;
  ihr Umzug in den Säulen-Baum fällt mit E5 zusammen (ein Asset-Touch statt zwei, der
  E3-Bruch bleibt auf Seiten-URLs begrenzt). Verworfen: Asset-Umzug jetzt.
```

- [ ] **Step 2: `SITE_MAP.md` neu schneiden** — Verticals-Tabelle auf die neue IA umstellen (`/` Verteiler · `/profil/` · `/unterricht/` Hub+`escape-games/`+`wib/` · `/impressum/` · `/datenschutz/` · `404.html`), Live-Games-Liste = nur Syrien (+ Hinweis `_archiv-…` reaktivierbar), Geteilte-Assets-Tabelle + neue Dateien (`wg.css`, `tokens.css` neu beschrieben, `assets/img/site/`, 12 neue Fonts), Konventionen unverändert.

- [ ] **Step 3: `RUNBUCH.md`-Loops nachziehen** — alle `escape-games/…`- und `sections/wib/…`-Pfade auf `unterricht/…`; im Loop „neues Game einspielen": Ziel `unterricht/escape-games/<id>/`, Listung + Staging (`?staging=1`) jetzt in `unterricht/index.html`; Hinweis ergänzen, dass der Generator-Export (sandbox-export, Generator-Welt) sein TARGET erst nachziehen muss.

- [ ] **Step 4: `PROZESS.md`** — Stand-Tabelle: E3-Zeile auf „✅ umgesetzt <Datum> auf `feat/e3-ia-umsetzung` … Merge/Deploy auf Ansage (Voraussetzung: Content-Übergabe eingearbeitet, keine TODO-PAUL-Marker)"; unter „Offene Ansage-Punkte" ergänzen: „**Generator-TARGET nachziehen** (sandbox-export → `unterricht/escape-games/`) — in der Generator-Welt, vor dem nächsten Game-Export."

- [ ] **Step 5: Gesamt-Abnahme (alle Beweise, Reihenfolge egal)**

```bash
make check                     # BLOCKING GRUEN; LIVE_GAMES = genau syrische-revolution-2011
make smoke                     # alle Seiten inkl. Root/404/profil/impressum/datenschutz/Hub/Games/WiB
grep -rn '\.\./\.\./assets' unterricht/escape-games/syrische-revolution-2011/*.html ; echo "^ Erwartet: keine Treffer (Exit 1)"
grep -rln 'fonts.googleapis\|fonts.gstatic' index.html 404.html profil/ impressum/ datenschutz/ unterricht/index.html ; echo "^ Erwartet: keine Treffer"
grep -rln 'deutscher-nationalismus-kolonialismus\|gpg-erster-weltkrieg-ursachen\|verlauf-erster-weltkrieg-marne-ende' index.html profil/ impressum/ datenschutz/ unterricht/index.html unterricht/wib/ ; echo "^ Erwartet: keine Treffer"
grep -rln 'image-slot\|data-comment-anchor' index.html 404.html profil/ impressum/ datenschutz/ unterricht/index.html ; echo "^ Erwartet: keine Treffer"
make site && { ls _site/ | sort; test ! -d _site/escape-games && test ! -d _site/sections && echo ALLOWLIST-OK; }
```

**Merge-Gate (MUSS vor Merge/Push leer sein, blockiert NICHT diesen Commit):**

```bash
grep -rn 'TODO-PAUL' index.html profil/ impressum/ datenschutz/ ; echo "^ Vor Merge: keine Treffer erlaubt"
```

- [ ] **Step 6: Commit + STOPP**

```bash
git add docs/website/SITE_MAP.md docs/website/RUNBUCH.md docs/website/PROZESS.md docs/website/ARCHITEKTUR.md
git commit -m "docs(website-layer): E3 dokumentiert — SITE_MAP/RUNBUCH/PROZESS/ARCHITEKTUR-Log (E3 Task 8)"
```

**STOPP: Kein Merge, kein Push.** Paul entscheidet (Ansage). Merge-Reihenfolge-Hinweis: Der Branch
`chore/entmischung-nacharbeit` hängt ebenfalls am `ARCHITEKTUR.md`-Log-Ende — beim Zweit-Merge
entsteht ggf. ein trivialer Append-Konflikt: beide Einträge chronologisch behalten.
