# SCOPING v3.12 — Quellen-Lokalisierung und Interventions-Optionen

**Anlass:** Befolge-Artefakt zu `BEFUND_LIVE_SICHTUNG_G2_M1_2026-04-10.md` (8 Findings, 4 Querschnitts-Achsen).
**Zweck:** Fuer jedes Finding (a) die strukturelle Quelle im Generator lokalisieren (Datei:Zeile verbatim), (b) 2-4 Interventions-Optionen scopen, (c) pro Option die kontrollierbaren und unkontrollierten Nebenwirkungen benennen.
**Abgrenzung:** Kein Upgrade-Plan, keine Priorisierung, keine Implementierungs-Entscheidung. Seed fuer die v3.12-Runden-Planung.
**Scope-Repos:** Diagnose gegen `escape-game-generator/` (Produkt-Infrastruktur). Engine-Seite (`weitergehts-online/assets/`) wird nur erwaehnt, wo Engine-Aenderung Voraussetzung ist.
**Datum:** 2026-04-10
**Status:** VORSCHLAG — wartet auf Scope-Entscheidung

---

## 0. Methode

**Schritt 1 — Quellen-Trace:** Pro Finding wurde die Generator-Infrastruktur (Vertraege, Sub-Agenten, Q-Gates, Schemata, Agent-Dateien) gegrept und die Stelle identifiziert, an der der Defekt strukturell entsteht bzw. nicht verhindert wird. Datei:Zeile sind verifiziert gegen den aktuellen Commit-Stand von `escape-game-generator/`.

**Schritt 2 — Ursache-Mechanik:** Der Weg vom strukturellen Auslöser zum sichtbaren Defekt im data.json wird als Kausalkette beschrieben. Wo mehrere konkurrierende Mechaniken existieren, werden sie als H1/H2/H3 aufgezaehlt und grob gewichtet.

**Schritt 3 — Options-Scoping:** Pro Finding 2-4 Interventions-Optionen mit Angabe von (i) Ort (Vertrag/Sub-Agent/Schema/Q-Gate/Agent-Logik/Engine/Policy), (ii) Groesse des Eingriffs (S/M/L/XL), (iii) Hebelwirkung, (iv) erwarteten Nebenwirkungen aus der Taxonomie §1.

**Schritt 4 — Options-Kombinatorik auf Achsen-Ebene:** §3 zeigt fuer jede Achse (A/B/C/D) welche Optionen sich gegenseitig verstaerken, neutral zueinander sind oder konfligieren.

---

## 1. Nebenwirkungs-Taxonomie (S1..S8)

Alle Optionen werden gegen folgende acht Risiko-Klassen annotiert:

| Code | Name | Beschreibung |
|---|---|---|
| **S1** | Vertrags-Retrograd-Bruch | Neue Pflicht bricht bestehende Vertraege oder bestehende Artefakte waeren rueckwirkend FAIL. |
| **S2** | Content-Kosten-Explosion | Intervention erzwingt signifikant mehr Material/Prompts/Iterations-Zyklen. |
| **S3** | Form-vs-Inhalt-Spannung | Form-Constraint kollidiert mit inhaltlicher Flexibilitaet (z.B. Frage-Titel-Pflicht vs. Form-Integritaet). |
| **S4** | Dispatch-Komplexitaet | Neue Inter-Agenten-Abhaengigkeit oder neue Reihenfolge-Zwaenge zwischen Sub-Agenten. |
| **S5** | Sub-Agent-Reife-Drift | Intervention setzt Reife von Sub-Agenten voraus, die aktuell unterentwickelt sind (z.B. KARTE/ZEITLEISTE/STATISTIK). Nicht-Text-Sub-Agenten erfordern zusaetzliche Asset-Anbindung. |
| **S6** | Engine-Runtime-Regression | Aenderung des data.json-Schemas bricht `escape-engine.js`-Rendering fuer bestehende Games. |
| **S7** | Policy-Interaktions-Konflikt | Neue Policy widerspricht bestehender Policy (v3.6 Erzaehlerstimmen vs. Form-Integritaet; Permissive-Check vs. Bloom-Taxonomie). |
| **S8** | Enforcement-Luecke neu | Option loest das inhaltliche Problem, laesst die Pruefung aber weiter undeterministisch — neues Gate-Enforcement-Gap. |

**Wichtig:** Fast jede Option hat >0 Nebenwirkungen. Die Aufgabe ist nicht, Optionen ohne Nebenwirkungen zu waehlen, sondern die Wechselwirkung zu kontrollieren.

---

## 2. Findings — Quellen und Optionen

### F-LS-M1-01 — Stundenfrage nicht gegroundet

**Quellen-Trace:**
- `agents/AGENT_HEFTEINTRAG.md:44` — *"Aus dem SKRIPT-Chunk die Stundenfrage WORTWOERTLICH uebernehmen (= Chunk-Ueberschrift = einstieg.problemstellung)"* + `IDENTITAETS-CONSTRAINT (C1b)`. Die Stundenfrage wird also bereits in Phase 0.3 (SKRIPT) fixiert und durch Phase 0.4 hart an alle weiteren Phasen vererbt.
- `architektur/vertraege/VERTRAG_PHASE_2-0_RAHMEN.md:93-94,107` — *"einstieg.problemstellung === hefteintrag.stundenfrage"* + *"C1b: einstieg.problemstellung === hefteintrag.stundenfrage"*. C1b prueft Text-Identitaet, nicht Beantwortbarkeit.
- `architektur/Q-GATE-MECHANIK.md:190-191` — C1b (Identitaet) + M3b (Kernerkenntnisse-Identitaet zu Tafelbild) sind die einzigen Gates am Stundenfrage-Objekt. Kein SF-GROUND, kein "Material-deckt-Stundenfrage".
- `agents/AGENT_SKRIPT.md` — nicht zitiert, aber implizit: hier entsteht die Stundenfrage als Chunk-Ueberschrift. Keine Grounding-Pflicht.

**Ursache-Mechanik (gewichtet):**
1. **H1 (dominant):** Stundenfrage wird in Phase 0.3 (SKRIPT) ohne Material-Korpus-Rueckkopplung gewaehlt und per C1b hart fixiert. Spaetere Phasen koennen sie nicht korrigieren, selbst wenn das Material die Frage nicht deckt.
2. **H2:** Die Stundenfrage optimiert rhetorisch-dramaturgisch ("Wer ueberlebt..."), weil AGENT_SKRIPT narrativ dichtet; ein neutral-operationaler Operator ("Wie war...") waere dramaturgisch flach.
3. **H3:** Q-Gate M3b prueft nur, dass `scpl.loesung[]` mit dem Tafelbild-Entwurf uebereinstimmt — NICHT, dass `scpl.loesung[]` die Stundenfrage tatsaechlich beantwortet.

**Optionen:**

- **O-01-A (Grounding-Gate, LLM-Judge) — S** — Neuer Gate `SF-GROUND` in §7.3 Q-GATE-MECHANIK. LLM-Judge: "Beantworten die `scpl.loesung[]`-Saetze semantisch die Stundenfrage? (ja/nein/teilweise)". Enforcement: LLM-Call in Phase 2.0 (Rahmen-Erstellung) oder Phase 2.1c (Cross). Pflichtpass vor C1b.
  - Nebenwirkungen: **S8** (LLM-Judge nicht deterministisch — Enforcement schwach), **S4** (neue Dispatch-Abhaengigkeit 2.0 → Judge).
  - Hebel: Mittel. Faengt flache Faelle, ist aber judge-abhaengig.

- **O-01-B (Grounding-Gate, deterministisch, lemma-basiert) — M** — Deterministischer Check: Extrahiere Kern-Nomina/Verben aus der Stundenfrage, pruefe ob jedes Kern-Lemma mindestens einmal in `scpl.loesung[]` auftritt (nach Stop-Liste-Filter, gleiche STOP_DEFAULT wie L-DUP §7.3 Anhang A). Fallback fuer Verb-Mismatch: Synonym-Liste.
  - Nebenwirkungen: **S3** (manche pragmatisch-ok Stundenfragen scheitern am Lemma-Check), **S1** (bestehende Games koennen retrograd FAIL werden).
  - Hebel: Mittel-hoch. Deterministisch, aber zu streng fuer metaphorische Fragen.

