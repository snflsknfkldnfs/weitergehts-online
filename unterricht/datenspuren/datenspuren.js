/* Datenspuren — geteiltes Werkzeug fuer Datenschutz-Faelle (Informatik).
 *
 * Ein Fall = ein Ordner mit index.html (laedt diese Datei) + data.json (erzeugt von
 * tools/datenspuren/build_datensatz.py, nie von Hand). Die Klasse durchsucht einen erfundenen,
 * "anonymen" Datensatz (filtern, sortieren, suchen) und beantwortet Stufe fuer Stufe eine Frage
 * zur Person dahinter. Richtige Antwort -> Steckbrief waechst, naechste Stufe oeffnet sich.
 *
 * data.json:
 * {
 *   "akte":    { "titel", "absender", "briefing": [..], "hinweis_fiktion",
 *                "abschluss": { "titel", "text": [..], "fragen": [..] } },
 *   "phasen":  [ { "id", "titel", "text", "quellen": ["Suche", ..] } ],   // sichtbare Datenquellen je Phase
 *   "zeitung": { "titel", "schlagzeile", "text" }?,                     // nur fuer Stufen mit material "zeitung"
 *   "stufen":  [ { "id", "phase": <Index in phasen>, "steckbrief", "frage", "tipps": [..],
 *                  "modus": "wort"|"zahl", "k": base64(JSON-Liste der Schluesselwoerter),
 *                  "a": base64(UTF-8 Loesungstext fuer den Steckbrief), "erkenntnis", "material": "zeitung"? } ],
 *   "max_woerter": 5
 *   "eintraege": [ { "nutzer", "datum": "JJJJ-MM-TT", "tag": "Mo", "zeit": "HH:MM", "quelle", "eintrag" } ]
 * }
 *
 * Antwortpruefung fehlertolerant (passt()): Gross/klein, Umlaute, Satzzeichen egal, ganze Saetze erlaubt,
 * kleine Tippfehler erlaubt, Zahlen exakt. Schluessel nur Base64-verschleiert, kein Schutz.
 * Spielstand nur lokal (localStorage "datenspur-<ordner>"), keine Uebertragung.
 */
