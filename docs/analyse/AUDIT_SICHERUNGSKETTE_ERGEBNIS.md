# Audit-Ergebnis: Sicherungskette — Tafelbild / Hefteintrag / Sicherung

**Datum:** 2026-04-02
**Auditor:** Externer Audit (Cowork-Session)
**Briefing:** AUDIT_BRIEFING_SICHERUNGSKETTE.md
**Pflichtlektuere:** L1–L13 vollstaendig eingelesen
**Befundformat:** Gemaess Abschnitt 6 des Briefings

---

## Prueffragen-Befunde

### 5.1 Zur Idealstruktur

---

**PF-1: Ist die Idealstruktur (Abschnitt 3.1) didaktisch konsistent?**

Befund: Die Kette ist konsistent und entspricht dem Backward-Design-Paradigma (Wiggins/McTighe). Es gibt eine Spannung: Der vorletzte Schritt ("Aufgaben produzieren") und der letzte Schritt ("Sprachliche Verfeinerung des Hefteintrags") stehen in einer Abhaengigkeit, die nicht trivial ist. Aufgaben pruefen Verstaendnis der Hefteintrag-Inhalte (AGENT_RAETSEL liest kernerkenntnisse). Wenn der Hefteintrag NACH den Aufgaben sprachlich verfeinert wird, koennten Aufgaben-Formulierungen und Hefteintrag-Formulierungen auseinanderdriften. Das ist keine Luecke im Modell, aber ein operatives Risiko bei der Implementierung.

Empfehlung: Idealstruktur beibehalten. Die Reihenfolge "Aufgaben → Hefteintrag-Verfeinerung" ist korrekt, weil Aufgaben auf Kernerkenntnisse (inhaltlich stabil) referenzieren, nicht auf exakte Formulierungen. Die Verfeinerung betrifft Sprache, nicht Substanz. Dieses Prinzip muss aber in der Implementierung explizit als Constraint verankert werden.

Begruendung: Die Idealstruktur trennt korrekt zwischen inhaltlicher Steuerung (Merksatz/Kernerkenntnisse = stabil) und sprachlicher Auspraegung (Formulierungen = verfeinerbar). Solange die Verfeinerung diese Grenze respektiert, entsteht keine Inkonsistenz.

Aufwand: Gering (Constraint-Definition, kein Strukturumbau)

Risiko bei Nicht-Umsetzung: Gering — die Idealstruktur ist bereits korrekt formuliert.

---

**PF-2: Ist "vom Ende denken" auf SCPL-Ebene korrekt umgesetzt (Phase 0.4 → 1.1)?**

Befund: Ja, auf Struktur-Ebene. AGENT_TAFELBILD (Phase 0.4) extrahiert Kernerkenntnisse und SCPL-Schritte aus dem SKRIPT. AGENT_MATERIAL (Phase 1.1) nutzt das fixierte TAFELBILD als Zielstruktur und fuehrt einen Erarbeitbarkeits-Nachweis pro TB-Knoten. Die Steuerungsrichtung SKRIPT → TB → MATERIAL ist korrekt implementiert.

Der Merksatz muss NICHT frueher stehen. Die KE-Matrix in DIDAKTIK_RAHMEN (Phase 0.1) definiert die Lernziele bereits vor dem SKRIPT. Der Merksatz ist die Operationalisierung dieser Lernziele auf Mappe-Ebene — seine Position in Phase 0.4 ist die richtige, weil er die didaktisierte Substanz des SKRIPT braucht, um praezise formuliert zu werden.

Empfehlung: Status quo beibehalten. Backward Design ist auf KE-Ebene (Phase 0.1) und auf TB-Ebene (Phase 0.4) korrekt umgesetzt.

Begruendung: Die Synthese-Extraktion aus dem didaktisierten SKRIPT (vgl. GUETEKRITERIEN_TAFELBILD.md, Sektion 2) ist die staerkere Architektur gegenueber einer Merksatz-First-Logik, weil Erarbeitbarkeit gegen das tatsaechliche Narrativ geprueft wird.

Aufwand: Keiner.

Risiko bei Nicht-Umsetzung: Keines — der Status quo ist korrekt.

---

**PF-3: Sicherungsinhalte game-weit oder pro Mappe?**

Befund: Pro Mappe ist korrekt. Jede Mappe hat eine eigene Stundenfrage, eigene Kernerkenntnisse, einen eigenen SCPL-Bogen. Eine game-weite Sicherung waere nur fuer die Gesamtreflexion (letzte Mappe, "Was habe ich insgesamt gelernt?") relevant, nicht fuer die laufende Produktion.

Empfehlung: Status quo beibehalten. Die Progressionspruefung (G9: Voraussetzungen aus Vor-Mappen) stellt die Verkettung zwischen Mappen sicher, ohne eine game-weite Sicherungsstruktur zu erfordern.

