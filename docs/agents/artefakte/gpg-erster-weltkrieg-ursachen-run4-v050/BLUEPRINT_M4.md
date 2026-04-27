# Material-Geruest (Blueprint): Mappe M4 — Marne 1914

**Game-ID:** `gpg-erster-weltkrieg-ursachen-run4-v050`
**Mappe:** M4 — "Marne 1914 — Das Ende des kurzen Krieges"
**Stundenfrage:** Warum scheiterte der deutsche Plan fuer einen schnellen Sieg an der Marne?
**KE-Anker (haupt):** `GPG7_LB2_K_07` — historische Spuren des Kriegsverlaufs (Bonus, Marne-Wende)
**AFB-Korridor:** II (Anwenden + Analysieren) — bewusst entlastend nach M3-Hoehepunkt
**Bloom:** Anwenden → Analysieren
**Schulart / Klasse:** Mittelschule Bayern · Jahrgangsstufe 7c · Fach GPG
**Erstellt:** 2026-04-26 (Phase 1, agent-material-design, Plugin v0.5.0)
**Validierungsstatus:** ENTWURF (User-Validierung ausstehend)
**Eingaben:** SKRIPT_M4 (§1-§7, 645W) · HEFTEINTRAG_M4 (STRUKTUR-FREEZE) · skript_struktur.json/M4 · artefakt_inventar.json/M4 · DIDAKTIK_RAHMEN · medien_katalog · INHALTSBASIS

---

## 0. F0b-Priming + Konflikttyp-Flags

| Flag | Wert | Begruendung |
|---|---|---|
| `konflikttyp` | `true` | Mappe behandelt Schlacht (Marne 1914) und Strategie/Scheitern eines Kriegsplans — historischer Konflikt im Sinne STR-05. |
| `perspektiven_policy` | `"P1: Deutsche Generalstab-Fuehrung (Moltke d.J., Schlieffen-Erbe) | P2: Belgische Bevoelkerung+Regierung (Opfer Neutralitaets-Verletzung) | P3: Franzoesische Armee unter Joffre (defensiv-Sieger Marne) | P4: Britische Expeditionsstreitmacht (BEF unter John French) | P5: Soldaten beider Seiten (Erschoepfung, Versorgungs-Probleme)"` |
| `trigger_categories` (INHALTSBASIS) | `weltkrieg_grossereignis`, `konflikt` | Aktiviert MATERIAL-PERSPEKTIV-01: min. 2 nicht-dominante Tags ueber alle Materialien |
| `kolonialterminologie_scan` | `n/a` | Kategorie "Kolonisierung" in M4 nicht aktiv (M1-Domaene). TERMINOLOGIE-01 entfaellt fuer M4. |
| `sprachniveau-r7-priming` | aktiv | F0b-M8' wirkt fuer alle Subagenten-Dispatches |

**Perspektiv-Verteilungs-Plan (F0b-M9 Inline-Tag-Pflicht, AGENT_MATERIAL-Invariante):**
Die Materialien dieser Mappe muessen ueber `perspektiv_tags[]` zwei nicht-dominante Tags erreichen (Enum aus `config/perspektiv_enum.json`: `nicht-dominant`, `Opfer`, `Widerstand`, `Alltag`, `Kritik`, `Macht-Betroffen`, `Innen`).
Plan: mat-4-3 (gestelltes DT-Foto) traegt `Kritik` (Quellenkritik-Stelle, dekonstruiert dominante Heeres-Selbstdarstellung). mat-4-5 (Verlust-Statistik) traegt `Macht-Betroffen` (zaehlt Soldaten beider Seiten als Betroffene). Zusaetzlich kann mat-4-2 (Zeitleiste) durch Belgien-Datum 4.8. einen `Opfer`-Tag fuehren (Belgische Neutralitaets-Verletzung).
QG-09 erfuellbar (>= 2 nicht-dominante Tags).

---

## 1. SCPL-Abdeckung (aus HEFTEINTRAG_M4 + skript_struktur.json/M4, fixiert)

Da das Tafelbild im fixierten Hefteintrag als Zeitstrahl + Wendepunkt-Box realisiert ist (kein klassisches SCPL-Schema mit S/C/P/L-Sektionen), wird die SCPL-Logik aus den 5 Tafelbild-Knoten (K4-1..K4-5) und den 5 Verbindungen abgeleitet.

| SCPL-Zone | TB-Knoten | Kurztext aus Hefteintrag | Fachbegriffe | Material-Abdeckung |
|---|---|---|---|---|
| **S** (Situation) | K4-2 | "Schlieffen-Plan (1905/06)" — 6 Wochen FR-Sieg ueber Belgien | Schlieffen-Plan | mat-4-1 (DIRECT, Karte zeigt geplante Bewegung), mat-4-6 (Stuetzung Plan-Idee) |
| **C1** (Komplikation 1) | K4-3 | "Belgien-Verletzung 4.8.1914" — Neutralitaets-Bruch + GB-Kriegseintritt | Belgien-Verletzung, Neutralitaet | mat-4-2 (DIRECT, Datums-Eintrag 02.08./04.08./07.08./20.08.) |
| **C2** (Komplikation 2) | K4-4 | "Marne-Schlacht 5.-12.9.1914" — Joffre vs. Moltke, 40 km vor Paris | Marne-Schlacht | mat-4-2 (DIRECT, Datum 05.-12.09. + 14.09. Moltke ab), mat-4-3 (DT-Sicht), mat-4-4 (FR-Sicht), mat-4-5 (Verluste) |
| **P** (Problem/Wendepunkt) | K4-5 | "Wendepunkt zum Stellungskrieg" — Wettlauf zum Meer | Wendepunkt | mat-4-2 (DIRECT, 19.10. Wettlauf zum Meer endet), mat-4-5 (Verluste-Wucht ≥ 500.000 macht Schluss-Befund spuerbar) |
| **L** (Loesung/Sicherung) | K4-1 | "Stellungskrieg" — feste Stellungen, Schuetzen-Graeben, kein Vormarsch (zentrum-unten) | Stellungskrieg | mat-4-6 (DIRECT, Darstellungstext erklaert Stellungskrieg + 4 Jahre statt 6 Wochen) |

