/* Kreislauf — geteiltes Werkzeug: Karten auf die Plätze eines Kreislaufs legen (2026-11-19, GPG8a UE19).
 *
 * data.json (erzeugt vom Stunden-Skript, nie von Hand):
 * { "titel", "auftrag", "start": { "text", "farbe" },
 *   "karten": [ { "id", "text", "farbe" } ]   // in der RICHTIGEN Folge nach der Startkarte, im Uhrzeigersinn
 *   "mitte": "…" (steht in der Kreismitte, sobald alles richtig liegt), "nachher": "…", "nachweis": "…" }
 * Bedienung fürs iPad: Karte antippen, dann einen freien Platz; ein belegter Platz gibt seine Karte per Tippen zurück.
 * „Prüfen“ sagt nur, wie viele Karten richtig liegen, nie welche. Die Lage bleibt auf dem Gerät (localStorage).
 */
(function () {
  'use strict';
  var D, KEY, S = { plaetze: [], gewaehlt: null, fertig: false };
  function el(t, k, x) { var n = document.createElement(t); if (k) n.className = k; if (x != null) n.textContent = x; return n; }
  function sichern() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function laden() { try { var s = JSON.parse(localStorage.getItem(KEY)); if (s && s.plaetze) S = s; } catch (e) {} }
  function karte(id) { return D.karten.filter(function (k) { return k.id === id; })[0]; }
  function lagen(n) {
    var r = [];
    for (var i = 0; i < n; i++) { var w = -Math.PI / 2 + 2 * Math.PI * i / n;
      r.push([50 + 34 * Math.cos(w), 50 + 38 * Math.sin(w)]); }
    return r;
  }
  function pfeile(svg, pos) {
    var ns = 'http://www.w3.org/2000/svg';
    svg.setAttribute('viewBox', '0 0 100 100'); svg.setAttribute('preserveAspectRatio', 'none');
    var defs = document.createElementNS(ns, 'defs'), m = document.createElementNS(ns, 'marker');
    m.setAttribute('id', 'k-spitze'); m.setAttribute('viewBox', '0 0 10 10'); m.setAttribute('refX', '8'); m.setAttribute('refY', '5');
    m.setAttribute('markerWidth', '5'); m.setAttribute('markerHeight', '5'); m.setAttribute('orient', 'auto');
    var p = document.createElementNS(ns, 'path'); p.setAttribute('d', 'M0,0 L10,5 L0,10 z'); p.setAttribute('fill', '#666');
    m.appendChild(p); defs.appendChild(m); svg.appendChild(defs);
    for (var i = 0; i < pos.length; i++) {
      var a = pos[i], b = pos[(i + 1) % pos.length];
      var mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      var dx = b[0] - a[0], dy = b[1] - a[1];
      var x1 = a[0] + dx * 0.32, y1 = a[1] + dy * 0.32, x2 = a[0] + dx * 0.68, y2 = a[1] + dy * 0.68;
      var cx = mx + (mx - 50) * 0.35, cy = my + (my - 50) * 0.35;
      var l = document.createElementNS(ns, 'path');
      l.setAttribute('d', 'M' + x1 + ',' + y1 + ' Q' + cx + ',' + cy + ' ' + x2 + ',' + y2);
      l.setAttribute('fill', 'none'); l.setAttribute('stroke', '#666'); l.setAttribute('stroke-width', '0.9');
      l.setAttribute('vector-effect', 'non-scaling-stroke'); l.style.strokeWidth = '3px';
      l.setAttribute('marker-end', 'url(#k-spitze)'); svg.appendChild(l);
    }
  }
  function bauen() {
    var n = D.karten.length + 1, pos = lagen(n);
    var w = document.getElementById('k-inhalt'); w.innerHTML = '';
    var kreis = el('div', 'k-kreis');
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); pfeile(svg, pos); kreis.appendChild(svg);
    pos.forEach(function (p, i) {
      var b = el('button', 'k-platz'); b.type = 'button'; b.style.left = p[0] + '%'; b.style.top = p[1] + '%';
      if (i === 0) { b.className += ' fest'; b.textContent = D.start.text; b.style.background = D.start.farbe; b.style.borderColor = D.start.farbe; b.disabled = true; }
      else {
        var id = S.plaetze[i - 1];
        if (id) { var k = karte(id); b.className += ' belegt'; b.textContent = k.text; b.style.background = k.farbe; b.style.borderColor = k.farbe; }
        else { b.textContent = 'Platz ' + (i + 1); if (S.gewaehlt) b.className += ' ziel'; }
        b.onclick = function () {
          if (S.fertig) return;
          if (S.plaetze[i - 1]) { S.plaetze[i - 1] = null; }
          else if (S.gewaehlt) { S.plaetze[i - 1] = S.gewaehlt; S.gewaehlt = null; }
          meldung(''); sichern(); bauen();
        };
      }
      kreis.appendChild(b);
    });
    if (S.fertig && D.mitte) { var mi = el('div', 'k-mitte'); mi.innerHTML = ''; var t = D.mitte.split('|');
      mi.appendChild(el('b', null, t[0])); if (t[1]) mi.appendChild(el('span', null, t[1])); kreis.appendChild(mi); }
    w.appendChild(kreis);
    var stapel = el('div', 'k-stapel');
    D.karten.slice().sort(function (a, b) { return a.text.length - b.text.length; }).forEach(function (k) {
      if (S.plaetze.indexOf(k.id) >= 0) return;
      var b = el('button', 'k-karte', k.text); b.type = 'button'; b.style.background = k.farbe;
      b.setAttribute('aria-pressed', S.gewaehlt === k.id);
      b.onclick = function () { S.gewaehlt = (S.gewaehlt === k.id ? null : k.id); sichern(); bauen(); };
      stapel.appendChild(b);
    });
    if (!S.fertig) {
      w.appendChild(el('p', 'k-hinweis', 'Tipp eine Karte an, dann einen freien Platz.'));
      w.appendChild(stapel);
    }
    var leiste = el('div', 'k-leiste');
    var pr = el('button', 'm-knopf voll', 'Prüfen'); pr.type = 'button'; pr.onclick = pruefen;
    var neu = el('button', 'm-knopf', 'Neu anfangen'); neu.type = 'button';
    neu.onclick = function () { S = { plaetze: [], gewaehlt: null, fertig: false }; sichern(); bauen(); meldung(''); };
    if (!S.fertig) leiste.appendChild(pr);
    leiste.appendChild(neu); w.appendChild(leiste);
    var me = el('p', 'k-meldung'); me.id = 'k-meldung'; w.appendChild(me);
    if (S.fertig) { me.className += ' ja'; me.textContent = 'Richtig! Der Kreislauf ist geschlossen.';
      if (D.nachher) w.appendChild(el('div', 'k-nachher', D.nachher)); }
  }
  function meldung(t) { var m = document.getElementById('k-meldung'); if (m) m.textContent = t; }
  function pruefen() {
    var gelegt = S.plaetze.filter(Boolean).length;
    if (gelegt < D.karten.length) { meldung('Leg zuerst alle Karten auf einen Platz.'); return; }
    var richtig = D.karten.filter(function (k, i) { return S.plaetze[i] === k.id; }).length;
    if (richtig === D.karten.length) { S.fertig = true; sichern(); bauen(); }
    else meldung(richtig + ' von ' + D.karten.length + ' Karten liegen richtig. Probier weiter.');
  }
  fetch('data.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (d) {
    D = d; KEY = 'kreislauf:' + location.pathname; laden();
    document.title = d.titel; document.getElementById('k-titel').textContent = d.titel;
    document.getElementById('k-auftrag').textContent = d.auftrag || '';
    document.getElementById('k-fuss').textContent = d.nachweis || '';
    bauen();
  });
})();
