/* Parlament — geteiltes Werkzeug: Mehrheiten selbst zusammenstellen (2026-11-19, GPG8a UE19).
 *
 * Eine Aufgabe = ein Ordner mit index.html (lädt diese Datei) + data.json (erzeugt vom Stunden-Skript, nie von Hand):
 * { "titel", "leitfrage", "auftrag", "aufgaben": [ "…" ], "nachweis",
 *   "wahlen": [ { "label", "gesamt", "parteien": [ { "id", "name", "sitze", "farbe": "#rrggbb", "zusatz" } ] } ] }
 * Das Kind tippt Parteien an; der Balken zeigt die gewählten Sitze auf der Skala aller Sitze, die Linie die Hälfte.
 * Unter dem Balken steht die Summe und ob sie für eine Mehrheit reicht (mehr als die Hälfte). Gerechnet wird hier, nicht
 * vom Kind. Die Wahl bleibt nur auf diesem Gerät (localStorage).
 */
(function () {
  'use strict';
  var D, S = { wahl: 0, an: {} }, KEY;
  function el(tag, klasse, text) { var n = document.createElement(tag); if (klasse) n.className = klasse;
    if (text != null) n.textContent = text; return n; }
  function laden() { try { var s = JSON.parse(localStorage.getItem(KEY)); if (s) S = s; } catch (e) {} }
  function sichern() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function bauen() {
    var w = D.wahlen[S.wahl] || D.wahlen[0];
    var an = S.an[S.wahl] = S.an[S.wahl] || {};
    var blatt = document.getElementById('p-blatt'); blatt.innerHTML = '';
    if (D.wahlen.length > 1) {
      var wahl = el('div', 'p-wahl');
      D.wahlen.forEach(function (x, i) {
        var b = el('button', 'm-knopf', x.label); b.type = 'button'; b.setAttribute('aria-pressed', i === S.wahl);
        b.onclick = function () { S.wahl = i; sichern(); bauen(); }; wahl.appendChild(b);
      });
      blatt.appendChild(wahl);
    }
    blatt.appendChild(el('p', null, w.label + ': ' + w.gesamt + ' Sitze. Tipp die Parteien an, die zusammen regieren sollen.'));
    var gitter = el('div', 'p-parteien');
    w.parteien.forEach(function (p) {
      var b = el('button', 'p-partei'); b.type = 'button';
      var ist = !!an[p.id]; b.setAttribute('aria-pressed', ist);
      b.style.borderColor = p.farbe; if (ist) b.style.background = p.farbe;
      b.appendChild(el('b', null, p.name)); b.appendChild(el('span', null, p.sitze + ' Sitze' + (p.zusatz ? ' · ' + p.zusatz : '')));
      b.onclick = function () { an[p.id] = !an[p.id]; sichern(); bauen(); };
      gitter.appendChild(b);
    });
    blatt.appendChild(gitter);
    var balken = el('div', 'p-balken'), summe = 0;
    w.parteien.forEach(function (p) {
      if (!an[p.id]) return; summe += p.sitze;
      var i = el('i'); i.style.width = (100 * p.sitze / w.gesamt) + '%'; i.style.background = p.farbe; i.title = p.name;
      balken.appendChild(i);
    });
    balken.appendChild(el('span', 'p-linie'));
    blatt.appendChild(balken);
    var haelfte = w.gesamt / 2;
    blatt.appendChild(el('p', 'p-linie-text', 'Linie: die Hälfte (' + haelfte + ' Sitze). Mehrheit = mehr als die Hälfte.'));
    var reicht = summe > haelfte;
    var erg = el('p', 'p-ergebnis ' + (summe ? (reicht ? 'ja' : 'nein') : ''),
      summe ? ('Zusammen: ' + summe + ' von ' + w.gesamt + ' Sitzen. ' + (reicht ? 'Das ist eine Mehrheit.' : 'Das reicht nicht für eine Mehrheit.'))
            : 'Noch keine Partei gewählt.');
    blatt.appendChild(erg);
    var z = el('button', 'm-knopf', 'Alle abwählen'); z.type = 'button'; z.style.marginTop = '12px';
    z.onclick = function () { S.an[S.wahl] = {}; sichern(); bauen(); }; blatt.appendChild(z);
    if (D.aufgaben && D.aufgaben.length) {
      var ol = el('ol', 'p-aufgaben'); D.aufgaben.forEach(function (a) { ol.appendChild(el('li', null, a)); });
      blatt.appendChild(ol);
    }
  }
  fetch('data.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (d) {
    D = d; KEY = 'parlament:' + location.pathname; laden();
    document.title = d.titel; document.getElementById('p-titel').textContent = d.titel;
    document.getElementById('p-auftrag').textContent = d.auftrag || '';
    document.getElementById('p-fuss').textContent = d.nachweis || '';
    bauen();
  });
})();
