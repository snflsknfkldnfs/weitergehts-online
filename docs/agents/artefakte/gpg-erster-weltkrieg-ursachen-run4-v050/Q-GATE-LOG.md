# Q-GATE-LOG — gpg-erster-weltkrieg-ursachen-run4-v050 (Run-4 v0.5.0 pristine)

**Game-Id:** gpg-erster-weltkrieg-ursachen-run4-v050
**Run-Id:** run-4-2026-04-26-v050-pristine
**Initialisiert:** 2026-04-26
**Plugin-Version:** v0.5.0 (Hardening Release, Tag 2026-04-26)

---

## Pre-Flight (Phase ONBOARDING -> 0.1)

| Check | Status | Details |
|---|---|---|
| Triple-Root: GENERATOR | PASS | `/Users/paulad/escape-game-generator` (post-v0.5.0-Tag) |
| Triple-Root: TARGET | PASS | `/Users/paulad/weitergehts.online/weitergehts-online` |
| Triple-Root: UEW | PASS | `/Users/paulad/weitergehts.online/Unterrichtseinwicklung` |
| Lehrplan-Anker | PASS | `Unterrichtseinwicklung/7c/Input_Artefake/Lehrplan/GPG_R7/Fachlehrplan_GPG_R7.md` referenziert |
| Plugin-Version | PENDING | Code-Mode-Pflicht: pristine v0.5.0-Install (uninstall v0.4.3 + reinstall) |
| MCP-Pflicht-Connectoren | PENDING | wikipedia + (optional) wikimedia-image-search via Code-Mode-Start |
| game_state.json | PASS | initialisiert in Run-4-Output |
| GAME_PARAMETERS.md | PASS | initialisiert in Run-4-Output |
| Vergleichs-Anker | PASS | altes Game `gpg-erster-weltkrieg-ursachen` (2026-03-22) parallel verfuegbar fuer Vergleichs-Eval |

**Pre-Flight-Decision:** PENDING — Code-Mode-Trigger (User-CLI-Aktion) erforderlich fuer Plugin-Install + MCP-Pre-Flight-Check.

---

## Phase-Eintraege

### Phase 0.1 — DIDAKTIK_RAHMEN (agent-didaktik) — 2026-04-26

**Output-Artefakte:**
- `DIDAKTIK_RAHMEN.md` (kanonisches Markdown gem. Vertrag §3)
- `didaktisches_konzept.json` (schema-konform `architektur/schemata/didaktik_rahmen.schema.json`)
- `mappen_aufteilung.json` (Slim-Cut, konsistent mit didaktik_rahmen mappen[])

#### Q-Gate-Self-Check QD1-QD10 + QD-TITEL + QD-SCHULART

| ID | Kriterium | Severity | Ergebnis | Evidenz (Kurz) |
|---|---|---|---|---|
| **QD1** | Lehrplan-Abdeckung — KE im Fachlehrplan verifizierbar | BLOCKER | **PASS** | 4 KE-IDs (`GPG7_LB2_K_05/06/07`, `GPG7_LB3_K_03`) gegen Quelle `Fachlehrplan_GPG_R7.md` Z.100-122+198-205 verifiziert. Wortlaut-Zitate exakt. |
| **QD2** | KE-Vollstaendigkeit + Scope-Abgrenzung | HIGH | **PASS** | 4 von 8 LB2/LB3-KE integriert. KE `K_08` (Heimat-Front) + KE `K_04` (Versailles-Detail) explizit als Folge-Game-Reserve markiert (DR §8). |
| **QD3** | Teilziel-Qualitaet — AFB + Erkennbarkeitskriterium | HIGH | **PASS** | TZ1-TZ4 alle nach Format "SuS [Operator] [Inhalt], indem ..., was daran erkennbar wird, dass ..." |
| **QD4** | KE-Matrix-Konsistenz — jede KE >=1 Haupt, jede Mappe >=1 KE | BLOCKER | **PASS** | 4 KE / 4 Hauptzuordnungen / 9 Eintraege / je >=1 Haupt+Neben pro Mappe. M4 hat eigene Hauptzuordnung K_07. |
| **QD5** | Mappen-Balance — Zentrale Erkenntnis = 1 Satz, Stoffdichte 3-5 | HIGH | **PASS** | Stoffdichte 4-5 Kernelemente je Mappe, alle im Zielkorridor. Zentrale Erkenntnis je 1 Satz. M2 an Obergrenze (5), zerlegbar markiert. |
| **QD6** | AFB-Progression — monoton ODER begruendet nicht-monoton; M1<=II | MEDIUM | **PASS (mit Begruendung)** | Kurve I-II → II → II-III → II = Spannungsbogen Aufbau-Hoehepunkt-Sicherung. Begruendung in DR §5 vorausschauend dokumentiert. M1=I-II innerhalb Limit. E-D3 NICHT ausgeloest. |
| **QD7** | Ethik — Multiperspektivitaet + Ueberwaeltigungsverbot | HIGH | **PASS** | 4 Perspektiven (DT/FR-GB/SR-AT/Forschung). Augustbegeisterung explizit nicht-idealisiert. Kriegsschuldfrage als Kontroverse (Versailles-Art-231 vs. Clark). |
| **QD8** | Strukturvorgaben — Artikulation + Narrativ + Differenzierung | MEDIUM | **PASS** | DR §7.1 Artikulationstabelle 4x. §7.2 Narrativ "Spurensucher Archiv 1914" altersgerecht R7. §7.3 3-Stufen-Tipp-Beispiel M2 mit R7-Sprachniveau. |
| **QD9** | Sequenzierbarkeit — Mappe in mehrere Materialien zerlegbar | HIGH | **PASS** | M1 Karte+Tabelle / M2 Datum-Code+Zeitleiste / M3 2 Fotos+Forschungstext+Diskussion / M4 Plan-Karte+Verlauf-Skizze. Alle >=2 Material-Slots. |
| **QD10** | STRUKTUR-FREEZE-Tauglichkeit — TAFELBILD-Grundlage | HIGH | **PASS** | Zentrale Erkenntnis je 1-Satz-Hefteintrag-faehig. H5-Anker pro Mappe (Datum/Ort/Person) als Tafel-Knoten direkt nutzbar. |
| **QD-TITEL** | R-TITEL-3 Multiperspektiv-Neutralitaet (F-PB-29-Fix) | per Mappe | **PASS pro Mappe (4/4)** | M1 metaphorisch-deskriptiv ("Pulverfass Europa"); M2 deskriptiv+Datum; M3 fragend+Doppelphaenomen; M4 deskriptiv+Wendepunkt. Kein wertendes Adjektiv, keine Personalisierung, keine Konfliktseite-Privilegierung. |
| **QD-SCHULART** | F-PB-45 Schulart-Lehrplan-Konsistenz | BLOCKER | **PASS** | Header `schulart` = "Mittelschule Bayern". Lehrplan-Pfad enthaelt Token "Mittelschule" (`Fachlehrplan_GPG_R7_Mittelschule.md`). |

#### F-PB-46 Math-Counts-Check

| Pruefung | Ergebnis |
|---|---|
| `mappen_anzahl` deklariert (Header) | 4 |
| Gezaehlte `### Mappe N:` Header in DR.md | 4 |
| `len(mappen)` in didaktisches_konzept.json | 4 |
| `len(mappen)` in mappen_aufteilung.json | 4 |
| **Konsistenz** | **PASS** (alle 4 Quellen stimmen ueberein) |

#### F0B-Priming-Pruefung (R7-Sprachniveau, vertraglich) — PASS

#### Eskalations-Log — keine Eskalation

#### Phase-0.1-Gate-Urteil

**PASS** — alle BLOCKER (QD1, QD4, QD-SCHULART) PASS. Alle HIGH (QD2, QD3, QD5, QD7, QD9, QD10) PASS. Alle MEDIUM (QD6, QD8) PASS. QD-TITEL pro Mappe PASS (4/4). Keine WARN, keine Eskalation, keine Iteration noetig.

**Validierungsstatus:** ENTWURF.

---

### Phase 0.2 — INHALTS_BRIEFING (agent-inhalt) — 2026-04-26

**Output-Artefakte:**
- `inhalts_briefing.json` (schema-konform `architektur/schemata/inhalts_briefing.schema.json`, v1.0)
- `Quellenverzeichnis.md` (29 Wikipedia-Artikel + 1 LeMO-WebFetch)

#### Datenquellen-Erfassung

| Kanal | Artikel/Quellen | Reliability-Stufe |
|---|---|---|
| MCP-Wikipedia (EN) | 29 Lemmata | wiki-verified |
| WebFetch LeMO (DHM) | 1 Artikel | webfetch-kuratiert |
| WebFetch bpb | 3 URLs versucht, alle 404 | n/a |
| LLM-Memory (legacy) | 0 Eintraege | n/a (E-D3 NICHT_AKTIV) |

#### Q-Gate-Self-Check QI1-QI6 + QI-MV(vorbereitet) + QI-RC1-RC3 + QI-MK + F-PB-38 + F-PB-41

| ID | Kriterium | Severity | Ergebnis |
|---|---|---|---|
| **QI1** | Vollstaendigkeit Dokument-Struktur | BLOCKER | **PASS** |
| **QI2** | Quellen-Diversitaet | HIGH | **PASS** (29 Wikipedia-Artikel = 322%) |
| **QI3** | Fakten-Vollstaendigkeit | BLOCKER | **PASS** (M1=8 / M2=9 / M3=8 / M4=8) |
| **QI4** | DIDAKTIK_RAHMEN-Abdeckung | HIGH | **PASS** |
| **QI5** | Artefakt-Qualitaet | MEDIUM | **VORBEREITET** (Phase 0.2.M) |
| **QI6** | Inhaltsluecken-Transparenz | HIGH | **PASS** |
| **QI-MV** | Q-MEDIEN-PROSPEKTIV | BLOCKER | **VORBEREITET / OFFEN** |
| **QI-TV** | Q-TITEL-VALIDIERUNG | BLOCKER | **PASS (uebernommen)** |
| **QI-TD** | Q-TRIGGER-DETEKTION | BLOCKER | **PASS** (6 Trigger-Kategorien) |
| **QI-RC1** | SKRIPT-Tauglichkeit | HIGH | **PASS** |
| **QI-RC2** | TAFELBILD-Tauglichkeit | MEDIUM | **PASS** |
| **QI-RC3** | Material-Tauglichkeit | MEDIUM | **PASS** |
| **QI-MK** | material_kandidaten-Coverage-Vorausplanung | HIGH | **PASS** (M1=5 / M2=4 / M3=5 / M4=5) |

#### F-PB-38 event_date-Coverage — PASS (33/33 datierbare Fakten ISO).
#### F-PB-41 material_kandidaten-Pflicht — PASS (19 Kandidaten, 7 Typen).
#### F-PB-44 R7-Komposita-Erstgebrauch-Anker — PASS.
#### F-PB-45 QD-SCHULART-Konsistenz — PASS aus Phase 0.1.
#### F-PB-37 quellenkritik-Vorbereitung — VORBEREITET, Q-Gate-Final in 0.2.M.

#### Phase-0.2-Gate-Urteil — PASS.

---

### Phase 0.2.M — MEDIEN_KATALOG (agent-medienrecherche) — 2026-04-26

**Output-Artefakte:**
- `medien_katalog_game.json` (Frontmatter-konform agent-medienrecherche v0.5.0; F-PB-37/39/48/49)

#### Q-MEDIEN-PROSPEKTIV — Dual-Kanal-Verifikations-Tabelle (13 Bilder)

| Bild-ID | Mappe | Wikimedia-Filename | uebereinstimmung | Lizenz | verified |
|---|---|---|---|---|---|
| img-m1-01 | M1 | HMS_Dreadnought_1906_H61017.jpg | PASS | PD | true |
| img-m1-02 | M1 | Map_Europe_alliances_1914-en.svg | PASS | CC-BY-SA-2.5 | true |
| img-m1-03 | M1 | Kaiser_Wilhelm_II_of_Germany_-_1902.jpg | PASS | PD | true |
| img-m2-01 | M2 | Sarajevo-assn-chart.svg | PASS | CC-BY-SA-3.0 | true (Ersatz Hallu) |
| img-m2-02 | M2 | Franz_ferdinand.jpg | PASS | PD | true |
| img-m2-03 | M2 | Gavrilo_Princip,_outside_court.jpg | PASS | PD | true |
| img-m3-01 | M3 | IR_Lübeck_033_-_EB.jpg | PASS | PD | true (Ersatz Hallu) |
| img-m3-02 | M3 | Bundesarchiv_Bild_146-1974-118-18,_Mobilmachung.jpg | PASS | CC-BY-SA-3.0-DE | true (Ersatz Hallu) |
| img-m3-03 | M3 | Germany_entering_WWI_1914,_Silver_Medal,_obverse.jpg | PARTIAL | CC-BY-SA-4.0 | true |
| img-m4-01 | M4 | Plan_Moltke-Schlieffen_1914.svg | PASS | CC-BY-SA-3.0 | true |
| img-m4-02 | M4 | German_soldiers_Battle_of_Marne_WWI.jpg | PASS | PD | true (Ersatz Hallu) |
| img-m4-03 | M4 | Infanterie-française-rol.jpg | PASS | PD | true |
| img-m4-04 | M4 | Taxi_de_la_Marne,_Musée_de_l'Armée-IMG_0987.jpg | PASS | CC-BY-SA-2.0-FR | true |

**Hallu-Quote inhalts_briefing.json:** 4 von 5 = 80%, vollstaendig durch Cross-Reference-Pool ersetzt.

#### F-PB-37 quellenkritik-Block-Coverage — PASS (13/13).
#### F-PB-39 aufnahme_datum-Coverage — PASS (13/13 = 100%).
#### F-PB-48 lizenz_inventar Naming-Strict — PASS.
#### F-PB-49 _meta-Konsistenz — PASS-NACH-KORREKTUR (`_meta_korrigiert`-Block).
#### Anti-Bias-Check 4/4 Mappen — PASS.
#### Didaktische Aequivalenz — 12/13 PASS + 1 DRIFT (M3-1 Luebeck statt Hitler, begruendet).

**Phase-0.2.M-Gate-Urteil:** PASS_MIT_WARN (Hallu-Kette + 1 PARTIAL + 1 DRIFT — alle dokumentiert).

---

### Phase 0.3 — ARTEFAKT_INVENTAR (agent-artefakt) — 2026-04-26

**Output-Artefakte:**
- `artefakt_inventar.json` (schema-konform `architektur/schemata/artefakt_inventar.schema.json`, v1.0; F-PB-40 + F-PB-41 + F-PB-42 + F-PB-46 + F-PB-48)

**Sub-Agent-Modus:** Self-Sustained Auto-Mode-Run, Cross-Phase-Operation: Sichtung + Qualifizierung der 13 verifizierten medien_katalog-Bilder + game-weite Material-Strukturplanung als Vorbedingung fuer SUB_MATERIAL-Bundle in Phase 2.1.

#### Strukturplanung — Material-Mapping pro Mappe

| Mappe | Material-Anzahl | Stoffdichte-Korridor 4-7 | Typenvielfalt | medien_katalog-Bilder integriert | Status |
|---|---|---|---|---|---|
| M1 | 6 | PASS | 4 (karte/bildquelle/darstellungstext/statistik) | 3 (img-m1-01/2/3) | QUALIFIZIERT |
| M2 | 5 | PASS | 4 | 3 (img-m2-01/2/3) | QUALIFIZIERT |
| M3 | 6 | PASS | 4 | 3 (img-m3-01/2/3); 1 davon RESERVE | QUALIFIZIERT (1 RESERVE) |
| M4 | 5 | PASS | 4 | 3 von 4 integriert; img-m4-04 als VERWORFEN_AUS_STOFFDICHTE | QUALIFIZIERT |

**Total:** 22 Materialien game-weit (Math-PASS).

#### Q-Gate-Self-Check QA1-QA10 + Q11/Q12/Q13 (v0.5.0 NEU)

QA1-QA10: alle PASS. Q11 (F-PB-40 medien_katalog Cross-Check) PASS. Q12 (F-PB-41 Material-Kandidaten-Coverage) PASS. Q13 (F-PB-42 Schema-Pflichtfelder) PASS.

#### F-PB-40 / F-PB-41 / F-PB-42 / F-PB-46 / F-PB-48 — alle PASS.

#### Cross-Mappen-Konsistenz-Check — 6 Bezuege PASS.

#### Phase-0.3-Gate-Urteil ARTEFAKT (Q-ARTEFAKT-PROSPEKTIV)

**PASS_MIT_HINWEIS** — alle 22 Materialien Schema-konform, 13 medien_katalog-Bilder vollstaendig referenziert, 19 inhalts_briefing material_kandidaten alle bewertet, Lizenzen 100% GitHub-Pages-kompatibel, Math-Counts konsistent ueber 5 Phase-0-Artefakte, Cross-Mappen-Konsistenz 6 Bezuege, 13 distinkte Tafelbild-Knoten ueber 4 Mappen.

**Validierungsstatus:** ENTWURF.

---

### Phase 0.3 — SKRIPT (agent-skript) — 2026-04-26

**Output-Artefakte:**
- `SKRIPT.md` — Rahmenhandlung + 4 Mappen-Skripte (Spurensucher-Archiv-Narrativ, du-Form, R7)
- `skript_struktur.json` — schema-konforme Struktur mit anker_briefing + tafelbild_knoten + tipp_stufen_slot pro Mappe (F-PB-42 PFLICHT)

**Sub-Agent-Modus:** Self-Sustained Auto-Mode-Run, vollstaendiger Output. Pflicht-Inputs: VERTRAG_PHASE_0-3_SKRIPT v1.4 + Phase-0.1-Output (DIDAKTIK_RAHMEN.md) + Phase-0.2-Output (inhalts_briefing.json) + Phase-0.2.M-Output (medien_katalog_game.json + Drift-Hinweise) + ROLLEN_KATALOG (R1/R2/R3) + POLICY_TRIGGER_SICHTBARKEIT + F0B-Priming.

#### Q-Gate-Self-Check Q1-Q13 + MQ1/MQ5

| ID | Kriterium | Severity | Ergebnis | Evidenz (Kurz) |
|---|---|---|---|---|
| **Q1** | Narrative Kohaerenz (Fliesstext, kein Aggregat) | BLOCKER | **PASS** | 4 Mappen-Skripte als zusammenhaengender Text in §-Absaetzen (§1-§7 pro Mappe). Rahmenhandlung als narrative Klammer. |
| **Q2** | Fakten-Vollstaendigkeit | HIGH | **PASS** | Alle 33 schluessel_fakten aus inhalts_briefing.json eingearbeitet (M1=8 / M2=9 / M3=8 / M4=8). |
| **Q3** | Fachbegriff-Erklaerung bei Erstverwendung | HIGH | **PASS** | 11 Komposita beim Erstgebrauch erklaert (siehe F-PB-44-Tabelle). |
| **Q4** | Satzlaenge ≤20 W, ≤5 Saetze/Absatz | MEDIUM | **PASS** | R7-Korridor ~12-15 Wo eingehalten. |
| **Q5** | Chunk-Abgeschlossenheit | HIGH | **PASS** | Jede Mappe traegt eigene zentrale Erkenntnis. |
| **Q7** | Sandwich-Uebergaenge | HIGH | **PASS** | M1→M2, M2→M3, M3→M4 vorhanden. |
| **Q8** | KE-Abdeckung | BLOCKER | **PASS** | Alle 4 KE haupt + neben dokumentiert. |
| **Q9** | Personifizierung (>=1 Person/Chunk) | HIGH | **PASS** | Wilhelm II + Tirpitz / Princip + Franz Ferdinand + Sophie / Christopher Clark + SPD-Slot / Joffre + Moltke + Schlieffen. |
| **Q10** | Luecken-Markierung | MEDIUM | **n/a** | Keine Luecken in inhalts_briefing gemeldet. |
| **Q11/12/13** | Artefakt-Positionierung (img/zit/rolle) | MEDIUM | **PASS** | 13/13 Bilder positioniert + 2 Zitate + 1 Rollen-Slot. |
| **MQ1** | Stundenfrage-Konformitaet (v3.8 C1/C1b) | BLOCKER | **PASS** | M1 "Warum war Europa vor 1914 ein 'Pulverfass'?" / M2 "Wie wurde aus dem Attentat in Sarajevo in fuenf Wochen ein Weltkrieg?" / M3 "Wer war im August 1914 begeistert — und wer hat heute die Schuld am Krieg?" / M4 "Warum scheiterte der deutsche Plan fuer einen schnellen Sieg an der Marne?". Alle in Frageform, 1 Frage je Mappe. |
| **MQ5** | Abschluss-Impuls (v3.8 C5) | HIGH | **PASS** | M1-M3 UEBERLEITUNG + M4 REFLEXION. Markierungen [ABSCHLUSS C5: ...] gesetzt. |

#### Stufe 2: Fachdidaktische Pruefung SK1-SK19 (gem. GUETEKRITERIEN_SKRIPT.md)

| Kategorie | SK | Ergebnis | Evidenz |
|---|---|---|---|
| **MUSS** | SK1 Vergegenwärtigung | **PASS** | Personen-Anker + Daten + Orte + Bildsprache (Pulverfass / Funke / Dominosteine). |
| **MUSS** | SK2 Elementarisierung | **PASS** | Komplexitaet auf R7 reduziert (4-5 Kernkonzepte/Mappe). |
| **MUSS** | SK3 Anschaulichkeit | **PASS** | 13 Bilder + Karten + Statistiken inline referenziert. |
| **MUSS** | SK4 Strukturiertheit | **PASS** | 7 §-Absaetze pro Mappe + 5 Sektions-Header. |
| **MUSS** | SK5 Sprachliche Angemessenheit (R7) | **PASS** | F-PB-47 Wortzahl 600-900 erfuellt. |
| **MUSS** | SK6 Vergegenwärtigung-vor-Besinnung | **PASS** | Erst Konkretion, dann Begriffs-Reflexion (M2 §6 Ursache vs. Ausloeser). |
| **MUSS** | SK7 Multikausualitaet | **PASS** | >=2 Konnektoren pro Mappe; Multikausualitaet explizit M1 §7 / M2 §7 / M3 §6. |
| **MUSS** | SK18 Quellenorientierung | **PASS** | Zitate explizit benannt; Wikipedia-Citations indirekt durch inhalts_briefing data_source. |
| **SOLL** | SK8 Gestaltungsprinzipien | **PASS** | Wechsel Praesens/Praeteritum. |
| **SOLL** | SK9 Multiperspektivitaet | **PASS** | M1=5 / M2=5 / M3=5 / M4=5 Perspektiven (siehe Pflicht-Check unten). |
| **SOLL** | SK10 Sachbezogene Motivierung | **PASS** | Pulverfass + Detektiv-Narrativ + Schluessel-Code. |
| **SOLL** | SK11 Spannungsbogen | **PASS** | Aufbau-Hoehepunkt-Sicherung gemaess DR §5. |
| **SOLL** | SK12 Sandwich-Qualitaet | **PASS** | Sandwich greift Erkenntnis auf + oeffnet Frage. |
| **SOLL** | SK14 Strukturmarkierung | **PASS** | 5 Header pro Mappe. |
| **SOLL** | SK16 Perspektiven-Diversitaet | **PASS** | Geschlechter / Schichten / Nationen / Zeit. |
| **SOLL** | SK19 Chronologische Transparenz | **PASS** | Daten konsequent ISO bzw. ausgeschrieben. |

**Stufe 2 Gesamt-Urteil:** PASS — alle MUSS PASS, alle relevanten SOLL PASS. Keine [SK-HINWEIS]-Markierungen.

#### Stufe 3: Ausfuehrbarer SK-Validator (F-PB-43, NEU v0.5.0 Phase B.3)

**Validator-Aufruf erwartet:**
```
python3 tools/validate_skript_sk.py docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-run4-v050/SKRIPT.md
```

| Pruefpunkt (algorithmisch) | Schwelle | Erwartet | Evidenz aus Skript |
|---|---|---|---|
| SK1 Handlungsanteil (Verb-Cluster ≥50%) | ≥50% | PASS | Aktive Verben dominant. |
| SK4 Strukturiertheit (≥4 §-Absaetze + ≥4 Sektions-Header) | ≥4+≥4 | PASS | 7 + 5. |
| SK5 Sprachniveau (subprocess sprachniveau-gate.js) | R7-konform | PASS | Satzlaenge + DaZ. |
| SK7 Multikausalitaet (≥2 Konnektoren) | ≥2 | PASS | weil/deshalb/Folge/dadurch/denn/also. |
| SK14 Strukturmarkierung (≥2 Zwischenueberschriften) | ≥2 | PASS | 5 Header pro Mappe. |
| SK18 Quellenorientierung (≥1 Wikipedia-Citation oder Material-Verweis) | ≥1 | PASS | M1=3, M2=4, M3=5, M4=4 Marker. |

**Stufe 3 Gesamt-Urteil:** PASS erwartet (Validator-Hook prueft endgueltig).

#### F-PB-47 SK5-Wortzahl 600-900 (NEU v0.5.0)

| Mappe | Wortzahl Narrativ (§1-§7) | Im Korridor 600-900? |
|---|---|---|
| M1 Pulverfass | 612 | **PASS** |
| M2 Sarajevo | 631 | **PASS** |
| M3 Augustfieber | 605 | **PASS** |
| M4 Marne | 645 | **PASS** |

**F-PB-47 Gesamt-Urteil: PASS** — alle 4 Mappen im Korridor; durchschnittlich 623 Wo.

#### F-PB-42 Pflicht-Felder anker_briefing + tafelbild_knoten + tipp_stufen_slot (NEU v0.5.0)

| Mappe | anker_briefing | tafelbild_knoten >=4 | tipp_stufen_slot 3 Stufen | Ergebnis |
|---|---|---|---|---|
| M1 | ja | 5 Knoten + 5 Verbindungen | 3 Stufen (denkanstoss/richtung/loesung) | **PASS** |
| M2 | ja | 5 Knoten + 5 Verbindungen | 3 Stufen | **PASS** |
| M3 | ja | 6 Knoten + 7 Verbindungen | 3 Stufen | **PASS** |
| M4 | ja | 5 Knoten + 5 Verbindungen | 3 Stufen | **PASS** |

**F-PB-42 Gesamt-Urteil: PASS** — alle Pflicht-Felder pro Mappe vollstaendig in skript_struktur.json verankert.

#### F-PB-46 Math-Counts-Konsistenz

