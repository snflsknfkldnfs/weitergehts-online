/* Abstimmen — geteiltes Werkzeug fuer eine Abstimmung der Klasse an der Tafel (2026-10-26).
 *
 * Eine Aufgabe = ein Ordner mit index.html (laedt diese Datei) + data.json. Die Lehrkraft bedient die Seite an der
 * Tafel; die Kinder geben nichts ein. Drei Schritte:
 *   1 Verhandeln: je Streitfrage Bausteine, die Lehrkraft traegt die Stimmen ein (Handzeichen), Balken zeigen die Tendenz;
 *   2 Unser Entwurf: der Baustein mit den meisten Stimmen je Frage als Artikel, je Rolle Zufriedenheit 0–10;
 *   3 Der Vergleich: neben jedem Artikel der echte Text, wer welchen Baustein wollte, Zufriedenheit mit dem echten
 *     Ergebnis, die echte Abstimmung.
 * Der Stand bleibt im Browser dieses Geraets (localStorage), nichts verlaesst das Geraet; „Zuruecksetzen“ leert ihn.
 *
 * data.json (erzeugt vom Stunden-Skript, nie von Hand pflegen):
 * { "titel", "leitfrage", "entwurf_titel", "entwurf_ort", "vergleich_titel", "speicher",
 *   "rollen": [ { "id", "name", "kurz", "bild" } ],
 *   "fragen": [ { "id", "frage", "bausteine": [ { "id", "text", "flagge": ["#…"] | fehlt, "wer": ["rolle"], "echt": bool } ],
 *                 "echt": { "text", "artikel" } } ],
 *   "ergebnis": { "ja", "nein", "enthaltung", "dafuer", "dagegen", "zitat", "zitat_wer", "nachweis" } }
 */
