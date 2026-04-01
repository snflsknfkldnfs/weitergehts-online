# Audit-Auftrag: v4 Produktionsarchitektur — Strategische Qualitaetsevaluation

**Datum:** 2026-03-31
**Auftraggeber:** Cowork (Projektmanagement)
**Ausfuehrung:** Claude Code (frische Session, Read-Only)
**Modus:** Analyse — KEINE Dateien aendern, KEIN Git
**Vorgaenger-Audit:** docs/analyse/AUDIT_v4_ARCHITEKTUR_ERGEBNIS.md (mechanisch + strategisch, gleicher Tag)

---

## 1. Auftrag

Der erste Audit hat die technische Korrektheit und grundsaetzliche Architekturentscheidung evaluiert. Dieser zweite Audit fokussiert auf eine andere Frage:

**Ist die geplante Prozessstruktur geeignet, die Qualitaet des Produktionsprozesses und des Produkts (didaktische Materialien fuer R7-Escape-Games) verlässlich zu maximieren?**

"Verlässlich" ist zentral: Nicht ob ein idealer Durchlauf gute Ergebnisse liefert, sondern ob die Prozessstruktur auch unter realen Bedingungen (Compaction, Token-Limits, Sessions-Grenzen, Prompt-Drift) konsistent hohe Qualitaet erzwingt.

---

## 2. Systemkontext

### 2.1 Zweck des Gesamtsystems

Produktion interaktiver Escape-Games fuer den GPG-Unterricht (7. Klasse Mittelschule Bayern). Schueler:innen (R7-Sprachniveau, ~12-13 Jahre) bearbeiten historische Materialien (Darstellungstexte, Quellentexte, Tagebucher, Zeitleisten, Bildquellen) und loesen darauf basierende Aufgaben (MC, Zuordnung, Lueckentext, Reihenfolge, Freitext). Ein Tafelbild strukturiert den Lernzuwachs, Einstieg und Sicherung rahmen die Lernsequenz.

### 2.2 Qualitaetsdimensionen des Produkts

1. **Didaktische Qualitaet:** Materialien sind fachwissenschaftlich korrekt, altersangemessen (R7), vergegenwaertigend (nicht abstrakt-analytisch), erarbeitbar (fuehren zum Tafelbild-Lernzuwachs). Aufgaben sind AFB-kongruent, material-referenziert, progressiv aufgebaut.
2. **Technische Qualitaet:** JSON-Felder sind engine-kompatibel, Bilder sind lokal gehostet, data.json ist valide, Rendering funktioniert.
3. **Kohaerenz:** Materialien, Aufgaben, Tafelbild, Einstieg, Sicherung bilden eine geschlossene Lernsequenz. Kein Element steht isoliert.
4. **Konsistenz:** Stundenfrage, Tafelbild-Knoten, Material-Inhalte, Aufgaben-Bezuege sind widerspruchsfrei.

### 2.3 Qualitaetsprobleme in bisherigen Versuchen

| Versuch | Qualitaetsproblem | Prozess-Ursache |
|---|---|---|
| Mappe 1 (erfolgreich) | Akzeptable Qualitaet, aber manuell gesteuert | Kein skalierbarer Prozess |
| Mappe 2 v1 | Didaktisch unzureichend — Subagenten-Expertise nicht genutzt | Monolithische Produktion, kein Dispatch |
| Mappe 2 v2 | 4/5 Aufgaben engine-inkompatibel, didaktische Qualitaet niedrig | Subagenten gelesen aber nicht isoliert angewendet |

### 2.4 v4-Anspruch

Die v4-Architektur soll durch strukturelle Massnahmen (isolierter Dispatch, Datei-Persistierung, Q-Gates, Schnittstellen-Vertraege) sicherstellen, dass die Subagenten-Expertise tatsaechlich wirksam wird und die Qualitaet nicht vom Zufall der Session-Bedingungen abhaengt.

---

## 3. Audit-Scope

### S1: Wirkt die Subagenten-Isolation qualitaetssteigernd?

Die Kernthese von v4: Isolierter Dispatch (ein Subagent pro Material/Aufgabe, eigener Kontext, frische Datei-Reads) fuehrt zu hoeherer didaktischer Qualitaet als monolithische Produktion.

- Ist diese These plausibel? Warum genau sollte Isolation bessere Materialien produzieren?
- Gibt es Gegenargumente? (z.B. verliert der isolierte Subagent den Gesamtkontext der Mappe, was zu inkonsistenten Materialien fuehren koennte?)
- Wie gut adressiert der Sequenzkontext (aus Phase 1.5) dieses Risiko?
- Reicht die Information, die jeder Dispatch laut Schnittstellen-Vertrag (P6) erhaelt, tatsaechlich aus, um qualitativ hochwertige Materialien zu produzieren — oder ist der Vertrag zu restriktiv?

### S2: Sind die Q-Gates qualitaetswirksam oder buerokratisch?

