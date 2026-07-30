# ARCHITEKTUR — weitergehts.online

> **Soll-Architektur + Entscheidungs-Log.** Rollen im Doku-Modell:
> `CLAUDE.md` = Session-Einstieg + harte Regeln · **diese Datei** = Warum ist es so? Wohin geht es? ·
> `SITE_MAP.md` = Was liegt heute wo? · `RUNBUCH.md` = Wie mache ich X?
> **Pflege-Regel:** Jede Grundsatz-Entscheidung → Log-Eintrag (unten) im selben Commit wie die Umsetzung.

## Zielbild

weitergehts.online ist die persönliche Website von Paul Cebulla mit **drei gleichrangigen Säulen**:

1. **Profil** — Visitenkarte (Person, Rolle, Kontakt).
2. **Zettelkasten** — öffentliche Karten-Ansicht des PKM-Systems, generiert vom externen
   `zk-atlas`-CLI (liest den Obsidian-Vault read-only, erzeugt selbständiges statisches HTML).
3. **Unterricht** — Materialien: Escape-Games, WiB-Tools, Lernraum.

Root ist ein **neutraler Verteiler** auf die drei Säulen — keine Säule besitzt die Startseite.

## Architektur-Identität

**Statischer Host für extern erzeugte Artefakte.** Die Website betreibt keine Content-Systeme
(kein CMS, kein Server, keine Datenbank). Sie hostet Artefakte, die außerhalb entstehen —
Escape-Game-Generator → `data.json` · `make lernraum` → JSON · `zk-atlas` → HTML — plus wenige
handgepflegte Seiten (Verteiler, Profil, Tool-Seiten).

## Ziel-IA / URL-Raum

```
/                          Verteiler (handgepflegt, minimal, 3 Kacheln)
/profil/                   Visitenkarte (handgepflegt)
/zettelkasten/             Atlas-Mount (generiert, nie handeditiert)
/unterricht/               Material-Säule:
  /unterricht/escape-games/<id>/
  /unterricht/wib/
  /unterricht/lernraum/    (falls Konsument-Seiten zurückkommen)
/assets/                   nur säulen-ÜBERGREIFENDE Infrastruktur
```

Deutschsprachige Pfadnamen (Publikum: Schüler, Kollegen, deutschsprachige Öffentlichkeit).
Der Umzug vom Ist-Zustand (Games unter `/escape-games/`, Tools unter `/sections/wib/`) passiert
konzentriert in E3 — **ein** URL-Bruch, ein kommunizierbarer Moment.

## Separierbarkeits-Regeln

Die Domain-Frage (alles auf weitergehts.online vs. spätere Trennung, z. B. paulcebulla.de für
Profil/Zettelkasten) ist **vertagt**. Damit die Trennung billig bleibt (Baum herauslösen +
Repo-Split + CNAME, kein Rewrite), gilt:

1. **Jede Säule = genau ein Verzeichnisbaum.**
2. **Querverweise zwischen Säulen nur auf Säulen-Wurzeln** (`/unterricht/`, nicht tief hinein).
3. **`assets/` behält nur Site-Weites** (base.css, core.js, künftige Design-Tokens).
   Säulen-Spezifisches (`escape-engine.js`, `theme-gpg.css`) wandert in E3 in den Säulen-Baum.
4. **Der Atlas-Mount ist reines Artefakt-Verzeichnis** — Inhalt kommt als Ganzes aus `zk-atlas`,
   wird nie von Hand editiert.

## Stack-Prämissen

1. **Vanilla bleibt:** HTML/CSS/JS ohne Framework, ohne npm; Deploy = statische Dateien kopieren
   (`make site`-Allowlist), kein Build-Zwang im Deploy-Pfad.
2. **Generierung nur vorgelagert:** Erzeugtes läuft als Make-Target mit eingecheckten Artefakten
   (Muster `make lernraum`; künftig `make zettelkasten`). Kein Content-Build in der CI-Deploy-Kette.
3. **Progressive Enhancement** für handgepflegte Seiten (Verteiler/Profil ohne JS lesbar);
   interaktive Tools/Games sind als Apps ausgenommen.
4. **Externe Abhängigkeiten** sparsam, nur via CDN, weiche Smoke-Policy (extern = WARN,
   same-origin = FAIL).
5. **Gates sind säulen-universell:** `make check`/`smoke`/`bump` gelten für jede Säule; eine neue
   Säule/Sektion ist erst fertig, wenn die Gates sie abdecken.

## Zettelkasten-Interface (Minimal-Vertrag)

