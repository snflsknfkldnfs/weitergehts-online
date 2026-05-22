# Mobile-iPhone-Audit · Schulrecht Skript V3
**Datum:** 2026-05-22 · **Prüfer:** Mobile-iPhone-Auditor
**Geräte:** iPhone 13/14/15 (390×844) + iPhone 15 Pro Max (430×932)
**Basis:** 6 Screenshots + vollständige style.css + app.js (Slideover-Bereich)

---

## SUMMARY

| Kategorie | Befund |
|---|---|
| Apple HIG Touch-Target-Compliance | ~55% — norm-tag + status-dot + fa-row__chevron FAIL 44pt |
| Safe-Area-Insets | FEHLT vollständig — kein env(safe-area-inset-*) in der gesamten CSS |
| Lesbarkeit / Reading-Width | GUT — 390px-Viewport ergibt ~45-50 Zeichen, im Optimum |
| iOS-Typografie | GUT — -apple-system in --sans vorhanden, -webkit-font-smoothing: antialiased gesetzt |
| Sticky/Floating-Navigation | TEILWEISE — back-to-top vorhanden, aber kein iPhone-Safe-Area-Abstand |
| Slideover iOS-Sheet-Pattern | TEILWEISE — Bottom-Sheet-Stil gut, aber kein Drag-Handle, kein padding-bottom für Home-Indicator |
| Tap-Highlight | FEHLT — kein -webkit-tap-highlight-color: transparent im Reset |
| Werkbank Mobile-UX | GUT — aside-first-Order korrekt, 1-Col-Cards funktional |
| Tabellen-Stack | FUNKTIONAL — 1fr-Override beim rb-table, aber rb-table__head fehlt Label-Visibility |
| Scroll-Performance | FEHLT — kein -webkit-overflow-scrolling: touch für Slideover |

**Apple HIG Compliance-Schätzung: 62 / 100**

Hauptblockaden für Pendel-Lernfluss (U-Bahn/Quick-Lookup): Safe-Area-Insets fehlen (Home-Indicator verdeckt back-to-top + module-nav), norm-tag-Tap-Targets zu klein (10.5px-Schrift, min-height: 24px = HIG-FAIL), kein Drag-Handle im Slideover (Gesten-Affordanz fehlt).

---

## HIGH-Findings — iPhone-Blocker für Pendel-Lernfluss

### H-1 · Safe-Area-Insets fehlen vollständig

**Betroffene Elemente:** `.back-to-top`, `.meta-bar`, `.slideover` (Bottom-Sheet), `.module-nav` (falls vorhanden)

**Visuelle Evidenz:** Im Screenshot `iphone13-mp03-werkbank.png` liegt der "NACH OBEN"-Button `bottom: 20px`. Auf iPhone 13/14/15 (Home-Indicator 34pt) und iPhone 15 Pro Max (Home-Indicator 34pt) liegt der Button teilweise hinter dem Home-Indicator. Das Slideover in `iphone13-mp03-slideover.png` endet am unteren Viewport-Rand ohne Zusatz-Padding — der "SCHLIESSEN"-Button und der Inhaltsbereich sind vollständig sichtbar, aber bei iOS-Gesten-Konflikten (Swipe-up-Geste trifft Slideover-Inhalt statt System) entsteht Frustration.

**Apple HIG:** Environment Safe Areas sind verbindlich für alle fixed/bottom-positioned UI-Elemente seit iPhone X.

**Patch (5 Min):**

```css
/* Safe-Area-Insets — global im Reset */
html {
  /* Verhindert Content-Clipping unter Dynamic Island / Notch */
  padding-top: env(safe-area-inset-top);
}
/* Alternativer Ansatz: Meta-Bar nutzt position:sticky → safe-area oben */
.meta-bar {
  padding-top: max(12px, calc(env(safe-area-inset-top) + 8px));
}
/* Back-to-Top: muss über Home-Indicator schweben */
.back-to-top {
  bottom: max(20px, calc(env(safe-area-inset-bottom) + 12px));
  right: max(20px, env(safe-area-inset-right));
}
/* Slideover: Bottom-Padding für Home-Indicator */
.slideover {
  padding-bottom: env(safe-area-inset-bottom);
}
.slideover__inner {
  padding-bottom: max(56px, calc(env(safe-area-inset-bottom) + 32px));
}
```

