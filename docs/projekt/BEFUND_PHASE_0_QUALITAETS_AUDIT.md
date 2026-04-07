# BEFUND: Phase-0 Qualitaets-Audit — Konsolidierung (v2)

**Datum:** 2026-04-06 (v1), 2026-04-06 (v2 — Zweiter Audit-Durchlauf mit persistierten Einzel-Artefakten)
**Anlass:** User-Anfrage — tiefgreifender Audit der Phase-0-Prozesskette mit Fokus auf Artefakt-Qualitaet fuer beliebige Geschichtsthemen (nicht nur WK1)
**Methode:** 5 parallele Review-Agenten (RA1-RA5), 2 Durchlaeufe. v2-Durchlauf mit Persistenz-Pflicht (jeder RA schreibt eigenes Ergebnis-Artefakt).
**Einzel-Artefakte (v2):**
- `docs/projekt/audit_phase0_v2/BERICHT_RA1_ARTEFAKT_QUALITAET.md` (8 Findings, 0C/4H/4M)
- `docs/projekt/audit_phase0_v2/BERICHT_RA2_PROZESS_ROBUSTHEIT.md` (12 Findings, 2C/6H/4M)
- `docs/projekt/audit_phase0_v2/BERICHT_RA3_DOWNSTREAM_KOMPATIBILITAET.md` (6 Findings, 0C/3H/3M)
- `docs/projekt/audit_phase0_v2/BERICHT_RA4_FACHDIDAKTIK.md` (9 Findings, 1C/2H/5M/1L)
- `docs/projekt/audit_phase0_v2/BERICHT_RA5_GENERALISIERBARKEIT.md` (10 Findings, 1C/5H/4M)
**Basis:** 4 Phase-0-Vertraege (v1.1), WORKFLOW_v4.1, ORCHESTRATOR.md, GUETEKRITERIEN (SK1-SK17, G1-G14)
**Vorgaenger:** BEFUND_PHASE_0_ARCHITEKTUR_EVALUATION.md (Architektur-Schaerfung, 6 Findings — alle resolved oder deferred)

---

## 1. Audit-Design

### 1.1 Dimensionen

| Agent | Dimension | Fokus |
|---|---|---|
| RA1 | Artefakt-Qualitaet | Schwellenwerte, Grenzfaelle, Messbarkeit, Phase-2.0-Kompatibilitaet |
| RA2 | Prozess-Robustheit | Eskalationspfade, Fallbacks, Heuristik-Robustheit, Messbarkeit von Q-Kriterien |
| RA3 | Downstream-Kompatibilitaet | JSON-Schema-Konsistenz, Artefakt-Propagation, STRUKTUR-FREEZE-Einheitlichkeit |
| RA4 | Fachdidaktische Schaerfe | Quellenorientierung, SCPL-Flexibilitaet, Differenzierung, Motivierung, Kontroversitaet |
| RA5 | Generalisierbarkeit | Thementyp-Adaptivitaet, nicht-chronologische Themen, Konzeptgeschichte, Kulturgeschichte |

### 1.2 Scope

Alle 4 Phase-0-Vertraege + WORKFLOW_v4.1 + ORCHESTRATOR.md + GUETEKRITERIEN (SK1-SK17, G1-G14). Prueffrage: Liefert die Pipeline optimale Phase-0-Artefakte fuer JEDES geschichtliche Thema mit Wikipedia-Eintrag und Lehrplanbezug?

---

## 2. Konvergenz-Matrix

Findings, die von mehreren RAs unabhaengig identifiziert wurden. Hoehere Konvergenz = hoehere Konfidenz.

| Konvergenz-Cluster | RAs | Konsolidiertes Finding | Severity |
|---|---|---|---|
| **K1: Thementyp-Klassifikation fehlt** | RA1, RA2, RA4, RA5 | Pipeline ist implizit auf Ereignisgeschichte (WK1) kalibriert. Heuristiken (H1 Chronologie, H5 Schluesselereignis), Schwellenwerte (≥8 Fakten, ≥2 Akteure, ≥1 Zitat pro Mappe), und Qualitaetskriterien (SK1 Vergegenwaertigung, Q9 Personifizierung) funktionieren fuer Konzeptgeschichte (z.B. Industrialisierung als Strukturwandel) und Kulturgeschichte (z.B. Mittelalterliche Staendeordnung) nicht oder nur eingeschraenkt. | **CRITICAL** |
| **K2: SCPL-Rigiditat** | RA3, RA4, RA5 | SCPL (Situation-Complication-Problem-Loesung) ist als EINZIGES Ordnungsmuster fuer Tafelbilder definiert. Nicht alle Themen passen in dieses Schema — kategorial-vergleichende oder konzeptuelle Themen (z.B. "Was ist ein Staat?") haben keine natuerliche "Complication". AGENT_HEFTEINTRAG §3 definiert 9 Ordnungsmuster, aber das SCPL-JSON erzwingt trotzdem S-C-P-L als Containerstruktur. | **HIGH** |
| **K3: Phase-2.0-JSON-Schema-Konsistenz** | RA1, RA3 | TAFELBILD-JSON (Phase 0.4) und hefteintrag.json (Phase 2.0) sollen 1:1 identisch sein, aber kein formales JSON-Schema validiert diese Uebereinstimmung. Felder wie `zusammenfassung` und `ueberleitung` haben Placeholder-Konvention ("[REVISION IN 2.1c]"), die nicht maschinell pruefbar ist. | **HIGH** |
| **K4: Artefakt-Propagation hat Luecken** | RA1, RA3 | Artefakt-IDs (img-X-Y, zit-X-Y, rolle-X-Y) werden in INHALTSBASIS definiert, im SKRIPT per [ARTEFAKT]-Marker referenziert, aber der Weg von SKRIPT-Marker → Phase-1-Material → Phase-2-data.json ist nicht vertraglich spezifiziert. MATERIAL_GERUEST und ARTEFAKT_INVENTAR als Downstream-Formate fehlen in den Phase-0-Vertraegen. | **HIGH** |

