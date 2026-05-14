# BEFUND M6.1 — Kompatibilitäts-Diagnose `verlauf-erster-weltkrieg-marne-ende`

**Erstellt:** 2026-05-14 (Code-Mode, post-M5-Release v0.5.5)
**Sprint-Kontext:** M6 Stufe 1/3 — Pre-Run-Audit, reine Analyse, KEIN Plugin-Run
**Ziel:** Format-Bruch präzise dokumentieren + Plugin-Command-Kompatibilität gegen den Ist-Zustand prüfen + D-CM-3 (Phase-0-JSON-Backfill vs. generate-game-komplett) entscheiden.
**Plugin-Version:** v0.5.5 (`escape-game-generator-plugin`, Tag `v0.5.5` @ `efb2707`)
**Bezugsquelle:** `HANDOFF_CODE_MODE.md §3 (M6)`, `STATUS.md §Aktiver Game-Run`.

---

## 1. Game-Ist-Zustand

```
Game-ID:           verlauf-erster-weltkrieg-marne-ende
Erzeugt:           2026-04-09 (Phase-0/0.4/1.1) bis 2026-04-16 (Phase-2-Beginn Mappe 1)
Gesamt-Mappen:     4 geplant
Live-Status:       Mappe 1 deployed (5 Materialien, 7 Aufgaben, ohne DIFF, ohne Hefteintrag, ohne Mappenabschluss-Zone in data.json)
State:             PRODUKTION_PHASE_2_MAPPE_2 (Cowork-State-Machine, eingefroren)
PI-Snapshot:       PROJECT_INSTRUCTIONS_SNAPSHOT.md (28K, Cowork-Format)
```

**Live data.json (`weitergehts-online/escape-games/verlauf-erster-weltkrieg-marne-ende/data.json`):** 886 Zeilen, Schema-Familie `data_v3` (Pre-DIFF), Top-Level-Keys `mappen` + `meta`, 1 Mappe mit `materialien`/`aufgaben`/`einstieg`/`sicherung` (KEIN `hefteintrag`, KEIN `mappenabschluss` in der serialisierten Form).

---

## 2. Artefakt-Inventar — was tatsächlich existiert

### 2.1 MD-Artefakte (Phase 0/1, Pre-JSON-Generator-Architektur)

| Datei | Bytes | Erzeugt | Phase | Inhalt |
|---|---|---|---|---|
| `DIDAKTIK_RAHMEN_*.md` | 20 869 | 2026-04-09 | 0.1 | Lehrplanbezug + KE-Matrix + Lernziele + Mappen-Tabelle + Narrativ-Rahmen — strukturierte Tabellen, ENTWURF-Status |
| `INHALTSBASIS_*.md` | 63 531 | 2026-04-09 | 0.2 | 16 Wikipedia-Artikel ausgewertet + Inhaltslücken-Tabelle + Schlüssel-Fakten + Quellen-Pin-Block — VALIDIERT |
| `SKRIPT_*.md` | 33 155 | 2026-04-09 | 0.3 | 4 Chunks (Stellungskrieg / Heimatfront / Revolution / Versailles) mit `[ARTEFAKT: id \| typ \| beschreibung]`-Markern — PASS Format-Validierung |
| `TAFELBILD_*_Mappe{1..4}.md` | 6-7K je | 2026-04-09 | 0.4 | Hefteintrag-SCPL-Tafelbild mit eingebettetem **JSON-Repräsentations-Block** — VALIDIERT, STRUKTUR-FREEZE aktiv |
| `MATERIAL_GERUEST_*_Mappe{1..4}.md` | 17-21K je | 2026-04-09 | 1 (Design) | Material-Tabellen mit ID/Typ/Titel/SCPL-Zone/Artefakt-Ref/Quelle/W-Budget — Planning-Dokumente, ENTWURF |
| `PROJECT_INSTRUCTIONS_SNAPSHOT.md` | 28 067 | 2026-04-12 | — | Cowork-State-Machine-Snapshot, NICHT Plugin-State-Format |
| `Q-GATE-LOG_PHASE_3.md` | 6 159 | 2026-04-10 | — | Cowork-Q-Gate-Log, Phase 3 — beim Plugin-State irrelevant |

