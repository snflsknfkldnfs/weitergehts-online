# HANDOFF BATCH-2: P0-A5 + P0-A6 (Medien-Infrastruktur)

**Erstellt:** 2026-04-18
**Empfaenger:** Claude Code (Dual-Root: weitergehts-online + escape-game-generator)
**Quelle:** R0-TESTRUN-AUDIT, BEFUND §4, BERICHT_RA4 §8+§13
**Geschaetzter Aufwand:** 3-4h
**Rueckmelde-Protokoll:** Strukturierter JSON-kompatibler Report (s.u.)

---

## Kontext

R0-TESTRUN-AUDIT hat in RA4 (Medien/Lizenz) 13 Findings identifiziert, davon 3 P0. Batch-1 hat F-RA4-04 (Source-Drift mat-3-4.json) geschlossen. Batch-2 schliesst die verbleibenden zwei Medien-P0:

- **P0-A5 / F-RA4-10** Mappe-4 Retro-Patch (img-4-1/-3/-4 neu kuratieren)
- **P0-A6 / F-RA4-02** Q-MEDIEN-PROSPEKTIV (Commons-Pre-Ingest-Check in Phase 0.2.M Sub-Agent)

Detaillierte Referenzen:
- `docs/projekt/testrun-nationalismus-kolonialismus/BEFUND_TESTRUN_N-K_KONSOLIDIERT.md` §4
- `docs/projekt/testrun-nationalismus-kolonialismus/BERICHT_RA4_MEDIEN_LIZENZ.md` §8, §9, §13 (Spec AGENT_MEDIENRECHERCHE)
- INHALTSBASIS: `docs/agents/artefakte/deutscher-nationalismus-kolonialismus/INHALTSBASIS_deutscher-nationalismus-kolonialismus.md` Zeilen 385-392 (Mappe-4-Bilder)

---

## Task A: P0-A5 Mappe-4 Retro-Patch

**Repo:** weitergehts-online
**Aufwand:** 1-2h

### Bug-Beschreibung

INHALTSBASIS enthaelt fuer img-4-1, img-4-3, img-4-4 halluzinierte Wikimedia-Dateinamen (MV2-Check: 3/5 MISSING). Mappe 4 wurde nicht assembliert. Ohne Retro-Patch reproduziert jede Wiederaufnahme den Fehler.

### Aktuelle halluzinierte Dateinamen

| ID | Beschreibung (INHALTSBASIS) | Hallu-Dateiname (zu ersetzen) | Lizenz-Feld |
|---|---|---|---|
| img-4-1 | Foto Kamelreiterkompanie der "Schutztruppe" Herero-Aufstand 1904, Bundesarchiv | `Bundesarchiv_Bild_183-R24738,_Deutsch-Suedwestafrika,_Herero-Aufstand.jpg` | CC BY-SA 3.0 DE |
| img-4-3 | Karte Landbesitz + Minengerechtsame Deutsch-Suedwestafrika 1914 | `Karte_des_Landbesitzes_und_der_Minengerechtsame_in_Deutsch-Suedwestafrika.jpg` | Public Domain |
| img-4-4 | Hendrik Witbooi (Nama-Haeuptling), retuschierte Postkarte mit Reichsfarben-Armband | `Hendrik_Wittboi,_der_einflussreichste_Nama-Haeuptling_in_Suedwestafrika.jpg` | Public Domain |

### Aufgabe

**Pro Bild (img-4-1, img-4-3, img-4-4):**

1. **Dual-Kanal-Verifikation gemaess BERICHT_RA4 §13.1 (AGENT_MEDIENRECHERCHE):**
   - **Kanal 1:** `mcp__wikimedia-image-search__wikimedia_search_images` mit semantischer Beschreibung (NICHT der Hallu-Dateiname).
   - **Kanal 2:** WebFetch auf `https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&titles=File:<KANDIDAT>&format=json` zur Existenz-Pruefung + Lizenz-Meta.
   - **Bei divergenten Kanaelen:** erneute Suche mit praezisierterer Beschreibung, max. 2 Iterationen.

