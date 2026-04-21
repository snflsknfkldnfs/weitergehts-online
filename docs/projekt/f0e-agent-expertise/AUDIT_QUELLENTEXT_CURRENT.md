# Audit: Quellentext-Sub-Agent — Aktueller Infrastruktur-Stand

**Scope:** Schritt 1 von F0e (Agent-Expertise-Forming).
**Zweck:** Entscheidungsgrundlage fuer modulare Transformation in dispatch-faehigen Real-Agent.
**Erstellt:** 2026-04-21.
**Quell-Repo:** `escape-game-generator/` (private, kanonisch).
**Ziel-Case:** `docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-4/materialien/mat-4-3.json` (Trothas Vernichtungsbefehl).
**Grenze:** rein lesend, keine Code-Aenderungen, keine Commits.

---

## 1. Call-Site im Gesamtprozess

Quellentext-Sub-Agent wird aufgerufen in **Phase 2.1 Material-Produktion** (Cowork).

Orchestrierungs-Chain:
1. **AGENT_MATERIAL** (`agents/AGENT_MATERIAL.md`) fuehrt Dispatch-Logik aus.
2. AGENT_MATERIAL generiert pro Material einen Produktionskontext (Template in Abschnitt 2.1 des Dokuments).
3. AGENT_MATERIAL dispatcht pro Material an den zustaendigen SUB_MATERIAL_*-Agenten.
4. Fuer `quellentext`: Dispatch an `SUB_MATERIAL_QUELLENTEXT.md` mit Skript-Passage-Volltext (200-300 Woerter).

Dispatch-Merkmale (dokumentiert im Vertrag Phase 2.1, Abschnitt "Dispatch-Isolation"):
- P4: 1 Material = 1 Dispatch = 1 .json-Datei.
- P1: Jeder Dispatch beginnt mit Read-from-Artifact-Schritten (1-8), keine Kontextvererbung.
- Compaction-resistent (Subagent liest alles aus Dateien).

Call-Site-Artefakt: es gibt **keine ausfuehrbare Call-Site** im Code-Sinn. Der Dispatch ist eine **manuelle Interaktion** in einer Cowork-Session: Mensch/PI oeffnet AGENT_MATERIAL, instanziiert Produktionskontext, uebergibt an Sub-Agent via Agent-Tool. F0d hat dieses Pattern als Arm B Dispatch empirisch bestaetigt (Tokens + Fail-Detection).

Dispatch ist also **Prozess-Artefakt**, nicht **Code-Artefakt**. Relevant fuer Transformation: Der "Code-Pfad", den wir umbauen, ist eigentlich ein Prompt-Dispatch-Pfad.

---

## 2. Prompt-Datei + Agent-Definition

**Prompt-Datei:** `agents/SUB_MATERIAL_QUELLENTEXT.md` (306 Zeilen).

**Formal:** kein Framework-Agent (z.B. kein `.claude/agents/*.md`-Frontmatter), sondern ein **Prompt-Dokument**, das bei Dispatch als Systemprompt-Block in die Agent-Nachricht eingebettet wird. Der Agent ist damit eine Cowork-Agent-Tool-Instanz, die dieses Prompt-Dokument als ihre Rolle annimmt.

**F0B Priming-Include:** Das Prompt-Dokument bindet `agents/_includes/F0B_PRIMING_INCLUDE.md` §1 (Sprachniveau R7) + §2 (Perspektivik) + §3 (Terminologie) wortgleich ein.

**Referenz-Checklisten:** `checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md` (M1-M12 Basis + QT-1 bis QT-6 typ-spezifisch).

Das Prompt-Dokument ist in Fachsicht sehr detailliert: Quellenauswahl-Prinzipien, Eingabe-Parameter, Sequenzkontext-Pflicht, Multiperspektivitaet-Policy, Dreischritt-Aufbereitung, HTML-Formatierung, Fussnoten-Regeln, Fiktionalitaets-Kennzeichnung, Rekonstruktions-Vorrangregel, JSON-Encoding-Regeln, Trigger-Metadaten, Schema-Output, Q-Gates MQ2 + Q1-Q10.

