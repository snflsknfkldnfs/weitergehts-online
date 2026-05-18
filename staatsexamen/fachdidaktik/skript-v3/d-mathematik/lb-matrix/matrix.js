// LB-Matrix-Renderer · Vanilla JS · ohne Build-Step
// Konsumiert window.MATRIX (data.js) → baut Grid + Slideover.

(function () {
  'use strict';
  const M = window.MATRIX;
  if (!M) { console.error('Matrix data missing (window.MATRIX)'); return; }

  // ─── DOM Helper ───────────────────────────────────────────────────────
  const h = (tag, attrs, ...children) => {
    const el = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'class') el.className = attrs[k];
      else if (k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
      else if (k === 'data') for (const dk in attrs[k]) el.dataset[dk] = attrs[k][dk];
      else el.setAttribute(k, attrs[k]);
    }
    for (const c of children) {
      if (c == null || c === false) continue;
      if (Array.isArray(c)) c.forEach(x => { if (x != null && x !== false) el.appendChild(x instanceof Node ? x : document.createTextNode(String(x))); });
      else el.appendChild(c instanceof Node ? c : document.createTextNode(String(c)));
    }
    return el;
  };

  // ─── Slideover State ──────────────────────────────────────────────────
  const backdrop = document.getElementById('mx-backdrop');
  const slideover = document.getElementById('mx-slideover');
  const slideoverBody = document.getElementById('mx-slideover-body');
  let lastFocusedCell = null;

  function openSlideover(cellKey) {
    const cell = M.cells[cellKey];
    if (!cell) return;
    lastFocusedCell = document.querySelector(`[data-cell-key="${cellKey}"]`);
    slideoverBody.replaceChildren();
    slideoverBody.appendChild(renderSlideoverContent(cellKey, cell));
    backdrop.dataset.open = 'true';
    backdrop.setAttribute('aria-hidden', 'false');
    slideover.dataset.open = 'true';
    slideover.focus();
    document.body.style.overflow = 'hidden';
    announce(`Sequenzplanung ${cellKey} geöffnet`);
  }

  function closeSlideover() {
    backdrop.dataset.open = 'false';
    backdrop.setAttribute('aria-hidden', 'true');
    slideover.dataset.open = 'false';
    document.body.style.overflow = '';
    if (lastFocusedCell) lastFocusedCell.focus();
  }

  backdrop.addEventListener('click', closeSlideover);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && slideover.dataset.open === 'true') closeSlideover();
  });

  function announce(msg) {
    const node = document.getElementById('sr-announcer');
    if (!node) return;
    node.textContent = '';
    setTimeout(() => { node.textContent = msg; }, 30);
  }

  // ─── Slideover-Content ────────────────────────────────────────────────
  function renderSlideoverContent(cellKey, cell) {
    const [jgst, lbId] = cellKey.split('_');
    const jgstObj = M.jgst.find(j => j.id === jgst);
    const lbObj = M.lernbereiche.find(l => l.id === lbId);

    const frag = document.createDocumentFragment();

    const closeBtn = h('button', {
      class: 'mx-slideover__close',
      type: 'button',
      'aria-label': 'Schließen (Esc)',
      onclick: closeSlideover,
    }, 'ESC · schließen');
    frag.appendChild(closeBtn);

    frag.appendChild(h('div', { class: 'mx-slideover__crumb' },
      `${jgstObj?.label || jgst} · ${lbObj?.id || lbId} ${lbObj?.titel || ''}`
    ));
    frag.appendChild(h('div', { class: 'mx-slideover__ke' },
      `LP+ KE-Anker: ${cell.ke}`
    ));
    const titleEl = h('h2', { class: 'mx-slideover__title', id: 'mx-slideover-title' }, cell.titel);
    frag.appendChild(titleEl);

    if (cell.status !== 'ausgearbeitet' || !cell.sequenz) {
      frag.appendChild(h('div', { class: 'mx-stub-note' },
        cell.status === 'gerüst'
          ? 'Gerüst — Sequenzplanung in Vorbereitung. Inhaltlicher Anker: ' + cell.kurz + '.'
          : 'Stub — Sequenzplanung folgt. Inhaltlicher Anker: ' + cell.kurz + '.'
      ));
      return frag;
    }

    const s = cell.sequenz;

    if (s.ke_wortlaut) {
      frag.appendChild(h('p', { class: 'mx-slideover__ke-wortlaut' }, s.ke_wortlaut));
    }
    if (s.ueberblick) {
      frag.appendChild(h('p', { class: 'mx-slideover__ueberblick' }, s.ueberblick));
    }

    // Sequenz-UEs
    if (s.ues && s.ues.length) {
      frag.appendChild(h('div', { class: 'mx-section-h' }, `Sequenz · ${s.ues.length} UEs`));
      s.ues.forEach(ue => {
        const ueEl = h('div', { class: 'mx-ue' },
          h('div', { class: 'mx-ue__head' },
            h('span', { class: 'mx-ue__nr' }, `UE ${ue.nr}`),
            h('span', { class: 'mx-ue__titel' }, ue.titel),
            ue.ebene && h('span', { class: 'mx-ue__meta' }, ue.ebene),
            ue.kompetenz && h('span', { class: 'mx-ue__meta' }, ue.kompetenz),
          ),
          h('p', { class: 'mx-ue__inhalt' }, ue.inhalt),
          ue.begruendung && h('div', { class: 'mx-ue__begruendung' }, ue.begruendung),
        );
        frag.appendChild(ueEl);
      });
    }

    // Didaktische Bezüge
    if (s.bezuege && s.bezuege.length) {
      frag.appendChild(h('div', { class: 'mx-section-h' }, 'Fachdidaktische Bezüge'));
      const list = h('div', { class: 'mx-bezug' });
      s.bezuege.forEach(b => {
        list.appendChild(h('div', { class: 'mx-bezug-item' },
          h('span', { class: 'mx-bezug-item__didaktik' }, b.didaktik),
          h('span', null, b.verweis),
        ));
      });
      frag.appendChild(list);
    }

    return frag;
  }

  // ─── Grid Rendering ───────────────────────────────────────────────────
  function renderGrid() {
    const grid = h('div', { class: 'mx-grid', role: 'grid', 'aria-label': 'LB-Matrix Mathematik' });

    grid.appendChild(h('div', { class: 'mx-cell mx-cell--corner', role: 'columnheader' }, 'LB →'));
    M.lernbereiche.forEach(lb => {
      grid.appendChild(h('div', { class: 'mx-cell mx-cell--lb-head', role: 'columnheader' },
        h('span', { class: 'mx-lb-id' }, lb.id),
        lb.titel,
      ));
    });

    M.jgst.forEach(jg => {
      grid.appendChild(h('div', { class: 'mx-cell mx-cell--jgst', role: 'rowheader' }, jg.label));
      M.lernbereiche.forEach(lb => {
        const key = `${jg.id}_${lb.id}`;
        const cell = M.cells[key];
        if (!cell) {
          grid.appendChild(h('div', { class: 'mx-cell mx-cell--data mx-cell--stub', role: 'gridcell' }));
          return;
        }
        const status = cell.status || 'stub';
        const cellEl = h('div', {
          class: `mx-cell mx-cell--data mx-cell--${status}`,
          role: 'gridcell',
          tabindex: '0',
          'aria-label': `${cell.ke} ${cell.titel} — ${cell.kurz} — ${status === 'ausgearbeitet' ? 'Sequenzplanung verfügbar' : 'Inhalt in Vorbereitung'}`,
          data: { cellKey: key, status },
          onclick: () => openSlideover(key),
          onkeydown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openSlideover(key);
            }
          },
        },
          h('span', { class: 'mx-cell__status', 'aria-hidden': 'true' }),
          h('span', { class: 'mx-cell__ke' }, cell.ke),
          h('span', { class: 'mx-cell__titel' }, cell.titel),
          h('span', { class: 'mx-cell__kurz' }, cell.kurz),
        );
        grid.appendChild(cellEl);
      });
    });

    const wrap = h('div', { class: 'mx-grid-wrap' }, grid);
    return wrap;
  }

  // ─── Mount ────────────────────────────────────────────────────────────
  function mount() {
    const host = document.getElementById('mx-grid-host');
    if (!host || host.children.length) return;
    host.appendChild(renderGrid());
  }

  if (document.readyState !== 'loading') mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