- **O-01-C (Upstream-Verschiebung in Phase 0.3) — L** — AGENT_SKRIPT bekommt neue Pflicht: Chunk-Ueberschrift muss "operationalisierbar" sein. Definition: Enthaelt einen W-Fragewort-Operator aus Katalog `{Wie, Warum, Wodurch, Inwiefern}`, kein rhetorisch-wertendes Nomen (`Wer ueberlebt` → verboten). Test-Heuristik: Die Antwort-Form muss als Aussage-Satz rekonstruierbar sein, die mindestens einen Lemma-Bezug zu einer Kern-Erkenntnis hat.
  - Nebenwirkungen: **S1** (alle bestehenden SKRIPT-Artefakte koennen retrograd FAIL), **S2** (SKRIPT-Iterations-Schleifen werden teurer), **S3** (dramaturgische Verdichtung verloren).
  - Hebel: Hoch. Behebt die Upstream-Ursache statt downstream zu pflastern.

- **O-01-D (C1b weichen) — L** — Identitaets-Constraint C1b wird abgeschaltet oder auf "referenziert" umgestellt: Phase 2.0 darf die Stundenfrage gegenueber Phase 0.3 ueberarbeiten, wenn eine Grounding-Pruefung das erzwingt. Audit-Trail als Pflicht.
  - Nebenwirkungen: **S1** (C1b ist eine der aeltesten Konsistenz-Saeulen — deren Aufhebung hebelt SCPL-Planung und Hefteintrag-Struktur aus), **S4** (Phase 2.0 muss jetzt Hefteintrag patchen).
  - Hebel: Sehr hoch, aber S1 ist massiv — diese Option ist ein architektonischer Bruch.

**Empfehlungs-Kandidat (nicht entschieden):** O-01-B (deterministisch) als Hard-Gate **in Kombination** mit O-01-C als Upstream-Pflicht (Phase 0.3). O-01-A als zusaetzlicher weicher Judge. O-01-D zurueckhalten, weil S1.

---

### F-LS-M1-02 — Medien-Monokultur in Mappe 1

**Quellen-Trace:**
- `agents/AGENT_MATERIAL.md:162` — *"Minimum 4, idealerweise 5-6 Materialien."* — nur Mengen-Constraint, kein Typ-Mix.
- `agents/AGENT_MATERIAL.md:181-182` — Constraint ist SCPL-Zonen-Abdeckung, nicht Medien-Diversitaet.
- `architektur/vertraege/VERTRAG_PHASE_2-1_MATERIAL.md:219` — **nur Perspektiven-Verteilung** ist verpflichtend (min 3 Perspektiven pro Mappe), kein Medien-Mix-Constraint.
- `agents/AGENT_MATERIAL.md:57-59,135-136,480-481,617,637-638` — SUB_MATERIAL_KARTE, SUB_MATERIAL_ZEITLEISTE, SUB_MATERIAL_STATISTIK existieren und sind im Dispatch-Katalog gelistet. Sie sind aber im Fallback auf **bildquelle** bzw. **zeitleiste** gemappt (Zeile 57/59), d.h. wenn das Engine-Rendering fuer Karte/Statistik nicht bereit ist, fallen sie strukturell auf `bildquelle` zurueck.
- **Kein Q-Gate `MED-DIV`** in §7.1 (Material-Q-Gate).

**Ursache-Mechanik:**
1. **H1 (dominant):** Kein struktureller Diversitaets-Constraint. AGENT_MATERIAL hat einen Typ-Auswahl-Katalog (Zeile 125-136), der semantisch passt, aber nicht prueft, ob die **gesamte Mappe** einen Mix bildet.
2. **H2:** Sub-Agent-Reife-Asymmetrie — Text-Sub-Agenten (TAGEBUCH/QUELLENTEXT/DARSTELLUNGSTEXT) sind ausgereift, KARTE/ZEITLEISTE/STATISTIK sind weniger robust und werden im Fallback auf `bildquelle`/`zeitleiste` abgebildet. Das bestraft die Auswahl von Nicht-Text-Materialien implizit.
3. **H3:** DIDAKTIK_RAHMEN (Phase 0.1) spezifiziert keine Repraesentationsform-Planung. Die Mappe bekommt ihre Typ-Verteilung erst in Phase 2.1 (MATERIAL_GERUEST), wo der Rahmen schon gesetzt ist.

**Optionen:**

- **O-02-A (Hard-Constraint Diversitaets-Matrix in VERTRAG_PHASE_2-1_MATERIAL) — M** — Neue §: "Pro Mappe mindestens ein nicht-textuelles Material (`bildquelle`, `karte`, `statistik` oder `zeitleiste`). Bei geographischem Thema zwingend mindestens eine `karte`. Bei Prozess/Verlaufs-Thema zwingend mindestens eine `zeitleiste`." Hard-FAIL im Gate.
  - Nebenwirkungen: **S1** (bestehende Games teilweise retrograd FAIL — z.B. Marne/Mappe 1), **S5** (zwingt Nutzung der unterentwickelten Sub-Agenten), **S2** (zusaetzliche Material-Produktions-Zyklen).
  - Hebel: Hoch. Direktester Weg.

- **O-02-B (Soft-Warning + Abweichungs-Begruendungs-Pflicht) — S** — Gleiche Matrix, aber bei Verletzung nur WARN mit Pflicht-Begruendungs-Feld `_meta.medien_diversitaet_abweichung`. User kann Abweichung bestaetigen, das Game deployt trotzdem.
  - Nebenwirkungen: **S8** (Enforcement weich, Drift moeglich), **S3** (gering).
  - Hebel: Niedrig-mittel.

- **O-02-C (Sub-Agent-Reife-Programm parallel) — L** — Bevor Diversitaets-Zwang greift: SUB_MATERIAL_KARTE, SUB_MATERIAL_ZEITLEISTE, SUB_MATERIAL_STATISTIK auf gleiche Reife wie TAGEBUCH/QUELLENTEXT heben. Enthaelt: (i) Asset-Anbindung (Wikimedia-Search fuer Karten, Engine-Renderer-Test fuer Zeitleiste), (ii) Beispiele im Template, (iii) Q-Gate-Testlauf mit Dummy-Material. Erst nach Reife-Gate wird O-02-A aktiviert.
  - Nebenwirkungen: **S2** (reines Infrastruktur-Investment), **S4** (neue Parallel-Track in Upgrade-Plan).
  - Hebel: Sehr hoch mittelfristig, null kurzfristig.

- **O-02-D (Phase-0.1-Verschiebung: Repraesentationsform-Planung im DIDAKTIK_RAHMEN) — M** — AGENT_DIDAKTIK bekommt neuen Output: Pro Mappe eine `medien_skizze: {karte: bool, zeitleiste: bool, ...}` auf Basis der Mappen-Natur. AGENT_MATERIAL liest die Skizze und folgt ihr.
  - Nebenwirkungen: **S1** (neuer Output-Typ fuer AGENT_DIDAKTIK — bestehende DIDAKTIK_RAHMEN-Artefakte retrograd), **S4** (neue Vererbungs-Kette).
  - Hebel: Hoch. Behebt Ursache Upstream.

**Empfehlungs-Kandidat:** Kombination O-02-C (Reife) → dann O-02-A (Hard-Constraint). O-02-D zusaetzlich als Upstream-Verankerung.

---

### F-LS-M1-03 — Tagebuch-Titel haben Frage-Form

