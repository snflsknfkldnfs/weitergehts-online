# Audit-Briefing: v3.7 Aufgaben-Subagenten-Architektur + Zwischenartefakte

**Datum:** 2026-03-29
**Auftraggeber:** Paul Cebulla (Lehrkraft, Projektleitung)
**Zu auditierende Aenderung:** Phase v3.7 im UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md
**Audit-Ziel:** Rigorous review der geplanten Architektur VOR Implementierung. Identifikation von Luecken, Widerspruechen, Risiken, Fehlentscheidungen.

---

## 1. Kontext des Projekts

**weitergehts.online** ist eine statische Website (GitHub Pages) fuer interaktive Escape-Games im Unterricht (Mittelschule Bayern, GPG/WiB/Mathe). Games bestehen aus Mappen, jede Mappe enthaelt Materialien (Darstellungstext, Quellentext, Tagebuch, Zeitleiste, Bildquelle) und einen Fragebogen (5 Aufgaben verschiedener Typen). Nach Loesung aller Aufgaben wird ein Loesungswort (DnD-Buchstabenpuzzle) freigeschaltet, dann Sicherung/Hefteintrag.

**Generierungs-Pipeline:** Ein Agenten-Team (Cowork + Claude Code) generiert Games automatisiert:
- Phase 0: Didaktik → Inhalt → Skript → Tafelbild
- Phase 1: Material-Design + Sequenzplanung
- Phase 2: Mappen-Produktion (Material-Subagenten → Raetsel → Assembly)
- Phase 3: Technische Implementierung

**Ziel:** Beliebige Themen sollen moeglichst automatisiert als Escape-Games generiert werden koennen.

---

## 2. IST-Zustand (vor v3.7)

### 2.1 AGENT_RAETSEL — aktuell monolithisch

AGENT_RAETSEL (Phase 2.2) erledigt in EINEM Durchlauf:
- Aufgabentyp-Auswahl pro Position (5 Typen verfuegbar: MC, Zuordnung, Lueckentext, Reihenfolge, Freitext)
- AFB-Zuweisung und Schwierigkeits-Progression
- Fragestellung formulieren pro Aufgabe
- Antwortoptionen/Elemente gestalten (typ-spezifisch)
- 3-stufiges Tipp-System pro Aufgabe
- Freischalt-Code generieren
- Narrativer Rahmen (Rahmengeschichte + Pro-Mappe-Einstieg)
- Q-Gate (Stufe 1 prozedural + Stufe 2 fachdidaktisch A1-A15)
- data.json-Befuellung (aufgaben[])

Ausfuehrungsort: Claude Code. Eingabe: Fertige materialien[] aus Phase 2.1.

### 2.2 Analogie: Material-Subagenten (bestehendes Pattern)

Phase 2.1 verwendet bereits Subagenten fuer Materialerstellung:
- AGENT_MATERIAL (Phase 1) = Orchestrator (Design, Typauswahl, Sequenzplanung)
- SUB_DARSTELLUNGSTEXT, SUB_QUELLENTEXT, SUB_TAGEBUCH, SUB_ZEITLEISTE, SUB_BILDQUELLE = Typ-spezifische Produzenten
- Jeder Subagent erhaelt individuellen Sequenzkontext als Pflicht-Input (v3.3)
- Ausfuehrung: Claude Code

### 2.3 Bestehende Guetekriterien

`docs/checklisten/GUETEKRITERIEN_AUFGABEN.md` definiert A1-A15:
- MUSS (A1-A7): AFB-Kongruenz, Fragestaemme-Klarheit, Material-Aufgabe-Kongruenz, Distractor-Qualitaet, Schwierigkeits-Progression, Tipp-Progression, Operator-Praezision
- SOLL (A8-A12): Kognitive Aktivierung, TB-Bezug, Typvielfalt, Freitext-Qualitaet, Sachbezogen-vor-Wertbezogen
- KANN (A13-A15): Gegenwartsbezug, Fehler-Antizipation, Implizite Differenzierung

