# UPGRADE PLAN v5: Plugin-Architektur fuer Game-Erstellungs-Infrastruktur

**Erstellt:** 2026-04-02
**Ausloeser:** Realgetreuer Produktionstest Mappe 3 offenbarte Architektur-Luecke — ORCHESTRATOR.md ist Dokumentation, keine Runtime-Instanz. Produktionssessions benoetigen Kickoff-Prompts mit Extrakontext, weil kein Mechanismus existiert, der den Prozess selbststaendig steuert.
**Scope:** Evaluation und Roadmap fuer die Transformation der dokumentationsbasierten Orchestrierung in eine plugin-basierte, produktisierbare Game-Erstellungs-Infrastruktur.
**Status:** ENTWURF — Evaluation abgeschlossen, Implementierung offen.

---

## 1. Problemanalyse

### 1.1 Ist-Zustand

Die v4.2-Produktionsarchitektur besteht aus:

- **ORCHESTRATOR.md** (~440 Zeilen): Konzeptuelle Beschreibung des Gesamtprozesses. Wird von keinem Agenten zur Laufzeit gelesen. Definiert Phasen, Agenten-Reihenfolge, data.json-Schema, Uebergabe-Templates.
- **6 Vertraege** (VERTRAG_PHASE_2-X.md, je ~400-650 Token): Deklarative Dispatch-Anweisungen. Werden pro Phase manuell gelesen. Enthalten Read-Schritte, Dispatch-Schritte, Q-Gate-Kriterien.
- **STATUS.md + CHANGELOG.md**: Manuell gepflegte Zustandsmaschine. Kein Agent liest oder schreibt diese automatisch.
- **1 Skill** (projekt-website-v4-2): Monolithische SKILL.md (~22 KB). Enthaelt den gesamten Prozess als Prosa. Wird bei Session-Start geladen und steuert den Modus (STATUS/EXECUTE/UPDATE/AUDIT/REVIEW).
- **1 Plugin** (projekt-website-v4.plugin): ZIP-Archiv mit .claude-plugin/plugin.json + skills/projekt-website-v4/SKILL.md. Buendelt exakt 1 Skill.

### 1.2 Architektur-Luecke

**Kernproblem:** Der ORCHESTRATOR existiert nur als Dokument. Es gibt keine Runtime-Instanz, die:

1. Den naechsten Produktionsschritt automatisch identifiziert
2. Den richtigen Vertrag fuer die aktuelle Phase laedt
3. Die Dispatch-Sequenz erzwingt (nicht nur empfiehlt)
4. Den Session-Split-Zeitpunkt erkennt und den Fortsetzungs-Prompt generiert
5. Q-Gate-Ergebnisse automatisch in Q-GATE-LOG.md persistiert
6. STATUS.md nach jedem Dispatch aktualisiert

**Symptom:** Ein realistischer Produktionstest (frische Cowork-Session, nur Skill + Verzeichnisstruktur, kein Kickoff-Prompt) kann den Prozess nicht selbststaendig durchlaufen. Der Agent weiss nicht, welcher Vertrag als naechstes zu lesen ist, ohne dass ein Mensch oder ein Kickoff-Prompt das vorgibt.

**Konsequenz fuer Skalierbarkeit:** Das Ziel "standardisierte, produkthaft vertreibbare Game-Erstellungs-Infrastruktur" ist mit der aktuellen Architektur nicht erreichbar. Jede neue Lehrkraft braeuchte einen menschlichen Orchestrator (Paul), der die richtige Phase identifiziert und den richtigen Vertrag vorgibt.

### 1.3 Abgrenzung

Dieser Plan adressiert NICHT:

- Engine-Aenderungen (escape-engine.js, CSS, HTML)
- Inhaltsproduktion (Phase 0 — AGENT_DIDAKTIK, AGENT_INHALT, AGENT_SKRIPT)
- Assembly (Phase 3 — bleibt in Claude Code)
- Einzelne Q-Gate-Kriterien oder Subagenten-Prompts