2. **Didaktische Aequivalenz-Pruefung:** Ersatz darf die intendierte didaktische Funktion (Spalte "Einbettungsvorschlag" in INHALTSBASIS) nicht fundamental aendern. Perspektiv-Drifts wie bei Maréchal (img-3-2) dokumentieren unter `_meta.fallback_begruendung` + Erwaehnung im Rueckmelde-Bericht.

3. **Felder pro Bild zu liefern** (fuer INHALTSBASIS-Patch):
   ```
   wikimedia_filename: <exakter Commons-Dateiname, File:-Prefix weglassen>
   commons_url:        https://commons.wikimedia.org/wiki/File:<Dateiname>
   urheber:            <Vorname Nachname | Institution>
   lizenz:             <Public Domain | CC BY-SA 3.0 | CC BY-SA 3.0 DE | ...>
   lizenz_deed_url:    <https://creativecommons.org/... | n/a fuer PD>
   verified_via:       [kanal1, kanal2]
   verified_ts:        <ISO 8601 UTC>
   didaktische_aequivalenz: PASS | DRIFT (<Beschreibung>)
   ```

4. **INHALTSBASIS patchen:** Zeilen 387, 389, 390 ersetzen — Spalte "Wikimedia-Dateiname" + ggf. Lizenz-Korrektur.

5. **MV2-Asset-Hinweis:** Keine Binary-Downloads (Asset-Pipeline laeuft in Phase 3.0 Assembly). Nur Dateinamen-Patch.

### Akzeptanzkriterien

- [ ] 3/3 Bilder dual-kanal-verifiziert mit `verified: true`
- [ ] 3/3 Bilder haben gueltige `commons_url` (HTTP 200 auf API)
- [ ] 3/3 Lizenz-Attributions-Blocks vollstaendig (urheber + lizenz + deed_url bei CC)
- [ ] INHALTSBASIS Zeilen 387/389/390 gepatcht
- [ ] `_meta.fallback_begruendung` bei jedem Bild gesetzt (Platzhalter OK bei PASS)

### Commit-Message-Vorlage

```
fix(medien): Mappe-4 Retro-Patch Herero/Nama-Bilder (img-4-1/-3/-4)

P0-A5 / F-RA4-10 aus R0-TESTRUN-AUDIT.

Drei halluzinierte Wikimedia-Dateinamen in INHALTSBASIS
ersetzt durch dual-kanal-verifizierte Commons-Treffer:
- img-4-1: <filename> (verified_via kanal1+kanal2)
- img-4-3: <filename>
- img-4-4: <filename>

Felder urheber, lizenz_deed_url, verified_ts, didaktische_aequivalenz
dokumentiert in INHALTSBASIS-Spalten + _meta-Block.

Didaktische Drift-Check: <PASS bei allen | DRIFT bei X>.

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Task B: P0-A6 Q-MEDIEN-PROSPEKTIV

**Repo:** escape-game-generator (Source)
**Aufwand:** 2h

### Bug-Beschreibung

Phase 0.2.M Medienrecherche verifiziert Bilder **reaktiv** erst in Phase 3.0 Assembly. Halluzinations-Rate MV2: 6/18 = 33%. Vor-Ingest-Check ist strukturell nicht implementiert.

### Aufgabe

Q-Gate **Q-MEDIEN-PROSPEKTIV** in Phase 0.2.M Sub-Agent (`AGENT_INHALT.md` oder `AGENT_MEDIENRECHERCHE.md` falls existent) als verpflichtender Gate einfuehren.

**Gate-Spezifikation:**

1. **Input:** Pro Bild in INHALTSBASIS ein `wikimedia_filename`-Kandidat (falls nicht Beschreibung → Suche).
2. **Check:**
   - Dual-Kanal (identisch zu Task A §1): MCP + WebFetch.
   - Existenz (HTTP 200) + Lizenz-Gueltigkeit (CC/PD only).
3. **Ausgabe:** `verified: true|false` pro Bild. Alle Felder gemaess Task A §3.
4. **Fallback:** bei `false` → max. 2 Iterationen erneut suchen mit verfeinerter Beschreibung.
5. **Gate-Urteil:** FAIL wenn <100% `verified: true` → Sub-Agent blockiert, Eskalation an Orchestrator mit `fallback_begruendung` fuer jeden offenen Eintrag.

**Implementierungs-Skizze:**

- Falls `AGENT_MEDIENRECHERCHE.md` fehlt: anlegen nach Spec in BERICHT_RA4 §13.1.
- Vertrags-Patch: `VERTRAG_PHASE_0-2_INHALT.md` um Q-MEDIEN-PROSPEKTIV als Pflicht-Checkpoint erweitern.
- ORCHESTRATOR-Patch: Q-MEDIEN-PROSPEKTIV-Gate in Phase 0.2 State-Machine-Transition.
- UPGRADE_PLAN v1.3 Section 19 bereits vorbereitet — Q-MEDIEN-PROSPEKTIV ist dort erwaehnt. Implementierung gegen diesen Plan ausrichten.

### Akzeptanzkriterien

- [ ] `AGENT_MEDIENRECHERCHE.md` existiert (oder AGENT_INHALT.md um Q-Gate erweitert)
- [ ] VERTRAG_PHASE_0-2_INHALT.md enthaelt Q-MEDIEN-PROSPEKTIV als Pflicht
- [ ] ORCHESTRATOR.md State-Machine-Transition aktualisiert
- [ ] Dual-Kanal-Spec + Ausgabe-Schema ({urheber, commons_url, lizenz_deed_url, verified, verified_via, verified_ts}) maschinenlesbar dokumentiert
- [ ] Fallback-Mechanismus (max. 2 Iter + Eskalation) spezifiziert

### Commit-Message-Vorlage (Source-Repo)

```
feat(contracts): Q-MEDIEN-PROSPEKTIV in Phase 0.2.M als Pflicht-Gate