Bewusst minimal, solange `zk-atlas` Plan 5 (Render/Publish) offen ist:

- Der Atlas liefert einen **selbständigen statischen Baum** (HTML + eigene Assets, Links relativ
  innerhalb des Baums, keine Abhängigkeit auf Site-`assets/`).
- Die Website **mountet ihn unverändert** unter `/zettelkasten/`, verlinkt vom Verteiler;
  Sync per Make-Target.
- Smoke prüft **Einstiegsseiten + Stichprobe** der Knoten-Seiten.

**Offen bis E4:** Stichproben-Umfang · Design-Angleichung (Atlas-eigen vs. Site-Tokens) ·
Update-Rhythmus · Volltextsuche.

## Umbau-Pfad

Inkrementell unter diesem Dach — kein Big-Bang-Branch, kein `/v2/`-Parallelbau. Reihenfolge:

- **E2 Engine-Reunifikation:** Syrien-vendor-Fork zurück in `assets/js/escape-engine.js`,
  Game unter `?v=`-Governance; Marne-Differenzierung aus `_dev-…-diff/` ins Live-Pendant.
- **E1 Design-Fundament:** Redesign-Overlay → Site-weites Token-Fundament in `assets/css/`.
- **E3 IA-Umsetzung (der eine URL-Bruch):** Root-Verteiler, `/profil/`, Umzug nach
  `/unterricht/…`, Unterricht-Assets in den Säulen-Baum, Checks/Smoke/SITE_MAP ziehen mit, Favicon.
- **E4 Zettelkasten-Mount:** sobald `zk-atlas` Plan 5 liefert.
- **E5 Akten-Look-Absorption:** Redesign-Overlay in `theme-gpg.css` in-place absorbieren +
  rd-inject-Logik in die Engine; nach der E3-Triage, spätestens vor dem nächsten neuen Game.

## Entscheidungs-Log

Format: Datum · Entscheidung · Warum · verworfene Alternative(n).

- **2026-07-30 — E5 umgesetzt: Akten-Look ist geteilte Schicht.** Das game-lokale
  `vendor/`-Overlay (redesign.css 835 Z. · redesign-uebersicht.css 297 Z. · rd-inject.js 53 Z. ·
  media-placeholder.css 9 Z., zusammen 397 `!important`) wurde in `theme-gpg.css` **in-place
  absorbiert** — Überschreiben wurde Ersetzen, Restbestand `!important` = 6 (nur Print-Block).
  Die `--rd-*`/`--op-*`-Namensräume sind zu einem theme-internen `--akte-*`-Block vereinigt
  (Basis: die real aktiven Dark-Werte; `data-bg`/`data-fontset` entfallen, Dark ist Default).
  Die drei rd-inject-DOM-Jobs rendert die Engine an ihren eigenen Render-Zeitpunkten; der
  MutationObserver entfällt. **Erweiterung gegenüber der ursprünglichen E5-Skizze:** auch das
  Übersichts-Rendering wanderte in die Engine (`initUebersicht`) — sonst hinge der
  Übersichts-Look dauerhaft am Generator-HTML-Template. Die hartcodierten CSS-`content`-Labels
  sind optionale `data.json`-Felder mit Fallbacks geworden; die Syrien-Texte waren
  WW1-Leftover und wurden in einem separaten Commit korrigiert (einzige gewollte visuelle
  Abweichung). Zuletzt zogen die vier game-only-Assets nach `unterricht/assets/`
  (`fonts.css` bleibt site-geteilt → Game-HTML referenziert bewusst zwei Tiefen).
  Abgenommen per 0-px-Screenshot-Diff (7 Seiten-Varianten) plus einem
  Computed-Style-Fingerabdruck (282 Messpunkte, Hover + alle Zustandsklassen), weil
  Screenshots Zustände nicht sehen, die das Overlay per `!important` stillgelegt hatte.
  Verworfen: v2-Parallelbau `theme-gpg-v2.css` (doppelte Pflege bei einem Konsumenten) ·
  `tokens.css` in die Game-Kette (vierter Request + Site/Game-Kopplung ohne Bedarf) ·
  Migration mit gleichzeitigen Look-Verbesserungen (vermischt Refactor- und Design-Diff und
  macht die Abnahme wertlos) · den Asset-Umzug separat fahren (zwei Asset-Touches statt einem).

- **2026-07-17 — E0 Hygiene deployt.** Deploy-Leaks geschlossen (`_`-Präfix-Konvention in allen
  rsync-Zweigen), Smoke-Coverage `sections/**`, Geld-Wert-Duplikat exzidiert. Smoke-CDN-Policy
  weich (extern = WARN), weil Dritt-Infrastruktur den Deploy nicht blocken soll; hart-für-alles
  verworfen.
