# Q-Gate-Log: verlauf-erster-weltkrieg-marne-ende — Phase 3 (Assembly + Deploy + Live-Go)

**Game-ID:** verlauf-erster-weltkrieg-marne-ende
**Scope:** game-scope (Phase 3.0, 3.1, 3.2)
**Vertrag:** VERTRAG_PHASE_3_ASSEMBLY.md + VERTRAG_PHASE_3-1_DEPLOY.md
**Katalog:** Q-GATE-MECHANIK.md §7.6 (Assembly) + §7.7 (Deploy-Preparation) + §7.8 (Live-Go)

> **Charakter dieses Logs:** Retro-Aufzeichnung. Marne-Game wurde VOR Einführung des formalen Phase-3.1/3.2-Q-Gate-Flows (v3.11) live geschaltet. Die Phase-3.1-Einträge sind strukturelle Nachprüfungen, kein "Gate-vor-Deploy" im v3.11-Sinne — das Game war zum Zeitpunkt der Prüfung bereits live. Die Phase-3.2-Einträge rekonstruieren den Live-Go aus dem Git-Verlauf.
>
> **Warum Marne retro-geloggt?** Marne war der direkte Defekt-Auslöser, der v3.11 ausgelöst hat (fehlender Landing-Page-Eintrag → manuell via 3fda51d nachgezogen). Die Retro-Prüfung dient als strukturelles Beweisstück, dass die neu definierten DEPLOY-01..05 Q-Gates gegen den bereits auslaufenden Stand grün sind (PASS) — d. h. die nach-manuelle Korrektur 3fda51d hat den Zielzustand hergestellt.
>
> **Q3=c Entscheidung v3.11:** Nur Marne-Game erhält Retro-Log. Ursachen-Game wird nicht retro-geloggt, da zum Zeitpunkt der Q3-Entscheidung kein dokumentierter DEPLOY-Defekt bekannt war. Die danach durch deploy-check.sh gefundene DEPLOY-03-Titel-Drift wird separat in STATUS.md als Folgearbeit erfasst.

---

## Phase 3.0 — Assembly (retro, 2026-04-09)

**Ausführender:** Claude Code (extern, escape-game-generator-Repo-Sandbox)
**Vertrag:** VERTRAG_PHASE_3_ASSEMBLY.md
**Katalog:** Q-GATE-MECHANIK.md §7.6 A1..A5

Dieses Log dokumentiert keine Phase-3.0-Q-Gates retro, weil Phase 3.0 in einer separaten Assembly-Sandbox (Claude Code) lief und dort ein eigener Log geführt wurde. Verweis auf die damalige Assembly-Übergabe:

- Commit `1a13fce deploy: Verlauf-Game Mappe 1 live schalten`

Phase 3.0 ist in diesem game-scope-Log nur als Vollständigkeitsbaustein verzeichnet.

---

## Phase 3.1 — Deploy-Preparation (retro-strukturell, 2026-04-10)

**Ausführender:** PI/Cowork-Session (v3.11 Retro-Prüfung)
**Vertrag:** VERTRAG_PHASE_3-1_DEPLOY.md
**Katalog:** Q-GATE-MECHANIK.md §7.7 DEPLOY-01..DEPLOY-05
**Script:** `tools/deploy-check.sh verlauf-erster-weltkrieg-marne-ende`

### DEPLOY-Gate-Ergebnisse (stdout wörtlich)

```
DEPLOY-01: PASS titel="Der Erste Weltkrieg — Verlauf von der Marne bis zum Ende" mappen.len=1
DEPLOY-02: PASS 1 Asset-Refs geprueft, alle vorhanden
DEPLOY-03: PASS Titel 'Der Erste Weltkrieg — Verlauf von der Marne bis zum Ende' im <li> enthalten
DEPLOY-04: PASS data.json.mappen=1, mappe-*.html=1
DEPLOY-05: PASS index.html referenziert escape-engine + data.json
---
GESAMT: PASS
```

### Interpretation

