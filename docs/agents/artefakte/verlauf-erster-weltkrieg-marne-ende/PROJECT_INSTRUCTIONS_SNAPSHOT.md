# Escape-Game-Produktion — Projektanweisungen (State Machine)

**Zweck:** Diese Datei wird im "Project Instructions"-Feld eines Cowork-Projects verlinkt. Sie wird bei JEDER Session automatisch eingelesen und steuert den gesamten Lebenszyklus einer Game-Produktion.

**Version:** 2.7 (v3.11 Deploy-State-Machine-Binding — Phase 3 wird zu 3.0 Assembly + 3.1 Deploy-Preparation + 3.2 Live-Go. Die informelle Deploy-Kette wird an VERTRAG_PHASE_3-1_DEPLOY.md + Q-Gate DEPLOY-01..05 gebunden. User-Review-Gate via CSS-Staging-Flag. Vorgaenger: v2.6 v3.10.1 State-Advance-Vertrag.)
**Architektur-Prinzip:** Zustandstragende Steuerungsinstanz und einzige Routing-Quelle. Aktualisiert sich selbst nach jeder Phase. Enthaelt ALLE steuerungsrelevanten Constraints (Sequenz, Ort, Vertrag, STOP-Marker, Isolation). Verhindert Drift bei Compaction und Session-Splits. State-Advances sind strukturell an Q-GATE-LOG-Existenz + Gesamturteil=PASS gebunden (v3.10.1).

---

## ═══ AKTUELLER ZUSTAND ═══

```
STATUS: PRODUKTION_PHASE_2_MAPPE_2
GAME_ID: verlauf-erster-weltkrieg-marne-ende
LETZTE_PHASE: Zeile 9 — 2.0 Rahmen-Produktion Mappe 2 PASS (meta/hefteintrag/einstieg/sicherung/mappenabschluss_zone.json; C1b identity PASS; 6 knoten, 6 verbindungen, 3 loesung-Kernerkenntnisse)
NAECHSTE_AKTION: 2.1 Material-Produktion Mappe 2 (SUB_MATERIAL_* Dispatch-Isolation P4, 5 Materialien aus MATERIAL_GERUEST M2; Strategie-Audit E1 STOP nach ersten 2 Materialien)
MAPPEN_TOTAL: 4
MAPPEN_ABGESCHLOSSEN: 1
```

> **WICHTIG:** Der obige Zustandsblock ist die Single Source of Truth fuer den Produktionsfortschritt dieses Games. Er wird nach JEDER abgeschlossenen Phase automatisch aktualisiert. Bei Compaction oder Session-Split ist dieser Block ausreichend, um den Prozess praezise fortzusetzen.

---

## ═══ DUAL-ROOT-ARCHITEKTUR ═══

Dieses Produktions-Setup arbeitet mit ZWEI Repositories als Context-Folder:

```
GENERATOR = escape-game-generator/     ← DIESES Repo (Agenten, Vertraege, Checklisten LESEN)
TARGET    = weitergehts-online/         ← Ziel-Repo (Artefakte SCHREIBEN, Engine-Code LESEN)
```

**PFAD-AUFLOESUNG (KRITISCH — lies das ZUERST):**

In einer Cowork-Session werden Context-Folder unter `/sessions/[session-name]/mnt/` gemountet. Die tatsaechlichen Pfade sind session-spezifisch. Du MUSST deshalb als ALLERERSTES die Mount-Pfade ermitteln:

```bash
ls /sessions/*/mnt/
```

Daraus die beiden Repos identifizieren:
- GENERATOR_PATH = /sessions/[session-name]/mnt/escape-game-generator
- TARGET_PATH = /sessions/[session-name]/mnt/weitergehts-online

Ab diesem Punkt: ALLE Dateioperationen mit ABSOLUTEN Pfaden:
- Generator-Dateien: `{GENERATOR_PATH}/agents/ORCHESTRATOR.md` (nicht einfach `agents/ORCHESTRATOR.md`)
- Target-Dateien: `{TARGET_PATH}/docs/agents/artefakte/[game-id]/` (nicht einfach `docs/agents/artefakte/`)

**Pfad-Konvention:**
- Pfade mit `agents/`, `architektur/`, `checklisten/` → GENERATOR-Repo
- Pfade mit `docs/`, `escape-games/`, `assets/` → TARGET-Repo

---

## ═══ GAME-PARAMETER ═══

| Parameter | Quelle | Wert |
|---|---|---|
| `thema` | User | Verlauf des Ersten Weltkriegs ab Schlacht an der Marne bis Ende |
| `jahrgangsstufe` | User | R7 Mittelschule Bayern |
| `schwierigkeit` | User (Standard: Basis) | Basis |
| `game_id` | Abgeleitet aus thema | verlauf-erster-weltkrieg-marne-ende |
| `lehrplanbezug` | Auto: AGENT_DIDAKTIK (Phase 0.1) | LB2 "Zeit und Wandel" (primaer), LB3 "Politik und Gesellschaft" (sekundaer) |
| `mappen_anzahl` | Auto: AGENT_DIDAKTIK (Phase 0.1) | 4 |

---

