# E1 Design-Fundament — Implementierungsplan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Site-weites Design-Fundament in `assets/`: self-gehostete Webfonts (DSGVO-Sanierung, Google-CDN-`@import` raus), neues Token-Vokabular `tokens.css`, entmischte `base.css` (Lernraum-Block ausgelagert), geschlossene `?v=`-Lücken. Games bleiben visuell unverändert.

**Architektur:** Schlanker E1-Zuschnitt gemäß Spec `docs/website/specs/2026-07-20-e1-design-fundament-design.md` — nur Fundament, kein Game-Rollout (der ist E5). Einziger sichtbarer Eingriff ist der Font-Ladeweg (CDN → lokal, identische Schriften). `tokens.css` und `lernraum.css` liegen versioniert bereit, werden aber von keiner Live-Seite geladen.

**Tech Stack:** Vanilla CSS, statisches Hosting (GitHub Pages), `make check` / `make smoke` (Playwright) / `make bump` als Gates. Kein Build, kein npm.

## Global Constraints

- **Branch:** alles auf `feat/e1-design-fundament` (existiert; enthält bereits den Spec-Commit). NIE auf `main` arbeiten.
- **Git:** explizit stagen (nur die genannten Dateien), **nie `git add .` / `-A`**. Conventional Commits, deutsch, mit Scope. **Kein Push, kein Merge** — der Plan endet mit STOP für Pauls Abnahme.
- **`?v=`-Tokens nie von Hand editieren** — einzige Ausnahme: die ERST-Einfügung neuer `<link>`-Zeilen mit dem aktuellen Soll-Wert aus `assets/versions.json`; danach gilt `make bump`.
- **Nach jeder Task:** `make check` muss BLOCKING-grün sein („BLOCKING: alles gruen“); bei Render-Änderungen (Task 3, 4) zusätzlich `make smoke` (grün; CDN-WARNs zu `cdn.jsdelivr.net` in `sections/wib/` sind normal und ok).
- **Tabu:** `docs/projekt/`, `docs/agents/`, `docs/architektur/`, `bridge/` (Generator-Welt) sowie alle `_`-präfixierten Ordner (`_archive/`, `_template/`, …). `escape-games/syrische-revolution-2011/tafelbild/` nicht anfassen.
- **Plattform:** macOS/zsh → BSD-sed: `sed -i ''`.
- Falls ein GUARD-Step fehlschlägt (Datei sieht anders aus als hier dokumentiert): STOPPEN und Paul fragen, nicht improvisieren.

---

### Task 1: Font-Dateien beschaffen → `assets/fonts/`

**Files:**
- Create: `assets/fonts/` (13 × `.woff2`)
- Quelle 1: `escape-games/syrische-revolution-2011/vendor/fonts/*.woff2` (9 Dateien, kopieren — NICHT verschieben, Syrien referenziert sie bis Task 3)
- Quelle 2: Google Fonts (Caveat variable 400–700, Patrick Hand 400; je latin + latin-ext)

**Interfaces:**
- Produces: die 13 Dateinamen unten — Task 2 (`fonts.css`) referenziert sie exakt so.

- [ ] **Step 1: Ordner anlegen + vendor-Fonts kopieren**

```bash
cd /Users/paulad/weitergehts.online/weitergehts-online
mkdir -p assets/fonts
cp escape-games/syrische-revolution-2011/vendor/fonts/*.woff2 assets/fonts/
ls assets/fonts/ | wc -l   # Erwartet: 9
```

- [ ] **Step 2: Caveat + Patrick Hand herunterladen**

Die css2-API liefert mit Browser-User-Agent woff2-URLs; wir übernehmen nur die Subsets latin + latin-ext (Konvention wie vendor):

```bash
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
curl -sS -A "$UA" 'https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Patrick+Hand&display=swap' -o /tmp/gf.css
# URLs je Subset extrahieren (die css2-Antwort gruppiert Blöcke mit /* latin */ bzw. /* latin-ext */ Kommentaren):
grep -A5 'latin-ext' /tmp/gf.css | grep -o 'https://[^)]*\.woff2' | head -2   # 1× Caveat, 1× Patrick Hand (Reihenfolge: Caveat zuerst)
grep -B1 -A5 '/\* latin \*/' /tmp/gf.css | grep -o 'https://[^)]*\.woff2'
```