Er adressiert ausschliesslich die **Steuerungsschicht**: Wie wird der Produktionsprozess zur Laufzeit orchestriert?

---

## 2. Cowork-Plugin-Architektur: Moeglichkeiten und Grenzen

### 2.1 Plugin-Struktur

Ein Cowork-Plugin ist ein ZIP-Archiv (.plugin) mit folgender Verzeichnisstruktur:

```
.claude-plugin/
  plugin.json          # Manifest: name, version, description, skills[], agents[], hooks[]
skills/
  skill-a/
    SKILL.md           # YAML-Frontmatter + Prompt-Body
  skill-b/
    SKILL.md
agents/                # Optional: Agent-Definitionen
hooks/                 # Optional: Pre/Post-Hooks
.mcp.json              # Optional: MCP-Server-Konfiguration
```

**Namespacing:** Skills innerhalb eines Plugins werden als `plugin-name:skill-name` adressiert (z.B. `escape-game:rahmen-produktion`).

**Verteilung:** Plugins koennen lokal installiert, ueber Marketplace verteilt, oder als .plugin-Datei im Repository gebundled werden.

### 2.2 Skill-Mechanik

- **Trigger:** Jeder Skill hat eine `description` im YAML-Frontmatter. Cowork matched User-Input gegen diese Beschreibung und aktiviert den Skill automatisch.
- **Aktivierung:** Bei Match wird SKILL.md in den Kontext geladen. Der Skill-Prompt steuert dann das Verhalten.
- **Verkettung:** Ein Skill kann via `Skill`-Tool andere Skills aufrufen. Aber: **Claude entscheidet**, ob der Aufruf erfolgt. Es gibt keine garantierte Ausfuehrungsreihenfolge.
- **Zustandsmanagement:** Kein eingebauter Mechanismus. Zustand muss ueber Dateisystem (STATUS.md, Q-GATE-LOG.md) oder Kontext-Variablen transportiert werden.
- **Kontextfenster:** Jeder Skill-Aufruf addiert seinen SKILL.md-Inhalt zum Kontext. Bei vielen Skills wird der Kontext schnell voll.

### 2.3 Subagenten-Mechanik

- **Aufruf:** Via `Agent`-Tool. Erhaelt isoliertes Kontextfenster.
- **Nesting:** Maximal 1 Ebene. Ein Subagent kann keinen weiteren Subagenten starten.
- **Kommunikation:** Subagent → Parent ausschliesslich via Return-Value oder Dateisystem-Schreiboperationen. Kein bidirektionaler Kanal.
- **Kontext:** Subagent erhaelt NUR den im `prompt`-Parameter uebergebenen Text. Kein Zugriff auf den Parent-Kontext.

### 2.4 Harte Grenzen (nicht loesbar)

| Grenze | Implikation |
|---|---|
| **Kein erzwungenes Sequencing** | Ein Skill kann einen anderen Skill *empfehlen*, aber nicht *erzwingen*. Claude kann die Empfehlung ignorieren. |
| **Kein Nesting** | Ein Subagent kann keinen Subagenten spawnen. Maximal 2 Ebenen (Parent → Child). |
| **Keine Transaktionssemantik** | Kein Rollback bei Fehler. Kein atomares Commit ueber mehrere Dateien. |
| **Kein persistenter State** | Kein Session-uebergreifender Zustand ausser Dateisystem. |
| **Kontextfenster-Limit** | ~200K Token. Monolithische Skills (22 KB SKILL.md) fressen Kontext. |
| **Skill-Trigger ist probabilistisch** | Description-Matching ist heuristisch, nicht deterministisch. |

### 2.5 Weiche Grenzen (mitigierbar)

