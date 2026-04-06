# BEFUND — Checkpoint-2 Infrastruktur-Audit (Post Wave 2, Pre Wave 3)

**Datum:** 2026-04-06
**Trigger:** User-Auftrag "audit praezise vorbereiten, in konzeption fuer eigene blinde stellen intelligent kontrollieren"
**Methode:** 4 parallele Review-Agenten (D1-D4) + PM-Blind-Spot-Self-Check (6 Hypothesen)
**Scope:** Wave 2 Verifikation: AU-4 (STR-05 Multiperspektivitaet) + AU-3 (STR-08 Quellenkritik + STR-11 Teil 2)
**Bezug:** Phase IV Wave 2 COMPLETE, vor Wave 3+ Planung

---

## 1. Audit-Dimensionen

| ID | Dimension | Fokus |
|----|-----------|-------|
| D1 | Cross-Contract Nummerierungs-Integritaet | Achsen-Renummerierung, Registry-Zaehler, Guetekriterien-Nummerierung |
| D2 | Neue-Konstrukte-Enforcement-Ketten | konflikttyp, perspektiven_policy, _meta.perspektive, w_fragen, material_referenz |
| D3 | Prompt-Vertrag-Alignment AU-3/AU-4 | Subagenten-Zuordnung, Anti-Quota, Engine-Spec-Konsistenz |
| D4 | Checkpoint-1 Offene Findings | Status-Update F-CP1-01/-05/-09/-11/-16 |
| BS | Blind-Spot-Self-Check | 6 Hypothesen aus PM-Selbstreflexion |

---

## 2. Konsolidierte Findings

### 2.1 CRITICAL (2)

**F-CP2-01 [D3/BS] Subagenten-Zuordnungstabelle in VERTRAG_PHASE_2-2b unvollstaendig**
- Die Tabelle (Z. 12-21) listet 7 Subagenten. `SUB_AUFGABE_QUELLENKRITIK` fehlt trotz korrekter Eintraege in typ-Werte-Liste (Z. 124) und Loesungsformate-Tabelle (Z. 137).
- **Impact:** Dispatch-Interface unvollstaendig dokumentiert. Automatisierte Dispatcher koennten Quellenkritik-Aufgaben nicht korrekt routen.
- **Klassifikation:** Prompt-Patch VERTRAG_PHASE_2-2b_AUFGABE.md. Vor naechstem Generierungslauf.
- **Aktion:** Zeile `| SUB_AUFGABE_QUELLENKRITIK | II-III | L3-L5 (Ziel) | W-Fragen-Systematik, Perspektiv-Reflexion | SUB_AUFGABE_QUELLENKRITIK.md |` in Tabelle einfuegen.

**F-CP2-02 [D3/BS] SUB_MATERIAL_DARSTELLUNGSTEXT ohne formale Multiperspektivitaet-Policy**
- QUELLENTEXT, TAGEBUCH, BILDQUELLE haben je eine strukturierte "Multiperspektivitaet-Policy (STR-05, AU-4)"-Sektion mit: Gilt-wenn-Bedingung, 3-4 nummerierte Regeln, `_meta.perspektive`-Deklaration.
- DARSTELLUNGSTEXT hat informelle Guidance (Z. 99: "Multiperspektivitaet beachten") und Q7-Kriterium (Z. 168), aber keine formale Policy-Sektion.
- **Impact:** Darstellungstexte koennen bei `konflikttyp: true` nicht systematisch `_meta.perspektive` deklarieren. Achse 5 Cross-Validation sieht keine Perspektiv-Deklaration fuer Darstellungstexte.
- **Klassifikation:** Prompt-Patch SUB_MATERIAL_DARSTELLUNGSTEXT.md. Vor naechstem Generierungslauf.
- **Aktion:** Formale Multiperspektivitaet-Policy einfuegen analog den 3 anderen SUB_MATERIAL-Prompts. Besonderheit: Darstellungstext ist per Definition multi-perspektivisch (nicht eine Stimme), daher `_meta.perspektive: "uebergreifend"` oder Auflistung der abgedeckten Perspektiven.

### 2.2 HIGH (3)

