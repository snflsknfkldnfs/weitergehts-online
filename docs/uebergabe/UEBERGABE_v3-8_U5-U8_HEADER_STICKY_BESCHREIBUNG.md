# Uebergabe-Prompt: v3.8 U5-U8 Header, Sticky, Beschreibung, Mappenbezeichner

**Datum:** 2026-03-30
**Von:** Cowork (Architektur-Pflege)
**An:** Claude Code (Implementierung)
**Vorgaenger:** `docs/uebergabe/UEBERGABE_v3-8_U1-U4_UI_OPTIMIERUNG.md` (bereits umgesetzt, Commit d233b74)

---

## Pre-Flight

Vor der Arbeit sicherstellen:

- [ ] `git status` — Working Tree sauber (keine uncommitted changes)
- [ ] `git pull` — Lokaler Branch ist aktuell mit origin/main
- [ ] Aktuelle Version der zu aendernden Dateien lesen (NICHT aus dem Prompt uebernehmen)

Falls Pre-Flight fehlschlaegt: STOPP. Nicht mit Stash/Force-Operationen improvisieren. Stattdessen Problem melden.

---

## Kontext

U1-U4 (Commit d233b74) haben das Grundgeruest der UI-Optimierung implementiert. U5-U8 korrigieren und erweitern drei Bereiche: Sticky-Header-Inhalt, Mappenbezeichner im Titel, Beschreibungszeile.

**Betroffene Dateien:**
- `assets/js/escape-engine.js` — Zeilen ~517-555 (`_updateSeitenTitel`) und ~1802-1820 (Sticky-Header in `_renderMappeV1`)
- `assets/css/themes/theme-gpg.css` — `.sticky-stundenfrage` Styling (bereits vorhanden, ggf. Anpassung)

**Nicht aendern:** Grid-Struktur, Fragebogen-Design, Material-Flags, Quellen-Toggle (U4), Hefteintrag (U3), base.css.

---

## Aufgabe: 4 Aenderungen implementieren

### U5: Sticky-Header zeigt Stundenfrage statt Mappennamen

**Ist-Zustand (Zeile ~1802-1806):**
```js
var stickyBar = document.createElement('div');
stickyBar.className = 'sticky-stundenfrage';
stickyBar.textContent = mappe.titel || '';
```
Der Sticky-Header zeigt `mappe.titel` ("Pulverfass Europa"). Das ist der Mappenname, nicht die Stundenfrage.

**Soll-Zustand:**
Der Sticky-Header zeigt die **Stundenfrage** aus `mappe.sicherung.tafelbild.stundenfrage` (z.B. "Warum wurde Europa vor 1914 zum Pulverfass?"). Fallback: `mappe.einstieg.problemstellung`. Letzter Fallback: `mappe.titel`.

**Umsetzung:**
```js
// v3.8 U5: Sticky-Header zeigt Stundenfrage
var stundenfrage = (mappe.sicherung && mappe.sicherung.tafelbild && mappe.sicherung.tafelbild.stundenfrage)
  || (mappe.einstieg && mappe.einstieg.problemstellung)
  || mappe.titel
  || '';
var stickyBar = document.createElement('div');
stickyBar.className = 'sticky-stundenfrage';
stickyBar.textContent = stundenfrage;
```

**Zusaetzlich:** Der `IntersectionObserver` soll NICHT auf `.mappe__header` (das versteckte Fortschritts-Div) beobachten, sondern auf den sichtbaren Bereich der `<header>`-Section oder `.mappe__einstieg`. Sobald der Einstieg-Bereich aus dem Viewport scrollt, erscheint der Sticky-Header — so ist die Stundenfrage praesent waehrend der gesamten Material-/Fragebogen-Bearbeitung.

```js
// v3.8 U5: Observer auf Einstieg statt auf (hidden) mappe__header
var observeTarget = document.querySelector('.mappe__einstieg') || document.querySelector('header');
if (observeTarget && 'IntersectionObserver' in window) {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        stickyBar.classList.remove('sticky-stundenfrage--visible');
      } else {
        stickyBar.classList.add('sticky-stundenfrage--visible');
      }
    });
  }, { threshold: 0 });
  observer.observe(observeTarget);
}
```

### U6: Mappenbezeichner im Titel

**Ist-Zustand (Zeile ~540-543):**
```js
var titelEl = document.querySelector('.mappe__titel');
if (titelEl && mappe.titel) {
  titelEl.textContent = mappe.titel;
}
```
Der Titel zeigt nur den Mappennamen ("Pulverfass Europa"). Die SuS wissen nicht, in welcher Mappe sie sich befinden.

**Soll-Zustand:**
Der Titel im beigen Header-Block zeigt "Mappe X: [Mappenname]" (z.B. "Mappe 1: Pulverfass Europa").

**Umsetzung:**
Den Mappenindex aus `data.mappen` ableiten:

```js
// v3.8 U6: Mappenbezeichner ergaenzen
var titelEl = document.querySelector('.mappe__titel');
if (titelEl && mappe.titel) {
  var mappenIndex = 0;
  if (_state.data && _state.data.mappen) {
    for (var mi = 0; mi < _state.data.mappen.length; mi++) {
      if (_state.data.mappen[mi].id === mappe.id) {
        mappenIndex = mi + 1;
        break;
      }
    }
  }
  var praefix = mappenIndex > 0 ? 'Mappe ' + mappenIndex + ': ' : '';
  titelEl.textContent = praefix + mappe.titel;
}
```

Auch den `document.title` anpassen (Zeile ~550):
```js
if (mappe.titel && gameTitel) {
  document.title = praefix + mappe.titel + ' \u2013 ' + gameTitel;
}
```