---

## 3. Aktuell bindende Vertraege

Primaer-Vertrag: **`VERTRAG_PHASE_2-1_MATERIAL.md`** (`architektur/vertraege/`, 352 Zeilen).

Der Vertrag definiert explizit einen **deterministischen Agent-Lifecycle** ueber 8 Read-Schritte:

| Schritt | Pflicht | Input-Artefakt | Output-Variable |
|---|---|---|---|
| 1 | IMMER | MATERIAL_GERUEST | TYP, TITEL, CHUNKS, TB_KNOTEN, ARTEFAKT_REFS, DIDAKT_FN |
| 1b | IMMER | SEQUENZPLAN_Mappe_N | SEQUENZKONTEXT-Block |
| 2 | IMMER | hefteintrag.json | STUNDENFRAGE, KNOTEN_DETAILS, SCPL_KONTEXT |
| 3 | IMMER | SUB_MATERIAL_[TYP].md | Subagenten-Prompt |
| 4 | IMMER | SKRIPT | SKRIPT_TEXT |
| 5 | IMMER | INHALTSBASIS | FAKTEN_BASIS |
| 6 | IMMER | einstieg.json | PROBLEMSTELLUNG |
| 7 | KONDITIONAL | ARTEFAKT_INVENTAR | ARTEFAKT_DETAILS (nur wenn ARTEFAKT_REFS nicht leer) |
| 8 | KONDITIONAL | KERNERKENNTNISSE aus hefteintrag.json | KERNERKENNTNISSE (nur wenn DIDAKT_FN = sicherung/transfer) |

**Schluesselerkenntnis:** Der Agent-Lifecycle ist bereits im Vertrag verankert, nicht luecke. Meine vorhergehende Vermutung, der Vertrag regele nur Output nicht Prozess, war **falsch**. Der Vertrag ist methodisch solider als erwartet.

Sekundaer-Vertraege (bei Konflikttyp oder Cross-Referenz):
- `VERTRAG_PHASE_2-1c_CROSS.md` — Cross-Phase-Bruecke.
- `VERTRAG_ATOM_UNITS.md` — atomare Output-Einheiten.
- `VERTRAG_FEEDBACK_SCHEMA.md` — fuer Checker-Call.
- `VERTRAG_SPRACHNIVEAU_R7.md` — eigenstaendiger Sprachniveau-Vertrag.

Output-Schema: `architektur/schemata/material-output-schema.json` v3.10.2 (Draft7 strict, `additionalProperties: false`).

---

## 4. Aktuell gelesene Input-Artefakte

Aus Vertrag + Sub-Agent-Prompt kombiniert, die Input-Liste bei Dispatch an Quellentext-Sub-Agent:

Pflicht:
- MATERIAL_GERUEST (aus Mappen-Verzeichnis).
- SEQUENZPLAN_Mappe_N (aus Mappen-Verzeichnis).
- hefteintrag.json (aus Mappen-Verzeichnis `rahmen/`).
- SUB_MATERIAL_QUELLENTEXT.md (das Prompt-Dokument selbst).
- SKRIPT (narrativer Volltext 200-300 Woerter).
- INHALTSBASIS (Zitate-Tabelle + Fakten).
- einstieg.json (aus Mappen-Verzeichnis `rahmen/`).
- Sequenzkontext-Block (generiert von AGENT_MATERIAL, nicht als File gelesen).
- F0B Priming-Include (`agents/_includes/F0B_PRIMING_INCLUDE.md`).

Konditional:
- ARTEFAKT_INVENTAR (nur wenn artefakt_refs nicht leer — bei Quellentext: `pq-N-M`-IDs).
- KERNERKENNTNISSE (nur bei didakt_fn = sicherung/transfer — bei Quellentext: fast nie).

