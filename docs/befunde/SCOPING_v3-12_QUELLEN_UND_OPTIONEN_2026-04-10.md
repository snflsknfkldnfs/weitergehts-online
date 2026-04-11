# SCOPING v3.12 — Quellen, Optionen und Fachdidaktik-Audit (integriert)

**Anlass:** Befolge-Artefakt zu `BEFUND_LIVE_SICHTUNG_G2_M1_2026-04-10.md` (8 Findings, 4 Querschnitts-Achsen).
**Zweck:** Unifizierte Entscheidungsgrundlage fuer die v3.12-Rundenstruktur. Fuer jedes Finding (a) die strukturelle Quelle im Generator (Datei:Zeile verbatim), (b) 2-4 Interventions-Optionen, (c) technische Nebenwirkungen (S1-S8) UND (d) fachdidaktische Wirkung (D1-D8) mit Loesungsproblem-Katalog (D-01..D-08).
**Abgrenzung:** Keine Implementierungs-Entscheidung. Keine Priorisierung als Fait Accompli. Seed fuer Rundenstruktur-Entscheidung. Dokument **ist** Vorschlag — jedes Bundle und jede Empfehlung wartet auf User-Abnahme.
**Scope-Repos:** Diagnose gegen `escape-game-generator/` (Produkt-Infrastruktur). Engine-Seite (`weitergehts-online/assets/`) nur erwaehnt, wo Engine-Aenderung Voraussetzung ist.

**Datum:** 2026-04-10, Audit-Integration 2026-04-11
**Status:** VORSCHLAG v2 — integriert mit Fachdidaktik-Audit. Wartet auf Scope-Entscheidung.
**Aenderungen v1 → v2:** (1) Neue Dimensions-Schicht D1-D8 (§1.2), (2) neuer Loesungsproblem-Katalog D-01..D-08 (§1.3), (3) fachdidaktische Option-Annotation pro Finding, (4) neue Option **O-01-E Dualistische Stundenfrage-Architektur** (§2.1), (5) revidierte Empfehlungs-Kandidaten markiert mit `[REVIDIERT]`, (6) erweiterte Achsen-Synthese (§3), (7) S×D-Kreuzmatrix in Nebenwirkungs-Ueberblick (§5), (8) offene Fragen von 7 auf 15 erweitert (§6), (9) neue §7 Kurz-Summa fuer Entscheider.

---

## 0. Methode

**Schritt 1 — Quellen-Trace:** Pro Finding wurde die Generator-Infrastruktur (Vertraege, Sub-Agenten, Q-Gates, Schemata, Agent-Dateien) gegrept und die Stelle identifiziert, an der der Defekt strukturell entsteht bzw. nicht verhindert wird. Datei:Zeile sind verifiziert gegen den aktuellen Commit-Stand von `escape-game-generator/`.

**Schritt 2 — Ursache-Mechanik:** Der Weg vom strukturellen Ausloeser zum sichtbaren Defekt im `data.json` wird als Kausalkette beschrieben. Wo mehrere konkurrierende Mechaniken existieren, werden sie als H1/H2/H3 aufgezaehlt und grob gewichtet.

**Schritt 3 — Options-Scoping:** Pro Finding 2-4 Interventions-Optionen mit Angabe von (i) Ort (Vertrag/Sub-Agent/Schema/Q-Gate/Agent-Logik/Engine/Policy), (ii) Groesse des Eingriffs (S/M/L/XL), (iii) Hebelwirkung, (iv) erwarteten **technischen** Nebenwirkungen aus §1.1, (v) **fachdidaktischer** Bewertung durch D1-D8 (§1.2) inklusive Verweis auf ausgeloeste Loesungsprobleme aus §1.3.

**Schritt 4 — Options-Kombinatorik auf Achsen-Ebene:** §3 zeigt fuer jede Achse (A/B/C/D) welche Optionen sich gegenseitig verstaerken, neutral zueinander sind oder konfligieren — technisch und fachdidaktisch separat ausgewiesen.

**Schritt 5 — Doppel-Bewertung:** Pro Achse wird die **technische S-Last** (SCOPING v1) gegen die **fachdidaktische D-Last** (Audit) in einer Kreuz-Matrix abgeglichen. Wo beide Last-Richtungen divergieren (S niedrig, D hoch oder umgekehrt), liegt ein Entscheidungs-Konflikt vor, der explizit benannt wird.

**Zentrale Einsicht:** Technische Minimierung der S-Last fuehrt nicht automatisch zu fachdidaktisch guten Bundles. In Achse A kollidiert die S-guenstigste Option-Kombination direkt mit D-04/D-05. In Achse C verstaerken sich S-Last und D-Last — technisch teuer UND fachdidaktisch zwingend. In Achse D ist eine Option (O-07-P-A) technisch attraktiv, loest aber D-03 aus und muss gestrichen werden.

---

## 1. Nebenwirkungs-Taxonomie (doppelt: technisch + fachdidaktisch)

### 1.1 Technische Risiken (S1–S8)

| Code | Name | Beschreibung |
|---|---|---|
| **S1** | Vertrags-Retrograd-Bruch | Neue Pflicht bricht bestehende Vertraege oder bestehende Artefakte waeren rueckwirkend FAIL. |
| **S2** | Content-Kosten-Explosion | Intervention erzwingt signifikant mehr Material/Prompts/Iterations-Zyklen. |
| **S3** | Form-vs-Inhalt-Spannung | Form-Constraint kollidiert mit inhaltlicher Flexibilitaet (z.B. Frage-Titel-Pflicht vs. Form-Integritaet). |
| **S4** | Dispatch-Komplexitaet | Neue Inter-Agenten-Abhaengigkeit oder neue Reihenfolge-Zwaenge zwischen Sub-Agenten. |
| **S5** | Sub-Agent-Reife-Drift | Intervention setzt Reife von Sub-Agenten voraus, die aktuell unterentwickelt sind (KARTE/ZEITLEISTE/STATISTIK). |
| **S6** | Engine-Runtime-Regression | Aenderung des data.json-Schemas bricht `escape-engine.js`-Rendering fuer bestehende Games. |
| **S7** | Policy-Interaktions-Konflikt | Neue Policy widerspricht bestehender Policy (v3.6 Erzaehlerstimmen vs. Form-Integritaet; Permissive-Check vs. Bloom-Taxonomie). |
| **S8** | Enforcement-Luecke neu | Option loest das inhaltliche Problem, laesst die Pruefung aber weiter undeterministisch — neues Gate-Enforcement-Gap. |

### 1.2 Fachdidaktische Dimensionen (D1–D8)

| Code | Name | Referenzrahmen | Pruef-Frage |
|---|---|---|---|
| **D1** | Quellen-Authentizitaet & Quellenkritik | Droysen, Historik; Pandel, Quellenarbeit | Bleibt die Primaerquelle als Quelle erkennbar? Wird die Grenze Quelle/Darstellung gewahrt? |
| **D2** | Multiperspektivitaet & Kontroversitaet | Bergmann; Beutelsbacher Konsens §2 | Werden konkurrierende Deutungen sichtbar gemacht? Wird Kontroverse nicht geglaettet? |
| **D3** | Historisches Denken (Alteritaet, Kontingenz, Narrativitaet) | Ruesen, Historisches Lernen; Pandel, Historisches Erzaehlen | Wird Geschichte als konstruiert, fremd, offen erfahrbar — oder als geschlossene Erzaehlung konsumiert? |
| **D4** | Kompetenzorientierung & AFB-Taxonomie | Klieme, Bildungsstandards; KMK-AFB I/II/III | Werden Reorganisation, Transfer, Reflexion/Urteil altersgerecht adressiert? Ist die kognitive Anforderung transparent? |
| **D5** | Sachanalytische Substanz & Fachsprache | LehrplanPLUS GPG 7 Bayern; sprachsensibler Fachunterricht | Werden historische Fachbegriffe, Orthographie, fachgerechte Terminologie gewahrt? |
| **D6** | Adressatengerechtigkeit R7 Mittelschule | LehrplanPLUS GPG 7 Mittelschule; Entwicklungspsychologie 12-14 | Sind Sprache, Komplexitaet, Identifikations-Zugaenge fuer R7 angemessen? |
| **D7** | Aufgabenkultur & Feedback-Didaktik | Winter/Leuders; Black & Wiliam; Hattie | Ermoeglichen Aufgaben produktive Fehler, tragendes Feedback, kognitive Aktivierung? |
| **D8** | Narrative Kohaerenz & Motivationspsychologie | Schreiber, Narrative Kompetenz; Deci & Ryan, Selbstbestimmungstheorie | Bleibt die Escape-Rahmen-Narration tragfaehig? Wird intrinsisches Interesse gewahrt? |

**Wichtig:** D1 und D8 stehen in permanentem Zielkonflikt. Hohe Quellen-Authentizitaet (D1) kann narrative Dichte (D8) untergraben; starke Narration (D8) kann Quellen-Reinheit (D1) relativieren. Die v3.6-Policy war ein (gescheiterter) Kompromiss in genau diesem Konflikt.

### 1.3 Fachdidaktische Loesungsprobleme (D-01..D-08)

Die S1-S8-Taxonomie ist technisch-strukturell und faengt folgende **neuen** Loesungsprobleme nicht, die durch die Optionen ausgeloest werden koennen:

