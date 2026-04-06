# Session 14 Masterplan: Phase-0-Haertung + Game-2-Kickoff

**Datum:** 2026-04-06
**Kontext:** Phase IV Wave 3 PM-Strang committed. Infrastruktur fuer Mappen-Produktion (Phase 2) optimiert. Phase 0 (Game-Level-Erstellung) hat keine Vertraege, keine formalen Q-Gates ausser SK-Katalog (Skript) und G/HE-Katalog (Hefteintrag).
**Ziel:** Phase-0-Infrastruktur auf das Niveau der Phase-2-Infrastruktur bringen, dann Game 2 starten.

---

## 1. Problemanalyse

### 1.1 Ist-Stand Phase-0-Agenten

| Agent | Phase | Steuerung | Q-Gate | Vertrag | Guetekriterien |
|---|---|---|---|---|---|
| AGENT_DIDAKTIK | 0.1 | ORCHESTRATOR §0.1 (inline, ~20 Zeilen) | Nein (User-Validierung informell) | Nein | Nein |
| AGENT_INHALT | 0.2 | ORCHESTRATOR §0.2 (inline, ~15 Zeilen) | Nein | Nein | Nein |
| AGENT_ARTEFAKT | 0.2b | ORCHESTRATOR §0.2b (inline, ~20 Zeilen) | Nein | Nein | Nein |
| AGENT_SKRIPT | 0.3 | ORCHESTRATOR §0.3 (inline, ~25 Zeilen) | SK1-SK17 (existiert) | Nein | SK1-SK17 |
| AGENT_HEFTEINTRAG | 0.4 | ORCHESTRATOR §0.4 (inline, ~20 Zeilen) | G1-G14 + HE1-HE13 (existiert) | Nein | G1-G14, HE1-HE13 |

### 1.2 Risiko-Matrix fuer Game 2

| Risiko | Eintrittswahrscheinlichkeit | Auswirkung | Begruendung |
|---|---|---|---|
| INHALTSBASIS lueckenhaft | HOCH | HOCH | Neues Thema, neuer Wikipedia-Recherche-Scope. Ohne Vertrag keine Pruefung auf Vollstaendigkeit. Game 1 INHALTSBASIS musste nachgebessert werden (Validierungsstatus: "Nachbesserung"). |
| SKRIPT-Qualitaet schwankt | MITTEL | HOCH | SK-Katalog existiert, aber kein formaler Vertrag mit Input/Output/Q-Gate-Enforcement. Game 1 Skript-Qualitaet war gut, aber nicht gegen SK17 (STR-06 Umfangs-Plausibilitaet) geprueft. |
| DIDAKTIK_RAHMEN unterspezifiziert | MITTEL | MITTEL | Game 1 DIDAKTIK_RAHMEN war solide, aber Format nicht standardisiert. Fehlende Felder koennen zu Scope-Drift in nachgelagerten Phasen fuehren. |
| ARTEFAKT_INVENTAR unvollstaendig | MITTEL | MITTEL | Game 1 hatte 309 Zeilen, gut strukturiert. Aber: kein Q-Gate gegen Mindest-Coverage, keine Pruefung auf Lizenzkompatibilitaet systematisch. |
| Mappen-Struktur suboptimal | NIEDRIG | HOCH | Mappen-Aufteilung bei Game 1 war vom User validiert und funktional. Risiko bei Game 2 aehnlich niedrig, aber Fehler hier propagieren durch alle Phasen. |

### 1.3 Kern-Diagnose

Phase 0 produziert die **gesamte inhaltliche Grundlage** des Games. Qualitaetsprobleme hier propagieren durch alle nachfolgenden Phasen und werden durch die optimierte Phase-2-Infrastruktur nicht abgefangen — im Gegenteil, Phase 2 verstaerkt eventuelle Phase-0-Fehler, weil sie sie in formal korrekte, aber inhaltlich falsche Artefakte transformiert.

---

## 2. Wave-4-Plan

### W4-A: Vertrag-Extraktion Phase 0 (PM-only)

**Ziel:** Formale Vertraege fuer Phase 0.1-0.3 nach dem Muster der Phase-2-Vertraege.

**Liefergegenstande:**

