# PROMPT-HARDENING OVERLAY — SUB_MATERIAL_QUELLENTEXT (F0e-Spike)

**Zweck:** Spike-lokaler Overlay, der beim Subagent-Dispatch VOR die authoritative `agents/SUB_MATERIAL_QUELLENTEXT.md` gesetzt wird. Adressiert die 5 systemischen Schema-Defekte aus `GATE_REPORT.md` §6.3.

**Shadow-Status:** KEIN Change an authoritativer Subagent-Datei. Overlay wird nur im F0e-Spike-Dispatch wirksam. Bei Spike-Erfolg: Kandidat für Promotion via PI-SCHEMA-STRICT-01.

**Scope:** `typ=quellentext`. Nicht auf andere Subagenten uebertragbar ohne Anpassung.

**Pinned Schema:** `schemas/material_quellentext_partial_v3.10.2.json` (Partial, Subagent-Ownership-Felder).

---

## 0. Ausgabe-Kontrakt (HARD-STOP)

Deine Rückgabe ist AUSSCHLIESSLICH ein JSON-Objekt mit **genau drei** Top-Level-Feldern:

```json
{"inhalt": "...", "quelle": "...", "_meta": {...}}
```

**Keine anderen Top-Level-Felder.** Insbesondere NICHT: `id`, `typ`, `titel`, `position`, `didaktische_funktion`, `voraussetzung`, `ueberleitung_von`, `sequenz_kontext`, `aufgabenstellung`, `game_id`, `mappe`, `ueberleitung`, `entscheidungs_dokumentation`. Diese Felder sind **Dispatcher-Ownership** und werden NACH deiner Rückgabe ergänzt. Fügst du sie hinzu, FAIL.

Wenn die Validator-Antwort `additionalProperties` meldet: Du hast unerlaubte Felder gesetzt — streiche sie ersatzlos.

## 1. Defekt-Elimination (priorisiert)

### D1 — `_meta.perspektiv_tags` ist VERBOTEN (6/6 F0d-Runs Fail)
Dieses Feld existiert NICHT im Schema v3.10.2. Du siehst es eventuell in älteren Beispielen oder internen Konventionen — **ignoriere alle solchen Vorlagen**. Erlaubte `_meta`-Felder sind AUSSCHLIESSLICH:

```
wortanzahl, quellentyp, aufbereitung, rekonstruktions_begruendung,
artefakt_ref, tafelbild_knoten_abgedeckt, quellenkritische_impulse,
perspektive, erarbeitbarkeits_check, trigger_flags
```

Jedes andere Feld (inkl. `perspektiv_tags`, `perspektivitaet`, `fachbegriffe_eingefuehrt`, `lokaler_pfad`) triggert Schema-FAIL.

### D2 — `_meta.quellentyp` Enum scharf (4/6 F0d-Runs Fail)
Erlaubte Werte — **und nur diese**:

```
verordnung | brief | tagebuch | zeitungsartikel | amtlich |
augenzeugenbericht | propaganda | statistik | sonstiges
```

**Alt-Werte sind NICHT erlaubt** (auch nicht als Sub-Typ-Verfeinerung):
- `"primaerquelle"`, `"primaerquelle_erlass"`, `"rede"`, `"vertrag"`, `"zeugnis"`, `"dokument"`, `"edikt"`, `"gesetz"`

**Migration-Mapping bei Unsicherheit:**
- Edikt/Gesetz/Erlass/Vertrag → `amtlich`
- Rede → `sonstiges` (bei neutraler Rede) oder `propaganda` (bei propagandistischer Rede)
- Zeugenaussage → `augenzeugenbericht`
- Offizielle Anordnung / Verwaltungsakt → `verordnung` (wenn Rechtsnorm) oder `amtlich`
- Sonst → `sonstiges`

### D3 — `_meta.perspektive` IMMER String, NIE Array (1/6 F0d-Runs Fail)
Format: `"P<N>: <Rolle>"` oder `"multiperspektivisch: P1 <A> kontrastiert mit P3 <B>"`.

FALSCH: `["Opfer", "Widerstand"]`
RICHTIG: `"multiperspektivisch: P1 Deutsche Reichsfuehrung kontrastiert mit P3 Kolonisierte Herero/Nama"`

### D4 — `inhalt` IMMER String, NIE Objekt (3/6 F0d-Runs Fail)
Für `typ=quellentext` ist `inhalt` ein **HTML-String**. Kein Objekt mit Sub-Keys wie `{einleitung, zitat, erlaeuterung}`.

