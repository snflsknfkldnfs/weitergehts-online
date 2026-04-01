# Audit Report: v3.8 Produktionsreife

**Datum:** 2026-03-30
**Auditor:** Cowork (Skill /projekt-website-v3, AUDIT-Modus)
**Briefing:** `docs/analyse/AUDIT_BRIEFING_v3-8_PRODUKTIONSREIFE.md`
**Methode:** Systematische Pruefung aller 34 Prueffragen in 6 Pruefbereichen. Alle referenzierten Dateien selbst gelesen (keine Annahmen aus Briefing uebernommen).

---

## Executive Summary

Die Infrastruktur ist **produktionsbereit fuer Mappe 2** mit Einschraenkungen. 0 Blocker, 1 High, 6 Medium, 2 Low. Die Constraint-Verankerung (C1-C5) in den Agent-Prompts ist vollstaendig und konsistent. Die Hauptrisiken liegen in veralteten Schema-Beispielen (AGENT_MATERIAL, ORCHESTRATOR, Template), fehlenden Inline-Links in 2 von 5 Mappe-1-Aufgaben, und undokumentierten Mappe-Anhang-Prozeduren.

---

## Findings

### [HIGH] F-01: AGENT_MATERIAL sicherung.tafelbild-Beispiel veraltet (pre-v3.1)

- **Pruefbereich:** 4 (Engine-Kompatibilitaet)
- **Prueffrage:** 4.2
- **Befund:** AGENT_MATERIAL.md Zeilen 336-348 zeigen ein `sicherung.tafelbild`-Beispiel mit nur `knoten[]`, `verbindungen[]`, `voraussetzungen[]`, `kernerkenntnisse[]` — das Legacy-Format. Es fehlen die v3.1+-Felder `stundenfrage`, `ordnungsmuster`, `scpl{}`, `transfer{}`. Claude Code, der diesen Prompt als Referenz liest, koennte das alte Format erzeugen.
- **Beleg:** `docs/agents/AGENT_MATERIAL.md:336-348` — Beispiel-JSON zeigt nur Legacy-Knoten-Format.
- **Empfehlung:** Beispiel-JSON in AGENT_MATERIAL Aufgabe 2.2 durch aktuelles Format ersetzen, das sowohl SCPL-Felder als auch Legacy-Arrays (leer) enthaelt. Verweis auf AGENT_TAFELBILD-Output als kanonische Quelle.

---

### [MEDIUM] F-02: ORCHESTRATOR data.json-Schema veraltet

- **Pruefbereich:** 4 (Engine-Kompatibilitaet)
- **Prueffrage:** 4.1, 4.7
- **Befund:** Das data.json-Schema in ORCHESTRATOR.md (Zeilen 179-249) fehlen v3.3+-Felder in `materialien[]`: `position`, `didaktische_funktion`, `voraussetzung[]`, `ueberleitung_von`, `sequenz_kontext{}`, `bildunterschrift`. Ebenso fehlen v3.1+-Felder in `sicherung.tafelbild`: `stundenfrage`, `ordnungsmuster`, `scpl{}`. Die Engine nutzt all diese Felder aktiv (Sortierung nach `position`, Rendering von `ueberleitung_von`, `data-funktion`-Attribut, `bildunterschrift` in figcaption).
- **Beleg:** `docs/agents/ORCHESTRATOR.md:179-249` vs. `assets/js/escape-engine.js:677-771` und `escape-games/gpg-erster-weltkrieg-ursachen/data.json`.
- **Empfehlung:** ORCHESTRATOR-Schema aktualisieren. Alternativ: ORCHESTRATOR verweist auf Template-data.json als kanonisches Schema und entfernt das inline-Beispiel.

---

### [MEDIUM] F-03: Template data.json veraltet

- **Pruefbereich:** 4 (Engine-Kompatibilitaet)
- **Prueffrage:** 4.1
- **Befund:** `escape-games/template/data.json` fehlen dieselben Felder wie F-02: `bildunterschrift`, `position`, `didaktische_funktion`, `voraussetzung`, `ueberleitung_von`, `sequenz_kontext` in materialien. Auch `meta.narrativ` fehlt (in Mappe-1 vorhanden). Das Template ist die deklarierte Schema-Referenz — wenn es veraltet ist, erzeugen Agenten bei Neuerstellung unvollstaendige Strukturen.
- **Beleg:** `escape-games/template/data.json` vs. `escape-games/gpg-erster-weltkrieg-ursachen/data.json`.
- **Empfehlung:** Template-data.json auf den Stand der Mappe-1-Struktur bringen (Claude-Code-Domaene — Uebergabe-Prompt noetig).