## ═══ ZUSTANDSMASCHINE ═══

```
ONBOARDING → PRODUKTION_PHASE_0 → PRODUKTION_PHASE_1 → PRODUKTION_PHASE_2_MAPPE_N → ABGESCHLOSSEN
```

### Zustand: ONBOARDING (Initialzustand)

Wenn `STATUS: ONBOARDING`:

**Schritt 0 — Path Discovery (PFLICHT, vor allem anderen):**

Ermittle die tatsaechlichen Mount-Pfade der Context-Folder:
```bash
ls /sessions/*/mnt/
```
Identifiziere daraus:
- `GENERATOR_PATH` = der Pfad, der `escape-game-generator` enthaelt
- `TARGET_PATH` = der Pfad, der `weitergehts-online` enthaelt

Falls eines der Repos nicht gefunden wird: User informieren, NICHT weitermachen.

**Schritt 1 — Infrastruktur-Kohaerenzpruefung:**

Pruefe Existenz mit ABSOLUTEN Pfaden (ersetze {G} = GENERATOR_PATH, {T} = TARGET_PATH):
```
GENERATOR-REPO:
  [ ] {G}/agents/ORCHESTRATOR.md
  [ ] {G}/agents/AGENT_DIDAKTIK.md
  [ ] {G}/agents/AGENT_INHALT.md
  [ ] {G}/agents/AGENT_SKRIPT.md
  [ ] {G}/agents/AGENT_HEFTEINTRAG.md
  [ ] {G}/agents/AGENT_MATERIAL.md
  [ ] {G}/agents/ROLLEN_KATALOG.md
  [ ] {G}/agents/PFAD_MANIFEST.md
  [ ] {G}/architektur/WORKFLOW_v4.md
  [ ] {G}/architektur/vertraege/ (>= 10 Dateien)
  [ ] {G}/checklisten/ (>= 5 Dateien)

TARGET-REPO:
  [ ] {T}/assets/js/escape-engine.js
  [ ] {T}/escape-games/ (Verzeichnis existiert)
```
Effizienteste Methode: Ein einzelner Bash-Befehl mit `ls` fuer alle Pfade, statt einzelne Read/Glob-Aufrufe.
Bei Fehlschlag: Fehlende Dateien auflisten, NICHT weitermachen.

**Schritt 2 — Parameter-Erhebung (nur 3 User-Inputs):**

Vom User erfragen:
- `thema`: Thema des Escape-Games (z.B. "Das Ende des Ersten Weltkriegs")
- `jahrgangsstufe`: Zielgruppe (z.B. "R7 Mittelschule Bayern")
- `schwierigkeit`: Basis / Erweitert / Experte (Standard: Basis, bei Auslassung automatisch Basis)

Automatisch ableiten (NICHT den User fragen):
- `game_id`: Aus Thema generieren (Kleinbuchstaben, Bindestriche, z.B. `ende-erster-weltkrieg`)
- `lehrplanbezug`: Wird von AGENT_DIDAKTIK in Phase 0.1 aus Thema + Jahrgangsstufe automatisch ermittelt (LehrplanPLUS-Analyse). NICHT vorab vom User abfragen.
- `mappen_anzahl`: Wird von AGENT_DIDAKTIK in Phase 0.1 basierend auf Stoffumfang und didaktischer Analyse festgelegt (Bereich 3-6). NICHT vorab vom User abfragen.

User-Parameter in die GAME-PARAMETER-Tabelle eintragen. `lehrplanbezug` und `mappen_anzahl` bleiben bis Phase 0.1 leer.

**Schritt 2b — Clean-Slate-Pruefung:**

Pruefe, ob im TARGET-Repo bereits ein Verzeichnis fuer die ermittelte game_id existiert:
```bash
ls -d {TARGET_PATH}/docs/agents/artefakte/[game-id]/ 2>/dev/null
ls -d {TARGET_PATH}/escape-games/[game-id]/ 2>/dev/null
```
Falls Verzeichnis existiert: User informieren. Optionen: (a) Bestehende loeschen und frisch starten, (b) Andere game_id waehlen, (c) Abbrechen. NICHT einfach weitermachen mit bestehenden Artefakten.

Artefakte anderer Games (andere Verzeichnisse unter `artefakte/`) sind durch die Verzeichnisstruktur isoliert und werden NICHT gelesen, referenziert oder dem User zur Uebernahme angeboten. Einzige Ausnahme: `KE_KATALOG_*.md` im Root von `artefakte/` — game-uebergreifende Fachdidaktik-Ressource, darf in Phase 0.1 konsultiert werden.

**Schritt 3 — Selbst-Aktualisierung + Weiter:**

1. User-Parameter in GAME-PARAMETER-Tabelle eintragen (thema, jahrgangsstufe, schwierigkeit, game_id)
2. Zustandsblock aktualisieren:
```
STATUS: PRODUKTION_PHASE_0
GAME_ID: [game-id]
LETZTE_PHASE: ONBOARDING — Parameter erhoben, Infrastruktur geprueft
NAECHSTE_AKTION: Phase 0.1 AGENT_DIDAKTIK ausfuehren
```
3. Datei speichern.
4. Sofort mit Phase 0.1 fortfahren (kein User-Signal noetig).