Aktuell werden ALLE Kriterien von AGENT_RAETSEL selbst geprueft.

### 2.4 5 Aufgabentypen — aktuell in AGENT_RAETSEL definiert

| Typ | data.json-Felder | Validierungslogik | Besonderheiten |
|-----|-----------------|-------------------|----------------|
| `multiple-choice` | optionen[], loesung (String) | Exakter Textmatch | 4 Optionen, 1 korrekt |
| `zuordnung` | elemente[], zuordnungen[], loesung (Object) | Alle Dropdowns korrekt | Linke Spalte fest, rechte Spalte Dropdown |
| `lueckentext` | text (mit ___), loesung (Array) | Alle Luecken korrekt | Max 2 Woerter pro Luecke |
| `reihenfolge` | elemente[], loesung (Array) | Korrekte Reihenfolge | Drag-and-Drop oder Nummerierung |
| `freitext-code` | leitfragen[], schluesselwoerter[], loesung (String) | Mind. N Fachbegriffe enthalten | Problemorientiert, Scaffolding |

---

## 3. SOLL-Zustand (v3.7)

### 3.1 Kern-Entscheidungen

**E7 — Volle Subagenten-Architektur:** AGENT_RAETSEL wird Orchestrator. 5 neue Subagenten (SUB_AUFGABE_MC, SUB_AUFGABE_ZUORDNUNG, SUB_AUFGABE_LUECKENTEXT, SUB_AUFGABE_REIHENFOLGE, SUB_AUFGABE_FREITEXT) uebernehmen die Einzel-Aufgaben-Konstruktion.

Begruendung:
- Didaktische Praezision: Jeder Fragetyp erfordert typ-spezifische Expertise (MC-Distractor-Qualitaet ≠ Freitext-Scaffolding ≠ Zuordnungs-Trennschaerfe)
- Isolierte Optimierbarkeit: Qualitaetsprobleme bei einem Typ ohne Regressionsrisiko fuer andere Typen behebbar
- Erweiterbarkeit: Neue Typen als neuer SUB_AUFGABE_*.md, kein Umbau des Orchestrators

**E8 — Zwischenartefakte als Nebenprodukt:** FRAGEBOGEN_mappe-N.md wird waehrend der Generierung simultan geschrieben. Kein zusaetzlicher User-Gate. Primaerer Zweck: Wartbarkeit/Editierbarkeit. Format: strukturiert/maschinell parsebar, nicht prosa-optimiert.

### 3.2 Aufgabenteilung AGENT_RAETSEL ↔ SUB_AUFGABE_*

**AGENT_RAETSEL (Orchestrator) behalt:**

| Aufgabe | Beschreibung |
|---------|-------------|
| Progressionsplan | AFB-Zuweisung, Typauswahl pro Position |
| Typvielfalt-Sicherung | Mind. 3 verschiedene Typen pro Mappe |
| Konstruktionskontext generieren | Pro Aufgabe: Material-Volltext, TB-Knoten, AFB, Position, Operationalisierungsziel, bereits getestete Inhalte |
| Dispatch | Je Aufgabe den passenden Subagenten aufrufen |
| Cross-Aufgaben-Konsistenz | Redundanzvermeidung, Progressions-Validierung |
| Freischalt-Code | Thematisch passend, A-Z, 4-8 Zeichen |
| Narrativer Rahmen | Rahmengeschichte, Einstieg, Abschluss |
| Assembly | aufgaben[] zusammenfuehren + FRAGEBOGEN_mappe-N.md schreiben |

**SUB_AUFGABE_* uebernimmt (pro Aufgabe):**

| Aufgabe | Beschreibung |
|---------|-------------|
| Fragestellung formulieren | Operationalisierter Fragestamm mit praezisem kognitivem Ziel |
| Antwortoptionen gestalten | Typ-spezifisch: Distraktoren / Pole / Luecken / Elemente / Leitfragen |
| Tipp-Formulierung | 3 Stufen, typ-spezifisch |
| Typ-spezifisches Q-Gate | Pruefung gegen inline-Guetekriterien |

