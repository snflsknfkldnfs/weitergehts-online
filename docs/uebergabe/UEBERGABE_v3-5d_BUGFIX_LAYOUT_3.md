# Uebergabe-Prompt: v3.5d Bugfix Layout-Redesign (Runde 3)

## Kontext

v3.5c Bugfix (Commit 072cbfd) abgeschlossen. Dritte Browser-Review: 4 Bugs. Dieser Prompt behebt alle.

## Pre-Flight

- [ ] `git status` — Working Tree sauber
- [ ] `git pull` — Lokaler Branch aktuell
- [ ] Aktuelle Version der zu aendernden Dateien lesen (NICHT aus dem Prompt uebernehmen)

Falls Pre-Flight fehlschlaegt: STOPP.

## Aufgabe: 4 Bugfixes

### BUG-14: Fehlversuche-System statt Aufgaben-Sperre (ELEMENTAR)

**Ist:** Bei falscher Antwort werden ALLE Radio-Buttons disabled. SuS koennen nicht erneut antworten und gelangen nie zum Freischaltcode. Fundamentaler Spielbruch.

**Soll:** Fehlversuche-System:
1. Bei falscher Antwort: Falsche Option wird rot markiert, kurzes Feedback, aber die Aufgabe bleibt offen. Die falsch gewahlte Option wird als "ausgestrichen" markiert (durchgestrichener Text, graue Farbe, nicht mehr klickbar). Alle ANDEREN Optionen bleiben klickbar.
2. Globaler Fehlversuche-Counter pro Mappe: Sichtbar oben rechts im Fragebogen (z.B. "Fehlversuche: 3"). Persistent in localStorage (NICHT durch Page-Reload zuruecksetzbar).
3. Bei korrekter Antwort: Aufgabe wird wie bisher als geloest markiert, Buchstabe im Loesungswort erscheint.

**Umsetzung JS — `_checkMultipleChoice()`:**
- Entferne die Zeile die ALLE Inputs disabled setzt (`input.disabled = true` in der for-Schleife)
- Stattdessen: NUR die falsch gewahlte Option disablen und CSS-Klasse `aufgabe__option--eliminated` setzen
- Fehlversuche-Counter inkrementieren: Neues Feld `fehlversuche` im Progress-Objekt (neben `aufgaben` und `abgeschlossen`). Bei jedem Fehlversuch: `progress.fehlversuche = (progress.fehlversuche || 0) + 1; saveProgress(mappeId, progress);`
- Submit-Button bleibt enabled nach Fehlversuch. Feedback-Text wechselt (z.B. "Leider falsch — versuche es nochmal!" statt "Versuche die Tipps!")
- Bei korrekter Antwort: Submit-Button und alle Optionen disablen wie bisher

**Umsetzung JS — Fehlversuche-Anzeige:**
- Neue Funktion `_renderFehlversuche(mappeId)`: Erstellt `<div class="fehlversuche" id="fehlversuche-counter">` mit Text "Fehlversuche: X"
- Platzierung: Im Fragebogen-Header (nach dem Titel "Arbeitsblatt"), rechtsbuendig (`float: right` oder flex)
- Update bei jedem Fehlversuch: `_updateFehlversuche(mappeId)` liest Counter aus Progress und aktualisiert Text
- Initial bei Seitenlade: Counter aus localStorage laden und anzeigen (auch wenn 0: "Fehlversuche: 0")

**Umsetzung JS — Auch fuer andere Aufgabentypen:**
- `_checkZuordnung()`: Bei falscher Antwort Fehlversuche-Counter erhoehen, aber Dropdowns NICHT disablen. Falsche Zuordnungen markieren, korrekte behalten.
- `_checkLueckentext()`: Bei falscher Antwort Counter erhoehen, Input nicht disablen. Falsches Wort rot markieren, Input leeren fuer neuen Versuch.
- `_checkReihenfolge()`: Bei falscher Antwort Counter erhoehen, Items nicht disablen. Feedback zeigen, Neuversuch erlauben.
- `_checkFreitextCode()`: Bei falscher Antwort Counter erhoehen, Textarea nicht disablen.