Begruendung: SCPL ist ein Stunden-Modell (eine Frage, ein Bogen, eine Antwort). Game-weite Aggregation wuerde das Framework ueberdehnen.

Aufwand: Keiner.

Risiko bei Nicht-Umsetzung: Keines.

---

### 5.2 Zur Begriffstrennung

---

**PF-4: Sollte "Tafelbild" als Begriff abgeschafft werden?**

Befund: Ja. Die Begriffsvermischung (SP-1) ist real und erzeugt konzeptuelle Unklarheit. AGENT_TAFELBILD heisst "Sicherungsarchitekt und Hefteintrag-Designer" — die Rolle beschreibt einen Hefteintrag-Produzenten. Der Name "Tafelbild" ist ein Relikt aus v1/v2 (SVG-Graph-Renderer). Seit v3.1 (CSS-Hefteintrag, SCPL-Framework) ist der Output ein strukturierter Text, kein visuelles Tafelbild.

Die Kosten des Refactorings:
- 3 Dateinamen: AGENT_TAFELBILD.md → AGENT_HEFTEINTRAG.md, TAFELBILD_*.md → HEFTEINTRAG_*.md, GUETEKRITERIEN_TAFELBILD.md → GUETEKRITERIEN_HEFTEINTRAG.md
- Alle Referenzen in: ORCHESTRATOR.md, AGENT_MATERIAL.md, WORKFLOW_v4.md, 6 Vertraege, STATUS.md, CHANGELOG.md, DESIGNENTSCHEIDUNG_v3-1.md, EVALUATION_SCPL.md, diverse Analyse-Dateien
- JSON-Feld: rahmen/tafelbild.json → rahmen/hefteintrag.json (Engine-Aenderung + Assembly-Aenderung)
- Geschaetzter Aufwand: 2-3 Stunden reine Textsubstitution + Engine-Patch

Der Nutzen: Jede kuenftige Cowork-Session, jeder kuenftige Audit, jedes neue Dispatch-Briefing profitiert von begrifflicher Klarheit. Die kognitive Last beim Einlesen sinkt messbar.

Empfehlung: Umbenennung durchfuehren. Aber NICHT jetzt — als eigene Runde (Runde 5, Retrospektive) einplanen. Aktuell ist die Sicherungsketten-Architektur die hoehere Prioritaet.

Begruendung: Begriffliche Hygiene ist ein Investitionsentscheid. Die Kosten sind einmalig und kalkulierbar. Der Nutzen akkumuliert ueber jede weitere Session. Aber die Umbenennung loest kein funktionales Problem — sie reduziert nur kognitive Reibung.

Aufwand: Mittel (2-3 Stunden, aber rein mechanisch)

Risiko bei Nicht-Umsetzung: Gering funktional, mittel kognitiv. Jeder neue Leser (z.B. Auditor) wird durch den Namen "Tafelbild" fuer etwas, das ein Hefteintrag ist, irritiert.

---

**PF-5: Sollte sicherung.json aufgespalten werden?**

Befund: Ja, aber differenziert. Die aktuelle sicherung.json enthaelt fuenf Felder mit unterschiedlichem Charakter:

| Feld | Gehoert zu | Timing | Produzent-Anforderung |
|---|---|---|---|
| kernerkenntnisse[] | Hefteintrag (Merkbox) | Phase 0.4 (stabil, TB-FREEZE) | Identisch mit scpl.loesung[], keine eigene Produktion |
| zusammenfassung | Sicherungs-Rahmen | Nach Materialien (braucht Material-Kontext) | Synthese des Erarbeitungsprozesses |
| ueberleitung | Mappe-Verkettung | Nach Materialien (braucht Material-Kontext) | Bruecke zur naechsten Mappe |
| reflexionsimpuls | Muendlicher Unterricht | Zeitunabhaengig (Transfer-Frage) | Metakognition, unabhaengig von Material-Details |
| hefteintrag_verweis | SuS-Anweisung | Zeitunabhaengig (generisch) | Standardtext, kaum variabel |

Kernerkenntnisse sind eine 1:1-Kopie von tafelbild.scpl.loesung[] (M3b). Diese Doppelspeicherung (SP-5) ist eine Normalisierungs-Anomalie. Die Engine koennte kernerkenntnisse direkt aus tafelbild.json lesen.

Zusammenfassung und ueberleitung brauchen Material-Kontext — sie werden aktuell zu frueh produziert (Phase 2.0, vor Materialien).

Empfehlung: Dreifach-Split:

