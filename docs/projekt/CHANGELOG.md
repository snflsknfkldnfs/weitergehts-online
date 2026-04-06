# Changelog: Interaktive Unterrichtsmaterialien -- weitergehts.online

Chronologisches Protokoll aller Arbeitsschritte. Neueste Einträge oben.

---

## 2026-04-06 — Session 13 Block 1: AU-1 CLOSED, Framework-Etablierung, Cleanup, Masterplan

**Phase:** D15b-Optimierung Phase IV Wave 1 AU-1 → CLOSED, AU-2a Vorbereitung
**Modus:** EXECUTE
**Atom-Unit:** Infrastruktur-Block (kein AU-Inhalt, Rahmen + Dokumentation + Cleanup)

**Abschluss AU-1 (Verifikation):**
- Commit-Hashes: PM-Strang `5c718df` (Session 12 Fortsetzung 2) + Code-Strang `5b470c5` (Claude-Code, Session 12 Fortsetzung 3, Worktree `festive-benz`). Code-Strang per Fast-Forward in `main` gemerged, auf `origin/main` gepusht.
- Smoke-Test Claude-Code gruen: `aufgabe-4-8` (typ=vergleich, L4) und `aufgabe-4-9` (typ=begruendung, L5 CER) rendern und validieren im Browser korrekt.
- 1 UI-Befund nicht blockierend: Vergleich-Input-Zellen im Notizbuch-Handschrift-Theme schneiden Text horizontal ab (Zellenhoehe zu niedrig). Erfasst als `docs/befunde/BEFUND-AU-1-UI-01.md`, Zuweisung AU-2c.

**Framework-Etablierung: Git-Workflow-Rahmen**
- Anlass: In Sessions 11 und 12 trat mehrfach dieselbe Fehlerklasse auf — zsh heredoc + `#` Kommentarzeilen (ohne `setopt interactive_comments`), persistente `.git/index.lock`, Claude-Code-Worktree-Leichen nach Merge. Copy-Paste-Rueckmeldeschleife friktionsreich.
- Neues Dokument: `docs/projekt/GIT_WORKFLOW_RAHMEN.md` (~130 Zeilen).
  - §1 Ebenen-Rollen: User/Cowork/Claude-Code mit getrennten write/push/terminal-Rechten.
  - §2 Default-Workflow: Copy-Paste mit `git commit -F <datei>` statt Heredoc (umgeht zsh-`#`-Bug vollstaendig).
  - §3 Extended osascript-Workflow (opt-in pro Session).
    - §3.1 Operations-Klassen L (read) / S (state-change local) / R (remote-effecting, push/fetch) / V (verboten ohne User-Entscheidung).
    - §3.2 Ausfuehrungs-Protokoll: Ankuendigung → Ausfuehrung → Ergebnis-Log → Session-Ende-Aggregat ins CHANGELOG.
    - §3.3 Entscheidungsbaum.
    - §3.4 Recovery-Patterns: Index-Lock, Worktree-Leichen, Heredoc-Alternative.
  - §4 Audit-Format `[YYYY-MM-DD HH:MM] Cowork osascript <Klasse>: <cmd>` mit Session-Ende-Rollup.
  - §5 Abgrenzungen: ersetzt NICHT Claude-Code-Worktree-Pattern, KEIN Auto-Push, KEIN Bulk-Destructive, KEIN Umgehen der Pre-Commit-Gate-3-Checks.
- Ersetzt Copy-Paste-Pflicht NICHT, sondern bietet gated opt-in-Pfad. Kompatibel mit COWORK_PROJECT_ANLEITUNG.md.

**Session-13-Cleanup (via osascript Klasse S):**
- Claude-Code Worktree `festive-benz` entfernt + lokaler Branch `claude/festive-benz` geloescht + Remote-Branch `origin/claude/festive-benz` geloescht (verifiziert merged in main).
- Alt-Worktrees `elegant-wilson` + `heuristic-galileo` entfernt + Branches `claude/elegant-wilson` + `claude/heuristic-galileo` geloescht (beide verifiziert merged, 29 bzw. 73 Commits ahead, alle im main).
- Standalone-Branch `fix/mappe2-quality-patches` geloescht (81 Commits, merged).
- `docs/projekt/D15B_OPTIMIERUNGS_STRATEGIEN.md` via `git checkout --` revertiert (Diff war reine Tabellen-Spalten-Alignment-Formatierung ohne Inhaltsaenderung).
- **Finaler Repo-State:** `main @ 5b470c5`, 1 Worktree, 1 Branch, clean bis auf neue Dokumentation dieser Session.

**Git-Ops-Log (Rahmen §4):**
```
[2026-04-06] Cowork osascript L: git worktree list / git branch -l / git status / git log --oneline --graph origin/main..claude/<branch> → Triage-Input
[2026-04-06] Cowork osascript S: git worktree remove .claude/worktrees/festive-benz; git branch -d claude/festive-benz
[2026-04-06] Cowork osascript R: git push origin --delete claude/festive-benz
[2026-04-06] Cowork osascript S: git checkout -- docs/projekt/D15B_OPTIMIERUNGS_STRATEGIEN.md
[2026-04-06] Cowork osascript S: git worktree remove .claude/worktrees/elegant-wilson; git branch -d claude/elegant-wilson
[2026-04-06] Cowork osascript S: git worktree remove .claude/worktrees/heuristic-galileo; git branch -d claude/heuristic-galileo
[2026-04-06] Cowork osascript S: git branch -d fix/mappe2-quality-patches
```

**Masterplan persistiert (Kompaktions-Resilienz):**
- Neues Dokument: `docs/projekt/SESSION_13_MASTERPLAN.md`.
- User-Entscheidungen dokumentiert: E1=B (STR-03 hybrider Backfill via Auto-Generator-Dispatch), E2=B (STR-04 pro Aufgabentyp didaktisch-qualitativ evaluiert), E3=Cowork-Entscheid zum Systemziel.
- **E3-Ergebnis:** SPLIT AU-2 in AU-2a (STR-03 Feedback-Schema), AU-2b (STR-04 Tipps, pro-Typ), AU-2c (BEFUND-AU-1-UI-01).
  - Begruendung: (1) ATOM-UNIT-Prinzip — AU-2 monolithisch waere ~3× AU-1, Rollback-Radius inakzeptabel. (2) Strukturelle Abhaengigkeit — STR-03-Schema geht STR-04-Tipps voraus (Tipps sind `ebene: "hinweis"` im normalisierten Schema). (3) E2-Evaluations-Tiefe — 10-Typen-Pro-Typ-Pruefung muss vor AU-2b-Dispatch und wuerde AU-2 ohne Split um eine Sub-Phase aufblaehen. (4) UI-Befund-Entkopplung — AU-2c ist reines CSS, darf den Code-Strang nicht versperren.
- DoD AU-2a, Ausfuehrungsplan (14 Schritte), Abbruch-/Recovery-Punkte pro Schritt, Risiken (R1-R4 mit Mitigationen) dokumentiert.

**PM-Infrastruktur-Beobachtung:**
- `projekt-website-v4-2` Skill teilweise veraltet bestaetigt. `COWORK_PROJECT_ANLEITUNG.md` ist authoritative Quelle. Memory-Eintrag angelegt (`.auto-memory/feedback_skill_vs_anleitung_prioritaet.md`).

**Naechster Schritt:** AU-2a Inhaltsarbeit gemaess Masterplan Schritt 5 ff. — BEFUND-AU-1-UI-01 anlegen, VERTRAG_ATOM_UNITS.md AU-2-Split, dann Vertrag 2-2b / Feedback-Schema / Subagenten / Guetekriterien / Backfill-Dispatch / Uebergabe / Commit-Block.

---

## 2026-04-05 — Session 12 (Fortsetzung 3): D15b Phase IV Wave 1 AU-1 Code-Strang DONE

**Phase:** D15b-Optimierung Phase IV Wave 1 AU-1 (Code-Strang nach PM-Strang Block 1+2)
**Modus:** EXECUTE (Claude-Code)
**ATOM-UNIT:** AU-1 (VERTRAG_ATOM_UNITS.md §3) — alle Aenderungen in EINEM Commit

**Scopes (siehe UEBERGABE_PHASE_IV_WAVE_1_AU_1.md):**
- **A Engine-Registry** `assets/js/escape-engine.js` — 2 neue Aufgabentypen in `AufgabentypRegistry`:
  - `vergleich` (Bloom L4): `_renderVergleich` / `_checkVergleich` — Tabellen-Rendering (Objekte × Dimensionen), String-Match pro Zelle via `_fuzzyMatch` + Fallback auf `_meta.akzeptierte_varianten[<objekt>__<dimension>]`.
  - `begruendung` (Bloom L5): `_renderBegruendung` / `_checkBegruendung` — 3 Textarea-Felder (Claim, Evidence, Reasoning). Pruefung: Claim fuzzy-Match gegen `_meta.akzeptierte_claims` (ANY), Evidence ANY-Match gegen `loesung.evidence`, Reasoning Schwelle-Match gegen `_meta.reasoning_schluesselbegriffe` (≥ 1 Treffer).
  - KEINE Aenderungen an Bestands-Check-Funktionen (RA3 Code-Kopplung: `_checkMultipleChoice`, `_checkZuordnung`, `_checkLueckentext`, `_checkReihenfolge`, `_checkFreitextCode` unberuehrt).
- **A (CSS)** `assets/css/themes/theme-gpg.css` — BEM-Selektoren `.aufgabe--vergleich`, `.vergleich__raster`, `.vergleich__zelle`, `.aufgabe--begruendung`, `.cer`, `.cer--claim|evidence|reasoning`, `.cer__label`, `.cer__textarea`. Minimalstyle: Tabelle mit Rand, CER-Felder als farbcodierte Randstreifen.
- **B Validator** `tools/validate_bloom_distribution.py` (neu) — Prueft A19-Policy (max 40 % L1-L2, min 30 % L3-L4, min 20 % L5-L6) und Pflichtfelder `_meta.bloom_level` (Int 1-6) + `_meta.bloom_begruendung` (String). Dual-Modus: Mappen-Verzeichnis (`progressionsplan.json` + `aufgaben/*.json`) ODER monolithische `data.json` (mit optionalem `--mappe`-Filter fuer Gameplay-Repo). Exit 0 PASS / 1 FAIL.
- **C Mappe-4-Patch** `escape-games/gpg-erster-weltkrieg-ursachen/data.json`:
  - `_meta.bloom_level` + `_meta.bloom_begruendung` fuer alle 24 Bestandsaufgaben (Mappen 1-4) gemaess verbindlicher Zuweisungstabelle in `docs/analyse/BLOOM_KLASSIFIKATION_MAPPEN_1_4.md`.
  - 2 neue Exemplare in Mappe 4:
    - `aufgabe-4-8` (typ=`vergleich`, L4): Geplanter vs. tatsaechlicher Kriegsverlauf entlang Dauer / Hauptgegner / Ergebnis. Bezug mat-4-1, mat-4-2, mat-4-4, mat-4-5.
    - `aufgabe-4-9` (typ=`begruendung`, L5): "Beurteile, ob das Scheitern des Schlieffen-Plans unvermeidlich war." CER-Schema mit 3 akzeptierten Claim-Positionen, 5 Evidence-Belegen, 7 Reasoning-Schluesselbegriffen. Bezug mat-4-1, mat-4-3, mat-4-4, mat-4-5.
- **D Cache-Bust** alle HTML-Dateien in `escape-games/gpg-erster-weltkrieg-ursachen/` (index, lehrkraft, mappe-1..4): `?v=3.9` → `?v=4.0` fuer `base.css`, `theme-gpg.css`, `core.js`. (`escape-engine.js` stand in dieser Unterseite bereits auf v=4.0.)
- **E CHANGELOG** dieser Eintrag.

**Pre-Commit-Gate (RA1/RA3/RA4):**
- RA1 Scope: STR-02 + STR-11 im D15b-Strategien-Doc aktiv (OK).
- RA3 Code-Kopplung: Diff `assets/js/escape-engine.js` enthaelt KEINE Aenderungen an Bestands-Check-Funktionen (OK).
- RA4 ATOM-UNIT: alle 10 AU-1-Dateien (escape-engine.js, theme-gpg.css, validate_bloom_distribution.py, data.json, 6 HTML-Dateien, CHANGELOG.md) im selben Commit (OK).

**Validierungsergebnisse:**
- `python3 -c "import json; json.load(open(...data.json))"` → JSON OK.
- `node --check assets/js/escape-engine.js` → kein Syntax-Fehler.
- `python3 tools/validate_bloom_distribution.py escape-games/gpg-erster-weltkrieg-ursachen/data.json`:
  - Pflichtfeld-Check: PASS fuer alle 26 Aufgaben (24 Bestand + 2 neu).
  - Policy-Check Mappe 1: L1-L2 80 % / L3-L4 20 % / L5-L6 0 % — FAIL × 3 (erwartet, siehe BLOOM_KLASSIFIKATION_MAPPEN_1_4.md).
  - Policy-Check Mappe 2: L1-L2 80 % / L3-L4 0 % / L5-L6 20 % — FAIL × 2 (erwartet).
  - Policy-Check Mappe 3: L1-L2 57,1 % / L3-L4 28,6 % / L5-L6 14,3 % — FAIL × 3 (erwartet, knapp).
  - Policy-Check Mappe 4 (n=9 nach AU-1-Erweiterung): L1-L2 44,4 % / L3-L4 44,4 % / L5-L6 11,1 % — FAIL × 2 (erwartet: Restpolicy-Luecken werden in Wave 1+ durch weitere Neuproduktion geschlossen, siehe Nachpflege-Policy).
  - Gesamt-Verdikt: erwartet FAIL (Policy); unerwartete FAILs = 0. Commit-Gate bleibt gruen, weil Nachpflege-Policy (BLOOM_KLASSIFIKATION_MAPPEN_1_4.md) in AU-1 ausdruecklich KEINE inhaltliche Umgestaltung bestehender Aufgaben vorsieht.

**Browser-Smoke-Test:** offen fuer User (neue Typen in Mappe 4 rendern, Feedback-Anzeige nach Abgabe).

**Commit-Hash:** <wird nach Commit nachgetragen>

---

## 2026-04-05 — Session 12 (Fortsetzung 2): D15b Phase IV Wave 1 AU-1 PM-Strang Block 1+2 DONE

**Phase:** D15b-Optimierung Phase IV Wave 1 AU-1 (STR-02 Bloom-Tiefe-Pflicht + STR-11 Teil 1 Vergleich/Begruendung)
**Modus:** EXECUTE (PM-Artefakt-Produktion)
**ATOM-UNIT:** AU-1 (VERTRAG_ATOM_UNITS.md §3)

**User-Entscheidungen (Block-0, bestaetigt):**
1. Option C Hybrid — Bestands-Mappen 1-4 erhalten bloom_level nachtraeglich via Auto-Klassifikator; Wave-1-Neu-Produktion laeuft mit Pflichtfeld.
2. `vergleich` und `begruendung` als eigenstaendige Subagenten-Prompts (nicht Freitext-Varianten).
3. Mappe 4 als Test-Mappe fuer die 2 neuen Typ-Exemplare.

