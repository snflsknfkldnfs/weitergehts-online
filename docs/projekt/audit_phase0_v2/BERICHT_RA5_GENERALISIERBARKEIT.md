# BERICHT RA5: Generalisierbarkeit der Source-to-Escape-Game-Pipeline
## Phase-0-Qualitaets-Audit v2

**Agent-ID:** RA5 (Review-Agent 5)  
**Dimension:** Generalisierbarkeit (Thementyp-Adaptivitaet)  
**Audit-Datum:** 2026-04-06  
**Basis-Dokumente:** 
- VERTRAG_PHASE_0-1_DIDAKTIK.md (v1.1)
- VERTRAG_PHASE_0-2_INHALT.md (v1.1)
- VERTRAG_PHASE_0-3_SKRIPT.md (v1.1)
- VERTRAG_PHASE_0-4_HEFTEINTRAG.md (v1.0)
- BEFUND_PHASE_0_QUALITAETS_AUDIT.md (v1)

**Pruef-Szenarien:** Industrialisierung (Strukturwandel), Mittelalterliche Staendeordnung (Sozialstruktur), Antike Demokratie (Konzeptgeschichte), Die Pest (Einzelereignis mit Zerlegungsproblem), Kolonialisierung (langfristiger Prozess)

---

## 1. Executive Summary

Die Pipeline wurde mit Erster Weltkrieg (Ereignisgeschichte) entwickelt und ist implizit auf diesen Thementyp optimiert. Heuristiken H1-H5 (Chronologische Schnitte, Schluesselereignisse) setzen Chronologie voraus. Schwellenwerte (≥8 Fakten, ≥2 Akteure, ≥1 Zitat pro Mappe) sind fuer abstrakte Themen (Feudalismus, Demokratie, Wirtschaftssysteme) schwer erreichbar ohne Pseudo-Personifizierung. Das Ordnungsmuster SCPL (Situation-Complication-Problem-Loesung) passt schlecht zu kategorial-vergleichenden oder konzeptuellen Themen. Das fachdidaktische Kriterium SK1 (Vergegenwaertigung als Rueckversetzung in historische Situation) ist fuer abstrakte Themen semantisch inadaequat.

**Befund:** Die Pipeline ist nicht generalisierbar ohne thementyp-adaptive Heuristiken, Schwellenwerte und Qualitaetskriterien. Dies betrifft alle 4 Vertraege.

---

## 2. Findings

### [RA5-F01] H1 (Chronologische Schnitte) und H5 (Schluesselereignis-Anker) nicht kompatibel mit nicht-chronologischen Themen

**Severity:** CRITICAL  
**Betroffene Vertraege:** VERTRAG_PHASE_0-1_DIDAKTIK, VERTRAG_PHASE_0-2_INHALT  
**Beschreibung:**  
Die Heuristiken H1 und H5 in DIDAKTIK-Vertrag §4 und INHALT-Vertrag §3.1 setzen eine natuerliche Chronologie voraus. H1 fordert "Chronologische Schnitte als Mappen-Grenzen", H5 "Schluesselereignis-Anker pro Mappe". Bei nicht-chronologischen Themen (Mittelalterliche Staendeordnung, Feudalismus, Demokratieformen) gibt es kein natuerliches Schluesselereignis und keine zeitliche Struktur, auf der Schnitte platziert werden koennen. Die Pipeline bleibt ohne Fallback in einem planungslosen Zustand.

**Evidenz:**  
- VERTRAG_PHASE_0-1_DIDAKTIK, §2 Input, Zeile 25: `mappen_anzahl` wird User-seitig vorgegeben (3-6), aber Heuristiken H1-H7 zur Aufteilung funktionieren nur bei chronologischen Themen.
- VERTRAG_PHASE_0-1_DIDAKTIK, Heuristiken-Beschreibung (v1.0) nennt keine thementyp-Klassifikation.
- VERTRAG_PHASE_0-2_INHALT, §3.1 (Wikipedia-Recherche): "Mindestens 2 Vertiefungsartikel pro Mappe" setzt voraus, dass Mappen thematisch vorstrukturiert sind — aber diese Strukturierung erfolgt ohne Thementyp-Check.

**Impact:**  
Bei Anwendung auf "Mittelalterliche Staendeordnung": Heuristiken erzeugen willkuerliche Mappen-Grenzen (z.B. "Klerus Mappe 1, Adel Mappe 2, Bauern Mappe 3"). Dies ist zwar technisch moglich, aber didaktisch unmotiviert. Alternative Anordnung (z.B. "Funktionen Mappe 1, Rechte Mappe 2, Wirtschaft Mappe 3") wird nicht ermuendert. AGENT_DIDAKTIK hat keine Entscheidungshilfe.