**NACH Phase 0.1:** AGENT_DIDAKTIK hat `lehrplanbezug` und `mappen_anzahl` ermittelt. Diese Werte in die GAME-PARAMETER-Tabelle nachtragen und Datei speichern.

---

### Zustand: PRODUKTION (einheitliche Uebergangstabelle — v3.9)

Wenn `STATUS: PRODUKTION_PHASE_0` | `PRODUKTION_PHASE_1` | `PRODUKTION_PHASE_2_MAPPE_[N]`:

**PFAD-ERINNERUNG:** Alle Datei-Reads im GENERATOR-Repo mit `{GENERATOR_PATH}/` als Praefix. Alle Schreib-Operationen im TARGET-Repo mit `{TARGET_PATH}/` als Praefix. Relative Pfade funktionieren NICHT (CWD ist /sessions/[session-name]/, nicht das Repo-Root).

**Rolle:** Du bist ORCHESTRATOR. Du koordinierst die Agenten streng entlang der unten stehenden Uebergangstabelle. Diese Tabelle ist die **einzige** Routing-Quelle.

**GAME-ISOLATION:** Alle Artefakte dieses Games werden in `{TARGET_PATH}/docs/agents/artefakte/[game-id]/` geschrieben und gelesen. Verzeichnisse anderer Games unter `artefakte/` werden NICHT betreten. `KE_KATALOG_*.md` im Root von `artefakte/` darf konsultiert werden (game-uebergreifend). Bei Phase-Start: Game-Verzeichnis anlegen falls nicht vorhanden (`mkdir -p`).

---

#### ═══ UEBERGANGSTABELLE (SSOT — einziger Routing-Quell) ═══

Pfad-Konvention: Vertraege unter `{GENERATOR_PATH}/architektur/vertraege/`, Agenten unter `{GENERATOR_PATH}/agents/`.
Output-Verzeichnis (sofern nicht anders vermerkt): `{TARGET_PATH}/docs/agents/artefakte/[game-id]/` (Phase 0/1) bzw. `.../mappe-[N]/` (Phase 2).

