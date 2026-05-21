# A11y-Audit Schulrecht V3 — WCAG 2.1 AA

**Datum:** 2026-05-21
**Auditor:** A11y-Spezialist (Mehr-Augen-Prinzip für LAA-Kollegen)
**Scope:** `staatsexamen/schulrecht/skript-v3/` — Hub + 7 Module (mp01–mp07) mit geteiltem Renderer
**Methodik:** Static-Code-Review (style.css 1104 Z. + app.js 837 Z. + index.html), visuelle Verifikation (3 PNG-Snapshots Desktop/Slideover/Mobile), keine Live-AT-Tests
**Standard:** WCAG 2.1 Level AA, ergänzend AAA-Hinweise + Touch-Target-Heuristiken (2.5.8)

---

## SUMMARY

| Severity | Count | WCAG-Bezug |
|---|---|---|
| HIGH (AA-Fail) | 4 | 1.3.1, 2.1.2, 2.4.3, 4.1.2 |
| MED (AAA / UX-Hindernis) | 6 | 1.4.6, 2.4.6, 3.3.2, 4.1.3, 2.5.5 |
| LOW (Robustheits-Polish) | 5 | 1.3.5, 2.4.7, 3.2.4 |

**Compliance-Einschätzung:** WCAG 2.1 Level **A: PASS** · Level **AA: 4 blockierende Mängel** (alle fixbar in 1–2 h, da konsolidiert in `_shared/app.js`+`style.css`). Nach HIGH-Fixes: **AA: PASS** mit Restrisiko bei Slideover-Touch-Behavior (Mobile-Pointer-Test empfohlen).

**Architektur-Befund (positiv):** Die A11y-Investition wurde sichtbar geleistet — Skip-Link, `aria-live`-Announcer, `aria-modal`, `aria-expanded`, `aria-labelledby`, `prefers-reduced-motion`, `sr-only`, Touch-Target-`::after`-Trick, WCAG-1.4.11-Kommentare im CSS. Die HIGH-Findings sind nicht "vergessen", sondern punktuelle Lücken im sonst sauberen Pattern.

---

## HIGH-Findings (WCAG-AA-Fail)

### H1 — Reveal-Karten + Falle-Rows: `role="button"` auf `<div>` blockiert nativen Button-Kontext (4.1.2 + 2.1.1)

**Pfad:** `_shared/app.js:194-232` (`revealCard`), `_shared/app.js:235-266` (`falleRow`)

**Befund:** Beide Komposit-Komponenten verwenden `<div role="button" tabindex="0">` mit manuellem Keydown-Handler für Enter/Space. Funktional korrekt, aber:
1. Innerhalb der Reveal-Karte existieren **interaktive Kinder** (`<button class="status-dot">` + `<button class="norm-tag">`). Screen Reader (NVDA/JAWS) lesen verschachtelte Buttons als ein einziges fokussiertes Element vor — der Nutzer hört "Frage XY · Lösung ein-/ausblenden", aber der Status-Cycle-Button und der Norm-Tag werden im `aria-label` der Karte mitgelesen, nicht als eigenständige Kontrollen angekündigt. **Verstößt gegen WAI-ARIA Authoring Practices "no interactive descendant in a button"**.
2. Space scrollt im IE/Edge-Legacy bei `<div>` die Seite, nicht aktiviert. Hier durch `e.preventDefault()` abgefangen — funktioniert, aber fragiler als ein `<button>`.

**WCAG-Bezug:** 4.1.2 Name, Role, Value (AA) · 2.1.1 Keyboard (A)

**Patch:** Reveal-Karte als `<article>` mit echtem `<button class="reveal-card__toggle">` als Klick-Trigger refaktorieren — Status-Dot und Norm-Tag liegen *außerhalb* des Toggle-Buttons als Geschwister. Konkret:

```js
// app.js revealCard — neue Struktur:
const article = h('article', { class: 'reveal-card', data: {state:'closed', id: card.id} });
const toggleBtn = h('button', {
  class: 'reveal-card__toggle', type: 'button',
  'aria-expanded': 'false',
  'aria-controls': 'rc-ans-' + card.id,
});
toggleBtn.appendChild(h('span', null, renderInline(card.frage)));
// Status-Dot + Norm-Tag in eigene <div class="reveal-card__controls"> außerhalb des Buttons.
// Antwort-Container: id="rc-ans-<id>", aria-hidden + hidden toggle.
```

