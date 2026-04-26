# BEFUND_FORENSIK_PHASE5_RUN3 — Plugin v0.4.3 Hardening-Diagnose

**Datum:** 2026-04-26
**Plugin-Version:** 0.4.3 (escape-game-generator)
**Quell-Repo:** `/Users/paulad/escape-game-generator/`
**Output-Pfad:** `/Users/paulad/weitergehts.online/weitergehts-online/docs/projekt/BEFUND_FORENSIK_PHASE5_RUN3.md`
**Forensik-Auftrag:** 14 systemische Run-3-Audit-Befunde gegen Plugin-Implementierung verifizieren (F-PB-36..F-PB-49)

---

## Phase A: Explorative Existenz-Pruefung

### A.1 Schema-Verzeichnisse

- `/Users/paulad/escape-game-generator/schemas/`: **NICHT VORHANDEN** als Verzeichnis. Es existiert genau eine Datei `schemas/game_state.schema.json` (also kein Verzeichnis-Konvention, sondern Einzelfile auf Repo-Root-Ebene).
- `/Users/paulad/escape-game-generator/architektur/schemata/`: **VORHANDEN**. 18 Schema-Files (Auszug):
  - `material_quellentext_v3.10.4.json`, `material_quellentext_partial_v3.10.4.json`
  - `aufgabe_v1.json`, `material-output-schema.json`, `dispatch_meta_v1.json`
  - `hefteintrag-schema.json`, `material_source.json`, `material_text.json`
  - `entities.json`, `glossar_template.json`, `perspektiv_inventar.json`
  - `ueberleitungen-schema.json`, `rahmen-einstieg-schema.json`, `rahmen-sicherung-schema.json`
  - `mappe_metadata.json`
  - **KEIN** `inhalts_briefing.json`, **KEIN** `medien_katalog.json`, **KEIN** `skript.json`, **KEIN** `artefakt_inventar.json` Schema. Phase 0 hat keine maschinenlesbaren Schemata.

### A.2 Validator-Tools

- `tools/sprachvertrag-validator*`: **NICHT VORHANDEN** unter diesem Namen.
- `tools/sprachniveau-gate.js`: **VORHANDEN** — JS-Validator fuer Satzlaenge / Fachwort-Dichte / Komposita-Morpheme / Nominalstil / Konjunktiv (Heuristik).
- `tools/schema-gate*`: **NICHT VORHANDEN** als eigenes Skript. Schema-Gate-Funktion wird in Hooks (`pre-write-material`, `pre-write-aufgabe`) inline durchgefuehrt via `validate_material_output.py` und `validate_aufgabe_output.py`.
- `tools/validate_*`: **VORHANDEN** — `validate_material_output.py`, `validate_aufgabe_output.py`, `validate_game_state.py`. Phase 0-Artefakte (Skript, INHALTSBASIS, ARTEFAKT_INVENTAR, DIDAKTIK_RAHMEN) haben **keinen Validator**.
- Weitere Tools: `check_prosa_only.py`, `check_quelle_ssot.py`, `check_aufgabe_regex.py`, `check_q_gate_log.py`, `lemma_duplicate_check.py`, `terminologie-scanner.sh`, `multiperspektiv-sanity.js`, `entity-scanner.js`, `titel-validator.js`.

### A.3 VERTRAG- + AGENT-Files Inventar

- VERTRAG-Files unter **`architektur/vertraege/`** (NICHT `agents/` wie in Forensik-Auftrag erwartet):
  - `VERTRAG_PHASE_0-1_DIDAKTIK.md` (v1.2)
  - `VERTRAG_PHASE_0-2_INHALT.md` (v1.6)
  - `VERTRAG_PHASE_0-3_SKRIPT.md` (v1.4)  ← der Forensik-Auftrag nennt es "VERTRAG_PHASE_0-3_ARTEFAKT" — das ist eine **Auftragsfehlbezeichnung**. Existierender File ist SKRIPT.
  - `VERTRAG_PHASE_0-4_HEFTEINTRAG.md`
  - `VERTRAG_PHASE_2-0_RAHMEN.md`, `VERTRAG_PHASE_2-1_*.md`, `VERTRAG_PHASE_2-2*.md`, `VERTRAG_PHASE_3*.md`
  - `VERTRAG_SPRACHNIVEAU_R7.md` (v1.0)
  - `VERTRAG_FEEDBACK_SCHEMA.md`, `VERTRAG_ATOM_UNITS.md`
- AGENT-Files unter `agents/`:
  - `AGENT_DIDAKTIK.md`, `AGENT_INHALT.md`, `AGENT_MEDIENRECHERCHE.md`, `AGENT_SKRIPT.md`, `AGENT_HEFTEINTRAG.md`, `AGENT_ARTEFAKT.md`, `AGENT_MATERIAL.md`, `AGENT_RAETSEL.md`, `AGENT_QUALITAET.md`
  - SUB-Agents: `SUB_MATERIAL_*.md` (7 Stk), `SUB_AUFGABE_*.md` (8 Stk)
  - Dispatcher: `agent-material-dispatcher.md`, `agent-raetsel-dispatcher.md`, `agent-material-design.md`, `agent-raetsel-progressionsplan.md`
  - Reviewer: `reviewer-material-quellentext.md`

