# Projektstatus: Interaktive Unterrichtsmaterialien -- weitergehts.online

**Letzte Aktualisierung:** 2026-03-17 (Evaluation v1-Testmappe + Agenten-Instruktionen verschaerft)
**Aktuelle Phase:** Phase 3.1 → 3.2 Uebergang (Infrastruktur validiert, Prozessoptimierung laeuft)
**Letzter Arbeitsschritt:** Docs-Konsolidierung (Projekt_Website/ → docs/), Browser-Test + Lehrkraft-Evaluation der v1-Testmappe (23 Findings), AGENT_MATERIAL.md + AGENT_RAETSEL.md mit Qualitaetsspezifikationen pro Materialtyp verschaerft.
**Naechster Schritt:** Engine-Quick-Fixes (E6 Sicherung-Hidden, E8 Header, E9 Dropdown-Duplikate). Dann MCP-Integration (P1) recherchieren. Offene Doc-Updates: AGENT_INHALT.md, AGENT_DIDAKTIK.md, Checkliste_Interaktive_Materialien.md.
**Offene Blocker:** Keine

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
