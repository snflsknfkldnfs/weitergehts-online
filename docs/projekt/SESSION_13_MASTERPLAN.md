# Session 13 Masterplan — Phase IV Wave 1 AU-2a Vorbereitung

**Erstellt:** 2026-04-05 (Session 13, Block 1)
**Zweck:** Kompaktions- und Kontextverlust-resiliente Persistierung von Zielen, Entscheidungen, Reihenfolge und Abbruchpunkten dieser Session. Bei beliebigem Kontextverlust muss Session 13 (oder Session 14) aus dieser Datei + STATUS.md + CHANGELOG.md nahtlos fortsetzbar sein.
**Status:** AKTIV

---

## 1. Ausgangslage (verifiziert)

- **Repo-State:** `main @ 5b470c5`, 1 Worktree, 1 Branch. Clean bis auf neue Doku (Rahmen, dieser Masterplan, folgende Session-13-Artefakte).
- **AU-1 CLOSED on origin/main:**
  - `5c718df` — PM-Strang (STR-02 Bloom-Tiefe + STR-11 Teil 1 Vertraege/Subagenten/Guetekriterien)
  - `5b470c5` — Code-Strang (Engine-Typen `vergleich` + `begruendung`, data.json Aufgaben 4-8/4-9, Smoke-Test gruen)
- **Framework etabliert:** `docs/projekt/GIT_WORKFLOW_RAHMEN.md` — gestuftes osascript-Modell (L/S/R/V), ersetzt ausschliessliche Copy-Paste-Pflicht, loest die Heredoc-/Lock-/Worktree-Leichen-Fehlerklasse.
- **Offenes UI-Finding (nicht blockierend, AU-1 Code-Strang):** `vergleich`-Input-Zellen in Notizbuch-Handschrift-Theme — Text horizontal abgeschnitten. Wird als BEFUND-AU-1-UI-01 in AU-2c adressiert.

## 2. User-Entscheidungen (gebunden, nicht mehr zur Disposition)

- **E1 = B:** STR-03 Feedback-Schema-Rollout via **hybrider Backfill** — Schema-Check-Patch in Engine + Auto-Generator-Dispatch-Dokument fuer die 24 bestehenden Aufgaben (analog BLOOM_KLASSIFIKATION_MAPPEN_1_4.md Pattern), kein Retroactive-Regenerate.
- **E2 = B:** STR-04 3-stufige Tipps muss **pro Aufgabentyp** didaktisch-qualitativ evaluiert und adaptiert werden. Ein einheitlicher Tipp-Stil ueber alle 10 Typen ist unzulaessig. Pro Typ: Tipp-Eskalations-Logik festlegen, bevor Sub-Agent-Prompt finalisiert wird.
- **E3 = Cowork entscheidet zum Systemziel:** **SPLIT AU-2 in AU-2a/AU-2b/AU-2c.**

## 3. E3-Entscheidung: AU-2-Split — Begruendung

**Entscheidung:** AU-2 wird gesplittet in drei ATOM-UNITs:

- **AU-2a** = STR-03 Feedback-Schema-Rollout (Schema-Pflichtfeld + Engine-Normalize + Backfill-Dispatch + 7 Subagenten-Patches + A25/A26).
- **AU-2b** = STR-04 3-stufige Tipps (pro Aufgabentyp eigene Tipp-Eskalations-Logik + Subagenten-Patches + Guetekriterium).
- **AU-2c** = BEFUND-AU-1-UI-01 (Vergleich-Input-Zellen-Hoehe in Notizbuch-Theme).