### A.4 Strukturelle Befunde (eigenstaendig)

**S1 — Kein Phase-0-Output-Schema:** Plugin hat keine maschinenlesbaren Schemata fuer Phase-0-Artefakte (DIDAKTIK_RAHMEN, INHALTSBASIS, SKRIPT, ARTEFAKT_INVENTAR). Alle Phase-0-Outputs sind Markdown-Files mit nur narrativ definierten "Pflicht-Sektionen". Schemas existieren ausschliesslich fuer Phase-2-Materialien (`material_quellentext_v3.10.4.json`) und Phase-2.2-Aufgaben (`aufgabe_v1.json`). Konsequenz: Phase 0 ist nur via `check_q_gate_log.py`-Status-Marker auditierbar, nicht via JSON-Schema-Validation. Das ist die strukturelle Wurzel fuer F-PB-37/38/39/41/42/45/46/49.

**S2 — Keine ausfuehrbaren Skript/Inhalt-Validatoren:** Es gibt keinen `validate_skript.py`, `validate_inhaltsbasis.py`, `validate_artefakt_inventar.py` oder `validate_didaktik_rahmen.py`. Q-Gates Q1-Q13 (AGENT_SKRIPT), QI1-QI6 (AGENT_INHALT), Q1-Q10 (AGENT_ARTEFAKT), QD1-QD9 (AGENT_DIDAKTIK) sind reine **LLM-Self-Check-Listen** ohne ausfuehrbaren Ruecklauf. Das stuetzt F-PB-43/44/47.

**S3 — Hooks decken nur Phase 2/3:** `hooks/hooks.json` enthaelt 9 Hooks; alle adressieren Phase 2 (Material/Aufgabe/Schema-Gate) oder Game-Assembly. **Kein einziger Hook prueft Phase-0-Artefakte** (Skript, Inhaltsbasis, Inventar, Didaktik-Rahmen). Konsequenz: Phase 0 hat keinen Hook-basierten Schutz vor Drift.

**S4 — Naming-Drift Forensik-Auftrag vs. Repo:** Forensik-Auftrag nennt `VERTRAG_PHASE_0-3_ARTEFAKT.md`, existiert NICHT — der reale File heisst `VERTRAG_PHASE_0-3_SKRIPT.md`. AGENT_ARTEFAKT erstellt das Inventar, aber der Phase-0-Vertrag der relevanten Phase ist SKRIPT (Phase 0.3) bzw. INHALT (Phase 0.2 + integrierte Artefakt-Sichtung). Es gibt KEINEN dedizierten VERTRAG fuer AGENT_ARTEFAKT.

---

## Phase B + C: Hypothesen-Verifikation

### F-PB-36 — AGENT_SKRIPT Drift-Hinweise-Pipeline (F2)

- **Status:** CONFIRMED
- **Belege:**
  - `/Users/paulad/escape-game-generator/agents/AGENT_SKRIPT.md`: Volltext-Grep nach `drift`, `Q-GATE-LOG_phase_0_2_m`, `Drift-Hinweise`, `drift_hinweise`, `Pflicht-BU` → **0 Treffer**.
  - `/Users/paulad/escape-game-generator/architektur/vertraege/VERTRAG_PHASE_0-3_SKRIPT.md`: Grep nach `drift|Drift|DRIFT` → **0 Treffer**.
  - Eingabe-Tabelle in AGENT_SKRIPT (Zeilen 32-35): nur `DIDAKTIK_RAHMEN` und `INHALTSBASIS` als Pflichteingabe — kein Q-GATE-LOG, kein Medien-Katalog mit `_meta.fallback_begruendung` als Skript-Input.
- **Plugin-Defizit:** AGENT_SKRIPT konsumiert weder den `Q-GATE-LOG_phase_0_2_m`-Eintrag noch die `_meta.fallback_begruendung`-Felder aus `medien_katalog_game.json`. Drift-Hinweise (z.B. M3-Titel-Drift, MV-Aequivalenz-DRIFT aus AGENT_MEDIENRECHERCHE §9) propagieren nicht in das Skript-Narrativ. Es fehlt die Skript-seitige Pflicht-BU-Klausel.
- **Hardening-Pointer:** Eingabe-Tabelle VERTRAG 0.3 §2 um `Q-GATE-LOG_phase_0_2_m.json` erweitern und neue QS-Pruefung "Drift-Hinweis-Verarbeitung" einfuehren, die jeden DRIFT-Eintrag im Skript narrativ verarbeitet oder explizit als auslassbar dokumentiert.

### F-PB-37 — Quellenkritik-Feld in Medien-Output (F3)