### 3.3 SUB_AUFGABE_*-Prompt-Struktur

Jeder Subagent enthaelt:
1. Rolle + Didaktischer Zweck (wann einsetzen, welche Kompetenz)
2. Eingabe: Konstruktionskontext (Pflicht-Template)
3. Konstruktionsheuristiken (Fragestamm, Optionen, Tipps — typ-spezifisch)
4. Guetekriterien (inline, praezisiertes Subset aus A1-A15 + typ-eigene)
5. Rendering-Kontrakt (data.json-Schema, BEM-Klassen, JS-Verhalten)
6. Anti-Patterns (typ-spezifisch)
7. Beispiel (1 vollstaendiges aufgabe-JSON)
8. Ausgabe (aufgabe-JSON + Q-Gate-Log)

### 3.4 Konstruktionskontext (Input pro Subagent-Aufruf)

```markdown
| Feld | Wert |
|------|------|
| Aufgaben-Position | [N] von 5 |
| AFB-Stufe | [I/II/III] |
| Ziel-Material | [mat-ID] — [Volltext] |
| TB-Knoten | [Knoten-ID + Text] |
| Operationalisierungsziel | [1-2 Saetze] |
| Bereits getestete Inhalte | [Zusammenfassung vorheriger Aufgaben] |
| Noch nicht getestete TB-Knoten | [IDs + Kurzbeschreibung] |
```

### 3.5 Zwischenartefakt-Format

Speicherort: `escape-games/[game-id]/docs/FRAGEBOGEN_mappe-N.md`

Strukturiert, maschinell parsebar:
```
# Fragebogen: Mappe [N] — [Titel]
freischalt_code: [CODE]

## Aufgabe [N]
typ: [typ]
afb: [I/II/III]
material_referenz: [mat-id]
tb_knoten: [knoten-id]

### frage
[Fragestellung]

### optionen / elemente / text / leitfragen
[typ-spezifisch]

### tipps
1: [Hinweis]
2: [Teilantwort]
3: [Loesung + Erklaerung]

### q_gate
[Kriterium]: [PASS/FAIL] — [Kurzbegruendung]
```

### 3.6 Guetekriterien-Architektur

- GUETEKRITERIEN_AUFGABEN.md (A1-A15) bleibt zentrale Referenz fuer AGENT_RAETSEL Orchestrator-Ebene
- Typ-spezifische Praezisierungen leben inline in SUB_AUFGABE_*.md (z.B. A4-MC fuer MC-Distraktoren, A4-ZU fuer Zuordnungs-Trennschaerfe)
- Kein separates GUETEKRITERIEN-Dokument pro Typ

### 3.7 Domaenenzugehoerigkeit

| Artefakt | Domaene | Begruendung |
|----------|---------|-------------|
| SUB_AUFGABE_*.md (Prompt-Definitionen) | Cowork (docs/agents/) | Iterativ schaerfbar, sichtbar in Obsidian |
| Konstruktionskontext-Generierung | Claude Code (Phase 2.2) | Automatisiert |
| Subagenten-Ausfuehrung | Claude Code (Phase 2.2) | Automatisiert, kein User-Gate pro Aufgabe |
| FRAGEBOGEN_mappe-N.md | Claude-Code-generiert, Cowork-lesbar | Wartbarkeitsschicht |
| aufgaben[] in data.json | Claude Code (Phase 2.3) | Deterministische Konversion |

### 3.8 Erweiterungspfad neue Aufgabentypen

4-Schritt-Prozess:
1. SUB_AUFGABE_NEWTYPE.md erstellen (Cowork)
2. AGENT_RAETSEL.md: Typ in verfuegbare-Typen-Tabelle
3. Uebergabe-Prompt fuer escape-engine.js: Neuen Renderer
4. AGENT_TECHNIK Typ-Registry aktualisieren

---

## 4. Referenz-Dokumente (zu lesen fuer vollstaendigen Kontext)