(function () {
  'use strict';

  var daten = null;
  var stand = { geloest: 0, tipps: {} };
  var filter = { nutzer: '', quelle: '', datum: '', von: 0, bis: 23, text: '' };
  var absteigend = false;
  var SCHLUESSEL = 'datenspur-' + (location.pathname.split('/').filter(Boolean).slice(-1)[0] || 'fall');

  function $(id) { return document.getElementById(id); }

  function el(tag, klasse, text) {
    var n = document.createElement(tag);
    if (klasse) n.className = klasse;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ── Speicher (still scheitern: privater Modus, gesperrter Speicher) ── */
  function laden() {
    try {
      var s = JSON.parse(localStorage.getItem(SCHLUESSEL) || 'null');
      if (s && typeof s.geloest === 'number') stand = { geloest: s.geloest, tipps: s.tipps || {} };
    } catch (e) { /* ohne Speicher spielen */ }
  }
  function sichern() {
    try { localStorage.setItem(SCHLUESSEL, JSON.stringify(stand)); } catch (e) { /* egal */ }
  }

  /* ── Antwortpruefung ── */
  /* Spiegel von passt() in tools/datenspuren/build_datensatz.py — beide aendern sich nur gemeinsam.
     Dort wird die Logik bei jedem Lauf gegen Pruefeingaben (richtig/falsch) getestet. */
  function woerter(s) {
    s = String(s).toUpperCase().replace(/Ä/g, 'AE').replace(/Ö/g, 'OE').replace(/Ü/g, 'UE');
    return s.split(/[^A-Z0-9]+/).filter(Boolean);
  }
  function abstand(a, b) {
    var zeile = [], i, j;
    for (j = 0; j <= b.length; j++) zeile.push(j);
    for (i = 1; i <= a.length; i++) {
      var neu = [i];
      for (j = 1; j <= b.length; j++) {
        neu.push(Math.min(zeile[j] + 1, neu[j - 1] + 1, zeile[j - 1] + (a[i - 1] !== b[j - 1] ? 1 : 0)));
      }
      zeile = neu;
    }
    return zeile[b.length];
  }
  /* Loesungstext erst nach dem Loesen sichtbar; im Datensatz nur Base64 (UTF-8) */
  function anzeige(s) {
    if (!s.a) return s.anzeige || '';
    try {
      var bin = atob(s.a), bytes = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return new TextDecoder('utf-8').decode(bytes);
    } catch (e) { return ''; }
  }
  function schluessel(s) {
    try { return JSON.parse(atob(s.k)); } catch (e) { return []; }
  }
  /* true | false | 'zuviel' */
  function passt(eingabe, s) {
    var w = woerter(eingabe), k = schluessel(s);
    if (!w.length) return false;
    if (w.length > (daten.max_woerter || 5)) return 'zuviel';
    if (s.modus === 'zahl') return w.some(function (x) { return k.indexOf(x) !== -1; });
    var zusammen = w.join('');
    return k.some(function (key) {
      if (zusammen.indexOf(key) !== -1) return true;
      var grenze = key.length >= 8 ? 2 : (key.length >= 4 ? 1 : 0);
      return grenze > 0 && w.some(function (x) {
        return Math.abs(x.length - key.length) <= grenze && abstand(x, key) <= grenze;
      });
    });
  }

  /* ── Tabelle ── */
  function datumLang(e) { return e.tag + ' ' + e.datum.slice(8, 10) + '.' + e.datum.slice(5, 7) + '.'; }

  /* Phase = welche Datenquellen gerade sichtbar sind (2006: nur Suche; heute: alles). */
  function phaseIndex() {
    if (!daten.phasen) return -1;
    if (stand.geloest >= daten.stufen.length) return daten.phasen.length - 1;
    return daten.stufen[stand.geloest].phase || 0;
  }
  function erlaubt() {
    var i = phaseIndex();
    return i < 0 ? ['Standort', 'Suche', 'Einkauf', 'App'] : daten.phasen[i].quellen;
  }
  function sichtbar() {
    var q = erlaubt();
    return daten.eintraege.filter(function (e) { return q.indexOf(e.quelle) !== -1; });
  }

  function gefiltert() {
    var t = filter.text.trim().toLowerCase();
    var liste = sichtbar().filter(function (e) {
      var std = parseInt(e.zeit.slice(0, 2), 10);
      var imFenster = filter.von <= filter.bis
        ? (std >= filter.von && std <= filter.bis)
        : (std >= filter.von || std <= filter.bis); /* z. B. 22 bis 6 Uhr ueber Mitternacht */
      return (!filter.nutzer || e.nutzer === filter.nutzer) &&
        (!filter.quelle || e.quelle === filter.quelle) &&
        (!filter.datum || e.datum === filter.datum) &&
        imFenster &&
        (!t || e.eintrag.toLowerCase().indexOf(t) !== -1);
    });
    if (absteigend) liste = liste.slice().reverse();
    return liste;
  }

  function tabelleZeichnen() {
    var liste = gefiltert();
    var tb = $('d-zeilen');
    tb.textContent = '';
    liste.forEach(function (e) {
      var tr = el('tr');
      tr.appendChild(el('td', 'd-nr', e.nutzer));
      tr.appendChild(el('td', 'd-datum', datumLang(e)));
      tr.appendChild(el('td', 'd-zeit', e.zeit));
      var q = el('td');
      q.appendChild(el('span', 'd-marke d-q-' + e.quelle.toLowerCase(), e.quelle));
      tr.appendChild(q);
      tr.appendChild(el('td', 'd-eintrag', e.eintrag));
      tb.appendChild(tr);
    });
    $('d-anzahl').textContent = liste.length + ' von ' + sichtbar().length + ' Einträgen';
    $('d-leer').hidden = liste.length > 0;
    $('d-sortpfeil').textContent = absteigend ? '▲ neueste oben' : '▼ älteste oben';
  }

  function optionen(select, werte, beschriftung) {
    werte.forEach(function (w) {
      var o = el('option', null, beschriftung ? beschriftung(w) : w);
      o.value = w;
      select.appendChild(o);
    });
  }

  function filterEinrichten() {
    var nutzer = {}, tage = {};
    daten.eintraege.forEach(function (e) { nutzer[e.nutzer] = 1; tage[e.datum] = datumLang(e); });
    optionen($('d-f-nutzer'), Object.keys(nutzer).sort());
    optionen($('d-f-datum'), Object.keys(tage).sort(), function (d) { return tage[d]; });
    var stunden = [];
    for (var i = 0; i < 24; i++) stunden.push(String(i));
    optionen($('d-f-von'), stunden, function (s) { return s + ' Uhr'; });
    optionen($('d-f-bis'), stunden, function (s) { return s + ':59 Uhr'; });
    $('d-f-bis').value = '23';

    function lesen() {
      filter.nutzer = $('d-f-nutzer').value;
      filter.quelle = $('d-f-quelle').value;
      filter.datum = $('d-f-datum').value;
      filter.von = parseInt($('d-f-von').value, 10);
      filter.bis = parseInt($('d-f-bis').value, 10);
      filter.text = $('d-f-text').value;
      tabelleZeichnen();
    }
    ['d-f-nutzer', 'd-f-quelle', 'd-f-datum', 'd-f-von', 'd-f-bis'].forEach(function (id) {
      $(id).addEventListener('change', lesen);
    });
    $('d-f-text').addEventListener('input', lesen);
    $('d-f-reset').addEventListener('click', function () {
      ['d-f-nutzer', 'd-f-quelle', 'd-f-datum', 'd-f-text'].forEach(function (id) { $(id).value = ''; });
      $('d-f-von').value = '0';
      $('d-f-bis').value = '23';
      lesen();
    });
    $('d-sort').addEventListener('click', function () { absteigend = !absteigend; tabelleZeichnen(); });
  }

  /* Quellen-Filter und Phasen-Hinweis an die aktuelle Phase anpassen */
  function phaseZeichnen() {
    var sel = $('d-f-quelle');
    var q = erlaubt();
    sel.textContent = '';
    if (q.length > 1) { var alle = el('option', null, 'alle'); alle.value = ''; sel.appendChild(alle); }
    optionen(sel, q);
    sel.disabled = q.length === 1;
    filter.quelle = q.length === 1 ? q[0] : '';
    var i = phaseIndex(), box = $('d-phase');
    if (i < 0) { box.hidden = true; return; }
    box.hidden = false;
    box.textContent = '';
    box.appendChild(el('strong', null, daten.phasen[i].titel + '. '));
    box.appendChild(document.createTextNode(daten.phasen[i].text));
    box.className = 'd-phase d-phase-' + daten.phasen[i].id;
    box.setAttribute('data-phase', daten.phasen[i].id);
  }

  /* ── Akte: Steckbrief, Stufe, Abschluss ── */
  function steckbriefZeichnen() {
    var dl = $('d-steckbrief');
    dl.textContent = '';
    daten.stufen.forEach(function (s, i) {
      dl.appendChild(el('dt', null, s.steckbrief));
      dl.appendChild(el('dd', i < stand.geloest ? 'd-bekannt' : 'd-offen', i < stand.geloest ? anzeige(s) : '?'));
    });
    $('d-fortschritt').textContent = 'Stufe ' + Math.min(stand.geloest + 1, daten.stufen.length) +
      ' von ' + daten.stufen.length;
  }

  function zeitungBox() {
    var z = daten.zeitung;
    var box = el('figure', 'd-zeitung');
    box.appendChild(el('figcaption', null, z.titel));
    box.appendChild(el('h4', null, z.schlagzeile));
    box.appendChild(el('p', null, z.text));
    return box;
  }

  function stufeZeichnen(meldung) {
    var bereich = $('d-stufe');
    bereich.textContent = '';
    steckbriefZeichnen();
    var vorher = $('d-phase').getAttribute('data-phase');
    phaseZeichnen();
    tabelleZeichnen();
    if (meldung && vorher && vorher !== $('d-phase').getAttribute('data-phase')) $('d-phase').classList.add('d-neu');

    if (meldung) {
      var m = el('div', 'd-erkenntnis');
      m.appendChild(el('strong', null, 'Treffer. '));
      m.appendChild(document.createTextNode(meldung));
      bereich.appendChild(m);
    }

    if (stand.geloest >= daten.stufen.length) { abschlussZeichnen(bereich); return; }

    var s = daten.stufen[stand.geloest];
    bereich.appendChild(el('h3', null, 'Stufe ' + (stand.geloest + 1)));
    bereich.appendChild(el('p', 'd-frage', s.frage));
    if (s.material === 'zeitung') bereich.appendChild(zeitungBox());

    var form = el('form', 'd-eingabe');
    var input = el('input');
    input.type = 'text';
    input.autocomplete = 'off';
    input.setAttribute('aria-label', 'Deine Antwort');
    input.placeholder = 'Antwort';
    var knopf = el('button', 'd-knopf', 'Prüfen');
    knopf.type = 'submit';
    form.appendChild(input);
    form.appendChild(knopf);
    var rueck = el('p', 'd-rueck');
    rueck.setAttribute('aria-live', 'polite');
    bereich.appendChild(form);
    bereich.appendChild(rueck);

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var ergebnis = passt(input.value, s);
      if (ergebnis === true) {
        stand.geloest += 1;
        sichern();
        stufeZeichnen(s.erkenntnis);
      } else if (ergebnis === 'zuviel') {
        rueck.textContent = 'Schreib nur ein oder zwei Wörter.';
        input.select();
      } else if (woerter(input.value).length) {
        rueck.textContent = 'Passt noch nicht. Prüf deine Filter.';
        input.select();
      }
    });

    var tippBox = el('div', 'd-tipps');
    var genutzt = stand.tipps[s.id] || 0;
    s.tipps.forEach(function (t, i) {
      if (i < genutzt) tippBox.appendChild(el('p', 'd-tipp', 'Tipp ' + (i + 1) + ': ' + t));
    });
    if (genutzt < s.tipps.length) {
      var tk = el('button', 'd-knopf d-zweit', 'Tipp ' + (genutzt + 1) + ' anzeigen');
      tk.type = 'button';
      tk.addEventListener('click', function () {
        stand.tipps[s.id] = genutzt + 1;
        sichern();
        stufeZeichnen();
      });
      tippBox.appendChild(tk);
    }
    bereich.appendChild(tippBox);
    if (!meldung) input.focus({ preventScroll: true });
  }

  function abschlussZeichnen(bereich) {
    var a = daten.akte.abschluss;
    bereich.appendChild(el('h3', null, a.titel));
    a.text.forEach(function (t) { bereich.appendChild(el('p', null, t)); });
    bereich.appendChild(el('h4', null, 'Besprecht zu zweit:'));
    var ol = el('ol', 'd-fragenliste');
    a.fragen.forEach(function (f) { ol.appendChild(el('li', null, f)); });
    bereich.appendChild(ol);
  }

  function akteEinrichten() {
    var a = daten.akte;
    document.title = a.titel + ' · Datenspuren';
    $('d-titel').textContent = a.titel;
    $('d-absender').textContent = a.absender;
    var br = $('d-briefing');
    a.briefing.forEach(function (t) { br.appendChild(el('p', null, t)); });
    $('d-fiktion').textContent = a.hinweis_fiktion;
    $('d-neu').addEventListener('click', function () {
      if (!window.confirm('Akte wirklich neu beginnen? Dein Steckbrief wird geleert.')) return;
      stand = { geloest: 0, tipps: {} };
      sichern();
      stufeZeichnen();
    });
  }

  function start() {
    laden();
    fetch('data.json?_=' + Date.now())
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) {
        daten = d;
        akteEinrichten();
        filterEinrichten();
        stufeZeichnen();
      })
      .catch(function () {
        $('d-stufe').textContent = 'Die Daten konnten nicht geladen werden. Bitte die Seite neu laden.';
      });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
