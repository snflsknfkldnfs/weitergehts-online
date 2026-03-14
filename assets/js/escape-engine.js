/**
 * escape-engine.js – Escape-Game-Engine
 *
 * Spezifische Spielmechanik fuer Escape-Games.
 * Nutzt Core (core.js) fuer Storage und Feedback.
 *
 * API (8 Funktionen):
 *   EscapeEngine.init(mappeId)
 *   EscapeEngine.checkCode(mappeId, eingabe)
 *   EscapeEngine.saveProgress(mappeId, aufgabeIndex, solved)
 *   EscapeEngine.loadProgress(mappeId)
 *   EscapeEngine.showTipp(mappeId, aufgabeIndex, stufe)
 *   EscapeEngine.resetProgress()
 *   EscapeEngine.unlockMappe(mappeId)
 *   EscapeEngine.setStorageKey(key, data)
 *
 * 5 Aufgabentyp-Renderer:
 *   multiple-choice, zuordnung, lueckentext, reihenfolge, freitext-code
 *
 * Abhaengigkeit: core.js muss VOR dieser Datei geladen sein.
 * Keine externen Abhaengigkeiten. Vanilla JS.
 */

/* global Core, document, window, fetch */

'use strict';

var EscapeEngine = (function () {

  // ========================================================================
  // Interner State
  // ========================================================================

  var _state = {
    data: null,           // Geladene data.json
    mappeId: null,        // Aktuelle Mappe-ID
    storageKey: null,     // localStorage-Schluessel (escape-[thema])
    container: null       // DOM-Container fuer Aufgaben
  };

  // ========================================================================
  // 1. init(mappeId) → void
  // ========================================================================

  /**
   * Initialisiert die Engine fuer eine bestimmte Mappe.
   * Laedt data.json, stellt Fortschritt wieder her, rendert Aufgaben.
   *
   * @param {string} mappeId – z.B. "mappe-1"
   */
  function init(mappeId) {
    _state.mappeId = mappeId;
    _state.container = document.getElementById('aufgaben-container');

    // data.json laden
    _loadData()
      .then(function (data) {
        _state.data = data;

        // Storage-Key aus Thema ableiten
        var thema = (data.meta && data.meta.titel) ? data.meta.titel.toLowerCase().replace(/\s+/g, '-') : 'unbenannt';
        _state.storageKey = 'escape-' + thema;

        // Mappe finden
        var mappe = _getMappe(mappeId);
        if (!mappe) {
          console.error('[EscapeEngine.init] Mappe nicht gefunden: ' + mappeId);
          _renderFehler('Mappe "' + mappeId + '" konnte nicht gefunden werden.');
          return;
        }

        // Seiten-Titel setzen
        _updateSeitenTitel(mappe);

        // Fortschritt laden und Aufgaben rendern
        var progress = loadProgress(mappeId);
        _renderMappe(mappe, progress);

        // Code-Eingabe initialisieren
        _initCodeEingabe(mappeId);

        // Fortschrittsbalken aktualisieren
        _updateFortschritt(mappe, progress);

        console.info('[EscapeEngine] Initialisiert: ' + mappeId);
      })
      .catch(function (err) {
        console.error('[EscapeEngine.init] Fehler:', err);
        _renderFehler('Keine data.json gefunden. Dieses Template muss erst durch den AGENT_RAETSEL mit Inhalten befüllt werden.');
      });
  }

  // ========================================================================
  // 2. checkCode(mappeId, eingabe) → { correct, message }
  // ========================================================================

  /**
   * Prueft den eingegebenen Freischalt-Code gegen data.json.
   *
   * @param {string} mappeId – z.B. "mappe-1"
   * @param {string} eingabe – Benutzereingabe
   * @returns {{ correct: boolean, message: string }}
   */
  function checkCode(mappeId, eingabe) {
    var mappe = _getMappe(mappeId);
    if (!mappe) {
      return { correct: false, message: 'Mappe nicht gefunden.' };
    }

    var expected = (mappe.freischalt_code || '').toUpperCase().trim();
    var input = (eingabe || '').toUpperCase().trim();

    if (input === expected) {
      // Mappe als abgeschlossen markieren
      _setMappeAbgeschlossen(mappeId, true);
      return {
        correct: true,
        message: 'Richtig! Die Mappe wurde freigeschaltet. 🎉'
      };
    }

    return {
      correct: false,
      message: 'Der Code ist leider falsch. Versuche es noch einmal. 🔒'
    };
  }

  // ========================================================================
  // 3. saveProgress(mappeId, aufgabeIndex, solved) → void
  // ========================================================================

  /**
   * Speichert den Fortschritt einer Aufgabe in localStorage.
   *
   * @param {string} mappeId – z.B. "mappe-1"
   * @param {number} aufgabeIndex – 0-basierter Index
   * @param {boolean} solved – Ob die Aufgabe geloest wurde
   */
  function saveProgress(mappeId, aufgabeIndex, solved) {
    var allProgress = _getAllProgress();
    var mappenProgress = allProgress.mappen || {};

    if (!mappenProgress[mappeId]) {
      mappenProgress[mappeId] = { abgeschlossen: false, aufgaben: {} };
    }

    var mappe = _getMappe(mappeId);
    if (mappe && mappe.aufgaben && mappe.aufgaben[aufgabeIndex]) {
      var aufgabeId = mappe.aufgaben[aufgabeIndex].id;
      if (!mappenProgress[mappeId].aufgaben[aufgabeId]) {
        mappenProgress[mappeId].aufgaben[aufgabeId] = { geloest: false, tipps_genutzt: 0 };
      }
      mappenProgress[mappeId].aufgaben[aufgabeId].geloest = solved;
    }

    allProgress.mappen = mappenProgress;
    allProgress.letzteAktivitaet = new Date().toISOString();

    // FIX-09: Storage-Fehler-Feedback
    var success = Core.storage.set(_state.storageKey, allProgress);
    if (!success) {
      _renderFehler('Fortschritt konnte nicht gespeichert werden. Möglicherweise ist der Speicher voll oder blockiert.');
    }
  }

  // ========================================================================
  // 4. loadProgress(mappeId) → { aufgaben: boolean[], abgeschlossen }
  // ========================================================================

  /**
   * Laedt den gespeicherten Fortschritt einer Mappe.
   *
   * @param {string} mappeId – z.B. "mappe-1"
   * @returns {{ aufgaben: boolean[], abgeschlossen: boolean }}
   */
  function loadProgress(mappeId) {
    var allProgress = _getAllProgress();
    var mappenProgress = (allProgress.mappen && allProgress.mappen[mappeId]) || null;

    var mappe = _getMappe(mappeId);
    var aufgabenCount = (mappe && mappe.aufgaben) ? mappe.aufgaben.length : 0;

    // Aufgaben-Status als boolean-Array aufbauen
    var aufgabenStatus = [];
    for (var i = 0; i < aufgabenCount; i++) {
      var aufgabeId = mappe.aufgaben[i].id;
      var geloest = false;
      if (mappenProgress && mappenProgress.aufgaben && mappenProgress.aufgaben[aufgabeId]) {
        geloest = mappenProgress.aufgaben[aufgabeId].geloest || false;
      }
      aufgabenStatus.push(geloest);
    }

    return {
      aufgaben: aufgabenStatus,
      abgeschlossen: mappenProgress ? (mappenProgress.abgeschlossen || false) : false
    };
  }

  // ========================================================================
  // 5. showTipp(mappeId, aufgabeIndex, stufe) → string
  // ========================================================================

  /**
   * Gibt den Tipp-Text fuer eine bestimmte Stufe zurueck.
   *
   * @param {string} mappeId – z.B. "mappe-1"
   * @param {number} aufgabeIndex – 0-basierter Index
   * @param {1|2|3} stufe – Tipp-Stufe
   * @returns {string} Tipp-Text oder Fehlermeldung
   */
  function showTipp(mappeId, aufgabeIndex, stufe) {
    var mappe = _getMappe(mappeId);
    if (!mappe || !mappe.aufgaben || !mappe.aufgaben[aufgabeIndex]) {
      return 'Aufgabe nicht gefunden.';
    }

    var aufgabe = mappe.aufgaben[aufgabeIndex];
    var tipps = aufgabe.tipps || [];

    // Tipp-Objekt mit passender Stufe finden
    for (var i = 0; i < tipps.length; i++) {
      if (tipps[i].stufe === stufe) {
        // Tipp-Nutzung in Fortschritt speichern
        _saveTippUsage(mappeId, aufgabeIndex, stufe);
        return tipps[i].text || 'Kein Tipp-Text vorhanden.';
      }
    }

    return 'Tipp für Stufe ' + stufe + ' nicht vorhanden.';
  }

  // ========================================================================
  // 6. resetProgress() → void
  // ========================================================================

  /**
   * Loescht allen gespeicherten Fortschritt fuer dieses Escape-Game.
   */
  function resetProgress() {
    if (_state.storageKey) {
      Core.storage.remove(_state.storageKey);
      console.info('[EscapeEngine] Fortschritt zurückgesetzt.');
    }
  }

  // ========================================================================
  // 7. unlockMappe(mappeId) → void
  // ========================================================================

  /**
   * Schaltet eine Mappe frei (fuer Lehrkraft-Zugang).
   * Ueberspringt die Code-Pruefung.
   *
   * @param {string} mappeId – z.B. "mappe-1"
   */
  function unlockMappe(mappeId) {
    // FIX-18: Direkter Merge statt loadProgress-Roundtrip
    var allProgress = _getAllProgress();
    if (!allProgress.mappen) allProgress.mappen = {};
    if (!allProgress.mappen[mappeId]) {
      allProgress.mappen[mappeId] = { abgeschlossen: false, aufgaben: {} };
    }
    allProgress.mappen[mappeId].abgeschlossen = true;
    allProgress.letzteAktivitaet = new Date().toISOString();

    // FIX-09: Storage-Fehler-Feedback
    var success = Core.storage.set(_state.storageKey, allProgress);
    if (!success) {
      console.warn('[EscapeEngine] Konnte Mappe nicht freischalten – Speicherfehler.');
    }
    console.info('[EscapeEngine] Mappe freigeschaltet: ' + mappeId);
  }

  // ========================================================================
  // 8. setStorageKey(key, data) → void  [FIX-03]
  // ========================================================================

  /**
   * Setzt den Storage-Key und die Spieldaten direkt,
   * ohne data.json zu laden oder Aufgaben zu rendern.
   * Wird von lehrkraft.html verwendet.
   *
   * @param {string} key – Storage-Key, z.B. "escape-mein-thema"
   * @param {Object} data – Geladene data.json-Daten
   */
  function setStorageKey(key, data) {
    _state.storageKey = key;
    _state.data = data;
  }

  // ========================================================================
  // Interne Hilfsfunktionen
  // ========================================================================

  /**
   * Laedt data.json relativ zur aktuellen HTML-Datei.
   * @returns {Promise<Object>}
   * @private
   */
  function _loadData() {
    // data.json liegt im selben Verzeichnis wie die HTML-Datei
    return fetch('data.json')
      .then(function (response) {
        if (!response.ok) {
          throw new Error('HTTP ' + response.status + ': ' + response.statusText);
        }
        return response.json();
      });
  }

  /**
   * Findet eine Mappe nach ID in den geladenen Daten.
   * @param {string} mappeId
   * @returns {Object|null}
   * @private
   */
  function _getMappe(mappeId) {
    if (!_state.data || !_state.data.mappen) return null;
    for (var i = 0; i < _state.data.mappen.length; i++) {
      if (_state.data.mappen[i].id === mappeId) {
        return _state.data.mappen[i];
      }
    }
    return null;
  }

  /**
   * Laedt den gesamten Fortschritt aus localStorage.
   * @returns {Object}
   * @private
   */
  function _getAllProgress() {
    if (!_state.storageKey) return { mappen: {}, letzteAktivitaet: null };
    return Core.storage.get(_state.storageKey) || { mappen: {}, letzteAktivitaet: null };
  }

  /**
   * Markiert eine Mappe als abgeschlossen/offen.
   * @param {string} mappeId
   * @param {boolean} abgeschlossen
   * @private
   */
  function _setMappeAbgeschlossen(mappeId, abgeschlossen) {
    var allProgress = _getAllProgress();
    if (!allProgress.mappen) allProgress.mappen = {};
    if (!allProgress.mappen[mappeId]) {
      allProgress.mappen[mappeId] = { abgeschlossen: false, aufgaben: {} };
    }
    allProgress.mappen[mappeId].abgeschlossen = abgeschlossen;
    allProgress.letzteAktivitaet = new Date().toISOString();
    Core.storage.set(_state.storageKey, allProgress);
  }

  /**
   * Speichert Tipp-Nutzung im Fortschritt.
   * @param {string} mappeId
   * @param {number} aufgabeIndex
   * @param {number} stufe
   * @private
   */
  function _saveTippUsage(mappeId, aufgabeIndex, stufe) {
    var allProgress = _getAllProgress();
    if (!allProgress.mappen) allProgress.mappen = {};
    if (!allProgress.mappen[mappeId]) {
      allProgress.mappen[mappeId] = { abgeschlossen: false, aufgaben: {} };
    }

    var mappe = _getMappe(mappeId);
    if (mappe && mappe.aufgaben && mappe.aufgaben[aufgabeIndex]) {
      var aufgabeId = mappe.aufgaben[aufgabeIndex].id;
      if (!allProgress.mappen[mappeId].aufgaben[aufgabeId]) {
        allProgress.mappen[mappeId].aufgaben[aufgabeId] = { geloest: false, tipps_genutzt: 0 };
      }
      if (stufe > allProgress.mappen[mappeId].aufgaben[aufgabeId].tipps_genutzt) {
        allProgress.mappen[mappeId].aufgaben[aufgabeId].tipps_genutzt = stufe;
      }
    }

    allProgress.letzteAktivitaet = new Date().toISOString();
    Core.storage.set(_state.storageKey, allProgress);
  }

  /**
   * Aktualisiert den Seiten-Titel.
   * @param {Object} mappe
   * @private
   */
  function _updateSeitenTitel(mappe) {
    var titelEl = document.querySelector('.mappe__titel');
    if (titelEl && mappe.titel) {
      titelEl.textContent = mappe.titel;
    }

    var beschreibungEl = document.querySelector('.mappe__beschreibung');
    if (beschreibungEl && mappe.beschreibung) {
      beschreibungEl.textContent = mappe.beschreibung;
    }

    if (mappe.titel) {
      document.title = mappe.titel + ' – Escape-Game';
    }
  }

  /**
   * Rendert eine Fehler-Nachricht im Container.
   * @param {string} message
   * @private
   */
  function _renderFehler(message) {
    var container = _state.container || document.querySelector('main');
    if (!container) return;

    var el = document.createElement('div');
    el.className = 'aufgabe__feedback aufgabe__feedback--visible aufgabe__feedback--error';
    el.setAttribute('role', 'alert');
    el.textContent = message;
    container.appendChild(el);
  }

  // ========================================================================
  // Mappe-Rendering
  // ========================================================================

  /**
   * Rendert alle Aufgaben einer Mappe.
   * @param {Object} mappe – Mappe-Daten aus data.json
   * @param {Object} progress – Geladener Fortschritt
   * @private
   */
  function _renderMappe(mappe, progress) {
    var container = _state.container;
    if (!container) {
      console.error('[EscapeEngine] Container #aufgaben-container nicht gefunden.');
      return;
    }

    // Container leeren
    container.innerHTML = '';

    var aufgaben = mappe.aufgaben || [];
    var total = aufgaben.length;
    for (var i = 0; i < aufgaben.length; i++) {
      var aufgabe = aufgaben[i];
      var geloest = progress.aufgaben[i] || false;
      // FIX-02: Gesamtzahl der Aufgaben uebergeben
      var aufgabeEl = _renderAufgabe(aufgabe, i, geloest, total);
      container.appendChild(aufgabeEl);
    }
  }

  /**
   * Rendert eine einzelne Aufgabe basierend auf ihrem Typ.
   * @param {Object} aufgabe – Aufgaben-Daten
   * @param {number} index – 0-basierter Index
   * @param {boolean} geloest – Ob bereits geloest
   * @param {number} total – Gesamtzahl der Aufgaben in dieser Mappe
   * @returns {HTMLElement}
   * @private
   */
  function _renderAufgabe(aufgabe, index, geloest, total) {
    var section = document.createElement('section');
    section.className = 'aufgabe aufgabe--' + aufgabe.typ;
    section.id = aufgabe.id;
    section.setAttribute('aria-label', 'Aufgabe ' + (index + 1));

    if (geloest) {
      section.classList.add('aufgabe--solved');
    }

    // Header – FIX-02: dynamische Aufgabenanzahl statt hardcoded "5"
    var header = document.createElement('div');
    header.className = 'aufgabe__header';
    header.innerHTML =
      '<span class="aufgabe__nummer">Aufgabe ' + (index + 1) + ' von ' + total + '</span>' +
      '<span class="aufgabe__typ-badge">' + Core.utils.sanitizeHTML(aufgabe.typ) + '</span>';
    section.appendChild(header);

    // Frage
    var frage = document.createElement('p');
    frage.className = 'aufgabe__frage';
    frage.textContent = aufgabe.frage || '';
    section.appendChild(frage);

    // Body (typabhaengig)
    var body = document.createElement('div');
    body.className = 'aufgabe__body';

    switch (aufgabe.typ) {
      case 'multiple-choice':
        _renderMultipleChoice(body, aufgabe, index, geloest);
        break;
      case 'zuordnung':
        _renderZuordnung(body, aufgabe, index, geloest);
        break;
      case 'lueckentext':
        _renderLueckentext(body, aufgabe, index, geloest);
        break;
      case 'reihenfolge':
        _renderReihenfolge(body, aufgabe, index, geloest);
        break;
      case 'freitext-code':
        _renderFreitextCode(body, aufgabe, index, geloest);
        break;
      default:
        body.textContent = 'Unbekannter Aufgabentyp: ' + aufgabe.typ;
    }

    section.appendChild(body);

    // Feedback-Bereich (vorab erstellen, zunächst versteckt) – FIX-15
    var feedbackEl = document.createElement('div');
    feedbackEl.className = 'aufgabe__feedback';
    feedbackEl.setAttribute('role', 'alert');
    feedbackEl.setAttribute('aria-live', 'polite');
    feedbackEl.setAttribute('tabindex', '-1');
    section.appendChild(feedbackEl);

    // Tipps
    if (aufgabe.tipps && aufgabe.tipps.length > 0 && !geloest) {
      var tippsEl = _renderTipps(aufgabe, index);
      section.appendChild(tippsEl);
    }

    return section;
  }

  // ========================================================================
  // Aufgabentyp-Renderer
  // ========================================================================

  // --- Multiple-Choice ---------------------------------------------------

  /**
   * Rendert eine Multiple-Choice-Aufgabe.
   * @param {HTMLElement} container
   * @param {Object} aufgabe
   * @param {number} index
   * @param {boolean} geloest
   * @private
   */
  function _renderMultipleChoice(container, aufgabe, index, geloest) {
    var optionenDiv = document.createElement('div');
    optionenDiv.className = 'aufgabe__optionen';
    optionenDiv.setAttribute('role', 'radiogroup');
    optionenDiv.setAttribute('aria-label', 'Antwortmöglichkeiten');

    var optionen = aufgabe.optionen || [];
    var gruppenName = 'mc-' + aufgabe.id;

    for (var i = 0; i < optionen.length; i++) {
      var label = document.createElement('label');
      label.className = 'aufgabe__option';

      var input = document.createElement('input');
      input.type = 'radio';
      input.name = gruppenName;
      input.value = optionen[i];
      input.className = 'aufgabe__input';
      input.disabled = geloest;
      input.setAttribute('aria-label', optionen[i]);

      var span = document.createElement('span');
      span.className = 'aufgabe__label';
      span.textContent = optionen[i];

      label.appendChild(input);
      label.appendChild(span);
      optionenDiv.appendChild(label);
    }

    container.appendChild(optionenDiv);

    // Submit-Button – FIX-14: echte Umlaute
    if (!geloest) {
      var btn = document.createElement('button');
      btn.className = 'aufgabe__submit';
      btn.type = 'button';
      btn.textContent = 'Antwort prüfen';
      btn.setAttribute('aria-label', 'Antwort für Aufgabe ' + (index + 1) + ' prüfen');
      btn.addEventListener('click', function () {
        _checkMultipleChoice(container.parentElement, aufgabe, index, gruppenName);
      });
      container.appendChild(btn);
    }
  }

  /**
   * Prueft Multiple-Choice-Antwort.
   * @private
   */
  function _checkMultipleChoice(section, aufgabe, index, gruppenName) {
    var selected = document.querySelector('input[name="' + gruppenName + '"]:checked');
    if (!selected) {
      Core.feedback.showInfo(section, 'Bitte wähle eine Antwort aus.');
      return;
    }

    var isCorrect = selected.value === aufgabe.loesung;

    // Alle Optionen markieren
    var labels = section.querySelectorAll('.aufgabe__option');
    for (var i = 0; i < labels.length; i++) {
      var input = labels[i].querySelector('input');
      if (input.value === aufgabe.loesung) {
        labels[i].classList.add('aufgabe__option--correct');
      } else if (input.checked && !isCorrect) {
        labels[i].classList.add('aufgabe__option--incorrect');
      }
      input.disabled = true;
    }

    if (isCorrect) {
      Core.feedback.showSuccess(section, 'Richtig! ✅');
      saveProgress(_state.mappeId, index, true);
      section.classList.add('aufgabe--solved');
    } else {
      Core.feedback.showError(section, 'Leider falsch. Versuche die Tipps! ❌');
    }

    // Submit-Button deaktivieren
    var btn = section.querySelector('.aufgabe__submit');
    if (btn && isCorrect) btn.disabled = true;

    _updateFortschritt(_getMappe(_state.mappeId), loadProgress(_state.mappeId));
  }

  // --- Zuordnung (Dropdown) ----------------------------------------------

  /**
   * Rendert eine Zuordnungs-Aufgabe mit Dropdown-Selects.
   * @private
   */
  function _renderZuordnung(container, aufgabe, index, geloest) {
    var zuordnungDiv = document.createElement('div');
    zuordnungDiv.className = 'aufgabe__zuordnung';

    var optionen = aufgabe.optionen || [];

    // Alle moeglichen Zuordnungs-Ziele sammeln
    var alleZiele = [];
    if (typeof aufgabe.loesung === 'object' && !Array.isArray(aufgabe.loesung)) {
      // loesung ist Objekt: { "Begriff1": "Ziel1", "Begriff2": "Ziel2" }
      var begriffe = Object.keys(aufgabe.loesung);
      for (var k = 0; k < begriffe.length; k++) {
        alleZiele.push(aufgabe.loesung[begriffe[k]]);
      }
      alleZiele = Core.utils.shuffleArray(alleZiele);

      for (var i = 0; i < begriffe.length; i++) {
        var zeile = _createZuordnungZeile(begriffe[i], alleZiele, aufgabe.id + '-z-' + i, geloest);
        zuordnungDiv.appendChild(zeile);
      }
    } else {
      // Fallback: optionen als einfache Liste nutzen
      var shuffledOptions = Core.utils.shuffleArray(optionen);
      for (var j = 0; j < optionen.length; j++) {
        var zeileEl = _createZuordnungZeile(optionen[j], shuffledOptions, aufgabe.id + '-z-' + j, geloest);
        zuordnungDiv.appendChild(zeileEl);
      }
    }

    container.appendChild(zuordnungDiv);

    // Submit-Button – FIX-14: echte Umlaute
    if (!geloest) {
      var btn = document.createElement('button');
      btn.className = 'aufgabe__submit';
      btn.type = 'button';
      btn.textContent = 'Zuordnung prüfen';
      btn.setAttribute('aria-label', 'Zuordnung für Aufgabe ' + (index + 1) + ' prüfen');
      btn.addEventListener('click', function () {
        _checkZuordnung(container.parentElement, aufgabe, index);
      });
      container.appendChild(btn);
    }
  }

  /**
   * Erstellt eine Zuordnungs-Zeile mit Dropdown.
   * @private
   */
  function _createZuordnungZeile(begriff, optionen, selectId, geloest) {
    var zeile = document.createElement('div');
    zeile.className = 'aufgabe__zuordnung-zeile';

    var begriffEl = document.createElement('span');
    begriffEl.className = 'aufgabe__zuordnung-begriff';
    begriffEl.textContent = begriff;

    var pfeil = document.createElement('span');
    pfeil.className = 'aufgabe__zuordnung-pfeil';
    pfeil.textContent = '→';
    pfeil.setAttribute('aria-hidden', 'true');

    var select = document.createElement('select');
    select.className = 'aufgabe__zuordnung-select';
    select.id = selectId;
    select.disabled = geloest;
    select.setAttribute('aria-label', 'Zuordnung für: ' + begriff);

    // Leere Option – FIX-14: echte Umlaute
    var emptyOpt = document.createElement('option');
    emptyOpt.value = '';
    emptyOpt.textContent = '-- Bitte wählen --';
    select.appendChild(emptyOpt);

    for (var i = 0; i < optionen.length; i++) {
      var opt = document.createElement('option');
      opt.value = optionen[i];
      opt.textContent = optionen[i];
      select.appendChild(opt);
    }

    zeile.appendChild(begriffEl);
    zeile.appendChild(pfeil);
    zeile.appendChild(select);
    return zeile;
  }

  /**
   * Prueft Zuordnungs-Antworten.
   * @private
   */
  function _checkZuordnung(section, aufgabe, index) {
    var zeilen = section.querySelectorAll('.aufgabe__zuordnung-zeile');
    var allCorrect = true;

    for (var i = 0; i < zeilen.length; i++) {
      var begriff = zeilen[i].querySelector('.aufgabe__zuordnung-begriff').textContent;
      var select = zeilen[i].querySelector('select');
      var expected = '';

      if (typeof aufgabe.loesung === 'object' && !Array.isArray(aufgabe.loesung)) {
        expected = aufgabe.loesung[begriff] || '';
      }

      // FIX-04: CSS-Klassen statt Inline-Styles
      zeilen[i].classList.remove('aufgabe__zuordnung-zeile--correct', 'aufgabe__zuordnung-zeile--incorrect');
      if (select.value === expected) {
        zeilen[i].classList.add('aufgabe__zuordnung-zeile--correct');
      } else {
        zeilen[i].classList.add('aufgabe__zuordnung-zeile--incorrect');
        allCorrect = false;
      }
    }

    if (allCorrect) {
      Core.feedback.showSuccess(section, 'Alle Zuordnungen richtig! ✅');
      saveProgress(_state.mappeId, index, true);
      section.classList.add('aufgabe--solved');
      // Selects deaktivieren
      var selects = section.querySelectorAll('select');
      for (var j = 0; j < selects.length; j++) { selects[j].disabled = true; }
    } else {
      Core.feedback.showError(section, 'Nicht alle Zuordnungen sind richtig. Versuche es nochmal! ❌');
    }

    _updateFortschritt(_getMappe(_state.mappeId), loadProgress(_state.mappeId));
  }

  // --- Lueckentext -------------------------------------------------------

  /**
   * Rendert eine Lueckentext-Aufgabe.
   * Erwartet loesung als Array von Strings (eine Loesung pro Luecke).
   * @private
   */
  function _renderLueckentext(container, aufgabe, index, geloest) {
    var textDiv = document.createElement('div');
    textDiv.className = 'aufgabe__lueckentext';

    // Frage-Text mit Platzhaltern ___
    // Ersetze jede ___ durch ein Input-Feld
    var text = aufgabe.frage || '';
    var lueckenIndex = 0;
    var parts = text.split('___');

    for (var i = 0; i < parts.length; i++) {
      var textNode = document.createTextNode(parts[i]);
      textDiv.appendChild(textNode);

      if (i < parts.length - 1) {
        var input = document.createElement('input');
        input.type = 'text';
        input.className = 'aufgabe__luecke';
        input.id = aufgabe.id + '-luecke-' + lueckenIndex;
        input.disabled = geloest;
        input.setAttribute('aria-label', 'Lücke ' + (lueckenIndex + 1));
        input.setAttribute('autocomplete', 'off');
        textDiv.appendChild(input);
        lueckenIndex++;
      }
    }

    container.appendChild(textDiv);

    // Submit-Button – FIX-14: echte Umlaute
    if (!geloest) {
      var btn = document.createElement('button');
      btn.className = 'aufgabe__submit';
      btn.type = 'button';
      btn.textContent = 'Antworten prüfen';
      btn.setAttribute('aria-label', 'Lückentext für Aufgabe ' + (index + 1) + ' prüfen');
      btn.addEventListener('click', function () {
        _checkLueckentext(container.parentElement, aufgabe, index);
      });
      container.appendChild(btn);
    }
  }

  /**
   * Prueft Lueckentext-Antworten.
   * @private
   */
  function _checkLueckentext(section, aufgabe, index) {
    var inputs = section.querySelectorAll('.aufgabe__luecke');
    var loesungen = Array.isArray(aufgabe.loesung) ? aufgabe.loesung : [aufgabe.loesung];
    var allCorrect = true;

    for (var i = 0; i < inputs.length; i++) {
      var userValue = (inputs[i].value || '').trim().toLowerCase();
      var expected = (loesungen[i] || '').trim().toLowerCase();

      if (userValue === expected) {
        inputs[i].classList.add('aufgabe__luecke--correct');
        inputs[i].classList.remove('aufgabe__luecke--incorrect');
      } else {
        inputs[i].classList.add('aufgabe__luecke--incorrect');
        inputs[i].classList.remove('aufgabe__luecke--correct');
        allCorrect = false;
      }
    }

    if (allCorrect) {
      Core.feedback.showSuccess(section, 'Alle Lücken richtig ausgefüllt! ✅');
      saveProgress(_state.mappeId, index, true);
      section.classList.add('aufgabe--solved');
      for (var j = 0; j < inputs.length; j++) { inputs[j].disabled = true; }
    } else {
      Core.feedback.showError(section, 'Nicht alle Lücken sind richtig. Versuche es nochmal! ❌');
    }

    _updateFortschritt(_getMappe(_state.mappeId), loadProgress(_state.mappeId));
  }

  // --- Reihenfolge -------------------------------------------------------

  /**
   * Rendert eine Reihenfolge-Aufgabe mit Hoch/Runter-Buttons.
   * Erwartet optionen als Array (die korrekte Reihenfolge steht in loesung).
   * @private
   */
  function _renderReihenfolge(container, aufgabe, index, geloest) {
    var listeDiv = document.createElement('div');
    listeDiv.className = 'aufgabe__reihenfolge';
    listeDiv.id = aufgabe.id + '-reihenfolge';

    // Optionen mischen (die loesung ist die korrekte Reihenfolge)
    var items = Core.utils.shuffleArray(aufgabe.optionen || []);

    for (var i = 0; i < items.length; i++) {
      var itemEl = _createReihenfolgeItem(items[i], i, items.length, aufgabe.id, geloest);
      listeDiv.appendChild(itemEl);
    }

    container.appendChild(listeDiv);

    // Submit-Button – FIX-14: echte Umlaute
    if (!geloest) {
      var btn = document.createElement('button');
      btn.className = 'aufgabe__submit';
      btn.type = 'button';
      btn.textContent = 'Reihenfolge prüfen';
      btn.setAttribute('aria-label', 'Reihenfolge für Aufgabe ' + (index + 1) + ' prüfen');
      btn.addEventListener('click', function () {
        _checkReihenfolge(container.parentElement, aufgabe, index);
      });
      container.appendChild(btn);
    }
  }

  /**
   * Erstellt ein Reihenfolge-Element mit Hoch/Runter-Buttons.
   * @private
   */
  function _createReihenfolgeItem(text, pos, total, aufgabeId, geloest) {
    var item = document.createElement('div');
    item.className = 'aufgabe__reihenfolge-item';
    item.setAttribute('data-value', text);

    // FIX-12: Nummerierte Slots statt doppelten Text
    var nummer = document.createElement('span');
    nummer.className = 'aufgabe__reihenfolge-nummer';
    nummer.textContent = (pos + 1) + '.';

    var textEl = document.createElement('span');
    textEl.className = 'aufgabe__reihenfolge-text';
    textEl.textContent = text;

    item.appendChild(nummer);
    item.appendChild(textEl);

    if (!geloest) {
      var btnsDiv = document.createElement('div');
      btnsDiv.className = 'aufgabe__reihenfolge-buttons';

      var btnUp = document.createElement('button');
      btnUp.type = 'button';
      btnUp.className = 'aufgabe__reihenfolge-btn';
      btnUp.textContent = '▲';
      btnUp.setAttribute('aria-label', text + ' nach oben verschieben');
      btnUp.addEventListener('click', function () {
        _moveReihenfolgeItem(item, -1);
      });

      var btnDown = document.createElement('button');
      btnDown.type = 'button';
      btnDown.className = 'aufgabe__reihenfolge-btn';
      btnDown.textContent = '▼';
      btnDown.setAttribute('aria-label', text + ' nach unten verschieben');
      btnDown.addEventListener('click', function () {
        _moveReihenfolgeItem(item, 1);
      });

      btnsDiv.appendChild(btnUp);
      btnsDiv.appendChild(btnDown);
      item.appendChild(btnsDiv);
    }

    return item;
  }

  /**
   * Verschiebt ein Reihenfolge-Element nach oben oder unten.
   * @param {HTMLElement} item
   * @param {number} direction – -1 (hoch) oder 1 (runter)
   * @private
   */
  function _moveReihenfolgeItem(item, direction) {
    var parent = item.parentElement;
    if (!parent) return;

    if (direction === -1 && item.previousElementSibling) {
      parent.insertBefore(item, item.previousElementSibling);
    } else if (direction === 1 && item.nextElementSibling) {
      parent.insertBefore(item.nextElementSibling, item);
    }

    // Nummern aktualisieren
    var items = parent.querySelectorAll('.aufgabe__reihenfolge-item');
    for (var i = 0; i < items.length; i++) {
      items[i].querySelector('.aufgabe__reihenfolge-nummer').textContent = (i + 1) + '.';
    }
  }

  /**
   * Prueft die Reihenfolge.
   * @private
   */
  function _checkReihenfolge(section, aufgabe, index) {
    var items = section.querySelectorAll('.aufgabe__reihenfolge-item');
    var expected = Array.isArray(aufgabe.loesung) ? aufgabe.loesung : aufgabe.optionen;
    var allCorrect = true;

    for (var i = 0; i < items.length; i++) {
      var val = items[i].getAttribute('data-value');
      if (val !== expected[i]) {
        allCorrect = false;
        break;
      }
    }

    if (allCorrect) {
      Core.feedback.showSuccess(section, 'Die Reihenfolge stimmt! ✅');
      saveProgress(_state.mappeId, index, true);
      section.classList.add('aufgabe--solved');
      // Buttons deaktivieren
      var btns = section.querySelectorAll('.aufgabe__reihenfolge-btn');
      for (var j = 0; j < btns.length; j++) { btns[j].disabled = true; }
    } else {
      Core.feedback.showError(section, 'Die Reihenfolge stimmt noch nicht. Versuche es nochmal! ❌');
    }

    _updateFortschritt(_getMappe(_state.mappeId), loadProgress(_state.mappeId));
  }

  // --- Freitext-Code -----------------------------------------------------

  /**
   * Rendert eine Freitext-Code-Aufgabe.
   * Die Benutzereingabe wird zu einem Code transformiert.
   * @private
   */
  function _renderFreitextCode(container, aufgabe, index, geloest) {
    var freitextDiv = document.createElement('div');
    freitextDiv.className = 'aufgabe__freitext';

    var textarea = document.createElement('textarea');
    textarea.className = 'aufgabe__textarea';
    textarea.id = aufgabe.id + '-freitext';
    textarea.disabled = geloest;
    textarea.setAttribute('aria-label', 'Freitext-Antwort für Aufgabe ' + (index + 1));
    textarea.setAttribute('placeholder', 'Schreibe deine Antwort hier...');

    freitextDiv.appendChild(textarea);
    container.appendChild(freitextDiv);

    // Submit-Button – FIX-14: echte Umlaute
    if (!geloest) {
      var btn = document.createElement('button');
      btn.className = 'aufgabe__submit';
      btn.type = 'button';
      btn.textContent = 'Antwort prüfen';
      btn.setAttribute('aria-label', 'Freitext für Aufgabe ' + (index + 1) + ' prüfen');
      btn.addEventListener('click', function () {
        _checkFreitextCode(container.parentElement, aufgabe, index, textarea);
      });
      container.appendChild(btn);
    }
  }

  /**
   * Prueft Freitext-Code-Antwort.
   * FIX-16: Exakter Match als primaerer Check, indexOf nur als Fallback.
   * @private
   */
  function _checkFreitextCode(section, aufgabe, index, textarea) {
    var userText = (textarea.value || '').trim().toLowerCase();
    var expected = (aufgabe.loesung || '').trim().toLowerCase();

    if (!userText) {
      Core.feedback.showInfo(section, 'Bitte gib eine Antwort ein.');
      return;
    }

    // FIX-16: Exakter Match zuerst, indexOf nur als Fallback
    var isExact = (userText === expected);
    var isContained = !isExact && expected.length > 0 && (userText.indexOf(expected) !== -1);

    if (isExact) {
      Core.feedback.showSuccess(section, 'Richtig! ✅');
      saveProgress(_state.mappeId, index, true);
      section.classList.add('aufgabe--solved');
      textarea.disabled = true;
    } else if (isContained) {
      Core.feedback.showSuccess(section, 'Richtig! ✅ (Deine Antwort enthält die gesuchte Lösung.)');
      saveProgress(_state.mappeId, index, true);
      section.classList.add('aufgabe--solved');
      textarea.disabled = true;
    } else {
      Core.feedback.showError(section, 'Das ist noch nicht ganz richtig. Versuche die Tipps! ❌');
    }

    _updateFortschritt(_getMappe(_state.mappeId), loadProgress(_state.mappeId));
  }

  // ========================================================================
  // Tipp-Rendering
  // ========================================================================

  /**
   * Rendert die Tipp-Buttons (3 Stufen) fuer eine Aufgabe.
   * @param {Object} aufgabe
   * @param {number} index
   * @returns {HTMLElement}
   * @private
   */
  function _renderTipps(aufgabe, index) {
    var tippsDiv = document.createElement('div');
    tippsDiv.className = 'aufgabe__tipps';

    var tipps = aufgabe.tipps || [];

    for (var i = 0; i < tipps.length; i++) {
      var tipp = tipps[i];
      var tippEl = document.createElement('div');
      tippEl.className = 'tipp tipp--stufe-' + tipp.stufe;

      var trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'tipp__trigger';
      trigger.textContent = 'Tipp ' + tipp.stufe;
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('aria-controls', aufgabe.id + '-tipp-' + tipp.stufe);

      var inhalt = document.createElement('div');
      inhalt.className = 'tipp__inhalt';
      inhalt.id = aufgabe.id + '-tipp-' + tipp.stufe;
      inhalt.setAttribute('role', 'region');
      inhalt.setAttribute('aria-label', 'Tipp Stufe ' + tipp.stufe);

      // Closure fuer Event-Listener
      (function (triggerBtn, inhaltDiv, stufe, aufgabeIndex) {
        triggerBtn.addEventListener('click', function () {
          var isVisible = inhaltDiv.classList.contains('tipp__inhalt--visible');
          if (isVisible) {
            inhaltDiv.classList.remove('tipp__inhalt--visible');
            triggerBtn.setAttribute('aria-expanded', 'false');
          } else {
            // Tipp-Text laden
            var tippText = showTipp(_state.mappeId, aufgabeIndex, stufe);
            inhaltDiv.textContent = tippText;
            inhaltDiv.classList.add('tipp__inhalt--visible');
            triggerBtn.setAttribute('aria-expanded', 'true');
            triggerBtn.classList.add('tipp__trigger--used');
            // Fokus auf Tipp-Inhalt (Barrierefreiheit)
            inhaltDiv.setAttribute('tabindex', '-1');
            inhaltDiv.focus();
          }
        });
      })(trigger, inhalt, tipp.stufe, index);

      tippEl.appendChild(trigger);
      tippEl.appendChild(inhalt);
      tippsDiv.appendChild(tippEl);
    }

    return tippsDiv;
  }

  // ========================================================================
  // Code-Eingabe
  // ========================================================================

  /**
   * Initialisiert die Code-Eingabe am Ende der Mappe.
   * @param {string} mappeId
   * @private
   */
  function _initCodeEingabe(mappeId) {
    var codeInput = document.querySelector('.code__input');
    var codeSubmit = document.querySelector('.code__submit');

    if (!codeInput || !codeSubmit) return;

    codeSubmit.addEventListener('click', function () {
      var eingabe = codeInput.value;
      var result = checkCode(mappeId, eingabe);
      var codeSection = document.querySelector('.code-eingabe');

      if (result.correct) {
        if (codeSection) codeSection.classList.add('code-eingabe--success');
        Core.feedback.showSuccess(codeSection || codeSubmit.parentElement, result.message);
      } else {
        if (codeSection) {
          codeSection.classList.add('code-eingabe--error');
          setTimeout(function () {
            codeSection.classList.remove('code-eingabe--error');
          }, 1000);
        }
        Core.feedback.showError(codeSection || codeSubmit.parentElement, result.message);
      }
    });

    // Enter-Taste in Code-Eingabe
    codeInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        codeSubmit.click();
      }
    });
  }

  // ========================================================================
  // Fortschrittsbalken
  // ========================================================================

  /**
   * Aktualisiert den Fortschrittsbalken.
   * @param {Object} mappe
   * @param {Object} progress
   * @private
   */
  function _updateFortschritt(mappe, progress) {
    if (!mappe || !progress) return;

    var total = (mappe.aufgaben || []).length;
    var solved = 0;
    for (var i = 0; i < progress.aufgaben.length; i++) {
      if (progress.aufgaben[i]) solved++;
    }

    var percent = total > 0 ? Math.round((solved / total) * 100) : 0;

    // Fortschrittsbalken aktualisieren (Inline-Style notwendig fuer dynamische Breite)
    var bar = document.querySelector('.fortschritt__bar');
    if (bar) {
      bar.style.width = percent + '%';
    }

    // Label aktualisieren – FIX-14: echte Umlaute
    var label = document.querySelector('.fortschritt__label');
    if (label) {
      label.textContent = solved + ' von ' + total + ' Aufgaben gelöst (' + percent + '%)';
    }
  }

  // ========================================================================
  // Oeffentliche API
  // ========================================================================

  return {
    init: init,
    checkCode: checkCode,
    saveProgress: saveProgress,
    loadProgress: loadProgress,
    showTipp: showTipp,
    resetProgress: resetProgress,
    unlockMappe: unlockMappe,
    setStorageKey: setStorageKey
  };

})();
