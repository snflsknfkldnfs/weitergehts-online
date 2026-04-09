# BEFUND: Phase 2.1 Material-Produktion — Mappe 1

**Datum:** 2026-04-09
**Evaluator:** PM (Cowork Session 26)
**Scope:** Prozesstreue + Artefakt-Qualitaet, Phase 2.1 Mappe 1 (5 Materialien)
**Vertrag:** VERTRAG_PHASE_2-1_MATERIAL.md
**Katalog:** Q-GATE-MECHANIK.md §7.1 (Material-Q-Gate) + §7.4 (Dispatch-Uebersicht)
**Q-Gate-Ergebnis (Agent):** PASS (5/5 Dispatches PASS)

---

## 1. Zusammenfassung

Die Phase 2.1 Material-Produktion Mappe 1 wurde mit 5 Materialien (mat-1-1 bis mat-1-5) abgeschlossen. Alle 5 Dispatches passierten das agentenseitige Q-Gate. Die PM-Evaluation bestaetigt das Ergebnis mit Einschraenkungen: **PASS mit 4 Findings (0 HIGH, 2 MEDIUM, 2 LOW)**.

Gegenueber Phase 2.0 (CONDITIONAL PASS, 2H/3M/2L) ist die Qualitaet deutlich besser. Kein Finding erfordert Artefakt-Korrekturen; alle Findings betreffen Infrastruktur-Optimierungen fuer kuenftige Mappen.

---

## 2. Prozesstreue-Evaluation

### 2.1 Dispatch-Isolation (P4)

**PASS.** Jedes Material wurde als eigener Dispatch produziert (5 separate Dispatches). Keine Batch-Produktion, keine Kontamination zwischen Dispatches. Vertragskonforme Einhaltung von P4.

### 2.2 Read-Sequenz (8 Steps)

**PASS.** Der Transkript-Verlauf zeigt korrekte Einhaltung der 8 deterministischen Read-Steps:
- Steps 1-6: IMMER ausgefuehrt (MATERIAL_GERUEST, SEQUENZKONTEXT, hefteintrag.json, SUB_MATERIAL_[TYP].md, SKRIPT, INHALTSBASIS, einstieg.json)
- Step 7 (ARTEFAKT_INVENTAR): Korrekt konditional — ausgefuehrt bei mat-1-1 (bildquelle, ARTEFAKT_REFS nicht leer), uebersprungen bei mat-1-2 bis mat-1-5 (DT/QT/TB ohne Artefakt-Ref)
- Step 8 (KERNERKENNTNISSE): Korrekt uebersprungen — kein Material hat didaktische_funktion ∈ {sicherung, transfer}

### 2.3 Compaction-Resilience (P1)

**PASS.** Compaction trat waehrend der Produktion auf (User-Bericht). Der Compaction-Failsafe (P1) griff korrekt: Alle Steps lesen aus Dateien, nicht aus Kontext. Bereits geschriebene .json-Dateien blieben erhalten. Kein Datenverlust, keine Inkonsistenz zwischen Materialien. Dies validiert das P1-Design erstmalig unter Realbedingungen.

### 2.4 Schema-Validierung

**PASS mit Anmerkung.** Alle 5 Materialien enthalten die required-Felder des material-output-schema.json korrekt. Allerdings enthalten alle Materialien `_meta`-Felder, obwohl das Schema `additionalProperties: false` deklariert. Dies wird als **akzeptiertes Zwischenformat** gewertet (siehe Finding M1).

### 2.5 Q-Gate-Vollstaendigkeit

**PASS.** Der Q-GATE-LOG dokumentiert: Schema-Pruefung, SQ-1 bis SQ-5, Fachbegriff-Progression, Perspektiven-Abdeckung, Dispatch-Constraints, Text-Dichte. Alle vom Vertrag §7.4 geforderten Sektionen vorhanden.

---

## 3. Artefakt-Qualitaet

### 3.1 GERUEST-Konformitaet

Kreuzvalidierung der 5 Materialien gegen MATERIAL_GERUEST Mappe 1:

| Feld | mat-1-1 | mat-1-2 | mat-1-3 | mat-1-4 | mat-1-5 | Bewertung |
|---|---|---|---|---|---|---|
| typ | bildquelle ✓ | tagebuch ✓ | darstellungstext ✓ | quellentext ✓ | tagebuch ✓ | PASS |
| titel | identisch ✓ | identisch ✓ | identisch ✓ | identisch ✓ | identisch ✓ | PASS |
| SCPL-Zone | S ✓ | C1 ✓ | C2 ✓ | C3 ✓ | P ✓ | PASS |
| artefakt_ref | img-1-1 ✓ | rolle-1-1 ✓ | — ✓ | zit-1-1/zit-1-2 ✓ | rolle-1-2 ✓ | PASS |
| W-Budget | ~40W ≤ ~40W ✓ | 117W ≤ 120W ✓ | 101W ≤ 130W ✓ | 93W ≤ 100W ✓ | 110W ≤ 110W ✓ | PASS |
| sensibilitaet | keine ✓ | keine ✓ | gewalt_altersfilter ✓ | keine ✓ | keine ✓ | PASS |

