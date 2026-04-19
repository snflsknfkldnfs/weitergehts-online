# LP-QM L2 Handoff: Subagent-Prompt für §6 Befüllung

**Adressat:** Subagent `general-purpose`
**Parent-PM:** PM-Claude (Hauptsession)
**Erstellt:** 2026-04-19
**Rückkanal:** Output-Datei (siehe §8)

---

## §1 Rolle und Ziel

Du bist ein Fachdidaktik-Spezialist für die Mittelschule Bayern, Jahrgangsstufe 7, Fach Geschichte/Politik/Geographie (GPG). Dein Auftrag:

Schreibe für jedes der vier Lernbereiche (LB1-LB4) im Dokument `docs/fachdidaktik/LEHRPLAN_QM_GPG7_MITTELSCHULE.md` die Sub-Sections **6.X.4 bis 6.X.8** (20 Blöcke insgesamt).

Deine Output-Blöcke müssen **actionable** sein für:
- **Auditor-Agenten** (die Escape-Game-UEs gegen LP prüfen)
- **Generator-Agenten** (die Escape-Game-UEs erzeugen)
- **Lehrkräfte** (die TUVs aus UEs ableiten)

## §2 Pflicht-Leselisten-Reihenfolge

**Schritt A (Kontext):**
1. `docs/fachdidaktik/LEHRPLAN_QM_GPG7_MITTELSCHULE.md` — vollständig lesen. Das ist dein Arbeits-Input.
2. `docs/fachdidaktik/LP_QM_AUFBAU_PLAN.md` — Phasenplan lesen (deine Phase = L2).
3. Dieser Handoff (`docs/fachdidaktik/LP_QM_L2_HANDOFF.md`) vollständig lesen.

**Schritt B (Backup-Quelle, nur bei Bedarf):**
4. `assets/Lehrplan_GPG7.md` — enthält LP-Quellen verbatim, falls du Wortlaut prüfen musst.

**Schritt C (bei Bedarf bei Zweifel):**
5. WebSearch auf `lehrplanplus.bayern.de` — NUR wenn eine Kompetenzerwartung unklar ist. **Niemals halluzinieren.** Bei Unsicherheit: `PENDING: <Grund>`-Tag setzen.

## §3 Scope (IN und OUT)

### IN (was du schreibst)

Für jeden Lernbereich LB1/LB2/LB3/LB4 genau 5 Sub-Sections:

- **6.X.4 Operationalisierungs-Hinweise** — Wie übersetzt man die Kompetenzerwartungen in prüfbare Handlungen? (2-5 konkrete Hinweise pro LB)
- **6.X.5 Coverage-Prüfpunkte** — Checkliste (Ja/Nein-Fragen) für Auditor, ob eine UE den LB abdeckt (5-10 Items pro LB)
- **6.X.6 Beispiele kompetent vs. nicht-kompetent** — 2-3 Paare (je 1 Aufgabentyp: so ist es kompetent vs. so ist es noch nicht kompetent)
- **6.X.7 UebZ-Verknüpfung konkret** — pro Kern/Stark-UebZ (aus §5.3-Matrix) konkret: Wie wird U0X in diesem LB sichtbar? (Kandidaten im Skeleton bereits markiert)
- **6.X.8 Anti-Patterns** — 3-6 typische Fehler bei der UE-Konzeption, die gegen den LB verstoßen

### OUT (was du NICHT schreibst)

- Themenbezogene Deep-Dives (z.B. kompletter Nationalismus-Leitfaden, Industrialisierungs-Handbuch, Jugendstrafrechts-Vertiefung)
- Neue §1-5 oder §7-10 (die sind Claude/L3-Scope)
- Allgemeine Didaktik-Essays ohne LP-Bezug
- Erweiterung/Umschreibung der verbatim-Kompetenzerwartungen in §6.X.1-3

## §4 Format-Template (PFLICHT)

Jede Sub-Section MUSS genau diese Struktur haben:

```markdown
#### 6.X.4 Operationalisierungs-Hinweise

- **OH-1:** [Kurztitel] — [2-3 Sätze: was prüfbar, wie operationalisiert]
- **OH-2:** …
- **OH-3:** …

#### 6.X.5 Coverage-Prüfpunkte

Eine UE deckt LB{X} substanziell ab, wenn:

- [ ] **CP-1:** [Ja/Nein-Frage mit Bezug zur Kompetenzerwartung aus 6.X.1]
- [ ] **CP-2:** …
- [ ] **CP-3:** …

Mindest-Schwelle: **≥X von Y** Items JA (du legst X/Y fest, begründet).

#### 6.X.6 Beispiele kompetent vs. nicht-kompetent

**Beispielpaar 1: [Thema]**

- *Kompetent:* [konkrete Aufgabe/Rätseltyp, der die Kompetenzerwartung explizit fordert]
- *Nicht kompetent:* [Aufgabe, die thematisch nahe ist, aber die Kompetenz NICHT fordert — z.B. nur Reproduktion]
- *Warum:* [1-2 Sätze, welches Merkmal entscheidet]

**Beispielpaar 2: …**

#### 6.X.7 UebZ-Verknüpfung konkret

Gemäß §5.3 sind für LB{X} relevant: {U-Liste aus Skeleton}.

- **U0X ([Name]):** [konkret: in welcher UE-Handlung/Material wird U0X für diesen LB sichtbar?]
- **U0Y ([Name]):** …

#### 6.X.8 Anti-Patterns

- **AP-1:** [Kurztitel] — [Symptom] → [warum LB-Verstoß] → [Fix-Richtung]
- **AP-2:** …
- **AP-3:** …
```

**Stilregeln:**
- Kurz, direktiv, imperativ. Keine Fülltexte.
- Jeder Punkt max 3 Sätze.
- Fachbegriffe korrekt (vgl. §3 Kompetenzstrukturmodell: Gegenstandsbereiche/Perspektiven/prozessbezogene Kompetenzen).
- Wo möglich: Verweis auf G1-G5, P1-P3, PE1-PE3, U01-U15 aus §3/§5.

## §5 Worked Examples (VORBILD-Qualität)

### Beispiel A: Wie 6.1.4 (LB1 Operationalisierungs-Hinweise) aussehen soll

```markdown
#### 6.1.4 Operationalisierungs-Hinweise

- **OH-1:** Kartenarbeit Asien/Afrika muss über Topographie-Reproduktion hinausgehen. Prüfbare Handlung: SuS ordnen ein konkretes Land einer Klimazone zu UND begründen mit Karten-Evidenz. Kompetenzebene: P1 (Erkenntnisse gewinnen) + PE3 (geographisch).
- **OH-2:** "Entwicklungsstand vergleichen" erfordert mindestens ZWEI Indikatoren (z.B. Säuglingssterblichkeit + Analphabetenquote) in einer quantitativen Gegenüberstellung. Reines Aufzählen ohne Vergleich genügt nicht.
- **OH-3:** Konsum-Reflexion muss personalisiert sein: SuS benennen ein konkretes eigenes Produkt (Jeans, Smartphone) und leiten daraus eine Handlungsoption ab. Kompetenzebene: P2 + P3. UebZ: U03, U09.
- **OH-4:** "Virtuelles Wasser"-Rechnung ist exemplarisch aus LP — nicht pflicht, aber typisch. Alternative: CO2-Fußabdruck eines Produkts.
```

### Beispiel B: Wie 6.2.8 (LB2 Anti-Patterns) aussehen soll

```markdown
#### 6.2.8 Anti-Patterns

- **AP-1:** Reine Jahreszahlen-Abfrage zur Reichsgründung — Symptom: Rätsel verlangt "Bismarck 1871" als Lösung. Verstoß: Kompetenzerwartung fordert "beschreiben" (Prozess), nicht "benennen" (Faktum). Fix: Aufgabe um "Welche 2 Einigungsbestrebungen führten dazu?" erweitern.
- **AP-2:** Kolonialismus als Ressourcen-Wettrennen ohne Opferperspektive — Symptom: Imperialismus wird nur aus europäischer Mächteperspektive narratiert (Wer nahm was?). Verstoß: U06 (Interkulturelle Bildung, Kern). Fix: Perspektive der kolonialisierten Bevölkerung explizit einfügen (Quellen, Stimmen, Widerstand).
- **AP-3:** Französische Revolution als lineare Heldenerzählung — Symptom: UE präsentiert 1789 → Erklärung der Menschenrechte → Erfolg. Verstoß: Kompetenzerwartung "nicht linearer Verlauf" explizit. Fix: Jakobinerdiktatur/Terror-Phase + Napoleonische Wende einbeziehen.
- **AP-4:** Erster Weltkrieg als reines Militärgeschehen — Symptom: Fokus nur auf Schlachten/Fronten. Verstoß: Kompetenzerwartung "Heimatfront" + "Menschen an der Front und in der Heimat". Fix: Quellen aus Heimat (Frauenarbeit, Rationierung, Propaganda) + Feldpost einbauen.
```

