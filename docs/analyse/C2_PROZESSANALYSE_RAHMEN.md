# C2 Prozessanalyse-Rahmen: Mappe-4-Produktion

**Erstellt:** 2026-04-04 (PM-Session 10)
**Zweck:** Strukturiertes Framework fuer die Analyse des C2-Produktionslaufs. Dient als Aufnahmestruktur fuer Session-Transcript-Daten und als Referenz fuer nachfolgende Dimension-spezifische Audits.
**Methode:** Schrittweise Transcript-Rekonstruktion → Konsolidiertes Verlaufsprotokoll → Dimensionale Audits

---

## 1. Produktionsuebersicht (aus Dispatch-Tracker)

| Metrik | Wert |
|---|---|
| Game | gpg-erster-weltkrieg-ursachen |
| Mappe | 4 — "Der Schlieffen-Plan" |
| Dispatches geplant | 15 (D-1 bis D15) |
| Dispatches ausgefuehrt | 17 (D-1, D-1.5, D0-D14, inkl. D12b, D12c) |
| Dispatches OFFEN | D15 (Browser-Validierung) |
| Materialien | 5 (DT, Karte×2, Tagebuch, BQ) |
| Aufgaben | 7 (LT, MC×2, RF×2, ZU, FT) |
| Q-Gate PASS-Rate Materialien (1. Durchlauf) | 5/5 (100%), 1× Nachbesserung (D1: 153→150 W) |
| Q-Gate PASS-Rate Aufgaben (1. Durchlauf) | 7/7 (100%), 0 Nachbesserungen |
| Cross-Konsistenz FAILs | 0 |
| Freischalt-Code | MARNE |

---

## 2. Session-Inventar

Die Produktion lief in mehreren Cowork-Sessions. Hier werden die Transcripts nach Uebergabe chronologisch erfasst.

| Session | Datum | Dispatches | Compactions | Transcript-Status | Datei |
|---|---|---|---|---|---|
| P-1 | | | | AUSSTEHEND | |
| P-2 | | | | AUSSTEHEND | |
| P-3 | | | | AUSSTEHEND | |
| P-4 | | | | AUSSTEHEND | |
| P-5 | | | | AUSSTEHEND | |
| P-6 | | | | AUSSTEHEND | |
| P-... | | | | AUSSTEHEND | |

**Aktualisierungsregel:** Pro uebergebenem Transcript eine Zeile ausfuellen. Zeilen hinzufuegen wenn noetig.

---

## 3. Transcript-Aufbereitungsformat

Fuer jede Session wird ein strukturiertes Verlaufsprotokoll erstellt:

**Dateiname:** `C2_VERLAUF_SESSION_P-[N].md`
**Ablageort:** `docs/analyse/c2-verlauf/`

### Pro-Dispatch-Eintrag (Template):

```markdown
### D[X]: [Dispatch-Name]

**Phase:** [Phase-Nummer]
**Vertrag:** [Referenzierter Vertrag]
**Subagent:** [Aufgerufener Subagent, falls applicable]

#### Read-Steps
| # | Datei gelesen | Felder/Sektionen | Vollstaendig? | Anmerkung |
|---|---|---|---|---|

#### Produktionsschritte
1. [Was hat die KI konkret getan — chronologisch]
2. ...

#### Q-Gate-Ergebnis
| Kriterium | Ergebnis | Anmerkung |
|---|---|---|

#### Nachbesserungen
- [Falls vorhanden: Was wurde korrigiert, warum, wievielter Versuch]

#### Tool-Calls
| # | Tool | Parameter (gekuerzt) | Ergebnis (gekuerzt) | Token-Schaetzung |
|---|---|---|---|---|

#### Auffaelligkeiten
- [Abweichungen vom Dispatch-Skript, unerwartetes Verhalten, Fehler, Workarounds]
- [Besonders gelungene Aspekte]

#### Compaction-Events
- [Falls in diesem Dispatch: Compaction aufgetreten? Recovery erfolgreich? Informationsverlust?]
```

### Pro-Session-Zusammenfassung (Template):