---

### [MEDIUM] F-04: QUALITAETSKRITERIEN_MATERIALPRODUKTION.md referenziert keine v3.8-Constraints

- **Pruefbereich:** 2 (Constraint-Konsistenz)
- **Prueffrage:** 2.4
- **Befund:** Das zentrale Qualitaetskriterien-Dokument (M1-M12 + 7 typ-spezifische Saetze) enthaelt keinen Verweis auf C1-C5 oder v3.8. Die SUB_MATERIAL-Prompts haben eigene MQ-Pruefpunkte (MQ2 fuer C2, MQ4 fuer C4), die das kompensieren. Aber ein neuer Subagent oder eine Revision der Kriterien koennte die Constraints uebersehen.
- **Beleg:** Grep `v3.8|C1|C2|C3|C4|C5` in `docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md` — 0 Treffer.
- **Empfehlung:** Abschnitt "v3.8 Content-Constraints" an QUALITAETSKRITERIEN_MATERIALPRODUKTION.md anhaengen, der C1-C5 als uebergreifende Zusatzpruefpunkte auflistet und auf die MQ-Eintraege in den SUB_MATERIAL-Prompts verweist.

---

### [MEDIUM] F-05: ORCHESTRATOR nennt G1-G13 statt G1-G14

- **Pruefbereich:** 2 (Constraint-Konsistenz)
- **Prueffrage:** 2.5
- **Befund:** ORCHESTRATOR.md referenziert an zwei Stellen "Q-Gate: 13 Kriterien (G1-G13)" (Zeile 63) und "Empirische Guetekriterien G1-G13" (Zeile 312). AGENT_TAFELBILD.md definiert aber 14 Kriterien (G1-G14, wobei G14 = SCPL-Kohaerenz). GUETEKRITERIEN_TAFELBILD.md muesste die kanonische Zahl enthalten.
- **Beleg:** `docs/agents/ORCHESTRATOR.md:63,312` — "G1-G13". `docs/agents/AGENT_TAFELBILD.md:327` — G14 in Q-Gate-Protokoll.
- **Empfehlung:** ORCHESTRATOR auf G1-G14 korrigieren.

---

### [MEDIUM] F-06: Aufgaben 1-4 und 1-5 ohne C3-Inline-Links

- **Pruefbereich:** 5 (Mappe-1 als Goldstandard)
- **Prueffrage:** 5.2
- **Befund:** Aufgaben 1-1, 1-2, 1-3 verwenden korrekt `[[mat-id|Anzeigetext]] (MX)`-Markup in Tipps. Aufgaben 1-4 und 1-5 enthalten weder im Fragestamm noch in den Tipps Inline-Links, obwohl sie `material_referenz` haben (mat-1-8 bzw. mat-1-1). Dies verletzt C3/MQ3. Wenn Mappe 1 als Goldstandard fuer Mappe-2-Generierung dient, kopieren Agenten moeglicherweise das Muster "manche Aufgaben ohne Links".
- **Beleg:** `escape-games/gpg-erster-weltkrieg-ursachen/data.json` — aufgabe-1-4 Tipps (Zeilen 239-242), aufgabe-1-5 Tipps (Zeilen 258-261).
- **Empfehlung:** Inline-Links in aufgabe-1-4 und 1-5 nachruesten (Claude-Code-Domaene — Uebergabe-Prompt). Beispiel: Tipp 1 von 1-4 → "Beschreibe genau, was du auf der [[mat-1-8|Karikatur von Cecil Rhodes]] (M3) siehst."

---

### [MEDIUM] F-07: Mappe-2-Anhang-Prozedur undokumentiert