**DIRECT-Check:** 5/5 Zonen DIRECT abgedeckt = 100% (Schwelle 70% erreicht: JA). Keine INFERENTIAL-Markierung noetig — `inferenz_stuetzen`-Plan entfaellt.

**Voraussetzungs-Check (Vor-Mappen-Sicherung):**
- "Buendnis-System" (M1): SuS muessen wissen, warum Buendnisse zaehlen (M1-Sicherung). GESICHERT.
- "Buendnisfall + Mobilmachung + Belgien-Bruch fuehrt GB in Krieg" (M2 §5): GESICHERT in M2-Hefteintrag.
- "Augustbegeisterung + kurzer-Krieg-Glaube" (M3 §1+§4): GESICHERT in M3-Hefteintrag (Sandwich-Bruecke "Maenner glaubten an einen kurzen Krieg" wird in M4-Einstieg aufgenommen).

**SCPL-Uebergaenge (Erarbeitbarkeits-Nachweis siehe §5):**
- S→C1 (K4-2 → K4-3, "fordert"): Plan verlangt Belgien-Durchmarsch → Belgien-Verletzung
- C1→C2 (K4-3 → K4-4, "fuehrt nach Frankreich"): Belgien-Marsch fuehrt DT zur Marne
- C2→P (K4-4 → K4-5, "scheitert → wird"): Marne-Niederlage wird zum Wendepunkt
- P→L (K4-5 → K4-1, "muendet in"): Wettlauf zum Meer muendet in Stellungskrieg
- S→L (K4-2 → K4-1, "scheitert an"): Schlieffen-Plan scheitert am Stellungskrieg-Ergebnis (Klammer-Bezug)

---

## 2. Material-Entwurf

| ID | Typ | Titel | Skript-Absatz | TB-Knoten/SCPL-Zone | Artefakt-Ref | Quelle/Erstellung | W-Budget | sensibilitaets_markierung |
|---|---|---|---|---|---|---|---|---|
| mat-4-1 | karte | Schlieffen-Plan 1914 — die geplanten Bewegungen | §1-§2 | K4-2 / S | img-m4-01 (`Plan_Moltke-Schlieffen_1914.svg`) | Wikimedia Commons CC-BY-SA-3.0, Lvcvlvs | Bildunterschrift ~50W + Quellenkritik-BU ~25W | `mythos_korrektur_noetig` (Schlieffen-Plan-Mythos: Zuber-Forschung — kein "fertiger Plan", nur Aufmarsch-Skizzen; `korrektur_satz` PFLICHT) |
| mat-4-2 | zeitleiste | August/September 1914 — vom Ultimatum bis zum Wettlauf zum Meer | §3-§7 | K4-3 + K4-4 + K4-5 / C1+C2+P | — (Eigenproduktion, Datenbasis Wikipedia) | SUB_ZEITLEISTE, 7 Datums-Eintraege (02.08., 04.08., 07.08., 20.08., 05.-12.09., 14.09., 19.10.) | ~120W (7 Eintraege a 15-20W) | `keine` |
| mat-4-3 | bildquelle | Deutsche Soldaten an der Marne 1914 — vermutlich gestelltes Foto | §4 | K4-4 / C2 | img-m4-02 (`German_soldiers_Battle_of_Marne_WWI.jpg`) | Public Domain, German Army (anonym) | Bildunterschrift ~30W + Quellenkritik-BU ~50W | `propaganda_kontextualisierung_noetig` (Inszenierungs-Foto, Heeres-Selbstdarstellung; `kontextualisierung_satz` PFLICHT — wird im SUB_BILDQUELLE durch BU-Pflicht "vermutlich gestellt — Decorations-Tragen unueblich" umgesetzt) |
| mat-4-4 | bildquelle | Franzoesische Infanterie 1913 — der Pre-Marne-Vergleich | §5 | K4-4 / C2 | img-m4-03 (`Infanterie-française-rol.jpg`) | Public Domain, Agence Rol | Bildunterschrift ~30W + Datums-BU ~30W | `propaganda_kontextualisierung_noetig` (Datums-Hinweis Pflicht: Foto ist von 1913-Manoever, NICHT Marne 1914; `kontextualisierung_satz` PFLICHT) |
| mat-4-5 | statistik | Verluste der Marne-Schlacht — die Zahl, die alles aendert | §6 | K4-4 + K4-5 / C2+P | — (Eigenproduktion, Datenbasis Wikipedia) | SUB_STATISTIK, 3 Zahlen (FR ~250.000 / GB 12.733 / DT ~298.000) | ~50W (Tabelle + Kontextsatz) | `gewalt_altersfilter` (Zahlen genannt, NICHT visualisiert; `altersfilter_hinweis` PFLICHT — keine Bilder von Verletzten, "ca." vor FR/DT-Zahlen wegen Forschungs-Bandbreite) |
| mat-4-6 | darstellungstext | Vom Schlieffen-Plan zum Stellungskrieg — der Wendepunkt der Marne | §7 (+ §1 als Plan-Anker) | K4-5 + K4-1 / P+L | — (Eigenproduktion, Datenbasis Wikipedia + Skript M4 §1+§7) | SUB_DARSTELLUNGSTEXT, R7-Niveau | ~120W | `keine` |

