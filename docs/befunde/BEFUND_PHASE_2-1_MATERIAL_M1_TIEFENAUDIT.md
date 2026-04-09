# TIEFENAUDIT: Phase 2.1 Material-Produktion — Mappe 1

**Datum:** 2026-04-09
**Evaluator:** PM (Cowork Session 26) — Evaluation AUSSERHALB des Q-Gate-Kriterienkatalogs
**Anlass:** Verdacht auf systemische Selbstreferenz: Generator und Q-Gate teilen dieselbe Logik. Reibungslose Q-Gate-PASSes koennten strukturelle blinde Flecken maskieren.
**Methode:** Drei Evaluationsachsen, die KEIN Q-Gate-Kriterium abbildet.

---

## 0. These

Das Q-Gate-System prueft Artefakte gegen Regeln, die vom selben Architektur-Kontext abgeleitet sind wie die Generierungslogik. Strukturelle Defizite, die in BEIDEN Systemen gleichermassen eingebaut sind, werden systematisch unsichtbar. Dieser Befund evaluiert aus externer didaktischer Perspektive.

---

## 1. Achse A — Didaktische Tiefenanalyse

### A-H1: Bildunterschrift entmuendigt Bilderschliessung (HIGH)

**Material:** mat-1-1 (bildquelle)
**Befund:** Die 40-Woerter-BU beschreibt das Foto vollstaendig: "beengt, schlammig, voller Soldaten". Der Erschliessungsimpuls ("Was verraet das Foto ueber die Lebensbedingungen?") wird durch die BU selbst beantwortet. SuS muessen das Foto nicht mehr lesen — die BU liest es fuer sie.

**Didaktische Konsequenz:** Die kognitive Eigenleistung bei der Bilderschliessung (Beobachten → Beschreiben → Deuten) wird uebersprungen. Das Material funktioniert als illustrierter Text, nicht als visuelle Quelle.

**Root Cause:** Der Subagent hat den Auftrag, eine BU zu schreiben, die die tafelbild_knoten "erarbeitbar" macht. Er loest das durch Explizitmachung — nicht durch gezielte Luecken, die SuS fuellen muessen.

**Fix-Ansatz:** SUB_MATERIAL_BILDQUELLE.md braucht eine Regel: "Die BU darf den Erschliessungsimpuls NICHT beantworten. Sie kontextualisiert (Ort, Zeit, Herkunft) und stellt eine offene Frage. Die Beschreibung des Bildinhalts ist Aufgabe der SuS."

### A-H2: Fiktive Figuren als Lehrbuch-Proxies (HIGH)

**Material:** mat-1-2 (Karl Meissner), mat-1-5 (Friedrich von Hartmann)
**Befund:** Beide Tagebucheintraege lassen die Figur Fakten aussprechen, die sie nicht wissen kann:
- Karl (Gefreiter, November 1914): "Die Offiziere nennen es Stellungskrieg — auf 700 Kilometer rueckt niemand vor." Ein Gefreiter in einem Graben kennt keine Frontlaenge. Der Satz ist Lehrbuch, nicht Tagebuch.
- Friedrich (Oberleutnant, November 1917): "Die Offiziere nannten es Materialschlacht — Maschinen gegen Menschen, und die Maschinen gewannen." Analytische Abstraktion im Tagebuchstil. Ein Offizier, der gerade 97 von 120 Kameraden verloren hat, definiert keine Fachbegriffe.

**Didaktische Konsequenz:** Die Materialien behaupten Perspektivitaet, liefern aber Allwissenheit im Ich-Gewand. SuS lernen: "Ein Soldat wusste, dass der Krieg auf 700 km festgefahren war." Das widerspricht dem didaktischen Ziel der Perspektiv-Beschraenkung (Quellenkritik: Was KONNTE der Autor wissen?).

**Root Cause:** Der Subagent hat den doppelten Auftrag: (1) Perspektive einer Figur einnehmen, (2) bestimmte tafelbild_knoten "erarbeitbar" machen. Wenn ein Knoten systemisches Wissen enthaelt (Frontlaenge, Fachbegriff-Definition), kollidieren die Auftraege. Der Agent loest den Konflikt zugunsten der Erarbeitbarkeit — die Figur wird zum Wissenstraeger.

