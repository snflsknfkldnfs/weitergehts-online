# VERTRAG Phase 3: Assembly

**Version:** 1.0
**Erstellt:** 2026-04-03
**Zweck:** Mappenunabhaengiger Vertrag fuer Phase 3 (Assembly). Transformiert das Produktionsverzeichnis einer Mappe in ein mappe-Objekt innerhalb der data.json des Escape-Games. Rein mechanisch — keine didaktischen Entscheidungen.

---

## Vorbedingungen

| # | Bedingung | Pruefmethode |
|---|---|---|
| V1 | Phase 2 DONE (Q-GATE-LOG zeigt Cross-Konsistenz PASS) | Q-GATE-LOG.md lesen |
| V2 | DISPATCH_SKRIPT Tracker: alle Dispatches DONE | DISPATCH_SKRIPT lesen |
| V3 | Git clean (keine uncommitted changes) | `git status` |

---

## Phase 3.0: Pre-Flight

### 3.0.1 Git-Sync

```
git pull origin main
```

### 3.0.2 Inventar-Pruefung

Produktionsverzeichnis: `docs/agents/artefakte/produktion/{game-id}/mappe-{N}/`

| Verzeichnis | Erwartete Dateien | Variabel |
|---|---|---|
| rahmen/ | einstieg.json, hefteintrag.json, sicherung.json | Optional: meta.json (falls vorhanden, enthaelt id/titel/beschreibung) |
| materialien/ | mat-{N}-1.json bis mat-{N}-M.json | M = Anzahl Materialien (typisch 5-6) |
| aufgaben/ | aufgabe-{N}-1.json bis aufgabe-{N}-5.json | Immer 5 |

**Pruefung:** Jede .json muss valides JSON sein:
```python
import json, glob, sys
files = glob.glob(f"{prod_dir}/**/*.json", recursive=True)
for f in files:
    try: json.load(open(f))
    except: print(f"FAIL: {f}"); sys.exit(1)
print(f"PASS: {len(files)} Dateien valide")
```

### 3.0.3 Bild-Asset-Pruefung

