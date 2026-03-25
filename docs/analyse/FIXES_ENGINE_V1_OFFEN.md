# Offene Fixes: Engine v1 (Code-Review 2026-03-16)

Befunde aus systematischem Code-Review der v1-Engine-Implementierung.
H1 und H2 wurden sofort behoben. Die folgenden Findings sind fuer kuenftige Fix-Zyklen vorgemerkt.

---

## M1 — Tafelbild SVG: Verbindungslinien enden an Knotenzentren

**Prio:** Mittel
**Datei:** `assets/js/escape-engine.js`, Funktion `_renderTafelbild` (ca. Zeile 924-1091)
**Problem:** Die SVG-Linien (Verbindungen) werden von Knotenmittelpunkt zu Knotenmittelpunkt gezeichnet. Pfeilspitzen verschwinden hinter den Knoten-Shapes (Rechtecke/Ellipsen), weil die Linie unter dem Shape endet.
**Erwartetes Verhalten:** Linien enden am Rand des Ziel-Knotens, Pfeilspitze sichtbar auf der Shape-Kante.
**Loesungsansatz:** Schnittpunkt Linie/Shape-Rand berechnen. Fuer Rechtecke: Intersection mit den 4 Kanten. Fuer Ellipsen: Parametrische Intersection. Alternativ: Knoten-Shapes mit `pointer-events: none` und Linien mit `marker-end` bei leicht verkuerzter Endposition (Offset um halbe Shape-Breite/Hoehe in Richtung des Vektors).

---

## M2 — Zuordnung-Dropdowns: Doppelte Kategorie-Werte

**Prio:** Mittel (Pre-existing MVP-Bug)
**Datei:** `assets/js/escape-engine.js`, Zuordnung-Renderer
**Problem:** Bei Zuordnungsaufgaben werden die Dropdown-Optionen aus den Loesungswerten generiert. Wenn z.B. 3 Items dem "Dreibund" und 3 Items der "Triple Entente" zugeordnet werden, erscheinen 3x "Dreibund" und 3x "Triple Entente" in jedem Dropdown.
**Erwartetes Verhalten:** Jede Kategorie erscheint genau einmal pro Dropdown.
**Loesungsansatz:** `aufgabe.optionen`-Array verwenden (bereits im data.json-Schema vorgesehen) statt Loesungswerte zu duplizieren. Fallback: `[...new Set(loesungen)]` fuer Deduplizierung.

---

## M3 — material_referenz Anker-Links funktionieren nicht korrekt

**Prio:** Mittel
**Datei:** `assets/js/escape-engine.js`, Funktion `_renderMaterialVerweis` (ca. Zeile 1374-1410)
**Problem:** material_referenz erzeugt Anker-Links (`#mat-1-1`), die zum referenzierten Material scrollen sollen. Im Desktop-Layout (2-Spalten-Grid) ist die Material-Spalte `position: sticky`, daher scrollt der Anker nicht sichtbar dorthin. Im Mobile-Layout (Single-Column) kann der Scroll-Offset durch den Aufgaben-Kontext verdeckt werden.
**Erwartetes Verhalten:** Klick auf material_referenz-Link hebt das referenzierte Material visuell hervor (z.B. kurzes Highlight/Pulse) und scrollt es bei Bedarf in den Viewport.
**Loesungsansatz:** JavaScript-Event-Handler statt nativer Anker-Navigation. Bei Klick: (1) Ziel-Element finden, (2) `scrollIntoView({ behavior: 'smooth', block: 'nearest' })` auf dem Material-Container, (3) CSS-Klasse `material--highlighted` temporaer setzen (z.B. 2s), (4) im Sticky-Layout ggf. Scroll nur innerhalb der Material-Spalte.

---

## N1 — CSS-Variable --max-width-wide nicht definiert

**Prio:** Niedrig
**Datei:** `assets/css/themes/theme-gpg.css`
**Problem:** Die Variable `--max-width-wide` wird in einem Selektor referenziert, ist aber in keiner `:root`-Definition vorhanden. Browser-Fallback greift, daher kein sichtbarer Fehler, aber unsauber.
**Loesungsansatz:** Variable in `:root` von `base.css` oder `theme-gpg.css` definieren (z.B. `--max-width-wide: 1200px`), oder die Referenz durch einen festen Wert ersetzen.

---

## N2 — SVG-Marker-ID "arrowhead" nicht namespaced

**Prio:** Niedrig
**Datei:** `assets/js/escape-engine.js`, Funktion `_renderTafelbild`
**Problem:** Der SVG-Marker fuer Pfeilspitzen hat die generische ID `"arrowhead"`. Wenn mehrere Tafelbilder auf einer Seite gerendert werden (oder andere SVGs mit gleicher ID existieren), kollidieren die Marker-Referenzen.
**Loesungsansatz:** ID mit Mappe-Kontext versehen, z.B. `"arrowhead-" + mappeId`. Die `marker-end`-Referenzen entsprechend anpassen: `url(#arrowhead-mappe-1)`.

---

## N3 — Tafelbild-Sektion ohne beschreibenden h3

**Prio:** Niedrig
**Datei:** `assets/js/escape-engine.js`, Funktion `_renderSicherung` (ca. Zeile 874-909)
**Problem:** Die Tafelbild-SVG wird direkt in die Sicherungs-Sektion eingefuegt, ohne eine beschreibende Ueberschrift (h3) darueber. Andere Sektionen (Einstieg, Materialien) haben Ueberschriften.
**Loesungsansatz:** Vor dem SVG ein `<h3 class="sicherung__titel">Tafelbild</h3>` einfuegen. Optional: Titel aus `sicherung.tafelbild.titel` lesen falls im Schema vorhanden, sonst Default "Tafelbild".

---

## Referenz: Bereits behobene Findings

| ID | Beschreibung | Fix |
|---|---|---|
| H1 | `_checkLueckentext` nutzte exakten String-Vergleich statt `_fuzzyMatch` | `_fuzzyMatch(userValue, expected)` statt `===` (2026-03-16) |
| H2 | `_renderMaterialQuelle` fehlte `<h3>` Titel | h3-Element mit `material__titel` ergaenzt (2026-03-16) |
| E6 | Sicherung sichtbar obwohl Code-Reveal nicht erfolgt | Explizites `display:none` + Restore bei `progress.abgeschlossen` (2026-03-17) |
| E8 | Game-Titel-Header fehlte oben | `_updateSeitenTitel` erzeugt `h1.game__titel` aus `data.meta.titel` (2026-03-17) |
| E9/M2 | Zuordnung-Dropdowns zeigten duplizierte Optionen | `zielSet`-Deduplizierung in `_renderZuordnung` (2026-03-17) |
| N3 | Tafelbild-Sektion ohne beschreibenden h3 | `h3.sicherung__tafelbild-titel` vor SVG eingefuegt (2026-03-17) |