**Massnahme:**  
Thementyp-Klassifikation einfuehren (CRITICAL, M-QA1 in v1 Audit). Vor Heuristiken H1-H7:
1. AGENT_DIDAKTIK fuehrt Schritt "Thementyp-Bestimmung" ein.
2. Typen: Ereignisgeschichte | Konzeptgeschichte | Kulturgeschichte | Langzeitprozess
3. Pro Typ: Adaptive Heuristiken
   - **Ereignisgeschichte (WK1):** H1-H7 as-is (Chronologische Schnitte, Akteure, Folgenanalyse)
   - **Konzeptgeschichte (Demokratie, Feudalismus, Industrialisierung als System):** Kategoriale Aufteilung (Konzept-Dimension X Fallbeispiel-Dimension). Beispiel Demokratie: Mappe 1 "Athenische Praxis", Mappe 2 "Demokratische Ideale", Mappe 3 "Vergleich moderne/antik".
   - **Kulturgeschichte (Staendeordnung, Mentalitaetsgeschichte):** Akteurs-Perspektivische Aufteilung (wer?) oder Sinn-Bereiche (Religion, Wirtschaft, Familie). Beispiel Staende: Mappe 1 "Weltbild der Staende", Mappe 2 "Taegliches Leben adelig", Mappe 3 "Taegliches Leben Bauern", Mappe 4 "Wandel/Krisen".
   - **Langzeitprozess (Kolonialisierung, Industrialisierung als Prozess):** Phasen-Aufteilung nach Erkenntnisfortschritt oder geographischer Ausdehnung.

**Delta zu v1:** NEU (v1 identifiziert Problem QA-C1, schlaegt Loesung vor; RA5 praezisiert Massnahme mit Typ-Definitions-Matrix)

---

### [RA5-F02] Schwellenwerte in QI3 (≥2 Akteure, ≥1 Zitat pro Mappe) nicht erreichbar bei Konzeptgeschichte

**Severity:** HIGH  
**Betroffene Vertraege:** VERTRAG_PHASE_0-2_INHALT  
**Beschreibung:**  
QI3 Fakten-Vollstaendigkeit fordert ≥2 Akteure und ≥1 Zitat pro Mappe. Bei konzeptuellen Themen (Feudalismus, Marktwirtschaft, Demokratie-Konzept) sind "Akteure" schwach definiert — ein Feudalismus-Mappe kann sich auf institutionelle Strukturen, nicht benannte Personen konzentrieren. Zitate sind fuer abstrakte Konzept-Erklaerungen aus Wikipedia schwer zu extrahieren. Erzwungene Erfuellung fuehrt zu Pseudo-Akteure ("Der Feudalherr", "Der Bauer") und generischen Zitaten.

**Evidenz:**  
- VERTRAG_PHASE_0-2_INHALT, §4 Output, Zeile 76: "`QI3 | Fakten-Vollstaendigkeit | Jede Mappe hat: ≥8 Fakten, ≥2 Akteure, ≥4 Fachbegriffe, ≥1 Zitat, ≥1 Rollenprofil.`"
- VERTRAG_PHASE_0-2_INHALT, §5 Q-Gate, Zeile 99: "`QI3 | Fakten-Vollstaendigkeit | ... Blocker`"
- Keine Unterscheidung zwischen "historischer Person" (Bismarck, Napoleon) und "Perspektivtraeger" (Kaufmann, Bauer, Feudalherr als Rollenprototyp).

**Impact:**  
Bei "Feudalismus-Mappe": Wikipedia-Artikel konzentriert sich auf Struktur/Definition. Konkrete historische Akteure sind Beispiele, nicht Zentrum. Agent muss kunftig Akteure erfinden oder Mappe als QI3-FAIL bewerten, obwohl sie inhaltlich solide ist. Dies kann zu unnoetigem Scheitern oder Fallback-Aktivierungen fuehren.

**Massnahme:**  
QI3 thementyp-bedingt staffeln (M-QA4, teils in v1 vorgesehen):
- **Ereignisgeschichte:** ≥2 historische Personen (as-is)
- **Konzeptgeschichte:** ≥1 historische Person ODER ≥2 Perspektivtraeger (Rollen wie "Kaufmann", "Feudalherr", "Polis-Buerger", definiert durch typische Erfahrung). Zitat optional wenn konzeptueller Denktext vorhanden.
- **Kulturgeschichte:** ≥3 Perspektivtraeger (mindestens 2 verschiedene Staende/Gruppen representiert). ≥1 Quelle (direkt oder Sekundaer-Zitat).

Rollenprofile (bereits in INHALTSBASIS vorgesehen, Zeile 82) als primäre Akteurs-Quelle nutzen.

**Delta zu v1:** BESTAETIGT (v1 QA-H2 identifiziert Problem, v1 M-QA4 schlaegt Loesung vor; RA5 konkretisiert "Perspektivtraeger"-Definition und Staffelung)

---

### [RA5-F03] SK1 (Vergegenwaertigung) semantisch inadequat fuer abstrakte Themen

**Severity:** HIGH  
**Betroffene Vertraege:** VERTRAG_PHASE_0-3_SKRIPT, GUETEKRITERIEN_SKRIPT.md (referenziert)  
**Beschreibung:**  
SK1 Vergegenwaertigung fordert nach GUETEKRITERIEN_SKRIPT.md: "Vergegenwaertigung der Situation" — Roth B1 Prinzip der Historischen Vergegenwärtigung als emotionale/imaginative Rueckversetzung. Bei ereignisgeschichtlichen Themen (WK1: Soldatenfronten, Heimatfront) ist dies semantisch korrekt. Bei abstrakten Themen (Wirtschaftssystem, Staatsverfassung, Feudalismus-Logik) gibt es keine "Situation", in die man sich zurueckversetzen kann. Ein Erfuellungs-Versuch ("Stell dir vor, du bist ein Feudalherr...") verfaelscht das Konzept-Verstaendnis.

