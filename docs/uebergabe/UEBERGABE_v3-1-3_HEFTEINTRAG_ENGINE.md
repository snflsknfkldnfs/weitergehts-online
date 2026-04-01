# Uebergabe-Prompt: v3.1-3 Hefteintrag-Engine (CSS-Hefteintrag statt SVG-Tafelbild)

**Datum:** 2026-03-28
**Phase:** v3.1-3 Engine-Integration
**Vorgaenger:** v3-4 Engine-Erweiterung (Commit a3ea44b), v3-4-FIX data.json Revert
**Designentscheidungen:** `docs/architektur/DESIGNENTSCHEIDUNG_v3-1_HEFTEINTRAG.md`
**SCPL-Evaluation:** `docs/architektur/EVALUATION_SCPL_HEFTEINTRAG.md`
**Prototyp (Referenz):** `docs/analyse/PROTOTYP_HEFTEINTRAG_v3-1_rev3.html`

---

## Kontext

Die Sicherungsansicht rendert bisher ein SVG-Netzwerk (Knoten + Verbindungen) ueber `_renderTafelbild()` (Z.1034). Das Ergebnis ist qualitativ unbrauchbar (ueberlappende Labels, kein erkennbares Ordnungsmuster, nicht druckbar).

Neues Konzept: Ein CSS-basierter Hefteintrag (linierter Hintergrund, Handschrift-Font, SCPL-Struktur). Die Engine erkennt anhand eines neuen `scpl`-Objekts in `sicherung.tafelbild`, welchen Renderer sie verwenden soll:

```
if (sicherung.tafelbild.scpl) → _renderHefteintragSCPL()   // NEU
else if (sicherung.tafelbild.knoten && sicherung.tafelbild.knoten.length > 0) → _renderTafelbild()  // LEGACY (SVG)
else → kein Tafelbild
```

---

## Pre-Flight

Vor der Arbeit sicherstellen:

- [ ] `git status` — Working Tree sauber (keine uncommitted changes)
- [ ] `git pull` — Lokaler Branch ist aktuell mit origin/main
- [ ] Aktuelle Version dieser Dateien lesen (NICHT aus diesem Prompt uebernehmen):
  - `assets/js/escape-engine.js` — insb. `_renderSicherung()` (Z.910-1019) und `_renderTafelbild()` (Z.1034ff)
  - `assets/css/themes/theme-gpg.css` — insb. Sicherungs-Styles
  - `escape-games/gpg-erster-weltkrieg-ursachen/data.json` — aktueller Stand
- [ ] Referenz-Prototyp lesen: `docs/analyse/PROTOTYP_HEFTEINTRAG_v3-1_rev3.html` — das ist das Ziel-Rendering

Falls Pre-Flight fehlschlaegt: STOPP. Nicht mit Stash/Force-Operationen improvisieren. Problem melden.

---

## Aufgabe

3 Aenderungspakete implementieren:

### Paket 1: escape-engine.js — Neuer SCPL-Renderer

#### 1a. Routing in `_renderSicherung()`

In `_renderSicherung()` (Z.920-930) die bestehende Tafelbild-Rendering-Logik durch Routing ersetzen:

```
Wenn sicherung.tafelbild existiert:
  Wenn sicherung.tafelbild.scpl existiert:
    → _renderHefteintragSCPL(sicherung, container) aufrufen   // NEU
  Sonst wenn sicherung.tafelbild.knoten existiert UND knoten.length > 0:
    → bestehenden _renderTafelbild() Code aufrufen              // LEGACY
  Sonst:
    → nichts rendern
```

Die v3-Bloecke (Merksaetze Z.932-953, Kernerkenntnisse Z.956-974, Hefteintrag-Verweis Z.976-987, Reflexionsimpuls Z.1007-1018) entfallen bei SCPL-Routing, da `_renderHefteintragSCPL()` diese Inhalte selbst rendert. Sie bleiben aktiv im Legacy-Pfad.

#### 1b. Neue Funktion `_renderHefteintragSCPL(sicherung, container)`