- **Status:** CONFIRMED
- **Belege:**
  - `/Users/paulad/escape-game-generator/agents/AGENT_MEDIENRECHERCHE.md:104-140` — Output-Schema enthaelt `urheber`, `lizenz`, `data_source`, `cross_reference_wikipedia_article`, `metadata.date_taken`, `_meta.fallback_begruendung`, aber **KEINE** Felder `auftragskunst_flag`, `inszenierungs_hinweis`, `propaganda_kontext`, `quellenkritik_status` oder `bias_kategorisierung`.
  - Volltext-Grep ueber gesamtes Repo nach `auftragskunst|inszenierungs|quellenkritik_flag|quellenkritik_feld` (case-insensitive) → **0 Treffer**.
  - Anti-Bias-Check §8b adressiert Diversitaet (Quellen-Kategorien, Perspektiven, zeitliche Streuung), aber **nicht die Authentizitaet/Inszenierung des Einzelbildes**.
- **Plugin-Defizit:** Output-Schema von AGENT_MEDIENRECHERCHE enforced kein strukturiertes Quellenkritik-Feld. Auftragskunst-/Propaganda-/Inszenierungs-Hinweise bleiben implizit in `metadata.modifications` (`NONE|CROPPED|EDITED`) und sind narrativ-unvollstaendig.
- **Hardening-Pointer:** Output-Schema in AGENT_MEDIENRECHERCHE §5 um `quellenkritik: {auftragskunst_flag: bool, inszenierungs_hinweis: str|null, propaganda_kontext: str|null, kuratorische_einordnung: str}` erweitern und in QI-MV als Pflichtfeld validieren.

### F-PB-38 — event_date pro Zitat (F4)

- **Status:** CONFIRMED
- **Belege:**
  - `/Users/paulad/escape-game-generator/architektur/vertraege/VERTRAG_PHASE_0-2_INHALT.md:160` — Zitate-Pflichtsektion: "Tabelle: ID, Sprecher, Wortlaut, Kontext, Wikipedia-Quelle, Eignung" — **`event_date` und `zitat_datum` fehlen**.
  - `/Users/paulad/escape-game-generator/agents/AGENT_INHALT.md:166-189` — Output-Template "Inhalts-MD: Mappe N" hat keine event_date- oder zitat_datum-Spalte.
  - `/Users/paulad/escape-game-generator/agents/AGENT_ARTEFAKT.md:194-204` — Zitat-Tabelle: "Sprecher, Kontext, Zitat-Kern, Wikipedia-Beleg, Mappe, Tafelbild-Knoten" — **kein zitat_datum/aeusserungs_datum**.
  - Volltext-Grep nach `event_date|zitat_kontext|zitat_datum|ereignis_datum` ueber gesamtes Repo → **0 Treffer**.
- **Plugin-Defizit:** Weder INHALTSBASIS-Output noch ARTEFAKT-Inventar enforcen ein `aeusserungs_datum` oder `event_date` pro Zitat. Run-3 zeigt: ein Zitat aus 1923 kann faelschlich auf das Mappen-Ereignis 1919 bezogen werden, weil das Aeusserungs-Datum nirgends strukturiert vorliegt.
- **Hardening-Pointer:** Pflichtfeld `aeusserungs_datum` (ISO-Datum oder Range) in INHALTSBASIS §4 Zitate-Tabelle und ARTEFAKT-Zitat-Block einfuehren; QI3 + AGENT_ARTEFAKT Q9 erweitern.

### F-PB-39 — Aufnahmedatum aus extmetadata (F5)

- **Status:** CONFIRMED
- **Belege:**
  - `/Users/paulad/escape-game-generator/agents/AGENT_ARTEFAKT.md:102` — Tabelle "Metadaten pro Bild": `Datum | imageinfo[0].extmetadata.DateTimeOriginal.value` (also der Pfad ist dokumentiert), aber:
  - `/Users/paulad/escape-game-generator/agents/AGENT_MEDIENRECHERCHE.md:127` — Output-Schema `metadata.date_taken: "<YYYY-MM-DD oder Range oder NULL>"` — Feld exitiert, aber:
  - Volltext-Grep nach `aufnahme_datum|aufnahmedatum` → **0 Treffer**. Der Begriff `DateTimeOriginal` taucht nur in AGENT_ARTEFAKT.md als API-Pfad auf (Zeile 102), aber **nicht in AGENT_MEDIENRECHERCHE als Pflicht-Extraktions-Schritt**.
  - In AGENT_MEDIENRECHERCHE §3 Kanal-2-Auswertung ist nur `LicenseShortName` und `Artist` explizit gelistet — `DateTimeOriginal` wird nicht als Pflicht-Extraktions-Feld benannt.
- **Plugin-Defizit:** AGENT_MEDIENRECHERCHE definiert `metadata.date_taken` im Output-Schema, aber der Workflow-Schritt §3 (Kanal-2-Auswertung) listet nur Lizenz+Urheber als Pflicht-Extraktions-Felder. `extmetadata.DateTimeOriginal`/`DateTime` sind nicht algorithmisch eingefordert. Konsequenz: `date_taken` bleibt in der Praxis NULL oder LLM-geschaetzt.
- **Hardening-Pointer:** AGENT_MEDIENRECHERCHE §3 Kanal-2 explizit um Schritt "Aufnahmedatum aus extmetadata.DateTimeOriginal/DateTime extrahieren" ergaenzen und QI-MV pro Bild Pflicht setzen.