(function () {
  'use strict';

  function el(tag, klasse, text) {
    var n = document.createElement(tag);
    if (klasse) n.className = klasse;
    if (text != null) n.textContent = text;
    return n;
  }
  function knopf(text, voll) { var b = el('button', 'm-knopf' + (voll ? ' voll' : ''), text); b.type = 'button'; return b; }

  var D, S, schluessel;
  var wurzel = document.getElementById('a-inhalt');

  function laden() {
    try { S = JSON.parse(localStorage.getItem(schluessel)) || null; } catch (e) { S = null; }
    if (!S) S = { schritt: 'verhandeln', frage: 0, stimmen: {}, zufrieden: {}, zufrieden_echt: {} };
  }
  function sichern() { try { localStorage.setItem(schluessel, JSON.stringify(S)); } catch (e) { /* ohne Speicher weiter */ } }

  function stimmen(f, b) { return (S.stimmen[f.id] || {})[b.id] || 0; }
  function gewinner(f) {
    var best = null, max = 0, gleich = false;
    f.bausteine.forEach(function (b) {
      var n = stimmen(f, b);
      if (n > max) { max = n; best = b; gleich = false; } else if (n === max && n > 0) { gleich = true; }
    });
    return (best && !gleich) ? best : null;
  }
  function flagge(b) {
    var f = el('span', 'a-flagge' + (b.flagge ? '' : ' leer'));
    (b.flagge || []).forEach(function (farbe) { var s = el('span'); s.style.background = farbe; f.appendChild(s); });
    return f;
  }
  function rolle(id) { return D.rollen.filter(function (r) { return r.id === id; })[0]; }

  function schritte() {
    var nav = document.getElementById('a-schritte');
    nav.textContent = '';
    [['verhandeln', '1 Verhandeln'], ['entwurf', '2 Unser Entwurf'], ['vergleich', '3 ' + D.vergleich_titel]].forEach(function (s) {
      var b = knopf(s[1]);
      b.setAttribute('aria-current', S.schritt === s[0] ? 'true' : 'false');
      b.onclick = function () { S.schritt = s[0]; sichern(); zeichnen(); };
      nav.appendChild(b);
    });
  }

  function verhandeln() {
    var f = D.fragen[S.frage];
    var blatt = el('section', 'a-blatt');
    var kopf = el('div', 'a-frage-kopf');
    kopf.appendChild(el('h2', 'a-frage', f.frage));
    kopf.appendChild(el('span', 'a-nr', 'Frage ' + (S.frage + 1) + ' von ' + D.fragen.length));
    blatt.appendChild(kopf);
    var summe = f.bausteine.reduce(function (a, b) { return a + stimmen(f, b); }, 0);
    var vorne = gewinner(f);
    var liste = el('div', 'a-bausteine');
    f.bausteine.forEach(function (b) {
      var z = el('div', 'a-baustein' + (vorne === b ? ' a-vorne' : ''));
      z.appendChild(flagge(b));
      var mitte = el('div');
      mitte.appendChild(el('div', 'a-btext', b.text));
      var balken = el('div', 'a-balken'); var i = el('i');
      i.style.width = (summe ? Math.round(100 * stimmen(f, b) / summe) : 0) + '%';
      balken.appendChild(i); mitte.appendChild(balken); z.appendChild(mitte);
      var zahl = el('div', 'a-zaehler');
      var minus = knopf('−'), plus = knopf('+');
      minus.setAttribute('aria-label', 'eine Stimme weniger'); plus.setAttribute('aria-label', 'eine Stimme mehr');
      function setze(d) {
        S.stimmen[f.id] = S.stimmen[f.id] || {};
        S.stimmen[f.id][b.id] = Math.max(0, stimmen(f, b) + d); sichern(); zeichnen();
      }
      minus.onclick = function () { setze(-1); }; plus.onclick = function () { setze(1); };
      zahl.appendChild(minus); zahl.appendChild(el('b', null, String(stimmen(f, b)))); zahl.appendChild(plus);
      z.appendChild(zahl);
      liste.appendChild(z);
    });
    blatt.appendChild(liste);
    blatt.appendChild(el('p', 'a-hinweis', vorne ? 'In den Entwurf kommt: ' + vorne.text
      : (summe ? 'Gleichstand: keine Einigung.' : 'Noch keine Stimmen.')));
    var navi = el('div', 'a-navi');
    var zur = knopf('← vorige Frage'); zur.disabled = S.frage === 0;
    zur.onclick = function () { S.frage--; sichern(); zeichnen(); };
    var vor = S.frage < D.fragen.length - 1 ? knopf('nächste Frage →', true) : knopf('zum Entwurf →', true);
    vor.onclick = function () {
      if (S.frage < D.fragen.length - 1) S.frage++; else S.schritt = 'entwurf';
      sichern(); zeichnen();
    };
    navi.appendChild(zur); navi.appendChild(vor); blatt.appendChild(navi);
    return blatt;
  }

  function regler(r, feld, frage) {
    var box = el('div', 'a-rolle');
    if (r.bild) { var img = el('img'); img.src = r.bild; img.alt = r.kurz; box.appendChild(img); }
    box.appendChild(el('strong', null, r.kurz));
    var lab = el('label', null, frage);
    var wert = S[feld][r.id];
    var inp = el('input'); inp.type = 'range'; inp.min = 0; inp.max = 10; inp.step = 1;
    inp.value = wert == null ? 5 : wert;
    var anzeige = el('div', 'a-unterschrift');
    function zeige() {
      var v = S[feld][r.id];
      if (v == null) { anzeige.textContent = 'noch nicht gefragt'; anzeige.className = 'a-unterschrift'; return; }
      var ja = v >= 5;
      anzeige.textContent = v + ' von 10 · ' + (ja ? 'unterschreibt' : 'unterschreibt nicht');
      anzeige.className = 'a-unterschrift ' + (ja ? 'ja' : 'nein');
    }
    inp.oninput = function () { S[feld][r.id] = Number(inp.value); sichern(); zeige(); };
    zeige();
    box.appendChild(lab); box.appendChild(inp); box.appendChild(anzeige);
    return box;
  }

  function entwurf() {
    var blatt = el('section', 'a-blatt a-dokument');
    blatt.appendChild(el('h2', null, D.entwurf_titel));
    blatt.appendChild(el('p', 'a-ort', D.entwurf_ort));
    D.fragen.forEach(function (f, i) {
      var a = el('div', 'a-artikel');
      a.appendChild(el('span', 'a-art', 'Artikel ' + (i + 1)));
      var g = gewinner(f);
      a.appendChild(el('span', null, g ? g.text : 'Keine Einigung.'));
      a.appendChild(el('span', 'a-ffrage', f.frage));
      blatt.appendChild(a);
    });
    var rollen = el('div', 'a-rollen');
    D.rollen.forEach(function (r) { rollen.appendChild(regler(r, 'zufrieden', 'Wie zufrieden bist du mit unserem Entwurf? (0 bis 10)')); });
    blatt.appendChild(rollen);
    return blatt;
  }

  function vergleich() {
    var blatt = el('section', 'a-blatt');
    D.fragen.forEach(function (f, i) {
      var z = el('div', 'a-vergleich');
      z.appendChild(el('h3', null, 'Artikel ' + (i + 1) + ': ' + f.frage));
      var g = gewinner(f);
      var links = el('div', 'a-spalte');
      links.appendChild(el('small', null, 'Unser Entwurf'));
      links.appendChild(el('span', null, g ? g.text : 'Keine Einigung.'));
      var rechts = el('div', 'a-spalte');
      rechts.appendChild(el('small', null, '1919 · ' + f.echt.artikel));
      rechts.appendChild(el('span', 'a-wortlaut', f.echt.text));
      var wer = el('div', 'a-wer');
      f.bausteine.forEach(function (b) {
        b.wer.forEach(function (id) { var r = rolle(id); if (r) wer.appendChild(el('span', 'a-chip', r.name + ' wollte: ' + b.text)); });
      });
      rechts.appendChild(wer);
      var echt = f.bausteine.filter(function (b) { return b.echt; })[0];
      var marke = el('div', 'a-marke ' + (g && echt && g.id === echt.id ? 'gleich' : 'anders'),
        g && echt && g.id === echt.id ? 'gleich' : 'anders');
      z.appendChild(links); z.appendChild(rechts); z.appendChild(marke);
      blatt.appendChild(z);
    });
    var rollen = el('div', 'a-rollen');
    D.rollen.forEach(function (r) { rollen.appendChild(regler(r, 'zufrieden_echt', 'Und mit der echten Verfassung? (0 bis 10)')); });
    blatt.appendChild(rollen);
    var e = D.ergebnis;
    if (e) {
      var erg = el('div', 'a-ergebnis');
      var zeig = knopf('Die echte Abstimmung zeigen', true);
      var inhalt = el('div'); inhalt.hidden = !S.ergebnis_offen;
      inhalt.appendChild(el('div', 'a-zahl', e.ja + ' Ja · ' + e.nein + ' Nein · ' + e.enthaltung + ' Enthaltung'));
      inhalt.appendChild(el('p', null, 'Dafür: ' + e.dafuer.join(', ') + ' · Dagegen: ' + e.dagegen.join(', ')));
      if (e.zitat) inhalt.appendChild(el('p', 'a-zitat', '„' + e.zitat + '“ — ' + e.zitat_wer));
      if (e.nachweis) inhalt.appendChild(el('p', 'a-hinweis', e.nachweis));
      zeig.hidden = !!S.ergebnis_offen;
      zeig.onclick = function () { S.ergebnis_offen = true; sichern(); zeichnen(); };
      erg.appendChild(zeig); erg.appendChild(inhalt);
      blatt.appendChild(erg);
    }
    return blatt;
  }

  function zeichnen() {
    schritte();
    wurzel.textContent = '';
    if (S.schritt === 'entwurf') wurzel.appendChild(entwurf());
    else if (S.schritt === 'vergleich') wurzel.appendChild(vergleich());
    else wurzel.appendChild(verhandeln());
  }

  fetch('data.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (d) {
    D = d;
    schluessel = 'abstimmen:' + (d.speicher || location.pathname);
    document.getElementById('a-titel').textContent = d.titel;
    document.getElementById('a-leitfrage').textContent = d.leitfrage || '';
    document.title = d.titel;
    var zurueck = document.getElementById('a-zurueck');
    zurueck.onclick = function () {
      if (window.confirm('Alle Stimmen und Regler dieser Seite löschen?')) {
        try { localStorage.removeItem(schluessel); } catch (e) { /* nichts */ }
        laden(); zeichnen();
      }
    };
    laden(); zeichnen();
  }).catch(function () {
    wurzel.textContent = 'Die Daten dieser Seite konnten nicht geladen werden.';
  });
})();
