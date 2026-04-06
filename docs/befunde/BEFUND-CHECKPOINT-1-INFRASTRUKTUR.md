# BEFUND — Checkpoint-1 Infrastruktur-Audit (Post AU-2a, Pre AU-2b)

**Datum:** 2026-04-06
**Trigger:** User-Auftrag "evaluiere immer auch, an welcher stelle ein infrastruktur audit sinn macht"
**Methode:** 4 parallele Review-Agenten (D1-D4), konsolidiert durch PM
**Scope:** Generierungsinfrastruktur-Zuverlaessigkeit + didaktische Qualitaetsstandards
**Bezug:** Phase IV Wave 1, nach AU-2a CLOSED, vor AU-2b Code-Strang

---

## 1. Audit-Dimensionen

| ID | Dimension | Fokus |
|----|-----------|-------|
| D1 | Schema-Konsistenz | Vertraege ↔ Subagenten-Prompts ↔ Engine ↔ Validator |
| D2 | Coverage-Gaps | Enforcement-Ketten: Vertrag → Prompt → Validator → Engine |
| D3 | Didaktische Kohaerenz | Bloom-Projektion, Feedback-Ebenen, Anti-Leak, Tipp-Qualitaet |
| D4 | Engine-Kompatibilitaet | Runtime-Verhalten vs. Vertrags-Erwartungen |

---

## 2. Konsolidierte Findings

### 2.1 CRITICAL (2)

**F-CP1-01 [D4] Feedback-Schema produziert, aber nie gerendert**
- Engine zeigt generisch "Richtig!" / "Falsch!" — ignoriert `{typ, text, ebene}` komplett.
- VERTRAG_FEEDBACK_SCHEMA §7 wird verletzt (Schema-Daten existieren, Renderer nutzt sie nicht).
- **Klassifikation:** Wave 3 Engine-Scope (STR-03-Eng). Kein Blocker fuer AU-2b. Infrastruktur (Generierung + Validierung) funktioniert korrekt; nur die Praesentation im bestehenden Game ist generisch. Neue Games profitieren ab Renderer-Upgrade.
- **Aktion:** Offen bis Wave 3. Kein sofortiger Fix noetig — Infrastruktur-First-Grundsatz greift.

**F-CP1-02 [D1] Freitext Bloom-Projektions-Beispiel divergiert von Spec**
- SUB_AUFGABE_FREITEXT.md Beispiel zeigt L3-Bloom mit ebene "verstaendnis", aber Freitext-Aufgaben sind laut Vertrag primaer L5-6 (analyse). Widerspricht der Bloom-Projektionsregel L5-6→analyse.
- **Klassifikation:** Vor naechstem Game-Generierungslauf. Prompt-Korrektur in SUB_AUFGABE_FREITEXT.md.
- **Aktion:** Patch in naechster PM-Runde (kann in AU-2c oder separatem Doku-Patch laufen, kein Code-Impact).

### 2.2 HIGH (6)

**F-CP1-03 [D1] Reihenfolge-Aufgabe: L1-Bloom ebene undefiniert**
- Vertrag projiziert L1→wissen, aber Reihenfolge-Prompt zeigt kein Beispiel mit ebene "wissen" fuer L1-Feedback.
- **Klassifikation:** Prompt-Patch SUB_AUFGABE_REIHENFOLGE.md. Vor naechstem Generierungslauf.
- **Aktion:** Beispiel ergaenzen in naechster PM-Runde.

**F-CP1-04 [D1] 4 Subagenten-Prompts unterspezifizieren Feedback-typ-Enum**
- MC, ZUORDNUNG, LUECKENTEXT, REIHENFOLGE: Die Prompts listen die 4 typ-Werte (bestaetigung, korrektur, hinweis, verknuepfung) nicht explizit als Enum-Constraint. Subagent koennte freie Strings generieren.
- **Klassifikation:** Prompt-Patch 4× SUB_AUFGABE_*.md. Vor naechstem Generierungslauf.
- **Aktion:** Enum-Constraint explizit in Feedback-Block jedes Prompts einfuegen.

