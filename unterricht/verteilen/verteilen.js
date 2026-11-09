/* Verteilen — geteiltes Werkzeug: Aufgaben Personen zuteilen und an Zeitbalken sehen, wann alles fertig ist.
   Liest data.json im Ordner der Seite. Eine Seite hat eine oder mehrere Lagen (Reiter), je Lage eine Art:
     "verteilen" (Vorgabe): Startzeit, optional Frist, Personen, Aufgaben mit Dauer je Person; zuteilen und sehen.
     "vergleich": je Arbeit zwei Balken (schnellere und langsamere Person), der Rückstand markiert; eine Frage zum Antippen.
   Eine Lage "verteilen" kann eine "these" tragen (steht über den Aufgaben) und eine "erkenntnis" (Form wie "vergleich"):
   die Erkenntnis klappt erst auf, wenn die Lage einmal rechtzeitig gelöst ist, und führt danach zur nächsten Lage.
     "eigen":     die Klasse trägt Personen, Aufgaben und Minuten selbst ein und verteilt dann wie bei "verteilen".
     "woche":     Wochenplan-Rennen: je Arbeit (feste Tage) eine Person antippen; ein Balken je Person; gezählt wird
                  die längste Wochenzeit gegenüber dem bisherigen Plan (Zeitgewinn); danach der Plan als Wochenplan.
                  Eigener Abschnitt unten („Art woche“).
   Jede Person arbeitet ihre Aufgaben nacheinander ab (in der Reihenfolge der Liste), alle Personen zugleich.
   Gezählt wird, wann alles fertig ist — nicht die Summe der Minuten. Nichts wird gespeichert. */
