# E3 IA-Umsetzung — Design (der eine URL-Bruch)

**Ziel:** Die Drei-Säulen-IA aus `ARCHITEKTUR.md` wird real: Root wird neutraler Verteiler
im neuen Site-Design, `/profil/` entsteht, alles Unterrichtliche zieht unter `/unterricht/`,
die Alt-Games werden archiviert, Impressum/Datenschutz und Favicon kommen dazu. Grundlage
ist die **Referenz-Integration** des claude.ai/design-Scopings „website allgemein“
(Nebel-&-Papier-System) — von Paul am 2026-07-21 freigegeben, inklusive Bildauswahl.
**Ausdrücklicher Vorbehalt:** Die Zettelkasten-/Blog-Darstellung des Scopings ist NICHT
mit-freigegeben — sie hängt am zk-atlas-Backend und offenen UX-Fragen und wird in E4 neu
bewertet. `blog/*` bleibt geparkt.

## Grundlage: Design-Scoping

- claude.ai/design-Projekt „website allgemein“ (`b320fb62-d003-4837-84e6-91246d90c801`),
  lokal gespiegelt: `_design-scoping/claude-design/` (32 Textdateien, Stand 2026-07-21).
  Lauffähige High-Fidelity-Referenz, kein Mockup; das Handoff-README adressiert explizit
  die Verankerung im Repo.
- **Fotos sind NICHT über die Design-API beschaffbar** (256-KiB-Cap, harter Schnitt bei
  192 KiB Binär, teils ohne truncated-Flag — empirisch 2026-07-21). Beschaffung: Paul.
- Design-Identität (entschieden 2026-07-21): Site-Ebene = „Nebel & Papier“
  (paper `#e7e4dc`/`#0f110d`, ink `#16170f`/`#e9e6dc`, Akzent Nebelblau `#5e6e77`,
  terra/petrol/gold; Newsreader/Archivo/Space Mono; eckig, schattenlos, Haarlinien,
  Dark-Default). Der Akten-Look (Navy/Gold, Spectral/IM Fell) bleibt **Game-Theme** → E5.

## Befund (Fakten-Sweep 2026-07-21, 6 parallele Repo-Leser)

- **Engine-Storage ist umzugsfest:** Progress-Key = `'escape-' + slug(data.meta.titel)`
  (`escape-engine.js:188-189`), Sprach-Key global `escape_sprache` (`:4537`) — kein
  URL-/Pfad-Bestandteil in irgendeinem Key. Schülerfortschritt übersteht den URL-Bruch.
- **Syrien-Game:** 5 Game-HTMLs mit je genau 5 externen Referenzen im Muster
  `../../assets/…` (base.css, fonts.css, `themes/theme-gpg.css`, core.js, escape-engine.js)
  plus je 3 game-relativen `vendor/`-Loads; die 4 `tafelbild/*.html` sind vollständig selbständig
  (Fonts inline als data-URI, null externe Referenzen); `data.json`-Medienpfade sind
  game-relativ (`media/…`) oder absolute Wikimedia-URLs — **nur die 5 HTMLs brauchen
  Pfad-Anpassung** (`../../` → `../../../`). Einziger interner Link aufs Game: Root-`index.html`.
- **Gates sind selbstpflegend über die Root-`index.html`:** `check.sh:46-50`
  (`grep -oE 'escape-games/[a-z0-9-]+/'` + `sed`) und `smoke.py:45-47`
  (`re.findall(r"escape-games/([a-z0-9-]+)/", idx)`) leiten die LIVE_GAMES aus
  `index.html` ab; `smoke.py` baut daraus URLs `/escape-games/<g>/…` und rendert zusätzlich
  `sections/**/*.html`; `bump-assets.py` scannt `escape-games/**`, `index.html`,
  `sections/**` (`_`-Segmente überall ausgeschlossen). **Alle drei müssen mit der IA
  mitziehen, sonst prüfen sie ins Leere.** `make site` ist Allowlist:
  `index.html`, `CNAME`, `favicon.ico` (optional), `escape-games/`, `assets/`, `sections/`.