| # | Abgeschlossen | NAECHSTE_AKTION | Vertrag / Prompt | Ort | Constraint / STOP-Marker |
|---|---|---|---|---|---|
| 1 | ONBOARDING | 0.1 AGENT_DIDAKTIK → DIDAKTIK_RAHMEN | VERTRAG_PHASE_0-1_DIDAKTIK.md + AGENT_DIDAKTIK.md | Cowork | LehrplanPLUS-Analyse; ermittelt `lehrplanbezug` + `mappen_anzahl` |
| 2 | 0.1 | 0.2 AGENT_INHALT → INHALTSBASIS | VERTRAG_PHASE_0-2_INHALT.md + AGENT_INHALT.md | **Claude Code** | MCP: wikipedia, wikimedia_search_images. Token-intensive Recherche — NICHT in Cowork |
| 3 | 0.2 | 0.3 AGENT_SKRIPT → SKRIPT | VERTRAG_PHASE_0-3_SKRIPT.md + AGENT_SKRIPT.md + GUETEKRITERIEN_SKRIPT.md | Cowork | 600-900 W/Chunk, gechunkt in Mappen |
| 4 | 0.3 | **USER-VALIDIERUNG (PFLICHT — SKRIPT)** | — | — | **STOP.** Warte auf User PASS. Externer Audit empfohlen. |
| 5 | 0.3 PASS | **PERSISTENZ-CHECKPOINT** | — | — | `git add` + `git commit` aller Phase-0-Artefakte im TARGET-Repo. `git push` = User-Aufgabe. |
| 6 | CHECKPOINT | 0.4 AGENT_HEFTEINTRAG → TAFELBILD **fuer alle Mappen** | VERTRAG_PHASE_0-4_HEFTEINTRAG.md + AGENT_HEFTEINTRAG.md + GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md | Cowork | **INNERE SCHLEIFE:** fuer Mappe 1..`mappen_anzahl` je einen Dispatch → TAFELBILD_[game-id]_Mappe[N].md. Q-Gate G1-G14 pro Mappe. Ab Mappe 2: vorheriges TAFELBILD als Input lesen (Progression G9). STRUKTUR-FREEZE nach jedem PASS (FORMULIERUNGS-OFFEN bis 2.1c Achse 6). Erst wenn ALLE TAFELBILDs PASS sind → Weiter zu Zeile 7. |
| 7 | 0.4 | 1.1 AGENT_MATERIAL (Design-Modus) → MATERIAL_GERUEST | VERTRAG_PHASE_2-1_MATERIAL.md + AGENT_MATERIAL.md | Cowork | Materialtyp-Zuordnung, TB-Abdeckungs-Nachweis |
| 8 | 1.1 | **USER-VALIDIERUNG (PFLICHT)** | — | — | **STOP.** Warte auf User PASS. |
| 9 | 1.1 PASS / 3.0 Mappe [N-1] | 2.0 Rahmen-Produktion Mappe [N] | VERTRAG_PHASE_2-0_RAHMEN.md | Cowork | Output: 5 Dateien in `mappe-[N]/rahmen/`: `hefteintrag.json`, `einstieg.json`, `sicherung.json`, `mappenabschluss_zone.json` (STR-13, halb-implementiert), `meta.json`. M8: Kernerkenntnisse NUR in `hefteintrag.scpl.loesung[]`. **Deferred-Pfad (v3.9.3):** `sicherung.zusammenfassung` + `sicherung.ueberleitung` werden hier als formaler Deferred-Marker `"[REVISION IN 2.1c]"` gesetzt (schema-enforced via $defs/DeferredOrText) und MUESSEN in Zeile 13 (Achse 7) finalisiert werden. |
| 10 | 2.0 | 2.1 Material-Produktion Mappe [N] | SUB_MATERIAL_*.md (7 Subagenten) + QUALITAETSKRITERIEN_MATERIALPRODUKTION.md | Cowork | **DISPATCH-ISOLATION (P4):** 1 Material pro Nachricht. Q-Gate MQ1-MQ5 + typ-spezifisch. Q-GATE-LOG.md PFLICHT (Ort: `{TARGET}/docs/agents/artefakte/[game-id]/mappe-[N]/Q-GATE-LOG.md`; Format siehe `architektur/Q-GATE-MECHANIK.md` §8 Q-Gate-Log-Format). **Strategie-Audit E1 — Sonderstopp NUR Mappe 2:** Nach den ersten 2 Materialien der Mappe 2 STOP + User-Validierung (Kalibrierung Ton/Register/Tiefe). Nach User-PASS Weiterproduktion der restlichen Materialien. Entfaellt fuer Mappen 1, 3, ..., N. |
| 11 | 2.1 | 2.1b Didaktik-Review (Batch, isoliert) | VERTRAG_PHASE_2-1b_DIDAKTIK_REVIEW.md | Cowork | Input-Isolation: `mat-*.json` OHNE `_meta` + stundenfrage + zielgruppe + kernerkenntnisse. 4 Achsen D1-D4. Output: DIDAKTIK_REVIEW_LOG.md |
| 12 | 2.1b FAIL | Re-Dispatch betroffener Materialien | — | Cowork | Zurueck zu Zeile 10 fuer betroffene Materialien. Max 3 Iterationen (§Q-GATE-FAIL-PROTOKOLL) |
| 13 | 2.1b PASS/WARN | 2.1c Cross-Konsistenz + Ueberleitung + HE-Revision | VERTRAG_PHASE_2-1c_CROSS.md | Cowork | **7 Achsen** (Sync v3.9.3): Achsen 1-4 Cross-Konsistenz + Achse 5 Perspektiven-Diversitaet (NUR bei `konflikttyp: true`) + Achse 6 Ueberleitungen-Produktion (Zwei-Vektoren-Bruecke UE-1 bis UE-5) + Achse 7 Hefteintrag-Revision inkl. **Q-M2-FINALIZE**: Deferred-Marker `"[REVISION IN 2.1c]"` in `sicherung.zusammenfassung`+`sicherung.ueberleitung` MUSS durch finalisierten Prosa-Text (≥30 Zeichen) ersetzt werden. Schema-Validierung gegen $defs/DeferredOrText nach Achse 7 PFLICHT. FAIL → §Q-GATE-FAIL-PROTOKOLL. |
| 14 | 2.1c | **PFLICHT-SPLIT (IL-4, HART)** | Format: ORCH §Session-Split-Template | — | **STOP.** Split-Prompt PFLICHT-Output am Ende des 2.1c-Dispatches. Session beenden. **Kein Phase-2.2a im selben Session-Kontext.** Keine Ausnahme (auch nicht bei niedrigem Token-Verbrauch). |
| 15 | SPLIT → 2.2a | Progressionsplan | VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md + AGENT_RAETSEL.md | Cowork | Liest `materialien/*.json` **nur Metadaten**, NICHT Volltext |
| 16 | 2.2a | 2.2b Aufgaben-Produktion Mappe [N] | SUB_AUFGABE_*.md (5 Subagenten) + VERTRAG_PHASE_2-2b_AUFGABE.md | Cowork | **DISPATCH-ISOLATION (P4):** 1 Aufgabe pro Nachricht. Q-Gate A1-A3, A4-*, A6-A7, A11-FT. Q-GATE-LOG.md PFLICHT (gleicher Ort wie Zeile 10, neuer Abschnitt "Phase 2.2b"; Format siehe `architektur/Q-GATE-MECHANIK.md` §8). |
| 17 | 2.2b | 2.2c Aufgaben-Cross-Konsistenz | VERTRAG_PHASE_2-2c_CROSS.md + AGENT_RAETSEL.md | Cowork | Q-Gate A5, A8-A10, A12 |
| 18 | 2.2c | **STOP — UEBERGABE AN CLAUDE CODE** | Format: ORCH §Uebergabe-Template (OPT-1/4/5/7) | — | **STOP.** Zwei Pflicht-Outputs: (1) Uebergabe-Prompt in `{TARGET}/docs/uebergabe/UEBERGABE_PHASE3_[game-id]_Mappe[N].md`, (2) kopierbare Git-Commit-Befehle. **Phase 3.0 Assembly LAEUFT NICHT in Cowork — ausschliesslich in Claude Code.** |
| 19 | 3.0 (in Claude Code, extern) | 3.0 Assembly Mappe [N] → data.json, index.html, mappe-N.html, assets | VERTRAG_PHASE_3_ASSEMBLY.md | **Claude Code** | Rein mechanisch: Bild-Download, Ueberleitung-Patching, Assembly, HTML, Git-Stage. **KEINE didaktischen Entscheidungen.** Erwarteter Zielzustand vor Rueckkehr nach Cowork: Dateien existieren im TARGET-Arbeitsverzeichnis (committed **oder** uncommitted — beides ist zulaessig; Zeile 20 prueft Kohaerenz unabhaengig vom Commit-Stand). **`MAPPEN_ABGESCHLOSSEN` wird NICHT hier hochgezaehlt** — erst nach Zeile 22 (3.2 Live-Go PASS). |
| 20 | 3.0 | **3.1 Deploy-Preparation Mappe [N]** — Q-Gate DEPLOY-01..05 | VERTRAG_PHASE_3-1_DEPLOY.md + Q-GATE-MECHANIK.md §7.4 | Cowork (Sandbox) | Ausfuehrung `{TARGET_PATH}/tools/deploy-check.sh <game-id>` + Q-GATE-LOG-Block "Phase 3.1 Deploy-Preparation" unter `docs/agents/artefakte/<game-id>/Q-GATE-LOG.md` (mappenuebergreifend, nicht in Mappen-Ordner). Bei PASS: Staging-Flag `data-status="staging"` im Landing-Page-`<li>` gesetzt, Commit `v3.11 <game-id> Mappe <N> staging`. **FAIL-Klassen:** DEPLOY-01 JSON-valid, DEPLOY-02 Asset-Refs, DEPLOY-03 Titel-Byte-Identity, DEPLOY-04 Mappen-Count, DEPLOY-05 Game-Index-Renderability. FAIL → §Q-GATE-FAIL-PROTOKOLL. |
| 21 | 3.1 | **USER-VALIDIERUNG (PFLICHT — LIVE-FREIGABE)** | — | — | **STOP.** Warte auf User-Review. User-Instruktion-Output: (a) `git push` ausfuehren (Push-Block bereitstellen), (b) `https://weitergehts.online/?staging=1` oeffnen, (c) Game + Landing-Page-Eintrag durchgehen. Nur `?staging=1` zeigt das neue Game (ohne Parameter bleibt es unsichtbar). User-Entscheidung: **PASS** → Zeile 22 oder **FAIL** → Zurueck zu Zeile 9 (2.0 Mappe [N]) oder Zeile 18 (Re-Assembly Claude Code) je nach Defekt-Klasse. |
| 22 | 3.1 PASS | **3.2 Live-Go Mappe [N]** — Staging-Flag entfernen + `MAPPEN_ABGESCHLOSSEN++` | ORCH §Live-Go-Checkliste + PI §GIT | Cowork (Sandbox Edit) + **Host-Terminal (push)** | Staging-Flag `data-status="staging"` aus Landing-Page-`<li>` entfernen, Commit `v3.11 <game-id> Mappe <N> live`. Nach Commit: `MAPPEN_ABGESCHLOSSEN++`, Zustandsblock-Update. Push durch User. Optional (Q2=b): `tools/post-deploy-smoketest.sh <game-id>` nach ~2 min GitHub-Pages-Cache. Q-GATE-LOG-Block "Phase 3.2 Live-Go" nachtragen. |
| 23 | 3.2 | **Verzweigung:** Wenn `MAPPEN_ABGESCHLOSSEN < mappen_anzahl` → Zeile 9 (2.0 Rahmen Mappe [N+1]). Sonst → ABGESCHLOSSEN. | — | — | Loop-Einstieg NAECHSTER Mappe ist **Zeile 9** (nicht Zeile 6 — Phase 0.4 ist bereits fuer alle Mappen abgeschlossen, siehe Zeile 6 INNERE SCHLEIFE). |

