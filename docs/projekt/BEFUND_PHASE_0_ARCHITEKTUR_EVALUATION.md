# BEFUND: Phase-0 Architektur-Evaluation

**Datum:** 2026-04-06
**Anlass:** User-Anfrage — Ist AGENT_DIDAKTIK architektonisch fuer Mappen-Aufteilung zustaendig? Wie beeinflusst die Phase-1-Uebergabe die Phase-0-Gestaltung?
**Methode:** Abgleich WORKFLOW_v4.md (kanonisch), ORCHESTRATOR.md, bestehende Vertraege, Phase-1/1.5/2.0-Input-Anforderungen
**Kontext:** W4-C abgeschlossen (AGENT_DIDAKTIK Testrun + Audit). Vor naechstem Schritt: architektonische Grundlage pruefen.

---

## 1. Kernfrage: Wer verantwortet die Mappen-Aufteilung?

### Befund: AGENT_DIDAKTIK — bestaetigt durch beide kanonischen Quellen.

**WORKFLOW_v4.md §5.1 (Schritt 0.1 Aufgabe 3):**
> "Mappen-Grobstruktur festlegen (Titel, thematischer Schwerpunkt pro Mappe)"

**ORCHESTRATOR.md [0.1] Ausgabe:**
> "KE-Matrix, Mappen-Grobstruktur, Schwierigkeitskurve, Leitlinien"

Beide Dokumente weisen die Mappen-Aufteilung explizit AGENT_DIDAKTIK zu. Die Zuordnung ist architektonisch korrekt, weil alle nachfolgenden Agenten die Mappen-Struktur als gegebenen Input behandeln:

| Agent | Beziehung zur Mappen-Struktur |
|---|---|
| AGENT_INHALT (0.2a) | Recherchiert *pro Mappe* gemaess DIDAKTIK_RAHMEN |
| AGENT_ARTEFAKT (0.2b) | Sichtet Artefakte *pro Mappe* gemaess DIDAKTIK_RAHMEN |
| AGENT_SKRIPT (0.3) | Chunking *entlang* Mappen-Grobstruktur |
| AGENT_HEFTEINTRAG (0.4) | Synthese *pro Mappe* |
| AGENT_MATERIAL (Phase 1) | Erhaelt SKRIPT + TAFELBILD *pro Mappe* |

Die Mappen-Aufteilung ist der frueheste strukturgebende Akt der gesamten Pipeline. Jeder Downstream-Agent haengt davon ab. Die Zuweisung an den ersten Agenten (DIDAKTIK) ist die einzig konsistente Loesung.

---

## 2. Phase-0-Agenten-Kette: Soll vs. Ist

### 2.1 Kanonische Kette (WORKFLOW_v4.md)

```
0.1  AGENT_DIDAKTIK    → DIDAKTIK_RAHMEN
0.2a AGENT_INHALT      → INHALTSBASIS
0.2b AGENT_ARTEFAKT    → ARTEFAKT_INVENTAR
0.3  AGENT_SKRIPT      → SKRIPT
0.4  AGENT_HEFTEINTRAG  → TAFELBILD (pro Mappe)
```

5 Agenten, 5 Artefakte, strikt sequentiell.

### 2.2 ORCHESTRATOR.md-Kette

```
[0.1] AGENT_DIDAKTIK   → DIDAKTIK_RAHMEN
[0.2] AGENT_INHALT     → INHALTSBASIS (inkl. "Bilder pro Mappe")
[0.3] AGENT_SKRIPT     → SKRIPT
[0.4] AGENT_HEFTEINTRAG → TAFELBILD
```

4 Agenten — AGENT_ARTEFAKT fehlt als separater Schritt. ORCHESTRATOR subsumiert Artefakt-Sichtung unter AGENT_INHALT.

### 2.3 Vertragslage (Phase IV W4-A)

