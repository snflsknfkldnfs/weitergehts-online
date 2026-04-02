# UPGRADE_PLAN v4: Produktionsarchitektur — Cowork-basierte Materialproduktion

**Datum:** 2026-04-01
**Status:** Runde 4 Kern abgeschlossen. Alle 10 Qualitaetsbefunde adressiert (Prozess-Fixes + Engine-Patches). Verbleibend: OPT-1-8, 3 architektonische Entscheidungen.
**Audit 1:** docs/analyse/AUDIT_v4_ARCHITEKTUR_ERGEBNIS.md (2026-03-31) — 1 BLOCKER, 3 MEDIUM, alle adressiert
**Audit 2:** docs/analyse/AUDIT_v4_STRATEGIE_ERGEBNIS.md (2026-03-31) — 4 Empfehlungen, alle adressiert
**Runde 3a:** docs/analyse/RUNDE_3a_ERGEBNIS.md — 8 Befunde, alle in 3a-Opt behoben
**Runde 3b:** docs/analyse/RUNDE_3b_ERGEBNIS.md — Alle 3a-Befunde behoben, 5 neue (operativ), 8 Optimierungskandidaten
**Vorgaenger:** WORKFLOW_v2.md (v3), UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md
**Ausloesender Befund:** Mappe-2-Produktion v1 (Commit a6aa589) und v2 (Commit c9eb9ec) beide gescheitert — trotz expliziter Subagenten-Referenzen produzierte Claude Code monolithisch

---

## 1. Problem

### 1.1 Befund

Claude Code kann die Subagenten-Architektur nicht als Dispatch-Einheiten ausfuehren. Trotz:
- v1: Generischer Subagenten-Referenz im Uebergabe-Prompt
- v2: Expliziter per-Material-Dispatch-Bloecke mit Subagent-Pfad + Eingabe-Paket + Q-Gate-Log-Pflicht

... wurde in beiden Faellen:
- Alle Subagenten-Prompts batch-gelesen (kein isolierter Kontext)
- Alle Materialien + Aufgaben in einem einzigen Edit produziert (monolithisch)
- Kein Q-Gate-Log geschrieben
- Kein AGENT_RAETSEL-Progressionsplan erstellt
- Keine Cross-Konsistenz-Pruefung durchgefuehrt
- Engine-inkompatible JSON-Felder in 4/5 Aufgabentypen (v2)

### 1.2 Root Cause

Claude Code hat kein Konzept von "Subagent-Isolation". Es operiert als flacher Kontext: Dateien lesen → Text generieren → Datei schreiben. Die Subagenten-Architektur erfordert jedoch:
- **Isolierten Kontext** pro Material/Aufgabe (nur der relevante Subagent-Prompt + Eingabe-Paket)
- **Zwischenergebnisse** als persistente Artefakte (nicht nur im Kontext)
- **Pruefschritte** zwischen Dispatch-Aufrufen (Q-Gate)
- **Sequentielle Abhaengigkeit** (Aufgaben basieren auf fertigen Materialien)

### 1.3 Verschaerfender Faktor

Compaction waehrend der Claude-Code-Session fuehrt zum Verlust der Subagenten-Prompt-Inhalte aus dem Kontext — selbst wenn sie initial gelesen wurden.

---

## 2. Zielsystem v4

### 2.1 Architekturprinzipien

**Terminologie:** Drei Abstraktionsebenen — **Phase** (logische Gruppierung), **Dispatch** (ein isolierter Agent-Aufruf in Cowork = eine Agent-Tool-Invokation), **Read-Schritt** (ein Datei-Lese-Vorgang innerhalb eines Dispatch). P1/P4 operieren auf Dispatch-Ebene. P6 operiert auf Read-Schritt-Ebene. Details: WORKFLOW_v4.md Sektion 2.

**P1: Read-from-Artifact, not from Context.**
Jeder **Dispatch** beginnt mit dem Einlesen seiner Eingabe-Artefakte aus dem Dateisystem. Kein Dispatch verlaesst sich auf Kontextinhalte aus vorherigen Dispatches. Innerhalb eines Dispatch duerfen Read-Schritte aufeinander aufbauen. Das macht jeden Dispatch compaction-resistent.

**P2: Didaktische Entscheidungen in Cowork, technische Umsetzung in Claude Code.**
Cowork hat Agent-Dispatch mit isoliertem Kontext, Zwischenergebnisse als Dateien, Pruefschritte zwischen Dispatch-Aufrufen. Claude Code hat Dateisystem-Zugriff, Git, Shell. Die Aufgabenteilung folgt der Staerke.

**P3: Rahmen stuetzt Inhalt, nicht umgekehrt. Sicherung steuert vom Ende her.**
Tafelbild, Einstieg und Sicherung werden VOR den Materialien finalisiert (Rahmen-zuerst-Sequenz). Die Sicherung (Kernerkenntnisse, Hefteintrag) definiert das Lernziel — Materialien arbeiten darauf hin. Materialien stellen den fokussierten Kerninhalt in den Mittelpunkt. Der Rahmen stuetzt, qualifiziert und bettet die Materialien in den Lernprozess ein — er schraenkt den inhaltlichen Fokus nicht ein. Aufgaben referenzieren fertige Materialien + Rahmen.

**P4: Ein Artefakt pro Dispatch.**
Jedes Material und jede Aufgabe wird als eigene .json-Datei produziert und persistiert. Kein monolithischer Output. Jeder Fehler ist isoliert korrigierbar.

**P5: Q-Gate als Pflicht-Zwischenschritt.**
Zwischen Produktion und Persistierung steht eine Q-Gate-Pruefung. Erst bei PASS wird das Artefakt geschrieben. Bei FAIL: 1 Nachbesserung, dann Finding dokumentieren.