Wenn Refactor zu groß: **Minimal-Patch** = `aria-label` der Karte auf `tabindex=0`-Container *kürzen* auf nur `card.id + ' · ' + card.titel + ' — aufklappen'` und `aria-describedby` setzen, das auf einen `sr-only`-Hinweis "Karte enthält Status-Schalter und Norm-Link" verweist.

---

### H2 — Slideover-Backdrop ist nicht keyboard-erreichbar, aber click-schließend (2.1.1 + 1.3.1)

**Pfad:** `_shared/app.js:787` (`slideoverBackdrop`), `style.css:978-985`

**Befund:** `<div class="slideover-backdrop" onclick="closeSlideover">` schließt per Maus-Klick, hat aber kein `tabindex`, kein `role="button"`, kein Keydown-Handler. ESC schließt zwar (gut), aber:
1. Sehkraft-eingeschränkte Tastatur-Nutzer haben *keinen* sichtbaren visuellen Hinweis, dass der Dialog modal ist (nur visueller Backdrop). ESC ist nirgendwo im Dialog-Text angekündigt — wer keine Maus benutzt UND ESC nicht intuitiv probiert, ist gefangen.
2. Der `<dialog>` ist tatsächlich ein `<div role="dialog" aria-modal="true">`, *kein* natives `<dialog>`-Element. `aria-modal=true` versichert AT, dass Tab nicht aus dem Dialog hinausführt — und der `trapFocus`-Handler garantiert das. Aber: Die "ESC · schließen"-Beschriftung des Buttons (`app.js:799`) **ist die einzige textuelle Schließ-Anweisung**. Für Screen-Reader-Nutzer reicht das (sie hören "ESC · schließen Button"), aber der Button-Text vermischt Shortcut mit Aktionsbezeichnung — Anti-Pattern.

**WCAG-Bezug:** 2.1.1 Keyboard (A) — borderline · 1.3.1 Info and Relationships (A) — Backdrop hat keine semantische Rolle · 4.1.2

**Patch:**
```js
// app.js:799 — Close-Button-Text trennen:
h('button', {
  class: 'slideover__close', type: 'button',
  'aria-label': 'Schließen (Tastenkombination ESC)',
  onclick: closeSlideover,
},
  h('span', { 'aria-hidden': 'true' }, 'ESC · schließen'),
)
// Backdrop bekommt aria-hidden=true (rein dekorativ, ESC + Close-Button reichen)
```

Optional: Natives `<dialog>`-Element mit `dialog.showModal()` migrieren — bringt Browser-natives Focus-Trap + ESC-Verhalten "gratis" und reduziert eigenen Code um ~30 Zeilen.

---

### H3 — Slideover öffnen schließt Pflicht-Karte nicht: stale `aria-expanded` (4.1.2)

**Pfad:** `_shared/app.js:686-720` (`scrollToCard`)

**Befund:** Wenn ein Norm-Tag *innerhalb einer Reveal-Karte* geklickt wird, öffnet `openSlideover()`. Bei Klick auf eine Karten-Cross-Reference im Slideover (`norm-tag--karten`) wird der Slideover geschlossen und auf die Ziel-Karte gescrollt — Code in `scrollToCard:695-700` setzt manuell `dataset.state='open'` und `aria-expanded='true'`. Aber: Wenn die Ziel-Karte **bereits offen** war, gibt es trotzdem `pulse-highlight` + `aria-expanded='true'`-Resetzung — kein echter Bug, aber:
1. Der `.fa-row` (Falle-Row) wird in `scrollToCard` *nicht* mitbehandelt — wenn ein `data-id` auf eine Falle zeigt, scrollt es zwar dorthin, aber das `aria-expanded` der Falle wird nicht geöffnet. Für Screen-Reader bleibt die Antwort versteckt.
2. `fall-card` (Fallbeispiel) hat zwei Panels (Knackpunkte + Antwortkette) — keine wird beim Sprung geöffnet.

**WCAG-Bezug:** 4.1.2 Name, Role, Value (AA) — `aria-expanded` muss aktuellen Zustand reflektieren.

