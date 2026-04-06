# BEFUND: Phase-0-Rueckblick-Audit (W4-B)

**Datum:** 2026-04-06
**Methode:** 3 Game-1-Phase-0-Artefakte gegen die neuen Vertraege VERTRAG_PHASE_0-1/0-2/0-3 geprüft
**Zweck:** Findings sammeln — was waere bei formalem Q-Gate aufgefallen?

---

## D1: DIDAKTIK_RAHMEN vs. VERTRAG_PHASE_0-1_DIDAKTIK

**Artefakt:** `DIDAKTIK_RAHMEN_gpg-erster-weltkrieg-ursachen.md` (152 Zeilen)

### Q-Gate-Simulation

| ID | Kriterium | Ergebnis | Begruendung |
|---|---|---|---|
| QD1 | Lehrplan-Abdeckung | PASS | KE-IDs (GPG7_LB2_K_05/06/07, GPG7_LB3_K_03) plausibel. Aber: keine dokumentierte Verifikation gegen den Fachlehrplan-Wortlaut. |
| QD2 | KE-Vollstaendigkeit | **WARN** | 4 KEs gelistet. Keine Dokumentation, welche weiteren KEs des LB2 geprueft und begruendet ausgeschlossen wurden. Moegliche Luecke: GPG7_LB2_I_06 nennt "Technisierung des Krieges" und "Heimatfront" — diese sind in Game 1 nicht abgedeckt (bewusst fuer Game 2 reserviert), aber die Entscheidung ist nicht dokumentiert. |
| QD3 | Teilziel-Qualitaet | PASS | Alle 4 TZ haben AFB + Erkennbarkeitskriterium im Vertrag-Format. |
| QD4 | KE-Matrix-Konsistenz | PASS | Jede KE hat ≥1 Hauptzuordnung. Jede Mappe hat ≥1 KE. Keine verwaisten Zuordnungen. |
| QD5 | Mappen-Balance | PASS | Alle 4 Mappen thematisch distinct, Zentrale Erkenntnis je 1 Satz, Gegenstandsbereiche zugeordnet. |
| QD6 | AFB-Progression | **WARN** | M1=I-II, M2=II, M3=II, M4=II-III. Progression M2→M3 ist nicht-monoton (gleich). Vertrag erlaubt dies wenn begruendet — die Begruendung in der Schwierigkeitskurve-Tabelle reicht aber nicht aus: M3 wird als "Beurteilen und bewerten" beschrieben (hochwertiger als M2 "Erkenntnisse gewinnen und anwenden"), der AFB bleibt jedoch bei II. Widerspruch zwischen Prozesskompetenz und AFB-Angabe. |
| QD7 | Ethik-Abdeckung | PASS | Multiperspektivitaet, Ueberwaetigungsverbot, Kontroversitaet, Sensibilitaet, Aktualitaetsbezug — alle adressiert. |
| QD8 | Strukturvorgaben | PASS | Artikulationsstruktur, Narrativ-Rahmen, Differenzierungshinweise vollstaendig. |

### Gate-Urteil (simuliert)

**PASS mit 2 WARN.** Keine BLOCKER-Verletzung. 2 HIGH-Kriterien als WARN — gemaess Vertrag waere 1 WARN toleriert, bei 2 WARN waere eine Nachbesserungsentscheidung faellig gewesen.

### Findings

| # | Finding | Severity | Implikation fuer Vertrag |
|---|---|---|---|
| F-D1-1 | KE-Vollstaendigkeit nicht dokumentiert. Fehlende KEs (Game-2-Scope) nicht begruendet ausgeschlossen. | HIGH | Vertrag QD2 ergaenzen: "Bei themenuebergreifenden Lernbereichen: explizit dokumentieren, welche KEs fuer Folge-Games reserviert werden." |
| F-D1-2 | AFB-Angabe M3 (II) widerspricht Prozesskompetenz-Beschreibung ("Beurteilen und bewerten" = typisch AFB III). | MEDIUM | Kein Vertragspatch noetig — QD6 haette diesen Widerspruch bei formalem Gate gefunden. |
| F-D1-3 | Keine explizite Vorgaenger-Anschluss-Sektion (Game 1 hat keinen Vorgaenger, korrekt). Aber: Hinweis auf Nachfolger-Reservierung fehlt. | LOW | Optional: DIDAKTIK_RAHMEN um "Scope-Abgrenzung" Sektion erweitern (was ist NICHT Teil dieses Games). |

