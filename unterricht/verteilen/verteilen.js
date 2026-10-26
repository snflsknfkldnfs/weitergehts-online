/* Verteilen — geteiltes Werkzeug: Aufgaben Personen zuteilen und an Zeitbalken sehen, wann alles fertig ist.
   Liest data.json im Ordner der Seite. Je Lage: Startzeit, optional eine Frist, Personen, Aufgaben mit Dauer je Person.
   Jede Person arbeitet ihre Aufgaben nacheinander ab (in der Reihenfolge der Liste), alle Personen zugleich.
   Gezählt wird, wann alles fertig ist — nicht die Summe der Minuten. Nichts wird gespeichert. */
(function () {
  'use strict';

  var daten = null;
  var lageNr = 0;
  var zuteilung = [];   // je Lage: { aufgabeId: personId | null }
  var versuche = [];    // je Lage: [{ schluessel, text, klasse }]

  function el(tag, klasse, text) {
    var e = document.createElement(tag);
    if (klasse) e.className = klasse;
    if (text != null) e.textContent = text;
    return e;
  }

  function minuten(uhr) {
    var t = uhr.split(':');
    return parseInt(t[0], 10) * 60 + parseInt(t[1], 10);
  }

  function uhr(min) {
    var h = Math.floor(min / 60), m = min % 60;
    return h + ':' + (m < 10 ? '0' : '') + m;
  }

  /* Ablauf: je Person die zugeteilten Aufgaben nacheinander ab Start */
  function ablauf(lage, zu) {
    var start = minuten(lage.start);
    var proPerson = {};
    lage.personen.forEach(function (p) { proPerson[p.id] = { ende: start, balken: [] }; });
    lage.aufgaben.forEach(function (a, i) {
      var p = zu[a.id];
      if (!p) return;
      var spur = proPerson[p];
      var dauer = a.dauer[p];
      spur.balken.push({ aufgabe: a, nr: i, von: spur.ende, bis: spur.ende + dauer, dauer: dauer });
      spur.ende += dauer;
    });
    var offen = lage.aufgaben.filter(function (a) { return !zu[a.id]; }).length;
    var ende = start;
    Object.keys(proPerson).forEach(function (k) { ende = Math.max(ende, proPerson[k].ende); });
    return { start: start, proPerson: proPerson, offen: offen, ende: ende };
  }

  function urteil(lage, ab) {
    if (ab.offen > 0) {
      return { text: ab.offen === 1 ? 'Noch 1 Aufgabe ohne Person.' : 'Noch ' + ab.offen + ' Aufgaben ohne Person.', klasse: 'v-offen' };
    }
    if (lage.frist) {
      var frist = minuten(lage.frist);
      if (ab.ende <= frist) return { text: 'Alles fertig um ' + uhr(ab.ende) + ' – rechtzeitig.', klasse: 'v-rechtzeitig' };
      return { text: 'Alles fertig um ' + uhr(ab.ende) + ' – zu spät.', klasse: 'v-zu-spaet' };
    }
    return { text: 'Alles fertig um ' + uhr(ab.ende) + '.', klasse: 'v-rechtzeitig' };
  }

  function zeitenText(lage, a) {
    return lage.personen.map(function (p) { return p.name + ': ' + a.dauer[p.id] + ' Min.'; }).join(' · ');
  }

  function zeichnen() {
    var lage = daten.lagen[lageNr];
    var zu = zuteilung[lageNr];

    // Reiter
    Array.prototype.forEach.call(document.querySelectorAll('.v-lage-knopf'), function (k, i) {
      k.setAttribute('aria-pressed', i === lageNr ? 'true' : 'false');
    });

    // Lage und Aufgaben
    var blatt = document.getElementById('v-lage');
    blatt.innerHTML = '';
    blatt.appendChild(el('h2', null, lage.titel));
    blatt.appendChild(el('p', null, lage.text));
    var liste = el('ul', 'v-aufgaben');
    lage.aufgaben.forEach(function (a) {
      var li = el('li', 'v-aufgabe');
      var name = el('div', 'v-aufgabe-name');
      name.appendChild(el('span', 'v-zeichen v-f' + (a.farbe || 0)));
      name.appendChild(el('span', null, a.name));
      li.appendChild(name);
      li.appendChild(el('div', 'v-zeiten', zeitenText(lage, a)));
      var wahl = el('div', 'v-wahl');
      lage.personen.forEach(function (p) {
        var k = el('button', 'm-knopf', p.name);
        k.type = 'button';
        k.setAttribute('aria-pressed', zu[a.id] === p.id ? 'true' : 'false');
        k.setAttribute('aria-label', a.name + ': ' + p.name);
        k.addEventListener('click', function () {
          zu[a.id] = zu[a.id] === p.id ? null : p.id;
          zeichnen();
        });
        wahl.appendChild(k);
      });
      li.appendChild(wahl);
      liste.appendChild(li);
    });
    blatt.appendChild(liste);

    // Zeitbalken
    var ab = ablauf(lage, zu);
    var frist = lage.frist ? minuten(lage.frist) : null;
    var spanne = Math.max(60, Math.ceil((ab.ende - ab.start) / 10) * 10, frist ? frist - ab.start + 10 : 0);
    function pos(min) { return ((min - ab.start) / spanne * 100) + '%'; }

    var plan = document.getElementById('v-plan');
    plan.innerHTML = '';
    plan.appendChild(el('h2', null, 'Wann ist alles fertig?'));

    var kopf = el('div', 'v-zeile');
    kopf.appendChild(el('span'));
    var achse = el('div', 'v-achse');
    for (var t = 0; t <= spanne; t += 10) {
      var s = el('span', t % 20 ? 'v-strich v-strich-zwischen' : 'v-strich', uhr(ab.start + t));
      s.style.left = pos(ab.start + t);
      achse.appendChild(s);
    }
    if (frist !== null) {
      var schild = el('span', 'v-frist-schild', lage.frist_name || lage.frist);
      schild.style.left = pos(frist);
      achse.appendChild(schild);
    }
    kopf.appendChild(achse);
    kopf.appendChild(el('span'));
    plan.appendChild(kopf);

    lage.personen.forEach(function (p) {
      var spur = ab.proPerson[p.id];
      var zeile = el('div', 'v-zeile');
      zeile.appendChild(el('div', 'v-zeile-name', p.name));
      var bahn = el('div', 'v-zeile-bahn');
      spur.balken.forEach(function (b) {
        var balken = el('div', 'v-balken v-f' + (b.aufgabe.farbe || 0), b.aufgabe.kurz || b.aufgabe.name);
        balken.style.left = pos(b.von);
        balken.style.width = 'calc(' + (b.dauer / spanne * 100) + '% )';
        balken.title = b.aufgabe.name + ', ' + b.dauer + ' Min.';
        bahn.appendChild(balken);
      });
      if (frist !== null) {
        var linie = el('div', 'v-frist');
        linie.style.left = pos(frist);
        bahn.appendChild(linie);
      }
      zeile.appendChild(bahn);
      var endeText = spur.balken.length ? 'fertig um ' + uhr(spur.ende) : 'hat nichts zu tun';
      var ende = el('div', 'v-zeile-ende', endeText);
      if (frist !== null && spur.ende > frist) ende.classList.add('v-zu-spaet');
      zeile.appendChild(ende);
      plan.appendChild(zeile);
    });

    var u = urteil(lage, ab);
    plan.appendChild(el('p', 'v-ergebnis ' + u.klasse, u.text));
    var handeln = el('div', 'v-handlungen');
    var neu = el('button', 'm-knopf', 'Alles neu verteilen');
    neu.type = 'button';
    neu.addEventListener('click', function () {
      lage.aufgaben.forEach(function (a) { zu[a.id] = null; });
      zeichnen();
    });
    handeln.appendChild(neu);
    plan.appendChild(handeln);

    // Versuche merken, sobald alles verteilt ist
    if (ab.offen === 0) {
      var schluessel = lage.aufgaben.map(function (a) { return zu[a.id]; }).join('|');
      var liste2 = versuche[lageNr];
      if (!liste2.some(function (v) { return v.schluessel === schluessel; })) {
        var teile = lage.personen.map(function (p) {
          var meine = lage.aufgaben.filter(function (a) { return zu[a.id] === p.id; })
            .map(function (a) { return a.kurz || a.name; });
          return p.name + ': ' + (meine.length ? meine.join(', ') : 'nichts');
        });
        liste2.push({ schluessel: schluessel, text: teile.join(' · '), urteil: u });
      }
    }
    zeichneVersuche();
  }

  function zeichneVersuche() {
    var box = document.getElementById('v-versuche');
    var liste = versuche[lageNr];
    box.hidden = liste.length === 0;
    box.innerHTML = '';
    if (!liste.length) return;
    box.appendChild(el('h2', null, 'Deine Versuche'));
    var ol = el('ol');
    liste.forEach(function (v) {
      var li = el('li', null, v.text + ' → ');
      li.appendChild(el('span', v.urteil.klasse, v.urteil.text.replace('Alles fertig um ', '')));
      ol.appendChild(li);
    });
    box.appendChild(ol);
  }

  function start(d) {
    daten = d;
    document.title = d.titel;
    document.getElementById('v-titel').textContent = d.titel;
    document.getElementById('v-auftrag').textContent = d.auftrag;
    document.getElementById('v-erfunden').textContent = d.hinweis || '';
    var reiter = document.getElementById('v-lagen');
    d.lagen.forEach(function (lage, i) {
      var leer = {};
      lage.aufgaben.forEach(function (a) { leer[a.id] = null; });
      zuteilung.push(leer);
      versuche.push([]);
      var k = el('button', 'm-knopf v-lage-knopf', lage.reiter || lage.titel);
      k.type = 'button';
      k.addEventListener('click', function () { lageNr = i; zeichnen(); });
      reiter.appendChild(k);
    });
    reiter.hidden = d.lagen.length < 2;
    if (d.nachweis) document.getElementById('v-nachweis').textContent = d.nachweis;
    zeichnen();
  }

  fetch('data.json', { cache: 'no-cache' })
    .then(function (r) { return r.json(); })
    .then(start)
    .catch(function () {
      document.getElementById('v-titel').textContent = 'Die Aufgabe konnte nicht geladen werden. Lade die Seite neu.';
    });
})();