- **2026-07-18 — Zielbild 3 Säulen; A0 vor E2.** Erst das Dach, dann Schuldenabbau; Alternativen
  (E2 zuerst / Agenda komplett neu bewerten) verworfen.
- **2026-07-18 — Domain vertagt + Separierbarkeit als Prämisse.** weitergehts.online bleibt;
  Trennung (z. B. paulcebulla.de) bleibt per Struktur billig. Sofort-Festlegung verworfen.
- **2026-07-18 — Bestehende URLs dürfen brechen.** Kein Redirect-Apparat auf GitHub Pages nötig;
  Bruch konzentriert in E3. „Unantastbar“ und „Redirect-Brücke“ verworfen.
- **2026-07-18 — Root = neutraler Verteiler.** Kein Publikum wird bevorzugt; „Visitenkarte
  zuerst“ und „Material zuerst“ verworfen.
- **2026-07-18 — IA = 3 deutsche Bäume** (`/profil/` · `/zettelkasten/` · `/unterricht/`).
  Publikum deutschsprachig; englische Namen und nur-logische Säulen verworfen.
- **2026-07-18 — Doku-Modell = diese Datei + Log.** ADR-Verzeichnis verworfen (überdimensioniert
  für eine Ein-Personen-Site); kein Log verworfen (das Warum ginge verloren).
- **2026-07-18 — Umbau inkrementell.** Site bleibt durchgehend live, Gates greifen je Schritt;
  Big-Bang-Branch und `/v2/`-Parallelbau verworfen.
- **2026-07-18 — E2 Engine-Reunifikation.** Die 3 Syrien-Fork-Hunks (Statistik-SVG, Tafelbild-
  Sicherung, Differenzierungs-Selektor `[id^="auf"]` als Superset) in die geteilte Engine gemergt
  (v3.21), Syrien-HTML unter `?v=`-Governance, Fork-Duplikate gelöscht; Redesign-Overlay bleibt
  bewusst game-lokal bis E1. Marne-Differenzierung dev→live gemergt, `_dev`-Ordner entfernt.
  Alternative (Syrien-Aufgaben-IDs auf `aufgabe-*` migrieren) verworfen: data.json-Blast-Radius
  plus localStorage-Progress der Schüler hinge an den alten IDs.
- **2026-07-18 — Prozess-Steuerung = `PROZESS.md`.** Prozess-Stand (Stand · nächster Schritt ·
  Ansage-Punkte · Einstiegs-Ritual) lebt versioniert im Repo, Claude-Memory nur als Zeiger;
  COWORK-artiger Modus-Apparat verworfen (Pflege-Last ohne Gegenwert für eine Ein-Personen-Site).
- **2026-07-20 — E1 schlank zugeschnitten; E5 terminiert.** E1 liefert nur das Fundament
  (`tokens.css`, self-gehostete Fonts/DSGVO-Sanierung, `base.css`-Entmischung,
  `?v=`-Lücken); der Akten-Look-Rollout (Theme-Absorption in-place, rd-inject → Engine,
  datengetriebene Akten-Labels, Dark-Default) wird E5 — fällig nach der E3-Game-Triage,
  spätestens vor dem nächsten neuen Game. Warum: Design erreicht zukünftige Games nur über
  die geteilte Schicht, aber die Alt-Games sind Triage-Kandidaten — Absorption vor der
  Triage wäre teils für Sterbekandidaten. Verworfen: Sofort-Rollout (voller Umbau jetzt)
  und Token-Extraktion ohne Font-Sanierung (DSGVO-Risiko bliebe live). Abweichung vom Plan
  (auf Ansage mitgeschlossen): Der Font-Abriss legte einen zweiten, im Plan übersehenen
  Google-Kanal offen — die Engine (`escape-engine.js`, `injectArabicFont`) lud Noto Sans
  Arabic (DaZ-Differenzierung) per CDN bei jedem Laden einer differenzierten Mappe (3/4
  Live-Games). Daher auch Arabic self-gehostet (`assets/fonts/`, @font-face in `fonts.css`),
  `injectArabicFont()` auf No-op, Engine-Bump 3.22 — der einzige E1-Engine-Eingriff, rein
  aus DSGVO-Gründen (nicht Akten-Look; der bleibt E5).
