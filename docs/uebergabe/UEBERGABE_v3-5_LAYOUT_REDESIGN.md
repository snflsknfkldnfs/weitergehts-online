# Uebergabe-Prompt: v3.5 Layout-Redesign

## Kontext

v3.4 (Aufgaben-Guetekriterien) abgeschlossen. Infrastruktur-Completion-Plan Phase v3.5: Layout-Redesign.

Zwei Kern-Aenderungen:
1. **2/3-1/3 Grid**: Material (linke Spalte, 2fr) dominant, Fragebogen (rechte Spalte, 1fr) als sticky Sidebar. Aktuell: 1fr/1fr mit Material als sticky — invertieren.
2. **Notizbuch-Stil Fragebogen**: Visuell eigene Identitaet (Arbeitsblatt-Metapher), klar unterscheidbar vom Hefteintrag (Sicherung). Eigenes Farbschema (Tintenblau statt Navy/Gold), eigene Schriftart (Architects Daughter statt Caveat/Patrick Hand), karierter Hintergrund statt liniert.

Design-Spec: `docs/analyse/DESIGN_SPEC_v3-5_LAYOUT_REDESIGN.md`
Visueller Prototyp: `docs/analyse/PROTOTYP_v3-5_LAYOUT.html` — im Browser oeffnen fuer Referenz.

## Pre-Flight

Vor der Arbeit sicherstellen:
- [ ] `git status` — Working Tree sauber (keine uncommitted changes)
- [ ] `git pull` — Lokaler Branch ist aktuell mit origin/main
- [ ] Aktuelle Version der zu aendernden Dateien lesen (NICHT aus dem Prompt uebernehmen)
- [ ] `docs/analyse/PROTOTYP_v3-5_LAYOUT.html` im Browser oeffnen, um Ziel-Design visuell zu sehen

Falls Pre-Flight fehlschlaegt: STOPP. Nicht mit Stash/Force-Operationen improvisieren. Stattdessen Problem melden.

## Aufgabe

### Teil 1: CSS-Aenderungen

#### 1a. base.css — Grid-Umstellung

Aendere `.mappe__erarbeitung`:
- `grid-template-columns: 1fr 1fr` → `grid-template-columns: 2fr 1fr`
- Sticky-Verhalten invertieren: `.erarbeitung__materialien` NICHT mehr sticky. `.erarbeitung__fragebogen` (oder `aufgaben`-Container) wird sticky (`position: sticky; top: 1rem; max-height: calc(100vh - 2rem); overflow-y: auto;`)
- Max-width fuer 2-Spalten-Modus: 1400px beibehalten
- Breakpoint fuer Single-Column: anpassen auf `max-width: 1023px` (statt 768px), weil 1/3-Spalte bei 768px zu schmal

#### 1b. theme-gpg.css — Notizbuch-Stil Fragebogen

Fuege neuen Abschnitt ein fuer `.erarbeitung__fragebogen` (oder den Container, der die Aufgaben haelt):

