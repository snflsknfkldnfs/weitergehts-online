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
      '<h1>' + e(r.rolle) + '</h1><p class="satz">' + e(r.satz) + '</p>' +
      '<div class="merkmale"><span class="merkmal">Jgst. ' + e(r.jgst) + '</span>' +
      '<span class="merkmal">Verantwortung für ' + e(r.verantwortung) + '</span>' +
      '<span class="merkmal' + (r.bei_uns === 'neu' ? ' neu' : '') + '">bei uns: ' + e(r.bei_uns) + '</span></div>' +
      '</div></div>' +
      '<div class="felder"><div>' +
      '<h2>Löst</h2><p>' + e(r.loest) + '</p>' +
      '<h2>Aufgaben</h2><ul>' + r.aufgaben.map(function (a) { return '<li>' + e(a) + '</li>'; }).join('') + '</ul>' +
      '</div><div>' +
      '<h2>Ressourcen</h2><p>' + e(r.ressourcen) + '</p>' +
      '<h2>Du entscheidest</h2><p>' + e(r.entscheidest) + '</p>' +
      '<h2>Braucht</h2><p>' + e(r.braucht) + '</p>' +
      '<h2>Beachten</h2><p>' + e(r.beachten) + '</p>' +
      '</div></div><p class="blatt-fuss">Karte ' + e(r.nr) + ' · Entwurf</p></article>';
  }
  function allgemeinHtml() {
    return '<article class="blatt"><div class="blatt-titel"><div class="sym" aria-hidden="true">🧭</div><div>' +
      '<h1>' + ALLGEMEIN.titel + '</h1><p class="satz">' + ALLGEMEIN.satz + '</p></div></div>' +
      liste(ALLGEMEIN.zeilen, 'zeilen') + '</article>';
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
            return '<label><input type="radio" name="' + f.feld + '" value="' + o + '"><span>' + o + '</span></label>';
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
      var fragen = istAllgemein ? FRAGEN.allgemein : FRAGEN.rolle;
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
        $('#formular-ort').innerHTML = formularHtml(fragen);
        formularVerdrahten(istAllgemein ? 'allgemein' : 'rolle-' + rolle.nr, fragen);
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

  // ---- Start ----------------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    if (document.body.dataset.seite === 'start') startseite();
    else rollenseite();
  });
})();
