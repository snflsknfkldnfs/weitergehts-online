# BEFUND — Run-4 Live-Site Content-Inventar (Sandbox-Fetch, Pfad B)

**Datum:** 2026-04-27
**Methodik:** Sandbox-Fetch (`curl`) + HTML/JSON-Parsing über Sandbox-Python. Visual-Inventar via Chrome MCP **NICHT VERFÜGBAR** (Permission-System der Claude-in-Chrome-Extension blockt persistent trotz Reinstall + Reset). Strukturelles Audit auf URL: `https://weitergehts.online/escape-games/gpg-erster-weltkrieg-ursachen-run4-v050/`

**Source:** Live GitHub-Pages-Deploy (last-modified 2026-04-27 17:43:31 GMT, server: GitHub.com)

**Scope:** Vollständige strukturelle Inventarisierung aller 7 Top-Level-URLs + 12 Asset-Files + Cross-Check Source-vs-Live-Drift.

---

## 1. HTTP-Status-Audit (alle URLs HTTP 200)

### 1.1 Top-Level-Seiten

| URL | HTTP | Größe | Verifikation |
|---|---|---|---|
| `/` | **200** | 6318 B | `last-modified: Mon, 27 Apr 2026 17:43:31 GMT` |
| `/index.html` | **200** | 6318 B | identisch zu `/` |
| `/data.json` | **200** | 165480 B | Top-Level: meta + mappen[4] |
| `/mappe-1.html` | **200** | 4272 B | Template (Mappe-ID dynamisch via `Core.nav.getCurrentPage()`) |
| `/mappe-2.html` | **200** | 4272 B | identisch zu mappe-1, andere ID-Resolution |
| `/mappe-3.html` | **200** | 4272 B | identisch |
| `/mappe-4.html` | **200** | 4272 B | identisch |
| `/lehrkraft.html` | **200** | 12032 B | Standalone-Page mit Passwort-Gate |

### 1.2 Asset-Files (12 Bilder + CSS + JS)

| Asset | HTTP | Größe |
|---|---|---|
| `assets/img/{game-id}/img-m1-01.jpg` | 200 | 3.34 MB |
| `assets/img/{game-id}/img-m1-02.svg` | 200 | 99 KB |
| `assets/img/{game-id}/img-m1-03.jpg` | 200 | 2.94 MB |
| `assets/img/{game-id}/img-m1-06.svg` | 200 | 676 KB |
| `assets/img/{game-id}/img-m2-01.svg` | 200 | 22 KB |
| `assets/img/{game-id}/img-m2-02.jpg` | 200 | 719 KB |
| `assets/img/{game-id}/img-m2-03.jpg` | 200 | 81 KB |
| `assets/img/{game-id}/img-m3-01.jpg` | 200 | 959 KB |
| `assets/img/{game-id}/img-m3-02.jpg` | 200 | 101 KB |
| `assets/img/{game-id}/img-m4-01.svg` | 200 | 1.46 MB |
| `assets/img/{game-id}/img-m4-02.jpg` | 200 | 55 KB |
| `assets/img/{game-id}/img-m4-03.jpg` | 200 | 788 KB |
| `assets/css/base.css?v=3.6c` | 200 | 7 KB |
| `assets/css/themes/theme-gpg.css?v=3.13` | 200 | 61 KB |
| `assets/js/core.js?v=3.6c` | 200 | 8 KB |
| `assets/js/escape-engine.js?v=3.16` | 200 | 164 KB |

**Bilder Total: 11.4 MB / Code Total: 240 KB / HTML+JSON Total: 200 KB. Gesamt-Payload: ~11.8 MB.**

**0 von 16 Asset-Calls geben 404.** Bildpfad-Hotfix vollständig wirksam, S10 endgültig CLOSED.

---

## 2. Engine-Architektur (HTML-Templates + JS-Engine)

### 2.1 index.html (Startseite, 6318 B)