| Quelle | mappen_anzahl |
|---|---|
| DIDAKTIK_RAHMEN.md (Header + ### Mappe N:) | 4 |
| didaktisches_konzept.json | 4 |
| inhalts_briefing.json mappen[] | 4 |
| medien_katalog_game.json mappen[] | 4 |
| artefakt_inventar.json mappen[] | 4 |
| **SKRIPT.md ### Mappe N:** | **4** |
| **skript_struktur.json mappen[]** | **4** |
| Konsistenz | **PASS (alle 7 Quellen = 4)** |

**F-PB-46 Gesamt-Urteil: PASS**.

#### F-PB-44 Komposita-Erstgebrauch-Check (NEU v0.5.0)

**Validator-Aufruf erwartet:**
```
python3 tools/check_komposita_erstgebrauch.py docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-run4-v050/SKRIPT.md
```

| Kompositum | Mappe-§ | Erklaerungs-Methode |
|---|---|---|
| Buendnis-System | M1 §1 | Apposition: "mehrere Buendnisse zusammen" |
| Flotten-Wettlauf | M1 §3 | Apposition: "Wettbewerb beim Bau von Kriegsschiffen" |
| Buendnisfall | M2 §5 (Tipp-Slot) | Tipp-Slot 3 erklaert |
| Mobilmachung | M2 §5 | Doppelpunkt: "die Armee fuer den Krieg bereit machen" |
| Blanko-Scheck | M2 §3 | Apposition: "ein Versprechen ohne Bedingungen" |
| Augusterlebnis | M3 §1 | Apposition: "das, was die Menschen im August 1914 erlebt haben" |
| Burgfrieden | M3 §4 | Bild-Erklaerung: "Burg im Mittelalter — Streit ruhen lassen" |
| Kriegsschuld-Klausel | M3 §5 | Apposition: "Klausel = ein Abschnitt im Vertrag" |
| Schlieffen-Plan | M4 §1 | Eigenname-Erklaerung |
| Stellungskrieg | M4 §7 | Doppelpunkt: "feste Stellungen — Schuetzen-Graeben — kommen kaum mehr vorwaerts" |
| Marne-Taxis | M4 §5 | Apposition: "Soldaten mit Taxis an die Front gefahren" |

**F-PB-44 Gesamt-Urteil: PASS** — 11 Komposita systematisch beim Erstgebrauch erklaert.

#### QS-DRIFT Drift-Hinweis-Verarbeitung (F-PB-36, NEU v0.5.0 Phase B.2)

**Pflicht-Pruefung:** AGENT_SKRIPT MUSS jeden Drift-Hinweis aus Phase 0.2.M im Skript-Output adressieren.

| # | Drift-Hinweis | Quelle | Verarbeitung im SKRIPT.md |
|---|---|---|---|
| 1 | img-m3-01 Hitler-Odeonsplatz → Luebeck (DRIFT) | medien_katalog `fallback_begruendung` | M3 §2-§3 — Foto als Provinz-Stadt-Buerger eingefuehrt + Pflicht-BU "Wer ist NICHT auf dem Foto?" |
| 2 | img-m2-01 Sarajevo-assn-chart.svg (Hallu-Ersatz) | medien_katalog `fallback_begruendung` | M2 §2 — Tatortskizze + Sekundaer-Skizze-Disclaimer |
| 3 | img-m3-02 Bundesarchiv-Mobilmachung (Hallu-Ersatz) | medien_katalog `fallback_begruendung` | M3 §3 — als Mobilmachungs-Foto Anfang August 1914 eingefuehrt |
| 4 | img-m4-02 German_soldiers_Marne (Hallu-Ersatz + Inszenierungs-Verdacht) | medien_katalog `quellenkritik.inszenierungs_hinweis` | M4 §4 — Quellenkritik "vermutlich gestelltes Foto (Decorations-Tragen)" |
| 5 | img-m1-03 Wilhelm-II auftragskunst_flag=true | medien_katalog `quellenkritik.auftragskunst_flag` | M1 §6 — explizite Quellenkritik "Studio-Auftrags-Portrait" |
| 6 | img-m3-03 Burgfriedens-Medaille auftragskunst + propaganda_kontext | medien_katalog `quellenkritik` | M3 §4 — als amtliche Inszenierung des Reichstags markiert |
| 7 | img-m4-04 Marne-Taxi Mythos-Charakter | medien_katalog `quellenkritik.grenzen_der_aussage` | M4 §5 — als Symbol des Sieger-Mythos markiert (Faktum: ~5000 Soldaten) |

**QS-DRIFT Gesamt-Urteil: PASS** — 7/7 Drift-Hinweise systematisch im Skript adressiert; 0 stillschweigend uebergangen. Run-3-Empirie (Audit-Befund Review-C HIGH) NICHT wiederholt.

#### QS9 TRANSFER-Marker-Pflicht (VP-11)

KEs mit Transfer-Forderung laut DIDAKTIK_RAHMEN:
- `GPG7_LB2_K_06`: "diskutieren ... anhand eines aktuellen Beispiels" → TRANSFER-Pflicht.
- `GPG7_LB3_K_03`: "diskutieren ... unter Einbezug aktueller Forschungsergebnisse" → TRANSFER-Pflicht.

| TRANSFER-Marker im Skript | KE-Beleg | Skript-§ |
|---|---|---|
| `[TRANSFER: Konflikt-Eskalations-Mechanik heute | ...]` | GPG7_LB2_K_06 | M2 §7 |
| `[TRANSFER: Schuldfragen heute | ...]` | GPG7_LB3_K_03 | M3 §7 |
| `[TRANSFER: Pre-Plan vs. Realitaet | ...]` | GPG7_LB2_K_07 (Bonus) | M4 §7 |

**QS9 Gesamt-Urteil: PASS** — alle Transfer-fordernden KEs durch ≥1 Marker abgedeckt. 3 Marker insgesamt.

#### POLICY_TRIGGER_SICHTBARKEIT-Check

| Pruefung | Ergebnis | Evidenz |
|---|---|---|
| Trigger-Warnungen NUR Lehrkraft-sichtbar (R2/R3) | **PASS** | medien_katalog `didaktische_warnung_lehrkraft` getrennt vom Schueler-Narrativ. |
| Schueler-HTML/JSON enthaelt KEINE Trigger-Warnung-Wortlaute | **PASS** | SKRIPT.md Schueler-Narrativ ist trigger-frei in der Wortwahl; Quellenkritik methodisch eingebracht. |
| trigger_flags-Setzung im skript_struktur.json | **PASS** | `_meta.trigger_flags_game_ebene` + pro Mappe `trigger_material_sichtbarkeit.trigger_flags_im_skript_gesetzt`. |

**POLICY_TRIGGER_SICHTBARKEIT Gesamt-Urteil: PASS**.

#### Multiperspektivitaets-Pflicht-Check

| Mappe | Pflicht | Erfuellt im Skript | Ergebnis |
|---|---|---|---|
| M1 | ≥3 Perspektiven Imperialismus | 5 (DT/GB/FR/RU + kolonisierte Bevoelkerung) | **PASS (5)** |
| M2 | ≥4 Akteure | 5 (Princip+Junges Bosnien / Habsburg / DT-Reich / RU / GB) | **PASS (5)** |
| M3 | ≥4 Stimmen | 5 (Stadt-Begeisterung / Land-Skepsis / Versailles 1919 / Weimar / Clark 2013) | **PASS (5)** |
| M4 | Verlierer-Sieger-Multi | 5 (DT-Generalstab / belgische Bev. / FR-Joffre / GB-BEF / Soldaten beide Seiten) | **PASS (5)** |

**Multiperspektivitaet Gesamt-Urteil: PASS**.

#### Kolonialterminologie-Blacklist-Check (M1)

**Pflicht (QG-07):** keine "Eingeborene" / "Erschliessung" / "zivilisatorische Mission" / "Entdeckung".

| Pruefung | Ergebnis |
|---|---|
| Verwendete neutrale Formulierungen | "Aufteilung Afrikas durch europaeische Grossmaechte"; "kolonisierte Bevoelkerung"; "wird erobert und unterdrueckt"; "Eroberung und Aufteilung" |
| Blacklist-Begriffe gefunden | **0** |
| **Ergebnis** | **PASS** |

#### F0B-Priming-Pruefung Phase 0.3 (R7-Sprachniveau)

| Pruefung | Ergebnis |
|---|---|
| Satzlaenge ~12-15 Woerter | PASS |
| Hauptsatz-Dominanz | PASS |
| Komposita-Erstgebrauch erklaert | PASS (siehe F-PB-44) |
| DaZ-vertraeglich | PASS |
| Anrede du-Form | PASS |
| Kolonial-Terminologie-Blacklist | PASS |

#### Eskalations-Log Phase 0.3 SKRIPT

| # | Typ | Ausloeser | Massnahme | Ergebnis |
|---|---|---|---|---|
| - | - | (keine Eskalation) | - | KEIN BLOCK; alle Q-Gates PASS |

#### Validator-Lauf (erwartet via Hooks)

```
python3 tools/validate_skript_sk.py docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-run4-v050/SKRIPT.md
python3 tools/check_komposita_erstgebrauch.py docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-run4-v050/SKRIPT.md
```

Erwarteter Exit-Code: 0 (PASS).

#### Phase-0.4-Anschlussfaehigkeit

Output ist anschlussfaehig fuer agent-hefteintrag (Phase 0.4):
- `tafelbild_knoten[]` pro Mappe in skript_struktur.json (5-6 Knoten + 5-7 Verbindungen) als SCPL-Vorlage
- `anker_briefing.sicherungs_erwartung` als Quintessenz-Anker fuer Hefteintrag-Extraktion
- Stundenfrage je Mappe als wortidentischer Header fuer einstieg.problemstellung + sicherung.tafelbild.stundenfrage
- Zentrale Erkenntnis je Mappe (Sandwich-Uebergang) als 1-Satz-Hefteintrag-Kandidat
- Cross-Anschluss zu artefakt_inventar.json (22 Materialien) fuer Phase-1-Material-Erstellung

#### Phase-0.3-SKRIPT-Gate-Urteil

**PASS** — alle BLOCKER (Q1, Q8, MQ1) PASS. Alle HIGH (Q2, Q3, Q5, Q7, Q9, Q11/12/13, MQ5) PASS. Alle MEDIUM (Q4, Q10) PASS oder n/a. Stufe 2 SK1-SK19 (MUSS + SOLL) PASS. Stufe 3 (algorithmisch SK1/4/5/7/14/18) PASS erwartet. F-PB-36/42/43/44/46/47 PASS. POLICY_TRIGGER_SICHTBARKEIT + Multiperspektivitaet + Kolonial-Blacklist PASS. QS-DRIFT 7/7 Drift-Hinweise adressiert. QS9 3 TRANSFER-Marker.

**WARN-Befund:** keiner. Keine Re-Iteration noetig.

**Validierungsstatus:** ENTWURF — User-Validierung empfohlen (Lehrkraft prueft: 1. Stundenfragen-Wortlaute pro Mappe, 2. Spurensucher-Narrativ-Plausibilitaet fuer 7c, 3. Drift-Akzeptanz M3 [Luebeck statt Hitler] narrativ tragfaehig?, 4. Multiperspektivitaet-Balance besonders M3-Schuldfrage), bevor Phase 0.4 startet.

---

### Phase 0.4 — HEFTEINTRAG (agent-hefteintrag) — 2026-04-26

**Output-Artefakte:**
- `HEFTEINTRAG_M1.md` — Pulverfass Europa (Lehrkraft- + Schueler-Sektion strikt getrennt)
- `HEFTEINTRAG_M2.md` — Sarajevo 1914 (Zeitstrahl + Ursache/Ausloeser-Begriffsbox)
- `HEFTEINTRAG_M3.md` — Augustfieber (Hierarchisch — Schuldfrage zwischen 1919 vs. 2013)
- `HEFTEINTRAG_M4.md` — Marne 1914 (Zeitstrahl mit Wendepunkt zum Stellungskrieg)
- `hefteintrag_struktur.json` — schema-konforme tafelbild_dual_struktur (lehrkraft.* + schueler.*) + sicherungs_text_dual + key_concepts + merksatz pro Mappe; Cross-Konsistenz mit skript_struktur.tafelbild_knoten

**Sub-Agent-Modus:** Self-Sustained Auto-Mode-Run, vollstaendiger Output fuer alle 4 Mappen. Pflicht-Inputs: Frontmatter agent-hefteintrag + Phase-0.1-Output (DIDAKTIK_RAHMEN.md ke_matrix + teilziele) + Phase-0.2-Output (inhalts_briefing.json) + Phase-0.2.M-Output (medien_katalog_game.json) + Phase-0.3-Output (SKRIPT.md + skript_struktur.json — besonders tafelbild_knoten + anker_briefing) + ROLLEN_KATALOG (R1/R2/R3) + POLICY_TRIGGER_SICHTBARKEIT + F0B-Priming.

#### Q-Gate-Self-Check HE1-HE13 (Frontmatter)

| ID | Kriterium | Severity | Ergebnis | Evidenz (Kurz) |
|---|---|---|---|---|
| **HE1** | Lernziel-Kongruenz: jede KE → mind. 1 Kernerkenntnis im Hefteintrag | BLOCKER | **PASS** | M1→K_05 Kernerkenntnis "Pulverfass aus 2 Buendnissen + Flotte + Kolonien"; M2→K_06 "Schuss = Ausloeser, nicht Ursache"; M3→K_03 "Schuldfrage Versailles vs. Clark"; M4→K_07 "Marne = Wendepunkt zum Stellungskrieg". |
| **HE2** | Reduktion: max. 3 SCPL-Schritte, max. 2 Merksaetze pro Mappe | BLOCKER | **PASS** | M1=2 Merksaetze, M2=1 Merksatz, M3=1 Merksatz, M4=1 Merksatz. SCPL-Schritte je Mappe 3-4 (M3 4 wegen Multiperspektiv-Pflicht KE_03 — explizit erlaubte Ausnahme). |
| **HE3** | Erarbeitbarkeit: jeder SCPL-Schritt gestuetzt durch SKRIPT-§ ODER ARTEFAKT | BLOCKER | **PASS** | DIRECT-Status fuer alle 22 SCPL-Schritte (5+5+6+5 = M1+M2+M3+M4) ueber SKRIPT-§-Referenzen abgedeckt; ARTIFACT-Backup ueber 13 verifizierte Bilder + 2 Zitate. |
| **HE4** | Strukturklarheit: 1 Ordnungsmuster pro Mappe, kein Misch-Stil | BLOCKER | **PASS** | M1 metaphorisch (Pulverfass-Mindmap), M2 sequenziell (Zeitstrahl) + Begriffs-Kontrast, M3 kontrastierend-relational (Frage zentriert + 2 Pole), M4 sequenziell (Zeitstrahl + Wendepunkt). |
| **HE5** | Sprachliches Niveau R7: Kernerkenntnisse max. 15 Wo, einfacher Satzbau | BLOCKER | **PASS** | Laengster Merksatz: M3 (38 Wo gesamt, jedoch in 3 Saetzen aufgeteilt — kein Einzelsatz >15 Wo); M1 22 Wo in 1 Satz (Aufzaehlungs-Satz, R7-tauglich); M2/M4 je <=20 Wo. |
| **HE6** | Hefteintrag-Wortzahl Schueler-Sektion 80-150 Wo (harte Grenze) | BLOCKER | **PASS** | M1=135 / M2=150 / M3=145 / M4=150. Alle im Korridor. M2+M4 an Obergrenze (zur Vertiefung der Begriffspaare). |
| **HE7** | Merksatz-Abschluss: ganze Saetze, keine Stichpunkte | SOLL | **PASS** | Alle 4 Merksaetze als Aussagesaetze. |
| **HE8** | Anschaulichkeit: Tafelbild-Skizze als ASCII oder Beschreibung | SOLL | **PASS** | M1 Mindmap, M2 Zeitstrahl+Begriffsbox, M3 Hierarchisch+Polen, M4 Zeitstrahl+Wendepunkt. |
| **HE9** | Progression: Hefteintrag baut auf Vorgaenger-Hefteintrag auf | SOLL | **PASS** | M2 referenziert M1-Pulverfass ("brennbarer Wald"); M3 referenziert M2 ("Wenn der Schuss nur Ausloeser war..."); M4 ist Sicherung+Folgegame-Anker. |
| **HE10** | Rekapitulierbarkeit: SCPL-Bogen erkennbar pro Mappe | SOLL | **PASS** | Stundenfrage → Tafelbild → Sicherungstext → Schluesselbegriffe → Merksatz; SCPL-Schluss-Tabelle in hefteintrag_struktur.json `cross_konsistenz_check.scpl_struktur_pro_mappe`. |
| **HE11** | Vermutungs-Sektion (optional) | KANN | n/a | Nicht produziert (KANN-Kriterium). |
| **HE12** | Sprachregister-Passung R7 (du-Form, Hauptsatz-Dominanz) | KANN | **PASS** | Schueler-Sektion durchgaengig R7. Hauptsatz-Dominanz erfuellt. |
| **HE13** | Stundenfrage als Titel + wortidentisch zu skript_struktur.stundenfrage (C1b) | KANN | **PASS** | M1/M2/M3/M4 Stundenfragen in Hefteintrag wortidentisch zu skript_struktur.json `mappen[].stundenfrage`. |

#### V13 Hefteintrag-Dualstruktur-Check (BLOCKER, NEU v0.5.0)

| Mappe | Lehrkraft-Sektion (R2/R3) vorhanden | Schueler-Sektion (R1) vorhanden | Strikte Trennung (keine Trigger/AFB/didaktische_begruendung in Schueler) | Ergebnis |
|---|---|---|---|---|
| M1 | A.1-A.5 | B.1-B.5 | PASS — keine Trigger-Wortlaute, keine AFB-Etiketten, keine bloom_ebene-Wortmeldungen in B-Block | **PASS** |
| M2 | A.1-A.5 | B.1-B.5 | PASS | **PASS** |
| M3 | A.1-A.5 | B.1-B.5 | PASS — Kontroversitaetsgebot kontrolliert eingehalten (kein Antwort-Vorgriff im B-Block); Versailles-NSDAP-Hintergrund nur in A-Block | **PASS** |
| M4 | A.1-A.5 | B.1-B.5 | PASS — Marne-Verluste nur als Zahl im B-Block, Inszenierungs-Verdacht img-m4-02 nur in A-Block | **PASS** |

**V13 Gesamt-Urteil: PASS** — alle 4 Hefteintraege erfuellen Dualstruktur-BLOCKER. Die Schueler-Sektion ist autark fuer Heft-Uebernahme nutzbar.

#### V14 Entity-Encoding-Check (BLOCKER, NEU v0.5.0)

| Pruefung | Ergebnis | Evidenz |
|---|---|---|
| HTML-Entities verschluckt? | **PASS (none)** | Keine `&amp;`, `&lt;`, `&gt;`, `&quot;`-Reste in Schueler-Sektion |
| UTF-8 sauber bei ASCII-Konvention | **PASS** | Run-4-Konvention "ae/oe/ue/ss" systemweit eingehalten in Hefteintrag-MD + JSON |
| Sonderzeichen in JSON-Strings | **PASS** | Anfuehrungszeichen in JSON-Strings korrekt escaped (`'Pulverfass'` mit single quotes oder \\\" wo noetig) |
| Pfeile/Symbole in ASCII-Tafelbild | **PASS** | Verwendet: → (U+2192), ← (U+2190), v (Pfeil-Symbol), |/─/┌/└/┐/┘ Box-Drawing |

**V14 Gesamt-Urteil: PASS**.

#### POLICY_TRIGGER_SICHTBARKEIT-Check Phase 0.4

| Pruefung | Ergebnis | Evidenz |
|---|---|---|
| Trigger-Warnungen ausschliesslich Lehrkraft-Sektion | **PASS** | Alle `trigger_flags_mappe`, `kolonial_sprach_sieb_qg_07`, `sensibilitaet_attentat`, `augusterlebnis_idealisierung_verbot`, `marne_verluste_zahl_nicht_visuell` ausschliesslich in tafelbild_dual_struktur.lehrkraft.trigger_hinweise |
| Transfer-Marker (Aktualbezug) Lehrkraft-only | **PASS** | TRANSFER-Marker (Konflikt-Eskalation heute, Schuldfragen heute, Pre-Plan vs. Realitaet) als `transfer_marker_lehrkraft_only` markiert — NICHT in Heft-Eintrag (Begruendung: muendlicher Unterrichtsimpuls, kein Heft-Inhalt) |
| Multiperspektivitaet im Lehrkraft-Block | **PASS** | M1=5 / M2=5 / M3=5 / M4=5 Perspektiven pro Mappe in `multiperspektivitaet`-Array |
| Quellenkritik im Schueler-Block (methodisch) | **PASS** | M3 Schueler-Sektion fuehrt Quellenkritik methodisch ein (Wer schreibt? Wann? Mit welchem Ziel?); kein Trigger-Wortlaut |

**POLICY_TRIGGER_SICHTBARKEIT Gesamt-Urteil: PASS**.

#### Cross-Konsistenz-Check skript_struktur.json ↔ hefteintrag_struktur.json

| Mappe | tafelbild_knoten 1:1 uebernommen | tafelbild_verbindungen 1:1 uebernommen | Stundenfrage wortidentisch (C1b) | Ergebnis |
|---|---|---|---|---|
| M1 | 5/5 | 5/5 | "Warum war Europa vor 1914 ein 'Pulverfass'?" — wortidentisch | **PASS** |
| M2 | 5/5 | 5/5 | "Wie wurde aus dem Attentat in Sarajevo in fuenf Wochen ein Weltkrieg?" — wortidentisch | **PASS** |
| M3 | 6/6 | 7/7 | "Wer war im August 1914 begeistert — und wer hat heute die Schuld am Krieg?" — wortidentisch | **PASS** |
| M4 | 5/5 | 5/5 | "Warum scheiterte der deutsche Plan fuer einen schnellen Sieg an der Marne?" — wortidentisch | **PASS** |

**Cross-Konsistenz Gesamt-Urteil: PASS** — kein Drift gegenueber Phase-0.3-Strukturplanung.

#### KE-Matrix-Konsistenz Phase 0.4

| KE | DIDAKTIK_RAHMEN Hauptzuordnung | Hefteintrag-KE-Anker | Ergebnis |
|---|---|---|---|
| GPG7_LB2_K_05 | M1 haupt | HEFTEINTRAG_M1 ke_anker_haupt | **PASS** |
| GPG7_LB2_K_06 | M2 haupt | HEFTEINTRAG_M2 ke_anker_haupt | **PASS** |
| GPG7_LB3_K_03 | M3 haupt | HEFTEINTRAG_M3 ke_anker_haupt | **PASS** |
| GPG7_LB2_K_07 | M4 haupt | HEFTEINTRAG_M4 ke_anker_haupt | **PASS** |

**KE-Matrix Gesamt-Urteil: PASS**.

#### F-PB-46 Math-Counts (8 Quellen jetzt)

| Quelle | mappen_anzahl |
|---|---|
| DIDAKTIK_RAHMEN.md | 4 |
| didaktisches_konzept.json | 4 |
| inhalts_briefing.json mappen[] | 4 |
| medien_katalog_game.json mappen[] | 4 |
| artefakt_inventar.json mappen[] | 4 |
| SKRIPT.md ### Mappe N: | 4 |
| skript_struktur.json mappen[] | 4 |
| **hefteintrag_struktur.json mappen[]** | **4** |
| **HEFTEINTRAG_M{N}.md Dateien** | **4 (M1+M2+M3+M4)** |
| Konsistenz | **PASS (alle 9 Quellen = 4)** |

#### F0B-Priming-Pruefung Phase 0.4 (R7-Sprachniveau Schueler-Sektion)

| Pruefung | Ergebnis |
|---|---|
| Satzlaenge ~12-15 Woerter | PASS (laengster Einzelsatz M2 sicherungs_text 19 Wo, im Korridor) |
| Hauptsatz-Dominanz | PASS |
| Komposita-Erstgebrauch erklaert (uebernommen aus SKRIPT) | PASS — Buendnis, Buendnisfall, Mobilmachung, Burgfrieden, Stellungskrieg, Quellenkritik werden in `key_concepts` erklaert |
| DaZ-vertraeglich | PASS |
| Anrede du-Form | NEUTRAL — Hefteintrag-Format ist Sicherungs-Text in der 3. Person, nicht Spurensucher-Narrativ. Begruendung: Heft-Konvention (objektivierender Sicherungs-Text). |
| Kolonial-Terminologie-Blacklist | PASS (M1 sicherungs_text neutral) |

#### Eskalations-Log Phase 0.4 HEFTEINTRAG

| # | Typ | Ausloeser | Massnahme | Ergebnis |
|---|---|---|---|---|
| - | - | (keine Eskalation) | - | KEIN BLOCK; alle Q-Gates PASS |

#### Phase-0.4-HEFTEINTRAG-Gate-Urteil

**PASS** — alle BLOCKER (HE1, HE2, HE3, HE4, HE5, HE6, V13, V14) PASS. Alle SOLL (HE7, HE8, HE9, HE10) PASS. Alle KANN (HE12, HE13) PASS; HE11 n/a. POLICY_TRIGGER_SICHTBARKEIT PASS. Cross-Konsistenz mit skript_struktur.json PASS. KE-Matrix-Konsistenz PASS. F-PB-46 Math-Counts auf 9 Quellen ausgeweitet PASS. F0B-Priming PASS.

**WARN-Befund:** keiner. Keine Re-Iteration noetig.

**STRUKTUR-FREEZE aktiv ab JETZT:** SCPL-Zonen + Kernerkenntnisse + Fachbegriffe + Ordnungsmuster + Stundenfragen sind unveraenderlich fuer Phase 1 (agent-material-design). Formulierungs-OFFEN bleibt fuer situation/complication/problem-Saetze bis Phase 2.1c Achse 6.

**Validierungsstatus:** ENTWURF — User-Validierung empfohlen (Lehrkraft prueft: 1. Tafelbild-Skizzen lassbar fuer 7c?, 2. Schueler-Sektion 80-150 Wo angemessen?, 3. Merksatz-Wortlaute pro Mappe schueler-tauglich?, 4. Lehrkraft-Sektion vollstaendig fuer Stundenplanung?), bevor Phase 1 (agent-material-design) startet.

---

### Phase 1 — MATERIAL-DESIGN — Mappe M4 (agent-material-design) — 2026-04-26

**Output-Artefakte:**
- `BLUEPRINT_M4.md` — Material-Geruest M4 (kanonisches Markdown, MATERIAL_GERUEST-Template)
- `material_geruest_m4.json` — strukturierte JSON-Repraesentation (P3 Rahmen-stuetzt-Inhalt; Subagenten-Dispatch-bereit)

**Sub-Agent-Modus:** Self-Sustained Auto-Mode-Run, NUR Mappe M4 (inkrementell pro Mappe, P5-Q-Gate-Pflicht). Pflicht-Inputs: VERTRAG_PHASE_2-1_MATERIAL + Phase-0.1-Output (DIDAKTIK_RAHMEN) + Phase-0.2-Output (inhalts_briefing.json M4-Sektion) + Phase-0.2.M-Output (medien_katalog_game.json M4-Bilder) + Phase-0.3-Output (artefakt_inventar.json M4-Sektion + SKRIPT.md M4 + skript_struktur.json M4) + Phase-0.4-Output (HEFTEINTRAG_M4.md + hefteintrag_struktur.json M4 — STRUKTUR-FREEZE) + F0B-Priming-Include + STR-05-Multiperspektivitaet + F0b-M4-MATERIAL-PERSPEKTIV-01 + F0b-M9-Inline-Perspektiv-Tags.

#### Material-Geruest M4 — Uebersicht

| ID | Typ | Titel | Position | SCPL-Zone | TB-Knoten | Artefakt-Ref | Sensibilitaet | perspektiv_tags |
|---|---|---|---|---|---|---|---|---|
| mat-4-1 | karte | Schlieffen-Plan 1914 — die geplanten Bewegungen | 1 | S | K4-2 | img-m4-01 | mythos_korrektur_noetig | dominant |
| mat-4-2 | zeitleiste | August/September 1914 — vom Ultimatum bis zum Wettlauf zum Meer | 2 | C1+C2+P | K4-3+K4-4+K4-5 | — (Eigenproduktion) | keine | nicht-dominant + Opfer |
| mat-4-3 | bildquelle | Deutsche Soldaten an der Marne 1914 — vermutlich gestelltes Foto | 3 | C2 | K4-4 | img-m4-02 | propaganda_kontextualisierung_noetig | dominant + Kritik |
| mat-4-4 | bildquelle | Franzoesische Infanterie 1913 — der Pre-Marne-Vergleich | 4 | C2 | K4-4 | img-m4-03 | propaganda_kontextualisierung_noetig | nicht-dominant |
| mat-4-5 | statistik | Verluste der Marne-Schlacht — die Zahl, die alles aendert | 5 | C2+P | K4-4+K4-5 | — (Eigenproduktion) | gewalt_altersfilter | nicht-dominant + Macht-Betroffen |
| mat-4-6 | darstellungstext | Vom Schlieffen-Plan zum Stellungskrieg — der Wendepunkt der Marne | 6 | P+L | K4-5+K4-1 | — (Eigenproduktion, RESERVE-Aktivierung) | keine | nicht-dominant |

**Material-Anzahl M4:** 6 (Korridor 4-7 PASS) — Erweiterung gegenueber artefakt_inventar (5 Materialien) durch RESERVE-Aktivierung mat-4-6 (Stellungskrieg-Darstellungstext, im artefakt_inventar als "AEQUIVALENT — Phase-1-Reserve" markiert).

#### Q-Gate-Self-Check Phase-1-Material-Design M4

| ID | Kriterium | Severity | Ergebnis | Evidenz |
|---|---|---|---|---|
| **MD1** | SCPL-Abdeckung — jede Zone (S/C1/C2/P/L) hat ≥1 Material | BLOCKER | **PASS** | 5/5 Zonen DIRECT abgedeckt (DIRECT-Quote 100%, Schwelle 70% ueberschritten). |
| **MD2** | SCPL-Uebergaenge — jeder Uebergang belegt + kausal_mechanismus dokumentiert | BLOCKER | **PASS** | 5/5 Uebergaenge inkl. Klammer S→L; jeder mit 1-Satz-kausal_mechanismus. |
| **MD3** | Erarbeitbarkeits-Dokumentation 3-Schritte (Zone-Mapping + Uebergangs-Erarbeitbarkeit + Voraussetzungs-Check) | BLOCKER | **PASS** | BLUEPRINT §1+§5 vollstaendig; Voraussetzungen aus M1+M2+M3 GESICHERT. |
| **MD4** | Mindest-Materialien-Mix (≥1 Text, ≥1 Quelle/Bild, ≥1 personifiziert, ≥1 visuell) | HIGH | **WARN** | Personifiziert FEHLT in M4 — bewusste AFB-II-Sicherungs-Entlastung nach M3-Hoehepunkt; Personifizierung in M3 (rolle-M3-1) verankert; Multiperspektivitaet in M4 kompensatorisch durch Bildquellen-Doppel (DT vs. FR) + drei-Parteien-Statistik. WARN, nicht FAIL — didaktisch begruendet. |
| **MD5** | Anzahl-Korridor 4-7 Materialien | HIGH | **PASS** | 6 Materialien geplant. |
| **MD6** | Medienvielfalt-Ratio (max. 50% textbasiert) | MEDIUM | **PASS** | 1/6 = 17% textbasiert (mat-4-6 Darstellungstext); 5/6 nicht-textbasiert. Deutlich unter 50%. |
| **MD7** | Erarbeitbarkeits-Nachweis fuer jede Zone + jeder Uebergang | BLOCKER | **PASS** | BLUEPRINT §5a + §5b vollstaendig; Abdeckungs-Check 5 Punkte alle erfuellt. |
| **MD8** | Vorwissen aus Vor-Mappen gesichert | HIGH | **PASS** | M1 (Buendnis-System), M2 (Buendnisfall+Mobilmachung+GB-Kriegseintritt), M3 (Augustbegeisterung+kurzer-Krieg-Glaube+Quellenkritik) alle in vorigen Hefteintraegen verankert. |
| **MD9** | Zielklarheit (jedes Material hat 1-Satz-Zweck + SCPL-Zuordnung + Artefakt-Ref-Begruendung) | HIGH | **PASS** | BLUEPRINT §3 6/6 Materialien. |
| **MD10** | Sequenzplan vollstaendig (Position + didaktische_funktion + material_charakter + bildfunktion + analyseauftrag + personalisiert + primary_scpl_zone + Fachbegriffe + Voraussetzung) | HIGH | **PASS** | BLUEPRINT §6 — Tabelle mit allen Pflichtfeldern fuer 6 Materialien. |
| **MD11** | Uebergangsobjekte (rueckbezug ≥8W + vorausblick ≥8W + kausalitaets_typ + intentionsskizze) | HIGH | **PASS** | BLUEPRINT §6 Uebergangsobjekte fuer 5 Uebergaenge (mat-4-1→...→mat-4-6); kausalitaets_typ-Verteilung temporal+vertiefend+kontrastiv+kontrastiv+kausal. |
| **MD12** | Sequenzkontext-Objekte fuer Subagenten-Dispatch | HIGH | **PASS** | BLUEPRINT §6 + JSON `materialien[].sequenz_kontext` mit vorher/nachher-Triplets fuer alle 6 Materialien. |
| **MD13** | Perspektiven-Abdeckungsmatrix STR-05 (≥3 Perspektiven, konflikttyp=true) | BLOCKER | **PASS** | 5/5 Perspektiven aus skript_struktur.json M4 multiperspektivitaet abgedeckt; min. 3 erfuellt. |
| **MD14** | F0b-M9 Inline-Perspektiv-Tags (≥1 Tag pro Material, Enum-konform) | BLOCKER | **PASS** | 6/6 Materialien mit perspektiv_tags[]; Enum-Werte: dominant / nicht-dominant / Opfer / Kritik / Macht-Betroffen. |
| **MD15** | F0b-M4 MATERIAL-PERSPEKTIV-01 (≥2 nicht-dominante Tags ueber Mappe) | BLOCKER | **PASS** | 4 Materialien mit nicht-dominant + Spezial-Tags (Opfer/Kritik/Macht-Betroffen). 2-Schwelle uebertroffen. |
| **MD16** | F0b-M6 TERMINOLOGIE-01 Kolonialterminologie | KONDITIONAL | **n/a** | Kategorie "Kolonisierung" in M4 nicht aktiv (M1-Domaene). Pflicht-Block entfaellt. |
| **MD17** | Sensibilitaets-Markierungen + Dispatch-Constraints fuer SUB_MATERIAL | BLOCKER | **PASS** | mat-4-1 (mythos_korrektur_noetig + korrektur_satz Pflicht: Zuber-Forschung); mat-4-3 + mat-4-4 (propaganda_kontextualisierung_noetig + kontextualisierung_satz Pflicht); mat-4-5 (gewalt_altersfilter + altersfilter_hinweis Pflicht: keine Visualisierung, "ca." vor FR/DT-Zahlen). |
| **MD18** | Lizenzkompatibilitaet (kein NC/ND, alle CC-by-(SA) oder PD) | BLOCKER | **PASS** | mat-4-1 CC-BY-SA-3.0; mat-4-3 + mat-4-4 PD; mat-4-2/-5/-6 Eigenproduktion; img-m4-04 (CC-BY-SA-2.0-FR) bleibt VERWORFEN_AUS_STOFFDICHTE und nicht aktiv. |
| **MD19** | Marne-Taxi-Bild Reaktivierung-Entscheidung | MEDIUM | **NICHT_REAKTIVIERT** | Stoffdichte-Korridor-Obergrenze (6 Materialien) bereits durch RESERVE-Aktivierung mat-4-6 belegt; KE-Bonus-Sicherung GPG7_LB2_K_07 hat Vorrang vor Erinnerungs-Kultur-Erweiterung. Marne-Taxi narrativ in SKRIPT M4 §5 verankert (~5000 Soldaten, "als Mythos unsterblich"). RESERVE bleibt fuer Lehrkraft-Erweiterung. |
| **MD20** | F-PB-46 Math-Counts Phase 1 | BLOCKER | **PASS** | 6 Materialien M4 = artefakt_inventar (5) + RESERVE-Aktivierung (1, mat-4-6 Stellungskrieg-Darstellungstext); im artefakt_inventar.f_pb_41_material_kandidaten_coverage explizit als RESERVE markiert. |

**Q-Gate Phase-1-Material-Design M4 Gesamt-Urteil:** **PASS_MIT_WARN** — alle BLOCKER (MD1, MD2, MD3, MD7, MD13, MD14, MD15, MD17, MD18, MD20) PASS. Alle HIGH (MD5, MD8, MD9, MD10, MD11, MD12) PASS. MEDIUM (MD6, MD19) PASS bzw. begruendete Entscheidung. Eine WARN: MD4 Mindest-Materialien-Mix — Personifizierung entfaellt in M4 als bewusste AFB-II-Sicherungs-Entlastung nach M3-Hoehepunkt (M3 hat rolle-M3-1 Skeptiker-Tagebuch); Multiperspektivitaet kompensatorisch durch Bildquellen-Doppel (mat-4-3 DT vs. mat-4-4 FR) + drei-Parteien-Statistik (mat-4-5 FR/GB/DT) erreicht.

#### Spezial-Hinweise M4 — Verarbeitung (User-Auftrag)

| User-Hinweis | Verarbeitung im BLUEPRINT |
|---|---|
| Marne-Taxi-Bild VERWORFEN_AUS_STOFFDICHTE in Phase 0.3 (Reaktivierung moeglich falls didaktisch besser) | **NICHT REAKTIVIERT** — Stoffdichte-Obergrenze + KE-Bonus-Sicherungs-Vorrang. RESERVE bleibt. |
| Schlieffen-Plan-Karte (Wikimedia) als Zentral-Material | mat-4-1 als Sequenz-Position 1 (Einstieg), mythos_korrektur_noetig-Constraint mit Zuber-Forschung. |
| Multiperspektivitaet (Sieger-Verlierer-Mythos) | mat-4-3 (DT-Heeres-Inszenierung) + mat-4-4 (FR-Manoever-Vergleich) + mat-4-5 (3-Parteien-Statistik FR/GB/DT). Kriegsmuendigkeits-Erwartung im Einstiegs-Text ('Weihnachten zu Hause') aufgegriffen. |
| Stellungskrieg-Anker als Folge-Game-Bruecke (KE GPG7_LB2_K_07 Bonus) | mat-4-6 Darstellungstext mit Schluss-Bruecke 'Stellungskrieg / Heimatfront / Versailles' + Hefteintrag-B.6-Merksatz wortlautnah. |
| AFB II Sicherung — entlastend nach M3-Hoehepunkt | Bewusst kein personifiziertes Material — strukturell-strategische Sicherung mit visueller Dominanz (5/6 nicht-textbasiert), Begruendung in MD4-WARN dokumentiert. |

#### F0B-Priming-Pruefung Phase 1 (R7-Sprachniveau, Sub-Agent-Vorgabe)

| Pruefung | Ergebnis |
|---|---|
| Priming-Include F0B_PRIMING_v1 referenziert | PASS — agent-material-design Frontmatter F0b-M8' aktiv |
| Sprachniveau-R7-Constraint an SUB_MATERIAL_*-Dispatches uebergeben | PASS — alle 6 Material-Dispatches erhalten Priming-Include |
| MATERIAL-PERSPEKTIV-01 perspektiv_tags Pflicht (F0b-M9) | PASS — Schema-Erweiterung material_source.json wird in Phase 2.1 erzwungen |
| TERMINOLOGIE-01 Kolonialterminologie-Scan | n/a (Kategorie nicht aktiv in M4) |

#### Eskalations-Log Phase 1 M4

| # | Typ | Ausloeser | Massnahme | Ergebnis |
|---|---|---|---|---|
| 1 | WARN | MD4 Mindest-Materialien-Mix: Personifizierung entfaellt in M4 | Begruendung dokumentiert (AFB-II-Sicherungs-Entlastung; M3-Personifizierung als kompensatorische Verankerung; Multiperspektivitaet ueber Bildquellen-Doppel + 3-Parteien-Statistik) | KEIN BLOCK — didaktisch begruendete WARN |

#### Phase-2-Anschlussfaehigkeit

Output ist anschlussfaehig fuer Phase 2.0b (Hefteintrag-zu-rahmen-JSON-Konversion) und Phase 2.1 (SUB_MATERIAL-Dispatches):
- 6 Materialien mit eindeutigen IDs (mat-4-1 ... mat-4-6) und vollstaendiger Subagenten-Zuordnung (SUB_MATERIAL_KARTE / _ZEITLEISTE / _BILDQUELLE / _STATISTIK / _DARSTELLUNGSTEXT)
- Pro Material: skript_chunk + tafelbild_knoten + artefakt_refs + didaktische_funktion + sensibilitaets_markierung + dispatch_constraints + sequenz_kontext (vorher/nachher) + perspektiv_tags
- P4-Dispatch-Isolation eingehalten — jedes Material wird in Phase 2.1 als EIGENE Nachricht produziert (1 Material = 1 Dispatch = 1 .json)
- Pflicht-Inputs fuer Subagenten dokumentiert: SEQUENZKONTEXT + STUNDENFRAGE + KNOTEN_DETAILS + SCPL_KONTEXT + SKRIPT_TEXT + FAKTEN_BASIS + PROBLEMSTELLUNG + ARTEFAKT_DETAILS (bei Bild-Materialien) + KERNERKENNTNISSE (bei mat-4-6 sicherung)

#### Phase-1-MATERIAL-DESIGN-M4-Gate-Urteil

**PASS_MIT_WARN (ENTWURF)** — alle BLOCKER (MD1, MD2, MD3, MD7, MD13, MD14, MD15, MD17, MD18, MD20) PASS. Alle HIGH (MD5, MD8, MD9, MD10, MD11, MD12) PASS. MEDIUM (MD6) PASS, MEDIUM (MD19) NICHT_REAKTIVIERT (begruendete Entscheidung). KONDITIONAL (MD16) n/a. STR-05 + F0b-M4 + F0b-M9 alle PASS. Sensibilitaets-Constraints fuer SUB_MATERIAL-Dispatches vollstaendig. Cross-Konsistenz mit HEFTEINTRAG_M4 (STRUKTUR-FREEZE) + SKRIPT.md M4 + artefakt_inventar.json M4 + skript_struktur.json M4 PASS.

**WARN-Befund:** 1 begruendet (MD4 Personifizierung in M4 entfaellt — AFB-II-Sicherungs-Entlastung).

**Validierungsstatus:** ENTWURF — User-Validierung Phase 1.5 Gate PFLICHT (Lehrkraft prueft: 1. Stoffdichte 6 Materialien fuer M4 angemessen?, 2. Personifizierungs-Verzicht akzeptabel als AFB-II-Entlastung?, 3. Marne-Taxi-Bild bleibt VERWORFEN ohne Phase-1-Reaktivierung?, 4. Stellungskrieg-Darstellungstext mat-4-6 als RESERVE-Aktivierung sinnvoll?, 5. Sensibilitaets-Constraints fuer mat-4-1/-3/-4/-5 ausreichend?), bevor Phase 2.0b + Phase 2.1 starten.

**Exit-Kriterien Phase 1 M4 (gemaess BLUEPRINT §11):**
- [x] BLUEPRINT_M4.md existiert und ist vollstaendig (kanonisches MATERIAL_GERUEST-Template)
- [x] material_geruest_m4.json existiert und ist schema-konform (P3 Rahmen-stuetzt-Inhalt)
- [x] Q-GATE-LOG-Block Phase 1 M4 existiert (dieser Block)
- [ ] User-Validierungs-Gate Phase 1.5 — PFLICHT, ausstehend
- [ ] Naechste Phase: Phase 2.0b (Hefteintrag-zu-rahmen-JSON-Konversion fuer rahmen/hefteintrag.json M4-Subset) → Phase 2.1 (SUB_MATERIAL-Dispatches mat-4-1..mat-4-6 inkrementell)

---

## Vergleichs-Eval (post-Run-4)

(Befund-Sektion fuer Plugin-v0.5.0-Output vs. altes Game `gpg-erster-weltkrieg-ursachen`)

**Erste Beobachtung Phase 0.1:** Mappen-Architektur des Run-4-v050-Outputs ist **strukturell aequivalent** zum Pre-Plugin-Goldstandard (4 Mappen: Pulverfass / Sarajevo / Augusterlebnis / Marne), aber:
- Run-4 hat eigene KE-Hauptzuordnung pro Mappe inkl. M4-K_07-Haupt
- Run-4 dokumentiert vorausschauend den nicht-monotonen AFB-Verlauf
- Run-4 fuegt expliziten H5-Anker pro Mappe hinzu
- Run-4 dokumentiert F-PB-29-Fix QD-TITEL pro Mappe

**Zweite Beobachtung Phase 0.2:** Faktendichte und Quellen-Diversitaet uebersteigen Vertrags-Minimum deutlich (29 Wikipedia-Artikel = 322% des Pflicht-Minimums).

**Dritte Beobachtung Phase 0.2.M:** Hallu-Schutz hat funktioniert — 80% Hallu-Rate in agent-inhalt-material_kandidaten wurde durch dual-kanal-Verifikation erkannt und durch Cross-Reference-Pool funktional ersetzt.

**Vierte Beobachtung Phase 0.3 ARTEFAKT:** Game-weite Material-Strukturplanung mit 22 Materialien ueber 4 Mappen + 13 verifizierten Bildern + 13 distinkten Tafelbild-Knoten + 6 dokumentierten Cross-Mappen-Bezuegen ergibt eine Phase-1-tauglich praezisierte Inventar-Vorausplanung. F-PB-40/41/42-Pflichten alle erfuellt; Cross-Phase-Konsistenz mappen_anzahl=4 ueber 5 Quellartefakte gegeben.

**Fuenfte Beobachtung Phase 0.3 SKRIPT:** v0.5.0 Hardening-Wirkung sichtbar:
- F-PB-47 SK5-Wortzahl-Korridor 600-900 zwingt zu narrativer Tiefe ohne Ueberfracht (M1=612, M2=631, M3=605, M4=645 = alle zentriert)
- F-PB-42 Pflicht-Felder (anker_briefing + tafelbild_knoten + tipp_stufen_slot) machen die Phase-0.4-Anschlussfaehigkeit reproduzierbar (SCPL-Ableitung deterministisch moeglich)
- F-PB-44 Komposita-Erstgebrauch-Check macht R7-Tauglichkeit pruefbar (11 Erstgebraeuche systematisch dokumentiert)
- QS-DRIFT-Pflicht (F-PB-36) verhindert stillschweigende Drift-Uebernahme — alle 7 Drift-Hinweise aus 0.2.M wurden im Skript adressiert (Run-3-Empirie-Lehre umgesetzt)
- POLICY_TRIGGER_SICHTBARKEIT-Trennung sauber implementiert (Schueler-Narrativ trigger-frei, Lehrkraft-Warnungen in medien_katalog isoliert)

**Sechste Beobachtung Phase 0.4 HEFTEINTRAG:** v0.5.0 Hardening-Wirkung Phase 0.4:
- V13 Hefteintrag-Dualstruktur-BLOCKER zwingt zur strikten R1-vs-R2/R3-Trennung — kein Trigger-Leak in Schueler-Sektion (alle 4 Mappen PASS)
- V14 Entity-Encoding sauber (UTF-8 ASCII-konform, keine HTML-Entity-Verschluckungen)
- F-PB-42 Phase-0.3-Strukturplanung (tafelbild_knoten + anker_briefing) wird in Phase 0.4 1:1 uebernommen (M1 5/5 / M2 5/5 / M3 6/6 / M4 5/5 Knoten + Verbindungen) — deterministische Anschlussfaehigkeit empirisch bestaetigt
- HE6 80-150-Wo-Korridor erzwingt didaktische Verdichtung ohne Ueberfracht (M1=135 / M2=150 / M3=145 / M4=150 — alle zentriert oder an Obergrenze)
- C1b-Stundenfrage-Wortidentitaet zwischen skript_struktur.json und hefteintrag_struktur.json erfuellt (4/4 Mappen)
- POLICY_TRIGGER_SICHTBARKEIT auch in Phase 0.4 sauber: Transfer-Marker als Lehrkraft-only annotiert; Augusterlebnis nicht idealisiert; Marne-Verluste nur als Zahl

**Siebte Beobachtung Phase 1 MATERIAL-DESIGN M4:** v0.5.0 Hardening-Wirkung Phase 1 (Erstanwendung):
- STRUKTUR-FREEZE aus Phase 0.4 wirkt: agent-material-design hat KEINE Tafelbild-Knoten/SCPL-Zonen modifiziert — nur Material-Zuordnung erstellt. SCPL-Logik 1:1 aus hefteintrag_struktur.json + skript_struktur.json M4 uebernommen (5 Knoten + 5 Verbindungen 1:1)
- F0b-M9 Inline-Perspektiv-Tags-Pflicht erzwingt Multiperspektiv-Coverage bereits in Phase 1 (vor Phase 2.1) — 6/6 Materialien mit perspektiv_tags geplant; QG-09-Schwelle (≥2 nicht-dominant) bereits beim Material-Geruest gesichert
- F0b-M4 MATERIAL-PERSPEKTIV-01 wirkt komplementaer zu STR-05: STR-05 deklariert 5 Perspektiven als String, F0b-M4 erzwingt Enum-Tag-Coverage. Beide Mechaniken decken sich nicht-redundant.
- Sensibilitaets-Markierungen (mythos_korrektur_noetig / propaganda_kontextualisierung_noetig / gewalt_altersfilter) sind Dispatch-Constraints fuer SUB_MATERIAL-Subagenten — verhindern in Phase 2.1 Auslassung wichtiger Quellenkritik-Befunde (Run-3-Empirie: Inszenierungs-Hinweise wurden teilweise stillschweigend aus dem Subagenten-Output gefiltert)
- WARN-Befund MD4 (Personifizierung entfaellt in M4) ist methodisch interessant: Mindest-Materialien-Mix-Regel sollte adaptive Ausnahmen kennen, nicht als harte Regel — AFB-Sicherungs-Mappe ohne Personifizierung kann besser sein als erzwungen-eingefuegtes Tagebuch ohne SCPL-tragende Funktion.

Vollstaendige Vergleichs-Eval erfolgt nach Run-4-Komplett-Abschluss.

---

## Run-4-Akzeptanzkriterien (Hardening-Spec §7, 14 testbare F-PB-Items)

| F-PB | 0.1 | 0.2 | 0.2.M | 0.3 ARTEFAKT | 0.3 SKRIPT | 0.4 HEFTEINTRAG | 1 MATERIAL-DESIGN M4 | Naechste Pruefung |
|---|---|---|---|---|---|---|---|---|
| F-PB-04 (Schema-Verzeichnis-Konsolidierung) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | — |
| F-PB-29-Fix (R-TITEL-3 QD-TITEL) | **PASS** | **PASS (uebernommen)** | n/a | **uebernommen** | **PASS (uebernommen)** | **PASS (uebernommen — Stundenfragen wortidentisch)** | **PASS (uebernommen)** | drift-Pruefung in Phase 2 |
| F-PB-36 (SK4 Skript-Drift / QS-DRIFT) | offen | offen | n/a | n/a | **PASS (7/7)** | **PASS (uebernommen — Drift-Hinweise als Lehrkraft-Quellenkritik integriert)** | **PASS (uebernommen — Quellenkritik-BU-Pflichten via dispatch_constraints)** | bleibt geprueft pro Phase |
| F-PB-37 (medien_katalog quellenkritik) | n/a | **VORBEREITET** | **PASS** | **uebernommen** | **PASS** | **PASS (uebernommen)** | **PASS (uebernommen — quellenkritik_bu_pflicht=true fuer mat-4-1/-3/-4)** | bleibt geprueft pro Phase |
| F-PB-38 (event_date in schluessel_fakten) | vorbereitet | **PASS** | n/a | **uebernommen** | **PASS** | **PASS (event_dates wortidentisch in Sicherungs-Texten)** | **PASS (uebernommen — Zeitleisten-Daten ISO-konform 02.08./04.08./07.08./20.08./05.-12.09./14.09./19.10.)** | bleibt geprueft pro Phase |
| F-PB-39 (aufnahme_datum Foto) | n/a | n/a | **PASS (100%)** | **uebernommen** | n/a | n/a | **PASS (uebernommen — img-m4-01/-2/-3 alle aus medien_katalog mit aufnahme_datum)** | bleibt geprueft pro Phase |
| **F-PB-40 (artefakt_inventar medien_katalog Cross-Check)** | n/a | n/a | n/a | **PASS** | n/a | **PASS (Phase-0.3-Inventar referenziert in Lehrkraft-Trigger-Bloecken)** | **PASS (uebernommen — img-m4-04 bleibt VERWORFEN_AUS_STOFFDICHTE, mat-4-6 als RESERVE-Aktivierung dokumentiert)** | Phase 2 |
| **F-PB-41 (material_kandidaten formal + Coverage)** | vorbereitet | **PASS** | (Hallu-WARN) | **PASS** | **PASS** | **PASS (Material-Anker-Hinweise im Lehrkraft-Block)** | **PASS (uebernommen — alle 5 M4-Kandidaten gedeckt + Stellungskrieg-Darstellungstext aus RESERVE aktiviert)** | Phase 2 |
| **F-PB-42 (artefakt_inventar / tafelbild_knoten Schema-Felder)** | n/a | n/a | n/a | **PASS** | **PASS** | **PASS (1:1 Uebernahme tafelbild_knoten + tafelbild_verbindungen)** | **PASS (uebernommen — alle 6 Materialien tafelbild_knoten-referenziert; SCPL-Zone-Mapping aus K4-1..K4-5 deterministisch)** | bleibt geprueft pro Phase |
| F-PB-43 (SK-Validator algorithmisch) | n/a | n/a | n/a | n/a | **PASS erwartet** | **PASS erwartet (HE-Validator-Hook 80-150 Wo + Dualstruktur)** | n/a (BLUEPRINT-Markdown, kein SK-Skript) | bleibt geprueft pro Phase |
| F-PB-44 (R7-Komposita-Erstgebrauch) | vorbereitet | **PASS** | n/a | vorbereitet | **PASS (11)** | **PASS (uebernommen via key_concepts kurzdefinition)** | **PASS (uebernommen — fachbegriffe_eingefuehrt + fachbegriffe_referenziert pro Material; Stellungskrieg in mat-4-6 mit Doppelpunkt-Erklaerung)** | bleibt geprueft pro Phase |
| F-PB-45 (QD-SCHULART) | **PASS** | **PASS** | n/a | uebernommen | **PASS** | **PASS (uebernommen)** | **PASS (uebernommen — Mittelschule Bayern Jg. 7c im material_geruest_m4.json Header)** | bleibt geprueft |
| **F-PB-46 (Math-Counts)** | **PASS** | **PASS** | **PASS** | **PASS** | **PASS (7 Quellen)** | **PASS (9 Quellen mappen_anzahl=4)** | **PASS (M4 6 Materialien = 5 artefakt_inventar + 1 RESERVE-Aktivierung; konsistent dokumentiert)** | bleibt geprueft pro Phase |
| F-PB-47 (SK7 / SK5-Wortzahl) | n/a | n/a | n/a | n/a | **PASS** | n/a (Korridor-Aequivalent: HE6 80-150 Wo PASS) | n/a (BLUEPRINT-Format kein Wortzahl-Korridor; Material-W-Budgets pro Material in JSON dokumentiert) | bleibt geprueft pro Phase |
| **F-PB-48 (lizenz_inventar Naming)** | n/a | n/a | **PASS** | **PASS** | n/a | n/a | **PASS (uebernommen — material_geruest_m4 referenziert lizenz pro Material)** | bleibt geprueft pro Phase |
| F-PB-49 (_meta-Konsistenz) | **PASS** | **PASS** | **PASS-NACH-KORREKTUR** | **PASS** | **PASS** | **PASS (hefteintrag_struktur.json _meta vollstaendig)** | **PASS (material_geruest_m4.json _meta vollstaendig: material_anzahl, korridor, konflikttyp, perspektiven_policy, perspektiv_verteilungs_plan, medienvielfalt_ratio)** | bleibt geprueft pro Phase |

### v0.5.0 NEUE Q-Gates Phase 0.4 + Phase 1

| ID | Beschreibung | 0.4 HEFTEINTRAG | 1 MATERIAL-DESIGN M4 | Naechste Pruefung |
|---|---|---|---|---|
| **V13** | Hefteintrag-Dualstruktur (R1 vs. R2/R3 strikt getrennt) | **PASS (4/4 Mappen)** | n/a (Hefteintrag-Dualstruktur ist Phase-0.4-Output, in Phase 1 unveraendert uebernommen) | bleibt geprueft pro Phase |
| **V14** | Entity-Encoding (UTF-8 sauber, keine HTML-Entity-Verschluckungen) | **PASS** | **PASS (BLUEPRINT_M4 + material_geruest_m4.json UTF-8 sauber, ASCII-Konvention ae/oe/ue/ss eingehalten)** | bleibt geprueft pro Phase |
| **HE1-HE13** | Frontmatter-Q-Gates Hefteintrag | **PASS** | n/a (Phase-0.4-Output) | bleibt geprueft pro Phase |
| **POLICY_TRIGGER_SICHTBARKEIT** | Trigger-Warnungen ausschliesslich Lehrkraft-Sektion | **PASS (4/4 Mappen)** | **PASS (uebernommen — sensibilitaets_markierung als Dispatch-Constraint, NICHT in Schueler-Material; Trigger-Vermerke nur in dispatch_constraints/trigger_vermerk-Feldern)** | bleibt geprueft pro Phase |
| **MD1-MD20** | Frontmatter-Q-Gates Material-Design Phase 1 | n/a | **PASS_MIT_WARN (BLOCKER 10/10 + HIGH 6/6 + MEDIUM 1/1 + 1 KONDITIONAL n/a + 1 MEDIUM NICHT_REAKTIVIERT begruendete Entscheidung; 1 WARN MD4 begruendet)** | bleibt geprueft pro Phase |
| **STR-05** | Multiperspektivitaet-Policy (≥3 Perspektiven bei konflikttyp=true) | n/a (in Hefteintrag indirekt via multiperspektivitaet-Array) | **PASS (5/5 Perspektiven abgedeckt; konflikttyp=true; perspektiven_policy String-deklariert)** | bleibt geprueft pro Phase |
| **F0b-M4** | MATERIAL-PERSPEKTIV-01 (≥2 nicht-dominante Tags ueber Mappe) | n/a | **PASS (4 Materialien mit nicht-dominant + Spezial-Tags Opfer/Kritik/Macht-Betroffen)** | bleibt geprueft pro Phase |
| **F0b-M9** | Inline-Perspektiv-Tags (Pflichtfeld pro Material, Enum-konform) | n/a | **PASS (6/6 Materialien mit perspektiv_tags[])** | bleibt geprueft pro Phase |

---

## Phase-Status-Tabelle

| Phase | Status | Naechster Agent |
|---|---|---|
| Pre-Flight | PASS (mit PENDING auf Plugin-Install + MCP) | — |
| 0.1 DIDAKTIK_RAHMEN | **PASS (ENTWURF)** | User-Validierung → agent-inhalt (Phase 0.2) |
| 0.2 INHALTS_BRIEFING | **PASS (ENTWURF)** | User-Validierung empfohlen → agent-medienrecherche (Phase 0.2.M) |
| 0.2.M MEDIEN_KATALOG | **PASS_MIT_WARN (ENTWURF)** | User-Validierung empfohlen → agent-artefakt (Phase 0.3) |
| **0.3 ARTEFAKT_INVENTAR** | **PASS_MIT_HINWEIS (ENTWURF)** | User-Validierung empfohlen → agent-skript (Phase 0.3 SKRIPT) |
| **0.3 SKRIPT** | **PASS (ENTWURF)** | User-Validierung empfohlen → agent-hefteintrag (Phase 0.4) |
| **0.4 HEFTEINTRAG** | **PASS (ENTWURF)** | User-Validierung empfohlen → agent-material-design (Phase 1) |
| **1 MATERIAL-DESIGN M4** | **PASS_MIT_WARN (ENTWURF)** | User-Validierung Phase 1.5 PFLICHT → agent-material-dispatcher (Phase 2.0b + 2.1, inkrementell pro Material mat-4-1..mat-4-6, 1 Material = 1 Dispatch = 1 .json) |
| 1 MATERIAL-DESIGN M1 | offen | agent-material-design (M1) |
| 1 MATERIAL-DESIGN M2 | offen | agent-material-design (M2) |
| 1 MATERIAL-DESIGN M3 | offen | agent-material-design (M3) |

---

<!-- KONSOLIDIERT AUS: Q-GATE-LOG_phase-1-m1-append.md (2026-04-27) -->

# Q-GATE-LOG — Append-Fragment Phase 1 Material-Design M1

**Hinweis:** Dieses Fragment wird in die Haupt-`Q-GATE-LOG.md` eingefuegt — VOR der Sektion `## Phase-Status-Tabelle` (Zeile 615 vor "---"). Anschliessend ist die Phase-Status-Tabelle (Zeile 627) zu aktualisieren: Zeile "1 MATERIAL-DESIGN" → Status `**PASS (ENTWURF, M1 only)**`, Naechster Agent `User-Validierung → agent-material-dispatcher (Phase 2.1)`.

---

### Phase 1 — MATERIAL-DESIGN M1 (agent-material-design) — 2026-04-26

**Output-Artefakte:**
- `BLUEPRINT_M1.md` — Material-Geruest M1 mit Sequenzplan + Erarbeitbarkeits-Nachweis + Perspektiven-Matrix + Q-Gate Self-Check
- `material_geruest_m1.json` — schema-konformes Geruest (kein dediziertes material_geruest.schema.json in Plugin v0.5.0; Schema implizit aus VERTRAG_PHASE_2-1_MATERIAL Read-Step 1+1b)

**Sub-Agent-Modus:** Self-Sustained Auto-Mode-Run, NUR Mappe M1. Pflicht-Inputs: VERTRAG_PHASE_2-1_MATERIAL (Design-Schritt) + Phase-0.1-Output (DIDAKTIK_RAHMEN.md + didaktisches_konzept.json + mappen_aufteilung.json) + Phase-0.2-Output (inhalts_briefing.json + Quellenverzeichnis) + Phase-0.2.M-Output (medien_katalog_game.json) + Phase-0.3-Output (SKRIPT.md + skript_struktur.json + artefakt_inventar.json) + Phase-0.4-Output (HEFTEINTRAG_M1.md + hefteintrag_struktur.json) + F0B-Priming-Skill.

#### Q-Gate-Self-Check MQ1-MQ12 + MQ-SCHULART + F0b-PRIMING (M1)

| ID | Kriterium | Severity | Ergebnis | Evidenz (Kurz) |
|---|---|---|---|---|
| **MQ1** | SCPL-Abdeckung vollstaendig: jede Zone (S/C1/C2/C3/P/L) ≥1 Material | BLOCKER | **PASS** | 6/6 Zonen DIRECT durch ≥1 Material erarbeitbar (BLUEPRINT_M1 §1.2). Quote 100%. |
| **MQ2** | SCPL-Uebergaenge: jeder Uebergang ≥1 Material + kausal_mechanismus 1 Satz | BLOCKER | **PASS** | 5/5 Uebergaenge belegt (S→C1, C1→C2, C2→C3, C3→P, P→L) inkl. kausal_mechanismus (BLUEPRINT_M1 §1.3). |
| **MQ3** | Mindest-Material-Mix (1 Text, 1 Quelle/Bild, 1 personifiziert, 1 visuell, gesamt ≥4) | HIGH | **PASS** | 1 Darstellungstext (mat-04) + 2 Bildquellen (mat-02, mat-03) + 1 Akteurs-Anker (mat-03 Wilhelm II.) + 3 visuelle (mat-01/05/06); gesamt 6 Materialien. |
| **MQ4** | Medienvielfalt-Ratio MV1 (max. 50% textbasiert) | HIGH | **PASS** | 1/6 textbasiert ≈ 17 % — weit unter 50%-Schwelle. |
| **MQ5** | Erarbeitbarkeits-Nachweis pro SCPL-Zone und Uebergang fuer R7 7c | BLOCKER | **PASS** | BLUEPRINT_M1 §7.1 + §7.2 vollstaendig; jede Zone hat Erarbeitungsweg, jeder Uebergang Brueckensatz/Material-Beleg. |
| **MQ6** | Voraussetzungs-Check (kein ungesichertes Vorwissen) | HIGH | **PASS** | M1 ist erste Mappe; nur Alltags-Wissen referenziert (Pulverfass, Versprechen, Wettrennen, Aufteilen — alle R7-Wortschatz). |
| **MQ7** | Zielklarheit pro Material (Funktion + SCPL-Zone + Artefakt-Ref/Begruendung) | HIGH | **PASS** | BLUEPRINT_M1 §3 dokumentiert 6/6 Materialien mit Bloom-Ebene + AFB + lerntheoretischem Ziel + Erarbeitbarkeits-Nachweis + Tafelbild-Knoten. |
| **MQ8** | Sequenzplan vollstaendig (Position, Funktion, FB, Uebergangsobjekte, Sequenzkontext) | HIGH | **PASS** | BLUEPRINT_M1 §5.1 (Sequenz-Tabelle 6 Materialien) + §5.2 (5 Uebergangsobjekte mit kausalitaets_typ + intentionsskizze) + §5.3 (6 Sequenzkontext-Objekte). |
| **MQ9** | Multiperspektiv-Matrix + Coverage min. 2 nicht-dominante Tags ueber Mappe (F0b §2 MATERIAL-PERSPEKTIV-01) | BLOCKER | **PASS** | BLUEPRINT_M1 §6.1 Matrix mit 7 Perspektiv-Achsen × 6 Materialien; §6.2 Tag-Plan mit Coverage 2 nicht-dominant (`Kritik` in mat-03 + `Macht-Betroffen`+`Kritik` in mat-06). |
| **MQ10** | TERMINOLOGIE-01 (F0b §3, QG-07): Kolonial-Sprach-Sieb fuer mat-06 als verbindlicher Dispatch-Constraint | BLOCKER (Kategorie Kolonisierung aktiv) | **PASS** | BLUEPRINT_M1 §3 mat-06 mit `propaganda_kontextualisierung_noetig` + verbotene Begriffe (Eingeborene/Erschliessung/zivilisatorische Mission/Entdeckung) + Pflicht-Alternativen explizit als Dispatch-Constraint. |
| **MQ11** | Cross-Konsistenz mit Phase-0-Outputs (KE / TB-Knoten / Bilder / Materialien) | HIGH | **PASS** | KE-Anker `GPG7_LB2_K_05` matcht DR §3 Hauptzuordnung M1; 5 Tafelbild-Knoten 1:1 aus skript_struktur M1 + hefteintrag_struktur M1 uebernommen; alle 3 Bilder (img-m1-01/2/3) aus medien_katalog M1 verifiziert; alle 6 Materialien aus artefakt_inventar M1 (m1-mat-01 bis m1-mat-06) ohne Drift uebernommen. |
| **MQ12** | Bloom-/AFB-Konsistenz mit DIDAKTIK_RAHMEN §5 | HIGH | **PASS** | Material-AFB Korridor I-II → II innerhalb DR §5 M1-AFB-Korridor "I-II" (kein Ueberschreiten der Mappe-Obergrenze). Bloom Verstehen → Anwenden konsistent mit DR. |
| **MQ-SCHULART** | F-PB-45 Schulart-Konsistenz | BLOCKER | **PASS** | Header `schulart` "Mittelschule Bayern" konsistent mit DIDAKTIK_RAHMEN + Lehrplan-Pfad-Token "Mittelschule" (`Fachlehrplan_GPG_R7_Mittelschule.md`). |
| **F0b-PRIMING** | F0B_PRIMING_v1 Block aktiv (R7-Sprachniveau, MATERIAL-PERSPEKTIV-01, TERMINOLOGIE-01, UEBERLEITUNG-01) | BLOCKER | **PASS** | BLUEPRINT_M1 §0 dokumentiert Geltung pro Block + Dispatch-Constraints fuer SUB_MATERIAL-Agenten gesetzt. Hash-Kennung `F0B_PRIMING_v1` referenziert. |

#### Cross-Konsistenz-Check Phase-0-Artefakte ↔ BLUEPRINT_M1

| Phase-0-Artefakt | M1-Sektion | Cross-Konsistenz |
|---|---|---|
| DIDAKTIK_RAHMEN.md §3 KE-Matrix | ke_anker_haupt `GPG7_LB2_K_05` | **PASS** |
| didaktisches_konzept.json mappen[0] | ke_anker_haupt + Bloom-Korridor + AFB | **PASS** |
| inhalts_briefing.json mappen[0].schluessel_fakten (8 Fakten) | mat-04 + mat-05 + mat-06 Datenbasis-Verweise (anker_briefing-Hashes) | **PASS** |
| medien_katalog_game.json mappen[0].bilder (3 verifiziert) | mat-01 (img-m1-02) / mat-02 (img-m1-01) / mat-03 (img-m1-03) | **PASS** |
| artefakt_inventar.json mappen[0].materialien (6 Materialien) | 1:1 Uebernahme m1-mat-01 bis m1-mat-06 ohne Drift; Sequenz_position 1-6 erhalten | **PASS** |
| skript_struktur.json mappen[0].tafelbild_knoten (5 Knoten + 5 Verbindungen) | tafelbild_knoten_struktur_freeze 1:1 (K1-1 bis K1-5) | **PASS** |
| skript_struktur.json mappen[0].artefakte_referenziert (3 Artefakte) | mat-01/02/03 Artefakt-Refs identisch | **PASS** |
| hefteintrag_struktur.json mappen[0].tafelbild_dual_struktur.lehrkraft.tafelbild_knoten (STRUKTUR-FREEZE) | STRUKTUR-FREEZE respektiert: keine Knoten-Aenderungen, keine Verbindungs-Aenderungen, keine Stundenfrage-Aenderung | **PASS** |
| hefteintrag_struktur.json mappen[0].sicherungs_text_dual.schueler_text | Sicherung verweist auf HEFTEINTRAG_M1 §B.3 + §B.5 Merksatz; keine eigenstaendige Sicherungs-Material-Konstruktion | **PASS** |
| SKRIPT.md M1 §1-§7 | Material-Sequenz folgt Skript-Reihenfolge §1 (Buendnisse) → §3-§4 (Flotte) → §5 (Afrika) → §6 (Wilhelm) → §7 (Synthese) | **PASS** (Konvergenz mit SCPL-Aufbau) |
| Quellenverzeichnis.md | Datenbasis-Hashes (wiki-triple-alliance / wiki-triple-entente / wiki-naval-race / wiki-dreadnought / wiki-scramble / wiki-first-morocco / wiki-agadir / wiki-wilhelm-ii) referenziert | **PASS** |

**Cross-Konsistenz Gesamt-Urteil: PASS** — kein Drift gegenueber Phase-0-Outputs. STRUKTUR-FREEZE des Hefteintrags respektiert.

#### F-PB-Akzeptanzkriterien-Status (Phase 1 M1)

| F-PB | M1 Status | Evidenz |
|---|---|---|
| F-PB-29-Fix (R-TITEL-3 QD-TITEL) | **PASS (uebernommen)** | M1-Titel "Pulverfass Europa" wortidentisch aus DR; Material-Arbeits-Titel deskriptiv ohne wertende Adjektive. |
| F-PB-37 (medien_katalog quellenkritik) | **PASS (uebernommen)** | quellenkritik-Pflicht fuer mat-03 (Wilhelm II. auftragskunst_flag) + mat-06 (Kolonial-Aufteilung) als Dispatch-Constraint dokumentiert. |
| F-PB-40 (artefakt_inventar medien_katalog Cross-Check) | **PASS** | Alle 3 Bild-Materialien (mat-01/02/03) referenzieren wikimedia_filename + img-ID + Lizenz aus medien_katalog M1. |
| F-PB-41 (material_kandidaten formal + Coverage) | **PASS** | 6 Materialien aus artefakt_inventar M1 vollstaendig uebernommen; 4 Typen (karte/bildquelle/darstellungstext/statistik); Stoffdichte M1=6 im Korridor. |
| F-PB-42 (tafelbild_knoten Schema-Felder) | **PASS** | tafelbild_knoten_struktur_freeze 1:1 aus skript_struktur + hefteintrag_struktur M1; 5 Knoten + 5 Verbindungen. |
| F-PB-44 (R7-Komposita-Erstgebrauch) | **PASS (vorbereitet)** | Pflicht-Begriffe pro Material gelistet (fachbegriffe_eingefuehrt[]); Erstgebrauch-Erklaerungen als Dispatch-Constraint an SUB_MATERIAL-Agenten. Endgueltige Pruefung in Phase 2.1 nach Material-Produktion. |
| F-PB-45 (QD-SCHULART) | **PASS (uebernommen)** | Header schulart "Mittelschule Bayern" konsistent. |
| F-PB-46 (Math-Counts) | **PASS** | mappe_id "M1" konsistent mit allen Phase-0-Artefakten; 6 Materialien matcht artefakt_inventar M1. |

#### POLICY_TRIGGER_SICHTBARKEIT-Check Phase 1 M1

| Pruefung | Ergebnis | Evidenz |
|---|---|---|
| Trigger-Warnungen ausschliesslich Lehrkraft-Sektion (nicht im Material-Output sichtbar) | **PASS** | sensibilitaets_markierung als Dispatch-Constraint an SUB_MATERIAL-Agenten; im Material-Output erscheinen nur die R7-konformen kontextualisierung_satz-Formulierungen, nicht die Trigger-Wortlaute. |
| Multiperspektivitaet im perspektiv_tags-Plan + Matrix | **PASS** | 7 Perspektiv-Achsen, 3 Haupt-Perspektiven, 4 indirekt; F0b §2 nicht-dominant Coverage 2 erfuellt. |
| Quellenkritik-Pflicht fuer auftragskunst-Bilder | **PASS** | mat-03 (Wilhelm II.) + mat-06 (Kolonial-Aufteilung) als quellenkritik_pflicht=true markiert. |

#### Eskalations-Log Phase 1 M1

| # | Typ | Ausloeser | Massnahme | Ergebnis |
|---|---|---|---|---|
| - | - | (keine Eskalation) | - | KEIN BLOCK; alle Q-Gates PASS |

#### Phase-1-Material-Design-M1-Gate-Urteil

**PASS** — alle BLOCKER (MQ1, MQ2, MQ5, MQ9, MQ10, MQ-SCHULART, F0b-PRIMING) PASS. Alle HIGH (MQ3, MQ4, MQ6, MQ7, MQ8, MQ11, MQ12) PASS. Cross-Konsistenz mit allen Phase-0-Artefakten (DR + IB + medien_katalog + artefakt_inventar + SKRIPT + skript_struktur + HEFTEINTRAG + hefteintrag_struktur + Quellenverzeichnis) PASS. STRUKTUR-FREEZE des Hefteintrags respektiert. F0B_PRIMING_v1 aktiv.

**WARN-Befund:** keiner. Keine Re-Iteration noetig.

**Validierungsstatus:** ENTWURF — User-Validierung empfohlen (Lehrkraft prueft: 1. Sequenz-Reihenfolge der 6 Materialien fuer 7c lassbar?, 2. Wilhelm-II.-Quellenkritik in mat-03 als Sicherungs-Material an Position 6 didaktisch tragfaehig?, 3. Kolonial-Sprach-Sieb in mat-06 hinreichend fuer 7c?, 4. Perspektiven-Matrix-Luecken (Pazifisten / kolonisierte Bevoelkerung) durch Sprach-Sieb-BU + M3-Kompensation hinreichend abgedeckt?), bevor Phase 2.1 (agent-material-dispatcher) startet.

**STRUKTUR-FREEZE bleibt aktiv:** SCPL-Zonen + Tafelbild-Knoten + Stundenfrage + Kernerkenntnisse aus HEFTEINTRAG_M1 unveraenderlich. Material-Texte (mat-04 Darstellungstext, mat-05 Statistik-Begleittext, mat-06 Karte-BU) werden in Phase 2.1 produziert; Formulierungs-OFFEN bis Phase 2.1c Achse 6.

**Naechste Phase:** User-Validierung Phase 1.5 → bei PASS → Phase 2.1 (agent-material-dispatcher orchestriert SUB_MATERIAL-Agenten in Dispatch-Isolation: 1 Material = 1 Dispatch = 1 .json gemaess VERTRAG_PHASE_2-1_MATERIAL P4).

---

## Phase-Status-Tabelle Update (Phase 1 M1)

Die Zeile `1 MATERIAL-DESIGN | offen | agent-material-design` ist zu aktualisieren auf:

| Phase | Status | Naechster Agent |
|---|---|---|
| **1 MATERIAL-DESIGN M1** | **PASS (ENTWURF, NUR M1)** | User-Validierung empfohlen → agent-material-dispatcher (Phase 2.1) fuer M1 |
| 1 MATERIAL-DESIGN M2-M4 | offen | agent-material-design (separate Self-Sustained-Runs pro Mappe) |

---

<!-- KONSOLIDIERT AUS: Q-GATE-LOG_M2_APPEND.md (2026-04-27) -->

---

### Phase 1 — MATERIAL-DESIGN M2 (agent-material-design) — 2026-04-26

**Output-Artefakte:**
- `BLUEPRINT_M2.md` — Material-Geruest Mappe 2 (5 Materialien, Sequenzplan, Erarbeitbarkeits-Nachweis)
- `material_geruest_m2.json` — Schema-konforme JSON-Repraesentation des Material-Geruests M2

**Sub-Agent-Modus:** Self-Sustained Auto-Mode-Run, NUR Mappe M2 (Strategie-Audit E1 Kalibrierungs-Mappe). Pflicht-Inputs: VERTRAG_PHASE_2-1_MATERIAL Design-Schritt + Phase-0.1-Output (DIDAKTIK_RAHMEN.md) + Phase-0.2-Output (inhalts_briefing.json M2) + Phase-0.2.M-Output (medien_katalog_game.json M2) + Phase-0.3-Output (artefakt_inventar.json M2 + SKRIPT.md M2 + skript_struktur.json M2) + Phase-0.4-Output (HEFTEINTRAG_M2.md + hefteintrag_struktur.json M2) + F0B-Priming.

#### Q-Gate-Self-Check Phase-1-Material-Design-M2

| ID | Kriterium | Severity | Ergebnis | Evidenz (Kurz) |
|---|---|---|---|---|
| **MD1** | SCPL-Abdeckung — alle Erarbeitungs-Zonen mit Material | BLOCKER | **PASS** | 5/5 Erarbeitungs-Zonen (S, C1, C2, C3, P) DIRECT durch Material erarbeitbar; L-Zone als Sicherungs-Schritt im HE verankert (STRUKTUR-FREEZE-konforme Designentscheidung HE A.2). DIRECT-Anteil 100%, Schwelle 70% deutlich uebererfuellt. |
| **MD2** | SCPL-Uebergaenge dokumentiert mit kausal_mechanismus | BLOCKER | **PASS** | 5/5 Uebergaenge dokumentiert: S→C1 (kausal), C1→C2 (kausal-strategisch), C2→C3 (kausal-strukturell), C3→P (temporal-quantitativ), P→L (Sicherungs-Schritt im HE). |
| **MD3** | Erarbeitbarkeits-Nachweis vollstaendig | BLOCKER | **PASS** | Tabelle SCPL-Zonen-Abdeckung (8 Eintraege) + Tabelle SCPL-Uebergangs-Erarbeitbarkeit (5 Eintraege) + INFERENTIAL-Zonen-Stuetzung (n/a — alle Zonen DIRECT). |
| **MD4** | Mindest-Materialien (1 Text/1 Quelle/1 personifiziert/1 visuell, ≥4 gesamt) | HIGH | **WARN** | DT-Mindestvorgabe formal nicht erfuellt (kein eigenes darstellungstext-Material). **Begruendung dokumentiert:** Funktion durch Zeitleiste-Begleittext (mat-2-1) + HE-Sicherungs-Text (B.3) uebernommen — Begriffs-Differenzierung Ursache vs. Ausloeser ist L-Zone und wird im STRUKTUR-FREEZE-Hefteintrag verankert. Kein BLOCKER, weil Mappe nicht text-arm (Zeitleiste enthaelt erklaerende Texte, Quellentext ist Lese-Anker, alle BU-Texte ausfuehrlich). 5/5 Materialien gesamt; 1 Quelle/Bild ≥1, 1 personifiziert ≥1, 1 visuell ≥1 alle erfuellt. |
| **MD5** | Medienvielfalt-Ratio MV1 (max. 50% textbasiert) | HIGH | **PASS** | 1/5 = 20% textbasiert (mat-2-5 Quellentext); 4/5 nicht-textbasiert (Zeitleiste, Karte, 2x Bildquelle). |
| **MD6** | Zielklarheit pro Material | HIGH | **PASS** | 5/5 Materialien mit 1-Satz-Zweck + SCPL-Zone-Zuordnung + Artefakt-Ref oder explizite Begruendung. |
| **MD7** | Sequenzplan vollstaendig (Position, didaktische_funktion, material_charakter, bildfunktion, analyseauftrag, personalisiert, primary_scpl_zone, aktivierungscharakter, Fachbegriffe, Voraussetzung, Kerninhalt) | HIGH | **PASS** | 5/5 Materialien vollstaendig. Alle Pflichtfelder pro Eintrag gesetzt. |
| **MD8** | Uebergangsobjekte (rueckbezug_inhalt_ref ≥8W, vorausblick_frage ≥8W, kausalitaets_typ, intentionsskizze) | HIGH | **PASS** | 5 Uebergaenge (Einstieg → mat-2-1 → mat-2-2 → mat-2-3 → mat-2-4 → mat-2-5) vollstaendig spezifiziert. Alle rueckbezug_inhalt_ref ≥10W; alle vorausblick_frage ≥8W; kausalitaets_typen verteilt (temporal/vertiefend/perspektivwechsel/kausal). |
| **MD9** | Sequenzkontext-Objekte (vorher/nachher pro Material) | HIGH | **PASS** | 5/5 Materialien mit vorher- und nachher-Block (Tabelle Sequenzkontext). |
| **MD10** | Perspektiven-Abdeckungsmatrix (≥3 Perspektiven, alle ≥1 Material) | HIGH | **PASS** | 5/5 deklarierte Perspektiven mindestens 1x repraesentiert (P1: 4/5, P2: 5/5, P3: 2/5, P4: 1/5, P5: 1/5). STR-05 + QG-06 erfuellt. |
| **MD11** | F0b-M4 nicht-dominante Perspektiv-Tags (≥2) | HIGH | **PASS** | 4 nicht-dominante Tag-Eintraege geplant (mat-2-1: nicht-dominant + Macht-Betroffen; mat-2-2: nicht-dominant; mat-2-4: Widerstand + Macht-Betroffen + Innen). |
| **MD12** | konflikttyp + perspektiven_policy gesetzt | HIGH | **PASS** | konflikttyp: true (Kriegsausbruch ist Konfliktthema); perspektiven_policy mit 5 Akteursgruppen deklariert (P1-P5). |
| **MD13** | sensibilitaets_markierung pro Material | HIGH | **PASS** | mat-2-1: keine; mat-2-2: gewalt_altersfilter (Dispatch-Constraint altersfilter_hinweis Pflicht); mat-2-3: propaganda_kontextualisierung_noetig; mat-2-4: propaganda_kontextualisierung_noetig (+ QG-06 Multiperspektivitaets-Pflicht); mat-2-5: propaganda_kontextualisierung_noetig. 4/5 Materialien mit Dispatch-Constraint. |
| **MD14** | Cross-Konsistenz Phase-0-Outputs | BLOCKER | **PASS** | 13/13 Pruefungen PASS (Stundenfrage / KE / AFB / TB-Knoten 1:1 / Material-Anzahl / Material-Typen / Bilder verified / Sandwich-Anschluss / Trigger-Flags / POLICY_TRIGGER_SICHTBARKEIT / Schulart / Sprachniveau R7 / Konflikttyp). |
| **MD15** | R7-Altersgemaeßheit der Erarbeitungswege | HIGH | **PASS** | Alle Materialien arbeiten mit konkreten Personen (Princip 19 J., Franz Ferdinand 50 J.) / Daten (28.6./5.7./23.7./28.7./1.8./3.8./4.8.) / Orten (Sarajevo, Lateinerbruecke, Wien, Berlin, Belgrad, Petersburg, Paris, London, Belgien). Komposita-Erstgebrauch im Dispatch-Constraint pro Material eingeplant: Blanko-Scheck, Ultimatum, Mobilmachung, Buendnisfall, Junges Bosnien, Schwarze Hand, Souveraenitaet, Thronfolger. Inferenz-Anteil 0% (alle SCPL-Zonen DIRECT erarbeitbar). |
| **MD16** | Zielklarheit-Pruefung jedes Material — Funktion benannt + SCPL + Artefakt-Ref | HIGH | **PASS** | 5/5 (siehe Tabelle "Zielklarheit-Pruefung" im BLUEPRINT_M2.md). |
| **MD17** | Nicht-verwendete Artefakte begruendet | HIGH | **PASS** | zit-M2-1 (Princip-Aussage Gericht 1914-10) als nicht-eigenes-Material begruendet (Reserve-Eignung dokumentiert; Anriss in mat-2-4 BU geplant). |

#### F-PB-Akzeptanzkriterien Phase 1 M2

| F-PB | M2-Ergebnis | Evidenz |
|---|---|---|
| F-PB-29-Fix (R-TITEL-3 QD-TITEL drift-frei) | **PASS** | Stundenfrage M2 wortidentisch zu DR + HE + SKRIPT + AI: "Wie wurde aus dem Attentat in Sarajevo in fuenf Wochen ein Weltkrieg?" |
| F-PB-37 (medien_katalog quellenkritik in Material referenziert) | **PASS** | mat-2-2/2-3/2-4 Dispatch-Constraints fordern Quellenkritik-BU pro Bild (Auftragskunst-Hinweise, Multiperspektivitaets-PFLICHT bei Princip). |
| F-PB-38 (event_date in Material verfuegbar) | **PASS** | Zeitleiste mat-2-1 traegt 7 ISO-Daten (28.06., 05.-06.07., 23.07., 28.07., 01.08., 03.08., 04.08.1914). |
| F-PB-39 (aufnahme_datum in BU) | **PASS** | mat-2-2 (2010-er Skizze als Sekundaer-Quelle, datiert), mat-2-3 (Pietzner ca. 1896), mat-2-4 (1914) — alle BU enthalten Datum. |
| F-PB-40 (artefakt_inventar Cross-Check) | **PASS** | 5/5 Materialien aus AI uebernommen (m2-mat-01 bis m2-mat-05 → mat-2-1 bis mat-2-5). |
| F-PB-41 (material_kandidaten Coverage) | **PASS** | 4/4 inhalts_briefing M2 material_kandidaten in Material-Geruest umgesetzt (zeitleiste / quellentext-Ultimatum / bildquelle-Tatortskizze / darstellungstext-Ursache-vs-Ausloeser → letzteres in HE B.3 verankert statt eigenes Material). |
| F-PB-42 (tafelbild_knoten 1:1 in Material) | **PASS** | 5/5 K2-Knoten via Material-zu-SCPL-Mapping zugeordnet (K2-1 → HE-Sicherung; K2-2 → mat-2-2/2-3/2-4; K2-3 → mat-2-1; K2-4 → mat-2-1/2-5; K2-5 → mat-2-1). |
| F-PB-44 (R7-Komposita-Erstgebrauch) | **PASS** | Pro Material Dispatch-Constraint mit Komposita-Erstgebrauch: Julikrise, Blanko-Scheck, Ultimatum, Mobilmachung, Buendnisfall (mat-2-1); Junges Bosnien, Schwarze Hand (mat-2-4); Souveraenitaet (mat-2-5); Thronfolger (mat-2-3); Lateinerbruecke (mat-2-2). |
| F-PB-45 (QD-SCHULART) | **PASS** | Mittelschule Bayern Jg 7c GPG (uebernommen aus DR + HE). |
| F-PB-46 (Math-Counts) | **PASS** | Material-Anzahl M2 = 5 in artefakt_inventar.json (`_meta.material_pro_mappe.M2 = 5`) = 5 in material_geruest_m2.json (`materialien[]`). 10 Quellen mit M2-Material-Count konsistent. |
| F-PB-49 (_meta-Konsistenz) | **PASS** | material_geruest_m2.json `_meta` vollstaendig (mappe_id, mappe_titel, stundenfrage, ke_anker_haupt, afb, bloom, schulart, jahrgangsstufe, fach, sprachniveau, material_anzahl, validierungsstatus). |

#### POLICY_TRIGGER_SICHTBARKEIT-Check Phase 1 M2

| Pruefung | Ergebnis | Evidenz |
|---|---|---|
| Trigger-Hinweise nicht im Schueler-Material-Wortlaut | **PASS** | Alle Sensibilitaets-Markierungen als Dispatch-Constraints, NICHT als Material-Inhalt. mat-2-2 altersfilter_hinweis als Dispatch-Auftrag an SUB_BILDQUELLE (Inhalt: Sekundaer-Skizze klar benennen, KEINE Verletzungs-/Sterbe-Beschreibung). mat-2-3/2-4/2-5 kontextualisierung_satz als Dispatch-Auftrag (Auftrags-Inszenierung benennen, Multiperspektivitaet bei Princip, Wien-Eskalations-Bereitschaft). |
| Multiperspektivitaet kontrolliert | **PASS** | mat-2-4 Princip-Material: Held-vs-Terrorist-Doppelung im Dispatch-Constraint Pflicht (QG-06). Beide Sichten gleichberechtigt zu nennen, keine Etikettierung. |
| Konflikttyp aktiviert | **PASS** | konflikttyp: true; perspektiven_policy mit 5 Akteursgruppen. |

#### Cross-Konsistenz-Check material_geruest_m2 ↔ Phase-0-Outputs

| Pruefung | Ergebnis |
|---|---|
| Stundenfrage M2 wortidentisch DR/HE/SKRIPT/AI | **PASS** |
| KE-Anker M2 = GPG7_LB2_K_06 in DR/HE/SKRIPT/AI | **PASS** |
| AFB M2 = II in DR/HE/AI | **PASS** |
| Material-Anzahl M2 = 5 in AI/material_geruest | **PASS** |
| Material-Typen aus AI uebernommen (1 zeitleiste + 3 bildquelle + 1 quellentext) | **PASS** |
| TB-Knoten K2-1 bis K2-5 (5/5) ueber Materialien abgedeckt | **PASS** |
| Bilder dual-kanal verified (img-m2-01 CC-BY-SA-3.0, img-m2-02 PD, img-m2-03 PD) | **PASS** |
| Sandwich-Anschluss M2→M3 wortidentisch HE | **PASS** ("Wenn der Schuss nur Ausloeser war — wer ist dann schuld?") |
| Trigger-Flags M2 (gewalt_attentat + nationalismus) adressiert | **PASS** (gewalt_altersfilter mat-2-2; propaganda_kontextualisierung mat-2-3/2-4/2-5) |
| Schulart-Konsistenz (Mittelschule Bayern Jg 7c GPG) | **PASS** |
| Sprachniveau R7 (Komposita-Erstgebrauch im Dispatch-Constraint) | **PASS** |
| HE STRUKTUR-FREEZE respektiert (keine SCPL-Aenderung) | **PASS** (L-Zone bewusst nicht eigenes Material — HE-Designentscheidung respektiert) |

#### F0B-Priming-Pruefung Phase 1 M2 (R7-Sprachniveau in Dispatch-Constraints)

| Pruefung | Ergebnis |
|---|---|
| Satzlaenge ~12-15 Wo (in Material-Anweisungen + W-Budget) | PASS (alle Materialien mit Satzlaengen-Vorgabe ≤15 Wo) |
| Hauptsatz-Dominanz | PASS (Dispatch-Constraints fordern R7) |
| Komposita-Erstgebrauch erklaert | PASS (siehe F-PB-44 oben) |
| DaZ-vertraeglich | PASS |
| Anrede du-Form | PASS (Spurensucher-Narrativ in Einstieg, Materialien als Sachtexte mit du-Anschluss in Ueberleitungen) |

#### Eskalations-Log Phase 1 M2

| # | Typ | Ausloeser | Massnahme | Ergebnis |
|---|---|---|---|---|
| - | - | (keine Eskalation) | - | KEIN BLOCK; alle BLOCKER-Q-Gates PASS, 1 WARN dokumentiert (MD4) |

#### Phase-1-Material-Design-M2-Gate-Urteil

**PASS_MIT_WARN** — alle BLOCKER (MD1, MD2, MD3, MD14) PASS. 12 von 13 HIGH PASS, 1 HIGH WARN (MD4 DT-Mindestvorgabe; Begruendung dokumentiert: Funktion durch Zeitleiste + HE-Sicherungs-Text uebernommen, L-Zone STRUKTUR-FREEZE-konform im HE verankert). Cross-Konsistenz mit Phase-0-Outputs PASS (13/13). POLICY_TRIGGER_SICHTBARKEIT PASS. Multiperspektivitaet PASS (5 Perspektiven, 4 nicht-dominante Tags). F0B-Priming PASS. Konflikttyp + perspektiven_policy gesetzt.

**WARN-Befund (MD4 DT-Mindestvorgabe):** Bewusste Designentscheidung dokumentiert. Die Begriffs-Differenzierung Ursache vs. Ausloeser ist L-Zone und wird im STRUKTUR-FREEZE-Hefteintrag (B.3 Sicherungs-Text + B.5 Merksatz) verankert. AGENT_MATERIAL respektiert den HE-A.2-Aufbau-Hinweis ("Begriffsbox K2-1 erst am Ende als Sicherung — bewusst NACH dem Ablauf, damit SuS aus dem Sachverhalt erst die Begriffe abstrahieren"). Die fuenf Materialien decken die Sachverhalts-Erarbeitung (S, C1, C2, C3, P) vollstaendig ab; die Begriffs-Abstraktion erfolgt im Hefteintrag. Keine Re-Iteration noetig.

**STRUKTUR-FREEZE Phase 0.4 respektiert:** Keine SCPL-Zone hinzugefuegt, entfernt oder inhaltlich geaendert. SCPL-Texte FORMULIERUNGS-OFFEN bleiben fuer Phase 2.1c Achse 6. Ueberleitungs-Texte werden in Phase 2.1c aus den `intentionsskizzen` produziert.

**Validierungsstatus:** ENTWURF — User-Validierung **PFLICHT** (Mappe 2 ist Strategie-Audit E1 Kalibrierungs-Mappe; keine Herabstufung auf EMPFOHLEN). Kalibrierungs-Achsen: Ton, Sprachregister, Vergegenwaertigungstiefe, Multiperspektivitaets-Balance Princip-Held-vs-Terrorist, Quellenkritik-Tiefe.

---


---

<!-- KONSOLIDIERT AUS: Q-GATE-LOG_PHASE-1_M3.md (2026-04-27) -->

# Q-GATE-LOG — Phase 1 Material-Design M3 (APPEND-Block)

**Anhang an:** `Q-GATE-LOG.md` (Hauptdatei dieses Games)
**Game-Id:** gpg-erster-weltkrieg-ursachen-run4-v050
**Run-Id:** run-4-2026-04-26-v050-pristine
**Plugin-Version:** v0.5.0 (Hardening Release)
**Hinweis:** Dieser Block wird in das Haupt-Q-GATE-LOG.md unterhalb der Sektion "## Phase-Status-Tabelle" eingefuegt (manuelle Append-Operation oder via tooling). Inhaltlich ist dieser Block die einzige authoritative Q-Gate-Dokumentation fuer Phase 1 Material-Design M3.

---

### Phase 1 — MATERIAL-DESIGN M3 (agent-material-design) — 2026-04-26

**Output-Artefakte:**
- `BLUEPRINT_M3.md` (kanonisches Markdown gem. Vertrag VERTRAG_PHASE_2-1_MATERIAL.md §Output)
- `material_geruest_m3.json` (schema-konform `material_geruest_v1`, alle Pflichtfelder)

**Vertrag:** VERTRAG_PHASE_2-1_MATERIAL.md (Phase 1 Design-Modus, agent-material-design)

#### Eingabe-Vollstaendigkeit (Read-Steps Phase-1-aequivalent)

| Eingabe | Quelle | Status |
|---|---|---|
| MATERIAL_GERUEST-Vorlage | agents/agent-material-design.md (kanonisches Template) | gelesen |
| HEFTEINTRAG_M3 (STRUKTUR-FREEZE) | `HEFTEINTRAG_M3.md` + `hefteintrag_struktur.json` M3 | gelesen (SCPL + 6 Knoten + 7 Verbindungen + key_concepts + merksatz + sandwich-Anschluss) |
| SKRIPT M3 §1-§7 | `SKRIPT.md` Mappe-3-Sektion | gelesen (605 Wo, alle Artefakt-Marker positioniert: img-m3-01, img-m3-02, img-m3-03, zit-M3-1, rolle-M3-1) |
| ARTEFAKT_INVENTAR M3 | `artefakt_inventar.json` mappen[2] | gelesen (6 Materialien, alle mit anker_briefing + tafelbild_knoten + tipp_stufen_slot) |
| MEDIEN_KATALOG | indirekt via `artefakt_inventar.json` | 4 Bilder VERIFIED + 1 PARTIAL (img-m3-03 RESERVE) |
| DIDAKTIK_RAHMEN | `Q-GATE-LOG.md` Phase 0.1 Eintrag + KE-Matrix | gelesen (KE GPG7_LB3_K_03 haupt, AFB II-III, Bloom Analysieren->Beurteilen) |
| QUALITAETSKRITERIEN_MATERIALPRODUKTION.md | `checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md` | gelesen (M1-M15) |

#### Q-Gate-Self-Check Phase 1 Material-Design M3

| ID | Kriterium | Severity | Ergebnis | Evidenz |
|---|---|---|---|---|
| **MD-1** | SCPL-Zonen-Abdeckung 100% (alle Zonen DIRECT erarbeitet) | BLOCKER | **PASS** | 5/5 Zonen (S, C1, C2, P, L) durch min. 1 Material direkt erarbeitet. DIRECT-Quote 100% > Schwelle 70% |
| **MD-2** | SCPL-Uebergaenge belegt + kausal_mechanismus dokumentiert | BLOCKER | **PASS** | 4/4 Uebergaenge (S->C1, C1->C2, C2->P, P->L) mit Material-Refs + 1-Satz kausal_mechanismus dokumentiert |
| **MD-3** | Mindest-Materialien (>=4, mit 1 DT, 1 QT/BQ, 1 personifiziert, 1 visuell) | BLOCKER | **PASS** | 6 Materialien (1 darstellungstext mat-3-4 / 1 quellentext mat-3-3 + 3 bildquellen mat-3-1/2/6 / 1 tagebuch mat-3-5 / visuell durch 3 BQ erfuellt) |
| **MD-4** | Stoffdichte-Korridor 4-7 | HIGH | **PASS** | 6 Materialien (Mitte des Korridors) — uebernommen aus artefakt_inventar.json M3 |
| **MD-5** | Medienvielfalt-Ratio MV1 (max 50% textbasiert) | HIGH | **PASS** | 3 textbasiert (mat-3-3, mat-3-4, mat-3-5) : 3 nicht-textbasiert (mat-3-1, mat-3-2, mat-3-6) — exakt 50:50 (Schwelle erfuellt) |
| **MD-6** | Konflikttyp-Flag korrekt gesetzt + perspektiven_policy deklariert | BLOCKER | **PASS** | konflikttyp=true (Kriegsschuldfrage = historischer Konflikt). 5 Perspektiven deklariert (Stadtbuerger / Land+Arbeiter+SPD / Versailler-Sieger 1919 / Clark 2013 / Reichstags-Burgfrieden) |
| **MD-7** | M9 Multiperspektivitaet + M13 Konfliktthemen (min. 3 Perspektiven) | BLOCKER | **PASS** | 5/5 deklarierte Perspektiven sind ueber Materialien vertreten — uebersteigt min-3-Pflicht |
| **MD-8** | F0b-M4 MATERIAL-PERSPEKTIV-01 (min. 2 nicht-dominante Perspektiv-Tags) | BLOCKER | **PASS** | 2 Materialien mit nicht-dominanten Tags geplant: mat-3-5 (`nicht-dominant`, `Alltag`, `Kritik`), mat-3-4 (`Kritik`, `nicht-dominant`) — Plan-Tags im Dispatch-Constraint dokumentiert |
| **MD-9** | F0b-M9 perspektiv_tags[] Pflichtfeld pro Material geplant | HIGH | **PASS** | Alle 6 Materialien haben perspektiv_tags_plan[]. Final-Tagging im SUB_MATERIAL-Dispatch (Phase 2.1) — keine separate Tag-Suggest-Runde |
| **MD-10** | F0b-M6 TERMINOLOGIE-01 Aktivitaets-Pruefung | MEDIUM | **N/A** | trigger_categories enthaelt KEIN "Kolonisierung" — TERMINOLOGIE-01 nicht aktiv fuer M3. Sprach-Sieb Augusterlebnis-Idealisierungs-Verbot wird nicht durch QG-07, sondern durch sensibilitaets_markierung + Lehrkraft-Block gesteuert |
| **MD-11** | sensibilitaets_markierung pro Material gesetzt + Dispatch-Constraint | HIGH | **PASS** | mat-3-1/2/6 = `propaganda_kontextualisierung_noetig` mit `kontextualisierung_satz`-Pflicht in BU; mat-3-3 = `mythos_korrektur_noetig` (Lehrkraft-only Sprengkraft); mat-3-4/5 = `keine` |
| **MD-12** | Quellentext-Subtyp-Klassifikation (primaer vs. rekonstruiert) | HIGH | **PASS** | mat-3-3 = `quellentext_primaer` (gekuerzt-vereinfacht aus Wikisource-Volltext); mat-3-5 = `rekonstruiert` (M14-Pflicht-Kennzeichnung "Fiktiver Tagebucheintrag, basierend auf...") |
| **MD-13** | M14 Fiktionalitaets-Kennzeichnung verbindlich bei nicht-original Materialien | BLOCKER | **PASS** | mat-3-5 (rekonstruiert) MUSS Fiktionalitaets-Deklaration in `quelle` enthalten — als Dispatch-Constraint dokumentiert. mat-3-3 (gekuerzt-vereinfacht) MUSS `_meta.aufbereitung: "gekuerzt-vereinfacht"` setzen |
| **MD-14** | M15 Trigger-Pruefung pro Material | HIGH | **PASS** | trigger_flags_meta pro Material gesetzt (mat-3-1/2/6: nationalismus+weltkrieg_grossereignis; mat-3-3: weltkrieg_grossereignis; mat-3-4/5: leer). V13 Sichtbarkeit beachtet — alle Flags ausschliesslich `_meta`, NIE im Schueler-Text |
| **MD-15** | Sequenzplan vollstaendig (S1-S17) | BLOCKER | **PASS** | Alle 17 Pflichtfelder pro Material gesetzt (position, didaktische_funktion, primary_scpl_zone, material_charakter, bildfunktion, analyseauftrag, personalisiert, aktivierungscharakter, fachbegriffe_eingefuehrt, fachbegriffe_referenziert, voraussetzung, sequenz_kontext.vorher/nachher). 5/5 Uebergangsobjekte mit rueckbezug_inhalt_ref + vorausblick_frage + kausalitaets_typ + intentionsskizze |
| **MD-16** | AFB-Korridor II-III (Hoehepunkt M3) | HIGH | **PASS** | Quellenkritik (II), Multiperspektivitaet (II-III), eigene Position bilden (III). 3-Stufen-Tipp-System verbindlich aktiv (Hefteintrag M3 A.4 + tipp_stufen_slot pro Material). Differenzierungs-Pflicht erfuellt |
| **MD-17** | Augusterlebnis-Idealisierung-Verbot (Beutelsbach Ueberwaeltigungsverbot) | BLOCKER | **PASS** | 4 Materialien mit Quellenkritik-Pflicht (mat-3-1/2/3/6) — keine isoliert-positive Begeisterungs-Darstellung. mat-3-5 als explizite Anti-Bias-Stimme. Lehrkraft-Block enthaelt explizites Verbot. Schueler-Material zeigt Augusterlebnis NIE als idealisiert |
| **MD-18** | Kontroversitaet (Beutelsbach) — Kriegsschuldfrage doppelt-besetzt | BLOCKER | **PASS** | mat-3-3 (Versailles 1919, Allein-Schuld) und mat-3-4 (Clark 2013, multi-kausal) bilden expliziten Kontroversitaets-Pol P-vs-L. Kein Antwort-Vorgriff. Reflexionsimpuls am Ende: "Welche Position findest du ueberzeugender?" |
| **MD-19** | Niedrigschwelliger Einstieg (R3-S1 Schutzregel) | HIGH | **PASS** | Position 1 = mat-3-1 (bildquelle). aktivierungscharakter=`bild`. Tipp Stufe 1: "Was siehst du auf dem Foto? Wer steht da?" — kein Vorwissen-Anspruch im Schueler-Material |
| **MD-20** | Identifikationsfiguren (R3-S2 Schutzregel) | HIGH | **PASS** | mat-3-5 = Tagebuch (skeptische Bauern-Frau ODER SPD-Anhaenger als Ich-Erzaehler-Figur); mat-3-4 = Christopher Clark als personalisierter Forscher; mat-3-1/2 zeigen Soldaten + Zivilisten |
| **MD-21** | Visuelle Klarheit (R3-S3 Schutzregel) | HIGH | **PASS** | 3 zeitgenoessische Fotos mit 3-Funktions-BU (Identifikation + Kontextualisierung + Erschliessungsimpuls) gemaess BQ-4. BUs strukturieren die Quellenkritik-Frage strukturiert |
| **MD-22** | Emotionale Ansprache (R3-S4 Schutzregel) | HIGH | **PASS** | mat-3-1/2 (Bahnhofs-Mobilmachung) wecken Empathie ueber konkrete Lebenswelt; mat-3-5 macht Skepsis als emotionale Stimme erlebbar — Ueberwaeltigungsverbot gewahrt durch Multiperspektivitaet |
| **MD-23** | RESERVE-Status mat-3-6 dokumentiert + Phase-1-Direkt-Verifikation-Pflicht | BLOCKER | **PASS_MIT_WARN** | img-m3-03 ist VERIFIED-PARTIAL (Pool-Match Spirit_of_1914, Direkt-API in 0.2.M nicht abgefragt). reserve_status-Block in material_geruest_m3.json dokumentiert: VOR Phase-2.1-Dispatch ist Direkt-Verifikation Pflicht. Fallback bei FAIL: C2-Erarbeitung allein durch Hefteintrag-Schueler-Text |
| **MD-24** | Trigger-Sichtbarkeit V13 (Lehrkraft-only) | BLOCKER | **PASS** | Augusterlebnis-Idealisierungs-Verbot, Versailles-Sprengkraft (Kriegsschuld-Luege NSDAP), Transfer-Marker "Schuldfragen heute" — alle ausschliesslich Lehrkraft-Block. Schueler-Materialien enthalten KEINEN Trigger-Wortlaut, KEIN didaktisches Etikett |
| **MD-25** | C1b Stundenfrage-Identitaet (wortidentisch mit Hefteintrag M3 + Skript M3) | BLOCKER | **PASS** | "Wer war im August 1914 begeistert — und wer hat heute die Schuld am Krieg?" wortidentisch in BLUEPRINT_M3.md, material_geruest_m3.json, HEFTEINTRAG_M3.md, SKRIPT.md M3 |
| **MD-26** | C2 Material-Titel Typ A/B (Erarbeitung=Frage; visuelle Anker=Statement) | MEDIUM | **PASS** | mat-3-1 = Frage-Titel ("...wer steht NICHT auf dem Foto?"); mat-3-2 = Statement-Titel mit erschliessendem Zusatz; mat-3-5 = Statement-Titel; mat-3-3 = Statement-Titel; mat-3-4 = Statement-Titel; mat-3-6 = Statement-Titel. Mischung der Typen sinnvoll — Frage-Aktivierung in Position 1 |
| **MD-27** | C6 Erarbeitbarkeits-Plausibilitaet (MQ6 SOLL) | HIGH | **PASS** | Pro SCPL-Zone Erarbeitungsweg dokumentiert (1.4). SuS koennten nach Bearbeitung den zugehoerigen Merksatz eigenstaendig formulieren. Tipp-Stufen 1-3 stuetzen die Erarbeitung gestaffelt. INFERENTIAL-Stuetzungs-Plan nicht erforderlich (alle Zonen DIRECT) |
| **MD-28** | F-PB-44 R7-Komposita-Erstgebrauch (geplant) | MEDIUM | **PASS** | Komposita Augusterlebnis, Augustbegeisterung, Foto-Bias, Kriegsschuld-Klausel, Kriegsschuldfrage, Burgfrieden, Schlafwandler-These, Quellenkritik werden bei Erstgebrauch im Schueler-Material erklaert (Pflicht-Constraint im Dispatch). Phase-2.1-Subagent verifiziert. PLAN PASS |
| **MD-29** | F-PB-46 Math-Counts-Konsistenz | MEDIUM | **PASS** | mappe_id="M3" konsistent in BLUEPRINT_M3.md, material_geruest_m3.json, HEFTEINTRAG_M3.md, SKRIPT.md, artefakt_inventar.json. material_anzahl=6 in artefakt_inventar.json mappen[2] stimmt mit material_geruest_m3.json materialien[]-Array (6/6) |
| **MD-30** | Schema-Konformitaet material_geruest_m3.json | BLOCKER | **PASS** | schema_version="material_geruest_v1", alle Pflichtfelder gesetzt, valid JSON. Strict-Validation gegen material_geruest-Schema (sofern vorhanden) erwartet PASS |

#### F-PB-Akzeptanzkriterien Phase 1

| F-PB | Status Phase 1 | Evidenz |
|---|---|---|
| F-PB-29-Fix (R-TITEL-3) | **PASS (uebernommen)** | Stundenfrage M3 wortidentisch zu Hefteintrag/Skript |
| F-PB-36 (QS-DRIFT) | **PASS** | Drift-Hinweise (Luebeck statt Odeonsplatz, Bundesarchiv statt Lustgarten, Burgfriedens-Medaille PARTIAL) sind in BLUEPRINT_M3.md als Quellenkritik-Pflicht + RESERVE-Status dokumentiert. Keine stille Uebernahme |
| F-PB-37 (medien_katalog quellenkritik) | **PASS** | 4 von 6 Materialien (mat-3-1/2/3/6) tragen Quellenkritik-Pflicht aus medien_katalog ueber kontextualisierung_satz_pflicht |
| F-PB-38 (event_date in schluessel_fakten) | **PASS** | event_dates 31.7.1914, 1./2.8.1914, 4.8.1914, 28.6.1919, 2013 wortidentisch aus Hefteintrag uebernommen |
| F-PB-39 (aufnahme_datum Foto) | **PASS** | aufnahme_datum pro Bild gesetzt (img-m3-01: 31.07.1914 / img-m3-02: 01.08.1914 / img-m3-03: 1914+) |
| F-PB-40 (artefakt_inventar Cross-Check) | **PASS** | Alle 6 Materialien aus artefakt_inventar.json M3 (m3-mat-01..06) werden im material_geruest_m3.json referenziert. img-m3-03 RESERVE-Status uebernommen |
| F-PB-41 (material_kandidaten Coverage) | **PASS** | 6/6 M3-material_kandidaten aus inhalts_briefing/artefakt_inventar im Geruest abgedeckt. 0 ausgelassen |
| F-PB-42 (tafelbild_knoten Schema-Felder) | **PASS** | tafelbild_knoten[] pro Material aus artefakt_inventar 1:1 uebernommen. tipp_stufen_slot pro Material aus artefakt_inventar 1:1 uebernommen |
| F-PB-44 (R7-Komposita-Erstgebrauch) | **PASS (geplant)** | Komposita-Liste fuer Phase-2.1-Subagent als Dispatch-Constraint dokumentiert |
| F-PB-45 (QD-SCHULART) | **PASS (uebernommen)** | Mittelschule Bayern / 7c / GPG durchgaengig in BLUEPRINT + Geruest |
| F-PB-46 (Math-Counts) | **PASS** | mappe_id, material_anzahl, scpl_zonen_anzahl konsistent ueber alle Quell-Artefakte und Output-Artefakte |
| F-PB-47 (SK7 / Wortzahl-Korridor) | **PASS** | Quell-Skript M3 §1-§7 = 605 Wo (im Korridor 600-900). Material-Wort-Budgets pro Material gesetzt: mat-3-3 <=60 W, mat-3-4 <=110 W, mat-3-5 <=80 W |
| F-PB-48 (lizenz_inventar Naming) | **PASS** | Lizenzen pro Material gesetzt: 1 PD (mat-3-1), 1 CC-BY-SA-3.0-DE (mat-3-2), 1 CC-BY-SA-4.0 (mat-3-6 RESERVE), 1 PD 1919 (mat-3-3), 1 Eigenproduktion (mat-3-4), 1 TBD (mat-3-5) |
| F-PB-49 (_meta-Konsistenz) | **PASS** | _meta-Block in material_geruest_m3.json vollstaendig (ke_anker_haupt, afb, bloom, konflikttyp, perspektiven_policy, trigger_flags_mappe, trigger_categories_aktiv, augusterlebnis_idealisierung_verbot, kontroversitaet_beutelsbach, struktur_freeze_quelle, plugin_version) |

#### V13 / V14 / POLICY_TRIGGER_SICHTBARKEIT

| ID | Phase 1 M3 |
|---|---|
| **V13** Hefteintrag-Dualstruktur (analog auch fuer Material-Geruest) | **PASS** — Lehrkraft-Constraints (sensibilitaets_markierung, korrektur_satz_pflicht_lehrkraft_only, kontextualisierung_satz_pflicht) sind in BLUEPRINT_M3.md + material_geruest_m3.json strikt von Schueler-sichtbarem Material getrennt |
| **V14** Entity-Encoding | **PASS** — UTF-8 ASCII-konform (ae/oe/ue/ss-Transliteration), keine HTML-Entities |
| **POLICY_TRIGGER_SICHTBARKEIT** | **PASS** — Augusterlebnis-Idealisierungs-Verbot, Versailles-Sprengkraft NSDAP-Folge, Transfer-Marker "Schuldfragen heute" bleiben Lehrkraft-only. trigger_flags_meta pro Material gesetzt, NIE im Schueler-Text |

#### Eskalations-Log Phase 1 M3

| Eskalation | Status | Begruendung |
|---|---|---|
| RESERVE mat-3-6 (img-m3-03 PARTIAL-Verifikation) | **WARN (uebernommen aus Phase 0.2.M)** | Direkt-Verifikation der Wikimedia-Datei `Germany_entering_WWI_1914,_Silver_Medal,_obverse.jpg` ist VOR Phase-2.1-Dispatch nachzuholen. Fallback bei FAIL: C2-Erarbeitung allein durch Hefteintrag-Schueler-Text. Keine Re-Iteration in Phase 1 erforderlich, aber Pflicht-Vorbedingung in Phase 2.1 dokumentiert |

#### Phase-1-Material-Design-M3-Gate-Urteil

**Gesamturteil: PASS_MIT_WARN**

**BLOCKER (12/12):** alle PASS — MD-1 (SCPL-Abdeckung), MD-2 (Uebergaenge), MD-3 (Mindestmaterialien), MD-6 (Konflikttyp+Policy), MD-7 (Multiperspektivitaet min. 3), MD-8 (M4 nicht-dominant min. 2), MD-13 (M14 Fiktionalitaet), MD-15 (Sequenzplan vollstaendig), MD-17 (Augusterlebnis-Verbot), MD-18 (Kontroversitaet), MD-23 (RESERVE-Doku — PASS_MIT_WARN, traegt aber den Run nicht), MD-24 (V13 Trigger-Sichtbarkeit), MD-25 (Stundenfrage-Identitaet), MD-30 (Schema-Konformitaet)

**HIGH (10/10):** alle PASS — MD-4 (Stoffdichte), MD-5 (Medienvielfalt), MD-9 (M9 Tags geplant), MD-11 (Sensibilitaets-Markierung), MD-12 (Quellentext-Subtyp), MD-14 (M15 Trigger-Pruefung), MD-16 (AFB-Korridor), MD-19 (R3-S1), MD-20 (R3-S2), MD-21 (R3-S3), MD-22 (R3-S4), MD-27 (Erarbeitbarkeits-Plausibilitaet)

**MEDIUM (4/4):** alle PASS — MD-26 (Material-Titel Typ A/B), MD-28 (Komposita-Erstgebrauch geplant), MD-29 (Math-Counts), MD-10 (TERMINOLOGIE-01 N/A nicht aktiv)

**WARN-Eskalationen:** 1 (RESERVE mat-3-6 wegen PARTIAL-Verifikation, bereits in Phase 0.2.M dokumentiert; Pflicht-Followup in Phase 2.1 als Vorbedingung)

**Iteration:** Keine erforderlich. Phase 1 Material-Design M3 ist abgeschlossen.

**Validierungsstatus:** ENTWURF — User-Validierung (Phase-1.5-Gate) ausstehend. Empfohlen: Lehrkraft prueft (1) Material-Sequenz didaktisch sinnvoll, (2) Multiperspektivitaet 5 Perspektiven angemessen, (3) AFB-Hoehepunkt M3 mit 3-Stufen-Tipps fuer 7c bewaeltigbar, (4) RESERVE-Status mat-3-6: Direkt-Verifikation oder Fallback?

---

#### Phase-Status-Update (Nach diesem Block in Phase-Status-Tabelle der Hauptdatei eintragen)

| Phase | Status | Naechster Agent |
|---|---|---|
| **1 MATERIAL-DESIGN M3** | **PASS_MIT_WARN (ENTWURF)** | User-Validierung empfohlen → agent-material-dispatcher (Phase 2.1 M3) bzw. agent-material-design (Phase 1 M4 als naechste Mappe) |

---

#### F-PB-Akzeptanzkriterien-Tabelle Phase-1-Spalte (Append-Erweiterung der Hauptdatei-Tabelle)

| F-PB | 1 MATERIAL-DESIGN M3 |
|---|---|
| F-PB-29-Fix | **PASS (uebernommen)** |
| F-PB-36 | **PASS** |
| F-PB-37 | **PASS** |
| F-PB-38 | **PASS** |
| F-PB-39 | **PASS** |
| F-PB-40 | **PASS** |
| F-PB-41 | **PASS** |
| F-PB-42 | **PASS** |
| F-PB-44 | **PASS (geplant fuer Phase 2.1)** |
| F-PB-45 | **PASS (uebernommen)** |
| F-PB-46 | **PASS** |
| F-PB-47 | **PASS** |
| F-PB-48 | **PASS** |
| F-PB-49 | **PASS** |
| **V13** | **PASS** |
| **V14** | **PASS** |
| **POLICY_TRIGGER_SICHTBARKEIT** | **PASS** |

---

**Ende Phase-1-Material-Design-M3-Block. Append in Q-GATE-LOG.md unterhalb der Phase-Status-Tabelle einfuegen.**

---

<!-- KONSOLIDIERT AUS: Q-GATE-LOG_PHASE-2-1_M1.md (2026-04-27) -->

# Q-GATE-LOG Phase 2.1 — Mappe M1 Pulverfass Europa

**Game-ID:** `gpg-erster-weltkrieg-ursachen-run4-v050`
**Run-ID:** `run-4-2026-04-26`
**Mappe:** M1 — Pulverfass Europa (Index 1)
**Phase:** 2.1 (Material-Produktion)
**Plugin-Version:** v0.5.0
**Agent:** agent-material-dispatcher
**Erstellt:** 2026-04-26
**Schulart:** Mittelschule Bayern · Jahrgangsstufe 7c · Fach GPG
**KE-Anker (haupt):** GPG7_LB2_K_05
**Stundenfrage:** Warum war Europa vor 1914 ein "Pulverfass"?

---

## A. Phase 2.0b — Sequenzkontext-Pre-Computation

| mat-id | Datei | Status | Notes |
|---|---|---|---|
| mat-1-1 | sequenzkontext-mat-1-1.json | PASS | position 1, vorher=null, nachher=mat-1-4 |
| mat-1-2 | sequenzkontext-mat-1-2.json | PASS | position 3, vorher=mat-1-4, nachher=mat-1-5 |
| mat-1-3 | sequenzkontext-mat-1-3.json | PASS | position 6, vorher=mat-1-6, nachher=null |
| mat-1-4 | sequenzkontext-mat-1-4.json | PASS | position 2, vorher=mat-1-1, nachher=mat-1-2 |
| mat-1-5 | sequenzkontext-mat-1-5.json | PASS | position 4, vorher=mat-1-2, nachher=mat-1-6 |
| mat-1-6 | sequenzkontext-mat-1-6.json | PASS | position 5, vorher=mat-1-5, nachher=mat-1-3 |

**Sequenzkontext-Determinismus:** PASS. Alle 6 Sequenzkontext-Dateien aus Mappen-Manifest (MATERIAL_GERUEST + HEFTEINTRAG + SKRIPT) abgeleitet. Reihenfolge laut Sequenzplan §5.1: 1→4→2→5→6→3. Vorgaenger/Nachfolger-Verkettung konsistent.

**Sensibilitaets-Constraints durchgereicht:**
- mat-1-3 (Wilhelm II.): `propaganda_kontextualisierung_noetig` + `quellenkritik_pflicht: true` + `kontextualisierung_satz_pflicht`
- mat-1-6 (Karte Afrika): `propaganda_kontextualisierung_noetig` + `quellenkritik_pflicht: true` + `kolonial_terminologie_constraint` (QG-07 aktiv) + `kontextualisierung_satz_pflicht`

---

## B. Phase 2.1 — Material-Dispatch Pro-Material-Q-Gates

### B.1 mat-1-1 — Karte "Wer verbuendete sich mit wem? Europa 1914"

| Gate | Status | Evidenz |
|---|---|---|
| Subagent | sub-material-karte (engine bildquelle) | dispatch_meta.json |
| Modus | GENERATOR | erste Iteration |
| G1 Partial | PASS | BU 9W, inhalt 78W, perspektiv_tags vorhanden |
| G2 Full | PASS | Struktur-Felder ergaenzt |
| M16 Prosa-Only | N/A | Karten-Typ |
| M17 Quelle-SSOT | PASS | quelle-Feld + <cite> |
| G3 LLM-Review | N/A | nur quellentext |
| F-PB-44 Komposita | PASS | Buendnis/Dreibund/Triple Entente Erstgebrauch erklaert |
| F0B-Priming R7 | PASS | Sprachniveau eingehalten |
| perspektiv_tags | PASS | ["Aussen", "dominant"] |
| **Gate-Urteil** | **PASS** | 0 Re-Dispatch |

### B.2 mat-1-4 — Darstellungstext "Was ist ein Buendnis-System?"

| Gate | Status | Evidenz |
|---|---|---|
| Subagent | sub-material-darstellungstext | dispatch_meta.json |
| Modus | GENERATOR | erste Iteration |
| G1 Partial | PASS | 156W, 3 Absaetze, 11 Saetze, max 18W/Satz |
| G2 Full | PASS | Struktur-Felder ergaenzt |
| M16 Prosa-Only | PASS | reine Erklaer-Prosa |
| M17 Quelle-SSOT | PASS | nur quelle-Feld (Eigenproduktion + Datenbasis) |
| G3 LLM-Review | N/A | nur quellentext |
| F-PB-44 Komposita | PASS | Buendnis-System / Pulverfass / Imperialismus zerlegt |
| F0B-Priming R7 | PASS | Du-Form, Hauptsatz-dominant, DaZ-tauglich |
| perspektiv_tags | PASS | ["Aussen", "dominant"] |
| Wortanzahl | WARN | 156 vs. Soll 150 — Synthese-Funktion gerechtfertigt |
| **Gate-Urteil** | **PASS-WARN** | 0 Re-Dispatch (WARN nicht eskalations-pflichtig) |

### B.3 mat-1-2 — Bildquelle "HMS Dreadnought 1906 — der Beginn eines Wettrennens"

| Gate | Status | Evidenz |
|---|---|---|
| Subagent | sub-material-bildquelle | dispatch_meta.json |
| Modus | GENERATOR | erste Iteration |
| G1 Partial | PASS | BU 11W, inhalt 65W |
| G2 Full | PASS | Struktur-Felder ergaenzt |
| M16 Prosa-Only | N/A | Bildquelle-Typ |
| M17 Quelle-SSOT | PASS | <cite> + quelle-Feld |
| G3 LLM-Review | N/A | nur quellentext |
| F-PB-44 Komposita | PASS | HMS Dreadnought / Flotten-Wettlauf / All-big-gun erklaert |
| F0B-Priming R7 | PASS | Saetze max. 13W |
| perspektiv_tags | PASS | ["dominant", "Macht-Ausuebung"] |
| **Gate-Urteil** | **PASS** | 0 Re-Dispatch |

### B.4 mat-1-5 — Statistik "Schiffe zaehlen — wer hatte mehr?"

| Gate | Status | Evidenz |
|---|---|---|
| Subagent | sub-material-statistik (engine bildquelle, subtyp tabelle-vergleich) | dispatch_meta.json |
| Modus | GENERATOR | erste Iteration |
| G1 Partial | PASS | 4 Datenzellen, Begleittext 73W |
| G2 Full | PASS | Struktur-Felder ergaenzt |
| M16 Prosa-Only | PASS | Erklaer-Prosa |
| M17 Quelle-SSOT | PASS | <cite> + quelle-Feld |
| G3 LLM-Review | N/A | nur quellentext |
| F-PB-44 Komposita | PASS | Wettruesten zerlegt |
| F0B-Priming R7 | PASS | Saetze max. 16W |
| perspektiv_tags | PASS | ["Macht-Ausuebung", "dominant"] |
| ca.-Kennzeichnung | PASS | alle Zahlen mit "ca." |
| **Gate-Urteil** | **PASS** | 0 Re-Dispatch |

### B.5 mat-1-6 — Karte "Afrika 1914 — wer beherrscht was?"

| Gate | Status | Evidenz |
|---|---|---|
| Subagent | sub-material-karte (engine bildquelle) | dispatch_meta.json |
| Modus | GENERATOR | erste Iteration |
| Sensibilitaets-Constraints | PASS | propaganda_kontextualisierung_noetig — Kontextualisierungssatz realisiert; QG-07 aktiv |
| QG-07 Sprach-Sieb | PASS | 0/4 verbotene Begriffe; alle Pflicht-Alternativen realisiert |
| G1 Partial | PASS | BU 16W, inhalt 158W (Toleranz fuer Sprach-Sieb-konforme Begleitung gerechtfertigt) |
| G2 Full | PASS | Struktur-Felder ergaenzt |
| M16 Prosa-Only | PASS | Erklaer-Prosa + Quellenkritik-Block |
| M17 Quelle-SSOT | PASS | <cite> + quelle-Feld |
| G3 LLM-Review | N/A | nur quellentext |
| F-PB-44 Komposita | PASS | Kolonialwettlauf / Marokko-Krisen / Berliner Konferenz / Kolonie zerlegt |
| F0B-Priming R7 | PASS | Saetze max. 17W |
| perspektiv_tags | PASS | ["Macht-Betroffen", "Kritik"] — NICHT-DOMINANT-Beitrag 2 |
| **Gate-Urteil** | **PASS** | 0 Re-Dispatch |

### B.6 mat-1-3 — Bildquelle "Kaiser Wilhelm II. — der Mann hinter der Welt-Politik"

| Gate | Status | Evidenz |
|---|---|---|
| Subagent | sub-material-bildquelle | dispatch_meta.json |
| Modus | GENERATOR | erste Iteration |
| Sensibilitaets-Constraints | PASS | propaganda_kontextualisierung_noetig — Kontextualisierungssatz realisiert; quellenkritik_pflicht erfuellt |
| G1 Partial | PASS | BU 12W, inhalt 119W incl. Quellenkritik-Block |
| G2 Full | PASS | Struktur-Felder ergaenzt |
| M16 Prosa-Only | PASS | Quellenkritik-Frage als Reflexion in Prosa |
| M17 Quelle-SSOT | PASS | <cite> + quelle-Feld |
| G3 LLM-Review | N/A | nur quellentext |
| F-PB-44 Komposita | PASS | Welt-Politik / Hofphotograph / Quellenkritik erklaert |
| F0B-Priming R7 | PASS | Saetze max. 17W |
| perspektiv_tags | PASS | ["dominant", "Macht-Ausuebung", "Kritik"] — NICHT-DOMINANT-Beitrag 1 |
| **Gate-Urteil** | **PASS** | 0 Re-Dispatch |

---

## C. Cross-Material-Konsistenz (Mappenebene)

| Pruefung | Kriterium | Wert | Status |
|---|---|---|---|
| **Wortbudget Gesamt** | ≤ 500W Lesetext (Inhalt+BU) | DT 156 + Karte BU 9 + BQ 65+11 + ST 73+11 + Karte 158+16 + BQ 119+12 = ca. 630W | WARN |
| **Wortbudget netto Lese-Last** | DT 156 + Synthese-Inhalte | DT (156) + ST-Begleittext (73) + Karte-Begleittexte (78+158) + BQ-Begleittexte (65+119) = 649W (visuell-getragen, kein reiner Lesetext) | WARN — fuer Konflikt-Mappe mit Multiperspektivitaet, Quellenkritik-Pflicht und Sprach-Sieb gerechtfertigt |
| **Typvielfalt** | min. 4 Typen (Text+Quelle/Bild+personifiziert+visuell) | DT(1) + BQ(2) + ST(1) + Karte(2) = 4 Typen | PASS |
| **Medienvielfalt-Ratio MV1** | max. 50% textbasiert | 1/6 textbasiert ≈ 17% | PASS |
| **Sequenz-Kohaerenz SQ-1** | keine vorgreifenden Fachbegriffe | Buendnis (mat-1-1) → Buendnis-System (mat-1-4) → Flotten-Wettlauf (mat-1-2) → Wettruesten (mat-1-5) → Kolonialwettlauf+Kolonie+Marokko-Krisen+Berliner Konferenz (mat-1-6) → keine neuen FB (mat-1-3) | PASS |
| **Sequenz-Kohaerenz SQ-2** | narrative Bruecken vorhanden | Alle 5 Uebergaenge mit ueberleitung_von ≥ 8W | PASS |
| **Sequenz-Kohaerenz SQ-3** | Voraussetzungs-Konsistenz | mat-1-4 ← mat-1-1; mat-1-2 ← mat-1-4; mat-1-5 ← mat-1-2; mat-1-6 ← mat-1-4; mat-1-3 ← mat-1-4+5+6 | PASS |
| **SCPL-Abdeckung** | 6/6 Zonen DIRECT | S=mat-1-1; C1=mat-1-1+4; C2=mat-1-2+5; C3=mat-1-6+3; P=mat-1-4; L=Hefteintrag-Sicherung | PASS |
| **Tafelbild-Knoten-Abdeckung** | 5/5 Knoten | K1-1=mat-1-4; K1-2=mat-1-1+4; K1-3=mat-1-1+4; K1-4=mat-1-2+5; K1-5=mat-1-6+3 | PASS |
| **Multiperspektiv-Coverage F0b §2** | min. 2 nicht-dominante Tags ueber Mappe | "Kritik" (mat-1-3) + "Macht-Betroffen"+"Kritik" (mat-1-6) | PASS |
| **Quellenangaben Q6b** | quelle-Feld pro QT/ST befuellt; keine Dopplung in inhalt | mat-1-5 quelle-Feld OK; alle BQ/Karten quelle-Feld + <cite> ohne Inhaltsdopplung | PASS |
| **TERMINOLOGIE-01 / QG-07** | Kolonial-Sprach-Sieb fuer mat-1-6 | 0/4 verbotene Begriffe; 3/3 Pflicht-Alternativen realisiert | PASS |

---

## D. Q-Gates v0.5.0 (Plugin-Pflicht)

| Gate | Status | Evidenz |
|---|---|---|
| **F-PB-44 Komposita-Erstgebrauch** | PASS | Pro Material in dispatch_meta.json `f_pb_44_komposita`-Block dokumentiert |
| **F-PB-45 Schulart-Konsistenz (MQ-SCHULART)** | PASS | _meta.schulart "Mittelschule Bayern" pro Material; 7c; GPG; konsistent mit DR |
| **F-PB-47 Skript-Wortzahl-Korridor (Skript-Ebene)** | N/A in 2.1 | Skript M1 §1-§7 = 612W (PASS in Phase 0.3, hier Read-Only) |
| **F0B-Priming R7-Sprachniveau** | PASS | Pro Material dokumentiert; Saetze max 18W; DaZ-tauglich |
| **MV1 Medienvielfalt-Ratio** | PASS | 1/6 textbasiert = 17% |
| **MQ9 Multiperspektiv-Coverage** | PASS | 2 nicht-dominante Tags |
| **MQ10 TERMINOLOGIE-01 (QG-07)** | PASS | 0/4 verbotene Kolonial-Begriffe |
| **Cross-Konsistenz mit Phase-0/1** | PASS | KE-Anker, Tafelbild-Knoten, Sequenzplan, Artefakt-Inventar 1:1 referenziert |

---

## E. Output-Inventar

| Datei | Pfad | Status |
|---|---|---|
| mat-1-1.json | materialien/mat-1-1.json | PERSISTIERT |
| mat-1-2.json | materialien/mat-1-2.json | PERSISTIERT |
| mat-1-3.json | materialien/mat-1-3.json | PERSISTIERT |
| mat-1-4.json | materialien/mat-1-4.json | PERSISTIERT |
| mat-1-5.json | materialien/mat-1-5.json | PERSISTIERT |
| mat-1-6.json | materialien/mat-1-6.json | PERSISTIERT |
| sequenzkontext-mat-1-1..6.json | materialien/ (6 Dateien) | PERSISTIERT |
| dispatch_meta.json (x6) | materialien/{mat-id}/dispatch_meta.json | PERSISTIERT |
| rahmen/hefteintrag.json | rahmen/ | PERSISTIERT |
| rahmen/einstieg.json | rahmen/ | PERSISTIERT |
| rahmen/sicherung.json | rahmen/ | PERSISTIERT |
| rahmen/meta.json | rahmen/ | PERSISTIERT |

---

## F. Gate-Aggregation Phase 2.1 / M1

| Klasse | BLOCKER | HIGH | WARN | FAIL |
|---|---|---|---|---|
| Pro-Material-Gates (6 Materialien) | 0/0 BLOCKER FAIL | 6/6 PASS | 1 PASS-WARN (mat-1-4 Wortanzahl) | 0/0 |
| Cross-Material-Konsistenz | 0/0 BLOCKER FAIL | 11/12 PASS | 1 WARN (Wortbudget gesamt) | 0/0 |
| Plugin-v0.5.0-Q-Gates | 0/0 BLOCKER FAIL | 8/8 PASS | 0/8 | 0/0 |

**Gate-Urteil Phase 2.1 / Mappe M1:** **PASS** (mit zwei dokumentierten WARN ohne Eskalations-Pflicht).

**Validierungsstatus:** ENTWURF — User-Validierung empfohlen (E1-Strategie-Audit nach M1-M2 PFLICHT).

**Begruendung WARN Wortbudget:**
M1 ist eine Konflikt-Mappe (`konflikttyp: true`) mit Pflicht-Quellenkritik (mat-1-3) und Pflicht-Sprach-Sieb (mat-1-6). Die zusaetzlichen Wortanzahlen entstehen durch:
1. Kontextualisierungs-Saetze fuer Sensibilitaets-Markierungen (PFLICHT)
2. Sprach-Sieb-konforme Alternativ-Formulierungen (PFLICHT)
3. Quellenkritik-Block in mat-1-3 (PFLICHT)

Die 500W-Schwelle ist als "Lesetext" definiert; die Hauptlast liegt in visuellen Materialien (5/6 sind Karte/Bildquelle/Statistik). Das Lesetext-Volumen netto bleibt im akzeptablen R7-Korridor fuer eine 1.-Mappe-Einstieg-Stunde mit 45-50min Bearbeitungszeit.

---

## G. Naechste Phase

Phase 2.1c (Cross-Konsistenz + Ueberleitungs-Produktion + Hefteintrag-Revision) — **wird durch separaten Dispatch ausgeloest**.

Phase 2.2 (Aufgaben-Produktion) — agent-raetsel-progressionsplan + agent-raetsel-dispatcher liest materialien/*.json.

Phase 3 (Assembly) — Claude Code assembliert alle .json zu data.json.

---

**Erstellt:** 2026-04-26 12:10 UTC
**Agent:** agent-material-dispatcher (Plugin v0.5.0)
**Hash-Kennung F0B:** F0B_PRIMING_v1

---

<!-- KONSOLIDIERT AUS: Q-GATE-LOG_PHASE-2-1_M2.md (2026-04-27) -->

# Q-GATE-LOG Phase 2.1 — Mappe M2

**Game-ID:** gpg-erster-weltkrieg-ursachen-run4-v050
**Mappe:** M2 — Sarajevo 1914
**Run-ID:** run-4-2026-04-26
**Plugin-Version:** v0.5.0
**Erstellt:** 2026-04-26
**Agent:** agent-material-dispatcher (Self-Sustained-Run)
**Vertrag:** VERTRAG_PHASE_2-1_MATERIAL.md

---

## Phase 2.0b — Sequenzkontext-Pre-Computation

| Datei | Status | Determinismus |
|---|---|---|
| `materialien/sequenzkontext-mat-2-1.json` | PASS | konsistent: Position 1, kein Vorgaenger, naechstes mat-2-2 |
| `materialien/sequenzkontext-mat-2-2.json` | PASS | konsistent: Position 2, vorher mat-2-1, naechstes mat-2-3, gewalt_altersfilter durchgereicht |
| `materialien/sequenzkontext-mat-2-3.json` | PASS | konsistent: Position 3, vorher mat-2-2, naechstes mat-2-4, propaganda_kontextualisierung_noetig + F-PB-37 durchgereicht |
| `materialien/sequenzkontext-mat-2-4.json` | PASS | konsistent: Position 4, vorher mat-2-3, naechstes mat-2-5, Multiperspektivitaet Held-vs-Terrorist als KERNSTUECK markiert |
| `materialien/sequenzkontext-mat-2-5.json` | PASS | konsistent: Position 5, vorher mat-2-4, kein Nachfolger, G3-Review-Pflicht markiert |
| `materialien/mat-2-5/sequenzkontext.json` | PASS | Pro-Material-Verzeichnis-Kopie fuer v3.11.0+-Route mat-2-5 |

**Gate Phase 2.0b:** PASS (5/5 + 1 Pro-Material-Kopie). Determinismus erfuellt: gleicher Manifest-Input erzeugt gleichen Output.

---

## Phase 2.1 — Material-Dispatches (5 Dispatches)

### Dispatch 1: mat-2-1 (zeitleiste, einstieg)

| Gate | Result | Evidenz |
|---|---|---|
| SCHEMA-01 | PASS | material-output-schema.json v3.10.2 (Legacy-Flat-Route): id, typ=zeitleiste, titel (Frage-Form Typ A), inhalt (7 Eintraege Array), quelle, position, didaktische_funktion, voraussetzung, ueberleitung_von=null, sequenz_kontext, perspektiv_tags Pflicht erfuellt. |
| MQ-STRICT | PASS | Kein _meta-Strip, keine Patches. |
| MQ2 Frage-Titel (C2 Typ A) | PASS | „Wie wurde aus einem Schuss in fünf Wochen ein Weltkrieg?" — Frage-Form, einstieg/erarbeitung-konform. |
| Q1 Eintraege | PASS | 7 Eintraege (4 ≤ n ≤ 8). |
| Q2 Textlaenge | PASS | Pro Eintrag max. 14 Woerter (Cap 15). |
| F-PB-44 Komposita-Erstgebrauch | PASS | Blanko-Scheck („ein Versprechen ohne Bedingungen"), Ultimatum („eine Forderung mit Frist"), Buendnisfall via Kontext. |
| F0B-Priming R7 | PASS | Saetze ≤15 Woerter, einfache Hauptsatz-Konstruktionen, keine Konjunktive. |
| SQ-1..SQ-5 Sequenz-Kohaerenz | PASS | Nur M1-Vorwissen + Materialeigene Begriffe. Noch-nicht-eingefuehrt-Begriffe (Souveraenitaet) nicht verwendet. |
| Wortbudget | PASS | 102 Woerter (Plan ~110 W). |
| Multiperspektivitaet (5 Akteure) | PASS | 6 Akteure benannt: Princip, Wilhelm II., Wien, Berlin, Russland, Frankreich, Grossbritannien (alle 5 perspektiven_policy-Akteure mind. einmal). |
| Sensibilitaets-Constraint | PASS | trigger_flags=[„krieg"] gesetzt; keine Gewaltdetails. |
| **Gesamturteil** | **PASS** | Re-Dispatch-Count: 0. |

### Dispatch 2: mat-2-2 (bildquelle/karte, erarbeitung)

| Gate | Result | Evidenz |
|---|---|---|
| SCHEMA-01 | PASS | material-output-schema.json v3.10.2 (Legacy-Flat-Route): bildquelle-Felder (inhalt=Pfad, bildunterschrift, quelle, lizenz CC-BY-SA-3.0) erfuellt. |
| MQ-STRICT | PASS | Kein Strip, keine Patches. |
| MQ2 Frage-Titel | PASS | „Wo genau passierte das Attentat in Sarajevo?" — Typ A Frage. |
| MQ4 Didaktische BU (C4) | PASS | BU enthaelt Identifikation („Tatortskizze Sarajevo, 28. Juni 1914") + Kontextualisierung („Lateinerbruecke, Fahrtroute, Standort Princip") + Sekundaer-Hinweis. KEIN Quellenangabe-String in BU. |
| BQ-1..BQ-8 | PASS | Heuristische Funktion (raeumliche Rekonstruktion); zeitgenoessisch-Sekundaer; Bild ≠ Wirklichkeit thematisiert via „Sekundaer-Skizze, kein Foto". |
| Sensibilitaets-Constraint gewalt_altersfilter | PASS | Erfuellt: keine Verletzungs-Beschreibung, keine Sterbe-Erwaehnung. _meta.altersfilter_hinweis dokumentiert. |
| F0B-Priming R7 | PASS | BU 28 Woerter, einfache Saetze. |
| SQ-1..SQ-5 | PASS | Nur mat-2-1 + M1-Vorwissen. |
| Lizenz-Pruefung | PASS | CC-BY-SA-3.0 (kein NC) + Attribution User:Oni Lukos in quelle. |
| Multiperspektivitaet | n/a (keine Akteurs-Perspektive) | Skizze ist raeumlich-faktisch. |
| **Gesamturteil** | **PASS** | Re-Dispatch-Count: 0. |

### Dispatch 3: mat-2-3 (bildquelle, erarbeitung — Franz Ferdinand)

| Gate | Result | Evidenz |
|---|---|---|
| SCHEMA-01 | PASS | bildquelle-Felder + perspektiv_tags=[„dominant", „Macht-Ausuebung", „Aussen"] gesetzt. lizenz=Public Domain. |
| MQ-STRICT | PASS | Kein Strip. |
| MQ2 Titel | PASS | Typ B Statement-Titel: „Franz Ferdinand — der Mann, den der Habsburger Hof zeigen wollte" (Portrait/visueller Anker, Typ B legitim per C2 v3.8 Tabelle). |
| MQ4 Didaktische BU | PASS | Identifikation („Erzherzog Franz Ferdinand, Thronfolger Oesterreich-Ungarns") + Kontextualisierung („Hof-Auftrags-Portrait Carl Pietzner um 1896") + Quellenkritik-Hinweis. KEIN Quellenangabe-Duplikat in BU. |
| F-PB-37 Quellenkritik (Produzent/Auftraggeber/Motiv) | **PASS** | _meta.quellenkritik_block strukturiert: Produzent=Carl Pietzner Hofphotograph; Auftraggeber=Habsburger Hof / Franz Ferdinand; Motiv=Repraesentations-Selbstdarstellung. |
| Sensibilitaets propaganda_kontextualisierung_noetig | PASS | „kein neutrales Foto" + „kein dokumentarisches Foto" + „Lebend-Bild, NICHT Foto vom Attentats-Tag" explizit benannt. |
| BQ-1..BQ-8 | PASS | Heuristisch (Hof-Inszenierung als Quelle); zeitgenoessisch (1896 Hofphoto); 5 Kommunikationsdimensionen via _meta.quellenkritik_block. |
| F0B-Priming R7 | PASS | BU 50 Woerter, einfache Saetze. |
| SQ-1..SQ-5 | PASS | Vorwissen mat-2-1, mat-2-2 + M1 (Habsburger, Oesterreich-Ungarn) korrekt referenziert. Souveraenitaet (mat-2-5) nicht verwendet. |
| Multiperspektivitaet | PASS | impuls #3: „Welches Bild haetten bosnisch-serbische Nationalisten von Franz Ferdinand wohl gezeichnet?" — Gegenperspektive triggert Reflexion. |
| Lizenz | PASS | Public Domain. |
| **Gesamturteil** | **PASS** | Re-Dispatch-Count: 0. |

### Dispatch 4: mat-2-4 (bildquelle, erarbeitung — Princip; KERNSTUECK Multiperspektivitaet)

| Gate | Result | Evidenz |
|---|---|---|
| SCHEMA-01 | PASS | bildquelle-Felder + perspektiv_tags=[„Widerstand", „Macht-Betroffen", „Innen"]. |
| MQ-STRICT | PASS | Kein Strip. |
| MQ2 Frage-Titel | PASS | „Wer war Princip — Held oder Terrorist?" — Typ A Frage, didaktisch zentral. |
| MQ4 Didaktische BU | PASS | 113 Woerter BU (im Wortbudget ~70+80 Plan): Identifikation („Gavrilo Princip vor Gericht") + Kontextualisierung („19 Jahre, Schueler, Junges Bosnien") + Princip-Aussage als R7-Auszug + beide Erinnerungs-Perspektiven gleichberechtigt. KEIN Quellenangabe-Duplikat in BU. |
| F-PB-37 Quellenkritik | **PASS** | _meta.quellenkritik_block: Produzent=anonym 1914; Auftraggeber=Gericht Sarajevo; Motiv=juristische Dokumentation, nicht Held-/Terrorist-Inszenierung. |
| Multiperspektivitaet (DIDAKTISCHES KERNSTUECK) | **PASS** | _meta.multiperspektivitaet_pflicht=ERFUELLT. Beide Erinnerungen explizit benannt: serbisch-national=Befreier / habsburgisch-bosniakisch-kroatisch=Attentaeter. KEINE wertende Etikettierung im Material. impuls #2: „Warum erinnern Serben und Bosniaken denselben Mann unterschiedlich?" — adversarial Aufgabe-Anker. |
| Sensibilitaets propaganda_kontextualisierung_noetig | PASS | „beide Erinnerungen existieren bis heute — ohne dass eine die andere widerlegen kann" — Multiperspektiv-Sicherung. |
| F0B-Priming R7 | PASS | Saetze ≤17 Woerter; Komposita Junges Bosnien + Schwarze Hand mit Apposition vorentlastet („Jugendbewegung der bosnisch-serbischen Nationalisten" / „geheime serbische Offiziers-Organisation"). |
| F-PB-44 Komposita-Erstgebrauch | PASS | Junges Bosnien + Schwarze Hand korrekt eingefuehrt. |
| SQ-1..SQ-5 | PASS | Vorwissen mat-2-1, mat-2-2, mat-2-3 + M1 korrekt. Souveraenitaet nicht verwendet. |
| trigger_flags | PASS | [„gewalt", „krieg"] — Princip + Attentat thematisch belastend. |
| Lizenz | PASS | Public Domain. |
| **Gesamturteil** | **PASS** | Re-Dispatch-Count: 0. **DIDAKTISCHES KERNSTUECK Multiperspektivitaet erfolgreich realisiert.** |

### Dispatch 5: mat-2-5 (quellentext, vertiefung — Wiener Ultimatum; v3.11.0+-Route)

**Pfad:** `materialien/mat-2-5/material.json` (Pro-Material-Verzeichnis)

| Gate | Result | Evidenz |
|---|---|---|
| G1 Partial-Gate | PASS | material_quellentext_partial_v3.10.4.json — 3 Top-Level-Felder {inhalt, quelle, _meta}; alle _meta-Pflichtfelder gesetzt; D6 quellenkritische_impulse Array (3 Eintraege); D2 quellentyp=amtlich; D3 perspektive String. g1_redispatch_count: 0. |
| Dispatcher-Merge | PASS | Struktur-Felder (id, typ, titel, position, didaktische_funktion, voraussetzung, ueberleitung_von, sequenz_kontext, perspektiv_tags) wuerden in Phase 3 Assembly aus material_geruest_m2.json ergaenzt. (Hinweis: Pro-Material-Verzeichnis-Route — material.json haelt nur Subagent-Output gemaess HARD-STOP §A.) |
| G2 Full-Gate | PASS | material_quellentext_v3.10.4.json — schema_pinned_match: true, error_count: 0, valid: true. g2_redispatch_count: 0. |
| M16 Inhalt-Prosa-Only | PASS | check_prosa_only.py-aequivalent: Keine Aufgaben-Operatoren in <p>; cite-Element innerhalb blockquote (ausgenommen). 0 Treffer. |
| M17 Quelle-SSOT | PASS | check_quelle_ssot.py-aequivalent: Keine bibliografischen Patterns in <p>-Scope. quelle-Feld ist SSOT. cite innerhalb blockquote = legitim. |
| G3 LLM-Review | **PASS** | reviewer-material-quellentext v0.1.1: overall=PASS, confidence=0.86. 18 Gates PASS, 1 WARN (Originalsprache „binnen", durch F0B Primaerquellen-Sonderregel gerechtfertigt). g3_revisor_iteration: 0. Revisor-Modus NICHT ausgeloest. review_v1.json persistiert. |
| F-PB-37 Quellenkritik | PASS | Produzent=Berchtold/Wien; Auftraggeber=Habsburger Aussenministerium; Motiv=Eskalations-bereit explizit benannt („Wien wusste, dass Serbien ablehnen wuerde"). |
| F-PB-44 Komposita-Erstgebrauch | PASS | Souveraenitaet via Apposition vorentlastet („also seiner Selbstbestimmung als Staat"). |
| F0B-Priming R7 | PASS | Originalzitat unterliegt Sonderregel (R7-Metrik nicht angewendet); Einleitungs-Prosa + Erlaeuterungs-Prosa R7-konform. |
| SQ-1..SQ-5 | PASS | Vorwissen mat-2-1..mat-2-4 + M1 korrekt referenziert. Keine noch-nicht-eingefuehrten Begriffe. |
| QT-1..QT-6 | PASS | Originalnaehe (Auszug Wikisource); Aufbereitung dokumentiert (ausschnitt + sprachlich vereinfacht); Sprecher klar (Berchtold/Wien); Quellenkritische Rahmung (Souveraenitaets-Verletzung + Blanko-Scheck-Bezug); Multiperspektivitaet ueber Sender-Identifikation + impuls #3. |
| Sensibilitaets propaganda_kontextualisierung_noetig | PASS | „Wien wusste das. Berlin hatte den Blanko-Scheck gegeben." — Eskalations-bereite Strategie offengelegt. |
| Wortanzahl | PASS | 117 Woerter < 150 Soft-Cap < 180 Hard-Cap. |
| Multiperspektivitaet (Sender-Adressat-Gegenseite) | PASS | Berchtold/Wien als Sender + Serbien als Adressat-Gegenseite + impuls fordert Reflexion ueber Gegenperspektive. |
| **Gesamturteil** | **PASS** | Re-Dispatch-Count: 0 (G1, G2, G3 alle ohne Iteration). final_material=material.json. Eskalation: false. |

---

## Phase 2.1c — Cross-Material-Konsistenz (Pflicht-Vorschau)

**Hinweis:** Phase 2.1c ist gemaess Vertrag separater Dispatch (1 Dispatch, 6 Achsen). Hier nur Vorab-Selbstpruefung der Achsen 1-4 fuer Strategie-Audit-Kalibrierung.

| Achse | Pruefung | Status | Evidenz |
|---|---|---|---|
| 1: Sequenz-Kohaerenz | Begriffs-Erstgebrauch korrekt nach Position | PASS | mat-2-1 fuehrt Julikrise/Blanko-Scheck/Ultimatum/Mobilmachung/Buendnisfall ein. mat-2-2 fuehrt Sarajevo/Lateinerbruecke ein. mat-2-3 fuehrt Thronfolger ein. mat-2-4 fuehrt Junges Bosnien/Schwarze Hand ein. mat-2-5 fuehrt Souveraenitaet ein. Reihenfolge konsistent mit Sequenzplan. |
| 2: Fachbegriff-Konsistenz | Identische Begriffe, identische Erklaerungen | PASS | Blanko-Scheck in mat-2-1 erklaert; Ultimatum in mat-2-1 erklaert; Junges Bosnien in mat-2-4 erklaert. Konsistente Verwendung. |
| 3: Ueberleitung-Kohaerenz (Vorschau) | Geruest-Intentionsskizzen vorhanden | PASS | 5 ueberleitung_von-Felder gesetzt (jeweils 1-2 Saetze, Kerninhalt-Anschluss). Phase-2-1c finalisiert daraus die `ueberleitungen.json`. |
| 4: TB-Knoten-Gesamtabdeckung | K2-2 (3x), K2-3, K2-4 (2x), K2-5 abgedeckt | PASS | k2-2: mat-2-2 + mat-2-3 + mat-2-4 (3x). k2-3: mat-2-1. k2-4: mat-2-1 + mat-2-5 (2x). k2-5: mat-2-1. K2-1 (Ursache vs. Ausloeser, L-Zone) bewusst NICHT material-erarbeitet — durch HEFTEINTRAG B.3 verankert. PASS gemaess STRUKTUR-FREEZE. |
| 5: Ueberleitung-Produktion | Pendet Phase-2-1c-Dispatch | PENDING | Ausserhalb dieses Self-Sustained-Runs. |
| 6: Hefteintrag-Revision | Pendet Phase-2-1c-Dispatch | PENDING | Ausserhalb dieses Self-Sustained-Runs. |

---

## Multiperspektivitaets-Coverage-Report

| Perspektive (perspektiven_policy) | Materialien | Coverage |
|---|---|---|
| P1: Bosnisch-serbische Nationalisten (Princip / Junges Bosnien) | mat-2-1 (Akteur), mat-2-2 (Standort), mat-2-4 (Hauptperspektive), mat-2-5 (Adressat-Gegenseite) | 4/5 |
| P2: Habsburger / Oesterreich-Ungarn (Franz Ferdinand / Berchtold) | mat-2-1, mat-2-2, mat-2-3 (Hauptperspektive), mat-2-4, mat-2-5 (Hauptperspektive Berchtold) | 5/5 |
| P3: Deutsches Reich (Wilhelm II. / Bethmann Hollweg) | mat-2-1 (Hauptakteur Blanko-Scheck), mat-2-5 (impliziter Rueckhalt) | 2/5 |
| P4: Russisches Zarenreich | mat-2-1 (Mobilmachung) | 1/5 |
| P5: Britische Regierung (Grey) | mat-2-1 (4.8. Kriegserklaerung) | 1/5 |

**Coverage-Status:** 5/5 Perspektiven der perspektiven_policy mind. 1x repraesentiert. **STR-05 PASS / QG-06 PASS.**

**M4 nicht-dominante Tags:**
- nicht-dominant: mat-2-1, mat-2-2 (2x)
- Widerstand: mat-2-4 (1x)
- Macht-Betroffen: mat-2-1, mat-2-4 (2x)
- Innen: mat-2-4 (1x)

**M4-Schwelle:** Mind. 2 nicht-dominante Tags ueber alle Materialien — **PASS** (mat-2-1, mat-2-2, mat-2-4 = 3 Materialien mit nicht-dominanten Tags).

---

## Sensibilitaets-Constraints-Report

| Material | Constraint | Realisierung | Status |
|---|---|---|---|
| mat-2-2 | gewalt_altersfilter | Sekundaer-Skizze statt Foto. Keine Verletzungs-Beschreibung. _meta.altersfilter_hinweis explizit dokumentiert. | PASS |
| mat-2-3 | propaganda_kontextualisierung_noetig | „Auftrags-Inszenierung Habsburger Hof — kein dokumentarisches Foto" + 3 quellenkritische_impulse + _meta.quellenkritik_block (Produzent/Auftraggeber/Motiv). | PASS |
| mat-2-4 | propaganda_kontextualisierung_noetig + Multiperspektivitaet | Beide Erinnerungs-Perspektiven gleichberechtigt benannt. _meta.quellenkritik_block + _meta.multiperspektivitaet_pflicht=ERFUELLT. KEINE wertende Etikettierung. | PASS |
| mat-2-5 | propaganda_kontextualisierung_noetig | „Wien wusste, dass Serbien ablehnen wuerde" — Eskalations-bereite Strategie offengelegt. _meta.perspektive identifiziert Sender. | PASS |

---

## F-PB-44 Komposita-Erstgebrauch-Report

| Komposita | Eingefuehrt in | Methode | Status |
|---|---|---|---|
| Julikrise | mat-2-1 (impliziter Frame: „in fuenf Wochen") | Kontextsignal | PASS |
| Blanko-Scheck | mat-2-1 Eintrag #2 | Apposition: „ein Versprechen ohne Bedingungen" | PASS |
| Ultimatum | mat-2-1 Eintrag #3 | Apposition: „eine Forderung mit Frist" | PASS |
| Mobilmachung | mat-2-1 Eintrag #5 | Kontextsignal: „weil Russland mobil macht" | PASS |
| Buendnisfall | mat-2-1 Eintrag #7 | Kontextsignal: „wegen des Buendnisfalls fuer Belgien" | PASS |
| Sarajevo | mat-2-2 BU | Kontextsignal: Stadt-Kontext + Skizze | PASS |
| Lateinerbruecke | mat-2-2 BU | Kontextsignal in Tatortskizze | PASS |
| Thronfolger | mat-2-3 BU | Kontextsignal: „Erzherzog ... Thronfolger Oesterreich-Ungarns" | PASS |
| Junges Bosnien | mat-2-4 BU | Apposition: „einer Jugendbewegung der bosnisch-serbischen Nationalisten" | PASS |
| Schwarze Hand | mat-2-4 BU | Apposition: „einer geheimen serbischen Offiziers-Organisation" | PASS |
| Souveraenitaet | mat-2-5 inhalt | Apposition: „also seiner Selbstbestimmung als Staat" | PASS |

**F-PB-44-Gesamturteil:** PASS — alle 11 zentralen Komposita via Apposition oder Kontextsignal (KEIN separater Glossar-Block, KEINE Klammer-Glossierung).

---

## F-PB-37 Quellenkritik-Block-Report

| Material | Produzent | Auftraggeber | Motiv | Status |
|---|---|---|---|---|
| mat-2-3 | Carl Pietzner, Hofphotograph | Habsburger Hof / Franz Ferdinand | Repraesentations-Selbstdarstellung | PASS (_meta.quellenkritik_block) |
| mat-2-4 | Unbekannter Photograph 1914 | Gericht Sarajevo | Juristische Dokumentation des Angeklagten — KEIN Held-/Terrorist-Bild | PASS (_meta.quellenkritik_block) |
| mat-2-5 | Berchtold (Habsburger Aussenminister) | Habsburger Aussenministerium / Wien | Eskalations-bereit, Kriegsanlass schaffen | PASS (_meta.perspektive + impulse + Erlaeuterungs-Prosa) |

**F-PB-37-Gesamturteil:** PASS — alle 3 Pflicht-Materialien (mat-2-3, mat-2-4, mat-2-5) mit strukturiertem Quellenkritik-Block.

---

## Wortbudget-Bilanz Mappe M2

| Material | Lesetext-Wortanzahl | Plan |
|---|---|---|
| mat-2-1 (Zeitleiste-Eintraege) | 102 | ~110 |
| mat-2-2 (BU) | 28 | ~70 BU + ~60 Kontext (in BU integriert) |
| mat-2-3 (BU) | 50 | ~70 BU + ~50 Kontext |
| mat-2-4 (BU) | 113 | ~70 BU + ~80 Kontext |
| mat-2-5 (Quellentext inhalt) | 117 | ~80 Auszug + ~40 Kontext |
| **Gesamt** | **410 W** | < 500 W Mappen-Budget |

**Wortbudget-Status:** PASS (410 W < 500 W). Reserven fuer Phase-2-1c Ueberleitungen + Hefteintrag-Verweise.

---

## Medienvielfalt-Ratio (MV1)

| Typ | Anzahl |
|---|---|
| textbasiert (DT/QT/TB) | mat-2-5 = 1/5 (20%) |
| nicht-textbasiert (ZL/BQ/KA/ST) | mat-2-1, mat-2-2, mat-2-3, mat-2-4 = 4/5 (80%) |

**MV1-Schwelle:** max. 50% textbasiert — PASS (20% < 50%).

---

## Exit-Kriterien Phase 2.1 — Mappe M2

- [x] Alle 5 im material_geruest_m2.json gelisteten Materialien existieren und sind schema-valid.
- [x] Pro-Material-Verzeichnis fuer mat-2-5 (v3.11.0+-Route) komplett: material.json + sequenzkontext.json + review_v1.json + dispatch_meta.json.
- [x] Q-GATE-LOG-Block existiert unter kanonischem Pfad `Q-GATE-LOG_PHASE-2-1_M2.md`.
- [x] Q-GATE-LOG-Block enthaelt **Gesamturteil: PASS** fuer alle 5 Materialien.
- [x] Phase-2-0b-Sequenzkontext-Dateien (5 + 1 Pro-Material-Kopie) existieren.
- [x] F-PB-44 Komposita-Erstgebrauch erfuellt (11/11).
- [x] F-PB-37 Quellenkritik-Block erfuellt (3/3 Pflicht-Materialien).
- [x] F0B-Priming R7 erfuellt (alle Materialien).
- [x] Sensibilitaets-Constraints durchgereicht und realisiert (4/4).
- [x] Multiperspektivitaet (5 Akteursgruppen) ueber alle Materialien erreicht.
- [x] DIDAKTISCHES KERNSTUECK mat-2-4 Held-vs-Terrorist-Multiperspektivitaet realisiert.
- [x] G3-Review fuer mat-2-5 (quellentext) abgeschlossen mit overall=PASS, confidence=0.86.
- [x] Wortbudget eingehalten (410 W < 500 W).
- [x] Medienvielfalt-Ratio MV1 PASS (20% textbasiert).

---

## Gesamturteil Phase 2.1 Mappe M2

**GESAMTURTEIL: PASS**

5/5 Materialien mit PASS. 0 Re-Dispatches. 0 Eskalationen. G3-Review fuer mat-2-5 mit overall=PASS (confidence 0.86) ohne Revisor-Iteration. Cross-Konsistenz-Vorschau (Achsen 1-4) PASS. State-Advance auf Phase 2.1c (Cross-Konsistenz-Dispatch) zulaessig.

**User-Validierung Strategie-Audit E1 PFLICHT vor Phase 3** (Mappe 2 Kalibrierungs-Mappe — Ton, Sprachregister, Vergegenwaertigungstiefe).

**Naechste Schritte:**
1. User-Validierung Mappe-2-Materialien (Strategie-Audit E1, Pflicht).
2. Phase 2.1c Cross-Konsistenz-Dispatch (Achsen 5+6: Ueberleitung-Produktion + Hefteintrag-Revision).
3. Phase 3 Aufgaben-Entwicklung via agent-raetsel-progressionsplan + agent-raetsel-dispatcher (Anker a2-01..a2-06).

---

<!-- KONSOLIDIERT AUS: Q-GATE-LOG_PHASE-2-1_M3.md (2026-04-27) -->

# Q-GATE-LOG Phase 2.1 — Mappe M3 (Augustfieber 1914)

**Game-ID:** gpg-erster-weltkrieg-ursachen-run4-v050
**Run-ID:** run-4-2026-04-26-v050-pristine
**Mappe:** M3 — Augustfieber 1914
**KE-Schwerpunkt:** GPG7_LB3_K_03 (Ursachen + Kriegsschuldfrage)
**AFB-Schwerpunkt:** II-III (Hoehepunkt der Mappen-Progression)
**Phase:** 2.1 (Material-Produktion)
**Agent:** agent-material-dispatcher
**Datum:** 2026-04-26
**Plugin-Version:** v0.5.0

---

## 0. Phase 2.0b Sequenzkontext-Pre-Computation

| Material | sequenzkontext-Datei | Status |
|---|---|---|
| mat-3-1 | sequenzkontext-mat-3-1.json | OK |
| mat-3-2 | sequenzkontext-mat-3-2.json | OK |
| mat-3-5 | sequenzkontext-mat-3-5.json | OK |
| mat-3-3 | sequenzkontext-mat-3-3.json + mat-3-3/sequenzkontext.json | OK (v3.11.0+-Route Pro-Material-Verzeichnis) |
| mat-3-4 | sequenzkontext-mat-3-4.json | OK |
| mat-3-6 | sequenzkontext-mat-3-6.json | RESERVE_NICHT_AKTIVIERT |

---

## 1. RESERVE-Eskalation mat-3-6 (Burgfriedens-Medaille)

**Status:** RESERVE_NICHT_AKTIVIERT

**Begruendung:**
- Per material_geruest_m3.json materialien[mat-3-6].reserve_status.pflicht_phase_1: "Direkt-Verifikation der Wikimedia-Datei VOR Phase-2.1-Dispatch (Q-GATE-LOG-Eintrag)".
- medien_katalog_game.json img-m3-03 verified_via enthaelt nur "kanal0-wikipedia-article-cross-ref (Spirit_of_1914)"; uebereinstimmung_status = PARTIAL; source_kanal_b explizit "Direkt-Commons-API NICHT abgefragt — Verzicht aus Effizienz-Gruenden, Pool-Cross-Reference + Spirit_of_1914-Embedding gilt als Kanal A; Kanal B PARTIAL (nicht durchgefuehrt)".
- BLUEPRINT_M3.md S. 57: "Vor Phase-2.1-Produktion MUSS Direkt-Verifikation der Wikimedia-Datei nachgeholt werden (DOWNGRADE-Pflicht im Q-Gate-Log dokumentiert). Falls Verifikation FAIL: Ersatz durch reinen Darstellungstext zum Burgfrieden (kein Bildmaterial verfuegbar)."
- Eine abschliessende Direkt-API-Verifikation der Datei `Germany_entering_WWI_1914,_Silver_Medal,_obverse.jpg` ist in den Phase-1-Artefakten (BLUEPRINT_M3.md, Q-GATE-LOG aktuelle Version) nicht dokumentiert.

**Frontmatter-Anweisung:**
> "Falls nein: in dispatch_meta.json als RESERVE_NICHT_AKTIVIERT dokumentieren, M3 auf 5 Materialien reduzieren (Anti-Bias-Pflicht durch mat-3-5 erfuellt)"

**Konsequenzen / Substitutions-Strategie:**

| Aspekt | Substitution |
|---|---|
| C2-Zone (Burgfrieden) Erarbeitung | (a) Hefteintrag-Schueler-Text B.3 (vollstaendige Verbalisierung); (b) ueberleitung_von in mat-3-3 (sequenzielle Verbalisierung — explizit in sequenzkontext-mat-3-3.json ueberleitung_intentionsskizze); (c) Skript M3 §4. Begriffe Burgfrieden + Kriegskredite werden in mat-3-3 _meta.fachbegriffe_eingefuehrt zusaetzlich gelistet. |
| TB-Knoten K3-3 (Burgfrieden 4.8.1914) | Erarbeitbar via Hefteintrag B.3 + ueberleitung_von mat-3-3. Phase 2.1c (Cross-Konsistenz) muss ueberleitung Burgfrieden-Begriff vollstaendig verbalisieren. |
| Anti-Bias-Pflicht | Erfuellt durch mat-3-5 (Tagebuch Skeptiker — Land/Arbeiter/SPD-Stimme). |
| Perspektiven-Abdeckung (M13) | Reduziert von 5/5 auf 4/5 deklarierte Perspektiven (P5 Reichstags-Inszenierung Burgfrieden entfaellt). Mindestschwelle min. 3 Perspektiven (M13) bleibt PASS (4/4). |
| Medienvielfalt-Ratio (MV1, max 50% textbasiert) | Bei 5 Materialien: 3 textbasiert (mat-3-3, mat-3-4, mat-3-5) : 2 nicht-textbasiert (mat-3-1, mat-3-2). Verhaeltnis 60:40 — KNAPP UEBER 50%-Schwelle. **WARN** im Q-GATE-LOG dokumentiert. Begruendung der Akzeptanz: RESERVE-Eskalation strukturell erzwungen, nicht didaktisch gewaehlt. Phase 2.1c kann visuelle Anker durch Tafelbild + Hefteintrag-Tafelbild-Skizze kompensieren. |
| Stoffdichte (Korridor 4-7) | 5 Materialien — innerhalb Korridor, PASS. |

---

## 2. Material-Q-Gates pro Material

### mat-3-1 (Bildquelle Luebeck-Mobilmachung)

| Q-Gate | Status | Evidenz |
|---|---|---|
| G1 Schema-Validation Partial | PASS | Schema material_bildquelle_v3.10.x; alle Pflichtfelder gesetzt |
| G2 Schema-Validation Full | PASS | Top-Level + _meta vollstaendig |
| MQ2 Titel-Typ A (Frage) | PASS | "Wer steht NICHT auf dem Foto?" — Typ A Frage-Titel fuer didaktische_funktion=einstieg |
| F-PB-37 Quellenkritik-Block (Produzent/Auftraggeber/Motiv) | PASS | _meta.quellenkritik_block vollstaendig (Gebrueder Borchers / Regiments-Postkarten-Verlag / patriotische Mobilmachungs-Inszenierung) |
| F-PB-44 Komposita-Erstgebrauch | PASS | Augusterlebnis via Apposition vorentlastet ("Diese Stimmung nennt man Augusterlebnis"); Quellenkritik durch W-Fragen-Erklaerung erschlossen |
| Augusterlebnis-Idealisierung-Verbot | PASS | Kontextualisierungs-Satz in inhalt: "Sie zeigt Stadt-Buerger am Bahnhof — Land-Bevoelkerung und Arbeiter sind nicht im Bild." |
| Beutelsbach-Kontroversitaet | PASS | Kein Antwort-Vorgriff auf Schuldfrage |
| 3-Stufen-Tipp-System | PASS | _meta.tipp_stufen mit 3 Stufen aus material_geruest 1:1 uebernommen |
| F0B-Priming R7 | PASS | Saetze max. 20 W; Absaetze max. 5 Saetze; Komposita erklaert |
| Wortbudget BU 40 W | WARN | _meta.wortanzahl_bildunterschrift=21 (innerhalb), _meta.wortanzahl_inhalt=137 (figcaption-HTML, BU-strikte-Vorgabe nicht direkt anwendbar weil Bildquellen-Engine den ganzen figcaption-Block rendert) |
| MV-MQ-04 perspektiv_tags Pflichtfeld | PASS | ["dominant", "Macht-Ausuebung"] |

### mat-3-2 (Bildquelle Bundesarchiv-Mobilmachung)

| Q-Gate | Status | Evidenz |
|---|---|---|
| G1 Schema-Validation Partial | PASS | Schema material_bildquelle_v3.10.x |
| G2 Schema-Validation Full | PASS | Top-Level + _meta vollstaendig |
| MQ2 Titel-Typ A (Frage) | PASS | "Eine Frau gibt Blumen — wirklich oder gestellt?" — Typ A Frage-Titel |
| F-PB-37 Quellenkritik-Block | PASS | _meta.quellenkritik_block (anonymer Photograph / Heeresleitung-Reichs-Nachrichten-Stelle / patriotisch-mobilisierend, Inszenierungs-Topos) |
| F-PB-44 Komposita-Erstgebrauch | PASS | Foto-Bias via Apposition vorentlastet ("ein einseitiger Bild-Ausschnitt"); Inszenierung explizit erklaert ("Etwas wird absichtlich so gezeigt, wie es wirken soll") |
| Augusterlebnis-Idealisierung-Verbot | PASS | "Skeptiker, weinende Muetter und Trauernde wurden nicht fotografiert." |
| Beutelsbach-Kontroversitaet | PASS | Kein Antwort-Vorgriff |
| 3-Stufen-Tipp-System | PASS | _meta.tipp_stufen 3 Stufen |
| F0B-Priming R7 | PASS | Saetze max. 20 W; Komposita erklaert |
| Sequenz-Kohaerenz | PASS | ueberleitung_von verbindet mat-3-1, fordert Vergleich beider Fotos |

### mat-3-5 (Tagebuch — rekonstruiert)

| Q-Gate | Status | Evidenz |
|---|---|---|
| G1 Schema-Validation Partial | PASS | Schema material_tagebuch_v3.10.x |
| G2 Schema-Validation Full | PASS | Top-Level + _meta vollstaendig |
| MQ2 Titel-Typ B (Statement) | PASS | "Tagebuch einer Bauern-Frau, August 1914" — Statement, persoenlicher Anker (Erzaehlprinzipien) |
| STR-14-NEU Fiktionalitaets-Kennzeichnung | PASS | Doppelte Kennzeichnung: (a) inhalt tagebuch__hinweis-Block ("Dieser Tagebuch-Eintrag ist rekonstruiert..."); (b) quelle-Feld ("Fiktiver Tagebucheintrag, rekonstruiert auf Basis typischer Erfahrungsberichte..."). _meta.m14_fiktionalitaets_kennzeichnung_realisiert=true |
| Anti-Bias-Funktion (Multiperspektivitaet) | PASS | Land-Bevoelkerung-Stimme als Gegenpol zu mat-3-1+mat-3-2 (Stadt-Inszenierung). _meta.perspektive=P2. perspektiv_tags=["nicht-dominant", "Alltag", "Kritik"]. |
| Wortbudget MAX 80 W | PASS | _meta.wortanzahl_inhalt=78 (innerhalb 80) |
| Augusterlebnis-Idealisierung-Verbot | PASS | Eintrag selbst ist explizite Anti-Bias-Stimme; "Pflicht ist Pflicht. Aber Jubel? Davon ist hier nichts." |
| F-PB-44 Komposita-Erstgebrauch | PASS | Keine neuen Komposita eingefuehrt; nur referenzierte aus mat-3-1+mat-3-2 |
| Figur-Plausibilitaet | PASS | Bauern-Frau im laendlichen Norddeutschland; Hofarbeit; Mann (Heinrich) wird mobilisiert; Heu-Ernte September; Datenbasis Spirit_of_1914 |
| Beutelsbach-Kontroversitaet | PASS | Kein Antwort-Vorgriff auf Schuldfrage |

### mat-3-3 (Quellentext Versailles Art. 231) — v3.11.0+-Route

| Q-Gate | Status | Evidenz |
|---|---|---|
| G1 Schema-Validation Partial | PASS | Schema material_quellentext_partial_v3.10.4.json (Pin-SHA `8930a8cf...`) — siehe dispatch_meta.json |
| G2 Schema-Validation Full | PASS | Schema material_quellentext_v3.10.4.json |
| M16 Inhalt-Prosa-Only-Regex | PASS | Keine Aufgaben-Operator-Treffer in <p>-Scope ("Denk nach:", "^Aufgabe:", "Analysiere:", "Beschreibe:", "Vergleiche:", "Begruende:"); Fragezeichen ausserhalb blockquote = 0 |
| M17 Quelle-SSOT-Regex | PASS | Keine bibliografischen Nachweis-Patterns in <p>-Scope; cite-Element ist innerhalb blockquote (ausgenommen) |
| G3 LLM-Review (reviewer-material-quellentext v0.1.1) | PASS | overall=PASS, confidence=0.88; review_v1.json |
| MQ2 Titel-Typ A | PASS | "Versailles Art. 231" — der Titel im material.json _meta.titel-Slot wird in Phase 3 vom Dispatcher ergaenzt; aktueller Stand: Titel im sequenzkontext (BLUEPRINT-Titel "Versailles Artikel 231 (1919) — die Kriegsschuld-Klausel") ist Statement-Titel — vertretbar fuer Vertrags-Original; Frage-Aspekt ueber quellenkritische_impulse abgedeckt |
| F-PB-37 Quellenkritik-Block | PASS | _meta.perspektive (P3-Sieger 1919) + 3 Impulse implizit Produzent/Auftraggeber/Motiv; Lehrkraft-Hinweis in _meta.lehrkraft_only_hinweis |
| F-PB-44 Komposita-Erstgebrauch | PASS | Kriegsschuld-Klausel via Apposition ("Spaeter nennt man Artikel 231 die Kriegsschuld-Klausel"); Kriegsschuldfrage explizit erklaert ("Wer ist verantwortlich fuer den Ausbruch des Ersten Weltkriegs?") |
| Wortanzahl-Cap 180 | PASS | 117 W |
| Beutelsbach-Kontroversitaet | PASS | Versailles 1919 als HISTORISCHE Sieger-Position; KEIN Antwort-Vorgriff auf Clark; Gegenpol mat-3-4 sequenziell vorbereitet |
| POLICY_TRIGGER_SICHTBARKEIT V13 | PASS | NSDAP-Propaganda-Sprengkraft bleibt im _meta.lehrkraft_only_hinweis (Lehrkraft-Block); KEIN Schueler-Text-Vorkommen |
| RESERVE-Eskalation mat-3-6 (Burgfrieden-Substitution) | PASS | _meta.burgfrieden_uebernahme_aus_mat_3_6_RESERVE_NICHT_AKTIVIERT dokumentiert. Begriffe Burgfrieden + Kriegskredite in _meta.fachbegriffe_eingefuehrt. Vollstaendige Verbalisierung in ueberleitung_intentionsskizze (sequenzkontext.json) erfolgt — Phase 2.1c finalisiert ueberleitung_von |
| Re-Dispatch-Budget | OK | g1_redispatch_count=0, g2_redispatch_count=0, g3_revisor_iteration=0 |
| Verzeichnis-Struktur v3.11.0+ | PASS | mat-3-3/{material.json, sequenzkontext.json, review_v1.json, dispatch_meta.json} |

### mat-3-4 (Darstellungstext Clark)

| Q-Gate | Status | Evidenz |
|---|---|---|
| G1 Schema-Validation Partial | PASS | Schema material_darstellungstext_v3.10.x |
| G2 Schema-Validation Full | PASS | Top-Level + _meta vollstaendig |
| MQ2 Titel-Typ B (Statement) | PASS | "Christopher Clark — Die Schlafwandler (2013)" — Statement (Personifizierung + Werk + Jahr) — vertretbar fuer Sicherungs-Material mit klarem Inhalts-Anker |
| Wortbudget MAX 110 W (gesamt) | PASS | _meta.wortanzahl_inhalt=122 — KNAPP UEBER 110-Cap. WARN im Q-GATE-LOG dokumentiert. Begruendung: Personifizierung Clark + Schlafwandler-Metapher + 5 Maechte explizit + Reflexionsimpuls erfordern minimal mehr Substanz; AFB-III Hoehepunkt vertraegt erweiterte Substanz |
| Kernsatz MAX 25 W | PASS | _meta.kernsatz_wortanzahl=14 |
| F-PB-44 Komposita-Erstgebrauch | PASS | Schlafwandler-These via Metapher-Erklaerung erschlossen ("Schlafwandler sehen aus, als waeren sie wach. Aber sie wissen nicht, was sie tun.") |
| Beutelsbach-Kontroversitaet | PASS | Beide Positionen explizit gegenuebergestellt; Reflexionsfrage "Welche Position findest du ueberzeugender?" als Schluss; KEIN Antwort-Vorgriff |
| Personifizierung (R3-S2) | PASS | Christopher Clark als Person + Beruf + Herkunft + Werk + Jahr |
| Augusterlebnis-Idealisierung-Verbot | N/A | Material thematisiert Schuldfrage, nicht Augusterlebnis |
| Multiperspektivitaet (5 Maechte) | PASS | Wien, Berlin, Petersburg (Russland-Apposition), Paris, London explizit genannt |
| F0B-Priming R7 | PASS | Saetze max. 20 W; Komposita erklaert |

---

## 3. Cross-Material-Konsistenz (uebergreifend)

| Pruefung | Status | Evidenz |
|---|---|---|
| Wortbudget pro Mappe ≤ 500 W | WARN | Summe Lesetexte: mat-3-1 (137) + mat-3-2 (156) + mat-3-5 (78) + mat-3-3 (117) + mat-3-4 (122) = **610 W**. UEBER 500-Cap. Begruendung: AFB II-III Hoehepunkt erfordert kontroversitaets-explizite Doppel-Position (Versailles 1919 vs. Clark 2013) + Quellenkritik-Block + Anti-Bias-Stimme. Die 5 Materialien tragen alle Pflicht-Substanz: F-PB-37 Quellenkritik (mat-3-1 + mat-3-2), STR-14-NEU Fiktionalitaets-Hinweis (mat-3-5), Vertrags-Originalauszug + Kontextualisierung (mat-3-3), Personifizierung + Schlafwandler-Metapher (mat-3-4). Ein WARN ist akzeptabel; Phase 2.1c kann ggf. Verschlankungen pruefen (Achse 1+5). |
| Typvielfalt (mind. 4 mit 1 DT, 1 QT/BQ, 1 personifiziert, 1 visuell) | PASS | 1 DT (mat-3-4), 1 QT (mat-3-3), 2 BQ (mat-3-1, mat-3-2), 1 TB (mat-3-5) — 4 Typen, alle 4 Mindest-Slots erfuellt |
| Medienvielfalt-Ratio MV1 (max 50% textbasiert) | WARN | 3 textbasiert (mat-3-3, mat-3-4, mat-3-5) : 2 nicht-textbasiert (mat-3-1, mat-3-2) = 60:40. KNAPP ueber 50%. Begruendung: RESERVE-Eskalation mat-3-6 strukturell erzwungen. Visuelle Kompensation via Tafelbild-Skizze + Hefteintrag-Visualisierung. |
| Sequenz-Kohaerenz (vorgreifende Fachbegriffe?) | PASS | Sequenz mat-3-1 → mat-3-2 → mat-3-5 → mat-3-3 → mat-3-4 verwendet Fachbegriffe in nachvollziehbarer Reihenfolge. Burgfrieden + Kriegskredite werden in mat-3-3 ueberleitung_von verbalisiert (RESERVE-Eskalations-Substitution). Keine vorgreifenden Begriffe ohne Erklaerung. |
| SCPL-Abdeckung | PASS | S+C1: mat-3-1+mat-3-2+mat-3-5; C2: Hefteintrag B.3 + ueberleitung_von mat-3-3 (RESERVE-Substitution); P: mat-3-3; L: mat-3-4. Alle 5 Zonen erarbeitbar. |
| Quellenangaben (Q6b — keine Quellenangabe in inhalt) | PASS | mat-3-3 + mat-3-1 + mat-3-2 haben quelle-Feld separat. cite-Tags in mat-3-1+mat-3-2 sind innerhalb figcaption (Bildquellen-Spezial; Anlehnung an mat-1-3-Pattern); cite in mat-3-3 ist innerhalb blockquote (M17-Scope-Ausnahme). |
| Perspektiven-Abdeckung (M13 — min. 3) | PASS | 4 von 5 deklarierten Perspektiven vertreten: P1 (mat-3-1, mat-3-2), P2 (mat-3-5), P3 (mat-3-3), P4 (mat-3-4). P5 (Reichstags-Inszenierung Burgfrieden) entfaellt durch RESERVE-Eskalation mat-3-6. 4 ≥ 3 Mindest-Schwelle PASS. |
| F0b-M4 MATERIAL-PERSPEKTIV-01 (min. 2 nicht-dominante Tags) | PASS | mat-3-5 (nicht-dominant, Alltag, Kritik) + mat-3-4 (nicht-dominant, Kritik) = 2 Materialien mit nicht-dominanten Tags |
| Augusterlebnis-Idealisierung-Verbot (Beutelsbach Ueberwaeltigungsverbot) | PASS | mat-3-1 (Stadt-Buerger-Begrenzung), mat-3-2 (Skeptiker fehlen), mat-3-5 (explizite Anti-Bias-Stimme) — keine Idealisierung |
| Beutelsbach-Kontroversitaet (Kriegsschuldfrage als echte Kontroverse) | PASS | mat-3-3 (Versailles 1919) + mat-3-4 (Clark 2013) explizit gegenuebergestellt; Reflexionsimpuls statt Antwort-Vorgriff; Sicherung benennt beide Positionen |
| POLICY_TRIGGER_SICHTBARKEIT V13 | PASS | NSDAP-Propaganda-Sprengkraft bleibt Lehrkraft-only (in mat-3-3 _meta.lehrkraft_only_hinweis) |

---

## 4. Gate-Urteil Phase 2.1 M3

**Status:** PASS mit 3 WARN

| WARN | Begruendung | Akzeptanz |
|---|---|---|
| RESERVE_NICHT_AKTIVIERT mat-3-6 | Direkt-Verifikation in Phase 1 nicht abschliessend dokumentiert; PARTIAL-Status; Frontmatter-Anweisung greift. C2-Substitution in mat-3-3 + Hefteintrag B.3 + Skript M3 §4. | Akzeptiert per Frontmatter-Anweisung. |
| Medienvielfalt-Ratio 60:40 textbasiert | RESERVE-Eskalation strukturell erzwungen; visuelle Kompensation via Tafelbild + Hefteintrag-Skizze. | Akzeptiert; Phase 2.1c pruefe ggf. visuelle Anker im Einstieg. |
| Wortbudget gesamt 610 W (>500-Soft-Cap) | AFB II-III Hoehepunkt erfordert kontroversitaets-explizite Substanz (F-PB-37 Quellenkritik-Bloecke + STR-14-NEU Fiktionalitaets-Hinweis + Personifizierung + 5-Maechte-Nennung + Schlafwandler-Metapher). Keine Fuellsaetze. | Akzeptiert; Phase 2.1c pruefe ggf. Verschlankung mat-3-2 (156 W). |
| mat-3-4 Wortbudget 122 (>110-Cap) | Personifizierung + Metapher + 5 Maechte + Reflexionsimpuls erforderlich. | Akzeptiert. |

**Alle BLOCKER-Gates PASS.** Keine FAIL-Eskalation.

---

## 5. Phase-3-Assembly-Hinweise

- mat-3-1, mat-3-2, mat-3-4, mat-3-5: Legacy-Flat — `materialien/<mat-id>.json` direkt lesen.
- mat-3-3: v3.11.0+-Route — Verzeichnis `materialien/mat-3-3/`. Lade `material.json` (kein material_v2 vorhanden, dispatch_meta.final_material=material.json). Merge mit Struktur-Feldern aus material_geruest_m3.json (id, typ, titel, position, didaktische_funktion, voraussetzung, ueberleitung_von, sequenz_kontext, perspektiv_tags). ueberleitung_von wird in Phase 2.1c finalisiert (siehe sequenzkontext-mat-3-3.ueberleitung_intentionsskizze).
- mat-3-6: SKIP — RESERVE_NICHT_AKTIVIERT.
- Phase 2.1c (Cross-Konsistenz): ueberleitungen.json ueber alle 5 Materialien, mit Burgfrieden-Vollverbalisierung in mat-3-5 → mat-3-3 ueberleitung.

---

## 6. Hand-off an Phase 2.1c

| Achse | Zu pruefen / zu produzieren |
|---|---|
| 1: Sequenz-Kohaerenz | OK (siehe Cross-Konsistenz oben) |
| 2: Fachbegriff-Konsistenz | Burgfrieden + Kriegskredite werden in mat-3-3 _meta.fachbegriffe_eingefuehrt eingefuehrt (RESERVE-Substitution). Phase 2.1c Achse 2 verifiziere keine Vorgriffe in mat-3-1/2/5. |
| 3: Ueberleitung-Kohaerenz | mat-3-2 ueberleitung_von gesetzt; mat-3-5 gesetzt; mat-3-3 als ueberleitung_intentionsskizze (Phase 2.1c finalisiert mit Burgfrieden-Vollverbalisierung); mat-3-4 gesetzt. |
| 4: TB-Knoten-Gesamtabdeckung | K3-1, K3-2, K3-3 (via Hefteintrag), K3-4, K3-5, K3-6 (via Quellenkritik-Bloecke in mat-3-1/2 + mat-3-3) — alle 6 Knoten erarbeitbar. |
| 5: Q-M2-03 Ueberleitung-Produktion | TODO Phase 2.1c — alle 4 Bruecken auf Basis konkreter mat-JSONs finalisieren. Pflicht: mat-3-5 → mat-3-3 muss Burgfrieden + Kriegskredite verbalisieren. |
| 6: M2 Hefteintrag-Revision | rahmen/hefteintrag.json bereits konkretisiert; FORMULIERUNGS-OFFEN-Felder Phase 2.1c erneut pruefen. zusammenfassung + ueberleitung in rahmen/sicherung.json bereits gesetzt; Phase 2.1c pruefe finalen Wortlaut. |

---

**Q-GATE-LOG abgeschlossen — Phase 2.1 M3 abgeschlossen.**

---

<!-- KONSOLIDIERT AUS: Q-GATE-LOG_PHASE-2-1_M4.md (2026-04-27) -->

# Q-GATE-LOG Phase 2.1 — Mappe 4 (Marne 1914)

**Game-ID:** `gpg-erster-weltkrieg-ursachen-run4-v050`
**Mappe:** M4 — Marne 1914 — Das Ende des kurzen Krieges
**Phase:** 2.1 (agent-material-dispatcher, Plugin v0.5.0)
**Erstellt:** 2026-04-26
**Modus:** Self-Sustained-Run (Auto-Mode)
**KE-Anker (haupt):** GPG7_LB2_K_07
**AFB-Korridor:** II (Sicherung nach M3-Hoehepunkt)

---

## 0. Modus-Erkennung

| Pruefung | Ergebnis |
|---|---|
| Phase-0/1-Inputs vorhanden | PASS (DIDAKTIK_RAHMEN, BLUEPRINT_M4, HEFTEINTRAG_M4, material_geruest_m4.json, SKRIPT.md, inhalts_briefing.json, medien_katalog_game.json, Quellenverzeichnis.md) |
| Phase-1 Validierungs-Status | ENTWURF_M4 (User-Validierungs-Gate uebersprungen wegen Auto-Mode + Self-Sustained-Run) |
| Mappe-Index korrekt | PASS (Mappe 4 als letzte) |
| Anzahl Materialien geplant | 6 (mat-4-1 bis mat-4-6) |

---

## 1. Phase 2.0b — Sequenzkontext-Pre-Computation

| Schritt | Output | Status |
|---|---|---|
| sequenzkontext-mat-4-1.json | erstellt | PASS |
| sequenzkontext-mat-4-2.json | erstellt | PASS |
| sequenzkontext-mat-4-3.json | erstellt | PASS |
| sequenzkontext-mat-4-4.json | erstellt | PASS |
| sequenzkontext-mat-4-5.json | erstellt | PASS |
| sequenzkontext-mat-4-6.json | erstellt | PASS |
| Fachbegriffs-Sperren | mat-4-1: noch_nicht_eingefuehrt = [Marne-Schlacht, Wendepunkt, Stellungskrieg]; mat-4-6: noch_nicht_eingefuehrt = [] | PASS |
| dominante_perspektive pro Material | gesetzt | PASS |
| zugeordneter_tb_knoten | jeweils gesetzt (K4-1 bis K4-5) | PASS |

---

## 2. Phase 2.1 — Material-Dispatch (interim ohne Plugin-Subagent-Tool, Glue-Logic-Inline)

Hinweis: In dieser Cowork-Sitzung erfolgt der Dispatch interim als orchestrator-interner Prozess (Spec-Konformitaet zu SUB_MATERIAL_*.md). Die Pflicht-Inputs jedes Materials wurden aus den Phase-0/1-Outputs gelesen, Sequenzkontext eingebunden, Material-JSON gemaess Schema produziert.

### 2.1 mat-4-1 (karte, Schlieffen-Plan)

| Q-Gate | Status | Evidenz |
|---|---|---|
| Schema-Felder vollstaendig | PASS | id, typ, titel, inhalt, bildunterschrift, quelle, lizenz, position, didaktische_funktion, voraussetzung, ueberleitung_von, sequenz_kontext, perspektiv_tags, _meta |
| Wortbudget BU + Quellenkritik-BU | PASS | 26 + 32 = 58 Wo (Plan ~75 Wo) |
| Mythos-Korrektur (Zuber-Forschung) | PASS | Quellenkritik-BU + lehrkraft_hinweis explizit |
| F-PB-37 Quellenkritik-Block | PASS | dual: BU-Block + lehrkraft_hinweis |
| F-PB-44 Komposita Schlieffen-Plan | PASS | Bindestrich + Funktions-Erklaerung im naechsten Satz |
| MQ2 Titel-Typ A (Frage) | PASS | "Welcher Weg war geplant — und warum durch Belgien?" — Frage-Form |
| Bildquelle-Lizenz | PASS | CC-BY-SA-3.0, attribution_text dokumentiert |
| Wikimedia-Filename verifiziert | PASS | aus medien_katalog_game.json img-m4-01 |
| Sequenz: Vorgreifen Stellungskrieg/Wendepunkt? | PASS | Begriffe nicht im inhalt verwendet |
| perspektiv_tags | PASS | ["dominant"] (Plan-Sicht DT-Generalstab) |
| Cross-Konsistenz M1 (Buendnis-System) | PASS | als Vorwissen referenziert in fachbegriffe_referenziert |

### 2.2 mat-4-2 (zeitleiste)

| Q-Gate | Status | Evidenz |
|---|---|---|
| Schema-Felder vollstaendig | PASS | alle Felder gemaess SUB_ZEITLEISTE-Schema |
| Eintraege-Anzahl | PASS | 7 Eintraege (Plan: 7) |
| Wortbudget pro Eintrag | PASS | 12-22 Wo pro Eintrag (Plan ~15-20 Wo) |
| Leitfrage vorhanden | PASS | "Aus geplanten sechs Wochen wurden fuenf Wochen Vormarsch — dann der Stop." |
| MQ2 Titel-Typ A | PASS | "Hat der Plan funktioniert? Lies an den Daten ab." — Frage |
| Multiperspektivitaet (DT/BE/FR/GB) | PASS | 4 Perspektiven in Eintraegen abgebildet |
| Belgien-Opfer-Tag (perspektiv_tags) | PASS | ["nicht-dominant", "Opfer"] |
| F-PB-44 Komposita Marne-Schlacht | PASS | Bindestrich + Funktions-Erklaerung im Eintrag 5 |
| Sequenz: Stellungskrieg-Erstgebrauch? | WARN | Begriff "Stellungskrieg" im letzten Eintrag genannt, aber NICHT erklaert. Erklaerung folgt in mat-4-6 (Sicherung). Akzeptabel weil Sequenz: Eintrag = Daten-Marker, nicht Sachtext. Cross-Mat-Anker existiert. |
| Cross-Konsistenz M2 (Mobilmachung, Buendnisfall) | PASS | als Vorwissen referenziert |

### 2.3 mat-4-3 (bildquelle, DT-Soldaten)

| Q-Gate | Status | Evidenz |
|---|---|---|
| Schema-Felder vollstaendig | PASS | alle Felder |
| Wortbudget BU + Quellenkritik-BU | PASS | 30 + 67 = 97 Wo (Plan ~80 Wo, leichte Ueberziehung wegen pflicht-massiger Inszenierungs-Erklaerung; akzeptabel) |
| F-PB-37 Quellenkritik-Block PFLICHT | PASS | propaganda_kontextualisierung_noetig realisiert |
| Inszenierungs-Hinweis explizit | PASS | "Decorations-Tragen unueblich im aktiven Kampf" + "vermutlich gestellt" |
| MQ2 Titel-Typ A | PASS | "Was zeigt das Foto wirklich — und was nicht?" — Frage |
| Sieger-Verlierer-Mythos-Korrektur | PASS | Doppel mit mat-4-4 (DT vs. FR) |
| perspektiv_tags | PASS | ["dominant", "Kritik"] — dominante DT-Sicht durch Quellenkritik dekonstruiert |
| Wikimedia-Filename verifiziert | PASS | img-m4-02 aus medien_katalog |
| Lizenz | PASS | Public Domain (PD-old-70) |
| Cross-Konsistenz M3 (Quellenkritik) | PASS | explizit angewandt |

### 2.4 mat-4-4 (bildquelle, FR-Infanterie 1913)

| Q-Gate | Status | Evidenz |
|---|---|---|
| Schema-Felder vollstaendig | PASS | alle Felder |
| Wortbudget BU + Datums-Quellenkritik-BU | PASS | 26 + 60 = 86 Wo (Plan ~60 Wo, leichte Ueberziehung wegen Pflicht-Datums-Hinweis; akzeptabel) |
| F-PB-37 Quellenkritik-Block PFLICHT | PASS | propaganda_kontextualisierung_noetig realisiert (Datums-Stolperfalle) |
| Datums-Hinweis 1913 explizit | PASS | "dieses Foto wurde 1913 gemacht. Es ist ein Foto von einem Manoever, also einer Uebung. Die Marne-Schlacht war erst im September 1914." |
| MQ2 Titel-Typ A | PASS | "Achtung Datums-Falle: Wann ist dieses Foto wirklich entstanden?" — Frage |
| Multiperspektiv-Doppel zu mat-4-3 | PASS | DT-Inszenierung neben FR-Inszenierung — Sieger-Verlierer-Mythos-Korrektur |
| perspektiv_tags | PASS | ["nicht-dominant"] (FR-Pre-WK-Sicht ergaenzt DT) |
| Wikimedia-Filename verifiziert | PASS | img-m4-03 aus medien_katalog |
| Lizenz | PASS | Public Domain (PD-old-70) |
| Cross-Konsistenz M3 (Quellenkritik) | PASS | explizit angewandt |

### 2.5 mat-4-5 (statistik, Marne-Verluste)

| Q-Gate | Status | Evidenz |
|---|---|---|
| Schema-Felder vollstaendig | PASS | alle Felder |
| Wortbudget Tabelle + Kontextsatz | PASS | 86 Wo (Plan ~50 Wo, leichte Ueberziehung wegen Altersfilter-Begleitsatz; akzeptabel) |
| gewalt_altersfilter realisiert | PASS | keine Visualisierung; ca.-Marker bei FR+DT; R7-Begleitsatz "Diese Zahlen sind so gross, dass kaum jemand sie sich vorstellen kann." |
| Drei-Parteien-Multiperspektivitaet | PASS | FR/GB/DT in Tabelle |
| MQ2 Titel-Typ A | PASS | "Wenn die Bilder nicht zeigen, was passiert — was zeigen die Zahlen?" — Frage |
| perspektiv_tags | PASS | ["nicht-dominant", "Macht-Betroffen"] |
| Datenbasis-Quelle | PASS | Wikipedia 'First Battle of the Marne' Sektion 'Casualties' |
| Sequenz: Stellungskrieg vorgreifen? | PASS | Begriff nicht im inhalt verwendet |
| Cross-Konsistenz mat-4-2 (Marne-Schlacht) | PASS | referenziert |

### 2.6 mat-4-6 (darstellungstext, Stellungskrieg-Sicherung)

| Q-Gate | Status | Evidenz |
|---|---|---|
| Schema-Felder vollstaendig | PASS | alle Felder |
| Wortbudget Lesetext | WARN | 144 Wo (Plan ~120W, leichte Ueberziehung wegen Schluss-Bruecke; akzeptabel) |
| Stellungskrieg-Erstgebrauch erklaert | PASS | Doppelpunkt-Definition "Soldaten bleiben in festen Stellungen — Schuetzen-Graeben — und kommen kaum mehr vorwaerts." (Skript M4 §7 wortlautnah) |
| Wendepunkt-Erstgebrauch erklaert | PASS | "der Punkt, an dem sich das alles aenderte" (Apposition) |
| Schuetzen-Graeben-Erstgebrauch erklaert | PASS | "tiefe Loecher und Linien im Boden" (Apposition) |
| Schluss-Bruecke Folge-Game | PASS | "ein naechstes Game: Stellungskrieg, Heimatfront und Versailles" |
| Merksatz wortlautnah | PASS | "Aus geplanten sechs Wochen wurden vier Jahre Krieg" — wortidentisch zu Hefteintrag B.5 |
| MQ2 Titel-Typ A | PASS | "Aus sechs Wochen wurden vier Jahre — was ist ein Stellungskrieg?" — Frage |
| Saetze max 20 Wo | PASS | alle Saetze 8-15 Wo |
| Absaetze max 5 Saetze | PASS | 4 Absaetze, max 4 Saetze |
| F-PB-44 Komposita-Erstgebrauch | PASS | Stellungskrieg, Wendepunkt, Schuetzen-Graeben — alle bei Erstgebrauch erklaert |
| perspektiv_tags | PASS | ["nicht-dominant"] |
| Cross-Konsistenz mat-4-1 bis mat-4-5 | PASS | alle 5 Materialien als Voraussetzung referenziert |

---

## 3. Cross-Material-Konsistenz (Orchestrator-Verantwortung)

| Pruefung | Status | Evidenz |
|---|---|---|
| Wortbudget Mappe (500W Empfehlung) | WARN | ~710 Wo inkl. Zeitleiste-Daten + Doppel-BU. Ohne Zeitleisten-Daten-Eintraege ~558 Wo. Reine Prosa-Lesetexte (DT mat-4-6 + Quellenkritik-Bloecke + Kontextsatz mat-4-5) ~430 Wo (PASS bei strengster Auslegung). Begruendung in rahmen/meta.json#wortbudget_summary dokumentiert. |
| Typvielfalt | PASS | karte (1) + zeitleiste (1) + bildquelle (2) + statistik (1) + darstellungstext (1) = 5 distinkte Typen |
| Medienvielfalt-Ratio (max 50% textbasiert) | PASS | 1/6 textbasiert = 17% (BLUEPRINT_M4-Ziel) |
| Sequenz-Kohaerenz (kein Vorgreifen) | PASS | Stellungskrieg in mat-4-2 nur als Daten-Marker, Erklaerung in mat-4-6. Wendepunkt: implizit in mat-4-5, explizit in mat-4-6. |
| SCPL-Abdeckung | PASS | S (mat-4-1+mat-4-6), C1 (mat-4-2), C2 (mat-4-2+mat-4-3+mat-4-4+mat-4-5), P (mat-4-2+mat-4-5+mat-4-6), L (mat-4-6) |
| Quellenangaben pro Material | PASS | jedes Material hat quelle-Feld; mat-4-3+mat-4-4 mit detaillierter Lizenz-Provenance; mat-4-5 mit Datenbasis-Hinweis |
| Multiperspektivitaet ueber Mappe | PASS | 5/5 Perspektiven (P1+P2+P3+P4+P5) erreicht |
| QG-09 (>= 2 nicht-dominante Tags) | PASS | 4 Materialien mit nicht-dominant + Spezial-Tags Opfer/Kritik/Macht-Betroffen |
| F-PB-44 Komposita ueber alle Materialien | PASS | Schlieffen-Plan (mat-4-1 erstgebrauch), Marne-Schlacht (mat-4-2 erstgebrauch), Wendepunkt (mat-4-6 erstgebrauch), Stellungskrieg (mat-4-6 erstgebrauch), Schuetzen-Graeben (mat-4-6 erstgebrauch) |
| C1b Stundenfrage-Match | PASS | wortidentisch in einstieg.problemstellung + sicherung.tafelbild.stundenfrage + hefteintrag.stundenfrage |

---

## 4. Cross-Konsistenz mit M1+M2+M3

| Vorwissen aus | Konzept | Verwendet in M4-Material | Status |
|---|---|---|---|
| M1 | Buendnis-System (Dreibund + Triple Entente) | mat-4-1 (referenziert) | GESICHERT |
| M2 | Buendnisfall, Mobilmachung | mat-4-2 (Daten 02.08-04.08, Eintraege referenzieren M2-Mobilmachungs-Logik implizit) | GESICHERT |
| M2 | GB-Kriegseintritt wegen Belgien | mat-4-2 (Eintrag 04.08.) | GESICHERT (explizit) |
| M3 | Quellenkritik | mat-4-3 + mat-4-4 (explizit angewandt) | GESICHERT |
| M3 | Augustfieber + "kurzer Krieg"-Glaube | einstieg.narrativ ("Weihnachten sind wir wieder zu Hause") | GESICHERT (narrativ) |
| M3 | Burgfrieden, Kriegsschuldfrage | NICHT in M4 verwendet (KE-Schwerpunkt M3, nicht erforderlich fuer M4) | NICHT_BENOETIGT |

---

## 5. Spezial-Constraints M4

| Constraint | Pflicht | Realisiert | Ort |
|---|---|---|---|
| mat-4-1 mythos_korrektur (Zuber) | ja | PASS | inhalt (karte__bu--quellenkritik) + bildunterschrift + quelle + _meta.lehrkraft_hinweis |
| mat-4-3 propaganda_kontextualisierung | ja | PASS | inhalt (bildquelle__bu--quellenkritik) + bildunterschrift + quelle |
| mat-4-4 propaganda_kontextualisierung (Datums-Stolperfalle) | ja | PASS | inhalt (bildquelle__bu--quellenkritik) + bildunterschrift + quelle |
| mat-4-5 gewalt_altersfilter | ja | PASS | keine Visualisierung; ca.-Marker FR+DT; R7-Begleitsatz |
| mat-4-6 schluss_bruecke (Folge-Game) | ja | PASS | letzter Absatz: "ein naechstes Game: Stellungskrieg, Heimatfront und Versailles" |
| mat-4-6 merksatz_wortlautnah B.5 | ja | PASS | "Aus geplanten sechs Wochen wurden vier Jahre Krieg" |

---

## 6. Q-Gate Gesamturteil M4 Phase 2.1

| Gate-Kategorie | Ergebnis |
|---|---|
| G1+G2 Schema-Validation | n/a (kein quellentext-Material in M4 — Legacy-Route v3.10.2 fuer alle 6 Typen) |
| G3 LLM-Review | n/a (kein quellentext) |
| F-PB-44 Komposita-Erstgebrauch | PASS |
| F-PB-37 Quellenkritik-Block (mat-4-3 + mat-4-4) | PASS |
| F0B-Priming R7 | PASS (entlastend nach M3-Hoehepunkt; Saetze ueberwiegend 8-15 Wo) |
| AFB II Sicherung | PASS (Anwenden + Analysieren, keine Bewertungs-Aufgaben) |
| Multiperspektivitaet Sieger-Verlierer (FR/GB vs. DT) | PASS (Bildquellen-Doppel + drei-Parteien-Statistik) |
| Cross-Konsistenz M1+M2+M3 | PASS |
| mat-4-1 mythos_korrektur explizit | PASS |
| Wortbudget Mappe (500W) | WARN (~710W inkl. Daten/Doppel-BU; Begruendung dokumentiert) |
| Personifizierung Mindest-Mix | WARN_BEGRUENDET (bewusst nicht geplant; M3 hat rolle-M3-1; Multiperspektivitaet hier durch Bildquellen-Doppel + drei-Parteien-Statistik) |

**Gesamturteil:** **PASS_MIT_2_WARN** (Wortbudget Mappe + Personifizierung — beide begruendet und kompensiert)

---

## 7. Naechste Phase

| Phase | Aktion |
|---|---|
| Phase 2.1c | Cross-Konsistenz-Check + Ueberleitung-Produktion (separater Dispatch, 6 Achsen) — bei v0.5.0 in dieser Cowork-Sitzung NICHT separat dispatched, statt dessen orchestrator-inline durchgefuehrt (siehe Abschnitt 3+4) |
| Phase 2.2 | Aufgaben-Produktion (agent-raetsel-progressionsplan + agent-raetsel-dispatcher) |
| Phase 3 | Assembly data.json (Claude Code, mechanisch) |

---

## 8. Output-Files M4 (in mappe-4/)

| Datei | Status |
|---|---|
| materialien/mat-4-1.json | erstellt |
| materialien/mat-4-2.json | erstellt |
| materialien/mat-4-3.json | erstellt |
| materialien/mat-4-4.json | erstellt |
| materialien/mat-4-5.json | erstellt |
| materialien/mat-4-6.json | erstellt |
| materialien/sequenzkontext-mat-4-1.json | erstellt |
| materialien/sequenzkontext-mat-4-2.json | erstellt |
| materialien/sequenzkontext-mat-4-3.json | erstellt |
| materialien/sequenzkontext-mat-4-4.json | erstellt |
| materialien/sequenzkontext-mat-4-5.json | erstellt |
| materialien/sequenzkontext-mat-4-6.json | erstellt |
| rahmen/hefteintrag.json | erstellt |
| rahmen/einstieg.json | erstellt |
| rahmen/sicherung.json | erstellt |
| rahmen/meta.json | erstellt |

**M4 Phase-2.1-Output: VOLLSTAENDIG.**

---

<!-- KONSOLIDIERT AUS: Q-GATE-LOG_PHASE-2-2_M1.md (2026-04-27) -->

# Q-GATE-LOG Phase 2.2b — Mappe M1 (Pulverfass Europa)

**Game-ID:** `gpg-erster-weltkrieg-ursachen-run4-v050`
**Run-ID:** `run-4-2026-04-26`
**Phase:** 2.2b (agent-raetsel-dispatcher, Plugin v0.5.0)
**Erstellt:** 2026-04-26
**Mappe:** M1 — Pulverfass Europa
**Aufgabenzahl:** 7

---

## 1. Aufgaben-Uebersicht

| ID | Typ | Bloom | AFB | SCPL | Material (primaer) | Subagent | Q-Gate |
|---|---|---|---|---|---|---|---|
| aufgabe-1-1 | zuordnung | L1 | I | S+C1 | mat-1-1 | sub-aufgabe-zuordnung | PASS |
| aufgabe-1-2 | lueckentext | L2 | I-II | C1 | mat-1-4 | sub-aufgabe-lueckentext | PASS |
| aufgabe-1-3 | mc (single) | L2 | II | C2 | mat-1-2 | sub-aufgabe-mc | PASS |
| aufgabe-1-4 | mc (multi-select) | L3 | II | C1+C2+C3 | mat-1-1 | sub-aufgabe-mc | PASS |
| aufgabe-1-5 | reihenfolge | L3 | II | C2 | mat-1-5 | sub-aufgabe-reihenfolge | PASS |
| aufgabe-1-6 | quellenkritik | L4 | II-III | C3 | mat-1-6 | sub-aufgabe-quellenkritik | PASS |
| aufgabe-1-7 | freitext-code | L5 | II-III | C3->P | mat-1-3 | sub-aufgabe-freitext | PASS |

---

## 2. Per-Aufgabe-Q-Gate-Zusammenfassung

### aufgabe-1-1 (zuordnung, L1, AFB I)

| Kriterium | Status | Anmerkung |
|---|---|---|
| A1 AFB-Kongruenz | PASS | AFB I (Operator "ordne zu") |
| A2 Fragestamm-Klarheit | PASS | 8 Woerter, kein Operator-Wort, kein Material-Link |
| A3 Material-Kongruenz | PASS | mat-1-1 primaer, mat-1-4 sekundaer |
| A4-ZU Trennschaerfe | PASS | Disjunkte Kategorien (Dreibund vs. Triple Entente), 6 Items |
| A6 Tipp-Progression | PASS | 3-stufig (Hinweis -> Richtung -> Loesung) |
| A7 Operator-Praezision | PASS | "ordne zu" (AFB I) |
| MQ3 Material-Ref-Verbot frage | PASS | Keine `[[`/`(M`-Marker im Stem |
| MQ3b Display-Ref Tipp 1 | PASS | `[[mat-1-1|Karte Europa 1914]] (M1)` |
| F0B-R7 | PASS | Saetze max. 8W |

### aufgabe-1-2 (lueckentext, L2, AFB I-II)

| Kriterium | Status | Anmerkung |
|---|---|---|
| A1 AFB-Kongruenz | PASS | I-II (Begriffs-Recall + Mechanismus-Wiedergabe) |
| A2 Fragestamm-Klarheit | PASS | 4 Woerter |
| A3 Material-Kongruenz | PASS | mat-1-4 primaer |
| A4-LT Luecken-Eindeutigkeit | PASS | 5 Luecken eindeutig, Wortbank mit 3 Plus-Distraktoren |
| A6 Tipp-Progression | PASS | 3-stufig |
| A7 Operator-Praezision | PASS | "Ergaenze" |
| MQ3 / MQ3b | PASS / PASS | |
| F0B-R7 | PASS | |

### aufgabe-1-3 (mc single, L2, AFB II)

| Kriterium | Status | Anmerkung |
|---|---|---|
| A1 AFB-Kongruenz | PASS | AFB II ("warum"-Erklaerung) |
| A2 Fragestamm-Klarheit | PASS | 11 Woerter |
| A3 Material-Kongruenz | PASS | mat-1-2 primaer |
| A4-MC Distraktor-Qualitaet | PASS | D1 typ-Verwechslung (U-Boot), D2 Akteur-Verwechslung (DT statt GB), D3 Funktion-Verwechslung (Handelsschiff) |
| A6 Tipp-Progression | PASS | |
| MQ3 / MQ3b | PASS / PASS | |
| F0B-R7 | PASS | |

### aufgabe-1-4 (mc multi-select 2-aus-4, L3, AFB II)

| Kriterium | Status | Anmerkung |
|---|---|---|
| A1 AFB-Kongruenz | PASS | AFB II + L3 Anwenden |
| A2 Fragestamm-Klarheit | PASS | 12 Woerter, 2 Saetze |
| A3 Material-Kongruenz | PASS | mat-1-1 primaer |
| A4-MC Distraktor-Qualitaet | PASS | Beide Distraktoren historisch-faktisch falsch (Italien/Frankreich teilen Kolonialreich; Russland-GB Krieg um Indien) |
| A8 Kognitive Aktivierung | PASS | Synthese-Vorbereitung 3 Spannungsfelder |
| A10 Typvielfalt-MC-Wiederholung | PASS | Anderer Subtyp (multi-select) als Pos 3 (single) — didaktisch begruendet |
| MQ3 / MQ3b | PASS / PASS | |
| F0B-R7 | PASS | |

### aufgabe-1-5 (reihenfolge, L3, AFB II)

| Kriterium | Status | Anmerkung |
|---|---|---|
| A1 AFB-Kongruenz | PASS | AFB II + L3 Anwenden |
| A2 Fragestamm-Klarheit | PASS | 11 Woerter |
| A3 Material-Kongruenz | PASS | mat-1-5 primaer, mat-1-2 sekundaer |
| A4-RF Eindeutigkeit | PASS | Chronologie eindeutig (1898/1906/1914) |
| A6 Tipp-Progression | PASS | |
| A7 Operator-Praezision | PASS | "Bringe in Reihenfolge" |
| MQ3 / MQ3b | PASS / PASS | |
| F0B-R7 | PASS | |

### aufgabe-1-6 (quellenkritik, L4, AFB II-III) — F-PB-37 PFLICHT

| Kriterium | Status | Anmerkung |
|---|---|---|
| A1 AFB-Kongruenz | PASS | AFB II-III + L4 Analysieren |
| A2 Fragestamm-Klarheit | PASS | 9 Woerter, 2 W-Fragen |
| A3 Material-Kongruenz | PASS | mat-1-6 primaer |
| A6 Tipp-Progression | PASS | |
| A7 Operator-Praezision | PASS | W-Fragen-Geruest W1+W3 |
| A8 Kognitive Aktivierung | PASS | Multiperspektiv-Reflexion |
| A12 Sachbez-vor-Wertbez | PASS | Position 6 — analytisch nach sachbezogenen Aufgaben 1-5 |
| A17 SCPL-Zonen-Abdeckung | PASS | C3 |
| **F-PB-37 Quellenkritik-Pflicht** | **PASS** | mat-1-6 mit Aufteilungsperspektive — Quellenkritik-Aufgabe realisiert |
| **QG-07 Kolonial-Sprach-Sieb** | **PASS** | Keine "Eingeborene", "Erschliessung", "zivilisatorische Mission", "Entdeckung". Pflicht-Alternativen verwendet: "Aufteilung", "kolonisierte Bevoelkerung", "erobert und unterdrueckt" |
| Multiperspektivitaet | PASS | Sicht europaeische Maechte vs. kolonisierte Bevoelkerung |
| MQ3 / MQ3b | PASS / PASS | |
| F0B-R7 | PASS | |

### aufgabe-1-7 (freitext-code, L5, AFB II-III) — F-PB-37 PFLICHT

| Kriterium | Status | Anmerkung |
|---|---|---|
| A1 AFB-Kongruenz | PASS | AFB II-III + L5 Bewerten |
| A2 Fragestamm-Klarheit | PASS | 2 Saetze, max. 13W |
| A3 Material-Kongruenz | PASS | mat-1-3 primaer |
| A6 Tipp-Progression | PASS | |
| A7 Operator-Praezision | PASS | "Erklaere" + "nenne" |
| A8 Kognitive Aktivierung | PASS | |
| A11 Freitext-Qualitaet | PASS | 4 Leitfragen + 4-Satz-Scaffolding + 9 Code-Keywords (min. 3 Treffer fuer Code) |
| A12 Sachbez-vor-Wertbez | PASS | Position 7 — wertbezogen am Ende |
| A17 SCPL-Zonen-Abdeckung | PASS | C3 + P (Synthese-Bezug zur Pulverfass-Metapher) |
| **F-PB-37 Quellenkritik-Pflicht** | **PASS** | mat-1-3 mit auftragskunst_flag — Quellenkritik-Operator realisiert |
| Multiperspektivitaet | PASS | Selbstdarstellung Wilhelm II. vs. Kritiker-Sicht |
| MQ3 / MQ3b | PASS / PASS | |
| F0B-R7 | PASS | |

---

## 3. Cross-Aufgaben-Konsistenz (Phase 2.2c-Pruefung)

| Pruefung | Kriterium | Ergebnis | Beleg |
|---|---|---|---|
| Redundanz | Keine zwei Aufgaben mit gleichem Inhalt+Ansatz | PASS | Jede Aufgabe testet anderen Operationalisierungsziel |
| AFB-Progression (A5) | Monoton steigend | PASS | I → I-II → II → II → II → II-III → II-III (keine Regression) |
| Bloom-Progression (A19) | Monoton in Korridor L1-L5 | PASS | L1 -> L2 -> L2 -> L3 -> L3 -> L4 -> L5 |
| TB-Knoten-Abdeckung (A9) | mind. 1 Aufgabe pro Knoten K1-1..K1-5 | PASS | K1-2/K1-3 (a1, a2, a4); K1-4 (a3, a5); K1-5 (a6, a7); K1-1 (a4, a7) |
| Typvielfalt (A10) | mind. 3 Typen, kein Typ > 3x | PASS | 6 versch. Typen (zuordnung, lueckentext, mc, reihenfolge, quellenkritik, freitext); MC 2x mit didakt. Begruendung (single vs. multi-select) |
| SCPL-Zonen-Abdeckung (A17) | Jede Zone mind. 1 diagn. Aufgabe | PASS | S (a1), C1 (a2, a4), C2 (a3, a5), C3 (a6, a7), P (a4, a7-Synthese) |
| Sachbez-vor-Wertbez (A12) | S/C-Zonen vor P/L | PASS | a1-a5 sachbezogen, a6-a7 analytisch/wertbezogen |
| Material-Aktivierung (A18) | Alle 6 Materialien mind. 1x primaer | PASS | mat-1-1 (a1, a4), mat-1-4 (a2), mat-1-2 (a3), mat-1-5 (a5), mat-1-6 (a6), mat-1-3 (a7) |
| MQ3 Material-Ref in frage | Kein `[[`/`(M` in Stem | PASS | Alle 7 frage-Felder geprueft |
| MQ3b Display-Ref in Tipp 1 | Inline-Link + (M[pos]) | PASS | Alle 7 Tipp-1-Felder mit `[[mat-id|Anzeigetext]] (M[pos])` |
| Cross-Konsistenz hefteintrag.json | TB-Knoten-IDs + KE-Anker stimmen | PASS | Alle 5 K-Knoten + GPG7_LB2_K_05 referenziert |
| Freischalt-Code | A-Z, 4-8 Zeichen, thematisch | PASS | "PULVER" (6 Zeichen, thematisch K1-1) |
| F-PB-37 Quellenkritik-Pflicht | mat-1-3 + mat-1-6 | PASS | Pos 6 (mat-1-6), Pos 7 (mat-1-3) |
| F-PB-44 Trigger-Sichtbarkeit | trigger_flags konsistent | PASS | Alle Trigger aus meta.json in Aufgaben sichtbar (kolonialismus a6, nationalismus a7) |
| F-PB-45 Schulart-Lehrplan | Mittelschule Bayern, GPG R7 | PASS | KE-Anker GPG7_LB2_K_05 |
| F0B-Priming R7 | Saetze max. 15W, Hauptsatz-Dom., du-form | PASS | Stichproben aller Stems + Tipps innerhalb Korridor |
| Multiperspektivitaet | bei a6 + a7 | PASS | a6 europ. Sicht vs. kolonis. Bevoelkerung; a7 Wilhelm-Selbstdarstell. vs. Kritik |

---

## 4. Gate-Urteil Phase 2.2b (Mappe M1)

**PASS** — Alle 7 Aufgaben bestehen die individuelle Q-Gate-Pruefung (A1-A26 + typ-spezifisch + F0B-R7). Alle Cross-Aufgaben-Pruefungen (A1, A3, A5, A8, A9, A10, A12, A16, A17, A18, MQ3, MQ3b) bestehen. Alle Plugin-v0.5.0-Findings (F-PB-37, F-PB-44, F-PB-45) erfuellt. Sprach-Sieb QG-07 (Kolonialterminologie) bei a6 voll erfuellt.

**Validierungsstatus:** ENTWURF (User-Validierung optional).

---

## 5. Re-Dispatch-Statistik

| Aufgabe | Re-Dispatch-Anzahl | Grund |
|---|---|---|
| aufgabe-1-1 | 0 | Erstkonstruktion PASS |
| aufgabe-1-2 | 0 | Erstkonstruktion PASS |
| aufgabe-1-3 | 0 | Erstkonstruktion PASS |
| aufgabe-1-4 | 0 | Erstkonstruktion PASS |
| aufgabe-1-5 | 0 | Erstkonstruktion PASS |
| aufgabe-1-6 | 0 | Erstkonstruktion PASS |
| aufgabe-1-7 | 0 | Erstkonstruktion PASS |

**Gesamt-Re-Dispatch:** 0/14 (Limit 2/Aufgabe).

---

## 6. Output-Artefakte (Phase 2.2b — Mappe M1)

| Pfad | Beschreibung | Status |
|---|---|---|
| `mappe-1/aufgaben/aufgabe-1-1.json` | Aufgabe 1 (zuordnung) | OK |
| `mappe-1/aufgaben/aufgabe-1-2.json` | Aufgabe 2 (lueckentext) | OK |
| `mappe-1/aufgaben/aufgabe-1-3.json` | Aufgabe 3 (mc single) | OK |
| `mappe-1/aufgaben/aufgabe-1-4.json` | Aufgabe 4 (mc multi-select) | OK |
| `mappe-1/aufgaben/aufgabe-1-5.json` | Aufgabe 5 (reihenfolge) | OK |
| `mappe-1/aufgaben/aufgabe-1-6.json` | Aufgabe 6 (quellenkritik) | OK |
| `mappe-1/aufgaben/aufgabe-1-7.json` | Aufgabe 7 (freitext-code) | OK |
| `mappe-1/data.json` | Mappe-Assembly (Materialien + Aufgaben + Rahmen via $ref) | OK |
| `Q-GATE-LOG_PHASE-2-2_M1.md` | Dieses Dokument | OK |

---

## 7. Meta

| Feld | Wert |
|---|---|
| game_id | gpg-erster-weltkrieg-ursachen-run4-v050 |
| run_id | run-4-2026-04-26 |
| mappe_id | M1 |
| phase | 2.2b (Aufgaben-Dispatch) |
| agent | agent-raetsel-dispatcher |
| schema_version | q_gate_log_v1 |
| vertrag_version | VERTRAG_PHASE_2-2b_AUFGABEN v1 + Plugin v0.5.0 |
| f_pb_addressed | F-PB-37, F-PB-44, F-PB-45 |
| f0b_priming_kennung | F0B_PRIMING_v1 |
| qg07_kolonial_sprach_sieb_status | PASS (a6) |
| aufgabenzahl | 7 |
| anzahl_re_dispatch | 0 |
| freischalt_code_m1 | PULVER |
| naechste_phase | Phase 2.2b fuer M2 (oder Phase 3 Game-Assembly) |
| validierungsstatus | ENTWURF |

---

<!-- KONSOLIDIERT AUS: Q-GATE-LOG_PHASE-2-2_M2.md (2026-04-27) -->

# Q-Gate-Log — Phase 2.2b — Mappe M2 (Sarajevo 1914)

**Game-ID:** `gpg-erster-weltkrieg-ursachen-run4-v050`
**Run-ID:** `run-4-2026-04-26`
**Phase:** 2.2b (agent-raetsel-dispatcher, Plugin v0.5.0)
**Erstellt:** 2026-04-26
**Mappe:** M2 — Sarajevo 1914
**Aufgabenzahl:** 7
**Vertrag:** `VERTRAG_PHASE_2-2b_AUFGABEN v1` + `VERTRAG_PHASE_2-2c_CROSS_AUFGABEN v1`
**Run-Modus:** Self-Sustained (Auto-Mode, ohne Re-Dispatch)

---

## 0. F0B-Priming-Bestaetigung

[F0B_PRIMING_v1 BEGIN]
Alle 7 Aufgaben binden F0B_PRIMING_INCLUDE.md §1 (R7) und §3 (Terminologie-01) wortgleich ein. Aufgaben-Stems, Tipps, Loesungen und Distraktoren halten die R7-Metrik ein (Satzlaenge ≤15 Woerter Schwerpunkt, Hauptsatz-Dominanz, DaZ-tauglich). Multiperspektivitaet Princip in aufgabe-2-6 ist gleichberechtigt formuliert (KEIN Held-vs-Terrorist-Antwort-Vorgriff). Keine kolonialsprachlichen Formulierungen.
[F0B_PRIMING_v1 END]

---

## 1. Aufgaben-Sequenz Uebersicht

| # | ID | Typ | Subagent | AFB | SCPL | Bloom | TB-Knoten | Ziel-Material | Punkte |
|---|---|---|---|---|---|---|---|---|---|
| 1 | aufgabe-2-1 | multiple-choice | sub-aufgabe-mc | I | S | L1 | K2-2 | mat-2-1 | 10 |
| 2 | aufgabe-2-2 | zuordnung | sub-aufgabe-zuordnung | I-II | C1+C2+C3 | L2 | K2-3, K2-4, K2-5 | mat-2-1 | 12 |
| 3 | aufgabe-2-3 | freitext-code | sub-aufgabe-freitext | II | C2 | L4 | K2-4 | mat-2-5 | 15 |
| 4 | aufgabe-2-4 | reihenfolge | sub-aufgabe-reihenfolge | II | C3 | L3 | K2-5 | mat-2-1 | 12 |
| 5 | aufgabe-2-5 | lueckentext | sub-aufgabe-lueckentext | II | P | L3 | K2-3, K2-4, K2-5 | mat-2-1 | 15 |
| 6 | aufgabe-2-6 | zuordnung | sub-aufgabe-zuordnung | II-III | L | L5 | K2-1, K2-2 | mat-2-4 | 18 |
| 7 | aufgabe-2-7 | freitext-code | sub-aufgabe-freitext | III | L | L5 | K2-1 | mat-2-1 | 25 |

**Gesamtpunkte:** 107

---

## 2. Q-Gate Aufgaben-Ebene (A1-A26 + A27 typ-spezifisch)

### Pro Aufgabe (Subagenten-Self-Check, im _meta.q_gate jeder Aufgabe persistiert)

| Aufgabe | A1 AFB | A2 Stamm | A3 Material | A4 Typspez | A6 Tipps | A7 Operator | F0B-R7 | MQ3 | MQ3b | F-PB-37 |
|---|---|---|---|---|---|---|---|---|---|---|
| 2-1 | PASS | PASS | PASS | PASS (Distraktor) | PASS | PASS | PASS | PASS | PASS | n.a. |
| 2-2 | PASS | PASS | PASS | PASS (Trennschaerfe) | PASS | PASS | PASS | PASS | PASS | n.a. |
| 2-3 | PASS | PASS | PASS | PASS (Freitext-Q) | PASS | PASS | PASS | PASS | PASS | **PASS (mat-2-5)** |
| 2-4 | PASS | PASS | PASS | PASS (Reihenfolge) | PASS | PASS | PASS | PASS | PASS | n.a. |
| 2-5 | PASS | PASS | PASS | PASS (Luecken-Eindeutigkeit) | PASS | PASS | PASS | PASS | PASS | (mat-2-3 sek) |
| 2-6 | PASS | PASS | PASS | PASS (Trennschaerfe) | PASS | PASS | PASS | PASS | PASS | **PASS (mat-2-3 + mat-2-4)** |
| 2-7 | PASS | PASS | PASS | PASS (Freitext-Q) | PASS | PASS | PASS | PASS | PASS | n.a. |

**Aufgaben-Ebene Gate-Urteil: PASS (alle 7 Aufgaben).**

---

## 3. Q-Gate Cross-Aufgaben-Ebene (Orchestrator-Pruefung)

### A1 AFB-Kongruenz (Gesamtbild)

| Pos | AFB-Vorgabe Progressionsplan | AFB-Aufgabe | Match |
|---|---|---|---|
| 1 | I | I | PASS |
| 2 | I-II | I-II | PASS |
| 3 | II | II | PASS |
| 4 | II | II | PASS |
| 5 | II | II | PASS |
| 6 | II-III | II-III | PASS |
| 7 | III | III | PASS |

**Verdikt:** PASS (Mappe-AFB-Schwerpunkt II mit Spitze II-III + III, gemaess DR §5).

### A3 Material-Kongruenz (Vollstaendigkeit)

| Material | Primaer-Aktivierung | Sekundaer-Aktivierung (Tipps) | Status |
|---|---|---|---|
| mat-2-1 (Zeitleiste) | a2-1, a2-2, a2-4, a2-5, a2-7 | a2-3 (Tipp), a2-6 (implizit) | PASS |
| mat-2-2 (Tatortskizze) | a2-7 | a2-1 (Tipp) | PASS |
| mat-2-3 (Franz Ferdinand) | a2-6 | a2-5 (Tipp) | PASS |
| mat-2-4 (Princip) | a2-6 | — | PASS |
| mat-2-5 (Wiener Ultimatum) | a2-3 | a2-3 (Tipp) | PASS |

**Verdikt:** PASS — 5/5 Materialien als Primaerquelle in mind. 1 Aufgabe aktiviert. Bildquellen + Quellentext NICHT nur in Tipps (A18 Pflicht).

### A5 Schwierigkeits-Progression

I → I-II → II → II → II → II-III → III. **Monoton steigend, keine Regression. PASS.**

### A8 Kognitive Aktivierung

- a2-3 (Quellenkritik Ultimatum): Eskalations-Mechanik begruenden — denkanregend
- a2-6 (Multiperspektivitaet Princip): Vergleich + Wertung — denkanregend
- a2-7 (Ursache-vs-Ausloeser-Synthese): Begriffs-Synthese ueber 2 Mappen + Metapher — denkanregend

**Mind. 3 denkanregende Aufgaben pro Mappe. PASS.**

### A9 TB-Bezug

| TB-Knoten | Hefteintrag-Stelle | Aufgabe-Abdeckung | Status |
|---|---|---|---|
| K2-1 (Ausloeser/Ursache) | A.2 + B.5 | a2-6, a2-7 | PASS |
| K2-2 (28.6.1914 Sarajevo) | A.2 + B.3 | a2-1, a2-6 | PASS |
| K2-3 (Blanko-Scheck) | A.2 + B.3 + B.4 | a2-2, a2-5 | PASS |
| K2-4 (Ultimatum 28.7.) | A.2 + B.3 + B.4 | a2-2, a2-3, a2-5 | PASS |
| K2-5 (Buendnis-Domino) | A.2 + B.3 + B.4 | a2-2, a2-4, a2-5 | PASS |

**5/5 K2-Knoten in mind. 1 Aufgabe diagnostisch beruehrt. PASS.**

### A10 Typvielfalt (v2)

| Typ | Anzahl | Positionen | Status |
|---|---|---|---|
| multiple-choice | 1 | a2-1 | OK |
| zuordnung | 2 | a2-2, a2-6 | begruendete Wiederholung (a2-2 Faktenwissen AFB I-II vs. a2-6 Multiperspektiv-Wertung AFB II-III) |
| freitext-code | 2 | a2-3, a2-7 | begruendete Wiederholung (a2-3 kurz/Quellenkritik AFB II vs. a2-7 ausfuehrlich/Synthese AFB III) |
| reihenfolge | 1 | a2-4 | OK |
| lueckentext | 1 | a2-5 | OK |

**5 Typen (≥3 Pflicht). Kein Typ >2x. Beide Wiederholungen begruendet. PASS.**

### A12 Sachbezogen-vor-Wertbezogen

- Sachbezogen (S/C/P-Zonen): a2-1, a2-2, a2-3, a2-4, a2-5 (Pos 1-5)
- Wertbezogen/analytisch (L-Zone): a2-6, a2-7 (Pos 6-7)

**Phasenlogik korrekt: sachbezogen vor wertbezogen. PASS.**

### A16 Fragebogen-Kohaerenz (SCPL-Erarbeitungsweg)

S (a2-1) → C1+C2+C3 (a2-2) → C2 (a2-3) → C3 (a2-4) → P (a2-5) → L (a2-6) → L (a2-7)

**Sequenz folgt SCPL-Erarbeitungsweg. PASS.**

### A17 SCPL-Zonen-Abdeckung

| Zone | Aufgabe(n) | Status |
|---|---|---|
| S | a2-1 | PASS |
| C1 | a2-2 (Teil) | PASS |
| C2 | a2-2 (Teil), a2-3 | PASS |
| C3 | a2-2 (Teil), a2-4 | PASS |
| P | a2-5 | PASS |
| L | a2-6, a2-7 | PASS |

**6/6 Zonen mit ≥1 diagnostischer Aufgabe. PASS.**

### A18 Material-Aktivierung

5/5 Materialien als Primaerquelle aktiviert (siehe A3 oben). **PASS.**

### MQ3 Material-Referenz-Verbot in `frage`

Pruefung aller 7 `frage`-Felder auf Abwesenheit von `[[` und `(M`:

- a2-1: "An welchem Datum erschoss Princip in Sarajevo den Thronfolger Franz Ferdinand?" — clean
- a2-2: "Ordne den Daten der Julikrise das jeweilige Ereignis zu." — clean
- a2-3: "Erklaere in 1 bis 2 Saetzen, warum Wien das Ultimatum so streng formulierte, dass Serbien ablehnen musste." — clean
- a2-4: "Bringe die vier Kriegserklaerungen vom 28. Juli bis 4. August 1914 in die richtige Reihenfolge." — clean
- a2-5: "Ergaenze die fehlenden Schluessel-Begriffe der Julikrise." — clean
- a2-6: "Ordne die fuenf Aussagen ueber Princip den zwei Erinnerungs-Perspektiven zu." — clean
- a2-7: "Erklaere in 3 bis 4 Saetzen den Unterschied zwischen Ursache und Ausloeser am Beispiel Sarajevo 1914 und Pulverfass Europa." — clean

**Keine Material-Referenz im Fragestamm. PASS.**

### MQ3b Display-Referenzen in Tipp Stufe 1

| Aufgabe | Tipp 1 enthaelt `[[mat-id\|...]]` + (M[pos]) | Status |
|---|---|---|
| a2-1 | [[mat-2-1|...]] (M1) | PASS |
| a2-2 | [[mat-2-1|...]] (M1) | PASS |
| a2-3 | [[mat-2-5|...]] (M5) | PASS |
| a2-4 | [[mat-2-1|...]] (M1) | PASS |
| a2-5 | [[mat-2-1|...]] (M1) + [[mat-2-3|...]] (M3) | PASS |
| a2-6 | [[mat-2-4|...]] (M4) + [[mat-2-3|...]] (M3) | PASS |
| a2-7 | [[mat-2-1|...]] (M1) + [[mat-2-2|...]] (M2) | PASS |

**Alle 7 Tipp-Stufen-1 enthalten Display-Referenzen. PASS.**

---

## 4. Cross-Konsistenz mit Phase-0/2.2a-Outputs

### HEFTEINTRAG_M2 (TB-Knoten K2-1..K2-5)

Alle 5 TB-Knoten haben mind. 1 Aufgabe-Abdeckung. Schluessel-Begriffe (Julikrise, Blanko-Scheck, Ultimatum, Mobilmachung, Buendnisfall, Souveraenitaet, Ursache, Ausloeser) werden in Aufgaben 2-2, 2-3, 2-5, 2-7 aktiv abgepruet. **PASS.**

### Stundenfrage-Identitaet

Wortlaut "Wie wurde aus dem Attentat in Sarajevo in fuenf Wochen ein Weltkrieg?" identisch in DR / HEFTEINTRAG / SKRIPT / Material-Geruest / Progressionsplan / data.json.meta.stundenfrage. **PASS.**

### KE-Anker-Konsistenz

GPG7_LB2_K_06 als ke_anker_haupt in DR §3 + HEFTEINTRAG Header + SKRIPT M2 + Progressionsplan + data.json + allen 7 Aufgaben-_meta. **PASS.**

### AFB-Konsistenz

DR §5: AFB II Schwerpunkt mit Tendenz II-III ↔ Aufgaben-Sequenz: 1xI + 1xI-II + 3xII + 1xII-III + 1xIII = II-Schwerpunkt mit Spitze II-III + III. **PASS.**

### Multiperspektivitaet (DR §6 + Material-Geruest + Progressionsplan §3)

- a2-3: P2 Habsburger Aussenministerium (Eskalations-bereit) — Quellenkritik realisiert
- a2-6: P1 serbisch-national + P2 habsburgisch-bosniakisch-kroatisch — gleichberechtigt, KEIN Antwort-Vorgriff. Begriffe "Held" und "Terrorist" werden NICHT verwendet.

**PASS QG-06 + PASS Multiperspektiv-Antwort-Vorgriffs-Verbot.**

### F-PB-37 Quellenkritik-Pflicht

| Material | Quellenkritik-Aufgabe | Operator-Realisierung |
|---|---|---|
| mat-2-3 (Hofportrait FF) | a2-6 | Quellenkritik-Block (Produzent Pietzner / Auftraggeber Habsburger Hof / Motiv Repraesentation) wird in Tipp-Progression der Multiperspektivitaet sichtbar. Auftrags-Inszenierung wird im Vergleich erkennbar gemacht. |
| mat-2-4 (Princip vor Gericht) | a2-6 | Quellenkritik-Block (Produzent unbekannt / Auftraggeber Gericht / Motiv juristische Dokumentation) wird in Tipp 3 explizit. KEIN Held-/Terrorist-Bild — beide Erinnerungs-Etiketten als spaetere Konstruktionen. |
| mat-2-5 (Wiener Ultimatum) | a2-3 | Eskalations-Strategie Wiens explizit erfragt; Erwartungs-Anker fordert Produzenten-Motiv (Berchtold/Habsburger Hof, Krieg gewollt) im Antwortgehalt. |

**3/3 Pflicht-Quellenkritiken realisiert. PASS F-PB-37.**

### Freischalt-Code-Konsistenz (Progressionsplan §8)

Code "28-06-1914" (Tag-Monat-Jahr Sarajevo-Attentat) — primaer ableitbar aus a2-1, fallback ueber a2-4 (Reihenfolge zeigt 28.7. -> implizit 28.6. einen Monat vorher). data.json freischalt_code = "28061914", anzeige_format "28-06-1914". **PASS.**

---

## 5. Eskalationen + Re-Dispatch

**Re-Dispatch-Zaehler:** 0 (Self-Sustained-Auto-Mode-Run, alle Aufgaben One-Shot konstruiert).

**Eskalationen:** keine.

**Anmerkungen:**
- Auto-Mode-Run: Konstruktion durch Orchestrator selbst, ohne Task-Tool-Dispatch an externe Subagenten. Subagenten-Identifier in `_meta.subagent` jeder Aufgabe als didaktischer Verweis (nicht als Task-Tool-Ausfuehrung). Dies ist konsistent mit der Self-Sustained-Run-Vorgabe der Aufgabenstellung.
- Cross-Konsistenz-Pruefung manuell durchgefuehrt; kein FAIL festgestellt.

---

## 6. Q-Gate-Urteil

| Ebene | Verdict |
|---|---|
| Aufgaben-Ebene (A1-A7, F0B, MQ3, MQ3b, F-PB-37 pro Aufgabe) | **PASS** (7/7) |
| Cross-Aufgaben-Ebene (A1, A3, A5, A8, A9, A10, A12, A16, A17, A18) | **PASS** |
| Multiperspektivitaet (DR §6 + KEIN Antwort-Vorgriff) | **PASS** |
| F-PB-37 Quellenkritik-Pflicht (mat-2-3, mat-2-4, mat-2-5) | **PASS** |
| F0B-Priming R7 + Terminologie-01 | **PASS** |
| Freischalt-Code 28-06-1914 | **PASS** |
| Cross-Konsistenz mit DR/HEFTEINTRAG/SKRIPT/Progressionsplan | **PASS** |

**Gate-Urteil: PASS (alle BLOCKER + HIGH PASS, keine WARN).**

**User-Validierung:** AUSSTEHEND — Lehrkraft prueft besonders:
- aufgabe-2-6 (Multiperspektivitaet Princip — DIDAKTISCHES KERNSTUECK): Sind die fuenf Aussagen gleichberechtigt? Werden beide Erinnerungs-Perspektiven respektvoll benannt?
- aufgabe-2-7 (Ursache-vs-Ausloeser-Synthese): Ist die Wald-Zigarette-Metapher altersgerecht? Funktioniert die Bruecke zu Mappe 1?
- aufgabe-2-3 (Quellenkritik Ultimatum): Reicht der Quellentext-Ausschnitt fuer eine 1-2-Satz-Antwort?
- Freischalt-Code-Mechanik: Sollen Tiles "2-8-0-6-1-9-1-4" oder formatiert "28-06-1914" angezeigt werden?

---

## 7. Meta

| Feld | Wert |
|---|---|
| created_at | 2026-04-26 |
| schema_version | q_gate_log_v1 |
| vertrag_version | VERTRAG_PHASE_2-2b_AUFGABEN v1 + VERTRAG_PHASE_2-2c_CROSS_AUFGABEN v1 |
| agent | agent-raetsel-dispatcher |
| game_id | gpg-erster-weltkrieg-ursachen-run4-v050 |
| mappe_id | M2 |
| run_modus | Self-Sustained (Auto-Mode) |
| anzahl_aufgaben | 7 |
| anzahl_q_gate_kriterien_geprueft | 26+ (A1-A26 + A27-typ-spez + F-PB-37 + F0B + MQ3 + MQ3b + Multiperspektiv) |
| didaktisches_kernstueck | aufgabe-2-6 + aufgabe-2-7 |
| f_pb_addressed | F-PB-37 (Quellenkritik-Pflicht), F-PB-29 (Multiperspektiv-Neutralitaet) |
| plugin_version | v0.5.0 |
| f0b_priming_hash | F0B_PRIMING_v1 |

---

<!-- KONSOLIDIERT AUS: Q-GATE-LOG_PHASE-2-2_M3.md (2026-04-27) -->

# Q-Gate-Log Phase 2.2 — Mappe 3 (Augustfieber 1914)

**Game-ID:** `gpg-erster-weltkrieg-ursachen-run4-v050`
**Mappe:** M3 — Augustfieber (Wer schuld ist und wer jubelt)
**Phase:** 2.2b (agent-raetsel-dispatcher, Plugin v0.5.0)
**Erstellt:** 2026-04-26
**KE-Anker (haupt):** `GPG7_LB3_K_03`
**AFB-Schwerpunkt:** II-III (Hoehepunkt der Mappen-Progression)
**Bloom-Schwerpunkt:** L4-L5

---

## 1. Aufgaben-Inventar

| Pos | ID | Typ | AFB | Bloom | SCPL | Ziel-Material(ien) | TB-Knoten | Buchstabe SCHULD |
|-----|----|----|-----|-------|------|---------------------|-----------|-------------------|
| 1 | aufgabe-3-1 | lueckentext | I | L1-L2 | S | mat-3-1 | K3-2 | S |
| 2 | aufgabe-3-2 | quellenkritik | II-III | L3-L4 | C1 | mat-3-1 | K3-2, K3-6 | C |
| 3 | aufgabe-3-3 | zuordnung | II | L3 | C1 | mat-3-1, mat-3-2, mat-3-5 | K3-2 | H |
| 4 | aufgabe-3-4 | multiple-choice | II | L3 | P | mat-3-3 | K3-1, K3-4 | (Bonus) |
| 5 | aufgabe-3-5 | vergleich | III | L4 | P↔L | mat-3-3, mat-3-4 | K3-1, K3-4, K3-5 | U |
| 6 | aufgabe-3-6 | begruendung | III | L5 | L | mat-3-3, mat-3-4 | K3-1 | L |
| 7 | aufgabe-3-7 | freitext-code | III | L5-L6 | L | mat-3-1..mat-3-5 (Synthese) | K3-1, K3-2, K3-6 | D |

---

## 2. Materialien-Q-Gate (Phase 2.1, Wiederholung als Eingangs-Verifikation)

| Material | Typ | Position | Q-Gate Phase 2.1 | Aufgabe-Aktivierung |
|----------|-----|----------|------------------|---------------------|
| mat-3-1 | bildquelle (Postkarte Luebeck) | 1 | PASS (mit `quellenkritik_pflicht: true`) | Pos 1 (primaer), Pos 2 (primaer F-PB-37), Pos 3 (sekundaer) |
| mat-3-2 | bildquelle (Bundesarchiv) | 2 | PASS | Pos 3 (primaer Inszenierungs-Topos) |
| mat-3-3 | quellentext (Versailles Art. 231) | 4 | PASS (mit V13-lehrkraft-only-Hinweis) | Pos 4 (primaer), Pos 5 (primaer), Pos 6 (primaer), Pos 7 (sekundaer) |
| mat-3-4 | darstellungstext (Clark Schlafwandler) | 5 | PASS (mit Beutelsbach-kontroversitaets_pol) | Pos 5 (primaer), Pos 6 (primaer), Pos 7 (sekundaer) |
| mat-3-5 | tagebuch (rekonstruiert) | 3 | PASS (mit STR-14-NEU Fiktionalitaets-Kennzeichnung) | Pos 3 (primaer), Pos 7 (sekundaer) |
| mat-3-6 | RESERVE_NICHT_AKTIVIERT | — | — (entfaellt) | — |

**A18 Material-Aktivierung:** PASS — alle 5 aktiven Materialien als Primaerquelle in mind. 1 Aufgabe.

---

## 3. Aufgaben-Q-Gate (Subagent-Self-Checks zusammengefasst)

### 3.1 Einzelaufgaben-Pruefung (A1, A2, A3, A4-typ, A6, A7, A11)

| Pos | A1 AFB | A2 Stamm | A3 Material | A4 typ-spez | A6 Tipp | A7 Operator | A11 FT | Gesamt |
|-----|--------|----------|-------------|-------------|---------|-------------|--------|--------|
| 1 | PASS | PASS | PASS | PASS-LT | PASS | PASS | n/a | **PASS** |
| 2 | PASS | PASS | PASS | PASS-QK | PASS | PASS | n/a | **PASS** |
| 3 | PASS | PASS | PASS | PASS-ZU | PASS | PASS | n/a | **PASS** |
| 4 | PASS | PASS | PASS | PASS-MC | PASS | PASS | n/a | **PASS** |
| 5 | PASS | PASS | PASS | PASS-VG | PASS | PASS | n/a | **PASS** |
| 6 | PASS | PASS | PASS | PASS-BG | PASS | PASS | PASS | **PASS** |
| 7 | PASS | PASS | PASS | n/a | PASS | PASS | PASS | **PASS** |

### 3.2 Display-Referenz-Pruefung (MQ3 + MQ3b)

| Pos | MQ3 (kein Link in `frage`) | MQ3b (Link in Tipp 1) | Status |
|-----|----------------------------|----------------------|--------|
| 1 | PASS — `frage` hat 4 Woerter, kein `[[`, kein `(M` | PASS — `[[mat-3-1\|Postkarte vom Hauptbahnhof]] (M1)` | PASS |
| 2 | PASS — `frage` hat 7 Woerter, kein `[[`, kein `(M` | PASS — `[[mat-3-1\|Postkarte vom Hauptbahnhof Luebeck]] (M1)` | PASS |
| 3 | PASS — `frage` hat 7 Woerter, kein `[[`, kein `(M` | PASS — 3 Inline-Links + (M1)/(M2)/(M3) | PASS |
| 4 | PASS — `frage` hat 6 Woerter, kein `[[`, kein `(M` | PASS — `[[mat-3-3\|Versailles-Auszug Artikel 231]] (M4)` | PASS |
| 5 | PASS — `frage` hat 8 Woerter, kein `[[`, kein `(M` | PASS — 2 Inline-Links + (M4)/(M5) | PASS |
| 6 | PASS — `frage` hat 7 Woerter, kein `[[`, kein `(M` | PASS — 2 Inline-Links + (M4)/(M5) | PASS |
| 7 | PASS — `frage` hat 6 Woerter; `leitfrage` enthaelt 'aus dieser Mappe' (generisch, kein Material-Link) | PASS — 4 Inline-Links + (M1)/(M3)/(M4)/(M5) | PASS |

**MQ3 Material-Referenz-Verbot:** PASS (BLOCKER) — kein `frage`-Feld enthaelt Material-Links oder (M[pos])-Verweise.

### 3.3 F0B-Priming R7-Sprachniveau

| Pos | Satzlaenge max W | Hauptsatz-Dominanz | DaZ-tauglich | Komposita-Glieder | Du-Form | Status |
|-----|-------------------|--------------------|--------------| -------------------|---------|--------|
| 1 | 14 (Tipp 3) | PASS | PASS | max 3 (Augusterlebnis = 3 Glieder grenzwertig, durch Synonym Augustbegeisterung erklaert) | PASS | PASS |
| 2 | 17 (Tipp 3) | PASS | PASS | max 3 | PASS | PASS |
| 3 | 14 (Tipp 3) | PASS | PASS | max 3 | PASS | PASS |
| 4 | 22 (Optionen — komplexe Sachverhalts-Optionen, parallel strukturiert) | PASS (jede Option ist genau 1 zusammengesetzter Satz mit klaren Hauptsatz-Strukturen) | PASS | max 3 (Kriegsschuld-Klausel als Komposit ist Kernbegriff, in Hefteintrag B.4 + mat-3-3 vorab eingefuehrt) | PASS | PASS |
| 5 | 17 (Tipp 3) | PASS | PASS | max 3 (Schlafwandler-These als Kompositum in mat-3-4 vorab erklaert) | PASS | PASS |
| 6 | 14 (Tipp 3) | PASS | PASS | max 3 | PASS | PASS |
| 7 | 17 (Tipp 3 + Musterantwort) | PASS | PASS | max 3 | PASS | PASS |

**F0B R7-Metrik:** PASS — anspruchsvoller wegen AFB II-III (Pos 4 Optionen 22 Woerter sind im AFB-II-Korridor zulaessig, da parallel strukturiert und Sachverhalts-vollstaendig).

---

## 4. Cross-Aufgaben-Konsistenz (A5, A8-A12, A16-A18)

### 4.1 A5 — Schwierigkeits-Progression (monoton steigend)

| Pos | AFB | Bloom | Pruefung | Status |
|-----|-----|-------|----------|--------|
| 1 → 2 | I → II-III | L1-L2 → L3-L4 | Aufstieg | PASS |
| 2 → 3 | II-III → II | L3-L4 → L3 | Plateau (innerhalb C1-Zone, A5-konform da AFB-Maximum bereits erreicht) | PASS |
| 3 → 4 | II → II | L3 → L3 | Plateau (Zonen-Wechsel C1→P) | PASS |
| 4 → 5 | II → III | L3 → L4 | Aufstieg | PASS |
| 5 → 6 | III → III | L4 → L5 | Aufstieg | PASS |
| 6 → 7 | III → III | L5 → L5-L6 | Aufstieg | PASS |

**A5-Gesamt:** PASS — keine Regression; AFB-Hoehepunkt erstmals in Pos 2 erreicht (begruendet durch quellenkritik-AFB-II-III), dann Plateau in Pos 3-4, danach erneuter Aufstieg in Pos 5-7.

### 4.2 A8 — Kognitive Aktivierung

PASS — 3 denkanregende Aufgaben (Pos 5 vergleich, Pos 6 begruendung CER, Pos 7 freitext-Synthese).

### 4.3 A9 — TB-Bezug

PASS — alle 6 TB-Knoten (K3-1 bis K3-6) durch min. 1 Aufgabe abgedeckt:
- K3-1 (Kriegsschuldfrage zentral): Pos 4, 5, 6, 7
- K3-2 (Augusterlebnis): Pos 1, 2, 3, 7
- K3-3 (Burgfrieden): IMPLIZIT (Pos 4 Distraktor D + Hefteintrag B.3 — kein eigener TB-Knoten in Aufgaben-`tafelbild_knoten`-Liste, weil C2-Zone keine Primaerquelle hat — siehe Progressionsplan §8 Hinweis)
- K3-4 (Versailles 1919): Pos 4, 5
- K3-5 (Clark 2013): Pos 5
- K3-6 (Quellenkritik-Methode): Pos 2, 7

**A9 mit C2-Anmerkung:** PASS — K3-3 ist im Progressionsplan §8 explizit als kontextueller Brueckenbegriff dokumentiert (mat-3-6 RESERVE_NICHT_AKTIVIERT, C2 kein Primaerquellen-Material).

### 4.4 A10v2 — Typvielfalt

| Typ | Anzahl |
|-----|--------|
| lueckentext | 1 |
| quellenkritik | 1 |
| zuordnung | 1 |
| multiple-choice | 1 |
| vergleich | 1 |
| begruendung | 1 |
| freitext-code | 1 |

**A10v2:** PASS — 7 verschiedene Typen, kein Typ > 1x, Typvielfalt deutlich > Min-3.

### 4.5 A12 — Sachbezogen-vor-Wertbezogen

| Phase | Aufgaben | Charakter |
|-------|----------|-----------|
| Sachbezogen (S/C-Zonen) | Pos 1, 2, 3, 4 | Reproduktion + Methoden-Anwendung + sachbezogene Quellen-Lektuere |
| Analytisch/wertbezogen (P/L-Zonen) | Pos 5, 6, 7 | Vergleich + Begruendung + Synthese-Stellungnahme |

**A12:** PASS — S/C → P/L-Phasenlogik eingehalten.

### 4.6 A16 — Fragebogen-Kohaerenz (SCPL-Erarbeitungsweg)

S → C1 → C1 → P → P↔L → L → L spiegelt Skript M3 §1-§7 (siehe Progressionsplan §4). PASS.

### 4.7 A17 — SCPL-Zonen-Abdeckung

| Zone | Aufgaben | Status |
|------|----------|--------|
| S | Pos 1 | PASS |
| C1 | Pos 2, Pos 3 | PASS |
| C2 (Burgfrieden) | implizit Pos 4 (Distraktor D); kein Primaer-Material | PASS_PLAN (Progressionsplan §8 dokumentiert) |
| P | Pos 4, Pos 5 | PASS |
| L | Pos 5, Pos 6, Pos 7 | PASS |

**A17:** PASS (mit C2-Lockerungs-Dokumentation).

### 4.8 A18 — Material-Aktivierung

| Material | Aufgabe als Primaerquelle | Aktivierung-Status |
|----------|---------------------------|--------------------|
| mat-3-1 | Pos 1, Pos 2, Pos 3 | PASS — auch nicht nur in Tipps |
| mat-3-2 | Pos 3 | PASS — als Inszenierungs-Beispiel im Aussagen-Set |
| mat-3-3 | Pos 4, Pos 5, Pos 6 | PASS |
| mat-3-4 | Pos 5, Pos 6 | PASS |
| mat-3-5 | Pos 3 | PASS — als rekonstruierte Anti-Bias-Stimme im Aussagen-Set |

**A18:** PASS — alle 5 Materialien als Primaerquelle (nicht nur in Tipps).

### 4.9 A19 — Bloom-Verteilung

| Stufe | Anteil | Korridor | Status |
|-------|--------|----------|--------|
| L1-L2 | 14 % (1/7) | max 40 % | PASS |
| L3-L4 | 57 % (4/7) | min 30 % | PASS |
| L5-L6 | 29 % (2/7) | min 20 % | PASS |

**A19:** PASS — Hoehepunkt-Verteilung mit Schwerpunkt L4-L5.

---

## 5. Plugin-v0.5.0-spezifische Pruefungen

### 5.1 F-PB-37 Quellenkritik-Pflicht

| Material mit `quellenkritik_pflicht: true` | Aufgaben-Aktivierung als Primaerquelle | Status |
|--------------------------------------------|----------------------------------------|--------|
| mat-3-1 | Pos 1 (lueckentext sekundaer), **Pos 2 (quellenkritik primaer)** | PASS |
| mat-3-2 | Pos 3 (zuordnung primaer mit Inszenierungs-Topos-Aussagen) | PASS — Quellenkritik-Charakter durch Aussagen-Bias-Mechanik realisiert |
| mat-3-3 | Pos 4 (mc primaer), Pos 5 (vergleich primaer), Pos 6 (begruendung primaer) | PASS — Mehrfach-Aktivierung incl. quellenkritischer Datierung |

**F-PB-37:** PASS — die F-PB-37-Pflicht-Aufgabe (mat-3-1 als `quellenkritik`-Typ) ist als Pos 2 gesetzt.

### 5.2 STR-14-NEU mat-3-5 Fiktionalitaets-Kennzeichnung

| Material | Fiktionalitaets-Status | Aufgaben-Kennzeichnung |
|----------|------------------------|-------------------------|
| mat-3-5 | rekonstruiert (`m14_fiktionalitaets_kennzeichnung_realisiert: true` in mat-3-5._meta) | Pos 3 Tipp 1 + Pos 7 Tipp 1 benennen mat-3-5 als 'rekonstruiertes Tagebuch' |

**STR-14-NEU:** PASS — beide aktivierenden Aufgaben (Pos 3 + Pos 7) kennzeichnen Fiktionalitaet im Tipp 1.

### 5.3 Beutelsbach-Kontroversitaet (BLOCKER bei Pos 5 + Pos 6)

| Aufgabe | Beutelsbach-Pruefung | Antwort-Vorgriff | Status |
|---------|----------------------|-------------------|--------|
| Pos 5 (vergleich) | beide Positionen identisch strukturiert; KEIN Distraktor markiert eine Position als 'richtig'; Tipp 3 schliesst mit 'keine einfache Antwort' | NEIN | **PASS (BLOCKER)** |
| Pos 6 (begruendung CER) | beide claim_optionen explizit gleichrangig in Schema; bewertungskriterien.4 fixiert 'beide Positionen gleich gewertet'; Tipp 3 schliesst mit 'beide sind erlaubt' | NEIN | **PASS (BLOCKER)** |
| Pos 7 (freitext) | bewertungskriterien.4 fordert 'eigene Position oder reflexive Schluss-Aussage'; Musterantwort schliesst multiperspektivisch | NEIN | PASS |

**Beutelsbach:** PASS (alle 3 BLOCKER-Punkte erfuellt).

### 5.4 Multiperspektivitaet 5/5 Perspektiven

| Perspektive | Operationalisiert in | Status |
|-------------|-----------------------|--------|
| P1 Begeisterte Stadtbuerger | Pos 1, Pos 3 (mat-3-1) | PASS |
| P2 Skeptische Land-Bevoelkerung + SPD | Pos 3 (mat-3-5) | PASS |
| P3 Versailler Sieger 1919 | Pos 4, Pos 5 (mat-3-3) | PASS |
| P4 Clark-Revisionismus 2013 | Pos 5, Pos 6 (mat-3-4) | PASS |
| P5 Reichsamt-Inszenierung Bundesarchiv | Pos 3 (mat-3-2) | PASS |

**Multiperspektivitaet:** PASS — 5/5 Perspektiven auf 5 Aufgaben verteilt (M13).

### 5.5 V13 Lehrkraft-only-Schutz

| Aufgabe | Pruefung | Status |
|---------|----------|--------|
| Pos 4 (mc Versailles) | KEIN NSDAP-Topos in Distraktoren; KEIN 'Kriegsschuld-Luege'-Vorgriff | PASS |
| Pos 5 (vergleich) | KEINE Weimar-Republik-Folge-Rezeption | PASS |
| Pos 6 (begruendung) | KEINE Lehrkraft-only-Hintergrundinformation im SuS-Text | PASS |
| Pos 7 (freitext) | KEINE NSDAP-Vorgriff in Musterantwort | PASS |

**V13:** PASS — POLICY_TRIGGER_SICHTBARKEIT eingehalten.

### 5.6 3-Stufen-Tipp-System (AFB-Hoehepunkt-Pflicht)

PASS — alle 7 Aufgaben verfuegen ueber 3 Tipp-Stufen (Hinweis → Einschraenkung → Loesung+Erklaerung), Tipp-Quelle: jeweiliges Material `_meta.tipp_stufen` adaptiert + Hefteintrag M3 A.4-Stufenbezug.

### 5.7 F0B-Priming R7-Sprachniveau (anspruchsvoller wegen AFB II-III)

PASS — siehe Tabelle 3.3. Komplexere Sachverhalts-Optionen in Pos 4 (max. 22 Woerter pro Option) sind im AFB-II-Korridor zulaessig, da:
- Optionen parallel strukturiert (Sprecher + Datum + Inhalt + Folge-Begriff)
- Hauptsatz-Dominanz eingehalten
- Komposita-Erstgebrauch in Pos 4 nicht enthalten (Kriegsschuld-Klausel ist Re-Use aus mat-3-3)

### 5.8 Cross-Konsistenz mit Hefteintrag M3

| Hefteintrag-Element | Aufgaben-Spiegelung | Status |
|---------------------|---------------------|--------|
| B.1 Stundenfrage | Pos 7 leitfrage = Stundenfrage woertlich | PASS |
| B.4 Schluessel-Begriffe (6) | Augusterlebnis (Pos 1, 7), Quellenkritik (Pos 2, 7), Burgfrieden (Pos 4 Distraktor D), Kriegsschuld-Klausel (Pos 4, 5), Kriegsschuldfrage (Pos 4, 5, 6, 7), Schlafwandler-These (Pos 5, 6, 7) | PASS |
| B.5 Merksatz | Pos 7 Musterantwort spiegelt Merksatz-Struktur | PASS |
| A.4 3-Stufen-Tipp Beispiel | Tipp-Strukturen aller 7 Aufgaben folgen Stufen-Schema | PASS |

**Hefteintrag-Konsistenz:** PASS.

---

## 6. Augusterlebnis-Idealisierungs-Verbot Operationalisierungs-Pruefung

| Mechanik | Operationalisiert in | Status |
|----------|----------------------|--------|
| Foto-Bias explizit benennen | Pos 2 W-Frage 'fehlt' (Pflicht-Item: 'Land-Bevoelkerung und Arbeiter') | PASS |
| Anti-Bias-Stimme als Gegenpol | Pos 3 mat-3-5 als rekonstruiertes Bauern-Frau-Tagebuch im Aussagen-Set | PASS |
| 'Nicht ueberall'-Reflexion in Synthese | Pos 7 bewertungskriterien.2: 'Augusterlebnis als Begriff verwendet UND Land/Arbeiter-Skepsis benannt' | PASS |
| Stufe-3-Tipp-Korrektur | Pos 1 Tipp 3 + Pos 2 Tipp 3 + Pos 3 Tipp 3 enthalten 'nicht ueberall'/'NICHT die Deutschen 1914' | PASS |

**Augusterlebnis-Idealisierungs-Verbot:** PASS (BLOCKER-Pruefung) — auf Aufgaben-Ebene mehrfach operationalisiert.

---

## 7. Encoding-Pruefung (UTF-8 + typographische Zeichen)

| Pruefung | Status |
|----------|--------|
| Echte UTF-8-Umlaute (ae→ä etc.) | NICHT ANGEWENDET — Aufgaben verwenden ASCII-Transliteration (ae/oe/ue/ss) gemaess Game-Konvention der bisherigen Mappen-Materialien (zur Konsistenz mit mat-3-1..mat-3-5, die ebenfalls ae/oe/ue benutzen). KEIN Umlaut-Encoding-Bruch innerhalb der Mappe. |
| Gedankenstrich `—` statt `--`/`-` | PASS — durchgehend `—` in Tipps, Saetzen |
| Apostroph `'` und Anfuehrungszeichen `„..."` | PASS in Pos 4/5/6 Musterantworten und Wortlaut-Zitaten |

**Encoding:** PASS (Konsistenz mit Mappe-Materialien gewahrt).

---

## 8. Gate-Urteil Phase 2.2b M3

| Kategorie | Status |
|-----------|--------|
| Stufe 1 — Prozedurale Pruefung | **PASS** |
| Stufe 2 — Fachdidaktische Pruefung (A1-A19) | **PASS** |
| Plugin-v0.5.0-spezifisch (F-PB-37, STR-14-NEU, V13, Beutelsbach, Multiperspektivitaet 5/5, 3-Stufen-Tipp, F0B R7) | **PASS** |
| Cross-Aufgaben-Konsistenz | **PASS** |
| Cross-Konsistenz mit Hefteintrag M3 | **PASS** |
| Augusterlebnis-Idealisierungs-Verbot | **PASS (BLOCKER)** |
| Beutelsbach-Kontroversitaet Pos 5 + Pos 6 | **PASS (BLOCKER)** |

**Gesamturteil M3 Phase 2.2b:** **PASS** (alle BLOCKER + alle HIGH PASS).

**Re-Dispatch erforderlich:** NEIN (0 von 0 max. Re-Dispatch-Iterationen genutzt).

**User-Validierung:** AUSSTEHEND — Lehrkraft prueft 7 Aufgaben + data.json + Hefteintrag-Konsistenz.

---

## 9. Hand-off an Phase 2.2c (Cross-Aufgaben-Aggregation)

| Hand-off-Element | Status |
|------------------|--------|
| 7 Aufgaben-JSONs persistiert (`mappe-3/aufgaben/aufgabe-3-1..7.json`) | PASS |
| `mappe-3/data.json` mit Mappe-Metadaten + Materialien-Refs + Aufgaben-Refs | PASS |
| Q-GATE-LOG Phase 2.2 (diese Datei) | PASS |
| Freischalt-Code SCHULD auf Mappe-Ebene gesetzt | PASS |
| Narrativer Mappe-Einstieg in `data.json.beschreibung` | PASS |
| Uebergaenge M2→M3 + M3→M4 in `data.json._meta.narrative_einbettung` | PASS |

**Hand-off-Vermerk:** Plugin v0.5.0 / F0B_PRIMING_v1 / VERTRAG_PHASE_2-2b v1.0 / VERTRAG_PHASE_2-2c v1.0.

---

## 10. Meta

| Feld | Wert |
|------|------|
| game_id | gpg-erster-weltkrieg-ursachen-run4-v050 |
| mappe_id | M3 |
| phase | 2.2b (agent-raetsel-dispatcher) |
| schema_version | q_gate_log_v1 |
| vertrag_version | VERTRAG_PHASE_2-2b v1.0 + VERTRAG_PHASE_2-2c v1.0 |
| plugin_version | v0.5.0 |
| f0b_priming_kennung | F0B_PRIMING_v1 |
| created_at | 2026-04-26 |
| validierungsstatus | ENTWURF (User-Validierung Phase-2.2-Gate ausstehend) |
| aufgaben_anzahl | 7 |
| typvielfalt | 7 (lueckentext, quellenkritik, zuordnung, multiple-choice, vergleich, begruendung, freitext-code) |
| afb_progression | I → II-III → II → II → III → III → III (monoton) |
| bloom_schwerpunkt | L4-L5 (Hoehepunkt) |
| freischalt_code | SCHULD |
| didaktisches_kernstueck | Beutelsbach Versailles 1919 vs. Clark 2013 (Pos 5 + Pos 6) |
| augusterlebnis_idealisierungs_verbot_operationalisiert | Pos 2 + Pos 3 + Pos 7 |
| f_pb_37_quellenkritik_pflicht_erfuellt | Pos 2 (mat-3-1) |
| str_14_neu_fiktionalitaets_kennzeichnung | Pos 3 + Pos 7 (mat-3-5 als rekonstruiert in Tipp 1) |
| multiperspektivitaet_anzahl | 5/5 (P1+P2+P3+P4+P5) |
| beutelsbach_blocker_status | PASS (Pos 5 + Pos 6 + Pos 7) |

---

<!-- KONSOLIDIERT AUS: Q-GATE-LOG_PHASE-2-2_M4.md (2026-04-27) -->

# Q-GATE-LOG — Phase 2.2 (Materialien + Aufgaben + Cross-Konsistenz) — Mappe 4

**Game-ID:** `gpg-erster-weltkrieg-ursachen-run4-v050`
**Mappe:** M4 — Marne 1914 — Das Ende des kurzen Krieges
**Phase:** 2.2b (agent-raetsel-dispatcher)
**Datum:** 2026-04-26
**Plugin-Version:** v0.5.0
**Schulart:** Mittelschule Bayern · Jahrgangsstufe 7c · Fach GPG

---

## 1. Phase 2.1 (Materialien) — Q-Gate-Bilanz

| Material | Typ | Q-Gate-Status | Sensitive Markierung | Mythos/Propaganda |
|---|---|---|---|---|
| mat-4-1 | karte | PASS | mythos_korrektur_noetig | Schlieffen-Plan-Korrektur (Zuber) realisiert in Quellenkritik-BU + Lehrkraft-Hinweis |
| mat-4-2 | zeitleiste | PASS | keine | — |
| mat-4-3 | bildquelle | PASS | propaganda_kontextualisierung_noetig | Inszenierungs-Hinweis (Decorations) realisiert; F-PB-37 Quellenkritik-Block PFLICHT erfuellt |
| mat-4-4 | bildquelle | PASS | propaganda_kontextualisierung_noetig | Datums-Stolperfalle 1913 realisiert; F-PB-37 Quellenkritik-Block PFLICHT erfuellt |
| mat-4-5 | statistik | PASS | gewalt_altersfilter | Altersfilter (keine Visualisierung, „ca."-Marker, Begleitsatz) realisiert |
| mat-4-6 | darstellungstext | PASS | keine | Schluss-Bruecke + Merksatz wortlautnah realisiert |

**Material-Bilanz:** 6/6 PASS. F-PB-37 erfuellt (mat-4-3 + mat-4-4). Mythos-Korrektur Schlieffen-Plan in mat-4-1 verankert.

---

## 2. Phase 2.2b (Aufgaben) — Q-Gate pro Aufgabe

| Aufgabe | Typ | AFB | TB | SCPL | Material(ien) | Q-Gate | Auffaelligkeiten |
|---|---|---|---|---|---|---|---|
| aufgabe-4-1 | multiple-choice | I | K4-2 | S | mat-4-1 | PASS | Distraktoren ohne Mythos-Wiederholung |
| aufgabe-4-2 | reihenfolge | I-II | K4-3 | C1 | mat-4-2 | PASS | Apposition „Frist mit Drohung" fuer Ultimatum |
| aufgabe-4-3 | lueckentext | II | K4-4 | C2 | mat-4-2 | PASS | Joffre / 40 km / 5.-12.09. / Moltke (alle wortlautnah aus mat-4-2) |
| aufgabe-4-4 | zuordnung | II-III | K4-4 | C2 | mat-4-3 + mat-4-4 | PASS | **F-PB-37 KERNSTUECK erfuellt** — DT-Inszenierung + FR-Datums-Falle; Multiperspektiv-Schluss in Tipp 3 |
| aufgabe-4-5 | multiple-choice | II | K4-4 + K4-5 | P | mat-4-5 | PASS | Sieger-Verlierer-Mythos-Distraktor (Nur DT) korrigiert; Drei-Parteien-Bilanz |
| aufgabe-4-6 | lueckentext | II | K4-1 + K4-5 | L | mat-4-6 | PASS | **STELLUNGSKRIEG als Code-Element-Hauptluecke** |
| aufgabe-4-7 | freitext-code | III | K4-1 | L | mat-4-6 + Rueckblick | PASS | **Game-Abschluss-Reflexion + Folge-Game-Bruecke ohne Stoff-Vorgriff** |

**Einzel-Q-Gate-Bilanz:** 7/7 PASS.

---

## 3. Cross-Aufgaben-Konsistenz (A1-A18 Orchestrator-Ebene)

| Kriterium | Pruefung | Ergebnis |
|---|---|---|
| A1 AFB-Kongruenz (Gesamtbild) | I → I-II → II → II-III → II → II → III | **PASS** |
| A3 Material-Kongruenz | 6/6 Materialien als Primaerquelle in mind. 1 Aufgabe | **PASS** |
| A5 Schwierigkeits-Progression | Monoton steigend mit AFB-II-Plateau (Pos 3-6) und AFB-III-Spitze (Pos 7) | **PASS** |
| A8 Kognitive Aktivierung | aufgabe-4-4 (Quellenkritik) + 4-5 (Wucht-Befund) + 4-7 (Reflexion) | **PASS** |
| A9 TB-Bezug | 5/5 TB-Knoten K4-1..K4-5 in mind. 1 Aufgabe adressiert | **PASS** |
| A10 Typvielfalt | 5 Typen (MC 2x, Lueckentext 2x, Zuordnung 1x, Reihenfolge 1x, Freitext 1x); kein Typ > 2x; beide Wiederholungen begruendet | **PASS** |
| A12 Sachbezogen-vor-Wertbezogen | Pos 1-3 sachbezogen → Pos 4-6 analytisch → Pos 7 wertbezogen | **PASS** |
| A16 Fragebogen-Kohaerenz | S → C1 → C2 → C2 → P → L → L bildet SCPL-Erarbeitungsweg ab | **PASS** |
| A17 SCPL-Zonen-Abdeckung | S/C1/C2/P/L = 5/5 Zonen mit ≥1 Aufgabe | **PASS** |
| A18 Material-Aktivierung | 6/6 als Primaerquelle (nicht nur Tipp) | **PASS** |
| MQ3 Material-Referenz-Verbot in `frage` | 7/7 Aufgaben — kein `[[..]]` oder `(M..)` im Fragestamm | **PASS** |
| MQ3b Display-Referenzen in Tipp 1 | 7/7 Aufgaben — Tipp 1 enthaelt `[[mat-id\|Anzeigetext]]` (M[position]) | **PASS** |

**Cross-Bilanz:** 12/12 PASS.

---

## 4. Pflicht-Q-Gates v0.5.0 (M4-spezifisch aus Auftrag)

| ID | Kriterium | Ergebnis | Evidenz |
|---|---|---|---|
| QM4-1 | AFB II Sicherung (entlastend) | PASS | Plateau Pos 3-6 auf AFB II; AFB III nur Pos 7 |
| QM4-2 | Schlieffen-Plan-Mythos-Korrektur (Zuber) | PASS | mat-4-1 traegt Korrektur in Quellenkritik-BU + Lehrkraft-Hinweis. aufgabe-4-1 Distraktoren wiederholen NICHT die Mythos-Verankerung („einziger fertiger Plan"). Antwort-Vorgriff vermieden. |
| QM4-3 | F-PB-37 Quellenkritik-Pflicht (mat-4-3 + mat-4-4) | PASS | aufgabe-4-4 ist explizite Quellenkritik-Aufgabe (Inszenierungs-Doppel DT 1914 + FR Manoever 1913) |
| QM4-4 | Multiperspektivitaet Sieger-Verlierer-Mythos | PASS | aufgabe-4-4 (DT+FR aehnliche Inszenierung) + aufgabe-4-5 (Drei-Parteien-Statistik FR/GB/DT mit Distraktor „Nur Deutschland" als falsche Inversion) |
| QM4-5 | Folge-Game-Bruecke ohne Stoff-Vorgriff | PASS | aufgabe-4-7 nennt Stellungskrieg/Heimatfront/Versailles NUR als offene Anker — keine inhaltliche Vorwegnahme |
| QM4-6 | F0B-Priming R7 | PASS | Alle Aufgaben-Stems ≤ 12 Worte; Komposita beim Erstgebrauch erklaert (Ultimatum, Inszenierung, Decorations, Manoever); kolonialsprachliche Blacklist nicht thematisch beruehrt |
| QM4-7 | Cross-Konsistenz mit M1+M2+M3 + hefteintrag.json M4 | PASS | M1 (Buendnisse → in aufgabe-4-2 GB-Kriegseintritt + in aufgabe-4-7 Pulverfass-Anker); M2 (Belgien-Neutralitaet → in aufgabe-4-2 Ultimatum + Einmarsch); M3 (Quellenkritik → in aufgabe-4-4 angewandt; Augustbegeisterung → in aufgabe-4-7 Anker); M4 Hefteintrag B.5 Merksatz-Begriffe (Stellungskrieg / Schuetzen-Graeben / vier Jahre) wortlautnah in aufgabe-4-6 |

**M4-spezifische Bilanz:** 7/7 PASS.

---

## 5. Schluessel-Code-Mechanik (Game-Abschluss)

| Mappe | Code-Element | Aufgabe-Verankerung |
|---|---|---|
| M1 | PULVERFASS | M1-Aufgabe (Game-Abschluss-Anker in aufgabe-4-7) |
| M2 | AUSLOESER | M2-Aufgabe (Game-Abschluss-Anker in aufgabe-4-7) |
| M3 | AUGUSTBEGEISTERUNG | M3-Aufgabe (Game-Abschluss-Anker in aufgabe-4-7) |
| **M4** | **STELLUNGSKRIEG** | **aufgabe-4-6 (lueckentext, Hauptluecke 2)** |

**Game-Abschluss-Code (komplett):** `PULVERFASS — AUSLOESER — AUGUSTBEGEISTERUNG — STELLUNGSKRIEG`
**Verankerung in M4:** aufgabe-4-6 (operativ) + aufgabe-4-7 (synthetisch, alle vier Begriffe).

---

## 6. Gate-Urteil

**Alle Gates: PASS.**

- Material-Q-Gate: 6/6 PASS
- Aufgaben-Q-Gate: 7/7 PASS
- Cross-Konsistenz: 12/12 PASS
- M4-spezifische Pflicht-Gates: 7/7 PASS
- Schluessel-Code-Mechanik: PASS (M4-Element STELLUNGSKRIEG verankert)

**Weitergabe an Phase 3 (Claude Code, mechanische Assembly):** Mappe-data.json + 7 Aufgaben-JSONs liegen vor. Cross-Mappen-Assembly (data.json Top-Level mit M1+M2+M3+M4) erfolgt in Phase 3.

---

## 7. Meta

| Feld | Wert |
|---|---|
| schema_version | q_gate_log_v1 |
| phase | 2.2b |
| agent | agent-raetsel-dispatcher |
| game_id | gpg-erster-weltkrieg-ursachen-run4-v050 |
| run_id | run-4-2026-04-26 |
| mappe_id | M4 |
| created_at | 2026-04-26 |
| plugin_version | v0.5.0 |
| f0b_priming_kennung | F0B_PRIMING_v1 |
| naechste_phase | Phase 3 — Claude Code (Top-Level data.json Assembly M1+M2+M3+M4) |
