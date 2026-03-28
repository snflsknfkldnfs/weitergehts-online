
## Audit-Report: v3-3 — WORKFLOW + AGENT_MATERIAL + ORCHESTRATOR

---

### Findings

|#|Datei|Sektion|Dim|Sev|Beschreibung|Fix-Vorschlag|
|---|---|---|---|---|---|---|
|1|WORKFLOW_v2.md|Header|A4|MEDIUM|Dateiname ist `WORKFLOW_v2.md`, aber Header sagt "Workflow v3". UPGRADE_PLAN_v3.md Abschnitt 7 listet `docs/architektur/WORKFLOW_v3.md` als NEU. Tatsächlich wurde WORKFLOW_v2.md in-place aktualisiert statt als v3 umbenannt. Der Dateiname suggeriert v2, der Inhalt ist v3.|Datei umbenennen zu `WORKFLOW_v3.md` ODER in UPGRADE_PLAN Abschnitt 7 korrigieren zu "WORKFLOW_v2.md → v3 (in-place aktualisiert)"|
|2|WORKFLOW_v2.md|Abschnitt 1|A4|MEDIUM|Header "## 1. Warum v2?" — müsste "Warum v2/v3?" oder "Warum diese Architektur?" heißen. Gleiches für "## 3. Agenten-Rollen in v2". Text beschreibt v3-Architektur mit v2-Überschriften.|Abschnitt-Titel auf v3 aktualisieren|
|3|WORKFLOW_v2.md|Abschnitt 3, Rollenprofil-Tabelle|A4|MEDIUM|Tabelle heißt "Rollenprofil-Veraenderungen v1 → v2". Müsste "v1 → v3" heißen, da sie v3-spezifische Einträge enthält (TAFELBILD, SKRIPT ohne TB-Entwurf).|"v1 → v2" ersetzen durch "v1 → v3"|
|4|ORCHESTRATOR.md|data.json Schema|A5|HIGH|Das data.json-Schema im ORCHESTRATOR enthält `tafelbild`-Objekt mit `knoten[]` und `verbindungen[]`, aber **kein** `merksatz`-Feld in den Knoten und **kein** `kernerkenntnisse[]`-Array. AGENT_TAFELBILD und GUETEKRITERIEN_TAFELBILD definieren beide Felder als Pflicht. AGENT_MATERIAL Abschnitt 2.2 zeigt sie korrekt. Das ORCHESTRATOR-Schema ist veraltet.|`merksatz`-Feld in `knoten[]`-Objekt ergänzen, `kernerkenntnisse[]`-Array auf Tafelbild-Ebene ergänzen|
|5|ORCHESTRATOR.md|data.json Schema|A5|HIGH|Schema zeigt `sicherung: { typ, text }` — ein flaches Objekt. WORKFLOW_v2.md und AGENT_MATERIAL definieren `sicherung: { tafelbild: { knoten[], verbindungen[], voraussetzungen[], kernerkenntnisse[] }, zusammenfassung, ueberleitung }`. Die Sicherungs-Struktur divergiert.|ORCHESTRATOR-Schema an WORKFLOW_v2.md Abschnitt 9 angleichen|
|6|ORCHESTRATOR.md|data.json Schema|A5|MEDIUM|Schema zeigt `einstieg: { typ, text, tafelbild_voraussetzungen[] }`. WORKFLOW_v2.md Abschnitt 9 definiert `einstieg: { narrativ, problemstellung }`. Unterschiedliche Feldnamen.|Einstieg-Schema vereinheitlichen|
|7|ORCHESTRATOR.md|data.json Schema|A5|MEDIUM|Schema zeigt `materialien[].tafelbild_knoten: []` (Array-Feld). WORKFLOW_v2.md Schema Abschnitt 9 zeigt kein `tafelbild_knoten`-Feld in `materialien[]`. AGENT_MATERIAL Produktions-Output (Abschnitt 2.4) hat ebenfalls kein solches Feld.|Feld aus ORCHESTRATOR-Schema entfernen oder in WORKFLOW + AGENT_MATERIAL aufnehmen|
|8|AGENT_MATERIAL.md|Aufgabe 1.1|A3|OK|TB-FREEZE korrekt beschrieben: "AGENT_MATERIAL darf keine Knoten hinzufuegen, entfernen oder inhaltlich aendern". Eskalationspfad `[TB-REVISION NOETIG: kN-M — Grund]` korrekt und konsistent mit WORKFLOW_v2.md, ORCHESTRATOR.md Rücklauf-Zuordnung und UPGRADE_PLAN_v3.md Abschnitt 6.|—|
|9|AGENT_MATERIAL.md|Aufgabe 1.5|A3|OK|Erarbeitbarkeits-Dokumentation korrekt als TB-Abdeckungs-Nachweis beschrieben. Kein Mandat für TB-Änderung.|—|
|10|AGENT_MATERIAL.md|Produktions-Modus 2.2|A3|OK|"Das Tafelbild-JSON wird unveraendert aus TAFELBILD_[game-id]_Mappe[N].md uebernommen [...] AGENT_MATERIAL aendert das Tafelbild nicht." TB-FREEZE konsistent durchgesetzt.|—|
|11|AGENT_MATERIAL.md|Qualitaets-Gate Design-Modus|A7|HIGH|Checkliste enthält "3-8 Tafelbild-Knoten, mindestens 1 `kernbegriff`?" — das ist ein TB-Strukturcheck. In v3 ist TB fixiert; MATERIAL prüft nur Abdeckung, nicht Struktur (das hat AGENT_TAFELBILD mit G1-G2 erledigt). Dieser Prüfpunkt suggeriert MATERIAL dürfe TB-Vollständigkeit beurteilen, was der TB-FREEZE-Logik widerspricht.|Prüfpunkt ersetzen durch "TB-Abdeckung vollständig? Jeder Knoten hat Material-Zuordnung?"|
|12|AGENT_MATERIAL.md|Qualitaets-Gate Design-Modus|A7|MEDIUM|"Max. 10 Verbindungen, alle mit Label?" — ebenfalls TB-Strukturcheck, nicht MATERIAL-Kompetenz in v3.|Prüfpunkt entfernen oder umformulieren: "TB-Verbindungen: Jede im Erarbeitbarkeits-Nachweis adressiert?"|
|13|AGENT_MATERIAL.md|W-8 Tafelbild|A3|HIGH|Workflow W-8 heißt "Tafelbild (Design-Modus 1.5 + Produktions-Modus 2.2)". Im Design-Modus 1.5 beschreibt W-8 "Tafelbild-Verifizierung" — das ist korrekt (nur Mermaid-Visualisierung zur Prüfung). Aber der Text sagt: "Visuell pruefen: Vollstaendigkeit, Verbindungsrichtungen, Label-Praezision. Iterieren bis Verifizierung bestanden." "Iterieren" impliziert Änderungsbefugnis. Unter TB-FREEZE darf MATERIAL nur verifizieren und bei Problemen eskalieren, nicht iterieren.|"Iterieren" durch "Bei Findings: [TB-REVISION NOETIG] markieren" ersetzen|
|14|AGENT_MATERIAL.md|Referenz-Dokumente|A7|LOW|Referenziert `docs/architektur/WORKFLOW_v1.md` als "Kanonisch fuer Schema, Ablauf, Formate". In v3 ist WORKFLOW_v2.md (v3) kanonisch für Pipeline. V1 bleibt nur für Schema-Details relevant.|"Kanonisch" zu "Referenz fuer Schema-Details" ändern|
|15|AGENT_MATERIAL.md|Ausgabe Design-Modus|A7|MEDIUM|Output-Pfad: `docs/architektur/BLUEPRINT_MAPPE_[N]_[game-id].md` mit Verweis "Format: Siehe WORKFLOW_v1.md Abschnitt 5". WORKFLOW_v2.md Abschnitt 5 definiert aber ein eigenes MATERIAL_GERUEST-Format (mit TB-Abdeckungs-Tabelle statt TB-Detail). Die Referenz zeigt auf das falsche Dokument.|Verweis auf `WORKFLOW_v2.md Abschnitt 5` korrigieren|
|16|WORKFLOW_v2.md|Abschnitt 4, Schritt 0.3|A6|OK|SKRIPT Q-Gate: Q6 ("Tafelbild-Entwurf vorhanden") korrekt entfernt. 10 Prüfpunkte (Q1-Q5, Q7-Q13, Q6 gestrichen mit Vermerk).|—|
|17|AGENT_SKRIPT.md|Q-Gate|A6|OK|Q6 korrekt als "ENTFALLEN (v3)" markiert mit Durchstreichung und Begründung.|—|
|18|AGENT_SKRIPT.md|Aufgabe 5|A7|OK|Abschnitt "~~5. Tafelbild-Entwurf pro Chunk~~ — ENTFALLEN (v3)" korrekt markiert. Keine Restverweise auf TB-Erstellung durch SKRIPT.|—|
|19|WORKFLOW_v2.md|Abschnitt 5 MATERIAL_GERUEST Template|A5|OK|Template zeigt TB-Abdeckungs-Tabelle (nicht TB-Detail) mit "TB-FREEZE"-Vermerk und Eskalationspfad. `merksatz`-Feld nicht im Template, aber Template referenziert fixierten TB von Phase 0.4 (wo merksatz definiert ist). Konsistent.|—|
|20|WORKFLOW_v2.md|Abschnitt 5|A5|MEDIUM|MATERIAL_GERUEST-Template zeigt `Sicherung → Hefteintrag: Verweis auf TAFELBILD_[game-id]_Mappe[N].md — Hefteintrag-Sektion` + `Reflexionsimpuls`. Das ist korrekt für v3. Aber das Template hat kein explizites Feld "Hefteintrag-Verweis" im data.json-Schema — es ist nur im Markdown-Template des MATERIAL_GERUEST. Die data.json-sicherung im ORCHESTRATOR-Schema hat dieses Feld nicht.|Entweder data.json-sicherung um `hefteintrag_verweis`-Feld erweitern oder dokumentieren, dass der Verweis nur im Design-Artefakt existiert, nicht im Runtime-JSON|
|21|ORCHESTRATOR.md|Workflow-Diagramm|A1|OK|Pipeline-Sequenz: 0.1 DIDAKTIK → 0.2 INHALT → 0.3 SKRIPT → [User-Val] → 0.4 TAFELBILD → 1.1 MATERIAL → 2.x. Korrekt. Phase 0.2b ARTEFAKT fehlt im Diagramm (steht aber in WORKFLOW_v2.md).|ARTEFAKT (0.2b) im ORCHESTRATOR-Diagramm ergänzen (Konsistenz mit WORKFLOW_v2.md)|
|22|ORCHESTRATOR.md|Workflow-Diagramm|A1|MEDIUM|Phase 0.2b AGENT_ARTEFAKT ist in WORKFLOW_v2.md Abschnitt 3 definiert und in der Agenten-Tabelle referenzierbar, aber der ORCHESTRATOR listet ihn NICHT in der Agenten-Tabelle am Ende (nur 9 Einträge: Didaktik, Inhalt, Skript, Tafelbild, Material, Raetsel, Technik, Design, Qualitaet — ARTEFAKT fehlt). Header sagt "acht spezialisierte Agenten" — mit ARTEFAKT wären es neun.|Entweder ARTEFAKT in die Agenten-Tabelle aufnehmen (dann "neun") oder explizit dokumentieren, dass ARTEFAKT als Phase-0.2-Extension von INHALT gilt (nicht eigenständiger Agent).|
|23|ORCHESTRATOR.md|Ausfuehrungsorte|A1|MEDIUM|Tabelle listet 0.1, 0.2, 0.3, 0.4, 1.1, 2.1, 2.2, 3.x — kein Eintrag für 0.2b ARTEFAKT. WORKFLOW_v2.md sagt ARTEFAKT läuft in Claude Code (API-Calls).|0.2b ARTEFAKT mit Ort "Claude Code" in Tabelle ergänzen|
|24|ORCHESTRATOR.md|Rücklauf-Zuordnung|A8|OK|Enthält "Tafelbild-Struktur/Guete → AGENT_TAFELBILD" als eigene Rücklauf-Kategorie. Korrekt für v3.|—|
|25|WORKFLOW_v2.md|Abschnitt 10 Referenzen|A7|LOW|Referenziert `docs/architektur/flowchart-neuausrichtung.mermaid` mit Vermerk "(veraltet — v3-Flowchart ausstehend)". Korrekt als offen markiert, aber der status-quo Flowchart zeigt die v2-Pipeline mit ARTEFAKT aber ohne TAFELBILD.|V3-Flowchart erstellen (nicht blockierend)|
|26|AGENT_MATERIAL.md|Produktions-Output 2.4|A5|MEDIUM|JSON-Template in Abschnitt 2.4 zeigt `sicherung.tafelbild` OHNE `kernerkenntnisse[]` und OHNE `merksatz` in Knoten. AGENT_TAFELBILD und GUETEKRITERIEN definieren beide als Pflicht. Abschnitt 2.2 derselben Datei zeigt sie korrekt. Widerspruch innerhalb derselben Datei.|Template in 2.4 an Abschnitt 2.2 angleichen|
|27|AGENT_MATERIAL.md|Eingabe Design-Modus|A2|OK|Empfängt `TAFELBILD` als expliziten Input: "Fixiertes Tafelbild pro Mappe (JSON + Hefteintrag, nach Q-Gate PASS eingefroren) → AGENT_TAFELBILD (Phase 0.4)". Dateiname-Referenz `TAFELBILD_[game-id]_Mappe[N].md` konsistent mit AGENT_TAFELBILD Output.|—|

