# R0.2 — Umlaut-Fragetyp-Forensik

**Datum:** 2026-04-11
**Arbeitspaket:** UPGRADE_PLAN_v3-12 §2 Runde 0 Arbeitspaket 2 (Umlaut-Fragetyp-Identifikation)
**Gate-Bezug:** G-0-2
**Input:** BEFUND_LIVE_SICHTUNG_G2_M1_2026-04-10 (F-LS-M1-07, F-LS-M1-08), SCOPING_v3-12 §2 Hypothese F-07 ("zwei Fragetypen ohne Umlaut-Fix")

---

## 1. Zusammenfassung

Die Scoping-Hypothese "zwei Fragetypen ohne Umlaut-Fix" ist **falsifiziert**. Forensik zeigt **drei** Fragetypen mit fehlendem oder defektem Umlaut-Fix und ein weiterer Fragetyp mit nominal vorhandenem Fix, der dennoch ASCII-Transliterationen im Live-Output produziert hat. Der Umlaut-Bug ist kein reiner Propagations-Bug (wie in Runde 1 angenommen), sondern hat eine Generations-Disziplin-Komponente, die reine Template-Saeuberung nicht schliesst.

**Konsequenz fuer Runde 1 Umlaut-Retrofit-Scope:** Retrofit trifft drei, nicht zwei Fragetypen. Der UTF-8-Checker (O-07-U-B) wird zum eigentlichen Schutzmechanismus — Template-Saeuberung allein reicht nicht.

---

## 2. Methodik

**Quelle:** `escape-game-generator/agents/SUB_AUFGABE_*.md` (8 Dateien), `escape-game-generator/architektur/Q-GATE-MECHANIK.md`.

**Kriterien pro Sub-Agent:**

1. **Umlaut-Generation-Regel vorhanden?** — Explizite Anweisung in der Agenten-Datei, bei der Generierung UTF-8-Umlaute (ä/ö/ü/ß) statt ASCII-Transliterationen (ae/oe/ue/ss) zu schreiben. Pflicht-Anker ist der Block "JSON-Encoding-Regeln".
2. **IL-1 JSON-Validierung (v4.0) vorhanden?** — Explizite Pflicht-Sektion "JSON-Validierung (PFLICHT v4.0 — IL-1)" mit Python-Validierungsbefehl.
3. **Beispiele konsistent mit der Regel?** — Die in der Regel genannten Beispiele sind tatsaechlich UTF-8, nicht selbst ASCII-Transliterationen.
4. **Live-Game-Spur vorhanden?** — Kommt der Fragetyp in einem Live-Game vor, der dokumentierten Bug-Befund ausgeloest hat?

**Verifikation:** Grep auf `Umlaut`, `IL-1`, `JSON-Validierung` in allen acht SUB_AUFGABE_-Dateien. Abgleich mit Marne-Live-Befund (aufgabe-1-6 typ=begruendung, aufgabe-1-7 typ=freitext-code) und Marne data.json Rohinhalt.

---

## 3. Matrix

| Sub-Agent | Typ-Name | Umlaut-Generation-Regel | IL-1 JSON-Validierung | Beispiele konsistent | Live-Befund |
|---|---|---|---|---|---|
| SUB_AUFGABE_MC | multiple-choice | GRUEN (v3.3 Block, UTF-8-Beispiele) | GRUEN (v4.0 IL-1) | GRUEN | — |
| SUB_AUFGABE_LUECKENTEXT | lueckentext | GRUEN | GRUEN | GRUEN | — |
| SUB_AUFGABE_ZUORDNUNG | zuordnung | GRUEN | GRUEN | GRUEN | — |
| SUB_AUFGABE_REIHENFOLGE | reihenfolge | GRUEN | GRUEN | GRUEN | — |
| SUB_AUFGABE_FREITEXT | freitext-code | GRUEN (Zeile 322) | GRUEN (Zeile 325) | GRUEN | **ROT** (Marne M1 aufgabe-1-7: `ueberlebt`, `Schuetzengraben`, `Stellungskrieg`, `Materialschlacht`) |
| SUB_AUFGABE_BEGRUENDUNG | begruendung | **ROT** — keine Generation-Regel, nur Fuzzy-Check-Hint "(fuzzy, Umlaut-tolerant)" Zeile 193 | **GELB** — hat "JSON-Validierung (PFLICHT)" ohne v4.0/IL-1-Marker | n/a | **ROT** (Marne M1 aufgabe-1-6: `traegt`, `Generaele`, `Begruende`, `ausbluten`, `schickten`, `suchten`, `toeteten`) |
| SUB_AUFGABE_VERGLEICH | vergleich | **ROT** — keine Generation-Regel, nur Fuzzy-Check-Hints (Zeile 67, 198) | **GELB** — "JSON-Validierung (PFLICHT)" ohne v4.0/IL-1-Marker | n/a | — (in G1 1x vorhanden, nicht sichtungsauffaellig) |
| SUB_AUFGABE_QUELLENKRITIK | quellenkritik | **ROT** — Block "v3.3 JSON-Encoding-Regeln" existiert (Zeile 164-167), aber die Beispiele sind selbst ASCII: `"Beispiel: 'Buendnissysteme', nicht 'Buendnissysteme'"` — identische Strings, keine UTF-8-Version. Die Regel ist semantisch kaputt. | **ROT** — keine "JSON-Validierung"-Sektion | **ROT** — Beispiele widersprechen der Regel | — (kein Live-Einsatz, siehe M-03 Reife-Matrix) |

