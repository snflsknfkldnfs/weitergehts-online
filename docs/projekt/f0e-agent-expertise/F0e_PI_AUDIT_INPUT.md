---
titel: F0e-AEF PI-Item-Audit-Input
stand: 2026-04-21
zweck: Konsolidierte Input-Basis fuer formalen Audit der 7+ PI-Kandidaten vor UPGRADE_PLAN v3-12 §19-Update.
status: Sign-Off Paul erteilt (2026-04-21) auf F0e_VERGLEICHS_REVIEW.md.
scope: Nicht committed. Audit-Agent nutzt dieses Dokument als Prueflinse zusammen mit Bestandsregeln.
---

# F0e-AEF PI-Item-Audit-Input

Dieses Dokument konsolidiert die Ableitungskette **Feedback (Paul) → Strukturursache → PI-Item** fuer den externen formalen Audit. Der Audit prueft, ob die Ableitungen handwerklich sauber sind und ob die vorgeschlagenen PI-Items widerspruchsfrei und umsetzbar als Schema/Overlay/Priming-Regeln sind.

## Kontext

Basis ist der F0e-AEF Spike (BEFUND MIXED, commit 8e51a8b). 4 Runs (I1 + I2-R1/R2/R3) mit identischem Dispatch-Input erzeugten 4 inhaltlich stark divergierende quellentext-Outputs fuer mat-4-3 (Trothas Vernichtungsbefehl 1904). D1-D5 Overlay-Defekte aus F0d wurden zu 100 % eliminiert. Neu identifiziert: ein 6. Schema-Defekt D6 (`_meta.quellenkritische_impulse` String-vs-Array). Zusaetzlich deckte Pauls Didaktik-Review 5 Strukturursachen jenseits des Schema-Scopes auf.

Siehe Referenz-Dokumente am Ende dieses Dokuments.

---

## 1. Paul-Feedback (Sign-Off-Stand, actionable qualifiziert)

Quelle: `runs/F0e_VERGLEICHS_REVIEW.md` Paul-Feedback-Sektion. Sinngemaess zusammengefasst:

- **F1 (betrifft I1):** Fachwort- und Eigennamen-Dichte ("Generalleutnant", "Herero", "Landraub") nicht am DaZ-Profil geeicht; keine Inline-Erklaerung, keine Ersetzung.
- **F2 (betrifft I1):** Kursiv-Nachweis-Absatz dupliziert Bibliografie, die im `quelle`-Feld bereits vollstaendig ist — SSOT-Verletzung im `inhalt`.
- **F3 (betrifft I1, I2-R3):** "Denk nach"/Denkanstoss-Bloecke mit direkter Schueler-Ansprache gehoeren in die Aufgaben-Generator-Stufe (Arbeitsblatt), nicht in `inhalt`; redundant zu `_meta.quellenkritische_impulse`.
- **F4 (betrifft I2-R1, I2-R2, I2-R3):** Wortanzahl ueber didaktischem Budget fuer durchschnittliches Niveau in Jgst 7 MS (158 / 218 / 268 W).
- **F5 (betrifft alle I2-Runs):** `_meta.quellenkritische_impulse` systemisch falsche Pipeline-Phase — gehoert in Aufgaben-Generator, nicht Material-Generator.
- **F6 (betrifft I2-R2):** Nachweis-Absatz ohne kohaerente 3-Schritt-Dramaturgie (Einordnung → Konsequenz → Bewertung) — Baustein-Akkumulation.
- **F7 (betrifft I2-R2, positives Muster):** Meta-sprachliche Begriffs-Rahmung ("Historiker nennen ihn heute den 'Vernichtungsbefehl'") markiert Begriff als historiografisches Urteil, nicht als Taeter-Eigenbezeichnung — didaktisch stark, aktuell nicht systematisch generiert.

