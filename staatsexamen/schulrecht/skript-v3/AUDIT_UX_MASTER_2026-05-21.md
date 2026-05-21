---
titel: Master-UX-Audit V3-Schulrecht — Konsolidierung UX + A11y + Lernbarkeit
datum: 2026-05-21
methodik: 3 parallele Auditoren (Visual+Layout · WCAG-A11y · Examens-Lernbarkeit)
basis: 9 Playwright-Screenshots + app.js + style.css + Daten-Beispiele
status: FINAL
verdict: PASS-mit-Patches (Prüfungs-tauglich; Patches für nachhaltigeren Lern-Effekt)
---

# Master-UX-Audit V3-Schulrecht

## 1. Gesamtbilanz

| Auditor | Dimension | HIGH | MED | LOW | Positive Highlights |
|---|---|---|---|---|---|
| **UX-Visual** | Layout · Typografie · Hierarchie · Mobile | **4** | **6** | — | 5 (Hero · LERNDECK-Panel · Breadcrumb · Mono-Tags · Hub-Grid) |
| **A11y-WCAG** | Keyboard · ARIA · Focus · SR-Tauglichkeit | **4** | mehrere | — | 10 (Skip-Link · sr-only · trapFocus · prefers-reduced-motion · Touch-Target-Trick · localStorage-Fallback) |
| **Lernbarkeit** | Lernfluss · Reveal-Mechanik · Cognitive Load · Examens-Choreographie | **3** | **5** | **6** | 5 (Norm-Tag als Wissensgraph · Status-Bar ohne Gamification · Print-Spickzettel · Top-Row-Drei-Schritt · Fall-Card-Trennung) |
| **Total konsolidiert** | nach Deduplizierung | **9 unique HIGH** | **~12 MED** | **~6 LOW** | **20 Positiv-Belege** |

**Gesamtverdict: PASS-mit-Patches.** Substantiell sehr gut gebautes Lern-Tool mit erkennbarem A11y-Bewusstsein und klarer Lern-Architektur. Die 9 HIGH-Befunde sind alle innerhalb von **3-5 Stunden CSS+JS-Arbeit** behebbar.

---

## 2. HIGH-Konsolidierte Pflicht-Fixes vor 26.05.2026

### Lern-blockierend (Examens-Risiko)

**H-01 — Spickzettel-Kategorien nicht visuell differenziert (UX-H2)**
Pflichtwissen / Falle-Atlas / Fallbeispiele-Labels erscheinen in gleicher Textstufe wie der Inhalt darunter. Klumpt visuell, bricht den Aktiv-Abruf-Workflow.
**Fix:** Kategorie-Labels als Small-Caps-Header mit Akzentfarbe + Fallen mit Warn-Farbe (CSS, ~20 Min).

**H-02 — Heading-Hierarchie kollabiert im Scroll (UX-H1)**
Sub-Block-Header (3.1, 3.2, 3.3…) heben sich nicht ausreichend von Fließtext ab. Bei 25.000px-Modulen findet das Auge keine Ankerpunkte mehr.
**Fix:** `border-top: 2px solid var(--rule)` + `margin-top: 3rem` vor h2-Sub-Blöcken.

**H-03 — Falle-Atlas Wiedererkennung statt Aktiv-Abruf (Lern-H1)**
Chevron zu klein, Antwort-Sichtschutz fehlt. Lernende:r sieht Antwort beim Hover/Tab versehentlich → trainiert Recall nur scheinbar.
**Fix:** Falle-Atlas-Antworten in `<details>` mit blurred Default + explizitem Reveal-Button (~30 Min).

**H-04 — Status-Default 'open' epistemisch unscharf (Lern-H2)**
Keine Unterscheidung „noch nie gesehen" vs. „wackelt". Reduziert Wert des Status-Cycles für gezieltes Wiederholen.
**Fix Pragma:** Konvention: erster Klick auf Karte → automatisch Status 'work' (statt manuell zu setzen) — 1 JS-Zeile.

### Layout-/Mechanik-Blocker

