# Material-Geruest: Mappe 3 — Warum endete der Krieg durch Revolution?

**Game-ID:** verlauf-erster-weltkrieg-marne-ende
**Erstellt:** 2026-04-09 (Phase 1, AGENT_MATERIAL Design-Modus)
**Validierungsstatus:** ENTWURF (User-Validierung ausstehend)
**Eingabe:** SKRIPT Chunk 3, TAFELBILD Mappe 3 (SCPL, STRUKTUR-FREEZE, Revision v2), DIDAKTIK_RAHMEN

**Konflikttyp:** true
**Perspektiven-Policy:** P1: Militaerfuehrung (Ludendorff, OHL) | P2: Matrosen/Soldaten (Kiel, Front) | P3: Zivilbevoelkerung (Arbeiter, Raete)

**Besondere Anforderung (TAFELBILD v2):** C2 (Waffenstillstandsgesuch, Verantwortungsverschiebung OHL → Regierung) ist INFERENTIAL. AGENT_MATERIAL muss Material bereitstellen, das diese Inferenz stuetzt. Siehe mat-3-3.

---

## SCPL-Abdeckung (aus TAFELBILD, fixiert)

| SCPL-Zone | Kurztext | Fachbegriffe | Material-Abdeckung |
|---|---|---|---|
| S | Ende 1917 ist Deutschland militaerisch und wirtschaftlich erschoepft — USA verstaerkt Alliierte | Alliierte | mat-3-1 (ZL: Zeitlicher Ueberblick 1917–1918), mat-3-2 (DT: USA-Eintritt und Offensive) |
| C1 | Fruehjahrsoffensive 1918 — 60 km Gewinn, dann Zusammenbruch | Fruehjahrsoffensive | mat-3-2 (DT: Offensive und Scheitern) |
| C2 | OHL erkennt Niederlage, fordert Waffenstillstand, schiebt Verantwortung auf Regierung | Waffenstillstandsgesuch | mat-3-3 (QT: Ludendorff-Gestaendnis + Verantwortungsverschiebung als narrativer Kontext) |
| P | Matrosen in Kiel verweigern sinnlosen Befehl — Novemberrevolution | Novemberrevolution | mat-3-4 (BQ: Matrosenmeuterei), mat-3-5 (TB: Matrose erlebt Revolution) |
| L1 | Deutschlands letzte Offensive scheiterte — militaerisch war der Krieg verloren | — | Synthese aus mat-3-1, mat-3-2 |
| L2 | Die Militaerfuehrung schob die Verantwortung auf die Politiker — ein Vertrauensbruch mit Folgen | — | Synthese aus mat-3-3 (INFERENTIAL — gestuetzt durch narrativen Kontext) |
| L3 | Das Volk beendete den Krieg durch Revolution, nicht die Armee durch Kapitulation | — | Synthese aus mat-3-4, mat-3-5 |

**DIRECT-Check:** 71% (5/7 Schritte DIRECT, C2 + L2 INFERENTIAL). Schwelle 70% erreicht: JA (knapp).

---

## Material-Entwurf

| ID | Typ | Titel | Skript-Absatz | SCPL-Zone | Artefakt-Ref | Quelle/Erstellung | W-Budget | sensibilitaets_markierung |
|---|---|---|---|---|---|---|---|---|
| mat-3-1 | zeitleiste | Wann kippte der Krieg gegen Deutschland? | §1–§3 | S, C1 | — | AGENT erstellt: 6 Eintraege April 1917 – November 1918 | ~90W | keine |
| mat-3-2 | darstellungstext | Warum scheiterte Deutschlands letzte Chance? | §1–§2 | S, C1 | img-3-1 | AGENT schreibt auf Basis INHALTSBASIS (USA-Eintritt, Fruehjahrsoffensive, Erschoepfung) | ~150W | keine |
| mat-3-3 | quellentext (rekonstruiert) | Was sagte Ludendorff, als alles verloren war? | §3 | C1, C2 | zit-3-1 | Ludendorff-Paraphrase: "Der Krieg ist verloren" + narrativer Kontext zur Verantwortungsverschiebung OHL → Regierung September 1918 | ~100W | keine |
| mat-3-4 | bildquelle | Was bedeuteten die roten Fahnen in Kiel? | §4 | P | img-3-2 | Wikimedia: Matrosenmeuterei Kiel, Rote Fahnen, Oktober/November 1918 | ~40W | keine |
| mat-3-5 | tagebuch | Wie wurde aus Meuterei Revolution? | §4–§6 | P | rolle-3-2 | AGENT schreibt: Matrose aus Kiel, Oktober–November 1918 | ~110W | keine |