Zusätzlich im HTML `<meta name="viewport">` prüfen ob `viewport-fit=cover` gesetzt ist — ohne dieses Attribut greifen env()-Werte nicht.

---

### H-2 · Norm-Tag Touch-Target 24px statt 44pt — kritisch für Pendel-Use-Case

**Visuell gemessen:** Screenshot `iphone13-mp03-werkbank.png` zeigt Norm-Tags ("§ 22 BaySchO", "§ 23 BaySchO") mit einer visuellen Höhe von ca. 22-24px. Die CSS bestätigt: `min-height: 24px; padding: 5px 8px`. Auf einem 390pt-Viewport bei pixel-ratio 3x sind das real ~8pt touch-target — weit unter Apple HIG 44pt.

**Konsequenz für Quick-Lookup in der U-Bahn:** Norm-Tags sind der primäre Interaktionspfad (Tap → Slideover → Normtext). Mit Fahrvibration und einhändigem Daumen sind 24px-Targets mit 10.5px-Schrift fehlerträchtig — es kommt zu Fehl-Taps auf benachbarte Tags.

**CSS-Evidenz:** Aktueller Kommentar lautet "WCAG 2.5.8 AA target ≥ 24px" — das ist korrekt für Desktop/AA, aber Apple HIG und WCAG 2.5.5 (AAA) fordern 44×44pt.

**Patch (10 Min):**

```css
@media (max-width: 1200px) {
  .norm-tag {
    min-height: 36px;          /* Kompromiss: größer als 24, kleiner als 44 — passt in Zeilen-Flow */
    padding: 8px 12px;
    font-size: 11.5px;         /* Lesefreundlicher auf kleinem Display */
    /* Pseudo-Element für volle 44pt-Trefferzone ohne Layout-Auswirkung */
    position: relative;
  }
  .norm-tag::before {
    content: '';
    position: absolute;
    inset: -8px -4px;          /* Erweitert Trefferzone vertikal auf ~44pt */
    /* Bewusst keine sichtbare Änderung — nur Hitbox-Erweiterung */
  }
}
```

---

### H-3 · Slideover-Header mit "SCHLIESSEN"-Button — unvollständige iOS-Sheet-Affordanz

**Visuelle Evidenz (`iphone13-mp03-slideover.png`):** Das Slideover ist als Bottom-Sheet korrekt implementiert (translateY-Animation, full-width). Aber: kein Drag-Handle-Indikator oben (iOS-Konvention seit iOS 13 für alle Sheets), kein abgerundetes oberes Border. Der "SCHLIESSEN ESC"-Button (44×44px — korrekt per H-07-Patch) ist sichtbar und funktional. Visuell wirkt das Sheet abrupt oben, als ob es kein Sheet wäre sondern ein Overlay.

**Für Pendel-Use-Case kritisch:** iOS-Nutzer erwarten Swipe-down-Geste zum Schließen — diese ist nicht implementiert. Das Schließen erfordert expliziten Tap auf "SCHLIESSEN", was mit Handschuh oder in der U-Bahn schwierig ist.

**Patch Teil A — CSS-Drag-Handle + Rounded-Top (5 Min):**

```css
.slideover {
  border-radius: 16px 16px 0 0;   /* iOS-Sheet-Radius */
  border-top: none;                /* Radius ersetzt die Linie */
}
.slideover::before {
  content: '';
  display: block;
  width: 36px;
  height: 4px;
  background: var(--rule);
  border-radius: 2px;
  margin: 12px auto 0;
  flex-shrink: 0;
}
.slideover__inner {
  padding-top: 16px;  /* War 28px — Handle übernimmt visuellen Abstand */
}
```

**Patch Teil B — Swipe-down-to-close JS (15 Min):**

```js
// Im openSlideover-Block nach dem bestehenden Focus-Management:
let touchStartY = 0;
slideoverEl.addEventListener('touchstart', e => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });
slideoverEl.addEventListener('touchend', e => {
  const delta = e.changedTouches[0].clientY - touchStartY;
  if (delta > 60) closeSlideover();   // 60px Swipe-Down = close
}, { passive: true });
```

