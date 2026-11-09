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

  /* ── Art „woche“: Wochenplan-Rennen (Zeitbalken-Sprache, Oberfläche Version 2) ──
     Daten: tage, tage_lang, zeiten, arten {id: {name, zeichen}};
     personen[] mit bloecke = 14 × [freie Minuten, Tempo] (Mo vorm., Mo nachm., Di vorm., …; 0 = nicht da,
       Tempo > 1 langsamer, < 1 schneller), weg / weg_wochenende = {zeichen, text} (Grund fürs Fehlen),
       merkmale = [{zeichen, text}] (zwei bis drei Zeichen neben dem Gesicht);
     arbeiten[] mit dauer je Person (bei Tempo 1), art, womit, wo, optional kann_nicht {person: Satz};
     bisher[] = Startplan.
     Bild: Ein Platz ist ein Balken (Länge = freie Minuten), eine gelegte Arbeit ein Baustein (Länge = Minuten,
     die diese Person dort braucht). Dauer = Grunddauer × Tempo, gerundet (floor(x + 0,5)); Summe im Platz ≤ freie Minuten.
     Gezählt wird die Summe der Arbeitsminuten. Das Werkzeug zeigt nur Zahlen und Längen, nie einen Tipp. */
  var wWahl = null;        // ausgewählte Karte (id)
  var wMeldung = '';       // kurzer Satz unten (nur, wenn ein Bild den Grund nicht zeigt)
  var wWackeln = null;     // Platz, der nach einer Ablehnung wackeln soll: 'p@b'
  var wLauf = null;        // laufende Wiedergabe (setTimeout)
  var wZeigen = false;     // Wochenplan-Blatt offen
  var wZug = null;         // laufendes Ziehen
  var wZeigerZeit = 0;     // Ende des letzten Ziehens …
  var wZeigerKarte = null; // … und welche Karte gezogen wurde (deren Klick danach ignorieren)

  function wBlockZahl(lage) { return lage.tage.length * lage.zeiten.length; }
  function wPerson(lage, id) { return lage.personen.filter(function (p) { return p.id === id; })[0]; }
  function wArbeit(lage, id) { return lage.arbeiten.filter(function (a) { return a.id === id; })[0]; }
  function wArt(lage, a) { return (lage.arten && lage.arten[a.art]) || null; }

  function wDauer(lage, a, pid, b) {
    var blk = wPerson(lage, pid).bloecke[b];
    return Math.floor(a.dauer[pid] * blk[1] + 0.5 + 1e-9);
  }

  function wMax(lage) {
    var m = 0;
    lage.personen.forEach(function (p) { p.bloecke.forEach(function (x) { if (x[0] > m) m = x[0]; }); });
    return m || 60;
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

  /* Darf Karte aid in Block b von Person pid? Liefert {ok, art: 'kann'|'weg'|'voll', grund, dauer}. */
  function wPruefen(lage, zu, aid, pid, b) {
    var a = wArbeit(lage, aid), p = wPerson(lage, pid);
    if (a.kann_nicht && a.kann_nicht[pid]) return { ok: false, art: 'kann', grund: a.kann_nicht[pid] };
    var kap = p.bloecke[b][0];
    if (!kap) return { ok: false, art: 'weg', grund: p.name + ' ist am ' + wBlockName(lage, b, true) + ' nicht da.' };
    var d = wDauer(lage, a, pid, b);
    var fehlt = wBelegt(lage, zu, pid, b, aid) + d - kap;
    if (fehlt > 0) return { ok: false, art: 'voll', fehlt: fehlt, dauer: d };
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

  function wZeigerAn(k, aid, ausKalender) {
    k.addEventListener('pointerdown', function (e) { wZeigerStart(e, aid, k); });
    k.addEventListener('click', function (e) {
      e.stopPropagation();
      if (wZeigerKarte === aid && Date.now() - wZeigerZeit < 400) return;   // Klick nach dem Ziehen: schon erledigt
      wKarteTippen(aid, ausKalender);
    });
  }

  /* Karte im Stapel: Etikett „Art der Arbeit“, Bild + Name (Arbeitsaufgabe), Womit, Wo, und wer sie gerade hat. */
  function wKarte(lage, zu, a) {
    var z = zu[a.id], art = wArt(lage, a);
    var k = el('button', 'w-karte w-art-' + (a.art || 'haus') + (z ? '' : ' w-ohne-platz'));
    k.type = 'button';
    k.setAttribute('data-a', a.id);
    if (art) k.appendChild(el('span', 'w-karte-art', (art.zeichen ? art.zeichen + ' ' : '') + art.name));
    var kopf = el('span', 'w-karte-kopf');
    kopf.appendChild(el('span', 'w-karte-bild', a.zeichen || ''));
    kopf.appendChild(el('span', 'w-karte-name', a.kurz || a.name));
    k.appendChild(kopf);
    if (a.womit) k.appendChild(el('span', 'w-karte-zeile', (a.womit.zeichen ? a.womit.zeichen + ' ' : '') + a.womit.text));
    if (a.wo) k.appendChild(el('span', 'w-karte-zeile', (a.wo.zeichen ? a.wo.zeichen + ' ' : '') + a.wo.text));
    var bei = el('span', 'w-karte-bei');
    if (z) {
      var p = wPerson(lage, z.p);
      bei.textContent = (p.zeichen ? p.zeichen + ' ' : '') + wDauer(lage, a, z.p, z.b) + ' Min.';
    } else {
      bei.textContent = '❓ ohne Platz';
    }
    k.appendChild(bei);
    k.setAttribute('aria-label', a.name + (art ? ', ' + art.name : '') + (a.womit ? ', womit: ' + a.womit.text : '') +
      (a.wo ? ', wo: ' + a.wo.text : '') + ', ' + (z ? wPerson(lage, z.p).name + ', ' + wBlockName(lage, z.b, true) + ', ' +
      wDauer(lage, a, z.p, z.b) + ' Minuten' : 'ohne Platz'));
    if (wWahl === a.id) k.classList.add('w-gewaehlt');
    k.setAttribute('aria-pressed', wWahl === a.id ? 'true' : 'false');
    wZeigerAn(k, a.id, false);
    return k;
  }

  /* Baustein im Platz: Länge = Minuten dieser Person an diesem Platz (Anteil an der Balkenlänge). */
  function wStein(lage, zu, a, kap) {
    var z = zu[a.id], d = wDauer(lage, a, z.p, z.b);
    var s = el('button', 'w-stein w-art-' + (a.art || 'haus'));
    s.type = 'button';
    s.setAttribute('data-a', a.id);
    s.style.width = (d / kap * 100) + '%';
    s.appendChild(el('span', 'w-stein-bild', a.zeichen || '•'));
    s.appendChild(el('span', 'w-stein-min', String(d)));
    s.setAttribute('aria-label', a.name + ', ' + d + ' Minuten');
    if (wWahl === a.id) s.classList.add('w-gewaehlt');
    wZeigerAn(s, a.id, true);
    return s;
  }

  /* Ist schon eine Karte ausgewählt, zählt ein Tipp auf einen Baustein im Kalender als Tipp auf seinen Platz
     (Kinder tippen dorthin, wo die Karte hin soll, auch wenn dort schon etwas liegt). Im Stapel wechselt die Auswahl. */
  function wKarteTippen(aid, ausKalender) {
    if (wLauf) return;
    var zu = zuteilung[lageNr];
    if (wWahl && wWahl !== aid && ausKalender && zu[aid]) { wLegen(wWahl, { p: zu[aid].p, b: zu[aid].b }); return; }
    wWahl = wWahl === aid ? null : aid;
    wMeldung = '';
    zeichnen();
  }

  /* Ziel antippen oder Karte dort loslassen: ziel = {p, b} oder null (= zurück in den Stapel, ohne Platz) */
  function wLegen(aid, ziel) {
    var lage = daten.lagen[lageNr], zu = zuteilung[lageNr];
    if (!aid || wLauf) return;
    if (ziel) {
      var r = wPruefen(lage, zu, aid, ziel.p, ziel.b);
      if (!r.ok) {
        wMeldung = r.art === 'kann' ? r.grund : '';   // nur „kann nicht“ braucht einen Satz; sonst zeigt es das Bild
        wWackeln = ziel.p + '@' + ziel.b;
        wWahl = aid;
        zeichnen();
        return;
      }
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
    var platz = t.closest('.w-platz');
    if (platz) return { el: platz, ziel: { p: platz.getAttribute('data-p'), b: parseInt(platz.getAttribute('data-b'), 10) } };
    var band = t.closest('.w-band');
    if (band) return { el: band, ziel: 'weg' };
    var stapel = t.closest('.w-stapel');
    if (stapel) return { el: stapel, ziel: null };
    return null;
  }

  function wZeigerZug(e) {
    if (!wZug || e.pointerId !== wZug.id) return;
    var dx = e.clientX - wZug.x, dy = e.clientY - wZug.y;
    if (!wZug.zieht) {
      if (dx * dx + dy * dy < 64) return;
      wZug.zieht = true;
      wWahl = wZug.aid;
      var a = wArbeit(daten.lagen[lageNr], wZug.aid);
      var g = el('div', 'w-geist w-art-' + (a.art || 'haus'));
      g.appendChild(el('span', 'w-karte-bild', a.zeichen || ''));
      g.appendChild(el('span', 'w-karte-name', a.kurz || a.name));
      document.body.appendChild(g);
      wZug.geist = g;
      wZug.k.classList.add('w-gezogen');
      document.body.classList.add('w-zieht');
      wMarkieren();
    }
    wZug.geist.style.left = (e.clientX - 30) + 'px';
    wZug.geist.style.top = (e.clientY - 26) + 'px';
    wZug.letztY = e.clientY;
    wRandScroll();
    var u = wZielUnter(e.clientX, e.clientY);
    var neu = u ? u.el : null;
    if (wZug.ueber !== neu) {
      if (wZug.ueber) wZug.ueber.classList.remove('w-ueber');
      if (neu) neu.classList.add('w-ueber');
      wZug.ueber = neu;
    }
    e.preventDefault();
  }

  /* Beim Ziehen am oberen oder unteren Bildrand die Seite mitscrollen (der Finger kann nicht scrollen, solange er zieht). */
  function wRandScroll() {
    if (!wZug || wZug.scroll) return;
    function schritt() {
      if (!wZug || !wZug.zieht) { if (wZug) wZug.scroll = null; return; }
      var y = wZug.letztY, h = window.innerHeight, d = 0;
      if (y > h - 40) d = Math.min(12, (y - (h - 40)) / 3 + 3);
      else if (y < 40) d = -Math.min(12, (40 - y) / 3 + 3);
      if (d) window.scrollBy(0, d);
      wZug.scroll = d ? requestAnimationFrame(schritt) : null;
    }
    wZug.scroll = requestAnimationFrame(schritt);
  }

  function wZeigerAufraeumen() {
    if (!wZug) return;
    if (wZug.scroll) cancelAnimationFrame(wZug.scroll);
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
    if (u && u.ziel === 'weg') { wWahl = null; wMeldung = ''; wWackeln = 'band'; zeichnen(); return; }
    if (u) { wLegen(zug.aid, u.ziel); return; }
    wWahl = null;          // daneben losgelassen: die Karte springt zurück
    zeichnen();
  }

  function wZeigerAbbruch() {
    wZeigerAufraeumen();
    wZug = null;
    zeichnen();
  }

  /* Bei ausgewählter Karte: Geisterbild in jedem Platz (Länge = Minuten dort), passt / zu lang / kann nicht. */
  function wMarkieren() {
    var lage = daten.lagen[lageNr], zu = zuteilung[lageNr];
    Array.prototype.forEach.call(document.querySelectorAll('.w-platz'), function (z) {
      var pid = z.getAttribute('data-p'), b = parseInt(z.getAttribute('data-b'), 10);
      var g = z.querySelector('.w-geist-stein');
      z.classList.remove('w-passt', 'w-zulang', 'w-nein', 'w-ort');
      g.hidden = true;
      if (!wWahl) return;
      var jetzt = zu[wWahl];
      if (jetzt && jetzt.p === pid && jetzt.b === b) { z.classList.add('w-ort'); return; }
      var r = wPruefen(lage, zu, wWahl, pid, b);
      if (r.art === 'kann') { z.classList.add('w-nein'); return; }
      var kap = wPerson(lage, pid).bloecke[b][0];
      g.hidden = false;
      g.style.width = (r.dauer / kap * 100) + '%';
      g.textContent = String(r.dauer);
      z.classList.add(r.ok ? 'w-passt' : 'w-zulang');
    });
    var st = document.querySelector('.w-stapel');
    if (st) st.classList.toggle('w-bereit', !!wWahl && !!zu[wWahl]);
  }

  function wWegVon(lage, p, b) {
    var t = Math.floor(b / lage.zeiten.length);
    return (t >= 5 && p.weg_wochenende) ? p.weg_wochenende : (p.weg || { zeichen: '–', text: 'nicht da' });
  }

  /* Ein Platz: weißer Balken, Länge = freie Minuten (bezogen auf den größten Platz der Woche). */
  function wPlatz(lage, zu, p, b, max) {
    var blk = p.bloecke[b], kap = blk[0];
    var z = el('div', 'w-platz');
    z.setAttribute('data-p', p.id);
    z.setAttribute('data-b', String(b));
    z.setAttribute('role', 'button');
    var frei = kap - wBelegt(lage, zu, p.id, b);
    z.setAttribute('aria-label', p.name + ', ' + wBlockName(lage, b, true) + ', ' + frei + ' Minuten frei' +
      (blk[1] > 1 ? ', langsamer' : blk[1] < 1 ? ', schneller' : ''));
    var spur = el('div', 'w-spur');
    spur.style.width = (kap / max * 84) + '%';     // 60 Min. = 84 % der Spalte: ein zu langes Geisterbild ragt sichtbar über
    wImBlock(lage, zu, p.id, b).forEach(function (a) { spur.appendChild(wStein(lage, zu, a, kap)); });
    var g = el('div', 'w-geist-stein');
    g.hidden = true;
    spur.appendChild(g);
    z.appendChild(spur);
    if (blk[1] > 1) { z.classList.add('w-langsam'); z.appendChild(el('span', 'w-tempo-zeichen', '🐢')); }
    else if (blk[1] < 1) { z.classList.add('w-schnell'); z.appendChild(el('span', 'w-tempo-zeichen', '⚡')); }
    if (wWackeln === p.id + '@' + b) z.classList.add('w-wackeln');
    z.addEventListener('click', function () {
      if (wLauf || !wWahl) return;
      wLegen(wWahl, { p: p.id, b: b });
    });
    return z;
  }

  /* Graues Band für zusammenhängende Tage, an denen die Person zu dieser Tageszeit nicht da ist. */
  function wBand(weg, spanne, aria) {
    var band = el('div', 'w-band');
    band.style.gridColumn = 'span ' + spanne;
    band.setAttribute('aria-label', aria);
    band.appendChild(el('span', 'w-band-zeichen', weg.zeichen));
    if (spanne >= 2) band.appendChild(el('span', 'w-band-wort', weg.text));
    band.addEventListener('click', function () {
      if (!wWahl || wLauf) return;
      wWackeln = 'band';
      band.classList.remove('w-wackeln');
      void band.offsetWidth;
      band.classList.add('w-wackeln');
    });
    return band;
  }

  function wocheZeichnen(lage, zu, blatt) {
    var s = wSumme(lage, zu);
    var key = wSchluessel(lage, zu);
    var laeufe = versuche[lageNr];
    var fertig = abgespielt[lageNr] === key && s.offen === 0;
    var max = wMax(lage);
    var Y = wSumme(lage, wBisher(lage)).gesamt;

    /* Oben: großer Satz und Nebenknöpfe links, Start/Ergebnis rechts an fester Stelle */
    var oben = el('div', 'w-oben');
    var intro = el('div', 'w-intro');
    while (blatt.firstChild) intro.appendChild(blatt.firstChild);
    var neben = el('div', 'w-neben');   // kommt in den Kopf des Kartenstapels
    neben.appendChild(knopf('📋 Wochenplan zeigen', 'w-klein', function () { if (wLauf) return; wZeigen = true; zeichnen(); }));
    neben.appendChild(knopf('↺ Alles neu planen', 'w-klein', function () {
      if (wLauf) return;
      lage.arbeiten.forEach(function (a) { zu[a.id] = null; });
      wWahl = null;
      wMeldung = '';
      zeichnen();
    }));
    oben.appendChild(intro);

    var start = el('div', 'w-start');
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
      start.appendChild(el('p', 'w-gesamt', 'Die Familie hat ' + s.gesamt + ' Minuten gearbeitet. Bisher: ' + Y + ' Minuten.'));
    } else {
      var st = s.offen > 0 ? (s.offen === 1 ? 'Noch 1 Arbeit ohne Platz.' : 'Noch ' + s.offen + ' Arbeiten ohne Platz.')
        : (laeufe.length ? 'Plan geändert. Drück auf Start.' : '');
      if (st) start.appendChild(el('p', 'w-status' + (s.offen > 0 ? ' w-gesperrt' : ''), st));
      else {
        var schritte = el('ol', 'w-schritte');
        schritte.appendChild(el('li', null, 'Zieh Karten in andere Plätze.'));
        schritte.appendChild(el('li', null, 'Drück auf Start.'));
        start.appendChild(schritte);
      }
    }
    var lauf = el('p', 'w-lauf');
    lauf.setAttribute('aria-live', 'polite');
    start.appendChild(lauf);
    var unberuehrt = !laeufe.length && key === wSchluessel(lage, wBisher(lage));
    var startKnopf = knopf(fertig ? '↻ Noch einmal abspielen' : '▶ Start', (unberuehrt || fertig ? '' : 'voll ') + 'w-start-knopf', function () {
      wAbspielen(lage, zu, key, startKnopf, lauf);
    });
    startKnopf.disabled = s.offen > 0;
    start.appendChild(startKnopf);
    if (laeufe.length) {
      var bester = laeufe.reduce(function (m, l, i) { return l.Z > laeufe[m].Z ? i : m; }, 0);
      var ol = el('ol', 'w-laeufe');
      laeufe.forEach(function (l, i) {
        var li = el('li', i === bester ? 'w-bester' : null, 'Lauf ' + (i + 1) + ': ' + (l.Z >= 0 ? l.Z + ' gespart' : (-l.Z) + ' mehr'));
        if (i === bester) li.appendChild(el('span', 'w-stern', ' ★'));
        ol.appendChild(li);
      });
      start.appendChild(ol);
    }
    oben.appendChild(start);
    blatt.appendChild(oben);

    /* Kalender: Spalten = Tage, je Person zwei Spuren; Plätze als Balken, Abwesenheit als graue Bänder */
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
    lage.personen.forEach(function (p) {
      lage.zeiten.forEach(function (zeit, zi) {
        if (zi === 0) {
          var name = el('div', 'w-person');
          name.style.gridRow = 'span ' + lage.zeiten.length;
          var gesicht = el('span', 'w-gesicht');
          gesicht.appendChild(el('span', 'w-person-zeichen', p.zeichen || ''));
          gesicht.appendChild(el('span', 'w-person-name', p.name));
          name.appendChild(gesicht);
          (p.merkmale || []).forEach(function (m) {
            var mk = el('span', 'w-merkmal');
            mk.appendChild(el('span', 'w-merkmal-zeichen', m.zeichen));
            mk.appendChild(el('span', 'w-merkmal-wort', m.text));
            name.appendChild(mk);
          });
          if (fertig) name.appendChild(el('span', 'w-person-summe', s.je[p.id] + ' Min.'));
          if (p.profil) name.title = p.profil.join(' ');
          kal.appendChild(name);
        }
        kal.appendChild(el('div', 'w-zeit' + (zi === 0 ? ' w-erste' : ''), zeit === 'vormittags' ? 'vorm.' : zeit === 'nachmittags' ? 'nachm.' : zeit));
        var t = 0;
        while (t < lage.tage.length) {
          var b = t * lage.zeiten.length + zi;
          if (p.bloecke[b][0]) {
            var platz = wPlatz(lage, zu, p, b, max);
            if (zi === 0) platz.classList.add('w-erste');
            kal.appendChild(platz);
            t += 1;
            continue;
          }
          var weg = wWegVon(lage, p, b), n = 1;
          while (t + n < lage.tage.length && !p.bloecke[(t + n) * lage.zeiten.length + zi][0] &&
                 wWegVon(lage, p, (t + n) * lage.zeiten.length + zi) === weg) n += 1;
          var band = wBand(weg, n, p.name + ', ' + lage.tage[t] + (n > 1 ? ' bis ' + lage.tage[t + n - 1] : '') + ' ' + zeit + ': ' + weg.text);
          if (zi === 0) band.classList.add('w-erste');
          kal.appendChild(band);
          t += n;
        }
      });
    });
    rahmen.appendChild(kal);
    blatt.appendChild(rahmen);

    /* Kartenstapel: alle Arbeiten der Woche; Karten ohne Platz zuerst. Auch Ablage-Ziel („zurück in den Stapel“). */
    var stapel = el('div', 'w-stapel');
    var kopf = el('div', 'w-stapel-kopf');
    kopf.appendChild(el('h3', null, '🃏 Die Arbeiten der Woche'));
    kopf.appendChild(el('span', 'w-stapel-hinweis', 'Zieh eine Karte in einen Platz.'));
    kopf.appendChild(neben);
    stapel.appendChild(kopf);
    var reihe = el('div', 'w-stapel-karten');
    lage.arbeiten.filter(function (a) { return !zu[a.id]; }).concat(lage.arbeiten.filter(function (a) { return zu[a.id]; }))
      .forEach(function (a) { reihe.appendChild(wKarte(lage, zu, a)); });
    stapel.appendChild(reihe);
    stapel.addEventListener('click', function (e) {
      if (e.target.closest('.w-karte') || !wWahl || wLauf) return;
      wLegen(wWahl, null);
    });
    blatt.appendChild(stapel);

    var meldung = el('p', 'w-meldung', wMeldung);
    meldung.setAttribute('aria-live', 'polite');
    blatt.appendChild(meldung);

    wBlattZeichnen(lage, zu, laeufe);
    wMarkieren();
    wWackeln = null;
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

  /* Lauf: Zeiger wandert über die Tageszeiten der Woche, Bausteine werden erledigt, am Ende die Zahl. */
  function wAbspielen(lage, zu, key, startKnopf, lauf) {
    if (wLauf) return;
    wWahl = null;
    wMeldung = '';
    wMarkieren();
    var meld = document.querySelector('.w-meldung');
    if (meld) meld.textContent = '';
    startKnopf.disabled = true;
    document.body.classList.add('w-laeuft');
    Array.prototype.forEach.call(document.querySelectorAll('.w-gewinn, .w-gesamt, .w-status, .w-person-summe'), function (e) { e.hidden = true; });
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
      Array.prototype.forEach.call(document.querySelectorAll('.w-platz[data-b="' + b + '"]'), function (z) {
        z.classList.add('w-jetzt');
        Array.prototype.forEach.call(z.querySelectorAll('.w-stein'), function (k) {
          k.classList.add('w-erledigt');
          var a = wArbeit(lage, k.getAttribute('data-a'));
          var zz = zu[a.id];
          bisher += wDauer(lage, a, zz.p, zz.b);
        });
      });
      lauf.textContent = wBlockName(lage, b, true) + ' · ' + bisher + ' Minuten';
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
