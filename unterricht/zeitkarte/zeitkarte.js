/* Zeitkarte — geteiltes Werkzeug: Ereignisse eines Zeitraums auf einer Karte, mit Schieberegler durch die Zeit (2026-11-09, 1.5; 1.6 vom 12.11.: Zeiträume über Jahre; 1.7–1.9: Karte wechselt mit der Zeit, Gebiete statt nur Orte).
 *
 * Eine Aufgabe = ein Ordner mit index.html (lädt diese Datei) + data.json + bilder/. Zwei Ansichten, gewählt über die
 * Adresse: ?ansicht=karte (Vorgabe) oder ?ansicht=werte; ?start=JJJJ-MM-TT setzt den Regler beim Öffnen (Karte);
 * ?orte=alle zeigt alle Orte schon vor ihrem ersten Ereignis grau (1.5, zum Verorten im Plenum am Beamer).
 * Gedacht zum Einbetten in eine Begleiten-Seite (iframe) und für den Tafelrechner. Nichts wird gespeichert.
 *
 * data.json (erzeugt vom Stunden-Skript, nie von Hand pflegen):
 * { "titel", "von": "JJJJ-MM-TT", "bis": "JJJJ-MM-TT", "nachweis",
 *   "karte": { "bild", "breite", "hoehe", "nachweis" },
 *   "skala": "jahre" | fehlt   // 1.6: Regler über mehrere Jahre, Beschriftung und Anzeige nur mit dem Jahr (Heft nennt keinen Tag)
 *   "karten": [ { "von": "JJJJ-MM-TT", "bild", "titel" } ] | fehlt   // 1.7: andere Grundkarte ab einem Datum (Zonen → Staaten)
 *   "flaechen": { "<id>": { "bild", "rand", "spur" } }   // Orte mit "flaeche": "<id>" sind Gebiete: kein Punkt, Umriss und Klick auf das Gebiet | fehlt   // 1.7: Gebietsmaske (PNG, Alpha = Gebiet, Größe der Karte); Ereignis: "flaeche": "<id>"
 *   "orte": { "<id>": { "name", "x", "y" } },                       // Pixel der Kartenvorlage
 *   "seiten": { "<id>": { "name", "farbe" } },                       // Legende, Farbe der Marken
 *   "ereignisse": [ { "datum", "datum_text", "ort", "seite", "titel", "text", "bild": { "src", "unterschrift" } | fehlt } ],
 *   "werte": { "titel", "frage", "stufen": [ { "datum_text", "kurz", "wert_text", "voll", "stellen", "satz",
 *              "bild": { "src", "unterschrift" } | null } ], "nachweis" } | fehlt }
 */