**Gesamt: PASS.** Alle 5 Materialien entsprechen exakt den GERUEST-Vorgaben.

### 3.2 Dispatch-Constraints

| Constraint | Material | Ergebnis | Bewertung |
|---|---|---|---|
| gewalt_altersfilter | mat-1-3 | Wirkung benannt (Lungen, toedlich, blind, lungenkrank), keine explizite Leidensdarstellung. Fokus Faktum + Konsequenz. | PASS |
| M1-A2 Kausalfrage | mat-1-3 | Kausalkette explizit: "festgefahren → Generaele suchten Waffe → Gift". In Absatz 1 direkt umgesetzt. | PASS |
| UE-001 rekonstruiert | mat-1-4 | `_meta.aufbereitung: "rekonstruiert"`. Quellenangabe: "Rekonstruierte Texte auf Basis historischer Quellen. [...] Kein woertliches Originalzitat." | PASS |

**Gesamt: PASS.** Alle 3 BEFUND-abgeleiteten Dispatch-Constraints vollstaendig umgesetzt.

### 3.3 Sequenz-Kohaerenz

| Pruefpunkt | Bewertung | Detail |
|---|---|---|
| SQ-1 Nur erarbeitetes Wissen | PASS | Kein Material referenziert Wissen, das erst spaeter eingefuehrt wird. |
| SQ-2 Keine verbotenen Begriffe | PASS | mat-1-5 referenziert Stellungskrieg, Schuetzengraben, Ausblutungsschlacht — alle vorher eingefuehrt. "Materialschlacht" wird in mat-1-5 neu eingefuehrt. |
| SQ-3 TB-Knoten erarbeitbar | PASS | Lueckenlose Abdeckung: k1-1 (mat-1-1/1-2), k1-2 (mat-1-2), k1-3 (mat-1-3), k1-4/k1-5/k1-6 (mat-1-4), k1-7 (mat-1-5). Alle 7 Knoten adressiert. |
| SQ-4 Narrativer Anschluss | PASS | Jede ueberleitung_von knuepft inhaltlich korrekt an Vorgaenger an. Keine Bruche. |
| SQ-5 material_charakter | PASS | Typ-spezifische Konventionen eingehalten (BU mit Erschliessungsimpuls, TB mit perspektivitaet-Beschraenkung, DT sachlich-erklaerend, QT mit Quellenkritik-Impulsen). |

### 3.4 Fachbegriff-Progression

| Position | Material | eingefuehrt | referenziert | Bewertung |
|---|---|---|---|---|
| 1 | mat-1-1 | — | — | PASS (Einstieg ohne Fachbegriffe korrekt) |
| 2 | mat-1-2 | Stellungskrieg, Schuetzengraben | — | PASS |
| 3 | mat-1-3 | Giftgas | Stellungskrieg | PASS |
| 4 | mat-1-4 | Ausblutungsschlacht | Stellungskrieg | PASS |
| 5 | mat-1-5 | Materialschlacht | Stellungskrieg, Schuetzengraben, Ausblutungsschlacht | PASS |

Lueckenlose, aufbauende Progression. Jeder eingefuehrte Begriff wird mindestens einmal referenziert. Kein Begriff wird vor seiner Einfuehrung referenziert.

### 3.5 Perspektiven-Abdeckung (Multiperspektivitaet-Policy STR-05)

| Perspektive | mat-1-1 | mat-1-2 | mat-1-3 | mat-1-4 | mat-1-5 | Abdeckung |
|---|---|---|---|---|---|---|
| P1: Deutsche Soldaten | | X | | | X | 2/5 |
| P2: Brit./Franz. Soldaten | X (BU) | | X (uebergreifend) | X (brit. Infanterist) | | 3/5 |
| P3: Militaerfuehrung | | | | X (Falkenhayn) | | 1/5 |

**3/3 Perspektiven abgedeckt. PASS.** Die Verteilung ist sinnvoll: P1 traegt die narrativen Klammermaterialien (C1 + P), P2 dominiert die Sachdarstellung, P3 erscheint punktuell bei der strategischen Eskalation (C3). Keine Perspektive ist ueberrepraesentiert.

### 3.6 Inhaltliche Qualitaet