### U7: Beschreibungszeile entfernen

**Ist-Zustand (Zeile ~545-548):**
```js
var beschreibungEl = document.querySelector('.mappe__beschreibung');
if (beschreibungEl && mappe.beschreibung) {
  beschreibungEl.textContent = mappe.beschreibung;
}
```
Die Beschreibungszeile ("Europa vor 1914 — Buendnisse, Rivalitaeten und ein Kontinent am Abgrund.") steht unter dem Mappentitel und wiederholt weitgehend, was Titel + Einstieg bereits sagen.

**Soll-Zustand:**
Die Beschreibungszeile wird nicht gerendert. Das Element bleibt im HTML (fuer kuenftige Nutzung), wird aber per `display: none` versteckt.

**Umsetzung in `_updateSeitenTitel`:**
```js
var beschreibungEl = document.querySelector('.mappe__beschreibung');
if (beschreibungEl) {
  beschreibungEl.style.display = 'none';
}
```

Alternativ per CSS in `theme-gpg.css`:
```css
.mappe__beschreibung { display: none; }
```

### U8: Game-Titel im Header entfernen (Doppelung mit Sticky)

**Ist-Zustand (Zeile ~519-527):**
`_updateSeitenTitel` erzeugt dynamisch ein `<h1 class="game__titel">` mit dem Game-Titel (z.B. "Der Erste Weltkrieg — Ursachen und Ausbruch") und fuegt es VOR dem Mappentitel ein. Ergebnis im Browser: Game-Titel gross oben im dunklen Header, dann darunter der Mappentitel.

**Soll-Zustand:**
Der Game-Titel wird NICHT als separates H1 in den Header eingefuegt. Die semantische Hierarchie ist:
- `<header>` enthaelt nur den Mappentitel (mit Mappenbezeichner, U6)
- Der Game-Titel erscheint nur im Browser-Tab (`document.title`)
- Der Sticky-Header zeigt die Stundenfrage (U5)

**Umsetzung:**
Den Block in `_updateSeitenTitel`, der `gameH1` erzeugt und einfuegt (Zeile ~521-537), entfernen oder auskommentieren. Nur den `document.title`-Teil behalten:

```js
function _updateSeitenTitel(mappe) {
  var gameTitel = _state.data && _state.data.meta && _state.data.meta.titel;

  // v3.8 U6: Mappenbezeichner ergaenzen
  var titelEl = document.querySelector('.mappe__titel');
  var praefix = '';
  if (titelEl && mappe.titel) {
    var mappenIndex = 0;
    if (_state.data && _state.data.mappen) {
      for (var mi = 0; mi < _state.data.mappen.length; mi++) {
        if (_state.data.mappen[mi].id === mappe.id) {
          mappenIndex = mi + 1;
          break;
        }
      }
    }
    praefix = mappenIndex > 0 ? 'Mappe ' + mappenIndex + ': ' : '';
    titelEl.textContent = praefix + mappe.titel;
  }

  // v3.8 U7: Beschreibung ausblenden
  var beschreibungEl = document.querySelector('.mappe__beschreibung');
  if (beschreibungEl) {
    beschreibungEl.style.display = 'none';
  }

  // Browser-Tab-Titel
  if (mappe.titel && gameTitel) {
    document.title = praefix + mappe.titel + ' \u2013 ' + gameTitel;
  } else if (mappe.titel) {
    document.title = praefix + mappe.titel + ' \u2013 Escape-Game';
  }
}
```

**Wichtig:** Den Mappe-Titel NICHT mehr von h1 zu h2 herabstufen (der alte Code tat das, weil er ein neues h1 davor setzte). Der Mappe-Titel bleibt h1 — er ist die hoechste Ueberschrift der Seite.

---

## Merge-Schutz

**NUR diese Dateien aendern:**
- `assets/js/escape-engine.js`
- `assets/css/themes/theme-gpg.css` (nur falls CSS-Anpassung noetig)

**NICHT aendern:**
- `docs/**` — gehoert Cowork
- `base.css`
- `data.json`
- HTML-Templates (mappe-1.html etc.)

---

## Verifikations-Checkliste

Nach Implementierung pruefen:

1. [ ] Sticky-Header zeigt Stundenfrage ("Warum wurde Europa vor 1914 zum Pulverfass?"), nicht Mappennamen
2. [ ] Sticky-Header erscheint wenn Einstieg-Bereich aus dem Viewport scrollt
3. [ ] Sticky-Header verschwindet wenn zurueck nach oben gescrollt wird (Transition sauber)
4. [ ] Mappentitel in beiger Box zeigt "Mappe 1: Pulverfass Europa"
5. [ ] Beschreibungszeile ist nicht sichtbar
6. [ ] Kein separater Game-Titel (h1) ueber dem Mappentitel
7. [ ] Browser-Tab zeigt "Mappe 1: Pulverfass Europa – Der Erste Weltkrieg — Ursachen und Ausbruch"
8. [ ] Mappe-Titel bleibt h1 (nicht zu h2 herabgestuft)
9. [ ] Quellen-Toggle (U4) funktioniert weiterhin
10. [ ] Hefteintrag (U3) zeigt weiterhin "Hefteintrag"
11. [ ] Layout (2/3 + 1/3 Grid) intakt
12. [ ] Mobile Ansicht (< 640px): Sticky-Header nicht ueberlappt/abgeschnitten

---

## Commit-Konvention

```
v3.8: U5-U8 Header-Optimierung (Sticky=Stundenfrage, Mappenbezeichner, Beschreibung entfernt)
```