Externe Quellen (abhaengig vom Material):
- Wikipedia / Wikisource / Archive — fuer Primaer-Quellen-Recherche (Rekonstruktions-Vorrangregel v3.10.4).

**Real gemessen (aus mat-4-3.json Output): `artefakt_ref: ["pq-4-1"]`** — also ARTEFAKT_INVENTAR (Schritt 7) war aktiv.

---

## 5. Output-Format (tatsaechlich geliefert)

Aus mat-4-3.json:

Content-Felder (Subagent-Verantwortung):
- `inhalt` (HTML mit `<p>`/`<em>` + `<blockquote>` fuer Originalzitat)
- `quelle` (Fussnote mit Sprecher, Datum, Fundort, Aufbereitungs-Muster)
- `_meta.wortanzahl` (93)
- `_meta.quellentyp` (amtlich)
- `_meta.aufbereitung` (gemischt)
- `_meta.rekonstruktions_begruendung` (30+ Zeichen Begruendung)
- `_meta.artefakt_ref` (Array, `["pq-4-1"]`)
- `_meta.tafelbild_knoten_abgedeckt` (Array, `["k4-3"]`)
- `_meta.quellenkritische_impulse` (2 Impulse)
- `_meta.perspektive` (String mit P1 + P3 Dual-Perspektivik)
- `_meta.erarbeitbarkeits_check` (PASS + Begruendung)
- `_meta.trigger_flags` (Array, `["gewalt", "tod"]`)

Struktur-Felder (Dispatcher-Verantwortung, nicht Subagent):
- `id`, `typ`, `titel`, `position`, `didaktische_funktion`, `voraussetzung`, `ueberleitung_von`, `sequenz_kontext`

**Das ist ein valides Produktions-Beispiel**, gegen das die Dispatch-Version im Spike direkt vergleichbar ist.

---

## 6. Qualitaets-Gates

Im Sub-Agent-Prompt verankert:
- **MQ2** (Titel-Typ-A/B Frage-Titel + Ambiguitaets-Sperre).
- **Q1** (Wortanzahl ≤ 100).
- **Q2** (Einleitungssatz ≤ 2 Saetze).
- **Q3** (Originalnaehe).
- **Q4** (Max. 3 Worterklarungen).
- **Q5** (Kein Interpretationsvorgriff).
- **Q6** (Quellenangabe-Pflicht).
- **Q7** (Tafelbild-Abdeckung).
- **Q8** (Perspektivitaet erkennbar).
- **Q9** (HTML-Format + Rekonstruktions-Marker).
- **Q10** (Historische Korrektheit mit INHALTSBASIS).

Zusaetzlich aus Sequenz-Kohaerenz:
- **SQ-1 bis SQ-5** (bereits-erarbeitetes Wissen / noch-nicht-eingefuehrte-Begriffe / TB-Knoten-Erarbeitbarkeit / narrativer Anschluss / Material-Charakter-Konsistenz).

F0d-Befund relevant:
- Self-Check (Arm A) blockiert bei MQ-M4-COVERAGE-FAIL + MQ-POLICY-DIDAKTIK-KONFLIKT + MQ-STR-05-FEHLEND. Die Q-Gates sind also **aktiv produktiv** — nicht theoretisch.

---

## 7. Bekannte Schwachstellen (aus F0d + Doku)

Aus F0d Befund:
- **M6 Schema-Compliance FAIL:** 0/6 generierte GENERATOR_OUTPUT.json formal Draft7-gueltig. Self-declared `schema_01_pass=true` war empirisch falsch. Systemisch, nicht Dispatch-spezifisch. Der Quellentext-Agent ist davon **direkt betroffen**, wenn die Envelope-Struktur nicht strikt enforced wird.
- **M1 Strukturstabilitaet schwach bei Arm A (Self-Check-Dispatch):** Jaccard 0.558 combined. Drift primaer in `inhalt`-Struktur (HTML-Blob vs Objekt) + `_meta.perspektive`-Prefix-Shape.
- **M4 Token-Overhead bei Arm B:** 1.83x Baseline. Bei Direct-Read statt Bundle-Dump vermutlich reduzierbar, aber im F0d nicht getestet.
- **Self-Check-Bias:** Intra-Call-Validierung unzuverlaessig (A_2 Miss). Isolated Checker (Arm B) 2/2 Hit.

