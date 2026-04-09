# Material-Geruest: Mappe 2 — Was bedeutete der Krieg fuer die Menschen zuhause?

**Game-ID:** verlauf-erster-weltkrieg-marne-ende
**Erstellt:** 2026-04-09 (Phase 1, AGENT_MATERIAL Design-Modus)
**Validierungsstatus:** ENTWURF (User-Validierung ausstehend)
**Eingabe:** SKRIPT Chunk 2, TAFELBILD Mappe 2 (SCPL, STRUKTUR-FREEZE), DIDAKTIK_RAHMEN

**Konflikttyp:** true
**Perspektiven-Policy:** P1: Arbeiterfrauen/Muetter | P2: Regierung/Obrigkeit (Brotkarte, Propaganda) | P3: Arbeiter-Aktivisten (Streik)

---

## SCPL-Abdeckung (aus TAFELBILD, fixiert)

| SCPL-Zone | Kurztext | Fachbegriffe | Material-Abdeckung |
|---|---|---|---|
| S | Ab 1914 sperrt die britische Marine die deutschen Haefen | Seeblockade | mat-2-1 (QT: Brotkarte als Konsequenz), mat-2-2 (DT: erklaert Blockade) |
| C1 | Die Regierung fuehrt Brotkarten ein — Rationierung | Rationierung | mat-2-2 (DT: Blockade → Brotkarten-System) |
| C2 | Im Steckruebenwinter 1916/17 hungern Hunderttausende | Steckruebenwinter | mat-2-2 (DT: Hungerkrise), mat-2-3 (TB: Fabrikarbeiterin erlebt Hunger) |
| C3 | Frauen uebernehmen die Arbeit der Maenner — 33% Fabrikarbeiter weiblich | Frauenarbeit | mat-2-3 (TB: Fabrikarbeiterin), mat-2-4 (BQ: Frauen in Munitionsfabrik) |
| P | Hunger und Erschoepfung zerstoeren das Vertrauen in die Regierung | Kriegsmuedigkeit | mat-2-5 (TB: Arbeiter-Aktivist beschreibt Streik) |
| L1 | Die britische Seeblockade fuehrte zu Hunger — im Steckruebenwinter starben Hunderttausende | — | Synthese aus mat-2-1, mat-2-2 |
| L2 | Frauen uebernahmen die Arbeit der Maenner und veraenderten die Gesellschaft | — | Synthese aus mat-2-3, mat-2-4 |
| L3 | Kriegsmuedigkeit und Hunger trieben die Menschen zu Streiks und Widerstand | — | Synthese aus mat-2-5 |

**DIRECT-Check:** 100% (5/5 Zonen DIRECT). Schwelle 70% erreicht: JA.

---

## Material-Entwurf

| ID | Typ | Titel | Skript-Absatz | SCPL-Zone | Artefakt-Ref | Quelle/Erstellung | W-Budget | sensibilitaets_markierung |
|---|---|---|---|---|---|---|---|---|
| mat-2-1 | quellentext (rekonstruiert) | Was verraet diese Karte ueber den Krieg? | §1 | S | pq-2-1 | Historische Brotkarte-Verordnung, Januar 1915 (Paraphrase) | ~80W | keine |
| mat-2-2 | darstellungstext | Warum hungerte Deutschland mitten in Europa? | §1–§2 | S, C1, C2 | — | AGENT schreibt auf Basis INHALTSBASIS (Seeblockade, Rationierung, Steckruebenwinter) | ~150W | keine |
| mat-2-3 | tagebuch | Zehn Stunden Schicht und dann Hunger zuhause? | §2–§3 | C2, C3 | rolle-2-1 | AGENT schreibt: Fabrikarbeiterin aus Hamburg, 1917 | ~120W | keine |
| mat-2-4 | bildquelle | Was arbeiteten Frauen statt der Maenner? | §3 | C3 | img-2-1 | Wikimedia: Frauen in Munitionsfabrik 1917 | ~40W | keine |
| mat-2-5 | tagebuch | Warum streikten die Arbeiter mitten im Krieg? | §4–§5 | P | rolle-2-2 | AGENT schreibt: Arbeiter-Aktivist, Streik Berlin Januar 1918 | ~110W | keine |