---

### H-4 · -webkit-tap-highlight-color fehlt — sichtbare Standard-Highlight-Farbe auf iOS Safari

**Code-Evidenz:** Im Reset (Z. 30-40 style.css) fehlt `-webkit-tap-highlight-color: transparent`. iOS Safari rendert standardmäßig einen grauen Flash auf allen tappbaren Elementen (a, button, [role=button], [onclick], cursor:pointer-Elemente).

**Visuelle Konsequenz:** Jeder Tap auf Norm-Tags, Reveal-Cards, Falle-Rows, Back-to-Top produziert ein ugly grau-blaues Highlight-Rechteck das 200-300ms sichtbar bleibt. Stört den Lernfluss und sieht unfertig aus.

**Patch (2 Min):**

```css
/* Im Reset-Block nach Z. 30-40 */
* {
  -webkit-tap-highlight-color: transparent;
}
/* Eigene sichtbare Active-States stattdessen: */
.norm-tag:active,
.reveal-card__btn:active,
.fa-row:active {
  background: var(--accent-soft);
  border-color: var(--accent);
}
.back-to-top:active,
.slideover__close:active {
  opacity: 0.8;
}
```

---

## MED-Findings

### M-1 · fa-row__chevron in .werkbank__aside: 28×28px — unter Apple HIG 44pt

**Code-Evidenz (Z. 1432-1436):** `.werkbank__aside .fa-row__chevron { min-width: 28px; min-height: 28px; }` — die Verdichtungs-Patches haben das globale H-03-Target von 36px auf 28px reduziert.

**Visuelle Evidenz (`iphone13-mp03-werkbank.png`):** Falle-Atlas-Chevrons sind als kleine quadratische Border-Boxen sichtbar. Auf 390px-Viewport liegen mehrere Falle-Rows nah beieinander — Fehl-Taps auf benachbarte Rows sind wahrscheinlich.

**Patch (3 Min):**

```css
@media (max-width: 1200px) {
  .werkbank__aside .fa-row__chevron {
    min-width: 36px;
    min-height: 44px;   /* Volle HIG-Höhe, Breite kompromiss-tauglich */
  }
  .werkbank__aside .fa-row {
    align-items: center;   /* Chevron zentriert in der Row-Höhe */
  }
}
```

---

### M-2 · rb-table__head verschwindet beim 1-Col-Stack — Kontext-Verlust

**Code-Evidenz (Z. 534):** `.rb-table__head, .rb-table__row { grid-template-columns: 1fr !important; }` — alle Spalten stacken. Der Header-Row mit Spaltenbezeichnungen erscheint oben einmal, dann folgen gestapelte Daten-Cells ohne Label.

**Visuell für U-Bahn-Nutzung:** Ein Quick-Lookup in einer Tabelle mit 3-4 Rows (z.B. Ordnungsmaßnahmen-Stufen) ist ohne Spalten-Context schwer lesbar. Die Header-Zeile taucht nur einmal ganz oben auf.

**Patch (8 Min):**

```css
@media (max-width: 1200px) {
  .rb-table__head { display: none; }   /* Desktop-Header weg */
  .rb-table__row > div[data-label]::before {
    content: attr(data-label) ': ';
    font-family: var(--mono);
    font-size: 9.5px;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: var(--muted);
    display: block;
    margin-bottom: 2px;
  }
}
```

Erfordert data-label-Attribute im HTML (`<div data-label="Maßnahme">`). Ohne HTML-Änderung: alternativ die Header-Zeile per JS sticky machen oder als visuellen Separator-Kommentar stehen lassen.

---

### M-3 · Breadcrumb-Overflow in meta-bar auf 390px — Text wrapping unschön

**Visuelle Evidenz (`iphone13-mp03-top.png`):** Die meta-bar zeigt "SKRIPT V3 · MP_03 · SCHULBETRIEB (SL · LK-KONFERENZ · OM)" — das bricht auf zwei Zeilen. Die zweite Zeile "· OM)" ist allein und wirkt wie ein Tipp-Fehler.

