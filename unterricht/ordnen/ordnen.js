/* Anordnen — geteiltes Werkzeug fuer Anordnungsaufgaben.
 *
 * Eine Aufgabe = ein Ordner mit index.html (laedt diese Datei) + data.json.
 * Die Mechanik kennt keinen Inhalt: sie mischt, laesst ordnen (Finger oder Pfeile),
 * zaehlt auf Wunsch die richtig stehenden Karten und blendet Reflexionsfragen ein.
 *
 * data.json (die Karten stehen in der RICHTIGEN Reihenfolge):
 * {
 *   "titel": "...", "leitfrage": "...", "auftrag": "...",
 *   "pruefen": true,                      // Zaehl-Rueckmeldung anbieten (nie: welche)
 *   "karten": [ { "id", "bild", "alt", "titel", "satz", "fix": "start"|"ende"|null } ],
 *   "fragen": [ { "text", "fuer_schnelle": false } ],
 *   "nachweise": [ "..." ]
 * }
 */
(function () {
  'use strict';

  var daten = null;
  var liste = null;
  var geloest = false;

  function el(tag, klasse, text) {
    var n = document.createElement(tag);
    if (klasse) n.className = klasse;
    if (text != null) n.textContent = text;
    return n;
  }

  function mischen(feld) {
    for (var i = feld.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = feld[i]; feld[i] = feld[j]; feld[j] = t;
    }
    return feld;
  }

  /* Startanordnung: feste Karten bleiben auf ihrem Platz, der Rest wird gemischt.
     Es wird so lange gemischt, bis hoechstens eine bewegliche Karte zufaellig
     schon richtig steht — sonst faengt die Gruppe halb geloest an. */
  function startAnordnung(karten) {
    var beweglich = [], plaetze = [];
    karten.forEach(function (k, i) { if (!k.fix) { beweglich.push(k); plaetze.push(i); } });
    var anordnung, treffer, versuche = 0;
    do {
      anordnung = karten.slice();
      var gemischt = mischen(beweglich.slice());
      plaetze.forEach(function (p, i) { anordnung[p] = gemischt[i]; });
      treffer = 0;
      plaetze.forEach(function (p) { if (anordnung[p] === karten[p]) treffer++; });
      versuche++;
    } while (treffer > 1 && versuche < 60);
    return anordnung;
  }

  function karteBauen(k) {
    var li = el('li', 'o-karte' + (k.fix ? ' o-fix' : ''));
    li.dataset.id = k.id;
    if (k.fix) li.dataset.fix = k.fix;

    li.appendChild(el('span', 'o-nr'));

    var bild = el('img', 'o-bild');
    bild.src = k.bild;
    bild.alt = k.alt || '';
    bild.loading = 'lazy';
    // Hochformate brauchen einen anderen Ausschnitt, Dokumente duerfen gar nicht
    // beschnitten werden ("passung": "ganz").
    if (k.bild_ausschnitt) bild.style.objectPosition = k.bild_ausschnitt;
    if (k.bild_passung === 'ganz') bild.classList.add('o-bild-ganz');
    li.appendChild(bild);

    var text = el('div', 'o-text');
    text.appendChild(el('p', 'o-titel', k.titel));
    text.appendChild(el('p', 'o-satz', k.satz));
    li.appendChild(text);

    var griff = el('div', 'o-griff');
    if (!k.fix) {
      ['hoch', 'runter'].forEach(function (richtung) {
        var b = el('button', 'o-pfeil', richtung === 'hoch' ? '▲' : '▼');
        b.type = 'button';
        b.dataset.richtung = richtung;
        b.setAttribute('aria-label', richtung === 'hoch' ? 'nach oben' : 'nach unten');
        griff.appendChild(b);
      });
    }
    li.appendChild(griff);
    return li;
  }

  function beweglicheKarten() {
    return Array.prototype.filter.call(liste.children, function (n) { return !n.dataset.fix; });
  }

  function nummerieren() {
    Array.prototype.forEach.call(liste.children, function (n, i) {
      n.querySelector('.o-nr').textContent = String(i + 1);
    });
  }

  /* Tauscht eine Karte mit der naechsten beweglichen Nachbarin (Pfeiltasten). */
  function verschieben(li, richtung) {
    var nachbar = richtung === 'hoch' ? li.previousElementSibling : li.nextElementSibling;
    if (!nachbar || nachbar.dataset.fix) return;
    if (richtung === 'hoch') liste.insertBefore(li, nachbar);
    else liste.insertBefore(nachbar, li);
    nachDerAenderung();
  }

  function nachDerAenderung() {
    nummerieren();
    var stand = document.getElementById('o-stand');
    if (stand) stand.textContent = '';
    Array.prototype.forEach.call(liste.querySelectorAll('.o-pfeil'), function (b) {
      var li = b.closest('.o-karte');
      var nachbar = b.dataset.richtung === 'hoch' ? li.previousElementSibling : li.nextElementSibling;
      b.disabled = !nachbar || !!nachbar.dataset.fix;
    });
  }

  /* ── Ziehen mit dem Finger (Pointer Events; HTML5-Drag kann das iPad nicht) ── */
  function ziehenAktivieren() {
    var aktiv = null, griffY = 0, versatz = 0, scrollTakt = null;

    function mitte(n) { var r = n.getBoundingClientRect(); return r.top + r.height / 2; }

    function start(ev) {
      if (ev.target.closest('.o-pfeil')) return;
      var li = ev.target.closest('.o-karte');
      if (!li || li.dataset.fix || !liste.contains(li)) return;
      aktiv = li;
      griffY = ev.clientY;
      versatz = 0;
      li.classList.add('o-greift');
      li.setPointerCapture(ev.pointerId);
      ev.preventDefault();
    }

    function bewegen(ev) {
      if (!aktiv) return;
      ev.preventDefault();
      versatz = ev.clientY - griffY;
      aktiv.style.transform = 'translateY(' + versatz + 'px)';

      var zeiger = ev.clientY;
      var nachbarn = Array.prototype.filter.call(liste.children, function (n) { return n !== aktiv; });
      for (var i = 0; i < nachbarn.length; i++) {
        var n = nachbarn[i];
        if (n.dataset.fix) continue;
        var m = mitte(n);
        var davor = n.compareDocumentPosition(aktiv) & Node.DOCUMENT_POSITION_FOLLOWING;
        if ((davor && zeiger < m) || (!davor && zeiger > m)) {
          var vorher = aktiv.getBoundingClientRect().top;
          if (davor) liste.insertBefore(aktiv, n);
          else liste.insertBefore(aktiv, n.nextSibling);
          // Sprung ausgleichen, damit die Karte unter dem Finger bleibt
          griffY += aktiv.getBoundingClientRect().top - vorher + versatz;
          versatz = ev.clientY - griffY;
          aktiv.style.transform = 'translateY(' + versatz + 'px)';
          nummerieren();
          break;
        }
      }
      randScrollen(ev.clientY);
    }

    function randScrollen(y) {
      var oben = y < 90, unten = y > window.innerHeight - 110;
      if (!oben && !unten) { clearInterval(scrollTakt); scrollTakt = null; return; }
      if (scrollTakt) return;
      scrollTakt = setInterval(function () {
        window.scrollBy(0, oben ? -12 : 12);
      }, 16);
    }

    function ende() {
      if (!aktiv) return;
      clearInterval(scrollTakt); scrollTakt = null;
      aktiv.style.transform = '';
      aktiv.classList.remove('o-greift');
      aktiv = null;
      nachDerAenderung();
    }

    liste.addEventListener('pointerdown', start);
    liste.addEventListener('pointermove', bewegen);
    liste.addEventListener('pointerup', ende);
    liste.addEventListener('pointercancel', ende);
  }

  /* ── Pruefen: nur die Anzahl, nie welche ── */
  function pruefen() {
    nummerieren();
    var richtig = 0, beweglich = 0;
    var soll = daten.karten.map(function (k) { return k.id; });
    Array.prototype.forEach.call(liste.children, function (n, i) {
      if (n.dataset.fix) return;
      beweglich++;
      if (soll[i] === n.dataset.id) richtig++;
    });
    var stand = document.getElementById('o-stand');
    if (richtig === beweglich) {
      stand.innerHTML = '<strong>Alle ' + beweglich + ' stehen richtig.</strong> Weiter zu den Fragen.';
      geloest = true;
      fragenZeigen();
    } else {
      stand.innerHTML = '<strong>' + richtig + ' von ' + beweglich + '</strong> stehen richtig. '
        + '(Welche, verrate ich nicht – redet darüber.)';
    }
  }

  function fragenZeigen() {
    var block = document.getElementById('o-fragen');
    if (!block || block.dataset.offen) return;
    block.dataset.offen = '1';
    block.hidden = false;
    block.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ── Aufbau ── */
  function aufbauen(d) {
    daten = d;
    document.title = d.titel;
    document.getElementById('o-leitfrage').textContent = d.leitfrage;
    document.getElementById('o-auftrag').textContent = d.auftrag;

    liste = document.getElementById('o-liste');
    startAnordnung(d.karten).forEach(function (k) { liste.appendChild(karteBauen(k)); });
    nachDerAenderung();
    ziehenAktivieren();

    liste.addEventListener('click', function (ev) {
      var b = ev.target.closest('.o-pfeil');
      if (b) verschieben(b.closest('.o-karte'), b.dataset.richtung);
    });

    var fragen = document.getElementById('o-fragen');
    (d.fragen || []).forEach(function (f, i) {
      var box = el('div', 'o-frage' + (f.fuer_schnelle ? ' o-fuer-schnelle' : ''));
      if (f.fuer_schnelle) box.appendChild(el('span', 'o-fahne', 'Für Schnelle'));
      box.appendChild(el('p', null, f.text));
      var ta = el('textarea');
      ta.id = 'o-antwort-' + i;
      ta.setAttribute('aria-label', f.text);
      box.appendChild(ta);
      fragen.appendChild(box);
    });

    var nachweis = document.getElementById('o-nachweis');
    (d.nachweise || []).forEach(function (z) { nachweis.appendChild(el('p', null, z)); });

    var knopfPruefen = document.getElementById('o-pruefen');
    if (d.pruefen === false) knopfPruefen.hidden = true;
    else knopfPruefen.addEventListener('click', pruefen);

    document.getElementById('o-zu-fragen').addEventListener('click', fragenZeigen);
  }

  document.addEventListener('DOMContentLoaded', function () {
    fetch('data.json', { cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(aufbauen)
      .catch(function (e) {
        document.getElementById('o-liste').innerHTML =
          '<li class="o-karte"><div class="o-text"><p class="o-titel">Die Aufgabe konnte nicht geladen werden.</p>'
          + '<p class="o-satz">Seite neu laden. Bleibt es dabei: bei der Lehrkraft melden.</p></div></li>';
        console.error(e);
      });
  });
})();
