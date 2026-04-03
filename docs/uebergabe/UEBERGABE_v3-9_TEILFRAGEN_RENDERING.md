# Übergabe-Prompt: Engine v3.9 — Teilfragen-Rendering für Freitext-Aufgaben

**Erstellt:** 2026-04-03 (Session 9, Pre-C2-Patch P3)
**Quelle:** AUDIT_PRE_C2_ERGEBNIS.md → P3
**Betrifft:** escape-engine.js, theme-gpg.css

---

## Kontext

Freitext-Aufgaben (typ="freitext-code") produzieren `_meta.teilfragen` — 2-3 Denkgerüst-Fragen, die SuS bei AFB-III-Aufgaben strukturieren sollen. Aktuell werden diese nicht gerendert. Das didaktische Denkgerüst geht verloren.

## Aufgabe

`_meta.teilfragen` als sichtbare Aufzählung vor dem Textarea rendern, wenn vorhanden.

## Zieldateien

1. `assets/js/escape-engine.js` — Funktion `_renderFreitextCode` erweitern
2. `assets/css/theme-gpg.css` — Styling für Teilfragen-Block

## JS-Patch (escape-engine.js)

In der Funktion, die Freitext-Aufgaben rendert (aktuell `_renderFreitextCode` oder die entsprechende Stelle in der Render-Pipeline): NACH dem Fragetext (`aufgabe__titel`) und VOR dem Textarea folgenden Block einfügen:

```javascript
// Teilfragen-Rendering (v3.9)
if (aufgabe._meta && aufgabe._meta.teilfragen && aufgabe._meta.teilfragen.length > 0) {
  const teilfragenDiv = document.createElement('div');
  teilfragenDiv.className = 'aufgabe__teilfragen';

  const label = document.createElement('p');
  label.className = 'aufgabe__teilfragen-label';
  label.textContent = 'Berücksichtige:';
  teilfragenDiv.appendChild(label);

  const ul = document.createElement('ul');
  ul.className = 'aufgabe__teilfragen-liste';
  aufgabe._meta.teilfragen.forEach(tf => {
    const li = document.createElement('li');
    li.textContent = tf;
    ul.appendChild(li);
  });
  teilfragenDiv.appendChild(ul);

  // Einfügen: nach aufgabe__titel, vor textarea
  // Exakte Einfügestelle hängt von der aktuellen DOM-Struktur ab
  container.appendChild(teilfragenDiv);
}
```

**Hinweis:** Die exakte Einfügestelle hängt von der aktuellen Render-Struktur ab. Das Teilfragen-Div muss zwischen Fragetext und Textarea stehen.

## CSS-Patch (theme-gpg.css)

```css
/* Teilfragen-Denkgerüst (v3.9) */
.aufgabe__teilfragen {
  margin: 0.75rem 0;
  padding: 0.75rem 1rem;
  background: var(--color-surface, #f8f8f4);
  border-left: 3px solid var(--color-primary, #8B4513);
  border-radius: 0 4px 4px 0;
}

.aufgabe__teilfragen-label {
  font-weight: 600;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
  color: var(--color-text, #333);
}

.aufgabe__teilfragen-liste {
  margin: 0;
  padding-left: 1.25rem;
  list-style: decimal;
}

.aufgabe__teilfragen-liste li {
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 0.35rem;
  color: var(--color-text, #333);
}
```

## BEM-Klassen-Referenz

Zielstruktur (aus SUB_AUFGABE_FREITEXT.md Rendering-Kontrakt):

```html
<section class="aufgabe aufgabe--freitext-code">
  <h3 class="aufgabe__titel">[frage]</h3>
  <div class="aufgabe__teilfragen">
    <p class="aufgabe__teilfragen-label">Berücksichtige:</p>
    <ul class="aufgabe__teilfragen-liste">
      <li>[teilfrage 1]</li>
      <li>[teilfrage 2]</li>
    </ul>
  </div>
  <textarea class="freitext__input" rows="6"></textarea>
</section>
```

## Erfolgskriterien

1. Freitext-Aufgaben MIT `_meta.teilfragen` zeigen die Teilfragen als nummerierte Liste vor dem Textarea
2. Freitext-Aufgaben OHNE `_meta.teilfragen` rendern wie bisher (kein visueller Unterschied)
3. Styling passt zum GPG-Theme (erdige Farben, kein visueller Bruch)
4. Mobile-responsive (kein Overflow bei schmalen Viewports)

## Cache-Busting

Nach Patch: `?v=3.9` auf escape-engine.js und theme-gpg.css in ALLEN HTML-Dateien aktualisieren:
- index.html
- mappe-1.html
- mappe-2.html
- mappe-3.html
- lehrkraft.html
- mappe-template.html
- 404.html
- impressum.html

## Rückmeldung

Commit-Message-Vorschlag: "v3.9: Teilfragen-Rendering für Freitext-Aufgaben (_meta.teilfragen → sichtbare Aufzählung vor Textarea)"
