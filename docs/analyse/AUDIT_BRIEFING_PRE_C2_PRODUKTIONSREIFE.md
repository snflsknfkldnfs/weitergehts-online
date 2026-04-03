# AUDIT BRIEFING: Produktionsreife-Pruefung vor C2 (Mappe-4-Validierung)

**Datum:** 2026-04-03
**Auftraggeber:** PM (Cowork Session 9)
**Anlass:** Infrastruktur-Revision abgeschlossen (A1-A7, B1-B2, C1, C1b D1-D3). Vor der Mappe-4-Vollproduktion (12-16h, Phase C2) soll die Gesamtkohaerenz der Infrastruktur extern geprueft werden.
**Kontext:** Die Infrastruktur wurde ueber 8+ Sessions inkrementell gepatcht. Kein einzelner Durchlauf hat je die Gesamtkohaerenz aller Dokumente gegen den aktuellen Stand geprueft.

---

## 1. Audit-Dimensionen

Drei parallele Reviewer mit getrennten Pruefauftraegen:

### Dimension A: Technische Kohaerenz (Architektur + Schema)

**Prueffrage:** Sind alle Infrastruktur-Dokumente intern konsistent — gleiche Feldnamen, gleiche Schemata, gleiche Q-Gate-Pruefschritte, keine verwaisten Referenzen, keine widersprüchlichen Regeln?

**Pruefschritte:**
1. **Schema-Konsistenz:** Stimmen die JSON-Feld-Definitionen in den Vertraegen mit den Rendering-Kontrakten in den SUB_AUFGABE/SUB_MATERIAL-Prompts ueberein? Stimmen beide mit dem tatsaechlichen data.json-Schema (escape-games/template/data.json + escape-games/gpg-erster-weltkrieg-ursachen/data.json)?
2. **Q-Gate-Vollstaendigkeit:** Referenzieren alle Vertraege die gleichen Q-Gate-Kriterien? Sind die A-Kriterien (A1-A18) in GUETEKRITERIEN_AUFGABEN.md vollstaendig in den 5 SUB_AUFGABE-Q-Gate-Tabellen abgebildet (mit klarer Zustaendigkeitstrennung Subagent vs. Orchestrator)?
3. **Referenz-Integritaet:** Verweisen ORCHESTRATOR.md, AGENT_RAETSEL.md, AGENT_MATERIAL.md auf existierende Dateien unter den richtigen Pfaden? Stimmen die Dateinamen mit dem Dateistruktur-Refactoring M6/M7/M8 ueberein (Tafelbild→Hefteintrag, kernerkenntnisse-Eliminierung)?
4. **Rendering-Kontrakt vs. Engine:** Stimmen die in SUB_AUFGABE_*.md dokumentierten Rendering-Kontrakte (HTML-Struktur, CSS-Klassen, data-Attribute) mit dem tatsaechlichen Code in escape-engine.js ueberein?
5. **Vertrags-Kette:** Sind die 6 Phasen-Vertraege lueckenlos? Stimmen die Read-Anweisungen (welche Dateien ein Dispatch liest) mit den Write-Outputs der Vorgaenger-Phase?
6. **Cache-Busting-Konsistenz:** Haben alle HTML-Dateien identische ?v=-Parameter auf CSS/JS-Referenzen?

**Pflichtlektuere:**
- docs/architektur/vertraege/ (alle 6 Vertraege)
- docs/agents/ORCHESTRATOR.md
- docs/agents/AGENT_RAETSEL.md, AGENT_MATERIAL.md
- docs/agents/SUB_AUFGABE_MC.md, SUB_AUFGABE_ZUORDNUNG.md, SUB_AUFGABE_LUECKENTEXT.md, SUB_AUFGABE_FREITEXT.md, SUB_AUFGABE_REIHENFOLGE.md
- docs/agents/SUB_MATERIAL_DARSTELLUNGSTEXT.md, SUB_MATERIAL_QUELLENTEXT.md, SUB_MATERIAL_BILDQUELLE.md, SUB_MATERIAL_TAGEBUCH.md, SUB_MATERIAL_KARTE.md, SUB_MATERIAL_STATISTIK.md, SUB_MATERIAL_ZEITLEISTE.md
- docs/checklisten/GUETEKRITERIEN_AUFGABEN.md
- docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md
- assets/js/escape-engine.js (Rendering-Funktionen: _renderMC, _renderLueckentext, _renderZuordnung, _renderReihenfolge, _renderFreitext, _renderHefteintrag)
- assets/css/themes/theme-gpg.css
- escape-games/gpg-erster-weltkrieg-ursachen/data.json (als empirisches Referenz-Schema)
- escape-games/template/data.json (als Template-Schema)

