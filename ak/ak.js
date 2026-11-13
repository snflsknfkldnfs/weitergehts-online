/* Arbeitskreis Ehrenamt: Ausstellung der Rollenkarten + anonyme Rückmeldung.
 * Startseite (index.html) und Rollenseite (rolle.html?nr=07 bzw. ?nr=allgemein) teilen dieses Skript.
 * Backend: Supabase (Frankfurt), Zugriff nur per fetch auf die REST-Schnittstelle, keine Bibliothek,
 * kein localStorage. Ob Antworten angenommen werden, entscheidet allein die Tabelle `umfragen`
 * (offen_von/offen_bis) per Zeilenregel in der Datenbank. Die Seite zeigt den Zustand nur an.
 * Gestaltung: Wireframe-Grundsätze (kein Fließtext, je Satz eine Zeile; keine Zählungen).
 * Datenbank, Rechte, Anlegen/Auswerten/Löschen der Umfrage: eigenes Repo /Users/paulad/umfragen-backend (README.md). */
(function () {
  'use strict';

  // ---- Konfiguration --------------------------------------------------------------------------
  // url: Supabase → Project Settings → Data API → Project URL.
  // anonKey: der „Publishable key“ (sb_publishable_…). Er ist öffentlich gedacht und erlaubt nur,
  // was Rechte und Zeilenregeln freigeben (Umfrage-Status lesen, Antwort abschicken).
  var KONFIG = {
    url: 'https://mgrepdfyiudqsxtihdfw.supabase.co',
    anonKey: 'sb_publishable_pfrEOZKHGDwenjqMRAWuag_ksem4yTm',
    umfrage: 'ak-rollen-2026'
  };

  // Runde des Arbeitskreises: Link mit ?runde=ak. Eigene Umfrage, zusätzliche Frage zum Aushang (mit Veto).
  // Ohne den Schalter sieht und schickt die Seite nur die Kollegiumsrunde.
  var RUNDE_AK = new URLSearchParams(location.search).get('runde') === 'ak';
  if (RUNDE_AK) KONFIG.umfrage = 'ak-sichtung-2026';
  var AUSHANG = { feld: 'aushang', typ: 'wahl', frage: 'Soll diese Rolle in den Aushang fürs Kollegium?', optionen: ['ja', 'mit Änderungen', 'Veto: nicht aushängen'] };

  // ---- Zentraler Datenschutz-Hinweis (Dialog auf der Startseite + Kurzfassung am Formular) -----
  var LOESCHFRIST = '31.07.2027';
  var DSGVO_LINK = '<a href="../datenschutz/#umfragen">Datenschutzerklärung</a>';
  var DSGVO_PUNKTE = [
    '<strong>Anonym:</strong> Es werden keine Namen abgefragt und nichts gespeichert, was auf dich schließen lässt.',
    '<strong>Bitte keine Namen und keine personenbezogenen Angaben eintragen</strong>, weder über dich noch über andere, vor allem nicht über Schülerinnen und Schüler.',
    'Gespeichert werden nur Antworten, Karte und Zeitpunkt, beim Dienst Supabase auf Servern in Frankfurt am Main (EU).',
    'Deine IP-Adresse wird beim Absenden technisch bedingt übermittelt, nur kurz zum sicheren Betrieb protokolliert und nicht mit den Antworten gespeichert.',
    'Zweck: nur die Planung im Arbeitskreis. Löschung nach der Auswertung, spätestens am ' + LOESCHFRIST + '.'
  ];
  var DSGVO_KURZ = [
    'Anonym. Bitte keine Namen, auch nicht von Schülerinnen und Schülern.',
    'Gespeichert in Frankfurt (EU), gelöscht spätestens am ' + LOESCHFRIST + '.',
    DSGVO_LINK
  ];

  var GRENZE = 1500; // Zeichen pro Freitextfeld (gleiche Grenze prüft die Datenbank)

  var FRAGEN = {
    rolle: [
      { feld: 'eindruck', typ: 'text', frage: 'Wie findest du diesen Vorschlag? Was überzeugt dich daran?' },
      { feld: 'uebersehen', typ: 'text', frage: 'Was übersehen wir vielleicht? Was müsste man nachschärfen?' },
      { feld: 'begleiten', typ: 'wahl', frage: 'Könntest du dir vorstellen, diese Rolle als Ansprechperson zu begleiten?', optionen: ['ja', 'vielleicht', 'nein'] }
    ],
    allgemein: [
      { feld: 'eindruck', typ: 'text', frage: 'Wie findest du das Vorhaben? Was überzeugt dich daran?' },
      { feld: 'uebersehen', typ: 'text', frage: 'Was übersehen wir vielleicht? Was müsste man nachschärfen?' },
      { feld: 'fehlende_rolle', typ: 'text', frage: 'Fehlt eine Rolle, die es an unserer Schule bräuchte?' }
    ]
  };

  var ALLGEMEIN = {
    titel: 'Das Vorhaben insgesamt',
    satz: 'Schülerinnen und Schüler übernehmen Verantwortung an unserer Schule.',
    zeilen: [
      'Verantwortung für einen Raum, eine Gruppe, ein Kind oder eine Aufgabe.',
      'Dafür Anerkennung, eigene Ressourcen und echte Entscheidungen.',
      'Sie helfen und sind Gastgeber; sie kontrollieren keine Mitschülerinnen und Mitschüler.',
      'Ordnung durchsetzen bleibt Sache der Lehrkräfte.',
      'Manche Rollen gibt es schon, viele sind neu.',
      'Starten sollen zunächst wenige Rollen, die dafür gut begleitet werden.'
    ]
  };

  // ---- Hilfen ---------------------------------------------------------------------------------
  function e(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function $(sel) { return document.querySelector(sel); }
  function liste(zeilen, klasse) {
    return '<ul class="' + klasse + '">' + zeilen.map(function (z) { return '<li>' + z + '</li>'; }).join('') + '</ul>';
  }
  function datum(iso) {
    return new Date(iso).toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
  }
  function konfiguriert() { return !!(KONFIG.url && KONFIG.anonKey); }
  function kopfzeilen(extra) {
    var h = { apikey: KONFIG.anonKey }; // neue Schlüssel nur als apikey, nicht als Bearer-Token
    for (var k in extra) h[k] = extra[k];
    return h;
  }

  function rollenLaden() {
    return fetch('rollen.json', { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error('rollen.json ' + r.status);
      return r.json();
    });
  }

  // Zustand der Umfrage: 'vorbereitet' | 'bald' | 'offen' | 'beendet' | 'unbekannt'
  function statusLaden() {
    if (!konfiguriert()) return Promise.resolve({ zustand: 'vorbereitet' });
    var u = KONFIG.url + '/rest/v1/umfragen?id=eq.' + encodeURIComponent(KONFIG.umfrage) + '&select=offen_von,offen_bis';
    return fetch(u, { headers: kopfzeilen({}) }).then(function (r) {
      if (!r.ok) throw new Error('Status ' + r.status);
      return r.json();
    }).then(function (zeilen) {
      if (!zeilen.length) return { zustand: 'vorbereitet' };
      var z = zeilen[0], jetzt = Date.now();
      if (jetzt < Date.parse(z.offen_von)) return { zustand: 'bald', von: z.offen_von, bis: z.offen_bis };
      if (jetzt > Date.parse(z.offen_bis)) return { zustand: 'beendet', von: z.offen_von, bis: z.offen_bis };
      return { zustand: 'offen', von: z.offen_von, bis: z.offen_bis };
    }).catch(function () { return { zustand: 'unbekannt' }; });
  }

  function statusText(s) {
    switch (s.zustand) {
      case 'offen': return 'Rückmeldung offen bis ' + datum(s.bis);
      case 'bald': return 'Rückmeldung ab ' + datum(s.von);
      case 'beendet': return 'Rückmeldung beendet. Danke!';
      case 'unbekannt': return 'Stand gerade nicht abrufbar. Bitte später noch einmal.';
      default: return 'Zum Ansehen. Die Rückmeldung startet in Kürze.';
    }
  }
  function statusSetzen(el, s) {
    el.textContent = statusText(s);
    el.className = 'zustand' + (s.zustand === 'offen' ? ' offen' : '');
  }

  // ---- Datenschutz-Dialog ---------------------------------------------------------------------
  function dialogAufbauen() {
    var d = document.createElement('dialog');
    d.className = 'dsgvo';
    d.setAttribute('aria-labelledby', 'dsgvo-titel');
    d.innerHTML = '<h2 id="dsgvo-titel">Bevor du Rückmeldung gibst</h2>' + liste(DSGVO_PUNKTE, '') +
      '<p class="mehr">Ausführlich: ' + DSGVO_LINK + '</p>' +
      '<form method="dialog"><button class="senden" value="ok">Verstanden</button></form>';
    document.body.appendChild(d);
    return d;
  }
  function dialogZeigen(d) {
    if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', '');
  }

  // ---- Blätter --------------------------------------------------------------------------------
  function karteHtml(r) {
    return '<article class="blatt">' +
      '<div class="blatt-titel"><div class="sym" aria-hidden="true">' + e(r.symbol) + '</div><div>' +
      '<h1 class="einheit" data-einheit="Rollenname">' + e(r.rolle) + '</h1><p class="satz einheit" data-einheit="Satz">' + e(r.satz) + '</p>' +
      '<div class="merkmale"><span class="merkmal">Jgst. ' + e(r.jgst) + '</span>' +
      '<span class="merkmal">Verantwortung für ' + e(r.verantwortung) + '</span>' +
      '<span class="merkmal' + (r.bei_uns === 'neu' ? ' neu' : '') + '">bei uns: ' + e(r.bei_uns) + '</span></div>' +
      '</div></div>' +
      '<div class="felder"><div>' +
      '<h2>Löst</h2>' + einheit('p', 'Löst', r.loest) +
      '<h2>Aufgaben</h2><ul>' + r.aufgaben.map(function (a, i) { return einheit('li', 'Aufgabe ' + (i + 1), a); }).join('') + '</ul>' +
      '</div><div>' +
      '<h2>Ressourcen</h2>' + einheit('p', 'Ressourcen', r.ressourcen) +
      '<h2>Du entscheidest</h2>' + einheit('p', 'Du entscheidest', r.entscheidest) +
      '<h2>Braucht</h2>' + einheit('p', 'Braucht', r.braucht) +
      '<h2>Beachten</h2>' + einheit('p', 'Beachten', r.beachten) +
      '</div></div><p class="blatt-fuss">Karte ' + e(r.nr) + ' · Entwurf</p></article>';
  }
  function allgemeinHtml() {
    return '<article class="blatt"><div class="blatt-titel"><div class="sym" aria-hidden="true">🧭</div><div>' +
      '<h1>' + ALLGEMEIN.titel + '</h1>' + einheit('p', 'Satz', ALLGEMEIN.satz, 'satz') + '</div></div>' +
      '<ul class="zeilen">' + ALLGEMEIN.zeilen.map(function (z, i) { return einheit('li', 'Zeile ' + (i + 1), z); }).join('') + '</ul></article>';
  }
  function einheit(tag, name, text, klasse) {
    return '<' + tag + ' class="einheit' + (klasse ? ' ' + klasse : '') + '" data-einheit="' + e(name) + '">' + e(text) + '</' + tag + '>';
  }

  // ---- Startseite -----------------------------------------------------------------------------
  function startseite() {
    var dlg = dialogAufbauen();
    dialogZeigen(dlg);
    $('#dsgvo-oeffnen').addEventListener('click', function () { dialogZeigen(dlg); });
    statusLaden().then(function (s) { statusSetzen($('#status'), s); });
    rollenLaden().then(function (daten) {
      $('#kacheln').innerHTML = daten.rollen.map(function (r) {
        return '<a class="kachel" href="rolle.html?nr=' + encodeURIComponent(r.nr) + '">' +
          '<span class="sym" aria-hidden="true">' + e(r.symbol) + '</span>' +
          '<span class="nr">Karte ' + e(r.nr) + '</span><strong>' + e(r.rolle) + '</strong>' +
          '<span class="satz">' + e(r.satz) + '</span></a>';
      }).join('');
    }).catch(function () {
      $('#kacheln').innerHTML = '<p class="leise">Die Rollen ließen sich nicht laden. Bitte Seite neu laden.</p>';
    });
    vorhabenLaden();
  }

  // Überblick über das Vorhaben aus vorhaben.json (Worum, Warum, Der Weg, Mitmachen)
  function vorhabenLaden() {
    fetch('vorhaben.json', { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error('vorhaben.json ' + r.status);
      return r.json();
    }).then(function (v) {
      var esc = function (z) { return e(z); };
      $('#v-titel').textContent = v.titel;
      $('#v-satz').textContent = v.satz;
      $('#v-worum').innerHTML = v.worum.map(function (z) { return '<li>' + esc(z) + '</li>'; }).join('');
      $('#v-warum').innerHTML = v.warum.map(function (z) { return '<li>' + esc(z) + '</li>'; }).join('');
      $('#v-mitmachen').innerHTML = v.mitmachen.map(function (z) { return '<li>' + esc(z) + '</li>'; }).join('');
      var jetzt = -1;
      v.stationen.forEach(function (s, i) { if (s.id === v.jetzt) jetzt = i; });
      $('#v-strecke').innerHTML = v.stationen.map(function (s, i) {
        var art = i < jetzt ? 'erledigt' : (i === jetzt ? 'jetzt' : 'kommt');
        return '<li class="halt ' + art + '"' + (art === 'jetzt' ? ' aria-current="step"' : '') + '>' +
          '<span class="knoten" aria-hidden="true">' + (art === 'erledigt' ? '✓' : '') + '</span>' +
          '<span><span class="zeit">' + esc(s.zeit) + (art === 'erledigt' ? ' · erledigt' : '') + '</span>' +
          '<strong>' + esc(s.titel) + (art === 'jetzt' ? '<span class="hier">hier sind wir</span>' : '') + '</strong>' +
          '<span class="zeile">' + esc(s.zeile) + '</span></span></li>';
      }).join('');
    }).catch(function () {
      $('#v-strecke').innerHTML = '<li class="leise">Der Überblick ließ sich nicht laden. Bitte Seite neu laden.</li>';
    });
  }

  // ---- Rollenseite ----------------------------------------------------------------------------
  function formularHtml(fragen) {
    var teile = fragen.map(function (f) {
      var id = 'f-' + f.feld;
      if (f.typ === 'wahl') {
        return '<fieldset><legend>' + e(f.frage) + '</legend><div class="wahl">' +
          f.optionen.map(function (o) {
            return '<label><input type="radio" name="' + f.feld + '" value="' + e(o) + '"><span>' + e(o) + '</span></label>';
          }).join('') + '</div></fieldset>';
      }
      return '<label class="frage" for="' + id + '">' + e(f.frage) + '</label>' +
        '<textarea id="' + id + '" name="' + f.feld + '" maxlength="' + GRENZE + '"></textarea>';
    }).join('');
    return '<form id="rueckmeldung" novalidate>' + teile +
      '<div class="falle" aria-hidden="true"><label>Bitte leer lassen <input name="webseite" tabindex="-1" autocomplete="off"></label></div>' +
      liste(DSGVO_KURZ, 'datenhinweis') +
      '<button class="senden" type="submit">Rückmeldung abschicken</button>' +
      '<p class="meldung" role="status" aria-live="polite"></p></form>';
  }

  function rollenseite() {
    document.body.classList.add('rollenseite');
    var nr = new URLSearchParams(location.search).get('nr') || '';
    var istAllgemein = nr === 'allgemein';

    rollenLaden().then(function (daten) {
      var rolle = null;
      if (!istAllgemein) {
        rolle = daten.rollen.filter(function (r) { return r.nr === nr; })[0];
        if (!rolle) {
          $('#inhalt').innerHTML = '<p>Diese Karte gibt es nicht (mehr). <a href="./">Zu allen Rollen</a></p>';
          return;
        }
      }
      var titel = istAllgemein ? ALLGEMEIN.titel : rolle.rolle;
      document.title = titel + ' · Rückmeldung';
      $('#wo').textContent = istAllgemein ? 'Allgemein' : 'Karte ' + rolle.nr;
      var fragen = istAllgemein ? FRAGEN.allgemein : (RUNDE_AK ? [AUSHANG].concat(FRAGEN.rolle) : FRAGEN.rolle);
      $('#inhalt').innerHTML =
        '<div class="seite"><div>' + (istAllgemein ? allgemeinHtml() : karteHtml(rolle)) + '</div>' +
        '<aside class="antwort" aria-label="Rückmeldung">' +
        '<button class="griff" type="button" aria-expanded="false"><span>Rückmeldung geben</span><span class="pfeil" aria-hidden="true">▲</span></button>' +
        '<h2>Rückmeldung</h2><p class="zustand" id="status-form"></p><div id="formular-ort"></div></aside></div>';

      var griff = $('.griff');
      griff.addEventListener('click', function () {
        var offen = document.body.classList.toggle('offen');
        griff.setAttribute('aria-expanded', offen ? 'true' : 'false');
      });

      statusLaden().then(function (s) {
        statusSetzen($('#status-form'), s);
        if (s.zustand !== 'offen') {
          $('#formular-ort').innerHTML = liste(DSGVO_KURZ, 'datenhinweis');
          return;
        }
        var bereich = istAllgemein ? 'allgemein' : 'rolle-' + rolle.nr;
        $('#formular-ort').innerHTML =
          '<div class="modus" role="radiogroup" aria-label="Art der Rückmeldung">' +
          '<label><input type="radio" name="modus" value="fragen" checked><span>Fragen beantworten</span></label>' +
          '<label><input type="radio" name="modus" value="pult"><span>Am Text anmerken</span></label></div>' +
          '<div id="modus-fragen">' + formularHtml(fragen) + '</div>' +
          '<div id="modus-pult" hidden>' + pultHtml(wahlFragen(fragen)) + '</div>';
        formularVerdrahten(bereich, fragen);
        pultVerdrahten(bereich, wahlFragen(fragen));
        Array.prototype.forEach.call(document.querySelectorAll('input[name="modus"]'), function (r) {
          r.addEventListener('change', function () { modusSetzen(r.value); });
        });
      });
    }).catch(function () {
      $('#inhalt').innerHTML = '<p>Die Karte ließ sich nicht laden. Bitte Seite neu laden.</p>';
    });
  }

  function formularVerdrahten(bereich, fragen) {
    var form = $('#rueckmeldung');
    var meldung = form.querySelector('.meldung');
    var knopf = form.querySelector('.senden');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      meldung.className = 'meldung';
      meldung.textContent = '';
      var felder = {}, leer = true;
      fragen.forEach(function (f) {
        var wert;
        if (f.typ === 'wahl') {
          var x = form.querySelector('input[name="' + f.feld + '"]:checked');
          wert = x ? x.value : '';
        } else {
          wert = form.elements[f.feld].value.trim().slice(0, GRENZE);
        }
        if (wert) { felder[f.feld] = wert; leer = false; }
      });
      if (leer) {
        meldung.className = 'meldung fehler';
        meldung.textContent = 'Bitte mindestens eine Frage beantworten.';
        return;
      }
      if (form.elements.webseite.value) { fertig(); return; } // Spam-Falle: still verwerfen
      knopf.disabled = true;
      meldung.textContent = 'Wird gesendet …';
      fetch(KONFIG.url + '/rest/v1/antworten', {
        method: 'POST',
        headers: kopfzeilen({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }),
        body: JSON.stringify({ umfrage_id: KONFIG.umfrage, bereich: bereich, felder: felder })
      }).then(function (r) {
        if (!r.ok) throw new Error(String(r.status));
        fertig();
      }).catch(function () {
        knopf.disabled = false;
        meldung.className = 'meldung fehler';
        meldung.textContent = 'Nicht angekommen. Ist die Rückmeldung noch offen? Bitte später erneut versuchen.';
      });
    });
    function fertig() {
      form.innerHTML = '<ul class="zeilen danke"><li><strong>Danke, angekommen.</strong></li>' +
        '<li><a href="./">Zu allen Rollen</a></li></ul>';
    }
  }

  // ---- Pult: Rückmeldung direkt am Text --------------------------------------------------------
  // Nach dem Pult-Entwurf aus die-matrixe (spiel/DESIGN/entwuerfe/pult): Tippen schreibt in Korrekturrot
  // über die Zeile, Löschen streicht (das Gestrichene bleibt lesbar), Markieren → „Anmerken“ setzt eine
  // nummerierte Anmerkung an die Stelle, „Zum ganzen Blatt“ ist eine Notiz ohne Stelle.
  var PULT = { an: false, notizen: [], nr: 0, ganz: '' };

  function wahlFragen(fragen) { return fragen.filter(function (f) { return f.typ === 'wahl'; }); }
  function pultHtml(wahl) {
    return '<ul class="zeilen pult-hilfe">' +
      '<li>Ins Blatt tippen: Dein Wort steht rot über der Zeile.</li>' +
      '<li>Löschen streicht durch, das Gestrichene bleibt lesbar.</li>' +
      '<li>Eine Stelle markieren, dann „Anmerken“: Die Anmerkung steht hier mit Nummer.</li>' +
      '<li class="leise nur-handy">Am Computer geht es bequemer.</li></ul>' +
      '<ol class="rand" id="rand"></ol>' +
      '<button type="button" class="linkknopf" id="ganz-knopf">Zum ganzen Blatt</button>' +
      '<div id="ganz-ort" hidden><label class="frage" for="ganz-text">Zum ganzen Blatt: Was fehlt, was übersehen wir?</label>' +
      '<textarea id="ganz-text" maxlength="' + GRENZE + '"></textarea></div>' +
      wahl.map(function (f) {
        return '<fieldset><legend>' + e(f.frage) + '</legend><div class="wahl">' +
          f.optionen.map(function (o) {
            return '<label><input type="radio" name="pult-' + f.feld + '" value="' + e(o) + '"><span>' + e(o) + '</span></label>';
          }).join('') + '</div></fieldset>';
      }).join('') +
      liste(DSGVO_KURZ, 'datenhinweis') +
      '<button class="senden" type="button" id="pult-senden">Anmerkungen abschicken</button>' +
      '<p class="meldung" id="pult-meldung" role="status" aria-live="polite"></p>';
  }

  function modusSetzen(modus) {
    var pult = modus === 'pult';
    $('#modus-fragen').hidden = pult;
    $('#modus-pult').hidden = !pult;
    PULT.an = pult;
    document.body.classList.toggle('pult-an', pult);
    Array.prototype.forEach.call(document.querySelectorAll('.blatt .einheit'), function (el) {
      if (pult) { el.setAttribute('contenteditable', 'true'); el.setAttribute('spellcheck', 'false'); }
      else el.removeAttribute('contenteditable');
    });
    if (!pult) griffWeg();
  }

  function imHand(node) {
    for (var n = node; n && !(n.classList && n.classList.contains('einheit')); n = n.parentNode)
      if (n.nodeType === 1 && n.matches('ins.hand')) return n;
    return null;
  }
  function einheitVon(node) {
    for (var n = node; n; n = n.parentNode) if (n.nodeType === 1 && n.classList.contains('einheit')) return n;
    return null;
  }
  function streichen(range) {
    var frag = range.extractContents();
    Array.prototype.forEach.call(frag.querySelectorAll('ins.hand'), function (i) { i.remove(); });
    Array.prototype.forEach.call(frag.querySelectorAll('del.hand'), function (d) { d.replaceWith.apply(d, d.childNodes); });
    if (!frag.textContent) return;
    var d = document.createElement('del'); d.className = 'hand'; d.append(frag);
    range.insertNode(d);
    // direkt benachbarte Streichungen zu einer zusammenfassen
    var leer = function (x) { return x && x.nodeType === 3 && !x.length; };
    while (leer(d.previousSibling)) d.previousSibling.remove();
    while (leer(d.nextSibling)) d.nextSibling.remove();
    var v = d.previousSibling, n = d.nextSibling;
    if (v && v.nodeType === 1 && v.matches('del.hand')) { while (d.firstChild) v.append(d.firstChild); d.remove(); d = v; }
    if (n && n.nodeType === 1 && n.matches('del.hand')) { while (n.firstChild) d.append(n.firstChild); n.remove(); }
    range.setStartAfter(d); range.collapse(true);
  }
  // Das Zeichen vor (rueck) oder nach dem Cursor, Gestrichenes und Nummern übersprungen
  function nachbarZeichen(range, rueck, einh) {
    if (!einh) return null;
    var w = document.createTreeWalker(einh, NodeFilter.SHOW_TEXT, { acceptNode: function (n) {
      return n.parentNode.closest('del.hand, sup.anker-nr') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; } });
    var knoten = []; while (w.nextNode()) knoten.push(w.currentNode);
    var cur = document.createRange();
    if (rueck) {
      for (var i = knoten.length - 1; i >= 0; i--) {
        var n = knoten[i];
        for (var o = n.length; o > 0; o--) { cur.setStart(n, o); cur.collapse(true); if (cur.compareBoundaryPoints(Range.START_TO_START, range) <= 0) return { node: n, off: o - 1 }; }
      }
    } else {
      for (var j = 0; j < knoten.length; j++) {
        var m = knoten[j];
        for (var p = 0; p < m.length; p++) { cur.setStart(m, p); cur.collapse(true); if (cur.compareBoundaryPoints(Range.START_TO_START, range) >= 0) return { node: m, off: p }; }
      }
    }
    return null;
  }
  function einfuegen(range, text) {
    if (imHand(range.startContainer)) {
      var tn = document.createTextNode(text); range.insertNode(tn); range.setStartAfter(tn); range.collapse(true); return;
    }
    var i = document.createElement('ins'); i.className = 'hand'; i.textContent = text;
    range.insertNode(i); range.setStart(i.firstChild, text.length); range.collapse(true);
  }

  function pultVerdrahten(bereich, wahl) {
    var blatt = document.querySelector('.blatt');
    blatt.addEventListener('beforeinput', function (ev) {
      if (!PULT.an || !einheitVon(ev.target)) return;
      var sel = getSelection(); if (!sel.rangeCount) return;
      var range = sel.getRangeAt(0);
      var art = ev.inputType;
      if (art === 'insertText' || art === 'insertFromPaste' || art === 'insertReplacementText' || art === 'insertParagraph' || art === 'insertLineBreak') {
        ev.preventDefault();
        var text = art === 'insertText' ? ev.data : (art === 'insertFromPaste' || art === 'insertReplacementText') ?
          ((ev.dataTransfer && ev.dataTransfer.getData('text/plain')) || ev.data || '') : ' ';
        if (!range.collapsed) streichen(range);
        if (text) einfuegen(range, text.replace(/\s+/g, ' '));
        sel.removeAllRanges(); sel.addRange(range);
      } else if (art.indexOf('delete') === 0) {
        ev.preventDefault();
        if (!range.collapsed) { streichen(range); }
        else {
          var rueck = art.indexOf('Backward') >= 0;
          var z = nachbarZeichen(range, rueck, einheitVon(ev.target));
          if (!z) return;
          var ins = imHand(z.node);
          if (ins) {                                    // im eigenen Wort: Zeichen wirklich löschen
            z.node.deleteData(z.off, 1);
            range.setStart(z.node, z.off); range.collapse(true);
            if (!ins.textContent) { range.setStartBefore(ins); range.collapse(true); ins.remove(); }
          } else {                                      // im Kartentext: Zeichen streichen
            var r = document.createRange(); r.setStart(z.node, z.off); r.setEnd(z.node, z.off + 1);
            streichen(r);
            var d = r.startContainer.childNodes[r.startOffset - 1];
            if (rueck && d) range.setStartBefore(d); else range.setStart(r.startContainer, r.startOffset);
            range.collapse(true);
          }
        }
        sel.removeAllRanges(); sel.addRange(range);
      } else ev.preventDefault();
    });
    blatt.addEventListener('click', function (ev) {
      var m = ev.target.closest('mark.anker'); if (!m) return;
      var feld = document.querySelector('#rand [data-id="' + m.dataset.id + '"] textarea');
      if (feld) { oeffnen(); feld.focus(); }
    });
    document.addEventListener('selectionchange', griffZeigen);
    $('#ganz-knopf').addEventListener('click', function () {
      $('#ganz-ort').hidden = false; $('#ganz-knopf').hidden = true; oeffnen(); $('#ganz-text').focus();
    });
    $('#pult-senden').addEventListener('click', function () { pultSenden(bereich, wahl); });
  }

  function oeffnen() {
    if (!document.body.classList.contains('offen')) {
      document.body.classList.add('offen');
      var g = document.querySelector('.griff'); if (g) g.setAttribute('aria-expanded', 'true');
    }
  }

  var griffEl = null;
  function griffWeg() { if (griffEl) { griffEl.remove(); griffEl = null; } }
  function griffZeigen() {
    if (!PULT.an) return;
    var sel = getSelection();
    if (!sel.rangeCount || sel.isCollapsed || !einheitVon(sel.anchorNode) || einheitVon(sel.anchorNode) !== einheitVon(sel.focusNode)) { griffWeg(); return; }
    var r = sel.getRangeAt(0).getBoundingClientRect(); if (!r.width) return;
    if (!griffEl) {
      griffEl = document.createElement('div'); griffEl.className = 'markier';
      griffEl.innerHTML = '<button type="button" data-tu="anmerken">Anmerken</button><button type="button" data-tu="streichen">Streichen</button>';
      document.body.append(griffEl);
      griffEl.addEventListener('mousedown', function (ev) { ev.preventDefault(); });
      griffEl.addEventListener('click', griffKlick);
    }
    griffEl.style.left = Math.max(8, r.left + window.scrollX + r.width / 2 - 90) + 'px';
    griffEl.style.top = Math.max(8, r.top + window.scrollY - 52) + 'px';
  }
  function griffKlick(ev) {
    var b = ev.target.closest('button'); if (!b) return;
    var sel = getSelection(); if (!sel.rangeCount) return;
    var range = sel.getRangeAt(0);
    if (b.dataset.tu === 'streichen') { streichen(range); sel.removeAllRanges(); griffWeg(); return; }
    var nr = ++PULT.nr, id = 'a' + nr;
    var m = document.createElement('mark'); m.className = 'anker'; m.dataset.id = id;
    try { range.surroundContents(m); } catch (err) { var frag = range.extractContents(); m.append(frag); range.insertNode(m); }
    var s = document.createElement('sup'); s.className = 'anker-nr'; s.textContent = nr; s.setAttribute('contenteditable', 'false');
    m.after(s);
    var einh = einheitVon(m);
    PULT.notizen.push({ id: id, nr: nr, wo: einh ? einh.dataset.einheit : 'Blatt', zitat: m.textContent, text: '' });
    sel.removeAllRanges(); griffWeg(); randZeichnen(); oeffnen();
    var feld = document.querySelector('#rand [data-id="' + id + '"] textarea'); if (feld) feld.focus();
  }

  function randZeichnen() {
    var rand = $('#rand');
    rand.innerHTML = PULT.notizen.map(function (n) {
      return '<li class="notiz" data-id="' + n.id + '"><span class="notiz-nr">' + n.nr + '</span><div>' +
        '<p class="notiz-wo">' + e(n.wo) + ': „' + e(n.zitat) + '“</p>' +
        '<textarea maxlength="' + GRENZE + '" placeholder="Was soll anders sein, und warum?">' + e(n.text) + '</textarea>' +
        '<button type="button" class="linkknopf klein" data-weg="' + n.id + '">Anmerkung entfernen</button></div></li>';
    }).join('');
    Array.prototype.forEach.call(rand.querySelectorAll('textarea'), function (ta) {
      ta.addEventListener('input', function () {
        var n = PULT.notizen.filter(function (x) { return x.id === ta.closest('.notiz').dataset.id; })[0]; if (n) n.text = ta.value;
      });
    });
    Array.prototype.forEach.call(rand.querySelectorAll('[data-weg]'), function (b) {
      b.addEventListener('click', function () {
        var id = b.dataset.weg;
        PULT.notizen = PULT.notizen.filter(function (x) { return x.id !== id; });
        var m = document.querySelector('mark.anker[data-id="' + id + '"]');
        if (m) { var s = m.nextSibling; if (s && s.classList && s.classList.contains('anker-nr')) s.remove(); m.replaceWith.apply(m, m.childNodes); }
        randZeichnen();
      });
    });
    Array.prototype.forEach.call(rand.querySelectorAll('.notiz'), function (li) {
      var m = document.querySelector('mark.anker[data-id="' + li.dataset.id + '"]');
      li.addEventListener('mouseenter', function () { if (m) m.classList.add('aktiv'); });
      li.addEventListener('mouseleave', function () { if (m) m.classList.remove('aktiv'); });
    });
  }

  // Text einer Einheit mit Eingefügtem als [+ …] und Gestrichenem als [− …]
  function handText(el) {
    var s = '';
    Array.prototype.forEach.call(el.childNodes, function (n) {
      if (n.nodeType === 3) s += n.textContent;
      else if (n.matches('ins.hand')) s += '[+ ' + n.textContent + ']';
      else if (n.matches('del.hand')) s += '[− ' + n.textContent + ']';
      else if (n.matches('sup.anker-nr')) return;
      else s += handText(n);
    });
    return s;
  }

  function pultSenden(bereich, wahl) {
    var meldung = $('#pult-meldung'), knopf = $('#pult-senden');
    meldung.className = 'meldung'; meldung.textContent = '';
    var hand = [];
    Array.prototype.forEach.call(document.querySelectorAll('.blatt .einheit'), function (el) {
      if (el.querySelector('ins.hand, del.hand')) hand.push(el.dataset.einheit + ': ' + handText(el));
    });
    var anm = PULT.notizen.filter(function (n) { return n.text.trim(); }).map(function (n) {
      return n.nr + '. ' + n.wo + ', „' + n.zitat + '“: ' + n.text.trim();
    });
    var felder = { modus: 'pult' };
    if (hand.length) felder.hand = hand.join('\n').slice(0, GRENZE);
    if (anm.length) felder.anmerkungen = anm.join('\n').slice(0, GRENZE);
    var ganz = $('#ganz-text').value.trim(); if (ganz) felder.ganzes = ganz.slice(0, GRENZE);
    wahl.forEach(function (f) { var x = document.querySelector('input[name="pult-' + f.feld + '"]:checked'); if (x) felder[f.feld] = x.value; });
    if (Object.keys(felder).length === 1) {
      meldung.className = 'meldung fehler';
      meldung.textContent = 'Noch nichts angemerkt. Tippe, streiche oder markiere eine Stelle im Blatt.';
      return;
    }
    knopf.disabled = true; meldung.textContent = 'Wird gesendet …';
    fetch(KONFIG.url + '/rest/v1/antworten', {
      method: 'POST',
      headers: kopfzeilen({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }),
      body: JSON.stringify({ umfrage_id: KONFIG.umfrage, bereich: bereich, felder: felder })
    }).then(function (r) {
      if (!r.ok) throw new Error(String(r.status));
      modusSetzen('fragen');
      $('#formular-ort').innerHTML = '<ul class="zeilen danke"><li><strong>Danke, angekommen.</strong></li><li><a href="./">Zu allen Rollen</a></li></ul>';
    }).catch(function () {
      knopf.disabled = false; meldung.className = 'meldung fehler';
      meldung.textContent = 'Nicht angekommen. Ist die Rückmeldung noch offen? Bitte später erneut versuchen.';
    });
  }

  // ---- Start ----------------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    if (RUNDE_AK) {
      document.body.classList.add('runde-ak');
      var h = document.createElement('p'); h.className = 'runde-hinweis';
      h.innerHTML = '<strong>Runde des Arbeitskreises.</strong> Eure Rückmeldung entscheidet, welche Rollen in den Aushang fürs Kollegium kommen.';
      var rumpf = document.querySelector('.rumpf'); if (rumpf) rumpf.insertBefore(h, rumpf.firstChild);
      document.addEventListener('click', function (ev) {
        var a = ev.target.closest('a'); if (!a) return;
        var ziel = a.getAttribute('href') || '';
        if (/^(\.\/|rolle\.html)/.test(ziel) && ziel.indexOf('runde=ak') < 0)
          a.setAttribute('href', ziel + (ziel.indexOf('?') >= 0 ? '&' : '?') + 'runde=ak');
      }, true);
    }
    if (document.body.dataset.seite === 'start') startseite();
    else rollenseite();
  });
})();
