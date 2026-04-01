# Design-Spec v3.5: Layout-Redesign

**Datum:** 2026-03-28
**Status:** Entwurf
**Abhaengigkeiten:** v3.3 (Sequenzierung) abgeschlossen, v3.4 (Guetekriterien) abgeschlossen
**Prototyp:** `docs/analyse/PROTOTYP_v3-5_LAYOUT.html`

---

## 1. Ziele

| # | Ziel | Begruendung |
|---|------|-------------|
| Z1 | 2/3-1/3 Layout: Material dominant, Fragebogen als Sidebar | SuS sollen Material im Blick behalten waehrend sie Fragen beantworten (kein Scrollen zwischen Material und Aufgabe) |
| Z2 | Notizbuch-Stil fuer Fragebogen | Erarbeitungsphase visuell von Sicherung (Hefteintrag) unterscheidbar. Eigene Identitaet: "Arbeitsblatt" vs. "Heft" |
| Z3 | Fortschrittsanzeige pro Material | SuS wissen, wo sie im Materialfluss stehen (Material X von Y) |
| Z4 | Visuelle Uebergaenge optimieren | Ueberleitung-Boxen als narrative Bruecken zwischen Materialien staerker hervorheben |
| Z5 | Responsive: Tablet-First | Unterricht primaer am Beamer/Tablet. Mobile ist Fallback, nicht Primaer-Ziel |

---

## 2. Layout-Architektur

### 2.1 Desktop/Tablet (≥768px): Side-by-Side

```
┌─────────────────────────────────────────────────────┐
│  Einstieg: Narrativ + Problemstellung (full-width)  │
├───────────────────────────┬─────────────────────────┤
│                           │                         │
│   MATERIALIEN (2/3)       │   FRAGEBOGEN (1/3)      │
│                           │                         │
│   scrollbar, sticky       │   sticky, scrollbar     │
│   Material 1              │   Aufgabe 1 ✓           │
│   ─── Ueberleitung ───   │   Aufgabe 2 ●           │
│   Material 2              │   Aufgabe 3 ○           │
│   ─── Ueberleitung ───   │   Aufgabe 4 ○           │
│   Material 3              │   ─── Code-Eingabe ──   │
│   ...                     │                         │
│                           │   [Fortschritt: 1/6]    │
│                           │                         │
├───────────────────────────┴─────────────────────────┤
│  Sicherung: Tafelbild + Hefteintrag (full-width)    │
└─────────────────────────────────────────────────────┘
```

**CSS-Grid:**
```css
.mappe__erarbeitung {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--space-lg);
  align-items: start;
}

.erarbeitung__materialien {
  /* scrollt mit Seite, kein sticky — Material ist Hauptinhalt */
}

.erarbeitung__fragebogen {
  position: sticky;
  top: 1rem;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  /* Notizbuch-Stil (siehe Abschnitt 3) */
}
```

**Aenderung gegenueber Ist-Zustand:**
- Aktuell: `grid-template-columns: 1fr 1fr` (50/50) — Material und Aufgaben gleichgewichtig
- Neu: `grid-template-columns: 2fr 1fr` (67/33) — Material dominant, Fragebogen als kompakte Sidebar
- Aktuell: Material-Spalte ist sticky — Neu: Fragebogen-Spalte ist sticky (Material scrollt, Aufgaben bleiben sichtbar)

### 2.2 Mobile (<768px): Gestapelt

```
┌─────────────────────────┐
│  Einstieg                │
├─────────────────────────┤
│  Material 1              │
│  ─── Ueberleitung ───   │
│  Material 2              │
│  ...                     │
├─────────────────────────┤
│  Fragebogen (Notizbuch)  │
│  Aufgabe 1               │
│  Aufgabe 2               │
│  ...                     │
│  Code-Eingabe            │
├─────────────────────────┤
│  Sicherung               │
└─────────────────────────┘
```

Single-Column, kein sticky. Fragebogen nach allen Materialien.

---

## 3. Notizbuch-Stil Fragebogen

### 3.1 Abgrenzung zum Hefteintrag (Sicherung)

