# Changelog: Interaktive Unterrichtsmaterialien -- weitergehts.online

Chronologisches Protokoll aller Arbeitsschritte. Neueste Einträge oben.

---

## 2026-04-04 — Session 10 (Forts. 5): IL-1 + IL-4 Infrastruktur-Patches

**Phase:** Post-C2 Infrastruktur-Revision (Prioritaet 1 vor D15 / Mappe 5)

**Durchgefuehrt:**
- IL-1 Patch (5 Dateien): Python-JSON-Validierung als PFLICHT v4.0 in allen SUB_AUFGABE_*.md verankert. Pflichtschritt `python3 -c "import json; json.load(open('aufgabe-<id>.json'))"` nach Fertigstellung, BEVOR Artefakt zurueckgegeben wird. Kein Rueckgabe-Output ohne erfolgreichen Validierungslauf. Schliesst root cause des HIGH-Findings P6-F1 (asymmetrische Encoding-Durchsetzung).
- IL-4 Patch (1 Datei): Session-Split-Prompt nach Phase 2.1c als PFLICHT v4.0 in ORCHESTRATOR.md. Zwei Aenderungen: (1) CHECKPOINT-Markierung im Phase-2-Diagramm mit expliziter PFLICHT-Kennzeichnung + Verweis auf OPT-8. (2) Session-Split-Template-Sektion um PFLICHT-Regel + Durchsetzungs-Mechanismus erweitert. Split darf nicht mehr token-basiert (~24K) sondern muss phasen-basiert (nach 2.1c) ausgeloest werden. Adressiert MEDIUM-Finding P4-F1 (1/5 Sessions hatte den Split vergessen).
- Beide Patches sind Prioritaet 1 aus der C2-Evaluation (Section 4). IL-2, IL-3, IL-5 bleiben als Prioritaet 2 offen (nicht blockierend).

**Geaenderte Dateien:**
- docs/agents/SUB_AUFGABE_MC.md
- docs/agents/SUB_AUFGABE_FREITEXT.md
- docs/agents/SUB_AUFGABE_LUECKENTEXT.md
- docs/agents/SUB_AUFGABE_REIHENFOLGE.md
- docs/agents/SUB_AUFGABE_ZUORDNUNG.md
- docs/agents/ORCHESTRATOR.md
- docs/projekt/STATUS.md
- docs/projekt/CHANGELOG.md

**Naechster Schritt:** D15 Browser-Validierung Mappe 4.

---

## 2026-04-04 — Session 10 (Forts. 4): C2_EVALUATION_MAPPE4.md — Go/No-Go = GO

**Phase:** C2 Mappe-4-Validierung (Gesamtsynthese + Entscheidung)

**Durchgefuehrt:**
- C2_EVALUATION_MAPPE4.md: Finale Bewertung des C2-Validierungstests ueber alle 8 Dimensionen.
- Erfolgskriterien-Pruefung: (1) B1-B10 Regression: 0 wiederkehrend (8 BEHOBEN, 1 PARTIAL B9, 1 N/A B4) → BESTANDEN. (2) Max 2 neue mappe-spezifische: 3 LOW → BESTANDEN mit Toleranz. (3) Eskalation Option A: NICHT AUSGELOEST.
- Dimensionale Gesamtbewertung: 8/8 PASS. Keine Dimension mit FAIL oder CONDITIONAL.
- Mappe-3 vs. Mappe-4 Vergleich: Aufgaben-Nachbesserungen -80pp (100%→20%), 0 B1-B10 Repeats, ~10× schnellere Produktion.
- Konsolidiertes Finding-Register: 1 HIGH (behoben), 3 MEDIUM (D2-F5 Engine-Limitierung, D8-F1 A1-partial, D6-F1 Recovery), 9 LOW, 8 INFO.
- 5 Infrastruktur-Luecken (IL-1 bis IL-5) priorisiert. Empfehlung: IL-1 + IL-4 vor Mappe-5.
- D15-Risikoanalyse: 2 Risiken identifiziert (R1 Engine-Rendering MEDIUM, R2 Browser-Kompatibilitaet LOW).
- **Go/No-Go: GO fuer D15 Browser-Validierung. Pipeline PRODUKTIONSREIF.**

**Geaenderte Dateien:**
- docs/analyse/C2_EVALUATION_MAPPE4.md (NEU)
- docs/projekt/STATUS.md
- docs/projekt/CHANGELOG.md

**Naechster Schritt:** IL-1 + IL-4 Infrastruktur-Patches → D15 Browser-Validierung.

---

## 2026-04-04 — Session 10 (Forts. 3): D3-D8-Audit + Dimensionale Audits komplett

**Phase:** C2 Mappe-4-Validierung (Dimensionale Audits D3-D8)

**Durchgefuehrt:**
- D3-D8 konsolidiert in einem Dokument (C2_AUDIT_D3-D8.md). Alle 6 Dimensionen aus Transcript-Metriken + Verlaufsprotokollen analysiert.
- D3 Technik: Finale Dateien einwandfrei. 1 HIGH Finding (P6-F1 Encoding, in Assembly behoben). Infrastruktur-Luecke: Python-Validierung bei Aufgaben fehlt.
- D4 Tool-Calling: 265 produktive Calls, <5% Redundanz. Intra-Session-Lerneffekte nachweisbar.
- D5 Token-Effizienz: ~195K Output-Tokens, Dispatch-Isolation erweist sich als token-effizient (~5.4K/Dispatch bei Aufgaben). Context-Reuse funktioniert.
- D6 Compaction-Resilienz: 2/2 Events mit korrektem Output. Schwaechen: Pfadfehler (C1), Sprach-Wechsel (reproduzierbar), unvollstaendige Re-Lektuere. 2 Protokoll-Luecken identifiziert.
- D7 Usability: 0 inhaltliche User-Interventionen in 86 min / 18 Dispatches. Volle Autonomie.
- D8 Infrastruktur: 7/8 Patches wirksam. A1 Encoding partial (Mechanismus fehlt bei Aufgaben). 5 Infrastruktur-Luecken (IL-1 bis IL-5) identifiziert, alle patchbar.
- **Alle 8 Dimensionen D1-D8 abgeschlossen.** Naechster Schritt: C2_EVALUATION_MAPPE4.md.

**Geaenderte Dateien:**
- docs/analyse/C2_AUDIT_D3-D8.md (NEU)
- docs/projekt/STATUS.md
- docs/projekt/CHANGELOG.md

**Naechster Schritt:** C2_EVALUATION_MAPPE4.md (Gesamtsynthese + Go/No-Go) → D15 Browser-Validierung.

---

## 2026-04-04 — Session 10 (Forts. 2): D2-Audit Didaktische Qualitaet

**Phase:** C2 Mappe-4-Validierung (Dimensionaler Audit D2)

**Durchgefuehrt:**
- D2-Audit: Inhaltsanalytische Tiefenpruefung aller 5 Materialien, 7 Aufgaben, Hefteintrag, Einstieg, Sicherung, Ueberleitungen gegen Tafelbild als Referenz. 6 Subdimensionen: Erarbeitbarkeit (6/6 Knoten PASS), AFB-Progression (korrekt I→III), Aufgaben-Material-Alignment (7/7 PASS), SCPL-Kohaerenz (kausale Narrativkette intakt), Hefteintrag-Sicherung (3/3 KE vollstaendig), Systemische Analyse (5/5 Mappe-3-Probleme geloest, 4 neue Loesungsprobleme).
- Kritischster Befund: D2-F5 (MEDIUM) — Freitext-Validierung (aufgabe-4-7) prueft Keyword-Praesenz, nicht Argumentationsqualitaet. Systemimmanente Engine-Limitierung.
- Didaktische Staerken: Doppelte Verankerung jedes TB-Knotens (Material + Aufgabe), Kanalwechsel (Text→Karte→Tagebuch→Karte→Foto), dramaturgische Ueberleitungen, starke Distraktor-Konstruktion bei aufgabe-4-2 und aufgabe-4-4.

**Geaenderte Dateien:**
- docs/analyse/C2_AUDIT_D2_DIDAKTIK.md (NEU)
- docs/projekt/STATUS.md
- docs/projekt/CHANGELOG.md

**Naechster Schritt:** Dimensionale Audits D3-D8 → C2_EVALUATION_MAPPE4.md.

---

## 2026-04-04 — Session 10 (Fortsetzung): Automated Checks + D1-Audit

**Phase:** C2 Mappe-4-Validierung (Automatisierte Pruefungen + Dimensionaler Audit D1)

**Durchgefuehrt:**
- Automatisierte Checks: Python-Skript mit 14 Pruefkategorien auf alle Produktionsdateien. Ergebnis: 14/14 PASS. 5 initiale FAILs analysiert und als False Positives klassifiziert (Testskript nahm falsche Feldnamen, falsche Pfade und falsche Schema-Strukturen an). Kein neuer Produktionsfehler entdeckt.
- D1 Prozesskongruenz-Audit: 10 Pruefachsen (Dispatch-Vollstaendigkeit, Reihenfolge, Phasenstruktur, Session-Splits, Testbedingungen, Q-Gate-Tracker, Vertrag-Lektuere, Erfolgskriterien, Output-Vollstaendigkeit, Dispatch-Isolation). Ergebnis: PASS mit Einschraenkungen. 3 neue Findings: D1-F1 (LOW: Post-Compaction kein Vertrag re-gelesen), D1-F2 (INFO: D12b/D12c dynamisch), D1-F3 (INFO: Split nach D5 statt D6).
- Methodische Reflexion zur Testskript-Qualitaet dokumentiert: Schema-Annahmen muessen kuenftig aus kanonischen Vertragsdokumenten abgeleitet werden.

**Geaenderte Dateien:**
- docs/analyse/C2_AUTOMATED_CHECKS.md (NEU)
- docs/analyse/C2_AUDIT_D1_PROZESSKONGRUENZ.md (NEU)
- docs/projekt/STATUS.md
- docs/projekt/CHANGELOG.md

**Naechster Schritt:** Dimensionale Audits D2-D8 → C2_EVALUATION_MAPPE4.md.

---

## 2026-04-04 — Session 10: C2-Transcript-Aufbereitung komplett + Konsolidierung

**Phase:** C2 Mappe-4-Validierung (Transcript-Aufbereitung + Konsolidierung)

**Durchgefuehrt:**
- 6 Produktionssessions (P-1 bis P-6) vollstaendig aus JSONL-Transcripts aufbereitet. Pro Session: Dispatch-Analyse mit Read-Steps, Produktionsschritten, Q-Gate-Ergebnissen, Tool-Call-Tabellen, Findings-Register.
- C2_VERLAUF_GESAMT.md erstellt: Konsolidiertes Gesamtprotokoll mit aggregierten Metriken (343 Tool-Calls, 86 min Gesamtdauer, 2 Compactions), Findings-Gesamtregister (53 Findings: 1 HIGH, 2 MEDIUM, 8 LOW), Mappe-3-vs-4-Vergleich, offene Punkte fuer Audits.
- C2_PROZESSANALYSE_RAHMEN.md: Session-Inventar vollstaendig befuellt (P-1 bis P-6), Dispatch-Zuordnung praezisiert.
- Tooling-Plan evaluiert und dokumentiert (Sektion 5b).
- Kritischster Fund: P6-F1 (HIGH) — JSON-Encoding-Fehler in 2 Aufgaben-Dateien, Root-Cause: fehlende Python-Validierung fuer Aufgaben in P-5.

**Geaenderte Dateien:**
- docs/analyse/c2-verlauf/C2_VERLAUF_SESSION_P-1.md (NEU)
- docs/analyse/c2-verlauf/C2_VERLAUF_SESSION_P-2.md (NEU)
- docs/analyse/c2-verlauf/C2_VERLAUF_SESSION_P-3.md (NEU)
- docs/analyse/c2-verlauf/C2_VERLAUF_SESSION_P-4.md (NEU)
- docs/analyse/c2-verlauf/C2_VERLAUF_SESSION_P-5.md (NEU)
- docs/analyse/c2-verlauf/C2_VERLAUF_SESSION_P-6.md (NEU)
- docs/analyse/c2-verlauf/C2_VERLAUF_GESAMT.md (NEU)
- docs/analyse/C2_PROZESSANALYSE_RAHMEN.md (aktualisiert: Session-Inventar, Dispatch-Zuordnung)
- docs/projekt/STATUS.md
- docs/projekt/CHANGELOG.md

**Naechster Schritt:** Automatisierte Checks (Python) → Dimensionale Audits D1-D8 → C2_EVALUATION_MAPPE4.md.

---

## 2026-04-03 — Session 9: Produktionsumgebung — COWORK_PROJECT_ANLEITUNG_PRODUKTION

**Phase:** C2 Mappe-4-Validierung (Produktionsumgebung)

**Durchgefuehrt:**
- COWORK_PROJECT_ANLEITUNG_PRODUKTION.md erstellt: Projektanweisungsdatei fuer separates Cowork-Produktionsprojekt. Drei-Ebenen-Architektur: (1) Identitaet + Prozessrahmen mit allen Pfaden zu Vertraegen, Subagenten, Q-Gates, (2) Compaction-Recovery-Protokoll (6-Schritte deterministisches Re-Entry), (3) Operative Entscheidungsregeln (Encoding, Freitext-Keywords, Knoten-Elaborierung, File-Ownership, Dispatch-Isolation, Q-Gate-Pflicht).
- Generisch gehalten: [game-id] und [mappe-N] als Platzhalter. Wiederverwendbar fuer jede Mappe und jedes Game.
- Designentscheidung: Prototyp des spaeter produktisierten Produktbestandteils (nicht nur Test-Infrastruktur).

**Geaenderte Dateien:**
- docs/projekt/COWORK_PROJECT_ANLEITUNG_PRODUKTION.md (NEU)
- docs/projekt/STATUS.md
- docs/projekt/CHANGELOG.md

**Naechster Schritt:** Neues Cowork-Projekt anlegen, Anleitung als Projektanweisung eintragen, C2 starten.

---

## 2026-04-03 — Session 9: C2-Vorbereitung — TAFELBILD + Dispatch-Skript Mappe 4

**Phase:** C2 Mappe-4-Validierung (Vorbereitung)

**Durchgefuehrt:**
- P3 Engine-Patch v3.9 via Claude Code ausgefuehrt und gemergt (Commit 5bf49ce → 67c222b). Teilfragen-Rendering: _meta.teilfragen → `<ul class="aufgabe__teilfragen">` vor Textarea. Cache-Busting ?v=3.9.
- TAFELBILD_gpg-erster-weltkrieg-ursachen_Mappe4.md erstellt (Phase 0.4). "Warum scheiterte der Plan fuer einen schnellen Sieg?" Ordnungsmuster sequenziell. 6 Knoten (Zweifrontenkrieg → Schlieffen-Plan → Vormarsch → Marne → Stellungskrieg). Q-Gate G1-G14 PASS.
- DISPATCH_SKRIPT_MAPPE4.md erstellt: Steuerungsdokument fuer Produktionssession. 15 Dispatches (Phase 1 → 2 → 3 → 4). Testbedingungen: Kein PM-Eingriff, kein Kopieren von Mappe-3-Artefakten. Erfolgskriterien: 0 wiederkehrende B1-B10, max 2 neue Findings.

**Geaenderte Dateien:**
- docs/agents/artefakte/TAFELBILD_gpg-erster-weltkrieg-ursachen_Mappe4.md (NEU)
- docs/agents/artefakte/produktion/gpg-erster-weltkrieg-ursachen/mappe-4/DISPATCH_SKRIPT_MAPPE4.md (NEU)
- docs/projekt/STATUS.md
- docs/projekt/CHANGELOG.md

**Naechster Schritt:** C2 Produktionssession starten. Separate Cowork-Session, Uebergabe-Prompt: "Lies DISPATCH_SKRIPT_MAPPE4.md, starte mit D-1."

---

## 2026-04-03 — Session 9: C1c Audit KOMPLETT + Pre-C2-Patches P1-P3

**Phase:** Infrastruktur-Revision C1c (Audit + Patches)

**Durchgefuehrt:**
- C1c Audit: 3 Dimensionen × 3 parallele Reviewer (agent-teams). PM-Konsolidierung mit Datenverifikation. 4 Reviewer-BLOCKER als FALSE POSITIVE / LEGACY-ONLY downgraded. Gesamtentscheidung: PATCH-THEN-PROCEED.
- P1 (Freitext-Keyword-Logik): SUB_AUFGABE_FREITEXT.md — Zwei-Ebenen-Modell dokumentiert: loesung[] = Minimum-Keywords (Engine prueft ALL-or-nothing), _meta.erwartete_begriffe = Gesamt-Set fuer Tipp-3 und Lehrkraft. Faustregel: AFB III max 2 Keywords, AFB II max 4.
- P2 (Knoten-Elaborierung): AGENT_HEFTEINTRAG.md — Knoten-Elaborierungs-PFLICHT (v3.5) mit FAIL/PASS-Beispiel. VERTRAG_PHASE_2-0 — Schritt 1-post Elaborierungspruefung. data.json k3-6 merksatz retroaktiv: "Alle Parteien stellen Streit ein und stuetzen gemeinsam den Krieg."
- P3 (Teilfragen-Rendering): UEBERGABE_v3-9_TEILFRAGEN_RENDERING.md erstellt — Engine-Patch ~15 Zeilen JS + ~10 Zeilen CSS. Noch nicht ausgefuehrt (Claude-Code-Domaene).

**Geaenderte Dateien:**
- docs/agents/SUB_AUFGABE_FREITEXT.md (P1)
- docs/agents/AGENT_HEFTEINTRAG.md (P2)
- docs/architektur/vertraege/VERTRAG_PHASE_2-0_RAHMEN.md (P2)
- escape-games/gpg-erster-weltkrieg-ursachen/data.json (P2c: k3-6 merksatz)
- docs/uebergabe/UEBERGABE_v3-9_TEILFRAGEN_RENDERING.md (NEU, P3)
- docs/analyse/AUDIT_PRE_C2_ERGEBNIS.md (NEU, Audit-Ergebnis)
- docs/projekt/STATUS.md
- docs/projekt/CHANGELOG.md

**Naechster Schritt:** P3 Engine-Patch ausfuehren (Claude Code, UEBERGABE_v3-9). Dann C2: Mappe-4-Validierung.

---

## 2026-04-03 — Session 9: C1c Produktionsreife-Audit vorbereitet

**Phase:** Infrastruktur-Revision C1c (Pre-C2 Audit)

**Durchgefuehrt:**
- AUDIT_BRIEFING_PRE_C2_PRODUKTIONSREIFE.md erstellt mit 3 Audit-Dimensionen:
  - Dimension A: Technische Kohaerenz (Schema-Konsistenz, Q-Gate-Vollstaendigkeit, Referenz-Integritaet, Rendering-Kontrakt vs. Engine, Vertrags-Kette, Cache-Busting)
  - Dimension B: Paedagogisch-Didaktische Kalibrierung (Guetekriterien fuer R7/GPG, SCPL-Struktur, AFB-Progression, Aufgabentyp-Verteilung, Material-Didaktik)
  - Dimension C: Engine-Schema-Kompatibilitaet (JSON-Schema vs. Engine-Rendering, Edge Cases, Stretch-Features O3/O5/O6)
- 38 Dateien im Audit-Scope definiert (6 Vertraege, 10 Agenten, 12 Subagenten, 6 Guetekriterien, 2 Engine-Dateien, 2 Referenz-JSONs)
- Severity-Schema pro Dimension (BLOCKER/HIGH/MEDIUM/LOW)
- Entscheidungsmatrix: PROCEED / PATCH-THEN-PROCEED / REDESIGN
- AUSFUEHRUNGSPLAN: C1c als Phase zwischen C1b und C2 eingefuegt

**Geaenderte Dateien:**
- docs/analyse/AUDIT_BRIEFING_PRE_C2_PRODUKTIONSREIFE.md (NEU)
- docs/projekt/AUSFUEHRUNGSPLAN_INFRASTRUKTUR_REVISION.md (C1c eingefuegt)
- docs/projekt/STATUS.md
- docs/projekt/CHANGELOG.md

**Naechster Schritt:** Audit-Durchfuehrung via agent-teams (3 parallele Reviewer). Dann Findings-Konsolidierung → Entscheidung → C2.

---

## 2026-04-03 — Session 9: Mappe-3-Daten-Nachpatch D2+D3 + D2-Infrastruktur-Verschaerfung

**Phase:** Infrastruktur-Revision C1b (Mappe-3-Daten-Nachpatch)

**Durchgefuehrt:**
- D2 Fragestamm-Verankerung (2 Aufgaben):
  - aufgabe-3-4 (MC): Metasprachliche Frage "Welche Aussage erklaert den Widerspruch zwischen Foto und Quellen?" → "Warum zeigt das Foto Jubel und »Ausflug nach Paris«, aber die Quellen berichten von weinenden Muettern?" Begruendung: "Widerspruch" ist Metasprache, R7-SuS brauchen konkrete Inhaltsanker (Jubel, weinende Muetter).
  - aufgabe-3-6 (Zuordnung): Generische Frage "Ordne die Aussagen den Perspektiven zu." → "Ordne die Zitate aus den Quellen und Tagebuechern den Haltungen Begeisterung, Angst und Pflicht zu." Begruendung: "Perspektiven" ist abstrakt, die konkreten Haltungsbegriffe sind der eigentliche Inhalt.
- D3a S-Zone-Autonomie: kontextsatz von "Buendnisse machen aus einem Mord einen Weltkrieg" (rekapituliert Mappe 2) → "August 1914: Die Mobilmachung beginnt. Millionen Soldaten ziehen in den Krieg." (autonom, startet bei Mappe-3-Thema).
- D3b Konzept-Elaborierung: Burgfrieden elaboriert: "SPD stimmt fuer Kriegskredite — alle Parteien stehen zusammen, das nennt man Burgfrieden." (statt implizites Vorwissen zum Begriff).
- D3c Ordnungsmuster-Templates: kontrastierend-Muster explizit in SCPL-Complication: "Die eine Seite: ..." / "Die andere Seite: ..." statt impliziter Kontrast.
- D2-Infrastruktur verschaerft: A2b Inhaltliche Verankerung (v3.4) als formaler PFLICHT-Q-Gate-Pruefschritt in alle 5 SUB_AUFGABE_*.md eingetragen (MC, Zuordnung, Lueckentext, Freitext, Reihenfolge). Jeweils mit FAIL/PASS-Beispiel und Pruefmethode ("frage auf Metabegriffe scannen → bei Fund: konkretes Element vorhanden? Wenn nein → FAIL").

**Geaenderte Dateien:**
- escape-games/gpg-erster-weltkrieg-ursachen/data.json (D2+D3 Patches)
- docs/agents/SUB_AUFGABE_MC.md (A2b)
- docs/agents/SUB_AUFGABE_ZUORDNUNG.md (A2b)
- docs/agents/SUB_AUFGABE_LUECKENTEXT.md (A2b)
- docs/agents/SUB_AUFGABE_FREITEXT.md (A2b)
- docs/agents/SUB_AUFGABE_REIHENFOLGE.md (A2b)
- docs/projekt/STATUS.md
- docs/projekt/CHANGELOG.md

**Naechster Schritt:** Phase C2: Mappe-4-Validierung (erstes vollstaendiges Game mit revidierter Infrastruktur).

---

## 2026-04-03

### Engine v3.6c: Drag & Drop Antwortpool — Browser-PASS
- **Phase:** Infrastruktur-Revision, Engine-Patch D1 (DONE + Browser-PASS)
- **Aufgabe:** Antwortpool als Drag & Drop Wortpool fuer Lueckentext-Aufgaben. Kontrast-Fix. Cache-Busting-System. Rendering-Kontrakt-Update.
- **Ergebnis:**
  - escape-engine.js: _renderLueckentext erkennt antwortpool-Array, rendert klickbare Wort-Buttons (gemischt). Pool-Modus nutzt span statt input. _initPoolInteraction: Klick→naechste leere Luecke fuellen, Klick auf Luecke→Wort zurueck. _checkLueckentext: Pool-kompatibel (data-wort). State-Restore fuer geloeste Aufgaben. Rueckwaerts-kompatibel (ohne antwortpool = bisheriges freies Eingabe-Verhalten).
  - theme-gpg.css: 7 neue Klassen (.aufgabe__antwortpool, __antwortpool-label, __pool-wort, __pool-wort--used, __luecke--pool, __luecke--pool.--filled, __luecke--pool.--correct/--incorrect).
  - data.json: antwortpool fuer aufgabe-1-2 (2 Begriffe), aufgabe-2-4 (5 Begriffe), aufgabe-3-1 (5 Begriffe), aufgabe-3-5 (5 Begriffe). Distraktoren: Macht, 24, Nationalismus, Reichstag.
- **Artefakte:** assets/js/escape-engine.js, assets/css/themes/theme-gpg.css, escape-games/gpg-erster-weltkrieg-ursachen/data.json
- **Naechster Schritt:** Browser-Verifikation Antwortpool in allen 3 Mappen. Dann C2 (Mappe 4).

### Browser-Review Mappe 3 → 5 Architektur-Patches D1-D3c (Infrastruktur-Revision)
- **Phase:** Infrastruktur-Revision, Post-C1 Browser-Review (DONE)
- **Aufgabe:** 3 Browser-Findings auf Architektur-Defizite zurueckfuehren und generalisierte Patches ableiten
- **Ergebnis:**
  - D1 Antwortpool-Pflicht: `antwortpool`-Feld (N+1) als PFLICHT in SUB_AUFGABE_LUECKENTEXT. Tipp-2-Regel v3.4 (Pool nicht mehr in Tipps). A4-LT erweitert. Engine-Aenderung noetig.
  - D2 Inhaltliche Verankerung: A2 um Verankerungspflicht erweitert. AGENT_RAETSEL Operationalisierungsziel Schritt 5 (v3.4). Anti-Pattern "Metasprachliche Fragestellung" in alle 5 SUB_AUFGABE_*.md.
  - D3a S-Zone-Filter: VERTRAG_PHASE_2-0 Schritt 1-pre (kein Vormappe-Wissen). HE17 (S-Zone-Autonomie) als MUSS.
  - D3b Konzept-Elaborierung: HE18 (Konzept-Elaborierung) als MUSS. Komplexe Knoten brauchen Erklaerung.
  - D3c Ordnungsmuster-Templates: VERTRAG_PHASE_2-0 Schritt 1a-post (Muster→SCPL-Mapping). G15 (Ordnungsmuster-Konsequenz) als SOLL.
- **Artefakte:** 12 Dateien gepatcht (docs/ Domaene)
- **Naechster Schritt:** Engine-Patch D1 (Antwortpool-Rendering) + Mappe-3-Daten-Nachpatch + C2

### Phase C1 Mappe-3-Hybrid-Patch (Infrastruktur-Revision)
- **Phase:** Infrastruktur-Revision Phase C1 (DONE)
- **Aufgabe:** Mappe-3-Daten retroaktiv patchen — Hybrid-Ansatz (mechanische Patches + Aufgaben-Neugenerierung via v2-Pipeline)
- **Ergebnis:**
  - Stufe 1: 6 mechanische Patches (mat-3-4, mat-3-5, einstieg, sicherung, hefteintrag) — Encoding B2, Quellenangaben B3, Einleitungen B4, Hefteintrag B10, Sicherung B11
  - Stufe 2: PROGRESSIONSPLAN_v2.md erstellt (SCPL-Mapping, Typ-Begruendungen, Erarbeitbarkeits-Gegenpruefung). 7 Aufgaben neu generiert (v2-Pipeline: variable Aufgabenzahl, inhaltsgesteuerte Typauswahl, SCPL-Zonen). v1-Aufgaben nach _v1_archiv/ archiviert.
  - Stufe 3: data.json per Python-Skript assembliert (7 Aufgaben, 5 Materialien, Hefteintrag v2, Rahmen)
  - Stufe 4: Q-Gate A1-A18: 25/25 PASS. Evaluationsbericht mit 10-Dimensionen-Vergleich + 7 Learnings (L1-L7)
- **Artefakte:**
  - docs/agents/artefakte/produktion/.../mappe-3/PROGRESSIONSPLAN_v2.md (NEU)
  - docs/agents/artefakte/produktion/.../mappe-3/aufgaben/aufgabe-3-1..3-7.json (NEU, v2)
  - docs/agents/artefakte/produktion/.../mappe-3/aufgaben/_v1_archiv/ (5 archivierte v1-Aufgaben)
  - docs/agents/artefakte/produktion/.../mappe-3/Q_GATE_A1_A18_MAPPE3_v2.md (NEU)
  - docs/agents/artefakte/produktion/.../mappe-3/C1_EVALUATION_MAPPE3.md (NEU)
  - escape-games/gpg-erster-weltkrieg-ursachen/data.json (GEPATCHT: Mappe 3 komplett ersetzt)
- **Zentrale Verbesserungen v1→v2:**
  - A18 Material-Aktivierung: mat-3-2 + mat-3-3 als Primaerquelle (v1: nur in Tipps)
  - Aufgabenzahl 5→7 (inhaltsgesteuert)
  - RF-Typ eliminiert (ambige Chronologie B8)
  - SCPL-Zonen explizit: S→C1→C2→C3→P→L(2)
  - Encoding sauber (0 Findings)
- **Naechster Schritt:** Browser-Test Mappe 3 (User-Review), dann C2 Mappe-4-Validierung

### Phase B2 AGENT_RAETSEL Didaktische Professionalisierung (Infrastruktur-Revision)
- **Phase:** Infrastruktur-Revision Phase B2 (DONE)
- **Zweck:** AGENT_RAETSEL von starrer 5-Aufgaben-Schablone auf inhaltsgesteuertes SCPL-Fragebogen-Modell umstellen. Typ-Wiederholung erlauben, Material-Aktivierung erzwingen, Fragebogen als diagnostischen Spiegel des Lernwegs etablieren.
- **Empirische Grundlage:** 7 reale Unterrichtsentwuerfe (7-14 Aufgaben/UE, 0.13-0.18 Fragen/min, 4-Stufen-Progression) + Mappe-2/3-Evaluation (mat-3-2/mat-3-3 nur in Tipps = diagnostische Luecke).
- **Ergebnis:**
  - AGENT_RAETSEL.md v2: Sektion 1 komplett neu (1a Variable Aufgabenzahl 5-8 mit Formel, 1b SCPL-Zonen-Mapping S/C/P/L → AFB, 1c Inhaltsgesteuerte Typauswahl mit Begruendungspflicht bei Wiederholung). Sektion 2 um SCPL-Kontext erweitert. Sektion 5 Cross-Konsistenz um A16/A17/A18 erweitert. Q-Gate um A10v2 + A16-A18 erweitert. Assembly auf 5-8 Positionen aktualisiert. Alle "5 Positionen"-Referenzen bereinigt.
  - GUETEKRITERIEN_AUFGABEN.md v2: A5 revidiert (5-8 statt fix 5). A10 vollstaendig revidiert (inhaltsgesteuerte Typauswahl, max 3x statt 2x, Begruendungspflicht). 3 neue SOLL-Kriterien: A16 Fragebogen-Kohaerenz (SCPL-Sequenz-Mapping), A17 SCPL-Zonen-Abdeckung (Vollstaendigkeitspruefung), A18 Material-Aktivierung (Primaerquellen-Pruefung mit BQ/QT-Regel). Operationalisierungen 6.7-6.10 geschrieben. Sektionen 2.5 (SCPL-Fragebogen-Modell) und 2.6 (Besinnungsphasen) fuer SCPL aktualisiert. Pruefinstanz-Zuordnung 3.4 erweitert. Q-Gate 5.2 aktualisiert.
  - AUSFUEHRUNGSPLAN: B2 Scope erweitert (Typauswahl → volle didaktische Professionalisierung), als ERLEDIGT markiert.
  - Cross-File-Konsistenz: 6 Inkonsistenzen in 5 Dateien behoben (AGENT_RAETSEL A1-A15→A1-A18, COWORK_ANLEITUNG A1-A15→A1-A18, VERTRAG_2-2a "5 Positionen"→"5-8", VERTRAG_2-2b A1-A15→A1-A18, VERTRAG_2-2c A5/A10/A12 + A16-A18 ergaenzt).