v4 definiert mehrere Q-Gate-Ebenen: MQ1-MQ5 pro Material, A1-A7 pro Aufgabe, typ-spezifische Kriterien, Cross-Konsistenz (A1/A3/A5/A8/A9/A10/A12).

- Pruefen die Q-Gates die richtigen Dinge? Oder pruefen sie primaer formale Kriterien (Wortanzahl, Feldvollstaendigkeit), waehrend die eigentliche didaktische Qualitaet (Vergegenwaertigung, Erarbeitbarkeit, Altersangemessenheit) untergeht?
- Ist die Q-Gate-Ausfuehrung realistisch? Kann ein Agent (der gerade ein Material produziert hat) sein eigenes Ergebnis kritisch pruefen, oder ist Selbst-Evaluation strukturell limitiert?
- Waere ein separater Q-Gate-Agent (der NUR prueft, nicht produziert) qualitaetswirksamer?
- Wie verhaelt sich die Q-Gate-Qualitaet ueber die Session-Dauer? Werden spaetere Q-Gates (Material 5/6, Aufgabe 4/5) oberflaechlicher, weil der Kontext waechst?

### S3: Ist die Rahmen-zuerst-Sequenz (P3) didaktisch optimal?

v4 produziert Tafelbild + Einstieg + Sicherung VOR den Materialien (Phase 2.0 → 2.1). Die Begruendung: Materialien koennen sich am Rahmen orientieren.

- Ist das didaktisch sinnvoll? Oder entsteht das Risiko, dass Materialien sich zu stark am Rahmen orientieren und den Kerninhalt der Quellen/Artefakte nicht voll ausschoepfen?
- Wie gut ist die P3-Verfeinerung ("Rahmen stuetzt, schraenkt nicht ein") in den Subagenten-Prompts operationalisiert? Oder bleibt sie ein Prinzip ohne Durchgriff?
- Waere eine Alternative denkbar: Materialien zuerst, dann Rahmen als Synthese der tatsaechlich produzierten Materialien?

### S4: Skaliert der Prozess ueber Mappen hinweg?

v4 produziert Mappe fuer Mappe. Fuer das aktuelle Game (4 Mappen) bedeutet das 4 Durchlaeufe.

- Entsteht ein Lerneffekt zwischen Mappen (der Prozess wird besser), oder verfaellt jede Mappe in dieselben Muster?
- Gibt es Mechanismen, die Erkenntnisse aus Mappe N in Mappe N+1 einfliessen lassen (jenseits der Sandwich-Methode)?
- Wie wird sichergestellt, dass die Gesamtprogression ueber alle 4 Mappen stimmt, wenn jede Mappe isoliert produziert wird?

### S5: Stimmt das Verhaeltnis Prozessaufwand zu Produktqualitaet?

Der v4-Prozess fuer eine Mappe umfasst: Phase 2.0 (4 Rahmen-JSONs) + Phase 2.1 (6 Material-Dispatches mit je 7-Schritt-Read + Q-Gate) + Phase 2.2a (Progressionsplan) + Phase 2.2b (5 Aufgaben-Dispatches) + Phase 2.2c (Cross-Konsistenz) + Phase 3 (Assembly). Das sind ca. 15-20 Agent-Dispatches mit jeweils mehreren Datei-Reads.

- Ist dieser Aufwand angemessen fuer das Ergebnis (6 Materialien + 5 Aufgaben)?
- Gibt es Dispatch-Schritte, die zusammengelegt werden koennten, ohne Qualitaet zu verlieren?
- Wo liegt der Diminishing-Returns-Punkt?

### S6: Schwachstellen-Analyse — Wo wird Qualitaet trotz v4 verloren gehen?

Jeder Prozess hat Schwachstellen. Die Frage ist nicht "ist v4 perfekt", sondern "wo sind die vorhersehbaren Qualitaetsverluste, und wie koennten sie adressiert werden?"

- Welche Qualitaetsdimension (S2.2) ist am staerksten gefaehrdet?
- Welcher Prozessschritt ist der fragilste?
- Was passiert, wenn ein Subagent systematisch schlechte Qualitaet liefert (z.B. SUB_MATERIAL_DARSTELLUNGSTEXT produziert zu abstrakte Texte)?

### S7: Vergleich mit dem Goldstandard (Mappe 1)

Mappe 1 wurde manuell gesteuert und ist das einzige funktionierende Deployment.

- Laesst sich aus den Mappe-1-Materialien rueckschliessen, welche Prozess-Elemente qualitaetsrelevant waren?
- Welche Qualitaetsmerkmale von Mappe 1 sind in v4 abgesichert, welche nicht?
- Gibt es Qualitaetsmerkmale in Mappe 1, die trotz (oder wegen) des informellen Prozesses entstanden sind und in einem formalisierten Prozess verloren gehen koennten?

---

## 4. Zu lesende Dateien

### Primaer (MUSS lesen)