**Evidenz:**  
- VERTRAG_PHASE_0-3_SKRIPT, §5.2 Fachdidaktische Pruefung: "`SK1-SK7 (Vergegenwaertigung, Elementarisierung, Anschaulichkeit, Strukturiertheit, Sprachliche Angemessenheit, Phasenfolge, Multikausalitaet) | BLOCKER`"
- GUETEKRITERIEN_SKRIPT.md (nicht in den gelesenen Vertraegen enthalten, aber referenziert) definiert SK1 als Roths Vergegenwärtigung.
- Keine Alternative fuer konzeptuelle Themen.

**Impact:**  
AGENT_SKRIPT kann bei Konzeptgeschichte SK1 nicht erfuellen ohne das Konzept in Pseudo-Narrative zu verfaelschen. Q-Gate schlaegt fehl oder Agent produziert didaktisch fragwuerdiges Material. Downstream-Lehrkraft erhaelt invalides Skript.

**Massnahme:**  
SK1 thementyp-bedingt interpretieren (M-QA5):
- **Ereignisgeschichte:** Vergegenwaertigung = Emotionale Rueckversetzung (Roth, as-is)
- **Konzeptgeschichte:** Vergegenwaertigung = Konkretisierung an historischem Fallbeispiel. Schema: "Konzept [Definition] → Athen [Fallbeispiel 1] → Rom [Fallbeispiel 2] → Modern [Fallbeispiel 3]". Kraeftigung durch Kontraste, nicht Imaginationen.
- **Kulturgeschichte:** Vergegenwaertigung = Perspektivische Situierung in alltaeglichen Erfahrungsraeumen (nicht Groß-Ereignisse, sondern "Wie lebte ein Bauer?", "Welche Rechte hatte ein Kaufmann?").

Aenderung in GUETEKRITERIEN_SKRIPT.md als neuer Absatz unter SK1.

**Delta zu v1:** BESTAETIGT (v1 QA-H3 identifiziert Problem; M-QA5 schlaegt Loesung vor; RA5 konkretisiert Interpretationen)

---

### [RA5-F04] SCPL-Struktur erzwingt Narrative auch bei nicht-narrativen Ordnungsmustern

**Severity:** HIGH  
**Betroffene Vertraege:** VERTRAG_PHASE_0-4_HEFTEINTRAG  
**Beschreibung:**  
HEFTEINTRAG-Vertrag §3 bietet 9 Ordnungsmuster-Typen (kausal, chronologisch, kategorial, parallel-kausal, kontrastierend, sequenziell, metaphorisch, relational, konzept-beispiel). Das JSON-Schema (§4) erzwingt jedoch immer S-C-P-L-Struktur (situation, complication[], problem, loesung[]). Fuer nicht-narrative Muster (kategorial, relational, konzept-beispiel) ist "Complication" ein kuenstliches Konstrukt.

**Beispiel Staendeordnung (kategorial):**
```
Stundenfrage: Was unterschied die staendische Ordnung von modernem Denken?

SCPL-Zwang:
Situation: Die Gesellschaft war in drei Staende eingeteilt.
Complication[1]: Das widersprach modernen Idealen. [kuenstlich!]
Problem: Wie funktionierte diese starre Ordnung?
Loesung: Durch gegenseitige Verpflichtungen und gottliche Legitimitaet.
```

Alternatives Schema waere kategorial-vergleichend:
```
Kategorie Staendeordnung (3 Eintraege: Klerus, Adel, Bauern)
→ Funktion, Rechte, Pflichten pro Gruppe
→ Legitimation (gottlich vs. modern)
```

**Evidenz:**  
- VERTRAG_PHASE_0-4_HEFTEINTRAG, §4 JSON-Struktur: `scpl` ist festes Objekt mit Pflicht-Feldern `situation`, `complication[]`, `problem`, `loesung[]`.
- §5 STRUKTUR-FREEZE: "`SCPL-Zonen (Anzahl, Reihenfolge, Typ) | EINGEFROREN | Nie`" — auch nicht-sinnvolle Complication[] sind eingefroren.
- §3.3 "Ordnungsmuster waehlen: kausal | chronologisch | kategorial | ..." — aber JSON-Schema ist agnostisch gegenueber Wahl.

**Impact:**  
AGENT_HEFTEINTRAG erzeugt bei kategorial-vergleichenden Themen gezwungene "Complications", die keine didaktische Funktion erfuellen. SCPL wirkt unintuitive. Lehrkraft erhaelt Hefteintrag, der nicht mit Ordnungsmuster harmoniert. Phase-1-Materialien werden um einen kunstlichen Konflikt herum geplant, der nicht im Thema liegt.

**Massnahme:**  
JSON-Schema flexibilisieren (M-QA3, HIGH):
1. `complication[]` min. 0 (optional), nicht min. 1.
2. Ordnungsmuster-spezifische Minimal-Schemata:
   - **Kategorial:** Situation + Kategorie-Dimension (statt Complication) + Problem ("Wie unterscheiden sie sich?") + Vergleichs-Loesung
   - **Konzept-Beispiel:** Situation (Konzept-Definition) + Beispiele[] (statt Complication) + Problem ("Wie manifestiert es sich?") + Synthese-Loesung
   - **Relational:** Situation + Relationen[] (statt Complication) + Problem ("Wie haengen sie zusammen?") + Integrations-Loesung
3. Validierung: Bei Ordnungsmuster="kategorial", ist `complication[]` ignoriert (leere Liste).

