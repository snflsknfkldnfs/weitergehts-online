/* Folien — geteiltes Werkzeug: die Folien einer Stunde als Webseite für den Beamer (2026-11-12, Inf6b).
 *
 * Wozu: Im Computerraum lässt sich das Gerät der Lehrkraft nicht an den Beamer hängen; der Schul-PC öffnet nur die
 * Website. Eine Stunde = ein Ordner mit index.html (lädt diese Datei) + data.json (erzeugt vom Stunden-Skript in der
 * Kurs-Welt, nie von Hand).
 *
 * Bedienung: → / Leertaste / Bild-ab / Klick auf „weiter“ = nächster Schritt (erst aufdecken, dann nächste Folie),
 * ← / Bild-auf = zurück, F = Vollbild, N = Notiz der Lehrkraft ein/aus. Die Folie steht in der Adresse (#3).
 * Tippfelder (Vermutungen der Klasse) bleiben im Browser dieses Geräts (localStorage), nichts verlässt das Gerät.
 *
 * data.json:
 * { "titel", "speicher": "<Schlüssel für localStorage>",
 *   "folien": [ { "kopf"?, "titel"?, "absaetze"?: [..], "punkte"?: [..], "nummeriert"?: bool,
 *                 "aufdecken"?: bool (Punkte bzw. Zeitstrahl einzeln aufdecken),
 *                 "zeitung"?: { "titel", "schlagzeile", "text" },
 *                 "zeitstrahl"?: [ { "zeit", "text" } ],
 *                 "eingabe"?: { "label", "zeilen" },
 *                 "link"?: { "text", "url" },
 *                 "ziel"?: "Fertig: …",
 *                 "merke"?: "Satz",
 *                 "notiz"?: "Moderation für die Lehrkraft" } ] }
 */