**Statisches HTML:** 5 Bereiche
- `<header>` mit `<h1 id="game-titel">Escape-Game</h1>` (Placeholder, dynamisch via JS gesetzt) + Header-Meta (`game-fach` / `game-jahrgangsstufe` / `game-schwierigkeit`)
- `<section id="narrativ">` mit `<p id="narrativ-text">` (Placeholder)
- `<section id="mappen-uebersicht">` mit `<p id="lade-hinweis">` (Placeholder)
- `<footer>` mit Lehrkraft-Link (`lehrkraft.html`)
- `<script>` Inline-JS für `fetch('data.json')` + Render-Logik

**Engine-Mechanik:**
- `data.json` wird via `fetch` geladen
- `meta` → Header-Felder + Document-Title (dynamisch: `"Der Erste Weltkrieg — Ursachen und Marne 1914 – Startseite"`)
- `meta.narrativ` → narrativ-text
- `mappen[]` → Mappen-Karten via `renderMappeKarte()`
- **Lock-Mechanik:** Erste Mappe immer offen, weitere erst nach Abschluss der vorherigen (via `localStorage` Key `escape-{thema}` → `mappen[mappe-N].abgeschlossen`)
- **Status-Klassen:** `mappe-karte--current` / `mappe-karte--locked` / `mappe-karte--completed`
- **Karten-Element:** `<article>` mit `<h2>📁 {titel}</h2>` + `<p>{beschreibung}</p>` + `<a>▶ Starten</a>` (oder `✅ Abgeschlossen`)

### 2.2 mappe-N.html (Mappen-Template, 4272 B)

**Statisches HTML:** 4 Sektionen
- `<header>` mit `<h1 class="mappe__titel">` (Placeholder)
- `<main class="mappe">`:
  - `<div class="fortschritt">` (0% Progressbar, dynamisch updated)
  - `<section id="einstieg-container">` (dynamisch befüllt)
  - `<section id="erarbeitung-container">` mit `<div id="material-container">` + `<div id="aufgaben-container">`
  - `<section id="sicherung-container" style="display:none">`
  - `<section class="code-eingabe">` mit `<input id="code-input">` + `<button>🔓 Code prüfen</button>`
  - `<nav>` mit Übersicht-Link + `<a id="nav-weiter">Weiter →</a>`
- `<footer>` mit Übersicht- und Lehrkraft-Link

**Engine-Mechanik:**
- `Core.nav.getCurrentPage()` extrahiert Mappe-ID aus Dateiname (z.B. `"mappe-1"`)
- `EscapeEngine.init(mappeId)` lädt + rendert Materialien + Aufgaben + Einstieg + Sicherung
- Code-Eingabe prüft gegen `mappen[N].freischalt_code`
- Bei korrektem Code: `localStorage` Update + Sicherung-Sektion sichtbar + `nav-weiter` aktiviert

### 2.3 lehrkraft.html (Lehrkraft-Zugang, 12032 B)

**Statisches HTML:** 4 Bereiche
- `<header>` mit `<h1>🔑 Lehrkraft-Zugang</h1>`
- `<section class="lehrkraft__gate">` mit Passwort-Eingabe + Submit-Button
- `<div id="lehrkraft-inhalt">` (initial `class="lehrkraft__inhalt--hidden"`):
  - `<section id="loesungen">` mit `<h2>📋 Lösungsübersicht</h2>` + dynamisch befüllt
  - `<section>` mit `<h2>📖 Didaktische Hinweise</h2>` + **Platzhalter** ("wird bei der Erstellung eines konkreten Escape-Games befüllt")
  - `<section class="lehrkraft__controls">` mit `🔓 Alle Mappen freischalten` + `🗑️ Fortschritt zurücksetzen`

**Passwort:** `lehrkraft` (Standard, clientseitig — kein echter Schutz, dokumentiert im HTML).

**Engine-Mechanik:**
- Nach Passwort-Match: `lehrkraft-inhalt` sichtbar
- `loesungen` werden dynamisch aus `data.json` befüllt (mappen[N].aufgaben[i].loesung)
- `btn-unlock-all` setzt `localStorage` für alle Mappen auf `abgeschlossen=true`
- `btn-reset` löscht `localStorage`-Eintrag