**Quellen-Trace:**
- `architektur/schemata/material-output-schema.json:139-143` — `titel` description: *"Soll als Frage formuliert sein (SuS-aktivierend)."* — das Schema selbst schreibt Frage-Titel fuer **alle** Material-Typen fest, typ-agnostisch.
- `agents/SUB_MATERIAL_TAGEBUCH.md:233` — MQ2: *"Tagebuch-Titel koennen auch perspektivisch formuliert sein ('Wie fuehlte sich die Spaltung Europas an?')"* — WARN-Lockerung, aber immer noch Frage-Form, nicht Tagebuch-Form.
- `agents/SUB_MATERIAL_QUELLENTEXT.md:280` — MQ2 (v3.10.4): *"Titel ist Frage oder praegnanter Kontextsatz — KEINE nominalisierte Konzeptnennung."* — erzwingt Frage oder Kontextsatz fuer Quellentext ebenfalls.
- **Kein Q-Gate `MAT-TITEL-FORM`** mit typ-spezifischer Differenzierung.

**Ursache-Mechanik:**
Schema-Beschreibung wirkt wie ein weicher Default, aber da Sub-Agenten das Schema als Wahrheit lesen und die Sub-Agenten sie weiter verstaerken (Tagebuch-MQ2 lockert nur zu "perspektivisch formulierte Frage"), ist Frage-Form der einzige gangbare Weg. Ein Tagebuch-konformes Format wie "Tagebucheintrag von Karl Meissner, Gefreiter an der Westfront" ist schemakonform (≥5 Chars, ≤120), aber die Sub-Agenten wurden darauf nicht konditioniert.

**Optionen:**

- **O-03-A (Schema-Beschreibung ersetzen, typ-agnostisch) — S** — `"Titel des Materials. Titel-Form richtet sich nach Typ — siehe SUB_MATERIAL_*-Pattern."`. Hebt den Schema-seitigen Frage-Zwang auf.
  - Nebenwirkungen: **S1** (gering, Schema-Description ist nicht validation-relevant), **S3** (Form-Integritaet-Gewinn, keine Inhalts-Kollision).
  - Hebel: Niedrig allein, notwendig als Voraussetzung fuer andere Optionen.

- **O-03-B (Typ-spezifische Titel-Pattern in Sub-Agenten) — S** — Jeder SUB_MATERIAL_*.md bekommt ein `Titel-Pattern`-Feld. Fuer `tagebuch`: `"Tagebucheintrag von {figur.name}, {figur.rolle}"` oder `"Aus dem Tagebuch des {figur.rolle} {figur.name}, {figur.ort}"`. Fuer `quellentext`-Einzelstimme: `"[Rolle] [Name] zu [Thema]"`. Fuer `darstellungstext`: Frage bleibt erlaubt. Fuer `bildquelle`: Kontextsatz (bestehende BQ-Regel).
  - Nebenwirkungen: **S1** (alle bestehenden Games haben die alten Frage-Titel — retrograd WARN/FAIL, abhaengig von Enforcement), **S4** (Sub-Agenten muessen Zugriff auf `_meta.figur` haben, was v3.10 T2.F-Luecke beruehrt).
  - Hebel: Mittel-hoch, direkt.

- **O-03-C (Neues Q-Gate MAT-TITEL-FORM, typ-sensitiv) — M** — Deterministischer Check in §7.1 nach SCHEMA-01: Pro `typ` ein Regex/Pattern-Match. Tagebuch: `^Tagebucheintrag|^Aus dem Tagebuch|^(Notizen|Feldpost)` etc. Quellentext: frei. Darstellungstext: endet mit `?` erlaubt. Etc.
  - Nebenwirkungen: **S1** (massiv retrograd), **S3** (zu enges Regex killt kreative Varianten).
  - Hebel: Mittel. Deterministisch, aber brittle.

- **O-03-D (Schema-Level `$defs/TagebuchMeta` mit `titel_pattern`-Enum) — M** — Schema-Erweiterung via `oneOf`-Diskriminator auf Typ-Ebene (gleicher Mechanismus wie v3.10 T2.F-Ticket). Feld `_meta.titel_pattern: "eintrag_name_rolle" | "ort_datum" | "figur_anrede"`. Sub-Agent muss einen Wert waehlen, Schema validiert.
  - Nebenwirkungen: **S1** (bricht bestehende Tagebuch-Materialien — schema-FAIL), **S4** (weitet T2.F-Ticket aus), **S6** (Engine-Rendering muss ggf. Pattern lesen — oder ignoriert es).
  - Hebel: Hoch — Schema enforced.

**Empfehlungs-Kandidat:** O-03-A + O-03-B als Minimal-Paket. O-03-C als Gate-Hinzunahme nur wenn Enforcement-Gap geschlossen wird. O-03-D bei v3.10 T2.F-Ticket-Umsetzung mitnehmen.

---

### F-LS-M1-04 — M2 Karl: Erzaehlerstimmen-Einschub didaktisch fehlplatziert

**Quellen-Trace:**
- `agents/SUB_MATERIAL_TAGEBUCH.md:127` — die komplette v3.6-Policy: *"STATTDESSEN: Die Figur beschreibt ihr ERLEBEN ... Systemisches Wissen (Zahlen, Definitionen, Strategien) wird transportiert durch: (a) einen kursiven Erzaehlerstimme-Rahmen VOR oder NACH dem Tagebuchabsatz (`<p><em>[Erzaehlerstimme]</em></p>`), oder (b) das zugehoerige Darstellungstext-Material, oder (c) die Lehrkraft im UG."*
- Position-Constraint im Policy-Text: *"VOR oder NACH"* — betrifft F-06.
- `architektur/Q-GATE-MECHANIK.md:156` — `TYP-TB-PERSPEKTIV`: *"PASS: Figur beschreibt nur eigenes Erleben; systemisches Wissen in Erzaehlerstimme ausgelagert oder absent."* — der Gate belohnt Existenz des Erzaehler-Einschubs, aber prueft nicht, ob er noetig war.
- **Kein Trigger-Kriterium** im Policy-Text fuer "Wann darf/muss ein Erzaehler-Einschub feuern". Die Policy liest sich als "immer wenn eine systemische Information gebraucht wird".

**Ursache-Mechanik:**
Die v3.6-Policy wurde eingefuehrt, weil Tagebuch-Materialien in fruehen Versionen systemisches Wissen in die Figurenrede gepackt hatten (Wissensgrenze-Verletzung). Die Loesung "Erzaehlerstimmen-Rahmen" adressiert das Symptom, erzeugt aber zwei neue Probleme:
1. **Trigger zu weit:** Jede systemische Information triggert den Einschub, auch wenn der Figurentext nichts Falsches behauptet, das korrigiert werden muesste. In M2 Karl beschreibt Karl sein Erleben; der Einschub "was Karl nicht wissen konnte" ist faktisch nicht korrigierend, nur ergaenzend-enzyklopaedisch.
2. **Form-Bruch belohnt:** Der Gate wertet die Existenz des Rahmens positiv, nicht die Notwendigkeit.

**Optionen:**

- **O-04-A (v3.6-Policy abschaffen, Erzaehler-Wissen in Schwester-Material) — XL** — Tagebuch-`inhalt` darf NUR Figuren-Stimme enthalten. Systemisches Wissen wird in ein separates `darstellungstext`-Material oder in eine `info_box` (siehe F-06) ausgelagert. Trigger-Bedingung entfaellt, weil das Problem nicht mehr beim Tagebuch entsteht.
  - Nebenwirkungen: **S1** (alle v3.6-Games mit Erzaehler-Einschuebe retrograd brechen), **S2** (mehr Materialien pro Mappe — Mengen-Limit §2.1 kollidiert), **S7** (v3.6 war explizit als Policy dokumentiert — deren Rueckbau bricht Policy-Historie).
  - Hebel: Sehr hoch. Behebt Form-Integritaet radikal.