- **2026-07-20 — Repo-Entmischung: JA (Snapshot-Move, kein History-Rewrite).** Die Generator-/
  PM-Pfade (`docs/projekt|agents|architektur|analyse|befunde|checklisten|uebergabe|briefings|
  testdaten|fachdidaktik`, 3/4 von `docs/assets/`, Root-Generator-Transkript, die 4 Brücken-
  Skripte in `tools/`) ziehen als Snapshot ins Generator-Repo `~/escape-game-generator/`,
  koordiniert AUS der Generator-Welt (Zwei-Welten-Boundary); E3 wartet darauf nicht.
  `bridge/` (222 MB) war ein versehentlich eingecheckter Claude-Desktop-Diagnose-Export ohne
  Generator-Bezug → gelöscht statt umgezogen (2026-07-21); 859 MB ungetrackte Session-Exports
  (`docs/analyse/Verlauf Game Imperialismus/`) sofort gelöscht. Warum: Ein-Zweck-Repo =
  Session-Klarheit + Repo-Gewicht; das öffentliche Leak-Risiko war schon vorher durch das
  Allowlist-Deploy geschlossen. Verworfen: History-Rewrite (`git filter-repo` — Aufwand/Risiko
  ohne Gegenwert, die Blobs bleiben in der Historie), Status quo (Zwei-Welten-Reibung in jeder
  Session), `bridge/`-Umzug (kein Generator-Kanal — die reale Übergabe läuft via
  sandbox-export-Skill).
- **2026-07-21 — Site-Design-Identität = „Nebel & Papier" (claude-design-Scoping).** Die
  Site-Ebene (Root, /profil/, später /zettelkasten/) übernimmt das von Paul gescopte
  System (Referenz: claude.ai/design „website allgemein", lokal `_design-scoping/`):
  Papier-/Nebel-Palette, Newsreader/Archivo/Space Mono (self-hosted), eckig/Haarlinien,
  Dark-Default via `wg-mode`. Der Akten-Look (Navy/Gold) wird Game-Theme → E5; E5 mappt
  `--rd-*`/`--op-*` auf einen theme-internen Akten-Token-Block (Präzisierung E1-Spec §6).
  Zwei Ladeketten: Site `fonts → tokens → wg` · Games `fonts → base → theme-gpg`.
  Verworfen: Akten-Identität site-weit (Dossier-Kostüm für Person/PKM); Neubau statt
  Referenz-Integration (wirft lauffähige High-Fidelity-Referenz weg).
- **2026-07-21/23 — E3 IA-Umsetzung (der eine URL-Bruch) umgesetzt.** Root = Verteiler
  (2 Kacheln, 3. Slot für Zettelkasten/E4 reserviert), /profil/ minimal (Porträt +
  Kindheitsfoto, keine Prosa), /unterricht/ = Hub + Games + WiB (Umzug; Alt-Games →
  `_archiv-`), /impressum/ + /datenschutz/, 404.html, Favicon; Gates-Discovery liest
  `unterricht/index.html`. **Quittierte Abweichung vom A0-Umbau-Pfad:** die
  Unterricht-Assets (`escape-engine.js`, `theme-gpg.css`) bleiben unter `/assets/`;
  ihr Umzug in den Säulen-Baum fällt mit E5 zusammen (ein Asset-Touch statt zwei, der
  E3-Bruch bleibt auf Seiten-URLs begrenzt). Verworfen: Asset-Umzug jetzt.
- **2026-07-23 — E3-Gate-Härtungen (drei Plan-Abweichungen, beim Bau aufgedeckt).**
  (1) `check_assets.py` Dead-Link-Scope auf die komplexen Deploy-Artefakte (Games + WiB)
  eingeengt — die sich wechselseitig verlinkenden Site-Seiten (Root/Hub/profil/impressum/
  datenschutz/404) werden per Render-Smoke validiert, sonst scheitern Vorwärts-Referenzen
  während des inkrementellen IA-Aufbaus (Seite A linkt auf noch nicht gebaute Seite B).
  (2) `check_assets.py` löst site-absolute `/`-Links ab Deploy-Root auf (GitHub Pages
  liefert unter der Custom-Domain ab /), sonst „ESCAPES REPO" bei favicon/404/Footer.
  (3) `wg.css`: der aus der Referenz übernommene, nie erfüllte Platzhalter
  `img/tapete-placeholder.png` (same-origin-404 im Smoke) durch eine self-contained
  fractalNoise-data-URI ersetzt (on-theme, tileable). Alle drei nötig, damit die vom Plan
  selbst eingeführten Seiten die Gates grün passieren. Verworfen: Smoke-Ignore-Liste
  erweitern (verstecke echten 404); Pre-Crop der Fotos (object-fit rahmt, Zuschnitt = Pauls).