Zusaetzlich aus Spike-Befund:
- **F8 (D6, betrifft I2-R3):** `_meta.quellenkritische_impulse` als String statt Array → Schema-FAIL; Overlay v1.0 adressiert nur Feld-Whitelist (Existenz), nicht Typ-Kontrakt innerhalb Whitelist-Feld.

---

## 2. Strukturursachen-Hypothesen (Claude-Diagnose)

Zuordnung F → Strukturursache:

| Feedback-Punkt | Strukturursache-Hypothese |
|---|---|
| F1 | Kein Lerngruppen-Profil (DaZ-Anteil, Niveau-Stufe) im Dispatch-Input. Whitelist prueft politische Korrektheit kolonialer Begriffe, nicht Verstaendlichkeit am Adressaten. |
| F2 | Kein SSOT-Kontrakt "quelle-Feld = einzige Bibliografie"; `inhalt` hat keine Verbots-Regel gegen Zitationsangaben. |
| F3, F5 | Keine Phasen-Trennung Material-Generator vs. Aufgaben-Generator; Material-Generator erzeugt Impulse, die systemisch in spaetere Pipeline-Stufe gehoeren. |
| F4 | Keine harte Wortanzahl-Obergrenze im Schema oder Overlay; `_meta.wortanzahl` wird nur deklariert, nicht validiert. |
| F6 | Keine Dramaturgie-Vorgabe fuer Nachweis-Absatz; Priming sagt "Einleitung → Zitat → Nachweis" als Struktur, aber Nachweis ist freier Content-Bucket. |
| F7 | Positives Muster nicht im Priming kodifiziert; wird vom Agent emergent gewaehlt, nicht systematisch reproduziert. |
| F8 | Overlay v1.0 §1 adressiert Feld-Whitelist (Existenz-Kontrakt), nicht Typ-Kontrakt je Whitelist-Feld. |

---

## 3. Vorgeschlagene PI-Items

Sieben PI-Kandidaten plus Revision zweier bestehender Items (aus F0e_AGENT_EXPERTISE_BEFUND.md).

### 3.1 PI-SCHEMA-STRICT-01 + D6-Addition (bestehend, ready for promotion)

- **Status:** READY FOR PROMOTION (aus F0e-Befund bereits identifiziert).
- **Addition durch F8:** Overlay §1 erweitern um Typ-Hinweise je Whitelist-Feld (z.B. `quellenkritische_impulse: array<string>`). Damit wird D6-Luecke geschlossen.
- **Umsetzung:** Overlay v1.0 → v1.1, dann Generator-Repo-Sync `agents/SUB_MATERIAL_QUELLENTEXT.md` v3.10.4 → v3.11.0.
- **Betroffen:** Schema/Overlay-Ebene.

### 3.2 PI-CONTENT-LENGTH-01 (bestehend, **Obergrenze nachkalibriert**)

- **Ursprung:** F0e-Befund.
- **Revision basierend auf Paul-Feedback:** Obergrenze **150 W** (nicht 180). Paul-Feedback zu I2-R2 (158 W): "zu lang" trotz inhaltlicher Staerke.
- **Umsetzung:** Q-Gate nach Schema-Gate. Regel: `typ=quellentext` erfordert `_meta.wortanzahl ≤ 150`. WARN ab 130 W.
- **Betroffen:** Q-Gate-Ebene (kein Schema-Change).

### 3.3 PI-MULTIPERSPEKTIVE-INHALT-01 (bestehend, **revidiert**)

- **Ursprung:** F0e-Befund (als schwaches Advisory-Q-Gate).
- **Revision basierend auf Paul-Feedback (F3, F5):** Frage "P3 im inhalt?" aufloesen in "P3 als Aussagesatz, nicht als Frage". Geht auf in PI-PHASEN-TRENNUNG-01. **Streichung als eigenes PI-Item erwogen**, wenn Phasen-Trennung die Funktion abdeckt.

### 3.4 PI-TRIGGERFLAG-ENUM-01 (bestehend, unveraendert)