**Block 1 Artefakte (PM-Strang, produziert):**
1. `docs/architektur/vertraege/VERTRAG_PHASE_2-2b_AUFGABE.md` — Patch: Bloom-Tiefe-Pflichtfeld-Sektion, `_meta.bloom_level` (1-6) + `_meta.bloom_begruendung` Pflicht, bloom_verteilung_policy (40/30/20), 2 neue `typ`-Werte vergleich + begruendung, Subagenten-Zuordnungs-Tabelle erweitert um Bloom-Ziel-Zone und 2 neue Zeilen, Anti-Quota-Klausel, Q-Gate-Liste um A19/A22/A23/A24 erweitert, Loesungsformate-Tabelle um vergleich + begruendung erweitert, Output-Schema um `_meta`-Block erweitert.
2. `docs/architektur/vertraege/VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md` — Neue Sektion "Typauswahl-Heuristik (AU-1)": Bloom-Ziel-Zonen pro Typ, Entscheidungsfragen, Wann `vergleich`/`begruendung` waehlen, Anti-Quota-Klausel, Bloom-Verteilungs-Policy-Ziel als `_meta.bloom_verteilung_ziel` im Progressionsplan.
3. `docs/agents/SUB_AUFGABE_VERGLEICH.md` — Neu. Bloom-Ziel L4, Strukturraster, min 2 Objekte × min 2 Dimensionen, Rendering-Kontrakt (Tabellen-Rendering, `loesung` als verschachteltes Object), Q-Kriterien A22, Anti-Patterns (Pseudo-Vergleich, Ja/Nein-Dimensionen).
4. `docs/agents/SUB_AUFGABE_BEGRUENDUNG.md` — Neu. Bloom-Ziel L5, CER-Schema (Claim-Evidence-Reasoning), Rendering-Kontrakt (3 Textarea-Felder, `loesung` als Object mit claim/evidence/reasoning + `_meta.akzeptierte_claims` min 2 Positionen + `reasoning_schluesselbegriffe`), Q-Kriterien A23, Anti-Patterns (Claim ohne Evidence, Evidence ohne Reasoning, Suggestivfrage).
5. `docs/agents/SUB_AUFGABE_MC.md` / `SUB_AUFGABE_ZUORDNUNG.md` / `SUB_AUFGABE_LUECKENTEXT.md` / `SUB_AUFGABE_REIHENFOLGE.md` / `SUB_AUFGABE_FREITEXT.md` — Bloom-Selbstdeklaration-Block (PFLICHT seit AU-1) am Dokumentkopf: Bloom-Ziel-Zone pro Typ, Pflichtfeld-JSON-Beispiel, Begruendungs-Heuristik, Verweis auf VERTRAG_PHASE_2-2b.
6. `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md` — Neue Sektion 3.1a "AU-1 MUSS-Kriterien": A19 Bloom-Verteilung erfuellt Policy (Mappen-Ebene), A22 Vergleichs-Strukturraster vollstaendig, A23 CER-Struktur vollstaendig, A24 Bloom-Selbstdeklaration konsistent. Anti-Quota-Klausel.
7. `docs/uebergabe/UEBERGABE_PHASE_IV_WAVE_1_AU_1.md` — Neu. Pre-Flight-Checks, Scope (A Engine-Registry-Erweiterung +2 Typen, B Validator-Tool `tools/validate_bloom_distribution.py`, C Mappe-4-Exemplare, D Cache-Bust v=3.9→v=4.0, E CHANGELOG), Pre-Commit-Gate 3 Checks (RA1 Scope / RA3 Code-Kopplung / RA4 ATOM-UNIT), Validierungsschritte, Commit-Nachricht-Vorlage.

**Block 2 Artefakt (Auto-Klassifikator-Dispatch, Option C):**
8. `docs/analyse/BLOOM_KLASSIFIKATION_MAPPEN_1_4.md` — Neu. Klassifikator-Heuristik (Operator + Typ + Material, Typ-Dach-Begrenzung), Klassifikation aller 24 Bestandsaufgaben (Mappe 1: 5, Mappe 2: 5, Mappe 3: 7, Mappe 4: 7), Mappen-Verteilungs-Tabelle gegen A19-Policy, strukturelle Erkenntnis (Bestand ueberrepraesentiert L1-L2, unterrepraesentiert L5-L6 — legitimiert STR-11 strukturell), Claude-Code-Datenquelle (verbindliche Zuweisungstabelle fuer data.json-Patch, je Aufgabe 1 Bloom-Stufe + 1 Begruendungs-Satz).

**Policy-Befund Mappen 1-4:**
- Mappe 1: L1-L2 80 % / L3-L4 20 % / L5-L6 0 % — FAIL × 3.
- Mappe 2: L1-L2 80 % / L3-L4 0 % / L5-L6 20 % — FAIL × 2.
- Mappe 3: L1-L2 57 % / L3-L4 29 % / L5-L6 14 % — FAIL × 3 (knapp).
- Mappe 4: L1-L2 57 % / L3-L4 43 % / L5-L6 0 % — FAIL × 2.
Nachpflege-Policy: KEINE inhaltliche Umgestaltung bestehender Aufgaben in AU-1. Policy-Luecken werden durch Wave-1+-Neuproduktion geschlossen. Mappe 4 erhaelt in AU-1 zusaetzlich 1 vergleich- und 1 begruendung-Exemplar (Code-Strang).

**Artefakte-Liste fuer User-Commit-Block:**
```
docs/architektur/vertraege/VERTRAG_PHASE_2-2b_AUFGABE.md
docs/architektur/vertraege/VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md
docs/agents/SUB_AUFGABE_VERGLEICH.md
docs/agents/SUB_AUFGABE_BEGRUENDUNG.md
docs/agents/SUB_AUFGABE_MC.md
docs/agents/SUB_AUFGABE_ZUORDNUNG.md
docs/agents/SUB_AUFGABE_LUECKENTEXT.md
docs/agents/SUB_AUFGABE_REIHENFOLGE.md
docs/agents/SUB_AUFGABE_FREITEXT.md
docs/checklisten/GUETEKRITERIEN_AUFGABEN.md
docs/uebergabe/UEBERGABE_PHASE_IV_WAVE_1_AU_1.md
docs/analyse/BLOOM_KLASSIFIKATION_MAPPEN_1_4.md
docs/projekt/STATUS.md
docs/projekt/CHANGELOG.md
```

**Naechster Schritt:** User fuehrt Commit-Block aus (siehe STATUS.md Commit-Block-Sektion). Nach Push: Cold-Handoff an Claude-Code via `docs/uebergabe/UEBERGABE_PHASE_IV_WAVE_1_AU_1.md` fuer Engine-Registry-Erweiterung + Validator + Mappe-4-data.json-Patch + Cache-Bust. Danach AU-1 CLOSED, AU-2-Planung.

---

## 2026-04-05 — Session 12 (Fortsetzung): D15b Phase IV Wave 0 COMPLETE (Code-Strang integriert)

**Phase:** D15b-Optimierung Phase IV Wave 0 COMPLETE (AU-0 Bootstrap, PM + Code)
**Modus:** EXECUTE (Integration + Merge)

**Durchgefuehrt:**
1. **PM-Strang-Commit `f494f6a`** von Cowork erstellt und nach `origin/main` gepusht (6 Dok-Artefakte). Git-Lock-Workaround via `mv .git/index.lock .git/index.lock.stale.$RANDOM` nach zsh-HEREDOC-Fehlschlag angewandt.
2. **Claude-Code-Session (Cold-Handoff via `docs/uebergabe/UEBERGABE_PHASE_IV_WAVE_0.md`)** lieferte Commit `005ff9c` auf Feature-Branch `claude/keen-borg` (Worktree `.claude/worktrees/keen-borg`): `assets/js/escape-engine.js` +110 Zeilen (E1 AufgabentypRegistry, E2 `normalizeFeedback` Legacy-Fallback, D2 STR-13 ohne localStorage), `docs/assets/BILDLIZENZEN.md` (D1, 12 Wikimedia-Bilder in `assets/img/gpg-erster-weltkrieg-ursachen/`), `escape-games/gpg-erster-weltkrieg-ursachen/data.json` (0 wikimedia.org-Referenzen), alle `mappe-*.html` Cache-Busting `v=3.9`, `tools/pre-commit-atom-check.sh`, `tools/validate-feedback-schema.js`, `tools/validate-no-lehrkraft-meta.py` (K2-Technical).
3. **Claude-Code-Verifikation:** Alle 5 Aufgabentypen rendern via Registry sauber in Mappe 1, 3 und 4. AU-0 Code-Strang verifiziert.
4. **Merge-Integration:** Initial stale Git-Locks (zweite Instanz) blockierten `git merge --ff-only`. Recovery via `rm -f .git/index.lock .git/ORIG_HEAD.lock .git/HEAD.lock .git/refs/heads/main.lock` auf Mac. Anschliessend `git merge --ff-only claude/keen-borg` (Fast-Forward `f494f6a..005ff9c`, 12 Dateien, +413/-28), `git push origin main` erfolgreich. Worktree via `git worktree remove .claude/worktrees/keen-borg` + `git branch -d claude/keen-borg` + `git worktree prune` sauber entfernt.

**Wave-0-Bundle-Status:** **COMPLETE.** AU-0 vollstaendig auf `origin/main`. Alle 8 Phase-IV-Gates der Wave-0-Schicht erfuellt.

**Prozess-Nachtrag:** Git-Lock-Fragilitaet trat in dieser Session zweimal auf (einmal Cowork-seitig nach zsh-HEREDOC-Fehler, einmal Mac-seitig nach parallelen Git-Prozessen). Recovery-Muster `rm -f .git/*.lock` funktioniert, wenn keine laufenden Git-Prozesse das Lock halten. Claude-Code-Worktree-Pattern (`claude/<name>` auf `.claude/worktrees/`) ist Wave-0-kompatibel, erfordert aber bei Aufraeumen zwingend `git worktree remove` VOR `git branch -d`.

**Naechster Schritt:** Phase IV Wave 1 planen. Reihenfolge AU-1 → AU-2 → AU-3. Vor erstem Dispatch: User-Freigabe der Wave-1-Reihenfolge + Auswahl der ersten ATOM-UNIT.

---

## 2026-04-05 — Session 12: D15b Phase IV Wave 0 PM-Strang COMPLETE (AU-0 Bootstrap Doku-Seite)

**Phase:** D15b-Optimierung Phase IV Wave 0 PM-Strang COMPLETE → Code-Strang ueber Claude-Code-Uebergabe offen
**Modus:** EXECUTE (PM-Strang-Produktion)
**Kontext-Abgrenzung:** "Phase IV" bezeichnet hier die Umsetzungs-Phase der D15b-Optimierungs-Serie (Nachfolger von Phase I/II/III/III.5 innerhalb D15b). NICHT zu verwechseln mit AUSFUEHRUNGSPLAN_INFRASTRUKTUR_REVISION Phase A/B/C (dort: Mappe-3/4-Produktions-Revision, Phase A+B KOMPLETT, Phase C als Mappe-4-Validierung, Session 8 abgeschlossen). Die Phase-IV-Wave-Struktur entstammt ausschliesslich der Phase-III.5-Serie; AUSFUEHRUNGSPLAN_INFRASTRUKTUR_REVISION bleibt als eigenstaendiges Dokument valide.

**Durchgefuehrt:**
1. **V4-Patch `docs/architektur/vertraege/VERTRAG_ATOM_UNITS.md`** erstellt. Definiert ATOM-UNIT-Konzept, AU-0 (Wave 0 Bootstrap mit allen 10 Paketen), AU-1 (STR-02+STR-11), AU-2 (STR-03+STR-04), AU-3 (STR-08+STR-11), AU-4 (STR-05 MODIFY-SCOPE). Pre-Commit-Gate mit 3 Checks (A RA1 Scope, B RA3 Code-Kopplung, C RA4 ATOM-UNIT). Technische Umsetzung via tools/pre-commit-atom-check.sh (Claude-Code-Strang). Hinweis: "V4-Patch" referenziert die Patch-ID aus VERIFIKATION_III_5d.md Sektion "Vertrags-Patches", NICHT eine Vertrags-Versionsnummer. Die existierenden Vertraege heissen weiterhin VERTRAG_PHASE_2-0..2-2c.
2. **V2-Patch `docs/architektur/vertraege/VERTRAG_FEEDBACK_SCHEMA.md`** erstellt. Neues Schema `{typ, text, ebene}` mit 4 typ-Enum und 4 ebene-Enum. Mehrfach-Feedback als Array. Legacy-Fallback-Funktion `normalizeFeedback()` dokumentiert. Validator `tools/validate-feedback-schema.js` spezifiziert. `ebene` nicht fuer Schueler sichtbar.
3. **K1-Patch `docs/agents/ROLLEN_KATALOG.md`** erstellt. R1 SuS (keine Lehrkraft-Metadaten, keine Trigger, keine ebene), R2 Lehrkraft (Vollzugriff via lehrkraft.html separat), R3 Autor (Produktions-Workflow-Rolle). Rechte-Matrix. Kein Runtime-Rollenwechsel, Trennung via Build-Time-Separation.
4. **K2-Patch `docs/agents/POLICY_TRIGGER_SICHTBARKEIT.md`** erstellt. Harte Regel: Trigger-Warnungen ausschliesslich in Lehrkraft-Route, niemals im Schueler-DOM/JSON. CSS-Ausblendung ist KEINE Implementierung. Assembly-Split mit Loeschschritt des `lehrkraft_meta`-Feldes in Schueler-Fassung. Validator-Snippet und Grep-Regel dokumentiert.
5. **V1-Patch an `docs/agents/ORCHESTRATOR.md`** appliziert. Session-Split-Enforcement im Session-Split-Template (Phase 2.1c → 2.2a) von weicher Regel zu hartem STOPP-Gate verschaerft. Pre-Commit-Check-Hinweis ergaenzt. Datei bleibt in Cowork-docs/-Domaene.
6. **DOK1 `docs/analyse/TRANSKRIPT_PERSONENBEZUG_REVIEW.md`** erstellt. Grep-basierter Review (Pattern: paul|cebulla|paulad|@gmx|@gmail|schueler*|klarname|echtname) aller Transkripte in `docs/analyse/Evaluiation Testrun Mappe 4/`, `Browser review Mappe 3.md`, Audit-Reports und Phase-III.5-Reports. **Methoden-Einschraenkung:** Kein Volltext-Review, Grep-Stichprobe; kann Initialen, Spitznamen oder Klassen-Codes verfehlen. Ergebnis auf dieser Basis: Kein R1 (Schueler)-Personenbezug vorhanden, nur R3 (Autor) mit Einwilligung. Keine Pseudonymisierungs-Pflicht im Ist-Zustand. Vorwaerts-Regel: kein Commit zukuenftiger Schueler-Session-Daten. F-RA7-05 damit auf dieser Basis ERLEDIGT.
7. **`docs/uebergabe/UEBERGABE_PHASE_IV_WAVE_0.md`** erstellt. Handoff fuer Claude-Code mit E1 (Renderer-Registry), E2 (Legacy-Fallback), D1 (Wikimedia lokalisieren + BILDLIZENZEN), D2 (STR-13 ohne localStorage), K2-Technical (Validator + Grep-Guard), Tools (validate-feedback-schema.js, pre-commit-atom-check.sh), Cache-Busting-Pflicht. Commit-Nachricht und Verifikations-Checkliste.

**Wave-0-Bundle-Status:**
- AU-0 Dokumentations-Seite: V1-Patch/V2-Patch/V4-Patch/K1-Patch/K2-Policy/DOK1 = **6/6 committed-ready**
- AU-0 Code-Seite: E1/E2/D1/D2/K2-Technical + Tools = **ueber Uebergabe-Prompt an Claude-Code offen**
- Phase-IV Gates G-1 bis G-8: adressiert, finaler Merge-Status erst NACH Code-Strang-Merge. **Wave 0 insgesamt ist NICHT COMPLETE**, nur der PM-Strang.

**Prozess-Nachtrag (Selbstreview):** Nach Compaction wurden COWORK_PROJECT_ANLEITUNG.md PFLICHT-Lektueren (UPGRADE_PLAN_v4, GRUNDSATZENTSCHEIDUNG_REBUILD_VS_ITERATE) zunaechst uebersprungen und retrospektiv nachgeholt. Grundsatzentscheidung C+ (Hybrid mit Architektur-Bewusstsein) bestaetigt die Wave-0-Arbeit inhaltlich. Modus EXECUTE wird nachtraeglich deklariert. Skill projekt-website-v4-2 wurde zu Beginn geladen, aber die ATOM-UNIT-Nomenklatur stammt aus der Phase-III.5d-Serie (VERIFIKATION_III_5d.md), nicht aus dem Skill.

**Naechster Schritt:** User fuehrt Git-Commit-Block aus (siehe Session-Output). Danach Cold-Session-Handoff an Claude-Code via UEBERGABE_PHASE_IV_WAVE_0.md fuer Code-Strang. Wave 0 gilt erst als COMPLETE, wenn der Code-Strang gemerged ist.

---

## 2026-04-05 — Session 11: Phase III.5e COMPLETE (Zweitmeinung + STR-Beschluss + Uebergabe)

**Phase:** D15b-Optimierung Phase III.5e COMPLETE → **Phase III.5 INSGESAMT COMPLETE**

