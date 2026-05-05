# Run-5 Pause-State User-Decisions

**Pause-Zeitpunkt:** 2026-04-30 post-Phase-0.1-PASS
**Resume-Trigger:** `/escape-game-generator:resume-state` (post-Token-Refresh)
**Plugin-Version:** v0.5.3 Multi-Wiki-Konfiguration
**State-Files:**
- `game_state.json` (primary, user_stop_marker.active=true)
- `PROJECT_INSTRUCTIONS.md` Zustandsblock (Fallback)

---

## 5 Offene Befunde — User-Antworten

### Befund 1: M3-Titel

**Plugin-Vorschlag:** „Wenn die Revolution ihre Kinder verschlingt" (Vergniaud-Zitat)
**Alternative:** „Republik im Terror" (deskriptiv)

**User-Antwort:** Republik im Terror 

**Begruendung:** Muss sachlich sein, Stundenfrage kann dann emotionaler sein: "Warum sagt man: "Die Revolution frisst ihre Kinder"? o.Ä. 

---

### Befund 2: Sklaverei in Kolonien

**Optionen:**
- (a) Hinweis-Ebene in M3
- (b) Eigene Vertiefung (eigener Mappen-Sub-Block)

**User-Antwort:** a

**Begruendung:** Mappen müssen präzise auf die studnenfrage hin strukturiert sein, subplots/nebengeschichten prooblematisch  

---

### Befund 3: AFB-Progression I-II → II → II-III → II-III

**Plugin-Vorschlag:** R7-angemessen
**Alternativen:**
- (a) Sanfter (I → I-II → II → II-III)
- (b) Akzept wie vorgeschlagen
- (c) Steiler (II → II-III → III → III)

**User-Antwort:** b und a

**Begruendung:** grundsätzlich gut, ggf. zwischen M1 und M2 sanfter damit grundlagen, grundlegendes situationsverstädnnis hinreichend verdichtet sind sodass höheres nievau darauf präzise und verlässlich aufbauen kann 

---

### Befund 4: Narrativ-Rahmen

**Plugin-Vorschlag:** „Archiv-Ermittler 2026" — SuS rekonstruieren 4 verschollene Akten
**Alternativen:**
- (a) Akzept
- (b) Andere Rahmung (z.B. Zeitreise / Zeitzeugen-Interview / Detektiv-Ermittlung)

**User-Antwort:** zeitreise oder aktueller bezug hier schon vorwegnehemen -> querverweis auf revolutionen heute einbringen o.Ä. 

**Begruendung:** Archiv-ermittler eventuell etwas stale weil zeitliche distanz sehr groß 

---

### Befund 5: KE-Matrix-Gewichtung

**Plugin-Vorschlag (aus mappen_aufteilung.json):**
- M1: LB2_K_01
- M2: LB2_K_02
- M3: LB2_K_02 + J7_K_05
- M4: LB2_K_01 + J7_K_07

**User-Antwort:** sieht gut aus 

**Begruendung:** grundsätzlich wichtig: bedingungstruktur in eigenstruktur des lerninhalts beachten: manche erkenntnisse/wissen muss vor anderem gesichert/erarbeitet sein. 

---

## Resume-Befehl (next week, post-Token-Refresh)

```bash
cd /Users/paulad/escape-game-generator
bash /Users/paulad/escape-game-generator/scratch/_run5_start.sh
```

Im CC-Prompt:
```
/escape-game-generator:resume-state
```

Antworten zu 5 Befunden aus diesem File (oben) eingeben → Plugin startet Phase 0.2.

---

**Status:** Template — User fuellt 5 Antworten + Begruendungen aus.
