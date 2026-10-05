/* Quellen — geteiltes Werkzeug fuer Quellenarbeit am Tablet.
 *
 * Eine Aufgabe = ein Ordner mit index.html (laedt diese Datei) + data.json.
 * Die Mechanik kennt keinen Inhalt: sie zeigt Quellen nebeneinander (quer) oder
 * untereinander (hoch), macht Fachwoerter antippbar, zeigt ein Bild je Quelle zum
 * Vergroessern und bietet je Quelle einen KI-Knopf. Antworten werden NICHT hier
 * eingetragen — die Sicherung bleibt auf Papier.
 *
 * data.json (erzeugt vom Stunden-Skript, nie von Hand pflegen):
 * {
 *   "titel", "leitfrage", "auftrag",
 *   "fragen_titel": "...", "fragen": [ "..." ],      // worauf beim Lesen achten
 *   "ki_hilfe": true, "ki_hinweis": "...",
 *   "quellen": [ { "id", "kennung", "farbe": "blau"|"rot"|..., "seite", "kopf", "wer", "wann",
 *                  "absaetze": [ "Text mit {{Fachwort}}" ], "glossar": { "Fachwort": "Erklaerung" },
 *                  "nachweis", "plakat": { "bild", "unterschrift", "nachweis" } | null,
 *                  "ki_prompt": "..." } ]
 * }
 */
(function () {
  'use strict';

  var DUCKAI = 'https://duck.ai/?q=';

  function el(tag, klasse, text) {
    var n = document.createElement(tag);
    if (klasse) n.className = klasse;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ── Fachwoerter: Antippen blendet die Erklaerung direkt dahinter ein ── */
  function absatzBauen(text, glossar) {
    var p = el('p', 'q-absatz');
    var teile = text.split(/(\{\{.+?\}\})/);
    teile.forEach(function (t) {
      var m = /^\{\{(.+?)\}\}$/.exec(t);
      if (!m) { p.appendChild(document.createTextNode(t)); return; }
      var wort = m[1];
      var b = el('button', 'q-wort', wort);
      b.type = 'button';
      b.setAttribute('aria-expanded', 'false');
      var erkl = el('span', 'q-erkl', glossar[wort] || '');
      erkl.hidden = true;
      b.addEventListener('click', function () {
        var auf = erkl.hidden;
        erkl.hidden = !auf;
        b.setAttribute('aria-expanded', auf ? 'true' : 'false');
        b.classList.toggle('q-offen', auf);
      });
      p.appendChild(b);
      p.appendChild(erkl);
    });
    return p;
  }

  /* ── KI-Knopf: Prompt steht fertig in data.json, hier nur kopieren + oeffnen ── */
  function kopieren(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(function () { ersatzKopie(text); });
    } else { ersatzKopie(text); }
  }

  function ersatzKopie(text) {
    var ta = el('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }

  function kiKnopf(q) {
    var huelle = el('div', 'q-ki-huelle');
    var b = el('button', 'q-ki', '✨ KI-Hilfe zu ' + q.kennung);
    b.type = 'button';
    b.addEventListener('click', function () {
      kopieren(q.ki_prompt);
      var f = null;
      try { f = window.open(DUCKAI + encodeURIComponent(q.ki_prompt), '_blank', 'noopener,noreferrer'); }
      catch (e) { f = null; }
      var alt = huelle.querySelector('.q-ki-hinweis');
      if (alt) huelle.removeChild(alt);
      var m = el('span', 'q-ki-hinweis', f
        ? 'Tab geöffnet – Frage eintippen und Enter'
        : 'Popup blockiert – der Text ist kopiert, duck.ai selbst öffnen');
      m.setAttribute('role', 'status');
      huelle.appendChild(m);
      setTimeout(function () { if (m.parentNode) m.parentNode.removeChild(m); }, f ? 4000 : 7000);
    });
    huelle.appendChild(b);
    return huelle;
  }

  /* ── Bild gross: eigenes Vollbild, Zoomen mit zwei Fingern ── */
  function grossZeigen(src, alt) {
    var d = document.getElementById('q-gross');
    d.querySelector('img').src = src;
    d.querySelector('img').alt = alt;
    d.hidden = false;
    document.body.classList.add('q-gesperrt');
  }

  function quelleBauen(q, mitKi) {
    var art = el('article', 'q-quelle q-' + (q.farbe || 'grau'));
    art.id = q.id;
    var kopf = el('header', 'q-qkopf');
    var zeile = el('div', 'q-qzeile');
    zeile.appendChild(el('span', 'q-kennung', q.kennung));
    zeile.appendChild(el('span', 'q-seite', q.seite));
    kopf.appendChild(zeile);
    kopf.appendChild(el('h2', null, q.kopf));
    kopf.appendChild(el('p', 'q-wer', q.wer));
    kopf.appendChild(el('p', 'q-wann', q.wann));
    art.appendChild(kopf);

    var text = el('div', 'q-text');
    q.absaetze.forEach(function (a) { text.appendChild(absatzBauen(a, q.glossar || {})); });
    art.appendChild(text);
    art.appendChild(el('p', 'q-nachweis', q.nachweis));
    if (mitKi && q.ki_prompt) art.appendChild(kiKnopf(q));

    if (q.plakat) {
      var fig = el('figure', 'q-plakat');
      var knopf = el('button', 'q-bildknopf');
      knopf.type = 'button';
      knopf.setAttribute('aria-label', 'Bild vergrößern: ' + q.plakat.unterschrift);
      var img = el('img');
      img.src = q.plakat.bild; img.alt = q.plakat.unterschrift; img.loading = 'lazy';
      knopf.appendChild(img);
      knopf.appendChild(el('span', 'q-lupe', 'Antippen zum Vergrößern'));
      knopf.addEventListener('click', function () { grossZeigen(q.plakat.bild, q.plakat.unterschrift); });
      fig.appendChild(knopf);
      var cap = el('figcaption');
      cap.appendChild(el('span', null, q.plakat.unterschrift));
      cap.appendChild(el('small', null, q.plakat.nachweis));
      fig.appendChild(cap);
      art.appendChild(fig);
    }
    return art;
  }

  function aufbauen(d) {
    document.title = d.titel;
    document.getElementById('q-titel').textContent = d.titel;
    document.getElementById('q-leitfrage').textContent = d.leitfrage;
    document.getElementById('q-auftrag').textContent = d.auftrag;
    if (d.fragen && d.fragen.length) {
      var box = document.getElementById('q-fragen');
      box.appendChild(el('h2', null, d.fragen_titel || 'Darauf achtet ihr'));
      var ol = el('ol');
      d.fragen.forEach(function (f) { ol.appendChild(el('li', null, f)); });
      box.appendChild(ol);
      box.hidden = false;
    }
    if (d.ki_hilfe && d.ki_hinweis) {
      var h = document.getElementById('q-ki-text');
      h.textContent = d.ki_hinweis; h.hidden = false;
    }
    var raum = document.getElementById('q-quellen');
    d.quellen.forEach(function (q) { raum.appendChild(quelleBauen(q, !!d.ki_hilfe)); });

    var gross = document.getElementById('q-gross');
    gross.querySelector('.q-zu').addEventListener('click', function () {
      gross.hidden = true; document.body.classList.remove('q-gesperrt');
    });
  }

  fetch('data.json', { cache: 'no-store' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(aufbauen)
    .catch(function () {
      document.getElementById('q-auftrag').textContent =
        'Die Quellen konnten nicht geladen werden. Bitte die Seite neu laden.';
    });
})();
