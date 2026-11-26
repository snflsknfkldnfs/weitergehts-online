/* Begleiten — geteiltes Werkzeug: die Stunde Schritt für Schritt auf dem iPad (2026-10-29).
 *
 * Eine Stunde = ein Ordner mit index.html (lädt diese Datei) + data.json. Die Schritte folgen den Phasen der Stunde;
 * die Lehrkraft sagt an, wann es weitergeht, die Reiter oben zeigen, wo die Klasse steht. Gesichert wird auf Papier;
 * was das Kind hier tippt, bleibt im Browser dieses Geräts (localStorage), nichts verlässt das Gerät.
 *
 * data.json (erzeugt vom Stunden-Skript, nie von Hand pflegen):
 * { "titel", "leitfrage", "auftrag", "speicher", "ki_hilfe": bool, "ki_hinweis", "nachweis",
 *   "schritte": [
 *     { "id", "reiter", "titel", "auftrag", "typ": "sortieren",
 *       "faecher": [ { "id", "name" } ],
 *       "karten": [ { "id", "text", "amtlich": "<Name eines Fachs oder Satz>", "erklaerung" } ],
 *       "aufloesung_code": "<Hash>", "aufloesung_titel", "erkenntnis", "nachher": [ MATERIAL ] },
 *     { "id", "reiter", "titel", "auftrag", "typ": "lesen",
 *       "materialien": [ MATERIAL ], "fragen": [ FRAGE ],
 *       "seiten": [ { "id", "name", "materialien": [ MATERIAL ], "fragen": [ FRAGE ] } ] | fehlt } ] }
 * MATERIAL = { "kennung", "kopf", "wer", "wann", "absaetze": [ "Wortlaut mit {{Wort}}" | { "eigen": "Satz" } ] | fehlt,
 *              "entlastet": [ … ] | fehlt, "glossar": { "Wort": "Erklärung" }, "plakat": { "bild", "unterschrift", "oben": bool },
 *              (plakat.oben, seit 1.3 / 2026-11-09: Bild vor dem Text, etwa eine Lagekarte, die beim Lesen sichtbar bleiben soll;
 *              plakat.lage "rechts" | "breit", seit 1.9 / 2026-11-26: klein neben dem Text bzw. begrenzt hoch, Tipp öffnet groß)
 *              "einbettung": { "src", "hoehe", "titel" } | fehlt (seit 1.4 / 2026-11-09: interaktive Seite, etwa eine Zeitkarte,
 *              als Rahmen vor dem Text; darunter ein Knopf, der sie groß öffnet)
 *              "video": { "src", "start", "ende", "untertitel", "unterschrift" } | fehlt,
 *              "audio": { "src", "start", "ende", "bild", "unterschrift" } | fehlt (Podcast: bild = Cover), "ki_prompt", "nachweis" }
 * Freischalten (seit 2026-10-29): Jeder Schritt ab dem zweiten trägt "code" (Hash des Codeworts, das die Lehrkraft auf der
 * Folie zeigt); spätere Schritte sind unsichtbar, die Reiter heißen nur „Schritt n“. Die Auflösung beim Sortieren hat
 * ebenso einen Code. Hash: djb2 über das kleingeschriebene Wort, hexadezimal (gleich im Erzeuger der Stunde).
 * FRAGE = { "id", "fundstelle", "frage", "loesung" }
 * Rolle (seit 1.5 / 2026-11-09): { "id", "reiter", "titel", "auftrag", "typ": "rolle", "code", "lage": [ MATERIAL ],
 *   "rollen": [ { "id", "name", "farbe", "materialien": [ MATERIAL ] } ], "hinweis" }. Beim ersten Öffnen der Seite zieht
 *   das Gerät zufällig eine Rolle und merkt sie sich (localStorage, wie alles hier); zu sehen ist sie erst nach dem Code.
 *   ?rolle=<id> in der Adresse setzt die Rolle fest (zum Ausgleichen durch die Lehrkraft).
 * Fokus (seit 1.5, 2026-11-09): Die Reiter erscheinen erst, wenn ein zweiter Schritt offen ist. Ein Schritt kann
 *   "code_nach_seite": "<seiten-id>" tragen: Das Codefeld für den nächsten Schritt steht dann nur unter dieser Seite,
 *   und mit "code_label" (kurz, etwa „Code:“) erscheint es zurückhaltend gesetzt.
 * Regler (seit 1.8 / 2026-11-16): MATERIAL.sitze = { "id", "titel", "teile": [ { "id", "name", "lager": "links|fuer|rechts|andere" } ] (von links nach rechts),
 *   "stufen": [ { "label", "gesamt", "n": { "<teil-id>": Sitze } } ], "summen": [ { "name", "lager", "teile": [ "<teil-id>" ] } ], "legende": "…" }.
 *   Ein Regler über die Stufen (Wahlen nacheinander): Die Balken wachsen und schrumpfen, die Mehrheitsmarke (mehr als die Hälfte) steht fest
 *   in der Mitte; unter dem Balken stehen die Summen. Dazu „Abspielen“ (läuft einmal durch). Merkt sich die Stufe wie alles hier.
 * Wort für die Reiter (seit 1.8): "reiter_wort": "Bereich" in data.json statt „Schritt“ (Reiter, Weiter-Knopf, Codefeld).
 * Blatt-Hinweis (seit 1.8): ein Schritt kann "blatt": "…" tragen (Text unter dem Auftrag: wo auf dem Arbeitsblatt die Aufgaben stehen);
 *   mit "fragen": [] entfällt der Fragenkasten auf dem iPad, die Antworten stehen auf Papier.
 * Ohne Reiter (seit 1.7): "reiter": false in data.json blendet die Reiter immer aus; der Weg in den nächsten Schritt
 *   führt dann nur über das Codefeld bzw. danach über "weiter_label" (etwa „Zu deiner Rolle →“), zurück über einen
 *   dezenten Knopf unten im späteren Schritt.
 */