- **wg.css (238 Z.):** Token-Block Z. 9–31 (`.mode-light` / `.mode-dark` / `:root`),
  Komponenten ab Z. 33. Fonts kommen per Google-`<link>` in den HTML-Köpfen (Z. 9):
  Newsreader (variable, opsz 6..72, 400/500/600 + italic 400/500), Archivo (400–700),
  Space Mono (400, 400 italic, 700). Modus: Klassen auf `<html>`, Key `wg-mode`,
  Inline-Head-Script (kein Flash) + Toggle-Buttons `#m-light`/`#m-dark`.
- **Startseite.html:** Hero `img/photos/gleise-ueberwachsen.jpg`; 3 Kacheln (`.gw-grid`):
  „Über“ → `ueber.html` (Thumb `museum-blick.jpg`), „Blog“ → `blog/lesen.html`
  (Thumb `zeitschriften.jpg`), „Bildung“ → Game (Thumb `turm-beton.jpg`);
  Blog-Teaser-Sektion Z. 73–82. **ueber.html:** Porträt-Hero (`paul-portrait.jpg`,
  Credit „Foto: Uwe Niklas“ als `figcaption`), Kindheits-/Prosa-Sektion (`hero--kind`),
  Footer `id="kontakt"` mit `mailto:[deine@adresse.de]`-Platzhalter und
  Impressum-/Datenschutz-Links.
- **Ist-Root:** lädt `base.css?v=4.7` + `core.js` und enthält einen Inline-Staging-Modus
  (`?staging=1`, Z. 9–43); Game-/WiB-Listen als `<ul>`. **WiB-Seiten** sind selbständig
  (eigene Data-URI-Favicons, Chart.js via jsdelivr-CDN); `haushaltsbuch.html:698`
  verlinkt `geldwert.html` relativ (einseitig), und die je zwei absoluten Links pro Seite
  (`https://weitergehts.online`, Branding/Footer) zeigen pfadlos auf die Root — sie
  bleiben nach dem Umzug korrekt. Kein Site-Favicon im Repo (einziger favicon-Fund liegt
  in einem `_archiv-…`-Fremdkontext), kein `escape-games/index.html`;
  `CNAME` = `weitergehts.online`.
- **Archiv-Konvention:** `_`-präfixierte Segmente werden von `make site` (rsync
  `--exclude='_*/'`), `check_assets.py`, `bump-assets.py` und `smoke.py` durchgängig
  ignoriert. Bestehende Beispiele: `escape-games/_template/`,
  `escape-games/_archiv-gpg-erster-weltkrieg-ursachen-run4-v050/`. Alt-Games: 208K/736K/164K.

## Entscheidungen

1. **CSS-Schichtung der Site-Ebene:** Der wg-Token-Block (Z. 9–31) **ersetzt den Inhalt von
   `assets/css/tokens.css`**. Die Akten-Werte verlassen `tokens.css` ersatzlos — ihre
   Quellen bleiben das vendor-Overlay selbst und E1-Spec §3. **Präzisierung von
   E1-Spec §6:** das E5-Mapping `--rd-*`/`--op-*` zielt auf einen in E5 innerhalb von
   `theme-gpg.css` anzulegenden Akten-Token-Block, nicht mehr auf `tokens.css`
   (der existiert dort heute noch nicht; er entsteht als Teil der E5-Absorption).
   Die wg-Komponenten (ab Z. 33) werden neues `assets/css/wg.css`. **Site-Seiten laden
   `fonts.css → tokens.css → wg.css`** und NICHT `base.css`. Die E1-Kaskaden-Konvention
   wird damit zu zwei getrennten Ketten: **Site** `fonts → tokens → wg` · **Games
   (unverändert)** `fonts → base → themes/theme-gpg` — Games haben `tokens.css` nie
   geladen und tun es auch künftig nicht; `base.css` ist fortan
   Game-/Legacy-Schicht (Games, WiB, Lernraum-Kandidaten), keine Site-Schicht.
   Dark-Default über `.mode-dark` auf `<html>`, `localStorage('wg-mode')`,
   Inline-Head-Script gegen Flash. *(Verworfen: Akten-Identität site-weit — Design-Entscheid
   2026-07-21; wg.css ungesplittet als Monolith — das Token-Vokabular soll für E4-Seiten
   und Doku an genau einer Stelle liegen, tokens.css existiert dafür bereits samt
   `?v=`-Governance.)*
