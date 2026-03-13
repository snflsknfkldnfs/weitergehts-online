/**
 * core.js – Gemeinsame Logik fuer alle interaktiven Formate
 *
 * Stellt Storage-Wrapper, Navigation, Feedback-Animationen und
 * Utility-Funktionen bereit. Wird von escape-engine.js genutzt.
 *
 * Keine externen Abhaengigkeiten. Vanilla JS.
 */

/* global document, window, localStorage */

'use strict';

var Core = (function () {

  // ========================================================================
  // 1. Storage – localStorage-Wrapper mit try/catch
  // ========================================================================

  var storage = {

    /**
     * Liest einen Wert aus localStorage und parst ihn als JSON.
     * @param {string} key – Schluessel
     * @returns {*} Geparster Wert oder null bei Fehler
     */
    get: function (key) {
      try {
        var raw = localStorage.getItem(key);
        if (raw === null) return null;
        return JSON.parse(raw);
      } catch (e) {
        console.warn('[Core.storage.get] Fehler beim Lesen von "' + key + '":', e);
        return null;
      }
    },

    /**
     * Schreibt einen Wert als JSON in localStorage.
     * @param {string} key – Schluessel
     * @param {*} value – Wert (wird JSON-serialisiert)
     * @returns {boolean} true bei Erfolg
     */
    set: function (key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.warn('[Core.storage.set] Fehler beim Schreiben von "' + key + '":', e);
        return false;
      }
    },

    /**
     * Entfernt einen Schluessel aus localStorage.
     * @param {string} key – Schluessel
     */
    remove: function (key) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.warn('[Core.storage.remove] Fehler:', e);
      }
    },

    /**
     * Loescht den gesamten localStorage.
     */
    clear: function () {
      try {
        localStorage.clear();
      } catch (e) {
        console.warn('[Core.storage.clear] Fehler:', e);
      }
    }
  };

  // ========================================================================
  // 2. Navigation
  // ========================================================================

  var nav = {

    /**
     * Navigiert zu einer relativen URL.
     * @param {string} url – Relative URL
     */
    goTo: function (url) {
      if (url) {
        window.location.href = url;
      }
    },

    /**
     * Navigiert zurueck in der Browser-History.
     */
    goBack: function () {
      window.history.back();
    },

    /**
     * Gibt den aktuellen Seitennamen ohne .html zurueck.
     * @returns {string} Seitenname (z.B. "mappe-1", "index")
     */
    getCurrentPage: function () {
      var path = window.location.pathname;
      var filename = path.split('/').pop() || 'index';
      return filename.replace('.html', '');
    }
  };

  // ========================================================================
  // 3. Feedback-Animationen
  // ========================================================================

  var feedback = {

    /**
     * Zeigt Erfolgs-Feedback an einem Element an.
     * @param {HTMLElement} element – Ziel-Element
     * @param {string} message – Nachricht
     */
    showSuccess: function (element, message) {
      _showFeedback(element, message, 'success');
    },

    /**
     * Zeigt Fehler-Feedback an einem Element an.
     * @param {HTMLElement} element – Ziel-Element
     * @param {string} message – Nachricht
     */
    showError: function (element, message) {
      _showFeedback(element, message, 'error');
    },

    /**
     * Zeigt Info-Feedback an einem Element an.
     * @param {HTMLElement} element – Ziel-Element
     * @param {string} message – Nachricht
     */
    showInfo: function (element, message) {
      _showFeedback(element, message, 'info');
    }
  };

  /**
   * Interne Hilfsfunktion: Erstellt/aktualisiert Feedback-Element.
   * @param {HTMLElement} element – Ziel-Element
   * @param {string} message – Nachricht
   * @param {string} type – "success" | "error" | "info"
   * @private
   */
  function _showFeedback(element, message, type) {
    if (!element) return;

    // Suche bestehendes Feedback-Element oder erstelle neues
    var feedbackEl = element.querySelector('.aufgabe__feedback');
    if (!feedbackEl) {
      feedbackEl = document.createElement('div');
      feedbackEl.setAttribute('role', 'alert');
      feedbackEl.setAttribute('aria-live', 'polite');
      element.appendChild(feedbackEl);
    }

    // Klassen zuruecksetzen
    feedbackEl.className = 'aufgabe__feedback aufgabe__feedback--visible aufgabe__feedback--' + type;
    feedbackEl.textContent = message;

    // Animation hinzufuegen
    if (type === 'success') {
      element.classList.add('animate-success');
    } else if (type === 'error') {
      element.classList.add('animate-error');
    }

    // Animation nach Ablauf entfernen
    setTimeout(function () {
      element.classList.remove('animate-success', 'animate-error');
    }, 800);

    // Fokus auf Feedback setzen (Barrierefreiheit)
    feedbackEl.focus();
  }

  // ========================================================================
  // 4. Utilities
  // ========================================================================

  var utils = {

    /**
     * Debounce-Funktion: Verzoegert Ausfuehrung bis Inaktivitaet.
     * @param {Function} fn – Zu verzoegernde Funktion
     * @param {number} ms – Wartezeit in Millisekunden
     * @returns {Function} Debounced Funktion
     */
    debounce: function (fn, ms) {
      var timer;
      return function () {
        var context = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(context, args);
        }, ms);
      };
    },

    /**
     * Generiert eine einfache eindeutige ID.
     * @returns {string} ID im Format "id-XXXXXXXXXX"
     */
    generateId: function () {
      return 'id-' + Math.random().toString(36).substring(2, 12);
    },

    /**
     * Mischt ein Array mit dem Fisher-Yates-Algorithmus.
     * Gibt eine neue Kopie zurueck (veraendert Original nicht).
     * @param {Array} arr – Eingabe-Array
     * @returns {Array} Gemischtes Array
     */
    shuffleArray: function (arr) {
      var shuffled = arr.slice();
      for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
      }
      return shuffled;
    },

    /**
     * Bereinigt einen String gegen XSS-Angriffe.
     * Ersetzt HTML-relevante Zeichen durch Entities.
     * @param {string} str – Eingabe-String
     * @returns {string} Bereinigter String
     */
    sanitizeHTML: function (str) {
      if (typeof str !== 'string') return '';
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
  };

  // ========================================================================
  // 5. Oeffentliche API
  // ========================================================================

  return {
    storage: storage,
    nav: nav,
    feedback: feedback,
    utils: utils
  };

})();