(function () {
  'use strict';

  var DUCKAI = 'https://duck.ai/?q=';
  var D, S, schluessel;
  var wurzel = document.getElementById('b-inhalt');

  function el(tag, klasse, text) {
    var n = document.createElement(tag);
    if (klasse) n.className = klasse;
    if (text != null) n.textContent = text;
    return n;
  }
  function knopf(text, voll) { var b = el('button', 'm-knopf' + (voll ? ' voll' : ''), text); b.type = 'button'; return b; }

  function laden() {
    try { S = JSON.parse(localStorage.getItem(schluessel)) || null; } catch (e) { S = null; }
    if (!S) S = { schritt: 0, offen: 0, sortiert: {}, aufgeloest: {}, antworten: {}, verglichen: {}, seite: {} };
    if (S.offen == null) S.offen = 0;
    if (!S.rolle) S.rolle = {};
  }
  function sichern() { try { localStorage.setItem(schluessel, JSON.stringify(S)); } catch (e) { /* ohne Speicher weiter */ } }

  function hash(w) {
    var h = 5381, s = String(w || '').trim().toLowerCase();
    for (var i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
    return h.toString(16);
  }
  /* Codefeld: richtig → wenn(); falsch → Hinweis, nichts passiert */
  function codeFeld(text, ziel, wenn) {
    var z = el('div', 'b-code');
    var lab = el('label', null, text);
    var feld = el('input', 'b-code-feld'); feld.type = 'text'; feld.autocomplete = 'off'; feld.autocapitalize = 'characters';
    lab.appendChild(feld);
    var k = knopf('Öffnen', true);
    var meld = el('span', 'b-code-meldung m-leise');
    function pruefen() {
      if (hash(feld.value) === ziel) { wenn(); return; }
      meld.textContent = 'Das ist nicht der Code. Warte, bis deine Lehrkraft ihn zeigt.';
    }
    k.addEventListener('click', pruefen);
    feld.addEventListener('keydown', function (e) { if (e.key === 'Enter') pruefen(); });
    z.appendChild(lab); z.appendChild(k); z.appendChild(meld);
    return z;
  }

  /* ── Text: {{Wort}} wird antippbar, die Erklärung erscheint unter dem Absatz ── */
  function absatzBauen(a, glossar) {
    if (a && typeof a === 'object') return el('p', 'b-eigen', a.eigen);
    var p = el('p', 'b-wortlaut');
    var erkl = null;
    String(a).split(/(\{\{[^}]+\}\})/).forEach(function (teil) {
      var m = teil.match(/^\{\{([^}]+)\}\}$/);
      if (!m) { p.appendChild(document.createTextNode(teil)); return; }
      var wort = m[1];
      if (!glossar[wort]) { p.appendChild(document.createTextNode(wort)); return; }
      var w = el('button', 'b-wort', wort); w.type = 'button';
      w.addEventListener('click', function () {
        if (!erkl) { erkl = el('span', 'b-erklaerung'); p.appendChild(erkl); }
        erkl.textContent = wort + ': ' + glossar[wort];
      });
      p.appendChild(w);
    });
    return p;
  }

  function kopieren(t) {
    try { navigator.clipboard.writeText(t); } catch (e) { /* ohne Zwischenablage weiter */ }
  }
  function kiKnopf(m) {
    var b = knopf('Mit KI verstehen');
    b.classList.add('b-ki');
    b.setAttribute('aria-label', 'Mit KI verstehen: ' + (m.kennung || m.kopf));
    var hinweis = el('span', 'b-ki-hinweis m-leise');
    b.addEventListener('click', function () {
      kopieren(m.ki_prompt);
      var f = null;
      try { f = window.open(DUCKAI + encodeURIComponent(m.ki_prompt), '_blank', 'noopener,noreferrer'); } catch (e) { f = null; }
      hinweis.textContent = f ? '' : 'Popup blockiert – der Text ist kopiert, duck.ai selbst öffnen';
    });
    var h = el('div', 'b-ki-zeile'); h.appendChild(b); h.appendChild(hinweis);
    return h;
  }

  function videoBauen(v) {
    var fig = el('figure', 'b-video');
    var vid = el('video');
    vid.controls = true; vid.preload = 'metadata'; vid.setAttribute('playsinline', '');
    vid.src = v.src + (v.start != null ? '#t=' + v.start + (v.ende != null ? ',' + v.ende : '') : '');
    if (v.untertitel) {
      var tr = el('track'); tr.kind = 'subtitles'; tr.srclang = 'de'; tr.label = 'Deutsch'; tr.src = v.untertitel; tr.default = true;
      vid.appendChild(tr);
    }
    fig.appendChild(vid);
    if (v.unterschrift) fig.appendChild(el('figcaption', 'm-leise', v.unterschrift));
    return fig;
  }

  function audioBauen(a) {
    var fig = el('figure', 'b-audio');
    if (a.bild) { var img = el('img'); img.src = a.bild; img.alt = ''; img.loading = 'lazy'; fig.appendChild(img); }
    var rechts = el('div');
    var au = el('audio'); au.controls = true; au.preload = 'metadata';
    au.src = a.src + (a.start != null ? '#t=' + a.start + (a.ende != null ? ',' + a.ende : '') : '');
    rechts.appendChild(au);
    if (a.unterschrift) rechts.appendChild(el('figcaption', 'm-leise', a.unterschrift));
    fig.appendChild(rechts);
    return fig;
  }

  function einbettungBauen(e) {
    var z = el('div', 'b-einbettung');
    var f = el('iframe'); f.src = e.src; f.title = e.titel || 'Interaktives Material';   /* sofort laden: verzögert blieb der Rahmen live leer (09.11.) */
    f.style.width = '100%'; f.style.height = (e.hoehe || 700) + 'px'; f.style.border = '1px solid var(--m-linie-hell)';
    z.appendChild(f);
    var a = el('a', 'm-knopf', 'Groß öffnen'); a.href = e.src; a.target = '_blank'; a.rel = 'noopener';
    z.appendChild(a);
    return z;
  }
  /* plakat.lage (seit 1.9 / 2026-11-26): "rechts" = kleines Bild rechts neben dem Text (auf schmalen Geräten darüber),
   * "breit" = über die ganze Breite, aber höchstens 40 % der Bildschirmhöhe (Karte, Zeitstrahl); ohne lage wie bisher.
   * Ein Tipp aufs Bild öffnet es groß auf derselben Seite (Lehrkraft 26.11.: kleine Bildschirme, nicht überladen). */
  function grossZeigen(p) {
    var hg = el('div', 'b-gross'); hg.setAttribute('role', 'dialog'); hg.setAttribute('aria-label', p.unterschrift || 'Bild');
    var img = el('img'); img.src = p.bild; img.alt = p.unterschrift || '';
    var zu = el('button', 'b-gross-zu', '×'); zu.setAttribute('aria-label', 'Schließen');
    hg.appendChild(zu); hg.appendChild(img);
    if (p.unterschrift) hg.appendChild(el('p', 'b-gross-text', p.unterschrift));
    function weg() { hg.remove(); document.removeEventListener('keydown', taste); }
    function taste(e) { if (e.key === 'Escape') weg(); }
    hg.addEventListener('click', weg); document.addEventListener('keydown', taste);
    document.body.appendChild(hg);
  }
  function plakatBauen(p) {
    var fig = el('figure', 'b-plakat' + (p.lage ? ' b-plakat-' + p.lage : ''));
    var a = el('a'); a.href = p.bild; a.target = '_blank'; a.rel = 'noopener';
    var img = el('img'); img.src = p.bild; img.alt = p.unterschrift || ''; img.loading = 'lazy';
    a.appendChild(img); fig.appendChild(a);
    if (p.lage) {
      a.addEventListener('click', function (e) { e.preventDefault(); grossZeigen(p); });
      fig.appendChild(el('span', 'b-lupe m-leise', 'Tipp aufs Bild: groß'));
    }
    if (p.unterschrift) fig.appendChild(el('figcaption', 'm-leise', p.unterschrift));
    return fig;
  }
  /* ── Regler über die Sitzverteilung (seit 1.8) ── */
  function sitzeBauen(sz) {
    var fig = el('figure', 'b-sitze');
    var key = sz.id || 'sitze';
    S.sitze = S.sitze || {};
    var n = sz.stufen.length;
    var i = Math.max(0, Math.min(S.sitze[key] || 0, n - 1));
    var kopf = el('p', 'b-sitze-kopf');
    var balkenRahmen = el('div', 'b-sitze-rahmen');
    var balken = el('div', 'b-sitze-balken');
    balken.setAttribute('role', 'img');
    var teile = {};
    sz.teile.forEach(function (t) {
      var d = el('div', 'b-sitze-teil lager-' + t.lager);
      var nm = el('span', 'b-sitze-name', t.name), zahl = el('strong', 'b-sitze-zahl', '');
      d.appendChild(nm); d.appendChild(zahl);
      balken.appendChild(d); teile[t.id] = { d: d, zahl: zahl, nm: nm };
    });
    balkenRahmen.appendChild(balken);
    var marke = el('div', 'b-sitze-marke');
    var markeText = el('span', 'b-sitze-markentext', '');
    marke.appendChild(markeText);
    balkenRahmen.appendChild(marke);
    var regler = el('input', 'b-sitze-regler');
    regler.type = 'range'; regler.min = 0; regler.max = n - 1; regler.step = 1; regler.value = i;
    regler.setAttribute('aria-label', 'Wahl wählen: ' + sz.stufen.map(function (x) { return x.label; }).join(', '));
    var skala = el('div', 'b-sitze-skala');
    var tasten = sz.stufen.map(function (x, k) {
      var b = knopf(x.label); b.addEventListener('click', function () { setzen(k); }); skala.appendChild(b); return b;
    });
    var abspielen = knopf('Abspielen ▶');
    var summenZeile = el('ul', 'b-sitze-summen');
    var timer = null;
    function stoppen() { if (timer) { clearInterval(timer); timer = null; abspielen.textContent = 'Abspielen ▶'; } }
    function setzen(k) {
      i = k; regler.value = k; S.sitze[key] = k; sichern();
      var st = sz.stufen[k];
      kopf.textContent = st.label + ': ' + st.gesamt + ' Sitze im Reichstag';
      sz.teile.forEach(function (t) {
        var v = st.n[t.id] || 0, pct = 100 * v / st.gesamt, x = teile[t.id];
        x.d.style.flexBasis = pct + '%';
        x.zahl.textContent = v; x.nm.hidden = pct < 7; x.zahl.hidden = pct < 3;
        x.d.title = t.name + ': ' + v + ' Sitze';
      });
      var mehr = Math.floor(st.gesamt / 2) + 1;
      markeText.textContent = 'Mehrheit ab ' + mehr + ' Sitzen';
      balken.setAttribute('aria-label', st.label + ': ' + sz.teile.map(function (t) { return t.name + ' ' + (st.n[t.id] || 0); }).join(', ') + '. Mehrheit ab ' + mehr + ' Sitzen.');
      summenZeile.textContent = '';
      sz.summen.forEach(function (sm) {
        var sum = 0; sm.teile.forEach(function (id) { sum += st.n[id] || 0; });
        var li = el('li', 'b-sitze-summe lager-' + sm.lager);
        li.appendChild(el('span', null, sm.name)); li.appendChild(el('strong', null, String(sum)));
        summenZeile.appendChild(li);
      });
      tasten.forEach(function (b, j) { b.setAttribute('aria-pressed', String(j === k)); });
    }
    regler.addEventListener('input', function () { stoppen(); setzen(Number(regler.value)); });
    abspielen.addEventListener('click', function () {
      if (timer) { stoppen(); return; }
      setzen(0); abspielen.textContent = 'Anhalten ■';
      timer = setInterval(function () { if (i >= n - 1) { stoppen(); return; } setzen(i + 1); }, 2200);
    });
    fig.appendChild(kopf); fig.appendChild(balkenRahmen); fig.appendChild(regler); fig.appendChild(skala);
    var zeile = el('div', 'b-sitze-zeile'); zeile.appendChild(abspielen); fig.appendChild(zeile);
    fig.appendChild(summenZeile);
    if (sz.legende) fig.appendChild(el('figcaption', 'm-leise', sz.legende));
    setzen(i);
    return fig;
  }
  function materialBauen(m) {
    var art = el('article', 'b-material m-blatt');
    var kopf = el('header', 'b-mkopf');
    if (m.kennung) kopf.appendChild(el('span', 'b-kennung', m.kennung));
    kopf.appendChild(el('h3', null, m.kopf));
    art.appendChild(kopf);
    if (m.wer || m.wann) art.appendChild(el('p', 'b-wer m-leise', [m.wer, m.wann].filter(Boolean).join(' · ')));
    var glossar = m.glossar || {};
    if (m.video) art.appendChild(videoBauen(m.video));
    if (m.audio) art.appendChild(audioBauen(m.audio));
    if (m.einbettung) art.appendChild(einbettungBauen(m.einbettung));
    if (m.sitze) art.appendChild(sitzeBauen(m.sitze));
    if (m.plakat && (m.plakat.oben || m.plakat.lage)) art.appendChild(plakatBauen(m.plakat));
    var wortlaut = el('div', 'b-text');
    (m.absaetze || []).forEach(function (a) { wortlaut.appendChild(absatzBauen(a, glossar)); });
    if (m.entlastet && m.entlastet.length) {
      var leicht = el('div', 'b-text');
      leicht.appendChild(el('p', 'b-marke', 'Leichter lesen – nicht der Originaltext'));
      m.entlastet.forEach(function (a) { leicht.appendChild(absatzBauen(a, glossar)); });
      var reiter = el('div', 'b-fassungen');
      var k1 = knopf('Originaltext'), k2 = knopf('Leichter lesen');
      function zeigen(leichtZeigen) {
        wortlaut.hidden = leichtZeigen; leicht.hidden = !leichtZeigen;
        k1.setAttribute('aria-pressed', String(!leichtZeigen)); k2.setAttribute('aria-pressed', String(leichtZeigen));
      }
      k1.addEventListener('click', function () { zeigen(false); });
      k2.addEventListener('click', function () { zeigen(true); });
      reiter.appendChild(k1); reiter.appendChild(k2);
      art.appendChild(reiter); art.appendChild(wortlaut); art.appendChild(leicht);
      zeigen(false);
    } else {
      art.appendChild(wortlaut);
    }
    if (m.plakat && !m.plakat.oben && !m.plakat.lage) art.appendChild(plakatBauen(m.plakat));
    if (D.ki_hilfe && m.ki_prompt) art.appendChild(kiKnopf(m));
    if (m.nachweis) art.appendChild(el('p', 'b-nachweis m-leise', m.nachweis));
    return art;
  }

  /* ── Fragen: Antwort tippen, dann mit dem Material vergleichen ── */
  function frageBauen(f, nr) {
    var li = el('li', 'b-frage');
    if (f.fundstelle) li.appendChild(el('p', 'b-fundstelle m-leise', 'Lies ' + f.fundstelle));
    li.appendChild(el('p', 'b-fragetext', nr + '. ' + f.frage));
    var feld = el('textarea', 'b-antwort'); feld.rows = 2;
    feld.setAttribute('aria-label', 'Deine Antwort zu Frage ' + nr);
    feld.value = S.antworten[f.id] || '';
    var vergleich = knopf('Vergleichen');
    var loesung = el('p', 'b-loesung');
    function stand() {
      vergleich.disabled = !feld.value.trim();
      loesung.hidden = !S.verglichen[f.id];
      loesung.textContent = 'So steht es im Material: ' + f.loesung;
    }
    feld.addEventListener('input', function () { S.antworten[f.id] = feld.value; sichern(); stand(); });
    vergleich.addEventListener('click', function () { S.verglichen[f.id] = true; sichern(); stand(); });
    li.appendChild(feld); li.appendChild(vergleich); li.appendChild(loesung);
    stand();
    return li;
  }

  function teilBauen(materialien, fragen, wohin) {
    (materialien || []).forEach(function (m) { wohin.appendChild(materialBauen(m)); });
    if (fragen && fragen.length) {
      var box = el('section', 'b-fragen m-blatt');
      box.appendChild(el('h3', null, 'Deine Fragen'));
      var ol = el('ol', 'b-fragenliste');
      fragen.forEach(function (f, i) { ol.appendChild(frageBauen(f, i + 1)); });
      box.appendChild(ol);
      wohin.appendChild(box);
    }
  }

  function lesenBauen(s, wohin) {
    if (!s.seiten) { teilBauen(s.materialien, s.fragen, wohin); return; }
    var wahl = el('div', 'b-seitenwahl');
    var raum = el('div', 'b-seite');
    s.seiten.forEach(function (seite) {
      var k = knopf(seite.name);
      k.setAttribute('aria-pressed', String(S.seite[s.id] === seite.id));
      k.addEventListener('click', function () { S.seite[s.id] = seite.id; sichern(); zeichnen(); });
      wahl.appendChild(k);
    });
    wohin.appendChild(wahl);
    var gewaehlt = s.seiten.filter(function (x) { return x.id === S.seite[s.id]; })[0];
    if (gewaehlt) teilBauen(gewaehlt.materialien, gewaehlt.fragen, raum);
    else raum.appendChild(el('p', 'b-hinweis m-leise', 'Tipp oben auf deine Seite.'));
    wohin.appendChild(raum);
  }

  /* ── Sortieren: je Karte ein Fach antippen, dann die Auflösung ── */
  function sortierenBauen(s, wohin) {
    var sortiert = S.sortiert[s.id] = S.sortiert[s.id] || {};
    var offen = !S.aufgeloest[s.id];
    var liste = el('ol', 'b-karten');
    s.karten.forEach(function (k, i) {
      var li = el('li', 'b-karte m-blatt');
      li.appendChild(el('p', 'b-kartentext', (i + 1) + '. ' + k.text));
      var reihe = el('div', 'b-faecher');
      s.faecher.forEach(function (f) {
        var b = knopf(f.name);
        b.setAttribute('aria-pressed', String(sortiert[k.id] === f.id));
        b.disabled = !offen;
        b.addEventListener('click', function () { sortiert[k.id] = f.id; sichern(); zeichnen(); });
        reihe.appendChild(b);
      });
      li.appendChild(reihe);
      if (!offen) {
        var du = s.faecher.filter(function (f) { return f.id === sortiert[k.id]; })[0];
        var a = el('p', 'b-amtlich');
        a.appendChild(el('strong', null, 'Amtlich: ' + k.amtlich));
        a.appendChild(document.createTextNode(' – ' + k.erklaerung));
        li.appendChild(a);
        li.appendChild(el('p', 'b-du m-leise', 'Du: ' + (du ? du.name : '–')));
      }
      liste.appendChild(li);
    });
    wohin.appendChild(liste);
    var fertig = s.karten.every(function (k) { return sortiert[k.id]; });
    if (offen) {
      if (fertig) wohin.appendChild(codeFeld('Code für die Auflösung: ', s.aufloesung_code,
        function () { S.aufgeloest[s.id] = true; sichern(); zeichnen(); }));
      else wohin.appendChild(el('p', 'b-aktion m-leise', 'Ordne zuerst jeden Fall ein.'));
    } else {
      var e = el('section', 'b-erkenntnis m-blatt');
      e.appendChild(el('h3', null, s.aufloesung_titel || 'Was fällt dir auf?'));
      e.appendChild(el('p', null, s.erkenntnis));
      wohin.appendChild(e);
      (s.nachher || []).forEach(function (m) { wohin.appendChild(materialBauen(m)); });
    }
  }

  function rollenZiehen() {
    var fest = new URLSearchParams(location.search).get('rolle');
    var neu = false;
    D.schritte.forEach(function (s) {
      if (s.typ !== 'rolle') return;
      var ids = s.rollen.map(function (r) { return r.id; });
      if (fest && ids.indexOf(fest) >= 0 && S.rolle[s.id] !== fest) { S.rolle[s.id] = fest; neu = true; }
      if (!S.rolle[s.id] || ids.indexOf(S.rolle[s.id]) < 0) {
        var z = new Uint32Array(1);
        if (window.crypto && crypto.getRandomValues) crypto.getRandomValues(z); else z[0] = Math.floor(Math.random() * 4294967295);
        S.rolle[s.id] = ids[z[0] % ids.length]; neu = true;
      }
    });
    if (neu) sichern();
  }
  function rolleBauen(s, wohin) {
    var r = s.rollen.filter(function (x) { return x.id === S.rolle[s.id]; })[0];
    if (!r) return;
    var karte = el('section', 'b-rolle m-blatt');
    var kopf = el('header', 'b-rollenkopf');
    kopf.style.background = r.farbe; kopf.style.color = '#fff'; kopf.style.padding = '10px 14px';
    kopf.appendChild(el('p', 'b-rollenvor', 'Deine Rolle'));
    kopf.appendChild(el('h3', null, r.name));
    karte.appendChild(kopf);
    (r.materialien || []).forEach(function (m) { karte.appendChild(materialBauen(m)); });
    if (s.hinweis) karte.appendChild(el('p', 'b-rollenhinweis', s.hinweis));
    wohin.appendChild(karte);   /* zuerst die eigene Rolle, darunter die gemeinsame Lage */
    (s.lage || []).forEach(function (m) { wohin.appendChild(materialBauen(m)); });
  }
  function zeichnen() {
    var nr = Math.min(S.schritt || 0, S.offen, D.schritte.length - 1);
    var reiter = document.getElementById('b-reiter');
    reiter.textContent = '';
    reiter.hidden = S.offen < 1 || D.reiter === false;   /* ein einziger Schritt braucht keine Reiter; sie lenken nur ab */
    D.schritte.slice(0, S.offen + 1).forEach(function (s, i) {
      var k = knopf((D.reiter_wort || 'Schritt') + ' ' + (i + 1));
      k.setAttribute('aria-pressed', String(i === nr));
      k.addEventListener('click', function () { S.schritt = i; sichern(); zeichnen(); window.scrollTo(0, 0); });
      reiter.appendChild(k);
    });
    var s = D.schritte[nr];
    wurzel.textContent = '';
    var kopf = el('header', 'b-schrittkopf');
    if (s.titel) kopf.appendChild(el('h2', null, s.titel));
    if (s.auftrag) kopf.appendChild(el('p', 'b-auftrag', s.auftrag));
    if (s.blatt) kopf.appendChild(el('p', 'b-blatt', s.blatt));
    if (s.titel || s.auftrag) wurzel.appendChild(kopf);
    if (s.typ === 'sortieren') sortierenBauen(s, wurzel);
    else if (s.typ === 'rolle') rolleBauen(s, wurzel);
    else lesenBauen(s, wurzel);
    if (D.reiter === false && nr > 0) {
      var zr = el('div', 'b-weiter b-weiter-dezent');
      var zurueck = knopf('← Zurück zu den Materialien');
      zurueck.addEventListener('click', function () { S.schritt = nr - 1; sichern(); zeichnen(); window.scrollTo(0, 0); });
      zr.appendChild(zurueck); wurzel.appendChild(zr);
    }
    var sortOffen = s.typ === 'sortieren' && !S.aufgeloest[s.id];  /* erst Auflösung, dann der nächste Code */
    var codeHier = !s.code_nach_seite || S.seite[s.id] === s.code_nach_seite;   /* Code und Weiter nur unter dieser Seite */
    if (nr < D.schritte.length - 1 && !sortOffen && codeHier) {
      var z = el('div', 'b-weiter');
      if (nr < S.offen) {
        if (s.code_label) z.className = 'b-weiter b-weiter-dezent';
        var weiter = knopf(s.weiter_label || ('Weiter zu ' + (D.reiter_wort || 'Schritt') + ' ' + (nr + 2)));
        weiter.addEventListener('click', function () { S.schritt = nr + 1; sichern(); zeichnen(); window.scrollTo(0, 0); });
        z.appendChild(weiter);
      } else {
        if (s.code_label) z.className = 'b-weiter b-weiter-dezent';
        z.appendChild(codeFeld(s.code_label || ('Code für den nächsten ' + (D.reiter_wort || 'Schritt') + ': '), D.schritte[nr + 1].code, function () {
          S.offen = nr + 1; S.schritt = nr + 1; sichern(); zeichnen(); window.scrollTo(0, 0);
        }));
      }
      wurzel.appendChild(z);
    }
  }

  function start(d) {
    D = d;
    schluessel = 'begleiten:' + (d.speicher || location.pathname);
    laden();
    rollenZiehen();
    document.title = d.titel;
    document.getElementById('b-titel').textContent = d.titel;
    if (d.leitfrage) document.getElementById('b-leitfrage').textContent = d.leitfrage;
    if (d.auftrag) document.getElementById('b-auftrag').textContent = d.auftrag;
    if (d.ki_hilfe && d.ki_hinweis) { var h = document.getElementById('b-ki-hinweis'); h.textContent = d.ki_hinweis; h.hidden = false; }
    if (d.nachweis) document.getElementById('b-nachweis').textContent = d.nachweis;
    var neu = document.getElementById('b-neu');
    neu.addEventListener('click', function () {
      if (!window.confirm('Alles auf diesem Gerät löschen und neu anfangen?')) return;
      var rolle = S.rolle;   /* die gezogene Rolle bleibt: kein neues Ziehen durch Neu anfangen */
      try { localStorage.removeItem(schluessel); } catch (e) { /* ohne Speicher weiter */ }
      laden(); S.rolle = rolle; sichern(); zeichnen();
    });
    zeichnen();
  }

  fetch('data.json', { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(start)
    .catch(function () { wurzel.textContent = 'Die Seite konnte nicht geladen werden. Bitte neu laden.'; });
})();
