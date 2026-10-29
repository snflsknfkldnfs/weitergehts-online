/* Datenspuren — Anzeigen-Werkstatt (Informatik 6, Kampagnen-Fall).
 *
 * Eine Seite = ein Ordner mit index.html (lädt diese Datei) + data.json (erzeugt von
 * tools/datenspuren/build_datensatz.py, nie von Hand). Links das Profil als fertige Karte (Artefakt 1),
 * rechts die Werbeanzeige als Handy (Artefakt 2). Die Anzeige besteht aus Zeilen; die offene Zeile
 * trägt ihre Eingabe selbst (W-Frage, Textbausteine, eigener Text) — Frage und Antwort stehen am selben Ort
 * (Nachbereitung Inf6b 23.10.: getrennte Frage und Steckbrief verwirrten).
 *
 * data.json:
 * {
 *   "titel", "nutzer", "absender", "auftrag": [..], "hinweis_fiktion",
 *   "profil": [ { "steckbrief", "text" } ],
 *   "zeilen": [ { "id", "ort": "status"|"ueberschrift"|"text"|"knopf", "frage", "hilfe",
 *                 "max_woerter": Zahl|null, "profil_schritt": bool,
 *                 "bausteine": [ { "text", "profil": Profilzeile|null } ] } ],
 *   "fertig": { "titel", "text" }
 * }
 * Profil zuerst (Lehrkraft Inf6b 29.10.): Bei Zeilen mit profil_schritt wählt das Kind zuerst die Profilzeile, die es
 * nutzt; dann erscheinen deren Bausteine und die unpassenden (profil null). Die Herkunft steht klein unter der Zeile,
 * „groß zeigen“ zeigt die Anzeige ohne Herkunft (für die stille Bewertung in der Klasse).
 * Stand nur lokal (localStorage "anzeige-<ordner>"), keine Übertragung.
 */
