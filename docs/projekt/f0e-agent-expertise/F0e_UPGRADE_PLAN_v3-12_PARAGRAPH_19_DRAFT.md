---
status: DRAFT
datum: 2026-04-23
scope: Entwurf fuer §19-Einfuegung in UPGRADE_PLAN_v3-12_ESCAPE_GAME_QUALITAET.md
ziel-datei: /sessions/admiring-optimistic-cerf/mnt/weitergehts-online/.claude/worktrees/silly-shirley/docs/architektur/UPGRADE_PLAN_v3-12_ESCAPE_GAME_QUALITAET.md
einfuegung-nach: §18 (Naechste Schritte) als neuer Abschnitt §19
commit-strategie: Host-MCP 5-Stufen, separater Track "f0e-aef-pi-integration-par-19"
---

# §19-ENTWURF — F0e-AEF Material-Subagent-Haertung

> **Hinweis fuer Einarbeitung:** Dieser Entwurf ist als neues Kapitel im UPGRADE_PLAN v3-12 einzufuegen. Nummerierung im aktuellen Plan endet bei §18. Neuer Abschnitt = §19. Paul-Entscheidung 2026-04-23: §19 final, um Missverstaendlichkeit mit Platzhalter-Reserve auszuschliessen.

---

## 19. F0e-AEF Integration — Material-Subagent-Haertung

### 19.1 Problem-Kontext

F0e-AEF-Spike (Agent-Expertise-Forming) hat am Fallstudien-Material `mat-4-3` (Trothas Vernichtungsbefehl 1904, Mappe 4 Kolonialismus) den Shadow-Overlay + zweistufiges Schema-Gate-Mechanismus validiert (BEFUND MIXED). Lehrkraft-Review der 4 Generierungs-Runs identifizierte 8 wiederkehrende Qualitaets-Defizite, deren Strukturanalyse ergab: ueberwiegend **Enforcement-Luecken** zwischen bestehenden authoritative Regeln (ENUM_TRIGGER_FLAGS, Phase 2.1c `ueberleitungen.json`, SUB_AUFGABE_QUELLENKRITIK W-Fragen-Schema) und dem Material-Subagent-Overlay v1.0.

**Spike-Artefakte:**
- `docs/projekt/f0e-agent-expertise/F0e_VERGLEICHS_REVIEW.md` (Paul-Sign-Off 2026-04-21)
- `docs/projekt/f0e-agent-expertise/F0e_PI_AUDIT_REPORT.md` (architect-review, 2026-04-23)
- `docs/projekt/f0e-agent-expertise/F0e_PI_AUDIT_DECISIONS.md` (Paul-Entscheidungen, 2026-04-23)
- `docs/projekt/f0e-agent-expertise/F0e_PI_ITEMS_FINAL.md` (finalisierte PI-Liste)

### 19.2 Strukturursachen (5, aus Paul-Feedback + Audit-Revision)

1. **Lerngruppen-Profil fehlt im Dispatcher-Priming.** Subagent kennt Jahrgangsstufe/Schulart/DaZ-Anteil nicht explizit. → Kategorie C (neue Regel). PI 3.5.

2. **Material vs. Aufgaben-Phasen-Trennung nicht durchgesetzt.** Phase 2.1c (`ueberleitungen.json`) + `SUB_AUFGABE_QUELLENKRITIK` existieren. Overlay v1.0 verweist nicht darauf, Material-Subagent erzeugt "Denk nach:"-Bloecke und Fragestellungen im `inhalt`. → Kategorie A (Enforcement). PI 3.6a + 3.6b.

3. **SSOT-Quellenangabe nicht durchgesetzt.** Feld `quelle` ist SSOT laut Schema, aber `inhalt` enthaelt Duplikate/Fussnoten. → Kategorie A + C. PI 3.7.

4. **Wortanzahl-Obergrenze fehlt kalibriert.** Runs variierten zwischen 98 und 268 Woertern. → Kategorie C. PI 3.2.

5. **Nachweis-Dramaturgie + Titel-Funktion nicht spezifiziert.** Meta-Bewertung in Einleitungs-Prosa, inhaltsleere Titel-Formulierung. → Kategorie C. PI 3.9 + 3.10.

Zusaetzliche abgeleitete Regeln: D6-Typ-Haertung (Array vs. String) PI 3.1, Sprachliche Vorentlastung via Priming PI 3.8, ENUM_TRIGGER_FLAGS-Compliance PI 3.4.

### 19.3 PI-Items (Referenz)

Vollstaendige Spezifikation: `docs/projekt/f0e-agent-expertise/F0e_PI_ITEMS_FINAL.md`.