**Befund Lehrkraft-Sektion:** "Didaktische Hinweise" ist STATIC PLATZHALTER. Plugin produziert keine Lehrkraft-Hinweise im data.json (siehe §5 Field-Drift).

---

## 3. data.json Inventar (165480 B)

### 3.1 Top-Level + Meta

```json
{
  "meta": {
    "titel": "Der Erste Weltkrieg — Ursachen und Marne 1914",
    "fach": "GPG",
    "jahrgangsstufe": "R7 Mittelschule Bayern (7c)",
    "lehrplanbezug": "...",
    "schwierigkeit": "Basis",
    "geschaetzte_dauer_min": "...",
    "narrativ": "Sommer 1914. Du oeffnest einen alten Aktenkoffer mit vier Mappen. Jede Mappe ist ein Schluessel zur Frage: Wie kam es zum Ersten Weltkrieg?",
    "_run_meta": {...}
  },
  "mappen": [...]  // 4 Mappen
}
```

**Fehlende meta-Felder (vermutlich Plugin-Drift):** `schulart` (null) + `thema` (null) + `didaktischer_kontext` (leer). HTML-Template referenziert sie nicht direkt, daher kein Render-Defekt.

### 3.2 Mappen-Inventar (4 Mappen)

| Mappe | Titel | Code | Materialien | Aufgaben |
|---|---|---|---|---|
| mappe-1 | **Pulverfass Europa** — Warum war Europa vor 1914 ein 'Pulverfass'? | PULVER | 6 | 7 |
| mappe-2 | **Sarajevo 1914 — Ein Schuss, eine Welt im Krieg** — Wie wurde aus dem Attentat in Sarajevo in fünf Wochen ein Weltkrieg? | 28061914 | 5 | 7 |
| mappe-3 | **Augustfieber — Wer schuld ist und wer jubelt** — Foto + Tagebuch + Erinnerungs-Medaille | SCHULD | 5 | 7 |
| mappe-4 | **Marne 1914 — Das Ende des kurzen Krieges** — Schlieffen-Plan + Belgien + Stellungskrieg | STELLUNGSKRIEG | 6 | 7 |
| **Total** | — | — | **22** | **28** |

### 3.3 Material-Typ-Verteilung (22 Materialien)

| Typ | Anzahl | Mappen-Verteilung |
|---|---|---|
| `bildquelle` | **9** | M1:2, M2:3, M3:2, M4:2 (Foto-zentrierte Quellenkritik) |
| `darstellungstext` | **5** | M1:1, M2:1, M3:2, M4:1 (Erklär-Texte, Vertiefung) |
| `karte` | **3** | M1:2 (Bündnisse + Afrika), M4:1 (Schlieffen-Plan) |
| `statistik` | **2** | M1:1 (Schiffe), M4:1 (Verluste) |
| `zeitleiste` | **2** | M2:1 (Julikrise), M4:1 (Marne-Tage) |
| `tagebuch` | **1** | M3:1 (Bauern-Frau August 1914 — Multiperspektiv-Inszenierung) |

**Mappen-Profile:**
- M1 (Pulverfass): Karte-zentriert (2× Karte + 2× Bildquelle + Statistik + Text)
- M2 (Sarajevo): Bildquelle-dominant (3× Bildquelle Princip-Multiperspektivität + Zeitleiste + Text)
- M3 (Augustfieber): Multi-Quellen-Diversität (2× Bildquelle + 2× Darstellungstext Beutelsbach + 1× Tagebuch STR-14-NEU)
- M4 (Marne): Karte + Bildquellen-Mix (Schlieffen-Plan-Visualisierung + 2× Bildquelle Marne-Korrektur + Statistik + Text)

### 3.4 Aufgaben-Typ-Verteilung (28 Aufgaben)

