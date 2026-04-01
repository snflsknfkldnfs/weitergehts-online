# Runde 3a: Ergebnis — v4 Prozesstest unter Realbedingungen

**Datum:** 2026-04-01
**Evaluator:** Post-hoc (nicht der produzierende Agent)
**Testplan:** docs/analyse/RUNDE_3a_TESTPLAN.md
**Produktion:** 1 Cowork-Session, kein Session-Split erzwungen

---

## 0. Zusammenfassung

| Ebene | Ergebnis | Details |
|---|---|---|
| Ebene 1: Prozesskonformitaet | **PARTIAL PASS** | P1 konform, P4 verletzt (Batch-Produktion), P5 verletzt (kein Q-GATE-LOG.md), P6 teilweise verletzt |
| Ebene 2: Artefaktqualitaet | **PASS** | Strukturelle Isomorphie, M3b-Constraint, C1b-Identitaet, Engine-Typen korrekt |
| Ebene 3: Compaction-Resilienz | **NICHT GETESTET** | Kein Session-Split erzwungen (User sagte "weiter") |
| Ebene 4: Token-Effizienz | **BASELINE ERHOBEN** | Massiver Kontext-Aufbau durch ORCHESTRATOR + Goldstandard-Lektuere |

**Entscheidung:** v4-Infrastruktur produziert korrekte Artefakte. Prozesskonformitaet hat 3 signifikante Abweichungen. Infrastruktur nicht produktionsreif ohne Nachbesserung.

---

## 1. Ebene 1: Prozesskonformitaet

### Befund F-P4-1: Batch-Produktion statt isolierte Dispatches (HIGH)

**Soll:** Jedes Material als eigener Dispatch (P4 = 1 Artefakt pro Dispatch).
**Ist:** D02+D03 wurden parallel produziert ("Produziere mat-2-1 und mat-2-2 parallel"). D04-D07 wurden als Batch produziert ("4 Dateien erstellt" in einem Schritt).

**Konsequenz:** Kein isolierter Kontext pro Material. Wenn mat-2-3 einen Fehler hat, ist unklar, ob er durch Kontaminierung aus mat-2-4-Kontext entstand. Die Q-Gate-Pruefung pro Material verliert an Aussagekraft, weil der Agent den Kontext aller gleichzeitig produzierten Materialien hat.

**Ursache:** Der Orchestrator-Prompt definiert keine explizite Dispatch-Isolation. Der Agent optimiert auf Effizienz (natuerliches Verhalten). WORKFLOW_v4.md definiert "pro Mappe, sequentiell" — aber der Agent las WORKFLOW_v4 nicht direkt.

### Befund F-P5-1: Kein Q-GATE-LOG.md geschrieben (HIGH)

**Soll:** Jeder Dispatch schreibt sein Q-Gate-Ergebnis in Q-GATE-LOG.md (P5, L2).
**Ist:** Q-GATE-LOG.md existiert nicht im Produktionsverzeichnis. Der Agent fuehrte Q-Gate-Pruefungen durch (im Konversationsverlauf sichtbar), persistierte sie aber nicht als Datei.

**Konsequenz:** Keine auditierbare Qualitaetsdokumentation. Post-hoc-Pruefung nur ueber Konversationsverlauf moeglich, nicht ueber Artefakte.

**Ursache:** ORCHESTRATOR.md erwaehnt Q-GATE-LOG.md in der Verzeichnisstruktur, aber der Dispatch-Ablauf im Orchestrator-Flowchart erzwingt das Schreiben nicht explizit genug.

### Befund F-P6-1: Ueberfluessige Reads (MEDIUM)