(function () {
  'use strict';
  var daten = null;
  var stand = { werte: {}, herkunft: {}, offen: 0 };
  var SCHLUESSEL = 'anzeige-' + location.pathname.split('/').filter(Boolean).slice(-1)[0];

  function $(id) { return document.getElementById(id); }
  function el(tag, klasse, text) {
    var e = document.createElement(tag);
    if (klasse) e.className = klasse;
    if (text != null) e.textContent = text;
    return e;
  }
  function laden() {
    try {
      var s = JSON.parse(localStorage.getItem(SCHLUESSEL) || 'null');
      if (s && s.werte) stand = { werte: s.werte, herkunft: s.herkunft || {}, offen: typeof s.offen === 'number' ? s.offen : 0 };
    } catch (e) { /* egal */ }
  }
  function sichern() {
    try { localStorage.setItem(SCHLUESSEL, JSON.stringify(stand)); } catch (e) { /* egal */ }
  }
  function woerter(t) { return (t || '').trim().split(/\s+/).filter(Boolean).length; }
  function fertigZahl() { return daten.zeilen.filter(function (z) { return (stand.werte[z.id] || '').trim(); }).length; }

  /* ── Profil (Artefakt 1, nur lesen) ── */
  function profilZeichnen() {
    var dl = $('a-profil');
    daten.profil.forEach(function (p) {
      var dt = el('dt', null, p.steckbrief), dd = el('dd', 'd-bekannt', p.text);
      dt.setAttribute('data-profil', p.steckbrief);
      dd.setAttribute('data-profil', p.steckbrief);
      dl.appendChild(dt);
      dl.appendChild(dd);
    });
  }
  /* die gewählte Profilzeile der offenen Zeile links markieren */
  function profilMarkieren(name) {
    Array.prototype.forEach.call($('a-profil').children, function (e) {
      e.classList.toggle('a-gewaehlt', !!name && e.getAttribute('data-profil') === name);
    });
  }
  /* gleiche Reihenfolge auf jedem Gerät, aber nicht immer der passende Baustein zuerst */
  function mischen(liste) {
    function h(t) { var x = 0; for (var k = 0; k < t.length; k++) x = (x * 31 + t.charCodeAt(k)) % 9973; return x; }
    return liste.slice().sort(function (a, b) { return h(a.text) - h(b.text); });
  }

  /* ── Handy (Artefakt 2) ── */
  function zeileFertig(z, i) {
    var wert = stand.werte[z.id];
    var b = el('button', 'a-zeile a-ort-' + z.ort + ' a-gefuellt');
    b.type = 'button';
    b.setAttribute('aria-label', 'Zeile ' + (i + 1) + ' ändern: ' + wert);
    if (z.ort === 'knopf') b.appendChild(el('span', 'a-knopf', wert));
    else b.appendChild(el('span', null, wert));
    if (stand.herkunft[z.id]) b.appendChild(el('span', 'a-herkunft', 'aus dem Profil: ' + stand.herkunft[z.id]));
    b.addEventListener('click', function () { stand.offen = i; sichern(); zeichnen(); });
    return b;
  }

  function zeileLeer(z, i) {
    var b = el('button', 'a-zeile a-ort-' + z.ort + ' a-leer', (i + 1) + '  ' + z.frage);
    b.type = 'button';
    b.addEventListener('click', function () { stand.offen = i; sichern(); zeichnen(); });
    return b;
  }

  function zeileOffen(z, i) {
    var box = el('div', 'a-zeile a-offen');
    box.appendChild(el('p', 'a-nr', 'Zeile ' + (i + 1) + ' von ' + daten.zeilen.length));
    box.appendChild(el('p', 'a-frage', z.frage));
    box.appendChild(el('p', 'a-hilfe', z.hilfe));
    var gewaehlt = z.profil_schritt ? stand.herkunft[z.id] : null;
    profilMarkieren(gewaehlt);
    if (z.profil_schritt) {
      var wahl = el('div', 'a-profilwahl');
      wahl.appendChild(el('p', 'a-schritt', gewaehlt ? 'Aus dem Profil: ' + gewaehlt : 'Schritt 1: Welche Zeile im Profil hilft dir?'));
      daten.profil.forEach(function (p) {
        var c = el('button', 'a-profilknopf' + (p.steckbrief === gewaehlt ? ' a-gewaehlt' : ''), p.steckbrief);
        c.type = 'button';
        c.setAttribute('aria-pressed', p.steckbrief === gewaehlt ? 'true' : 'false');
        c.addEventListener('click', function () { stand.herkunft[z.id] = p.steckbrief; sichern(); zeichnen(); });
        wahl.appendChild(c);
      });
      box.appendChild(wahl);
      if (!gewaehlt) return box;
      box.appendChild(el('p', 'a-schritt', 'Schritt 2: Nimm einen Baustein oder schreib selbst.'));
    }
    var feld = el('textarea', 'a-feld');
    feld.rows = z.ort === 'text' ? 3 : 2;
    feld.value = stand.werte[z.id] || '';
    feld.setAttribute('aria-label', z.frage);
    feld.placeholder = 'Baustein antippen oder selbst schreiben';
    var zaehler = el('p', 'a-zaehler');
    var weiter = el('button', 'm-knopf voll a-weiter', i + 1 < daten.zeilen.length ? 'Fertig, nächste Zeile' : 'Fertig, letzte Zeile');
    weiter.type = 'button';
    function pruefen() {
      var n = woerter(feld.value);
      var zuviel = z.max_woerter && n > z.max_woerter;
      zaehler.textContent = z.max_woerter ? n + ' von höchstens ' + z.max_woerter + ' Wörtern' : '';
      zaehler.classList.toggle('a-zuviel', !!zuviel);
      weiter.disabled = !n || !!zuviel;
    }
    var bausteine = el('div', 'a-bausteine');
    var zeigen = z.profil_schritt
      ? mischen(z.bausteine.filter(function (b) { return b.profil === gewaehlt || b.profil === null; }))
      : z.bausteine;
    if (z.profil_schritt && !z.bausteine.some(function (b) { return b.profil === gewaehlt; })) {
      box.appendChild(el('p', 'a-hinweis', 'Zu „' + gewaehlt + '“ gibt es hier keinen Baustein. Tipp eine andere Zeile im Profil an oder schreib selbst einen Satz dazu.'));
    }
    zeigen.forEach(function (b) {
      var t = b.text;
      var c = el('button', 'a-baustein', t);
      c.type = 'button';
      c.addEventListener('click', function () { feld.value = t; pruefen(); feld.focus(); });
      bausteine.appendChild(c);
    });
    feld.addEventListener('input', pruefen);
    weiter.addEventListener('click', function () {
      stand.werte[z.id] = feld.value.trim().replace(/\s+/g, ' ');
      var naechste = daten.zeilen.findIndex(function (zz, k) { return k > i && !(stand.werte[zz.id] || '').trim(); });
      if (naechste < 0) naechste = daten.zeilen.findIndex(function (zz) { return !(stand.werte[zz.id] || '').trim(); });
      stand.offen = naechste;
      sichern();
      zeichnen();
    });
    box.appendChild(bausteine);
    box.appendChild(feld);
    box.appendChild(zaehler);
    box.appendChild(weiter);
    pruefen();
    return box;
  }

  function handyInhalt(nurAnsicht) {
    var h = el('div', 'a-bildschirm');
    daten.zeilen.forEach(function (z, i) {
      var wert = (stand.werte[z.id] || '').trim();
      if (nurAnsicht) {
        if (!wert) return;
        var t = el('div', 'a-zeile a-ort-' + z.ort + ' a-gefuellt');
        if (z.ort === 'knopf') t.appendChild(el('span', 'a-knopf', wert)); else t.textContent = wert;
        h.appendChild(t);
      } else if (i === stand.offen) h.appendChild(zeileOffen(z, i));
      else h.appendChild(wert ? zeileFertig(z, i) : zeileLeer(z, i));
    });
    if (!nurAnsicht) h.insertBefore(el('p', 'a-werbung', 'Anzeige'), h.children[1] || null);
    return h;
  }

  function zeichnen() {
    var handy = $('a-handy');
    handy.textContent = '';
    handy.appendChild(handyInhalt(false));
    var n = fertigZahl();
    $('a-fortschritt').textContent = n + ' von ' + daten.zeilen.length + ' Zeilen';
    var f = $('a-fertig');
    f.textContent = '';
    f.hidden = n < daten.zeilen.length;
    if (!f.hidden) {
      f.appendChild(el('h3', null, daten.fertig.titel));
      f.appendChild(el('p', null, daten.fertig.text));
      var gross = el('button', 'm-knopf voll', 'Anzeige groß zeigen');
      gross.type = 'button';
      gross.addEventListener('click', vollbild);
      f.appendChild(gross);
    }
    if (!handy.querySelector('.a-offen')) profilMarkieren(null);
    var offen = handy.querySelector('.a-offen');
    if (offen && offen.scrollIntoView) offen.scrollIntoView({ block: 'nearest' });
  }

  function vollbild() {
    var hulle = el('div', 'a-vollbild');
    var handy = el('div', 'a-handy a-gross');
    handy.appendChild(handyInhalt(true));
    var zu = el('button', 'm-knopf a-zu', 'Zurück zum Bearbeiten');
    zu.type = 'button';
    zu.addEventListener('click', function () { document.body.removeChild(hulle); });
    hulle.appendChild(handy);
    hulle.appendChild(zu);
    document.body.appendChild(hulle);
  }

  function start() {
    laden();
    fetch('data.json?_=' + Date.now())
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) {
        daten = d;
        document.title = d.titel + ' · Datenspuren';
        $('a-titel').textContent = d.titel;
        $('a-absender').textContent = d.absender;
        $('a-nr').textContent = d.nutzer;
        d.auftrag.forEach(function (t) { $('a-auftrag').appendChild(el('p', null, t)); });
        $('a-fiktion').textContent = d.hinweis_fiktion;
        $('a-neu').addEventListener('click', function () {
          if (!window.confirm('Anzeige wirklich neu beginnen? Alle Zeilen werden geleert.')) return;
          stand = { werte: {}, herkunft: {}, offen: 0 };
          sichern();
          zeichnen();
        });
        if (stand.offen >= d.zeilen.length) stand.offen = 0;
        profilZeichnen();
        zeichnen();
      })
      .catch(function () { $('a-handy').textContent = 'Die Daten konnten nicht geladen werden. Bitte die Seite neu laden.'; });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