**Wortbudget gesamt:** ~500W (Ziel: max. 500W)

**Mindest-Check:** 1 darstellungstext (mat-2-2) ✓ | 1 quelle/bild (mat-2-1 QT, mat-2-4 BQ) ✓ | 1 personifiziert (mat-2-3, mat-2-5) ✓ | 1 visuell (mat-2-4 BQ) ✓ | gesamt 5 ≥ 4 ✓

**Dispatch-Constraints aus Inhaltsaudit (BEFUND_PHASE_1_INHALTSAUDIT):**
- **mat-2-1 (UE-001, HIGH):** Typ geaendert zu `quellentext (rekonstruiert)`. Dispatch-Constraint: Fussnote MUSS "Rekonstruierter Text auf Basis historischer Quellen" enthalten. `_meta.aufbereitung: "rekonstruiert"`.
- **mat-2-2 (M2-A2, HIGH):** Dispatch-Constraint: DT MUSS intern klar dreistufig strukturieren: (1) Blockade → (2) Rationierung → (3) Steckruebenwinter. KEINE Aufzaehlung, sondern kausale Kette. SuS muessen Differenz zwischen Rationierung und Steckruebenwinter erkennen.
- **mat-2-5 (M2-A4, HIGH):** Dispatch-Constraint: TB MUSS den GRUND des Streiks explizieren (jahrelange Hungerkrise + Aussichtslosigkeit + gebrochene Versprechen), nicht nur den BERICHT des Streiks. Analytisches Element in narrativer Huelse.

**Perspektiven-Abdeckung (Konflikttyp=true):**
- P1 Arbeiterfrauen/Muetter: mat-2-3 (Fabrikarbeiterin Hamburg) ✓
- P2 Regierung/Obrigkeit: mat-2-1 (Brotkarte als staatliche Massnahme), mat-2-2 (Seeblockade/Propaganda) ✓
- P3 Arbeiter-Aktivisten: mat-2-5 (Streik-Tagebuch) ✓
- 3/3 Perspektiven repraesentiert ✓

---

## Zielklarheit-Pruefung

| Material | Funktion (1-Satz) | SCPL-Zone | Artefakt-Ref |
|---|---|---|---|
| mat-2-1 | Dieses Material konfrontiert SuS mit einer Brotkarte und aktiviert die Frage, warum der Staat Essen rationierte. | S | pq-2-1 |
| mat-2-2 | Dieses Material erklaert die kausale Kette Seeblockade → Rationierung → Steckruebenwinter und liefert den Sachkontext. | S, C1, C2 | — |
| mat-2-3 | Dieses Material laesst SuS Hunger UND Fabrikarbeit durch die Augen einer Arbeiterin erleben — die Bruecke zwischen Versorgungskrise und Frauenarbeit. | C2, C3 | rolle-2-1 |
| mat-2-4 | Dieses Material zeigt konkret, wie Frauen in Munitionsfabriken arbeiteten — visueller Beleg fuer die gesellschaftliche Veraenderung. | C3 | img-2-1 |
| mat-2-5 | Dieses Material macht greifbar, warum Menschen trotz Krieg streikten — Hunger und Erschoepfung als Ausloeser von Widerstand. | P | rolle-2-2 |

---

## Nicht verwendete Artefakte

