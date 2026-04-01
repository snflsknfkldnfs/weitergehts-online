# Uebergabe-Prompt v3.3: Material-Sequenzierung

**Datum:** 2026-03-28
**Von:** Cowork (Architektur + Dokumentation)
**An:** Claude Code (Engine + Schema)
**Phase:** v3.3 (Material-Sequenzierung)
**Abhaengigkeit:** v3.2 abgeschlossen (Commit 2561066)

---

## Kontext

v3.2 (Umlaut-Fix) ist abgeschlossen. Materialien in data.json verwenden jetzt UTF-8 nativ. Die Cowork-Infrastruktur fuer v3.3 ist vollstaendig vorbereitet:

- `docs/agents/AGENT_MATERIAL.md` — Aufgabe 1.9 Sequenzplanung definiert (mit Pflicht-Referenz auf Guetekriterien)
- `docs/architektur/WORKFLOW_v2.md` — Phase 1.5 SEQUENZPLANUNG eingefuegt
- `docs/agents/AGENT_SUB_*.md` (alle 5) — Sequenzkontext-Pflicht-Input + Q-Gate SQ-1 bis SQ-4
- `docs/checklisten/GUETEKRITERIEN_SEQUENZIERUNG.md` — S1-S15 Kriterien-Katalog (NEU)

Was fehlt: Schema-Erweiterung in data.json + Engine-Anpassung in escape-engine.js. Das ist Aufgabe dieses Prompts.

---

## Pre-Flight

Vor der Arbeit sicherstellen:

- [ ] `git status` — Working Tree sauber (keine uncommitted changes)
- [ ] `git pull` — Lokaler Branch ist aktuell mit origin/main
- [ ] Aktuelle Version der zu aendernden Dateien lesen (NICHT aus dem Prompt uebernehmen):
  - `escape-games/template/data.json` — aktuelles Schema lesen
  - `escape-games/gpg-erster-weltkrieg-ursachen/data.json` — aktuelle 9 Materialien lesen
  - `assets/js/escape-engine.js` — aktuelle `_renderMaterialien()` und `_renderMappeV1()` lesen

Falls Pre-Flight fehlschlaegt: STOPP. Nicht mit Stash/Force-Operationen improvisieren. Stattdessen Problem melden.

---

## Aufgabe

Drei Aenderungen, in dieser Reihenfolge:

### Aufgabe 1: data.json Template erweitern

Datei: `escape-games/template/data.json`
Art: ERWEITERN (bestehende Struktur erhalten, neue Felder hinzufuegen)

Jedes Objekt in `materialien[]` erhaelt 5 neue optionale Felder:

```json
{
  "id": "mat-1-1",
  "typ": "darstellungstext",
  "titel": "",
  "inhalt": "",
  "quelle": "",
  "lizenz": "",
  "position": 1,
  "didaktische_funktion": "einstieg",
  "voraussetzung": [],
  "ueberleitung_von": "",
  "sequenz_kontext": {
    "vorher": null,
    "nachher": {"id": "", "typ": "", "kerninhalt": ""}
  }
}
```

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| `position` | Integer | 1-basierte Ordinalzahl (Reihenfolge der Bearbeitung) |
| `didaktische_funktion` | String (Enum) | `"einstieg"`, `"erarbeitung"`, `"vertiefung"`, `"sicherung"`, `"transfer"` |
| `voraussetzung` | String[] | Material-IDs die vorher bearbeitet sein muessen. Leeres Array `[]` bei Position 1 |
| `ueberleitung_von` | String | Narrativer Uebergang vom vorherigen Material (1-2 Saetze). Leerstring `""` bei Position 1 |
| `sequenz_kontext` | Object | `vorher` und `nachher` mit jeweils `id`, `typ`, `kerninhalt`. `null` wenn kein Vorgaenger/Nachfolger |

### Aufgabe 2: Bestehende Mappe migrieren

Datei: `escape-games/gpg-erster-weltkrieg-ursachen/data.json`
Art: ERWEITERN (bestehende Inhalte vollstaendig erhalten, neue Felder hinzufuegen)

**WICHTIG:** Die aktuelle Datei mit 9 Materialien und 5 Aufgaben in Mappe 1 LESEN und die neuen Felder auf Basis des tatsaechlichen Inhalts hinzufuegen. Keine Materialien loeschen, aendern oder umordnen.

Die bestehende Array-Reihenfolge der 9 Materialien (mat-1-1 bis mat-1-9) ist bereits didaktisch sinnvoll. Die Migration besteht darin, diese implizite Reihenfolge **explizit** zu machen:

**Migrationslogik — fuer jedes Material (mat-1-1 bis mat-1-9):**

