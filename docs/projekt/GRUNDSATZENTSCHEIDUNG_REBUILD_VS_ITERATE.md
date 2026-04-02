# Grundsatzentscheidung: Clean Rebuild vs. Iteratives Patching

**Erstellt:** 2026-04-02 (PM-Session 3)
**Status:** ENTSCHIEDEN — Option C+ (Hybrid mit Architektur-Bewusstsein). Entscheidungsprotokoll: §9.
**Kontext:** Nach Abschluss der PM-Infrastruktur-Evaluation (POOL_PM_INFRASTRUKTUR_ENHANCEMENTS.md) und Plugin-Verifikation steht die Frage: Wie fliessen die Erkenntnisse in das Produkt ein?

---

## 1. Fragestellung

Sollen wir die Produkt-Infrastruktur (Game-Erstellungs-Pipeline + Steuerungsschicht) **einmal sauber neu aufsetzen** und dann den gesamten Erstellungsprozess realgetreu end-to-end testen — oder sollen wir **iterativ am Status quo weiterarbeiten** und Neuerungen inkrementell einpflegen?

### 1.1 Was "Produkt" hier bedeutet

Das Produkt ist NICHT die Website (weitergehts.online) oder die Escape-Games selbst. Das Produkt ist die **Infrastruktur zur Erstellung von Escape-Games**: die Pipeline aus Phasen, Vertraegen, Subagenten-Prompts, Q-Gates, Engine und Steuerungsdokumenten, die aus Wikipedia-Quellen + Lehrplanbezuegen vollstaendige, interaktive Escape-Games als statische Websites generiert.

### 1.2 Was "Clean Rebuild" bedeutet

NICHT: Alles loeschen und von null anfangen.
SONDERN: Die bestehenden Artefakte (Vertraege, Subagenten-Prompts, Q-Gate-Kriterien, Engine) als Input nehmen und in eine neue, optimierte Architektur ueberfuehren — unter Einbeziehung aller Erkenntnisse aus v1-v4, den Plugin-Verifikationstests und den Architektur-Reviews.

### 1.3 Was "Iteratives Patching" bedeutet

Am bestehenden System weiterarbeiten: Mappe 3 mit der aktuellen v4-Architektur produzieren, dabei identifizierte Schwaechen fixen (Vertrags-Luecken, Skill-Bloat, fehlende Schemata), Erkenntnisse in v4.x-Updates dokumentieren.

---

## 2. Bestandsaufnahme: Was haben wir, was fehlt

### 2.1 Funktionierendes (behalten in jedem Szenario)

| Artefakt | Status | Evidenz |
|---|---|---|
| 7 Architekturprinzipien (P1-P7) | Bewaehrt | 2 Mappen erfolgreich produziert, Prinzipien ueberstanden v1→v4 |
| Phasenstruktur (0→4) | Bewaehrt | Sequentielle Abhaengigkeiten korrekt, kein Phasen-Skip noetig |
| 6 Vertraege (Phase 2.0-2.2c) | Funktional, lueckenhaft | comprehensive-review: 14 Findings, davon 3 HIGH (Schema, Q-Gate, Conditional-Read) |
| 12 Subagenten-Prompts (7 Material + 5 Aufgabe) | Funktional | Mappe 2 erfolgreich produziert. Qualitaet nicht systematisch gemessen. |
| 6 Q-Gate-Kriterienkataloge | Funktional | Werden manuell angewendet. Nicht mechanisch pruefbar. |
| Engine (escape-engine.js + CSS) | Live | Mappe 1+2 live auf weitergehts.online. v3.5 Layout-Redesign implementiert. |
| Artefakt-Verzeichnisstruktur | Stabil | Einheitlich fuer Mappe 1-3. |
| Phase-0/1-Artefakte Mappe 3 | Fertig | TAFELBILD, MATERIAL_GERUEST, SKRIPT, INHALTSBASIS vorhanden. |

### 2.2 Bekannte Defizite (aus Plugin-Tests + historischen Audits)

