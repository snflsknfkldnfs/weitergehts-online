# UX-Audit: Visual Hierarchy + Lesbarkeit + Layout
**Schulrecht V3 — Staatsexamen MS Bayern**
Audit-Datum: 2026-05-21
Auditor: UX-Visual-Validation-Agent
Screenshots: 9 (Hub Desktop, mp01/03/05/06 Fullpage, Slideover, Cards+Slideover, Hub+mp03 Mobile 375px)

---

## SUMMARY

| Schwere | Anzahl | Kurzbeschreibung |
|---------|--------|-----------------|
| HIGH    | 4      | Prüfungs-blockierend / Lese-Ermüdung erzwingend |
| MED     | 6      | Lern-störend / Orientierung-brechend |
| LOW     | 5      | Nice-to-have |

---

## HIGH-Findings (prüfungs-blockierend)

### H1 — Fullpage-Module sind visuell monoton: Heading-Hierarchie kollabiert im unteren Drittel
**Screenshot-Referenz:** `01-mp01-desktop-full.png`, `03-mp03-desktop-full.png`, `05-mp05-desktop-full.png`, `06-mp06-desktop-full.png`

**Beobachtung:** Die Fullpage-Ansichten der Module zeigen über ihre gesamte Länge eine nahezu gleichförmige Graustufen-Textur ohne visuell differenzierbare Hierarchie-Ebenen. h2-Überschriften der Sub-Blöcke (z. B. 3.1 Schulleiter:in, 3.2 Lehrerkonferenz) sind im Verhältnis zum laufenden Text zu schwach gewichtet — sie wirken wie normaler Fließtext mit Großbuchstaben-Label, nicht wie strukturierende Trennmarker. Bei langen Modulen (mp03, mp05) gibt es ab dem zweiten Drittel keinen visuellen Reset: Das Auge findet keine Ankerpunkte mehr und wandert ziellos.

**Examens-Relevanz:** Paul wird diese Seiten 2–6 Stunden täglich lesen. Fehlende visuelle Zäsuren zwischen Sub-Blöcken führen zu messbarer Lese-Ermüdung und erschweren das Wiederfinden von Stellen beim Nachschlagen.

**Empfehlung:**
- h2-Sub-Block-Header mit einer horizontalen Trennlinie (`border-top: 2px solid`) oder kontrastiertem Hintergrund (`background: var(--color-surface-muted)`) visuell abheben
- Zwischen den Sub-Blöcken Whitespace von mindestens `margin-top: 3rem` (aktuell geschätzt ~1.5rem) einsetzen
- Optional: Linke Farbmarkierung als Block-Anker (z. B. `border-left: 4px solid var(--color-accent)`)

---

### H2 — Spickzettel-Spalte: Informationsdichte zu hoch, Differenzierung fehlt
**Screenshot-Referenz:** `03-mp03-desktop-full.png`, `05-mp05-desktop-full.png`, `06-mp06-desktop-full.png`

**Beobachtung:** Die rechte Spickzettel-Spalte enthält im Screenshot mehrere Kategorien (Pflichtwissen, Fallen, Fallbeispiele) die visuell nicht klar voneinander abgegrenzt sind. Die Typografie innerhalb der Spalte ist sehr klein (geschätzt 12–13px) und durch die enge Spaltenbreite sehr zeilengedrängt. Die Labels der Kategorien (z. B. "FALLEN", "PFLICHTWISSEN") erscheinen in derselben Textstufe wie die Inhalte darunter — ohne visuellen Abstand oder Farb-/Gewichts-Kontrast der eine Trennung verdeutlicht. Mehrere Text-Blöcke klumpen sichtbar zusammen ohne Breathing Room.

**Examens-Relevanz:** Die Spickzettel-Spalte ist das primäre Aktiv-Abruf-Werkzeug in den Lernphasen. Wenn die Kategorien nicht auf Anhieb differenzierbar sind, bricht der Aktiv-Abruf-Workflow zusammen — Paul muss jeden Eintrag lesen statt gezielt zu navigieren.

**Empfehlung:**
- Kategorie-Labels mit `font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-accent)` als echte Abschnitts-Header designen
- Zwischen Kategorien `margin-top: 1.5rem` + optionale Trennlinie
- Fallen-Einträge mit Warn-Farbe (z. B. `color: var(--color-warning)` oder leichte Hinterlegung) differenzieren
- Zeilenhöhe in der Spalte auf mindestens `line-height: 1.55` erhöhen

---