**Severity-Schema:**
- BLOCKER: Schema-Widerspruch, der bei Mappe-4-Produktion zu Engine-Inkompatibilitaet oder Datenverlust fuehrt
- HIGH: Q-Gate-Luecke, die dazu fuehrt, dass ein bekannter Fehlertyp nicht erkannt wird
- MEDIUM: Verwaiste Referenz, inkonsistente Benennung, fehlende Querverweise
- LOW: Formulierungs-Inkonsistenz ohne funktionale Auswirkung

### Dimension B: Paedagogisch-Didaktische Kalibrierung

**Prueffrage:** Sind die Guetekriterien, SCPL-Strukturvorgaben, AFB-Progressionen und Aufgabentyp-Verteilungen fuer das Zielniveau (R7, Mittelschule Bayern, GPG) angemessen kalibriert? Produziert die Infrastruktur didaktisch fundierte Escape-Games — oder nur formal korrekte?

**Pruefschritte:**
1. **Guetekriterien-Kalibrierung:** Sind A1-A18 (Aufgaben), HE1-HE13 (Hefteintrag-Produkt), G1-G14 (Hefteintrag-Entwurf), SK1-SK15 (Skript), S1-S15 (Sequenzierung) fuer R7-Niveau angemessen? Sind Kriterien vorhanden, die fuer Gymnasium konzipiert sind und Mittelschueler ueberfordern? Fehlen Kriterien, die fuer R7 wichtig waeren (z.B. Sprachvereinfachung, Scaffolding-Dichte)?
2. **SCPL-Struktur:** Ist die Situation-Complication-Problem-Loesung-Struktur fuer 7.-Klasse-GPG geeignet? Sind die Vorgaben zu starr oder zu frei? Sind die Ordnungsmuster (kausal, chronologisch, kontrastierend, kategorial) angemessen fuer den Reifegrad?
3. **AFB-Progression:** Ist die vorgegebene AFB-Staffelung (I→II→III pro Mappe) realistisch fuer eine Escape-Game-Einheit? Passt die kognitive Last fuer R7?
4. **Aufgabentyp-Verteilung:** Sind 5 Typen (MC, Zuordnung, Lueckentext, Reihenfolge, Freitext) ausreichend? Fehlt ein Typ, der fuer Escape-Games didaktisch wichtig waere (z.B. Bildbeschreibung, Quellenvergleich)? Ist die Gewichtung sinnvoll?
5. **Material-Didaktik:** Sind die 7 Materialtypen (DT, QT, BQ, KA, ZL, ST, TB) fuer GPG-R7 angemessen? Stimmt die didaktische Funktionszuweisung (einstieg, erarbeitung, sicherung) mit fachdidaktischen Standards?
6. **Hefteintrag-Qualitaet:** Pruefen anhand der Mappe-3-Daten: Ist der SCPL-Hefteintrag fuer R7 verstaendlich? Sind Fachbegriffe altersgerecht eingefuehrt? Stimmt die kognitive Progression (S→C→P→L)?

**Pflichtlektuere:**
- docs/checklisten/GUETEKRITERIEN_AUFGABEN.md (A1-A18)
- docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md (G1-G14)
- docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG_PRODUKT.md (HE1-HE13)
- docs/checklisten/GUETEKRITERIEN_SKRIPT.md (SK1-SK15)
- docs/checklisten/GUETEKRITERIEN_SEQUENZIERUNG.md (S1-S15)
- docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md (M1-M12 + typ-spezifisch)
- docs/agents/AGENT_HEFTEINTRAG.md (SCPL-Struktur)
- docs/agents/AGENT_RAETSEL.md (Aufgaben-Architektur, AFB-Progression)
- docs/agents/AGENT_SKRIPT.md (Inhaltsgeruest, Sprachniveau)
- docs/architektur/vertraege/VERTRAG_PHASE_2-0_RAHMEN.md (Hefteintrag-Schema)
- escape-games/gpg-erster-weltkrieg-ursachen/data.json (Mappe-3-Daten als empirisches Muster)