| Defizit | Quelle | Schwere | Betrifft |
|---|---|---|---|
| Monolithischer Skill (22 KB, 8 Verantwortlichkeiten) | plugin-eval Test 3 | HOCH | Steuerungsschicht |
| Kein Runtime-Dispatcher (ORCHESTRATOR ist Doku, nicht Instanz) | UPGRADE_PLAN_v5 §1.2 | HOCH | Steuerungsschicht |
| Vertrags-Spezifikationsluecken (Output-Schema, Q-Gate-Semantik, Conditional-Read) | comprehensive-review Test 4 | HOCH | Vertraege |
| STATUS.md ist Freitext, nicht maschinenlesbar | POOL P2 | MITTEL | Zustandsmanagement |
| Q-Gates nicht mechanisch pruefbar | comprehensive-review Finding 5.1 | HOCH | Qualitaetssicherung |
| Kein formales Schema fuer mat-N-M.json Output | comprehensive-review Finding 1.1 | HOCH | Vertraege |
| Session-Splits manuell formuliert (80-120 Zeilen Uebergabe-Prompts) | UPGRADE_PLAN_v5 §1.2 | MITTEL | Steuerungsschicht |
| Subagenten-Prompts nicht versioniert, nicht evaluiert | comprehensive-review Finding 3.2 | MITTEL | Subagenten |
| Flowcharts veraltet | STATUS.md Blocker | NIEDRIG | Dokumentation |
| quellenangaben[] Engine-Support fehlt | STATUS.md Blocker | NIEDRIG | Engine |

### 2.3 Neue Faehigkeiten (seit Plugin-Verifikation verfuegbar)

| Faehigkeit | Plugin | Verifiziert | Nutzen |
|---|---|---|---|
| Parallele Multi-Dimensionen-Audits | agent-teams | JA | Q-Gate-Pruefung mit 3 spezialisierten Reviewern gleichzeitig |
| Subagent-Dispatch mit Dateisystem-Zugriff | (Plattform) | JA | Automatisierte Material-/Aufgaben-Produktion per Agent-Tool |
| Model-Tiering (Opus/Sonnet/Haiku) | (Plattform) | JA | Kostenoptimierung: Haiku fuer Assembly, Sonnet fuer Produktion, Opus fuer Q-Gates |
| Skill-Qualitaetsmessung | plugin-eval | JA | Systematische Evaluation und Iteration von Skills |
| Architektur-Review auf Vertraege | comprehensive-review | JA | Spezifikationsluecken finden bevor Subagenten deployt werden |
| Plugin-Build in Cowork | cowork-plugin-management | VERFUEGBAR | escape-game-creator Plugin direkt in Cowork bauen |
| Dispatcher-Pattern | conductor (Referenz) | EVALUIERT | Automatische Phasen-Identifikation + Skill-Routing |

---

## 3. Optionen

### Option A: Clean Rebuild ("Gruene Wiese mit bewaehrtem Material")

**Was passiert:**
1. Neue Plugin-Struktur (escape-game-creator) nach v5-Zielarchitektur aufsetzen
2. Vertraege in Skills ueberfuehren, dabei alle 14 Findings aus comprehensive-review fixen
3. Output-JSON-Schemata formal definieren (Finding 1.1)
4. Q-Gate-Mechanik formalisieren (Finding 5.1)
5. Dispatcher-Skill bauen (liest state.json/STATUS.md, routet automatisch)
6. Subagenten-Prompts mit plugin-eval evaluieren und optimieren
7. End-to-End-Test: Mappe 3 komplett durch die neue Pipeline
8. Bei Erfolg: Mappe 4 als Validierung

**Erhaltenes:** Alle 7 Prinzipien (P1-P7), alle Inhaltsartefakte (Phase 0/1), Engine, Verzeichnisstruktur. Nichts geht verloren — nur die Steuerungsschicht wird neu aufgebaut.

**Geschaetzter Aufwand:**
- Vertraege → Skills + Schema-Fixes: 12-16h
- Dispatcher + state.json: 8-12h
- Subagenten-Evaluation + Optimierung: 6-8h
- Q-Gate-Formalisierung: 4-6h
- End-to-End-Test Mappe 3: 4-6h
- **Gesamt: ~34-48h ueber 4-6 Sessions**

**Risiko:** Hoher Vorab-Invest ohne Produktions-Output. Wenn die neue Architektur nicht funktioniert, ist die Zeit verloren. Allerdings: Die Einzelkomponenten (Vertrags-Fixes, Schema-Definition, Q-Gate-Formalisierung) haben auch im Iterationsszenario Wert.

### Option B: Iteratives Patching ("Fahren und reparieren")