- **Geaenderte Dateien:** AGENT_RAETSEL.md, GUETEKRITERIEN_AUFGABEN.md, AUSFUEHRUNGSPLAN_INFRASTRUKTUR_REVISION.md, VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md, VERTRAG_PHASE_2-2b_AUFGABE.md, VERTRAG_PHASE_2-2c_CROSS.md, COWORK_PROJECT_ANLEITUNG.md, STATUS.md, CHANGELOG.md
- **Naechster Schritt:** Phase C: C1 Mappe-3-Daten-Patch (10 Patches), C2 Mappe-4-Validierung.

### Phase B1 Hefteintrag-Neukonstruktion: Test + Schema-Korrekturen + Transferfrage-Entfernung (Infrastruktur-Revision)
- **Phase:** Infrastruktur-Revision Phase B1 (DONE — Test abgeschlossen)
- **Zweck:** (1) Transferfrage aus Hefteintrag-Schema entfernen. (2) Schema auf v2-Konformitaet bringen (ordnungsmuster-Enum, verbindungen.typ, knoten.typ). (3) B1-Test unter Realbedingungen: Mappe-3-Hefteintrag nach revidiertem Vertrag regenerieren und gegen HE1-HE16 evaluieren.
- **Ergebnis:**
  - hefteintrag-schema.json: transfer-Objekt entfernt. ordnungsmuster-Enum auf 6 empirische Typen (parallel-kausal, sequenziell, kontrastierend, metaphorisch, relational, konzept-beispiel). verbindungen[].typ als Pflichtfeld (kausal/temporal/kontrast/schlussfolgerung). knoten[].typ um "beispiel" erweitert.
  - GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md: transfer-Block aus JSON-Template entfernt, Stilregel 4 + Changelog-Eintrag angepasst.
  - AUSFUEHRUNGSPLAN: B1 Step 4 (Transferfrage) als ERLEDIGT markiert (Entscheidung: entfernen).
  - hefteintrag_B1_TEST.json produziert: SCPL-Texte 7-11W (alt: 25-29W), ordnungsmuster "kontrastierend" (alt: "multiperspektivisch"), 6 Knoten + 5 typisierte Verbindungen, Encoding v3.3 (UTF-8 Umlaute + typographische Zeichen).
  - Schema-Validierung: PASS. 27/27 automatisierte Checks (Text-Dichte, Knoten, Verbindungen, Encoding, Transfer, Schaubild-Integritaet) PASS.
  - HE1-HE16 manuell: 10/10 hefteintrag-relevante Kriterien PASS. 4 Kriterien von FAIL auf PASS gedreht (HE4, HE12, HE14, HE15).
- **Geaenderte Dateien:** hefteintrag-schema.json, GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md, AUSFUEHRUNGSPLAN_INFRASTRUKTUR_REVISION.md, STATUS.md, CHANGELOG.md, hefteintrag_B1_TEST.json (neu)
- **Naechster Schritt:** B2 (AGENT_RAETSEL Typauswahl). Dann Phase C (Daten-Patch + Mappe 4).

### Phase B1 Hefteintrag-Neukonstruktion: Analyse + Guetekriterien + Vertrag (Infrastruktur-Revision)
- **Phase:** Infrastruktur-Revision Phase B1 (Analyse + Vertrag — DONE, Test offen)
- **Zweck:** Hefteintrag-Pipeline auf empirisch fundiertes Schaubild-Elaborierungs-Modell umstellen. Grundlage: 8 gerenderte Praxis-Tafelbilder (Excalidraw-Screenshots) + 4 Unterrichtsentwuerfe der Sequenz Erster Weltkrieg (GPG7).
- **Empirischer Befund:**
  - 6 Ordnungsmuster-Typen isoliert: parallel-kausal, sequenziell, kontrastierend, metaphorisch, relational, konzept-beispiel
  - Invariante Drei-Ebenen-Architektur: Stundenfrage → Erarbeitungszone → Merksatz (8/8 TBs)
  - Kein Prosa-Absatz in realen TBs. Knoten max 12 W., Kurzesaetze max 15 W., Merksatz max 20 W./Satz
  - Hefteintrag = Schaubild + gezielte Elaborierung (nicht Fliesstext-Ersatz)
  - Pfeile im Heft explizit erwuenscht. Merksatz darf elaborierter sein als TB-Kompaktform.
- **Ergebnis:**
  - GUETEKRITERIEN_HEFTEINTRAG_PRODUKT.md v2: HE14 (Schaubild-Charakter, MUSS), HE15 (Ordnungsmuster-Treue, SOLL), HE16 (Merksatz-Kalibrierung, SOLL). HE4 revidiert (strukturell-sprachliche Kohaerenz statt Prosa-Kohaerenz). HE12 revidiert (Drei-Ebenen-Architektur). Leitsatz §2.1 mit empirischem Befund.
  - GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md: G4 auf 6 Typen erweitert. Sek. 3.2 (Textdichte), 3.3 (Ordnungsmuster), 6 (Output-Format) revidiert. knoten[]/verbindungen[] von Legacy zu Pflichtfeldern hochgestuft. verbindungen[].typ als neues Feld.
  - VERTRAG_PHASE_2-0_RAHMEN.md: Dispatch-Schritte 1a (Schaubild-Integritaet) + 1b (Text-Dichte) eingefuegt. Q-Gate um HE14-HE16 Pre-Check erweitert.
  - AUSFUEHRUNGSPLAN_INFRASTRUKTUR_REVISION.md: B1 mit empirischem Befund + revidiertem Vorgehen aktualisiert.
- **Geaenderte Dateien:** GUETEKRITERIEN_HEFTEINTRAG_PRODUKT.md, GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md, VERTRAG_PHASE_2-0_RAHMEN.md, AUSFUEHRUNGSPLAN_INFRASTRUKTUR_REVISION.md, STATUS.md, CHANGELOG.md
- **Naechster Schritt:** B1 Test (Mappe-3-Hefteintrag regenerieren, HE1-HE16 pruefen). Dann B2 (AGENT_RAETSEL). Dann Phase C.

### Phase A: 7 Prompt/Vertrags-Patches (Infrastruktur-Revision)
- **Phase:** Infrastruktur-Revision Phase A (DONE)
- **Zweck:** 7 wiederkehrende Findings aus Mappe-3-Browser-Review durch gezielte Patches in 16 Dateien beheben.
- **Ergebnis:** A1 Encoding v3.3, A2 Quellenangaben-Trennregel, A3 Sprachregister R7, A4 Fragestamm-Kurzregel, A5 Tipp-2-Wortpool, A6 Freitext-Bewertungsdifferenzierung, A7 Q-Gate-Erweiterung (TYP-01, REG-01, HE-PROD, A2-KURZ). Grep-Verifizierung: 0 v3.2-Referenzen in aktiven Dokumenten.
- **Geaenderte Dateien:** 16 Dateien (7 SUB_MATERIAL_*.md, 5 SUB_AUFGABE_*.md, AGENT_RAETSEL.md, VERTRAG_PHASE_2-0_RAHMEN.md, VERTRAG_PHASE_2-1c_CROSS.md, Q-GATE-MECHANIK.md)
- **Naechster Schritt:** Phase B (Hefteintrag + AGENT_RAETSEL)

### Infrastruktur-Revision verankert (PM-Verankerung)
- **Phase:** C+ Post-Produktion (Schritt 9 DONE) + Infrastruktur-Revision-Planung
- **Zweck:** Empirische Ergebnisse aus User-Browser-Review Mappe 3 in PM-Dokumenten verankern. 11 Findings (2 BLOCKER, 7 wiederkehrend) erfordern systematische Infrastruktur-Revision vor Mappe 4.
- **Ergebnis:**
  - GRUNDSATZENTSCHEIDUNG_REBUILD_VS_ITERATE.md §10: Post-Mappe-3 Empirische Ergebnisse. Befundtabelle B1-B11. Abgleich mit Abbruchkriterien. Revidierte Entscheidung: C+ + Infrastruktur-Revision.
  - AUSFUEHRUNGSPLAN_INFRASTRUKTUR_REVISION.md (NEU): 3 Phasen — Phase A (7 Prompt/Vertrags-Patches, 4-6h), Phase B (2 Architektur-Revisionen: Hefteintrag + AGENT_RAETSEL, 6-10h), Phase C (Daten-Patch + Mappe-4-Validierung).
  - AUSFUEHRUNGSPLAN_C_PLUS.md Schritt 9 finalisiert (DONE).
  - STATUS.md aktualisiert.
- **Geaenderte Dateien:** GRUNDSATZENTSCHEIDUNG_REBUILD_VS_ITERATE.md, AUSFUEHRUNGSPLAN_C_PLUS.md, STATUS.md, CHANGELOG.md
- **Neue Dateien:** AUSFUEHRUNGSPLAN_INFRASTRUKTUR_REVISION.md
- **Naechster Schritt:** Infrastruktur-Revision Phase A ausfuehren (7 Patches in Vertraegen + Subagenten-Prompts)

### Mappe 3 Phase 3.3 + Phase 4 abgeschlossen
- **Phase:** C+ Phase IV — Produktion (Schritt 8, Phase 3.3 + 4)
- **Zweck:** mappe-3.html erstellen (Phase 3.3, war im Vertrag uebersprungen) + Browser-Validierung (Phase 4).
- **Ergebnis:**
  - Phase 3.3: mappe-3.html aus Template generiert. mappeId='mappe-3', Titel "Kriegsbegeisterung 1914", Nav "Mappe 3 von 4". 6/6 strukturelle Checks PASS.
  - Phase 4.1: Funktionstest 13/13 PASS (5 Materialien, 5 Aufgaben, Hefteintrag, Navigation, Loesungswort AUGUST).
  - Phase 4.2: WCAG-Audit 11/11 PASS, 2 Warnings (W1 Heading-Hierarchie, W2 Footer Touch-Target).
- **Geaenderte Dateien:** mappe-3.html (NEU), Q-GATE-LOG.md (Phase 4 Sektionen)

### User-Browser-Review Mappe 3 dokumentiert
- **Phase:** C+ Phase IV — Post-Produktion (Schritt 9, Phase 4.3)
- **Zweck:** 11 User-Findings aus manuellem Browser-Review verifizieren, root-causen, in Q-GATE-LOG einpflegen.
- **Ergebnis:** 11 Findings (B1-B11), alle gegen data.json verifiziert. Ursachen-Synthese: 7 wiederkehrende Infrastruktur-Maengel. Daten-Patch-Tabelle: 10 Patches. 2-Kategorien-Analyse (Patches vs. Architektur-Revision).
- **Geaenderte Dateien:** Q-GATE-LOG.md (Phase 4.3 Sektion)

### DISPATCH_SKRIPT Mappe 3 Phase 2 erstellt
- **Phase:** C+ Phase IV — Produktion + Auswertung (Schritt 8 Vorbereitung)
- **Zweck:** Steuerungsdokument fuer die verbleibende Mappe-3-Produktion (Phase 2.1c bis 2.2c). Ersetzt ad-hoc-Orchestrierung durch strukturierten Dispatch-Plan mit Fortschritts-Tracking.
- **Inhalt:** 8 Dispatches (D0-D7): D0 Material-Cross + Ueberleitungen + HE-Revision, D1 Progressionsplan, D2-D6 je 1 Aufgabe (isolierter Subagent + agent-teams Multi-Review P7), D7 Cross-Konsistenz.
- **Features:** Fortschritts-Tracker, 5 Session-Split-Punkte mit Uebergabe-Prompt-Template, Metriken-Gesamttabelle (Phase 2.1 Baseline), ASCII-Dependency-Graph.
- **Ablage:** docs/agents/artefakte/produktion/gpg-erster-weltkrieg-ursachen/mappe-3/DISPATCH_SKRIPT_MAPPE3_PHASE2.md
- **Geaenderte Dateien:** DISPATCH_SKRIPT_MAPPE3_PHASE2.md (neu), STATUS.md, CHANGELOG.md

### Tool-Integrations-Roadmap (entschieden)
- **Phase:** C+ Phase IV — Produktion + Auswertung (Infrastruktur-Entscheidung)
- **Zweck:** Installierte Plugins/Skills chirurgisch in den Produktionsworkflow integrieren. 115 Skills aus wshobson/agents gegen Projektbedarf evaluiert; 3 neue Pool-Eintraege, 3 konkrete Integrationspunkte.
- **Neue Pool-Eintraege:** P13 (WCAG-Audit, accessibility-compliance), P14 (E2E-Testing, Playwright), P15 (Prompt-Optimierung, llm-application-dev:prompt-optimize).
- **Integrationspunkte:**
  - Phase 2.2b: agent-teams:team-review (3 parallele Reviewer auf jede Aufgabe nach Q-Gate)
  - Phase 4: accessibility-compliance:wcag-audit-patterns (WCAG 2.2 AA auf mappe-3.html)
  - Nach Mappe 3: llm-application-dev:prompt-optimize (12 Subagenten-Prompts systematisch optimieren)
- **Prinzip:** Additiv, nicht substitutiv. Manueller Prozess bleibt Backbone.
- **Geaenderte Dateien:** POOL_PM_INFRASTRUKTUR_ENHANCEMENTS.md, AUSFUEHRUNGSPLAN_C_PLUS.md, STATUS.md, CHANGELOG.md

### C+ Schritt 8 Pipeline-Fazit konsolidiert (abgeschlossen)
- **Phase:** C+ Phase IV — Produktion + Auswertung (Schritt 8/9 Teilergebnis)
- **Zweck:** Konsolidierung aller Pipeline-Validierungsdaten aus Phase 2.1 in formales Prozesstest-Ergebnis.
- **Ergebnis:** PROZESSTEST_MAPPE3_ERGEBNIS.md mit 8 Sektionen:
  - Prozesstest-Metriken: 6 Dispatches, 1 Nachbesserung, 4/5 First-Pass-Rate
  - Q-Gate-Ergebnisse: 5/5 GESAMT-PASS, 3 WARNs (1x M8, 2x BQ-3), Q-Gate deterministisch
  - Decision-Tree-Abdeckung: 9/9 Steps exercised, alle konditionalen Pfade aktiviert
  - Fehlertypen-Vergleich: 6 Mappe-2-Fehlertypen eliminiert, 3 neue (0 systemisch, P2 gefixt)
  - Nacharbeit: ~17 min (vs. ~6h Mappe 2 = 95% Reduktion)
  - Entscheidung: C+ FORTSETZEN (Nacharbeit < 3h, keine systemischen Fehler)
- **AUSFUEHRUNGSPLAN aktualisiert:** Schritt 7 DONE, Schritt 8 Phase 2.1 DONE, Schritt 9 TEILWEISE.
- **Neue Dateien:** docs/projekt/PROZESSTEST_MAPPE3_ERGEBNIS.md
- **Geaenderte Dateien:** AUSFUEHRUNGSPLAN_C_PLUS.md, STATUS.md, CHANGELOG.md

---

## 2026-04-02

### Pipeline-Kette mat-3-3..3-5: Realistisch simulierte Dispatch-Kette (abgeschlossen)
- **Phase:** C+ Phase III — Validierung (Schritt 7, Pipeline-Kette)
- **Zweck:** Realgetreuer Pipeline-Test: 3 Materialien sequenziell als isolierte Subagent-Dispatches. Testet: (a) P2-Fix (Umlaute), (b) ersten QT-Dispatch, (c) ersten TB-Dispatch, (d) Read-Step 8 (Kernerkenntnisse bei sicherung), (e) wachsenden Sequenzkontext (VORAUSGESETZTES_WISSEN waechst, NOCH_NICHT_EINGEFUEHRT schrumpft).
- **mat-3-3 (BQ, Truppentransport per Bahn):**
  - Isolierter Subagent, SUB_MATERIAL_BILDQUELLE.md
  - UTF-8-Umlaute korrekt (P2-Fix bestaetigt)
  - Q-Gate GESAMT-PASS (0 FAIL, 1 WARN BQ-3: Konstruiertheit implizit, nicht explizit)
  - Bildunterschrift 3-Funktionen erfuellt. k3-1 + k3-4 abgedeckt.
- **mat-3-4 (QT, Drei Stimmen zum Kriegsausbruch):**
  - Erster Quellentext-Dispatch. 3 Originalzitate: Zweig (Begeisterung), SPD Bremen (Angst), Haase (Pflicht/Burgfrieden).
  - Dreischritt-Aufbereitung pro Zitat (Einleitung → Wortlaut → Nachweis).
  - Dispatcher-Korrektur: Zweig-Nachweis "Tagebucheintrag" → "Erinnerungen" (Memoiren, nicht Tagebuch).
  - Q-Gate GESAMT-PASS (0 FAIL, 0 WARN). Fuehrt k3-5 (Gegenstimmen) + k3-6 (Burgfrieden) erstmals ein.
- **mat-3-5 (TB, Zwei Welten — Kriegsfreiwilliger und Bauersfrau):**
  - Erster Tagebuch-Dispatch. 2 fiktive Eintraege: Freiwilliger (Berlin, Begeisterung) + Bauersfrau (Hannover, Angst).
  - Read-Step 8 AKTIV (sicherung → Kernerkenntnisse aus hefteintrag.json scpl.loesung[]).
  - Alle 3 Kernerkenntnisse transportiert: (1) Stadt/Land-Kontrast, (2) Gruende der Begeisterung, (3) truegerische Einheit.
  - Q-Gate GESAMT-PASS (0 FAIL, 0 WARN). TB-Q1..Q12 alle PASS.
- **Pipeline-Fazit:** 3/3 GESAMT-PASS. P2-Fix wirksam. Alle 3 Subagent-Typen (BQ, QT, TB) erfolgreich getestet. Decision-Tree (inkl. Read-Step 7 WARNUNG + Fallback, Read-Step 8 aktiv) funktioniert. Sequenzkontext korrekt propagiert. Didaktische Qualitaet der prozessgenerierten Produkte: hoch (differenzierte Perspektiven, emotionale Zugaenglichkeit, TB-Knoten-Abdeckung).
- **Mappe 3 Material-Bestand:** 5/5 komplett (mat-3-1 DT, mat-3-2 BQ, mat-3-3 BQ, mat-3-4 QT, mat-3-5 TB).
- **Offene Findings:** P1 (ARTEFAKT_INVENTAR Mappe 3), P3 (BQ-3 Prompt-Verstaerkung).
- **Neue Dateien:** materialien/mat-3-3.json, materialien/mat-3-4.json, materialien/mat-3-5.json
- **Geaenderte Dateien:** Q-GATE-LOG.md, STATUS.md, CHANGELOG.md

### Pipeline-Test mat-3-2: Isolierter Subagent-Dispatch (abgeschlossen)
- **Phase:** C+ Phase III — Validierung (Schritt 7, erweitert)
- **Zweck:** Realgetreuer Pipeline-Test. Dispatcher sammelt Inputs via Decision-Tree, formuliert Uebergabe-Prompt, spawnt isolierten Subagent (kein Projektzugriff), evaluiert Output.
- **Dispatch-Modus:** Agent-Tool (general-purpose), NUR Uebergabe-Prompt als Input. Subagent hat SUB_MATERIAL_BILDQUELLE-Regeln + gesammelte Variablen erhalten, sonst nichts.
- **Read-Step 7 WARNUNG:** ARTEFAKT_INVENTAR hat keine Mappe-3-Eintraege. Bilddaten aus INHALTSBASIS substituiert (Fallback-Regel: WARNUNG + weiter).
- **Subagent-Output:** Valides BQ-Material. Bildunterschrift mit allen 3 Funktionen (Identifikation, Kontextualisierung, Erschliessungsimpuls). TB-Knoten k3-1 abgedeckt. Sequenz-Kohaerenz eingehalten (k3-5/k3-6 nicht verwendet).
- **Q-Gate Erstbewertung: GESAMT-FAIL (1 FAIL):**
  - M2 FAIL: ASCII-Transliterationen (Bevoelkerung, Gefuehle, koennten) in SuS-sichtbarer bildunterschrift
  - BQ-3 WARN: Konstruiertheit des Fotos nicht explizit reflektiert
- **Nachbesserung Iteration 1:** M2-Feld korrigiert (UTF-8-Umlaute eingesetzt). Re-Evaluation: GESAMT-PASS (0 FAIL, 1 WARN).
- **3 Pipeline-Findings:**
  - P1: ARTEFAKT_INVENTAR Mappe 3 fehlt. Fuer Vollproduktion erstellen.
  - P2: SUB_MATERIAL_BILDQUELLE.md hat keine explizite Umlaut-Pflicht. FIX: Prompt ergaenzen.
  - P3: BQ-3 (Bild ≠ Wirklichkeit) wird vom isolierten Subagent nicht proaktiv reflektiert. FIX: Prompt BQ-3-Hinweis verstaerken.
- **Qualitaetsvergleich isoliert vs. monolithisch:** Uebergabe-Prompt hinreichend fuer valides Material. Subagent-Prompts haben Luecken (P2, P3), die im monolithischen Modus durch Gesamtkontext kompensiert werden. Pipeline-Modus deckt diese Luecken auf — das ist sein Zweck.
- **Neue Dateien:** materialien/mat-3-2.json
- **Geaenderte Dateien:** Q-GATE-LOG.md, STATUS.md, CHANGELOG.md

### C+ Schritt 7: Test-Dispatch mat-3-1 (abgeschlossen)
- **Phase:** C+ Phase III — Validierung (Schritt 7)
- **Zweck:** Empirische Validierung der C+ Phase-I-Fixes (Decision-Tree, Q-Gate-Mechanik, Output-Schemata) durch tatsaechliche Material-Produktion
- **Phase 2.0 Rahmen Mappe 3 produziert:**
  - hefteintrag.json: SCPL-Struktur mit 6 Knoten, 5 Verbindungen, ordnungsmuster "multiperspektivisch", 3 Loesung-Eintraege
  - einstieg.json: Narrativ + Problemstellung (C1b-Identitaet mit stundenfrage PASS)
  - sicherung.json: reflexionsimpuls + hefteintrag_verweis. zusammenfassung/ueberleitung als Placeholder "[REVISION IN 2.1c]". zitat: null (kein passendes Zitat fuer Mappe 3)
- **2 Schema-Fixes waehrend Produktion:**
  - hefteintrag-schema.json: ordnungsmuster enum um "multiperspektivisch" erweitert (valides GPG-Ordnungsmuster, fehlte in Enum)
  - rahmen-sicherung-schema.json: zitat-Feld von type:object zu oneOf[object, null] (erlaubt null wenn kein passendes Zitat vorhanden)
- **Decision-Tree Read-Steps 1-8 durchlaufen fuer mat-3-1:**
  - Step 1: MATERIAL_GERUEST → TYP=darstellungstext, TITEL, CHUNKS=§1-§2, TB_KNOTEN=[k3-1..k3-4], ARTEFAKT_REFS=[], DIDAKT_FN=einstieg
  - Step 1b: SEQUENZKONTEXT → Position 1/5, VORHERIGES=null, NAECHSTES=mat-3-2(BQ), gesperrte Begriffe: k3-5(Gegenstimmen), k3-6(Burgfrieden)
  - Steps 2-6: Alle gelesen (hefteintrag SCPL complication[0]+[1], SUB_MATERIAL_DT, SKRIPT §1-§2, INHALTSBASIS Mappe 3, einstieg)
  - Step 7: SKIP (ARTEFAKT_REFS leer — korrekt fuer DT)
  - Step 8: SKIP (DIDAKT_FN=einstieg — korrekt)
- **mat-3-1 produziert:**
  - 115 Woerter, 3 Absaetze, 15 Saetze (Durchschnitt 7.7 Woerter/Satz)
  - 4 Fachbegriffe: Kriegsbegeisterung/Augusterlebnis, Patriotismus, gesellschaftlicher Druck, Propaganda
  - TB-Knoten k3-1/k3-2/k3-3/k3-4 abgedeckt
  - Sequenz-Kohaerenz: k3-5/k3-6 korrekt nicht verwendet
  - JSON-Encoding: HTML-Entities fuer typographische Anfuehrungszeichen (&bdquo;/&ldquo;), Unicode-Escapes fuer Umlaute
- **Schema-Validierung:** material-output-schema.json PASS (0 Fehler)
- **Q-Gate GESAMT-PASS (0 FAIL, 1 WARN):**
  - 17 Kriterien geprueft (SCHEMA-01, MQ1, MQ2, M1-M5, C6/MQ6, M8, M10, DT-1 bis DT-6, SQ-1 bis SQ-4)
  - 1 WARN: M8 Quellenorientierung (Quellenangabe korrekt aber unspezifisch)
  - Q-GATE-LOG.md fuer Mappe 3 angelegt
- **Befund:** Decision-Tree funktioniert deterministisch. Q-Gate-Mechanik produziert strukturiertes Ergebnis. Output-Schema validiert korrekt. Keine Ambiguitaeten im Dispatch-Ablauf.
- **Neue Dateien:** mappe-3/rahmen/hefteintrag.json, einstieg.json, sicherung.json, mappe-3/materialien/mat-3-1.json, mappe-3/Q-GATE-LOG.md
- **Geaenderte Dateien:** hefteintrag-schema.json, rahmen-sicherung-schema.json, STATUS.md, CHANGELOG.md
- **Naechster Schritt:** C+ Schritt 8 (restliche Mappe-3-Materialien) oder Schritt 4/5 (Steuerungsschicht)

### C+ Schritt 3: Conditional-Read-Logik als Decision-Tree (abgeschlossen)
- **Phase:** C+ Phase I — Vertrags-Fixes (Schritt 3/3 — Phase I komplett)
- **Findings:** 2.1 (comprehensive-review) + Q1-Befund BLOCKIEREND (Conditional-Read-Logik ambig, Sequenzkontext-Interface fehlt)
- **VERTRAG_PHASE_2-1 komplett ueberarbeitet:**
  - Schnittstellen-Vertrag ersetzt durch Decision-Tree-Pseudocode (8 Read-Steps + 1b, je mit exakter Bedingung, Pfad, Feldern, Output-Variablen)
  - Jeder Read-Step: deterministische Bedingung (TRUE/FALSE), kein "ggf.", kein "bei Bedarf"
  - Fallback-Regeln: ABBRUCH (Steps 1-3), WARNUNG+weiter (Steps 4-7), unmoeglich (Step 8)
- **Read-Step 1b (NEU): Sequenzkontext-Interface:**
  - Quelle: MATERIAL_GERUEST (Material-Entwurf-Tabelle, ALLE Zeilen)
  - Ableitet: VORHERIGES, NAECHSTES, VORAUSGESETZTES_WISSEN, NOCH_NICHT_EINGEFUEHRT
  - Loest das BLOCKIERENDE Q1-Finding (Subagent verlangte Sequenzkontext, Vertrag spezifizierte keinen Read-Step)
- **SCPL-Zone-Mapping-Tabelle:**
  - Ableitungsregel: TB-Knoten.fachbegriff → scpl.{zone}.fachbegriff Match
  - Mappe-3-Beispiel: 6 Knoten → 3 Zonen (complication[0], complication[1], complication[2], problem)
  - Dispatcher erstellt Mapping einmalig pro Mappe vor erstem Material-Dispatch
- **SUB_MATERIAL_DARSTELLUNGSTEXT.md:** Sequenzkontext-Sektion referenziert jetzt Read-Step 1b statt generischen "SEQUENZPLAN_Mappe_N"
- **Dispatch-Ablauf aktualisiert:** Schritte 1-8+1b mit expliziten Variablen-Outputs. Subagent-Input-Liste dokumentiert.
- **Walkthrough-Verifikation (3 Testfaelle):**
  - mat-3-1 (DT, einstieg, Position 1): 6 aktive Reads, 2 uebersprungen. 0 Ambiguitaeten.
  - mat-3-2 (BQ, erarbeitung, Position 2): 7 aktive Reads, 1 uebersprungen. 0 Ambiguitaeten.
  - mat-3-5 (TB, sicherung, Position 5): 8 aktive Reads, 0 uebersprungen. 0 Ambiguitaeten.
- **Aenderungen:** VERTRAG_PHASE_2-1_MATERIAL.md (ueberarbeitet), SUB_MATERIAL_DARSTELLUNGSTEXT.md (aktualisiert), WALKTHROUGH_DECISION_TREE_Mappe3.md (neu), STATUS.md, CHANGELOG.md
- **Naechster Schritt:** C+ Phase II (Schritte 4+5) oder direkt Schritt 7 (Test-Dispatch)

### C+ Schritt 2: Q-Gate-Semantik formalisieren (abgeschlossen)
- **Phase:** C+ Phase I — Vertrags-Fixes (Schritt 2/3)
- **Finding:** 5.1 (comprehensive-review) — keine formale Definition wann PASS/FAIL
- **Q-GATE-MECHANIK.md erstellt (10 Sektionen):**
  - §2 Bewertungsstufen: PASS/WARN/FAIL mit Abgrenzungsregel
  - §3 Aggregationsregel: GESAMT-PASS (0 FAIL, max 2 WARN), GESAMT-WARN (0 FAIL, 3+ WARN), GESAMT-FAIL (1+ FAIL)
  - §4 Nachbesserungslogik: Max 1 automatische Iteration, danach User-Entscheidung
  - §5 Kriterien-Klassen: SCHEMA, KONSISTENZ, INHALT, DIDAKTIK, FORM
  - §6 Strukturiertes JSON-Output-Format (artefakt_id, gesamt, kriterien[], nachbesserung, finding)
  - §7 Q-Gate-Kataloge: 6 Kataloge fuer alle Phasen (Material, Aufgaben, Rahmen, Cross, Progressionsplan, Cross-Aufgaben). Jedes Kriterium mit ID, Klasse, operationalisierter Stufe-Semantik (FAIL-Bedingung hart definiert)
  - §8 Q-Gate-Log-Format (Markdown-Template fuer Q-GATE-LOG.md)
  - §9 Determinismus-Garantie
- **6 Vertraege aktualisiert:** VERTRAG_PHASE_2-0 (§7.3 Referenz), VERTRAG_PHASE_2-1 (§7.1 + Dispatch-Schritte 11-14), VERTRAG_PHASE_2-1c (§7.4), VERTRAG_PHASE_2-2b (§7.2 + Dispatch-Schritte 6-9), VERTRAG_PHASE_2-2c (§7.6)
- **Trockenlauf:** mat-2-1 + mat-2-4 durch formalisiertes Q-Gate. Ergebnis: Schema-FAIL (bekanntes Legacy-Format), Inhalts-Kriterien alle PASS. 1 WARN (M8: interner Artefakt-Name in cite). Konsistent mit bestehendem Q-GATE-LOG. Determinismus verifiziert.
- **Aenderungen:** Q-GATE-MECHANIK.md (neu), TROCKENLAUF_Q-GATE_mat-2-1_mat-2-4.md (neu), 5 Vertraege (aktualisiert), STATUS.md, CHANGELOG.md
- **Naechster Schritt:** C+ Schritt 3 (Conditional-Read-Logik als Decision-Tree)

