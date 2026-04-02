# Vertrag Phase 2.1: Material-Produktion

**Extrahiert aus:** WORKFLOW_v4.md (Commit d627924, 2026-04-01)
**Prinzipien:** P1 (Read-from-Artifact) · P3 (Rahmen stuetzt Inhalt) · P4 (1 Material = 1 Dispatch = 1 .json) · P5 (Q-Gate Pflicht) · P6 (Praezise Schnittstellen)
**Dispatch-Isolation:** Jedes Material wird als EIGENE Nachricht produziert. NICHT mehrere Materialien parallel.

---

## Subagenten-Zuordnung

| Material-Typ | Engine-Typ | Prompt-Datei |
|---|---|---|
| darstellungstext | darstellungstext | SUB_MATERIAL_DARSTELLUNGSTEXT.md |
| quellentext | quellentext | SUB_MATERIAL_QUELLENTEXT.md |
| tagebuch | quellentext | SUB_MATERIAL_TAGEBUCH.md |
| zeitleiste | zeitleiste | SUB_MATERIAL_ZEITLEISTE.md |
| bildquelle | bildquelle | SUB_MATERIAL_BILDQUELLE.md |
| karte | bildquelle | SUB_MATERIAL_KARTE.md |
| statistik | zeitleiste/bildquelle | SUB_MATERIAL_STATISTIK.md |

## Schnittstellen-Vertrag (P6) — Decision-Tree

Jeder Read-Schritt hat genau eine deterministische Bedingung. Kein "ggf.", kein "bei Bedarf".

### Read-Schritt 1: MATERIAL_GERUEST (IMMER)

```
Datei:   docs/agents/artefakte/MATERIAL_GERUEST_{game-id}_Mappe{N}.md
Lesen:   NUR die Zeile des aktuellen mat-ID
Felder:  typ, titel, skript_chunk, tafelbild_knoten[], artefakt_ref[], didaktische_funktion
Output:  → Variablen: TYP, TITEL, CHUNKS[], TB_KNOTEN[], ARTEFAKT_REFS[], DIDAKT_FN
```

### Read-Schritt 1b: SEQUENZKONTEXT (IMMER)

```
Datei:   MATERIAL_GERUEST (selbe Datei wie 1, anderer Abschnitt)
Lesen:   Material-Entwurf-Tabelle — ALLE Zeilen (nicht nur aktuelles Material)
Felder:  id, typ, titel, tafelbild_knoten, didaktische_funktion — pro Material
Ableiten:
  IF position == 1:
    VORHERIGES = null
    NAECHSTES  = {id, typ, Kerninhalt} der naechsten Zeile
  ELIF position == letzte:
    VORHERIGES = {id, typ, Kerninhalt} der vorherigen Zeile
    NAECHSTES  = null
  ELSE:
    VORHERIGES = {id, typ, Kerninhalt} der vorherigen Zeile
    NAECHSTES  = {id, typ, Kerninhalt} der naechsten Zeile

  VORAUSGESETZTES_WISSEN  = TB-Knoten aller Materialien mit Position < aktuelle
  NOCH_NICHT_EINGEFUEHRT  = TB-Knoten aller Materialien mit Position > aktuelle

Output:  → SEQUENZKONTEXT-Block fuer Subagent (Format: SUB_MATERIAL_*.md §Eingabe: Sequenzkontext)
```

**Zweck:** Loest das BLOCKIERENDE Finding aus Q1 (Sequenzkontext-Interface fehlte). Der Subagent erhaelt jetzt explizit: Position, Vorgaenger, Nachfolger, vorausgesetztes Wissen, gesperrte Begriffe. Quelle ist MATERIAL_GERUEST — kein separates Dokument noetig.

### Read-Schritt 2: HEFTEINTRAG (IMMER)

```
Datei:   rahmen/hefteintrag.json
Schema:  hefteintrag-schema.json
Lesen:   stundenfrage + NUR die Knoten aus TB_KNOTEN[] + zugehoeriger SCPL-Schritt

SCPL-Zone-Mapping (siehe §SCPL-Zone-Mapping unten):
  Fuer jeden TB-Knoten aus TB_KNOTEN[]:
    zone = SCPL_ZONE_MAP[knoten_id]
    IF zone == "situation":   → lese scpl.situation
    ELIF zone == "complication[i]": → lese scpl.complication[i]
    ELIF zone == "problem":   → lese scpl.problem
    ELIF zone == "loesung":   → Fehler: loesung ist kein Erarbeitungsschritt, nur Sicherungs-Material

Output:  → STUNDENFRAGE, KNOTEN_DETAILS[], SCPL_KONTEXT[]
```

