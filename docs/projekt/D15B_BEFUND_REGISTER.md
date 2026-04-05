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

## Teil 2: Rollen-spezifische Zusatzbefunde (R-Klasse, in Phase I.1 extrahiert)

**Quelle:** Parallel-Extraktion durch 6 Subagenten aus den 6 Audit-Dateien (Session 10 Forts. 8).
**Gesamtzahl:** 94 Befunde (R1=20, R2=14, R3=15, R4=15, R5=15, R6=15).
**Hinweis:** Die Rollen-Befunde enthalten Dopplungen zu den Synthese-Befunden (Teil 1). Die Konvergenz-Bezuege (letzte Spalte) verweisen auf die A/B/C/D/E/F-Klassen der Synthese, soweit zuordenbar. Bei Qualifizierung (Phase I.3) werden Duplikate mit Synthese-Befunden als "→siehe A2/B1/..." gekennzeichnet und nicht doppelt gezaehlt.

### R1 Geschichtsdidaktik (Forstner) — Audit: docs/analyse/D15b_AUDIT_R1_GESCHICHTSDIDAKTIK.md

| ID | Titel | Richtung | Verallg | Severitaet | Konv-Bezug | Verdikt | Status |
|----|---|---|---|---|---|---|---|
| R1-1 | Belgien-Neutralitaetsverletzung nicht politisch-moralisch problematisiert | add | MIXED | HIGH | B1 | pending | pending |
| R1-2 | Franzoesische Perspektive / Plan XVII fehlen vollstaendig | add | INFRA | HIGH | B1 | pending | pending |
| R1-3 | Quellen nur illustrativ, keine Quellenkritik-Anbahnung | add | INFRA | HIGH | B2 | pending | pending |
| R1-4 | Methodenkompetenz unterentwickelt (Bilderschliessung, Quellenvergleich) | modify | INFRA | HIGH | A3 | pending | pending |
| R1-5 | Fragekompetenz absent — alle Fragen vorgegeben | add | INFRA | MEDIUM | A3 | pending | pending |
| R1-6 | Geschichtsbewusstsein nur 2/7 Pandel-Dimensionen aktiviert | add | INFRA | HIGH | A5 | pending | pending |
| R1-7 | Friedrich-Tagebuch Personalisierungsfalle (reifiziert Fiktion) | modify | MIXED | MEDIUM | D1 | pending | pending |
| R1-8 | Hefteintrag benennt Scheitern, erklaert Ursachen nicht | modify | MAPPE | MEDIUM | C2 | pending | pending |
| R1-9 | Anforderungsbereich-Schiefe 6:1 (nur 4-7 im AB III) | modify | INFRA | MEDIUM | A2 | pending | pending |
| R1-10 | Aufgabe 4-7 Tipps fuehren zur Musterloesung | modify | MAPPE | LOW | C3 | pending | pending |
| R1-11 | Multiperspektivitaet auf Materialebene nicht umgesetzt | add | INFRA | HIGH | B1 | pending | pending |
| R1-12 | Orientierungskompetenz / Gegenwarts-Bezug schwach | modify | INFRA | MEDIUM | A5 | pending | pending |
| R1-13 | Tagebuch-Fiktivitaet wird nicht didaktisch thematisiert | add | MIXED | MEDIUM | B2 | pending | pending |
| R1-14 | Moralisches Bewusstsein absent (brennende Gehoefte) | add | INFRA | HIGH | A5 | pending | pending |
| R1-15 | Multiple-Choice ueberrepraesentiert (3/7), kein Grauzone-Denken | modify | MAPPE | LOW | C3 | pending | pending |
| R1-16 | Innere strategische Kritik am Schlieffen-Plan fehlt | add | MAPPE | LOW | unklar | pending | pending |
| R1-17 | Loesungswort-Mechanik didaktisch neutral-schwach | modify | UNKLAR | LOW | unklar | pending | pending |
| R1-18 | Sachkompetenz isoliert von Methodenkompetenz | modify | INFRA | MEDIUM | A3 | pending | pending |
| R1-19 | Reihenfolge-Aufgaben 4-3/4-6 trainieren Sequenz statt Kausalitaet | modify | MAPPE | LOW | C3 | pending | pending |
| R1-20 | Identitaetsbewusstsein absent (keine Selbst-Verortung) | add | INFRA | MEDIUM | A5 | pending | pending |

### R2 Realschullehrerin Stadt/DaZ (Kilic) — Audit: docs/analyse/D15b_AUDIT_R2_LEHRERIN_STADT.md