**Was passiert:**
1. Mappe 3 mit bestehendem v4-System produzieren (Phase 2.0 → 2.2c → 3 → 4)
2. Dabei identifizierte Probleme dokumentieren (wie bei Mappe 2: RUNDE_3a/3b_ERGEBNIS)
3. Nach Mappe 3: Findings konsolidieren, gezielt patchen
4. Mappe 4 mit v4.x produzieren
5. Nach Mappe 4: Entscheiden ob v5-Rebuild basierend auf kumulierten Erkenntnissen

**Erhaltenes:** Sofortiger Produktionsfortschritt. Mappe 3 wird live.

**Geschaetzter Aufwand:**
- Mappe 3 Produktion (Phase 2-4): ~12-16h ueber 3-4 Sessions
- Post-Produktion Fixes: ~4-8h
- Mappe 4 Produktion: ~10-14h
- **Gesamt: ~26-38h fuer 2 Mappen**

**Risiko:** Bekannte Defizite (Vertrags-Luecken, fehlende Schemata, manuelles Q-Gate) produzieren erneut die gleichen Fehlertypen wie bei Mappe 2. Jedes Patching-Ergebnis (RUNDE_3a, 3b, ...) erzeugt weitere Dokumente ohne das Grundproblem (Steuerungsschicht ist Doku, nicht Runtime) zu loesen.

### Option C: Hybrid ("Kritische Fixes, dann produzieren")

**Was passiert:**
1. Die 3 HIGH-Findings aus comprehensive-review fixen (Output-Schema, Q-Gate-Semantik, Conditional-Read) — ohne Plugin-Umbau
2. state.json (YAML-Frontmatter in STATUS.md) einfuehren — Quick Win, 2h
3. Monolithischen Skill mit plugin-eval-Empfehlung 1 aufteilen (Dispatcher + Referenz) — ohne Plugin-Packaging
4. Mappe 3 mit verbessertem v4.x produzieren
5. Erkenntnisse aus Mappe 3 als Input fuer Plugin-Entscheidung (v5 ja/nein)

**Erhaltenes:** Sofortige Qualitaetsverbesserung der Vertraege + schnellerer Produktionsstart als Option A. Plugin-Entscheidung informiert durch echte Produktionserfahrung.

**Geschaetzter Aufwand:**
- Vertrags-Fixes (3 HIGH): 6-8h
- state.json + Skill-Split: 4-6h
- Mappe 3 Produktion: 12-16h
- **Gesamt: ~22-30h fuer Fixes + 1 Mappe**

**Risiko:** Mittelweg-Risiko: Vertrags-Fixes verbessern die Spezifikation, aber ohne Dispatcher bleibt die Orchestrierung manuell. Der Skill-Split ohne Plugin-Packaging ist ein Zwischenschritt, der bei spaeterem Plugin-Bau ggf. nochmal angefasst wird.

---

## 4. Bewertungskriterien

| Kriterium | Gewicht | Beschreibung |
|---|---|---|
| Produktionsfortschritt | 30% | Wann ist Mappe 3 live? Wann Mappe 4? |
| Architektur-Nachhaltigkeit | 25% | Wird die Loesung bei Mappe 5-10 skalieren, oder entsteht erneut Refactoring-Bedarf? |
| Fehlerrisiko Mappe 3 | 20% | Wie hoch ist das Risiko, dass bekannte Defizite die Produktion blockieren oder Nacharbeit erzeugen? |
| Investitions-Effizienz | 15% | Wie viel der investierten Zeit hat dauerhaften Wert (vs. Wegwerf-Arbeit)? |
| Lern-Rendite | 10% | Wie viel lernen wir ueber das Produkt durch die gewahlte Option? |

---

## 5. Vorqualifikation (Stand: 2026-04-02)

### 5.1 Empirische Datenlage

**Mappe 1 (Pulverfass Europa):** v1→v2 Prozessredesign noetig. Ergebnis brauchbar, aber Prozess nicht reproduzierbar.

**Mappe 2 (Attentat von Sarajevo):** v3→v4 Architektur-Upgrade noetig. 2 gescheiterte CC-Versuche, dann Cowork-basierte Produktion. 8 Befunde in Runde 3a, alle gefixt. 5 operative + 8 Optimierungskandidaten in Runde 3b. Ergebnis live und funktional.