**F-CP2-03 [D3] Anti-Quota-Klausel in VERTRAG_PHASE_2-2b veraltet**
- Z. 22 nennt nur `vergleich` und `begruendung`. `quellenkritik` fehlt.
- VERTRAG_PHASE_2-2a (Z. 80) hat die korrekte 3-Typ-Anti-Quota.
- **Klassifikation:** Vertrags-Patch. Vor naechstem Generierungslauf.
- **Aktion:** Anti-Quota in VERTRAG_PHASE_2-2b um `quellenkritik` erweitern.

**F-CP2-04 [D1] Achse-5-Sektionsheader in CROSS-Vertrag fehlt**
- "### Achsen 1-4: Cross-Konsistenz (unveraendert)" umfasst faktisch Achsen 1-5 (Achse 5 = Perspektiven-Diversitaet als Item 5 im Nummerierungsblock). Kein eigener "### Achse 5"-Header.
- **Impact:** Dokumentations-Klarheit. Funktional korrekt (Inhalt vorhanden), aber Header ist irrefuehrend.
- **Klassifikation:** Doku-Patch. Nicht blockierend.
- **Aktion:** Header auf "### Achsen 1-5: Cross-Konsistenz" aendern oder separaten "### Achse 5"-Header einfuegen.

**F-CP2-05 [D1] M-Katalog Header "M1-M12" nicht aktualisiert**
- Header (Z. 24) sagt "M1–M12", aber M13 (Multiperspektivitaet) existiert (Z. 84).
- **Klassifikation:** Doku-Patch.
- **Aktion:** Header auf "M1–M13" aktualisieren.

### 2.3 MEDIUM (5)

**F-CP2-06 [D2] material-output-schema.json definiert `_meta` nicht**
- Schema hat `additionalProperties: false` (Z. 287), aber kein `_meta`-Property.
- Pre-existing Gap: `_meta.tafelbild_knoten_abgedeckt` wird in CROSS-Vertrag Read-Step 1 gelesen, ist aber ebenfalls nicht im Schema.
- Durch AU-4 (`_meta.perspektive`) verschaerft. Zwei _meta-Felder ohne Schema-Definition.
- **Klassifikation:** Schema-Patch. Code-Strang (Claude-Code), nicht PM.
- **Aktion:** `_meta`-Property mit `tafelbild_knoten_abgedeckt` und `perspektive` im Schema ergaenzen. `additionalProperties` innerhalb `_meta` auf die bekannten Felder beschraenken.

**F-CP2-07 [D2] aufgabe-output-schema.json existiert nicht**
- `docs/architektur/schemata/` enthaelt 5 Schemata (hefteintrag, material-output, rahmen-einstieg, rahmen-sicherung, ueberleitungen). Aufgaben-Output-Schema fehlt.
- Pre-existing Gap, aber durch w_fragen (AU-3) und bloom_level/feedback (AU-2a/2b) verschaerft.
- **Klassifikation:** Schema-Erstellung. Code-Strang.
- **Aktion:** aufgabe-output-schema.json erstellen mit allen 8 Aufgabentypen, typ-spezifischen Pflichtfeldern (w_fragen fuer quellenkritik, dimensionen/objekte/zellen fuer vergleich, claim/evidence/reasoning fuer begruendung), _meta (bloom_level, bloom_begruendung), feedback-Schema, tipps-Schema.

**F-CP2-08 [D2] Keine Validatoren fuer Wave-2-Konstrukte**
- `konflikttyp`, `perspektiven_policy`, `_meta.perspektive`, `w_fragen`, `material_referenz`: keines wird maschinell validiert.
- Enforcement erfolgt ausschliesslich ueber Prompt-Qualitaet + Cross-Validation (Phase 2.1c Achse 5).
- **Klassifikation:** Akzeptiertes Enforcement-Modell fuer Phase IV. Validator-Erweiterung als Folgeprojekt.
- **Aktion:** Keine sofortige. Dokumentieren als bewusste Design-Entscheidung: Wave-2-Konstrukte sind prompt-enforced + cross-validated, nicht schema-validated. Validator-Erweiterung im Folgeprojekt wenn Pipeline-Volumen steigt.

**F-CP2-09 [D4] F-CP1-11 Scope-Erweiterung: Quellenkritik**
- Checkpoint-1 F-CP1-11 forderte typ-spezifische Validatoren fuer Vergleich + Begruendung. Wave 2 fuegt Quellenkritik als 3. Typ hinzu.
- **Klassifikation:** Finding-Update.
- **Aktion:** F-CP1-11 Scope auf Vergleich + Begruendung + Quellenkritik erweitern.