**Durchgefuehrt (Nachtrag zu 5e):**
1. Zweitmeinungs-Subagent (general-purpose direct-write) gespawnt: lies D15B_PHASE_III_5_SYNTHESE.md + RA7_NACHKALIBRIERUNG.md + BERICHT_RA3/RA4/RA5 + Codebase-Stichproben (escape-engine.js, core.js, Beispiel-HTML).
2. **`ZWEITMEINUNG_VERGLEICH.md`** (203 Zeilen, 8 Sektionen) erstellt. Verdikt: **BESTAETIGT MIT ERGAENZUNGEN**. F-RA4-02 P0 code-seitig verifiziert. RA3/RA4/RA5-Befunde valide. RA7-Nachkalibrierung haelt Code-Crosscheck stand. Phase-IV BEDINGTES GO bestaetigt. STR-Tabelle unchanged.
3. **`STR_MUTATIONS_BESCHLUSS.md`** erstellt mit finalen Verdikten aller 20 aktiven STR: 1× MODIFY-SCOPE (STR-05), 1× DESIGN-CHANGE (STR-13), 7× ACCEPT+BLOCKING-PATCH, 1× ACCEPT+SOFT-Gate, 11× ACCEPT ohne Patch. Wave-Zuordnung Wave 0-4 dokumentiert.
4. **`UEBERGABE_PHASE_III_5_5e.md`** Cold-Session-Wiederaufnahme erstellt.
5. State-File, STATUS, CHANGELOG final aktualisiert.

**Portfolio-Endstand Phase III.5:**
- 7 RAs, 63 Findings (1 P0, 23 P1, 25 P2, 14 P3)
- 0 Dissense, Zweitmeinung bestaetigt Synthese
- 20 aktive STR, 0 Streichungen in 5e
- 8 Phase-IV-Gates definiert, alle BLOCKING
- Empfehlung: BEDINGTES GO nach 8 Gates

**Naechster Schritt:** User-Freigabe Phase IV Wave 0 (atomarer Commit-Verbund aller Wave-0-Patches).

---

## 2026-04-05 — Session 11: Phase III.5e IN_PROGRESS (RA7-Nachkalibrierung + Synthese)

**Phase:** D15b-Optimierung Phase III.5e (Synthese + Zweitmeinung)

**Ziel:** RA7-Befunde aufgrund User-Faktenkorrektur neu kalibrieren, Synthese aller 7 RAs, Phase-IV-Go/No-Go-Empfehlung.

**Durchgefuehrt:**

1. **User-Faktenkorrektur eingearbeitet:** "Es werden ja keinerlei daten erhoben, sondern nur eingaben im lokalen browser cache der schul-ipads gespeichert. zur nutzung der schul-iPads gibt es entsprechende einwilligung aller nutzenden."
2. **`RA7_NACHKALIBRIERUNG.md` erstellt** (autoritative Fassung der RA7-Findings nach User-Kontext):
   - F-RA7-01 Art. 6 Rechtsgrundlage: P0 → P2 (BayEUG + iPad-Vereinbarung greifen)
   - F-RA7-02 Art. 8 Einwilligung: P0 → P3 (iPad-Vereinbarung deckt ab)
   - F-RA7-03 STR-13 Reflexions-Zone: P0 → P1 (Risiko bleibt, aber begrenzt auf Local-Cache-Expositions-Flaeche)
   - F-RA7-04 Art. 13 Informations-Pflichten: P0 → P2 (Datenschutzerklaerung als Soft-Gate)
   - F-RA7-05 STR-12 Sichtbarkeit: P0 → P1 (paedagogisches Problem, nicht primaer Datenschutz, BLOCKING-Patch bleibt)
   - F-RA7-06 Drittanbieter: P0 → P1+P1 (BLEIBT BLOCKING — einziges echtes Datenschutz-Risiko, da Schrems-II Transfer bei Seitenaufruf)
   - Gate-Urteil RA7: **ROT → GELB mit Auflagen**
   - Reduziert auf 3 BLOCKING-Punkte: Wikimedia lokal, STR-13 ohne Persistenz, STR-12 Sichtbarkeit (ueberlappt mit 5d)
3. **`D15B_PHASE_III_5_SYNTHESE.md` erstellt:**
   - Portfolio-Ueberblick alle 7 RAs + Severitaets-Bilanz
   - Konvergenz-Top-8 (5d Top-6 + 2 neue Datenschutz-Cluster STR-13 + Drittanbieter)
   - Konsolidierte BLOCKING-Liste: V1/V2/V4 Vertrag, K1/K2 Katalog, E1/E2 Engine, D1/D2 Datenschutz
   - 8 Phase-IV-Gates aktualisiert (G-7 neu als schlankes Datenschutz-Checklisten-Gate statt mehrwoechiges Remediations-Programm)
   - STR-Verdikt-Vorschau alle 20 STR (keine Streichungen, 1 MODIFY-SCOPE STR-05, 1 Design-Change STR-13)
   - **Phase-IV-Empfehlung: BEDINGTES GO** nach 8 Gates + DOK1 Transkript-Pruefung
4. **Portfoliowide P0-Count:** 11 (5d+5c-bis) → **1** (nur F-RA4-02 Aufgabentyp-Renderer, durch E1 BLOCKING adressiert).
5. State-File, STATUS, CHANGELOG aktualisiert. Commit folgt.

**Hinweis:** BERICHT_RA7_DATENSCHUTZ.md bleibt unveraendert als historisches Dokument. RA7_NACHKALIBRIERUNG.md ist autoritative Fassung fuer alle weiteren Phase-Entscheidungen.

---

## 2026-04-05 — Session 11: Phase III.5c-bis COMPLETE (RA7 Datenschutz-Audit, Gate ROT)

**Phase:** D15b-Optimierung Phase III.5c-bis (nachtraeglich eingeschobene Sub-Phase zur Abdeckung des 5d Blindspots B1 Datenschutz CRITICAL)

**Ziel:** Vollstaendiger DSGVO-Audit (inkl. Art. 8 Minderjaehrigen-Schutz + Schulrecht) des bestehenden Projekts und der 20 geplanten STR. Schliessen der Blindspot-Luecke, die von RA1-RA6 nicht abgedeckt wurde. Gate-Entscheidung fuer Live-Nutzung und Phase IV.

**Durchgefuehrt:**

1. State-File auf `III.5c-bis IN_PROGRESS` gesetzt.
2. Repo-Inventur: localStorage-Wrapper in core.js (Z. 20-86), Progress/State-Logik in escape-engine.js (Z. 40-500 relevante Bereiche), Production-HTML-Audit per Grep (keine externen Tracker/Fonts/CDNs in escape-games/gpg-erster-weltkrieg-ursachen/ gefunden), Evaluations-Transkripte in docs/analyse/ identifiziert.
3. `CHARTA_RA7_DATENSCHUTZ.md` erstellt (17 Pflicht-Sektionen, Severitaets-Adaption fuer Datenschutz, Rollen-Isolation, Output-Spezifikation).
4. `EVIDENZ_BUNDLE_RA7.md` erstellt (kuratierte Datei-Liste mit Zeilen-Hinweisen, vorab dokumentierte localStorage-Struktur, STR-Impact-Mapping fuer STR-03/08/11/12/13/24, Hosting-Kontext GitHub Pages / Schrems-II).
5. RA7-Subagent gespawnt (general-purpose, direct-write-Strategie).
6. **`BERICHT_RA7_DATENSCHUTZ.md` (876 Zeilen, 17 Pflicht-Sektionen + 2 Anhaenge, 13 Findings):**

   **Gate-Urteil: ROT** — blockiert Live-Nutzung UND Phase IV bis Remediation der 6 P0.

   **Findings-Verteilung:** 6× P0 CRITICAL, 5× P1 HIGH, 2× P2 MEDIUM.

   **P0 CRITICAL (verkuerzt):**
   - F-RA7-01: Keine gueltige DSGVO Art. 6 Rechtsgrundlage dokumentiert.
   - F-RA7-02: Art. 8 Einwilligung der Erziehungsberechtigten fuer Nutzer unter 16 Jahren fehlt vollstaendig.
   - F-RA7-03: STR-13 Reflexions-Zone freier Text-Input im localStorage unverschluesselt, potentiell personenbezogen.
   - F-RA7-04: Art. 13 Informations-Pflichten vollstaendig unerfuellt (keine Datenschutzerklaerung, kein Verantwortlicher, kein Zweck, keine Speicherdauer).
   - F-RA7-05: STR-12 Trigger-Flag Sichtbarkeits-Kontrolle technisch nicht abgesichert (User-Zusage "nur Lehrkraft" nicht erzwungen).
   - F-RA7-06: Drittanbieter-Disclosure (Wikimedia IP + GitHub Pages Schrems-II-Risiko) ohne AVV.

   **P1 HIGH:** Keine Auskunftsfunktion Art. 15, `antwort_state` potentiell personenbezogener Freitext, keine Verschluesselung Art. 32 TOM, Evaluations-Transkripte in docs/analyse/ im Repo exponiert, GitHub AVV-Status unbekannt.

   **P2 MEDIUM:** Kein Datenpannen-Protokoll Art. 33/34, Kontakt-Informationen fuer Betroffenenrechte fehlen.

   **Remediations-Timeline (Empfehlung):**
   - Woche 1-2: Schule entscheidet Verantwortlichkeits-Modell + GitHub-Akzeptanz. Datenschutzerklaerung schreiben. Transkripte pruefen/pseudonymisieren.
   - Woche 2-3: Wikimedia-Bilder lokal herunterladen. Auskunftsfunktion implementieren. STR-13 Verschluesselungs-Spezifikation.
   - Woche 4: RA7-Follow-up-Audit (Zielurteil GELB).

   **7 offene Fragen an User/Schule** (Sektion 17): Verantwortlichkeits-Modell (Schultraeger vs. Lehrkraft vs. Paul privat?), GitHub-Pages-Akzeptanz durch Schultraeger, STR-13-Design (Text-Input Pflicht oder optional?), Transkript-Handling (Loeschen oder pseudonymisieren?), Datenpannen-Kontakt-Benennung, DPO-Status, bestehende Schule-Datenschutzerklaerung.

7. Pre-Check PASS: 876 Zeilen, 13 Findings, 17 Pflicht-Sektionen, Risiko-Matrix vorhanden, Gate-Urteil vorhanden.
8. `UEBERGABE_PHASE_III_5_5c_bis.md` angelegt.
9. State-File, STATUS, CHANGELOG aktualisiert.

**Erkenntnisse:**