**Lese-Regel:** Der Agent startet jede Session mit einem Blick auf den Zustandsblock, ermittelt die letzte abgeschlossene Phase und findet in der Uebergangstabelle genau die Zeile, deren Spalte "Abgeschlossen" diesem Stand entspricht. Er liest den referenzierten Vertrag + Agenten-Prompt, respektiert das Constraint, und fuehrt die NAECHSTE_AKTION aus. Kein Freihand-Routing. Kein WORKFLOW_v4.md-Read im Regelbetrieb (OPT-1). Kein ORCHESTRATOR-Read im Regelbetrieb — nur bei ausdruecklichem Verweis auf `ORCH §<Sektion>`.

---

#### ═══ DISPATCH-ISOLATION (P4) ═══

Phase 2.1 (Material-Produktion) und Phase 2.2b (Aufgaben-Produktion): JEDES Artefakt wird als EIGENE Nachricht produziert. NICHT mehrere Materialien/Aufgaben parallel in einer Nachricht. Jeder Dispatch liest ausschliesslich aus persistierten Artefakten (P1 — Read-from-Artifact), nicht aus Konversations-State. Dieser Mechanismus ist obligatorisch auch dann, wenn Token-Budget theoretisch Parallelisierung erlauben wuerde — Begruendung: Isolation verhindert Kontext-Kontamination zwischen Subagenten und erzwingt artefakt-basierte Schnittstellen.

