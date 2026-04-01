# Uebergabe-Prompt: v3.8 U1-U4 UI-Optimierung

**Datum:** 2026-03-30
**Von:** Cowork (Architektur-Pflege)
**An:** Claude Code (Implementierung)
**Referenz:** `docs/architektur/UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md` (Sektion v3.8, U1-U4)

---

## Pre-Flight

Vor der Arbeit sicherstellen:

- [ ] `git status` — Working Tree sauber (keine uncommitted changes)
- [ ] `git pull` — Lokaler Branch ist aktuell mit origin/main
- [ ] Aktuelle Version der zu aendernden Dateien lesen (NICHT aus dem Prompt uebernehmen)

Falls Pre-Flight fehlschlaegt: STOPP. Nicht mit Stash/Force-Operationen improvisieren. Stattdessen Problem melden.

---

## Kontext

v3.8 implementiert 4 UI-Aenderungen und 5 Content-Aenderungen. Dieser Prompt betrifft nur die **4 UI-Aenderungen (U1-U4)**. Die Content-Aenderungen (C1-C5) sind bereits in den Agenten-Prompts verankert (Cowork-Domaene) und werden bei der Mappe-1-Migration angewendet.

Aktuelles Layout (v3.5): 2/3-1/3 Grid (Material links, Fragebogen rechts), Notizbuch-Stil Fragebogen, Lochrand, Material-Flags (M1, M2, ...). Mappe-Ueberschrift in `<header>` mit Beschreibung.

---

## Aufgabe: 4 UI-Aenderungen implementieren

### U1: Infobox-Redesign

**Ist-Zustand:** Die Mappe-Ueberschrift (`.mappe__titel`) und Beschreibung (`.mappe__beschreibung`) stehen im `<header>` ueber dem Grid. Die Ueberschrift ist der Mappe-Titel aus `data.json → mappen[].titel`. Das Grid darunter ist 2/3 Material + 1/3 Fragebogen.

**Soll-Zustand:** Die Infobox (Mappe-Titel = Stundenfrage + Beschreibung) soll als zentrierter, visuell prominenter Block **volle Breite** einnehmen (ueber beide Grid-Spalten). Die Stundenfrage (Mappe-Titel) ist das visuelle Zentrum — gross, mittig, als Frage erkennbar.

**Umsetzung:**
- In `base.css` oder `theme-gpg.css`: `.mappe__titel` mit `text-align: center`, groesserer `font-size` (z.B. `var(--text-4xl)` oder 2.2rem), ggf. etwas `padding` und dezenter Hintergrund (`var(--color-surface)`)
- Header-Block als volle Breite sicherstellen (kein Grid-Constraint)
- Beschreibung (`.mappe__beschreibung`) zentriert darunter, kursiv, etwas kleiner

**Nicht aendern:** Grid-Struktur der Erarbeitung (2/3 + 1/3), Fragebogen-Design, Material-Flags.

### U2: Sticky-Header Stundenfrage

**Ist-Zustand:** Beim Scrollen durch Materialien/Fragebogen verschwindet die Mappe-Ueberschrift nach oben.

**Soll-Zustand:** Die Stundenfrage bleibt als duenner, fixierter Header am oberen Bildschirmrand sichtbar, wenn der User scrollt. Wie eine Erinnerung: "Das ist die Frage, die du beantworten sollst."

**Umsetzung:**
- In `escape-engine.js` (`_renderMappeV1` oder global): Beim Scrollen (`IntersectionObserver` oder `scroll`-Event) pruefen, ob der originale Header aus dem Viewport verschwindet
- Wenn ja: Ein `.sticky-stundenfrage`-Element einblenden (duenner Bar, feste Position `position: fixed; top: 0`, volle Breite, `z-index` hoch genug)
- Inhalt: Nur der Mappe-Titel-Text (Stundenfrage), kompakt, kleiner Font (1rem), zentriert
- Hintergrund: halbtransparent oder `var(--color-surface)` mit Schatten
- **Graceful Degradation:** Wenn JS nicht laedt oder CSS fehlt, passiert nichts Schlimmes — der Header ist einfach nicht sticky. Kein Layout-Bruch.