2. **Fonts self-hosted (E1-Verfahren):** Newsreader (variable inkl. opsz, normal + italic),
   Archivo (400–700), Space Mono (400/400i/700) als .woff2 (latin + latin-ext) nach
   `assets/fonts/`, `@font-face`-Ergänzung in `assets/css/fonts.css`; die
   Google-`<link>`-Zeilen fliegen aus allen übernommenen Köpfen. Fallback, falls die
   variablen Dateien nicht sauber beschaffbar sind: statische Instanzen der im CDN-Import
   genannten Gewichte. *(Verworfen: CDN behalten — DSGVO, identisch zu E1.)*
3. **Root-Verteiler** aus `Startseite.html` → `index.html`: Hero bleibt
   (`gleise-ueberwachsen`), **2 Kacheln** — „Profil“ (aus „Über“, Thumb `museum-blick`,
   → `profil/`) und „Unterricht“ (aus „Bildung“, Thumb `turm-beton`, → `unterricht/`).
   Blog-Kachel und Blog-Teaser-Sektion entfallen; `.gw-grid` bleibt 3-fähig — **der
   dritte Slot ist für die Zettelkasten-Kachel (E4) reserviert** (ob und wie ein
   Blog-/Notizen-Teaser zurückkommt, entscheidet E4 mit). `base.css`-Link, `core.js` und
   Staging-Script verlassen den Root (Staging zieht in den Unterricht-Hub). Zusätzlich
   **schlanke `404.html`** im wg-System mit Links auf die Säulen-Einstiege (GitHub Pages
   liefert sie automatisch aus) — der bewusste URL-Bruch bekommt eine weiche Landung.
4. **`/profil/`** aus `ueber.html`: Porträt-Hero + Footer bleiben; die
   `hero--kind`-Sektion (Kindheitsfoto + Prosa „Haltung/Unterricht/Schreiben“) entfällt
   ersatzlos (Pauls Minimal-Entscheid: Foto + Kontakt, Website spricht für sich).
   `mailto:`-Platzhalter wird durch Pauls echte Kontakt-Adresse ersetzt (liefert Paul);
   Credit „Foto: Uwe Niklas“ bleibt erhalten. *(Verworfen: Prosa behalten/kürzen.)*
5. **`/unterricht/` + Umzug:** Neuer Säulen-Hub `unterricht/index.html` im wg-System;
   er übernimmt Game-Liste, WiB-Liste und die Staging-Mechanik des alten Root.
   `git mv escape-games unterricht/escape-games` (kompletter Baum inkl. `_template/` und
   bestehender `_archiv-*`) und `git mv sections/wib unterricht/wib` (`sections/` entfällt
   danach). Pfad-Anpassung nur in den 5 Syrien-Game-HTMLs (`../../` → `../../../`);
   Tafelbilder, `data.json`, `vendor/`-Loads: keine Änderung (Sweep-Beleg). Die
   absoluten Root-Links der WiB-Seiten (`https://weitergehts.online`, Branding/Footer)
   bleiben unverändert — sie zeigen auf den Verteiler, der nicht wandert.
   **Game-Triage:** die drei Alt-Games `deutscher-nationalismus-kolonialismus`,
   `gpg-erster-weltkrieg-ursachen` und `verlauf-erster-weltkrieg-marne-ende` werden zu
   `unterricht/escape-games/_archiv-<id>/` umbenannt (bestehende `_`-Konvention:
   getrackt = reaktivierbar, aber von Deploy/Checks/Bump/Smoke ignoriert; nicht zu
   verwechseln mit dem bestehenden `_archiv-gpg-erster-weltkrieg-ursachen-run4-v050/`,
   das unverändert mitzieht). **Die Hub-Game-Liste führt nur noch Syrien** — die drei
   Alt-Game-Einträge des alten Root entfallen ersatzlos, es bleiben keine Links auf
   `_archiv-…`-Pfade zurück.
   *(Verworfen: Löschen — Wiederverwendung möglich; separates Archiv-Repo — Overhead.)*
