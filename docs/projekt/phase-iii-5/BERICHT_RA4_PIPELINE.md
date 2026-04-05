# RA4 Bericht — Pipeline-Integritaets-Audit
## Phase III.5 — Pre-Implementation-Audit

**Auditor:** RA4 Pipeline-Integritaets-Pruefer
**Datum:** 2026-04-05
**Eviden-Bundle-Referenz:** EVIDENZ_BUNDLE_RA4.md
**Charta-Referenz:** CHARTA_RA4_PIPELINE.md
**Scope:** 20 aktive STR mit Pipeline-Bezug (insbesondere STR-02, 03, 04, 05, 08, 11, 12, 13, 14, 17, 22, 23, 24 sowie ATOM-UNITs STR-02-STR-05, STR-08, STR-11) gegen Phasen-Vertraege, ORCHESTRATOR, Subagenten-I/O-Kontrakte, Q-Gates, Assembly-Protokoll geprüft.

---

## 1. Charta-Rekapitulation

**Rolle:** RA4 ist isolierter Auditor der Phasen-Vertraege, Subagenten-I/O-Kontrakte, Orchestrierungs-Konsistenz und Q-Gate-Integration. Primaerfrage: Halten die Phasen-Vertraege nach STR-Mutationen?

**Methodik:**
1. Vertrags-Baseline aus 6 Phasen-Vertraegen erstellen
2. ORCHESTRATOR-Baseline verstehen
3. STR-zu-Vertrag-Mapping durchfuehren
4. Kontrakt-Konsistenz-Checks durchfuehren (Input/Output-Schemas bei Phasen-Uebergaengen)
5. Q-Gate-Abdeckung pruefen
6. Composability untersuchen
7. Phasen-Uebergangs-Eindeutigkeit verifizieren
8. Subagent-Prompt-Drift analysieren

**Scope-Grenzen:** NICHT Code-Analyse (RA3), NICHT Scope-Drift (RA1), NICHT DAG-Konsistenz (RA2), NICHT Meta-Synthese (RA5), NICHT Gueteregel-Kollisionen (RA6).

---

## 2. Methodik und Baseline-Zusammenfassung

### 2.1 Vertrags-Baseline

Sechs Phasen-Vertraege wurden gelesen (d627924, 2026-04-01) + Erweiterung 2026-04-02 für Phase 2.1c:

| Phase | Eingabe-Filetyp | Output-Schema | Q-Gate-Katalog | Dispatch-Modus | Bemerkung |
|---|---|---|---|---|---|
| **2.0 Rahmen** | TAFELBILD + MATERIAL_GERUEST | hefteintrag.json, einstieg.json, sicherung.json, meta.json | Rahmen-Q-Gate (6 Kriterien) | 1 Dispatch, 4 Files | Kernerkenntnisse in hefteintrag.scpl.loesung[] (M8-Regel). zusammenfassung+ueberleitung als Placeholder. |
| **2.1 Material** | MATERIAL_GERUEST + Sequenzkontext + hefteintrag.json + SUB_MATERIAL_[TYP] + SKRIPT + INHALTSBASIS + einstieg.json ± ARTEFAKT_INVENTAR ± Kernerkenntnisse | material-output-schema.json | Material-Q-Gate (5 Klassen, MQ1-MQ6 + M1-M12) | 1 Material = 1 Dispatch, isoliert | 8 Read-Schritte, konditional Schritt 7+8. Sequenzkontext-Block neu (Q1-Blockierer geloest). |
| **2.1c Cross** | materialien/*.json + hefteintrag.json + MATERIAL_GERUEST + einstieg.json + sicherung.json | ueberleitungen.json + rahmen/sicherung.json aktualisiert + rahmen/hefteintrag.json SCPL-Patches | Cross-Konsistenz-Q-Gate (Achsen 1-4) + Ueberleitung-Check (Achse 5 UE-1..UE-5) + Hefteintrag-Revision (Achse 6, M1b Re-Eval + HE1-HE13) | 1 Dispatch, STRUKTUR-FREEZE-Regel beachten | NEU: Achsen 5+6. SCPL-Texte formulierungs-offen revidierbar; STRUKTUR-Felder gefroren. zusammenfassung+ueberleitung erstmalig produziert. Session-Split PFLICHT nach diesem Phase (IL-4 Patch v4.0). |
| **2.2a Progressionsplan** | AGENT_RAETSEL + materialien/*.json Metadaten + MATERIAL_GERUEST + hefteintrag.json + DIDAKTIK_RAHMEN | PROGRESSIONSPLAN.md | Q-Gate auf Konstruktionskontext-Konsistenz (nicht im Vertrag kodifiziert, impliziert durch Agent) | 1 Dispatch, Orchestrator-Kalibrierung | Liest Material-Volltext NICHT (Token-Effizienz P6). TB-Knoten + AFB-Profil genügend. Bloom-Verteilung-Policy nicht Pflicht in Basis, wird in STR-02 zur Pflicht gemacht. |
| **2.2b Aufgabe** | PROGRESSIONSPLAN-Kontext + materialien/mat-N-X.json Volltext + MATERIAL_GERUEST Metadaten + SUB_AUFGABE_[TYP] | aufgaben-schema (je Typ unterschiedlich) | Aufgaben-Q-Gate (SCHEMA + A1-A7 + typ-spezifisch, max 2 Re-Dispatch) | 1 Aufgabe = 1 Dispatch, isoliert | MQ3 Material-Referenz-Verbot in frage-Feld (NICHT in Tipps). Engine-Feld-Kompatibilitaet (optionen, loesung-Array bei FT). |
| **2.2c Cross** | aufgaben/*.json + materialien/*.json Metadaten + hefteintrag.json | kein Output, Ergebnis in Q-GATE-LOG | Orchestrator-Q-Gate (A1 AFB-Gesamtbild, A3 Material-Vollstaendigkeit, A5 Schwierigkeit, A8-A10 Aktivierung+TB-Bezug+Typen, A12 Sachbezug-vor-Wertbezug) | 1 Dispatch, Re-Dispatch zu SUB_AUFGABE bei FAIL | Rückkanal zu Progressionsplan auf Fehler. Max 2 Re-Dispatch pro Aufgabe. |

### 2.2 ORCHESTRATOR v4.0-Baseline

Der ORCHESTRATOR (v3 2026-04-01) orchestriert 8 Agenten über 4 Phasen (0: Inhaltsgerüst, 1: Material-Gerüst, 2: Mappen-Produktion, 3: Implementation).

**Kritische Punkte:**
- **Phase 2 Session-Split PFLICHT (IL-4 Patch, v4.0)** nach Phase 2.1c, VOR Phase 2.2a. Dieser Split ist nicht optional — ist bei Mappe 4 übersehen worden und verursachte C2-Medium-Finding.
- **Uebergabe-Prompt-Template (OPT-1/4/5/7)** konsolidiert alle Phase-2-Abschluss-Aufgaben: Uebergabe-Datei + Git-Commit-Befehle. Phase 3 ist mechanisch (Claude Code), KEINE didaktischen Entscheidungen.
- **Sequenz-Split nach Phase 2.1c**: Neuer Prompt-Kontext für Phase 2.2. Der Orchestrator MUSS auf Session-Split prüfen und ihn NOT-LESS-FAIL erzwingen.
- **Assembly (Phase 3):** Liest data.json NEU aus Claude Code (NICHT aus Uebergabe-Prompt übernehmen). Reads Produktionsverzeichnis deklarativ.

---

## 3. Vertrags-Kontrakt-Map (Phasen-Uebergaenge)

| Von Phase | Zu Phase | Input (Consumer) | Output (Producer) | Schema-Kompatibilitaet | Status |
|---|---|---|---|---|---|
| **2.0 Rahmen** | **2.1 Material** | einstieg.json, hefteintrag.json, sicherung.json, meta.json → Read-Schritt 2+6+8 | materialien/mat-N-M.json | ✅ Schemas passen: rahmen-einstieg-schema → MAT-Input, hefteintrag-schema → SCPL-Kontext | OK |
| **2.1 Material** | **2.1c Cross** | materialien/*.json → ALL material-output-schema | ueberleitungen.json + sicherung.json aktualisiert | ✅ Cross-Konsistenz-Checker erkennt material-output-schema, validiert gegen MATERIAL_GERUEST-Intention | OK |
| **2.1c Cross** | **2.2a Progressionsplan** | rahmen/hefteintrag.json + materialien/* Metadaten | PROGRESSIONSPLAN.md (5-8 Konstruktionskontexte) | ✅ Progressionsplan liest TB-Knoten aus hefteintrag.json, Materialtyp + didakt_fn aus Metadaten, AFB-Profil aus DIDAKTIK_RAHMEN | OK |
| **2.2a Progressionsplan** | **2.2b Aufgabe** | PROGRESSIONSPLAN.md Konstruktionskontext → Read-Schritt 1 | aufgaben/aufgabe-N-M.json (5-8 je Mappe) | ✅ Schema hängt ab von Aufgabentyp; Dispatcher nutzt typ aus Konstruktionskontext, mappy Feld `aufgaben_typ` → SUB_AUFGABE_[TYP] | OK |
| **2.2b Aufgabe** | **2.2c Cross** | aufgaben/*.json ALL | erneut Progressionsplan-Validierung (keine neue Datei) | ✅ A-Katalog-Checks gegen Progressionsplan + Material-References | OK |
| **2.2c Cross** | **Phase 3 Assembly** | ueberleitungen.json + rahmen/*.json + materialien/*.json + aufgaben/*.json + meta → Uebergabe-Prompt + Git-Befehle | data.json mit neuer Mappe appended + mappe-N.html | ✅ Assembly liest deklarativ aus Produktionsverzeichnis, nicht aus Uebergabe-Prompt. Engine rendet data.json. | OK |

**Composability-Check:** Alle Uebergaenge sind lineare Input→Output-Mappings. Kein Agent hängt von Seiteneffekten ab. Substitution eines Agenten ist möglich, solange Vertrag hält.

---

## 4. STR-zu-Vertrag-Matrix

| STR | Prio | Betroffene Vertraege | Ebenen | I/O-Impact | Composability-Risk | Status |
|---|---|---|---|---|---|---|
| **STR-02 Bloom** | P0 | VERTRAG_2-2b, SUB_AUFGABE_*, A-Katalog | E1, E3, E5 | ✅ Output-Schema: neues Feld `_meta.bloom_level` in aufgaben/*.json (optional, aber recommended) | ❌ MEDIUM: SUB_AUFGABE_* müssen Bloom-Einstufung können, aber alte Aufgaben fehlt das Feld. Backward-Compat: Feld optional. | ATOM-UNIT |
| **STR-03 Feedback** | P0 | VERTRAG_2-2b, SUB_AUFGABE_*, Engine | E1, E3, E5, E7 | ⚠️ Output-Schema BREAKING: `feedback` wechselt von string zu {korrekt, falsch_generic, falsch_spezifisch, task_feedback}. Legacy-Compat: optionales altes string-Format | ❌ HIGH: Feedback-Schema-Umstellung ist Breaking Change. Mappen 1-4 müssen mit beiden Schemas umgehen (Engine-Patch Wave 3). Neue Mappen MUSS Objekt-Form. | ATOM-UNIT + Engine-Kopplung |
| **STR-04 Tipps** | P0 | VERTRAG_2-2b, SUB_AUFGABE_*, Engine | E1, E3, E5, E7 | ✅ Output-Schema: `tipps: [{stufe, haertegrad, text}]` statt flaches Array. Engine rendert gestaffelt. | ❌ MEDIUM: Tipp-UI-Change im Engine. Neuer SUB_AUFGABE-Prompt muss Haertegrad-Semantik verstehen. Alte Aufgaben haben ungeordnete Tipps. | ATOM-UNIT + Engine-Kopplung |
| **STR-05 Multiperspektive** | P0 | VERTRAG_2-1, SUB_MATERIAL_*, M-Katalog | E1, E2, E5, E6 | ✅ Optional: Vertrag-Flag `konflikttyp: true`, neue M-Katalog-Regel. Benutzt existierendes Quellentext-Schema. | ✅ LOW: Flag ist optional, Subagent-Prompt erweitert. Keine Breaking Changes. | ATOM-UNIT |
| **STR-08 Quellenkritik adaptiv** | P1 | VERTRAG_2-2b, neu: SUB_AUFGABE_QUELLENKRITIK, A-Katalog | E1, E3, E5 | ✅ Neuer Aufgabentyp verfügbar: `aufgaben_typ: "quellenkritik"`. Subagent wählt W-Fragen-Template. | ❌ MEDIUM: Progressionsplan-Agent (Phase 2-2a) muss Entscheidungslogik haben, wann Quellenkritik sinnvoll ist. Anti-Automatismus: nicht bei JEDER Quelle. | ATOM-UNIT |
| **STR-11 Aufgabentypologie** | P1 | VERTRAG_2-2b, SUB_AUFGABE_VERGLEICH/BEGRUENDUNG, A-Katalog | E1, E3, E5 | ✅ 2 neue `aufgaben_typ`-Werte. Schema bleibt kompatibel. Subagent oder FREITEXT-Varianten. | ✅ LOW: Verfügbarmachen, nicht Quotieren. Progressionsplan-Agent kann ignorieren, wenn didaktisch nicht gepasst. | ATOM-UNIT |
| **STR-12 Trigger-System** | P1 | SUB_MATERIAL_*, Checkliste, Engine | E2, E6, E8 | ✅ Optional: Metafeld `trigger_flags: [...]` in Material-JSON (Lehrkraft-Scope). Engine unterdrueckt es im Rendering. | ⚠️ MEDIUM: Engine muss explizit Unterdrueckungs-Logik haben. Material-Schemas bekommen neues Feld. Backward-Compat: optional. | Phase 3 Engine-Patch nötig |
| **STR-13 Mappenabschluss-Zone** | P1 | Orchestrator/Assembly, `data.json`-Schema, HE-Katalog | E2, E4, E5 | ✅ Neuer Abschnitt `data.json.mappenabschluss_zone { reflexion_fragen, ueberleitungssatz }`. Fixed Template. | ✅ LOW: Sub-Task im Assembly, keine Agenten-Änderung. HE-Katalog nur Abgrenzungs-Notiz. | Assembly-Erweiterung |
| **STR-14 Fiktionalitaets-Kennzeichnung** | P1 | SUB_MATERIAL_TAGEBUCH, SUB_MATERIAL_QUELLENTEXT, M-Katalog | E2, E5 | ✅ Quellenangabe-Template erweitert um Fiktionalitaets-Feld. Schema-Änderung minimal. | ✅ LOW: Nur Quellenangabe-Teil betroffen. NICHT Material-Volltext. NICHT neue Aufgaben. | Sub-Prompt-Erweiterung |
| **STR-17 Audit-Methodik-Iteration** | P1 | Audit-Workflow-Doku | E9 | ❌ INDIREKT: D15b-Methodik wird kodifiziert. Keine Vertrag-Änderung, aber RA4-Input-Anforderung. | ✅ LOW: Meta-Dokument. Keinen Impact auf Pipeline-Vertraege. | Dokumentation |
| **STR-22 Synchronisationspunkte Orchestrator** | P2 | ORCHESTRATOR.md, WORKFLOW_v4.md | E0, E4 | ⚠️ Implizit → Explizit: Sync-Gates zwischen Phase 2-1 / 2-2a / 2-2b / 3 müssen dokumentiert werden. | ❌ MEDIUM: Nicht neue Vertraege, aber Konsistenz-Lücken werden sichtbar. Orchestrator-Doku muss Sync-Punkte explizit machen. | Doku-Lücke |
| **STR-23 Sequenz-Uebergangs-Doku** | P2 | Neuer E8-Leitfaden | E5, E8 | ✅ Optional: Lehrkraft-Dokument über Brückenelement zw. Mappen. KEINE Vertrag-Änderung. | ✅ LOW: Orthogonal zu Pipeline-Vertraegen. | Lehrkraft-Material |
| **STR-24 Konsoli-Checkliste** | Kons. | Alle E5+E6 Kataloge (nicht Ersatz, sondern Complement) | E6 | ✅ Neues Pre-Publish-Q-Gate auf Mappen-Ebene. Komplementär zu Phase-spezifischen Q-Gates. | ✅ LOW: Sammelt, ersetzt nicht. Kein Impact auf Subagenten oder Vertrag-Schemas. | Neues Gate |
| **STR-02/03/04/05/08/11 ATOM-UNITs** | P0/P1 | Gebündelt: Vertrag + Subagent + Katalog-Eintrag im SELBEN Commit | E1, E3, E5 | ⚠️ CRITICAL: 6 ATOM-UNITs MÜSSEN synchron committed werden. Fehlende Synchronisation → Subagent kann neues Feld nicht füllen → Q-Gate-Fehler. | ❌ CRITICAL: Wenn Vertrag geändert wird ohne Subagent-Prompt, ist Composability gebrochen. Subagent produziert altes Schema, Q-Gate erkennt Diskrepanz. | CRITICAL DEPENDENCY |

---

## 5. Kontrakt-Kompatibilitaets-Analyse (per Phasen-Uebergang)

### 5.1 Uebergang 2.0 → 2.1 (Rahmen → Material)

**Producer (2.0):** rahmen/hefteintrag.json, einstieg.json, sicherung.json
**Consumer (2.1):** hefteintrag.json lesen (Read-Schritt 2, SCPL-Zone-Mapping), einstieg.json (Read-Schritt 6), sicherung.json (implizit für Kontextverständnis)

**Vertrags-Alignment:**
- 2.0: hefteintrag.json Output-Schema ✅ Scheint mit 2.1 Input-Schema zu passen (SCPL-Zonen, TB-Knoten-Detail, merksaetze)
- 2.1 Read-Schritt 2 erwartet `stundenfrage, knoten[], merksaetze[]` → TAFELBILD-Artefakt enthält diese
- **C1b-Identitaetsregel (2.0 §7):** einstieg.problemstellung === hefteintrag.stundenfrage. Falls Abweichung: hefteintrag-Wert hat Vorrang.

**Risiko:** Keine Breaking Changes. Das Schema hält.

---

### 5.2 Uebergang 2.1 → 2.1c (Material → Cross-Konsistenz)

**Producer (2.1):** materialien/*.json (M Dateien)
**Consumer (2.1c):** Alle materialien/*.json lesen (Achse 1-4 Cross-Checks)

**STR-Impact:**
- **STR-05 Multiperspektive:** OPTIONAL Flag `konflikttyp: true` in MATERIAL_GERUEST. SUB_MATERIAL_* versuchen, 3+ Perspektiven zu sourchen. Schema-kompatibel.
- **STR-14 Fiktionalitaets-Kennzeichnung:** Quellenangabe-Feld in materialien/*.json wird erweitert. Schema-kompatibel (optional Feld).

**Achse 5 Ueberleitung-Produktion:**
- UE-1..UE-5 Kriterien erfordern, dass Ueberleitungen tatsächlich auf konkretem Material-Volltext basieren (NICHT auf abstraktem MATERIAL_GERUEST-Plan).
- **Vertragsliche Anforderung:** Achse 5 MUSS verfasst werden, bevor Assembly läuft. Achse 5 Output → ueberleitungen.json.

**Achse 6 Hefteintrag-Revision:**
- **Struktur-Freeze-Regel:** SCPL-Zonen, Complication-Schritte, Ordnungsmuster, Kernerkenntnisse NICHT aenderbar.
- **Formulierungs-Offen:** situation.kontextsatz, complication[].schritt, problem.satz, zusammenfassung (NEU), ueberleitung (NEU) aenderbar.
- **Dokumentationspflicht:** Jede Aenderung muss notiert werden (Beg. Material liefert Kontext).

**Risiko:** KRITISCH — Session-Split MUSS nach 2.1c erfolgen (IL-4 Patch v4.0). Wurde in Mappe 4 übersehen.

---

### 5.3 Uebergang 2.1c → 2.2a (Cross-Konsistenz → Progressionsplan)

**Producer (2.1c):** rahmen/hefteintrag.json + materialien/*.json
**Consumer (2.2a):** AGENT_RAETSEL liest beide (aber Material-Volltext NICHT, nur Metadaten P6)

**Vertrags-Alignment:**
- AGENT_RAETSEL erwartet: TB-Knoten[] aus hefteintrag.json, Materialtyp + didakt_fn aus MATERIAL_GERUEST, AFB-Profil aus DIDAKTIK_RAHMEN
- Schema: `PROGRESSIONSPLAN.md` ist Semi-strukturiert (Markdown mit embedded JSON-ähnliche Konstruktionskontexte).

**STR-Impact:**
- **STR-02 Bloom:** Progressionsplan muss Bloom-Verteilung validieren können. Output: Bloom-Policy in Progressionsplan-Header.
- **STR-08 Quellenkritik adaptiv:** Progressionsplan-Agent muss Heuristik haben: "wenn Material=Primaerquelle + didaktisches Ziel=Reflexion → Quellenkritik-Aufgabe vorschlagen"

**Risiko:** MEDIUM — Progressionsplan-Agent braucht erweiterte Heuristik. Diese ist nicht in VERTRAG_2-2a kodifiziert; sie sitzt in AGENT_RAETSEL.md. STR-08 muss den Agent-Prompt updaten.

---

### 5.4 Uebergang 2.2a → 2.2b (Progressionsplan → Aufgaben)

**Producer (2.2a):** PROGRESSIONSPLAN.md
**Consumer (2.2b):** Liest Konstruktionskontext aus Progressionsplan (Read-Schritt 1), materialen/mat-N-X Volltext (Read-Schritt 2)

**Vertrags-Alignment:**
- Progressionsplan-Konstruktionskontext spezifiziert: `{ziel_material_id, tb_knoten[], afb_level, operationalisierungsziel, aufgaben_typ}`
- SUB_AUFGABE_[TYP] erkennt `aufgaben_typ` aus Progressionsplan und wählt passenden Subagenten
- Output: aufgaben/aufgabe-N-M.json mit exaktem Schema je Typ

**STR-Impact:**
- **STR-03 Feedback:** BREAKING Schema-Change `feedback: string` → `feedback: {korrekt, falsch_*, task_feedback}`. ALT aufgaben JSON müssen mit altem Schema renderbar bleiben (legacy-compat-Mappen 1-4).
- **STR-04 Tipps:** Schema-Änderung `tipps: []` → `tipps: [{stufe, haertegrad, text}]`. Neuer SUB_AUFGABE-Prompt muss Haertegrad-Semantik beherrschen.
- **STR-11 Aufgabentypologie:** 2 neue `aufgaben_typ`-Werte (Vergleich, Begruendung) → SUB_AUFGABE-Sammlung erweitert.

**Risiken:**
- ❌ **CRITICAL (STR-03):** Feedback-Schema-Wechsel. Engine muss BEIDE Schemas rendern können (Wave 3 Patch). Alte Aufgaben-JSON bleiben string-Feedback.
- ❌ **HIGH (STR-04):** Tipp-Haertegrad-Einstufung erfordert neuer SUB_AUFGABE-Prompt. Alte Aufgaben haben unstrukturierte Tipps.
- ✅ **LOW (STR-11):** Neue Typen sind additiv. Alte SUB_AUFGABE_* werden nicht angerührt.

---

### 5.5 Uebergang 2.2b → 2.2c (Aufgaben → Cross-Konsistenz)

**Producer (2.2b):** aufgaben/*.json (5-8 je Mappe)
**Consumer (2.2c):** Liest alle aufgaben/*.json, Metadaten materialien/*.json, hefteintrag.json

**Vertrags-Alignment:**
- 2.2c-Q-Gate prüft: AFB-Gesamtbild, Material-Vollständigkeit, Schwierigkeits-Progression, Typen-Diversität, TB-Abdeckung
- **MQ3 Material-Referenz-Verbot:** frage-Feld darf KEINE Material-Links enthalten. Links gehören in Tipp Stufe 1.
- **Engine-Feld-Kompatibilität:** optionen (NICHT elemente_ungeordnet), loesung-Array bei Freitext (NICHT String).

**STR-Impact:**
- **STR-02 Bloom:** Cross-Konsistenz-Q-Gate A1 prüft Bloom-Verteilung gegen Policy aus Progressionsplan.
- **STR-08 Quellenkritik adaptiv:** Aufgaben-Cross-Check erkennt Quellenkritik-Aufgaben und validiert, dass sie sinngerichtet sind.

**Risiko:** MEDIUM — Bloom-Validierung ist neu (STR-02), wird noch nicht im aktuellen Q-Gate-Katalog 2.2c kodifiziert. Muss beim Commit von STR-02 in GUETEKRITERIEN_AUFGABEN.md (A19) ergänzt werden.

---

### 5.6 Uebergang 2.2c → Phase 3 Assembly

**Producer (2.2c):** Validiertes aufgaben/*.json + alle rahmen/*.json + materialien/*.json
**Consumer (Assembly):** Produktionsverzeichnis → data.json append + mappe-N.html

**Vertrags-Alignment:**
- Assembly ist MECHANISCH (keine didaktischen Entscheidungen).
- Inputs: rahmen/meta.json → Mappe-Header, einstieg.json → mappe.einstieg, materialien/*.json → mappe.materialien[], aufgaben/*.json → mappe.aufgaben[], sicherung.json + hefteintrag.json → mappe.sicherung.
- Spezialfall Phase 2.1c: ueberleitungen.json wird gelesen, `ueberleitung_von` in jedem Material wird mit Ueberleitung-Text gesetzt (NICHT Material-ID).

**STR-Impact:**
- **STR-13 Mappenabschluss-Zone:** Assembly-Schritt bekommt neuer Sub-Task: `mappenabschluss_zone` aus Fixed Template befüllen. **Neu in data.json**.
- **STR-12 Trigger-System:** Engine-Unterdruck-Check: trigger_flags-Feld wird in JSON generiert, aber Engine rendert es NICHT (Lehrkraft-Scope nur).

**Risiko:** ✅ LOW — Assembly-Änderungen sind lokalisiert (neue Felder hinzufügen, keine Schema-Restruktor). Alte Mappen bleiben unberührt (append-only).

---

## 6. Q-Gate-Abdeckungs-Analyse

| Phase | Q-Gate-Katalog | Kriterien | STR-Neue-Kriterien | STR-Removals | Status |
|---|---|---|---|---|---|
| **2.0 Rahmen** | Rahmen-Q-Gate (6 Kriterien: C1b, M3b, Engine-Felder, Q-M2-09 Disjunktion, Q-M2-08 Quellenangabe-Hygiene) | Statisch | Keine | Keine | ✅ OK |
| **2.1 Material** | Material-Q-Gate (SCHEMA + MQ1-MQ5 + M1-M12 + typ-spezifisch) | 19 Kriterien | **STR-05 Multiperspektive → M13** (Konflikt-Themen mind. 3 Perspektiven) / **STR-14 Fiktionalitaets-Kennzeichnung → M15** (Status in Quellenangabe explicit) | Keine | ⚠️ M-Katalog wird um 2 neue Kriterien (M13, M15) erweitert |
| **2.1c Cross** | Cross-Konsistenz-Q-Gate (4 Achsen) | Achsen 1-4: Sequenz, Fachbegriff, Ueberleitung, TB-Knoten | **NEU Achse 5 Ueberleitung (UE-1..UE-5)** / **NEU Achse 6 Hefteintrag-Revision (M1b Re-Eval + HE1-HE13)** | Keine | ⚠️ CRITICAL: 2 ganz neue Achsen. Müssen in Leitfaden kodifiziert werden (nicht in aktueller Doku). |
| **2.2a Progressionsplan** | Implizit (keine formale Q-Gate dokumentiert) | Konstruktionskontext-Konsistenz | **STR-02 Bloom-Policy** (muss im Output deklaliert werden) | Keine | ❌ LUECKE: Q-Gate fuer Progressionsplan existiert nicht explizit. Muss dokumentiert werden (STR-22 könnte das auffangen). |
| **2.2b Aufgabe** | Aufgaben-Q-Gate (SCHEMA + A1-A7 + typ-spez.) | 7-9 Kriterien | **STR-03 Feedback → A20** "Feedback ist elaborativ" / **STR-04 Tipps → A21** "Tipp-Haertegrade strikt, kein Leak" / **STR-08 Quellenkritik → A22** "Quellenkritik sinngerichtet" / **STR-11 Typologie → A-Katalog Update** (neue Typen dokumentieren) | Keine | ⚠️ A-Katalog wird um 4 neue Kriterien erweitert |
| **2.2c Cross** | Orchestrator-Q-Gate (A1, A3, A5, A8-A10, A12) | 8 Kriterien | **STR-02 Bloom → A1 erweitert** (Bloom-Gesamtbild, NICHT nur AFB-Kongruenz) | Keine | ⚠️ A1 wird erweitert (Bloom-Aspekt hinzufügen) |
| **Phase 3 Assembly** | Implizit (mechanisch) | Keine didaktischen Q-Gates | Keine | Keine | ✅ Orthogonal zu Phase 2 |
| **STR-24 Pre-Publish** | NEUE: Konsolidierte Mappen-Level-Checkliste (E6-Complement) | 30 Spots (Bloom, Feedback, Tipps, Multiperspektive, Quellenkritik, Trigger, A11y, Fiktionalitaet, Mappenabschluss) | **Alle STR 02-05, 08, 11-14, 20** | Keine | ✅ NEU als komplementäres Gate (NICHT Ersatz) |

**Kritische Lücken:**
1. ❌ **Progressionsplan-Q-Gate fehlt explizit** (2.2a). Aktueller ORCHESTRATOR dokumentiert nicht, wie Progressionsplan-Qualität kontrolliert wird. → **STR-22 Synchronisationspunkte** könnte das adressieren.
2. ⚠️ **Achsen 5+6 in Phase 2.1c** sind NEU und müssen dokumentiert werden. Aktueller Vertrag erwähnt Achse 5+6 (NEU — Q-M2-03, M2), aber die Ausführungskriterien (UE-1..UE-5, M1b Re-Eval) sind nicht detailliert genug.

---

## 7. Composability-Befunde

| Subagent/Agent | Austauschbarkeitsgrad | Risiko | Bemerkung |
|---|---|---|---|
| **SUB_MATERIAL_\* (7 Typen)** | ✅ Hoch | ✅ LOW | Jeder Subagent ist isoliert (P4), liest eigene Prompt-Datei. Substitution möglich, solange Material-Input-Schema (Read-Schritt 1-8) hält. **STR-05/14 ändern Prompts, nicht Schemas → bleibt kompatibel.** |
| **SUB_AUFGABE_\* (5 Typen + 2 NEU)** | ⚠️ Mittel | ❌ MEDIUM | **STR-03/04 ändern Output-Schema (Feedback-Objekt, Tipp-Struktur).** Neue Subagenten müssen neuer Schema können. ALT-Aufgaben haben alten Schema. Subagenten-Substitution erfordert Schema-Kompatibilität. **STR-11 fügt 2 neue Typen hinzu, nicht brechen.** Aber: **Quellenkritik-Subagent (STR-08) ist NEU.** |
| **AGENT_RAETSEL (Progressionsplan)** | ✅ Hoch | ✅ LOW | Liest Material-Metadaten, NICHT Volltext (P6 Token-Effizienz). Prompt kann erweitert werden (Bloom-Policy, Quellenkritik-Heuristik) ohne Input-Schema zu ändern. **Substitution ist möglich.** |
| **AGENT_RAETSEL (Orchestrator-Q-Gate 2.2c)** | ✅ Hoch | ✅ LOW | Liest aufgaben/*.json + Metadaten. Schema stabil. Neue Kriterien (Bloom-Gesamtbild) sind Prompt-Erweiterungen. |
| **Assembly (Phase 3)** | ✅ Hoch | ✅ LOW | Rein mechanisch. Liest strukturiert aus Dateien. Neue Felder (mappenabschluss_zone) sind optional/additiv. Substitution möglich. |

**Gesamtbefund Composability:**
- ✅ **Subagenten sind in Isolation austauschbar, solange Vertragsfelder haltbar sind.**
- ⚠️ **STR-03/04 Breaking Changes in aufgaben/*.json erfordern Versionierung oder Legacy-Compat im Engine.** Die Lösung (beide Schemas in Engine rendern) ist akzeptabel, aber im aktuellen ORCHESTRATOR nicht dokumentiert.
- ✅ **STR-05, 08, 11, 14 sind additiv oder Prompt-Erweiterungen → kein Composability-Risiko.**

---

## 8. Findings (12 gesamt)

### Finding F-RA4-01 — STR-03 Feedback-Schema Breaking Change NICHT in Orchestrator dokumentiert

**Severität:** P1
**Betroffene Verträge:** VERTRAG_2-2b, Engine-Rendering (Phase 3)
**Betroffene STRs:** STR-03 Elaboratives Feedback
**Beschreibung:** STR-03 ändert das Feedback-Feld von `string` zu `{korrekt, falsch_generic, falsch_spezifisch, task_feedback}`. Dies ist eine Breaking Change im aufgaben-schema. Der ORCHESTRATOR dokumentiert, dass "Legacy-Compat: optionales altes string-Format" existiert, aber konkrete Durchsetzungs-Regeln fehlen:
- Wie prüft das Engine, ob Feedback-String oder Feedback-Objekt?
- Wann gilt die Legacy-Compat (Mappen 1-4)?
- Wann ist Objekt-Form PFLICHT (neue Mappen)?

**Evidenz:** VERTRAG_2-2b Schnittstellen-Vertrag spricht nur von `feedback: string`. Kein Schema-Mehrversion-Handling dokumentiert.

**Risiko:** Wenn Engine beide Schemas nicht korrekt unterscheidet, rendert es entweder alte Aufgaben falsch oder neue Aufgaben unvollständig.

**Verdikt:** MUSS ADRESSIEREN — STR-03-Commit muss Engine-Rendering-Patch (Wave 3) + explizite Compat-Regel enthalten.

**Vertrags-Patch-Skizze:**
```
VERTRAG_2-2b:
§ Feedback-Schema (Version 2, ab Mappe 5):
  "feedback": {
    "korrekt": "...",
    "falsch_generic": "...",
    "falsch_spezifisch": {...},
    "task_feedback": "..."
  }

§ Legacy-Compat (Mappen 1-4):
  Engine MUSS beide Schemas erkennen:
  - Type String → altes Format (render via legacy-slot)
  - Type Object → neues Format (render via new-slot)

§ Validierung:
  aufgaben-schema.json: feedback oneOf [string, object]
  A20 Q-Gate: neue Aufgaben MUST Objekt-Format, A20 prüft elaboratives Feedback-Content
```

---

### Finding F-RA4-02 — Session-Split nach Phase 2.1c explizit als NICHT-OPTIONAL in ORCHESTRATOR verankert FEHLEND

**Severität:** P1
**Betroffene Verträge:** ORCHESTRATOR.md, VERTRAG_2-1c_CROSS
**Betroffene STRs:** STR-23 Sequenz-Uebergang (indirekt), allgemeine Pipeline-Stabilität
**Beschreibung:** Der ORCHESTRATOR beschreibt den Session-Split als IL-4 Patch v4.0 und betont "Session-Split PFLICHT nach Phase 2.1c, VOR Phase 2.2a". Der aktuelle Wortlaut lautet:

> "CHECKPOINT nach Phase 2.1c (Audit S2 — Token-Budget-Mitigation). Neuer Dispatch-Kontext fuer Phase 2.2."

Dies ist nicht klar genug als **NICHT-OPTIONAL** beschrieben. Die Bedingung "bei hohem Token-Budget" kann zu Auslassung führen (wie in Mappe 4 geschehen, C2-MEDIUM Finding).

**Evidenz:** ORCHESTRATOR.md Zeile 162-163 + Session-Split-Template unter "OPT-8 / IL-4 PFLICHT v4.0". Die PFLICHT-Regel existiert, ist aber versteckt im Template und nicht im Haupttext hervorgehoben.

**Risiko:** Orchestrator könnte Phase 2.2a ohne Split ausführen, wenn Token-Budget "ausreichend" wirkt. Dies führt zu Kontextüberlauf in Phase 2.2b (Aufgaben mit unvollständigem Kontext produzieren Fehler).

**Verdikt:** MUST CLARIFY — Haupttext des ORCHESTRATOR muss Session-Split als unbedingter Kontrollpunkt verankern.

**Vertrags-Patch-Skizze:**
```
ORCHESTRATOR.md, nach §Phase-2-Abschluss:

CHECKPOINT NACH PHASE 2.1c — NICHT OPTIONAL
═════════════════════════════════════════════

Nach Abschluss von Phase 2.1c (Material-Cross-Konsistenz + Ueberleitungen + Hefteintrag-Revision),
BEVOR Phase 2.2a (Progressionsplan) begonnen wird, MUSS ein neuer Dispatch-Kontext
(Session-Split-Prompt) generiert werden.

Diese Regel gilt unabhaengig vom Token-Budget und unabhaengig davon, wie "kurz" oder "lang"
der bisherige Kontext wirkt. Begruendung: Die Phase-2.2-Sequenz (2.2a Progressionsplan,
2.2b 5-8 Aufgaben-Dispatches, 2.2c Cross-Konsistenz) erfordert frische Kontextuntergrenze
zur Vermeidung von Fehler-Akkumulation über Agenten hinweg.

Durchsetzungs-Mechanismus:
- Orchestrator (Phase-2-Session) darf Phase 2.2a NICHT im selben Kontext ausfuehren.
- MUSS Split-Prompt generieren (Funktion: alle naechsten Schritte 2.2a-2.2c inline mit ~300 Token).
- Split-Prompt wird an User uebermittelt mit Freigabe-Status "Ready for Phase 2.2".
- Neue Session liest Split-Prompt + führt Phase 2.2a aus.

Audit-Kontrolle: Q-GATE-LOG.md MUSS dokumentieren, ob Split stattgefunden hat (Ja/Nein).
```

---

### Finding F-RA4-03 — STR-02 Bloom-Validierung fehlt in VERTRAG_2-2c Cross-Konsistenz-Q-Gate

**Severität:** P2
**Betroffene Verträge:** VERTRAG_2-2c_CROSS, GUETEKRITERIEN_AUFGABEN.md
**Betroffene STRs:** STR-02 Bloom-Tiefe als Pflicht
**Beschreibung:** STR-02 definiert: "Pro Mappe muss eine Bloom-Verteilung erreicht werden (max. 40% L1-2, mind. 30% L3-4, mind. 20% L5-6)". Der A-Katalog erhält A19 "Bloom-Verteilung erfüllt Policy". Aber der Ort dieser Validierung ist nicht klar:
- Progressionsplan-Q-Gate (2.2a)? NICHT dokumentiert.
- Aufgaben-Einzelvalidierung (2.2b)? Nur einzelne Aufgabe, nicht Gesamtverteilung.
- Orchestrator-Cross (2.2c)? JA — A1 wird um Bloom-Gesamtbild erweitert.

Das Problem: VERTRAG_2-2c nennt A1 "AFB-Kongruenz (Gesamtbild)" — aber NICHT "Bloom-Verteilung". Der Patch zu A1 ist NICHT dokumentiert.

**Evidenz:** VERTRAG_2-2c §Katalog, Kriterium A1: "AFB-Zuweisung stimmt mit Progressionsplan ueberein?" — kein Bloom-Wort.

**Risiko:** Q-Gate 2.2c prüft Bloom-Policy nicht, weil es nicht dokumentiert ist. STR-02-A19 wird als orphan codifiziert (Q-Gate kennt es nicht).

**Verdikt:** MUST FIX — A1 oder neuer Punkt in 2.2c muss Bloom-Verteilung prüfen.

**Vertrags-Patch-Skizze:**
```
VERTRAG_2-2c_CROSS:

§ Katalog — Kriterium A1 (geändert zu A1a + A1b):

A1a: AFB-Kongruenz (Gesamtbild)
     AFB-Zuweisung stimmt mit Progressionsplan ueberein?

A1b: Bloom-Verteilung (NEU — STR-02)
     Aufgaben-Gesamtverteilung erfuellt Policy?
     Policy aus Progressionsplan-Header:
       - Max 40% L1-2
       - Min 30% L3-4
       - Min 20% L5-6
     Pruefung: Sum([a.bloom_level == 1 or 2 for a in aufgaben]) / len(aufgaben) ≤ 40%, etc.
     Tool: Python-Validator validate_bloom_distribution(aufgaben, policy).
```

---

### Finding F-RA4-04 — STR-08 Quellenkritik-Entscheidungsheuristik im Progressionsplan-Agent NICHT dokumentiert

**Severität:** P2
**Betroffene Verträge:** VERTRAG_2-2a_PROGRESSIONSPLAN, AGENT_RAETSEL.md
**Betroffene STRs:** STR-08 Quellenkritik als adaptiver Aufgabentyp (Anti-Automatismus)
**Beschreibung:** STR-08 definiert: "Quellenkritik ist verfügbar, aber Progressionsplan-Agent entscheidet sinngerichtet, wann es angebracht ist". Die Anti-Automatismus-Klausel lautet: "Quellenkritik wird getriggert durch didaktische Passung, nicht durch mechanische Quelltyp-Detektion".

Das Problem: AGENT_RAETSEL.md (der Progressionsplan produziert) enthält KEINE Entscheidungsregel, die kodifiziert, wann Quellenkritik sinngerichtet ist. Der Prompt wird nicht mit dieser Heuristik gefüllt.

**Evidenz:** VERTRAG_2-2a liest "NUR: AFB-Profil + Schwierigkeitskurve ... Operationalisierungsziel". "Quellenkritik-Trigger" ist nicht im Vertrags-Input dokumentiert.

**Risiko:** Subagent könnte zu oft oder zu wenig Quellenkritik vorschlagen. Didaktische Passung ist subjektiv.

**Verdikt:** SHOULD FIX — AGENT_RAETSEL.md muss Entscheidungsheuristik ergänzt werden + Beispiel-Matrix.

**Vertrags-Patch-Skizze:**
```
AGENT_RAETSEL.md (Phase 2-2a), neuer Abschnitt:

§ Quellenkritik-Entscheidungsheuristik (STR-08)

Quellenkritik ist NICHT automatisch bei Primaerquelle, sondern wird SINNGERICHTET entlang
dieser Bedingungen getriggert:

IF material.typ IN ['quellentext', 'tagebuch', 'bildquelle']
AND didaktische_funktion IN ['erarbeitung', 'vertiefung']
AND (operationalisierungsziel enthaelt 'Quellen-Reflexion' OR
     TB-Knoten enthält Quellenkritik-Element)
THEN: Progressionsplan schlaegt Quellenkritik-Aufgabe vor.

Beispiel-Matrix:
- Quellentext (Tagebuch 1914) + Erarbeitung + TB-Knoten "Authentizitaetsfrage"
  → JA, Quellenkritik sinnvoll.
- Quellentext (Parlamentsrede 1933) + Vertiefung + Operationalisierungsziel "Propaganda-Analyse"
  → JA.
- Bildquelle (Foto) + Einstieg (Hoekeinstimmung)
  → NEIN, zu frueh in Sequenz.

Anti-Automatismus-Kontrolle: Progressionsplan darf NICHT Quellenkritik bei JEDER Primaerquelle generieren.
```

---

### Finding F-RA4-05 — Achsen 5 und 6 (Phase 2.1c Ueberleitung + Hefteintrag-Revision) mangelhaft dokumentiert

**Severität:** P1
**Betroffene Verträge:** VERTRAG_2-1c_CROSS.md
**Betroffene STRs:** Allgemeine Pipeline-Stabilität, STR-24 Pre-Publish-Checkliste (indirekt)
**Beschreibung:** VERTRAG_2-1c definiert NEU (2026-04-02): Achse 5 (Ueberleitung-Produktion) und Achse 6 (Hefteintrag-Revision). Die Ausführungskriterien sind in Abschnitt §Achsen 5 und §Achse 6 beschrieben, aber:

1. **Achse 5 UE-Kriterien (UE-1..UE-5)** sind qualitativ beschrieben, aber es gibt keine formale Validierungs-Reihenfolge.
2. **Achse 6 Struktur-Freeze vs. Formulierungs-Offen** ist in Grenzfällen mehrdeutig. Beispiel: "Annexion" → "gewaltsame Eingliederung — Annexion" ist als ERLAUBT markiert (Erklärungskontext), aber die Grenze zwischen "Synonym-Ersatz" (VERBOTEN) und "Erklaerungskontext" (ERLAUBT) ist nicht scharf.
3. **Dokumentationspflicht** ist vage: "Pro Aenderung: ... Begruendung". Kein Audit-Trail-Format codifiziert.
4. **Stufe-2 Re-Evaluation (M1b)** gegen G3, G5, G10, G12, G14 ist dokumentiert, aber wie diese Kriterien gegen Material-Kontext re-evaluiert werden, ist nicht präzisiert.

**Evidenz:** VERTRAG_2-1c_CROSS.md §Achse 5 und §Achse 6 sowie §Regelwerk: Erlaubt vs. Verboten.

**Risiko:** Hefteintrag-Revision könnte strukturelle Änderungen unterschleifen (Complication-Schritt kürzen könnte intern neu gewichten). Keine Audit-Spur.

**Verdikt:** SHOULD CLARIFY — Grenzen zwischen Struktur und Formulierung müssen präzisierter sein + Audit-Trail-Format definieren.

**Vertrags-Patch-Skizze:**
```
VERTRAG_2-1c_CROSS, §Grenzfaelle:

Complication-Schritt von 2 Saetzen zu 1 kuerzen:
  → ERLAUBT (Formulierung)
  Begruendung: Zahl der Schritte nicht geaendert, nur Wortzahl pro Schritt reduziert.

Complication-Schritt "A + B → Synthese" zu "A und B separat gegenüber" umformulieren:
  → PRUEFEN: Ändert der Schritt die LOGISCHE RELATION? Wenn ja → VERBOTEN.
  Beispiel: "Buendnisse (Dreibund) und Gegenbündnis (Entente) führten zur Spannungverschaerfung"
           zu "Buendnisse existierten; Spannungen existierten" ist VERBOTEN (logische Reduktion).

Fachbegriff durch Synonym ersetzen:
  → VERBOTEN (Fachbegriff-Änderung)
  Aber: Fachbegriff + Erklaerungskontext aendert sich, Fachbegriff bleibt gleich → ERLAUBT.
  Beispiel: "Burgfrieden" → "Burgfrieden (Waffenstillstand aller Parteien)" ist ERLAUBT.

Audit-Trail-Format (M2, Dokumentationspflicht):
  SCPL-Revision:
    - Feld: situation.kontextsatz
    - Alt: "[original text]"
    - Neu: "[revised text]"
    - Material-Kontext: "Material M5-2 liefert konkretes Einstiegs-Beispiel"
    - Kategorie: "Formulierung | Erklaerungskontext"
    - Validator: [Agent-Name]
    - Datum: [ISO 8601]
```

---

### Finding F-RA4-06 — ATOM-UNIT Synchronisation (STR-02/03/04/05/08/11) kritisch aber im Commit-Template nicht erzwungen

**Severität:** P1
**Betroffene Verträge:** Alle ATOM-UNIT STR
**Betroffene STRs:** STR-02, STR-03, STR-04, STR-05, STR-08, STR-11
**Beschreibung:** Der AUSFUEHRUNGSPLAN definiert ATOM-UNIT-Regel: "Cluster mit E1↔E3-Kopplung werden als EIN STR gefuehrt. Der Commit enthaelt Vertrag + Subagent + Gueteregel-Katalog SYNCHRON."

Das Problem: Der Commit-Template im ORCHESTRATOR ist nicht explizit "MUSS 3 Artefakte enthalten" sondern nur styleguide "feat(d15b): STR-XX — <Kurztitel>". Es gibt KEINE technische Blockade gegen Partial-Commits.

**Risiko:** Entwickler könnte nur Vertrag committen, dann später (in separater Session) Subagent + Katalog. Dazwischen läuft Code, der das neue Feld erkennt, aber der Subagent noch nicht befüllt. Q-Gate schlägt fehl.

**Evidenz:** ORCHESTRATOR.md nennt ATOM-UNIT nicht; D15B_OPTIMIERUNGS_STRATEGIEN.md erklärt Atom-Unit-Regel.

**Verdikt:** SHOULD ADD — Commit-Template im ORCHESTRATOR muss "ATOM-UNIT: müssen 3 Artefakte enthalten" erklären.

**Vertrags-Patch-Skizze:**
```
ORCHESTRATOR.md, neuer Abschnitt nach Commit-Template:

ATOM-UNIT Commit-Integrität (STR-02, STR-03, STR-04, STR-05, STR-08, STR-11):

Ein ATOM-UNIT Commit MUSS folgende 3 Artefakte SYNCHRON enthalten:
  1. Vertrag (VERTRAG_*.md oder Abschnitt darin)
  2. Subagent-Prompt (SUB_AUFGABE_*.md oder SUB_MATERIAL_*.md)
  3. Gueteregel-Katalog-Eintrag (GUETEKRITERIEN_*.md oder Katalog-Update)

NICHT erlaubt: Partial-Commits (nur 1-2 Artefakte).

Begruendung: Vertrag definiert neues Output-Feld. Wenn Subagent nicht im selben Commit
gefüllt wird, generiert der Agent alten Output (Feld fehlt) → Q-Gate schlägt fehl.

Durchsetzung: Pre-commit-Hook (wenn implementiert) oder manueller Code-Review.
```

---

### Finding F-RA4-07 — Progressionsplan-Q-Gate explizit FEHLT (2.2a hat kein formales Gate)

**Severität:** P2
**Betroffene Verträge:** VERTRAG_2-2a_PROGRESSIONSPLAN
**Betroffene STRs:** Allgemeine Pipeline-Konsistenz
**Beschreibung:** Phase 2.0 hat Q-GATE (6 Kriterien). Phase 2.1 hat Q-GATE (Material, MQ1-MQ6). Phase 2.1c hat Q-GATE (Cross). Phase 2.2b hat Q-GATE (Aufgaben). Phase 2.2c hat Q-GATE (Orchestrator).

**Phase 2.2a (Progressionsplan) hat KEINEN dokumentierten Q-Gate.** Der Vertrag sagt:

> "Pro Aufgabe: Konstruktionskontext generieren"
> "8. Freischalt-Code generieren (thematisch, A-Z, 4-8 Zeichen)"

Aber kein "Q-Gate pruefen" Schritt.

**Evidenz:** VERTRAG_2-2a_PROGRESSIONSPLAN.md §Dispatch-Ablauf: kein Q-Gate-Punkt.

**Risiko:** Progressionsplan könnte inkonsistent sein (AFB-Reihenfolge nicht monoton, Freischalt-Code doppelt, Konstruktionskontext unvollstaendig) und wird nicht validiert bis Phase 2.2b (zu spät zur Behebung).

**Verdikt:** SHOULD ADD — Progressionsplan braucht eigenes Q-Gate oder Integrations-Point mit 2.2c-Q-Gate.

**Vertrags-Patch-Skizze:**
```
VERTRAG_2-2a_PROGRESSIONSPLAN:

§ Q-Gate (NEU)

Mechanik: docs/architektur/Q-GATE-MECHANIK.md
Katalog: (NEU in GUETEKRITERIEN_PROGRESSIONSPLAN.md oder in A-Katalog einbauen):

P1: Konstruktionskontexte vollständig
    Jede Aufgabe hat: {ziel_material_id, tb_knoten[], afb_level, operationalisierungsziel, aufgaben_typ}

P2: AFB-Progression monoton steigend
    AFB-Zuweisung erste Aufgabe ≤ ... ≤ letzte Aufgabe (oder mittels Bloom-Policy von STR-02)

P3: Material-Abdeckung vollständig
    Jedes Material in MATERIAL_GERUEST hat mind. 1 Konstruktionskontext (Abdeckungspruefung)

P4: Freischalt-Code eindeutig
    Codes sind alphanumerisch (A-Z, 4-8 Zeichen), keine Duplikate

P5: Operationalisierungsziele präzise
    Ziele sind konkret, nicht generic ("erarbeite TB-Knoten X" statt "verstehe den Inhalt")

Q-Gate-Reihenfolge: P1-P3 sind Blocker; P4-P5 sind Warnings.
```

---

### Finding F-RA4-08 — SUB_AUFGABE_QUELLENKRITIK (STR-08) nicht in Subagenten-Zuordnung dokumentiert

**Severität:** P1
**Betroffene Verträge:** VERTRAG_2-2b_AUFGABE §Subagenten-Zuordnung
**Betroffene STRs:** STR-08 Quellenkritik als adaptiver Aufgabentyp
**Beschreibung:** VERTRAG_2-2b definiert 5 Subagenten (MC, Zuordnung, Lueckentext, Reihenfolge, Freitext). STR-08 führt einen neuen Aufgabentyp "quellenkritik" ein, aber:

1. Die Subagenten-Zuordnungs-Tabelle hat KEINE Zeile für "quellenkritik".
2. Es ist unklar, ob "quellenkritik" ein eigener Subagent ist oder eine FREITEXT-Variante.
3. Der Dispatcher weiß nicht, welche Prompt-Datei zu lesen ist, wenn `aufgaben_typ: "quellenkritik"` in Progressionsplan steht.

**Evidenz:** VERTRAG_2-2b §Subagenten-Zuordnung Tabelle — kein "quellenkritik" Eintrag.

**Risiko:** Dispatcher schlägt fehl, weil SUB_AUFGABE_QUELLENKRITIK.md nicht im Vertrag-Input vorgesehen ist.

**Verdikt:** MUST FIX — Subagenten-Zuordnungs-Tabelle muss um Quellenkritik erweitert werden.

**Vertrags-Patch-Skizze:**
```
VERTRAG_2-2b_AUFGABE §Subagenten-Zuordnung:

| Subagent | Primaerer AFB | Kernexpertise | Prompt-Datei |
|---|---|---|---|
| SUB_AUFGABE_MC | I (auch II) | Distractor-Konstruktion | SUB_AUFGABE_MC.md |
| SUB_AUFGABE_ZUORDNUNG | I-II | Pole-Trennschaerfe | SUB_AUFGABE_ZUORDNUNG.md |
| SUB_AUFGABE_LUECKENTEXT | I-II | Lueckenauswahl, Fachbegriff-Recall | SUB_AUFGABE_LUECKENTEXT.md |
| SUB_AUFGABE_REIHENFOLGE | II | Element-Eindeutigkeit | SUB_AUFGABE_REIHENFOLGE.md |
| SUB_AUFGABE_FREITEXT | II-III | Leitfragen-Design, Scaffolding | SUB_AUFGABE_FREITEXT.md |
| SUB_AUFGABE_QUELLENKRITIK (NEU — STR-08) | II-III | W-Fragen-Struktur, Quellenanalyse | SUB_AUFGABE_QUELLENKRITIK.md |
| SUB_AUFGABE_VERGLEICH (NEU — STR-11) | III | Strukturraster, Gegenüberstellung | SUB_AUFGABE_VERGLEICH.md (oder FREITEXT-Variante) |
| SUB_AUFGABE_BEGRUENDUNG (NEU — STR-11) | III | CER-Struktur, Claim-Evidence-Reasoning | SUB_AUFGABE_BEGRUENDUNG.md (oder FREITEXT-Variante) |
```

---

### Finding F-RA4-09 — STR-12 Trigger-Flags Sichtbarkeits-Constraint (Lehrkraft-only) nicht im Engine-Rendering kodifiziert

**Severität:** P2
**Betroffene Verträge:** Material-Output-Schema, Engine-Rendering (Phase 3)
**Betroffene STRs:** STR-12 Trigger-Sensibilitaet-System
**Beschreibung:** STR-12 definiert: "trigger_flags sind AUSSCHLIESSLICH Lehrkraft-Metadaten. Sie sind NIE SuS-sichtbar. Im Schauseiten-Rendering (Engine) werden die Flags unterdrueckt."

Das Problem: Das Material-Output-Schema (materialien/*.json) würde trigger_flags enthalten, aber es gibt KEINE formale Regel im Material-Schema oder im VERTRAG_2-2b, die kodifiziert:
- trigger_flags darf NICHT im öffentlichen JSON-Export auftauchen
- Engine muss Unterdrueckungs-Check haben

**Evidenz:** VERTRAG_2-1_MATERIAL §Schnittstellen-Vertrag hat keinen Punkt "trigger_flags Sichtbarkeit = Lehrkraft-Scope".

**Risiko:** Wenn das Rendering nicht explizit Trigger-Flags filtert, könnten sie SuS sichtbar werden (Datenleck).

**Verdikt:** SHOULD ADD — Material-Schema und Engine-Rendering-Vertrag müssen Unterdrueckungs-Regel dokumentieren.

**Vertrags-Patch-Skizze:**
```
Material-Output-Schema oder neuer Abschnitt:

§ Trigger-Flags (Lehrkraft-Scope, NEU — STR-12)

Feld: trigger_flags (optional): Array<"gewalt" | "tod" | "diskriminierung" | ...>

Sichtbarkeits-Constraint: LEHRKRAFT-ONLY
- trigger_flags darf NICHT in öffentlichem Material-JSON (data.json) exportiert werden
- trigger_flags ist Lehrkraft-Metadaten, nur in Lehrkraft-Pfaden sichtbar (Leitfaden, Checkliste)
- Engine MUSS beim Rendering von materialien/*.json trigger_flags-Feld explizit filtern/unterdruecken

Engine-Rendering-Regel:
  IF renderTarget == "schueler_public" THEN
    material.trigger_flags = null (oder field entfernen)
  ELIF renderTarget == "lehrkraft_internal" THEN
    material.trigger_flags = [array]
```

---

### Finding F-RA4-10 — STR-13 Mappenabschluss-Zone Assembly-Logik nicht in Phase-3-Vertrag dokumentiert

**Severität:** P2
**Betroffene Verträge:** (impliziter Phase-3-Vertrag, NICHT explizit dokumentiert)
**Betroffene STRs:** STR-13 Mappenabschluss-Zone Reflexion
**Beschreibung:** STR-13 definiert: "Neuer Abschnitt in data.json: mappenabschluss_zone { reflexion_fragen: [...], ueberleitungssatz: ... }". Kleiner Sub-Task im Assembly-Schritt befüllt diese Zone aus fixem Template.

Das Problem: Das Phase-3-Assembly ist NICHT als formaler Vertrag dokumentiert. Der ORCHESTRATOR beschreibt Assembly nur in §Mappe-Anhang-Prozedur (8 Schritte), aber kein Schritt ist "mappenabschluss_zone befüllen".

**Evidenz:** ORCHESTRATOR.md §Mappe-Anhang-Prozedur hat keinen "generiere mappenabschluss_zone" Schritt.

**Risiko:** Assembly-Code könnte mappenabschluss_zone nicht generieren, oder es wird falsch gefüllt.

**Verdikt:** SHOULD ADD — Assembly-Vertrag (Phase 3) muss als expliziter Schritt kodifiziert werden.

**Vertrags-Patch-Skizze:**
```
Phase-3-Vertrag (neu oder Erweiterung ORCHESTRATOR §Mappe-Anhang-Prozedur):

Schritt 2b (NEU — STR-13): Mappenabschluss-Zone generieren
  Input: hefteintrag.json (Kernerkenntnisse aus scpl.loesung[]), Position (letzte Mappe?)
  Verarbeitung:
    IF position == last_mappe THEN
      reflexion_fragen = Template-Variante B (Reflexionsfrage mit Perspektivwechsel)
    ELSE
      reflexion_fragen = Template-Variante A (generischer Pool, situativ gewählt)
    ueberleitungssatz = IF position < last_mappe THEN
                         "Ueberleitung zu Mappe N+1"
                        ELSE
                         "[FINALE REFLEXION - kein Satz nötig]"
  Output: data.json.mappen[N].mappenabschluss_zone = {reflexion_fragen, ueberleitungssatz}

Template-Varianten: 5-8 vordefinierte Reflexions-Fragen per Thema-Klasse (Krieg, Gesellschaft, etc.)
```

---

### Finding F-RA4-11 — Phase 2.1c Achsen 5-6 Integrations-Punkt mit Q-Gate-Mechanik unklar

**Severität:** P2
**Betroffene Verträge:** VERTRAG_2-1c_CROSS §Q-Gate, Q-GATE-MECHANIK.md
**Betroffene STRs:** Allgemeine Pipeline-Stabilität
**Beschreibung:** VERTRAG_2-1c definiert Achsen 1-6, aber der Q-Gate-Punkt ist vage: "Bei GESAMT-PASS oder GESAMT-WARN + Achse 5 produziert + Achse 6 revidiert: Ergebnis in Q-GATE-LOG.md".

Unklar:
1. Wie aggregiert sich Q-Gate-Status über 6 Achsen? Sind Achsen 5-6 "optional" für PASS?
2. Wenn Achse 5 fehlschlägt (Ueberleitung unzureichend), ist das FAIL oder WARN?
3. Wenn Achse 6 Re-Evaluation fehlschlägt (Hefteintrag nach Revision nicht valide), ist das FAIL oder WARN?

**Evidenz:** VERTRAG_2-1c §Q-Gate Abschnitt fehlt formale Aggregations-Regel (wie in Q-GATE-MECHANIK.md §3 Aggregation beschrieben).

**Risiko:** Dispatcher könnte Achsen 5-6 überspringen oder falsch gewichten, wenn Status-Regeln nicht klar sind.

**Verdikt:** SHOULD CLARIFY — Q-Gate-Aggregations-Regel für Achsen 5-6 muss präzisiert werden.

**Vertrags-Patch-Skizze:**
```
VERTRAG_2-1c_CROSS §Q-Gate (geändert):

Katalog: Q-GATE-MECHANIK.md §7.4 — Cross-Konsistenz-Q-Gate (erweiterbar)
Reihenfolge: Achsen 1-4 zuerst (Cross-Pruefstufe 1), dann Achsen 5-6 (Produktion + Revision)

Aggregations-Regel:
  Achsen 1-4: MUSS PASS sein. FAIL → GESAMTRESULTAT FAIL, Betroffene Materialien + Finding dokumentieren
  Achse 5: MUSS PASS sein (Ueberleitungen vollständig produziert). FAIL → Überleitung nachbessern, re-check
  Achse 6: MUSS PASS sein (Hefteintrag-Revision valide nach Stufe-2 Re-Eval). FAIL → SCPL-Patches nachbessern

  GESAMTRESULTAT:
  - PASS: Achsen 1-6 alle PASS
  - WARN: Achse 1-4 PASS + Achse 5 WARN (unvollst. Ueberleitung, aber nachzuarbeiten) + Achse 6 PASS
  - FAIL: Jede Achse FAIL

Q-Gate-Output (Q-GATE-LOG.md §8-Format): Alle 6 Achsen-Ergebnisse dokumentieren, mit Blocker-Flags.
```

---

### Finding F-RA4-12 — STR-24 Pre-Publish-Checkliste Verhaeltnis zu E5-Katalogen nicht präzise genug definiert

**Severität:** P3
**Betroffene Verträge:** (neu) CHECKLISTE_D15B_POST_PUBLISH.md
**Betroffene STRs:** STR-24 Konsoli-Checkliste
**Beschreibung:** STR-24 schafft eine konsolidierte Pre-Publish-Checkliste (E6-Complement). Das Dokument selbst enthält eine "Verhaeltnis zu E5 Gueteregel-Katalogen" Sektion:

> "STR-24 **ersetzt die Kataloge nicht**. Die 6 Gueteregel-Kataloge bleiben die **prozess-immanente Qualifikation der Teilschritte**. STR-24 ist ein **komplementaeres Pre-Publish-Q-Gate auf Mappen-Ebene**, das quer ueber alle Ebenen-Outputs laeuft."

Das Problem: Diese Abgrenzung ist richtig, aber sie ist NICHT im Checklisten-Dokument selbst kodifiziert — sie sitzt nur in D15B_OPTIMIERUNGS_STRATEGIEN.md. Wenn jemand CHECKLISTE_D15B_POST_PUBLISH.md liest, versteht er nicht, dass Kataloge NICHT ersetzt werden.

**Evidenz:** D15B_OPTIMIERUNGS_STRATEGIEN.md §STR-24 hat diese Notiz; CHECKLISTE_D15B_POST_PUBLISH.md (Zieldatei) wurde noch nicht geschrieben.

**Risiko:** Benutzer könnten denken, die Checkliste ersetzt die Kataloge, und nehmen Kataloge aus dem Q-Gate-Prozess heraus.

**Verdikt:** SHOULD ADD — Zielcheckliste-Dokument muss Einleitung mit "Komplementarität, nicht Substitution" haben.

**Vertrags-Patch-Skizze:**
```
CHECKLISTE_D15B_POST_PUBLISH.md (Zieldatei, Header NEU):

# Konsolidierte Post-Publish-Checkliste — Phase 2 Abschluss

## Verhaeltnis zu Gueteregel-Katalogen (WICHTIG)

Diese Checkliste ERSETZT die 6 Gueteregel-Kataloge NICHT. Sie ist KOMPLEMENTAER:

- **Kataloge (Phase-spezifisch):** GUETEKRITERIEN_HEFTEINTRAG_*.md, GUETEKRITERIEN_AUFGABEN.md, etc.
  Wirken waehrend Produktion (Phase 2-0, 2-1, 2-2b, 2-2c).
  Pruefung: pro Dispatch, isoliert.

- **Diese Checkliste (Mappen-Level):** Laeuft nach Phase 2 Abschluss, PRE-PUBLISH.
  Pruefung: auf Vollstaendigkeit + Cross-Ebenen-Konsistenz (z.B. Feedback-Schema konsistent mit Engine-Rendering).
  Laeuft nach ALLEN einzelnen Q-Gates.

Diese Checkliste ist ein **Fang-Netz**, nicht ein **Ersatz**.

## Spots (30 insgesamt, gruppiert nach STR)

[Dann 30 Spots folgen...]
```

---

## 9. Risiko-Matrix

| Severity | Impactbereich | Findings | Mitigation |
|---|---|---|---|
| **P0 CRITICAL** | Phasen-Uebergang wird blockiert | F-RA4-06 (ATOM-UNIT) | Commit-Template + Code-Review-Regel |
| **P1 HIGH** | Vertrag-Schema bricht | F-RA4-01 (STR-03 Feedback-Schema), F-RA4-02 (Session-Split fehlend), F-RA4-03 (Bloom-Q-Gate), F-RA4-05 (Achsen 5-6), F-RA4-08 (Quellenkritik Subagent), F-RA4-09 (Trigger-Flags Sichtbarkeit) | Explizite Vertrags-Patches, Engine-Compat-Logik, Dokumentation |
| **P2 MEDIUM** | Q-Gate Luecke, Heuristik unklar | F-RA4-04 (Quellenkritik-Heuristik), F-RA4-07 (Progressionsplan-Q-Gate), F-RA4-10 (Assembly mappenabschluss_zone), F-RA4-11 (Achsen-Aggregation) | Q-Gate-Addition, Agent-Prompt, Assembly-Vertrag, Klärung |
| **P3 LOW** | Dokument-Verstaendlichkeit | F-RA4-12 (STR-24 Verhaeltnis zu Katalogen) | Einleitung, Abgrenzungs-Sektion |

**Gesamtrisko:** HIGH (3 P1 Findings in kritischen Schemata; 1 P0 in ATOM-UNIT-Synchronisation). Empfehlung: VOR Phase IV Umsetzung alle P0+P1 Findings beheben. P2/P3 können in Wave-Durchsaetzen adressiert werden.

---

## 10. Empfehlungen

### Vor Phase IV Start (BLOCKIEREND)

1. **STR-03 Feedback-Schema Breaking Change:** Explizite Compat-Logik im Engine-Rendering dokumentieren (beide Schemas erkennbar, legacy-Slot für Mappen 1-4, new-Slot für neue Mappen).

2. **Session-Split nach 2.1c PFLICHT erzwingen:** Orchest-Code oder Pre-Commit-Hook, der Split-Prompt generiert und weigert, Phase 2.2a ohne Split auszuführen.

3. **STR-02 Bloom-Validierung:** A1 in VERTRAG_2-2c erweitern um A1b "Bloom-Verteilung erfüllt Policy". Python-Validator bereitstellen.

4. **STR-08 Quellenkritik-Heuristik:** AGENT_RAETSEL.md Prompt erweitern mit Entscheidungsregel + Beispiel-Matrix. Quellenkritik ist NOT automatisch bei Primaerquelle.

5. **ATOM-UNIT Sync:** Commit-Template + Commit-Hook, der 3 Artefakte (Vertrag, Subagent, Katalog) erzwingt.

### Phase IV Durchsatz (SHOULD)

6. **Achsen 5-6 Dokumentation:** UE-Kriterien präzisieren, Grenzfalle Struktur/Formulierung klären, Audit-Trail-Format codifizieren.

7. **Progressionsplan-Q-Gate:** Neuer Katalog oder Integration mit 2.2c-Q-Gate. Mindest-Kriterien: Konstruktionskontexte, AFB-Progression, Material-Abdeckung.

8. **Subagenten-Zuordnungstabelle:** Quellenkritik, Vergleich, Begruendung in 2-2b Tabelle hinzufügen.

9. **STR-12 + STR-13 Engine-Patches:** Trigger-Flags Unterdrueckungs-Check + mappenabschluss_zone Rendering codifizieren.

10. **STR-24 Checkliste Zieldatei:** Mit Komplementaritaets-Header schreiben, bevor User Manual kommt.

---

## 11. Selbstkritik / Audit-Limits

**Grenzen dieser RA4-Analyse:**

1. **Keine Code-Review (RA3 Scope):** Agent-Prompts wurden NICHT auf Implementierungsqualität geprüft. Nur Input/Output-Schema + Integrationspunkte.

2. **Keine DAG-Analyse (RA2 Scope):** STR-Abhängigkeiten wurden NICHT gegen D15B DAG validiert. Nur Phasen-Uebergang-Ordnung.

3. **Keine Scope-Drift-Prüfung (RA1 Scope):** STRs wurden NICHT gegen Projektskope (WORKFLOW_v4.md) ganz gecheckt. Nur Pipeline-relevante Punkte.

4. **Keine Gueteregel-Kollisionen (RA6 Scope):** Keine Katalog-Redundanzen oder Widerspruch zwischen katalogen.

5. **Keine Meta-Synthese (RA5 Scope):** C2-Findings wurden NICHT gegen D15b STR erneut verifiziert (siehe STR-25 C2-Cross-Ref).

---

## 12. Zusammenfassung

**Audit-Periode:** 2026-04-05
**Audit-Status:** ABGESCHLOSSEN
**Vertragsbasierte Findings:** 12 (davon 1 P0 CRITICAL, 6 P1 HIGH, 4 P2 MEDIUM, 1 P3 LOW)

**Criticalste 3 Findings:**
1. **F-RA4-06 (P0):** ATOM-UNIT Synchronisation nicht erzwungen → Sub agenten produzieren alte Schemas
2. **F-RA4-01 (P1):** STR-03 Feedback-Schema Breaking Change → Engine-Compat fehlt
3. **F-RA4-02 (P1):** Session-Split nach Phase 2.1c nicht obligatorisch markiert → Mappe 4 Fehler

**Vertrags-Patch-Prioritaeten:**
1. ATOM-UNIT Commit-Regel + Hook (P0)
2. Feedback-Schema Compat-Logik (P1, Wave 3 Engine)
3. Session-Split MUST NOT OPTIONAL (P1, ORCHESTRATOR)
4. Bloom-Validierung in 2.2c (P1, GUETEKRITERIEN)
5. Quellenkritik-Heuristik in Agent (P2, Wave 1)

**Freigabe-Verdikt:** BEDINGT. VOR Phase IV: P0+P1 Findings müssen behoben sein. P2/P3 können parallel laufen.

---

**Audit durchgeführt von:** RA4 Pipeline-Integritaets-Pruefer
**Bestaetigung:** BERICHT_RA4_PIPELINE.md geschrieben, 323 Zeilen, 12 Findings mit konkreten Vertrags-Patches, alle Pflicht-Sektionen aus Charta enthalten.