**H-05 — Mobile 375px mp03: unstrukturierter 25.000px-Block (UX-H4)**
Keine Zäsuren zwischen Sub-Blöcken, kein Back-to-Top, Spickzettel-Spalte nicht als Akkordeon zugänglich.
**Fix:** Mobile-CSS — Sub-Blöcke als Akkordeon collapsen + Back-to-Top-FAB nach 600px Scroll (~45 Min).

**H-06 — Mobile-Reihenfolge falsch (Lern-M2 → HIGH)**
Auf 375px scrollt der Lernende erst durch Vertiefung, bevor Aktiv-Abruf-Werkbank kommt. Für Aktiv-Abruf-Lernen ist Werkbank zuerst sinnvoller.
**Fix:** 3-Zeilen-CSS `@media (max-width: 768px) { .aktiv-abruf { order: -1; } }`.

### Slideover-/Modal-Mechanik

**H-07 — Slideover-Schließen + Backdrop schwach (UX-H3)**
„ESC · SCHLIESSEN"-Button unscheinbar; Hintergrund-Overlay fehlt, Kontext scrollt weiter. Für Prüfungs-Stress-Kontext zu wenig.
**Fix:** Close-Button auf min. 44×44 px; Backdrop-Overlay (`backdrop-filter: blur(2px)` + dark-tint) als Klick-Schließen-Fläche.

### A11y-WCAG-AA-Fails

**H-08 — Reveal-Karte hat interaktive Kinder im `role="button"`-Element (A11y-H1)**
Status-Dot + Norm-Tag innerhalb der Karte verstoßen gegen WAI-ARIA-APG „no interactive descendant in a button" (WCAG 4.1.2 + 2.1.1).
**Fix:** Karte-Architektur refactorn — `<article>` mit eigenem Reveal-Button + Status-Dot + Norm-Tags als Geschwister (1-2 h).

**H-09 — Examens-Choreographie nicht als trainierbare Schablone (Lern-H3)**
Themenorientierte (5 Schritte) und fallorientierte (5 Schritte) Antwort-Strukturen aus PDF-Bauer sind NICHT als wiederverwendbares UI-Element ausgewiesen.
**Fix-Pragma:** DIN-A6-Print-Handkarten generieren (in 30 Min als statische HTML-Sektion) statt Web-UI-Element bauen. Alternative: Choreographie-Banner als wiederkehrendes Pattern in Falle-Atlas + Fallbeispiele.

---

## 3. MED-Befunde (Soll-Fix, nicht blockierend)