### C+ Schritt 1: Output-JSON-Schema formal definieren (abgeschlossen)
- **Phase:** C+ Phase I — Vertrags-Fixes (Schritt 1/3)
- **Finding:** 1.1 (comprehensive-review) — kein formales Schema fuer Produktions-Artefakte
- **5 JSON-Schemata erstellt (draft-07):**
  - `material-output-schema.json`: 7 Material-Typen, typ-spezifische Constraints (allOf/if-then), Verantwortlichkeits-Trennung Content vs. Struktur
  - `hefteintrag-schema.json`: SCPL-Didaktikmodell, TB-Knoten, Verbindungen, STRUKTUR-FREEZE/FORMULIERUNGS-OFFEN Markierungen
  - `rahmen-einstieg-schema.json`: narrativ (HTML) + problemstellung (C1b-Identitaetsregel)
  - `rahmen-sicherung-schema.json`: reflexionsimpuls, hefteintrag_verweis, Placeholder-Pattern (Phase 2.0→2.1c), Q-M2-09 Disjunktionsregel
  - `ueberleitungen-schema.json`: Zwei-Vektoren-Bruecke (Achse 5), minLength/maxLength Constraints
- **Validierung:** Mappe 1 mat-*.json 9/9 PASS, Mappe 2 0/6 (bekanntes Legacy-Format). Hefteintrag/Einstieg/Sicherung: Mappe 1+2 PASS.
- **3 Vertraege aktualisiert:** VERTRAG_PHASE_2-0 (Schema-Referenzen im Output), VERTRAG_PHASE_2-1 (Schema-Spalte in Read-Steps, neuer Schritt 10 Schema-Validierung, Merge-Logik Subagent+Dispatcher), VERTRAG_PHASE_2-1c (Schema-Spalte, ueberleitungen-schema Referenz)
- **7 SUB_MATERIAL-Prompts aktualisiert:** Content-only Output (inhalt, quelle, _meta). Struktur-Felder explizit als Dispatcher-Verantwortung dokumentiert. SUB_MATERIAL_KARTE + SUB_MATERIAL_STATISTIK: fehlende Output-Sektionen ergaenzt.
- **Aenderungen:** 5 Schema-Dateien (neu), 3 Vertraege, 7 SUB_MATERIAL_*.md, STATUS.md, CHANGELOG.md
- **Naechster Schritt:** C+ Schritt 2 (Q-Gate-Semantik formalisieren)

### PM-Session 3: Grundsatzentscheidung + Q1 Test-Dispatch
- **Phase:** PM-Infrastruktur (Architektur-Entscheidung)
- **Ausloeser:** Nach Plugin-Evaluation: Soll Produkt-Infrastruktur sauber neu aufgesetzt (Option A) oder iterativ verbessert (Option C+) werden?
- **GRUNDSATZENTSCHEIDUNG_REBUILD_VS_ITERATE.md erstellt:** 3 Optionen (A/B/C+), Bestandsaufnahme, Bewertungskriterien, Q1-Q6 Qualifizierungsfragen.
- **User-Inputs integriert:** Q3 (~6h Nacharbeit Mappe 2), Q4 (PM methoden-agnostisch, Produkt Game-spezifisch), Q5 (Mappe 3 = Prozesstest fuer Produktisierung), Q6 (Subagenten ausreichend fuer Mappe 3). Bewertungskriterien revidiert (Lern-Rendite 10%→20%, Produktionsfortschritt 30%→20%).
- **Q1 Test-Dispatch mat-3-1:** Subagent fuehrte 8 Read-Steps aus VERTRAG_PHASE_2-1 aus. Befund: 2 blockierende Findings (Conditional-Read-Logik, Sequenzkontext-Interface), 1 teilweise blockierend (Q-Gate-Semantik). Subagent konnte mat-3-1 NICHT korrekt produzieren. Alle Findings durch C+-Schritte adressierbar.
- **Entscheidung: Option C+ (Hybrid mit Architektur-Bewusstsein).** Vertrags-Fixes (Schema, Decision-Tree, Q-Gate-Formalisierung) + Skill-Split mit Trennung Game-spezifisch vs. methoden-agnostisch, dann Mappe 3 als Prozesstest. Option B verworfen (bekannte Fehler wiederholen ≠ valider Prozesstest).
- **COWORK_PROJECT_ANLEITUNG.md umfassend aktualisiert:** GRUNDSATZENTSCHEIDUNG als 4. Pflichtlektuere, verfuegbare Plugin-Infrastruktur, strategischer Kontext, EVALUATE-Modus.
- **Aenderungen:** GRUNDSATZENTSCHEIDUNG_REBUILD_VS_ITERATE.md (neu, ~290 Zeilen), COWORK_PROJECT_ANLEITUNG.md (erweitert), POOL_PM_INFRASTRUKTUR_ENHANCEMENTS.md (Blocker-Wording korrigiert), STATUS.md, CHANGELOG.md
- **Naechster Schritt:** C+ Schritt 1 (Output-JSON-Schema formal definieren), dann Schritte 2-9.

### PM-Session 1+2: Plugin-Architektur-Evaluation + Plattform-Verifikation
- **Phase:** PM-Infrastruktur (Tooling-Evaluation)
- **Ausloeser:** Erste PM-Sessions im Cowork-Project. Statt sofortiger Architektur-Entscheidungen (E1-E5 DEFERRED) wurde PM-Infrastruktur-Verbesserung priorisiert.
- **Marketplace-Analyse:** wshobson/agents (71 Plugins, 112 Agents, 129 Skills) gegen Projektbedarf evaluiert. 12 Patterns identifiziert (P1-P12), Architektur auf Escape-Game-Pipeline gemappt.
- **7 Plugins installiert:** agent-teams, agent-orchestration, conductor, comprehensive-review, plugin-eval, documentation-generation, full-stack-orchestration.
- **4/4 Plattform-Unbekannte geklaert:** (1) CC-Plugins in Cowork: VERIFIZIERT, (2) Subagent-Dateisystem-Zugriff: VERIFIZIERT (mat-2-1.json per Pfad gelesen), (3) Model-Tiering: VERIFIZIERT (Haiku-Agent gestartet), (4) Slash-Commands: VERIFIZIERT.
- **3 Plugin-Funktionstests gegen Projekt-Artefakte:**
  - agent-teams: 3 parallele Reviewer auf mat-2-1.json (Fachdidaktik, Engine-Kompatibilitaet, Sprachqualitaet). Strukturierte Befunde, Cross-Validierung.
  - plugin-eval: Monolithischer Skill Score 3.61/5.0. Anti-Patterns: OVER_CONSTRAINED, 8 gebundelte Verantwortlichkeiten. Refactoring-Empfehlungen: Dispatcher+Referenz aufteilen, Output-Beispiele, Constraints abstufen.
  - comprehensive-review: VERTRAG_PHASE_2-1 — 14 Findings (3 HIGH, 8 MEDIUM, 3 LOW). Spezifikationsreife 60/100. Spezifikationsluecken, nicht blockierend fuer manuellen Betrieb, relevant vor automatisiertem Subagent-Deployment.
  - conductor: Projekt hat 70-80% Conductor-Struktur organisch. Selektive Adoption empfohlen, Volladoption = Overhead.
- **Git-Sandbox-Grenzen dokumentiert:** git status/diff funktioniert, git add/commit/push erfordert User. COWORK_PROJECT_ANLEITUNG.md korrigiert.
- **Aenderungen:** POOL_PM_INFRASTRUKTUR_ENHANCEMENTS.md (neu, ~450 Zeilen), COWORK_PROJECT_ANLEITUNG.md (Git-Sektion korrigiert), STATUS.md, CHANGELOG.md
- **Naechster Schritt:** Entscheidung Produkt-Update vs. PM-Infrastruktur-Ausbau. E1-E5 weiterhin DEFERRED.

### PM-Infrastruktur: Cowork-Project Einrichtung + Uebergabe-Prompt
- **Phase:** PM-Infrastruktur (Ebenen-Trennung PM vs. Produkt)
- **Aufgabe:** Cowork-Project fuer Projektmanagement eingerichtet. Anweisungs-Prompt repo-versioniert statt direkt im Anweisungsfeld (Updatebarkeit). Uebergabe-Prompt fuer erste PM-Session erstellt.
- **Ebenen-Trennung:** PM-Project (Koordination, Tracking, Audits) vs. Produktions-Sessions (ORCHESTRATOR steuert Game-Erstellung) vs. Claude Code (Assembly, Engine). PM-Instanz verwaltet Produkt-Dokumente, fuehrt aber keine Produktionslogik aus.
- **Aenderungen:** docs/projekt/COWORK_PROJECT_ANLEITUNG.md (neu), docs/projekt/UEBERGABE_COWORK_PROJECT_EINRICHTUNG.md (neu), STATUS.md, CHANGELOG.md
- **Naechster Schritt:** Erste Session im Cowork-Project mit UEBERGABE_COWORK_PROJECT_EINRICHTUNG.md starten.

### UPGRADE_PLAN_v5: Plugin-Architektur fuer Game-Erstellungs-Infrastruktur
- **Phase:** Architektur-Evaluation (Steuerungsschicht)
- **Ausloeser:** Realgetreuer Produktionstest Mappe 3 offenbarte Luecke — ORCHESTRATOR.md ist Dokumentation, keine Runtime-Instanz. Produktionssessions benoetigen Kickoff-Prompts mit Extrakontext.
- **Evaluation:** Plugin/Skill-Architektur analysiert. Harte Grenzen: kein erzwungenes Sequencing, kein Subagenten-Nesting, keine Transaktionssemantik. Weiche Grenzen mitigierbar via Convention-over-Configuration (STATUS.md als State-Machine, Fail-Safe bei Q-Gate-FAIL).
- **Zielarchitektur:** escape-game-creator Plugin mit 9 Skills: 1 Dispatcher (liest STATUS.md, identifiziert naechste Phase, delegiert) + 7 Phasen-Skills (je 1 pro Vertrag) + 1 Session-Split-Skill.
- **5 offene Architektur-Entscheidungen:** E1 (Trigger-Modus), E2 (Subagenten fuer Dispatches), E3 (Vertrag-zu-Skill manuell/generiert), E4 (Koexistenz mit monolithischem Skill), E5 (STATUS.md YAML-Frontmatter).
- **Roadmap:** Phase A (PoC: Dispatcher + Rahmen-Skill) → Phase B (alle Phasen-Skills) → Phase C (Plugin-Packaging) → Phase D (Phase-0/1-Integration).
- **Aenderungen:** docs/architektur/UPGRADE_PLAN_v5_PLUGIN_ARCHITEKTUR.md (neu), STATUS.md, CHANGELOG.md
- **Naechster Schritt:** User-Validierung E1-E5. Dann: Phase A oder zuerst Mappe 3 mit bestehender Architektur.

### Mappe 3 Produktionsvorbereitung (Phase 0 + Phase 1 + Kickoff)
- **Phase:** Produktionsvorbereitung (vor Phase 2)
- **TAFELBILD_Mappe3.md erstellt:** 6 Knoten (k3-1 bis k3-6), 5 Verbindungen, SCPL mit multiperspektivischem Ordnungsmuster, Stundenfrage "Waren die Menschen 1914 wirklich begeistert vom Krieg?", 3 Kernerkenntnisse, Q-Gate G1-G14 PASS.
- **MATERIAL_GERUEST_Mappe3.md erstellt:** 5 Materialien (1 DT, 2 BQ, 1 QT, 1 TB), Erarbeitbarkeitsnachweis 6/6 Knoten + 5/5 Verbindungen, Zielklarheit-Pruefung, Einstieg + Sicherung + Ueberleitungs-Intentionen.
- **Produktionsverzeichnis angelegt:** docs/agents/artefakte/produktion/gpg-erster-weltkrieg-ursachen/mappe-3/ (rahmen/, materialien/, aufgaben/)
- **UEBERGABE_COWORK_MAPPE3_PRODUKTION.md erstellt:** Kickoff-Prompt fuer frische Cowork-Session. Enthaelt Read-Reihenfolge, Phasen-Sequenz (3 Sessions), Vertrags-/Qualitaetskriterien-/Subagenten-Verzeichnis, M8-Hinweise.
- **Aenderungen:** TAFELBILD_Mappe3.md (neu), MATERIAL_GERUEST_Mappe3.md (neu), mappe-3/ Verzeichnis (neu), UEBERGABE_COWORK_MAPPE3_PRODUKTION.md (neu), STATUS.md, CHANGELOG.md

### Audit v4.2 Produktionskohaerenz: Briefing + Report + Implementierung
- **Phase:** Pre-Produktion Audit (vor Mappe 3)
- **Audit-Briefing:** 22 Pflichtlektuere-Dateien, 9 Prueffragen (PF-1 bis PF-9).
- **Audit-Ergebnis:** 6 KONFORM, 1 UNKRITISCH, 2 ABWEICHUNG produktionsrelevant (PF-1, PF-5), 1 ABWEICHUNG LOW (PF-2 _meta-Feldname, zurueckgestellt).
- **PF-1 implementiert (KRITISCH):** VERTRAG_PHASE_2-0 — alle 7 kernerkenntnisse[]-Instruktionen bereinigt. M3b-Constraint umformuliert. Dispatch-Schritte neu nummeriert. Zusaetzlich: WORKFLOW_v4 (8 Stellen), UPGRADE_PLAN_v4 (5 Stellen), VERTRAG_PHASE_2-1 (2 Stellen), VERTRAG_PHASE_2-1c (3 Stellen), AGENT_MATERIAL (1 Stelle), ORCHESTRATOR Flowchart (1 Stelle) bereinigt.
- **PF-5 implementiert (HOCH):** ORCHESTRATOR data.json-Schema — `tafelbild` → `hefteintrag`, `kernerkenntnisse[]` entfernt.
- **PF-6 implementiert (Housekeeping):** UPGRADE_PLAN_v4 Runde-4-Checkbox GUETEKRITERIEN_HEFTEINTRAG_PRODUKT.md abgehakt.
- **Aenderungen:** VERTRAG_PHASE_2-0_RAHMEN.md, VERTRAG_PHASE_2-1_MATERIAL.md, VERTRAG_PHASE_2-1c_CROSS.md, WORKFLOW_v4.md, UPGRADE_PLAN_v4.md, ORCHESTRATOR.md, AGENT_MATERIAL.md, docs/analyse/AUDIT_BRIEFING_v4-2_PRODUKTIONSKOHAERENZ.md (neu), STATUS.md, CHANGELOG.md

### M6+M7+M8: Infrastruktur-Finalisierung (Dateistruktur + Begriffe + Engine)
- **Phase:** Architektur-Optimierung (Audit Sicherungskette — Prioritaet 2+3, vollstaendig)
- **M6 — sicherung.json Aufspaltung:** kernerkenntnisse-Feld entfernt (Dopplung mit scpl.loesung). hefteintrag_verweis-Text aktualisiert ("Tafelbild" → "Hefteintrag"). Produktions-Artefakt rahmen/tafelbild.json → rahmen/hefteintrag.json umbenannt. sicherung.json enthält nur noch: zusammenfassung, ueberleitung, reflexionsimpuls, hefteintrag_verweis, zitat.
- **M7 — Begriffe "Tafelbild" → "Hefteintrag":** Durchgaengige Umbenennung. AGENT_TAFELBILD.md → AGENT_HEFTEINTRAG.md. GUETEKRITERIEN_TAFELBILD.md → GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md (G1-G14, Entwurfsqualitaet). GUETEKRITERIEN_HEFTEINTRAG.md → GUETEKRITERIEN_HEFTEINTRAG_PRODUKT.md (HE1-HE13, Produktqualitaet). ~15 aktive Architekturdateien aktualisiert (WORKFLOW_v4, UPGRADE_PLAN_v4, alle Vertraege, ORCHESTRATOR, AGENT_MATERIAL, AGENT_SKRIPT, AGENT_RAETSEL, Checklisten). Historische Dokumente (analyse/, uebergabe/) bewusst unveraendert.
- **M8 — Kernerkenntnisse-Dopplung eliminiert:** Engine liest kernerkenntnisse primaer aus sicherung.hefteintrag.scpl.loesung[] (statt sicherung.kernerkenntnisse[]). Fallback-Kette fuer Legacy-Daten erhalten.
- **Engine-Patch:** escape-engine.js — alle sicherung.tafelbild-Referenzen → sicherung.hefteintrag. Sticky-Header (U5) aktualisiert.
- **Live-Daten-Migration:** data.json (Mappe 1+2) + template/data.json. Mappe-1 scpl.loesung von 1 Item auf 3 Items migriert (M3b-Konformitaet).
- **Aenderungen:** escape-engine.js, data.json (live + template), AGENT_HEFTEINTRAG.md (umbenannt + Inhalt), AGENT_MATERIAL.md, AGENT_SKRIPT.md, AGENT_RAETSEL.md, ORCHESTRATOR.md, WORKFLOW_v4.md, UPGRADE_PLAN_v4.md, UPGRADE_PLAN_v3.md, alle 5 Vertraege, GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md (umbenannt + Inhalt), GUETEKRITERIEN_HEFTEINTRAG_PRODUKT.md (umbenannt), GUETEKRITERIEN_SEQUENZIERUNG.md, GUETEKRITERIEN_AUFGABEN.md, QUALITAETSKRITERIEN_MATERIALPRODUKTION.md, EVALUATION_SCPL_HEFTEINTRAG.md, DESIGNENTSCHEIDUNG_v3-1_HEFTEINTRAG.md, STATUS.md, CHANGELOG.md, rahmen/sicherung.json (Produktion), rahmen/hefteintrag.json (umbenannt)

### M6/M9: GUETEKRITERIEN_HEFTEINTRAG_PRODUKT.md (HE1-HE13)
- **Phase:** Architektur-Optimierung (Audit Sicherungskette — Prioritaet 2)
- **Aufgabe:** Produktqualitaet-Kriterien fuer den fertigen Hefteintrag nach Phase 2.1c Achse-6-Revision.
- **Dokument:** docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG.md (neu). 13 Kriterien in 4 Sektionen: SCPL-Text-Qualitaet (HE1-HE4), zusammenfassung (HE5-HE7), ueberleitung (HE8-HE10), Lernprodukt-Qualitaet (HE11-HE13). 7 MUSS, 6 SOLL. Q-Gate-Protokoll-Template enthalten.
- **Abgrenzung:** GUETEKRITERIEN_TAFELBILD.md (G1-G14) = Entwurfsqualitaet (Phase 0.4). Dieses Dokument = Produktqualitaet (Phase 2.1c+). Keine Redundanz.
- **Execution-Order:** Stufe-2 Re-Evaluation (G3/G5/G10/G12/G14) → dann HE1-HE13 auf revidiertem Text.
- **Querverweise:** AGENT_TAFELBILD.md Kanonische Referenzen, VERTRAG_PHASE_2-1c_CROSS.md Achse 6.
- **Aenderungen:** GUETEKRITERIEN_HEFTEINTRAG.md (neu), AGENT_TAFELBILD.md, VERTRAG_PHASE_2-1c_CROSS.md, STATUS.md, CHANGELOG.md

### Kategorie A: Infrastruktur-Optimierung (WORKFLOW_v4 + MQ6 + Skill)
- **Phase:** Architektur-Optimierung (Infrastruktur-Haertung vor Mappe 3)
- **Aufgabe:** WORKFLOW_v4.md kanonisch synchronisiert, M5 implementiert, Skill-Update vorbereitet.
- **WORKFLOW_v4.md:** 13 gezielte Edits. TB-FREEZE → STRUKTUR-FREEZE/FORMULIERUNGS-OFFEN. Phase 2.1c von "4 Pruefachsen" auf "6 Achsen" aktualisiert (Phasenstruktur + Detailsektion). zusammenfassung-Placeholder in Artefakt-Verzeichnisstruktur + Phase 2.0. SCPL-Schritt in Phase 2.1 Read-Schritt 2.
- **M5 — MQ6 Erarbeitbarkeits-Plausibilitaet:** C6 in QUALITAETSKRITERIEN_MATERIALPRODUKTION.md (Section 7 Content-Constraints). SOLL-Kriterium: Material muss SCPL-Schritt erarbeitbar machen, nicht nur formal abdecken. Status v2 → v2.1.
- **Skill-Update:** Aktualisierte SKILL.md als docs/projekt/SKILL_UPDATE_projekt-website-v4.md generiert (Skills-Mount ist read-only). Enthaelt: Zwei-Stufen-Architektur, 6 Achsen, MQ6, zusammenfassung-Placeholder, SCPL-Schritt als Material-Input, STRUKTUR-FREEZE/FORMULIERUNGS-OFFEN im Session-Split.
- **Verifikation:** 6/6 Konsistenz-Checks PASS (TB-FREEZE-Cleanup, 6-Achsen-Konsistenz, MQ6-Verankerung, Placeholder, SCPL-Input, Skill-Vollstaendigkeit).
- **Aenderungen:** WORKFLOW_v4.md, QUALITAETSKRITERIEN_MATERIALPRODUKTION.md, STATUS.md, CHANGELOG.md, docs/projekt/SKILL_UPDATE_projekt-website-v4.md (neu)
- **Naechster Schritt:** Skill-Update manuell einspielen. Dann M6-M9 oder Mappe 3.

### Implementierung M1-M4 + M1b: Zwei-Stufen-Architektur Sicherungskette
- **Phase:** Architektur-Implementierung (Audit Sicherungskette — Prioritaet 1)
- **Aufgabe:** 5 Massnahmen aus AUDIT_SICHERUNGSKETTE_ERGEBNIS.md implementiert. Loest SP-3 (Timing-Inversion), SP-4 (FREEZE zu restriktiv), SP-6 (Steuerungsrichtung).
- **M1 — Differenzierter FREEZE:** TB-FREEZE ersetzt durch STRUKTUR-FREEZE (Zonen, KE, Fachbegriffe, Ordnungsmuster, Stundenfrage — ab Phase 0.4) + FORMULIERUNGS-OFFEN (SCPL-Texte — bis Phase 2.1c Achse 6). Aktualisiert in: AGENT_TAFELBILD.md (Sektion 8), ORCHESTRATOR.md, AGENT_MATERIAL.md, VERTRAG_PHASE_2-0, UPGRADE_PLAN.
- **M1b — GUETEKRITERIEN Stufe-2:** GUETEKRITERIEN_TAFELBILD.md um Sektion 10 erweitert. G3, G5, G10, G12, G14 werden in Phase 2.1c gegen produzierte Materialien re-evaluiert (nicht nur gegen Plan).
- **M2 — Achse 6 Hefteintrag-Revision:** VERTRAG_PHASE_2-1c_CROSS.md erweitert (jetzt 6 Achsen). Regelwerk erlaubt/verboten (PF-8). zusammenfassung + ueberleitung erstmalig produziert. Stufe-2 Re-Evaluation integriert. Aenderungs-Dokumentationspflicht.
- **M3 — zusammenfassung/ueberleitung Placeholder:** VERTRAG_PHASE_2-0_RAHMEN.md — zusammenfassung und ueberleitung werden in Phase 2.0 als "[REVISION IN 2.1c]" gesetzt, nicht mehr inhaltlich produziert.
- **M4 — SCPL-Schritt als Material-Input:** VERTRAG_PHASE_2-1_MATERIAL.md Read-Schritt 2 erweitert: neben knoten[] auch zugehoeriger scpl{}-Schritt (situation/complication[i]/problem) als Input.
- **Aenderungen:** AGENT_TAFELBILD.md, AGENT_MATERIAL.md, ORCHESTRATOR.md, VERTRAG_PHASE_2-0_RAHMEN.md, VERTRAG_PHASE_2-1_MATERIAL.md, VERTRAG_PHASE_2-1c_CROSS.md, GUETEKRITERIEN_TAFELBILD.md, UPGRADE_PLAN_v4, STATUS.md, CHANGELOG.md
- **Naechster Schritt:** M5-M9 (Prioritaet 2/3) bei Bedarf.

### Audit-Ergebnis: Sicherungskette (Tafelbild/Hefteintrag/Sicherung)
- **Phase:** Architektur-Audit (Sicherungskette)
- **Aufgabe:** Externes Audit gemaess AUDIT_BRIEFING_SICHERUNGSKETTE.md. 13 Pflichtlektuere-Dateien eingelesen. 16 Prueffragen (PF-1 bis PF-16) evaluiert.
- **Kernbefund:** Timing-Inversion (SP-3) ist das kritische Problem — Hefteintrag-Formulierungen werden vor Materialien finalisiert. Loesung: Zwei-Stufen-Architektur mit differenziertem FREEZE.
- **Empfohlene Architektur:**
  - Stufe 1 (Phase 0.4): SCPL-Struktur + Kernerkenntnisse → STRUKTUR-FREEZE
  - Stufe 2 (Phase 2.1c Achse 6): Sprachliche Revision der SCPL-Texte + zusammenfassung/ueberleitung → FORMULIERUNGS-OFFEN
  - Erfuellt alle 5 Anforderungen: Backward Design, Material-Awareness, Struktur-Schutz, Minimale Dispatches, Azyklizitaet
- **9 priorisierte Massnahmen:** M1-M4 sofort (differenzierter FREEZE, Achse 6, zusammenfassung-Timing, SCPL-Schritt als Material-Input), M5-M7 kurzfristig, M8-M9 langfristig
- **SP-Bewertung:** SP-3 KRITISCH, SP-4 KRITISCH, SP-6 HOCH, SP-1 MITTEL, SP-2 MITTEL, SP-5 NIEDRIG
- **Artefakte:** `docs/analyse/AUDIT_SICHERUNGSKETTE_ERGEBNIS.md` (neu)
- **Naechster Schritt:** Findings evaluieren (User-Entscheidung). Bei Akzeptanz: M1-M4 implementieren (Vertraege + AGENT_TAFELBILD aktualisieren).

### Audit-Briefing: Sicherungskette (Tafelbild/Hefteintrag/Sicherung)
- **Phase:** Architektur-Audit (Runde 5 Vorbereitung)
- **Aufgabe:** Bestandsaufnahme der gesamten Tafelbild/Hefteintrag/Sicherung-Prozesskette. Strukturprobleme identifizieren. Audit-Briefing fuer externen Auditor erstellen.
- **Ergebnis:**
  - 6 Strukturprobleme identifiziert: SP-1 Begriffsvermischung TB/HE, SP-2 Sicherung als Sammel-Artefakt, SP-3 Timing-Inversion bei HE-Formulierung, SP-4 TB-FREEZE blockiert sprachliche Revision, SP-5 Doppelte Kernerkenntnisse-Speicherung, SP-6 Steuerungsrichtung unklar
  - 16 Prueffragen in 5 Kategorien (Idealstruktur, Begriffstrennung, Timing, Steuerungswirkung, Gesamtarchitektur)
  - Didaktische Idealstruktur des Auftraggebers als Referenzmodell dokumentiert
- **Artefakte:** `docs/analyse/AUDIT_BRIEFING_SICHERUNGSKETTE.md` (neu)
- **Naechster Schritt:** Externen Audit einholen. Findings evaluieren.

### Q-M2-03: Ueberleitung-Produktion in Phase 2.1c verankert
- **Phase:** Architektur-Entscheidung (Q-M2-03)
- **Aufgabe:** Ueberleitungen zwischen Materialien architektonisch verankern. Bisher: `ueberleitung_von` enthielt nur Material-ID, Engine renderte "mat-2-1" statt narrativem Text.
- **Entscheidung:** Phase 2.1c (bisher nur Cross-Konsistenz-Pruefung) wird um Achse 5 erweitert: Ueberleitung-Produktion. 2.1c hat bereits alle Materialien + MATERIAL_GERUEST im Kontext — natuerlicher Ort fuer material-uebergreifende Textproduktion.
- **Didaktisches Modell:** Zwei-Vektoren-Bruecke — jede Ueberleitung referenziert rueckwaerts (Lernstand aus Vorgaenger) und vorwaerts (Relevanz des naechsten Materials). 5 Qualitaetskriterien (UE-1 bis UE-5).
- **Aenderungen:**
  - VERTRAG_PHASE_2-1c_CROSS.md: Achse 5, Read-Schritt 4 (einstieg.json), Output `ueberleitungen.json`, Qualitaetskriterien UE-1 bis UE-5
  - AGENT_MATERIAL.md: Ueberleitungen im GERUEST als Intentionsskizzen markiert, 2.1c als finaler Produzent referenziert
  - ORCHESTRATOR.md: Uebergabe-Template erweitert (Ueberleitung-Patching als Assembly-Schritt 2, Pre-Flight + Verifikation)
  - QUALITAETSBEFUNDE: Massnahme 11 als ERLEDIGT markiert, Massnahme 14 (Engine-Fallback) praezisiert
- **Artefakte:** VERTRAG_PHASE_2-1c_CROSS.md, AGENT_MATERIAL.md, ORCHESTRATOR.md, QUALITAETSBEFUNDE (geaendert)
- **Naechster Schritt:** Engine-Fallback (ID-Pattern → nichts rendern) als Defensiv-Patch bei naechster Claude-Code-Uebergabe mitgeben

### OPT-1/4/5/6/7/8: Uebergabe-Template + Wortlimit-Fix
- **Phase:** Prozess-Optimierung (OPT-1/4/5/6/7/8 konsolidiert)
- **Aufgabe:** Verbleibende 6 OPTs aus RUNDE_3b_ERGEBNIS.md umsetzen.
- **Aenderungen:**
  - OPT-1: UEBERGABE-TEMPLATE in ORCHESTRATOR.md — ersetzt WORKFLOW_v4-Read am Phase-2-Abschluss (~6800 Token Einsparung). Enthaelt Output 1 (Uebergabe-Prompt) und Output 2 (Git-Commit-Befehle).
  - OPT-4: cd-Anweisung als erste Zeile im Pre-Flight des UEBERGABE-TEMPLATE.
  - OPT-5: Git-Commit-Befehle als standardisierter Output-2-Block.
  - OPT-6: DT-5 Wortlimit in QUALITAETSKRITERIEN_MATERIALPRODUKTION.md korrigiert (200-300 → ≤150 Woerter, autoritativ: SUB_MATERIAL_DT Q1).
  - OPT-7: Strukturierte Pre-Flight-Checkliste im UEBERGABE-TEMPLATE (Revert, Pull, data.json-Read, Verzeichnis-Pruefung).
  - OPT-8: Session-Split-Template mit Inline-Phase-2.2-Dispatch-Sequenz — eliminiert erneutes ORCHESTRATOR-Lesen bei Fortsetzungs-Sessions.
- **Artefakte:** ORCHESTRATOR.md (geaendert), QUALITAETSKRITERIEN_MATERIALPRODUKTION.md (geaendert), UPGRADE_PLAN (aktualisiert)
- **Naechster Schritt:** Runde 4 abgeschlossen. Commit + Push. Dann Runde 5 (Retrospektive, architektonische Entscheidungen, Mappe 3).

### OPT-2 + OPT-3: Game-weites Artefakt-Inventar + API-Download-Pattern
- **Phase:** Prozess-Optimierung (OPT-2/OPT-3 konsolidiert)
- **Aufgabe:** ARTEFAKT_INVENTAR von pro-Mappe auf game-weiten Scope erweitern. Download-Methode von Thumbnail-URL auf API-Call-Pattern umstellen.
- **Aenderungen:**
  - AGENT_INHALT: Neue Sektion 2b "Game-weite Artikelliste". Artikel werden fuer alle Mappen auf einmal identifiziert (Primaer-/Sekundaer-Zuordnung).
  - AGENT_ARTEFAKT: Scope auf game-weit geaendert. Inventar-Eintrag-Template um Download-Block erweitert (API-Call-Parameter statt direkter Thumbnail-URL). Self-Hosting-Abschnitt aktualisiert.
- **Artefakte:** AGENT_INHALT.md, AGENT_ARTEFAKT.md (geaendert)
- **Naechster Schritt:** Verbleibende OPTs (1, 4-8)

### Runde 4c: Engine-Patches deployed (Claude Code)
- **Phase:** Engine/Data-Fixes (Runde 4c, Claude Code)
- **Aufgabe:** 5 Sofort-Patches aus UEBERGABE_RUNDE4b_ENGINE_PATCHES.md ausgefuehrt.
- **Ergebnis:**
  - Q-M2-01: `_renderReihenfolge` + `_checkReihenfolge` lesen `optionen || elemente_ungeordnet`
  - Q-M2-02: `_checkFreitextCode` erkennt Array-`loesung` → Keyword-Modus
  - Q-M2-06: mat-2-6 typ "quellentext" → "tagebuch"
  - Q-M2-08: mat-2-1 `<cite>` bereinigt (INHALTSBASIS entfernt)
  - Q-M2-07: scpl.transfer-Duplikat + scpl.kernerkenntnisse-Klon entfernt