Bildquellen identifizieren: Alle materialien/*.json mit `"typ": "bildquelle"` lesen. Feld `inhalt` enthaelt den erwarteten Bild-Pfad.

| Pruefung | Methode |
|---|---|
| Bild existiert lokal? | `os.path.exists(pfad)` |
| Bild > 10 KB? | `os.path.getsize(pfad) > 10240` |
| Falls NICHT vorhanden → Phase 3.1 | Download erforderlich |
| Falls vorhanden → Phase 3.1 ueberspringen | Weiter mit 3.2 |

### 3.0.4 Engine-Patch-Check

Escape-engine.js Zeile ~2279: Lueckentext-Schema-Mismatch.

```
Erwartet: var text = aufgabe.text_mit_luecken || aufgabe.frage || '';
Falls noch ALT (nur aufgabe.frage): Patchen.
Falls bereits gepatcht: Weiter.
```

### 3.0.5 data.json Zustandspruefung

```python
data = json.load(open("escape-games/{game-id}/data.json"))
print(f"Bestehende Mappen: {len(data['mappen'])}")
# Mappe-N gehoert an Index N-1
# Pruefen: Index N-1 ist noch nicht belegt
assert len(data['mappen']) == N - 1, f"FAIL: Erwartet {N-1} Mappen, gefunden {len(data['mappen'])}"
```

---

## Phase 3.1: Bild-Download (bedingt)

NUR ausfuehren wenn Phase 3.0.3 fehlende Bilder identifiziert hat.

**Download-Methode:** Python urllib mit Bot-User-Agent (Wikimedia-konform). 2 Sekunden Pause zwischen Downloads.

**Quell-Ermittlung:**
1. _meta.download_url in der jeweiligen mat-JSON (bevorzugt)
2. Falls nicht vorhanden: Wikimedia-Suche ueber `mcp__wikimedia-image-search__wikimedia_search_images` mit Suchbegriffen aus `quelle` und `titel`
3. Download → lokaler Pfad gemaess `inhalt`-Feld

**Validierung nach Download:**
- Datei existiert und > 10 KB
- Pfad stimmt mit `inhalt`-Feld in mat-JSON ueberein

---

## Phase 3.2: Assembly

### 3.2.1 Mappe-Header ableiten

Quellen (Prioritaet):
1. rahmen/meta.json (falls vorhanden): id, titel, beschreibung, freischalt_code
2. Falls meta.json NICHT vorhanden, ableiten aus:
   - id: `"mappe-{N}"`
   - titel: Aus DIDAKTIK_RAHMEN (Sektion "Mappe {N}: ...")
   - beschreibung: Aus DIDAKTIK_RAHMEN (Thematischer Schwerpunkt) oder einstieg.json narrativ (gekuerzt)
   - freischalt_code: Aus PROGRESSIONSPLAN.md

### 3.2.2 Komponenten lesen

```python
# Reihenfolge:
einstieg     = json.load(open(f"{prod}/rahmen/einstieg.json"))
hefteintrag  = json.load(open(f"{prod}/rahmen/hefteintrag.json"))
sicherung    = json.load(open(f"{prod}/rahmen/sicherung.json"))
materialien  = [json.load(open(f)) for f in sorted(glob.glob(f"{prod}/materialien/mat-*.json"))]
aufgaben     = [json.load(open(f)) for f in sorted(glob.glob(f"{prod}/aufgaben/aufgabe-*.json"))]
```

### 3.2.3 Mappe-Objekt bauen

```python
mappe = {
    "id": mappe_id,
    "titel": mappe_titel,
    "beschreibung": mappe_beschreibung,
    "freischalt_code": freischalt_code,
    "einstieg": einstieg,                    # direkt uebernehmen
    "materialien": materialien,               # sortiert nach position
    "aufgaben": aufgaben,                     # sortiert nach ID
    "sicherung": {
        "hefteintrag": hefteintrag,           # komplettes Objekt
        "hefteintrag_verweis": sicherung.get("hefteintrag_verweis", ""),
        "reflexionsimpuls": sicherung.get("reflexionsimpuls", ""),
        "zusammenfassung": sicherung.get("zusammenfassung", ""),
        "ueberleitung": sicherung.get("ueberleitung", "")
    }
}
```

### 3.2.4 In data.json einfuegen

```python
data["mappen"].append(mappe)
# NICHT: meta{} modifizieren
# NICHT: bestehende mappen[0..N-2] aendern
# AUSNAHME: Falls vorherige Mappe generische ueberleitung hat ("naechste Mappe"),
#           auf konkreten Titel der neuen Mappe spezifizieren
```

### 3.2.5 Formatierung

```python
with open(data_json_path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
```

---

## Phase 3.3: Validierung

| # | Pruefung | Methode | PASS-Kriterium |
|---|---|---|---|
| V1 | JSON valide | `json.load(open(data_json_path))` | Kein Exception |
| V2 | Mappe-Anzahl | `len(data["mappen"]) == N` | Exakt N Mappen |
| V3 | Mappe-ID | `data["mappen"][N-1]["id"] == f"mappe-{N}"` | Match |
| V4 | Freischalt-Code | `data["mappen"][N-1]["freischalt_code"]` | Nicht leer, stimmt mit PROGRESSIONSPLAN |
| V5 | Material-IDs | Alle mat-{N}-* vorhanden und unique | Set-Pruefung |
| V6 | Aufgabe-IDs | Alle aufgabe-{N}-* vorhanden und unique | Set-Pruefung |
| V7 | material_referenz-Integritaet | Jede aufgabe.material_referenz[] verweist auf existierende mat-ID in materialien[] | Cross-Check |
| V8 | Bild-Pfade (Bildquellen) | Jedes mat mit typ="bildquelle": inhalt-Pfad existiert und > 10 KB | Datei-Check |
| V9 | Tipps-Struktur | Jede aufgabe hat exakt 3 Tipps mit stufe 1/2/3 | Schema-Check |
| V10 | Engine-Feld-Kompatibilitaet | Typ-spezifische Pflichtfelder vorhanden (text_mit_luecken fuer lueckentext, optionen fuer MC, etc.) | Schema-Check |
| V11 | Bestehende Mappen unveraendert | SHA256 der mappen[0..N-2] vorher/nachher identisch | Hash-Vergleich |
| V12 | Einstieg-Konsistenz | einstieg.problemstellung == hefteintrag.stundenfrage | String-Vergleich |

---

## Phase 3.4: Q-Gate + Dokumentation

### Q-Gate

GESAMT-PASS: Alle V1-V12 PASS.
Bei FAIL: Finding dokumentieren, betroffene Pruefung benennen, Fix durchfuehren, Re-Validierung.

### Dokumentation

1. Q-GATE-LOG.md: Neue Sektion "Phase 3: Assembly" mit V1-V12 Ergebnissen
2. DISPATCH_SKRIPT (falls vorhanden): Status auf DONE setzen

---

## Phase 3.5: Git

```
git add escape-games/{game-id}/data.json
git add assets/img/{game-id}/*.{jpg,png}  # falls neue Bilder
git commit -m "Phase 3: Mappe {N} Assembly — {titel}"
```

Push durch User.

---

## NICHT tun

- KEINE didaktischen Entscheidungen — Assembly ist mechanisch
- KEINE Inhalte aus diesem Vertrag kopieren — IMMER aus Produktionsverzeichnis lesen
- KEINE bestehenden Mappen modifizieren (Ausnahme: generische Ueberleitung spezifizieren)
- KEINE data.json aus vorherigen Sessions oder Prompts verwenden — aktuelle Version aus Repo
- KEINE Felder erfinden die nicht in den Quell-JSONs stehen