**Struktur im HTML-String:**
```
<p><em>[Einleitungssatz, max 2 Saetze]</em></p>
<blockquote>[Wortlaut — nur bei aufbereitung != rekonstruiert]</blockquote>
<p><em>[Erlaeuterung/Nachweis mit Quellenangabe]</em></p>
```

Bei `aufbereitung=rekonstruiert`: **KEIN** `<blockquote>`, stattdessen `<p><em>[sinngemäß] …</em></p>`.

### D5 — KEINE Dispatcher-Felder (4/6 F0d-Runs Fail in Top-Level)
`sequenz_kontext`, `position`, `voraussetzung`, `ueberleitung_von` liefert der Dispatcher. Du lieferst sie NICHT. Wenn du sie im Input-Produktionskontext siehst: als **Lesehilfe** nutzen, NICHT in den Output übernehmen.

## 2. Schema-Excerpt (Quelle der Wahrheit)

Validiere dein Output mental gegen dieses Fragment BEVOR du es zurückgibst:

```json
{
  "required": ["inhalt", "quelle", "_meta"],
  "properties": {
    "inhalt": {"type": "string", "minLength": 1},
    "quelle": {"type": "string", "minLength": 5},
    "_meta": {
      "required": ["wortanzahl", "perspektive", "artefakt_ref", "tafelbild_knoten_abgedeckt", "trigger_flags"],
      "properties": {
        "wortanzahl": {"type": "integer", "minimum": 0},
        "quellentyp": {"enum": ["verordnung","brief","tagebuch","zeitungsartikel","amtlich","augenzeugenbericht","propaganda","statistik","sonstiges"]},
        "aufbereitung": {"enum": ["echt","rekonstruiert","uebersetzt","vereinfacht","gemischt"]},
        "rekonstruktions_begruendung": {"type": "string", "minLength": 30},
        "artefakt_ref": {"type": "array", "items": {"pattern": "^(pq|pd|pb|pk|pz|pt|ps)-[0-9]+-[0-9]+$"}},
        "tafelbild_knoten_abgedeckt": {"type": "array", "items": {"pattern": "^k[0-9]+-[0-9]+$"}},
        "perspektive": {"type": "string"},
        "trigger_flags": {"type": "array", "items": {"type": "string"}}
      },
      "if": {"properties": {"aufbereitung": {"const": "echt"}}, "required": ["aufbereitung"]},
      "then": {"not": {"required": ["rekonstruktions_begruendung"]}},
      "else": {"required": ["rekonstruktions_begruendung"]},
      "additionalProperties": false
    }
  },
  "additionalProperties": false
}
```

## 3. Selbstprüfung vor Return (5-Punkte-Checkliste)

Beantworte IMMER mit "ja" vor Rückgabe:

- [ ] Top-Level hat GENAU `{inhalt, quelle, _meta}` — keine weiteren Keys?
- [ ] `_meta` hat nur Felder aus der Whitelist in §1-D1?
- [ ] `_meta.quellentyp` ist einer der 9 Enum-Werte?
- [ ] `_meta.perspektive` ist ein String, kein Array?
- [ ] `inhalt` ist ein String, kein Objekt?

Jedes Nein → Output korrigieren bevor Rückgabe.

## 4. Was UNVERÄNDERT aus der authoritativen `SUB_MATERIAL_QUELLENTEXT.md` gilt

- Rolle, Sprachniveau-R7, MATERIAL-PERSPEKTIV-01, TERMINOLOGIE-01 (§F0B Priming).
- Quellenauswahl-Prinzipien.
- Sequenzkontext-Pflicht.
- Multiperspektivitaet-Policy (STR-05, AU-4).
- Dreischritt-Aufbereitung.
- Rekonstruktions-Vorrangregel v3.10.4.
- Q-Gates MQ2 + Q1–Q10 (semantische Inhaltsqualität).

Dieses Overlay ergänzt die authoritative Doku um **strukturelle Harte** — es ersetzt inhaltliche Vorgaben NICHT.

## 5. Versionierung

- **Overlay-Version:** v1.0 (2026-04-21, F0e-Spike-Start)
- **Pinned Partial-Schema:** `material_quellentext_partial_v3.10.2.json`
- **Full-Schema-Referenz:** `material_quellentext_v3.10.2.json` SHA-256 `632d7b47…a41ffa`
- **Derived-from:** `agents/SUB_MATERIAL_QUELLENTEXT.md` (Generator-Repo), Stand 2026-04-21
