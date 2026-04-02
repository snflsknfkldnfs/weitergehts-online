# AUDIT BRIEFING v4.2 — Produktionskohaerenz

**Datum:** 2026-04-02
**Anlass:** Infrastruktur-Finalisierung M6+M7+M8 abgeschlossen. Vor Mappe-3-Produktion: externe Pruefung der Prozesskohaerenz.
**Scope:** Stimmen Vertraege, Agenten-Docs, Orchestrator, Engine und Live-Daten nach den Refactorings (M6 sicherung.json-Split, M7 Tafelbild→Hefteintrag-Rename, M8 Kernerkenntnisse-Deduplizierung) noch ueberein?

---

## Pflichtlektuere

Der Auditor muss folgende Dateien vollstaendig lesen, bevor er die Prueffragen beantwortet:

### Vertraege (normativ)
1. `docs/architektur/vertraege/VERTRAG_PHASE_2-0_RAHMEN.md`
2. `docs/architektur/vertraege/VERTRAG_PHASE_2-1_MATERIAL.md`
3. `docs/architektur/vertraege/VERTRAG_PHASE_2-1c_CROSS.md`
4. `docs/architektur/vertraege/VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md`
5. `docs/architektur/vertraege/VERTRAG_PHASE_2-2b_RAETSEL.md`
6. `docs/architektur/vertraege/VERTRAG_PHASE_2-2c_CROSS.md`

### Agenten-Dokumentation (operativ)
7. `docs/agents/ORCHESTRATOR.md`
8. `docs/agents/AGENT_HEFTEINTRAG.md`
9. `docs/agents/AGENT_RAETSEL.md`
10. `docs/agents/AGENT_MATERIAL.md`
11. `docs/agents/AGENT_SKRIPT.md`

### Workflow + Architektur
12. `docs/architektur/WORKFLOW_v4.md`
13. `docs/architektur/UPGRADE_PLAN_v4_PRODUKTIONSARCHITEKTUR.md`

### Qualitaetskriterien
14. `docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md` (G1-G14, Phase 0.4)
15. `docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG_PRODUKT.md` (HE1-HE13, Phase 2.1c+)
16. `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md`
17. `docs/checklisten/GUETEKRITERIEN_SEQUENZIERUNG.md`
18. `docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md`

### Engine + Daten (Implementierung)
19. `assets/js/escape-engine.js` (Funktionen `_renderSicherung`, `_renderHefteintragSCPL`, Kernerkenntnisse-Fallback-Chain)
20. `escape-games/gpg-erster-weltkrieg-ursachen/data.json` (Mappe 1 + 2 sicherung-Bloecke)
21. `escape-games/template/data.json` (Schema-Template)

### Uebergabe-Prompts (Phase-3-Schnittstelle)
22. `docs/agents/artefakte/produktion/gpg-erster-weltkrieg-ursachen/mappe-2/UEBERGABE_PROMPT_PHASE3.md`

---

## Prueffragen

### PF-1: M8-Konsistenz in VERTRAG_PHASE_2-0

**Kontext:** M8 hat `kernerkenntnisse[]` aus sicherung.json entfernt. Die primaere Quelle ist jetzt `hefteintrag.scpl.loesung[]`.
**Pruefen:** Enthaelt VERTRAG_PHASE_2-0_RAHMEN.md noch Instruktionen, die einen Agenten anweisen, `kernerkenntnisse[]` in sicherung.json zu produzieren? Falls ja: Welche Stellen genau, und wie muss die Korrektur lauten?
**Besonders beachten:** Die M3b-Constraint (`sicherung.kernerkenntnisse[] === tafelbild.scpl.loesung[]`) — ist sie noch vorhanden, und widerspricht sie M8?

### PF-2: Feld-Name `_meta.tafelbild_knoten_abgedeckt`

**Kontext:** M7 hat alle `tafelbild`-Referenzen in `hefteintrag` umbenannt — in Docs, Engine und JSON-Keys.
**Pruefen:** Verwenden Material-Artefakte oder Vertragsdefinitionen noch das Feld `_meta.tafelbild_knoten_abgedeckt`? Muss es zu `_meta.hefteintrag_knoten_abgedeckt` migriert werden? Welche Dateien waeren betroffen (Vertraege, AGENT_MATERIAL, Produktions-Artefakte, Engine)?

### PF-3: UEBERGABE_PROMPT_PHASE3 Aktualitaet

**Kontext:** Der Uebergabe-Prompt fuer Mappe 2 wurde vor M7 erstellt.
**Pruefen:** Referenziert UEBERGABE_PROMPT_PHASE3.md noch `tafelbild.json` statt `hefteintrag.json`? Enthaelt er veraltete Feldnamen oder Dateipfade? Ist das fuer die Mappe-2-Produktion (bereits abgeschlossen) irrelevant, oder dient er als Template fuer Mappe 3?

### PF-4: Feld-Inkonsistenz VERTRAG_PHASE_2-2b (Raetsel)

**Kontext:** AGENT_RAETSEL und VERTRAG_PHASE_2-2b definieren das Zuordnungs-Raetsel-Schema.
**Pruefen:** Gibt es eine Diskrepanz zwischen `elemente_ungeordnet` und `optionen` als Feldname fuer dasselbe Konzept? Welcher Name ist kanonisch (Engine-Implementierung)? Welche Docs muessen angepasst werden?

### PF-5: Assembly-Prozess (ORCHESTRATOR) nach M6+M7