| Dokument | Pfad | Relevanz |
|----------|------|----------|
| UPGRADE_PLAN (zu auditieren) | `docs/architektur/UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md` | **Phase v3.7 Abschnitt** — das zentrale Audit-Objekt |
| AGENT_RAETSEL (IST) | `docs/agents/AGENT_RAETSEL.md` | Aktueller monolithischer Agent, wird refaktoriert |
| GUETEKRITERIEN_AUFGABEN | `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md` | A1-A15, bleibt zentrale Referenz |
| WORKFLOW_v2 | `docs/architektur/WORKFLOW_v2.md` | Phase 2.2 IST (Zeile 657ff), wird aufgeteilt |
| ORCHESTRATOR | `docs/agents/ORCHESTRATOR.md` | Gesamtpipeline, Phase 2.2 Referenz (Zeile 99ff) |
| AGENT_TECHNIK | `docs/agents/AGENT_TECHNIK.md` | Rendering-Implementierung, Typ-Registry |
| AGENT_MATERIAL (Analogie) | `docs/agents/AGENT_MATERIAL.md` | Bestehendes Orchestrator-Subagenten-Pattern |

---

## 5. Audit-Leitfragen

### 5.1 Architektur-Kohaerenz

1. **Ist die Aufgabenteilung AGENT_RAETSEL ↔ SUB_AUFGABE_* sauber?** Gibt es Verantwortlichkeiten die in beiden Ebenen liegen oder in keiner? Insbesondere: Wer entscheidet ueber die *inhaltliche Ausrichtung* der Frage (Welcher Aspekt des Materials wird operationalisiert)? Ist das Orchestrator oder Subagent?

2. **Ist der Konstruktionskontext vollstaendig?** Fehlen Informationen, die ein Subagent fuer qualitativ hochwertige Aufgaben-Konstruktion braeuchte? Vergleich mit dem Sequenzkontext der Material-Subagenten (v3.3).

3. **Ist die Analogie zu Material-Subagenten tragfaehig?** Material-Subagenten produzieren grundverschiedene Artefakte (Fliesstext vs. Zeitleiste). Aufgaben-Subagenten produzieren dasselbe JSON-Schema mit unterschiedlichen Feldern. Rechtfertigt die didaktische Komplexitaet trotzdem den Split?

4. **Sind 5 Aufgaben pro Mappe genug Volumen fuer Subagenten-Overhead?** Lohnt sich der Dispatch-Aufwand (Konstruktionskontext generieren, Subagent aufrufen, Output validieren, Cross-Konsistenz pruefen) bei nur 5 Aufgaben?

### 5.2 Guetekriterien-Architektur

5. **Ist der Guetekriterien-Split sinnvoll?** A1-A15 zentral bei AGENT_RAETSEL, typ-spezifische Praezisierungen inline in SUB_AUFGABE_*. Risiko: Drift zwischen zentralen und typ-spezifischen Kriterien. Alternative: Alles zentral, oder alles in Subagenten?

6. **Wer fuehrt das Q-Gate durch?** Aktuell prueft AGENT_RAETSEL A1-A15 selbst. Nach v3.7: Subagent prueft typ-spezifische Kriterien (Stufe 2b), AGENT_RAETSEL prueft Cross-Konsistenz (Stufe 1 + Stufe 2a). Ist diese Aufteilung korrekt? Fehlt eine Stufe?

7. **Muessen A1-A15 fuer den Split angepasst werden?** Einige Kriterien (A4 Distractor-Qualitaet, A11 Freitext-Qualitaet) sind bereits typ-spezifisch. Andere (A5 Progression, A10 Typvielfalt) sind Cross-Aufgaben-Kriterien. Ist die Zuordnung klar genug?

### 5.3 Zwischenartefakte

8. **Ist das .md-Zwischenartefakt-Format hinreichend praezise definiert?** Kann ein deterministischer Parser das Format zuverlaessig in data.json konvertieren? Gibt es Ambiguitaeten im vorgeschlagenen Format?

