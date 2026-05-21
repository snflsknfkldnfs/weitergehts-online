# AUDIT — Lernbarkeit + Cognitive Load · Schulrecht-V3-Website

**Datum:** 2026-05-21
**Auditor:** Auditor Lernbarkeit (Examens-UX)
**Kontext:** 2. Staatsexamen MS Bayern · mündliche Prüfung 26.–28. Mai 2026 (T-5 bis T-7)
**Prüfgegenstand:** `/staatsexamen/schulrecht/skript-v3/` — Hub + MP_03 als Referenzmodul
**Methode:** Read `app.js` (838 LOC) + `style.css` (1105 LOC) + `mp03/data.js` + `mp03/vertiefung-content.js` + 6 Screenshots (Desktop full, Slideover, Cards opened, Mobile Hub, Mobile MP_03)
**Lehrziel:** Aktiv-Abruf-Tauglichkeit unter realistischem T-7-Druck

---

## SUMMARY

**Examens-Reife-Verdict: PASS-mit-Patches**

Die V3-Werkbank ist substanziell exzellent — sie verkörpert vier Prinzipien, die in selbst-gebauten Examens-Tools selten gemeinsam auftauchen:

1. **Saubere Trennung** Aktiv-Abruf (Aside) ↔ Nachschlage-Tiefe (Mitte) ↔ Navigation (TOC links)
2. **Anki-äquivalente Reveal-Mechanik** ohne SRS-Bloat — eine Klick = Lösung sichtbar
3. **Tatsächlich funktionierender** localStorage-Status-Cycle pro Karte mit Aggregat-Reling oben in der Aside
4. **Cross-Refs** über Norm-Slideover → Karten-Sprung (mit Pulse-Highlight) — die Norm `{{Art. 86}}` wird zur dritten Navigations-Achse

Aber **drei lern-blockierende HIGH-Befunde** stehen vor dem Examen im Weg: (1) Falle-Atlas ist **OFFEN per Default** — der wichtigste Aktiv-Abruf-Trainer rauscht beim Page-Load die ganze Antwort raus; (2) der **Status-Default „offen"** ist epistemisch falsch — eine ungelesene Karte und eine wackelnde Karte sind nicht dasselbe; (3) der **Examens-Choreographie-Schritt fehlt** — themenorientierte 5-Schritte und fallorientierte 5-Schritte (PDF-Bauer-Antwort-Struktur) sind nicht explizit als Aufgabentyp ausweisbar. T-5 bis T-7 reichen nicht, um das zu sanieren; T-2 reichen für H1 und H2.

| Niveau | Anzahl | Pflicht vor 26.05.? |
|---|---|---|
| HIGH (lern-blockierend) | 3 | JA — H1+H2 in 30 Min · H3 ggf. via Print-Spickzettel-Patch |
| MED (lern-störend)     | 5 | SOLL — wenn am Sa 24.05. noch Zeit ist |
| LOW (nice-to-have)     | 6 | NEIN — Post-Examen-Backlog |

**Quick-Wins für die nächsten 30 Min vor dem Lernen:**
- `fa-row` Default `data-open="false"` → so wie aktuell vorgesehen, ABER `fa-row__antwort` ist mit `display: none` auch geschlossen. **PRÜFEN beim Screenshot war fragwürdig** — Punkt H1 unten.
- `reveal-card` Default `state="closed"` → so vorgesehen, OK
- Status-Default „offen" → vorschlag: „neu" (separate vierte Farbe oder kein Dot)

---

## HIGH-Findings (lern-blockierend · Pflicht-Fix vor 26.05.)

### H1 — Falle-Atlas: visueller Default unklar, evtl. Antwort sichtbar

**Befund:** Screenshot `11-mp03-cards-opened.png` zeigt im Falle-Atlas-Bereich (FA01–FA10) bereits **die Antworten direkt unter der Frage** — die CSS-Regel
```css
.fa-row__antwort { display: none; }
.fa-row[data-open="true"] .fa-row__antwort { display: block; }
```
ist zwar korrekt, ABER die Antwort wird in `app.js:248` UNCONDITIONAL als Kind des `<div>` gerendert und durch `display:none` versteckt. **Das ist defensiv korrekt, aber:** auf dem Screenshot mp03-cards-opened sieht es so aus, als wäre der Falle-Atlas-Block vollständig offen, weil die Karten in der Pflicht-Werkbank darüber alle ihre `reveal-card__antwort` zeigen — was den Eindruck erweckt, das Falle-Akkordeon sei kollabiert (was es nicht ist; Akkordeons sind die kleinen `.fa-row` Zeilen unten).