- **Status:** optional, deferred. Paul-Feedback beruehrt dieses Item nicht. Bleibt wie im F0e-Befund.

### 3.5 PI-ZIELGRUPPE-PROFIL-01 (neu, blocking, P2)

- **Ursprung:** F1.
- **Inhalt:** Pflicht-Input-Feld fuer Dispatch-Prompt: Lerngruppen-Profil mit (a) DaZ-Anteil (%-Wert oder Kategorie low/mid/high), (b) Niveau-Stufe (leistungsschwach/durchschnittlich/heterogen), (c) optional Vorwissens-Status.
- **Wirkung:** Feeds in F0B-Priming als konditionale Whitelist-Verschaerfung. "Generalleutnant" wuerde fuer DaZ=high durch "General" ersetzt oder inline erklaert.
- **Betroffen:** Input-Schema + Priming + Dispatcher.

### 3.6 PI-PHASEN-TRENNUNG-01 (neu, blocking, P1)

- **Ursprung:** F3, F5.
- **Inhalt:** `inhalt` enthaelt AUSSCHLIESSLICH erzaehlende Prosa + Primaerquelle + minimale Rahmung. Verbotsliste: (a) direkte Leserfragen mit Fragepronomen (wer/was/warum/wie als Frage-Subjekt), (b) Denk-nach-/Denkanstoss-Bloecke, (c) Impuls-Listen als Aufzaehlung. Impulse bleiben in `_meta.quellenkritische_impulse`. Aufgaben-Generator-Stufe (separate Pipeline-Phase) nutzt diese als Input.
- **Wirkung:** Eliminiert Phasen-Vermischung in 3/4 F0e-Runs. Vereinheitlicht Material-Output-Form.
- **Betroffen:** Overlay-Ebene (Schema-Excerpt + Verbots-Regel) + ggf. Pipeline-Architektur (wenn Aufgaben-Generator bisher nicht existiert).

### 3.7 PI-QUELLE-SSOT-01 (neu, blocking, P1)

- **Ursprung:** F2.
- **Inhalt:** `inhalt` enthaelt keine Quellenangabe. `quelle`-Feld ist einzige autoritative Bibliografie. Check als Regex-Q-Gate: "Zitiert nach|Quelle:|Wikipedia|Autor-Nachname gefolgt von Datum" **im `inhalt`** → FAIL.
- **Wirkung:** Eliminiert Nachweis-Doppelung (2/4 F0e-Runs).
- **Betroffen:** Overlay-Ebene + Q-Gate-Regel.

### 3.8 PI-FACHWORT-ERKLAERUNG-01 (neu, soft, P2)

- **Ursprung:** F1.
- **Inhalt:** Jedes Fachwort ausserhalb R7-Alltags-Vokabular (Komposita ≥3 Morpheme, militaerische Raenge, geografische/ethnonyme Eigennamen) braucht Inline-Kurzerklaerung (Klammer-Appo, 3-8 Woerter) oder niedrigschwellige Ersetzung. Pflicht bei DaZ-Profil (aus PI-ZIELGRUPPE-PROFIL-01), Empfehlung sonst.
- **Abhaengigkeit:** Setzt PI-ZIELGRUPPE-PROFIL-01 voraus.
- **Betroffen:** Priming-Ebene.

### 3.9 PI-NACHWEIS-DRAMATURGIE-01 (neu, soft, P3)

- **Ursprung:** F6.
- **Inhalt:** Nachweis-Absatz folgt 3-Schritt-Struktur: (1) historische Einordnung, (2) Konsequenz/Umfang, (3) heutige Bewertung. Keine Baustein-Akkumulation.
- **Betroffen:** Priming-Ebene.

### 3.10 PI-META-BEZEICHNUNG-01 (neu, weak, P3)

- **Ursprung:** F7.
- **Inhalt:** Historische Begriffe mit sprachlicher Autoritaets-Markierung einfuehren ("Historiker nennen...", "Die Wissenschaft spricht von..."). Verhindert unreflektierte Uebernahme von Taeter-Eigenbezeichnungen.
- **Betroffen:** Priming-Ebene (Beispiel-Muster).