### H3 — Slideover überdeckt gesamten Viewport-Bereich ohne klares Rückkehr-Signal
**Screenshot-Referenz:** `10-mp03-slideover-open.png`

**Beobachtung:** Der Slideover (Norm-Tag `Art. 89 BV`) öffnet sich im unteren Bereich des Viewports und überlagert sichtbar den Modul-Content darunter. Der Schließen-Button (ESC · SCHLIESSEN) ist am rechten oberen Rand des Slideoverpanels in einem kleinen, wenig kontrastierten Pill-Element vorhanden. Positiv: Das Label ist vorhanden. Kritisch: Der Button ist nicht prominent genug für einen gestressten Prüflings-Kontext — er wirkt wie Metadaten, nicht wie primäre Aktion. Das darunterliegende Modul ist weiterhin scrollbar, was zu Orientierungsverlust führt (wo bin ich im Kontext?).

**Examens-Relevanz:** Paul wird während des Lernens häufig Norm-Tags antippen um Wortlaute nachzuschauen. Wenn der Schließen-Pfad nicht instinktiv klar ist, entsteht Navigations-Overhead der die Konzentration kostet.

**Empfehlung:**
- ESC · SCHLIESSEN-Button vergrößern: mindestens `height: 44px; padding: 0 1.5rem` und mit deutlicher Border oder Hintergrundfarbe (`background: var(--color-surface); border: 1.5px solid currentColor`)
- Hintergrund-Overlay (semi-transparent backdrop) ergänzen, der den Kontext einfriert und gleichzeitig als Klick-Fläche zum Schließen dient
- Alternativ: Slideover als Drawer von rechts der nie über 50% der Bildschirmbreite nimmt (dadurch bleibt der Modul-Context sichtbar)

---

### H4 — Mobile 375px: Volltext-Spalten bei langen Modulen unlesbar, kein erkennbares Chunking
**Screenshot-Referenz:** `21-mp03-mobile-375.png`

**Beobachtung:** Das mp03-Modul auf 375px rendert als sehr langer, kontinuierlicher Textblock. Die Vollbreite-Spalte enthält Fließtext in einer Größe die auf Mobilgeräten für Langzeitlektüre (>30 min) kritisch ist. Sub-Blöcke sind nicht durch Whitespace oder visuelle Marker getrennt erkennbar — die gesamte Seite erscheint als ein einziger Textfluss. Die Breadcrumb-Navigation am Top (SKRIPT V3 · MP_03 · …) ist als winzige Monospace-Kette vorhanden, aber die horizontale Overflow-Situation ist nicht eindeutig erkennbar (könnte clippen). Für ein 25.000px-langes Mobile-Dokument fehlt ein Sticky-Anker oder eine Back-to-Top-Funktion.

**Examens-Relevanz:** Paul wird das Handy für schnelles Nachschlagen unterwegs nutzen. Eine 25.000px lange, unstrukturierte Mobile-Seite macht gezieltes Nachschlagen praktisch unmöglich.

**Empfehlung:**
- Sub-Block-Header auf Mobile mit `padding: 1rem 0; border-top: 2px solid` als visuelle Zäsur
- Sticky "Back to Top"-Button oder Floating-TOC-Pill auf Mobile (einfaches `position: fixed; bottom: 1rem; right: 1rem`)
- Spickzettel-Spalte auf Mobile als ausklappbares Akkordeon ganz oben (vor dem Fließtext) platzieren — gibt schnellen Zugang zum Pflichtwissen ohne scrollen

---

## MED-Findings (lern-störend)

### M1 — Hub-Index Desktop: Card-Metadata ist informationsarm für Entscheidung "Was lerne ich als nächstes?"
**Screenshot-Referenz:** `00-hub-desktop.png`

**Beobachtung:** Die 9 Hub-Cards zeigen jeweils MP-Nummer, Titel, eine Kurzzusammenfassung und 3 Metadaten-Badges (Karten, Fallen, Folien-Zahlen). Die Badges sind sehr klein und ohne visuelle Differenzierung nach Priorität. Es gibt keine Statusinformation über den Lernfortschritt (abgehakt, in Bearbeitung, offen) außer dem "IN BEARBEITUNG"-Label bei mp03 in der Slideover-Ansicht. Für einen Prüflings-Workflow "Was ist mein schwächstes Modul?" geben die Cards keine Entscheidungshilfe.

**Empfehlung:**
- Status-Badge pro Card prominenter machen: farbkodiert (grün = abgeschlossen, gelb = in Bearbeitung, grau = offen), nicht nur Text
- "Karten gesamt" und "Fallen" als die wichtigsten Badges visuell priorisieren (größer / fetter als die anderen)
- Optional: Fortschrittsbalken unter der Card-Description