### Read-Schritt 3: SUB_MATERIAL_[TYP].md (IMMER)

```
Datei:   docs/agents/SUB_MATERIAL_{TYP}.md
         TYP = Mapping aus Subagenten-Zuordnung (siehe oben)
Lesen:   Vollstaendig
Output:  → Subagenten-Prompt
NICHT:   Andere SUB_MATERIAL_*.md
```

### Read-Schritt 4: SKRIPT (IMMER)

```
Datei:   docs/agents/artefakte/SKRIPT_{game-id}.md
Lesen:   NUR den/die in CHUNKS[] referenzierten §-Abschnitt(e)
         Beispiel: skript_chunk = "§1-§2" → lese §1 und §2
Output:  → SKRIPT_TEXT (narrativer Kontext fuer Materialproduktion)
NICHT:   Andere §-Abschnitte, andere Mappen
```

### Read-Schritt 5: INHALTSBASIS (IMMER)

```
Datei:   docs/agents/artefakte/INHALTSBASIS_{game-id}.md
Lesen:   NUR die Mappe-N-Sektion
Output:  → FAKTEN_BASIS (Recherche-Material, Quellen, Daten)
NICHT:   Andere Mappen-Sektionen
```

### Read-Schritt 6: EINSTIEG (IMMER)

```
Datei:   rahmen/einstieg.json
Schema:  rahmen-einstieg-schema.json
Lesen:   problemstellung
Zweck:   C1b-Konsistenz-Pruefung + narrative Rahmung
Output:  → PROBLEMSTELLUNG
```

### Read-Schritt 7: ARTEFAKT_INVENTAR (KONDITIONAL)

```
Bedingung: ARTEFAKT_REFS[] ist NICHT leer
  TRUE  → Datei: docs/agents/artefakte/ARTEFAKT_INVENTAR_{game-id}.md
           Lesen: NUR Eintraege deren ID in ARTEFAKT_REFS[] vorkommt
           Output: → ARTEFAKT_DETAILS[] (Dateiname, Lizenz, Beschreibung, Quelle)
  FALSE → Schritt UEBERSPRINGEN. Kein Read.

Typ-Erwartung:
  BQ/KA:  ARTEFAKT_REFS[] typischerweise gesetzt (Bild-Dateien)
  ST:     ARTEFAKT_REFS[] moeglicherweise gesetzt (Datenquelle)
  DT/QT/TB/ZL: ARTEFAKT_REFS[] typischerweise leer → Schritt entfaellt
```

### Read-Schritt 8: KERNERKENNTNISSE (KONDITIONAL)

```
Bedingung: DIDAKT_FN ∈ {"sicherung", "transfer"}
  TRUE  → Datei: rahmen/hefteintrag.json
           Schema: hefteintrag-schema.json
           Lesen: NUR scpl.loesung[] (Kernerkenntnisse)
           Zweck: M3c "Vom Ende her" — Sicherungs-Material muss Kernerkenntnisse transportieren
           Output: → KERNERKENNTNISSE[]
  FALSE → Schritt UEBERSPRINGEN. Kein Read.

Typ-Erwartung:
  einstieg:     typischerweise mat-N-1 → Schritt entfaellt
  erarbeitung:  Grossteil der Materialien → Schritt entfaellt
  vertiefung:   selten → Schritt entfaellt
  sicherung:    typischerweise letztes Material → Schritt aktiv
  transfer:     sehr selten → Schritt aktiv
```

### Fallback-Regeln

```
Datei nicht gefunden:
  Schritt 1 (MATERIAL_GERUEST):   → ABBRUCH. Ohne Geruest kein Dispatch moeglich.
  Schritt 2 (hefteintrag.json):    → ABBRUCH. Phase 2.0 muss zuerst laufen.
  Schritt 3 (SUB_MATERIAL_*.md):   → ABBRUCH. Subagenten-Prompt fehlt.
  Schritt 4 (SKRIPT):              → WARNUNG + weiter. Material-Produktion ohne narrativen Kontext moeglich aber degradiert.
  Schritt 5 (INHALTSBASIS):        → WARNUNG + weiter. Material-Produktion ohne Fakten-Basis moeglich aber degradiert.
  Schritt 6 (einstieg.json):       → WARNUNG + weiter. C1b-Pruefung entfaellt.
  Schritt 7 (ARTEFAKT_INVENTAR):   → WARNUNG + weiter. Bild-Details fehlen, BQ/KA-Produktion degradiert.
  Schritt 8 (hefteintrag.json):    → Gleiche Datei wie Schritt 2, kann nicht fehlen wenn Schritt 2 erfolgreich.
```