---

## 3. Einzelbefunde (dedupliziert, severity-kalibriert)

### 3.1 CRITICAL

| ID | Finding | Quelle | Betroffene Vertraege | Massnahme |
|---|---|---|---|---|
| QA-C1 | **Thementyp-Klassifikation fehlt.** H1 (Chronologische Schnitte) und H5 (Schluesselereignis-Anker) sind fuer nicht-ereignisgeschichtliche Themen nicht erfuellbar. RA5 schlaegt Thementyp-Trias vor: Ereignisgeschichte / Konzeptgeschichte / Kulturgeschichte mit je adaptierten Heuristiken und Schwellenwerten. | K1 (RA1, RA2, RA4, RA5) | VERTRAG_PHASE_0-1_DIDAKTIK (H1-H7), VERTRAG_PHASE_0-2_INHALT (QI3 Mindestmengen), VERTRAG_PHASE_0-3_SKRIPT (SK1, Q9) | M-QA1: Thementyp-Klassifikation als Pflicht-Schritt in AGENT_DIDAKTIK Phase 0.1 einfuehren. Heuristiken H1-H7 thementyp-adaptiv machen. Schwellenwerte in INHALT und SKRIPT thementyp-bedingt staffeln. |
| QA-C2 | **Keine Eskalation bei QI2-Scheitern.** Wenn fuer eine Mappe keine 2 verschiedenen Wikipedia-Artikel mit Fakten existieren (QI2 Quellen-Diversitaet), gibt es keinen definierten Fallback. Agent bleibt in Endlosschleife oder liefert FAIL ohne Handlungsanweisung. | RA2 | VERTRAG_PHASE_0-2_INHALT (QI2) | M-QA2: Eskalationspfad in VERTRAG_PHASE_0-2_INHALT ergaenzen: Bei QI2-Scheitern → Mappe-Merge-Vorschlag an User (2 Mappen mit duenner Quellenlage zusammenlegen). Max. 1 Merge pro Game. |

### 3.2 HIGH