---

### M2 — Modul-Header Hero: Lesbarkeit der Italic-Kurzzusammenfassung bei langen Texten
**Screenshot-Referenz:** `10-mp03-slideover-open.png` (oberer Viewport-Bereich sichtbar)

**Beobachtung:** Im Modul-Header ist der Einleitungstext in kursiver Schrift gesetzt (EB Garamond Italic). Der Text ist mehrzeilig und enthält komprimierte juridische Information mit vielen Abkürzungen. Kursiver Serif-Text bei kleiner Größe (~14–16px) ist für juridische Abkürzungsdichte (Art. 57 BayEUG + LDO §§ 23-27) anspruchsvoll lesbar, da die Italic-Form bei Monospace-ähnlichen Abkürzungsfolgen zu Legibility-Problemen führt.

**Empfehlung:**
- Einleitungstext entweder in Regular (nicht Italic) oder in einer leicht größeren Skalierung (16–17px) setzen
- Abkürzungsfolgen könnten in Semi-Bold Regular kontrastieren

---

### M3 — Norm-Tag-Inline-Darstellung: Tags schwer von Fließtext zu unterscheiden
**Screenshot-Referenz:** `03-mp03-desktop-full.png`, `05-mp05-desktop-full.png`

**Beobachtung:** Norm-Tags erscheinen im Fließtext in den Fullpage-Screenshots als leicht abgehobene Elemente (Monospace-Schrift, vermutlich leichte Hinterlegung). Bei der Auflösung der Fullpage-Screenshots (sehr komprimiert) ist die visuelle Unterscheidbarkeit zum umgebenden Text gering. Die Klickbarkeit der Tags ist nicht durch ein übliches Link-/Button-Signal (Unterstreichung, Cursor-Änderung, Hover-State) sofort erkennbar.

**Empfehlung:**
- Norm-Tags mit stärkerem Kontrast: z. B. `background: var(--color-tag-bg); border: 1px solid var(--color-tag-border); border-radius: 3px; padding: 1px 4px` deutlicher abheben
- Interaktivitäts-Signal durch `cursor: pointer` + subtile Hover-Unterlegung ergänzen
- Tags sollten im Fließtext auf Anhieb als "klickbares Objekt" erkennbar sein, nicht als Zitat-Formatierung

---

### M4 — LERNDECK-Statistiktabelle: Zahlen ohne Interpretationshilfe
**Screenshot-Referenz:** `10-mp03-slideover-open.png` (LERNDECK · 8 KARTEN Bereich)

**Beobachtung:** Die Statistiktabelle zeigt Karten gesamt (8), Norm-Ebenen (5), Hochprior (8), Fallen (10) als reine Zahl-Label-Paare. Die Zahlen sind rechtsbündig, das Layout ist sauber und gut lesbar. Kritisch ist: "Fallen: 10" bei "Karten gesamt: 8" — das ist mathematisch inkonsistent und verwirrend. Außerdem fehlt jede Orientierung was die Zahlen für das Lernverhalten bedeuten (Hochprior = zuerst lernen? Fallen = besonders gefährlich?).

**Empfehlung:**
- Datenkonsistenz prüfen: Fallen (10) > Karten gesamt (8) ist entweder ein Bug oder erfordert ein Erklärungs-Tooltip
- Kurze Legende oder Tooltip für jede Metrik ergänzen
- "Hochprior" und "Fallen" als besonders handlungsrelevante Metriken farblich hervorheben

---

### M5 — Breadcrumb-Navigation: Zu subtil für schnelle Modul-Orientierung
**Screenshot-Referenz:** `10-mp03-slideover-open.png` (Top-Bar)

**Beobachtung:** Die Breadcrumb `SKRIPT V3 · MP_03 · SCHULBETRIEB (SL · LK-KONFERENZ · OM)` ist als Monospace-Kleintext in der Top-Bar vorhanden und technisch korrekt. Die Schriftgröße ist sehr klein (geschätzt 11–12px). Nach mehreren Stunden Lernen wird dieser Kontext-Anker wichtig — aber seine geringe Sichtbarkeit macht ihn bei Erschöpfung schwer nutzbar. Der Link rechts (`MKDOCS-VERSION VERGLEICHEN →`) hat visuell gleichen Gewicht wie die Navigation, obwohl er eine sekundäre Aktion ist.