| ID | Ergebnis | Kommentar |
|---|---|---|
| DEPLOY-01 | PASS | `data.json` valide, `meta.titel` vorhanden, `mappen.len=1`. |
| DEPLOY-02 | PASS | 1 Asset-Ref geprüft (Hero-Bild Mappe 1), existiert unter `assets/img/verlauf-erster-weltkrieg-marne-ende/`. |
| DEPLOY-03 | PASS | Titel-Identität (Byte-gleich, normalisiert) zwischen `data.json.meta.titel` und Landing-Page `<li id="game-verlauf-erster-weltkrieg-marne-ende">`. **Dieser Gate fehlte zum Zeitpunkt des ursprünglichen Deploys — der Landing-Page-Eintrag musste manuell via 3fda51d nachgezogen werden. Der jetzige Retro-PASS ist Beleg dafür, dass 3fda51d den Zielzustand erreicht hat.** |
| DEPLOY-04 | PASS | `data.json.mappen[].len == mappe-*.html-Count == 1`. |
| DEPLOY-05 | PASS | `escape-games/verlauf-erster-weltkrieg-marne-ende/index.html` referenziert `escape-engine` und `data.json`. |

### Staging-Flag-Schritt (retro nicht anwendbar)

VERTRAG_PHASE_3-1_DEPLOY §2.3 verlangt, dass beim normalen v3.11-Flow vor dem Commit ein `data-status="staging"` Attribut gesetzt wird. Marne ist bereits ohne Staging-Flag live. Retro-Nachtrag wäre eine Rückwärts-Modifikation ohne Nutzen. **NICHT APPLIZIERT.**

### Gesamt-Urteil Phase 3.1 (retro)

**PASS** — Alle 5 DEPLOY-Gates grün. Der jetzige Produktionszustand des Marne-Games entspricht dem v3.11-Zielzustand. Der historische Defekt (fehlender Landing-Eintrag) ist durch 3fda51d geheilt und durch den heutigen Retro-Run strukturell bestätigt.

---

## Phase 3.2 — Live-Go (retro-rekonstruktion, 2026-04-09)

**Ausführender:** User (Host-Terminal push)
**Vertrag:** v3.11 noch nicht existent — Live-Go erfolgte vor Einführung des formalen Phase-3.2-Flows
**Katalog:** Q-GATE-MECHANIK.md §7.8 LIVE-01..LIVE-03

### Rekonstruktion aus Git-Verlauf

| Commit | Rolle | Phase-Schritt |
|---|---|---|
| `1a13fce deploy: Verlauf-Game Mappe 1 live schalten` | Primary-Deploy-Commit | Game-Assets + escape-games-Verzeichnis auf `main`. |
| `3fda51d deploy: Verlauf-Game Landing-Page-Link nachgezogen` | Heilungs-Commit | Korrigiert den ursprünglich fehlenden `<li>`-Eintrag in `index.html`. **Genau dieser Commit wäre unter v3.11 nicht notwendig gewesen, weil DEPLOY-03 ihn vor dem ersten Deploy gefangen hätte.** |

### LIVE-Gate-Ergebnisse (retro-interpretation)

| ID | Ergebnis | Kommentar |
|---|---|---|
| LIVE-01 (STAGING-FLAG-ENTFERNT) | N/A | Staging-Flag-Flow in v3.11 eingeführt, Marne lief ohne. |
| LIVE-02 (COMMIT-SHA vorhanden) | PASS (retro) | `1a13fce` + `3fda51d` in Git-Log auffindbar. |
| LIVE-03 (POST-DEPLOY-SMOKETEST) | N/A (optional per Q2=b) | Nicht ausgeführt. Game ist offensichtlich live (user-validierbar auf weitergehts.online). |

### Gesamt-Urteil Phase 3.2 (retro)

**PASS-MIT-ANMERKUNG** — Live-Go ist faktisch erfolgt und das Game ist erreichbar. Der doppelte Commit (`1a13fce` + `3fda51d`) ist der Artefakt-Beleg des Defekts, der v3.11 motiviert hat. Unter v3.11 wäre dies ein einziger Commit gewesen.

---

## Referenzen

- `architektur/vertraege/VERTRAG_PHASE_3-1_DEPLOY.md` (escape-game-generator, v3.11)
- `architektur/Q-GATE-MECHANIK.md` §7.7 + §7.8 (escape-game-generator, v3.11)
- `tools/deploy-check.sh` (weitergehts-online, v3.11)
- `docs/architektur/UPGRADE_PLAN_v3-11_DEPLOY_STATE_MACHINE.md` (weitergehts-online, Entwurf → Freigegeben am 2026-04-10)
- Git-Commits: `1a13fce`, `3fda51d`