| ID | Finding | Quelle | Betroffene Vertraege | Massnahme |
|---|---|---|---|---|
| QA-H1 | **SCPL als einzige Containerstruktur ist zu rigide.** Ordnungsmuster-Enum (§3.4 HEFTEINTRAG) bietet 9 Varianten, aber JSON-Schema erzwingt immer S-C-P-L-Felder. Fuer kategorial-vergleichende Themen ("Staende im Mittelalter") ist "Complication" kein natuerlicher Schritt. | K2 (RA3, RA4, RA5) | VERTRAG_PHASE_0-4_HEFTEINTRAG (§3, §4 JSON) | M-QA3: JSON-Schema um optionale Complication[] erweitern (min. 0 statt min. 1 fuer nicht-narrative Ordnungsmuster). Alternativ: SCPL-Varianten-Registry mit Ordnungsmuster-spezifischen Minimal-Schemata. |
| QA-H2 | **INHALTSBASIS-Anforderungen fuer abstrakte Themen unangemessen.** ≥2 Akteure und ≥1 Zitat pro Mappe (QI3) sind fuer konzeptuelle Themen (z.B. "Was ist Feudalismus?") schwer bis unmoeglich aus Wikipedia zu extrahieren. Erzwungene Erfuellung fuehrt zu Pseudo-Personifizierung. | K1 (RA2, RA5) | VERTRAG_PHASE_0-2_INHALT (QI3) | M-QA4: QI3-Schwellenwerte thementyp-bedingt staffeln. Konzeptgeschichte: ≥1 Akteur (statt 2), Zitat optional. Alternativ: "Akteur" durch "Perspektivtraeger" ersetzen (umfasst auch Gruppen, Institutionen, abstrakte Rollen). |
| QA-H3 | **Vergegenwaertigung (SK1) fuer Konzepte nicht anwendbar.** SK1 fordert "Rueckversetzung in die historische Situation" — bei abstrakten Konzepten (Wirtschaftskreislauf, Staatsformen) gibt es keine situative Verankerung. Skript-Qualitaet wird systematisch als mangelhaft bewertet. | K1 (RA4, RA5) | VERTRAG_PHASE_0-3_SKRIPT (SK1-SK7, Q1) | M-QA5: SK1 thementyp-bedingt interpretieren. Konzeptgeschichte: "Vergegenwaertigung" = "Konkretisierung an historischem Fallbeispiel" (nicht zwingend narrativ-situativ). Kriterium in GUETEKRITERIEN_SKRIPT.md ergaenzen. |
| QA-H4 | **Ordnungsmuster-Enum unvollstaendig.** 9 Typen in HEFTEINTRAG §3.3. Fehlen: genetisch (Entwicklungslinien), funktional (Wie wirkt X?), normativ-deskriptiv (Soll vs. Ist). Diese sind fuer GPG-Themen der R7 relevant. | RA5 | VERTRAG_PHASE_0-4_HEFTEINTRAG (§3.3) | M-QA6: Ordnungsmuster-Enum um 2-3 Typen erweitern (genetisch, funktional). Kein Zwang zur Vollstaendigkeit — bei Bedarf erweiterbar. |
| QA-H5 | **H1-H7 nicht robust gegen nicht-teilbare Themen.** Manche Themen (z.B. "Die Pest") haben eine Kernnarration, die sich nicht sinnvoll in 4+ Mappen zerlegen laesst, ohne Redundanz oder kuenstliche Trennung. Kein Fallback fuer mappen_anzahl-Reduktion durch Agent. | RA2 | VERTRAG_PHASE_0-1_DIDAKTIK (H1-H7) | M-QA7: Fallback-Klausel in AGENT_DIDAKTIK: Wenn Heuristiken H1-H7 keine sinnvolle Aufteilung bei gegebener mappen_anzahl ergeben → Vorschlag an User mit Begruendung fuer reduzierte Mappen-Anzahl. |
| QA-H6 | **QI4 (DIDAKTIK_RAHMEN-Abdeckung) nicht messbar.** "Jede KE hat mindestens 3 stuetzende Fakten" ist nicht automatisch pruefbar — KE-Fakt-Zuordnung erfordert semantische Interpretation. Agent-Self-Check ist unzuverlaessig bei Grenzfaellen. | RA2 | VERTRAG_PHASE_0-2_INHALT (QI4) | M-QA8: Pflicht-Output-Zeile pro Mappe einfuehren: "KE-Abdeckung: [KE-ID] gestuetzt durch [Fakt-1, Fakt-2, Fakt-3+]". Macht Q-Gate-Pruefung explizit und reviewbar. [BEREITS IN v1.1 UMGESETZT — verifizieren.] |
| QA-H7 | **SCPL-Ableitbarkeit (QS8) nicht operationalisiert.** Tafelbild-Entwurf im SKRIPT (§3.2) soll "als Grundlage fuer AGENT_HEFTEINTRAG dienen" — aber was genau muss ableitbar sein? Kernbegriffe, Ordnungsmuster-Hinweis, Verbindungsstruktur sind genannt, aber kein formales Mapping SKRIPT-Tafelbild → HEFTEINTRAG-SCPL. | RA1 | VERTRAG_PHASE_0-3_SKRIPT (QS8) | M-QA9: QS8 praezisieren: Tafelbild-Entwurf muss enthalten: (1) mindestens 1 Kernbegriff der spaeter als SCPL-Loesung erscheint, (2) Ordnungsmuster-Hinweis, (3) mindestens 1 kausale/chronologische Verbindung, die spaeter als Complication taugt. |
| QA-H8 | **STRUKTUR-FREEZE-Definition uneinheitlich.** VERTRAG_PHASE_0-4_HEFTEINTRAG §5 definiert 9 Elemente (5 eingefroren, 3 formulierungsoffen, 2 nicht-produziert). WORKFLOW_v4.1 nennt STRUKTUR-FREEZE, aber ohne Elementliste. Kein anderer Vertrag referenziert die vollstaendige Definition. Downstream-Agenten koennten abweichende Annahmen treffen. | RA3 | VERTRAG_PHASE_0-4_HEFTEINTRAG (§5), WORKFLOW_v4.1 | M-QA10: STRUKTUR-FREEZE-Definition als kanonische Referenz in WORKFLOW_v4.1 verankern (Verweis auf HEFTEINTRAG-Vertrag §5). Phase-1/2-Vertraege muessen diese Referenz importieren. |
| QA-H9 | **Rollenprofile-Informationsbruch.** INHALTSBASIS definiert Rollenprofile (rolle-X-Y), SKRIPT referenziert sie per Artefakt-Marker, aber ab HEFTEINTRAG werden Rollenprofile nicht mehr explizit gefuehrt. Phase-1-MATERIAL hat keine Spezifikation, wie Rollenprofile in Materialien einfliessen. | RA3 | VERTRAG_PHASE_0-2_INHALT (Rollenprofile), VERTRAG_PHASE_0-3_SKRIPT (Artefakt-Marker) | M-QA11: In Phase-1-Vertrag (wenn geschrieben) explizit regeln: Rollenprofile fliessen als Quellenmaterial fuer perspektivische Darstellungstexte und Rollenspiel-Aufgaben ein. Referenz: rolle-X-Y ID aus INHALTSBASIS. |
| QA-H10 | **Quellenorientierung nicht operationalisiert.** GPG-Fachdidaktik (B1) fordert Quellenarbeit als Kern. SK-Kriterien behandeln Quellen nur als Artefakt-Typ, nicht als didaktisches Prinzip (Analyse, Einordnung, Kritik). Phase-0-Vertraege kennen keinen Operator "Quelle untersuchen/bewerten". | RA4 | VERTRAG_PHASE_0-3_SKRIPT (SK-Kriterien), GUETEKRITERIEN_SKRIPT.md | M-QA12: Quellenorientierung als fachdidaktisches Kriterium SK18 in GUETEKRITERIEN_SKRIPT.md ergaenzen. Definition: Mindestens 1 Chunk pro Game muss eine historische Quelle so einbetten, dass SuS sie analysieren (nicht nur lesen) koennen. |

### 3.3 MEDIUM

