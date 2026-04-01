# AUDIT v4: Produktionsreife der Mappenproduktion — Ergebnis

**Datum:** 2026-03-31
**Auditor:** Claude (Audit-Agent, nicht Produktions-Agent)
**Briefing:** `docs/analyse/AUDIT_BRIEFING_v4_PRODUKTIONSREIFE.md`
**Gepruefte Dokumente:** WORKFLOW_v4.md, ORCHESTRATOR.md, AGENT_MATERIAL.md, AGENT_RAETSEL.md, SUB_MATERIAL_DARSTELLUNGSTEXT.md, SUB_AUFGABE_FREITEXT.md, QUALITAETSKRITERIEN_MATERIALPRODUKTION.md, GUETEKRITERIEN_AUFGABEN.md, STATUS.md, escape-engine.js (Stichproben), Goldstandard data.json

---

## Zusammenfassung

| Pruefachse | Ergebnis | Findings |
|---|---|---|
| A1 Dispatch-Vollstaendigkeit | PASS mit 2 MEDIUM | 15/15 Dispatches dokumentiert, 2 Luecken in Vertraegen |
| A2 Agent-Prompt-Konsistenz | PASS mit 2 MEDIUM | Kanonische Referenz korrekt gesetzt, 2 Legacy-Inkonsistenzen |
| A3 Datenfluss-Luecken | PASS mit 1 HIGH | 1 Phantom-Feld, sonst lueckenlos |
| A4 Mehrdeutigkeiten | PASS mit 1 HIGH, 1 MEDIUM | 2 Entscheidungsluecken identifiziert |
| A5 Q-Gate-Operationalisierung | PASS mit 1 MEDIUM | Ruecklauf-Mechanismus konsistent, 1 Operationalisierungsluecke |
| A6 Compaction-Resilienz | PASS | P1 korrekt durchgesetzt in allen Dispatches |
| A7 Engine-Kompatibilitaet | PASS mit 1 HIGH, 1 MEDIUM | Freitext-Keyword-Validation, quellenangaben-Phantom |

**Gesamt: 0 BLOCKER, 3 HIGH, 6 MEDIUM, 0 LOW.**

Produktionsbereit — die 3 HIGH-Findings blockieren nicht die Produktion, erfordern aber bewusste Handhabung in Runde 3a.

---

## A1: Dispatch-Vollstaendigkeit

### Methode

Alle 15 Dispatches aus WORKFLOW_v4.md Sektion 3 enumeriert. Pro Dispatch geprueft: Read-Schritte dokumentiert? Output-Kontrakt eindeutig? Implizite Voraussetzungen?

### Dispatch-Inventar

| # | Dispatch | Phase | Read-Schritte | Output | Ergebnis |
|---|---|---|---|---|---|
| 1 | Rahmen-Produktion | 2.0 | 6 (Tabelle + Ablauf) | 4 .json (meta, einstieg, sicherung, tafelbild) | PASS |
| 2 | mat-N-1 | 2.1 | 8 (davon 2 konditional) | mat-N-1.json | PASS |
| 3 | mat-N-2 | 2.1 | 8 | mat-N-2.json | PASS |
| 4 | mat-N-3 | 2.1 | 8 | mat-N-3.json | PASS |
| 5 | mat-N-4 | 2.1 | 8 | mat-N-4.json | PASS |
| 6 | mat-N-5 | 2.1 | 8 | mat-N-5.json | PASS |
| 7 | mat-N-6 | 2.1 | 8 | mat-N-6.json | PASS |
| 8 | Material-Cross-Konsistenz | 2.1c | 3 (alle mat-*.json + tafelbild + GERUEST) | Q-GATE-LOG.md Eintrag | PASS |
| 9 | Progressionsplan | 2.2a | 5 | PROGRESSIONSPLAN.md | PASS |
| 10 | aufgabe-N-1 | 2.2b | 4 | aufgabe-N-1.json | PASS |
| 11 | aufgabe-N-2 | 2.2b | 4 | aufgabe-N-2.json | PASS |
| 12 | aufgabe-N-3 | 2.2b | 4 | aufgabe-N-3.json | PASS |
| 13 | aufgabe-N-4 | 2.2b | 4 | aufgabe-N-4.json | PASS |
| 14 | aufgabe-N-5 | 2.2b | 4 | aufgabe-N-5.json | PASS |
| 15 | Aufgaben-Cross-Konsistenz | 2.2c | 3 | Q-GATE-LOG.md Eintrag | PASS |