**Historische Korrektheit:** Alle Faktenangaben sind sachanalytisch belegt (700 km Front, Ypern 22. April 1915, Chlorgas, 90.000 Gastote, Verdun 600.000, Somme ~1 Mio., 57.000 am ersten Tag). Keine Fehler identifiziert.

**Sprachregister R7:** Alle Materialien halten das Sprachregister fuer 7. Klasse ein. Satzlaengen angemessen, kein didaktischer Metakommentar in SuS-sichtbaren Texten. Die fiktiven Tagebucheintraege (mat-1-2, mat-1-5) verwenden eine authentisch wirkende, aber verstaendliche Soldatensprache.

**Didaktische Qualitaet:** Die SCPL-Dramaturgie funktioniert: S (visueller Einstieg) → C1 (Erleben) → C2 (Eskalation) → C3 (strategisches Kalkuel) → P (Hoffnungslosigkeit). Der narrative Bogen von Kriegsbeginn (November 1914) ueber Giftgas (1915) und Verdun/Somme (1916) zu Hoffnungslosigkeit (November 1917) ist chronologisch und emotional schluessig.

**Tagebuch-Perspektivitaet:** Beide Tagebucheintraege (mat-1-2, mat-1-5) halten korrekt die Perspektiv-Beschraenkung ein: Die Figuren wissen nur, was sie selbst erleben. Karl Meissner (mat-1-2) kennt keine Gesamtlage; Friedrich von Hartmann (mat-1-5) versteht seine Erfahrung, nicht die Strategie. Die `_meta.perspektivitaet`-Felder dokumentieren dies explizit.

---

## 4. Findings

### M1 — _meta-Felder vs. additionalProperties:false (MEDIUM)

**Befund:** Alle 5 Materialien enthalten `_meta`-Objekte mit produktionsrelevanten Metadaten (wortanzahl, figur, perspektive, erarbeitbarkeits_check, trigger_flags, etc.). Das material-output-schema.json deklariert jedoch `additionalProperties: false`, was `_meta` formal als Schema-Violation ausweist.

**Root Cause:** Die _meta-Felder sind bewusst als Zwischen-/Traceability-Format konzipiert — sie ueberleben die Produktion, werden aber nicht an die Engine weitergereicht. Das Schema bildet den Engine-Input ab, nicht das Produktionsformat.

**Empfehlung:** Schema um optionales `_meta`-Feld erweitern (typ: object, additionalProperties: true) oder ein separates Produktionsschema definieren, das _meta einschliesst. Aktuell ist die Diskrepanz tolerierbar, erzeugt aber bei strikter jq-Validierung false-negative Fehler.

**Prioritaet:** MEDIUM (keine Auswirkung auf Output-Qualitaet, aber Schema-Hygiene-Defizit)
**Scope:** escape-game-generator/architektur/schemata/material-output-schema.json

### M2 — mat-1-1 url_verifiziert:false (MEDIUM)

**Befund:** mat-1-1._meta.url_verifiziert = false. Das Foto (Cheshire Regiment, Somme 1916) referenziert einen Wikimedia-Commons-Pfad, aber die Datei wurde nicht heruntergeladen bzw. die URL-Erreichbarkeit nicht geprueft.

**Root Cause:** Der Bildquellen-Subagent hat keinen HTTP-Zugriff. Die Verifikation muss ausserhalb der Produktionspipeline erfolgen.

**Auswirkung:** Bei Rendering wuerde mat-1-1 ein defektes Bild zeigen, falls die lokale Datei (`../../assets/img/verlauf-erster-weltkrieg-marne-ende/img-1-1.jpg`) nicht existiert. Das Bild wurde im ARTEFAKT_INVENTAR als vorhanden deklariert — der tatsaechliche Dateistatus muss vor Deployment verifiziert werden.

**Empfehlung:** (1) Manuelle Verifikation: Existiert img-1-1.jpg lokal? (2) Langfristig: Post-Produktion-Hook der lokale Asset-Existenz prueft.

**Prioritaet:** MEDIUM (blockiert nicht Produktion, blockiert Deployment)
**Scope:** Deployment-Validation (nicht Infrastruktur-Patch)

### L1 — mat-1-4 quellentyp-Wert "rede" unpassend (LOW)

**Befund:** mat-1-4._meta.quellentyp = "rede". Der Inhalt ist jedoch kein Redetext, sondern ein kombiniertes Format aus Falkenhayn-Strategieerklaerung + britischem Infanterist-Zitat + narrativer Rahmung. "rede" trifft weder auf die Falkenhayn-Passage (Strategiepapier-Paraphrase) noch auf das Infanterist-Zitat (Erlebnisbericht) zu.

**Empfehlung:** Passender waere `quellentyp: "stimmen"` oder `quellentyp: "kombination"`. Da der Wert rein _meta-intern ist und keinen SuS-sichtbaren Output beeinflusst, besteht kein Handlungsdruck.