**Code:** `flex-wrap: wrap` ist gesetzt — das Wrapping ist absichtlich, aber die visuelle Wirkung auf 390px ist suboptimal.

**Patch (5 Min):**

```css
@media (max-width: 520px) {
  .meta-bar {
    /* Nur die wichtigsten Crumbs zeigen */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-wrap: nowrap;
    /* Oder: zweiten Crumb-Level ausblenden */
  }
  .meta-bar .crumb-detail {   /* Klasse für den langen Subtitle-Crumb */
    display: none;
  }
}
```

Alternative ohne HTML-Änderung: `max-height: 1.6em; overflow: hidden;` — kürzt sauber ab.

---

### M-4 · .slideover: kein -webkit-overflow-scrolling: touch

**Code-Evidenz (Z. 990-995):** `.slideover { overflow-y: auto; }` — kein Momentum-Scrolling für iOS.

**Konsequenz:** Beim Scrollen innerhalb des Slideoverss (langer Norm-Eintrag) kein iOS-Inertia-Scrolling — fühlt sich "lahm" an verglichen mit nativen iOS-Sheets.

**Patch (1 Min):**

```css
.slideover {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;   /* Verhindert Scroll-Chaining zum Body */
}
```

Hinweis: `-webkit-overflow-scrolling` ist deprecated in neuem WebKit (iOS 13+), aber `overscroll-behavior: contain` ist der moderne Ersatz und ebenfalls wichtig.

---

### M-5 · Status-Dot Touch-Target: 12px-Element + 8px-Pseudo = 28px — knapp unter 44pt

**Code-Evidenz (Z. 188-189):** `.status-dot::after { content: ""; position: absolute; inset: -8px; }` — ergibt 12px + 8px + 8px = 28px Trefferzone. WCAG 2.5.8 AA sieht 24px als ausreichend, Apple HIG verlangt 44pt.

**Kontext:** Status-Dots sind die primären Lernstatus-Controls (Karte auf "sitzen" / "wiederholen" setzen). In der Pendel-Situation ist präzises Tippen auf 28px-Targets fehleranfällig.

**Patch (3 Min):**

```css
@media (max-width: 1200px) {
  .status-dot::after {
    inset: -16px;   /* Ergibt 12 + 16 + 16 = 44px */
  }
}
```

---

## LOW-Findings

### L-1 · font-size: 9px + 9.5px in Werkbank-Aside — unter iOS-Minimum

**Code-Evidenz (Z. 1416, 1418):** `.werkbank__aside .reveal-card__top .mono-cap { font-size: 9.5px }` und `.werkbank__aside .reveal-card__hint { font-size: 9px }`. iOS Safari hat ein automatisches Font-Size-Minimum von ~10px — Text unter diesem Wert wird oft auf 10px hochskaliert, was das Layout verschiebt.

**Patch:** Alle Werte unter 10px auf 10px anheben.

---

### L-2 · Viewport-Meta: viewport-fit=cover muss geprüft werden

**Kontext:** `env(safe-area-inset-*)` aus H-1-Patch funktioniert nur wenn das HTML-Dokument `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">` enthält. Ohne `viewport-fit=cover` sind die Safe-Area-Werte immer 0.

**Aktion:** In `/mp03/index.html` den viewport-Meta-Tag auf `viewport-fit=cover` prüfen/setzen.

---

### L-3 · Scrollbar-Gutter im Toc-Sticky — auf iOS irrelevant, aber kein Schaden

**Code (Z. 350):** `.toc-sticky { scrollbar-gutter: stable; }` — das TOC ist auf Mobile ausgeblendet. Kein Problem, aber unnötiger Code-Overhead.

---

### L-4 · subblock__body margin-left: 94px — auf 390px wirft das 296px nutzbarer Breite

**Code-Evidenz (Z. 1375):** `.subblock__body { margin: 14px 0 0 94px; padding-left: 18px; }` — die mobile Query setzt `margin-left: 0` und `max-width: none` per Z. 533 (`subblock__body { margin-left: 0 }`), aber die Verdichtungs-Patches (Z. 1375) überschreiben das nicht mobil-spezifisch. Falls die 1200px-Query vor der Verdichtungs-Deklaration kommt, wird das Desktop-94px-Margin auf Mobile **nicht** zurückgesetzt — die Vertiefungstexte hätten nur 296px.