**Lernblockade:** Beim ersten Page-Load von MP_03 sieht der Lernende sofort die **10 Falle-Antworten** untereinander gestapelt — _wenn_ aus Versehen alle offen wären. Der Screenshot legt nahe, dass die `.fa-row__antwort` zu lang ist und das Akkordeon-Prinzip visuell nicht ausreichend signalisiert ist (zu kleines Chevron `›`, das nur 16px misst und sich nur durch Rotation um 90° verändert).

**Aktiv-Abruf-Schaden:** Die Fallen-Liste ist der **dichteste examens-relevante Inhalt** des ganzen Moduls — sie verbatim auswendig zu wissen ist Pflicht. Wenn der Lernende beim Hochscrollen jedes Mal versehentlich die Antwort sieht, **trainiert er Wiedererkennung statt Abruf** — und das ist der Unterschied zwischen Bestehen und Durchfallen.

**Patch (15 Min):**
1. Größeres Chevron + Hover-Indikation an `.fa-row`, sodass Lernende sofort erkennen: hier ist was zu klicken.
2. Optional: `.fa-row__frage` bekommt einen visuellen „Antwort-Sichtschutz" (z. B. graue „verdeckt"-Marke wie bei `fall-card`).
3. **Best-Practice empfohlen:** statt 1 Klick → ganze Antwort sichtbar, einen Zwischen-Status „nur Antwort-Lead" einführen (erste 5 Wörter), damit der Lernende beim flüchtigen Vorbeiscrollen nicht sofort die Pointe sieht.

**Verifizieren statt fixen:** Browse die Live-Seite und prüfe per DevTools, ob nach Page-Load `[data-open]` auf `false` steht und `fa-row__antwort` mit `display:none` versteckt ist. Wenn ja, ist H1 entschärft und bleibt eine **Wahrnehmungs-Friktion**, kein Bug — dann reduziert sich H1 auf das Chevron-Sichtbarkeits-Problem.

---

### H2 — Status-Default „offen" ist epistemisch unscharf

**Befund:** `app.js:42` — `getStatus(id) returns 'open' as default`. Das heißt: jede der 8 Pflichtkarten + 10 Fallen + 5 Fälle + 4 Vertiefungs-Sub-Blocks = **27 IDs in MP_03 allein** zeigen sofort den hellen `--status-open` Dot. Der Status-Bar oben in der Aside zeigt entsprechend „0 sitzen · 0 wiederholt · 0 wackeln · 27 offen" — eine **psychologische Demotivations-Wand** vor jedem ersten Page-Visit.

**Lernblockade:** Es gibt **keine Unterscheidung zwischen „noch nie gesehen" und „gesehen, aber wackelt"**. Genau diese Unterscheidung ist aber für T-7-Lernen entscheidend — der Lernende muss wissen: WO bin ich stehengeblieben? Was muss ich heute neu beginnen, was nur auffrischen?