- **RA7-Gate ROT ueberschreibt 5d-Gate BEDINGT.** Phase IV NEU zu bewerten.
- **Portfoliowide P0-Count steigt von 5 (post-5d) auf 11** (5d: RA2:1 + RA4:2 + RA5:1 + RA6:1 nach RA2 Downgrade, korrigiert: 5; RA7: 6).
- **Der 5d-Blindspot-Befund war validiert.** Systematischer Datenschutz-Audit findet 6 kritische Luecken, die von keiner anderen RA-Rolle abgedeckt wurden.
- **STR-13 Reflexions-Zone muss Datenschutz-Klausel bekommen** — unveraenderte Umsetzung waere P0-Verstoss.
- **STR-12 Trigger-Flag Sichtbarkeit** muss von User-Zusage zu technisch erzwungener Kontrolle werden — Kopplung zu RA6 F-RA6-05 und RA3 F-RA3-06 besteht.
- **Evaluations-Transkripte in docs/analyse/** muessen VOR 5e gesichtet werden — wenn Personenbezug, dann git-Rewrite erforderlich.

**Artefakte:**

- `docs/projekt/phase-iii-5/CHARTA_RA7_DATENSCHUTZ.md` (NEU)
- `docs/projekt/phase-iii-5/EVIDENZ_BUNDLE_RA7.md` (NEU)
- `docs/projekt/phase-iii-5/BERICHT_RA7_DATENSCHUTZ.md` (NEU, 876 Z, 13 F, Gate ROT)
- `docs/uebergabe/UEBERGABE_PHASE_III_5_5c_bis.md` (NEU)
- `docs/projekt/D15B_PHASE_III_5_AUDIT_STATE.md` (aktualisiert: 5c-bis COMPLETE + RA7-Sektion)
- `docs/projekt/STATUS.md` (aktualisiert)
- `docs/projekt/CHANGELOG.md` (dieser Eintrag)

**Naechster Schritt:** User-Freigabe fuer 5e (Synthese + Zweitmeinung). 5e muss RA7-Befunde in neue konsolidierte Konvergenz-Matrix und Severitaets-Bilanz integrieren, `comprehensive-review:full-review` als Tool-Zweitmeinung auf 6 Primaer-RAs ausfuehren, STR_MUTATIONS_BESCHLUSS.md mit finalen Verdikten aller 20 STR erstellen, Phase-IV-Go/No-Go-Empfehlung NEU formulieren.

---

## 2026-04-05 — Session 11: Phase III.5d COMPLETE (Verifikations-Gate)

**Phase:** D15b-Optimierung Phase III.5d (Pre-Implementation-Risiko-Audit, Verifikations-Gate)

**Ziel:** Systematische Verifikation der 5b/5c-Befunde. Kalibrierungs-Korrektur, Blindspot-Entscheidungen, Konvergenz-Verdikte, ATOM-UNIT-Framework, Patch-Listen priorisieren. Gate-Urteil fuer 5e.

**Durchgefuehrt:**

1. State-File auf `III.5d IN_PROGRESS` gesetzt.
2. `VERIFIKATION_III_5d.md` erstellt (10 Sektionen).
3. **RA2-Kalibrierungs-Korrektur:** F-RA2-03 (gestrichene STR Cleanup) P0 → P3 Downgrade begruendet. Portfolio-P0-Count 6→5.
4. **7 Blindspot-Entscheidungen getroffen:**
   - B1 Datenschutz CRITICAL → **NEUE Sub-Phase III.5c-bis (RA7 Datenschutz-Audit)** vor 5e + Phase IV Pflicht-Gate.
   - B2 Performance → Phase IV Wave 0 Baseline-Benchmark.
   - B3 Sicherheit → Phase IV Wave 0 Mini-Audit (1 Session) auf escape-engine.js Eingabe-Pfade + Template-Interpolation.
   - B4 Operative Robustheit → ATOM-UNIT Akzeptanzkriterium (graceful-failure-test).
   - B5 Rollback → Phase IV PFLICHT-Protokoll (Feature-Flag + git tag + Deployment-Checkliste) insbesondere STR-03.
   - B6 Developer-Experience → Pre-Phase-IV Subagent-Dry-Run auf 1 Dummy-Mappe.
   - B7 Doku-Drift → Folgeprojekt post Phase IV.
5. **Konvergenz-Top-6 konsolidierte Verdikte:**
   - STR-04 3-stufige Tipps: ACCEPT + PATCH (Engine-Renderer + ATOM-UNIT-Gate)
   - STR-05 Multiperspektivitaet: MODIFY-SCOPE (Entscheidungslogik nicht in E2 sickern)
   - STR-12 Trigger: ACCEPT + PATCH + SICHERHEITS-REVIEW (Kodifizierung + Injection-Guard)
   - STR-03 Feedback-Schema: ACCEPT + BLOCKING PATCH (Migration + Legacy-Fallback)
   - STR-08 Quellenkritik: ACCEPT + PATCH (Engine-Renderer + Scope-Guard)
   - STR-11 Aufgabentypologie: ACCEPT + BLOCKING PATCH (Engine-Renderer-Erweiterung)
   - Verteilung: 5× ACCEPT-mit-PATCH, 1× MODIFY-SCOPE, 0× REJECT, 0× DEFER.
6. **ATOM-UNIT-Framework finalisiert:**
   - 4 ATOM-UNITs: AU-1 (STR-02+11 Wave 1), AU-2 (STR-03+04 Wave 3), AU-3 (STR-08+11 Wave 3), AU-4 (STR-05 Wave 2).
   - Pre-Commit-Gate PFLICHT: RA1-Scope-Check + RA3-Code-Check + RA4-Vertrags-Check.
   - Commit-Message-Sektion `## ATOM-UNIT Pre-Commit-Gate` verpflichtend.
   - Gemeinsames Deployment, kein Teil-Rollback.
7. **Vertrags-Patch-Liste priorisiert (4):**
   - V1 BLOCKING: ORCHESTRATOR.md IL-4 Session-Split-Checkpoint in Template.
   - V2 P0: VERTRAG_PHASE_2-2b_AUFGABE.md Feedback-Schema Migration (string → {typ, text, ebene}) + Legacy-Fallback.
   - V3 P0: VERTRAG_PHASE_2-2c_CROSS.md Bloom-Distribution-Validation A1 Q-Gate.
   - V4 P1: ATOM-UNIT-Framework in Orchestrator + Vertraege.
8. **Katalog-Patch-Liste priorisiert (3):**
   - K1 P0: G/HE/M-Katalog STR-01 Tiefenstruktur-Meta Rollen-Klaerung + Material-QA-Luecke.
   - K2 P1: Trigger-Sensibilitaet STR-12 als formale Kategorie kodifizieren.
   - K3 P1: Post-STR-01 Rollen-Neubewertung alle Kataloge.
9. **Engine-Patch-Liste priorisiert (6):**
   - E1 BLOCKING: escape-engine.js Z. 1868-1945 Aufgabentyp-Renderer STR-08/11.
   - E2 BLOCKING: escape-engine.js Z. 1919-1924 Legacy-Feedback-Fallback.
   - E3 P0: Cache-Busting ?v=3.9→?v=4.0 in ALLEN HTML synchron.
   - E4 P1: STR-04 3-stufige Tipps Renderer-Erweiterung.
   - E5 P1: STR-20 WCAG 2-Phasen-Deployment (CSS separat von JS).
   - E6 P1: STR-12 Trigger-Input-Sanitizer (Injection-Guard).
10. **Phase-IV Gate-Matrix (8 Gates) definiert:** G-1 RA7 Datenschutz, G-2 Performance-Baseline, G-3 Sicherheits-Mini-Audit, G-4 Subagent-Dry-Run, G-5 Vertrags-Patches, G-6 Engine-Patches, G-7 Katalog-Patches, G-8 ATOM-UNIT in Orchestrator. Phase-IV-Startbedingung: G-1 + G-5 + G-7 + G-8.
11. **Gate-Urteil 5d: BEDINGT freigegeben fuer 5e.** Bedingung: III.5c-bis (RA7 Datenschutz-Audit) VOR 5e.
12. `UEBERGABE_PHASE_III_5_5d.md` angelegt.
13. State-File aktualisiert (5d COMPLETE, neue Zeile 5c-bis RA7 hinzugefuegt).
14. STATUS.md aktualisiert.

**Erkenntnisse:**

- **Datenschutz-Blindspot war kritischster 5d-Befund.** Sechs RAs decken Scope/Dependencies/Code/Vertraege/Kataloge ab, aber DSGVO/Minderjaehrigen-Schutz wurde nicht geprueft. Kann nicht in Phase IV nachgezogen werden — neue Sub-Phase III.5c-bis erforderlich.
- **Konvergenz-Top-6 alle bleiben im Portfolio.** Keine Streichungen in 5d, nur Patch-Bedingungen. 20 aktive STR stabil.
- **ATOM-UNIT-Framework formalisiert.** Jede ATOM-UNIT braucht ab jetzt explizite Commit-Message-Sektion mit 3 Check-Ergebnissen.
- **Patch-Liste umfasst 13 Items** (4 Vertrag + 3 Katalog + 6 Engine) fuer Phase IV.
- **3 echte BLOCKING-Items:** V1 ORCHESTRATOR Session-Split, E1 Aufgabentyp-Renderer, E2 Legacy-Feedback-Fallback. Ohne diese kein Wave-Start.

**Artefakte:**

- `docs/projekt/phase-iii-5/VERIFIKATION_III_5d.md` (NEU)
- `docs/uebergabe/UEBERGABE_PHASE_III_5_5d.md` (NEU)
- `docs/projekt/D15B_PHASE_III_5_AUDIT_STATE.md` (aktualisiert: 5d COMPLETE, 5c-bis hinzugefuegt)
- `docs/projekt/STATUS.md` (aktualisiert)
- `docs/projekt/CHANGELOG.md` (dieser Eintrag)

**Naechster Schritt:** User-Freigabe fuer III.5c-bis (RA7 Datenschutz-Audit) einholen. Alternativ: User kann B1-Entscheidung ueberschreiben (RA7 vertagen, Risiko-Akzeptanz dokumentieren).

---

## 2026-04-05 — Session 11: Phase III.5c COMPLETE (Tiefen-Audits RA3 + RA4 parallel, RA5 Meta seriell)

**Phase:** D15b-Optimierung Phase III.5c (Pre-Implementation-Risiko-Audit, Tiefen-Audits)

**Ziel:** 2 parallele Tiefen-Audits (RA3 Code-Kopplung + RA4 Pipeline) spawnen, danach seriell RA5 Meta-Auditor zur Synthese (Konvergenz-Matrix, Dissens-Register, Blindspot-Map, Severitaets-Kalibrierung, Scope-Disziplin, adaptierte Rubrik). User-Freigabe fuer 5d einholen.

**Durchgefuehrt:**

1. **State-File auf `III.5c IN_PROGRESS` gesetzt** vor Spawning.

2. **RA3 + RA4 Parallel-Spawning in EINER Nachricht:** 2 `Agent` Tool Calls (subagent_type `general-purpose`). Jeder las Charta + Evidenz-Bundle und schrieb Bericht direkt. Dauer ~180-350s parallel.

3. **RA3 Code-Kopplung → BERICHT_RA3_CODE_KOPPLUNG.md** (636 Zeilen, 12 Pflicht-Sektionen, 11 Findings):
   - 2 CRITICAL: F-RA3-01 (escape-engine.js Z. 1919-1924, Legacy-Feedback-Fallback erforderlich sonst brechen Mappen 1-4 bei STR-03); F-RA3-05 BLOCKER (escape-engine.js Z. 1868-1945, STR-08/11 neue Aufgabentypen ohne Renderer).
   - CRITICAL (Projekt-Regel): F-RA3-04 Cache-Busting v=3.9→v=4.0 in ALLEN HTML synchron.
   - HOCH: F-RA3-02 STR-04 Renderer-Erweiterung, F-RA3-07 STR-20 WCAG Rendering-Impact.
   - Wave-3-Atomisierungs-Empfehlung: STR-03+STR-04 atomar (separate PRs, gemeinsam deployen), STR-20 nicht rein atomar (CSS+JS gemischt, 2-Phasen-Deployment).

4. **RA4 Pipeline → BERICHT_RA4_PIPELINE.md** (818 Zeilen, 15 Pflicht-Sektionen, 12 Findings inkl. Vertrags-Kontrakt-Map + STR-zu-Vertrag-Matrix):
   - F-RA4-02 P0 BLOCKING (ORCHESTRATOR.md v4.0 IL-4): Session-Split-Enforcement-Gap, PFLICHT im Text aber nicht im Template/Checkpoint. Phase 2.1c→2.2a Token-Kontext-Leak-Risiko.
   - F-RA4-06 P0 CRITICAL: ATOM-UNIT Synchronisation STR-04/05/08/11 nicht vertraglich erzwungen.
   - F-RA4-01 P1 HIGH (VERTRAG_PHASE_2-2b_AUFGABE.md): STR-03 Feedback-Schema Breaking Change (string→Objekt), Engine-Kompat nicht dokumentiert.
   - F-RA4-03 P1 HIGH (VERTRAG_PHASE_2-2c_CROSS.md): Bloom-Validation fehlt in A1 Q-Gate.
   - Vertrags-Patch-Prioritaeten: (1) ORCHESTRATOR Session-Split-Checkpoint BLOCKING, (2) VERTRAG_PHASE_2-2b Feedback-Schema Migration HIGH, (3) VERTRAG_PHASE_2-2c Bloom-Distribution-Validation HIGH.
   - Gesamturteil: BEDINGT — 20 aktive STR halten I/O-Schema-Kompatibilitaet ein FALLS 3 kritische Vertrags-Patches angewandt.

5. **Pre-Check RA3+RA4 PASS.**

6. **RA5 Meta-Auditor seriell gespawnt** nach RA3+RA4 Abschluss. RA5 las Chartas + alle 5 RA-Berichte (RA1, RA2, RA3, RA4, RA6). Dauer ~250s.

7. **RA5 Meta → BERICHT_RA5_META.md** (384 Zeilen, 14 Pflicht-Sektionen):
   - **Konvergenz-Matrix STR×RA** (Pflicht-Anhang): 20 STR × 5 RAs, Severitaets-Markierung pro Zelle, Top-6-Rangliste.
   - **Top-6 Multi-RA-Hotspots:** STR-04 (3 RAs, 2×P0 CRITICAL ATOM-UNIT), STR-05 (4 RAs involviert), STR-12 (3 RAs + Sicherheitsluecke RA6-05), STR-03 (2 RAs CRITICAL+P1 Feedback-Schema), STR-08 (3 RAs Progressionsplan-Komplexitaet), STR-11 (3 RAs ATOM-UNIT Sync).
   - **Dissens-Register:** Kein direkter Verdikt-Dissens. Nur koordinative Spannungen RA1/RA4 ATOM-UNIT (komplementaer) und RA6/RA1 STR-05/14 (unterschiedliche Ebenen).
   - **Blindspot-Map (7 Blindspots):** Datenschutz/DSGVO **CRITICAL nicht abgedeckt**, Performance (keine Benchmarks), Sicherheit (partial, nur gestreift), Operative Robustheit, Rollback-Faehigkeit, Developer-Experience (keine Prompt-Test-Runs), Dokumentations-Drift (keine SLA).
   - **Severitaets-Kalibrierung:** RA1/RA3/RA4/RA6 gut kalibriert. RA2 leichte Inflation (F-RA2-03 Cleanup koennte P3 statt P0).
   - **Scope-Disziplin:** Alle 5 RAs STRIKT DISZIPLINIERT, RA4 minimal-legitime Erweiterung auf Orchestrator-Kontext.
   - **Adaptierte Rubrik** fuer III.5d Verifikations-Gate.
   - **6 Meta-Findings:** F-RA5-01 P0 PHASE-IV-BLOCKIEREND ATOM-UNIT Sync-Enforcement, F-RA5-02 P1 Feedback-Schema Breaking, F-RA5-03 P1 Trigger-Sicherheit, F-RA5-04 P2 Subagent-DX, F-RA5-05 P1 Katalog-Rollen nach STR-01, F-RA5-06 P1 Koordinations-Luecken.

8. **Pre-Check RA5 PASS.**

9. **`UEBERGABE_PHASE_III_5_5c.md` angelegt** mit vollstaendiger Befund-Synthese und Naechster-Schritt-Protokoll fuer 5d/5e.

10. **State-File aktualisiert:** 5c COMPLETE mit Pre-Check pro Bericht. 5d WAITING FOR USER APPROVAL.

**Erkenntnisse:**

- Parallel-Spawning 2er Subagenten war effizient, RA5 seriell danach war richtig (brauchte RA3+RA4-Berichte als Input).
- Subagent-Direct-Write auch bei umfangreichen Berichten stabil (RA4 818 Zeilen, RA5 384 Zeilen mit Tabellen).
- **Kernbefund der Meta-Analyse:** Das 5-RA-Portfolio ist strukturell robust (keine Dissense, gute Disziplin, konsistente Kalibrierung), aber deckt **Datenschutz, Performance, DX, Sicherheit, Rollback** NICHT oder nur oberflaechlich ab. Das ist ein strategisches Risiko fuer Phase IV.
- **Kernbefund der Konvergenz-Analyse:** STR-04 und STR-05 sind die hoechsten Risiken. STR-04 hat 2×P0 CRITICAL (ATOM-UNIT) + Rendering-Problem. STR-05 hat 4 RAs involviert (didaktische Logik sickert in Infrastruktur).
- **Kernbefund der Vertrags-Analyse (RA4):** Ein einziger P0-BLOCKING-Befund (ORCHESTRATOR Session-Split) koennte Phase IV blockieren, falls nicht gepatcht. RA5 bestaetigt als F-RA5-01.
- **Kernbefund der Code-Analyse (RA3):** Legacy-Feedback-Fallback (Mappen 1-4) und neuer Aufgabentyp-Renderer sind echte Regressions-Risiken, nicht nur Aufwaende.

**Artefakte (neu):**
- `docs/projekt/phase-iii-5/BERICHT_RA3_CODE_KOPPLUNG.md` (636 Z)
- `docs/projekt/phase-iii-5/BERICHT_RA4_PIPELINE.md` (818 Z)
- `docs/projekt/phase-iii-5/BERICHT_RA5_META.md` (384 Z)
- `docs/uebergabe/UEBERGABE_PHASE_III_5_5c.md`

**Artefakte (aktualisiert):**
- `docs/projekt/D15B_PHASE_III_5_AUDIT_STATE.md` (5c COMPLETE, Artefakt-Register)
- `docs/projekt/STATUS.md`
- `docs/projekt/CHANGELOG.md` (dieser Eintrag)

**Naechster Schritt:** User-Freigabe fuer III.5d (Verifikations-Gate): RA2-Kalibrierungs-Korrektur, 7 Blindspot-Entscheidungen, Konvergenz-Verdikte konsolidieren, ATOM-UNIT-Framework finalisieren, Patch-Listen fuer Vertraege/Kataloge/Engine priorisieren.

---

## 2026-04-05 — Session 11: Phase III.5b COMPLETE (3 parallele Struktur-Audits RA1 + RA2 + RA6)

**Phase:** D15b-Optimierung Phase III.5b (Pre-Implementation-Risiko-Audit, Struktur-Audits)

**Ziel:** 3 parallele Subagenten (RA1 Scope-Drift, RA2 Dependencies, RA6 Kontext-Kollision) spawnen, die ihre Audit-Berichte direkt in BERICHT-Dateien schreiben. Pre-Check auf Formal-Qualitaet (Zeilen, Sektionen, Findings). User-Freigabe fuer 5c einholen.

**Durchgefuehrt:**

1. **State-File auf `III.5b IN_PROGRESS` gesetzt** vor Spawning. Aktualisierungs-Pflicht gemaess Resilience-Protokoll eingehalten.

2. **Parallel-Spawning in EINER Nachricht:** 3 `Agent` Tool Calls (subagent_type `general-purpose`) gleichzeitig. Jeder Subagent bekam als Prompt: Verweis auf seine Charta + sein Evidenz-Bundle, Rollen-Isolations-Instruktion, Verbots-Liste (andere RA-Scopes), Output-Pfad, Rueckgabe-Format. Dauer 150-240s pro Agent, parallel.

3. **RA1 Scope-Drift → BERICHT_RA1_SCOPE_DRIFT.md** (492 Zeilen, 9 Pflicht-Sektionen):
   - 9 Findings: 2 HIGH (F-RA1-02 STR-12 Trigger-Engine-Sicherung Engine-Implementierungsrisiko; F-RA1-01 STR-05 Multiperspektivitaets-Entscheidungslogik sickert in E2), 6 MEDIUM (u.a. F-RA1-03 STR-08 Quellenkritik-Entscheidungslogik in Progressionsplan-Agent als MEDIUM→HIGH markiert), 1 LOW.
   - Verdikt-Empfehlungen pro STR: 12 accept (P0-P2), 6 modify-scope, 0 reject, 0 defer.
   - Auffaelligkeit: Severitaets-Kalibrierung im Graubereich (F-RA1-03 als MEDIUM→HIGH) — RA5 muss in III.5c pruefen.

4. **RA2 Dependencies → BERICHT_RA2_DEPENDENCIES.md** (533 Zeilen, 10 Pflicht-Sektionen inkl. Mermaid-Anhang):
   - 7 Findings (Minimum 6, knapp am unteren Rand). P0: Wave-1 ATOM-Unit-Ordering STR-02↔STR-11 (bidirektionale Kopplung flag), E1↔E3↔E5 Synchronisations-Timing. P1: Kritischer Pfad STR-01→STR-02→STR-11→STR-24→Phase IV. P2: Engine-Kopplung STR-03/04↔STR-20 Parallelisierungs-Semantik.
   - DAG-Rekonstruktion: azyklisch verifiziert, keine verwaisten Kanten nach Streichung STR-07/10/16/18. Tote Knoten STR-17, STR-19 als Validierungs-Rolle markiert (informelle Dependencies via gestrichelte Kanten).
   - Mermaid-Anhang: color-coded (P0/P1/P2 Layers), ATOM-UNITs markiert, Wave-Subgraphen, Problem-Kanten annotiert.

5. **RA6 Kontext-Kollision → BERICHT_RA6_KONTEXT.md** (452 Zeilen, alle Pflicht-Sektionen):
   - 8 Findings: 2 P0 (F-RA6-01 STR-01 Tiefenstruktur-Meta Katalog-Rollen-Unklarheit G vs HE; F-RA6-02 STR-01 M-Katalog Tiefenstruktur-Drift Material-QA-Luecke), 3 P1 (u.a. F-RA6-05 STR-12 Trigger-Sensibilitaet nicht in Katalogen kodifiziert → Ethik-Luecke), 3 P2.
   - Dokument-zu-STR-Kollisions-Matrix, Widerspruchs-Register, Referenz-Integritaets-Check, Obsolet-Kandidaten-Liste, Post-Umsetzungs-Plan.
   - STR-01 Tiefenstruktur-Meta bestaetigt als Mega-Hotspot (alle 6 Kataloge betroffen).

6. **Pre-Check-Ergebnisse dokumentiert** in State-File Artefakt-Register (Pflicht-Sektionen vollstaendig, Zeilen ueber Mindest, Findings ueber Mindest). Pre-Check ist ausschliesslich formal — inhaltliche Verifikation erfolgt im Verifikations-Gate (III.5d), RA5 prueft Severitaets-Kalibrierung und Konvergenz/Dissens in III.5c.

7. **Informelle Konvergenz-Hinweise gesammelt** (nicht finalisiert, nur fuer User-Checkpoint):
   - **STR-12 Trigger** — RA1 HIGH (Engine-Risiko) + RA6 P1 (Katalog-Kodifizierungs-Luecke). Konvergenz zweier unabhaengiger RAs.
   - **STR-01 Tiefenstruktur-Meta** — RA2 kritischer Pfad + RA6 2x P0. Multi-RA-Hotspot.
   - **STR-02/STR-11 Kopplung** — RA1 Scope-Verzahnung + RA2 Wave-1-Ordering. Konvergent.

8. **`UEBERGABE_PHASE_III_5_5b.md` angelegt** als Cold-Session-Wiederaufnahme. Inhalt: Was gemacht, Pre-Check-Tabelle, Befund-Rohdaten, informelle Konvergenz-Hinweise, Entscheidungen (Subagent-Output-Strategie hat funktioniert), bekannte Limits (Isolations-Disziplin nur stichprobenartig gepruft), Naechster-Schritt-Protokoll fuer 5c (RA3+RA4 parallel, dann RA5 seriell), Checkpoint-Protokoll.

9. **State-File aktualisiert:** 5b COMPLETE mit Pre-Check-Verifikation pro Bericht. Naechste Sub-Phase 5c WAITING FOR USER APPROVAL.

**Erkenntnisse:**

- Parallel-Spawning via `Agent` Tool in EINER Nachricht funktioniert stabil fuer 3 gleichzeitige Agenten. Keine Race Conditions, kein Truncation, kein Fallback auf sequenzielles Spawning noetig.
- Subagent-Direct-Write-Strategie (Subagent schreibt BERICHT-Datei selbst, gibt nur Zusammenfassung zurueck) hat sich bewaehrt — umgeht Rueckgabe-Limits und verankert Artefakte robust.
- Isolations-Disziplin via Prompt-Engineering scheint eingehalten (keine der 3 Berichte referenziert andere RA-Scopes oder Berichte). Stichprobenartig — systematische Isolations-Validierung erfolgt nicht in 5b, sondern implizit ueber RA5-Dissens-Register in III.5c.
- RA2 lieferte knapp Mindest-Findings (7 von 6). Moeglicherweise Zeichen, dass DAG-Scope enger ist als vermutet ODER dass RA2 unterausgelastet blieb. RA5 soll Schweregrad einordnen.
- Erste Multi-RA-Konvergenzen sind inhaltlich substanziell (STR-12, STR-01, STR-02/11) — kein pures Rauschen.

**Artefakte (neu):**
- `docs/projekt/phase-iii-5/BERICHT_RA1_SCOPE_DRIFT.md` (492 Z)
- `docs/projekt/phase-iii-5/BERICHT_RA2_DEPENDENCIES.md` (533 Z)
- `docs/projekt/phase-iii-5/BERICHT_RA6_KONTEXT.md` (452 Z)
- `docs/uebergabe/UEBERGABE_PHASE_III_5_5b.md`

**Artefakte (aktualisiert):**
- `docs/projekt/D15B_PHASE_III_5_AUDIT_STATE.md` (5b COMPLETE, Artefakt-Register, Verifikations-Spalte)
- `docs/projekt/STATUS.md` (Phase-Header, Naechster-Schritt, Abschluss-Eintrag)
- `docs/projekt/CHANGELOG.md` (dieser Eintrag)

**Naechster Schritt:** User-Freigabe fuer III.5c einholen. Dann: RA3 (Code-Kopplung) + RA4 (Pipeline) parallel spawnen, danach seriell RA5 (Meta-Auditor).

---

## 2026-04-05 — Session 10 (Forts. 11): Phase III.5a COMPLETE (Charten + Bundles + Verifikationstest)

**Phase:** D15b-Optimierung Phase III.5a (Pre-Implementation-Risiko-Audit, Sub-Phase Vorbereitung)

**Ziel:** Audit-Infrastruktur aufbauen: Verifikations-Test der Subagent-Spawning-Mechanik, Rollen-Charten + Evidenz-Bundles fuer 6 Risiko-Auditoren, Cold-Session-Uebergabe-Prompt. Danach User-Freigabe fuer 5b einholen.

**Durchgefuehrt:**

1. **Verzeichnis-Setup:** `docs/projekt/phase-iii-5/` angelegt als Container fuer alle 5a-5e Artefakte.

2. **Verifikations-Test Subagent-Spawning:** 1 Dummy-Agent via `Agent` Tool mit `subagent_type: Explore`, triviale Dateisystem-Task (D15B_*-Dateien auflisten). Alle 6 Verifikations-Dimensionen PASS (Spawn, Dateisystem-Zugriff, Task-Verstaendnis, Output-Format, Ergebnis-Rueckgabe, Terminierung). Manuelle Gegenprobe via Glob bestaetigt Korrektheit. Report: `phase-iii-5/VERIFIKATIONSTEST_TEAM_SPAWN.md`.
   - **Entscheidung:** Primaerer Spawning-Mechanismus fuer 5b/5c = parallele `Agent`-Tool-Aufrufe in einer Nachricht. `agent-teams:team-spawn` Skill bleibt als optionale Orchestrierungs-Ebene. Subagenten schreiben direkt in ihre BERICHT-Datei (keine Text-Rueckgabe, kein Truncation-Risiko).

3. **6 Rollen-Charten verfasst** (je Charta: Rolle, Primaerfrage, Scope-Grenzen, Input-Verweis, Methodik, Output-Schema mit Pflicht-Sektionen, Anti-Kontamination, Verbotenes, Freigabe-Kriterium, Mindest-Zeilenzahl):
   - CHARTA_RA1_SCOPE_DRIFT — Infrastruktur vs. Content/Didaktik/Lehrer-Scope (>=300 Zeilen, >=8 Findings).
   - CHARTA_RA2_DEPENDENCIES — DAG-Konsistenz, Zirkularitaet, tote/verwaiste Knoten, ATOM-Vollstaendigkeit, Wave-Sequenz (>=250 Zeilen, >=6 Findings, Pflicht-Mermaid-Anhang).
   - CHARTA_RA3_CODE_KOPPLUNG — escape-engine.js, data.json-Schema, CSS, HTML, Regressionsrisiko Mappen 1-4, Cache-Busting, Wave-3-Atomisierbarkeit (>=350 Zeilen, >=10 Findings).
   - CHARTA_RA4_PIPELINE — 6 Phasen-Vertraege, ORCHESTRATOR, Subagent-I/O-Kontrakte, Q-Gate-Konsistenz, Composability (>=300 Zeilen, >=8 Findings).
   - CHARTA_RA5_META — Meta-Auditor ueber RA1-RA4/RA6, Konvergenz-Matrix, Dissens-Register, Blindspot-Map, adaptierte Rubrik (>=350 Zeilen, >=6 Findings, Pflicht-Konvergenz-Matrix).
   - CHARTA_RA6_KONTEXT — Kollisionen mit Gueteregel-Katalogen, Vertraegen, Agenten, docs/analyse, Referenz-Integritaet, Obsolet-Liste (>=300 Zeilen, >=8 Findings).

4. **6 Evidenz-Bundles verfasst** (je Bundle: Pflicht-Lektuere, kontextuelle Lektuere mit Bedingung, explizite Verbotsliste zur Scope-Isolation, erwartete Output-Datei, kritische Ankerpunkte):
   - EVIDENZ_BUNDLE_RA1 — STR-Register + Implikations-Matrix als primaere Objekte.
   - EVIDENZ_BUNDLE_RA2 — STR-Register mit Fokus auf DAG + Waves + Arbeitsprotokoll, mermaid-validator-Tool-Hinweis.
   - EVIDENZ_BUNDLE_RA3 — escape-engine.js, core.js, data.json, mappe-*.html als Code-Baseline.
   - EVIDENZ_BUNDLE_RA4 — 6 Phasen-Vertraege, ORCHESTRATOR, VERTRAG_PHASE_3_ASSEMBLY, kontextuell SUB_AUFGABE_*/SUB_MATERIAL_*/AGENT_*.
   - EVIDENZ_BUNDLE_RA5 — 5 RA-Berichte + 5 Charten als primaere Objekte, sequentialthinking-Tool-Hinweis.
   - EVIDENZ_BUNDLE_RA6 — 6 Gueteregel-Kataloge + Checkliste_Interaktive_Materialien als primaere Objekte.