**NICHT lesen:** data.json (kein Goldstandard-Template), andere Mappen-Artefakte, WORKFLOW_v4.md (dieser Vertrag genuegt)

## Dispatch-Ablauf (pro Material)

```
 1.  Read-Step 1:  MATERIAL_GERUEST → TYP, TITEL, CHUNKS[], TB_KNOTEN[], ARTEFAKT_REFS[], DIDAKT_FN
 1b. Read-Step 1b: SEQUENZKONTEXT → VORHERIGES, NAECHSTES, VORAUSGESETZTES_WISSEN, NOCH_NICHT_EINGEFUEHRT
 2.  Read-Step 2:  hefteintrag.json → STUNDENFRAGE, KNOTEN_DETAILS[], SCPL_KONTEXT[] (via SCPL-Zone-Mapping)
 3.  Read-Step 3:  SUB_MATERIAL_[TYP].md → Subagenten-Prompt
 4.  Read-Step 4:  SKRIPT → SKRIPT_TEXT (nur relevante §-Abschnitte)
 5.  Read-Step 5:  INHALTSBASIS → FAKTEN_BASIS (nur Mappe-N-Sektion)
 6.  Read-Step 6:  einstieg.json → PROBLEMSTELLUNG
 7.  Read-Step 7:  IF ARTEFAKT_REFS[] nicht leer: ARTEFAKT_INVENTAR → ARTEFAKT_DETAILS[]
 8.  Read-Step 8:  IF DIDAKT_FN ∈ {sicherung, transfer}: hefteintrag.json → KERNERKENNTNISSE[]
 9.  Material produzieren — Kerninhalt im Mittelpunkt, Rahmen stuetzt (P3)
     Subagent erhaelt: SEQUENZKONTEXT + STUNDENFRAGE + KNOTEN_DETAILS + SCPL_KONTEXT + SKRIPT_TEXT
                       + FAKTEN_BASIS + PROBLEMSTELLUNG + [ARTEFAKT_DETAILS] + [KERNERKENNTNISSE]
     Subagent liefert Content-Felder: inhalt, quelle, [bildunterschrift, lizenz bei BQ/KA], _meta.
     Dispatcher ergaenzt Struktur-Felder aus MATERIAL_GERUEST: id, typ, titel, position,
     didaktische_funktion, voraussetzung, ueberleitung_von, sequenz_kontext.
     Vollstaendiges Material MUSS dem Schema entsprechen: docs/architektur/schemata/material-output-schema.json
10. Schema-Validierung: Output gegen material-output-schema.json pruefen.
    Bei Schema-Fehler: korrigieren BEVOR Q-Gate.
11. Q-Gate pruefen — Mechanik: docs/architektur/Q-GATE-MECHANIK.md (§3 Aggregation, §4 Nachbesserung, §6 Output-Format).
    Katalog: Q-GATE-MECHANIK.md §7.1 (Material-Q-Gate). Pruef-Reihenfolge: SCHEMA zuerst, dann MQ1-MQ6 + M1-M12 + TYP-*.
12. Bei GESAMT-PASS oder GESAMT-WARN: materialien/mat-N-M.json schreiben (P4)
13. Bei GESAMT-FAIL: 1 Nachbesserung (§4) → erneut Q-Gate → bei FAIL: Finding in Q-GATE-LOG.md
14. Q-Gate-Ergebnis in Q-GATE-LOG.md schreiben (Format: Q-GATE-MECHANIK.md §8)
```

## Q-Gate

**Mechanik:** `docs/architektur/Q-GATE-MECHANIK.md` (Bewertungsstufen, Aggregation, Nachbesserung, Output-Format)
**Katalog:** Q-GATE-MECHANIK.md §7.1 — 12 Kriterien in 5 Klassen (SCHEMA, KONSISTENZ, FORM, INHALT, DIDAKTIK)
**Kriterien-Detail:** `docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md` (M1-M12 + typ-spezifisch)