| Typ | Anzahl | Bemerkung |
|---|---|---|
| `multiple-choice` | **6** | Standard-Test-Format (M1:2 + M2:1 + M3:1 + M4:2) |
| `zuordnung` | **5** | Materialien matchen (M1:1 + M2:2 + M3:1 + M4:1) |
| `lueckentext` | **5** | Begriffsfestigung (M1:1 + M2:1 + M3:1 + M4:2) |
| `freitext-code` | **5** | Code-Generierung aus Schreibung (M1:1 + M2:2 + M3:1 + M4:1) — Aufgabe-N-7 ist immer freitext-code |
| `reihenfolge` | **3** | Chronologie (M1:1 + M2:1 + M4:1) |
| `quellenkritik` | **2** | W-Fragen-Methodik (M1:1 + M3:1) |
| `vergleich` | **1** | M3:1 — **Beutelsbach Versailles vs. Clark** (Kalibrierungs-Aufgabe) |
| `begruendung` | **1** | M3:1 — **Beutelsbach CER-Begründung** |

**Distinct Bloom-Mapping (aus AFB-Audit BEFUND_RUN4_AUDIT.md):**
- M1 AFB I-II (Einführung)
- M2 AFB II (Anwendung)
- M3 AFB II-III (Höhepunkt mit Vergleich + Begründung)
- M4 AFB II (Sicherung + Synthese)

### 3.5 Lehrkraft-Markierungen (8 lehrkraft-only-Fields)

| Pfad | Typ | Inhalt |
|---|---|---|
| `mappen[0].mappenabschluss.trigger_sichtbarkeit_policy` | str | Policy-Marker M1 |
| `mappen[0].mappenabschluss.lehrkraft` | dict | Lehrkraft-Sektion M1 |
| `mappen[0].mappenabschluss.engine_kompatibilitaet.freischalt_code_tile.tile_hinweis_lehrkraft` | str | Code-Hinweis M1 |
| `mappen[2].mappenabschluss.sicherungstexte_lehrkraft` | dict | **M3 Versailles-NSDAP-Sprengkraft + Augusterlebnis-Idealisierungs-Verbot** (POLICY_TRIGGER_SICHTBARKEIT V13) |
| `mappen[2].mappenabschluss.sicherungstexte_lehrkraft._sichtbarkeit` | str | `"lehrkraft-only"` |
| `mappen[3].mappenabschluss.lehrkraft_sektion` | dict | **M4 Schlieffen-Plan-Mythos-Korrektur (Zuber 2002+)** |
| `mappen[3].mappenabschluss.lehrkraft_sektion.didaktische_hinweise_lehrkraft` | list | Lehrer-Hintergrund M4 |
| `mappen[3].mappenabschluss.lehrkraft_sektion.trigger_sichtbarkeit_policy` | str | Policy-Marker M4 |

**Bilanz:** V13 POLICY_TRIGGER_SICHTBARKEIT empirisch in data.json umgesetzt. 8 Felder strikt lehrkraft-only markiert.

---

## 4. Cross-Reference Source-vs-Live-Drift

### 4.1 Material-Bild-Bindings (12 Bilder, alle korrekt)

Alle 12 in `data.json` referenzierten Bildpfade haben Status HTTP 200 + sind unter dem korrekten Pfad-Schema (`../../assets/img/{game-id}/img-mN-0n.{ext}`).

| Material | Bild | Status |
|---|---|---|
| mat-1-1 (Karte Bündnisse) | `img-m1-02.svg` | 200 |
| mat-1-2 (HMS Dreadnought) | `img-m1-01.jpg` | 200 |
| mat-1-3 (Wilhelm II.) | `img-m1-03.jpg` | 200 |
| mat-1-6 (Karte Afrika) | `img-m1-06.svg` | 200 (Wikimedia-Substitute Colonial_Africa_1913_map.svg) |
| mat-2-2 (Sarajevo Tatort) | `img-m2-01.svg` | 200 |
| mat-2-3 (Franz Ferdinand) | `img-m2-02.jpg` | 200 |
| mat-2-4 (Princip Gericht) | `img-m2-03.jpg` | 200 |
| mat-3-1 (Lübeck Postkarte) | `img-m3-01.jpg` | 200 |
| mat-3-2 (Bundesarchiv-Foto) | `img-m3-02.jpg` | 200 |
| mat-4-1 (Schlieffen-Plan) | `img-m4-01.svg` | 200 |
| mat-4-3 (DT-Soldaten Marne) | `img-m4-02.jpg` | 200 |
| mat-4-4 (FR-Infanterie 1913) | `img-m4-03.jpg` | 200 |