| Code | Name | Beschreibung | Getriggerd von |
|---|---|---|---|
| **D-01** | Quellen-Authentizitaets-Verletzung | Option baut Text in Quelle ein, der nicht aus der Quelle stammt. R7 kann Quelle/Darstellung nicht mehr trennen — Verstoss gegen LehrplanPLUS GPG 7 *"Quellen von Darstellungen unterscheiden"*. | v3.6-Erhalt (O-04-B/C), String-only `inhalt` ohne Subtyp (O-05-B) |
| **D-02** | Didaktische Monokultur | Struktur-Zwang produziert gleichfoermige Mappen ohne Themen-Fit. Alibi-Medien (dekorative Karte bei nicht-geographischem Thema). | Hard-Constraint-Matrix ohne Upstream-Verankerung (O-02-A ohne O-02-D) |
| **D-03** | Kompetenz-Deprivation | Option senkt Pruefstrenge so, dass SuS eine Kompetenz-Erfahrung (AFB III, Bloom L5) systematisch nicht mehr machen. Deprivation pflichtiger GPG-7-Kompetenzen. | O-07-P-A (globaler Permissive-Flag); O-07-P-B bei flaechendeckender Anwendung |
| **D-04** | Schueler-Interessen-Ignoranz (Beutelsbach §3) | Operationalisierungs-Pflicht an der Stundenfrage eliminiert biographisch-emotionale Zugaenge, die R7 motivational tragen. | O-01-B (Lemma-Zwang), O-01-C (W-Fragewort-Pflicht) |
| **D-05** | Narrative Dichte-Verlust & Alteritaet | Zu strikte Operationalisierung zerstoert dramaturgische Verdichtung, die historische Alteritaet erfahrbar macht (Ruesen). `Wer ueberlebt?` transportiert Alteritaet, `Wie war die Schlacht?` transportiert sie nicht. | O-01-B, O-01-C |
| **D-06** | Genre-Kompetenz-Verlust | Fragetitel bei Quellen-Materialien trainieren SuS darauf, Tagebuecher/Quellen als "Arbeitsauftraege mit Frage" zu lesen statt als Textsorten. Pandel: Textsorten-Wissen als Teilkompetenz. | Schema-Beschreibung `"als Frage formuliert"` (F-03) global |
| **D-07** | Autoritaets-Verschiebung durch Erzaehlerstimme | "Was Karl nicht wusste, aber wahr ist"-Einschuebe suggerieren einen allwissenden Erzaehler. SuS lernen, dem Erzaehler mehr zu vertrauen als der Quelle — widerspricht Pandel: "Geschichte als Konstruktion". | v3.6-Policy generell (O-04-B/C) |
| **D-08** | Operator-Verkappung | `"Operator nicht woertlich nennen"`-Regel kollidiert mit Klieme-Forderung nach Aufgaben-Transparenz. R7 braucht bei Reorganisations-/Transfer-Aufgaben explizite Operator-Nennung. | SUB_AUFGABE_FREITEXT Kurzregel (Z. 243) |

**Lese-Regel:** S1-S8 und D-01..D-08 sind **orthogonal** und muessen beide bilanziert werden. Fast jede Option hat >0 Nebenwirkungen in mindestens einer Dimension — die Aufgabe ist die Wechselwirkungs-Kontrolle, nicht die Elimination.

---

## 2. Findings — Quellen, Optionen und Doppelbewertung

### F-LS-M1-01 — Stundenfrage nicht gegroundet

**Quellen-Trace:**
- `agents/AGENT_HEFTEINTRAG.md:44` — *"Aus dem SKRIPT-Chunk die Stundenfrage WORTWOERTLICH uebernehmen (= Chunk-Ueberschrift = einstieg.problemstellung)"* + `IDENTITAETS-CONSTRAINT (C1b)`. Die Stundenfrage wird bereits in Phase 0.3 (SKRIPT) fixiert und durch Phase 0.4 hart an alle weiteren Phasen vererbt.
- `architektur/vertraege/VERTRAG_PHASE_2-0_RAHMEN.md:93-94,107` — C1b prueft Text-Identitaet, nicht Beantwortbarkeit.
- `architektur/Q-GATE-MECHANIK.md:190-191` — C1b (Identitaet) + M3b (Kernerkenntnisse-Identitaet zu Tafelbild) sind die einzigen Gates am Stundenfrage-Objekt. Kein SF-GROUND, kein "Material-deckt-Stundenfrage".
- `agents/AGENT_SKRIPT.md` — implizit: hier entsteht die Stundenfrage als Chunk-Ueberschrift. Keine Grounding-Pflicht.

**Ursache-Mechanik (gewichtet):**
1. **H1 (dominant):** Stundenfrage wird in Phase 0.3 (SKRIPT) ohne Material-Korpus-Rueckkopplung gewaehlt und per C1b hart fixiert. Spaetere Phasen koennen sie nicht korrigieren, selbst wenn das Material die Frage nicht deckt.
2. **H2:** Die Stundenfrage optimiert rhetorisch-dramaturgisch (`Wer ueberlebt...`), weil AGENT_SKRIPT narrativ dichtet; ein neutral-operationaler Operator (`Wie war...`) waere dramaturgisch flach.
3. **H3:** Q-Gate M3b prueft nur, dass `scpl.loesung[]` mit dem Tafelbild-Entwurf uebereinstimmt — NICHT, dass `scpl.loesung[]` die Stundenfrage tatsaechlich beantwortet.

**Optionen:**

- **O-01-A (Grounding-Gate, LLM-Judge)** — S — Neuer Gate `SF-GROUND` in §7.3 Q-GATE-MECHANIK. LLM-Judge: *"Beantworten die `scpl.loesung[]`-Saetze semantisch die Stundenfrage? (ja/nein/teilweise)"*. Enforcement: LLM-Call in Phase 2.0 oder 2.1c. Pflichtpass vor C1b.
  - **Technisch (S):** S8 (LLM-Judge nicht deterministisch), S4 (neue Dispatch-Abhaengigkeit).
  - **Fachdidaktisch (D):** D4 · (neutral). LLM-Urteil ueber Kompetenz-Passung ist intersubjektiv fragwuerdig — didaktische Pruefung verlangt explizite Kriterien. Als weiche Qualitaets-Warnung zulaessig, nicht als Hard-Gate.
  - **Hebel:** Mittel. Faengt flache Faelle, judge-abhaengig.

- **O-01-B (Grounding-Gate, deterministisch, lemma-basiert)** — M — Extrahiere Kern-Nomina/Verben aus der Stundenfrage, pruefe ob jedes Kern-Lemma mindestens einmal in `scpl.loesung[]` auftritt (nach Stop-Liste-Filter, gleiche STOP_DEFAULT wie L-DUP §7.3 Anhang A). Fallback: Synonym-Liste.
  - **Technisch (S):** S3 (manche pragmatisch-ok Stundenfragen scheitern am Lemma-Check), S1 (bestehende Games koennen retrograd FAIL werden).
  - **Fachdidaktisch (D):** **D2 −, D3 −−, D8 −.** Lemma-Check verbietet metaphorische und biographisch-konkrete Stundenfragen, die in der Forschung (Sauer, Pandel) als legitimer Zugang zu Mikrogeschichte und Alteritaet gelten. **Loest D-04 und D-05 aus.**
  - **Hebel:** Mittel-hoch. Deterministisch, aber zu streng fuer metaphorische Fragen.

- **O-01-C (Upstream-Verschiebung in Phase 0.3)** — L — AGENT_SKRIPT bekommt neue Pflicht: Chunk-Ueberschrift muss "operationalisierbar" sein. Enthaelt einen W-Fragewort-Operator aus Katalog `{Wie, Warum, Wodurch, Inwiefern}`, kein rhetorisch-wertendes Nomen (`Wer ueberlebt` → verboten).
  - **Technisch (S):** S1 (alle bestehenden SKRIPT-Artefakte retrograd FAIL), S2 (teurere SKRIPT-Iteration), S3.
  - **Fachdidaktisch (D):** **D3 −−, D6 −, D8 −−. Kritisch.** Verbot von Fragen mit rhetorisch-wertendem Nomen eliminiert genau den Zugang, der R7-Adressaten biographisch packt (Beutelsbach §3) und Alteritaet erfahrbar macht. **Loest D-04 und D-05 scharf aus.**
  - **Hebel:** Hoch bei H1, aber die Hebelwirkung geht auf Kosten der didaktischen Substanz.

- **O-01-D (C1b weichen)** — L — Identitaets-Constraint C1b wird abgeschaltet oder auf "referenziert" umgestellt: Phase 2.0 darf die Stundenfrage gegenueber Phase 0.3 ueberarbeiten, wenn eine Grounding-Pruefung das erzwingt. Audit-Trail als Pflicht.
  - **Technisch (S):** S1 (massiv — C1b ist eine der aeltesten Konsistenz-Saeulen), S4 (Phase 2.0 muss Hefteintrag patchen).
  - **Fachdidaktisch (D):** **D2 +, D3 +.** Trennt narrativen Raum (SKRIPT) vom operationalen Raum (Rahmen) — didaktisch sauber.
  - **Hebel:** Sehr hoch, aber S1 massiv — architektonischer Bruch.

- **O-01-E (Dualistische Stundenfrage-Architektur)** — **L, neu in v2** — Statt C1b entfernen oder Phase 0.3 zwingen wird das Stundenfrage-Objekt **dualisiert**. Schema-Erweiterung in Phase-0-4/Phase-2-0: `stundenfrage: {narrativ: string, operational: string}`. `narrativ` ist SuS-sichtbar, biographisch-motivational, kein Operator-Zwang (`Wer ueberlebt die Schlacht an der Marne?`). `operational` ist intern, Material-Grounding-Kopplung, Operator-gepraegt (`Wie erlebten Soldaten die Materialschlacht an der Marne?`). Beide **muessen semantisch kongruent** sein (geprueft durch O-01-A als weicher Judge), aber nicht identisch. C1b wird auf `operational` umgestellt; Hefteintrag-Stundenfrage = `narrativ`; Material-Grounding-Gate laeuft gegen `operational`.
  - **Technisch (S):** S1 (Schema-Migration 0.4/2.0), S4 (Phase 2.0 muss beide Felder pflegen), S6 (Engine muss `narrativ` rendern, ignoriert `operational`).
  - **Fachdidaktisch (D):** **D2 +, D3 ++, D4 +, D6 +, D8 ++.** Behebt den zentralen Konflikt, ohne D-04/D-05 auszuloesen. Erhaelt motivational-biographische Zugaenge UND erlaubt deterministisches Grounding.
  - **Hebel:** Sehr hoch. Fachdidaktisch die sauberste Architektur, technisch mittelinvasiv.

**Empfehlungs-Kandidat [REVIDIERT v2]:**
> Bundle **O-01-E (dualistische Architektur)** + **O-01-A (LLM-Judge als weicher Kongruenz-Check)** + **O-01-B als deterministischer Grounding-Check gegen `stundenfrage.operational`** (nicht gegen `narrativ`).
> Verworfen: **O-01-C** (loest D-04/D-05 aus). Verworfen als alleinige Loesung: **O-01-D** (architektonischer Bruch ohne konstruktiven Ersatz).
> **v1-Empfehlung (O-01-B + O-01-C + O-08-B) ist fachdidaktisch zurueckgezogen.**

---

### F-LS-M1-02 — Medien-Monokultur in Mappe 1