**Mappe 3 (nicht begonnen):** Phase 0/1 Artefakte fertig. Produktionsverzeichnis angelegt. Uebergabe-Prompt erstellt.

**Muster:** Jede Mappe hat bisher einen Architektur-Sprung ausgeloest (v1→v2→v4). Die Frage ist ob Mappe 3 mit v4 produziert werden kann ohne v5 zu benoetigen, oder ob die bekannten Defizite erneut einen Mid-Production-Sprung erzwingen.

### 5.2 Risikobewertung: Mappe 3 mit unveraendertem v4

| Risiko | Wahrscheinlichkeit | Impact | Begruendung |
|---|---|---|---|
| Vertrags-Ambiguitaet erzeugt fehlerhafte Materialien | HOCH | MITTEL | 3 HIGH-Findings in Vertrag 2.1, alle betreffen Dispatch-Ausfuehrung |
| Monolithischer Skill ueberlastet Kontextfenster | MITTEL | HOCH | 22 KB Skill + Vertrag + Artefakte → Token-Pressure ab Material 3 |
| Manuelles Q-Gate produziert inkonsistente Pruefungen | HOCH | NIEDRIG | Ohne formalisierte Semantik entscheidet jeder Dispatch anders ueber PASS/FAIL |
| Session-Split-Punkt wird verpasst | MITTEL | MITTEL | Kein automatischer Checkpoint, Token-Schaetzung ungenau |
| Engine-Inkompatibilitaeten in JSON-Output | NIEDRIG | HOCH | Mappe 2 hatte 4/5 Engine-inkompatible Aufgabentypen (behoben), aber Schema immer noch nicht formal definiert |

### 5.3 Vorlaeufe Tendenz (NICHT Entscheidung)

Option C (Hybrid) erscheint als staerkstes Profil: Die 3 HIGH-Vertrags-Fixes und der Skill-Split haben auch isoliert Wert (kein Wegwerf-Investment), reduzieren das Fehlerrisiko fuer Mappe 3 substanziell, und die Produktionserfahrung aus Mappe 3 informiert die Plugin-Entscheidung empirisch statt spekulativ. Option A waere gerechtfertigt wenn das Ziel Produktisierung (andere Lehrkraefte nutzen die Pipeline) unmittelbar ansteht — das ist aktuell nicht der Fall. Option B waere gerechtfertigt wenn die bekannten Defizite als unkritisch eingestuft werden — die empirische Evidenz (2 gescheiterte CC-Versuche, 8+5+8 Befunde) spricht dagegen.

---

## 6. Qualifizierungsfragen — Ergebnisse

| # | Frage | Ergebnis | Quelle |
|---|---|---|---|
| Q1 | Wie schwerwiegend sind die 3 HIGH-Findings in der Praxis? | **BLOCKIEREND in Kombination.** Test-Dispatch mat-3-1 zeigt: Subagent kann mat-3-1 mit aktuellem Vertrag NICHT korrekt produzieren. Details: §6.3 | Test-Dispatch 2026-04-02 |
| Q2 | Ist der Skill-Split ohne Plugin-Packaging stabil? | OFFEN — Folgetest | — |
| Q3 | Wie viel Nacharbeit hat Mappe 2 erzeugt? | **~6h.** Runde 3a: 8 Befunde, alle gefixt. Runde 3b: 5 operative + 8 OPTs. 2 gescheiterte CC-Versuche davor. | User-Schaetzung 2026-04-02 |
| Q4 | Skaliert die Pipeline auf andere Faecher? | **Produkt (Escape-Game-Pipeline) ist Geschichte-spezifisch.** PM-/Produktentwicklungsebene soll skalierbar bleiben: Cowork-Project-Anweisungen, Plugin-Verfuegbarkeiten, Website-Verwaltung als Meta-Learnings. Ziel: aehnliche Produktentwicklungsweise (User + Claude Cowork-Infrastruktur) fuer andere Methoden (Rollenspiel, Debatte) in anderen Faechern. | User-Input 2026-04-02 |
| Q5 | Wann wird Produktisierung realistisch? | **Nicht dringend.** Game-Fertigstellung vorziehen. Aber: Game-Erstellung dient explizit als Test fuer Produktisierung. Mappe 3+4 sind Produktionstest, nicht nur Content-Produktion. | User-Input 2026-04-02 |
| Q6 | Subagenten-Prompts qualitativ ausreichend? | **Einschaetzung: ausreichend fuer Mappe 3.** Ggf. kleine fachdidaktische Auditrunde einplanen, falls Zeit/Aufwand-Verhaeltnis stimmt. | User-Einschaetzung 2026-04-02 |

