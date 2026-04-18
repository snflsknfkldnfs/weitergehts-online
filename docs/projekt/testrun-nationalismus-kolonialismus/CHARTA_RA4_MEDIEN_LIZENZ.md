# CHARTA RA4 — Medien / Quellen / Lizenz

**Ziel:** Beurteilung der Medien-Pipeline im Testrun: Halluzinations-Rate, Verifikations-Praxis, Lizenz-Pre-Checks, Commons-/Bundesarchiv-Lookup-Quality, Primaerquellen-Behandlung, Ersatz-Kriterien-Qualitaet.

---

## 1. Mandat

RA4 beantwortet: **Wie gut war die Medien-Integritaet im Testrun, und wie muss die Medien-Pipeline strukturell umgebaut werden?**

Unterfragen:
- MV2-Hallu-Rate 6/18 (33%) verifizieren: hat die Post-Hoc-API-Pruefung alle Treffer erwischt, oder gibt es weitere nicht-existente Dateien die durchgerutscht sind?
- War in Phase 0.2 ueberhaupt Wikimedia-API-Zugriff vorgesehen? (Session A zeigte 16 `wikimedia-image-search`-Aufrufe — wozu, wenn Phase 0.2 in Claude Code lief?)
- Ersatz-Qualitaet: Marechal-Karikatur fuer Berlin-Konferenz — didaktisch aequivalent? Lizenz geprueft?
- Bundesarchiv-Signaturen (img-4-1, img-4-3, img-4-4 Herero/Nama): Existenz geprueft? Alternative Pfade?
- Lizenz-Pre-Check (aus R0.7 Plan-Impact 12): wurde in Phase 0.2 irgendeine Lizenz-Pruefung gemacht?
- Commons-vs-WebFetch-Redundanz (R0.5 Dual-Kanal-Pflicht): wurde sie bereits implementiert?
- Bildunterschriften: korrekte Quellenangabe, Urheber, Lizenz-Stempel? Oder nur deskriptiver Text?
- UPGRADE_PLAN MV2 Massnahmen-Vorschlag: ist er technisch ausreichend oder gibt es Luecken?

---

## 2. Pflicht-Lektuere

1. `docs/projekt/testrun-nationalismus-kolonialismus/AUDIT_STATE.md`
2. `docs/projekt/testrun-nationalismus-kolonialismus/EVIDENZ_BUNDLE.md` (v.a. Abschnitt 4.3 MV2-Moment, Abschnitt 8 Tool-Errors)
3. Existierende Pipeline:
   - `docs/agents/AGENT_INHALT.md` oder aequivalente Sub-Agenten-Spezifikation fuer Phase 0.2
   - `docs/architektur/UPGRADE_PLAN_v3-12_ESCAPE_GAME_QUALITAET.md` (R0.5 Medien-Testrun, R0.6 Titel-Validierung, R0.7 bpb)
   - `docs/architektur/vertraege/VERTRAG_PHASE_0-2.md` (sofern vorhanden)
4. Existierende Game-Artefakte:
   - `escape-games/deutscher-nationalismus-kolonialismus/assets/` (heruntergeladene Bilder)
   - `escape-games/deutscher-nationalismus-kolonialismus/data.json` (Bildpfad-Refs, Bildunterschriften)
5. Evidenz-Extrakte: `evidenz/medien_events.jsonl`, `evidenz/milestones.json` (`mv2_moment`, `halluzi`), `evidenz/tool_calls.jsonl` (WebFetch + wikimedia-image-search Calls)

---

## 3. Severitaets-Skala

- **P0:** Live-Medien-Fehler (Bild fehlt, falscher Inhalt, Lizenz-Verletzung in Live-Game).
- **P1:** Strukturelle Hallu-Luecke (keine Verifikation in der Pipeline); unzureichende Ersatz-Qualitaet.
- **P2:** Einzelner Lizenz-/Quellen-Angabe-Defekt.
- **P3:** Caption-Drift, Urheber-Format-Inkonsistenz.

---

## 4. Pflicht-Sektionen im Bericht `BERICHT_RA4_MEDIEN_LIZENZ.md`

1. Zusammenfassung + Gate-Urteil
2. Methodologie
3. Halluzinations-Audit: Verifikation der 6/18-Zahl, Scan auf weitere Hallus (Mappe 2 ebenfalls pruefen, Mappe 4 falls Artefakte existieren)
4. Ersatz-Qualitaets-Analyse (Marechal-Karikatur, ggf. weitere)
5. Bundesarchiv-/Commons-Lookup-Analyse (Suchstrategie-Qualitaet, systematische Titel-Drift)
6. Lizenz-Check-Praxis im Testrun (tatsaechlich durchgefuehrt vs. implizit unterstellt)
7. Bildunterschriften-Audit (Quellenangabe, Urheber, Lizenz-Hinweis)
8. UPGRADE_PLAN MV2 Bewertung (4 Komponenten: Recherche, Verifikation, Rueckkopplung, Retro-Patch) — ausreichend? Erweiterungen?
9. Schnittstelle zum bestehenden Plan-Impact (R0.5 Dual-Kanal, R0.6 Titel-Validierung, R0.7 Lizenz-Pre-Check) — Konvergenz?
10. Findings (F-RA4-NN)
11. Empfehlungen: Agent-Spezifikation fuer Medien-Sub-Agent, Q-Gate MV2, Vertrags-Erweiterung
12. Gate-Urteil
13. Anhang: Tabelle aller 18 Dateinamen mit Verifikations-Status + Ersatz-Entscheidung

---

## 5. Methodologie

- Pruefe ALLE Dateinamen (nicht nur die als missing bekannten), um Hallu-Quote oder Dunkelziffer zu ermitteln.
- Wenn WebFetch zugaenglich: stichprobenhaft API-Query gegen commons.wikimedia.org laufen lassen.
- Lizenz-Check auf 3 Ebenen: (a) existiert die Datei, (b) hat sie eine zitable Lizenz (CC BY-SA oder PD), (c) ist die Lizenz im Live-Game angezeigt.
- Finding-IDs: F-RA4-01 ff.

---

## 6. Deliverable

**Pfad:** `docs/projekt/testrun-nationalismus-kolonialismus/BERICHT_RA4_MEDIEN_LIZENZ.md`
**Umfang-Richtwert:** 400-800 Zeilen.
**Persistenz-Pflicht:** wie RA1.

---

## 7. Out-of-Scope

- Engine-Rendering der Bildpfade (RA3)
- Didaktische Wirkung der Bilder als Unterrichts-Material (RA2 — ueberlappt; RA4 konzentriert sich auf Existenz/Lizenz/Metadaten)
- Pipeline-Reihenfolge (RA1)
- PM-Meta (RA5)

---

## 8. Rollen-Isolation

Keine Medien-Downloads, keine data.json-Edits. Befund + Empfehlung.