**Quellen-Trace:**
- `agents/AGENT_MATERIAL.md:162` — *"Minimum 4, idealerweise 5-6 Materialien."* — nur Mengen-Constraint, kein Typ-Mix.
- `agents/AGENT_MATERIAL.md:181-182` — Constraint ist SCPL-Zonen-Abdeckung, nicht Medien-Diversitaet.
- `architektur/vertraege/VERTRAG_PHASE_2-1_MATERIAL.md:219` — **nur Perspektiven-Verteilung** ist verpflichtend (min 3 Perspektiven pro Mappe), kein Medien-Mix-Constraint.
- `agents/AGENT_MATERIAL.md:57-59,135-136,480-481,617,637-638` — SUB_MATERIAL_KARTE, SUB_MATERIAL_ZEITLEISTE, SUB_MATERIAL_STATISTIK existieren, sind aber im Fallback auf `bildquelle`/`zeitleiste` gemappt (Z. 57/59).
- **Kein Q-Gate `MED-DIV`** in §7.1.

**Ursache-Mechanik:**
1. **H1 (dominant):** Kein struktureller Diversitaets-Constraint. AGENT_MATERIAL hat einen Typ-Auswahl-Katalog (Zeile 125-136), der aber nicht prueft, ob die **gesamte Mappe** einen Mix bildet.
2. **H2:** Sub-Agent-Reife-Asymmetrie — Text-Sub-Agenten (TAGEBUCH/QUELLENTEXT/DARSTELLUNGSTEXT) sind ausgereift, KARTE/ZEITLEISTE/STATISTIK weniger robust und fallen im Fallback auf `bildquelle`/`zeitleiste`. Das bestraft Nicht-Text-Materialien implizit.
3. **H3:** DIDAKTIK_RAHMEN (Phase 0.1) spezifiziert keine Repraesentationsform-Planung. Die Mappe bekommt ihre Typ-Verteilung erst in Phase 2.1.

**Optionen:**

- **O-02-A (Hard-Constraint Diversitaets-Matrix)** — M — Neue §: *"Pro Mappe mindestens ein nicht-textuelles Material (bildquelle, karte, statistik oder zeitleiste). Bei geographischem Thema zwingend mindestens eine karte. Bei Prozess/Verlaufs-Thema zwingend mindestens eine zeitleiste."* Hard-FAIL im Gate.
  - **Technisch (S):** S1 (bestehende Games retrograd FAIL), S5 (zwingt unterentwickelte Sub-Agenten), S2.
  - **Fachdidaktisch (D):** **D1 − bei Alibi-Zwang, D2 + bei Themen-Fit.** Generischer `min 1 nicht-Text`-Zwang produziert dekorative Medien ohne historische Aussage. **Loest D-02 aus**, falls nicht themenspezifisch formuliert.
  - **Hebel:** Hoch nur bei themenspezifischer Matrix.

- **O-02-B (Soft-Warning + Begruendungs-Pflicht)** — S — Gleiche Matrix, aber bei Verletzung nur WARN mit Pflicht-Begruendungs-Feld `_meta.medien_diversitaet_abweichung`. Game deployt trotzdem.
  - **Technisch (S):** S8 (Enforcement weich), S3 gering.
  - **Fachdidaktisch (D):** Neutral. Verlagert Entscheidung auf Author.
  - **Hebel:** Niedrig-mittel.

- **O-02-C (Sub-Agent-Reife-Programm parallel)** — L — SUB_MATERIAL_KARTE, SUB_MATERIAL_ZEITLEISTE, SUB_MATERIAL_STATISTIK auf gleiche Reife wie TAGEBUCH/QUELLENTEXT heben: (i) Asset-Anbindung (Wikimedia-Search), (ii) Template-Beispiele, (iii) Q-Gate-Testlauf mit Dummy-Material. Erst nach Reife-Gate wird O-02-A aktiviert.
  - **Technisch (S):** S2 (Infrastruktur-Investment), S4.
  - **Fachdidaktisch (D):** **D1 +, D2 +, D4 +, D5 +.** Ohne reife Sub-Agenten produziert selbst ein Diversitaets-Zwang didaktisch schwache Materialien. Voraussetzung, nicht Kuer.
  - **Hebel:** Sehr hoch mittelfristig, null kurzfristig.

- **O-02-D (Phase-0.1-Verschiebung: Repraesentationsform-Planung in DIDAKTIK)** — M — AGENT_DIDAKTIK bekommt neuen Output: Pro Mappe `medien_skizze: {karte: bool, zeitleiste: bool, statistik: bool, bildquelle: bool}` auf Basis der Mappen-Natur. AGENT_MATERIAL liest die Skizze und folgt ihr.
  - **Technisch (S):** S1, S4.
  - **Fachdidaktisch (D):** **D1 +, D2 +, D3 +, D4 +.** Repraesentationsform-Entscheidung gehoert fachdidaktisch in die DIDAKTIK-Phase (Bruner: enaktiv/ikonisch/symbolisch; Pestalozzi: Kopf/Herz/Hand). Dort wird entschieden, welche Mappe eine Karte *braucht*. **Starker Upstream-Anker gegen D-02.**
  - **Hebel:** Hoch. Behebt Ursache Upstream.

**Empfehlungs-Kandidat [REVIDIERT v2]:**
> Reihenfolge umgekehrt gegenueber v1: **O-02-D zuerst** (Upstream-Anker im DIDAKTIK) → **O-02-C** (Reife-Programm) → **O-02-A nur themenspezifisch** (geographisch → Karte, Verlauf → Zeitleiste, quantitativ → Statistik), niemals generisch. O-02-A ohne O-02-D ist abzulehnen, weil D-02 ausgeloest wuerde.

---

### F-LS-M1-03 — Tagebuch-Titel haben Frage-Form

**Quellen-Trace:**
- `architektur/schemata/material-output-schema.json:139-143` — `titel` description: *"Soll als Frage formuliert sein (SuS-aktivierend)."* — das Schema schreibt Frage-Titel fuer **alle** Material-Typen fest, typ-agnostisch.
- `agents/SUB_MATERIAL_TAGEBUCH.md:233` — MQ2: *"Tagebuch-Titel koennen auch perspektivisch formuliert sein"* — WARN-Lockerung, immer noch Frage-Form.
- `agents/SUB_MATERIAL_QUELLENTEXT.md:280` — MQ2 (v3.10.4): *"Titel ist Frage oder praegnanter Kontextsatz — KEINE nominalisierte Konzeptnennung."*
- **Kein Q-Gate `MAT-TITEL-FORM`** mit typ-spezifischer Differenzierung.

**Ursache-Mechanik:** Schema-Beschreibung wirkt als weicher Default, den Sub-Agenten als Wahrheit lesen. Tagebuch-MQ2 lockert nur zu "perspektivisch formulierte Frage". Tagebuch-konforme Titel (`Tagebucheintrag von Karl Meissner, Gefreiter an der Westfront`) sind schemakonform, aber die Sub-Agenten wurden darauf nicht konditioniert.

**Optionen:**

- **O-03-A (Schema-Beschreibung ersetzen, typ-agnostisch)** — S — `"Titel des Materials. Titel-Form richtet sich nach Typ — siehe SUB_MATERIAL_*-Pattern."`.
  - **Technisch (S):** S1 gering (Description ist nicht validation-relevant).
  - **Fachdidaktisch (D):** Neutral allein, notwendige Voraussetzung fuer O-03-B.
  - **Hebel:** Niedrig allein.

- **O-03-B (Typ-spezifische Titel-Pattern in Sub-Agenten)** — S — Jeder SUB_MATERIAL_*.md bekommt ein `Titel-Pattern`-Feld. Fuer `tagebuch`: `"Tagebucheintrag von {figur.name}, {figur.rolle}"` oder `"Aus dem Tagebuch des {figur.rolle} {figur.name}, {figur.ort}"`. Fuer `quellentext`-Einzelstimme: `"[Rolle] [Name] zu [Thema]"`. Fuer `darstellungstext`: Frage bleibt erlaubt. Fuer `bildquelle`: Kontextsatz.
  - **Technisch (S):** S1 (alle bestehenden Games retrograd WARN/FAIL), S4 (Zugriff auf `_meta.figur` — v3.10 T2.F-Luecke).
  - **Fachdidaktisch (D):** **D1 ++, D2 +, D3 ++, D5 +, D8 +. Stark.** Tagebuch-Titel in authentischer Form wahrt die Genre-Konvention; Fragetitel bei Quellen-Materialien zerstoeren Genre-Kompetenz fuer R7. **Haelt D-06 fern.**
  - **Hebel:** Mittel-hoch, direkt.

- **O-03-C (Neues Q-Gate MAT-TITEL-FORM, typ-sensitiv)** — M — Deterministischer Check in §7.1. Pro `typ` ein Regex/Pattern-Match. Tagebuch: `^Tagebucheintrag|^Aus dem Tagebuch|^(Notizen|Feldpost)`. Quellentext: frei. Darstellungstext: endet mit `?` erlaubt.
  - **Technisch (S):** S1 massiv, S3 (enges Regex killt kreative Varianten).
  - **Fachdidaktisch (D):** D1 +. Brittle.
  - **Hebel:** Mittel. Darf nicht alleiniger Durchsetzer sein.

- **O-03-D (Schema-Level `$defs/TagebuchMeta` mit `titel_pattern`-Enum)** — M — Schema-Erweiterung via `oneOf`-Diskriminator (wie v3.10 T2.F-Ticket). Feld `_meta.titel_pattern: "eintrag_name_rolle" | "ort_datum" | "figur_anrede"`.
  - **Technisch (S):** S1 (bricht bestehende Tagebuch-Materialien), S4 (T2.F-Ticket-Ausweitung), S6.
  - **Fachdidaktisch (D):** D1 +, D4 +.
  - **Hebel:** Hoch — Schema enforced.

**Empfehlungs-Kandidat [unveraendert v2, fachdidaktisch verstaerkt]:**
> **O-03-A + O-03-B** als Minimal-Paket (Schema-Description-Fix + Sub-Agent-Pattern). **O-03-C** nur als Gate-Hinzunahme, wenn Enforcement-Gap geschlossen wird. **O-03-D** bei v3.10 T2.F-Ticket-Umsetzung mitnehmen. Fachdidaktische Begruendung explizit: D-06 (Genre-Kompetenz-Verlust) muss verhindert werden.

---

### F-LS-M1-04 — M2 Karl: Erzaehlerstimmen-Einschub didaktisch fehlplatziert

**Quellen-Trace:**
- `agents/SUB_MATERIAL_TAGEBUCH.md:127` — v3.6-Policy: *"Systemisches Wissen wird transportiert durch: (a) einen kursiven Erzaehlerstimme-Rahmen VOR oder NACH dem Tagebuchabsatz, oder (b) das zugehoerige Darstellungstext-Material, oder (c) die Lehrkraft im UG."*
- Position-Constraint: *"VOR oder NACH"* — betrifft F-06.
- `architektur/Q-GATE-MECHANIK.md:156` — `TYP-TB-PERSPEKTIV`: belohnt Existenz des Erzaehler-Einschubs, prueft aber nicht Notwendigkeit.
- **Kein Trigger-Kriterium** im Policy-Text fuer "Wann darf/muss ein Erzaehler-Einschub feuern".