```markdown
## Session P-[N] Zusammenfassung

**Dispatches:** D[X] bis D[Y]
**Dauer:** [geschaetzt aus Transcript-Laenge/Aktivitaet]
**Compactions:** [Anzahl, Position im Verlauf]
**Session-Split:** [Wie wurde die Session beendet? Uebergabe-Prompt korrekt?]

### Quantitative Metriken
| Metrik | Wert |
|---|---|
| Dispatches in Session | |
| Tool-Calls gesamt | |
| Read-Tool-Calls | |
| Write/Edit-Tool-Calls | |
| Bash-Tool-Calls | |
| Compaction-Events | |
| Q-Gate PASS 1. Durchlauf | |
| Nachbesserungen | |

### Qualitative Beobachtungen
- [Freitext: Was fiel auf?]
```

---

## 4. Analyse-Dimensionen

Nach Abschluss der Transcript-Aufbereitung werden dimensionale Audits durchgefuehrt. Jede Dimension erhaelt ein eigenes Ergebnis-Dokument.

### D1: Prozesskongruenz (Dispatch-Skript-Treue)

**Fragestellung:** Hat die Produktions-KI den im DISPATCH_SKRIPT definierten Ablauf eingehalten?
**Pruefpunkte:**
- Dispatch-Reihenfolge eingehalten (D-1 → D-1.5 → D0 → D1 ... → D14)
- Read-Steps pro Dispatch gemaess Vertrag ausgefuehrt (richtige Dateien, richtige Sektionen)
- Q-Gate pro Dispatch durchgefuehrt (richtige Checkliste, alle Kriterien)
- Testbedingungen eingehalten (kein Mappe-3-Kopieren, kein PM-Eingriff)
- Session-Splits an definierten Punkten
- Fortschritts-Tracker korrekt aktualisiert
**Output:** `C2_AUDIT_D1_PROZESSKONGRUENZ.md`

### D2: Didaktische Qualitaet

**Fragestellung:** Sind die erzeugten Inhalte fachdidaktisch hochwertig und altersgerecht?
**Pruefpunkte:**
- Materialien: Sprachregister R7, Fachbegriff-Elaborierung, TB-Knoten-Abdeckung, SCPL-Kohaerenz
- Aufgaben: AFB-Progression, Operator-Praezision, Verankerungs-Qualitaet, Distraktor-Qualitaet
- Hefteintrag: SCPL-Strukturierung, Kernerkenntnisse, Ordnungsmuster-Konsequenz
- Ueberleitungen: Inhaltliche Motivation, Sprachregister, Laenge
- Vergleich Mappe 3 vs. Mappe 4 (qualitativer Delta)
**Output:** `C2_AUDIT_D2_DIDAKTISCHE_QUALITAET.md`

### D3: Technische Implementation

**Fragestellung:** Sind die erzeugten JSON-Artefakte schema-konform und engine-kompatibel?
**Pruefpunkte:**
- JSON-Validitaet aller Dateien
- Schema-Konformitaet (Pflichtfelder, Typen, Engine-Typ-Mapping)
- Encoding (UTF-8 Umlaute, typographische Zeichen)
- data.json-Integration (Assembly korrekt, keine Strukturbrueche)
- Cache-Busting (Versionierung korrekt)
- Bild-Downloads (URLs gueltig, Lizenzen, Dateigroessen)
**Output:** `C2_AUDIT_D3_TECHNISCHE_IMPLEMENTATION.md`

### D4: Tool-Calling-Effizienz

**Fragestellung:** Hat die KI ihre Tools effizient und korrekt eingesetzt?
**Pruefpunkte:**
- Read-Calls: Redundante Reads? Unnoetige Reads? Fehlende Reads?
- Write/Edit-Calls: Korrekte Dateipfade? Ueberschreibungen?
- Bash-Calls: Sinnvoller Einsatz (JSON-Validierung, git status)?
- Glob/Grep-Calls: Sucheffizienz
- Verhältnis Read:Write (idealer Bereich?)
- Fehlgeschlagene Tool-Calls und Recovery
**Output:** `C2_AUDIT_D4_TOOL_CALLING.md`

