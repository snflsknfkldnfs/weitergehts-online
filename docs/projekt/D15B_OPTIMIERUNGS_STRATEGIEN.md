# D15b Optimierungs-Strategien

**Zweck:** Konsolidierte Strategie-Entwuerfe, die aus der Implikations-Matrix (`D15B_IMPLIKATIONS_MATRIX.md`) abgeleitet werden. Jede Strategie buendelt 1–N Befunde zu einer konkreten, umsetzbaren Aenderung.
**Kontext:** `AUSFUEHRUNGSPLAN_D15B_OPTIMIERUNG.md` Phase III.
**Status:** TEMPLATE (Phase 0). Inhalte werden in Phase III eingetragen, nachdem Phase I und Phase II abgeschlossen sind.

---

## Ausfuell-Regeln

1. **Eine Strategie = eine kohaerente Aenderungs-Einheit.** Wenn zwei Aenderungen unabhaengig voneinander umgesetzt, getestet und zurueckgerollt werden koennen, sind es zwei Strategien.
2. **Strategien sind versionier- und committierbar.** Commit-Message-Template: `feat(d15b): STR-XX — <Kurztitel> (adressiert BEFUND-IDs)`.
3. **Abhaengigkeiten als DAG.** Vor-/Nachbedingungen explizit; keine Zyklen.
4. **Validierungs-Kriterium ist testbar.** Entweder automatisiert (JSON-Schema, Browser-Check) oder manuell (Re-Audit-Spot).
5. **Prioritaet P0–P3 bestimmt die Umsetzungs-Reihenfolge in Phase IV.**

---

## Strategie-Template

```
### STR-XX — <Kurztitel>

**Prioritaet:** P0 / P1 / P2 / P3
**Adressiert Befunde:** [BEFUND-IDs]
**Betroffene Ebenen:** [E0–E9]
**Betroffene Dateien:** [Liste]
**Aenderungs-Typ:** Patch / Refactor / Neu-Erstellung / Schema-Erweiterung / Prompt-Reengineering

**Ziel-Beschreibung:**
[So-soll-es-sein, max. 5 Saetze.]

**Aenderungs-Skizze:**
[Konkrete Aenderungen, Stichworte oder Pseudo-Diff.]

**Abhaengigkeiten:**
- Vor: [STR-YY, externe Arbeit, ...]
- Nach: [STR-ZZ, ...]

**Risiken:**
- [Regressions-Risiko, Kompatibilitaet, Scope-Creep, ...]

**Validierung:**
- [Automatisierter Test / Browser-Check / Re-Audit-Befund].

**Aufwand:** S (< 1h) / M (1–4h) / L (> 4h)
**Umsetzungs-Reihenfolge:** [Ord-Nummer in Phase IV]
```

---

## Strategie-Kategorien (vorlaeufig, zu validieren in Phase III)

### Kategorie S-Engine
Engine-Patches an `escape-engine.js`, Layout, Schema.
Erwartete Strategien (Arbeitstitel):
- STR-E1: Layout side-by-side Material/Aufgabe (adressiert A4)
- STR-E2: Aufgabenspezifische Feedback-Slots im data.json-Schema (adressiert A5, R6-1)
- STR-E3: Differenzierungs-Track-Support (adressiert C3)
- STR-E4: DaZ-Glossar-Box als Engine-Komponente (adressiert R2-1)
- STR-E5: WCAG-Pass / Touch-Target-Groesse (adressiert F4, R2-2)

### Kategorie S-Subagenten
Prompt-Reengineering fuer SUB_MATERIAL_* und SUB_AUFGABE_*.
Erwartete Strategien:
- STR-S1: Multiperspektivitaet als Pflicht-Feld in Material-Vertrag + SUB_MATERIAL_* (adressiert B2, F3)
- STR-S2: Bloom-Verteilungs-Pflicht in SUB_AUFGABE_* + Progressionsplan-Vertrag (adressiert A3, R6-2)
- STR-S3: Tipp-Struktur-Regel (3 Stufen mit explizitem Haertegrad-Contract: Stufe 1 kognitiv, Stufe 2 inhaltlich, Stufe 3 heuristisch — NICHT Loesung vorwegnehmen) (adressiert R4-1, R6-1)
- STR-S4: Elaboratives Feedback als Pflicht-Feld im Aufgaben-Output (adressiert A5)
- STR-S5: Paraphrase-Kennzeichnung fuer Quellentext-Derivate (adressiert R2-3)
- STR-S6: AGENT_HEFTEINTRAG um Concept-Mapping-Option erweitern (adressiert E2)
- STR-S7: SUB_AUFGABE_FREITEXT Rubric-Pflicht (adressiert R5-1)