### 6.1 Implikationen der User-Inputs

**Q5 veraendert die Bewertungskriterien:** Mappe 3 ist nicht primaer Content-Produktion sondern **Prozesstest fuer spaetere Produktisierung**. Das verschiebt die Gewichtung:

| Kriterium | Vorher | Nachher | Begruendung |
|---|---|---|---|
| Produktionsfortschritt | 30% | 20% | Mappe 3 live ist weniger dringend als Mappe 3 als valider Prozesstest |
| Architektur-Nachhaltigkeit | 25% | 30% | Wenn der Prozess skalieren soll, muss die Architektur stimmen |
| Fehlerrisiko Mappe 3 | 20% | 15% | Fehler sind akzeptabel wenn sie den Prozess informieren |
| Investitions-Effizienz | 15% | 15% | Unveraendert |
| Lern-Rendite | 10% | 20% | Der Testcharakter von Mappe 3 macht Learnings zum Primaerziel |

**Q4 einfuehrt eine neue Dimension:** Die PM-Ebene muss von der Produkt-Ebene trennbar bleiben. Wenn wir die Infrastruktur neu aufsetzen, sollte die Trennung "Game-spezifisch" (Vertraege, Subagenten, Q-Gates) vs. "methoden-agnostisch" (Dispatcher, state.json, Session-Management, Cowork-Patterns) architektonisch sichtbar sein.

**Q3 + Q5 zusammen:** ~6h Nacharbeit bei Mappe 2 ist akzeptabel wenn Mappe 3 als Prozesstest dient. Aber: wenn dieselben Fehlertypen wiederkehren (Vertrags-Ambiguitaet, Engine-Inkompatibilitaet), ist das kein neues Learning sondern verschwendete Wiederholung.

### 6.3 Q1 Test-Dispatch: Detailergebnisse

**Testgegenstand:** mat-3-1 (Darstellungstext "Begeisterung und Angst — August 1914") via VERTRAG_PHASE_2-1_MATERIAL, 8 Read-Steps, SUB_MATERIAL_DARSTELLUNGSTEXT als Subagent.

**Befunde nach Schwere:**

| Finding | Schwere | Beschreibung | C+-Fix ausreichend? |
|---|---|---|---|
| Conditional-Read-Logik (Step 7) | BLOCKIEREND | "Gesamte Datei bei DT/QT/TB/ZL" suggeriert, DT soll gesamtes ARTEFAKT_INVENTAR lesen — unklar warum. NICHT-lesen-Spalte widerspricht der Logik. Subagent kann Step 7 nicht deterministisch ausfuehren. | JA — Decision-Tree (C+ Schritt 3) loest dies |
| Sequenzkontext-Interface | BLOCKIEREND | SUB_MATERIAL_DT verlangt Sequenzkontext (v3.3 PFLICHT), aber Vertrag 2.1 spezifiziert nicht, wie/wo dieser uebergeben wird. Subagent hat keinen Zugriff auf Sequenzinformation. | TEILWEISE — Schema-Fix (C+ Schritt 1) muss Interface explizit definieren |
| Q-Gate-Semantik | TEILWEISE BLOCKIEREND | Keine formale Definition wann PASS/FAIL. Jeder Dispatch entscheidet willkuerlich. Bei manueller Pruefung tolerierbar, bei skalierter Produktion nicht. | JA — C+ Schritt 2 |
| Output-Schema | NICHT BLOCKIEREND | Kein formales JSON-Schema, aber implizites Format aus Subagenten-Prompt ableitbar. Erhoehtes Risiko fuer Engine-Inkompatibilitaet. | JA — C+ Schritt 1 |
| Fehlende Phase-2.0-Artefakte | ERWARTET | hefteintrag.json, einstieg.json, ARTEFAKT_INVENTAR nicht vorhanden — Phase 2.0 wurde noch nicht ausgefuehrt. Kein Defizit der Architektur. | n/a |
| SKRIPT-SCPL-Diskrepanz | MINOR | SKRIPT hat 4 Gruende fuer Kriegsausbruch, MATERIAL_GERUEST/TB nur 3 Knoten. Inhaltliche Inkonsistenz, kein Architektur-Problem. | n/a — inhaltliches Review |

