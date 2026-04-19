# LP-QM-Artefakt Aufbau-Plan

**Status:** AKTIV
**Erstellt:** 2026-04-19
**Geltungsbereich:** `docs/fachdidaktik/LEHRPLAN_QM_GPG7_MITTELSCHULE.md`
**Parent-Prozess:** F0e Didaktisches Audit (`docs/projekt/testrun-nationalismus-kolonialismus/F0e_DIDAKTISCHES_AUDIT_PLAN.md`)

---

## 1. Zweck

Kanonisch actionables Fundamentartefakt, das die LehrplanPlus-Bayern-Setzungen für R7 GPG Mittelschule intelligent exzerpiert + formatiert enthält. Dient als Single-Source-of-Truth-Referenz für:

- F0e Didaktisches Audit (Quelle für D1 Lernziel-Alignment)
- Generator-Agenten (PROJEKT_INHALTLICH → LP-Coverage)
- gpg7b/gpg7c-Schriftwesen-Skills (TUV-Lernziele)
- Zukünftige Escape-Game-Entwicklungen

## 2. Scope

**IN-Scope:**
- Zweck/Geltungsbereich
- Quellen-Kanon (URLs + Zugriffsdatum)
- Kompetenzstrukturmodell GPG (Sach/Methoden/Urteils/Orientierungskompetenz)
- Fachprofil GPG Mittelschule (WebSearch)
- Bildungs- und Erziehungsauftrag Mittelschule (WebSearch)
- Übergreifende Bildungs- und Erziehungsziele Matrix (WebSearch)
- LB1-LB4 je mit:
  - Kompetenzerwartungen verbatim
  - Inhalte verbatim
  - Grundlegende Kompetenzen verbatim
  - Operationalisierungs-Hinweise (Auditor-actionable)
  - Coverage-Prüfpunkte (Checklisten)
  - Beispiele kompetent vs. nicht-kompetent
  - Verknüpfung zu Übergreifenden Zielen
  - Anti-Patterns
- Q-Gates (Qualitätstore)
- Anwendungs-Matrix (welche Referenz wo nutzen)
- Changelog

**OUT-of-Scope (per User-Direktive 2026-04-19):**
- Themenbezogene Deep-Dives (Nationalismus/Imperialismus/Industrialisierung/1. Weltkrieg/Französische Revolution/Absolutismus/Jugendstrafrecht)
  - → verschoben auf "weitere Prozesse" (Deep-Dive-Artefakte nach Bedarf)

## 3. Quellen-Basis

- `/sessions/admiring-optimistic-cerf/mnt/weitergehts-online/assets/Lehrplan_GPG7.md` (v Entwurf, 102 Zeilen, enthält LB1-LB4 + Jahrgangsstufenprofil verbatim; URL-Stubs für Fachprofil/BuE/UebZ)
- WebSearch LehrplanPlus Bayern:
  - `lehrplanplus.bayern.de/fachprofil/mittelschule/gpg/7`
  - `lehrplanplus.bayern.de/bildungs-und-erziehungsauftrag/mittelschule/7/gpg`
  - `lehrplanplus.bayern.de/uebergreifende-ziele/mittelschule/gpg/7`
  - `lehrplanplus.bayern.de/jahrgangsstufenprofil/mittelschule/7/auspraegung/regelklasse/gpg`

## 4. Phasenplan

### Phase L1 — Framework (Claude, ~60 min)

**INPUT:** Lehrplan_GPG7.md + WebSearch-Ergebnisse
**AKTION:**
1. WebSearch Fachprofil GPG Mittelschule
2. WebSearch Bildungs- und Erziehungsauftrag Mittelschule 7
3. WebSearch Übergreifende Bildungs- und Erziehungsziele GPG 7
4. Schreibe §1 Zweck, §2 Quellen-Kanon, §3 Kompetenzstrukturmodell, §4 Fachprofil, §5 BuE+UebZ-Matrix
5. Schreibe §6 Skeleton (LB1-LB4 Struktur, Kompetenzerwartungen + Inhalte verbatim eingefügt, Sub-Sections Operationalisierung/Coverage/Beispiele/Anti-Patterns als leere Blöcke)
**OUTPUT:** LEHRPLAN_QM_GPG7_MITTELSCHULE.md §1-5 vollständig, §6 Skeleton
**VERIFY:** Alle WebSearch-Quellen mit Zugriffsdatum zitiert; keine Halluzination
**NEXT:** Go-Prüfung durch User → L2

### Phase L2 — Befüllung (Subagent `general-purpose`, ~2-3h)