(function () {
  'use strict';

  var daten = null;
  var lageNr = 0;
  var zuteilung = [];   // je Lage: { aufgabeId: personId | null }
  var versuche = [];    // je Lage: [{ schluessel, text, urteil }]
  var antwort = {};     // je Frage (Lage oder Erkenntnis): gewählter Index
  var eigenZaehler = 0;
  var abgespielt = [];  // je Lage: Schlüssel der zuletzt ganz abgespielten Verteilung
  var laufend = null;   // laufende Wiedergabe (requestAnimationFrame)

  function el(tag, klasse, text) {
    var e = document.createElement(tag);
    if (klasse) e.className = klasse;
    if (text != null) e.textContent = text;
    return e;
  }

  function leeren(e) { while (e.firstChild) e.removeChild(e.firstChild); }

  function minuten(uhr) {
    var t = uhr.split(':');
    return parseInt(t[0], 10) * 60 + parseInt(t[1], 10);
  }

  function uhr(min) {
    var h = Math.floor(min / 60), m = min % 60;
    return h + ':' + (m < 10 ? '0' : '') + m;
  }

  function knopf(text, klasse, beiKlick) {
    var k = el('button', 'm-knopf' + (klasse ? ' ' + klasse : ''), text);
    k.type = 'button';
    k.addEventListener('click', beiKlick);
    return k;
  }

  /* ── Rechnung ────────────────────────────────────────────────────── */
  function ablauf(lage, zu) {
    var start = minuten(lage.start);
    var proPerson = {};
    lage.personen.forEach(function (p) { proPerson[p.id] = { ende: start, balken: [] }; });
    lage.aufgaben.forEach(function (a) {
      var p = zu[a.id];
      if (!p || !proPerson[p]) return;
      var spur = proPerson[p];
      var dauer = Math.max(0, parseInt(a.dauer[p], 10) || 0);
      spur.balken.push({ aufgabe: a, von: spur.ende, bis: spur.ende + dauer, dauer: dauer });
      spur.ende += dauer;
    });
    var offen = lage.aufgaben.filter(function (a) { return !zu[a.id] || !proPerson[zu[a.id]]; }).length;
    var ende = start;
    Object.keys(proPerson).forEach(function (k) { ende = Math.max(ende, proPerson[k].ende); });
    return { start: start, proPerson: proPerson, offen: offen, ende: ende };
  }

  function urteil(lage, ab) {
    if (!lage.aufgaben.length) return { text: 'Trag zuerst eine Aufgabe ein.', klasse: 'v-offen' };
    if (ab.offen > 0) {
      return { text: ab.offen === 1 ? 'Noch 1 Aufgabe ohne Person.' : 'Noch ' + ab.offen + ' Aufgaben ohne Person.', klasse: 'v-offen' };
    }
    if (lage.frist) {
      if (ab.ende <= minuten(lage.frist)) return { text: 'Alles fertig um ' + uhr(ab.ende) + ' – rechtzeitig.', klasse: 'v-rechtzeitig' };
      return { text: 'Alles fertig um ' + uhr(ab.ende) + ' – zu spät.', klasse: 'v-zu-spaet' };
    }
    return { text: 'Alles fertig um ' + uhr(ab.ende) + '.', klasse: 'v-rechtzeitig' };
  }

  function zeitenText(lage, a) {
    return lage.personen.map(function (p) { return p.name + ': ' + a.dauer[p.id] + ' Min.'; }).join(' · ');
  }

  /* ── Teile der Seite ─────────────────────────────────────────────── */
  function aufgabenListe(lage, zu) {
    var liste = el('ul', 'v-aufgaben');
    lage.aufgaben.forEach(function (a) {
      var li = el('li', 'v-aufgabe');
      var name = el('div', 'v-aufgabe-name');
      name.appendChild(el('span', 'v-zeichen v-f' + (a.farbe || 0)));
      name.appendChild(el('span', null, a.name));
      li.appendChild(name);
      li.appendChild(el('div', 'v-zeiten', zeitenText(lage, a)));
      li.appendChild(wahlKnoepfe(lage, zu, a));
      liste.appendChild(li);
    });
    return liste;
  }

  function wahlKnoepfe(lage, zu, a) {
    var wahl = el('div', 'v-wahl');
    lage.personen.forEach(function (p) {
      var k = knopf(p.name, null, function () {
        zu[a.id] = zu[a.id] === p.id ? null : p.id;
        zeichnen();
      });
      k.setAttribute('aria-pressed', zu[a.id] === p.id ? 'true' : 'false');
      k.setAttribute('aria-label', (a.name || 'Aufgabe') + ': ' + p.name);
      wahl.appendChild(k);
    });
    return wahl;
  }

  function schluesselVon(lage, zu) {
    return lage.aufgaben.map(function (a) { return a.id + '=' + zu[a.id] + ':' +
      lage.personen.map(function (p) { return a.dauer[p.id]; }).join(','); }).join('|') +
      '|' + (lage.frist || '') + '|' + lage.personen.map(function (p) { return p.id; }).join(',');
  }

  /* Grund am Ende: wer zur Frist noch arbeitet, und woran */
  function grund(lage, ab) {
    if (!lage.frist || ab.offen > 0) return '';
    var frist = minuten(lage.frist);
    var spaet = [];
    lage.personen.forEach(function (p) {
      var spur = ab.proPerson[p.id];
      if (spur.ende <= frist) return;
      var dran = spur.balken.filter(function (b) { return b.bis > frist; }).map(function (b) { return b.aufgabe.kurz || b.aufgabe.name; });
      spaet.push(p.name + ' arbeitet noch bis ' + uhr(spur.ende) + ' (' + dran.join(', ') + ')');
    });
    if (!spaet.length) return 'Um ' + lage.frist + ' sind alle fertig.';
    return 'Um ' + lage.frist + ' ist noch nicht alles fertig: ' + spaet.join('; ') + '.';
  }

  function versuchMerken(lage, zu, u) {
    var schluessel = lage.aufgaben.map(function (a) { return zu[a.id]; }).join('|');
    var liste = versuche[lageNr];
    if (liste.some(function (v) { return v.schluessel === schluessel; })) return;
    var teile = lage.personen.map(function (p) {
      var meine = lage.aufgaben.filter(function (a) { return zu[a.id] === p.id; })
        .map(function (a) { return a.kurz || a.name; });
      return p.name + ': ' + (meine.length ? meine.join(', ') : 'nichts');
    });
    liste.push({ schluessel: schluessel, text: teile.join(' · '), urteil: u });
  }

  /* Plan: Bahnen je Person. Erst nach „Start“ läuft die Zeit; Balken wachsen mit, das Ergebnis kommt am Ende. */
  function planZeichnen(lage, zu, mitVersuchen) {
    if (laufend) { cancelAnimationFrame(laufend); laufend = null; }
    var ab = ablauf(lage, zu);
    var frist = lage.frist ? minuten(lage.frist) : null;
    var spanne = Math.max(60, Math.ceil((ab.ende - ab.start) / 10) * 10, frist ? frist - ab.start + 10 : 0);
    function pos(min) { return ((min - ab.start) / spanne * 100) + '%'; }
    var key = schluesselVon(lage, zu);
    var fertig = abgespielt[lageNr] === key && ab.offen === 0;

    var plan = document.getElementById('v-plan');
    plan.hidden = false;
    leeren(plan);
    plan.appendChild(el('h2', null, 'Wann ist alles fertig?'));

    var kopf = el('div', 'v-zeile');
    kopf.appendChild(el('span'));
    var achse = el('div', 'v-achse');
    var schritt = spanne > 120 ? 20 : 10;
    for (var t = 0; t <= spanne; t += schritt) {
      var s = el('span', (t % (2 * schritt)) ? 'v-strich v-strich-zwischen' : 'v-strich', uhr(ab.start + t));
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

    var zeiger = [];   // Zeitstrich je Bahn
    var balkenAlle = [];
    var enden = {};
    lage.personen.forEach(function (p) {
      var spur = ab.proPerson[p.id];
      var zeile = el('div', 'v-zeile');
      zeile.appendChild(el('div', 'v-zeile-name', p.name));
      var bahn = el('div', 'v-zeile-bahn');
      spur.balken.forEach(function (b) {
        var balken = el('div', 'v-balken v-f' + (b.aufgabe.farbe || 0), b.aufgabe.kurz || b.aufgabe.name);
        balken.style.left = pos(b.von);
        balken.style.width = fertig ? (b.dauer / spanne * 100) + '%' : '0';
        balken.style.visibility = fertig ? 'visible' : 'hidden';
        balken.title = (b.aufgabe.name || 'Aufgabe') + ', ' + b.dauer + ' Min.';
        bahn.appendChild(balken);
        balkenAlle.push({ el: balken, b: b });
      });
      if (frist !== null) {
        var linie = el('div', 'v-frist');
        linie.style.left = pos(frist);
        bahn.appendChild(linie);
      }
      var jetzt = el('div', 'v-jetzt');
      jetzt.hidden = true;
      bahn.appendChild(jetzt);
      zeiger.push(jetzt);
      zeile.appendChild(bahn);
      var endeText = '';
      if (fertig) endeText = spur.balken.length ? 'fertig um ' + uhr(spur.ende) : 'hat nichts zu tun';
      var ende = el('div', 'v-zeile-ende', endeText);
      if (fertig && frist !== null && spur.ende > frist) ende.classList.add('v-zu-spaet');
      enden[p.id] = ende;
      zeile.appendChild(ende);
      plan.appendChild(zeile);
    });

    var uhrzeile = el('p', 'v-uhrzeile');
    plan.appendChild(uhrzeile);

    var u = urteil(lage, ab);
    var ergebnis = el('p', 'v-ergebnis');
    var begruendung = el('p', 'v-grund');
    if (fertig) {
      ergebnis.textContent = u.text;
      ergebnis.className = 'v-ergebnis ' + u.klasse;
      begruendung.textContent = grund(lage, ab);
    } else if (ab.offen > 0 || !lage.aufgaben.length) {
      ergebnis.textContent = u.text;
      ergebnis.className = 'v-ergebnis v-offen';
    } else {
      ergebnis.textContent = 'Alles verteilt. Drück auf Start und schau zu, wer wann was macht.';
      ergebnis.className = 'v-ergebnis v-offen';
    }
    plan.appendChild(ergebnis);
    plan.appendChild(begruendung);

    var handeln = el('div', 'v-handlungen');
    var startKnopf = knopf(fertig ? 'Noch einmal abspielen' : 'Start', fertig ? null : 'voll', function () {
      abspielen();
    });
    startKnopf.disabled = ab.offen > 0 || !lage.aufgaben.length;
    handeln.appendChild(startKnopf);
    handeln.appendChild(knopf('Alles neu verteilen', null, function () {
      lage.aufgaben.forEach(function (a) { zu[a.id] = null; });
      zeichnen();
    }));
    plan.appendChild(handeln);

    function abspielen() {
      startKnopf.disabled = true;
      ergebnis.textContent = '';
      begruendung.textContent = '';
      Object.keys(enden).forEach(function (k) { enden[k].textContent = ''; enden[k].classList.remove('v-zu-spaet'); });
      balkenAlle.forEach(function (x) { x.el.style.width = '0'; x.el.style.visibility = 'hidden'; });
      zeiger.forEach(function (z) { z.hidden = false; });
      var dauerMs = Math.max(6000, Math.min(14000, (ab.ende - ab.start) * 160));
      var bisMin = ab.ende - ab.start;
      var t0 = null;
      function schritt(zeit) {
        if (t0 === null) t0 = zeit;
        var anteil = Math.min(1, (zeit - t0) / dauerMs);
        var jetzt = ab.start + anteil * bisMin;
        zeiger.forEach(function (z) { z.style.left = pos(jetzt); });
        balkenAlle.forEach(function (x) {
          var w = Math.max(0, Math.min(x.b.dauer, jetzt - x.b.von));
          x.el.style.width = (w / spanne * 100) + '%';
          x.el.style.visibility = w > 0 ? 'visible' : 'hidden';
        });
        var tun = lage.personen.map(function (p) {
          var spur = ab.proPerson[p.id];
          var dran = spur.balken.filter(function (b) { return b.von <= jetzt && jetzt < b.bis; })[0];
          var text = dran ? (dran.aufgabe.kurz || dran.aufgabe.name) : (spur.balken.length && jetzt >= spur.ende ? 'fertig' : 'nichts zu tun');
          enden[p.id].textContent = dran ? dran.aufgabe.kurz || dran.aufgabe.name : (text === 'fertig' ? 'fertig um ' + uhr(spur.ende) : '');
          return p.name + ': ' + text;
        });
        uhrzeile.textContent = uhr(Math.floor(jetzt)) + ' Uhr · ' + tun.join(' · ');
        if (anteil < 1) { laufend = requestAnimationFrame(schritt); return; }
        laufend = null;
        abgespielt[lageNr] = key;
        if (mitVersuchen) versuchMerken(lage, zu, u);
        zeichnen();
      }
      laufend = requestAnimationFrame(schritt);
    }

    versucheZeichnen(mitVersuchen);
    return fertig && u.klasse === 'v-rechtzeitig';
  }

  function versucheZeichnen(zeigen) {
    var box = document.getElementById('v-versuche');
    var liste = versuche[lageNr];
    leeren(box);
    box.hidden = !zeigen || liste.length === 0;
    if (box.hidden) return;
    box.appendChild(el('h2', null, 'Deine Versuche'));
    var ol = el('ol');
    liste.forEach(function (v) {
      var li = el('li', null, v.text + ' → ');
      li.appendChild(el('span', v.urteil.klasse, v.urteil.text.replace('Alles fertig um ', '')));
      ol.appendChild(li);
    });
    box.appendChild(ol);
  }

  /* ── Art „vergleich“: Rückstand je Arbeit als Balken, eine Frage ─── */
  function vergleichZeichnen(lage, blatt, schluessel, merk) {
    schluessel = schluessel || ('v' + lageNr);
    var max = 0;
    lage.arbeiten.forEach(function (a) { max = Math.max(max, a.schnell, a.langsam); });
    var box = el('div', 'v-vergleich');
    lage.arbeiten.forEach(function (a) {
      var gruppe = el('div', 'v-vg-gruppe');
      var kopf = el('div', 'v-aufgabe-name');
      kopf.appendChild(el('span', 'v-zeichen v-f' + (a.farbe || 0)));
      kopf.appendChild(el('span', null, a.name));
      gruppe.appendChild(kopf);
      [[lage.schnell, a.schnell, 0], [lage.langsam, a.langsam, a.langsam - a.schnell]].forEach(function (r) {
        var zeile = el('div', 'v-vg-zeile');
        zeile.appendChild(el('div', 'v-zeile-name', r[0]));
        var bahn = el('div', 'v-vg-bahn');
        var grund = el('div', 'v-balken v-f' + (a.farbe || 0), r[1] + ' Min.');
        grund.style.left = '0';
        grund.style.width = ((r[1] - r[2]) / max * 100) + '%';
        bahn.appendChild(grund);
        if (r[2] > 0) {
          var mehr = el('div', 'v-vg-mehr', '+' + r[2] + ' Min.');
          mehr.style.left = ((r[1] - r[2]) / max * 100) + '%';
          mehr.style.width = (r[2] / max * 100) + '%';
          bahn.appendChild(mehr);
        }
        zeile.appendChild(bahn);
        gruppe.appendChild(zeile);
      });
      box.appendChild(gruppe);
    });
    blatt.appendChild(box);

    var frage = el('div', 'v-frage');
    frage.appendChild(el('p', 'v-frage-text', lage.frage));
    var wahl = el('div', 'v-handlungen');
    lage.arbeiten.forEach(function (a, i) {
      var k = knopf(a.name, null, function () { antwort[schluessel] = i; zeichnen(); });
      k.setAttribute('aria-pressed', antwort[schluessel] === i ? 'true' : 'false');
      wahl.appendChild(k);
    });
    frage.appendChild(wahl);
    if (antwort[schluessel] != null) {
      var richtig = antwort[schluessel] === lage.richtig;
      frage.appendChild(el('p', richtig && merk ? 'v-erkenntnis-satz v-merk' : 'v-ergebnis ' + (richtig ? 'v-rechtzeitig' : 'v-zu-spaet'),
        richtig ? lage.rueck_richtig : lage.rueck_falsch));
      if (richtig && lage.weiter && lageNr + 1 < daten.lagen.length) {
        var weiter = el('div', 'v-handlungen');
        weiter.appendChild(knopf(lage.weiter, 'voll', function () { lageNr += 1; zeichnen(); window.scrollTo(0, 0); }));
        frage.appendChild(weiter);
      }
    }
    blatt.appendChild(frage);
  }

  /* ── Art „eigen“: Personen, Aufgaben und Minuten selbst eintragen ── */
  function eingabe(wert, art, beiAenderung, beschriftung) {
    var i = el('input', 'v-eingabe' + (art === 'number' ? ' v-zahl' : ''));
    i.type = art;
    i.value = wert;
    if (art === 'number') { i.min = '0'; i.max = '240'; i.step = '5'; i.inputMode = 'numeric'; }
    i.setAttribute('aria-label', beschriftung);
    i.addEventListener('change', function () { beiAenderung(i.value); zeichnen(); });
    return i;
  }

  function eigenZeichnen(lage, zu, blatt) {
    var personen = el('div', 'v-eigen-zeile');
    personen.appendChild(el('span', 'v-eigen-titel', 'Wer hilft mit?'));
    lage.personen.forEach(function (p, i) {
      personen.appendChild(eingabe(p.name, 'text', function (w) { p.name = w.trim() || ('Person ' + (i + 1)); }, 'Name der Person ' + (i + 1)));
    });
    if (lage.personen.length < (lage.max_personen || 3)) {
      personen.appendChild(knopf('+ Person', null, function () {
        var id = 'p' + (++eigenZaehler);
        lage.personen.push({ id: id, name: 'Person ' + (lage.personen.length + 1) });
        lage.aufgaben.forEach(function (a) { a.dauer[id] = 10; });
        zeichnen();
      }));
    }
    blatt.appendChild(personen);

    var frist = el('div', 'v-eigen-zeile');
    frist.appendChild(el('span', 'v-eigen-titel', 'Fertig sein bis:'));
    var auswahl = el('select', 'v-eingabe');
    auswahl.setAttribute('aria-label', 'Fertig sein bis');
    [''].concat(lage.fristen || []).forEach(function (f) {
      var o = el('option', null, f || 'egal');
      o.value = f;
      if ((lage.frist || '') === f) o.selected = true;
      auswahl.appendChild(o);
    });
    auswahl.addEventListener('change', function () { lage.frist = auswahl.value || null; lage.frist_name = auswahl.value; zeichnen(); });
    frist.appendChild(auswahl);
    blatt.appendChild(frist);

    var liste = el('ul', 'v-aufgaben');
    lage.aufgaben.forEach(function (a, nr) {
      var li = el('li', 'v-aufgabe v-aufgabe-eigen');
      var name = el('div', 'v-aufgabe-name');
      name.appendChild(el('span', 'v-zeichen v-f' + (a.farbe || 0)));
      name.appendChild(eingabe(a.name, 'text', function (w) { a.name = w.trim(); a.kurz = a.name; }, 'Name der Aufgabe ' + (nr + 1)));
      li.appendChild(name);
      var zeiten = el('div', 'v-zeiten v-eigen-zeiten');
      lage.personen.forEach(function (p) {
        var feld = el('label', 'v-eigen-feld');
        feld.appendChild(el('span', null, p.name));
        feld.appendChild(eingabe(a.dauer[p.id], 'number', function (w) { a.dauer[p.id] = Math.max(0, parseInt(w, 10) || 0); }, a.name + ', Minuten ' + p.name));
        feld.appendChild(el('span', null, 'Min.'));
        zeiten.appendChild(feld);
      });
      zeiten.appendChild(knopf('Entfernen', 'v-klein', function () {
        lage.aufgaben.splice(nr, 1);
        delete zu[a.id];
        zeichnen();
      }));
      li.appendChild(zeiten);
      li.appendChild(wahlKnoepfe(lage, zu, a));
      liste.appendChild(li);
    });
    blatt.appendChild(liste);
    if (lage.aufgaben.length < (lage.max_aufgaben || 8)) {
      var neu = el('div', 'v-handlungen');
      neu.appendChild(knopf('+ Aufgabe', null, function () {
        var id = 'e' + (++eigenZaehler);
        var dauer = {};
        lage.personen.forEach(function (p) { dauer[p.id] = 10; });
        lage.aufgaben.push({ id: id, name: 'Aufgabe ' + (lage.aufgaben.length + 1), kurz: 'Aufgabe ' + (lage.aufgaben.length + 1),
          farbe: lage.aufgaben.length % 4, dauer: dauer });
        zu[id] = null;
        zeichnen();
      }));
      blatt.appendChild(neu);
    }
  }

  /* ── Art „woche“: Wochenplan-Rennen (Version 3) ──────────────────────────
     Daten: titel, schritte[], einheit, tage[], tage_lang[], arten {id: {name}},
       personen[] {id, name, satz, farbe}, arbeiten[] {id, name, art, mittel, ort, tage[], dauer {person: Minuten pro Mal},
       kann_nicht {person: Satz}}, bisher {arbeit: person}.
     Je Arbeit genau eine Entscheidung: wer macht sie. Wochenminuten einer Person = Summe (Minuten pro Mal × Zahl der Tage).
     Die Zahl, die zählt: die längste Wochenzeit (wer am meisten arbeitet). Zeitgewinn = bisher − jetzt.
     Nach jedem Lauf erscheint der Plan als Wochenplan (Personen × Tage). Das Werkzeug zeigt nur Zahlen, nie einen Tipp. */
  var wGrund = null;        // {aid, text}: Satz unter einer Zeile, nach Tipp auf „kann nicht“
  var wLauf = null;         // laufende Wiedergabe (requestAnimationFrame)
  var wSicht = 'jetzt';     // Wochenplan-Ansicht: 'jetzt' oder 'bester'
  var wTabelleAn = false;   // Wochenplan-Ansicht per Knopf geöffnet

  function wPerson(lage, id) { return lage.personen.filter(function (p) { return p.id === id; })[0]; }
  function wKann(a, pid) { return !(a.kann_nicht && a.kann_nicht[pid]); }
  function wWoche(a, pid) { return (parseInt(a.dauer[pid], 10) || 0) * a.tage.length; }

  function wLast(lage, zu) {
    var je = {};
    lage.personen.forEach(function (p) { je[p.id] = 0; });
    lage.arbeiten.forEach(function (a) { if (zu[a.id]) je[zu[a.id]] += wWoche(a, zu[a.id]); });
    return je;
  }

  function wZahl(lage, zu) {
    var je = wLast(lage, zu), m = 0;
    Object.keys(je).forEach(function (k) { m = Math.max(m, je[k]); });
    return m;
  }

  function wSchluessel(lage, zu) { return lage.arbeiten.map(function (a) { return zu[a.id]; }).join('|'); }

  function wKopie(zu) { var k = {}; Object.keys(zu).forEach(function (x) { k[x] = zu[x]; }); return k; }

  function wBester(laeufe) {
    return laeufe.reduce(function (m, l, i) { return l.Z > laeufe[m].Z ? i : m; }, 0);
  }

  /* Eine Zeile der Liste: Arbeit (Name, Art, Tage) und je Person ein Knopf mit den Wochenminuten. */
  function wZeile(lage, zu, a) {
    var li = el('li', 'w-zeile');
    var links = el('div', 'w-arbeit');
    links.appendChild(el('span', 'w-arbeit-name', a.name));
    var unter = el('span', 'w-arbeit-unter');
    var art = lage.arten && lage.arten[a.art];
    if (art) unter.appendChild(el('span', 'w-art w-art-' + a.art, art.name));
    unter.appendChild(el('span', 'w-tage', a.tage.join(' · ')));
    links.appendChild(unter);
    li.appendChild(links);
    var wahl = el('div', 'w-wahl');
    lage.personen.forEach(function (p) {
      var kann = wKann(a, p.id);
      var k = el('button', 'w-knopf w-p' + (p.farbe || 0));
      k.type = 'button';
      k.appendChild(el('span', 'w-knopf-name', p.name));
      k.appendChild(el('span', 'w-knopf-zahl', kann ? String(wWoche(a, p.id)) : 'kann nicht'));
      k.setAttribute('data-a', a.id);
      k.setAttribute('data-p', p.id);
      if (!kann) {
        k.classList.add('w-gesperrt');
        k.setAttribute('aria-disabled', 'true');
        k.setAttribute('aria-label', a.name + ': ' + p.name + ' kann nicht');
      } else {
        k.setAttribute('aria-pressed', zu[a.id] === p.id ? 'true' : 'false');
        k.setAttribute('aria-label', a.name + ': ' + p.name + ', ' + wWoche(a, p.id) + ' Minuten in der Woche');
      }
      k.addEventListener('click', function () {
        if (wLauf) return;
        if (!kann) { wGrund = { aid: a.id, text: a.kann_nicht[p.id] }; zeichnen(); return; }
        zu[a.id] = p.id;
        wGrund = null;
        zeichnen();
      });
      wahl.appendChild(k);
    });
    li.appendChild(wahl);
    if (wGrund && wGrund.aid === a.id) li.appendChild(el('p', 'w-grund', wGrund.text));
    return li;
  }

  /* Wochenplan: Zeilen = Personen, Spalten = Tage; jede Arbeit an ihren festen Tagen bei der Person, die sie macht. */
  function wTabelle(lage, plan, titel) {
    var box = el('div', 'w-tabelle');
    box.appendChild(el('h3', null, titel));
    var tab = el('table');
    var kopf = el('tr');
    kopf.appendChild(el('th', null, ''));
    (lage.tage_lang || lage.tage).forEach(function (t) { var th = el('th', null, t); th.setAttribute('scope', 'col'); kopf.appendChild(th); });
    var thw = el('th', 'w-tab-summe', 'Minuten');
    thw.setAttribute('scope', 'col');
    kopf.appendChild(thw);
    var thead = el('thead');
    thead.appendChild(kopf);
    tab.appendChild(thead);
    var tbody = el('tbody');
    var je = wLast(lage, plan);
    lage.personen.forEach(function (p) {
      var tr = el('tr', 'w-p' + (p.farbe || 0));
      tr.setAttribute('data-p', p.id);
      var th = el('th', 'w-tab-person', p.name);
      th.setAttribute('scope', 'row');
      tr.appendChild(th);
      lage.tage.forEach(function (t) {
        var td = el('td');
        td.setAttribute('data-tag', t);
        lage.arbeiten.forEach(function (a) {
          if (plan[a.id] !== p.id || a.tage.indexOf(t) < 0) return;
          var e = el('div', 'w-eintrag');
          e.appendChild(el('span', 'w-eintrag-name', a.name));
          var art = lage.arten && lage.arten[a.art];
          if (art) e.appendChild(el('span', 'w-art w-art-' + a.art, art.name));
          td.appendChild(e);
        });
        tr.appendChild(td);
      });
      tr.appendChild(el('td', 'w-tab-summe', String(je[p.id])));
      tbody.appendChild(tr);
    });
    tab.appendChild(tbody);
    box.appendChild(tab);
    var merk = el('ul', 'w-merkmale');
    lage.arbeiten.forEach(function (a) {
      var li = el('li');
      li.appendChild(el('strong', null, a.name + ': '));
      li.appendChild(document.createTextNode('Arbeitsmittel ' + a.mittel + ' · Arbeitsort ' + a.ort));
      merk.appendChild(li);
    });
    box.appendChild(merk);
    return box;
  }

  function wocheZeichnen(lage, zu, blatt) {
    var key = wSchluessel(lage, zu);
    var laeufe = versuche[lageNr];
    var fertig = abgespielt[lageNr] === key;
    var bisher = {};
    Object.keys(lage.bisher).forEach(function (k) { bisher[k] = lage.bisher[k]; });
    var Y = wZahl(lage, bisher), X = wZahl(lage, zu), je = wLast(lage, zu);
    var unberuehrt = !laeufe.length && key === wSchluessel(lage, bisher);

    /* Oben: Titel und Schritte links, Start rechts */
    var oben = el('div', 'w-oben');
    var intro = el('div', 'w-intro');
    while (blatt.firstChild) intro.appendChild(blatt.firstChild);
    if (lage.schritte) {
      var ol = el('ol', 'w-schritte');
      lage.schritte.forEach(function (s) { ol.appendChild(el('li', null, s)); });
      intro.appendChild(ol);
    }
    oben.appendChild(intro);
    var startKnopf = knopf(fertig ? 'Noch einmal abspielen' : 'Start', (unberuehrt || fertig ? '' : 'voll ') + 'w-start-knopf', function () {
      wAbspielen(lage, zu, key);
    });
    oben.appendChild(startKnopf);
    blatt.appendChild(oben);

    var raster = el('div', 'w-raster');
    var links = el('div', 'w-links');
    var rechts = el('div', 'w-rechts');
    raster.appendChild(links);
    raster.appendChild(rechts);
    blatt.appendChild(raster);

    /* Links: Personenkarten und Liste der Arbeiten */
    var karten = el('div', 'w-personen');
    lage.personen.forEach(function (p) {
      var k = el('div', 'w-pkarte w-p' + (p.farbe || 0));
      k.appendChild(el('strong', null, p.name));
      if (p.satz) k.appendChild(el('span', null, p.satz));
      karten.appendChild(k);
    });
    links.appendChild(karten);
    var kopf = el('div', 'w-liste-kopf');
    kopf.appendChild(el('span', null, 'Arbeit'));
    kopf.appendChild(el('span', null, lage.einheit || 'Minuten'));
    links.appendChild(kopf);
    var liste = el('ul', 'w-liste');
    lage.arbeiten.forEach(function (a) { liste.appendChild(wZeile(lage, zu, a)); });
    links.appendChild(liste);

    /* Rechts: ein Balken je Person, Ergebnis, Läufe */
    var max = Math.max(Y, X, 1);
    var balken = el('div', 'w-balken-box');
    balken.appendChild(el('h3', null, 'Wie lange arbeitet jede Person in der Woche?'));
    lage.personen.forEach(function (p) {
      var z = el('div', 'w-bzeile');
      z.appendChild(el('span', 'w-bname', p.name));
      var bahn = el('div', 'w-bahn');
      var b = el('div', 'w-balken w-p' + (p.farbe || 0));
      b.setAttribute('data-p', p.id);
      b.setAttribute('data-ziel', String(je[p.id] / max * 100));
      b.style.width = fertig ? (je[p.id] / max * 100) + '%' : '0';
      bahn.appendChild(b);
      var strich = el('div', 'w-bisher');
      strich.style.left = (Y / max * 100) + '%';
      bahn.appendChild(strich);
      z.appendChild(bahn);
      var zahl = el('span', 'w-bzahl', fertig ? String(je[p.id]) : '');
      zahl.setAttribute('data-p', p.id);
      z.appendChild(zahl);
      balken.appendChild(z);
    });
    balken.appendChild(el('p', 'w-bisher-legende', 'Strich = bisher (' + Y + ' Minuten)'));
    rechts.appendChild(balken);

    var erg = el('div', 'w-ergebnis');
    erg.setAttribute('aria-live', 'polite');
    if (fertig) {
      var Z = Y - X;
      var s1 = el('p', 'w-satz');
      s1.appendChild(document.createTextNode('Wer am meisten arbeitet, braucht '));
      s1.appendChild(el('strong', null, X + ' Minuten'));
      s1.appendChild(document.createTextNode('. Bisher: ' + Y + ' Minuten.'));
      erg.appendChild(s1);
      var s2 = el('p', 'w-gewinn');
      if (Z >= 0) {
        s2.appendChild(document.createTextNode('Du hast '));
        s2.appendChild(el('strong', 'w-zahl', String(Z)));
        s2.appendChild(document.createTextNode(' Minuten gespart.'));
      } else {
        s2.appendChild(document.createTextNode('Du brauchst '));
        s2.appendChild(el('strong', 'w-zahl', String(-Z)));
        s2.appendChild(document.createTextNode(' Minuten mehr als bisher.'));
      }
      erg.appendChild(s2);
    } else {
      erg.appendChild(el('p', 'w-status', laeufe.length ? 'Plan geändert. Drück auf Start.' : ''));
    }
    rechts.appendChild(erg);

    if (laeufe.length) {
      var bi = wBester(laeufe);
      var lb = el('div', 'w-laeufe');
      lb.appendChild(el('h3', null, 'Deine Läufe'));
      var ol2 = el('ol');
      laeufe.forEach(function (l, i) {
        var li = el('li', i === bi ? 'w-bester' : null, (l.Z >= 0 ? l.Z + ' Minuten gespart' : (-l.Z) + ' Minuten mehr'));
        if (i === bi) li.appendChild(el('span', null, ' ★ bester'));
        ol2.appendChild(li);
      });
      lb.appendChild(ol2);
      rechts.appendChild(lb);
    }
    var zeigen = knopf(wTabelleAn ? 'Wochenplan ausblenden' : 'Wochenplan zeigen', 'w-klein', function () {
      if (wLauf) return;
      wTabelleAn = !wTabelleAn;
      zeichnen();
    });
    rechts.appendChild(zeigen);

    /* Wochenplan: nach jedem Lauf von selbst, sonst per Knopf */
    if (fertig || wTabelleAn) {
      var wp = el('section', 'w-wochenplan');
      wp.id = 'w-wochenplan';
      var wkopf = el('div', 'w-wochenplan-kopf');
      wkopf.appendChild(el('h2', null, 'Wochenplan: Wer macht was?'));
      if (laeufe.length) {
        var um = el('div', 'w-umschalter');
        [['jetzt', 'jetzt'], ['bester', 'bester Lauf']].forEach(function (x) {
          var k = knopf(x[1], 'w-klein', function () { wSicht = x[0]; zeichnen(); });
          k.setAttribute('aria-pressed', wSicht === x[0] ? 'true' : 'false');
          um.appendChild(k);
        });
        wkopf.appendChild(um);
      }
      wp.appendChild(wkopf);
      if (wSicht === 'bester' && laeufe.length) {
        var l = laeufe[wBester(laeufe)];
        wp.appendChild(wTabelle(lage, l.plan, 'Bester Lauf: wer am meisten arbeitet, braucht ' + l.X + ' Minuten'));
      } else {
        wp.appendChild(wTabelle(lage, zu, 'Dein Plan jetzt: wer am meisten arbeitet, braucht ' + X + ' Minuten'));
      }
      blatt.appendChild(wp);
    }
  }

  /* Lauf: alle Balken wachsen zugleich (etwa 7 Sekunden), dann das Ergebnis. */
  function wAbspielen(lage, zu, key) {
    if (wLauf) return;
    wGrund = null;
    var dauer = lage.lauf_ms || 7000;
    document.body.classList.add('w-laeuft');
    var balken = Array.prototype.slice.call(document.querySelectorAll('.w-balken'));
    var zahlen = {};
    Array.prototype.forEach.call(document.querySelectorAll('.w-bzahl'), function (z) { zahlen[z.getAttribute('data-p')] = z; });
    Array.prototype.forEach.call(document.querySelectorAll('.w-start-knopf, .w-knopf, .w-klein'), function (k) { k.disabled = true; });
    var erg = document.querySelector('.w-ergebnis');
    if (erg) erg.textContent = '';
    var wp = document.getElementById('w-wochenplan');
    if (wp) wp.hidden = true;
    var je = wLast(lage, zu), max = 0;
    Object.keys(je).forEach(function (k) { max = Math.max(max, je[k]); });
    var t0 = null;
    function schritt(zeit) {
      if (t0 === null) t0 = zeit;
      var anteil = Math.min(1, (zeit - t0) / dauer);
      var jetzt = anteil * max;
      balken.forEach(function (b) {
        var pid = b.getAttribute('data-p');
        var w = Math.min(je[pid], jetzt);
        b.style.width = (parseFloat(b.getAttribute('data-ziel')) * (je[pid] ? w / je[pid] : 0)) + '%';
        zahlen[pid].textContent = String(Math.round(w));
      });
      if (anteil < 1) { wLauf = requestAnimationFrame(schritt); return; }
      wLauf = null;
      document.body.classList.remove('w-laeuft');
      abgespielt[lageNr] = key;
      var Y = wZahl(lage, lage.bisher), X = wZahl(lage, zu);
      var liste = versuche[lageNr];
      if (!liste.some(function (l) { return l.key === key; })) liste.push({ key: key, X: X, Z: Y - X, plan: wKopie(zu) });
      wSicht = 'jetzt';
      zeichnen();
    }
    wLauf = requestAnimationFrame(schritt);
  }

  /* ── Seite ───────────────────────────────────────────────────────── */
  function zeichnen() {
    var lage = daten.lagen[lageNr];
    var zu = zuteilung[lageNr];
    if (wLauf) { cancelAnimationFrame(wLauf); wLauf = null; document.body.classList.remove('w-laeuft'); }
    document.body.classList.toggle('v-woche-an', lage.art === 'woche');

    Array.prototype.forEach.call(document.querySelectorAll('.v-lage-knopf'), function (k, i) {
      k.setAttribute('aria-pressed', i === lageNr ? 'true' : 'false');
    });

    var blatt = document.getElementById('v-lage');
    leeren(blatt);
    blatt.appendChild(el('h2', null, lage.titel));
    blatt.appendChild(el('p', null, lage.text));

    if (lage.art === 'woche') {
      wocheZeichnen(lage, zu, blatt);
      document.getElementById('v-plan').hidden = true;
      document.getElementById('v-versuche').hidden = true;
      var erk = document.getElementById('v-erkenntnis');
      if (erk) erk.hidden = true;
      return;
    }
    if (lage.art === 'vergleich') {
      vergleichZeichnen(lage, blatt);
      document.getElementById('v-plan').hidden = true;
      versucheZeichnen(false);
      erkenntnisZeichnen({});
      return;
    }
    if (lage.art === 'eigen') {
      eigenZeichnen(lage, zu, blatt);
      planZeichnen(lage, zu, false);
      erkenntnisZeichnen({});
      return;
    }
    if (lage.these) {
      var these = el('div', 'v-these');
      these.appendChild(el('span', 'v-these-wort', 'These'));
      these.appendChild(el('p', null, lage.these));
      blatt.appendChild(these);
    }
    blatt.appendChild(aufgabenListe(lage, zu));
    planZeichnen(lage, zu, true);
    erkenntnisZeichnen(lage);
  }

  function erkenntnisZeichnen(lage) {
    var box = document.getElementById('v-erkenntnis');
    if (!box) return;
    leeren(box);
    var geloest = versuche[lageNr].some(function (v) { return v.urteil.klasse === 'v-rechtzeitig'; });
    box.hidden = !(lage.erkenntnis && geloest);
    if (box.hidden) return;
    var e = lage.erkenntnis;
    box.appendChild(el('span', 'v-erkenntnis-wort', 'Erkenntnis'));
    box.appendChild(el('h2', null, e.titel));
    if (e.gleichzeitig) box.appendChild(el('p', 'v-erkenntnis-satz', e.gleichzeitig));
    if (e.zweite_frage) box.appendChild(el('h3', 'v-erkenntnis-frage', e.zweite_frage));
    box.appendChild(el('p', null, e.text));
    vergleichZeichnen(e, box, 'e' + lageNr, true);
  }

  function start(d) {
    daten = d;
    document.title = d.titel;
    document.getElementById('v-titel').textContent = d.titel;
    document.getElementById('v-auftrag').textContent = d.auftrag;
    document.getElementById('v-erfunden').textContent = d.hinweis || '';
    var reiter = document.getElementById('v-lagen');
    d.lagen.forEach(function (lage, i) {
      if (lage.art === 'eigen') {
        lage.personen = (lage.personen || [{ name: 'Person 1' }, { name: 'Person 2' }]).map(function (p) {
          return { id: 'p' + (++eigenZaehler), name: p.name };
        });
        lage.aufgaben = lage.aufgaben || [];
      }
      var leer = {};
      (lage.aufgaben || []).forEach(function (a) { leer[a.id] = null; });
      zuteilung.push(lage.art === 'woche' ? wKopie(lage.bisher) : leer);
      versuche.push([]);
      abgespielt.push(null);
      reiter.appendChild(knopf(lage.reiter || lage.titel, 'v-lage-knopf', function () {
        lageNr = i;
        zeichnen();
        window.scrollTo(0, 0);
      }));
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