| ID | Finding | Quelle | Massnahme |
|---|---|---|---|
| QA-M1 | **Differenzierung in Phase 0 zu vage.** DIDAKTIK-Vertrag (QD8) fordert "Differenzierungshinweise (3-Stufen-Tipp-System)" — das ist ein Phase-2-Mechanismus, der in Phase 0 nicht steuerbar ist. Phase-0-Differenzierung muesste auf Mappen-Ebene ansetzen (z.B. optionale Vertiefungsartefakte). | RA4 | M-QA13: Differenzierung in Phase-0-Vertraegen auf Struktur-Ebene beschraenken: Angabe pro Mappe, welche Artefakte/Fakten als "Vertiefung" (optional) vs. "Kern" (pflicht) eingestuft werden. Tipp-System bleibt Phase-2-Aufgabe. |
| QA-M2 | **Sachbezogene Motivierung (SK10) nur quantitativ.** "Mindestens 1 motivierender Einstieg pro Chunk" — aber keine Qualitaetskriterien fuer die Motivierung. Generische Einstiege ("Stell dir vor...") erfuellen das Kriterium formal, aber nicht didaktisch. | RA4 | M-QA14: SK10 in GUETEKRITERIEN_SKRIPT.md praezisieren: Motivierung muss themenimmanent sein (aus dem historischen Material abgeleitet), nicht generisch-fiktiv. |
| QA-M3 | **Narrativitaet (SK-Pruefung) nur quantitativ.** Q1 "Narrative Kohaerenz" und Q9 "Personifizierung" sind binaer (PASS/FAIL). Keine Abstufung zwischen minimalem und exzellentem Narrativ. Qualitaetsunterschied zwischen "ein Name wird erwaehnt" und "konsistente Perspektivfigur" ist nicht erfasst. | RA4 | M-QA15: Erweiterte Bewertungsstufen fuer Q1/Q9 in GUETEKRITERIEN_SKRIPT.md: Minimal (Name genannt), Standard (Handlung beschrieben), Exzellent (konsistente Perspektive ueber Chunk). Severity bleibt identisch, aber HINWEIS-Stufe unterscheidet Qualitaet. |
| QA-M4 | **Kontroversitaet (SK15) als KANN zu optional.** Fuer viele GPG-Themen ist Kontroversitaet ein Beutelsbacher-Konsens-Pflichtprinzip, nicht optional. Einordnung als KANN in SKRIPT-Vertrag widerspricht fachdidaktischem Anspruch. | RA4 | M-QA16: SK15 von KANN auf SOLL hochstufen — mindestens als [SK-HINWEIS] im Output. Fuer Themen mit explizitem Kontroversitaetspotential (Krieg, Kolonialismus, Revolution): MUSS. Thementyp-Klassifikation (M-QA1) steuert dies. |
| QA-M5 | **Hefteintrag nicht als Lernprodukt validiert.** AGENT_HEFTEINTRAG produziert den Hefteintrag als Lehrkraft-Artefakt (Zielvorgabe). Ob SuS den Hefteintrag tatsaechlich selbst erarbeiten koennen (Erarbeitbarkeits-Nachweis QH5), wird nur abstrakt geprueft ("DIRECT/ARTIFACT/INFERENTIAL"), nicht gegen konkrete Materialien. | RA4 | M-QA17: In Phase-1/1.5-Vertrag verankern: Jeder SCPL-Schritt muss durch mindestens 1 Material + 1 Aufgabe erarbeitbar sein. Erarbeitbarkeit wird in Phase 1.5 (Sequenzplanung) konkret gegen Materialien geprueft, nicht nur in Phase 0.4 abstrakt. |
| QA-M6 | **Schwellenwerte nicht fuer Grenzfaelle kalibriert.** 600-900W pro Chunk (SKRIPT), ≥3 Artefakt-Marker pro Chunk, ≥8 Fakten pro Mappe (INHALT) — Toleranzen definiert (±10% fuer Wortanzahl), aber bei systematischer Unter-/Ueberschreitung keine Abstufung (WARN vs. FAIL). | RA1 | M-QA18: Zweistufige Toleranz einfuehren: Gelb-Zone (z.B. 540-600W oder 900-990W) = WARN, Rot-Zone (<540W oder >990W) = FAIL. Analog fuer Fakten und Artefakte. |
| QA-M7 | **Mappen-Aufteilung nicht gegen Unterrichtsprinzipien fundiert.** H1-H7 sind pragmatische Heuristiken, aber nicht an didaktische Artikulationsmodelle (z.B. RITA, Roth) zurueckgebunden. Mappen-Aufteilung koennte zufaellig didaktisch sinnvoll oder unsinnvoll sein. | RA4 | M-QA19: In AGENT_DIDAKTIK §Aufgabe 2 (Mappen-Aufteilung) einen Plausibilitaets-Check ergaenzen: Jede Mappe muss einem didaktischen Artikulationsschritt zuordenbar sein (Problemstellung, Erarbeitung, Sicherung auf Mappen-Niveau). Keine Pflicht-1:1-Zuordnung, aber Reflexionsfrage im Self-Check. |

### 3.4 LOW / INFO

