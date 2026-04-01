# Audit-Briefing: v3.8 Produktionsreife-Evaluation

**Datum:** 2026-03-30
**Auftraggeber:** Paul (Lehrkraft, Projektverantwortlicher)
**Ziel:** Rigorose Evaluation der gesamten Infrastruktur vor autonomer Mappe-2-Generierung
**Ausfuehrung:** Frische Cowork-Session, Skill `/projekt-website-v3` aktivieren

---

## Hintergrund

Das Projekt weitergehts.online baut interaktive Escape-Games fuer GPG-Unterricht (Mittelschule R7) als statische Website (GitHub Pages). Die Infrastruktur besteht aus:

1. **Skill** (`/projekt-website-v3`): Projektmanagement, Workflow-Steuerung, File-Ownership, Uebergabe-Disziplin
2. **Agenten-Stack** (12 Agent-Prompts + 12 Subagenten-Prompts): Inhaltliche Produktion von Skript, Materialien, Aufgaben, Tafelbild
3. **Guetekriterien** (5 Checklisten): Fachdidaktische Q-Gates fuer Skript, Aufgaben, Sequenzierung, Tafelbild, Materialproduktion
4. **Engine** (`escape-engine.js`): Rendering der data.json in interaktive HTML-Seiten
5. **Workflow** (`WORKFLOW_v2.md`): Phasenmodell Didaktik → Inhalt → Skript → Material → Raetsel → Technik

v3.8 hat 10 UI-Aenderungen (U1-U10) und 5 Content-Constraints (C1-C5 + C1b) implementiert. Mappe 1 ("Pulverfass Europa") ist migriert und browser-verifiziert. Die Frage ist: **Kann die Infrastruktur eine Mappe 2 (neues Thema innerhalb desselben Escape-Games) eigenstaendig in hoher Qualitaet produzieren — und ist sie skalierbar auf andere Escape-Games/Themen?**

---

## Pruefauftrag

Fuehre einen systematischen Audit in 5 Pruefbereichen durch. Jeder Pruefbereich hat konkrete Fragestellungen. Bewerte jedes Finding als:

- **BLOCKER** — Verhindert korrekte Mappe-2-Generierung
- **HIGH** — Fuehrt wahrscheinlich zu Qualitaetsmaengeln oder manueller Nacharbeit
- **MEDIUM** — Suboptimal, aber workaround-faehig
- **LOW** — Verbesserungspotenzial, kein akuter Handlungsbedarf
- **PASS** — Kein Befund, Anforderung erfuellt

---

## Pruefbereich 1: Constraint-Vollstaendigkeit

**Fragestellung:** Sind alle v3.8-Constraints (C1, C1b, C2, C3, C4, C5) in allen relevanten Agent-Prompts referenziert und pruefbar?

### Pflichtlektuere
- `docs/architektur/UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md` (C1-C5 Definitionen, Zeilen ~756-762)
- `docs/agents/AGENT_SKRIPT.md` (C1, C1b, C5)
- `docs/agents/AGENT_MATERIAL.md` (C1, C2)
- `docs/agents/AGENT_RAETSEL.md` (C3)
- `docs/agents/AGENT_TAFELBILD.md` (C1b)
- Alle 7 `docs/agents/SUB_MATERIAL_*.md` (C2 in MQ2)
- Alle 5 `docs/agents/SUB_AUFGABE_*.md` (C3 in MQ3)

### Prueffragen

1.1 Enthaelt AGENT_SKRIPT die C1b-Identitaetsregel (einstieg.problemstellung === sicherung.tafelbild.stundenfrage === Chunk-Ueberschrift)?

1.2 Enthaelt jeder SUB_MATERIAL-Prompt die korrekte C2-Differenzierung (Typ A fuer Erarbeitungsmaterialien, Typ A/B fuer BQ und KA)?

1.3 Enthaelt jeder SUB_AUFGABE-Prompt die C3-Inline-Link-Konvention (`[[mat-id|Anzeigetext]]` + (M-Position))?

