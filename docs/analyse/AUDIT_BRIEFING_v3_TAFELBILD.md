# Audit-Briefing: v3 Tafelbild-Professionalisierung

**Datum:** 2026-03-26
**Audit-Typ:** Externer Review vor Implementierung (Pre-Implementation Gate)
**Scope:** 3 Dateien — Architekturentscheidung + Guetekriterien + neuer Agent

---

## 1. Kontext

Dieses Projekt baut interaktive Escape-Games als statische Website (GitHub Pages). Materialien werden durch eine Agenten-Pipeline erzeugt: Didaktik → Inhalt → Skript → Material → Aufgaben → Technik/Design.

**v2.1 (aktuell):** Das Tafelbild (Sicherungsinstrument am Ende jeder Mappe) ist ein Nebenprodukt von AGENT_SKRIPT — ein paar Tabellenzeilen mit Knoten und Verbindungen, ohne eigene Guetekriterien, ohne Hefteintrag-Format, ohne Steuerungsfunktion.

**v3 (geplant):** Das Tafelbild wird zum eigenstaendigen Agenten (AGENT_TAFELBILD, Phase 0.2c), steht VOR dem Skript statt danach, und wird zur Zielstruktur, an der sich Skript und Material ausrichten.

---

## 2. Zu auditierende Dateien

### Datei 1: `docs/architektur/UPGRADE_PLAN_v3.md`

**Zweck:** Architekturentscheidung, Diagnose, Zielbild, Auswirkungen auf bestehende Agenten, Umsetzungsplan (6 Phasen), Risiken, offene Entscheidungen.

**Audit-Fragen:**
- Ist die Design-Inversion (Tafelbild vor Skript) didaktisch begruendet und konsistent?
- Sind die Auswirkungen auf AGENT_SKRIPT, AGENT_MATERIAL und andere vollstaendig erfasst?
- Fehlen Risiken oder Abhaengigkeiten?
- Ist der Umsetzungsplan realistisch sequenziert?

### Datei 2: `docs/checklisten/GUETEKRITERIEN_TAFELBILD.md`

**Zweck:** Empirisch fundierte Guetekriterien (13 Kriterien, gewichtet in MUSS/SOLL/KANN), basierend auf DG B2 Tafelbild.pdf + 8 Praxis-Tafelbilder + 8 Verlaufsplaene aus einer realen 1.WK-Sequenz.

**Audit-Fragen:**
- Sind die 13 Kriterien vollstaendig? Fehlen wichtige Dimensionen?
- Sind die Gewichtungen (MUSS vs. SOLL vs. KANN) plausibel?
- Sind die Operationalisierungen praezise genug fuer maschinelle Pruefung?
- Ist das Output-Format (JSON + Hefteintrag) praktikabel?
- Stimmt die empirische Herleitung (Empirie → Kriterium)?

### Datei 3: `docs/agents/AGENT_TAFELBILD.md`

**Zweck:** Agenten-Prompt fuer den neuen AGENT_TAFELBILD. Definiert Rolle, Eingabe, 6 Aufgaben, dualen Output, Q-Gate, Schnittstellen, Abgrenzung.

**Audit-Fragen:**
- Sind die Eingaben vollstaendig? Fehlt etwas, das AGENT_TAFELBILD braucht?
- Ist die Aufgabensequenz logisch (Kernerkenntnisse → Ordnungsmuster → Knoten → Erarbeitbarkeit → Hefteintrag → Q-Gate)?
- Sind die Schnittstellen zu AGENT_SKRIPT, AGENT_MATERIAL, SUB_*-Subagenten konsistent?
- Kann der Agent mit den definierten Eingaben tatsaechlich ein Tafelbild erstellen, das G1-G13 besteht?
- Gibt es Leerlaeufe, Redundanzen oder Widersprueche zum Gesamtworkflow?

---

## 3. Referenz-Dateien (Kontext, nicht zu auditieren)

| Datei | Relevanz |
|---|---|
| `docs/architektur/WORKFLOW_v2.md` | Aktueller Workflow (v2.1) — zeigt, was sich aendert |
| `docs/agents/AGENT_SKRIPT.md` | Aktueller SKRIPT-Agent — wird in v3-2 geaendert |
| `docs/agents/AGENT_MATERIAL.md` | Aktueller MATERIAL-Agent — Tafelbild-Detaillierung wird zu Verifizierung |
| `docs/agents/ORCHESTRATOR.md` | Agenten-Sequenz — wird aktualisiert |
| `docs/agents/artefakte/SKRIPT_gpg-erster-weltkrieg-ursachen.md` | Bestehendes Skript mit Tafelbild-Entwuerfen (v2.1-Stand) |

---

## 4. Audit-Dimensionen

Der Auditor soll die drei Dateien gegen diese 8 Dimensionen pruefen:

| # | Dimension | Beschreibung |
|---|---|---|
| A1 | **Konsistenz** | Widersprechen sich die drei Dateien untereinander? Stimmen Terminologie, IDs, Formate ueberein? |
| A2 | **Vollstaendigkeit** | Fehlen Aspekte, die fuer die Umsetzung noetig sind? Unbehandelte Grenzfaelle? |
| A3 | **Schnittstellen** | Passen die Ein-/Ausgaben nahtlos an die bestehenden Agenten (SKRIPT, MATERIAL, RAETSEL, SUB_*)? |
| A4 | **Didaktische Validitaet** | Ist die Design-Inversion begruendet? Sind die Guetekriterien fachdidaktisch haltbar? |
| A5 | **Praktikabilitaet** | Kann ein LLM-Agent mit diesen Anweisungen tatsaechlich ein gutes Tafelbild erzeugen? Sind die Constraints realistisch? |
| A6 | **Redundanz** | Gibt es Dopplungen zwischen den drei Dateien oder mit bestehenden Agenten? |
| A7 | **Risiken** | Unbehandelte Risiken? Fehlende Fallback-Pfade? |
| A8 | **Skalierbarkeit** | Funktioniert das Konzept auch fuer andere Faecher/Themen (nicht nur GPG 1.WK)? |

---

## 5. Erwartetes Audit-Ergebnis

Pro Dimension (A1-A8): PASS / FINDING (mit Beschreibung und Empfehlung).

Befunde priorisieren als:
- **BLOCKER** — Muss vor v3-2/v3-3 behoben werden
- **HIGH** — Sollte behoben werden, kein sofortiger Blocker
- **MEDIUM** — Verbesserungsvorschlag, bei Gelegenheit
- **LOW** — Anmerkung, kein Handlungsbedarf

---

## 6. Dateien lesen (in dieser Reihenfolge)

1. `docs/architektur/UPGRADE_PLAN_v3.md` (Gesamtbild)
2. `docs/checklisten/GUETEKRITERIEN_TAFELBILD.md` (Kriterien-Details)
3. `docs/agents/AGENT_TAFELBILD.md` (Implementierung)
4. Optional: `docs/agents/AGENT_SKRIPT.md` (Schnittstellen-Abgleich)
5. Optional: `docs/architektur/WORKFLOW_v2.md` (Kontext)