| Grenze | Mitigation |
|---|---|
| **Soft Chaining** | Skill-Prompt kann mit `## Naechster Schritt`-Sektion enden, die den naechsten Skill-Aufruf stark nahelegt. STATUS.md als State-Machine macht den naechsten Schritt eindeutig. |
| **Kein automatisches STATUS-Update** | Jeder Skill kann als letzte Aktion STATUS.md schreiben. Convention over Configuration. |
| **Kein automatisches Q-Gate-Logging** | In jeden Dispatch-Skill als Pflicht-Schlussschritt einbauen. |
| **Session-Split-Erkennung** | Token-Schaetzung via Dateizaehlung (N Dispatches * ~X Token pro Dispatch). Expliziter Checkpoint in Skill-Prompt. |

---

## 3. Zielarchitektur: escape-game-creator Plugin

### 3.1 Design-Prinzipien

**DP1: State-Machine ueber Dateisystem.** STATUS.md ist die Single Source of Truth fuer den aktuellen Zustand. Jeder Skill liest STATUS.md am Anfang und schreibt STATUS.md am Ende. Kein Skill verlässt sich auf Kontext aus vorherigen Skill-Aufrufen.

**DP2: Ein Skill pro Vertrag.** Jeder VERTRAG_PHASE_2-X.md wird zu einem eigenstaendigen Skill. Der Skill-Prompt enthaelt die Dispatch-Logik imperativ (nicht deklarativ wie im Vertrag).

**DP3: Dispatcher-Skill als Einstiegspunkt.** Ein leichtgewichtiger Dispatcher-Skill liest STATUS.md, identifiziert die naechste Phase und delegiert an den phasenspezifischen Skill. Ersetzt den menschlichen Orchestrator.

**DP4: Kontext-Sparsamkeit.** Kein Skill laedt mehr als seinen eigenen Prompt + die fuer seine Phase noetige Eingabe. ORCHESTRATOR.md wird NICHT geladen.

**DP5: Fail-Safe statt Fail-Silent.** Wenn ein Q-Gate FAIL ergibt, stoppt der Skill und meldet an den User. Kein automatischer Retry, kein Weitermachen.

### 3.2 Skill-Verzeichnis

```
escape-game-creator/
  .claude-plugin/
    plugin.json
  skills/
    dispatcher/
      SKILL.md              # Liest STATUS.md → identifiziert naechste Phase → delegiert
    rahmen-produktion/
      SKILL.md              # Phase 2.0 — ex VERTRAG_PHASE_2-0_RAHMEN.md
    material-produktion/
      SKILL.md              # Phase 2.1 — ex VERTRAG_PHASE_2-1_MATERIAL.md
    material-cross/
      SKILL.md              # Phase 2.1c — ex VERTRAG_PHASE_2-1c_CROSS.md
    progressionsplan/
      SKILL.md              # Phase 2.2a — ex VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md
    aufgaben-produktion/
      SKILL.md              # Phase 2.2b — ex VERTRAG_PHASE_2-2b_AUFGABE.md
    aufgaben-cross/
      SKILL.md              # Phase 2.2c — ex VERTRAG_PHASE_2-2c_CROSS.md
    phase2-abschluss/
      SKILL.md              # Uebergabe-Prompt + Git-Befehle generieren
    session-split/
      SKILL.md              # Fortsetzungs-Prompt generieren bei Token-Limit
```

**Optionale Erweiterungs-Skills (Phase 0/1):**

```
    inhaltliche-vorarbeit/
      SKILL.md              # Phase 0: DIDAKTIK → INHALT → SKRIPT → HEFTEINTRAG
    material-design/
      SKILL.md              # Phase 1: MATERIAL_GERUEST erstellen
```

### 3.3 Dispatcher-Skill (Kern)

Der Dispatcher ist der einzige Skill, der bei jeder Session automatisch getriggert wird. Er ersetzt den menschlichen Orchestrator:

```
## Dispatcher-Logik (Pseudocode)

1. Lies docs/projekt/STATUS.md → extrahiere:
   - aktuelle_phase
   - game_id
   - mappe_nr
   - letzter_schritt
   - naechster_schritt

2. Lies Produktionsverzeichnis:
   - Zaehle Dateien in rahmen/, materialien/, aufgaben/
   - Vergleiche mit MATERIAL_GERUEST (erwartete Anzahl)

2b. Lies Q-GATE-LOG.md (falls vorhanden):
   - Pruefe PASS/FAIL-Status der abgeschlossenen Phasen

3. Bestimme naechsten Skill:
   | Zustand | Naechster Skill |
   |---|---|
   | rahmen/ leer | escape-game-creator:rahmen-produktion |
   | rahmen/ voll, materialien/ < erwartet | escape-game-creator:material-produktion |
   | materialien/ voll, kein Cross | escape-game-creator:material-cross |
   | Cross PASS, kein Progressionsplan | escape-game-creator:progressionsplan |
   | Progressionsplan PASS, aufgaben/ < 5 | escape-game-creator:aufgaben-produktion |
   | aufgaben/ = 5, kein Aufgaben-Cross | escape-game-creator:aufgaben-cross |
   | Aufgaben-Cross PASS | escape-game-creator:phase2-abschluss |

4. Melde dem User:
   "Naechster Schritt: [Phase X.Y] — [Beschreibung]"

5. Rufe naechsten Skill auf via Skill-Tool.
```

### 3.4 Phasen-Skill Aufbau (Muster)

Jeder Phasen-Skill folgt demselben Grundmuster:

```markdown
---
description: "[Trigger-Keywords]"
---

# [Phase-Name]

## Pre-Flight
1. Lies STATUS.md — verifiziere, dass diese Phase an der Reihe ist
2. Lies [spezifische Eingabe-Dateien laut Vertrag]
3. Zaehle existierende Dateien im Produktionsverzeichnis

## Dispatch
[Imperative Dispatch-Logik — konvertiert aus dem deklarativen Vertrag]

## Q-Gate
[Kriterien aus dem Vertrag, mit PASS/FAIL-Logik]

## Post-Dispatch
1. Schreibe Q-Gate-Ergebnis in Q-GATE-LOG.md
2. Aktualisiere STATUS.md:
   - letzter_schritt: [was gerade passiert ist]
   - naechster_schritt: [was als naechstes kommt]
3. Aktualisiere CHANGELOG.md
4. Melde Ergebnis an User
```

### 3.5 Vertraege vs. Skills: Koexistenz

Die Vertraege (VERTRAG_PHASE_2-X.md) werden NICHT geloescht. Sie bleiben als deklarative Architektur-Dokumentation erhalten. Die Skills sind die imperative Runtime-Umsetzung derselben Logik.

```
VERTRAG (deklarativ)          SKILL (imperativ)
"Lies TAFELBILD Mappe N"  →  Read(docs/agents/artefakte/TAFELBILD_{game-id}_Mappe{N}.md)
"Dispatch Schritt 3"      →  Konkreter Prompt an Subagent oder direkte Ausfuehrung
"Q-Gate M3b"              →  If-Bedingung + PASS/FAIL-Entscheidung + Log
```

Autoritaetsregel: Bei Widerspruch zwischen Vertrag und Skill gilt der Vertrag. Der Skill muss aktualisiert werden.

---

## 4. Bewertung: Gewinne und Verluste

### 4.1 Was die Plugin-Architektur loest

| Problem                          | Loesung                                                       |
| -------------------------------- | ------------------------------------------------------------- |
| Menschlicher Orchestrator noetig | Dispatcher-Skill identifiziert naechsten Schritt automatisch  |
| Kickoff-Prompt als Kruecke       | Nicht mehr noetig — Dispatcher liest STATUS.md                |
| Vertrag manuell lesen            | Phasen-Skill laed den richtigen Kontext automatisch           |
| STATUS.md manuell pflegen        | Jeder Skill aktualisiert STATUS.md als Pflicht-Schlussschritt |
| Q-Gate-Ergebnisse vergessen      | In Skill-Prompt als unverzichtbarer Schritt verankert         |
| Monolithischer 22-KB-Skill       | Aufgesplittet in 9 fokussierte Phase-2-Skills (je 1-3 KB)     |
| Nicht portabel                   | Plugin-Format ist installierbar, versionierbar, verteilbar    |

### 4.2 Was die Plugin-Architektur NICHT loest