**Ursache-Mechanik:**
Die v3.6-Policy wurde eingefuehrt, weil Tagebuch-Materialien in fruehen Versionen systemisches Wissen in die Figurenrede packten (Wissensgrenze-Verletzung). Die Loesung "Erzaehlerstimmen-Rahmen" adressiert das Symptom, erzeugt aber zwei neue Probleme:
1. **Trigger zu weit:** Jede systemische Information triggert den Einschub.
2. **Form-Bruch belohnt:** Der Gate wertet Existenz positiv, nicht Notwendigkeit.

**Optionen:**

- **O-04-A (v3.6-Policy abschaffen, systemisches Wissen in Schwester-Material)** — XL — Tagebuch-`inhalt` darf NUR Figuren-Stimme enthalten. Systemisches Wissen wird in ein separates `darstellungstext`-Material oder in eine `info_box` (siehe F-06 O-06-A) ausgelagert.
  - **Technisch (S):** S1 (v3.6-Games retrograd), S2 (mehr Materialien — Kollision mit Mengen-Limit §2.1), S7 (Policy-Rueckbau bricht Historie).
  - **Fachdidaktisch (D):** **D1 +++, D2 +, D3 ++.** Quelle bleibt Quelle, Darstellung bleibt Darstellung — fachwissenschaftlich unverhandelbar. **Aber D8 −−:** Tagebuch-Immersion verliert die sofort-erklaerenden Ergaenzungen, die R7 stuetzen. **Haelt D-01 und D-07 fern.**
  - **Hebel:** Sehr hoch. Radikale Form-Integritaet.

- **O-04-B (v3.6 erhalten, Trigger deterministisch verschaerfen)** — M — Policy bleibt, aber mit explizitem Trigger-Kriterium: *"Erzaehler-Einschub NUR wenn die Figurentext-Passage ohne den Einschub einen didaktisch relevanten Fehlschluss beim SuS erzeugen wuerde."* Trigger-Begruendung in `_meta.erzaehler_einschub_trigger`.
  - **Technisch (S):** S8 (Trigger weich), S4, S1.
  - **Fachdidaktisch (D):** **D1 −, D7 −. Bleibt ausgesetzt auf D-01 und D-07.** Ein Tagebuch mit Erzaehler-Einschub bleibt hybrides Material, bei dem R7 die Grenze Quelle/Darstellung nicht trennscharf erkennt.
  - **Hebel:** Mittel-hoch. Loest das Feuer-Problem ohne Policy-Bruch, aber das Grundproblem bleibt.

- **O-04-C (Gate TYP-TB-PERSPEKTIV umdrehen)** — S — Erfordert O-04-B. Gate prueft: Einschub ohne dokumentierten Trigger → FAIL.
  - **Technisch/Fachdidaktisch:** Erbt O-04-B.

- **O-04-D (Figuren-Wahl: Rollen-/Rangstufen-Matching)** — M — Wenn systemische Information gebraucht wird, waehle eine Figur, die sie wissen kann (Offizier statt Gefreiter; Sanitaetsstabsarzt; Ingenieur). Dann entfaellt der Erzaehler-Einschub, weil die Figur das Wissen selbst ausspricht.
  - **Technisch (S):** S2 (neue Figurenwahl-Schleife), S7 (bricht "authentische R7-Erfahrungsperspektive").
  - **Fachdidaktisch (D):** **D1 ++, D2 +, D3 +, D4 +, D5 +, D6 +, D8 +.** Fachdidaktisch elegant: historische Figuren in adaequaten Positionen transportieren das Wissen natuerlich. Kollision mit "einfacher Gefreiter als Identifikationsfigur" ist loesbar durch **Doppel-Figur pro Mappe** (ein Identifikations-, eine Einordnungs-Figur).
  - **Hebel:** Mittel-hoch. Verschiebt das Problem auf Figurenwahl.

**Empfehlungs-Kandidat [REVIDIERT v2]:**
> **Pfad C-ABSCHAFFEN** als fachdidaktische Norm gesetzt: Bundle **O-04-A + O-04-D** (Quelle rein, Rollen-Doppel-Figuren kompensieren den Wissens-Flow) + **O-06-A** (info_box fuer nicht-figuren-gebundenen Kontext).
> **v1-Haltung "Entscheidung offen, O-04-A kann, O-04-B+C kontrollierbar"** ist fachdidaktisch zurueckgenommen: O-04-B+C belaesst D-01 und D-07 chronisch ausgeloest.

---

### F-LS-M1-05 — M4 Sprecher-Attribution + schwammiger Titel

**Quellen-Trace:**
- `architektur/schemata/material-output-schema.json:145-185` — `inhalt` ist `oneOf` (String/Array/Object), Quellentext faellt auf String-HTML-Block. **Kein `stimmen[]`-Subtyp.**
- `agents/SUB_MATERIAL_QUELLENTEXT.md:214,218,280` — Rekonstruktions-Format, Sprecher als Textpraefix erlaubt, MQ2 Titel-Regel ohne Zweck-Check.
- Engine: `escape-engine.js` rendert `inhalt` als rohes HTML. Kein Sprecher-Komponenten-Markup.

**Ursache-Mechanik:** Schema kennt Mehrstimmen-Struktur nicht. Sub-Agent muss Sprecher-Trennung manuell ueber HTML modellieren, was inkonsistent bleibt. Titel-Zweck ist nicht Teil von MQ2.

**Optionen:**

- **O-05-A (Schema-Erweiterung `QuellentextMehrstimmen`)** — L — Neuer Subtyp im `oneOf` von `inhalt`: `{"stimmen": [{"sprecher": string, "rolle": string, "text": string, "rekonstruiert": bool, "quelle": string}]}`.
  - **Technisch (S):** S6 (Engine-Runtime-Regression), S1 (HTML-kodierte Mehrstimmen-Quellen migrations-pflichtig), S4.
  - **Fachdidaktisch (D):** **D1 ++, D2 ++, D3 +, D4 +, D6 +.** Mehrstimmigkeit ist der strukturelle Ausdruck von Multiperspektivitaet. Schema-Subtyp zwingt zu expliziter Sprecher-Attribution — historisch-methodisch korrekt.
  - **Hebel:** Hoch.

- **O-05-B (HTML-Pattern-Convention ohne Schema-Aenderung)** — S — Im Sub-Agenten-Template: `<figure class="stimme" data-sprecher="..." data-rolle="..."><blockquote>...</blockquote><figcaption>...</figcaption></figure>`. Engine-CSS stylt die Klasse.
  - **Technisch (S):** S8, S6 (CSS-only).
  - **Fachdidaktisch (D):** D1 +, D2 +. Interim, verlagert methodische Rigor in HTML-Konvention.
  - **Hebel:** Mittel. Schnell, brittle.

- **O-05-C (Neuer Gate TITEL-ZWECK, SUB-Agent-lokal)** — S — Titel muss operationalen Fokus (`Zwei Perspektiven auf Verdun`) oder Tagebuch-Form oder kontextualisierenden Statement-Satz haben. Rhetorisch-wertende Fragen nur erlaubt, wenn durch Material-Inhalt klar beantwortbar.
  - **Technisch (S):** S8, S3.
  - **Fachdidaktisch (D):** D4 +, D6 +.
  - **Hebel:** Mittel.

- **O-05-D (Operator-Titel-Katalog fuer Quellentext)** — M — Pro Material-Typ erlaubter Titel-Operator-Katalog. Sub-Agent waehlt Template.
  - **Technisch (S):** S3, S1.
  - **Fachdidaktisch (D):** D4 +, **D8 −** (Monotonie-Risiko im narrativen Rahmen).
  - **Hebel:** Mittel.

**Empfehlungs-Kandidat [unveraendert v2]:** **O-05-A + O-05-C**. O-05-B als Uebergang, falls Schema-Runde verschoben wird.

---

### F-LS-M1-06 — M5 Friedrich: Erzaehler-Einschub mittendrin statt Info-Box

**Quellen-Trace:**
- `agents/SUB_MATERIAL_TAGEBUCH.md:127` — *"VOR oder NACH dem Tagebuchabsatz"* — Policy erlaubt zwei Positionen; M5 hat ihn mittendrin, nicht vom Gate gefangen.
- `architektur/schemata/material-output-schema.json` — **kein `info_box`-Feld**.
- Engine: monolithisches `inhalt`-HTML.

**Abgrenzung zu F-04:** F-04 = Trigger-Problem. F-06 = Positions-Problem. Orthogonal — ausser in **Pfad C-ABSCHAFFEN**, wo F-06 grossteils entfaellt.

**Optionen:**

- **O-06-A (Schema-Erweiterung `info_box`)** — M — Neues optionales Feld pro Material: `"info_box": {"titel": string, "inhalt": string, "zweck": "fachlicher_kontext" | "begriffsklaerung" | "weiterfuehrend"}`.
  - **Technisch (S):** S6 (Engine `<aside>`/Card-Rendering), S1, S4.
  - **Fachdidaktisch (D):** **D1 ++, D2 +, D3 ++, D4 +, D6 +.** Saubere Trennung von Figurentext und fachlichem Kontext — Schulbuch-Konvention (Randspalte/Info-Box).
  - **Hebel:** Hoch. Trennt Figuren-Stimme sauber von Kontext.

- **O-06-B (Position-Check deterministisch pro `<em>`-Block)** — S — Gate-Addendum: `inhalt`-String wird parsed, `<em>`-Bloecke extrahiert, Position geprueft. FAIL wenn `<em>` zwischen Figuren-`<p>`.
  - **Technisch (S):** S1, S8, S3.
  - **Fachdidaktisch (D):** Neutral.
  - **Hebel:** Niedrig-mittel.

- **O-06-C (Post-Dispatch Migrate)** — S — Sub-Agent produziert frei, Vertrag-Script verschiebt alle `<p><em>...</em></p>` ans Ende.
  - **Technisch (S):** S3, S8.
  - **Fachdidaktisch (D):** Neutral.
  - **Hebel:** Niedrig — Pflaster.

**Empfehlungs-Kandidat [unveraendert v2]:** **O-06-A** als strukturelle Loesung, O-06-B als Interim. O-06-C abgelehnt. **Im Pfad C-ABSCHAFFEN ist O-06-A ohnehin Pflicht-Begleiter von O-04-A.**

---

### F-LS-M1-07 — Aufgabe 6: Umlaute + zu strenge Korrektheits-Pruefung