**Wortbudget gesamt:** ~490W (Ziel: max. 500W)

**Mindest-Check:** 1 darstellungstext (mat-3-2) ✓ | 1 quelle/bild (mat-3-3 QT, mat-3-4 BQ) ✓ | 1 personifiziert (mat-3-5) ✓ | 1 visuell (mat-3-1 ZL, mat-3-4 BQ) ✓ | gesamt 5 ≥ 4 ✓

**Perspektiven-Abdeckung (Konflikttyp=true):**
- P1 Militaerfuehrung: mat-3-3 (Ludendorff gesteht Niederlage, schiebt Schuld weiter) ✓
- P2 Matrosen/Soldaten: mat-3-4 (BQ Matrosenmeuterei), mat-3-5 (TB Matrose aus Kiel) ✓
- P3 Zivilbevoelkerung: mat-3-5 (Revolution, Raete, Republik-Proklamation) ✓
- 3/3 Perspektiven repraesentiert ✓

**Dispatch-Constraints aus Inhaltsaudit (BEFUND_PHASE_1_INHALTSAUDIT):**
- **mat-3-2 (M3-F1, CRITICAL):** Dispatch-Constraint: DT MUSS sehr explizit kausal argumentieren: USA-Eintritt → Zeitdruck fuer Deutschland → Fruehjahrsoffensive als letzter Versuch → Scheitern wegen fehlender Reserven → OHL erkennt Niederlage. Chronologische Aufzaehlung reicht NICHT — kausale Verknuepfung jedes Schritts ist Pflicht.
- **mat-3-3 (M3-A1, CRITICAL):** Dispatch-Constraint: QT MUSS Ludendorffs ABSICHT der Verantwortungsverschiebung explizit machen. Nicht nur "Der Krieg ist verloren", sondern der Kontext: OHL fordert Regierung auf, Waffenstillstand zu verhandeln, DAMIT spaeter behauptet werden kann, die Politiker seien schuld. Originalzitat oder narrativer Kontext, der Schuldzuweisung als Taktik fuer 12-Jaehrige greifbar macht.
- **mat-3-3 (UE-001, HIGH):** Typ geaendert zu `quellentext (rekonstruiert)`. Dispatch-Constraint: Fussnote MUSS "Rekonstruierter Text auf Basis historischer Quellen" enthalten. `_meta.aufbereitung: "rekonstruiert"`.

---

## Zielklarheit-Pruefung

| Material | Funktion (1-Satz) | SCPL-Zone | Artefakt-Ref |
|---|---|---|---|
| mat-3-1 | Dieses Material gibt zeitliche Orientierung: Wann traten die USA ein, wann scheiterte die Offensive, wann begann die Revolution? | S, C1 | — |
| mat-3-2 | Dieses Material erklaert, warum die USA eintraten und warum die Fruehjahrsoffensive scheiterte — der militaerische Wendepunkt. | S, C1 | img-3-1 |
| mat-3-3 | Dieses Material laesst SuS Ludendorffs Gestaendnis hoeren und den Kontext verstehen: Die Militaerfuehrung forderte den Waffenstillstand, schob aber die Verantwortung auf die Regierung. | C1, C2 | zit-3-1 |
| mat-3-4 | Dieses Material zeigt die Matrosenmeuterei als Bild — rote Fahnen, Weigerung, der Moment, in dem das Volk handelte. | P | img-3-2 |
| mat-3-5 | Dieses Material laesst SuS die Revolution durch die Augen eines Matrosen erleben — von der Befehlsverweigerung bis zur Republikproklamation. | P | rolle-3-2 |

---

