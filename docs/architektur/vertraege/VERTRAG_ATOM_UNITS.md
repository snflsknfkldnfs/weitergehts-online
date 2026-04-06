# VERTRAG — ATOM-UNIT-Framework

**Status:** FINAL (Phase IV Wave 0, aktiviert 2026-04-05)
**Herkunft:** D15b Phase III.5d Verifikations-Gate + 5e Synthese, V4 Vertrags-Patch BLOCKING
**Scope:** Alle Multi-STR-Mutationen in Phase IV+

---

## 1. Problem, das der Vertrag loest

Die Risiko-Audits RA3 und RA4 haben festgestellt, dass bestimmte STR-Mutationen (aus D15B_OPTIMIERUNGS_STRATEGIEN.md) nur gemeinsam konsistent sind. Wenn ein Teil merged wird und der andere nicht, entsteht eine inkonsistente Produktion mit Laufzeit-Fehlern, Legacy-Konflikten oder didaktischen Bruechen. F-RA4-02 Renderer-Lock-in war ein Symptom davon.

Der ATOM-UNIT-Framework-Vertrag erzwingt: **Entweder alle Teile einer ATOM-UNIT in einem Commit, oder keiner.**

## 2. Definition ATOM-UNIT (AU)

Eine ATOM-UNIT ist eine Menge gleichzeitig zu mergender Aenderungen mit folgenden Merkmalen:

- Mindestens 2 betroffene Artefakte (Code, JSON, Doku, Assets).
- Mindestens 2 STR aus D15B_OPTIMIERUNGS_STRATEGIEN.md oder eine STR plus einen Infrastruktur-Patch.
- Alle Teile sind voneinander **semantisch abhaengig** (Aenderung A ohne B bricht das Produkt).

Eine AU hat eine AU-ID (`AU-N`), eine Titel-Beschreibung, eine Liste betroffener Dateien und eine Begruendung der Atomaritaet.

## 3. Aktive ATOM-UNITs (Wave 0)

### AU-0 — Infrastruktur-Bootstrap (Wave 0 selbst)
Die Phase-IV-Wave-0 ist die erste AU und enthaelt alle 10 Wave-0-Pakete:
- V1 ORCHESTRATOR Session-Split-Enforcement
- V2 Feedback-Schema-Vertrag
- V4 ATOM-UNIT-Framework (dieser Vertrag selbst)
- K1 Rollen-Katalog STR-01
- K2 Trigger-Sichtbarkeit STR-12 (Policy + technischer Enforcement)
- E1 Renderer-Generalisierung (F-RA4-02 P0)
- E2 Legacy-Feedback-Fallback
- D1 Wikimedia-Bilder lokalisieren
- D2 STR-13 Reflexions-Zone ohne Persistenz
- DOK1 Transkript-Personenbezug-Review

**Begruendung Atomaritaet:** V2 (Feedback-Schema) ohne E2 (Legacy-Fallback) bricht Altdaten. E1 (Renderer) ohne V4 (Framework) nimmt zukuenftige Mutationen vorweg. K2 Policy ohne technischen Enforcement ist leere Regel. V1 ohne V4 bleibt unbelegte Forderung. Alle Teile bilden das Fundament fuer alle nachfolgenden ATOM-UNITs.

### AU-1 — STR-02 Spuren-Mechanik + STR-11 neue Aufgabentypen
- **Datei-Scope:** SUB_AUFGABE_*.md, assets/js/escape-engine.js (Aufgabentyp-Registry), katalog-Eintraege
- **Atomaritaet:** Neue Aufgabentypen ohne Spuren-Hook aufgehaengt brechen Progression. Spuren-Mechanik ohne Typen ist leerer Container.

### AU-2 — [GESPLITTET in AU-2a / AU-2b / AU-2c, siehe SESSION_13_MASTERPLAN.md]

Der ursprueng­liche Scope "STR-03 Feedback-Schema + STR-04 Aufgabentypologie" wurde in Session 13 (2026-04-06) aufgrund von (1) Rollback-Radius bei Monolith-AU, (2) strukturelle Abhaengigkeit STR-03 → STR-04, (3) pro-Typ-Evaluation der Tipps (E2=B), (4) Entkopplung des UI-Befunds BEFUND-AU-1-UI-01 gesplittet in drei unabhaengige ATOM-UNITs. Reihenfolge fixiert: AU-2a → AU-2b; AU-2c kann parallel zu AU-2b oder davor.

