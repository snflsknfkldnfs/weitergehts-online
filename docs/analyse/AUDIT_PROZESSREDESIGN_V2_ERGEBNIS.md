# Audit-Ergebnis: Prozessredesign v1 → v2

**Datum:** 2026-03-22
**Auditor:** Externer Reviewer (Softwareentwicklung / Prozessdesign)
**Gesamtbewertung:** Freigabe unter Auflagen
**Auflagen-Status:** Alle 5 Auflagen umgesetzt (2026-03-22)

---

## Bewertung

v2 loest die drei identifizierten v1-Probleme (Token-Ineffizienz, fehlende Zielklarheit, blinde Recherche) durch architektonisch korrekte Massnahmen. Phasenstruktur kohaerend, Agenten-Rollen sauber getrennt, User-Validierungspunkte sinnvoll platziert.

## Auflagen (alle umgesetzt)

| # | Auflage | Prio | Umsetzung |
|---|---|---|---|
| 1 | AGENT_SKRIPT.md erstellen | Blocker | `docs/agents/AGENT_SKRIPT.md` erstellt. Agent-Prompt mit Stil-Constraints, Qualitaets-Gate (10 Pruefpunkte), Chunking-Mandat, Sandwich-Methode, Tafelbild-Entwurfsregeln, Abgrenzungstabelle. |
| 2 | MATERIAL_GERUEST-Template spezifizieren | Blocker | In `docs/architektur/WORKFLOW_v2.md` Abschnitt 5: Vollstaendiges Template mit Tafelbild-Detail, Material-Entwurf (inkl. Skript-Absatz + W-Ref), Aufgaben-Skizze (inkl. AFB), Erarbeitbarkeits-Nachweis. |
| 3 | data.json-Schema in ORCHESTRATOR.md aktualisieren | Hoch | ORCHESTRATOR.md data.json-Abschnitt auf v1-erweitertes Schema aktualisiert: einstieg{}, materialien[], sicherung{}, tafelbild{}, quellenangaben[], material_referenz in aufgaben[]. |
| 4 | Wikipedia-Fallback-Pfad definieren | Hoch | In WORKFLOW_v2 Schritt 0.2: 3-stufiger Fallback (verwandte Artikel → WebSearch+markdownify → User-Meldung). |
| 5 | Material-Typ-Auswahllogik adaptieren | Mittel | In AGENT_MATERIAL.md: Skript-basierte Trigger als primaere Logik ergaenzt (7 Trigger), Tafelbild-basierte Trigger als sekundaer beibehalten, Entscheidungsregel definiert. |

## Empfehlungen (alle umgesetzt)

| # | Empfehlung | Umsetzung |
|---|---|---|
| 6 | INHALTSBASIS-Template: Recherche-Hinweise | In WORKFLOW_v2 Abschnitt 4: Neues Feld "Recherche-Hinweise" pro Mappe (Quellenqualitaet, gute/duenne Quellenlage, ergiebige Artikel). |
| 7 | SKRIPT-Chunking: Struktur-Anpassungs-Mandat | In AGENT_SKRIPT.md Abschnitt 3: Explizites Mandat — Chunk-Grenzen nicht eigenmaechtg verschieben, stattdessen STRUKTUR-HINWEIS dokumentieren, User-Review entscheidet. |
| 8 | Sandwich-Validierung in Phase-2-User-Review | In WORKFLOW_v2 Phase 2 User-Validierung: 4 Pruefpunkte, davon Punkt 4 = Sandwich-Konsistenz (Uebergang zur naechsten Mappe pruefen wenn Tafelbild geaendert). |
| 9 | Quellenangaben-Assembly dokumentieren | In WORKFLOW_v2 Phase 2: Expliziter Post-Subagenten-Schritt — AGENT_MATERIAL aggregiert quellenangaben[] aus allen Subagenten-Outputs vor AGENT_RAETSEL. |

## Geaenderte Dateien

| Datei | Aenderung |
|---|---|
| `docs/agents/AGENT_SKRIPT.md` | Neu erstellt |
| `docs/architektur/WORKFLOW_v2.md` | Abschnitt 5: MATERIAL_GERUEST-Template. Abschnitt 4 Schritt 0.2: Fallback-Pfad + Recherche-Hinweise. Phase 2: Quellenangaben-Assembly + Sandwich-Pruefpunkt. |
| `docs/agents/ORCHESTRATOR.md` | data.json-Schema auf v1-erweitertes Schema aktualisiert |
| `docs/agents/AGENT_MATERIAL.md` | Skript-basierte Material-Typ-Auswahllogik ergaenzt |