---

## 4. Einzelbefunde

### 4.1 SUB_AUFGABE_BEGRUENDUNG — F-LS-M1-07 Quelle

**Datei:** `escape-game-generator/agents/SUB_AUFGABE_BEGRUENDUNG.md`

**Defekte:**
- Keine "JSON-Encoding-Regeln"-Sektion mit Umlaut-Generation-Anweisung.
- Keine "JSON-Validierung (PFLICHT v4.0 — IL-1)"-Sektion. Hat nur eine aeltere, nicht v4.0-markierte "JSON-Validierung (PFLICHT)" (Zeile 198).
- Einziger Umlaut-Bezug: Kommentar "(fuzzy, Umlaut-tolerant)" an einem Correctness-Check — ein Hinweis an die Validation, nicht an die Generation.

**Beleg aus Marne:** aufgabe-1-6 (typ=begruendung) Frage + claim/evidence/reasoning komplett ASCII: `traegt`, `Massensterben`, `Generaele`, `Begruende`, `tragen`, `weil`, `Entscheidungen`, `trafen`, `Falkenhayn`, `Frankreich`, `ausbluten`, `Tote`, `schickten`, `Soldaten`, `Maschinengewehrfeuer`, `setzten`, `Giftgas`, `toeteten`, `entschieden`, `einzusetzen`, `Befehl`, `waere`, `passiert`.

**Retrofit-Scope:** Voller Copy-Paste des "JSON-Encoding-Regeln (v3.3)"-Blocks + "JSON-Validierung (PFLICHT v4.0 — IL-1)"-Blocks aus SUB_AUFGABE_FREITEXT.md (Zeilen 320-333). Anschliessend Verifikation: Beispiele muessen UTF-8 sein, nicht ASCII (siehe 4.3).

### 4.2 SUB_AUFGABE_VERGLEICH

**Datei:** `escape-game-generator/agents/SUB_AUFGABE_VERGLEICH.md`

**Defekte:**
- Identisch zu BEGRUENDUNG: keine Generation-Regel, nur Fuzzy-Check-Hints (Zeile 67, 198).
- "JSON-Validierung (PFLICHT)" Zeile 201 ohne v4.0/IL-1-Marker.

**Live-Befund:** Kein Marne-Vorkommen (VERGLEICH tritt in Marne-M1 nicht auf). G1 nutzt VERGLEICH einmal (aufgabe-?-? in `gpg-erster-weltkrieg-ursachen`). Der aktuelle Live-Datensatz reicht nicht fuer eine empirische Bug-Bestaetigung, die strukturelle Diagnose ist jedoch deckungsgleich mit BEGRUENDUNG — proaktiver Retrofit ist gerechtfertigt.

**Retrofit-Scope:** Identisch zu BEGRUENDUNG.

### 4.3 SUB_AUFGABE_QUELLENKRITIK — selbst-widerspruechlicher Block

**Datei:** `escape-game-generator/agents/SUB_AUFGABE_QUELLENKRITIK.md` Zeile 164-167