**Umsetzung CSS:**
- `.aufgabe__option--eliminated`: `text-decoration: line-through; opacity: 0.5; pointer-events: none;` (durchgestrichen, ausgegraut, nicht mehr klickbar)
- `.fehlversuche`: `font-family: var(--font-fragebogen); font-size: 0.8rem; color: var(--fb-error); padding: 2px 8px;`
- `.fehlversuche--null`: `color: var(--fb-hint);` (grau wenn 0)

**Umsetzung localStorage:**
- Progress-Struktur erweitern: `{ mappen: { "mappe-1": { abgeschlossen: false, aufgaben: {...}, fehlversuche: 0 } } }`
- `saveProgress()` und `loadProgress()` muessen `fehlversuche` mitlesen/-schreiben (rueckwaertskompatibel: wenn Feld fehlt, default 0)

### BUG-15: Tipp-Material-Links als Titel statt "M1.2"

**Ist:** Material-Referenz-Links in Tipp 1 zeigen "M1.2"-Format (technische ID). Verwirrend fuer SuS.

**Soll:** Links zeigen den Material-Titel als Text. Format: klickbarer Hyperlink mit dem Titel des referenzierten Materials.

**Umsetzung:**
- `escape-engine.js`: In der Tipp-Rendering-Logik wo Material-Links erzeugt werden (ca. Zeile 2410-2418): Statt `refs[m].replace('mat-', 'M').replace(/-/g, '.')` den Titel des referenzierten Materials verwenden.
- Die Materialien sind verfuegbar in `mappe.materialien`. Lookup: `mappe.materialien.find(m => m.id === refs[refIdx])?.titel || refs[refIdx]`
- Link-Text wird der Titel, Link-href bleibt `#mat-id` fuer In-Page-Scroll.
- Falls Mappe-Daten nicht in Scope: Die Materialien muessen beim Tipp-Rendering uebergeben oder aus einem globalen Scope gelesen werden. Pruefe ob `_renderTipps()` Zugriff auf die Mappe-Daten hat.

### BUG-16: Tipp-Button "benutzt"-Zustand nicht erkennbar

**Ist:** `tipp__trigger--used` setzt nur `opacity: 0.8` — kaum sichtbar als Unterschied.

**Soll:** Deutlich erkennbarer Zustand: anderer Hintergrund, Haekchen oder anderes visuelles Signal.

**Umsetzung CSS:**
- `.erarbeitung__aufgaben .tipp__trigger--used`: Entferne `opacity: 0.8`. Stattdessen: `background-color: var(--fb-grid); color: var(--fb-hint); border: 1px dashed var(--fb-hint);` (heller Hintergrund, gestrichelter Rand — "schon benutzt"-Optik)
- Optional: `::after { content: ' ✓'; }` fuer ein subtiles Haekchen nach dem Button-Text

### BUG-17: Loesungswort nach Komplett-Loesung sichtbar machen + korrektes Scrolling

**Ist:** Nach Loesung aller Aufgaben springt die Ansicht zum Code-Eingabefeld (`.code__input`), nicht zum Loesungswort im Arbeitsblatt. Die Buchstaben-Kaestchen zeigen zwar die Buchstaben, aber es gibt keinen visuellen Highlight-Effekt der das zusammengesetzte Wort hervorhebt.

**Soll:**
1. Nach Loesung ALLER Aufgaben: Die Buchstaben-Kaestchen im Arbeitsblatt werden hervorgehoben (Puls-Animation, groessere Schrift, Farbaenderung)
2. Smooth-Scroll geht zu den Buchstaben-Kaestchen (`#code-buchstaben` oder aehnlich), NICHT zum Code-Eingabefeld
3. SuS sehen das Loesungswort, verinnerlichen es, und tippen es dann selbst ins Code-Feld ein

**Umsetzung JS — `_revealFreischaltCode()` oder `_updateFortschritt()` bei Komplett-Loesung:**
- Scroll-Ziel aendern: Statt `codeSection.scrollIntoView()` (Code-Eingabefeld) → `buchstabenContainer.scrollIntoView({ behavior: 'smooth', block: 'center' })` (Buchstaben-Kaestchen)
- CSS-Klasse auf Buchstaben-Container setzen: `.code-buchstaben--komplett` mit Animation
- Jedes einzelne Kaestchen: `.code-buchstaben__feld--reveal` mit gestaffelter Animation (staggered)

