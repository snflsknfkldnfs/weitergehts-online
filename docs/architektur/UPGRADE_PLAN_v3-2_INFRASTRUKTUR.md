# Upgrade-Plan v3.2+: Infrastruktur-Completion

**Datum:** 2026-03-29 (v3.8 ergaenzt)
**Status:** v3.2-v3.5 + v3.7 ABGESCHLOSSEN. v3.8 definiert (Pre-v3.6). v3.6 wartet auf v3.8.
**Basiert auf:** OFFENE_PUNKTE_V3.md, Session-Diskussion 2026-03-28, Updates Materialien und UI.md
**Vorgaenger:** UPGRADE_PLAN_v3.md (v3.0-v3.1 abgeschlossen)

---

## Ueberblick Phasen

| Phase | Titel                     | Abhaengigkeit        | Umfang       | Status |
| ----- | ------------------------- | -------------------- | ------------ | ------ |
| v3.2  | Umlaut-Fix                | keine                | Klein        | **DONE** |
| v3.3  | Material-Sequenzierung    | keine                | Mittel-Gross | **DONE** |
| v3.4  | Fragebogen-Guetekriterien | v3.3                 | Mittel       | **DONE** |
| v3.5  | Layout-Redesign           | v3.3 (optional v3.4) | Mittel       | **DONE** (inkl. v3.5a-h) |
| v3.7  | Aufgaben-Subagenten + Zwischenartefakte | v3.4 | Gross | **DONE** |
| v3.8  | Material-Subagenten + Qualitaet + UI-Optimierung | v3.5 + v3.7 | Gross | **NEU** |
| v3.6  | AGENT_DIFFERENZIERUNG MVP | v3.8                 | Gross        | OFFEN |

```
v3.2 ──→ v3.3 ──┬──→ v3.4 ──┬──→ v3.7 ──→ v3.8 ──→ v3.6
                 │           │                ↑
                 └──→ v3.5 ──────────────────┘
```

**Reihenfolge-Aenderung:** v3.8 wurde VOR v3.6 eingefuegt. Begruendung: Die Material- und UI-Qualitaet muss stehen, bevor Differenzierung (Erklaerungen, KI-Sidekick, DaZ) darauf aufgebaut wird. v3.6 haengt jetzt von v3.8 ab statt direkt von v3.4.

---

## Phase v3.2: Umlaut-Fix

### Problem
Deutsche Umlaute (ae/oe/ue/ss) werden in data.json als ASCII-Transliterationen gespeichert. Die Engine rendert sie 1:1 — SuS sehen "Buendnissysteme" statt "Buendnissysteme" [sic: ue statt ue].

### Loesungsansatz
Zwei Optionen (zu evaluieren):
- **Option A:** UTF-8 nativ in data.json. Agenten-Prompts schreiben echte Umlaute. Engine aendert sich nicht.
- **Option B:** Transliterations-Layer in Engine. data.json bleibt ASCII. Engine ersetzt ae→ae, oe→oe, ue→ue, ss→ss bei Render.

### Entscheidungskriterium
Option A ist sauberer (keine Engine-Logik), aber erfordert JSON-Encoding-Disziplin in allen Agenten. Option B ist defensiver, aber fragil (Falsch-Positive: "Bauer" → "Bauer"?). **Empfehlung: Option A** mit Validierungsschritt im Q-Gate.

### Betroffene Artefakte

| Datei | Aenderung | Owner |
|-------|-----------|-------|
| `escape-games/*/data.json` | ASCII-Umlaute → echte Umlaute | Claude Code |
| `escape-games/template/data.json` | Schema-Kommentare auf UTF-8 | Claude Code |
| `docs/agents/SUB_MATERIAL_*.md` | JSON-Encoding-Regel: "Schreibe echte Umlaute" | Cowork |
| `docs/agents/AGENT_SKRIPT.md` | Gleiche Regel | Cowork |
| `docs/agents/AGENT_TAFELBILD.md` | Gleiche Regel | Cowork |
| `docs/agents/AGENT_RAETSEL.md` | Gleiche Regel | Cowork |

### Verifikation
- [ ] `python3 -c "import json; d=json.load(open('data.json')); print(d)" | grep -c 'ae\|oe\|ue\|ss'` → 0 Treffer fuer Transliterationen in Fliesstext
- [ ] Browser-Check: Umlaute korrekt dargestellt
- [ ] JSON-Validierung: `python3 -c "import json; json.load(open('data.json'))"`

---

## Phase v3.3: Material-Sequenzierung + User-Journey

### Problem
Materialien innerhalb einer Mappe werden derzeit als ungeordnete Sammlung behandelt. Es gibt kein explizites Sequenz-Konzept. Jeder Materialtyp-Subagent (SUB_DARSTELLUNGSTEXT, SUB_QUELLENTEXT etc.) arbeitet isoliert — er weiss nicht, an welcher Stelle der didaktischen User-Journey sein Material steht, welches Vorwissen bereits erarbeitet wurde, und welches Material danach kommt.

Konsequenz: Materialien referenzieren Konzepte, die erst spaeter eingefuehrt werden, oder wiederholen Informationen redundant. Die SuS-Erfahrung ist inkohaerent.

### Vorbedingungen (vor Implementierung zu erledigen)

**[Audit H-01]** WORKFLOW_v2.md muss Phase 1.5 SEQUENZPLANUNG aufnehmen, bevor v3.3 implementiert wird. User-Gate-Entscheidung: Bleibt das User-Gate nach Phase 1, oder verschiebt es sich nach Phase 1.5? Empfehlung: User-Gate nach Phase 1.5 (User validiert Sequenz zusammen mit Material-Entwurf).

**[Audit H-03]** Schema-Migration-Strategie festlegen:
- Neue Felder (`position`, `didaktische_funktion`, `voraussetzung`, `ueberleitung_von`, `sequenz_kontext`) sind **OPTIONAL mit Fallback**
- Engine-Logik: `if (mat.position !== undefined) → sort by position; else → Array-Index`
- Bestehende Mappen ohne diese Felder laufen unveraendert weiter (Rueckwaertskompatibilitaet)
- Migration bestehender Mappe 1: manuell als Teil der v3.3-Implementierung (Uebergabe-Prompt)
- Rollback-Sicherheit: Wenn v3.3 abgebrochen wird, Engine faellt auf Array-Index zurueck

### Loesungsarchitektur: Drei Ebenen

#### Ebene 1: data.json Schema-Erweiterung

Jedes Material-Objekt in `materialien[]` bekommt neue Felder:

```json
{
  "id": "mat-1-3",
  "typ": "tagebuch",
  "position": 3,
  "didaktische_funktion": "vertiefung",
  "voraussetzung": ["mat-1-1", "mat-1-2"],
  "ueberleitung_von": "Ihr habt gerade gesehen, wie die Buendnisse Europa teilten. Aber wie erlebten das die Menschen?",
  "sequenz_kontext": {
    "vorher": {"id": "mat-1-2", "typ": "karte", "kerninhalt": "Buendnissysteme geografisch"},
    "nachher": {"id": "mat-1-4", "typ": "quellentext", "kerninhalt": "Mobilmachungsbefehl"}
  }
}
```

| Neues Feld | Typ | Beschreibung |
|------------|-----|--------------|
| `position` | Integer | Ordinalzahl (1-basiert) — Reihenfolge der Bearbeitung |
| `didaktische_funktion` | Enum | `einstieg`, `erarbeitung`, `vertiefung`, `sicherung`, `transfer` |
| `voraussetzung` | String[] | Material-IDs, die vorher bearbeitet sein muessen |
| `ueberleitung_von` | String | Narrativer Uebergang vom vorherigen Material (1-2 Saetze) |
| `sequenz_kontext` | Object | Vorher/Nachher-Material mit Typ und Kerninhalt (fuer Subagenten-Input) |

#### Ebene 2: Neuer Workflow-Schritt "Sequenzplanung" (Phase 1.5)

Zwischen AGENT_MATERIAL Design-Modus (Phase 1) und Subagenten-Produktion (Phase 2.1) wird ein neuer Schritt eingefuegt:

```
PHASE 1: AGENT_MATERIAL (Design-Modus)
    Output: MATERIAL_GERUEST_Mappe_N (Materialtyp-Zuordnung)
    │
    ▼
PHASE 1.5: SEQUENZPLANUNG (NEU)                          ← v3.3
    Input: MATERIAL_GERUEST + TAFELBILD + SKRIPT
    Aufgabe: Materialien in didaktisch sinnvolle Reihenfolge bringen
    Output: SEQUENZPLAN_Mappe_N
    │
    ▼
PHASE 2.1: Subagenten-Produktion (mit Sequenzkontext)
```

**Sequenzplanung umfasst:**
1. Reihenfolge festlegen (position pro Material)
2. Didaktische Funktion zuordnen (einstieg/erarbeitung/vertiefung/sicherung/transfer)
3. Voraussetzungen deklarieren (welches Material muss vorher bearbeitet sein)
4. Ueberleitungen formulieren (narrativer Uebergang zwischen Materialien)
5. Sequenzkontext-Objekte generieren (vorher/nachher mit Kerninhalt)

**Implementierung (E2 entschieden):** Sequenzplanung wird als Aufgabe 1.9 in AGENT_MATERIAL integriert. Der Agent hat bereits die Gesamtuebersicht ueber alle Materialien und das Tafelbild. Ein separater Agent muesste denselben Kontext erst aufbauen — Token-Overhead ohne Mehrwert.

#### Ebene 3: Subagenten-Kontext-Erweiterung (KRITISCH)

Jeder Materialtyp-Subagent (SUB_DARSTELLUNGSTEXT, SUB_QUELLENTEXT, SUB_TAGEBUCH, SUB_ZEITLEISTE, SUB_BILDQUELLE) bekommt als **zusaetzlichen Pflicht-Input** den Sequenzkontext:

```markdown
## Sequenzkontext (Pflicht-Input fuer alle Subagenten)

| Feld | Wert |
|------|------|
| Position in Mappe | 3 von 5 |
| Didaktische Funktion | vertiefung |
| Vorheriges Material | mat-1-2 (Karte: Buendnissysteme geografisch) — SuS wissen bereits: Europa war in zwei Lager geteilt |
| Naechstes Material | mat-1-4 (Quellentext: Mobilmachungsbefehl) — SuS sollen danach verstehen: wie die Theorie zur Praxis wurde |
| Deine Aufgabe | Ueberleitung: Vom abstrakten Buendnissystem zur persoenlichen Erfahrung. Baue auf dem geografischen Wissen auf, fuehre die emotionale Dimension ein. |
| TB-Knoten | k1-4 (Aufruestung) — Dein Material muss diesen Knoten erarbeitbar machen |
| Vorausgesetztes Wissen | k1-1 (Nationalismus), k1-2 (Imperialismus) — bereits durch mat-1-1 und mat-1-2 erarbeitet |
```

**[Audit H-02] Uebergabeformat fuer Subagenten-Kontext:**

Das Sequenzkontext-Template wird als **Markdown-Tabelle** im Subagenten-Prompt uebergeben (nicht als JSON). Grund: Subagenten arbeiten in Claude Code als Prompt-gesteuerte Iterationen. Markdown ist lesbarer und robuster als eingebettetes JSON.

**Template-Abschnitt (in jeden SUB_MATERIAL_*.md einzufuegen):**

