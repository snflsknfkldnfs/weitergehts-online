# Uebergabe-Prompt: v3.8 Bugfix — Link-Styling + Scroll-Offset

**Datum:** 2026-03-30
**Von:** Cowork (Browser-Validierung)
**An:** Claude Code (Implementierung)
**Vorgaenger:** Bugfix 9d184ee

---

## Pre-Flight

- [ ] `git status` — Working Tree sauber
- [ ] `git pull` — Aktuell mit origin/main

Falls Pre-Flight fehlschlaegt: STOPP.

---

## Fix 1: Tipp-Material-Links sichtbar machen

### Problem

Links aus `[[mat-id|Text]]`-Markup in Tipps sind nicht als Links erkennbar (keine Unterstreichung).

### Loesung

In `assets/css/themes/theme-gpg.css` nach dem `.sticky-stundenfrage`-Block einfuegen:

```css
.tipp__material-link {
  text-decoration: underline;
  color: var(--color-primary);
  cursor: pointer;
}

.tipp__material-link:hover {
  text-decoration: underline;
  opacity: 0.8;
}
```

Die Klasse `tipp__material-link` wird bereits von `_parseInlineMaterialLinks` auf die `<a>`-Elemente gesetzt.

---

## Fix 2: Scroll-Offset fuer Fixed Header

### Problem

Beim Klick auf Material-Links (`<a href="#mat-1-2">`) scrollt der Browser zum Material-Element, aber die Material-Kennzeichnung (M-Flag / Titel) wird vom fixed Sticky-Header ueberdeckt.

### Loesung

In `assets/css/themes/theme-gpg.css` einfuegen:

```css
/* Scroll-Offset: Anker-Scroll beruecksichtigt Fixed-Header-Hoehe */
.material[id] {
  scroll-margin-top: 4rem;
}
```

`4rem` gibt genuegend Abstand (Sticky-Header ist ca. 2.5rem hoch + Luft). Falls die Materialien kein `id`-Attribut direkt tragen, sondern ein Wrapper-Element: den Selektor anpassen auf das Element, das die `id` traegt (z.B. `[id^="mat-"]`).

**Pruefe beim Implementieren:** Welches HTML-Element traegt die `id` (z.B. `id="mat-1-2"`)? Den `scroll-margin-top` auf genau dieses Element setzen. Im Zweifelsfall breiter selektieren:

```css
[id^="mat-"] {
  scroll-margin-top: 4rem;
}
```

---

## Merge-Schutz

**Aendern:** `assets/css/themes/theme-gpg.css`

**NICHT aendern:** `docs/**`, Engine-JS, data.json, HTML-Templates.

---

## Verifikations-Checkliste

1. [ ] Material-Links in Tipps sind unterstrichen und farblich erkennbar
2. [ ] Hover auf Material-Links zeigt visuelles Feedback
3. [ ] Klick auf Material-Link scrollt zum Material — Titel/Flag NICHT vom Header ueberdeckt
4. [ ] Scroll-Offset wirkt nur wenn Sticky-Header sichtbar (kein uebermaessiger Leerraum am Seitenanfang)
5. [ ] Bestehende Links (Navigation, Quellen-Toggle) unveraendert

---

## Commit-Konvention

```
v3.8: CSS-Fix — Material-Links unterstrichen, Scroll-Offset fuer Fixed Header
```