| Dokument | Extrahiert aus | Inhalt |
|---|---|---|
| VERTRAG_PHASE_0-1_DIDAKTIK.md | ORCHESTRATOR §0.1 + WORKFLOW_v4 §3 + Game-1 DIDAKTIK_RAHMEN (Ist-Format) | Input-Spec (thema, lehrplanbezug, jahrgangsstufe, mappen_anzahl), Output-Schema (KE-Matrix, Teilziele, Mappen-Grobstruktur, Stundenziel), Q-Gate (QD1-QD8: Lehrplan-Abdeckung, AFB-Verteilung, Mappen-Balance, Progression), User-Validierungspunkt |
| VERTRAG_PHASE_0-2_INHALT.md | ORCHESTRATOR §0.2 + WORKFLOW_v4 §3 + Game-1 INHALTSBASIS (Ist-Format) | Input-Spec (DIDAKTIK_RAHMEN), Wikipedia-Recherche-Protokoll (Haupt- + Vertiefungsartikel pro Mappe), Output-Schema (Fakten pro Mappe, Chronologie, Akteure, Belege), Q-Gate (QI1-QI6: Quellen-Diversitaet, Faktentreue, Mappe-Zuordnung, Vollstaendigkeit vs. DIDAKTIK_RAHMEN), Mindest-Coverage-Regel |
| VERTRAG_PHASE_0-3_SKRIPT.md | ORCHESTRATOR §0.3 + WORKFLOW_v4 §3 + SK1-SK17 + Game-1 SKRIPT (Ist-Format) | Input-Spec (DIDAKTIK_RAHMEN + INHALTSBASIS), Chunking-Regeln (600-900 W/Chunk, Mappen-Alignment), Artefakt-Marker-Syntax, Output-Schema (Chunks + Artefakt-Zuordnung + KE-Abdeckung), Q-Gate (SK1-SK17 als formales Gate, nicht nur Referenz), STR-06 SK17 Umfangs-Plausibilitaet |

**Nicht-Liefergegenstande (bewusst ausgeklammert):**
- AGENT_HEFTEINTRAG braucht keinen neuen Vertrag (G/HE-Kataloge + SCPL sind ausreichend formalisiert)
- AGENT_ARTEFAKT: Kein eigener Vertrag, stattdessen Qualitaetskriterien als Abschnitt in VERTRAG_PHASE_0-2_INHALT (Artefakt-Sichtung ist Teilschritt von Phase 0.2)

**Methode:**
1. Game-1-Artefakt als Format-Vorlage lesen
2. ORCHESTRATOR-Inline-Spec extrahieren
3. Luecken identifizieren (was fehlt im ORCHESTRATOR, was Game 1 ad-hoc geloest hat)
4. Vertrag schreiben mit Q-Gate-Tabelle

**Aufwand:** ~45 Min (3 Vertraege, mittlere Komplexitaet)

---

### W4-B: Game-1-Rueckblick-Audit

**Ziel:** Die 3 neuen Vertraege gegen die existierenden Game-1-Phase-0-Artefakte pruefen. Findings sammeln: Was waere bei formalem Q-Gate aufgefallen?

**Methode:** Parallel-Audit mit 3 Dimensionen:

| Dimension | Pruefgegenstand | Prueffrage |
|---|---|---|
| D1: DIDAKTIK_RAHMEN | `DIDAKTIK_RAHMEN_gpg-erster-weltkrieg-ursachen.md` (152 Z) | Erfuellt das Artefakt den neuen VERTRAG_PHASE_0-1? Welche Felder fehlen? Welche Q-Gate-Kriterien waeren FAIL? |
| D2: INHALTSBASIS | `INHALTSBASIS_gpg-erster-weltkrieg-ursachen.md` (397 Z) | Erfuellt das Artefakt den neuen VERTRAG_PHASE_0-2? Quellen-Coverage? Fakten-Luecken? |
| D3: SKRIPT | `SKRIPT_gpg-erster-weltkrieg-ursachen.md` (287 Z) | Erfuellt das Artefakt SK1-SK17 formal? Chunking-Regeln? Umfangs-Plausibilitaet (SK17)? |

**Output:** BEFUND-PHASE-0-RUECKBLICK.md mit Findings, Severity, und direkter Implikation fuer Vertragsnachschaerfung.