**Quellen-Trace — Umlaut-Dimension:**
- `architektur/Q-GATE-MECHANIK.md:179` — TYP-01-A als Katalog-Eintrag ohne Script-Enforcement.
- `architektur/vertraege/VERTRAG_PHASE_0-1_DIDAKTIK.md:123`, `0-2_INHALT.md:142`, `0-3_SKRIPT.md:166`, `0-4_HEFTEINTRAG.md:169` — **alle vier Phase-0-Vertraege fordern: "Sprache: Deutsch, Umlaute als ae/oe/ue (Dateikompatibilitaet)"**. Struktureller Primaer-Defekt.
- `agents/SUB_AUFGABE_BEGRUENDUNG.md:113-114` — Beispiel verwendet ASCII. Sub-Agent-Template modelliert ASCII-Output.
- `agents/SUB_AUFGABE_BEGRUENDUNG.md:193` — Engine-Pruefung laut Spec *"fuzzy, Umlaut-tolerant"*.
- `agents/SUB_AUFGABE_FREITEXT.md:322`, `AGENT_HEFTEINTRAG.md:278` — Phase-2-Dokumente fordern UTF-8. **Phasen-Policy-Konflikt.**
- `architektur/Q-GATE-MECHANIK.md:207-220` — STOP_DEFAULT enthaelt selbst ASCII (*"ueber", "fuer", "koennen", "muessen"*).

**Quellen-Trace — Pruefstrenge-Dimension:**
- `agents/SUB_AUFGABE_BEGRUENDUNG.md:67-69,172-175` — CER-Struktur mit `_meta.akzeptierte_claims` (min 2) + `evidence[]` ANY-Match + `reasoning_schluesselbegriffe` Schwelle. Engine-Pruefung ist semantisch gewollt streng (didaktische Leistung: Bewertung statt Wiedergabe).
- **Kein `pruef_modus`-Feld** in Aufgaben-Schema. **Kein Engine-Feature-Flag.**
- `VERTRAG_PHASE_2-2b_AUFGABE.md:125` — typ-Enum geschlossen.

**Ursache-Mechanik:**
*Umlaut-Dimension:* Phase-0-Vertraege fordern ASCII ("Dateikompatibilitaet" — obsolete Begruendung), Phase-2-Dokumente UTF-8. Phase-2.2b-Aufgaben referenzieren Phase-0-Artefakte und uebernehmen deren ASCII. Sub-Agent-Templates selbst ASCII-kontaminiert. TYP-01-A ohne Enforcer.

*Pruefstrenge-Dimension:* CER-Schema ist didaktisch begruendet (Bewertungs-Leistung, Bloom L5). Der User-Wunsch "weniger streng" ist **mehrdeutig** — drei Lesarten (L1/L2/L3 siehe Revision).

**Optionen (Umlaut):**

- **O-07-U-A (Phase-0-Vertraege umstellen auf UTF-8)** — L — Zeile *"Sprache: Deutsch, Umlaute als ae/oe/ue"* in allen vier Phase-0-Vertraegen ersetzen durch *"Sprache: Deutsch, Umlaute als echte UTF-8 (ä/ö/ü/ß). Begruendung 'Dateikompatibilitaet' ist obsolet."*. AGENT_SKRIPT, AGENT_DIDAKTIK, AGENT_INHALT, AGENT_HEFTEINTRAG werden angepasst.
  - **Technisch (S):** S1 (alle bestehenden Phase-0-Artefakte retrograd inkonsistent), S8 (ohne Enforcement schwach).
  - **Fachdidaktisch (D):** **D5 ++, D1 +, D6 +.** Orthographische Korrektheit ist Bildungsauftrag (sprachsensibler Fachunterricht).
  - **Hebel:** Hoch — behebt Upstream-Ursache.

- **O-07-U-B (Deterministischer TYP-01-A-Checker als Script)** — S — `tools/typ-check-aufgaben.sh`. Grep gegen ASCII-Ersatz-Muster in `aufgaben[*].{frage,tipps[*].text,feedback[*].text,loesung.claim,loesung.reasoning,loesung.evidence[*]}`. Blocking-Gate in Phase-2.2b-Abschluss und Deploy-Check.
  - **Technisch (S):** S1 (Marne-Game sofort FAIL), S3 (ae/oe/ue als legitime Abkuerzung — Whitelist noetig).
  - **Fachdidaktisch (D):** D5 +.
  - **Hebel:** Sehr hoch.

- **O-07-U-C (Post-Dispatch-Normalisierung)** — M — AGENT_AUFGABE: Post-Processing ASCII-Ersatz → UTF-8-Umlaute via deterministische Mapping-Tabelle. Whitelist fuer Fachbegriffe.
  - **Technisch (S):** S3 (Fehlmapping — "Mueller"/"Queue"), S8.
  - **Fachdidaktisch (D):** **D5 −.** Risiko: produziert neue Orthographie-Fehler bei Eigennamen/Lehnwoertern. Schlechter als Upstream-Fix.
  - **Hebel:** Hoch. Pflaster.

- **O-07-U-D (Sub-Agent-Template-Saeuberung)** — S — ASCII-Beispiele in SUB_AUFGABE_*.md und STOP_DEFAULT-Listen auf echte Umlaute umstellen.
  - **Technisch (S):** S1 gering, S8.
  - **Fachdidaktisch (D):** D5 +.
  - **Hebel:** Niedrig-mittel — notwendig, nicht hinreichend.

**Optionen (Pruefstrenge):**

- **O-07-P-A (Globales Engine-Flag PERMISSIVE_CHECK_MODE)** — M — `data.meta.pruef_modus === "permissive"` deaktiviert alle semantischen Pruefungen. Feedback faellt auf neutralen Text zurueck.
  - **Technisch (S):** S7 (gesamte Pruefstrenge-Architektur lokal deaktiviert), S6.
  - **Fachdidaktisch (D):** **D3 −−−, D4 −−−, D7 −−. Kritisch.** CER-Schema ist Kompetenz-Operationalisierung nach AFB III/Bloom L5. Deaktivierung deprivilegiert pflichtige GPG-7-Kompetenz (Sachurteil/Werturteil). **Loest D-03 aus.**
  - **Hebel:** Sehr hoch kurzfristig, langfristige Deformation.

- **O-07-P-B (Pro-Aufgabe `pruef_modus`-Feld)** — M — `aufgabe.pruef_modus: "streng" | "nicht_leer" | "lehrer_eval"`. Default bleibt "streng".
  - **Technisch (S):** S1 (Schema-Migration), S7, S4.
  - **Fachdidaktisch (D):** D7 · bei gezielter Anwendung; **D-03 Risiko bei flaechendeckender Lockerung.** Braucht didaktische Regel, wann "streng" vs. "nicht_leer" legitim ist.
  - **Hebel:** Hoch, kontrollierbarer als globaler Flag.

- **O-07-P-C (Feedback-First-Policy: Strenge bleibt, Feedback kompensiert)** — L — Pruefung bleibt streng, aber Aufgabe wird immer als "gespeichert, akzeptiert" markiert. Feedback zeigt Musterloesung als Vergleich. SuS sehen Ergebnis + Musterloesung ohne Fail-Zustand.
  - **Technisch (S):** S7 (Escape-Mechanik "naechste Aufgabe erst nach Loesung"), S6 (Progress-Logik-Umbau), S2.
  - **Fachdidaktisch (D):** **D2 +, D3 +, D4 ++, D6 ++, D7 +++, D8 +.** Entspricht Formativem Assessment (Black & Wiliam), Hattie d≈0.70 fuer Feedback. Lernpsychologisch state-of-the-art. Escape-Mechanik-Inkompatibilitaet ist Gamification-, nicht didaktisches Problem.
  - **Hebel:** Sehr hoch didaktisch, hoch invasiv technisch.

- **O-07-P-D (Deploy-Phase-Policy explizit)** — S — `PROJECT_INSTRUCTIONS.md`/`VERTRAG_PHASE_2-2b_AUFGABE.md` Section "Deployment-Reife-Phasen": *Alpha = permissive, Beta = moderate, Produktiv = streng*. Pro Game im `meta`-Objekt.
  - **Technisch (S):** S4, S7.
  - **Fachdidaktisch (D):** Neutral als Meta-Policy; wirkungsabhaengig vom Mechanismus (A/B/C).
  - **Hebel:** Hoch als Rahmen, erfordert Mechanismus.

**Empfehlungs-Kandidat Umlaut [leicht revidiert v2]:**
> **O-07-U-A + O-07-U-B + O-07-U-D** in Kombination. **O-07-U-C abgelehnt** (D5−, Fehlmapping-Risiko). Uebergangs-Heilung fuer bestehende Games: gezielter retroaktiver Fix mit Whitelist, nicht generische Normalisierung.

**Empfehlungs-Kandidat Pruefstrenge [REVIDIERT v2]:**
> **O-07-P-A streichen** (loest D-03 aus, deprivilegiert Bloom L5). Priorisierung: **O-07-P-C als Ziel-Architektur** (Feedback-First) → **O-07-P-B als Interim** (bis Feedback-First gebaut) → **O-07-P-D als Policy-Rahmen**. **Vor allen P-Optionen: Umlaut-Fix (O-07-U-*) + Re-Test des Marne-Games**, weil ein grosser Teil des User-"zu streng"-Befunds Lesart L1 ist (Fuzzy-Matching durch Umlaut-Artefakte verrauscht).

---

### F-LS-M1-08 — Aufgabe 7: Umlaute + Meta-Frage zu schwammig

**Quellen-Trace:**
- Umlaut-Dimension identisch F-07.
- `agents/SUB_AUFGABE_FREITEXT.md:73` — *"Operationalisierungsziel: `[AFB-Operator] + [TB-Knoten-Merksatz als Frageform]`"*. Template erzwingt Frage-Form aus Merksatz — propagiert rhetorische Unschaerfe der Stundenfrage.
- `agents/SUB_AUFGABE_FREITEXT.md:103-105` — Operatoren-Tabelle existiert, aber Frage-Stamm primaer aus Merksatz.
- `agents/SUB_AUFGABE_FREITEXT.md:196` — A2b (v3.4): *"Fragestamm enthaelt mind. 1 konkretes Element"*.
- `agents/SUB_AUFGABE_FREITEXT.md:243` — *"Fragestamm-Kurzregel: max 12 Woerter. Den Operator NICHT woertlich benennen."* — **verbietet explizit** das User-Muster (`Schreibe eine kurze Zusammenfassung`).
- `VERTRAG_PHASE_2-2b_AUFGABE.md` — kein Muster fuer Position 7 als Abschluss-Aufgabe.

