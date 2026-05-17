// ============================================================================
// lernraum.js — Lernraum-Redesign v1.1 Wiring fuer mkdocs-Skripte
//
// Laeuft im Material-Theme. Bindet:
//   1) Body-Attribute  <body data-lernraum data-fach="schulrecht">
//   2) Norm-Slideover  Click auf .norm-link oeffnet das gleiche Slideover-
//                      Modal wie auf den L2/L3-Pages. Tooltip bleibt.
//   3) Status-Recall   wenn der Nutzer aus dem L3-Hub kommt, kann hier
//                      kein Status gesetzt werden (mkdocs ist Lese-Material).
//
// core.js liegt unter /assets/js/core.js der Haupt-Site. Da mkdocs nur
// Files unter docs_dir bundlen darf, laden wir core.js dynamisch per
// absolute URL.
// ============================================================================

(function () {
  'use strict';

  // ---- 1. Body-Attribute -------------------------------------------------
  document.body.setAttribute('data-lernraum', '');
  document.body.setAttribute('data-fach', 'schulrecht');

  // ---- 2. core.js dynamisch laden ----------------------------------------
  // Vermeide doppeltes Laden bei navigation.instant (Material-SPA-Mode).
  function loadCoreJs(cb) {
    if (window.LR) { cb(); return; }
    var s = document.createElement('script');
    s.src = '/assets/js/core.js';
    s.async = false;
    s.onload = function () { cb(); };
    s.onerror = function () { console.warn('[lernraum] core.js konnte nicht geladen werden — Slideover deaktiviert.'); };
    document.head.appendChild(s);
  }

  // ---- 3. Norm-Link-Wiring -----------------------------------------------
  // hooks.py rendert: <a class="norm-link" href="https://..."><abbr title="...">Art. 56/2</abbr></a>
  // Wir lassen Hover-Tooltip + externer Link intakt; Click oeffnet Slideover.
  function bindNormLinks(root) {
    root = root || document;
    root.querySelectorAll('a.norm-link').forEach(function (a) {
      if (a.__lrBound) return;
      a.__lrBound = true;
      a.addEventListener('click', function (ev) {
        if (!window.LR || !LR.Slideover) return;          // graceful fallback
        if (ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.altKey) return;  // open-in-new-tab respektieren
        var abbr = a.querySelector('abbr');
        var ref  = (abbr ? abbr.textContent : a.textContent).trim();
        ev.preventDefault();
        LR.Slideover.open('norm', ref, a);
      });
    });
  }

  // Material-Theme nutzt navigation.instant: kein klassischer Reload zwischen Pages.
  // Nach jedem Page-Wechsel neu binden.
  function rebindAll() {
    bindNormLinks(document);
    if (window.LR && LR.AnchorTag) LR.AnchorTag.bind(document);
  }

  function init() {
    loadCoreJs(function () {
      rebindAll();
      if (typeof document$ !== 'undefined' && document$.subscribe) {
        // Material-Theme RxJS-Stream: feuert bei jeder Navigation
        document$.subscribe(function () { rebindAll(); });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