5. **UEBERGABE_PHASE_III_5_5a.md** als Cold-Session-Wiederaufnahme-Prompt: Status, was wurde gemacht, Entscheidungen, bekannte Risiken, Naechster-Schritt-Protokoll fuer 5b, Checkpoint-Protokoll fuer User-Freigabe.

6. **State-File `D15B_PHASE_III_5_AUDIT_STATE.md` aktualisiert:** Alle 5a-Artefakte auf COMPLETE, aktive Sub-Phase auf "5a COMPLETE, 5b WAITING FOR USER APPROVAL".

**Erkenntnisse:**
- Verifikations-Test bestaetigt: Subagent-Spawning-Mechanik funktioniert in diesem Cowork-Sandbox zuverlaessig auf der `Agent`-Tool-Basis-Ebene. High-Level `agent-teams:team-spawn` Skill ist nicht erforderlich — die Basis-Schicht traegt, und weniger Indirektion reduziert Fehlerquellen.
- Rollen-Isolation kommt zu 100% aus Prompt-Design + Evidenz-Bundle-Disziplin. Das ist wichtig: RA3 und RA4 brauchen technisch Lesezugriff auf viele Dateien, und nur die explizit kodifizierte Bundle-Pflicht-Lektuere haelt sie im Scope.
- Charten sind mit klarer Verbotsliste zu anderen RAs ausgestattet, um Cross-Contamination in Prompts zu verhindern.

**Artefakte (13 neue Dateien):**
- docs/projekt/phase-iii-5/VERIFIKATIONSTEST_TEAM_SPAWN.md
- docs/projekt/phase-iii-5/CHARTA_RA1_SCOPE_DRIFT.md
- docs/projekt/phase-iii-5/CHARTA_RA2_DEPENDENCIES.md
- docs/projekt/phase-iii-5/CHARTA_RA3_CODE_KOPPLUNG.md
- docs/projekt/phase-iii-5/CHARTA_RA4_PIPELINE.md
- docs/projekt/phase-iii-5/CHARTA_RA5_META.md
- docs/projekt/phase-iii-5/CHARTA_RA6_KONTEXT.md
- docs/projekt/phase-iii-5/EVIDENZ_BUNDLE_RA1.md
- docs/projekt/phase-iii-5/EVIDENZ_BUNDLE_RA2.md
- docs/projekt/phase-iii-5/EVIDENZ_BUNDLE_RA3.md
- docs/projekt/phase-iii-5/EVIDENZ_BUNDLE_RA4.md
- docs/projekt/phase-iii-5/EVIDENZ_BUNDLE_RA5.md
- docs/projekt/phase-iii-5/EVIDENZ_BUNDLE_RA6.md
- docs/uebergabe/UEBERGABE_PHASE_III_5_5a.md
- docs/projekt/D15B_PHASE_III_5_AUDIT_STATE.md (aktualisiert)
- docs/projekt/STATUS.md (aktualisiert)
- docs/projekt/CHANGELOG.md (dieser Eintrag)

**Naechster Schritt:** User-Freigabe fuer Sub-Phase 5b einholen. Bei Freigabe: 3 parallele Subagenten (RA1 + RA2 + RA6) in einer Nachricht spawnen.

---

## 2026-04-05 — Session 10 (Forts. 11): Phase III.5 Pre-Implementation-Risiko-Audit verankert

**Phase:** D15b-Optimierung Phase III.5 (Pre-Implementation-Risiko-Audit)

**Ausloeser:** User-Konzern: "Ich habe Angst, dass bei so umfangreichen Arbeiten an der Generierungsinfrastruktur Loesungsprobleme eingefuehrt werden, welche sich gerade in unserem Blindspot befinden." + Folgefrage nach weiterer Unterteilung mit harten Artefakt-Checkpoints und PM-Verankerung fuer Compaction-Resilienz + methodische Qualifizierung (Tools/Plugins/Skills).

**Ziel:** Gap-Audit aller geplanten Infrastruktur-Aenderungen gegen Blindspot-Risiken VOR Umsetzung. Produktionsfaehigkeit und Verlaesslichkeit darf nicht gefaehrdet werden. Audit-Prozess selbst gegen Compaction/Interrupt resilient.

**Durchgefuehrt:**

1. **Architektur entworfen** (6 RAs, 5 Sub-Phasen, 6 Prinzipien):
   - RA1 Scope-Drift, RA2 STR-Abhaengigkeiten, RA3 Code-Kopplung, RA4 Pipeline-Integritaet, RA5 Selbstprueferin, RA6 Kontext-Kollision.
   - Sub-Phasen: 5a Charten+Bundles, 5b Struktur-Audits (RA1/2/6 parallel), 5c Tiefen-Audits (RA3/4/5 parallel), 5d Verifikations-Gate, 5e Synthese+Zweitmeinung.
   - Prinzipien: P1 Rollen-Isolation, P2 harte Artefakt-Checkpoints, P3 State-File-SSOT, P4 Uebergabe-Prompt-Faehigkeit, P5 Zwei-Meinungen-Prinzip, P6 Verifikations-Gate vor Weiterverarbeitung.

2. **Methodische Qualifizierung** — Tool-Matrix pro Sub-Phase:
   - 5a: `llm-application-dev:prompt-engineering-patterns` + `prompt-optimize` fuer Charten-Formulierung; `documentation-generation:architecture-decision-records` fuer RA-Auftraege als ADR-Stubs; `sequentialthinking` fuer Evidenz-Bundle-Strukturierung.
   - 5b: `agent-teams:team-spawn` preset review + `team-communication-protocols` + `multi-reviewer-patterns`; mermaid-validator fuer RA2 DAG-Checks.
   - 5c: `agent-teams:team-spawn` + `comprehensive-review:code-reviewer` (RA3) + `comprehensive-review:architect-review` (RA4) + `plugin-eval:evaluation-methodology` (RA5 Rubrik); `sequentialthinking` fuer RA5-Widerspruchs-Chains.
   - 5d: mermaid-validator + `plugin-eval:evaluation-methodology` Rubrik + Bash/Grep + manuelle User-Freigabe.
   - 5e: `Agent` Tool general-purpose isoliert fuer Synthese + `comprehensive-review:full-review` als unabhaengige Zweitmeinung + `documentation-generation:architecture-decision-records` fuer finale Mutations-Beschluesse.
   - Negativliste: full-stack-orchestration (Scope-Mismatch), langchain-agent (ueberdimensioniert), rag-implementation (kein Retrieval-Bedarf), accessibility-compliance (erst Phase IV), team-debug (falscher Preset).

3. **User-Entscheidungen verankert:**
   - Team-Spawn-Modus: `agent-teams:team-spawn` + manuelle RA3/RA4/RA5-Konfiguration.
   - Zweitmeinung: nach Abschluss des manuellen Audits zweiter Durchlauf mit `comprehensive-review:full-review`, Vergleichs-Dokument (Konvergenz/Dissens) in 5e.
   - Verifikations-Test: vor 5b End-to-End-Test von team-spawn mit 1 Dummy-Agent, Fallback auf Task-Tool-Explore-Agents falls fail.