| Schritt | Vertrag vorhanden? | Status |
|---|---|---|
| 0.1 DIDAKTIK | Ja: `VERTRAG_PHASE_0-1_DIDAKTIK.md` | Q-Gate QD1-QD8. Agent v2.0 geschrieben + Testrun + Audit. |
| 0.2a INHALT | Ja: `VERTRAG_PHASE_0-2_INHALT.md` | Q-Gate QI1-QI6. AGENT_ARTEFAKT explizit eingemergelt. |
| 0.2b ARTEFAKT | **NEIN** (eingemergelt in 0.2) | Architektur-Inkonsistenz — siehe Finding F-A1. |
| 0.3 SKRIPT | Ja: `VERTRAG_PHASE_0-3_SKRIPT.md` | 3-stufiges Q-Gate (Q1-Q13 + SK1-SK17 + QS1-QS6). |
| 0.4 HEFTEINTRAG | **NEIN** | Vertrag fehlt. Guetekriterien G1-G14 existieren separat. |

### 2.4 Inkonsistenz AGENT_ARTEFAKT: Drei Positionen

| Quelle | Position zu AGENT_ARTEFAKT |
|---|---|
| WORKFLOW_v4.md | Separater Schritt 0.2b. Eigene Tools (MediaWiki API). Eigener Output (ARTEFAKT_INVENTAR). |
| ORCHESTRATOR.md | Subsumiert unter [0.2] AGENT_INHALT. Kein separater Schritt. |
| VERTRAG_PHASE_0-2_INHALT | Explizit eingemergelt: "Artefakt-Sichtung ist integraler Bestandteil dieser Phase. Kein separater Dispatch." |

**Aufloesung:** ORCHESTRATOR.md sagt selbst: "bei Widerspruechen gilt WORKFLOW_v4.md." Also ist WORKFLOW_v4.md kanonisch → AGENT_ARTEFAKT ist ein separater Schritt.

**Aber:** Die Frage ist nicht nur formalistisch. Es gibt einen sachlichen Grund fuer die Zusammenlegung: AGENT_INHALT recherchiert Wikipedia-Artikel und findet dabei zwangslaeufig Bilder/Karten/Artefakte. Die Artefakt-Sichtung ist kein voellig getrennter Vorgang — sie passiert waehrend der Recherche.

**Empfehlung (Finding F-A1 unten):** Architektur-Entscheidung treffen und konsistent durchziehen.

---

## 3. Rueckwaerts-Kontingenz: Phase-1-Anforderungen → Phase-0-Design

### 3.1 Was braucht Phase 1?

**AGENT_MATERIAL (Phase 1) Eingabe** (WORKFLOW_v4.md §6):
> "Validiertes SKRIPT (gechunkt, mit Artefakt-Zuordnungen) + TAFELBILD pro Mappe (STRUKTUR-FREEZE)"

Das bedeutet Phase 0 muss *zwingend* liefern:

| Anforderung | Erzeugt in | Abhaengig von |
|---|---|---|
| Gechunktes SKRIPT | 0.3 AGENT_SKRIPT | Mappen-Grobstruktur (0.1) + INHALTSBASIS (0.2a) + ARTEFAKT_INVENTAR (0.2b) |
| Artefakt-Zuordnungen im SKRIPT | 0.3 AGENT_SKRIPT | ARTEFAKT_INVENTAR (0.2b) — Marker-Format: `[ARTEFAKT: id \| Typ \| Beschreibung]` |
| TAFELBILD pro Mappe mit STRUKTUR-FREEZE | 0.4 AGENT_HEFTEINTRAG | Validiertes SKRIPT (0.3) + DIDAKTIK_RAHMEN (0.1) + ARTEFAKT_INVENTAR (0.2b) |
| User-Validierung SKRIPT | Zwischen 0.3 und 0.4 | PFLICHT laut WORKFLOW_v4.md |

### 3.2 STRUKTUR-FREEZE: Kritischer Uebergabe-Vertrag

Ab Phase 0.4 sind folgende Elemente eingefroren (unveraenderlich bis Game-Ende):