Erstelle eine neue Funktion nach `_renderSicherung()` und vor `_renderTafelbild()`. Die Funktion baut den Hefteintrag aus dem `scpl`-Objekt in `sicherung.tafelbild` auf.

**Struktur des DOM-Outputs:**

```html
<div class="hefteintrag">
  <!-- Datum oben rechts, dynamisch -->
  <div class="hefteintrag__datum">[TT.MM.JJJJ — aktuelles Datum per JS]</div>

  <!-- Stundenfrage als Titel -->
  <div class="hefteintrag__stundenfrage">[sicherung.tafelbild.stundenfrage]</div>

  <!-- SITUATION: Kontextsatz + Fachbegriffe inline -->
  <div class="hefteintrag__inhalt">[scpl.situation.kontextsatz — Fachbegriffe aus scpl.situation.fachbegriffe als <span class="hefteintrag__fachbegriff"> hervorheben]</div>

  <!-- Fuer jeden Complication-Schritt: -->
  <!-- Pfeil (nur SVG-Symbol, kein Text) -->
  <div class="hefteintrag__pfeil"><svg ...>↓</svg></div>

  <!-- Schritt-Text mit Fachbegriff -->
  <div class="hefteintrag__inhalt">[complication[i].schritt — complication[i].fachbegriff als <span class="hefteintrag__fachbegriff">]</div>

  <!-- Wenn complication[i].darstellung vorhanden: -->
  <!--   typ "gegenueberstellung" → zweispaltige Tabelle -->
  <div class="hefteintrag__gegenueber">
    <div class="hefteintrag__gegenueber-col">
      <h4>[darstellung.links.titel]</h4>
      <ul><li>...</li></ul>
    </div>
    <div class="hefteintrag__gegenueber-vs">vs.</div>
    <div class="hefteintrag__gegenueber-col">
      <h4>[darstellung.rechts.titel]</h4>
      <ul><li>...</li></ul>
    </div>
  </div>

  <!-- PROBLEM: Satz mit Fachbegriff -->
  <div class="hefteintrag__pfeil"><svg ...>↓</svg></div>
  <div class="hefteintrag__inhalt">[scpl.problem.satz — scpl.problem.fachbegriff als <span>]</div>

  <!-- Leerzeile -->
  <div class="hefteintrag__spacer"></div>

  <!-- MERKBOX (gelb) -->
  <div class="hefteintrag__merkbox">
    [scpl.loesung[] — jeder Eintrag als eigener Textblock]
  </div>
</div>

<!-- TRANSFER: ausserhalb der Hefteintrag-Box -->
<div class="hefteintrag__transfer">[sicherung.tafelbild.transfer.frage — wenn vorhanden]</div>
```

**Fachbegriff-Hervorhebung:** Die Fachbegriffe aus `scpl.situation.fachbegriffe[]` und jedem `complication[i].fachbegriff` und `problem.fachbegriff` muessen im jeweiligen Textsatz gefunden und als `<span class="hefteintrag__fachbegriff">` gerendert werden. Einfachste Implementierung: String-Replace des Fachbegriffs im Satz durch `<span>`-Wrapping, dann `innerHTML` statt `textContent`.

**Darstellungstypen:** Fuer v3.1 nur `gegenueberstellung` implementieren. Andere Typen (`zeitleiste`, `tabelle`) koennen spaeter ergaenzt werden. Wenn `darstellung.typ` nicht `gegenueberstellung` ist: den `schritt`-Text normal rendern und `darstellung` ignorieren.

**Pfeil-SVG:**