## Nicht verwendete Artefakte

- **pq-3-1** (Waffenstillstands-Bedingungen November 1918) — Reserve. Eignung: Aufgaben-Material oder Sicherungs-Kontext (Bedingungen des Waffenstillstands als Voraussetzung fuer Mappe 4).
- **pq-3-2** (Scheidemans Proklamation, 9. November 1918) — Reserve. Eignung: Hoch — koennnte in mat-3-5 als Zitat eingebettet werden (Subagent-Entscheidung in Phase 2.1).
- **zit-3-2** (Kaiser Wilhelm II.: "Ich bin nichts mehr") — Reserve. Nicht direkt im SKRIPT-Text. Eignung: Aufgaben-Material (Perspektive des gestürzten Monarchen).
- **rolle-3-1** (Obergefreiter: Hoffnung → Hoffnungslosigkeit Juni–August 1918) — Reserve. Ueberschneidung mit mat-3-2 (DT deckt militaerische Perspektive ab). Eignung: Ergaenzende Personalisierung fuer C1.
- **rolle-3-3** (Arbeiter-Raetefunktionaer: Revolution → Enttaeuschung 1918–1919) — Reserve. Eignung: Hoch — Bruecke zu Mappe 4 (Enttaeuschung ueber Versailles). Bei Budget-Erweiterung als mat-3-6.

---

## Erarbeitbarkeits-Nachweis

| SCPL-Zone | Material | Erarbeitungsweg |
|---|---|---|
| S: Deutschland erschoepft, USA verstaerkt Alliierte | mat-3-1 (ZL: April 1917 USA-Eintritt als Wendepunkt) + mat-3-2 (DT: erklaert Hintergrund) | SuS sehen auf der Zeitleiste, dass 1917 die USA eintraten. Der DT erklaert: Hunderttausende frische Soldaten kippten das Kraefteverhaeltnis. |
| S→C1 (Uebergang) | mat-3-2 | Im selben DT: USA-Eintritt → Deutschland versucht letzte Offensive vor Ankunft der Amerikaner. | kausal_mechanismus: USA-Eintritt kippt Kraefteverhaeltnis → Deutschland muss vor Ankunft der Amerikaner handeln → Fruehjahrsoffensive als Verzweiflungstat. |
| C1: Fruehjahrsoffensive scheitert | mat-3-2 (DT: 60 km Gewinn, dann Erschoepfung, keine Reserven) | SuS lesen, wie der letzte deutsche Vorstoss funktionierte — und warum er trotz Gelaendegewinn scheiterte. |
| C1→C2 (Uebergang) | mat-3-3 | Ludendorff erkennt: "Der Krieg ist verloren." Aber statt selbst die Konsequenzen zu ziehen, fordert die OHL die Regierung auf, den Waffenstillstand zu verhandeln. | kausal_mechanismus: Offensive scheitert → OHL erkennt militaerische Aussichtslosigkeit → fordert Waffenstillstand, aber verschiebt Verantwortung auf zivile Regierung (Dolchstoss-Vorbereitung). |
| C2: OHL schiebt Verantwortung auf Regierung | mat-3-3 (QT: Ludendorff-Gestaendnis + narrativer Kontext zur Verantwortungsverschiebung) | SuS hoeren Ludendorffs Worte und erfahren im narrativen Rahmen: Die Generaele, die den Krieg verloren haben, liessen die Politiker den Waffenstillstand unterschreiben — damit spaeter behauptet werden konnte, die Politiker seien schuld (Dolchstosslegende, Mappe 4). **INFERENTIAL:** Die SuS muessen aus dem Kontext schliessen, warum die OHL die Verantwortung abgab. |
| C2→P (Uebergang) | mat-3-3 → mat-3-4 | Waehrend die OHL verhandeln laesst, befiehlt sie gleichzeitig eine letzte sinnlose Seeschlacht — die Matrosen weigern sich. | kausal_mechanismus: OHL-Doppelspiel (Waffenstillstand fordern + sinnlose Seeschlacht befehlen) → Matrosen durchschauen Sinnlosigkeit → Befehlsverweigerung als Ausloeser der Revolution. |
| P: Matrosen verweigern, Revolution | mat-3-4 (BQ: Rote Fahnen in Kiel) + mat-3-5 (TB: Matrose erlebt Meuterei → Revolution → Waffenstillstand) | SuS sehen das Bild der Meuterei (mat-3-4), dann erleben sie durch den Matrosen: Befehlsverweigerung → Raete → Kaiser-Abdankung → Waffenstillstand 11. November 1918. |

