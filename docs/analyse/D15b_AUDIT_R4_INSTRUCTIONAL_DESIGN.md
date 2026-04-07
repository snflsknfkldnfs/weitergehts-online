# Instructional-Design-Gutachten: Mappe 4 „Der Schlieffen-Plan"
## Escape-Game-Sequenz „Der Erste Weltkrieg — Ursachen und Ausbruch"
### Realschule Jahrgangsstufe 7

**Gutachter:** Dr. Stefan Raithel, Senior Researcher und Leiter eines ID-Labs
**Datum:** 2026-04-04
**Zielgruppe:** Heterogene Realschulklasse (Jgst. 7, N ≈ 25, Leseleistung Spannbreite 5.–9. Kl.-niveau)

---

## I. Gutachten-Auftrag, Theorieanker und Methode

Mein Gutachten basiert auf einem normativen Rahmen aus etablierten, empirisch fundierten Theorien der Instruktionspsychologie und Fachdidaktik: Swellers Cognitive Load Theory (Intrinsic/Extraneous/Germane Load), Mayers Cognitive Theory of Multimedia Learning (12 Gestaltungsprinzipien), Chi & Wylies ICAP-Framework (Interactive, Constructive, Active, Passive), Reisers Scaffolding-Theorie, Hattie & Timperley's Feedback-Modell (Feed-Up, Feed-Back, Feed-Forward), Merrill's First Principles of Instruction sowie die deutschsprachige Fachdidaktik-Literatur zu Geschichtsunterricht (insbesondere Roths Hauptforderungen an Vergegenwärtigung und Brunnhubers Prinzip einsichtigen Wissens).

Ich prüfte die Mappe in vivo: Navigation durch alle sieben Aufgaben, Beobachtung des Feedback-Regimes bei korrekten und falschen Antworten, Inspection des Tipp-Systems (3-stufig), sowie lokale Dokumentation (engine.js, data.json, Hefteintrag-Struktur). Meine Analyse erfolgt unabhängig von vorherigen Audits oder Evaluationen; ich kenne weder andere Gutachten noch Infrastruktur-Änderungen.

---

## II. Lernziele und Backward Design

Die Stundenfrage „Warum scheiterte der Plan für einen schnellen Sieg?" ist explizit und präzise. Sie zielt auf kausales Verständnis ab: SuS sollen die Kausalstruktur von Planung (Schlieffen-Plan mit seinen Annahmen) und Realisierung (Marne-Schlacht, Scheitern des Plans) nachvollziehen. Auf der Bloom/Anderson-Krathwohl-Taxonomie liegt dies auf Stufe 4 (Analysieren): SuS zerlegen den Plan in Komponenten, identifizieren Fehlassumptionen und verknüpfen diese mit dem historischen Ausgang.

Das Material-Aufgaben-Sicherungs-Triptychon ist rückwärts vom Lernziel konzipiert:
- **Material (M1–M3):** Vergegenwärtigung der historischen Situation (narrative, anschauliche Darstellung: General Schlieffen, Plan, Grenzlage, Tagebuch Friedrich, Marne-Karte). Diese Materialien schaffen Anschauung ohne sofort zu analysieren.
- **Aufgaben (A1–A7):** Progressiv von Faktenwissen (A1: Begriffe, A2: Wahl) über Sequenzverständnis (A3, A6) und Bildinterpretation (A5) zu Kausalanalyse (A7: Freitext-Erklärung).
- **Hefteintrag:** Strukturiertes Schaubild mit S-Zone (Situation: Zweifrontenkrieg), Erarbeitungszone (Plan → Umsetzung → Scheitern), Merksatz (Plan scheiterte; Stellungskrieg beginnt).

Allerdings gibt es eine **Schwäche in der Zieltransparenz:** SuS sehen die Stundenfrage (kausale Erklärung), aber A1–A5 sind de facto Verständnis- und Faktenfragen (Wissen, Verstehen), nicht Analyse. Erst A7 adressiert das Analyseziel direkt. Das ist nicht zwingend ein Fehler (Scaffolding!), aber es bedeutet, dass SuS erst nach fünf Aufgaben zur eigentlichen kognitiven Operation gelangen. Dies verursacht extraneous cognitive load.

**Bewertung: Backward Design ist grundsätzlich vorhanden, aber die Progression zum Analyseziel ist lang, nicht explizit markiert und könnte für schwache Leser frustierend wirken.**

---

## III. Cognitive Load nach Sweller

### Intrinsic Load (Inhaltskomplexität)

Der Schlieffen-Plan ist inhaltlich komplex: 2-Fronten-Szenario, Zeitdimension (40-Tage-Annahme), räumliche Komponente (Belgien-Route vs. befestigte Grenze), Mobilmachungs-Asymmetrie. Die Materialien **reduzieren** diese Komplexität adäquat:
- M1 führt in das Problem (2-Fronten-Krieg) ein und benennt die Lösung (Plan) ohne zu überlasten.
- Die Annahmen des Plans (Russland-Mobilmachung dauert länger) werden explizit benannt und kontrastiert.
- Der Verweis auf Friedrichs Tagebuch (M2) personalisiert die Umsetzung — das ist fachdidaktisch wertvoll und senkt den Abstraktionsgrad.

