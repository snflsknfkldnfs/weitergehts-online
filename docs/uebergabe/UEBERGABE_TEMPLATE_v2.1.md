# Uebergabe-Template v2.1: Mappen-Produktion + Deployment

**Version:** 2.1 (2026-03-25)
**Basiert auf:** Learnings aus Mappe-1-Deployment (Commit 5153466)
**Zweck:** Standardisiertes Template fuer Claude-Code-Uebergaben. Pro Mappe einmal instanziieren.

---

## Anleitung: Template instanziieren

Ersetze alle `{PLATZHALTER}` durch konkrete Werte. Platzhalter:

| Platzhalter | Beschreibung | Beispiel |
|---|---|---|
| `{GAME_ID}` | Game-Identifikator | gpg-erster-weltkrieg-ursachen |
| `{MAPPE_NR}` | Mappen-Nummer | 1 |
| `{MAPPE_TITEL}` | Mappen-Titel | Pulverfass Europa |
| `{FREISCHALT_CODE}` | Code zum Freischalten | PULVER |
| `{MATERIAL_LISTE}` | Tabelle der mat-IDs mit Subagent-Zuordnung | (siehe Mappe-1-Beispiel) |
| `{AUFGABEN_LISTE}` | JSON-Skizze der Aufgaben | (siehe Mappe-1-Beispiel) |
| `{BILD_DOWNLOAD_LISTE}` | Python-Download-Befehle | (siehe Mappe-1-Beispiel) |

---

## Kontext (pro Instanz ausfuellen)

- **Game-ID:** {GAME_ID}
- **Mappe:** {MAPPE_NR} ("{MAPPE_TITEL}")
- **Workflow-Version:** v2.1

## Eingabe-Dokumente

| Dokument | Pfad (relativ zu docs/) | Prioritaet |
|---|---|---|
| ARTEFAKT_INVENTAR | `agents/artefakte/ARTEFAKT_INVENTAR_{GAME_ID}.md` | **ZUERST LESEN** |
| MATERIAL_GERUEST | `agents/artefakte/MATERIAL_GERUEST_{GAME_ID}_Mappe{MAPPE_NR}.md` | Primaerquelle |
| Subagenten-Prompts | `agents/AGENT_SUB_*.md` (alle 5) | Produktionsregeln |
| SKRIPT | `agents/artefakte/SKRIPT_{GAME_ID}.md` (Chunk {MAPPE_NR}) | Textgrundlage |
| INHALTSBASIS | `agents/artefakte/INHALTSBASIS_{GAME_ID}.md` (Mappe {MAPPE_NR}) | Fakten, Zitate |

**Lesereihenfolge ist verbindlich.** ARTEFAKT_INVENTAR vor MATERIAL_GERUEST vor Subagenten-Prompts.

---

## Schritt 0: Bild-Download (Self-Hosting)

**VOR** der Material-Produktion alle Bilder herunterladen.

**VERBOTEN:** `curl` (liefert HTML-Fehlerseiten statt Bilder wegen Wikimedia Rate Limiting).

**PFLICHT:** Python mit Bot-User-Agent:

```python
import urllib.request, time, os

def download_image(url, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    req = urllib.request.Request(url, headers={
        'User-Agent': 'WeitergehtsOnline/1.0 (https://weitergehts.online; paulcebulla@gmx.de)'
    })
    with urllib.request.urlopen(req) as resp:
        with open(path, 'wb') as f:
            f.write(resp.read())
    size = os.path.getsize(path)
    assert size > 10_000, f"FEHLER: {path} ist nur {size} Bytes — wahrscheinlich HTML-Fehlerseite"
    print(f"OK: {path} ({size} Bytes)")
    time.sleep(2)

# Downloads (aus ARTEFAKT_INVENTAR):
{BILD_DOWNLOAD_LISTE}
```

**Verifikation:** Jede Datei > 10 KB. Bei Fehler: RESERVE-Bild aus ARTEFAKT_INVENTAR versuchen.

---

## Schritt 1: Eingabe-Dokumente lesen

Reihenfolge:
1. ARTEFAKT_INVENTAR (Bild-Metadaten, lokale Pfade, Lizenzen)
2. MATERIAL_GERUEST (mat-IDs, Tafelbild-Knoten, Erarbeitbarkeits-Nachweis)
3. Alle 5 Subagenten-Prompts (AGENT_SUB_*.md)
4. SKRIPT Chunk {MAPPE_NR}
5. INHALTSBASIS Mappe {MAPPE_NR}