- SCPL-Zonen (Anzahl, Reihenfolge, Typ)
- Kernerkenntnisse / scpl.loesung[]
- Fachbegriffe
- Ordnungsmuster
- Stundenfrage

**Formulierungsoffen** (bis Phase 2.1c Achse 6):
- situation.kontextsatz
- complication[].schritt
- problem.satz

Das heisst: Phase 0 muss ein TAFELBILD produzieren, das *strukturell vollstaendig* ist. Die gesamte Phase-2-Materialproduktion arbeitet auf dieses Ziel hin (P3: "Sicherung steuert vom Ende her"). Jedes Defizit im TAFELBILD propagiert sich als STRUKTUR-FREEZE-Verletzung durch die gesamte Produktion.

### 3.3 Phase 1.5 Sequenzplanung: Zusaetzliche Rueckwirkung

**Phase 1.5 Eingabe:** Blueprint (Phase 1) + TAFELBILD + SKRIPT

Phase 1.5 ordnet Materialien in didaktische Reihenfolge und generiert:
- position, didaktische_funktion, voraussetzung pro Material
- Ueberleitungen zwischen Materialien
- Sequenzkontext-Objekte fuer Subagenten

**Rueckwirkung auf Phase 0:** Das SKRIPT muss so gechunkt sein, dass die Inhalte *sequenzierbar* sind — d.h. jeder Chunk muss thematisch abgeschlossene Einheiten enthalten, die in verschiedene Reihenfolgen gebracht werden koennen. Ein Chunk, der chronologisch und thematisch verschraenkt ist, blockiert die Sequenzplanung.

**Implikation fuer AGENT_DIDAKTIK:** Die Mappen-Aufteilung muss Mappen erzeugen, deren Inhalte *intern* sequenzierbar sind. Das ist bereits durch Heuristik H2 ("Ein Leitkonzept pro Mappe") adressiert, aber nicht explizit als Phase-1.5-Kompatibilitaetskriterium formuliert.

### 3.4 Phase 2.0 Rahmen-Produktion: Weitere Rueckwirkung

Phase 2.0 liest TAFELBILD (STRUKTUR-FREEZE) und erzeugt daraus:
- hefteintrag.json (1:1 Uebernahme)
- einstieg.json (aus MATERIAL_GERUEST Einstieg-Sektion)
- sicherung.json (aus MATERIAL_GERUEST Sicherung-Sektion)
- meta.json

**Rueckwirkung auf Phase 0.4:** AGENT_HEFTEINTRAG muss ein TAFELBILD produzieren, das 1:1 als hefteintrag.json uebernehmbar ist. Das Format ist bereits durch SCPL-Struktur + Guetekriterien G1-G14 definiert — aber es gibt keinen Vertrag, der das explizit als Phase-2.0-kompatiblen Output fordert.

---

## 4. Findings