### AU-2a — STR-03 Feedback-Schema Rollout
- **Datei-Scope:** VERTRAG_PHASE_2-2b_AUFGABE.md (Feedback-Pflichtfeld), VERTRAG_FEEDBACK_SCHEMA.md (Backfill-Generator-Spec), SUB_AUFGABE_{MC,ZUORDNUNG,LUECKENTEXT,REIHENFOLGE,FREITEXT,VERGLEICH,BEGRUENDUNG}.md (Feedback-Schema-Block mandatory), GUETEKRITERIEN_AUFGABEN.md (A25 Schema-Vollstaendigkeit + A26 Didaktische Feedback-Validitaet), docs/agents/dispatches/FEEDBACK_BACKFILL_MAPPEN_1_4.md (24-Aufgaben-Dispatch), assets/js/escape-engine.js (`normalizeFeedback()` + Schema-Validator), escape-games/gpg-erster-weltkrieg-ursachen/data.json (Feedback-Backfill Mappen 1-4 via Dispatch), Cache-Bust v=4.0 → v=4.1 in allen HTMLs dieser Unterseite.
- **Atomaritaet:** Schema-Pflichtfeld im Vertrag ohne Engine-`normalizeFeedback()` bricht die 24 Alt-Aufgaben. Engine-Normalize ohne data.json-Backfill laesst Aufgaben ohne Feedback laufen. Subagenten-Patches ohne Guetekriterien sind nicht durchsetzbar. Backfill-Dispatch ohne Generator-Spec im Schema-Vertrag ist orakel-basiert. Alle Teile muessen gemeinsam.
- **Quelle:** Phase III.5d Verifikations-Gate Konvergenz-Top-6 (STR-03), F-RA4-01 P1 HIGH (Feedback-Schema Breaking Change), Session-13-Masterplan E3-Entscheidung.

### AU-2b — STR-04 3-stufige Tipps (pro Aufgabentyp evaluiert)
- **Datei-Scope:** VERTRAG_PHASE_2-2b_AUFGABE.md (Tipp-Eskalations-Sektion), SUB_AUFGABE_{MC,ZUORDNUNG,LUECKENTEXT,REIHENFOLGE,FREITEXT,VERGLEICH,BEGRUENDUNG}.md (pro Typ eigene Tipp-Eskalations-Logik + didaktisch-qualitative Beispiele), GUETEKRITERIEN_AUFGABEN.md (A27 Tipp-Eskalation), assets/js/escape-engine.js (Tipp-Renderer + Eskalations-Zustand), Content-Backfill fuer 24 Alt-Aufgaben (separater Dispatch oder Retroactive-Delta-Entscheidung).
- **Atomaritaet:** Tipp-Renderer ohne inhaltliche Tipps in den Aufgaben = leeres UI-Element. Inhaltliche Tipps ohne Renderer = totes JSON. Pro-Typ-Evaluation ist Voraussetzung fuer sinnvolle Subagenten-Prompts und muss vor dem Dispatch abgeschlossen sein.
- **Abhaengigkeit:** AU-2a CLOSED (Feedback-Schema liefert `ebene: "hinweis"`-Kategorie, die AU-2b referenziert).
- **Quelle:** E2-Entscheidung des Users (pro-Typ didaktisch-qualitativ), Phase III.5d STR-04 Konvergenz 3 RAs + 2×P0.

### AU-2c — BEFUND-AU-1-UI-01 Vergleich-Input-Zellen-Hoehe (Notizbuch-Handschrift-Theme)
- **Datei-Scope:** `assets/css/themes/theme-gpg.css` (primaer), `assets/css/base.css` (sekundaer, falls Layout-Ursache), optional minimaler `assets/js/escape-engine.js`-Renderer-Patch (nur bei Option-A-Loesung `textarea`-Umstellung), Cache-Bust der betroffenen HTMLs.
- **Atomaritaet:** CSS-Fix + ggf. Renderer-Patch + Cache-Bust in einem Commit, damit kein Cache-Stand-Konflikt entsteht. Entkoppelt von Schema/Tipps — darf parallel zu AU-2b laufen oder davor.
- **Quelle:** `docs/befunde/BEFUND-AU-1-UI-01.md`, Claude-Code Smoke-Test nach Commit `5b470c5` (Session 12 Fortsetzung 3).

### AU-3 — STR-08 Quellenkritik Bloom-Progression + STR-11 neue Aufgabentypen
- **Datei-Scope:** AGENT_RAETSEL.md Progressions-Logik, VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md, SUB_AUFGABE_FREITEXT.md
- **Atomaritaet:** Bloom-Validierung ohne den dafuer designten Aufgabentyp (Quellenkritik-Freitext) greift ins Leere.

