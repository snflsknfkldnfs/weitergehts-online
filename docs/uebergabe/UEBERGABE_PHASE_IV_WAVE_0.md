# Uebergabe: Phase IV Wave 0 — Code-Strang (E1, E2, D1, D2, K2-Technical, Tools)

**Status:** BEREIT FUER CLAUDE-CODE
**Herkunft:** Phase IV Wave 0 Bundle, PM-Strang abgeschlossen in Cowork 2026-04-05
**Ziel:** Alle Code-Komponenten der AU-0 (Wave 0 Bootstrap) implementieren — ATOM-UNIT-Prinzip: Alle Aenderungen dieses Uebergabe-Prompts muessen in EINEM Commit merged werden.

---

## Kontext

In Phase III.5 wurde ein 7-Agenten-Risiko-Audit abgeschlossen. In Phase III.5e wurden 20 STR-Mutationen beschlossen (siehe `docs/projekt/phase-iii-5/STR_MUTATIONS_BESCHLUSS.md`). Phase IV Wave 0 ist das Infrastruktur-Bootstrap, das alle Voraussetzungen schafft, bevor Content-STR in Wave 1 angefasst werden.

PM-Strang (Cowork) hat bereits committed:
- `docs/architektur/vertraege/VERTRAG_ATOM_UNITS.md` (V4)
- `docs/architektur/vertraege/VERTRAG_FEEDBACK_SCHEMA.md` (V2)
- `docs/agents/ROLLEN_KATALOG.md` (K1)
- `docs/agents/POLICY_TRIGGER_SICHTBARKEIT.md` (K2 Policy-Teil)
- `docs/agents/ORCHESTRATOR.md` (V1 Session-Split-Enforcement)
- `docs/analyse/TRANSKRIPT_PERSONENBEZUG_REVIEW.md` (DOK1)

Code-Strang (diese Uebergabe) liefert die technische Umsetzung von E1, E2, D1, D2, K2-Technical und die Tool-Skripte.

---

## Pre-Flight

```bash
cd ~/weitergehts.online/weitergehts-online
git status          # Working Tree sauber?
git pull --ff-only origin main # PM-Strang-Commit muss gezogen sein
test -f docs/architektur/vertraege/VERTRAG_ATOM_UNITS.md || echo "FEHLT: V4"
test -f docs/architektur/vertraege/VERTRAG_FEEDBACK_SCHEMA.md || echo "FEHLT: V2"
test -f docs/agents/ROLLEN_KATALOG.md || echo "FEHLT: K1"
test -f docs/agents/POLICY_TRIGGER_SICHTBARKEIT.md || echo "FEHLT: K2"
```

Falls einer der Checks negativ: STOPP. Cowork-PM informieren, PM-Strang-Commit pruefen.

---

## Aufgaben

### E1 — Renderer-Generalisierung (F-RA4-02 P0)

**Problem:** `assets/js/escape-engine.js` hat hart-codierte Renderer nur fuer die 5 aktuell existierenden Aufgabentypen (MC, ZU, LT, RF, FT). STR-11 (neue Aufgabentypen in Wave 1) bricht, weil die Engine die neuen Typen nicht rendern kann.

**Loesung:** AufgabentypRegistry einfuehren. Engine referenziert alle Aufgabentypen via Registry-Lookup statt via switch/if-Kette.

**Datei:** `assets/js/escape-engine.js`

**Umsetzung:**
1. Analysiere vorhandene Render-Logik fuer Aufgaben (vermutlich switch/if auf `aufgabe.typ`).
2. Extrahiere pro Typ eine Renderer-Funktion mit einheitlicher Signatur `function(aufgabe, state, container) { ... }`.
3. Baue ein Registry-Objekt `AufgabentypRegistry = { "mc": renderMC, "zu": renderZU, "lt": renderLT, "rf": renderRF, "ft": renderFT }`.
4. Ersetze die bisherige switch-Logik durch `const renderer = AufgabentypRegistry[aufgabe.typ]; if (!renderer) throw new Error(...); renderer(aufgabe, state, container);`.
5. Dokumentiere im Code-Kommentar: "Neue Aufgabentypen werden durch Ergaenzung der Registry hinzugefuegt — kein Eingriff in die Core-Render-Logik."

**Erfolgskriterium:** Alle 5 bestehenden Aufgabentypen rendern unveraendert im Browser (Mappe 1-4 Erster Weltkrieg). Keine visuelle oder funktionale Regression.

---