| # | Finding | Typ | Severity | Betroffene Komponente |
|---|---|---|---|---|
| F-A1 | AGENT_ARTEFAKT: Drei kanonische Quellen widersprechen sich (WORKFLOW_v4 = separat, ORCHESTRATOR + Vertrag = integriert). Architektur-Entscheidung fehlt. | Inkonsistenz | **HIGH** | WORKFLOW_v4, ORCHESTRATOR, VERTRAG_PHASE_0-2_INHALT |
| F-A2 | VERTRAG AGENT_HEFTEINTRAG (0.4) fehlt. AGENT_HEFTEINTRAG ist der STRUKTUR-FREEZE-Garant — das kritischste Artefakt fuer die Phase-0→1-Uebergabe hat keinen formalen Vertrag. Guetekriterien G1-G14 existieren, aber kein Input/Output/Q-Gate-Vertrag im Format der anderen 3 Vertraege. | Fehlender Vertrag | **HIGH** | Vertragslage Phase 0 |
| F-A3 | Phase-1.5-Sequenzierbarkeit nicht als Qualitaetskriterium in AGENT_DIDAKTIK oder AGENT_SKRIPT verankert. AGENT_DIDAKTIK H2 ("Ein Leitkonzept") adressiert dies implizit, AGENT_SKRIPT hat kein Kriterium "intern sequenzierbare Chunks". | Implizite Annahme | MEDIUM | AGENT_DIDAKTIK H2, AGENT_SKRIPT Q-Gate |
| F-A4 | Phase-2.0-Kompatibilitaet des TAFELBILD-Formats nicht explizit als Vertragsbedingung in AGENT_HEFTEINTRAG. 1:1-Uebernahme als hefteintrag.json wird vorausgesetzt, aber nicht vertraglich gefordert. | Implizite Annahme | MEDIUM | AGENT_HEFTEINTRAG (fehlender Vertrag) |
| F-A5 | Agenten-Prompt AGENT_INHALT, AGENT_ARTEFAKT, AGENT_HEFTEINTRAG: Prompt-Dateien nicht auf v2-Niveau. AGENT_DIDAKTIK wurde in W4-C auf v2.0 gehoben (8 Aufgaben, 7 Heuristiken, Q-Gate Self-Check). Die uebrigen Phase-0-Agenten sind noch auf Sketch-Niveau oder nicht vorhanden. | Reifegefaelle | MEDIUM | Agent-Prompts Phase 0 |
| F-A6 | User-Validierung SKRIPT (zwischen 0.3 und 0.4) ist PFLICHT laut WORKFLOW_v4 und ORCHESTRATOR — aber kein Vertrag definiert Validierungskriterien oder Pruefformat. | Fehlende Spezifikation | LOW | Validierungsprozess |

---

## 5. Gesamtbewertung Phase-0 Reife

| Dimension | Status | Bewertung |
|---|---|---|
| Architektonische Zuordnung (Wer macht was?) | Mappen-Aufteilung korrekt bei DIDAKTIK. Alle Downstream-Abhaengigkeiten konsistent. | OK |
| Vertraege | 3 von 4-5 noetig. HEFTEINTRAG fehlt (HIGH). ARTEFAKT unklar (HIGH). | LUECKENHAFT |
| Agent-Prompts (Ausfuehrungsreife) | Nur DIDAKTIK auf v2-Niveau. Rest: Sketch oder undefiniert. | UNREIF |
| Phase-0→1-Uebergabe | Inhaltlich klar (SKRIPT + TAFELBILD). Formal nicht vertraglich abgesichert (STRUKTUR-FREEZE-Kompatibilitaet, Sequenzierbarkeit). | IMPLIZIT |
| Rueckwaerts-Kontingenz | Phase-1/1.5/2.0-Anforderungen beeinflussen Phase-0-Design, aber diese Abhaengigkeiten sind nicht als Qualitaetskriterien in Phase-0-Vertraegen/Prompts kodiert. | NICHT KODIERT |

---

## 6. Empfohlene Massnahmen (priorisiert)

| # | Massnahme | Adressiert | Priority | Aufwand |
|---|---|---|---|---|
| M-A1 | Architektur-Entscheidung AGENT_ARTEFAKT: Separat (WORKFLOW_v4) ODER integriert (ORCHESTRATOR/Vertrag). Entscheidung dokumentieren, dann ALLE drei Quellen konsistent machen. | F-A1 | **HIGH** | S (Entscheidung) + M (3 Dokumente anpassen) |
| M-A2 | VERTRAG_PHASE_0-4_HEFTEINTRAG schreiben. Muss enthalten: Input-Spezifikation (validiertes SKRIPT + DIDAKTIK_RAHMEN + ARTEFAKT_INVENTAR), Output-Format (SCPL-JSON + Hefteintrag), Q-Gate (G1-G14), STRUKTUR-FREEZE-Definition, Phase-2.0-Kompatibilitaetsklausel. | F-A2, F-A4 | **HIGH** | M |
| M-A3 | QD-Kriterium in AGENT_DIDAKTIK ergaenzen: "Jede Mappe muss intern sequenzierbare Inhalte haben (kein chronologisch-thematisches Verschraenkungsproblem)." | F-A3 | MEDIUM | S |
| M-A4 | AGENT_INHALT Prompt auf v2.0 heben (analog zu AGENT_DIDAKTIK). | F-A5 | MEDIUM | M |
| M-A5 | AGENT_SKRIPT Prompt auf v2.0 heben. Q-Gate-Kriterium "Sequenzierbarkeit der Chunks" ergaenzen. | F-A5, F-A3 | MEDIUM | M |
| M-A6 | AGENT_HEFTEINTRAG Prompt schreiben (existiert noch nicht als Datei). | F-A5 | MEDIUM | M |
| M-A7 | User-Validierungsformat fuer SKRIPT definieren (Checkliste oder Pruefmatrix). | F-A6 | LOW | S |