**Woertlich:**
> `## JSON-Encoding-Regeln (v3.3)`
> `**Umlaute:** Schreibe echte UTF-8-Umlaute (ae, oe, ue, ss). KEINE ASCII-Transliterationen. Beispiel: "Buendnissysteme", nicht "Buendnissysteme".`

**Defekte:**
- Die "echten UTF-8-Umlaute" sind in derselben Zeile als `ae, oe, ue, ss` deklariert — das SIND die ASCII-Transliterationen. Der Satz widerspricht sich selbst.
- Das Beispiel "`Buendnissysteme`, nicht `Buendnissysteme`" ist zweimal dasselbe Wort — keine Richtig/Falsch-Kontrastierung.
- Kein "JSON-Validierung (PFLICHT v4.0 — IL-1)"-Block.

**Ursache (Hypothese):** Copy-Paste-Korruption beim v3.7-Refaktor `0d862ae`, moeglicherweise bereits im MVP-Commit `3792650`. Git-Archaeologie: beide Commits aendern diese Datei (git log bestaetigt). Ein genauer Bit-Diff waere fuer den Retrofit nicht notwendig — die Regel muss ohnehin komplett neu geschrieben werden.

**Live-Befund:** QUELLENKRITIK wurde in keinem Live-Game je eingesetzt (siehe M-03 Reife-Matrix — RED). Der Bug ist latent, nicht manifest. Der Retrofit ist trotzdem Pflicht, weil der Sub-Agent in Runde 2 ohnehin fuer einen moeglichen Einsatz in v3.12-Pilotlauf reif gemacht werden muss.

**Retrofit-Scope:** Zeile 164-167 komplett ersetzen durch den korrekten Block aus SUB_AUFGABE_FREITEXT Zeilen 320-333.

### 4.4 SUB_AUFGABE_FREITEXT — Regel vorhanden, Generation trotzdem ASCII

**Datei:** `escape-game-generator/agents/SUB_AUFGABE_FREITEXT.md`

**Zustand:**
- JSON-Encoding-Regeln (v3.3) Zeile 320-323: korrekter UTF-8-Block.
- JSON-Validierung (PFLICHT v4.0 — IL-1) Zeile 325-333: vorhanden, mit Python-Validierungs-Snippet.
- git-Archaeologie: Beide Sektionen waren bereits im MVP-Commit `3792650` (2026-04-08) vorhanden. Marne-Game wurde am 2026-04-10 live geschaltet — also nach Einbau der Regel.

**Befund:** aufgabe-1-7 (typ=freitext-code) Frage: `"Wer ueberlebt im Schuetzengraben — und um welchen Preis?"`, schluesselwoerter: `['Stellungskrieg', 'Materialschlacht']`. Alle vier Token ASCII-transliteriert. Die Regel war vorhanden, der Agent hat sie nicht befolgt. Die IL-1 Python-Validierung hat den Bug nicht gefangen, weil `json.load()` keine Umlaut-Ersatz-Pattern detektiert — sie parst ASCII-Zeichen problemlos.

**Konsequenz:** Der Umlaut-Bug ist kein reiner Retrofit-Kandidat. Die Template-Saeuberung (O-07-U-D) hilft gegen den Copy-Paste-Propagations-Pfad, aber nicht gegen die Generations-Disziplin-Luecke. Der eigentliche Schutzmechanismus muss der ASCII-Pattern-Checker werden (O-07-U-B), der die Regel nach der Generierung erzwingt.

**Retrofit-Scope FREITEXT:** Keine Datei-Aenderung. Stattdessen Prioritaet fuer O-07-U-B anheben: der Checker muss in Runde 1 als Gate-Hook in den Generations-Loop integriert werden, nicht nur als optionales Tool.

---

## 5. Korrektur der Scoping-Hypothese F-07

**Scoping-Zitat (SCOPING_v3-12 §2 F-07):**
> "zwei Fragetypen haben den Umlaut-Fix nicht erhalten"

