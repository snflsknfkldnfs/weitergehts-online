# Übergabe-Prompt v3.2: Umlaut-Fix (UTF-8 nativ)

**Datum:** 2026-03-28
**Phase:** v3.2
**Entscheidung:** E1 — Option A (UTF-8 nativ in data.json)

## Kontext

Alle Texte in data.json verwenden aktuell ASCII-Transliterationen für deutsche Umlaute: "ae" statt "ä", "oe" statt "ö", "ue" statt "ü", "ss" statt "ß". Die Engine rendert diese 1:1 — SuS sehen die Transliterationen statt echter Umlaute. Ab v3.2 schreiben alle Agenten echte UTF-8-Umlaute. Die bestehenden data.json-Dateien müssen migriert werden.

## Pre-Flight

Vor der Arbeit sicherstellen:
- [ ] `git status` — Working Tree sauber (keine uncommitted changes)
- [ ] `git pull` — Lokaler Branch ist aktuell mit origin/main
- [ ] Aktuelle Version der zu ändernden Dateien lesen (NICHT aus dem Prompt übernehmen)
Falls Pre-Flight fehlschlägt: STOPP. Nicht mit Stash/Force-Operationen improvisieren. Stattdessen Problem melden.

## Aufgabe

### Paket 1: data.json Umlaut-Migration (Live-Daten)

Datei: `escape-games/gpg-erster-weltkrieg-ursachen/data.json`

Ersetze in ALLEN Textfeldern (titel, inhalt, frage, optionen[].text, tipps[].text, einstieg.text, sicherung.text, stundenfrage, alle scpl-Felder) die ASCII-Transliterationen durch echte UTF-8-Umlaute:

| Transliteration | UTF-8 |
|-----------------|-------|
| ae | ä |
| oe | ö |
| ue | ü |
| Ae | Ä |
| Oe | Ö |
| Ue | Ü |
| ss (nur wo tatsächlich ß gemeint ist) | ß |

**ACHTUNG bei ss→ß:** Nicht blind ersetzen! "ss" ist nicht immer "ß". Beispiele:
- "Buendnissysteme" → "Bündnissysteme" (ss bleibt ss, ue→ü)
- "Grossmaechte" → "Großmächte" (ss→ß, ae→ä)
- "muessen" → "müssen" (ue→ü, ss bleibt ss)
- "Preussen" → "Preußen" (ss→ß)

Regel: Jedes Wort einzeln prüfen. Im Zweifel: Duden-Schreibweise verwenden.

**NICHT ersetzen:**
- "ae/oe/ue" innerhalb von HTML-Tags oder Attributen
- "ae/oe/ue" in IDs, Schlüsselnamen, Dateinamen (z.B. `mat-1-1`, `mappe-1`)
- "ae/oe/ue" in URLs oder Pfaden

### Paket 2: Template data.json

Datei: `escape-games/template/data.json`

Gleiche Ersetzung in allen Beispiel-Texten und Kommentaren. Schema-Feldnamen bleiben unverändert (z.B. `ueberleitung` bleibt `ueberleitung` — Feldnamen sind Code, nicht Anzeige).

## Dateien

| Datei | Änderung | Art |
|-------|----------|-----|
| `escape-games/gpg-erster-weltkrieg-ursachen/data.json` | Umlaut-Migration aller Textfelder | ERWEITERN (Inhalte ändern, Struktur beibehalten) |
| `escape-games/template/data.json` | Umlaut-Migration der Beispieltexte | ERWEITERN |

## Merge-Schutz

Wenn bei `git pull` oder `git push` Konflikte auftreten:
1. NICHT automatisch auflösen (kein --theirs, kein --ours)
2. Konflikt-Dateien auflisten und dem User melden
3. Warten auf User-Entscheidung

## Repo-Struktur (Dokumentation)

Alle Projektdocs liegen unter weitergehts-online/docs/:
- Agenten-Docs: docs/agents/AGENT_*.md
- Architektur: docs/architektur/WORKFLOW_v2.md, docs/architektur/UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md
- Checklisten: docs/checklisten/

## Erfolgskriterium

1. Keine ASCII-Transliterationen mehr in Fließtexten der data.json-Dateien
2. JSON-Validierung besteht
3. Website zeigt echte Umlaute im Browser
4. Freischaltcode PULVER, 9 Materialien, 5 Aufgaben, 5 lokale Bilder — alles intakt

## Verifikation

- [ ] `python3 -c "import json; json.load(open('escape-games/gpg-erster-weltkrieg-ursachen/data.json'))"` → OK
- [ ] `python3 -c "import json; json.load(open('escape-games/template/data.json'))"` → OK
- [ ] `grep -rn 'Buendnis\|Grossmaecht\|Oesterreich\|muessen\|koennen\|Voelker\|Aufruestung\|Rueckversicherung' escape-games/gpg-erster-weltkrieg-ursachen/data.json` → 0 Treffer (keine Transliterationen mehr)
- [ ] Browser-Check: weitergehts.online → Mappe 1 → Materialien zeigen echte Umlaute
- [ ] Freischaltcode PULVER funktioniert
- [ ] Alle 9 Materialien laden korrekt
- [ ] Alle 5 Aufgaben funktional
- [ ] Alle 5 Bilder werden angezeigt
- [ ] SCPL-Hefteintrag (Sicherung) zeigt echte Umlaute

## Nach Abschluss

Melde den Abschluss in Cowork mit: "v3.2 Umlaut-Fix umgesetzt. Commit: [hash]. Ergebnis: [Zusammenfassung]."