**Beobachtung:** Alle MD-Artefakte sind in semantisch strukturierter Form (Tabellen, Marker, Frontmatter). Mechanische MD→JSON-Extraktion ist möglich, aber kein Tool im Plugin v0.5.5 macht das. `TAFELBILD_*_Mappe*.md` enthält bereits **eingebettete JSON-Repräsentation** (im `## JSON-Repräsentation`-Code-Block) — das wäre eine Quelle für `hefteintrag.json`-Backfill ohne Re-Interpretation.

### 2.2 JSON-Artefakte (Phase-2-Outputs, Schema-konform)

| Datei | Schema-Fit | Anmerkung |
|---|---|---|
| `mappe-1/materialien/mat-1-{1..5}.json` | `material_quellentext_v3.10.4.json` / `material-output-schema.json` | 5 Materialien (1 bildquelle, 2 tagebuch, 1 darstellungstext, 1 quellentext) — voll strukturiert, mit `_meta.artefakt_ref`/`erschliessungsimpuls`/`tafelbild_knoten_abgedeckt`/`trigger_flags`/`perspektive` |
| `mappe-1/rahmen/{einstieg,sicherung,hefteintrag,mappenabschluss_zone,meta}.json` | jeweiliges Schema | 5 Rahmen-Files — vollständig |
| `mappe-1/Q-GATE-LOG.md`, `PROGRESSIONSPLAN.md` | n/a | Cowork-Workflow-Spuren |
| `mappe-2/materialien/mat-2-1.json` | `material_quellentext_v3.10.4.json` | PARTIELL — Phase-2.1 wurde hier abgebrochen |

**Beobachtung:** **Phase-2 ist JSON, Phase-0/1 ist MD.** Der Format-Bruch verläuft präzise zwischen den Phasen, nicht durchgehend.

### 2.3 JSON-Artefakte FEHLEND (Plugin v0.5.5 erwartet sie)

| Erwartete Datei | Schema | Recoverbar aus | Aufwand |
|---|---|---|---|
| `didaktisches_konzept.json` / `didaktik_rahmen.json` | `schemata/didaktik_rahmen.schema.json` | DIDAKTIK_RAHMEN.md (Tabellen) | niedrig (mechanisch) |
| `inhalts_briefing.json` | `schemata/inhalts_briefing.schema.json` | INHALTSBASIS.md (16 Wiki-Artikel, Schlüssel-Fakten, material_kandidaten) | mittel (Pflicht-Felder `event_date`/`aeusserungs_datum` pro Schlüssel-Fakt erfordern Hand-Annotation) |
| `mappen_aufteilung.json` | (kein eigenes Schema gefunden) | DIDAKTIK_RAHMEN.md `MAPPEN`-Tabelle | niedrig |
| `mappe-{1..4}/rahmen/hefteintrag.json` | `schemata/hefteintrag-schema.json` | TAFELBILD_*_Mappe*.md `JSON-Repräsentation`-Block | trivial (Copy-Paste, struktur-frozen) — bereits für Mappe 1 vorhanden |
| `artefakt_inventar.json` | `schemata/artefakt_inventar.schema.json` | SKRIPT.md `[ARTEFAKT:...]`-Marker + MATERIAL_GERUEST-Tabellen | mittel (Pflicht-Felder `anker_briefing`/`tafelbild_knoten`/`tipp_stufen_slot` pro Material erfordern Cross-Mapping) |
| `medien_katalog_game.json` | `schemata/medien_katalog.schema.json` | INHALTSBASIS Wiki-Liste, aber Wikimedia-Commons-Dual-Kanal-Verifikation (Q-MEDIEN-PROSPEKTIV) ist NICHT durchgeführt | hoch (Wikimedia-Recherche mit Quellenkritik-Block + `aufnahme_datum`-Pflicht + `lizenz_inventar`-Naming-Strict — > 50 Bilder zu prüfen) |
| `game_state.json` | `schemata/game_state.schema.json` | n/a (würde Plugin selbst generieren) | trivial — entsteht im Plugin-Run automatisch |

---

## 3. Plugin-Command-Kompatibilitäts-Matrix (v0.5.5 gegen Ist-Zustand)

