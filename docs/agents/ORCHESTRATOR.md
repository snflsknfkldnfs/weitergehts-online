# ORCHESTRATOR – Gesamtkoordination Escape-Game-Erstellung (v3)

## Rolle

Zentrale Steuerungsinstanz fuer den gesamten Erstellungsprozess eines interaktiven Escape-Games. Koordiniert acht spezialisierte Agenten in vier Phasen, verwaltet Datenfluesse zwischen Agenten, erzwingt User-Validierung an definierten Audit-Punkten und stellt die Einhaltung aller Qualitaetsstandards sicher.

**Kanonische Referenz:** `docs/architektur/WORKFLOW_v2.md` (v3) — bei Widerspruechen gilt WORKFLOW_v2.md.

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
[0.4] AGENT_TAFELBILD                                 ← NEU v3
  │    Eingabe: Validiertes SKRIPT + DIDAKTIK_RAHMEN + ARTEFAKT_INVENTAR
  │    Ausgabe: TAFELBILD_[game-id]_Mappe[N].md (pro Mappe)
  │             (Dual: JSON-Repraesentation + Hefteintrag 80-120 W)
  │    Q-Gate: 13 Kriterien (G1-G13), GUETEKRITERIEN_TAFELBILD.md
  │    TB-FREEZE: Nach Q-Gate PASS eingefroren fuer MATERIAL
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
═══════════════════════════════════════════════════
  │
  ▼
  ┌─────── Mappe N (N = 1 bis mappen_anzahl) ──────┐
  │                                                  │
  │  [2.1] materialerstellung-skill (Subagenten)     │
  │        Eingabe: Skript-Chunk N + Material-Geruest N
  │        Ausgabe: Produzierte Materialien (data.json Abschnitt)
  │        Subagenten: Text, Quellen, Bild, Struktur, Tafelbild
  │        Ort: Claude Code                          │
  │                                                  │
  │  [2.2] AGENT_RAETSEL                             │
  │        Eingabe: Produzierte Materialien + DIDAKTIK_RAHMEN
  │        Ausgabe: Aufgaben + Codes + Tipps + Narrativ
  │        Ort: Claude Code                          │
  │                                                  │
  │  ══ USER-VALIDIERUNG (PFLICHT, pro Mappe) ═════  │
  │  Lehrkraft prueft: Materialqualitaet,            │
  │  Aufgaben-Material-Match, inhaltliche Korrektheit│
  │  PASS → naechste Mappe | FAIL → Iteration        │
  │                                                  │
  └──────────────────────────────────────────────────┘
  │
  ▼
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
   - Tafelbild-Struktur/Guete → AGENT_TAFELBILD
   - Material-Qualitaet → materialerstellung-skill (Subagenten)
   - Raetsel-Design-Probleme → AGENT_RAETSEL
   - Technische Bugs → AGENT_TECHNIK
   - Visuelle/UX-Probleme → AGENT_DESIGN
3. **Maximal 3 Iterationen** pro Agent pro Erstellungsdurchlauf
4. **Eskalation**: Nach 3 gescheiterten Iterationen → Meldung an Benutzer mit konkreten offenen Issues
5. **User-Validierung**: Pflicht nach Phase 0, Phase 1, und nach jeder Mappe in Phase 2. Kein Fortschritt ohne expliziten PASS.

## Ausfuehrungsorte

| Phase | Agent | Ort | Grund |
|---|---|---|---|
| 0.1 | AGENT_DIDAKTIK | Cowork | Dokumentenarbeit, kein Tool-intensiv |
| 0.2 | AGENT_INHALT | Claude Code | Token-intensive Wikipedia-MCP-Recherche |
| 0.3 | AGENT_SKRIPT | Cowork | Textproduktion, kein Tool-intensiv |
| 0.4 | AGENT_TAFELBILD | Cowork | Synthese-Extraktion aus SKRIPT, kein Tool-intensiv |
| 1.1 | AGENT_MATERIAL | Cowork | Design-Entscheidungen, kein Tool-intensiv |
| 2.1 | materialerstellung-skill | Claude Code | MCP-Tool-Ketten (W-1 bis W-8) |
| 2.2 | AGENT_RAETSEL | Claude Code | Abhaengig von materialerstellung-Output |
| 3.x | TECHNIK/DESIGN/QUALITAET | Claude Code | HTML/CSS/JS-Implementierung |

## Datenstruktur – data.json (v1-erweitertes Schema)

Alle Agenten arbeiten konsistent auf dem v1-erweiterten Schema. Kanonische Referenz: `docs/architektur/WORKFLOW_v1.md` Abschnitt 9 (data.json Schema).