1.4 Ist C4 (didaktische Bildunterschriften) in SUB_MATERIAL_BILDQUELLE und SUB_MATERIAL_KARTE als MQ-Pruefpunkt verankert?

1.5 Ist C5 (Variante A/B) in AGENT_SKRIPT als MQ5-Pruefpunkt mit klarer Entscheidungsregel verankert?

1.6 Gibt es Agent-Prompts, die von C1-C5 betroffen sein sollten, aber keinen Verweis enthalten? (Besonders: ORCHESTRATOR.md, AGENT_DIDAKTIK.md, AGENT_INHALT.md)

---

## Pruefbereich 2: Constraint-Konsistenz

**Fragestellung:** Widersprechen sich Constraints zwischen Agenten? Stimmen Beispiele mit Regeln ueberein?

### Pflichtlektuere
- Alle Dateien aus Pruefbereich 1
- `docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md`

### Prueffragen

2.1 Stimmt die C2-Beschreibung im UPGRADE_PLAN mit der Implementierung in AGENT_MATERIAL und den SUB_MATERIAL-Prompts ueberein? (Typ A/B-Differenzierung, Entscheidungsregel, Beispiele)

2.2 Stimmt die C3-Beschreibung im UPGRADE_PLAN mit der Implementierung in AGENT_RAETSEL und den SUB_AUFGABE-Prompts ueberein? (Markup-Syntax, Beispiele, Engine-Voraussetzung)

2.3 Gibt es widersprüchliche Beispiele? Z.B. ein Beispiel-Titel in einem Prompt, der gegen die C2-Typ-Regel verstoesst?

2.4 Referenziert QUALITAETSKRITERIEN_MATERIALPRODUKTION.md die v3.8-Constraints oder ist es veraltet?

2.5 Stimmen die Q-Gate-Nummern (MQ1-MQ5, A1-A15, SK1-SK15) zwischen Agenten und Guetekriterien ueberein? Gibt es Luecken oder Doppelungen?

---

## Pruefbereich 3: Informationsfluss

**Fragestellung:** Erhaelt jeder Agent bei der Mappe-2-Generierung die Inputs, die er braucht?

### Pflichtlektuere
- `docs/architektur/WORKFLOW_v2.md` (Phasenmodell, Datenfluss)
- `docs/agents/ORCHESTRATOR.md` (Dispatch-Logik)
- `docs/agents/AGENT_SKRIPT.md` (Inputs, Outputs)
- `docs/agents/AGENT_MATERIAL.md` (Konstruktionskontext, Dispatch an SUB_MATERIAL)
- `docs/agents/AGENT_RAETSEL.md` (Konstruktionskontext, Dispatch an SUB_AUFGABE)
- `docs/agents/AGENT_TAFELBILD.md` (Inputs)

### Prueffragen

3.1 Wie erhaelt AGENT_MATERIAL die Stundenfrage (C1)? Ist der Pfad SKRIPT → MATERIAL dokumentiert?

3.2 Wie erhaelt AGENT_RAETSEL die Material-IDs und Positionen fuer C3-Links? Ist der Kontext-Uebergabe-Mechanismus (Konstruktionskontext) so definiert, dass `mat-id` und `position` verfuegbar sind?

3.3 Wie entscheidet AGENT_MATERIAL (bzw. SUB_MATERIAL_BILDQUELLE/KARTE), ob ein Material Typ A oder Typ B ist? Wird die `didaktische_funktion` explizit uebergeben?

3.4 Wie erhaelt AGENT_TAFELBILD die Stundenfrage? Ist sichergestellt, dass er die SKRIPT-Chunk-Ueberschrift woertlich uebernimmt (C1b)?

3.5 Ist der Workflow fuer Mappe 2 innerhalb eines bestehenden Escape-Games klar definiert? (Mappe 1 existiert bereits mit meta, mappen[0], etc. — Mappe 2 muss als mappen[1] angehaengt werden, nicht das Game neu erstellen.)

3.6 Kann der Workflow auch fuer ein komplett neues Escape-Game (neues Thema, neues Verzeichnis unter `escape-games/`) durchlaufen werden? Welche Schritte fehlen oder sind unklar?