1. **rahmen/hefteintrag.json** (= bisheriges tafelbild.json + Merkbox) — Quelle der Wahrheit fuer alle Hefteintrag-Inhalte. Enthaelt scpl{}, stundenfrage, kernerkenntnisse (= scpl.loesung[]), ordnungsmuster. Produziert in Phase 0.4, TB-FREEZE.
2. **rahmen/sicherung_rahmen.json** — zusammenfassung, ueberleitung. Produziert NACH Materialien (Phase 2.1c oder spaeter).
3. **rahmen/meta.json** (besteht bereits) — reflexionsimpuls und hefteintrag_verweis hierhin verschieben ODER in sicherung_rahmen.json belassen.

Gewinn: Timing-Entkopplung. Jedes Artefakt wird produziert, wenn sein Input verfuegbar ist.

Verlust: Komplexitaet — drei Dateien statt einer. Assembly muss drei Quellen lesen.

Begruendung: Die Timing-Inversion (SP-3) ist das Kernproblem. Die Aufspaltung loest sie, weil zusammenfassung/ueberleitung nicht mehr gezwungen werden, gleichzeitig mit kernerkenntnisse zu entstehen.

Aufwand: Mittel (Vertrags-Aenderungen, Engine-Aenderung, Assembly-Aenderung)

Risiko bei Nicht-Umsetzung: Die zusammenfassung bleibt abstrakt (kann nicht auf Materialien Bezug nehmen). Der Hefteintrag bleibt didaktisch schwaecher als noetig (Q-M2-05 wiederholt sich bei Mappe 3).

---

**PF-6: Gehoert die Transferfrage zum Hefteintrag oder zum Sicherungs-Rahmen?**

Befund: Zum Sicherungs-Rahmen. Die EVALUATION_SCPL_HEFTEINTRAG.md (Sektion 8) und AGENT_TAFELBILD (Sektion 5.4) sind hier eindeutig: "Die Transferfrage gehoert NICHT in den Hefteintrag. Sie wird separat im transfer-Feld gespeichert und ausserhalb der Hefteintrag-Box gerendert. Im gedruckten Heft ergibt eine Transferfrage keinen Sinn — sie ist ein muendlicher Unterrichtsimpuls."

Aktuell liegt transfer.frage im tafelbild.json, nicht in sicherung.json. Das ist korrekt — die Transferfrage wird in Phase 0.4 formuliert und ist zeitunabhaengig (braucht keinen Material-Kontext).

Empfehlung: Status quo beibehalten. transfer.frage bleibt in tafelbild.json (bzw. kuenftig hefteintrag.json). Es gehoert weder in den Hefteintrag noch in den Sicherungs-Rahmen, sondern in ein drittes Feld, das die Engine separat rendert. Das ist bereits korrekt implementiert.

Begruendung: Die Transferfrage ist ein muendlicher Impuls, kein verschriftlichter Inhalt.

Aufwand: Keiner.

Risiko bei Nicht-Umsetzung: Keines — Status quo ist korrekt.

---

### 5.3 Zum Timing

---

**PF-7: Ist eine Zwei-Stufen-Architektur fuer den Hefteintrag sinnvoll?**

Befund: Ja. Das ist die zentrale Empfehlung dieses Audits.

**Stufe 1 (Phase 0.4, vor Materialien):** SCPL-Struktur, Kernerkenntnisse, Merksaetze, Ordnungsmuster, Stundenfrage. Alles, was die Zielstruktur fuer MATERIAL definiert. → TB-FREEZE schuetzt diese Ebene.

**Stufe 2 (Phase 2.1c, nach Materialien):** Sprachliche Verfeinerung der SCPL-Texte (situation.kontextsatz, complication[].schritt, problem.satz). Zusaetzlich: zusammenfassung und ueberleitung (aktuell in sicherung.json, zu frueh produziert). → Kein FREEZE auf dieser Ebene.

Was Stufe 2 liest: Alle materialien/mat-N-*.json (Inhalt, Fachbegriffe, didaktische_funktion), rahmen/einstieg.json, rahmen/tafelbild.json (Stufe-1-Output).

Was Stufe 2 produziert: Revidierte SCPL-Texte + zusammenfassung + ueberleitung. Output: rahmen/sicherung_rahmen.json + ggf. Patch auf SCPL-Texte in tafelbild.json (NUR Formulierung, NICHT Struktur).

Warum gerade Phase 2.1c: Dieser Dispatch hat bereits ALLE Materialien im Kontext (fuer Cross-Konsistenz). Der marginale Mehraufwand fuer eine Hefteintrag-Revision ist gering. Kein neuer Dispatch noetig — eine Erweiterung des bestehenden 2.1c-Vertrags genuegt.

Empfehlung: Implementieren. VERTRAG_PHASE_2-1c um Achse 6 ("Hefteintrag-Revision") erweitern. Regelwerk fuer erlaubte Aenderungen definieren (siehe PF-8).

Begruendung: Loest SP-3 (Timing-Inversion), SP-4 (TB-FREEZE zu restriktiv), SP-6 (Steuerung ohne Rueckwirkung). Kosten: 1 zusaetzliche Achse in einem bestehenden Dispatch. Kein neuer Dispatch.

