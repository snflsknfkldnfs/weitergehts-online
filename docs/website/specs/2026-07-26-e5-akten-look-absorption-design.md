# E5 Akten-Look-Absorption (Theme + Engine) — Design

**Ziel:** Der Akten-Look wandert vom game-lokalen Syrien-Overlay (`vendor/`) in die geteilte
Game-Schicht (`theme-gpg.css` + `escape-engine.js`), die Game-Assets ziehen gebündelt in den
Säulen-Baum (`unterricht/assets/`). Danach erbt **jedes zukünftige Game den Akten-Look
automatisch** — der Generator liefert weiterhin nur `data.json`. **Reine Architektur-Migration,
kein Redesign: Syrien bleibt visuell regressions-frei** (Vorher/Nachher-Abnahme, Paul 2026-07-25).
Vorentscheidungen: E1-Spec §6 · ARCHITEKTUR-Log 2026-07-20 (E5 terminiert), 2026-07-21
(theme-interner Akten-Token-Block), 2026-07-23 (Asset-Umzug fällt mit E5 zusammen).

## Befund (Ist-Analyse 2026-07-26)

- **Overlay-Inventar** (`unterricht/escape-games/syrische-revolution-2011/vendor/`):
  `redesign.css` (835 Z., Mappen-Look, Namensraum `--rd-*`), `redesign-uebersicht.css`
  (297 Z., Übersichts-Look, Namensraum `--op-*`, teils wertgleiche Doppel-Deklarationen),
  `rd-inject.js` (53 Z., DOM-additiv per MutationObserver), `media-placeholder.css` (9 Z.).
  **397 × `!important`** als Durchsetzungsstrategie gegen `theme-gpg.css`; hartcodierte
  CSS-`content`-Labels („AKTE 04 · PULVERFASS EUROPA" — WW1-Artefakt im Syrien-Game — vs.
  „AKTE 14" auf der Übersicht); toter `.rd-tweaks`-Block ohne Erzeuger.
- **rd-inject-Jobs** (die drei DOM-Additionen, alle rein präsentational):
  (a) Leitfrage-Strip + Stempelfeld (`.rd-leitfrage-strip`, `.rd-stempelfeld__cell`; live an
  `aufgabe--solved` gekoppelt — gelöst = Stempel statt Nummer), (b) Typ-Badge je Aufgabe
  (`.aufgabe__typ-badge` aus der `aufgabe--<typ>`-Klasse, TYP_LABEL-Map), (c) Rahmen-Wrapper
  um Bildmaterial (`.rd-karte-frame` um `.material--karte img`, `.rd-foto-mount`/`.rd-foto-stage`
  um `.material--bild img`).
- **Konsumenten-Lage:** Die vier Game-Assets werden ausschließlich vom Syrien-Game (+ dem
  nicht-deployten `_template/`) geladen: `escape-engine.js` (v3.22, ~5180 Z.), `core.js` (v4.6),
  `base.css` (v4.7), `theme-gpg.css` (v3.17, 2777 Z.). `fonts.css` (v1.1) + `assets/fonts/`
  sind **site-geteilt** (auch Root/Profil/Hub). Zwei Ladeketten bleiben bestehen:
  Site `fonts → tokens → wg` · Games `fonts → base → theme-gpg` — Games laden
  `tokens.css`/`wg.css` NICHT (E3-Entscheid).
- **Distributions-Audit (2026-07-26, drei unabhängige Prüfläufe** über JS-Runtime, CSS-Kette,
  Game-Bundle — Anlass: Pauls offene Geschäftsfrage Plugin-Vertrieb / Hosting-Plattform):
  Die Runtime ist bereits weitgehend **site-agnostisch**. `data.json` wird relativ gefetcht
  (`fetch('data.json')`), localStorage-Keys sind datengetrieben (`escape-<thema>` aus
  `meta.titel`), kein `weitergehts`-String in Engine/CSS, alle `url()` in `fonts.css` relativ,
  `data.json` self-contained (Medien bare-relativ unter `media/` im Game-Ordner; ~11 externe
  Wikimedia-Bild-URLs). Einzige Kopplungen: root-absoluter Glossar-Default `/assets/data/`
  in `core.js:366` (nur Lernraum-Feature, per `data-glossar-base` überschreibbar; vom
  Game-Renderpfad nie aufgerufen) und zwei root-absolute Footer-Links `/impressum/`,
  `/datenschutz/` in der Game-`index.html`. **Kein Blocker.**

## Entscheidungen

1. **Regressions-Messlatte (Paul, 2026-07-25):** Reine Architektur-Migration. Das
   Syrien-Game sieht nach E5 exakt aus wie vorher — Abnahme per Vorher/Nachher-Screenshots
   (Ziel: 0 Pixel-Diff; jede begründete Abweichung wird einzeln dokumentiert). *(Verworfen:
   Migration mit gleichzeitigen Look-Verbesserungen — vermischt Refactor- und Design-Diff,
   macht die Abnahme wertlos.)*
2. **Theme-Absorption in-place:** Die Overlay-Regeln werden in `theme-gpg.css` eingearbeitet —
   Überschreiben wird Ersetzen: wo das Overlay heute eine Theme-Regel per `!important`
   übersteuert, wird die Theme-Regel selbst ersetzt (`!important`-Ziel ≈ 0, Restbestand wird
   gezählt und begründet). Die Namensräume `--rd-*` (Mappen) und `--op-*` (Übersicht) werden
   zu **einem theme-internen Akten-Token-Block** vereinigt, der dem `tokens.css`-Vokabular
   folgt (Namenskonvention `--color-primary` Navy, `--color-secondary` Gold, …), aber im Theme
   definiert ist — die Game-Kette lädt weiterhin kein `tokens.css` (ARCHITEKTUR-Log
   2026-07-21). Nicht-wertgleiche `--rd-*`/`--op-*`-Doppelgänger werden bei der Vereinigung
   einzeln aufgelöst und im Commit-Body dokumentiert. `.rd-tweaks` entfällt ersatzlos,
   `data-fontset` entfällt (Spectral fest), **Dark ist Default für alle Games**.
   *Präzisierung Plan-Exploration 2026-07-26:* Basis des Token-Blocks sind die heute
   **aktiven** Werte (= der `[data-bg="dark"]`+`humanist`-Zweig, nicht die inaktiven
   `:root`-Literale); ein Light-Schalter für Games entfällt (YAGNI — Light lebt nur in der
   Site-Schicht); neue Tokens ohne bestehendes theme-gpg-Pendant tragen das Präfix
   `--akte-*` (Rollennamen analog `tokens.css`), wertgleiche Rollen nutzen die
   vorhandenen `--color-*`-Tokens weiter.
   `media-placeholder.css` (9 Z.) wird mit absorbiert. *(Verworfen: v2-Parallelbau
   `theme-gpg-v2.css` — doppelte Pflege, und es gibt nur einen Konsumenten; tokens.css in
   die Game-Kette — vierter Request und Site/Game-Kopplung ohne Bedarf.)*
3. **rd-inject → Engine:** Die drei DOM-Jobs rendert die Engine direkt beim Seitenaufbau
   (Leitfrage-Strip/Stempelfeld inkl. Solved-State-Updates im bestehenden Lösungs-Codepfad;
   Typ-Badges beim Aufgaben-Rendern; Bild-Rahmen beim Material-Rendern). Der
   MutationObserver entfällt, `rd-inject.js` wird gelöscht. Die erzeugten Klassennamen
   (`.rd-leitfrage-strip`, `.rd-stempelfeld__cell`, `.aufgabe__typ-badge`,
   `.rd-karte-frame`, `.rd-foto-mount`, `.rd-foto-stage`) bleiben unverändert — der
   CSS-Kontrakt ist derselbe, nur der Erzeuger wechselt. Engine-Bump auf 3.23 via
   `make bump A=engine`. *(Verworfen: Observer in die Engine kopieren — Workaround-Import
   statt Integration; die Engine kennt ihre Render-Zeitpunkte selbst.)*
   **Erweiterung (Befund Plan-Exploration + Paul 2026-07-26): auch das
   Übersichts-Rendering wandert in die Engine.** Befund: Die Mappen-Kacheln der
   Game-Übersicht rendert heute ein ~60-Zeilen-Inline-Script in jeder Game-`index.html`
   (pro Game dupliziertes Boilerplate; die Status-Stempel „Archiviert/Vertraulich/Dringend"
   existieren nur in der Syrien-Kopie, nicht im `_template`). Entscheid: neue öffentliche
   Engine-Funktion `EscapeEngine.initUebersicht()` übernimmt Laden + Kachel-Rendering +
   Status-Stempel + Akten-Labels; die Game-`index.html` schrumpft auf einen Aufruf. Nur so
   erbt ein zukünftiges Game den Übersichts-Look wirklich über die geteilte Schicht.
   *(Verworfen: Inline-Boilerplate behalten und nur Labels datengetrieben machen — der
   Übersichts-Look hinge dauerhaft am Generator-HTML-Template.)*
4. **Datengetriebene Akten-Labels:** Die hartcodierten CSS-`content`-Labels werden durch
   optionale `data.json`-Felder ersetzt, die die Engine ins DOM rendert (CSS zeigt nur noch
   an): `meta.akten_label` (Dossier-Label der Übersicht, z. B. „AKTE 11") und je Mappe
   `mappen[i].akten_label` (z. B. „AKTE 11 · DARAA"). **Fallback bei fehlendem Feld:**
   Übersicht `meta.akten_label ?? "AKTE"`, Mappe
   `mappen[i].akten_label ?? "AKTE " + String(i+1).padStart(2, '0')`. Damit rendert
   jede heutige und zukünftige `data.json` ohne Schema-Änderung sinnvoll; der Generator
   kann die Felder später als kleinen Nachzug ins Schema aufnehmen (Generator-Welt, kein
   E5-Blocker). Für Syrien werden die Felder mit den heutigen Ist-Werten in die `data.json`
   eingetragen (Regressions-Freiheit). Feldnamen generisch (kein `wg_`-Präfix) — s.
   Entscheidung 6. *(Verworfen: Labels weiter im CSS — bricht für jedes neue Game;
   Pflicht-Felder — bricht alte data.json.)*
   *Präzisierungen Plan-Exploration + Paul 2026-07-26:* (a) Es gibt eine **dritte
   Label-Stelle**: das Kachel-Label der Übersicht (heute CSS-hartcodiert
   „DOSSIER · GPG / R7") → drittes optionales Feld `meta.dossier_label`, Fallback
   `"DOSSIER"`. (b) Befund: die heutigen Ist-Texte sind **Fremd-Game-Leftovers**
   („AKTE 04 · PULVERFASS EUROPA" — WW1-Text — identisch auf allen 4 Syrien-Mappen;
   „LAGEBESPRECHUNG · AKTE 14" bei nur 4 Mappen). Entschieden: **Migration treu +
   Fix-Commit** — die Migration übernimmt die Ist-Texte (Abnahme bleibt pixel-identisch),
   unmittelbar danach korrigiert ein eigener Commit im selben Branch die Syrien-Labels
   (getrennt prüfbare Diffs, ein Deploy). (c) Die game-agnostischen CSS-Labels
   („SICHERUNGSHEFT", „PHASE 3 · SICHERUNG", Submit-Texte, „✓") bleiben CSS-`content`
   im Theme — sie passen für jedes Game und brauchen keine Daten.
5. **Asset-Umzug in den Säulen-Baum (gebündelt mit E5, ARCHITEKTUR-Log 2026-07-23):**
   Die vier game-only-Assets ziehen um: `assets/js/escape-engine.js` + `assets/js/core.js`
   → `unterricht/assets/js/` · `assets/css/base.css` + `assets/css/themes/theme-gpg.css`
   → `unterricht/assets/css/`. **`fonts.css` + `assets/fonts/` bleiben site-geteilt unter
   `/assets/`** (Konsumenten in allen Säulen). Game-HTML referenziert danach zwei Wurzeln:
   Runtime `../../assets/…` (Tiefe 2 ab `unterricht/escape-games/<id>/`), Fonts weiterhin
   `../../../assets/css/fonts.css` (Tiefe 3). Nachzieher im selben Schritt:
   `assets/versions.json`-Pfade, `bump-assets.py`, `check.sh`/`check_assets.py`,
   `Makefile` (`site`-Allowlist unverändert — `unterricht/` ist schon drin), `_template/`,
   `SITE_MAP.md`/`RUNBUCH.md`. **Folge-Ansage an die Generator-Welt:** der `sandbox-export`
   (gerade auf Asset-Tiefe `../../../assets/` gestellt) muss die neue Runtime-Tiefe
   `../../assets/` lernen — fällig vor dem nächsten Game-Export, wird nach E5 als
   Ansage-Punkt in `PROZESS.md` eingetragen. *(Verworfen: Umzug separat vor/nach E5 —
   zwei Asset-Touches statt einem, genau das wollte der E3-Entscheid vermeiden; Umzug
   ganz streichen — die Säulen-Architektur bliebe dauerhaft halbfertig.)*
6. **Leitplanke Distributions-Neutralität (neu, aus Pauls Geschäftsfrage 2026-07-26 —
   Plugin-Vertrieb / Kunden-Hosting / eigene Hosting-Plattform, Entscheidung offen):**
   E5 hält beide Geschäftsoptionen offen und verbaut keine: (a) Engine/Theme bleiben frei
   von Site-Bezügen — keine neuen root-absoluten Pfade, keine Domain, keine
   `weitergehts`-Namen in neuen Feldern/Keys; (b) die neuen `data.json`-Felder sind
   generisch benannt und optional (Titel-Fallback) — `data.json` bleibt die vollständige,
   portable Beschreibung eines Games; (c) das Game-Bundle bleibt self-contained
   (`media/` im Game-Ordner). Nach E5 ist „Game-Ordner + 4 Runtime-Dateien + fonts" die
   natürliche Paketgrenze für jede spätere Distribution. **Bewusstes Nicht-Ziel:** die
   Produktisierung der Runtime (versioniertes Release-Artefakt, Export-Bundle-Option,
   konfigurierbarer Footer/Impressum, Kunden-Theming) — das ist ein eigener Schritt NACH
   der Geschäftsentscheidung und wird durch E5 nur leichter, nie schwerer.
7. **Reihenfolge im Plan:** (1) Absorption Theme + Engine **am alten Ort** (der visuelle
   Diff bleibt sauber isoliert, Abnahme-Screenshots vergleichen nur die Absorption),
   (2) `vendor/` löschen + Abnahme, (3) Asset-Umzug als letzter, rein mechanischer Task
   (Pfad-Sweep, per `make check`/`make smoke` beweisbar), (4) `make bump A=all` als
   Abschluss. Umsetzung auf Branch, Ausführung in separater Dev-Session (Muster E3).

## Nicht-Ziele

- Kein visuelles Redesign, keine neuen Features, keine Content-Änderungen.
- Keine Alt-Game-Reaktivierung. (Hinweis: archivierte Games erben bei späterer
  Reaktivierung automatisch den Akten-Look — dann gehört eine eigene Sichtprüfung dazu.)
- Keine Runtime-Produktisierung (s. Entscheidung 6) und keine Entscheidung der
  Geschäftsfrage — E5 ist unter beiden Optionen identisch richtig.
- Generator-Welt bleibt unangetastet; einzige Folge ist der Export-Tiefen-Nachzug
  (Ansage-Punkt nach E5).

## Abnahme

- **Vorher/Nachher-Screenshots** der fünf Syrien-Seiten (`index.html`, `mappe-1..4.html`)
  via Playwright (Smoke-Setup vorhanden), Pixel-Vergleich; Ziel 0 Diff, jede Abweichung
  einzeln begründet. Interaktions-Stichprobe: eine Aufgabe lösen → Stempelfeld reagiert
  wie vorher (rd-inject-Job (a) live).
- `make check` BLOCKING-grün · `make smoke` grün (13/13).
- `vendor/` gelöscht; **Netzwerk-Beweis: kein Request auf `vendor/`** mehr.
- `!important`-Zählung in `theme-gpg.css` dokumentiert (Ziel ≈ 0 aus dem Overlay-Erbe).
- `make bump A=all`; Push nur auf Ansage.

## Risiken

- **`!important`-Entflechtung (397 Stellen):** Spezifitäts-Fehler erzeugen schleichende
  Pixel-Diffs. Gegenmittel: seitenweise Screenshot-Vergleiche **während** der Absorption
  (pro Arbeitspaket), nicht erst am Ende.
- **Engine-Eingriff:** Die Solved-State-Kopplung des Stempelfelds muss in den bestehenden
  Lösungs-Codepfad; Regressionsgefahr für alle Aufgaben-Typen. Gegenmittel: identische
  DOM-Klassen (CSS-Kontrakt eingefroren), `make smoke` + Interaktions-Stichprobe.
- **Namensraum-Vereinigung:** `--rd-*`/`--op-*`-Doppelgänger, die NICHT wertgleich sind,
  können die Übersicht gegen die Mappen verschieben. Gegenmittel: Diff-Liste der
  Nicht-Wertgleichen vor der Vereinigung, Einzelentscheid je Wert.
- **Asset-Umzug:** vergessene Referenz = 404 hinter Cache. Gegenmittel: `check_assets` +
  `bump --check` + repo-weiter grep-Sweep auf die Alt-Pfade als Plan-Task.

## Prozess

Nach Umsetzung: `PROZESS.md` E5 ✅ (+ neuer Ansage-Punkt Generator-Export-Tiefe) ·
`ARCHITEKTUR.md`-Log-Eintrag · `SITE_MAP.md` (neue Asset-Pfade, vendor/-Zeile raus,
Ladeketten-Absatz) · `RUNBUCH.md` L2/L3 (Pfade, Engine-Zeilenzahl) · `CLAUDE.md`
Schnellreferenz (Engine-Pfad).