| Problem | Grund | Mitigation |
|---|---|---|
| Garantierte Sequenz | Soft Chaining — Claude kann abweichen | Dispatcher als Gate-Keeper + STATUS.md als Zustandsbeweis |
| Session-uebergreifender State | Cowork-Sessions sind isoliert | STATUS.md + Dateisystem als persistenter Zustand |
| Automatische Fehler-Recovery | Keine Transaktionssemantik | Fail-Safe: bei FAIL stoppen, nicht weitermachen |
| Phase 3 (Assembly) | Bleibt in Claude Code | Uebergabe-Prompt bleibt als Bruecke |
| Phase 0 Automation | AGENT_INHALT braucht Claude Code (Wikipedia MCP) | Phase 0 bleibt hybrid (Cowork + Claude Code) |

### 4.3 Risiken

**R1: Skill-Proliferation.** 9+ Skills bedeuten 9+ SKILL.md-Dateien zu pflegen. Bei Architektur-Aenderungen (wie M6/M7/M8) muessen alle betroffenen Skills aktualisiert werden.
→ Mitigation: Vertraege bleiben die Single Source of Truth. Skills werden aus Vertraegen abgeleitet. Ein Skill-Generator-Skript kann die Konversion automatisieren.

**R2: Kontextverschwendung.** Wenn der Dispatcher einen Phasen-Skill aufruft, ist bereits der Dispatcher-Prompt im Kontext. Der Phasen-Skill addiert seinen eigenen Prompt. Bei Weiterverkettung waechst der Kontext.
→ Mitigation: Dispatcher-Skill minimalistisch halten (~500 Token). Phasen-Skills lesen NUR die fuer ihre Phase relevanten Dateien.

**R3: Trigger-Kollisionen.** Mehrere Skills koennten auf denselben User-Input matchen.
→ Mitigation: Dispatcher ist der primaere Trigger. Phasen-Skills werden NUR via Skill-Tool aufgerufen, nicht via User-Input-Matching.

**R4: Divergenz Vertrag ↔ Skill.** Wenn ein Vertrag aktualisiert wird, aber der zugehoerige Skill nicht.
→ Mitigation: Versionsnummer in Skill-Frontmatter, die auf Vertrags-Version referenziert. Audit-Prueffrage: "Stimmen Vertrag und Skill ueberein?"

---

## 5. Implementierungs-Roadmap

### Phase A: Proof-of-Concept (1-2 Cowork-Sessions)

**Ziel:** Dispatcher + 1 Phasen-Skill (rahmen-produktion) funktionieren im Zusammenspiel.

| Schritt | Aufgabe | Output |
|---|---|---|
| A1 | Dispatcher-Skill schreiben | skills/dispatcher/SKILL.md |
| A2 | Rahmen-Produktion-Skill aus VERTRAG_PHASE_2-0 ableiten | skills/rahmen-produktion/SKILL.md |
| A3 | plugin.json erstellen | .claude-plugin/plugin.json |
| A4 | Test: Frische Session, nur Plugin installiert, Mappe 3 Phase 2.0 ausfuehren | Q-Gate PASS fuer rahmen/ |
| A5 | Evaluation: Hat der Dispatcher den richtigen Skill aufgerufen? Hat der Skill die richtigen Dateien gelesen? Stimmen die Outputs? | Eval-Bericht |

**Erfolgskriterium:** Phase 2.0 (Rahmen) laeuft OHNE Kickoff-Prompt, OHNE ORCHESTRATOR.md-Lektuere, NUR mit Dispatcher + Phasen-Skill + Produktionsverzeichnis.

### Phase B: Vollstaendige Phase-2-Abdeckung (2-3 Cowork-Sessions)

**Ziel:** Alle 7 Phasen-Skills + Session-Split funktionieren.

