# Projektstatus: Interaktive Unterrichtsmaterialien -- weitergehts.online

**Letzte Aktualisierung:** 2026-04-02
**Aktuelle Phase:** **v4 Produktionsarchitektur — Audit: Sicherungskette (Tafelbild/Hefteintrag/Sicherung).**
**Letzter Arbeitsschritt:** AUDIT_BRIEFING_SICHERUNGSKETTE.md erstellt. Bestandsaufnahme der Prozesskette, 6 Strukturprobleme (SP-1 bis SP-6) identifiziert, 16 Prueffragen fuer externen Auditor formuliert. Didaktische Idealstruktur des Auftraggebers als Referenzmodell dokumentiert.
**Naechster Schritt:** Externen Audit einholen (AUDIT_BRIEFING_SICHERUNGSKETTE.md). Danach: Findings evaluieren, ggf. Prozess umstrukturieren. Parallel noch offen: Engine-Fallback (Ueberleitung ID-Pattern), ARTEFAKT_INVENTAR Mappe 2 nachpflegen.
**Offene Blocker:** quellenangaben[] Engine-Support fehlt (Workaround: cite-Einbettung). Flowcharts (mermaid) veraltet. Sicherungskette wartet auf Audit-Ergebnis.

**Abgeschlossen seit letztem Update:**
- Runde 3b (Commit 0c0e1ee): Mappe 2 "Das Attentat von Sarajevo" live — 6 Materialien, 5 Aufgaben, 2 Bilder, Engine-Patch, mappe-2.html
- Runde 3a-Opt: 6 Vertrags-Dateien extrahiert, ORCHESTRATOR + WORKFLOW aktualisiert, TAFELBILD_Mappe2.md erstellt, Goldstandard-Rolle redefiniert
- Runde 3a-Eval: RUNDE_3a_ERGEBNIS.md — 8 Befunde, alle in 3a-Opt adressiert
- Runde 3a: Erster Prozesstest (1 Cowork-Session), RUNDE_3a_ERGEBNIS.md als Baseline

**Zuvor abgeschlossen:**
- v3.5d Bugfix (Commit bc5a208): 4 Fixes — Fehlversuche-System (eliminated-Optionen, globaler Counter, alle 5 Aufgabentypen), Material-Titel statt "M1.2", Tipp-used visuell, Loesungswort-Reveal+Animation
- v3.5c Bugfix (Commit 072cbfd): 5 Fixes — background-attachment:local, Material-Ref in Tipps, Loesungscode-Kaestchen, MC-Shuffle, Tipp-Pillen+Akkordeon
- v3.5b Bugfix (Commit a53c914): 8 Fixes — Material-Flag, Zentrierung, Blocksatz, Karo em-basiert, Nummer-Kreis, Interaktivitaet, Sicherung-Display
- v3.5 Layout-Redesign implementiert (Commit 9c6f7e7): 2/3-1/3 Grid, Notizbuch-Fragebogen, Lochrand, Architects Daughter, Material-Fortschritt, Aufgaben-Dots
- v3.5 Cowork-Vorbereitung: Design-Spec, HTML-Prototyp, Uebergabe-Prompt
- ORCHESTRATOR.md: Fehlende Q-Gate-Referenzen nachgetragen (A1-A15, SK1-SK15, S1-S15 in Referenz-Dokumente + Phase-2.2-Box)
- v3.3b Nachmigration SCPL-Umordnung (Commit 9df75cc): Material-Reihenfolge nach SCPL-Aufbau, Browser-Check bestanden
- v3.4 GUETEKRITERIEN_AUFGABEN.md (A1-A15): AFB-Kongruenz, Operator-Praezision, Distractor-Qualitaet, kognitive Aktivierung, Besinnungsphasen
- AGENT_RAETSEL.md: 2-Stufen-Q-Gate (prozedural + A1-A15 fachdidaktisch)
- WORKFLOW_v2.md Phase 2.2: Q-Gate mit Stufe 1 + Stufe 2
- v3.3 Material-Sequenzierung (Commit f87dd8b): Schema + Engine + Migration
- v3-4 Engine-Erweiterung (Commit a3ea44b): Merksaetze, Kernerkenntnisse, Hefteintrag, Reflexionsimpuls
- v3.1-3 Hefteintrag-Engine (Commit 71a5896): CSS-basierter SCPL-Renderer
- v3.2 Umlaut-Fix (Commit 2561066): UTF-8-Migration
- GUETEKRITERIEN_SEQUENZIERUNG.md v1.1: S14 SCPL-Korrespondenz + S15 Skript-Kongruenz als MUSS, 2-Anker-Verfahren in AGENT_MATERIAL
- GUETEKRITERIEN_SKRIPT.md v1: SK1-SK15 fachdidaktische Q-Gate-Ebene fuer Phase 0.3
- AGENT_SKRIPT.md: 2-Stufen-Q-Gate (Q1-Q13 operativ + SK1-SK15 fachdidaktisch)

