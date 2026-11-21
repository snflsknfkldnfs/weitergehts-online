/* klassenbereich.js — entschlüsselt die Seiten des Klassenbereichs (erzeugt von tools/kurse/klassenbereich.py) und belebt sie.
   Im Repo liegt nur Chiffrat (AES-GCM, IV vorn); der Schlüssel entsteht aus dem Klassenpasswort (PBKDF2-SHA256)
   und bleibt nach dem ersten Öffnen im localStorage des Geräts, bis „Abmelden“. Bilder, PDFs und die iPad-Seite
   werden erst geladen, wenn sie gebraucht werden. */
(function () {
  'use strict';
  var box = document.getElementById('kb');
  var seite = document.getElementById('kb-seite');
  if (!box || !window.crypto || !crypto.subtle) {
    if (seite) seite.innerHTML = '<p>Dein Browser kann diese Seite nicht öffnen. Versuch es mit einem aktuellen Browser.</p>';
    return;
  }
  var KURS = box.dataset.kurs, SALZ = box.dataset.salz, ITER = parseInt(box.dataset.iter, 10);
  var NAME = 'wg-kb-' + KURS;
  var DUCKAI = 'https://duck.ai/?q=';
  var tor = document.getElementById('kb-tor'), fehler = document.getElementById('kb-fehler');
  var abmelden = document.getElementById('kb-abmelden');
  var inhalt = b64(document.getElementById('kb-inhalt').textContent.trim());
  var schluessel = null;

  function b64(s) { var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
  function zuB64(u) { var s = ''; u = new Uint8Array(u); for (var i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s); }
  function merken(roh) { try { localStorage.setItem(NAME, zuB64(roh)); } catch (e) {} }
  function vergessen() { try { localStorage.removeItem(NAME); } catch (e) {} }
  function entschluesseln(key, daten) { return crypto.subtle.decrypt({ name: 'AES-GCM', iv: daten.slice(0, 12) }, key, daten.slice(12)); }
  function ableiten(pw) {
    return crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveBits']).then(function (k) {
      return crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: b64(SALZ), iterations: ITER }, k, 256);
    });
  }
  function oeffnen(roh) {
    return crypto.subtle.importKey('raw', roh, 'AES-GCM', false, ['decrypt']).then(function (key) {
      return entschluesseln(key, inhalt).then(function (klar) { schluessel = key; zeigen(new TextDecoder().decode(klar)); });
    });
  }
  function torZeigen(meldung) {
    tor.hidden = false; fehler.textContent = meldung || '';
    var f = document.getElementById('kb-pw'); if (f) f.focus();
  }
  tor.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var pw = document.getElementById('kb-pw').value.trim().toLowerCase();
    var knopf = tor.querySelector('button');
    knopf.disabled = true; fehler.textContent = 'Einen Moment …';
    ableiten(pw).then(function (roh) { return oeffnen(roh).then(function () { merken(roh); tor.hidden = true; }); })
      .catch(function () { fehler.textContent = 'Das Passwort stimmt nicht. Kleinbuchstaben, mit Bindestrichen.'; })
      .then(function () { knopf.disabled = false; });
  });
  abmelden.addEventListener('click', function () { vergessen(); location.reload(); });

  function laden(pfad) {
    return fetch(pfad).then(function (r) { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); })
      .then(function (buf) { return entschluesseln(schluessel, new Uint8Array(buf)); });
  }
  function bilderLaden(wurzel) {
    wurzel.querySelectorAll('img[data-kb-src]').forEach(function (img) {
      var pfad = img.getAttribute('data-kb-src'); img.removeAttribute('data-kb-src'); img.classList.add('laedt');
      laden(pfad).then(function (klar) {
        img.src = URL.createObjectURL(new Blob([klar], { type: img.dataset.kbTyp || 'image/jpeg' }));
        img.classList.remove('laedt');
      }).catch(function () { img.alt = 'Bild konnte nicht geladen werden'; img.classList.remove('laedt'); });
    });
  }
  function sichtbarLaden(wurzel) {
    if (wurzel.hidden) return;
    bilderLaden(wurzel);
    wurzel.querySelectorAll('iframe[data-src]').forEach(function (f) {
      if (f.offsetParent !== null) { f.src = f.getAttribute('data-src'); f.removeAttribute('data-src'); }
    });
  }

  // ── Seite einsetzen und beleben (der Inhalt ist eigener, authentifizierter Generator-Text, kein fremdes HTML) ──
  function zeigen(html) {
    seite.innerHTML = html;
    abmelden.hidden = false;
    var h1 = seite.querySelector('h1'); if (h1) document.title = h1.textContent + ' · ' + document.title.split(' · ').pop();
    seite.querySelectorAll('[data-ki]').forEach(kiKnopf);
    seite.querySelectorAll('[data-kb-pdf]').forEach(pdfLink);
    reiter(); blattWahl(); umschalter(); folien(); sequenzWahl(); vollbild(); quiz(); trapez();
    window.addEventListener('resize', trapez);
    seite.querySelectorAll('[role=tabpanel]').forEach(sichtbarLaden);
  }

  function reiter() {
    var tabs = [].slice.call(seite.querySelectorAll('.reiter [role=tab]'));
    if (!tabs.length) return;
    function wahl(t, merkenInAdresse) {
      tabs.forEach(function (x) {
        var an = x === t; x.setAttribute('aria-selected', an ? 'true' : 'false');
        document.getElementById(x.dataset.zu).hidden = !an;
      });
      sichtbarLaden(document.getElementById(t.dataset.zu));
      if (merkenInAdresse) try { history.replaceState(null, '', '#' + t.dataset.zu); } catch (e) {}
    }
    tabs.forEach(function (t) { t.addEventListener('click', function () { wahl(t, true); }); });
    var start = tabs.filter(function (t) { return '#' + t.dataset.zu === location.hash; })[0];
    if (start) wahl(start, false);
  }
  function blattWahl() {
    var knoepfe = [].slice.call(seite.querySelectorAll('.blatt-wahl button'));
    knoepfe.forEach(function (b) {
      b.addEventListener('click', function () {
        knoepfe.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        seite.querySelectorAll('.paar').forEach(function (p) { p.hidden = p.dataset.blatt !== b.dataset.blatt; sichtbarLaden(p); });
      });
    });
  }
  function umschalter() {
    seite.querySelectorAll('.paar.zwei').forEach(function (p) {
      var kn = [].slice.call(p.querySelectorAll('.umschalter button'));
      kn.forEach(function (b) {
        b.addEventListener('click', function () {
          kn.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
          p.dataset.seite = b.dataset.seite; sichtbarLaden(p);
        });
      });
    });
  }
  function folien() {
    var bilder = [].slice.call(seite.querySelectorAll('.folie img'));
    seite.querySelectorAll('.folie').forEach(function (f, i) {
      f.addEventListener('click', function () {
        var n = i, ov = document.createElement('div');
        ov.className = 'gross-bild';
        ov.innerHTML = '<img alt=""><button class="l" aria-label="Folie davor">‹</button><button class="r" aria-label="Folie danach">›</button><button class="zu" aria-label="Schließen">✕</button>';
        var img = ov.querySelector('img');
        function setze(k) { n = Math.max(0, Math.min(bilder.length - 1, k)); img.src = bilder[n].src; img.alt = bilder[n].alt; }
        function weg() { ov.remove(); document.removeEventListener('keydown', taste); }
        function taste(ev) { if (ev.key === 'Escape') weg(); if (ev.key === 'ArrowLeft') setze(n - 1); if (ev.key === 'ArrowRight') setze(n + 1); }
        ov.querySelector('.l').onclick = function (ev) { ev.stopPropagation(); setze(n - 1); };
        ov.querySelector('.r').onclick = function (ev) { ev.stopPropagation(); setze(n + 1); };
        ov.querySelector('.zu').onclick = weg;
        ov.addEventListener('click', function (ev) { if (ev.target === ov) weg(); });
        document.addEventListener('keydown', taste);
        document.body.appendChild(ov); setze(i);
      });
    });
  }
  // Zeitkarte groß: der Rahmen füllt den Bildschirm, Esc oder „klein“ zurück
  function vollbild() {
    seite.querySelectorAll('[data-voll]').forEach(function (b) {
      var box = b.closest('.einstieg');
      function setze(an) { box.classList.toggle('voll', an); b.textContent = an ? 'klein' : 'groß'; document.body.style.overflow = an ? 'hidden' : ''; }
      b.addEventListener('click', function () { setze(!box.classList.contains('voll')); });
      document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && box.classList.contains('voll')) setze(false); });
    });
  }
  // Kursseite: eine Sequenz im Jahr antippen zeigt ihre Stunden (Adresse #s01 merkt die Wahl, auch für „‹ Unser Jahr“)
  function sequenzWahl() {
    var knoepfe = [].slice.call(seite.querySelectorAll('.jahr-leiste [data-seq]'));
    if (!knoepfe.length) return;
    function wahl(id, merkenInAdresse) {
      var gibt = knoepfe.some(function (b) { return b.dataset.seq === id; });
      if (!gibt) return;
      knoepfe.forEach(function (b) { b.classList.toggle('gewaehlt', b.dataset.seq === id); b.setAttribute('aria-pressed', b.dataset.seq === id ? 'true' : 'false'); });
      seite.querySelectorAll('.seq-block').forEach(function (x) { x.hidden = x.dataset.seq !== id; });
      trapez();
      if (merkenInAdresse) try { history.replaceState(null, '', '#' + id); } catch (e) {}
    }
    knoepfe.forEach(function (b) { b.addEventListener('click', function () { wahl(b.dataset.seq, true); }); });
    if (location.hash) wahl(location.hash.slice(1), false);
  }
  // Trichter von der laufenden Sequenz im Jahr zur Leiste ihrer Stunden (wie die Ansicht Kurs der Matrixe)
  function trapez() {
    var s = document.getElementById('trapez'), j = seite.querySelector('.js.gewaehlt'), l = seite.querySelector('.jahr-leiste');
    if (!s || !j || !l) return;
    var a = l.getBoundingClientRect(), b = j.getBoundingClientRect(), W = 1000, H = 100;
    var o0 = Math.max(0, (b.left - a.left) / a.width) * W, o1 = Math.min(1, (b.right - a.left) / a.width) * W;
    s.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    s.innerHTML = '<polygon class="tf" points="' + o0 + ',0 ' + o1 + ',0 ' + W + ',' + H + ' 0,' + H + '"/>'
      + '<line class="tl" x1="' + o0 + '" y1="0" x2="0" y2="' + H + '"/><line class="tl" x1="' + o1 + '" y1="0" x2="' + W + '" y2="' + H + '"/>';
  }

  // PDF: im Hintergrund entschlüsseln, damit ein Tippen genügt (iOS öffnet nach await kein Fenster)
  function pdfLink(a) {
    var fertig = null;
    function vorbereiten() {
      if (!fertig) fertig = laden(a.getAttribute('data-kb-pdf')).then(function (klar) {
        a.href = URL.createObjectURL(new Blob([klar], { type: 'application/pdf' })); a.target = '_blank'; a.rel = 'noopener'; a.classList.add('bereit');
      });
      return fertig;
    }
    setTimeout(vorbereiten, 900);
    a.addEventListener('click', function (ev) {
      if (a.classList.contains('bereit')) return;
      ev.preventDefault(); a.textContent = 'wird vorbereitet …';
      vorbereiten().then(function () { a.textContent = 'Drucken (bereit)'; }).catch(function () { a.textContent = 'PDF fehlt'; });
    });
  }
  function kiKnopf(b) {
    var hinweis = b.parentNode.querySelector('.ki-hinweis');
    b.addEventListener('click', function () {
      var p = b.getAttribute('data-ki');
      try { navigator.clipboard.writeText(p); } catch (e) {}
      var f = null;
      try { f = window.open(DUCKAI + encodeURIComponent(p), '_blank', 'noopener,noreferrer'); } catch (e) { f = null; }
      if (!f && hinweis) hinweis.textContent = 'Popup blockiert: Der Text ist kopiert. Öffne duck.ai selbst und füge ihn ein.';
    });
  }

  // ── Üben: Quiz zur Probe mit dem Heft daneben (Lehrkraft 18.11.2026) ──
  // Daten: <script id="kb-quiz"> (aus dem Pool der Probe erzeugt), Heftseiten als <template data-heft="ue08">.
  // Eine Entscheidung je Bildschirm; Freitext: eigene Antwort → vergleichen → abhaken; rf/wahl/ordnen: antippen, prüft selbst.
  // Nichts wird gespeichert.
  function quiz() {
    var box = document.getElementById('quiz'), roh = document.getElementById('kb-quiz');
    if (!box || !roh) return;
    var D = JSON.parse(roh.textContent);
    var leiste = null, runde = null;

    function el(tag, kl, text) { var n = document.createElement(tag); if (kl) n.className = kl; if (text != null) n.textContent = text; return n; }
    function knopf(text, kl, f) { var k = el('button', kl || 'knopf-neben', text); k.type = 'button'; k.addEventListener('click', f); return k; }
    function mischen(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
    function leeren() { box.innerHTML = ''; window.scrollTo(0, box.getBoundingClientRect().top + window.scrollY - 70); }
    function pkt(n) { return n === 1 ? '1 Punkt' : n + ' Punkte'; }
    function vonPkt(n) { return n === 1 ? '1 Punkt' : n + ' Punkten'; }

    // ── Start ──
    function start() {
      heftZu(); leeren();
      box.appendChild(el('h2', 'q-titel', 'Üben für die Probe'));
      box.appendChild(el('p', 'leise', 'Beantworte jede Frage zuerst selbst. Dann vergleichst du mit deinem Heft.'));
      var alle = D.fragen.filter(function (f) { return !f.vertiefung; });
      box.appendChild(knopf('Zehn Fragen mischen', 'knopf-haupt q-gross', function () { los(mischen(alle).slice(0, D.runde)); }));
      var liste = el('div', 'q-bloecke');
      Object.keys(D.bloecke).forEach(function (b) {
        var fs = alle.filter(function (f) { return String(f.block) === b; });
        if (!fs.length) return;
        var k = knopf('', 'q-block', function () { los(fs); });
        k.appendChild(el('span', 'q-bt', D.bloecke[b])); k.appendChild(el('span', 'q-bz', fs.length + ' Fragen'));
        liste.appendChild(k);
      });
      box.appendChild(liste);
    }

    function los(fragen) { runde = { fragen: fragen, nr: 0, erg: [] }; frage(); }

    // ── eine Frage ──
    function frage() {
      heftZu(); leeren();
      var f = runde.fragen[runde.nr], erg = { f: f, punkte: 0, fertig: false };
      var kopf = el('div', 'q-kopf');
      kopf.appendChild(el('span', '', 'Frage ' + (runde.nr + 1) + ' von ' + runde.fragen.length));
      var balken = el('span', 'q-balken'); var fuell = el('span'); fuell.style.width = (100 * runde.nr / runde.fragen.length) + '%';
      balken.appendChild(fuell); kopf.appendChild(balken); box.appendChild(kopf);
      box.appendChild(el('p', 'q-block-name', D.bloecke[f.block] + ' · ' + pkt(f.punkte)));
      // Die Liste zum Antippen steht unten als Knöpfe: aus Frage oder Material nur den Satz davor zeigen
      var liste = function (t) { var i = t.indexOf(' · '); if (i < 0) return t; var c = Math.max(t.lastIndexOf('?', i), t.lastIndexOf(':', i)); return t.slice(0, c + 1); };
      var tipp = f.form === 'wahl' || f.form === 'ordnen';
      if (f.bild) {   // Setting über der Frage, klein; Nachweis im Fuß
        var fig = el('figure', 'q-bild'), bild = document.createElement('img');
        bild.setAttribute('data-kb-src', f.bild.src); bild.alt = ''; fig.appendChild(bild); box.appendChild(fig);
      }
      if (f.material && !(tipp && f.material.indexOf(' · ') >= 0)) box.appendChild(el('blockquote', 'q-material', f.material));
      box.appendChild(el('p', 'q-frage', f.form === 'rf' ? 'Richtig oder falsch?' : tipp ? liste(f.frage) : f.frage));
      var feld = el('div', 'q-feld'); box.appendChild(feld);
      var unten = el('div', 'q-unten'); box.appendChild(unten);
      var weiter = knopf(runde.nr + 1 < runde.fragen.length ? 'Weiter' : 'Zum Ergebnis', 'knopf-haupt', function () {
        runde.erg.push(erg); runde.nr++; if (runde.nr < runde.fragen.length) frage(); else ende();
      });
      var heft = f.stellen.length ? knopf('Im Heft nachsehen', 'knopf-neben q-heft', function () { heftAuf(f); }) : null;
      ({ frei: frei, rf: rf, wahl: wahl, ordnen: ordnen, eine: eine })[f.form](f, erg, feld, unten, weiter, heft);
      if (f.bild) { var fuss = el('p', 'q-nachweis'); fuss.innerHTML = 'Bild: ' + f.bild.nachweis; box.appendChild(fuss); bilderLaden(box); }
      var h2 = box.querySelector('.q-frage'); if (h2) { h2.tabIndex = -1; h2.focus({ preventScroll: true }); }
    }

    function frei(f, erg, feld, unten, weiter, heft) {
      var ta = el('textarea', 'q-antwort'); ta.rows = 4; ta.placeholder = 'Deine Antwort (wird nicht gespeichert)';
      ta.setAttribute('aria-label', 'Deine Antwort'); feld.appendChild(ta);
      var vergl = knopf('Vergleichen', 'knopf-haupt', function () {
        vergl.remove();
        var liste = el('div', 'q-punkte'); liste.appendChild(el('p', 'q-hast', 'Was davon hast du? Hak ab.'));
        var stand = el('p', 'q-stand');
        function zaehlen() {
          var n = liste.querySelectorAll('input:checked').length; erg.punkte = Math.min(f.punkte, n);
          stand.textContent = erg.punkte + ' von ' + vonPkt(f.punkte) + (n > f.punkte ? ' (mehr Punkte gibt es nicht)' : '');
        }
        f.elemente.forEach(function (x, i) {
          var auch = /^gilt auch:/i.test(x);
          var lab = el('label', 'q-el' + (auch ? ' q-auch' : ''));
          var cb = el('input'); cb.type = 'checkbox'; cb.addEventListener('change', zaehlen);
          lab.appendChild(cb); lab.appendChild(el('span', '', auch ? 'zählt auch: ' + x.replace(/^gilt auch:\s*/i, '') : x));
          liste.appendChild(lab);
        });
        zaehlen(); liste.appendChild(stand); feld.appendChild(liste);
        var ki = knopf('Mit KI über meine Antwort sprechen', 'knopf-neben ki-knopf', function () {
          kiOeffnen(f.ki.replace('{ANTWORT}', ta.value.trim() || '(Ich habe noch nichts geschrieben. Hilf mir mit einem Tipp, wo ich im Heft nachsehe.)'), hinweis);
        });
        var hinweis = el('span', 'ki-hinweis', 'öffnet duck.ai mit Frage, Heft und deiner Antwort · schreib keinen Namen hinein');
        var kz = el('div', 'ki'); kz.appendChild(ki); kz.appendChild(hinweis);
        leer(unten); unten.appendChild(weiter); if (heft) unten.appendChild(heft); feld.appendChild(kz);
      });
      unten.appendChild(vergl); if (heft) unten.appendChild(heft);
    }
    function leer(n) { while (n.firstChild) n.removeChild(n.firstChild); }

    function rf(f, erg, feld, unten, weiter, heft) {
      var antworten = [];
      f.aussagen.forEach(function (a, i) {
        var z = el('div', 'q-zeile'); z.appendChild(el('p', 'q-aussage', a));
        var gr = el('div', 'q-wahlen');
        ['stimmt', 'stimmt nicht'].forEach(function (w, j) {
          gr.appendChild(knopf(w, 'q-wahl', function (ev) {
            antworten[i] = j === 0; gr.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', b === ev.target ? 'true' : 'false'); });
            if (antworten.filter(function (x) { return x !== undefined; }).length === f.aussagen.length) pruefen.disabled = false;
          }));
        });
        z.appendChild(gr); feld.appendChild(z);
      });
      var pruefen = knopf('Prüfen', 'knopf-haupt', function () {
        var n = 0;
        feld.querySelectorAll('.q-zeile').forEach(function (z, i) {
          var ok = antworten[i] === f.loesung[i]; if (ok) n++;
          z.classList.add(ok ? 'q-ok' : 'q-falsch');
          z.appendChild(el('p', 'q-loes', (ok ? 'richtig: ' : 'falsch: ') + f.hinweise[i]));
          z.querySelectorAll('button').forEach(function (b) { b.disabled = true; });
        });
        erg.punkte = Math.min(f.punkte, n); fertig(feld, unten, weiter, heft, erg, f);
      });
      pruefen.disabled = true; unten.appendChild(pruefen); if (heft) unten.appendChild(heft);
    }

    function wahl(f, erg, feld, unten, weiter, heft) {
      var zu = {};
      f.begriffe.forEach(function (b) {
        var z = el('div', 'q-zeile q-zeile-wahl'); z.appendChild(el('p', 'q-aussage', b));
        var gr = el('div', 'q-wahlen');
        f.gruppen.forEach(function (g) {
          gr.appendChild(knopf(g, 'q-wahl', function (ev) {
            zu[b] = g; gr.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === ev.target ? 'true' : 'false'); });
            if (Object.keys(zu).length === f.begriffe.length) pruefen.disabled = false;
          }));
        });
        z.appendChild(gr); feld.appendChild(z);
      });
      var pruefen = knopf('Prüfen', 'knopf-haupt', function () {
        var n = 0;
        feld.querySelectorAll('.q-zeile').forEach(function (z, i) {
          var b = f.begriffe[i], ok = zu[b] === f.loesung[b]; if (ok) n++;
          z.classList.add(ok ? 'q-ok' : 'q-falsch');
          if (!ok) z.appendChild(el('p', 'q-loes', 'richtig: ' + f.loesung[b]));
          z.querySelectorAll('button').forEach(function (x) { x.disabled = true; });
        });
        erg.punkte = Math.min(f.punkte, n); fertig(feld, unten, weiter, heft, erg, f);
      });
      pruefen.disabled = true; unten.appendChild(pruefen); if (heft) unten.appendChild(heft);
    }

    function ordnen(f, erg, feld, unten, weiter, heft) {
      var folge = [];
      feld.appendChild(el('p', 'leise', 'Tipp die Karten in der richtigen Reihenfolge an.'));
      var karten = mischen(f.karten);
      karten.forEach(function (k) {
        var b = knopf('', 'q-karte', function () {
          if (folge.indexOf(k) >= 0) return;
          folge.push(k); b.querySelector('.q-nr').textContent = folge.length; b.setAttribute('aria-pressed', 'true');
          if (folge.length === karten.length) pruefen.disabled = false;
        });
        b.appendChild(el('span', 'q-nr', '')); b.appendChild(el('span', '', k)); feld.appendChild(b);
      });
      var neu = knopf('Neu anfangen', 'knopf-neben', function () { folge = []; feld.querySelectorAll('.q-karte').forEach(function (b) { b.querySelector('.q-nr').textContent = ''; b.setAttribute('aria-pressed', 'false'); }); pruefen.disabled = true; });
      var pruefen = knopf('Prüfen', 'knopf-haupt', function () {
        var richtig = folge.filter(function (k, i) { return k === f.loesung[i]; }).length;
        erg.punkte = richtig === f.loesung.length ? f.punkte : richtig >= f.loesung.length - 2 ? Math.max(0, f.punkte - 1) : 0;
        feld.querySelectorAll('.q-karte').forEach(function (b) { b.disabled = true; });
        var l = el('ol', 'q-loes-liste'); f.loesung.forEach(function (k) { l.appendChild(el('li', '', k)); });
        feld.appendChild(el('p', 'q-loes', richtig === f.loesung.length ? 'Alles in der richtigen Reihenfolge.' : 'So ist die Reihenfolge:'));
        feld.appendChild(l); neu.remove(); fertig(feld, unten, weiter, heft, erg, f);
      });
      pruefen.disabled = true; unten.appendChild(pruefen); unten.appendChild(neu); if (heft) unten.appendChild(heft);
    }

    // eine von drei Antworten (GPG8a 20.11.): antippen, prüfen, die richtige steht mit „richtig“, die falsch gewählte mit „falsch“
    function eine(f, erg, feld, unten, weiter, heft) {
      var gewaehlt = null, gr = el('div', 'q-optionen');
      mischen(f.optionen).forEach(function (o) {
        var b = knopf(o, 'q-wahl q-option', function () {
          gewaehlt = o; gr.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
          pruefen.disabled = false;
        });
        b.setAttribute('data-option', o); gr.appendChild(b);
      });
      feld.appendChild(gr);
      var pruefen = knopf('Prüfen', 'knopf-haupt', function () {
        gr.querySelectorAll('button').forEach(function (b) {
          var o = b.getAttribute('data-option'); b.disabled = true;
          if (o === f.loesung) { b.classList.add('q-ok'); b.textContent = 'richtig: ' + o; }
          else if (o === gewaehlt) { b.classList.add('q-falsch'); b.textContent = 'falsch: ' + o; }
        });
        if (f.hinweis) feld.appendChild(el('p', 'q-loes q-hinweis', f.hinweis));
        erg.punkte = gewaehlt === f.loesung ? f.punkte : 0; fertig(feld, unten, weiter, heft, erg, f);
      });
      pruefen.disabled = true; unten.appendChild(pruefen); if (heft) unten.appendChild(heft);
    }

    function fertig(feld, unten, weiter, heft, erg, f) {
      feld.appendChild(el('p', 'q-stand', erg.punkte + ' von ' + vonPkt(f.punkte)));
      leer(unten); unten.appendChild(weiter); if (heft) unten.appendChild(heft); weiter.focus();
    }

    // ── Ende ──
    function ende() {
      heftZu(); leeren();
      var hat = 0, max = 0; runde.erg.forEach(function (r) { hat += r.punkte; max += r.f.punkte; });
      box.appendChild(el('h2', 'q-titel', 'Du hattest ' + hat + ' von ' + max + ' Punkten.'));
      var offen = runde.erg.filter(function (r) { return r.punkte < r.f.punkte; });
      if (offen.length) {
        box.appendChild(el('p', 'q-hast', 'Das übst du noch:'));
        var l = el('ul', 'q-offen');
        offen.forEach(function (r) {
          var li = el('li'); li.appendChild(el('span', '', r.f.frage.split(/(?<=[?.:])\s/)[0] + ' (' + r.punkte + ' von ' + r.f.punkte + ')'));
          if (r.f.stellen.length) li.appendChild(knopf('Im Heft nachsehen', 'ln', function () { heftAuf(r.f); }));
          l.appendChild(li);
        });
        box.appendChild(l);
      }
      var u = el('div', 'q-unten');
      if (offen.length) u.appendChild(knopf('Diese noch einmal', 'knopf-haupt', function () { los(offen.map(function (r) { return r.f; })); }));
      u.appendChild(knopf('Neue Runde', offen.length ? 'knopf-neben' : 'knopf-haupt', function () {
        los(mischen(D.fragen.filter(function (f) { return !f.vertiefung; })).slice(0, D.runde));
      }));
      u.appendChild(knopf('Zum Start', 'knopf-neben', start));
      box.appendChild(u);
    }

    // ── Heft daneben, die Stelle markiert ──
    function heftAuf(f) {
      heftZu();
      leiste = el('aside', 'q-leiste'); leiste.setAttribute('aria-label', 'Dein Heft');
      var kopf = el('div', 'q-leiste-kopf');
      kopf.appendChild(el('b', '', 'Dein Heft'));
      kopf.appendChild(knopf('zurück zur Frage', 'ln', heftZu));
      leiste.appendChild(kopf);
      var tabs = el('div', 'q-leiste-reiter'), koerper = el('div', 'q-leiste-koerper');
      f.stellen.forEach(function (s, i) {
        var t = knopf(s.datum ? s.datum + ' · ' + s.reihe + (s.spalte ? ' · ' + s.spalte : '') : 'Karte', 'q-tab', function () { zeige(i); });
        tabs.appendChild(t);
      });
      if (f.stellen.length > 1) leiste.appendChild(tabs);
      leiste.appendChild(koerper);
      document.body.appendChild(leiste); document.body.classList.add('q-mit-leiste');
      function zeige(i) {
        tabs.querySelectorAll('button').forEach(function (b, j) { b.setAttribute('aria-pressed', i === j ? 'true' : 'false'); });
        leer(koerper);
        var s = f.stellen[i];
        if (s.text) { koerper.appendChild(el('p', 'h-hinweis', s.text)); return; }
        koerper.appendChild(el('p', 'leise', s.datum + ' · ' + s.titel));
        var vorlage = seite.querySelector('template[data-heft="' + s.stunde + '"]');
        if (!vorlage) return;
        var heft = vorlage.content.cloneNode(true); koerper.appendChild(heft);
        bilderLaden(koerper);
        var ziel = null;
        if (s.art === 'bild') {
          var fig = koerper.querySelectorAll('figure.einkleber')[s.bild];
          if (fig) {
            var m = el('span', 'q-mark'); var b = s.box;
            m.style.left = (b[0] * 100) + '%'; m.style.top = (b[1] * 100) + '%';
            m.style.width = ((b[2] - b[0]) * 100) + '%'; m.style.height = ((b[3] - b[1]) * 100) + '%';
            fig.classList.add('q-fig'); fig.appendChild(m); ziel = fig;
            var img = fig.querySelector('img');
            var hin = function () { setTimeout(function () { m.scrollIntoView({ block: 'center', behavior: 'smooth' }); }, 60); };
            if (img.complete && img.naturalWidth) hin(); else img.addEventListener('load', hin);
          }
        } else if (s.art === 'reihe') {
          ziel = koerper.querySelector('tr[data-reihe="' + s.zeile + '"]');
        } else if (s.art === 'antwort') {
          ziel = koerper.querySelector('[data-ziel="antwort"]');
        }
        if (ziel && s.art !== 'bild') { ziel.classList.add('q-markiert'); setTimeout(function () { ziel.scrollIntoView({ block: 'center', behavior: 'smooth' }); }, 60); }
        var a = el('a', 'ln', 'Ganze Stunde öffnen'); a.href = '../' + s.stunde + '/'; koerper.appendChild(a);
      }
      zeige(0);
      document.addEventListener('keydown', esc);
    }
    function esc(ev) { if (ev.key === 'Escape') heftZu(); }
    function heftZu() {
      if (leiste) { leiste.remove(); leiste = null; }
      document.body.classList.remove('q-mit-leiste'); document.removeEventListener('keydown', esc);
    }

    start();
  }

  function kiOeffnen(p, hinweis) {
    try { navigator.clipboard.writeText(p); } catch (e) {}
    var f = null;
    try { f = window.open(DUCKAI + encodeURIComponent(p), '_blank', 'noopener,noreferrer'); } catch (e) { f = null; }
    if (!f && hinweis) hinweis.textContent = 'Popup blockiert: Der Text ist kopiert. Öffne duck.ai selbst und füge ihn ein.';
  }

  var gemerkt = null;
  try { gemerkt = localStorage.getItem(NAME); } catch (e) {}
  if (gemerkt) oeffnen(b64(gemerkt)).catch(function () { vergessen(); torZeigen('Das Passwort hat sich geändert. Gib das neue ein.'); });
  else torZeigen();
})();
