// V3 Werkbank · Vanilla JS Renderer (no React) · shared across all MPs
// Consumes window.MODULE + window.MODULE_BODIES, builds DOM, wires interactivity.
// Module-id-namespaced localStorage so different MPs don't collide.

(function () {
  'use strict';
  const d = window.MODULE || window.MP05; // backwards-compat fallback
  if (!d) { console.error('No module data loaded (window.MODULE missing)'); return; }
  const bodies = window.MODULE_BODIES || window.MP05_BODIES || {};

  // ─── DOM Helpers ─────────────────────────────────────────────────────────
  const h = (tag, attrs, ...children) => {
    const el = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'class') el.className = attrs[k];
      else if (k === 'html') el.innerHTML = attrs[k];
      else if (k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
      else if (k === 'data') for (const dk in attrs[k]) el.dataset[dk] = attrs[k][dk];
      else if (k === 'aria') for (const ak in attrs[k]) el.setAttribute('aria-' + ak, attrs[k][ak]);
      else el.setAttribute(k, attrs[k]);
    }
    const toNode = (c) => {
      if (c instanceof Node) return c;
      return document.createTextNode(String(c));
    };
    for (const c of children) {
      if (c == null || c === false) continue;
      if (Array.isArray(c)) c.forEach(x => { if (x != null && x !== false) el.appendChild(toNode(x)); });
      else el.appendChild(toNode(c));
    }
    return el;
  };

  // ─── Status Persistence ──────────────────────────────────────────────────
  const STATUS = ['open', 'work', 'repeat', 'sit'];
  const STATUS_LABEL = { open: 'offen', work: 'in Arbeit', repeat: 'wiederholt', sit: 'sitzt' };
  const statusKey = id => `wg.lernraum.status.${d.id}.${id}`;
  // In-memory fallback for private browsing / storage-quota-exceeded
  const statusMem = Object.create(null);
  const getStatus = id => {
    try { return localStorage.getItem(statusKey(id)) || statusMem[id] || 'open'; }
    catch (_) { return statusMem[id] || 'open'; }
  };
  const setStatus = (id, s) => {
    statusMem[id] = s;
    try { localStorage.setItem(statusKey(id), s); } catch (_) { /* private mode */ }
    refreshAggregate();
    refreshTOCDot(id);
    announce('Lernstand ' + id + ': ' + STATUS_LABEL[s]);
  };
  function announce(msg) {
    const node = document.getElementById('sr-announcer');
    if (!node) return;
    node.textContent = '';
    setTimeout(() => { node.textContent = msg; }, 30);
  }
  const cycleStatus = id => {
    const cur = getStatus(id);
    const next = STATUS[(STATUS.indexOf(cur) + 1) % STATUS.length];
    setStatus(id, next);
    return next;
  };

  // ─── Status Dot (real <button>) ──────────────────────────────────────────
  const statusDot = (id) => {
    const cur = getStatus(id);
    const el = h('button', {
      class: 'status-dot status-dot--' + cur,
      type: 'button',
      'aria-label': 'Lernstand: ' + STATUS_LABEL[cur] + ' — klick wechselt',
      title: 'Lernstand: offen → in Arbeit → wiederholt → sitzt',
    });
    const toggle = (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      const next = cycleStatus(id);
      el.className = 'status-dot status-dot--' + next;
      el.setAttribute('aria-label', 'Lernstand: ' + STATUS_LABEL[next] + ' — klick wechselt');
    };
    el.addEventListener('click', toggle);
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') toggle(e);
    });
    return el;
  };

  // ─── Norm Tag (klickbar → Slideover) ─────────────────────────────────────
  const normTag = (name) => h('button', {
    class: 'norm-tag',
    type: 'button',
    'aria-label': 'Norm-Wortlaut: ' + name,
    onclick: () => openSlideover(name),
  }, name);

  // ─── Status Bar (Aggregat) ───────────────────────────────────────────────
  function aggregateStatuses() {
    const ids = [
      ...d.pflichtwissen.map(c => c.id),
      ...d.fallen.map(f => f.id),
      ...d.faelle.map(f => f.id),
      ...(d.vertiefung || []).map(v => v.id),
    ];
    const counts = { sit: 0, repeat: 0, work: 0, open: 0 };
    ids.forEach(id => {
      const s = getStatus(id);
      if (counts[s] !== undefined) counts[s]++;
      else counts.open++;
    });
    return counts;
  }
  const statusBar = () => {
    const c = aggregateStatuses();
    const total = c.sit + c.repeat + c.work + c.open;
    const pct = (n) => total ? (n / total * 100) + '%' : '0%';
    const bar = h('div', { class: 'status-bar' },
      h('div', { class: 'status-bar__sit', style: 'width:' + pct(c.sit) }),
      h('div', { class: 'status-bar__repeat', style: 'width:' + pct(c.repeat) }),
      h('div', { class: 'status-bar__work', style: 'width:' + pct(c.work) }),
      h('div', { class: 'status-bar__open', style: 'width:' + pct(c.open) }),
    );
    const legend = h('div', { class: 'status-bar-legend' },
      h('span', null, h('b', null, c.sit), 'sitzen'),
      h('span', null, h('b', null, c.repeat), 'wiederholt'),
      h('span', null, h('b', null, c.work), 'wackeln'),
      h('span', null, h('b', null, c.open), 'offen'),
    );
    return h('div', null, bar, legend);
  };
  let refreshAggregate = () => {};

  // ─── Mono Cap ────────────────────────────────────────────────────────────
  const monoCap = (text, variant) => h('span', {
    class: 'mono-cap' + (variant ? ' mono-cap--' + variant : '')
  }, text);
  // Heading-tagged mono-cap (semantic h2/h3) — visual identical via shared CSS
  const monoH = (tag, text, variant, id) => {
    const attrs = { class: 'mono-cap mono-h' + (variant ? ' mono-cap--' + variant : '') };
    if (id) attrs.id = id;
    return h(tag, attrs, text);
  };

  // ─── Skript-Header ──────────────────────────────────────────────────────
  const renderHeader = () => h('header', { class: 'skript-header' },
    h('div', { class: 'skript-header__id' },
      h('span', { class: 'mono-cap' }, d.id.toUpperCase()),
      h('span', { class: 'mono-cap' }, d.zalgm),
    ),
    h('div', { class: 'skript-header__main' },
      h('div', { class: 'skript-header__status-row' },
        h('span', { class: 'mono-cap mono-cap--ink' }, 'STATUS · IN BEARBEITUNG'),
        h('span', { class: 'dot-sep' }, '·'),
        monoCap(d.schwerpunkt.join(' · ')),
      ),
      h('h1', null, d.titel, h('br'), h('span', { class: 'accent' }, d.titel2)),
      h('div', { class: 'skript-header__abriss' }, d.abriss),
    ),
    h('div', { class: 'skript-header__deck' },
      monoCap('Lerndeck · ' + d.deck.cards + ' Karten'),
      h('div', { class: 'deck-box' },
        h('div', { class: 'deck-box__row' }, h('span', null, 'Karten gesamt'), h('b', null, d.deck.cards)),
        h('div', { class: 'deck-box__row' }, h('span', null, 'Norm-Ebenen'), h('b', null, d.deck.normebenen)),
        h('div', { class: 'deck-box__row' }, h('span', null, 'Hochprior'), h('b', null, d.deck.hochprior)),
        h('div', { class: 'deck-box__row' }, h('span', null, 'Fallen'), h('b', null, d.deck.fallen)),
      ),
      h('button', { class: 'print-btn', type: 'button', 'aria-label': 'Druckansicht öffnen', onclick: () => window.print() }, '↓ Spickzettel'),
    ),
  );

  // ─── Top-Row (Kürze + Kartografie) ───────────────────────────────────────
  const renderTopRow = () => h('section', { class: 'top-row' },
    h('section', null,
      monoH('h2', 'In aller Kürze', 'accent'),
      h('ol', { class: 'kurz-list' },
        ...d.kurz.map((s, i) => h('li', null,
          h('span', { class: 'num' }, String(i + 1).padStart(2, '0')),
          h('span', { class: 'txt' }, s),
        )),
      ),
    ),
    h('section', null,
      monoH('h2', 'Norm-Kartografie · 5 Ebenen', 'accent'),
      h('div', null, ...d.kartografie.map(r => h('div', { class: 'kartografie-row' },
        h('span', { class: 'ebene' }, r.ebene + '.'),
        h('span', null,
          h('div', { class: 'bez' }, r.bez),
          h('div', { class: 'sub' }, r.sub),
          h('div', { class: 'normen' }, ...r.normen.map(n => normTag(n))),
        ),
      ))),
    ),
  );

  // ─── Reveal-Card (Pflichtwissen) ─────────────────────────────────────────
  const revealCard = (card) => {
    const el = h('div', {
      class: 'reveal-card',
      data: { state: 'closed', id: card.id },
      role: 'button',
      tabindex: '0',
      'aria-expanded': 'false',
      'aria-label': card.id + ' · ' + card.titel + ' — Lösung ein-/ausblenden',
    });
    el.appendChild(h('div', { class: 'reveal-card__top' },
      monoCap(card.id + ' · ' + card.titel, 'accent'),
      statusDot(card.id),
    ));
    el.appendChild(h('div', { class: 'reveal-card__frage' }, renderInline(card.frage)));
    el.appendChild(h('div', { class: 'reveal-card__antwort' }, renderInline(card.antwort)));
    el.appendChild(h('div', { class: 'reveal-card__foot' },
      normTag(card.norm),
      h('span', { class: 'reveal-card__hint', 'aria-hidden': 'true' }, 'Lösung zeigen'),
    ));
    const toggle = (ev) => {
      if (ev.target.closest('.norm-tag, .status-dot')) return;
      // Don't collapse when user just selected antwort text
      const sel = window.getSelection && window.getSelection();
      if (sel && sel.toString().length > 0) return;
      const open = el.dataset.state === 'open';
      el.dataset.state = open ? 'closed' : 'open';
      el.setAttribute('aria-expanded', open ? 'false' : 'true');
      el.querySelector('.reveal-card__hint').textContent = open ? 'Lösung zeigen' : 'Lösung verbergen';
    };
    el.addEventListener('click', toggle);
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.closest('.norm-tag, .status-dot')) return;
        e.preventDefault();
        toggle(e);
      }
    });
    return el;
  };

  // ─── Falle-Row ───────────────────────────────────────────────────────────
  const falleRow = (falle) => {
    const el = h('div', {
      class: 'fa-row',
      data: { open: 'false', id: falle.id },
      role: 'button',
      tabindex: '0',
      'aria-expanded': 'false',
      'aria-label': falle.id + ' · ' + falle.frage + ' — Antwort ein-/ausblenden',
    });
    el.appendChild(statusDot(falle.id));
    el.appendChild(h('span', { class: 'fa-row__id' }, falle.id));
    el.appendChild(h('div', null,
      h('div', { class: 'fa-row__frage' }, renderInline(falle.frage)),
      h('div', { class: 'fa-row__antwort' }, renderInline(falle.antwort)),
    ));
    el.appendChild(h('span', { class: 'fa-row__chevron' }, '›'));
    const toggle = (ev) => {
      if (ev.target.closest('.status-dot')) return;
      const open = el.dataset.open === 'true';
      el.dataset.open = open ? 'false' : 'true';
      el.setAttribute('aria-expanded', open ? 'false' : 'true');
    };
    el.addEventListener('click', toggle);
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.closest('.status-dot')) return;
        e.preventDefault();
        toggle(e);
      }
    });
    return el;
  };

  // ─── Fall-Card (Fallbeispiel) ────────────────────────────────────────────
  const fallCard = (fall) => {
    const el = h('div', { class: 'fall-card', data: { id: fall.id } });
    el.appendChild(h('div', { class: 'fall-card__head' },
      h('div', { class: 'fall-card__head-left' },
        statusDot(fall.id),
        monoCap(fall.id + ' · Fall', 'accent'),
      ),
      monoCap('verdeckt'),
    ));
    el.appendChild(h('h3', { class: 'fall-card__title' }, fall.titel));
    el.appendChild(h('div', { class: 'fall-card__sachverhalt' }, renderInline(fall.sachverhalt)));

    const panelKnackId = 'pnl-knack-' + fall.id;
    const panelAntwId = 'pnl-antw-' + fall.id;
    const btnKnack = h('button', {
      class: 'fall-card__btn',
      type: 'button',
      data: { on: 'false' },
      'aria-expanded': 'false',
      'aria-controls': panelKnackId,
    },
      monoCap('Knackpunkte'),
      h('span', { class: 'hint', 'aria-hidden': 'true' }, 'aufdecken'),
    );
    const btnAntw = h('button', {
      class: 'fall-card__btn',
      type: 'button',
      data: { on: 'false' },
      'aria-expanded': 'false',
      'aria-controls': panelAntwId,
    },
      monoCap('Antwortkette'),
      h('span', { class: 'hint', 'aria-hidden': 'true' }, 'aufdecken'),
    );
    el.appendChild(h('div', { class: 'fall-card__btns' }, btnKnack, btnAntw));

    const panelKnack = h('div', { class: 'fall-card__panel', id: panelKnackId, data: { on: 'false' } },
      h('ol', null, ...fall.knackpunkte.map(k => h('li', null, renderInline(k)))),
    );
    const panelAntw = h('div', { class: 'fall-card__panel', id: panelAntwId, data: { on: 'false' } },
      h('div', { class: 'antwortkette' }, renderInline(fall.antwortkette)),
    );
    el.appendChild(panelKnack);
    el.appendChild(panelAntw);

    const togglePanel = (btn, panel, hintShown, hintHidden) => {
      const on = btn.dataset.on === 'true';
      btn.dataset.on = on ? 'false' : 'true';
      panel.dataset.on = on ? 'false' : 'true';
      btn.setAttribute('aria-expanded', on ? 'false' : 'true');
      btn.querySelector('.hint').textContent = on ? hintHidden : hintShown;
    };
    btnKnack.addEventListener('click', () => togglePanel(btnKnack, panelKnack, 'verdecken', 'aufdecken'));
    btnAntw.addEventListener('click', () => togglePanel(btnAntw, panelAntw, 'verdecken', 'aufdecken'));

    return el;
  };

  // ─── TOC Mini-Status-Dot (read-only, syncs via refreshTOCDot) ────────────
  const miniStatusDot = (id) => {
    const cur = getStatus(id);
    return h('span', {
      class: 'toc-mini-dot toc-mini-dot--' + cur,
      'aria-hidden': 'true',
      data: { id: id },
    });
  };
  function refreshTOCDot(id) {
    const dot = document.querySelector('.toc-mini-dot[data-id="' + CSS.escape(id) + '"]');
    if (!dot) return;
    dot.className = 'toc-mini-dot toc-mini-dot--' + getStatus(id);
  }

  // ─── TOC (linke Spalte, sticky + scrollspy) ──────────────────────────────
  const renderTOC = () => {
    const nav = h('nav', { class: 'werkbank__toc', 'aria-label': 'Stoff-Navigation' });
    const sticky = h('div', { class: 'toc-sticky' });
    sticky.appendChild(h('h2', { class: 'mono-cap mono-cap--ink mono-h toc-heading' }, 'Stoff-Navigation'));
    const list = h('ol', { class: 'toc-list' });
    d.vertiefung.forEach(blk => {
      const items = bodies[blk.id] || [];
      const li = h('li', { class: 'toc-li' });
      const topLink = h('a', {
        class: 'toc-link toc-link--top',
        href: '#' + blk.id,
        data: { target: blk.id },
      },
        miniStatusDot(blk.id),
        h('span', { class: 'toc-kuerzel' }, blk.kuerzel),
        h('span', { class: 'toc-titel' }, blk.titel),
      );
      li.appendChild(topLink);
      let hIdx = 0;
      const sublist = h('ol', { class: 'toc-sublist' });
      items.forEach(it => {
        if (it.type === 'h') {
          const hId = blk.id + '-h' + hIdx;
          hIdx++;
          // Preserve Norm as secondary line (don't strip)
          const dotIdx = it.text.indexOf(' · ');
          const mainLabel = dotIdx >= 0 ? it.text.slice(0, dotIdx) : it.text;
          const normLabel = dotIdx >= 0 ? it.text.slice(dotIdx + 3) : null;
          const subA = h('a', {
            class: 'toc-link toc-link--sub',
            href: '#' + hId,
            data: { target: hId },
          }, h('span', { class: 'toc-sub-main' }, mainLabel));
          if (normLabel) subA.appendChild(h('span', { class: 'toc-sub-norm' }, normLabel));
          sublist.appendChild(h('li', null, subA));
        }
      });
      // Add Falle-Sprung as final sublist entry
      const hasWarn = items.some(it => it.type === 'warn');
      if (hasWarn) {
        sublist.appendChild(h('li', null,
          h('a', {
            class: 'toc-link toc-link--sub toc-link--falle',
            href: '#' + blk.id + '-warn',
            data: { target: blk.id + '-warn' },
          }, h('span', { class: 'toc-sub-main' }, '⚠ Falle')),
        ));
      }
      if (sublist.children.length) li.appendChild(sublist);
      list.appendChild(li);
    });
    sticky.appendChild(list);

    // Drill-Sektion: Sprung zu Aside-Sections
    const drillH = h('h3', { class: 'mono-cap mono-cap--ink mono-h toc-heading toc-heading--sub' }, 'Drill');
    sticky.appendChild(drillH);
    const drillList = h('ol', { class: 'toc-list toc-list--drill' });
    [
      { id: 'sec-pw', label: 'Pflichtwissen', count: d.pflichtwissen.length },
      { id: 'sec-fa', label: 'Falle-Atlas', count: d.fallen.length },
      { id: 'sec-fb', label: 'Fallbeispiele', count: d.faelle.length },
    ].forEach(s => {
      drillList.appendChild(h('li', null,
        h('a', {
          class: 'toc-link toc-link--drill',
          href: '#' + s.id,
          data: { target: s.id },
        },
          h('span', { class: 'toc-titel' }, s.label),
          h('span', { class: 'toc-count' }, s.count),
        ),
      ));
    });
    sticky.appendChild(drillList);
    nav.appendChild(sticky);
    return nav;
  };

  // Scrollspy: highlight TOC link of currently-visible section.
  // Guarded by matchMedia so it only runs when TOC is visible (≥1321px).
  function setupScrollspy() {
    if (!('IntersectionObserver' in window) || !('matchMedia' in window)) return;
    const mql = window.matchMedia('(min-width: 1401px)');
    let observer = null;
    let lastActiveId = null;
    const links = document.querySelectorAll('.toc-link');
    if (!links.length) return;

    const setActive = (id) => {
      if (id === lastActiveId) return;
      lastActiveId = id;
      links.forEach(l => {
        const isActive = l.dataset.target === id;
        l.classList.toggle('is-active', isActive);
        if (isActive) l.setAttribute('aria-current', 'location');
        else l.removeAttribute('aria-current');
      });
    };

    const start = () => {
      if (observer || !mql.matches) return;
      const targets = [];
      links.forEach(l => {
        const t = document.getElementById(l.dataset.target);
        if (t) targets.push(t);
      });
      const visible = new Map();
      observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        });
        if (visible.size) {
          let best = null, bestTop = Infinity;
          visible.forEach((_, id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const top = el.getBoundingClientRect().top;
            if (top < bestTop) { bestTop = top; best = id; }
          });
          if (best) setActive(best);
        } else if (!lastActiveId && targets.length) {
          // Initial activation: pick first subblock as default
          const firstSubblock = targets.find(t => /^A\d+$/.test(t.id));
          if (firstSubblock) setActive(firstSubblock.id);
        }
      }, { rootMargin: '-40px 0px -70% 0px', threshold: [0, 0.2, 0.5, 1] });
      targets.forEach(t => observer.observe(t));
      // Initial seed: first subblock active
      const firstSubblock = targets.find(t => /^A\d+$/.test(t.id));
      if (firstSubblock) setActive(firstSubblock.id);
    };
    const stop = () => {
      if (!observer) return;
      observer.disconnect();
      observer = null;
      lastActiveId = null;
      links.forEach(l => { l.classList.remove('is-active'); l.removeAttribute('aria-current'); });
    };
    start();
    mql.addEventListener('change', e => { e.matches ? start() : stop(); });
  }

  // ─── Vertiefung (Sub-Blocks A.1-A.4) ─────────────────────────────────────
  const renderVertiefung = () => {
    const main = h('article', { class: 'werkbank__main', id: 'vertiefung', tabindex: '-1' });
    main.appendChild(h('div', { class: 'section-header' },
      monoH('h2', 'Stoff · Referenz', 'accent'),
      h('span', { class: 'section-header__rule' }),
      monoCap('chunkbar nach Sub-Block'),
    ));
    main.appendChild(h('p', { class: 'vertiefung-intro' },
      'Die Vertiefung liegt offen — sie ist Nachschlagewerk, nicht Pflicht-Lese-Pfad. Lernende springen aus der rechten Aktiv-Abruf-Spalte zurück hierher, wenn eine Karte oder Falle hängt.',
    ));

    d.vertiefung.forEach(blk => {
      const sb = h('article', { class: 'subblock', id: blk.id, data: { id: blk.id } });
      sb.appendChild(h('div', { class: 'subblock__head' },
        h('div', { class: 'subblock__id' },
          statusDot(blk.id),
          monoCap(blk.kuerzel, 'accent'),
        ),
        h('h3', { class: 'subblock__title' }, blk.titel),
        normTag(blk.norm),
      ));
      sb.appendChild(h('div', { class: 'subblock__anriss' }, blk.anriss));
      if (blk.subblocks && blk.subblocks.length) {
        sb.appendChild(h('div', { class: 'subblock__cards-row' },
          ...blk.subblocks.map(s => h('span', { class: 'subblock__card-id' }, s.label + ' · ' + s.cards)),
        ));
      }
      const body = h('div', { class: 'subblock__body' });
      const items = bodies[blk.id] || [];
      let hIdx = 0;
      items.forEach(it => {
        if (it.type === 'h') {
          const hId = blk.id + '-h' + hIdx;
          hIdx++;
          body.appendChild(renderRichItem(it, hId));
        } else if (it.type === 'warn') {
          body.appendChild(renderRichItem(it, blk.id + '-warn'));
        } else {
          body.appendChild(renderRichItem(it));
        }
      });
      sb.appendChild(body);
      main.appendChild(sb);
    });
    return main;
  };

  // ─── Rich Body Item Renderer ─────────────────────────────────────────────
  function renderRichItem(it, idArg) {
    switch (it.type) {
      case 'lead': return h('p', { class: 'rb-lead' }, renderInline(it.text));
      case 'h': {
        const attrs = { class: 'rb-h' };
        if (idArg) attrs.id = idArg;
        return h('div', attrs, monoCap(it.text, 'accent'), h('span', { class: 'rule' }));
      }
      case 'p': return h('p', { class: 'rb-p' }, renderInline(it.text));
      case 'bullets': return h('ul', { class: 'rb-list' }, ...it.items.map(li => h('li', null, renderInline(li))));
      case 'numbered': return h('ol', { class: 'rb-list' }, ...it.items.map(li => h('li', null, renderInline(li))));
      case 'table': {
        const cols = it.head.length;
        const tplCols = cols === 2 ? '180px 1fr' : cols === 3 ? '160px 140px 1fr' : 'repeat(' + cols + ', 1fr)';
        const grid = h('div', { class: 'rb-table' });
        const head = h('div', { class: 'rb-table__head', style: 'grid-template-columns:' + tplCols });
        it.head.forEach(c => head.appendChild(h('div', null, c)));
        grid.appendChild(head);
        it.rows.forEach(row => {
          const r = h('div', { class: 'rb-table__row', style: 'grid-template-columns:' + tplCols });
          row.forEach(c => r.appendChild(h('div', null, renderInline(c))));
          grid.appendChild(r);
        });
        return grid;
      }
      case 'warn': {
        const wAttrs = { class: 'rb-warn' };
        if (idArg) wAttrs.id = idArg;
        return h('div', wAttrs,
          h('span', { class: 'rb-warn__t' }, it.titel),
          h('div', { class: 'rb-warn__body' }, renderInline(it.text)),
        );
      }
      case 'selfcheck':
        return h('div', { class: 'rb-selfcheck' },
          h('span', { class: 'rb-selfcheck__t' }, it.titel || '✱ Selbst-Check · mündlich formulieren, dann aufdecken'),
          h('ol', { class: 'rb-selfcheck__list' }, ...it.items.map((item, idx) => {
            // Backwards-compat: item may be string (q only) or object {q, a}
            const q = typeof item === 'string' ? item : item.q;
            const a = typeof item === 'string' ? null : item.a;
            const li = h('li', { class: 'rb-selfcheck__item' });
            li.appendChild(h('div', { class: 'rb-selfcheck__q' }, renderInline(q)));
            if (a) {
              const btn = h('button', {
                class: 'rb-selfcheck__reveal',
                type: 'button',
                'aria-expanded': 'false',
              }, '▾ Antwort aufdecken');
              const ans = h('div', { class: 'rb-selfcheck__a', hidden: 'hidden' }, renderInline(a));
              btn.addEventListener('click', () => {
                const expanded = btn.getAttribute('aria-expanded') === 'true';
                btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
                btn.textContent = expanded ? '▾ Antwort aufdecken' : '▴ Antwort verbergen';
                if (expanded) ans.setAttribute('hidden', 'hidden');
                else ans.removeAttribute('hidden');
              });
              li.appendChild(btn);
              li.appendChild(ans);
            }
            return li;
          })),
        );
      default: return h('span');
    }
  }

  // Inline-Marker: {{Norm}} → norm-tag; **bold** → strong
  function renderInline(text) {
    if (!text) return '';
    const out = document.createDocumentFragment();
    const re = /(\{\{([^}]+)\}\}|\*\*([^*]+)\*\*)/g;
    let lastIdx = 0, m;
    while ((m = re.exec(text)) !== null) {
      if (m.index > lastIdx) out.appendChild(document.createTextNode(text.slice(lastIdx, m.index)));
      if (m[2] !== undefined) out.appendChild(normTag(m[2]));
      else if (m[3] !== undefined) {
        const s = document.createElement('strong'); s.textContent = m[3];
        out.appendChild(s);
      }
      lastIdx = m.index + m[0].length;
    }
    if (lastIdx < text.length) out.appendChild(document.createTextNode(text.slice(lastIdx)));
    return out;
  }

  // ─── Aktiv-Abruf-Aside ───────────────────────────────────────────────────
  const renderAside = () => {
    const aside = h('aside', { class: 'werkbank__aside', 'aria-label': 'Aktiv-Abruf-Werkbank' });

    // Sticky top: Status-Aggregat
    const stickyHead = h('div', { class: 'werkbank__sticky' });
    stickyHead.appendChild(monoCap('Werkbank · Aktiv-Abruf', 'ink'));
    const aggrSlot = h('div', { class: 'aggr-slot' });
    refreshAggregate = () => {
      while (aggrSlot.firstChild) aggrSlot.removeChild(aggrSlot.firstChild);
      aggrSlot.appendChild(statusBar());
    };
    refreshAggregate();
    stickyHead.appendChild(aggrSlot);
    aside.appendChild(stickyHead);

    // Pflichtwissen
    aside.appendChild(h('section', { class: 'aside-section', 'aria-labelledby': 'sec-pw' },
      h('div', { class: 'section-header' },
        monoH('h2', 'Pflichtwissen', 'accent', 'sec-pw'),
        h('span', { class: 'section-header__rule' }),
        h('span', { class: 'mono-cap section-header__count' }, d.pflichtwissen.length + ' Karten'),
      ),
      h('div', { class: 'pflicht-grid' }, ...d.pflichtwissen.map(c => revealCard(c))),
    ));

    // Falle-Atlas
    aside.appendChild(h('section', { class: 'aside-section', 'aria-labelledby': 'sec-fa' },
      h('div', { class: 'section-header' },
        monoH('h2', 'Falle-Atlas', 'accent', 'sec-fa'),
        h('span', { class: 'section-header__rule' }),
        h('span', { class: 'mono-cap section-header__count' }, d.fallen.length + ' Stellen'),
      ),
      h('div', null, ...d.fallen.map(f => falleRow(f))),
    ));

    // Fallbeispiele
    aside.appendChild(h('section', { class: 'aside-section', 'aria-labelledby': 'sec-fb' },
      h('div', { class: 'section-header' },
        monoH('h2', 'Fallbeispiele', 'accent', 'sec-fb'),
        h('span', { class: 'section-header__rule' }),
        h('span', { class: 'mono-cap section-header__count' }, d.faelle.length + ' Fälle'),
      ),
      ...d.faelle.map(f => fallCard(f)),
    ));

    return aside;
  };

  // ─── Cross-Reference: Slideover-Karte → Aside-Card-Spring ────────────────
  function scrollToCard(id) {
    const doScroll = () => {
      const card = document.querySelector('[data-id="' + CSS.escape(id) + '"]');
      if (!card) {
        announce('Karte ' + id + ' nicht auf dieser Seite gefunden');
        return;
      }
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.classList.add('pulse-highlight');
      if (card.classList.contains('reveal-card') && card.dataset.state !== 'open') {
        card.dataset.state = 'open';
        card.setAttribute('aria-expanded', 'true');
        const hint = card.querySelector('.reveal-card__hint');
        if (hint) hint.textContent = 'Lösung verbergen';
      }
      setTimeout(() => card.classList.remove('pulse-highlight'), 2000);
      announce('Sprung zu Karte ' + id);
    };
    // Use transitionend if slideover is mid-animation; otherwise immediate
    const wasOpen = slideoverEl && slideoverEl.dataset.open === 'true';
    closeSlideover();
    if (!wasOpen) {
      requestAnimationFrame(doScroll);
      return;
    }
    let fired = false;
    const onEnd = () => {
      if (fired) return; fired = true;
      slideoverEl.removeEventListener('transitionend', onEnd);
      doScroll();
    };
    slideoverEl.addEventListener('transitionend', onEnd, { once: true });
    // Safety fallback for reduced-motion / no-transitionend browsers
    setTimeout(onEnd, 320);
  }

  // ─── Slideover (Glossar) ─────────────────────────────────────────────────
  let slideoverBackdrop, slideoverEl, slideoverLastFocus = null;
  function openSlideover(name) {
    slideoverLastFocus = document.activeElement;
    // Always clear karten-list at top to avoid stale entries leaking between opens
    const kList = slideoverEl.querySelector('.slideover__karten-list');
    if (kList) kList.innerHTML = '';
    const entry = (d.glossar || {})[name];
    if (!entry) {
      slideoverEl.querySelector('.slideover__title').textContent = name;
      slideoverEl.querySelector('.slideover__wortlaut').textContent = '(Kein detaillierter Glossar-Eintrag — nur Norm-Kürzel)';
      slideoverEl.querySelector('.slideover__karten').style.display = 'none';
    } else {
      slideoverEl.querySelector('.slideover__title').textContent = entry.titel || name;
      slideoverEl.querySelector('.slideover__wortlaut').textContent = entry.wortlaut || '';
      const k = slideoverEl.querySelector('.slideover__karten');
      const hasKarten = entry.karten && entry.karten.length;
      k.style.display = hasKarten ? '' : 'none';
      if (hasKarten) {
        entry.karten.forEach(kk => {
          const tag = h('button', {
            class: 'norm-tag norm-tag--karten',
            type: 'button',
            'aria-label': 'Zur Karte ' + kk + ' springen',
            onclick: () => scrollToCard(kk),
          }, kk);
          kList.appendChild(tag);
        });
      }
    }
    slideoverEl.querySelector('.slideover__label').textContent = name;
    slideoverBackdrop.dataset.open = 'true';
    slideoverEl.dataset.open = 'true';
    document.body.style.overflow = 'hidden';
    // Focus management: move focus into dialog
    const closeBtn = slideoverEl.querySelector('.slideover__close');
    if (closeBtn) closeBtn.focus();
  }
  function closeSlideover() {
    if (slideoverBackdrop.dataset.open !== 'true') return;
    slideoverBackdrop.dataset.open = 'false';
    slideoverEl.dataset.open = 'false';
    document.body.style.overflow = '';
    // Return focus to opener
    if (slideoverLastFocus && typeof slideoverLastFocus.focus === 'function') {
      try { slideoverLastFocus.focus(); } catch (_) {}
    }
    slideoverLastFocus = null;
  }
  function trapFocus(e) {
    if (slideoverEl.dataset.open !== 'true') return;
    if (e.key !== 'Tab') return;
    const focusables = slideoverEl.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }
  function buildSlideover() {
    slideoverBackdrop = h('div', { class: 'slideover-backdrop', data: { open: 'false' }, onclick: closeSlideover });
    slideoverEl = h('div', {
      class: 'slideover',
      data: { open: 'false' },
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'slideover-title',
      tabindex: '-1',
    },
      h('div', { class: 'slideover__inner' },
        h('div', { class: 'slideover__head' },
          h('span', { class: 'mono-cap mono-cap--accent slideover__label' }, ''),
          h('button', { class: 'slideover__close', type: 'button', onclick: closeSlideover }, 'ESC · schließen'),
        ),
        h('h3', { class: 'slideover__title', id: 'slideover-title' }),
        h('div', { class: 'slideover__wortlaut' }),
        h('div', { class: 'slideover__karten' },
          monoCap('Karten zum Üben'),
          h('div', { class: 'slideover__karten-list' }),
        ),
      ),
    );
    document.body.appendChild(slideoverBackdrop);
    document.body.appendChild(slideoverEl);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeSlideover();
      else trapFocus(e);
    });
  }

  // ─── Mount ───────────────────────────────────────────────────────────────
  function mount() {
    const root = document.getElementById('skript-root');
    if (!root) return;
    root.appendChild(renderHeader());
    root.appendChild(renderTopRow());
    const werkbank = h('main', { class: 'werkbank', id: 'main' });
    werkbank.appendChild(renderTOC());
    werkbank.appendChild(renderVertiefung());
    werkbank.appendChild(renderAside());
    root.appendChild(werkbank);
    buildSlideover();
    setupScrollspy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