| Eigenschaft | Hefteintrag (Sicherung) | Fragebogen (Erarbeitung) |
|-------------|------------------------|--------------------------|
| Metapher | Schulheft (liniert, Rand) | Arbeitsblatt / Klausurbogen |
| Schriftart | Caveat + Patrick Hand | **Neue Schriftart: Architects Daughter** (oder Kalam) |
| Hintergrund | Creme (#fefcf3), horizontale Linien | Weiss (#ffffff) mit feinem Raster (kariert) |
| Akzentfarbe | Rot (Rand-Linie), Blau/Gruen (Fachbegriffe) | **Tintenblau (#2952A3)** als Primaerfarbe |
| Rand | Roter Seitenrand links | **Lochrand oben** (3 Kreise, wie Klausurbogen) |
| Funktion | Ergebnis-Sicherung (fertig) | Aktives Arbeiten (in progress) |

### 3.2 Visuelle Elemente

**Fragebogen-Container:**
- Hintergrund: Weiss mit feinem Karomuster (CSS repeating-linear-gradient, 24px Abstand, hellgrau #e8e8e8)
- Oberer Rand: 3 Lochpunkte (CSS circles, Position absolut)
- Leichter Schatten: `box-shadow: 2px 2px 8px rgba(0,0,0,0.08)` — Blatt-Effekt
- Abgerundete Ecken unten (border-radius: 0 0 8px 8px)

**Aufgaben-Karten:**
- Kein eigener Hintergrund (transparent auf Karopapier)
- Trenner zwischen Aufgaben: gestrichelte Linie (wie Schnittlinie auf Klausur)
- Aufgaben-Nummer: handschriftlich (Architects Daughter), eingekreist
- Frage-Text: Architects Daughter, 1.05rem
- Optionen (MC): Checkbox-Stil angepasst an Arbeitsblatt-Optik (Kreise statt Rechtecke)

**Fortschrittsanzeige:**
- Position: unten im Fragebogen-Container (sticky bottom)
- Stil: "Aufgabe 2 von 6" als Text + Mini-Dots (gefuellt = geloest, leer = offen, Punkt = aktuell)

### 3.3 Farbschema Fragebogen

| Rolle | Farbe | Hex |
|-------|-------|-----|
| Primaer (Tinte) | Tintenblau | #2952A3 |
| Akzent (Markierung) | Textmarker-Gelb | #FFF176 |
| Erfolg | Gruenstift | #388E3C |
| Fehler | Rotstift | #C62828 |
| Tipp | Bleistift-Grau | #78909C |
| Hintergrund | Weiss | #FFFFFF |
| Raster | Hellgrau | #E8E8E8 |

### 3.4 Schriftart

**Empfehlung: Architects Daughter** (Google Fonts)
- Grund: Handschriftlich, aber besser lesbar als Caveat. Wirkt wie "von Schueler geschrieben" (passend fuer Arbeitsblatt-Metapher). Deutlich unterscheidbar von Caveat/Patrick Hand (Hefteintrag).
- Fallback: Kalam (ebenfalls Google Fonts, etwas runder)
- Import: `@import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');`
- Verwendung: Aufgaben-Nummern, Frage-Texte, Feedback-Texte
- System-Font fuer Optionen/Inputs (Lesbarkeit bei laengeren Texten)

---

## 4. Fortschrittsanzeige

### 4.1 Material-Fortschritt (NEU)

Position: Oberhalb des Materialbereichs, als schmaler Streifen.

```
Material 3 von 9 · Erarbeitung
[● ● ● ○ ○ ○ ○ ○ ○]
```

- Dots zeigen Materialien an (gefuellt = gesehen/gescrollt, leer = noch nicht)
- Farbe der Dots nach `didaktische_funktion`: Einstieg=Gold, Erarbeitung=Navy, Vertiefung=Gruen, Sicherung=Rot
- Aktuelles Material: groesserer Dot oder Ring
- Text: "Material X von Y" + Funktionsbezeichnung

### 4.2 Aufgaben-Fortschritt (ERWEITERT)

Bestehender Fortschrittsbalken wird zu Dot-Anzeige:

```
Aufgabe 2 von 6
[✓ ● ○ ○ ○ ○]
```

- ✓ = geloest (gruen)
- ● = aktuell (tintenblau)
- ○ = offen (grau)

---

## 5. Ueberleitung-Optimierung

### 5.1 Ist-Zustand
- `.material-ueberleitung`: italic, grau, dünner Gold-Rand links
- Wirkt wie Fussnote, nicht wie narrative Bruecke

### 5.2 Soll-Zustand
- Zentriert, groessere Schrift (1.1rem)
- Pfeil-Icon oben (↓ oder ▽), visuell als "Weiterfuehrung"
- Hintergrund: transparenter Gradient (von oben transparent → Mitte leicht getönt → unten transparent)
- Kein harter Rand — stattdessen weicher Uebergang
- Optional: Didaktische-Funktion als Badge ("Vertiefung", "Erarbeitung")

---

## 6. Betroffene Dateien

| Datei | Aenderung | Owner |
|-------|-----------|-------|
| `assets/css/base.css` | Grid 2fr/1fr, Responsive Breakpoints, Sticky-Wechsel | Claude Code |
| `assets/css/themes/theme-gpg.css` | Notizbuch-Stil Fragebogen, neue Farben, Ueberleitung-Styles | Claude Code |
| `assets/js/escape-engine.js` | Material-Fortschritt, Dot-Anzeige, Container-Umstrukturierung | Claude Code |

### Nicht betroffen
- `data.json` Schema (keine neuen Felder)
- `docs/agents/` (keine Agenten-Aenderung)
- `docs/architektur/WORKFLOW_v2.md` (kein Workflow-Aenderung)

---

## 7. Risiken

| Risiko | Massnahme |
|--------|-----------|
| Architects Daughter zu verspielt / schlecht lesbar auf kleinen Screens | Fallback auf System-Font fuer Body-Text, Architects Daughter nur fuer Nummern + kurze Texte |
| 2/3-1/3 zu eng fuer Fragebogen bei 768px | Breakpoint auf 1024px hochziehen, darunter gestapelt |
| Sticky-Fragebogen ueberlappt bei vielen Aufgaben | max-height + overflow-y: auto, interne Scroll-Leiste |
| Karomuster lenkt ab | Subtil halten (0.3 opacity), bei Usability-Test evaluieren |

---

## 8. Verifikation (nach Implementierung)

- [ ] Desktop (1024px+): Material nimmt 2/3, Fragebogen 1/3
- [ ] Fragebogen bleibt sticky beim Material-Scrollen
- [ ] Notizbuch-Stil visuell unterscheidbar von Hefteintrag
- [ ] Architects Daughter laedt korrekt (Google Fonts)
- [ ] Material-Fortschritt zeigt korrekte Position
- [ ] Aufgaben-Dots spiegeln Loesungsstatus
- [ ] Mobile (<768px): gestapelt, kein sticky
- [ ] Ueberleitung-Boxen zentriert, mit Pfeil
- [ ] Keine Regression: alle 7 Material-Typen rendern korrekt
- [ ] Keine Regression: alle 5 Aufgaben-Typen funktionieren
- [ ] Keine Regression: Code-Eingabe + Sicherung-Reveal funktioniert
- [ ] Print-CSS: Hefteintrag druckt weiterhin korrekt
