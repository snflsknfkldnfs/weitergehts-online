# Uebergabe-Artefakt: v3.8 Cowork-Runde 0 — Material-Subagenten-Extraktion

**Datum:** 2026-03-29
**Uebergabe von:** Cowork-Session (Token-Limit erreicht)
**Uebergabe an:** Naechste Cowork-Instanz
**Projekt:** weitergehts.online — Interaktive Unterrichtsmaterialien (Escape-Games fuer GPG, Mittelschule R7)

---

## 1. Orientierung (LIES ZUERST)

### Was ist dieses Projekt?

Eine statische Website (GitHub Pages) mit interaktiven Escape-Games fuer den Geschichtsunterricht. Lehrkraft Paul erstellt mit einem Agenten-Team (Cowork + Claude Code) didaktisch hochwertige Lernmaterialien. Die Agenten-Architektur ist in `docs/agents/` definiert, der Gesamtprozess in `docs/architektur/WORKFLOW_v2.md`.

### Wo stehen wir?

**Phase v3.8** des UPGRADE_PLANs: "Material-Subagenten + Qualitaet + UI-Optimierung". Audit abgeschlossen, UPGRADE_PLAN finalisiert, Implementierung steht bevor.

### Was ist als naechstes zu tun?

**Cowork-Runde 0 (C0): Material-Subagenten-Extraktion.** AGENT_MATERIAL.md (804 Zeilen, monolithisch) wird analog zu v3.7 (AGENT_RAETSEL → SUB_AUFGABE_*) in Orchestrator + 7 Subagenten aufgeteilt. ACHTUNG: 5 von 7 Subagenten existieren bereits als AGENT_SUB_*.md (alte Namenskonvention) — C0 ist daher primaer Rename + Review + Ergaenzung um 2 fehlende, NICHT komplette Neuerstellung.

---

## 2. Pflichtlektuere (Lesereihenfolge)

Lies diese Dokumente in dieser Reihenfolge, BEVOR du mit der Arbeit beginnst:

| # | Dokument | Warum |
|---|----------|-------|
| 1 | `docs/projekt/STATUS.md` | Aktueller Projektstatus, naechster Schritt |
| 2 | `docs/architektur/UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md` — **Phase v3.8** (ab Zeile ~645) | DER IMPLEMENTIERUNGSPLAN. Enthaelt: C0-Beschreibung, 7-Subagenten-Tabelle mit Engine-Typ-Mapping, Produktionskontext-Template mit skript_passage, Quellenrecherche-Verortung, Implementierungsreihenfolge, 15 Verifikationspunkte |
| 3 | `docs/agents/AGENT_MATERIAL.md` — KOMPLETT | Der zu refaktorisierende Monolith. Zwei Modi (Design Phase 1 / Produktion Phase 2), 7 Workflows (W-1 bis W-7), Qualitaetsspezifikationen, Tool-Chains. HIERAUS wird extrahiert |
| 4 | `docs/agents/SUB_AUFGABE_MC.md` | Referenz-Struktur: So soll ein fertiger Material-Subagent aussehen (Rolle, Heuristiken, Q-Kriterien, Rendering-Kontrakt, Beispiel) |
| 5 | `docs/agents/AGENT_RAETSEL.md` — Sektionen 1-3 | Referenz-Orchestrator: So soll AGENT_MATERIAL nach Refactoring aussehen (Dispatch-Logik, Kontext-Template, Cross-Checks) |
| 6 | `docs/architektur/WORKFLOW_v2.md` — Phase 2.1 (ab Zeile ~600) | Bestehender Subagenten-Dispatch-Ablauf mit 5 AGENT_SUB_* (existieren als Dateien). Werden auf 7 SUB_MATERIAL_* erweitert + umbenannt |
| 6b | `docs/agents/AGENT_SUB_DARSTELLUNGSTEXT.md` (stellvertretend) | Lies mindestens einen existierenden Subagenten, um den Ist-Zustand der Struktur/Qualitaet zu kennen BEVOR du Review-Entscheidungen triffst |
| 7 | `docs/analyse/Audit Report v3.8.md` | Audit-Ergebnisse (10 Findings). Evaluiert in vorheriger Session — 8 valide, in UPGRADE_PLAN eingearbeitet |

### Optionale Kontextdokumente