**Delta zu v1:** BESTAETIGT (v1 QA-H1 identifiziert HIGH-Problem; M-QA3 schlaegt Loesung vor; RA5 praezisiert 3 alternative Schemata)

---

### [RA5-F05] Ordnungsmuster-Enum unvollstaendig fuer GPG-Themen (fehlen genetisch, funktional)

**Severity:** MEDIUM  
**Betroffene Vertraege:** VERTRAG_PHASE_0-4_HEFTEINTRAG  
**Beschreibung:**  
HEFTEINTRAG-Vertrag §3.3 nennt 9 Ordnungsmuster. Fuer Lehrplan-Plus-Anforderungen (GPG Mittelschule R7) sind 2-3 wichtige Typen unterrepraesentiert:
- **Genetisch** (Entwicklungslinien, Genese): "Wie entstand Feudalismus?" "Evolution der Demokratie von Athen bis heute?". Relevant fuer Konzeptgeschichte + Langzeitprozesse.
- **Funktional** (How X works, Kausalitäten): "Wie funktioniert eine Markteconomie?" "Wie funktioniert Kolonialisierung als System?". Relevant fuer Wirtschaftsgeschichte, Systemgeschichte.
- **Normativ-Deskriptiv** (Soll vs. Ist): "Was preachte die Kirche vs. was praktizierte sie?" Relevant fuer Kulturgeschichte mit Diskrepanzen.

**Evidenz:**  
- VERTRAG_PHASE_0-4_HEFTEINTRAG, §3 Aufgabe, Zeile 41: "`Ordnungsmuster waehlen: kausal | chronologisch | kategorial | parallel-kausal | kontrastierend | sequenziell | metaphorisch | relational | konzept-beispiel.`"
- 9 Typen insgesamt. Keine "genetisch", "funktional", "normativ-deskriptiv".

**Impact:**  
Bei Thema "Industrialisierung als Langzeitprozess": Genetisches Ordnungsmuster ("Wie entstand industrielle Produktion?") ist das natuerliche Schema. Agent muss es auf "chronologisch" oder "kausal" abbilden, was weniger praezise ist. Didaktische Schaerfe leidet.

**Massnahme:**  
Ordnungsmuster-Enum um min. 2 Typen erweitern (M-QA6, MEDIUM):
- **Genetisch:** Entwicklungslinien, Genese, Werdegang. Schema: Ursprung → Stufe-1 → Stufe-2 → Stufe-N. Beispiel: "Wie entwickelte sich Demokratie von Athen zu modern?"
- **Funktional:** Systemische Wirkmechanismen, Inputs-Outputs, Kreislauf. Schema: Element-A wirkt auf Element-B → Effekt-C → Rueckkopplung. Beispiel: "Wie funktioniert Arbeitsteilung in einer Marktwirtschaft?"

Keine Pflicht-Vollstaendigkeit — bei Bedarf erweiterbar (z.B. normativ-deskriptiv kann als `kontrastierend` subsumiiert werden).

**Delta zu v1:** NEU (v1 identifiziert QA-H4 MEDIUM als unvollstaendigkeit ohne Konkretisierung; RA5 praezisiert 2 konkrete Erweiterungen mit Beispielen)

---

### [RA5-F06] H1-H7-Heuristiken nicht robust gegen nicht-teilbare Themen

**Severity:** HIGH  
**Betroffene Vertraege:** VERTRAG_PHASE_0-1_DIDAKTIK  
**Beschreibung:**  
Manche historische Themen haben eine Kern-Narration oder eine Kernproblematik, die sich nicht sinnvoll in N Mappen (N > 2) zerlegen laesst. Beispiel "Die Pest": Das Thema ist ein Einzelereignis mit zeitlich begrenztem Ablauf (Ausbruch → Ausbreitung → Krise → Adaption). Eine Aufteilung in 4-5 Mappen fuehrt zu kuenstlicher Zerlegung (z.B. "Mittelalterliche Vorbedingungen | Pest-Ankommen | Pest-Wueten | Maßnahmen | Folgen") — ein Aufbau, der lehrhistorisch nicht motiviert ist. 2-3 Mappen waeren sinnvoller.

**Evidenz:**  
- VERTRAG_PHASE_0-1_DIDAKTIK, §2 Input, Zeile 25: "`mappen_anzahl | User (3-6) | Ja`" — Vorgabe ohne Fallback.
- Heuristiken H1-H7 bieten keine Pruefung: "Ist diese mappen_anzahl sinnvoll fuer dieses Thema?" oder "Sollen wir zusammenlegen?".

**Impact:**  
Bei Thema "Die Pest" mit User-Vorgabe mappen_anzahl=5: AGENT_DIDAKTIK erzeugt eine Mappen-Aufteilung, die fachlich nicht plausiabel ist. Downstream-Lehrkraft akzeptiert dies oder fordert Nachbesserung — was die Pipeline verlangsamt.

**Massnahme:**  
Fallback-Klausel in AGENT_DIDAKTIK (M-QA7, HIGH):
Nach Heuristiken-Anwendung: Wenn Heuristiken keine sinnvolle Aufteilung bei gegebener `mappen_anzahl` ergeben (z.B. ≥3 Mappen mit identischem oder redundantem Schwerpunkt), dann:
1. AGENT_DIDAKTIK generiert Vorschlag fuer reduzierte `mappen_anzahl`.
2. Output: "[FALLBACK-VORSCHLAG] Thema 'Die Pest' mit mappen_anzahl=5 erzeugt Redundanzen. Empfehlung: mappen_anzahl=3 (Ankommen | Wueten | Adaption). Begruendung: Thema ist zeitlich begrenzt, keine zusaetzliche konzeptuelle Dimension."
3. User kann annehmen oder explizit bei mappen_anzahl=5 bleiben mit Begruendung.