- **O-04-B (v3.6-Policy erhalten, Trigger deterministisch verschaerfen) — M** — Policy bleibt, aber erhaelt ein explizites Trigger-Kriterium: "Erzaehlerstimmen-Einschub ist NUR zulaessig, wenn die Figurentext-Passage ohne den Einschub einen didaktisch relevanten Fehlschluss beim SuS erzeugen wuerde. Beispiel: Karl beschreibt 'Die Front zog sich ewig weit' — ohne Erzaehler-Einschub koennten SuS dies als 'ganz Europa war Schuetzengraben' missverstehen; MIT Erzaehler-Einschub '700 km Front' wird die Dimension praezisiert." Die Trigger-Entscheidung wird in `_meta.erzaehler_einschub_trigger` als Begruendungs-Feld dokumentiert.
  - Nebenwirkungen: **S8** (Trigger-Kriterium ist weich, schwer deterministisch zu pruefen), **S4** (neues `_meta`-Feld → Schema-Erweiterung), **S1** (retroaktiv pruefbar, M2 Karl waere nun FAIL).
  - Hebel: Mittel-hoch. Loest das Feuer-Problem ohne radikalen Policy-Bruch.

- **O-04-C (Gate TYP-TB-PERSPEKTIV umdrehen) — S** — Der bestehende Gate belohnt den Einschub. Er wird um eine zweite Pruefung ergaenzt: "Existiert ein Erzaehler-Einschub ohne dokumentierten Trigger, ist der Gate FAIL." Enforcement ueber das `_meta.erzaehler_einschub_trigger`-Feld aus O-04-B.
  - Nebenwirkungen: erfordert O-04-B.
  - Hebel: Niedrig allein.

- **O-04-D (Figuren-Wahl neu: Rollen-/Rangstufen-Matching) — M** — Wenn die systemische Information gebraucht wird, waehle eine Figur, die sie wissen kann (Offizier statt Gefreiter). Dann entfaellt der Erzaehler-Einschub, weil die Figur selbst das Wissen ausspricht. Erfordert eine Rollen-Hierarchie in Phase 2.1.
  - Nebenwirkungen: **S2** (neue Figurenwahl-Schleife), **S7** (bricht die "authentische R7-Erfahrungsperspektive"-Policy, die R7-Adressaten durch einfache Figuren ansprechen will).
  - Hebel: Mittel — verschiebt das Problem auf die Figurenwahl.

**Empfehlungs-Kandidat:** O-04-A ist die saubere Loesung, aber S1/S2/S7 sind massiv. O-04-B+C als kontrollierbarer Mittelweg. Die Entscheidung zwischen A und B+C ist der zentrale v3.12-Entscheidungspunkt der Achse C.

---

### F-LS-M1-05 — M4 Sprecher-Attribution + schwammiger Titel

**Quellen-Trace:**
- `architektur/schemata/material-output-schema.json:145-185` — `inhalt` ist `oneOf` (String/Array/Object), Quellentext faellt auf String-HTML-Block. **Kein `stimmen[]`-Subtyp** im Schema.
- `agents/SUB_MATERIAL_QUELLENTEXT.md:214` — Rekonstruktions-Format-Regel (em + [sinngemäß]-Marker) greift, aber fuer einzelne Passagen, nicht fuer Mehrstimmen-Struktur.
- `agents/SUB_MATERIAL_QUELLENTEXT.md:218` — *"Im `inhalt`-Feld duerfen Sprecher-/Rollennamen erscheinen (z.B. 'Stefan Zweig:'), aber NICHT bibliographische Angaben."* — Sprecher als Textpraefix erlaubt, keine Struktur-Pflicht.
- `agents/SUB_MATERIAL_QUELLENTEXT.md:280` — MQ2 (v3.10.4) Titel-Regel: Frage oder Kontextsatz + Ambiguitaets-Sperre. Kein "Titel-Zweck"-Check.
- Engine-Seite: `escape-engine.js` rendert `inhalt` als rohes HTML. Kein Sprecher-Komponenten-Markup.

**Ursache-Mechanik:**
H1: Schema kennt Mehrstimmen-Struktur nicht. Sub-Agent muss Sprecher-Trennung manuell ueber HTML (`<strong>`, `<em>`, Zeilenumbrueche) modellieren, was inkonsistent und visuell-unklar bleibt.
H2: Titel-Zweck ist nicht Teil von MQ2. MQ2 prueft gegen Eindeutigkeit, nicht gegen Operationalitaet fuer SuS.

**Optionen:**

- **O-05-A (Schema-Erweiterung `QuellentextMehrstimmen`) — L** — Neuer Subtyp im `oneOf` von `inhalt`: `{"stimmen": [{"sprecher": string, "rolle": string, "text": string, "rekonstruiert": bool, "quelle": string}]}`. Sub-Agent waehlt zwischen Einzelstimme (bisheriger HTML-String) und Mehrstimmen (neuer Array-Subtyp).
  - Nebenwirkungen: **S6** (`escape-engine.js` muss neuen Subtyp rendern — Runtime-Regression auf bestehenden Games, wenn Migration nicht sauber), **S1** (bestehende Mehrstimmen-Quellen sind HTML-kodiert — migrations-pflichtig), **S4** (Q-Gate TYP-QT-REKON muss den neuen Subtyp verstehen).
  - Hebel: Hoch. Loest die strukturelle Ursache.

- **O-05-B (HTML-Pattern-Convention ohne Schema-Aenderung) — S** — Im Sub-Agenten-Template explizit: *"Fuer Mehrstimmen-Quellen: pro Sprecher ein `<figure class=\"stimme\" data-sprecher=\"{name}\" data-rolle=\"{rolle}\"><blockquote>...</blockquote><figcaption>{name}, {rolle}</figcaption></figure>`-Block."* Engine-CSS stylt die Klasse.
  - Nebenwirkungen: **S8** (Regex-Enforcement weich, HTML-Drift moeglich), **S6** (CSS-only, kein JS-Bruch).
  - Hebel: Mittel. Schnell, aber brittle.

- **O-05-C (Neuer Gate TITEL-ZWECK, SUB-Agent-lokal) — S** — `SUB_MATERIAL_*` bekommt einen Pruef-Abschnitt: "Der Titel muss entweder (a) einen operationalen Fokus fuer SuS ankuendigen (z.B. 'Zwei Perspektiven auf Verdun') oder (b) Tagebuch-Form (F-03) oder (c) kontextualisierenden Statement-Satz. Rhetorisch-wertende Fragen ('Wofuer starben...') sind nur erlaubt, wenn sie durch den Material-Inhalt klar beantwortbar sind."
  - Nebenwirkungen: **S8** (weiche Pruefung), **S3** (faengt den User-Fall, aber eng kalibriert).
  - Hebel: Mittel.

- **O-05-D (Operator-Titel-Katalog fuer Quellentext) — M** — Analog zu Aufgaben-Operatoren (F-08): Pro Material-Typ ein erlaubter Titel-Operator-Katalog. Fuer Quellentext-Mehrstimmen: `"Wie beschrieb {Sprecher1} die {Situation}?"` oder `"Zwei Perspektiven auf {Ereignis}"`. Sub-Agent waehlt Template, nicht freier Text.
  - Nebenwirkungen: **S3** (Monoton), **S1** (retrograd).
  - Hebel: Mittel.

**Empfehlungs-Kandidat:** O-05-A (Schema) + O-05-C (Titel-Zweck-Gate). O-05-B als Uebergangs-Loesung, falls Schema-Runde verschoben wird.

---

### F-LS-M1-06 — M5 Friedrich: Erzaehler-Einschub mittendrin statt Info-Box

**Quellen-Trace:**
- `agents/SUB_MATERIAL_TAGEBUCH.md:127` — *"VOR oder NACH dem Tagebuchabsatz"* — Policy erlaubt zwei Positionen. M5 hat den Einschub **mittendrin**, was policy-technisch FAIL waere, aber nicht von einem Gate gefangen wird.
- `architektur/schemata/material-output-schema.json` — **kein `info_box`-Feld**. Sekundaer-Container existiert nicht.
- Engine-Rendering: monolithisches `inhalt`-HTML.