---

## D2: INHALTSBASIS vs. VERTRAG_PHASE_0-2_INHALT

**Artefakt:** `INHALTSBASIS_gpg-erster-weltkrieg-ursachen.md` (397 Zeilen)

### Q-Gate-Simulation

| ID | Kriterium | Ergebnis | Begruendung |
|---|---|---|---|
| QI1 | Vollstaendigkeit | PASS | Alle Pflicht-Sektionen vorhanden (Header, Wikipedia-Quellen, pro Mappe alle 7 Sektionen, Quellen-Gesamtuebersicht, Inhaltsluecken-Status). |
| QI2 | Quellen-Diversitaet | PASS | 12 Artikel (Minimum: 4×2+1=9). Jede Mappe hat ≥2 verschiedene Quell-Artikel. |
| QI3 | Fakten-Vollstaendigkeit | PASS | Alle Mappen uebererfuellt: M1=14 Fakten, M2=13, M3=13, M4=14. Akteure ≥4 pro Mappe. Fachbegriffe ≥6 pro Mappe. Zitate ≥2 pro Mappe. Rollenprofile ≥2 pro Mappe. Alle mit Wikipedia-Quellenangabe. |
| QI4 | DIDAKTIK_RAHMEN-Abdeckung | **WARN** | Keine explizite KE→Fakten-Zuordnung im Dokument. Die Fakten stuetzen die KEs inhaltlich (nachpruefbar), aber der Nachweis ist nicht systematisiert. Ein formales Q-Gate muesste die Zuordnung manuell pruefen. |
| QI5 | Artefakt-Qualitaet | **WARN** | Quantitativ PASS (≥2 pro Mappe, alle CC-kompatibel). Qualitativ: Mappe 3 hat 3 Artefakte, alle Typ "foto". Keine Typ-Diversitaet (Vertrag: "nicht alle Artefakte eines Typs pro Mappe"). Keine Karte, kein Dokument, keine Illustration fuer Mappe 3. |
| QI6 | Inhaltsluecken-Transparenz | PASS | 4 Luecken identifiziert, alle geschlossen mit Quelle. Duenne Quellenlage pro Mappe explizit benannt. |

### Gate-Urteil (simuliert)

**PASS mit 2 WARN.** Keine BLOCKER-Verletzung. 2 HIGH — Grenzfall (Vertrag erlaubt max 1 HIGH als WARN).

### Findings

| # | Finding | Severity | Implikation fuer Vertrag |
|---|---|---|---|
| F-D2-1 | Keine KE→Fakten-Mapping-Tabelle. QI4 nur manuell pruefbar. | HIGH | Vertrag QI4 schrittweise operationalisieren: INHALTSBASIS soll pro Mappe eine Zeile "KE-Abdeckung: KE-X stuetzende Fakten: [F1, F2, F3]" enthalten. |
| F-D2-2 | Mappe 3: alle 3 Artefakte sind Fotos. Kein Propagandaplakat, kein Karikatur-Scan, keine Karte trotz thematischer Eignung. | MEDIUM | QI5 ist korrekt formuliert — haette bei formalem Gate gefunden. Kein Vertragspatch noetig. |
| F-D2-3 | Validierungsstatus "Nachbesserung" dokumentiert. Die Nachbesserung betraf die Artefakt-Kette (Artefakt-Marker im SKRIPT). Das zeigt: informelle Qualitaetssicherung hat funktioniert, aber erst durch nachgelagerte Phase erkannt. | INFO | Bestaetigt den Nutzen eines formalen QI-Gates zwischen Phase 0.2 und 0.3. |
| F-D2-4 | Lizenz-Pruefung: Alle CC-kompatibel (PD, CC-BY-SA 2.5, CC-BY-SA 3.0). Kein Problem. Aber: keine systematische Dokumentation der Lizenz-Pruefung als Schritt. | LOW | Recherche-Protokoll (§3.2) im Vertrag deckt dies ab. |

---

## D3: SKRIPT vs. VERTRAG_PHASE_0-3_SKRIPT

**Artefakt:** `SKRIPT_gpg-erster-weltkrieg-ursachen.md` (287 Zeilen)

### Q-Gate-Simulation Stufe 1 (Q1-Q13)