**INPUT:** §6 Skeleton + User-Go
**AKTION:** Spawn Subagent mit Handoff-Prompt, der je LB1-LB4 Operationalisierungs-Hinweise + Coverage-Prüfpunkte + Beispiele kompetent vs. nicht-kompetent + UebZ-Verknüpfung + Anti-Patterns schreibt. Jeweils actionable für Auditor + Generator.
**OUTPUT:** §6 vollständig
**VERIFY:** Stichprobe 2 LB auf actionability + verbatim-Treue der LP-Quotes
**NEXT:** L3

### Phase L3 — Review + Integration (Claude, ~45 min)

**INPUT:** L2-Output
**AKTION:**
1. Konsistenz-Review (Kompetenzstruktur-Mapping, UebZ-Verweise)
2. Schreibe §7 Q-Gates (z.B. "Bestandssicher zitiert?", "Kompetenzstruktur 4-fach?")
3. Schreibe §8 Anwendungs-Matrix (F0e-Audit | Generator | Skills | Entwickler)
4. Schreibe §9 Changelog v1.0
**OUTPUT:** LEHRPLAN_QM_GPG7_MITTELSCHULE.md v1.0 vollständig
**VERIFY:** Doc-link-Checks, keine TODOs, keine PENDING
**NEXT:** L4

### Phase L4 — Integration in F0e (Claude, ~30 min)

**INPUT:** LP-QM v1.0
**AKTION:**
1. Update `F0e_HANDOFF_DIDAKTIK_AUDITOR.md` §6: LP-QM als Primär-Quelle, WebSearch nur als Backup
2. Update `F0e_AUDIT_RUBRIKEN.md` §6: analog
3. Update `F0e_DIDAKTISCHES_AUDIT_PLAN.md` §State-Marker
4. Update `docs/projekt/STATUS.md` (LP-QM committed, F0e.2 unblocked)
5. Update `docs/projekt/CHANGELOG.md` (2026-04-19 LP-QM v1.0)
**OUTPUT:** F0e.2 ready to spawn
**VERIFY:** Handoff+Rubriken zeigen auf `docs/fachdidaktik/LEHRPLAN_QM_GPG7_MITTELSCHULE.md`
**NEXT:** F0e.2 Dual-Subagent-Spawn

## 5. Compaction-Resistance

**3-Step-Readin bei Kontext-Neustart:**
1. Lies diese Datei (LP_QM_AUFBAU_PLAN.md) → Status + nächste Phase
2. Lies letzte geschriebene Sektion von LEHRPLAN_QM_GPG7_MITTELSCHULE.md
3. Lies State-Marker-Block (§6)

## 6. State-Marker

| Phase | Status | Timestamp | Nächste Aktion |
|-------|--------|-----------|----------------|
| L1 Framework | **FERTIG** | 2026-04-19 | — |
| L2 Befüllung | **FERTIG** | 2026-04-19 | — (Subagent-Output `LEHRPLAN_QM_GPG7_L2_BEFUELLUNG.md`) |
| L3 Integration | **FERTIG** | 2026-04-19 | — (§6 gemerged, §7 Q-Gates, §8 Anwendungs-Matrix, §9 v1.0, §10 aktualisiert) |
| L4 F0e-Integration | LAUFEND | 2026-04-19 | F0e_HANDOFF + F0e_RUBRIKEN + F0e_PLAN + STATUS + CHANGELOG aktualisieren |

## 7. Risiken

| ID | Risiko | Mitigation |
|----|--------|------------|
| R1 | LehrplanPlus-URLs nicht erreichbar (WebFetch-Restriction) | WebSearch-Fallback; PENDING-Tag + Fallback auf offizielle Sekundärquellen |
| R2 | LP-Text-Halluzination bei unvollständiger WebSearch | Strikt: nur zitieren was WebSearch-Snippets liefert, sonst PENDING |
| R3 | Subagent-Drift L2 (Operationalisierungs-Hinweise zu generisch) | Handoff-Prompt mit 2 Worked Examples + Stichproben-Review in L3 |
| R4 | Deep-Dive-Expansion (Scope-Creep) | strikt §2 OUT-Scope; bei Versuchung → neuer Prozess |

## 8. Definition of Done

- §1-9 vollständig
- LB1-LB4 alle 7 Sub-Sections (Kompetenzen/Inhalte/Grundlegend/Operationalisierung/Coverage/Beispiele/UebZ/Anti) befüllt
- Keine PENDING-Tags
- F0e-Artefakte aktualisiert
- Commit gebündelt mit F0e.5

## 9. Task-IDs

- #33 L1 Framework
- #34 L2 Befüllung
- #35 L3 Integration
- #36 L4 F0e-Integration