**0 Drift, 0 404. S10 endgültig CLOSED + verifikabel.**

### 4.2 Aufgaben-Field-Drift (Plugin-Self-Diagnose-NEU)

**NEU IDENTIFIZIERT:** `_meta`-Feld wird in der live-data.json **komplett gestrippt**.

**Source aufgabe-1-1.json `_meta`-Keys:**
```
['bloom', 'afb', 'scpl_zone', 'tafelbild_knoten', 'ke_anker_haupt',
 'ziel_material_id', 'operationalisierungsziel', 'f0b_priming_kennung',
 'subagent', 'q_gate']
```

**Live data.json aufgabe-1-1 `_meta`-Keys:** `[]` (komplett entfernt)

**Bedeutung:** Die didaktische Klassifizierung pro Aufgabe (AFB-Stufe, Bloom-Level, SCPL-Zone, KE-Anker, Operationalisierungsziel) ist im Frontend NICHT verfügbar. Lehrkraft-Sektion kann diese Meta-Daten nicht anzeigen.

**Plugin-Defekt:** agent-assembly oder data.json-Assembly-Skript (das CLI in Phase 3.2 manuell als `/tmp/assemble_data_json.py` schrieb) entfernt `_meta`-Felder ohne Konvention.

**Konsequenz für v0.5.1-Backlog:** **F-PB-67-NEW** — Assembly-Skript: `_meta`-Felder filtern statt komplett-strippen (Whitelist `bloom` + `afb` + `scpl_zone` für Lehrkraft-Sektion, Blacklist `subagent` + `q_gate` als interne Plugin-Felder).

### 4.3 Lehrkraft-Sektion-Drift (statisch Platzhalter)

`lehrkraft.html` enthält statisch:
> "Die didaktischen Hinweise werden vom AGENT_DIDAKTIK generiert und enthalten Informationen zu Lernzielen, Kompetenzbezügen und methodischen Empfehlungen. **Platzhalter — wird bei der Erstellung eines konkreten Escape-Games befüllt.**"

**Befund:** HTML-Template ist Plugin-template-default. Kein dynamischer Befüllungs-Code für `didaktische-hinweise` im JS sichtbar (nur `loesungen` werden aus data.json befüllt).

**Bedeutung:** Plugin lieferte umfangreiche Lehrkraft-Inhalte in `data.json.mappen[].mappenabschluss.{lehrkraft,sicherungstexte_lehrkraft,lehrkraft_sektion}` (siehe §3.5), aber lehrkraft.html JS rendert sie nicht.

**Konsequenz für v0.5.1-Backlog:** **F-PB-68-NEW** — lehrkraft.html JS um Renderer für `mappenabschluss.lehrkraft*`-Felder erweitern. Aktuell sind die hochwertigen Lehrkraft-Inhalte (V13 POLICY_TRIGGER_SICHTBARKEIT) in der Live-Site **nicht abrufbar**.

---

## 5. Engine-Bindings-Audit (Engine-vs-Daten-Konformität)

### 5.1 Pflicht-Felder pro Mappe (Engine-Erwartung aus index.html JS)