Dann die vier URLs gezielt herunterladen (URLs aus obiger Ausgabe einsetzen — Caveat-Blöcke stehen in der Antwort vor den Patrick-Hand-Blöcken; im Zweifel `/tmp/gf.css` lesen und die `url(...)` je `font-family`/Subset-Kommentar zuordnen):

```bash
curl -sS -o assets/fonts/caveat-400-700-normal-latin.woff2      '<URL aus /* latin */-Block von Caveat>'
curl -sS -o assets/fonts/caveat-400-700-normal-latin-ext.woff2  '<URL aus /* latin-ext */-Block von Caveat>'
curl -sS -o assets/fonts/patrick-hand-400-normal-latin.woff2     '<URL aus /* latin */-Block von Patrick Hand>'
curl -sS -o assets/fonts/patrick-hand-400-normal-latin-ext.woff2 '<URL aus /* latin-ext */-Block von Patrick Hand>'
```

- [ ] **Step 3: Verifizieren (Magic Bytes + Größe)**

```bash
for f in assets/fonts/*.woff2; do
  printf '%s  %s  %s\n' "$f" "$(head -c4 "$f")" "$(stat -f%z "$f")"
done
```

Erwartet: 13 Zeilen, jede beginnt den Byte-Check mit `wOF2`, jede Größe > 4000. Falls eine Datei HTML/Fehlertext enthält (kein `wOF2`): Download wiederholen, URL prüfen.

- [ ] **Step 4: Commit**

```bash
git add assets/fonts/
git commit -m "feat(assets): Webfonts self-hosted — assets/fonts/ (13 woff2)

9 Dateien aus dem Syrien-vendor uebernommen (Spectral 400/600, IM Fell
English, Special Elite, Architects Daughter), Caveat (variable 400-700)
und Patrick Hand neu von Google Fonts gezogen (latin + latin-ext).
Vorbereitung fuer den CDN-Abriss (DSGVO), Spec E1 Entscheidung 2.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: `assets/css/fonts.css` + Governance-Eintrag

**Files:**
- Create: `assets/css/fonts.css`
- Modify: `assets/versions.json` (neuer Key `fonts.css`)
- Modify: `tools/website/bump-assets.py:52-57` (ALIASES)
- Modify: `Makefile:16` (Hilfetext)

**Interfaces:**
- Consumes: Dateinamen aus Task 1.
- Produces: `fonts.css` Version `1.0` — Task 3 verlinkt sie als `…/assets/css/fonts.css?v=1.0`.

- [ ] **Step 1: `assets/css/fonts.css` schreiben** (kompletter Inhalt; die 9 vendor-Blöcke sind 1:1 aus `vendor/fonts/fonts.css` übernommen, nur `src`-Pfad auf `../fonts/` geändert; die unicode-ranges für latin/latin-ext sind Googles Standard-Subsets und gelten auch für Caveat/Patrick Hand):

```css
/* assets/css/fonts.css — site-weite self-gehostete Webfonts (E1, DSGVO-Sanierung).
   Ersetzt den Google-Fonts-CDN-@import aus theme-gpg.css und das game-lokale
   vendor/fonts/ des Syrien-Games. Quelle der .woff2: Google Fonts (latin + latin-ext).
   Spec: docs/website/specs/2026-07-20-e1-design-fundament-design.md */
@font-face { font-family: 'Architects Daughter'; font-style: normal; font-weight: 400;
  font-display: swap; src: url('../fonts/architects-daughter-400-normal-latin-ext.woff2') format('woff2'); unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF; }