**Mindest-Check (Materialtyp-Mix):**
- Darstellungstext: 1 (mat-4-6) ✓
- Quellentext ODER Bildquelle: 2 (mat-4-3, mat-4-4) ✓
- Personifiziert (Tagebuch/Brief/Zeitzeuge): **0** — bewusst entfaellt in M4. **Begruendung:** AFB-II-Sicherungs-Mappe nach M3-Hoehepunkt; M3 hat das personifizierte Material (rolle-M3-1 Skeptiker-Tagebuch) bereits geleistet, M4 fokussiert auf strukturell-strategische Schluss-Sicherung. Multiperspektivitaet wird ueber Bildquellen-Doppel (mat-4-3 DT vs. mat-4-4 FR) und Statistik (drei Verlust-Zahlen) erreicht. **WARN-Markierung Q-Gate-Self-Check:** "Personifizierung in M4 entfaellt — kompensatorisch durch perspektiv-doppelnde Bildquellen + drei-Parteien-Statistik."
- Visuell (Karte/Zeitleiste/Diagramm): 3 (mat-4-1 Karte, mat-4-2 Zeitleiste, mat-4-5 Statistik) ✓

**Anzahl gesamt: 6** (Korridor 4-7 PASS; Hefteintrag-A2-Knoten 5 + Stellungskrieg-Sicherungstext 1).

**Plan-Erweiterung gegenueber artefakt_inventar (5 Materialien):** mat-4-6 wird als 6. Material hinzugefuegt — F-PB-41-Coverage-Tabelle markiert Stellungskrieg-Darstellungstext als "AEQUIVALENT durch Begriffs-Anker in m4-mat-02 + m4-mat-05". Phase 1 entscheidet: aktivieren als eigenes Material, weil "Stellungskrieg" als KE-Bonus-Begriff (`GPG7_LB2_K_07`) explizit in B.5 Schluessel-Begriffe steht und die L-Zone (Sicherung) eigenstaendig abgedeckt sein muss. Reserve war im artefakt_inventar bereits vorgesehen ("RESERVE: m4-mat-06-darstellungstext-stellungskrieg in Phase 1 hinzufuegbar").

**img-m4-04 (Marne-Taxi)** verbleibt VERWORFEN_AUS_STOFFDICHTE — keine Reaktivierung in M4. Begruendung: 6 Materialien sind bereits Korridor-Obergrenze (4-7), und das Taxi-Bild ist Erinnerungs-Kultur-Erweiterung ohne KE-haupttragende Funktion. Marne-Taxi-Mythos wird IM SKRIPT M4 §5 erwaehnt (~5000 Soldaten) und ist damit narrativ verankert; ein eigenes Material wuerde den Stoff-Schwerpunkt verschieben. RESERVE bleibt fuer optionale Lehrkraft-Erweiterung.

**Medienvielfalt-Ratio (MV1):**
- Textbasiert: mat-4-6 (Darstellungstext) = 1
- Nicht-textbasiert: mat-4-1 (Karte), mat-4-2 (Zeitleiste), mat-4-3 (Bildquelle), mat-4-4 (Bildquelle), mat-4-5 (Statistik) = 5
- Bei 6 Materialien: max. 3 textbasiert. **1/6 = 17%** — **PASS** (deutlich unter 50%).

---

## 3. Zielklarheit-Pruefung

| Material | Funktion (1-Satz) | SCPL-Zone | Artefakt-Ref |
|---|---|---|---|
| mat-4-1 | Karte zeigt SuS die geplante Bewegung des Schlieffen-Plans (Bogen durch Belgien nach Paris) — Kern-Anker fuer Plan-Idee. | S (K4-2) | img-m4-01 |
| mat-4-2 | Zeitleiste macht den Plan-vs-Realitaet-Vergleich sichtbar: Plan = 6 Wochen, Realitaet = Stop an der Marne nach genau 5 Wochen. | C1+C2+P (K4-3..K4-5) | — |
| mat-4-3 | Bildquelle zeigt deutsche Soldaten "im Kampf" — und bringt den Quellenkritik-Befund: Foto ist vermutlich gestellt. | C2 (K4-4) | img-m4-02 |
| mat-4-4 | Bildquelle zeigt frz. Infanterie 1913 als Vergleich — Multiperspektivitaet (DT vs. FR) und zugleich Datums-Quellenkritik (1913, nicht 1914). | C2 (K4-4) | img-m4-03 |
| mat-4-5 | Statistik macht die Wucht des Marne-Scheiterns greifbar: > 500.000 Tote+Verwundete in 7 Tagen — der "kurze Krieg" ist als Idee tot. | C2+P (K4-4+K4-5) | — |
| mat-4-6 | Darstellungstext erklaert den Begriff "Stellungskrieg" und schlaegt die Bruecke zum Folge-Game. | P+L (K4-5+K4-1) | — |