### D5: Token-Effizienz + Session-Management

**Fragestellung:** Wurde das Token-Budget effizient genutzt? Waren Session-Splits sinnvoll?
**Pruefpunkte:**
- Dispatches pro Session (Durchsatz)
- Compaction-Events: Wann, warum, Recovery-Qualitaet
- Session-Splits: An geplanten Stellen? Uebergabe-Prompt korrekt?
- Informationsverlust nach Compaction (messbar durch Re-Read-Verhalten)
- Redundante Kontextladungen (gleiche Datei mehrfach gelesen ohne Aenderung)
- Projektanweisungs-Effektivitaet: Hat die KI nach Compaction/Session-Start korrekt re-orientiert?
**Output:** `C2_AUDIT_D5_TOKEN_EFFIZIENZ.md`

### D6: Compaction-Resilienz (Projektanweisungen)

**Fragestellung:** Hat die COWORK_PROJECT_ANLEITUNG_PRODUKTION als Compaction-Recovery-Mechanismus funktioniert?
**Pruefpunkte:**
- Recovery-Protokoll befolgt (6-Schritte)?
- Korrekter naechster Dispatch identifiziert?
- Kontextverlust nach Compaction (welche Informationen gingen verloren)?
- Regeladhärenz nach Compaction (Encoding, File-Ownership, Dispatch-Isolation)?
- Verbesserungsvorschlaege fuer die Projektanweisungsdatei
**Output:** `C2_AUDIT_D6_COMPACTION_RESILIENZ.md`

### D7: Usability + Reibungslosigkeit

**Fragestellung:** Wie reibungslos war der Prozess aus User-Perspektive?
**Pruefpunkte:**
- User-Interventionen: Anzahl, Art (Korrektur, Klarstellung, Genehmigung, Fehlerbehandlung)
- Fehler + Recovery: Wie oft hat die KI Fehler gemacht, wie schnell korrigiert?
- Selbstaendigkeit: Wie viele Dispatches liefen ohne User-Eingriff?
- Blockaden: Wo blieb der Prozess haengen?
- UX-Friction: Unnoetiger Output, fehlende Rueckmeldungen, verwirrende Fragen
**Output:** `C2_AUDIT_D7_USABILITY.md`

### D8: Infrastruktur-Wirksamkeit (Patch-Validation)

**Fragestellung:** Haben die Infrastruktur-Patches (A1-A7, B1-B2, C1-C1c, P1-P3) ihren Zweck erfuellt?
**Pruefpunkte:**
- P1 (Freitext-Keywords): loesung[] = Minimum-Keywords korrekt umgesetzt?
- P2 (Knoten-Elaborierung): merksatz bei allen relevanten Knoten?
- P3 (Teilfragen-Rendering): _meta.teilfragen korrekt produziert?
- A1 (Encoding): UTF-8 in allen Outputs?
- A2 (Quellenangaben): quellenangaben[] korrekt, nicht in inhalt?
- B1-B10 (Mappe-3-Findings): Welche wiederholen sich, welche nicht?
- Nicht getestete Patches: Welche Patches wurden nicht exercised?
**Output:** `C2_AUDIT_D8_INFRASTRUKTUR_WIRKSAMKEIT.md`

---

## 5. Abhaengigkeiten + Reihenfolge