**Gesamtbefund:** Subagent konnte mat-3-1 mit aktuellem v4-Vertrag NICHT korrekt produzieren. Ursache ist die Kombination aus Conditional-Read-Ambiguitaet + fehlendem Sequenzkontext-Interface. Jedes Problem einzeln waere umgehbar; zusammen erzeugen sie einen Zustand in dem der Subagent zentrale Inputs nicht zuverlaessig lesen kann.

**Bewertung fuer Optionswahl:**
- Die 2 blockierenden Findings sind durch C+-Schritte 1+3 adressierbar (Schema + Decision-Tree). Ein vollstaendiger Rebuild (Option A) ist NICHT zwingend erforderlich.
- ABER: Der Test deckt ein Muster auf — die Vertraege wurden als Prosa-Dokumente geschrieben, nicht als maschinenlesbare Dispatch-Spezifikationen. Die Fixes in C+ beheben die Symptome; ein Rebuild wuerde das Grundmuster adressieren.
- Entscheidungsrelevant: Reichen symptomatische Fixes fuer den Prozesstest (Mappe 3), oder braucht der Prozesstest selbst eine saubere Architektur um aussagekraeftig zu sein?

### 6.2 Revidierte Optionsbewertung

| Kriterium (revidiert) | Option A (Rebuild) | Option B (Iterate) | Option C (Hybrid) |
|---|---|---|---|
| Produktionsfortschritt (20%) | Spaet (6-8 Wochen) | Frueh (2-3 Wochen) | Mittel (3-5 Wochen) |
| Architektur-Nachhaltigkeit (30%) | HOCH — saubere Trennung Game-spezifisch vs. methoden-agnostisch von Anfang an | NIEDRIG — gleiche Schulden, gleiche Brueche | MITTEL — Vertrags-Fixes ja, aber Trennung nicht systematisch |
| Fehlerrisiko (15%) | NIEDRIG — bekannte Defizite gefixt | HOCH — 3 HIGH-Findings unbehandelt, ~6h Nacharbeit erneut wahrscheinlich | MITTEL — HIGH-Findings gefixt, Orchestrierung noch manuell |
| Investitions-Effizienz (15%) | HOCH — alles hat Langzeitwert, aber hoher Vorab-Invest | NIEDRIG — Nacharbeit ist Wegwerf | HOCH — Fixes haben Wert in jedem Szenario |
| Lern-Rendite (20%) | MITTEL — lernen ueber neue Architektur, aber erst spaet ueber Produktion | HOCH — sofortige Produktion liefert Daten, aber ueber bekanntes System | HOCH — Produktion mit verbessertem System liefert neue Daten |

**Revidierte Tendenz:** Q5 (Mappe 3 = Prozesstest) staerkt Option A gegenueber der Erstbewertung. Wenn Mappe 3 ohnehin primaer als Architekturtest dient, lohnt es sich, die Architektur vorher sauber aufzusetzen — der "Verzug" in Produktionsfortschritt ist weniger relevant wenn Geschwindigkeit nicht das Primaerziel ist.

Gleichzeitig: Option A hat das Risiko des "Nie-Fertig-Werdens" — Infrastruktur-Arbeit ohne Produktions-Feedback kann endlos iterieren. Option C mit erweitertem Scope (Trennung Game-spezifisch vs. methoden-agnostisch als explizites Designziel) koennte den Mittelweg schaerfen.

---

## 7. Verdichtete Optionen (nach Qualifizierung)

### Option C+ (Hybrid mit Architektur-Bewusstsein) — EMPFOHLEN

Option C, aber mit explizitem Designziel: Die Fixes und der Skill-Split folgen der Trennung "Game-spezifisch" (Vertraege, Subagenten, Q-Gate-Kriterien) vs. "methoden-agnostisch" (Dispatcher-Pattern, state.json, Session-Management, Cowork-Patterns). Kein Plugin-Packaging, aber die Verzeichnisstruktur und Namenskonventionen sind so angelegt, dass spaeteres Packaging moeglich ist.