**CSS fuer `.sticky-stundenfrage`:**
```css
.sticky-stundenfrage {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--color-surface, #fff);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: var(--space-xs) var(--space-md);
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  transform: translateY(-100%);
  transition: transform 0.2s ease;
}
.sticky-stundenfrage--visible {
  transform: translateY(0);
}
```

### U3: Sicherung → Hefteintrag (Umbenennung)

**Ist-Zustand:** Der Sicherungs-Bereich heisst "Sicherung" (`_renderSicherung`, Zeile 1067: `h2.textContent = 'Sicherung'`). Das ist Lehrkraft-Jargon, den SuS nicht verstehen.

**Soll-Zustand:** Sichtbarer Text wird "Hefteintrag". Interne Variablennamen/IDs bleiben unveraendert (kein Refactoring von `sicherung` → `hefteintrag` in JS/HTML — nur der angezeigte Text aendert sich).

**Umsetzung:**
- In `escape-engine.js`, Funktion `_renderSicherung` (ca. Zeile 1067): `h2.textContent = 'Sicherung'` → `h2.textContent = 'Hefteintrag'`
- CSS-Klassen bleiben `.mappe__sicherung`, `.sicherung__*` etc. — nur der `textContent` aendert sich
- Optional: Wenn in `mappe-template.html` oder anderen Templates der Text "Sicherung" sichtbar vorkommt, ebenfalls aendern

**Nicht aendern:** Variablennamen, CSS-Klassen, data.json-Keys (`sicherung` bleibt `sicherung`).

### U4: Quellenangaben aus SuS-Sichtfeld entfernen

**Ist-Zustand:** Quellenangaben (`.material__quelle`, `figcaption` mit Quelle+Lizenz) sind direkt unter den Materialien sichtbar. SuS sehen "Wikimedia Commons, CC-BY-SA 2.5" etc. — das stoert den Lesefluss und ist fuer SuS irrelevant.

**Soll-Zustand:** Quellenangaben sind per Default **ausgeblendet**. Ein Toggle-Button ("Quellen anzeigen") macht sie fuer die Lehrkraft sichtbar. Sicherer Fallback: Wenn JS nicht laedt, sind alle Quellenangaben sichtbar (rechtlich sicher).

**Umsetzung:**

*CSS:*
```css
/* Default: Quellenangaben hidden (JS-Klasse auf body) */
body.quellen-hidden .material__quelle,
body.quellen-hidden figcaption .material__quelle-teil {
  display: none;
}
/* Fallback ohne JS: alles sichtbar (body hat keine .quellen-hidden Klasse) */
```

*JS (escape-engine.js):*
- Beim Init: `document.body.classList.add('quellen-hidden')` — damit werden Quellenangaben per Default versteckt. Ohne JS fehlt die Klasse → Quellen sichtbar (Fallback).
- Toggle-Button erstellen: An geeigneter Stelle (z.B. im Header oder als Floating-Button unten rechts) einen Button "Quellen anzeigen" / "Quellen ausblenden" rendern
- Button-Click: `document.body.classList.toggle('quellen-hidden')` + Button-Text aktualisieren

*Bildquelle/Karte-Spezialfall:*
- Aktuell (Zeile 848-854): `figcaption` enthaelt `bildunterschrift + quelle + lizenz` als zusammengefuegten String via `captionParts.join(' — ')`. Das muss aufgeteilt werden:
  - `bildunterschrift` → normaler `figcaption`-Inhalt (immer sichtbar)
  - `quelle` + `lizenz` → in ein separates `<span class="material__quelle-teil">` innerhalb der `figcaption`, das per CSS-Klasse hidden werden kann