- **Artefakte:** escape-engine.js (3 Stellen), data.json (3 Fixes). Branch: fix/mappe2-quality-patches, PR erstellt.
- **Naechster Schritt:** PR mergen, dann OPT-1 bis OPT-8 + offene architektonische Entscheidungen

### Runde 4b: Prozess-Fixes verankert + Uebergabe-Prompt geschrieben
- **Phase:** Prozess-Verankerung (Runde 4b)
- **Aufgabe:** Alle Qualitaetsbefunde Q-M2-01 bis Q-M2-10 in generativen Prozess zurueckfuehren. Fixes auf drei Ebenen: Subagenten-Prompts, Vertraege/Q-Gates, Uebergabe-Prompt fuer Engine/data.json.
- **Aenderungen:**
  - **MQ3/MQ3b Material-Referenz-Verbot (Q-M2-04):** In alle 5 SUB_AUFGABE_*.md + AGENT_RAETSEL.md. Fragestellung darf keine Material-Links enthalten; Material-Verweis gehoert ausschliesslich in Tipp Stufe 1.
  - **Quellenangabe-Hygiene (Q-M2-08):** In alle 7 SUB_MATERIAL_*.md. Keine internen Artefakt-Namen (INHALTSBASIS, SKRIPT etc.) in schueler-sichtbaren Texten.
  - **Disjunktionsregel (Q-M2-07/09):** In VERTRAG_PHASE_2-0. reflexionsimpuls und kernerkenntnisse muessen inhaltlich disjunkt sein.
  - **Engine-Feld-Kompatibilitaet (Q-M2-01/02):** In VERTRAG_PHASE_2-2b. Reihenfolge: `optionen` (nicht `elemente_ungeordnet`). Freitext: `loesung` als Array (nicht String).
  - **SUB_AUFGABE_RF.md:** Feldname `elemente_ungeordnet` → `optionen` im Schema + Prosa (Q-M2-01)
  - **SUB_AUFGABE_FT.md:** `loesung` als Array statt String im Schema + Constraints (Q-M2-02)
- **Artefakte:** 16 Dateien geaendert. `docs/uebergabe/UEBERGABE_RUNDE4b_ENGINE_PATCHES.md` (neu). QUALITAETSBEFUNDE aktualisiert (6 von 13 Massnahmen ERLEDIGT).
- **Naechster Schritt:** Claude Code fuehrt UEBERGABE_RUNDE4b_ENGINE_PATCHES.md aus (5 Patches: 2 Engine, 3 data.json)

### Runde 4a: Post-Produktions-Qualitaetsreview Mappe 2
- **Phase:** Qualitaetsreview (Runde 4a)
- **Aufgabe:** Browser-Audit der Live-Mappe 2 (Chrome, weitergehts.online) + User-Review. Alle 5 Aufgabentypen funktional getestet, alle 6 Materialien geprueft, Hefteintrag evaluiert.
- **Ergebnis:** 10 Befunde dokumentiert (5 HIGH, 4 MEDIUM, 1 LOW). 5 Prozess-Schwachstellen identifiziert: S1 Engine-Feld-Inkompatibilitaet, S2 fehlende Cross-Material-Artefakte (Ueberleitungen), S3 didaktische Defaults in Subagenten, S4 Quellenangabe-Hygiene, S5 Hefteintrag-Timing. 15 priorisierte Massnahmen (5 Sofort-Patches, 7 Vor-Mappe-3-Fixes, 3 langfristige Engine-Verbesserungen).
- **Artefakte:** `docs/analyse/QUALITAETSBEFUNDE_gpg-erster-weltkrieg-ursachen_Mappe2.md`, STATUS.md (aktualisiert), CHANGELOG.md (aktualisiert)
- **Naechster Schritt:** Runde 4b: Sofort-Patches (2 Engine-Fixes + 3 data.json-Korrekturen) via Uebergabe-Prompt an Claude Code

---

## 2026-04-01

### v4 Produktionsarchitektur: Runde 3b — Zweiter Prozesstest (Mappe 2 live)
- **Phase:** Produktionstest (Runde 3b)
- **Aufgabe:** Vollstaendiger Prozesstest der v4-Architektur mit allen 3a-Opt-Verbesserungen. 3 Sessions (2 Cowork + 1 Claude Code), 15 Dispatches, Session-Split am Checkpoint.
- **Ergebnis:**
  - Ebene 1 PASS: Alle 3a-Befunde behoben (Dispatch-Isolation, Q-GATE-LOG, TB-FREEZE, kein data.json-Read)
  - Ebene 2 PASS: Alle Q-Gates PASS, M3b + C1b korrekt
  - Ebene 3 PASS: Session-Split ohne Informationsverlust
  - Ebene 4: ~57.300 Token verteilt auf 3 Kontexte
  - 5 neue Befunde: ARTEFAKT_INVENTAR-Luecke (MEDIUM), Git-Roundtrip (HIGH operativ), Worktree-Verwirrung (LOW), tafelbild.json-Listing (LOW), Wikimedia-404 (LOW)
  - 8 Optimierungskandidaten (OPT-1 bis OPT-8)
  - Mappe 2 live auf weitergehts.online (Commit 0c0e1ee). Technisch funktional, Qualitaetsbefunde offen.
- **Artefakte:** `docs/analyse/RUNDE_3b_ERGEBNIS.md`, UPGRADE_PLAN (aktualisiert), STATUS.md (aktualisiert), alle Produktions-JSONs in mappe-2/, data.json, mappe-2.html, Engine-Patch, 2 Bilder
- **Naechster Schritt:** Runde 4: Qualitaetsbefunde dokumentieren + OPT-1 bis OPT-8 priorisieren

### v4 Produktionsarchitektur: Runde 3a-Opt — Vertrags-Extraktion + Infrastruktur-Fixes
- **Phase:** Token-Optimierung (Runde 3a-Opt)
- **Aufgabe:** Alle 8 Befunde aus RUNDE_3a_ERGEBNIS.md adressieren. Vertrags-Extraktion als Kern-Optimierung.
- **Aenderungen:**
  - 6 Vertrags-Dateien extrahiert aus WORKFLOW_v4.md nach `docs/architektur/vertraege/` (~400-650 Token je, vs. ~7.285 fuer WORKFLOW komplett)
  - ORCHESTRATOR.md: Verweise auf Vertraege, Dispatch-Isolation (P4) explizit, Q-GATE-LOG Pflicht, Phase-2-Abschluss-Sektion
  - WORKFLOW_v4.md: Vertrags-Extraktion-Header, DISPATCH-ISOLATION in P4, Phase-2-Abschluss-Block
  - TAFELBILD_gpg-erster-weltkrieg-ursachen_Mappe2.md retroaktiv erstellt (Phase 0.4 Prozess)
  - HANDOFF_PHASE2.md nach docs/analyse/ verschoben
  - Goldstandard-Rolle redefiniert: data.json = MVP-Produkt, NICHT Template
  - RUNDE_3b_KICKOFF.md erstellt (Kickoff-Prompt fuer frische Session)
- **Artefakte:** 6 VERTRAG_PHASE_*.md, TAFELBILD_Mappe2.md, RUNDE_3b_KICKOFF.md, WORKFLOW_v4 + ORCHESTRATOR + RUNDE_3a_ERGEBNIS (aktualisiert)
- **Naechster Schritt:** Runde 3b (Prozesstest mit Optimierungen)

### v4 Produktionsarchitektur: Runde 3a-Eval — Post-hoc-Evaluation
- **Phase:** Evaluation (Runde 3a-Eval)
- **Aufgabe:** Post-hoc-Evaluation der Runde-3a-Produktion. 4 Ebenen: Prozesskonformitaet, Artefaktqualitaet, Compaction-Resilienz, Token-Effizienz.
- **Ergebnis:** 8 Befunde (3 HIGH: Batch-Produktion, kein Q-GATE-LOG, fehlendes TAFELBILD; 5 MEDIUM: ueberfluessige Reads, WORKFLOW nicht gelesen, Phase 3 in Cowork, data.json als Template, kein Uebergabe-Prompt). Token-Baseline: ~58.000 in 1 Session.
- **Artefakte:** `docs/analyse/RUNDE_3a_ERGEBNIS.md`
- **Naechster Schritt:** Runde 3a-Opt (Befunde adressieren)

### v4 Produktionsarchitektur: Runde 3a — Erster Prozesstest
- **Phase:** Produktionstest (Runde 3a)
- **Aufgabe:** Erster kontrollierter Test der v4-Produktionsarchitektur. Mappe 2 (gpg-erster-weltkrieg-ursachen) komplett produziert in 1 Cowork-Session.
- **Ergebnis:** Artefaktqualitaet korrekt (Ebene 2 PASS). Prozesskonformitaet nur PARTIAL PASS: Agent produzierte batch statt isoliert (P4), kein Q-GATE-LOG (P5), Phase 3 in Cowork statt Claude Code (P2). Compaction nicht getestet (kein Session-Split erzwungen).
- **Artefakte:** Alle Produktions-JSONs (rahmen/, materialien/, aufgaben/), RUNDE_3a_TESTPLAN.md
- **Naechster Schritt:** Runde 3a-Eval (Post-hoc-Evaluation)

---

## 2026-03-31