**Abgrenzung zu F-04:** F-04 = Trigger-Problem (Einschub war inhaltlich unnoetig). F-06 = Positions-Problem (Einschub war sinnvoll, aber am falschen Ort). Die Loesungen koennen orthogonal sein.

**Ursache-Mechanik:**
H1: Position-Constraint "VOR oder NACH" wird nicht deterministisch gecheckt. Ein Regex-Check auf `<p><em>...</em></p>`-Position innerhalb des `inhalt`-HTML-Blocks waere moeglich, existiert aber nicht.
H2: Keine Alternative-Positionierung wie "Info-Box am Ende" existiert im Schema. Die "info_box"-Idee ist nur im Befund formuliert, nicht im Repo.

**Optionen:**

- **O-06-A (Schema-Erweiterung `info_box`) — M** — Neues optionales Feld pro Material: `"info_box": {"titel": string, "inhalt": string, "zweck": "fachlicher_kontext" | "begriffsklaerung" | "weiterfuehrend"}`. Sub-Agenten migrieren Erzaehler-Einschuebe aus `inhalt` nach `info_box`, wenn die Policy sagt "Kontext noetig, aber Figurentext erhalten".
  - Nebenwirkungen: **S6** (Engine-Rendering muss `info_box` als `<aside>` oder Card darstellen), **S1** (migration bestehender Games), **S4** (neue Content-Produktion in Sub-Agenten).
  - Hebel: Hoch. Trennt Figuren-Stimme sauber von Kontext.

- **O-06-B (Position-Check deterministisch pro `<em>`-Block) — S** — Q-Gate-Addendum: `inhalt`-String wird parsed, `<em>`-Bloecke extrahiert, Position geprueft. FAIL wenn `<em>`-Block zwischen zwei Figuren-`<p>`-Bloecken steht (nicht am Anfang/Ende).
  - Nebenwirkungen: **S1** (retrograd), **S8** (parsing brittle), **S3** (verhindert legitime Mitten-Markierungen — z.B. Datum).
  - Hebel: Niedrig-mittel, kurzfristig.

- **O-06-C (Content-level Migrate: Erzaehler-Absatz ans Ende) — S** — Einfache Post-Dispatch-Korrektur: Sub-Agent produziert `inhalt` frei, Vertrag-Script verschiebt alle `<p><em>...</em></p>`-Bloecke ans Ende. Keine Schema-Aenderung.
  - Nebenwirkungen: **S3** (dramaturgische Reihenfolge kann zerstoert werden), **S8** (Regex-Parse auf HTML brittle).
  - Hebel: Niedrig — Workaround, keine Loesung.

**Empfehlungs-Kandidat:** O-06-A als strukturelle Loesung. O-06-B als Interim. O-06-C ablehnen (zu viele Regex-Side-Effects).

---

### F-LS-M1-07 — Aufgabe 6: Umlaute + zu strenge Korrektheits-Pruefung

**Quellen-Trace — Umlaut-Dimension:**
- `architektur/Q-GATE-MECHANIK.md:179` — TYP-01-A als Katalog-Eintrag ohne Script-Enforcement.
- `architektur/vertraege/VERTRAG_PHASE_0-1_DIDAKTIK.md:123`, `0-2_INHALT.md:142`, `0-3_SKRIPT.md:166`, `0-4_HEFTEINTRAG.md:169` — **alle vier Phase-0-Vertraege fordern: "Sprache: Deutsch, Umlaute als ae/oe/ue (Dateikompatibilitaet)"**. Das ist der strukturelle Primaer-Defekt: Phase-0-Artefakte entstehen per Vertrag in ASCII-Form.
- `agents/SUB_AUFGABE_BEGRUENDUNG.md:113-114` — Beispiel im Sub-Agent-Template verwendet ASCII: *"Die Begeisterung war ueberwiegend inszeniert"*, *"Konformitaetsdruck"*. Das Sub-Agent-Template selbst modelliert ASCII-Output.
- `agents/SUB_AUFGABE_BEGRUENDUNG.md:193` — Engine-Pruefung ist laut Spec *"fuzzy, Umlaut-tolerant"* — die Engine-seitige Matching-Logik ist also korrekt, der Defekt liegt ausschliesslich im sichtbaren Text (frage, tipps, feedback, loesung.claim/reasoning).
- `agents/SUB_AUFGABE_FREITEXT.md:322`, `AGENT_HEFTEINTRAG.md:278`, alle SUB_MATERIAL_*.md — **sagen UTF-8-Umlaute** explizit. Die Phase-2-Dokumente sind UTF-8-fordernd, die Phase-0-Vertraege ASCII-fordernd. Das ist ein Phasen-Policy-Konflikt.
- `architektur/Q-GATE-MECHANIK.md:207-220` — die STOP_DEFAULT-Liste im Lemma-Check enthaelt selbst ASCII: *"ueber", "fuer", "koennen", "muessen"*. Der Pruef-Code normalisiert implizit auf ASCII.

**Quellen-Trace — Pruefstrenge-Dimension:**
- `agents/SUB_AUFGABE_BEGRUENDUNG.md:67-69,172-175` — CER-Struktur mit `_meta.akzeptierte_claims` (min 2) + `evidence[]` ANY-Match + `reasoning_schluesselbegriffe` Schwelle-Match. Engine-Pruefung ist semantisch gewollt streng, weil das die didaktische Leistung (Bewertung statt bloßer Wiedergabe) sicherstellt.
- **Kein `pruef_modus`-Feld** in Aufgaben-Schema. **Kein Engine-Feature-Flag**.
- `VERTRAG_PHASE_2-2b_AUFGABE.md:125` — typ-Enum geschlossen, kein `*-permissive`-Derivat.

**Ursache-Mechanik:**

*Umlaut-Dimension:*
Der Zentraldefekt ist der Phase-0-Vertrags-Text, der ASCII-Umlaute explizit fordert (warum? "Dateikompatibilitaet" — vermutlich aelterer Grund, als Filesysteme oder Pipelines Unicode-Probleme hatten). Phase-2-Dokumente fordern UTF-8, aber Phase-2.2b-Aufgaben referenzieren die Phase-0-Artefakte (SKRIPT, HEFTEINTRAG mit `loesung[]`) und uebernehmen deren ASCII-Form. Zusaetzlich sind die Sub-Agent-Templates selbst ASCII-kontaminiert (Beispiele, STOP_DEFAULT-Listen), was der LLM-Output als Stilrichtung interpretiert.

TYP-01-A hat keinen deterministischen Enforcer — der Gate existiert als Tabellen-Zeile, wird aber im Dispatch-Zyklus als "PASS" notiert, ohne dass etwas geprueft wurde.

*Pruefstrenge-Dimension:*
Die Engine-Pruefung ist didaktisch begruendet (CER-Schema erzwingt Bewertungs-Leistung). Der User will diese Strenge fuer die aktuelle Deploy-Phase senken, um Frustration zu vermeiden. Das ist eine **Deployment-Phase-Policy**, nicht eine didaktische Default-Entscheidung. Die Infrastruktur hat keinen Mechanismus, um Pruefstrenge pro Deploy-Phase zu modulieren.

**Optionen (Umlaut):**

- **O-07-U-A (Phase-0-Vertraege umstellen auf UTF-8) — L** — Zeile `"Sprache: Deutsch, Umlaute als ae/oe/ue"` in allen vier Phase-0-Vertraegen ersetzen durch `"Sprache: Deutsch, Umlaute als echte UTF-8 (ä/ö/ü/ß). Begruendung 'Dateikompatibilitaet' ist obsolet."`. AGENT_SKRIPT, AGENT_DIDAKTIK, AGENT_INHALT, AGENT_HEFTEINTRAG werden ebenfalls angepasst.
  - Nebenwirkungen: **S1** (alle bestehenden Phase-0-Artefakte retrograd inkonsistent — Marne/Ursachen und alle aelteren Games), **S8** (ohne Enforcement bleibt die Policy schwach).
  - Hebel: Hoch — behebt die Upstream-Ursache.

