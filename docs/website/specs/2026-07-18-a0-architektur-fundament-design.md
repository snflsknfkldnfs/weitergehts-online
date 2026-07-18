# A0 Architektur-Fundament — Design

> **Status:** Von Paul freigegeben am 2026-07-18 (Blöcke A/B/C einzeln bestätigt).
> **Deliverable von A0:** `docs/website/ARCHITEKTUR.md` (+ Querverweise in `CLAUDE.md`/`SITE_MAP.md`).
> A0 ändert am Live-Stand **nichts** — alles Physische passiert in den E-Schritten mit je eigenem Plan.
> **Kontext:** SITE_MAP (Ist-Zustand), Atlas-Befund 2026-07-18 (`/Users/paulad/zettelkasten-atlas`,
> Pläne 1–4 fertig, Plan 5 Render/Publish offen), Redesign-Memory `redesign-prozess-website`.

## 1. Zielbild & Architektur-Identität

weitergehts.online ist die persönliche Website von Paul Cebulla mit **drei gleichrangigen Säulen**:

1. **Profil** — Visitenkarte (Person, Rolle, Kontakt).
2. **Zettelkasten** — öffentliche Karten-Ansicht des PKM-Systems, generiert vom externen
   `zk-atlas`-CLI (liest den Obsidian-Vault read-only, erzeugt selbständiges statisches HTML).
3. **Unterricht** — Materialien: Escape-Games, WiB-Tools, Lernraum.

**Architektur-Identität: statischer Host für extern erzeugte Artefakte.** Die Website betreibt
keine Content-Systeme (kein CMS, kein Server, keine Datenbank). Sie hostet Artefakte, die
außerhalb entstehen (Escape-Game-Generator → `data.json`, `make lernraum` → JSON,
`zk-atlas` → HTML), plus wenige handgepflegte Seiten (Verteiler, Profil, Tool-Seiten).
Die Startseite (Root) ist ein **neutraler Verteiler** auf die drei Säulen — keine Säule
besitzt die Root.

## 2. Ziel-IA / URL-Raum

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
**Bestehende URLs dürfen brechen** (Entscheidung Paul 2026-07-18); der Bruch passiert
konzentriert in E3, nicht tröpfelnd.

## 3. Separierbarkeits-Regeln (vertagte Domain-Entscheidung, strukturell abgesichert)

Die Domain-Frage (alles auf weitergehts.online vs. spätere Trennung z. B. paulcebulla.de für
Profil/Zettelkasten) ist **vertagt**. Damit die Trennung später billig bleibt
(= Baum herauslösen + Repo-Split + CNAME, kein Rewrite), gilt:

1. **Jede Säule = genau ein Verzeichnisbaum.**
2. **Querverweise zwischen Säulen nur auf Säulen-Wurzeln** (`/unterricht/`, nicht tief hinein) —
   beim Split bricht maximal ein Link pro Seite, kein Geflecht.
3. **`assets/` behält nur Site-Weites** (base.css, core.js, künftige Design-Tokens).
   Säulen-spezifisches — namentlich `escape-engine.js`, `theme-gpg.css` — wandert mittelfristig
   in den Säulen-Baum (`/unterricht/assets/` o. Ä.); Zeitpunkt: E3, wenn ohnehin alles umzieht
   und `bump-assets`/`versions.json` angefasst werden.
4. **Der Atlas-Mount ist reines Artefakt-Verzeichnis:** Inhalt kommt als Ganzes aus `zk-atlas`,
   wird nie von Hand editiert.

## 4. Stack-Prämissen

1. **Vanilla bleibt.** HTML/CSS/JS ohne Framework, ohne npm, ohne Build-Zwang im Deploy-Pfad —
   deployt wird immer nur „statische Dateien kopieren“ (`make site`-Allowlist).
2. **Generierung nur vorgelagert.** Erzeugtes läuft als Make-Target mit **eingecheckten**
   Artefakten (Muster `make lernraum`; künftig `make zettelkasten` = Atlas-Output-Sync).
   Kein Build in der CI-Deploy-Kette, der Inhalte erzeugt.
3. **Progressive Enhancement** für handgepflegte Seiten (Verteiler/Profil ohne JS lesbar);
   interaktive Tools/Games sind als Apps ausgenommen.
4. **Externe Abhängigkeiten** sparsam, nur via CDN, mit der beschlossenen weichen Smoke-Policy
   (extern = WARN, same-origin = FAIL).
5. **Gates sind säulen-universell.** `make check`/`smoke`/`bump` gelten für jede Säule;
   eine neue Säule/Sektion ist erst fertig, wenn die Gates sie abdecken (E0-Lektion).

## 5. Zettelkasten-Interface (Minimal-Vertrag)

Bewusst minimal, weil zk-atlas Plan 5 (Render/Publish) noch offen ist. Festgeschrieben wird nur:

- Der Atlas liefert einen **selbständigen statischen Baum** (HTML + eigene Assets, Links relativ
  innerhalb des Baums, keine Abhängigkeit auf Site-`assets/`) — entspricht seiner Spec
  (`out/deploy/public/`, content-additionsfrei, Provenienz-Sidecar außerhalb des Deploy-Roots).