---

## Pruefbereich 4: Engine-Kompatibilitaet

**Fragestellung:** Erzeugen die Agent-Prompts data.json-Strukturen, die die Engine korrekt rendert?

### Pflichtlektuere
- `assets/js/escape-engine.js` (Rendering-Logik, besonders: Material-Rendering, Tipp-Rendering, Sicherung-Rendering)
- `escape-games/gpg-erster-weltkrieg-ursachen/data.json` (aktueller Goldstandard nach Migration)
- `escape-games/template/data.json` (Schema-Template)
- `docs/agents/AGENT_TECHNIK.md` (technische Spezifikation)

### Prueffragen

4.1 Stimmt das data.json-Schema im Template mit der aktuellen Engine ueberein? Oder hat die Engine seit dem letzten Template-Update neue Felder erhalten (z.B. durch v3.8)?

4.2 Enthalten die Agent-Prompts (besonders AGENT_MATERIAL, AGENT_RAETSEL, AGENT_TAFELBILD) JSON-Output-Spezifikationen, die zum aktuellen Engine-Schema passen?

4.3 Werden `[[mat-id|Text]]`-Markups korrekt in den Agent-Output-Spezifikationen beschrieben? Weiss der AGENT_RAETSEL, dass Tipps dieses Markup enthalten sollen und die Engine es parst?

4.4 Unterstuetzt die Engine alle Materialtypen, die die SUB_MATERIAL-Prompts erzeugen? (darstellungstext, quellentext, bildquelle, karte, zeitleiste, statistik, tagebuch)

4.5 Ist das Sicherungs-Schema (tafelbild mit stundenfrage, scpl, merksatz + transfer + reflexionsimpuls + ueberleitung) zwischen AGENT_TAFELBILD-Output und Engine-Rendering konsistent?

4.6 Gibt es Engine-Features, die in keinem Agent-Prompt referenziert werden (tote Features)?

4.7 Gibt es Agent-Output-Felder, die die Engine ignoriert (wirkungslose Daten)?

---

## Pruefbereich 5: Mappe-1 als Goldstandard

**Fragestellung:** Ist die aktuelle Mappe-1 data.json ein valider Referenzpunkt fuer die Agent-Prompts?

### Pflichtlektuere
- `escape-games/gpg-erster-weltkrieg-ursachen/data.json` (Mappe 1, nach Commits 2a192e5 + 9d184ee)

### Prueffragen

5.1 Erfuellt jedes Material in Mappe 1 die C2-Regel? (Erarbeitungsmaterialien: Frage-Titel, visuelle Anker: Statement-Titel)

5.2 Erfuellen alle Tipp-Texte die C3-Regel? (Inline-Links wo angemessen, M-Position korrekt)

5.3 Ist die Stundenfrage C1b-konform? (Wortidentisch in einstieg.problemstellung und sicherung.tafelbild.stundenfrage)

5.4 Sind alle Bildunterschriften C4-konform? (Didaktisch, keine Quellenangaben)

5.5 Ist der Abschluss C5-konform? (Variante A Ueberleitung, keine Frageform, da nicht letzte Mappe)

5.6 Gibt es Felder in Mappe 1, die kein Agent-Prompt spezifiziert (manuell hinzugefuegt, undokumentiert)?

5.7 Gibt es Felder, die Agent-Prompts spezifizieren, die in Mappe 1 fehlen (Luecken im Goldstandard)?

---

## Pruefbereich 6: Skill-Architektur und Skalierbarkeit

**Fragestellung:** Unterstuetzt der `/projekt-website-v3`-Skill den Workflow fuer Mappe-2-Generierung und neue Escape-Games?

### Pflichtlektuere
- Skill-Prompt (`/projekt-website-v3` bzw. `docs/agents/SKILL_projekt-website_v3.md`)
- `docs/architektur/WORKFLOW_v2.md`
- `docs/projekt/STATUS.md`

### Prueffragen

6.1 Deckt der Skill-Prompt den EXECUTE-Modus fuer "naechste Mappe generieren" ab? Oder nur fuer Infrastruktur-Aufbau?