**Zielklarheit-Gate:** Jedes Material hat eine 1-Satz-Funktion + SCPL-Zuordnung + Artefakt-Ref-Begruendung. PASS.

---

## 4. Nicht verwendete Artefakte

- **img-m4-04** (`Taxi_de_la_Marne,_Musée_de_l'Armée-IMG_0987.jpg`, CC-BY-SA-2.0-FR) → VERWORFEN_AUS_STOFFDICHTE: Stoffdichte-Korridor-Obergrenze in M4 ohne Erinnerungs-Kultur-Schwerpunkt; Mythos im SKRIPT §5 narrativ adressiert. Reserve fuer optionale Phase-1-Erweiterung (Lehrkraft-Erinnerungs-Kultur-Diskurs). Kein didaktischer KE-Verlust.
- **rolle-M4-?** (Tagebuch-Slot) → NICHT GEPLANT: AFB-II-Sicherungs-Mappe nach M3-Hoehepunkt. Personifizierung wurde in M3 (rolle-M3-1) verankert; M4 fokussiert auf strategisch-strukturelle Sicherung. Multiperspektivitaet kompensiert durch Bildquellen-Doppel + drei-Parteien-Statistik.

---

## 5. Erarbeitbarkeits-Nachweis (SCPL-Zonen + Uebergaenge)

### 5a. SCPL-Zonen-Abdeckung

| SCPL-Zone | Material | Erarbeitungsweg |
|---|---|---|
| S (K4-2 Schlieffen-Plan) | mat-4-1 (Karte, Bewegungs-Pfeile) | SuS lesen die Pfeile auf der Karte; die Bildunterschrift erklaert "geplante Bewegungen 1905, durch Belgien". Kombiniert mit mat-4-6 §1 ("Plan-Idee in 6 Wochen Frankreich besiegen") als Begriffs-Anker. |
| C1 (K4-3 Belgien-Verletzung) | mat-4-2 (Zeitleiste, 02.08. Ultimatum / 04.08. Einmarsch / 07.08. Lueck / 20.08. Bruessel) | Vier Datums-Eintraege machen die Eskalation chronologisch sichtbar; Tipp-Stufe 3 erklaert den Voelkerrechtsbruch ueber das GB-Kriegseintritts-Datum. |
| C2 (K4-4 Marne-Schlacht) | mat-4-2 (Datum 05.-12.09. + 14.09. Moltke abgesetzt) + mat-4-3 (DT-Soldaten-Foto) + mat-4-4 (FR-Infanterie-Vergleich) + mat-4-5 (Verluste) | Vier Materialien greifen ineinander: Zeitleiste (wann), Bilder (wer/wie inszeniert), Statistik (wie viele). Multiperspektivitaet (DT/FR) und Quellenkritik werden gleichzeitig erarbeitet. |
| P (K4-5 Wendepunkt zum Stellungskrieg) | mat-4-2 (19.10. Wettlauf zum Meer endet) + mat-4-5 (Verluste-Wucht > 500.000) | Zeitleisten-Schluss-Eintrag markiert das Ende des Bewegungskrieges; Statistik macht die Wucht spuerbar. |
| L (K4-1 Stellungskrieg) | mat-4-6 (Darstellungstext) | Darstellungstext erklaert "Stellungskrieg" als Begriff und macht die Sicherungs-Aussage "4 Jahre statt 6 Wochen" explizit lesbar — die Sicherung des Hefteintrags wird lesend nachvollzogen. |

### 5b. SCPL-Uebergaenge (Kausal-Mechanismen)

| SCPL-Uebergang | Material | Zusammenhang belegt durch | kausal_mechanismus |
|---|---|---|---|
| S → C1 | mat-4-1 + mat-4-2 | mat-4-1 (Plan zeigt Bogen DURCH Belgien) → mat-4-2 (04.08. Einmarsch) | Plan verlangt Belgien-Durchmarsch → Plan-Umsetzung erfordert Neutralitaets-Bruch → Belgien-Verletzung als unmittelbare Plan-Konsequenz. |
| C1 → C2 | mat-4-2 (07.08. Lueck → 20.08. Bruessel → 05.09. Marne) | Vier Datums-Eintraege chronologisch | Belgien-Marsch erschoepft Truppen + Versorgung + bringt DT bis 40 km vor Paris → Joffre setzt Falle → Marne-Konfrontation als geographische Folge des Plan-Marsches. |
| C2 → P | mat-4-5 (Verluste) + mat-4-2 (14.09. Moltke abgesetzt) | Verlust-Statistik + Personalwechsel | Marne-Niederlage zwingt DT zum Rueckzug → Moltke-Abloesung markiert organisationalen Plan-Bruch → kontrastiver Wechsel von Bewegungs- zu Stellungs-Logik (= Wendepunkt). |
| P → L | mat-4-2 (19.10. Wettlauf zum Meer) + mat-4-6 | Zeitleisten-Schluss + Darstellungstext-Erklaerung | Wettlauf zum Meer scheitert beidseitig → beide Heere graben sich ein → Stellungskrieg als raeumlich-zeitliche Folge des Marne-Stops (kausal: kein Gegner kommt mehr durch). |
| S → L (Klammer) | mat-4-1 + mat-4-6 | Karte (Plan) ↔ Darstellungstext (Stellungskrieg) | Plan-Versprechen (6 Wochen) wird durch Stellungskrieg-Realitaet (4 Jahre) widerlegt → kontrastiver Mechanismus: "Plan vs. Realitaet" als didaktischer Schluss-Befund. |