### AU-4 — STR-05 Session-Split MODIFY-SCOPE
- **Datei-Scope:** docs/agents/ORCHESTRATOR.md (V1-Patch), docs/architektur/WORKFLOW_v4.md (Phasen-Referenz), docs/architektur/vertraege/VERTRAG_PHASE_2-1c_CROSS.md
- **Atomaritaet:** MODIFY-SCOPE bedeutet: Session-Split-Enforcement wird aus "weiche Empfehlung" zu "harter Gate". Das muss ueberall gleichzeitig aktualisiert werden, sonst widersprechen sich Vertraege.

## 4. Pre-Commit-Gate (3 Checks)

Bei jedem Commit, der eine der folgenden Dateien beruehrt: `assets/js/escape-engine.js`, `docs/architektur/vertraege/*.md`, `docs/agents/ORCHESTRATOR.md`, `docs/agents/SUB_*.md`, `docs/agents/VERTRAG_FEEDBACK_SCHEMA.md` (falls existent), oder JSON-Schema-Dateien — MUSS der Pre-Commit-Gate durchlaufen:

### Check A — RA1 Scope-Check
**Frage:** Bewegt sich der Commit innerhalb der in D15B_OPTIMIERUNGS_STRATEGIEN.md definierten 20 aktiven STR? Oder fuehrt er neue STR ein, die nicht in diesem Dokument stehen?
**Aktion bei Fail:** Commit blockieren. User muss neue STR erst im OPTIMIERUNGS_STRATEGIEN-Dokument deklarieren und durch einen neuen Audit laufen lassen.

### Check B — RA3 Code-Kopplungs-Check
**Frage:** Gibt es Aenderungen an escape-engine.js oder core.js, die eine bereits aktive andere STR beeinflussen, ohne dass diese mit-modifiziert wurde?
**Aktion bei Fail:** Commit blockieren. Entweder die andere STR mit in denselben Commit aufnehmen (wenn sie in derselben AU ist) oder die Kopplung entknuepfen.

### Check C — RA4 ATOM-UNIT-Check
**Frage:** Sind alle Dateien einer AU im Commit enthalten? Der Check prueft: welche AU-IDs sind durch die geaenderten Dateien betroffen (Mapping AU → Dateien), und sind alle Dateien dieser AUs im Commit gestaged?
**Aktion bei Fail:** Commit blockieren. Liste der fehlenden Dateien ausgeben.

## 5. Umsetzung Pre-Commit-Gate

Phase IV Wave 0 liefert die **Vertrags-Fassung** dieses Gates. Die technische Umsetzung (Git-Hook-Skript `tools/pre-commit-atom-check.sh`) ist Teil der Wave-0-Uebergabe an Claude Code.

Mindestumsetzung: Shell-Skript mit Mapping-Tabelle `AU-ID → [Dateien]`, das via `git diff --cached --name-only` die Schnittmenge prueft und bei Luecke mit `exit 1` abbricht. Aktivierung via `git config core.hooksPath tools/git-hooks` oder Symlink.

Falls das Skript nicht realisierbar ist (Cowork-Sandbox-Limitierung beim Hook-Setup), gilt als Uebergangsloesung: **Der Cowork-PM-Agent pruft bei jeder Uebergabe an Claude Code die AU-Vollstaendigkeit in der Uebergabe-Checkliste.** Diese Regel steht ebenfalls in der neuen Pflichtlektuere fuer den projekt-website-v4-2 Skill.

## 6. AU-Registry-Pflege

Neue ATOM-UNITs werden in diesem Dokument registriert. Format:

```
### AU-N — <Titel>
- **Datei-Scope:** <Liste>
- **Atomaritaet:** <Begruendung>
- **Quelle:** <Audit-Finding, UPGRADE_PLAN, Evaluation>
```

Streichungen von AUs sind protokollierungspflichtig im CHANGELOG.md.

## 7. Abgrenzung

- **Nicht ATOM-UNIT** sind reine Bugfixes, Doku-Tippfehler, Dependency-Bumps, CI-Patches, isolierte Content-Aenderungen in einer einzigen JSON.
- **Nicht ATOM-UNIT** sind Operationen, die den Atomaritaets-Vertrag selbst aendern — solche Aenderungen durchlaufen statt des Pre-Commit-Gates den Audit-Workflow (UPGRADE_PLAN + externer Audit).

## 8. Geltungsbereich

Dieser Vertrag gilt ab Commit des Phase-IV-Wave-0-Bundles. Vorherige Commits sind nicht retroaktiv geprueft. Nach Commit dieses Vertrags ist jede weitere Multi-STR-Aenderung AU-pflichtig.

---

**Naechste Aenderungen an diesem Dokument:** nur via neuer UPGRADE_PLAN-Eintrag + externer Audit.