**F-CP2-10 [D4] Zeitfenster-B Findings (F-CP1-05, F-CP1-09) ueberfaellig**
- Checkpoint-1 klassifizierte F-CP1-05 (ebene-Konsistenz-Check) und F-CP1-09 (bloom_level-Validierung) als "Wave 1, parallel zu AU-2b/2c". Wave 1 ist COMPLETE, Findings sind nicht adressiert.
- validate-feedback-schema.js wurde fuer Tipp-Haertegrade (AU-2b) und Anti-Leak (A21) erweitert, aber nicht fuer ebene-Konsistenz oder bloom_level.
- **Klassifikation:** Validator-Erweiterung. Code-Strang.
- **Aktion:** In naechste Code-Strang-Session (Wave 3 oder separater Validator-Sprint) einplanen. Nicht blockierend fuer Game-Generierung, da Prompts die Primaer-Enforcement-Schicht sind.

### 2.4 LOW (1)

**F-CP2-11 [D4] F-CP1-16 Copy-Paste-Check Tipps — weiterhin offen**
- Nicht implementiert. Weiterhin Nice-to-have.
- **Klassifikation:** Keine Aktion.

---

## 3. Blind-Spot-Self-Check Ergebnis

| # | Hypothese | Ergebnis |
|---|-----------|----------|
| BS-1 | Achsen-Renummerierung unvollstaendig | PASS — Alle Dispatch/Output/Q-Gate-Referenzen konsistent auf 7 Achsen aktualisiert. Header-Inkonsistenz → F-CP2-04. |
| BS-2 | `_meta.perspektive` inkonsistent ueber 3 Prompts | PASS — Identisches Pattern in QUELLENTEXT, TAGEBUCH, BILDQUELLE. Format "P[N]: [Akteur]". |
| BS-3 | `quellenkritik` Casing-Inkonsistenz | PASS — Durchgehend lowercase `quellenkritik` in allen 15+ Dateien (docs/ + assets/). |
| BS-4 | Anti-Quota unvollstaendig | PARTIAL — Progressionsplan (Z. 80) korrekt mit 3 Typen. Aufgaben-Vertrag (Z. 22) veraltet → F-CP2-03. |
| BS-5 | w_fragen Spec-Drift Uebergabe ↔ SUB_AUFGABE | PASS — Identische Struktur: `[{schluessel, frage}]` + loesung als Object. Engine-Code bestaetigt. |
| BS-6 | M13 Trigger-Mechanismus nicht verankert | PASS — Aktivierungsbedingung `konflikttyp: true` explizit in M13 (Z. 86). Achse 5 liest `_meta.perspektive`. Kette: MATERIAL_GERUEST → Dispatch → SUB_MATERIAL → Cross-Validation. |

**Zusatz-Fund (nicht in Hypothesen):** DARSTELLUNGSTEXT-Luecke (→ F-CP2-02). PM hatte nur 3 von 4 Material-Subagenten gepatcht. Genuine Selbst-Blind-Stelle.

---

## 4. Checkpoint-1 Offene Findings — Status-Update

| Finding | Original-Zeitfenster | Status | Wave-2-Impact |
|---------|---------------------|--------|---------------|
| F-CP1-01 | C (Wave 3 Engine) | OFFEN | Kein Impact. Feedback-Renderer weiterhin Wave 3. |
| F-CP1-05 | B (Wave 1 Validator) | OFFEN, ueberfaellig | → F-CP2-10. |
| F-CP1-09 | B (Wave 1 Validator) | OFFEN, ueberfaellig | → F-CP2-10. |
| F-CP1-11 | D (Wave 2+) | EXPANDED | + Quellenkritik → F-CP2-09. |
| F-CP1-16 | D (Nice-to-have) | OFFEN | Kein Impact. |
| F-CP1-02 bis F-CP1-08, F-CP1-12 | A (Prompt-Patches) | CLOSED | Wave 2 hat keine Patches rueckgaengig gemacht. Verifiziert. |

---

## 5. Priorisierte Aktionsmatrix

### Zeitfenster A: VOR naechstem Generierungslauf (Prompt-/Vertrags-Patches)