(function () {
  'use strict';
  var wurzel = document.getElementById('z-inhalt');
  var Q = new URLSearchParams(location.search);
  var MONATE = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
  var MONATE_LANG = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober',
                     'November', 'Dezember'];
  var TAG = 86400000;

  function el(tag, klasse, text) {
    var n = document.createElement(tag);
    if (klasse) n.className = klasse;
    if (text != null) n.textContent = text;
    return n;
  }
  function knopf(text) { var b = el('button', 'm-knopf', text); b.type = 'button'; return b; }
  function datum(s) { var t = s.split('-'); return Date.UTC(+t[0], +t[1] - 1, +t[2]); }
  function tagText(ms) { var d = new Date(ms); return d.getUTCDate() + '. ' + MONATE_LANG[d.getUTCMonth()] + ' ' + d.getUTCFullYear(); }

  /* ── Karte mit Zeitregler ─────────────────────────────────────────── */
  /* Seit 1.1 (2026-11-09, Wunsch der Lehrkraft): der Ablauf steht als Liste neben der Karte; jedes Ereignis erscheint
   * als Punkt mit einer kleinen Karte „was wann hier geschah“. Die neueste springt beim Schieben auf; jeden Punkt und
   * jeden Eintrag der Liste kann man antippen (oder mit der Maus darüberfahren), um die Karte erneut zu öffnen. */
  function karte(D) {
    var jahre = D.skala === 'jahre';
    var von = datum(D.von), bis = datum(D.bis), tage = Math.round((bis - von) / TAG);
    var ev = D.ereignisse.map(function (e, k) { return Object.assign({ t: Math.round((datum(e.datum) - von) / TAG), k: k }, e); });
    var start = Q.get('start') ? Math.round((datum(Q.get('start')) - von) / TAG) : 0;
    var tag = Math.max(0, Math.min(isNaN(start) ? 0 : start, tage));
    var alleOrte = Q.get('orte') === 'alle';
    var offen = null;          // Ort, dessen Karte offen ist
    var gewaehlt = null;       // Ereignis, das in der Karte hervorgehoben ist

    var kopf = el('div', 'z-datum');
    var bildfeld = el('div', 'z-karte');
    var img = el('img'); img.src = D.karte.bild; img.alt = 'Karte: ' + D.titel; bildfeld.appendChild(img);
    var kartentitel = el('div', 'z-kartentitel'); kartentitel.hidden = true; bildfeld.appendChild(kartentitel);
    var flaeche = el('div', 'z-flaeche'); flaeche.hidden = true; bildfeld.appendChild(flaeche);
    var rand = el('div', 'z-rand'); rand.hidden = true; bildfeld.appendChild(rand);
    if (D.flaechen) bildfeld.classList.add('z-mit-flaeche');
    var karten = (D.karten || []).map(function (k) { return { t: Math.round((datum(k.von) - datum(D.von)) / TAG), bild: k.bild, titel: k.titel }; });
    function kartenstand() {
      if (!karten.length) return;
      var k = karten[0]; karten.forEach(function (x) { if (x.t <= tag) k = x; });
      if (img.getAttribute('src') !== k.bild) img.src = k.bild;
      kartentitel.textContent = k.titel || ''; kartentitel.hidden = !k.titel;
    }
    function gebiet(e) {
      var key = e && (e.flaeche || (D.orte[e.ort] && D.orte[e.ort].flaeche));
      if (!key || !D.flaechen || !D.flaechen[key]) { flaeche.hidden = true; rand.hidden = true; return; }
      var f = D.flaechen[key], c = D.seiten[e.seite].farbe;
      flaeche.style.webkitMaskImage = flaeche.style.maskImage = 'url(' + f.bild + ')';
      flaeche.style.backgroundColor = c;
      flaeche.hidden = false;
      if (f.rand) { rand.style.webkitMaskImage = rand.style.maskImage = 'url(' + f.rand + ')'; rand.style.backgroundColor = c; rand.hidden = false; }
      else rand.hidden = true;
    }
    var dunkel = el('div', 'z-dunkel'); bildfeld.appendChild(dunkel);
    var infokarte = el('div', 'z-info'); infokarte.hidden = true; bildfeld.appendChild(infokarte);
    /* Fokus (1.3, Lehrkraft 09.11.): erscheint ein Ereignis, dunkelt die Karte kurz ab; hell bleiben nur der neue Ort
     * und seine Infokarte. Danach geht der Fokus weg, damit der nächste Zeitpunkt wieder neu lenken kann. */
    var fokusUhr = null;
    function fokus(id) {
      Object.keys(marken).forEach(function (k) { marken[k].classList.remove('z-fokusmarke'); });
      marken[id].classList.add('z-fokusmarke');
      bildfeld.classList.add('z-fokus');
      clearTimeout(fokusUhr);
      fokusUhr = setTimeout(function () {
        bildfeld.classList.remove('z-fokus');
        marken[id].classList.remove('z-fokusmarke');
      }, 1900);
    }
    var marken = {};
    Object.keys(D.orte).forEach(function (id) {
      var o = D.orte[id];
      var m = el('button', 'z-marke'); m.type = 'button';
      m.style.left = (o.x / D.karte.breite * 100) + '%';
      m.style.top = (o.y / D.karte.hoehe * 100) + '%';
      m.setAttribute('aria-label', o.name + ': was hier geschah');
      m.appendChild(el('span', 'z-punkt'));
      m.appendChild(el('span', 'z-name', o.name));
      m.hidden = true;
      if (o.flaeche) m.classList.add('z-gebiet');
      m.addEventListener('click', function () { if (offen === id) zu(); else auf(id, null); });
      m.addEventListener('mouseenter', function () { auf(id, null); });
      bildfeld.appendChild(m);
      marken[id] = m;
    });

    /* 1.9 (Lehrkraft 12.11.): Gebiete statt Punkte. Ein Ort mit "flaeche" hat keinen Punkt und keine Beschriftung; sein Gebiet
     * zeigt nach dem ersten Ereignis einen dünnen Umriss, ein Klick auf das Gebiet (Pixelprobe in der Maske) öffnet die Karte. */
    var gebiete = {};
    var GB = 400;
    Object.keys(D.orte).forEach(function (id) {
      var k = D.orte[id].flaeche;
      if (!k || !D.flaechen || !D.flaechen[k] || gebiete[k]) return;
      var g = { spur: el('div', 'z-spur'), flaeche: D.flaechen[k], alpha: null, groesse: 0 };
      g.spur.hidden = true;
      if (g.flaeche.spur) g.spur.style.webkitMaskImage = g.spur.style.maskImage = 'url(' + g.flaeche.spur + ')';
      bildfeld.insertBefore(g.spur, flaeche);
      var im = new Image();
      im.onload = function () {
        var c = document.createElement('canvas'); c.width = GB; c.height = Math.round(GB * D.karte.hoehe / D.karte.breite);
        var x = c.getContext('2d'); x.drawImage(im, 0, 0, c.width, c.height);
        g.alpha = x.getImageData(0, 0, c.width, c.height);
        for (var i = 3; i < g.alpha.data.length; i += 4) if (g.alpha.data[i] > 127) g.groesse++;
      };
      im.src = g.flaeche.bild;
      gebiete[k] = g;
    });
    bildfeld.addEventListener('click', function (ev_) {
      if (infokarte.contains(ev_.target) || (ev_.target.closest && ev_.target.closest('.z-marke'))) return;
      var r = img.getBoundingClientRect(), fx = (ev_.clientX - r.left) / r.width, fy = (ev_.clientY - r.top) / r.height;
      if (fx < 0 || fx > 1 || fy < 0 || fy > 1) return;
      var best = null;
      Object.keys(D.orte).forEach(function (id) {
        var k = D.orte[id].flaeche, g = k && gebiete[k];
        if (!g || !g.alpha) return;
        var hier = bisher().filter(function (e) { return e.ort === id; });
        if (!hier.length) return;
        var ix = Math.min(g.alpha.width - 1, Math.floor(fx * g.alpha.width)), iy = Math.min(g.alpha.height - 1, Math.floor(fy * g.alpha.height));
        if (g.alpha.data[(iy * g.alpha.width + ix) * 4 + 3] < 128) return;
        var neu = hier[hier.length - 1].t;
        if (!best || g.groesse < best.g || (g.groesse === best.g && neu > best.t)) best = { id: id, g: g.groesse, t: neu };
      });
      if (best) auf(best.id, null); else if (offen) zu();
    });

    function bisher() { return ev.filter(function (e) { return e.t <= tag; }); }
    function zu() { offen = null; gewaehlt = null; infokarte.hidden = true; gebiet(null); markieren(); }
    function auf(id, e) {
      var hier = bisher().filter(function (x) { return x.ort === id; });
      if (!hier.length) return;
      offen = id; gewaehlt = e || hier[hier.length - 1]; gebiet(gewaehlt);
      infokarte.replaceChildren();
      var x = el('button', 'z-zu', '×'); x.type = 'button'; x.setAttribute('aria-label', 'Schließen');
      x.addEventListener('click', function (ev_) { ev_.stopPropagation(); zu(); });
      infokarte.appendChild(x);
      infokarte.appendChild(el('h3', null, D.orte[id].name));
      /* zeitlich von oben nach unten, mit Pfeil dazwischen (Lehrkraft 09.11.) */
      hier.forEach(function (h, k) {
        if (k > 0) infokarte.appendChild(el('div', 'z-pfeil', '↓'));
        var b = el('div', h === gewaehlt ? 'z-ie z-ie-gewaehlt' : 'z-ie');
        b.style.borderColor = D.seiten[h.seite].farbe;
        b.appendChild(el('strong', null, h.datum_text + ': ' + h.titel));
        b.appendChild(el('p', null, h.text));
        if (h === gewaehlt && h.bild) {
          var f = el('figure', 'z-iebild'); var bi = el('img'); bi.src = h.bild.src; bi.alt = h.bild.unterschrift; bi.loading = 'lazy';
          f.appendChild(bi); f.appendChild(el('figcaption', 'm-leise', h.bild.unterschrift)); b.appendChild(f);
        }
        infokarte.appendChild(b);
      });
      var o = D.orte[id], px = o.x / D.karte.breite, py = o.y / D.karte.hoehe;
      infokarte.style.left = infokarte.style.right = infokarte.style.top = infokarte.style.bottom = '';
      // in der Hälfte gegenüber dem Punkt, ganz innerhalb der Karte; der Punkt bleibt sichtbar und ist hervorgehoben
      if (px > 0.5) infokarte.style.left = '1%'; else infokarte.style.right = '1%';
      if (py > 0.5) infokarte.style.top = '1%'; else infokarte.style.bottom = '1%';
      infokarte.hidden = false;
      markieren();
    }

    var regler = el('input', 'z-regler');
    regler.type = 'range'; regler.min = 0; regler.max = tage; regler.step = 1; regler.value = tag;
    regler.setAttribute('aria-label', 'Datum wählen');
    var skala = el('div', 'z-skala');
    if (jahre) {
      for (var jj = new Date(von).getUTCFullYear(); jj <= new Date(bis).getUTCFullYear(); jj++) {
        var js = Date.UTC(jj, 0, 1);
        if (js < von || js > bis) continue;
        var sj = el('span', 'z-monat', String(jj)); sj.style.left = ((js - von) / TAG / tage * 100) + '%'; skala.appendChild(sj);
      }
    } else for (var mo = 0; mo < 12; mo++) {
      var ms = Date.UTC(new Date(von).getUTCFullYear(), mo, 1);
      if (ms < von || ms > bis) continue;
      var s = el('span', 'z-monat', MONATE[mo]); s.style.left = ((ms - von) / TAG / tage * 100) + '%'; skala.appendChild(s);
    }
    ev.forEach(function (e) {
      var k = el('span', 'z-strich'); k.style.left = (e.t / tage * 100) + '%';
      k.style.background = D.seiten[e.seite].farbe; skala.appendChild(k);
    });

    var zur = knopf('◀ voriges'), vor = knopf('nächstes ▶'), spiel = knopf('▶ Abspielen');
    var leiste = el('div', 'z-leiste'); leiste.appendChild(zur); leiste.appendChild(spiel); leiste.appendChild(vor);
    var legende = el('div', 'z-legende');
    Object.keys(D.seiten).forEach(function (id) {
      var l = el('span', 'z-leg'); var p = el('span', 'z-punkt'); p.style.background = D.seiten[id].farbe;
      l.appendChild(p); l.appendChild(document.createTextNode(D.seiten[id].name)); legende.appendChild(l);
    });
    var liste = el('ol', 'z-liste');
    var eintraege = ev.map(function (e) {
      var li = el('li', 'z-ev');
      var b = el('button', 'z-evknopf'); b.type = 'button';
      var p = el('span', 'z-punkt'); p.style.background = D.seiten[e.seite].farbe; b.appendChild(p);
      var tx = el('span'); tx.appendChild(el('strong', null, e.datum_text)); tx.appendChild(document.createTextNode(' · ' + D.orte[e.ort].name + ': ' + e.titel));
      b.appendChild(tx);
      b.addEventListener('click', function () { auf(e.ort, e); });
      li.appendChild(b); liste.appendChild(li);
      return li;
    });

    function markieren() {
      eintraege.forEach(function (li, k) { li.classList.toggle('z-ev-gewaehlt', !!gewaehlt && gewaehlt.k === k); });
      Object.keys(marken).forEach(function (id) { marken[id].classList.toggle('z-offen', offen === id); });
    }
    function zeichnen(neuOeffnen) {
      kartenstand();
      kopf.textContent = jahre ? String(new Date(von + tag * TAG).getUTCFullYear()) : tagText(von + tag * TAG);
      var b = bisher();
      var letzter = b.length ? b[b.length - 1] : null;
      Object.keys(gebiete).forEach(function (k) {
        var evs = b.filter(function (e) { return D.orte[e.ort].flaeche === k; });
        gebiete[k].spur.hidden = !evs.length;
        if (evs.length) gebiete[k].spur.style.backgroundColor = D.seiten[evs[evs.length - 1].seite].farbe;
      });
      Object.keys(marken).forEach(function (id) {
        var hier = b.filter(function (e) { return e.ort === id; });
        var m = marken[id];
        m.hidden = !hier.length && !alleOrte;
        m.classList.toggle('z-leer', !hier.length);
        if (!hier.length) m.querySelector('.z-punkt').style.background = '#bdbdbd';
        if (hier.length) {
          m.querySelector('.z-punkt').style.background = D.seiten[hier[hier.length - 1].seite].farbe;
          m.classList.toggle('z-neu', !!letzter && hier[hier.length - 1] === letzter);
        }
      });
      eintraege.forEach(function (li, k) { li.hidden = ev[k].t > tag; li.classList.toggle('z-ev-neu', !!letzter && letzter.k === k); });
      if (neuOeffnen && letzter) { auf(letzter.ort, letzter); fokus(letzter.ort); }
      else if (offen && !b.some(function (e) { return e.ort === offen; })) zu();
      else if (offen) auf(offen, gewaehlt && gewaehlt.t <= tag ? gewaehlt : null);
      var leer = !b.length;
      hinweis.hidden = !leer;
      if (letzter) { var li = eintraege[letzter.k]; /* kein Mitscrollen: die Karte bleibt im Blick */ }
    }
    var hinweis = el('p', 'm-leise z-leerhinweis', 'Schieb den Regler nach rechts: Was geschieht wann und wo?');
    function setze(x, neu) { tag = Math.max(0, Math.min(x, tage)); regler.value = tag; zeichnen(neu); }
    regler.addEventListener('input', function () {
      stopp();
      var vorher = bisher().length; tag = +regler.value; var nachher = bisher().length;
      zeichnen(nachher !== vorher);
    });
    zur.addEventListener('click', function () {
      stopp(); var p = ev.filter(function (e) { return e.t < tag; }); setze(p.length ? p[p.length - 1].t : 0, true);
    });
    vor.addEventListener('click', function () {
      stopp(); var n = ev.filter(function (e) { return e.t > tag; }); if (n.length) setze(n[0].t, true);
    });
    var uhr = null;
    function stopp() { if (uhr) { clearInterval(uhr); uhr = null; spiel.textContent = '▶ Abspielen'; } }
    spiel.addEventListener('click', function () {
      if (uhr) { stopp(); return; }
      if (tag >= tage) setze(0, false);
      spiel.textContent = '❚❚ Anhalten';
      uhr = setInterval(function () {
        var n = ev.filter(function (e) { return e.t > tag; });
        if (!n.length) { stopp(); return; }
        setze(n[0].t, true);
      }, 2200);
    });

    /* 1.2 (Lehrkraft 09.11.): die Karte so groß wie möglich; Datum, Regler und Knöpfe unter der Karte, der Ablauf darunter */
    var blatt = el('section', 'z-blatt m-blatt');
    blatt.appendChild(bildfeld);
    var unter = el('div', 'z-unter'); unter.appendChild(kopf); unter.appendChild(leiste); blatt.appendChild(unter);
    var reg = el('div', 'z-reglerfeld'); reg.appendChild(regler); reg.appendChild(skala); blatt.appendChild(reg);
    blatt.appendChild(legende);
    var ablauf = el('div', 'z-ablaufteil'); ablauf.appendChild(el('h3', 'z-ablauf', 'Ablauf')); ablauf.appendChild(hinweis); ablauf.appendChild(liste);
    blatt.appendChild(ablauf);
    if (D.karte.nachweis) blatt.appendChild(el('p', 'z-nachweis m-leise', D.karte.nachweis));
    wurzel.appendChild(blatt);
    zeichnen(true);
  }

  /* ── Werte über die Zeit (Stufenregler) ───────────────────────────── */
  function werte(D) {
    var W = D.werte, n = W.stufen.length, i = 0;
    var blatt = el('section', 'z-blatt m-blatt');
    blatt.appendChild(el('h2', 'z-frage', W.frage));
    var dat = el('div', 'z-datum');
    var zahl = el('div', 'z-zahl');
    var voll = el('div', 'z-voll');
    var balken = el('div', 'z-balken'); var fuell = el('span'); balken.appendChild(fuell);
    var satz = el('p', 'z-satz');
    var fig = el('figure', 'z-bild'); var bimg = el('img'); var cap = el('figcaption', 'm-leise');
    fig.appendChild(bimg); fig.appendChild(cap);
    var regler = el('input', 'z-regler'); regler.type = 'range'; regler.min = 0; regler.max = n - 1; regler.step = 1; regler.value = 0;
    regler.setAttribute('aria-label', 'Datum wählen');
    var skala = el('div', 'z-skala z-stufen');
    W.stufen.forEach(function (s, k) {
      var m = el('span', 'z-monat', s.kurz || s.datum_text); m.style.left = (k / (n - 1) * 100) + '%'; skala.appendChild(m);
    });
    var maxst = Math.max.apply(null, W.stufen.map(function (s) { return s.stellen; }));
    var minst = Math.min.apply(null, W.stufen.map(function (s) { return s.stellen; }));
    function zeichnen() {
      var s = W.stufen[i];
      dat.textContent = s.datum_text;
      zahl.textContent = s.wert_text;
      voll.textContent = s.voll + ' Mark';
      fuell.style.width = (12 + 88 * (s.stellen - minst) / Math.max(1, maxst - minst)) + '%';
      satz.textContent = s.satz;
      if (s.bild) { fig.hidden = false; bimg.src = s.bild.src; bimg.alt = s.bild.unterschrift; cap.textContent = s.bild.unterschrift; }
      else fig.hidden = true;
    }
    regler.addEventListener('input', function () { i = +regler.value; zeichnen(); });
    blatt.appendChild(dat); blatt.appendChild(zahl); blatt.appendChild(voll); blatt.appendChild(balken);
    var reg = el('div', 'z-reglerfeld'); reg.appendChild(regler); reg.appendChild(skala); blatt.appendChild(reg);
    blatt.appendChild(satz); blatt.appendChild(fig);
    blatt.appendChild(el('p', 'z-hinweis m-leise', 'Der Balken wächst mit der Zahl der Stellen: Jede Stufe ist ein Vielfaches der vorigen.'));
    if (W.nachweis) blatt.appendChild(el('p', 'z-nachweis m-leise', W.nachweis));
    wurzel.appendChild(blatt);
    zeichnen();
  }

  fetch('data.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (D) {
    document.title = D.titel;
    if (Q.get('ansicht') === 'werte' && D.werte) werte(D); else karte(D);
  }).catch(function () {
    wurzel.appendChild(el('p', null, 'Die Daten konnten nicht geladen werden. Lade die Seite neu.'));
  });
})();