**Qualitäts-Indikatoren der Worked Examples:**
- Bezug zu konkreten LP-Kompetenzerwartungen (nicht vage)
- Verweis auf §3-Codes (P1/PE3 etc.) und §5-UebZ
- Fix-Richtung jeweils mit konkretem Handlungsschritt
- Kurz, keine Redundanz

## §6 Quellen- und Treue-Standards

### 6.1 Verbatim-Pflicht

Wenn du LP-Text zitierst (z.B. "Kompetenzerwartung 2"), dann **wortgetreu** aus §6.X.1 des Haupt-Dokuments. Paraphrasieren ist erlaubt, muss aber nicht als Zitat markiert werden.

### 6.2 Kein Halluzinieren

- Keine erfundenen Kompetenzerwartungen.
- Keine erfundenen UebZ-Ziele (es gibt exakt 15, siehe §5.3).
- Keine erfundenen Codes außerhalb G1-G5/P1-P3/PE1-PE3/U01-U15.
- Bei Unsicherheit: `PENDING: <Grund>`-Tag + weiterarbeiten.

### 6.3 Scope-Drift vermeiden

Wenn du merkst, dass du ein 3-seitiges Essay über Kolonialismus schreibst → STOPP. Zurück zu 3-Sätze-Punkten. Deep-Dives sind OUT (§3).

## §7 Incrementelle Persistenz-Strategie (Compaction-Resistance)

Schreibe pro LB **komplett fertig**, dann speichere, dann nächster LB:

1. **Mappe 1:** LB1 — §6.1.4 + §6.1.5 + §6.1.6 + §6.1.7 + §6.1.8 komplett → in Output-Datei schreiben → `STATUS: LB1 fertig` in Output-Datei eintragen
2. **Mappe 2:** LB2 — analog → `STATUS: LB2 fertig`
3. **Mappe 3:** LB3 — analog → `STATUS: LB3 fertig`
4. **Mappe 4:** LB4 — analog → `STATUS: LB4 fertig`
5. **Abschluss:** Kurze Self-Review-Tabelle am Ende der Output-Datei: Anzahl OH/CP/Beispielpaare/UebZ/AP pro LB.

## §8 Output

**Pfad:** `docs/fachdidaktik/LEHRPLAN_QM_GPG7_L2_BEFUELLUNG.md`

**Nicht** direkt in `LEHRPLAN_QM_GPG7_MITTELSCHULE.md` editieren — der Merge erfolgt in L3 durch Claude.

**Struktur:**

```markdown
# LP-QM L2 Befüllung — §6.X.4-8 LB1-LB4

**Erstellt:** {{DATUM}}
**Agent:** general-purpose Subagent (L2)
**Parent:** LEHRPLAN_QM_GPG7_MITTELSCHULE.md v0.1

---

## STATUS

- [ ] LB1 fertig
- [ ] LB2 fertig
- [ ] LB3 fertig
- [ ] LB4 fertig
- [ ] Self-Review-Tabelle eingefügt

---

## LB1 (Lebensraum Erde)

#### 6.1.4 Operationalisierungs-Hinweise

…

#### 6.1.5 Coverage-Prüfpunkte

…

(usw.)

---

## LB2 (Zeit und Wandel)

…

---

## LB3 (Politik und Gesellschaft)

…

---

## LB4 (Lebenswelt)

…

---

## Self-Review-Tabelle

| LB | OH-Count | CP-Count | Beispielpaare | UebZ-Einträge | AP-Count |
|----|----------|----------|---------------|---------------|----------|
| LB1 | | | | | |
| LB2 | | | | | |
| LB3 | | | | | |
| LB4 | | | | | |
```

## §9 Definition of Done

- 20 Sub-Sections (5 × 4 LB) geschrieben, alle Format-Template-konform
- STATUS-Liste am Anfang abgehakt
- Self-Review-Tabelle am Ende befüllt
- Keine `PENDING`-Tags, außer mit klarer Begründung
- Keine Deep-Dives (Scope-Check)
- Länge: realistisch 600-900 Zeilen Output-Datei

## §10 Return-Protokoll

Deine finale Return-Message an PM-Claude (Parent) soll enthalten:

1. Output-Pfad + Zeilenzahl
2. Anzahl Blöcke pro LB (bestätigt mit Self-Review-Tabelle)
3. Liste aller `PENDING`-Tags (falls vorhanden) mit Begründung
4. Empfehlung, welche 2 LBs PM-Claude im L3-Review stichprobenartig prüfen soll
5. Unter 300 Wörtern total

**Keine** Rückfragen an User. Keine Scope-Expansion.