### 5c. Abdeckungs-Check

- [x] Jede SCPL-Zone ≥ 1 Material zugeordnet (5/5)
- [x] Jeder SCPL-Uebergang belegt + kausal_mechanismus dokumentiert (5/5, inkl. Klammer S→L)
- [x] Keine SCPL-Zone erfordert ungesichertes Vorwissen (M1+M2+M3-Voraussetzungen alle gesichert)
- [x] Jedes Material hat Artefakt-Ref ODER Begruendung: 4/6 mit img-Ref (mat-4-1, mat-4-3, mat-4-4) bzw. ohne (mat-4-2, mat-4-5, mat-4-6 sind Eigenproduktion auf Datenbasis Wikipedia/Skript-Anker — explizit begruendet)
- [x] DIRECT-Schwelle 70% erreicht (5/5 Zonen DIRECT)

---

## 6. Sequenzplan (didaktische Reihenfolge)

| # | Material-ID | Typ | Didaktische Funktion | SCPL-Zone | material_charakter | bildfunktion | analyseauftrag | personalisiert | primary_scpl_zone | aktivierungscharakter | fachbegriffe_eingefuehrt | fachbegriffe_referenziert | Voraussetzung | Kerninhalt (1 Satz) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | mat-4-1 | karte | einstieg | S | vergegenwaertigung | heuristisch | true | false | S (K4-2) | bild | ["Schlieffen-Plan"] | ["Buendnis-System" (M1)] | — | Karte mit den geplanten Bewegungs-Pfeilen des Schlieffen-Plans. |
| 2 | mat-4-2 | zeitleiste | erarbeitung | C1+C2+P | vergegenwaertigung | n/a | true | false | C1 (K4-3) | — | ["Marne-Schlacht", "Wendepunkt"] | ["Schlieffen-Plan", "Mobilmachung" (M2), "Buendnisfall" (M2)] | mat-4-1 | Zeitleiste August/September 1914 mit 7 Schluessel-Daten. |
| 3 | mat-4-3 | bildquelle | erarbeitung | C2 | besinnung_sachbezogen | illustrativ | true | false | C2 (K4-4) | — | [] | ["Marne-Schlacht", "Quellenkritik" (M3)] | mat-4-2 | DT-Soldaten-Foto an der Marne — Quellenkritik-Anker (gestellt). |
| 4 | mat-4-4 | bildquelle | erarbeitung | C2 | besinnung_sachbezogen | illustrativ | true | false | C2 (K4-4) | — | [] | ["Quellenkritik" (M3)] | mat-4-3 | FR-Infanterie 1913 — Multiperspektiv-Vergleich + Datums-Quellenkritik. |
| 5 | mat-4-5 | statistik | vertiefung | C2+P | besinnung_wertbezogen | n/a | true | false | P (K4-5) | — | [] | ["Marne-Schlacht"] | mat-4-2 | Verlust-Statistik Marne 5.-12.9.1914 (~ 250.000 FR / 12.733 GB / ~ 298.000 DT). |
| 6 | mat-4-6 | darstellungstext | sicherung | P+L | besinnung_sachbezogen | n/a | false | false | L (K4-1) | — | ["Stellungskrieg"] | ["Schlieffen-Plan", "Marne-Schlacht", "Wendepunkt"] | mat-4-5 | Erklaerung "Stellungskrieg" + Schluss-Bruecke "4 Jahre statt 6 Wochen". |

### Uebergangsobjekte

| Von → Nach | rueckbezug_inhalt_ref | vorausblick_frage | kausalitaets_typ | intentionsskizze |
|---|---|---|---|---|
| mat-4-1 → mat-4-2 | Die Karte hat dir gezeigt, was die deutsche Heeresleitung 1905 plante: ein grosser Bogen durch Belgien nach Paris in sechs Wochen. | Hat dieser Plan in der Wirklichkeit auch funktioniert — und wenn nein, an welchen Daten kannst du das ablesen? | temporal | Bruecke vom Plan zur Chronologie. SuS sehen Karte (Idee) und sollen diese mit der Zeitleiste (Realitaet) konfrontieren. Die Zeitleiste wird als Plan-Pruefung eingefuehrt. |
| mat-4-2 → mat-4-3 | Die Zeitleiste hat dich vom Ultimatum am 2. August bis zur Marne-Schlacht im September gefuehrt — fuenf Wochen statt sechs Wochen Sieg. | Wie sahen die Soldaten an der Front aus, die diesen Plan zu Ende bringen sollten — und was zeigen Fotos wirklich? | vertiefend | Wechsel von Chronologie (objektive Daten) zur Bildquellen-Analyse (subjektive Inszenierung). SuS lernen: Daten allein reichen nicht — auch die Bilder muss man pruefen. |
| mat-4-3 → mat-4-4 | Das Foto der deutschen Soldaten zeigte eine Inszenierung — Decorations-Tragen ist im echten Kampf unueblich. | Sahen die Franzosen anders aus — und kann man Bilder auch ueber das Datum stolpern lassen? | kontrastiv | Multiperspektivitaet (DT vs. FR) und Quellenkritik-Vertiefung (Datums-Stolperfalle 1913 vs. 1914). SuS erkennen: Quellenkritik gilt fuer beide Seiten. |
| mat-4-4 → mat-4-5 | Beide Heere haben sich aehnlich aufrecht und ordentlich praesentiert — Manoever-Photographie, kein dokumentarisches Bild des Krieges. | Wenn die Bilder nicht zeigen, was passiert — was zeigen dann die Zahlen? | kontrastiv | Wechsel von Bildebene (was zeigen Quellen) zur Zahlenebene (wie viele waren betroffen). SuS sehen: Hinter der Inszenierung steht die Realitaet von ueber 500.000 Toten/Verwundeten. |
| mat-4-5 → mat-4-6 | Die Zahlen haben dir gezeigt: Allein an der Marne wurden in einer Woche mehr als eine halbe Million Soldaten getoetet oder verwundet. | Was kommt nach so einer Schlacht — wie geht der Krieg jetzt weiter, wenn der Plan vom kurzen Krieg gestorben ist? | kausal | Schluss-Sicherung: Aus Verlusten + Plan-Scheitern folgt der Stellungskrieg. Der Darstellungstext fuehrt den Sicherungs-Begriff ein und macht die 4-Jahre-statt-6-Wochen-Aussage explizit. |