| Command | Verlangt | Ist-Zustand | Verdikt |
|---|---|---|---|
| **`/escape-game-generator:generate-game [thema] [jgst] [mappen-anzahl]`** | Phase-0-Start, keinerlei Vorbedingungen außer Lehrplan-Anker-Path | Phase-0-MD existiert, Plugin würde aber NICHT konsumieren (kein Onboarding-Pfad), würde Phase-0-JSON selbst erzeugen | **OK** — sauberer Pfad, schreibt jetzt in Sandbox (M5 v0.5.5), Live-State unangetastet |
| **`/escape-game-generator:generate-mappe [game-id] [mappe-n]`** | `didaktisches_konzept.json` + `mappen_aufteilung.json` + `inhalts_briefing.json` in `{{TARGET_PATH}}/docs/agents/artefakte/<game-id>/` | ALLE 3 FEHLEN | **BLOCKIERT** — kein direkter Pfad ohne Backfill |
| **`/escape-game-generator:migrate-legacy [path]`** | Material-JSON v3.10.x | Material-JSON in Mappe-1 ist bereits ≥ v3.10.4 (Erzeugt 2026-04, post-v3.10.4-Schwelle) | **NICHT ANWENDBAR** — keine Legacy-v3.10.2/3-Drift zu fixen. Es gibt KEINEN MD→JSON-Onboarding-Pfad |
| **`/escape-game-generator:resume-state`** | `game_state.json` (primär) oder PI-Zustandsblock (Fallback) | KEIN `game_state.json` existiert. `PROJECT_INSTRUCTIONS_SNAPSHOT.md` ist Cowork-Format, NICHT Plugin-State-Mirror | **NICHT ANWENDBAR** — falscher State-Schema, Glob würde nichts finden |
| **`/escape-game-generator:audit-game [game-id] [ra-set]`** | Existierende Phase-Outputs aller Phasen | Mappe-1 Phase-2-Outputs ✓ + Live data.json ✓; Phase-0-JSONs FEHLEN | **TEILWEISE** — RA3 (Engine/Assembly) + RA4 (Medien — soweit Lizenz-Daten aus mat-1-1.json kommen) + RA5 (PM-Pflege) durchführbar. RA1 (Pipeline + Verträge) + RA2 (Didaktik) FAIL wegen Phase-0-JSON-Lücke |
| **`/escape-game-generator:validate-game [game-id]`** | Phase-2-Source (materialien/) + Phase-3-Deploy (escape-games/data.json) | beide vorhanden | **OK** für Mappe 1. Source-Deploy-Parity Q-Gate könnte ohne `data.json`-Hefteintrag/Mappenabschluss WARN/FAIL melden. Mappe 2-4: nicht anwendbar (keine Materialien). |

**Zusammenfassung:** Von 6 Commands ist nur `generate-game` ein sinnvoller Eintrittspunkt für M6.2. `validate-game` und `audit-game` (partial) sind als Diagnose-Helpers nützlich, ändern aber nichts.

---

## 4. Decision-Punkt D-CM-3 — Phase-0-JSON-Backfill vs. `generate-game`-komplett

### Option A: Phase-0-JSON-Backfill (manueller Hack)

**Vorgehen:** MD-Artefakte mechanisch + per Hand in JSON umwandeln (`didaktik_rahmen.json`, `inhalts_briefing.json`, `mappen_aufteilung.json`, `medien_katalog_game.json`, `artefakt_inventar.json`, `hefteintrag.json` pro Mappe). Dann `generate-mappe` für Mappe 2 isoliert.

**Pro:**
- Substanz aus April-Iteration bleibt erhalten (KE-Matrix, Schlüssel-Fakten, Multiperspektivität)
- Isolierter Test von `generate-mappe` (Phase-2.0+ Material/Aufgaben/Mappenabschluss)
- Kürzerer Plugin-Run (nur 1 Mappe)

**Contra:**
- **Hochaufwändig**: `inhalts_briefing.json` mit F-PB-38-Pflicht (`event_date` pro Schlüssel-Fakt + `aeusserungs_datum` pro Zitat) und `medien_katalog_game.json` mit F-PB-37 Quellenkritik + F-PB-39 Aufnahmedatum sind Hand-Arbeit über zig Datensätze. Geschätzt 1.5-2 PT.
- **Wegwerf-Arbeit**: Da S4 das Spiel ohnehin **DIFF-konform neu** generieren wird (siehe HANDOFF §5), wird der Backfill im S4-Schritt komplett überschrieben. Die einzige permanente Nutzung wäre der M6.2-Test selbst.
- **Schema-Drift-Risiko**: Die manuelle Konstruktion läuft Gefahr, F-PB-Findings (38/40/41/42/45/46/49) zu verletzen, was zu Schema-Validate-FAIL gegen die Plugin-Hooks führt — dann ist es genau dasselbe Debug-Theater wie generate-game-komplett, nur ohne Plugin-Pipeline-Test
- **Testet nur einen Teil**: Backfill isoliert Phase 2, gibt aber kein Signal über Phase-0-Pipeline-Funktionalität, die für andere Spiele relevant ist

