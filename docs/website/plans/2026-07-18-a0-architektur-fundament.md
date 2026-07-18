# A0 Architektur-Fundament — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Das A0-Architektur-Fundament materialisieren: `docs/website/ARCHITEKTUR.md` anlegen und die bestehende Doku (CLAUDE.md, SITE_MAP.md) + das Session-Memory darauf ausrichten.

**Architecture:** Reines Doku-Deliverable gemäß freigegebener Spec `docs/website/specs/2026-07-18-a0-architektur-fundament-design.md` — kein Live-Stand-Change, keine Migration. ARCHITEKTUR.md wird das „Warum/Wohin“-Dach über SITE_MAP (Ist) und RUNBUCH (Wie); CLAUDE.md verweist als Session-Einstieg darauf.

**Tech Stack:** Markdown, git, `make check` als Gate.

## Global Constraints

- Branch: `docs/a0-architektur-fundament` (existiert bereits, Spec-Commit `022432b` liegt darauf). NICHT auf `main` arbeiten.
- Git: **explizit stagen** (nie `git add .`/`-A`); Conventional Commits deutsch mit Scope; **Merge/Push nur auf Pauls Ansage** — dieser Plan endet vor dem Merge.
- `make check` muss vor jedem Push BLOCKING-grün sein; hier zusätzlich als Task-3-Verifikation.
- Generator-Apparat (`docs/projekt/`, `docs/agents/`, `docs/architektur/`, `bridge/`) NICHT anfassen. Achtung: `docs/architektur/` gehört dem Generator — unsere Datei liegt bewusst unter `docs/website/ARCHITEKTUR.md`.
- Memory-Verzeichnis: `/Users/paulad/.claude/projects/-Users-paulad-weitergehts-online-weitergehts-online/memory/` (außerhalb des Repos, kein Commit).

---

### Task 1: ARCHITEKTUR.md anlegen

**Files:**
- Create: `docs/website/ARCHITEKTUR.md`

**Interfaces:**
- Consumes: Spec §§1–8 (`docs/website/specs/2026-07-18-a0-architektur-fundament-design.md`).
- Produces: `docs/website/ARCHITEKTUR.md` — von Task 2 aus CLAUDE.md/SITE_MAP.md referenziert (exakter Pfad-String: `docs/website/ARCHITEKTUR.md` bzw. `ARCHITEKTUR.md` relativ innerhalb `docs/website/`).

- [ ] **Step 1: Datei mit exakt diesem Inhalt anlegen**

````markdown
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
````

- [ ] **Step 2: Verifizieren**

Run: `grep -c "^## " docs/website/ARCHITEKTUR.md`
Expected: `8` (Zielbild, Architektur-Identität, Ziel-IA, Separierbarkeits-Regeln, Stack-Prämissen, Zettelkasten-Interface, Umbau-Pfad, Entscheidungs-Log)

Run: `grep -c "^- \*\*2026-" docs/website/ARCHITEKTUR.md`
Expected: `8` (Log-Einträge)

- [ ] **Step 3: Commit**

```bash
git add docs/website/ARCHITEKTUR.md
git commit -m "docs(website-layer): ARCHITEKTUR.md — Soll-Architektur + Entscheidungs-Log (A0)

Materialisiert die freigegebene A0-Spec: Zielbild 3 Säulen, Architektur-
Identität (statischer Host für extern erzeugte Artefakte), Ziel-IA
(/profil /zettelkasten /unterricht), Separierbarkeits-Regeln,
Stack-Prämissen, Zettelkasten-Minimal-Vertrag, inkrementeller Umbau-Pfad,
Entscheidungs-Log mit Rücktrag 2026-07-17/18.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: Querverweise in CLAUDE.md und SITE_MAP.md

**Files:**
- Modify: `CLAUDE.md` (Abschnitt „Was das ist“, Z. 8–18)
- Modify: `docs/website/SITE_MAP.md` (Kopfzeilen Z. 3–4, Verticals-Tabellenzeile „Blog / Notizen“ Z. 14, Abschnitt „Offene IA-Fragen“ Z. 53–61)

**Interfaces:**
- Consumes: `docs/website/ARCHITEKTUR.md` aus Task 1 (Pfad-String muss exakt stimmen).
- Produces: nichts Weiteres — Task 3 verifiziert nur.

- [ ] **Step 1: CLAUDE.md — „Was das ist“ auf Zielbild umstellen**

Alten Block ersetzen (Edit, old_string → new_string):

Old:
```markdown
`weitergehts.online` ist die **persönliche Website von Paul Cebulla** (Lehrkraft) — statisch,
vanilla HTML/CSS/JS, **kein Build/npm/Framework**, gehostet auf **GitHub Pages**.
Sie wächst zu einer mehrsektionigen Site:

- **Unterrichtsmaterial** — interaktive **Escape-Games** (GPG/Geschichte R7), datengetrieben:
  je Spiel `escape-games/<id>/data.json` + geteilte `assets/js/escape-engine.js` + Theme-CSS.
  Plus **Lernraum**-Daten (`assets/data/*.json`, via `make lernraum`).
- **Blog/Notizen** — *im Aufbau* (Sektion `sections/…`, s. SITE_MAP).
- **Home** (`index.html`) + künftige Sektionen.
```

New:
```markdown
`weitergehts.online` ist die **persönliche Website von Paul Cebulla** (Lehrkraft) — statisch,
vanilla HTML/CSS/JS, **kein Build/npm/Framework**, gehostet auf **GitHub Pages**.
Zielbild: **drei Säulen** (Soll-Architektur + Entscheidungs-Log: `docs/website/ARCHITEKTUR.md`):

- **Unterricht** — interaktive **Escape-Games** (GPG/Geschichte R7), datengetrieben:
  je Spiel `escape-games/<id>/data.json` + geteilte `assets/js/escape-engine.js` + Theme-CSS.
  Plus WiB-Tools (`sections/wib/`) + **Lernraum**-Daten (`assets/data/*.json`, via `make lernraum`).
- **Zettelkasten** — Mount des extern generierten PKM-Atlas (*geplant*, E4).
- **Profil** — Visitenkarte; Root wird neutraler Verteiler (*geplant*, E3).
```

- [ ] **Step 2: SITE_MAP.md — Kopf als Ist-Zustand ausweisen**

Old:
```markdown
> Informationsarchitektur der Site als Menge von **Verticals**. Anker für „wo gehört Neues hin".
> Bei jeder neuen Sektion/Game/Seite hier eintragen. Stand: 2026-07-17.
```

New:
```markdown
> **Ist-Zustand** der Site als Menge von **Verticals**. Anker für „wo gehört Neues hin".
> Soll-Architektur, Prämissen + Entscheidungs-Log: `ARCHITEKTUR.md`.
> Bei jeder neuen Sektion/Game/Seite hier eintragen. Stand: 2026-07-18.
```

- [ ] **Step 3: SITE_MAP.md — Blog-Zeile durch Zettelkasten-Zeile ersetzen**

Old:
```markdown
| **Blog / Notizen** | `sections/blog/` *(geplant)* | offen (statische HTML; optional datengetrieben) | *noch zu definieren* | **im Aufbau** |
```

New:
```markdown
| **Zettelkasten** | `/zettelkasten/` *(geplant, E4)* | extern generierter Atlas-Mount (`zk-atlas` → statisches HTML, nie handeditiert) | — | geplant (s. `ARCHITEKTUR.md`) |
```

- [ ] **Step 4: SITE_MAP.md — beantwortete IA-Fragen abhaken**

Old:
```markdown
- Blog/Notizen: statisch-handgepflegt vs. datengetrieben (JSON/Markdown→Render)? Navigation/Menü der Gesamtsite?
- Eigentliche **Home-Seite** ist aktuell nur eine Game-Liste — für eine „komplette persönliche Website"
  perspektivisch echte Landing/Navigation (Design via `frontend-design`/`ui-design`).