**Delta zu v1:** BESTAETIGT (v1 QA-H5 identifiziert HIGH-Problem; M-QA7 schlaegt Loesung vor; RA5 konkretisiert Output-Format)

---

### [RA5-F07] Konzeptgeschichte vs. Ereignisgeschichte: Keine Vorgaben zur Textsorte Skript

**Severity:** MEDIUM  
**Betroffene Vertraege:** VERTRAG_PHASE_0-3_SKRIPT  
**Beschreibung:**  
SKRIPT-Vertrag §6 Konventionen fordert "Sprachregister: Jugendsachbuch-Ton (R7-Mittelschule)" fuer beide Thementypen (Ereignis wie WK1, Konzept wie Feudalismus). Die Textsorte des Jugendsachbuchs ist aber fuer Ereignisgeschichte nativ (narrative Erklaerung), fuer Konzeptgeschichte adaptiv (vergleichende Erklaerung). Beim Schreiben eines Feudalismus-Skripts entstehen stylistische Dilemmata:

- Narrative Loop ("Die Menschen lebten unter Feudalismus, was bedeutete...") oder Konzept-Loop ("Feudalismus war ein System, in dem...")?
- Konstante Personifizierung ("Der Bauer fuerchtete den Herren") oder prototypische Rollen ("Bauern fuerchteten typisch Herren, weil...")?

**Evidenz:**  
- VERTRAG_PHASE_0-3_SKRIPT, §6 Konventionen, Zeile 149: "`Sprachregister: Jugendsachbuch-Ton (R7-Mittelschule). Weder infantil noch wissenschaftlich. Orientierung: 'Was ist was'-Reihe, Niveau 12-13 Jahre.`"
- Keine Unterscheidung narrativ vs. konzeptuell.
- Q9 "Personifizierung (mindestens 1 Person/Chunk)" ist MANDATORY (HIGH Severity) — aber bei Konzeptgeschichte kann es artifizielt sein.

**Impact:**  
AGENT_SKRIPT bei Konzeptgeschichte erzeugt inkonsistentes Register: Phasenweise narrativ (Fallbeispiele), phasenweise diskursiv (Konzept-Erklaerungen). Lehrkraft gibt Feedback: "Passt nicht zum Ton von Chunk 1". Agent muss nacharbeiten. Nicht blockierend, aber ineffizient.

**Massnahme:**  
SKRIPT-Vertrag §6 ergaenzen (M-QA adaptiv, MEDIUM):
```
Textsorte nach Thementyp:
- Ereignisgeschichte: Narrative Textsorte (Erzaehlung mit Akteuren, Handlungsfolge, emotional-situativ)
  Beispiel "Was ist was": "Der Erste Weltkrieg: Wie Millionen Menschen in Graeben kaempften..."
- Konzeptgeschichte: Vergleichende Textsorte (Fallbeispiele nebeneinander, Strukturvergleiche, Konzept-Erklaerungen)
  Beispiel Feudalismus: "Feudalismus war ein System mit drei Staenden. Der Klerus... Der Adel... Die Bauern... 
  Unterschied zur Moderne: Heute basieren Rechte auf Geburt (Stellung), nicht Geburt (Stand)."
- Kulturgeschichte: Perspektivische Textsorte (Alltag, Erfahrungen verschiedener Gruppen, Variationen)
  Beispiel Staendeordnung: "Ein Bauer im Mittelalter erlebte... Ein Priester dagegen... Beide verstanden ihre Welt durch..."

Konsequenzen:
- Q9 Personifizierung: Ereignisgeschichte MANDATORY (1 Person/Chunk), Konzeptgeschichte OPTIONAL (prototypische Rollen erlaubt),
  Kulturgeschichte MANDATORY (≥2 verschiedene Perspektiven/Chunk).
```

**Delta zu v1:** NEU (RA5 erkennt Textsorte-Ambiguitaet als Differenzierungsproblem)

---

### [RA5-F08] Chronologische Anorderungen in INHALTSBASIS fuer nicht-chronologische Themen unangemessen

**Severity:** MEDIUM  
**Betroffene Vertraege:** VERTRAG_PHASE_0-2_INHALT  
**Beschreibung:**  
INHALTSBASIS-Vertrag §4, Sektion "Fakten und Chronologie", Zeile 76, fordert "Chronologisch geordnete Fakten". Fuer nicht-chronologische Themen (Staendeordnung, Feudalismus, Demokratie-Konzept) ist chronologische Ordnung artifiziell oder undefined. Ein Feudalismus-Artikel hat keine klare zeitliche Abfolge — es sind Strukturen, keine Ereignisse.

**Evidenz:**  
- VERTRAG_PHASE_0-2_INHALT, §4 Output, Sektion "Fakten und Chronologie": "`Chronologisch geordnete Fakten mit Wikipedia-Quellenangabe...`"
- INHALTSBASIS-Template zu lesen: RA1-F02 im v1-Audit weist darauf hin, dass Chronologie ein Strukturierungsprinzip ist, nicht universell.