- **img-2-2** (Arbeiterinnen beim Fuellen von Granaten 1918) — Reserve. Inhaltlich aehnlich wie img-2-1; zweites Fabrikfoto waere redundant. Eignung: Alternative zu img-2-1 oder fuer Aufgaben-Material (Bildvergleich).
- **pq-2-2** (Fabrik-Inspekteurin: Frauenarbeit, Erschoepfung, Munitionsproduktion) — Reserve. Wuerde C3 vertiefen. Budget-Limit verhindert 6. Material. Eignung: Hoch — als QT-Ergaenzung zu mat-2-4.
- **zit-2-1** (Deutsche Mutter: "Brotkarte reicht drei Tage, Kind weint vor Hunger") — Reserve. Emotional stark, aber mat-2-3 (TB Fabrikarbeiterin) deckt persoenliche Hungererfahrung ab. Eignung: Aufgaben-Material oder Einstiegs-Alternative.
- **zit-2-2** (Henderson: "Blockade macht Unschuldige zu leiden") — Reserve. Britische Perspektive auf Blockade. Eignung: Aufgaben-Material fuer Multiperspektivitaet (Sieger-Perspektive auf eigene Strategie).
- **rolle-2-3** (Verwaltungsbeamtin: Propaganda vs. Wirklichkeit 1917–1918) — Reserve. Deckt P-Zone (Vertrauensverlust) aus anderer Perspektive. Eignung: Hoch — bei Budget-Erweiterung als mat-2-6 (vertiefung).

---

## Erarbeitbarkeits-Nachweis

| SCPL-Zone | Material | Erarbeitungsweg |
|---|---|---|
| S: Seeblockade ab 1914 | mat-2-1 (QT: Brotkarte) + mat-2-2 (DT: Blockade erklaert) | SuS sehen die Brotkarte (mat-2-1), fragen sich warum. Dann erklaert mat-2-2: Grossbritannien sperrte die Haefen. |
| S→C1 (Uebergang) | mat-2-2 | Der Darstellungstext zeigt: Blockade → Regierung muss rationieren → Brotkarten als direkte Folge. \| kausal_mechanismus: Seeblockade schneidet Importe ab → Regierung MUSS rationieren → Brotkarten als staatliche Reaktion auf Mangel. |
| C1: Rationierung / Brotkarten | mat-2-2 (DT: Brotkarten-System, sinkende Rationen) | SuS lesen, wie die Rationen Jahr fuer Jahr sanken — von 1500g/Woche auf immer weniger. |
| C1→C2 (Uebergang) | mat-2-2 | Im selben Text: 1916/17 reichen die Rationen nicht mehr → Steckrueben als Notloesung. \| kausal_mechanismus: Rationierung reicht nicht → Winter 1916/17 verschaerft Mangel → Steckrueben als letztes Lebensmittel → Massensterben durch Unterernaehrung. |
| C2: Steckruebenwinter 1916/17 | mat-2-2 (DT: Hungerkrise) + mat-2-3 (TB: Fabrikarbeiterin erlebt Hunger) | mat-2-2 liefert Fakten (424.000–763.000 Tote), mat-2-3 macht es persoenlich. |
| C2→C3 (Uebergang) | mat-2-3 | Die Fabrikarbeiterin arbeitet UND hungert — die Bruecke zwischen Versorgungskrise und Frauenarbeit. \| kausal_mechanismus: Maenner im Krieg → Arbeitskraefte fehlen → Frauen uebernehmen Fabrikarbeit aus Notwendigkeit, nicht aus Emanzipation. |
| C3: Frauenarbeit in Fabriken | mat-2-3 (TB: Fabrikarbeiterin beschreibt Doppelbelastung) + mat-2-4 (BQ: Frauen in Munitionsfabrik) | SuS lesen die persoenliche Erfahrung (mat-2-3), dann sehen sie das Bild (mat-2-4). 33% Fabrikarbeiter weiblich bis 1918. |
| C3→P (Uebergang) | mat-2-4 → mat-2-5 | Die Frauen arbeiten bis zur Erschoepfung — wann wird es zu viel? \| kausal_mechanismus: Jahre von Hunger + Erschoepfung + gebrochene Versprechen → Vertrauensverlust in Regierung → Streik als Ventil der Kriegsmuedigkeit. |
| P: Kriegsmuedigkeit und Vertrauensverlust | mat-2-5 (TB: Arbeiter-Aktivist beschreibt Streik Januar 1918, 400.000 Berliner) | SuS erleben, warum Menschen trotz Strafandrohung streikten: "Der Streik ist nicht Verrat. Der Streik ist Notwehr gegen das Verhungern." |