### E2 — Legacy-Feedback-Fallback

**Problem:** V2 (Feedback-Schema-Vertrag) fuehrt das neue `{typ, text, ebene}`-Schema ein. Bestandsaufgaben (Mappe 1-4) haben noch String-Feedback. Ohne Fallback brechen sie bei Engine-Load.

**Loesung:** `normalizeFeedback()`-Funktion in `escape-engine.js`, die vor dem Rendern alle Feedback-Felder normalisiert.

**Datei:** `assets/js/escape-engine.js`

**Umsetzung:**
```js
function normalizeFeedback(raw) {
  if (typeof raw === "string") {
    return { typ: "hinweis", text: raw, ebene: "verstaendnis" };
  }
  if (Array.isArray(raw)) {
    return raw.map(normalizeFeedback);
  }
  return raw;
}
```

Anwendung: Beim Laden einer Aufgabe aus data.json wird `aufgabe.feedback = normalizeFeedback(aufgabe.feedback)` aufgerufen, bevor der Renderer sie verwendet.

Der Renderer nutzt ab sofort ausschliesslich die Objekt-Form.

**Erfolgskriterium:** Alle bestehenden Aufgaben-JSONs laufen ohne Aenderung weiter. Neue Aufgaben mit Schema-Objekt laufen ebenfalls.

---

### D1 — Wikimedia-Bilder lokalisieren

**Problem:** RA7 Finding F-RA7-03 (P1): Direkte Wikimedia-Hotlinks in Schueler-HTML sind ein Tracking-Risiko (Wikimedia kann IP-Adressen mitloggen). Gueltig, nicht durch die iPad-Nutzungsvereinbarung gedeckt.

**Loesung:** Alle Wikimedia-Bilder lokal unter `assets/images/wikimedia/` ablegen. HTML/JSON-Referenzen aktualisieren.

**Umsetzung:**
1. Alle Material-JSONs in `docs/agents/artefakte/produktion/*/mappe-*/materialien/*.json` grepen nach `upload.wikimedia.org` oder `commons.wikimedia.org`.
2. Fuer jedes gefundene Bild den Dateinamen extrahieren.
3. Via Wikimedia Commons API den 640px-Thumbnail laden (Methode aus ORCHESTRATOR.md UEBERGABE-TEMPLATE) und unter `assets/images/wikimedia/{bereinigter-dateiname}.jpg` ablegen.
4. Im Material-JSON das `bild.url`-Feld auf den relativen lokalen Pfad aendern (`../../assets/images/wikimedia/...` oder absolut `/assets/images/wikimedia/...`, je nach vorhandenem Muster).
5. data.json nach Anpassung der Material-JSONs neu assemblieren (siehe Phase-3-Logik in ORCHESTRATOR.md).
6. Lizenznachweis anlegen: `docs/assets/BILDLIZENZEN.md` — pro lokalisiertem Bild: Original-URL, Autor, Lizenz (CC-BY-SA, Public Domain, etc.), lokaler Pfad.

**Erfolgskriterium:**
- Kein `upload.wikimedia.org` / `commons.wikimedia.org` in `escape-games/**/data.json` und in Mappe-HTML.
- Alle Bilder laden im Browser aus `assets/images/wikimedia/`.
- `BILDLIZENZEN.md` ist vollstaendig.

---

### D2 — STR-13 Reflexions-Zone ohne Persistenz

**Problem:** RA7 Finding F-RA7-06 (P1+P1): Der urspruengliche STR-13-Entwurf sah localStorage-Persistenz fuer Schueler-Reflexionen vor. Reflexions-Texte koennen sensibler sein als Antworten auf geschlossene Aufgaben. Datenschutz-Risiko trotz iPad-Nutzungsvereinbarung, weil die Texte im Browser-Cache persistiert waeren und bei iPad-Wechsel sichtbar sein koennten.

**Loesung:** STR-13 wird als Design-Change umgesetzt. Reflexions-Eingaben sind fluechtig — nur Session-lokal (React-State bzw. in-memory), keine Speicherung in localStorage, keine Speicherung im Mappen-Progress-Objekt.

**Datei:** `assets/js/escape-engine.js` (und ggf. eine eigene Reflexions-Zone-Komponente)

