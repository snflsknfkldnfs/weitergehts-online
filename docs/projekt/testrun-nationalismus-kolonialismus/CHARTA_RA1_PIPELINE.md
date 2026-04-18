# CHARTA RA1 — Pipeline-Prozess

**Ziel:** Beurteilung des Pipeline-Verlaufs (Phasen 0.1 bis 3.2) im Testrun `deutscher-nationalismus-kolonialismus`: Reihenfolge, Vollstaendigkeit, Q-Gate-Auslastung, Abbruch-/Schleifen-Pattern, Uebergabe-Qualitaet PM↔Claude-Code, ORCHESTRATOR-Nutzung als Router vs. als Nachtrags-Referenz.

---

## 1. Mandat

RA1 beantwortet: **War die Pipeline im Testrun eingehalten und war die Phasen-Choreografie robust?**

Unterfragen:
- Welche Phasen wurden durchlaufen, in welcher Reihenfolge?
- Wo gab es Abkuerzungen, uebersprungene Q-Gates, oder Ad-hoc-Abweichungen vom WORKFLOW_v4?
- Wie oft wurde ORCHESTRATOR als SSOT konsultiert (Precondition-Read) vs. nur referenziert?
- Welche Uebergaben zwischen Cowork-PM und Claude-Code (AGENT_INHALT Phase 0.2, Assembly Phase 3.0) fanden statt, waren sie vertrags-konform?
- Manifestiert sich F-P1/F-P2 aus `BEFUND_TESTRUN_M1_KONSOLIDIERT.md` auch hier? Neue Prozess-Findings?
- V13-Patch-Regressions-Mechanismus: Warum manifestierte sich die Hefteintrag-Verschachtelung trotz V13 in Mappe 3 erneut?

---

## 2. Pflicht-Lektuere (in dieser Reihenfolge)

1. `docs/projekt/testrun-nationalismus-kolonialismus/AUDIT_STATE.md`
2. `docs/projekt/testrun-nationalismus-kolonialismus/EVIDENZ_BUNDLE.md` (Abschnitte 3, 4.1-4.4, 5, 6)
3. Aktiver Prozess-Stand:
   - `docs/architektur/WORKFLOW_v4.md` — kanonische Phasenstruktur
   - `docs/agents/ORCHESTRATOR.md` — Produkt-Steuerungsdokument
   - `escape-game-generator/PROJECT_INSTRUCTIONS.md` — State Machine (sofern lesbar)
   - `docs/architektur/vertraege/VERTRAG_PHASE_3_ASSEMBLY.md` — V13-Kontext
   - `docs/architektur/vertraege/VERTRAG_PHASE_3-1_DEPLOY.md` — DEPLOY-06
4. Vergleichs-Audit: `docs/befunde/BEFUND_TESTRUN_M1_KONSOLIDIERT.md` (F-P1, F-P2)
5. Evidenz-Extrakte: `evidenz/phase_events.jsonl`, `evidenz/milestones.json`, `evidenz/session_handoffs.md`, `evidenz/timeline.csv`

---

## 3. Severitaets-Skala (aus AUDIT_STATE)

- **P0 CRITICAL:** Phase uebersprungen / Q-Gate umgangen, das zu Live-Defekt fuehrte.
- **P1 HIGH:** Uebergabe-Defekt mit Folge-Defekt; Patch-Durchsetzungs-Luecke; ORCHESTRATOR nicht als Router genutzt.
- **P2 MEDIUM:** Suboptimale Phasen-Reihenfolge ohne unmittelbaren Defekt; nicht-optimale Handoff-Prompt-Form.
- **P3 LOW:** Dokumentations-Drift, nomenklatorische Inkonsistenz.

---

## 4. Pflicht-Sektionen im Bericht `BERICHT_RA1_PIPELINE.md`

1. Zusammenfassung (max. 10 Zeilen, Gate-Urteil am Ende: GRUEN / GELB / ROT)
2. Methodologie (welche Extrakte genutzt, welche JSONL-Zeitfenster vertieft)
3. Phasen-Chronologie (Tabelle: Phase | Start-ts | End-ts | Q-Gate-Urteil | Dokumentierter Pfad)
4. Abweichungen vom kanonischen WORKFLOW_v4 (Liste + Severitaet)
5. ORCHESTRATOR-Nutzungs-Analyse (als Router vor jeder Phase gelesen? Wo nicht? Vergleich zu F-P1)
6. Uebergaben PM ↔ Claude-Code (Zeitpunkte, Format, Erfolg)
7. V13-Patch-Wirksamkeits-Analyse (warum trat Hefteintrag-Verschachtelung in Mappe 3 erneut auf)
8. Session-Boundary-Analyse (Uebergabe-Prompts A→B, B→C — aus `session_handoffs.md`)
9. Q-Gate-Auslastung (wieviele PASS, WARN, FAIL — wurden alle Gates durchlaufen?)
10. Findings (P0-P3, je mit ID F-RA1-NN, Beschreibung, Evidenz, Empfehlung)
11. Konvergenz / Divergenz mit UPGRADE_PLAN (MV2 Komponente 2 Verifikations-Gate, PATCH-M3 Finding 5, UX-1 betrifft Prozess-Gate fuer Sprachniveau)
12. Gate-Urteil mit Begruendung
13. Anhang: Rohdaten-Zitate fuer alle P0/P1-Findings (ts + Text-Ausschnitt)

---

## 5. Methodologie

- Extrakte durchlesen, nicht JSONL komplett scannen.
- Bei Unklarheit gezielt JSONL-Zeitfenster laden (siehe EVIDENZ_BUNDLE Anhang B).
- Finding-IDs: F-RA1-01 ff.
- Jedes Finding benoetigt: Beschreibung + Evidenz-Zitat (ts + snippet) + Ursache + Empfehlung + Severitaet.
- Keine Annahmen ohne Evidenz. "Wahrscheinlich" nur bei eindeutiger Indizien-Kette.

---

## 6. Deliverable

**Pfad:** `docs/projekt/testrun-nationalismus-kolonialismus/BERICHT_RA1_PIPELINE.md`
**Format:** Markdown, Pflicht-Sektionen 1-13, Tabellen und Aufzaehlungen zulaessig.
**Umfang-Richtwert:** 400-800 Zeilen.
**Persistenz-Pflicht:** Datei MUSS geschrieben sein, bevor der Agent antwortet "fertig". Bei Abbruch: partieller Bericht wird NICHT als Ergebnis akzeptiert.

---

## 7. Out-of-Scope (wird von anderen RAs abgedeckt)

- Didaktische Material-Qualitaet (RA2)
- Engine-Rendering, data.json-Format-Fehler (RA3)
- Medien-Inhalts- und Lizenz-Integritaet (RA4)
- PM-Meta (Kompaktion, Context-Pressure, Task-Tracking) (RA5)

---

## 8. Rollen-Isolation

RA1 ist Beobachter, kein Produkt-Eingreifer. Keine Dateien ausserhalb des Scope-Verzeichnisses schreiben. Keine Vertrags-/Agenten-Dokumente patchen. Vorschlaege nur als Finding + Empfehlung formulieren.