| ID | Finding | Quelle | Status |
|---|---|---|---|
| QA-L1 | Artefakt-Referenzierung zwischen Phasen (img-X-Y aus INHALTSBASIS → SKRIPT-Marker → Phase-1-Material) hat keinen formalen Propagations-Vertrag. Funktioniert im Game-1-Durchlauf, aber nicht vertraglich abgesichert. | RA3 | Wird durch Phase-1-Vertrag (wenn geschrieben) adressiert. |
| QA-L2 | Tafelbild-Entwurf im SKRIPT (§3.2) hat minimale Strukturvorgaben (≥4 Knoten, ≥3 Verbindungen), die fuer einen SCPL-Entwurf nicht praezise genug sind. AGENT_HEFTEINTRAG muss den Entwurf ohnehin neu strukturieren. | RA1 | Akzeptiertes Design: Tafelbild-Entwurf im SKRIPT ist Orientierungshilfe, nicht Vorstufe. |
| QA-L3 | GUETEKRITERIEN_SKRIPT.md wird von SKRIPT-Vertrag referenziert, aber nicht inline zitiert. Agent muss beide Dokumente lesen. Kein Risiko, aber hoehere Token-Last. | RA1 | By design: Duplikations-Vermeidung. |

---

## 4. Massnahmen-Katalog (priorisiert)

### 4.1 Welle 1: CRITICAL + architektonische HIGH (6 Massnahmen)

| ID | Massnahme | Adressiert | Aufwand | Vorbedingung |
|---|---|---|---|---|
| **M-QA1** | Thementyp-Klassifikation einfuehren (Ereignisgeschichte / Konzeptgeschichte / Kulturgeschichte). Verankerung in AGENT_DIDAKTIK Phase 0.1 als Pflicht-Schritt VOR Mappen-Aufteilung. Heuristiken H1-H7 thementyp-adaptiv machen. | QA-C1 | L | Keine |
| **M-QA2** | Eskalationspfad fuer QI2-Scheitern in VERTRAG_PHASE_0-2_INHALT. Mappe-Merge-Option. | QA-C2 | S | Keine |
| **M-QA3** | SCPL-JSON-Schema flexibilisieren: optionale Complication[] fuer nicht-narrative Ordnungsmuster. Ordnungsmuster-spezifische Minimal-Schemata. | QA-H1 | M | M-QA1 (Thementyp bestimmt, welches Schema) |
| **M-QA4** | QI3-Schwellenwerte thementyp-bedingt staffeln. "Perspektivtraeger" statt "Akteur". | QA-H2 | S | M-QA1 |
| **M-QA5** | SK1 (Vergegenwaertigung) thementyp-bedingt interpretieren. Konzeptgeschichte: "Konkretisierung an historischem Fallbeispiel". | QA-H3 | S | M-QA1 |
| **M-QA10** | STRUKTUR-FREEZE-Definition kanonisch in WORKFLOW_v4.1 verankern. | QA-H8 | S | Keine |

### 4.2 Welle 2: Operative HIGH (6 Massnahmen)

| ID | Massnahme | Adressiert | Aufwand |
|---|---|---|---|
| **M-QA6** | Ordnungsmuster-Enum um genetisch + funktional erweitern. | QA-H4 | S |
| **M-QA7** | Fallback-Klausel fuer nicht-teilbare Themen in AGENT_DIDAKTIK. | QA-H5 | S |
| **M-QA8** | QI4-Messbarkeit: Pflicht-Output "KE-Abdeckung" pro Mappe. [Pruefen ob bereits v1.1.] | QA-H6 | S |
| **M-QA9** | QS8 (SCPL-Ableitbarkeit) operationalisieren: 3 Mindest-Inhalte fuer Tafelbild-Entwurf. | QA-H7 | S |
| **M-QA11** | Rollenprofile-Propagation in Phase-1-Vertrag regeln. | QA-H9 | S (deferred bis Phase-1-Vertrag) |
| **M-QA12** | SK18 Quellenorientierung in GUETEKRITERIEN_SKRIPT.md. | QA-H10 | S |

### 4.3 Welle 3: MEDIUM (7 Massnahmen)

M-QA13 bis M-QA19. Siehe Einzelbefunde §3.3. Alle Aufwand S. Keine blockierend.

---

## 5. Konvergenz-Analyse

### 5.1 Staerkste Konvergenz (4 RAs)

**Thementyp-Klassifikation (K1):** RA1 (Schwellenwerte), RA2 (Heuristik-Robustheit), RA4 (fachdidaktische Schaerfe), RA5 (Generalisierbarkeit) identifizieren unabhaengig dasselbe Kernproblem: Die Pipeline ist auf WK1-aehnliche Ereignisgeschichte optimiert. Dies ist der mit Abstand wichtigste Befund.

### 5.2 Dreifach-Konvergenz

- **SCPL-Flexibilitaet (K2):** RA3, RA4, RA5
- **Artefakt-Propagation (K4):** RA1, RA3

### 5.3 Zweifach-Konvergenz

- **Phase-2.0-JSON (K3):** RA1, RA3

### 5.4 Keine Dissense

Kein Finding steht im Widerspruch zu einem Finding eines anderen RA. Die Perspektiven sind komplementaer, nicht konfliktorisch.

### 5.5 Severity-Kalibrierung

RA4 tendiert zu MEDIUM bei Findings, die RA5 als HIGH einstuft (Thementyp-Adaptivitaet). Konsolidierte Kalibrierung folgt RA5: Wenn ein Finding die Generalisierbarkeit der Pipeline grundsaetzlich einschraenkt, ist es HIGH unabhaengig von der fachdidaktischen Schwere des Einzelfalls.

---

## 6. Gesamtbewertung