- **O-07-U-B (Deterministischer TYP-01-A-Checker als Script) — S** — `tools/typ-check-aufgaben.sh` (analog `tools/deploy-check.sh` aus v3.11). Grep gegen ASCII-Ersatz-Muster in `aufgaben[*].{frage,tipps[*].text,feedback[*].text,loesung.claim,loesung.reasoning,loesung.evidence[*]}`. Blocking-Gate in Phase-2.2b-Abschluss und im Deploy-Check.
  - Nebenwirkungen: **S1** (Marne-Game wuerde sofort FAIL), **S3** (ae/oe/ue als legitime Abkuerzung im Englischen/Code — Whitelist noetig).
  - Hebel: Sehr hoch bei bereits vorhandener Produktion.

- **O-07-U-C (Post-Dispatch-Normalisierung) — M** — AGENT_AUFGABE bekommt einen Post-Processing-Schritt: ASCII-Ersatz → UTF-8-Umlaute via deterministische Mapping-Tabelle. Mit Warn-Log, weil die Tabelle mehrdeutig sein kann (`ue` kann korrekt sein, z.B. in "Queue"; `ss` kann ß sein oder doppel-s). Whitelist fuer Fachbegriffe.
  - Nebenwirkungen: **S3** (Fehlmapping moeglich — "Vietnam" wird nicht zu "Vietnäm", aber Kante-Faelle muessen abgefangen werden), **S8** (Normalisierung vor dem Gate koennte das Gate umgehen).
  - Hebel: Hoch. Pflaster-Loesung, die den User-Defekt sofort beseitigt.

- **O-07-U-D (Sub-Agent-Template-Saeuberung) — S** — Alle ASCII-Beispiele in SUB_AUFGABE_*.md und STOP_DEFAULT-Listen auf echte Umlaute umstellen. LLM-Output wird dem Template folgen.
  - Nebenwirkungen: **S1** (gering, nur Template-Text), **S8** (keine Enforcement-Verbesserung).
  - Hebel: Niedrig-mittel — notwendig, aber nicht hinreichend.

**Optionen (Pruefstrenge):**

- **O-07-P-A (Globales Engine-Flag `PERMISSIVE_CHECK_MODE`) — M** — In `assets/escape-engine.js` (weitergehts-online): wenn `data.meta.pruef_modus === "permissive"`, ueberspringt die Engine alle semantischen Pruefungen (claim-match, reasoning-match, keyword-count) und akzeptiert jede nicht-leere Eingabe. Feedback faellt auf neutralen "Danke fuer deine Antwort"-Text zurueck.
  - Nebenwirkungen: **S7** (die gesamte didaktische Pruefstrenge-Architektur wird lokal deaktiviert — Bloom L5/L6-Aufgaben werden didaktisch sinnlos), **S6** (Engine-Aenderung — Feature-Flag muss ruecksichern).
  - Hebel: Sehr hoch — sofortiger Frustrations-Abbau.

- **O-07-P-B (Pro-Aufgabe `pruef_modus`-Feld) — M** — Schema-Erweiterung: `aufgabe.pruef_modus: "streng" | "nicht_leer" | "lehrer_eval"`. Default bleibt "streng", Sub-Agent oder Author kann pro Aufgabe lockern. Feedback-Text passt sich an.
  - Nebenwirkungen: **S1** (Schema-Migration), **S7** (selektiver, aber gleicher didaktischer Trade-off wie O-07-P-A), **S4** (AGENT_DIDAKTIK muss pro Aufgabe entscheiden).
  - Hebel: Hoch, kontrollierbarer als globaler Flag.

- **O-07-P-C (Feedback-First-Policy: Strenge bleibt, Feedback kompensiert) — L** — Pruefung bleibt streng, aber die Aufgabe wird immer als "gespeichert, akzeptiert" markiert und Feedback zeigt die Musterloesung als Vergleich. SuS sehen ihr Ergebnis + Musterloesung ohne Fail-Zustand.
  - Nebenwirkungen: **S7** (entkoppelt Lernen von Bewertung — didaktisch vertretbar, aber bricht die Escape-Room-Mechanik "naechste Aufgabe erst nach Loesung"), **S6** (Engine-Progress-Logik muss umgebaut werden), **S2** (jedes Feedback-Feld muss Musterloesung enthalten).
  - Hebel: Sehr hoch didaktisch, hoch invasiv technisch.

- **O-07-P-D (Deploy-Phase-Policy explizit) — S** — PROJECT_INSTRUCTIONS.md oder VERTRAG_PHASE_2-2b_AUFGABE.md bekommen eine Section "Deployment-Reife-Phasen": *Alpha = permissive, Beta = moderate, Produktiv = streng.* Pro Game wird die Phase im `meta`-Objekt festgehalten. Enforcement-Mapping: Phase → `pruef_modus`.
  - Nebenwirkungen: **S4** (neue Meta-Dimension), **S7** (Policy-Debatte "wann ist ein Game reif?").
  - Hebel: Hoch als Rahmenpolicy, erfordert A oder B als Mechanismus.

**Empfehlungs-Kandidat Umlaut:** O-07-U-A + O-07-U-B + O-07-U-D in Kombination. O-07-U-C nur als Uebergangs-Heilung fuer bestehende Games.
**Empfehlungs-Kandidat Pruefstrenge:** O-07-P-B (selektiv) kombiniert mit O-07-P-D (Phase-Policy). O-07-P-A als Notfall-Switch. O-07-P-C als mittelfristige Ziel-Architektur.

---

### F-LS-M1-08 — Aufgabe 7: Umlaute + Meta-Frage zu schwammig

**Quellen-Trace:**
- Umlaut-Dimension identisch F-07.
- `agents/SUB_AUFGABE_FREITEXT.md:73` — *"Operationalisierungsziel: `[AFB-Operator] + [TB-Knoten-Merksatz als Frageform]`"*. Das Template erzwingt die Frage-Form aus dem Merksatz, was die rhetorische Unschaerfe der Stundenfrage weiterpropagiert.
- `agents/SUB_AUFGABE_FREITEXT.md:103-105` — es gibt bereits eine Operatoren-Tabelle, aber die Frage-Stamm-Konstruktion greift primaer auf `Merksatz-als-Frageform`, nicht auf den Operator.
- `agents/SUB_AUFGABE_FREITEXT.md:196` — A2b (v3.4): *"Fragestamm enthaelt mind. 1 konkretes Element"* — guter Check gegen Meta-Begriff-Drift, aber nicht gegen rhetorische Verdichtung.
- `agents/SUB_AUFGABE_FREITEXT.md:243` — *"Fragestamm-Kurzregel: max 12 Woerter. Den Operator NICHT woertlich benennen."* — Die Kurzregel **verbietet explizit**, den Operator im Fragestamm sichtbar zu machen. Das steht im Widerspruch zum User-Wunsch ("Schreibe eine kurze Zusammenfassung").
- `VERTRAG_PHASE_2-2b_AUFGABE.md` — kein Muster fuer Position 7 als Abschluss-Aufgabe.

**Ursache-Mechanik:**
H1: Der Operationalisierungs-Heuristik "Operator + Merksatz-als-Frageform" erbt die Form der Stundenfrage. Wenn die Stundenfrage rhetorisch ist (F-01), ist Aufgabe 7 rhetorisch.
H2: Die Kurzregel "Operator NICHT woertlich benennen" verhindert explizit das vom User gewollte Muster ("Schreibe eine Zusammenfassung"). Zwei widerstreitende Gestaltungs-Richtlinien.

**Optionen:**