**Impact:**  
AGENT_INHALT bei Feudalismus muss Fakten "chronologisch ordnen" — etwa "Urspruenge (500-900) → Hochmittelalter (1000-1200) → Spaetmittelalter (1250-1500)". Das ist ein Umweg. Natuerlichere Ordnung waere "Struktur (Maenner, Pferde, Land) → Funktion (Schutz, Anbau, Macht) → Bedeutung (Soziale Ordnung, religiöse Legitimitaet)".

**Massnahme:**  
INHALTSBASIS-Sektion umbenennen und adaptiv machen (MEDIUM):
- `Fakten und Chronologie` → `Fakten und Struktur`
- Thementyp-Anpassung:
  - **Ereignisgeschichte:** Chronologisch geordnet (as-is)
  - **Konzeptgeschichte:** Logisch geordnet (Kern-Definitionen → Fallbeispiele → Kontraste)
  - **Kulturgeschichte:** Perspektivisch geordnet (Gruppe 1 → Gruppe 2 → Vergleiche)

**Delta zu v1:** NEU (RA5 erkennt Anwendungsproblem bei Strukturierung nicht-chronologischer Fakten)

---

### [RA5-F09] Rollenprofile: Unterscheidung zwischen "Person" und "Perspektivtraeger" fehlt

**Severity:** MEDIUM  
**Betroffene Vertraege:** VERTRAG_PHASE_0-2_INHALT  
**Beschreibung:**  
INHALTSBASIS-Vertrag definiert "Rollenprofile" als Tabelle (§4, Sektion Rollenprofile, Zeile 82). Das Format ist agnostisch gegenueber dem Unterschied zwischen historischer Person (mit Name, Biographie) und Perspektivtraeger-Rolle (prototypisch, eher generisch). Beispiel:

- **Historische Person (WK1):** Rolle "Leutnant Wustmann", historische Basis "real", Erfahrung "Befehle des Generals ausfuehren, Soldaten kommandieren".
- **Perspektivtraeger (Feudalismus):** Rolle "Burgherr", historische Basis "typisch 11. Jh.", Erfahrung "Land verwalten, Bauern kontrollieren, Lehnseid schwueren".

Das Template unterscheidet nicht. Downstrem-Agenten (SKRIPT, MATERIAL) wissen nicht, ob sie "Wustmann" als historische Figur oder "Burgherr" als Prototyp behandeln sollen. Dies fuehrt zu inkonsistenten Personifizierungen.

**Evidenz:**  
- VERTRAG_PHASE_0-2_INHALT, §4 Output, Sektion "Rollenprofile", Zeile 82: "`Tabelle: ID, Rolle, Historische Basis, Typische Erfahrung, Wikipedia-Beleg, Mappe-Eignung.`"
- Keine Spalte "Typ" (Historische Person vs. Perspektivtraeger).

**Impact:**  
AGENT_SKRIPT bei Feudalismus-Mappe muss mit Rollen wie "Bauer" arbeiten, die in Wikipedia nicht als Personen vorkommen. Die Annotation "Historische Basis: [typisch, nicht namentlich]" wird missverstanden oder ignoriert. AGENT_HEFTEINTRAG kann nicht eindeutig entscheiden, ob "Der Bauer" als Agent im SCPL ein historischer Akteur oder ein Konzept ist.

**Massnahme:**  
Rollenprofile-Template ergaenzen (MEDIUM):
```
Tabelle erweitern um Spalte "Typ":
- Typ: "Historische Person" | "Perspektivtraeger-Rolle"
- Fuer "Historische Person": Name, Lebensdaten, Konkretes Handeln
- Fuer "Perspektivtraeger-Rolle": Rollenbezeichnung, typische Periode/Gruppe, generische Erfahrungsmuster

QI3-Schwellenwerte (F02) dann thementyp-bedingt staffeln unter Beruecksichtigung dieses Typs.
```

**Delta zu v1:** NEU (RA5 erkennt Typkollision in Rollenprofile-Design)

---

### [RA5-F10] Wikipedia-Zugaenglichkeit fuer Konzeptgeschichte und Kulturgeschichte unterdefiniert

**Severity:** MEDIUM  
**Betroffene Vertraege:** VERTRAG_PHASE_0-2_INHALT  
**Beschreibung:**  
INHALT-Vertrag §3.1 fordert Wikipedia-Recherche ueber MCP-Tools (get_article, get_sections, get_links, get_summary, extract_key_facts). Das funktioniert gut fuer Ereignis- und Biographie-Artikel (z.B. "Erster Weltkrieg", "Otto von Bismarck"). Fuer konzeptuelle Artikel (z.B. "Feudalismus") ist die Ergiebigkeit oft gering — Wikipedia-Artikel konzentriert sich auf Definition und Varianten, weniger auf konkrete Fakten/Zitate/Personen pro Mappe. Kein Fallback ist definiert.

**Evidenz:**  
- VERTRAG_PHASE_0-2_INHALT, §3.1: "`Mindestens mappen_anzahl × 2 + 1 Artikel. Mindestens 2 verschiedene Artikel pro Mappe.`"
- QI2 Quellen-Diversitaet ist ein BLOCKER — aber bei Feudalismus koennte es sein, dass es weltweit nur 1 passabler Wikipedia-Artikel auf Deutsch/Englisch gibt, weil Feudalismus eine strukturelle Theorie ist, nicht ein Ereignis mit vielen sub-Artikeln.

