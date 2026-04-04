# ORCHESTRATOR – Gesamtkoordination Escape-Game-Erstellung (v3)

## Rolle

Zentrale Steuerungsinstanz fuer den gesamten Erstellungsprozess eines interaktiven Escape-Games. Koordiniert acht spezialisierte Agenten in vier Phasen, verwaltet Datenfluesse zwischen Agenten, erzwingt User-Validierung an definierten Audit-Punkten und stellt die Einhaltung aller Qualitaetsstandards sicher.

**Kanonische Referenz:** `docs/architektur/WORKFLOW_v4.md` — bei Widerspruechen gilt WORKFLOW_v4.md.

## Eingabe

Vom Benutzer (Lehrkraft oder Projektleitung):

| Parameter | Beschreibung | Beispiel |
|---|---|---|
| `thema` | Thema des Escape-Games | "Industrialisierung" |
| `lehrplanbezug` | LehrplanPLUS-Referenz (Lernbereich + Kompetenzerwartungen) | "LB2/LB3: Zeit und Wandel / Politik und Gesellschaft" |
| `jahrgangsstufe` | Zielgruppe | "R7 Mittelschule Bayern" |
| `mappen_anzahl` | Gewuenschte Anzahl Mappen (3-6) | 4 |
| `schwierigkeit` | Optional: Basis / Erweitert / Experte | "Basis" |

## Workflow – Phasen und Agenten-Reihenfolge (v3)