| ID | Titel | Kategorie | Prio |
|---|---|---|---|
| 3.1 | PI-SCHEMA-STRICT-01 (+D6) | A+E | P1 |
| 3.2 | PI-CONTENT-LENGTH-01 | C | P1 |
| 3.4 | PI-TRIGGERFLAG-ENUM-01 | A | P3 (deferred) |
| 3.5 | PI-ZIELGRUPPE-PROFIL-01 | C | P2 |
| 3.6a | PI-INHALT-PROSA-ONLY-01 | A | P1 |
| 3.6b | PI-DATENFLUSS-IMPULSE-AUFGABE-01 | B | P2 |
| 3.7 | PI-QUELLE-SSOT-01 | A+C | P1 |
| 3.8 | PI-SPRACHLICHE_VORENTLASTUNG-01 | C | P2 |
| 3.9 | PI-NACHWEIS-DRAMATURGIE-01 | C | P3 |
| 3.10 | PI-META-BEZEICHNUNG-01 | C | P3 |

Gestrichen: 3.3 PI-MULTIPERSPEKTIVE-INHALT-01 (redundant mit MATERIAL-PERSPEKTIV-01 im Overlay).

### 19.4 Neue Q-Gates

Zusaetzlich zu M1-M15 aus `QUALITAETSKRITERIEN_MATERIALPRODUKTION.md`:

- **M16 Prosa-Only:** `quellentext.inhalt` enthaelt keine "Denk nach:", keine isolierten Fragestellungen, keine Aufgaben-Operatoren (Heuristik-Regex). Owner: PI 3.6a.
- **M17 Quelle-SSOT:** Keine Quellenangabe-Duplikate im `inhalt`-Feld (Regex mit `<p>`-Scope, `<blockquote>`-Attributionen ausgenommen). Owner: PI 3.7.
- **M18 Sprachliche Vorentlastung:** weich. Priming-Compliance-Check im Material-Subagent-Output (keine Glossar-Bloecke, Prosa-Fluss mit Appositionen). Owner: PI 3.8.

### 19.5 Umsetzungs-Phasen

**Phase 19.A (P1, Overlay v1.1 + Schema-Gate-Promotion):**
- PI 3.1 Schema-Gate-Promotion (Pinned SHA + D6-Typ-Haertung).
- PI 3.2 Cap-Staffelung + Priming-Direktive.
- PI 3.6a Prosa-Only-Regel mit Phase-2.1c-Verweis.
- PI 3.7 Quelle-SSOT-Regel mit `<p>`-Scope.
- Deliverable: Overlay v1.1 + Schema-Gate produktiv.

**Phase 19.B (P2, Datenfluss-Vertraege + Zielgruppe):**
- PI 3.5 Zielgruppen-Profil-Priming.
- PI 3.6b `VERTRAG_PHASE_2-2b` + `SUB_AUFGABE_QUELLENKRITIK` + `SUB_MATERIAL_QUELLENTEXT` Vertrags-Update.
- PI 3.8 Sprachliche Vorentlastung (Priming).
- Deliverable: Vertrags-Revision + Overlay-Ergaenzung.

**Phase 19.C (P3, Enum-Enforcement + Stil-Regeln):**
- PI 3.4 ENUM_TRIGGER_FLAGS als separate Datei + Schema-Gate-Enforcement.
- PI 3.9 Nachweis-Dramaturgie.
- PI 3.10 Meta-Bezeichnung + Positiv-Beispiel-Bibliothek.
- Deliverable: Enum-SSOT-Datei + Overlay-Ergaenzung.

### 19.6 Betroffene Artefakte

| Datei | Phase | Aenderungs-Typ |
|---|---|---|
| `tools/schema-gate/` (neu aus gate-prototype/) | 19.A | Promote + Pinned-SHA |
| Overlay v1.1 (neu, loest v1.0 ab) | 19.A + 19.B + 19.C | Konsolidiert |
| `docs/agents/SUB_MATERIAL_QUELLENTEXT.md` | 19.A + 19.B + 19.C | Regel-Ergaenzungen |
| `docs/agents/SUB_AUFGABE_QUELLENKRITIK.md` | 19.B | Auswahl-Heuristik + Trigger-Priming |
| `docs/architektur/vertraege/VERTRAG_PHASE_2-2b_AUFGABE.md` | 19.B | Eingabe-Definition erweitern |
| `docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md` | 19.A + 19.B + 19.C | M16/M17/M18 hinzufuegen |
| `docs/agents/ENUM_TRIGGER_FLAGS.md` (neu) | 19.C | SSOT-Datei ausgliedern |

### 19.7 Akzeptanzkriterien

- Overlay v1.1 bei Re-Run der 4 F0e-Fallstudien-Subjekte (I1, I2-R1, I2-R2, I2-R3) verletzt keine der finalen PI-Regeln (Gate-Chain sauber, Paul-Review >= 4.0 in allen 5 Didaktik-Dimensionen).
- M16/M17/M18 Q-Gates produktiv und enforced.
- ENUM_TRIGGER_FLAGS-Compliance 100% in Re-Run (keine Case-Verletzungen, keine nicht-Enum-Werte).
- Datenfluss `_meta.quellenkritische_impulse` → `SUB_AUFGABE_QUELLENKRITIK` nachweislich konsumiert (Test-Fixture).
- Keine Regression in Bestands-Mappen 1-3 bei Bloom-Pruefung und M1-M15-Q-Gates.