(function () {
  'use strict';
  var daten = null, nr = 0, offen = 0;
  var buehne = document.getElementById('f-buehne');

  function el(tag, klasse, text) {
    var n = document.createElement(tag);
    if (klasse) n.className = klasse;
    if (text != null) n.textContent = text;
    return n;
  }
  function knopf(text, klasse, beiKlick) {
    var k = el('button', 'm-knopf ' + (klasse || ''), text);
    k.type = 'button';
    k.addEventListener('click', beiKlick);
    return k;
  }
  function lesen(k) { try { return localStorage.getItem(k) || ''; } catch (e) { return ''; } }
  function schreiben(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ohne Speicher */ } }

  function schritte(f) {
    if (!f.aufdecken) return 0;
    return (f.zeitstrahl || f.punkte || []).length;
  }

  function zeichnen() {
    var f = daten.folien[nr];
    while (buehne.firstChild) buehne.removeChild(buehne.firstChild);
    var blatt = el('section', 'f-folie m-blatt');
    if (f.kopf) blatt.appendChild(el('p', 'f-kopf', f.kopf));
    if (f.titel) blatt.appendChild(el('h1', 'f-titel', f.titel));
    if (f.zeitung) {
      var z = el('figure', 'f-zeitung');
      z.appendChild(el('figcaption', 'f-zeitung-name', f.zeitung.titel));
      z.appendChild(el('p', 'f-zeitung-schlag', f.zeitung.schlagzeile));
      z.appendChild(el('p', null, f.zeitung.text));
      blatt.appendChild(z);
    }
    (f.absaetze || []).forEach(function (a) { blatt.appendChild(el('p', 'f-absatz', a)); });
    var n = schritte(f);
    if (f.punkte) {
      var liste = el(f.nummeriert ? 'ol' : 'ul', 'f-punkte');
      f.punkte.forEach(function (p, i) {
        var li = el('li', null, p);
        if (f.aufdecken && i >= offen) li.className = 'f-verdeckt';
        liste.appendChild(li);
      });
      blatt.appendChild(liste);
    }
    if (f.zeitstrahl) {
      var zs = el('ol', 'f-zeitstrahl');
      f.zeitstrahl.forEach(function (p, i) {
        var li = el('li', f.aufdecken && i >= offen ? 'f-verdeckt' : null);
        li.appendChild(el('span', 'f-zeit', p.zeit));
        li.appendChild(el('span', null, p.text));
        zs.appendChild(li);
      });
      blatt.appendChild(zs);
    }
    if (f.link) {
      var a = el('a', 'f-link', f.link.text);
      a.href = f.link.url;
      a.target = '_blank';
      a.rel = 'noopener';
      blatt.appendChild(a);
    }
    if (f.eingabe) {
      var lab = el('label', 'f-eingabe');
      lab.appendChild(el('span', 'f-eingabe-label', f.eingabe.label));
      var t = el('textarea');
      t.rows = f.eingabe.zeilen || 4;
      var schl = (daten.speicher || 'folien') + '-' + nr;
      t.value = lesen(schl);
      t.addEventListener('input', function () { schreiben(schl, t.value); });
      t.addEventListener('keydown', function (e) { e.stopPropagation(); });
      lab.appendChild(t);
      blatt.appendChild(lab);
    }
    if (f.merke) {
      var m = el('p', 'f-merke');
      m.appendChild(el('strong', null, 'Merke: '));
      m.appendChild(document.createTextNode(f.merke));
      blatt.appendChild(m);
    }
    if (f.ziel) blatt.appendChild(el('p', 'f-ziel', f.ziel));
    if (f.notiz) {
      var no = el('aside', 'f-notiz', f.notiz);
      no.hidden = !document.body.classList.contains('f-mit-notiz');
      blatt.appendChild(no);
    }
    buehne.appendChild(blatt);

    var leiste = el('nav', 'f-leiste');
    leiste.appendChild(knopf('zurück', '', zurueck));
    leiste.appendChild(el('span', 'f-zaehler m-leise', (nr + 1) + ' / ' + daten.folien.length));
    leiste.appendChild(knopf('Vollbild', '', vollbild));
    leiste.appendChild(knopf(offen < n ? 'aufdecken' : 'weiter', 'voll', weiter));
    buehne.appendChild(leiste);
    if (location.hash !== '#' + (nr + 1)) history.replaceState(null, '', '#' + (nr + 1));
  }

  function gehe(i, alles) {
    nr = Math.max(0, Math.min(daten.folien.length - 1, i));
    offen = alles ? schritte(daten.folien[nr]) : 0;
    zeichnen();
  }
  function weiter() {
    if (offen < schritte(daten.folien[nr])) { offen++; zeichnen(); return; }
    if (nr < daten.folien.length - 1) gehe(nr + 1, false);
  }
  function zurueck() { if (nr > 0) gehe(nr - 1, true); }
  function vollbild() {
    var d = document.documentElement;
    if (document.fullscreenElement) { document.exitFullscreen(); return; }
    if (d.requestFullscreen) d.requestFullscreen();
  }

  document.addEventListener('keydown', function (e) {
    var k = e.key;
    if (k === 'ArrowRight' || k === ' ' || k === 'PageDown' || k === 'Enter') { e.preventDefault(); weiter(); }
    else if (k === 'ArrowLeft' || k === 'PageUp') { e.preventDefault(); zurueck(); }
    else if (k === 'f' || k === 'F') vollbild();
    else if (k === 'n' || k === 'N') { document.body.classList.toggle('f-mit-notiz'); zeichnen(); }
  });

  window.addEventListener('hashchange', function () {
    var h = parseInt((location.hash || '#1').slice(1), 10);
    if (daten && !isNaN(h) && h - 1 !== nr) gehe(h - 1, true);
  });

  fetch('data.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (d) {
    daten = d;
    document.title = d.titel;
    var h = parseInt((location.hash || '#1').slice(1), 10);
    gehe(isNaN(h) ? 0 : h - 1, true);
  }).catch(function () { buehne.textContent = 'Die Folien konnten nicht geladen werden.'; });
})();