**F-CP1-05 [D3] MC-Feedback ebene-Mischung innerhalb einer Aufgabe**
- Feedback-Eintraege derselben MC-Aufgabe koennen unterschiedliche ebene-Werte haben (z.B. "wissen" fuer bestaetigung + "verstaendnis" fuer hinweis). Didaktisch fragwuerdig — eine Aufgabe operiert auf EINEM Bloom-Level.
- **Klassifikation:** Validator-Erweiterung (WARN, nicht FAIL). Wave 1 adressierbar.
- **Aktion:** validate-feedback-schema.js um ebene-Konsistenz-Check pro Aufgabe erweitern. WARN bei Mischung.

**F-CP1-06 [D3] Freitext Anti-Leak vs. Musterantwort-Konvention**
- SUB_AUFGABE_FREITEXT verlangt Anti-Leak in T3, aber Freitext hat per Konvention eine "Musterantwort" als loesung. T3-Tipp soll strukturierend sein, darf aber die Musterantwort nicht enthalten — Grenze zwischen "heuristisch" und "Antwort verraten" bei Freitext unklar.
- **Klassifikation:** Prompt-Praezisierung SUB_AUFGABE_FREITEXT.md. Vor naechstem Generierungslauf.
- **Aktion:** Anti-Leak-Abschnitt praezisieren: T3 darf Argumentationsstruktur nennen, nicht den Wortlaut der Musterantwort.

**F-CP1-07 [D4] freitext vs. freitext-code Naming-Inkonsistenz**
- Vertrag/Prompts nennen Typ "freitext". Engine registriert "freitext-code". Mapping funktioniert nur weil data.json den Engine-Namen verwendet, aber Generierungspipeline koennte "freitext" produzieren → Engine findet keinen Renderer.
- **Klassifikation:** Alignment-Entscheidung vor naechstem Game. Entweder Engine-Registry umbenennen oder Vertrag/Prompts auf "freitext-code" aendern.
- **Aktion:** Grundsatzentscheidung User erforderlich. Empfehlung: Vertrag/Prompts auf "freitext-code" angleichen (Engine ist Autoritaet, kein Breaking Change).

**F-CP1-08 [D4] Reihenfolge-Aufgaben: optionen-Feld fehlt in Spec**
- Engine erwartet `optionen[]` Array fuer Reihenfolge-Aufgaben. Vertrag VERTRAG_PHASE_2-2b_AUFGABE.md definiert dieses Feld nicht explizit fuer Reihenfolge. Subagent koennte es weglassen → Rendering-Fehler.
- **Klassifikation:** Vertrags-Patch + Prompt-Patch. Vor naechstem Generierungslauf.
- **Aktion:** optionen[] in Vertrag als Pflichtfeld fuer Reihenfolge dokumentieren.

### 2.3 MEDIUM (6)

**F-CP1-09 [D2] STR-02 A24 Bloom-Schema nicht vom Validator geprueft**
- validate-feedback-schema.js prueft Feedback + Tipps, aber nicht bloom_level pro Aufgabe. A24 (per-Aufgabe Bloom-Schema) ist nur per Prompt durchgesetzt, nicht maschinell verifiziert.
- **Klassifikation:** Wave 1 Validator-Erweiterung (kann parallel zu AU-2b).
- **Aktion:** bloom_level-Feld-Validierung in validate-feedback-schema.js ergaenzen oder separaten Validator erstellen.

**F-CP1-10 [D2] STR-03 A26 Didaktische Feedback-Validitaet nicht maschinell pruefbar**
- A26 (didaktische Validitaet) ist inhaltlich — kein Validator kann pruefen ob ein Feedback-Text didaktisch sinnvoll ist. Enforcement nur ueber Prompt-Qualitaet + manuellen Review.
- **Klassifikation:** Akzeptiertes Residual-Risiko. Prompt-Qualitaet ist der Hebel.
- **Aktion:** Keine technische Aktion. Dokumentieren als bewusste Enforcement-Luecke.