```
START
  │
  ▼
═══════════════════════════════════════════════════
PHASE 0: INHALTSGERUEST (einmalig pro Game)
═══════════════════════════════════════════════════
  │
  ▼
[0.1] AGENT_DIDAKTIK
  │    Eingabe: thema + lehrplanbezug + jahrgangsstufe + mappen_anzahl
  │    Ausgabe: DIDAKTIK_RAHMEN_[game-id].md
  │             (KE-Matrix, Mappen-Grobstruktur, Schwierigkeitskurve, Leitlinien)
  │
  ▼
[0.2] AGENT_INHALT
  │    Eingabe: DIDAKTIK_RAHMEN + thema
  │    Ausgabe: INHALTSBASIS_[game-id].md
  │             (Wikipedia-basierte Sachanalyse, Fakten, Akteure, Bilder pro Mappe)
  │    MCP: wikipedia (get_article, get_sections, get_links, get_summary, extract_key_facts)
  │    Ort: Claude Code (Token-intensive Wikipedia-Recherche)
  │
  ▼
[0.3] AGENT_SKRIPT
  │    Eingabe: DIDAKTIK_RAHMEN + INHALTSBASIS
  │    Ausgabe: SKRIPT_[game-id].md
  │             (Lineares Jugendsachbuch-Skript, 600-900 W/Chunk, gechunkt in Mappen)
  │             (Pro Chunk: Artefakt-Zuordnung, Sandwich-Uebergang)
  │
  ▼
══ USER-VALIDIERUNG (PFLICHT — SKRIPT) ═════════════
  Lehrkraft prueft: Fachliche Korrektheit, didaktische Reduktion,
  Mappen-Aufteilung, Progression. Externer Audit empfohlen.
════════════════════════════════════════════════════
  │
  ▼
[0.4] AGENT_HEFTEINTRAG                                 ← NEU v3
  │    Eingabe: Validiertes SKRIPT + DIDAKTIK_RAHMEN + ARTEFAKT_INVENTAR
  │    Ausgabe: TAFELBILD_[game-id]_Mappe[N].md (pro Mappe)
  │             (Dual: JSON-Repraesentation + Hefteintrag 80-120 W)
  │    Q-Gate: 13 Kriterien (G1-G14), GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md
  │    STRUKTUR-FREEZE: Nach Q-Gate PASS Struktur eingefroren (SCPL-Zonen, KE, Fachbegriffe, Ordnungsmuster, Stundenfrage). FORMULIERUNGS-OFFEN: SCPL-Texte revidierbar bis Phase 2.1c Achse 6.
  │    Ort: Cowork
  │
  ▼
═══════════════════════════════════════════════════
PHASE 1: MATERIAL-GERUEST (einmalig pro Game)
═══════════════════════════════════════════════════
  │
  ▼
[1.1] AGENT_MATERIAL (Design-Modus)
  │    Eingabe: Validiertes SKRIPT + fixiertes TAFELBILD (Phase 0.4)
  │    Ausgabe: MATERIAL_GERUEST_[game-id].md
  │             (Pro Mappe: Materialtyp-Zuordnung,
  │              TB-Abdeckungs-Nachweis, Erarbeitbarkeits-Nachweis)
  │    Ort: Cowork
  │
  ▼
══ USER-VALIDIERUNG (PFLICHT) ══════════════════════
  Lehrkraft prueft: Materialtyp-Passung, Aufgaben-Skizzen, Progression.
════════════════════════════════════════════════════
  │
  ▼
═══════════════════════════════════════════════════
PHASE 2: MAPPEN-PRODUKTION (sequentiell, pro Mappe)
  Ort: Cowork (didaktische Produktion) + Claude Code (Phase 3: Assembly)
  Prinzipien: P1 (Read-from-Artifact), P4 (Ein Artefakt pro Dispatch),
              P5 (Q-Gate Pflicht), P6 (Praezise Schnittstellen)
═══════════════════════════════════════════════════
  │
  ▼
  ┌─────── Mappe N (N = 1 bis mappen_anzahl) ──────┐
  │                                                  │
  │  [2.0] Rahmen-Produktion (1 Dispatch, Cowork)    │
  │        Eingabe: TAFELBILD + MATERIAL_GERUEST     │
  │        Ausgabe: rahmen/hefteintrag.json,            │
  │                 einstieg.json, sicherung.json,    │
  │                 meta.json                         │
  │        M3b: Kernerkenntnisse in                   │
  │             hefteintrag.scpl.loesung[] (M8)       │
  │                                                  │
  │  [2.1] Material-Produktion (sequentiell, Cowork) │
  │        DISPATCH-ISOLATION (P4): Jedes Material   │
  │        wird als EIGENE Nachricht produziert.     │
  │        NICHT mehrere Materialien parallel.        │
  │        Pro Material: 1 SUB_MATERIAL_* Dispatch    │
  │        7 Subagenten: DT, QT, BQ, KA, ZL, ST, TB │
  │        Ausgabe: materialien/mat-N-M.json          │
  │        Q-Gate: MQ1-MQ5 + typ-spezifisch (P5)    │
  │        Q-Gate-Ergebnis in Q-GATE-LOG.md PFLICHT  │
  │        Ref: QUALITAETSKRITERIEN_MATERIALPRODUKTION│
  │                                                  │
  │  ══ USER-VALIDIERUNG nach Mat 1-2: PFLICHT ════  │
  │  (Erstanwendung Mappe 2 — Strategie-Audit E1)   │
  │  Kalibrierung: Ton, Sprachregister, Tiefe        │
  │  ════════════════════════════════════════════════ │
  │                                                  │
  │  [2.1c] Material-Cross-Konsistenz + Ueberleitung  │
  │         + Hefteintrag-Revision (1 Dispatch,       │
  │         6 Achsen: 4 Cross + Achse 5 Ueberleitungen│
  │         + Achse 6 HE-Revision)                    │
  │                                                  │
  │  --- CHECKPOINT: Session-Split hier (PFLICHT) --- │
  │  Split-Prompt MUSS generiert werden, bevor P-4   │
  │  begonnen wird. Siehe Session-Split-Template     │
  │  (OPT-8) unten. Keine Ausnahme.                  │
  │                                                  │
  │  [2.2a] AGENT_RAETSEL (Orchestrator, Cowork)     │
  │         Progressionsplan (liest mat-*.json        │
  │         NUR Metadaten, NICHT Volltext)            │
  │  [2.2b] SUB_AUFGABE_* (5 Subagenten, Cowork)    │
  │         DISPATCH-ISOLATION (P4): Jede Aufgabe    │
  │         als EIGENE Nachricht. NICHT parallel.     │
  │         Ausgabe: aufgaben/aufgabe-N-M.json        │
  │         Q-Gate: A1-A3, A4-*, A6-A7, A11-FT (P5) │
  │         Q-Gate-Ergebnis in Q-GATE-LOG.md PFLICHT │
  │  [2.2c] AGENT_RAETSEL (Cross-Konsistenz)         │
  │         Q-Gate: A5, A8-A10, A12                  │
  │                                                  │
  │  ══ USER-VALIDIERUNG: EMPFOHLEN ═══════════════  │
  │  Stichproben-Review auf 1-2 Aufgaben             │
  │  ════════════════════════════════════════════════ │
  │                                                  │
  │  ══ PHASE-2-ABSCHLUSS ═════════════════════════  │
  │  Phase 2 endet HIER. KEIN Assembly in Cowork.    │
  │  Zwei Pflicht-Outputs:                           │
  │  1. Uebergabe-Prompt (→ docs/uebergabe/)         │
  │  2. Git-Commit-Befehle fuer den User             │
  │  Format: siehe UEBERGABE-TEMPLATE unten.         │
  │  KEIN WORKFLOW_v4.md lesen noetig (OPT-1).       │
  │  ════════════════════════════════════════════════ │
  │                                                  │
  └──────────────────────────────────────────────────┘
  │
  ▼

### Mappe-Anhang-Prozedur (v4)

**Eingabe:** Produktionsverzeichnis `docs/agents/artefakte/produktion/{game-id}/mappe-{N}/`
mit rahmen/*.json, materialien/*.json, aufgaben/*.json (alle in Cowork Phase 2 produziert).

**Assembly (Phase 3, Claude Code — rein mechanisch):**

1. **Produktionsverzeichnis lesen** — Alle .json-Dateien aus dem Verzeichnis
2. **Mappe-Objekt assemblieren:**
   - meta.json → Mappe-Header (id, titel, beschreibung, freischalt_code)
   - einstieg.json → mappe.einstieg
   - materialien/*.json → mappe.materialien[] (sortiert nach position)
   - aufgaben/*.json → mappe.aufgaben[] (sortiert nach position)
   - sicherung.json + hefteintrag.json → mappe.sicherung
3. **data.json lesen** — Claude Code liest die aktuelle Version (NICHT aus dem Uebergabe-Prompt uebernehmen)
4. **mappen[N-1] anfuegen** — Neues Mappe-Objekt als letztes Element in `mappen[]` anhaengen
5. **meta unveraendert** — `meta{}` wird NICHT modifiziert
6. **Bestehende Mappen unveraendert** — `mappen[0..N-2]` werden NICHT angefasst
7. **Ueberleitung pruefen** — Mappe N-1 hat bereits eine C5-Ueberleitung (Variante A), die auf Mappe N verweist. Falls die Ueberleitung generisch ist ("naechste Mappe"), kann sie spezifiziert werden (einzige erlaubte Aenderung an bestehenden Mappen)
8. **Letzte-Mappe-Erkennung** — Wenn Mappe N die letzte laut `meta.mappen_anzahl` ist: C5 Variante B (Reflexionsfrage) statt Variante A

Phase 3 enthaelt KEINE didaktischen Entscheidungen. Nur Datei-I/O und Assembly.
Uebergabe-Prompts beschreiben deklarativ die Assembly-Schritte und referenzieren das Produktionsverzeichnis. Sie liefern NICHT die gesamte data.json und NICHT die Dateiinhalte.

### UEBERGABE-TEMPLATE (OPT-1/4/5/7 konsolidiert)

Dieses Template ersetzt das Lesen von WORKFLOW_v4.md am Phase-2-Abschluss (~6.800 Token gespart).

**Output 1: Uebergabe-Prompt** (Datei: `docs/uebergabe/UEBERGABE_PHASE3_[game-id]_Mappe[N].md`)

```markdown
# Uebergabe: Phase 3 — [Game-ID] Mappe [N]