---

## Architektur-Entscheidung: Prozessredesign v1 → v2 (2026-03-18)

### Ausloeser

Testmappe-v1.1-Versuch (Mappe 1 "Pulverfass Europa" mit neuen W-1 bis W-8 Workflows) abgebrochen nach Erkennung von 3 strukturellen Problemen:

1. **Token-Ineffizienz:** Recherche (WebSearch, markdownify) und Generierung in einem Cowork-Durchlauf uebersteigt Kontextlimits
2. **Fehlende inhaltliche Zielklarheit:** Kein kohaerentes Inhaltsgeruest zwischen DIDAKTIK-Rahmen und MATERIAL-Design — Tafelbild entsteht erst waehrend Design (Henne-Ei)
3. **Blinde Quellenrecherche:** wikimedia_search_images ohne Inhaltsanker liefert keine brauchbaren Ergebnisse

### Kerndiagnose

Vermischung der Agenten-Zustaendigkeiten: INHALT liefert Kernaussagen (Stichpunkte), DIDAKTIK liefert formalen Rahmen (KE-Matrix), aber niemand erzeugt ein **narrativ kohaerentes, schulernahes Inhaltsgeruest**. MATERIAL springt direkt in Materialtyp-Auswahl ohne narratives Rueckgrat.

### Entschiedene Aenderungen

| Aenderung | Alt (v1) | Neu (v2) |
|---|---|---|
| Inhaltsquelle | WebSearch + markdownify (blind) | Wikipedia-MCP als primaerer Anker (`get_article` → `get_sections` → `get_links`) |
| Inhaltsgeruest | Inhalts-MDs (Kernaussagen-Listen) | **SKRIPT-Artefakt**: linearer, schulernaher Text wie Jugendsachbuch |
| Neuer Agent | — | **AGENT_SKRIPT** (eigenstaendig, nach AGENT_INHALT) |
| Agenten-Reihenfolge | DIDAKTIK → INHALT parallel | DIDAKTIK → INHALT → SKRIPT (sequentiell) |
| Chunking | Implizit in Ebene 0 | Explizit durch AGENT_SKRIPT, entlang DIDAKTIK-Struktur |
| Materialproduktion | AGENT_MATERIAL monolithisch | materialerstellung-skill mit Subagenten pro Materialtyp (Scope offen) |
| Mappen-Erstellung | Alle Mappen in einem Durchlauf | Sequentiell: Mappe N fertig + validiert → Mappe N+1 |
| Bildrecherche | wikimedia blind | Wikipedia-Bilder als Anker → gezielte wikimedia-Suche |

### Neue Agenten-Sequenz (v2)

```
Phase 0: AGENT_DIDAKTIK → AGENT_INHALT → AGENT_SKRIPT
         Output: Gechunktes Skript (1 Chunk pro Mappe, inkl. Tafelbild-Entwurf)
         User-Validierung: PFLICHT

Phase 1: Pro Mappe sequentiell:
         AGENT_MATERIAL (Design) → User-Validierung
         → materialerstellung-skill (Subagenten) → AGENT_RAETSEL
         → AGENT_TECHNIK + DESIGN → User-Validierung
         → Naechste Mappe
```

### Offene Entscheidungen

- materialerstellung-skill: Claude Code Uebergabe-Prompt oder eigenstaendiger Cowork-Skill?
- Wird spaeter evaluiert basierend auf erstem Skript-Durchlauf

### Referenz-Dokumente

- Flowcharts: `docs/architektur/flowchart-status-quo.mermaid`, `docs/architektur/flowchart-neuausrichtung.mermaid`
- Workflow v2: `docs/architektur/WORKFLOW_v2.md` (kanonisch, mit MATERIAL_GERUEST-Template, Fallback-Pfad, Sandwich-Pruefpunkt)
- Audit-Ergebnis: `docs/analyse/AUDIT_PROZESSREDESIGN_V2_ERGEBNIS.md`
- Neuer Agent: `docs/agents/AGENT_SKRIPT.md`

---

## Audit-Entscheidung: Phase 2 Template-Engine (2026-03-13/14)

3 unabhaengige Audits der 8 Template-Engine-Dateien durchgefuehrt. 18 Fixes identifiziert, 16 umgesetzt, 2 bewusst belassen.

### Umgesetzte Fixes (Commit ddd0ab3)

