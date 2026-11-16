/* Fälle — geteiltes Werkzeug: ein kurzer ausgedachter Fall zum Üben zu Hause, drei Schritte (finden, erklären, urteilen).
   Liest data.json im Ordner der Seite (erzeugt von einem Bauskript aus den Fall-Dateien der Kurs-Welt, nie von Hand):
     titel, satz, faelle[] {id, titel, textsorte, haushalt, kennzeichnung, einleitung,
       einheiten[] {id, von, zeit, text},
       schritt1 {auftrag, kategorien[] {id, name, frage}, loesung {einheit: kategorie}, erklaerung {einheit: Satz}},
       schritt2 {frage, antworten[] {text, richtig}, erklaerung},
       schritt3 {frage, positionen[] {id, text}, gut, erklaerung, begruendungen[] {text, passt_zu}, muster}}.
   Ablauf je Fall: Lesen → Schritt 1 (Zeilen antippen, Kategorie wählen, Prüfen) → Schritt 2 (eine Antwort)
   → Schritt 3 (Position wählen, dann die Gründe, die zu ihr passen, dann Beispielsatz) → Ende.
   Keine Note, keine Rangliste, kein Zeitdruck. Nichts wird gespeichert (kein Server, kein localStorage). */
(function () {
  'use strict';

  var daten = null;
  var buehne = null;
  var z = null;   // Zustand des Falls: {idx, f, wahl, s1, s2, s3, gr}

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

  function katName(id) {
    var k = z.f.schritt1.kategorien.filter(function (x) { return x.id === id; })[0];
    return k ? k.name : '';
  }

  /* Kopf: Titel des Falls (Lesen) oder „Schritt n von 3“ mit drei Teilen */
  function kopf(schritt) {
    var k = el('header', 'f-fortschritt');
    k.appendChild(el('p', 'f-zaehler', schritt === 0 ? z.f.titel : 'Schritt ' + schritt + ' von 3'));
    var b = el('div', 'f-balken');
    b.setAttribute('role', 'progressbar');
    b.setAttribute('aria-label', 'Fortschritt');
    b.setAttribute('aria-valuemin', '0');
    b.setAttribute('aria-valuemax', '3');
    b.setAttribute('aria-valuenow', String(schritt));
    for (var i = 1; i <= 3; i++) b.appendChild(el('span', 'f-teil' + (i <= schritt ? ' f-fertig' : '')));
    k.appendChild(b);
    return k;
  }

  function ueberschrift(text) {
    var h = el('h2', 'f-frage', text);
    h.tabIndex = -1;
    return h;
  }

  function oben(h) {
    window.scrollTo(0, 0);
    if (h && h.focus) h.focus({ preventScroll: true });
  }

  /* ── Startbild ────────────────────────────────────────────────────── */
  function startZeigen() {
    z = null;
    leeren(buehne);
    var k = el('header', 'f-kopf');
    var h1 = el('h1', null, daten.titel);
    h1.tabIndex = -1;
    k.appendChild(h1);
    k.appendChild(el('p', 'f-satz-start', daten.satz));
    buehne.appendChild(k);
    var liste = el('div', 'f-karten');
    liste.setAttribute('role', 'group');
    liste.setAttribute('aria-label', 'Einen Fall wählen');
    daten.faelle.forEach(function (f, i) {
      var b = el('button', 'm-knopf f-karte');
      b.type = 'button';
      b.setAttribute('data-fall', f.id);
      b.appendChild(el('span', 'f-karte-titel', f.titel));
      b.appendChild(el('span', 'f-karte-art', f.textsorte));
      b.addEventListener('click', function () { lesenZeigen(i); });
      liste.appendChild(b);
    });
    buehne.appendChild(liste);
    var p = el('p', 'f-hinweis');
    var a = el('a', null, 'Zum Quiz');
    a.href = '../../quiz/arbeit/';
    p.appendChild(a);
    buehne.appendChild(p);
    oben(h1);
  }

  /* ── Lesen ────────────────────────────────────────────────────────── */
  function lesenZeigen(idx) {
    z = { idx: idx, f: daten.faelle[idx], wahl: {}, s1: null, s2: null, s3: null, gr: null };
    leeren(buehne);
    buehne.appendChild(kopf(0));
    var h = ueberschrift(z.f.titel);
    buehne.appendChild(h);
    buehne.appendChild(el('p', 'f-kennzeichnung', z.f.kennzeichnung));
    buehne.appendChild(el('p', 'f-einleitung', z.f.einleitung));
    var ul = el('ul', 'f-text');
    z.f.einheiten.forEach(function (e) {
      var li = el('li');
      if (e.von) li.appendChild(el('span', 'f-von', e.von + (e.zeit ? ' ' + e.zeit : '')));
      li.appendChild(el('span', 'f-satz', e.text));
      ul.appendChild(li);
    });
    buehne.appendChild(ul);
    buehne.appendChild(knopf('Los', 'voll f-gross', schritt1Zeigen));
    oben(h);
  }

  /* ── Schritt 1: Zeilen antippen, Kategorie wählen, prüfen ─────────── */
  function schritt1Zeigen() {
    var f = z.f;
    var s = f.schritt1;
    leeren(buehne);
    buehne.appendChild(kopf(1));
    var h = ueberschrift(s.auftrag);
    buehne.appendChild(h);
    var zaehler = el('p', 'f-gewaehlt-zaehler');
    zaehler.setAttribute('aria-live', 'polite');
    buehne.appendChild(zaehler);
    var liste = el('ul', 'f-einheiten');
    var zeilen = {};
    var geprueft = false;
    var pruefBox = el('div', 'f-pruefen');

    function aktualisieren() {
      var n = Object.keys(z.wahl).length;
      var gesamt = f.einheiten.length;
      zaehler.textContent = n + ' von ' + gesamt + ' gewählt';
      leeren(pruefBox);
      if (!geprueft && n === gesamt) pruefBox.appendChild(knopf('Prüfen', 'voll f-gross', pruefen));
    }

    function alleZu() {
      Object.keys(zeilen).forEach(function (id) {
        zeilen[id].panel.hidden = true;
        zeilen[id].zeile.setAttribute('aria-expanded', 'false');
      });
    }

    f.einheiten.forEach(function (e) {
      var li = el('li', 'f-einheit');
      li.setAttribute('data-id', e.id);
      var zeile = el('button', 'f-zeile');
      zeile.type = 'button';
      zeile.setAttribute('aria-expanded', 'false');
      var txt = el('span', 'f-zeile-text');
      if (e.von) txt.appendChild(el('span', 'f-von', e.von + (e.zeit ? ' ' + e.zeit : '')));
      txt.appendChild(el('span', 'f-satz', e.text));
      var tag = el('span', 'f-tag', 'Tippen');
      zeile.appendChild(txt);
      zeile.appendChild(tag);
      var panel = el('div', 'f-wahl');
      panel.hidden = true;
      panel.setAttribute('role', 'group');
      panel.setAttribute('aria-label', 'Was zeigt diese Zeile?');
      s.kategorien.forEach(function (k) {
        var b = el('button', 'f-kat');
        b.type = 'button';
        b.setAttribute('data-kat', k.id);
        b.appendChild(el('span', 'f-kat-name', k.name));
        b.appendChild(el('span', 'f-kat-frage', k.frage));
        b.addEventListener('click', function () {
          if (geprueft) return;
          z.wahl[e.id] = k.id;
          tag.textContent = k.name;
          tag.classList.add('f-tag-gesetzt');
          panel.hidden = true;
          zeile.setAttribute('aria-expanded', 'false');
          aktualisieren();
          zeile.focus({ preventScroll: true });
        });
        panel.appendChild(b);
      });
      zeile.addEventListener('click', function () {
        if (geprueft) return;
        var war = panel.hidden;
        alleZu();
        if (war) { panel.hidden = false; zeile.setAttribute('aria-expanded', 'true'); }
      });
      li.appendChild(zeile);
      li.appendChild(panel);
      liste.appendChild(li);
      zeilen[e.id] = { li: li, zeile: zeile, tag: tag, panel: panel };
    });
    buehne.appendChild(liste);
    buehne.appendChild(pruefBox);

    function pruefen() {
      geprueft = true;
      alleZu();
      var ok = 0;
      var falsche = [];
      f.einheiten.forEach(function (e) {
        var r = zeilen[e.id];
        var gewaehlt = z.wahl[e.id];
        var richtig = s.loesung[e.id];
        var istOk = gewaehlt === richtig;
        r.zeile.setAttribute('aria-disabled', 'true');
        r.zeile.classList.add(istOk ? 'f-richtig' : 'f-falsch');
        r.zeile.appendChild(el('span', 'f-marke', istOk ? 'richtig' : 'falsch'));
        var info = el('div', 'f-info');
        info.appendChild(el('p', 'f-richtig-ist', 'Richtig ist: ' + katName(richtig)));
        info.appendChild(el('p', 'f-erklaerung', s.erklaerung[e.id]));
        r.li.appendChild(info);
        if (istOk) ok += 1; else falsche.push({ e: e, richtig: katName(richtig) });
      });
      z.s1 = { n: f.einheiten.length, ok: ok, falsche: falsche };
      zaehler.textContent = '';
      leeren(pruefBox);
      pruefBox.appendChild(el('p', 'f-s1-ergebnis', 'Du hast ' + ok + ' von ' + z.s1.n + ' richtig.'));
      var w = knopf('Weiter', 'voll f-gross f-weiter', schritt2Zeigen);
      pruefBox.appendChild(w);
      w.focus({ preventScroll: true });
      if (w.scrollIntoView) w.scrollIntoView({ block: 'nearest' });
    }

    aktualisieren();
    oben(h);
  }

  /* Eine Rückmeldung unter den Antworten */
  function rueckmeldung(ok, text, weiterText, weiterFunktion, wortRichtig, wortFalsch) {
    var rueck = el('div', 'f-rueck');
    rueck.appendChild(el('p', 'f-urteil ' + (ok ? 'f-urteil-richtig' : 'f-urteil-falsch'), ok ? (wortRichtig || 'Richtig.') : (wortFalsch || 'Falsch.')));
    rueck.appendChild(el('p', 'f-erklaerung', text));
    var w = knopf(weiterText, 'voll f-gross f-weiter', weiterFunktion);
    rueck.appendChild(w);
    return { box: rueck, weiter: w };
  }

  /* Antwortknopf mit Marke */
  function antwortKnopf(text) {
    var k = el('button', 'f-antwort');
    k.type = 'button';
    k.appendChild(el('span', 'f-antwort-text', text));
    return k;
  }

  function markieren(k, richtig, wort) {
    k.classList.add(richtig ? 'f-ist-richtig' : 'f-ist-falsch');
    k.appendChild(el('span', 'f-marke', wort));
  }

  /* ── Schritt 2: eine Antwort ──────────────────────────────────────── */
  function schritt2Zeigen() {
    var s = z.f.schritt2;
    leeren(buehne);
    buehne.appendChild(kopf(2));
    var h = ueberschrift(s.frage);
    h.id = 'f-frage';
    buehne.appendChild(h);
    var gruppe = el('div', 'f-antworten');
    gruppe.setAttribute('role', 'group');
    gruppe.setAttribute('aria-labelledby', 'f-frage');
    var rueckBox = el('div');
    rueckBox.setAttribute('aria-live', 'polite');
    var fertig = false;
    var knoepfe = [];
    mischen(s.antworten).forEach(function (a) {
      var k = antwortKnopf(a.text);
      knoepfe.push({ k: k, a: a });
      k.addEventListener('click', function () {
        if (fertig) return;
        fertig = true;
        z.s2 = a.richtig === true;
        knoepfe.forEach(function (x) {
          x.k.setAttribute('aria-disabled', 'true');
          if (x.a.richtig) markieren(x.k, true, 'richtig');
          else if (x.k === k) markieren(x.k, false, 'falsch');
          if (x.k === k) { x.k.classList.add('f-gewaehlt'); x.k.setAttribute('aria-pressed', 'true'); }
        });
        var r = rueckmeldung(z.s2, s.erklaerung, 'Weiter', schritt3Zeigen);
        rueckBox.appendChild(r.box);
        r.weiter.focus({ preventScroll: true });
        if (r.weiter.scrollIntoView) r.weiter.scrollIntoView({ block: 'nearest' });
      });
      gruppe.appendChild(k);
    });
    buehne.appendChild(gruppe);
    buehne.appendChild(rueckBox);
    oben(h);
  }

  /* ── Schritt 3: erst die Position, dann die passenden Gründe ──────── */
  function schritt3Zeigen() {
    var s = z.f.schritt3;
    leeren(buehne);
    buehne.appendChild(kopf(3));
    var h = ueberschrift(s.frage);
    h.id = 'f-frage';
    buehne.appendChild(h);
    var gruppe = el('div', 'f-antworten');
    gruppe.setAttribute('role', 'group');
    gruppe.setAttribute('aria-labelledby', 'f-frage');
    var rueckBox = el('div');
    rueckBox.setAttribute('aria-live', 'polite');
    var fertig = false;
    var knoepfe = [];
    mischen(s.positionen).forEach(function (p) {
      var k = antwortKnopf(p.text);
      k.setAttribute('data-position', p.id);
      knoepfe.push({ k: k, p: p });
      k.addEventListener('click', function () {
        if (fertig) return;
        fertig = true;
        z.s3 = p.id === s.gut;
        knoepfe.forEach(function (x) {
          x.k.setAttribute('aria-disabled', 'true');
          if (x.p.id === s.gut) markieren(x.k, true, 'passt zum Heft');
          else if (x.k === k) markieren(x.k, false, 'passt nicht zum Heft');
          if (x.k === k) { x.k.classList.add('f-gewaehlt'); x.k.setAttribute('aria-pressed', 'true'); }
        });
        var r = rueckmeldung(z.s3, s.erklaerung, 'Weiter', gruendeZeigen, 'Richtig.', 'Das trägt nicht.');
        rueckBox.appendChild(r.box);
        r.weiter.focus({ preventScroll: true });
        if (r.weiter.scrollIntoView) r.weiter.scrollIntoView({ block: 'nearest' });
      });
      gruppe.appendChild(k);
    });
    buehne.appendChild(gruppe);
    buehne.appendChild(rueckBox);
    oben(h);
  }

  function gruendeZeigen() {
    var s = z.f.schritt3;
    var gutText = s.positionen.filter(function (p) { return p.id === s.gut; })[0].text;
    leeren(buehne);
    buehne.appendChild(kopf(3));
    var h = ueberschrift('Welche Gründe passen zu dieser Position?');
    buehne.appendChild(h);
    buehne.appendChild(el('p', 'f-position', gutText));
    var gruppe = el('div', 'f-gruende');
    gruppe.setAttribute('role', 'group');
    gruppe.setAttribute('aria-label', 'Gründe zum Antippen, mehrere möglich');
    var pruefBox = el('div', 'f-pruefen');
    var geprueft = false;
    var eintraege = [];

    function aktualisieren() {
      leeren(pruefBox);
      var n = eintraege.filter(function (x) { return x.gewaehlt; }).length;
      if (!geprueft && n > 0) pruefBox.appendChild(knopf('Prüfen', 'voll f-gross', pruefen));
    }

    mischen(s.begruendungen).forEach(function (g) {
      var k = antwortKnopf(g.text);
      k.setAttribute('aria-pressed', 'false');
      var eintrag = { k: k, g: g, gewaehlt: false };
      eintraege.push(eintrag);
      k.addEventListener('click', function () {
        if (geprueft) return;
        eintrag.gewaehlt = !eintrag.gewaehlt;
        k.setAttribute('aria-pressed', eintrag.gewaehlt ? 'true' : 'false');
        aktualisieren();
      });
      gruppe.appendChild(k);
    });
    buehne.appendChild(gruppe);
    buehne.appendChild(pruefBox);

    function pruefen() {
      geprueft = true;
      var ok = 0;
      eintraege.forEach(function (x) {
        var passt = x.g.passt_zu === s.gut;
        var istOk = x.gewaehlt === passt;
        x.k.setAttribute('aria-disabled', 'true');
        if (istOk) ok += 1;
        if (x.gewaehlt) markieren(x.k, istOk, passt ? 'passt' : 'passt nicht');
        else if (passt) { x.k.classList.add('f-ist-falsch'); x.k.appendChild(el('span', 'f-marke', 'fehlt: passt')); }
        else x.k.appendChild(el('span', 'f-marke', 'passt nicht'));   // nicht gewählt und richtig so: auch dieser Grund trägt ein Wort
      });
      z.gr = { n: eintraege.length, ok: ok };
      leeren(pruefBox);
      pruefBox.appendChild(el('p', 'f-s1-ergebnis', 'Gründe: ' + ok + ' von ' + z.gr.n + ' richtig.'));
      var m = el('div', 'f-muster');
      m.appendChild(el('h3', null, 'So könntest du schreiben:'));
      m.appendChild(el('p', null, s.muster));
      pruefBox.appendChild(m);
      var w = knopf('Weiter', 'voll f-gross f-weiter', endeZeigen);
      pruefBox.appendChild(w);
      w.focus({ preventScroll: true });
      if (w.scrollIntoView) w.scrollIntoView({ block: 'nearest' });
    }

    aktualisieren();
    oben(h);
  }

  /* ── Ende des Falls ───────────────────────────────────────────────── */
  function endeZeigen() {
    leeren(buehne);
    var h = el('h2', 'f-ergebnis', 'Schritt 1: ' + z.s1.ok + ' von ' + z.s1.n + ' richtig.');
    h.tabIndex = -1;
    buehne.appendChild(h);
    var zeilen = el('div', 'f-zeilen-ende');
    zeilen.appendChild(el('p', null, 'Schritt 2: ' + (z.s2 ? 'richtig.' : 'falsch.')));
    zeilen.appendChild(el('p', null, 'Schritt 3: Position ' + (z.s3 ? 'richtig' : 'falsch') + ', Gründe ' + z.gr.ok + ' von ' + z.gr.n + ' richtig.'));
    buehne.appendChild(zeilen);
    if (z.s1.falsche.length) {
      var box = el('section', 'f-falsche');
      box.appendChild(el('h3', null, 'Das übst du noch:'));
      var ul = el('ul');
      z.s1.falsche.forEach(function (x) {
        var li = el('li');
        li.appendChild(el('p', 'f-falsch-frage', x.e.text));
        li.appendChild(el('p', 'f-falsch-loesung', 'Richtig ist: ' + x.richtig));
        ul.appendChild(li);
      });
      box.appendChild(ul);
      buehne.appendChild(box);
    }
    var wahl = el('div', 'f-ende-knoepfe');
    var idx = z.idx;
    var hatNaechsten = idx + 1 < daten.faelle.length;
    wahl.appendChild(knopf('Fall noch einmal', 'f-gross', function () { lesenZeigen(idx); }));
    if (hatNaechsten) wahl.appendChild(knopf('Nächster Fall', 'voll f-gross', function () { lesenZeigen(idx + 1); }));
    wahl.appendChild(knopf('Zum Start', 'f-gross', startZeigen));
    buehne.appendChild(wahl);
    oben(h);
  }

  function los(d) {
    daten = d;
    document.title = d.titel;
    startZeigen();
  }

  buehne = document.getElementById('f-buehne');
  fetch('data.json', { cache: 'no-cache' })
    .then(function (r) { return r.json(); })
    .then(los)
    .catch(function () {
      leeren(buehne);
      buehne.appendChild(el('p', 'f-satz-start', 'Die Fälle konnten nicht geladen werden. Lade die Seite neu.'));
    });
})();