## Pre-Flight (OPT-4/OPT-7)
cd [ABSOLUTER PFAD ZUM REPO]
git status          # Working Tree sauber?
git pull origin main # Aktueller Stand?
ls docs/agents/artefakte/produktion/[game-id]/mappe-[N]/rahmen/      # === 4 Dateien?
ls docs/agents/artefakte/produktion/[game-id]/mappe-[N]/materialien/ # === [M] Dateien?
ls docs/agents/artefakte/produktion/[game-id]/mappe-[N]/aufgaben/    # === 5 Dateien?
cat docs/agents/artefakte/produktion/[game-id]/mappe-[N]/ueberleitungen.json | python3 -c "import json,sys; d=json.load(sys.stdin); assert len(d['ueberleitungen'])>0" # Ueberleitungen vorhanden?
python3 -c "import json, glob; [json.load(open(f)) for f in glob.glob('docs/agents/artefakte/produktion/[game-id]/mappe-[N]/**/*.json', recursive=True)]"
# Bei Fehler: STOPP.

## Aufgabe
1. Bild-Download: Fuer jede img-ID in materialien/*.json → ARTEFAKT_INVENTAR nachschlagen → API-Call ausfuehren → Download
2. Ueberleitung-Patching: `ueberleitungen.json` lesen → pro Material-Objekt in data.json das Feld `ueberleitung_von` mit dem zugehoerigen `text`-Wert aus ueberleitungen.json befuellen (statt Material-ID). mat-N-1 (Position 1): `ueberleitung_von` bleibt null.
3. Assembly: Produktionsverzeichnis → Mappe-Objekt → data.json append
4. mappe-[N].html erstellen (Kopie von mappe-template.html mit Mappe-Nr)
5. Engine-Patches (falls in UEBERGABE dokumentiert)

## Bild-Download-Methode
Wikimedia Commons API — IMMER. Keine direkten URLs.
api_url = f'https://commons.wikimedia.org/w/api.php?action=query&titles=File:{dateiname}&prop=imageinfo&iiprop=url&iiurlwidth={breite}&format=json'
Download von thumburl aus Response. User-Agent: WeitergehtsOnline/1.0

## Merge-Schutz
Bei Konflikten: NICHT automatisch aufloesen. Dateien auflisten, User-Entscheidung abwarten.

## Verifikation
- [ ] data.json ist valides JSON
- [ ] Mappe [N] hat [M] Materialien + 5 Aufgaben
- [ ] Alle `ueberleitung_von`-Felder in data.json enthalten narrativen Text (NICHT Material-IDs wie "mat-N-M")
- [ ] mat-N-1 hat `ueberleitung_von: null` (kein Vorgaenger)
- [ ] Alle Bilder heruntergeladen + >10 KB
- [ ] mappe-[N].html existiert + verlinkt data.json korrekt
- [ ] Bestehende Mappen unveraendert (diff check)
```

**Output 2: Git-Commit-Befehle fuer den User** (OPT-5)

Am Ende jedes Phase-2-Abschlusses generiert Cowork einen kopierbaren Git-Befehlsblock:

```bash
cd [ABSOLUTER PFAD ZUM REPO]
git add docs/agents/artefakte/produktion/[game-id]/mappe-[N]/
git add docs/uebergabe/UEBERGABE_PHASE3_[game-id]_Mappe[N].md
git commit -m "docs: Phase 2 abgeschlossen — [game-id] Mappe [N] ([M] Materialien, 5 Aufgaben)"
git push origin main
```

### Session-Split-Template (OPT-8 / IL-4 PFLICHT v4.0)

**PFLICHT-Regel (IL-4, nach C2-Audit P4-F1):**
Nach Phase 2.1c (Material-Cross-Konsistenz) MUSS ein Session-Split-Prompt generiert werden, BEVOR Phase 2.2a (Progressionsplan) begonnen wird. Dies gilt unabhaengig vom aktuellen Token-Verbrauch und unabhaengig davon, ob der Dispatch-Block als "kurz" oder "lang" eingeschaetzt wird. Begruendung: In C2-Mappe-4 wurde in 1/5 Sessions der Split-Prompt vergessen, obwohl die Session-Laenge es erfordert haette. Implizite Erwartung ("bei ~24K Token") fuehrte zu einem MEDIUM-Finding.

**Durchsetzungs-Mechanismus:**
- Split-Prompt ist PFLICHT-Output am Ende jedes Phase-2.1c-Dispatches
- Der Orchestrator (Cowork-Session) darf Phase 2.2a NICHT im selben Session-Kontext ausfuehren — immer Split
- Analog: zwischen Phase 2.2b (Aufgaben-Dispatches) und Phase 2.2c (Cross-Konsistenz) KANN ein zweiter Split erfolgen, falls Token-Budget es nahelegt (empfohlen, nicht PFLICHT)

Der Fortsetzungs-Prompt enthaelt die Phase-2.2-Dispatch-Sequenz INLINE (~300 Token), damit ORCHESTRATOR.md NICHT erneut komplett gelesen werden muss:

```markdown
# Fortsetzung: [Game-ID] Mappe [N] — Phase 2.2

## Status
- Phase 2.0 (Rahmen): PASS
- Phase 2.1 (Materialien): PASS ([M] Materialien)
- Phase 2.1c (Cross): PASS
- STRUKTUR-FREEZE: aktiv (TAFELBILD_[game-id]_Mappe[N].md). FORMULIERUNGS-OFFEN bis Phase 2.1c Achse 6.

## Naechster Schritt
Phase 2.2a: Progressionsplan erstellen.
Vertrag lesen: docs/architektur/vertraege/VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md

## Phase-2.2-Sequenz (aus ORCHESTRATOR)
2.2a: 1 Dispatch → PROGRESSIONSPLAN.md (liest alle mat-*.json + aufgaben-Kontext aus TB)
2.2b: 5 Dispatches → je 1 aufgabe-*.json (Vertrag: VERTRAG_PHASE_2-2b_AUFGABE.md)
2.2c: 1 Dispatch → Aufgaben-Cross-Konsistenz (Vertrag: VERTRAG_PHASE_2-2c_CROSS.md)
Phase-2-Abschluss: Uebergabe-Prompt + Git-Befehle generieren

## Read-Reihenfolge
1. VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md
2. Alle materialien/*.json (fuer Progressionsplan-Input)
3. TAFELBILD (fuer TB-Knoten-Referenz)
```

═══════════════════════════════════════════════════
PHASE 3: IMPLEMENTIERUNG (pro Mappe oder gesammelt)
═══════════════════════════════════════════════════
  │
  ▼
[3.1] AGENT_TECHNIK
  │    Eingabe: data.json (alle Mappen) + Template-Verzeichnis
  │    Ausgabe: Funktionsfaehiges Escape-Game-Verzeichnis
  │
  ▼
[3.2] AGENT_DESIGN
  │    Eingabe: Generierte HTML-Dateien
  │    Ausgabe: Gestylte HTML-Dateien + CSS
  │
  ▼
[3.3] AGENT_QUALITAET
  │    Eingabe: Fertiges Escape-Game-Verzeichnis
  │    Ausgabe: Qualitaets-Report
  │
  ▼
QUALITAETS-GATE
  │
  ├─ PASS → FERTIG (Ausgabe)
  │
  └─ FAIL → Ruecklauf an zustaendigen Agenten
       │
       └─ Iteration (max. 3 Durchlaeufe pro Agent)
```

## Iterationsregeln

1. **Qualitaets-Gate**: AGENT_QUALITAET bewertet mit Pass/Fail pro Pruefpunkt gemaess `docs/checklisten/Checkliste_Interaktive_Materialien.md`
2. **Ruecklauf-Zuordnung**: Jeder Mangel wird einem Agenten zugeordnet:
   - Fachfehler → AGENT_INHALT oder AGENT_SKRIPT
   - Didaktische Maengel → AGENT_DIDAKTIK
   - Skript-Kohaerenz → AGENT_SKRIPT
   - Tafelbild-Struktur/Guete → AGENT_HEFTEINTRAG
   - Material-Qualitaet → materialerstellung-skill (Subagenten)
   - Raetsel-Design-Probleme → AGENT_RAETSEL
   - Technische Bugs → AGENT_TECHNIK
   - Visuelle/UX-Probleme → AGENT_DESIGN
3. **Maximal 3 Iterationen** pro Agent pro Erstellungsdurchlauf
4. **Eskalation**: Nach 3 gescheiterten Iterationen → Meldung an Benutzer mit konkreten offenen Issues
5. **User-Validierung**: Pflicht nach Phase 0, Phase 1, und nach jeder Mappe in Phase 2. Kein Fortschritt ohne expliziten PASS.

## Ausfuehrungsorte

| Phase | Agent                    | Ort         | Grund                                              |
| ----- | ------------------------ | ----------- | -------------------------------------------------- |
| 0.1   | AGENT_DIDAKTIK           | Cowork      | Dokumentenarbeit, kein Tool-intensiv               |
| 0.2   | AGENT_INHALT             | Claude Code | Token-intensive Wikipedia-MCP-Recherche            |
| 0.3   | AGENT_SKRIPT             | Cowork      | Textproduktion, kein Tool-intensiv                 |
| 0.4   | AGENT_HEFTEINTRAG          | Cowork      | Synthese-Extraktion aus SKRIPT, kein Tool-intensiv |
| 1.1   | AGENT_MATERIAL (Design)  | Cowork      | Design-Entscheidungen, kein Tool-intensiv          |
| 2.0   | Rahmen-Produktion        | Cowork      | 1 Dispatch: tafelbild/einstieg/sicherung/meta.json (P1, P4) |
| 2.1   | SUB_MATERIAL_* (7 Subagenten) | Cowork  | Isolierter Dispatch pro Material (P1, P4, P5). Output: .json pro Material |
| 2.1c  | Material-Cross-Konsistenz + Ueberleitung + HE-Revision | Cowork | 1 Dispatch: 6 Achsen (4 Cross + Achse 5 Ueberleitungen + Achse 6 HE-Revision) |
| 2.2a  | AGENT_RAETSEL (Orchestrator) | Cowork  | Progressionsplan (liest materialien/*.json — NUR Metadaten, NICHT Volltext) |
| 2.2b  | SUB_AUFGABE_* (5 Subagenten) | Cowork  | Isolierter Dispatch pro Aufgabe (P1, P4, P5). Output: .json pro Aufgabe |
| 2.2c  | AGENT_RAETSEL (Assembly) | Cowork      | Cross-Konsistenz + Q-GATE-LOG (A5, A8-A10, A12) |
| 3.x   | Phase 3 (Assembly)       | Claude Code | Rein mechanisch: Bilder, Assembly, HTML, Git. KEINE didaktischen Entscheidungen |

## Datenstruktur – data.json

**Kanonische Schema-Referenz:** Das data.json-Schema wird hier definiert (siehe unten). Die existierende data.json unter `escape-games/gpg-erster-weltkrieg-ursachen/data.json` ist ein MVP-Produkt, KEINE Vorlage. Sie darf NICHT als Template fuer neue Mappen gelesen werden — das wuerde MVP-spezifische Strukturentscheidungen zementieren und die didaktische Flexibilitaet einschraenken. Die Schema-Autoritaet liegt bei diesem Dokument und den Schnittstellen-Vertraegen in WORKFLOW_v4.md (bzw. den phasen-spezifischen Vertraegen in docs/architektur/vertraege/).

Das Template unter `escape-games/template/data.json` ist veraltet (pre-v3.3) und soll NICHT als Referenz verwendet werden.

Alle Agenten arbeiten konsistent auf folgendem Schema:

```
data.json
├── meta: { titel, fach, jahrgangsstufe, lehrplanbezug, schwierigkeit, geschaetzte_dauer_min, narrativ }
└── mappen[]: Array von Mappe-Objekten
    ├── id, titel, beschreibung, freischalt_code
    ├── einstieg: { narrativ (HTML), problemstellung (C1b: = stundenfrage) }
    ├── materialien[]: Array mit Feldern:
    │   id, typ, titel (C2: Typ A/B), inhalt (HTML), position, didaktische_funktion,
    │   bildunterschrift (C4), quelle, lizenz, voraussetzung[], ueberleitung_von, sequenz_kontext
    ├── aufgaben[]: Array mit Feldern:
    │   id, typ, frage (C3: [[mat-id|Text]]), material_referenz[], optionen/paare/...,
    │   loesung, tipps[] (C3: [[mat-id|Text]] + (M-Position)), punkte
    └── sicherung:
        ├── hefteintrag: { stundenfrage (C1b), ordnungsmuster, scpl{}, transfer{}, voraussetzungen[], knoten[], verbindungen[] }
        ├── zusammenfassung, ueberleitung (C5),
        ├── hefteintrag_verweis, reflexionsimpuls
        └── quellenangaben[] (legacy — aktuell in materialien[].quelle)
```

**Hinweis freischalt_code:** Pflicht. Einzelnes Wort, A-Z, 4-8 Zeichen, thematisch passend. Keine Umlaute/Sonderzeichen. Wird nach Loesung aller Aufgaben als DnD-Buchstabenpuzzle angezeigt. Siehe AGENT_RAETSEL.md.

**Lösungs-Typen pro Aufgabentyp** (Pflicht-Konvention):

| Aufgabentyp | `loesung`-Typ | Beispiel |
|---|---|---|
| `multiple-choice` | String | `"B"` |
| `zuordnung` | Object | `{"Begriff1": "Kategorie1", "Begriff2": "Kategorie2"}` |
| `lueckentext` | Array | `["Wort1", "Wort2"]` |
| `reihenfolge` | Array | `["Schritt1", "Schritt2", "Schritt3"]` |
| `freitext-code` | String (Keyword, 3-5 Woerter) | `"Buendnissysteme Eskalation"` |

## Medien-Workflow

### MVP (Phase 2–4): Textbasiert

- **Keine externen Bilder oder Audio-Dateien** im MVP
- Aufgaben sind rein textbasiert + Unicode-Symbole (✅ ❌ 🔑 📁 💡 🎯)
- Visuelle Gestaltung über CSS: Hintergründe, Bordüren, Gradienten, `::before`/`::after`
- Feedback über Animationen und Farbwechsel statt Audio

### Post-MVP (Phase 5+): Medien-Erweiterung

- Public-Domain- und CC0-Quellen für Bilder (Wikimedia Commons, Pixabay)
- Lizenzprüfung pro Asset dokumentieren
- Audio-Dateien in `assets/audio/` (MP3, max. 100KB pro Datei)
- Asset-Pipeline: Beschaffung → Lizenzprüfung → Optimierung → Integration

## Konventionen

- **Dateipfade**: Immer relativ zum Repo-Root (`escape-games/[thema]/`, nicht absolute Pfade)
- **Thema-Verzeichnis**: Kebab-Case, z.B. `escape-games/industrialisierung/`
- **Keine externen Abhängigkeiten**: Alles inline oder aus `/assets/`
- **Sprache**: Alle Inhalte auf Deutsch, Code-Kommentare auf Deutsch
- **Encoding**: UTF-8 durchgehend

**ID-Konventionen** (Pflicht):

- Mappen-IDs: `mappe-{N}` (z.B. `mappe-1`, `mappe-2`) – numerisch, fortlaufend
- Aufgaben-IDs: `aufgabe-{M}-{N}` (z.B. `aufgabe-1-1`) – M = Mappe-Nummer, N = Aufgaben-Nummer
- Diese Konvention ist technisch erforderlich, da die Navigation zwischen Mappen auf numerischen IDs basiert.

## Ausgabe

Fertiges Escape-Game-Verzeichnis unter `escape-games/[thema]/`:

```
escape-games/[thema]/
├── index.html          # Startseite mit Narrativ-Einführung
├── mappe-1.html        # Erste Mappe (5 Aufgaben)
├── mappe-2.html        # Zweite Mappe
├── ...
├── lehrkraft.html      # Lehrkraft-Zugang (Lösungen, Steuerung)
└── data.json           # Alle Inhalte und Konfiguration
```

## Zugehoerige Agenten-Definitionen

| Agent                   | Datei                                       | Phase     | Verantwortungsbereich                                                                                                                             |
| ----------------------- | ------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Didaktik                | `docs/agents/AGENT_DIDAKTIK.md`             | 0.1       | KE-Matrix, Mappen-Grobstruktur, Schwierigkeitskurve, Leitlinien                                                                                   |
| Inhalt                  | `docs/agents/AGENT_INHALT.md`               | 0.2       | Wikipedia-basierte Sachanalyse, Fakten-Extraktion, Quellenarbeit                                                                                  |
| Skript                  | `docs/agents/AGENT_SKRIPT.md`               | 0.3       | Lineares Jugendsachbuch-Skript (600-900 W/Chunk), Chunking, Artefakt-Positionierung                                                               |
| Tafelbild               | `docs/agents/AGENT_HEFTEINTRAG.md`            | 0.4       | Synthese-Extrakt aus SKRIPT, JSON + Hefteintrag, Q-Gate G1-G14                                                                                    |
| Material (Orchestrator) | `docs/agents/AGENT_MATERIAL.md`             | 1.1 + 2.1 | Design-Modus: Materialtyp-Zuordnung, TB-Abdeckung. Dispatch an 7 SUB_MATERIAL_*. Cross-Konsistenz. Ref: QUALITAETSKRITERIEN_MATERIALPRODUKTION.md |
| Material-Subagenten     | `docs/agents/SUB_MATERIAL_*.md` (7 Dateien) | 2.1       | Typ-spezifische Materialproduktion (DT, QT, BQ, KA, ZL, ST, TB), eigenes Q-Gate, Engine-Typ-Mapping                                               |
| Raetsel (Orchestrator)  | `docs/agents/AGENT_RAETSEL.md`              | 2.2a/c    | Progressionsplan, Dispatch, Cross-Konsistenz, Codes, Narrativ, Orchestrator-Q-Gate (A5, A8-A10, A12)                                              |
| Aufgaben-Subagenten     | `docs/agents/SUB_AUFGABE_*.md` (5 Dateien)  | 2.2b      | Typ-spezifische Konstruktion (MC, Zuordnung, Lueckentext, Reihenfolge, Freitext), Subagenten-Q-Gate (A1-A3, A4-*, A6-A7, A11-FT)                  |
| Technik                 | `docs/agents/AGENT_TECHNIK.md`              | 3.1       | HTML/CSS/JS-Implementierung, Barrierefreiheit                                                                                                     |
| Design                  | `docs/agents/AGENT_DESIGN.md`               | 3.2       | Visuelles Theme, Responsive Design, UX                                                                                                            |
| Qualitaet               | `docs/agents/AGENT_QUALITAET.md`            | 3.3       | Test, Review, Checklisten-Abarbeitung                                                                                                             |
|                         |                                             |           |                                                                                                                                                   |

## Referenz-Dokumente

| Dokument | Relevanz |
|---|---|
| `docs/architektur/WORKFLOW_v4.md` | **Kanonisch** — Phasenstruktur, Agenten-Reihenfolge, Artefakt-Definitionen, Schnittstellen-Vertraege |
| `docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md` | Empirische Guetekriterien G1-G14 fuer Tafelbild (Q-Gate AGENT_HEFTEINTRAG) |
| `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md` | Fachdidaktische Guetekriterien A1-A15 fuer Aufgaben (Q-Gate AGENT_RAETSEL) |
| `docs/checklisten/GUETEKRITERIEN_SKRIPT.md` | Fachdidaktische Guetekriterien SK1-SK15 fuer Skript (Q-Gate AGENT_SKRIPT) |
| `docs/checklisten/GUETEKRITERIEN_SEQUENZIERUNG.md` | Fachdidaktische Guetekriterien S1-S15 fuer Sequenzierung (Q-Gate AGENT_MATERIAL) |
| `docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md` | Zentrale Qualitaetskriterien M1-M12 (typ-uebergreifend) + 7 typ-spezifische Kriteriensaetze (DT/QT/BQ/KA/ZL/ST/TB). Referenziert von allen SUB_MATERIAL_*.md |
| `docs/architektur/WORKFLOW_v1.md` | Vorgaenger — data.json Schema, Material-Typen, Engine-Spezifikationen bleiben gueltig |
| `docs/agents/AGENT_MATERIAL.md` | Material-Orchestrator: Design-Modus, Dispatch-Logik, Produktionskontext. Delegiert an 7 SUB_MATERIAL_*.md |
| `docs/checklisten/MCP_TOOLS.md` | Vollstaendige MCP-Tool-Dokumentation (30+ Tools) |
| `docs/architektur/flowchart-neuausrichtung.mermaid` | Flowchart v2 (fuer Ueberblick) |