**Abdeckungs-Check:** Jede Zone ≥1 Material ✓ | Jeder Uebergang belegt ✓ | C2 INFERENTIAL mit narrativem Kontext gestuetzt ✓ | Artefakt-Refs vorhanden (mat-3-1 ohne Ref begruendet: AGENT erstellt Zeitleiste) ✓

### inferenz_stuetzen: C2 (Verantwortungsverschiebung OHL → Regierung) — INFERENTIAL

| Feld | Inhalt |
|---|---|
| SCPL-Zone | C2: OHL erkennt Niederlage, fordert Waffenstillstand, schiebt Verantwortung auf Regierung |
| Stuetz-Fakten | (1) mat-3-2: Fruehjahrsoffensive gescheitert, militaerisch verloren — SuS wissen: OHL hat den Krieg verloren. (2) mat-3-5: Matrosen verweigern sinnlosen Befehl — SuS sehen: OHL gibt noch Befehle, obwohl alles verloren ist. |
| Narrativer Kontext | mat-3-3 liefert Ludendorffs Gestaendnis + narrativen Rahmen: Die Generaele, die den Krieg verloren haben, liessen die Politiker den Waffenstillstand unterschreiben. Der Dispatch-Constraint (M3-A1) fordert, dass die ABSICHT der Verantwortungsverschiebung explizit wird. |
| Altersgemaeßheit | Grenzwertig. Konzept "politische Schuldzuweisung als Taktik" erfordert Motivzuschreibung an politische Akteure — fuer 12-Jaehrige abstrakt. ABER: Wenn Ludendorffs Handlung als "jemand, der seinen Fehler auf andere schiebt" gerahmt wird, ist die kognitive Operation (Perspektivuebernahme) leistbar. |
| Absicherungs-Strategie | (1) Dispatch-Constraint mat-3-3: Narrativer Kontext muss Schuldzuweisung als "Trick" oder "Taeuschung" rahmen, nicht als politische Analyse. (2) Uebergangsobjekt mat-3-2→mat-3-3 benennt explizit die Frage "Was sagte der maechtigste General?" → Fokus auf Person, nicht auf System. (3) Mappe 4 greift Dolchstosslegende auf und entlarvt sie explizit (mat-4-5 korrektur_satz). |

---

## Sequenzplan

| # | Material-ID | Typ | Didaktische Funktion | SCPL-Zone | material_charakter | bildfunktion | analyseauftrag | personalisiert | primary_scpl_zone | aktivierungscharakter | fachbegriffe_eingefuehrt | fachbegriffe_referenziert | Voraussetzung | Kerninhalt (1 Satz) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | mat-3-1 | zeitleiste | einstieg | S, C1 | vergegenwaertigung | n/a | false | false | S | frage | [] | [] | — | Eine Zeitleiste von April 1917 bis November 1918 zeigt die Wendepunkte: USA-Eintritt, Fruehjahrsoffensive, Schwarzer Tag, Meuterei, Waffenstillstand. |
| 2 | mat-3-2 | darstellungstext | erarbeitung | S, C1 | vergegenwaertigung | n/a | false | false | C1 | — | [Alliierte, Fruehjahrsoffensive] | [Kriegsmuedigkeit] | mat-3-1 | Die USA traten im April 1917 ein — Deutschlands letzte Offensive im Fruehjahr 1918 brachte 60 km Gewinn, dann fehlten die Reserven. |
| 3 | mat-3-3 | quellentext | erarbeitung | C1, C2 | vergegenwaertigung | n/a | false | false | C2 | — | [Waffenstillstandsgesuch] | [Fruehjahrsoffensive] | mat-3-2 | General Ludendorff gestand am 8. August 1918: "Der Krieg ist verloren" — doch die OHL liess die Regierung den Waffenstillstand verhandeln, um selbst nicht als Verlierer dazustehen. |
| 4 | mat-3-4 | bildquelle | erarbeitung | P | vergegenwaertigung | heuristisch | false | false | P | — | [Meuterei] | [] | mat-3-3 | Ein Foto zeigt Matrosen mit roten Fahnen in Kiel — der Moment, in dem das Volk den sinnlosen Krieg beendete. |
| 5 | mat-3-5 | tagebuch | erarbeitung | P | vergegenwaertigung | n/a | false | true | P | — | [Novemberrevolution] | [Meuterei, Waffenstillstandsgesuch] | mat-3-4 | Ein Matrose aus Kiel erlebt die Revolution: Befehlsverweigerung, Raete, Kaiser-Abdankung, Waffenstillstand am 11. November 1918. |

