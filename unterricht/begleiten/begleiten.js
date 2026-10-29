/* Begleiten — geteiltes Werkzeug: die Stunde Schritt für Schritt auf dem iPad (2026-10-29).
 *
 * Eine Stunde = ein Ordner mit index.html (lädt diese Datei) + data.json. Die Schritte folgen den Phasen der Stunde;
 * die Lehrkraft sagt an, wann es weitergeht, die Reiter oben zeigen, wo die Klasse steht. Gesichert wird auf Papier;
 * was das Kind hier tippt, bleibt im Browser dieses Geräts (localStorage), nichts verlässt das Gerät.
 *
 * data.json (erzeugt vom Stunden-Skript, nie von Hand pflegen):
 * { "titel", "leitfrage", "auftrag", "speicher", "ki_hilfe": bool, "ki_hinweis", "nachweis",
 *   "schritte": [
 *     { "id", "reiter", "titel", "auftrag", "typ": "sortieren",
 *       "faecher": [ { "id", "name" } ],
 *       "karten": [ { "id", "text", "amtlich": "<Name eines Fachs oder Satz>", "erklaerung" } ],
 *       "aufloesung_titel", "erkenntnis" },
 *     { "id", "reiter", "titel", "auftrag", "typ": "lesen",
 *       "materialien": [ MATERIAL ], "fragen": [ FRAGE ],
 *       "seiten": [ { "id", "name", "materialien": [ MATERIAL ], "fragen": [ FRAGE ] } ] | fehlt } ] }
 * MATERIAL = { "kennung", "kopf", "wer", "wann", "absaetze": [ "Wortlaut mit {{Wort}}" | { "eigen": "Satz" } ],
 *              "entlastet": [ … ] | fehlt, "glossar": { "Wort": "Erklärung" }, "plakat": { "bild", "unterschrift" },
 *              "ki_prompt", "nachweis" }
 * FRAGE = { "id", "fundstelle", "frage", "loesung" }
 */