Aus Doku (nicht aus F0d):
- **Rekonstruktions-Vorrangregel (v3.10.4) komplex:** erfordert Primaer-Recherche-Nachweis BEVOR Rekonstruktion. Prompt ist lang + detailliert — Risiko dass Agent die Regel uebergeht.
- **Taxonomie-Migration (Altwerte `rede`/`vertrag`/`zeugnis`/`original`):** Das Prompt-Dokument enthaelt explizite Migrations-Hinweise. Falls Agent Altwerte liefert → Schema-FAIL.
- **Perspektivik-Policy (STR-05):** greift nur bei `konflikttyp: true` uebergeben vom Dispatcher. Abhaengig von sauberer Flag-Uebergabe.

---

## 8. Vertrags-Luecken-Bewertung (revidiert)

Ergebnis der Pruefung gegen meine vorherige Hypothese:

**Hypothese (vor Audit):** Vertrag regelt OUTPUT, nicht PROZESS — Agent-Lifecycle-Sektion fehlt.

**Empirie (nach Audit):** FALSCH. Der Vertrag regelt Prozess EXPLIZIT ueber die 8 Read-Schritte (deterministisch, mit Pflicht/Konditional-Klassifikation und Fehlerbehandlung).

**Daraus folgt fuer F0e:** Vertrags-Refaktor ist NICHT noetig. Der Spike kann direkt auf der bestehenden Vertrags-Struktur aufbauen. Was der Spike pruefen muss:
1. Hat der aktuell dispatchte Agent die 8 Read-Schritte **tatsaechlich** durchgefuehrt, oder liest er nur oberflaechlich?
2. Sind alle 8 Schritte bei Direct-Read-Umsetzung (Option B) gleich robust durchfuehrbar wie bei Bundle-Dump?
3. Deckt die bestehende Q-Gate-Liste (MQ2 + Q1-Q10 + SQ-1-5) die realen Didaktik-Probleme ab, oder fehlen Kriterien (Luecke zwischen Schema-Pass und "reale Umsetzbarkeit")?

Luecken-Kandidaten fuer Dispatch-Erweiterung (nicht Vertrag):
- **Explizites Read-Manifest im Dispatch-Prompt:** MUST/CAN/MUST-NOT-Listen als strukturierte Einleitung fuer den Agent.
- **Schema-Pre-Gate:** Draft7-Validation VOR Rueckgabe des Subagent-Outputs, nicht nach. Self-deklariertes `schema_01_pass` ersetzen durch externe Validation.
- **Didaktik-Layer neben Q-Gate:** reale Unterrichts-Umsetzbarkeit (von dir bewertet) als Zusatz-Gate, nicht in Checkliste kodierbar.

---

## 9. Empfehlung fuer F0e-Spike-Design

Auf Basis Audit-Befund, konkret:

**Scope:**
- Ziel-Material: neues mat-4-X aus `deutscher-nationalismus-kolonialismus / mappe-4` ODER Re-Generierung mat-4-3 (Vernichtungsbefehl) als Baseline-Vergleich.
- Dispatch-Modus: Arm B isoliert (aus F0d uebernommen).
- Kontext-Input-Strategie: **Option B** (Direct-Read) — Agent bekommt Read-Tool + explizites Read-Manifest, das den Vertrag Phase 2.1 Read-Schritte 1-8 als Leitfaden nutzt.
- Shadow-Pattern: `agents/SUB_MATERIAL_QUELLENTEXT.v2-dispatch.md` parallel zu aktueller Version, Feature-Flag im Dispatcher.