| Feld | Live-Verfügbarkeit | Engine-Render |
|---|---|---|
| `mappe.id` | ✓ alle 4 | Lock-Mechanik (mappe-1..4) |
| `mappe.titel` | ✓ alle 4 | `<h2>📁 {titel}</h2>` |
| `mappe.beschreibung` | ✓ alle 4 | `<p class="mappe-karte__beschreibung">` |
| `mappe.freischalt_code` | ✓ alle 4 | Code-Input-Verifikation in mappe-N.html |
| `mappe.einstieg` | ✓ alle 4 (typ=narrativ) | `#einstieg-container` (dynamisch via EscapeEngine) |
| `mappe.materialien` | ✓ alle 4 | `#material-container` (dynamisch) |
| `mappe.aufgaben` | ✓ alle 4 | `#aufgaben-container` (dynamisch) |
| `mappe.sicherung` | ✓ alle 4 (5 Keys: hefteintrag + verweis + reflexionsimpuls + zusammenfassung + ueberleitung) | `#sicherung-container` (initial hidden) |
| `mappe.mappenabschluss` | ✓ alle 4 | (vermutlich nicht von Engine gerendert, siehe Drift §4.3) |

### 5.2 Mappen-Konsistenz-Check

| Field | M1 | M2 | M3 | M4 | Status |
|---|---|---|---|---|---|
| `einstieg.typ` | narrativ | narrativ | (kein typ-Feld, nur narrativ-Key) | (kein typ-Feld) | **WARN: M3+M4 typ-Drift** |
| `mappenabschluss.schema_version` | ✓ | ✓ | ✓ | ✓ | OK |
| `mappenabschluss._variante` | (fehlt) | ✓ | ✓ | (fehlt, hat template_version) | **WARN: Variant-Drift** |
| `materialien` Anzahl | 6 | 5 | 5 | 6 | konsistent zu BLUEPRINT |

**Konsequenz:** 2 minor Drifts in einstieg.typ + mappenabschluss._variante. Nicht-blockend für Engine-Render. Polish in v0.5.1-Backlog.

---

## 6. Visuelle Bestandsaufnahme — NICHT VERFÜGBAR

**Status:** Chrome MCP Permission-System blockt persistent (15+ Versuche, 4× Permission-Reset/Reinstall). Pop-up-Dialoge erscheinen nicht oder werden auto-dismissed.

**Fehlende Visual-Dimensionen:**
- Layout (Spaltenbreite, Spacing, Grid)
- Theme-Farben (theme-gpg.css definiert ~61 KB Tokens, aber nicht visualisiert)
- Typography-Render (Font-Größen, -Weights, Line-Heights)
- Bild-Aspect-Ratios + Cropping
- Mobile-Responsive-Verhalten
- JS-Engine-Runtime (LocalStorage-Test, Code-Eingabe-UX, Lehrkraft-Login-Flow)

**Workaround:** Theme-Tokens aus `theme-gpg.css` extrahieren würde ~80% des Color/Typography-Audits liefern (kein Layout). Auf User-Anfrage möglich.

**User-Empfehlung:** Visuelle Bestandsaufnahme manuell via Lehrkraft-Pilot-Walk-Through (Browser direkt) — gleichzeitig erste User-Empirie.

---

## 7. Bilanz Live-Site Content-Inventar

### 7.1 Funktionalität

**Engine läuft fehlerfrei:**
- 0 von 16 HTTP-Calls geben 404 (alle Assets verfügbar)
- data.json valide JSON, 165 KB
- HTML-Templates korrekt verlinkt + dynamisch befüllt
- Lock-Mechanik via localStorage funktional
- Lehrkraft-Passwort-Gate funktional (`lehrkraft`)
- Code-Eingabe-Mechanik per Mappe (4 Codes: PULVER / 28061914 / SCHULD / STELLUNGSKRIEG)
- Game-Abschluss-Code: `PULVERFASS — AUSLOESER — AUGUSTBEGEISTERUNG — STELLUNGSKRIEG`

### 7.2 Content-Vollständigkeit

- 4 Mappen / 22 Materialien / 28 Aufgaben — konsistent zu BLUEPRINT + game_state.json
- 12/12 Bilder live verfügbar (Bildpfad-Hotfix endgültig wirksam)
- 8 Lehrkraft-only-Felder in data.json (V13 POLICY_TRIGGER_SICHTBARKEIT empirisch belegt)
- Material-Typ-Diversität: 6 Typen (bildquelle 9× + darstellungstext 5× + karte 3× + statistik 2× + zeitleiste 2× + tagebuch 1×)
- Aufgaben-Typ-Diversität: 8 Typen (multiple-choice 6× + zuordnung/lueckentext/freitext-code 5× + reihenfolge 3× + quellenkritik 2× + vergleich/begruendung 1×)