**Notizbuch-Container:**
- Hintergrund: Weiss (#FFFFFF) mit Karomuster (CSS `repeating-linear-gradient` in beiden Richtungen, 24px Abstand, #E8E8E8 Linien bei opacity 0.4)
- Oberer Rand: Lochrand-Element (3 Kreise, Tintenblau-Hintergrund #2952A3, border-radius oben). Per CSS `::before`/`::after` und einem Kind-Element, oder per dreifachem `radial-gradient`
- Box-Shadow: `2px 3px 10px rgba(0,0,0,0.08)`
- Border-Radius: `0 0 8px 8px` (oben eckig wegen Lochrand)

**Aufgaben-Karten:**
- Trennung zwischen Aufgaben: `border-bottom: 2px dashed #E8E8E8`
- Aufgaben-Nummer: Kreis (28px, 2px solid #2952A3), Architects Daughter
- Frage-Text: Architects Daughter, 1rem
- MC-Radiobuttons: Custom-Styling (Kreis 18px, border #2952A3, checked = gefuellt)

**Farbschema Fragebogen:**
```
--fb-primary: #2952A3     (Tintenblau — Primaerfarbe)
--fb-highlight: #FFF176   (Textmarker-Gelb)
--fb-success: #388E3C     (Gruenstift)
--fb-error: #C62828       (Rotstift)
--fb-hint: #78909C        (Bleistift-Grau)
--fb-bg: #FFFFFF           (Weiss)
--fb-grid: #E8E8E8        (Hellgrau fuer Karo)
```

Diese Variablen in `:root` ergaenzen (NICHT bestehende ersetzen — die GPG-Theme-Farben bleiben fuer Material-Bereich und Sicherung).

**Schriftart:**
- Google Fonts Import ergaenzen: `@import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');`
- `--font-fragebogen: 'Architects Daughter', cursive;` in `:root`
- Architects Daughter NUR fuer Aufgaben-Nummern, Frage-Texte, Feedback. Optionen-Text und Input-Felder bleiben System-Font (Lesbarkeit).

**Fortschritt:**
- Aufgaben-Dots am Ende des Fragebogen-Containers: flexbox, 10px Kreise, Farben nach Status (geloest=#388E3C, aktuell=#2952A3, offen=border-only #78909C)
- Text "Aufgabe X von Y" links neben Dots

#### 1c. theme-gpg.css — Ueberleitung-Optimierung

Bestehende `.material-ueberleitung` aendern:
- `text-align: center` (statt links-buendig)
- Entferne `border-left`
- `::before` Pseudo-Element: Pfeil-Zeichen '▽', zentriert, goldfarben, 0.6 opacity
- Hintergrund: `linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.06) 30%, rgba(201,168,76,0.06) 70%, transparent 100%)` statt solidem Hintergrund
- Schrift etwas groesser: 1.05rem
- Max-width 600px, `margin-inline: auto`

### Teil 2: JavaScript-Aenderungen

#### 2a. escape-engine.js — Material-Fortschritt

Neue Funktion `_renderMaterialFortschritt(materialien, aktuellesIdx)`:
- Erzeugt DOM: Container mit Text "Material X von Y" + Dot-Reihe
- Dots: `.material-fortschritt__dot` mit Klassen `--gesehen`, `--aktuell`
- Einfuegen vor dem Material-Container (innerhalb `.erarbeitung__materialien`)
- Update bei Scroll: IntersectionObserver auf jedes Material-Element. Wenn Material im Viewport: Dot aktualisieren

#### 2b. escape-engine.js — Aufgaben-Fortschritt

Bestehenden `.fortschritt`-Balken (Gold-Bar) ersetzen durch Dot-Anzeige:
- Erzeuge Dots statt Bar
- Platzierung: am Ende des Aufgaben-Containers (innerhalb Fragebogen)
- Update: bei jeder geloesten Aufgabe Dot-Klasse wechseln

#### 2c. escape-engine.js — Container-Anpassung

In der Render-Funktion (`_renderMappeContent` oder aehnlich):
- Sicherstellen, dass Material-Container und Aufgaben-Container als CSS-Grid-Kinder gerendert werden
- Container-Klassen muessen zum neuen Grid passen
- KEIN Umbenennen bestehender IDs (Rueckwaertskompatibilitaet fuer localStorage-Progress)

### Teil 3: Material-Fortschritt via IntersectionObserver

Implementiere Scroll-basierte Materialverfolgung:
```
// Pseudo-Code
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const pos = entry.target.dataset.position;
      updateMaterialFortschritt(pos);
    }
  });
}, { threshold: 0.3 });

materialElements.forEach(el => observer.observe(el));
```

## Dateien

| Datei | Aenderung |
|-------|-----------|
| `assets/css/base.css` | AENDERN — Grid 2fr/1fr, Sticky-Wechsel, Breakpoint 1024px |
| `assets/css/themes/theme-gpg.css` | ERWEITERN — Notizbuch-Stil (Fragebogen), neue CSS-Variablen, Ueberleitung-Styles |
| `assets/js/escape-engine.js` | ERWEITERN — Material-Fortschritt, Aufgaben-Dots, IntersectionObserver |

## Merge-Schutz

Wenn bei `git pull` oder `git push` Konflikte auftreten:
1. NICHT automatisch aufloesen (kein --theirs, kein --ours)
2. Konflikt-Dateien auflisten und dem User melden
3. Warten auf User-Entscheidung

Grund: Automatische Merge-Resolution hat in der Vergangenheit zu Datenverlust gefuehrt.

## Repo-Struktur (Dokumentation)

Alle Projektdocs liegen unter weitergehts-online/docs/:
- Agenten-Docs: docs/agents/AGENT_*.md, docs/agents/ORCHESTRATOR.md
- Architektur: docs/architektur/WORKFLOW_v2.md (v3), docs/architektur/UPGRADE_PLAN_v3.md
- Analyse/Specs: docs/analyse/DESIGN_SPEC_v3-5_LAYOUT_REDESIGN.md, docs/analyse/PROTOTYP_v3-5_LAYOUT.html
- Checklisten: docs/checklisten/

## Erfolgskriterium

1. Browser oeffnen: `escape-games/gpg-erster-weltkrieg-ursachen/index.html` → Mappe 1 laden
2. Desktop (≥1024px): Material nimmt ~67% Breite, Fragebogen ~33%
3. Fragebogen hat Notizbuch-Optik (kariert, Lochrand oben, Tintenblau)
4. Fragebogen bleibt sticky beim Scrollen durch Materialien
5. Material-Fortschritt zeigt Dots + "Material X von Y"
6. Aufgaben-Fortschritt zeigt Dots statt Balken
7. Ueberleitungen zwischen Materialien: zentriert, mit Pfeil, transparenter Hintergrund
8. Mobile (<1024px): alles gestapelt, kein sticky
9. Hefteintrag (Sicherung) optisch klar unterscheidbar vom Fragebogen

## Verifikation

- [ ] Desktop Chrome (≥1024px): 2/3-1/3 Grid korrekt, Fragebogen sticky
- [ ] Tablet (768-1023px): Single-Column, kein sticky
- [ ] Mobile (320-767px): Single-Column, kein Overflow
- [ ] Architects Daughter laedt (pruefen in DevTools → Network → Fonts)
- [ ] Karomuster sichtbar im Fragebogen
- [ ] Lochrand-Kreise sichtbar oben am Fragebogen
- [ ] Material-Fortschritt-Dots aktualisieren bei Scroll
- [ ] Aufgaben-Dots aktualisieren bei Loesung
- [ ] Alle 7 Materialtypen rendern korrekt (darstellungstext, quellentext, bildquelle, karte, zeitleiste, statistik, tagebuch)
- [ ] Alle 5 Aufgabentypen funktionieren (multiple-choice, zuordnung, lueckentext, reihenfolge, freitext-code)
- [ ] Code-Eingabe funktioniert, Sicherung wird sichtbar
- [ ] Sicherung/Hefteintrag hat weiterhin Caveat/Patrick Hand (NICHT Architects Daughter)
- [ ] Keine `console.error` in DevTools
- [ ] `JSON.parse` der data.json fehlerfrei
- [ ] Print-CSS: Hefteintrag druckt korrekt

## Nach Abschluss

Melde den Abschluss in Cowork mit: "Update: v3.5 Layout-Redesign erledigt. Commit: [hash]. Ergebnis: [...]"