**Nicht-Scope:**
- Voll-Clone des Repos (Audit hat Branch + Shadow-Pattern als ausreichend bestaetigt).
- Vertrags-Refaktor (Vertrag ist bereits tragfaehig).
- Erweiterung der Q-Gate-Liste (ausser Didaktik-Layer als externe Ergaenzung).

**Risiken aus Audit:**
- **Read-Schritt-Laziness:** Agent koennte Schritt 4/5/6 (SKRIPT, INHALTSBASIS, einstieg.json) ueberspringen. Mitigation: Read-Manifest mit Pflicht-Echo im Output ("Welche Dateien hast du gelesen?").
- **Schema-Alt-Werte:** Taxonomie-Migration ist fehleranfaellig. Mitigation: Schema-Pre-Gate Pflicht.
- **Perspektivik-Flag-Drift:** `konflikttyp: true` muss sauber uebergeben werden. Mitigation: Dispatch-Template klar strukturieren.

**Erster-Iterations-Materialvorschlag:**
Neues mat-4-X (noch nicht existent) — erzwingt, dass der Agent wirklich neu produziert statt Baseline nachzuempfinden. Thema aus INHALTSBASIS waehlen (z.B. Berliner Kongo-Konferenz 1884, Kolonialausstellung 1896, Maji-Maji-Krieg), Quellentyp = Primaer.

Alternativ: Re-Generierung mat-4-3 (Vernichtungsbefehl) als Kontroll-Run — erlaubt direkten Vergleich gegen akzeptierte Produktion.

Empfehlung: Re-Generierung mat-4-3 zuerst (kontrollierte Vergleichs-Baseline), dann neues mat-4-X (Generalisierungs-Test).

---

## 10. Blocker / Offene Fragen

Keine technischen Blocker. Offene methodische Fragen:

1. **Bewertungs-Form fuer Didaktik-Layer:** Soll dein Qualitaets-Urteil als freier Text oder als Pass/Fail-Rubrik erfasst werden? Rubrik erlaubt Wiederverwendbarkeit, freier Text erlaubt Nuance. Vorschlag: Hybrid — Pass/Fail pro MQ/Q-Kriterium + 1 Freitext-Feld "Klassenraum-Einwaende".
2. **Regression-Set:** Mit welchen 2 Materialien (nicht mat-4-3) wird Cross-Validation am Ende der Iteration gefahren? Vorschlag: je 1 Quellentext aus einem frueheren Game (z.B. bismarck-reichsgruendung oder industrialisierung).
3. **Shadow-Kanal:** Soll Dispatcher-Flag per env-var, per Config-File oder als expliziter Prompt-Parameter gesetzt werden? Vorschlag: Prompt-Parameter (einfachster, transparent).

---

## 11. Nicht gelesene Artefakte (Abgrenzung)

Nicht Teil dieses Audits (bei Bedarf Folge-Audit):
- F0B_PRIMING_INCLUDE.md (nur referenziert, nicht inhaltlich gelesen).
- QUALITAETSKRITERIEN_MATERIALPRODUKTION.md (Checkliste, nur referenziert).
- material-output-schema.json (Struktur genannt, Feld-Details nicht durchgegangen).
- AGENT_MATERIAL.md vollstaendig (nur relevante Dispatch-Abschnitte).
- ORCHESTRATOR.md (nicht gelesen — Dispatch-Flow bereits ueber AGENT_MATERIAL + Vertrag rekonstruierbar).

---

## Status

Audit abgeschlossen. Entscheidungsgrundlage fuer F0e-Plan vorhanden.

Naechster Schritt (separater User-Freigabe-Bedarf): F0e-Plan-Dokument (`F0e_AGENT_EXPERTISE_SPIKE.md`) aufsetzen analog zu F0d v2.1-Plan — mit Scope, Methodik, Iterations-Gate, Deliverables, Akzeptanz-Kriterien, Risiko-Katalog.