```html
<svg viewBox="0 0 14 18" width="14" height="18">
  <path d="M7 1v14M2 11l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

#### 1c. `_renderTafelbild()` bleibt unveraendert

Die bestehende SVG-Renderer-Funktion `_renderTafelbild()` (Z.1034ff) nicht aendern. Sie dient als Legacy-Fallback.

---

### Paket 2: theme-gpg.css — Hefteintrag-Styles

Fuege einen neuen CSS-Abschnitt nach den bestehenden Sicherungs-Styles ein. **Die genauen CSS-Werte findest du im Prototyp** (`docs/analyse/PROTOTYP_HEFTEINTRAG_v3-1_rev3.html`). Die folgenden CSS-Klassen muessen definiert werden:

**Hefteintrag-Box:**
- `.hefteintrag` — Linierter Hintergrund (32px Raster), roter Heftrand links (::before), Lochung (::after), Papier-Hintergrundfarbe
- `.hefteintrag__datum` — Oben rechts, absolut positioniert, klein, grau
- `.hefteintrag__stundenfrage` — Caveat-Font, gross, unterstrichen (blau), erste Zeile frei (padding-top)
- `.hefteintrag__inhalt` — Patrick-Hand-Font, 1.1rem, auf 32px line-height
- `.hefteintrag__fachbegriff` — Caveat-Font, fett, farbig (rot fuer Situation-Begriffe, blau fuer Complication, gruen fuer Problem)
- `.hefteintrag__pfeil` — Flexbox, grau, 32px Hoehe, Symbol zentriert
- `.hefteintrag__spacer` — 32px Hoehe (eine Leerzeile)

**Gegenueberstellung:**
- `.hefteintrag__gegenueber` — CSS-Grid 3 Spalten (1fr auto 1fr)
- `.hefteintrag__gegenueber-col` — Patrick-Hand-Font
- `.hefteintrag__gegenueber-col h4` — Caveat-Font, unterstrichen, farbig (links rot, rechts blau)
- `.hefteintrag__gegenueber-vs` — Caveat-Font, gross, grau

**Merkbox:**
- `.hefteintrag__merkbox` — Gelber Hintergrund (#fffde7), gelber Rand (#f0c929), 2px solid, 6px Radius
- `.hefteintrag__merkbox`-Text — Caveat-Font, 1.2rem, fett, dunkle Farbe

**Transfer:**
- `.hefteintrag__transfer` — Patrick-Hand-Font, grau, kursiv, ausserhalb der Box

**Google Fonts:** Die Fonts `Caveat` und `Patrick Hand` muessen geladen werden. Fuege im `<head>` der relevanten HTML-Dateien (oder im CSS via `@import`) folgende Zeile ein:

```css
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Patrick+Hand&display=swap');
```

**Print-Styles:**
- `.hefteintrag` — `box-shadow: none`, `border: 1px solid #ccc`, `page-break-inside: avoid`
- `.hefteintrag__transfer` — `display: none` (Transferfrage nicht drucken)

---

### Paket 3: data.json (Mappe 1) — SCPL-Migration

Die bestehende `sicherung.tafelbild`-Struktur in `escape-games/gpg-erster-weltkrieg-ursachen/data.json` um das `scpl`-Objekt erweitern. Die bestehenden Felder (`knoten[]`, `verbindungen[]`, `kernerkenntnisse[]`) bleiben erhalten.

**Neue/geaenderte Felder in `sicherung.tafelbild`:**

```
stundenfrage: "Warum wurde Europa vor 1914 zum Pulverfass?"
ordnungsmuster: "kausal"

scpl: {
  situation: {
    kontextsatz: "Um 1900 wollen alle europaeischen Grossmaechte Kolonien und Einfluss. Zwei Triebkraefte: der Wettlauf um Kolonien — Imperialismus — und uebersteigerte nationale Ueberzeugungen: Nationalismus."
    fachbegriffe: ["Imperialismus", "Nationalismus"]
  }
  complication: [
    {
      schritt: "Die Staaten ruesten massiv auf, besonders zur See: Deutschland gegen Grossbritannien — Wettruestung."
      fachbegriff: "Wettruestung"
      darstellung: null
    },
    {
      schritt: "Europa spaltet sich in zwei feindliche Lager — das Buendnissystem:"
      fachbegriff: "Buendnissystem"
      darstellung: {
        typ: "gegenueberstellung"
        links: { titel: "Dreibund (1882)", punkte: ["Deutschland", "Oesterreich-Ungarn", "Italien"] }
        rechts: { titel: "Triple Entente", punkte: ["Frankreich", "Grossbritannien", "Russland"] }
      }
    }
  ]
  problem: {
    satz: "Die Buendnispflicht zieht bei jedem lokalen Konflikt automatisch alle Grossmaechte in den Krieg: Kettenreaktion."
    fachbegriff: "Kettenreaktion"
  }
  loesung: [
    "Europa war vor 1914 ein Pulverfass: Imperialismus, Nationalismus und Wettruestung spalteten den Kontinent in zwei feindliche Lager. Die Buendnispflichten machten aus jedem lokalen Konflikt eine europaweite Kettenreaktion."
  ]
}

transfer: {
  frage: "Doch wo war der Funke?"
}
```