**Ursache-Mechanik:**
H1: Operationalisierungs-Heuristik "Operator + Merksatz-als-Frageform" erbt die Form der Stundenfrage. Rhetorische Stundenfrage → rhetorische Aufgabe 7.
H2: Kurzregel "Operator NICHT woertlich" verhindert explizit das User-gewollte Muster. Zwei widerstreitende Gestaltungs-Richtlinien.

**Optionen:**

- **O-08-A (Operator-First-Stamm fuer Position 7)** — S — *"Bei Position 7 (Abschluss-Aufgabe) wird der Fragestamm als expliziter Operator-Satz formuliert: 'Schreibe eine kurze Zusammenfassung zu {Thema}.' oder 'Fasse in eigenen Worten zusammen, was du ueber {Thema} gelernt hast.' Kurzregel gilt fuer Positionen 1-6, nicht fuer 7."*.
  - **Technisch (S):** S1, S3, S7.
  - **Fachdidaktisch (D):** **D4 ++, D5 +, D6 +.** Transparente Operator-Nennung ist bei Abschluss-/Transfer-Aufgaben paedagogisch korrekt (Klieme, Hasselhorn). **Haelt D-08 fern.**
  - **Hebel:** Mittel-hoch.

- **O-08-B (Abschluss-Aufgaben-Muster-Katalog in VERTRAG_PHASE_2-2b)** — M — Neuer Abschnitt "Mappen-Abschluss-Aufgabe (Position 7)" mit Enum `{"zusammenfassung", "stellungnahme", "vergleich", "kernerkenntnis"}`. Pro Muster ein Operator-Template.
  - **Technisch (S):** S1, S4.
  - **Fachdidaktisch (D):** **D2 +, D3 +, D4 ++.** Entspricht den vier Grundtypen historischer Schreibaufgaben nach Schreiber/Barricelli. Fachdidaktisch hochwertig.
  - **Hebel:** Hoch.

- **O-08-C (Kopplung an F-01-Outcome)** — M — Wenn Achse A implementiert: Aufgabe 7 erbt Frage-Stamm nicht mehr aus Stundenfrage, sondern verwendet Meta-Operator. F-08 als Downstream-Folge von F-01.
  - **Technisch/Fachdidaktisch:** Abhaengig von Achse-A-Entscheidung. **Im O-01-E-Szenario (dualistisch)** erbt Position 7 aus `stundenfrage.operational`, nicht `narrativ`.
  - **Hebel:** Sehr hoch bei Achse-A-Durchschlag.

- **O-08-D (Kurzregel aufweichen)** — S — Zeile *"Den Operator NICHT woertlich benennen"* auf Positionen 1-6 beschraenken.
  - **Technisch (S):** S3, S1.
  - **Fachdidaktisch (D):** **D4 +, D6 +.** Entspricht fachdidaktischem Konsens — Kurzregel war Ueberdehnung. **Haelt D-08 fern.**
  - **Hebel:** Niedrig allein, Pflicht-Begleiter von O-08-A.

**Empfehlungs-Kandidat [REVIDIERT v2]:**
> Bundle **O-08-B (Muster-Katalog)** + **O-08-A (Operator-First-Template)** + **O-08-D (Kurzregel einschraenken)** + **O-08-C (Kopplung an O-01-E `operational`)**. Gegenueber v1: O-08-C ist jetzt konstruktiv, nicht abhaengig-offen, weil O-01-E die dualistische Basis liefert.

---

## 3. Achsen-Synthese — technische + fachdidaktische Kombinatorik

### Achse A — Stundenfrage-Grounding + Aufgabe-7-Operator-Explizitheit (F-01, F-08)

**Technische Kompatibilitaets-Matrix:**

| | O-01-A | O-01-B | O-01-C | O-01-D | **O-01-E** | O-08-A | O-08-B | O-08-C | O-08-D |
|---|---|---|---|---|---|---|---|---|---|
| O-01-A (Judge) | | ✓ | ✓ | · | **✓** | ✓ | ✓ | ✓ | · |
| O-01-B (Lemma) | ✓ | | ✓ | · | **✓** | ✓ | ✓ | ✓ | · |
| O-01-C (Upstream) | ✓ | ✓ | | ✗ | **✗** | ✓ | ✓ | ✓ | · |
| O-01-D (C1b weg) | · | · | ✗ | | **✓** | ✓ | ✓ | · | · |
| **O-01-E (dualistisch)** | **✓** | **✓** | **✗** | **✓** | | **✓** | **✓** | **✓** | **·** |
| O-08-C (Kopplung) | ✓ | ✓ | ✓ | · | **✓** | ✓ | ✓ | | ✓ |

**Beobachtungen:**
- O-01-E schliesst O-01-C strukturell aus (wer die Dualisierung waehlt, braucht keine W-Fragewort-Pflicht in 0.3).
- O-01-E umgeht den Konflikt O-01-C ↔ O-01-D und baut direkt auf einer weichen Form von O-01-D (Identitaets-Constraint partiell aufgehoben).

**Fachdidaktisches Re-Framing:**
v1-Bundle **O-01-B + O-01-C + O-08-B** ist **fachdidaktisch nicht empfohlen** (loest D-04/D-05 aus, verletzt Beutelsbach §3, eliminiert Alteritaets-Zugaenge).

**v2-Bundle [REVIDIERT]:** **O-01-E + O-01-A (weich) + O-01-B (gegen `operational`)** + **O-08-B + O-08-A + O-08-D + O-08-C**.

**Charakterisierung:** Dualistische Stundenfrage-Architektur mit operationalem Grounding-Gate und narrativem Freiraum. Auf Aufgaben-Seite operator-transparent.

---

### Achse B — Medien-Diversitaet + Sub-Agent-Reife (F-02)

**Technisch:** Keine Cross-Cut-Konflikte innerhalb F-02. Externe Konflikte: O-02-A (Mehr-Material-Bedarf) ↔ O-04-A (Mehr-Darstellungstexte durch v3.6-Rueckbau) — **S2 kumuliert**, Mengen-Limit in VERTRAG_PHASE_2-1 kann konflikttreiben.

**Fachdidaktisches Re-Framing:**
v1-Empfehlung "O-02-C → O-02-A → O-02-D" → **Reihenfolge umgekehrt**. DIDAKTIK-Skizze (O-02-D) liefert das fachdidaktische Argument, warum eine Karte/Statistik/Zeitleiste gebraucht wird. Ohne dieses Argument ist O-02-A formal-leer und triggert D-02.

**v2-Bundle [REVIDIERT]:** **O-02-D zuerst (Upstream-Anker) → O-02-C (Reife-Programm) → O-02-A themenspezifisch** (geographisch → Karte, Verlauf → Zeitleiste, quantitativ → Statistik). **Nie generisches `min 1 nicht-Text`.**

**Charakterisierung:** Repraesentationsform-Planung wandert in Phase 0.1, Sub-Agent-Reife wird aufgebaut, Diversitaets-Pflicht ist themengesteuert.

---

### Achse C — Form-Integritaet + v3.6-Revision (F-03, F-04, F-05, F-06)

**Zentraler Entscheidungspunkt:** Pfad C-ABSCHAFFEN (O-04-A) vs. Pfad C-VERSCHAERFEN (O-04-B+C).

| Pfad | Technisch | Fachdidaktisch | Verdict |
|---|---|---|---|
| **C-ABSCHAFFEN:** O-04-A + O-04-D + O-06-A + O-05-A + O-03-B | S1/S2/S7 hoch | D1+++, D2++, D3++ — **haelt D-01 und D-07 fern** | **Fachdidaktisch zwingend** |
| **C-VERSCHAERFEN:** O-04-B+C + O-06-A + O-03-B + O-05-A | S1 moderat, S7 niedriger | D1 −, D7 − bleiben — **D-01 und D-07 bleiben chronisch ausgeloest** | Fachdidaktisch abgelehnt |

**Fachdidaktisches Re-Framing:**
Die v1-Offenheit "beide Pfade legitim" wird revidiert. **LehrplanPLUS GPG 7 Bayern** verlangt explizit *"Quellen von Darstellungen unterscheiden"*. Ein Tagebuch mit Erzaehlerstimmen-Einschub verletzt diese Norm bei jeder Nutzung im Unterricht — fachwissenschaftlich und lehrplanrechtlich unhaltbar.

**v2-Bundle [REVIDIERT]:** **Pfad C-ABSCHAFFEN** als fachdidaktische Norm: **O-04-A + O-04-D (Rollen-Doppel-Figuren) + O-06-A (info_box) + O-05-A (QuellentextMehrstimmen) + O-03-B (typ-spezifische Titel-Pattern)**.

**Begleitende Entscheidung:** Pro Mappe statt *einer* Identifikationsfigur eine **Figurengruppe** (Offizier + Gefreiter / Soldat + Angehoerige / Front + Heimat). Das ist der Enabler fuer O-04-A ohne Immersionsverlust.

**Charakterisierung:** Jedes Material hat genau eine Stimme-Identitaet (Figur / Quelle / Darstellung / info_box). Mehrstimmigkeit nur via Schema-Subtyp. Genre-Konvention im Titel. Rollen-Passung bei Figurenwahl. Retrograd-Migration der bestehenden Games (Marne, Ursachen) wird fachdidaktisch empfohlen — bei Legacy-Belassung reproduzieren die Games D-01/D-07 bei jeder Nutzung.

---

### Achse D — Q-Gate-Enforcement-Gap + Schwierigkeits-Policy (F-07, F-08-Technik)

**Drei Sub-Tracks:**

**D.1 Umlaut-Enforcement:**
v2-Bundle: **O-07-U-A (Phase-0-Vertraege UTF-8) + O-07-U-B (Script-Checker) + O-07-U-D (Template-Saeuberung)**. **O-07-U-C abgelehnt** (D5−, Fehlmapping).

**D.2 Pruefstrenge-Policy:** **[REVIDIERT]**
- **O-07-P-A streichen** (loest D-03 aus).
- **O-07-P-C als Ziel-Architektur** (Feedback-First, Black/Wiliam, Hattie).
- **O-07-P-B als Interim** (bis Feedback-First gebaut).
- **O-07-P-D als Policy-Rahmen**.
- **Vor allen P-Optionen:** Umlaut-Fix + Re-Test des Marne-Games, weil der "zu streng"-Befund wahrscheinlich Lesart L1 ist (Fuzzy-Matching durch Umlaut-Artefakte verrauscht).

**D.3 Enforcement-Framework allgemein:** siehe §4 Meta (M-01).