---

## 7. Architektur-Entscheidung AGENT_ARTEFAKT: Entscheidungsgrundlage

### Option A: Separat (WORKFLOW_v4.md-konform)

**Pro:**
- WORKFLOW_v4 ist kanonisch ("bei Widerspruechen gilt WORKFLOW_v4.md")
- AGENT_ARTEFAKT hat andere Tools (MediaWiki API vs. Wikipedia MCP)
- Klare Trennung: Faktische Recherche (INHALT) vs. Medien-Qualifizierung (ARTEFAKT)
- ARTEFAKT_INVENTAR als eigenstaendiges Artefakt erleichtert AGENT_SKRIPT-Input

**Contra:**
- Zusaetzlicher Dispatch, zusaetzlicher Vertrag, zusaetzlicher Agent-Prompt
- In der Praxis passiert Artefakt-Sichtung waehrend der Recherche (Wikimedia-Bilder fallen beim Lesen der Artikel an)
- Game-1 hat keine getrennte Artefakt-Phase gehabt und funktioniert trotzdem

### Option B: Integriert (ORCHESTRATOR/Vertrag-konform)

**Pro:**
- Pragmatischer: Artefakte werden waehrend der Recherche gefunden, nicht in separatem Pass
- Weniger Dispatches, weniger Overhead
- Game-1-Praxis bestaetigt Machbarkeit
- ORCHESTRATOR und bestehender Vertrag sind bereits auf dieser Linie

**Contra:**
- Widerspricht der kanonischen WORKFLOW_v4.md
- Tool-Diskrepanz: Wikipedia MCP kann keine Wikimedia-Metadaten (Lizenz, Thumbnail-URL) liefern — dafuer braucht man MediaWiki API
- Kombinierter Agent hat groesseren Scope = hoeheres Fehlerrisiko

### Empfehlung

**Option B mit Praezisierung.** AGENT_INHALT integriert die Artefakt-Sichtung, ABER:
1. Der Vertrag definiert die Artefakt-Sichtung als explizite Teilaufgabe mit eigenem Mindest-Output (bereits im bestehenden VERTRAG_PHASE_0-2_INHALT enthalten)
2. WORKFLOW_v4.md wird angepasst: Schritt 0.2a+0.2b → Schritt 0.2 (zusammengelegt), mit Vermerk auf die Tool-Anforderung (Wikipedia MCP + wikimedia_search_images)
3. ORCHESTRATOR.md bleibt wie ist (bereits konsistent mit Option B)

**Begruendung:** Die Trennung in WORKFLOW_v4.md war eine Architektur-Entscheidung auf Basis von v3, wo Claude Code die Recherche machte und MediaWiki API direkt nutzen konnte. In der v4-Realitaet (Cowork-basiert, MCP-gestuetzt) ist die Trennung nicht mehr durch unterschiedliche Ausfuehrungsorte motiviert. Die Integration ist die pragmatischere Loesung, solange die Artefakt-Qualitaet vertraglich abgesichert ist.

**User-Entscheidung erforderlich.**