**Umsetzung:**
1. Falls STR-13 Reflexions-Zone in der aktuellen Engine-Version noch nicht existiert: Implementierung vorbereiten, so dass Reflexions-Text ausschliesslich in einem lokalen JavaScript-State-Container lebt (`let reflexionen = {}` oder aehnlich, NICHT im Progress-Objekt).
2. Die `saveProgress()`- bzw. `_saveAntwortState()`-Funktion darf Reflexions-Texte NICHT persistieren.
3. Beim Mappen-Wechsel oder Browser-Reload sind die Eingaben weg — das ist das erwuenschte Verhalten.
4. Ein Hinweistext an der Reflexions-Zone: "Diese Eingabe wird nicht gespeichert. Notiere dir deine Gedanken bei Bedarf in deinem Heft."

**Erfolgskriterium:** In DevTools → Application → Local Storage ist kein Reflexions-Text sichtbar, egal wie lange der Schueler tippt.

---

### K2 — Technical Enforcement Trigger-Warnungen

**Problem:** Policy K2 (`docs/agents/POLICY_TRIGGER_SICHTBARKEIT.md`) verlangt, dass Lehrkraft-Metadaten (inkl. Trigger-Warnungen) niemals im Schueler-DOM landen. Die Policy ist geschrieben, der technische Enforcement fehlt noch.

**Umsetzung:**

1. **Assembly-Split in Phase-3-Tool** (falls die Python-Assembly in diesem Repo als Skript existiert): Beim Lesen der Produktions-JSONs nach dem Muster `{"aufgaben": [...], "materialien": [...], "rahmen": {...}}` wird im Schueler-Pfad das Feld `lehrkraft_meta` aus jedem Item **geloescht**, bevor es in `data.json` geschrieben wird.

2. **Validator** (neue Datei `tools/validate-no-lehrkraft-meta.py`):
```python
#!/usr/bin/env python3
import json, sys, glob

def validate_no_lehrkraft_meta(path):
    with open(path) as f:
        data = json.load(f)
    for mappe in data.get("mappen", []):
        for section in ("aufgaben", "materialien"):
            for item in mappe.get(section, []):
                if "lehrkraft_meta" in item:
                    print(f"FEHLER: {path} Mappe {mappe.get('id')} {section} item {item.get('id')} enthaelt lehrkraft_meta")
                    return False
    return True

if __name__ == "__main__":
    ok = True
    for p in glob.glob("escape-games/*/data.json"):
        if not validate_no_lehrkraft_meta(p):
            ok = False
    sys.exit(0 if ok else 1)
```

3. **Grep-Guard** (erweitert den Pre-Commit-Hook, siehe `tools/pre-commit-atom-check.sh` weiter unten): Im Commit-Hook wird gepruefted, dass in `escape-games/*/mappe-*.html` kein `trigger_warnung` oder `lehrkraft_meta` Token vorkommt.

**Erfolgskriterium:** Validator laeuft durch, Exit-Code 0. Kein Schueler-HTML enthaelt verbotene Tokens.

---

### Tool 1 — `tools/validate-feedback-schema.js`

Validiert, dass alle Aufgaben-JSONs in `docs/agents/artefakte/produktion/**/aufgaben/*.json` und in `escape-games/*/data.json` entweder String-Feedback (Legacy, wird von normalizeFeedback transformiert) oder dem Schema `{typ, text, ebene}` entsprechen.

Pruefungen:
1. `typ` in `["bestaetigung","korrektur","hinweis","verknuepfung"]`
2. `text` ist String, max 400 Zeichen
3. `ebene` in `["wissen","verstaendnis","anwendung","analyse"]`
4. Array-Formen: alle Elemente ok
5. Legacy-Strings: ok mit Hinweis

Ausgabe: pro Fehler Pfad + Aufgabe-ID + Grund. Exit 0 bei Erfolg, 1 bei Fehler.

---

### Tool 2 — `tools/pre-commit-atom-check.sh`

Shell-Skript, das im Git-Hook `.git/hooks/pre-commit` aufgerufen wird. Prueft die 3 ATOM-UNIT-Checks aus `VERTRAG_ATOM_UNITS.md` Abschnitt 4.