**Charakterisierung:** Umlaut-Sauberkeit zuerst, dann didaktische Pruefmodi (Feedback-First als Norm), global-permissive dauerhaft ausgeschlossen.

---

### User-Wunsch "weniger streng" — Lesart-Aufloesung

Der User-Befund *"Aufgaben zu streng geprueft"* ist didaktisch mehrdeutig. Drei Lesarten:

| Lesart | Bedeutung | Richtige Option |
|---|---|---|
| **L1 — weniger streng bei Formulierungs-Varianten** | Fuzzy-Match, Umlaute-Toleranz, Synonyme | **Bereits vorhanden** (SUB_AUFGABE_BEGRUENDUNG.md:193). Groesster Anteil des Befunds wird durch **O-07-U-A/B/D** (reine Umlaut-Sauberkeit) gedeckt. |
| **L2 — weniger Leistungsdruck auf SuS** | Fail-Zustand zerstoert intrinsische Motivation | **O-07-P-C (Feedback-First)**. Lernpsychologisch korrekt. |
| **L3 — pragmatisches Durchkommen im Alpha-Deployment** | Spielfluss darf nicht an Pruefdetail scheitern | **O-07-P-D (Policy-Rahmen) + O-07-P-B (Mechanismus, Alpha-profile)**. |

**Diagnostischer Schritt vor Policy-Umsetzung:** Marne-Game nach Umlaut-Fix re-testen. Falls "zu streng"-Gefuehl bleibt → L2 adressieren (O-07-P-C). Falls verschwunden → L1 war Primaer-Ursache.

---

## 4. Meta-Struktur-Optionen (Cross-Cut)

### M-01 — Q-Gate-Enforcement-Audit + Framework

**Diagnose:** TYP-01-A ist nicht der einzige Gate ohne deterministischen Enforcer. Die Vermutung aus Befund §5.2 muss empirisch geprueft werden.

**Scope:**
1. **Audit-Script:** Pro Q-Gate in `Q-GATE-MECHANIK.md` pruefen, ob eine deterministische Implementierung existiert. Ergebnis: Tabelle `gate_id | enforcer | enforcer_type (script/sub-agent/llm-judge/none) | location`.
2. **Framework:** Einheitlicher Enforcement-Runner `tools/q-gate-run.sh <phase> <artefakt>`.
3. **Vertrags-Erweiterung:** Jeder Phasen-Vertrag bekommt Pflicht-Sektion "Gate-Enforcement-Map". Ohne Enforcer → Gate ist WARN (nicht PASS).

**Nebenwirkungen:** S1 (Reklassifizierung WARN/PASS/FAIL), S2, S4.
**Fachdidaktisch:** D4 + (Kompetenz-Operationalisierung transparenter), D5 + (Fachsprachlichkeit systematisch pruefbar).

### M-02 — Phase 3.3 "Live-Sichtung" als formelle Phase

**Diagnose:** Post-Deploy-Sichtung ist Ad-Hoc. Alle 8 Findings wurden durch Pre-Deploy-Testruns nicht gefangen, weil diese gegen Artefakte pruefen, nicht gegen SuS-Erfahrung.

**Scope:**
1. **State-Machine-Erweiterung:** `PROJECT_INSTRUCTIONS.md` bekommt Phase 3.3 "Sichtung" zwischen 3.2 "Live-Go" und 4.x "Nachbereitung".
2. **Neuer Gate-Katalog `SICHT-01..n`.**
3. **Sichtungs-Protokoll:** Pflicht-Artefakt `SICHTUNG_G{N}_M{M}.md` pro Mappe.
4. **Rueckkopplungs-Mechanismus:** Findings werden zu Upgrade-Tracks konsolidiert.

**Nebenwirkungen:** S2, S4, S8 (Heuristik fuer didaktische Defekte).
**Fachdidaktisch:** **D7 ++** (Feedback-Schleife Produktion → Unterricht → Produktion, lernender Generator), D4 +.

### M-03 — Sub-Agent-Reife-Audit

Parallel zu Achse B: Reife-Matrix pro Sub-Agent nach Kriterien (i) Engine-Rendering, (ii) Asset-Pipeline, (iii) Game-Nutzung, (iv) Template-Beispiele, (v) Q-Gate-Durchlauf-Log. Priorisierung fuer Achse-B-Implementierung.

**Fachdidaktisch:** D1 +, D2 + (ohne reife Sub-Agenten kein Medien-Mix ohne D-02).

---

## 5. Nebenwirkungs-Summen — S-Taxonomie × D-Taxonomie Kreuzmatrix

### 5.1 Technische S-Last pro Achse (Skala 1-5, grob geschaetzt)

| Achse | S1 | S2 | S3 | S4 | S5 | S6 | S7 | S8 |
|---|---|---|---|---|---|---|---|---|
| A (SF-Grounding **v2-Bundle O-01-E**) | 3 | 2 | 2 | 3 | 0 | 2 | 1 | 1 |
| B (Medien-Div **v2-Bundle**) | 3 | 4 | 1 | 3 | 5 | 2 | 1 | 1 |
| C (Form-Integritaet **v2 Pfad-ABSCHAFFEN**) | 5 | 4 | 3 | 3 | 1 | 3 | 4 | 2 |
| D (Enforcement **v2 ohne P-A**) | 4 | 2 | 2 | 2 | 0 | 2 | 2 | 3 |

**Hinweis:** Achse A hat in v2 etwas hoehere S1/S4/S6 als in v1 (O-01-E-Schema-Migration), dafuer deutlich niedrigere D-Last (s. unten). Achse D ohne O-07-P-A hat S7 von 4 auf 2 gesenkt.

### 5.2 Fachdidaktische D-Last pro Achse

| Achse | Dominante D-Ausloeser (v1-Bundle) | v2-Bundle-D-Last | Begruendung Revidierung |
|---|---|---|---|
| **A** | D-04, D-05 (v1: O-01-B+C verletzt Beutelsbach §3, Alteritaet) | **niedrig** (O-01-E erhaelt narrativen Raum) | Dualistische Architektur trennt narrative von operationaler Stundenfrage. |
| **B** | D-02 bei O-02-A generisch | **niedrig** bei themenspezifischer O-02-A + O-02-D-Upstream | Repraesentationsform-Anker in DIDAKTIK. |
| **C** | D-01, D-07 bei v3.6-Erhalt | **eliminiert** durch Pfad C-ABSCHAFFEN | Quellen-Authentizitaet wiederhergestellt, Autoritaets-Verschiebung abgebaut. |
| **D** | D-03 durch O-07-P-A | **eliminiert** durch Streichung von O-07-P-A | Kompetenz-Deprivation vermieden, Feedback-First als Norm. |

### 5.3 S×D-Kreuzmatrix (qualitativ, Cluster-Charakterisierung)

| Achse | S-Last (v2) | D-Last (v2) | Cluster | Handlungs-Logik |
|---|---|---|---|---|
| A | **niedrig-mittel** | **niedrig** | Sanfter Aufbau | v2-Bundle realisiert, v1-Bundle verworfen. |
| B | **mittel-hoch** (S5 dominant) | **niedrig** | Reife vor Pflicht | O-02-C/M-03 zuerst, dann O-02-A. |
| C | **hoch** (S1, S2, S7) | **ohne Revision hoch (D-01, D-07), nach Revision niedrig** | Fachlich zwingend, technisch teuer | Quellen-Integritaet ist nicht verhandelbar — S-Last akzeptieren. |
| D | **mittel** | **niedrig nach Streichung O-07-P-A** | Bereinigung | Umlaut-Fix zuerst, dann Feedback-First aufbauen. |

**Befund:** Das v2-Bundle senkt in allen Achsen die D-Last, erhoeht in Achse A und C die technische S-Last moderat. **Das ist der fachdidaktische Preis fuer Quellen-Integritaet, Schueler-Interessen-Wahrung und Kompetenz-Erhalt.**

### 5.4 Reihenfolge-Hypothese (revidiert v2)

v1-Hypothese: **D → A → B → C**.
v2-Revision: **D.1 (Umlaut) → Re-Test → D.2 (Pruefstrenge-Policy) → A (dualistisch) → C (Pfad-ABSCHAFFEN) → B (Reife + themenspezifisch)**.

Begruendung:
1. **D.1 (Umlaut)** loest vermutlich einen grossen Anteil des "zu streng"-Befunds allein (Lesart L1). Niedrigster Hebel-pro-Risiko, isoliert testbar.
2. **Re-Test** bewertet, ob D.2 (Pruefstrenge) ueberhaupt noch adressiert werden muss oder erst spaeter.
3. **D.2** baut Feedback-First als Ziel-Architektur auf, Interim O-07-P-B. Hoechster didaktischer Hebel nach D.1.
4. **A (dualistisch)** ist Schema-Eingriff und Voraussetzung fuer kohaerente F-08-Behandlung.
5. **C (Pfad-ABSCHAFFEN)** ist der groesste Einzel-Scope, kann aber auf A aufbauen (Stundenfrage-Grounding koppelt an Material-Gruppe).
6. **B** erfordert Reife-Programm und wird mit Achse C (Material-Strukturumbau) zeitlich gekoppelt.

**Status:** Denkvorschlag, nicht Empfehlung. User entscheidet Rundenzerlegung.

---

## 6. Offene Entscheidungsfragen

### 6.1 Technische Runden-Struktur

1. **Upgrade-Runden-Struktur:** Eine Runde v3.12 mit allen Achsen, oder mehrere Mini-Runden pro Achse?
2. **Q-Gate-Enforcement-Audit (M-01):** Parallel-Track oder Teil von v3.12?
3. **Sub-Agent-Reife-Programm (M-03 / Achse B):** Eigenstaendiger Track oder Voraussetzung fuer v3.12-Implementierung?
4. **Phase 3.3 (M-02):** Wird die Live-Sichtung als eigene State-Machine-Phase etabliert?
5. **Retroaktive Fixes:** Werden die bestehenden Games (Marne, Ursachen) retrograd migriert, oder gilt v3.12 nur fuer neu generierte Games?

### 6.2 Fachdidaktische Grundsatz-Entscheidungen

