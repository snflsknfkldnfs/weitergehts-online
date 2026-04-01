# Uebergabe-Prompt: v3.8 Engine-Erweiterung — Inline-Material-Links in Tipps

**Datum:** 2026-03-30
**Von:** Cowork (Architektur-Pflege)
**An:** Claude Code (Implementierung)
**Vorgaenger:** U1-U10 abgeschlossen (Commits d233b74, 862af13, 5650157)

---

## Pre-Flight

- [ ] `git status` — Working Tree sauber
- [ ] `git pull` — Aktuell mit origin/main
- [ ] `assets/js/escape-engine.js` lesen (relevante Stellen: Tipp-Rendering ab Zeile ~2695)

Falls Pre-Flight fehlschlaegt: STOPP.

---

## Kontext

v3.8 C3 definiert eine neue Markup-Konvention fuer Material-Referenzen in Aufgabentexten:

```
[[mat-id|Anzeigetext]]
```

Beispiel im Tipp-Text:
```
Schau dir die [[mat-1-2|Europakarte von 1914]] (M7) genau an.
```

Soll gerendert werden als:
```html
Schau dir die <a href="#mat-1-2" class="tipp__material-link">Europakarte von 1914</a> (M7) genau an.
```

Aktuell werden Tipp-Texte via `textContent` gerendert (Zeile ~2731), d.h. kein HTML-Parsing. Die Erweiterung muss `[[...]]`-Markup in klickbare Anker-Links umwandeln.

---

## Anforderungen

### 1. Hilfsfunktion `_parseInlineMaterialLinks(text)`

Neue Funktion in escape-engine.js:

```javascript
/**
 * Parst [[mat-id|Anzeigetext]]-Markup und gibt ein DocumentFragment zurueck.
 * Nicht-Markup-Teile werden als TextNodes eingefuegt (XSS-sicher).
 * @param {string} text — Rohtext mit optionalem [[...]]-Markup
 * @returns {DocumentFragment}
 */
function _parseInlineMaterialLinks(text) {
  var frag = document.createDocumentFragment();
  var regex = /\[\[([a-z0-9-]+)\|([^\]]+)\]\]/g;
  var lastIndex = 0;
  var match;
  while ((match = regex.exec(text)) !== null) {
    // Text vor dem Match
    if (match.index > lastIndex) {
      frag.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
    }
    // Link erstellen
    var link = document.createElement('a');
    link.href = '#' + match[1];
    link.className = 'tipp__material-link';
    link.textContent = match[2];
    frag.appendChild(link);
    lastIndex = regex.lastIndex;
  }
  // Rest nach letztem Match
  if (lastIndex < text.length) {
    frag.appendChild(document.createTextNode(text.slice(lastIndex)));
  }
  return frag;
}
```

**Sicherheitshinweis:** Kein `innerHTML` — nur `createTextNode` + `createElement`. Kein XSS-Risiko.

### 2. Tipp-Rendering anpassen

**Aktuelle Stelle (Zeile ~2730-2731):**
```javascript
} else {
  contentArea.textContent = tippText;
}
```

**Neu:**
```javascript
} else {
  contentArea.innerHTML = '';
  contentArea.appendChild(_parseInlineMaterialLinks(tippText));
}
```

### 3. Fragestamm-Rendering (optional, empfohlen)

Falls der Fragestamm (`aufgabe.frage` / `aufgabe.fragestamm`) ebenfalls `[[...]]`-Markup enthalten kann, dieselbe Funktion dort anwenden. Pruefe, wie der Fragestamm gerendert wird und ob `textContent` oder `innerHTML` verwendet wird. Falls `textContent`: analog anpassen.

### 4. Bestehendes Verhalten beibehalten

Die bestehende Auto-Prepend-Logik fuer Tipp 1 mit `material_referenz` (Zeilen ~2704-2729) bleibt **unveraendert**. Die neue `[[...]]`-Konvention ist ein Zusatz, kein Ersatz. Alte data.json-Dateien ohne `[[...]]`-Markup funktionieren weiterhin identisch.

---

## Nicht aendern

- `docs/**` — Cowork-Domain
- `escape-games/*/data.json` — eigene Migration
- HTML-Templates
- CSS (keine neuen Klassen noetig; `.tipp__material-link` kann optional in theme-gpg.css gestylt werden, ist aber nicht Pflicht — Standard-`<a>`-Styling genuegt)

---

## Verifikations-Checkliste

1. [ ] `_parseInlineMaterialLinks` existiert als Funktion in escape-engine.js
2. [ ] Text ohne `[[...]]` wird identisch zu vorher gerendert (reiner TextNode)
3. [ ] `[[mat-1-2|Europakarte]]` wird als `<a href="#mat-1-2">Europakarte</a>` gerendert
4. [ ] Mehrere Links in einem Text funktionieren: `[[mat-1-7|Karte A]] und [[mat-1-2|Karte B]]`
5. [ ] Kein `innerHTML` mit unkontrolliertem User-Input (nur TextNodes + createElement)
6. [ ] Bestehende Tipp-1-Auto-Prepend-Logik funktioniert unveraendert
7. [ ] Website im Browser laden: Tipps mit `[[...]]`-Markup zeigen klickbare Links

---

## Commit-Konvention

```
v3.8: Engine-Erweiterung — [[mat-id|Text]] Inline-Links in Tipps
```