### 19.8 Abhaengigkeiten und Reihenfolge

**Vorbedingung:** v3.11.1 Bugfix-Bundle (Runde 1) + v3.12a Infrastruktur-Basis (Runde 2) aktiv.
**Optional synergetisch:** v3.12f Enforcement-Framework (Runde 7) — Phase 19.A kann als Pilot fuer v3.12f-Enforcement-Patterns dienen.
**Nach §19:** v3.6 AGENT_DIFFERENZIERUNG (im `UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md`) uebernimmt langfristig `erklaerungen[]` und `aufgabenstellung_daz` (PI 3.8 Langfrist-Pfad).

### 19.9 Risiken

- **R-§19-1 Overlay-Diff-Blindflecke:** Overlay v1.1 aendert Subagent-Output sichtbar, aber semantische Diffs zwischen 4 Runs variieren. Mitigation: Fallstudie-Re-Run pflicht, Paul-Review Didaktik-Gate.
- **R-§19-2 Schema-Gate-Produktiv-Risiko:** Pinned SHA muss gegen Drift abgesichert werden. Mitigation: SHA-Hash-Datei im Repo eingecheckt.
- **R-§19-3 Cap 150W-Restriktion:** kann bei komplexen Quellen zu Kontextverlust fuehren. Mitigation: Ausnahme-Klausel mit Begruendungs-Pflicht (180W-Max).
- **R-§19-4 Enum-Promotion-Coupling:** ENUM_TRIGGER_FLAGS-Ausgliederung betrifft 7 Subagent-Specs. Mitigation: Single-PR, alle Dateien im selben Commit.
- **R-§19-5 Regression Bestands-Mappen:** M16/M17 koennten Bestands-Materialien retrogressiv invalidieren. Mitigation: Warn-Gate statt Fail-Gate in der ersten 2 Wochen, gefolgt von Fix-Wave.

### 19.10 Out-of-Scope

- **AGENT_UEBERLEITUNG** (F-A5 Szenario B): optional fuer v4.1.
- **v3.6 AGENT_DIFFERENZIERUNG**: langfristig, nicht F0e-PI.
- **F-A2 offene Fragen** (Schweregrad-Mapping / Alternative-Material-Katalog / Over-Flagging-Schwelle): separater Task.
- **Weitere Material-Typen** (bildquelle, darstellungstext, karte, zeitleiste, statistik, tagebuch): F0e-PI fokussiert auf quellentext. Uebertragung nach Phase 19.A-Stabilisierung.

### 19.11 Referenzen

- `docs/projekt/f0e-agent-expertise/F0e_VERGLEICHS_REVIEW.md`
- `docs/projekt/f0e-agent-expertise/F0e_PI_AUDIT_REPORT.md`
- `docs/projekt/f0e-agent-expertise/F0e_PI_AUDIT_DECISIONS.md`
- `docs/projekt/f0e-agent-expertise/F0e_PI_IMPULSE_OWNERSHIP_IMPL_CHECK.md`
- `docs/projekt/f0e-agent-expertise/F0e_FA2_TRIGGER_FLAGS_KONSUMENTEN_SCAN.md`
- `docs/projekt/f0e-agent-expertise/F0e_FA5_MAPPEN_NARRATIV_LUECKEN_CHECK.md`
- `docs/projekt/f0e-agent-expertise/F0e_PI_ITEMS_FINAL.md`
- `docs/projekt/f0e-agent-expertise/gate-prototype/overlays/PROMPT_HARDENING_QUELLENTEXT.md` (v1.0)

---

## Einarbeitungs-Instruktion

1. Ziel-Datei: `/sessions/admiring-optimistic-cerf/mnt/weitergehts-online/.claude/worktrees/silly-shirley/docs/architektur/UPGRADE_PLAN_v3-12_ESCAPE_GAME_QUALITAET.md`
2. Einfuegung nach §18 "Naechste Schritte" (vor Zeile 795 `---`-Trenner) als neuer Abschnitt §19.
3. Content: §19.1 bis §19.11 aus diesem Entwurf uebernehmen.
4. Status-Zeile (Zeile 797 v1.2 2026-04-11) auf v1.3 2026-04-23 aktualisieren, Nachtrag "§19 F0e-AEF Integration hinzugefuegt".
5. Commit via Host-MCP 5-Stufen, Track-Bezeichnung: `f0e-aef-pi-integration-par-19`.
6. Nach Paul-Freigabe: Overlay v1.1 + Schema-Gate-Promotion (Phase 19.A) starten.

## Sign-Off

Paul — zu bestaetigen vor Einarbeitung in den Generator-Worktree.