| ID | Kriterium | Ergebnis | Begruendung |
|---|---|---|---|
| Q1 | Narrative Kohaerenz | PASS | Fliesstext, kein Stichpunkt-Aggregat. Chunk 1 §1-§5 ist kohaerente Erzaehlung. |
| Q2 | Fakten-Vollstaendigkeit | PASS | Stichprobe: Alle Kernfakten aus INHALTSBASIS Mappe 1 im Skript verarbeitet. |
| Q3 | Fachbegriff-Erklaerung | PASS | "Imperialismus — die Politik, den eigenen Machtbereich durch Kolonien auszuweiten" (§2). |
| Q5 | Chunk-Abgeschlossenheit | PASS | Chunk 1 endet mit eigenstaendiger Erkenntnis (Pulverfass-Metapher). |
| Q7 | Sandwich-Uebergaenge | PASS | Chunk 1→2 vorhanden, qualitativ gut (greift Pulverfass auf, oeffnet Attentat). |
| Q8 | KE-Abdeckung | PASS | KE-Abdeckungstabelle vorhanden, alle 4 KEs zugeordnet. |
| Q9 | Personifizierung | PASS | Chunk 1: Bismarck (§3), Wilhelm II. (§5). |
| Q11-Q13 | Artefakt-Positionierung | PASS | 6 Artefakt-Marker in Chunk 1: img-1-1, img-1-2, zit-1-1, zit-1-2, rolle-1-1, rolle-1-2. |

### Q-Gate-Simulation Stufe 2 (SK1-SK17, Stichprobe Chunk 1)

| ID | Kriterium | Ergebnis | Begruendung |
|---|---|---|---|
| SK1 | Vergegenwärtigung | PASS | §1-§5 zeigen handelnde Akteure (Bismarck, Wilhelm II., Grossmaechte) in konkreten Situationen. Geschaetzt >50% Handlungspassagen. |
| SK2 | Elementarisierung | PASS | Schwerpunkt klar: Buendnissysteme und Wettruestung als Ursachen. |
| SK3 | Anschaulichkeit | PASS | Abstrakta ("Imperialismus", "Nationalismus") mit Beispielen verankert ("Platz an der Sonne", Flottenruestung). |
| SK4 | Strukturiertheit | PASS | §1→§2→§3→§4→§5 folgt logischer Kette: Ausgangslage→Triebkraefte→Buendnis A→Buendnis B→Eskalation. |
| SK5 | Sprachliche Angemessenheit | PASS | R7-Niveau, kurze Saetze, Fachbegriffe erklaert. |
| SK6 | Phasenfolge | PASS | §1 beginnt narrativ-szenisch ("Um 1900 ist Europa..."), nicht analytisch. |
| SK7 | Multikausualitaet | PASS | §2: Imperialismus UND Nationalismus als Triebkraefte. Nicht monokausal. |

### Q-Gate-Simulation Stufe 3 (Strukturell, QS1-QS6)

| ID | Kriterium | Ergebnis | Begruendung |
|---|---|---|---|
| QS1 | Dokument-Vollstaendigkeit | PASS | Header, Gesamtnarrativ, KE-Abdeckung. Pro Chunk: alle 5 Sektionen (Einstieg-Kontext, Skript-Text, Artefakt-Zuordnung, Tafelbild-Entwurf, Sandwich). |
| QS2 | KE-Matrix-Konsistenz | PASS | Alle 4 KEs mit Chunk-Zuordnung und §-Referenz. |
| QS3 | Chunking-Konformitaet | **WARN** | 4 Chunks = 4 Mappen (korrekt). Chunk-Laenge nicht formal geprueft. Stichprobe Chunk 1: §1-§5 geschaetzt ~450-550 Woerter — moeglicherweise unter der 600W-Untergrenze. |
| QS4 | Artefakt-Vollstaendigkeit | PASS | Chunk 1: 6 Marker (≥3 Minimum). Alle INHALTSBASIS-Artefakte fuer Mappe 1 referenziert. |
| QS5 | Tafelbild-Plausibilitaet | PASS | 7 Knoten, 6 Verbindungen mit semantischen Labels. Kernbegriff "Pulverfass Europa" vorhanden. |
| QS6 | Umfangs-Plausibilitaet | **NICHT GEPRUEFT** | SK17 existierte bei Game-1-Erstellung nicht. Keine Pruefung erfolgt. |