**Fix-Ansatz:** SUB_MATERIAL_TAGEBUCH.md braucht eine Regel: "Wenn ein TB-Knoten systemisches Wissen enthaelt (Gesamtzahlen, Fachbegriff-Definitionen, strategische Analysen), darf die Figur dies NICHT aussprechen. Stattdessen: Die Figur beschreibt ihr ERLEBEN des Phaenomens. Den Fachbegriff/die Zahl liefert der Darstellungstext (ggf. separates Material) oder die Lehrkraft per UG. Alternative: Ein narrativer Rahmen-Satz VOR dem Tagebuch-Absatz (kursiv, Erzaehlerstimme) kontextualisiert, was die Figur nicht wissen kann."

### A-M1: Darstellungstext kognitiv passiv (MEDIUM)

**Material:** mat-1-3 (Giftgas)
**Befund:** Der Text erklaert vollstaendig: Stellungskrieg festgefahren → Generaele suchen Ausweg → Giftgas → Folgen. SuS muessen nichts erschliessen, nur rezipieren. Die Kausalkette (M1-A2 Constraint) ist korrekt eingebaut, aber als fertige Antwort, nicht als zu entdeckende Struktur.

**Didaktische Konsequenz:** Das Material ist R7-konform und SQ-konform, aber kognitiv anspruchslos. Es informiert, aber es aktiviert nicht.

**Root Cause:** Der Dispatch-Constraint M1-A2 verlangt: "Der DT MUSS die KAUSALE Frage beantworten." Der Agent liefert die Antwort — statt den Kausalmechanismus so zu strukturieren, dass SuS die Schlussfolgerung selbst ziehen.

**Fix-Ansatz:** Constraint-Reformulierung: "Der DT MUSS die KAUSALE Frage erarbeitbar machen" statt "beantworten". Konkret: Die Fakten liefern, die den Schluss ermoeglichen, aber den Schluss selbst den SuS ueberlassen. Beispiel: "Seit Monaten lagen sich die Armeen gegenueber. Kein Angriff brachte einen Durchbruch. Am 22. April 1915 setzten deutsche Truppen bei Ypern Chlorgas ein. [Wirkung]. — Warum griffen die Generaele ausgerechnet zu dieser Waffe?"

### A-M2: Blockquote-Format bei rekonstruierten Zitaten (MEDIUM)

**Material:** mat-1-4 (quellentext rekonstruiert)
**Befund:** Zwei Blockquotes formatieren Saetze als Zitate, die keine woertlichen Originalzitate sind. Die Kennzeichnung "Kein woertliches Originalzitat" steht erst im Quellenfeld — NACH den Blockquotes. SuS der 7. Klasse lesen Blockquotes als echte Zitate. Das Format unterlauft die Quellenkritik-Kompetenz, die das Material foerdern soll.

**Didaktische Konsequenz:** SuS diskutieren "Was Falkenhayn SAGTE" — aber Falkenhayn hat das nicht so gesagt. Die Paraphrase wird als Primaerquelle behandelt, weil das Format sie so darstellt.

**Root Cause:** SUB_MATERIAL_QUELLENTEXT.md differenziert vermutlich nicht zwischen primaer und rekonstruiert auf Formatebene. Der UE-001-Constraint fordert die Quellenangabe "rekonstruiert", aber kein Constraint regelt das HTML-Format.

**Fix-Ansatz:** Bei aufbereitung=rekonstruiert: (1) Blockquotes durch kursive Absaetze ersetzen oder (2) JEDES Blockquote mit einem vorangestellten `[sinngemäß]`-Marker versehen. (3) Alternative: Die rekonstruierte Natur VOR dem Zitat benennen, nicht danach.

---

## 2. Achse B — Perspektiv-Integritaet

### B-H1: _meta.perspektivitaet als Alibi-Feld (HIGH)