Aufwand: Mittel (Vertrags-Erweiterung, AGENT_TAFELBILD-Update fuer differenzierten FREEZE, Q-Gate-Erweiterung)

Risiko bei Nicht-Umsetzung: Q-M2-05 (didaktisch unzureichender Hefteintrag) wird sich bei jeder Mappe wiederholen. Der Hefteintrag bleibt abstrakt und entkoppelt von der Material-Erfahrung der SuS.

---

**PF-8: Was darf in Stufe 2 geaendert werden?**

Befund: Strikte Differenzierung erforderlich.

**ERLAUBT (Formulierungs-Revision):**
- Kontextsatz in situation: Formulierung anpassen, um auf konkretes Material-Erlebnis Bezug zu nehmen (z.B. "Ihr habt in der Quelle gelesen, dass..." statt abstrakter Beschreibung)
- Complication-Schritte: Formulierung verfeinern, um Fachbegriffe im Kontext ihrer Material-Einfuehrung zu verwenden (z.B. "Der Blankoscheck, den ihr im Quellentext untersucht habt, ...")
- Problem-Satz: Formulierung an Material-Erfahrung anpassen
- zusammenfassung (NEU): Erstmalige Produktion mit Material-Kontext
- ueberleitung (NEU): Erstmalige Produktion mit Material-Kontext

**VERBOTEN (Struktur-Aenderung):**
- SCPL-Zonen hinzufuegen oder entfernen
- Complication-Schritte hinzufuegen, entfernen oder umordnen
- Ordnungsmuster aendern
- Kernerkenntnisse / Merksaetze inhaltlich aendern (Substanz ist in Stufe 1 fixiert)
- Fachbegriffe hinzufuegen oder entfernen
- Stundenfrage aendern

**Grenzfaelle:**
- Einen Complication-Schritt von 2 Saetzen auf 3 kuerzen: ERLAUBT (Formulierung)
- Einen Fachbegriff durch ein Synonym ersetzen: VERBOTEN (Fachbegriff-Aenderung)
- "Annexion" durch "gewaltsame Eingliederung — Annexion" ersetzen: ERLAUBT (Erklaerungskontext hinzufuegen, Fachbegriff bleibt)

Empfehlung: Diese Differenzierung als Regelwerk in VERTRAG_PHASE_2-1c verankern. Pro Aenderung muss der Dispatch dokumentieren: "SCPL-Schritt X: Formulierung geaendert von [...] zu [...]. Begruendung: Material Y liefert konkreten Kontext."

Begruendung: Die Grenze "Struktur fixiert, Formulierung offen" ist didaktisch sauber: Die SCPL-Schritte definieren, WAS gelernt wird (stabil). Die Formulierungen definieren, WIE es verschriftlicht wird (verfeinerbar durch Material-Kontext).

Aufwand: Gering (Regelwerk-Definition, keine technische Aenderung)

Risiko bei Nicht-Umsetzung: Ohne klare Grenze driftet Stufe 2 in Struktur-Aenderungen ab → TB-FREEZE wird ausgehoehlt → Materialien passen nicht mehr zum Hefteintrag.

---

**PF-9: Sollte TB-FREEZE differenziert werden?**

Befund: Ja. Das ist die notwendige Voraussetzung fuer die Zwei-Stufen-Architektur (PF-7).

**Neues FREEZE-Modell:**

| Ebene | FREEZE-Status | Geschuetzt ab |
|---|---|---|
| SCPL-Zonen (Anzahl, Reihenfolge, Typ) | STRUKTUR-FREEZE | Phase 0.4 (nach Q-Gate PASS) |
| Kernerkenntnisse (scpl.loesung[]) | STRUKTUR-FREEZE | Phase 0.4 |
| Fachbegriffe (pro Zone) | STRUKTUR-FREEZE | Phase 0.4 |
| Ordnungsmuster | STRUKTUR-FREEZE | Phase 0.4 |
| Stundenfrage | STRUKTUR-FREEZE | Phase 0.4 |
| SCPL-Texte (kontextsatz, schritt-Saetze, problem.satz) | FORMULIERUNGS-OFFEN | Bis Phase 2.1c Achse 6 |
| zusammenfassung, ueberleitung | NICHT PRODUZIERT | Erst in Phase 2.1c |

Empfehlung: Implementieren. AGENT_TAFELBILD.md und alle Vertraege aktualisieren. Das Wort "TB-FREEZE" ersetzen durch "STRUKTUR-FREEZE" (wo Struktur gemeint ist) oder durch den differenzierten Status.

Begruendung: Der undifferenzierte TB-FREEZE ist die operative Ursache fuer SP-3 und SP-4. Die Differenzierung loest beide.

Aufwand: Gering (Terminologie-Aenderung in Dokumentation + Vertraegen)

