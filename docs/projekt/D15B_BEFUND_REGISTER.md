# D15b Befund-Register

**Zweck:** Vollstaendige, disjunkte Liste aller Audit-Befunde aus D15b Multi-Agent-Audit Mappe 4, jeweils mit Qualifizierungs-Metadaten. Einzige Quelle der Wahrheit fuer Phase I–V der Optimierung.
**Kontext:** `AUSFUEHRUNGSPLAN_D15B_OPTIMIERUNG.md` Phase I.
**Status:** SCAFFOLD (Phase 0). Synthese-Befunde pre-populiert, Einzel-Audit-Befunde als Placeholder. Qualifizierung und Vervollstaendigung erfolgt in Phase I.

---

## Legende

**Konvergenz-Klasse (aus Synthese):**
- **A** = 5–6/6 Rollen konvergent (Konsens)
- **B** = 4/6 Rollen (robuste Mehrheit)
- **C** = 3/6 Rollen (Teilbefund)
- **D** = Dissens (3:3 oder 2:4, beide Seiten legitim)
- **E** = Einzelbefund mit hoher Evidenzdichte (nur 1-2 Rollen, aber stark begruendet)
- **F** = Blinder Fleck (kein Audit hat geprueft)
- **R** = Rollen-spezifisch, in Synthese nicht aufgenommen (ergaenzend zu A-F)

**Evidenz-Staerke:**
- **stark** = ausfuehrliche Begruendung, Zitate, theoretischer Bezug, mehrere Belegstellen
- **mittel** = klare Formulierung, begruendet, ggf. nur Einzelquelle
- **schwach** = Hinweis/Vermutung, nicht ausgefuehrt

**Verallgemeinerbarkeit:**
- **INFRA** = Befund deutet auf strukturellen Infrastruktur-Mangel
- **MAPPE** = Befund ist Mappe-4-spezifisch, nur Daten-Patch noetig
- **MIXED** = beides
- **UNKLAR** = Phase I muss entscheiden

**Severitaet:**
- **BLOCKER / HIGH / MEDIUM / LOW / INFO**

**Qualifizierungs-Verdikt (Phase I Output):**
- **accept** = in Strategie-Ausarbeitung uebernehmen
- **modify** = akzeptiert, aber reformuliert/umgedeutet
- **reject** = nicht weiter verfolgt, mit Begruendung
- **defer** = Post-Mappe-5 oder spaeterer Zyklus

**Status:**
- **pending** = noch nicht qualifiziert
- **qualified** = Phase I abgeschlossen
- **mapped** = Phase II abgeschlossen (Ebenen-Zuordnung vorhanden)
- **strategy** = in Strategie eingearbeitet (Phase III)
- **resolved** = Patch committed (Phase IV)

---

## Teil 1: Synthese-Befunde (Klasse A–F, pre-populiert)

### Klasse A — Konsens (5–6/6 Rollen)

| ID | Titel | Quelle | Konv | Evidenz | Verallg | Severitaet | Verdikt | Ebenen-Tag (vorlauef.) | Status |
|----|---|---|---|---|---|---|---|---|---|
| A1 | Historische Sachkorrektheit bestaetigt | Synthese §III.A1 (R1,R2,R3,R4,R5) | A | stark | INFRA(+)/MAPPE(+) | INFO | pending | — (positiv, kein Patch) | pending |
| A2 | Tagebuch Friedrich als exemplarisches Narrativ-Material | Synthese §III.A2 (R1–R6) | A | stark | MIXED | INFO | pending | E5 Gueteregeln: Narrativ-Material-Muster sichern | pending |
| A3 | Aufgaben-Progression suboptimal (6/7 Bloom 1-3, Analyse verspaetet) | Synthese §III.A3 (R4,R5,R6) | A | stark | INFRA | HIGH | pending | E3 Subagenten Aufgaben, E5 Gueteregeln Aufgaben | pending |
| A4 | Split-Attention Material↔Aufgabe | Synthese §III.A4 (R4,R5,R3) | A | stark | INFRA | HIGH | pending | E7 Engine (Layout), E1 Vertraege | pending |
| A5 | Feedback binaer, nicht elaborativ (Hattie d~0.45 statt 0.70) | Synthese §III.A5 (R4,R6,R5) | A | stark | INFRA | HIGH | pending | E3 Subagenten, E7 Engine (Feedback-Slots), E5 Gueteregeln | pending |

### Klasse B — Robuste Mehrheit (4/6)

| ID | Titel | Quelle | Konv | Evidenz | Verallg | Severitaet | Verdikt | Ebenen-Tag (vorlauef.) | Status |
|----|---|---|---|---|---|---|---|---|---|
| B1 | Doppelstunden-Tauglichkeit, Risiko bei Einzelstunden | Synthese §III.B1 (R3,R5,R4,R2) | B | stark | MIXED | MEDIUM | pending | E8 Begleitdokumente, E5 Gueteregeln (Zeitbudget) | pending |
| B2 | Multiperspektivitaet unterentwickelt (Belgien, FR, GB) | Synthese §III.B2 (R1,R2,R5) | B | stark | INFRA | HIGH | pending | E2 Subagenten Material, E5 Gueteregeln | pending |
| B3 | Technische Robustheit positiv auf alter Hardware | Synthese §III.B3 (R3,R4,R5) | B | mittel | MIXED | INFO | pending | — (positiv) | pending |