### Findings

**F-A1-1 [MEDIUM]: Rahmen-Dispatch (Phase 2.0) — sicherung.json Feld `zitat` ohne Produktionsanweisung.**
WORKFLOW_v4.md Zeile 460 listet `zitat` als Feld in sicherung.json: `typ, zusammenfassung, ueberleitung, reflexionsimpuls, kernerkenntnisse[], hefteintrag_verweis, zitat`. Die Goldstandard data.json (Mappe 2) enthaelt tatsaechlich ein `zitat`-Objekt. Aber der Dispatch-Ablauf Phase 2.0 (Zeile 489-502) definiert keinen Read-Schritt und keine Produktionsanweisung fuer das `zitat`-Feld. Ein Agent wuesste nicht, woher der Zitat-Inhalt kommt.
*Korrekturvorschlag:* Im Phase-2.0-Dispatch-Ablauf nach Schritt 6 ergaenzen: "7b. NUR WENN SKRIPT-Chunk oder INHALTSBASIS ein historisches Schlusszitat enthaelt: sicherung.zitat-Objekt {text, urheber, kontext} befuellen. Quelle: SKRIPT oder INHALTSBASIS."

**F-A1-2 [MEDIUM]: Aufgaben-Dispatch (Phase 2.2b) — Read-Schritt 3 Quelle mehrdeutig.**
WORKFLOW_v4.md Zeile 664: `materialien/mat-N-*.json (andere): NUR titel + didaktische_funktion (aus MATERIAL_GERUEST)`. Die Klammer "(aus MATERIAL_GERUEST)" ist syntaktisch mehrdeutig: Soll der Agent die materialien/*.json lesen und NUR titel + didaktische_funktion extrahieren? Oder soll er das MATERIAL_GERUEST lesen statt der .json-Dateien? AGENT_RAETSEL.md Zeile 51 klaert: "MATERIAL_GERUEST (andere mat-IDs): NUR titel + didaktische_funktion" — also MATERIAL_GERUEST lesen, nicht die .json-Dateien.
*Korrekturvorschlag:* WORKFLOW_v4.md Zeile 664 aendern zu: `MATERIAL_GERUEST (andere mat-IDs) | NUR titel + didaktische_funktion | materialien/*.json inhalt NICHT lesen`

---

## A2: Agent-Prompt-Konsistenz

### Methode

Schnittstellen-Vertraege in WORKFLOW_v4.md gegen die entsprechenden Tabellen in ORCHESTRATOR.md, AGENT_MATERIAL.md, AGENT_RAETSEL.md abgeglichen. Stichprobe bei SUB_MATERIAL_DARSTELLUNGSTEXT.md und SUB_AUFGABE_FREITEXT.md.

### Ergebnis

Alle vier Tier-1-Dokumente referenzieren WORKFLOW_v4.md als kanonische Quelle (`docs/architektur/WORKFLOW_v4.md`). Die Schnittstellen-Vertraege in den Agent-Prompts sind identisch oder konsistent enger als in WORKFLOW_v4.md. Ausfuehrungsorte sind konsistent: Phase 2 = Cowork ueberall.

### Findings

**F-A2-1 [MEDIUM]: AGENT_MATERIAL.md — Legacy-Output-Format `material-mappe-N.json`.**
AGENT_MATERIAL.md Abschnitt 2.4 (Zeile 388): "Alle Teile als `material-mappe-[N].json` ausgeben." Und Zeile 71: "Assembly [...] material-mappe-N.json schreiben". Das ist der v3-Monolith-Output. v4 produziert einzelne .json pro Material (P4). AGENT_MATERIAL Abschnitt 2.1 (Zeile 260-267) beschreibt korrekt den v4-Output. Abschnitt 2.4 und das Output-JSON-Beispiel (Zeilen 393-426) gehoeren zum v3-Modus und koennten einen Agenten verwirren, der beides liest.
*Korrekturvorschlag:* Abschnitt 2.4 mit Hinweis versehen: "v3-Legacy-Format. In v4 wird dieses Gesamtformat NICHT mehr produziert — jedes Material wird als einzelne .json-Datei geschrieben (Phase 2.1, P4). Dieses Schema dient nur als Referenz fuer die Assembly-Phase 3."

**F-A2-2 [MEDIUM]: AGENT_MATERIAL.md — quellenangaben[]-Array auf Mappe-Ebene definiert, Engine ignoriert es.**
AGENT_MATERIAL.md Zeile 331-345 definiert ein `quellenangaben[]`-Array auf Mappe-Ebene mit Fussnoten-Semantik. Zeile 345: "Engine rendert Fussnoten-Section automatisch am Mappe-Ende." Die Engine tut das nicht — `quellenangaben` kommt in escape-engine.js nicht vor (bestaetigt durch Grep). Der Goldstandard hat kein `quellenangaben`-Array. WORKFLOW_v4.md Zeile 569 sagt: "Quellenangaben: Als `<cite>`-Elemente in Material-HTML einbetten (L6). Kein separates Array." — Das ist der korrekte Workaround. AGENT_MATERIAL beschreibt also etwas, das (a) die Engine nicht unterstuetzt und (b) dem Workflow widerspricht. Dieses Finding steht im Briefing Sektion 4 als bekannte Einschraenkung (`quellenangaben[] hat keinen Engine-Support`), aber die Formulierung in AGENT_MATERIAL suggeriert aktiv funktionierendes Engine-Rendering — das ist irrefuehrend fuer den Produktions-Agenten.
*Korrekturvorschlag:* AGENT_MATERIAL.md Zeile 345 aendern: "HINWEIS: `quellenangaben[]`-Array wird von der Engine aktuell NICHT gerendert. Quellenangaben stattdessen als `<cite>`-Elemente im Material-`inhalt`-HTML einbetten (L6, WORKFLOW_v4.md Zeile 569). Das quellenangaben[]-Array hier ist fuer Post-MVP-Engine-Erweiterung vorgesehen." Und das Output-JSON-Beispiel (Zeile 414) mit Kommentar versehen.

---

## A3: Datenfluss-Luecken

### Methode

Datenfluss von Phase 0 bis Phase 2.2c verfolgt. Fuer jedes Artefakt: Wer produziert es? Wer liest es? Dateipfade konsistent?

### Datenfluss-Matrix (Kernpfade)

| Artefakt | Produziert von | Gelesen von | Pfad konsistent? |
|---|---|---|---|
| DIDAKTIK_RAHMEN | Phase 0.1 | Phase 2.2a (AGENT_RAETSEL: AFB-Profil) | Ja |
| SKRIPT | Phase 0.3 | Phase 2.1 (Material-Dispatch, Schritt 4) | Ja |
| INHALTSBASIS | Phase 0.2 | Phase 2.1 (Material-Dispatch, Schritt 5) | Ja |
| ARTEFAKT_INVENTAR | Phase 0.2b | Phase 2.1 (Material-Dispatch, Schritt 7, konditional) | Ja |
| TAFELBILD_Mappe | Phase 0.4 | Phase 2.0 (Rahmen, Schritt 1) | Ja |
| MATERIAL_GERUEST | Phase 1/1.5 | Phase 2.0-2.2c (mehrfach) | Ja |
| rahmen/tafelbild.json | Phase 2.0 | Phase 2.1 (Schritt 2), 2.1c, 2.2a (Schritt 4), 2.2c | Ja |
| rahmen/einstieg.json | Phase 2.0 | Phase 2.1 (Schritt 6) | Ja |
| rahmen/sicherung.json | Phase 2.0 | Phase 2.1 (Schritt 8, konditional) | Ja |
| materialien/mat-N-*.json | Phase 2.1 | Phase 2.1c, 2.2a, 2.2b, 2.2c | Ja |
| PROGRESSIONSPLAN.md | Phase 2.2a | Phase 2.2b (Schritt 1) | Ja |
| aufgaben/aufgabe-N-*.json | Phase 2.2b | Phase 2.2c | Ja |

Kein Artefakt wird gelesen, das von keinem vorherigen Schritt produziert wird. Kein toter Output (jedes produzierte Artefakt wird von mindestens einem Folgeschritt oder Phase 3 gelesen). Dateipfade verwenden konsistent `docs/agents/artefakte/produktion/{game-id}/mappe-{N}/`.

### Findings

**F-A3-1 [HIGH]: AGENT_MATERIAL.md — `quellenangaben[]` in Output-Schema, keine Phase-3-Assembly-Anweisung.**
AGENT_MATERIAL.md definiert `quellenangaben[]` als Output-Feld im Material-Output-JSON (Zeile 414). Phase 3 Assembly (WORKFLOW_v4.md Zeile 824-838) liest `materialien/*.json` und `aufgaben/*.json` — es gibt keine Assembly-Anweisung fuer ein separates quellenangaben[]-Array. Gleichzeitig hat die Engine keinen quellenangaben-Renderer. Wenn ein Produktions-Agent das Feld gemaess AGENT_MATERIAL produziert, landet es als totes Feld in der data.json.
*Auswirkung:* Kein Datenverlust (Quellenangaben sollen als `<cite>` im inhalt-HTML stehen, L6). Aber wenn der Agent AGENT_MATERIAL woertlich nimmt und Quellenangaben NUR ins Array schreibt (statt ins HTML), fehlen sie in der gerenderten Mappe.
*Korrekturvorschlag:* (Identisch mit F-A2-2.) Zusaetzlich: Im einzelnen Material-Output-JSON (SUB_MATERIAL_DARSTELLUNGSTEXT.md Zeile 134) steht korrekt `<cite>` im `inhalt`-HTML. Der Widerspruch liegt zwischen Orchestrator-Ebene (quellenangaben[]) und Subagenten-Ebene (<cite>). Da der Subagent produziert, nicht der Orchestrator, ist das Risiko gering — aber die Dokumentation sollte konsistent sein.

---

## A4: Mehrdeutigkeiten und Entscheidungsluecken

### Methode

Systematische Suche nach Stellen, an denen ein Agent eine Entscheidung treffen muss, die nicht durch die Dokumentation bestimmt ist. Besonderer Fokus auf konditionale Reads (Schritte 7+8 in Phase 2.1).

### Findings

**F-A4-1 [HIGH]: Phase 2.0 — M3b-Constraint: `tafelbild.loesung.saetze[]` Pfad existiert nicht im SCPL-Schema.**
WORKFLOW_v4.md Zeile 497: "sicherung.kernerkenntnisse[] := tafelbild.loesung.saetze[] (M3b-Constraint)". Der Pfad `loesung.saetze[]` referenziert das SCPL-Schema. In AGENT_TAFELBILD.md (Zeile 359, AGENT_MATERIAL.md) lautet das Schema: `scpl.loesung: ["Merksatz 1", "Merksatz 2"]` — also `scpl.loesung[]`, NICHT `loesung.saetze[]`. In der Goldstandard data.json gibt es kein `loesung.saetze`-Feld. Der Goldstandard hat: `sicherung.tafelbild.scpl.loesung[]` (Array of Strings) und `sicherung.kernerkenntnisse[]` (separates Array auf Sicherungs-Ebene).
Ein Agent, der `tafelbild.loesung.saetze[]` sucht, findet nichts und wuesste nicht, woher die Kernerkenntnisse kommen.
*Korrekturvorschlag:* WORKFLOW_v4.md Zeile 497 aendern zu: `sicherung.kernerkenntnisse[] := rahmen/tafelbild.json → scpl.loesung[] (M3b-Constraint)`. Zeile 485 (Read-Schritt 4) anpassen: "rahmen/tafelbild.json (gerade geschrieben) | scpl.loesung[] (= Merksaetze) | → sicherung.kernerkenntnisse[] (Constraint M3b)".

**F-A4-2 [MEDIUM]: Phase 2.1 — Konditionale Reads: `didaktische_funktion` Wert-Raum nicht abschliessend definiert.**
Read-Schritt 8 (WORKFLOW_v4.md Zeile 536): "NUR WENN didaktische_funktion = sicherung oder transfer (letztes Material)". Die moeglichen Werte fuer `didaktische_funktion` werden in AGENT_MATERIAL Aufgabe 1.9 (Zeile 226-230) definiert: einstieg, erarbeitung, vertiefung, sicherung, transfer. Die Bedingung in Schritt 8 ist klar. Aber: Was wenn ein Material `vertiefung` als Funktion hat und trotzdem das letzte in der Sequenz ist? Der Klammerzusatz "(letztes Material)" suggeriert, dass die Position entscheidend ist, nicht der Funktionswert. Wenn Position und Funktionswert divergieren, weiss der Agent nicht, welches Kriterium gilt.
*Korrekturvorschlag:* Klarstellung: "NUR WENN didaktische_funktion = `sicherung` ODER `transfer`. Hinweis: Das letzte Material einer Sequenz SOLL eine dieser Funktionen haben (AGENT_MATERIAL Aufgabe 1.9). Falls das letzte Material eine andere Funktion hat, entfaellt Read-Schritt 8 — die Kernerkenntnisse werden dann nicht in dieses Material eingebettet."

---

## A5: Q-Gate-Operationalisierung

### Methode

Q-Gate-Kriterien in WORKFLOW_v4.md, AGENT_MATERIAL.md, AGENT_RAETSEL.md, SUB_MATERIAL_DARSTELLUNGSTEXT.md, SUB_AUFGABE_FREITEXT.md geprueft. Kann ein Agent PASS/FAIL eindeutig bestimmen? Ist der Ruecklauf-Mechanismus konsistent?

### Ergebnis

Der Ruecklauf-Mechanismus ist in allen Dispatches identisch formuliert: "Bei FAIL: 1 Nachbesserung → erneut Q-Gate → bei FAIL: Finding in Q-GATE-LOG.md" (Material-Dispatches, WORKFLOW_v4.md Zeile 560-562) bzw. "Max. 2 Re-Dispatch pro Aufgabe" (Aufgaben-Dispatches, AGENT_RAETSEL.md Zeile 177). Die Differenz (1 Nachbesserung vs. 2 Re-Dispatch) ist korrekt: Material = 1 Nachbesserung (also 2 Versuche total), Aufgabe = max. 2 Re-Dispatch (also 3 Versuche total, weil der Orchestrator den Re-Dispatch steuert und praezisierten Konstruktionskontext liefert).

Die Q-Gate-Kriterien sind fuer Material-Dispatches gut operationalisiert: MQ1-MQ5 + typ-spezifisch (z.B. DT: Q1-Q10, 10 binaere Pruefpunkte). Fuer Aufgaben-Dispatches: A1-A7 + typ-spezifisch (z.B. Freitext: A11-FT, 7 Pruefpunkte).

### Findings

**F-A5-1 [MEDIUM]: Phase 2.1c — Material-Cross-Konsistenz: Pruefachsen qualitativ, nicht binaer.**
WORKFLOW_v4.md Zeile 593-598 definiert 4 Pruefachsen fuer Phase 2.1c (Sequenz-Kohaerenz, Fachbegriff-Konsistenz, Ueberleitung-Kohaerenz, TB-Knoten-Gesamtabdeckung). Achse 1 ("Bilden die Materialien einen logischen Erkenntnisweg?") und Achse 3 ("Passt ueberleitung_von von Material N+1 zum tatsaechlichen Inhalt?") sind qualitative Bewertungen, die ein Agent subjektiv treffen muss. Achse 2 (Fachbegriff-Konsistenz: "identisch verwendet?") und Achse 4 (TB-Abdeckung: "kein Knoten unversorgt?") sind binaer pruefbar.
*Auswirkung:* Nicht blockierend. Phase 2.1c ist ein neuer Dispatch (Strategie-Audit E2) und erfordert notwendigerweise qualitative Bewertung. Ein Agent wird sinnvolle Urteile treffen. Aber die PASS/FAIL-Schwelle fuer Achse 1 und 3 ist nicht definiert.
*Korrekturvorschlag:* Minimale Operationalisierung ergaenzen: Achse 1 FAIL wenn ein Material einen Fachbegriff als bekannt voraussetzt, der erst in einem spaeteren Material eingefuehrt wird. Achse 3 FAIL wenn `ueberleitung_von` einen inhaltlichen Bezug herstellt, der im tatsaechlichen Vorgaenger-Material nicht vorkommt.

---

## A6: Compaction-Resilienz

### Methode

Fuer jeden Material-Dispatch (2.1) und Aufgaben-Dispatch (2.2b) geprueft: Sind Schritte 1-8 bzw. 1-4 tatsaechlich selbsttragend? Gibt es implizite Kontext-Abhaengigkeiten?

### Ergebnis: PASS

P1 ist korrekt und konsistent durchgesetzt:

1. **Material-Dispatch:** Schritte 1-8 lesen ausschliesslich aus Dateien. Kein Schritt referenziert "den vorherigen Dispatch" oder "das gerade produzierte Material". Jeder Dispatch ist unabhaengig ausfuehrbar.

2. **Aufgaben-Dispatch:** Schritte 1-4 lesen aus PROGRESSIONSPLAN.md (Datei), materialien/*.json (Dateien), MATERIAL_GERUEST (Datei), SUB_AUFGABE_*.md (Datei). Kein Kontext-Verweis.

3. **Cross-Konsistenz-Dispatches** (2.1c, 2.2c): Lesen alle relevanten .json-Dateien frisch. Keine Kontext-Abhaengigkeit.

4. **Einzige potentielle Schwachstelle:** Q-GATE-LOG.md wird akkumulativ geschrieben (jeder Dispatch fuegt einen Eintrag hinzu). Wenn Compaction den Kontext verliert, koennte ein Agent den LOG nicht fortschreiben — aber das ist unkritisch, weil er einen neuen Eintrag anhaengt (append), nicht den bestehenden liest und modifiziert.

---

## A7: Engine-Kompatibilitaet

### Methode

JSON-Schemata in den Subagenten gegen escape-engine.js abgeglichen. Stichproben: Freitext, Multiple-Choice, Zuordnung, Lueckentext (aus vorherigem Audit bekannt). Sicherungs-Rendering geprueft.

### Ergebnis

Die bekannten Engine-Einschraenkungen (Briefing Sektion 4) sind korrekt als "keine Findings erwuenscht" markiert. Darueber hinaus:

### Findings

**F-A7-1 [HIGH]: Freitext-Keyword-Validierung — Produktionsdokumentation suggeriert Mechanismus, der nicht existiert.**
SUB_AUFGABE_FREITEXT.md beschreibt ausfuehrlich (Zeile 93-98, 196-198): `_meta.erwartete_begriffe[]`, `_meta.validierung_schwelle`, `_meta.teilfragen[]`. Der JS-Verhalten-Abschnitt (Zeile 220-224) beschreibt Keyword-Matching als Engine-Verhalten. Die tatsaechliche Engine (_checkFreitextCode, Zeile 2568-2602) macht ausschliesslich Fuzzy-Match auf `aufgabe.loesung` (String). Sie liest weder `erwartete_begriffe` noch `validierung_schwelle` noch `teilfragen`.
SUB_AUFGABE_FREITEXT.md Zeile 189: `loesung: String, Keyword oder Kurzphrase (3-5 Woerter)` — das ist korrekt und Engine-kompatibel. Aber der umgebende Kontext (Zeile 194-198, 220-224) suggeriert, dass die _meta-Felder produktiv sind. Ein Agent koennte die `loesung` vernachlaessigen und sich auf `erwartete_begriffe` konzentrieren.
*Auswirkung:* Wenn der Agent die `loesung` (3-5 Woerter Keyword) korrekt setzt, funktioniert die Engine. Die _meta-Felder sind Prompt-Guidance (fuer Qualitaet der Aufgabe), nicht Engine-Input. Das Risiko ist, dass ein Agent die Keyword-Regel missversteht.
*Korrekturvorschlag:* SUB_AUFGABE_FREITEXT.md Zeile 186-198: Klarere Trennung. Vorschlag:
```
Engine-Felder (von escape-engine.js gelesen und validiert):
- loesung: String, Keyword oder Kurzphrase (3-5 Woerter). DIES ist das einzige
  Feld, gegen das die Engine die Schuelerantwort prueft (Fuzzy-Match + indexOf).
  MUSS die zentralen Fachbegriffe der erwarteten Antwort enthalten.

_meta-Felder (Prompt-Guidance, NICHT von Engine gelesen):
- _meta.teilfragen: Steuert die didaktische Qualitaet der Aufgabe.
  Post-MVP: Engine-Rendering als Denkgeruest geplant.
- _meta.erwartete_begriffe: Qualitaetssicherungs-Referenz.
  Post-MVP: Engine-Erweiterung fuer differenzierte Keyword-Pruefung geplant.
```
Abschnitt "JS-Verhalten" (Zeile 219-224): Als "Post-MVP geplant" kennzeichnen oder entfernen. Aktuelle Engine-Realitaet: `_checkFreitextCode` matcht nur `aufgabe.loesung`.

**F-A7-2 [MEDIUM]: quellenangaben[]-Array — AGENT_MATERIAL definiert Engine-Rendering, das nicht existiert.**
(Details: siehe F-A2-2 und F-A3-1. Hier als Engine-Kompatibilitaets-Finding eingestuft.)
AGENT_MATERIAL.md Zeile 345: "Engine rendert Fussnoten-Section automatisch am Mappe-Ende." Falsch — Engine hat keinen quellenangaben-Renderer. WORKFLOW_v4.md (L6) sagt korrekt: `<cite>` in Material-HTML. Goldstandard hat kein quellenangaben-Array.

---

## Meta-Frage

> Wuerdest du als Claude-Agent, der WORKFLOW_v4.md + ORCHESTRATOR.md + AGENT_MATERIAL.md + AGENT_RAETSEL.md liest, wissen, was du in jedem Schritt tun musst — ohne Rueckfragen an den User stellen zu muessen?

**Antwort: Ja, mit 2 Ausnahmen.**

1. **M3b-Constraint (F-A4-1):** Der Pfad `tafelbild.loesung.saetze[]` existiert nicht im Schema. Ein Agent wuerde nach diesem Pfad suchen, nichts finden, und muesste entweder raten (riskant) oder den User fragen. Fix: 1 Zeile aendern.

2. **quellenangaben[]-Widerspruch (F-A2-2/A3-1/A7-2):** AGENT_MATERIAL sagt "Engine rendert Fussnoten", WORKFLOW_v4 sagt "`<cite>` einbetten". Ein Agent, der AGENT_MATERIAL zuerst liest, produziert moeglicherweise ein quellenangaben[]-Array statt `<cite>`-Einbettung. Da WORKFLOW_v4 kanonisch ist und das auch in AGENT_MATERIAL vermerkt ist ("Kanonischer Schnittstellen-Vertrag: docs/architektur/WORKFLOW_v4.md"), sollte ein sorgfaeltiger Agent korrekt handeln — aber das Risiko eines Fehlers ist nicht null.

Alle anderen 15 Dispatches sind eindeutig und selbsttragend dokumentiert. Der Agent weiss in jedem Schritt: Was lesen, was produzieren, wie pruefen, was bei FAIL tun.

---

## Korrekturvorschlaege — Priorisiert

| # | Finding | Prio | Aufwand | Korrektur |
|---|---|---|---|---|
| 1 | F-A4-1 | HIGH | 2 Zeilen | WORKFLOW_v4.md: `tafelbild.loesung.saetze[]` → `rahmen/tafelbild.json → scpl.loesung[]` |
| 2 | F-A7-1 | HIGH | 10 Zeilen | SUB_AUFGABE_FREITEXT.md: Engine-Felder vs. _meta-Felder klar trennen, JS-Verhalten als Post-MVP markieren |
| 3 | F-A3-1/A2-2/A7-2 | HIGH | 5 Zeilen | AGENT_MATERIAL.md: quellenangaben[] als Post-MVP markieren, "Engine rendert" streichen, `<cite>`-Workaround explizit machen |
| 4 | F-A1-1 | MEDIUM | 3 Zeilen | WORKFLOW_v4.md: sicherung.zitat Produktionsanweisung ergaenzen |
| 5 | F-A1-2 | MEDIUM | 1 Zeile | WORKFLOW_v4.md: Read-Schritt 3 Phase 2.2b Quelle klaeren |
| 6 | F-A2-1 | MEDIUM | 2 Zeilen | AGENT_MATERIAL.md: Abschnitt 2.4 als v3-Legacy markieren |
| 7 | F-A4-2 | MEDIUM | 3 Zeilen | WORKFLOW_v4.md: Read-Schritt 8 Bedingung praezisieren |
| 8 | F-A5-1 | MEDIUM | 4 Zeilen | WORKFLOW_v4.md: Phase 2.1c FAIL-Schwelle fuer Achse 1+3 operationalisieren |

**Geschaetzter Gesamtaufwand:** 30 Zeilen Dokumentations-Aenderungen. Kein Code. Kein Architektur-Redesign.

---

## Fazit

Die v4-Architektur ist produktionsbereit. Die 15 Dispatches sind vollstaendig dokumentiert, die Datenfluss-Kette ist lueckenlos, und P1 (Compaction-Resilienz) ist korrekt durchgesetzt. Die 3 HIGH-Findings sind Dokumentations-Inkonsistenzen (falscher Pfad, irrefuehrendes Engine-Rendering-Versprechen, fehlende Feld-Trennung), keine Architektur-Defekte. Sie koennen vor Runde 3a in 30 Minuten behoben werden.

Empfehlung: Findings 1-3 (HIGH) vor Runde 3a fixen. Findings 4-8 (MEDIUM) koennen waehrend oder nach Runde 3a behoben werden — sie blockieren die Produktion nicht, erhoehen aber das Risiko von Agent-Rueckfragen.