| Schritt | Aufgabe | Output |
|---|---|---|
| B1 | Verbleibende 6 Phasen-Skills aus Vertraegen ableiten | 6 SKILL.md |
| B2 | Session-Split-Skill schreiben | skills/session-split/SKILL.md |
| B3 | Phase-2-Abschluss-Skill schreiben | skills/phase2-abschluss/SKILL.md |
| B4 | Volltest: Mappe 3 komplett ueber Phase 2 | Alle JSONs in Produktionsverzeichnis |
| B5 | Evaluation + Korrekturschleife | Optimierte Skills |

### Phase C: Plugin-Packaging + Portabilitaet (1 Session)

**Ziel:** Plugin als .plugin-Datei, installierbar in beliebigem Cowork-Space.

| Schritt | Aufgabe | Output |
|---|---|---|
| C1 | Plugin-Manifest finalisieren | plugin.json mit allen Skills |
| C2 | Build-Skript fuer .plugin-Erstellung | build-plugin.sh |
| C3 | Portabilitaets-Test: Neuer Cowork-Space, Plugin installieren, Mappe 4 starten | Funktionsnachweis |
| C4 | Dokumentation: README.md fuer Plugin-Installation und -Nutzung | README.md |

### Phase D: Phase-0/1-Integration (optional, spaeter)

**Ziel:** Phase 0 und Phase 1 als Skills im Plugin. Vollstaendige Game-Erstellung ueber ein Plugin.

| Schritt | Aufgabe | Output |
|---|---|---|
| D1 | Inhaltliche-Vorarbeit-Skill (Phase 0.1-0.4) | SKILL.md |
| D2 | Material-Design-Skill (Phase 1.1) | SKILL.md |
| D3 | Claude-Code-Bruecke fuer Phase 0.2 (Wikipedia MCP) | Uebergabe-Prompt-Generator |
| D4 | End-to-End-Test: Neues Game von Grund auf | Funktionsnachweis |

---

## 6. Architektur-Entscheidungen (offen)

### E1: Dispatcher-Trigger vs. expliziter Aufruf

**Option A:** Dispatcher wird automatisch getriggert bei jedem User-Input, der game-bezogen ist (wie der aktuelle monolithische Skill).
**Option B:** Dispatcher wird explizit via `/escape-game` oder `weitergehts.online` aufgerufen.
**Empfehlung:** Option A fuer Phase A/B (Komfort). Ueberpruefen ob Trigger-Konflikte auftreten.

### E2: Subagenten fuer Material-Dispatches

**Option A:** Material-Produktion-Skill fuehrt Dispatches direkt aus (im selben Kontext).
**Option B:** Material-Produktion-Skill spawnt Subagenten fuer jeden Dispatch.
**Empfehlung:** Option A fuer Mappe 3 (weniger komplex). Option B evaluieren wenn Kontextfenster-Limit ein Problem wird.

### E3: Vertrag-zu-Skill-Konversion: manuell vs. generiert

**Option A:** Jeder Skill wird manuell aus dem Vertrag geschrieben.
**Option B:** Ein Generator-Skript konvertiert Vertraege automatisch in Skill-Prompts.
**Empfehlung:** Option A fuer Phase A (Verstaendnis aufbauen). Option B evaluieren ab Phase C wenn sich das Muster stabilisiert hat.

### E4: Verhaeltnis zum bestehenden monolithischen Skill

**Option A:** Monolithischer Skill wird durch Plugin ersetzt (hard cutover).
**Option B:** Monolithischer Skill bleibt als Fallback. Plugin ergaenzt.
**Empfehlung:** Option B fuer Phase A/B. Option A ab Phase C wenn Plugin stabil ist.

### E5: STATUS.md-Format

**Option A:** Freitext-Markdown (aktuelles Format).
**Option B:** Maschinenlesbares YAML/JSON im Frontmatter + Freitext-Body.
**Empfehlung:** Option B ab Phase A. Dispatcher muss STATUS.md zuverlaessig parsen. YAML-Frontmatter ist robust und bleibt menschenlesbar.

Vorgeschlagenes Format:

```yaml
---
game_id: gpg-erster-weltkrieg-ursachen
aktuelle_mappe: 3
aktuelle_phase: "2.0"
letzter_schritt: "Phase 1 abgeschlossen — MATERIAL_GERUEST erstellt"
naechster_schritt: "Phase 2.0 Rahmen-Produktion"
blocker: []
rahmen_dateien: 0
materialien_dateien: 0
aufgaben_dateien: 0
erwartete_materialien: 5
session_token_schaetzung: 0
---
# Projektstatus: Interaktive Unterrichtsmaterialien -- weitergehts.online
[... Freitext wie bisher ...]
```

---

## 7. Abhaengigkeiten und Voraussetzungen

### 7.1 Vor Phase A

- [ ] Mappe 3 Phase 0 + Phase 1 Artefakte committen (TAFELBILD_Mappe3, MATERIAL_GERUEST_Mappe3, Produktionsverzeichnis, UEBERGABE_COWORK)
- [ ] Entscheidung E1-E5 treffen (User-Validierung)
- [ ] Aktuellen monolithischen Skill sichern (Snapshot)

### 7.2 Vor Phase B

- [ ] Phase A Eval-Bericht zeigt keine Blocker
- [ ] Dispatcher-Skill ist stabil (kein Fehl-Routing)

### 7.3 Vor Phase C

- [ ] Mappe 3 ist komplett ueber Plugin produziert (End-to-End)
- [ ] Alle Q-Gates PASS
- [ ] Plugin-Build-Prozess dokumentiert

---

## 8. Verhaeltnis zu bestehenden Dokumenten

| Dokument | Rolle nach v5 |
|---|---|
| ORCHESTRATOR.md | Bleibt als Architektur-Dokumentation. Wird NICHT zur Laufzeit gelesen. |
| VERTRAG_PHASE_2-X.md | Bleiben als deklarative Spezifikation. Skills werden aus ihnen abgeleitet. Bei Widerspruch gilt Vertrag. |
| WORKFLOW_v4.md | Bleibt als kanonische Referenz. Keine Aenderungen. |
| UPGRADE_PLAN_v4.md | Bleibt. Dieses Dokument (v5) ist das Nachfolge-Upgrade-Plan. |
| STATUS.md | Wird um YAML-Frontmatter erweitert (E5). Bleibt menschenlesbar. |
| Monolithischer Skill | Bleibt als Fallback bis Phase C. Wird dann durch Plugin ersetzt. |
| Subagenten (SUB_MATERIAL_*, SUB_AUFGABE_*) | Werden von Phasen-Skills referenziert (als Dispatch-Prompts). Keine Aenderung an den Subagenten selbst. |

---

## 9. Zusammenfassung

Die v4.2-Architektur hat eine funktionale, qualitaetsgesicherte Produktionspipeline geschaffen. Die Luecke ist die Steuerungsschicht: Der Prozess wird durch Dokumentation beschrieben, aber durch Menschen gesteuert. Das verhindert Skalierung und Portabilitaet.

Die Plugin-Architektur schliesst diese Luecke durch:

1. **Dispatcher-Skill** als automatischer Orchestrator (ersetzt menschliche Phasen-Identifikation)
2. **Phasen-Skills** als imperative Umsetzung der Vertraege (ersetzt manuelles Vertrag-Lesen)
3. **STATUS.md mit YAML-Frontmatter** als maschinenlesbare Zustandsmaschine (ersetzt Freitext-Interpretation)
4. **Plugin-Packaging** als Verteilungsformat (ermoeglicht Installation in beliebigen Cowork-Spaces)

Die harten Grenzen der Plattform (kein erzwungenes Sequencing, kein Nesting, keine Transaktionssemantik) werden durch Convention-over-Configuration mitigiert: STATUS.md als State-Machine, Fail-Safe bei Q-Gate-FAIL, Vertraege als Single Source of Truth.

Die Implementierung erfolgt inkrementell: PoC mit Dispatcher + 1 Skill (Phase A) → vollstaendige Phase-2-Abdeckung (Phase B) → Plugin-Packaging (Phase C) → optionale Phase-0/1-Integration (Phase D).