1. `position`: Vergib aufsteigend 1-9 gemaess bestehender Array-Reihenfolge
2. `didaktische_funktion`: Bestimme aus Materialtyp + Inhalt:
   - mat-1-1 (darstellungstext, Einstieg ins Thema): `"einstieg"`
   - Mittlere Materialien (Erarbeitung neuer Inhalte): `"erarbeitung"`
   - Quellentexte/Bildquellen die vertiefen: `"vertiefung"`
   - Letztes Material (falls zusammenfassend): `"sicherung"`
   - Lies den Inhalt und entscheide auf Basis des tatsaechlichen Texts
3. `voraussetzung`: Array der Material-IDs aller Materialien mit niedrigerer Position. Bei Position 1: `[]`. Bei einfacher linearer Sequenz genuegt das direkte Vorgaenger-Material (z.B. `["mat-1-2"]` fuer mat-1-3)
4. `ueberleitung_von`: Formuliere 1-2 Saetze narrativen Uebergang. Der Uebergang soll:
   - Benennen, was das vorherige Material ergeben hat
   - Eroeffnen, welchen neuen Aspekt dieses Material aufgreift
   - Schuelergerecht formuliert sein (Du-Anrede, klar, konkret)
   - Bei Position 1: Leerstring `""`
5. `sequenz_kontext`: Generiere `vorher`/`nachher`-Objekte mit den tatsaechlichen Material-IDs, Typen und einem Satz Kerninhalt

### Aufgabe 3: Engine-Anpassung

Datei: `assets/js/escape-engine.js`
Art: ERWEITERN (bestehende Funktionen ergaenzen, nichts loeschen)

**3a) Neue Hilfsfunktion `_sortMaterialienByPosition`:**

```javascript
/**
 * Sortiert Materialien nach position-Feld (aufsteigend).
 * Fallback: Array-Index (Rueckwaertskompatibilitaet fuer Mappen ohne position).
 * @param {Array} materialien
 * @returns {Array} Sortierte Kopie (Original unveraendert)
 * @private
 */
function _sortMaterialienByPosition(materialien) {
  // Kopie erstellen (Original-Array nicht mutieren)
  var sorted = materialien.slice();

  // Pruefen ob mindestens ein Material position hat
  var hasPosition = false;
  for (var i = 0; i < sorted.length; i++) {
    if (sorted[i].position !== undefined && sorted[i].position !== null) {
      hasPosition = true;
      break;
    }
  }

  // Nur sortieren wenn position-Felder vorhanden
  if (hasPosition) {
    sorted.sort(function(a, b) {
      var posA = (a.position !== undefined && a.position !== null) ? a.position : 9999;
      var posB = (b.position !== undefined && b.position !== null) ? b.position : 9999;
      return posA - posB;
    });
  }

  return sorted;
}
```

Platzierung: Direkt vor `_renderMaterialien()`.

**3b) `_renderMaterialien()` erweitern:**

Die bestehende Funktion `_renderMaterialien(materialien)` anpassen:

1. Am Anfang der Funktion: `materialien = _sortMaterialienByPosition(materialien);`
2. Im Loop, VOR dem Erstellen des Material-Elements: Wenn `mat.ueberleitung_von` vorhanden und nicht leer, erzeuge ein Ueberleitungs-Element:
   ```javascript
   if (i > 0 && mat.ueberleitung_von) {
     var ueberleitungDiv = document.createElement('div');
     ueberleitungDiv.className = 'material-ueberleitung';
     ueberleitungDiv.textContent = mat.ueberleitung_von;
     frag.appendChild(ueberleitungDiv);
   }
   ```
3. Nach dem Switch-Statement (wo `el` erstellt wird), dem Element data-Attribute hinzufuegen:
   ```javascript
   if (el) {
     if (mat.position !== undefined) {
       el.setAttribute('data-position', mat.position);
     }
     if (mat.didaktische_funktion) {
       el.setAttribute('data-funktion', mat.didaktische_funktion);
     }
   }
   ```

**3c) CSS fuer Ueberleitungen:**

Datei: `assets/css/themes/theme-gpg.css`
Art: ERWEITERN (am Ende anfuegen)

```css
/* v3.3 Material-Ueberleitungen */
.material-ueberleitung {
  margin: 1.5rem 0;
  padding: 0.75rem 1rem;
  font-style: italic;
  color: var(--color-muted, #666);
  border-left: 3px solid var(--color-accent, #c9a96e);
  background: var(--color-surface-alt, rgba(201, 169, 110, 0.05));
}
```

---

## Dateien

| Datei | Aenderung |
|-------|-----------|
| `escape-games/template/data.json` | ERWEITERN (5 neue Felder pro Material-Objekt) |
| `escape-games/gpg-erster-weltkrieg-ursachen/data.json` | ERWEITERN (Migration: 5 neue Felder pro Material, bestehende Inhalte erhalten) |
| `assets/js/escape-engine.js` | ERWEITERN (neue Funktion + Erweiterung bestehender Funktion) |
| `assets/css/themes/theme-gpg.css` | ERWEITERN (neuer CSS-Block am Ende) |