4. **Artefakte angelegt:**
   - `docs/projekt/AUSFUEHRUNGSPLAN_D15B_PHASE_III_5_RISIKO_AUDIT.md` — Masterplan mit 9 Sektionen (Prinzipien, Rollen, Sub-Phasen, State-Pattern, Resilienz, Uebergabe-Prompts, Tool-Matrix, Entscheidungen, Transition).
   - `docs/projekt/D15B_PHASE_III_5_AUDIT_STATE.md` — Single Source of Truth: Sub-Phasen-Fortschritt, Artefakt-Register, RA-Bericht-Verifikations-Status, Resilience-Protokoll.

5. **STATUS.md + CHANGELOG.md aktualisiert**, Phase-Kennung auf III.5 umgestellt, Phase IV formell blockiert bis Abschluss III.5e.

**Erkenntnisse:**
- Multi-Agent-Audit-Pattern aus D15b (content level) laesst sich auf change-set level uebertragen — dieselbe Rollen-Isolation, dasselbe Evidenz-Bundle-Prinzip, dasselbe Synthese-mit-isoliertem-Kontext-Pattern.
- State-File getrennt von STATUS.md reduziert Compaction-Risiko: STATUS bleibt fuer PM-Ebene, State-File haelt feinkoernigen Audit-Fortschritt.
- Zwei-Meinungen-Prinzip (manuell + comprehensive-review:full-review) erzeugt Konvergenz-Gewinn und Blindspot-Check der Audit-Anlage selbst.
- Rigides Verifikations-Gate vor Synthese verhindert, dass unvollstaendige/korrupte RA-Berichte in Synthese einsickern.

**Artefakte:**
- docs/projekt/AUSFUEHRUNGSPLAN_D15B_PHASE_III_5_RISIKO_AUDIT.md (neu)
- docs/projekt/D15B_PHASE_III_5_AUDIT_STATE.md (neu)
- docs/projekt/STATUS.md (aktualisiert)
- docs/projekt/CHANGELOG.md (dieser Eintrag)

**Naechster Schritt:** Sub-Phase III.5a starten mit Verifikations-Test von `agent-teams:team-spawn` (1 Dummy-Agent), danach 6 RA-Charten + 6 Evidenz-Bundles anlegen. Verzeichnis `docs/projekt/phase-iii-5/` bei Start anlegen.

---

## 2026-04-05 — Session 10 (Forts. 11): D15b-Optimierung Phase III Evaluations-Runde

**Phase:** Post-D15b Infrastruktur-Optimierung, Phase III Evaluation + Scope-Schaerfung

**Ausloeser:** User-Evaluation der 25 Strategien aus Forts. 10 mit 12 gezielten Rueckmeldungen + 3 Rueckfrage-Antworten.

**Ziel:** Scope fuer Phase IV schaerfen, strukturell andere Loesungen einarbeiten, Wave-Planung und DAG aktualisieren.

**Durchgefuehrt:**

1. **4 Strategien gestrichen:**
   - **STR-07 Spatial-Contiguity Layout-Regel**: User bestaetigt — keine Mobile-Probleme, Spalten-Layout erfuellt Spatial-Contiguity bereits. R4-Split-Attention-Befund war Fehlannahme im Audit-Prozess (falsche Layout-Rekonstruktion). Folge: Notiz in STR-17 fuer R4-Subagent-Verifikation.
   - **STR-10 DaZ-System**: geht vollstaendig in STR-09-NEU auf (Hover-Glossar ist Teil der Exit-Architektur).
   - **STR-16 Lehrprobe-Tauglichkeits-Check**: out of infrastructure scope. Lehrprobe-Einsatz ist Effekt guter Planung, kein Gueteregel-Kriterium. Game = Material, Einbettung = Lehrer-Aufgabe.
   - **STR-18 Metakognitions-Prompt-Variante**: out of scope, Lehrer-Aufgabe.

2. **2 Strategien strukturell ersetzt:**
   - **STR-09 Tracks A/B/C → STR-09-NEU Differenzierungs-Exit-Architektur**: Basierend auf User-Konzept aus `docs/analyse/Ideen zu Differenzierung.md`. Kern: Hover-Glossar fuer schwere Woerter, globaler Sprach-Umschalter im Header, Clipboard-KI-Prompts mit Rollenpriming fuer Differenzierung nach unten/oben. **Status: Folgeprojekt ausserhalb Phase IV**, Umsetzung nach Stabilitaet der Kerninfrastruktur (Waves 0-6 abgeschlossen + Mappe 5 produziert).
   - **STR-14 Personalisierungs-Meta-Reflexion → STR-14-NEU Fiktionalitaets-Kennzeichnung in Quellenangabe**: User wies zusaetzliche Meta-Aufgabe als "Overhead + Verwirrung" zurueck. Neue Loesung: explizite Fiktionalitaets- und Abweichungs-Kennzeichnung direkt in der Quellenangabe von SUB_MATERIAL_TAGEBUCH und SUB_MATERIAL_QUELLENTEXT. M15-Katalog-Kriterium. Keine Aenderung an SUB_AUFGABE_*.

3. **4 Strategien abgeschwaecht/praezisiert:**
   - **STR-06 Zeit**: von hartem Gate (Budget-Deklaration, OTL-Schaetzung, Doppelstunden-Ablaufplan, Pre-Publish-Audit) auf weiche Orientierungsgroesse "1 Mappe ≈ 1 UE" im Rahmen-Vertrag. Aufwand L→S.
   - **STR-08 Quellenkritik**: von starrer Pflicht bei Primaerquellen auf adaptiven Aufgaben-Typ. Progressionsplan-Agent (Phase 2-2a) entscheidet sinngerichtet.
   - **STR-11 Typologie-Erweiterung**: explizite Anti-Quota-Klausel — neue Subtypen (Vergleich, Begruendung) werden **verfuegbar**, nicht quotiert. Keine "mind. X Typen pro Mappe"-Regel.
   - **STR-12 Trigger-System**: Sichtbarkeits-Constraint ergaenzt — trigger_flags sind ausschliesslich Lehrkraft-Metadaten, NIE SuS-sichtbar, Engine-Unterdrueckung im Rendering.

4. **STR-13 umgebaut (Variante a):** Reflexion wird aus dem Hefteintrag herausgezogen (HE bleibt reine Wissenssicherung). Neue **statische Mappenabschluss-Zone** unter dem Hefteintrag mit fixem Template (1-2 Reflexionsfragen + Ueberleitungssatz), generiert durch kleinen Sub-Task im Assembly-Schritt. Zusatz: Mappe-4-Mappenabschlussbereich ist durch Relikte frueherer Architekturentscheidungen chaotisch; wird im Zuge der Umsetzung praezise aufgeraeumt und standardisiert.

5. **STR-24 ergaenzt:** neuer Abschnitt "Verhaeltnis zu E5 Gueteregel-Katalogen" — Checkliste ist **komplementaeres** Pre-Publish-Q-Gate auf Mappen-Ebene, **nicht Ersatz** der prozess-immanenten Kataloge. Kataloge bleiben Teilschritt-Qualifikation, STR-24 ist Cross-Ebenen-Fang-Netz.

6. **DAG + Waves neu gezeichnet:** STR-07/10/16/18 aus DAG entfernt. STR-09-NEU als Folgeprojekt-Knoten visuell abgetrennt. Wave 1 schrumpft (STR-07/09 raus), Wave 2 schrumpft (STR-10 raus), Wave 3 Engine deutlich kleiner (nur noch STR-03/04/20), Wave 4 kleiner (STR-09/10 E8-Anteile raus, STR-16 raus), Wave 7 kleiner (STR-18 raus). **Neue Aufwandsschaetzung: 7-9 Sessions Voll / 5-6 Sessions Kern** (statt 10-12 / 6-7).

7. **Register-Update:** 20 aktive Strategien (1 P0-META + 5 P0 + 7 P1 + 5 P2 + 2 Konsoli/Meta). 4 gestrichen, 1 Folgeprojekt.

**Erkenntnisse:**
- **Audit-Fehlannahme als Methodik-Lessons-Learned:** STR-07 ist ein Beispiel fuer einen Befund, der durch mangelhafte Layout-Rekonstruktion im R4-Subagenten BLOCKER-Status bekam, obwohl das Problem nicht existiert. STR-17 (Audit-Methodik-Iteration) muss in v2 explizite Layout-Verifikations-Schritte fuer Instructional-Design-Befunde einfuehren.
- **Strukturelle Loesung schlaegt Aufgaben-Schicht:** STR-14 ist ein Beispiel dafuer, dass eine epistemologische Kritik (R1 zu Friedrich-Tagebuch) nicht durch eine zusaetzliche Aufgabe aufgeloest werden muss, sondern durch eine Kennzeichnung am Material selbst. Weniger Overhead, klarere Botschaft.
- **Exit-Architektur als alternatives Differenzierungs-Modell:** User's Konzept loest Differenzierung nicht durch Content-Multiplikation (Tracks A/B/C), sondern durch Exit-Points zu externen KI-Systemen. Strukturell eleganter, aber technisch und padagogisch noch zu klaeren — deshalb Folgeprojekt.
- **Mappenabschlussbereich aufraeumen:** User hat explizit auf Architektur-Relikte hingewiesen, die in Mappe 4 chaotisch geworden sind. STR-13 traegt jetzt einen doppelten Auftrag: neue Struktur etablieren + Legacy aufraeumen.

**Artefakte (geaendert):**
- `docs/projekt/D15B_OPTIMIERUNGS_STRATEGIEN.md` (umfangreich editiert: Strategie-Register, Details STR-06/07/08/09/10/11/12/13/14/16/18/24, DAG, Waves, Entscheidungspunkte, Arbeitsprotokoll Forts. 11)
- `docs/projekt/STATUS.md`
- `docs/projekt/CHANGELOG.md` (dieser Eintrag)

**Naechster Schritt:** Commit. Dann User-Freigabe zu den 4 verbleibenden Entscheidungspunkten (Scope-Cut, Engine-Session-Schnitt, Re-Audit-Scope, Mappe-4/5-Strategie) einholen. Danach STR-25 C2-Cross-Reference als Vorlauf, dann Wave 0 STR-01.

---

## 2026-04-04 — Session 10 (Forts. 10): D15b-Optimierung Phase III (Strategien-Ausarbeitung)

**Phase:** Post-D15b Infrastruktur-Optimierung, Phase III (Strategie-Ausarbeitung)

**Ausloeser:** User-Direktive "starte entsprechend phase iii" nach Phase-II-Commit (b2d1e1f) + User-Push.

**Ziel:** Die 23 Netto-Cluster / 6 Bundle-Zonen aus Phase II in committierbare Strategien ueberfuehren. DAG, Session-Schnitt, Entscheidungspunkte fuer User-Freigabe.

**Durchgefuehrt:**

1. **25 Strategien definiert** (STR-01 bis STR-25), jede als committierbare Einheit mit Ziel, Aenderungs-Skizze, Abhaengigkeiten, Risiken, Validierung, Aufwand (S/M/L).
2. **STR-01 als Wave-0-Meta-Fundament** etabliert: Tiefenstruktur-Refactor der 6 Gueteregel-Kataloge (`GUETEKRITERIEN_HEFTEINTRAG_*`, `_AUFGABEN`, `_SKRIPT`, `_SEQUENZIERUNG`, `QUALITAETSKRITERIEN_MATERIALPRODUKTION`). Fuehrt zweischichtige Struktur ein: Oberflaechen- vs. Tiefenstruktur-Kriterien. Tiefenstruktur wird Primaer-Achse. Alle E5-beruehrenden STRs (18 Stueck) haengen von STR-01 ab.
3. **ATOM-UNIT-Kennzeichnung** bei 6 Strategien (STR-02 Bloom, STR-03 Feedback, STR-04 Tipps, STR-08 Quellenkritik, STR-09 Differenzierung, STR-11 Typologie). Diese muessen Vertrag (E1) + Subagent (E3) + Gueteregel-Katalog (E5) synchron im selben Commit aendern — Umsetzung der Phase-II-Erkenntnis "E1↔E3 Kopplung".
4. **Engine-Bundle in Wave 3** konsolidiert: STR-03 Feedback-Rendering, STR-04 Tipp-UI, STR-07 Layout side-by-side, STR-09 Track-Switcher, STR-10 Glossar-Tooltip + STR-20 als Sammel-A11y (Kontrast, Touch-Targets, ARIA). Kann parallel zu Wave 1+2 laufen, sobald Vertrags-Commits stehen.
5. **STR-24 E6-Konsolidierung**: Statt 9 Einzel-Checklisten eine **konsolidierte D15b-Post-Publish-Checkliste** mit allen Spots (Bloom/Feedback/Tipps/Multiperspektive/Zeit/Layout/Quellenkritik/Diff/DaZ/Trigger/Lehrprobe/A11y). Umsetzung der Phase-II-Erkenntnis "E6 als Multiplikator".
6. **STR-25 C2-Cross-Reference** als expliziter Vorlauf-Schritt vor Phase IV verankert. Jeder offene C2-Finding (3 MEDIUM + 9 LOW + IL-2/IL-3/IL-5) wird auf D15b-Abdeckung geprueft; nicht abgedeckte Findings gehen in separaten C2-Restposten-Track. **Kein Register-Merge**, keine Cluster-Neu-Berechnung. Setzt die Empfehlung aus Session 10 Forts. 9 um.
7. **DAG als Mermaid-Diagramm** mit STR-01 als Root, Verzweigung auf alle abhaengigen STRs, Engine-Kopplung als dotted edges, STR-24 als Sammel-Knoten vor Phase-IV-Start.
8. **8 Execution-Waves** als Session-Schnitt:
   - Wave 0 Fundament (STR-01): 1 Session
   - Wave 1 E1+E3 Atom-Units (STR-02/03/04/05/07/08/09/11): 2-3 Sessions
   - Wave 2 E2/E5 Material-Querschnitt (STR-06/10/12/13/14/15): 1-2 Sessions
   - Wave 3 Engine (STR-03/04/07/09/10 Engine-Teile + STR-20): 2 Sessions — parallel zu Wave 1+2
   - Wave 4 Lehrkraft-Dokumente (STR-06 E8, STR-09 E8, STR-10 E8, STR-12 E8, STR-16, STR-23): 1 Session
   - Wave 5 E6-Konsolidierung (STR-24): 1 Session
   - Wave 6 Audit-Methodik (STR-17, STR-19): 1 Session — parallel
   - Wave 7 P2-Nachschub (STR-18, STR-21, STR-22): 1 Session
   - Vorlauf: STR-25 C2-Cross-Reference 0.5 Session
   - **Summe: 10-12 Sessions Voll / 6-7 Sessions P0+P1-Kern**
9. **4 Entscheidungspunkte** fuer User-Freigabe formuliert:
   - (a) Scope-Cut: Voll-Umsetzung (25 STR) oder P0+P1-Kern (11-12 STR)
   - (b) Engine-Session-Schnitt: 1 oder 2 Engine-Sessions
   - (c) Re-Audit-Scope Phase V: Voll (6 Rollen) oder reduziert (R4/R6/R2)
   - (d) Mappe-4-Patch vs. Mappe-5-Neu-Produktion
10. **STATUS + CHANGELOG aktualisiert.**

**Erkenntnisse:**

- Die Verdichtung von 23 Clustern → 25 Strategien klingt nach Inflation, ist aber korrekt: STR-17 Audit-Methodik, STR-20 A11y-Sammel, STR-24 Checklisten-Sammel, STR-25 C2-Cross-Reference sind **Meta-/Sammel-Strategien**, keine neuen Cluster. 21 der 25 Strategien bilden die 23 Cluster direkt ab (leichte 1:1-Divergenz durch STR-17 Bundle-Zone + Cluster-Merging).
- Die **ATOM-UNIT-Kennzeichnung** ist die wichtigste operative Entscheidung. Ohne sie wuerde Phase IV in einen fragmentierten Patch-Strom zerfallen, in dem Vertraege und Subagenten-Prompts auseinanderdriften (bekanntes Failure-Pattern aus fruehen Sessions).
- **Parallelitaets-Potenzial** (Wave 3 + Wave 6 parallel zu Wave 1+2) verkuerzt Phase IV gegenueber rein sequenzieller Abarbeitung um geschaetzt 3-4 Sessions.
- **STR-25 C2-Cross-Reference als Vorlauf** ist methodisch sauberer als ein C2-Restposten-Track nach Phase IV. Vor Phase IV wissen wir, welche C2-Findings automatisch mit abgedeckt sind und welche separat behandelt werden muessen — das vermeidet Doppel-Arbeit.
- **Aufwands-Schaetzung konservativ**: Jede Atom-Unit-Strategie (STR-02..11) ist mit M (1-4h) geschaetzt, aber die Kopplung Vertrag+Subagent+Katalog + Pruefung auf Legacy-Kompatibilitaet kann in Einzelfaellen L werden. Realistische Obergrenze: 12 Sessions.