**Befund:** Die _meta.perspektivitaet-Felder deklarieren Perspektiv-Beschraenkungen, die der Text nicht einhaelt:
- mat-1-2: "Karl weiss nur, was er im Graben sieht." → Karl kennt die Frontlaenge (700 km) und den strategischen Fachbegriff (Stellungskrieg).
- mat-1-5: "Friedrich kennt nur seinen Frontabschnitt." → Friedrich analysiert den Krieg als "Materialschlacht" mit strategischer Klarheit.

**Systematik:** Das Q-Gate prueft, OB das perspektivitaet-Feld existiert und OB es eine Beschraenkung deklariert. Es prueft NICHT, ob der Textinhalt die deklarierte Beschraenkung einhaelt. Das Feld funktioniert als Checkbox, nicht als Validierung.

**Root Cause:** Keine Prueflogik verbindet den _meta-Text mit dem inhalt-Text. Das waere eine semantische Pruefung, die das Q-Gate nicht leisten kann — aber ein Post-Produktion-Audit koennte sie manuell durchfuehren (oder als externe Checklist-Frage formulieren).

**Fix-Ansatz (infrastrukturell):** Neues Q-Gate-Kriterium TYP-TB-PERSPEKTIV: "Pruefe: Enthaelt der inhalt-Text Informationen, die die Figur nach ihrer deklarierten Rolle (Rang, Ort, Zeitpunkt) NICHT wissen kann? Pruefe insbesondere: Gesamtzahlen (Frontlaenge, Totenzahlen ueberregional), Fachbegriff-Definitionen, strategische Analysen." Bewertung: WARN bei 1 Verstoss, FAIL bei >2.

---

## 3. Achse C — System-Selbstreferenz-Audit

### C-CRIT: Generierung und Evaluation teilen identische Wissensbasis (CRITICAL)

**Befund:** Der Subagent, der mat-1-2 produziert, liest dieselben Inputs (SKRIPT, INHALTSBASIS, GERUEST) wie das Q-Gate, das mat-1-2 prueft. Beide operieren im selben Kontext. Das Q-Gate kann nur Abweichungen vom SOLL finden — nicht Defizite im SOLL selbst.

Konkret:
- **SQ-2 (Fachbegriff-Progression):** Prueft _meta.fachbegriffe_eingefuehrt/_referenziert — Listen, die der Subagent selbst erstellt. Der Pruefer validiert die Selbstauskunft des Produzenten.
- **erarbeitbarkeits_check:** Freitext-Feld, in dem der Subagent begruendet, warum sein eigenes Material die Knoten erarbeitbar macht. Das ist eine Selbstbeurteilung, kein externer Test.
- **MQ1-MQ6 + M1-M12:** Pruefkatalog, der strukturelle Korrektheit misst (Schema, Konsistenz, Form). Didaktische Qualitaet (kognitive Aktivierung, Authentizitaet, Erarbeitungs-Eigenleistung) ist nicht operationalisiert.

**Konsequenz:** Das Q-Gate-System ist ein Konsistenz-Gate, kein Qualitaets-Gate. Es stellt sicher, dass der Output regelkonform ist. Es stellt NICHT sicher, dass die Regeln guten Unterricht erzeugen.

### C-Empfehlung: Isolierter Didaktik-Review als Pflichtschritt

Nach Phase 2.1 (Material) und vor Phase 2.2 (Aufgaben) sollte ein EXTERNER Pruefschritt stehen, der NICHT den Q-Gate-Katalog verwendet. Drei Optionen:

**Option A (minimal):** Lehrkraft-Review. 5-Minuten-Checkliste pro Material:
1. Koennen SuS aus DIESEM Text die Kernerkenntnis SELBST ableiten?
2. Weiss die Figur nur, was sie wissen KANN?
3. Regt das Material zum Nachdenken an oder liefert es fertige Antworten?

**Option B (infrastrukturell):** Neuer Vertrag: VERTRAG_PHASE_2-1b_DIDAKTIK_REVIEW.md. Ein separater Agent (NICHT der Produktionsagent) erhaelt NUR die Materialien + Stundenfrage + Zielgruppe (Alter, Schultyp). KEIN Zugang zu GERUEST, SKRIPT, INHALTSBASIS, Schema. Er evaluiert aus der SuS-Perspektive: Verstehe ich das? Muss ich nachdenken? Glaube ich, dass diese Person das so geschrieben hat?