- **Pruefbereich:** 3 (Informationsfluss) + 6 (Skill-Architektur)
- **Prueffrage:** 3.5, 6.2
- **Befund:** Der Workflow (WORKFLOW_v2.md, ORCHESTRATOR.md) beschreibt die Phase-2-Produktion "pro Mappe sequentiell". Aber die konkrete Prozedur, wie Mappe 2 an eine existierende data.json mit Mappe 1 angehaengt wird, ist nirgends spezifiziert. Offene Fragen: Wird mappen[1] direkt in die bestehende data.json eingefuegt? Aendert sich meta? Bleibt Mappe 1 unveraendert? Wird die Ueberleitung von Mappe 1 angepasst (sicherung.ueberleitung referenziert bereits "naechste Mappe")? Fuer Claude Code braucht der Uebergabe-Prompt eine explizite Anweisung.
- **Beleg:** Kein Dokument beschreibt "data.json erweitern" vs. "data.json neu erstellen". WORKFLOW_v2.md Phase 2 (ORCHESTRATOR Zeilen 87-116) nennt nur "pro Mappe sequentiell", ohne Daten-Merge-Logik.
- **Empfehlung:** Kurze Sektion "Mappe-Anhang-Prozedur" in WORKFLOW_v2.md oder ORCHESTRATOR ergaenzen: "Mappe N wird als mappen[N-1] an die bestehende data.json angehaengt. meta bleibt unveraendert. Bestehende Mappen werden NICHT modifiziert. Uebergabe-Prompt muss deklarativ beschreiben: 'Fuege mappen[1] hinzu', NICHT die gesamte data.json liefern."

---

### [LOW] F-08: Dreifache Ueberleitung in Mappe-1-Sicherung

- **Pruefbereich:** 5 (Mappe-1 als Goldstandard)
- **Prueffrage:** 5.5, 5.6
- **Befund:** Mappe 1 hat drei semantisch aehnliche Ueberleitungstexte in verschiedenen Feldern:
  1. `sicherung.tafelbild.transfer.frage`: "Weiter zur naechsten Mappe: Der Funke faellt in Sarajevo."
  2. `sicherung.reflexionsimpuls`: "Das Pulverfass war gefuellt — der Funke kam am 28. Juni 1914 in Sarajevo. Weiter in der naechsten Mappe."
  3. `sicherung.ueberleitung`: "Wie ein einzelner Schuss in Sarajevo das Pulverfass zum Explodieren brachte, erfaehrst du in der naechsten Mappe."
  Die Engine rendert alle drei. Fuer SuS erscheint die Ueberleitung dreifach. Bei Mappe 2 muss geklaert werden, welches Feld die C5-Ueberleitung traegt und welche Felder leer bleiben oder andere Funktionen haben.
- **Beleg:** `escape-games/gpg-erster-weltkrieg-ursachen/data.json:317-328`.
- **Empfehlung:** Feldverwendung klaeren: `transfer.frage` = Transferfrage (AGENT_TAFELBILD Aufgabe 5.4 sagt explizit: gehoert NICHT in den Hefteintrag). `reflexionsimpuls` = Reflexion. `ueberleitung` = C5-Ueberleitung. Bei Mappe 2: nur `ueberleitung` fuer C5 nutzen, `transfer.frage` fuer echte Transferfrage, `reflexionsimpuls` fuer Reflexion.

---

### [LOW] F-09: Neues-Escape-Game-Workflow nicht dokumentiert

- **Pruefbereich:** 3, 6 (Informationsfluss + Skill-Architektur)
- **Prueffrage:** 3.6, 6.4
- **Befund:** Der gesamte Workflow (Phase 0-3) beschreibt die Erstellung eines Escape-Games. Aber es gibt keine explizite Dokumentation, wie ein zweites Game (z.B. "Weimarer Republik") gestartet wird. Zusaetzliche Schritte: neues Verzeichnis unter `escape-games/`, neues Themen-Briefing, Phase 0 komplett neu. Diese Schritte sind implizit klar, aber nicht dokumentiert.
- **Beleg:** Kein Dokument enthaelt "neues Game anlegen" als Prozedur.
- **Empfehlung:** Niedrige Prioritaet — wird erst relevant nach Fertigstellung des aktuellen Games. Bei Bedarf: kurze Sektion in WORKFLOW_v2.md.

---

## PASS-Befunde (Kurzuebersicht)