**WICHTIG:** Lies die aktuelle data.json selbst ein. Fuege die obigen Felder als neue Properties in das bestehende `sicherung.tafelbild`-Objekt ein. Aendere NICHTS an `materialien[]`, `aufgaben[]`, `einstieg`, Bildpfaden oder `freischalt_code`.

---

## Dateien

| Datei | Aenderungsart | Beschreibung |
|-------|--------------|-------------|
| `assets/js/escape-engine.js` | ERWEITERN | Routing in `_renderSicherung()`, neue Funktion `_renderHefteintragSCPL()` |
| `assets/css/themes/theme-gpg.css` | ERWEITERN | Neuer Abschnitt: Hefteintrag-Styles (Screen + Print) |
| `escape-games/gpg-erster-weltkrieg-ursachen/data.json` | ERWEITERN | `scpl`-Objekt + `stundenfrage` + `transfer` in `sicherung.tafelbild` |
| Relevante HTML-Dateien | ERWEITERN | Google Fonts Import (`Caveat`, `Patrick Hand`) im `<head>` |

---

## Merge-Schutz

Wenn bei `git pull` oder `git push` Konflikte auftreten:
1. NICHT automatisch aufloesen (kein `--theirs`, kein `--ours`)
2. Konflikt-Dateien auflisten und dem User melden
3. Warten auf User-Entscheidung

Grund: Automatische Merge-Resolution hat am 2026-03-28 bereits zu einer data.json-Regression gefuehrt (9 Materialien → 7 Materialien, lokale Bilder → externe URLs).

---

## Erfolgskriterium

1. Website aufrufen, Mappe 1 bis zur Sicherung durchspielen
2. Statt SVG-Netzwerk erscheint ein CSS-Hefteintrag mit:
   - Stundenfrage als Titel ("Warum wurde Europa vor 1914 zum Pulverfass?")
   - Linierter Hintergrund, Caveat-Handschrift, roter Heftrand
   - Vertikaler Argumentationsfluss mit Pfeilen
   - Gegenueberstellung Dreibund vs. Triple Entente
   - Gelbe Merkbox am Ende
   - Transferfrage ausserhalb der Box
   - Dynamisches Datum oben rechts
3. Druck-Vorschau (Ctrl+P): Hefteintrag druckbar, keine Artefakte, Transferfrage nicht sichtbar
4. Bestehende Materialien, Bilder, Aufgaben, Freischaltcode "PULVER" funktionieren weiterhin

---

## Verifikation

- [ ] Sicherungs-Abschnitt zeigt CSS-Hefteintrag (nicht SVG)
- [ ] Stundenfrage unterstrichen als Titel sichtbar
- [ ] Fachbegriffe farbig hervorgehoben (Imperialismus, Nationalismus rot; Wettruestung, Buendnissystem blau; Kettenreaktion gruen)
- [ ] Gegenueberstellung zeigt Dreibund vs. Triple Entente in 2 Spalten
- [ ] Merkbox hat gelben Hintergrund und gelben Rand, keinen Label-Text
- [ ] Transferfrage erscheint ausserhalb des linierten Kastens
- [ ] Datum oben rechts zeigt aktuelles Datum
- [ ] Print-Vorschau: Hefteintrag sauber, Transferfrage versteckt
- [ ] `freischalt_code` "PULVER" funktioniert weiterhin
- [ ] Alle 9 Materialien laden (insb. lokale Bilder unter assets/img/)
- [ ] Keine `console.error` in DevTools
- [ ] Keine JSON-Parse-Fehler

---

## Nach Abschluss

Melde den Abschluss in Cowork mit: "Update: v3.1-3 Hefteintrag-Engine implementiert. Ergebnis: [was funktioniert/nicht funktioniert]"