### Sequenzkontext-Objekte (fuer SUB_MATERIAL-Dispatch)

| Material-ID | vorher (ID, Typ, Kerninhalt) | nachher (ID, Typ, Kerninhalt) |
|---|---|---|
| mat-4-1 | — (erstes Material in M4; Vor-Mappe M3 endet mit "Maenner zogen los, glaubten an kurzen Krieg") | mat-4-2, zeitleiste, "Zeitleiste August/September 1914 mit 7 Schluessel-Daten" |
| mat-4-2 | mat-4-1, karte, "Karte mit den geplanten Bewegungs-Pfeilen des Schlieffen-Plans" | mat-4-3, bildquelle, "DT-Soldaten-Foto an der Marne — Quellenkritik-Anker" |
| mat-4-3 | mat-4-2, zeitleiste, "Zeitleiste August/September 1914 mit 7 Schluessel-Daten" | mat-4-4, bildquelle, "FR-Infanterie 1913 — Multiperspektiv-Vergleich" |
| mat-4-4 | mat-4-3, bildquelle, "DT-Soldaten-Foto an der Marne — gestellt" | mat-4-5, statistik, "Verlust-Statistik Marne (FR/GB/DT)" |
| mat-4-5 | mat-4-4, bildquelle, "FR-Infanterie 1913 — Manoever, nicht 1914" | mat-4-6, darstellungstext, "Erklaerung Stellungskrieg + Schluss-Bruecke" |
| mat-4-6 | mat-4-5, statistik, "Verlust-Statistik Marne — > 500.000 in 7 Tagen" | — (letztes Material; ABSCHLUSS_C5_REFLEXION schliesst Game) |

**Vorausgesetztes Wissen (per Material; aus M1-M3 Hefteintraegen):**
- mat-4-1: Buendnis-System (M1), Belgien-als-neutrales-Land (M2 §5)
- mat-4-2: Buendnisfall + Mobilmachung (M2), GB-Kriegseintritt (M2)
- mat-4-3, mat-4-4: Quellenkritik (M3 §2 + §4 + §7), Auftrags-Inszenierung (M3 Burgfriedens-Medaille)
- mat-4-5: zaehlen+vergleichen
- mat-4-6: Schlieffen-Plan (mat-4-1), Marne-Schlacht (mat-4-2 + mat-4-5), Wendepunkt (mat-4-2)

**Noch nicht eingefuehrt** (gesperrte Begriffe):
- mat-4-1: "Stellungskrieg", "Wendepunkt" (kommen in mat-4-2/4-6)
- mat-4-2 (vor Eintrag 5.9.): "Stellungskrieg" (mat-4-6)
- mat-4-3..4-5: "Stellungskrieg" (mat-4-6) bleibt gesperrt — wird erst im finalen Darstellungstext eingefuehrt

---

## 7. Einstieg und Sicherung

### Einstieg

**Typ:** narrativ-szenarisch (Spurensucher-Rahmenhandlung-Fortschreibung)
**Text (aus SKRIPT §M4 Einstieg-Kontext, R7-Form):**
> "Mappe 3 endete mit den Maennern, die in den Krieg zogen. Sie glaubten an einen kurzen Krieg. 'Weihnachten sind wir wieder zu Hause', sagten viele. Mappe 4 zeigt dir, wie schnell dieser Glaube zerbrach. Die deutsche Heeresleitung hatte einen Plan — und du wirst gleich sehen, wie dieser Plan in nur fuenf Wochen scheiterte. Pack die vierte Mappe an."
**Tafelbild-Voraussetzung:** M3-Sicherung (Augustfieber + Burgfrieden + Schuld-Diskurs) gesichert; Sandwich-Bruecke aus M3-Skript-Schluss.

### Sicherung

