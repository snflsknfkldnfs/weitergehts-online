/* Verteilen — geteiltes Werkzeug: Aufgaben Personen zuteilen und an Zeitbalken sehen, wann alles fertig ist.
   Liest data.json im Ordner der Seite. Eine Seite hat eine oder mehrere Lagen (Reiter), je Lage eine Art:
     "verteilen" (Vorgabe): Startzeit, optional Frist, Personen, Aufgaben mit Dauer je Person; zuteilen und sehen.
     "vergleich": je Arbeit zwei Balken (schnellere und langsamere Person), der Rückstand markiert; eine Frage zum Antippen.
   Eine Lage "verteilen" kann eine "these" tragen (steht über den Aufgaben) und eine "erkenntnis" (Form wie "vergleich"):
   die Erkenntnis klappt erst auf, wenn die Lage einmal rechtzeitig gelöst ist, und führt danach zur nächsten Lage.
     "eigen":     die Klasse trägt Personen, Aufgaben und Minuten selbst ein und verteilt dann wie bei "verteilen".
     "woche":     Wochenkalender (Mo–So × Tageszeiten) mit freien Minuten und Tempo je Person; Karten antippen oder
                  ziehen; ein Lauf geht durch die Woche; gezählt wird die Summe der Arbeitsminuten gegenüber dem
                  bisherigen Plan (Zeitgewinn). Eigener Abschnitt unten („Art woche“).
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

  /* ── Art „woche“: Wochenkalender, Lauf durch die Woche, Zeitgewinn ──
     Daten: tage, tage_lang, zeiten; personen[] mit bloecke = 14 × [freie Minuten, Tempo]
     (Reihenfolge Mo vorm., Mo nachm., Di vorm., …; 0 Minuten = „nicht da“, Tempo > 1 langsamer, < 1 schneller);
     arbeiten[] mit dauer je Person (bei Tempo 1) und optional kann_nicht {person: Grund}; bisher[] = Startplan.
     Dauer in einem Block = Grunddauer × Tempo, gerundet (floor(x + 0,5)); Summe im Block ≤ freie Minuten.
     Gezählt wird die Summe der Arbeitsminuten. Das Werkzeug zeigt nur Zahlen, nie einen Tipp. */
  var wWahl = null;        // ausgewählte Karte (id)
  var wMeldung = '';       // Satz unter dem Start-Knopf (Auswahl, Grund einer Sperre)
  var wLauf = null;        // laufende Wiedergabe (setTimeout)
  var wZeigen = false;     // Wochenplan-Blatt offen
  var wZug = null;         // laufendes Ziehen
  var wZeigerZeit = 0;     // Ende des letzten Ziehens …
  var wZeigerKarte = null; // … und welche Karte gezogen wurde (deren Klick danach ignorieren)

  function wBlockZahl(lage) { return lage.tage.length * lage.zeiten.length; }
  function wPerson(lage, id) { return lage.personen.filter(function (p) { return p.id === id; })[0]; }
  function wArbeit(lage, id) { return lage.arbeiten.filter(function (a) { return a.id === id; })[0]; }

  function wDauer(lage, a, pid, b) {
    var blk = wPerson(lage, pid).bloecke[b];
    return Math.floor(a.dauer[pid] * blk[1] + 0.5 + 1e-9);
  }

  function wBlockName(lage, b, lang) {
    var t = Math.floor(b / lage.zeiten.length);
    var tag = lang ? (lage.tage_lang || lage.tage)[t] : lage.tage[t];
    return tag + ' ' + lage.zeiten[b % lage.zeiten.length];
  }

  function wImBlock(lage, zu, pid, b, ohne) {
    return lage.arbeiten.filter(function (a) {
      var z = zu[a.id];
      return a.id !== ohne && z && z.p === pid && z.b === b;
    });
  }

  function wBelegt(lage, zu, pid, b, ohne) {
    return wImBlock(lage, zu, pid, b, ohne).reduce(function (s, a) { return s + wDauer(lage, a, pid, b); }, 0);
  }

  /* Darf Karte aid in Block b von Person pid? Liefert {ok, grund, dauer}. */
  function wPruefen(lage, zu, aid, pid, b) {
    var a = wArbeit(lage, aid), p = wPerson(lage, pid);
    if (a.kann_nicht && a.kann_nicht[pid]) return { ok: false, grund: a.kann_nicht[pid] };
    var kap = p.bloecke[b][0];
    if (!kap) {
      var t = Math.floor(b / lage.zeiten.length);
      return { ok: false, grund: p.name + ' ist am ' + (lage.tage_lang || lage.tage)[t] + ' ' + lage.zeiten[b % lage.zeiten.length] + ' nicht da.' };
    }
    var d = wDauer(lage, a, pid, b);
    var fehlt = wBelegt(lage, zu, pid, b, aid) + d - kap;
    if (fehlt > 0) return { ok: false, grund: 'Das Feld ist voll: ' + fehlt + (fehlt === 1 ? ' Minute fehlt.' : ' Minuten fehlen.'), dauer: d };
    return { ok: true, dauer: d };
  }

  function wSumme(lage, zu) {
    var je = {}, gesamt = 0, offen = 0;
    lage.personen.forEach(function (p) { je[p.id] = 0; });
    lage.arbeiten.forEach(function (a) {
      var z = zu[a.id];
      if (!z) { offen += 1; return; }
      var d = wDauer(lage, a, z.p, z.b);
      je[z.p] += d;
      gesamt += d;
    });
    return { gesamt: gesamt, je: je, offen: offen };
  }

  function wSchluessel(lage, zu) {
    return lage.arbeiten.map(function (a) { var z = zu[a.id]; return z ? z.p + '@' + z.b : '-'; }).join('|');
  }

  function wBisher(lage) {
    var zu = {};
    lage.arbeiten.forEach(function (a) { zu[a.id] = null; });
    (lage.bisher || []).forEach(function (e) {
      zu[e.arbeit] = { p: e.person, b: lage.tage.indexOf(e.tag) * lage.zeiten.length + lage.zeiten.indexOf(e.zeit) };
    });
    return zu;
  }

  /* Liste „Person: Arbeiten“ (gleiche Arbeiten zusammengefasst, in der Reihenfolge der Woche) */
  function wListe(lage, zu, mitMinuten) {
    var s = wSumme(lage, zu);
    return lage.personen.map(function (p) {
      var meine = lage.arbeiten.filter(function (a) { return zu[a.id] && zu[a.id].p === p.id; })
        .sort(function (x, y) { return zu[x.id].b - zu[y.id].b; });
      var zahl = {}, reihe = [];
      meine.forEach(function (a) {
        var n = a.typ || a.kurz || a.name;
        if (!zahl[n]) { zahl[n] = 0; reihe.push({ n: n, z: a.zeichen }); }
        zahl[n] += 1;
      });
      var teile = reihe.map(function (r) { return (zahl[r.n] > 1 ? zahl[r.n] + ' × ' : '') + (r.z ? r.z + ' ' : '') + r.n; });
      return { person: p, text: teile.length ? teile.join(', ') : 'nichts', minuten: mitMinuten ? s.je[p.id] : null };
    });
  }

  function wKarte(lage, zu, a) {
    var z = zu[a.id];
    var k = el('button', 'w-karte v-f' + (a.farbe || 0));
    k.type = 'button';
    k.setAttribute('data-a', a.id);
    k.appendChild(el('span', 'w-karte-name', (a.zeichen ? a.zeichen + ' ' : '') + (a.kurz || a.name)));
    if (z) k.appendChild(el('span', 'w-karte-min', wDauer(lage, a, z.p, z.b) + ' Min.'));
    var wo = z ? wPerson(lage, z.p).name + ', ' + wBlockName(lage, z.b, true) + ', ' + wDauer(lage, a, z.p, z.b) + ' Minuten' : 'ohne Platz';
    k.setAttribute('aria-label', a.name + ': ' + wo);
    if (wWahl === a.id) k.classList.add('w-gewaehlt');
    k.setAttribute('aria-pressed', wWahl === a.id ? 'true' : 'false');
    k.addEventListener('pointerdown', function (e) { wZeigerStart(e, a.id, k); });
    k.addEventListener('click', function () {
      if (wZeigerKarte === a.id && Date.now() - wZeigerZeit < 400) return;   // Klick nach dem Ziehen: schon erledigt
      wKarteTippen(a.id);
    });
    return k;
  }

  /* Ist schon eine Karte ausgewählt, zählt ein Tipp auf eine andere Karte im Kalender als Tipp auf ihr Feld
     (Kinder tippen dorthin, wo die Karte hin soll, auch wenn dort schon eine liegt). */
  function wKarteTippen(aid) {
    if (wLauf) return;
    var lage = daten.lagen[lageNr], zu = zuteilung[lageNr];
    if (wWahl && wWahl !== aid) {
      if (zu[aid]) { wLegen(wWahl, { p: zu[aid].p, b: zu[aid].b }); return; }
      if (zu[wWahl]) { wLegen(wWahl, null); return; }
    }
    wWahl = wWahl === aid ? null : aid;
    if (wWahl) {
      var a = wArbeit(lage, aid);
      wMeldung = '„' + (a.kurz || a.name) + '“ ist ausgewählt. Tipp auf ein Feld im Kalender.';
    } else {
      wMeldung = '';
    }
    zeichnen();
  }

  /* Ziel antippen oder Karte dort loslassen: ziel = {p, b} oder null (= ohne Platz) */
  function wLegen(aid, ziel) {
    var lage = daten.lagen[lageNr], zu = zuteilung[lageNr];
    if (!aid || wLauf) return;
    if (ziel) {
      var r = wPruefen(lage, zu, aid, ziel.p, ziel.b);
      if (!r.ok) { wMeldung = r.grund; wWahl = aid; zeichnen(); return; }
      zu[aid] = { p: ziel.p, b: ziel.b };
    } else {
      zu[aid] = null;
    }
    wWahl = null;
    wMeldung = '';
    zeichnen();
  }

  /* Ziehen mit Pointer Events (kein HTML5-Drag-and-Drop). Unter 8 px Bewegung = Tippen:
     das erledigt das normale Klick-Ereignis (auch Tastatur), die Zeiger-Ereignisse nur das Ziehen. */
  function wZeigerStart(e, aid, k) {
    if (wLauf || (e.pointerType === 'mouse' && e.button !== 0)) return;
    wZug = { aid: aid, k: k, x: e.clientX, y: e.clientY, id: e.pointerId, zieht: false, geist: null, ueber: null };
    try { k.setPointerCapture(e.pointerId); } catch (x) { /* ältere Geräte */ }
    k.addEventListener('pointermove', wZeigerZug);
    k.addEventListener('pointerup', wZeigerEnde);
    k.addEventListener('pointercancel', wZeigerAbbruch);
  }

  function wZielUnter(x, y) {
    var t = document.elementFromPoint(x, y);
    if (!t) return null;
    var zelle = t.closest('.w-zelle');
    if (zelle) return { el: zelle, ziel: { p: zelle.getAttribute('data-p'), b: parseInt(zelle.getAttribute('data-b'), 10) } };
    var vorrat = t.closest('.w-vorrat');
    if (vorrat) return { el: vorrat, ziel: null };
    return null;
  }

  function wZeigerZug(e) {
    if (!wZug || e.pointerId !== wZug.id) return;
    var dx = e.clientX - wZug.x, dy = e.clientY - wZug.y;
    if (!wZug.zieht) {
      if (dx * dx + dy * dy < 64) return;
      wZug.zieht = true;
      wWahl = wZug.aid;
      var g = wZug.k.cloneNode(true);
      g.className += ' w-geist';
      g.removeAttribute('aria-pressed');
      var r = wZug.k.getBoundingClientRect();
      g.style.width = r.width + 'px';
      wZug.dx = wZug.x - r.left;
      wZug.dy = wZug.y - r.top;
      document.body.appendChild(g);
      wZug.geist = g;
      wZug.k.classList.add('w-gezogen');
      document.body.classList.add('w-zieht');
      wMarkieren();
    }
    wZug.geist.style.left = (e.clientX - wZug.dx) + 'px';
    wZug.geist.style.top = (e.clientY - wZug.dy) + 'px';
    var u = wZielUnter(e.clientX, e.clientY);
    var neu = u ? u.el : null;
    if (wZug.ueber !== neu) {
      if (wZug.ueber) wZug.ueber.classList.remove('w-ueber');
      if (neu) neu.classList.add('w-ueber');
      wZug.ueber = neu;
    }
    e.preventDefault();
  }

  function wZeigerAufraeumen() {
    if (!wZug) return;
    var k = wZug.k;
    k.removeEventListener('pointermove', wZeigerZug);
    k.removeEventListener('pointerup', wZeigerEnde);
    k.removeEventListener('pointercancel', wZeigerAbbruch);
    if (wZug.geist && wZug.geist.parentNode) wZug.geist.parentNode.removeChild(wZug.geist);
    if (wZug.ueber) wZug.ueber.classList.remove('w-ueber');
    k.classList.remove('w-gezogen');
    document.body.classList.remove('w-zieht');
  }

  function wZeigerEnde(e) {
    if (!wZug || e.pointerId !== wZug.id) return;
    var zug = wZug;
    wZeigerAufraeumen();
    wZug = null;
    if (!zug.zieht) return;
    wZeigerZeit = Date.now();
    wZeigerKarte = zug.aid;
    var u = wZielUnter(e.clientX, e.clientY);
    if (u) { wLegen(zug.aid, u.ziel); return; }
    wWahl = zug.aid;
    var a = wArbeit(daten.lagen[lageNr], zug.aid);
    wMeldung = '„' + (a.kurz || a.name) + '“ ist ausgewählt. Tipp auf ein Feld im Kalender.';
    zeichnen();
  }

  function wZeigerAbbruch() {
    wZeigerAufraeumen();
    wZug = null;
    zeichnen();
  }

  /* Zeigt bei ausgewählter Karte, wo sie hinpasst (und wie lange sie dort dauert). */
  function wMarkieren() {
    var lage = daten.lagen[lageNr], zu = zuteilung[lageNr];
    Array.prototype.forEach.call(document.querySelectorAll('.w-zelle'), function (z) {
      var pid = z.getAttribute('data-p'), b = parseInt(z.getAttribute('data-b'), 10);
      var hier = z.querySelector('.w-hier');
      z.classList.remove('w-passt', 'w-passt-nicht', 'w-ort');
      if (hier) hier.textContent = '';
      if (!wWahl) return;
      var jetzt = zu[wWahl];
      if (jetzt && jetzt.p === pid && jetzt.b === b) { z.classList.add('w-ort'); return; }
      var r = wPruefen(lage, zu, wWahl, pid, b);
      if (r.ok) {
        z.classList.add('w-passt');
        if (hier) hier.textContent = 'hier ' + r.dauer + ' Min.';
      } else {
        z.classList.add('w-passt-nicht');
      }
    });
    var v = document.querySelector('.w-vorrat');
    if (v) v.classList.toggle('w-passt', !!wWahl && !!zu[wWahl]);
  }

  function wZelle(lage, zu, p, b, laufFertig) {
    var blk = p.bloecke[b];
    var z = el('div', 'w-zelle');
    z.setAttribute('data-p', p.id);
    z.setAttribute('data-b', String(b));
    z.setAttribute('role', 'button');
    z.setAttribute('aria-label', p.name + ', ' + wBlockName(lage, b, true));
    var kopf = el('div', 'w-zelle-kopf');
    if (!blk[0]) {
      z.classList.add('w-nichtda');
      kopf.textContent = 'nicht da';
    } else {
      var frei = blk[0] - wBelegt(lage, zu, p.id, b);
      kopf.textContent = frei + ' Min. frei';
      if (blk[1] > 1) { z.classList.add('w-langsam'); z.appendChild(kopf); kopf = null; z.appendChild(el('div', 'w-tempo', '🐢 langsamer')); }
      else if (blk[1] < 1) { z.classList.add('w-schnell'); z.appendChild(kopf); kopf = null; z.appendChild(el('div', 'w-tempo', '⚡ schneller')); }
    }
    if (kopf) z.appendChild(kopf);
    wImBlock(lage, zu, p.id, b).forEach(function (a) { z.appendChild(wKarte(lage, zu, a)); });
    z.appendChild(el('div', 'w-hier'));
    z.addEventListener('click', function (e) {
      if (e.target.closest('.w-karte') || wLauf) return;
      if (!wWahl) {
        if (!blk[0]) { wMeldung = p.name + ' ist am ' + (lage.tage_lang || lage.tage)[Math.floor(b / lage.zeiten.length)] + ' ' + lage.zeiten[b % lage.zeiten.length] + ' nicht da.'; zeichnen(); }
        return;
      }
      wLegen(wWahl, { p: p.id, b: b });
    });
    return z;
  }

  function wocheZeichnen(lage, zu, blatt) {
    var s = wSumme(lage, zu);
    var key = wSchluessel(lage, zu);
    var laeufe = versuche[lageNr];
    var fertig = abgespielt[lageNr] === key && s.offen === 0;
    var nb = wBlockZahl(lage);

    var raster = el('div', 'w-raster');
    var links = el('div', 'w-links');
    var leiste = el('div', 'w-leiste');
    raster.appendChild(links);
    raster.appendChild(leiste);
    blatt.appendChild(raster);

    /* Kalender: Spalten = Tage, je Person zwei Zeilen (Tageszeiten) */
    var rahmen = el('div', 'w-kalender-rahmen');
    var kal = el('div', 'w-kalender');
    kal.style.gridTemplateColumns = 'var(--w-name) var(--w-zeit) repeat(' + lage.tage.length + ', minmax(0, 1fr))';
    kal.appendChild(el('div', 'w-ecke'));
    kal.appendChild(el('div', 'w-ecke'));
    lage.tage.forEach(function (t, i) {
      var k = el('div', 'w-tag', t);
      k.setAttribute('data-t', String(i));
      kal.appendChild(k);
    });
    lage.personen.forEach(function (p, pi) {
      lage.zeiten.forEach(function (zeit, zi) {
        if (zi === 0) {
          var name = el('div', 'w-person');
          name.style.gridRow = 'span ' + lage.zeiten.length;
          if (p.zeichen) name.appendChild(el('span', 'w-person-zeichen', p.zeichen));
          name.appendChild(el('span', 'w-person-name', p.name));
          if (fertig) name.appendChild(el('span', 'w-person-summe', s.je[p.id] + ' Min.'));
          kal.appendChild(name);
        }
        kal.appendChild(el('div', 'w-zeit' + (zi === 0 ? ' w-erste' : ''), zeit === 'vormittags' ? 'vorm.' : zeit === 'nachmittags' ? 'nachm.' : zeit));
        for (var t = 0; t < lage.tage.length; t++) {
          var b = t * lage.zeiten.length + zi;
          var zelle = wZelle(lage, zu, p, b, fertig);
          if (zi === 0) zelle.classList.add('w-erste');
          kal.appendChild(zelle);
        }
      });
    });
    rahmen.appendChild(kal);
    links.appendChild(rahmen);

    /* Personenkarten */
    var karten = el('div', 'w-personen');
    lage.personen.forEach(function (p) {
      var k = el('div', 'w-pkarte');
      var kopf = el('div', 'w-pkarte-kopf');
      if (p.zeichen) kopf.appendChild(el('span', 'w-person-zeichen', p.zeichen));
      kopf.appendChild(el('span', null, p.name));
      k.appendChild(kopf);
      (p.profil || []).forEach(function (satz) { k.appendChild(el('p', null, satz)); });
      karten.appendChild(k);
    });
    links.appendChild(karten);

    /* Steuerleiste: Start, Ergebnis, Läufe */
    var start = el('div', 'w-start');
    var Y = wSumme(lage, wBisher(lage)).gesamt;
    if (fertig) {
      var Z = Y - s.gesamt;
      var gew = el('p', 'w-gewinn');
      if (Z >= 0) {
        gew.appendChild(document.createTextNode('Du hast '));
        gew.appendChild(el('strong', 'w-zahl', String(Z)));
        gew.appendChild(document.createTextNode(' Minuten gespart.'));
      } else {
        gew.appendChild(document.createTextNode('Dein Plan braucht '));
        gew.appendChild(el('strong', 'w-zahl', String(-Z)));
        gew.appendChild(document.createTextNode(' Minuten mehr als bisher.'));
      }
      start.appendChild(gew);
      start.appendChild(el('p', 'w-gesamt', 'Die Familie hat in dieser Woche ' + s.gesamt + ' Minuten gearbeitet. Bisher: ' + Y + ' Minuten.'));
      start.appendChild(el('p', 'w-je', lage.personen.map(function (p) { return (p.zeichen ? p.zeichen + ' ' : '') + p.name + ' ' + s.je[p.id]; }).join(' · ')));
    } else {
      var st = s.offen > 0 ? (s.offen === 1 ? 'Noch 1 Arbeit ohne Platz.' : 'Noch ' + s.offen + ' Arbeiten ohne Platz.')
        : (laeufe.length ? 'Plan geändert. Drück auf Start.' : 'Alle Arbeiten haben einen Platz. Drück auf Start.');
      start.appendChild(el('p', 'w-status' + (s.offen > 0 ? ' w-gesperrt' : ''), st));
    }
    var lauf = el('p', 'w-lauf');
    lauf.setAttribute('aria-live', 'polite');
    start.appendChild(lauf);
    var handeln = el('div', 'v-handlungen');
    var startKnopf = knopf(fertig ? 'Noch einmal abspielen' : '▶ Start', fertig ? null : 'voll w-start-knopf', function () {
      wAbspielen(lage, zu, key, startKnopf, lauf);
    });
    startKnopf.disabled = s.offen > 0;
    handeln.appendChild(startKnopf);
    start.appendChild(handeln);
    leiste.appendChild(start);

    var meldung = el('p', 'w-meldung', wMeldung);
    meldung.setAttribute('aria-live', 'polite');
    leiste.appendChild(meldung);

    if (laeufe.length) {
      var box = el('div', 'w-laeufe');
      box.appendChild(el('h3', null, 'Deine Läufe'));
      var bester = laeufe.reduce(function (m, l, i) { return l.Z > laeufe[m].Z ? i : m; }, 0);
      var ol = el('ol');
      laeufe.forEach(function (l, i) {
        var li = el('li', i === bester ? 'w-bester' : null, l.X + ' Min. · ' + (l.Z >= 0 ? l.Z + ' gespart' : (-l.Z) + ' mehr'));
        if (i === bester) li.appendChild(el('span', 'w-stern', ' ★ bester'));
        ol.appendChild(li);
      });
      box.appendChild(ol);
      leiste.appendChild(box);
    }

    /* Vorrat: Karten ohne Platz (auch Ablage-Ziel) */
    var vorrat = el('div', 'w-vorrat');
    vorrat.setAttribute('role', 'button');
    vorrat.appendChild(el('h3', null, '📥 Ohne Platz'));
    var ohne = lage.arbeiten.filter(function (a) { return !zu[a.id]; });
    if (ohne.length) {
      var reihe = el('div', 'w-vorrat-karten');
      ohne.forEach(function (a) { reihe.appendChild(wKarte(lage, zu, a)); });
      vorrat.appendChild(reihe);
    } else {
      vorrat.appendChild(el('p', 'w-leer', wWahl ? 'Tipp hier, um die Karte zurückzulegen.' : 'Alle Arbeiten haben einen Platz.'));
    }
    vorrat.addEventListener('click', function (e) {
      if (e.target.closest('.w-karte') || !wWahl) return;
      wLegen(wWahl, null);
    });
    leiste.appendChild(vorrat);

    var knoepfe = el('div', 'v-handlungen w-knoepfe');
    knoepfe.appendChild(knopf('📋 Wochenplan zeigen', null, function () { if (wLauf) return; wZeigen = true; zeichnen(); }));
    knoepfe.appendChild(knopf('↺ Alles neu planen', null, function () {
      if (wLauf) return;
      lage.arbeiten.forEach(function (a) { zu[a.id] = null; });
      wWahl = null;
      wMeldung = '';
      zeichnen();
    }));
    leiste.appendChild(knoepfe);

    /* Tafel der Grunddauern */
    var tafel = el('div', 'w-tafel');
    tafel.appendChild(el('h3', null, '⏱ So lange braucht jede Person'));
    tafel.appendChild(el('p', 'w-tafel-hinweis', 'Minuten bei normalem Tempo'));
    var tab = el('table');
    var kopfzeile = el('tr');
    kopfzeile.appendChild(el('th', null, ''));
    lage.personen.forEach(function (p) {
      var th = el('th', null, (p.zeichen ? p.zeichen + '\n' : '') + p.name);
      th.setAttribute('scope', 'col');
      kopfzeile.appendChild(th);
    });
    var thead = el('thead');
    thead.appendChild(kopfzeile);
    tab.appendChild(thead);
    var tbody = el('tbody');
    var gesehen = {};
    lage.arbeiten.forEach(function (a) {
      var n = a.typ || a.kurz || a.name;
      if (gesehen[n]) return;
      gesehen[n] = true;
      var tr = el('tr');
      var th = el('th', null, (a.zeichen ? a.zeichen + ' ' : '') + n);
      th.setAttribute('scope', 'row');
      tr.appendChild(th);
      lage.personen.forEach(function (p) {
        var nein = a.kann_nicht && a.kann_nicht[p.id];
        var td = el('td', nein ? 'w-kann-nicht' : null, nein ? 'kann nicht' : String(a.dauer[p.id]));
        if (nein) td.title = nein;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    tab.appendChild(tbody);
    tafel.appendChild(tab);
    leiste.appendChild(tafel);

    wBlattZeichnen(lage, zu, laeufe);
    wMarkieren();
  }

  /* Wochenplan-Blatt: Liste „Person: Arbeiten“ für die Tafel */
  function wBlattZeichnen(lage, zu, laeufe) {
    var alt = document.getElementById('w-wochenplan');
    if (alt) alt.parentNode.removeChild(alt);
    if (!wZeigen) return;
    var hinter = el('div', 'w-overlay');
    hinter.id = 'w-wochenplan';
    var b = el('div', 'w-wochenplan m-blatt');
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Wochenplan');
    b.appendChild(el('h2', null, '📋 Wochenplan: Wer macht was?'));
    function abschnitt(titel, plan, mitMinuten) {
      b.appendChild(el('h3', null, titel));
      var ul = el('ul', 'w-plan-liste');
      wListe(lage, plan, mitMinuten).forEach(function (z) {
        var li = el('li');
        li.appendChild(el('strong', null, (z.person.zeichen ? z.person.zeichen + ' ' : '') + z.person.name +
          (z.minuten != null ? ' (' + z.minuten + ' Min.)' : '') + ': '));
        li.appendChild(document.createTextNode(z.text));
        ul.appendChild(li);
      });
      b.appendChild(ul);
    }
    abschnitt('Dein Plan jetzt', zu, false);
    if (laeufe.length) {
      var bi = laeufe.reduce(function (m, l, i) { return l.Z > laeufe[m].Z ? i : m; }, 0);
      var l = laeufe[bi];
      abschnitt('Dein bester Lauf: Lauf ' + (bi + 1) + ', ' + (l.Z >= 0 ? l.Z + ' Minuten gespart' : (-l.Z) + ' Minuten mehr'), l.plan, true);
    }
    var h = el('div', 'v-handlungen');
    h.appendChild(knopf('Schließen', 'voll', function () { wZeigen = false; zeichnen(); }));
    b.appendChild(h);
    hinter.appendChild(b);
    hinter.addEventListener('click', function (e) { if (e.target === hinter) { wZeigen = false; zeichnen(); } });
    document.body.appendChild(hinter);
  }

  /* Lauf: Zeiger wandert über die Tageszeiten der Woche, Karten werden erledigt, am Ende die Zahl. */
  function wAbspielen(lage, zu, key, startKnopf, lauf) {
    if (wLauf) return;
    wWahl = null;
    wMeldung = '';
    wMarkieren();
    var meld = document.querySelector('.w-meldung');
    if (meld) meld.textContent = '';
    startKnopf.disabled = true;
    document.body.classList.add('w-laeuft');
    Array.prototype.forEach.call(document.querySelectorAll('.w-gewinn, .w-gesamt, .w-je, .w-status, .w-person-summe'), function (e) { e.hidden = true; });
    var nb = wBlockZahl(lage), schritt = lage.lauf_ms ? lage.lauf_ms / nb : 650;
    var b = 0, bisher = 0;
    function weiter() {
      Array.prototype.forEach.call(document.querySelectorAll('.w-jetzt'), function (e) { e.classList.remove('w-jetzt'); });
      if (b >= nb) {
        wLauf = setTimeout(function () {
          wLauf = null;
          document.body.classList.remove('w-laeuft');
          abgespielt[lageNr] = key;
          var s = wSumme(lage, zu);
          var Y = wSumme(lage, wBisher(lage)).gesamt;
          var liste = versuche[lageNr];
          if (!liste.some(function (l) { return l.key === key; })) {
            var kopie = {};
            Object.keys(zu).forEach(function (k) { kopie[k] = zu[k] ? { p: zu[k].p, b: zu[k].b } : null; });
            liste.push({ key: key, X: s.gesamt, Z: Y - s.gesamt, plan: kopie });
          }
          zeichnen();
        }, 300);
        return;
      }
      var tag = Math.floor(b / lage.zeiten.length);
      var kopf = document.querySelector('.w-tag[data-t="' + tag + '"]');
      if (kopf) kopf.classList.add('w-jetzt');
      Array.prototype.forEach.call(document.querySelectorAll('.w-zelle[data-b="' + b + '"]'), function (z) {
        z.classList.add('w-jetzt');
        Array.prototype.forEach.call(z.querySelectorAll('.w-karte'), function (k) {
          k.classList.add('w-erledigt');
          var a = wArbeit(lage, k.getAttribute('data-a'));
          var zz = zu[a.id];
          bisher += wDauer(lage, a, zz.p, zz.b);
        });
      });
      lauf.textContent = wBlockName(lage, b, true) + ' · bisher ' + bisher + ' Minuten gearbeitet';
      b += 1;
      wLauf = setTimeout(weiter, schritt);
    }
    wLauf = setTimeout(weiter, 50);
  }

  /* ── Seite ───────────────────────────────────────────────────────── */
  function zeichnen() {
    var lage = daten.lagen[lageNr];
    var zu = zuteilung[lageNr];
    if (wLauf) { clearTimeout(wLauf); wLauf = null; document.body.classList.remove('w-laeuft'); }
    document.body.classList.toggle('v-woche-an', lage.art === 'woche');
    if (lage.art !== 'woche') {
      wZeigen = false;
      var blattAlt = document.getElementById('w-wochenplan');
      if (blattAlt) blattAlt.parentNode.removeChild(blattAlt);
    }

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
      zuteilung.push(lage.art === 'woche' ? wBisher(lage) : leer);
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