**Option C (hybrid):** PM fuehrt den Didaktik-Review manuell durch (wie in dieser Session), Findings werden als Infrastruktur-Patches in Subagenten-Prompts umgesetzt.

---

## 4. Findings-Zusammenfassung

| ID | Schwere | Material | Finding | Q-Gate-Blindspot |
|---|---|---|---|---|
| A-H1 | HIGH | mat-1-1 | BU beantwortet eigenen Erschliessungsimpuls | Kein Kriterium fuer BU-Laenge/Vorwegnahme |
| A-H2 | HIGH | mat-1-2, mat-1-5 | Figuren als Lehrbuch-Proxies (systemisches Wissen in Ich-Perspektive) | _meta.perspektivitaet wird deklariert, nicht validiert |
| B-H1 | HIGH | mat-1-2, mat-1-5 | _meta.perspektivitaet als Alibi-Feld | Q-Gate prueft Existenz, nicht Einhaltung |
| C-CRIT | CRITICAL | System | Generator und Evaluator teilen Wissensbasis — Selbstbestaetigung | Architektonisch, nicht per Patch loesbar |
| A-M1 | MEDIUM | mat-1-3 | DT kognitiv passiv (fertige Antwort statt Denkanstoesse) | Dispatch-Constraint fordert "beantworten" statt "erarbeitbar machen" |
| A-M2 | MEDIUM | mat-1-4 | Blockquote-Format suggeriert echtes Zitat bei Rekonstruktion | Kein Format-Konsistenz-Kriterium fuer aufbereitung=rekonstruiert |

**Gesamt: 1 CRITICAL (System), 3 HIGH (2 dedupliziert: A-H2 = B-H1), 2 MEDIUM.**

---

## 5. Empfohlene Patches (priorisiert)

| Prio | Patch | Zieldatei | Typ |
|---|---|---|---|
| 1 | SUB_MATERIAL_TAGEBUCH: Perspektiv-Beschraenkungs-Regel (systemisches Wissen → Erzaehlerstimme oder separates Material) | escape-game-generator/agents/SUB_MATERIAL_TAGEBUCH.md | Infrastruktur |
| 2 | SUB_MATERIAL_BILDQUELLE: BU-Beschraenkungs-Regel (BU kontextualisiert, beantwortet nicht) | escape-game-generator/agents/SUB_MATERIAL_BILDQUELLE.md | Infrastruktur |
| 3 | SUB_MATERIAL_QUELLENTEXT: Format-Regel fuer rekonstruierte Zitate ([sinngemäß]-Marker oder kursiv statt blockquote) | escape-game-generator/agents/SUB_MATERIAL_QUELLENTEXT.md | Infrastruktur |
| 4 | Dispatch-Constraint-Sprache: "erarbeitbar machen" statt "beantworten" | MATERIAL_GERUEST + Vertrag-Sprache | Konvention |
| 5 | Neues Q-Gate-Kriterium TYP-TB-PERSPEKTIV (inhalt vs. perspektivitaet-Deklaration) | Q-GATE-MECHANIK.md §7.1 | Infrastruktur |
| 6 | Phase 2.1b Didaktik-Review Vertrag (Option A, B oder C) | Architektur-Entscheidung | Strategisch |

---

## 6. Bewertung der Initialhypothese

**BESTAETIGT.** Das Q-Gate-System prueft Konsistenz, nicht didaktische Qualitaet. Die reibungslosen PASSes sind genuine Konsistenz-PASSes — aber Konsistenz ist nicht Qualitaet. Die drei HIGH-Findings (BU-Vorwegnahme, Lehrbuch-Proxies, Alibi-Perspektivitaet) sind SYSTEMATISCHE blinde Flecken, die in JEDEM Material auftreten werden, solange die Subagenten-Prompts sie nicht adressieren.

Die gravierendste Erkenntnis: Das System produziert formal korrekte, inhaltlich akkurate, didaktisch passive Materialien, die Perspektivitaet behaupten statt einzuhalten.
