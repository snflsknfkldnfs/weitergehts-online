/**
 * escape-engine.js – Escape-Game-Engine v1
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
 * v1-Features:
 *   - Material-Renderer (7 Typen)
 *   - Einstieg-Renderer
 *   - Sicherung-Renderer + Tafelbild-SVG
 *   - Fuzzy-Matching (Umlaute, Levenshtein, Leerzeichen)
 *   - Code-Reveal (automatisch nach allen Aufgaben geloest)
 *   - material_referenz-Links
 *   - Rueckwaertskompatibel mit MVP-Daten (ohne materialien[])
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

        // Fortschritt laden
        var progress = loadProgress(mappeId);

        // v1 oder MVP rendern
        if (mappe.materialien && mappe.materialien.length > 0) {
          _renderMappeV1(mappe, progress);
        } else {
          _renderMappe(mappe, progress);
        }

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

      // Sicherung sichtbar machen
      var sicherungContainer = document.getElementById('sicherung-container');
      if (sicherungContainer) {
        sicherungContainer.style.display = '';
      }

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
  // 1a: Fuzzy-Matching
  // ========================================================================

  /**
   * Normalisiert Umlaute: ae→ä, oe→ö, ue→ü, ss→ß und umgekehrt.
   * @param {string} str
   * @returns {string}
   * @private
   */
  function _normalizeUmlaute(str) {
    return str
      .replace(/ae/g, 'ä').replace(/oe/g, 'ö').replace(/ue/g, 'ü')
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss');
  }

  /**
   * Berechnet die Levenshtein-Distanz zwischen zwei Strings.
   * @param {string} a
   * @param {string} b
   * @returns {number}
   * @private
   */
  function _levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    var matrix = [];
    for (var i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (var j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (var bi = 1; bi <= b.length; bi++) {
      for (var ai = 1; ai <= a.length; ai++) {
        var cost = b.charAt(bi - 1) === a.charAt(ai - 1) ? 0 : 1;
        matrix[bi][ai] = Math.min(
          matrix[bi - 1][ai] + 1,       // Deletion
          matrix[bi][ai - 1] + 1,       // Insertion
          matrix[bi - 1][ai - 1] + cost // Substitution
        );
      }
    }

    return matrix[b.length][a.length];
  }

  /**
   * Fuzzy-Matching fuer Freitext-Code-Validierung.
   * Toleriert Umlaut-Schreibweisen, Tippfehler (Levenshtein <= 2),
   * und Bindestrich/Leerzeichen-Unterschiede.
   * @param {string} eingabe
   * @param {string} loesung
   * @returns {boolean}
   * @private
   */
  function _fuzzyMatch(eingabe, loesung) {
    var a = eingabe.toLowerCase().trim();
    var b = loesung.toLowerCase().trim();
    if (a === b) return true;

    // Umlaut-Normalisierung
    var aNorm = _normalizeUmlaute(a);
    var bNorm = _normalizeUmlaute(b);
    if (aNorm === bNorm) return true;

    // Levenshtein-Distanz <= 2 (Tippfehler)
    if (_levenshtein(aNorm, bNorm) <= 2) return true;

    // Bindestrich/Leerzeichen-Toleranz
    var aClean = aNorm.replace(/[-\s]/g, '');
    var bClean = bNorm.replace(/[-\s]/g, '');
    if (aClean === bClean) return true;

    return false;
  }

  // ========================================================================
  // 1b: Code-Reveal
  // ========================================================================

  /**
   * Blendet den Code-Bereich ein, wenn alle Aufgaben geloest sind.
   * @param {Object} mappe
   * @private
   */
  function _revealFreischaltCode(mappe) {
    var codeSection = document.getElementById('code-section') || document.querySelector('.code-eingabe');
    if (!codeSection) return;

    // Sichtbar machen
    codeSection.style.display = '';
    codeSection.classList.add('fade-in');

    // Erfolgsmeldung
    Core.feedback.showSuccess(codeSection, 'Alle Aufgaben gelöst! Gib jetzt den Freischalt-Code ein.');

    // Zum Code-Bereich scrollen
    codeSection.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Input fokussieren
    var codeInput = codeSection.querySelector('.code__input');
    if (codeInput) {
      setTimeout(function () { codeInput.focus(); }, 500);
    }
  }

  // ========================================================================
  // 1c: Material-Renderer
  // ========================================================================

  /**
   * Rendert alle Materialien einer Mappe.
   * @param {Array} materialien – mappen[].materialien[]
   * @returns {DocumentFragment}
   * @private
   */
  function _renderMaterialien(materialien) {
    var frag = document.createDocumentFragment();

    for (var i = 0; i < materialien.length; i++) {
      var mat = materialien[i];
      var el = null;

      switch (mat.typ) {
        case 'darstellungstext':
          el = _renderMaterialDarstellung(mat);
          break;
        case 'quellentext':
          el = _renderMaterialQuelle(mat);
          break;
        case 'bildquelle':
          el = _renderMaterialBild(mat);
          break;
        case 'karte':
          el = _renderMaterialKarte(mat);
          break;
        case 'zeitleiste':
          el = _renderMaterialZeitleiste(mat);
          break;
        case 'statistik':
          el = _renderMaterialStatistik(mat);
          break;
        case 'tagebuch':
          el = _renderMaterialTagebuch(mat);
          break;
        default:
          el = document.createElement('div');
          el.className = 'material';
          el.textContent = 'Unbekannter Material-Typ: ' + mat.typ;
      }

      if (el && mat.id) {
        el.id = mat.id;
      }
      if (el) {
        frag.appendChild(el);
      }
    }

    return frag;
  }

  /** @private */
  function _renderMaterialDarstellung(mat) {
    var article = document.createElement('article');
    article.className = 'material material--darstellung';

    var h3 = document.createElement('h3');
    h3.className = 'material__titel';
    h3.textContent = mat.titel || '';
    article.appendChild(h3);

    var inhaltDiv = document.createElement('div');
    inhaltDiv.className = 'material__inhalt';
    inhaltDiv.innerHTML = mat.inhalt || '';
    article.appendChild(inhaltDiv);

    if (mat.quelle) {
      var quelleP = document.createElement('p');
      quelleP.className = 'material__quelle';
      quelleP.textContent = mat.quelle;
      article.appendChild(quelleP);
    }

    return article;
  }

  /** @private */
  function _renderMaterialQuelle(mat) {
    var blockquote = document.createElement('blockquote');
    blockquote.className = 'material material--quelle';

    if (mat.titel) {
      var h3 = document.createElement('h3');
      h3.className = 'material__titel';
      h3.textContent = mat.titel;
      blockquote.appendChild(h3);
    }

    var inhaltDiv = document.createElement('div');
    inhaltDiv.className = 'material__inhalt';
    inhaltDiv.innerHTML = mat.inhalt || '';
    blockquote.appendChild(inhaltDiv);

    if (mat.quelle) {
      var cite = document.createElement('cite');
      cite.className = 'material__quelle';
      cite.textContent = mat.quelle;
      blockquote.appendChild(cite);
    }

    return blockquote;
  }

  /** @private */
  function _renderMaterialBild(mat) {
    var figure = document.createElement('figure');
    figure.className = 'material material--bild';

    var img = document.createElement('img');
    img.src = mat.inhalt || '';
    img.alt = mat.titel || '';
    img.loading = 'lazy';
    figure.appendChild(img);

    var captionParts = [];
    if (mat.bildunterschrift) captionParts.push(mat.bildunterschrift);
    if (mat.quelle) captionParts.push(mat.quelle);
    if (mat.lizenz) captionParts.push(mat.lizenz);

    if (captionParts.length > 0) {
      var figcaption = document.createElement('figcaption');
      figcaption.textContent = captionParts.join(' — ');
      figure.appendChild(figcaption);
    }

    return figure;
  }

  /** @private */
  function _renderMaterialKarte(mat) {
    var figure = document.createElement('figure');
    figure.className = 'material material--karte';

    var inhaltDiv = document.createElement('div');
    inhaltDiv.className = 'material__inhalt';

    // SVG-String oder URL?
    var inhalt = mat.inhalt || '';
    if (inhalt.indexOf('<svg') !== -1) {
      // SVG-String direkt einsetzen
      inhaltDiv.innerHTML = inhalt;
    } else {
      // URL: img-Element
      var img = document.createElement('img');
      img.src = inhalt;
      img.alt = mat.titel || '';
      img.loading = 'lazy';
      inhaltDiv.appendChild(img);
    }
    figure.appendChild(inhaltDiv);

    var captionParts = [];
    if (mat.bildunterschrift) captionParts.push(mat.bildunterschrift);
    if (mat.quelle) captionParts.push(mat.quelle);

    if (captionParts.length > 0) {
      var figcaption = document.createElement('figcaption');
      figcaption.textContent = captionParts.join(' — ');
      figure.appendChild(figcaption);
    }

    return figure;
  }

  /** @private */
  function _renderMaterialZeitleiste(mat) {
    var div = document.createElement('div');
    div.className = 'material material--zeitleiste';

    var h3 = document.createElement('h3');
    h3.className = 'material__titel';
    h3.textContent = mat.titel || '';
    div.appendChild(h3);

    var ol = document.createElement('ol');
    ol.className = 'zeitleiste__liste';

    // inhalt ist JSON-Array [{datum, text}]
    var eintraege = mat.inhalt || [];
    if (typeof eintraege === 'string') {
      try { eintraege = JSON.parse(eintraege); } catch (e) { eintraege = []; }
    }

    for (var i = 0; i < eintraege.length; i++) {
      var li = document.createElement('li');
      var datumSpan = document.createElement('span');
      datumSpan.className = 'zeitleiste__datum';
      datumSpan.textContent = eintraege[i].datum || '';
      li.appendChild(datumSpan);

      var textNode = document.createTextNode(' ' + (eintraege[i].text || ''));
      li.appendChild(textNode);
      ol.appendChild(li);
    }

    div.appendChild(ol);

    if (mat.quelle) {
      var quelleP = document.createElement('p');
      quelleP.className = 'material__quelle';
      quelleP.textContent = mat.quelle;
      div.appendChild(quelleP);
    }

    return div;
  }

  /** @private */
  function _renderMaterialStatistik(mat) {
    var div = document.createElement('div');
    div.className = 'material material--statistik';

    var h3 = document.createElement('h3');
    h3.className = 'material__titel';
    h3.textContent = mat.titel || '';
    div.appendChild(h3);

    // inhalt ist JSON-Object {spalten[], zeilen[[]]}
    var daten = mat.inhalt || {};
    if (typeof daten === 'string') {
      try { daten = JSON.parse(daten); } catch (e) { daten = {}; }
    }

    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');
    var spalten = daten.spalten || [];
    for (var s = 0; s < spalten.length; s++) {
      var th = document.createElement('th');
      th.textContent = spalten[s];
      headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    var tbody = document.createElement('tbody');
    var zeilen = daten.zeilen || [];
    for (var z = 0; z < zeilen.length; z++) {
      var tr = document.createElement('tr');
      var zeile = zeilen[z] || [];
      for (var c = 0; c < zeile.length; c++) {
        var td = document.createElement('td');
        td.textContent = zeile[c];
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    div.appendChild(table);

    if (mat.quelle) {
      var quelleP = document.createElement('p');
      quelleP.className = 'material__quelle';
      quelleP.textContent = mat.quelle;
      div.appendChild(quelleP);
    }

    return div;
  }

  /** @private */
  function _renderMaterialTagebuch(mat) {
    var article = document.createElement('article');
    article.className = 'material material--tagebuch';

    var h3 = document.createElement('h3');
    h3.className = 'material__titel';
    h3.textContent = mat.titel || '';
    article.appendChild(h3);

    var inhaltDiv = document.createElement('div');
    inhaltDiv.className = 'material__inhalt tagebuch__text';
    inhaltDiv.innerHTML = mat.inhalt || '';
    article.appendChild(inhaltDiv);

    if (mat.quelle) {
      var quelleP = document.createElement('p');
      quelleP.className = 'material__quelle';
      quelleP.textContent = mat.quelle;
      article.appendChild(quelleP);
    }

    return article;
  }

  // ========================================================================
  // 1d: Einstieg-Renderer
  // ========================================================================

  /**
   * Rendert den Einstieg einer Mappe.
   * @param {Object} einstieg – mappen[].einstieg
   * @param {HTMLElement} container – Ziel-Container
   * @private
   */
  function _renderEinstieg(einstieg, container) {
    if (!einstieg || !container) return;

    container.id = 'einstieg-section';
    container.className = 'mappe__einstieg';

    if (einstieg.narrativ) {
      var narrativDiv = document.createElement('div');
      narrativDiv.className = 'einstieg__narrativ';
      narrativDiv.innerHTML = einstieg.narrativ;
      container.appendChild(narrativDiv);
    }

    if (einstieg.problemstellung) {
      var problemP = document.createElement('p');
      problemP.className = 'einstieg__problemstellung';
      var strong = document.createElement('strong');
      strong.textContent = einstieg.problemstellung;
      problemP.appendChild(strong);
      container.appendChild(problemP);
    }
  }

  // ========================================================================
  // 1e: Sicherung-Renderer
  // ========================================================================

  /**
   * Rendert die Sicherung einer Mappe (initial hidden, sichtbar nach Code-Reveal).
   * @param {Object} sicherung – mappen[].sicherung
   * @param {HTMLElement} container – Ziel-Container
   * @private
   */
  function _renderSicherung(sicherung, container) {
    if (!sicherung || !container) return;

    container.className = 'mappe__sicherung';

    var h2 = document.createElement('h2');
    h2.textContent = 'Sicherung';
    container.appendChild(h2);

    // Tafelbild
    if (sicherung.tafelbild) {
      var tafelbildDiv = document.createElement('div');
      tafelbildDiv.className = 'sicherung__tafelbild';
      tafelbildDiv.id = 'tafelbild-container';
      _renderTafelbild(sicherung.tafelbild, tafelbildDiv);
      container.appendChild(tafelbildDiv);
    }

    // Zusammenfassung
    if (sicherung.zusammenfassung) {
      var zusammenfassungDiv = document.createElement('div');
      zusammenfassungDiv.className = 'sicherung__zusammenfassung';
      zusammenfassungDiv.textContent = sicherung.zusammenfassung;
      container.appendChild(zusammenfassungDiv);
    }

    // Ueberleitung
    if (sicherung.ueberleitung) {
      var ueberleitungP = document.createElement('p');
      ueberleitungP.className = 'sicherung__ueberleitung';
      var em = document.createElement('em');
      em.textContent = sicherung.ueberleitung;
      ueberleitungP.appendChild(em);
      container.appendChild(ueberleitungP);
    }
  }

  // ========================================================================
  // 1f: Tafelbild-Renderer (SVG)
  // ========================================================================

  /**
   * Generiert SVG aus tafelbild JSON-Daten.
   * Auto-Layout: hierarchisch (kernbegriff oben, kategorien/ursachen/wirkungen mittig,
   * akteure/ereignisse unten).
   *
   * @param {Object} tafelbild – {knoten[], verbindungen[], voraussetzungen[]}
   * @param {HTMLElement} container
   * @private
   */
  function _renderTafelbild(tafelbild, container) {
    if (!tafelbild) return;

    var knoten = tafelbild.knoten || [];
    var verbindungen = tafelbild.verbindungen || [];
    var voraussetzungen = tafelbild.voraussetzungen || [];

    if (knoten.length === 0) return;

    // Typ-basierte Ebenen fuer Auto-Layout
    var ebenen = {
      kernbegriff: [],
      kategorie: [],
      ursache: [],
      wirkung: [],
      akteur: [],
      ereignis: []
    };

    for (var i = 0; i < knoten.length; i++) {
      var typ = knoten[i].typ || 'kategorie';
      if (ebenen[typ]) {
        ebenen[typ].push(knoten[i]);
      } else {
        ebenen.kategorie.push(knoten[i]);
      }
    }

    // Layout-Reihen: Voraussetzungen → Kernbegriff → Kategorie/Ursache/Wirkung → Akteur/Ereignis
    var reihen = [];
    if (voraussetzungen.length > 0) {
      reihen.push({ items: voraussetzungen, isGhost: true });
    }
    if (ebenen.kernbegriff.length > 0) {
      reihen.push({ items: ebenen.kernbegriff, isGhost: false });
    }

    var mittelReihe = ebenen.kategorie.concat(ebenen.ursache, ebenen.wirkung);
    if (mittelReihe.length > 0) {
      reihen.push({ items: mittelReihe, isGhost: false });
    }

    var untereReihe = ebenen.akteur.concat(ebenen.ereignis);
    if (untereReihe.length > 0) {
      reihen.push({ items: untereReihe, isGhost: false });
    }

    // SVG-Groesse berechnen
    var maxItemsInRow = 1;
    for (var r = 0; r < reihen.length; r++) {
      if (reihen[r].items.length > maxItemsInRow) {
        maxItemsInRow = reihen[r].items.length;
      }
    }

    var svgWidth = Math.max(600, maxItemsInRow * 180 + 80);
    var rowHeight = 100;
    var svgHeight = reihen.length * rowHeight + 60;

    // Positionen berechnen
    var positionen = {}; // id → {x, y}
    for (var ri = 0; ri < reihen.length; ri++) {
      var reihe = reihen[ri];
      var y = 50 + ri * rowHeight;
      var itemCount = reihe.items.length;
      var totalWidth = itemCount * 160 + (itemCount - 1) * 20;
      var startX = (svgWidth - totalWidth) / 2 + 80;

      for (var ii = 0; ii < reihe.items.length; ii++) {
        var item = reihe.items[ii];
        positionen[item.id] = {
          x: startX + ii * 180,
          y: y,
          typ: item.typ || 'kategorie',
          text: item.text || '',
          isGhost: reihe.isGhost
        };
      }
    }

    // SVG erstellen
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + svgWidth + ' ' + svgHeight);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Tafelbild: Begriffe und ihre Zusammenhänge');
    svg.style.maxWidth = '100%';
    svg.style.height = 'auto';

    // Pfeilspitze definieren
    var defs = document.createElementNS(ns, 'defs');
    var marker = document.createElementNS(ns, 'marker');
    marker.setAttribute('id', 'arrowhead');
    marker.setAttribute('markerWidth', '10');
    marker.setAttribute('markerHeight', '7');
    marker.setAttribute('refX', '9');
    marker.setAttribute('refY', '3.5');
    marker.setAttribute('orient', 'auto');
    var arrowPath = document.createElementNS(ns, 'polygon');
    arrowPath.setAttribute('points', '0 0, 10 3.5, 0 7');
    arrowPath.setAttribute('fill', 'var(--tb-verbindung, #374151)');
    marker.appendChild(arrowPath);
    defs.appendChild(marker);
    svg.appendChild(defs);

    // Verbindungen zeichnen (zuerst, damit Knoten drueber liegen)
    for (var vi = 0; vi < verbindungen.length; vi++) {
      var verb = verbindungen[vi];
      var von = positionen[verb.von];
      var nach = positionen[verb.nach];
      if (!von || !nach) continue;

      var line = document.createElementNS(ns, 'line');
      line.setAttribute('x1', von.x);
      line.setAttribute('y1', von.y);
      line.setAttribute('x2', nach.x);
      line.setAttribute('y2', nach.y);
      line.setAttribute('stroke', 'var(--tb-verbindung, #374151)');
      line.setAttribute('stroke-width', '1.5');
      line.setAttribute('marker-end', 'url(#arrowhead)');
      svg.appendChild(line);

      // Label an der Mitte der Verbindung
      if (verb.label) {
        var labelText = document.createElementNS(ns, 'text');
        labelText.setAttribute('x', (von.x + nach.x) / 2);
        labelText.setAttribute('y', (von.y + nach.y) / 2 - 8);
        labelText.setAttribute('text-anchor', 'middle');
        labelText.setAttribute('font-size', '10');
        labelText.setAttribute('fill', 'var(--tb-label, #4b5563)');
        labelText.textContent = verb.label;
        svg.appendChild(labelText);
      }
    }

    // Ghost-Verbindungen (Voraussetzungen)
    for (var gi = 0; gi < voraussetzungen.length; gi++) {
      var ghost = voraussetzungen[gi];
      var ghostPos = positionen[ghost.id];
      if (!ghostPos) continue;

      // Finde naechsten Kernbegriff-Knoten
      for (var ki = 0; ki < ebenen.kernbegriff.length; ki++) {
        var kernPos = positionen[ebenen.kernbegriff[ki].id];
        if (!kernPos) continue;

        var ghostLine = document.createElementNS(ns, 'line');
        ghostLine.setAttribute('x1', ghostPos.x);
        ghostLine.setAttribute('y1', ghostPos.y);
        ghostLine.setAttribute('x2', kernPos.x);
        ghostLine.setAttribute('y2', kernPos.y);
        ghostLine.setAttribute('stroke', 'var(--tb-ghost, #d1d5db)');
        ghostLine.setAttribute('stroke-width', '1.5');
        ghostLine.setAttribute('stroke-dasharray', '6 4');
        svg.appendChild(ghostLine);
      }
    }

    // Knoten zeichnen
    var knotenIds = Object.keys(positionen);
    for (var ni = 0; ni < knotenIds.length; ni++) {
      var knotenId = knotenIds[ni];
      var pos = positionen[knotenId];
      _renderTafelbildKnoten(svg, ns, pos);
    }

    container.appendChild(svg);
  }

  /**
   * Zeichnet einen einzelnen Tafelbild-Knoten.
   * @private
   */
  function _renderTafelbildKnoten(svg, ns, pos) {
    var g = document.createElementNS(ns, 'g');
    g.setAttribute('transform', 'translate(' + pos.x + ',' + pos.y + ')');

    // Farbe und Groesse nach Typ
    var colorVar, w, h;
    switch (pos.typ) {
      case 'kernbegriff':
        colorVar = 'var(--tb-kernbegriff, #2563eb)';
        w = 160; h = 60;
        break;
      case 'kategorie':
        colorVar = 'var(--tb-kategorie, #7c3aed)';
        w = 140; h = 50;
        break;
      case 'ursache':
        colorVar = 'var(--tb-ursache, #dc2626)';
        w = 140; h = 50;
        break;
      case 'wirkung':
        colorVar = 'var(--tb-wirkung, #059669)';
        w = 140; h = 50;
        break;
      case 'akteur':
        colorVar = 'var(--tb-akteur, #d97706)';
        w = 120; h = 50;
        break;
      case 'ereignis':
        colorVar = 'var(--tb-ereignis, #6b7280)';
        w = 140; h = 50;
        break;
      default:
        colorVar = 'var(--tb-kategorie, #7c3aed)';
        w = 140; h = 50;
    }

    if (pos.isGhost) {
      colorVar = 'var(--tb-ghost, #d1d5db)';
    }

    // Form zeichnen
    var shape;
    if (pos.typ === 'akteur') {
      // Ellipse
      shape = document.createElementNS(ns, 'ellipse');
      shape.setAttribute('cx', 0);
      shape.setAttribute('cy', 0);
      shape.setAttribute('rx', w / 2);
      shape.setAttribute('ry', h / 2);
    } else {
      // Abgerundetes Rechteck
      shape = document.createElementNS(ns, 'rect');
      shape.setAttribute('x', -w / 2);
      shape.setAttribute('y', -h / 2);
      shape.setAttribute('width', w);
      shape.setAttribute('height', h);
      shape.setAttribute('rx', 8);
    }

    shape.setAttribute('fill', colorVar);
    shape.setAttribute('fill-opacity', pos.isGhost ? '0.3' : '0.15');
    shape.setAttribute('stroke', colorVar);
    shape.setAttribute('stroke-width', pos.isGhost ? '1' : '2');
    if (pos.isGhost) {
      shape.setAttribute('stroke-dasharray', '4 3');
    }
    g.appendChild(shape);

    // Text
    var text = document.createElementNS(ns, 'text');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'central');
    text.setAttribute('font-size', pos.typ === 'kernbegriff' ? '14' : '12');
    text.setAttribute('font-weight', pos.typ === 'kernbegriff' ? 'bold' : 'normal');
    text.setAttribute('fill', pos.isGhost ? 'var(--tb-ghost, #d1d5db)' : '#1f2937');

    // Text umbrechen wenn noetig
    var words = (pos.text || '').split(' ');
    if (words.length > 2 && pos.text.length > 15) {
      var mid = Math.ceil(words.length / 2);
      var line1 = words.slice(0, mid).join(' ');
      var line2 = words.slice(mid).join(' ');

      var tspan1 = document.createElementNS(ns, 'tspan');
      tspan1.setAttribute('x', '0');
      tspan1.setAttribute('dy', '-0.6em');
      tspan1.textContent = line1;
      text.appendChild(tspan1);

      var tspan2 = document.createElementNS(ns, 'tspan');
      tspan2.setAttribute('x', '0');
      tspan2.setAttribute('dy', '1.2em');
      tspan2.textContent = line2;
      text.appendChild(tspan2);
    } else {
      text.textContent = pos.text || '';
    }

    g.appendChild(text);
    svg.appendChild(g);
  }

  // ========================================================================
  // 1g: Phasen-Renderer (_renderMappeV1)
  // ========================================================================

  /**
   * Rendert eine Mappe im v1-Layout mit Phasen:
   * 1. Einstieg
   * 2. Erarbeitung (2-Spalten: Materialien + Aufgaben)
   * 3. Sicherung (hidden, nach Code-Reveal)
   *
   * @param {Object} mappe
   * @param {Object} progress
   * @private
   */
  function _renderMappeV1(mappe, progress) {
    // Einstieg rendern
    var einstiegContainer = document.getElementById('einstieg-container');
    if (einstiegContainer && mappe.einstieg) {
      _renderEinstieg(mappe.einstieg, einstiegContainer);
    }

    // Materialien rendern
    var materialContainer = document.getElementById('material-container');
    if (materialContainer && mappe.materialien) {
      materialContainer.innerHTML = '';
      var materialienFrag = _renderMaterialien(mappe.materialien);
      materialContainer.appendChild(materialienFrag);
    }

    // Aufgaben rendern (in den aufgaben-container)
    var aufgabenContainer = document.getElementById('aufgaben-container');
    if (aufgabenContainer) {
      aufgabenContainer.innerHTML = '';
      var aufgaben = mappe.aufgaben || [];
      var total = aufgaben.length;
      for (var i = 0; i < aufgaben.length; i++) {
        var aufgabe = aufgaben[i];
        var geloest = progress.aufgaben[i] || false;
        var aufgabeEl = _renderAufgabe(aufgabe, i, geloest, total);
        aufgabenContainer.appendChild(aufgabeEl);
      }
    }

    // Sicherung rendern (hidden)
    var sicherungContainer = document.getElementById('sicherung-container');
    if (sicherungContainer && mappe.sicherung) {
      sicherungContainer.innerHTML = '';
      _renderSicherung(mappe.sicherung, sicherungContainer);
      // Bleibt hidden (style="display:none" im HTML)
    }
  }

  // ========================================================================
  // MVP Mappe-Rendering (Rueckwaertskompatibel)
  // ========================================================================

  /**
   * Rendert alle Aufgaben einer Mappe (MVP-Modus ohne Materialien).
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

    // 1h: material_referenz-Verweis
    if (aufgabe.material_referenz && aufgabe.material_referenz.length > 0) {
      var verweisP = _renderMaterialVerweis(aufgabe.material_referenz);
      if (verweisP) section.appendChild(verweisP);
    }

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
  // 1h: material_referenz-Integration
  // ========================================================================

  /**
   * Rendert einen Verweis-Link zu referenzierten Materialien.
   * @param {Array} referenzen – Array von Material-IDs
   * @returns {HTMLElement|null}
   * @private
   */
  function _renderMaterialVerweis(referenzen) {
    if (!referenzen || referenzen.length === 0) return null;

    var mappe = _getMappe(_state.mappeId);
    if (!mappe || !mappe.materialien) return null;

    var p = document.createElement('p');
    p.className = 'aufgabe__material-verweis';

    var prefix = document.createTextNode('\uD83D\uDCD6 Arbeite mit: ');
    p.appendChild(prefix);

    var linkCount = 0;
    for (var i = 0; i < referenzen.length; i++) {
      var matId = referenzen[i];
      // Material-Titel finden
      var titel = matId;
      for (var m = 0; m < mappe.materialien.length; m++) {
        if (mappe.materialien[m].id === matId) {
          titel = mappe.materialien[m].titel || matId;
          break;
        }
      }

      if (linkCount > 0) {
        p.appendChild(document.createTextNode(', '));
      }

      var a = document.createElement('a');
      a.href = '#' + matId;
      a.textContent = titel;
      p.appendChild(a);
      linkCount++;
    }

    return p;
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

    // Submit-Button
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

    // Submit-Button
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

    // Leere Option
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

    // Submit-Button
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
      var userValue = (inputs[i].value || '').trim();
      var expected = (loesungen[i] || '').trim();

      if (_fuzzyMatch(userValue, expected)) {
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

    // Submit-Button
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

    // Submit-Button
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
   * Verwendet Fuzzy-Matching fuer bessere Tippfehler-Toleranz.
   * @private
   */
  function _checkFreitextCode(section, aufgabe, index, textarea) {
    var userText = (textarea.value || '').trim();
    var expected = (aufgabe.loesung || '').trim();

    if (!userText) {
      Core.feedback.showInfo(section, 'Bitte gib eine Antwort ein.');
      return;
    }

    // Fuzzy-Match (Umlaute, Levenshtein, Leerzeichen)
    var isMatch = _fuzzyMatch(userText, expected);

    // Fallback: indexOf-Check (Antwort enthaelt Loesung)
    var isContained = !isMatch && expected.length > 0 &&
      (userText.toLowerCase().indexOf(expected.toLowerCase()) !== -1);

    if (isMatch) {
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
   * Bei v1: Loest Code-Reveal aus, wenn alle Aufgaben geloest.
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

    // Fortschrittsbalken aktualisieren
    var bar = document.querySelector('.fortschritt__bar');
    if (bar) {
      bar.style.width = percent + '%';
      bar.setAttribute('aria-valuenow', percent);
    }

    // Label aktualisieren
    var label = document.querySelector('.fortschritt__label');
    if (label) {
      label.textContent = solved + ' von ' + total + ' Aufgaben gelöst (' + percent + '%)';
    }

    // 1b: Code-Reveal wenn alle geloest
    if (solved === total && total > 0) {
      _revealFreischaltCode(mappe);
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