### Gate-Urteil (simuliert)

**PASS mit 1 WARN.** QS3 (Chunk-Laenge) als einziger WARN. QS6 nicht pruefbar (Kriterium existierte nicht).

### Findings

| # | Finding | Severity | Implikation fuer Vertrag |
|---|---|---|---|
| F-D3-1 | Chunk-Laenge moeglicherweise unter 600W-Minimum (Chunk 1 geschaetzt ~500W). Kein formaler Word-Count durchgefuehrt. | MEDIUM | Vertrag QS3 operationalisieren: "AGENT_SKRIPT gibt pro Chunk den Word-Count an. Pruefung: `wc -w` auf extrahierten §-Text." |
| F-D3-2 | SK17 (Umfangs-Plausibilitaet) nie geprueft. Game-1 Mappe 1-2 hatten je 4 Materialien bei ~700-800W — im Toleranzbereich. Mappe 3 hatte 5 Materialien — obere Grenze. | MEDIUM | QS6 korrekt im Vertrag. Haette bei Game-1 eine Warnung fuer Mappe 3 erzeugt. |
| F-D3-3 | Fachdidaktische SK-Pruefung fand bei Game-1 nicht statt (SK-Katalog wurde erst nach Phase 0.3 erstellt). Die informelle Pruefung war trotzdem solide — SKRIPT-Qualitaet wurde in User-Validierung als gut bewertet. | INFO | Bestaetigt: Formales Q-Gate haette keine schwerwiegenden Probleme aufgedeckt, aber die Dokumentation waere besser. |
| F-D3-4 | Tafelbild-Entwurf existiert nur als Skizze. Bei Game 1 wurde der Tafelbild-Entwurf im SKRIPT erstellt, dann in Phase 0.4 (AGENT_HEFTEINTRAG) formalisiert. Die Kette funktioniert, ist aber nicht im SKRIPT-Vertrag explizit geregelt. | LOW | Optional: QS5 um Hinweis ergaenzen: "Tafelbild-Entwurf ist Eingabe fuer Phase 0.4 — muss hinreichend detailliert sein fuer AGENT_HEFTEINTRAG." |

---

## Zusammenfassung

### Findings nach Severity

| Severity | Anzahl | IDs |
|---|---|---|
| HIGH | 2 | F-D1-1, F-D2-1 |
| MEDIUM | 4 | F-D1-2, F-D2-2, F-D3-1, F-D3-2 |
| LOW | 3 | F-D1-3, F-D2-4, F-D3-4 |
| INFO | 2 | F-D2-3, F-D3-3 |

### Vertragsnachschaerfungen (empfohlen)

| # | Vertrag | Patch | Priority |
|---|---|---|---|
| P1 | VERTRAG_PHASE_0-1 (QD2) | Ergaenzen: "Bei themenuebergreifenden Lernbereichen explizit dokumentieren, welche KEs fuer Folge-Games reserviert werden." | HIGH |
| P2 | VERTRAG_PHASE_0-2 (QI4) | Ergaenzen: Pro Mappe eine KE→Fakten-Zuordnungszeile als Pflicht-Output. | HIGH |
| P3 | VERTRAG_PHASE_0-3 (QS3) | Ergaenzen: "AGENT_SKRIPT gibt pro Chunk den Word-Count an." | MEDIUM |

### Kern-Erkenntnis

Die neuen Vertraege haetten bei Game 1 **2 HIGH-Findings** produziert, die ohne Vertrag nicht systematisch auffielen:

1. **KE-Scoping nicht dokumentiert** (F-D1-1): Die Entscheidung, welche KEs fuer Game 2 reserviert werden, wurde implizit getroffen. Bei Game 2 ist diese Entscheidung kritisch, weil das Vorgaenger-Game existiert.

2. **KE→Fakten-Mapping fehlt** (F-D2-1): Die INHALTSBASIS liefert exzellente Fakten, aber der Nachweis, dass jede KE ausreichend gestützt ist, muss manuell erfolgen. Ein formales Mapping haette die Nachbesserung in der Artefakt-Kette moeglicherweise vermieden.

Beide Findings bestaetigen den Masterplan-Ansatz: Phase-0-Vertraege erhoehen die Nachvollziehbarkeit und verringern Propagationsrisiken.