**Empfehlung:**
- Breadcrumb auf 13px aufwerten, aktuelles Modul (MP_03) in Semi-Bold
- MKDOCS-VERGLEICHEN-Link in ein Sekundär-/Ghost-Styling überführen (weniger visuelles Gewicht)

---

### M6 — Mobile Hub 375px: Karten zu schmal, Metadata-Badges brechen um oder sind nicht lesbar
**Screenshot-Referenz:** `20-hub-mobile-375.png`

**Beobachtung:** Auf 375px rendert der Hub korrekt als einspaltiger Stack. Die Cards sind vollbreite Blöcke mit Titel, Kurzbeschreibung und den Metadaten-Badges. Die Badges (Karten/Fallen/Folien) erscheinen sehr klein und in einer Zeile gequetscht. Der Titeltext der Cards ist gut lesbar. Die Gesamtlänge der mobilen Hub-Seite mit 9 Cards plus Fußbereich ist lang aber navigierbar. Ein erkennbares Problem: Die Button-Fläche "Starten →" oder ähnliches ist in den Cards nicht sofort als primäre CTA erkennbar.

**Empfehlung:**
- Touch-Target für den "Modul öffnen"-Bereich explizit auf `min-height: 44px` setzen und als primären CTA-Button stylen
- Badges auf Mobile stapeln (zwei pro Zeile) statt alle in einer Zeile

---

## LOW-Findings (Nice-to-have)

### L1 — Farb-Palette wirkt sehr monochrom / entsättigt
**Screenshot-Referenz:** Alle Desktop-Fullpage-Screenshots

**Beobachtung:** Das Design ist bewusst typografisch und monochrom gehalten (offwhite Hintergrund, dunkelgrauer Text, minimale Akzente). Das ist für eine Lern-Umgebung grundsätzlich richtig. Für 5–7 Tage intensive Nutzung kann die fehlende Farbcodierung jedoch dazu führen, dass alle Module "gleich aussehen" — was beim Wiederfinden von Stellen aus dem Gedächtnis erschwert.

**Empfehlung:** Modulspezifische Akzentfarbe (1 Farbe pro Modul, sehr subtil — nur für den linken Anker-Border und den Modul-Identifier) als gedächtnisstimulierende Kodierung.

---

### L2 — Print-CSS: Nicht validierbar aus Screenshots, aber konzeptuell risikoreich
**Screenshot-Referenz:** Kein Screenshot vorhanden

**Beobachtung:** Das Konzept beschreibt ein Print-Layout das auf Spickzettel reduziert. Da kein Print-Preview-Screenshot vorliegt kann keine Validierung erfolgen. Konzeptuelles Risiko: Wenn Print-CSS die Norm-Tags als Klartext rendert ohne ihren Wortlaut, verliert die Print-Version ihren Mehrwert.

**Empfehlung:** Print-Preview-Screenshot für einen späteres Audit ergänzen.

---

### L3 — Self-Check-Bereich: Visuell nicht von Fließtext-Abschnitten unterscheidbar
**Screenshot-Referenz:** `03-mp03-desktop-full.png`, `05-mp05-desktop-full.png`

**Beobachtung:** Self-Check-Blöcke sind in den Fullpage-Screenshots nicht eindeutig als eigenständige Interaktions-Elemente erkennbar — sie verschmelzen visuell mit dem umliegenden Text. Ob Reveal-Karten-Mechanismus (Click-to-Reveal) deutlich als solcher signalisiert wird, ist aus den komprimierten Fullpage-Ansichten nicht sicher beurteilbar.

**Empfehlung:** Self-Check-Blöcke mit `background: var(--color-check-bg); border-left: 4px solid var(--color-accent); padding: 1rem` als dedizierte Übungs-Zone abheben.

---

### L4 — MKDOCS-VERSION-Link: Zweck nicht selbsterklärend
**Screenshot-Referenz:** `10-mp03-slideover-open.png`

**Beobachtung:** Der Link "MKDOCS-VERSION VERGLEICHEN →" in der Top-Bar ist für einen Prüfling der nicht mit der Infrastruktur vertraut ist nicht intuitiv. Was wird verglichen? Mit welchem Ziel?

**Empfehlung:** Label in "→ Quelltext / Rohdaten" oder "→ Textversion" umbenennen, oder als Entwickler-only-Feature ausblenden.

---

### L5 — TOC-Spalte links: Scrollspy-Zustand aus Screenshots nicht validierbar
**Screenshot-Referenz:** Keine Screenshot ab ≥1401px Breite vorhanden