- **Favicon** fehlt (harmloser 404) — Mini-Win bei nächstem Sektions-Ausbau.
```

New:
```markdown
- ~~Blog/Notizen-Modell~~ **beantwortet 2026-07-18 (A0):** kein Blog, sondern Zettelkasten-Mount
  (`ARCHITEKTUR.md`; Umsetzung E4).
- ~~Home-Seite~~ **beantwortet 2026-07-18 (A0):** Root wird neutraler Verteiler auf 3 Säulen;
  Umsetzung E3 (Design dort via `frontend-design`/`ui-design`).
- **Favicon** fehlt (harmloser 404) — wird in E3 miterledigt.
```

- [ ] **Step 5: Verifizieren**

Run: `grep -c "ARCHITEKTUR.md" CLAUDE.md docs/website/SITE_MAP.md`
Expected: `CLAUDE.md:1` und `docs/website/SITE_MAP.md:3`

Run: `grep -n "Blog" docs/website/SITE_MAP.md`
Expected: nur noch der abgehakte Eintrag `~~Blog/Notizen-Modell~~` (Z. ~54), keine Tabellenzeile mehr.

- [ ] **Step 6: Commit**

```bash
git add CLAUDE.md docs/website/SITE_MAP.md
git commit -m "docs(website-layer): CLAUDE.md + SITE_MAP auf A0-Zielbild ausgerichtet

CLAUDE.md nennt die drei Säulen + verweist auf ARCHITEKTUR.md;
SITE_MAP ist explizit Ist-Zustand (Soll → ARCHITEKTUR.md), Blog-Zeile
durch Zettelkasten-Mount ersetzt, beantwortete IA-Fragen abgehakt.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Gate + Memory-Abschluss

**Files:**
- Modify: `/Users/paulad/.claude/projects/-Users-paulad-weitergehts-online-weitergehts-online/memory/redesign-prozess-website.md` (außerhalb des Repos, kein Commit)

**Interfaces:**
- Consumes: Tasks 1+2 abgeschlossen und committet.
- Produces: grünes Gate; Memory-Stand „A0 umgesetzt“.

- [ ] **Step 1: Gate laufen lassen**

Run: `make check`
Expected: BLOCKING-grün (Doku-Änderungen berühren keine HTML/JSON-Checks; falls ROT → STOPP, Befund an Paul).

- [ ] **Step 2: Memory aktualisieren**

In `redesign-prozess-website.md` den A0-Eintrag ersetzen:

Old:
```markdown
- **A0 Architektur-Fundament** (IN ARBEIT seit 2026-07-18, gleiche Session): Grundsatzdokument
  `docs/website/ARCHITEKTUR.md` — Zielbild, IA-Skelett, Domain-Strategie, Stack-Prämissen,
  Dokumentations-Modell; Rahmen mit Offenheits-Punkten, kein Endentwurf. E1/E3/E4 werden
  Ausarbeitungen unter diesem Dach.
```

New:
```markdown
- **A0 Architektur-Fundament — UMGESETZT 2026-07-18** (Branch `docs/a0-architektur-fundament`,
  Merge/Push auf Ansage): `docs/website/ARCHITEKTUR.md` = Soll-Architektur + Entscheidungs-Log
  (Ziel-IA /profil /zettelkasten /unterricht, Root=Verteiler, URLs dürfen brechen → Bruch in E3,
  Separierbarkeits-Regeln, Stack-Prämissen, Zettelkasten-Minimal-Vertrag). Spec:
  `docs/website/specs/2026-07-18-a0-architektur-fundament-design.md`. E1/E3/E4 = Ausarbeitungen
  unter diesem Dach.
```

- [ ] **Step 3: Abschluss-Meldung an Paul**

Zusammenfassung (Commits, Gate-Status, Branch-Stand) + Frage nach Merge/Push-Ansage
(superpowers:finishing-a-development-branch). KEIN Merge/Push ohne Ansage.