**F-CP1-11 [D2] STR-11 A22/A23 Strukturvalidierung fehlt**
- Neue Aufgabentypen (Vergleich, Begruendung) haben typ-spezifische Struktur-Anforderungen (A22 Vergleich-Dimensionen, A23 CER-Struktur). Kein Validator prueft diese.
- **Klassifikation:** Wave 2+ Validator-Erweiterung.
- **Aktion:** Typ-spezifische Validatoren fuer Vergleich + Begruendung erstellen.

**F-CP1-12 [D3] Vergleich T3 unklar**
- Fuer Vergleich-Aufgaben ist der Unterschied zwischen T2 (strukturierend) und T3 (heuristisch) nicht praezise genug definiert. Subagent koennte T3 zu nah an T2 formulieren.
- **Klassifikation:** Prompt-Praezisierung SUB_AUFGABE_VERGLEICH.md. Vor naechstem Generierungslauf.
- **Aktion:** T2/T3-Abgrenzung schaerfen mit konkretem Beispiel.

**F-CP1-13 [D3] L4→anwendung Bloom-Projektion fragwuerdig**
- Bloom L4 (Analyse) wird auf ebene "anwendung" projiziert. Didaktisch ist L4 eher Analyse als Anwendung. Die Projektionstabelle (L1-2→wissen, L3→verstaendnis, L4→anwendung, L5-6→analyse) verliert hier Praezision.
- **Klassifikation:** Akzeptiertes Design-Trade-off. 4-stufiges ebene-Modell ist bewusste Vereinfachung von 6 Bloom-Leveln.
- **Aktion:** Keine Aenderung. Ggf. Dokumentation der Abbildungslogik in einem Architektur-Dokument.

**F-CP1-14 [D4] Feedback normalisiert aber Validator prueft nicht Runtime-Verhalten**
- validate-feedback-schema.js prueft statisch die JSON-Struktur. Ob normalizeFeedback() zur Laufzeit korrekt arbeitet, wird nur durch manuellen Smoke-Test verifiziert.
- **Klassifikation:** Akzeptiertes Residual-Risiko fuer Phase IV. Unit-Test-Framework waere Overkill fuer statische Site.
- **Aktion:** Keine. Smoke-Test nach jedem Code-Strang reicht.

### 2.4 LOW (2)

**F-CP1-15 [D1] 3 Prompts: Haertegrad-Beispiele redundant**
- MC, ZUORDNUNG, LUECKENTEXT haben identische Haertegrad-Erklaerungstexte. Kein Fehler, aber Wartungs-Risiko bei zukuenftigen Aenderungen.
- **Klassifikation:** Akzeptierte Redundanz. Jeder Prompt muss standalone funktionieren.
- **Aktion:** Keine.

**F-CP1-16 [D3] Kein Copy-Paste-Check fuer Tipps**
- Validator prueft nicht, ob T1/T2/T3-Texte identisch sind (Copy-Paste-Fehler durch Subagent).
- **Klassifikation:** Nice-to-have Validator-Erweiterung.
- **Aktion:** Optional in Wave 2+ als WARN-Check.

---

## 3. Priorisierte Aktionsmatrix

### Zeitfenster A: VOR naechstem Generierungslauf (Prompt-Patches)