**Beobachtung:** Die Philosophie beschreibt eine TOC-Spalte links ab ≥1401px. Die vorhandenen Screenshots sind auf 1440px Breite, zeigen aber keine sichtbare linke TOC-Spalte. Entweder greift der Breakpoint nicht korrekt, oder die TOC-Spalte ist vorhanden aber wegen der Viewport-Breite knapp außerhalb des Screenshots.

**Empfehlung:** Screenshot auf 1440px+ explizit mit sichtbarer TOC-Spalte aufnehmen und Scrollspy-Behavior (aktive Sektion markiert) validieren.

---

## Positive Highlights

### P1 — Modul-Hero mit großer Typo ist stark
**Screenshot-Referenz:** `10-mp03-slideover-open.png`

Die große Serif-Heading "Rechtl. Ordnung des Schulbetriebs." im Hero-Bereich des Moduls setzt eine klare, ruhige Ankerpunkt-Energie. Die zweizeilige Gestaltung mit Zeilenbruch nach dem ersten Phrase-Element ist typografisch souverän und gibt dem Modul eine eindeutige Identität. Für einen Prüflings-Kontext ist dieser Moment des "Ich weiß wo ich bin" wichtig.

---

### P2 — LERNDECK-Statistik-Block ist konzeptuell brilliant
**Screenshot-Referenz:** `10-mp03-slideover-open.png`

Die kompakte Statistiktabelle (Karten / Norm-Ebenen / Hochprior / Fallen) direkt unter dem Hero gibt Paul vor dem Lesen eine Metaübersicht über den Inhalt. Das ist didaktisch sehr stark — "Ich habe 10 Fallen-Wissen-Einträge in diesem Modul" aktiviert die Aufmerksamkeit gezielt. Das Layout der Tabelle (rechtsbündig Zahlen, linksbündig Labels, klare Zeilenstruktur) ist gut lesbar.

---

### P3 — Breadcrumb mit Sub-Abschnitten ist navigatorisch wertvoll
**Screenshot-Referenz:** `10-mp03-slideover-open.png`

Die Breadcrumb `MP_03 · SCHULBETRIEB (SL · LK-KONFERENZ · OM)` zeigt nicht nur das Modul sondern auch die Sub-Abschnitte. Das gibt kontextuellen Überblick ohne extra Klick. Diese Entscheidung ist für das Nachschlag-Szenario ("Bin ich im richtigen Modul-Abschnitt?") sehr wertvoll.

---

### P4 — Hub-Cards haben gute Informationsdichte für Überblick
**Screenshot-Referenz:** `00-hub-desktop.png`

Das 3-spaltige Grid mit 9 Cards bietet auf einen Blick den Gesamtüberblick aller Prüfungsmodule. Die Kombination aus MP-Nummer, Kurztitel, Beschreibungstext und Metadaten-Badges ist gut ausbalanciert. Die Cards sind gleich groß, was das Scannen erleichtert. Der Hub erfüllt seine Funktion als Orientierungs-Zentrale visuell klar.

---

### P5 — Monospace-Typografie für Norm-Tags ist konzeptuell richtig
**Screenshot-Referenz:** `10-mp03-slideover-open.png` (Slideover-Inhalt)

Die Verwendung von JetBrains Mono für Norm-Tag-Referenzen schafft eine klare semantische Unterscheidung: "Das hier ist ein Gesetzestext-Verweis, kein Fließtext." Dieser typografische Code ist für juristische Studier-Kontexte ideal — er übernimmt die Rolle die in Printjura fett + kursiv spielt. Die Slideover-Überschrift "Art. 89 BV — Dienstherr-Verfassungsanker" ist gut lesbar und der erklärende Zusatztitel nützlich.

---

## Priorisierungs-Empfehlung für die nächsten 5–7 Tage

Da die Prüfung am 26.–28. Mai 2026 ist und Paul täglich mit der Website lernt, sollte die Fix-Reihenfolge sein:

1. **H2 sofort** — Spickzettel-Spalte Kategorie-Differenzierung (30 min CSS-Aufwand, maximaler Lern-Gewinn)
2. **H1 sofort** — Sub-Block-Header-Zäsuren (1h Aufwand, reduziert Lese-Ermüdung signifikant)
3. **H3 heute** — Slideover Schließen-Button + Backdrop (1h Aufwand)
4. **M4 heute** — LERNDECK-Datenkonsistenz prüfen (Bug: Fallen > Karten)
5. **H4 später** — Mobile-Optimierung (2h Aufwand, falls Mobile-Nutzung geplant)
6. **M1–M6** — Kann nach der Prüfung als V3.1 angegangen werden