### F-PB-40 — medien_katalog ↔ ARTEFAKT_INVENTAR Cross-Check (F6)

- **Status:** CONFIRMED
- **Belege:**
  - `/Users/paulad/escape-game-generator/agents/AGENT_ARTEFAKT.md` Volltext-Grep nach `medien_katalog` → **0 Treffer**. AGENT_ARTEFAKT erwaehnt `medien_katalog_game.json` ueberhaupt nicht.
  - AGENT_ARTEFAKT.md:30-37 Eingabe-Tabelle: `artikel_liste`, `didaktik_rahmen`, `tafelbild_entwurf`, `mappen_themen` — **medien_katalog NICHT als Eingabe**.
  - AGENT_ARTEFAKT.md:268-281 Q-Gate (Q1-Q10): kein Cross-Check-Punkt "alle verifizierten Bilder aus medien_katalog im Inventar".
  - `RESERVE` ist als Qualifizierungs-Status erlaubt (Zeile 128), aber nicht als Pflicht-Marker fuer ungenutzte verifizierte Bilder definiert.
- **Plugin-Defizit:** AGENT_ARTEFAKT integriert `medien_katalog_game.json` (Output von AGENT_MEDIENRECHERCHE Phase 0.2.M) nicht als Pflicht-Eingabe. Es gibt keinen Cross-Check-Schritt, der jedes `verified: true`-Bild im Inventar referenziert oder als RESERVE markiert. Bilder koennen "verifiziert" sein und trotzdem im Inventar fehlen, ohne dass das auffaellt.
- **Hardening-Pointer:** AGENT_ARTEFAKT Eingabe-Tabelle um `medien_katalog_game.json` erweitern und neuen Q-Gate-Punkt Q11 "Cross-Check medien_katalog: jedes verified-Bild im Inventar (QUALIFIZIERT/RESERVE) ODER explizit als VERWORFEN mit Begruendung" einfuehren.

### F-PB-41 — material_kandidat Coverage-Cross-Check (F7)

- **Status:** CONFIRMED
- **Belege:**
  - Volltext-Grep ueber gesamtes Repo nach `material_kandidat|material_kandidaten|GEDECKT|AEQUIVALENT|AUSGELASSEN` → **0 Treffer**.
  - `/Users/paulad/escape-game-generator/agents/AGENT_ARTEFAKT.md` enthaelt keinen Briefing-Output- oder Coverage-Begriff. Das Konzept "material_kandidat" existiert im Plugin nicht.
  - AGENT_INHALT.md:185-188 Hinweise-Sektion fuer Raetsel: "Geeignete Aufgabentypen / Besonderheiten / Differenzierungspotenzial" — kein expliziter "material_kandidat"-Block.
- **Plugin-Defizit:** Das Konzept eines `briefing.material_kandidaten`-Listenfelds, das in AGENT_ARTEFAKT systematisch auf GEDECKT/AEQUIVALENT/AUSGELASSEN-Cross-Check geprueft wird, existiert im Plugin schlicht nicht. Wenn AGENT_INHALT/Phase 0.2 "Materialvorschlaege" formuliert, gibt es keinen formalen Mechanismus zur Lueckenpruefung im Inventar.
- **Hardening-Pointer:** Konzept `briefing.material_kandidaten[]` in VERTRAG_PHASE_0-2_INHALT formal einfuehren und in AGENT_ARTEFAKT Q-Gate als Q12 "Coverage-Check material_kandidaten" verankern (Status pro Kandidat: GEDECKT/AEQUIVALENT/AUSGELASSEN+Begruendung).

### F-PB-42 — anker_briefing / tafelbild_knoten / tipp_stufen_slot (F8)

- **Status:** CONFIRMED
- **Belege:**
  - Volltext-Grep ueber gesamtes Repo nach `anker_briefing|tafelbild_knoten|tipp_stufen_slot` → **0 Treffer** in Plugin-Quellen.
  - VERTRAG_PHASE_0-3_SKRIPT.md:50-56 §3.2 Chunk-Aufbau enforced "Tafelbild-Entwurf" als Pflicht-Sektion mit "Knoten (ID, Text, Typ, Skript-Ref) + Verbindungen". Begriff ist also **"Tafelbild-Entwurf"** mit "Knoten" — NICHT `tafelbild_knoten` als strukturiertes Feldlabel.
  - VERTRAG_PHASE_0-1_DIDAKTIK.md:49 nennt "3-Stufen-Tipp-System" — aber NICHT `tipp_stufen_slot` als Pflicht-Schema-Feld in AGENT_ARTEFAKT-Output.
  - "Anker"/"anker_briefing": **0 Treffer** in VERTRAG_PHASE_0-3.