```
Transcript-Lektuere (read_transcript auf P-1..P-5, schrittweise)
  │
  ▼
Verlaufsprotokoll pro Session (C2_VERLAUF_SESSION_P-*.md)
  │
  ├── Automatisierte Checks (Python: JSON-Validierung, Encoding, Schema → D3/D8 Input)
  │
  ▼
Konsolidiertes Gesamtprotokoll (C2_VERLAUF_GESAMT.md)
  │
  ├── D1 Prozesskongruenz (benoetigt: Gesamtprotokoll)
  ├── D2 Didaktische Qualitaet (benoetigt: Gesamtprotokoll + Produktions-JSONs)
  ├── D3 Technische Implementation (benoetigt: Produktions-JSONs + data.json)
  ├── D4 Tool-Calling (benoetigt: Gesamtprotokoll, speziell Tool-Call-Tabellen)
  ├── D5 Token-Effizienz (benoetigt: Gesamtprotokoll, Session-Zusammenfassungen)
  ├── D6 Compaction-Resilienz (benoetigt: Gesamtprotokoll, Compaction-Events)
  ├── D7 Usability (benoetigt: Gesamtprotokoll, User-Interventionen)
  └── D8 Infrastruktur-Wirksamkeit (benoetigt: Gesamtprotokoll + Produktions-JSONs + B1-B10 Baseline)
  │
  ▼
C2_EVALUATION_MAPPE4.md (Synthese aller Dimensionen, Go/No-Go-Entscheidung)
```

D1-D8 koennen teilweise parallel ausgefuehrt werden (agent-teams oder sequentielle Sessions). D2, D3, D8 benoetigen zusaetzlich die Produktions-JSONs. D6 ist nur auswertbar wenn Compaction-Events stattfanden.

---

## 5b. Tooling-Plan (evaluierte Plugins, Skills, MCPs, Agent-Typen)

Systematische Evaluation aller verfuegbaren Werkzeuge gegen die 8 Dimensionen. Durchgefuehrt PM-Session 10 (2026-04-04).

### Primaere Werkzeuge (klarer Benefit, eingeplanter Einsatz)

| Werkzeug | Typ | Dimension(en) | Einsatz | Benefit |
|---|---|---|---|---|
| `mcp__session_info__read_transcript` | MCP-Tool | D1, D4, D5, D6, D7 | Transcripts der 5 Produktionssessions programmatisch lesen. Eliminiert manuelle Uebergabe. | HOCH — Effizienz: kein Copy-Paste, vollstaendige Daten, kein Informationsverlust bei Uebergabe. |
| `mcp__session_info__list_sessions` | MCP-Tool | Alle | Session-Inventar automatisch befuellen (Datum, Titel, Dispatch-Zuordnung). | HOCH — Praezise Session-Metadaten ohne manuelle Rekonstruktion. |
| `agent-teams:team-reviewer` | Agent-Typ | D2, D8 | Parallele Reviewer auf didaktische Subdimensionen (D2: Sprachregister, Verankerung, SCPL-Kohaerenz) und Patch-Wirksamkeit (D8: P1-P3, A1-A7, B1-B10). | HOCH — Bewaehrtes Pattern aus C1c-Audit. 3 Perspektiven gleichzeitig, strukturiertes Finding-Format, Severity-Kalibrierung. |
| Bash/Python-Skripte | Direkt | D3, D8 | JSON-Validierung, Encoding-Checks (UTF-8, typogr. Zeichen), Schema-Konformitaet, B1-B10 Regressionspruefung automatisiert auf Produktions-JSONs. | HOCH — Objektive, wiederholbare Pruefung. Keine LLM-Interpretation noetig fuer mechanische Checks. |

### Sekundaere Werkzeuge (situativ nuetzlich, bei Bedarf aktivierbar)