**Soll:** Nur die im Schnittstellen-Vertrag definierten Dateien lesen (P6 Occam's Razor).
**Ist:** Agent las zusaetzlich:
- HANDOFF_PHASE2.md (nicht im kanonischen Workflow, aber im Produktionsverzeichnis liegend)
- data.json Mappe 1 komplett (Goldstandard-Referenz — verstaendlich, aber nicht im Vertrag)
- DIDAKTIK_RAHMEN komplett (fuer SCPL-Daten — begruendet, weil kein separates TAFELBILD-Artefakt existiert)

**Konsequenz:** Hoeherer Token-Verbrauch. HANDOFF enthielt Metawissen ueber den Testaufbau (Dispatch-Sequenz, Limitationen), das den Agent beeinflusst haben koennte.

### Befund F-P6-2: WORKFLOW_v4.md nicht gelesen (MEDIUM)

**Soll:** Agent leitet Schnittstellen-Vertraege aus WORKFLOW_v4.md ab (kanonische Referenz des Orchestrators).
**Ist:** Agent las ORCHESTRATOR.md, leitete daraus die Phasenstruktur ab, ging aber nie zu WORKFLOW_v4.md fuer die detaillierten Schnittstellen-Vertraege. Stattdessen leitete er die Produktion aus der Goldstandard data.json ab.

**Konsequenz:** Positiv fuer Token-Effizienz (7.285 Token gespart). Negativ fuer Vertragstreue — der Agent produzierte "nach Mappe-1-Muster" statt "nach Vertrag". Das funktionierte hier, weil Mappe 1 korrekt ist, aber es ist kein robuster Prozess.

### Befund F-P1-0: P1 grundsaetzlich konform (PASS)

Der Agent las seine Eingaben aus Dateien: ORCHESTRATOR.md, MATERIAL_GERUEST, SKRIPT, INHALTSBASIS, ARTEFAKT_INVENTAR, DIDAKTIK_RAHMEN, SUB_MATERIAL_*.md, rahmen/*.json. Kein Hinweis auf Nutzung von Konversationskontext aus vorherigen "Dispatches" (wobei die Batch-Produktion diesen Test verwischt).

### Befund F-INFRA-1: Kein separates TAFELBILD-Artefakt fuer Mappe 2 (HIGH)

**Soll:** Phase 0.4 produziert TAFELBILD_[game-id]_Mappe[N].md als eigenstaendiges Artefakt.
**Ist:** Fuer Mappe 2 existiert kein TAFELBILD-Artefakt. Die Tafelbild-Daten sind im MATERIAL_GERUEST und im SKRIPT verteilt. Der Agent musste die SCPL-Struktur selbst rekonstruieren — aus Knoten-Tabelle, Verbindungen und Sicherungs-Text.

**Konsequenz:** Informationsverlust bei der Rekonstruktion moeglich. Die SCPL-loesung-Saetze wurden vom Agent formuliert, nicht aus einem TB-FREEZE-Artefakt uebernommen. Das verletzt den M3b-Constraint im Geist (auch wenn das Ergebnis inhaltlich korrekt ist).

**Ursache:** Das Escape-Game wurde vor v3/v4 begonnen. Phase 0.4 (AGENT_TAFELBILD) wurde erst ab v3 eingefuehrt. Mappe 1 hatte ebenfalls kein separates Tafelbild-Artefakt — die SCPL-Daten wurden direkt in data.json geschrieben.

---

## 2. Ebene 2: Artefaktqualitaet

### Strukturelle Isomorphie: PASS

Mappe-2-Materialien haben identische Kern-Keys wie Mappe-1: id, typ, titel, inhalt, quelle, position, didaktische_funktion, voraussetzung, ueberleitung_von, sequenz_kontext. Zusaetzlich: _meta (Erweiterung, nicht in data.json-Assembly uebernommen), lizenz (konsistent mit Bildquellen).

### Engine-Kompatibilitaet: PASS

- mat-2-6 (tagebuch) korrekt als `typ: "quellentext"` gemappt
- Aufgaben-Loesungsformate korrekt: MC=String, Lueckentext=Array, Reihenfolge=Array, Zuordnung=Object, Freitext=String(Keyword)
- Alle `inhalt`-Felder als HTML-Strings

### M3b-Constraint: PASS

`sicherung.kernerkenntnisse[]` === `tafelbild.scpl.loesung[]` — 3 identische Saetze. Allerdings: Beide wurden vom Agent in derselben Session formuliert (kein TB-FREEZE-Artefakt als Quelle). Formaler PASS, aber der Constraint wurde nicht wie vorgesehen getestet.

### C1b-Identitaetsregel: PASS

`einstieg.problemstellung` === `tafelbild.stundenfrage` === "Wie konnte ein einziger Mord einen Weltkrieg ausloesen?"

### Cross-Konsistenz: PASS

- TB-Abdeckung: 6/6 Knoten durch Materialien abgedeckt
- Sequenz-Kohaerenz: mat-2-1→mat-2-6 logischer Erkenntnisweg
- Fachbegriff-Konsistenz: Keine widerspruchlichen Definitionen identifiziert
- Ueberleitung-Kohaerenz: ueberleitung_von-Felder referenzieren tatsaechlichen Vorgaenger-Inhalt

---

## 3. Ebene 3: Compaction-Resilienz

**NICHT GETESTET.** Kein Session-Split wurde erzwungen. Der User antwortete auf die CHECKPOINT-Meldung mit "weiter", und der Agent setzte in derselben Session fort.

**Indirekte Evidenz:** Die Artefakt-Struktur (jedes Material als eigene .json) wuerde einen Session-Split ueberleben. Die Dateien enthalten alle notwendigen Informationen. Aber: Ohne tatsaechlichen Split ist dies eine Hypothese, kein Nachweis.

---

## 4. Ebene 4: Token-Effizienz

### Kontext-Aufbau (geschaetzt aus Konversationsverlauf)

| Phase | Gelesene Dateien | ~Token (geschaetzt) |
|---|---|---|
| Initial (vor D01) | ORCHESTRATOR.md, MATERIAL_GERUEST, data.json (Mappe 1 komplett), HANDOFF_PHASE2.md | ~12.000 |
| D01 Rahmen | + SKRIPT (Chunk 2), DIDAKTIK_RAHMEN | ~6.000 |
| D02-D03 Material 1-2 | + SUB_MATERIAL_DARSTELLUNGSTEXT.md, SUB_MATERIAL_BILDQUELLE.md, ARTEFAKT_INVENTAR, INHALTSBASIS | ~8.000 |
| D04-D07 Material 3-6 | + SUB_MATERIAL_QUELLENTEXT.md, SUB_MATERIAL_ZEITLEISTE.md, SUB_MATERIAL_TAGEBUCH.md | ~6.000 |
| D08 Cross-Konsistenz | Alle mat-2-*.json + rahmen/*.json | ~4.000 |
| D09 Progressionsplan | + AGENT_RAETSEL.md, alle mat-2-*.json (Metadaten) | ~5.000 |
| D10-D14 Aufgaben | + SUB_AUFGABE_*.md (5 Dateien) | ~6.000 |
| D15 Cross-Konsistenz | Alle aufgabe-2-*.json | ~3.000 |
| Phase 3 Assembly | Alle .json + data.json | ~8.000 |
| **Gesamt** | | **~58.000** |

### WORKFLOW_v4.md-Anteil: 0 Token

Agent las WORKFLOW_v4.md nicht. Er leitete alles aus ORCHESTRATOR.md + Goldstandard ab. Das bestaetigt die Hypothese: WORKFLOW_v4 wird in der Praxis nicht gelesen, wenn der Orchestrator ausreichend Information bietet.

### ORCHESTRATOR.md-Anteil: ~2.500 Token

Einmalig am Anfang gelesen. Nicht pro Dispatch wiederholt. Effizient.

### Kritische Beobachtung: data.json als implizite Referenz

Der Agent las data.json (Mappe 1) als Struktur-Template (~5.000 Token). Das ist NICHT im Schnittstellen-Vertrag vorgesehen. Der Agent nutzte es als pragmatische Alternative zu WORKFLOW_v4.md fuer die Schema-Definition. Risiko: Wenn Mappe 1 Schema-Fehler hat, werden sie reproduziert.

---

## 5. Phase 3 Abweichung

Der Agent fuehrte Phase 3 (Assembly) in Cowork durch, nicht in Claude Code wie vorgesehen (P2: "technische Umsetzung in Claude Code"). Er las alle .json-Dateien und assemblierte data.json direkt.

**Bewertung:** Funktional korrekt. Aber P2-Verletzung. Der Phase-3-Uebergabeprompt an Claude Code wurde uebersprungen. Bilder wurden nicht heruntergeladen (AGENT_TECHNIK Phase 3.1). mappe-2.html wurde nicht erstellt.

**Verbleibende Phase-3-Schritte:**
- [ ] Bilder herunterladen (img-2-1, img-2-2)
- [ ] mappe-2.html erstellen
- [ ] Git commit + push

---

## 6. Befund-Zusammenfassung

| ID | Schwere | Beschreibung | Ursache | Massnahme |
|---|---|---|---|---|
| F-P4-1 | HIGH | Batch-Produktion statt isolierte Dispatches | Kein expliziter Dispatch-Isolations-Mechanismus im Orchestrator | Orchestrator muss "1 Material pro Nachricht" erzwingen |
| F-P5-1 | HIGH | Q-GATE-LOG.md nicht geschrieben | Orchestrator erzwingt Persistierung nicht explizit | Q-GATE-LOG.md als PFLICHT-Output in Dispatch-Ablauf |
| F-INFRA-1 | HIGH | Kein TAFELBILD-Artefakt fuer Mappe 2 | Game vor v3/v4 begonnen | TAFELBILD_Mappe2.md retroaktiv erstellen (aus produziertem tafelbild.json) |
| F-P6-1 | MEDIUM | Ueberfluessige Reads (HANDOFF, data.json, DIDAKTIK_RAHMEN) | Dateien im Produktionsverzeichnis verfuegbar, Agent optimiert pragmatisch | HANDOFF aus Produktionsverzeichnis entfernen oder als "nicht lesen" markieren |
| F-P6-2 | MEDIUM | WORKFLOW_v4.md nicht gelesen | Orchestrator reicht als Einstieg, Goldstandard als Schema-Referenz | Bestaetigt Vertrags-Extraktion: Phasen-Vertraege statt Volllektuere |
| F-P2-1 | MEDIUM | Phase 3 in Cowork statt Claude Code ausgefuehrt | Agent kannte P2-Regel nicht (WORKFLOW nicht gelesen) | Phase-3-Uebergabe explizit als Session-Grenze definieren |
| F-GOLD-1 | MEDIUM | data.json Mappe 1 als implizites Schema-Template genutzt | Kein explizites Verbot, Agent optimiert pragmatisch | data.json ist MVP, NICHT Template. Schema-Autoritaet bei Orchestrator + Vertraegen |
| F-P2-2 | MEDIUM | Kein Uebergabe-Prompt fuer Phase 3 (Claude Code) ausgegeben | Phase-2-Abschluss nicht als Grenze definiert | PHASE-2-ABSCHLUSS-Block in Orchestrator + WORKFLOW |

---

## 7. Empfehlungen fuer Runde 3a-Opt / Runde 3b

### Sofort (vor naechster Produktion)

1. **TAFELBILD_Mappe2.md erstellen:** Aus dem produzierten rahmen/tafelbild.json retroaktiv ein TAFELBILD-Artefakt ableiten. Damit existiert fuer kuenftige Dispatches ein TB-FREEZE-Artefakt.

2. **HANDOFF_PHASE2.md aus Produktionsverzeichnis entfernen** oder in docs/analyse/ verschieben. Es ist ein Testplan-Dokument, kein Produktionsartefakt.

3. **Q-GATE-LOG.md nachtraeglich erstellen** aus dem Konversationsverlauf. Fuer den Audit-Trail.

### Runde 3a-Opt (Vertrags-Extraktion) — UMGESETZT

4. **Bestaetigt: WORKFLOW_v4.md wird nicht gelesen.** Vertrags-Extraktion umgesetzt: 6 Phasen-Vertraege in `docs/architektur/vertraege/`. → **DONE**

5. **Orchestrator-Anpassung:** Dispatch-Isolation (P4) explizit in ORCHESTRATOR.md Phase 2.1 + 2.2 eingetragen. → **DONE**

6. **Q-GATE-LOG als Dispatch-Abschluss-Bedingung:** In ORCHESTRATOR.md + allen Vertraegen verankert. → **DONE**

### Runde 3a-Opt (User-Feedback) — UMGESETZT

7. **Goldstandard-Rolle neu definiert:** data.json Mappe 1 = MVP-Produkt, NICHT Template. ORCHESTRATOR.md aktualisiert. Alle Vertraege enthalten "NICHT lesen: data.json". → **DONE** (F-GOLD-1)

8. **Phase-2-Abschluss verankert:** PHASE-2-ABSCHLUSS-Block in ORCHESTRATOR.md + WORKFLOW_v4.md. Uebergabe-Prompt fuer Claude Code als Pflicht-Output. → **DONE** (F-P2-2)

### Phase 3 (verbleibend)

9. **Uebergabe-Prompt fuer Claude Code** schreiben: Bilder herunterladen, mappe-2.html erstellen, git commit + push. data.json ist bereits assembliert.

### Verbleibend (vor naechster Produktion)

10. **TAFELBILD_Mappe2.md erstellen:** Aus produziertem rahmen/tafelbild.json retroaktiv ableiten.
11. **HANDOFF_PHASE2.md verschieben:** Aus Produktionsverzeichnis nach docs/analyse/.
12. **Q-GATE-LOG.md nachtraeglich erstellen:** Aus Konversationsverlauf.

---

## 8. Entscheidung

**v4-Infrastruktur produziert korrekte Artefakte** (Ebene 2 PASS). Die inhaltliche Qualitaet der Mappe 2 ist hoch — Engine-kompatibel, didaktisch koharent.

**v4-Infrastruktur ist NICHT voll prozesskonform** (Ebene 1 PARTIAL PASS). 3 HIGH-Befunde (Batch-Produktion, kein Q-GATE-LOG, fehlendes TAFELBILD) + 2 MEDIUM aus User-Feedback (Goldstandard-Rolle, Phase-2-Abschluss). Alle durch Orchestrator-Anpassungen behebbar, nicht durch Architektur-Aenderungen.

**Runde 3a-Opt Status:** Befunde F-P4-1, F-P5-1, F-GOLD-1, F-P2-1, F-P2-2 behoben. F-INFRA-1 (TAFELBILD retroaktiv) + F-P6-1 (HANDOFF verschieben) verbleibend.

**Naechster Schritt:** Verbleibende Sofort-Massnahmen (10-12) → Phase-3-Uebergabe → Runde 3b oder direkt naechstes Game.