**Abdeckungs-Check:** Jede Zone ≥1 Material ✓ | Jeder Uebergang belegt ✓ | Artefakt-Refs vorhanden oder begruendet (mat-2-2 ohne Ref: AGENT schreibt DT auf Basis INHALTSBASIS) ✓

---

## Sequenzplan

| # | Material-ID | Typ | Didaktische Funktion | SCPL-Zone | material_charakter | bildfunktion | analyseauftrag | personalisiert | primary_scpl_zone | aktivierungscharakter | fachbegriffe_eingefuehrt | fachbegriffe_referenziert | Voraussetzung | Kerninhalt (1 Satz) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | mat-2-1 | quellentext | einstieg | S | vergegenwaertigung | n/a | false | false | S | provokation | [] | [] | — | Eine Brotkarte aus dem Januar 1915 zeigt, dass die Regierung das Essen der Bevoelkerung rationierte. |
| 2 | mat-2-2 | darstellungstext | erarbeitung | S, C1, C2 | vergegenwaertigung | n/a | false | false | C1 | — | [Seeblockade, Rationierung, Steckruebenwinter] | [] | mat-2-1 | Die britische Seeblockade schnitt Deutschland von Nahrungsimporten ab — die Rationen sanken bis zum Steckruebenwinter 1916/17 auf ein toedliches Minimum. |
| 3 | mat-2-3 | tagebuch | erarbeitung | C2, C3 | vergegenwaertigung | n/a | false | true | C3 | — | [Frauenarbeit] | [Steckruebenwinter] | mat-2-2 | Eine Fabrikarbeiterin aus Hamburg beschreibt ihre Doppelbelastung: 10 Stunden Munitionsfabrik, dann Hunger zuhause. |
| 4 | mat-2-4 | bildquelle | erarbeitung | C3 | vergegenwaertigung | illustrativ | false | false | C3 | — | [] | [Frauenarbeit] | mat-2-3 | Ein Foto zeigt Frauen in einer Munitionsfabrik 1917 — sichtbarer Beweis fuer die gesellschaftliche Veraenderung. |
| 5 | mat-2-5 | tagebuch | erarbeitung | P | vergegenwaertigung | n/a | false | true | P | — | [Kriegsmuedigkeit] | [Steckruebenwinter, Frauenarbeit] | mat-2-4 | Ein Arbeiter-Aktivist beschreibt den Januarstreik 1918 in Berlin — 400.000 Menschen fordern Frieden und Brot. |

### Uebergangsobjekte

| Von → Nach | rueckbezug_inhalt_ref | vorausblick_frage | kausalitaets_typ | intentionsskizze |
|---|---|---|---|---|
| mat-2-1 → mat-2-2 | Die Brotkarte zeigte: Die Regierung bestimmte, wie viel jeder essen durfte — ein Zeichen von Mangel. | Warum reichte das Essen nicht mehr — was steckte hinter der Rationierung? | kausal | Die Brotkarte hat Neugier geweckt. Jetzt erklaert der Darstellungstext den Hintergrund: Seeblockade, sinkende Rationen, Hungertod. |
| mat-2-2 → mat-2-3 | Der Darstellungstext erklaerte, wie Seeblockade und Steckruebenwinter Hunderttausende in den Hunger trieben. | Wie erlebte eine Arbeiterin den Hunger — und warum arbeitete sie ueberhaupt in einer Fabrik? | perspektivwechsel | Vom Sachtext zum persoenlichen Erleben: Die Fabrikarbeiterin verbindet zwei Krisen — Hunger und Frauenarbeit — in einer Person. |
| mat-2-3 → mat-2-4 | Die Fabrikarbeiterin beschrieb Erschoepfung, Hunger und die Doppelbelastung aus Fabrik und Haushalt. | Wie sah die Arbeit aus, die Frauen statt der Maenner uebernahmen? | vertiefend | Vom persoenlichen Bericht zum visuellen Beleg: Das Foto zeigt, was "Frauenarbeit in Munitionsfabriken" konkret bedeutete. |
| mat-2-4 → mat-2-5 | Das Foto zeigte Frauen, die Granaten fuellten — erschoepfte Gesichter, gefaehrliche Arbeit. | Was passierte, als Hunger und Erschoepfung die Menschen an die Grenze brachten? | kausal | Von der Arbeit zum Widerstand: Die Erschoepfung und der Hunger fuehrten zum groessten Streik des Krieges. Der Arbeiter-Aktivist zeigt, wie Kriegsmuedigkeit in Aktion muendete. |