| Werkzeug | Typ | Dimension(en) | Bedingung fuer Einsatz | Benefit |
|---|---|---|---|---|
| `agent-teams:team-lead` | Agent-Typ | Orchestrierung | Wenn D1-D8 in einer Session parallel auditiert werden sollen. | MITTEL — Dekomposition + Synthese. Overhead lohnt sich nur bei >= 3 parallelen Dimensionen. |
| `agent-teams:multi-reviewer-patterns` | Skill | D2, D8 | Bei Finding-Deduplication und Severity-Kalibrierung nach parallelem Review. | MITTEL — Verhindert Doppel-Findings, kalibriert BLOCKER vs. HIGH. |
| `documentation-generation:mermaid-expert` | Agent-Typ | Visualisierung | Fuer Prozessfluss-Diagramme in C2_EVALUATION_MAPPE4.md. | MITTEL — Visuell fuer Ergebnisdarstellung, nicht fuer Analyse selbst. |
| `mcp__48177e08__validate_and_render_mermaid_diagram` | MCP-Tool | Visualisierung | Mermaid-Diagramm-Validierung bei Ergebnisdarstellung. | NIEDRIG — Nur relevant wenn Diagramme erstellt werden. |
| `plugin-eval:eval-judge` | Agent-Typ | D2, D4 | Rubrik-Scoring adaptierbar fuer Qualitaetsbewertung von Produktions-Outputs. | MITTEL — Strukturiertes Scoring-Framework, aber Briefing-Aufwand fuer Custom-Rubrics hoch. |
| `accessibility-compliance:wcag-audit-patterns` | Skill | D15 (Browser-Val.) | Fuer D15 Browser-Validierung (WCAG 2.2 AA auf mappe-4.html). Nicht fuer D1-D8. | HOCH fuer D15 — aber D15 ist separater Schritt, nicht Teil der Prozessanalyse. |
| `llm-application-dev:prompt-engineering-patterns` | Skill | Meta | Fuer Verbesserung der Subagenten-Prompts basierend auf D2-Findings. Nicht fuer Analyse, sondern fuer Folge-Iteration. | MITTEL — Einsatz NACH Analyse, nicht waehrend. |

### Nicht einsetzbar (evaluiert, kein Benefit)

| Werkzeug | Grund |
|---|---|
| `comprehensive-review:full-review` / `code-reviewer` / `architect-review` | Optimiert fuer Code-Review (Security, Performance, Patterns). Unsere Artefakte sind JSON-Content + Markdown-Prozessdokumente, kein Source-Code. Rubrics passen nicht. |
| `comprehensive-review:security-auditor` | Kein Security-Kontext in didaktischer Content-Produktion. |
| `conductor:*` (setup, implement, new-track, etc.) | Track-Management-Overhead ohne Mehrwert fuer einmalige Analyse. Conductor-Patterns bereits manuell in Dispatch-Skript umgesetzt. |
| `plugin-eval:eval` / `certify` / `compare` | Bewertet Skills/Plugins auf Triggering-Accuracy und Scope. Nicht auf Produktionsprozesse anwendbar. |
| `mcp__sequentialthinking` | Kein Vorteil gegenueber normalem Reasoning bei PM-Analyse. Overhead durch Tool-Call ohne Informationsgewinn. |
| `developer-essentials:*` (git, debugging, monorepo, etc.) | Software-Engineering-Patterns. Kein Bezug zu didaktischer Content-Analyse. |
| `llm-application-dev:rag-implementation` / `vector-*` / `langchain-*` | RAG/Vector-DB-Patterns. Kein Bezug. |
| `design:*` (critique, handoff, ux-copy, etc.) | UI/UX-Design-Review. Unsere Analyse betrifft Prozess + Content, nicht visuelles Design. |
| `productivity:*` (task-management, memory, etc.) | Bereits durch TodoWrite + Memory-System abgedeckt. Kein zusaetzlicher Benefit. |
| `cowork-plugin-management:*` | Plugin-Erstellung/-Konfiguration. Nicht relevant fuer Analyse. |
| `mcp__Claude_in_Chrome__*` / `mcp__Control_Chrome__*` | Browser-Steuerung. Nur fuer D15 (Browser-Validierung) relevant, nicht fuer Prozessanalyse. |
| `mcp__Excel__*` / `mcp__Word__*` / `mcp__PowerPoint__*` | Office-Tools. Kein Analyse-Bezug. Metriken werden in Markdown dokumentiert. |
| `mcp__wikipedia__*` / `mcp__wikimedia-image-search__*` | Content-Recherche-Tools. Nur fuer Produktion, nicht fuer Analyse. |

### Einsatzplan pro Phase