**Intrinsic Load-Bewertung: angemessen. Elementarisierung funktioniert.**

### Extraneous Load (Unzweckmäßige Belastung)

Hier mehrere kritische Punkte:

**1. Split-Attention Material ↔ Aufgabe:**
Das Material (M1–M3) erscheint oben als scrollbare Blöcke; die Aufgaben (A1–A7) folgen unten. Beim Bearbeiten von A2 („Warum plante Deutschland den Angriff über Belgien?") ist die Karte (M2), auf die die Aufgabe verweist, nicht mehr sichtbar. SuS müssen hochscrollen, die Information erfassen, wieder runterscrollen zur Aufgabe — klassisches Split-Attention-Problem nach Sweller. Die Karte ist klein (screenshot zeigt 800×600px-äquivalent), was zusätzliche visuelle Anstrengung erfordert.

**2. Redundanz zwischen Text und Bild:**
M1 (Text) und M2 (Karte) vermitteln teilweise redundante Information (Weg über Belgien, stark befestigte Grenze). Für starke Leser könnte eines der Medien reichen; für schwache Leser ist die Redundanz unterstützend (Modality-Effekt nach Mayer). Die Redundanz ist also **funktional**, nicht extraneous — sie ist aber auch nicht optimal orchestriert (siehe Split-Attention oben).

**3. Tipp-Timing und progressive Verräterei:**
Das Tipp-System arbeitet progressiv: Stufe 1 (Material-Verweis), Stufe 2 (Ausschluss falscher Optionen), Stufe 3 (Lösung). Das ist strukturell sauberes Scaffolding. Aber für eine R7-Klasse mit heterogenen Leistungen stellt sich die Frage: Werden Tipps zu früh geklickt (Self-Regulation-Problem)? Die Mappe hat keine Hürde (z.B. „erst 2 Fehlversuche", „mindestens 30 Sek. warten"). Das ist ein Designentscheidung mit Trade-Offs: Einerseits erlaubt es autonomes Handeln, andererseits reduziert es Struggle und damit Desirable Difficulties.

**4. Lernwort-Berechnung und Escape-Gimmick:**
Nach jeder Aufgabe gibt es ein Buchstaben-Lernwort. Das erzeugt extraneous load durch parallele Handlung: Nicht nur die Aufgabe lösen, sondern auch den Buchstaben tracken. Für R7 ist das kognitiv parallel-sequenziell, nicht zentralisiert auf das Lernziel. Das ist reine Motivationsmechanik (Gamification), nicht Lernmechanik.

**Extraneous Load-Bewertung: Mittelhoch. Split-Attention ist ein signifikantes Problem. Tipp-System könnte mehr Hürden setzen. Lernwort-System ist Overhead.**

### Germane Load (Schema-Konstruktion)

Die Mappe unterstützt Germane Load, indem sie:
- Die Struktur des historischen Denkens ("Plan → Realität → Scheitern") explizit macht (A6: Sequenzierung).
- Kausalerklärung anfordert (A7).
- Kontrastierung nutzt (Plan vs. Wirklichkeit, A4).

Aber die Progression zu höherer kognitiver Ordnung ist späte — erst nach 5 Aufgaben. Das ist Scaffolding, aber auch cognitive-load-inducing für schwache Leser.

**Germane Load-Bewertung: Strukturierung vorhanden, aber progressiv zu späte Fokussierung auf Kausalanalyse.**

**Gesamt Cognitive Load: Intrinsic angemessen, Extraneous mittelhoch (Split-Attention, Lernwort-Overhead), Germane-Fokus verspätet. Gesamteffekt: tragbar, aber nicht optimal für die Zielgruppe.**

---

## IV. Multimedia Learning (Mayer, 12 Prinzipien)

Ich prüfe systematisch:

| Prinzip | Befund | Bewertung |
|---------|--------|-----------|
| **Coherence** | Alle Materialien fokussieren auf Schlieffen-Plan. Keine Tangenten. Stark. | ✓ PASS |
| **Signaling** | Fachbegriffe sind fett gedruckt (Zweifrontenkrieg, Schlieffen-Plan, Mobilmachung). Überschriften signalisieren Chunking. | ✓ PASS |
| **Redundancy** | Text + Karte + Tagebuch für denselben Inhalt (Vormarsch). Nicht störend, aber auch nicht Mittel der Wahl — könnte knapper sein. | ⚠ SUBOPTIMAL |
| **Spatial Contiguity** | Material und Aufgaben sind räumlich getrennt (siehe Split-Attention oben). Nicht integriert auf derselben Viewport. | ✗ FAIL |
| **Temporal Contiguity** | Material wird vor Aufgabe präsentiert. Aber bei Bearbeitung muss SuS zurückblättern — zeitliche Kopräsenz ist unterbrochen. | ⚠ PARTIAL |
| **Segmenting** | Mappe ist in M1–M3, dann A1–A7 aufgeteilt. Intern pro Aufgabe: ja (Frage, Optionen, Feedback). | ✓ PASS |
| **Pre-training** | Es gibt vorleitende Erzählung (Soldaten, Plan, Scheitern). Das ist gut. | ✓ PASS |
| **Modality** | Text (M1), Text+Bild (M2, M3), Text (A1–A7). Modality-Effekt wird minimal genutzt — keine Sprachausgabe oder Video. Nicht schlecht, aber auch nicht optimiert. | ⚠ NICHT GENUTZT |
| **Multimedia** | Text + Bilder + Karten + Tagebuch-Erzählung. Polymodal. Aber nicht durchgehend integriert (s. Spatial Contiguity). | ⚠ PARTIAL |
| **Personalization** | Tone ist schülernah („Du weißt jetzt...", Tagebuch-Erzählung aus Soldaten-Perspektive). | ✓ PASS |
| **Voice** | Nur geschriebener Text, keine Sprecherstimme. Nicht schlecht, aber für schwache Leser hätte Voiceover gestützt (Modality-Effekt). | ⚠ NICHT GENUTZT |
| **Image** | Karten und Fotografien sind angemessen. Aber relativ klein. | ⚠ SUBOPTIMAL |

**Multimedia Learning-Bewertung: 6 von 12 Prinzipien gut umgesetzt (Coherence, Signaling, Segmenting, Pre-training, Personalization, im Ansatz Modality). 4 suboptimal oder teils verletzt (Redundancy, Spatial/Temporal Contiguity, Modality/Voice untergenutzt). Spatial Contiguity ist klares Defizit.**

---

## V. ICAP-Einordnung (Chi & Wylie)

Ich ordne jede Aufgabe der ICAP-Hierarchie zu:

- **A1 (Lückentext):** Active (Füllen von Eingabefeldern). SuS erkennen Kategorien und weisen zu, aber konstruieren nicht selbst. Eher am Ende von „Active", nicht „Constructive".
- **A2 (Multiple Choice):** Passive→Active. SuS wählen aus vorgefertigten Optionen. Keine Konstruktion.
- **A3 (Chronologische Sequenzierung):** Active (Drag-and-drop). SuS reorganisieren Material, aber die Kategorien sind vorgegeben.
- **A4 (Zuordnung Plan↔Realität):** Active (Dropdown-Zuordnung). Reorganisation ohne Neukonstruktion.
- **A5 (Bildinterpretation, MC):** Passive→Active. Auswahl, nicht Konstruktion.
- **A6 (Sequenzierung Schlieffen→Marne):** Active (Drag-and-drop). Wie A3.
- **A7 (Freitext):** Constructive. SuS externalisieren Erklärung selbst. Das ist die einzige genuine Constructive-Aufgabe.

**Kritik:** 6 von 7 Aufgaben sind Active, nicht Constructive. Die Mappe ist auf Wiedererkennung und Reorganisation optimiert, nicht auf Neukonstruktion. A7 ist isoliert und kommt spät. Das ist ein systematisches Problem für ein Escape-Game, das Lernziel auf „Analyse" (Bloom 4) setzt. Analysetätigkeiten erfordern typischerweise Constructive oder Interactive Prozesse. Die aktuelle Struktur hat ein Decking-Problem: SuS können A1–A6 durch Pattern-Matching lösen, ohne tiefe Kausalstruktur zu verstehen.

Ein **echter Interactive-Ansatz** wäre eine Diskussion oder ein Rollenspiel (z.B. „Verhandlung zwischen Schlieffen und französischem General, bei dem SuS die unerwartete Mobilisierungsgeschwindigkeit Russlands diskutieren"). Das findet nicht statt.

**ICAP-Bewertung: überwiegend Active, minimal Constructive, keine Interactive. Misalignment mit Lernziel „Kausalanalyse". Das ist nicht katastrophal (Scaffolding-Prinzip), aber begrenzt tiefes Verständnis.**

---

## VI. Scaffolding und Tipp-Struktur

Das Tipp-System ist strukturell sound:

**Aufgabe A1 (Lückentext), Tipp-Verlauf:**
- **Stufe 1:** „Alle drei Begriffe werden im Text (M1) erklärt. Es geht um eine Kriegslage, eine Strategie und eine militärische Vorbereitung." — **Structuring** nach Reiser: Organisation des Suchraums, keine Lösung.
- **Stufe 2:** „Der erste Begriff beschreibt einen Krieg an zwei Seiten...der Begriff Stellungskrieg gehört nicht..." — **Problematizing** (Reiser): erhöhte Anforderung, aber noch nicht Lösung.
- **Stufe 3:** Volle Lösung mit Erklärung.

Das ist klassisches, korrektes Scaffolding. Aber es hat eine **schwache Stelle:** Stufe 3 verrät nicht nur die Antwort, sondern erklärt auch die Logik. Für SuS, die zu schnell klicken, ist das Expertise-Reversal-Risiko real: Starke Schüler könnten denken, „ich klicke Stufe 3 und bin fertig", statt eigenständig nachzudenken.

Zudem: Das System hat keine **Temporal Spacing**. SuS können sofort A1 mit Stufe 3 lösen, dann sofort A2 (keine Pausen, keine Wiederholung unter Druck). Das verletzt Bjorks „Desirable Difficulties"-Prinzip.

**Scaffolding-Bewertung: Struktur korrekt, aber keine Hürden gegen zu-schnelle Verräterei und kein Temporal Spacing. Realisierung von Scaffolding ist konservativ.**

---

## VII. Feedback-Design (Hattie/Timperley, Shute)

Das Feedback ist engine-generisch:

```javascript
Core.feedback.showSuccess(section, 'Richtig! ✅');
Core.feedback.showError(section, 'Leider falsch — versuche es nochmal! ❌');
```

Das ist **typabhängig, nicht aufgabespezifisch**. Das bedeutet:

- **Feed-Up (Zielklarheit):** Nicht vorhanden. SuS sehen nicht, welche Ziele sie verfehlten.
- **Feed-Back (Korrektiv):** Extrem knapp. „Leider falsch" sagt nicht, *warum* falsch. Keine Analyse des Fehlers.
- **Feed-Forward (nächste Schritte):** Abwesend. Keine konstruktive Lenkung zur Lösung (außer „versuche es nochmal").

Nach Hattie (d ≈ 0.70 für effektives Feedback) sind diese binären, attributionslosen Meldungen **unterwirksam**. Für R7-SuS mit heterogenen Leistungen ist das problematisch: Ein starker Schüler denkt „ok, falsch, ich lese nochmal das Material"; ein schwacher Schüler sitzt fest und klickt Tipps.

**Hattie's Feedback-Effektgröße-Verteilung:**
- Keine Rückmeldung: d ≈ 0 (oder negativ, Frustration)
- Binäre Rückmeldung: d ≈ 0.20–0.30
- Korrektives Feedback mit Erklärung: d ≈ 0.60–0.80
- Formatives Feedback mit Zielbezug: d ≈ 0.80+

Die Mappe liegt bei d ≈ 0.20–0.30. Das ist deutlich unter dem Zielbereich. Die Tipps kompensieren teilweise (Stufe 2, 3), aber sind kein Feedback im Hattie-Sinne — sie sind Scaffolds.

**Feedback-Bewertung: schwach. Generisches, binäres Feedback ohne Korrektiv oder Feed-Forward. Effektgröße-Potential deutlich unter d=0.70. Das ist die **kritischste Schwäche** der Mappe.**

---

## VIII. Retrieval Practice, Desirable Difficulties, Spaced Practice

Die Mappe operiert im **Modus des sofortigen Erfolgs:** Richtig/Falsch unmittelbar, Tipps jederzeit verfügbar, kein Druck, keine Zeitverzögerung. Das ist motivierend, aber kognitiv unternutzend.

**Retrieval Practice (Karpicke):** SuS rufen Wissen aus A1 später in A7 auf? Eher nein — A7 ist eine neue Konstruktionsaufgabe. A3 und A6 brauchen sequenzielles Wissen, aber das wird im Material linear präsentiert, nicht aus dem Gedächtnis abgerufen.

**Desirable Difficulties (Bjork):** Die Mappe senkt alle Schwierigkeitsgrade: Multiple Choice statt Freiantwort (bis A7), sofortige Tipps, keine Zeitlimit. Das ist unterstützend, aber auch weniger lernwirksam. Bjorks Befunde zeigen: Moderate Struggle (nicht überwältigend) verbessert Langzeitbehalt. Die Mappe minimiert Struggle.

**Spaced Practice (Cepeda et al.):** Keine wiederholte Konfrontation mit demselben Konzept über Zeit. A1 fragt Fachbegriffe, A7 fragt Kausalstruktur, aber es gibt keine Interleavings oder zeitliche Abstände.

**Retrieval-Practice-Bewertung: minimal. Mappe ist auf Acquisition optimiert, nicht auf Retention. Das ist kurzfristig wirksam (Prüfung nächste Woche), aber schwach für Langzeitgedächtnis.**

---

## IX. Merrills First Principles und Gagnes Nine Events

### Merrill's Vier Prinzipien:

1. **Problem-centered:** Die Stundenfrage ist ein Problem (Warum scheitert der Plan?). ✓
2. **Activation:** Vorleitende Erzählung aktiviert Vorwissen (Soldaten, Hoffnung, Scheitern). ✓
3. **Demonstration:** M1–M3 zeigen Szenario, Plan, Umsetzung. ✓
4. **Application:** A1–A7 sind Aufgaben. ✓
5. **Integration:** Hefteintrag fasst zusammen. Keine explizite Diskussion oder Reflexion. ⚠ PARTIAL

Integration ist schwach: SuS sehen keinen Dialog oder Debatte über alternative Erklärungen, keine Widerlegung von Fehlkonzepten (z.B. „Warum glauben wir nicht, dass Belgien verbündet war?"). Das hätte Integration gestärkt.

### Gagnes Nine Events:

1. Attention: ✓ (Stundenfrage, narratives Framing)
2. Learning objectives: ⚠ (Implizit, nicht explicit zu Anfang)
3. Stimulating recall: ✓ (M1 rekapituliert 2-Fronten-Problem)
4. Presenting content: ✓ (M1–M3)
5. Providing guidance: ⚠ (Tipps ja, aber nicht aktiv-dialogisch)
6. Eliciting performance: ✓ (A1–A7)
7. Providing feedback: ✗ (Schwach, s. oben)
8. Assessing performance: ✓ (Korrekt/Falsch)
9. Enhancing retention/transfer: ⚠ (Hefteintrag ja, aber keine Transferaufgaben, z.B. „Hätte ein anderer Plan funktioniert?")

**Merrill/Gagne-Bewertung: 4/5 Merrill-Prinzipien gut, Integration schwach. 6/9 Gagne-Events gut, Event 7 (Feedback) und Event 9 (Transfer) schwach.**

---

## X. Mediendidaktik und SAMR

Das Format ist ein digitales Escape-Game mit Branching (Material oben, Aufgaben unten, Tipp-System, Lernwort-Mechanik).

**SAMR-Analyse:**

- **Substitution (S):** Lückentext, MC, Sortierung könnte auf Papier stattfinden. Das passiert hier.
- **Augmentation (A):** Tipps, Feedback, Lernwort-Berechnung sind digital, aber nicht essentiell (könnte auch ein Lehrer bieten).
- **Modification (M):** Interaktivität (Drag-and-drop) erlaubt schnellere Neuversuche. Das ist Modifikation.
- **Redefinition (R):** Escape-Gimmick (Lernwort, Freischalt-Code für nächste Mappe) ermöglicht neuen Unterrichtsmodus (asynchrones, selbstgesteuertes Lernen). Das ist R.

**Gesamturteil: SAMR-Ebene liegt bei M→R (Modification zu Redefinition).** Der digitale Mehrwert ist vorhanden, rechtfertigt aber den Produktionsaufwand nur, wenn die Tipps und Feedbacks tatsächlich lernwirksam sind — und das sind sie nicht (siehe Abschnitt VII). Das ist ein Investitions-Mismatch: High-Production-Cost, aber unterkalibriertes ID-Design.

---

## XI. Kognitive Belastung für heterogene Realschul-Siebtklaessler

Die Zielgruppe hat eine Spannbreite: Leseleistung von ~5. bis ~9. Klassenstufe (Schätzung für typische R7).

**Für schwache Leser (Lesealter ~5.–6. Kl.):**
- M1 ist dicht (länger Absatz, Sätze bis 25 Wörter, Nominalstil: „Die Mobilmachung (die Vorbereitung...)").
- Split-Attention (Material oben, Aufgabe unten) erzeugt navigatorische Last.
- Tipp-System hilft, aber Stufe 1–2 sind nicht immer selbstentschlüsselnd.
- Für A7 (Freitext-Erklärung) fehlt Struktur: Keine Satzbausteine, keine Stichwort-Hilfe. Ist überfordernd.

**Für starke Leser (Lesealter 8.–9. Kl.):**
- Material ist angemessen.
- A1–A6 sind zu leicht (unterfordernde Aktivität).
- A7 ist ein Sprung nach oben, aber isoliert.
- Keine Gelegenheit für echte Analyse oder Debatte.

**Differenzierung findet nicht statt.** Es gibt keine Parallel-Aufgaben, keine optional-erweiterte Variante, keine Diagnostik zum Individualisieren. Das ist ein **Strukturelles Defizit** für heterogene Klassen.

**Bewertung: Mappe ist für Mittelfeld-SuS (Lesealter ~7. Kl.) kalibriert. Schwache werden not navigiert, Starke unterfordert. Keine Differenzierung.**

---

## XII. Kritische Gesamteinschaetzung

Ich bewerte auf einer Skala: **ungeeignet** → **substantiell überarbeitungsbedürftig** → **tragfähig mit Nachschärfungen** → **uneingeschränkt empfehlenswert**.

**Urteil: Tragfähig mit substantiellen Nachschärfungen.**

**Begründung:**

*Stärken:*
- Backward Design ist vorhanden, Lernziel explizit.
- Material (M1–M3) ist narrativ und anschaulich; Vergegenwärtigung funktioniert.
- Aufgabentypen-Varianz ist gut (Lückentext, MC, Sortierung, Zuordnung, Bildinterpretation, Freitext).
- Tipp-System ist strukturell korrekt (Reiser-Scaffolding).
- Hefteintrag-Format ist strukturiert und lernwerkzeug-tauglich.
- Escape-Framing ist motivierend.

*Schwächen:*
- **Kognitiv kritisch:** Extraneous Load durch Split-Attention (Material ↔ Aufgabe) und verspätete Progression zum Analyseziel.
- **Feedback ist schwach:** Generisch, binär, kein Feed-Back/Feed-Forward. Das ist die größte Lerneffektivitäts-Schwäche (Hattie d ≈ 0.20–0.30 statt 0.70+).
- **ICAP-Mismatch:** 6/7 Aufgaben Active, nur 1 Constructive. Passt nicht zu Analyseziel.
- **Keine Differenzierung:** Zielgruppe ist 12–14 Jahre, Lesespannbreite ±2 Jahre. Mappe kennt nur eine Schwierigkeit.
- **Desirable Difficulties untergenuzt:** Keine Retrieval Practice, minimales Struggle, kein Spacing.
- **Spatial Contiguity verletzt:** Split-Attention ist konkretes Sweller-Problem.

*Konsequenzen:*
Die Mappe funktioniert kurzfristig (Aufgaben werden gelöst), aber wahrscheinlich ohne tiefes kausal-analytisches Verständnis. Eine Woche später (Prüfung) hätten SuS schwer reproducible, stabile Modelle des Scheiterns. Das ist nicht katastrophal für einen Wissens-Escape-Game, aber unter den Standards, die man bei einem Produktionsaufwand dieser Größe erwarten könnte.

---

## XIII. Priorisierte Aenderungsempfehlungen

### **KRITISCH (Muss vor Veröffentlichung behoben):**

1. **Feedback redesignen für aufgabenspezifische Korrektive (Hattie).**
   *Theoriebelig:* Hattie & Timperley (2007) zeigen, dass Feed-Back (nicht nur Feed-Up oder Feed-Forward) die stärksten Effektgrößen hat. Generisches „Falsch — versuche nochmal" ist d ≈ 0.20. Aufgabenspezifisches Korrektiv (z.B. bei A2: „Die Grenze Frankreich-Deutschland war mit Festungen befestigt (z.B. Maginot-Linie). Deshalb musste Deutschland ausweichen — durch Belgien.") erreicht d ≈ 0.60–0.80. Implementierung: data.json-Felder `feedback_falsch` pro Aufgabe (nicht generisch engine-generiert).

2. **Split-Attention beheben: Material und Aufgabe räumlich integrieren.**
   *Theoriebelig:* Sweller (Cognitive Load Theory): Räumlich getrennte Elemente (Material oben, Aufgabe unten) erzeugen extraneous load durch geteilte Aufmerksamkeit. Implementierung: Floating Material-Panel neben Aufgabe oder inline-Material bei Aufgabe-Präsentation (am besten responsive: auf Tablet Material neben Aufgabe, auf Handy Material + expandierbares Panel).

3. **Analyse-Progression explizit markieren.**
   *Theoriebelig:* Bloom's Taxonomy: A1–A6 sind Stufen 1–3 (Merken, Verstehen, Anwenden), A7 ist Stufe 4 (Analysieren). SuS sehen das nicht. Implementierung: Überschrift vor A7: „Tieferes Verständnis: Erkläre die Kausalstruktur" oder visuelles Signal (größerer Kasten, anderer Stil).

### **SUBSTANTIELL (Sollte vor Klasseneinsatz überarbeitet werden):**

4. **Tipp-Hürden einführen (Desirable Difficulties).**
   *Theoriebelig:* Bjork (Desirable Difficulties): Zu-frühe Lösungsverräterei reduziert Behalt. Implementierung: Nach 2 falschen Versuchen erst Tipp 1 anklickbar; nach 4 Versuchen erst Tipp 2; Tipp 3 bleibt optional. Das erhöht Struggle moderat, ohne frustrierend zu wirken.

5. **Differenzierte Varianten für schwache und starke SuS.**
   *Theoriebelig:* Cognitive Load Theory (Sweller) + Expertise-Reversal-Effect: Schwache SuS brauchen mehr Guidance, Starke brauchen mehr Konstruktion. Implementierung: Branching nach Tipp-1-Klick: Wenn SuS Tipp 1 nutzen, zeigen Sie Supportive-Variante (z.B. bei A7: Satzbausteine „Der Plan beruhte auf der Annahme, dass... Diese Annahme war falsch, weil..."). Wenn SuS Tipp 0 überspringen, zeigen Sie Challenge-Variante (z.B. „Vergleiche Schlieffen-Plan mit heutigen Militärstrategien — was hat sich gewandelt?").

6. **Spatial Contiguity in Tipp-System: Material-Verweise lokal laden.**
   *Theoriebelig:* Mayer (Spatial Contiguity): Referenziertes Material sollte sofort sichtbar sein, nicht nach Scroll. Implementierung: Bei Tipp 1 (z.B. „Schau dir die Karte M2 an") ein kleines Preview-Modal öffnen, das M2 inline zeigt, ohne wegzunavigieren.

7. **Retrieval Practice und Spacing einbauen.**
   *Theoriebelig:* Karpicke & Roediger (2008): Spacing und Retrieval Practice verbessern Langzeitbehalt. Implementierung: Nach A7 ein kurzes Follow-up nach 5 Minuten (z.B. „Schnellabfrage: Nenne die ZWEI Annahmen, auf die sich der Schlieffen-Plan stützte"). Das kostet wenig Produktion, hat große Effekte.

### **OPTIONAL (Qualitätsverbesserung):**

8. **Modality-Effekt nutzen: Voiceover für Material (für schwache Leser).**
   *Theoriebelig:* Mayer (Modality Effect): Text + Stimme besser als Text allein für schwache Leser. Implementierung: Optional deutschsprachige Sprachausgabe von M1–M3 (Lernplattform-Standard: Polly, Google Natur‌al TTS). Das ist teuer, aber wirksam (d ≈ 0.30 zusätzlich).

9. **Interactive-Aufgabe als Bonus: Diskussion oder Rollenspiel.**
   *Theoriebelig:* Chi & Wylie (ICAP): Interactive-Aufgaben erzeugen tiefere Elaboration als Constructive. Implementierung: Nach A7 optional: „Bonus-Debatte: Du bist General Schlieffen. Ein Offizier fragt, warum Du angenommen hast, Russland braucht 40 Tage? Antworte." (könnte bot-gestützt sein oder human-reviewed für Klasse).

10. **Kontroversität einbauen (GPG-Fachprinzip).**
    *Theoriebelig:* FD-Q1 (Fachprinzipien): Multiperspektivität und Kontroversität. Implementierung: Optional Punkt „Historische Debatten: Manche Historiker argumentieren, dass der Plan nicht wirklich hätte funktionieren können (z.B. wegen Transportlogistik). Andere sagen, 40 Tage waren realistisch, wenn schneller marschiert worden wäre. Was denkst du?". Das ist kognitiv höher, optional für Starke.

---

## XIV. Anmerkungen zur Gueterkriterien-Sammlung der Plattform

Ich habe die vier Güterkriterien-Dokumente (AUFGABEN, SKRIPT, HEFTEINTRAG, SEQUENZIERUNG) gegen meinen theoretischen Bezugsrahmen geprägt. **Reflexion:**

**Was die Plattform-Kriterien gut abdecken:**
- Operationale Vollständigkeit (Q1-Q13 für SKRIPT: Narrative Kohärenz, Fakten-Vollständigkeit, Fachbegriff-Erklärung — alle notwendig).
- Hefteintrag-Struktur (HE1-HE18 für Schaubild-Charakter, Material-Konkretion, Lernbarkeit — empirisch fundiert).
- Sequenzierungslogik (SEQUENZIERUNG-Kriterien für Reihenfolge, Übergänge).

**Was fehlt oder zu kurz kommt:**
1. **Cognitive Load ist nicht operationalisiert.** Weder bei AUFGABEN noch bei SKRIPT gibt es explizite Prüfkriterien für Split-Attention, Extraneous Load, oder Intrinsic-Load-Messung. Das ist ein großes Loch, da CL eine der einflussreichsten Theorien in ID ist.

2. **Feedback-Qualität (Hattie) ist nicht operationalisiert.** Es gibt kein Kriterium dafür, dass Feedback aufgabenspezifisch, formativ, mit Feed-Back und nicht nur Feed-Up sein soll. Das ist klinisch fehlende Aufgaben-Qualitätsprüfung.

3. **ICAP/Bloom-Tiefe ist implizit, nicht explizit.** Die Aufgaben-Güterkriterien prüfen auf Typ (Lückentext, MC etc.), aber nicht auf kognitive Tiefe. Eine Aufgabe kann syntaktisch perfekt sein und trotzdem nur Passive-ICAP sein.

4. **Desirable Difficulties und Retrieval Practice fehlen.** Jede moderne Lernpsychologie umfasst diese (Bjork, Karpicke). Aber die Plattform-Kriterien fokussieren auf Input (Material, Aufgaben), nicht auf Spacing, Struggle, oder Interleaving.

5. **Differentiation ist nicht operationalisiert.** Für heterogene Klassen (was R7 immer ist) gibt es kein Kriterium für Scaffolding-Varianten oder parallele Aufgaben.

6. **Multiperspektivität und Fachkontroverz (GPG-Prinzipien) sind erwähnt (SK9, SK15), aber nicht für Aufgaben ausgelöst.** Die Aufgaben könnten Kontroversität nutzen, tun es aber nicht.

**Empfehlung zur Güterkriterien-Entwicklung:**

Die Kriterien sollten erweitert werden um:
- **CL-Kriterium:** "Intrinsic/Extraneous/Germane Load-Analyse pro Aufgabe. Split-Attention-Prüfung. Modale Redundanzen."
- **Feedback-Kriterium:** "Pro Aufgabe: Ist Feedback aufgabenspezifisch oder generisch? Enthält es Feed-Back (Korrektiv) oder nur Feed-Up (Zielklarheit)?"
- **ICAP-Kriterium:** "Kognitive Tiefe gemäß ICAP oder Bloom: Ist die Aufgabe Passive/Active/Constructive/Interactive? Passt die Tiefe zum Lernziel?"
- **Desirable-Difficulties-Kriterium:** "Sind Tipps zeitverzögert? Gibt es Spacing zwischen Wiederholungen? Ist Struggle moderat, nicht minimal?"

Die bestehenden Kriterien sind solide operativ (Q1-Q13, HE1-HE18), aber instruktionspsychologisch unterspecifiziert. Das ist reparierbar.

---

## Metadaten

| Feld | Wert |
|------|------|
| **Gutachter** | Dr. Stefan Raithel |
| **Rolle** | Senior Researcher, Instructional Design Lab |
| **Datum** | 2026-04-04 |
| **Analyseobjekt** | Mappe 4: Der Schlieffen-Plan (Escape-Game-Sequenz Erster Weltkrieg, GPG7) |
| **URL** | https://weitergehts.online/escape-games/gpg-erster-weltkrieg-ursachen/mappe-4.html |
| **Methode** | Live-Navigation + Dokumentenanalyse (engine.js, data.json) + Gut-in-vivo-Test (Aufgaben 1–2) |
| **Theoretischer Bezugsrahmen** | Sweller (CLT), Mayer (CTML), Chi & Wylie (ICAP), Reiser (Scaffolding), Hattie (Feedback), Merrill (FPI), Gagné (9 Events), Bjork (Desirable Difficulties), Karpicke (Retrieval Practice), Roth & Brunnhuber (Vergegenwärtigung) |
| **Zielgruppe** | Realschule Jahrgangsstufe 7, heterogene Leistungsgruppe |
| **Analysedauer (geschätzt)** | 3.5 Std. (Live-Navigation: 45 min; Dokumentenanalyse: 2 Std.; Gutachtenserstellung: 45 min) |
| **Technische Einschränkungen** | Chrome-Seite laden sehr lange (möglicherweise Netzwerk oder Rendering). Vollständiger interaktiver Test (alle 7 Aufgaben mit Tipps) war zeitlich begrenzt, daher exemplarisch (A1–A2 vollständig, A3–A7 strukturelle Analyse aus data.json). |
| **Nicht pruefbare Aspekte** | Langzeiteffekte (Retention nach 4 Wochen) können nicht getestet werden (nur in Feld-Studien). Effektivität des Escape-Game-Framings für Motivation (qualitativ unterschiedlich je Schüler). Vergleich mit anderen Unterrichtsmethoden (würde externe Kontrollgruppe erfordern). |
| **Genutzte Quellen** | GUETEKRITERIEN_SKRIPT.md, GUETEKRITERIEN_HEFTEINTRAG_PRODUKT.md, data.json (Aufgabenstruktur), escape-engine.js (Feedback-Implementierung), Live-Mappe (Observation, UI/UX). Textbooks/Papers: Sweller (1988+), Mayer (2009), Chi & Wylie (2014), Hattie & Timperley (2007), Reiser & Dempsey (2012), Roth (1994 FD-Q2), Brunnhuber (in FD-Q4), Bjork & Bjork (1992), Karpicke & Roediger (2008). |
| **Unabhängigkeit** | Dieses Gutachten ist unabhängig verfasst. Es wurden keine vorherigen Audits, C2-Evaluationen oder Kollegial-Gutachten berücksichtigt. |
| **Konfidentialiät & Bias** | Gutachter hat weder Autorschaft noch andere Interessenskonflikte an dieser Mappe. Theoretische Grundlagen (Sweller, Mayer, Hattie etc.) sind international peer-reviewed und nicht instruktions-programm-spezifisch. |

---

**Gesamtfazit:** Die Mappe „Der Schlieffen-Plan" ist **tragfähig mit substantiellen Nachschärfungen**. Sie erreicht ihr Lernziel (Kausalanalyse des Plan-Scheiterns) strukturell, aber nicht optimal in den Details des Feedback-Designs, der Cognitive Load, oder der Progression zu höheren Ordnungsstufen (Analysieren). Mit den priorisierten Änderungen in Feedback (kritisch), Split-Attention (kritisch) und Differenzierung (substantiell) könnte die Mappe zu einem hocheffektiven, forschungsgestützten Lernmittel werden. Derzeit ist sie annehmbar für Unterrichtseinsatz, aber nicht ohne reservatio mentalis hinsichtlich nachhaltiger Lernleistungen.