P0-A6 / F-RA4-02 aus R0-TESTRUN-AUDIT.

Verhindert Halluzinations-Ingest in Phase 0.2 durch dual-kanal
(MCP + WebFetch) Pre-Ingest-Check auf Commons:
- Existenz (HTTP 200)
- Lizenz (CC/PD only)
- Metadaten (urheber, commons_url, lizenz_deed_url)

Gate-Logik in: AGENT_MEDIENRECHERCHE.md (+ Fallback 2 Iter).
Vertrag: VERTRAG_PHASE_0-2_INHALT.md um Q-MEDIEN-PROSPEKTIV ergaenzt.
Orchestrator: State-Machine-Transition aktualisiert.

Referenz: UPGRADE_PLAN v1.3 Section 19 (Q-MEDIEN-PROSPEKTIV),
BERICHT_RA4 §13.1 (AGENT_MEDIENRECHERCHE-Spec).

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Rueckmelde-Protokoll (JSON-kompatibel)

Nach Abschluss beider Tasks — strukturierter Report am Ende der CC-Session:

```
BATCH-2 REPORT
==============
task_a_p0_a5:
  commit: <SHA in weitergehts-online>
  images_verified: 3/3 | X/3
  drift_notes: <keine | beschrieben>
  acceptance: PASS | PARTIAL (<welche Checks fehlen>)
task_b_p0_a6:
  commit: <SHA in escape-game-generator>
  files_touched: <Liste>
  acceptance: PASS | PARTIAL (<welche Checks fehlen>)
deviations: <keine | beschrieben>
elapsed: <HH:MM>
```

PM-Cowork aktualisiert dann:
- `docs/projekt/STATUS.md` P0-Tabelle (A5 + A6 CLOSED)
- `docs/projekt/CHANGELOG.md` neuer Eintrag
- Batch-3 freischalten

---

## Nicht-Ziele dieses Batches

- P0-A1/A2 (Pipeline-Regression) — Batch-3
- F-RA4-06 data.json-Schema-Erweiterung (P1) — nach Batch-3
- img-4-5/-6 Nachrecherche (NACHRECHERCHE-Marker) — nicht P0
- Mappe-4-Assembly (data.json-Eintrag) — folgt aus naechstem Assembly-Run, nicht in diesem Batch