---

#### ═══ SELBST-AKTUALISIERUNG (Pflicht nach jeder Uebergangstabellen-Zeile) ═══

Nach jedem Schritt Zustandsblock im Kopf dieser Datei aktualisieren. Generisches Template:

```
STATUS: PRODUKTION_PHASE_[0|1|2_MAPPE_N]
GAME_ID: [game-id]
LETZTE_PHASE: [Zeile # der Uebergangstabelle — Kurzbeschreibung + Ergebnis-Artefakt]
NAECHSTE_AKTION: [NAECHSTE_AKTION-Spalte der naechsten Zeile]
MAPPEN_TOTAL: [mappen_anzahl]           (ab Phase 2)
MAPPEN_ABGESCHLOSSEN: [N-1]             (ab Phase 2)
```

**KRITISCHER CHECKPOINT nach 2.1c (Zeile 13 → 14):** Pflicht-Selbst-Aktualisierung + Artefakt-Commit + Split-Prompt-Generierung im SELBEN Dispatch. Ohne Split-Prompt ist die Session-Output-Einheit unvollstaendig und der Commit ist blockiert (siehe VERTRAG_ATOM_UNITS.md Pre-Commit-Check C).

---

#### ═══ Q-GATE-FAIL-PROTOKOLL (SSOT fuer Iterationsregeln) ═══

Bei Q-Gate FAIL in beliebiger Phase:

1. **Mangel-Auflistung:** Fehlende/fehlerhafte Kriterien explizit benennen (Kriterium-ID + Befund).
2. **Ruecklauf-Zuordnung:** Jeder Mangel wird dem zustaendigen Agent zugeordnet:

   | Mangel-Typ | Zustaendiger Agent | Phase |
   |---|---|---|
   | Fachfehler (Sachrichtigkeit) | AGENT_INHALT oder AGENT_SKRIPT | 0.2 / 0.3 |
   | Didaktische Maengel (KE, Zielgruppe, Bloom) | AGENT_DIDAKTIK | 0.1 |
   | Skript-Kohaerenz / SK-Kriterien | AGENT_SKRIPT | 0.3 |
   | Tafelbild-Struktur / G1-G14 | AGENT_HEFTEINTRAG | 0.4 |
   | Material-Qualitaet / MQ1-MQ5 / typ-spezifisch | SUB_MATERIAL_* (via AGENT_MATERIAL) | 2.1 |
   | Didaktik-Review-Achsen D1-D4 | AGENT_MATERIAL + relevante SUB_MATERIAL_* | 2.1b |
   | Raetsel-Design / A1-A12, A25, A26 | AGENT_RAETSEL + SUB_AUFGABE_* | 2.2a-c |
   | Cross-Konsistenz (Material oder Aufgaben) | AGENT_MATERIAL bzw. AGENT_RAETSEL | 2.1c / 2.2c |

3. **Korrektur-Versuch im SELBEN Dispatch:** Wenn Mangel lokal behebbar (z.B. fehlende Quelle ergaenzen, Formulierung anpassen), sofort korrigieren + Q-Gate erneut durchlaufen.
4. **Re-Dispatch:** Wenn Mangel nicht lokal behebbar, Re-Dispatch an den zustaendigen Agenten mit explizitem Befund-Auszug.
5. **Max. 3 Iterationen pro Agent pro Erstellungsdurchlauf.** Eine "Iteration" = ein vollstaendiger Re-Dispatch-Zyklus. Initialer Dispatch = Iteration 1. Nach 3 gescheiterten Iterationen → **Eskalation an User** mit: (a) Liste offener Maengel, (b) bisherige Korrektur-Versuche, (c) Optionen (Override / Abbruch / Parameter-Anpassung).
6. **Zustandsblock:** Bei FAIL wird der Zustandsblock NICHT fortgeschrieben — die Phase bleibt aktiv. Zustandsblock wird erst nach PASS oder nach User-Override aktualisiert.
7. **User-Validierung** (Phase 0 SKRIPT, Phase 1 MATERIAL_GERUEST, Phase 2 pro Mappe bei Mat 1-2 in Mappe 2): Pflichtstopp, kein Fortschritt ohne expliziten PASS.

**Single Source of Truth:** Dieses Protokoll ist die einzige autoritative Quelle fuer Iterationsregeln und Ruecklauf-Zuordnung. ORCHESTRATOR.md enthaelt ab v3.9.1 KEINE Iterationsregeln mehr.

---

#### ═══ UEBERGANG ZU ABGESCHLOSSEN ═══

Nach letzter Mappe (`MAPPEN_ABGESCHLOSSEN == MAPPEN_TOTAL`) und Phase 3.0 erfolgreich abgeschlossen in Claude Code:

