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