Risiko bei Nicht-Umsetzung: Hoch. Ohne differenzierten FREEZE ist die Zwei-Stufen-Architektur (PF-7) nicht implementierbar, und Q-M2-05 bleibt ungeloest.

---

**PF-10: Sollte zusammenfassung erst nach Material-Produktion formuliert werden?**

Befund: Ja, eindeutig. Die zusammenfassung in der aktuellen sicherung.json (Phase 2.0) liest sich abstrakt:

> "Das Attentat von Sarajevo war der Ausloeser, aber nicht die Ursache des Krieges. Die Ursachen — Buendnisse, Rivalitaeten, Misstrauen — lagen schon vorher bereit."

Das ist eine korrekte, aber generische Zusammenfassung, die ohne Material-Kenntnis geschrieben wurde. Eine material-informierte zusammenfassung koennte stattdessen auf den konkreten Erarbeitungsweg Bezug nehmen:

> "Ihr habt gesehen, wie das Attentat von Sarajevo eine Kettenreaktion ausloeste — vom Blankoscheck ueber das Ultimatum bis zu den Kriegserklaerungen. Der Mord war der Funke, aber die Buendnispflichten waren das Pulverfass."

Der zweite Text ist didaktisch staerker, weil er den Lernweg rekapituliert (G10: Rekapitulierbarkeit).

Empfehlung: zusammenfassung aus Phase 2.0 entfernen. In Phase 2.1c (Achse 6, Hefteintrag-Revision) erstmalig produzieren.

Begruendung: Die zusammenfassung ist per Definition ein Synthese-Text. Synthese erfordert Kenntnis des Erarbeitungsprozesses. In Phase 2.0 existiert dieser noch nicht.

Aufwand: Gering (VERTRAG_PHASE_2-0: zusammenfassung-Feld als "placeholder" oder "leer" markieren. VERTRAG_PHASE_2-1c: zusammenfassung-Produktion als Teil von Achse 6.)

Risiko bei Nicht-Umsetzung: zusammenfassung bleibt generisch und didaktisch schwach. Kein funktionaler Bruch, aber verpasste Qualitaetschance.

---

### 5.4 Zur Steuerungswirkung

---

**PF-11: Steuert der Hefteintrag tatsaechlich die Material-Produktion?**

Befund: Indirekt, aber wirksam. AGENT_MATERIAL (Design-Modus, Phase 1.1) liest das fixierte TAFELBILD und fuehrt einen Erarbeitbarkeits-Nachweis pro TB-Knoten durch (Sektion 1.4-1.5 in AGENT_MATERIAL.md). Jedes Material muss einem SCPL-Schritt zugeordnet sein. Das ist eine echte Steuerung — kein Material wird ohne TB-Bezug entworfen.

Aber: Die Steuerung laeuft ueber SCPL-Schritte (Struktur-Ebene), nicht ueber Hefteintrag-Saetze (Formulierungs-Ebene). Das ist fuer Phase 1 (Design) korrekt — beim Design geht es um "welches Material fuer welchen Schritt", nicht um "wie formuliere ich den Hefteintrag passend zum Material".

Die Steuerung bricht ab, wo sie abbrechen muss: In Phase 2.1 (Produktion) produziert jeder SUB_MATERIAL_*-Subagent isoliert (P4). Er liest den zugehoerigen SCPL-Schritt als Zielstruktur (VERTRAG_PHASE_2-1, Read-Schritt 2). Das ist binaere Steuerung (Schritt abgedeckt: ja/nein), keine qualitative Steuerung (Formulierung des Hefteintrags passt zum Material: ungeprüft).

Empfehlung: Die binaere Steuerung (Struktur-Ebene) ist fuer Phase 1 und 2.1 ausreichend. Die qualitative Steuerung (Formulierungs-Ebene) wird durch die Zwei-Stufen-Architektur (PF-7) nachgeliefert: In Phase 2.1c liest der Dispatch alle Materialien und kann die Hefteintrag-Formulierungen anpassen.

Begruendung: Volle bidirektionale Steuerung (Material ← → Hefteintrag) waere zirkulaer. Die Loesung ist sequentiell: Hefteintrag steuert Material-Struktur (Phase 1) → Material informiert Hefteintrag-Formulierung (Phase 2.1c).

Aufwand: Keiner (ergibt sich aus PF-7)

Risiko bei Nicht-Umsetzung: Die Steuerungsluecke (SP-6) bleibt bestehen. Materialien und Hefteintrag existieren parallel, statt aufeinander zu verweisen.

---

**PF-12: Sollte jeder SUB_MATERIAL_*-Dispatch den SCPL-Schritt als expliziten Input erhalten?**

