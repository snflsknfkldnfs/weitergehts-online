# Uebergabe-Prompt: v4 Repo-Update — Thematische Commits

**Datum:** 2026-04-01
**Kontext:** Nach v4-Architekturmigration, 3 Audits und Pre-Flight Runde 3a liegen ~20 modifizierte und ~60 untracked Dateien im Working Tree. Diese muessen in thematisch kohaerenten Commits ins Repository ueberfuehrt werden.
**Ausfuehrender:** Claude Code (Dateisystem + Git)

---

## Auftrag

Fuehre die folgenden 7 Commits in exakt dieser Reihenfolge aus. Jeder Commit hat eine explizite Dateiliste. Keine Datei darf fehlen, keine zusaetzliche Datei darf hinzugefuegt werden. .DS_Store und .Rhistory werden NICHT committet.

**Vor dem ersten Commit:**
```bash
echo ".DS_Store" >> .gitignore
echo ".Rhistory" >> .gitignore
git add .gitignore
git commit -m "chore: .DS_Store und .Rhistory zu .gitignore"
```

---

### Commit 1: v4 Kanonischer Workflow + Architektur

**Message:** `v4: Kanonischer Workflow (WORKFLOW_v4.md) + Upgrade-Plan + Architektur-Referenzen`

**Dateien:**
```bash
git add docs/architektur/WORKFLOW_v4.md
git add docs/architektur/UPGRADE_PLAN_v4_PRODUKTIONSARCHITEKTUR.md
git add docs/architektur/ARCHITEKTUR_v1.md
git add docs/architektur/UPGRADE_PLAN_v3.md
git add docs/architektur/WORKFLOW_v2.md
git add docs/architektur/DESIGNENTSCHEIDUNG_v3-1_HEFTEINTRAG.md
git add docs/architektur/EVALUATION_SCPL_HEFTEINTRAG.md
git add docs/architektur/UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md
```

**Begruendung:** WORKFLOW_v4.md ist die kanonische Referenz fuer alle Agenten. Muss zuerst im Repo sein, damit nachfolgende Commits darauf referenzieren koennen. Die modifizierten Architektur-Dateien (ARCHITEKTUR_v1, UPGRADE_PLAN_v3, WORKFLOW_v2) enthalten nur Referenz-Updates auf v4.

---

### Commit 2: Agenten-Prompts (v4-Refactor)

**Message:** `v4: Agenten-Prompts refaktoriert (Orchestrator, Material, Raetsel, Skript, Tafelbild, Technik, Artefakt, Design)`

**Dateien:**
```bash
git add docs/agents/ORCHESTRATOR.md
git add docs/agents/AGENT_MATERIAL.md
git add docs/agents/AGENT_RAETSEL.md
git add docs/agents/AGENT_SKRIPT.md
git add docs/agents/AGENT_TAFELBILD.md
git add docs/agents/AGENT_TECHNIK.md
git add docs/agents/AGENT_ARTEFAKT.md
git add docs/agents/AGENT_DESIGN.md
```

**Begruendung:** Alle 8 modifizierten Agenten-Prompts gehoeren zur v4-Migration. ORCHESTRATOR verweist auf WORKFLOW_v4 (Commit 1). AGENT_MATERIAL und AGENT_RAETSEL sind die groessten Refactors (Design→Orchestrator-Umbau, Subagenten-Delegation). Die restlichen haben kleinere v4-Anpassungen.

---

### Commit 3: Subagenten-Prompts (Material + Aufgaben)

**Message:** `v4: 12 Subagenten-Prompts (7 Material + 5 Aufgaben)`

**Dateien:**
```bash
# Material-Subagenten (modifizierte + neue)
git add docs/agents/SUB_MATERIAL_DARSTELLUNGSTEXT.md
git add docs/agents/SUB_MATERIAL_QUELLENTEXT.md
git add docs/agents/SUB_MATERIAL_BILDQUELLE.md
git add docs/agents/SUB_MATERIAL_TAGEBUCH.md
git add docs/agents/SUB_MATERIAL_ZEITLEISTE.md
git add docs/agents/SUB_MATERIAL_KARTE.md
git add docs/agents/SUB_MATERIAL_STATISTIK.md

# Aufgaben-Subagenten (alle neu)
git add docs/agents/SUB_AUFGABE_MC.md
git add docs/agents/SUB_AUFGABE_ZUORDNUNG.md
git add docs/agents/SUB_AUFGABE_LUECKENTEXT.md
git add docs/agents/SUB_AUFGABE_REIHENFOLGE.md
git add docs/agents/SUB_AUFGABE_FREITEXT.md
```

