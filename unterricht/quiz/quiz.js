/* Quiz — geteiltes Werkzeug: Fragen zum Üben zu Hause (Mehrfachwahl und „stimmt / stimmt nicht“).
   Liest data.json im Ordner der Seite (erzeugt von einem Bauskript aus einem Fragen-Pool, nie von Hand):
     titel, satz, runde (Zahl der Fragen je Runde), zusatz_zeigen (Zusatzfragen „Mehr wissen“ anbieten),
     stunden[] {id, titel, ues[]}, fragen[] {id, ue, status (heft | heft_geplant | zusatz), typ (mc | rf),
     frage, richtig, falsch[], erklaerung}.
   Ablauf: Startbild → Frage für Frage (Rückmeldung mit Erklärung, „Weiter“) → Ende mit „X von N richtig“,
   den falschen Fragen und „Falsche noch einmal“ / „Neue Runde“ / „Zum Start“.
   Keine Note, keine Rangliste, kein Zeitdruck. Nichts wird gespeichert (kein Server, kein localStorage).
   Mehrfachwahl: Reihenfolge der Antworten bei jeder Frage neu gemischt; „stimmt / stimmt nicht“ immer gleich. */
(function () {
  'use strict';

  var daten = null;
  var buehne = null;
  var gesehen = {};        // Fragen, die in diesem Besuch schon vorkamen (nur im Speicher der Seite)
  var runde = null;        // {fragen: [Frage], nr, antworten: [{frage, wahl, richtig}], quelle, titel, reihe: [Antworttexte]}

  function el(tag, klasse, text) {
    var e = document.createElement(tag);
    if (klasse) e.className = klasse;
    if (text != null) e.textContent = text;
    return e;
  }

  function knopf(text, klasse, beiKlick) {
    var k = el('button', 'm-knopf' + (klasse ? ' ' + klasse : ''), text);
    k.type = 'button';
    k.addEventListener('click', beiKlick);
    return k;
  }

  function leeren(e) { while (e.firstChild) e.removeChild(e.firstChild); }

  function mischen(liste) {
    var a = liste.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* Fragen einer Quelle: 'mix' (alle aus dem Heft), eine Stunden-id, 'zusatz' */
  function vorrat(quelle) {
    return daten.fragen.filter(function (q) {
      if (quelle === 'zusatz') return q.status === 'zusatz';
      if (q.status === 'zusatz') return false;
      if (quelle === 'mix') return true;
      var s = daten.stunden.filter(function (x) { return x.id === quelle; })[0];
      return s && s.ues.indexOf(q.ue) >= 0;
    });
  }

  /* Bis zu n Fragen ohne Wiederholung; bevorzugt solche, die in diesem Besuch noch nicht vorkamen. */
  function auswahl(quelle, n) {
    var alle = vorrat(quelle);
    var neu = mischen(alle.filter(function (q) { return !gesehen[q.id]; }));
    var alt = mischen(alle.filter(function (q) { return gesehen[q.id]; }));
    return neu.concat(alt).slice(0, Math.min(n, alle.length));
  }

  function titelVon(quelle) {
    if (quelle === 'mix') return 'Gemischt';
    if (quelle === 'zusatz') return 'Mehr wissen';
    var s = daten.stunden.filter(function (x) { return x.id === quelle; })[0];
    return s ? s.titel : '';
  }

  function starten(quelle, fragen, titel) {
    runde = { fragen: fragen, nr: 0, antworten: [], quelle: quelle, titel: titel || titelVon(quelle) };
    frageZeigen();
  }

  /* ── Startbild ────────────────────────────────────────────────────── */
  function startZeigen() {
    runde = null;
    leeren(buehne);
    var kopf = el('header', 'q-kopf');
    var h1 = el('h1', null, daten.titel);
    h1.tabIndex = -1;
    kopf.appendChild(h1);
    kopf.appendChild(el('p', 'q-satz', daten.satz));
    buehne.appendChild(kopf);
    var haupt = knopf('Zehn Fragen mischen', 'voll q-gross', function () {
      starten('mix', auswahl('mix', daten.runde || 10));
    });
    if ((daten.runde || 10) !== 10) haupt.textContent = (daten.runde) + ' Fragen mischen';
    buehne.appendChild(haupt);
    var liste = el('div', 'q-stunden');
    liste.setAttribute('role', 'group');
    liste.setAttribute('aria-label', 'Eine Stunde üben');
    daten.stunden.forEach(function (s) {
      if (!vorrat(s.id).length) return;
      var k = knopf(s.titel, 'q-stunde', function () { starten(s.id, auswahl(s.id, daten.runde || 10)); });
      k.setAttribute('data-stunde', s.id);
      liste.appendChild(k);
    });
    if (daten.zusatz_zeigen && vorrat('zusatz').length) {
      var z = knopf('Mehr wissen (nicht im Heft)', 'q-stunde q-zusatz', function () { starten('zusatz', auswahl('zusatz', daten.runde || 10)); });
      z.setAttribute('data-stunde', 'zusatz');
      liste.appendChild(z);
    }
    buehne.appendChild(liste);
    h1.focus();
  }

  /* ── Frage ────────────────────────────────────────────────────────── */
  function frageZeigen() {
    var q = runde.fragen[runde.nr];
    var n = runde.fragen.length;
    gesehen[q.id] = true;
    leeren(buehne);

    var kopf = el('header', 'q-fortschritt');
    kopf.appendChild(el('p', 'q-zaehler', 'Frage ' + (runde.nr + 1) + ' von ' + n));
    var balken = el('div', 'q-balken');
    balken.setAttribute('role', 'progressbar');
    balken.setAttribute('aria-label', 'Fortschritt');
    balken.setAttribute('aria-valuemin', '0');
    balken.setAttribute('aria-valuemax', String(n));
    balken.setAttribute('aria-valuenow', String(runde.nr + 1));
    var fuell = el('div', 'q-balken-fuell');
    fuell.style.width = ((runde.nr + 1) / n * 100) + '%';
    balken.appendChild(fuell);
    kopf.appendChild(balken);
    buehne.appendChild(kopf);

    var frage = el('h2', 'q-frage', q.frage);
    frage.setAttribute('data-id', q.id);
    frage.tabIndex = -1;
    frage.id = 'q-frage';
    buehne.appendChild(frage);

    var reihe = q.typ === 'rf' ? ['stimmt', 'stimmt nicht'] : mischen([q.richtig].concat(q.falsch));
    var antworten = el('div', 'q-antworten' + (q.typ === 'rf' ? ' q-rf' : ''));
    antworten.setAttribute('role', 'group');
    antworten.setAttribute('aria-labelledby', 'q-frage');
    var knoepfe = [];
    var rueck = el('div', 'q-rueck');
    rueck.setAttribute('aria-live', 'polite');
    reihe.forEach(function (text, i) {
      var k = el('button', 'q-antwort');
      k.type = 'button';
      k.setAttribute('data-nr', String(i));
      k.appendChild(el('span', 'q-antwort-text', text));
      k.addEventListener('click', function () { antworten_(text, k); });
      knoepfe.push(k);
      antworten.appendChild(k);
    });
    buehne.appendChild(antworten);
    buehne.appendChild(rueck);

    var beantwortet = false;
    function antworten_(text, gewaehlt) {
      if (beantwortet) return;          // ein zweiter Tipp ändert nichts
      beantwortet = true;
      var ok = text === q.richtig;
      runde.antworten.push({ frage: q, wahl: text, richtig: ok });
      knoepfe.forEach(function (k) {
        var t = k.querySelector('.q-antwort-text').textContent;
        k.setAttribute('aria-disabled', 'true');
        if (t === q.richtig) {
          k.classList.add('q-ist-richtig');
          k.appendChild(el('span', 'q-marke', 'richtig'));
        } else if (k === gewaehlt) {
          k.classList.add('q-ist-falsch');
          k.appendChild(el('span', 'q-marke', 'falsch'));
        }
        if (k === gewaehlt) {
          k.classList.add('q-gewaehlt');
          k.setAttribute('aria-pressed', 'true');
        }
      });
      rueck.appendChild(el('p', 'q-urteil ' + (ok ? 'q-urteil-richtig' : 'q-urteil-falsch'), ok ? 'Richtig.' : 'Falsch.'));
      rueck.appendChild(el('p', 'q-erklaerung', q.erklaerung));
      var weiter = knopf('Weiter', 'voll q-gross q-weiter', function () {
        runde.nr += 1;
        if (runde.nr < runde.fragen.length) frageZeigen(); else endeZeigen();
      });
      rueck.appendChild(weiter);
      weiter.focus({ preventScroll: true });
      if (weiter.scrollIntoView) weiter.scrollIntoView({ block: 'nearest' });
    }
    frage.focus();
    window.scrollTo(0, 0);
  }

  /* ── Ende der Runde ──────────────────────────────────────────────── */
  function endeZeigen() {
    var n = runde.antworten.length;
    var gut = runde.antworten.filter(function (a) { return a.richtig; }).length;
    var falsche = runde.antworten.filter(function (a) { return !a.richtig; });
    var quelle = runde.quelle === 'falsche' ? runde.basis : runde.quelle;
    leeren(buehne);
    var h = el('h2', 'q-ergebnis', 'Du hast ' + gut + ' von ' + n + ' richtig.');
    h.tabIndex = -1;
    buehne.appendChild(h);
    if (falsche.length) {
      var box = el('section', 'q-falsche');
      box.appendChild(el('h3', null, 'Das übst du noch:'));
      var ul = el('ul');
      falsche.forEach(function (a) {
        var li = el('li');
        li.appendChild(el('p', 'q-falsch-frage', a.frage.frage));
        li.appendChild(el('p', 'q-falsch-loesung', 'Richtig ist: ' + a.frage.richtig));
        ul.appendChild(li);
      });
      box.appendChild(ul);
      buehne.appendChild(box);
    }
    var wahl = el('div', 'q-ende-knoepfe');
    if (falsche.length) {
      wahl.appendChild(knopf('Falsche noch einmal', 'voll q-gross', function () {
        var basis = quelle;
        starten('falsche', mischen(falsche.map(function (a) { return a.frage; })), 'Falsche noch einmal');
        runde.basis = basis;
      }));
    }
    wahl.appendChild(knopf('Neue Runde', (falsche.length ? '' : 'voll ') + 'q-gross', function () {
      starten(quelle, auswahl(quelle, daten.runde || 10));
    }));
    wahl.appendChild(knopf('Zum Start', 'q-gross', startZeigen));
    buehne.appendChild(wahl);
    window.scrollTo(0, 0);
    h.focus();
  }

  function los(d) {
    daten = d;
    document.title = d.titel;
    startZeigen();
  }

  buehne = document.getElementById('q-buehne');
  fetch('data.json', { cache: 'no-cache' })
    .then(function (r) { return r.json(); })
    .then(los)
    .catch(function () {
      leeren(buehne);
      buehne.appendChild(el('p', 'q-satz', 'Das Quiz konnte nicht geladen werden. Lade die Seite neu.'));
    });
})();
