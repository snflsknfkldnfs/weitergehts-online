# Befund Phase-1-Testrun (AGENT_MATERIAL Design-Modus)

**Datum:** 2026-04-09
**Scope:** 4 MATERIAL_GERUEST-Dateien (Mappe 1-4), Game verlauf-erster-weltkrieg-marne-ende
**Testrun-Kontext:** Fortgesetzter Testlauf 5 (Phase 0→1 Uebergang), Produktionssession
**Evaluationsgrund:** User-Beobachtung: Agent orientiert sich am Vorgaenger-Game (pre-Pipeline)

---

## 1. Gesamtbewertung

**FAIL — 3 Findings (1 CRITICAL, 2 HIGH). Alle 4 MATERIAL_GERUEST-Dateien muessen nach Vertragspatch und M3-Reframe neu generiert werden.**

Die produzierten Dateien sind handwerklich solide (Material-Auswahl, SCPL-Zonen-Mapping, Mindest-Materialien). Das Problem ist systematisch: Der Vertrag (AGENT_MATERIAL.md) definiert kein SCPL-kompatibles Output-Format, woraufhin der Agent auf das Vorgaenger-Game als Format-Vorlage zurueckfiel. Dadurch fehlen vertraglich geforderte Strukturfelder, die als Input fuer Phase 2 zwingend sind.

---

## 2. Findings

### MG-C1 (CRITICAL): Vertrag-SCPL-Inkompatibilitaet

**Betroffene Datei:** `escape-game-generator/agents/AGENT_MATERIAL.md`
**Betroffene Sektionen:** §1.1, §1.4, §1.5, §1.7, §1.9

**Befund:** AGENT_MATERIAL.md referenziert durchgaengig das Knoten/Verbindungen-Tafelbild-Modell:
- "Fuer jeden TB-Knoten pruefen" (§1.1)
- "Fuer jeden Tafelbild-Knoten und jede Verbindung dokumentieren" (§1.4)
- "Tafelbild-Knoten zugeordnet?" (§1.7)
- "primary_tb_knoten" (§1.9, Schritt 2b)
- "`[TB-REVISION NOETIG: kN-M — Grund: ...]`" (§1.1, §1.5)

Die Phase-0.4-TAFELBILDs liefern aber SCPL-Zonen (S, C1, C2, C3, P, L) mit leeren knoten/verbindungen-Arrays. Es existiert kein vertragliches Mapping Knoten→SCPL.

**Ursache:** AGENT_MATERIAL.md wurde nach Einfuehrung des SCPL-Modells (Phase 0.4 Vertrag v1.1) nicht aktualisiert. Das SCPL-Modell wurde in VERTRAG_PHASE_0-4_HEFTEINTRAG eingefuehrt, aber die Downstream-Vertraege (Phase 1+) wurden nicht synchronisiert.

**Auswirkung:** Agent hat keinen vertraglichen Zielformat-Anker → greift auf Vorgaenger-Game zurueck → erbt pre-Pipeline-Strukturen → verliert v2.0-Felder.

**Patch:** AGENT_MATERIAL.md §1.1, §1.4, §1.5, §1.7, §1.9 auf SCPL-Zonen umschreiben. Output-Template mit SCPL-Spalten definieren.

### MG-H1 (HIGH): Fehlende v2.0-Sequenzplan-Felder

**Betroffene Dateien:** Alle 4 MATERIAL_GERUEST (Mappe 1-4)
**Vertragsreferenz:** AGENT_MATERIAL.md §1.9, Schritte 2b, 2c, 4, 5

**Befund:** Folgende vertraglich geforderte Felder fehlen in den produzierten Sequenzplaenen:

| Feld | Vertragsreferenz | Status | Downstream-Relevanz |
|---|---|---|---|
| bildfunktion | §1.9, 2b | FEHLT | S6 Q-Gate (Bildfunktions-Pruefung) |
| analyseauftrag | §1.9, 2b | FEHLT | S7 Q-Gate |
| primary_tb_knoten (→ SCPL-Zone) | §1.9, 2b | FEHLT (ersetzt durch "SCPL-Zone" ohne formale Def.) | S3 Q-Gate |
| aktivierungscharakter | §1.9, 2b | FEHLT | S10 Q-Gate |
| fachbegriffe_eingefuehrt[] | §1.9, 2c | FEHLT | S12 Q-Gate (Fachbegriff-Taxonomie) |
| fachbegriffe_referenziert[] | §1.9, 2c | FEHLT | S12 Q-Gate |
| Uebergangsobjekte | §1.9, 4 | FEHLT | Phase 2.1c Achse 5 (Ueberleitung), S9 Q-Gate |
| Sequenzkontext-Objekte | §1.9, 5 | FEHLT | SUB_MATERIAL Pflicht-Input (P1-Failsafe) |

**Ursache:** Agent hat Sequenzplan-Format vom Vorgaenger-Game uebernommen, das vor v2.0 erstellt wurde und diese Felder nicht kennt.

**Auswirkung:** Phase 2.1c hat keine Uebergangsobjekte als Input → Ueberleitungen muessen improvisiert werden. SUB_MATERIAL-Subagenten erhalten keine Sequenzkontext-Objekte → Compaction-Resistenz (P1) ist gefaehrdet. S1-S15 Q-Gate ist nicht pruefbar (fehlende Strukturfelder).