- **O-08-A (Operator-First-Stamm fuer Position 7) — S** — Neue Regel in SUB_AUFGABE_FREITEXT: *"Bei Position 7 (Abschluss-Aufgabe einer Mappe) wird der Fragestamm als expliziter Operator-Satz formuliert: 'Schreibe eine kurze Zusammenfassung zu {Thema}.' oder 'Fasse in eigenen Worten zusammen, was du ueber {Thema} gelernt hast.' Die Kurzregel (Operator nicht woertlich) gilt fuer Positionen 1-6, nicht fuer 7."*.
  - Nebenwirkungen: **S1** (alle bestehenden Position-7-Aufgaben retrograd gebrochen), **S3** (die Kurzregel war didaktisch begruendet — brechen schmerzt), **S7** (A7 Operator-Praezision wird neu interpretiert).
  - Hebel: Mittel-hoch. Direkter Fix.

- **O-08-B (Abschluss-Aufgaben-Muster-Katalog in VERTRAG_PHASE_2-2b) — M** — Neuer Abschnitt "Mappen-Abschluss-Aufgabe (Position 7)" mit Enum `{"zusammenfassung", "stellungnahme", "vergleich", "kernerkenntnis"}`. Pro Muster ein Operator-Template. Sub-Agent waehlt das Muster.
  - Nebenwirkungen: **S1** (retrograd), **S4** (neue Dispatch-Entscheidung in AGENT_DIDAKTIK bei PROGRESSIONSPLAN).
  - Hebel: Hoch.

- **O-08-C (Kopplung an F-01-Outcome) — M** — Wenn Achse A implementiert wird: Aufgabe 7 erbt ihren Frage-Stamm nicht mehr aus der (nun operational formulierten) Stundenfrage, sondern verwendet einen expliziten Meta-Operator. Damit wird F-08 als Downstream-Folge von F-01 behoben, nicht als eigenes Ticket.
  - Nebenwirkungen: abhaengig von Achse-A-Entscheidung.
  - Hebel: Sehr hoch, wenn Achse A greift.

- **O-08-D (Kurzregel aufweichen) — S** — Zeile *"Den Operator NICHT woertlich benennen"* in `SUB_AUFGABE_FREITEXT.md:243` entfernen oder auf Position 1-6 beschraenken.
  - Nebenwirkungen: **S3** (das didaktische Argument hinter der Kurzregel war: Operator nennt den kognitiven Prozess und wird durch die Verdichtung implizit — Aufweichung verliert diese Schule). **S1** (Retrograd).
  - Hebel: Niedrig allein.

**Empfehlungs-Kandidat:** O-08-B als Haupt-Mechanismus, O-08-A als Regel-Konkretisierung, O-08-D als notwendige Begleit-Regel-Aenderung. O-08-C als Test-Fall fuer Achse-A-Durchschlag.

---

## 3. Achsen-Synthese — Options-Kombinatorik

Fuer jede Achse: welche Optionen sich **verstaerken** (✓), **neutral** zueinander sind (·), oder **konfligieren** (✗).

### Achse A — Stundenfrage-Grounding + Frage-Form-Integritaet (F-01, F-08)

| | O-01-A | O-01-B | O-01-C | O-01-D | O-08-A | O-08-B | O-08-C | O-08-D |
|---|---|---|---|---|---|---|---|---|
| O-01-A (Judge) | | ✓ | ✓ | · | ✓ | ✓ | ✓ | · |
| O-01-B (Lemma) | ✓ | | ✓ | · | ✓ | ✓ | ✓ | · |
| O-01-C (Upstream) | ✓ | ✓ | | ✗ | ✓ | ✓ | ✓ | · |
| O-01-D (C1b weg) | · | · | ✗ | | ✓ | ✓ | · | · |
| O-08-C (Kopplung) | ✓ | ✓ | ✓ | · | ✓ | ✓ | | ✓ |

**Beobachtung:** O-01-C (Upstream-Phase-0.3) und O-01-D (C1b abschaffen) konfligieren, weil O-01-C auf C1b aufbaut. O-01-B + O-01-C + O-08-B bilden das kohaerenteste Bundle.

### Achse B — Medien-Diversitaet + Sub-Agent-Reife (F-02)

Kein Cross-Cut-Konflikt innerhalb F-02. Die Kombi O-02-C (Reife) → O-02-A (Hard-Constraint) → O-02-D (Upstream-Skizze) ist linear. **Externe Konflikte:** O-02-A konfligiert mit O-04-A (Mehr-Material-Bedarf bei gleichzeitiger Materialzahl-Erhoehung durch v3.6-Rueckbau — S2 kumuliert).

### Achse C — Material-Form-Integritaet + v3.6-Revision (F-03, F-04, F-05, F-06)

Zentraler Entscheidungspunkt: **O-04-A (v3.6 abschaffen) vs. O-04-B+C (v3.6 verschaerfen)**.

Wenn O-04-A gewaehlt wird, entfallen F-06-Optionen O-06-A/B/C teilweise (weil `info_box` nur noch fuer Nicht-Tagebuch-Materialien relevant bleibt). F-03 und F-05 sind davon unabhaengig.

Wenn O-04-B+C gewaehlt wird, bleibt F-06 als eigenes Ticket und O-06-A (info_box) wird noetig, um die zulaessige v3.6-Form "Info-Box unten" abzubilden.

| Pfad | Implikation |
|---|---|
| **Pfad C-ABSCHAFFEN:** O-04-A + O-03-B + O-05-A/C | Radikale Form-Integritaet. S1/S2/S7 hoch. Sauberste Ziel-Architektur. |
| **Pfad C-VERSCHAERFEN:** O-04-B+C + O-06-A + O-03-B + O-05-A/C | Kontrollierter Umbau. S1 moderat. v3.6-Policy bleibt Historie. |

### Achse D — Q-Gate-Enforcement-Gap + Schwierigkeits-Policy (F-07, F-08-Technik)

Drei Sub-Tracks:
1. **Umlaut-Enforcement:** O-07-U-B (Script-Checker) ist notwendige Basis. O-07-U-A (Phase-0-Vertraege) behebt Upstream. O-07-U-D (Template-Saeuberung) ist Begleitmassnahme.
2. **Pruefstrenge-Policy:** Pfad-Entscheidung zwischen O-07-P-A (globaler Flag), O-07-P-B (pro Aufgabe), O-07-P-C (Feedback-First). Achse D ist hier orthogonal zur didaktischen Bloom-Taxonomie — jede Option kollidiert mit S7.
3. **Enforcement-Framework allgemein:** siehe §4 unten.

---

## 4. Meta-Struktur-Optionen (Cross-Cut)

Zwei Massnahmen gelten ueber alle Achsen hinweg und sollten als eigene Tracks betrachtet werden:

### M-01 — Q-Gate-Enforcement-Audit + Framework

**Diagnose:** TYP-01-A ist nicht der einzige Gate ohne deterministischen Enforcer. Die Vermutung aus Befund §5.2 muss empirisch geprueft werden.

**Scope:**
1. **Audit-Script:** Pro Q-Gate in `Q-GATE-MECHANIK.md` pruefen, ob eine deterministische Implementierung existiert (Script, Regex, Sub-Agent-Pruefung). Ergebnis: Tabelle `gate_id | enforcer | enforcer_type (script/sub-agent/llm-judge/none) | location`.
2. **Framework:** Einheitlicher Enforcement-Runner `tools/q-gate-run.sh <phase> <artefakt>`, der alle Gates einer Phase sequenziell ausfuehrt und PASS/FAIL-Matrix liefert. Analog `deploy-check.sh` aus v3.11, aber phasen-agnostisch.
3. **Vertrags-Erweiterung:** Jeder Phasen-Vertrag bekommt eine Pflicht-Sektion "Gate-Enforcement-Map", die die Gates mit ihren Enforcern verlinkt. Ohne Enforcer → Gate ist WARN (nicht PASS).

**Nebenwirkungen:** **S1** (viele bestehende Artefakte werden von WARN auf PASS/FAIL umklassifiziert), **S2** (Aufwand fuer jeden fehlenden Enforcer), **S4** (Run-Time der Gate-Checks steigt).

### M-02 — Phase 3.3 "Live-Sichtung" als formelle Phase