| Finding | Aktion | Datei | Aufwand |
|---------|--------|-------|---------|
| F-CP1-02 | Freitext Bloom-Beispiel korrigieren | SUB_AUFGABE_FREITEXT.md | S |
| F-CP1-03 | Reihenfolge L1-ebene Beispiel ergaenzen | SUB_AUFGABE_REIHENFOLGE.md | S |
| F-CP1-04 | Feedback-typ-Enum explizit in 4 Prompts | SUB_AUFGABE_{MC,ZU,LT,RH}.md | S |
| F-CP1-06 | Anti-Leak Freitext praezisieren | SUB_AUFGABE_FREITEXT.md | S |
| F-CP1-07 | freitext→freitext-code Alignment | Vertrag + 1 Prompt | S (User-Entscheidung) |
| F-CP1-08 | optionen[] fuer Reihenfolge im Vertrag | VERTRAG_PHASE_2-2b_AUFGABE.md | S |
| F-CP1-12 | Vergleich T2/T3-Abgrenzung schaerfen | SUB_AUFGABE_VERGLEICH.md | S |

**Gesamt-Aufwand Zeitfenster A:** ~1 PM-Session (7 Patches, alle S-Groesse, reine docs/).

### Zeitfenster B: Wave 1 (Validator-Erweiterungen, parallel zu AU-2b/2c)

| Finding | Aktion | Datei | Aufwand |
|---------|--------|-------|---------|
| F-CP1-05 | ebene-Konsistenz-Check pro Aufgabe | validate-feedback-schema.js | S |
| F-CP1-09 | bloom_level-Feld-Validierung | validate-feedback-schema.js oder neuer Validator | M |

### Zeitfenster C: Wave 3 Engine-Session

| Finding | Aktion | Datei | Aufwand |
|---------|--------|-------|---------|
| F-CP1-01 | Feedback-Renderer implementieren | escape-engine.js | L |

### Zeitfenster D: Wave 2+ / Folgeprojekt

| Finding | Aktion | Datei | Aufwand |
|---------|--------|-------|---------|
| F-CP1-11 | Typ-spezifische Validatoren Vergleich/Begruendung | Neue Validator-Module | M |
| F-CP1-16 | Copy-Paste-Duplikat-Check Tipps | validate-feedback-schema.js | S |

### Akzeptierte Residual-Risiken (keine Aktion)

| Finding | Begruendung |
|---------|-------------|
| F-CP1-10 | Didaktische Validitaet nur per Prompt + Review durchsetzbar |
| F-CP1-13 | L4→anwendung ist bewusstes 4-stufiges Vereinfachungs-Modell |
| F-CP1-14 | Smoke-Test reicht fuer statische Site |
| F-CP1-15 | Standalone-Prompts erfordern Redundanz |

---

## 4. Empfehlung: Naechster Infrastruktur-Audit

**Checkpoint-2** nach Abschluss von Zeitfenster-A-Patches + AU-2b Code-Strang + AU-2c.

Pruefung dann:
1. Prompt-Patch-Wirksamkeit: Generiert ein Testlauf mit gepatchten Prompts korrekte Feedback/Tipp-Strukturen?
2. Validator-Abdeckung: Deckt die erweiterte Validierungskette (Feedback + Tipps + Bloom) die kritische Infrastruktur ab?
3. Naming-Alignment: Ist freitext/freitext-code aufgeloest?

**Checkpoint-3** nach Wave 3 Engine-Session: Feedback-Renderer live, End-to-End-Kette geschlossen.

---

## 5. Gate-Urteil

**GRUEN fuer AU-2b Code-Strang.** Kein Finding blockiert die Ausfuehrung des Cold-Handoffs. Die 7 Zeitfenster-A-Patches betreffen Prompts (docs/), nicht Code, und sind unabhaengig von AU-2b.

**GELB fuer naechsten Generierungslauf.** Zeitfenster-A-Patches MUESSEN vor Game-2-Generierung abgeschlossen sein. Ohne sie produziert die Pipeline potentiell inkonsistente Feedback-Strukturen und unklare Tipp-Abgrenzungen.

---

**Quellen:** D1 Schema-Konsistenz-Agent, D2 Coverage-Gaps-Agent, D3 Didaktische-Kohaerenz-Agent, D4 Engine-Kompatibilitaets-Agent (alle 2026-04-06, Session 13 Checkpoint-1).