### 6.1 Staerken der Phase-0-Architektur

- **Vertragslage vollstaendig:** Alle 4 Phasen-Schritte haben formale Vertraege mit Q-Gates.
- **Rueckwaerts-Kontingenz kodiert:** QD9/QD10, QS7/QS8, QI-RC1-RC3, QH-RC1-RC3 sichern Downstream-Kompatibilitaet.
- **STRUKTUR-FREEZE konzeptionell stark:** P3-Prinzip ("Sicherung steuert vom Ende her") ist architektonisch durchgesetzt.
- **Artefakt-Kette klar:** DIDAKTIK_RAHMEN → INHALTSBASIS → SKRIPT → TAFELBILD ist logisch koharent.

### 6.2 Systemisches Defizit

**Die Pipeline ist ein WK1-Prototyp, kein generisches Geschichts-Werkzeug.** Heuristiken, Schwellenwerte und Qualitaetskriterien sind an einem einzigen Thementyp (Ereignisgeschichte mit reicher Quellenlage, klarer Chronologie, benennbaren Akteuren) kalibriert. Fuer Konzeptgeschichte und Kulturgeschichte muss die Pipeline thementyp-adaptiv werden. Dies betrifft 4 von 4 Vertraegen und 2 von 3 Guetekriterien-Katalogen.

### 6.3 Gate-Urteil

**GELB.** Pipeline ist funktionsfaehig fuer Ereignisgeschichte. Fuer Generalisierung: Welle-1-Massnahmen (M-QA1 bis M-QA5, M-QA10) BLOCKER vor naechstem nicht-WK1-Thema.

---

## 7. Empfohlene Reihenfolge

1. **M-QA1 (Thementyp-Klassifikation)** — Grundlage fuer alle thementyp-bedingten Anpassungen. AGENT_DIDAKTIK §Aufgabe 0 (neuer Pflicht-Schritt vor Aufgabe 1).
2. **M-QA2 (QI2-Eskalation)** — Unabhaengig, sofort umsetzbar.
3. **M-QA10 (STRUKTUR-FREEZE kanonisch)** — Unabhaengig, sofort umsetzbar.
4. **M-QA3-M-QA5 (SCPL-Flex, QI3-Staffelung, SK1-Interpretation)** — Abhaengig von M-QA1.
5. **Welle 2** (M-QA6-M-QA12) — Nach Welle-1-Stabilisierung.
6. **Welle 3** (M-QA13-M-QA19) — Inkrementell, nicht blockierend.

---

## 8. v2-Audit: Delta-Analyse

### 8.1 Aggregierte Severity-Verteilung (v2 Einzelberichte)

| RA | CRITICAL | HIGH | MEDIUM | LOW | Total |
|---|---|---|---|---|---|
| RA1 (Artefakt-Qualitaet) | 0 | 4 | 4 | 0 | 8 |
| RA2 (Prozess-Robustheit) | 2 | 6 | 4 | 0 | 12 |
| RA3 (Downstream-Kompatibilitaet) | 0 | 3 | 3 | 0 | 6 |
| RA4 (Fachdidaktik) | 1 | 2 | 5 | 1 | 9 |
| RA5 (Generalisierbarkeit) | 1 | 5 | 4 | 0 | 10 |
| **GESAMT (roh, vor Deduplizierung)** | **4** | **20** | **20** | **1** | **45** |

### 8.2 Konvergenz-Validierung v1 → v2

| v1-Konvergenz-Cluster | v2-Bestaetigung | Neue Evidenz |
|---|---|---|
| K1: Thementyp-Klassifikation (4 RAs) | **BESTAETIGT.** RA2-F02 CRITICAL, RA5-F01 CRITICAL, RA4-F01 CRITICAL (Quellenorientierung = thementyp-abhaengig). | RA5 praezisiert Thementyp-Trias zu Quartett: +Langzeitprozess. RA2 operationalisiert adaptive Heuristiken H1'/H5'. |
| K2: SCPL-Rigiditat (3 RAs) | **BESTAETIGT.** RA4-F02 HIGH, RA5 mehrfach. | RA4 identifiziert konkretes Problem: `complication: [min. 1]` im JSON erzwingt narrativen Zwang auch bei kategorial-vergleichenden Themen. |
| K3: Phase-2.0-JSON (2 RAs) | **BESTAETIGT + VERSCHAERFT.** RA1-F03 HIGH, RA3-F01 HIGH. | RA3 detailliert Placeholder-Inkompatibilitaet ("[REVISION IN 2.1c]" nicht maschinell validierbar). RA1 schlaegt formales .json.schema vor. |
| K4: Artefakt-Propagation (2 RAs) | **BESTAETIGT + HOCHGESTUFT.** RA3-F03 HIGH (war v1 QA-L1 LOW). | RA3 begruendet Hochstufung: Ohne Phase-1-Vertrag ist Artefakt-Propagation nicht reproduzierbar bei Multi-Game-Produktion. |

### 8.3 Neue Findings aus v2 (nicht in v1)