**Begruendung:** Subagenten sind die operative Ebene der v4-Produktion. 5 Material-Subagenten modifiziert (Input-Spec + Output-Format), 2 Material-Subagenten neu (Karte, Statistik), 5 Aufgaben-Subagenten komplett neu. Abhaengig von Commit 2 (Orchestratoren referenzieren Subagenten).

---

### Commit 4: Qualitaetskriterien + Checklisten

**Message:** `v4: Qualitaetskriterien (Material M1-M12, Aufgaben A1-A15, Skript SK1-SK15, Sequenzierung S1-S15, Tafelbild G1-G14)`

**Dateien:**
```bash
git add docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md
git add docs/checklisten/GUETEKRITERIEN_AUFGABEN.md
git add docs/checklisten/GUETEKRITERIEN_SKRIPT.md
git add docs/checklisten/GUETEKRITERIEN_SEQUENZIERUNG.md
git add docs/checklisten/GUETEKRITERIEN_TAFELBILD.md
```

**Begruendung:** Q-Gate-Referenzdokumente fuer die Subagenten-Dispatches. GUETEKRITERIEN_TAFELBILD.md ist modifiziert (G14 hinzugefuegt), die restlichen 4 sind neu. Muessen vor Audit-Dokumenten committet werden, da Audits auf diese referenzieren.

---

### Commit 5: Audit-Zyklus (v3.7 → v3.8 → v4)

**Message:** `v4: Audit-Zyklus komplett (v3.7 Aufgaben, v3.8 Material+Produktion, v4 Architektur+Strategie+Produktionsreife)`

**Dateien:**
```bash
# Audit-Briefings
git add docs/analyse/AUDIT_BRIEFING_v3-7_AUFGABEN_SUBAGENTEN.md
git add docs/analyse/AUDIT_BRIEFING_v3-8_MATERIAL_SUBAGENTEN.md
git add docs/analyse/AUDIT_BRIEFING_v3-8_PRODUKTIONSREIFE.md
git add docs/analyse/AUDIT_BRIEFING_v4_PRODUKTIONSREIFE.md

# Audit-Ergebnisse
git add "docs/analyse/Audit report 3.7.md"
git add "docs/analyse/Audit Report v3.8.md"
git add docs/analyse/AUDIT_REPORT_v3-8_PRODUKTIONSREIFE.md
git add docs/analyse/AUDIT_v3-8_C0-C5_FINAL.md
git add docs/analyse/AUDIT_v4_ARCHITEKTUR_ERGEBNIS.md
git add docs/analyse/AUDIT_v4_STRATEGIE_ERGEBNIS.md
git add docs/analyse/AUDIT_v4_PRODUKTIONSREIFE_ERGEBNIS.md

# Design-Specs + Prototypen
git add docs/analyse/DESIGN_SPEC_v3-5_LAYOUT_REDESIGN.md
git add docs/analyse/OFFENE_PUNKTE_V3.md
git add docs/analyse/PROTOTYP_HEFTEINTRAG_v3-1.html
git add docs/analyse/PROTOTYP_HEFTEINTRAG_v3-1_rev2.html
git add docs/analyse/PROTOTYP_HEFTEINTRAG_v3-1_rev3.html
git add docs/analyse/PROTOTYP_v3-5_LAYOUT.html

# Aeltere Analyse-Notizen
git add "docs/analyse/Updates Materialien und UI.md"
git add "docs/analyse/Updates für Workflow v3.md"
git add "docs/analyse/Updates zu Rätsel-Infastruktur.md"
```

**Begruendung:** Gesamter Analyse- und Audit-Verlauf. Chronologisch von v3.7 bis v4. Enthaelt Briefings, Ergebnisse, Design-Specs und Prototypen. Abhaengig von Commit 4 (Audits referenzieren Qualitaetskriterien).

---

### Commit 6: Uebergabe-Dokumente + Projekttracking

**Message:** `v4: Uebergabe-Dokumente (v3.1-v3.8) + STATUS + CHANGELOG`