- **Plugin-Defizit:** Die in Run-3 Cowork-Patch v0.4.3 ergaenzten Felder `anker_briefing`, `tafelbild_knoten`, `tipp_stufen_slot` sind im Quell-Repo (committed-Plugin) nicht als Pflicht-Schema-Felder verankert. Tafelbild-Knoten existieren nur narrativ als "Knoten in Tafelbild-Entwurf"; Tipp-Stufen sind nur in DIDAKTIK_RAHMEN als "3-Stufen-Tipp-System" erwaehnt; "anker_briefing" gibt es ueberhaupt nicht.
- **Hardening-Pointer:** Drei Pflicht-Schema-Felder `anker_briefing`, `tafelbild_knoten[]`, `tipp_stufen_slot[]` formal in VERTRAG_PHASE_0-3 §3.2/§4 und AGENT_ARTEFAKT-Output ergaenzen und in QS5/QS8 + Q-Gate Q11+ als Pflichtpruefung verankern.

### F-PB-43 — SK1-SK18 Self-Check ohne Validator (F10)

- **Status:** CONFIRMED
- **Belege:**
  - `/Users/paulad/escape-game-generator/agents/AGENT_SKRIPT.md:222` — "Pflicht-Referenz: `checklisten/GUETEKRITERIEN_SKRIPT.md` (SK1-SK15)" — also nur **Doc-Referenz**, kein ausfuehrbarer Tool-Aufruf.
  - AGENT_SKRIPT.md:251-253 — "Stufe 2: Fachdidaktische Pruefung (SK1-SK15) … MUSS-Verletzung = Ueberarbeitung. SOLL-Verletzung = Hinweis im Output." — explizit als LLM-Self-Check beschrieben.
  - GUETEKRITERIEN_SKRIPT.md erweitert auf SK1-SK19 (SK17 revidiert, SK18 Quellenorientierung, SK19 Chronologie). VERTRAG_PHASE_0-3_SKRIPT.md:132-140 listet SK1-SK17 als BLOCKER/HIGH/MEDIUM ohne ausfuehrbares Tool.
  - `/Users/paulad/escape-game-generator/tools/`: kein `validate_skript.py`, kein `check_sk*.py`. Lediglich `sprachniveau-gate.js` deckt nur §6 Metrik (Satzlaenge/Komposita) ab — nicht SK1-SK18 Vergegenwärtigung/Multikausualitaet/Quellenorientierung.
- **Plugin-Defizit:** Die fachdidaktischen Pruefpunkte SK1-SK18(/19) existieren nur als LLM-Self-Check-Anweisung in MD-Dokumenten. Es gibt keinen Validator, der prueft, ob z.B. SK1-Handlungsanteil (50% Handlungspassagen) tatsaechlich erfuellt ist oder SK7-Multikausualitaet (≥2 Ursachen) im Text nachgewiesen werden kann.
- **Hardening-Pointer:** Mindestens fuer Hard-Kriterien (SK4 Strukturiertheit ueber Absatz-Zaehlung, SK5 Sprachniveau ueber sprachniveau-gate.js bereits gedeckt, SK7 Multikausualitaet ueber Marker-Suche, SK18 Quellenbezuege ueber Wikipedia-Citation-Count) ausfuehrbare Tools `validate_skript_sk.py` einfuehren.

### F-PB-44 — R7-Komposita-Erstgebrauch-Validator (F11)

- **Status:** CONFIRMED (mit partieller Komposita-Pruefung)
- **Belege:**
  - VERTRAG_SPRACHNIVEAU_R7.md:82 §3.3 — "Kompositum-Laenge ≤ 4 Morpheme. 'Dampfmaschine' ok (2). 'Industrialisierungsprozess' grenzwertig (3+). 'Wirtschaftsentwicklungsgeschichte' verboten (4+)."
  - VERTRAG_SPRACHNIVEAU_R7.md:174 §6 — "Maximale Kompositum-Morpheme ≤ 4 | pro Einzelkompositum; gemessen via morphologischer Zerlegung" — wird gemessen, aber nicht "Erstgebrauch".
  - `/Users/paulad/escape-game-generator/tools/sprachniveau-gate.js:11` — "Morpheme/Wort ≤ 4 (Heuristik: Trennungs-Signale aus wortschatz_r7_core.morphem_heuristik)" — implementiert Morphem-Zaehlung, nicht Erstgebrauch-Erklaerung.
  - Volltext-Grep im tools/-Ordner nach `erstgebrauch|erste_erwaehnung|first.{0,5}use` → **0 Treffer**. Im Glossar-Mechanismus VERTRAG_SPRACHNIVEAU_R7 §7 ist `erste_erwaehnung` als Glossar-Feld vorgesehen, aber kein Validator prueft "Komposita werden bei Erstgebrauch erklaert".
- **Plugin-Defizit:** `sprachniveau-gate.js` prueft nur die Morphem-Anzahl pro Kompositum (≤4 Pflicht), aber nicht, ob ein Kompositum bei seiner ersten Verwendung in einem Material-Text durch Apposition/Glossar erklaert wird. SK5 ("Fachbegriffe bei Erstverwendung erklaert") und §3.2.3 ("Fachwoerter bewusst einfuehren") sind LLM-Anweisungen ohne Tool.
- **Hardening-Pointer:** `tools/check_komposita_erstgebrauch.py` neu einfuehren — pro Material erste Vorkommnisse von Komposita (>2 Morphemen) und Pflicht-Apposition/Glossar-Eintrag/Klammer-Erklaerung im selben oder Folgesatz pruefen; in VERTRAG_SPRACHNIVEAU_R7 §6 Metrik-Tabelle als 7. Metrik aufnehmen.