### Sequenzkontext-Objekte

| Material-ID | vorher (ID, Typ, Kerninhalt) | nachher (ID, Typ, Kerninhalt) |
|---|---|---|
| mat-2-1 | — | mat-2-2, darstellungstext, Seeblockade fuehrte zu Hunger und Steckruebenwinter. |
| mat-2-2 | mat-2-1, quellentext, Brotkarte als Zeichen staatlicher Rationierung. | mat-2-3, tagebuch, Fabrikarbeiterin erlebt Hunger und Doppelbelastung. |
| mat-2-3 | mat-2-2, darstellungstext, Seeblockade und Steckruebenwinter erklaert. | mat-2-4, bildquelle, Foto zeigt Frauen in Munitionsfabrik 1917. |
| mat-2-4 | mat-2-3, tagebuch, Fabrikarbeiterin verbindet Hunger und Frauenarbeit. | mat-2-5, tagebuch, Arbeiter-Aktivist beschreibt Januarstreik 1918. |
| mat-2-5 | mat-2-4, bildquelle, Frauen in Munitionsfabrik als visueller Beleg. | — |

---

## Einstieg und Sicherung

### Einstieg
**Typ:** narrativ (Zeitungsreporter-Rahmen, Perspektivwechsel Front → Heimat)
**Text:** "Zurueck in der Redaktion. Waehrend die Soldaten an der Front leiden, veraendert sich das Leben zuhause: Frauen arbeiten in Fabriken, Kinder hungern, die Regierung verteilt Brotkarten. Euer Auftrag als Heimatreporter: Findet heraus, was der Krieg fuer die Menschen zuhause wirklich bedeutete."
**Problemstellung:** Was bedeutete der Krieg fuer die Menschen zuhause?
**Tafelbild-Voraussetzung:** Mappe 1: Stellungskrieg, Hoffnungslosigkeit der Soldaten

### Sicherung
**Typ:** reflexion
**Hefteintrag-Verweis:** TAFELBILD_verlauf-erster-weltkrieg-marne-ende_Mappe2.md (SCPL: S→C1→C2→C3→P→L, 5 Fachbegriffe, 3 Kernerkenntnisse)
**Reflexionsimpuls:** "Was hat sich an deinem Bild vom Ersten Weltkrieg veraendert?"
**Ueberleitung:** "Vier Jahre Krieg. Die Soldaten sind erschoepft, die Heimat hungert. Die Hoffnung auf Sieg ist laengst erloschen. Und dann 1918 — aus Hoffnungslosigkeit wird Revolution."

---

## Perspektiven-Abdeckungsmatrix

| Perspektive | mat-2-1 | mat-2-2 | mat-2-3 | mat-2-4 | mat-2-5 | Abdeckung |
|---|---|---|---|---|---|---|
| P1: Arbeiterfrauen/Muetter | | | X | X | | 2/5 |
| P2: Regierung/Obrigkeit | X | X | | | | 2/5 |
| P3: Arbeiter-Aktivisten | | | | | X | 1/5 |
| Maennliche Perspektive | | | | | X | 1/5 |

**Fehlende Perspektiven:** Regierungsperspektive (M2-C1 MEDIUM) nur indirekt (Brotkarte als staatliche Massnahme, DT als Sacherklaerung). Kein Material zeigt Regierungssicht als persoenliche Perspektive. Reserve rolle-2-3 (Verwaltungsbeamtin) waere geeignet. Kompensation: Regierung wird in M3 (OHL) und M4 (Vertrag) staerker repraesentiert.

---

## Q-Gate Self-Check