**P6: Praezise Schnittstellen-Vertraege (Occam's Razor).**
Jeder Dispatch definiert exakt seine Read-Schritte und seinen Output. Occam's Razor: Jeder Read-Schritt liest NUR die nachweislich relevanten Felder. Konditionale Reads (NUR WENN Bedingung erfuellt) vermeiden unnoetige Datei-Zugriffe. Jede Schnittstelle wird als expliziter Vertrag dokumentiert: welche Datei, welche Felder, welche Bedingung.

**P7: Verlustfreie Transformation.**
WORKFLOW_v4 bewahrt alle produktiven, qualitaetsmaximierenden Elemente und Entscheidungen aus WORKFLOW_v2/v3 (Learnings L1-L7, Q-Gates, Subagenten-Expertise, Dispatch-Logik, JSON-Encoding-Regeln, Engine-Typ-Mapping). Nur der Ausfuehrungsort und die Persistierungsmethode aendern sich. Kein bewusst getroffenes Strukturprinzip geht verloren.

### 2.2 Phasenstruktur v4

```
Phase 0: Inhaltliche Vorarbeit (unveraendert)
  0.1 AGENT_DIDAKTIK    → DIDAKTIK_RAHMEN
  0.2 AGENT_INHALT      → INHALTSBASIS
  0.3 AGENT_SKRIPT      → SKRIPT (gechunkt)
  0.4 AGENT_TAFELBILD   → TAFELBILD pro Mappe
  0.5 AGENT_ARTEFAKT    → ARTEFAKT_INVENTAR

Phase 1: Material-Design (unveraendert, Cowork)
  1.1 AGENT_MATERIAL (Design-Modus) → MATERIAL_GERUEST pro Mappe
  1.5 User-Validierung: PFLICHT

Phase 2: Didaktische Produktion (NEU: Cowork statt Claude Code)
  2.0 Rahmen-Produktion (Cowork)
      → tafelbild.json, einstieg.json, sicherung.json, meta.json
      → User-Validierung EMPFOHLEN
  2.1 Material-Produktion (Cowork, sequentiell)
      → Pro Material: SUB_MATERIAL_* lesen → produzieren → Q-Gate → .json schreiben
      → Output: materialien/mat-N-1.json ... mat-N-M.json
      → Q-GATE-LOG_Materialien.md
      → **User-Validierung nach Material 1-2: PFLICHT (Erstanwendung Mappe 2)**
        Kalibrierung: Ton, Sprachregister, Vergegenwaertigungstiefe
        Ab Mappe 3: Herabstufung auf EMPFOHLEN moeglich (Strategie-Audit Bedingung 1)
  2.1c Material-Cross-Konsistenz (NEU — Strategie-Audit S2/S3)
      → 1 Dispatch: Alle materialien/mat-N-*.json lesen
      → Prueft: Sequenz-Kohaerenz, Fachbegriff-Konsistenz,
        Ueberleitung-Kohaerenz, TB-Knoten-Gesamtabdeckung
      → Output: Cross-Konsistenz-Ergebnis in Q-GATE-LOG.md
  --- CHECKPOINT: Session-Split hier (Audit S2 — Token-Budget) ---
  2.2 Aufgaben-Produktion (Cowork, sequentiell)
      → 2.2a AGENT_RAETSEL: Progressionsplan (liest fertige materialien/*.json)
      → 2.2b Pro Aufgabe: SUB_AUFGABE_* lesen → produzieren → Q-Gate → .json schreiben
      → 2.2c Cross-Konsistenz-Pruefung (Orchestrator-Q-Gate)
      → Output: aufgaben/aufgabe-N-1.json ... aufgabe-N-5.json
      → PROGRESSIONSPLAN.md, Q-GATE-LOG_Aufgaben.md
  2.3 User-Validierung: EMPFOHLEN (Stichproben-Review auf 1-2 Aufgaben)

Phase 3: Technische Implementierung (Claude Code — rein mechanisch)
  3.0 Pre-Flight: Revert + git pull + data.json lesen
  3.1 Bilder herunterladen (Wikimedia → assets/img/)
  3.2 Assembly: Alle .json-Dateien lesen → Mappe-Objekt zusammenbauen → data.json Mappe-Anhang
  3.3 mappe-N.html erstellen
  3.4 JSON-Validierung + Integritaetschecks
  3.5 Git commit + push
  KEINE didaktischen Entscheidungen. Nur Datei-I/O.

Phase 4: Browser-Validierung (User oder Cowork via Chrome)
```

### 2.3 Artefakt-Verzeichnisstruktur

```
docs/agents/artefakte/produktion/{game-id}/mappe-{N}/
  rahmen/
    meta.json          # freischalt_code, titel, beschreibung
    einstieg.json      # narrativ, problemstellung
    sicherung.json     # typ, zusammenfassung, ueberleitung, reflexionsimpuls, kernerkenntnisse[], hefteintrag_verweis, zitat
    tafelbild.json     # knoten, verbindungen, voraussetzungen, stundenfrage, scpl, merksaetze
  materialien/
    mat-N-1.json       # Vollstaendiges Material-JSON-Objekt (Engine-kompatibel)
    mat-N-2.json
    ...
  aufgaben/
    aufgabe-N-1.json   # Vollstaendiges Aufgaben-JSON-Objekt (Engine-kompatibel)
    aufgabe-N-2.json
    ...
  PROGRESSIONSPLAN.md  # AGENT_RAETSEL Output (AFB-Zuweisung, Konstruktionskontexte)
  Q-GATE-LOG.md        # Gesammelt: Materialien + Aufgaben + Cross-Konsistenz
```

### 2.4 Dispatch-Ablauf in Cowork (Detail)

#### Rahmen-Produktion (Phase 2.0)

**Bedeutung:** Der Rahmen definiert die Zielstruktur. Die Sicherung bestimmt, worauf alle Materialien hinarbeiten ("vom Ende her denken"). 1 Dispatch, 4 Outputs.

**Schnittstellen-Vertrag (P6):**

| Read-Schritt | Input-Datei | Gelesene Felder | Zweck |
|---|---|---|---|
| 1 | TAFELBILD_Mappe[N].md | Vollstaendig (TB-FREEZE) | → rahmen/tafelbild.json (1:1) |
| 2 | MATERIAL_GERUEST (Einstieg) | typ, narrativ, problemstellung | → rahmen/einstieg.json |
| 3 | MATERIAL_GERUEST (Sicherung) | typ, zusammenfassung, ueberleitung, reflexionsimpuls, hefteintrag_verweis, zitat | → rahmen/sicherung.json (Basis) |
| 4 | rahmen/tafelbild.json (Schritt 1) | loesung.saetze[] (Merkbox) | → sicherung.kernerkenntnisse[] (M3b) |
| 5 | ORCHESTRATOR + GERUEST Header | Freischalt-Code-Regeln, titel, beschreibung | → rahmen/meta.json |

**M3b-Constraint:** `sicherung.kernerkenntnisse[]` := `tafelbild.loesung.saetze[]` (Merkbox-Inhalt). Wird nicht neu formuliert — Autoritaet liegt beim Tafelbild (TB-FREEZE).

**C1b-Identitaetsregel:** einstieg.problemstellung === tafelbild.stundenfrage === SKRIPT-Chunk-Ueberschrift (wortidentisch). Wird in Phase 2.0 einmalig gesetzt und propagiert.

#### Material-Produktion (Phase 2.1)

**Schnittstellen-Vertrag (P6):**

| Read-Schritt | Input-Datei | Gelesene Felder/Sektionen | Bedingung | NICHT lesen |
|---|---|---|---|---|
| 1 | MATERIAL_GERUEST | NUR Zeile des aktuellen mat-ID (typ, titel, skript_chunk, tafelbild_knoten, artefakt_ref, didaktische_funktion) | immer | Andere mat-IDs |
| 2 | rahmen/tafelbild.json | NUR referenzierte knoten + stundenfrage | immer | Andere Knoten |
| 3 | SUB_MATERIAL_[TYP].md | Vollstaendig | immer | Andere SUB_MATERIAL_*.md |
| 4 | SKRIPT | NUR referenzierten Chunk (§-Bereich) | immer | Andere Chunks |
| 5 | INHALTSBASIS | NUR zum Chunk gehoerende Mappe-Sektion | immer | Andere Mappen |
| 6 | rahmen/einstieg.json | problemstellung (C1b-Konsistenz) | immer | — |
| 7 | ARTEFAKT_INVENTAR | NUR Eintraege dieses Materials | **NUR WENN** artefakt_ref gesetzt | Gesamte Datei bei DT/QT/TB/ZL |
| 8 | rahmen/sicherung.json | kernerkenntnisse[] | **NUR WENN** didaktische_funktion = sicherung/transfer | Gesamte Datei sonst |

Fuer jedes mat-ID im MATERIAL_GERUEST:

```
1. MATERIAL_GERUEST lesen → mat-ID, typ, titel, skript_chunk, tafelbild_knoten,
   artefakt_ref, didaktische_funktion
2. tafelbild.json lesen → Relevante Knoten + Stundenfrage (P1 + P6)
3. SUB_MATERIAL_[TYP].md lesen (P1)
4. SKRIPT relevanten Chunk lesen (P1 + P6: NUR diesen Chunk)
5. INHALTSBASIS relevante Sektion lesen (P1 + P6: NUR diese Mappe)
6. einstieg.json lesen → problemstellung (P6: nur 1 Feld, fuer Rahmung)
7. NUR WENN artefakt_ref gesetzt: ARTEFAKT_INVENTAR lesen (P6: konditional)
8. NUR WENN didaktische_funktion = sicherung|transfer:
   sicherung.json lesen → kernerkenntnisse[] (M3c: "vom Ende her")
9. Material produzieren — Kerninhalt im Mittelpunkt (P3), Rahmen stuetzt
10. Q-Gate pruefen (MQ1-MQ5 + typ-spezifisch)
11. Bei PASS: mat-N-M.json schreiben
12. Bei FAIL: 1 Nachbesserung → erneut Q-Gate → bei erneutem FAIL: Finding in Q-GATE-LOG.md
13. Q-Gate-Ergebnis in Q-GATE-LOG.md schreiben
```

**Compaction-Failsafe:** Schritte 1-8 lesen IMMER aus Dateien, nie aus dem Kontext. Selbst wenn nach mat-2-3 Compaction stattfindet, beginnt mat-2-4 mit frischem Einlesen aller Eingaben.

#### Material-Cross-Konsistenz (Phase 2.1c) — NEU: Strategie-Audit S2/S3

**Zweck:** Prueft, ob die isoliert produzierten Materialien als kohaerentes Ganzes funktionieren. Schliesst die strukturelle Luecke, die Isolation erzeugt: Jeder Dispatch kennt den Sequenzkontext, aber nicht die tatsaechlichen Ergebnisse der anderen Dispatches.

**Schnittstellen-Vertrag (P6):**

| Input-Datei | Gelesene Felder | Zweck |
|---|---|---|
| materialien/mat-N-*.json (alle) | Volltext: titel, inhalt, ueberleitung_von, fachbegriffe, _meta.tafelbild_knoten_abgedeckt | Cross-Pruefung |
| rahmen/tafelbild.json | knoten[], stundenfrage | TB-Gesamtabdeckung |
| MATERIAL_GERUEST | Sequenzreihenfolge, didaktische_funktion pro mat-ID | Soll-Ist-Vergleich |

**Pruefachsen:**

1. **Sequenz-Kohaerenz:** Bilden die Materialien in Reihenfolge einen logischen Erkenntnisweg zum Tafelbild?
2. **Fachbegriff-Konsistenz:** Wird ein Begriff in allen Materialien identisch verwendet? Keine widersprüchlichen Definitionen durch isolierte Produktion?
3. **Ueberleitung-Kohaerenz:** Passt `ueberleitung_von` von Material N+1 zum tatsaechlichen Inhalt von Material N?
4. **TB-Knoten-Gesamtabdeckung:** Decken alle Materialien zusammen alle TB-Knoten ab? Kein Knoten unversorgt?

**Ablauf:**

```
1. Alle materialien/mat-N-*.json lesen (P1)
2. tafelbild.json lesen (P1)
3. MATERIAL_GERUEST lesen (P1)
4. 4 Pruefachsen durchfuehren
5. Bei PASS: Ergebnis in Q-GATE-LOG.md
6. Bei FAIL: Betroffene Materialien + Finding dokumentieren
   → User entscheidet ueber Nachbesserung oder Akzeptanz
```

**Hinweis:** Phase 2.1c ist KEIN separater Q-Gate-Agent pro Material (das wuerde 6 zusaetzliche Dispatches kosten). Es ist 1 Dispatch, der alle Materialien im Zusammenspiel prueft.

#### Aufgaben-Produktion (Phase 2.2)

**Schnittstellen-Vertrag Phase 2.2a (P6):**

| Read-Schritt | Input-Datei | Gelesene Felder | NICHT lesen |
|---|---|---|---|
| 1 | AGENT_RAETSEL.md | Vollstaendig | — |
| 2 | materialien/mat-N-*.json | NUR: id, typ, titel, _meta.tafelbild_knoten_abgedeckt | NICHT: inhalt (Volltext erst in 2.2b) |
| 3 | MATERIAL_GERUEST | didaktische_funktion pro mat-ID | — |
| 4 | rahmen/tafelbild.json | knoten[], merksaetze[], stundenfrage | — |
| 5 | DIDAKTIK_RAHMEN | NUR: AFB-Profil + Schwierigkeitskurve dieser Mappe | Andere Mappen |

**Begruendung Volltext-Ausschluss:** Orchestrator braucht keinen Material-Volltext. AFB-Zuweisung basiert auf TB-Knoten + Schwierigkeitskurve, Typauswahl auf Materialtyp + didaktische_funktion, Operationalisierungsziel auf TB-Knoten-Merksatz + AFB-Operator. Material-Zusammenfassungen im Konstruktionskontext: `titel + didaktische_funktion`. Einsparung: ~3600-5400 Token pro Mappe.

**Schnittstellen-Vertrag Phase 2.2b (P6):**

| Schritt | Input-Datei | Gelesene Felder | NICHT lesen |
|---|---|---|---|
| 1 | PROGRESSIONSPLAN.md | NUR Konstruktionskontext dieser Aufgabe | Andere Aufgaben-Kontexte |
| 2 | materialien/mat-N-X.json | Volltext (Ziel-Material) | — |
| 3 | MATERIAL_GERUEST (andere mat-IDs) | NUR titel + didaktische_funktion | Nicht: materialien/*.json inhalt (Token-Effizienz) |
| 4 | SUB_AUFGABE_[TYP].md | Vollstaendig | Andere SUB_AUFGABE_*.md |

```
Phase 2.2a: AGENT_RAETSEL Orchestration
  1. AGENT_RAETSEL.md lesen
  2. Alle materialien/mat-N-*.json lesen (NUR id, typ, titel, _meta — NICHT inhalt)
  3. MATERIAL_GERUEST lesen (didaktische_funktion pro mat-ID)
  4. tafelbild.json lesen (knoten, merksaetze, stundenfrage)
  5. DIDAKTIK_RAHMEN lesen (NUR AFB-Profil + Schwierigkeitskurve dieser Mappe — P6)
  5. Progressionsplan erstellen (5 Positionen, AFB-Zuweisung, Typauswahl)
  6. Pro Aufgabe: Konstruktionskontext generieren (inkl. Ziel-Material-ID, TB-Knoten, AFB)
  7. PROGRESSIONSPLAN.md schreiben

Phase 2.2b: Pro Aufgabe
  1. PROGRESSIONSPLAN.md lesen → NUR Konstruktionskontext dieser Aufgabe (P1 + P6)
  2. Ziel-Material .json lesen (Volltext) (P1)
  3. MATERIAL_GERUEST lesen (NUR titel + didaktische_funktion der anderen mat-IDs — P6)
  4. SUB_AUFGABE_[TYP].md lesen (P1)
  5. Aufgabe produzieren (nach Subagenten-Regeln)
  6. Q-Gate pruefen (A1-A7 + typ-spezifisch)
  7. aufgabe-N-M.json schreiben
  8. Q-Gate-Ergebnis in Q-GATE-LOG.md

Phase 2.2c: Cross-Konsistenz
  1. Alle aufgaben/aufgabe-N-*.json lesen
  2. Alle materialien/mat-N-*.json lesen (id, typ, titel — Volltext nur bei Findings)
  3. tafelbild.json lesen (knoten, merksaetze)
  4. Orchestrator-Q-Gate pruefen (A1 Gesamtbild, A3 Vollstaendigkeit, A5 Progression, A8 Aktivierung, A9 TB-Bezug)
  5. Ergebnis in Q-GATE-LOG.md
```

### 2.5 Uebergabe-Prompt fuer Phase 3 (Claude Code)

Der Phase-3-Prompt ist rein technisch:

```
Eingabe: docs/agents/artefakte/produktion/{game-id}/mappe-{N}/
  → rahmen/*.json, materialien/*.json, aufgaben/*.json

Aufgabe:
  1. Revert fehlgeschlagener Commit (falls vorhanden)
  2. Bilder herunterladen:
     - Thumbnail-URL aus ARTEFAKT_INVENTAR lesen (NICHT manuell konstruieren)
     - Download via Python urllib + Bot-User-Agent
     - Bei HTTP 404: API-Fallback (commons.wikimedia.org action=query → thumburl)
     - KEINE manuelle Thumb-URL-Konstruktion (Hash-Pfad nicht ableitbar → 404)
  3. Alle .json-Dateien lesen
  4. Mappe-Objekt assemblieren:
     meta.json → Mappe-Header
     einstieg.json → mappe.einstieg
     materialien/*.json → mappe.materialien[] (sortiert nach position)
     aufgaben/*.json → mappe.aufgaben[] (sortiert nach position)
     sicherung.json + tafelbild.json → mappe.sicherung
  5. data.json lesen (aktuell aus Repo)
  6. mappen[N-1] anfuegen (Mappe-Anhang-Prozedur)
  7. mappe-N.html erstellen
  8. JSON-Validierung
  9. git add + commit + push

KEINE Inhalte modifizieren. Nur zusammenbauen.
```

---

## 2.6 Audit-Befunde und Korrekturen

Externer Audit durchgefuehrt (docs/analyse/AUDIT_v4_ARCHITEKTUR_ERGEBNIS.md). Befunde priorisiert und adressiert:

### BLOCKER: SUB_AUFGABE_LUECKENTEXT.md Schema-Mismatch (B2-#1)

**Befund:** Subagent-Schema definiert `frage` als beschreibende Aufgabenstellung und `text_mit_luecken` als `___`-Platzhalter-Text. Engine (`_renderLueckentext`, Z.2279) liest jedoch NUR `aufgabe.frage` fuer die `___`-Aufteilung. `text_mit_luecken` wird ignoriert. Mappe 1 funktioniert nur, weil `frage` dort direkt `___` enthaelt (Schema-Verstoss, engine-kompatibel). Mappe 2 v2 folgte dem Schema korrekt — und scheiterte.

**Entscheidung:** Engine-Fix bevorzugt (Schema ist semantisch korrekt). Zwei Optionen:
- **Option A (empfohlen):** Engine anpassen: `var text = aufgabe.text_mit_luecken || aufgabe.frage || '';` — abwaertskompatibel, Schema wird kanonisch.
- **Option B (Fallback):** Schema anpassen: `frage` muss `___` enthalten, `text_mit_luecken` entfaellt.

**Umsetzung in Runde 2:** Option A als Engine-Patch in Phase-3-Uebergabe aufnehmen. SUB_AUFGABE_LUECKENTEXT.md behaelt aktuelles Schema.
**Betroffene Dateien:** `assets/js/escape-engine.js` (1 Zeile), ggf. Mappe-1-data.json retroaktive Anpassung.

### MEDIUM: _meta.zusammenfassung existiert nicht (B1-#4)

**Befund:** Phase-2.2b-Vertrag referenziert `_meta.zusammenfassung` fuer Nicht-Ziel-Materialien. Dieses Feld existiert weder in SUB_MATERIAL_*.md-Schemata noch in data.json. `_meta` hat `wortanzahl`, `fachbegriffe_eingefuehrt`, `tafelbild_knoten_abgedeckt`, `erarbeitbarkeits_check` — keine Zusammenfassung.

**Entscheidung:** Vertrag korrigieren. Statt `_meta.zusammenfassung` liest Phase 2.2b fuer Nicht-Ziel-Materialien: `titel` + `didaktische_funktion` (aus MATERIAL_GERUEST, nicht aus der .json-Datei). Das gibt ausreichend Kontext ohne Phantom-Felder.

**Umsetzung:** Schnittstellen-Vertrag Phase 2.2b Schritt 3 korrigiert (siehe unten). WORKFLOW_v4.md analog.

### MEDIUM: sicherung.json Vertrag unvollstaendig (B1-#5)

**Befund:** Engine rendert `zusammenfassung` (Z.1157-1162) und `ueberleitung` (Z.1165-1172). Phase-2.0-Vertrag enthaelt nur `typ, reflexionsimpuls, hefteintrag-ref, zitat`. Fehlende Felder: `zusammenfassung`, `ueberleitung`, `kernerkenntnisse[]`.

**Entscheidung:** Vertrag vervollstaendigen. Alle Engine-gerenderten Felder muessen im Vertrag stehen.

**Umsetzung:** Phase-2.0-Vertrag und Verzeichnisstruktur korrigiert (siehe unten). WORKFLOW_v4.md analog.

### MEDIUM: FRAGEBOGEN_mappe-N.md fehlt in v4 (B4-#7)

**Befund:** WORKFLOW_v2.md Phase 2.2c definiert FRAGEBOGEN_mappe-N.md als Output. WORKFLOW_v4 erwaehnt ihn nicht.

**Entscheidung:** Bewusst entfernt. FRAGEBOGEN war ein Planungs-Artefakt fuer potentielle User-Validierung. In v4 wird die Aufgaben-Validierung direkt auf den .json-Dateien durchgefuehrt. Der FRAGEBOGEN enthaelt keine Information, die nicht bereits in den aufgaben/*.json + PROGRESSIONSPLAN.md liegt.

### MEDIUM: SUB_AUFGABE_FREITEXT nicht-funktionale Felder (B2-#2)

**Befund:** Schema definiert `erwartete_begriffe`, `validierung_schwelle`, `teilfragen`. Engine prueft nur Fuzzy-Match auf `loesung`.

**Entscheidung:** Felder beibehalten als Prompt-Guidance fuer didaktische Qualitaet (der Subagent produziert bessere `loesung`-Strings, wenn er Teilfragen und erwartete Begriffe durchdenkt), aber als `_meta`-Felder markieren statt als Engine-Felder. Engine-Fix (Option A: `erwartete_begriffe`-Pruefung) wird als Post-MVP-Enhancement erfasst.

**Umsetzung in Runde 2:** SUB_AUFGABE_FREITEXT.md: `teilfragen`, `erwartete_begriffe`, `validierung_schwelle` in `_meta` verschieben. `loesung` als primaeres Engine-Feld klar dokumentieren.

### Strategische Erkenntnisse aus Audit

**S1: NICHT-lesen-Spalten (P6) sind aspirational, nicht erzwingbar.** Cowork's Agent-Tool uebergibt ganze Dateien, keine Feldselektionen. Die Vertraege bleiben als Prompt-Guidance (sie steuern, was in den Dispatch-Prompt geschrieben wird), aber nicht als technische Restriktion.

**S2: Checkpoint-Strategie empfohlen.** Bei 11+ Dispatches ist ein User-Gate nach Phase 2.1 (alle Materialien fertig) sinnvoll — als Compaction-Mitigation und als natuerlicher Validierungspunkt. Session-Split: Runde 3a = Rahmen + Materialien, Runde 3b = Aufgaben.

**S3: Phase-3-Pre-Flight um Integritaetspruefung erweitern.** Vor Assembly: Alle erwarteten .json-Dateien vorhanden? Valides JSON? Alle mat-IDs aus MATERIAL_GERUEST abgedeckt?

### Strategischer Audit: Empfehlungen und Umsetzung

Strategischer Audit durchgefuehrt (docs/analyse/AUDIT_v4_STRATEGIE_ERGEBNIS.md). 4 Empfehlungen:

**E1: User-Validierung nach Material 1-2 hochstufen auf PFLICHT (Bedingung 1)**

**Befund (S3/S6):** Q-Gate Kategorie 3 (didaktische Tiefe: Vergegenwaertigung, Altersangemessenheit) ist strukturell schwer selbst-evaluierbar. 6 isolierte Dispatches koennten einen systematischen Bias reproduzieren. Fruehe Kalibrierung durch User verhindert 6-fache Fehler-Reproduktion.

**Entscheidung:** PFLICHT fuer Erstanwendung (Mappe 2) nach den ersten 2 Materialien (Darstellungstext + 1 visuelles Material). Prueffrage: "Wuerde ein R7-Schueler diesen Text freiwillig lesen?" Ab Mappe 3 Herabstufung auf EMPFOHLEN moeglich.

**Umsetzung:** Phasenstruktur 2.1 aktualisiert. Runde 3a angepasst.

**E2: Phase 2.1c Material-Cross-Konsistenz einfuehren**

**Befund (S2/S6):** Cross-Konsistenz-Pruefung existiert nur fuer Aufgaben (Phase 2.2c), nicht fuer Materialien. Isolation erzeugt strukturelle Luecke: Kein Dispatch kennt die tatsaechlichen Ergebnisse der anderen Dispatches.

**Entscheidung:** 1 zusaetzlicher Dispatch nach allen Materialien. 4 Pruefachsen: Sequenz-Kohaerenz, Fachbegriff-Konsistenz, Ueberleitung-Kohaerenz, TB-Knoten-Gesamtabdeckung. Kein separater Q-Gate-Agent pro Material (waere 6 Dispatches statt 1).

**Umsetzung:** Neuer Abschnitt Phase 2.1c in Phasenstruktur + Dispatch-Detail eingefuegt.

**E3: Freitext-loesung als Keyword definieren (Bedingung 2)**

**Befund (S6 Schwachstelle 2):** Engine prueft Freitext nur via Fuzzy-Match auf `loesung`. Eine vollstaendige Musterantwort wird gegen R7-Schuelerantworten systematisch fehlschlagen. `erwartete_begriffe`/`teilfragen`/`validierung_schwelle` werden von Engine ignoriert.

**Entscheidung:** SUB_AUFGABE_FREITEXT.md Produktionsanweisung aendern: `loesung` muss ein kurzes Schluesselwort oder eine kurze Phrase sein (3-5 Woerter), nicht eine vollstaendige Musterantwort. Mittelfristig: Engine um `erwartete_begriffe`-Pruefung erweitern (Post-MVP).

**Umsetzung in Runde 2:** SUB_AUFGABE_FREITEXT.md anpassen (zusaetzlich zur _meta-Migration aus Audit B2-#2).

**E4: Mappe-N-Retrospektive (optional)**

**Befund (S4):** Kein systematischer Lerneffekt zwischen Mappen. Q-GATE-LOG dokumentiert Findings, aber kein Feedback-Loop in Folge-Mappe.

**Entscheidung:** Optionaler Schritt vor Phase 2 der Folge-Mappe (ab Mappe 3). 1 Absatz: "Was lief in Mappe N gut/schlecht? Worauf muss Phase 2 der Folge-Mappe achten?" Wird als Praeambel in Dispatch-Prompts aufgenommen. Aufwand minimal, Wert potenziell hoch.

**Umsetzung:** Kein sofortiger Eingriff — wird nach Mappe-2-Retrospektive (Runde 5) operationalisiert.

---

## 3. Betroffene Artefakte

### 3.1 Neue Dateien

| Datei | Inhalt | Owner |
|---|---|---|
| `docs/architektur/WORKFLOW_v4.md` | Kanonische Phasenstruktur v4 (verlustfreie Transformation aus v2/v3 — P7) | Cowork |
| `docs/agents/artefakte/produktion/` | Verzeichnisstruktur fuer Produktionsartefakte | Cowork |
| Uebergabe-Prompt Phase 3 | Rein technischer Assembly-Prompt | Cowork |

### 3.2 Zu aendernde Dateien

| Datei | Aenderung | Owner |
|---|---|---|
| `docs/agents/ORCHESTRATOR.md` | Phase 2 Ausfuehrungsort: Cowork (didaktisch) + Claude Code (technisch). Mappe-Anhang-Prozedur: Eingabe = Produktions-Verzeichnis | Cowork |
| `docs/agents/AGENT_MATERIAL.md` | Produktionsmodus: Output = .json-Dateien in Produktionsverzeichnis statt monolithischer data.json-Edit | Cowork |
| `docs/agents/AGENT_RAETSEL.md` | Ausfuehrungsort: Cowork. Output = PROGRESSIONSPLAN.md + .json-Dateien | Cowork |
| `docs/agents/SUB_AUFGABE_FREITEXT.md` | `teilfragen`, `erwartete_begriffe`, `validierung_schwelle` in `_meta` verschieben (Audit B2-#2) | Cowork |
| `assets/js/escape-engine.js` | Lueckentext-Fix: `text_mit_luecken \|\| frage` (Audit B2-#1 BLOCKER) | Claude Code (Phase 3) |
| `docs/projekt/STATUS.md` | Phase aktualisieren | Cowork |
| `docs/projekt/CHANGELOG.md` | Upgrade dokumentieren | Cowork |

### 3.3 Zu loeschende/ersetzende Dateien

| Datei | Aktion |
|---|---|
| `docs/uebergabe/UEBERGABE_MAPPE2_PRODUKTION.md` | Archivieren (veraltet) |
| `docs/uebergabe/UEBERGABE_MAPPE2_PRODUKTION_v2.md` | Archivieren (veraltet) |

### 3.4 Unveraenderte Dateien

| Datei | Begruendung |
|---|---|
| `docs/agents/SUB_MATERIAL_*.md` | Output-Schemata sind korrekt — nur der Ausfuehrungsort aendert sich |
| `docs/agents/SUB_AUFGABE_MC.md` | Unveraendert |
| `docs/agents/SUB_AUFGABE_ZUORDNUNG.md` | Unveraendert (`elemente`-Redundanz LOW, kein Fix noetig — Audit B2-#3) |
| `docs/agents/SUB_AUFGABE_LUECKENTEXT.md` | Unveraendert (Engine wird angepasst, nicht Schema — Audit B2-#1) |
| `docs/agents/SUB_AUFGABE_REIHENFOLGE.md` | Unveraendert |
| `docs/architektur/WORKFLOW_v2.md` | Bleibt als historische Referenz |
| `escape-games/*/data.json` | Struktur bleibt — nur Assembly-Methode aendert sich |

---

## 4. Implementierungsplan (Cowork-Runden)

### Runde 0: UPGRADE_PLAN + User-Validierung

- [x] Problem dokumentieren
- [x] Zielsystem definieren
- [x] Betroffene Artefakte identifizieren
- [x] User-Refinements R1-R3 einarbeiten
- [x] Externer Audit beauftragt und evaluiert

### Runde 1: WORKFLOW_v4.md erstellen [ABGESCHLOSSEN]

- [x] WORKFLOW_v4.md geschrieben (verlustfreie Transformation, 12 Sektionen)
- [x] Architekturprinzipien P1-P7 als Praeambel
- [x] Phase 2 komplett neu (Cowork-basierte Produktion)
- [x] Phase 3 als rein technische Assembly
- [x] Dispatch-Ablaeufe mit Compaction-Failsafe + Schnittstellen-Vertraege
- [x] Verifikation: 23 Pruefpunkte gegen WORKFLOW_v2 — alle bestanden
- [x] Audit-Befunde in UPGRADE_PLAN + WORKFLOW_v4 eingearbeitet

### Runde 2: Agenten-Anpassung + Audit-Fixes (mechanisch + strategisch) [ABGESCHLOSSEN]

- [x] **BLOCKER-Fix:** Engine-Patch `text_mit_luecken || frage` vorbereitet (in WORKFLOW_v4 + UPGRADE_PLAN dokumentiert, Ausfuehrung Runde 4)
- [x] SUB_AUFGABE_FREITEXT.md: `teilfragen`/`erwartete_begriffe`/`validierung_schwelle` in `_meta` verschoben (Audit B2-#2)
- [x] SUB_AUFGABE_FREITEXT.md: `loesung` als Keyword definiert (3-5 Woerter, kein Mustersatz) (Strategie-Audit E3)
- [x] ORCHESTRATOR.md: Phase-2-Ausfuehrungsort Cowork, Mappe-Anhang-Prozedur mit Produktionsverzeichnis, kanonische Referenz WORKFLOW_v4
- [x] AGENT_MATERIAL.md: Produktionsmodus Output = .json-Dateien, Dispatch-Sequenz mit P1-Failsafe, Phase 2.1c referenziert
- [x] AGENT_RAETSEL.md: Ausfuehrungsort Cowork, PROGRESSIONSPLAN.md + Q-GATE-LOG.md als Zwischenartefakte, FRAGEBOGEN entfernt
- [x] Verifikation: Querverweis-Check (8 Pruefachsen, 4 Inkonsistenzen gefunden + korrigiert)

### Runde 3a: Erster Prozesstest (Phase 2.0 — 2.2c + Phase 3 in Cowork) [ABGESCHLOSSEN]

- [x] Produktionsverzeichnis anlegen (2026-04-01)
- [x] Pre-Flight: git revert c9eb9ec, MATERIAL_GERUEST validiert, HANDOFF_PHASE2.md erstellt
- [x] Repo-Update: 10 Commits (85 Dateien) auf origin/main gepusht
- [x] Testplan erstellt: Post-hoc-Evaluation + Token-Messung als Ebene 4
- [x] Produktion komplett (Rahmen, 6 Materialien, 5 Aufgaben, Cross-Konsistenz)
- [x] Phase 3 in Cowork ausgefuehrt (Architektur-Verletzung, aber funktional korrekt)

**Ergebnis (docs/analyse/RUNDE_3a_ERGEBNIS.md):**
- Ebene 1 PARTIAL PASS: 3 HIGH (Batch, kein Q-GATE-LOG, kein TAFELBILD), 5 MEDIUM
- Ebene 2 PASS: Artefaktqualitaet korrekt
- Ebene 3 NICHT GETESTET: Kein Session-Split erzwungen
- Ebene 4 BASELINE: ~58.000 Token, WORKFLOW nie gelesen, data.json als Template

### Runde 3a-Eval: Post-hoc-Evaluation [ABGESCHLOSSEN]

- [x] Dispatch-Protokoll ausgefuellt
- [x] Ebene 1-3 ausgewertet
- [x] Ebene 4: Token-Profil erstellt
- [x] Optimierungsempfehlungen abgeleitet (→ 3a-Opt)
- [x] `docs/analyse/RUNDE_3a_ERGEBNIS.md` geschrieben

### Runde 3a-Opt: Token-Optimierung — Vertrags-Extraktion [ABGESCHLOSSEN]

- [x] Token-Profil Runde 3a analysiert (Hypothese bestaetigt)
- [x] 6 Vertragsdateien aus WORKFLOW_v4.md extrahiert (docs/architektur/vertraege/)
- [x] ORCHESTRATOR.md: Verweis auf Vertraege, Dispatch-Isolation (P4) explizit, Q-GATE-LOG Pflicht
- [x] WORKFLOW_v4.md: Vertrags-Extraktion-Header, Phase-2-Abschluss-Sektion
- [x] Goldstandard-Rolle neu definiert: data.json = MVP, NICHT Template
- [x] TAFELBILD_Mappe2.md retroaktiv erstellt (Phase 0.4 Prozess)
- [x] HANDOFF_PHASE2.md nach docs/analyse/ verschoben

### Runde 3b: Zweiter Prozesstest mit Optimierungen [ABGESCHLOSSEN]

- [x] Pre-Flight: Git-State bereinigt, KICKOFF-Prompt erstellt
- [x] **Session 1 (Cowork):** Phase 2.0 (Rahmen, 4 JSONs, Q-GATE-LOG), Phase 2.1 (6 Materialien, alle isolierte Dispatches), E1 User-Validierung PASS, Phase 2.1c Cross PASS
- [x] **Session-Split** am Checkpoint (Audit S2)
- [x] **Session 2 (Cowork):** Phase 2.2a (Progressionsplan), Phase 2.2b (5 Aufgaben, alle isoliert), Phase 2.2c Cross PASS, Phase-2-Abschluss mit UEBERGABE_PROMPT
- [x] Manueller Git-Commit (18 Dateien) durch User
- [x] **Session 3 (Claude Code):** Phase 3 Assembly (Engine-Patch, Bild-Download, data.json, mappe-2.html, Validierung 8/8 PASS, Commit 0c0e1ee)
- [x] Browser-Validierung: Mappe 2 live, technisch funktional

**Ergebnis (docs/analyse/RUNDE_3b_ERGEBNIS.md):**
- Ebene 1 PASS: Alle 3a-Befunde behoben (P4 isoliert, P5 Q-GATE-LOG, TAFELBILD vorhanden, kein data.json-Read)
- Ebene 2 PASS: Alle Q-Gates PASS
- Ebene 3 PASS: Session-Split durchgefuehrt, kein Informationsverlust
- Ebene 4 VERBESSERT: ~57.300 Token verteilt auf 3 Kontexte (vs. ~58.000 in 1 Kontext)
- 5 neue Befunde: ARTEFAKT_INVENTAR-Luecke (MEDIUM), Git-Roundtrip (HIGH operativ), Worktree-Verwirrung (LOW), tafelbild.json-Listing (LOW), Wikimedia-404 (LOW)
- 8 Optimierungskandidaten (OPT-1 bis OPT-8): inkrementell, keine Architektur-Aenderungen

**Qualitaetsbefunde:** Mappe 2 ist live, aber inhaltliche Qualitaetsprobleme identifiziert. Noch zu dokumentieren und zu adressieren.

### Runde 4: Qualitaetsbefunde Mappe 2 + Prozess-Optimierungen [ABGESCHLOSSEN — Kern]

**Status:** Qualitaetsbefunde dokumentiert. Prozess-Fixes verankert. Engine-Patches deployed. Verbleibend: OPT-1 bis OPT-8, 3 offene architektonische Entscheidungen.

- [x] Qualitaetsbefunde dokumentieren (Runde 4a: Browser-Audit + User-Review → 10 Findings, 5 Schwachstellen)
- [x] Engine-Patches via Claude Code (Runde 4b): Reihenfolge optionen-Fallback, Freitext Keyword-Array, mat-2-6 typ, mat-2-1 Quellenangabe, scpl-Duplikate
- [x] Prozess-Fixes in Subagenten (MQ3/MQ3b Material-Referenz-Verbot in 5x SUB_AUFGABE + AGENT_RAETSEL)
- [x] Quellenangabe-Hygiene in 7x SUB_MATERIAL
- [x] Vertrags-Updates (VERTRAG_2-0 Disjunktionsregel, VERTRAG_2-2b Engine-Kompatibilitaet)
- [ ] OPT-1 bis OPT-8 aus RUNDE_3b_ERGEBNIS.md priorisieren und umsetzen
- [ ] ARTEFAKT_INVENTAR fuer Mappe 2 nachpflegen (F-3b-INVENTAR)
- [ ] Uebergabe-Prompt-Template standardisieren (OPT-4, OPT-5, OPT-7)
- [ ] Wortlimit-Inkonsistenz SUB_MATERIAL_DT vs. QUALITAETSKRITERIEN bereinigen (OPT-6)
- [ ] WORKFLOW-Read am Abschluss eliminieren (OPT-1)
- [ ] Q-M2-03: Ueberleitungen — Architektur-Entscheidung (neuer Dispatch vs. Cross-Integration)
- [ ] Q-M2-05: Hefteintrag-Timing — Phase-Verschiebung oder Zweitpass
- [ ] GUETEKRITERIEN_HEFTEINTRAG.md erstellen

### Runde 5: Retrospektive + Skill-Update

- [ ] Mappe-2-Retrospektive (Strategie-Audit E4): Erkenntnisse als Praeambel fuer Mappe-3-Dispatches
- [ ] projekt-website Skill: Orchestrierung der neuen Phasenabfolge anpassen
- [ ] WORKFLOW_v4 finalisieren (Vertrags-Extraktion als Standard bestaetigen)
- [ ] Naechstes Game oder Mappe 3 planen

---

## 5. Risiken und Mitigationen

| Risiko | Wahrscheinlichkeit | Mitigation |
|---|---|---|
| Token-Budget in Cowork: 11+ Dispatches mit je 3000-5000 Token Input | HOCH (Audit A4-#1) | **Checkpoint-Strategie (S2):** Session-Split nach Phase 2.1 (Materialien). Runde 3a = Rahmen + Materialien, Runde 3b = Aufgaben. PROGRESSIONSPLAN.md als Uebergabe-Artefakt |
| Token-Overhead durch WORKFLOW_v4-Volllektuere: ~7.285 Tok pro Dispatch, ~15% relevant | HOCH (Runde 3a-Eval, 2026-04-01) | **Vertrags-Extraktion (Runde 3a-Opt):** 6 phasen-spezifische Vertragsdateien statt WORKFLOW_v4 komplett. Erwartete Einsparung ~68% pro Dispatch |
| Compaction waehrend Material-Produktion in Cowork | Niedrig-Mittel | P1-Failsafe: Jeder Schritt liest aus Dateien. Bereits geschriebene .json-Dateien bleiben erhalten |
| Fehlende Integritaetspruefung Phase 2 → Phase 3 (Audit A4-#2) | Mittel | **Phase-3-Pre-Flight erweitert (S3):** Alle erwarteten .json vorhanden? Valides JSON? Alle mat-IDs aus MATERIAL_GERUEST abgedeckt? |
| .json-Dateien in Cowork-Workspace nicht identisch mit Git-Repo | Niedrig | Dateien liegen in docs/ (Cowork-Domaene). Kein Sync-Problem. Claude Code liest sie per Pfad |
| Assembly in Claude Code produziert fehlerhafte Zusammenstellung | Niedrig | Mechanischer Prozess. Validierungsschritte im Prompt. Python-basierte Checks |
| Agent-Tool-Verhalten aendert sich (Audit A4-#4) | Niedrig | Erste Dispatch-Ergebnisse in Runde 3 pruefen: Ist Isolation tatsaechlich gegeben? Notfallplan: CC-Agent-Tool als Alternative |
| Kein Rollback bei Aufgaben-FAIL-Kaskade (Audit A4-#5) | Niedrig | Aufgaben sind isolierte .json-Dateien (P4). Einzelne Aufgabe kann geloescht und neu-dispatched werden, ohne andere zu invalidieren. PROGRESSIONSPLAN.md bleibt stabil |

---

## 6. Abgrenzung

### Was v4 AENDERT
- Ausfuehrungsort Phase 2: Claude Code → Cowork
- Zwischenergebnis-Format: Kein monolithischer data.json-Edit → .json-Dateien pro Artefakt
- Phase 3 (Claude Code): Von "produziere alles" zu "assembliere fertige Artefakte"
- Compaction-Robustheit: P1 Read-from-Artifact als Architekturprinzip

### Was v4 NICHT AENDERT
- Phase 0 (Inhaltliche Vorarbeit): Unveraendert
- Phase 1 (Material-Design): Unveraendert
- Subagenten-Prompts (SUB_MATERIAL_*, SUB_AUFGABE_*): Inhaltlich unveraendert (nur Ausfuehrungsort)
- Engine-Code: 1 Fix (Lueckentext `text_mit_luecken || frage` — Audit BLOCKER)
- data.json-Schema: Keine Aenderungen
- File-Ownership-Regel: Cowork → docs/, Claude Code → assets/ + escape-games/

---

## 7. Erfolgskriterien

1. Mappe 2 wird erfolgreich produziert mit dokumentierten Q-Gate-Logs pro Material und Aufgabe
2. Jeder Q-Gate-Log zeigt nachweislich, welcher SUB_*-Prompt angewendet wurde
3. Aufgaben-JSON-Felder sind Engine-kompatibel (kein `text_mit_luecken` statt `frage`, etc.)
4. Cross-Konsistenz-Pruefung dokumentiert (A1, A3, A5, A8, A9)
5. Claude-Code-Phase enthaelt KEINE didaktischen Entscheidungen (rein mechanisch)
6. Bei Compaction waehrend der Cowork-Session: Bereits geschriebene .json-Dateien bleiben korrekt erhalten
7. Browser-Validierung bestanden (Rendering, Aufgaben-Flow, Tafelbild, Bilder)
8. Schnittstellen-Vertraege (P6) dokumentiert: Jeder Dispatch-Schritt hat explizite Input/Output-Tabelle
9. Verlustfreie Transformation (P7) verifiziert: Alle L1-L7, Q-Gates, JSON-Encoding-Regeln, Engine-Typ-Mapping aus WORKFLOW_v2/v3 in WORKFLOW_v4 nachweisbar
10. Phase 2.1c Material-Cross-Konsistenz durchgefuehrt und dokumentiert (4 Pruefachsen)
11. User-Validierung nach Material 1-2 durchgefuehrt (PFLICHT fuer Mappe 2)