### F-PB-45 — Schulart-Konsistenz-Check (F12)

- **Status:** CONFIRMED
- **Belege:**
  - `/Users/paulad/escape-game-generator/agents/AGENT_DIDAKTIK.md` Volltext-Grep nach `schulart|Mittelschule.{0,30}konsistenz|lehrplan.{0,15}quelle` → **0 Treffer fuer Konsistenz-Check**.
  - AGENT_DIDAKTIK.md:32 — Eingabe `jahrgangsstufe: "R7 Mittelschule Bayern"` ist ein Freitext-Parameter ohne Validierungsregel gegen die tatsaechlich konsultierte Lehrplan-Quelle.
  - AGENT_DIDAKTIK.md Self-Check QD1-QD9 + QD-TITEL: keiner prueft "Schulart in Header == Schulart der Lehrplan-Quelle in Aufgabe 0".
  - VERTRAG_PHASE_0-1_DIDAKTIK.md:60-73 Q-Gate QD1-QD10: keiner prueft Schulart-vs-Lehrplan-Match.
- **Plugin-Defizit:** Es gibt kein QD-Gate, das die Konsistenz zwischen deklarierter Schulart (Header `jahrgangsstufe`) und der in Aufgabe 0 referenzierten LehrplanPLUS-Quelle prueft. Run-3 zeigt Drift zwischen "Mittelschule R7" und faktisch zitiertem Realschul-/Gymnasial-Material.
- **Hardening-Pointer:** Neuer QD-Gate `QD-SCHULART` ergaenzen, der jede zitierte Lehrplan-Quelle in Aufgabe 0 (`lehrplanbezug`) gegen `jahrgangsstufe` matched (z.B. via Lehrplan-URL-Pattern `mittelschule/.../GPG_R7`).

### F-PB-46 — Math/Sum-Konsistenz-Validator (F13)

- **Status:** CONFIRMED
- **Belege:**
  - Volltext-Grep ueber Repo nach `Math.{0,5}Konsistenz|sum.{0,5}check|Aufschluesselung|Header-Anzahl` (case-insensitive) → **0 Treffer**.
  - `tools/`: kein `check_sum_consistency.py`, kein `check_math_*.py`. `check_aufgabe_regex.py` prueft nur Regex-Patterns, nicht numerische Header-vs-Body-Konsistenz.
  - `hooks/hooks.json`: kein Hook prueft Math-/Sum-Konsistenz auf assembled `data.json` oder Mappen-Headers.
- **Plugin-Defizit:** Es gibt keinen Validator, der z.B. "Mappe enthaelt 5 Materialien" (Header) gegen `materialien.length === 5` (Body-Aufschluesselung) prueft, oder "TZ1-TZ4" deklariert und tatsaechlich 4 Teilziel-Eintraege existieren. Math/Sum-Konsistenz ist reine LLM-Verantwortung.
- **Hardening-Pointer:** `tools/check_math_consistency.py` neu einfuehren — Header-Counts (`mappen_anzahl`, `materialien_anzahl`, KE-Count, TZ-Count) gegen tatsaechliche Array-Laengen im assembled `data.json` und in `DIDAKTIK_RAHMEN` validieren; PostToolUse-Hook auf Phase-3-Assembly haengen.

### F-PB-47 — SK5-Wortzahl-Check (F14)

- **Status:** CONFIRMED (Subset von F-PB-43)
- **Belege:**
  - GUETEKRITERIEN_SKRIPT.md:100 — SK5 "Sprachliche Angemessenheit ... auf R7-Mittelschule kalibriert" — keine algorithmische Wortzahl-Pruefung pro Chunk in SK5 selbst.
  - VERTRAG_PHASE_0-3_SKRIPT.md:148 QS3 Chunking-Konformitaet: "Chunk-Laenge: 600-900 Woerter Narrativtext … AGENT_SKRIPT MUSS pro Chunk den exakten Word-Count des Narrativtextes angeben" — ABER: Word-Count ist **LLM-Selbstdeklaration**, kein ausfuehrbarer Counter im Plugin.
  - `tools/`: kein `count_words_chunk.py` oder `validate_skript_wordcount.py`. `sprachniveau-gate.js` zaehlt zwar Worte pro Satz (avg ≤15, max ≤25), aber nicht den 600-900W-Korridor pro Chunk.
- **Plugin-Defizit:** Der QS3-Word-Count (600-900W pro Chunk) und SK5 sprachliche Angemessenheit haben keinen ausfuehrbaren Wort-Count-Validator im Plugin. AGENT_SKRIPT meldet selbst "§1-§6: 847W" — diese Selbstdeklaration ist nicht verifiziert.
- **Hardening-Pointer:** `tools/check_skript_chunks.py` einfuehren, der SKRIPT_*.md parsiert, pro Chunk nur die §-Absaetze des Skript-Textes zaehlt (Tafelbild/Sandwich/Artefakt-Tabelle ausschliesst) und gegen 600-900W (max 990W) validiert. Als PreCommit-Hook oder PostToolUse-Hook auf SKRIPT-Write haengen.