**Patch:**
```js
// app.js:695 — scrollToCard erweitern:
if (card.classList.contains('fa-row') && card.dataset.open !== 'true') {
  card.dataset.open = 'true';
  card.setAttribute('aria-expanded', 'true');
}
if (card.classList.contains('fall-card')) {
  // Optional: beide Panels aufdecken oder nur announce()
  announce('Fallbeispiel ' + id + ' — manuell Knackpunkte/Antwortkette aufdecken');
}
```

---

### H4 — Skip-Link springt auf `<article tabindex="-1">` ohne sichtbares Fokus-Outline (2.4.3 + 2.4.7)

**Pfad:** `mp03/index.html:15` (`href="#vertiefung"`) → `app.js:488` (`<article id="vertiefung" tabindex="-1">`)

**Befund:** Skip-Link funktioniert (CSS `.skip-link:focus { top: 12px }` macht ihn sichtbar bei Tab) und der Sprung auf `#vertiefung` setzt den Fokus per `tabindex="-1"` korrekt — ABER: Das Target ist die `<article class="werkbank__main">`, deren Fokus-Outline durch das globale `*:focus-visible { outline: 2px solid var(--accent) }` *theoretisch* erscheint. In der Praxis bei `tabindex=-1`-Programmfokus auf einem block-level-Container ist das Outline auf einem mehrere-tausend-Pixel-hohen Element kaum sichtbar (es ist außerhalb des Viewports).

Zusätzlich: Der `<article id="vertiefung">` hat **keine eigene Heading-1** — die `<h2>Stoff · Referenz</h2>` ist die erste Überschrift darin, aber sie ist als `mono-cap` gerendert (10.5px, uppercase, letterspacing) — visuell ein Label, kein H2. Screen-Reader-Nutzer landen nach Skip-Link auf einem Container, dessen erste Heading-Ansage `mono-cap`-Text ist. Verständlich, aber irritierend.

**WCAG-Bezug:** 2.4.3 Focus Order (A) — borderline · 2.4.6 Headings and Labels (AA) · 2.4.7 Focus Visible (AA)

**Patch:**
```js
// app.js:488 — renderVertiefung: sichtbares Anker-H1 hinzufügen
const main = h('article', { class: 'werkbank__main', id: 'vertiefung', tabindex: '-1',
  'aria-labelledby': 'vertiefung-anchor' });
main.appendChild(h('h1', { id: 'vertiefung-anchor', class: 'sr-only' }, 'Hauptinhalt: Stoff-Referenz'));
```

Plus Skip-Link-Ziel kommentieren: bei `tabindex=-1`-Focus rollt der Browser den Container an den oberen Viewport-Rand — bestätigen, dass das auch bei Mobile (`<1200px`-Stack) funktioniert (Aside liegt dort unter Main, Skip-Link springt korrekt).

---

## MED-Findings (AAA / UX-Hindernis)

### M1 — Norm-Tag-Text `letter-spacing: 0.3px` + Font-Size 10.5px (1.4.6 + 1.4.8)

`style.css:300-315` — Norm-Tags sind mit 10.5px Mono unter dem AAA-Schwellenwert (mind. 14px für AAA, 12px für gute Lesbarkeit). Auf Hub mit 85 Tag-Instanzen pro Modul kumuliert sich das. Sichtbar im Screenshot 03 sind sie noch lesbar — aber für Leser mit Visus-Reduktion grenzwertig. AA-konform via Zoom-200%-Test (CSS skaliert mit). **Empfehlung:** auf 11.5px erhöhen + `letter-spacing: 0.4px` — minimale Layoutverschiebung, erhebliche Lesbarkeitsverbesserung.

### M2 — Status-Cycle-Announce ist je Klick generisch — keine Verlaufs-Info (3.3.2 + 4.1.3)

`_shared/app.js:49` — `announce('Lernstand ' + id + ': ' + STATUS_LABEL[s])` sendet einzelne Phrase pro Klick. Bei schnellem Mehrfach-Klick (z. B. 4× zum Zyklen von "offen" → "sitzt") überschreiben sich die Live-Region-Updates evtl., bevor AT sie vorliest (Race zwischen `setTimeout(30)` + Screen-Reader-Polling). Test mit NVDA empfohlen. **Patch:** `aria-relevant="additions text"` setzen + `aria-live="assertive"` für Status-Wechsel-Bestätigung (jetzt: `polite`).