**Severity-Schema:**
- BLOCKER: Kriterium ist fuer R7 unangemessen und fuehrt zu systematisch ueberfordernden oder unterfordernden Aufgaben
- HIGH: Fehlende Kalibrierung, die bei Mappe-4-Produktion zu Nacharbeit fuehrt
- MEDIUM: Didaktische Optimierungsmoeglichkeit ohne akute Fehler
- LOW: Stilistische oder terminologische Empfehlung

### Dimension C: Engine-Schema-Kompatibilitaet

**Prueffrage:** Kann die escape-engine.js jedes in den Vertraegen/Prompts definierte JSON-Schema korrekt rendern? Gibt es Felder, die in den Produktions-Prompts erzeugt werden, aber von der Engine ignoriert oder falsch interpretiert werden?

**Pruefschritte:**
1. **Feld-fuer-Feld-Abgleich:** Fuer jeden Aufgabentyp: Vergleiche das Schema in SUB_AUFGABE_*.md (Sektion "data.json Schema") mit der tatsaechlichen Rendering-Funktion in escape-engine.js. Felder, die im Schema stehen aber nicht gerendert werden? Felder, die die Engine erwartet aber im Schema fehlen?
2. **Hefteintrag-Rendering:** Vergleiche das Hefteintrag-Schema in VERTRAG_PHASE_2-0 mit der Engine-Funktion _renderHefteintrag. Insbesondere: SCPL-Felder, Knoten, Verbindungen, Ordnungsmuster.
3. **Material-Rendering:** Vergleiche die Material-Schemata (7 Typen) mit den Engine-Rendering-Funktionen. Felder wie quellenangaben[], bildunterschrift, sequenz_kontext — werden sie gerendert?
4. **Edge Cases:** Felder mit null-Wert (z.B. darstellung: null in SCPL), leere Arrays, optionale Felder — wie geht die Engine damit um?
5. **Engine-Erweiterungen (O3/O5/O6):** Ordnungsmuster-Rendering, Pfeiltypen fuer Verbindungen, Farbsemantik — sind diese bereits implementiert oder als Stretch markiert? Wenn nicht implementiert: Erzeugen die Prompts trotzdem Daten fuer diese Features?

**Pflichtlektuere:**
- assets/js/escape-engine.js (komplett)
- assets/css/themes/theme-gpg.css (Rendering-relevante Klassen)
- docs/agents/SUB_AUFGABE_MC.md, SUB_AUFGABE_ZUORDNUNG.md, SUB_AUFGABE_LUECKENTEXT.md, SUB_AUFGABE_FREITEXT.md, SUB_AUFGABE_REIHENFOLGE.md (jeweils Sektion "Rendering-Kontrakt" und "data.json Schema")
- docs/agents/SUB_MATERIAL_DARSTELLUNGSTEXT.md, SUB_MATERIAL_QUELLENTEXT.md, SUB_MATERIAL_BILDQUELLE.md, SUB_MATERIAL_TAGEBUCH.md (jeweils Schema-Sektion)
- docs/architektur/vertraege/VERTRAG_PHASE_2-0_RAHMEN.md (Hefteintrag-Schema)
- escape-games/gpg-erster-weltkrieg-ursachen/data.json (empirische Referenz)

**Severity-Schema:**
- BLOCKER: Prompt erzeugt Feld, das die Engine zum Absturz bringt oder falsch rendert
- HIGH: Prompt erzeugt Feld, das die Engine ignoriert — Informationsverlust fuer SuS
- MEDIUM: Schema-Diskrepanz ohne sofortige Auswirkung (z.B. Stretch-Feature)
- LOW: Kosmetische Inkonsistenz

---

## 2. Audit-Durchfuehrung

**Methode:** agent-teams mit 3 parallelen Reviewern (Dimensionen A, B, C).