---

### Regressions-Check (explizit geprüft)

|Veraltetes Muster|Erwartetes Muster|Gefunden in|Status|
|---|---|---|---|
|`Phase 0.2c`|`Phase 0.4`|Alle 7 Dateien|CLEAN — nirgends "0.2c" gefunden|
|`Tafelbild-Entwurf` (als SKRIPT-Output)|Kein TB in SKRIPT|AGENT_SKRIPT.md|CLEAN — Aufgabe 5 durchgestrichen, kein TB-Output|
|`Tafelbild detaillieren` (MATERIAL-Aufgabe)|`TB-Abdeckung verifizieren`|AGENT_MATERIAL.md 1.1|CLEAN in 1.1 — aber Finding #11/#12: Q-Gate enthält noch TB-Struktur-Prüfpunkte|
|`400-600 Woerter`|`600-900 Woerter`|Alle Dateien|CLEAN — überall 600-900|
|`sieben spezialisierte Agenten`|`acht`|ORCHESTRATOR.md|CLEAN — "acht" korrekt|
|`skript_referenz: null`|Direkt gesetzt|AGENT_TAFELBILD.md|CLEAN — "skript_referenz wird direkt bei Erstellung gesetzt"|
|MATERIAL darf Knoten ändern|TB-FREEZE|AGENT_MATERIAL.md|PARTIAL — 1.1 korrekt, aber W-8 sagt "Iterieren" (#13), Q-Gate hat TB-Struktur-Checks (#11/#12)|
|`v2` in Headern|`v3`|WORKFLOW_v2.md|PARTIAL — Header sagt v3, aber Abschnitt-Titel sagen v2 (#2/#3)|

---

### Gesamtbewertung

**CONDITIONAL GO.**

Keine BLOCKER. Drei HIGH-Findings, die vor dem nächsten Phase-0-Durchlauf behoben werden sollten:

|#|Finding|Fix-Aufwand|
|---|---|---|
|4+5|ORCHESTRATOR data.json-Schema: Tafelbild ohne `merksatz`/`kernerkenntnisse`, Sicherung falsche Struktur|10 min — Schema aus WORKFLOW_v2.md Abschnitt 9 + AGENT_MATERIAL 2.2 übernehmen|
|11|AGENT_MATERIAL Q-Gate: TB-Struktur-Checks statt TB-Abdeckungs-Checks|5 min — 2 Prüfpunkte umformulieren|
|13|AGENT_MATERIAL W-8: "Iterieren" verletzt TB-FREEZE|2 min — Wort ersetzen|

Die Kernarchitektur (TAFELBILD als Phase 0.4, TB-FREEZE-Durchsetzung, SKRIPT ohne TB-Entwurf, Hefteintrag als dualer Output) ist konsistent implementiert. Die Findings betreffen veraltete Schema-Fragmente und zwei Q-Gate-Prüfpunkte, die noch v2-Logik enthalten.