# Audit-Ergebnis: v4 Produktionsarchitektur

**Datum:** 2026-03-31
**Auditor:** Claude (Cowork, frische Perspektive auf vorhandene Dokumente)
**Audit-Briefing:** docs/uebergabe/AUDIT_v4_ARCHITEKTUR.md
**Modus:** Read-Only — keine Dateien geaendert, kein Git

---

## Strategische Evaluation (Ebene A)

### A1: Zielsystem-Alignment

**Bewertung: v4 adressiert ein reales, empirisch belegtes Problem.**

Zwei gescheiterte Mappe-2-Versuche (Commits a6aa589, c9eb9ec) belegen die Kerndiagnose: Claude Code liest alle Dateien in einen flachen Kontext und produziert monolithisch. Beim zweiten Versuch wurden die Subagenten-Prompts sogar gelesen, aber nicht isoliert dispatched — 4/5 Aufgaben-JSONs waren engine-inkompatibel.

Die Qualitaetssteigerung durch isolierten Dispatch ist empirisch plausibel: Mappe 1 (manuell gesteuert, 7 Learnings) ist das einzige erfolgreiche Deployment. Die manuelle Steuerung erzwang de facto das, was v4 architektonisch absichern will — ein Material/eine Aufgabe pro Arbeitsschritt, frische Eingabe aus Dateien.

**Einschraenkung:** Die Diagnose "Claude Code kann Subagenten-Isolation nicht erzwingen" ist korrekt fuer die bisherige Nutzung, aber nicht zwingend eine Plattform-Limitation. Claude Code hat ebenfalls ein Agent-Tool mit eigenem Kontext. Die Frage ist nicht "kann Claude Code isolieren", sondern "ist Cowork der bessere Ort fuer didaktische Produktion" (siehe A2).

### A2: Architekturentscheidung Cowork vs. Claude Code

**Bewertung: Die Verlagerung ist eine vertretbare Entscheidung, aber nicht die einzige Loesung.**

Argumente fuer Cowork:
- Cowork's Agent-Tool bietet nachweislich isolierten Kontext pro Dispatch
- Cowork eignet sich besser fuer User-Interaktion waehrend der Produktion (Validierungen)
- Trennung Didaktik (Cowork) vs. Technik (Claude Code) ist konzeptionell sauber

Argumente dagegen:
- Claude Code hat ebenfalls ein Agent-Tool — die Isolation ist plattform-unabhaengig verfuegbar
- Die Verlagerung erzeugt eine neue Schnittstelle (Artefakt-Verzeichnis → Claude Code Assembly), die fehleranfaellig ist
- Cowork hat keine Git-Integration — Artefakte muessen ueber das Dateisystem transportiert werden

**Neue Risiken durch Verlagerung:**
1. Dateisystem als Transportschicht zwischen Cowork und Claude Code ist fragil — keine Versionierung, keine Integritaetspruefung
2. Cowork-Sessions haben Token-Limits; 11+ sequentielle Agent-Dispatches (6 Materialien + 5 Aufgaben + Orchestration) koennten das Limit erreichen
3. Die Architektur setzt voraus, dass das Agent-Tool in Cowork tatsaechlich isolierten Kontext erzeugt — das ist plausibel, aber nicht formal verifiziert

**Einfachere Alternativen (evaluiert):**
- Mehrere sequentielle Claude-Code-Sessions (je 1 Material): Funktional aequivalent, aber erfordert manuelle Session-Steuerung durch den User
- Claude Code Agent-Tool mit expliziter Kontextisolation: Theoretisch moeglich, praktisch nicht getestet
- Cowork bleibt die bessere Wahl, weil es User-Interaktion und Isolation in einer Umgebung kombiniert

### A3: Komplexitaetsbudget

**Bewertung: Grenzwertig — die Architektur ist fuer den Output-Umfang (11 Artefakte pro Mappe) komplex, aber nicht ueber-engineered.**

Komplexitaetstreiber und ihre Berechtigung:

| Element | Berechtigt? | Begruendung |
|---|---|---|
| 7 Prinzipien P1-P7 | JA | P1 (Read-from-Artifact) und P6 (Occam's Razor) adressieren die Root Cause direkt |
| 3 Phase-2-Unterphasen (2.0, 2.1, 2.2a/b/c) | JA | Spiegeln die tatsaechliche Produktionslogik (Rahmen → Material → Aufgaben) |
| Feld-granulare Schnittstellen-Vertraege | GRENZWERTIG | Nuetzlich als Dokumentation, aber die NICHT-lesen-Spalten sind nicht erzwingbar — Cowork's Agent-Tool bekommt Dateien, nicht Felder |
| Compaction-Failsafe P1 | JA | Direkte Antwort auf beobachtetes Problem (Kontextverlust bei langen Sessions) |
| Artefakt-Verzeichnisstruktur | JA | Notwendige Konsequenz aus P4 (ein Artefakt pro Dispatch) |

**Vereinfachungsvorschlaege:**
1. NICHT-lesen-Spalten in P6 koennen zu Hinweisen degradiert werden — sie sind nicht maschinell erzwingbar und erhoehen die kognitive Last ohne erzwingbaren Nutzen
2. Phase 2.0 (Rahmen) koennte in Phase 2.1 integriert werden (erster Dispatch = Rahmen), statt eine eigene Phase zu sein
3. Das Q-GATE-LOG.md als separates Artefakt ist sinnvoll, aber die doppelte Dokumentation (Finding in Q-GATE-LOG + Re-Dispatch) koennte vereinfacht werden

### A4: Risiken

**Priorisiert nach Schwere:**

**HOCH:**
1. **Token-Budget in Cowork-Session.** 11+ Agent-Tool-Dispatches mit je 1 Prompt-Datei (100-300 Zeilen) + 3-5 Input-Dateien + Q-Gate. Konservativ geschaetzt: 3000-5000 Token pro Dispatch-Kontext. Gesamtbudget fuer Phase 2: 40.000-60.000 Token nur fuer Inputs. Dazu kommen Outputs, Orchestration, Q-Gate-Logs. Risiko: Session-Compaction mitten in Phase 2.2.

2. **Fehlende Integritaetspruefung zwischen Phasen.** Phase 3 (Claude Code) liest Artefakte, die Phase 2 (Cowork) geschrieben hat. Es gibt keinen Mechanismus, der verifiziert, dass alle erwarteten Dateien vorhanden sind und valides JSON enthalten, BEVOR die Assembly beginnt. Phase 3.0 (Pre-Flight) prueft nur, ob das Produktionsverzeichnis existiert.

3. **NICHT-lesen als Vertrag-ohne-Enforcement.** Die Schnittstellen-Vertraege definieren, welche Felder NICHT gelesen werden sollen. Cowork's Agent-Tool uebergibt aber ganze Dateien, nicht Feldselektionen. Der Vertrag ist aspirational, nicht erzwingbar.

**MITTEL:**
4. **Abhaengigkeit vom Agent-Tool-Verhalten.** v4 setzt voraus, dass jeder Agent-Tool-Call in Cowork einen frischen, isolierten Kontext erhaelt. Wenn Cowork-interne Optimierungen (z.B. Kontext-Sharing zwischen Agents) dieses Verhalten aendern, bricht die Architektur.

5. **Kein Rollback-Mechanismus.** Wenn Phase 2.2b (Aufgabe 3 von 5) eine FAIL-Kaskade ausloest, gibt es keinen definierten Weg, nur diese Aufgabe zu wiederholen, ohne die anderen 4 Aufgaben und den Progressionsplan zu invalidieren.

### A5: Alternative Ansaetze

**Evaluierte Alternativen:**

| Ansatz | Pro | Contra | Empfehlung |
|---|---|---|---|
| Claude Code Agent-Tool (statt Cowork) | Gleiche Isolation, Git-Zugriff, kein Phasenwechsel | Nicht empirisch getestet, CC tendiert zu monolithischer Produktion | TESTEN — ein einzelnes Material ueber CC Agent-Tool produzieren, Qualitaet vergleichen |
| Einzelne CC-Sessions pro Material | Maximale Isolation, kein Token-Budget-Problem | Erfordert manuelle User-Steuerung (11 Sessions), kein Orchestrator-Kontext | NICHT EMPFOHLEN — zu hoher manueller Aufwand |
| Vereinfachte Prompts ohne Subagenten | Weniger Komplexitaet, weniger Fehlerpunkte | Qualitaetsverlust bei spezialisierten Materialtypen (Zeitleiste, Statistik) | NICHT EMPFOHLEN — Subagenten-Spezialisierung ist qualitaetsrelevant |
| Hybrid: Cowork fuer Orchestration + CC Agent-Tool fuer Dispatch | Orchestrator in Cowork (User-nahe), Subagenten in CC (Git-nahe) | Zwei Plattformen pro Mappe, hohe Komplexitaet | NICHT EMPFOHLEN — zu viele Plattformwechsel |

**Nicht evaluierter Ansatz (Empfehlung):**
Cowork-Session mit expliziter Checkpoint-Strategie: Nach jedem 3. Dispatch ein User-Gate, das gleichzeitig als Session-Refresh dient. Verhindert Compaction-Risiko und gibt dem User kontrollierte Eingriffspunkte.

---

## Mechanische Evaluation (Ebene B)

### B1-B5: Befunde

| # | Ebene | Schwere | Befund | Empfehlung |
|---|---|---|---|---|
| 1 | B2 | **BLOCKER** | **SUB_AUFGABE_LUECKENTEXT.md Schema-Mismatch:** Subagent-Schema definiert `text_mit_luecken` als Feld fuer `___`-Platzhalter und `frage` als beschreibende Aufgabenstellung. Engine (`_renderLueckentext`, Zeile 2279) liest jedoch `aufgabe.frage` fuer die `___`-Aufteilung. Mappe 1 (funktionierend) hat `___` direkt in `frage` ohne `text_mit_luecken`-Feld. Mappe 2 (gescheitert, aufgabe-2-2) hat beides — `frage` beschreibend + `text_mit_luecken` mit `___`. Die Engine ignoriert `text_mit_luecken` vollstaendig. | SUB_AUFGABE_LUECKENTEXT.md anpassen: `frage` MUSS die `___`-Platzhalter enthalten. `text_mit_luecken` entweder als Alias fuer `frage` dokumentieren oder komplett entfernen. Engine-Verhalten ist hier der kanonische Standard. |
| 2 | B2 | MEDIUM | **SUB_AUFGABE_FREITEXT.md: Nicht-funktionale Felder.** Schema definiert `erwartete_begriffe` (Array), `validierung_schwelle` (Integer), `teilfragen` (Array). Die Engine (`_checkFreitextCode`, Zeile 2568-2602) ignoriert alle drei und prueft nur Fuzzy-Match auf `loesung` (String). Subagent-Aufwand fuer diese Felder ist verschwendet; schlimmer: der Subagent koennte eine `loesung` produzieren, die als Fuzzy-Match ungeeignet ist (zu lang, zu komplex), weil er auf Begriffs-Validierung vertraut. | Entscheidung treffen: Entweder (a) Engine erweitern um `erwartete_begriffe`-Pruefung, oder (b) Felder aus Schema entfernen und `loesung` als Fuzzy-Match-Zielstring klar dokumentieren. Option (b) ist einfacher und fuer R7-Niveau ausreichend. |
| 3 | B2 | LOW | **SUB_AUFGABE_ZUORDNUNG.md: `elemente`-Array redundant.** Schema definiert sowohl `elemente` (mit begriff+zuordnung) als auch `loesung` (Objekt {begriff: zuordnung}). Engine liest nur `loesung` (Zeile 2126-2130) und extrahiert Begriffe via `Object.keys(aufgabe.loesung)`. `elemente` wird nie gelesen. | `elemente` als optionales Dokumentationsfeld markieren oder entfernen. Kein funktionales Problem. |
| 4 | B1 | MEDIUM | **Phase 2.2b Schritt 3: `_meta.zusammenfassung` existiert nicht.** Der Schnittstellen-Vertrag fuer Aufgaben-Dispatch definiert: "materialien/mat-N-*.json (andere): NUR titel + _meta.zusammenfassung". Das Feld `_meta.zusammenfassung` ist weder im Template data.json noch im Goldstandard (Mappe 1 data.json) noch in irgendeinem SUB_MATERIAL_*.md Schema vorhanden. | Entweder (a) `_meta`-Feld in die Material-Subagenten-Outputs aufnehmen (zusaetzlicher Produktionsaufwand), oder (b) Vertrag korrigieren: "NUR titel + didaktische_funktion" — beides existierende Felder, die ausreichend Kontext geben. Option (b) empfohlen. |
| 5 | B1 | MEDIUM | **Phase 2.0 sicherung.json: Felder unvollstaendig.** Schnittstellen-Vertrag definiert Output-Felder `typ, reflexionsimpuls, hefteintrag-ref, zitat`. Engine (`_renderSicherung`, Zeile 1071+) rendert aber auch `zusammenfassung` und `ueberleitung`. Beide fehlen im Vertrag. Die bestehende Goldstandard-data.json hat `zusammenfassung`, `ueberleitung`, `reflexionsimpuls`, `hefteintrag_verweis` — deutlich mehr als im Vertrag. | sicherung.json-Vertrag um `zusammenfassung`, `ueberleitung`, `kernerkenntnisse[]` ergaenzen. Alle Felder, die die Engine rendert, muessen im Vertrag stehen. |
| 6 | B3 | LOW | **Phase 2.2a: Token-Last bei 6+ Materialien.** AGENT_RAETSEL liest ALLE materialien/mat-N-*.json im selben Dispatch. Bei 6-9 Materialien mit je 500-1500 Woertern Inhalt sind das 3000-13500 Woerter nur fuer Material-Input. Plus Prompt + Tafelbild + DIDAKTIK_RAHMEN. Compaction ist hier nicht das Risiko (ein Dispatch), aber Token-Limit des einzelnen Agent-Tool-Calls koennte erreicht werden. | Dokumentieren: Falls mehr als 8 Materialien pro Mappe, kann Phase 2.2a gesplittet werden (Materialien lesen → zusammenfassen → Progressionsplan). Fuer typische 6-7 Materialien ist das Risiko akzeptabel. |
| 7 | B4 | MEDIUM | **v3: FRAGEBOGEN_mappe-N.md fehlt in v4.** WORKFLOW_v2.md Phase 2.2c definiert als Output "FRAGEBOGEN_mappe-N.md" (vermutlich ein Schueler-Reflexionsbogen). WORKFLOW_v4.md Phase 2.2c erwaehnt diesen Output nicht. | Klaeren: Ist FRAGEBOGEN_mappe-N.md produktiv relevant oder war es ein Planungs-Artefakt? Falls relevant: in v4 Phase 2.2c aufnehmen. Falls nicht: bewusste Entscheidung dokumentieren. |
| 8 | B5 | PASS | **Mappe-Anhang-Prozedur konsistent.** Phase 3.0 liest data.json aus Git. Phase 3.2 Schritt 6 referenziert die Mappe-Anhang-Prozedur aus ORCHESTRATOR.md Zeilen 120-131. Bestehende Mappen werden nicht angefasst. Einzige erlaubte Aenderung: generische Ueberleitung spezifizieren. C5 Variante B fuer letzte Mappe. Alles konsistent. | — |
| 9 | B4 | PASS | **Verlustfreiheit der Kern-Elemente.** Phase 1.5 Sequenzplanung, sequenz_kontext-Objekte, didaktische_funktion, position, voraussetzung — alles in v4 vorhanden. TB-FREEZE bewahrt. SCPL-Struktur bewahrt. SK1-SK15, G1-G14, A1-A15 Q-Gates bewahrt. L1-L7 Learnings bewahrt. | — |
| 10 | B1 | PASS | **Phase 2.1 Schnittstellen-Vertrag vollstaendig.** 7-Schritt-Eingabe pro Material: MATERIAL_GERUEST (1 Zeile), tafelbild.json (relevante Knoten), SUB_MATERIAL_[TYP].md, SKRIPT (1 Chunk), INHALTSBASIS (1 Sektion), einstieg.json (problemstellung), ARTEFAKT_INVENTAR (1 Eintrag). Alle referenzierten Felder existieren in den Input-Dateien. | — |
| 11 | B3 | PASS | **Compaction-Failsafe haelt.** Phase 2.1 liest sequentiell aus Dateien (P1). Bereits geschriebene .json bleiben erhalten. Phase 2.2b liest PROGRESSIONSPLAN + Ziel-Material aus Dateien. Kein Dispatch haengt von Kontext-Inhalten ab. | — |

---

## Gesamtbewertung

v4 ist der richtige Weg. Die Architekturentscheidung — didaktische Produktion in Cowork mit isoliertem Dispatch, technische Assembly in Claude Code — adressiert die empirisch belegte Root Cause der gescheiterten Mappe-2-Versuche.

**Vor Runde 2 muessen 3 Punkte geklaert werden:**

1. **BLOCKER B2-#1: SUB_AUFGABE_LUECKENTEXT.md reparieren.** `frage` muss die `___`-Platzhalter enthalten, nicht `text_mit_luecken`. Dies ist die exakte Fehlerquelle, die Mappe 2 v2 zum Scheitern brachte.

2. **MEDIUM B1-#4: `_meta.zusammenfassung` im Schnittstellen-Vertrag korrigieren.** Feld existiert nicht — Vertrag referenziert Phantom-Daten.

3. **MEDIUM B1-#5: sicherung.json-Vertrag vervollstaendigen.** `zusammenfassung` und `ueberleitung` fehlen, werden aber von der Engine gerendert.

Optional vor Runde 2 (kein Blocker):
- Entscheidung zu SUB_AUFGABE_FREITEXT `erwartete_begriffe` treffen (Engine erweitern oder Felder entfernen)
- Token-Budget-Strategie fuer Cowork-Session dokumentieren (Checkpoint nach Phase 2.1, vor 2.2a)
- FRAGEBOGEN-Status klaeren (bewusst entfernt oder versehentlich vergessen)