### Option B: `generate-game`-komplett ab Phase 0 (Cowork-PM-Tendenz)

**Vorgehen:** Plugin v0.5.5 `/escape-game-generator:generate-game` für Thema "Verlauf des Ersten Weltkriegs ab Marne bis Ende", R7 Mittelschule Bayern, Basis, ab Phase 0, self-sustained. Output landet in Sandbox.

**Pro:**
- **Testet die volle Pipeline** (Phase 0.1 → 2.2c) — maximales Befund-Surface für M6.3
- **Keine Wegwerf-Hand-Arbeit** — Plugin macht alles selbst (Ziel von M6: Status-quo der Plugin-Funktionalität messen)
- **Sandbox-Isolation** (v0.5.5 M5-Feature) — Live-State von Mappe 1 wird NICHT überschrieben, kein Risiko für die Live-Site
- **Direkter Reuse in S4**: Wenn der M6.2-Run hinreichend gut wird, kann er als Basis für S4 (DIFF-Re-Run) dienen (per HANDOFF §5 D-CM-3-Pfadübernahme — Phase-0-JSON ist dann aus M6.2 vorhanden)
- **Alt-MD-Artefakte werden zum Qualitäts-Benchmark** (M6.3 Achse 2) — sie sind nicht verloren, sondern werden gegen Plugin-Output gestellt

**Contra:**
- Plugin könnte in Phase 0.2 (Inhalt) oder 0.2.M (Medien) auf nicht-recherchierte Themen treffen → längerer Run als bei Backfill
- Höherer Token-Verbrauch (volle Phase-0-Generierung) — ABER auch in S4 zu zahlen, hier doppelt zu testen
- Plugin-Pipeline ist v0.5.5 — kann v.a. an Phase-0.2 (Wikipedia-MCP) oder Phase-0.2.M (Wikimedia-Commons-MCP) hängen bleiben falls **I-3** (node/npm) nicht gelöst — siehe Pre-Condition M6-P2

### Entscheidung: **Option B — `generate-game`-komplett**

**Begründung:**
1. **Wegwerf-Arbeit vermeiden**: Backfill würde 1.5-2 PT Hand-Arbeit kosten, die in S4 sofort obsolet wird. Schlechter Aufwand-Nutzen.
2. **Status-quo-Surface maximieren**: M6 misst Plugin-Funktionalität. Der Backfill-Test misst nur die Phase-2-Pipeline; der Vollrun misst Phase 0+1+2 inklusive Recherche-Agents (AGENT_INHALT, AGENT_MEDIENRECHERCHE) — wo die F2-Run-5 fiktive-Lehrplan-Anker-Befunde aufgetreten waren, also relevant für die S1-Roadmap.
3. **Sandbox eliminiert Risiko**: v0.5.5 Sandbox-Staging entwertet das "Was-wenn-Plugin-überschreibt-Live"-Argument für Backfill. Die Trennung Plugin-Output ↔ TARGET ist hart.
4. **Cowork-PM-Tendenz bestätigt**: User-Briefing nennt diese als bevorzugt; die MD-Artefakt-Vollständigkeits-Prüfung zeigt keinen technischen Vorteil für Backfill.
5. **MD-Artefakte sind Benchmark, nicht Verlust**: M6.3 Achse 2 vergleicht Plugin-Output gegen die Alt-MD-Artefakte. Substanz aus April bleibt als Maßstab erhalten.

**Konsequenz:** Bei M6.2 startet ein `/escape-game-generator:generate-game "verlauf des ersten weltkriegs ab marne bis ende" 7c 4` (oder gleichwertige Argumente — exakter Aufruf in M6.2-Plan zu fixieren). Pre-Conditions M6-P1 (Plugin im Code-Mode lauffähig) + M6-P2 (I-3 node/npm) müssen erfüllt sein. Live-Mappe-1 wird NICHT angetastet.

---

## 5. M6.2 Pre-Conditions — Risiko-Status