| ID | Finding | RA | Severity | Konsolidierungs-Entscheidung |
|---|---|---|---|---|
| **QA-C3** | **Keine Eskalationspfade bei DIDAKTIK-Q-Gate-Scheitern.** "Nachbesserung" ohne Iterations-Limit, Timeout, User-Eskalations-Trigger. | RA2-F01 | CRITICAL | AUFGENOMMEN in §3.1. Neues CRITICAL. |
| **QA-H11** | **Schwellenwerte nicht zweistufig toleriert.** Kein WARN/FAIL-Abstufung bei Grenzfaellen (7 statt 8 Fakten = gleicher FAIL wie 3 Fakten). | RA1-F01 | HIGH | AUFGENOMMEN. Ersetzt QA-M6 (MEDIUM → HIGH Verschaerfung, da Operationalisierungs-Blockade). |
| **QA-H12** | **Phase-2.0-JSON: Placeholder-Konvention nicht maschinell pruefbar.** "[REVISION IN 2.1c]" ist String-Konvention, kein Schema-Element. Phase-2-Agenten koennen Placeholders nicht von Fehlern unterscheiden. | RA3-F01 | HIGH | AUFGENOMMEN als Praezisierung von K3. |
| **QA-H13** | **Artefakt-Propagation SKRIPT → Phase-1: kein Vertrag.** [ARTEFAKT]-Marker im SKRIPT haben keine definierte Mapping-Regel zu Phase-1-Materialtypen. | RA3-F03 | HIGH | AUFGENOMMEN. Hochstufung von QA-L1 (LOW → HIGH). |
| **QA-H14** | **40% der Q-Gate-Kriterien nicht binaer pruefbar.** QI4, QH-RC2, SK1, Q9 erfordern semantische Interpretation. Agent-Self-Check unzuverlaessig bei Grenzfaellen. | RA1-F06 | MEDIUM→HIGH | AUFGENOMMEN als HIGH (betrifft Reproduzierbarkeit des gesamten Q-Gate-Systems). |
| **QA-M8** | **Phase-1.5-Sequenzierbarkeit nicht operationalisiert.** QS7 fordert "trennbare Einheiten", aber keine Markup-Syntax oder Operationalisierung, was "trennbar" bedeutet. | RA3-F05 | MEDIUM | AUFGENOMMEN. |
| **QA-M9** | **Phase-1-Input-Anforderungen ungenau.** SKRIPT hat inline-Marker UND Artefakt-Zuordnung-Tabelle — authoritative Quelle nicht definiert. | RA3-F04 | MEDIUM | AUFGENOMMEN. |
| **QA-M10** | **HEFTEINTRAG-JSON-Felder inkonsistent mit GUETEKRITERIEN-Erwartungen.** fachbegriffe[] als Array in JSON, aber G10 erwartet positionierte Fachbegriffe (im SCPL-Kontext). | RA1-F07 | MEDIUM | AUFGENOMMEN. |
| **QA-L4** | **Quellentypen nicht systematisch verortet.** INHALTSBASIS kennt zit-X-Y, SKRIPT kennt [ARTEFAKT: quellentext], aber "Quellentyp" (Primaer/Sekundaer, Traditionsquelle/Ueberrestquelle) fehlt als Feld. | RA4-F09 | LOW | AUFGENOMMEN. |

### 8.4 Aktualisierte Severity-Verteilung (konsolidiert, dedupliziert)

| Severity | v1 | v2 | Delta |
|---|---|---|---|
| CRITICAL | 2 | 3 (+QA-C3) | +1 |
| HIGH | 10 | 14 (+QA-H11 bis H14) | +4 |
| MEDIUM | 7 | 10 (+QA-M8 bis M10) | +3 |
| LOW | 3 | 4 (+QA-L4) | +1 |
| **GESAMT** | **22** | **31** | **+9** |

### 8.5 Aktualisiertes Gate-Urteil

**GELB (unveraendert).** Pipeline bleibt funktionsfaehig fuer Ereignisgeschichte. v2-Audit praezisiert und operationalisiert v1-Findings, verschaerft 4 Findings, stuft 1 hoch (LOW→HIGH). Keine Aenderung der strategischen Bewertung: Thementyp-Klassifikation (M-QA1) bleibt Blocker fuer Generalisierung.

### 8.6 Aktualisierter Massnahmen-Katalog (Welle 1 — ergaenzt)

| ID | Massnahme (NEU in v2) | Adressiert | Aufwand |
|---|---|---|---|
| **M-QA20** | Eskalationspfad in DIDAKTIK-Vertrag: Iterations-Limit (max. 1 Selbst-Iteration), Timeout-Hinweis, User-Eskalations-Trigger bei BLOCKER-Scheitern. | QA-C3 | S |
| **M-QA21** | Zweistufiges Toleranz-Modell (GELB/ROT) fuer alle Schwellenwert-Kriterien (QI3, QS3, QS4, QH2, QH4). | QA-H11 | M |
| **M-QA22** | JSON-Schema (.json.schema) fuer hefteintrag.json + sicherung.json mit Placeholder-Handling. | QA-H12 | M |
| **M-QA23** | Phase-1-Vertrag: Artefakt-Propagation [ARTEFAKT]-Marker → Material-Typ-Kandidat → Phase-2-JSON. | QA-H13 | M (deferred bis Phase-1-Vertrag) |
| **M-QA24** | Messbarkeits-Rubrik: Pro Q-Gate-Kriterium Klassifikation Binaer/Hybrid/Urteil + Pruefinstanz (Agent/User/Hybrid). | QA-H14 | M |

---

## 9. Audit-Best-Practice: Persistenz-Pflicht

**Erkenntnis aus v1→v2:** v1-Einzelberichte der 5 RAs waren nur im Konversationskontext vorhanden und gingen bei Context-Compaction verloren. v2-Audit erzwingt Persistenz: Jeder RA schreibt sein Ergebnis als eigene Datei unter `docs/projekt/audit_phase0_v2/`.