**Artefakte:**

- `docs/projekt/D15B_OPTIMIERUNGS_STRATEGIEN.md` — Template → Voll-Ausarbeitung. Strategie-Register, 25 Strategie-Details, DAG (Mermaid), 8 Waves, Entscheidungspunkte, Arbeitsprotokoll.
- `docs/projekt/STATUS.md` — Update
- `docs/projekt/CHANGELOG.md` — dieser Eintrag

**Naechster Schritt:**

**User-Freigabe fuer Phase IV** zu den 4 Entscheidungspunkten einholen. Danach STR-25 C2-Cross-Reference als 0.5-Session-Vorlauf, dann Wave 0 STR-01 Tiefenstruktur-Meta. **Phase IV beginnt nicht ohne Freigabe.**

---

## 2026-04-04 — Session 10 (Forts. 9): D15b-Optimierung Phase II (Implikations-Matrix)

**Phase:** Post-D15b Infrastruktur-Optimierung, Phase II (Infrastruktur-Implikations-Analyse)

**Ausloeser:** Phase-I-Commit (6fb33e2) durch User gepusht. Phase II ist methodisch-analytisch, per `AUSFUEHRUNGSPLAN_D15B_OPTIMIERUNG.md` ohne User-Freigabe.

**Ziel:** Die 23 Netto-Cluster aus Phase I auf die Infrastruktur-Ebenen E0-E9 mappen, Hotspots verifizieren, Verdichtung zu strategischen Bundle-Zonen.

**Durchgefuehrt:**

1. **Matrix-Umbau**: `D15B_IMPLIKATIONS_MATRIX.md` von Scaffold (Befund × Ebene mit `?`/leer) auf **Cluster × Ebene** mit vollstaendigen A/M/D/E-Zellen umgebaut. Begruendung: 114 Einzelbefunde auf Matrix-Ebene waere unlesbar; Phase I hat bereits auf 23 Cluster verdichtet, dies ist die natuerliche Analyse-Einheit.
2. **Zell-Befuellung** pro Cluster, Regel: "Zelle bekommt Eintrag nur bei konkretem Datei-Impact, keine Spekulativ-Zellen":
   - **P0 (7 Cluster):** K01 Bloom (E1+E3+E5+E6), K02 Feedback (E1+E3+E5+E7), K03 Tipps (E1+E3+E5+E7), K04 Multiperspektivitaet (E1+E2+E5+E6), K09 Zeit-Realismus (E0+E1+E5+E6+E8), K12 Layout/Spatial-Contiguity (E5+E6+E7), K13 Gueteregeln-Tiefenstruktur (E5+E6+E9).
   - **P1 (10 Cluster):** K05 Quellenkritik (E1+E3+E5+E6), K06 DaZ (E2+E5+E7+E8), K07 Differenzierung (E1+E3+E5+E7+E8), K08 Trigger (E2+E6+E8), K14 Hefteintrag (E2+E5), K16 Aufgabentypologie (E1+E3+E5), K32 Schutzregeln (E5+E9), K33 Lehrprobe (E5+E6+E8), K34 Personalisierung (E2+E3+E5), K36 Audit-Methodik (E9).
   - **P2 (6 Cluster):** K11 Metakognition (E3+E5), K15 Pandel (E5+E9), K17 WCAG (E5+E6+E7+E9), K22 Sync-Punkte (E0+E4), K23 Worked Examples (E3+E5), K31 Sequenz-Uebergang (E5+E8).
3. **Hotspot-Tally verifiziert:**
   - E5 Gueteregeln: **20/23** → KRITISCH
   - E3 Subagenten Aufgaben: 9/23 → SEHR HOCH
   - E6 Checklisten: 9/23 → HOCH
   - E1 Vertraege: 8/23 → HOCH
   - E7 Engine: 6/23 → HOCH
   - E8 Begleitdokumente: 6/23 → MITTEL
   - E2 Sub-Material: 5/23 → MITTEL
   - E9 Audit-Methodik: 5/23 → MITTEL
   - E0/E4: 1-2 → NIEDRIG
4. **Nicht-offensichtliche Erkenntnisse** im Arbeitsprotokoll kodifiziert:
   - **E1↔E3 Kopplung**: 8 von 9 E1-Clustern schlagen auch auf E3 durch. Vertrag (E1) und Subagent-Prompt (E3) muessen als Atom-Unit geaendert werden, sonst Desynchronisation. Wird in Phase III als harte Sequenzierungs-Regel.
   - **K13 als Meta-Patch**: Tiefenstruktur-Refactor der Gueteregel-Kataloge ist nicht ein Cluster unter vielen, sondern definiert die Qualitaet aller weiteren E5-Aenderungen. Muss zeitlich vor oder gekoppelt mit K01-K12/K14-K17 greifen.
   - **E6 als Multiplikator**: Jeder E5-Patch erzeugt automatisch einen E6-Patch. Bundle-Option: eine konsolidierte D15b-Post-Publish-Checkliste statt 9 Einzel-Checklisten.
5. **Verdichtung auf 6 strategische Bundle-Zonen** (Input fuer Phase III):
   - Z1 E5-Meta (K13 als Primaer-Patch)
   - Z2 E1+E3-Atom-Units (K01/K02/K03/K05/K07/K16 als gekoppelte Patches)
   - Z3 E6-Konsolidierung (alle Checklisten-Patches gebuendelt)
   - Z4 E7-Engine-Session (K02/K03/K06/K07/K12/K17)
   - Z5 E8-Lehrkraft-Dokumente (K06/K07/K08/K09/K31/K33)
   - Z6 E9-Audit-Methodik-Iteration (K13/K15/K17/K32/K36)
6. **STATUS.md** "Letzte Aktualisierung", "Aktuelle Phase", "Letzter Arbeitsschritt", "Naechster Schritt", "Abgeschlossen seit letztem Update" aktualisiert.

**Erkenntnisse:**

- Die Entscheidung, Matrix auf **Cluster-Ebene** statt Befund-Ebene zu fuehren, war entscheidend fuer Lesbarkeit und Entscheidungsrelevanz. Phase-I-Cluster-Verdichtung zahlt sich hier aus.
- **E5 Gueteregeln ist der zentrale Hebel** der gesamten Optimierung — fast alle Cluster landen dort. Ohne E5-Refactor bleibt strukturell alles gleich. K13 (Tiefenstruktur) ist der Meta-Patch, der E5 qualitativ transformiert.
- **E3 (Aufgaben-Subagenten) + E1 (Vertraege)** sind die zweite Hauptlast. Die Kopplung zwischen beiden ist die wichtigste nicht-offensichtliche Einsicht dieser Phase.
- **E7 Engine-Patches** sind heterogen, aber Ownership-Konflikt-arm — gut fuer parallele Session mit Frontend-Fokus.
- **E8 Lehrkraft-Dokumente** sind niedrig-Risiko, hoher Praxis-Wert → ideale Abschluss-Session.
- **6 Bundle-Zonen statt 23 Einzel-Patches**: reduziert Phase-III-Entscheidungslast erheblich. Statt 23 Strategie-Entscheidungen noch 6 Bundle-Strategien + interne Sequenzierung.

**Artefakte:**

- `docs/projekt/D15B_IMPLIKATIONS_MATRIX.md` — von Scaffold auf Vollbefuellung (23 Cluster × 10 Ebenen, Hotspot-Tally, Interpretation, Arbeitsprotokoll Phase II)
- `docs/projekt/STATUS.md` — Update
- `docs/projekt/CHANGELOG.md` — dieser Eintrag

**Naechster Schritt:**

Phase III — `D15B_OPTIMIERUNGS_STRATEGIEN.md` mit den 6 Bundle-Zonen ausarbeiten. Harte Sequenzierung: Z1 (K13 Meta) vor Z2 (E1+E3 Atom-Units) vor Z3 (E6-Konsolidierung). Z4 (E7) parallel moeglich. Z5 (E8) und Z6 (E9) am Ende. Phase III braucht User-Freigabe vor Phase IV (Umsetzung).

---

## 2026-04-04 — Session 10 (Forts. 8): D15b-Optimierung Phase I (Befund-Qualifizierung)

**Phase:** Post-D15b Infrastruktur-Optimierung, Phase I (Befund-Qualifizierung)

**Ausloeser:** User-Direktive "start" nach Phase-0-Abschluss und Commit.

**Ziel:** Vollstaendige Befund-Extraktion aus allen 6 Audit-Dateien, Konsolidierung in Befund-Register, Cluster-basierte Qualifizierung mit Verdikten (accept/modify/reject/defer).

**Durchgefuehrt:**

**Phase I.1 — Parallel-Extraktion (6 Subagenten):**
- Dispatch 6 general-purpose Agenten, jeweils mit isoliertem Prompt und strukturiertem Ausgabe-Format (Titel, Kernaussage, Evidenz, Objekt, Richtung, Severitaet, Verallgemeinerbarkeit, Konvergenz-Bezug).
- Ergebnis: 94 Rollen-Befunde
  - R1 Geschichtsdidaktik: 20 Befunde (Belgien-Problematisierung, Multiperspektivitaet, Quellenkritik, Methoden/Fragekompetenz, Pandel-Dimensionen)
  - R2 Lehrerin Stadt/DaZ: 14 Befunde (DaZ-Glossar, paraphrasiertes Zitat, Trigger-Sensibilitaet, Zeitrahmen, Foerderkinder)
  - R3 Lehrerin Land: 15 Befunde (Tagebuch-Staerke, Fachbegriffe, Offline-Fallback, Flucht-Sensibilitaet, Satz-Starter, Equity)
  - R4 Instructional Design: 15 Befunde (Backward-Design, Split-Attention BLOCKER, Feedback d=0.20 BLOCKER, ICAP, Expertise-Reversal, CLT-Operationalisierung)
  - R5 Seminarleiter: 15 Befunde (45-Min-Rahmen, Differenzierung, A7-Rubric Lehrprobe-Killer, Synchronisationspunkte, Gueteregeln-Luecken)
  - R6 Unterrichtsqualitaet: 15 Befunde (Tiefen-/Oberflaechen-Mismatch, Bloom 6:1, Hattie-Feedback, OTL 20%, Gesamt-Effektstaerke d=0.42-0.52 BLOCKER)

**Phase I.2 — Konsolidierung:**
- D15B_BEFUND_REGISTER.md Teil 2 komplett neu geschrieben: 6 strukturierte Tabellen (eine pro Rolle) mit allen 94 Befunden. Platzhalter raus. Gesamt-Register jetzt 114 Eintraege (20 Synthese + 94 Rollen).

**Phase I.3 — Cluster-basierte Qualifizierung:**
- 36 Cluster K01-K36 gebildet, die semantisch verwandte Befunde aus mehreren Rollen buendeln.
- Pro Cluster: Verdikt mit Kurzbegruendung, Prioritaet (P0/P1/P2), Ebenen-Zielverweis.
- Netto-Bilanz:
  - **accept P0 (7):** K01 Cognitive Depth/Bloom, K02 Feedback-Qualitaet Hattie, K03 Tipp-Haertegrade, K04 Multiperspektivitaet, K09 Zeit-Realismus, K12 Layout/Spatial-Contiguity, K13 Gueteregeln-Tiefenstruktur
  - **accept P1 (10):** K05 Quellenkritik, K06 DaZ/Sprache, K07 Differenzierung, K08 Trigger-Sensibilitaet, K14 Hefteintrag/Rubric, K16 Aufgabentypologie/Distraktoren, K32 Schutzregeln (R3-Staerken), K33 Lehrprobe-Tauglichkeit, K34 Personalisierung-Dissens parametrisiert, K36 Audit-Methodik
  - **accept P2 (6):** K11 Metakognition/Concept-Mapping, K15 Pandel-Dimensionen, K17 WCAG, K22 Synchronisationspunkte, K23 Worked Examples, K31 Sequenz-Uebergeleitung
  - **modify/scope (4):** K21 kooperative Phasen (umdefiniert), K25 Integration (in K04/K11 integriert), K27 Material-Rezeption (Symptom), K28 SAMR-Mismatch (Meta-Befund)
  - **reject (1):** K26 Loesungswort (bleibt als bewusste Design-Entscheidung des Escape-Formats)
  - **defer (5):** K18 DSGVO-Compliance-Track, K19 Performance-Track, K20 Offline-Distribution-Track, K24 Audio-Produktion, K29 Historiografischer Vertiefungs-Zusatz
  - **merged in other (3):** K10→K07, K30→K01, K35→K16
- **Netto-Optimierungs-Portfolio fuer Phase III: 23 Cluster.**

**Phase I.4 — Statistik & Bilanz:**
- D15B_BEFUND_REGISTER.md Teil 4 aktualisiert: Befund-Statistik (114), Cluster-Bilanz (36→23), Severitaets-Verteilung (3 BLOCKER / ~30 HIGH / ~55 MEDIUM / ~20 LOW / 6 INFO-positiv), Verallgemeinerbarkeit (~45/45/8/2%).

**Erkenntnisse:**
- Starke Konvergenz Theoretiker (R4, R6) und Praktiker (R2, R3, R5) auf K01 (Bloom-Tiefe) und K02 (Feedback) — ueberraschend angesichts der Rollen-Distanz.
- Dissens D1 (Friedrich-Personalisierung: R1 kritisch, R3 als Equity-Staerke verteidigt) wird nicht zu "pro oder contra" aufgeloest, sondern als parametrisierte Entscheidung: Personalisierung bleibt, wird durch Pflicht-Meta-Reflexions-Aufgabe ergaenzt (K34).
- R3 liefert 4 positive Staerke-Befunde (Tagebuch aktiviert bildungsferne SuS, Hefteintrag pruefungstauglich, Equity-Faktor, Gesamturteil einsetzbar). Diese werden als "Schutzregeln" kodifiziert (K32) — Optimierung darf sie nicht beschaedigen.
- Infrastruktur-Hotspots bestaetigt: E3 Aufgaben-Subagent (K01/K03/K05/K07/K11/K14/K16/K23/K34), E5 Gueteregeln (K01/K02/K04/K06/K09/K13/K16/K32/K33), E7 Engine (K02/K03/K06/K07/K12), E8 Begleitdokumente (K08/K14/K21/K22/K31).

**Artefakte:**
- docs/projekt/D15B_BEFUND_REGISTER.md (Teil 2 neu geschrieben, Teil 3 cluster-qualifiziert, Teil 4 statistik-aktualisiert).
- docs/projekt/STATUS.md (aktualisiert).
- docs/projekt/CHANGELOG.md (dieser Eintrag).

**Naechster Schritt:** Phase II (Implikations-Matrix). Pro Cluster Ebenen-Mapping + Skizze. Methodisch-analytisch, keine User-Freigabe noetig.

---

## 2026-04-04 — Session 10 (Forts. 7): D15b-Optimierungs-PM-Infrastruktur (Phase 0)

**Phase:** Post-D15b Infrastruktur-Optimierung, Phase 0 (PM-Infrastruktur vorbereiten)

**Ausloeser:** User-Direktive nach Push der D15b-Audit-Deliverables: "umfassende schrittweise Optimierung der Generierungsinfrastruktur auf Basis des Testruns Mappe 4, lueckenlos intelligent geplant — PM-Infrastruktur vorbereiten, bevor Strategien ausgearbeitet werden".

**Ziel:** Scaffold fuer phasenbasierte, lueckenlose Verarbeitung der D15b-Audit-Daten etablieren. Keine inhaltliche Qualifizierung in dieser Phase — nur die Werkzeuge.

**Durchgefuehrt:**

**(1) AUSFUEHRUNGSPLAN_D15B_OPTIMIERUNG.md — Master-Plan**
- 6 Phasen definiert: Phase 0 (PM-Infrastruktur), Phase I (Befund-Qualifizierung), Phase II (Implikations-Analyse), Phase III (Strategie-Ausarbeitung), Phase IV (Umsetzung), Phase V (Re-Audit + Retrospektive).
- Pro Phase: Ziel, Arbeitsschritte, Deliverables, Abschluss-Kriterium, Aufwands-Schaetzung.
- Leitprinzipien: Trennung Befund→Qualifizierung→Implikation→Strategie→Umsetzung; lueckenlose Abdeckung (auch verworfene Befunde mit Begruendung); Evidenz-Gewichtung nach IRR; Dissens-Befunde als Optionen/Parameter statt Entscheidungen; keine Vermischung mit Mappe-5-Produktion.
- Zeit-/Session-Uebersicht: geschaetzt 8-13 Sessions ueber alle Phasen.