**Prioritaet:** LOW (kosmetisch, _meta-intern)
**Scope:** Kein Patch noetig. Ggf. in SUB_MATERIAL_QUELLENTEXT.md die quellentyp-Enum dokumentieren.

### L2 — Perspektiven-Asymmetrie GERUEST vs. Produktion (LOW)

**Befund:** Das MATERIAL_GERUEST deklariert mat-1-1 unter Perspektiven-Abdeckung nicht (nur P1: mat-1-2/mat-1-5, P2: mat-1-4 zit-1-2, P3: mat-1-4 zit-1-1). Die Produktion ordnet mat-1-1 jedoch P2 zu ("Britische Soldaten des Cheshire Regiments"), und mat-1-3 wird uebergreifend (P1, P2) statt gar nicht zugeordnet.

**Root Cause:** Das GERUEST dokumentiert die _geplante_ Perspektiv-Zuordnung konservativ. Die Produktion reichert Perspektiven an, wo der Inhalt es hergibt. Die Endabdeckung (3/3) ist korrekt und sogar besser als geplant.

**Empfehlung:** Kein Fix noetig. Die konservative GERUEST-Planung ist richtig (Minimum garantieren). Die Produktion uebertrifft sie — erwuenscht.

**Prioritaet:** LOW (keine Inkonsistenz, nur Dokumentations-Delta)
**Scope:** Keiner.

---

## 5. Prozess-Optimierungspotential

### OPT-1: _meta-Schema-Erweiterung (aus M1)

material-output-schema.json um optionales `_meta`-Property erweitern. Dann ist die jq-Validierung sauber, ohne dass _meta-Felder entfernt werden muessen. Minimaler Eingriff, hoher Hygiene-Gewinn.

### OPT-2: Asset-Existenz-Check als Post-Produktion-Schritt

Nach Abschluss aller Materialien einer Mappe: Automatischer Check ob referenzierte lokale Assets (img-*) existieren. Koennte als zusaetzlicher Q-Gate-Schritt oder als separater ORCHESTRATOR-Checkpoint implementiert werden.

### OPT-3: Compaction-Failsafe validiert

Die P1-Strategie (alle Reads aus Dateien, nie aus Kontext) hat unter Realbedingungen funktioniert. Kein Patch noetig — aber das Ergebnis sollte in der Testlauf-Dokumentation als validiert vermerkt werden.

---

## 6. Gesamtbewertung

| Dimension | Ergebnis | Begruendung |
|---|---|---|
| Prozesstreue | PASS | Dispatch-Isolation, Read-Sequenz, Compaction-Failsafe, Schema-Validierung — alles vertragskonform |
| GERUEST-Konformitaet | PASS | 5/5 Materialien exakt nach Vorgabe (Typ, Titel, Zone, W-Budget, Constraints) |
| Sequenz-Kohaerenz | PASS | SQ-1 bis SQ-5 alle PASS, Fachbegriff-Progression lueckenlos |
| Perspektiven | PASS | 3/3 Perspektiven abgedeckt, sinnvolle Verteilung |
| Inhaltliche Qualitaet | PASS | Historisch korrekt, R7 konform, didaktisch schluessig, Tagebuch-Perspektivitaet eingehalten |
| Findings | 0H / 2M / 2L | Keine Artefakt-Korrekturen noetig. M1 + OPT-1 betrifft Schema-Hygiene (Generator-Repo), M2 betrifft Deployment-Vorbereitung |

**GESAMT: PASS.**

Phase 2.1 Material-Produktion Mappe 1 ist abgeschlossen. Die Infrastruktur-Patches aus Phase 2.0 (AGENT_HEFTEINTRAG v3.5, ordnungsmuster-Enum, G2-Erweiterung) haben die erwartete Wirkung gezeigt: Kein HIGH-Finding, keine Artefakt-Korrekturen. Die 2 MEDIUM-Findings betreffen Schema-Hygiene und Deployment-Vorbereitung — beides nicht produktionsblockierend.

Naechster Schritt im kritischen Pfad: Phase 2.1c Cross-Revision (sofern definiert) oder Mappen 2-4 Rahmen + Material.

---

## 7. Produzierte Dateien (Referenz)

- mappe-1/materialien/mat-1-1.json (bildquelle, S-Zone)
- mappe-1/materialien/mat-1-2.json (tagebuch, C1-Zone)
- mappe-1/materialien/mat-1-3.json (darstellungstext, C2-Zone)
- mappe-1/materialien/mat-1-4.json (quellentext, C3-Zone)
- mappe-1/materialien/mat-1-5.json (tagebuch, P-Zone)