| Prio | Fixes | Status |
|---|---|---|
| BLOCKER | FIX-01 (data.json loesung-Typ), FIX-02 (hardcoded "5"), FIX-03 (Lehrkraft Storage), FIX-04 (Inline-Styles), FIX-05 (Mappe-Kopier-Doku), FIX-06 (Fehlermeldung data.json) | Alle 6 behoben |
| SOLLTE | FIX-07 (Navigationslogik/ID-Konvention), FIX-08 (Lueckentext-Wortlimit), FIX-09 (Storage-Fehler-Feedback) | Alle 3 behoben |
| KANN | FIX-10 (base.css neutrale Defaults), FIX-11 (fadeIn-Duplikat), FIX-13 (Storage.clear scope), FIX-14 (ASCII-Umlaute), FIX-15 (Tippfehler), FIX-16 (Freitext exact-match) | Alle 6 behoben |
| KANN nach MVP | FIX-18 (Storage-Roundtrip) | Behoben |

### Bewusst belassen

| Fix | Grund |
|---|---|
| FIX-12 (Reihenfolge doppelter Text) | Nicht kritisch, UX-Entscheidung bei Pilottest evaluieren |
| FIX-17 (Passwort im Klartext) | Fuer MVP akzeptabel, kein didaktisch sensibles Material |

### Geaenderte Dateien (11)

`escape-engine.js`, `core.js`, `base.css`, `theme-gpg.css`, `lehrkraft.html`, `index.html`, `mappe-template.html`, `data.json`, `ORCHESTRATOR.md`, `AGENT_RAETSEL.md`, `AGENT_TECHNIK.md`

### Audit-Dokumentation

- `docs/AUDIT_Phase2_Template_Engine.md` — Erstaudit (13 Befunde)
- `docs/AUDIT_Phase2_Verifizierung.md` — Verifizierung + 5 Blindstellen
- `docs/FIXES_Phase2_Konsolidiert.md` — Konsolidierte Fix-Liste (18 Fixes, priorisiert)

---

## Audit-Entscheidung: Agenten-Architektur (2026-03-12)

Externes Audit aller 8 Agenten-Dateien (docs/) durchgeführt. Ergebnis: **NICHT bereit für Phase 2.** 2 Blocker, 5 High-Priority-Issues.

### Blocker

| # | Blocker | Beschreibung | Lösung |
|---|---|---|---|
| ~~B1~~ | ~~Zirkuläre Abhängigkeit Templates/Engine~~ | ~~AGENT_TECHNIK referenziert Template/Engine die nicht existierten~~ | **ERLEDIGT** (2026-03-13): Phase 2 Template-Engine erstellt. 8 Dateien unter assets/ und escape-games/template/. Commit 71ea9ca. |
| ~~B2~~ | ~~Inkonsistente Quellpfade~~ | ~~Pfade über Agenten hinweg uneinheitlich~~ | **ERLEDIGT** (2026-03-12): `docs/PFAD_MANIFEST.md` mit 30 verifizierten Pfaden, alle Agenten-MDs korrigiert |

### High Priority

| # | Issue | Beschreibung | Zuständig |
|---|---|---|---|
| ~~H1~~ | ~~data.json Tipps-Schema~~ | ~~Inkonsistenz String vs. Objekt~~ | **ERLEDIGT**: tipps als Objekte (stufe/text) in ORCHESTRATOR + AGENT_RAETSEL |
| ~~H2~~ | ~~Styling-Zuständigkeit~~ | ~~Überlappung TECHNIK/DESIGN~~ | **ERLEDIGT**: Abgrenzungstabelle in beiden Agenten (HTML-Struktur vs. CSS-Styling) |
| ~~H3~~ | ~~API-Signaturen~~ | ~~Parameter/Returns fehlten~~ | **ERLEDIGT**: 7 Signaturen mit Params + Return-Types in AGENT_TECHNIK |
| ~~H4~~ | ~~D&D zu komplex~~ | ~~zuordnung als Drag-and-Drop~~ | **ERLEDIGT**: Dropdown-Select für MVP, D&D als Post-MVP-Option |
| ~~H5~~ | ~~Medien-Workflow~~ | ~~Kein Prozess definiert~~ | **ERLEDIGT**: MVP = textbasiert + Unicode + CSS, Medien ab Post-MVP |

### Medium/Low (Backlog)