**(2) D15B_BEFUND_REGISTER.md — Strukturiertes Befund-Register**
- Scaffold mit Qualifizierungs-Metadaten-Schema pro Befund (ID, Titel, Quelle, Konvergenz-Klasse, Evidenz-Staerke, Verallgemeinerbarkeit INFRA/MAPPE/MIXED, Severitaet, Qualifizierungs-Verdikt accept/modify/reject/defer, Ebenen-Tag, Status).
- Teil 1: 20 Synthese-Befunde pre-populiert (Klasse A1-A5, B1-B3, C1-C3, D1-D2, E1-E2, F1-F6). Jeder Befund mit vorlaeufigem Ebenen-Tag.
- Teil 2: Placeholder-Tabellen pro Rolle (R1-R6) fuer rollen-spezifische Befunde, die in Phase I aus den 6 Einzel-Audit-Dateien extrahiert werden (bekannte Einzelbefunde wie R2-1 DaZ-Glossar, R2-2 iPad-Touch, R2-3 Paraphrase-Kennzeichnung, R4-1 Tipp-Haertegrade, R4-2 Pretraining, R5-1 Rubric, R5-2 Klassenfuehrung, R6-1 Tipp-Leak, R6-2 OTL-Effizienz bereits als Platzhalter angelegt).
- Teil 3: Arbeitsprotokoll (leer, wird in Phase I gefuellt).
- Teil 4: Statistik-Dashboard.

**(3) D15B_IMPLIKATIONS_MATRIX.md — Infrastruktur-Mapping**
- 10 Infrastruktur-Ebenen definiert mit Datei-Zuordnungen:
  - E0 Meta-Prozess (WORKFLOW_v4.md, ORCHESTRATOR Phasen-Teil)
  - E1 Vertraege (6 Phasen-Vertraege + Assembly)
  - E2 Subagenten Material (7 SUB_MATERIAL_*.md + AGENT_HEFTEINTRAG)
  - E3 Subagenten Aufgaben (5 SUB_AUFGABE_*.md + AGENT_RAETSEL)
  - E4 Orchestrator (Steuerungs-Teil)
  - E5 Gueteregeln (6 Kataloge: G1-G14, HE1-HE13, A1-A18, SK1-SK15, S1-S15, M1-M12)
  - E6 Checklisten/Q-Gates
  - E7 Engine (escape-engine.js, theme-gpg.css, data.json-Schema)
  - E8 Begleitdokumente (neu: escape-games/*/lehrkraft/)
  - E9 Audit-Methodik (D15b-Lessons, Folge-Audits, Plugin-Integration)
- Matrix-Scaffold (Befund × Ebene) mit vorlaeufigen Zellen (? = Phase II-Pruefung noetig, A/M/D/E = Add/Modify/Delete/Enforce).
- Vorlaeufige Hotspot-Analyse: E3 (Subagenten Aufgaben) und E5 (Gueteregeln) als SEHR HOCH, E7 (Engine) und E8 (Begleitdokumente) als HOCH, E2 und E9 als MITTEL. Interpretation: Mappe-4-Audit bestaetigt, dass die Material-Ebene funktioniert, aber Aufgaben/Feedback/Gueteregeln strukturell unterdimensioniert sind.

**(4) D15B_OPTIMIERUNGS_STRATEGIEN.md — Strategie-Template**
- Strategie-Template-Schema (STR-ID, Prioritaet P0-P3, adressierte Befunde, Ebenen, Aenderungs-Typ, Ziel, Skizze, Abhaengigkeiten, Risiken, Validierung, Aufwand, Umsetzungs-Reihenfolge).
- 7 Strategie-Kategorien mit ~25 erwarteten Arbeitstitel-Strategien als Orientierung (nicht verbindlich fuer Phase III):
  - S-Engine (5): Layout side-by-side, Feedback-Slots, Differenzierungs-Support, DaZ-Glossar-Komponente, WCAG-Pass
  - S-Subagenten (7): Multiperspektivitaet, Bloom-Verteilung, Tipp-Haertegrade, elaboratives Feedback, Paraphrase-Kennzeichnung, Concept-Mapping Hefteintrag, Freitext-Rubric
  - S-Gueteregeln (3): Erweiterung Aufgaben/Material/Sequenzierung
  - S-Checklisten (2): Pre-Publikations-Checkliste, Multi-Audit als Standard-Q-Gate
  - S-Begleitdokumente (4): Trigger-Leitfaden, Doppelstunden-Ablauf, Differenzierungs-Arbeitsblaetter, Freitext-Rubric
  - S-Audit-Methodik (4): D15b-Workflow-Dokumentation, accessibility-compliance Integration, Retention-Test, Mini-Pilot-Test
  - S-Mappe-4-Daten-Patch (5): Aufgaben-Reihenfolge, Feedback-Texte, DaZ-Glossar-Daten, Paraphrase-Kennzeichnung, Trigger-Warning
- Abhaengigkeits-Graph-Platzhalter (DAG).
- Entscheidungspunkte fuer User-Freigabe nach Phase III (Scope-Cut, Engine-Impact, Patch-Reihenfolge, Re-Audit-Scope).

**Geaenderte/neue Dateien:**
- docs/projekt/AUSFUEHRUNGSPLAN_D15B_OPTIMIERUNG.md (neu)
- docs/projekt/D15B_BEFUND_REGISTER.md (neu)
- docs/projekt/D15B_IMPLIKATIONS_MATRIX.md (neu)
- docs/projekt/D15B_OPTIMIERUNGS_STRATEGIEN.md (neu)
- docs/projekt/STATUS.md
- docs/projekt/CHANGELOG.md

**Naechster Schritt:** Phase I starten — aus den 6 Einzel-Audit-Dateien (D15b_AUDIT_R1 bis R6) systematisch alle rollen-spezifischen Befunde extrahieren, in Register Teil 2 eintragen, alle Befunde (Synthese + rollen-spezifisch) qualifizieren. Subagent-Einsatz empfohlen: 6 parallele Extraktions-Agenten, einer pro Audit-Datei, zurueckgebend strukturierte Befund-Listen. Erwartete Gesamt-Befundzahl nach Phase I: 30-45.

**Phase-0-Abschlusskriterium erfuellt:** 4 PM-Dokumente angelegt, in STATUS.md verlinkt, committed.

---

## 2026-04-04 — Session 10 (Forts. 6): D15b Multi-Agent-Audit Mappe 4 (Schlieffen-Plan)

**Phase:** Post-C2 Qualitaets-Audit (QM-Rueckspeisung in Generierungs-Infrastruktur)

**Ziel:** Konsolidierte, rollen-diverse Qualitaetsbewertung der Mappe 4 mit anschliessender Rueckfuehrung in Subagenten-Prompts/Guetekriterien/Checklisten. Multi-Agent-Architektur mit voller Rollen-Isolation zur Vermeidung von Priming-Kontamination.

**Durchgefuehrt:**

**Phase 1 — Evidenz-Bundle:**
- D15b_EVIDENZ_BUNDLE_MAPPE4.md: Hauptoberflaeche via Chrome MCP erfasst. Tipps und Feedback NICHT via interaktives Ausklappen sondern via Backend-Extraktion aus `escape-games/gpg-erster-weltkrieg-ursachen/data.json` (21 Tipps verbatim) und `assets/js/escape-engine.js` (8 generische Feedback-Strings, `_aktiviereLoesungswort` Mechanik). Begruendung: tipps/feedback folgen einheitlichem Muster, backend-read effizienter als DOM-Walk.
- Anhang A: 21 Tipps verbatim aus data.json
- Anhang B: Feedback-Nachrichten-Tabelle aus escape-engine.js
- Anhang C: Loesungswort-Mechanik korrekt rekonstruiert — collective unlock von geshuffletem 5-Buchstaben-Pool "MARNE" via `_aktiviereLoesungswort` (Zeile 3193 in escape-engine.js), KEIN 1:1-Mapping Aufgabe->Buchstabe.
- Screenshot-Header-Problem diagnostiziert: `<header>` NICHT position:fixed (base.css:146), `.sticky-stundenfrage` nur ~40-50px (theme-gpg.css:2169). Ursache ausserhalb DOM identifiziert (Chrome-in-Claude Extension-Overlay). Mitigation: resize 1440x2000, Text-Primat ueber `get_page_text`/`read_page`, `.sticky-stundenfrage` hide + `scrollIntoView`.

**Phase 2 — 6 isolierte Rollen-Agenten (sequenziell):**
Jeder Agent erhielt NUR Rollen-Charta + Guetekriterien + URL + operationale Chrome-MCP-Anweisungen. Keine Session-Historie, keine Vorbefunde, keine Bundle-Inhalte. Maximal professionalisierte Rollen-Identitaeten.

- **R1 Geschichtsdidaktik** (Prof. Dr. Helene Forstner, W3): FUER-Modell/Pandel/Ruesen. Verdikt: "Einsetzbar mit kleineren bis erheblichen Einschraenkungen". Kritisch: deutschzentrierte Perspektive, fehlende Multiperspektivitaet (keine belgische/franzoesische Sicht), keine Quellenkritik, nur 2/7 Pandel-Dimensionen angesprochen, Fragekompetenz absent, Hefteintrag erklaert Scheitern des Plans nicht ursachenlogisch. Datei: D15b_AUDIT_R1_GESCHICHTSDIDAKTIK.md (40 KB, 533 Zeilen).
- **R4 Instructional Design** (Dr. Stefan Raithel, ID Lab): Mayer/Sweller/Merrill/Hattie-Timperley/ICAP. Verdikt: "Tragfaehig mit substantiellen Nachschaerfungen". Kritisch: Split-Attention im Material-Layout, engine-generische Feedback-Strings (d~0.20-0.30 vs. Ziel 0.70 Hattie-Timperley), ICAP-Mismatch 6/7 Aufgaben nur Active, Tipp-Haertegrade fehlen, kein Pretraining. Datei: D15b_AUDIT_R4_INSTRUCTIONAL_DESIGN.md (31 KB, 370 Zeilen).
- **R5 Seminarleiter Bayern** (Bernd Kaltenbrunner): LehrplanPlus Bayern, Meyer 10 Merkmale, APO-RS. Verdikt: "Fuer Lehrprobe mit Ergaenzungen empfehlbar". Zeitbudget: Doppelstunde (90 Min.) statt Einzelstunde noetig. Meyer: 7/10 erfuellt. Tagebuch Friedrich "hervorragend". Kritisch: Aufgabe 7 Freitext benoetigt explizite Rubric fuer Lehrprobensituation, Klassenfuehrung bei Einzelarbeit. Datei: D15b_AUDIT_R5_SEMINARLEITER.md (27 KB, 342 Zeilen).
- **R6 Unterrichtsqualitaet empirisch** (Prof. Dr. Martin Heidacker): Helmke Basisdimensionen, Hattie d-Werte, COACTIV, OTL. Verdikt: MITTEL, ca. 40-50% unter High-Quality-Benchmark. Effektstaerken-Prognose: d~0.35-0.50 post-test (Ziel 0.60), d~0.10-0.20 transfer (Ziel 0.40). Bloom 1-3 in 6/7 Aufgaben (nur Aufgabe 7 Bloom 4-6). OTL-Effizienz ~20% vs. Ziel 30-40%. Tipp-Nutzungs-Leak 60-70% durch Loesungsvorwegnahme. Datei: D15b_AUDIT_R6_UNTERRICHTSQUALITAET.md (38 KB, 440 Zeilen).
- **R2 Lehrerin Stadtrealschule/DaZ** (Jasmin Kilic, 42, 17 Jahre, Personas Kenan/Amira/Jannik/Selin): DaZ-Scaffolding, Heterogenitaet, Stadtrealschule-Realitaet. Verdikt: "Ja, mit Vorbereitung und Begleitung" (2h Vorbereitung, Doppelstunde). Unique Findings: DaZ-Glossar-Box fehlt (neutral, Nachschub, befestigt), iPad-Touch-Ergonomie bei Drag-and-Drop problematisch, Trigger-Sensitivitaet fuer Kinder mit Familien aus Kriegsgebieten (Ukraine/Syrien), paraphrasiertes Schlieffen-Zitat nicht als solches gekennzeichnet. Datei: D15b_AUDIT_R2_LEHRERIN_STADT.md (52 KB, 640 Zeilen).
- **R3 Lehrerin Landrealschule/bildungsfern** (Ute Hellermann, 51, 24 Jahre, Ostdeutschland, 19 SuS, Personas Lars/Mandy/Olena/Tobias): bildungsfernes Milieu, alte Laptops, Plan-B-Kultur. Datei: D15b_AUDIT_R3_LEHRERIN_LAND.md (40 KB, 460 Zeilen).

**Phase 3 — Neutraler Synthese-Agent:**
- D15b_MULTI_AUDIT_SYNTHESE_MAPPE4.md: Konsolidiertes Befund-Register. 11 Abschnitte + Anhang A Zitat-Register mit Rollen-Sigeln R1-R6. 45 KB, 631 Zeilen.
- Konvergenz-Klassen:
  - **Klasse A (5-6/6 Konsens):** A1 Sachkorrektheit ok (6/6), A2 Elaborations-Luecke (6/6), A3 DaZ-Scaffolding-Luecke (4-6/6)
  - **Klasse B (4/6 Mehrheit):** B1 Feedback zu schwach (4/6), B2 Differenzierung fehlt (4/6), B3 Motivations-Anker schwach (4/6)
  - **Klasse C (3/6):** C1 Epistemologie/Quellenkritik (3:3 Split)
  - **Klasse D (Dissens):** D1 Digitalisierungs-Angemessenheit (2:4), D2 Tagebuch Friedrich (3:3 "hervorragend" vs. "Trigger-Risiko")
  - **Klasse F (blinde Flecken):** F1 Barrierefreiheit/WCAG, F2 Datenschutz/DSGVO, F3 technische Robustheit unter Last
- Top-10 Handlungsempfehlungen mit Aufwand/Wirkung-Schaetzung
- 3 Umsetzungs-Szenarien: Konservativ (Minimal-Patches) / Moderat (Top-5) / Optimistisch (Top-10 + Infrastruktur)
- QM-Rueckschluesse fuer Generierungs-System: Subagenten-Prompts muessen Multiperspektivitaet + Quellenkritik erzwingen; Feedback-Engine braucht aufgabenspezifische Rueckmeldungs-Slots; DaZ-Glossar-Komponente als Engine-Primitive.

**Methodik-Innovationen (fuer kuenftige Audits):**
- Vollstaendige Rollen-Isolation (kein Session-Kontext, kein Vorwissen, explizite "no prior findings"-Regel in jedem Prompt)
- Text-Primat ueber Screenshots bei Chrome-in-Claude (Overlay-Workaround)
- Inter-Rater-Reliability gewichtet nach theoretischer vs. praktischer Rollen-Distanz (Signal-Staerke)
- Phase 3 ebenfalls in isoliertem Synthese-Agent (keine Orchestrator-Bias)

**Geaenderte/neue Dateien:**
- docs/analyse/D15b_EVIDENZ_BUNDLE_MAPPE4.md (neu)
- docs/analyse/D15b_AUDIT_R1_GESCHICHTSDIDAKTIK.md (neu)
- docs/analyse/D15b_AUDIT_R2_LEHRERIN_STADT.md (neu)
- docs/analyse/D15b_AUDIT_R3_LEHRERIN_LAND.md (neu)
- docs/analyse/D15b_AUDIT_R4_INSTRUCTIONAL_DESIGN.md (neu)
- docs/analyse/D15b_AUDIT_R5_SEMINARLEITER.md (neu)
- docs/analyse/D15b_AUDIT_R6_UNTERRICHTSQUALITAET.md (neu)
- docs/analyse/D15b_MULTI_AUDIT_SYNTHESE_MAPPE4.md (neu)
- docs/projekt/STATUS.md
- docs/projekt/CHANGELOG.md

**Naechster Schritt:** QM-Rueckspeisung der D15b-Befunde in SUB_AUFGABE_*.md / ORCHESTRATOR.md / AGENT_MATERIAL_*.md / Guetekriterien, bevor Mappe 5 produziert wird.

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