**Impact:**  
AGENT_INHALT bei "Feudalismus" faellt bei QI2 (≥2 Artikel pro Mappe). User muss Massnahme ergreifen. Kein vordefinierter Fallback existiert. M-QA2 (v1 Audit) adressiert dies als Eskalationspfad, aber wendet sich nur an "Quellen-Duenne", nicht an Konzept-Strukturalitaet.

**Massnahme:**  
In M-QA2 (Eskalationspfad fuer QI2) ergaenzen (MEDIUM):
- Wenn QI2-FAIL fuer konzeptuelle Mappe: Nicht Merge, sondern erweiterte Recherche (Nebenseiten, Kategorien-Artikel, Vergleichsartikel nutzen). Beispiel Feudalismus: Neben "Feudalismus" auch "Feudalherr", "Vasallitaet", "Manorialismus", "Lehnsystem" — alle sind sub-Konzepte, zaehlbar als unterschiedliche Quellen.
- Dokumentation im Recherche-Hinweise-Absatz.

**Delta zu v1:** ENTSCHAERFT (M-QA2 ist schon Eskalationspfad; RA5 konkretisiert Variante fuer Konzeptgeschichte)

---

## 3. Severity-Verteilung

| Severity | Anzahl | IDs |
|---|---|---|
| CRITICAL | 1 | RA5-F01 |
| HIGH | 5 | RA5-F02, RA5-F03, RA5-F04, RA5-F06, RA5-H5-Integration |
| MEDIUM | 4 | RA5-F05, RA5-F07, RA5-F08, RA5-F09, RA5-F10 |
| **TOTAL** | **10** | |

---

## 4. Konvergenz mit v1-Audit

| RA5-Finding | v1-Audit Cluster/Finding | Status |
|---|---|---|
| RA5-F01 | K1 (QA-C1), M-QA1 | BESTAETIGT, praezisiert |
| RA5-F02 | K1 (QA-H2), M-QA4 | BESTAETIGT, praezisiert |
| RA5-F03 | K1 (QA-H3), M-QA5 | BESTAETIGT, praezisiert |
| RA5-F04 | K2 (QA-H1), M-QA3 | BESTAETIGT, praezisiert |
| RA5-F05 | QA-H4, M-QA6 | BESTAETIGT, praezisiert |
| RA5-F06 | QA-H5, M-QA7 | BESTAETIGT, praezisiert |
| RA5-F07 | Textsorte (neu in RA5) | NEU |
| RA5-F08 | Strukturierungsproblem (neu in RA5) | NEU |
| RA5-F09 | Rollenprofile-Typ (neu in RA5) | NEU |
| RA5-F10 | Wikipedia-Zugang (entschaerft durch M-QA2) | ENTSCHAERFT |

---

## 5. Top-3-Empfehlungen fuer Generalisierbarkeit

### Empfehlung 1: Thementyp-Klassifikation (CRITICAL, Blocker)

**Prioritaet:** 1 (BLOCKER fuer alle anderen Anpassungen)  
**Massnahme:** Implementierung von M-QA1 (siehe RA5-F01 und v1 QA-C1).

**Umsetzung:**
1. AGENT_DIDAKTIK: Neuer Pflicht-Schritt VOR Heuristiken H1-H7.
2. Input: `thema`, Lehrplanbezug, User-Input → Klassifikation in eine von 4 Typen
   - **Ereignisgeschichte:** Temporaler Fokus, klare Chronologie, Akteure mit Handlungen, Wendepunkte
   - **Konzeptgeschichte:** Strukturelle/theoretische Fokus, Definitionen/Prinzipien, mehrere Fallbeispiele, Vergleiche
   - **Kulturgeschichte:** Perspektivische Fokus, Alltag/Erfahrungen, mehrere Gruppen, kulturelle Muster
   - **Langzeitprozess:** Entwicklung ueber Zeitalter, gradueller Wandel, multiple Ursachen, mehrere Phasen
3. Output: Type-Tag im DIDAKTIK_RAHMEN Header + Adaptive Heuristiken-Anpassung (Mappen-Aufteilung je nach Typ)
4. Propagation: Alle Downstream-Vertraege referenzieren den Type-Tag fuer adaptive Schwellenwerte/Kriterien.

**Aufwand:** Mittel (new §0.1 in AGENT_DIDAKTIK, Pruefbau von ~15 Klassifikations-Items)  
**Abhangigkeiten:** Keine  
**Enabling:** Ermoeglicht RA5-F02, RA5-F03, RA5-F04, RA5-F05, RA5-F06

---

### Empfehlung 2: Schwellenwerte und Qualitaetskriterien thementyp-adaptiv machen (HIGH, Konsistenz)

**Prioritaet:** 2 (direkt nach M-QA1)  
**Massnahmen:** M-QA4 (QI3 Staffelung), M-QA5 (SK1 Interpretation), M-QA3 (SCPL-Flexibilisierung)