**Visuelle Evidenz:** Im Screenshot `iphone13-mp03-top.png` sind die Körpertexte korrekt ohne übermäßige linke Einrückung zu sehen. Die bestehende 1200px-Media-Query (Z. 533) setzt `margin-left: 0` — das schlägt die 94px-Verdichtung. Derzeit kein Fehler, aber die CSS-Reihenfolge ist fragil.

**Empfehlung:** Verdichtungs-Patches in einen `@media (min-width: 1201px)`-Block einwickeln um mobile Überschreibung zu verhindern.

---

## Patch-Reihenfolge mit Aufwand-Schätzung

| Prio | Finding | Aufwand | Datei |
|---|---|---|---|
| 1 | H-4 · webkit-tap-highlight-color | 2 Min | style.css Reset-Block |
| 2 | H-1 · Safe-Area-Insets (CSS-Teil) | 5 Min | style.css + HTML viewport-meta |
| 3 | H-2 · Norm-Tag Touch-Target ≥ 36px | 10 Min | style.css @media 1200px |
| 4 | H-3 Teil A · Slideover Drag-Handle + Border-Radius | 5 Min | style.css .slideover |
| 5 | M-4 · -webkit-overflow-scrolling / overscroll-behavior | 1 Min | style.css .slideover |
| 6 | M-5 · Status-Dot Pseudo inset -16px | 3 Min | style.css @media 1200px |
| 7 | M-1 · fa-row__chevron 44px-Höhe mobile | 3 Min | style.css @media 1200px |
| 8 | H-3 Teil B · Swipe-down-to-close | 15 Min | app.js openSlideover |
| 9 | M-3 · Breadcrumb-Overflow meta-bar | 5 Min | style.css @media 520px |
| 10 | L-1 · font-size Minimum 10px | 3 Min | style.css Verdichtung-2-Block |
| 11 | L-4 · Verdichtungs-Patches in min-width 1201px | 8 Min | style.css Verdichtung-1-Block |

**Gesamtaufwand kritischer Pfad (Prio 1-5):** ~23 Min
**Gesamtaufwand alles:** ~60 Min

---

## Positive Highlights — Was bereits iPhone-tauglich ist

1. **-apple-system Font-Stack korrekt** — `--sans: 'Inter Tight', -apple-system, system-ui, sans-serif` und `-webkit-font-smoothing: antialiased` sind gesetzt. SF Pro wird als Fallback korrekt geladen, Rendering ist sauber.

2. **Aside-vor-Main-Order auf Mobile** — Die H-06-Patch-Implementierung (Z. 1214-1218) setzt `werkbank__aside { order: -1 }`. Paul sieht beim ersten Scroll sofort Pflichtwissen/Falle-Atlas, nicht die Vertiefung. Genau richtig für Pendel-Quick-Lookup.

3. **Back-to-Top-Button: min-height 44px** — Das H-05/Back-to-Top-Element hat `min-height: 44px` (Z. 1204) und `display: flex; align-items: center` — Apple HIG-compliant. Nur der bottom-Abstand für Safe-Area fehlt (H-1).

4. **Slideover-Close-Button 44×44 (H-07-Patch)** — `.slideover__close { min-height: 44px; min-width: 44px }` (Z. 1227-1228) — korrekte Touch-Target-Größe. Der Button ist im Screenshot `iphone13-mp03-slideover.png` klar erkennbar und prominent positioniert.

5. **Bottom-Sheet-Architektur grundsätzlich korrekt** — `.slideover { position: fixed; left: 0; right: 0; bottom: 0; transform: translateY(100%); }` folgt dem iOS-Sheet-Pattern. Die cubic-bezier-Transition (`.25s cubic-bezier(.2, .7, .3, 1)`) fühlt sich nativ an. Drag-Handle und Swipe-to-close sind die einzigen fehlenden Polishing-Schritte.

---

*Audit basiert auf: 6 iPhone-Screenshots + vollständige style.css (1540 Zeilen) + app.js Slideover-Block. Keine Simulator-Messung — visuelle + Code-Evidenz kombiniert.*