**Begruendung (Systemziel-orientiert):**
1. **ATOM-UNIT-Prinzip:** AU-2 in Original-Form waere ~3x groesser als AU-1. Fehlerradius bei Rollback waere inakzeptabel hoch. AU-1 hat gezeigt, dass ~800 LoC / 14 Dateien pro AU ein handhabbares Rollback-Fenster bietet.
2. **Strukturelle Abhaengigkeit:** STR-03 (Feedback-Schema) geht STR-04 (Tipps) strukturell voraus. Tipps sind im normalisierten Feedback-Schema als Feedback-Variante `ebene: "hinweis"` modellierbar. Ohne STR-03-Schema muesste STR-04 ein eigenes Sub-Schema bauen = Kopplungs-Risiko.
3. **Evaluations-Tiefe E2:** Die pro-Typ-Evaluation der Tipp-Eskalations-Logik ist inhaltlich substantiell (10 Typen x qualitative Didaktik-Pruefung). Diese Arbeit muss vor AU-2b-Dispatch passieren und wuerde AU-2 ohne Split um eine ganze Sub-Phase aufblaehen.
4. **UI-Befund-Entkopplung:** BEFUND-AU-1-UI-01 ist reines CSS (Code-Strang). Koppeln an Schema/Tipps wuerde den Code-Strang unnoetig versperren. AU-2c kann parallel oder sequentiell laufen.

**Reihenfolge fixiert:** AU-2a → AU-2b → AU-2c. AU-2c kann ggf. parallel zu AU-2b, aber nicht vor AU-2a (Code-Merge-Fenster).

## 4. AU-2a — Scope-Definition (diese Session)

**Ziel:** Einheitliches, validiertes Feedback-Schema als Pflichtfeld fuer alle neuen und bestehenden Aufgaben. Backfill der 24 Alt-Aufgaben via Auto-Generator-Dispatch ohne Regenerate.

**Scope-IN:**
- `docs/architektur/vertraege/VERTRAG_PHASE_2-2b_AUFGABE.md` — Feedback-Schema als Pflichtfeld, Querverweis A25/A26.
- `docs/architektur/vertraege/VERTRAG_FEEDBACK_SCHEMA.md` — Schema bereits vorhanden, pruefen + ggf. Backfill-Generator-Spec-Sektion ergaenzen.
- `docs/agents/SUB_AUFGABE_*.md` (7 Dateien) — Feedback-Schema-Block mandatory, Ausgabe-Format-Appendix.
- `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md` — A25 (Schema-Vollstaendigkeit), A26 (Didaktische Feedback-Validitaet).
- `docs/agents/dispatches/FEEDBACK_BACKFILL_MAPPEN_1_4.md` (NEU) — Auto-Generator-Dispatch fuer 24 Alt-Aufgaben, Pattern analog `BLOOM_KLASSIFIKATION_MAPPEN_1_4.md`.
- `docs/uebergabe/UEBERGABE_PHASE_IV_WAVE_1_AU_2a.md` — Cold-Handoff fuer Claude-Code: Engine `normalizeFeedback()`, data.json Backfill (Zuweisungstabelle aus Dispatch), cache-bust v=4.0 → v=4.1.
- Commit-Block fuer User (Rahmen §2 Default oder §3 Opt-in, je nach Groesse).

**Scope-OUT (in AU-2b / AU-2c verschoben):**
- STR-04 3-stufige Tipps (pro-Typ-Evaluation noch nicht begonnen).
- UI-Fix Vergleich-Zellen-Hoehe (Code-Strang, Claude-Code-Handoff AU-2c).
- Jegliche Engine-Aenderung ausserhalb `normalizeFeedback()` + Schema-Validator.

**Definition of Done (AU-2a):**
1. Vertrag 2-2b enthaelt Feedback-Pflichtfeld mit normativem Schema-Verweis.
2. Alle 7 Subagenten-Prompts fordern Feedback-Block in Standard-Ausgabe.
3. Guetekriterien A25 + A26 dokumentiert mit Pass/Fail-Indikatoren.
4. Dispatch-Dokument liefert fuer jede der 24 Alt-Aufgaben (Mappen 1-4) ein fertiges Feedback-Objekt im Schema-Format.
5. Uebergabe-Dokument beschreibt Engine-Aenderung, Backfill-Tabelle, Smoke-Test-Kriterien.
6. Commit clean, main FF-merge moeglich.

## 5. Session-13-Task-Reihenfolge (Ausfuehrungsplan)