**Typ:** zusammenfassung + reflexion + ausblick
**Text:**
> "Du hast nun alle vier Mappen geoeffnet. Trag die Begriffe Schlieffen-Plan, Belgien-Verletzung, Marne-Schlacht, Wendepunkt und Stellungskrieg in deinen Hefteintrag ein. Schreibe in einem Satz: An der Marne im September 1914 endete der 'kurze Krieg' — und der Stellungskrieg begann. Aus geplanten sechs Wochen wurden vier Jahre Krieg."
**Reflexionsimpuls (1 Satz):** "Wie hat sich dein Bild vom Krieg veraendert, seit du Mappe 1 (Pulverfass) bis Mappe 4 (Marne) durchgearbeitet hast?"
**Ueberleitung (Bruecke zum Folge-Game):**
> "Der Krieg war jetzt nicht zu Ende — er hatte gerade erst begonnen. Was im Schuetzen-Graben geschah, was die Soldaten erlebten und wie der Krieg nach 1918 endete, das erfaehrst du in einem naechsten Game: Stellungskrieg, Heimatfront und Versailles."
**Verweis auf Hefteintrag:** B.5 Schluessel-Begriffe (5 Begriffe) + B.6 Merksatz (1 Satz).

---

## 8. Perspektiven-Abdeckungsmatrix (SOLL — STR-05 + F0b-M4)

| Perspektive (aus skript_struktur.json/M4 multiperspektivitaet) | mat-4-1 | mat-4-2 | mat-4-3 | mat-4-4 | mat-4-5 | mat-4-6 | Abdeckung |
|---|---|---|---|---|---|---|---|
| P1: Deutsche Generalstab-Fuehrung (Moltke d.J., Schlieffen-Erbe) | X (Plan-Sicht) | X (DT-Daten) | X (DT-Sicht) | | X (DT-Verluste) | X | 5/6 |
| P2: Belgische Bevoelkerung+Regierung (Opfer Neutralitaets-Verletzung) | X (Bogen durch BE) | X (BE-Daten 02./04./07./20.08.) | | | | X (kurzer Verweis) | 3/6 |
| P3: Franzoesische Armee unter Joffre (defensiv-Sieger Marne) | | X (FR-Daten Marne) | | X (FR-Sicht) | X (FR-Verluste) | X (kurzer Verweis) | 4/6 |
| P4: Britische Expeditionsstreitmacht (BEF unter John French) | | X (GB-Daten) | | | X (GB-Verluste) | | 2/6 |
| P5: Soldaten beider Seiten (Erschoepfung, Versorgungs-Probleme) | | X (Marsch-Tempo, 30km/Tag implizit) | X (Inszenierungs-Befund) | X (Pre-Manoever) | X (Verluste-Wucht) | X | 5/6 |

**Multiperspektivitaets-Pflicht (STR-05): min. 3 Perspektiven ueber die Mappe** — **PASS** (5/5 abgedeckt).

**MATERIAL-PERSPEKTIV-01 / QG-09 Inline-Tags:**
| Material | `perspektiv_tags[]` (geplant) | Begruendung |
|---|---|---|
| mat-4-1 | `["dominant"]` | Plan-Sicht der DT-Generalstab-Fuehrung — dominant. |
| mat-4-2 | `["nicht-dominant", "Opfer"]` | Multiperspektivische Daten DT/BE/FR/GB; Belgien-Verletzung als Opfer-Tag. |
| mat-4-3 | `["dominant", "Kritik"]` | DT-Heeres-Selbstdarstellung — aber Quellenkritik-Befund dekonstruiert sie (Kritik-Tag nicht-dominant). |
| mat-4-4 | `["nicht-dominant"]` | FR-Pre-WK-Sicht ergaenzt DT-Sicht. |
| mat-4-5 | `["nicht-dominant", "Macht-Betroffen"]` | Drei-Parteien-Verluste, Soldaten als Betroffene unabhaengig der Nationalitaet. |
| mat-4-6 | `["nicht-dominant"]` | Wendepunkt-Erklaerung neutral, Stellungskrieg-Folge betrifft alle. |

**Nicht-dominante Tags Coverage M4:** 4 Materialien tragen `nicht-dominant` + 3 Spezial-Tags (`Opfer`, `Kritik`, `Macht-Betroffen`). **PASS** (>= 2 nicht-dominante Tags erfuellt).

**Fehlende Perspektiven:** Keine — alle 5 deklarierten Perspektiven > 1x abgedeckt. P4 (BEF) ist mit 2/6 die schwaechste Perspektive — in mat-4-2 und mat-4-5 explizit numerisch (12.733 GB) verankert. Akzeptabel: BEF spielte zahlenmaessig die kleinere Rolle in der Marne-Schlacht (12.733 vs. ~250.000 FR + ~298.000 DT).

---

## 9. Q-Gate Self-Check (Phase-1-Material-Design)