Befund: Der Schritt wird bereits gelesen (VERTRAG_PHASE_2-1, Read-Schritt 2: "rahmen/tafelbild.json → NUR knoten die in tafelbild_knoten referenziert + stundenfrage"). Allerdings liest der Subagent den SCPL-Schritt ueber den Umweg tafelbild_knoten (Knoten-ID aus MATERIAL_GERUEST) → knoten[] in tafelbild.json (Legacy-Feld).

Der SCPL-Schritt selbst (situation.kontextsatz, complication[].schritt, problem.satz) wird NICHT explizit uebergeben. Der Subagent sieht den alten knoten[]-Eintrag (z.B. "Attentat von Sarajevo (28.6.1914)"), nicht den SCPL-Satz ("Am 28. Juni 1914 erschiesst Gavrilo Princip den oesterreichisch-ungarischen Thronfolger...").

Empfehlung: VERTRAG_PHASE_2-1 Read-Schritt 2 erweitern: Neben knoten[] auch den zugehoerigen scpl-Schritt (Situation/Complication/Problem) als Input uebergeben. Das gibt dem Subagenten den didaktischen Kontext, den er braucht, um material-spezifische Formulierungen zu produzieren, die mit dem Hefteintrag harmonieren.

Begruendung: Der SCPL-Schritt ist didaktisch reicher als der Knoten-Text. Er enthaelt den Fachbegriff, den Argumentationsschritt und die Einbettung in die SCPL-Kette. Das verbessert die Material-Qualitaet ohne zusaetzlichen Dispatch.

Aufwand: Gering (1 Feld mehr im Read-Schritt 2 des Vertrags)

Risiko bei Nicht-Umsetzung: Gering — die Subagenten funktionieren auch ohne. Aber die Material-Hefteintrag-Kohaerenz waere hoeher mit dem SCPL-Schritt als Input.

---

**PF-13: Prueft das Material-Q-Gate Erarbeitbarkeit qualitativ oder nur binaer?**

Befund: Binaer. Die Cross-Konsistenz (Phase 2.1c, Achse 4) prueft: "Decken alle Materialien zusammen alle TB-Knoten ab? FAIL wenn: Ein TB-Knoten wird von keinem Material abgedeckt (binaer pruefbar)." Das ist ein Abdeckungs-Check, keine Qualitaetspruefung der Erarbeitbarkeit.

Die typ-spezifischen Q-Gates (MQ1-MQ5) pruefen Material-interne Qualitaet (Sprachregister, Laenge, Quellenangabe), aber NICHT: "Macht dieses Material den Hefteintrag-Baustein tatsaechlich erarbeitbar? Koennten SuS aus diesem Material den zugehoerigen SCPL-Schritt eigenstaendig erschliessen?"

Empfehlung: MQ6 einfuehren: "Erarbeitbarkeits-Plausibilitaet: Der zentrale Inhalt des Materials muss den zugehoerigen SCPL-Schritt (Fachbegriff + Kernaussage) so behandeln, dass SuS ihn nach Bearbeitung eigenstaendig formulieren koennten." Das ist ein SOLL-Kriterium (nicht MUSS), weil die Pruefung qualitativ ist und Ermessensspielraum hat.

Begruendung: Ein Material kann einen TB-Knoten formal abdecken (der Fachbegriff kommt vor), ohne ihn erarbeitbar zu machen (der Fachbegriff wird nicht erklaert, nur erwaehnt). Die binaere Pruefung reicht nicht.

Aufwand: Gering (1 neues Q-Gate-Kriterium)

Risiko bei Nicht-Umsetzung: Materialien koennten formal korrekt sein, aber didaktisch leer — der TB-Knoten wird erwaehnt, aber nicht erarbeitet.

---

### 5.5 Zur Gesamtarchitektur

---

**PF-14: Waere eine alternative Phasenstruktur besser?**

Befund: Die vorgeschlagene Alternative (Phase 0.4 produziert NUR Kernerkenntnisse + Merksaetze, kein SCPL-Volltext → Phase 2.1c produziert vollstaendigen SCPL-Hefteintrag MIT Material-Kontext) ist theoretisch eleganter, aber operativ riskanter als die Zwei-Stufen-Architektur (PF-7).

Gruende gegen die Alternative:
1. **AGENT_MATERIAL verliert seine Zielstruktur.** Ohne SCPL-Volltext in Phase 0.4 hat MATERIAL keinen Erarbeitbarkeits-Nachweis pro SCPL-Schritt, sondern nur pro Kernerkenntnis. Das ist weniger granular — eine Kernerkenntnis kann durch 3 SCPL-Schritte erarbeitet werden. Ohne SCPL-Schritte ist unklar, wie viele und welche Materialien noetig sind.
2. **Der Hefteintrag wird zum Engpass.** Wenn der vollstaendige Hefteintrag erst in Phase 2.1c entsteht, haengt die gesamte Sicherung (Engine-Rendering, Aufgaben-Referenzen, Transferfrage) an einem einzigen spaeten Dispatch. Fehler dort sind teuer.
3. **Token-Budget.** Phase 2.1c muss bereits alle Materialien + TAFELBILD + MATERIAL_GERUEST + einstieg.json lesen. Einen vollstaendigen Hefteintrag dazu zu produzieren (statt nur zu revidieren) erhoehe die Kontextlast unnoetig.