| Phase | Primaere Werkzeuge | Sekundaere (bei Bedarf) |
|---|---|---|
| 1. Transcript-Rekonstruktion | `read_transcript`, `list_sessions` | — |
| 2. Automatisierte Checks (D3, D8 teilw.) | Bash/Python | — |
| 3a. D1 Prozesskongruenz | PM manuell (Transcript vs. Dispatch-Skript) | — |
| 3b. D2 Didaktik-Audit | `agent-teams:team-reviewer` (3 Subdimensionen) | `multi-reviewer-patterns`, `eval-judge` |
| 3c. D3 Technik-Audit | PM + Python-Ergebnisse | — |
| 3d. D4 Tool-Calling | PM manuell (Tool-Call-Tabellen aus Transcripts) | — |
| 3e. D5 Token-Effizienz | PM manuell (Session-Zusammenfassungen) | — |
| 3f. D6 Compaction-Resilienz | PM manuell (Compaction-Events aus Transcripts) | — |
| 3g. D7 Usability | PM manuell (User-Interventionen aus Transcripts) | — |
| 3h. D8 Infrastruktur-Wirksamkeit | `agent-teams:team-reviewer` (3 Patch-Cluster) + Python | `multi-reviewer-patterns` |
| 4. Synthese | PM → C2_EVALUATION_MAPPE4.md | `mermaid-expert` (Visualisierung) |
| 5. D15 Browser-Validierung (separat) | `accessibility-compliance:wcag-audit-patterns`, Chrome-Tools | — |

### Identifizierte Produktionssessions (via `list_sessions`)

| PM-ID | Session-ID | Titel | Vermutete Dispatches |
|---|---|---|---|
| P-1 | `local_c0a75297-05ee-4598-9351-b7d7c875d799` | "Review GPG WWI causes dispatch script" | Orientierung, D-1? |
| P-2 | `local_c6ba81a8-5b0a-4cfa-9d88-54dd24e25443` | "Complete dispatch script phase one" | D-1.5, D0? |
| P-3 | `local_dac30110-8cea-4ea1-8931-11d8d934bfb8` | "Dispatch script production tracking" | D1-D5? |
| P-4 | `local_685f1f4b-0353-4cd9-8b5c-086b0add9e47` | "Dispatch D6 World War One Materials Production" | D6-D7? |
| P-5 | `local_e4acabe7-4874-4f3b-b208-652c7822fba3` | "Track WWI causes dispatch progress" | D8-D14? |

**Hinweis:** Zuordnung Dispatches↔Sessions ist Erstschaetzung aus Titeln. Wird bei Transcript-Lektuere praezisiert.

---

## 6. Referenz-Baseline (Mappe 3)

Fuer Vergleichbarkeit werden Mappe-3-Metriken als Baseline herangezogen:

| Metrik | Mappe 3 | Quelle |
|---|---|---|
| Materialien: Anzahl | 5 | DISPATCH_SKRIPT_MAPPE4 Metriken-Tabelle |
| Materialien: Q-Gate PASS 1. Durchlauf | 5/5 (100%) | DISPATCH_SKRIPT_MAPPE4 |
| Aufgaben: Anzahl | 7 (dann 5 nach B2) | DISPATCH_SKRIPT_MAPPE4 |
| Aufgaben: Q-Gate PASS 1. Durchlauf | nicht vergleichbar (v1) | DISPATCH_SKRIPT_MAPPE4 |
| Aufgaben: Nachbesserungen | 4/5 (D2-D6) | DISPATCH_SKRIPT_MAPPE4 |
| Cross-Konsistenz: FAILs | 0 | DISPATCH_SKRIPT_MAPPE4 |
| Browser-Findings: Wiederkehrend (B1-B10) | 7 von 10 | Browser review Mappe 3.md |
| Gesamtdauer (Dispatches) | ~16h (Sessions 8+9) | DISPATCH_SKRIPT_MAPPE4 |
| Infrastruktur-Version | Pre-Revision (A1-A7 nicht installiert) | AUSFUEHRUNGSPLAN |
| Produktionsumgebung | Claude Code + Cowork PM | — |

---

## 7. Produktion-Dateien (Vollstaendiges Inventar)

### Steuerung
- docs/agents/artefakte/produktion/gpg-erster-weltkrieg-ursachen/mappe-4/DISPATCH_SKRIPT_MAPPE4.md
- docs/agents/artefakte/produktion/gpg-erster-weltkrieg-ursachen/mappe-4/Q-GATE-LOG.md