**Regel fuer zukuenftige Audits:**
1. Jeder Review-Agent MUSS sein Ergebnis als eigene Datei persistieren (Format: `BERICHT_RA[N]_[DIMENSION].md`).
2. Ablageort: `docs/projekt/audit_[scope]_v[N]/` (z.B. `audit_phase0_v2/`).
3. Pflicht-Sektionen pro Bericht: Header, Zusammenfassung, Findings (strukturiert), Severity-Verteilung, Top-3-Empfehlungen, Delta zu Vorgaenger.
4. Konsolidierungsdokument (dieser Befund) referenziert die Einzelberichte, dupliziert sie nicht.

---

## 10. User-Entscheidungen (Session 15, 2026-04-07)

### 10.1 Thementyp-Klassifikation (M-QA1) — VORLAEUFIG OFFEN

**Entscheidung:** Keine harte Differenzierung in Typen. Alle Themen haben (oder bekommen didaktisch) eine Zeitstruktur — auch vermeintlich nicht-chronologische. Der Ansatz soll ein kleinster gemeinsamer Nenner sein, der Overhead und Misfits vermeidet.
**Status:** Weiter zu evaluieren. Konkret: Wie kann die Pipeline ein Thema so aufbereiten, dass die didaktisch zugeschriebene/gewaeehlte Zeitstruktur als Grundlage dient, ohne eine starre Thementyp-Klassifikation vorauszusetzen?
**Implikation fuer M-QA1:** Kein Thementyp-Feld in Vertraegen. Stattdessen pruefen, ob H1-H7 und SCPL durch robustere Formulierung (z.B. "gewaehlte Ordnung" statt "chronologische Ordnung") bereits abdeckbar sind.

### 10.2 Eskalationspfad-Autonomie (M-QA2) — BEDINGT ENTSCHIEDEN

**Entscheidung:** Agent darf selbst waehlen, WENN ein hochwertiger, verlaesslicher QM-Prozess standardisiert ist und angewendet wird. Besonders bei didaktischen Implikationen muss die Qualitaetssicherung greifen.
**Implikation fuer M-QA2:** Eskalationspfade mit Fallback-Option implementieren, aber flankiert durch verpflichtende Q-Gate-Pruefung des Fallback-Ergebnisses. Kein "stiller Fallback" ohne Audit-Spur.

### 10.3 SCPL-Flexibilisierung (M-QA3) — RICHTUNG ENTSCHIEDEN

**Entscheidung:** Complication[] NICHT abschaffen, sondern konzeptuell erweitern. Jeder Sachverhalt muss didaktisch aus Schuelerperspektive problematisiert werden — braucht also immer eine Complication-Dimension. Die Frage ist, wie Complication qualitativ geschaerft und fuer nicht-narrative Themen nutzbar gemacht wird.
**Status:** Weiter zu evaluieren. Konkret: Wie kann Complication[] so definiert werden, dass sie auch kategoriale/konzeptuelle Problematisierungen (z.B. "Warum war das ein Problem fuer die Menschen?") erfasst, nicht nur narrative Wendepunkte?
**Implikation fuer M-QA3:** Complication[] bleibt Pflicht (min. 1), aber die Definition wird erweitert von "narrative Komplikation" zu "didaktische Problematisierung aus Schuelerperspektive". Vertrag HEFTEINTRAG §Output anpassen.

### 10.4 Prioritaet — ENTSCHIEDEN

**Entscheidung:** Infrastruktur-Schaerfung zuerst. Vorgehen: (1) Pipeline Schritt fuer Schritt optimieren fuer hochwertige Ergebnisse und funktionalen Ablauf. (2) Schrittweise/phasenweise in Realsituationen testen. (3) Learnings optimierend einarbeiten. (4) Dann Gesamt-Game unter Realbedingungen erstellen.
**Implikation:** Game-2-Produktion nicht als naechster Schritt, sondern erst nach Welle-1-Massnahmen (CRITICAL + architektonische HIGH). Testlaeufe koennen phasenweise erfolgen (z.B. nur Phase 0.1+0.2 testen, dann 0.3+0.4).

---

## 11. Naechste Schritte (post User-Entscheidungen)

1. **Welle 1 — CRITICAL + architektonische HIGH (Reihenfolge):**
   - M-QA2: Eskalationspfade mit Fallback + Q-Gate in VERTRAG_PHASE_0-1_DIDAKTIK einbauen
   - M-QA3: Complication[]-Definition in VERTRAG_PHASE_0-4_HEFTEINTRAG erweitern ("didaktische Problematisierung")
   - M-QA1 (light): H1-H7 und Ordnungsmuster-Formulierungen auf "gewaehlte Ordnung" pruefen/anpassen (ohne Thementyp-Feld)
   - Quellenorientierung (RA4-F01 CRITICAL): SK18 in GUETEKRITERIEN_SKRIPT, QI-Erweiterung in VERTRAG_INHALT
   - JSON-Schema-Validierung (RA1-F03, RA3-F01): Formale Schema-Definition fuer Phase-2.0-Kompatibilitaet
2. **Phasenweise Testlaeufe** nach Welle-1-Patches (z.B. Phase 0.1+0.2 mit Game-2-Thema)
3. **Welle 2+3** nach Test-Learnings priorisieren