### Klasse C — Teilbefunde (3/6)

| ID | Titel | Quelle | Konv | Evidenz | Verallg | Severitaet | Verdikt | Ebenen-Tag (vorlauef.) | Status |
|----|---|---|---|---|---|---|---|---|---|
| C1 | Quellenkritik/Quellenarbeit unterentwickelt | Synthese §III.C1 (R1,R2,R4) | C | stark | INFRA | MEDIUM | pending | E3 Subagenten Aufgaben (neue Aufgaben-Typ?), E5 Gueteregeln | pending |
| C2 | Fragekompetenz (FUER-Modell) nicht entwickelt | Synthese §III.C2 (R1) | C | mittel | INFRA | LOW | pending | E3 Subagenten, E5 Gueteregeln | pending |
| C3 | Differenzierung begrenzt (kein Foerder-/Erweiterungs-Track) | Synthese §III.C3 (R2,R3,R5) | C | stark | INFRA | HIGH | pending | E7 Engine (Differenzierungs-Support), E3 Subagenten, E5 Gueteregeln | pending |

### Klasse D — Dissens

| ID | Titel | Quelle | Konv | Evidenz | Verallg | Severitaet | Verdikt | Ebenen-Tag (vorlauef.) | Status |
|----|---|---|---|---|---|---|---|---|---|
| D1 | Emotionales Triggerpotenzial Tagebuch (Risiko vs. Angebot) | Synthese §III.D1 (Pro R1,R4 / Kontra R2,R3) | D | stark | MIXED | MEDIUM | pending | E8 Begleitdokumente (Trigger-Warning), E6 Checklisten | pending |
| D2 | Escape-Game-Framing (Motivation vs. kognitive Ablenkung) | Synthese §III.D2 (Pro R4,R5 / Kontra R6) | D | mittel | INFRA | LOW | pending | E0 Meta-Prozess, E5 Gueteregeln | pending |

### Klasse E — Einzelbefunde

| ID | Titel | Quelle | Konv | Evidenz | Verallg | Severitaet | Verdikt | Ebenen-Tag (vorlauef.) | Status |
|----|---|---|---|---|---|---|---|---|---|
| E1 | Sprachliche Sensibilitaet Fachbegriff-Erklaerklammern | Synthese §III.E1 (R3) | E | mittel | INFRA | LOW | pending | E2 Subagenten Material | pending |
| E2 | Hefteintrag funktional, aber nicht reflexiv (Reproduktion statt Konstruktion) | Synthese §III.E2 (R5) | E | mittel | INFRA | MEDIUM | pending | E2 Subagenten (Hefteintrag-Subagent), E5 Gueteregeln | pending |

### Klasse F — Blinde Flecken

| ID | Titel | Quelle | Konv | Evidenz | Verallg | Severitaet | Verdikt | Ebenen-Tag (vorlauef.) | Status |
|----|---|---|---|---|---|---|---|---|---|
| F1 | Plan XVII / externe Vergleiche | Synthese §III.F1 | F | — | INFRA | LOW | pending | E9 Audit-Methodik (Folge-Audit) | pending |
| F2 | Langzeit-Retention und Transfer-Tests | Synthese §III.F2 | F | — | INFRA | MEDIUM | pending | E9 Audit-Methodik | pending |
| F3 | Vergleichende Zeitgenossen-Wahrnehmung (Quellendiversitaet) | Synthese §III.F3 | F | — | INFRA | MEDIUM | pending | E2 Subagenten Material, E9 | pending |
| F4 | Barrierefreiheit / WCAG (von keiner Rolle geprueft) | Synthese Executive/IX | F | — | INFRA | HIGH | pending | E7 Engine, E9 Audit-Methodik (accessibility-compliance Plugin) | pending |
| F5 | Datenschutz / DSGVO (ungeprueft) | Synthese IX | F | — | INFRA | MEDIUM | pending | E7 Engine, E9 | pending |
| F6 | Technische Robustheit unter Last (Mehrklassen-Nutzung) | Synthese IX | F | — | INFRA | LOW | pending | E7 Engine, E9 | pending |

---

## Teil 2: Rollen-spezifische Zusatzbefunde (R-Klasse, Phase I zu extrahieren)

**Vorgehen:** In Phase I werden die 6 Einzel-Audit-Dateien systematisch durchgelesen. Jeder Befund, der nicht bereits in Teil 1 (Synthese) enthalten ist, wird als R-Eintrag eingefuegt. ID-Schema: R<Rolle>-<lfnr>.

### R1 Geschichtsdidaktik (Forstner) — Audit: docs/analyse/D15b_AUDIT_R1_GESCHICHTSDIDAKTIK.md