| Dokument | Wann lesen |
|----------|-----------|
| `docs/analyse/AUDIT_BRIEFING_v3-8_MATERIAL_SUBAGENTEN.md` | Fuer Hintergrund zu den 3 Prueffragestellungen (A: Grenzziehung, B: Tool-Chains, C: Ausfuehrungsort) |
| `docs/agents/ORCHESTRATOR.md` | Wenn unklar, wie Agenten zusammenarbeiten |
| `docs/checklisten/GUETEKRITERIEN_SEQUENZIERUNG.md` | Wenn unklar, wie Sequenzierung qualitaetsgesichert wird |
| `docs/projekt/CHANGELOG.md` | Chronologisches Protokoll aller bisherigen Arbeitsschritte |

---

## 3. Implementierungsauftrag C0

### 3.1 Was zu erstellen ist

**ACHTUNG: 5 Subagenten existieren bereits** unter alter Namenskonvention (`AGENT_SUB_*.md`). C0 ist KEIN Greenfield — es ist Rename + Review + Ergaenzung.

#### Schritt A: Rename (5 existierende Dateien)

| Existierende Datei (AGENT_SUB_*) | Zieldatei (SUB_MATERIAL_*) | Zeilen |
|----------------------------------|---------------------------|--------|
| `AGENT_SUB_DARSTELLUNGSTEXT.md` | `SUB_MATERIAL_DARSTELLUNGSTEXT.md` | 157 |
| `AGENT_SUB_QUELLENTEXT.md` | `SUB_MATERIAL_QUELLENTEXT.md` | 188 |
| `AGENT_SUB_BILDQUELLE.md` | `SUB_MATERIAL_BILDQUELLE.md` | 222 |
| `AGENT_SUB_ZEITLEISTE.md` | `SUB_MATERIAL_ZEITLEISTE.md` | 169 |
| `AGENT_SUB_TAGEBUCH.md` | `SUB_MATERIAL_TAGEBUCH.md` | 178 |

Rename-Befehl: `git mv docs/agents/AGENT_SUB_[NAME].md docs/agents/SUB_MATERIAL_[NAME].md`

#### Schritt B: Neu erstellen (2 fehlende Dateien)

| Datei | Quelle in AGENT_MATERIAL.md | Engine-Typ (data.json) |
|-------|---------------------------|----------------------|
| `SUB_MATERIAL_KARTE.md` | W-4 + Qualitaetsspez. (Kartenteil, bisher in AGENT_SUB_BILDQUELLE eingebettet) | `bildquelle` (Engine kennt keinen Karten-Renderer) |
| `SUB_MATERIAL_STATISTIK.md` | W-6 + Qualitaetsspez. "statistik" (bisher kein Subagent) | `zeitleiste` (Tabelle) oder `bildquelle` (Diagramm-PNG) |

#### Schritt C: Review + Update (alle 7)

Alle 7 Subagenten gegen Struktur-Template (Sektion 3.2) und UPGRADE_PLAN v3.8 pruefen. Insbesondere:

- Produktionskontext-Template (inkl. skript_passage typ-differenziert) einbauen/aktualisieren
- Rendering-Kontrakt mit explizitem Engine-Typ-Mapping ergaenzen
- Quellenrecherche-Verortung beachten (QT/ST recherchieren selbst, BQ/KA erhalten Artefakte)
- Beispiel-Output und Q-Gate-Log-Format ergaenzen wo fehlend

#### Zusammenfassung: 7 Zieldateien

| Datei | Herkunft | Engine-Typ (data.json) |
|-------|---------|----------------------|
| `SUB_MATERIAL_DARSTELLUNGSTEXT.md` | Rename AGENT_SUB_ + Review | `darstellungstext` |
| `SUB_MATERIAL_QUELLENTEXT.md` | Rename AGENT_SUB_ + Review | `quellentext` |
| `SUB_MATERIAL_BILDQUELLE.md` | Rename AGENT_SUB_ + Review | `bildquelle` |
| `SUB_MATERIAL_KARTE.md` | NEU (Split aus BQ + W-4) | `bildquelle` |
| `SUB_MATERIAL_ZEITLEISTE.md` | Rename AGENT_SUB_ + Review | `zeitleiste` |
| `SUB_MATERIAL_STATISTIK.md` | NEU (W-6) | `zeitleiste` / `bildquelle` |
| `SUB_MATERIAL_TAGEBUCH.md` | Rename AGENT_SUB_ + Review | `quellentext` |

### 3.2 Struktur jedes Subagenten (analog SUB_AUFGABE_*.md)