- Analog fuer `_renderMaterialKarte` (Zeile 862ff)
- Fuer Darstellungstext, Quellentext, Zeitleiste, Statistik, Tagebuch: Die `.material__quelle` Paragraphen koennen komplett hidden werden (sind eigenstaendige Elemente)

---

## Dateien

| Datei | Aenderungsart | Aenderungen |
|-------|---------------|-------------|
| `assets/css/base.css` ODER `assets/css/themes/theme-gpg.css` | ERWEITERN | U1 Infobox-Styles, U2 Sticky-Stundenfrage-Styles, U4 Quellen-Hidden-Styles |
| `assets/js/escape-engine.js` | ERWEITERN | U2 Sticky-Header-Logik, U3 Textaenderung, U4 Quellen-Toggle + Bildquelle/Karte figcaption-Aufspaltung + Init-Klasse |
| `escape-games/template/mappe-template.html` | PRUEFEN | U3: Falls "Sicherung" als sichtbarer Text vorkommt (aktuell nicht — nur als CSS-Klasse und `id`). Ggf. keine Aenderung noetig |

---

## Merge-Schutz

Wenn bei `git pull` oder `git push` Konflikte auftreten:
1. NICHT automatisch aufloesen (kein --theirs, kein --ours)
2. Konflikt-Dateien auflisten und dem User melden
3. Warten auf User-Entscheidung

Grund: Automatische Merge-Resolution hat in der Vergangenheit zu Datenverlust gefuehrt.

---

## Erfolgskriterium

1. Mappe-1 (`escape-games/gpg-erster-weltkrieg-ursachen/mappe-1.html`) zeigt:
   - Stundenfrage gross und zentriert ueber voller Breite (U1)
   - Beim Scrollen: duenner Sticky-Header mit Stundenfrage (U2)
   - Nach Loesungswort-Eingabe: Bereich heisst "Hefteintrag" statt "Sicherung" (U3)
   - Quellenangaben unter Materialien sind unsichtbar; Toggle-Button zeigt sie an (U4)
2. Bildunterschriften (z.B. Europakarte) bleiben sichtbar, nur Quelle+Lizenz-Teil ist hidden
3. Ohne JS: Quellenangaben sind sichtbar (Fallback)
4. Layout-Regression: 2/3-1/3 Grid, Notizbuch-Fragebogen, Lochrand, Material-Flags — alles unveraendert

---

## Verifikation

- [ ] `mappe-1.html` in Browser oeffnen (Chrome, Firefox)
- [ ] Stundenfrage zentriert, gross, volle Breite sichtbar
- [ ] Scrollen: Sticky-Header erscheint, verschwindet bei Zurueckscrollen
- [ ] Material-Quellenangaben (`.material__quelle`) nicht sichtbar
- [ ] Bildunterschriften bei Karte/Bildquelle sichtbar, Quelle+Lizenz-Teil nicht sichtbar
- [ ] Toggle-Button: Quellen ein-/ausblenden funktioniert
- [ ] Loesungswort eingeben → "Hefteintrag"-Ueberschrift (nicht "Sicherung")
- [ ] JS deaktivieren → Quellenangaben sichtbar (Fallback-Test)
- [ ] Keine `console.error` in DevTools
- [ ] Mobile Viewport (375px Breite): Sticky-Header, Infobox, Toggle funktionieren
- [ ] Alle bestehenden Aufgaben (MC, Zuordnung, Lueckentext, Reihenfolge, Freitext) funktionieren unveraendert
- [ ] Loesungswort-Drag-and-Drop funktioniert unveraendert

---

## Commit-Konvention

Prefix: `v3.8:` fuer alle Commits dieser Phase.
Beispiel: `v3.8: U1-U4 UI-Optimierung (Infobox, Sticky-Header, Hefteintrag, Quellen-Toggle)`

---

## Nach Abschluss

Melde den Abschluss in Cowork mit: "Update: U1-U4 erledigt. Ergebnis: [Zusammenfassung]"