---

## Schritt 2: Material-Produktion

Pro mat-ID aus MATERIAL_GERUEST: Subagent-Prompt anwenden, Material-JSON produzieren.

{MATERIAL_LISTE}

**Fuer alle bildquelle-Materialien:** `inhalt`-Feld = lokaler Pfad aus ARTEFAKT_INVENTAR (NICHT Wikimedia-URL).

**Parallele Produktion erlaubt** — aber Q-Gate-Log MUSS pro Material einzeln geschrieben werden.

---

## Schritt 3: Q-Gate-Log (PFLICHT)

Nach JEDER Material-Produktion ein Q-Gate-Log schreiben. Format:

```markdown
### Q-Gate: {mat-ID}
| # | Pruefpunkt | Ergebnis | Detail |
|---|---|---|---|
| Q1 | [aus Subagent-Prompt] | PASS/FAIL | [Begruendung bei FAIL] |
| Q2 | ... | ... | ... |
| ... | ... | ... | ... |
**Gesamt:** PASS / FAIL (Q{X} nachgebessert)
```

Bei FAIL: 1 Nachbesserungsiteration. Falls danach immer noch FAIL: Finding dokumentieren, Material trotzdem aufnehmen (mit Vermerk).

---

## Schritt 4: Aufgaben

{AUFGABEN_LISTE}

---

## Schritt 5: Assembly (data.json)

1. Alle Material-JSONs in `materialien[]` zusammenfuehren
2. Alle Aufgaben-JSONs in `aufgaben[]` zusammenfuehren
3. Quellenangaben als `<cite>`-Elemente in Material-HTML einbetten (kein separates `quellenangaben[]` — Engine-Support fehlt)
4. Einstieg + Sicherung + Tafelbild aus MATERIAL_GERUEST
5. Freischalt-Code: {FREISCHALT_CODE}

---

## Schritt 6: JSON-Validierung (PFLICHT)

```bash
python3 -c "import json; json.load(open('escape-games/{GAME_ID}/data.json'))"
```

Bei Fehler: Sonderzeichen identifizieren. Haeufige Probleme:
- Deutsche Anfuehrungszeichen `„"` → durch `"` oder HTML-Entities ersetzen
- Steuerzeichen in Strings → entfernen
- Trailing Commas → entfernen

---

## Schritt 7: Engine-Kompatibilitaet + HTML

1. `escape-engine.js` lesen: Welche `typ`-Werte werden gerendert?
2. Tafelbild-Schema pruefen (knoten[], verbindungen[], voraussetzungen[])
3. HTML-Dateien aktualisieren (index.html Titel, Mappen-Anzahl)

---

## Schritt 8: Git Commit + Push

```bash
git add assets/img/{GAME_ID}/
git add escape-games/{GAME_ID}/data.json
git add escape-games/{GAME_ID}/index.html
git add escape-games/{GAME_ID}/lehrkraft.html
git commit -m "Mappe {MAPPE_NR} ({MAPPE_TITEL}): {ANZAHL} Materialien, Self-Hosting Bilder"
git push origin main
```

---

## Erfolgskriterien

1. Alle Bilder unter `assets/img/{GAME_ID}/` (alle > 10 KB)
2. Alle `bildquelle`-Materialien referenzieren lokale Pfade
3. Alle Materialien korrekt gerendert
4. Alle Aufgaben beantwortbar
5. Keine 429-Fehler beim Laden
6. Tafelbild nach Aufgaben-Loesung angezeigt
7. Freischalt-Code funktioniert
8. Keine JavaScript-Konsolenfehler
9. **Q-Gate-Log pro Material vorhanden**
10. **JSON-Validierung bestanden**

---

## Rueckmeldung (Pflichtformat)

```
Update: Phase 2.1 Mappe {MAPPE_NR} deployed.
- Bilder: [{N}/{N} heruntergeladen, Dateigroessen]
- Materialien: [PASS/FAIL pro mat-ID, Q-Gate-Referenz]
- Aufgaben: [{N} Aufgaben funktionsfaehig]
- Self-Hosting: [alle Bilder laden von lokalen Pfaden]
- JSON-Validierung: [PASS/FAIL]
- Q-Gate-Log: [angehaengt / {N}/{N} PASS]
- URL: weitergehts.online/escape-games/{GAME_ID}/
```