| Prueffrage | Ergebnis | Kurzbegruendung |
|------------|----------|-----------------|
| 1.1 | PASS | AGENT_SKRIPT: C1b-Identitaetsregel in MQ1 (Z.233) + eigene Sektion (Z.165-169) |
| 1.2 | PASS | Alle 7 SUB_MATERIAL: MQ2 mit korrekter Typ-A/B-Differenzierung. BQ+KA: A/B moeglich. Rest: nur A |
| 1.3 | PASS | Alle 5 SUB_AUFGABE: MQ3 mit `[[mat-id\|Anzeigetext]]`-Konvention |
| 1.4 | PASS | SUB_MATERIAL_BILDQUELLE MQ4 (Z.222), SUB_MATERIAL_KARTE MQ4 (Z.154) |
| 1.5 | PASS | AGENT_SKRIPT MQ5 (Z.234) mit Variante A/B-Unterscheidung, Beispielen, Markierung |
| 1.6 | PASS | ORCHESTRATOR/DIDAKTIK/INHALT brauchen keine C1-C5-Referenzen (laufen vor Phase 0.3) |
| 2.1 | PASS | C2 konsistent zwischen UPGRADE_PLAN, AGENT_MATERIAL, allen 7 SUB_MATERIAL |
| 2.2 | PASS | C3 konsistent zwischen UPGRADE_PLAN, AGENT_RAETSEL, allen 5 SUB_AUFGABE |
| 2.3 | PASS | Keine widerspruechi\ichen Beispiele gefunden |
| 3.1 | PASS | AGENT_MATERIAL Produktionskontext-Template enthaelt Stundenfrage-Feld (Z.269) |
| 3.2 | PASS | AGENT_RAETSEL Konstruktionskontext enthaelt Material-Display-ID + mat-id (Z.100-117) |
| 3.3 | PASS | AGENT_MATERIAL C2-Sektion bindet Typ A/B an didaktische_funktion (Z.286-304) |
| 3.4 | PASS | AGENT_TAFELBILD C1b: "WORTWOERTLICH uebernehmen" (Z.41) |
| 4.3 | PASS | Engine `_parseInlineMaterialLinks` (Z.2742) matcht `[[mat-id\|Text]]`, genutzt in frage + tipps |
| 4.4 | PASS | Engine hat Renderer fuer alle 7 Materialtypen (Z.728-747) |
| 4.5 | PASS | SCPL-Renderer (Z.1198-1362) liest stundenfrage, scpl.situation/complication/problem/loesung, transfer.frage |
| 5.1 | PASS | Alle 9 Material-Titel in Mappe 1 erfuellen C2 (Typ A/B korrekt nach Funktion) |
| 5.3 | PASS | C1b: einstieg.problemstellung === sicherung.tafelbild.stundenfrage (wortidentisch) |
| 5.4 | PASS | Alle 5 Bildunterschriften sind didaktisch formuliert, keine Quellenangaben |
| 6.3 | PASS | Uebergabe-Prompt-Template ist flexibel genug fuer Mappe-Generierung |
| 6.5 | PASS (mit Einschraenkung) | Onboarding vorhanden, aber GPG-spezifische Annahmen in einigen Agenten |
| 6.6 | PASS | Keine File-Ownership-Verletzung in dieser Session |

---

## Zusammenfassung

| Schweregrad | Anzahl |
|-------------|--------|
| BLOCKER     | 0      |
| HIGH        | 1      |
| MEDIUM      | 6      |
| LOW         | 2      |
| PASS        | 22     |

---

## Empfohlene Reihenfolge der Behebung

**Vor Mappe-2-Start (Cowork-Domaene):**

1. **F-01** [HIGH] — AGENT_MATERIAL sicherung.tafelbild-Beispiel auf SCPL-Format aktualisieren
2. **F-02** [MEDIUM] — ORCHESTRATOR data.json-Schema aktualisieren oder auf Template verweisen
3. **F-04** [MEDIUM] — QUALITAETSKRITERIEN_MATERIALPRODUKTION um v3.8-Constraints ergaenzen
4. **F-05** [MEDIUM] — ORCHESTRATOR G1-G13 → G1-G14 korrigieren
5. **F-07** [MEDIUM] — Mappe-Anhang-Prozedur dokumentieren (WORKFLOW_v2.md oder ORCHESTRATOR)

**Vor Mappe-2-Start (Claude-Code-Domaene — Uebergabe-Prompt):**

6. **F-03** [MEDIUM] — Template data.json auf aktuellen Stand bringen
7. **F-06** [MEDIUM] — Inline-Links in aufgabe-1-4 und 1-5 nachruesten

**Nach Mappe-2 (niedrige Prioritaet):**

8. **F-08** [LOW] — Feld-Semantik fuer Ueberleitung/Transfer/Reflexion klaeren
9. **F-09** [LOW] — Neues-Game-Prozedur dokumentieren