6. **Recht:** Neue Seiten `impressum/index.html` + `datenschutz/index.html` im wg-System.
   Footer-Links auf allen Site-Seiten (Referenz-Footer hat sie schon); zusätzlich schlanke,
   stil-neutrale Footer-Links auf dem Unterricht-Hub, der Syrien-`index.html` und beiden
   WiB-Seiten (≤2-Klick-Erreichbarkeit, § 5 DDG); Mappen-HTMLs bleiben unangetastet.
   Datenschutzerklärung deckt ab: GitHub-Pages-Hosting (IP-Logs durch GitHub),
   localStorage-Inventar (`wg-mode`, `escape-…`-Progress, `escape_sprache` — rein
   funktional, kein Tracking), Laufzeit-Ladevorgänge Dritter (Wikimedia-Bilder in Games,
   jsdelivr-Chart.js in WiB), self-gehostete Fonts. Impressum: Pauls § 5-DDG-Angaben
   (Name, ladungsfähige Anschrift, Kontakt) — **liefert Paul**; die Angaben sind wie die
   Fotos Teil der Content-Übergabe und **Merge-Voraussetzung**: ein Platzhalter-Impressum
   erreicht `main`/Deploy nicht. Der Schutz ist prozedural (Push nur auf Ansage), nicht
   mechanisch. *(Verworfen: nur Impressum ohne DSE.)*
7. **Favicon:** `favicon.svg` + `favicon.ico` im Root — dunkles Quadrat, Wortmarke „w.“
   (Archivo), Nebelblau-Akzent; `<link rel="icon">` nur in den Site-Köpfen, Games/WiB
   erben den Browser-Fallback auf `/favicon.ico` (WiB behält seine Data-URI-Icons).
8. **Site-Bilder:** `profil/img/paul-portrait.jpg` (säulen-lokal) und
   `assets/img/site/{gleise-ueberwachsen,museum-blick,turm-beton}.jpg` (Root-Verteiler);
   Bildpfade in den übernommenen HTMLs entsprechend angepasst. **Beschaffung durch Paul**
   (Export aus der Design-UI oder Originale) — Voraussetzung für die betroffenen Tasks;
   `zeitschriften.jpg`/`kindheit-frankfurterschule.jpg` werden erst bei Reaktivierung
   (E4 bzw. Profil-Ausbau) benötigt.
9. **Gates/Werkzeuge ziehen mit:** `make site`-Allowlist neu: `index.html`, `404.html`,
   `CNAME`, `favicon.svg`+`favicon.ico`, `unterricht/`, `profil/`, `impressum/`,
   `datenschutz/`, `assets/` (Excludes unverändert `_*/`); `escape-games`/`sections`
   entfallen als Quellen. `check.sh`-Discovery greift auf
   `unterricht/escape-games/[a-z0-9-]+/` in `unterricht/index.html`; `smoke.py` analog
   (URLs `/unterricht/escape-games/<g>/…`, `rglob` über `unterricht/**` statt
   `sections/**`, plus statisch: `/index.html`, `/404.html`, `/profil/`, `/impressum/`,
   `/datenschutz/`); `bump-assets.py`-Globs auf `unterricht/**`, `profil/**`,
   `impressum/**`, `datenschutz/**` + Root, `ALIASES` + `wg: wg.css`.
   `.gitignore` erhält einen Eintrag `_design-scoping/` (der ungetrackte Design-Spiegel
   soll nicht versehentlich committet werden; Gates/Deploy ignorieren `_`-Pfade ohnehin).
   `versions.json`: neuer Eintrag `wg.css`; `tokens.css`-Bump nach Umbau.
10. **Doku im Umsetzungs-Zug:** `SITE_MAP.md` (neue Karte), `RUNBUCH.md` (Loops mit neuen
    Pfaden, v. a. „neues Game einspielen“ + Staging), `PROZESS.md`-Stand,
    `ARCHITEKTUR.md`-Log (Site-Design-Identität + E3-Zuschnitt). **Neuer Ansage-Punkt
    (Generator-Welt):** der sandbox-export-Skill im externen Generator-Repo zielt auf
    `escape-games/<id>/` — sein TARGET muss auf `unterricht/escape-games/` nachgezogen
    werden, bevor das nächste Game exportiert wird; passiert im Zuge des ohnehin
    anstehenden Generator-Umzugs, nicht aus einer Website-Session.