@font-face { font-family: 'Architects Daughter'; font-style: normal; font-weight: 400;
  font-display: swap; src: url('../fonts/architects-daughter-400-normal-latin.woff2') format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
@font-face { font-family: 'IM Fell English'; font-style: normal; font-weight: 400;
  font-display: swap; src: url('../fonts/im-fell-english-400-normal-latin.woff2') format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
@font-face { font-family: 'Special Elite'; font-style: normal; font-weight: 400;
  font-display: swap; src: url('../fonts/special-elite-400-normal-latin-ext.woff2') format('woff2'); unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF; }
@font-face { font-family: 'Special Elite'; font-style: normal; font-weight: 400;
  font-display: swap; src: url('../fonts/special-elite-400-normal-latin.woff2') format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
@font-face { font-family: 'Spectral'; font-style: normal; font-weight: 400;
  font-display: swap; src: url('../fonts/spectral-400-normal-latin-ext.woff2') format('woff2'); unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF; }
@font-face { font-family: 'Spectral'; font-style: normal; font-weight: 400;
  font-display: swap; src: url('../fonts/spectral-400-normal-latin.woff2') format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
@font-face { font-family: 'Spectral'; font-style: normal; font-weight: 600;
  font-display: swap; src: url('../fonts/spectral-600-normal-latin-ext.woff2') format('woff2'); unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF; }
@font-face { font-family: 'Spectral'; font-style: normal; font-weight: 600;
  font-display: swap; src: url('../fonts/spectral-600-normal-latin.woff2') format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
@font-face { font-family: 'Caveat'; font-style: normal; font-weight: 400 700;
  font-display: swap; src: url('../fonts/caveat-400-700-normal-latin-ext.woff2') format('woff2'); unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF; }
@font-face { font-family: 'Caveat'; font-style: normal; font-weight: 400 700;
  font-display: swap; src: url('../fonts/caveat-400-700-normal-latin.woff2') format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
@font-face { font-family: 'Patrick Hand'; font-style: normal; font-weight: 400;
  font-display: swap; src: url('../fonts/patrick-hand-400-normal-latin-ext.woff2') format('woff2'); unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF; }
@font-face { font-family: 'Patrick Hand'; font-style: normal; font-weight: 400;
  font-display: swap; src: url('../fonts/patrick-hand-400-normal-latin.woff2') format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
```

- [ ] **Step 2: `assets/versions.json` erweitern** — neuer Key im `assets`-Objekt (Komma an der Vorzeile beachten):

```json
{
  "_comment": "Single source of truth for shared-asset cache-bust versions. NEVER edit ?v= tokens in HTML by hand — run tools/website/bump-assets.py. tools/website/check.sh enforces that every ?v= token in the deployed HTML matches this file (drift = hard FAIL).",
  "assets": {
    "core.js": "4.6",
    "escape-engine.js": "3.21",
    "base.css": "4.6",
    "theme-gpg.css": "3.16",
    "fonts.css": "1.0"
  }
}
```

- [ ] **Step 3: Alias in `tools/website/bump-assets.py` (Z. 52–57) ergänzen:**

```python
ALIASES = {
    "engine": "escape-engine.js",
    "core": "core.js",
    "base": "base.css",
    "theme": "theme-gpg.css",
    "fonts": "fonts.css",
}
```

- [ ] **Step 4: Makefile-Hilfetext (Z. 16) anpassen:**

```
	@echo "  make bump A=engine Cache-Bust: Asset bumpen + alle HTML angleichen (A=engine|core|base|theme|fonts|all)"
```

- [ ] **Step 5: Verifizieren**

```bash
python3 -c "import json; print(json.load(open('assets/versions.json'))['assets']['fonts.css'])"   # Erwartet: 1.0
python3 tools/website/bump-assets.py --check    # Erwartet: Exit 0 (fonts.css hat noch keine Links — kein Drift)
make check                                       # Erwartet: BLOCKING gruen
```

- [ ] **Step 6: Commit**

```bash
git add assets/css/fonts.css assets/versions.json tools/website/bump-assets.py Makefile
git commit -m "feat(assets): zentrales fonts.css unter ?v=-Governance

13 @font-face (6 Familien) auf assets/fonts/, font-display: swap,
latin + latin-ext. versions.json-Eintrag fonts.css=1.0 + bump-Alias
'fonts'. Noch unverlinkt — Verlinkung + CDN-Abriss folgen separat.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Verlinkung + CDN-Abriss (der sichtbare Eingriff)

**Files:**
- Modify: 15 Alt-Game-HTMLs (`deutscher-nationalismus-kolonialismus/`: index, lehrkraft, mappe-1..4 · `gpg-erster-weltkrieg-ursachen/`: index, lehrkraft, mappe-1..4 · `verlauf-erster-weltkrieg-marne-ende/`: index, lehrkraft, mappe-1)
- Modify: 5 Syrien-HTMLs (`syrische-revolution-2011/`: index, mappe-1..4 — es gibt KEINE lehrkraft.html)
- Modify: `assets/css/themes/theme-gpg.css` (Zeile 1 löschen)
- Delete: `escape-games/syrische-revolution-2011/vendor/fonts/` (komplett)

**Interfaces:**
- Consumes: `fonts.css?v=1.0` aus Task 2.
- Produces: theme-gpg.css-Version 3.17 (durch `make bump A=theme`).

- [ ] **Step 1: GUARD — Ausgangszustand prüfen**

```bash
head -1 assets/css/themes/theme-gpg.css
# Erwartet exakt: @import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Caveat:wght@400;600;700&family=Patrick+Hand&display=swap');
grep -c 'vendor/fonts/fonts.css' escape-games/syrische-revolution-2011/*.html   # Erwartet: 5 Treffer gesamt (je 1)
```

- [ ] **Step 2: Alt-Games — `fonts.css`-Link vor dem base.css-Link einfügen** (die Link-Zeilen stehen überall auf Z. 7/8 mit 2 Spaces Einrückung):

```bash
for f in escape-games/deutscher-nationalismus-kolonialismus/*.html \
         escape-games/gpg-erster-weltkrieg-ursachen/*.html \
         escape-games/verlauf-erster-weltkrieg-marne-ende/*.html; do
  sed -i '' 's|^  <link rel="stylesheet" href="\.\./\.\./assets/css/base\.css?v=|  <link rel="stylesheet" href="../../assets/css/fonts.css?v=1.0">\n  <link rel="stylesheet" href="../../assets/css/base.css?v=|' "$f"
done
grep -rl 'assets/css/fonts.css?v=1.0' escape-games/ | wc -l   # Erwartet: 15
```

- [ ] **Step 3: Syrien — vendor-Font-Link auf das geteilte File umstellen:**

```bash
for f in escape-games/syrische-revolution-2011/index.html escape-games/syrische-revolution-2011/mappe-*.html; do
  sed -i '' 's|<link rel="stylesheet" href="vendor/fonts/fonts.css">|<link rel="stylesheet" href="../../assets/css/fonts.css?v=1.0">|' "$f"
done
grep -rl 'assets/css/fonts.css?v=1.0' escape-games/syrische-revolution-2011/ | wc -l   # Erwartet: 5
```

- [ ] **Step 4: CDN-`@import` aus theme-gpg.css löschen + Theme bumpen:**

```bash
sed -i '' '1d' assets/css/themes/theme-gpg.css
head -1 assets/css/themes/theme-gpg.css   # Erwartet: KEIN @import mehr (Kommentar-/Leerzeile)
make bump A=theme                          # 3.16 → 3.17, synct alle HTML
```

- [ ] **Step 5: Syrien-vendor-Fonts löschen:**

```bash
git rm -r escape-games/syrische-revolution-2011/vendor/fonts/
```

- [ ] **Step 6: Verifizieren (Gates + DSGVO-Beweis)**

```bash
grep -rn 'fonts\.googleapis\|fonts\.gstatic' index.html assets/ escape-games/ sections/ | grep -v '/_'
# Erwartet: KEINE Ausgabe (docs/-Prototypen zaehlen nicht, sind nicht deploybar)
make check    # Erwartet: BLOCKING gruen (B1 prueft jetzt auch Existenz von assets/css/fonts.css)
make smoke    # Erwartet: gruen — same-origin-404s (z. B. fehlende Fonts) waeren FAIL
```

- [ ] **Step 7: CHECKPOINT — Sichtabnahme durch Paul.** Lokalen Server starten und Paul prüfen lassen: `python3 -m http.server 8080` → (a) `http://localhost:8080/escape-games/syrische-revolution-2011/mappe-1.html` — Typografie unverändert (Spectral/IM Fell/Special Elite/Architects Daughter); (b) `http://localhost:8080/escape-games/deutscher-nationalismus-kolonialismus/mappe-1.html` — Hefteintrag-/Fragebogen-Handschrift (Caveat/Patrick Hand/Architects Daughter) rendert; (c) Browser-Netzwerk-Tab: keine Requests an `fonts.googleapis.com`/`fonts.gstatic.com`. Erst nach Pauls OK weiter.

- [ ] **Step 8: Commit**

```bash
git add escape-games/deutscher-nationalismus-kolonialismus/*.html \
        escape-games/gpg-erster-weltkrieg-ursachen/*.html \
        escape-games/verlauf-erster-weltkrieg-marne-ende/*.html \
        escape-games/syrische-revolution-2011/index.html \
        escape-games/syrische-revolution-2011/mappe-1.html \
        escape-games/syrische-revolution-2011/mappe-2.html \
        escape-games/syrische-revolution-2011/mappe-3.html \
        escape-games/syrische-revolution-2011/mappe-4.html \
        assets/css/themes/theme-gpg.css assets/versions.json
git commit -m "feat(assets): Google-Fonts-CDN-Abriss — alle Games auf self-hosted fonts.css

Alle 20 Game-Seiten laden assets/css/fonts.css?v=1.0 (Alt-Games neu,
Syrien statt vendor/fonts/). @import in theme-gpg.css entfernt (Bump
3.17): keine Schueler-IPs mehr an Google (DSGVO, LG Muenchen 2022).
Syrien-vendor/fonts/ geloescht — Doppel-Ladeweg beendet. make smoke
gruen; Sichtabnahme Paul erfolgt.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

(Hinweis: `git rm` aus Step 5 ist bereits gestagt.)

---

### Task 4: `base.css` entmischen + Root-`?v=`-Lücke schließen

**Files:**
- Modify: `assets/css/base.css` (Z. 326–776 raus → Datei endet mit Abschnitt 8)
- Create: `assets/css/lernraum.css` (ungeladen)
- Modify: `index.html` (Root; Z. 7 bekommt `?v=`)

**Interfaces:**
- Produces: base.css-Version 4.7 (durch `make bump A=base`); `lernraum.css` bewusst OHNE versions.json-Eintrag (wird von keiner Seite geladen).

- [ ] **Step 1: GUARD — Schnittkante prüfen**

```bash
wc -l < assets/css/base.css        # Erwartet: 776
sed -n '326p;327p' assets/css/base.css
# Erwartet Z. 326: /* ==========================================================================
# Erwartet Z. 327:    wg.lernraum — Redesign-Spec v1.1 §2 (RESTYLING.md + 06-spec-erweiterung.md)
grep -n 'base.css' index.html      # Erwartet Z. 7: <link rel="stylesheet" href="assets/css/base.css">  (ohne ?v=)
```

- [ ] **Step 2: Lernraum-Block nach `lernraum.css` ausschneiden**

```bash
{ cat <<'EOF'
/* assets/css/lernraum.css — wg.lernraum-Styles, in E1 (2026-07-20) aus base.css
   ausgelagert (dort Z. 326-776). Wird derzeit von KEINER Live-Seite geladen —
   liegt fuer die Rueckkehr der Lernraum-Konsument-Seiten bereit (s. ARCHITEKTUR.md).
   Aktivierung im Markup unveraendert: <body data-lernraum data-fach="...">. */
EOF
  sed -n '326,776p' assets/css/base.css
} > assets/css/lernraum.css
sed -i '' '326,776d' assets/css/base.css
```

- [ ] **Step 3: Schnitt verifizieren**

```bash
wc -l < assets/css/base.css                       # Erwartet: 325
grep -c 'data-lernraum' assets/css/base.css       # Erwartet: 0
grep -c 'body\[data-lernraum\]' assets/css/lernraum.css   # Erwartet: >= 2
tail -3 assets/css/base.css                        # Erwartet: Ende des Abschnitt-8-Blocks (prefers-reduced-motion), schliessende Klammern
```

- [ ] **Step 4: Root-`index.html` unter Governance bringen + base bumpen**

```bash
sed -i '' 's|href="assets/css/base.css"|href="assets/css/base.css?v=4.6"|' index.html
make bump A=base    # 4.6 → 4.7, synct ALLE HTML inkl. Root
grep -n 'base.css' index.html   # Erwartet: assets/css/base.css?v=4.7
```

- [ ] **Step 5: Gates**

```bash
make check    # BLOCKING gruen
make smoke    # gruen (base.css-Kuerzung darf nichts brechen — kein Live-Selektor zeigt auf den Block)
```

- [ ] **Step 6: Commit**

```bash
git add assets/css/base.css assets/css/lernraum.css index.html assets/versions.json \
        escape-games/deutscher-nationalismus-kolonialismus/*.html \
        escape-games/gpg-erster-weltkrieg-ursachen/*.html \
        escape-games/verlauf-erster-weltkrieg-marne-ende/*.html \
        escape-games/syrische-revolution-2011/index.html \
        escape-games/syrische-revolution-2011/mappe-1.html \
        escape-games/syrische-revolution-2011/mappe-2.html \
        escape-games/syrische-revolution-2011/mappe-3.html \
        escape-games/syrische-revolution-2011/mappe-4.html
git commit -m "chore(assets): base.css entmischt — wg.lernraum-Block nach lernraum.css

Z. 326-776 (toter, body[data-lernraum]-gescopter Block, von keiner
Live-Seite genutzt) 1:1 nach assets/css/lernraum.css (ungeladen,
bereitliegend). base.css = reines Fundament (Reset/Fallbacks/Skalen/
Utilities, 325 Z.). Root-index.html laedt base.css jetzt mit ?v=
(Governance-Luecke zu), Bump base 4.7.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

(Die Game-HTMLs sind dabei, weil `make bump A=base` ihre `?v=`-Tokens auf 4.7 gesynct hat.)

---

### Task 5: `assets/css/tokens.css` — das Site-Vokabular

**Files:**
- Create: `assets/css/tokens.css`
- Modify: `assets/versions.json` (neuer Key `tokens.css`)
- Modify: `tools/website/bump-assets.py` (ALIASES + `tokens`)
- Modify: `Makefile:16` (Hilfetext)

**Interfaces:**
- Produces: `tokens.css` 1.0 — erste Konsumenten sind E3 (Root/Profil) und E5 (Games). In E1 lädt es KEINE Seite.

- [ ] **Step 1: `assets/css/tokens.css` schreiben** (kompletter Inhalt; Werte destilliert aus `vendor/redesign.css` `:root`/`[data-bg="dark"]` und `vendor/redesign-uebersicht.css` `:root`):

```css
/* ==========================================================================
   tokens.css — Site-weites Design-Vokabular (E1, 2026-07-20)

   Quelle: destilliert aus dem Syrien-Redesign-Overlay (vendor/redesign*.css).
   Kaskaden-Konvention (ab E3): fonts.css → base.css → tokens.css → theme-*.css
   — dieses File ueberschreibt die neutralen base.css-Fallbacks mit der
   Site-Identitaet; Themes (Saeulen) verfeinern darueber.

   Modus: DARK ist Site-Default. <html data-bg="white"> schaltet die helle
   Pergament-Variante (dokumentierter Schalter pro Seite).

   In E1 laedt noch KEINE Live-Seite dieses File — erste Konsumenten:
   E3 (Root/Profil), E5 (Akten-Look-Absorption der Games).
   Spec: docs/website/specs/2026-07-20-e1-design-fundament-design.md
   ========================================================================== */

:root {
  /* Farb-Identitaet — Akten-Palette, Dark-Default */
  --color-primary: #1B2A4A;          /* Navy */
  --color-secondary: #C9A84C;        /* Gold */
  --color-secondary-light: #E0C57E;
  --color-background: #1F1812;
  --color-surface: #2A211A;          /* "Papier" im Dark-Modus */
  --color-surface-raised: #2A211A;   /* Cream-Pendant; im Dark == surface */
  --color-desk: #3A2616;             /* Schreibtisch-/Pinnwand-Grund (konstant) */
  --color-text: #E8E0D0;
  --color-muted: #B8AC95;
  --color-border: #4a3e2c;

  /* Status */
  --color-success: #2D6A4F;
  --color-error: #9B2226;
  --color-tipp: #4A6FA5;
  --color-status-done: var(--color-success);
  --color-status-open: #D4A017;
  --color-status-locked: var(--color-error);

  /* Font-Rollen (Dateien: assets/css/fonts.css → assets/fonts/) */
  --font-body: 'Spectral', Georgia, serif;
  --font-display: 'IM Fell English', Georgia, serif;
  --font-hand: 'Architects Daughter', cursive;
  --font-mono-display: 'Special Elite', 'Courier New', monospace;
  --font-heading: var(--font-display);   /* base.css-Regeln nutzen --font-heading */
}

/* Helle Pergament-Variante */
[data-bg="white"] {
  --color-background: #F5F0E8;
  --color-surface: #FAF6EC;
  --color-surface-raised: #FDF6E3;
  --color-text: #2C2416;
  --color-muted: #6B6358;
  --color-border: #C5BFB3;
}
```

- [ ] **Step 2: Governance** — `assets/versions.json`: `"tokens.css": "1.0"` als weiterer Key im `assets`-Objekt (analog Task 2 Step 2; `base.css` steht dort inzwischen auf `4.7`, `theme-gpg.css` auf `3.17`). `ALIASES` in `bump-assets.py`: Zeile `"tokens": "tokens.css",` ergänzen. Makefile Z. 16: `(A=engine|core|base|theme|fonts|tokens|all)`.

- [ ] **Step 3: Verifizieren**

```bash
python3 -c "import json; a=json.load(open('assets/versions.json'))['assets']; print(a['tokens.css'], a['fonts.css'])"   # Erwartet: 1.0 1.0
python3 tools/website/bump-assets.py --check   # Exit 0 (tokens.css unverlinkt — kein Drift)
make check                                      # BLOCKING gruen
```

- [ ] **Step 4: Commit**

```bash
git add assets/css/tokens.css assets/versions.json tools/website/bump-assets.py Makefile
git commit -m "feat(assets): tokens.css — Site-weites Design-Vokabular (E1)

Akten-Palette (Navy/Gold/Pergament + Dark-Toene) und Font-Rollen als
semantische Tokens, Dark als :root-Default, [data-bg=white] als helle
Variante. Destilliert aus dem Syrien-Redesign-Overlay; vereinigt die
Parallel-Namensraeume --rd-*/--op-* konzeptionell auf --color-*/--font-*.
In E1 ungeladen — erste Konsumenten E3 (Root/Profil) und E5 (Games).

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: Doku nachziehen (SITE_MAP, PROZESS, ARCHITEKTUR)

**Files:**
- Modify: `docs/website/SITE_MAP.md`
- Modify: `docs/website/PROZESS.md`
- Modify: `docs/website/ARCHITEKTUR.md`

(Falls die Ausführung an einem späteren Datum als 2026-07-20 stattfindet: Datumsangaben unten entsprechend anpassen.)

- [ ] **Step 1: `docs/website/SITE_MAP.md`** — drei Edits:

(a) Kopfzeile „Stand: 2026-07-18." → „Stand: 2026-07-20."

(b) Syrien-Eintrag (Z. 25–27) ersetzen durch:

```markdown
- `syrische-revolution-2011` — Syrische Revolution 2011 (GPG R7). Seit E2 (18.07.) auf der
  geteilten Runtime unter `?v=`-Governance; game-lokal bleibt nur noch das Redesign-Overlay
  (`vendor/redesign*.css`, `rd-inject.js`, `media-placeholder.css`) als E5-Material —
  `vendor/fonts/` ist seit E1 (20.07.) site-weit (`assets/fonts/`).
```

(c) Tabelle „Geteilte Assets“ — nach der `theme-gpg.css`-Zeile vier Zeilen einfügen:

```markdown
| `assets/css/fonts.css` + `assets/fonts/` | self-gehostete Webfonts (6 Familien, DSGVO) | `make bump A=fonts` |
| `assets/css/tokens.css` | Site-Design-Vokabular (E1; ungeladen bis E3/E5) | `make bump A=tokens` |
| `assets/css/lernraum.css` | ausgelagerter wg.lernraum-Block (ungeladen, bereitliegend) | — |
```

- [ ] **Step 2: `docs/website/PROZESS.md`** — Stand-Tabelle: Überschrift „## Stand (2026-07-18)" → „## Stand (2026-07-20)"; E1-Zeile ersetzen und E5-Zeile nach E4 einfügen:

```markdown
| E1 Design-Fundament | ✅ umgesetzt 2026-07-20 auf `feat/e1-design-fundament` (schlanker Zuschnitt: tokens.css · Fonts self-hosted/DSGVO · base.css entmischt · ?v=-Lücken; Spec/Plan unter `specs/`+`plans/`). Merge/Deploy auf Ansage. |
```

```markdown
| E5 Akten-Look-Absorption (Theme+Engine) | offen — fällig nach E3-Game-Triage, spätestens VOR dem nächsten neuen Game; Vorentscheidungen in E1-Spec §6 |
```

Danach die Zeile „| **E1 Design-Fundament** | **⬅ NÄCHSTER SCHRITT:** …“ existiert nicht mehr; stattdessen den NÄCHSTER-SCHRITT-Marker auf die E3-Zeile setzen:

```markdown
| **E3 IA-Umsetzung (der eine URL-Bruch)** | **⬅ NÄCHSTER SCHRITT** (davor: Repo-Entmischungs-Grundsatzfrage, s. Ansage-Punkte) |
```

- [ ] **Step 3: `docs/website/ARCHITEKTUR.md`** — zwei Edits:

(a) Im Abschnitt „## Umbau-Pfad“ nach der E4-Zeile ergänzen:

```markdown
- **E5 Akten-Look-Absorption:** Redesign-Overlay in `theme-gpg.css` in-place absorbieren +
  rd-inject-Logik in die Engine; nach der E3-Triage, spätestens vor dem nächsten neuen Game.
```

(b) Ans Ende des Entscheidungs-Logs anfügen:

```markdown
- **2026-07-20 — E1 schlank zugeschnitten; E5 terminiert.** E1 liefert nur das Fundament
  (`tokens.css`, self-gehostete Fonts/DSGVO-Sanierung, `base.css`-Entmischung,
  `?v=`-Lücken); der Akten-Look-Rollout (Theme-Absorption in-place, rd-inject → Engine,
  datengetriebene Akten-Labels, Dark-Default) wird E5 — fällig nach der E3-Game-Triage,
  spätestens vor dem nächsten neuen Game. Warum: Design erreicht zukünftige Games nur über
  die geteilte Schicht, aber die Alt-Games sind Triage-Kandidaten — Absorption vor der
  Triage wäre teils für Sterbekandidaten. Verworfen: Sofort-Rollout (voller Umbau jetzt)
  und Token-Extraktion ohne Font-Sanierung (DSGVO-Risiko bliebe live).
```

- [ ] **Step 4: Verifizieren + Commit**

```bash
make check   # BLOCKING gruen (Doku wird nicht geprueft, aber Hygiene)
git add docs/website/SITE_MAP.md docs/website/PROZESS.md docs/website/ARCHITEKTUR.md
git commit -m "docs(website-layer): PROZESS/SITE_MAP/ARCHITEKTUR — E1 umgesetzt, E5 terminiert

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 7: Endverifikation + STOP (kein Push!)

- [ ] **Step 1: Gesamt-Gates**

```bash
make check    # BLOCKING gruen
make smoke    # gruen
grep -rn 'fonts\.googleapis\|fonts\.gstatic' index.html assets/ escape-games/ sections/ | grep -v '/_'   # leer
git status --short   # leer (working tree clean)
git log --oneline main..feat/e1-design-fundament   # Erwartet: 8 Commits (Spec + Plan + 6 Task-Commits)
```

- [ ] **Step 2: STOP — Übergabe an Paul.** NICHT pushen, NICHT mergen. Paul melden: Branch `feat/e1-design-fundament` ist fertig und verifiziert; ausstehend sind (a) seine finale Sichtabnahme (falls beim Task-3-CHECKPOINT nicht schon vollständig erfolgt), (b) seine Ansage zu Merge → `main` → Deploy (~1 Min. live). Für den Abschluss das Skill `superpowers:finishing-a-development-branch` nutzen.