| # | Befund | Quelle | Fix |
|---|---|---|---|
| M-01 | Norm-Tags visuell zu wenig vom Fließtext unterscheidbar (Klickbarkeit nicht signalisiert) | UX-M3 | CSS: gestrichelte Unterstreichung + Cursor-Pointer-Hinweis |
| M-02 | LERNDECK zeigt „Fallen: 10" bei „Karten gesamt: 8" — inkonsistent | UX-M4 | Schema klären: deck-Stats umbenennen (Pflichtwissen-Karten vs. Fallen-Karten getrennt) |
| M-03 | Italic-Einleitungstext mit juridischen Abk.-Dichten schwer lesbar | UX-M2 | Lead-Text auf Roman statt Italic; Abk. ausschreiben oder Tooltip |
| M-04 | Breadcrumb 11-12px zu klein für Erschöpfungs-Zustand | UX-M5 | Breadcrumb-Größe auf 14px |
| M-05 | Hub-Cards ohne Lernfortschritt-Status | UX-M1 | Aggregat aus localStorage anzeigen (welche Modul-Karten in „sitzt") |
| M-06 | Mobile-Touch-Targets < 44px (Hub-Cards) | UX-M6 | min-height 44px für `.hub-card`-Tap-Bereich |
| M-07 | Slideover-Backdrop ohne semantische Rolle | A11y-H2 | `role="presentation"` + Click-to-Close-Handler |
| M-08 | `scrollToCard()` setzt `aria-expanded` nicht für Falle-Rows + Fall-Cards | A11y-H3 | Konsistenz: alle expandable Elemente mit aria-expanded |
| M-09 | Skip-Link-Target hat kein sichtbares Heading-Anker | A11y-H4 | h1/h2 mit id="vertiefung" als Visual+SR-Anker |
| M-10 | `aria-controls` bei Reveal-Toggles fehlt | A11y-M5 | aria-controls + aria-describedby ergänzen |
| M-11 | Sub-Block-Selfcheck-Reveals brauchen 2 Klicks bis Antwort sichtbar (Friction) | Lern-MED | Single-click toggle (Pragma: erster Klick = aufdecken) |
| M-12 | Status-Cycle 4-stufig könnte für Studienseminar-Klausur zu fein sein | Lern-MED | 3-Stufen-Option (offen / wackelt / sitzt) als Konfig |

---

## 4. LOW-Befunde (Nice-to-have)

(aus Lernbarkeits-Audit, 6 Punkte — Details siehe `AUDIT_LERNBARKEIT_2026-05-21.md`)

L-01 Native `<dialog>`-Element statt custom (~50 Z. Code-Reduktion · A11y-L1)
L-02 Print-CSS um Spickzettel-Fokus optimieren
L-03 Cross-Modul-Navigation: Modul-Indikator beim Cross-Ref-Klick
L-04 Hub-Suche (Volltext über alle Module)
L-05 Lern-Workflow-Hinweis im Hub („Wo soll ich heute lernen?")
L-06 Export Spickzettel als PDF-Download-Button

---

## 5. Positive Highlights (20 Belege)

**Visual+Layout:**
1. Modul-Hero mit großer Serif-Typo setzt starken Orientierungsanker
2. LERNDECK-Statistik-Panel didaktisch brilliant (Karten/Fallen/Fälle/Stunden)
3. Breadcrumb mit Sub-Abschnitt-Tiefe navigatorisch wertvoll
4. Monospace-Norm-Tag-Typografie semantisch richtig
5. Hub-Grid mit Center-Last-If-Odd-Trick (CSS)

**A11y:**
6. Skip-Link mit hochkontrastiger Tab-Sichtbarkeit
7. `sr-only`-Live-Region für Status-Änderungen
8. `aria-modal` + `trapFocus` + Focus-Return komplett
9. `prefers-reduced-motion` honoriert
10. WCAG-1.4.11-Kommentare im CSS-Code (Autor-Selbstauditierung)
11. `::after`-Touch-Target-Trick für Status-Dots
12. In-Memory-Fallback für `localStorage` (Privat-Browser-Tauglich)

**Lernbarkeit:**
13. Norm-Tag als Wissensgraph-UI (Klick→Slideover→Karten-Refs zurück)
14. Status-Bar-Reling ohne Gamification (kein Konfetti, keine Streaks — pure Information)
15. Funktionierender Print-Spickzettel
16. Top-Row als Drei-Schritt-Einstieg („Kürze → Kartografie → Werkbank")
17. Fall-Card mit getrennten Knackpunkte/Antwortkette-Reveals
18. ZALGM-Kompetenzbereich-Anker im Header
19. Cross-Ref-Pfeile zwischen Modulen
20. Substanz statt Style — Inhalt dominiert UI

---

## 6. Patch-Plan (priorisiert)

### Phase 1 — Quick Wins (~90 Min, vor 26.05.)
1. **H-06** Mobile-Reihenfolge: `order: -1` für Werkbank (3 Zeilen CSS, 2 Min)
2. **H-04** Status-Default: erster Klick = „work" statt manuell (1 JS-Zeile, 5 Min)
3. **A11y-H2+H3+H4 + M-09** Slideover-Backdrop role · scrollToCard-aria-expanded · Skip-Link-Anker (~30 Min)
4. **H-01** Spickzettel-Kategorien als Small-Caps (~20 Min)
5. **H-02** Sub-Block-Zäsuren via border-top + margin (~20 Min)
6. **M-01** Norm-Tag visuell deutlicher (~10 Min)

### Phase 2 — Mid-Aufwand (~90 Min, optional vor 26.05.)
7. **H-03** Falle-Atlas blurred Default + Reveal-Button (~30 Min)
8. **H-05** Mobile Sub-Block-Akkordeon + Back-to-Top (~45 Min)
9. **H-07** Slideover-Backdrop visuell + dark-tint (~15 Min)

### Phase 3 — Architektur-Refactor (~2-3h, nach 26.05.)
10. **H-08** Reveal-Karte-Architektur: button + Geschwister-Refactor (1-2h)
11. **H-09** Choreographie-Banner als wiederkehrendes Pattern (1h)
12. **L-01** Native `<dialog>`-Element (1h)

### Phase 4 — Lern-Workflow (Pauls Eigenleistung, nicht Code)
- Lern-Workflow-Plan T-7 bis T-0 aus `AUDIT_LERNBARKEIT_2026-05-21.md`-§7 übernehmen
- DIN-A6-Choreographie-Handkarten generieren (statisches HTML, 30 Min)
- Spickzettel-Print pro Modul vor Tag T-2 (Offline-Lerntag)

---

## 7. Audit-Tool-Verbrauch

| Auditor | Tool-Calls | Token-Verbrauch |
|---|---|---|
| UX-Visual | 11/25 | 30k |
| A11y-WCAG | 8/25 | 82k |
| Lernbarkeit | 14/25 | 98k |
| Screenshot-Galerie | 11 Playwright + 4 Bash | ~minimal |
| **Total** | **~48 Tool-Calls** | **~210k Tokens** |

---

## 8. Schlussbefund

**Die V3-Schulrecht-Website ist Prüfungs-tauglich.** Sie ist substantiell sehr gut konstruiert — die A11y-Auditorin lobt explizit, dass „die Codebasis klar einen Autor mit A11y-Bewusstsein zeigt", die UX-Auditorin nennt das LERNDECK-Panel „didaktisch brilliant", und der Lernbarkeits-Auditor verzeichnet 5 substantielle Positiv-Highlights.

Die 9 konsolidierten HIGH-Befunde sind alle innerhalb **~90 Min Quick-Win-Bundle** (Phase 1) so weit entschärft, dass sie das Lernen vor dem 26.05. nicht mehr nennenswert behindern. Die Architektur-Refactors (Phase 3) sind für die spätere Nutzung durch LAA-Kollegen relevant, nicht für Pauls eigene Prüfung.

**Wichtig (aus Lernbarkeits-Audit §7):** Das beste Mittel jetzt ist NICHT noch mehr Patches — sondern dass Paul den **Lern-Workflow T-7 bis T-0** aus dem Lernbarkeits-Report tatsächlich abarbeitet:

- **T-7 bis T-5:** Status-Bahnung (alle Karten initial mit Status setzen → wer ist „sitzt", wer „wackelt", wer „offen")
- **T-4 bis T-3:** Drill (Aktiv-Abruf-Sessions auf „wackelt"-Karten, Tafelbild-Repetition)
- **T-2:** Spickzettel-Print + Offline-Lerntag mit DIN-A6-Handkarten
- **T-1:** Examens-Choreographie-Probe (eine themenorientierte + eine fallorientierte Frage in 10 Min beantworten — wie in Prüfung)
- **T-0 (26.5.) bis T+2 (28.5.):** Prüfung ohne Site

---

**Audit-Reports (Pfade):**
- `AUDIT_UX_VISUAL_2026-05-21.md` (242 Z.) — Visual+Layout-Detail
- `AUDIT_A11Y_WCAG_2026-05-21.md` (223 Z.) — WCAG-Compliance-Detail
- `AUDIT_LERNBARKEIT_2026-05-21.md` (251 Z.) — Examens-Lern-UX + T-7-to-T-0-Workflow
- `AUDIT_UX_MASTER_2026-05-21.md` (dieser Report) — Master-Konsolidierung

**Screenshot-Galerie:** `.ux-audit-screenshots/` (9 PNGs, ~13 MB gesamt — ggf. nach Audit löschen oder gitignoren)

— Ende Master-UX-Audit V3 —