| Kriterium | Status | Evidenz |
|---|---|---|
| SCPL-Abdeckung vollstaendig (alle Zonen Material zugeordnet) | PASS | §1 Tabelle: 5/5 Zonen DIRECT |
| SCPL-Uebergaenge belegt (alle 5 inkl. Klammer S→L) | PASS | §5b Tabelle: 5/5 Uebergaenge mit `kausal_mechanismus` |
| Erarbeitbarkeits-Dokumentation vollstaendig (Aufgabe 1.5: 3 Schritte) | PASS | §1 Voraussetzungs-Check + §5 Mapping + §5c Check |
| Mindest-Materialien-Mix (≥ 4: 1 Text, 1 Quelle/Bild, 1 personifiziert, 1 visuell) | WARN | Personifiziert FEHLT in M4 (begruendet); kompensiert durch Bildquellen-Doppel + Drei-Parteien-Statistik. WARN (nicht FAIL), weil Begruendung in §2 Mindest-Check + Sandwich-Argumentation dokumentiert. |
| Anzahl-Korridor 4-7 | PASS | 6 Materialien |
| Medienvielfalt-Ratio (max. 50% textbasiert) | PASS | 17% (1/6) textbasiert |
| Erarbeitbarkeits-Nachweis fuer jede Zone + jeder Uebergang | PASS | §5a + §5b |
| Vorwissen aus Vor-Mappen gesichert | PASS | §1 Voraussetzungs-Check (M1, M2, M3 alle GESICHERT) |
| Zielklarheit-Pruefung (jedes Material hat 1-Satz-Zweck + SCPL + Artefakt-Ref) | PASS | §3 Tabelle 6/6 |
| Sequenzplan vollstaendig (alle Pflichtfelder + Uebergangsobjekte + Sequenzkontext) | PASS | §6 |
| Perspektiven-Abdeckungsmatrix (STR-05 ≥ 3 Perspektiven) | PASS | 5/5 Perspektiven |
| MATERIAL-PERSPEKTIV-01 / QG-09 (≥ 2 nicht-dominante Tags) | PASS | 4 Materialien mit `nicht-dominant`, plus `Opfer`/`Kritik`/`Macht-Betroffen` |
| TERMINOLOGIE-01 / QG-07 Kolonialterminologie | n/a | Kategorie nicht aktiv in M4 |
| Sensibilitaets-Markierungen Dispatch-Constraints dokumentiert | PASS | §2 Tabelle: mat-4-1 (`mythos_korrektur_noetig`), mat-4-3 + mat-4-4 (`propaganda_kontextualisierung_noetig`), mat-4-5 (`gewalt_altersfilter`) |
| Lizenzkompatibilitaet (kein NC/ND, alle CC-by-(SA) oder PD) | PASS | mat-4-1 CC-BY-SA-3.0, mat-4-3 PD, mat-4-4 PD |
| F-PB-46 Math-Counts | PASS | 6 Materialien geplant; artefakt_inventar + 1 Phase-1-Reserve-Aktivierung (mat-4-6) konsistent |

**Gesamturteil Phase-1-Material-Design M4:** **PASS_MIT_WARN** (1 WARN: Personifizierung entfaellt — begruendet als didaktische AFB-II-Sicherungs-Entlastung; kompensatorische Multiperspektivitaet durch Bildquellen-Doppel + drei-Parteien-Statistik dokumentiert).

---

## 10. Spezial-Hinweise M4 (aus User-Input)

- **Marne-Taxi-Bild VERWORFEN_AUS_STOFFDICHTE in Phase 0.3 (artefakt_inventar):** **NICHT reaktiviert in Phase 1.** Begruendung: Stoffdichte-Korridor-Obergrenze (6 Materialien) bereits durch Stellungskrieg-Darstellungstext (mat-4-6) belegt; KE-Bonus-Sicherung hat Vorrang vor Erinnerungs-Kultur-Erweiterung. Marne-Taxi narrativ in SKRIPT M4 §5 verankert, RESERVE bleibt fuer Lehrkraft-Erweiterung.
- **Schlieffen-Plan-Karte (Wikimedia, img-m4-01) als Zentral-Material:** mat-4-1 als Sequenz-Position 1 (Einstieg). Pflicht-Quellenkritik-BU mit `mythos_korrektur_noetig`-Constraint (Zuber-Forschung — kein "fertiger Plan"; im Schueler-Heft trotzdem als Begriff verwenden, weil etabliert).
- **Multiperspektivitaet (Sieger-Verlierer-Mythos):** Umgesetzt durch (a) mat-4-3 (DT-Heeres-Inszenierung) + mat-4-4 (FR-Manoever-Vergleich) als visuelles Multi-Perspektiv-Doppel, (b) mat-4-5 als drei-Parteien-Statistik (FR/GB/DT) — kein einseitiges Sieger-Narrativ. Die "deutsche Kriegsmuendigkeits-Erwartung" wird im Einstiegs-Text M4 ("Weihnachten sind wir wieder zu Hause") narrativ aufgegriffen.
- **Stellungskrieg-Anker als Folge-Game-Bruecke:** mat-4-6 (Darstellungstext) erfuellt diese Funktion explizit mit Schluss-Bruecke "Stellungskrieg / Heimatfront / Versailles" — Hefteintrag B.6 Merksatz "Aus geplanten sechs Wochen wurden vier Jahre Krieg" wird wortlautnah aufgegriffen.
- **AFB II Sicherung — entlastend nach M3-Hoehepunkt:** Kein personifiziertes Material (anders als M3 mit Tagebuch-Slot rolle-M3-1) — bewusste didaktische Entlastung. Stattdessen strukturell-strategische Sicherung mit visueller Dominanz (5/6 Materialien nicht-textbasiert).

---

## 11. Validierungsstatus

**ENTWURF** — User-Validierung ausstehend (Phase 1.5 Gate, PFLICHT). Erst nach Freigabe wird Phase 2.0b (Hefteintrag-zu-rahmen-JSON-Konversion) und Phase 2.1 (Subagenten-Produktion mat-4-1 ... mat-4-6) gestartet.