```
SUB_MATERIAL_[TYP].md
├── Rolle + Didaktischer Zweck
│   Wann wird dieser Materialtyp eingesetzt?
│   Welche didaktische Funktion erfuellt er?
│
├── Eingabe: Produktionskontext (Pflicht)
│   Template: siehe UPGRADE_PLAN v3.8
│   INKL. skript_passage (typ-differenziert: Volltext oder Zusammenfassung)
│
├── Produktions-Workflow
│   Bisherige W-*-Sektion aus AGENT_MATERIAL.md
│   Tool-Chain (MCP-Referenzen wo relevant)
│   Pfad-Entscheidungslogik (A/B/C wo relevant)
│
├── Qualitaetsspezifikation
│   Bisherige Qualitaets-Gate-Sektion
│   Wortbudget + Stil-Constraints
│   Typ-spezifische Anti-Patterns
│
├── Rendering-Kontrakt
│   data.json material-Schema (exakte Felder)
│   Engine-Typ (KRITISCH: karte→bildquelle, tagebuch→quellentext etc.)
│   HTML-Struktur (erlaubte Tags)
│
├── Beispiel
│   1 vollstaendiges material-JSON-Objekt + Q-Gate-Log
│
└── Ausgabe
    material-JSON-Objekt + Q-Gate-Log
```

### 3.3 Was in AGENT_MATERIAL.md BLEIBT (Orchestrator)

- Design-Modus komplett (Phase 1: Aufgaben 1.1-1.10)
- Materialtyp-Auswahllogik (Skript-basierte + TB-basierte Trigger)
- Sequenzplanung (Aufgabe 1.9)
- Mindest-Materialien pro Mappe
- Quellenrecherche-Referenz-Workflow (uebergreifend, als Referenz fuer QT/ST)
- Kern-Prinzipien (8 Stueck)
- Produktionskontext-Template + Dispatch-Logik (NEU)
- Subagenten-Referenztabelle (NEU)

### 3.4 Was aus AGENT_MATERIAL.md ENTFERNT wird

- W-1 bis W-7 (gehen in Subagenten)
- W-8 Tafelbild-Workflow (obsolet seit v3, TB ist AGENT_TAFELBILD)
- Qualitaetsspezifikationen pro Materialtyp (gehen in Subagenten)
- Einzelne MCP-Tool-Zuordnungstabelle (geht in Subagenten)
- Einstieg-Illustration-Workflow (geht in SUB_MATERIAL_BILDQUELLE als Variante)
- TB-Qualitaetsspezifikation "Tafelbild (Sicherung)" (obsolet)

### 3.5 Kritische Entscheidungen (bereits getroffen)

| Entscheidung | Ergebnis | Quelle |
|-------------|---------|--------|
| Namenskonvention | `SUB_MATERIAL_*` (konsistent mit `SUB_AUFGABE_*`) | Audit I-1 |
| Subagenten-Anzahl | 7 (Karte und Statistik eigene Subagenten) | Audit I-2 |
| Quellenrecherche-Verortung | QT/ST recherchieren selbst, BQ/KA erhalten Artefakte aus Phase 2.0 | Audit Finding #2 mod. |
| Skript-Passage | Volltext (200-300W) fuer DT/TB/QT, 1-Satz fuer BQ/KA/ZL/ST | Audit Finding #1 |
| W-8 Tafelbild | Entfernen (obsolet seit v3) | Audit Finding #5 |
| Engine-Typ-Mapping | Im Rendering-Kontrakt jedes Subagenten explizit | Audit Finding #4 |
| Display-Referenz C3 | M[position] (mappenrelativ, 1-basiert) | Audit Finding #6 |
| C5 Abschlussfrage | Formulierung nur AGENT_SKRIPT, RAETSEL uebernimmt | Audit Finding #8 mod. |
| Ausfuehrungsort | Prompt-Pflege in Cowork (docs/), Ausfuehrung in Claude Code | Audit Fragestellung C |

### 3.6 Zusaetzlicher Qualifizierungsauftrag

Der User hat Trainingsmaterial fuer die Material-Subagenten hochgeladen (PDFs: Bausteinskripte zu Materialgestaltung im Geschichtsunterricht — Darstellungstexte, Quellentexte, Bildquellen, Karten etc.). Diese muessen VOR oder WAEHREND der Subagenten-Erstellung analysiert und die Best Practices in die jeweiligen Subagenten-Prompts eingearbeitet werden. Der User wird die Dateien erneut bereitstellen — **aktiv danach fragen** zu Beginn der Session. Aus den PDFs sind zu extrahieren: didaktische Qualitaetskriterien pro Materialtyp, Sinnstrukturen, Anti-Patterns, Formulierungsheuristiken. Die Extraktion erfolgt typ-spezifisch (DT-relevante Best Practices → SUB_MATERIAL_DARSTELLUNGSTEXT usw.).