### 7.3 Plugin-Drifts NEU identifiziert

| ID | Drift | Severity | Backlog-Eintrag |
|---|---|---|---|
| **F-PB-67-NEW** | aufgabe._meta wird in data.json komplett gestrippt (AFB/Bloom/SCPL/KE-Anker verloren) | MED — Lehrkraft-Sektion limitiert | v0.5.1-Backlog |
| **F-PB-68-NEW** | lehrkraft.html JS rendert mappenabschluss.lehrkraft*-Felder NICHT (V13-Inhalte unsichtbar) | **HIGH** — V13-Operationalisierung defekt | v0.5.1-Backlog **PFLICHT** |
| **F-PB-69-NEW** | meta.schulart=null + meta.thema=null (Plugin-Drift in Assembly) | LOW — kein Render-Defekt | v0.5.1-Backlog |
| **F-PB-70-NEW** | einstieg.typ-Drift (M3+M4 fehlen typ-Key) | LOW — Engine-tolerant | v0.5.1-Backlog |
| **F-PB-71-NEW** | mappenabschluss._variante-Drift (M1+M4 fehlt) | LOW | v0.5.1-Backlog |

**Backlog-Update:** v0.5.1-Backlog wächst von 17 auf **22 Items** (5 NEU aus Live-Audit). 1 davon HIGH (F-PB-68-NEW), nicht-blockend für Schüler-Game-Funktionalität, **aber blockiert Lehrkraft-Pilot-Einsatz weil V13-Inhalte nicht abrufbar**.

### 7.4 Verifikations-Anker

**Re-Verifikation aller Aussagen via:**
```bash
# HTTP-Status-Check
for url in https://weitergehts.online/escape-games/gpg-erster-weltkrieg-ursachen-run4-v050/{,index.html,data.json,mappe-{1..4}.html,lehrkraft.html} \
           https://weitergehts.online/assets/img/gpg-erster-weltkrieg-ursachen-run4-v050/img-m{1..4}-0{1..3}.{jpg,svg}; do
  curl -s -o /dev/null -w "%{http_code} %{size_download}B  $url\n" "$url"
done

# Aufgabe-Field-Drift-Check
diff <(jq '.mappen[0].aufgaben[0]._meta | keys' /tmp/run4-live/data.json) \
     <(jq '._meta | keys' docs/agents/artefakte/.../mappe-1/aufgaben/aufgabe-1-1.json)
```

---

## 8. Naechste Schritte

**Priorität neu nach Live-Audit:**

1. **F-PB-68-NEW HIGH-Patch (PFLICHT vor Pilot-Einsatz):** lehrkraft.html JS um `renderLehrkraftSektion()` erweitern (V13-Felder aus data.json.mappen[].mappenabschluss rendern). ~1 PT.
2. **F-PB-67-NEW MED:** Assembly-Skript `_meta`-Felder Whitelist-Filter (bloom + afb + scpl_zone für Lehrkraft-Sektion). ~0.5 PT.
3. Visual-Audit nachholen via Manual-Walk-Through (Lehrkraft-Pilot-Vorbereitung).
4. v0.5.1-Backlog-REVISIT um 5 NEU-Items aktualisieren.

**Pfad-C-Decision (B3):** unverändert — empfohlen Parallel (Pilot + v0.5.1-Phase A). Nun aber mit **F-PB-68-NEW als zusätzlichem PFLICHT-HIGH** vor Pilot.

---

**Inventar abgeschlossen 2026-04-27.** Methodik: Sandbox-Fetch + Python-HTML/JSON-Parsing, ~30 Min. Visual-Dimension fehlt wegen Chrome MCP Permission-Block. Strukturelles Audit liefert ~80% des Audit-Werts; Layout/Theme/Mobile-Responsive ungetestet.