(function () {
  'use strict';

  var DUCKAI = 'https://duck.ai/?q=';
  var D, S, schluessel;
  var wurzel = document.getElementById('b-inhalt');

  function el(tag, klasse, text) {
    var n = document.createElement(tag);
    if (klasse) n.className = klasse;
    if (text != null) n.textContent = text;
    return n;
  }
  function knopf(text, voll) { var b = el('button', 'm-knopf' + (voll ? ' voll' : ''), text); b.type = 'button'; return b; }

  function laden() {
    try { S = JSON.parse(localStorage.getItem(schluessel)) || null; } catch (e) { S = null; }
    if (!S) S = { schritt: 0, sortiert: {}, aufgeloest: {}, antworten: {}, verglichen: {}, seite: {} };
  }
  function sichern() { try { localStorage.setItem(schluessel, JSON.stringify(S)); } catch (e) { /* ohne Speicher weiter */ } }

  /* ── Text: {{Wort}} wird antippbar, die Erklärung erscheint unter dem Absatz ── */
  function absatzBauen(a, glossar) {
    if (a && typeof a === 'object') return el('p', 'b-eigen', a.eigen);
    var p = el('p', 'b-wortlaut');
    var erkl = null;
    String(a).split(/(\{\{[^}]+\}\})/).forEach(function (teil) {
      var m = teil.match(/^\{\{([^}]+)\}\}$/);
      if (!m) { p.appendChild(document.createTextNode(teil)); return; }
      var wort = m[1];
      if (!glossar[wort]) { p.appendChild(document.createTextNode(wort)); return; }
      var w = el('button', 'b-wort', wort); w.type = 'button';
      w.addEventListener('click', function () {
        if (!erkl) { erkl = el('span', 'b-erklaerung'); p.appendChild(erkl); }
        erkl.textContent = wort + ': ' + glossar[wort];
      });
      p.appendChild(w);
    });
    return p;
  }

  function kopieren(t) {
    try { navigator.clipboard.writeText(t); } catch (e) { /* ohne Zwischenablage weiter */ }
  }
  function kiKnopf(m) {
    var b = knopf('Mit KI verstehen');
    b.classList.add('b-ki');
    b.setAttribute('aria-label', 'Mit KI verstehen: ' + (m.kennung || m.kopf));
    var hinweis = el('span', 'b-ki-hinweis m-leise');
    b.addEventListener('click', function () {
      kopieren(m.ki_prompt);
      var f = null;
      try { f = window.open(DUCKAI + encodeURIComponent(m.ki_prompt), '_blank', 'noopener,noreferrer'); } catch (e) { f = null; }
      hinweis.textContent = f ? '' : 'Popup blockiert – der Text ist kopiert, duck.ai selbst öffnen';
    });
    var h = el('div', 'b-ki-zeile'); h.appendChild(b); h.appendChild(hinweis);
    return h;
  }

  function materialBauen(m) {
    var art = el('article', 'b-material m-blatt');
    var kopf = el('header', 'b-mkopf');
    if (m.kennung) kopf.appendChild(el('span', 'b-kennung', m.kennung));
    kopf.appendChild(el('h3', null, m.kopf));
    art.appendChild(kopf);
    if (m.wer || m.wann) art.appendChild(el('p', 'b-wer m-leise', [m.wer, m.wann].filter(Boolean).join(' · ')));
    var glossar = m.glossar || {};
    var wortlaut = el('div', 'b-text');
    m.absaetze.forEach(function (a) { wortlaut.appendChild(absatzBauen(a, glossar)); });
    if (m.entlastet && m.entlastet.length) {
      var leicht = el('div', 'b-text');
      leicht.appendChild(el('p', 'b-marke', 'Leichter lesen – nicht der Originaltext'));
      m.entlastet.forEach(function (a) { leicht.appendChild(absatzBauen(a, glossar)); });
      var reiter = el('div', 'b-fassungen');
      var k1 = knopf('Originaltext'), k2 = knopf('Leichter lesen');
      function zeigen(leichtZeigen) {
        wortlaut.hidden = leichtZeigen; leicht.hidden = !leichtZeigen;
        k1.setAttribute('aria-pressed', String(!leichtZeigen)); k2.setAttribute('aria-pressed', String(leichtZeigen));
      }
      k1.addEventListener('click', function () { zeigen(false); });
      k2.addEventListener('click', function () { zeigen(true); });
      reiter.appendChild(k1); reiter.appendChild(k2);
      art.appendChild(reiter); art.appendChild(wortlaut); art.appendChild(leicht);
      zeigen(false);
    } else {
      art.appendChild(wortlaut);
    }
    if (m.plakat) {
      var fig = el('figure', 'b-plakat');
      var a = el('a'); a.href = m.plakat.bild; a.target = '_blank'; a.rel = 'noopener';
      var img = el('img'); img.src = m.plakat.bild; img.alt = m.plakat.unterschrift || ''; img.loading = 'lazy';
      a.appendChild(img); fig.appendChild(a);
      if (m.plakat.unterschrift) fig.appendChild(el('figcaption', 'm-leise', m.plakat.unterschrift));
      art.appendChild(fig);
    }
    if (D.ki_hilfe && m.ki_prompt) art.appendChild(kiKnopf(m));
    if (m.nachweis) art.appendChild(el('p', 'b-nachweis m-leise', m.nachweis));
    return art;
  }

  /* ── Fragen: Antwort tippen, dann mit dem Material vergleichen ── */
  function frageBauen(f, nr) {
    var li = el('li', 'b-frage');
    if (f.fundstelle) li.appendChild(el('p', 'b-fundstelle m-leise', 'Lies ' + f.fundstelle));
    li.appendChild(el('p', 'b-fragetext', nr + '. ' + f.frage));
    var feld = el('textarea', 'b-antwort'); feld.rows = 2;
    feld.setAttribute('aria-label', 'Deine Antwort zu Frage ' + nr);
    feld.value = S.antworten[f.id] || '';
    var vergleich = knopf('Vergleichen');
    var loesung = el('p', 'b-loesung');
    function stand() {
      vergleich.disabled = !feld.value.trim();
      loesung.hidden = !S.verglichen[f.id];
      loesung.textContent = 'So steht es im Material: ' + f.loesung;
    }
    feld.addEventListener('input', function () { S.antworten[f.id] = feld.value; sichern(); stand(); });
    vergleich.addEventListener('click', function () { S.verglichen[f.id] = true; sichern(); stand(); });
    li.appendChild(feld); li.appendChild(vergleich); li.appendChild(loesung);
    stand();
    return li;
  }

  function teilBauen(materialien, fragen, wohin) {
    (materialien || []).forEach(function (m) { wohin.appendChild(materialBauen(m)); });
    if (fragen && fragen.length) {
      var box = el('section', 'b-fragen m-blatt');
      box.appendChild(el('h3', null, 'Deine Fragen'));
      var ol = el('ol', 'b-fragenliste');
      fragen.forEach(function (f, i) { ol.appendChild(frageBauen(f, i + 1)); });
      box.appendChild(ol);
      wohin.appendChild(box);
    }
  }

  function lesenBauen(s, wohin) {
    if (!s.seiten) { teilBauen(s.materialien, s.fragen, wohin); return; }
    var wahl = el('div', 'b-seitenwahl');
    var raum = el('div', 'b-seite');
    s.seiten.forEach(function (seite) {
      var k = knopf(seite.name);
      k.setAttribute('aria-pressed', String(S.seite[s.id] === seite.id));
      k.addEventListener('click', function () { S.seite[s.id] = seite.id; sichern(); zeichnen(); });
      wahl.appendChild(k);
    });
    wohin.appendChild(wahl);
    var gewaehlt = s.seiten.filter(function (x) { return x.id === S.seite[s.id]; })[0];
    if (gewaehlt) teilBauen(gewaehlt.materialien, gewaehlt.fragen, raum);
    else raum.appendChild(el('p', 'b-hinweis m-leise', 'Tipp oben auf deine Seite.'));
    wohin.appendChild(raum);
  }

  /* ── Sortieren: je Karte ein Fach antippen, dann die Auflösung ── */
  function sortierenBauen(s, wohin) {
    var sortiert = S.sortiert[s.id] = S.sortiert[s.id] || {};
    var offen = !S.aufgeloest[s.id];
    var liste = el('ol', 'b-karten');
    s.karten.forEach(function (k, i) {
      var li = el('li', 'b-karte m-blatt');
      li.appendChild(el('p', 'b-kartentext', (i + 1) + '. ' + k.text));
      var reihe = el('div', 'b-faecher');
      s.faecher.forEach(function (f) {
        var b = knopf(f.name);
        b.setAttribute('aria-pressed', String(sortiert[k.id] === f.id));
        b.disabled = !offen;
        b.addEventListener('click', function () { sortiert[k.id] = f.id; sichern(); zeichnen(); });
        reihe.appendChild(b);
      });
      li.appendChild(reihe);
      if (!offen) {
        var du = s.faecher.filter(function (f) { return f.id === sortiert[k.id]; })[0];
        var a = el('p', 'b-amtlich');
        a.appendChild(el('strong', null, 'Amtlich: ' + k.amtlich));
        a.appendChild(document.createTextNode(' – ' + k.erklaerung));
        li.appendChild(a);
        li.appendChild(el('p', 'b-du m-leise', 'Du: ' + (du ? du.name : '–')));
      }
      liste.appendChild(li);
    });
    wohin.appendChild(liste);
    var fertig = s.karten.every(function (k) { return sortiert[k.id]; });
    if (offen) {
      var auf = knopf('Auflösung zeigen', true);
      auf.disabled = !fertig;
      auf.addEventListener('click', function () { S.aufgeloest[s.id] = true; sichern(); zeichnen(); });
      var zeile = el('div', 'b-aktion'); zeile.appendChild(auf);
      if (!fertig) zeile.appendChild(el('span', 'm-leise', 'Erst jeden Fall einordnen.'));
      wohin.appendChild(zeile);
    } else {
      var e = el('section', 'b-erkenntnis m-blatt');
      e.appendChild(el('h3', null, s.aufloesung_titel || 'Was fällt dir auf?'));
      e.appendChild(el('p', null, s.erkenntnis));
      wohin.appendChild(e);
    }
  }

  function zeichnen() {
    var nr = Math.min(S.schritt || 0, D.schritte.length - 1);
    var reiter = document.getElementById('b-reiter');
    reiter.textContent = '';
    D.schritte.forEach(function (s, i) {
      var k = knopf(s.reiter);
      k.setAttribute('aria-pressed', String(i === nr));
      k.addEventListener('click', function () { S.schritt = i; sichern(); zeichnen(); window.scrollTo(0, 0); });
      reiter.appendChild(k);
    });
    var s = D.schritte[nr];
    wurzel.textContent = '';
    var kopf = el('header', 'b-schrittkopf');
    kopf.appendChild(el('h2', null, s.titel));
    if (s.auftrag) kopf.appendChild(el('p', 'b-auftrag', s.auftrag));
    wurzel.appendChild(kopf);
    if (s.typ === 'sortieren') sortierenBauen(s, wurzel);
    else lesenBauen(s, wurzel);
    if (nr < D.schritte.length - 1) {
      var weiter = knopf('Weiter: ' + D.schritte[nr + 1].reiter);
      weiter.addEventListener('click', function () { S.schritt = nr + 1; sichern(); zeichnen(); window.scrollTo(0, 0); });
      var z = el('div', 'b-weiter'); z.appendChild(el('span', 'm-leise', 'Erst, wenn deine Lehrkraft es sagt.')); z.appendChild(weiter);
      wurzel.appendChild(z);
    }
  }

  function start(d) {
    D = d;
    schluessel = 'begleiten:' + (d.speicher || location.pathname);
    laden();
    document.title = d.titel;
    document.getElementById('b-titel').textContent = d.titel;
    if (d.leitfrage) document.getElementById('b-leitfrage').textContent = d.leitfrage;
    if (d.auftrag) document.getElementById('b-auftrag').textContent = d.auftrag;
    if (d.ki_hilfe && d.ki_hinweis) { var h = document.getElementById('b-ki-hinweis'); h.textContent = d.ki_hinweis; h.hidden = false; }
    if (d.nachweis) document.getElementById('b-nachweis').textContent = d.nachweis;
    var neu = document.getElementById('b-neu');
    neu.addEventListener('click', function () {
      if (!window.confirm('Alles auf diesem Gerät löschen und neu anfangen?')) return;
      try { localStorage.removeItem(schluessel); } catch (e) { /* ohne Speicher weiter */ }
      laden(); zeichnen();
    });
    zeichnen();
  }

  fetch('data.json', { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(start)
    .catch(function () { wurzel.textContent = 'Die Seite konnte nicht geladen werden. Bitte neu laden.'; });
})();