**Erwartetes Output pro Reviewer:**
1. Finding-Tabelle: ID, Severity, Datei(en), Soll, Ist, Empfehlung
2. Zusammenfassung: Anzahl Findings pro Severity, Gesamtbewertung (PRODUKTIONSREIF / BEDINGT PRODUKTIONSREIF / NICHT PRODUKTIONSREIF)
3. Top-3-Risiken fuer C2

**Konsolidierung:** PM konsolidiert die 3 Ergebnisse zu einem Gesamtbefund mit Entscheidung:
- PROCEED: C2 starten
- PATCH-THEN-PROCEED: Spezifische Fixes vor C2
- REDESIGN: Architektur-Revision noetig (unwahrscheinlich)

**Ergebnis-Ablage:** docs/analyse/AUDIT_PRE_C2_ERGEBNIS.md

---

## 3. Datei-Inventar (Audit-Scope)

### Vertraege (6)
- docs/architektur/vertraege/VERTRAG_PHASE_2-0_RAHMEN.md
- docs/architektur/vertraege/VERTRAG_PHASE_2-1_MATERIAL.md
- docs/architektur/vertraege/VERTRAG_PHASE_2-1c_CROSS.md
- docs/architektur/vertraege/VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md
- docs/architektur/vertraege/VERTRAG_PHASE_2-2b_AUFGABE.md
- docs/architektur/vertraege/VERTRAG_PHASE_2-2c_CROSS.md

### Orchestrator + Agenten (10)
- docs/agents/ORCHESTRATOR.md
- docs/agents/AGENT_RAETSEL.md
- docs/agents/AGENT_MATERIAL.md
- docs/agents/AGENT_HEFTEINTRAG.md
- docs/agents/AGENT_SKRIPT.md
- docs/agents/AGENT_INHALT.md
- docs/agents/AGENT_DIDAKTIK.md
- docs/agents/AGENT_ARTEFAKT.md
- docs/agents/AGENT_DESIGN.md
- docs/agents/AGENT_TECHNIK.md

### Subagenten Aufgaben (5)
- docs/agents/SUB_AUFGABE_MC.md
- docs/agents/SUB_AUFGABE_ZUORDNUNG.md
- docs/agents/SUB_AUFGABE_LUECKENTEXT.md
- docs/agents/SUB_AUFGABE_REIHENFOLGE.md
- docs/agents/SUB_AUFGABE_FREITEXT.md

### Subagenten Materialien (7)
- docs/agents/SUB_MATERIAL_DARSTELLUNGSTEXT.md
- docs/agents/SUB_MATERIAL_QUELLENTEXT.md
- docs/agents/SUB_MATERIAL_BILDQUELLE.md
- docs/agents/SUB_MATERIAL_KARTE.md
- docs/agents/SUB_MATERIAL_STATISTIK.md
- docs/agents/SUB_MATERIAL_TAGEBUCH.md
- docs/agents/SUB_MATERIAL_ZEITLEISTE.md

### Guetekriterien (6)
- docs/checklisten/GUETEKRITERIEN_AUFGABEN.md
- docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md
- docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG_PRODUKT.md
- docs/checklisten/GUETEKRITERIEN_SKRIPT.md
- docs/checklisten/GUETEKRITERIEN_SEQUENZIERUNG.md
- docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md

### Engine + Styles (2)
- assets/js/escape-engine.js
- assets/css/themes/theme-gpg.css

### Empirische Referenz (2)
- escape-games/gpg-erster-weltkrieg-ursachen/data.json
- escape-games/template/data.json

**Gesamt: 38 Dateien**

---

## 4. Abgrenzung

**Im Scope:**
- Kohaerenz aller Infrastruktur-Dokumente untereinander
- Didaktische Kalibrierung der Guetekriterien fuer R7/GPG
- Engine-Schema-Kompatibilitaet

**Nicht im Scope:**
- Inhaltliche Korrektheit der Mappe-1/2/3-Daten (Faktencheck)
- WCAG-Accessibility-Audit (separat, nach Mappe 4, mit accessibility-compliance Plugin)
- Performance/Ladezeiten der Website
- Git-Workflow oder CI/CD
- Produktion neuer Inhalte