### Kategorie S-Gueteregeln
Erweiterung der 6 Gueteregel-Kataloge.
Erwartete Strategien:
- STR-G1: Gueteregeln-Aufgaben erweitern (A19–A23: Bloom-Verteilung, Process-Feedback-Quote, Tipp-Haertegrad, ICAP-Klassifizierung, Rubric bei Freitext)
- STR-G2: Gueteregeln-Material erweitern (M13–M16: Multiperspektivitaet, Paraphrase-Kennzeichnung, Fachbegriff-Handlungsebene, Trigger-Metadaten)
- STR-G3: Gueteregeln-Sequenzierung erweitern (S16–S18: Zeitbudget-Deklaration, Progression zum Lernziel, OTL-Schaetzung)

### Kategorie S-Checklisten
Neue/erweiterte Q-Gates.
Erwartete Strategien:
- STR-C1: Pre-Publikations-Checkliste (10 Punkte aus Synthese §VI)
- STR-C2: Post-Produktions-Multi-Audit als Standard-Q-Gate vor Publikation (adressiert F1–F6, D15b-Methodik)

### Kategorie S-Begleitdokumente
Neues Dokumenten-Set `escape-games/<game>/lehrkraft/`.
Erwartete Strategien:
- STR-B1: Trigger-Warning + Kultur-Sensibilitaets-Leitfaden Template (adressiert D1)
- STR-B2: Doppelstunden-Ablauf-Template (adressiert B1, R5-2)
- STR-B3: Differenzierungs-Arbeitsblatt-Template Track A/C (adressiert C3)
- STR-B4: Rubric-Template fuer Freitext-Aufgaben (adressiert R5-1)

### Kategorie S-Audit-Methodik
D15b-Lessons, Folge-Audit-Design.
Erwartete Strategien:
- STR-A1: D15b-Methodik als wiederverwendbarer Audit-Workflow dokumentieren (Chrome-MCP-Boilerplate, Rollen-Isolation, Synthese-Pattern)
- STR-A2: accessibility-compliance Plugin in Audit-Workflow integrieren (adressiert F4)
- STR-A3: Retention-Test-Design (adressiert F2)
- STR-A4: Mini-Pilot-Test-Protokoll (5-10 SuS) als ergaenzender Audit-Schritt

### Kategorie S-Mappe-4-Daten-Patch
Retroaktive Mappe-4-Fixes (NICHT Infrastruktur, aber Re-Audit-Baseline).
Erwartete Strategien:
- STR-M4-1: Aufgaben-Reihenfolge aendern (A7 frueher verankern) (adressiert A3)
- STR-M4-2: Elaborative Feedback-Texte fuer Mappe 4 Aufgaben 1-7 schreiben (adressiert A5)
- STR-M4-3: DaZ-Glossar-Box-Daten fuer Mappe 4 (adressiert R2-1)
- STR-M4-4: Schlieffen-Zitat als Paraphrase kennzeichnen (adressiert R2-3)
- STR-M4-5: Trigger-Warning-Leitfaden fuer Mappe 4 (adressiert D1)

---

## Strategie-Register (leer)

| STR-ID | Kurztitel | Prio | Adressiert | Ebenen | Aufwand | Status |
|---|---|---|---|---|---|---|
| _[Phase III: fuellen]_ | | | | | | |

---

## Abhaengigkeits-Graph (leer)

_Hier wird in Phase III ein DAG der Strategien dokumentiert (Mermaid oder Liste), um die Umsetzungs-Reihenfolge in Phase IV festzulegen._

```
[Phase III: Mermaid-Diagramm oder Liste]
```

---

## Entscheidungspunkte Phase III

1. **Scope-Cut:** Nur P0/P1 in Phase IV, oder P0/P1/P2? (User-Freigabe noetig)
2. **Engine-Impact:** Sind die Engine-Patches klein genug fuer ein Cowork-Session oder benoetigen sie eigenen Uebergabe-Prompt an Claude Code?
3. **Mappe-4-Daten-Patch vs. Infrastruktur-Patch-Reihenfolge:** Zuerst Daten-Patch (schneller sichtbar), zuerst Infrastruktur (nachhaltiger) oder parallel?
4. **Re-Audit-Scope:** Vollstaendiger 6-Rollen-Re-Audit oder reduziert auf 2–3 Rollen (R4 ID, R6 Empirie, ggf. R2 Stadt)?

---

**Naechste Aktion:** Nach Abschluss Phase II (Implikations-Matrix gefuellt und Hotspots bestaetigt) wird dieses Dokument in Phase III mit konkreten Strategien gefuellt. Jede Strategie folgt dem Template oben.