### v4 Produktionsarchitektur: Runde 2 — Agenten-Anpassung + Audit-Fixes
- **Phase:** Architektur-Ueberarbeitung (Runde 2)
- **Aufgabe:** Alle Agenten-Dokumente auf v4-Architektur angepasst (Ausfuehrungsorte, Schnittstellen-Vertraege, Output-Formate). Audit-Fixes umgesetzt.
- **Aenderungen:**
  - **ORCHESTRATOR.md:** Kanonische Referenz → WORKFLOW_v4.md. Ausfuehrungsorte-Tabelle: Phase 2.0-2.2c → Cowork, Phase 3 → Claude Code. Phase-2-Flowchart komplett neu (P1/P4/P5/P6, Rahmen, Cross-Konsistenz, CHECKPOINT). Mappe-Anhang-Prozedur: Eingabe = Produktionsverzeichnis, Assembly rein mechanisch
  - **AGENT_MATERIAL.md:** Produktionsmodus Output = materialien/mat-N-M.json (statt monolithisch). Schnittstellen-Vertrag Phase 2.1 (8 Read-Schritte mit Bedingungen). P1-Failsafe dokumentiert. Phase 2.1c referenziert. WORKFLOW_v2-Referenzen → v4
  - **AGENT_RAETSEL.md:** Ausfuehrungsort Cowork. Schnittstellen-Vertraege Phase 2.2a/2.2b. Output = aufgaben/aufgabe-N-M.json + PROGRESSIONSPLAN.md + Q-GATE-LOG.md. FRAGEBOGEN_mappe-N.md entfernt (bewusst, v4). Freitext-loesung = Keyword
  - **SUB_AUFGABE_FREITEXT.md:** `teilfragen`/`erwartete_begriffe`/`validierung_schwelle` → `_meta` (Audit B2-#2). `loesung` = Keyword 3-5 Woerter (Strategie-Audit E3). `_meta.musterantwort` fuer Tipp 3 + Lehrkraft
  - **BLOCKER Engine-Patch:** `text_mit_luecken || frage` bereits in WORKFLOW_v4 + UPGRADE_PLAN dokumentiert, Ausfuehrung in Runde 4
- **Verifikation:** Querverweis-Check (8 Pruefachsen): 5 konsistent, 4 Inkonsistenzen gefunden und korrigiert
- **Artefakte:** ORCHESTRATOR.md, AGENT_MATERIAL.md, AGENT_RAETSEL.md, SUB_AUFGABE_FREITEXT.md, UPGRADE_PLAN_v4 (2 Fixes aus Vorsession), STATUS.md, CHANGELOG.md
- **Naechster Schritt:** Runde 3a: Mappe-2 Rahmen + Materialien (Phase 2.0 + 2.1 + 2.1c)

### v4 Produktionsarchitektur: Strategischer Audit + Befund-Integration
- **Phase:** Architektur-Ueberarbeitung (Runde 1 + Strategischer Audit)
- **Aufgabe:** Strategischen Audit beauftragt (S1-S7: Subagenten-Isolation, Q-Gate-Wirksamkeit, Rahmen-Sequenz, Skalierung, Aufwand-Qualitaet, Schwachstellen, Goldstandard-Vergleich). 4 Empfehlungen evaluiert und in UPGRADE_PLAN + WORKFLOW_v4 eingearbeitet.
- **Empfehlungen (alle adressiert):**
  - **E1:** User-Validierung nach Material 1-2 hochgestuft auf PFLICHT (Mappe 2). Kalibrierung gegen systematischen Subagenten-Bias
  - **E2:** Phase 2.1c Material-Cross-Konsistenz eingefuehrt (1 Dispatch, 4 Pruefachsen: Sequenz-Kohaerenz, Fachbegriff-Konsistenz, Ueberleitung-Kohaerenz, TB-Gesamtabdeckung)
  - **E3:** Freitext-loesung als Keyword (3-5 Woerter) statt Mustersatz definiert. Mittelfristig: Engine erwartete_begriffe
  - **E4:** Mappe-N-Retrospektive als optionaler Schritt vor Phase 2 der Folge-Mappe (ab Mappe 3)
- **Artefakte:** `docs/analyse/AUDIT_v4_STRATEGIE_ERGEBNIS.md` (Audit-Ergebnis), UPGRADE_PLAN + WORKFLOW_v4 (aktualisiert), STATUS.md, CHANGELOG.md
- **Naechster Schritt:** User-Validierung, dann Runde 2

### v4 Produktionsarchitektur: Mechanischer Audit + Befund-Integration
- **Phase:** Architektur-Ueberarbeitung (Runde 1 + Mechanischer Audit)
- **Aufgabe:** Externen Audit beauftragt (strategisch A1-A5 + mechanisch B1-B5). Befunde evaluiert, gegengeprüeft (3 Befunde gegen Engine/Schema/data.json verifiziert). Korrekturen in UPGRADE_PLAN + WORKFLOW_v4 eingearbeitet.
- **Audit-Befunde (alle adressiert):**
  - **BLOCKER B2-#1:** Lueckentext Engine liest `frage` statt `text_mit_luecken`. Fix: Engine-Patch `text_mit_luecken || frage` in Phase-3-Pre-Flight
  - **MEDIUM B1-#4:** `_meta.zusammenfassung` existiert nicht. Fix: Vertrag korrigiert auf `titel + didaktische_funktion` aus MATERIAL_GERUEST
  - **MEDIUM B1-#5:** sicherung.json Vertrag fehlte `zusammenfassung`, `ueberleitung`, `kernerkenntnisse[]`. Fix: Vertrag vervollstaendigt
  - **MEDIUM B4-#7:** FRAGEBOGEN_mappe-N.md fehlt. Entscheidung: Bewusst entfernt (redundant mit .json + PROGRESSIONSPLAN)
  - **MEDIUM B2-#2:** SUB_AUFGABE_FREITEXT nicht-funktionale Felder. Fix: In `_meta` verschieben (Runde 2)
- **Strategische Korrekturen:**
  - Checkpoint-Strategie: Session-Split nach Phase 2.1 (Token-Budget-Mitigation)
  - Phase-3-Pre-Flight: Integritaetspruefung ergaenzt (alle .json vorhanden + valide)
  - Risiko-Tabelle: 3 neue Risiken aus Audit (Token-Budget HOCH, Integritaet, Agent-Tool-Verhalten)
  - Runde 3 gesplittet in 3a (Rahmen + Materialien) und 3b (Aufgaben)
- **Artefakte:** `docs/analyse/AUDIT_v4_ARCHITEKTUR_ERGEBNIS.md` (Audit-Ergebnis), UPGRADE_PLAN + WORKFLOW_v4 (aktualisiert), STATUS.md, CHANGELOG.md

### v4 Produktionsarchitektur: WORKFLOW_v4.md + UPGRADE_PLAN Refinements
- **Phase:** Architektur-Ueberarbeitung (Runde 1)
- **Aufgabe:** User-Refinements R1-R3 in UPGRADE_PLAN eingearbeitet. WORKFLOW_v4.md als verlustfreie Transformation aus WORKFLOW_v2.md (v3) geschrieben.
- **Ergebnis:**
  - UPGRADE_PLAN: P6 (Schnittstellen-Vertraege + Occam's Razor), P7 (Verlustfreie Transformation), P3 verfeinert (Rahmen stuetzt Kerninhalt). Explizite Input/Output-Tabellen fuer Phase 2.0, 2.1, 2.2a/b/c.
  - WORKFLOW_v4.md: 12 Sektionen. Phase 0-1.5 unveraendert. Phase 2 komplett in Cowork mit Schnittstellen-Vertraegen pro Dispatch-Schritt. Phase 3 rein mechanisch. Alle L1-L7, Q-Gates, JSON-Encoding, Engine-Typ-Mapping, Download-Methode, SK/G-Kriterien bewahrt.
- **Artefakte:** `docs/architektur/WORKFLOW_v4.md` (neu), `UPGRADE_PLAN_v4_PRODUKTIONSARCHITEKTUR.md` (aktualisiert), STATUS.md, CHANGELOG.md
- **Naechster Schritt:** Audit beauftragen

### v4 Produktionsarchitektur: UPGRADE_PLAN erstellt
- **Phase:** Architektur-Ueberarbeitung
- **Aufgabe:** Mappe-2-Produktion v2 (Commit c9eb9ec) evaluiert: Subagenten-Prompts zwar gelesen, aber monolithisch produziert. 4/5 Aufgabentypen Engine-inkompatibel (falsche JSON-Felder: text_mit_luecken statt frage, elemente statt paare, etc.). Root-Cause: Claude Code hat kein Subagent-Isolations-Konzept. Architektur-Neuausrichtung: Phase 2 (didaktische Produktion) wird von Claude Code nach Cowork verlagert.
- **Ergebnis:**
  - UPGRADE_PLAN_v4 mit 5 Architekturprinzipien: P1 (Read-from-Artifact), P2 (Didaktik in Cowork), P3 (Rahmen vor Inhalt), P4 (Ein Artefakt pro Dispatch), P5 (Q-Gate als Pflicht-Zwischenschritt)
  - Neue Phasenstruktur: Phase 2.0 (Rahmen) → 2.1 (Materialien) → 2.2 (Aufgaben) alle in Cowork, Phase 3 (Assembly) in Claude Code (rein mechanisch)
  - Artefakt-Verzeichnis: docs/agents/artefakte/produktion/{game-id}/mappe-{N}/ mit .json pro Material/Aufgabe
  - Implementierungsplan: 5 Cowork-Runden (R0: Plan, R1: WORKFLOW_v4, R2: Agenten-Anpassung, R3: Mappe-2-Produktion, R4: Assembly, R5: Retrospektive)
- **Artefakte:** `docs/architektur/UPGRADE_PLAN_v4_PRODUKTIONSARCHITEKTUR.md` (neu), STATUS.md + CHANGELOG.md
- **Naechster Schritt:** User-Validierung, dann Runde 1 (WORKFLOW_v4.md)

---

## 2026-03-30

### Mappe-2-Produktion v2: Gescheitert (Commit c9eb9ec — wird revertet)
- **Phase:** Mappe 2 (Produktion, zweiter Versuch)
- **Aufgabe:** Uebergabe-Prompt v2 in Claude Code ausgefuehrt (mit expliziten per-Material-Dispatch-Bloecken).
- **Ergebnis:** Subagenten-Prompts wurden gelesen (Verbesserung vs. v1), aber Produktion erfolgte erneut monolithisch in einem einzigen Edit. Kein Q-Gate-Log, kein Progressionsplan, keine Cross-Konsistenz. 4/5 Aufgabentypen mit Engine-inkompatiblen JSON-Feldern. Compaction trat erneut auf.
- **Entscheidung:** Revert + Architektur-Ueberarbeitung (v4). Claude Code ist strukturell nicht in der Lage, die Subagenten-Architektur als isolierte Dispatch-Einheiten auszufuehren.
- **Artefakte:** Commit c9eb9ec (wird revertet), Revert-Commit f5a647a (Revert von a6aa589 — bereits erfolgt)

### Mappe-2-Produktion: Uebergabe-Prompt v2 (Revert + Neugenerierung)
- **Phase:** Mappe 2 (Korrektur)
- **Aufgabe:** Mappe-2-Produktion v1 (Commit a6aa589) gescheitert: Subagenten-Prompts (SUB_MATERIAL_*, SUB_AUFGABE_*) wurden nicht gelesen/dispatched. Root-Cause: Uebergabe-Prompt v1 referenzierte Subagenten generisch statt mit expliziten per-Material-Dispatch-Bloecken. Didaktische Qualitaet unzureichend. Domain-Anchoring evaluiert: Subagenten in docs/agents/ (Cowork-Domaene) werden von Claude Code gelesen — kein strukturelles Problem, aber Prompt muss explizite Lese-Anweisungen enthalten.
- **Ergebnis:**
  - Neuer Uebergabe-Prompt v2 mit expliziten Dispatch-Bloecken pro Material (6x) und Aufgabe (5x)
  - Jeder Block: Subagent-Prompt-Pfad, Eingabe-Parameter, Q-Gate-Log-Pflicht
  - AGENT_RAETSEL als Orchestrator fuer Aufgaben (Progressionsplan → per-Aufgabe SUB_AUFGABE_* Dispatch)
  - Pre-Flight enthaelt Revert von a6aa589
  - v3.8 C1-C5 Constraints eingebettet (C1b Stundenfrage, C2 Titel A/B, C3 Inline-Links, C4 Bildunterschriften, C5 Variante A)
  - Mappe-Anhang-Prozedur (ORCHESTRATOR Z.120-131)
  - Merge-Schutz: Nur data.json, mappe-2.html, 2 Bilder
- **Artefakte:** `docs/uebergabe/UEBERGABE_MAPPE2_PRODUKTION_v2.md` (neu), STATUS.md + CHANGELOG.md
- **Naechster Schritt:** In frischer Claude-Code-Session ausfuehren

### Mappe-2-Produktion v1: Gescheitert (Commit a6aa589 — wird revertet)
- **Phase:** Mappe 2 (Produktion)
- **Aufgabe:** Uebergabe-Prompt v1 ausgefuehrt.
- **Ergebnis:** Strukturell korrekt (Rendering, Format OK), aber didaktisch unzureichend. Subagenten-Prompts nicht gelesen — monolithische Produktion. Aufgaben vermutlich ad-hoc statt ueber SUB_AUFGABE_*-Pipeline.
- **Entscheidung:** Revert + Neugenerierung mit v2-Prompt.
- **Artefakte:** Commit a6aa589 (wird in Pre-Flight von v2 revertet)

### v3.8 Audit-Fixes Claude Code (Commit f38149a)
- **Phase:** v3.8 (Audit-Behebung, Claude-Code-Domaene)
- **Aufgabe:** Uebergabe-Prompt `UEBERGABE_v3-8_AUDIT_FIXES.md` ausgefuehrt.
- **Ergebnis:**
  - F-03: Template data.json auf Goldstandard-Struktur gebracht (materialien-Felder, SCPL-Tafelbild, sicherung-Felder, einstieg-Struktur)
  - F-06: Inline-Link `[[mat-1-8|Karikatur von Cecil Rhodes]]` in aufgabe-1-4 Tipp 1 nachgeruestet
  - F-08-data: `transfer.frage` und `reflexionsimpuls` in Mappe-1-Sicherung korrigiert (echte Fragen statt Ueberleitungen)
- **Artefakte:** `escape-games/template/data.json` + `escape-games/gpg-erster-weltkrieg-ursachen/data.json` (aktualisiert)
- **Naechster Schritt:** Mappe-2-Generierung

### v3.8 Audit-Findings behoben (Cowork-Domaene)
- **Phase:** v3.8 (Audit-Behebung)
- **Aufgabe:** 9 Findings aus externem Produktionsreife-Audit evaluieren und beheben.
- **Ergebnis Cowork-Fixes:**
  - F-01 [HIGH]: AGENT_MATERIAL Tafelbild-Beispiel auf SCPL-Format aktualisiert (+ zweites Legacy-Beispiel im Gesamt-JSON gefixt)
  - F-02 [MEDIUM]: ORCHESTRATOR data.json-Schema durch Verweis auf Goldstandard-data.json ersetzt
  - F-04 [MEDIUM]: QUALITAETSKRITERIEN_MATERIALPRODUKTION um v3.8-Constraints (C1-C5) ergaenzt
  - F-05 [LOW]: ORCHESTRATOR G1-G13 → G1-G14 korrigiert
  - F-07 [HIGH]: Mappe-Anhang-Prozedur in ORCHESTRATOR dokumentiert
  - F-08 [MEDIUM]: Feld-Semantik (ueberleitung/transfer/reflexionsimpuls) in AGENT_MATERIAL geschaerft
- **Artefakte:** AGENT_MATERIAL.md, ORCHESTRATOR.md, QUALITAETSKRITERIEN_MATERIALPRODUKTION.md (aktualisiert), `docs/uebergabe/UEBERGABE_v3-8_AUDIT_FIXES.md` (neu), STATUS.md + CHANGELOG.md

### v3.8 CSS-Fix: Links + Scroll-Offset (Commit c3ee2f3)
- **Phase:** v3.8 (Browser-Validierung)
- **Aufgabe:** Material-Links in Tipps sichtbar machen + Scroll-Offset fuer Fixed Header.
- **Ergebnis:** `.tipp__material-link` unterstrichen + farbig. `[id^="mat-"]` mit `scroll-margin-top: 4rem`. Browser-Validierung bestanden.
- **Artefakte:** `assets/css/themes/theme-gpg.css` (aktualisiert)

### v3.8 Bugfix: Tipps + Stundenfrage + M1-Titel (Commit 9d184ee)
- **Phase:** v3.8 (Browser-Validierung)
- **Aufgabe:** (1) Auto-Prepend-Block in Tipp-Rendering entfernt — alle Tipps einheitlich durch `_parseInlineMaterialLinks`. (2) Stundenfrage vereinheitlicht: `einstieg.problemstellung` === `sicherung.tafelbild.stundenfrage`. (3) mat-1-1 Titel: "Wie war die Situation in Europa vor 1914?"
- **Ergebnis:** Inline-Links in Tipps korrekt gerendert. Stundenfrage wortidentisch an allen Stellen. C1b Identitaets-Constraint in AGENT_SKRIPT + AGENT_TAFELBILD verankert.
- **Artefakte:** `assets/js/escape-engine.js` + `data.json` (aktualisiert), `docs/agents/AGENT_SKRIPT.md` + `AGENT_TAFELBILD.md` (C1b)

### v3.8 Mappe-1-Migration C2-C5 (Commit 2a192e5)
- **Phase:** v3.8 (Cowork-Runde 5, Migration)
- **Aufgabe:** 17 Feldaenderungen in data.json (Mappe 1) gemaess C2-C5.
- **Ergebnis:** 7x C2 Titel (5x Typ A Frage, 2x Typ B Statement), 3x C3 Inline-Material-Links, 4x C4 didaktische Bildunterschriften, 3x C5 Ueberleitung Variante A. Automatisierter Python-Check bestanden.
- **Artefakte:** `escape-games/gpg-erster-weltkrieg-ursachen/data.json` (aktualisiert)
- **Naechster Schritt:** Browser-Validierung

### v3.8 Engine-Erweiterung: Inline-Material-Links (Commit fd883dc)
- **Phase:** v3.8 (Cowork-Runde 5, Engine)
- **Aufgabe:** `_parseInlineMaterialLinks()` — parst `[[mat-id|Text]]`-Markup in klickbare Anker-Links. DocumentFragment-basiert, XSS-sicher.
- **Ergebnis:** Tipp-Rendering und Fragestamm-Rendering unterstuetzen `[[...]]`-Markup. Rueckwaertskompatibel (Texte ohne Markup: identisch). Auto-Prepend fuer material_referenz bleibt.
- **Artefakte:** `assets/js/escape-engine.js` (aktualisiert)

### v3.8 C2/C3 Revision + Infrastruktur-Schaerfung
- **Phase:** v3.8 (Cowork-Runde 5, Architektur)
- **Aufgabe:** C2 und C3 revidieren basierend auf Browser-Feedback. Engine-Erweiterung spezifizieren. Migrationsplan aktualisieren.
- **Ergebnis C2:** Typ A (Frage-Titel, einstieg/erarbeitung) + Typ B (Statement-Titel, visuelle Anker). Aktualisiert in AGENT_MATERIAL.md + 7x SUB_MATERIAL_*.md (MQ2-Zeilen).
- **Ergebnis C3:** Neue Markup-Konvention `[[mat-id|Anzeigetext]]` + (M-Position). Aktualisiert in AGENT_RAETSEL.md + 5x SUB_AUFGABE_*.md (MQ3-Zeilen).
- **Artefakte:** `docs/uebergabe/UEBERGABE_v3-8_ENGINE_INLINE_LINKS.md` (neu), `docs/uebergabe/UEBERGABE_v3-8_MIGRATION_MAPPE1.md` (aktualisiert), UPGRADE_PLAN (aktualisiert), STATUS.md + CHANGELOG.md

### v3.8 U9-U10: Einstieg-Zentrierung + Sticky-Transition (Commit 5650157)
- **Phase:** v3.8 (Cowork-Runde 4, UI-Feinschliff)
- **Aufgabe:** (1) U9: Einstieg-Block (Narrativ + Problemstellung) zentriert, max-width 800px, Problemstellung 1.2rem bold. (2) U10: IntersectionObserver auf `.einstieg__problemstellung` statt ganzen Einstieg — Sticky-Header erscheint genau wenn Stundenfrage aus Viewport scrollt. Transition 0.3s ease-out.
- **Ergebnis:** Browser-Sichtung positiv. Einstieg visuell als zentraler Auftakt, Sticky-Uebergang smooth.
- **Artefakte:** `assets/css/themes/theme-gpg.css` + `assets/js/escape-engine.js` (aktualisiert), `docs/uebergabe/UEBERGABE_v3-8_U9-U10_EINSTIEG_STICKY_TRANSITION.md` (Prompt)
- **Naechster Schritt:** Infrastruktur-Dokumentation aktualisieren, dann Mappe-1-Migration

### v3.8 U5-U8: Header-Optimierung (Commit 862af13)
- **Phase:** v3.8 (Cowork-Runde 4, UI-Korrektur)
- **Aufgabe:** Browser-Review U1-U4 ergab 4 Nachbesserungen: (1) U5: Sticky-Header zeigt Stundenfrage statt Mappennamen (Quelle: `sicherung.tafelbild.stundenfrage`, Fallback `einstieg.problemstellung`). Observer auf `.mappe__einstieg`. (2) U6: Mappentitel "Mappe X: [Titel]" (Index aus `data.mappen`). (3) U7: Beschreibungszeile `display: none`. (4) U8: Game-Titel-H1 nicht mehr erzeugt, Mappe-Titel bleibt H1.
- **Ergebnis:** Alle 4 Aenderungen umgesetzt, Browser-Sichtung positiv.
- **Artefakte:** `assets/js/escape-engine.js` (aktualisiert), `docs/uebergabe/UEBERGABE_v3-8_U5-U8_HEADER_STICKY_BESCHREIBUNG.md` (Prompt)
- **Naechster Schritt:** U9-U10 Feinschliff

### v3.8 C5-Constraint ueberarbeitet + Uebergabe-Prompts U5-U10 erstellt
- **Phase:** v3.8 (Cowork-Runde 4, Architektur)
- **Aufgabe:** (1) C5-Constraint in AGENT_SKRIPT.md ueberarbeiten: Variante A (impulsartige Ueberleitung, nicht-letzte Mappen) + Variante B (Reflexionsfrage, letzte Mappe). MQ5 angepasst. (2) Uebergabe-Prompts U5-U8 und U9-U10 erstellt.
- **Ergebnis:**
  - AGENT_SKRIPT.md: ABSCHLUSS-MUSTER C5 mit 2 Varianten, MQ5 aktualisiert, Markierungen `[ABSCHLUSS C5: UEBERLEITUNG]` / `[ABSCHLUSS C5: REFLEXION]`
  - 2 Uebergabe-Prompts: U5-U8 (Header-Optimierung), U9-U10 (Einstieg + Sticky-Transition)
- **Artefakte:** AGENT_SKRIPT.md (aktualisiert), 2x UEBERGABE_*.md (neu)
- **Naechster Schritt:** U5-U10 in Claude Code ausfuehren (erledigt, s.o.)

---

## 2026-03-29

### v3.8 Uebergabe-Prompt U1-U4 erstellt
- **Phase:** v3.8 (Cowork-Runde 3 Vorbereitung)
- **Aufgabe:** Uebergabe-Prompt fuer Claude Code erstellen: 4 UI-Aenderungen (Infobox-Redesign, Sticky-Header, Hefteintrag-Umbenennung, Quellen-Toggle)
- **Ergebnis:** `docs/uebergabe/UEBERGABE_v3-8_U1-U4_UI_OPTIMIERUNG.md` erstellt. Enthaelt: Pre-Flight, 4 detaillierte Aenderungsbeschreibungen mit CSS/JS-Snippets, figcaption-Aufspaltung fuer BQ/KA, Fallback-Strategie (Quellen sichtbar ohne JS), 12-Punkt-Verifikationsliste, Merge-Schutz
- **Artefakte:** `docs/uebergabe/UEBERGABE_v3-8_U1-U4_UI_OPTIMIERUNG.md` (neu)
- **Naechster Schritt:** Prompt in Claude Code ausfuehren, Browser-Validierung, dann Mappe-1-Migration

### v3.8 Externer Audit C0-C5 durchgefuehrt
- **Phase:** v3.8 (Audit)
- **Aufgabe:** 3 parallele Audit-Subagenten auf die v3.8-Gesamtarchitektur ansetzen (Agent-Prompts, Infrastruktur-Docs, Beispiel-Konsistenz)
- **Ergebnis:** 0 BLOCKER, 2 Sofort-Fixes (ORCHESTRATOR.md Referenz-Tabelle, QUALITAETSKRITERIEN Status v1→v2), 3 False Positives identifiziert, 3 offene LOW/MEDIUM dokumentiert. MQ1-MQ5 Abdeckung 100%. Audit-Bericht: `docs/analyse/AUDIT_v3-8_C0-C5_FINAL.md`
- **Artefakte:** `docs/analyse/AUDIT_v3-8_C0-C5_FINAL.md` (neu), ORCHESTRATOR.md + QUALITAETSKRITERIEN (gefixt)
- **Naechster Schritt:** U1-U4 Uebergabe-Prompt erstellen

### v3.8 C3+C4+C5: Display-Referenzen + Didaktische Bildunterschriften + Abschlussfrage
- **Phase:** v3.8 (Cowork-Runde 2)
- **Aufgabe:** C3 (Dynamische Material-Referenzen M[position]), C4 (Bildunterschriften didaktisch statt quellenangabe-artig), C5 (Motivierende Abschlussfrage im letzten Chunk) in Agenten-Architektur verankern.
- **Ergebnis:**
  - C3: AGENT_RAETSEL.md — Display-Referenz-Konvention (Konventions-Block mit Falsch/Richtig-Tabelle, Material-Display-ID im Konstruktionskontext, MQ3 im Orchestrator-Q-Gate). 5x SUB_AUFGABE_*.md — MQ3 in allen Q-Gate-Tabellen. Beispiel-Tipps in SUB_AUFGABE_MC + SUB_AUFGABE_ZUORDNUNG auf M[position]-Notation korrigiert
  - C4: SUB_MATERIAL_BILDQUELLE.md — BILDUNTERSCHRIFT-CONSTRAINT-Block + MQ4 im Q-Gate. SUB_MATERIAL_KARTE.md — BILDUNTERSCHRIFT-CONSTRAINT-Block + MQ4 im Q-Gate
  - C5: AGENT_SKRIPT.md — ABSCHLUSSFRAGE-MUSTER-Block (3 Muster, Regeln, Markierung) + MQ5 im Q-Gate
- **Artefakte:** AGENT_RAETSEL.md, AGENT_SKRIPT.md, 5x SUB_AUFGABE_*.md, SUB_MATERIAL_BILDQUELLE.md, SUB_MATERIAL_KARTE.md (alle aktualisiert)
- **Naechster Schritt:** Externer Audit der v3.8-Gesamtarchitektur, danach U1-U4 Uebergabe-Prompts

### v3.8 C1+C2: Stundenfrage-Constraint + Material-Titel-als-Teilfrage
- **Phase:** v3.8 (Cowork-Runde 1)
- **Aufgabe:** C1 (Jede Mappe hat exakt eine Stundenfrage als Ueberschrift) + C2 (Kein Material-Titel mit nominalisierten Konzepten) in Agenten-Architektur verankern.
- **Ergebnis:**
  - C1: AGENT_SKRIPT.md — STUNDENFRAGE-CONSTRAINT-Block in Chunk-Template, Beispieltabelle Falsch/Richtig, MQ1 im Q-Gate
  - C1: AGENT_MATERIAL.md — Stundenfrage-Feld im Produktionskontext als Frageform annotiert
  - C2: AGENT_MATERIAL.md — Material-Titel-Constraint-Block nach Dispatch-Logik, Beispieltabelle Falsch/Richtig, Subagenten-Delegation
  - C2: MQ2 Q-Gate-Punkt in allen 7 SUB_MATERIAL_*.md (DT, QT, BQ, ZL, TB als Tabellen-Erstzeile; KA, ST als eigene Subsection "Uebergreifende Material-Qualitaet")
- **Artefakte:** AGENT_SKRIPT.md, AGENT_MATERIAL.md, 7x SUB_MATERIAL_*.md (alle aktualisiert)
- **Naechster Schritt:** Cowork-Runde 2: C3+C4+C5

### v3.8 C0: PDF-Qualifikation der Guetekriterien (Runde 2+3)
- **Phase:** v3.8 (Cowork-Runde 0, Qualifikation)
- **Aufgabe:** 3 weitere Trainings-PDFs (GPG GB, GPG B1, GPG B2) analysieren und Best Practices in QUALITAETSKRITERIEN + Subagenten einbetten. Keine woertlichen Zitate.
- **Ergebnis:**
  - QUALITAETSKRITERIEN v1→v2: M9 um Kontroversitaet erweitert. 4 neue typ-spezifische Kriterien: BQ-7 Karikatur-Sonderregeln, BQ-8 Kommunikationsanalyse Propagandabilder, ZL-6 Visuelle Gestaltungsprinzipien, KA-7 Situationskonfrontation. QT-1 um emotionale Zugaenglichkeit erweitert, QT-5 um Quellentypologie (Ueberreste/Traditionen). DT-1 um Kausalitaetstypen (dynamisch/strukturell). BQ-1 um Bildauswahl-Kriterien und didaktische Einsatzfunktionen.
  - 5 Subagenten aktualisiert: SUB_MATERIAL_DARSTELLUNGSTEXT (Kausalitaetstypen), SUB_MATERIAL_BILDQUELLE (Karikatur + Kommunikationsanalyse + bildtyp-Enum), SUB_MATERIAL_ZEITLEISTE (Visuelle Gestaltung + Layout-Varianten), SUB_MATERIAL_KARTE (Situationskonfrontation), SUB_MATERIAL_QUELLENTEXT (Emotionale Zugaenglichkeit + Quellentypologie)
  - Quellen-Header in QUALITAETSKRITERIEN aktualisiert (GPG B2 Beschreibung praezisiert)
- **Artefakte:** QUALITAETSKRITERIEN_MATERIALPRODUKTION.md (v2), 5x SUB_MATERIAL_*.md (aktualisiert)
- **Naechster Schritt:** CP3 (WORKFLOW_v2.md) + CP4 (ORCHESTRATOR.md, AGENT_TECHNIK.md) abschliessen

### v3.8 C0: Material-Subagenten-Extraktion implementiert
- **Phase:** v3.8 (Cowork-Runde 0, C0)
- **Aufgabe:** AGENT_MATERIAL.md (804-Zeilen-Monolith) in Orchestrator + 7 spezialisierte Subagenten refaktorieren. Best Practices aus 6 Trainings-PDFs (DG B1, DG B3, DG B10, GPG GB, GPG B1, GPG B2) extrahieren und in persistente Referenzdatei + Subagenten einbetten.
- **Ergebnis:**
  - Schritt A: 5 Renames via `git mv` (AGENT_SUB_DARSTELLUNGSTEXT → SUB_MATERIAL_DARSTELLUNGSTEXT, etc.)
  - Schritt B: 2 neue Subagenten erstellt: SUB_MATERIAL_KARTE.md (314 Zeilen: 3-Pfad-Workflow, Schulatlas-Redakteur, Engine-Mapping karte→bildquelle), SUB_MATERIAL_STATISTIK.md (325 Zeilen: 3-Pfad-Workflow, Infografik-Designer, dual Engine-Mapping)
  - Zentrale Referenzdatei: `docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md` (M1-M12 typ-uebergreifend + 7 typ-spezifische Kriteriensaetze, nur abstrahierte Prinzipien, keine Zitate aus PDFs)
  - Schritt C: Alle 7 Subagenten aktualisiert (Qualitaetskriterien-Referenz, Best-Practice-Inline-Einbettung, Header-Rename, Cross-Reference-Bereinigung)
  - AGENT_MATERIAL.md: Zum Orchestrator refaktoriert (804→613 Zeilen). Subagenten-Referenztabelle, Produktionskontext-Template, Dispatch-Logik, Cross-Material-Konsistenzpruefung. W-1 bis W-7 an Subagenten delegiert, Qualitaetsspezifikationen an zentrale Referenz + Subagenten delegiert.
- **Artefakte:**
  - `docs/agents/SUB_MATERIAL_KARTE.md` (neu)
  - `docs/agents/SUB_MATERIAL_STATISTIK.md` (neu)
  - `docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md` (neu)
  - `docs/agents/AGENT_MATERIAL.md` (refaktoriert)
  - `docs/agents/SUB_MATERIAL_DARSTELLUNGSTEXT.md` (umbenannt + aktualisiert)
  - `docs/agents/SUB_MATERIAL_QUELLENTEXT.md` (umbenannt + aktualisiert)
  - `docs/agents/SUB_MATERIAL_BILDQUELLE.md` (umbenannt + aktualisiert)
  - `docs/agents/SUB_MATERIAL_ZEITLEISTE.md` (umbenannt + aktualisiert)
  - `docs/agents/SUB_MATERIAL_TAGEBUCH.md` (umbenannt + aktualisiert)
- **Naechster Schritt:** WORKFLOW_v2.md aktualisieren (5→7 Subagenten, Namenskonvention), dann C1-C5 Content-Aenderungen

### Uebergabe-Artefakt v3.8 C0 erstellt (Token-Limit Session)
- **Phase:** v3.8 (Uebergabe)
- **Aufgabe:** Session-Uebergabe wegen Token-Limit. Uebergabe-Artefakt fuer naechste Cowork-Instanz erstellen.
- **Ergebnis:** `docs/projekt/UEBERGABE_v3-8_C0.md` erstellt. Enthaelt: Orientierung, Pflichtlektuere (7 Dokumente in Reihenfolge), Implementierungsauftrag C0 (7 Subagenten + Orchestrator-Refactoring), kritische Entscheidungen (9 aus Audit), Qualifizierungsauftrag (Trainingsmaterial-Analyse mit Datenschutz-Anweisung), ausstehende Schritte, Projektkonventionen, Fallstricke.
- **Artefakte:** `docs/projekt/UEBERGABE_v3-8_C0.md` (neu)
- **Naechster Schritt:** Neue Cowork-Session: Uebergabe-Artefakt lesen, dann C0 implementieren

### Audit-Evaluation v3.8: 10 Findings bewertet, UPGRADE_PLAN finalisiert
- **Phase:** v3.8 (Audit-Evaluation)
- **Aufgabe:** Externen Audit-Report (`docs/analyse/Audit Report v3.8.md`) evaluieren. 10 Findings auf Validitaet pruefen, valide Befunde in UPGRADE_PLAN einarbeiten.
- **Ergebnis:** 2 HIGH, 4 MEDIUM, 3 LOW, 1 Bestaetigung. 8 valide, 1 faktisch falsch (#3: Auditor nahm an, AGENT_SUB_*.md existieren als Dateien — tun sie nicht, nur als WORKFLOW-Referenzen auf geplante Dateien), 1 modifiziert (#8: C5-Formulierung nur in AGENT_SKRIPT, AGENT_RAETSEL uebernimmt nur). 6 Aenderungen eingearbeitet: (1) Produktionskontext um skript_passage ergaenzt (Volltext fuer DT/TB/QT, Zusammenfassung fuer BQ/KA/ZL/ST). (2) Quellenrecherche-Verortung: Orchestrator behaelt Referenz-Workflow, QT/ST recherchieren materialspezifisch selbst, BQ/KA erhalten vorab heruntergeladene Artefakte. (3) W-8-Entfernung bei C0 dokumentiert (seit v3 obsolet). (4) Engine-Typ-Mapping als Spalte in Subagenten-Tabelle (karte→bildquelle, tagebuch→quellentext, statistik→zeitleiste/bildquelle). (5) Display-Referenz-Konvention M[position] fuer C3 definiert (mappenrelativ, 1-basiert). (6) WORKFLOW_v2.md-Aenderungsscope praezisiert (5→7 Subagenten, Namenskonvention, Typ-Mapping, Produktionskontext). Ausfuehrungsort-Fussnote in Domaenenzugehoerigkeit. 4 neue Verifikationspunkte.
- **Artefakte:** `docs/architektur/UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md` (7 Edits), `docs/projekt/STATUS.md` (aktualisiert)
- **Naechster Schritt:** v3.8 Cowork-Runde 0: C0 Material-Subagenten-Extraktion starten

### Audit-Briefing v3.8: Material-Subagenten-Architektur
- **Phase:** v3.8 (Pre-Audit)
- **Aufgabe:** Audit-Briefing fuer externen Reviewer erstellen. Drei Prueffragestellungen: (A) Grenzziehung Orchestrator ↔ Subagenten bei Design-/Produktions-Modus-Trennung, (B) Tool-Chain-Verankerung (im Subagenten vs. Orchestrator), (C) Ausfuehrungsort und optimaler Prozess pro Game/Mappe. Auditor soll den bisherigen funktionierenden Prozess kennenlernen und evaluieren.
- **Ergebnis:** `docs/analyse/AUDIT_BRIEFING_v3-8_MATERIAL_SUBAGENTEN.md` erstellt. 13 Pflichtlektuere-Dokumente in Lesereihenfolge. 4 bekannte Inkonsistenzen dokumentiert (Namenskonvention, Subagenten-Anzahl 5 vs. 7, W-8-Residuum, Ausfuehrungsort-Mehrdeutigkeit). Kontextsektion mit Mappe-1-Deployment-Erfahrung, v2.1-Learnings und v3.7-Pattern-Referenz. Scope-Grenzen definiert (Architektur-Pruefung, keine Implementierung).
- **Artefakte:** `docs/analyse/AUDIT_BRIEFING_v3-8_MATERIAL_SUBAGENTEN.md` (neu)
- **Naechster Schritt:** Audit durchfuehren lassen, Findings evaluieren, dann C0 implementieren

### v3.8 UPGRADE_PLAN erweitert: Material-Subagenten-Extraktion (C0) als Voraussetzung
- **Phase:** v3.8 (Architektur-Erweiterung)
- **Aufgabe:** Material-Subagenten-Extraktion als strukturelle Voraussetzung fuer C1-C5 in UPGRADE_PLAN einbauen. Analog v3.7 (AGENT_RAETSEL → SUB_AUFGABE_*): AGENT_MATERIAL.md (745+ Zeilen, 7 Workflows monolithisch) zu Orchestrator refaktorieren, 7 SUB_MATERIAL_*.md erstellen.
- **Ergebnis:** UPGRADE_PLAN v3.8 um C0 (Material-Subagenten-Extraktion) erweitert: Neue Architektur-Sektion mit 7-Subagenten-Tabelle, Strukturelle-Analogie-Tabelle (v3.7 ↔ v3.8/C0), Produktionskontext-Template. Betroffene-Artefakte von 13 auf 19 Dateien erweitert. Implementierungsreihenfolge um Schritt 0 ergaenzt. 4 Verifikationspunkte fuer C0. Phasentitel zu "Material-Subagenten + Qualitaet + UI-Optimierung", Umfang von Mittel auf Gross.
- **Artefakte:** `docs/architektur/UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md` (erweitert), `docs/projekt/STATUS.md` (aktualisiert)
- **Naechster Schritt:** v3.8 Cowork-Runde 0: C0 Material-Subagenten-Extraktion starten

### v3.8 UPGRADE_PLAN: Material-Qualitaet + UI-Optimierung definiert
- **Phase:** v3.8 (Architektur-Design)
- **Aufgabe:** Neue Phase v3.8 vor v3.6 einschueben. 10 Aenderungswuensche aus `docs/analyse/Updates Materialien und UI.md` kategorisieren, in UPGRADE_PLAN als strukturierte Phase mit Betroffene-Artefakte-Tabelle, Domaenenzugehoerigkeit und Verifikationscheckliste aufnehmen.
- **Ergebnis:** UPGRADE_PLAN erweitert: Phasentabelle (v3.2-v3.5+v3.7 als DONE, v3.8 als NEU), Dependency-Graph (v3.7 → v3.8 → v3.6), Rollback-Strategie (v3.8 graceful degradation), Q-Gate (MQ1-MQ5 Material-Qualitaet). Phase v3.8 Detail-Sektion: Problem, Abhaengigkeit, 9 Aenderungen in 2 Domaenen (U1-U4 Claude Code, C1-C5 Cowork), 13 betroffene Artefakte, 4-Schritt-Implementierungsreihenfolge, 11 Verifikationspunkte.
- **Artefakte:** `docs/architektur/UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md` (erweitert), `docs/projekt/STATUS.md` (aktualisiert)
- **Naechster Schritt:** v3.8 Cowork-Runde 1: C1 + C2 in Material-Agenten-Prompts umsetzen

### v3.7 Abschluss: Workflow + Referenz-Docs aktualisiert
- **Phase:** v3.7 (Abschluss)
- **Aufgabe:** Verbleibende kanonische Docs an die neue Subagenten-Architektur anpassen: WORKFLOW_v2.md, ORCHESTRATOR.md, GUETEKRITERIEN_AUFGABEN.md, AGENT_TECHNIK.md.
- **Ergebnis:** WORKFLOW_v2.md: Phase 2.2 aufgeteilt in 2.2a (Orchestration), 2.2b (SUB_AUFGABE_*), 2.2c (Assembly + Cross-Konsistenz). Uebersichtsblock, Agentendiagramm und Detail-Sektion aktualisiert. ORCHESTRATOR.md: Phasendiagramm, Phasentabelle und Referenztabelle um Subagenten-Eintraege erweitert. GUETEKRITERIEN_AUFGABEN.md: A4 von "Distractor-Qualitaet (MC)" zu typ-spezifischem Namespace (A4-MC/A4-ZU/A4-LT/A4-RF) erweitert. Neue Sektion 3.4 Pruefinstanz-Zuordnung mit vollstaendiger A1-A15 → Orchestrator/Subagent-Tabelle. AGENT_TECHNIK.md: Typ-Registry-Sektion mit Rendering-Kontrakt-Referenzen auf alle 5 SUB_AUFGABE_*.md.
- **Artefakte:** `docs/architektur/WORKFLOW_v2.md`, `docs/agents/ORCHESTRATOR.md`, `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md`, `docs/agents/AGENT_TECHNIK.md` (alle aktualisiert)
- **Naechster Schritt:** Test-Run: Mappe 1 mit neuer Architektur generieren (v3.7 Verifikation)

### v3.7 Implementierung: 5 SUB_AUFGABE_*.md + AGENT_RAETSEL Orchestrator-Refactoring
- **Phase:** v3.7 (Implementierung)
- **Aufgabe:** Aufgaben-Subagenten-Architektur umsetzen: 5 typ-spezifische Subagenten erstellen, AGENT_RAETSEL von monolithischem Konstrukteur zu Orchestrator refaktorieren, UPGRADE_PLAN Q-Gate-Zuordnung anpassen.
- **Ergebnis:** 5 SUB_AUFGABE_*.md erstellt (MC, Zuordnung, Lueckentext, Reihenfolge, Freitext) mit vollstaendiger Struktur gemaess v3.7-Spec: Rolle + Didaktischer Zweck, Konstruktionsheuristiken (typ-spezifisch), inline Qualitaetskriterien (A4-MC/A4-ZU/A4-LT/A4-RF/A11-FT), Rendering-Kontrakt (data.json Schema + BEM-Klassen + JS-Verhalten), Beispiel mit Q-Gate-Log. AGENT_RAETSEL.md komplett neu geschrieben: Orchestrator-Rolle, Progressionsplan, Operationalisierungsziel-Herleitung, Konstruktionskontext-Template, Dispatch-Logik, Cross-Konsistenz-Pruefungen, Ruecklauf-Mechanismus. UPGRADE_PLAN: A4-Zeile von "NUR SUB_MC" zu typ-spezifischem Namespace erweitert (A4-MC, A4-ZU, A4-LT, A4-RF). MC-Loesungsbeispiel korrigiert (Optionstext statt Buchstabe). QM-Artefakte (Ulrich 2016, Digital lehren/ILIAS, Moodle Fragetypen) ausgewertet — keine GUETEKRITERIEN-Luecken, Erkenntnisse in Konstruktionsheuristiken eingeflossen.
- **Artefakte:** `docs/agents/SUB_AUFGABE_MC.md` (neu), `docs/agents/SUB_AUFGABE_ZUORDNUNG.md` (neu), `docs/agents/SUB_AUFGABE_LUECKENTEXT.md` (neu), `docs/agents/SUB_AUFGABE_REIHENFOLGE.md` (neu), `docs/agents/SUB_AUFGABE_FREITEXT.md` (neu), `docs/agents/AGENT_RAETSEL.md` (komplett refaktoriert), `docs/architektur/UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md` (Q-Gate-Tabelle angepasst)
- **Naechster Schritt:** WORKFLOW_v2.md Phase 2.2 aufteilen, GUETEKRITERIEN_AUFGABEN.md A4-* Mapping, ORCHESTRATOR.md + AGENT_TECHNIK.md Subagenten-Referenzen

### Audit-Evaluation v3.7: 12 Findings bewertet, UPGRADE_PLAN optimiert
- **Phase:** v3.7 (Audit + Optimierung)
- **Aufgabe:** Externes Audit-Report (`docs/analyse/Audit report 3.7.md`) evaluieren. 12 Findings auf Validitaet pruefen, valide Befunde in UPGRADE_PLAN einarbeiten.
- **Ergebnis:** 4 HIGH, 5 MEDIUM, 3 LOW Findings bewertet. 10 eingearbeitet, 2 als Bestaetigungen (kein Handlungsbedarf). Wesentliche Optimierungen: (1) Konstruktionskontext erweitert um Material-Zusammenfassungen und Operationalisierungsziel-Herleitung mit Ableitungsmuster `[AFB-Operator] + [TB-Knoten-Merksatz als Frageform]`. (2) Token-Management-Sektion: Volltext nur fuer Ziel-Material (100-150 Worte), Zusammenfassungen fuer Cross-Consistency. (3) Q-Gate-Zuordnungstabelle A1-A15 → Pruefinstanz (Orchestrator/Subagent/Beide) mit Ruecklauf-Mechanismus (max 2 Re-Dispatches). (4) Zwischenartefakt korrigiert: Subagenten schreiben JSON + .md parallel, kein deterministischer Konversionsschritt. (5) Implicit v3.3-Abhaengigkeit dokumentiert. (6) 3 Edge-Case-Verifikationen ergaenzt. Audit-Protokoll als eigene Sektion im UPGRADE_PLAN.
- **Artefakte:** `docs/architektur/UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md` (erweitert), `docs/analyse/Audit report 3.7.md` (gelesen), `docs/analyse/AUDIT_BRIEFING_v3-7_AUFGABEN_SUBAGENTEN.md` (Referenz)
- **Naechster Schritt:** 5 SUB_AUFGABE_*.md erstellen, AGENT_RAETSEL.md refaktorieren

### v3.7 UPGRADE_PLAN: Aufgaben-Subagenten-Architektur + Zwischenartefakte
- **Phase:** v3.7 (Architektur-Design)
- **Aufgabe:** Fragebogen-Erstellungsprozess verfeinern. AGENT_RAETSEL von monolithisch zu Orchestrator-Pattern refaktorieren (analog AGENT_MATERIAL). 5 typ-spezifische Subagenten (MC, Zuordnung, Lueckentext, Reihenfolge, Freitext) mit eigener didaktischer Expertise, Konstruktionsheuristiken, Guetekriterien und Rendering-Kontrakt. Zwischenartefakte (FRAGEBOGEN_mappe-N.md) als wartbare Inhaltsschicht neben data.json.
- **Ergebnis:** UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md: Phase v3.7 vollstaendig definiert. E7 (Subagenten-Split) + E8 (Zwischenartefakte als Nebenprodukt) entschieden. Phasen-Tabelle, Dependency-Graph, Rollback-Strategie, Q-Gate-Architektur, Offene-Entscheidungen aktualisiert. Domainzugehoerigkeit geklaert: Prompt-Definitionen in Cowork, Ausfuehrung in Claude Code, .md-Zwischenartefakte als Bruecke.
- **Artefakte:** `docs/architektur/UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md` (erweitert)
- **Naechster Schritt:** 5 SUB_AUFGABE_*.md erstellen, AGENT_RAETSEL.md refaktorieren

### Infrastruktur-Aktualisierung: Loesungswort-Mechanismus in allen kanonischen Docs
- **Phase:** Infrastruktur (post-v3.5h)
- **Aufgabe:** Nach erfolgreichem Browser-Review v3.5h: Sicherstellen, dass ALLE kanonischen Docs den neuen Loesungswort-Mechanismus korrekt abbilden. Veraltete `code-eingabe`/`freischalt_buchstabe`-Referenzen eliminieren.
- **Ergebnis:** 6 Docs aktualisiert: AGENT_RAETSEL (freischalt_code Mechanismus-Abschnitt), AGENT_TECHNIK (HTML-Struktur loesungswort-bereich, API-Signaturen, localStorage-Schema), AGENT_DESIGN (BEM-Beispiel `.code__input` → `.loesungscode__titel`), ORCHESTRATOR (Schema-Kommentar zu freischalt_code), ARCHITEKTUR_v1 (code-eingabe → loesungswort-bereich), UPGRADE_PLAN (Loesungswort-Mechanismus + Rollback korrigiert). Verifikations-Grep: 0 veraltete Referenzen in kanonischen Docs.
- **Artefakte:** 6 Docs unter `docs/agents/`, `docs/architektur/` (modifiziert)
- **Naechster Schritt:** Naechstes Escape-Game oder weitere Engine-Verbesserungen

### v3.5h implementiert (Commit d8d67d1)
- **Phase:** v3.5h
- **Aufgabe:** Root-Cause-Fix Loesungswort — `freischalt_buchstabe` existierte NIE in data.json
- **Ergebnis:** Komplett-Redesign: `_aktiviereLoesungswort(mappe)` liest `freischalt_code` direkt aus Mappe-Objekt. Alle Buchstaben erscheinen GLEICHZEITIG nach letzter geloester Aufgabe (Fisher-Yates-Shuffle). DnD positionsbasiert. State-Restore fuer `platzierte_buchstaben`. Browser-Review: funktioniert.
- **Artefakte:** `assets/js/escape-engine.js`, `assets/css/themes/theme-gpg.css`
- **Naechster Schritt:** Infrastruktur-Docs aktualisieren

### v3.5h Uebergabe-Prompt: Loesungswort-Redesign (Root-Cause-Fix)
- **Phase:** v3.5h (Redesign)
- **Aufgabe:** Root-Cause-Analyse nach 4 fehlgeschlagenen Buchstaben-Fix-Versuchen. Ursache: `freischalt_buchstabe` existierte NIE in data.json — war tote Engine-Logik. Konzept komplett umgestellt.
- **Ergebnis:** Neues Loesungswort-Konzept: Kein `freischalt_buchstabe` pro Aufgabe. Buchstaben aus `freischalt_code` (Mappe-Ebene, z.B. "PULVER") abgeleitet. Alle erscheinen GLEICHZEITIG nach letzter geloester Aufgabe in zufaelliger Reihenfolge. DnD-Zuordnung bleibt positionsbasiert. Loesungswort-Bereich initial unsichtbar. Infrastruktur-Docs aktualisiert: AGENT_RAETSEL (neuer Abschnitt "freischalt_code Mechanismus"), UPGRADE_PLAN (veraltete Referenzen korrigiert).
- **Artefakte:** `docs/uebergabe/UEBERGABE_v3-5h_LOESUNGSWORT_REDESIGN.md` (neu), `docs/agents/AGENT_RAETSEL.md` (erweitert), `docs/architektur/UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md` (korrigiert)
- **Naechster Schritt:** Prompt in Claude Code ausfuehren

### v3.5g implementiert (Commit d5f9455)
- **Phase:** v3.5g
- **Aufgabe:** 2 strukturelle Issues aus Browser-Review v3.5f implementiert
- **Ergebnis:** BUG-23: Loesungswort-Sektion als Full-Width-Bereich unterhalb Grid. BUG-24: Volle Antwort-State-Persistenz (MC: selected+eliminated, Zuordnung: mappings, Lueckentext: filled, Reihenfolge: order, Freitext: text). Tipps bei geloesten Aufgaben mit Used-State.
- **Artefakte:** `assets/js/escape-engine.js`, `assets/css/themes/theme-gpg.css`
- **Naechster Schritt:** Browser-Review v3.5g

### v3.5g Uebergabe-Prompt (2 Issues: Loesungswort-Position + Antwort-State-Persistenz)
- **Phase:** v3.5g (strukturell)
- **Aufgabe:** Browser-Review v3.5f — 2 strukturelle Issues: BUG-23 Buchstaben erscheinen weiterhin nicht (Loesungswort aus Fragebogen-Sidebar herausnehmen → eigenstaendige Full-Width-Sektion unterhalb Grid). BUG-24 "Geloest"-Kompaktanzeige zu minimal (voller Antwort-State in localStorage: eliminated options, korrekte Antwort, Tipps-Used, alle 5 Aufgabentypen).
- **Ergebnis:** BUG-23: `.loesungswort-bereich` als neuer Container zwischen Grid und Sicherung. Auto-Scroll nach letzter Aufgabe. Notizbuch-Karo beibehalten. BUG-24: `_saveAntwortState()` / `_loadAntwortState()` pro Aufgabentyp. Typ-Renderer immer aufrufen (kein "Geloest"-Block mehr), bei `geloest===true` State aus localStorage wiederherstellen. Tipps auch bei geloesten Aufgaben rendern mit korrektem Used-State.
- **Artefakte:** `docs/uebergabe/UEBERGABE_v3-5g_LOESUNGSWORT_POSITION_STATE_RESTORE.md` (neu)
- **Naechster Schritt:** Prompt in Claude Code ausfuehren

### v3.5f implementiert (Commit 07192d4)
- **Phase:** v3.5f
- **Aufgabe:** 2 Issues aus Browser-Review v3.5e implementiert
- **Ergebnis:** BUG-21: Aufgabennummern Textmarker-Gelb. BUG-22: freshProgress-Reload in _updateFortschritt + "Geloest"-Kompaktanzeige statt leerer disabled Felder
- **Artefakte:** `assets/js/escape-engine.js`, `assets/css/themes/theme-gpg.css`
- **Naechster Schritt:** Browser-Review v3.5f

### v3.5f Uebergabe-Prompt (2 Issues: State-Restore + Aufgabennummer-Stil)
- **Phase:** v3.5f (Bugfix, strukturell)
- **Aufgabe:** Browser-Review v3.5e — 2 Issues: BUG-21 Aufgabennummern sollen Textmarker-Gelb haben. BUG-22 (strukturell): Buchstaben erscheinen nicht nach Loesung (Stale-Progress in _updateFortschritt) + geloeste Aufgaben visuell leer nach Reload (kein Antwort-State gespeichert).
- **Ergebnis:** BUG-21: CSS-only (.fragebogen .aufgabe__nummer mit Textmarker-Gelb-Hintergrund). BUG-22: Zwei Fixes — (a) freshProgress-Reload in _updateFortschritt vor Buchstaben-Schleife, (b) kompakte "Geloest"-Anzeige (Haekchen + Text) statt leerer disabled Felder bei geloesten Aufgaben. Keine Tipps bei geloesten Aufgaben.
- **Artefakte:** `docs/uebergabe/UEBERGABE_v3-5f_BUGFIX_STATE_RESTORE.md` (neu)
- **Naechster Schritt:** Prompt in Claude Code ausfuehren

### v3.5e implementiert (Commit c4f2906)
- **Phase:** v3.5e
- **Aufgabe:** 3 Issues aus Browser-Review v3.5d implementiert
- **Ergebnis:** DnD-Buchstabenpuzzle (Mouse+Touch, Pool+Zielfelder, positionsbasierte Validierung), Textmarker-Gelb fuer Fragesaetze (inline, box-decoration-break), Tipp-Sequenz (gesperrt bis Vorgaenger aufgedeckt) + gewichteter Counter in .mappe-statistik
- **Artefakte:** `assets/js/escape-engine.js`, `assets/css/themes/theme-gpg.css`
- **Naechster Schritt:** Browser-Review v3.5e

### v3.5e Uebergabe-Prompt (3 Issues: Loesungswort-DnD + Fragesatz-Hervorhebung + Tipp-System)
- **Phase:** v3.5e (Redesign + Enhancement)
- **Aufgabe:** Browser-Review v3.5d — 3 Issues: BUG-18 Loesungswort nicht angezeigt (Redesign als DnD-Buchstabenpuzzle), BUG-19 Fragesaetze visuell nicht unterscheidbar (Textmarker-Stil), BUG-20 Tipp-System (sequentielle Freischaltung + gewichteter Counter)
- **Ergebnis:** BUG-18: Komplett-Redesign — Textfeld+Submit entfaellt, ersetzt durch Zielkaestchen + Buchstaben-Pool mit Drag-and-Drop (Mouse + Touch). Positionsbasierte Validierung. BUG-19: Textmarker-Gelb (halbtransparent, Karo scheint durch), inline + box-decoration-break. BUG-20: Tipp 1 vor 2 vor 3 (gesperrte Buttons), gewichteter Counter (Stufe=Punkte) neben Fehlversuche in `.mappe-statistik`.
- **Artefakte:** `docs/uebergabe/UEBERGABE_v3-5e_LOESUNGSWORT_FRAGESATZ.md` (neu)
- **Naechster Schritt:** Prompt in Claude Code ausfuehren

## 2026-03-28

### v3.5d Bugfix implementiert (Commit bc5a208)
- **Phase:** v3.5d
- **Aufgabe:** 4 Bugs aus dritter Browser-Review gefixt (1 elementar)
- **Ergebnis:** Fehlversuche-System (eliminated-Optionen, globaler Counter, localStorage-persistent, alle 5 Aufgabentypen), Material-Titel statt "M1.2" in Tipps, Tipp-used visuell deutlich (heller Hintergrund, gestrichelter Rand, Haekchen), Loesungswort-Reveal mit staggered Animation + Scroll zu Kaestchen
- **Artefakte:** `assets/js/escape-engine.js`, `assets/css/themes/theme-gpg.css`
- **Naechster Schritt:** Browser-Review v3.5d oder v3.6

### v3.5d Bugfix-Uebergabe-Prompt (4 Bugs, Runde 3)
- **Phase:** v3.5d (Bugfix)
- **Aufgabe:** Dritte Browser-Review — 4 Bugs, davon 1 elementar (Fehlversuche-System)
- **Ergebnis:** BUG-14: Fehlversuche-System statt Aufgaben-Sperre (Eliminated-Optionen, globaler Counter, localStorage-persistent, alle Aufgabentypen). BUG-15: Material-Titel statt "M1.2" in Tipps. BUG-16: Tipp-used visuell deutlich. BUG-17: Loesungswort-Reveal mit Animation + korrektes Scroll-Ziel.
- **Artefakte:** `docs/uebergabe/UEBERGABE_v3-5d_BUGFIX_LAYOUT_3.md` (neu)
- **Naechster Schritt:** Bugfix-Prompt in Claude Code ausfuehren

### v3.5c Bugfix implementiert (Commit 072cbfd)
- **Phase:** v3.5c
- **Aufgabe:** 5 Bugs aus zweiter Browser-Review gefixt
- **Ergebnis:** background-attachment:local, Material-Ref in Tipp 1, Loesungscode-Kaestchen, MC Fisher-Yates Shuffle, Tipp-Pillen + Akkordeon
- **Artefakte:** `assets/js/escape-engine.js`, `assets/css/themes/theme-gpg.css`
- **Naechster Schritt:** Dritte Browser-Review

### v3.5c Bugfix-Uebergabe-Prompt (5 Bugs, Runde 2)
- **Phase:** v3.5c (Bugfix)
- **Aufgabe:** Zweite Browser-Review — 5 weitere Bugs identifiziert, Bugfix-Prompt erstellt
- **Ergebnis:** Bugs: Karo-Hintergrund scrollt mit Seite (→ background-attachment: local), Material-Referenz-Links sollen in Tipp 1 (→ Differenzierung), Loesungscode nicht angezeigt (→ Buchstaben-Kaestchen), MC nicht randomisiert (→ Fisher-Yates Shuffle), Tipp-Buttons zu gross (→ Pillen + Akkordeon)
- **Artefakte:** `docs/uebergabe/UEBERGABE_v3-5c_BUGFIX_LAYOUT_2.md` (neu)
- **Naechster Schritt:** Bugfix-Prompt in Claude Code ausfuehren

### v3.5b Bugfix implementiert (Commit a53c914)
- **Phase:** v3.5b
- **Aufgabe:** 8 Bugs aus erster Browser-Review gefixt
- **Ergebnis:** Material-Flag M1-M9, Phasen-Badge entfernt, Zentrierung + Blocksatz, Karo em-basiert, Typ-Badge entfernt, Nummer nur Zahl, z-index fix fuer Klickbarkeit, Sicherung-Display-Reihenfolge
- **Artefakte:** `assets/js/escape-engine.js`, `assets/css/themes/theme-gpg.css`
- **Naechster Schritt:** Zweite Browser-Review

### v3.5b Bugfix-Uebergabe-Prompt (8 Bugs)
- **Phase:** v3.5b (Bugfix)
- **Aufgabe:** Browser-Review v3.5 durch Lehrkraft — 8 Bugs identifiziert, Bugfix-Prompt erstellt
- **Ergebnis:** Bugs: Material-Fortschritt ueberfluessig (ersetzen durch M1-Flag), Phasenbezeichnung ueberfluessig, fehlende Zentrierung/Blocksatz, Karo-Zoom-Problem (em-basiert loesen), Typ-Badge ueberfluessig, Aufgabennummer-Kreis-Overflow, Aufgaben 1+2 nicht interaktiv, Sicherung vorzeitig sichtbar
- **Artefakte:** `docs/uebergabe/UEBERGABE_v3-5b_BUGFIX_LAYOUT.md` (neu)
- **Naechster Schritt:** Bugfix-Prompt in Claude Code ausfuehren

### v3.5 Layout-Redesign implementiert (Commit 9c6f7e7)
- **Phase:** v3.5
- **Aufgabe:** Uebergabe-Prompt in Claude Code ausgefuehrt
- **Ergebnis:** Grid 2fr/1fr, Fragebogen als sticky Sidebar mit Karo + Lochrand + Architects Daughter, Material-Fortschritt, Aufgaben-Dots. Dateien: theme-gpg.css, escape-engine.js, mappe-1.html.
- **Artefakte:** `assets/css/themes/theme-gpg.css`, `assets/js/escape-engine.js`, `escape-games/gpg-erster-weltkrieg-ursachen/mappe-1.html`
- **Naechster Schritt:** Browser-Review → Bugfixes

### v3.5 Layout-Redesign — Cowork-Vorbereitung
- **Phase:** v3.5 (Layout-Redesign)
- **Aufgabe:** Design-Spec, HTML-Prototyp und Uebergabe-Prompt fuer 2/3-1/3 Grid + Notizbuch-Stil Fragebogen
- **Ergebnis:** Drei Artefakte erstellt. Design-Entscheidungen: Grid 2fr/1fr (Material dominant), Fragebogen als sticky Sidebar mit Arbeitsblatt-Metapher (kariert, Tintenblau #2952A3, Architects Daughter), visuell klar abgegrenzt vom Hefteintrag (liniert, Creme, Caveat/Patrick Hand). Material-Fortschritt per IntersectionObserver, Aufgaben-Dots statt Balken, Ueberleitung-Boxen zentriert mit Pfeil.
- **Artefakte:** `docs/analyse/DESIGN_SPEC_v3-5_LAYOUT_REDESIGN.md` (neu), `docs/analyse/PROTOTYP_v3-5_LAYOUT.html` (neu), `docs/uebergabe/UEBERGABE_v3-5_LAYOUT_REDESIGN.md` (neu)
- **Naechster Schritt:** Uebergabe-Prompt in Claude Code ausfuehren

### ORCHESTRATOR.md Konsistenzfix (A1-A15, SK1-SK15, S1-S15)
- **Phase:** QM-Infrastruktur
- **Aufgabe:** Asymmetrische Q-Gate-Referenzierung in ORCHESTRATOR.md beheben
- **Ergebnis:** Phase-2.2-Box um A1-A15 Q-Gate ergaenzt, Agenten-Tabelle Raetsel-Zeile erweitert, Referenz-Dokumente-Tabelle um GUETEKRITERIEN_AUFGABEN, GUETEKRITERIEN_SKRIPT, GUETEKRITERIEN_SEQUENZIERUNG ergaenzt
- **Artefakte:** `docs/agents/ORCHESTRATOR.md` (aktualisiert)
- **Naechster Schritt:** v3.5 Layout-Redesign

### v3.3b Nachmigration SCPL-Umordnung (Commit 9df75cc)
- **Phase:** v3.3b (Nachmigration)
- **Aufgabe:** Material-Reihenfolge in Mappe 1 data.json nach SCPL-Aufbau umordnen (S14/S15)
- **Ergebnis:** 9 Materialien umgeordnet: Einstieg (pos 1) → S-Phase (pos 2-4) → C-Phase (pos 5-7) → C/P-Uebergang (pos 8-9). Browser-Check bestanden.
- **Artefakte:** `escape-games/gpg-erster-weltkrieg-ursachen/data.json`, `docs/uebergabe/UEBERGABE_v3-3b_NACHMIGRATION_SCPL.md`
- **Naechster Schritt:** v3.4 GUETEKRITERIEN_AUFGABEN.md

### GUETEKRITERIEN_AUFGABEN.md erstellt (A1-A15) + AGENT_RAETSEL Q-Gate
- **Phase:** v3.4 QM-Infrastruktur (Phase 2)
- **Aufgabe:** Fachdidaktische Guetekriterien fuer AGENT_RAETSEL aus Ulrich (2016), LLZ Halle, Rechercheergebnisse Lernziele extrahieren
- **Ergebnis:** 15 Kriterien (7 MUSS, 5 SOLL, 3 KANN). MUSS: AFB-Kongruenz, Fragestaemme-Klarheit, Material-Aufgabe-Kongruenz, Distractor-Qualitaet, Schwierigkeits-Progression, Tipp-Progression, Operator-Praezision. SOLL: Kognitive Aktivierung, TB-Bezug, Typvielfalt, Freitext-Qualitaet, Sachbezogen-vor-Wertbezogen.
- **Artefakte:** `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md` (neu), `docs/agents/AGENT_RAETSEL.md` (Q-Gate), `docs/architektur/WORKFLOW_v2.md` (Phase 2.2 Q-Gate), `docs/architektur/UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md` (A1-A15)
- **Naechster Schritt:** v3.5 Engine-Layout oder Content-Zyklus

### GUETEKRITERIEN_SKRIPT.md erstellt (SK1-SK15) + Infrastruktur-Update
- **Phase:** QM-Infrastruktur (ergaenzt Phase 0.3)
- **Aufgabe:** Fachdidaktische Guetekriterien fuer AGENT_SKRIPT aus 4 Seminar-PDFs (GPG B1, DG B1, GPG GB, GPG B2) extrahieren und in Infrastruktur verankern. Gap-Analyse Q1-Q13 → SK1-SK15.
- **Ergebnis:** 15 Kriterien (7 MUSS, 5 SOLL, 3 KANN). MUSS: Vergegenwärtigung (SK1), Elementarisierung (SK2), Anschaulichkeit (SK3), Strukturiertheit (SK4), Sprachliche Angemessenheit (SK5), Vergegenwärtigung-vor-Besinnung (SK6), Multikausualitaet (SK7). SOLL: Gestaltungsprinzipien-Breite (SK8), Multiperspektivitaet (SK9), Sachbezogene Motivierung (SK10), Dramaturgischer Spannungsbogen (SK11), Sandwich-Qualitaet (SK12). KANN: Gegenwartsprinzip (SK13), Zeitkolorit (SK14), Kontroversitaet (SK15). Operationalisierung mit PASS/FAIL-Mustern. Sektion 4 klaert Verhaeltnis zu Q1-Q13 (operativ vs. fachdidaktisch).
- **Artefakte:** `docs/checklisten/GUETEKRITERIEN_SKRIPT.md` (neu), `docs/agents/AGENT_SKRIPT.md` (Pflicht-Referenz + 2-Stufen-Q-Gate), `docs/architektur/WORKFLOW_v2.md` (SK-Gate in Phase 0.3), `docs/architektur/UPGRADE_PLAN_v3.md` (Datei-Aenderungen), `docs/architektur/UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md` (Q-Gate-Architektur)
- **Naechster Schritt:** Nachmigration Mappe 1 (SCPL-Umordnung)

### GUETEKRITERIEN_SEQUENZIERUNG v1.1: S14/S15 + 2-Anker-Verfahren
- **Phase:** QM-Infrastruktur (ergaenzt Phase 1.5/1.9)
- **Aufgabe:** Nach Browser-Review der v3.3-Migration: Material-Reihenfolge soll SCPL-Sinnstruktur des Tafelbilds und SKRIPT-Absatzfolge entsprechen. Guetekriterien und AGENT_MATERIAL anpassen.
- **Ergebnis:** S14 SCPL-Korrespondenz + S15 Skript-Kongruenz als neue MUSS-Kriterien. Sektion 2.1b mit 3 Ordnungsrahmen und Prioritaetstabelle (SCPL > SKRIPT > Artikulationsschema). AGENT_MATERIAL Aufgabe 1.9 umgeschrieben auf 2-Anker-Verfahren (SKRIPT-Primaer-Anker + SCPL-Kontroll-Anker).
- **Artefakte:** `docs/checklisten/GUETEKRITERIEN_SEQUENZIERUNG.md` (v1.1), `docs/agents/AGENT_MATERIAL.md` (Aufgabe 1.9 Rewrite), `docs/uebergabe/UEBERGABE_v3-3_SEQUENZIERUNG.md` (S1-S15 Update)
- **Naechster Schritt:** Nachmigration Mappe 1 data.json nach SCPL-Aufbau

### v3.3 Material-Sequenzierung (Commit f87dd8b)
- **Phase:** v3.3 (Engine + Migration)
- **Aufgabe:** Schema-Erweiterung (position, didaktische_funktion, voraussetzung, ueberleitung_von, sequenz_kontext), Engine _sortMaterialienByPosition + Ueberleitung-Rendering, Migration Mappe 1
- **Ergebnis:** 9 Materialien mit position 1-9, didaktische Funktionen, Ueberleitungen, Sequenzkontext. Engine sortiert nach position, rendert Ueberleitungsboxen. Template-Schema erweitert.
- **Artefakte:** `escape-games/gpg-erster-weltkrieg-ursachen/data.json` (migriert), `escape-games/template/data.json` (Schema), `assets/js/escape-engine.js` (Sort + Rendering), `assets/css/themes/theme-gpg.css` (.material-ueberleitung)
- **Naechster Schritt:** Browser-Review → Ueberarbeitung Sequenzierung (S14/S15)

### v3.2 Umlaut-Fix umgesetzt (Commit 2561066)
- **Phase:** v3.2 (UTF-8 nativ)
- **Aufgabe:** Alle ASCII-Transliterationen in data.json durch echte UTF-8-Umlaute ersetzen. 8 Agenten-Prompts mit Encoding-Regel v3.2 aktualisieren.
- **Ergebnis:**
  - **Claude Code (Commit 2561066):** 83 Zeilen in `escape-games/gpg-erster-weltkrieg-ursachen/data.json` geaendert. Alle ae→ä, oe→ö, ue→ü Ersetzungen. ss→ß einzeln geprueft (Misstrauen, Gleichgewichtssystem, Buendnissystem behalten ss; Grossmaechte, Grossbritannien, Schiesspulver, Aussenminister bekommen ß). Schema-Feldnamen (ueberleitung, gegenueberstellung) unveraendert. JSON valide, PULVER funktional, 9 Materialien, 5 Aufgaben, 5 Bilder intakt, SCPL-Hefteintrag zeigt echte Umlaute.
  - **Cowork (Agenten-Prompts):** UTF-8-Encoding-Regel in 8 Agenten-Prompts: AGENT_SUB_DARSTELLUNGSTEXT, AGENT_SUB_QUELLENTEXT, AGENT_SUB_TAGEBUCH, AGENT_SUB_ZEITLEISTE (JSON-Encoding v2.1→v3.2), AGENT_SKRIPT, AGENT_TAFELBILD, AGENT_RAETSEL (neue Encoding-Regel-Sektion). AGENT_SUB_BILDQUELLE hatte Regel bereits.
- **Artefakte:** `escape-games/gpg-erster-weltkrieg-ursachen/data.json` (migriert), `docs/uebergabe/UEBERGABE_v3-2_UMLAUT_FIX.md` (erstellt + ausgefuehrt), 8x `docs/agents/AGENT_*.md` (Encoding-Regel)
- **Naechster Schritt:** v3.3 Material-Sequenzierung (Schema-Erweiterung + Engine)

### v3.2-Vorbereitung abgeschlossen: Plan auditiert, Entscheidungen getroffen, Blockier-Aufgaben behoben
- **Phase:** Planung v3.2-v3.6 + Infrastruktur-Vorbereitung
- **Aufgabe:** (1) Upgrade-Plan erstellen + 2x extern auditieren. (2) 6 Entscheidungen (E1-E6) treffen. (3) 3 Blockier-Aufgaben aus finalem Audit beheben.
- **Ergebnis:**
  - **Plan:** 5 Phasen (v3.2-v3.6) mit Abhaengigkeitsgraph, Rollback-Strategie, Migrationstest, Q-Gate-Architektur. 2 Audits (13 + 8 Findings), alle eingearbeitet.
  - **Entscheidungen:** E1 Option A (UTF-8 nativ), E2 Aufgabe 1.9 in AGENT_MATERIAL, E3 Russisch + Arabisch, E4 Copy-to-Clipboard MVP, E5 CSS-only (eigenes Farbschema, Abhebung von Sicherung), E6 User-Gate nach Phase 1.5.
  - **Blockier-Aufgaben:** AGENT_MATERIAL.md: Aufgabe 1.9 Sequenzplanung (Reihenfolge, didaktische Funktion, Voraussetzungen, Ueberleitungen, Sequenzkontext) + 1.10 gemeinsame Praesentation. WORKFLOW_v2.md: Phase 1.5 SEQUENZPLANUNG im Phasendiagramm + Agenten-Reihenfolge. Alle 5 AGENT_SUB_*.md: Sequenzkontext-Pflicht-Input (8-Feld-Tabelle), materialtyp-spezifische Stilregel Sequenz-Kohaerenz, Q-Gate SQ-1 bis SQ-4.
- **Artefakte:** `docs/architektur/UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md` (erstellt + 2x auditiert), `docs/agents/AGENT_MATERIAL.md` (Aufgabe 1.9+1.10), `docs/architektur/WORKFLOW_v2.md` (Phase 1.5), `docs/agents/AGENT_SUB_DARSTELLUNGSTEXT.md` (Sequenzkontext), `docs/agents/AGENT_SUB_QUELLENTEXT.md` (Sequenzkontext), `docs/agents/AGENT_SUB_TAGEBUCH.md` (Sequenzkontext), `docs/agents/AGENT_SUB_ZEITLEISTE.md` (Sequenzkontext), `docs/agents/AGENT_SUB_BILDQUELLE.md` (Sequenzkontext), `docs/projekt/STATUS.md` (aktualisiert)
- **Naechster Schritt:** v3.2 Umlaut-Fix umsetzen (Uebergabe-Prompt an Claude Code)

### Phase v3.1-3: Hefteintrag-Engine durch Claude Code implementiert (Commit 71a5896)
- **Phase:** v3.1-3 (Engine-Integration)
- **Aufgabe:** SCPL-Renderer implementieren, Hefteintrag-Styles, data.json SCPL-Migration
- **Ergebnis:** Claude Code hat Uebergabe-Prompt ausgefuehrt. escape-engine.js: Routing (scpl → _renderHefteintragSCPL, sonst Legacy-SVG), Fachbegriff-Highlighting (rot/blau/gruen), Gegenueberstellung, gelbe Merkbox, Transferfrage ausserhalb, dynamisches Datum. theme-gpg.css: @import Google Fonts, Sektion 17c mit allen Hefteintrag-Klassen + Print. data.json Mappe 1: scpl-Objekt komplett. Bestehende Daten (PULVER, 9 Mat, 5 Aufgaben, 5 Bilder) intakt.
- **Artefakte:** `assets/js/escape-engine.js` (SCPL-Renderer), `assets/css/themes/theme-gpg.css` (Sektion 17c), `escape-games/gpg-erster-weltkrieg-ursachen/data.json` (scpl-Objekt)
- **Naechster Schritt:** v3.1-4 Validierung (Website aufrufen, visueller Check, Print-Test)

### Phase v3.1-3: Uebergabe-Prompt Hefteintrag-Engine erstellt
- **Phase:** v3.1-3 (Engine-Integration)
- **Aufgabe:** Uebergabe-Prompt fuer Claude Code formulieren: CSS-Hefteintrag-Renderer (`_renderHefteintragSCPL()`), SCPL-Routing in `_renderSicherung()`, Hefteintrag-Styles in theme-gpg.css, data.json Mappe 1 SCPL-Migration
- **Ergebnis:** 3 Aenderungspakete definiert: (1) escape-engine.js: Routing + neue Renderer-Funktion mit SCPL-Zonen, Fachbegriff-Hervorhebung, Gegenueberstellung, Merkbox, Transferfrage. (2) theme-gpg.css: Komplette Hefteintrag-Styles (linierter Hintergrund, Caveat/Patrick-Hand-Fonts, gelbe Merkbox, Print). (3) data.json: scpl-Objekt fuer Mappe 1 mit allen SCPL-Zonen. Legacy-Kompatibilitaet erhalten.
- **Artefakte:** `docs/uebergabe/UEBERGABE_v3-1-3_HEFTEINTRAG_ENGINE.md` (neu)
- **Naechster Schritt:** Prompt in Claude Code ausfuehren, dann v3.1-4 (Validierung)

### Phase v3.1-2: Infrastruktur-Update (Schema + Agenten + Workflow)
- **Phase:** v3.1-2 (Schema-Finalisierung)
- **Aufgabe:** SCPL-Learnings in Prozess-Infrastruktur verankern: AGENT_TAFELBILD, Guetekriterien, Workflow, Template-Schema
- **Ergebnis:** AGENT_TAFELBILD.md komplett neu geschrieben (SCPL-Struktur statt Knoten+Verbindungen, Doppelpunkt-Regel, Stilregeln, neues JSON-Schema). GUETEKRITERIEN_TAFELBILD.md: G14 SCPL-Kohaerenz ergaenzt, G13 geschaerft, Output-Format auf SCPL umgestellt. WORKFLOW_v2.md: Schritt 0.4 auf v3.1 aktualisiert. Template data.json: scpl-Schema ergaenzt. Alle G1-G13-Referenzen auf G1-G14 korrigiert (AGENT_MATERIAL, WORKFLOW).
- **Artefakte:** `docs/agents/AGENT_TAFELBILD.md` (Rewrite), `docs/checklisten/GUETEKRITERIEN_TAFELBILD.md` (G14+Output), `docs/architektur/WORKFLOW_v2.md` (Schritt 0.4), `escape-games/template/data.json` (scpl-Schema), `docs/agents/AGENT_MATERIAL.md` (G1-G14)
- **Naechster Schritt:** Phase v3.1-3 (Engine-Integration via Uebergabe-Prompt)

### Phase v3.1-1: Hefteintrag-Design finalisiert (Prototyp rev3 + SCPL)
- **Phase:** v3.1-1 (Design + Prototyp)
- **Aufgabe:** Prototyp ueberarbeiten basierend auf User-Feedback, SCPL-Framework evaluieren
- **Ergebnis:** 3 Prototyp-Iterationen (rev1→rev2→rev3). Rev3: 7 Vereinfachungen (keine Metadaten, dynamisches Datum, Fachbegriffe per Doppelpunkt statt Klammern, Pfeile nur Symbol, Linien-Alignment auf 32px-Raster, Merkbox gelb ohne Label, Transferfrage ausserhalb). SCPL-Framework evaluiert und als Leitstruktur uebernommen (7/8 empirische TBs mappbar). Designentscheidung-Dokument mit finalen Entscheidungen aktualisiert.
- **Artefakte:** `docs/analyse/PROTOTYP_HEFTEINTRAG_v3-1_rev3.html` (final), `docs/architektur/EVALUATION_SCPL_HEFTEINTRAG.md` (neu), `docs/architektur/DESIGNENTSCHEIDUNG_v3-1_HEFTEINTRAG.md` (aktualisiert)
- **Naechster Schritt:** Phase v3.1-2 (Schema-Finalisierung)

### Phase v3-4: Uebergabe-Prompt Engine-Erweiterung formuliert
- **Phase:** v3-4 (Engine-Erweiterung)
- **Aufgabe:** Aenderungsbedarf fuer v3-Tafelbild-Features in Engine analysieren, Uebergabe-Prompt fuer Claude Code schreiben
- **Ergebnis:** Bestandsaufnahme escape-engine.js (Tafelbild-Renderer Z.965-1238, Sicherung-Renderer Z.910-950), theme-gpg.css (1055 Zeilen, Print Z.1031-1055), data.json Template + Testdaten. 4 Aenderungspakete definiert: (1) escape-engine.js: 4 neue Render-Bloecke in _renderSicherung() fuer merksatz, kernerkenntnisse, hefteintrag_verweis, reflexionsimpuls. (2) theme-gpg.css: Bildschirm-Styles + Print-Styles fuer neue Sicherungs-Elemente. (3) data.json Template: Schema um merksatz (Knoten), kernerkenntnisse (Tafelbild), hefteintrag_verweis + reflexionsimpuls (Sicherung). (4) Testdaten Mappe 1 mit Beispielwerten. Fallback-Logik fuer kernerkenntnisse (Sicherung- oder Tafelbild-Ebene) dokumentiert. Abwaertskompatibilitaet sichergestellt.
- **Artefakte:** `docs/uebergabe/UEBERGABE_v3-4_ENGINE_ERWEITERUNG.md` (neu), `docs/architektur/UPGRADE_PLAN_v3.md` (v3-4 Status aktualisiert), `docs/projekt/STATUS.md` (aktualisiert)
- **Naechster Schritt:** Prompt in Claude Code ausfuehren, dann Phase v3-5 (Validierung an Mappe 1)

### Audit-Remediation v3-3: 7 Findings behoben (CONDITIONAL GO → GO)
- **Phase:** v3-3 Audit-Remediation
- **Aufgabe:** Externen Audit-Report (27 Findings, 4 HIGH) evaluieren und valide Findings beheben
- **Ergebnis:** 7 Fixes: AGENT_MATERIAL Q-Gate Design-Modus: TB-Struktur-Checks durch TB-Abdeckungs-Checks ersetzt (#11/#12). W-8 "Iterieren bis Verifizierung bestanden" durch "[TB-REVISION NOETIG] markieren, an User eskalieren" ersetzt (#13). Abschnitt 2.4 JSON-Template: merksatz pro Knoten, kernerkenntnisse[], hefteintrag_verweis, reflexionsimpuls ergaenzt (#26). Output-Verweis von WORKFLOW_v1 Abschnitt 5 auf WORKFLOW_v2 (v3) Abschnitt 5 korrigiert (#15). WORKFLOW_v2.md: Abschnitt-Titel "v2" → "v3" (#2/#3). UPGRADE_PLAN Abschnitt 7: "WORKFLOW_v3.md NEU" → "WORKFLOW_v2.md (v3) IN-PLACE" (#1). 4 Findings als nicht-valide oder pre-existent eingestuft (#4/#5 ORCHESTRATOR Schema = Convenience-Abdruck, #14 V1-Kanonizitaet beabsichtigt, #21-23 ARTEFAKT-Luecke pre-existent).
- **Artefakte:** `docs/agents/AGENT_MATERIAL.md`, `docs/architektur/WORKFLOW_v2.md`, `docs/architektur/UPGRADE_PLAN_v3.md`, `docs/analyse/Audit-Report v3-3 — WORKFLOW + AGENT_MATERIAL + ORCHESTRATOR.md`, `docs/analyse/AUDIT_BRIEFING_v3-3.html`
- **Naechster Schritt:** Phase v3-4: Engine-Erweiterung (Claude Code)

## 2026-03-26
### Phase v3-3 abgeschlossen: WORKFLOW + AGENT_MATERIAL + ORCHESTRATOR auf v3-Pipeline aktualisiert
- **Phase:** v3-3
- **Aufgabe:** Drei Kerndokumente fuer v3-Pipeline aktualisieren: Phase 0.4 AGENT_TAFELBILD in Workflow einfuegen, AGENT_MATERIAL auf fixiertes TB umstellen, ORCHESTRATOR auf 8-Agenten-Sequenz aktualisieren
- **Ergebnis:** WORKFLOW_v2.md → v3: Header, Phasenstruktur (Phase 0.4 eingefuegt), Agenten-Rollen (TAFELBILD hinzugefuegt), Phase 0.3 SKRIPT (kein TB-Entwurf, 600-900W), neuer Schritt 0.4 (AGENT_TAFELBILD komplett), Phase 1 MATERIAL (TB fixiert, Sicherung = Hefteintrag-Verweis), Q-Gate SKRIPT (TB-Check entfernt). AGENT_MATERIAL.md: Rolle auf v3, TAFELBILD als Eingabe, Aufgabe 1.1 → TB-Abdeckungs-Verifizierung (TB-FREEZE statt TB-Detaillierung), Materialtyp-Auswahllogik auf v3, Aufgabe 1.5 → Erarbeitbarkeits-Dokumentation (3-Schritt statt 5-Schritt), Sicherung → Hefteintrag-Verweis + Reflexionsimpuls, Produktions-Modus 2.2 → TB uebernehmen statt produzieren (merksatz + kernerkenntnisse). ORCHESTRATOR.md: v3-Header, 8 Agenten, Phase 0.4 im Workflow-Diagramm, Ausfuehrungsorte ergaenzt, Ruecklauf-Zuordnung (AGENT_TAFELBILD), Agenten-Tabelle + Referenz-Dokumente aktualisiert. UPGRADE_PLAN_v3.md: v3-1/v3-2/v3-3 als abgeschlossen markiert, stale "0.2c" → "0.4" korrigiert, Naechster Schritt → v3-4.
- **Artefakte:** `docs/architektur/WORKFLOW_v2.md` (v3), `docs/agents/AGENT_MATERIAL.md` (v3), `docs/agents/ORCHESTRATOR.md` (v3), `docs/architektur/UPGRADE_PLAN_v3.md` (v3-3 abgeschlossen)
- **Naechster Schritt:** Phase v3-4: Engine-Erweiterung (Claude Code) — Uebergabe-Prompt formulieren

### Architektur-Revision: TB nach SKRIPT + Phase v3-2 AGENT_SKRIPT angepasst
- **Phase:** Architektur-Revision + v3-2
- **Aufgabe:** Pipeline-Reihenfolge revidieren (TB nach SKRIPT statt vor SKRIPT), alle betroffenen Dateien aktualisieren, AGENT_SKRIPT fuer v3 anpassen
- **Ergebnis:** Neue Pipeline: DIDAKTIK → INHALT → ARTEFAKT → SKRIPT → TAFELBILD (Phase 0.4) → MATERIAL. Begruendung (E5): (1) Erarbeitbarkeit gegen didaktisierten SKRIPT pruefen statt gegen Roh-Fakten. (2) SKRIPT schreibt frei, TB extrahiert Quintessenz. (3) Material basiert auf SKRIPT — TB-Erarbeitbarkeit natuerlich gegeben. (4) Naeher am realen Unterrichtsprozess. AGENT_SKRIPT v3: Aufgabe 5 (TB-Entwurf) entfaellt, Wortbudget 600-900 W/Chunk (erhoehte Substanz fuer TB-Extraktion + Material-Ableitung), Q6 entfaellt. AGENT_TAFELBILD revidiert: Primaerquelle SKRIPT statt INHALTSBASIS, skript_referenz direkt bei Erstellung, Erarbeitbarkeits-Entscheidungsbaum gegen SKRIPT. GUETEKRITERIEN G3 auf SKRIPT umgestellt. UPGRADE_PLAN: E1/E2 revidiert, E5 neu (Pipeline-Entscheidung), Risiken + TB-Governance aktualisiert.
- **Artefakte:** `docs/architektur/UPGRADE_PLAN_v3.md` (revidiert), `docs/agents/AGENT_TAFELBILD.md` (revidiert), `docs/agents/AGENT_SKRIPT.md` (v3-Update), `docs/checklisten/GUETEKRITERIEN_TAFELBILD.md` (G3 revidiert)
- **Naechster Schritt:** Phase v3-3: WORKFLOW + AGENT_MATERIAL + ORCHESTRATOR anpassen

### Phase v3-1 abgeschlossen + Audit-Remediation: AGENT_TAFELBILD.md + 6 Audit-Fixes
- **Phase:** v3-1 (AGENT_TAFELBILD erstellen) + Audit-Remediation
- **Aufgabe:** (1) AGENT_TAFELBILD.md als eigenstaendigen Agenten-Prompt schreiben. (2) Externen Audit der 3 v3-Dateien durchfuehren. (3) Alle Audit-Befunde beheben.
- **Ergebnis:** AGENT_TAFELBILD.md erstellt: Rolle (Sicherungsarchitekt), 6 Aufgaben (Kernerkenntnisse → Ordnungsmuster → Knoten → Erarbeitbarkeit → Hefteintrag → Q-Gate), dualer Output (JSON + Hefteintrag), Schnittstellen zu 6 Agenten. Audit-Briefing geschrieben, Audit durchgefuehrt (8 Dimensionen, A1-A8). Ergebnis: CONDITIONAL GO mit 2 BLOCKER + 3 HIGH + 1 MEDIUM. Alle 6 behoben: BLOCKER-1: Q-Gate-Operationalisierung mit maschinell pruefbarer Logik pro G1-G13 (neuer Abschnitt 8 in GUETEKRITERIEN). BLOCKER-2: Erarbeitbarkeits-Entscheidungsbaum DIRECT/ARTIFACT/INFERENTIAL/UNKLAR in AGENT_TAFELBILD Aufgabe 4. HIGH-1: Voraussetzungs-Sequenzierung praezisiert (Mappe 1 leer, Mappe 2+ nur N-1, Wiederholungsregel). HIGH-2: AGENT_SKRIPT v3-Aenderungen in UPGRADE_PLAN Phase v3-2 dokumentiert (skript_referenz, merksatz-Integration, Abgleich-Tabelle). HIGH-3: TB-Revisions-Governance in UPGRADE_PLAN (Freeze-Regel, Eskalationspfad). MEDIUM: Q/G-Nummerierung bereinigt, kernerkenntnisse vs merksatz Definition geklaert.
- **Artefakte:** `docs/agents/AGENT_TAFELBILD.md` (neu + Audit-Fix), `docs/checklisten/GUETEKRITERIEN_TAFELBILD.md` (Audit-Fix: Abschnitt 8 Q-Gate-Operationalisierung), `docs/architektur/UPGRADE_PLAN_v3.md` (Audit-Fix: Phase v3-2 Detail, TB-Governance, Q/G-Bereinigung), `docs/analyse/AUDIT_BRIEFING_v3_TAFELBILD.md` (neu)
- **Naechster Schritt:** Phase v3-2: AGENT_SKRIPT.md anpassen

### Phase v3-0 abgeschlossen: GUETEKRITERIEN_TAFELBILD.md empirisch fundiert
- **Phase:** v3-0 (Artefakt-Auswertung Guetekriterien)
- **Aufgabe:** Primaerquellen zu Tafelbild-Guetekriterien auswerten, empirische Muster extrahieren, kanonisches Referenzdokument schreiben
- **Ergebnis:** 3 Quellen ausgewertet: (1) DG B2 Tafelbild.pdf — 10 Grundsaetze (Reduktion, Lernziel-Kongruenz, Uebersichtlichkeit, Strukturierung, Rekapitulierbarkeit etc.), Leitsatz "TB + Hefteintrag = bleibende Lernessenz". (2) 8 Excalidraw-TBs aus Silas' 1.WK-Sequenz — Durchschnitt 9,25 Elemente, 60% Saetze / 40% Schlagwoerter, 3 Ordnungsmuster (kausal 50%, kategorial 37,5%, chronologisch 12,5%), Merksaetze in 6/8 TBs. (3) 8 Verlaufsplaene — TB entsteht in Sicherungsphase (7-12 min), Material-Kategorien spiegeln 1:1 TB-Struktur, kollaborative Lehrkraft-geleitete Entwicklung. Synthese: 13 gewichtete Kriterien (G1-G13: 6 MUSS, 4 SOLL, 3 KANN), Design-Inversion begruendet (Backward Design), duales Output-Format (JSON + Hefteintrag 80-120W), Q-Gate-Protokoll. UPGRADE_PLAN_v3.md aktualisiert: E1-E3 entschieden.
- **Artefakte:** `docs/checklisten/GUETEKRITERIEN_TAFELBILD.md` (neu), `docs/architektur/UPGRADE_PLAN_v3.md` (aktualisiert: Phase v3-0 als abgeschlossen, Entscheidungen E1-E3 getroffen)
- **Naechster Schritt:** Phase v3-1: AGENT_TAFELBILD.md schreiben

## 2026-03-25
### v3-Planung: Tafelbild-Professionalisierung — UPGRADE_PLAN_v3.md erstellt
- **Phase:** v3-Planung (Scope + Architektur)
- **Aufgabe:** Ist-Analyse Tafelbild in v2.1, v3-Scope evaluieren, Umsetzungsplan schreiben
- **Ergebnis:** UPGRADE_PLAN_v3.md erstellt. Kernentscheidungen: (1) AGENT_TAFELBILD als eigenstaendiger Agent in Phase 0.2c (zwischen ARTEFAKT und SKRIPT). (2) Duale Repraesentation: JSON (knoten[] + verbindungen[] + merksatz + kernerkenntnisse[]) fuer Engine + Hefteintrag-Text (~halbe DIN-A5, max. 120W) fuer Analogtransfer. (3) Tafelbild als Zielstruktur — SKRIPT erhaelt es als Eingabe. (4) Guetekriterien empirisch fundiert (DG B2 + 190 Hefteintrag-Beispiele + User-Artefakte). (5) 5-Phasen-Umsetzungsplan (v3-0 bis v3-5). 4 offene Entscheidungen (E1-E4).
- **Artefakte:** `docs/architektur/UPGRADE_PLAN_v3.md` (neu)
- **Naechster Schritt:** Phase v3-0: DG B2 Tafelbild.pdf auswerten → GUETEKRITERIEN_TAFELBILD.md

### Infrastruktur v2.1: 7 Learnings eingearbeitet (WORKFLOW + Subagenten + Template)
- **Phase:** Infrastruktur-Update (v2.0 → v2.1)
- **Ausloeser:** Claude Code Commit 5153466 (Mappe 1 v2, 9 Materialien, 5 Bilder self-hosted) — Rueckmeldung mit 7 Prozess-Abweichungen: curl blocked (→ Python urllib), Q-Gates nicht formal dokumentiert, Subagenten nicht als separate Iterationen, ARTEFAKT_INVENTAR nicht gelesen, JSON-Fehler durch deutsche typografische Anfuehrungszeichen.
- **Ergebnis:** WORKFLOW_v2.md auf v2.1 aktualisiert (7 Learnings L1-L7 dokumentiert, Phase 0 Pipeline: DIDAKTIK→INHALT→ARTEFAKT→SKRIPT, Phase 2.0 Bild-Download vor Material-Produktion, Python-urllib-Methode als verbindlich, Q-Gate-Log-Format, JSON-Validierung als Pflichtschritt, Quellenangaben-Workaround via cite-Einbettung). Alle 5 Subagenten-Prompts (SUB_DARSTELLUNGSTEXT, SUB_QUELLENTEXT, SUB_TAGEBUCH, SUB_ZEITLEISTE, SUB_BILDQUELLE) um JSON-Encoding-Regeln und cite-Einbettung erweitert. AGENT_ARTEFAKT Self-Hosting-Sektion auf Python/urllib-Methode aktualisiert. Standardisiertes Uebergabe-Template v2.1 erstellt (Platzhalter-basiert, wiederverwendbar fuer beliebige Games/Mappen, 10 Erfolgskriterien inkl. Q-Gate-Log + JSON-Validierung).
- **Artefakte:** `docs/architektur/WORKFLOW_v2.md` (v2.1, Header + Section 1b + Phase 2.0 + Phase 2.1 erweitert), `docs/agents/AGENT_ARTEFAKT.md` (Self-Hosting Python-Download verbindlich), `docs/agents/AGENT_SUB_DARSTELLUNGSTEXT.md` + `AGENT_SUB_QUELLENTEXT.md` + `AGENT_SUB_TAGEBUCH.md` + `AGENT_SUB_ZEITLEISTE.md` + `AGENT_SUB_BILDQUELLE.md` (alle: JSON-Encoding-Regeln + cite-Einbettung), `docs/uebergabe/UEBERGABE_TEMPLATE_v2.1.md` (neu, standardisiertes Template)
- **Offene Blocker:** quellenangaben[] Engine-Support fehlt (Workaround: cite-Einbettung in inhalt-HTML). Flowcharts (mermaid) veraltet.
- **Naechster Schritt:** v3-Optimierungen planen ODER Mappe 2 mit v2.1-Pipeline produzieren.

### Mappe 1 v2 deployed: 9 Materialien, 5 Bilder self-hosted (Commit 5153466)
- **Phase:** Phase 2.1 v2 (Material-Produktion mit verbesserter Pipeline)
- **Aufgabe:** Uebergabe-Prompt v2 (UEBERGABE_Phase2-1_v2_Mappe1.md) in Claude Code ausfuehren — 9 Materialien, Self-Hosting als Schritt 0, Q-Gates
- **Ergebnis:** 9/9 Materialien PASS. Self-Hosting: 5 Bilder heruntergeladen (urllib mit Bot-User-Agent, 2s Delays) → `assets/img/gpg-erster-weltkrieg-ursachen/`. Neue Artefakte erfolgreich eingebunden: img-1-3 Bismarck-Buendniskarte, img-1-4 Rhodes Colossus, img-1-5 2nd Battle Squadron. Artefakte laden auf Website. Abweichungen vom Prozess: curl blockiert → urllib-Fix ad hoc, Q-Gates nicht separat dokumentiert, ARTEFAKT_INVENTAR nicht gelesen, JSON-Fehler durch typografische Anfuehrungszeichen (3 Validierungsfehler behoben).
- **Artefakte:** `escape-games/gpg-erster-weltkrieg-ursachen/data.json` (9 Materialien v2), `assets/img/gpg-erster-weltkrieg-ursachen/` (5 selbstgehostete Bilder), Commit 5153466
- **Naechster Schritt:** Learnings in Infrastruktur einarbeiten (→ v2.1)

### ARTEFAKT_INVENTAR Mappe 1 + Uebergabe-Prompt v2
- **Phase:** Phase 0.2b (AGENT_ARTEFAKT) + Phase 2.1 Vorbereitung
- **Aufgabe:** AGENT_ARTEFAKT ausfuehren (artikelstrukturierte Sichtung fuer Mappe 1), ARTEFAKT_INVENTAR schreiben, Uebergabe-Prompt v2 erstellen
- **Ergebnis:** 4 Artikel gesichtet (Causes of WWI, Triple Alliance, Triple Entente, Imperialism) → 67 Bilder → 5 QUALIFIZIERT + 2 RESERVE. Neue Artefakte: Bismarck-Buendniskarte (Kartenvergleich), Rhodes Colossus (Karikatur-Analyse), 2nd Battle Squadron (Flottenrivalitaet). Uebergabe-Prompt v2: 9 Materialien, 5 Aufgaben, Self-Hosting-Download als Schritt 0.
- **Artefakte:** `docs/agents/artefakte/ARTEFAKT_INVENTAR_gpg-erster-weltkrieg-ursachen.md` (neu), `docs/uebergabe/UEBERGABE_Phase2-1_v2_Mappe1.md` (neu)
- **Naechster Schritt:** Uebergabe in Claude Code ausfuehren

### Artefakt-Pipeline-Redesign: AGENT_ARTEFAKT + Self-Hosting
- **Phase:** Pipeline-Architektur (Phase 0 Erweiterung)
- **Ausloeser:** Wikimedia 429-Fehler auf deployed Mappe 1 (upload.wikimedia.org/thumb/ CDN-Throttling seit Dez 2025). User-Anforderung: Artefakte entlang Wikipedia-Artikelstruktur sichten statt Freitext-Suche.
- **Diagnose:** (1) Wikipedia MCP `get_article` liefert KEINE Bild-/File-Referenzen (werden gestrippt). (2) MediaWiki API via `markdownify` als Proxy funktioniert: `action=parse&section=N&prop=images` liefert sektionsbasierte Bildlisten, `action=query&prop=imageinfo` liefert URLs + Lizenzen + Metadaten.
- **Ergebnis:** AGENT_ARTEFAKT als neuer Agent (Phase 0, Schritt 2b) zwischen AGENT_INHALT und AGENT_SKRIPT. Kernprinzip: Strukturierte Sichtung entlang Artikel-Sektionen, kein `wikimedia_search_images` als Primaermethode. Output: ARTEFAKT_INVENTAR mit qualifizierten Artefakten + Self-Hosting-Daten. SUB_BILDQUELLE auf Self-Hosting umgestellt (lokale Pfade `assets/img/{game-id}/` statt Wikimedia-CDN-URLs). WORKFLOW_v2 erweitert: Phase 0.2a (INHALT) / 0.2b (ARTEFAKT) Trennung.
- **Artefakte:** `docs/agents/AGENT_ARTEFAKT.md` (neu), `docs/architektur/WORKFLOW_v2.md` (erweitert: Phase 0.2b, Abgrenzungstabelle, Referenz-Dokumente), `docs/agents/AGENT_SUB_BILDQUELLE.md` (angepasst: Self-Hosting-Pfade, ARTEFAKT_INVENTAR-Integration)
- **Naechster Schritt:** Mappe 1 Bilder self-hosten → Mappe 2 mit neuer Pipeline

### Phase 2.1 Prototyp Mappe 1: Deployed (Commit a2b572e)
- **Phase:** Phase 2.1 (Material-Produktion mit Subagenten)
- **Aufgabe:** 6 Materialien fuer Mappe 1 mit Subagenten-Prompts produzieren, data.json assemblieren, auf weitergehts.online deployen
- **Ergebnis:** 6/6 Materialien PASS (mat-1-1 darstellungstext ~130W Q1-10 PASS, mat-1-2 karte Wikimedia CC-BY-SA 2.5 PASS, mat-1-3 zeitleiste 5 Eintraege Leitfrage PASS, mat-1-4 quellentext Buelow-Zitat blockquote PASS, mat-1-5 bildquelle Wilhelm II. 440px PASS, mat-1-6 tagebuch Diplomat ~115W Fiktion-Kennzeichnung PASS). Tafelbild 7 Knoten 6 Verbindungen. 3 Stub-Aufgaben (2x MC + 1x Lueckentext, Code PULVER). Engine-Inkompatibilitaet: quellenangaben[] nicht unterstuetzt → weggelassen (kein Breaking Change).
- **Artefakte:** `escape-games/gpg-erster-weltkrieg-ursachen/data.json` (komplett neu, v2-Inhalte), Commit a2b572e
- **Naechster Schritt:** Visuelles Review auf weitergehts.online → Findings → Entscheidung Prozess-Anpassung vs. Mappe 2

## 2026-03-24
### Subagenten-Architektur implementiert + Uebergabe-Prompt Mappe 1
- **Phase:** Phase 2.1 (Material-Produktion)
- **Aufgabe:** (1) Materialtyp-Subagenten als eigenstaendige Agenten-Prompts implementieren, (2) WORKFLOW_v2 um Phase 2.1/2.2/2.3 erweitern, (3) Uebergabe-Prompt nur Mappe 1 mit Subagenten-Referenz
- **Ergebnis:** 5 Subagenten-Prompts erstellt: SUB_DARSTELLUNGSTEXT (Sachtext, Sprachregister R7, Q1-Q10), SUB_QUELLENTEXT (Dreischritt Einleitung-Wortlaut-Impuls, Originalnaehe + Paraphrase, Q1-Q10), SUB_TAGEBUCH (Figurkonstruktion, historische Plausibilitaet, Ueberwaetigungsverbot, Perspektivitaet, Q1-Q12), SUB_ZEITLEISTE (Didaktische Reduktion max. 8 Eintraege, Leitfrage als Ueberschrift, Ankerpunkte, Q1-Q10), SUB_BILDQUELLE (URL-Verifikation, Dreifach-Bildunterschrift Identifikation+Kontext+Impuls, Lizenz-Check, Q1-Q10). WORKFLOW_v2.md: Phase 2 aufgeteilt in 2.1 (Subagenten), 2.2 (AGENT_RAETSEL), 2.3 (Assembly). Dispatch-Ablauf + Engine-Typ-Mapping dokumentiert. Uebergabe-Prompt Mappe 1 erstellt (UEBERGABE_Phase2-1_PROTOTYP_Mappe1.md) — reduziert auf Mappe 1 (Scope-Entscheidung: Token sparen), 6 Materialien mit Subagenten-Dispatch, 3 Stub-Aufgaben fuer Prototyp.
- **Artefakte:** `docs/agents/AGENT_SUB_DARSTELLUNGSTEXT.md` (neu), `docs/agents/AGENT_SUB_QUELLENTEXT.md` (neu), `docs/agents/AGENT_SUB_TAGEBUCH.md` (neu), `docs/agents/AGENT_SUB_ZEITLEISTE.md` (neu), `docs/agents/AGENT_SUB_BILDQUELLE.md` (neu), `docs/architektur/WORKFLOW_v2.md` (erweitert: Phase 2.1-2.3, Subagenten-Tabelle, Dispatch-Ablauf, Engine-Typ-Mapping, Referenz-Dokumente), `docs/uebergabe/UEBERGABE_Phase2-1_PROTOTYP_Mappe1.md` (neu, ersetzt UEBERGABE_Phase2_PROTOTYP_Mappen1-2.md)
- **Naechster Schritt:** Claude Code: Uebergabe-Prompt ausfuehren → Prototyp deployen → visuelles Review

### MATERIAL_GERUEST Mappen 1+2 validiert + Phase 2 Prototyp-Uebergabe
- **Phase:** Phase 1 → Phase 2 Uebergang
- **Aufgabe:** (1) MATERIAL_GERUEST Mappe 1 User-Validierung, (2) MATERIAL_GERUEST Mappe 2 erstellen + User-Validierung, (3) Prototyp-Deployment vorbereiten
- **Ergebnis:** Mappe 1 PASS (User-Validierung). Mappe 2 erstellt (6 Materialien: darstellungstext, 2 bildquellen Beltrame/Franz Ferdinand, quellentext Ultimatum, zeitleiste Julikrise, tagebuch Bewohner:in Sarajevo; Tafelbild 6 Knoten + Cross-Chunk-Rueckbezug k2-2→k1-1). Mappe 2 PASS (User-Validierung). Entscheidung: Vor Mappen 3+4 Website-Prototyp deployen — visuelles Review, Bug-Erkennung, Prozess-Schaerfung. Uebergabe-Prompt erstellt mit 10 Schritten: data.json v2-Inhalte, Materialtyp-Mapping (tagebuch→quellentext, karte→bildquelle), 3 Stub-Aufgaben pro Mappe, Tafelbild-Struktur, Wikimedia-Verifikation, Engine-Kompatibilitaetspruefung, v1-Artefakte aufraeumen.
- **Artefakte:** `docs/agents/artefakte/MATERIAL_GERUEST_gpg-erster-weltkrieg-ursachen_Mappe2.md` (neu), `docs/uebergabe/UEBERGABE_Phase2_PROTOTYP_Mappen1-2.md` (neu), `docs/projekt/STATUS.md` (aktualisiert)
- **Naechster Schritt:** Claude Code: Uebergabe-Prompt ausfuehren → Prototyp deployen → visuelles Review

## 2026-03-23
### Workflow-Optimierung: Artefakt-Kette + Aufgaben-Timing + Agenten-Updates
- **Phase:** Phase 1 (Prozesskorrektur nach Mappe-1-Erstdurchlauf)
- **Aufgabe:** Workflow-Infrastruktur optimieren basierend auf 5 identifizierten Prozess-Defiziten: (1) Aufgaben-Skizze in Phase 1 zu frueh, (2) INHALTSBASIS-Bilder nicht funktional, (3) keine Zitat-Extraktion, (4) Reporter-Rolle ueberschneidet Zeitungsartikel-Materialtyp, (5) Artefakte nicht im SKRIPT eingebettet
- **Ergebnis:** WORKFLOW_v2.md: Phase 0.2 um 3 Aufgaben erweitert (Wikimedia funktional, Zitate, Rollenprofile), INHALTSBASIS-Template mit 3 neuen Sektionen (Wikimedia-Artefakte mit Dateiname/Lizenz/Einbettungsvorschlag, Zitate mit Sprecher/Wortlaut/Kontext, Rollenprofile mit historischer Basis). Phase 0.3 um Aufgabe 3 erweitert (Artefakte positionieren), SKRIPT-Template um Artefakt-Zuordnungstabelle und [ARTEFAKT]-Marker, Qualitaets-Gate +3 Pruefpunkte. Phase 1 auf inkrementell pro Mappe umgestellt, Aufgaben-Skizze entfernt, Artefakt-Ref-Spalte im Material-Entwurf. AGENT_SKRIPT.md: Neue Aufgabe 6 (Artefakt-Einbettung mit Positionierungsregeln), Q11-Q13 im Qualitaets-Gate, Eingabe-Tabelle erweitert, Ausgabe-Template mit Artefakt-Zuordnung. AGENT_MATERIAL.md: v2-Eingabe (SKRIPT statt inhalts_md/game_blueprint), Aufgabe 1.3 (Aufgaben-Skizze) entfaellt in Phase 1, Abdeckungs-Check und Zielklarheit-Pruefung auf Artefakt-Ref umgestellt, alle Referenzen v1→v2 migriert.
- **Artefakte:** `docs/architektur/WORKFLOW_v2.md` (7 Edits), `docs/agents/AGENT_SKRIPT.md` (4 Edits), `docs/agents/AGENT_MATERIAL.md` (8 Edits)
- **Naechster Schritt:** INHALTSBASIS Mappe 1 nachbessern (Claude Code), SKRIPT Chunk 1 ueberarbeiten, MATERIAL_GERUEST Mappe 1 ueberarbeiten

## 2026-03-18
### Prozessredesign v1 → v2: Wikipedia-Anker + Skript-Artefakt + Subagenten
- **Phase:** Phase 3.2 Prozessredesign
- **Aufgabe:** (1) MCP-Tool-Pool evaluieren/dokumentieren, (2) Materialtyp-Workflows implementieren, (3) Testmappe v1.1 testen, (4) Prozessredesign evaluieren/entscheiden
- **Ergebnis:** MCP_TOOLS.md v2 (30+ Tools, 6 Kategorien). AGENT_MATERIAL.md mit W-1 bis W-8 Workflows. Testmappe-v1.1-Versuch abgebrochen — 3 strukturelle Probleme identifiziert (Token-Ineffizienz, fehlende Zielklarheit, blinde Recherche). Prozessredesign entschieden: Wikipedia-MCP als Inhaltsanker, neuer AGENT_SKRIPT (Jugendsachbuch-Stil), Subagenten pro Materialtyp. Flowcharts erstellt (Status Quo + Neuausrichtung). 3 neue MCP-Tools installiert (QuickChart, Mermaid Chart, svg-converter). Wikipedia-MCP installiert.
- **Artefakte:** `docs/checklisten/MCP_TOOLS.md` (v2, komplett neu), `docs/agents/AGENT_MATERIAL.md` (W-1 bis W-8), `docs/architektur/flowchart-status-quo.mermaid` (neu), `docs/architektur/flowchart-neuausrichtung.mermaid` (neu), `docs/projekt/STATUS.md` (Prozessredesign-Entscheidung dokumentiert)
- **Naechster Schritt:** WORKFLOW_v2.md schreiben, ORCHESTRATOR.md aktualisieren, AGENT_SKRIPT.md erstellen

### Infrastruktur-Update: WORKFLOW_v2.md + ORCHESTRATOR.md v2
- **Phase:** Phase 3.2 Prozessredesign
- **Aufgabe:** Kanonische v2-Dokumente erstellen und bestehende Docs aktualisieren
- **Ergebnis:** WORKFLOW_v2.md geschrieben (10 Sektionen: Phasenstruktur, Agenten-Rollen, Phase 0-3 Details, Externe Audits, v1-Abgrenzung). ORCHESTRATOR.md auf v2 aktualisiert (4-Phasen-Workflow mit AGENT_SKRIPT als [0.3], User-Validierung nach jeder Phase, Ausfuehrungsorte-Tabelle, Referenz-Dokumente). projekt-website Skill: Read-only, Update zurueckgestellt — Skill liest v2-Kontext aus STATUS.md/CHANGELOG.md ein.
- **Artefakte:** `docs/architektur/WORKFLOW_v2.md` (neu, kanonisch), `docs/agents/ORCHESTRATOR.md` (v2)
- **Naechster Schritt:** AGENT_SKRIPT.md erstellen. Erster Durchlauf Phase 0 (Wikipedia → Skript) fuer Game 1 testen.

## 2026-03-22
### Phase 0.1 abgeschlossen: DIDAKTIK_RAHMEN Game 1 erstellt
- **Phase:** Phase 0.1 (AGENT_DIDAKTIK)
- **Aufgabe:** DIDAKTIK_RAHMEN fuer Game 1 "Erster Weltkrieg — Ursachen und Ausbruch" erstellen
- **Ergebnis:** DIDAKTIK_RAHMEN_gpg-erster-weltkrieg-ursachen.md erstellt. 4 Kompetenzerwartungen gemappt (KE-A: GPG7_LB2_K_05 Maechterivalitaeten, KE-B: GPG7_LB2_K_06 Attentat/Ursache-Ausloeser, KE-C: GPG7_LB2_K_07 Verlauf fuer Menschen, KE-D: GPG7_LB3_K_03 Kriegsschuldfrage). KE-Matrix mit Haupt-/Nebenzuordnungen. 4 Mappen: (1) Pulverfass Europa — Imperialismus/Nationalismus/Buendnisse, (2) Attentat Sarajevo — Ursache vs. Ausloeser/Julikrise, (3) Kriegsbegeisterung 1914 — Propaganda/Perspektiven, (4) Schlieffen-Plan — Strategie/Scheitern/Stellungskrieg. Stundenziel AFB II-III + 4 Teilziele (TZ1-TZ4). Schwierigkeitskurve: I-II → II → II → II-III. Ethische Hinweise (Multiperspektivitaet, Kontroversitaet, Ueberwaetigungsverbot, Sensibilitaet, Aktualitaetsbezug). Narrativ-Rahmen: Zeitungsreporter Sommer 1914. 3-stufiges Tipp-System mit konkretem Beispiel. Verzeichnis docs/agents/artefakte/ neu angelegt.
- **Artefakte:** `docs/agents/artefakte/DIDAKTIK_RAHMEN_gpg-erster-weltkrieg-ursachen.md` (neu), `docs/agents/artefakte/` (neues Verzeichnis)
- **Naechster Schritt:** User-Validierung DIDAKTIK_RAHMEN (Pflicht). Dann Phase 0.2 (AGENT_INHALT) in Claude Code.

### Phase 0.3 abgeschlossen: SKRIPT Game 1 erstellt (Cowork)
- **Phase:** Phase 0.3 (AGENT_SKRIPT)
- **Aufgabe:** Lineares Jugendsachbuch-Skript schreiben, in 4 Mappen-Chunks aufteilen, Tafelbild-Entwuerfe ableiten
- **Ergebnis:** SKRIPT erstellt. 4 Chunks: C1 Pulverfass Europa (Imperialismus, Nationalismus, Buendnisse, Wettruestung), C2 Attentat Sarajevo (Balkankrise, Princip, Julikrise, Ursache vs. Ausloeser), C3 Kriegsbegeisterung (Augusterlebnis, 4 Gruende, Gegenstimmen, Burgfrieden), C4 Schlieffen-Plan (Zweifrontenkrieg, Zeitluecke, Marne-Schlacht, Stellungskrieg). Stil Jugendsachbuch, Saetze ≤20 Woerter, 16 Fachbegriffe bei Erstverwendung erklaert, Personifizierung pro Chunk. Tafelbild-Entwuerfe 6-7 Knoten pro Chunk mit Voraussetzungen-Kette. Sandwich-Uebergaenge komplett. KE-Abdeckung vollstaendig. Qualitaets-Gate: 10/10 PASS.
- **Artefakte:** `docs/agents/artefakte/SKRIPT_gpg-erster-weltkrieg-ursachen.md` (neu)
- **Naechster Schritt:** User-Validierung Phase 0 (Pflicht). Dann Phase 1 (AGENT_MATERIAL Design-Modus).

### Phase 0.2 abgeschlossen: INHALTSBASIS Game 1 erstellt (Claude Code)
- **Phase:** Phase 0.2 (AGENT_INHALT)
- **Aufgabe:** Wikipedia-basierte Sachanalyse fuer Game 1 "Erster Weltkrieg — Ursachen und Ausbruch"
- **Ergebnis:** INHALTSBASIS erstellt. 12 Wikipedia-Artikel ausgewertet (Hauptartikel World War I + 11 Vertiefungsartikel: Causes of WWI, Triple Alliance, Triple Entente, Imperialism, Assassination of Franz Ferdinand, July Crisis, Bosnian Crisis, Balkan Wars, Spirit of 1914, Schlieffen Plan, First Battle of the Marne). 14+ Fakten pro Mappe extrahiert. Alle 4 Inhaltsluecken aus Themen-Briefing geschlossen: Julikrise-Chronologie, Balkankrise-Kontext, Schlacht an der Marne, Quellenverifikation. Quellenangaben pro Fakt mit Wikipedia-Artikel + Sektion. Verfuegbare Bilder notiert. Recherche-Hinweise pro Mappe dokumentiert.
- **Artefakte:** `docs/agents/artefakte/INHALTSBASIS_gpg-erster-weltkrieg-ursachen.md` (neu)
- **Naechster Schritt:** Phase 0.3 (AGENT_SKRIPT) in Cowork — lineares Skript schreiben, chunken, Tafelbild-Entwuerfe.

### Audit v2 + Auflagen-Umsetzung: v2-Architektur freigegeben
- **Phase:** Phase 3.2 Prozessredesign (Abschluss)
- **Aufgabe:** (1) Audit-Auftrag erstellen, (2) Externes Audit durchfuehren, (3) Alle Auflagen + Empfehlungen umsetzen
- **Ergebnis:** Audit-Ergebnis: "Freigabe unter Auflagen" (5 Auflagen, 4 Empfehlungen). Alle 9 Massnahmen umgesetzt: AGENT_SKRIPT.md erstellt (Blocker — Schluessel-Agent der v2-Architektur mit Stil-Constraints, 10-Punkte-Qualitaets-Gate, Chunking-Mandat, Sandwich-Methode, Tafelbild-Entwurfsregeln). MATERIAL_GERUEST-Template in WORKFLOW_v2 spezifiziert (Blocker — v1-BLUEPRINT-Format adaptiert auf Skript-Chunks). ORCHESTRATOR data.json-Schema auf v1-erweitertes Schema aktualisiert (einstieg{}, materialien[], sicherung{}, tafelbild{}, quellenangaben[]). Wikipedia-Fallback-Pfad definiert (3-stufig). Material-Typ-Auswahllogik auf Skript-Passagen adaptiert (7 skript-basierte Trigger primaer, Tafelbild sekundaer). INHALTSBASIS-Template um Recherche-Hinweise ergaenzt. Sandwich-Validierung als Phase-2-Pruefpunkt. Quellenangaben-Assembly als Post-Subagenten-Schritt.
- **Artefakte:** `docs/agents/AGENT_SKRIPT.md` (neu), `docs/analyse/AUDIT_PROZESSREDESIGN_V2.md` (Audit-Auftrag), `docs/analyse/AUDIT_PROZESSREDESIGN_V2_ERGEBNIS.md` (Audit-Ergebnis + Umsetzungsnachweis), `docs/architektur/WORKFLOW_v2.md` (erweitert: MATERIAL_GERUEST-Template, Fallback-Pfad, Recherche-Hinweise, Sandwich-Pruefpunkt, Quellenangaben-Assembly), `docs/agents/ORCHESTRATOR.md` (data.json v1-Schema), `docs/agents/AGENT_MATERIAL.md` (Skript-basierte Auswahllogik)
- **Naechster Schritt:** Erster Durchlauf Phase 0 (DIDAKTIK → INHALT → SKRIPT) fuer Game 1 "Pulverfass Europa". Phase 0.1 in Cowork starten.

---

## 2026-03-17
### Docs-Konsolidierung + Evaluation v1-Testmappe + Agenten-Verschaerfung
- **Phase:** Phase 3.1 → 3.2 Uebergang
- **Aufgabe:** (1) Verzeichnisstruktur konsolidieren, (2) v1-Testmappe im Browser evaluieren, (3) Agenten-Instruktionen basierend auf Evaluation verschaerfen
- **Ergebnis:** Projekt_Website/ komplett nach docs/ migriert (9 Unterordner: agents, projekt, architektur, uebergabe, analyse, briefings, checklisten, testdaten, assets). Alle Querverweise in 8 aktiven Docs aktualisiert. PFAD_MANIFEST.md neu geschrieben. Skill projekt-website v2 mit konsolidierten Pfaden paketiert und installiert. Browser-Test + Lehrkraft-Evaluation: 23 Findings (6 Prozess, 9 Engine/UI, 10 Inhalt/Didaktik). 14 davon eingearbeitet in AGENT_MATERIAL.md (Qualitaetsspezifikationen fuer alle 7 Materialtypen + Tafelbild + Einstieg, 3 neue Kern-Prinzipien) und AGENT_RAETSEL.md (Material-Alignment-Pflicht, Freitext-Neudefinition, Lueckentext-Darstellungsregel, Tipp-UI-Regeln). 9 Findings offen (3 strategisch: MCP-Integration, QM-Struktur, Differenzierung; 6 technisch: Drag-and-drop, Hover, Sicherung-Bug, Header, Dropdown-Bug).
- **Artefakte:** `docs/` (neue Struktur), `docs/agents/AGENT_MATERIAL.md` (verschaerft), `docs/agents/AGENT_RAETSEL.md` (verschaerft), `docs/analyse/EVALUATION_V1_TESTMAPPE.md` (neu), `docs/agents/PFAD_MANIFEST.md` (neu geschrieben), `docs/agents/SKILL_projekt-website_v2.md` (neu)
- **Naechster Schritt:** Engine-Quick-Fixes (E6, E8, E9), dann MCP-Integration recherchieren (P1)

## 2026-03-16
### Code-Review Fixes + offene Findings dokumentiert
- **Phase:** Phase 3.1: Infrastruktur-Validierung
- **Aufgabe:** Systematisches Code-Review der v1-Engine, kritische Bugs fixen, restliche Findings dokumentieren
- **Ergebnis:** 7 Findings identifiziert (H1-H2, M1-M3, N1-N3). H1 behoben: `_checkLueckentext` nutzt jetzt `_fuzzyMatch` statt exaktem String-Vergleich — Schueler-Eingaben mit Umlauten (z.B. "Buendnisbloecke" vs "Bündnisblöcke") werden korrekt erkannt. H2 behoben: `_renderMaterialQuelle` hat jetzt `<h3 class="material__titel">` wie alle anderen 6 Material-Renderer. 5 weitere Findings (Tafelbild-Linien, Zuordnung-Duplikate, material_referenz-Scroll, CSS-Variable, SVG-Marker-ID) fuer kuenftige Zyklen dokumentiert.
- **Artefakte:** `escape-engine.js` (2 Fixes), `Projekt_Website/FIXES_ENGINE_V1_OFFEN.md` (neu, 6 Findings mit Loesungsansaetzen)
- **Naechster Schritt:** Browser-Test v1-Engine mit test-data, dann Ebene 0 (GAME_BLUEPRINT)

## 2026-03-16
### Engine v1-Readiness implementiert und deployed (Phase 3.1 abgeschlossen)
- **Phase:** Phase 3.1: Infrastruktur-Update (Engine v1-Readiness)
- **Aufgabe:** Engine auf v1-Schema-Kompatibilitaet bringen; alle 16 Teilauftraege aus UEBERGABE_ENGINE_V1.md umsetzen
- **Ergebnis:** Vollstaendige Implementierung in Claude Code. Commits: 8e1bb6c (Engine v1), 364a513 (Test-Deploy), 5b94d8e (MVP-Restore). Diff: +1.673 / -116 Zeilen in 12 Dateien. escape-engine.js von 1.214 auf 2.112 Zeilen (+940): Fuzzy-Matching (_fuzzyMatch, _normalizeUmlaute, _levenshtein), Code-Reveal (_revealFreischaltCode, auto nach allen Aufgaben), 7 Material-Renderer (darstellungstext, quellentext, bildquelle, karte, zeitleiste, statistik, tagebuch), Einstieg-Renderer, Sicherung-Renderer (hidden bis Code-Reveal), Tafelbild-SVG-Generator (Auto-Layout, 6 Knoten-Typen, Verbindungen mit Labels, Ghost-Knoten fuer voraussetzungen), Phasen-Renderer (_renderMappeV1 mit automatischem MVP-Fallback), material_referenz-Links in allen 5 Aufgaben-Renderern. theme-gpg.css +110 Zeilen: 2-Spalten-Grid (Desktop >= 768px, Sticky-Materialien), 7 BEM-Material-Typ-Styles, Einstieg/Sicherung-Styles, 6 Tafelbild-CSS-Variablen, material_referenz-Verweis-Style. mappe-template.html + mappe-1..4.html auf Phasen-Layout (Einstieg → Erarbeitung → Sicherung → Code). data.json Template auf v1-Schema. Test-Datensatz mit v1-Daten validiert, dann MVP-data.json wiederhergestellt. Live-Site (weitergehts.online) laeuft im MVP-Modus, Engine erkennt v1-Daten automatisch.
- **Artefakte:** `escape-engine.js` (erweitert), `theme-gpg.css` (erweitert), `base.css` (erweitert), `mappe-template.html` + `mappe-1..4.html` (Phasen-Layout), `template/data.json` (v1-Schema), `data-v1-test.json` (Referenz-Testdaten). Planungsdocs: `UEBERGABE_ENGINE_V1.md`, `test-data-v1.json`
- **Naechster Schritt:** Browser-Test v1-Engine, dann Ebene 0 (GAME_BLUEPRINT) oder offene Doc-Updates (AGENT_INHALT.md, AGENT_DIDAKTIK.md)

## 2026-03-16
### Vier-Ebenen-Architektur + Agenten-Docs v1 aktualisiert
- **Phase:** Phase 3.1: Infrastruktur-Update (Agenten-Docs)
- **Aufgabe:** Linearen 6-Agent-Workflow durch Vier-Ebenen-Architektur ersetzen, Agenten-Docs aktualisieren
- **Ergebnis:** Grundlegende Architektur-Neuausrichtung: Trennung Planung (Ebene 0+1, Cowork) von Produktion (Ebene 2+3, Claude Code). Tafelbild-Progression als aufbauendes Strukturprinzip ueber alle Mappen. 2 externe Audits durchlaufen und eingearbeitet. Kernentscheidungen: (1) Tafelbild-Datenmodell als JSON (knoten[], verbindungen[], voraussetzungen[]). (2) INHALT = Historiker (Ebene 0), MATERIAL = Lehrbuchautor (Ebene 1+2). (3) material_referenz als Array. (4) inhalt-Feld polymorph: HTML-Fragmente fuer Text-Typen, JSON-Sub-Schemas fuer zeitleiste/statistik. (5) Wortbudget max. 500 Woerter Lesetext pro Mappe. (6) MATERIAL produziert JSON (nicht Markdown), RAETSEL uebernimmt unveraendert. (7) Synthese-Checkliste fuer Tafelbild-Erstellung (7 Leitplanken). (8) Sequenz-Regel explizit im Uebergabe-Prompt-Template.
- **Artefakte:** `Projekt_Website/WORKFLOW_v1.md` (neu, kanonisch fuer Schema + Workflow), `docs/AGENT_MATERIAL.md` (neu), `docs/ORCHESTRATOR.md` (aktualisiert: 7-Agent, Vier-Ebenen), `docs/AGENT_RAETSEL.md` (aktualisiert: materialbasierte Tipps, Reihenfolge-Regel, Zusammenfuegung), `Projekt_Website/ARCHITEKTUR_v1.md` (teilweise superseded), `Projekt_Website/MATERIAL_PIPELINE.md` (superseded)
- **Naechster Schritt:** Ebene 0 starten (GAME_BLUEPRINT) oder Engine-Fixes (Uebergabe-Prompt)

## 2026-03-15
### MVP Game 1 deployed — Problemanalyse + v1-Architektur entworfen
- **Phase:** Phase 3: Pilot (MVP-Evaluation → v1-Planung)
- **Aufgabe:** MVP Game 1 "Pulverfass Europa" analysieren, Befunde kategorisieren, v1-Architektur entwerfen
- **Ergebnis:** MVP ist funktional deployed auf weitergehts.online, aber hat 11 Befunde in 5 Kategorien. Kritischster: Kein Erarbeitungsmaterial — das Game ist ein reines Quiz ohne Lerninhalt. Paradigmenwechsel definiert: Quiz → Interaktives Arbeitsblatt. v1-Architektur entwurfen: (1) data.json Schema-Erweiterung mit materialien[] (7 Material-Typen: darstellungstext, quellentext, bildquelle, karte, zeitleiste, statistik, tagebuch), einstieg{}, sicherung{}, material_referenz pro Aufgabe. (2) Neuer AGENT_MATERIAL zwischen INHALT und RAETSEL. (3) Engine-Erweiterungen: Material-Renderer, Code-Reveal nach allen Aufgaben, Fuzzy-Matching fuer Freitext. (4) Mappe-Template mit 3-Phasen-Layout (Einstieg → Erarbeitung → Sicherung), 2-Spalten-Grid (Material links, Aufgaben rechts). (5) Verschaerfte Tipp-Regeln und Reihenfolge-Aufgaben ohne Zeitangaben. 3-Iterationen-Plan: 3.1 Infrastruktur → 3.2 Inhalt/Material → 3.3 Feinschliff/QA.
- **Artefakte:** `Projekt_Website/ANALYSE_MVP_Game1.md` (Problemanalyse, 11 Befunde), `Projekt_Website/ARCHITEKTUR_v1.md` (Schema, Agent, Engine, Template, Regeln, Handlungsplan)
- **Naechster Schritt:** Phase 3.1 starten: AGENT_MATERIAL.md erstellen, ORCHESTRATOR.md + AGENT_RAETSEL.md aktualisieren, dann Uebergabe-Prompt fuer Engine-Fixes

## 2026-03-14
### MCP-Tools dokumentiert und Uebergabe-Prompt Game 1 erstellt
- **Phase:** Phase 3: Pilot (Vorbereitung)
- **Aufgabe:** 8 MCP-Server evaluieren und in Projekt-Infrastruktur integrieren; Uebergabe-Prompt fuer Game-1-Produktion erstellen
- **Ergebnis:** `docs/MCP_TOOLS.md` erstellt mit vollstaendiger Dokumentation aller MCP-Server (markdownify, mcp-pandoc, wikimedia-image-search, rijksmuseum, ElevenLabs, excalidraw, mapbox, website-downloader). Relevanz-Bewertung, Tool-Listen, Integrationspunkte pro Agent, Kostenregeln dokumentiert. ORCHESTRATOR.md, AGENT_INHALT.md, AGENT_DESIGN.md um MCP-Tool-Referenzen erweitert (markdownify-Preprocessing, wikimedia-Bilder, excalidraw-Tafelbilder, mapbox-Karten, ElevenLabs-Audio). Uebergabe-Prompt fuer Claude Code erstellt: 8-Schritt-Workflow (DIDAKTIK→INHALT→RAETSEL→TECHNIK→DESIGN→QUALITAET→Iteration→Commit), data.json-Loesungstypen spezifiziert, alle Quelldateien referenziert.
- **Artefakte:** `docs/MCP_TOOLS.md` (neu), `docs/ORCHESTRATOR.md` (MCP-Medien-Workflow), `docs/AGENT_INHALT.md` (Preprocessing + excalidraw), `docs/AGENT_DESIGN.md` (wikimedia + ElevenLabs), `Projekt_Website/UEBERGABE_Phase3_Game1_Pulverfass_Europa.md` (neu)
- **Naechster Schritt:** Uebergabe-Prompt in Claude Code ausfuehren

## 2026-03-14
### Phase 3 Themensetzung: Erster Weltkrieg, 2 Games, Workflow standardisiert
- **Phase:** Phase 3: Pilot
- **Aufgabe:** Thema festlegen, Quellmaterial auswerten, Themensetzungsprozess standardisieren
- **Ergebnis:** Thema "Der Erste Weltkrieg" gewaehlt (statt Industrialisierung). Aufteilung in 2 Games: Game 1 "Pulverfass Europa" (UE01-04, 4 Mappen: Ursachen → Ausbruch → Kriegsbegeisterung → Schlieffen-Plan), Game 2 "Der Grosse Krieg" (UE05-09, 5 Mappen: Stellungskrieg → Front → Heimat → Global → Ende). Zaesur historisch praezise (September 1914, Marne). Quellmaterial: 9 TUVs + 4 Loesungsblaetter + 3 Hintergrund-MDs eines Kollegen (Silas). Neuer standardisierter Prozess: Themen-Briefing als Phase 0 im ORCHESTRATOR-Workflow definiert. AGENT_INHALT.md um systematischen TUV-Auswertungs-Kanal erweitert (Quelldateien → Kernaussagen → Inhaltsluecken → gezielte Recherche).
- **Artefakte:** `Projekt_Website/THEMEN_BRIEFING_ErsterWeltkrieg_Game1.md`, `Projekt_Website/THEMEN_BRIEFING_ErsterWeltkrieg_Game2.md`, `docs/ORCHESTRATOR.md` (Themen-Briefing-Format + Phase 0), `docs/AGENT_INHALT.md` (TUV-Auswertung + Briefing-Eingabe)
- **Naechster Schritt:** Uebergabe-Prompt fuer Claude Code erstellen → Game 1 durch Agenten-Workflow produzieren

## 2026-03-14
### Phase 2 Audit-Fixes: 16/18 Fixes umgesetzt
- **Phase:** Phase 2: Template-Engine (Qualitaetssicherung)
- **Aufgabe:** Konsolidierte Fix-Liste aus 3 Audits abarbeiten (FIXES_Phase2_Konsolidiert.md)
- **Ergebnis:** 16 von 18 Fixes umgesetzt. Alle 6 Blocker behoben (kritischster: FIX-01 data.json loesung-Typ-Mismatch — Schema, ORCHESTRATOR.md und AGENT_RAETSEL.md korrigiert). Alle 3 Sollte-Fixes behoben. 7 Kann-Fixes behoben. 2 bewusst belassen (FIX-12 Reihenfolge-Text, FIX-17 Passwort). 11 Dateien geaendert.
- **Artefakte:** `escape-engine.js`, `core.js`, `base.css`, `theme-gpg.css`, `lehrkraft.html`, `index.html`, `mappe-template.html`, `data.json`, `ORCHESTRATOR.md`, `AGENT_RAETSEL.md`, `AGENT_TECHNIK.md` (alle aktualisiert). Commit `ddd0ab3` auf `main`.
- **Naechster Schritt:** Phase 3: Erstes Escape-Game (GPG, Industrialisierung) mit dem Agenten-Team produzieren

## 2026-03-13
### Phase 2 Audit: 3 unabhaengige Audits durchgefuehrt
- **Phase:** Phase 2: Template-Engine (Qualitaetssicherung)
- **Aufgabe:** Template-Engine-Code (8 Dateien) dreifach auditieren, Befunde konsolidieren
- **Ergebnis:** Erstaudit (13 Befunde: B1-B4, C1-C4, D1-D5), Verifizierungsaudit (+5 Blindstellen), externes Audit (+8 Befunde N1-N8). Konsolidiert zu 18 priorisierten Fixes. Kritischster Befund: N1/FIX-01 (data.json loesung als String, Engine erwartet Object/Array je Aufgabentyp — Blocker fuer Agent-Pipeline).
- **Artefakte:** `docs/AUDIT_Phase2_Template_Engine.md`, `docs/AUDIT_Phase2_Verifizierung.md`, `docs/FIXES_Phase2_Konsolidiert.md`
- **Naechster Schritt:** Fixes in Claude Code umsetzen

## 2026-03-13
### Phase 2 abgeschlossen: Template-Engine steht
- **Phase:** Phase 2: Template-Engine
- **Aufgabe:** Alle Shared-Code-Dateien und HTML-Templates erstellen, die die Agenten als Infrastruktur voraussetzen
- **Ergebnis:** 8 Dateien erstellt (2928 Zeilen Gesamtcode). base.css (318Z: Reset, Custom Properties, Responsive, Accessibility), theme-gpg.css (530Z: Archiv-Theme Navy/Gold/Pergament, BEM-Klassen, 5 Keyframe-Animationen), core.js (259Z: Storage/Nav/Feedback/Utils IIFE), escape-engine.js (1169Z: 7 API-Funktionen + 5 Aufgabentyp-Renderer), 3 HTML-Templates (index, mappe, lehrkraft), data.json-Schema. Syntaxcheck bestanden, valides JSON. Blocker B1 (zirkuläre Abhängigkeit) damit gelöst.
- **Artefakte:** `assets/css/base.css`, `assets/css/themes/theme-gpg.css`, `assets/js/core.js`, `assets/js/escape-engine.js`, `escape-games/template/index.html`, `escape-games/template/mappe-template.html`, `escape-games/template/lehrkraft.html`, `escape-games/template/data.json`
- **Nächster Schritt:** Phase 3: Erstes Escape-Game (GPG, Industrialisierung) mit dem Agenten-Team produzieren

## 2026-03-12
### Phase 2 gestartet: Übergabe-Prompt Template-Engine erstellt
- **Phase:** Phase 2: Template-Engine
- **Aufgabe:** Übergabe-Prompt für Claude Code erstellen (8 Dateien: base.css, theme-gpg.css, core.js, escape-engine.js, 3 HTML-Templates, data.json-Schema)
- **Ergebnis:** `UEBERGABE_Phase2_Template_Engine.md` erstellt. Spezifiziert alle CSS Custom Properties, JS-API-Signaturen (aus Audit-Fix H3), 5 Aufgabentyp-Renderer, localStorage-Schema, Template-Struktur. Konsolidiert AGENT_TECHNIK + AGENT_DESIGN-Spezifikationen in ausführbare Aufgaben.
- **Artefakte:** `UEBERGABE_Phase2_Template_Engine.md`
- **Nächster Schritt:** Übergabe-Prompt in Claude Code ausführen

## 2026-03-12
### Phase 1 Audit-Fixes erledigt (B2 + H1-H5)
- **Phase:** Phase 1: Subagent-Architektur (Nacharbeit abgeschlossen)
- **Aufgabe:** Übergabe-Prompt `UEBERGABE_Phase1_Fixes.md` in Claude Code ausführen -- 6 Aufgaben (B2, H1-H5)
- **Ergebnis:** Alle 6 Fixes committed + pushed. PFAD_MANIFEST.md (30 verifizierte Pfade), tipps-Schema vereinheitlicht (Objekte), TECHNIK/DESIGN-Abgrenzung, API-Signaturen, zuordnung→Dropdown, Medien-Workflow (MVP=textbasiert). Blocker B1 bleibt (wird durch Phase 2 gelöst).
- **Artefakte:** `docs/PFAD_MANIFEST.md` (neu), `docs/ORCHESTRATOR.md`, `docs/AGENT_RAETSEL.md`, `docs/AGENT_TECHNIK.md`, `docs/AGENT_DESIGN.md` (alle aktualisiert)
- **Nächster Schritt:** Phase 2: Template-Engine erstellen (löst B1)

## 2026-03-12
### Audit Phase 1: Agenten NICHT bereit für Phase 2
- **Phase:** Phase 1: Subagent-Architektur (Nacharbeit)
- **Aufgabe:** Externes Audit aller 8 Agenten-Dateien (docs/) durch separate KI-Instanz
- **Ergebnis:** 2 Blocker, 5 High-Priority, 7 Medium/Low Issues. Blocker 1: Zirkuläre Abhängigkeit (Agenten referenzieren Phase-2-Artefakte die noch nicht existieren). Blocker 2: Inkonsistente Quellpfade. Entscheidung: Phase 2 (Template-Engine) VOR erstem Agenten-Durchlauf. Blocker + High in einem Claude-Code-Durchgang beheben.
- **Artefakte:** `AUDIT_Phase1_Agenten.md` (Briefing), STATUS.md (Audit-Entscheidungstabelle ergänzt)
- **Nächster Schritt:** Übergabe-Prompt für Blocker+High-Behebung erstellen, in Claude Code ausführen

## 2026-03-12
### Phase 1 abgeschlossen: Subagent-Architektur steht
- **Phase:** Phase 1: Subagent-Architektur aufbauen
- **Aufgabe:** 7 Agenten-MDs und Qualitäts-Checkliste in Claude Code erstellen, committen, pushen
- **Ergebnis:** 8 Dateien unter `docs/` erstellt und auf `main` gepusht. ORCHESTRATOR.md (Workflow-Steuerung, data.json-Schema), 6 AGENT_*.md (Didaktik, Inhalt, Rätsel, Technik, Design, Qualität) mit GPG-Lehrplan- und Didaktik-Fundierung, Checkliste_Interaktive_Materialien.md (52 Prüfpunkte in 5 Kategorien). Agenten referenzieren vorhandene GPG-Ressourcen (Lehrplan R7, Didaktik, Methoden, LehrplanPLUS-Fachprofil).
- **Artefakte:** `docs/ORCHESTRATOR.md`, `docs/AGENT_DIDAKTIK.md`, `docs/AGENT_INHALT.md`, `docs/AGENT_RAETSEL.md`, `docs/AGENT_TECHNIK.md`, `docs/AGENT_DESIGN.md`, `docs/AGENT_QUALITAET.md`, `docs/Checkliste_Interaktive_Materialien.md`
- **Nächster Schritt:** Phase 2: Erstes Escape-Game produzieren (GPG, Industrialisierung)

## 2026-03-12
### Phase 1 initiiert: Übergabe-Prompt erstellt, GPG-Artefakte inventarisiert
- **Phase:** Phase 1: Subagent-Architektur aufbauen
- **Aufgabe:** Übergabe-Prompt für Claude Code erstellen, GPG-Didaktik-Artefakte im Filesystem verifizieren, Projektplan korrigieren
- **Ergebnis:** `UEBERGABE_Phase1_Agenten.md` erstellt mit Spezifikationen für 8 Dateien (ORCHESTRATOR.md, 6 AGENT_*.md, Checkliste_Interaktive_Materialien.md). GPG-Artefakt-Inventar durchgeführt -- Audit-Gap "GPG ohne Didaktik-Artefakte" widerlegt: umfangreiche GPG-Ressourcen unter `Repsitory Unterrichtsmaterial/GPG Ressourcen/` vorhanden (GPG_Anleitungen, GPG_Didaktik, GPG_UE, Lehrplan/GPG_R7). Projektplan Sektion 3.2 (Artefakt-Mapping) mit korrekten GPG-Pfaden aktualisiert. Phase-0-Checkboxes finalisiert.
- **Artefakte:** `UEBERGABE_Phase1_Agenten.md`, `Projektplan_Website_Interaktive_Materialien.md` (aktualisiert)
- **Nächster Schritt:** Übergabe-Prompt in Claude Code ausführen

## 2026-03-12
### Phase 0 abgeschlossen: Repository + Pages + Custom Domain
- **Phase:** Phase 0: Projektsetup
- **Aufgabe:** GitHub-Repository anlegen, Verzeichnisstruktur initialisieren, GitHub Pages aktivieren, Custom Domain anbinden
- **Ergebnis:** Repo `weitergehts-online` mit 15 Dateien gepusht (index.html, CNAME, data.json-Schema, Verzeichnisstruktur für assets/css/js/img/audio, escape-games/template, docs, .github/workflows). GitHub Pages auf Branch `main` aktiviert. Custom Domain `weitergehts.online` eingetragen. HTTPS-Zertifikat wird automatisch provisioniert (Let's Encrypt). DNS war bereits konfiguriert (vorheriger Schritt).
- **Artefakte:** https://github.com/snflsknfkldnfs/weitergehts-online (Remote), lokales Repo via Claude Code erstellt
- **Nächster Schritt:** Phase 1: Subagent-Architektur aufbauen

## 2026-03-12
### DNS-Konfiguration + Infrastruktur-Klärungen
- **Phase:** Phase 0: Projektsetup
- **Aufgabe:** Custom Domain für GitHub Pages vorbereiten, offene Infrastruktur-Fragen klären
- **Ergebnis:** DNS bei Namecheap konfiguriert (4x A-Record auf GitHub IPs, CNAME www→github.io). Zoho-Mail-Records (MX, SPF) bewahrt. GitHub-Account identifiziert (snflsknfkldnfs, bestehende User-Site). Entscheidung: kein neuer Account nötig (Custom Domain macht Username unsichtbar). GitHub-MCP evaluiert und verworfen (Aufwand > Nutzen bei <5 GitHub-Operationen). CNAME-Datei in Repo-Verzeichnisstruktur aufgenommen.
- **Artefakte:** `UEBERGABE_Phase0_GitHub.md` (aktualisiert: Custom Domain vollständig operationalisiert, Namecheap-spezifische DNS-Anleitung)
- **Nächster Schritt:** GitHub-Repository anlegen (Übergabe-Prompt ausführen)

## 2026-03-12
### Audit verarbeitet, MVP-Forward-Strategie festgelegt
- **Phase:** Phase 0: Projektsetup
- **Aufgabe:** Externes Audit-Ergebnis auswerten, Umgang mit identifizierten Gaps entscheiden
- **Ergebnis:** 3 kritische Gaps priorisiert (GPG-Didaktik, Interface-Formalisierung, Daten-Operationalisierung), alle für Phase-1-Integration vorgesehen. Sekundäre Gaps in Backlog. Entscheidung: MVP-Forward, Gaps im Prozess schließen.
- **Artefakte:** `STATUS.md` (Audit-Entscheidungstabelle ergänzt)
- **Nächster Schritt:** GitHub-Repository anlegen, Verzeichnisstruktur initialisieren

## 2026-03-12
### Audit-Briefing erstellt
- **Phase:** Phase 0: Projektsetup
- **Aufgabe:** Zusammenfassung für externe KI-Evaluation der SKILL.md
- **Ergebnis:** AUDIT_BRIEFING.md mit vollständigem Kontext (Zielsystem, Architektur, Skalierungsanspruch, vorhandene Artefakte, 8 Audit-Dimensionen)
- **Artefakte:** `AUDIT_BRIEFING.md`
- **Nächster Schritt:** Audit durch externe KI, dann Skill iterieren

## 2026-03-12
### Skill `projekt-website` erstellt
- **Phase:** Phase 0: Projektsetup
- **Aufgabe:** Projektmanagement-Skill bauen
- **Ergebnis:** Skill mit Onboarding-Flow, 3 Modi (Status/Execute/Update), Templates für STATUS/CHANGELOG/PROJEKTPLAN, Onboarding-Leitfaden
- **Artefakte:** `projekt-website.skill`, `STATUS.md`, `CHANGELOG.md`
- **Nächster Schritt:** Skill installieren, dann GitHub-Repo anlegen

## 2026-03-12
### Projektplan erstellt
- **Phase:** Phase 0: Projektsetup
- **Aufgabe:** Architekturentscheidungen und Phasenplan
- **Ergebnis:** Vollständiger Projektplan mit 5 Phasen, adaptierter Subagent-Architektur, Repository-Struktur, Risikomatrix
- **Artefakte:** `Projektplan_Website_Interaktive_Materialien.md`
- **Nächster Schritt:** Skill bauen

## 2026-03-12
### Inspirationsanalyse und Bestandsaufnahme
- **Phase:** Phase 0: Projektsetup
- **Aufgabe:** Archiv 45 (Joscha Falck) analysieren, vorhandene Artefakte inventarisieren
- **Ergebnis:** Referenzarchitektur verstanden (statisches HTML, 6 Subagents, GitHub Pages), umfangreiche Anleitungsartefakte im Bestand identifiziert
- **Artefakte:** Keine neuen Dateien
- **Nächster Schritt:** Projektplan erstellen