**Umsetzung:**
- **QI3 (INHALTSBASIS, RA5-F02):** Schwellenwerte fuer Akteure/Zitate staffeln (Ereignisgeschichte: ≥2 Personen, Konzeptgeschichte: ≥1 Person OR ≥2 Perspektivtraeger + optionales Zitat, etc.)
- **SK1 (SKRIPT, RA5-F03):** Vergegenwaertigung als Type-spezifische Interpretation (Ereignis = emotionale Rueckversetzung, Konzept = Fallbeispiel-Konkretisierung, Kultur = Alltag-Perspektive)
- **SCPL-Schema (HEFTEINTRAG, RA5-F04):** optionale complication[], ordnungsmuster-spezifische Minimal-Schemata (siehe RA5-F04 Massnahme)

**Aufwand:** Mittel (Anpassung in 3 Vertraegen, neue Tabellen fuer Staffelung)  
**Abhangigkeiten:** M-QA1 (Thementyp-Klassifikation)  
**Timeline:** Post-M-QA1

---

### Empfehlung 3: Fallback-Klauseln fuer Grenzfaelle (HIGH, Robustheit)

**Prioritaet:** 3 (nach Empfehlungen 1-2)  
**Massnahmen:** M-QA2 (QI2-Eskalation), M-QA7 (mappen_anzahl-Fallback), M-QA10 (STRUKTUR-FREEZE Kanonisierung)

**Umsetzung:**
- **QI2-Eskalation (RA5-F10, M-QA2):** Bei <2 Wikipedia-Artikel pro Mappe → Mappe-Merge-Vorschlag oder erweiterte Recherche (Nebenseiten, Kategorien)
- **mappen_anzahl-Fallback (RA5-F06, M-QA7):** Nach Heuristiken-Pruefung: Wenn N Mappen mit identischem Schwerpunkt entstehen → Reduktions-Vorschlag an User mit Begruendung
- **STRUKTUR-FREEZE Kanonisierung (v1 QA-H8, M-QA10):** STRUKTUR-FREEZE-Definition in WORKFLOW_v4.1 verankern, nicht nur in HEFTEINTRAG-Vertrag (enables downstream-Konsistenz)

**Aufwand:** Klein-Mittel (Eskalationspfade, 1-2 neue Pruefschleifen)  
**Abhangigkeiten:** Minimal (unabhaengig)  
**Timeline:** Parallel zu Empfehlungen 1-2

---

## 6. Validierungsmechanismen fuer Generalisierbarkeit

Zur Sichere Ueberpruefung, dass die Generalisierbarkeits-Fixes tatsaechlich funktionieren:

1. **Test-Themen-Durchlaeufe (pro Thementyp):**
   - Ereignisgeschichte: WK1-Ende (Game 2, paralleles Thema zu WK1) [existing]
   - Konzeptgeschichte: Feudalismus (new)
   - Kulturgeschichte: Mittelalterliche Staendeordnung (new)
   - Langzeitprozess: Industrialisierung (new)
   
   Jeweils Phase 0.1-0.4 komplett durchlaufen, Q-Gates pruefen, Learning-Dokumentation.

2. **Thementyp-Klassifikation-Validierung:** User (Lehrkraft) entscheidet im AGENT_DIDAKTIK-Output: "Ist diese Klassifikation korrekt?" → Feedback-Loop vor Heuristiken-Anwendung.

3. **Schwellenwert-Compliance-Matrix:** Pro Output-Artefakt (INHALTSBASIS, SKRIPT, TAFELBILD) dokumentieren: Welche Schwellenwerte wurden angewendet und warum (Type-Beggruendung).

---

## 7. Abgrenzung zu anderen Review-Dimensionen

Diese Befunde sind spezifisch fuer **Generalisierbarkeit** (Thementyp-Adaptivitaet). Nicht adressiert:
- **Artefakt-Qualitaet (RA1):** Messbarkeit von Schwellenwerten (aber dependent auf RA5-Klassifikation)
- **Prozess-Robustheit (RA2):** Fallback-Logik (overlap mit RA5-F06, aber RA2 mit Fokus auf Agent-Fehlerbehandlung)
- **Downstream-Kompatibilitaet (RA3):** JSON-Schema-Konsistenz (RA5-F04 betrifft Schema-Flexibilisierung)
- **Fachdidaktische Schaerfe (RA4):** Quellenorientierung, Multiperspektivitaet, Kontroversitaet (RA5 adressiert nur, wenn Thementyp-Adaptivitaet erforderlich ist)

---

## 8. Abschliessende Bewertung

Die Pipeline ist **nicht generalisierbar ohne Thementyp-Klassifikation und adaptive Anpassungen**. Die 4 Phase-0-Vertraege sind implizit auf Ereignisgeschichte (WK1-Prototyp) kalibriert. Findings zeigen, dass:

1. **Heuristiken funktionieren nur fuer chronologische Themen** (F01)
2. **Schwellenwerte sind fuer abstrakte Themen zu rigide** (F02)
3. **Qualitaetskriterien (SK1, Q9) sind thementyp-spezifisch, nicht universal** (F03)
4. **Ordnungsmuster-Schema (SCPL) erzwingt Narrative fuer nicht-narrative Themen** (F04)
5. **Textsorte und Rollenprofile-Design haben Typ-Ambiguitaeten** (F07, F09)

**Massnahmen sind nicht optional, sondern notwendig fuer ein produktives System**, das reale Vielfalt von Geschichtsthemen (Lehrplan Plus R7 GPG) abdeckt.

---

**Audit-Abschluss:** 2026-04-06  
**Status:** REVIEW COMPLETE — Bereit fuer Konsolidierung mit RA1-RA4-Berichten