**Anmerkung mat-3-4 bildfunktion=heuristisch:** Das Foto der Matrosenmeuterei ist NICHT rein illustrativ — SuS sollen aus dem Bild (rote Fahnen, Menschenmenge) erschliessen, was passierte. Trotzdem material_charakter=vergegenwaertigung, weil die Bildquelle narrativ eingebettet wird, nicht analytisch behandelt. S5 ist nicht verletzt, da heuristisch bei BQ nach Zuweisungsregeln besinnung_sachbezogen waere — ABER: hier kein Analyseauftrag, sondern narrative Entdeckung. Abweichung dokumentiert, Entscheidung: vergegenwaertigung bleibt.

### Uebergangsobjekte

| Von → Nach | rueckbezug_inhalt_ref | vorausblick_frage | kausalitaets_typ | intentionsskizze |
|---|---|---|---|---|
| mat-3-1 → mat-3-2 | Die Zeitleiste zeigte die Wendepunkte von 1917 bis 1918 — USA-Eintritt, Offensive, Zusammenbruch, Revolution. | Warum scheiterte Deutschlands letzte Chance, den Krieg doch noch zu gewinnen? | vertiefend | Die Zeitleiste gab zeitliche Orientierung. Jetzt erklaert der Darstellungstext die Zusammenhaenge: Warum die USA eintraten, warum die Offensive trotz Gelaendegewinn scheiterte. |
| mat-3-2 → mat-3-3 | Die Fruehjahrsoffensive brachte 60 km Gewinn, dann fehlten die Reserven — militaerisch war der Krieg verloren. | Was sagte der maechtigste General Deutschlands, als er die Niederlage erkannte? | kausal | Vom militaerischen Scheitern zum politischen Verhalten: Ludendorff gestand die Niederlage — aber die OHL schob die Verantwortung auf die Regierung. Dieser Schritt ist zentral fuer das Verstaendnis der Dolchstosslegende (Mappe 4). |
| mat-3-3 → mat-3-4 | Ludendorff forderte den Waffenstillstand, liess aber die Regierung verhandeln — gleichzeitig befahl die Marine eine letzte sinnlose Schlacht. | Was passierte, als Matrosen einen aussichtslosen Befehl verweigerten? | kausal | Waehrend die OHL verhandeln liess, befahl sie den Matrosen in Kiel eine letzte Seeschlacht. Die Matrosen weigerten sich — das Foto zeigt den Moment, in dem die Revolution begann. |
| mat-3-4 → mat-3-5 | Das Foto zeigte Matrosen mit roten Fahnen in Kiel — ein Bild der Befehlsverweigerung und des Aufbruchs. | Wie erlebte ein Matrose die Tage, die das Kaiserreich beendeten? | vertiefend | Vom Bild der Meuterei zur persoenlichen Erfahrung: Ein Matrose beschreibt, wie aus der Weigerung in Kiel eine Revolution wurde, die den Kaiser stuerzte und den Krieg beendete. |

### Sequenzkontext-Objekte