Empfehlung: NICHT implementieren. Die Zwei-Stufen-Architektur (PF-7) ist der bessere Kompromiss: Phase 0.4 produziert den vollstaendigen SCPL-Hefteintrag als Steuerungsinstrument. Phase 2.1c revidiert NUR die Formulierungen.

Begruendung: Steuerungswirkung vor Materialien (Phase 0.4) ist wertvoller als perfekte Formulierung. Die Formulierung kann nachgeliefert werden — die Struktur nicht.

Aufwand: Keiner (Empfehlung: nicht implementieren)

Risiko bei Nicht-Umsetzung: Keines — die Alternative ist nicht empfohlen.

---

**PF-15: Welche der 6 Strukturprobleme sind kritisch?**

Befund:

| SP | Schwere | Begruendung |
|---|---|---|
| **SP-3: Timing-Inversion** | **KRITISCH** | Direkte Ursache von Q-M2-05. Hefteintrag-Formulierungen werden vor Materialien finalisiert und koennen danach nicht auf Material-Erfahrung Bezug nehmen. Wiederholt sich bei jeder Mappe. |
| **SP-4: TB-FREEZE zu restriktiv** | **KRITISCH** | Blocker fuer die Loesung von SP-3. Ohne differenzierten FREEZE ist keine Formulierungs-Revision moeglich. |
| **SP-6: Steuerungsrichtung unterbrochen** | **HOCH** | Architektonische Luecke — Materialien koennen den Hefteintrag nicht rueckwirkend informieren. Aber: durch PF-7 loesbar. |
| **SP-1: Begriffsvermischung** | **MITTEL** | Kognitive Reibung, kein funktionaler Bruch. Loesbar durch Umbenennung (PF-4), aber nicht dringend. |
| **SP-2: Sicherung als Sammel-Artefakt** | **MITTEL** | Timing-Kopplung (zusammenfassung + kernerkenntnisse gleichzeitig produziert, obwohl unterschiedlich zeitbar). Loesbar durch Split (PF-5). |
| **SP-5: Doppelte Kernerkenntnisse** | **NIEDRIG** | Normalisierungs-Anomalie. M3b erzwingt Identitaet, also ist die Dopplung funktional harmlos. Loesbar durch Engine-Aenderung (kernerkenntnisse aus tafelbild.json lesen statt aus sicherung.json), aber nicht dringend. |

Empfehlung: SP-3 + SP-4 sofort adressieren (Zwei-Stufen-Architektur + differenzierter FREEZE). SP-6 loest sich damit mit. SP-1, SP-2, SP-5 in Retrospektive einplanen.

---

**PF-16: Gibt es eine Prozessstruktur, die alle 5 Anforderungen gleichzeitig erfuellt?**

Befund: Ja. Die Zwei-Stufen-Architektur mit differenziertem FREEZE erfuellt alle fuenf Anforderungen:

**(a) Backward Design ab Merksatz:** Phase 0.4 produziert Kernerkenntnisse und SCPL-Struktur VOR Materialien. AGENT_MATERIAL nutzt beides als Zielstruktur. ✓

**(b) Material-aware Formulierungen:** Phase 2.1c Achse 6 revidiert SCPL-Texte NACH Material-Produktion. zusammenfassung und ueberleitung werden erstmals hier produziert. ✓

**(c) TB-FREEZE fuer Struktur:** STRUKTUR-FREEZE ab Phase 0.4: SCPL-Zonen, Kernerkenntnisse, Fachbegriffe, Ordnungsmuster, Stundenfrage sind geschuetzt. FORMULIERUNGS-OFFEN fuer Saetze. ✓

**(d) Minimale Dispatch-Anzahl:** Kein neuer Dispatch. Achse 6 wird in den bestehenden Phase-2.1c-Dispatch integriert. Token-Kosten: ~500 zusaetzliche Token (Regelwerk + Revisions-Output). ✓

**(e) Keine zirkulaeren Abhaengigkeiten:** Der Informationsfluss ist strikt linear:
```
Phase 0.4: SKRIPT → TB (Struktur + Erstformulierung) [STRUKTUR-FREEZE]
Phase 1.1: TB → MATERIAL_GERUEST (Steuerung)
Phase 2.0: TB → Rahmen-JSONs (kernerkenntnisse, einstieg)
Phase 2.1: GERUEST + TB → Materialien (isoliert)
Phase 2.1c: Materialien + TB → Cross-Konsistenz + Formulierungs-Revision + zusammenfassung/ueberleitung
```
Kein Schritt liest seinen eigenen Output als Input. ✓