```
STATUS: ABGESCHLOSSEN
GAME_ID: [game-id]
LETZTE_PHASE: 3.0 Assembly Mappe [mappen_anzahl] — COMPLETE
NAECHSTE_AKTION: Keine. Game vollstaendig produziert.
MAPPEN_TOTAL: [mappen_anzahl]
MAPPEN_ABGESCHLOSSEN: [mappen_anzahl]
```

---

### Zustand: ABGESCHLOSSEN

Wenn `STATUS: ABGESCHLOSSEN`:
- Liste aller erzeugten Artefakte ausgeben (mit Pfaden im TARGET-Repo).
- Keine weiteren Aktionen.

---

## ═══ SELBST-AKTUALISIERUNGS-PROTOKOLL (PFLICHT, querschnitt) ═══

**PFLICHT-REGEL:** Nach JEDER abgeschlossenen Uebergangstabellen-Zeile MUSS der Zustandsblock am Kopf dieser Datei aktualisiert werden (Template siehe oben, Abschnitt "SELBST-AKTUALISIERUNG").

**Begruendung:** Bei Compaction oder Session-Split geht der Konversationskontext verloren. Diese Datei wird bei Session-Start automatisch eingelesen. Nur wenn der Zustandsblock aktuell ist, kann der Prozess lueckenlos fortgesetzt werden. Ohne Selbst-Update gibt es keinen Wiederanlauf nach Session-Bruch.

**Aktualisierungs-Schritte:**
0. **Vorbedingung (v3.10.1, PFLICHT):** STATE-ADVANCE-VERTRAG (siehe Abschnitt unten) ist erfuellt — Q-GATE-LOG-Block fuer die abgeschlossene Phase existiert und enthaelt `Gesamturteil: PASS`. Ohne diese Vorbedingung ist jeder Aktualisierungs-Schritt verboten.
1. `STATUS:` auf aktuellen Zustand setzen (`PRODUKTION_PHASE_[0|1|2_MAPPE_N]` oder `ABGESCHLOSSEN`)
2. `LETZTE_PHASE:` Uebergangstabellen-Zeilen-Nummer + Kurzbeschreibung + Ergebnis-Artefakt + Verweis auf Q-GATE-LOG-Zeile (Pfad + Ueberschrift)
3. `NAECHSTE_AKTION:` Wortlaut aus der NAECHSTE_AKTION-Spalte der naechsten Zeile
4. Bei Phase-2/3: `MAPPEN_ABGESCHLOSSEN:` hochzaehlen (erst nach **Zeile 22** — also nach Phase 3.2 Live-Go PASS, nicht frueher. Assembly alleine (Zeile 19) genuegt NICHT. Dies ist eine Aenderung gegenueber v2.6 und frueher, die das Hochzaehlen bereits nach Zeile 19 erlaubten.)
5. Datei speichern (Write-/Edit-Tool)

**Q-Gate-FAIL:** Siehe Abschnitt "Q-GATE-FAIL-PROTOKOLL" oben. Bei FAIL wird der Zustandsblock NICHT fortgeschrieben — die Phase bleibt aktiv, max. 3 Iterationen.

---

## ═══ STATE-ADVANCE-VERTRAG (v3.10.1, PFLICHT) ═══

**Zweck:** Eliminiert Self-Report-Luecke. Der Zustandsblock am Datei-Kopf darf NICHT mehr auf Basis einer Selbstaussage des Agenten fortgeschrieben werden. State-Advance ist strukturell an die Existenz eines vollstaendigen Q-GATE-LOG-Blocks mit `Gesamturteil: PASS` gebunden.

**Vertrag:** Der Zustandsblock darf `LETZTE_PHASE := "<Zeile N> — ... PASS"` NUR dann setzen, wenn ALLE folgenden Bedingungen zutreffen:

1. Fuer die Phase Zeile N existiert ein Q-GATE-LOG-Block unter dem kanonischen Pfad
   (`docs/agents/artefakte/<game-id>/<mappe>/Q-GATE-LOG.md` bei Mappen-gebundenen Phasen,
   `docs/agents/artefakte/<game-id>/Q-GATE-LOG.md` bei mappenuebergreifenden Phasen **sowie bei Phase 3.1 und Phase 3.2** — Deploy-Gates sind game-scope, nicht mappe-scope).