| ID | Titel | Audit-§ | Evidenz | Verallg | Severitaet | Verdikt | Status |
|----|---|---|---|---|---|---|---|
| R1-1 | _[Phase I: extrahieren]_ | | | | | pending | pending |

### R2 Realschullehrerin Stadt/DaZ (Kilic) — Audit: docs/analyse/D15b_AUDIT_R2_LEHRERIN_STADT.md

| ID | Titel | Audit-§ | Evidenz | Verallg | Severitaet | Verdikt | Status |
|----|---|---|---|---|---|---|---|
| R2-1 | DaZ-Glossar-Box-Luecke (neutral/Nachschub/befestigt) | _[§ zu identifizieren]_ | _[tbd]_ | INFRA | MEDIUM | pending | pending |
| R2-2 | iPad-Touch-Ergonomie bei Drag-and-Drop | _[§ zu identifizieren]_ | _[tbd]_ | INFRA | MEDIUM | pending | pending |
| R2-3 | Paraphrasiertes Schlieffen-Zitat nicht als Paraphrase gekennzeichnet | _[§ zu identifizieren]_ | _[tbd]_ | MIXED | MEDIUM | pending | pending |
| R2-... | _[Phase I: weitere extrahieren]_ | | | | | pending | pending |

### R3 Realschullehrerin Land (Hellermann) — Audit: docs/analyse/D15b_AUDIT_R3_LEHRERIN_LAND.md

| ID | Titel | Audit-§ | Evidenz | Verallg | Severitaet | Verdikt | Status |
|----|---|---|---|---|---|---|---|
| R3-1 | _[Phase I: extrahieren — Plan-B-Kultur, alte Laptops, bildungsfernes Wording]_ | | | | | pending | pending |

### R4 Instructional Design (Raithel) — Audit: docs/analyse/D15b_AUDIT_R4_INSTRUCTIONAL_DESIGN.md

| ID | Titel | Audit-§ | Evidenz | Verallg | Severitaet | Verdikt | Status |
|----|---|---|---|---|---|---|---|
| R4-1 | Tipp-Haertegrade fehlen (Stufe 3 verraet Loesung) | _[§ zu identifizieren]_ | _[tbd]_ | INFRA | HIGH | pending | pending |
| R4-2 | Kein Pretraining (Fachbegriff-Aktivierung vor Material) | _[§ zu identifizieren]_ | _[tbd]_ | INFRA | MEDIUM | pending | pending |
| R4-... | _[Phase I: weitere extrahieren]_ | | | | | pending | pending |

### R5 Seminarleiter Bayern (Kaltenbrunner) — Audit: docs/analyse/D15b_AUDIT_R5_SEMINARLEITER.md

| ID | Titel | Audit-§ | Evidenz | Verallg | Severitaet | Verdikt | Status |
|----|---|---|---|---|---|---|---|
| R5-1 | Aufgabe 7 Freitext ohne explizite Rubric fuer Lehrprobe | _[§ zu identifizieren]_ | _[tbd]_ | INFRA | MEDIUM | pending | pending |
| R5-2 | Klassenfuehrung bei Einzelarbeit nicht adressiert | _[§ zu identifizieren]_ | _[tbd]_ | INFRA | MEDIUM | pending | pending |
| R5-... | _[Phase I: weitere extrahieren]_ | | | | | pending | pending |

### R6 Unterrichtsqualitaet empirisch (Heidacker) — Audit: docs/analyse/D15b_AUDIT_R6_UNTERRICHTSQUALITAET.md

| ID | Titel | Audit-§ | Evidenz | Verallg | Severitaet | Verdikt | Status |
|----|---|---|---|---|---|---|---|
| R6-1 | Tipp-Nutzungs-Leak 60-70% (Loesungsvorwegnahme) | _[§ zu identifizieren]_ | _[tbd]_ | INFRA | HIGH | pending | pending |
| R6-2 | OTL-Effizienz ~20% (vs. Ziel 30-40%) | _[§ zu identifizieren]_ | _[tbd]_ | INFRA | HIGH | pending | pending |
| R6-... | _[Phase I: weitere extrahieren]_ | | | | | pending | pending |

---

## Teil 3: Phase-I-Arbeitsprotokoll (leer)

_Hier wird in Phase I pro Befund die Qualifizierungs-Begruendung dokumentiert (warum accept/modify/reject/defer). Format: Zeitstempel, Befund-ID, Entscheidung, Begruendung._

---

## Teil 4: Statistik (wird in Phase I aktualisiert)

| Kennzahl | Wert |
|---|---|
| Gesamtzahl Befunde | _[tbd]_ |
| Klasse A/B/C/D/E/F | 5/3/3/2/2/6 (Synthese) |
| Klasse R (rollen-spezifisch) | _[tbd]_ |
| accept | _[tbd]_ |
| modify | _[tbd]_ |
| reject | _[tbd]_ |
| defer | _[tbd]_ |

---

**Naechste Aktion:** Phase I starten — rollen-spezifische Befunde aus 6 Audit-Dateien extrahieren und alle Eintraege qualifizieren.