| Material-ID | vorher (ID, Typ, Kerninhalt) | nachher (ID, Typ, Kerninhalt) |
|---|---|---|
| mat-3-1 | — | mat-3-2, darstellungstext, USA-Eintritt und Scheitern der Fruehjahrsoffensive. |
| mat-3-2 | mat-3-1, zeitleiste, Wendepunkte 1917–1918 im zeitlichen Ueberblick. | mat-3-3, quellentext, Ludendorff gesteht Niederlage, OHL schiebt Verantwortung weiter. |
| mat-3-3 | mat-3-2, darstellungstext, Militaerisches Scheitern der letzten Offensive. | mat-3-4, bildquelle, Matrosenmeuterei in Kiel mit roten Fahnen. |
| mat-3-4 | mat-3-3, quellentext, OHL verliert Kontrolle, fordert Waffenstillstand. | mat-3-5, tagebuch, Matrose erlebt Revolution von Kiel bis Waffenstillstand. |
| mat-3-5 | mat-3-4, bildquelle, Rote Fahnen in Kiel als Zeichen der Meuterei. | — |

---

## Einstieg und Sicherung

### Einstieg
**Typ:** narrativ (Zeitungsreporter-Rahmen: "Eilmeldung: Revolution!")
**Text:** "Eilmeldung! Vier Jahre Krieg, und nun ueberschlagen sich die Ereignisse: Amerika ist eingetreten, Deutschlands letzte Offensive ist gescheitert, und in Kiel weigern sich Matrosen, in den Tod zu fahren. Euer Auftrag: Findet heraus, warum der Krieg nicht durch Sieg oder Niederlage auf dem Schlachtfeld endete — sondern durch Revolution."
**Problemstellung:** Warum endete der Krieg durch Revolution?
**Tafelbild-Voraussetzung:** Mappe 2: Kriegsmuedigkeit, Streiks, Vertrauensverlust in Regierung

### Sicherung
**Typ:** reflexion
**Hefteintrag-Verweis:** TAFELBILD_verlauf-erster-weltkrieg-marne-ende_Mappe3.md (SCPL: S→C1→C2→P→L, 5 Fachbegriffe, 3 Kernerkenntnisse)
**Reflexionsimpuls:** "Was hat sich an deinem Bild vom Ersten Weltkrieg veraendert?"
**Ueberleitung:** "Der Krieg ist vorbei. Die Matrosen meuterten, der Kaiser floh, eine Republik wurde geboren. Frieden! Aber was kommt jetzt? Die Siegermaechte setzen sich an einen Tisch — und die Bedingungen, die herauskommen, werden Deutschland fuer Jahrzehnte quaelen."

---

## Perspektiven-Abdeckungsmatrix

| Perspektive | mat-3-1 | mat-3-2 | mat-3-3 | mat-3-4 | mat-3-5 | Abdeckung |
|---|---|---|---|---|---|---|
| P1: Militaerfuehrung (OHL) | | | X | | | 1/5 |
| P2: Matrosen/Soldaten | | | | X | X | 2/5 |
| P3: Zivilbevoelkerung | | | | | X (Raete) | 1/5 |
| Arbeiter-Perspektive | | | | | | 0/5 |

**Fehlende Perspektiven:** Arbeiter-Perspektive unterrepraesentiert (M3-C1 LOW). Reserve rolle-3-3 (Raetefunktionaer) waere geeignet — Budget-Limit. mat-3-5 (Matrose) deckt "Volk handelt" ab, aber spezifische Arbeiter-Sicht fehlt. Akzeptabel: M2 hat Arbeiter-Leitperspektive.

---

## Q-Gate Self-Check