**Nicht aendern:** Keine Dateien unter `docs/`. Die gesamte Cowork-Infrastruktur ist bereits aktualisiert.

---

## Merge-Schutz

Wenn bei `git pull` oder `git push` Konflikte auftreten:
1. NICHT automatisch aufloesen (kein --theirs, kein --ours)
2. Konflikt-Dateien auflisten und dem User melden
3. Warten auf User-Entscheidung

Grund: Automatische Merge-Resolution hat in der Vergangenheit zu Datenverlust gefuehrt.

---

## Verifikation

Nach Abschluss aller Aenderungen diese Pruefungen ausfuehren:

### V1: JSON-Validitaet
```bash
node -e "JSON.parse(require('fs').readFileSync('escape-games/template/data.json', 'utf8')); console.log('Template: valid')"
node -e "JSON.parse(require('fs').readFileSync('escape-games/gpg-erster-weltkrieg-ursachen/data.json', 'utf8')); console.log('WK1: valid')"
```

### V2: Schema-Vollstaendigkeit (Template)
```bash
node -e "
var d = JSON.parse(require('fs').readFileSync('escape-games/template/data.json', 'utf8'));
var m = d.mappen[0].materialien[0];
var felder = ['position', 'didaktische_funktion', 'voraussetzung', 'ueberleitung_von', 'sequenz_kontext'];
var fehlt = felder.filter(function(f) { return !(f in m); });
console.log(fehlt.length === 0 ? 'Template: alle Felder vorhanden' : 'FEHLT: ' + fehlt.join(', '));
"
```

### V3: Migration-Vollstaendigkeit (Mappe 1)
```bash
node -e "
var d = JSON.parse(require('fs').readFileSync('escape-games/gpg-erster-weltkrieg-ursachen/data.json', 'utf8'));
var mats = d.mappen[0].materialien;
console.log('Materialien: ' + mats.length + ' (erwartet: 9)');
var ohnePosition = mats.filter(function(m) { return m.position === undefined; });
console.log('Ohne position: ' + ohnePosition.length + ' (erwartet: 0)');
var ohneFunktion = mats.filter(function(m) { return !m.didaktische_funktion; });
console.log('Ohne didaktische_funktion: ' + ohneFunktion.length + ' (erwartet: 0)');
var ohneKontext = mats.filter(function(m) { return !m.sequenz_kontext; });
console.log('Ohne sequenz_kontext: ' + ohneKontext.length + ' (erwartet: 0)');
var positionen = mats.map(function(m) { return m.position; }).sort(function(a,b) { return a-b; });
console.log('Positionen: ' + positionen.join(',') + ' (erwartet: 1,2,3,4,5,6,7,8,9)');
"
```

### V4: Rueckwaertskompatibilitaet
```bash
node -e "
// Simuliere Mappe ohne position-Felder
var mats = [{id:'a'},{id:'b'},{id:'c'}];
var sorted = mats.slice();
var hasPos = false;
for (var i = 0; i < sorted.length; i++) {
  if (sorted[i].position !== undefined) { hasPos = true; break; }
}
console.log('Fallback aktiv (kein position): ' + (!hasPos ? 'JA' : 'NEIN') + ' (erwartet: JA)');
console.log('Reihenfolge unveraendert: ' + (sorted[0].id === 'a' && sorted[1].id === 'b' ? 'JA' : 'NEIN'));
"
```

### V5: Inhaltspruefung (manuell)
- [ ] `escape-games/gpg-erster-weltkrieg-ursachen/data.json` oeffnen
- [ ] Alle 9 Materialien sind inhaltlich unveraendert (Titel, Inhalt, Quellen identisch)
- [ ] Freischaltcode ist weiterhin `PULVER`
- [ ] Alle 5 Aufgaben sind unberuehrt
- [ ] Sicherungs-Abschnitt ist unberuehrt
- [ ] `ueberleitung_von` bei mat-1-1 ist leer (`""`)
- [ ] `ueberleitung_von` bei mat-1-2 bis mat-1-9 ist jeweils ein inhaltlich sinnvoller Satz

### V6: Engine-Pruefung (manuell)
- [ ] `_sortMaterialienByPosition` existiert als Funktion
- [ ] `_renderMaterialien` ruft `_sortMaterialienByPosition` auf
- [ ] Ueberleitungs-div wird vor Materialien eingefuegt (ausser Position 1)
- [ ] data-position und data-funktion Attribute werden gesetzt

---

## Commit

Prefix: `v3.3:`
Beispiel: `v3.3: Material-Sequenzierung — Schema + Engine + Migration`

Der Commit umfasst genau 4 Dateien (template/data.json, WK1/data.json, escape-engine.js, theme-gpg.css).