### F-PB-48 — Schema-Naming-Inkonsistenz lizenz_summary / lizenz_inventar_konsistenz (F15)

- **Status:** INKONKLUSIV
- **Belege:**
  - Volltext-Grep ueber gesamtes Repo nach `lizenz_summary|lizenz_inventar_konsistenz` → **0 Treffer in Plugin-Quellen**.
  - VERTRAG_PHASE_0-3_SKRIPT.md und AGENT_ARTEFAKT.md enforcen weder `lizenz_summary` noch `lizenz_inventar_konsistenz` als Output-Felder.
  - AGENT_ARTEFAKT.md:142-150 Inventar-Block hat lediglich pro Artefakt `Lizenz`-Feld, keine Aggregat-Sektion.
- **Plugin-Defizit:** Wenn Run-3 beide Felder parallel im Output verwendet, liegt das nicht an Plugin-Schema-Spec (das die Felder gar nicht kennt), sondern an LLM-Improvisation. Das ist eher ein Plugin-Defizit der Naming-Lueke (Schema schweigt → LLM erfindet zwei Bezeichner).
- **Hardening-Pointer:** Eindeutigen Aggregat-Block `lizenz_inventar` mit fixiertem Schema (Felder `total`, `cc_by_count`, `pd_count`, `inkompatible_count`) in AGENT_ARTEFAKT-Output-Spec festschreiben; alle abweichenden Bezeichner verbieten.

### F-PB-49 — _meta-Befuellung vs. Bild-Slot-Anzahl-Validation (F16)

- **Status:** CONFIRMED
- **Belege:**
  - `/Users/paulad/escape-game-generator/agents/AGENT_MEDIENRECHERCHE.md:137-139` — `_meta`-Sektion enthaelt nur `fallback_begruendung` und `cross_reference_status` — **keine** Pflicht-Felder `anzahl_geprueft`, `anzahl_verified`, `slot_count_validated`.
  - Volltext-Grep nach `_meta.{0,30}validation|_meta.{0,30}consistency|anzahl_geprueft` → **0 Treffer**.
  - AGENT_MEDIENRECHERCHE.md:157-163 Gate-Urteil prueft nur `100% verified: true`-Quote, aber nicht "_meta.anzahl-Deklaration == real persistierte Bild-Eintraege".
- **Plugin-Defizit:** AGENT_MEDIENRECHERCHE deklariert in `_meta` keine Slot-Anzahl, und es gibt keinen Validator, der die deklarierte Anzahl gegen die tatsaechlich persistierten Bild-Eintraege im `medien_katalog_game.json` (oder in der INHALTSBASIS-Wikimedia-Tabelle) prueft. Run-3-Drift (_meta=19, real=16) wird vom Plugin nicht erkannt.
- **Hardening-Pointer:** `_meta`-Sektion um `anzahl_geprueft`, `anzahl_verified`, `anzahl_persisted` ergaenzen; QI-MV-Gate erweitern um Konsistenz-Check `len(bilder[]) == _meta.anzahl_persisted == _meta.anzahl_geprueft`.

---

## Phase D: Aggregat-Befund

| Status | Anzahl |
|---|---|
| CONFIRMED | 13 |
| REJECTED | 0 |
| INKONKLUSIV | 1 |

| Severity (geschaetzt aus Audit-Schwere F2-F16) | Anzahl |
|---|---|
| HIGH | 9 (F-PB-36, 37, 38, 40, 42, 43, 45, 46, 49) |
| MED | 4 (F-PB-39, 41, 44, 47) |
| LOW | 1 (F-PB-48 INKONKLUSIV / Naming-Konvention) |

---

## Phase E: Plugin-Hardening-Pointer (gruppiert pro Komponente)

### AGENT_SKRIPT (+ VERTRAG_PHASE_0-3_SKRIPT)
- **F-PB-36:** Eingabe um `Q-GATE-LOG_phase_0_2_m.json` + `medien_katalog._meta.fallback_begruendung` erweitern; QS Drift-Verarbeitung neu.
- **F-PB-43:** Ausfuehrbare Validatoren `validate_skript_sk.py` fuer SK4/SK5/SK7/SK18 einfuehren.
- **F-PB-47:** `tools/check_skript_chunks.py` (Wort-Count 600-900W) als PostToolUse-Hook.

### AGENT_INHALT (+ VERTRAG_PHASE_0-2_INHALT)
- **F-PB-38:** Zitat-Tabelle um `aeusserungs_datum` (Pflicht) erweitern; QI3.
- **F-PB-41:** Konzept `briefing.material_kandidaten[]` formal in VERTRAG_PHASE_0-2 einfuehren.

### AGENT_MEDIENRECHERCHE
- **F-PB-37:** Output-Schema um `quellenkritik`-Block (auftragskunst_flag, inszenierungs_hinweis, propaganda_kontext) erweitern.
- **F-PB-39:** §3 Kanal-2-Auswertung um Pflicht-Schritt `extmetadata.DateTimeOriginal` ergaenzen.
- **F-PB-49:** `_meta` um `anzahl_geprueft`/`anzahl_verified`/`anzahl_persisted` erweitern; Konsistenz-Check.