6.2 Ist im Skill oder Workflow definiert, wie der Agent-Stack fuer eine neue Mappe orchestriert wird? (Welcher Agent startet? Welche Reihenfolge? Wer validiert?)

6.3 Ist der Uebergabe-Prompt-Mechanismus (Cowork → Claude Code) praezise genug, um eine komplette Mappe-Generierung zu steuern? Oder braucht es mehrere Uebergabe-Runden?

6.4 Ist der Workflow fuer ein neues Escape-Game (neues Thema, z.B. "Weimarer Republik") dokumentiert? Welche Schritte sind identisch zu Mappe-2, welche zusaetzlich?

6.5 Koennte eine andere Lehrkraft (ohne Projekthistorie) den Skill nutzen, um ein eigenes Escape-Game aufzubauen? Welche impliziten Annahmen sind nicht dokumentiert?

6.6 Ist die File-Ownership-Regel im Skill konsistent mit der tatsaechlichen Praxis? (Besonders: Hat Cowork in dieser Session Dateien in der Claude-Code-Domaene bearbeitet?)

---

## Audit-Output-Format

Der Audit-Report soll folgende Struktur haben:

```markdown
# Audit Report: v3.8 Produktionsreife

## Executive Summary
[2-3 Saetze: Gesamtbewertung, Anzahl Findings pro Schweregrad]

## Findings

### [BLOCKER/HIGH/MEDIUM/LOW] F-XX: [Kurztitel]
- **Pruefbereich:** [1-6]
- **Prueffrage:** [X.Y]
- **Befund:** [Was wurde gefunden]
- **Beleg:** [Datei:Zeile oder Zitat]
- **Empfehlung:** [Konkrete Massnahme]

## Zusammenfassung
| Schweregrad | Anzahl |
|-------------|--------|
| BLOCKER     | X      |
| HIGH        | X      |
| MEDIUM      | X      |
| LOW         | X      |
| PASS        | X      |

## Empfohlene Reihenfolge der Behebung
[Priorisierte Liste]
```

Ablage: `docs/analyse/AUDIT_REPORT_v3-8_PRODUKTIONSREIFE.md`

---

## Ausfuehrungshinweise

1. **Skill aktivieren:** `/projekt-website-v3` — damit wird der Projektkontext automatisch eingelesen.
2. **Git-Sync:** `git pull` vor jeder Analyse.
3. **Alle Dateien selbst lesen.** Keine Annahmen aus diesem Briefing uebernehmen — die Beschreibungen hier koennten veraltet sein. Massgeblich ist der aktuelle Stand der Dateien im Repo.
4. **Engine-Code lesen.** Pruefbereich 4 erfordert das Lesen von `assets/js/escape-engine.js` (Claude-Code-Domaene, aber Lesen ist erlaubt).
5. **Mappe-1 data.json lesen.** Pruefbereich 5 erfordert das Lesen der aktuellen data.json.
6. **Parallelisierung:** Pruefbereiche 1-3 koennen parallel bearbeitet werden. Pruefbereich 4-5 haengen von Engine/Daten ab. Pruefbereich 6 ist unabhaengig.
7. **Kein Fix in dieser Session.** Der Audit identifiziert Findings. Fixes werden in einer separaten Session umgesetzt.

---

## Bekannte Kontextpunkte (zur Orientierung, NICHT als Fakten uebernehmen)

- v3.8 wurde in mehreren Cowork-Runden implementiert, mit reaktiven Revisionen (C2 Typ A/B, C3 Inline-Links, C1b Identitaet, Auto-Prepend-Entfernung)
- Mappe 1 hat 9 Materialien, 5 Aufgaben, 1 Sicherung
- Die Engine wurde um `_parseInlineMaterialLinks` erweitert (fd883dc)
- Der Auto-Prepend-Block fuer material_referenz in Tipp 1 wurde entfernt (9d184ee)
- CSS-Fixes fuer Link-Styling und Scroll-Offset (c3ee2f3)
- Commits: d233b74, 862af13, 5650157, fd883dc, 2a192e5, 9d184ee, c3ee2f3