9. **Entsteht eine Dual-Source-of-Truth?** Wenn FRAGEBOGEN_mappe-N.md UND data.json existieren, welches ist fuehrend? Was passiert bei Diskrepanz? Ist die Konversionsrichtung eindeutig (.md → data.json, nie umgekehrt)?

10. **Ist der Wartbarkeits-Anspruch realistisch?** Der User soll .md in Obsidian editieren und dann Konversion neu ausfuehren. Wie robust ist das? Was passiert wenn der User ungueltige Werte eintraegt (z.B. falschen Typ, fehlende Felder)?

### 5.4 Workflow-Integration

11. **Wie aendert sich der Uebergabe-Prompt fuer Phase 2.2?** Aktuell ein Prompt fuer AGENT_RAETSEL. Kuenftig: Prompt fuer Orchestrator + Dispatch-Logik fuer 5 Subagenten. Wird das im Claude-Code-Kontext zu komplex (Token-Budget)?

12. **Wie interagiert v3.7 mit v3.6 (AGENT_DIFFERENZIERUNG)?** v3.6 arbeitet NACH AGENT_RAETSEL (Phase 2.3 wird 2.4). Aendert sich durch den Subagenten-Split etwas an der Schnittstelle zu v3.6?

13. **Wie interagiert v3.7 mit dem Material-Subagenten-Domain-Audit?** v3.7 erwaehnt MATERIALIEN_mappe-N.md als "Folge-Evaluation". Ist das kohaerent oder entsteht ein Flickwerk aus zwei verschiedenen Zwischenartefakt-Konzepten?

### 5.5 Domaene und Automatisierung

14. **Ist die Domaenenzuordnung konsistent?** Prompt-Definitionen in Cowork, Ausfuehrung in Claude Code. Das ist das bestehende Pattern fuer Material-Subagenten. Gibt es Gruende warum es fuer Aufgaben-Subagenten anders sein sollte?

15. **Wird das Automatisierungsziel erreicht?** "Beliebige Themen automatisiert generieren" — fuegen die Subagenten einen Engpass hinzu oder verbessern sie die Automatisierbarkeit? Konkretes Szenario: Mappe 2 eines neuen Games wird generiert. Wie sieht der Flow aus?

### 5.6 Fehlende Aspekte

16. **Fehlen Artefakte in der "Betroffene Artefakte"-Tabelle?** Muessen weitere Dokumente angepasst werden?

17. **Ist die Verifikations-Checkliste vollstaendig?** Fehlen Testszenarien? Insbesondere: Edge Cases (weniger als 5 Aufgaben, Mappe mit nur 1-2 Materialien, Typ der nicht zum AFB passt)?

18. **Gibt es Abhaengigkeiten die nicht dokumentiert sind?** v3.7 haengt offiziell nur von v3.4 ab. Gibt es implizite Abhaengigkeiten zu v3.5 (Layout) oder v3.6 (Differenzierung)?

---

## 6. Audit-Scope und Erwartung

**Scope:** Ausschliesslich die v3.7-Architektur-Entscheidung und deren Integration in die bestehende Infrastruktur. NICHT: Implementierungsdetails der einzelnen Subagenten (die existieren noch nicht).

**Erwartetes Ergebnis:**
- Findings mit Severity (BLOCKER / HIGH / MEDIUM / LOW)
- Pro Finding: Konkreter Mangel + konkreter Korrekturvorschlag
- Bewertung der 18 Audit-Leitfragen
- Empfehlung: PROCEED / PROCEED WITH CHANGES / REDESIGN

**Kontext fuer Auditor:** Der UPGRADE_PLAN ist ein lebendes Dokument. Frueheren Phasen (v3.2-v3.6) wurden bereits von einem externen Auditor geprueft (13 Findings, 4 HIGH, alle eingearbeitet — siehe Audit-Protokoll im UPGRADE_PLAN). Dieser Audit soll denselben Rigor auf v3.7 anwenden.