Empfehlung: Diese Architektur implementieren. Sie ist die einzige evaluierte Option, die alle fuenf Anforderungen gleichzeitig erfuellt.

---

## Konsolidierte Empfehlung: Priorisierte Massnahmen-Liste

### Prioritaet 1 — Sofort (vor Mappe 3)

| #   | Massnahme                                                                                                                                                                                      | Loest                                 | Aufwand | Betroffene Dateien                                    |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ------- | ----------------------------------------------------- |
| M1  | **Differenzierten FREEZE einfuehren:** STRUKTUR-FREEZE (Zonen, KE, Fachbegriffe, Muster, Frage) vs. FORMULIERUNGS-OFFEN (Saetze). Terminologie in allen Dokumenten aktualisieren.              | SP-4, Voraussetzung fuer M2           | Gering  | AGENT_TAFELBILD.md, alle 6 Vertraege, ORCHESTRATOR.md |
| M2  | **VERTRAG_PHASE_2-1c: Achse 6 "Hefteintrag-Revision" einfuehren.** Regelwerk: erlaubte vs. verbotene Aenderungen (PF-8). Output: revidierte SCPL-Texte + zusammenfassung + ueberleitung.       | SP-3, SP-6, Q-M2-05                   | Mittel  | VERTRAG_PHASE_2-1c_CROSS.md                           |
| M3  | **VERTRAG_PHASE_2-0: zusammenfassung als Placeholder.** Phase 2.0 produziert zusammenfassung NICHT mehr (oder nur als Entwurf mit "[REVISION IN 2.1c]"-Markierung). Finale Produktion in 2.1c. | SP-3 (Teilaspekt)                     | Gering  | VERTRAG_PHASE_2-0_RAHMEN.md                           |
| M4  | **VERTRAG_PHASE_2-1: SCPL-Schritt als expliziten Input.** Read-Schritt 2 erweitern: neben knoten[] auch den zugehoerigen scpl{}-Schritt lesen.                                                 | PF-12, Material-Hefteintrag-Kohaerenz | Gering  | VERTRAG_PHASE_2-1_MATERIAL.md                         |

### Prioritaet 2 — Kurzfristig (Runde 5 / vor Game 2)

| # | Massnahme | Loest | Aufwand | Betroffene Dateien |
|---|---|---|---|---|
| M5 | **MQ6 "Erarbeitbarkeits-Plausibilitaet" einfuehren.** SOLL-Kriterium im Material-Q-Gate. | PF-13 | Gering | QUALITAETSKRITERIEN_MATERIALPRODUKTION.md |
| M6 | **sicherung.json aufsplitten:** hefteintrag.json (= tafelbild.json umbenannt) + sicherung_rahmen.json (zusammenfassung, ueberleitung, reflexionsimpuls, hefteintrag_verweis). | SP-2, SP-5 | Mittel | VERTRAG_PHASE_2-0, Engine, Assembly |
| M7 | **Begriffe umbenennen:** "Tafelbild" → "Hefteintrag" durchgaengig. AGENT_TAFELBILD → AGENT_HEFTEINTRAG. | SP-1 | Mittel (mechanisch) | ~20 Dateien |

### Prioritaet 3 — Langfristig (spaetere Runden)

| # | Massnahme | Loest | Aufwand |
|---|---|---|---|
| M8 | **SP-5: Kernerkenntnisse-Dopplung eliminieren.** Engine liest kernerkenntnisse direkt aus tafelbild.json → scpl.loesung[]. sicherung.json enthaelt kein eigenes kernerkenntnisse-Feld mehr. | SP-5 | Gering (Engine-Patch) |
| M9 | **GUETEKRITERIEN_HEFTEINTRAG.md erstellen.** Analogon zu GUETEKRITERIEN_AUFGABEN.md, mit Kriterien fuer didaktische Qualitaet der Sicherung (Kohaerenz, Rekapitulierbarkeit, Merksatz-Synthese, Material-Bezug). | Q-M2-05 (Praevention) | Mittel |

---

## Zusammenfassung

Das Kernproblem ist identifiziert und loesbar: Die Timing-Inversion (Hefteintrag-Formulierungen werden vor Materialien finalisiert) erzeugt abstrakte, material-entkoppelte Hefteintraege. Die Loesung ist eine Zwei-Stufen-Architektur mit differenziertem FREEZE, die ALLE fuenf Anforderungen (Backward Design, Material-Awareness, Struktur-Schutz, Minimale Dispatches, Azyklizitaet) gleichzeitig erfuellt. Der operative Aufwand ist gering: kein neuer Dispatch, nur Erweiterung des bestehenden Phase-2.1c-Vertrags und Aktualisierung der FREEZE-Terminologie.