---

## 4. Priorisierung (Claude-Einschaetzung)

| P | PI-Item | Begruendung |
|---|---|---|
| P1 Sofort | PI-PHASEN-TRENNUNG-01 | 3/4 Runs betroffen, loest Meta-Problem der Pipeline-Architektur |
| P1 Sofort | PI-QUELLE-SSOT-01 | 2/4 Runs, triviale Overlay-Regel, sofort wirksam |
| P1 Sofort | PI-CONTENT-LENGTH-01 (150 W) | 3/4 Runs, einfachster Q-Gate, groesster Qualitaetssprung |
| P1 Sofort | PI-SCHEMA-STRICT-01 + D6 | bereits ready, Generator-Repo-Sync-Kandidat |
| P2 | PI-ZIELGRUPPE-PROFIL-01 | groesserer Eingriff (Input-Schema + Priming), grundlegend fuer DaZ-Tauglichkeit |
| P2 | PI-FACHWORT-ERKLAERUNG-01 | abhaengig von PI-ZIELGRUPPE-PROFIL-01 |
| P3 | PI-NACHWEIS-DRAMATURGIE-01 | Strukturschaerfung, nicht blockierend |
| P3 | PI-META-BEZEICHNUNG-01 | positives Muster, low impact |
| deferred | PI-TRIGGERFLAG-ENUM-01 | semantisch nicht blockierend |
| streichen? | PI-MULTIPERSPEKTIVE-INHALT-01 | geht moeglicherweise in PI-PHASEN-TRENNUNG-01 auf |

---

## 5. Audit-Pruefauftrag (5 Dimensionen)

Der Auditor prueft die Ableitungskette und die PI-Item-Definitionen entlang folgender Dimensionen. Ergebnis je Befund: Severity (BLOCKER/MAJOR/MINOR/INFO), betroffenes PI-Item, konkrete Empfehlung.

### Dimension A — Coverage

- Ist jeder Feedback-Punkt F1-F8 vollstaendig durch mindestens ein PI-Item adressiert?
- Gibt es un-gemappte Reststuecke im Feedback?
- Gibt es Ueber-Abdeckung (mehrere PI-Items fuer denselben Feedback-Punkt ohne klare Rollenteilung)?

### Dimension B — Konsistenz

- Konflikte zwischen den PI-Items untereinander? (z.B. PI-PHASEN-TRENNUNG-01 verbietet Impuls-Listen im `inhalt`; kollidiert das mit bestehenden Overlay-Regeln?)
- Konflikte mit Bestandsregeln: Overlay v1.0 (`PROMPT_HARDENING_QUELLENTEXT.md`), Schema v3.10.2, VERTRAG_PHASE_2-1_MATERIAL, MATERIAL_PIPELINE, F0b-Priming/Mechanismen, DIDAKTIK_RAHMEN?

### Dimension C — Enforceability

- Ist jedes PI-Item als Regel technisch umsetzbar (Schema / Overlay / Priming / Q-Gate)?
- Existiert ein prueffbarer Accept/Reject-Test pro PI-Item? (Regex? Enum? Struktur-Pattern? Qualitativ?)
- Wenn qualitativ: wie messbar/reproduzierbar?

### Dimension D — Proportionalitaet

- Ist die Priorisierung P1/P2/P3 empirisch gerechtfertigt?
- Gibt es Ueber-Dimensionierung (z.B. PI-ZIELGRUPPE-PROFIL-01 als Input-Schema-Aenderung) gegen die Wirkung?
- Gibt es Unter-Dimensionierung (PI-Item "soft", obwohl Paul-Feedback es als blockierend impliziert)?

### Dimension E — Second-Order-Effekte