### Phase 0.4
- docs/agents/artefakte/TAFELBILD_gpg-erster-weltkrieg-ursachen_Mappe4.md

### Phase 1
- docs/agents/artefakte/produktion/gpg-erster-weltkrieg-ursachen/mappe-4/MATERIAL_GERUEST_gpg-erster-weltkrieg-ursachen_Mappe4.md

### Phase 2.0 (Rahmen)
- .../mappe-4/rahmen/hefteintrag.json
- .../mappe-4/rahmen/einstieg.json
- .../mappe-4/rahmen/sicherung.json
- .../mappe-4/rahmen/meta.json

### Phase 2.1 (Materialien)
- .../mappe-4/materialien/mat-4-1.json (DT)
- .../mappe-4/materialien/mat-4-2.json (Karte/BQ)
- .../mappe-4/materialien/mat-4-3.json (Tagebuch)
- .../mappe-4/materialien/mat-4-4.json (Karte/BQ)
- .../mappe-4/materialien/mat-4-5.json (BQ)

### Phase 2.1c
- .../mappe-4/ueberleitungen.json

### Phase 2.2a
- .../mappe-4/PROGRESSIONSPLAN_Mappe4.md

### Phase 2.2b (Aufgaben)
- .../mappe-4/aufgaben/aufgabe-4-1.json (LT)
- .../mappe-4/aufgaben/aufgabe-4-2.json (MC)
- .../mappe-4/aufgaben/aufgabe-4-3.json (RF)
- .../mappe-4/aufgaben/aufgabe-4-4.json (ZU)
- .../mappe-4/aufgaben/aufgabe-4-5.json (MC)
- .../mappe-4/aufgaben/aufgabe-4-6.json (RF)
- .../mappe-4/aufgaben/aufgabe-4-7.json (FT)

### Phase 3 (Assembly)
- escape-games/gpg-erster-weltkrieg-ursachen/data.json (Mappe-4-Objekt integriert)
- mappe-4.html
- assets/images/escape/gpg-erster-weltkrieg-ursachen/img-4-*.{svg,jpg}

---

## 8. Transcript-Aufbereitungs-Protokoll

### Primaerer Pfad: Programmatischer Zugriff (empfohlen)

Die Produktionssessions sind via `mcp__session_info__read_transcript` direkt lesbar.

**Anweisung fuer PM-Session:**

1. `mcp__session_info__list_sessions` → Session-Inventar (Sektion 2) befuellen.
2. Pro Session (P-1 bis P-5): `mcp__session_info__read_transcript(session_id, limit=X)` aufrufen.
   - `limit` steuert Anzahl der zurueckgegebenen Messages (default 20, most recent).
   - Bei umfangreichen Sessions: mehrere Calls mit verschiedenen Offsets oder hohem Limit.
   - **Token-Budget beachten:** Ein volles Transcript kann sehr gross sein. Pro PM-Session maximal 1-2 Produktionssessions aufbereiten.
3. PM extrahiert pro Dispatch die Informationen gemaess Template (Sektion 3).
4. PM schreibt C2_VERLAUF_SESSION_P-[N].md in docs/analyse/c2-verlauf/.
5. PM aktualisiert Session-Inventar (Sektion 2).
6. Nach allen Sessions: PM erstellt C2_VERLAUF_GESAMT.md (Konsolidierung).
7. Dann: Dimensionale Audits (D1-D8) nach Bedarf.

### Fallback-Pfad: Manuelle Uebergabe

Falls `read_transcript` nicht verfuegbar oder Sessions nicht sichtbar:
1. User uebergibt Transcript als Text oder Datei.
2. PM liest Transcript sequenziell.
3. Weiter wie oben ab Schritt 3.

### Token-Budget-Regel

Pro PM-Session maximal 1-2 Produktionssessions aufbereiten. Nicht versuchen, alle 5 Sessions in einer PM-Session zu konsolidieren. Verlaufsprotokolle pro Session persistent schreiben — naechste PM-Session liest sie und kann weiterarbeiten.