Minimalimplementierung:
```bash
#!/usr/bin/env bash
set -e

CHANGED=$(git diff --cached --name-only)

# Check C — ATOM-UNIT-Vollstaendigkeit (Beispiel AU-2 Feedback-Schema)
if echo "$CHANGED" | grep -q "VERTRAG_FEEDBACK_SCHEMA.md"; then
  echo "$CHANGED" | grep -q "escape-engine.js" || {
    echo "AU-2 verletzt: VERTRAG_FEEDBACK_SCHEMA.md geaendert, aber escape-engine.js nicht im Commit"
    exit 1
  }
fi

# Grep-Guard Trigger-Sichtbarkeit
if git diff --cached -- 'escape-games/*/mappe-*.html' | grep -E 'trigger_warnung|lehrkraft_meta'; then
  echo "POLICY VERLETZT: Lehrkraft-Metadaten in Schueler-HTML"
  exit 1
fi

# Feedback-Schema-Validator
if [ -f tools/validate-feedback-schema.js ]; then
  node tools/validate-feedback-schema.js || exit 1
fi

exit 0
```

Aktivierung via `git config core.hooksPath tools/git-hooks` oder Symlink nach `.git/hooks/pre-commit`. Aktivierung **nicht in diesem Commit** — User muss die Aktivierung selbst vornehmen, damit kein unerwarteter Lock entsteht.

---

## Cache-Busting (PFLICHT bei JS/CSS-Aenderungen)

Nach den E1/E2/D2-Aenderungen an `assets/js/escape-engine.js`: In **allen** HTML-Dateien, die die Engine referenzieren (insbesondere `escape-games/*/mappe-*.html` und ggf. `index.html`), den `?v=`-Query-String hochzaehlen. Aktuellen Wert im Repo pruefen und um 1 erhoehen.

---

## Dateien

| Aenderungsart | Datei |
|---|---|
| MODIFY | `assets/js/escape-engine.js` (E1 Registry, E2 Fallback, D2 Reflexion) |
| NEW | `tools/validate-feedback-schema.js` |
| NEW | `tools/validate-no-lehrkraft-meta.py` |
| NEW | `tools/pre-commit-atom-check.sh` |
| NEW | `assets/images/wikimedia/*` (D1 lokale Kopien) |
| NEW | `docs/assets/BILDLIZENZEN.md` |
| MODIFY | `docs/agents/artefakte/produktion/*/mappe-*/materialien/*.json` (D1 Pfad-Rewrite) |
| MODIFY | `escape-games/*/data.json` (D1 Pfad-Rewrite, regenerated via Assembly) |
| MODIFY | `escape-games/*/mappe-*.html` (Cache-Busting `?v=`) |

---

## Merge-Schutz

Bei Konflikten **NICHT** automatisch aufloesen. Konflikt-Dateien auflisten, Cowork-PM benachrichtigen, User-Entscheidung abwarten. Insbesondere bei `escape-engine.js` und `data.json`-Dateien strikte Vorsicht (Learning aus 2026-03-28 data.json-Regression).

---

## Verifikation

- [ ] Alle bestehenden Mappen (1-4 Erster Weltkrieg) oeffnen im Browser ohne Fehler
- [ ] Alle Aufgaben bleiben loesbar, keine visuelle Regression
- [ ] DevTools Network: kein Request an `upload.wikimedia.org` oder `commons.wikimedia.org`
- [ ] DevTools Application → Local Storage: keine Reflexions-Texte (sofern STR-13 implementiert)
- [ ] `node tools/validate-feedback-schema.js` → Exit 0
- [ ] `python3 tools/validate-no-lehrkraft-meta.py` → Exit 0
- [ ] `grep -r "upload.wikimedia.org\|commons.wikimedia.org" escape-games/` → leer
- [ ] `BILDLIZENZEN.md` enthaelt alle lokalisierten Bilder
- [ ] Cache-Busting `?v=` in allen HTML-Referenzen hochgezaehlt

---

## Nach Abschluss

Commit mit folgender Nachricht:
```
feat(wave-0): Phase IV Wave 0 Code-Strang — E1/E2/D1/D2/K2-Technical + Tools

AU-0 Bootstrap Code-Komponenten:
- E1: AufgabentypRegistry (F-RA4-02 P0 geloest)
- E2: Legacy-Feedback-Fallback (V2 Vertrag)
- D1: Wikimedia-Bilder lokalisiert (F-RA7-03 P1)
- D2: STR-13 Reflexion ohne localStorage (F-RA7-06 P1)
- K2-Technical: Lehrkraft-Metadaten-Validator
- Tools: validate-feedback-schema.js, pre-commit-atom-check.sh

Wave 0 damit abgeschlossen. Wave 1 (Content-STR AU-1/AU-2/AU-3) folgt.
```

Danach im Cowork-Projekt-Chat melden: "Update: Phase IV Wave 0 Code-Strang abgeschlossen. Verifikation: [Ergebnisse]."
