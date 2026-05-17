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
  // hooks.py rendert verschiedene Patterns:
  //   <a class="norm-link"><abbr title="BayEUG Art. 56/2 — ...">Art. 56/2</abbr></a>
  //   <a class="norm-link"><abbr title="BaySchO § 23 — ...">23</abbr></a>      ← bare-Nummer!
  //   <a class="norm-link"><abbr title="Bayerisches Gesetz...">BayEUG</abbr></a> ← Abkuerzung
  //
  // Strategie: 1) direkter Glossar-Lookup, 2) Varianten via Title-Praefix,
  //            3) Fallback: Slideover mit Title-Inhalt als Definition.
  function bindNormLinks(root) {
    root = root || document;
    root.querySelectorAll('a.norm-link').forEach(function (a) {
      if (a.__lrBound) return;
      a.__lrBound = true;
      a.addEventListener('click', function (ev) {
        if (!window.LR || !LR.Slideover) return;
        if (ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.altKey) return;
        ev.preventDefault();
        openNormSlideover(a);
      });
    });
  }

  // Versucht mehrere Varianten + Fallback. Asynchron, weil Glossar lazy.
  function openNormSlideover(a) {
    var abbr = a.querySelector('abbr');
    var refText = (abbr ? abbr.textContent : a.textContent).trim();
    var title = abbr ? (abbr.getAttribute('title') || '') : '';

    // Title-Parser: "BayEUG Art. 56/2 — Wortlaut..." -> {label: "BayEUG Art. 56/2", body: "Wortlaut..."}
    var titleParts = splitTitle(title);

    // Kandidaten-Liste fuer Glossar-Lookup
    var candidates = buildKeyCandidates(refText, titleParts.label);

    tryLookup(candidates, 0, function (foundKey) {
      if (foundKey) {
        LR.Slideover.open('norm', foundKey, a);
      } else {
        // Fallback: synthetisches Slideover aus abbr.title
        openSyntheticSlideover(titleParts.label || refText, titleParts.body, a);
      }
    });
  }

  function splitTitle(title) {
    if (!title) return { label: '', body: '' };
    var m = title.match(/^(.+?)\s+[—–-]\s+(.+)$/);
    if (m) return { label: m[1].trim(), body: m[2].trim() };
    return { label: title, body: '' };
  }

  function buildKeyCandidates(refText, label) {
    var c = [];
    if (refText) c.push(refText);
    if (label && label !== refText) c.push(label);
    // refText="23", label="BaySchO § 23"  ->  "§ 23 BaySchO"  (Glossar-Konvention)
    if (label) {
      var m = label.match(/^([A-Za-zÄÖÜäöü]+)\s+(§|Art\.)\s+([\d/a-z]+)/);
      if (m) {
        var norm = m[1], sym = m[2], nr = m[3];
        c.push(sym + ' ' + nr + ' ' + norm);   // "§ 23 BaySchO"
        c.push(sym + ' ' + nr);                // "§ 23"
        c.push(norm + ' ' + sym + ' ' + nr);   // "BaySchO § 23"
        c.push(sym + ' ' + nr.split('/')[0] + ' ' + norm);  // "§ 23 BaySchO" (ohne /Abs.)
        if (sym === 'Art.') c.push('BV ' + sym + ' ' + nr); // BV-Prefix bei Art.
      }
    }
    // refText="Art. 35", BayEUG-Suffix probieren
    var r = refText.match(/^(Art\.|§)\s+([\d/a-z]+)$/);
    if (r) {
      c.push(r[1] + ' ' + r[2] + ' BayEUG');
      c.push('BV ' + r[1] + ' ' + r[2]);
    }
    return Array.from(new Set(c));  // de-dup
  }

  function tryLookup(candidates, idx, cb) {
    if (idx >= candidates.length) { cb(null); return; }
    LR.Glossar.lookup('norm', candidates[idx]).then(function (entry) {
      if (entry) cb(candidates[idx]);
      else tryLookup(candidates, idx + 1, cb);
    });
  }

  // Synthetisches Slideover wenn kein Glossar-Eintrag — nutzt abbr.title-Body.
  // Inject in Glossar-Cache und dann ueber normalen open()-Pfad rendern.
  function openSyntheticSlideover(label, body, trigger) {
    var key = '__abbr__' + label;
    var entry = {
      key: label,
      title: label,
      definition: body || '(Kein erweiterter Glossar-Eintrag vorhanden — nur Tooltip-Inhalt)',
      type: 'norm'
    };
    if (LR.Glossar && LR.Glossar.inject) {
      LR.Glossar.inject('norm', key, entry);
      LR.Slideover.open('norm', key, trigger);
    } else {
      // core.js zu alt (kein inject) — graceful fallback: nur Browser-Tooltip
      console.warn('[lernraum] LR.Glossar.inject fehlt — kein Slideover-Fallback moeglich.');
    }
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