### AGENT_ARTEFAKT
- **F-PB-40:** `medien_katalog_game.json` als Pflicht-Eingabe; Q11 Cross-Check.
- **F-PB-41:** Q12 Coverage-Check `briefing.material_kandidaten` (GEDECKT/AEQUIVALENT/AUSGELASSEN).
- **F-PB-42:** Pflicht-Felder `anker_briefing`/`tafelbild_knoten[]`/`tipp_stufen_slot[]` schemafest verankern.
- **F-PB-48:** Aggregat-Block `lizenz_inventar` mit fixiertem Schema; Naming-Drift verbieten.

### AGENT_DIDAKTIK (+ VERTRAG_PHASE_0-1_DIDAKTIK)
- **F-PB-45:** QD-SCHULART neu einfuehren — Lehrplan-Quelle gegen `jahrgangsstufe` matchen.

### VERTRAG_SPRACHNIVEAU_R7 + tools/
- **F-PB-44:** `tools/check_komposita_erstgebrauch.py` neu — Erstgebrauch-Erklaerung pro Kompositum (>2 Morpheme) validieren; §6 Metrik-Tabelle erweitern.

### Game-weit (assembled data.json + Hooks)
- **F-PB-46:** `tools/check_math_consistency.py` neu; PostToolUse-Hook auf Phase-3-Assembly fuer Header-vs-Body-Counts (Mappen, KEs, Materialien, TZs).

---

## Phase F: Architektonische Quervergleichs-Erkenntnisse

**X1 — Phase-0 hat keine Schemas:** Plugin hat Schemata nur fuer Phase-2-Material und Phase-2.2-Aufgaben. Alle 4 Phase-0-Artefakte (DIDAKTIK_RAHMEN, INHALTSBASIS, ARTEFAKT_INVENTAR/medien_katalog, SKRIPT) sind Markdown ohne JSON-Schema-Validierung. Folge: 9/14 Findings (F-PB-37/38/40/41/42/45/47/48/49) entstehen direkt aus dem Schema-Vakuum in Phase 0.

**X2 — Self-Checks sind ueberwiegend LLM-Anweisungen, keine Validatoren:** Q1-Q13 (SKRIPT), QI1-QI6 (INHALT), Q1-Q10 (ARTEFAKT), QD1-QD10 (DIDAKTIK), Q-MEDIEN-PROSPEKTIV-Gate-Urteil, SK1-SK19, MQ1/MQ5 — alle Pruefpunkte ohne ausfuehrbare Tools, ausser `sprachniveau-gate.js` (R7-Metrik) und Hooks (Schema-Gate Material/Aufgabe). Bei jeder LLM-Halluzination geht der Self-Check daher schweigend durch. Das stuetzt F-PB-43/44/46/47.

**X3 — Hooks decken nur Phase 2/3:** 9 Hooks in `hooks/hooks.json`, davon 0 fuer Phase-0-Artefakte. Plugin-Schutzschicht ist asymmetrisch — Material/Aufgabe sind hart geschuetzt, Phase-0-Vorprodukte ungeschuetzt. Erklaert F-PB-36/40/45/46/49.

**X4 — Schema-Verzeichnis-Drift:** Forensik-Auftrag erwartet `/schemas/`. Real existiert nur `architektur/schemata/`. Es gibt einen einzigen Single-File `schemas/game_state.schema.json` als Inkonsistenz. Das ist die selbe Naming-Drift-Klasse wie F-PB-48 (LLM erfindet zwei Bezeichner, weil Plugin kein klares Naming festschreibt).

**X5 — Cross-Phase-Datenfluss-Luecken:** medien_katalog_game.json (Phase 0.2.M Output) ist nicht als Eingabe in AGENT_ARTEFAKT (Phase 0.2b) oder AGENT_SKRIPT (Phase 0.3) gefuehrt. Das erzeugt Sammlung von Drift-Findings (F-PB-36, F-PB-40, F-PB-49) — das gemeinsame Muster ist "Phase-N+1 ignoriert _meta/Drift-Output von Phase-N".

**X6 — Run-3-v0.4.3-Cowork-Patches sind nicht im Quell-Repo:** `anker_briefing`, `tafelbild_knoten`, `tipp_stufen_slot` (laut Forensik-Auftrag in Run-3 Cowork-Patch v0.4.3 ergaenzt) sind im escape-game-generator-Repo **nicht persistiert** (Volltext-Grep 0 Treffer). Wenn die Patches nur in Cowork-Working-Copy lebten und nie ins Source-Plugin committed wurden, manifestiert sich die "Plugin-Dev-Cowork = Plugin-Prod-CodeMode-Strict-Separation"-Verletzung aus dem Cowork-Memory `feedback_runtime_strict_separation.md`.

---

**Forensik-Status:** 14 Hypothesen verifiziert (13 CONFIRMED, 1 INKONKLUSIV). Phase 5 Run-3-Hardening-Diagnose abgeschlossen. Kein Schreibzugriff auf escape-game-generator/. Bericht persistiert auf Cowork-Output-Pfad.