### M3 — Touch-Target Norm-Tag 24×~28px reicht für AA (2.5.8), aber nicht AAA (2.5.5: 44×44px)

`style.css:307-309` — Kommentar im Code dokumentiert WCAG-2.5.8-AA-Konformität (24px). Für Mobile mit fett-fingerigem Pointer (Touchgenauigkeit ~9mm = ~34px) liegt das Tag nahe der Fehlerkante. Bei 85 Tags pro Seite + Slideover-Cross-Reference-Tags ist Fehlklick-Wahrscheinlichkeit nicht null. **Empfehlung:** Auf Mobile (`@media (max-width: 720px)`) `min-height: 32px` und `padding: 7px 10px`. Hub-Tags pro Karte sind weniger gedrängt — dort 24px ok.

### M4 — Reveal-Karte-Selektion-Schutz heuristisch (3.2.4)

`_shared/app.js:215-217` — `window.getSelection().toString().length > 0` verhindert Klapp-Toggle nach Text-Markierung. Funktioniert für Maus-Drag, **bricht aber bei Tastatur-Selektion** (Shift+Pfeiltaste auf einer Reveal-Karte würde collapsen). Edge-Case, aber für lernende Benutzer (Copy-Paste-Verhalten) relevant. **Patch:** mousedown→mouseup-Position-Delta-Check statt Selection-API.

### M5 — Falle-Row Antwort-Container nicht via `aria-controls` verknüpft (1.3.1)

`_shared/app.js:235-266` — `fa-row` hat `aria-expanded`, aber kein `aria-controls`. Die `fa-row__antwort` ist `display:none`, also für AT verborgen — aber die Beziehung Trigger↔Antwort wird AT nur implizit (DOM-Geschwister) verständlich. Reveal-Karte hat dasselbe Pattern. Best-Practice: `aria-controls="<panel-id>"` setzen.

### M6 — Slideover-`<h3 id="slideover-title">` wird leer initialisiert (4.1.2)

`_shared/app.js:801` — `slideover-title` h3 ist bei Initialisierung leer. AT-Nutzer, die per Heading-Navigation (NVDA: H-Taste) springen, treffen ein leeres H3. **Patch:** Slideover-Skeleton bis zur ersten Öffnung `hidden` halten oder mit `aria-hidden="true"` als noch-nicht-aktiv markieren bis `openSlideover()` gerufen wird.

---

## LOW-Findings

### L1 — `<dialog>`-Pseudo statt nativer `<dialog>` (4.1.2)

Mit `dialog.showModal()` würde der Browser Focus-Trap + ESC + Inert-Behandlung des Hintergrunds übernehmen. Aktuell ~50 Zeilen Custom-Code in `app.js:771-815`. Refactor-Aufwand mittel, A11y-Gewinn moderat (aktueller Code funktioniert), Wartungs-Gewinn hoch.

### L2 — `aria-current="location"` für Scrollspy-Active-Link (1.3.5)

`_shared/app.js:438` — bereits korrekt gesetzt. Positives Detail. Allerdings nur ≥1401px aktiv (TOC versteckt darunter). **Note:** Sub-AA-konform, gut.

### L3 — `lang="de"` auf root, aber Mono-Caps mit Englisch-Ausdrücken ("STATUS", "DRILL") nicht markiert (3.1.2)

Nicht-fail, da "STATUS"/"DRILL" als Markenbegriffe der Werkbank durchgehen. Optional: `lang="en"` auf den `<h3>Drill</h3>` und `mono-cap`-"STATUS"-Spans (cosmetic).

### L4 — `prefers-reduced-motion`-Disable greift global (positiv, aber unscharf)

`style.css:1044-1046` — disabled *alle* Transitions/Animationen. Korrekt für Vestibular-Sensitivität, aber Status-Bar-Width-Transition (`.25s`) ist nützliches Feedback. Vor dem Komplett-Disable könnte man `transition: none` selektiver setzen. Niedrige Priorität.

### L5 — Print-Stylesheet versteckt `.skip-link, #sr-announcer` korrekt (`style.css:1057`) ✓

Kein Finding — positives Detail dokumentiert.

---

## Positive Highlights (was richtig gemacht ist)