**Falsifikation:**
- Drei Fragetypen haben die Generation-Regel **nicht** erhalten: BEGRUENDUNG, VERGLEICH, QUELLENKRITIK.
- Ein weiterer Fragetyp (FREITEXT) hat die Regel, aber der Live-Output zeigt, dass die Regel nicht durchgesetzt wird.
- Korrigierte Formulierung: *Drei Sub-Agenten haben den Umlaut-Retrofit-Block nicht erhalten (BEGRUENDUNG, VERGLEICH, QUELLENKRITIK). Ein vierter Sub-Agent (FREITEXT) hat den Block, setzt ihn aber generations-seitig nicht durch — der Bug ist nicht reine Template-Propagation, sondern hat eine Generations-Disziplin-Komponente.*

**Plan-Impact:**
- Runde 1 Arbeitspaket 1 "Umlaut-Retrofit fuer die zwei in Runde 0 identifizierten Fragetypen" → **drei** Fragetypen.
- Runde 1 Arbeitspaket 4 "O-07-U-B Script-Checker als Gate" ist **nicht optional**, sondern der primaere Schutzmechanismus. Template-Saeuberung (O-07-U-D) und Retrofit (Arbeitspaket 1) sind notwendige, aber nicht hinreichende Massnahmen.

---

## 6. Retrofit-Checkliste (Input fuer Runde 1 Arbeitspaket 1)

| Schritt | Ziel-Datei | Aktion |
|---|---|---|
| R1-1 | `escape-game-generator/agents/SUB_AUFGABE_BEGRUENDUNG.md` | Einfuegen: Block "JSON-Encoding-Regeln (v3.3)" mit Umlaut-Regel **und** Block "JSON-Validierung (PFLICHT v4.0 — IL-1)". Referenz: SUB_AUFGABE_FREITEXT.md Zeilen 320-333. Position: vor "## Output"-Sektion. |
| R1-2 | `escape-game-generator/agents/SUB_AUFGABE_VERGLEICH.md` | Identisch zu R1-1. |
| R1-3 | `escape-game-generator/agents/SUB_AUFGABE_QUELLENKRITIK.md` | Ersetzen: Zeile 164-167 (der korrupte v3.3-Block) durch den korrekten Block. Zusaetzlich IL-1-Block einfuegen. |
| R1-4 | Alle acht SUB_AUFGABE_*.md | Verifikation: grep `ae, oe, ue, ss` darf keinen Hit in der "Umlaute"-Zeile liefern (Absicherung gegen copy-paste-Korruption). |
| R1-5 | `escape-game-generator/tools/typ-check-aufgaben.sh` (neu) | ASCII-Pattern-Checker: greppt `ae|oe|ue|ss` in `frage`, `optionen`, `loesung`, `tipps[]`, `feedback[].text` aller Aufgaben-JSONs. Whitelist fuer Eigennamen + Fachbegriffe (initial minimal, wird iterativ gefuellt). |
| R1-6 | `escape-game-generator/PROJECT_INSTRUCTIONS.md` State-Machine | `typ-check-aufgaben.sh` als verpflichtender Gate-Hook in Phase 2.2b vor aufgaben-Persistenz. |

---

## 7. Gate-Status

**G-0-2 (Umlaut-Fragetyp-Identifikation):** ERFUELLT mit Korrektur. Die Hypothese "zwei Fragetypen" ist falsifiziert, die korrigierte Zahl ist **drei** Fragetypen mit fehlendem Retrofit + **ein** Fragetyp mit nominal vorhandenem, praktisch nicht durchgesetztem Retrofit. Plan §3 Runde 1 muss entsprechend angepasst werden.

---

## 8. Quellen

- `escape-game-generator/agents/SUB_AUFGABE_BEGRUENDUNG.md`
- `escape-game-generator/agents/SUB_AUFGABE_VERGLEICH.md`
- `escape-game-generator/agents/SUB_AUFGABE_QUELLENKRITIK.md` Zeile 164-167
- `escape-game-generator/agents/SUB_AUFGABE_FREITEXT.md` Zeile 320-333
- `weitergehts-online/escape-games/verlauf-erster-weltkrieg-marne-ende/data.json` aufgabe-1-6, aufgabe-1-7
- `weitergehts-online/docs/befunde/BEFUND_LIVE_SICHTUNG_G2_M1_2026-04-10.md` F-LS-M1-07, F-LS-M1-08
- `weitergehts-online/docs/befunde/SCOPING_v3-12_QUELLEN_UND_OPTIONEN_2026-04-10.md` §2 F-07
- Git history: escape-game-generator commits `3792650`, `0d862ae`