6. **Dualistische Stundenfrage-Architektur (O-01-E):** Wird als neue Option akzeptiert und Achse A darauf gebaut? (**Zentrales v2-Novum.**)
7. **Quellen-Authentizitaet als Top-Norm:** Wird LehrplanPLUS GPG 7 Bayern *"Quellen von Darstellungen unterscheiden"* als hartes fachdidaktisches Axiom akzeptiert, das Pfad C-ABSCHAFFEN zwingend macht?
8. **Feedback-First (O-07-P-C) als Ziel-Architektur:** Akzeptabel, auch wenn die Escape-Mechanik (Progression blockiert bei falscher Antwort) umgebaut werden muss?
9. **Rollen-Doppel-Figuren pro Mappe:** Wird als didaktisches Grundmuster etabliert? Enabler fuer O-04-A ohne Immersionsverlust.
10. **Alibi-Medien-Schutz:** Wird in O-02-A eine explizite Klausel eingefuehrt, dass dekorative Medien (ohne historische Aussage) als FAIL gelten?
11. **Operator-Transparenz:** Wird die Klieme-konforme Pflicht zur expliziten Operator-Nennung bei Abschluss-Aufgaben generell eingefuehrt, oder bleibt sie auf Position 7 beschraenkt?
12. **Beutelsbacher Konsens als Prueflinse:** Werden Stundenfragen zusaetzlich gegen Beutelsbach §3 (Schueler-Interessen) geprueft, oder bleibt die Pruefung rein kognitiv-operational?

### 6.3 Diagnostisch

13. **Marne/Ursachen Re-Test nach Umlaut-Fix:** Wird der "zu streng"-Befund isoliert gegen L1/L2/L3 getestet, bevor Pruefstrenge-Policy gebaut wird?
14. **Parallele Sichtung Game 1 (Ursachen):** Wird sie nach gleicher Methodik durchgefuehrt, um zu pruefen, ob die 8 Findings systemisch oder Marne-spezifisch sind?
15. **M-03 Reife-Matrix:** Wird das Audit der Sub-Agent-Reife als erste Massnahme gestartet, unabhaengig von der Rundenzerlegung?

---

## 7. Kurz-Summa fuer Entscheider

**Wesentliche v2-Revisionen gegenueber v1:**

1. **Achse A:** v1-Bundle O-01-B + O-01-C + O-08-B **ist fachdidaktisch zurueckgezogen**. Neue Option **O-01-E (dualistische Stundenfrage)** ersetzt den Operationalisierungs-Zwang durch eine `narrativ`/`operational`-Trennung. Erhaelt biographisch-emotionale SuS-Zugaenge (Beutelsbach §3, Alteritaet nach Ruesen), ermoeglicht trotzdem deterministisches Material-Grounding. Bundle v2: O-01-E + O-01-A (weich) + O-01-B (gegen `operational`).

2. **Achse C:** v1-Offenheit "C-ABSCHAFFEN vs. C-VERSCHAERFEN" **ist auf C-ABSCHAFFEN entschieden**. LehrplanPLUS GPG 7 Bayern *"Quellen von Darstellungen unterscheiden"* ist hart und unverhandelbar. v3.6-Erhalt laesst D-01 (Quellen-Authentizitaets-Verletzung) und D-07 (Autoritaets-Verschiebung) chronisch ausgeloest — unvertretbar. Bundle v2: O-04-A + O-04-D (Rollen-Doppel-Figuren) + O-06-A (info_box) + O-05-A (QuellentextMehrstimmen) + O-03-B (typ-spezifische Titel-Pattern). Retroaktive Migration der bestehenden Games empfohlen.

3. **Achse D:** **O-07-P-A (globaler Permissive-Flag) ist gestrichen** (loest D-03 Kompetenz-Deprivation aus, deaktiviert CER-Schema auf AFB-III-/Bloom-L5-Niveau). **O-07-P-C (Feedback-First)** wird Ziel-Architektur, O-07-P-B Interim. Umlaut-Fix (O-07-U-A/B/D, **ohne** O-07-U-C) zuerst, weil ein grosser Teil des "zu streng"-Befunds vermutlich Lesart L1 ist (Fuzzy-Match-Rauschen durch Umlaut-Artefakte).

4. **Achse B:** Reihenfolge umgekehrt zu **O-02-D → O-02-C → O-02-A themenspezifisch**. DIDAKTIK-Skizze als Upstream-Anker; generischer `min 1 nicht-Text`-Zwang abgelehnt (loest D-02 Didaktische Monokultur aus).

**Technischer Preis:** Achse A moderat hoeher (Schema-Migration Stundenfrage-Dualismus), Achse C gleich hoch (war immer teuer), Achsen B/D stabil oder niedriger. **Fachdidaktischer Gewinn: D-01, D-03, D-04, D-05, D-07 werden ferngehalten; D-02 nur bei disziplinierter O-02-A-Formulierung; D-06, D-08 werden adressiert.**

**Entscheidungsgrundlage nicht Entscheidung:** Das Dokument empfiehlt, entscheidet aber nicht. Die 15 offenen Fragen in §6 warten auf User-Antworten, bevor die v3.12-Rundenstruktur als Track-Katalog operationalisiert wird.

---

## 8. Abgrenzung — was dieses Dokument NICHT leistet

- Keine Implementierungs-Entscheidung. Alle Optionen und Bundles sind Vorschlaege, keine Zusagen.
- Keine finale Priorisierung der Achsen oder Findings ausser der diagnostischen Reihenfolge-Hypothese in §5.4.
- Keine Time-/Cost-Estimates.
- Keine Pruefung, ob Game 1 (Ursachen) die gleichen Defekte aufweist. Paralleler Sichtungs-Befund waere eigenes Artefakt.
- Keine Policy-Ausarbeitung zur "Rollen-Doppel-Figuren"-Richtlinie — nur als didaktischer Enabler benannt, nicht als normative Regel formuliert.
- Kein Zwischen-Eingriff in den Generator: die zitierten Datei:Zeile-Referenzen wurden nur gelesen, nicht veraendert.
- Keine Alternative-Kurrikulums-Diskussion ueber die 8 Findings hinaus.

---

## 9. Referenzen

### Generator-Infrastruktur (verifiziert gegen aktuellen Commit)

- `escape-game-generator/architektur/Q-GATE-MECHANIK.md` §7.1 (Material), §7.2 (Aufgaben), §7.3 (Rahmen), Zeilen 155 (TYP-01), 156 (TYP-TB-PERSPEKTIV), 179 (TYP-01-A), 190-191 (C1b/M3b), 207-220 (STOP_DEFAULT)
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_0-1_DIDAKTIK.md:123` (ASCII-Policy)
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_0-2_INHALT.md:142` (ASCII-Policy)
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_0-3_SKRIPT.md:166` (ASCII-Policy)
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_0-4_HEFTEINTRAG.md:169` (ASCII-Policy)
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_2-0_RAHMEN.md:93-94,107` (C1b)
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_2-1_MATERIAL.md:219` (Perspektiven-Verteilungs-Constraint)
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_2-2b_AUFGABE.md:125` (Typ-Enum)
- `escape-game-generator/architektur/schemata/material-output-schema.json:139-143` (Titel-Beschreibung), 145-185 (inhalt `oneOf`)
- `escape-game-generator/agents/AGENT_HEFTEINTRAG.md:44,278` (Stundenfrage-Uebernahme, UTF-8)
- `escape-game-generator/agents/AGENT_MATERIAL.md:57-59,125-136,162,181-182,480-481,617,637-638` (Sub-Agent-Zuordnung, Mengen)
- `escape-game-generator/agents/SUB_MATERIAL_TAGEBUCH.md:127,168,197,233` (v3.6-Policy, Quellen-Regel, T2.F-Luecke, MQ2)
- `escape-game-generator/agents/SUB_MATERIAL_QUELLENTEXT.md:214,218,280` (Rekonstruktion, Trennregel, MQ2)
- `escape-game-generator/agents/SUB_AUFGABE_BEGRUENDUNG.md:67-69,113-114,172-175,193` (CER, ASCII-Beispiele, Engine-Match)
- `escape-game-generator/agents/SUB_AUFGABE_FREITEXT.md:73,103-105,196,243,322` (Operationalisierung, Operator-Katalog, A2b, Kurzregel, UTF-8-Pflicht)

### Primaerquellen und Vor-Artefakte

- `docs/befunde/BEFUND_LIVE_SICHTUNG_G2_M1_2026-04-10.md` — 8 Findings, Querschnitts-Achsen
- `docs/befunde/AUDIT_FACHDIDAKTIK_v3-12_2026-04-11.md` — fachdidaktisches Audit (in dieses Dokument integriert)

### Geschichtsdidaktik

- Droysen, J. G.: *Historik* — Quellenkritik als konstitutive Operation historischer Methode.
- Pandel, H.-J.: *Historisches Erzaehlen* & *Quelleninterpretation* — Genre-Kompetenz, Sprecher-Attribution, Unterscheidung Quelle/Darstellung.
- Ruesen, J.: *Historisches Lernen* — Alteritaet, Kontingenz, narrative Sinnbildung.
- Jeismann, K.-E.: *Geschichtsbewusstsein als zentrale Kategorie* — biographisch-motivationaler Zugang.
- Sauer, M.: *Geschichte unterrichten* — Mikrogeschichte, personalisierte Zugaenge.
- Schreiber, W. / Barricelli, M.: *Historische Schreibaufgaben* — vier Grundtypen (Zusammenfassung, Stellungnahme, Vergleich, Kernerkenntnis).
- Bergmann, K.: *Multiperspektivitaet, Kontroversitaet, Pluralitaet*.
- Beutelsbacher Konsens (1976): §1 Ueberwaeltigungsverbot, §2 Kontroversitaetsgebot, §3 Schueler-Interessen.

### Allgemeindidaktik und Kompetenzorientierung

- Klieme, E.: *Bildungsstandards* — Aufgaben-Transparenz, AFB-Taxonomie.
- Bloom, B. / Anderson, L.: *Taxonomie* (L1-L6).
- Black, P. / Wiliam, D.: *Inside the Black Box* — Formatives Assessment.
- Hattie, J.: *Visible Learning* — Feedback-Effektstaerke d≈0.70.
- Deci, E. / Ryan, R.: *Selbstbestimmungstheorie*.
- Winter, F. / Leuders, T.: *Aufgabenkultur*.
- Bruner, J.: *enaktiv/ikonisch/symbolisch*.
- Hasselhorn, M.: *Aufgaben-Transparenz und Metakognition*.

### Curriculum

- LehrplanPLUS Mittelschule Bayern, GPG 7. Jgst., Lernbereich *"Der Erste Weltkrieg — Wege in den Krieg und Leben an der Front"*, Kompetenz *"Quellen von Darstellungen unterscheiden"*.

---

**Status:** VORSCHLAG v2 — integriert mit Fachdidaktik-Audit. Wartet auf Scope-Entscheidung fuer v3.12-Rundenstruktur. Antworten zu §6 (15 offene Fragen) wandeln dieses Dokument in einen operativen Upgrade-Plan.