| ID | Pre-Condition | Status | Maßnahme |
|---|---|---|---|
| **M6-P1** | Plugin im Code-Mode ausführbar (z.B. via `claude --add-dir plugin-source/` oder lokaler Plugin-Install) | OFFEN (in dieser Session ist Plugin nicht via `--add-dir plugin-source/` mounted; nur das Submodule-File-System ist sichtbar) | Vor M6.2 verifizieren: `/escape-game-generator:*`-Trigger erkannt? |
| **M6-P2 (I-3)** | node/npm auf Host (MediaWiki-MCP) | OFFEN — `brew install node` noch nicht ausgeführt | Vor M6.2: entweder Node installieren ODER WebFetch-Fallback aktivieren (Plugin-Manifest `optionalMcpServers.wikimedia-commons.fallback`) |
| Live-Site (Mappe 1) | Plugin schreibt in Sandbox → kein Konflikt | OK (M5 v0.5.5 garantiert) | — |
| Lehrplan-Anker-Pfad | `Unterrichtseinwicklung/7c/Input_Artefake/Lehrplan/GPG_R7/Fachlehrplan_GPG_R7.md` | NICHT verifiziert in dieser Session (UEW-Path nicht mounted) | M6.2-Pre-Flight: `--add-dir Unterrichtseinwicklung/` ergänzen |

---

## 6. Beobachtungen für S1 (DIFF-Integration) — Vorab-Befunde

Aus der M6.1-Diagnose ergeben sich bereits drei Beobachtungen, die für S1 (HANDOFF §4) relevant sind und in M6.3 weitergeführt werden:

1. **Phase-0-MD→JSON-Onboarding fehlt im Plugin v0.5.5.** Ein Plugin-Command (z.B. `onboard-legacy`) der Markdown-Pre-JSON-Artefakte konsumiert + JSON-Output schreibt, würde Legacy-Game-Recovery ermöglichen. **I-7 Roadmap-Issue** ist in HANDOFF §3 angerissen.
2. **`migrate-legacy` ist zu eng definiert.** Aktuell macht es nur v3.10.x→v3.10.4 Schema-Modernisierung. Eine Generalisierung auf "Legacy-Game-Onboarding" (MD-Phase-0 → JSON) wäre konsistent mit der `legacy`-Terminologie.
3. **Live data.json hat strukturelle Lücken:** kein `hefteintrag`-Block, kein `mappenabschluss`-Block (nur `einstieg` + `sicherung`). DIFF v0.6.0 muss diese Mappe-1-Lücken in S4 retrofitten.

---

## 7. Acceptance-Criteria-Bilanz M6.1

| AC | Erfüllt? | Stelle |
|---|---|---|
| M6.1 Kompatibilitäts-Befund dokumentiert | ✓ | §1-§3 |
| D-CM-3 entschieden + begründet | ✓ | §4 |
| MD-Artefakt-Vollständigkeit erfasst | ✓ | §2.1 + §2.3 (Soll-Ist-Differenz) |
| Plugin-Command-Matrix | ✓ | §3 |
| S1-Pre-Befunde gesammelt | ✓ | §6 |

---

## 8. Nächste Schritte (M6.2-Pre)

1. M6.2-Plan vorlegen (Aufruf-Details + Pre-Conditions abschließen)
2. Pre-Conditions M6-P1 + M6-P2 lösen
3. `--add-dir`-Setup für Code-Mode (Plugin-Source + TARGET + UEW)
4. `generate-game`-Aufruf in Sandbox
5. M6.3 Evaluation auf Basis Sandbox-Output

---

**Referenzen:**
- `escape-game-generator/docs/projekt/plugin-migration/HANDOFF_CODE_MODE.md §3` — M6-Spezifikation
- `escape-game-generator/docs/projekt/STATUS.md §Aktiver Game-Run` — Game-State-Anker
- `escape-game-generator-plugin/schemata/{didaktik_rahmen,inhalts_briefing,artefakt_inventar,medien_katalog,hefteintrag}.schema.json` — v0.5.5 Vertrags-Schemata
- `escape-game-generator-plugin/commands/{generate-game,generate-mappe,migrate-legacy,validate-game,audit-game,resume-state}.md` — Plugin-Command-Source
- `weitergehts-online/escape-games/verlauf-erster-weltkrieg-marne-ende/data.json` — Live-Deploy-State Mappe 1