**DATENSCHUTZ-ANWEISUNG:** Die Trainingsmaterialien (insbesondere Bausteinskripte und deren Verwendungskontext) duerfen NIEMALS woertlich in die Infrastruktur-Dokumente uebernommen werden. Nur abstrahierte Best Practices, Sinnstrukturen und Qualitaetskriterien extrahieren und in die Agentenstruktur einbetten.

---

## 4. Nach C0 ausstehende Schritte (v3.8)

| Runde | Inhalt | Status |
|-------|--------|--------|
| 0 | C0: Material-Subagenten-Extraktion | **NAECHSTER SCHRITT** |
| 1 | C1 + C2: Stundenfrage-Constraint + Material-Titel als Teilfragen | Offen |
| 2 | C3 + C4 + C5: Display-Referenzen + Bildunterschriften + Abschlussfrage | Offen |
| 3 | U1-U4: UI-Aenderungen (Uebergabe-Prompt fuer Claude Code) | Offen |
| 4 | Migration Mappe 1 | Offen |

### Referenz-Docs die nach C0 aktualisiert werden muessen

- `docs/architektur/WORKFLOW_v2.md` — Phase 2.1: AGENT_SUB_* → SUB_MATERIAL_* (Rename), Subagenten-Tabelle von 5→7, Dispatch-Ablauf auf Produktionskontext umstellen, Referenztabelle (Zeile 824-828) umbenennen
- `docs/agents/ORCHESTRATOR.md` — Material-Subagenten in Referenztabelle
- `docs/agents/AGENT_TECHNIK.md` — Material-Typ-Registry mit SUB_MATERIAL_*-Referenzen
- `docs/projekt/STATUS.md` — Aktualisieren
- `docs/projekt/CHANGELOG.md` — Eintrag schreiben

---

## 5. Projektkonventionen

### File-Ownership

| Domaene | Dateien | Wer aendert |
|---------|---------|-------------|
| Cowork | `docs/**` | Cowork-Session (du) |
| Claude Code | `assets/`, `escape-games/`, HTML/JS/CSS | Claude Code via Uebergabe-Prompt |

### Commit-Konvention

- Prefix: `v3.8:` fuer alle v3.8-Commits
- Branch: `main` (kein Feature-Branching, Solo-Entwickler)

### Encoding

- ASCII-Umlaute in Docs (ae, oe, ue, ss) — KEINE echten Umlaute in .md-Dateien unter docs/
- Echte UTF-8-Umlaute NUR in data.json und HTML-Output

### User-Praeferenzen

- Blunt, directive Kommunikation
- Keine Emojis, kein Filler, keine Motivationssaetze
- Antwort beenden nach Informationslieferung
- Ziel: User-Selbststaendigkeit

---

## 6. Bekannte Fallstricke

1. **Edit-Tool erfordert Read zuerst.** Jede Datei muss gelesen werden, bevor sie editiert werden kann.
2. **AGENT_SUB_*.md existieren als Dateien (5 Stueck).** AGENT_SUB_DARSTELLUNGSTEXT.md (157Z), AGENT_SUB_QUELLENTEXT.md (188Z), AGENT_SUB_BILDQUELLE.md (222Z), AGENT_SUB_ZEITLEISTE.md (169Z), AGENT_SUB_TAGEBUCH.md (178Z). Erstellt am 2026-03-28. Es fehlen: KARTE (in BQ eingebettet) und STATISTIK (nie erstellt). C0 beginnt mit `git mv` zum Rename, NICHT mit Neuerstellen. WORKFLOW_v2.md Referenztabelle (Zeile 824-828) referenziert diese Dateien korrekt.
3. **Git Lock Files.** Falls `.git/*.lock` existiert: User bitten, manuell zu entfernen (`rm .git/ORIG_HEAD.lock`).
4. **Token-Limits bei grossen Dateien.** AGENT_MATERIAL.md ist 804 Zeilen. In Abschnitten lesen (offset/limit).
5. **Skill "projekt-website-v2"** wird bei Website-/Escape-Game-Begriffen getriggert. Fuer die aktuelle Aufgabe (Subagenten-Erstellung) ist der Skill NICHT noetig — direkt arbeiten.