```json
{
  "meta": {
    "titel": "",
    "fach": "",
    "jahrgangsstufe": "",
    "lehrplanbezug": "",
    "schwierigkeit": "",
    "geschaetzte_dauer_min": 0
  },
  "mappen": [
    {
      "id": "mappe-1",
      "titel": "",
      "beschreibung": "",
      "freischalt_code": "",
      "einstieg": {
        "typ": "narrativ | szenario | rueckblick",
        "text": "",
        "tafelbild_voraussetzungen": []
      },
      "materialien": [
        {
          "id": "mat-1-1",
          "typ": "darstellungstext | quellentext | bildquelle | karte | zeitleiste | statistik | tagebuch",
          "titel": "",
          "inhalt": "",
          "tafelbild_knoten": [],
          "quelle": ""
        }
      ],
      "aufgaben": [
        {
          "id": "aufgabe-1-1",
          "typ": "multiple-choice | zuordnung | lueckentext | reihenfolge | freitext-code",
          "frage": "",
          "optionen": [],
          "loesung": "",
          "material_referenz": "mat-1-1",
          "tipps": [
            {"stufe": 1, "text": "Denkanstoß ohne Lösungsverraten"},
            {"stufe": 2, "text": "Lösungsrichtung andeuten"},
            {"stufe": 3, "text": "Erklärung mit Lösung"}
          ],
          "punkte": 0
        }
      ],
      "sicherung": {
        "typ": "zusammenfassung | reflexion | transfer",
        "text": ""
      },
      "tafelbild": {
        "knoten": [
          {"id": "k1-1", "text": "", "typ": "kernbegriff | kategorie | ursache | wirkung | akteur | ereignis"}
        ],
        "verbindungen": [
          {"von": "k1-1", "nach": "k1-2", "label": ""}
        ],
        "voraussetzungen": []
      },
      "quellenangaben": [
        {"id": "q1-1", "material_referenz": "mat-1-1", "text": "", "lizenz": ""}
      ]
    }
  ]
}
```

**Lösungs-Typen pro Aufgabentyp** (Pflicht-Konvention):

| Aufgabentyp | `loesung`-Typ | Beispiel |
|---|---|---|
| `multiple-choice` | String | `"B"` |
| `zuordnung` | Object | `{"Begriff1": "Kategorie1", "Begriff2": "Kategorie2"}` |
| `lueckentext` | Array | `["Wort1", "Wort2"]` |
| `reihenfolge` | Array | `["Schritt1", "Schritt2", "Schritt3"]` |
| `freitext-code` | String | `"antwort"` |

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

| Agent | Datei | Phase | Verantwortungsbereich |
|---|---|---|---|
| Didaktik | `docs/agents/AGENT_DIDAKTIK.md` | 0.1 | KE-Matrix, Mappen-Grobstruktur, Schwierigkeitskurve, Leitlinien |
| Inhalt | `docs/agents/AGENT_INHALT.md` | 0.2 | Wikipedia-basierte Sachanalyse, Fakten-Extraktion, Quellenarbeit |
| Skript | `docs/agents/AGENT_SKRIPT.md` | 0.3 | Lineares Jugendsachbuch-Skript (600-900 W/Chunk), Chunking, Artefakt-Positionierung |
| Tafelbild | `docs/agents/AGENT_TAFELBILD.md` | 0.4 | Synthese-Extrakt aus SKRIPT, JSON + Hefteintrag, Q-Gate G1-G13 |
| Material | `docs/agents/AGENT_MATERIAL.md` | 1.1 + 2.1 | Design-Modus: Materialtyp-Zuordnung, TB-Abdeckung. Dispatch: Subagenten-Koordination |
| Raetsel | `docs/agents/AGENT_RAETSEL.md` | 2.2 | Aufgabendesign, Codes, Tipps, Narrativ |
| Technik | `docs/agents/AGENT_TECHNIK.md` | 3.1 | HTML/CSS/JS-Implementierung, Barrierefreiheit |
| Design | `docs/agents/AGENT_DESIGN.md` | 3.2 | Visuelles Theme, Responsive Design, UX |
| Qualitaet | `docs/agents/AGENT_QUALITAET.md` | 3.3 | Test, Review, Checklisten-Abarbeitung |

## Referenz-Dokumente

| Dokument | Relevanz |
|---|---|
| `docs/architektur/WORKFLOW_v2.md` (v3) | **Kanonisch** — Phasenstruktur, Agenten-Reihenfolge, Artefakt-Definitionen |
| `docs/checklisten/GUETEKRITERIEN_TAFELBILD.md` | Empirische Guetekriterien G1-G13 fuer Tafelbild (Q-Gate AGENT_TAFELBILD) |
| `docs/architektur/WORKFLOW_v1.md` | Vorgaenger — data.json Schema, Material-Typen, Engine-Spezifikationen bleiben gueltig |
| `docs/agents/AGENT_MATERIAL.md` | MCP-Tool-Workflows W-1 bis W-8, Qualitaetsspezifikationen pro Materialtyp |
| `docs/checklisten/MCP_TOOLS.md` | Vollstaendige MCP-Tool-Dokumentation (30+ Tools) |
| `docs/architektur/flowchart-neuausrichtung.mermaid` | Flowchart v2 (fuer Ueberblick) |
