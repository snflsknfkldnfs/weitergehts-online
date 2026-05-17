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
     * Loescht alle Escape-Game-Daten aus localStorage.
     * Entfernt nur Keys mit Prefix "escape-", nicht andere Daten.
     */
    clear: function () {
      try {
        var keysToRemove = [];
        for (var i = 0; i < localStorage.length; i++) {
          var key = localStorage.key(i);
          if (key && key.indexOf('escape-') === 0) {
            keysToRemove.push(key);
          }
        }
        for (var j = 0; j < keysToRemove.length; j++) {
          localStorage.removeItem(keysToRemove[j]);
        }
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

/* ==========================================================================
   LR – Lernraum-Module (Redesign-Spec v1.1)

   Auto-Bootstrap auf <body data-lernraum>. Beruehrt escape-engine.js NICHT.

   Namespaces:
     - LR.Status       Status-Vokabular + localStorage-Persistenz + Migration
     - LR.Glossar      Glossar-Lookup (norm | lp | prinzip)
     - LR.AnchorTag    Click-/Keyboard-Routing fuer .anchor-tag und .norm-tag
     - LR.Slideover    Slide-up-Modal mit a11y (Focus-Trap, Esc, Backdrop-Click)
     - LR.init()       Bootstrap aller obigen Module
   ========================================================================== */

var LR = (function () {
  'use strict';

  // ------------------------------------------------------------------------
  // Status – wg.lernraum.status.<id> + Migration aus mp_*_progress_v1
  // ------------------------------------------------------------------------

  var STATUS_KEY_PREFIX = 'wg.lernraum.status.';
  var VALID_STATUS = ['planned', 'open', 'work', 'repeat', 'sit'];

  function statusGet(id) {
    var raw = Core.storage.get(STATUS_KEY_PREFIX + id);
    if (!raw || typeof raw !== 'object') return null;
    return raw.status || null;
  }

  function statusSet(id, status) {
    if (VALID_STATUS.indexOf(status) === -1) {
      console.warn('[LR.Status.set] Ungueltiger Status:', status);
      return false;
    }
    return Core.storage.set(STATUS_KEY_PREFIX + id, {
      status: status,
      ts: Date.now()
    });
  }

  /**
   * Status-Schema-Migration (Spec §11.3, Antwort 13).
   * Liest alten Key {<id>: {good, meh, fail}} und mappt auf Spec-Status.
   * Alter Key bleibt PARALLEL erhalten (Rollback + Drill-Detail-Counts).
   *
   * @param {string} oldKey – z.B. "mp_n18_mathe_ke_progress_v1"
   */
  function statusMigrate(oldKey) {
    var migrationFlag = 'wg.lernraum.migrated.' + oldKey;
    if (Core.storage.get(migrationFlag)) return; // idempotent

    var old = Core.storage.get(oldKey);
    if (!old || typeof old !== 'object' || Object.keys(old).length === 0) {
      Core.storage.set(migrationFlag, { ts: Date.now(), count: 0 });
      return;
    }

    var migrated = 0;
    Object.keys(old).forEach(function (id) {
      var r = old[id] || {};
      var good = r.good || 0;
      var meh = r.meh || 0;
      var fail = r.fail || 0;
      var status;

      if (good === 0 && meh === 0 && fail === 0) {
        status = 'open';
      } else if (fail > Math.max(good, meh)) {
        status = 'work';
      } else if (meh > good) {
        status = 'repeat';
      } else {
        status = 'sit';
      }

      // Nicht ueberschreiben, falls schon manuell gesetzt
      if (!Core.storage.get(STATUS_KEY_PREFIX + id)) {
        statusSet(id, status);
        migrated++;
      }
    });

    Core.storage.set(migrationFlag, { ts: Date.now(), count: migrated });
  }

  // ------------------------------------------------------------------------
  // Glossar – Fetch + Cache der 3 glossar-*.json
  // ------------------------------------------------------------------------

  var glossarCache = { norm: null, lp: null, prinzip: null };
  var glossarPromises = { norm: null, lp: null, prinzip: null };

  function glossarPath(type) {
    // Relative path vom HTML aus; auto-detection ueber Body-Attribut
    var override = document.body && document.body.getAttribute('data-glossar-base');
    var base = override || '/assets/data/';
    return base + 'glossar-' + type + '.json';
  }

  function glossarLoad(type) {
    if (['norm', 'lp', 'prinzip'].indexOf(type) === -1) {
      return Promise.reject(new Error('unbekannter Glossar-Typ: ' + type));
    }
    if (glossarCache[type]) return Promise.resolve(glossarCache[type]);
    if (glossarPromises[type]) return glossarPromises[type];

    glossarPromises[type] = fetch(glossarPath(type))
      .then(function (resp) {
        if (!resp.ok) throw new Error('Glossar ' + type + ' nicht erreichbar (HTTP ' + resp.status + ')');
        return resp.json();
      })
      .then(function (data) {
        glossarCache[type] = data;
        return data;
      })
      .catch(function (err) {
        console.warn('[LR.Glossar.load] ' + type + ' failed:', err.message);
        glossarCache[type] = {};
        return {};
      });

    return glossarPromises[type];
  }

  function glossarLookup(type, ref) {
    return glossarLoad(type).then(function (data) {
      return data[ref] || null;
    });
  }

  // ------------------------------------------------------------------------
  // Slideover – Slide-up-Modal mit a11y
  // ------------------------------------------------------------------------

  var slideoverState = {
    el: null,
    backdrop: null,
    lastTrigger: null,
    isOpen: false
  };

  function slideoverEnsure() {
    if (slideoverState.el) return;

    var backdrop = document.createElement('div');
    backdrop.className = 'slideover-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    backdrop.addEventListener('click', slideoverClose);

    var el = document.createElement('aside');
    el.className = 'slideover';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-hidden', 'true');
    el.setAttribute('tabindex', '-1');
    el.innerHTML =
      '<div class="slideover-head">' +
        '<div>' +
          '<span class="slideover-title" data-slideover-title></span> ' +
          '<span class="slideover-badge" data-slideover-badge></span>' +
        '</div>' +
        '<button type="button" class="slideover-close" data-slideover-close aria-label="Schliessen">Schliessen [ESC]</button>' +
      '</div>' +
      '<div class="slideover-body" data-slideover-body></div>' +
      '<div class="slideover-sources" data-slideover-sources hidden></div>';

    document.body.appendChild(backdrop);
    document.body.appendChild(el);

    el.querySelector('[data-slideover-close]').addEventListener('click', slideoverClose);

    slideoverState.el = el;
    slideoverState.backdrop = backdrop;
  }

  var TYPE_BADGES = {
    norm:    'Schulrecht-Norm',
    lp:      'Lehrplan-Erwartung',
    prinzip: 'Didaktisches Prinzip'
  };

  function slideoverOpen(type, ref, trigger) {
    slideoverEnsure();

    glossarLookup(type, ref).then(function (entry) {
      var el = slideoverState.el;
      el.querySelector('[data-slideover-title]').textContent = ref;
      el.querySelector('[data-slideover-badge]').textContent = TYPE_BADGES[type] || type;

      var body = el.querySelector('[data-slideover-body]');
      var sourcesEl = el.querySelector('[data-slideover-sources]');
      body.innerHTML = '';
      sourcesEl.hidden = true;
      sourcesEl.innerHTML = '';

      if (!entry) {
        body.appendChild(document.createTextNode('Kein Glossar-Eintrag fuer "' + ref + '" gefunden.'));
      } else {
        renderEntry(body, sourcesEl, entry, type);
      }

      slideoverState.lastTrigger = trigger || document.activeElement;
      slideoverState.backdrop.setAttribute('aria-hidden', 'false');
      el.setAttribute('aria-hidden', 'false');
      slideoverState.isOpen = true;
      document.body.classList.add('no-scroll');

      setTimeout(function () { el.focus(); }, 50);
    });
  }

  function renderEntry(body, sourcesEl, entry, type) {
    var title = entry.title;
    if (title && title !== entry.key) {
      var titleP = document.createElement('p');
      var strong = document.createElement('strong');
      strong.textContent = title;
      titleP.appendChild(strong);
      body.appendChild(titleP);
    }

    if (type === 'norm') {
      var defP = document.createElement('p');
      defP.textContent = entry.definition || '';
      body.appendChild(defP);
    } else if (type === 'lp') {
      if (entry.ke_liste && entry.ke_liste.length) {
        var ul = document.createElement('ul');
        ul.style.listStyle = 'disc';
        ul.style.paddingLeft = '24px';
        ul.style.marginBottom = '12px';
        entry.ke_liste.forEach(function (ke) {
          var li = document.createElement('li');
          li.style.marginBottom = '8px';
          li.textContent = ke;
          ul.appendChild(li);
        });
        body.appendChild(ul);
      }
      if (entry.inhalte) {
        var inh = document.createElement('p');
        var cap = document.createElement('span');
        cap.className = 'mono-cap';
        cap.textContent = 'Inhalte';
        cap.style.marginRight = '8px';
        inh.appendChild(cap);
        inh.appendChild(document.createTextNode(entry.inhalte));
        body.appendChild(inh);
      }
    } else if (type === 'prinzip') {
      var defP2 = document.createElement('div');
      // Sicheres Rendering: definition als Plain-Text mit <strong>-Umsetzung
      defP2.innerHTML = renderInlineMarkup(entry.definition || '');
      body.appendChild(defP2);

      if (entry.cross_refs && entry.cross_refs.length) {
        var crossWrap = document.createElement('p');
        var crossCap = document.createElement('span');
        crossCap.className = 'mono-cap';
        crossCap.textContent = 'Querverweise';
        crossCap.style.marginRight = '8px';
        crossWrap.appendChild(crossCap);
        entry.cross_refs.forEach(function (ref, idx) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'anchor-tag';
          btn.setAttribute('data-type', 'prinzip');
          btn.setAttribute('data-ref', ref);
          btn.textContent = ref;
          btn.style.marginRight = '4px';
          btn.addEventListener('click', function () {
            slideoverOpen('prinzip', ref, btn);
          });
          crossWrap.appendChild(btn);
        });
        body.appendChild(crossWrap);
      }
    }

    if (entry.quellen && entry.quellen.length) {
      sourcesEl.hidden = false;
      sourcesEl.textContent = 'Quellen: ' + entry.quellen.join(' · ');
    }
  }

  function renderInlineMarkup(s) {
    // Erlaubt **bold** → <strong>; Plain-Text-Escape danach.
    var escaped = Core.utils.sanitizeHTML(s);
    return escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  }

  function slideoverClose() {
    if (!slideoverState.isOpen) return;
    slideoverState.el.setAttribute('aria-hidden', 'true');
    slideoverState.backdrop.setAttribute('aria-hidden', 'true');
    slideoverState.isOpen = false;
    document.body.classList.remove('no-scroll');
    if (slideoverState.lastTrigger && typeof slideoverState.lastTrigger.focus === 'function') {
      slideoverState.lastTrigger.focus();
    }
  }

  // ------------------------------------------------------------------------
  // AnchorTag – Click-/Keyboard-Routing
  // ------------------------------------------------------------------------

  function anchorTagBind(root) {
    root = root || document;

    // Generalisierte .anchor-tag (Spec §12)
    root.querySelectorAll('.anchor-tag[data-ref]').forEach(function (btn) {
      if (btn.__lrBound) return;
      btn.__lrBound = true;
      var type = btn.getAttribute('data-type') || 'norm';
      var ref = btn.getAttribute('data-ref');
      btn.addEventListener('click', function (ev) {
        ev.preventDefault();
        slideoverOpen(type, ref, btn);
      });
    });

    // Legacy .norm-tag (Original-Spec §4)
    root.querySelectorAll('.norm-tag[data-norm]').forEach(function (btn) {
      if (btn.__lrBound) return;
      btn.__lrBound = true;
      var ref = btn.getAttribute('data-norm');
      btn.addEventListener('click', function (ev) {
        ev.preventDefault();
        slideoverOpen('norm', ref, btn);
      });
    });
  }

  // ------------------------------------------------------------------------
  // Esc-Schliessen + Fokus-Trap (a11y, Spec §04)
  // ------------------------------------------------------------------------

  function bindGlobalKeys() {
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && slideoverState.isOpen) {
        ev.preventDefault();
        slideoverClose();
      }
      if (ev.key === 'Tab' && slideoverState.isOpen) {
        var el = slideoverState.el;
        var focusables = el.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (ev.shiftKey && document.activeElement === first) {
          ev.preventDefault(); last.focus();
        } else if (!ev.shiftKey && document.activeElement === last) {
          ev.preventDefault(); first.focus();
        }
      }
    });
  }

  // ------------------------------------------------------------------------
  // Status-Render-Helpers (Dots + Bars in der DOM aktualisieren)
  // ------------------------------------------------------------------------

  function renderStatusElements(root) {
    root = root || document;
    root.querySelectorAll('[data-status-id]').forEach(function (el) {
      var id = el.getAttribute('data-status-id');
      var status = statusGet(id) || el.getAttribute('data-status-default') || 'open';
      el.setAttribute('data-status', status);
      var labelEl = el.querySelector('.status-label');
      if (labelEl) labelEl.textContent = statusLabel(status);
    });
  }

  function statusLabel(s) {
    return {
      planned: 'in Vorbereitung',
      open:    'offen',
      work:    'in Arbeit',
      repeat:  'wiederholt',
      sit:     'sitzt'
    }[s] || s;
  }

  // ------------------------------------------------------------------------
  // Bootstrap
  // ------------------------------------------------------------------------

  function init(opts) {
    opts = opts || {};
    if (!document.body || !document.body.hasAttribute('data-lernraum')) return;

    // Auto-Status-Migration (Antwort 13)
    var legacyKeys = opts.legacyStatusKeys || [
      'mp_n18_mathe_ke_progress_v1',
      'mp_n18_sk_ke_progress_v1'
    ];
    legacyKeys.forEach(statusMigrate);

    anchorTagBind(document);
    renderStatusElements(document);
    bindGlobalKeys();
  }

  // ------------------------------------------------------------------------
  // API
  // ------------------------------------------------------------------------

  return {
    init: init,
    Status: {
      get: statusGet,
      set: statusSet,
      migrate: statusMigrate,
      label: statusLabel,
      render: renderStatusElements,
      VALID: VALID_STATUS
    },
    Glossar: {
      load: glossarLoad,
      lookup: glossarLookup
    },
    AnchorTag: {
      bind: anchorTagBind
    },
    Slideover: {
      open: slideoverOpen,
      close: slideoverClose
    }
  };
})();

// Auto-Bootstrap, sobald Body steht
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { LR.init(); });
  } else {
    LR.init();
  }
}