| # | Kriterium | Prio | Ergebnis | Detail |
|---|---|---|---|---|
| S1 | Artikulationsschema-Konformitaet | MUSS | PASS | Historische Perspektive: Problembegegnung (mat-3-1 Zeitleiste) → Vergegenwaertigung (mat-3-2 bis mat-3-5). Alle vergegenwaertigung. |
| S2 | Vorwissen-Progression | MUSS | PASS | mat-3-1: []/[]. mat-3-2: [Alliierte, Fruehjahrsoffensive]/[Kriegsmuedigkeit (M2-Voraussetzung)]. mat-3-3: [Waffenstillstandsgesuch]/[Fruehjahrsoffensive]. mat-3-4: [Meuterei]/[]. mat-3-5: [Novemberrevolution]/[Meuterei, Waffenstillstandsgesuch]. Alle Referenzen gedeckt. |
| S3 | TB-Knoten-Abdeckung | MUSS | PASS | S→mat-3-1/mat-3-2. C1→mat-3-2/mat-3-3. C2→mat-3-3. P→mat-3-4/mat-3-5. Alle 4 SCPL-Zonen abgedeckt. |
| S4 | Didaktische-Funktion-Sequenzlogik | MUSS | PASS | einstieg → erarbeitung × 4. Gueltige Reihenfolge. |
| S5 | Vergegenwaertigung vor Besinnung | MUSS | PASS mit WARN | Alle 5 Materialien material_charakter = vergegenwaertigung. mat-3-4 bildfunktion=heuristisch waere nach Zuweisungsregeln besinnung_sachbezogen — Abweichung dokumentiert (kein Analyseauftrag, narrative Einbettung). |
| S14 | SCPL-Korrespondenz | MUSS | PASS | S(1,2) → C1(2,3) → C2(3) → P(4,5). SCPL-Aufbaureihenfolge eingehalten. |
| S15 | Skript-Kongruenz | MUSS | PASS | §1–§3(1) → §1–§2(2) → §3(3) → §4(4) → §4–§6(5). Folgt SKRIPT-Absatzreihenfolge. |
| S16 | Zonen-Last-Limit | SOLL | PASS | mat-3-1 deckt 2 Zonen (S, C1). mat-3-2 deckt 2 Zonen (S, C1). Beide ≤2. |
| S17 | Materialtyp-SCPL-Kongruenz | SOLL | WARN | mat-3-1 (Zeitleiste) als Einstieg fuer Mappe mit kausalem Kern (M3-F1 CRITICAL). Zeitleiste verstaerkt chronologisches Denken, Mappe erfordert kausales Denken. Begruendung: Zeitleiste dient als zeitlicher Orientierungsrahmen VOR kausaler Analyse (mat-3-2 DT). Risiko durch Dispatch-Constraint M3-F1 kompensiert: mat-3-2 MUSS explizit kausal sein. |
| S7 | Anschaulich → Abstrakt | SOLL | PASS | Zeitueberblick → Sachtext → Quelle → Bild → Persoenlich. Progressiv. |
| S8 | Kontextgebot Quellenarbeit | SOLL | PASS | QT mat-3-3 an Position 3. Zwei Kontextmaterialien (ZL + DT) gehen voraus. BQ mat-3-4 heuristisch an Position 4, drei Kontextmaterialien voraus. |
| S9 | Uebergangs-Kohaerenz | SOLL | PASS | Alle 4 Uebergaenge vollstaendig. |
| S10 | Aktivierung am Sequenzbeginn | SOLL | PASS | mat-3-1: einstieg, aktivierungscharakter = frage, fachbegriffe_eingefuehrt = []. |
| S11 | Materialtyp-Vielfalt | KANN | PASS | 5 Typen: zeitleiste, darstellungstext, quellentext, bildquelle, tagebuch. Maximum. |
| S13 | Personalisierung in Fruehphase | KANN | WARN | mat-3-5 (Position 5, zweite Haelfte) ist personalisiert. Keine Personalisierung in erster Haelfte. Begruendung: Mappe 3 ist chronologisch-politisch strukturiert (militaerische Wendepunkte vor persoenlicher Revolution). Personalisierung am Ende (Matrose) ist didaktisch sinnvoller als kuenstliche Vorverlagerung. |
| S6 | Sequenzkontext-Vollstaendigkeit (Pre-Check) | — | PASS | Alle 5 Materialien vollstaendige sequenz_kontext-Objekte. |

**Gate-Urteil:** PASS mit WARN (S5: bildfunktion=heuristisch als vergegenwaertigung; S13: Personalisierung erst Position 5; S17: Materialtyp-SCPL-Kongruenz WARN — Zeitleiste als Einstieg mit kausalem Kern. Kompensation durch Dispatch-Constraint M3-F1: mat-3-2 DT MUSS explizit kausal sein.)