```
docs/architektur/WORKFLOW_v4.md                    — Prozessstruktur (Phasen, Dispatch, Q-Gates)
docs/architektur/UPGRADE_PLAN_v4_PRODUKTIONSARCHITEKTUR.md  — Architekturprinzipien P1-P7, Schnittstellen
docs/analyse/AUDIT_v4_ARCHITEKTUR_ERGEBNIS.md      — Vorgaenger-Audit (um Redundanz zu vermeiden)
```

### Sekundaer (SOLL lesen — Subagenten-Expertise evaluieren)

```
docs/agents/SUB_MATERIAL_DARSTELLUNGSTEXT.md       — Vergegenwaertigungsprinzipien, Sprachregister R7, Q-Gate
docs/agents/SUB_MATERIAL_QUELLENTEXT.md            — Dreischritt-Aufbereitung, Quellentyp-Bestimmung
docs/agents/SUB_MATERIAL_BILDQUELLE.md             — Bilderschliessungs-Prinzipien, 6-Schritt-Erschliessung
docs/agents/SUB_AUFGABE_MC.md                      — Distractor-Konstruktion
docs/agents/SUB_AUFGABE_FREITEXT.md                — Leitfragen-Design, Scaffolding
docs/agents/AGENT_RAETSEL.md                       — Progressionsplan, AFB-Orchestration
docs/agents/AGENT_MATERIAL.md                      — Design-Modus, Sequenzplanung
```

### Tertiaer (bei Bedarf — Goldstandard + Checklisten)

```
escape-games/gpg-erster-weltkrieg-ursachen/data.json  — Mappe 1 als Goldstandard (Materialqualitaet evaluieren)
docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md  — M1-M12
docs/checklisten/GUETEKRITERIEN_TAFELBILD.md           — G1-G14
docs/checklisten/GUETEKRITERIEN_SKRIPT.md              — SK1-SK15
docs/checklisten/GUETEKRITERIEN_AUFGABEN.md            — A1-A15
docs/agents/artefakte/MATERIAL_GERUEST_gpg-erster-weltkrieg-ursachen_Mappe2.md  — Naechste Mappe (konkret)
docs/agents/artefakte/SKRIPT_gpg-erster-weltkrieg-ursachen.md  — Chunk 2 als Referenz
```

---

## 5. Output-Format

```markdown
# Strategischer Audit: v4 Prozessqualitaet

## S1: Subagenten-Isolation als Qualitaetstreiber
[Bewertung: Wirksam / Teilweise wirksam / Unwirksam]
[Begruendung + Evidenz]
[Risiken der Isolation + Mitigationsvorschlaege]

## S2: Q-Gate-Wirksamkeit
[Bewertung: Qualitaetswirksam / Primaer buerokratisch / Gemischt]
[Analyse: Was pruefen die Q-Gates tatsaechlich?]
[Empfehlung: Strukturelle Verbesserungen]

## S3: Rahmen-zuerst-Sequenz
[Bewertung: Didaktisch optimal / Akzeptabel / Problematisch]
[Analyse: Wie wirkt sich die Sequenz auf Material-Qualitaet aus?]

## S4: Skalierung ueber Mappen
[Bewertung + Empfehlungen]

## S5: Aufwand-Qualitaets-Verhaeltnis
[Bewertung + konkrete Vereinfachungsvorschlaege]

## S6: Schwachstellen-Prognose
[Top-3-Schwachstellen, priorisiert]
[Mitigationsvorschlaege]

## S7: Goldstandard-Vergleich
[Rueckschluesse aus Mappe 1]
[Was v4 absichert / was gefaehrdet ist]

## Gesamtbewertung
[Ist v4 geeignet, die Produktqualitaet verlässlich zu maximieren?]
[Wenn nein: Was fehlt? Was muss geaendert werden?]
[Wenn ja: Wo sind die verbleibenden Risiken?]
```

---

## 6. Regeln

1. **Read-Only.** Keine Dateien aendern, kein Git.
2. **Didaktik vor Technik.** Dieser Audit bewertet primaer die didaktische Qualitaetswirksamkeit der Prozessstruktur, nicht ihre technische Korrektheit (das hat der Vorgaenger-Audit geleistet).
3. **Empirisch argumentieren.** Wo moeglich auf Mappe-1-Goldstandard, Mappe-2-Versuche, Subagenten-Prompts als Evidenz zurueckgreifen statt abstrakt zu urteilen.
4. **Ehrlich.** Wenn der Prozess ueber-formalisiert ist und das die Qualitaet eher hemmt als foerdert, das sagen. Wenn Q-Gates Scheinpruefungen sind, das sagen.
5. **Konstruktiv.** Zu jeder Kritik eine konkrete Alternative oder Verbesserung vorschlagen.
6. **Audit-Ergebnis** als Datei speichern: `docs/analyse/AUDIT_v4_STRATEGIE_ERGEBNIS.md`