## Output

```
materialien/mat-N-M.json   # id, typ, titel, inhalt (HTML), quelle, position,
                            # didaktische_funktion, voraussetzung, ueberleitung_von,
                            # sequenz_kontext, lizenz (bei BQ/KA/ST)
```

## User-Validierung

**Nach Material 1-2: PFLICHT (Mappe 2)** (Strategie-Audit E1)
Kalibrierung: Ton, Sprachregister, Vergegenwaertigungstiefe.
Ab Mappe 3: Herabstufung auf EMPFOHLEN moeglich.

## Quellenangaben

Als `<cite>`-Elemente in Material-HTML einbetten (L6). Kein separates Array.

## Compaction-Failsafe (P1)

Schritte 1-8 lesen IMMER aus Dateien, nie aus dem Kontext. Bereits geschriebene .json-Dateien bleiben erhalten. Selbst nach Compaction beginnt der naechste Dispatch mit frischem Einlesen.

## SCPL-Zone-Mapping

Das Mapping ordnet jeden TB-Knoten einer SCPL-Zone zu. Es wird pro Mappe aus dem TAFELBILD-Artefakt abgeleitet.

**Ableitungsregel:**

```
Fuer jeden TB-Knoten kN-M in TAFELBILD_Mappe_N.md:
  1. Finde den Knoten in der JSON-Repraesentation (hefteintrag.json)
  2. Pruefe, in welcher SCPL-Sektion der Fachbegriff des Knotens vorkommt:
     - scpl.situation.fachbegriffe[] enthält kN-M.fachbegriff → Zone = "situation"
     - scpl.complication[i].fachbegriff == kN-M.fachbegriff → Zone = "complication[i]"
     - scpl.problem.fachbegriff == kN-M.fachbegriff → Zone = "problem"
  3. Kein Match → Pruefe Verbindungen: Knoten ohne direkten SCPL-Match gehoeren zur
     Zone ihres Quell-Knotens (Verbindung "von → nach")
```

**Beispiel: Mappe 3 (Kriegsbegeisterung 1914)**

| TB-Knoten | Fachbegriff | SCPL-Zone | Begruendung |
|---|---|---|---|
| k3-1 | Kriegsbegeisterung (Augusterlebnis) | complication[0] | scpl.complication[0].fachbegriff = "Kriegsbegeisterung (Augusterlebnis)" |
| k3-2 | Patriotismus / Nationalismus | complication[1] | scpl.complication[1]: "Vier Gruende treiben die Begeisterung" — Patriotismus ist Grund 1 |
| k3-3 | Propaganda ("Verteidigungskrieg") | complication[1] | scpl.complication[1].fachbegriff = "Propaganda" |
| k3-4 | Gesellschaftlicher Druck | complication[1] | scpl.complication[1]: Druck ist Grund 3 der vier Gruende |
| k3-5 | Gegenstimmen | complication[2] | scpl.complication[2].fachbegriff = "Gegenstimmen" |
| k3-6 | Burgfrieden | problem | scpl.problem.fachbegriff = "Burgfrieden" |

**Nutzung in Read-Step 2:** Fuer mat-3-1 (TB_KNOTEN = [k3-1, k3-2, k3-3, k3-4]) liest der Dispatcher:
- scpl.complication[0] (fuer k3-1)
- scpl.complication[1] (fuer k3-2, k3-3, k3-4)
- NICHT: scpl.situation, scpl.problem, scpl.complication[2] (nicht referenziert)

---

## Bekannte Limitationen

- Read-Schritt 7 (konditional): Bedingung ist ARTEFAKT_REFS[] nicht leer. DT, QT, TB, ZL haben typischerweise keine artefakt_ref → Schritt 7 entfaellt. Spart 3-4 Reads pro Mappe.
- Read-Schritt 8 (konditional, M3c): Bedingung ist DIDAKT_FN ∈ {sicherung, transfer}. Nur letztes Material der Sequenz erhaelt Kernerkenntnisse.
- SCPL-Zone-Mapping muss pro Mappe einmalig erstellt werden (Dispatcher-Aufgabe vor erstem Material-Dispatch). Bei Mappe 3 sind es 6 Knoten → 3 Zonen.
- Wenn kein separates TAFELBILD-Artefakt existiert (pre-v3 Games): SCPL-Daten aus rahmen/hefteintrag.json (Phase 2.0 Output).