```markdown
## Eingabe: Sequenzkontext (PFLICHT, ab v3.3)

Dieser Abschnitt wird von AGENT_MATERIAL aus dem SEQUENZPLAN_Mappe_N generiert
und ist fuer jeden Subagenten-Aufruf individuell befuellt.

| Feld | Beschreibung |
|------|--------------|
| Position in Mappe | z.B. "3 von 5" |
| Didaktische Funktion | einstieg / erarbeitung / vertiefung / sicherung / transfer |
| Vorheriges Material | ID, Typ, Kerninhalt + was SuS danach wissen |
| Naechstes Material | ID, Typ, Kerninhalt + was SuS vorbereitet sein muessen |
| Deine Aufgabe in der Sequenz | 1-2 Saetze: Was ist die narrative Bruecke? |
| Zugeordneter TB-Knoten | ID + Text — Dein Material muss diesen Knoten erarbeitbar machen |
| Vorausgesetztes Wissen | TB-Knoten-IDs + Kurzbeschreibung — bereits durch vorherige Materialien erarbeitet |
| Noch nicht eingefuehrte Begriffe | Fachbegriffe, die erst in spaeteren Materialien vorkommen — NICHT verwenden |
```

**Stilregel-Ergaenzung (in jeden SUB_MATERIAL_*.md):**

> **Sequenz-Kohaerenz (PFLICHT ab v3.3):** Referenziere ausschliesslich Konzepte und Fachbegriffe,
> die laut "Vorausgesetztes Wissen" bereits eingefuehrt sind. Begriffe aus "Noch nicht eingefuehrt"
> duerfen NICHT vorkommen — auch nicht beilaeufig oder als Vorgriff. Wenn dein Material ein Konzept
> einfuehrt, das im TB-Knoten deklariert ist, ist das deine Hauptaufgabe.

**Q-Gate-Ergaenzung (pro Subagent):**

| Pruefpunkt | Kriterium |
|------------|-----------|
| SQ-1 | Material referenziert NUR bereits erarbeitetes Wissen |
| SQ-2 | Kein Fachbegriff aus "Noch nicht eingefuehrt" verwendet |
| SQ-3 | Material macht den zugeordneten TB-Knoten erarbeitbar |
| SQ-4 | Narrativer Anschluss an vorheriges Material erkennbar |

**Implementierungsreihenfolge:** Template in SUB_DARSTELLUNGSTEXT erstellen und validieren, dann in alle anderen SUB_* kopieren.

### Betroffene Artefakte

| Datei | Aenderung | Owner |
|-------|-----------|-------|
| `docs/architektur/WORKFLOW_v2.md` | Phase 1.5 Sequenzplanung einfuegen | Cowork |
| `docs/agents/AGENT_MATERIAL.md` | Aufgabe 1.9 Sequenzplanung, Output-Schema erweitern | Cowork |
| `docs/agents/SUB_MATERIAL_*.md` (alle) | Sequenzkontext als Pflicht-Input, Stilregel Vorwissen | Cowork |
| `escape-games/template/data.json` | Schema: position, didaktische_funktion, voraussetzung, sequenz_kontext | Claude Code |
| `escape-games/*/data.json` | Migration bestehender Materialien | Claude Code |
| `assets/js/escape-engine.js` | Materialien in position-Reihenfolge rendern (statt Array-Index) | Claude Code |

### [Audit L-12] SEQUENZPLAN Output-Format

Der SEQUENZPLAN ist kein separates Dokument, sondern ein neuer Abschnitt im bestehenden MATERIAL_GERUEST_Mappe_N.md:

```markdown
## Sequenzplan

| # | Material-ID | Typ | Didaktische Funktion | TB-Knoten | Voraussetzung | Kerninhalt (1 Satz) |
|---|-------------|-----|----------------------|-----------|---------------|---------------------|
| 1 | mat-1-1 | darstellungstext | einstieg | k1-1 | — | Europas Grossmaechte und ihre Interessen |
| 2 | mat-1-2 | karte | erarbeitung | k1-2 | mat-1-1 | Buendnissysteme geografisch |
| 3 | mat-1-3 | tagebuch | vertiefung | k1-4 | mat-1-1, mat-1-2 | Persoenliche Erfahrung der Aufruestung |
| ...

### Ueberleitungen
- mat-1-1 → mat-1-2: "Ihr habt gelesen, welche Interessen die Grossmaechte hatten. Auf der Karte seht ihr, wie sie sich zusammenschlossen."
- mat-1-2 → mat-1-3: "Die Buendnisse standen — aber wie erlebten die Menschen diese Spannung?"
```

Aus diesem Abschnitt generiert AGENT_MATERIAL die individuellen Sequenzkontext-Tabellen fuer jeden Subagenten-Aufruf.

### [Audit M-07] Engine-Implementierung: Sequenz-Rendering

Konkrete Aenderung in escape-engine.js (Uebergabe-Prompt):

```
1. Neue Hilfsfunktion: _sortMaterialienByPosition(materialien)
   - Wenn mat.position vorhanden: sort ascending by position
   - Fallback: Array-Index (Rueckwaertskompatibilitaet)

2. _renderMaterialien() aufrufen mit sortiertem Array

3. Vor jedem Material (ausser Position 1):
   - Wenn mat.ueberleitung_von vorhanden:
     <div class="material-ueberleitung">{ueberleitung_von}</div>

4. Material-Wrapper erhaelt data-position Attribut:
   <div class="material-card" data-position="{position}" data-funktion="{didaktische_funktion}">
```

### Verifikation
- [ ] MATERIAL_GERUEST_Mappe_1 enthaelt Sequenzplan-Abschnitt mit allen Feldern
- [ ] data.json: Jedes Material hat position, didaktische_funktion, voraussetzung
- [ ] Engine rendert Materialien in position-Reihenfolge (sort-Funktion)
- [ ] Engine faellt auf Array-Index zurueck, wenn position fehlt (Rueckwaertskompatibilitaet)
- [ ] Ueberleitungen zwischen Materialien werden gerendert
- [ ] Kein Material referenziert Konzepte, die erst spaeter eingefuehrt werden (manueller Check)
- [ ] Alle 5 SUB_MATERIAL_*.md enthalten Sequenzkontext-Eingabe-Abschnitt + SQ-1 bis SQ-4
- [ ] WORKFLOW_v2.md enthaelt Phase 1.5 SEQUENZPLANUNG

---

## Phase v3.4: Fragebogen-Guetekriterien

### Problem
Aufgaben/Fragebogen sind aktuell zu kleinteilig (zu viel MC), optisch nicht vom Material getrennt, und es fehlen Guetekriterien fuer Aufgabenstellungen. Loesungsbuchstabe wird zu frueh/falsch angezeigt.

### Abhaengigkeit
**Haengt von v3.3 ab.** Die Aufgaben muessen auf die sequenzierte Materialstruktur referenzieren. Wenn sich die Materialreihenfolge aendert, brechen Aufgabenreferenzen.

### Aenderungsumfang

#### 1. GUETEKRITERIEN_AUFGABEN.md (NEU)
Analoges Dokument zu GUETEKRITERIEN_TAFELBILD.md. Pruefpunkte (Entwurf):
- A1: Aufgabe referenziert konkretes Material (mat-ID + Stelle)
- A2: Aufgabentyp passt zur didaktischen Funktion des Materials
- A3: Antwortoptionen bei MC: exakt 1 korrekte, Distraktoren plausibel aber eindeutig falsch
- A4: Kein Raten moeglich (mind. 4 Optionen oder offene Frage)
- A5: Progressives Schwierigkeitsniveau entlang der Sequenz
- A6: Balance Materialtypen: 2/3 materialbezogen, 1/3 transferierend
- A7: Loesungsbuchstabe erscheint NUR nach korrekter Antwort

#### 2. AGENT_RAETSEL.md Update
- Q-Gate mit A1-A7
- Aufgabentyp-Erweiterung (Lueckentext, Zuordnung, Freitext neben MC)
- Sequenz-Bewusstsein: Aufgaben folgen der Material-Sequenz

#### 3. Engine + CSS (Uebergabe-Prompt)
- **[Audit M-08]** Layout 2/3-1/3: Gehoert zu v3.4 (nicht v3.5), weil die Fragebogen-Guetekriterien das Layout-Konzept voraussetzen. Implementierung: CSS Grid (`grid-template-columns: 2fr 1fr`), Mobile: Single-Column-Fallback (`@media (max-width: 768px)`). Desktop-First, weil Unterricht ueberwiegend am Beamer/Tablet.
- Fragebogen im Notizbuch-Stil: CSS-only (kein SVG). MUSS sich visuell vom Hefteintrag/Sicherungs-CSS abheben — psychologische Ergonomie: Erarbeitung/Teilsicherung und finale Sicherung sind aufeinander aufbauende, aber kognitiv getrennte Phasen. Das muss visuell repraesentiert werden. Konkret: Eigenes Farbschema (nicht gelb wie Merkbox, nicht Hefteintrag-Linierung), eigene Schriftart (nicht Caveat/Patrick Hand — die gehoeren zur Sicherung). Prototyp als HTML-Datei in docs/analyse/ vor Engine-Implementierung.
- Loesungswort-Mechanismus: Mappe-Level `freischalt_code` (String, z.B. "PULVER"). Nach Loesung ALLER Aufgaben werden alle Buchstaben gleichzeitig in zufaelliger Reihenfolge als draggbare Tiles angezeigt. Schueler ordnet per Drag-and-Drop. Korrekte Anordnung → Sicherung/Hefteintrag freigeschaltet. Kein `freischalt_buchstabe` auf Aufgaben-Ebene.

### Betroffene Artefakte

| Datei | Aenderung | Owner |
|-------|-----------|-------|
| `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md` | NEU ERSTELLEN | Cowork |
| `docs/agents/AGENT_RAETSEL.md` | Q-Gate, Aufgabentypen, Sequenz-Bewusstsein | Cowork |
| `assets/js/escape-engine.js` | 2/3-1/3 Layout, Loesungsbuchstabe-Logik | Claude Code |
| `assets/css/themes/theme-gpg.css` | Notizbuch-Stil Fragebogen | Claude Code |
| `assets/css/base.css` | Responsive 2/3-1/3 Grid | Claude Code |

---

## Phase v3.5: Layout-Redesign

### Problem
Material-Ansicht ist funktional, aber nicht optimiert fuer die User-Journey. Keine visuellen Uebergaenge, keine Fortschrittsanzeige, kein "Flow"-Gefuehl.

### Abhaengigkeit
Baut auf v3.3 (Sequenzierung) auf. Kann parallel zu v3.4 laufen.