| ID | Titel | Richtung | Verallg | Severitaet | Konv-Bezug | Verdikt | Status |
|----|---|---|---|---|---|---|---|
| R2-1 | DaZ-Glossar fehlt (neutral, Nachschub, befestigt) | add | MAPPE | MEDIUM | B2 | pending | pending |
| R2-2 | Paraphrasiertes Schlieffen-Zitat nicht gekennzeichnet | modify | MAPPE | HIGH | C3 | pending | pending |
| R2-3 | "Neutral" in Belgien-Kontext nicht erklaert | modify | MAPPE | MEDIUM | B2 | pending | pending |
| R2-4 | Tagebuch-Triggerpotenzial fuer kriegserfahrene Kinder | enforce | MAPPE | HIGH | E (Heterogenitaet) | pending | pending |
| R2-5 | Deutschzentrische Perspektive nicht als Perspektive markiert | modify | MAPPE | MEDIUM | A3/B1 | pending | pending |
| R2-6 | Belgien-Invasion nicht als voelkerrechtlicher Bruch markiert | add | MAPPE | MEDIUM | C2 | pending | pending |
| R2-7 | Friedrich-Perspektive nicht als subjektiv gekennzeichnet | add | MAPPE | LOW | A3 | pending | pending |
| R2-8 | iPad-Drag-and-Drop vs. Button-Alternative | modify | INFRA | LOW | F (Technik) | pending | pending |
| R2-9 | Fachbegriff-Kennzeichnung-Inkonsistenz Hefteintrag | modify | MAPPE | LOW | C1 | pending | pending |
| R2-10 | Aufgabe 2 Distraktor B zu plausibel | modify | MAPPE | MEDIUM | D2 | pending | pending |
| R2-11 | Gesamtbearbeitungszeit 45-90 Min sprengt Einzelstunde | enforce | MAPPE | HIGH | D1 | pending | pending |
| R2-12 | Foerderkinder "Lernen" nicht adressiert | add | MAPPE | MEDIUM | E (Inklusion) | pending | pending |
| R2-13 | Hefteintrag-Uebergeleitung bleibt sequenz-isoliert | enforce | MAPPE | LOW | A4 | pending | pending |
| R2-14 | Trigger-Hinweis fuer Lehrende im Begleitheft fehlt | add | MAPPE | MEDIUM | E | pending | pending |

### R3 Realschullehrerin Land (Hellermann) — Audit: docs/analyse/D15b_AUDIT_R3_LEHRERIN_LAND.md

| ID | Titel | Richtung | Verallg | Severitaet | Konv-Bezug | Verdikt | Status |
|----|---|---|---|---|---|---|---|
| R3-1 | Tagebuch aktiviert bildungsferne SuS (Staerke) | enforce | INFRA | HIGH | positiv | pending | pending |
| R3-2 | Fachbegriffe klingen bildungsfern wie Fremdsprache | modify | MAPPE | MEDIUM | B2 | pending | pending |
| R3-3 | A7 verlangt Textproduktion ohne Schreibscaffold | modify | MAPPE | MEDIUM | E (Schreibschwaeche) | pending | pending |
| R3-4 | Kein Offline-Fallback bei WLAN-Ausfall | add | INFRA | MEDIUM | F (Technik) | pending | pending |
| R3-5 | Emotionale Sensibilitaet fuer Flucht-Biographien fehlt | add | INFRA | HIGH | E | pending | pending |
| R3-6 | Textabwehr bei niedriger Lesegeschwindigkeit | modify | MAPPE | MEDIUM | E | pending | pending |
| R3-7 | Touchpad-Motorik auf alter Hardware fummelig | enforce | MIXED | LOW | F | pending | pending |
| R3-8 | Sequenzielle Ladezeiten kosten Unterrichtszeit | modify | INFRA | LOW | F | pending | pending |
| R3-9 | Tagebuch-Fiktion paedagogisch manipulativ (Transparenz-Frage) | enforce | INFRA | INFO | B2/D1 | pending | pending |
| R3-10 | Hefteintrag pruefungsvorbereitungs-tauglich (Staerke) | enforce | MAPPE | INFO | positiv | pending | pending |
| R3-11 | Equity-Faktor: Mappe bevorzugt nicht Privilegierte | enforce | INFRA | HIGH | positiv | pending | pending |
| R3-12 | Satz-Starter fuer A7 fehlen | add | MAPPE | MEDIUM | E | pending | pending |
| R3-13 | Inline-Glossar 3-4 Begriffe wuerde Huerde senken | add | MAPPE | MEDIUM | B2 | pending | pending |
| R3-14 | Lehrkraefte-Hinweis zu Kriegs-Sensibilitaet fehlt | add | INFRA | HIGH | E | pending | pending |
| R3-15 | Gesamturteil: einsetzbar mit Scaffolding (Staerke) | enforce | INFRA | HIGH | positiv | pending | pending |