**Diagnose:** Post-Deploy-Sichtung ist bisher Ad-Hoc. Alle 8 Findings dieser Runde sind durch Pre-Deploy-Testruns nicht gefangen worden, weil diese strukturell gegen Artefakte pruefen, nicht gegen SuS-Erfahrung.

**Scope:**
1. **State-Machine-Erweiterung:** `PROJECT_INSTRUCTIONS.md` bekommt Phase 3.3 "Sichtung" zwischen 3.2 "Live-Go" und 4.x "Nachbereitung".
2. **Neuer Gate-Katalog `SICHT-01..n`:** Deterministische Checks fuer Post-Deploy-Sichtung. Beispiele: `SICHT-01` Landing-Page-Titel-Konsistenz, `SICHT-02` Material-Mix-Inspektion, `SICHT-03` Aufgaben-Typografie-Rescan im Live-Artefakt.
3. **Sichtungs-Protokoll:** Pflicht-Artefakt `SICHTUNG_G{N}_M{M}.md` pro Mappe mit Sektionen `beobachtet`, `ist-zustand`, `finding-klasse`.
4. **Rueckkopplungs-Mechanismus:** Findings werden zu Upgrade-Tracks konsolidiert (so wie dieser Befund).

**Nebenwirkungen:** **S2** (Sichtungs-Phase braucht User-Zeit), **S4** (State-Machine komplexer), **S8** (Heuristik, nicht deterministisch fuer didaktische Defekte).

### M-03 — Sub-Agent-Reife-Audit

Parallel zu Achse B: Welche Sub-Agenten sind reif, welche nicht? Kriterien: (i) Gibt es Engine-Rendering, (ii) Gibt es Asset-Pipeline, (iii) Wurde der Sub-Agent je in einem Game verwendet, (iv) Gibt es Beispiel-Output im Template, (v) Q-Gate-Durchlauf-Log. Ergebnis: Reife-Matrix. Priorisierung fuer Achse-B-Implementierung.

---

## 5. Nebenwirkungs-Summen-Ueberblick

Pro Achse eine grobe Einschaetzung der kumulierten Nebenwirkungs-Last (Skala 1-5 pro S-Klasse):

| Achse | S1 | S2 | S3 | S4 | S5 | S6 | S7 | S8 |
|---|---|---|---|---|---|---|---|---|
| A (SF-Grounding) | 4 | 2 | 3 | 2 | 0 | 0 | 1 | 2 |
| B (Medien-Div) | 3 | 4 | 1 | 3 | 5 | 2 | 1 | 1 |
| C (Form-Integritaet + v3.6) | 5 | 4 | 3 | 3 | 1 | 3 | 4 | 2 |
| D (Enforcement + Permissive) | 4 | 2 | 2 | 2 | 0 | 2 | 4 | 3 |

**Lesung:** Achse C hat die hoechste kumulierte Last, weil der v3.6-Rueckbau-Pfad fast alle Kategorien beruehrt. Achse B hat maximale S5 (Sub-Agent-Reife-Drift), weil sie genau das Problem erzwingt. Achse A und D sind mittel-belastet.

**Reihenfolge-Hypothese (nicht entschieden):** D vor A vor B vor C, weil:
- D hat den hoechsten Hebel bei niedrigster Reife-Abhaengigkeit (nur Scripte, keine Sub-Agent-Aenderungen).
- A kann weitgehend deterministisch operationalisiert werden.
- B erfordert erst Sub-Agent-Reife-Investment.
- C ist die groesste Policy-Debatte und sollte zuletzt entschieden werden, wenn die kleineren Achsen Erfahrung geliefert haben.

Diese Reihenfolge ist **ein Denkvorschlag, keine Empfehlung**. Der User kann die Reihenfolge anders setzen.

---

## 6. Offene Fragen (User-Entscheidungen erforderlich)

1. **Achse C / v3.6-Policy:** Abschaffen (O-04-A) vs. Verschaerfen (O-04-B+C)? Diese Entscheidung ist der groesste Einzel-Scope-Treiber in v3.12.
2. **Retroaktive Fixes:** Werden die bestehenden Games (Marne, Ursachen) retrograd gepflastert, oder gilt v3.12 nur fuer neu generierte Games?
3. **Achse D / Pruefstrenge:** Globaler Flag (O-07-P-A), pro Aufgabe (O-07-P-B) oder Feedback-First (O-07-P-C)?
4. **Phase 3.3:** Wird die Live-Sichtung als eigene State-Machine-Phase etabliert (M-02), oder bleibt sie Ad-Hoc?
5. **Upgrade-Runden-Struktur:** Eine Runde v3.12 mit allen Achsen, oder mehrere Mini-Runden (v3.12, v3.13, v3.14) pro Achse?
6. **Q-Gate-Enforcement-Audit (M-01):** Parallel-Track oder Teil von v3.12?
7. **Sub-Agent-Reife-Programm (M-03 / Achse B):** Eigenstaendiger Track oder Voraussetzung fuer v3.12-Implementierung?

---

## 7. Abgrenzung: Was dieses Scoping NICHT leistet

- Keine Implementierungs-Entscheidung. Alle Optionen sind Vorschlaege, keine Zusagen.
- Keine Priorisierung der Achsen oder Findings.
- Keine Time-/Cost-Estimates.
- Keine Policy-Entscheidung zur v3.6-Debatte.
- Keine Pruefung, ob Game 1 (Ursachen) die gleichen Defekte aufweist. (Paralleler Sichtungs-Befund waere eigenes Artefakt.)
- Kein Zwischen-Eingriff in den Generator: die hier zitierten Datei:Zeile-Referenzen wurden nur gelesen, nicht veraendert.

---

## 8. Referenzen (verifiziert gegen aktuellen Commit)

- `escape-game-generator/architektur/Q-GATE-MECHANIK.md` §7.1 (Material), §7.2 (Aufgaben), §7.3 (Rahmen), Zeile 155 (TYP-01), 156 (TYP-TB-PERSPEKTIV), 179 (TYP-01-A), 190-191 (C1b/M3b)
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_0-1_DIDAKTIK.md:123` (ASCII-Policy)
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_0-2_INHALT.md:142` (ASCII-Policy)
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_0-3_SKRIPT.md:166` (ASCII-Policy)
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_0-4_HEFTEINTRAG.md:169` (ASCII-Policy)
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_2-0_RAHMEN.md:93-94,107` (C1b)
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_2-1_MATERIAL.md:219` (Perspektiven-Verteilungs-Constraint, kein Medien-Mix)
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_2-2b_AUFGABE.md:125` (Typ-Enum)
- `escape-game-generator/architektur/schemata/material-output-schema.json:139-143` (Titel-Beschreibung)
- `escape-game-generator/agents/AGENT_HEFTEINTRAG.md:44,278` (Stundenfrage-Uebernahme, UTF-8-Regel)
- `escape-game-generator/agents/AGENT_MATERIAL.md:57-59,125-136,162` (Sub-Agent-Zuordnung, Mindest-Mengen)
- `escape-game-generator/agents/SUB_MATERIAL_TAGEBUCH.md:127,168,197,233` (v3.6-Policy, Quellen-Regel, T2.F-Luecke, MQ2)
- `escape-game-generator/agents/SUB_MATERIAL_QUELLENTEXT.md:214,218,280` (Rekonstruktions-Format, Trennregel, MQ2)
- `escape-game-generator/agents/SUB_AUFGABE_BEGRUENDUNG.md:113-114,172-175,193` (ASCII-Beispiele, CER-Struktur, Engine-Match)
- `escape-game-generator/agents/SUB_AUFGABE_FREITEXT.md:73,103-105,196,243,322` (Operationalisierung, Operator-Katalog, A2b, Kurzregel, UTF-8-Pflicht)
- `docs/befunde/BEFUND_LIVE_SICHTUNG_G2_M1_2026-04-10.md` (Primaer-Befund)

---

**Status:** VORSCHLAG — wartet auf Scope-Entscheidung fuer v3.12-Runden-Struktur.