- Die Website **mountet ihn unverändert** unter `/zettelkasten/`, verlinkt vom Verteiler;
  Sync per Make-Target.
- Smoke prüft **Einstiegsseiten + Stichprobe** der Knoten-Seiten (bei ~2000 Zetteln darf der
  Smoke nicht zur Bremse werden).

**Offen bis E4:** Stichproben-Umfang · Design-Angleichung (eigenständiges Atlas-Design vs.
Site-Tokens) · Update-Rhythmus · Umgang mit der Volltextsuche.

## 6. Doku-Modell

Vier Dateien, vier Rollen, keine Duplikation:

| Datei | Rolle | Beantwortet |
|---|---|---|
| `CLAUDE.md` | Session-Einstieg + harte Regeln | Was muss jede Session wissen? |
| `docs/website/ARCHITEKTUR.md` **(neu)** | Zielbild, Prämissen, IA-Soll + **Entscheidungs-Log** | Warum ist es so? Wohin geht es? |
| `docs/website/SITE_MAP.md` | Ist-Zustand der Verticals | Was liegt heute wo? |
| `docs/website/RUNBUCH.md` | Loop-Rezepte | Wie mache ich X? |

Entscheidungs-Log = Abschnitt in ARCHITEKTUR.md, datierte Kurzeinträge (3–5 Zeilen:
Entscheidung · Warum · verworfene Alternative). **Pflege-Regel:** Jede Grundsatz-Entscheidung
bekommt ihren Log-Eintrag im selben Commit wie ihre Umsetzung. Beim Anlegen werden die bereits
gefallenen Entscheidungen rückwirkend eingetragen (siehe §8).

## 7. Umbau-Pfad (inkrementell unter dem Dach)

Kein Big-Bang-Branch, kein `/v2/`-Parallelbau. Die Site bleibt durchgehend live, jeder Schritt
einzeln geplant, gated, deploybar:

- **E2 Engine-Reunifikation** (unverändert): Syrien-vendor-Fork (+33 Zeilen) zurück in die
  geteilte Engine, Game unter `?v=`-Governance; Marne-Differenzierung aus
  `_dev-verlauf-erster-weltkrieg-marne-ende-diff/` ins Live-Pendant.
- **E1 Design-Fundament:** Redesign-Overlay wird zum Site-weiten Token-Fundament in
  `assets/css/` — Basis für Verteiler und Profil.
- **E3 IA-Umsetzung = der eine URL-Bruch:** Root-Verteiler, `/profil/`, Umzug
  `escape-games/` + `sections/wib/` → `/unterricht/…`, Unterricht-Assets in den Säulen-Baum,
  Checks/Smoke/SITE_MAP ziehen mit, Favicon. Ein Deploy, ein kommunizierbarer Moment.
- **E4 Zettelkasten-Mount:** sobald zk-atlas Plan 5 liefert.

## 8. Entscheidungs-Log-Rücktrag (beim Anlegen von ARCHITEKTUR.md einzutragen)

- **2026-07-17** E0 Hygiene deployt (Leaks, `_`-Konvention, Smoke-sections, Geld-Wert-Exzision);
  Smoke-CDN-Policy weich.
- **2026-07-18** Zielbild 3 Säulen; A0 als Kopfschritt vor E2; Domain vertagt + Separierbarkeit
  als Prämisse; bestehende URLs dürfen brechen; Root = neutraler Verteiler; IA = 3 deutsche
  Bäume (`/profil/` · `/zettelkasten/` · `/unterricht/`); Doku-Modell = 1 Datei + Log
  (ADR-Verzeichnis verworfen: überdimensioniert); Umbau inkrementell (Big-Bang + `/v2/` verworfen).

## 9. Nicht-Ziele von A0

- Kein visuelles Design, keine Startseiten-Gestaltung (→ E1/E3).
- Keine physische Migration, keine Verzeichnis-Umzüge (→ E3).
- Keine Festlegung der Atlas-Details jenseits des Minimal-Vertrags (→ E4, wenn Plan 5 steht).
- Keine Domain-Registrierung/-Entscheidung (vertagt; optionale Domain-Sicherung ist Pauls
  manueller Schritt außerhalb des Repos).

## 10. Umsetzung (für den Plan)

1. `docs/website/ARCHITEKTUR.md` anlegen (Inhalt = §§1–7 dieses Designs, redaktionell als
   Dauer-Dokument gefasst, + Entscheidungs-Log aus §8).
2. `CLAUDE.md`: „Was das ist“-Absatz auf Zielbild/ARCHITEKTUR.md verweisen (kurz halten).
3. `SITE_MAP.md`: Kopfzeile um Verweis „Soll-Architektur → ARCHITEKTUR.md“ ergänzen;
   offene IA-Fragen, die A0 beantwortet, als beantwortet markieren.
4. Memory `redesign-prozess-website` aktualisieren (A0 erledigt, Verweis auf ARCHITEKTUR.md).
5. `make check` + Commit(s) auf Branch, Merge/Push nur auf Ansage.
