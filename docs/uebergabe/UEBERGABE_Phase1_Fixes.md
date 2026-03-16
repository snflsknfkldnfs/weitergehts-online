# Übergabe-Prompt: Phase 1 Audit-Fixes (Blocker + High Priority)

## Kontext

Repository: `weitergehts-online` (GitHub: snflsknfkldnfs/weitergehts-online)
Lokaler Pfad: `/Users/paulad/weitergehts.online/weitergehts-online/`
Betroffene Dateien: 8 Markdown-Dateien unter `docs/`

Ein externes Audit hat die 8 Agenten-Dateien geprüft. Ergebnis: 2 Blocker und 5 High-Priority-Issues müssen vor Phase 2 behoben werden. Die Agenten sind Prompt-Dateien für ein Subagent-Team, das Escape-Games als statische HTML/CSS/JS-Websites erzeugt.

## Aufgaben

### BLOCKER B2: Zentrales Pfad-Manifest + Pfad-Korrekturen

Erstelle `docs/PFAD_MANIFEST.md` mit allen referenzierten Quellpfaden. Korrigiere dann alle Agenten-MDs.

**Problem:** Pfade über Agenten hinweg uneinheitlich. Typo "Repsitory" statt "Repository". Verkürzte vs. volle Pfade. Keine Verifikation ob Pfade existieren.

**Vorgehen:**
1. Lies alle 8 Dateien unter `docs/` und extrahiere jeden referenzierten Pfad
2. Verifiziere gegen das tatsächliche Filesystem unter `/Users/paulad/weitergehts.online/` ob die Pfade existieren
3. Erstelle `docs/PFAD_MANIFEST.md` mit Tabelle: | Agent | Referenzierter Pfad | Verifiziert (ja/nein) | Korrekter Pfad |
4. Korrigiere alle Pfade in allen Agenten-MDs auf die verifizierten, vollständigen Pfade
5. Fixe den Typo "Repsitory" → "Repository" überall

### HIGH H1: data.json Tipps-Schema vereinheitlichen

**Problem:** ORCHESTRATOR.md definiert `tipps` als String-Array `["Tipp 1", "Tipp 2", "Tipp 3"]`. AGENT_RAETSEL.md erwartet ein 3-Stufen-System mit unterschiedlicher Hilfetiefe (Stufe 1: Denkanstoß, Stufe 2: Lösungsrichtung, Stufe 3: Erklärung).

**Lösung:** In ORCHESTRATOR.md das data.json-Schema für `tipps` ändern auf:
```json
"tipps": [
  {"stufe": 1, "text": "Denkanstoß ohne Lösungsverraten"},
  {"stufe": 2, "text": "Lösungsrichtung andeuten"},
  {"stufe": 3, "text": "Erklärung mit Lösung"}
]
```
Sicherstellen, dass AGENT_RAETSEL.md dasselbe Schema referenziert.

### HIGH H2: Styling-Zuständigkeit klären (TECHNIK vs. DESIGN)

**Problem:** Beide Agenten haben überlappende Verantwortung für CSS/Layout. Unklar wer was macht.

**Lösung:** Klare Trennung einführen:
- AGENT_TECHNIK: Generiert **funktionales HTML mit CSS-Klassen** (semantische Struktur, keine Inline-Styles, keine Farben/Fonts). Nutzt BEM-artige Klassennamen (z.B. `.aufgabe__eingabe`, `.mappe__header`).
- AGENT_DESIGN: Füllt die Klassen mit **visuellem Styling** (Farben, Fonts, Abstände, Animationen, Responsive). Arbeitet ausschließlich in CSS-Dateien, ändert kein HTML.

In beiden Agenten-MDs die Abgrenzung explizit dokumentieren.

### HIGH H3: escape-engine.js API-Signaturen definieren

**Problem:** AGENT_TECHNIK.md benennt 7 Funktionen (init, checkCode, saveProgress, loadProgress, showTipp, resetProgress, unlockMappe) ohne Parameter und Return-Types.

**Lösung:** In AGENT_TECHNIK.md die API-Sektion erweitern:

```javascript
// Signaturen (Vorschlag -- bei Implementierung in Phase 2 finalisieren)
EscapeEngine.init(mappeId: string) → void
EscapeEngine.checkCode(mappeId: string, eingabe: string) → { correct: boolean, message: string }
EscapeEngine.saveProgress(mappeId: string, aufgabeIndex: number, solved: boolean) → void
EscapeEngine.loadProgress(mappeId: string) → { aufgaben: boolean[], abgeschlossen: boolean }
EscapeEngine.showTipp(mappeId: string, aufgabeIndex: number, stufe: 1|2|3) → string
EscapeEngine.resetProgress() → void
EscapeEngine.unlockMappe(mappeId: string) → void
```

### HIGH H4: Drag-and-Drop vereinfachen

**Problem:** `zuordnung`-Aufgabentyp als Drag-and-Drop spezifiziert. Vanilla-JS D&D ist für MVP zu komplex (Touch-Support, Accessibility, Edge-Cases).

**Lösung:** In AGENT_RAETSEL.md und AGENT_TECHNIK.md den `zuordnung`-Typ auf **Dropdown-Zuordnung** umspezifizieren:
- Linke Spalte: Begriffe (fest)
- Rechte Spalte: Dropdown-Selects mit allen möglichen Zuordnungen
- Validierung: Alle Dropdowns müssen korrekt zugeordnet sein

D&D als optionale Erweiterung für Post-MVP kennzeichnen.

### HIGH H5: Medien-Workflow definieren

**Problem:** Kein Prozess für Bild-/Audio-Beschaffung und -Integration spezifiziert.

**Lösung:** In ORCHESTRATOR.md eine Medien-Sektion ergänzen:
- MVP: Keine externen Bilder/Audio. Rein textbasiert + Unicode-Symbole + CSS-generierte Grafiken.
- Phase 5 (Erweiterung): Medien-Workflow definieren (Public-Domain-Quellen, Lizenzprüfung, Asset-Pipeline).
- In AGENT_RAETSEL.md: Aufgaben so formulieren, dass sie ohne Bilder funktionieren.
- In AGENT_DESIGN.md: Visuelle Gestaltung rein über CSS (Hintergründe, Bordüren, Symbole).

## Erfolgskriterium

1. `docs/PFAD_MANIFEST.md` existiert mit verifizierter Pfad-Tabelle
2. Alle Agenten-MDs verwenden konsistente, verifizierte Pfade
3. Kein Vorkommen von "Repsitory" mehr im Repo
4. data.json Tipps-Schema ist zwischen ORCHESTRATOR und AGENT_RAETSEL konsistent (Objekte, nicht Strings)
5. AGENT_TECHNIK und AGENT_DESIGN haben explizite Abgrenzung (HTML-Struktur vs. CSS-Styling)
6. escape-engine.js hat definierte Signaturen mit Parametern und Return-Types
7. `zuordnung`-Typ ist Dropdown statt D&D
8. Medien-Workflow ist "MVP = textbasiert" definiert
9. Alle Änderungen committed und gepusht

## Nach Abschluss

Melde den Abschluss in Cowork mit: "Update: Phase 1 Audit-Fixes erledigt. Ergebnis: [Liste der geänderten Dateien + Zusammenfassung]"