| Finding | Aktion | Datei | Aufwand |
|---------|--------|-------|---------|
| F-CP2-01 | Quellenkritik in Subagenten-Tabelle | VERTRAG_PHASE_2-2b_AUFGABE.md | S |
| F-CP2-02 | Formale Multiperspektivitaet-Policy | SUB_MATERIAL_DARSTELLUNGSTEXT.md | M |
| F-CP2-03 | Anti-Quota + quellenkritik | VERTRAG_PHASE_2-2b_AUFGABE.md | S |
| F-CP2-04 | Achse-5-Header-Fix | VERTRAG_PHASE_2-1c_CROSS.md | S |
| F-CP2-05 | M-Katalog Header M1-M13 | QUALITAETSKRITERIEN_MATERIALPRODUKTION.md | S |

**Gesamt-Aufwand Zeitfenster A:** ~0.5 PM-Session (5 Patches, 4× S + 1× M, reine docs/).

**Status: ALLE 5 PATCHES ANGEWENDET (2026-04-06).** F-CP2-01 + F-CP2-03 in VERTRAG_PHASE_2-2b (Subagenten-Tabelle + Anti-Quota). F-CP2-02 in SUB_MATERIAL_DARSTELLUNGSTEXT (formale Multiperspektivitaet-Policy + _meta.perspektive). F-CP2-04 in VERTRAG_PHASE_2-1c_CROSS (Header Achsen 1-5). F-CP2-05 in QUALITAETSKRITERIEN_MATERIALPRODUKTION (Header M1-M13).

### Zeitfenster B: Code-Strang (naechste Engine-Session)

| Finding | Aktion | Datei | Aufwand |
|---------|--------|-------|---------|
| F-CP2-06 | _meta in material-output-schema | material-output-schema.json | S |
| F-CP2-07 | aufgabe-output-schema.json erstellen | Neue Datei | L |
| F-CP2-10 | ebene-Konsistenz + bloom_level Validator | validate-feedback-schema.js | M |

### Akzeptierte Residual-Risiken (keine Aktion)

| Finding | Begruendung |
|---------|-------------|
| F-CP2-08 | Wave-2-Konstrukte prompt-enforced + cross-validated. Validator-Erweiterung Folgeprojekt. |
| F-CP2-11 | Copy-Paste-Check bleibt Nice-to-have. |
| F-CP1-01 | Feedback-Renderer Wave 3. |

---

## 6. Gate-Urteil

**~~GELB~~ → GRUEN fuer naechsten Generierungslauf.** Alle 5 Zeitfenster-A-Patches angewendet (2026-04-06). Verbleibende offene Findings (F-CP2-06 bis F-CP2-11) sind Code-Strang-Scope oder akzeptierte Residual-Risiken — keines blockiert die Generierung.

**GRUEN fuer Wave 3+ Planung.** Kein Finding blockiert die Planungsphase.

---

## 7. Vergleich Checkpoint-1 → Checkpoint-2

| Metrik | CP-1 | CP-2 |
|--------|------|------|
| Findings gesamt | 16 | 11 |
| CRITICAL | 2 | 2 |
| HIGH | 6 | 3 |
| MEDIUM | 6 | 5 |
| LOW | 2 | 1 |
| Zeitfenster-A Patches | 7 | 5 |
| Blind-Spot-Funde | — | 1 genuiner Fund (DARSTELLUNGSTEXT) |
| Audit-Agenten | 4 (D1-D4) | 4 (D1-D4) + Self-Check (BS) |

**Trend:** Finding-Dichte nimmt ab (16→11), Schweregrad-Profil verschiebt sich Richtung MEDIUM. Wave-2-spezifische Findings (6 Stueck) sind primaer Dokumentations-Luecken (Tabellen/Header nicht aktualisiert), kein struktureller Defekt. Der einzige genuine Blind-Spot (DARSTELLUNGSTEXT) zeigt, dass Self-Check bei 4-Prompt-Patches mit 3-von-4-Coverage sinnvoll ist.

---

**Quellen:** D1 Cross-Contract-Agent, D2 Enforcement-Chain-Agent, D3 Prompt-Vertrag-Alignment-Agent, D4 Checkpoint-1-Status-Agent, BS PM-Self-Check (alle 2026-04-06, Session 13 Checkpoint-2).