**Aufwand:** ~30 Min (3 Artefakte, je 5-10 Pruefpunkte)

---

### W4-C: Game-2 Design-Spike

**Ziel:** Phase 0.1 + 0.2 fuer Game 2 ("Wie endete der Erste Weltkrieg?") mit den neuen Vertraegen durchlaufen. Proof-of-Process.

**Scope Game 2:**
- **Thema:** "Der Erste Weltkrieg — Kriegsverlauf und Ende"
- **Lehrplanbezug:** GPG7_LB2_K_06/K_07 (Verlauf, Menschen an Front und Heimat), GPG7_LB2_I_06 (Stellungskrieg, Technisierung, Heimatfront)
- **Mappen-Hypothese (vorlaeufig, User-Validierung noetig):**
  - Mappe 1: Stellungskrieg — Alltag an der Westfront
  - Mappe 2: Technisierung — Neue Waffen, neue Kriegsfuehrung
  - Mappe 3: Heimatfront — Leben hinter der Front
  - Mappe 4: Kriegsende — Revolution, Waffenstillstand, Folgen

**Ablauf:**
1. VERTRAG_PHASE_0-1_DIDAKTIK ausfuehren: DIDAKTIK_RAHMEN Game 2 produzieren
2. User-Validierung: Mappen-Struktur, KE-Matrix, Teilziele pruefen
3. VERTRAG_PHASE_0-2_INHALT ausfuehren: INHALTSBASIS Game 2 produzieren (Wikipedia-Recherche)
4. Q-Gate gegen Vertrag pruefen
5. Findings → Vertragsnachschaerfung falls noetig

**Entscheidungspunkt nach Schritt 2:** Wenn User die Mappen-Struktur ablehnt/aendert, Iteration. Wenn PASS → weiter mit INHALTSBASIS.

**Aufwand:** ~60-90 Min (DIDAKTIK + INHALT + Validierung)

---

## 3. Abhaengigkeiten und Sequenz

```
W4-A: Vertraege extrahieren
  │
  ▼
W4-B: Game-1-Rueckblick-Audit
  │
  ├─→ Vertragsnachschaerfung (falls Findings)
  │
  ▼
W4-C: Game-2 Design-Spike (Phase 0.1 + 0.2)
  │
  ├─→ User-Validierung DIDAKTIK_RAHMEN
  │
  ▼
[Naechste Session] Game-2 Phase 0.3 (SKRIPT) + 0.4 (HEFTEINTRAG)
  │
  ▼
[Folge-Sessions] Game-2 Phase 1 + Phase 2 (mit optimierter Infrastruktur)
```

W4-A → W4-B ist strikt sequentiell (Audit braucht Vertraege). W4-B → W4-C kann in derselben Session stattfinden, wenn W4-B keine grossen Nachschaerfungen ergibt.

---

## 4. Erfolgskriterien

| Kriterium | Messung |
|---|---|
| Phase-0-Vertraege sind operational | 3 Vertraege mit Q-Gate-Tabellen geschrieben und im Repo |
| Game-1-Rueckblick zeigt Vertrags-Wirksamkeit | Mindestens 2 Findings, die ohne Vertrag durchgerutscht waeren |
| Game-2 DIDAKTIK_RAHMEN ist User-validiert | User hat Mappen-Struktur, KE-Matrix, Teilziele abgenommen |
| Game-2 INHALTSBASIS besteht Q-Gate | Alle QI-Kriterien PASS oder dokumentierte WARN |

---

## 5. Scope-Grenzen

- Phase 0.2b (AGENT_ARTEFAKT) bekommt keinen eigenen Vertrag — Artefakt-Sichtung bleibt als Abschnitt in VERTRAG_PHASE_0-2_INHALT
- AGENT_HEFTEINTRAG bekommt keinen neuen Vertrag (bereits gut abgesichert)
- Kein Redesign des ORCHESTRATOR in dieser Wave — Vertraege sind Ergaenzung, nicht Ersatz
- Kein Code-Strang in W4 (rein PM + Produktion)
- Game-2 Phase 0.3 (SKRIPT) + 0.4 (HEFTEINTRAG) sind NICHT Teil von W4-C, sondern Folge-Session
