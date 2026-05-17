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

  // ---- 4. Skript-Redesign V2 (Werkbank) ----------------------------------
  // Drei Handler: Vertiefung-Toggle, Reveal-Karten (Top-8 + Falle-Card),
  // Status-Dot pro Sub-Block-H2[data-status-key].

  var STATUS_CYCLE = ['open', 'work', 'repeat', 'sit'];

  function bindVertiefungToggle(root) {
    root = root || document;
    root.querySelectorAll('h1.section-kind-stoff').forEach(function (h) {
      if (h.__lrStoffBound) return;
      h.__lrStoffBound = true;
      h.addEventListener('click', function (ev) {
        // Klick auf Status-Dot soll nicht togglen
        if (ev.target.closest('.status-dot')) return;
        h.classList.toggle('is-open');
      });
    });
  }

  // a11y-helper: macht Element keyboard-aktivierbar (Enter/Space toggelt).
  function makeKeyboardActivatable(el) {
    if (el.__lrA11y) return;
    el.__lrA11y = true;
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        el.click();
      }
    });
  }

  function syncAriaExpanded(el, isOpen) {
    el.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  function bindRevealCards(root) {
    root = root || document;
    // ARIA + Tabindex pro Card (idempotent)
    root.querySelectorAll('.reveal-card').forEach(function (c) {
      makeKeyboardActivatable(c);
      syncAriaExpanded(c, c.dataset.reveal === 'open');
      var title = c.querySelector('.reveal-card__title');
      if (title && !c.getAttribute('aria-label')) {
        c.setAttribute('aria-label',
          'Lösung zu ' + title.textContent.trim().slice(0, 80) + ' ein- oder ausblenden');
      }
    });
    root.querySelectorAll('.falle-card').forEach(function (f) {
      makeKeyboardActivatable(f);
      syncAriaExpanded(f, f.dataset.open === 'true');
      var q = f.querySelector('.falle-frage');
      var fa = f.getAttribute('data-fa-id') || '';
      if (q && !f.getAttribute('aria-label')) {
        f.setAttribute('aria-label',
          fa + ' — Antwort ein- oder ausblenden: ' + q.textContent.trim().slice(0, 90));
      }
    });
    // Delegated click handler — funktioniert auch für später injizierte Karten
    if (document.__lrRevealBound) return;
    document.__lrRevealBound = true;
    document.addEventListener('click', function (ev) {
      var card = ev.target.closest('.reveal-card');
      if (card) {
        var open = card.dataset.reveal === 'open';
        card.dataset.reveal = open ? 'closed' : 'open';
        syncAriaExpanded(card, !open);
        return;
      }
      var falle = ev.target.closest('.falle-card');
      if (falle) {
        var fopen = falle.dataset.open === 'true';
        falle.dataset.open = fopen ? 'false' : 'true';
        syncAriaExpanded(falle, !fopen);
        return;
      }
    });
  }

  // Sub-Block Collapse-Toggle: Click auf H3-Header in .lr-subblock togglt
  // data-collapsed auf parent .lr-subblock. Mit ARIA + Keyboard-Support.
  function bindSubblockCollapse(root) {
    root = root || document;
    root.querySelectorAll('.lr-subblock > h3[data-status-key]').forEach(function (h) {
      if (h.__lrCollapseBound) return;
      h.__lrCollapseBound = true;
      makeKeyboardActivatable(h);
      var sb = h.parentElement;
      syncAriaExpanded(h, sb.getAttribute('data-collapsed') !== 'true');
      // Verlinke H3 mit Subblock-Body via aria-controls (synthetische ID)
      if (!sb.id) sb.id = 'lr-sb-' + (h.getAttribute('data-status-key') || Math.random().toString(36).slice(2, 8));
      h.setAttribute('aria-controls', sb.id);
      h.addEventListener('click', function (ev) {
        if (ev.target.closest('.status-dot')) return;
        var cur = sb.getAttribute('data-collapsed') === 'true';
        sb.setAttribute('data-collapsed', cur ? 'false' : 'true');
        syncAriaExpanded(h, cur); // wenn vorher collapsed (cur=true), ist jetzt offen
      });
    });
  }

  var STATUS_LABEL = {
    open: 'offen', work: 'in Arbeit', repeat: 'wiederholt', sit: 'sitzt'
  };

  function bindStatusDots(root) {
    root = root || document;
    // H3 (Sub-Block, nach Downgrade) + Fallback H2 (alt) ansprechen
    root.querySelectorAll('h3[data-status-key], h2[data-status-key]').forEach(function (h) {
      if (h.__lrStatusBound) return;
      h.__lrStatusBound = true;
      var key = 'wg.lernraum.status.' + h.getAttribute('data-status-key');
      var cur = (window.localStorage && localStorage.getItem(key)) || 'open';
      var dot = document.createElement('span');
      dot.className = 'status-dot status-dot--' + cur;
      dot.setAttribute('data-status-storage-key', key);
      dot.setAttribute('role', 'button');
      dot.setAttribute('tabindex', '0');
      dot.setAttribute('aria-live', 'polite');
      dot.setAttribute('aria-label', 'Lernstand: ' + (STATUS_LABEL[cur] || cur) + ' — Klick wechselt');
      dot.title = 'Lernstand: offen → in Arbeit → wiederholt → sitzt';
      function cycle(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        var current = localStorage.getItem(key) || 'open';
        var idx = STATUS_CYCLE.indexOf(current);
        var next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
        localStorage.setItem(key, next);
        dot.className = 'status-dot status-dot--' + next;
        dot.setAttribute('aria-label', 'Lernstand: ' + (STATUS_LABEL[next] || next) + ' — Klick wechselt');
      }
      dot.addEventListener('click', cycle);
      dot.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') {
          cycle(e);
        }
      });
      h.insertBefore(dot, h.firstChild);
    });
  }

  // Expand/Collapse-all-Toolbar oberhalb dem ersten Sub-Block. Idempotent.
  function injectExpandCollapseToolbar(root) {
    root = root || document;
    if (root.querySelector('.lr-subblock-toolbar')) return;
    var firstSb = root.querySelector('.lr-subblock');
    if (!firstSb) return;
    var bar = document.createElement('div');
    bar.className = 'lr-subblock-toolbar';
    bar.innerHTML =
      '<button type="button" data-act="expand" aria-label="Alle Sub-Blöcke öffnen">alle öffnen</button>' +
      '<button type="button" data-act="collapse" aria-label="Alle Sub-Blöcke schließen">alle schließen</button>';
    bar.addEventListener('click', function (e) {
      var act = e.target.getAttribute('data-act');
      if (!act) return;
      document.querySelectorAll('.lr-subblock').forEach(function (s) {
        s.setAttribute('data-collapsed', act === 'collapse' ? 'true' : 'false');
        var h = s.querySelector('h3[data-status-key]');
        if (h) syncAriaExpanded(h, act !== 'collapse');
      });
    });
    firstSb.parentNode.insertBefore(bar, firstSb);
  }

  // Material-Theme nutzt navigation.instant: kein klassischer Reload zwischen Pages.
  // Nach jedem Page-Wechsel neu binden.
  function rebindAll() {
    bindNormLinks(document);
    if (window.LR && LR.AnchorTag) LR.AnchorTag.bind(document);
    bindVertiefungToggle(document);
    bindRevealCards(document);
    bindStatusDots(document);
    bindSubblockCollapse(document);
    injectExpandCollapseToolbar(document);
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