### Aenderungsumfang
- **2/3-1/3 Grid** (Audit M-08): Material dominant (2fr), Fragebogen als sticky Sidebar (1fr). Sticky-Wechsel: Fragebogen sticky statt Material. Breakpoint Single-Column: 1024px.
- **Notizbuch-Stil Fragebogen** (Entscheidung E5): Arbeitsblatt-Metapher (kariert, Lochrand oben). Eigenes Farbschema (Tintenblau #2952A3). Eigene Schriftart (Architects Daughter, NICHT Caveat/Patrick Hand). Visuell klar abgegrenzt vom Hefteintrag (Sicherung).
- Fortschrittsanzeige: Material-Dots (IntersectionObserver) + Aufgaben-Dots (statt Balken)
- Ueberleitung-Optimierung: zentriert, Pfeil-Icon, transparenter Gradient
- Tablet-First Responsive (Unterricht primaer am Beamer/Tablet)

### Design-Dokumentation
- Design-Spec: `docs/analyse/DESIGN_SPEC_v3-5_LAYOUT_REDESIGN.md`
- Visueller Prototyp: `docs/analyse/PROTOTYP_v3-5_LAYOUT.html`
- Uebergabe-Prompt: `docs/uebergabe/UEBERGABE_v3-5_LAYOUT_REDESIGN.md`

### Betroffene Artefakte

| Datei | Aenderung | Owner |
|-------|-----------|-------|
| `assets/css/base.css` | Grid 2fr/1fr, Sticky-Wechsel, Breakpoint 1024px | Claude Code |
| `assets/css/themes/theme-gpg.css` | Notizbuch-Stil (Karo, Lochrand, Tintenblau), Ueberleitung-Styles, Font-Import | Claude Code |
| `assets/js/escape-engine.js` | Material-Fortschritt (IntersectionObserver), Aufgaben-Dots, Container-Anpassung | Claude Code |

---

## Phase v3.6: AGENT_DIFFERENZIERUNG MVP

### Problem
Materialien sind aktuell nicht differenziert. Alle SuS bearbeiten identisches Material auf identischem Niveau. Kein Scaffolding fuer schwache Lerner, keine Vertiefung fuer starke.

### Abhaengigkeit
**Haengt von v3.3 + v3.4 ab.** v3.3 (Sequenzierung): KI-Sidekick-Prompts und Wort-Erklaerungen arbeiten auf sequenziertem Material — Position und Vorwissen bestimmen die Prompt-Kontextualisierung. v3.4 (Fragebogen): Tipp-System ist an Aufgaben gekoppelt, Aufgabenstruktur muss stehen.

### Vorbedingungen (vor Implementierung zu erledigen)

**[Audit M-06]** ORCHESTRATOR.md muss aktualisiert werden: Neue Phase 2.3 AGENT_DIFFERENZIERUNG zwischen AGENT_RAETSEL (Phase 2.2) und Assembly (Phase 2.4, bisher 2.3). Agenten-Tabelle um AGENT_DIFFERENZIERUNG erweitern. Ausfuehrungsort: Cowork (Erklaerungen, KI-Prompts) + Claude Code (DaZ-Uebersetzungen, Engine-Features).

### Drei Teilsysteme

#### A: Wort-Erklaerungen (Hover/Tap)
- Schwierige Woerter im Material bekommen Annotationen
- data.json: `erklaerungen[]` Array pro Material mit `{wort, erklaerung}`
- Engine: Tooltip bei Hover/Tap

#### B: Tipp-Struktur
- Max. 2 Tipps pro Aufgabe
- Jeder Tipp hat Malus-Markierung (sichtbar im Ergebnis)
- data.json: `tipps[]` pro Aufgabe (existiert bereits als Objekt-Array)
- Engine: Tipp-Button mit Counter + Malus-Badge

#### C: KI-Sidekick
- Buttons an Materialien und Aufgaben
- Kontextspezifischer Prompt wird in Clipboard kopiert
- Zwei Richtungen: "Erklaer mir das einfacher" (nach unten) / "Ich will mehr wissen" (nach oben)
- Rollenpriming: Lernbegleiter-Verhalten, niedrige Interaktionshuerde, Folgefragenanregung
- data.json: `ki_prompts` Object pro Material mit `{einfacher, vertiefung}`

#### D: DaZ-Modul (integriert statt separater Phase)
- Globaler Sprachbutton im Header
- Aendert NUR Fragenkatalog-Sprache (5-8 Aufgabenstellungen pro Mappe)
- **[Audit L-13]** data.json: `aufgabenstellung_daz: {ru: "...", ar: "..."}` als Feld in jedem `aufgaben[]`-Element (neben `frage`, `typ`, `optionen` etc.). Wenn Feld fehlt oder Sprache nicht vorhanden: Engine zeigt deutsche Aufgabenstellung (Fallback). Pilot-Sprachen: Russisch (ru), Arabisch (ar)
- KI-Sidekick-Prompts werden mit Erstsprache kontextualisiert: "Der Schueler spricht [Erstsprache] als Muttersprache und lernt Deutsch. Erklaere..."
- Keine Materialuebersetzung (zu aufwaendig, didaktisch fragwuerdig — Fachsprache muss auf Deutsch gelernt werden)

### Neuer Agent: AGENT_DIFFERENZIERUNG.md

| Feld                 | Wert                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------- |
| Rolle                | Differenzierung aller Materialien und Aufgaben einer fertigen Mappe                   |
| Input                | Fertige Mappe (nach v3.4 Fragebogen-Finalisierung)                                    |
| Output               | Differenzierungs-Layer: erklaerungen[], tipps[], ki_prompts{}, aufgabenstellung_daz{} |
| Position im Workflow | Nach AGENT_RAETSEL (Phase 2.3), vor Assembly (Phase 2.4)                              |

### Betroffene Artefakte

| Datei | Aenderung | Owner |
|-------|-----------|-------|
| `docs/agents/AGENT_DIFFERENZIERUNG.md` | NEU ERSTELLEN | Cowork |
| `docs/architektur/WORKFLOW_v2.md` | Phase 2.3 DIFFERENZIERUNG einfuegen | Cowork |
| `escape-games/template/data.json` | Schema: erklaerungen, ki_prompts, aufgabenstellung_daz | Claude Code |
| `assets/js/escape-engine.js` | Tooltip-Engine, Tipp-Button, Sidekick-Button, Sprachbutton | Claude Code |
| `assets/css/themes/theme-gpg.css` | Tooltip-Styles, Tipp-Badge, Sidekick-Button, Sprachswitch | Claude Code |

---

## Phase v3.7: Aufgaben-Subagenten-Architektur + Zwischenartefakte

### Problem

AGENT_RAETSEL arbeitet monolithisch: Typauswahl, Frageformulierung, Antwortgestaltung, Distractor-Konstruktion, Tipp-Formulierung und Q-Gate in einem Durchlauf. Das fuehrt zu drei Defiziten:

1. **Keine typ-spezifische Expertise.** MC-Distractor-Qualitaet erfordert anderes Wissen als Zuordnungs-Trennschaerfe oder Freitext-Scaffolding. Ein monolithischer Agent kann diese Expertise nicht gleichzeitig auf hohem Niveau halten.
2. **Keine isolierte Optimierbarkeit.** Qualitaetsprobleme bei einem Fragetyp erfordern Eingriff in den gesamten AGENT_RAETSEL-Prompt. Regressionsgefahr fuer andere Typen.
3. **Keine Erweiterbarkeit.** Neue Aufgabentypen (z.B. Hotspot-Bild, Drag-Map, Luecken-Zuordnung-Hybrid) erfordern Umbau des Gesamtagenten statt modularer Ergaenzung.

### Abhaengigkeit

**Haengt von v3.4 ab** (GUETEKRITERIEN_AUFGABEN.md A1-A15 muessen stehen). **Implizite Abhaengigkeit zu v3.3** (transitiv ueber v3.4): Konstruktionskontext nutzt Sequenzinformation (material_position, didaktische_funktion) aus v3.3. Kann parallel zu v3.6 laufen.

### Architektur-Entscheidungen

**[E7] Subagenten-Split statt inkrementeller Erweiterung.** Begruendung: (a) Didaktische Praezision — die inhaltliche Ausgestaltung jeder Frage (Fragestellung, Bruecke Material-Kompetenzerwerb, Antwortoptionen) ist fachdidaktisch sensibel und erfordert typ-spezifische Heuristiken. (b) Skalierung — Qualitaetsprobleme pro Typ isoliert behebbar. (c) Erweiterbarkeit — neue Typen als neuer SUB_AUFGABE_*.md, kein Umbau des Orchestrators.

**[E8] Zwischenartefakte als Nebenprodukt, kein Workflow-Gate.** Die .md-Zwischenartefakte (FRAGEBOGEN_mappe-N.md, MATERIALIEN_mappe-N.md) werden waehrend der Generierung simultan mit den JSON-Daten geschrieben. Sie dienen der Wartbarkeit und Editierbarkeit — nicht der User-Interaktion waehrend der Generierung. Kein zusaetzlicher User-Gate, kein Workflow-Break. Format: strukturiert und maschinell parsebar, nicht prosa-optimiert.

### Loesungsarchitektur

#### 1. AGENT_RAETSEL als Orchestrator (Refactor)

AGENT_RAETSEL wird analog zu AGENT_MATERIAL refaktoriert: Verantwortlich fuer Struktur und Konsistenz, nicht fuer Einzelaufgaben-Konstruktion.

**Verbleibende Verantwortung AGENT_RAETSEL:**

| Aufgabe | Beschreibung |
|---------|-------------|
| Progressionsplan | AFB-Zuweisung pro Position (I → II → III), Typauswahl pro Position |
| Typvielfalt-Sicherung | Mind. 3 verschiedene Typen pro Mappe |
| Konstruktionskontext generieren | Pro Aufgabe: Material-Zusammenfassung (Cross-Konsistenz) + Volltext-Referenz (fuer Subagent), TB-Knoten, AFB, Position, Operationalisierungsziel |
| Operationalisierungsziel herleiten | Pro Aufgabe: Ableitung aus TB-Knoten-Merksatz + AFB-Operator. Muster: `[AFB-Operator] + [TB-Knoten-Merksatz als Frageform]`. Beispiel: TB-Knoten "Buendnissysteme teilten Europa" + AFB II → "Erklaere, warum die Buendnissysteme Europa teilten" |
| Dispatch an SUB_AUFGABE_* | Je Aufgabe den passenden Subagenten aufrufen |
| Cross-Aufgaben-Konsistenz | Redundanzvermeidung, Progressions-Validierung, Typbalance |
| Freischalt-Code | Thematisch passend, A-Z, 4-8 Zeichen |
| Narrativer Rahmen | Rahmengeschichte, Pro-Mappe-Einstieg, Abschluss |
| Assembly | aufgaben[] zusammenfuehren, FRAGEBOGEN_mappe-N.md als Zwischenartefakt schreiben |

**Abgegebene Verantwortung (geht an SUB_AUFGABE_*):**

| Aufgabe | Beschreibung |
|---------|-------------|
| Fragestellung formulieren | Fragestamm: operationalisiert, praezise, einfordriges kognitives Ziel |
| Antwortoptionen gestalten | MC: Distraktoren. Zuordnung: Pole. Reihenfolge: Elemente. Lueckentext: Lueckenauswahl. Freitext: Leitfragen + Scaffolding |
| Tipp-Formulierung | 3 Stufen (Hinweis → Teilantwort → Loesung+Erklaerung), typ-spezifisch |
| Typ-spezifisches Q-Gate | Pruefung gegen typ-spezifische Guetekriterien |

**Q-Gate-Zuordnung A-Kriterien → Pruefinstanz (Audit-Finding #6):**

| A-Kriterium | Pruefinstanz | Begruendung |
|-------------|-------------|-------------|
| A1 AFB-Kongruenz | Subagent (eigene Aufgabe) + Orchestrator (Gesamtbild) | Subagent prueft: Stimmt AFB mit Fragestellung ueberein? Orchestrator prueft: Stimmt AFB mit Progressionsplan ueberein? |
| A2 Fragestaemme-Klarheit | Subagent | Einzelaufgaben-Qualitaet |
| A3 Material-Kongruenz | Subagent (eigene Aufgabe) + Orchestrator (Vollstaendigkeit) | Subagent prueft: Aus Ziel-Material beantwortbar? Orchestrator prueft: Alle Materialien abgedeckt? |
| A4 Konstruktionsqualitaet (typ-spezifisch) | Jeweiliger Subagent: A4-MC (Distractor-Qualitaet), A4-ZU (Trennschaerfe), A4-LT (Luecken-Eindeutigkeit), A4-RF (Reihenfolge-Eindeutigkeit). Freitext hat kein A4-* (stattdessen A11-FT) | Jeder Typ hat ein eigenes zentrales Konstruktionskriterium. A4 ist der Namespace fuer typ-spezifische Kernqualitaet |
| A5 Schwierigkeits-Progression | NUR Orchestrator | Cross-Aufgaben-Kriterium |
| A6 Tipp-Progression | Subagent | Einzelaufgaben-Qualitaet |
| A7 Operator-Praezision | Subagent | Einzelaufgaben-Qualitaet |
| A8 Kognitive Aktivierung | Orchestrator | Cross-Aufgaben-Kriterium (mind. 1 pro Mappe) |
| A9 TB-Bezug | Orchestrator | Cross-Aufgaben-Kriterium (mind. 1 pro Mappe auf TB-Knoten) |
| A10 Typvielfalt | NUR Orchestrator | Cross-Aufgaben-Kriterium |
| A11 Freitext-Qualitaet | NUR SUB_AUFGABE_FREITEXT (als A11-FT) | Typ-spezifisch |
| A12 Sachbezogen-vor-Wertbezogen | Orchestrator | Cross-Aufgaben-Sequenz |
| A13-A15 | Orchestrator (KANN-Pruefung) | Game-weite Qualitaetssteigerung |

**Ruecklauf-Mechanismus:** Wenn Orchestrator bei Cross-Konsistenz ein Problem findet, das im Subagenten-Output begruendet liegt (z.B. AFB-Regression durch Subagent-Fehleinschaetzung): Orchestrator dispatcht den betroffenen Subagenten erneut mit korrigiertem Konstruktionskontext (praezisiertes Operationalisierungsziel oder explizitem AFB-Constraint). Max. 2 Re-Dispatch pro Aufgabe.

#### 2. SUB_AUFGABE_*-Architektur (5 Subagenten)

Jeder Subagent ist ein eigenstaendiger Prompt (docs/agents/SUB_AUFGABE_*.md) mit folgender Struktur:

```
SUB_AUFGABE_[TYP].md
├── Rolle + Didaktischer Zweck
│   Wann wird dieser Typ eingesetzt?
│   Welche Kompetenz prueft er? (AFB-Zuordnung)
│   Wie bildet er die Bruecke Material → Kompetenzerwerb?
│
├── Eingabe: Konstruktionskontext (Pflicht)
│   Template: siehe unten
│
├── Konstruktionsheuristiken
│   Fragestamm-Formulierung (typ-spezifisch)
│   Antwortoptionen/Elemente-Gestaltung (typ-spezifisch)
│   Tipp-Formulierung (typ-spezifisch)
│   Anti-Patterns (typ-spezifisch)
│
├── Guetekriterien (inline, typ-spezifisch)
│   Praezisiertes Subset aus A1-A15 + eigene Kriterien
│   Referenz auf GUETEKRITERIEN_AUFGABEN.md fuer Makro-Ebene
│
├── Rendering-Kontrakt
│   data.json-Schema (exakte Felder die Engine erwartet)
│   BEM-Klassen (HTML-Struktur)
│   JS-Verhalten (Validierungslogik)
│
├── Beispiel
│   1 vollstaendiges aufgabe-JSON-Objekt
│
└── Ausgabe
    aufgabe-JSON-Objekt + Q-Gate-Log
```

**Die 5 initialen Subagenten:**

| Subagent | Primaerer AFB | Kern-Expertise |
|----------|---------------|----------------|
| SUB_AUFGABE_MC | I (auch II bei Transfer-MC) | Distractor-Konstruktion: plausible Fehlkonzepte, keine absurden Optionen, genau 1 korrekte Antwort |
| SUB_AUFGABE_ZUORDNUNG | I-II | Pole-Trennschaerfe: Kategorien muessen disjunkt sein, Zuordnungen muessen eindeutig aus Material ableitbar sein |
| SUB_AUFGABE_LUECKENTEXT | I-II | Lueckenauswahl: Fachbegriffe/Schluesselkonzepte als Luecken, max. 2 Woerter pro Luecke, Kontext-Hinweise im Umgebungstext |
| SUB_AUFGABE_REIHENFOLGE | II | Element-Abgrenzung: Elemente muessen klar sequenzierbar sein (Chronologie, Kausalitaet, Prozess), keine ambigen Reihenfolgen |
| SUB_AUFGABE_FREITEXT | II-III | Scaffolding-Qualitaet: Problemorientierte Leitfrage, Teilfragen als Geruest, Fachbegriff-Validierung, bei ethischen Themen Perspektivitaet |

#### 3. Konstruktionskontext (Input pro Subagent-Aufruf)

AGENT_RAETSEL generiert pro Aufgabe einen individuellen Konstruktionskontext:

```markdown
## Konstruktionskontext

| Feld | Wert |
|------|------|
| Aufgaben-Position | 3 von 5 |
| AFB-Stufe | II |
| Ziel-Material | mat-1-2 (Karte: Buendnissysteme geografisch) — [Volltext des Materials, NUR fuer dieses Material] |
| Material-Zusammenfassungen | mat-1-1: Europas Grossmaechte und ihre Interessen. mat-1-3: Tagebuch Aufruestung. [...] |
| Material-Position in Sequenz | 2 von 5 (didaktische Funktion: erarbeitung) |
| TB-Knoten | k1-2 (Buendnissysteme) — Dein Aufgabe muss pruefen, ob dieser Knoten verstanden wurde |
| Operationalisierungsziel | Erklaere, warum die Buendnissysteme Europa in zwei Lager teilten (Herleitung: AFB-II-Operator "erklaere" + TB-Knoten-Merksatz "Buendnissysteme teilten Europa") |
| Bereits getestete Inhalte | Aufgabe 1 (MC, AFB I): Grossmaechte benennen. Aufgabe 2 (Lueckentext, AFB I): Fachbegriffe Dreibund/Entente |
| Noch nicht getestete TB-Knoten | k1-4 (Aufruestung), k1-5 (Attentat Sarajevo) |
```

**Operationalisierungsziel-Herleitung (KRITISCH):** Das Operationalisierungsziel ist die qualitaetskritischste Entscheidung des Orchestrators. Es bestimmt, WAS geprueft wird — nicht WIE. Herleitung:
1. TB-Knoten-Merksatz als inhaltliches Ziel
2. AFB-Operator (aus Progressionsplan) als kognitive Anforderung
3. Kombination: `[Operator] + [Merksatz als Frageform]`
4. Gegencheck: Ist das Ziel aus dem Ziel-Material beantwortbar? Wenn nein → anderes Material zuweisen oder Ziel anpassen

**Token-Management:** Der Subagent erhaelt den Volltext NUR fuer sein Ziel-Material (100-150 Woerter). Alle anderen Materialien als 1-Satz-Zusammenfassungen (fuer Kontext, nicht fuer Frageformulierung). Der Orchestrator arbeitet fuer Cross-Konsistenz ausschliesslich mit Zusammenfassungen + bisherigen Aufgaben-Outputs.

Analog zum Sequenzkontext der Material-Subagenten (v3.3): gleiche Struktur, gleiche Uebergabe als Markdown-Tabelle.

#### 4. Zwischenartefakt-Architektur

Pro Mappe wird ein FRAGEBOGEN_mappe-N.md als Nebenprodukt der Generierung geschrieben:

**Speicherort:** `escape-games/[game-id]/docs/FRAGEBOGEN_mappe-N.md`

**Format:** Strukturiert und maschinell parsebar. Kein Prosa-Dokument — primaerer Zweck ist deterministische Konvertierbarkeit zu data.json und Wartbarkeit/Editierbarkeit in einem Texteditor.

```markdown
# Fragebogen: Mappe [N] — [Titel]
freischalt_code: [CODE]

## Aufgabe [N]
typ: [typ]
afb: [I/II/III]
material_referenz: [mat-id]
tb_knoten: [knoten-id]

### frage
[Fragestellung]

### optionen
- A) [Text]
- B) [Text]
- C) [Text] ← korrekt
- D) [Text]

### distractor_begruendung
- A: [Fehlkonzept]
- B: [Fehlkonzept]
- D: [Fehlkonzept]

### tipps
1: [Hinweis]
2: [Teilantwort]
3: [Loesung + Erklaerung]

### q_gate
A1: PASS
A3: PASS
A4-MC: PASS — [Kurzbegruendung]
```

**Verhaeltnis .md ↔ data.json:** Subagenten schreiben DIREKT aufgabe-JSON-Objekte (primaerer Output fuer die Pipeline). Die .md-Datei wird PARALLEL als strukturiertes Lese-/Wartungsformat geschrieben — NICHT als fuehrendes Format fuer die Pipeline. data.json bleibt Single Source of Truth fuer Runtime. Wenn der User spaeter eine Aufgabe aendern will: .md editieren → Konversions-Prompt generiert daraus aktualisierte aufgaben[] in data.json. Konversion ist ein separater Uebergabe-Prompt (nicht Teil der regulaeren Pipeline).

**Validierung bei manueller .md-Editierung:** Da .md maschinennahes Markup enthaelt (`typ:`, `afb:`, `material_referenz:`), muss der Konversions-Prompt Feldvalidierung durchfuehren: unbekannte Typen, fehlende Pflichtfelder, inkonsistente mat-IDs melden statt still ignorieren.

**Material-Zwischenartefakte (Domain-Audit):** Dieselbe Logik wird auf Material-Subagenten angewandt. `escape-games/[game-id]/docs/MATERIALIEN_mappe-N.md` als wartbares Zwischenartefakt. Umstellung der Material-Subagenten auf .md-Zwischenformat wird als Folge-Aufgabe von v3.7 evaluiert (nicht blockierend fuer Aufgaben-Subagenten).

#### 5. Erweiterungspfad fuer neue Aufgabentypen

Modularer 4-Schritt-Prozess:

1. **SUB_AUFGABE_NEWTYPE.md erstellen** (Cowork): Didaktik + Konstruktionsheuristiken + Guetekriterien + Rendering-Kontrakt + Beispiel
2. **AGENT_RAETSEL.md aktualisieren** (Cowork): Neuen Typ in verfuegbare-Typen-Tabelle aufnehmen, AFB-Zuordnung ergaenzen
3. **Uebergabe-Prompt fuer escape-engine.js** (Claude Code): Neuen Renderer implementieren gemaess Rendering-Kontrakt aus SUB_AUFGABE_NEWTYPE
4. **AGENT_TECHNIK Typ-Registry aktualisieren** (Cowork): Verweis auf neuen Subagenten

Kein Umbau bestehender Subagenten oder des Orchestrators noetig.

### Domaenenzugehoerigkeit

| Artefakt | Domaene | Begruendung |
|----------|---------|-------------|
| SUB_AUFGABE_*.md (Prompt-Definitionen) | Cowork (docs/agents/) | Didaktische Inhalte, iterativ schaerfbar in Chat-Oberflaeche, sichtbar in Obsidian |
| Konstruktionskontext-Generierung | Claude Code (Phase 2.2) | Automatisiert aus fertigem Material + Progressionsplan |
| Subagenten-Ausfuehrung | Claude Code (Phase 2.2) | Automatisierte Generierung, kein User-Gate pro Aufgabe |
| FRAGEBOGEN_mappe-N.md | Cowork-lesbar, Claude-Code-generiert | Geschrieben waehrend Generierung, editierbar danach |
| aufgaben[] Assembly in data.json | Claude Code (Phase 2.3) | Deterministische Konversion aus .md oder direkt aus Subagenten-Output |

**Ausfuehrungsort-Entscheidung:** Subagenten laufen in Claude Code (automatisiert). Die Prompt-Definitionen liegen in Cowork-Domaene. Die Zwischenartefakte werden von Claude Code geschrieben, sind aber in Cowork-Domaene les- und editierbar. Kein Automatisierungsverlust.

### Vorbedingungen (vor Implementierung)

1. GUETEKRITERIEN_AUFGABEN.md (A1-A15) muss finalisiert sein (v3.4)
2. AGENT_RAETSEL.md: Bestehende Aufgabentyp-Abschnitte als Basis fuer Subagenten-Extraktion
3. data.json-Schema pro Aufgabentyp dokumentieren (aus bestehendem AGENT_RAETSEL + AGENT_TECHNIK extrahieren)

### Betroffene Artefakte

| Datei | Aenderung | Owner |
|-------|-----------|-------|
| `docs/agents/SUB_AUFGABE_MC.md` | NEU ERSTELLEN | Cowork |
| `docs/agents/SUB_AUFGABE_ZUORDNUNG.md` | NEU ERSTELLEN | Cowork |
| `docs/agents/SUB_AUFGABE_LUECKENTEXT.md` | NEU ERSTELLEN | Cowork |
| `docs/agents/SUB_AUFGABE_REIHENFOLGE.md` | NEU ERSTELLEN | Cowork |
| `docs/agents/SUB_AUFGABE_FREITEXT.md` | NEU ERSTELLEN | Cowork |
| `docs/agents/AGENT_RAETSEL.md` | Refactor: Orchestrator-Rolle, Dispatch-Logik, Konstruktionskontext-Template. Eingabe-Tabelle auf v3-Inputs aktualisieren (materialien[], TAFELBILD, DIDAKTIK_RAHMEN). Abschnitt 2 (Freischalt-Codes): veraltete "Einzelcodes"-Referenz durch v3.5h-DnD-Mechanismus ersetzen. Ausgabe-Sektion: Raetsel-MD → Konstruktionskontexte + FRAGEBOGEN_mappe-N.md + aufgaben[] | Cowork |
| `docs/architektur/WORKFLOW_v2.md` | Phase 2.2 aufteilen: 2.2a Orchestration, 2.2b Subagenten, 2.2c Assembly | Cowork |
| `docs/agents/ORCHESTRATOR.md` | Subagenten-Referenzen in Phase 2.2 | Cowork |
| `docs/agents/AGENT_TECHNIK.md` | Typ-Registry: Verweis auf SUB_AUFGABE_*.md fuer Rendering-Kontrakte | Cowork |
| `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md` | Aktualisieren: Mapping A-Kriterium → Pruefinstanz (Orchestrator vs. Subagent). Referenz auf Q-Gate-Zuordnungstabelle in v3.7 | Cowork |

### Verifikation

- [ ] 5 SUB_AUFGABE_*.md existieren mit vollstaendiger Struktur (Didaktik, Heuristiken, Guetekriterien, Kontrakt, Beispiel)
- [ ] AGENT_RAETSEL.md enthaelt Orchestrator-Logik mit Konstruktionskontext-Template
- [ ] Testlauf: Mappe 1 mit neuer Subagenten-Architektur generieren, Ergebnis gegen bestehende aufgaben[] vergleichen
- [ ] FRAGEBOGEN_mappe-1.md wird als Zwischenartefakt geschrieben und ist deterministisch zu data.json konvertierbar
- [ ] Neuer Aufgabentyp (Dummy) kann durch 4-Schritt-Prozess hinzugefuegt werden ohne bestehende Subagenten zu aendern
- [ ] WORKFLOW_v2.md reflektiert neue Phase-2.2-Substruktur
- [ ] GUETEKRITERIEN_AUFGABEN.md enthaelt Mapping A-Kriterium → Pruefinstanz
- [ ] Edge Case: Orchestrator kann Mappe mit < 5 Aufgaben handhaben (mind. 3 Aufgaben, mind. 3 Typen)
- [ ] Edge Case: Aufgabe mit nur 1 Material-Referenz (Mindest-Material = 1, kein Minimum > 1 erzwingen)
- [ ] Edge Case: AFB-Typ-Mismatch (z.B. MC fuer AFB III) — Orchestrator eskaliert an User statt stille Zuweisung

---

## Phase v3.8: Material-Subagenten + Qualitaet + UI-Optimierung

### Problem

Die Material- und UI-Qualitaet weist nach den ersten Testlaeufen systematische Defizite auf, die VOR der Differenzierungs-Schicht (v3.6) behoben werden muessen. Betroffen sind drei Ebenen: (a) **Architektur** — AGENT_MATERIAL.md ist monolithisch (Orchestrator + 7 Materialtyp-Workflows + Qualitaetsspezifikationen in einer Datei). Analog zur v3.7-Aufgaben-Subagenten-Extraktion muessen die Materialtyp-Workflows in eigenstaendige SUB_MATERIAL_*.md extrahiert werden. (b) **Engine/UI** — Infobox-Layout, Sticky-Header, Sicherungs-Format — erfordern Aenderungen in HTML/CSS/JS. (c) **Content-Agenten** — Material-Titel, dynamische Referenzen, Quellenangaben, Abschlussfrage — erfordern Aenderungen in Agenten-Prompts und data.json-Schema.

Begruendung fuer Material-Subagenten-Extraktion: AGENT_MATERIAL.md enthaelt aktuell 745+ Zeilen mit 7 Materialtyp-Workflows (W-1 bis W-7), Quellenrecherche-Workflows, Qualitaetsspezifikationen pro Typ und Tool-Chains. Dieselben Probleme wie vor v3.7 bei AGENT_RAETSEL: (1) Monolithischer Prompt uebersteigt sinnvolle Kontextnutzung — ein Subagent, der einen Darstellungstext schreibt, braucht nicht die Tool-Chain fuer Kartenrecherche. (2) Typ-spezifische Qualitaetskriterien und Heuristiken lassen sich in dedizierten Subagenten praeziser formulieren. (3) Neue Materialtypen (z.B. Audioquelle, interaktives Diagramm) koennen modular ergaenzt werden. (4) Die v3.8-Qualitaetsaenderungen (C1-C5) lassen sich direkt in den jeweiligen Subagenten verankern statt als globale Regeln in einem monolithischen Prompt.

Begruendung fuer Einschub vor v3.6: Die Differenzierungs-Schicht (Erklaerungen, KI-Sidekick, DaZ) baut direkt auf Materialien und UI auf. Qualitaetsmaengel in der Basis propagieren in die Differenzierungs-Logik. Ausserdem: UI-Aenderungen (Sticky-Header, Infobox-Breite) beeinflussen das Layout, in das v3.6-Elemente (Tooltips, Sidekick-Buttons) eingebettet werden.

### Abhaengigkeit

**Haengt von v3.5 + v3.7 ab.** v3.5 (Layout-Redesign): Infobox und Grid-Struktur existieren, werden hier optimiert. v3.7 (Subagenten): Material-Agenten-Prompts stehen, werden hier praezisiert.

### Aenderungsumfang

#### UI/Engine-Aenderungen (Claude Code)

| ID | Aenderung | Beschreibung | Betroffene Dateien |
|----|-----------|-------------|-------------------|
| U1 | Infobox-Redesign | Volle Breite (Material + Fragebogen), zentralere Anordnung. Stundenfrage als Ueberschrift mittig formatiert | `assets/css/base.css`, `assets/css/themes/theme-*.css`, `escape-games/template/index.html` |
| U2 | Sticky-Header Stundenfrage | Stundenfrage fixiert als duenner Header beim Scrollen durch Materialien/Fragebogen. Sichtbar ueber allen Inhalten | `assets/css/base.css`, `assets/js/escape-engine.js` |
| U3 | Sicherung → Hefteintrag | Umbenennung "Sicherung" zu "Hefteintrag". A4-Format-Begrenzung, zentrale Anordnung | `assets/js/escape-engine.js`, `assets/css/base.css` |
| U4 | Quellenangaben ausblenden | Quellenangaben aus SuS-Sichtfeld entfernen (z.B. collapsed/hidden, nur per Toggle sichtbar fuer Lehrkraft) | `assets/js/escape-engine.js`, `assets/css/base.css` |

#### Architektur-Aenderung (Cowork — Voraussetzung fuer C1-C5)

| ID | Aenderung | Beschreibung | Betroffene Dateien |
|----|-----------|-------------|-------------------|
| C0 | Material-Subagenten-Extraktion | Analog v3.7 (AGENT_RAETSEL → SUB_AUFGABE_*): AGENT_MATERIAL von monolithischem Designer+Produzent zu **Orchestrator** refaktorieren. 7 Materialtyp-Workflows (W-1 bis W-7) + Qualitaetsspezifikationen in eigenstaendige SUB_MATERIAL_*.md extrahieren. **W-8 (Tafelbild-Workflow) wird entfernt** — seit v3 obsolet, TB-Erstellung ist AGENT_TAFELBILD (Phase 0.4), TB-Uebernahme in data.json ist Assembly-Aufgabe des Orchestrators. AGENT_MATERIAL behaelt: Design-Modus (Sequenzierung, Blueprint, Erarbeitbarkeits-Nachweis), Orchestrator-Logik (Materialtyp-Auswahl, Sequenzkontext-Generierung, Quellenrecherche-Referenz-Workflow), Produktions-Dispatch. Jeder Subagent bekommt: Rolle + didaktischer Zweck, Produktions-Workflow (bisherige W-*-Sektion), Qualitaetsspezifikation (bisherige Qualitaets-Gate-Sektion), Wortbudget + Stil-Constraints, Tool-Chain-Referenz, Rendering-Kontrakt (data.json-Schema fuer diesen Typ inkl. Engine-Typ-Mapping), Beispiel-Output | `docs/agents/AGENT_MATERIAL.md` (Refactoring), `docs/agents/SUB_MATERIAL_DARSTELLUNGSTEXT.md` (NEU), `docs/agents/SUB_MATERIAL_QUELLENTEXT.md` (NEU), `docs/agents/SUB_MATERIAL_BILDQUELLE.md` (NEU), `docs/agents/SUB_MATERIAL_KARTE.md` (NEU), `docs/agents/SUB_MATERIAL_ZEITLEISTE.md` (NEU), `docs/agents/SUB_MATERIAL_STATISTIK.md` (NEU), `docs/agents/SUB_MATERIAL_TAGEBUCH.md` (NEU) |

**Die 7 Material-Subagenten:**

| Subagent | Bisheriger Workflow | Kern-Expertise | Tool-Chain | Engine-Typ (data.json) |
|----------|-------------------|----------------|------------|----------------------|
| SUB_MATERIAL_DARSTELLUNGSTEXT | W-1 | Schuelernah, Sachtext-Niveau, max. 150 Woerter, Fachbegriff-Erklaerung | Agent-intern | `darstellungstext` |
| SUB_MATERIAL_QUELLENTEXT | W-2 | Perspektivitaet, Quelltyp-Format, Paraphrase-Kennzeichnung, max. 100 Woerter | markdownify, WebSearch | `quellentext` |
| SUB_MATERIAL_BILDQUELLE | W-3 | Quellentreue vs. Illustration, Bildunterschrift mit Erkenntnisfrage, Lizenz | wikimedia, rijksmuseum, Canva | `bildquelle` |
| SUB_MATERIAL_KARTE | W-4 | Historische Karten, Legende, Farbzuordnung, geographische Orientierung | wikimedia, Canva, excalidraw | `bildquelle` (Engine kennt keinen Karten-Renderer) |
| SUB_MATERIAL_ZEITLEISTE | W-5 | Chronologische Struktur, max. 8 Eintraege, Orientierungsanker | Engine-JSON, Mermaid, excalidraw | `zeitleiste` |
| SUB_MATERIAL_STATISTIK | W-6 | Datenbasierte Erkenntnis, Diagramm vs. Tabelle, Vergleichsvisualisierung | QuickChart, Engine-JSON, Canva | `zeitleiste` (Tabelle) oder `bildquelle` (Diagramm-PNG) |
| SUB_MATERIAL_TAGEBUCH | W-7 | Identifikationsfigur, Perspektivitaet, historische Plausibilitaet, max. 120 Woerter | Agent-intern | `quellentext` (Engine kennt keinen Tagebuch-Renderer) |

**Engine-Typ-Mapping (Audit Finding #4):** Karte, Statistik und Tagebuch haben eigene Produktionslogik, aber keinen eigenen Engine-Renderer. Der Rendering-Kontrakt jedes Subagenten muss den tatsaechlichen Engine-Typ benennen, den er in `data.json.materialien[].typ` setzt. Andernfalls setzt ein Subagent einen Typ-Wert, den die Engine nicht kennt.

**Strukturelle Analogie zu v3.7:**

| Aspekt | v3.7 (Aufgaben) | v3.8/C0 (Materialien) |
|--------|-----------------|----------------------|
| Monolith | AGENT_RAETSEL | AGENT_MATERIAL |
| Orchestrator-Rolle nach Refactoring | Progressionsplan, Dispatch, Cross-Konsistenz | Materialtyp-Auswahl, Sequenzierung, Blueprint, Erarbeitbarkeits-Nachweis |
| Subagenten | SUB_AUFGABE_{MC,ZU,LT,RF,FT} | SUB_MATERIAL_{DT,QT,BQ,KA,ZL,ST,TB} |
| Eingabe pro Subagent | Konstruktionskontext | Produktionskontext (Material-Entwurf + Sequenzkontext + Artefakt-Refs) |
| Typ-spezifische Q-Kriterien | A4-MC, A4-ZU, A4-LT, A4-RF | MQ2-DT, MQ2-QT, MQ2-BQ usw. (inline) |
| Rendering-Kontrakt | data.json aufgabe-Schema pro Typ | data.json material-Schema pro Typ |

**Produktionskontext (Input pro Subagent-Aufruf):**

AGENT_MATERIAL generiert pro Material einen individuellen Produktionskontext:

```markdown
## Produktionskontext

| Feld | Wert |
|------|------|
| Material-ID | mat-1-2 |
| Material-Typ | karte |
| TB-Knoten-Zuordnung | k1-2 (Buendnissysteme) |
| Funktion | "Dieses Material zeigt die geographische Verteilung der Buendnisse" |
| Artefakt-Ref | img-1-1 (Europakarte, wikimedia) |
| Sequenzkontext | Position 2 von 5, didaktische Funktion: erarbeitung, Voraussetzung: mat-1-1 |
| Vorher-Material | mat-1-1 (darstellungstext): Europas Grossmaechte und ihre Interessen |
| Nachher-Material | mat-1-3 (tagebuch): Soldat beschreibt Aufruestung |
| Ueberleitung-von | "Die Grossmaechte verbanden sich zu Buendnissen — doch wer stand auf welcher Seite?" |
| Stundenfrage | "Warum war Europa vor 1914 ein 'Pulverfass'?" |
| Wortbudget | [typ-spezifisch, siehe Subagent] |
| Skript-Passage | [typ-differenziert, siehe unten] |
```

**Skript-Passage im Produktionskontext (Audit Finding #1, KRITISCH):**

Textproduktive Subagenten (DT, TB, QT) erhalten die relevante SKRIPT-Passage als Volltext (200-300 Woerter, referenzierte Absaetze aus MATERIAL_GERUEST). Ohne SKRIPT-Zugang produzieren sie generischen Output ohne narrativen Anker — das war das Kernproblem von v1. Datenproduktive Subagenten (BQ, KA, ZL, ST) erhalten eine 1-Satz-Zusammenfassung des relevanten Skript-Absatzes (fuer Kontext, nicht fuer Textproduktion).

| Subagent-Typ | Skript-Passage |
|-------------|---------------|
| SUB_MATERIAL_DARSTELLUNGSTEXT | Volltext (200-300 W) — Primaerquelle fuer Textproduktion |
| SUB_MATERIAL_QUELLENTEXT | Volltext (200-300 W) — fuer kontextuelle Einbettung |
| SUB_MATERIAL_TAGEBUCH | Volltext (200-300 W) — fuer narrativen Anker der Identifikationsfigur |
| SUB_MATERIAL_BILDQUELLE | 1-Satz-Zusammenfassung — arbeitet auf Artefakt-Daten |
| SUB_MATERIAL_KARTE | 1-Satz-Zusammenfassung — arbeitet auf Artefakt-Daten |
| SUB_MATERIAL_ZEITLEISTE | 1-Satz-Zusammenfassung — arbeitet auf INHALTSBASIS-Fakten |
| SUB_MATERIAL_STATISTIK | 1-Satz-Zusammenfassung — arbeitet auf Datenbasis |

Analog zum Token-Management bei Aufgaben-Subagenten (v3.7): Volltext nur fuer das Ziel-Material, Zusammenfassungen fuer den Rest.

**Quellenrecherche-Workflow-Verortung (Audit Finding #2, KRITISCH):**

Der uebergreifende Quellenrecherche-Workflow (3 Stufen, 5 Quelltypen) wird differenziert verortet:

| Subagent | Recherche-Bedarf | Verortung |
|----------|-----------------|-----------|
| SUB_MATERIAL_BILDQUELLE | Bilder aus ARTEFAKT_INVENTAR (Phase 2.0 vorab heruntergeladen) | Kein Recherche-Bedarf — Subagent erhaelt lokale Pfade + Metadaten |
| SUB_MATERIAL_KARTE | Historische Karten aus ARTEFAKT_INVENTAR ODER generiert (Canva/excalidraw) | Fuer historische Karten: kein Recherche-Bedarf. Fuer generierte: Tool-Chain im Subagenten |
| SUB_MATERIAL_QUELLENTEXT | Primaerquellen-Recherche (WebSearch → markdownify → Aufbereitung) | Recherche im Subagenten (materialspezifisch, nicht vorab planbar) |
| SUB_MATERIAL_STATISTIK | Daten-Recherche (WebSearch → markdownify → Datenextraktion) | Recherche im Subagenten (materialspezifisch) |
| DT, TB, ZL | Kein externer Recherche-Bedarf | Agent-intern |

Der uebergreifende Quellenrecherche-Workflow (Stufen, Quelltypen, Fallback-Logik) bleibt als Referenz-Sektion im Orchestrator (AGENT_MATERIAL.md). SUB_MATERIAL_QUELLENTEXT und SUB_MATERIAL_STATISTIK referenzieren ihn fuer die Recherche-Stufen, enthalten aber ihre typ-spezifische Aufbereitungslogik inline.

#### Content-Agenten-Aenderungen (Cowork — aufbauend auf C0)

| ID | Aenderung | Beschreibung | Betroffene Dateien |
|----|-----------|-------------|-------------------|
| C1 | Mappenueberschrift = 1 Stundenfrage | Jede Mappe hat genau eine Stundenfrage als Ueberschrift (nicht mehrere Fragen oder Aussagen). Beispiel: "Warum war Europa vor 1914 ein 'Pulverfass'?" | `docs/agents/AGENT_SKRIPT.md`, `docs/agents/AGENT_MATERIAL.md` |
| C2 | Material-Titel (Typ A/B) | **Typ A — Frage-Titel** (einstieg/erarbeitung): Teilfrage oder praegnanter Kontextsatz. **Typ B — Statement-Titel** (vertiefung/sicherung-Bildquellen mit ankernder Funktion): Praegnanter Eindruck. Entscheidungsregel: Arbeitsauftrag → Typ A, primaer Eindruck → Typ B | `docs/agents/AGENT_MATERIAL.md`, `docs/agents/SUB_MATERIAL_*.md` |
| C3 | Inline-Material-Links | `[[mat-id\|Anzeigetext]]`-Markup in Fragestamm + Tipps. Engine rendert als `<a href="#mat-id">Anzeigetext</a>`. Muster: `[[mat-1-2\|Europakarte von 1914]] (M7)` — inhaltliche Kurzbenennung als Link + (M-Position) als Orientierung. **Engine-Erweiterung noetig:** Tipp-Rendering muss `[[...]]`-Markup parsen (aktuell textContent) | `docs/agents/AGENT_RAETSEL.md`, `docs/agents/SUB_AUFGABE_*.md`, `assets/js/escape-engine.js` |
| C4 | Didaktische Bildunterschriften | Bildunterschriften nicht als Quellenangabe, sondern als didaktisch generierte Beschreibung formulieren. Quellenangabe separat (vgl. U4) | `docs/agents/SUB_MATERIAL_BILDQUELLE.md`, `docs/agents/SUB_MATERIAL_KARTE.md` |
| C5 | Abschluss-Impuls (Ueberleitung/Reflexion) | Am Ende jeder Mappe ein motivierender Abschluss. **Variante A** (nicht-letzte Mappen): impulsartige Ueberleitung zur naechsten Mappe, keine Frageform. Beispiel: "Wie ein Schuss den ganzen Kontinent in den Krieg stuerzen konnte, erfaehrst du in der naechsten Mappe." **Variante B** (letzte Mappe): offene Reflexionsfrage. Markierung: `[ABSCHLUSS C5: UEBERLEITUNG]` bzw. `[ABSCHLUSS C5: REFLEXION]` | `docs/agents/AGENT_SKRIPT.md` (Formulierung + MQ5), `docs/agents/AGENT_RAETSEL.md` (Uebernahme-Hinweis) |

### Betroffene Artefakte (Gesamtuebersicht)

| Datei | Aenderungen | Owner |
|-------|-------------|-------|
| `docs/agents/AGENT_MATERIAL.md` | C0 Refactoring zu Orchestrator (Design-Modus bleibt, Produktions-Workflows extrahiert), C1 Stundenfrage-Weiterleitung | Cowork |
| `docs/agents/SUB_MATERIAL_DARSTELLUNGSTEXT.md` | C0 NEU ERSTELLEN (aus W-1 + Qualitaetsspez.), C2 Titel-als-Teilfrage | Cowork |
| `docs/agents/SUB_MATERIAL_QUELLENTEXT.md` | C0 NEU ERSTELLEN (aus W-2 + Qualitaetsspez.), C2 Titel-als-Teilfrage | Cowork |
| `docs/agents/SUB_MATERIAL_BILDQUELLE.md` | C0 NEU ERSTELLEN (aus W-3 + Qualitaetsspez.), C2 Titel-als-Teilfrage, C4 didaktische Bildunterschriften | Cowork |
| `docs/agents/SUB_MATERIAL_KARTE.md` | C0 NEU ERSTELLEN (aus W-4 + Qualitaetsspez.), C2 Titel-als-Teilfrage, C4 didaktische Bildunterschriften | Cowork |
| `docs/agents/SUB_MATERIAL_ZEITLEISTE.md` | C0 NEU ERSTELLEN (aus W-5 + Qualitaetsspez.), C2 Titel-als-Teilfrage | Cowork |
| `docs/agents/SUB_MATERIAL_STATISTIK.md` | C0 NEU ERSTELLEN (aus W-6 + Qualitaetsspez.), C2 Titel-als-Teilfrage | Cowork |
| `docs/agents/SUB_MATERIAL_TAGEBUCH.md` | C0 NEU ERSTELLEN (aus W-7 + Qualitaetsspez.), C2 Titel-als-Teilfrage | Cowork |
| `docs/agents/AGENT_SKRIPT.md` | C1 Stundenfrage-Constraint, C5 Abschlussfrage-Muster | Cowork |
| `docs/agents/AGENT_RAETSEL.md` | C3 dynamische mat-ID-Referenzen, C5 Abschlussfrage | Cowork |
| `docs/agents/SUB_AUFGABE_*.md` | C3 dynamische mat-ID-Referenzen in Fragestamm-Heuristiken | Cowork |
| `docs/architektur/WORKFLOW_v2.md` | Phase 2.1: 5→7 SUB_MATERIAL_* (ERLEDIGT). Subagenten-Tabelle + Engine-Typ-Mapping aktualisieren. Dispatch-Ablauf: Produktionskontext statt bisheriges Eingabe-Paket. Referenztabelle (Sektion 10) umbenennen | Cowork |
| `docs/agents/ORCHESTRATOR.md` | Material-Subagenten in Referenztabelle | Cowork |
| `docs/agents/AGENT_TECHNIK.md` | Material-Typ-Registry mit SUB_MATERIAL_*-Referenzen | Cowork |
| `assets/css/base.css` | U1 Infobox-Breite | Claude Code |
| `assets/css/themes/theme-*.css` | U1 Infobox-Anpassung, U2 Sticky-Header CSS, U4 Quellen-Toggle CSS, U9 Einstieg-Zentrierung, U10 Sticky-Transition 0.3s | Claude Code |
| `assets/js/escape-engine.js` | U2 Sticky-Scroll-Logik, U3 Hefteintrag-Rendering, U4 Quellenangaben-Toggle-Logik, U5 Sticky=Stundenfrage, U6 Mappenbezeichner, U7 Beschreibung hidden, U8 Game-Titel entfernt, U10 Observer auf Problemstellung | Claude Code |
| `escape-games/gpg-erster-weltkrieg-ursachen/data.json` | Migration Mappe 1: Titel, Referenzen, Abschlussfrage, Hefteintrag | Claude Code |

### Domaenenzugehoerigkeit

| Aenderung | Domaene | Begruendung |
|-----------|---------|-------------|
| U1-U10 | Claude Code | HTML/CSS/JS-Aenderungen, Engine-Logik |
| C0 | Cowork (Prompt-Pflege) | Prompt-Definitionen in docs/agents/. **Ausfuehrungsort aller SUB_MATERIAL_* ist Claude Code (Phase 2.1 Dispatch)** |
| C1-C5 | Cowork | Agenten-Prompt-Aenderungen, didaktische Entscheidungen |
| Migration Mappe 1 | Claude Code (nach Cowork-Freigabe) | data.json-Aenderungen auf Basis aktualisierter Prompts |

### Implementierungsreihenfolge

0. **Cowork-Runde 0 (Architektur):** C0 — Material-Subagenten-Extraktion. ✅ ERLEDIGT
1. **Cowork-Runde 1:** C1 + C2 (Stundenfrage + Material-Titel). ✅ ERLEDIGT
2. **Cowork-Runde 2:** C3 + C4 + C5 (Referenzen + Bildunterschriften + Abschlussfrage). ✅ ERLEDIGT
3. **Audit:** Externer Audit C0-C5. ✅ ERLEDIGT (0 Blocker, 2 Sofort-Fixes, 3 False Positives)
4. **Cowork-Runde 3+4 (UI):** Uebergabe-Prompts → Claude Code:
   - U1-U4 (Infobox, Sticky, Hefteintrag, Quellen-Toggle). ✅ Commit d233b74
   - U5-U8 (Sticky=Stundenfrage, Mappenbezeichner, Beschreibung weg, Game-Titel weg). ✅ Commit 862af13
   - U9-U10 (Einstieg zentriert, Sticky-Transition smooth). ✅ Commit 5650157
   - C5 revidiert: Variante A Ueberleitung / Variante B Reflexion. ✅ AGENT_SKRIPT.md aktualisiert
5. **Migration Mappe 1:** Engine-Erweiterung (fd883dc) + C2-C5 auf data.json (2a192e5) + Bugfixes (9d184ee, c3ee2f3). ✅ ABGESCHLOSSEN — Browser verifiziert

### Verifikation

- [ ] C0: 7 SUB_MATERIAL_*.md existieren mit vollstaendiger Struktur (Rolle, Workflow, Qualitaetskriterien, Wortbudget, Tool-Chain, Rendering-Kontrakt, Beispiel)
- [ ] C0: AGENT_MATERIAL.md enthaelt Orchestrator-Logik mit Produktionskontext-Template, keine Materialtyp-Workflows mehr inline
- [ ] C0: WORKFLOW_v2.md Phase 2.1 reflektiert Subagenten-Dispatch
- [ ] C0: ORCHESTRATOR.md + AGENT_TECHNIK.md enthalten Material-Subagenten-Referenzen
- [ ] C0: Produktionskontext enthaelt skript_passage (Volltext fuer DT/TB/QT, Zusammenfassung fuer BQ/KA/ZL/ST)
- [ ] C0: W-8 (Tafelbild-Workflow) und TB-Qualitaetsspezifikation aus AGENT_MATERIAL.md entfernt
- [ ] C0: Quellenrecherche-Referenz-Workflow im Orchestrator erhalten, SUB_QT und SUB_ST referenzieren ihn
- [ ] C0: Engine-Typ-Mapping in jedem SUB_MATERIAL_* Rendering-Kontrakt explizit (karte→bildquelle, tagebuch→quellentext, statistik→zeitleiste/bildquelle)
- [x] U1: Infobox erstreckt sich ueber volle Breite (Material + Fragebogen), Stundenfrage mittig — ✅ d233b74
- [x] U2: Beim Scrollen bleibt Stundenfrage als duenner Header sichtbar — ✅ d233b74
- [x] U3: Sicherung heisst "Hefteintrag" — ✅ d233b74
- [x] U4: Quellenangaben nicht im Standard-SuS-View sichtbar, per Toggle abrufbar — ✅ d233b74
- [x] U5: Sticky-Header zeigt Stundenfrage (nicht Mappennamen), Fallback-Kette korrekt — ✅ 862af13
- [x] U6: Mappentitel zeigt "Mappe X: [Titel]" — ✅ 862af13
- [x] U7: Beschreibungszeile nicht sichtbar — ✅ 862af13
- [x] U8: Kein separater Game-Titel-H1, Mappe-Titel bleibt H1 — ✅ 862af13
- [x] U9: Einstieg-Block zentriert, max-width 800px, Problemstellung prominent — ✅ 5650157
- [x] U10: Sticky-Header smooth-Transition von Problemstellung, Observer auf `.einstieg__problemstellung` — ✅ 5650157
- [x] C1: Jede Mappe hat exakt eine Stundenfrage als Ueberschrift (Frageform, nicht Aussage) — bereits korrekt in data.json
- [x] C2: Material-Titel Typ A (Frage) fuer Erarbeitung, Typ B (Statement) fuer visuelle Anker — ✅ 2a192e5
- [x] C3: Inline-Material-Links `[[mat-id\|Text]]` + (M-Position) in Fragestamm/Tipps — Engine ✅ fd883dc, Migration ✅ 2a192e5
- [x] C4: Bildunterschriften sind didaktisch formuliert (beschreibend/anleitend), nicht quellenangabe-artig — ✅ 2a192e5
- [x] C5: Nicht-letzte Mappen: Ueberleitung (Variante A). Letzte Mappe: Reflexionsfrage (Variante B) — ✅ 2a192e5
- [x] Migration Mappe 1: Alle Aenderungen (U1-U10, C1-C5) in Browser verifiziert — ✅ Bugfixes 9d184ee + c3ee2f3
- [ ] Regression: Bestehende Aufgaben-Engine (Drag-and-Drop, Validierung) funktioniert unveraendert nach UI-Aenderungen

---

## Operationale Regeln (aus Audit)

### Rollback-Strategie
Jede Phase ist rueckwaertskompatibel designed: Neue Felder sind optional mit Fallback. Wenn eine Phase abgebrochen wird, laufen bestehende Mappen unveraendert weiter. Konkret:
- v3.2: Umlaute in data.json sind in beide Richtungen gueltig (UTF-8 oder ASCII)
- v3.3: Engine faellt auf Array-Index zurueck, wenn `position` fehlt
- v3.4: Loesungswort leitet sich ausschliesslich aus `freischalt_code` (Mappe-Ebene) ab. Kein `freischalt_buchstabe` auf Aufgaben-Ebene.
- v3.6: Materialien ohne `erklaerungen[]` oder `ki_prompts{}` rendern ohne Tooltip/Sidekick
- v3.7: Rein Cowork-/Prompt-Ebene, kein Engine-Code. Bestehende Mappen bleiben unveraendert. Subagenten-Architektur aendert nur den Generierungsprozess, nicht die Ausgabe. Zwischenartefakte sind optional — data.json ist weiterhin das fuehrende Format
- v3.8: UI-Aenderungen (U1-U10) sind rein visuell/layoutbezogen — bestehende data.json-Struktur bleibt kompatibel. Prompt-Aenderungen (C1-C5) betreffen nur Neugenierungen — bestehende Mappen rendern unveraendert. Sticky-Header (U2/U5/U10) degradiert graceful wenn CSS/JS nicht geladen. Quellenangaben-Toggle (U4) zeigt bei fehlendem JS alle Quellenangaben (sicherer Fallback). Mappenbezeichner (U6) faellt auf reinen Titel zurueck wenn kein Mappenindex ableitbar. Einstieg-Zentrierung (U9) ist rein CSS — kein JS-Dependency

### Migrationstest-Strategie
Mappe 1 (gpg-erster-weltkrieg-ursachen) dient als Pilot fuer jede Phase. Jede Phase wird zuerst an Mappe 1 validiert, bevor neue Mappen erstellt werden. Reihenfolge pro Phase:
1. Schema/Prompt-Aenderungen (Cowork-Domaene)
2. Uebergabe-Prompt fuer Engine/data.json (Claude Code)
3. Migration Mappe 1 als Testfall
4. Verifikation (Browser-Check, Q-Gate, Print-Test)
5. Erst danach: Neue Mappen mit neuer Infrastruktur

### Versionierung
Alle Phasen laufen auf `main` Branch (kein Feature-Branching). Grund: Einziger Entwickler, kein Parallelismus. Jede Phase = 1+ Commits mit klarem Prefix (`v3.2:`, `v3.3:` etc.). Cowork-Doku und Claude-Code-Implementation muessen im selben Commit-Zyklus synchronisiert sein (Uebergabe-Prompt → Implementierung → Rueckmeldung → Doku-Update).

### Q-Gate-Architektur
Jede Phase fuehrt eigene Q-Gate-Punkte ein. Zentrale Sammlung:
- G1-G14: Tafelbild (bestehend, GUETEKRITERIEN_TAFELBILD.md)
- SK1-SK15: Skript-Erstellung (neu, GUETEKRITERIEN_SKRIPT.md) — ergaenzt bestehende Q1-Q13 in AGENT_SKRIPT.md um fachdidaktische Dimension (Vergegenwärtigung, Elementarisierung, Gestaltungsprinzipien)
- S1-S15: Sequenzierung (bestehend, GUETEKRITERIEN_SEQUENZIERUNG.md)
- SQ-1 bis SQ-4: Sequenz-Kohaerenz (bestehend, pro Subagent)
- A1-A15: Aufgaben (erstellt, GUETEKRITERIEN_AUFGABEN.md) — AFB-Kongruenz, Operator-Praezision, kognitive Aktivierung, Besinnungsphasen. Ab v3.7: Makro-Ebene bei AGENT_RAETSEL (Orchestrator), typ-spezifische Praezisierung inline in SUB_AUFGABE_*.md
- A*-MC, A*-ZU, A*-LT, A*-RF, A*-FT: Typ-spezifische Guetekriterien (neu in v3.7, inline in SUB_AUFGABE_*.md) — praezisieren A1-A15 fuer den jeweiligen Fragetyp
- D1-D?: Differenzierung (neu in v3.6, AGENT_DIFFERENZIERUNG.md)
- MQ1-MQ5: Material-Qualitaet (neu in v3.8, inline in Material-Subagenten): MQ1 Stundenfrage-Konformitaet (1 Frage, Frageform), MQ2 Titel-als-Teilfrage (keine Nominalisierungen), MQ3 Dynamische Referenzen (mat-ID statt statischer Typbezeichnung), MQ4 Didaktische Bildunterschriften, MQ5 Abschlussfrage-Sandwich

Pro-Agent-Q-Gates werden in den jeweiligen AGENT_*.md definiert. Zentrale Guetekriterien-Dokumente (`docs/checklisten/GUETEKRITERIEN_*.md`) ergaenzen die agenten-internen Q-Gates um die fachdidaktische Makro-Ebene.

---

## Offene Entscheidungen (zu klaeren vor Umsetzung)

| # | Frage | Betrifft | Status |
|---|-------|----------|--------|
| E1 | Umlaut-Fix: Option A (UTF-8 nativ) oder Option B (Engine-Transliteration)? | v3.2 | **ENTSCHIEDEN: Option A** (UTF-8 nativ). Agenten schreiben echte Umlaute, Engine unveraendert. |
| E2 | Sequenzplanung als AGENT_MATERIAL Aufgabe 1.9 oder separater Micro-Agent? | v3.3 | **ENTSCHIEDEN: Aufgabe 1.9 in AGENT_MATERIAL.** Agent hat bereits Gesamtkontext. |
| E3 | DaZ Pilot-Sprachen | v3.6 | **ENTSCHIEDEN: Russisch (ru) + Arabisch (ar).** 2 Sprachen als Pilot. Sprachkuerzel: `aufgabenstellung_daz: {ru: "...", ar: "..."}` |
| E4 | KI-Sidekick: Copy-to-Clipboard vs. API-Integration | v3.6 | **ENTSCHIEDEN: Copy-to-Clipboard (MVP).** Kein Backend, DSGVO-freundlich. API-Integration als Post-MVP evaluieren. |
| E5 | Notizbuch-Stil Fragebogen: CSS-only oder SVG? | v3.4 | **ENTSCHIEDEN: CSS-only.** Muss sich visuell vom Hefteintrag/Sicherungs-CSS abheben: Erarbeitung/Teilsicherung und finale Sicherung muessen als aufeinander aufbauende, aber getrennte Phasen erkennbar sein. Eigenes Farbschema + Schriftart fuer Fragebogen (nicht Caveat/Patrick Hand). Prototyp in docs/analyse/ vor Engine-Implementierung. |
| E6 | User-Gate nach Phase 1 oder Phase 1.5? | v3.3 | **ENTSCHIEDEN: Phase 1.5.** Inhalt und Anordnung sind semantisch verschraenkt — gemeinsame Validierung. |
| E7 | Aufgaben-Subagenten (voll) oder inkrementelle Erweiterung in AGENT_RAETSEL? | v3.7 | **ENTSCHIEDEN: Volle Subagenten-Architektur.** Begruendung: (a) didaktische Praezision pro Fragetyp, (b) isolierte Optimierbarkeit, (c) iterative Erweiterbarkeit um neue Typen. |
| E8 | Zwischenartefakte als User-Gate oder als Nebenprodukt? | v3.7 | **ENTSCHIEDEN: Nebenprodukt.** .md-Dateien werden waehrend Generierung geschrieben, kein Workflow-Break. Primaerer Zweck: Wartbarkeit/Editierbarkeit, nicht User-Interaktion. Maschinenformat mit Lesbarkeitsvorteil. |

---

## Audit-Protokoll

**Datum:** 2026-03-28
**Auditor:** Externer Agent (Opus)
**Ergebnis:** 13 Findings (4 HIGH, 5 MEDIUM, 4 LOW)
**Status:** 4 HIGH eingearbeitet (H-01 bis H-04), 5 MEDIUM eingearbeitet (M-06 bis M-09, M-05 als Platzhalter fuer v3.4), 4 LOW eingearbeitet (L-10 bis L-13). Fehlende Szenarien (Rollback, Migrationstest, Versionierung, Q-Gate-Architektur) als neue Sektion ergaenzt.

| Finding | Severity | Status | Massnahme |
|---------|----------|--------|-----------|
| H-01 Phase 1.5 nicht in WORKFLOW | HIGH | Eingearbeitet | Vorbedingung v3.3: WORKFLOW aktualisieren |
| H-02 Subagenten-Kontext unspezifiziert | HIGH | Eingearbeitet | Template + Uebergabeformat + Q-Gate SQ-1 bis SQ-4 |
| H-03 Schema-Migration unklar | HIGH | Eingearbeitet | Optional mit Fallback, Rueckwaertskompatibilitaet |
| H-04 Abhaengigkeitsgraph unvollstaendig | HIGH | Eingearbeitet | v3.6 → v3.3 + v3.4 |
| M-05 GUETEKRITERIEN_AUFGABEN fehlt | MEDIUM | Notiert | Erstellen als erster Schritt in v3.4 |
| M-06 ORCHESTRATOR nicht updated | MEDIUM | Eingearbeitet | Vorbedingung v3.6 |
| M-07 Engine sort-Funktion | MEDIUM | Eingearbeitet | _sortMaterialienByPosition() spezifiziert |
| M-08 2/3-1/3 Layout-Zuordnung | MEDIUM | Eingearbeitet | Gehoert zu v3.4, CSS Grid, Prototyp vorher |
| M-09 KI-Sidekick Ziel-LLM | MEDIUM | Eingearbeitet | E4 mit Empfehlung Copy-to-Clipboard |
| L-10 Umlaut Option A/B | LOW | Notiert | E1 offen |
| L-11 DaZ Pilot-Sprachen | LOW | Notiert | E3 offen |
| L-12 SEQUENZPLAN Format | LOW | Eingearbeitet | Abschnitt in MATERIAL_GERUEST |
| L-13 aufgabenstellung_daz Feldort | LOW | Eingearbeitet | Pro aufgaben[]-Element |

### Audit v3.7 (2026-03-29)

**Datum:** 2026-03-29
**Auditor:** Externer Agent (begrenzter Kontextzugang)
**Ergebnis:** 12 Findings (4 HIGH, 5 MEDIUM, 3 LOW). Gesamtbewertung: PROCEED WITH CHANGES.
**Status:** Alle validen Findings eingearbeitet. Briefing: `docs/analyse/AUDIT_BRIEFING_v3-7_AUFGABEN_SUBAGENTEN.md`. Report: `docs/analyse/Audit report 3.7.md`.

| Finding | Severity | Valide? | Status | Massnahme |
|---------|----------|---------|--------|-----------|
| #1 GUETEKRITERIEN_AUFGABEN.md fehlt in Betroffene Artefakte | HIGH | Ja | Eingearbeitet | In Betroffene-Artefakte-Tabelle aufgenommen |
| #2 Operationalisierungsziel-Herleitung unterspezifiziert | HIGH | Ja | Eingearbeitet | Herleitungsmuster dokumentiert: AFB-Operator + TB-Knoten-Merksatz. Gegencheck-Schritt ergaenzt |
| #3 Material-Volltext Token-Risiko | HIGH | Teilweise | Eingearbeitet | Subagent: Volltext NUR fuer eigenes Ziel-Material. Orchestrator: Zusammenfassungen. Finding ueberschaetzt Token-Volumen (100-150 W/Material), aber Differenzierung Volltext vs. Zusammenfassung ist korrekt |
| #4 AGENT_RAETSEL.md Eingabe veraltet | HIGH | Ja | Eingearbeitet | Refactor-Scope in Betroffene Artefakte praezisiert: Eingabe, Freischalt-Code, Ausgabe |
| #5 Freischalt-Code "Einzelcodes" stale | MEDIUM | Ja | Eingearbeitet | Bereinigung in AGENT_RAETSEL.md-Refactor-Scope aufgenommen |
| #6 Q-Gate-Zuordnung A → Pruefinstanz fehlt | MEDIUM | Ja | Eingearbeitet | Vollstaendige Zuordnungstabelle A1-A15 → Orchestrator/Subagent in v3.7-Sektion. Ruecklauf-Mechanismus definiert |
| #7 FRAGEBOGEN-Format nur MC-Beispiel | MEDIUM | Teilweise | Eingearbeitet | "Deterministisch parsebar" korrigiert zu "strukturiert lesbar". .md ist Lese-/Wartungsformat, nicht fuehrendes Pipeline-Format. Typ-Beispiele werden in SUB_AUFGABE_*.md definiert (Teil der Subagenten-Erstellung) |
| #8 Konversionsmechanismus fehlt | MEDIUM | Ja | Eingearbeitet | Primaerer Output = JSON direkt. .md parallel als Backup. Konversion .md→JSON nur bei manueller Editierung, mit Validierung |
| #9 Sequenzinformation im Konstruktionskontext fehlt | MEDIUM | Ja | Eingearbeitet | material_position und didaktische_funktion in Konstruktionskontext-Template. Implizite v3.3-Abhaengigkeit dokumentiert |
| #10 Domaenenzuordnung | LOW | OK | — | Bestaetigung, kein Handlungsbedarf |
| #11 Erweiterungspfad | LOW | OK | — | Bestaetigung, kein Handlungsbedarf |
| #12 Verifikation Edge Cases | LOW | Ja | Eingearbeitet | 3 Edge-Case-Checks in Verifikations-Checkliste |

---

## Naechster Schritt

v3.2 (Umlaut-Fix) als erstes umsetzen — isoliert, kein Risiko, schneller Erfolg. Danach v3.3 (Sequenzierung) als Kernarbeit. Vor v3.3-Start: WORKFLOW_v2.md um Phase 1.5 ergaenzen (Vorbedingung H-01).