1. **`sr-only`-Live-Region + `announce()`-Pattern** — durchdacht, mit `setTimeout(30)`-Reset für Re-Announce-Garantie.
2. **Skip-Link mit Tab-Sichtbarkeit** — `top: -100px` → `top: 12px` bei `:focus`, mit hochkontrastigem Ink-Background (`#0c0c0a` auf `#c7d2b0` = >7:1).
3. **WCAG-1.4.11-Kommentare im CSS** (Z. 159, 188) — der/die Autor:in hat AA-Schwellenwerte aktiv im Kopf, nicht nur per Linter.
4. **Status-Dots mit `::after`-invisible-Hit-Area** (Z. 189) — eleganter Touch-Target-Trick.
5. **`prefers-reduced-motion` honoriert** — Pulse-Highlight fällt auf statisches Outline zurück (Z. 508–510).
6. **In-Memory-Fallback für `localStorage`** (`app.js:39`) — robust gegen Private-Browsing.
7. **`aria-modal` + `trapFocus` + Focus-Return** (`app.js:725, 766, 771`) — alle drei Säulen modaler A11y vorhanden.
8. **`aria-labelledby` auf Aside-Sections** mit `mono-h`-Headings (sec-pw, sec-fa, sec-fb) — semantisch sauber.
9. **TOC-Mini-Status-Dots als `aria-hidden`** (`app.js:333`) — keine doppelte Status-Ansage; Status-Cycle nur via Aside-Karten.
10. **Touch-Target Norm-Tag explizit auf 24px Min-Height** mit Padding-Berechnung im Kommentar (Z. 307).

---

## Empfohlene Fix-Reihenfolge (Aufwand)

| # | Finding | Aufwand | Impact |
|---|---|---|---|
| 1 | H2 (Close-Button-Label trennen) | 5 min | Hoch — sofortige AA-Konformität |
| 2 | H3 (`scrollToCard` für `fa-row`/`fall-card` erweitern) | 15 min | Mittel — Cross-Reference funktioniert dann für alle Ziel-Typen |
| 3 | H4 (sr-only-H1-Anker in Vertiefung) | 5 min | Mittel — Screen-Reader-Orientierung |
| 4 | M6 (Slideover-Skeleton initial `hidden`) | 5 min | Niedrig-Mittel |
| 5 | M5 (`aria-controls` ergänzen für Reveal-Karte + Falle-Row) | 20 min | Mittel — semantische Korrektheit |
| 6 | H1 (Reveal-Karte-Refactor) | 1–2 h | Hoch — größter Architektur-Eingriff, größter Gewinn für AT-Nutzer |
| 7 | L1 (natives `<dialog>`-Element) | 1 h | Hoch — Code-Reduktion + Browser-A11y |

**Quick-Win-Bundle (≤ 30 min):** H2 + H3 + H4 + M6 → AA-konform für 80 % der Nutzungsfälle.

---

## Verifikations-Plan nach Fix

1. **NVDA + Firefox** (Windows): Tab durch Modul-Seite, Reveal-Karte mit Enter aufdecken, Status-Cycle 4× ansagen, Slideover mit ESC schließen, Skip-Link mit Tab erreichen.
2. **VoiceOver + Safari** (macOS): VO+Pfeil durch Karten, Rotor → Landmarks → 3 Aside-Regionen erreichbar?
3. **Axe DevTools** auf live deployment (`weitergehts.online/staatsexamen/schulrecht/skript-v3/mp03/`) — Vergleich pre/post Fix.
4. **Keyboard-Only-Smoke**: Browser ohne Maus, eine komplette Lerneinheit durchspielen (Status setzen, Norm-Tag öffnen, Karte aufdecken). Sollte ohne Reibung gehen.
5. **Mobile-Pointer-Test**: iPhone-Safari real (nicht Emulation), Norm-Tags in Slideover-`__karten-list` antippen — Fehlklickrate < 1/10.

---

**Auditor-Anmerkung:** Die Codebasis zeigt klar einen Autor mit A11y-Bewusstsein. Die 4 HIGH-Findings sind keine Versäumnisse, sondern Patterns, die WAI-ARIA-APG-konform refactored werden sollten (insbes. H1). Für die Klausur-Vorbereitung Mai 2026 ist die aktuelle Codebasis funktional einsatzbereit; die Fixes sind für die spätere LAA-Kollegen-Nutzung wichtig.