**Dateien:**
```bash
# Uebergabe-Dokumente
git add docs/uebergabe/UEBERGABE_v3-1-3_HEFTEINTRAG_ENGINE.md
git add docs/uebergabe/UEBERGABE_v3-2_UMLAUT_FIX.md
git add docs/uebergabe/UEBERGABE_v3-3_SEQUENZIERUNG.md
git add docs/uebergabe/UEBERGABE_v3-3b_NACHMIGRATION_SCPL.md
git add docs/uebergabe/UEBERGABE_v3-4-FIX_DATA_JSON_REVERT.md
git add docs/uebergabe/UEBERGABE_v3-5_LAYOUT_REDESIGN.md
git add docs/uebergabe/UEBERGABE_v3-5b_BUGFIX_LAYOUT.md
git add docs/uebergabe/UEBERGABE_v3-5c_BUGFIX_LAYOUT_2.md
git add docs/uebergabe/UEBERGABE_v3-5d_BUGFIX_LAYOUT_3.md
git add docs/uebergabe/UEBERGABE_v3-5e_LOESUNGSWORT_FRAGESATZ.md
git add docs/uebergabe/UEBERGABE_v3-5f_BUGFIX_STATE_RESTORE.md
git add docs/uebergabe/UEBERGABE_v3-5g_LOESUNGSWORT_POSITION_STATE_RESTORE.md
git add docs/uebergabe/UEBERGABE_v3-5h_LOESUNGSWORT_REDESIGN.md
git add docs/uebergabe/UEBERGABE_v3-8_AUDIT_FIXES.md
git add docs/uebergabe/UEBERGABE_v3-8_BUGFIX_LINKS_SCROLLOFFSET.md
git add docs/uebergabe/UEBERGABE_v3-8_BUGFIX_TIPPS_STUNDENFRAGE.md
git add docs/uebergabe/UEBERGABE_v3-8_ENGINE_INLINE_LINKS.md
git add docs/uebergabe/UEBERGABE_v3-8_MIGRATION_MAPPE1.md
git add docs/uebergabe/UEBERGABE_v3-8_U1-U4_UI_OPTIMIERUNG.md
git add docs/uebergabe/UEBERGABE_v3-8_U5-U8_HEADER_STICKY_BESCHREIBUNG.md
git add docs/uebergabe/UEBERGABE_v3-8_U9-U10_EINSTIEG_STICKY_TRANSITION.md
git add docs/uebergabe/UEBERGABE_MAPPE2_PRODUKTION.md
git add docs/uebergabe/UEBERGABE_MAPPE2_PRODUKTION_v2.md
git add docs/uebergabe/AUDIT_v4_ARCHITEKTUR.md
git add docs/uebergabe/AUDIT_v4_STRATEGIE.md
git add docs/uebergabe/UEBERGABE_v4_REPO_UPDATE.md
git add docs/projekt/UEBERGABE_v3-8_C0.md

# Projekttracking
git add docs/projekt/STATUS.md
git add docs/projekt/CHANGELOG.md
```

**Begruendung:** Uebergabe-Dokumente dokumentieren die Implementierungsgeschichte. STATUS.md und CHANGELOG.md reflektieren den aktuellen Stand nach v4-Migration. Abhaengig von allen vorherigen Commits (referenzieren Architektur, Agenten, Audits).

---

### Commit 7: Runde 3a Pre-Flight + Skill-Definition

**Message:** `v4 Runde 3a: Pre-Flight (Testplan, Handoff, Produktionsverzeichnis) + Skill-Definition v3`

**Dateien:**
```bash
git add docs/analyse/RUNDE_3a_TESTPLAN.md
git add docs/agents/artefakte/produktion/gpg-erster-weltkrieg-ursachen/mappe-2/HANDOFF_PHASE2.md
git add docs/agents/SKILL_projekt-website_v3.md
```

**Begruendung:** Pre-Flight-Artefakte fuer Runde 3a. HANDOFF_PHASE2.md ist der simulierte Orchestrator-Handoff. TESTPLAN definiert Evaluationsframework. Skill-Definition ist unabhaengig, passt aber zeitlich hierher.

---

## Validierung nach allen Commits

```bash
git status
git log --oneline -10
```

**Erwartung:** Working Tree clean (bis auf .DS_Store falls .gitignore greift). 8 neue Commits (1 gitignore + 7 thematische). Keine untracked Dateien ausser .claude/ (Workspace-Config, nicht Teil des Repos).

---

## Hinweis zu .claude/

Das Verzeichnis `.claude/` enthaelt Cowork-Workspace-Konfiguration (launch.json etc.). Dieses wird NICHT committet — es ist maschinenlokal und gehoert nicht ins Repository. Falls gewuenscht, `.claude/` ebenfalls zu .gitignore hinzufuegen:
```bash
echo ".claude/" >> .gitignore
```

---

## Zusammenfassung der Aenderungen

| Commit | Dateien | Kategorie |
|---|---|---|
| 0 (gitignore) | 1 | Housekeeping |
| 1 (Workflow) | 8 | v4-Architektur (kanonisch) |
| 2 (Agenten) | 8 | v4-Agenten-Refactor |
| 3 (Subagenten) | 12 | v4-Subagenten (neu + modifiziert) |
| 4 (Checklisten) | 5 | Qualitaetskriterien |
| 5 (Audits) | 20 | Audit-Zyklus + Design-Specs |
| 6 (Uebergabe) | 28 | Uebergabe-Docs + Projekttracking |
| 7 (Runde 3a) | 3 | Pre-Flight-Artefakte |
| **Gesamt** | **85** | |