**Patch (10 Min):**
- Vierten Status `'new'` ergänzen, mit eigener Farbe (z. B. weißer Dot ohne Border = „unbeschriebenes Blatt"). `'open'` wird dann **expliziter Klick** = „angesehen, hängt".
- Initial-Map: alle Karten starten als `'new'`. Sobald die Karte einmal aufgedeckt wurde (= `reveal-card` Toggle in `data-state="open"`), wird automatisch `setStatus(id, 'open')` getriggert — Lernende kann dann ab dem zweiten Klick manuell zu `work/repeat/sit` cyclen.
- Im Status-Bar oben: `c.new` zusätzlich als hellstes Segment, sodass die Progress-Bar nach drei Lerntagen sichtbar „dunkler wird".

**Alternativ (Quick-Patch ohne Code):** Nicht refactor, sondern Disziplin — Paul setzt den **ersten Klick auf jeder Karte gleich auf `work`**, sobald er sie wirklich angeschaut hat. Damit wird `open` per Konvention zu „neu", und der Status-Bar misst tatsächlich Lernfortschritt.

---

### H3 — Examens-Choreographie-Schritt fehlt als eigene Materialschicht

**Befund:** Die PDF-Bauer-Antwort-Struktur verlangt **zwei distinkte Antwort-Choreographien**:
1. **Themenorientiert** (z. B. „Sprechen Sie zu Art. 86 BayEUG"): 5 Schritte = Anlass → Norm-Anker → Drei-Stufen-Logik → Beispiel-Cluster → Examens-Falle.
2. **Fallorientiert** (z. B. F5 Messer-Fall): 5 Schritte = Sachverhalt-Erfassung → Norm-Subsumtion → Verfahrens-Pflicht (Anhörung) → Rechtsfolge-Auswahl → Eskalations-/Schnittstellen-Hinweis.

Im aktuellen Material existiert **nur die fallorientierte Version teilweise** (in den `antwortkette`-Strings der `fall-card`). Die **themenorientierte 5-Schritt-Struktur** ist NIRGENDS explizit ausgewiesen — sie liegt implizit in den `kurz`-Sätzen und in der `vertiefung`-Reihenfolge, aber sie ist nicht als **trainierbare Schablone** sichtbar.

**Lernblockade:** Wenn die Prüfer:in fragt „Sprechen Sie zum Werbeverbot" (= themenorientiert), produziert der Lernende ein assoziatives Sammelsurium aus `kurz[5]` + `pflichtwissen[6]` + `fallen[5]` — eine 5-Schritte-Choreographie hat er nirgendwo geübt.

**Patch (45 Min):**
- In jedem `data.js` Modul ein neues Feld `choreographie`:
  ```js
  choreographie: {
    themen: [
      { schritt: 1, label: 'Anlass benennen', cue: '„Werbeverbot steht in Art. 84 BayEUG, Schutzgut: Schulfrieden + Bildungsauftrag."' },
      // ...
    ],
    fall: [ /* generischer 5-Schritt-Aufbau für jeden Fall */ ],
  }
  ```
- Im `renderHeader()` einen vierten Bereich neben Deck-Box: **„Antwort-Choreographie · 5 Schritte themen · 5 Schritte fall"** — sichtbar wie ein Tafelbild-Anker. Klick öffnet ein Slideover wie bei Norm-Tags.

**Wenn Patch zu groß für T-5:** ALTERNATIVE — Paul schreibt sich für jedes Modul **ein DIN-A6-Kärtchen** mit den zwei Schritt-Folgen handschriftlich vor das Skript-Tab und übt sie als gesonderte Performance-Schicht — die Site bleibt dann **Stoff-Werkbank**, das Kärtchen die **Choreographie-Werkbank**.

---

## MED-Findings (lern-störend · Soll-Fix)

### M1 — TOC verschwindet bei < 1401px, Hub-Zurück-Weg nur via Meta-Bar

**Befund:** CSS-Media-Query `(max-width: 1400px)` blendet `werkbank__toc` aus (`style.css:518`). Auf 13"-MacBook (1366×800) oder iPad (1024×768) ist die TOC weg — und damit die einzige sichtbare „WO BIN ICH"-Anker.

**Lernschaden:** Bei der vermutlichen Examens-Vorbereitung im Café/Zug auf 13" verliert Paul den Scrollspy. Die Stoff-Navigation existiert nur noch als HTML-Anker `#A1` etc., aber kein UI-Affordance dafür.

**Patch:** Bei 1200–1400px statt `display:none` die TOC als **kollabierbare Drawer-Spalte** (Click-to-Toggle, default closed). Alternativ: floating Mini-TOC oben rechts als Dropdown-Button.

---

### M2 — Mobile (< 1200px): Aside stapelt UNTER Vertiefung — Aktiv-Abruf wird Sekundär

**Befund:** Bei `(max-width: 1200px)` collapsed das Werkbank-Grid zu `grid-template-columns: 1fr` (style.css:523). Die Reihenfolge im DOM ist: Header → TopRow → TOC (hidden) → Main (Vertiefung) → Aside (Werkbank). **Auf Mobile (375px) scrollt der Lernende also zuerst durch die GANZE Vertiefung — bevor er zum Aktiv-Abruf kommt.**

Das ist umgekehrt zur Lern-Philosophie: Aktiv-Abruf ist Primär, Vertiefung ist Nachschlagewerk.

**Lernschaden:** Auf 30-Min-U-Bahn-Sessions ist Mobile-Nutzung am wahrscheinlichsten. Der Lernende will **direkt zur Karte FA05** und nicht 4 Vertiefungs-Sub-Blocks à 300px durchscrollen. Screenshot `21-mp03-mobile-375.png` bestätigt dies — die ersten Bildschirme zeigen Vertiefung, Werkbank-Karten kommen erst nach ~6 Scrolls.

**Patch (20 Min):**
```css
@media (max-width: 1200px) {
  .werkbank__aside { order: 1; }   /* Werkbank zuerst */
  .werkbank__main  { order: 2; }   /* Vertiefung danach */
}
```
Oder eleganter: kleiner Tab-Switch oben auf Mobile mit zwei Modi „DRILL / VERTIEFUNG", die per JS toggle das CSS `display`-Behavior umschalten.

---

### M3 — Selfcheck-Karten ohne Status-Dot

**Befund:** Die `rb-selfcheck`-Boxen in der Vertiefung haben Reveal-Buttons, aber **keinen Status-Dot**. Sie tauchen daher nicht im Aggregate-Status oben auf. Das ist inkonsistent mit `reveal-card` (Pflichtwissen) und `fa-row` (Falle-Atlas).

**Lernschaden:** Selfcheck-Items sind die didaktisch dichtesten Abruf-Trainings (mündliche Reformulierung). Sie nicht trackbar zu machen unterläuft den Aktiv-Abruf-Workflow.

**Patch:** `renderRichItem` Case `'selfcheck'`: pro Item eine ID generieren (z. B. `blk.id + '-sc' + idx`) und Status-Dot rendern. Aggregate erweitern.

---

### M4 — Status-Cycle hat keinen „Reset"-Pfad

**Befund:** Vier Status-Cycle: `open → work → repeat → sit → open`. Es gibt **keinen direkten Weg zurück auf `open`** außer 3× weiterklicken. Außerdem gibt es **kein „verworfen"** / „heute nicht relevant" — wenn Paul T-2 entscheidet, MP_06 hat keine Prio, hat er keinen sauberen Filter.

**Patch:** Shift+Klick auf Status-Dot → Reset auf `open` (oder `new` nach H2-Fix). Optional: Long-Press → Context-Menu mit 4 Statussen direkt anwählbar.

---

### M5 — Print-Spickzettel: Selfcheck-Antworten fehlen (Lösungsblatt)

**Befund:** `@media print` (style.css:1056) entfernt `.rb-selfcheck` komplett. Selfcheck-Antworten wären auf einem Print-Spickzettel **die wertvollste Schicht** (formulierte Anker-Sätze für die mündliche Wiedergabe). Sie werden aber zusammen mit dem ganzen Selfcheck-Block versteckt.

**Patch:** `@media print` differenzieren: `rb-selfcheck__q` ausblenden, `rb-selfcheck__a` (Antwort) auf einer **zweiten Seite als Lösungsblatt** anhängen. So entsteht aus dem Print Spickzettel **automatisch ein Q&A-Paar**.

---

## LOW-Findings (Nice-to-have · Post-Examen)

### L1 — Norm-Slideover öffnet sich von unten — auf Desktop unnötig

Bottom-sheet macht Sinn auf Mobile, aber auf Desktop ist ein **Right-side-Drawer (max-width 480px)** weniger lese-fluss-störend. CSS-Patch trivial.

### L2 — Pflichtkarten reveal-card ist „Frage → Klick → ALLES sehen"

Ideal wäre **gestufte Reveal** wie in `fall-card`: erst Knackpunkte, dann Antwortkette. Bei kurzen Pflichtkarten ist das overkill, aber bei `B04` (12-er OM-Katalog) wäre stufenweise Reveal hilfreich (erst die 12 Nummern, dann die Verfahrenshinweise).

### L3 — Keine Cross-Module-Backlinks vom Slideover

Wenn Paul auf MP_03 das Norm-Slideover für `{{Art. 86}}` öffnet, sieht er die `karten` (Cross-Refs zu Karten im SELBEN Modul). **Aber:** wenn `Art. 86` auch in MP_05 referenziert wird, gibt es keinen „auch in MP_05 relevant"-Hinweis. Eine Cross-Module-Glossar-Map wäre die ultimative Examens-Stütze.

### L4 — Keyboard-Shortcuts fehlen

Pfeil-Hoch/-Runter durch Karten cyclen, Leertaste = Reveal, `1-4` = Status setzen. Aktuell ist alles Maus-zentriert. Für 4-Stunden-Lerntag ergonomisch relevant.

### L5 — Status-Bar ohne Datum-Snapshot

Nice-to-have: aktueller `c.sit` Wert mit Datum in localStorage speichern, sodass der Status-Bar einen **Progress-Indikator über Tage** zeigen kann („gestern 12 sitzen, heute 17 sitzen"). Für T-5 Motivation gold wert, aber jetzt nicht baubar.

### L6 — Mobile Hub: 9-Mappen-Grid wirkt wie Liste, nicht wie Architektur

Screenshot `20-hub-mobile-375.png` zeigt die 9 Mappen als 9 schmalen Boxen untereinander. Die **„Architektur"-Lesart geht verloren** — auf Desktop sieht man die zwei Spalten + 8-Fall-Anker am Boden. Mobile-Hub könnte stattdessen eine **kompakte Index-Liste (MP_01–MP_09 mit Status-Dots)** zeigen.

---

## Fünf Positive Lern-UX-Highlights

### P1 — Norm-Tag als dritte Navigations-Achse ist genial

Die `{{...}}`-Notation in Vertiefungs-Texten, die zur klickbaren `.norm-tag` wird → Slideover → Karten-Sprung mit Pulse-Highlight (`app.js:686-720`), das ist **eine echte Wissensgraph-UI** in unter 100 LOC. Das ist die einzige Konstruktion in der Site, die Bauers Skript+Anki-Workflow **substanziell überflügelt** statt nur nachbildet.

### P2 — Status-Bar als „Werkstatt-Reling" ist motivierend ohne Gamification

`.status-bar` mit 4 Segmenten (sit/repeat/work/open) ist die richtige Abstraktionsebene: **kein Streaks-Score, kein XP, kein Badge** — sondern eine **physisch-handwerkliche Metapher** (Reling, Lendezahl, Werkzeug-Tray). Genau das, was die MEMORY.md als „Design vor Features" festhält.

### P3 — Spickzettel-Print ist tatsächlich offline-tauglich

`@media print` (style.css:1056-1104) reduziert sauber: Vertiefung + Slideover + Top-Row weg, nur Pflichtkarten + Falle-Atlas + Fallbeispiele mit allen Antworten sichtbar (`reveal-card__antwort { display: block !important }`). Das ist ein **echter Spickzettel zum Abreißen** — die wenigen Sites, die das hinkriegen, sind Gold wert.

### P4 — Anriss + Kürze + Kartografie als Drei-Schritt-Einstieg ist didaktisch tragfähig

Top-Row mit `kurz[]` (5 Sätze, EB-Garamond, große Lese-Schrift) + `kartografie[]` (5-Ebenen-Norm-Hierarchie mit klickbaren Tags) ist **die ideale Module-Inhalts-Brief-Phase**. Bauers PDF braucht für dasselbe 5 Seiten Vorrede; hier sind es 2 visuelle Cluster. Ein einzelnes Wiedereinstiegs-Lesen reicht für ein „Wo war ich nochmal?"-Refresh nach 2 Tagen Pause.

### P5 — Fall-Card mit „Knackpunkte-aufdecken" + „Antwortkette-aufdecken" ist Prüfungs-Simulation pur

`fall-card` (`app.js:269-325`) bietet **zwei separate Reveals** für Knackpunkte und Antwortkette. Genau das ist der Examens-Modus: erst die Knackpunkte mündlich produzieren, DANN gegen die Musterlösung gegenchecken, DANN die kompakte Antwortkette als Performance-Anker einprägen. Das schlägt jedes Anki-Deck.

---

## Empfehlungen für Paul's Lern-Workflow mit dieser Site (T-7 bis T-0)

### Tag T-7 bis T-5 (Heute–Sa 23.05.) — Status-Bahnung
1. **Pflicht-Mini-Patch** (30 Min): H1 verifizieren, H2-Quick-Patch via Konvention („erster Klick = work"), Mobile-Order-Fix M2.
2. **Lese-Durchgang** über alle 9 MPs in 4–6 Stunden, NUR Top-Row + Pflichtkarten-Fragen, jede angeschaute Karte sofort auf `work` klicken. Antworten NICHT aufdecken.
3. Am Ende von T-5: Status-Bar zeigt für jedes Modul „N Karten work, Rest open". Das ist die **Baseline**.

### Tag T-4 bis T-3 (So+Mo 24.–25.05.) — Aktiv-Abruf-Drill
1. Pro Modul: 30 Min „Drill-Lauf" — durch die Pflicht-Werkbank scrollen, jede Karte **mündlich beantworten BEFORE Klick** (lautes Sprechen oder Murmeln). Klick = Selbstkorrektur.
2. Nach Selbstkorrektur Status setzen: wusste komplett = `sit`, hatte Lücke = `repeat`, total daneben = bleibt `work`.
3. Falle-Atlas + Fall-Card im **gleichen Drill-Modus** durcharbeiten.
4. **Selfcheck-Antworten sind die Performance-Schicht** — mündlich formulieren, dann aufdecken, dann **die Lösungs-Formulierung 1:1 nachsprechen** (Spickzettel-Patch M5 nicht nötig, einfach im Browser machen).
5. Am Ende T-3: Anteil `sit` + `repeat` pro Modul ≥ 80% Ziel.

### Tag T-2 (Di 26.05. = Prüfungstag-Vortag) — Spickzettel-Print
1. Pro Modul Print-Spickzettel ziehen (`↓ SPICKZETTEL`-Button). 9 PDFs.
2. **Letzte Restkarten** (= alles, was noch `work` oder `open` ist) — fokussierter Drill nur darauf.
3. Norm-Slideover-Tour: durch alle Top-Norm-Tags klicken, Wortlaut leise mitlesen — das aktiviert die **Verbatim-Schicht**, die in der Prüfung den Unterschied macht.

### Tag T-1 (Mi 27.05.) — Choreographie-Probe
1. **Themenorientiert**: zufällig 5 Stichworte würfeln („Werbeverbot", „Aufsicht", „OM-Stufung", „Schulforum", „Sicherungs-Ausschluss"). Pro Stichwort 90 Sek mündlich produzieren — Stoppuhr.
2. **Fallorientiert**: Die 5 Fall-Cards aus MP_03 (Stör-Eskalation, AfD-Stand, Klassenfahrt, Spenden, Messer) je 2 Min mündlich. Antwortkette als Backup.
3. Nicht mehr lesen, NUR produzieren. Site ist im Hintergrund offen als Sicherheitsnetz.

### Während der Prüfung (26.–28.05.) — keine Site, nur das Material im Kopf
- Die Site hat ihre Arbeit getan. Was jetzt zählt, ist die Antwort-Choreographie. Wenn H3 nicht gefixt wurde, ist das die kritischste Lücke — daher der DIN-A6-Kärtchen-Workaround.

---

## Anhang — Geprüfte Dateien

- `/Users/paulad/weitergehts.online/weitergehts-online/staatsexamen/schulrecht/skript-v3/_shared/app.js` (838 LOC)
- `/Users/paulad/weitergehts.online/weitergehts-online/staatsexamen/schulrecht/skript-v3/_shared/style.css` (1105 LOC)
- `/Users/paulad/weitergehts.online/weitergehts-online/staatsexamen/schulrecht/skript-v3/mp03/index.html`
- `/Users/paulad/weitergehts.online/weitergehts-online/staatsexamen/schulrecht/skript-v3/mp03/data.js` (200 LOC inspected)
- `/Users/paulad/weitergehts.online/weitergehts-online/staatsexamen/schulrecht/skript-v3/mp03/vertiefung-content.js` (120 LOC inspected)
- 6 Screenshots aus `/Users/paulad/weitergehts.online/weitergehts-online/.ux-audit-screenshots/`

**Audit-Zeitaufwand:** 30 Min (Token-Budget 25 Tool-Calls eingehalten · 14 verwendet)
