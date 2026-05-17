// MP_05 V2 Werkbank · Vanilla JS Renderer (no React)
// Consumes window.MP05 + window.MP05_BODIES, builds DOM, wires interactivity.

(function () {
  'use strict';
  const d = window.MP05;
  const bodies = window.MP05_BODIES || {};

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
  const statusKey = id => `wg.lernraum.status.mp05.${id}`;
  const getStatus = id => localStorage.getItem(statusKey(id)) || 'open';
  const setStatus = (id, s) => { localStorage.setItem(statusKey(id), s); refreshAggregate(); };
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
    ];
    const counts = { sit: 0, repeat: 0, work: 0, open: 0 };
    ids.forEach(id => { counts[getStatus(id)]++; });
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
      h('span', null, c.sit + ' sitzen'),
      h('span', null, c.repeat + ' wiederholt'),
      h('span', null, c.work + ' wackeln'),
      h('span', null, c.open + ' offen'),
    );
    return h('div', null, bar, legend);
  };
  let refreshAggregate = () => {};

  // ─── Mono Cap ────────────────────────────────────────────────────────────
  const monoCap = (text, variant) => h('span', {
    class: 'mono-cap' + (variant ? ' mono-cap--' + variant : '')
  }, text);

  // ─── Skript-Header ──────────────────────────────────────────────────────
  const renderHeader = () => h('header', { class: 'skript-header' },
    h('div', { class: 'skript-header__id' },
      h('span', { class: 'mono-cap' }, d.id.toUpperCase()),
      h('span', { class: 'mono-cap' }, d.zalgm),
    ),
    h('div', { class: 'skript-header__main' },
      h('div', { class: 'skript-header__status-row' },
        h('span', { class: 'mono-cap mono-cap--ink' }, 'STATUS · IN BEARBEITUNG'),
        h('span', { style: 'color:var(--mute2)' }, '·'),
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
      h('button', { class: 'print-btn', onclick: () => window.print() }, '↓ Spickzettel'),
    ),
  );

  // ─── Top-Row (Kürze + Kartografie) ───────────────────────────────────────
  const renderTopRow = () => h('section', { class: 'top-row' },
    h('section', null,
      monoCap('In aller Kürze', 'accent'),
      h('ol', { class: 'kurz-list' },
        ...d.kurz.map((s, i) => h('li', null,
          h('span', { class: 'num' }, String(i + 1).padStart(2, '0')),
          h('span', { class: 'txt' }, s),
        )),
      ),
    ),
    h('section', null,
      monoCap('Norm-Kartografie · 5 Ebenen', 'accent'),
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
    el.appendChild(h('div', { class: 'reveal-card__frage' }, card.frage));
    el.appendChild(h('div', { class: 'reveal-card__antwort' }, card.antwort));
    el.appendChild(h('div', { class: 'reveal-card__foot' },
      normTag(card.norm),
      h('span', { class: 'reveal-card__hint' }, 'tippen · lösung'),
    ));
    const toggle = (ev) => {
      if (ev.target.closest('.norm-tag, .status-dot')) return;
      // Don't collapse when user just selected antwort text
      const sel = window.getSelection && window.getSelection();
      if (sel && sel.toString().length > 0) return;
      const open = el.dataset.state === 'open';
      el.dataset.state = open ? 'closed' : 'open';
      el.setAttribute('aria-expanded', open ? 'false' : 'true');
      el.querySelector('.reveal-card__hint').textContent = open ? 'tippen · lösung' : 'tippen · zu';
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
      h('div', { class: 'fa-row__frage' }, falle.frage),
      h('div', { class: 'fa-row__antwort' }, falle.antwort),
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
    el.appendChild(h('div', { class: 'fall-card__sachverhalt' }, fall.sachverhalt));

    const btnKnack = h('button', {
      class: 'fall-card__btn',
      type: 'button',
      data: { on: 'false' },
      'aria-expanded': 'false',
    },
      monoCap('Knackpunkte'),
      h('span', { class: 'hint' }, 'tippen · aufdecken'),
    );
    const btnAntw = h('button', {
      class: 'fall-card__btn',
      type: 'button',
      data: { on: 'false' },
      'aria-expanded': 'false',
    },
      monoCap('Antwortkette'),
      h('span', { class: 'hint' }, 'tippen · aufdecken'),
    );
    el.appendChild(h('div', { class: 'fall-card__btns' }, btnKnack, btnAntw));

    const panelKnack = h('div', { class: 'fall-card__panel', data: { on: 'false' } },
      h('ol', null, ...fall.knackpunkte.map(k => h('li', null, k))),
    );
    const panelAntw = h('div', { class: 'fall-card__panel', data: { on: 'false' } },
      h('div', { class: 'antwortkette' }, fall.antwortkette),
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
    btnKnack.addEventListener('click', () => togglePanel(btnKnack, panelKnack, 'tippen · verdecken', 'tippen · aufdecken'));
    btnAntw.addEventListener('click', () => togglePanel(btnAntw, panelAntw, 'tippen · verdecken', 'tippen · aufdecken'));

    return el;
  };

  // ─── Vertiefung (Sub-Blocks A.1-A.4) ─────────────────────────────────────
  const renderVertiefung = () => {
    const main = h('main', { class: 'werkbank__main' });
    main.appendChild(h('div', { class: 'section-header' },
      monoCap('Stoff · Referenz', 'accent'),
      h('span', { class: 'section-header__rule' }),
      monoCap('chunkbar nach Sub-Block'),
    ));
    main.appendChild(h('p', { class: 'vertiefung-intro' },
      'Die Vertiefung liegt offen — sie ist Nachschlagewerk, nicht Pflicht-Lese-Pfad. Lernende springen aus der rechten Aktiv-Abruf-Spalte zurück hierher, wenn eine Karte oder Falle hängt.',
    ));

    d.vertiefung.forEach(blk => {
      const sb = h('article', { class: 'subblock', data: { id: blk.id } });
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
      items.forEach(it => body.appendChild(renderRichItem(it)));
      sb.appendChild(body);
      main.appendChild(sb);
    });
    return main;
  };

  // ─── Rich Body Item Renderer ─────────────────────────────────────────────
  function renderRichItem(it) {
    switch (it.type) {
      case 'lead': return h('p', { class: 'rb-lead' }, renderInline(it.text));
      case 'h': return h('div', { class: 'rb-h' }, monoCap(it.text, 'accent'), h('span', { class: 'rule' }));
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
      case 'warn':
        return h('div', { class: 'rb-warn' },
          h('span', { class: 'rb-warn__t' }, it.titel),
          h('div', { class: 'rb-warn__body' }, renderInline(it.text)),
        );
      case 'selfcheck':
        return h('div', { class: 'rb-selfcheck' },
          h('span', { class: 'rb-selfcheck__t' }, it.titel || '✱ Selbst-Check (mündlich antworten)'),
          h('ol', null, ...it.items.map(q => h('li', null, renderInline(q)))),
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
    const aside = h('aside', { class: 'werkbank__aside' });

    // Sticky top: Status-Aggregat
    const stickyHead = h('div', { style: 'position:sticky; top:0; background:#efeee8; padding-bottom:12px; z-index:2; border-bottom:1px solid var(--rule); margin-bottom:18px;' });
    stickyHead.appendChild(monoCap('Werkbank · Aktiv-Abruf', 'ink'));
    const aggrSlot = h('div', { style: 'margin-top:8px;' });
    refreshAggregate = () => {
      while (aggrSlot.firstChild) aggrSlot.removeChild(aggrSlot.firstChild);
      aggrSlot.appendChild(statusBar());
    };
    refreshAggregate();
    stickyHead.appendChild(aggrSlot);
    aside.appendChild(stickyHead);

    // Pflichtwissen
    aside.appendChild(h('section', { style: 'margin-bottom:28px;' },
      h('div', { class: 'section-header' },
        monoCap('Pflichtwissen', 'accent'),
        h('span', { class: 'section-header__rule' }),
        h('span', { class: 'mono-cap section-header__count' }, d.pflichtwissen.length + ' Karten'),
      ),
      h('div', { class: 'pflicht-grid' }, ...d.pflichtwissen.map(c => revealCard(c))),
    ));

    // Falle-Atlas
    aside.appendChild(h('section', { style: 'margin-bottom:28px;' },
      h('div', { class: 'section-header' },
        monoCap('Falle-Atlas', 'accent'),
        h('span', { class: 'section-header__rule' }),
        h('span', { class: 'mono-cap section-header__count' }, d.fallen.length + ' Stellen'),
      ),
      h('div', null, ...d.fallen.map(f => falleRow(f))),
    ));

    // Fallbeispiele
    aside.appendChild(h('section', null,
      h('div', { class: 'section-header' },
        monoCap('Fallbeispiele', 'accent'),
        h('span', { class: 'section-header__rule' }),
        h('span', { class: 'mono-cap section-header__count' }, d.faelle.length + ' Fälle'),
      ),
      ...d.faelle.map(f => fallCard(f)),
    ));

    return aside;
  };

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
          const tag = h('span', { class: 'norm-tag', style: 'color:var(--accent)' }, kk);
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
          h('div', { class: 'slideover__karten-list', style: 'display:flex; gap:6px; flex-wrap:wrap;' }),
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
    root.appendChild(renderHeader());
    root.appendChild(renderTopRow());
    const werkbank = h('div', { class: 'werkbank' });
    werkbank.appendChild(renderVertiefung());
    werkbank.appendChild(renderAside());
    root.appendChild(werkbank);
    buildSlideover();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