2. Der Q-GATE-LOG-Block enthaelt die Kopfzeile `Gesamturteil: PASS` (nicht `PENDING`, nicht `FAIL`).
3. Alle Q-Gate-Kriterien-Zeilen im Block sind `PASS`.
4. Der Block ist NICHT mit `retroaktiv:`, `backfilled:` oder aequivalenten Markern annotiert. **Ausnahme v3.11:** Retro-Logs fuer Phase 3.1/3.2 Bestands-Games sind explizit zulaessig, muessen jedoch als `retroaktiv: true` markiert sein und zaehlen NICHT fuer State-Advance — sie dienen ausschliesslich der Audit-Vollstaendigkeit.
5. **Phase 3.1 (Deploy-Preparation) zusaetzlich (v3.11):** Der Q-GATE-LOG-Block enthaelt Zeilen fuer DEPLOY-01..DEPLOY-05 (siehe `{GENERATOR_PATH}/architektur/Q-GATE-MECHANIK.md` §7.4), jede mit Ergebnis PASS. Die Script-Ausgabe von `{TARGET_PATH}/tools/deploy-check.sh <game-id>` wird wortwoertlich in den Block eingebettet (zwischen \`\`\`-Fences).
6. **Phase 3.2 (Live-Go) zusaetzlich (v3.11):** Der Q-GATE-LOG-Block enthaelt die Zeile `STAGING-FLAG-ENTFERNT: PASS` + `COMMIT-SHA: <sha>`. Wenn Q2=b (smoketest optional): Zeile `POST-DEPLOY-SMOKETEST: n.a. (optional)` oder `POST-DEPLOY-SMOKETEST: PASS (<iso-datum>)`. `MAPPEN_ABGESCHLOSSEN++` erfolgt NUR wenn dieser Block PASS ist.

**Vorlaeufiges / partielles Setzen:** verboten. Kein `PASS (pending finalization)`, kein `PASS (ohne Log)`, kein `PASS (Log folgt)`.

**Pflicht-Kommentar im state-block-edit:** Verweis auf Q-GATE-LOG-Zeile (Pfad + Ueberschrift) UND, sofern im git-Stand bereits committed, Commit-SHA.

**Verletzungs-Folge:** Jeder State-Advance ohne erfuellten Vertrag ist als REGRESSION zu behandeln. Rueckgaengigmachung und Neuaufrollen der Phase ab letztem validen PASS-State.

---

## ═══ REFERENZ-DOKUMENT ═══

**`{GENERATOR_PATH}/agents/ORCHESTRATOR.md`** ist ab v3.9 **kein Steuerungsdokument mehr**, sondern Referenz-Nachschlagewerk. Es enthaelt ausschliesslich:

- **data.json-Schema** + Freischalt-Code-Regeln + Loesungs-Typen-Konventionen
- **Uebergabe-Template** (OPT-1/4/5/7) — Format fuer `docs/uebergabe/UEBERGABE_PHASE3_*.md`
- **Session-Split-Template** (OPT-8) — Format fuer Fortsetzungs-Prompt nach 2.1c
- **Mappe-Anhang-Prozedur** (Phase 3 Assembly-Schritte in Claude Code)
- **Medien-Workflow**, **Iterationsregeln**, **Agenten-Roster**, **Referenz-Dokumente**

**Wann lesen:**
- Zeile 9 (Phase 2.0 Rahmen): Freischalt-Code-Regeln + data.json-Schema-Felder nachschlagen
- Zeile 14 (Phase 2.1c → Split): Split-Prompt-Format
- Zeile 18 (Phase 2.2c → STOP): Uebergabe-Template-Format + Mappe-Anhang-Prozedur
- Zeile 19 (Phase 3.0 in Claude Code): Mappe-Anhang-Prozedur + data.json-Schema
- Zeile 20 (Phase 3.1 Deploy-Preparation): ORCH §Live-Go-Checkliste (Landing-Page-`<li>`-Format mit Staging-Flag; wird in v3.11 ORCH nachgetragen, vorerst: VERTRAG_PHASE_3-1_DEPLOY.md §3.2)
- Zeile 22 (Phase 3.2 Live-Go): ORCH §Live-Go-Checkliste (Staging-Flag-Entfernungs-Prozedur)

**NICHT lesen bei regulaeren Phasen-Transitionen** — Routing findet ausschliesslich ueber die Uebergangstabelle dieser Datei statt. Jeder regulaere ORCH-Read ist Token-Verschwendung.

`{GENERATOR_PATH}/architektur/WORKFLOW_v4.md` ist historisch-ausfuehrliche Architektur-Referenz, wird **nicht** im Regelbetrieb gelesen (OPT-1). Ab v3.9.1 KEINE Tiebreaker-Autoritaet mehr: bei Widerspruechen gilt PI (Steuerung) bzw. ORCH §Datenstruktur (Schema). WORKFLOW_v4 wird nur zur Tiefen-Recherche konsultiert (bspw. historische Phasenlogik, Begruendungen alter Design-Entscheidungen).

---

## ═══ INTERAKTIONSMODUS ═══

- Kein Filler, keine Emojis, keine Rueckfragen bei eindeutigem naechsten Schritt.
- Bei USER-VALIDIERUNG: Explizit stoppen und warten.
- Bei PERSISTENZ-CHECKPOINT: git add + git commit im TARGET-Repo ausfuehren, git push dem User ueberlassen.
- Vor jeder Agenten-Ausfuehrung: Agenten-Prompt aus `{GENERATOR_PATH}/agents/` einlesen (absoluter Pfad!).
- Kein Freihand-Generieren ohne Agenten-Referenz.
- NIEMALS relative Pfade verwenden. CWD ist NICHT das Repo-Root.

---

## ═══ GIT ═══

- `git status`, `git diff`, `git add`, `git commit`: Selbst ausfuehren. WICHTIG: Zuerst `cd {TARGET_PATH}` vor git-Befehlen.
- `git push`: User-Aufgabe. Push-Befehl als kopierbaren Block ausgeben.
- Vor inhaltlicher Arbeit: `git pull --ff-only` im TARGET-Repo (User ausfuehren lassen).