11. **Quittierte Abweichung vom A0-Umbau-Pfad — Unterricht-Assets bleiben vorerst unter
    `/assets/`:** `ARCHITEKTUR.md` sieht für E3 vor, Säulen-Spezifisches
    (`escape-engine.js`, `theme-gpg.css`) in den Säulen-Baum zu verschieben. E3 tut das
    bewusst NICHT: Der Asset-Umzug fällt mit E5 zusammen, wo Theme und Engine ohnehin
    in-place umgebaut werden — ein Asset-Touch samt `?v=`-/Bump-Governance-Umbau statt
    zwei, und der E3-Bruch bleibt auf Seiten-URLs begrenzt (Schüler-Bookmarks), statt
    zusätzlich alle Asset-Referenzen zu bewegen. Die Separierbarkeits-Regel bleibt
    gültig; nur ihr Umsetzungszeitpunkt wandert zu E5. Der `ARCHITEKTUR.md`-Log-Eintrag
    (Entscheidung 10) quittiert die Abweichung ausdrücklich.
    *(Verworfen: Asset-Umzug jetzt — verdoppelt den Blast-Radius des URL-Bruchs ohne
    Nutzen für Schüler oder Design.)*

## Abnahme

`make check` BLOCKING-grün (mit funktionierender neuer Discovery — LIVE_GAMES = genau
`syrische-revolution-2011`, nicht leer-grün) · die drei archivierten Game-IDs tauchen auf
keiner Live-Seite mehr auf (grep außerhalb der `_archiv-…`-Ordner ohne Treffer) ·
`make smoke` grün inkl. Root, 404, Profil,
Unterricht-Hub, Impressum, Datenschutz, aller Syrien-Seiten unter `/unterricht/…` ·
lokaler Serve: Syrien-Game voll funktionsfähig (Mappen, Medien, Tafelbilder), `grep -r
'\.\./\.\./assets' unterricht/escape-games/*/[a-z]*.html` liefert null Treffer ·
localStorage-Progress bleibt erhalten (Key data-getrieben, Sweep-Beleg) · kein Request an
`fonts.googleapis.com`/`fonts.gstatic.com` von Site-Seiten · Root/Profil optisch =
Referenz bis auf die beschlossenen Trims · Impressum/DSE von jeder Säule in ≤2 Klicks
erreichbar · `make site`-Baum enthält weder `_`-Ordner noch `escape-games/` noch
`sections/` auf oberster Ebene · Merge/Push nur auf Ansage, Impressum-Inhalt vor Deploy.

## Risiken

- **Pfad-Tiefe Syrien:** mechanisch, aber fehleranfällig → eigener Verifikations-Task
  (Serve + Smoke + grep-Null-Prüfung, s. Abnahme).
- **Discovery-Umbau:** check/smoke könnten nach dem Umbau leer-grün laufen → Abnahme
  verlangt expliziten Nachweis, dass Syrien in LIVE_GAMES auftaucht.
- **Variable-Font-Beschaffung** (Newsreader opsz): falls nicht sauber verfügbar,
  statische Instanzen als definierter Fallback; Sichtprüfung gegen die Referenz.
- **Alte Links brechen bewusst** (A0-Entscheid); Abfederung nur über `404.html`.
- **Impressum-Angaben fehlen noch** → Platzhalter-Stand darf nicht deployen; Merge wartet
  auf Pauls Content-Lieferung (Fotos, Kontakt-Adresse, Impressums-Daten).

## Nicht-Ziele

Kein `blog/`-Mount und keine Zettelkasten-Entscheidungen (E4; Darstellung ausdrücklich
nicht freigegeben) · keine visuelle Game-Änderung über die Footer-Links hinaus
(Akten-Absorption = E5) · kein Engine-/`base.css`-/`theme-gpg.css`-Touch · keine
WiB-CDN-Sanierung (Chart.js-Nebenbefund → eigener Kleinkram-Loop) · kein
Generator-Apparat-Touch (TARGET-Nachzug läuft über die Generator-Welt) · keine Redirects,
keine Domain-Änderung.