### MG-H2 (HIGH): M3 MATERIAL_GERUEST auf defektem TAFELBILD

**Betroffene Datei:** MATERIAL_GERUEST_verlauf-erster-weltkrieg-marne-ende_Mappe3.md
**Verknuepfung:** BEFUND_PHASE_0-4_INHALTSAUDIT.md, Finding IA-C1

**Befund:** M3 MATERIAL_GERUEST wurde auf dem nicht-reframten M3 TAFELBILD erstellt (chronologische SCPL). Alle Material-Zuordnungen, der Erarbeitbarkeits-Nachweis und der Sequenzplan basieren auf der Zeitleisten-Struktur (USA→Offensive→Schwarzer Tag→Meuterei→Revolution).

**Auswirkung:** Nach M3-SCPL-Reframe (kausal) wird das gesamte M3 MATERIAL_GERUEST invalide: SCPL-Zonen aendern sich, Material-Zuordnungen verschieben sich, Erarbeitbarkeitswege muessen neu konzipiert werden.

---

## 3. Positive Befunde (zur Einordnung)

| Aspekt | Bewertung |
|---|---|
| Material-Auswahl | Gut. Typ-Diversitaet (darstellungstext, quellentext, bildquelle, karte, tagebuch). Mindest-Checks bestanden. |
| SCPL-Adaption | Intelligent. Agent hat Knoten→SCPL-Zonen ohne Vertragsvorgabe korrekt adaptiert. |
| Artefakt-Referenzierung | Vollstaendig. Alle SKRIPT-Artefakte korrekt zugeordnet oder als nicht-verwendet dokumentiert. |
| Einstieg/Sicherung | Narrativ kohaereng, Uebergaenge zwischen Mappen logisch. Reporterrahmen konsistent. |
| Quellen-Plausibilitaet | Hoch. Wikimedia-Referenzen, historische Quellen plausibel. |

Der Agent hat trotz fehlendem Vertragsformat gute inhaltliche Arbeit geleistet. Das Problem ist strukturell (fehlende Vertragsfelder), nicht inhaltlich.

---

## 4. Root-Cause-Analyse

```
SCPL-Modell eingefuehrt (VERTRAG_PHASE_0-4 v1.1)
  |
  v
AGENT_MATERIAL.md NICHT aktualisiert (Knoten-Modell bleibt)
  |
  v
Agent findet keinen SCPL-Output-Template im Vertrag
  |
  v
Agent sucht Alternative → findet Vorgaenger-Game MATERIAL_GERUEST
  |
  v
Vorgaenger = pre-Pipeline (Knoten-Modell, keine v2.0-Felder)
  |
  v
Agent adaptiert Format (Knoten→SCPL OK), aber verliert v2.0-Felder
  |
  v
Produzierte Dateien: inhaltlich solide, strukturell defizitaer
```

**Kern:** Das ist kein Agent-Fehler, sondern ein Vertragssynchronisations-Defizit. Wenn der Vertrag das richtige Format definiert haette, waere das Vorgaenger-Game irrelevant gewesen.

---

## 5. Massnahmenplan (Option A)

| # | Massnahme | Scope | Abhaengigkeit |
|---|---|---|---|
| 1 | **AGENT_MATERIAL.md Vertragspatch** | escape-game-generator/ | — |
| 1a | §1.1, §1.4, §1.5: Knoten/Verbindungen → SCPL-Zonen | Terminologie | — |
| 1b | §1.7: primary_tb_knoten → primary_scpl_zone | Feld-Umbenennung | 1a |
| 1c | §1.9 Schritt 2b: SCPL-kompatible Feld-Definitionen | Sequenzplan-Format | 1a |
| 1d | Neuer §1.8b: SCPL-Output-Template (vollstaendiges Beispiel) | Referenz-Format | 1a-1c |
| 2 | **M3 TAFELBILD Reframe** | weitergehts-online/ | — (parallel zu 1) |
| 3 | **Phase-1-Testrun neu** (alle 4 Mappen) | Produktionssession | 1 + 2 |
| 4 | **Bisherige M1-M4 MATERIAL_GERUEST verwerfen** | weitergehts-online/ | 3 |

---

## 6. Infrastruktur-Beobachtung

**Vorgaenger-Game als Kontaminationsquelle:** Das Vorgaenger-Game (gpg-erster-weltkrieg-ursachen) liegt im selben Artefakt-Verzeichnis (`docs/agents/artefakte/`). Der Agent hat es als naechtsliegendes Format-Beispiel entdeckt und genutzt. Dies ist ein generisches Risiko: Jeder zukuenftige Testlauf koennte pre-Pipeline-Artefakte als Template verwenden, wenn der Vertrag keine explizite Output-Vorlage enthaelt.

**Empfehlung:** Entweder (a) explizites SCPL-Output-Template in AGENT_MATERIAL.md einbetten, oder (b) den ORCHESTRATOR anweisen, Vorgaenger-Artefakte NICHT als Format-Referenz zu laden (nur das aktuelle Game). Option (a) ist robuster — wenn der Vertrag das Format vollstaendig definiert, wird das Vorgaenger-Game irrelevant.