### R4 Instructional Design (Raithel) — Audit: docs/analyse/D15b_AUDIT_R4_INSTRUCTIONAL_DESIGN.md

| ID | Titel | Richtung | Verallg | Severitaet | Konv-Bezug | Verdikt | Status |
|----|---|---|---|---|---|---|---|
| R4-1 | Backward-Design-Progression verschleiert Analyseziel | modify | MAPPE | HIGH | A2 | pending | pending |
| R4-2 | Split-Attention Material↔Aufgabe (Sweller) | modify | INFRA | BLOCKER | A4 (Layout) | pending | pending |
| R4-3 | Generisches Feedback (Hattie d≈0.20 statt 0.70) | modify | INFRA | BLOCKER | A1 | pending | pending |
| R4-4 | ICAP-Mismatch: 6/7 Active, nur 1 Constructive | modify | MAPPE | HIGH | A2 | pending | pending |
| R4-5 | Tipp-Stufe-3 Expertise-Reversal-Risiko | modify | MAPPE | MEDIUM | A2 (Tipps) | pending | pending |
| R4-6 | Keine Differenzierung fuer Lesespannbreite ±2 Jahre | add | MIXED | HIGH | A2/E | pending | pending |
| R4-7 | Retrieval/Spaced Practice minimal | add | MAPPE | MEDIUM | unklar | pending | pending |
| R4-8 | Modality-Effekt ungenutzt (kein Voiceover) | modify | MAPPE | MEDIUM | E | pending | pending |
| R4-9 | Loesungswort erzeugt extraneous load | remove | MAPPE | LOW | unklar | pending | pending |
| R4-10 | Integration/Kontroversitaet (Merrill #5) fehlt | add | MAPPE | MEDIUM | B1 | pending | pending |
| R4-11 | Karten/Bilder zu klein | modify | MAPPE | LOW | F4 (Zugaenglichkeit) | pending | pending |
| R4-12 | A7 ohne Satzbausteine/Stichwort-Hilfe | modify | MAPPE | MEDIUM | E | pending | pending |
| R4-13 | Aufgaben-Kohaerenz nicht metakognitiv markiert | modify | MAPPE | MEDIUM | A4 | pending | pending |
| R4-14 | Gueterkriterien ohne CLT/Hattie-Operationalisierung | add | INFRA | HIGH | A1/A2 (E5) | pending | pending |
| R4-15 | SAMR hoch, ID-Qualitaet rechtfertigt Aufwand nicht | modify | MIXED | MEDIUM | unklar | pending | pending |

### R5 Seminarleiter Bayern (Kaltenbrunner) — Audit: docs/analyse/D15b_AUDIT_R5_SEMINARLEITER.md

| ID    | Titel                                                 | Richtung | Verallg | Severitaet | Konv-Bezug  | Verdikt | Status  |
| ----- | ----------------------------------------------------- | -------- | ------- | ---------- | ----------- | ------- | ------- |
| R5-1  | 45-Min-Rahmen nicht eingehalten (82 Min real)         | modify   | INFRA   | HIGH       | D1          | pending | pending |
| R5-2  | Differenzierung nicht im Tool implementiert           | add      | INFRA   | HIGH       | A2/E        | pending | pending |
| R5-3  | A7 Freitext ohne Bewertungs-Rubric (Lehrprobe-Killer) | add      | MIXED   | HIGH       | C2          | pending | pending |
| R5-4  | Fiktives Tagebuch-Kennzeichnung zu schwach            | enforce  | MAPPE   | MEDIUM     | B2/D1       | pending | pending |
| R5-5  | Karten-Vergleich Plan↔Wirklichkeit nicht side-by-side | modify   | INFRA   | MEDIUM     | A4 (Layout) | pending | pending |
| R5-6  | Reihenfolgen erlauben Trial-and-Error-Pseudolernen    | modify   | MAPPE   | MEDIUM     | C3          | pending | pending |
| R5-7  | MC-Feedback ohne Distraktor-Erklaerung                | modify   | INFRA   | MEDIUM     | A1          | pending | pending |
| R5-8  | Keine kooperativen/Paar-Phasen vorgesehen             | add      | INFRA   | MEDIUM     | unklar      | pending | pending |
| R5-9  | Tagebuch-Vorentlastung fehlt                          | add      | MAPPE   | MEDIUM     | E           | pending | pending |
| R5-10 | Keine Synchronisationspunkte fuer Klassenfuehrung     | modify   | INFRA   | MEDIUM     | unklar      | pending | pending |
| R5-11 | Multiperspektivitaet LehrplanPlus unterbelichtet      | modify   | MAPPE   | LOW        | B1          | pending | pending |
| R5-12 | Bildquelle franzoesisch, Perspektive nicht benannt    | modify   | MAPPE   | LOW        | B1          | pending | pending |
| R5-13 | Gueterkriterien ignorieren Lehrprobe-Tauglichkeit     | add      | INFRA   | LOW        | E5          | pending | pending |
| R5-14 | Gueterkriterien ignorieren Zeit-Realismus             | add      | INFRA   | LOW        | E5          | pending | pending |
| R5-15 | Karte-2 Legende unklar                                | modify   | MAPPE   | LOW        | unklar      | pending | pending |

### R6 Unterrichtsqualitaet empirisch (Heidacker) — Audit: docs/analyse/D15b_AUDIT_R6_UNTERRICHTSQUALITAET.md

| ID | Titel | Richtung | Verallg | Severitaet | Konv-Bezug | Verdikt | Status |
|----|---|---|---|---|---|---|---|
| R6-1 | Tiefen-/Oberflaechenstruktur-Mismatch (85% Reproduktion) | modify | INFRA | HIGH | A2 | pending | pending |
| R6-2 | 6/7 Aufgaben Bloom 1-3, nur A7 Bloom 4-5 | modify | MAPPE | HIGH | A2 | pending | pending |
| R6-3 | A7 zu spaet positioniert, kein Rueckkoppelungsraum | modify | MAPPE | MEDIUM | A4 | pending | pending |
| R6-4 | Feedback Task-Level statt Process-Level (Hattie) | modify | INFRA | HIGH | A1 | pending | pending |
| R6-5 | Tipp-Verdeckung erzeugt Stigma-Psychologie | modify | INFRA | MEDIUM | A2 | pending | pending |
| R6-6 | Oberflaechliche Material-Rezeption (30-40% skimmen) | modify | INFRA | MEDIUM | unklar | pending | pending |
| R6-7 | Elaborations-Prompts in A1-6 fehlen | add | MAPPE | HIGH | A2 | pending | pending |
| R6-8 | Kein Worked Example vor A7 | add | MAPPE | MEDIUM | A2 | pending | pending |
| R6-9 | OTL-Quote ~20% vs. Helmke-Benchmark 30-40% | modify | MAPPE | HIGH | A2 | pending | pending |
| R6-10 | Keine multiperspektivischen Vergleichs-Aufgaben | add | MAPPE | MEDIUM | B1 | pending | pending |
| R6-11 | Gamification boostet Drill (d≈0.15-0.25) | modify | INFRA | MEDIUM | unklar | pending | pending |
| R6-12 | Metakognitive Selbstcheck-Prompts fehlen | add | INFRA | MEDIUM | unklar | pending | pending |
| R6-13 | Kein aktives Concept Mapping fuer SuS (d≈0.64) | add | MAPPE | MEDIUM | C3 | pending | pending |
| R6-14 | Gueterkriterien pruefen nur Sichtstrukturen | modify | INFRA | HIGH | E5 | pending | pending |
| R6-15 | Gesamt-Effektstaerke d≈0.42-0.52 (unter Benchmark) | modify | MAPPE | BLOCKER | Gesamt | pending | pending |

---

## Teil 3: Phase-I.3 Qualifizierung (Cluster-basiert)

**Stand:** 2026-04-04, Session 10 Forts. 8
**Methodik:** Bei 114 Befunden (20 Synthese + 94 Rollen) bildet sich ein hoher Dopplungsgrad. Qualifizierung erfolgt cluster-weise: semantisch verwandte Befunde werden zu Clustern K01-K36 gebuendelt. Pro Cluster ein Verdikt mit Kurzbegruendung. Einzel-Befunde ohne Cluster-Zuordnung erhalten direkte Qualifizierung.

**Verdikt-Legende:**
- **accept**: Befund valid, wird in Phase II/III als Optimierungs-Anker uebernommen.
- **modify**: Befund valid, aber Scope/Formulierung/Prioritaet wird adjustiert (siehe Kommentar).
- **reject**: Befund verworfen (Begruendung: nicht haltbar, nicht Infra-Ebene, Aufwand unverhaeltnismaessig, Widerspruch zu anderen validierten Prinzipien).
- **defer**: Befund valid, aber ausserhalb Mappe-4-Optimierungs-Scope (z.B. Mappe-5-spezifisch, Folge-Track).

### Cluster-Uebersicht

#### K01 Cognitive Depth / Bloom-Verteilung (Kern-Befund)
- **Befunde:** A2, A3, R1-4, R1-9, R1-18, R4-1, R4-4, R6-1, R6-2, R6-9
- **Verdikt:** **accept** (P0)
- **Begruendung:** Hoechste Konvergenz aller Rollen (theoretisch+praktisch). 6/7 Aufgaben im AB I-II, nur A7 im AB III. OTL-Quote 20% vs. 30-40% Benchmark. Dies ist der zentrale strukturelle Befund der gesamten Studie. Zielt auf E3 (Aufgaben-Subagent) und E5 (Gueteregeln Aufgaben).

#### K02 Feedback-Qualitaet (Hattie-Luecke)
- **Befunde:** A1, R4-3, R5-7, R6-4, R6-5
- **Verdikt:** **accept** (P0)
- **Begruendung:** Generisches Task-Level-Feedback d≈0.20 vs. Process-Level-Feedback d≈0.70. Empirisch quantifiziert (R4, R6). Zielt auf E7 (Engine) und E3 (Subagent fuer Distraktor-Erklaerungen).

#### K03 Tipp-System Haertegrade / Loesungs-Leak
- **Befunde:** R1-10, R4-5, R6-5, C3 (teil), synthese F5-Nachbar
- **Verdikt:** **accept** (P0)
- **Begruendung:** Stufe 3 verraet Loesung, Expertise-Reversal-Risiko, Stigma-Psychologie. Zielt auf E3 (Tipp-Generator-Subagent) + E5 (Tipp-Gueteregeln) + E7 (UI-Tipp-Reveal-Logik).

#### K04 Multiperspektivitaet (Material- + Aufgaben-Ebene)
- **Befunde:** B1, R1-1, R1-2, R1-11, R2-5, R2-6, R2-7, R4-10, R5-11, R5-12, R6-10
- **Verdikt:** **accept** (P0 fuer Aufgaben-Ebene; modify fuer Material-Ebene)
- **Begruendung:** Konsens: deutschzentrierte Erzaehlung, fehlende franzoesische/belgische/britische Perspektive, Belgien als voelkerrechtl. Bruch nicht markiert. R3 sieht Equity-Staerke als Kontra-Argument (R3-11) → Synthese: Multiperspektivitaet darf nicht auf Kosten der Zugaenglichkeit gehen. Zielt auf E2 (Material-Subagent: +1 Quelle) + E3 (Aufgaben-Subagent: Perspektiven-Vergleichs-Pflichtaufgabe) + E5 (Gueteregeln Multiperspektivitaet).

#### K05 Quellenkritik / Fiktives Tagebuch
- **Befunde:** B2, R1-3, R1-7, R1-13, R2-2, R3-9, R5-4
- **Verdikt:** **accept** (P1)
- **Begruendung:** Tagebuch-Fiktivitaet wird im Material gekennzeichnet, aber didaktisch nicht als Quellenkritik-Anlass verwertet. Paraphrasiertes Schlieffen-Zitat ohne "sinngemaess"-Kennzeichnung. Zielt auf E2 (Material: explizitere Fiktionskennzeichnung) + E3 (Aufgaben: mindestens eine Quellenkritik-Aufgabe) + E5 (Gueteregel Quellenumgang).

#### K06 Sprache / DaZ / Bildungsferne
- **Befunde:** R2-1, R2-3, R3-2, R3-13, teil F1
- **Verdikt:** **accept** (P1)
- **Begruendung:** Fachbegriffe (neutral, Nachschub, befestigt, Mobilmachung, Strategie) unerklaert oder fremd wirkend. Konsens R2+R3+R5 zu Inline-Glossar-Bedarf. Zielt auf E2 (Material: Glossar-Box) + E7 (Engine: Glossar-Feature) + E5 (Sprach-Gueteregel).

#### K07 Differenzierung / Heterogenitaet
- **Befunde:** R2-12, R3-3, R3-6, R3-12, R4-6, R4-8, R4-12, R5-2, R5-9, E (Inklusion)
- **Verdikt:** **accept** (P1)
- **Begruendung:** Keine Differenzierungs-Tracks, kein Voiceover, keine Satz-Starter, Lesespannbreite ±2 Jahre unberuecksichtigt. Zielt auf E3 (Aufgaben-Subagent: Differenzierungs-Varianten) + E7 (Engine: Audio/Scaffold-Slots) + E5 (Gueteregel Differenzierung).

#### K08 Trigger-Sensibilitaet / Flucht-Biographien
- **Befunde:** R2-4, R2-14, R3-5, R3-14, E (Trauma)
- **Verdikt:** **accept** (P1, aber **modify**: kein Warnhinweis, sondern Handlungs-Orientierung fuer Lehrende)
- **Begruendung:** Friedrich-Tagebuch hoch emotional, Gefahr unbewusster Gleichsetzung Friedrich=Fluechtling. R2 explizit: "Nicht als Trigger-Warnung (paternalistisch), sondern didaktischer Hinweis." Zielt auf E8 (Begleitheft-Subagent: neue Pflicht-Sektion "Emotionale Rahmung").

#### K09 Zeit-Realismus / Stundenrahmen
- **Befunde:** D1 (Sequenz), R2-11, R5-1
- **Verdikt:** **accept** (P0 fuer Gueteregel; modify fuer Mappe 4 Daten-Patch)
- **Begruendung:** Mappe braucht real 45-90 Min (82 Min R5-Kalkulation), passt nicht in Einzelstunde. Zielt auf E5 (neue Zeit-Realismus-Gueteregel) + E3 (Aufgaben-Subagent: Zeit-Schaetzung pro Aufgabe) + E8 (Begleitheft: Doppelstunden-Hinweis). Mappe-4-Patch: Einzelstunden-Kurzversion.

#### K10 Differenzierungs-Tracks vs. Uniform-Aufgaben
- **Befunde:** R4-6, R5-2, teil A2
- **Verdikt:** **accept** (als Teil von K07)
- **Merge:** Dieser Cluster wird in K07 integriert (identische Implikation).

#### K11 Metakognition / Concept Mapping / Reflexion
- **Befunde:** R6-12, R6-13, R4-13, R1-5 (Fragekompetenz)
- **Verdikt:** **accept** (P2)
- **Begruendung:** Keine Selbstcheck-Prompts, kein eigen-generiertes Concept Map, keine Fragekompetenz. Zielt auf E3 (Aufgaben-Subagent: Meta-Prompts) + E8 (Hefteintrag-Struktur: Concept-Map-Slot).

#### K12 Layout / Spatial Contiguity / Seitwaerts-Vergleich
- **Befunde:** R4-2, R4-11, R5-5
- **Verdikt:** **accept** (P0, Severitaet BLOCKER)
- **Begruendung:** Split-Attention zwischen oben-Material und unten-Aufgaben, klassisches Sweller-Problem. Karten Plan↔Wirklichkeit nicht side-by-side. Zielt auf E7 (Engine: Layout-Refactor, Side-by-Side-Komponente) + E5 (Layout-Gueteregel).

#### K13 Gueteregeln pruefen Tiefenstrukturen nicht
- **Befunde:** R4-14, R5-13, R5-14, R6-14
- **Verdikt:** **accept** (P0, Infrastruktur-Kern)
- **Begruendung:** Gueteregeln operationalisieren CLT, Hattie-Feedback, Lehrprobe-Tauglichkeit, Zeit-Realismus nicht. Zielt auf E5 (Gueteregeln-Revision) und E9 (Audit-Methodik).

#### K14 Hefteintrag / Sicherung / Ankergewissen
- **Befunde:** C2, R1-8, R2-9, R2-13, R3-10 (Staerke), R5-3
- **Verdikt:** **accept** (P1)
- **Begruendung:** Hefteintrag pruefungsvorbereitungs-tauglich (R3 Staerke), erklaert aber Scheitern nicht ursaechlich. Fachbegriff-Kennzeichnungs-Inkonsistenz. A7-Freitext ohne Rubric (Lehrprobe-Blocker). Zielt auf E8 (Hefteintrag-Subagent + Rubric-Slot).

#### K15 Pandel / Geschichtsbewusstsein / Orientierungskompetenz
- **Befunde:** A5, R1-6, R1-12, R1-14, R1-20
- **Verdikt:** **accept** (P2)
- **Begruendung:** Nur 2/7 Pandel-Dimensionen aktiviert, Moral-Identitaet-Politik absent. Zielt auf E5 (Gueteregel Geschichtsbewusstsein) + E3 (Aufgaben-Subagent: Pandel-Pflichtcheck).

#### K16 Aufgabentypologie / MC-Ueberrepraesentation / Distraktor-Qualitaet
- **Befunde:** C3, R1-15, R1-19, R2-10, R5-6, R5-7
- **Verdikt:** **accept** (P1)
- **Begruendung:** MC ueberrepraesentiert, Reihenfolge trainiert Sequenz statt Kausalitaet, Trial-and-Error-Loesbarkeit, Distraktor B in A2 zu plausibel. Zielt auf E3 (Aufgaben-Subagent + Aufgabentyp-Policy) + E5 (Distraktor-Gueteregel).

#### K17 WCAG / Zugaenglichkeit
- **Befunde:** F4, R4-11 (Bilder zu klein)
- **Verdikt:** **accept** (P2)
- **Begruendung:** Keine WCAG-Pruefung im Audit-Prozess. Zielt auf E9 (Audit-Methodik) + E7 (Engine-Pass).

#### K18 Datenschutz / DSGVO
- **Befunde:** F5
- **Verdikt:** **defer** (eigener Track)
- **Begruendung:** Infrastruktur-uebergreifend, gehoert in Compliance-Track, nicht Mappe-4-Optimierung.

#### K19 Last-Robustheit / Performance
- **Befunde:** F6, R3-8 (Ladezeiten)
- **Verdikt:** **defer**
- **Begruendung:** Performance-Track, ausserhalb didaktischer Optimierung.

#### K20 Offline-Fallback
- **Befunde:** R3-4
- **Verdikt:** **defer** (Infra-Track)
- **Begruendung:** Betrifft Deployment/Distribution, nicht Generierungs-Infrastruktur. Dokumentieren, aber nicht in D15b-Umsetzung.

#### K21 Kooperative Lernphasen
- **Befunde:** R5-8
- **Verdikt:** **modify** (umbenennen zu "Einzelschirm-Modus als explizite Design-Entscheidung")
- **Begruendung:** Escape-Game ist bewusst Einzelarbeit. Kein Defizit, aber im Begleitheft als Design-Entscheidung zu dokumentieren. Zielt auf E8.

#### K22 Synchronisationspunkte / Klassenfuehrung
- **Befunde:** R5-10
- **Verdikt:** **accept** (P2)
- **Begruendung:** Kein Stopp-Punkt fuer Klassenfuehrung. Zielt auf E8 (Begleitheft: Empfohlene Stopps).

#### K23 Worked Examples / Retrieval / Spaced Practice
- **Befunde:** R4-7, R6-8
- **Verdikt:** **accept** (P2)
- **Begruendung:** Kein Worked Example vor A7, keine Retrieval-Intervalle. Zielt auf E3 (Aufgaben-Subagent: optional Worked-Example-Slot vor Freitext).

#### K24 Modality / Voiceover / Multimedia
- **Befunde:** R4-8
- **Verdikt:** **defer**
- **Begruendung:** Audio-Produktion ausserhalb Mappe-4-Scope, eigener Aufgaben-Track. Nicht in Phase IV.

#### K25 Integration / Merrill Prinzip 5 / Debatte
- **Befunde:** R4-10
- **Verdikt:** **modify** (integriert in K04 Multiperspektivitaet + K11 Metakognition)
- **Begruendung:** Dopplung. Wird nicht als eigener Cluster gefuehrt.

#### K26 Gamification-Loesungswort
- **Befunde:** R1-17, R4-9
- **Verdikt:** **reject**
- **Begruendung:** R4 will entfernen (extraneous load), R1 nennt neutral-schwach. Escape-Game-DNA ist Loesungswort — Entfernung wuerde Format destabilisieren. Optimierung: Loesungswort bleibt, wird aber nicht als Lern-Mechanismus verteidigt. Protokolliert als bewusste Design-Entscheidung in E8.

#### K27 Oberflaechliche Material-Rezeption
- **Befunde:** R6-6
- **Verdikt:** **modify** (integriert in K01 Cognitive Depth + K12 Layout)
- **Begruendung:** Symptom, nicht Ursache. Wird durch K01+K12 mitbehandelt.

#### K28 SAMR / Tech-Investment-Mismatch
- **Befunde:** R4-15
- **Verdikt:** **modify** (Meta-Befund, nicht operationalisierbar)
- **Begruendung:** Wahre Aussage, aber nicht als eigener Optimierungs-Hebel. Verschwindet durch Adressierung von K01, K02, K07.

#### K29 Innere strategische Kritik Schlieffen-Plan (historiografisch)
- **Befunde:** R1-16
- **Verdikt:** **defer**
- **Begruendung:** Vertiefungs-Zusatz fuer Hochleister, Mappe-4-Scope-Grenze. Protokollieren, nicht implementieren.

#### K30 Anforderungsbereich-Balance (Bayern)
- **Befunde:** A2, R1-9
- **Verdikt:** **accept** (Teil von K01)
- **Merge:** In K01 integriert.

#### K31 Sequenz-Kohaerenz / Uebergeleitung
- **Befunde:** A4, R2-13
- **Verdikt:** **accept** (P2)
- **Begruendung:** Mappe nennt Folge-Frage, naechste Mappe greift sie nicht auf. Zielt auf E8 (Uebergeleitungs-Template, Sequenz-Plan-Dokument).

#### K32 Positive Staerken (Schutz-vor-Abbau)
- **Befunde:** R3-1 (Tagebuch-Engagement), R3-10 (Hefteintrag), R3-11 (Equity), R3-15 (Gesamturteil einsetzbar)
- **Verdikt:** **accept als Schutzregeln** (P1)
- **Begruendung:** Diese Staerken muessen bei Optimierung erhalten bleiben. In Phase III als "Do-not-break"-Constraints kodifiziert. Zielt auf E5 (neue Meta-Gueteregel: Schutzregeln).

#### K33 Lehrprobe-Tauglichkeit als Dimension
- **Befunde:** R5-3, R5-13, R5-14
- **Verdikt:** **accept** (P1)
- **Begruendung:** Strategische Querschnitts-Dimension, die bislang nicht in Gueteregeln steht. Zielt auf E5 (neue Meta-Gueteregel) + E9 (Audit-Methodik).

#### K34 Dissens Block D1 (Erzaehlstrategie / Personalisierung)
- **Befunde:** D1, R1-7, R3-9
- **Verdikt:** **modify** (als parametrisierte Entscheidung, nicht als Befehl)
- **Begruendung:** Dissens zwischen R1 (Personalisierungsfalle) und R3 (Tagebuch als Equity-Staerke). Synthese: Personalisierung darf bleiben, aber mit Meta-Reflexions-Aufgabe. Zielt auf E3 (Aufgaben-Subagent: Pflicht-Meta-Aufgabe zu fiktiven Charakteren).

#### K35 Dissens Block D2 (Distraktor-Qualitaet)
- **Befunde:** D2, R2-10
- **Verdikt:** **accept** (Teil von K16)

#### K36 Audit-Methodik (meta)
- **Befunde:** R4-14, R5-13, R5-14, R6-14, F-Bloecke (E9-Bezug)
- **Verdikt:** **accept** (P1, ret­rospektiv auf Audit-Prozess selbst)
- **Begruendung:** Audit-Rollen haben Befunde, die nicht in bisherigen Gueteregeln waren. Zielt auf E9 (Audit-Methodik-Update: neue Rollen-Rotation, neue Pruefdimensionen) + E5 (Gueteregeln-Revision).

### Qualifizierungs-Bilanz (Cluster-Ebene)

- **accept (P0):** K01, K02, K03, K04, K09, K12, K13 → 7 Hochprioritaets-Cluster
- **accept (P1):** K05, K06, K07, K08, K14, K16, K32, K33, K34, K36 → 10 Cluster
- **accept (P2):** K11, K15, K17, K22, K23, K31 → 6 Cluster
- **modify (scope):** K21, K25, K27, K28 → 4 Cluster (teils in andere integriert)
- **reject:** K26 → 1 Cluster (Loesungswort bleibt per Design-Entscheidung)
- **defer:** K18, K19, K20, K24, K29 → 5 Cluster
- **merge (= Teil anderer Cluster):** K10→K07, K30→K01, K35→K16

**Netto-Optimierungs-Cluster fuer Phase III: 23** (7 P0 + 10 P1 + 6 P2).

---

## Teil 4: Statistik (Phase I.3 Stand)

### Befund-Statistik

| Kennzahl | Wert |
|---|---|
| Gesamtzahl Befunde | 114 (20 Synthese + 94 Rollen) |
| Klasse A/B/C/D/E/F (Synthese) | 5/3/3/2/2/5 |
| R1 / R2 / R3 / R4 / R5 / R6 | 20 / 14 / 15 / 15 / 15 / 15 |
| Positive Staerken (nur R3) | 4 (R3-1, R3-10, R3-11, R3-15) |

### Cluster-Bilanz (Qualifizierung)

| Verdikt | Anzahl Cluster | Cluster-IDs |
|---|---|---|
| accept P0 | 7 | K01, K02, K03, K04, K09, K12, K13 |
| accept P1 | 10 | K05, K06, K07, K08, K14, K16, K32, K33, K34, K36 |
| accept P2 | 6 | K11, K15, K17, K22, K23, K31 |
| modify (scope) | 4 | K21, K25, K27, K28 |
| reject | 1 | K26 (Loesungswort: bewusste Design-Entscheidung) |
| defer | 5 | K18 (DSGVO), K19 (Perf), K20 (Offline), K24 (Audio), K29 (Historiografie-Zusatz) |
| merged in other | 3 | K10→K07, K30→K01, K35→K16 |
| **Netto fuer Phase III** | **23** | **7 P0 + 10 P1 + 6 P2** |

### Severitaets-Verteilung (Befund-Ebene, vor Cluster-Deduplizierung)

| Severitaet | Anzahl |
|---|---|
| BLOCKER | 3 (R4-2, R4-3, R6-15) |
| HIGH | ca. 30 |
| MEDIUM | ca. 55 |
| LOW | ca. 20 |
| INFO | 6 (positiv) |

### Verallgemeinerbarkeit

| Klasse | Anteil |
|---|---|
| INFRA (strukturell) | ca. 45% — Hauptlast fuer Infrastruktur-Optimierung |
| MAPPE (nur Mappe 4) | ca. 45% — Daten-Patch-Kandidaten |
| MIXED | ca. 8% |
| UNKLAR | ca. 2% |

---

**Naechste Aktion:** Phase I abschliessen (STATUS/CHANGELOG + Commit), dann Phase II starten — Implikations-Matrix mit den 23 Netto-Clustern fuellen und Hotspot-Analyse verfeinern.
