# Uebergabe-Prompt: v3.8 U9-U10 Einstieg-Zentrierung + Sticky-Transition

**Datum:** 2026-03-30
**Von:** Cowork (Architektur-Pflege)
**An:** Claude Code (Implementierung)
**Vorgaenger:** U1-U4 (Commit d233b74), U5-U8 (Commit 862af13)

---

## Pre-Flight

- [ ] `git status` — Working Tree sauber
- [ ] `git pull` — Aktuell mit origin/main
- [ ] Aktuelle Version der zu aendernden Dateien lesen (NICHT aus dem Prompt uebernehmen)

Falls Pre-Flight fehlschlaegt: STOPP.

---

## Kontext

U5-U8 haben Header/Sticky/Mappenbezeichner korrigiert. Zwei letzte visuelle Feinschliffe fehlen: (1) Der Einstieg-Block (Narrativ + Problemstellung/Stundenfrage) ist linksbündig statt zentriert. (2) Der Sticky-Header springt abrupt rein statt smooth von der Problemstellung-Position zu "erben".

**Betroffene Dateien:**
- `assets/css/themes/theme-gpg.css`
- `assets/js/escape-engine.js` (nur IntersectionObserver-Target aendern)

**Nicht aendern:** `docs/**`, `base.css`, `data.json`, HTML-Templates.

---

## U9: Einstieg-Block zentriert formatieren

**Ist-Zustand:** `.mappe__einstieg` rendert Narrativ-Text und Problemstellung linksbuendig, volle Breite. Problemstellung ist fett, aber visuell nicht als zentrale Leitfrage hervorgehoben.

**Soll-Zustand:** Der Einstieg-Block ist zentriert, mit begrenzter Breite, sodass er als visueller Auftakt ueber dem Material/Fragebogen-Grid steht. Die Problemstellung (= Stundenfrage) ist groesser und prominent.

**Umsetzung in `theme-gpg.css`:**

```css
/* v3.8 U9: Einstieg-Block zentriert */
.mappe__einstieg {
  text-align: center;
  max-width: 800px;
  margin-inline: auto;
  padding: var(--space-xl, 2rem) var(--space-lg, 1.5rem);
}

.mappe__einstieg .einstieg__problemstellung {
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: var(--space-md, 1rem);
  line-height: 1.4;
}
```

**Wichtig:** Falls `.einstieg__problemstellung` aktuell eine andere Klasse hat, in `escape-engine.js` nachschlagen — die Funktion `_renderEinstieg` erzeugt die Elemente. Die CSS-Klasse muss dem tatsaechlich erzeugten Klassennamen entsprechen. Im Zweifel: Im Browser DevTools pruefen, welche Klasse das Problemstellung-Element hat, und den Selektor anpassen.

---

## U10: Sticky-Header smooth von Problemstellung erben

**Ist-Zustand:** Der IntersectionObserver beobachtet `.mappe__einstieg` (seit U5). Wenn der Einstieg-Block aus dem Viewport scrollt, springt der Sticky-Header per `translateY(-100%) → translateY(0)` ein.

**Soll-Zustand:** Der Observer beobachtet spezifisch das **Problemstellung-Element** (nicht den ganzen Einstieg). Dadurch erscheint der Sticky-Header genau dann, wenn die Stundenfrage aus dem sichtbaren Bereich verschwindet — es wirkt, als wuerde die Frage nach oben "wandern" und sich dort fixieren. Die Transition wird etwas weicher.

**Umsetzung in `escape-engine.js`:**

Observer-Target aendern (im `_renderMappeV1`-Block, nach dem Sticky-Bar-Setup):

```js
// v3.8 U10: Observer auf Problemstellung (nicht ganzen Einstieg)
var observeTarget = document.querySelector('.einstieg__problemstellung')
  || document.querySelector('.mappe__einstieg')
  || document.querySelector('header');
```

Falls die Problemstellung-Klasse anders heisst: das Element finden, das die Stundenfrage/Problemstellung im Einstieg-Container enthaelt (erzeugt durch `_renderEinstieg`).

**CSS-Anpassung in `theme-gpg.css`:**

Transition etwas weicher machen:

```css
.sticky-stundenfrage {
  transition: transform 0.3s ease-out;
}
```

(Die bestehende `transition: transform 0.2s ease;` auf `0.3s ease-out` aendern.)

---

## Verifikations-Checkliste

1. [ ] Einstieg-Block (Narrativ + Problemstellung) ist zentriert
2. [ ] Einstieg-Block hat begrenzte Breite (~800px), steht mittig ueber dem Grid
3. [ ] Problemstellung/Stundenfrage ist groesser und visuell prominent
4. [ ] Sticky-Header erscheint genau wenn die Problemstellung aus dem Viewport scrollt
5. [ ] Sticky-Header faehrt smooth ein (kein harter Sprung)
6. [ ] Sticky-Header verschwindet smooth wenn zurueck nach oben gescrollt
7. [ ] Alle vorherigen U-Aenderungen (U1-U8) intakt
8. [ ] Mobile Ansicht: Einstieg-Block nicht abgeschnitten, Sticky weiterhin funktional

---

## Commit-Konvention

```
v3.8: U9-U10 Einstieg zentriert, Sticky-Transition smooth von Problemstellung
```