| # | Kriterium | Prio | Ergebnis | Detail |
|---|---|---|---|---|
| S1 | Artikulationsschema-Konformitaet | MUSS | PASS | Historische Perspektive: Problembegegnung (mat-2-1 Brotkarte) → Vergegenwaertigung (mat-2-2 bis mat-2-5). Phasenfolge eingehalten. |
| S2 | Vorwissen-Progression | MUSS | PASS | mat-2-1: []/[]. mat-2-2: [Seeblockade, Rationierung, Steckruebenwinter]/[]. mat-2-3: [Frauenarbeit]/[Steckruebenwinter]. mat-2-4: []/[Frauenarbeit]. mat-2-5: [Kriegsmuedigkeit]/[Steckruebenwinter, Frauenarbeit]. Alle Referenzen durch vorherige Materialien gedeckt. |
| S3 | TB-Knoten-Abdeckung | MUSS | PASS | S→mat-2-1/mat-2-2. C1→mat-2-2. C2→mat-2-2/mat-2-3. C3→mat-2-3/mat-2-4. P→mat-2-5. Alle 5 SCPL-Zonen abgedeckt. |
| S4 | Didaktische-Funktion-Sequenzlogik | MUSS | PASS | einstieg → erarbeitung × 4. Gueltige Reihenfolge. |
| S5 | Vergegenwaertigung vor Besinnung | MUSS | PASS | Alle 5 Materialien material_charakter = vergegenwaertigung. Trivial erfuellt. |
| S14 | SCPL-Korrespondenz | MUSS | PASS | S(1,2) → C1(2) → C2(2,3) → C3(3,4) → P(5). SCPL-Aufbaureihenfolge eingehalten. |
| S15 | Skript-Kongruenz | MUSS | PASS | §1(1) → §1-§2(2) → §2-§3(3) → §3(4) → §4-§5(5). Folgt SKRIPT-Absatzreihenfolge. |
| S16 | Zonen-Last-Limit | SOLL | WARN | mat-2-2 deckt 3 Zonen (S, C1, C2) als primary_scpl_zone=C1. Begruendung: Kausale Kette Blockade→Rationierung→Steckruebenwinter ist nur als zusammenhaengender Prozess verstaendlich. Dispatch-Constraint M2-A2 fordert interne Dreistufigkeit. |
| S17 | Materialtyp-SCPL-Kongruenz | SOLL | PASS | Kein Typ-SCPL-Mismatch. QT (rekonstruiert) fuer S-Einstieg mit provokation-Charakter kongruent. DT fuer kausale Kette (S/C1/C2) kongruent. |
| S7 | Anschaulich → Abstrakt | SOLL | PASS | Progression: Konkretes Objekt (Brotkarte) → Sacherklaerung → persoenlich → visuell → persoenlich-politisch. |
| S8 | Kontextgebot Quellenarbeit | SOLL | PASS | QT mat-2-1 an Position 1: didaktische_funktion=einstieg UND analyseauftrag=false. Regelkonform. |
| S9 | Uebergangs-Kohaerenz | SOLL | PASS | Alle 4 Uebergaenge mit rueckbezug ≥8W, vorausblick ≥8W, validem kausalitaets_typ. |
| S10 | Aktivierung am Sequenzbeginn | SOLL | PASS | mat-2-1: einstieg, aktivierungscharakter = provokation, fachbegriffe_eingefuehrt = []. |
| S11 | Materialtyp-Vielfalt | KANN | PASS | 4 Typen: quellentext, darstellungstext, tagebuch, bildquelle. |
| S13 | Personalisierung in Fruehphase | KANN | PASS | mat-2-3 (Position 3, erste Haelfte bei 5 Materialien) hat personalisiert = true. |
| S6 | Sequenzkontext-Vollstaendigkeit (Pre-Check) | — | PASS | Alle 5 Materialien vollstaendige sequenz_kontext-Objekte. Konsistenz vorher(N) = nachher(N-1) geprueft. |

**Gate-Urteil:** PASS (alle MUSS erfuellt; SOLL: S1–S5, S14–S17 erfuellt, S16 WARN; alle KANN erfuellt)