**Umsetzung CSS:**
- `.code-buchstaben--komplett .code-buchstaben__feld`: `transform: scale(1.15); border-color: var(--fb-primary); background: rgba(41, 82, 163, 0.08); transition: all 300ms ease;`
- Staggered animation per nth-child: `nth-child(1) { transition-delay: 0ms; } nth-child(2) { transition-delay: 100ms; }` etc. (oder per JS `setTimeout`)
- `.code-buchstaben--komplett`: `padding: var(--space-md); border: 2px solid var(--fb-primary); border-radius: 8px; background: rgba(41, 82, 163, 0.03);` — visueller Rahmen um das komplette Loesungswort

## Dateien

| Datei | Aenderung |
|-------|-----------|
| `assets/js/escape-engine.js` | AENDERN — BUG-14 (Fehlversuche-System fuer ALLE Aufgabentypen), BUG-15 (Material-Titel in Tipps), BUG-16 (kein Code-Aenderung noetig, nur CSS), BUG-17 (Scroll-Ziel + Reveal-Animation) |
| `assets/css/themes/theme-gpg.css` | AENDERN — BUG-14 (eliminated-Option, Fehlversuche-Counter), BUG-16 (used-Trigger visuell), BUG-17 (Komplett-Animation) |

## Merge-Schutz

Wenn bei `git pull` oder `git push` Konflikte auftreten:
1. NICHT automatisch aufloesen
2. Konflikt-Dateien auflisten und melden
3. Warten auf User-Entscheidung

## Erfolgskriterium

Browser: `escape-games/gpg-erster-weltkrieg-ursachen/mappe-1.html`
1. MC falsch beantworten: Nur die gewahlte Option wird durchgestrichen, andere bleiben klickbar
2. Fehlversuche-Counter oben rechts im Fragebogen sichtbar, inkrementiert bei Fehlversuch
3. Seite neu laden: Fehlversuche-Counter bleibt erhalten
4. Tipp 1 zeigt Material-Titel als Links (z.B. "Europakarte 1914"), nicht "M1.2"
5. Benutzte Tipp-Buttons visuell klar anders (heller Hintergrund, gestrichelter Rand)
6. Alle Aufgaben loesen: Buchstaben-Kaestchen werden hervorgehoben, Scroll geht dorthin
7. Buchstaben zeigen das Loesungswort, SuS tippen es selbst ins Code-Feld

## Verifikation

- [ ] `localStorage.clear()`, Seite neu laden
- [ ] MC-Aufgabe: Falsche Antwort waehlen → Option durchgestrichen, andere klickbar, Counter +1
- [ ] Erneut falsch waehlen → Zweite Option durchgestrichen, Counter +2, noch verbleibende Optionen klickbar
- [ ] Richtige Antwort waehlen → Aufgabe geloest, Buchstabe erscheint
- [ ] Seite neu laden → Fehlversuche-Counter persistiert, geloeste Aufgaben bleiben geloest
- [ ] Tipp 1 oeffnen → Material-Titel als klickbare Links, scrollen zum Material
- [ ] Tipp benutzt → Button visuell veraendert (heller, gestrichelt)
- [ ] Alle Aufgaben loesen → Scroll zu Buchstaben-Kaestchen, Highlight-Animation
- [ ] Loesungswort sichtbar in Kaestchen, Code-Feld darunter fuer manuelle Eingabe
- [ ] Code eingeben → Sicherung erscheint
- [ ] Zuordnung falsch beantworten → Counter +1, Neuversuch moeglich
- [ ] Lueckentext falsch → Counter +1, Input wird geleert, Neuversuch moeglich
- [ ] Keine `console.error` in DevTools

## Nach Abschluss

Melde den Abschluss in Cowork mit: "Update: v3.5d Bugfix erledigt. Commit: [hash]. Ergebnis: [...]"