- PI-PHASEN-TRENNUNG-01 aendert Pipeline-Architektur. Welche bestehenden Generator-Pfade brechen? (Referenz: MATERIAL_PIPELINE.md)
- Welche anderen Subagenten sind mitbetroffen (nicht nur quellentext)?
- Welche Konsequenzen fuer bestehenden Produktions-Stand? Migration-Pfad erforderlich?

---

## 6. Audit-Output-Erwartung

Strukturiertes Markdown-Dokument `F0e_PI_AUDIT_REPORT.md` mit:

1. Executive Summary (≤ 10 Zeilen): Gesamtbefund, Anzahl Findings nach Severity.
2. Findings-Tabelle: ID, Dimension, Severity, PI-Item(s), Befund, Empfehlung.
3. Coverage-Matrix: Feedback-Punkt F1-F8 × PI-Item(s), Abdeckungsgrad.
4. Konflikt-Matrix: PI-Item × Bestandsregel-Dokument, Konflikttyp.
5. Enforceability-Tabelle: PI-Item × Accept/Reject-Test-Vorschlag.
6. Gesamt-Empfehlung: (a) freigeben fuer §19-Update unveraendert, (b) freigeben mit Modifikationen (liste), (c) blockieren bis Folge-Spike.

---

## 7. Referenz-Dokumente (Audit-Scope)

**Primaere Audit-Basis (in diesem Repo):**
- `docs/projekt/f0e-agent-expertise/F0e_AGENT_EXPERTISE_SPIKE.md` — Spike-Plan
- `docs/projekt/f0e-agent-expertise/F0e_AGENT_EXPERTISE_BEFUND.md` — Spike-Befund MIXED
- `docs/projekt/f0e-agent-expertise/runs/F0e_VERGLEICHS_REVIEW.md` — Paul-Sign-Off
- `docs/projekt/f0e-agent-expertise/gate-prototype/overlays/PROMPT_HARDENING_QUELLENTEXT.md` — Overlay v1.0
- `docs/projekt/f0e-agent-expertise/gate-prototype/schemas/material_quellentext_partial_v3.10.2.json` — Partial-Schema
- `docs/projekt/f0e-agent-expertise/gate-prototype/schemas/material_quellentext_v3.10.2.json` — Full-Schema
- `docs/projekt/f0e-agent-expertise/AUDIT_QUELLENTEXT_CURRENT.md` — Audit-Baseline vor Spike

**Bestandsregeln (via worktree-Pfad zugreifbar):**
- `.claude/worktrees/silly-shirley/docs/architektur/MATERIAL_PIPELINE.md` — Pipeline-Architektur (Schluessel fuer PI-PHASEN-TRENNUNG-01)
- `.claude/worktrees/silly-shirley/docs/architektur/vertraege/VERTRAG_PHASE_2-1_MATERIAL.md` — Material-Phase-Vertrag
- `.claude/worktrees/silly-shirley/docs/architektur/vertraege/VERTRAG_PHASE_2-2b_AUFGABE.md` — Aufgaben-Phase-Vertrag
- `.claude/worktrees/silly-shirley/docs/architektur/vertraege/VERTRAG_PHASE_0-1_DIDAKTIK.md` — Didaktik-Vertrag
- `.claude/worktrees/silly-shirley/docs/architektur/UPGRADE_PLAN_v3-12_ESCAPE_GAME_QUALITAET.md` — Ziel-Plan (§19 wird hier geaendert)

**Baseline-Referenzen (F0d):**
- `docs/projekt/F0d_BEFUND.md`
- `docs/projekt/F0d_DISPATCH_SPIKE_PLAN.md`

**Fallstudie mat-4-3:**
- `docs/projekt/f0e-agent-expertise/runs/iteration-1/review_iter1_run1.md`
- `docs/projekt/f0e-agent-expertise/runs/iteration-2/run-{1,2,3}/review.md`
- `docs/projekt/f0e-agent-expertise/runs/iteration-{1,2}/**/merged.json`

---

**Audit-Start:** nach Bestaetigung Paul.