**Kontext:** Der ORCHESTRATOR beschreibt den Assembly-Prozess: wie Einzelartefakte (hefteintrag.json, sicherung.json, material.json, etc.) in data.json zusammengefuegt werden.
**Pruefen:** Stimmen die im ORCHESTRATOR genannten Dateinamen, Feldpfade und Assembly-Schritte mit dem aktuellen Stand ueberein? Insbesondere:
- Wird `hefteintrag.json` (nicht `tafelbild.json`) assembliert?
- Wird `sicherung.json` ohne `kernerkenntnisse[]` assembliert?
- Stimmt das resultierende data.json-Schema mit dem Template und der Engine ueberein?

### PF-6: GUETEKRITERIEN-Referenzen Kreuz-Check

**Kontext:** M7 hat die GUETEKRITERIEN-Dateien umbenannt: `_ENTWURF` (G1-G14) vs `_PRODUKT` (HE1-HE13).
**Pruefen:** Referenzieren alle Vertraege und Agenten-Docs die korrekten Dateinamen? Gibt es noch Referenzen auf die alten Namen (`GUETEKRITERIEN_TAFELBILD.md` oder `GUETEKRITERIEN_HEFTEINTRAG.md` ohne Suffix)?

### PF-7: Engine-Lueckentext-Patch

**Kontext:** Die Engine rendert verschiedene Raetsel-Typen. Beim Lueckentext-Raetsel gibt es potenzielle Feld-Diskrepanzen.
**Pruefen:** Liest die Engine `text_mit_luecken` oder `frage` als Primaerfeld fuer Lueckentexte? Stimmt das mit dem Schema in VERTRAG_PHASE_2-2b und AGENT_RAETSEL ueberein? Gibt es eine Fallback-Chain oder bricht die Darstellung bei fehlender Uebereinstimmung?

### PF-8: Vertragsketten-Vollstaendigkeit

**Kontext:** Die v4-Architektur definiert eine Vertragskette: Phase 2-0 (Rahmen) → 2-1 (Material) → 2-1c (Cross) → 2-2a (Progression) → 2-2b (Raetsel) → 2-2c (Cross).
**Pruefen:** Deckt diese Kette den gesamten Produktionsprozess einer Mappe ab? Gibt es Luecken — z.B. fehlende Vertraege fuer Sicherung, Hefteintrag-Produktion, Skript, oder Assembly? Sind diese Schritte in anderen Dokumenten (WORKFLOW_v4, ORCHESTRATOR) abgedeckt, oder besteht eine normative Luecke?

### PF-9: Datenmodell-Konsistenz Live vs. Template

**Pruefen:** Vergleiche die sicherung-Bloecke in `data.json` (Mappe 1 + 2) mit dem Schema in `template/data.json`. Stimmen die Feldnamen und die Struktur ueberein? Insbesondere:
- Kein `kernerkenntnisse[]` mehr in sicherung (M8)
- `hefteintrag` statt `tafelbild` als Key (M7)
- `scpl.loesung[]` als Array mit separaten Items (M3b-Konformitaet)

---

## Erwartetes Ergebnis

Pro Prueffrage:
- **Befund:** Konkrete Fundstellen (Datei, Zeile/Abschnitt, Zitat)
- **Bewertung:** KONFORM | ABWEICHUNG | UNKRITISCH
- **Korrekturmassnahme:** Falls ABWEICHUNG — exakte Aenderung mit Datei und Stelle

Zusammenfassung als Tabelle am Ende:

| PF | Bewertung | Massnahme |
|----|-----------|-----------|
| PF-1 | ? | ? |
| ... | ... | ... |

---

## Kontext fuer den Auditor

### Was ist M6+M7+M8?

- **M6:** `sicherung.json` enthielt sowohl Sicherungs-Metadaten (zusammenfassung, ueberleitung, etc.) ALS AUCH `kernerkenntnisse[]`. Aufgespalten: kernerkenntnisse leben jetzt ausschliesslich in `hefteintrag.scpl.loesung[]`.
- **M7:** Alle `tafelbild`-Bezeichnungen im Codebase (JSON-Keys, Dateinamen, Doc-Referenzen) wurden zu `hefteintrag` umbenannt. Ausnahme: Historische Dokumente (analyse/, uebergabe/) bleiben unveraendert.
- **M8:** Die Kernerkenntnisse-Dopplung (sicherung.kernerkenntnisse[] ≡ hefteintrag.scpl.loesung[]) wurde aufgeloest. Engine liest primaer aus hefteintrag.scpl.loesung[], mit Backward-Fallback auf Legacy-Pfade.

### Runtime-Datenmodell (post-M6+M7+M8)

```
mappen[]:
  sicherung:
    hefteintrag:
      scpl:
        loesung: [...]        ← primaere Kernerkenntnisse-Quelle
        stundenfrage: "..."
        bereiche: [...]
      knoten: [...]
    zusammenfassung: "..."
    ueberleitung: "..."
    reflexionsimpuls: "..."
    hefteintrag_verweis: "..."
    zitat: { text, quelle }
```

### Historische Dokumente (NICHT pruefen)

Folgende Dateien sind bewusst nicht aktualisiert und stellen keine Abweichung dar:
- `docs/analyse/*` (fruehere Audits)
- `docs/uebergabe/*` (fruehere Uebergabe-Prompts)
- `docs/architektur/WORKFLOW_v2.md`, `UPGRADE_PLAN_v3*.md` (superseded)