**Schritte:**
1. Output-JSON-Schema formal definieren (Finding 1.1) — Game-spezifisch
2. Q-Gate-Semantik formalisieren (Finding 5.1) — Prueflogik methoden-agnostisch, Kriterien Game-spezifisch
3. Conditional-Read-Logik als Decision-Tree (Finding 2.1) — Game-spezifisch
4. state.json / YAML-Frontmatter in STATUS.md — methoden-agnostisch
5. Monolithischen Skill aufteilen: Dispatcher (methoden-agnostisch) + Phasen-Referenz (Game-spezifisch)
6. Optional: 1 fachdidaktische Auditrunde auf SUB_MATERIAL-Prompts (Q6)
7. Test-Dispatch mat-3-1 mit verbessertem System (klaert Q1)
8. Mappe 3 Vollproduktion als Prozesstest
9. Post-Produktion: Learnings dokumentieren, Option A/C+/Iterate-Entscheidung fuer Mappe 4 revidieren

**Geschaetzter Aufwand:** ~28-38h (Fixes 10-14h + Mappe 3 Produktion 12-16h + Post-Analyse 4-6h + ggf. Auditrunde 2-4h)

### Option A (Rebuild) — FALLBACK

Falls Q1 (Test-Dispatch) zeigt, dass die Vertrags-Fixes allein nicht ausreichen und die Orchestrierung fundamental umgebaut werden muss. Oder falls nach Mappe 3 erneut ~6h Nacharbeit durch die gleichen Fehlertypen anfallen.

### Option B (Iterate) — VERWORFEN

User-Input Q5 macht reines Iterieren unattraktiv: Wenn Mappe 3 als Prozesstest dient, ist Wiederholen bekannter Fehler kein akzeptabler Test.

---

## 8. Naechster Schritt

**Q1 abgeschlossen.** Ergebnis: 2 blockierende + 1 teilweise blockierendes Finding. C+-Fixes adressieren alle drei, aber Test deckt Grundmuster auf (Vertraege als Prosa statt als Dispatch-Spezifikationen).

**Entscheidung steht an.** Die Kernfrage aus §6.3: Reichen symptomatische Fixes (C+) fuer einen aussagekraeftigen Prozesstest, oder muss der Prozesstest selbst auf sauberer Architektur laufen (A)?

**Empfehlung: Option C+.** Begruendung:
1. Die 2 blockierenden Findings sind durch konkrete, abgegrenzte Fixes loesbar (Schema + Decision-Tree). Kein Indiz fuer systemische Unrettbarkeit.
2. Mappe 3 als Prozesstest profitiert davon, dass er auf einer *verbesserten* v4-Basis laeuft statt auf einer komplett neuen Architektur — so messen wir, ob die bestehende Basis tragfaehig ist.
3. Falls Mappe 3 trotz C+-Fixes erneut ~6h Nacharbeit durch strukturelle Defizite produziert, ist das der empirische Beweis fuer Option A bei Mappe 4. Dann war die C+-Investition trotzdem nicht verloren (Fixes haben Langzeitwert).
4. Option A birgt das Risiko, 34-48h in Infrastruktur zu investieren bevor ein einziges Material die neue Pipeline durchlaeuft — und dabei Fehler erst spaet zu entdecken.

**Wenn User zustimmt:** Entscheidungsprotokoll (§9) fuellen, Action-Plan fuer C+ Schritte 1-9 erstellen.

---

## 9. Entscheidungsprotokoll (wird bei Entscheidung gefuellt)

| Feld | Wert |
|---|---|
| Entscheidung | **GETROFFEN** |
| Gewahlte Option | **Option C+ (Hybrid mit Architektur-Bewusstsein)** |
| Begruendung | Q1 zeigt 2 blockierende Findings, beide durch abgegrenzte C+-Fixes loesbar. Kein Indiz fuer systemische Unrettbarkeit. Mappe 3 als Prozesstest auf verbesserter v4-Basis liefert bessere Entscheidungsgrundlage als Rebuild vor Produktionserfahrung. C+-Investition hat Langzeitwert auch bei spaeterem Upgrade auf A. |
| Qualifizierungsergebnis Q1 | BLOCKIEREND in Kombination (Conditional-Read + Sequenzkontext-Interface). C+-Schritte 1+3 adressieren beide. Details: §6.3 |
| Datum | 2026-04-02 |
| Action-Plan-Dokument | Schritte 1-9 in §7 (Option C+). Naechster Schritt: C+ Schritt 1 (Output-JSON-Schema formal definieren) |