1. **[DONE]** Cleanup (Rahmen + osascript)
2. **[IN_PROGRESS]** Masterplan persistieren (dieses Dokument)
3. STATUS.md → "Wave 1 AU-1 COMPLETE, AU-2a IN_PROGRESS", Session 13 Block 1
4. CHANGELOG.md → Session 13 Eintrag (AU-1 CLOSED inkl. Smoke-Test, Framework-Etablierung, Cleanup-Ops)
5. BEFUND-AU-1-UI-01 anlegen (fuer AU-2c)
6. VERTRAG_ATOM_UNITS.md → AU-2 Split
7. VERTRAG_FEEDBACK_SCHEMA.md lesen, Backfill-Generator-Spec-Sektion ergaenzen
8. VERTRAG_PHASE_2-2b_AUFGABE.md Feedback-Pflichtfeld + A25/A26 Verweis
9. GUETEKRITERIEN_AUFGABEN.md A25 + A26
10. 7x SUB_AUFGABE_*.md patchen (Feedback-Schema-Block)
11. FEEDBACK_BACKFILL_MAPPEN_1_4.md Dispatch (24 Aufgaben)
12. UEBERGABE_PHASE_IV_WAVE_1_AU_2a.md Cold-Handoff
13. Pre-Commit-Gate-3-Checks (RA1 Scope / RA3 Code-Kopplung / RA4 ATOM-UNIT)
14. Commit-Block fuer User (alle AU-2a-Artefakte + Rahmen + Masterplan + Session-13-Doku)

## 6. Abbruch- / Recovery-Punkte

| Nach Schritt | Recovery wenn abgebrochen |
|---|---|
| 2 (Masterplan) | Naechste Session liest diesen Plan, setzt bei Schritt 3 fort |
| 4 (CHANGELOG) | STATUS/CHANGELOG sind konsistent; AU-2a-Inhaltsarbeit beginnt frisch |
| 8 (Vertrag 2-2b) | Schema-Scaffolding steht; Backfill + Subagenten-Patches folgen |
| 11 (Dispatch) | Vertrags- und Subagenten-Ebene fertig; nur Claude-Code-Handoff offen |
| 12 (Uebergabe) | AU-2a komplett, nur Commit-Block steht aus |

**Bei Kontextverlust zu beliebigem Zeitpunkt:** Neue Session liest `STATUS.md` → `docs/projekt/SESSION_13_MASTERPLAN.md` → `CHANGELOG.md` und rekonstruiert die Position aus Schritt-Liste + Datei-Existenz-Check.

## 7. Risiken (bewusst akzeptiert)

- **R1 Doppel-Pflege:** Anleitung + Skill + Masterplan koennen drift. Mitigation: Rahmen §4 Audit-Spur + Feedback-Memory `skill_vs_anleitung_prioritaet` + Session-Ende-Check.
- **R2 Backfill-Klassifikations-Fehler:** Auto-Generator fuer 24 Alt-Aufgaben kann didaktisch daneben liegen. Mitigation: Dispatch liefert Vorschlaege, kein Auto-Merge; Aufgaben-Autor-Review per A26-Kriterium.
- **R3 Tipps-Kopplung:** AU-2b koennte Schema-Erweiterung erzwingen. Mitigation: AU-2a-Schema explizit `ebene`-Enum offen halten (`loesung | hinweis | validierung | fehler | erfolg`).
- **R4 UI-Befund-Verzoegerung:** AU-2c kann bis nach AU-2b rutschen. Mitigation: Nicht blockierend, kosmetisch; toleriert bis Mappe-3-Start.

## 8. Quellen / Bindungen

- **COWORK_PROJECT_ANLEITUNG.md** (authoritative, schlaegt Skill bei Drift)
- **UPGRADE_PLAN_v4_PRODUKTIONSARCHITEKTUR.md** Sektion 4 (Runden-Status)
- **WORKFLOW_v4.md** (Phasen/Agenten)
- **GRUNDSATZENTSCHEIDUNG_REBUILD_VS_ITERATE.md** (Option, Qualifizierungsfragen)
- **GIT_WORKFLOW_RAHMEN.md** (Ausfuehrungs-Mechanik)
- User-Messages Session 12 Fortsetzung 2 / Session 13 Start (E1=B, E2=B, E3=Cowork-Entscheid, "hauptsache nichts wichtiges geht verloren")