| # | Issue | Prio | Adressierung |
|---|---|---|---|
| M1 | AGENT_INHALT zu dünn (fehlende Output-Tiefe, kein Mapping Kernaussagen→Lernziele) | Mittel | Bei Agenten-Korrektur mitfixen |
| M2 | Kein min-type-spread für Aufgabenvielfalt | Mittel | AGENT_RAETSEL.md ergänzen |
| M3 | localStorage-Fortschrittsschema undefiniert | Mittel | ORCHESTRATOR.md oder AGENT_TECHNIK.md |
| M4 | Zeichenlimits für Texte fehlen | Niedrig | AGENT_RAETSEL.md |
| M5 | mappen_anzahl Bounds fehlen (3-6) | Niedrig | ORCHESTRATOR.md |
| M6 | Checkliste: DSGVO, Offline-Robustheit, Print, Zeitbudget fehlen | Niedrig | Checkliste_Interaktive_Materialien.md |
| M7 | Samsung Internet in Browsertest unnötig | Niedrig | AGENT_QUALITAET.md |

### Strategie

Blocker + High-Priority in einem Durchgang beheben (Übergabe-Prompt für Claude Code). Medium/Low bei Gelegenheit oder nach erstem Pilotlauf.

---

## Audit-Entscheidung: SKILL.md (2026-03-12, historisch)

Früheres Audit der SKILL.md. Strategie: MVP-Forward -- Gaps im Prozess schließen.

| Gap | Kritikalität | Adressierung |
|---|---|---|
| GPG ohne Didaktik-Artefakte | Kritisch | Phase 1: In AGENT_DIDAKTIK.md GPG-spezifische Kriterien mitentwickeln |
| Cowork↔Claude-Code-Interface informell | Kritisch | Ab sofort: Strukturierte Übergabe-Prompts (Kontext/Aufgabe/Erfolgskriterium/Rückmeldung) |
| Onboarding-Daten nicht operationalisiert | Kritisch | Phase 1: Mapping Erhebungsdaten→Agenten-Parameter definieren |
| Kein ROLLBACK-Modus | Sekundär | Bei Bedarf in Skill-Iteration ergänzen |
| STATUS mischt dynamisch/statisch | Sekundär | Bei Bedarf splitten |
| Kein Zeitbudget/Taxonomie im Onboarding | Sekundär | Phase 1: Bei Agent-Prompt-Erstellung evaluieren |
| Kein Feedback-Loop Unterricht→System | Sekundär | Phase 4: In Dokumentation integrieren |

---

## Schulkontext

| Merkmal | Wert |
|---|---|
| Schulart | Mittelschule |
| Bundesland | Bayern |
| Besonderheiten | Auen-Mittelschule Schweinfurt |

## Unterrichtete Fächer

| Fach | Klasse(n) | Priorität | Vorhandene Artefakte |
|---|---|---|---|
| GPG | 7b, 7c | MVP | Lehrplan-MDs, Fachprofil, Jahrgangsstufenprofil, Sequenzplanungen |
| WiB | 7b, 7c | Phase 2 | Umfangreiche Anleitungen (Qualitätskriterien, TUV, Methoden, Lernziele, Sequenzplanung) |
| Mathematik | 7c | Phase 2 | Lehrplan-MDs, Sequenzbeispiele |
| Sport | - | Später | Sequenzplanungs-Anleitungen |

## Lerngruppencharakteristika

### GPG 7b / 7c
- **Klassenstärke:** ~22 (heterogen)
- **Sprachniveau:** [NOCH ZU ERHEBEN]
- **Digital Literacy:** [NOCH ZU ERHEBEN]
- **Gewohnte Methoden:** [NOCH ZU ERHEBEN]
- **Besonderheiten:** [NOCH ZU ERHEBEN]

## Technische Rahmenbedingungen

| Merkmal | Status |
|---|---|
| Klassenraum-Ausstattung | [NOCH ZU ERHEBEN] |
| Schüler-Endgeräte | [NOCH ZU ERHEBEN] |
| WLAN | [NOCH ZU ERHEBEN] |
| Internetfilter | [NOCH ZU ERHEBEN] |

## Technischer Status Lehrkraft

| Merkmal | Status |
|---|---|
| GitHub-Account | Vorhanden (Username: snflsknfkldnfs), bestehende User-Site aktiv |
| Repository | `weitergehts-online` angelegt, 15 Dateien, Verzeichnisstruktur steht |
| GitHub Pages | Aktiv, Branch `main`, Custom Domain `weitergehts.online` eingetragen |
| HTTPS | Zertifikat pending (Let's Encrypt, automatisch) |
| Claude Code Erfahrung | Fortgeschritten (Cowork + Skills aktiv) |
| HTML/CSS/JS | [NOCH ZU ERHEBEN] |
| Domain/Hosting | weitergehts.online bei Namecheap, DNS auf GitHub Pages konfiguriert (A-Records + CNAME) |
| E-Mail | Zoho Mail aktiv (MX-Records + SPF konfiguriert, bleibt unberührt) |
