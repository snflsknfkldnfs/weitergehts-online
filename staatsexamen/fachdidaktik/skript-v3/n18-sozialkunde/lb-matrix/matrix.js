// LB-Matrix-Renderer Sozialkunde · Multi-KE-Variant
// Konsumiert window.MATRIX (data.js) mit cells[].kes[] und rendert
// pro Zelle eine Slideover-Sektion je KE.

(function () {
  'use strict';
  const M = window.MATRIX;
  if (!M) { console.error('Matrix data missing (window.MATRIX)'); return; }

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
    announce(`KEs zu ${cellKey} geöffnet · ${cell.ke_anzahl} Einträge`);
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

  function renderSlideoverContent(cellKey, cell) {
    const [jgst, lbId] = cellKey.split('_');
    const jgstObj = M.jgst.find(j => j.id === jgst);
    const lbObj = M.lernbereiche.find(l => l.id === lbId);
    const frag = document.createDocumentFragment();

    frag.appendChild(h('button', {
      class: 'mx-slideover__close', type: 'button',
      'aria-label': 'Schließen (Esc)', onclick: closeSlideover,
    }, 'ESC · schließen'));

    frag.appendChild(h('div', { class: 'mx-slideover__crumb' },
      `${jgstObj?.label || jgst} · ${lbObj?.titel || lbId}`));
    frag.appendChild(h('h2', { class: 'mx-slideover__title', id: 'mx-slideover-title' },
      `${cell.ke_anzahl} Kompetenzerwartung${cell.ke_anzahl > 1 ? 'en' : ''}`));
    frag.appendChild(h('div', { class: 'mx-slideover__sub' },
      `${jgstObj?.label || jgst} · ${cell.lb_titel}`));

    (cell.kes || []).forEach((ke, idx) => {
      const sec = h('section', { class: 'ke-section' });
      sec.appendChild(h('div', { class: 'ke-section__head' },
        h('span', { class: 'ke-section__id' }, ke.ke_id),
        ke.operator && h('span', { class: 'ke-section__meta' }, ke.operator),
        ke.afb && h('span', { class: 'ke-section__meta' }, `AFB ${ke.afb}`),
        h('span', { class: 'ke-section__meta' }, ke.umsetzung_typ),
        h('h3', { class: 'ke-section__thema' }, ke.thema),
      ));
      sec.appendChild(h('p', { class: 'ke-section__wortlaut' },
        ke.ke_wortlaut.charAt(0).toUpperCase() + ke.ke_wortlaut.slice(1)));
      sec.appendChild(h('p', { class: 'ke-section__fundort' }, 'Fundort: ' + ke.fundort));
      sec.appendChild(h('div', { class: 'ke-section__meta-row' },
        ke.inhalte && h('span', null, h('strong', null, 'Inhalte: '), ke.inhalte),
      ));

      // Umsetzung
      sec.appendChild(h('div', { class: 'mx-section-h' }, ke.umsetzung_typ === 'real' ? 'Reale Umsetzung (Praxis)' : 'Idealtypische Umsetzung'));
      sec.appendChild(h('div', { class: 'ke-section__umsetzung-titel' }, ke.umsetzung_titel));
      const metaText = [ke.umsetzung_klasse, ke.umsetzung_datum].filter(Boolean).join(' · ');
      if (metaText) sec.appendChild(h('div', { class: 'ke-section__umsetzung-meta' }, metaText));

      // UEs
      if (ke.ues && ke.ues.length) {
        ke.ues.forEach(ue => {
          const ueEl = h('div', { class: 'mx-ue' },
            h('div', { class: 'mx-ue__head' },
              h('span', { class: 'mx-ue__nr' }, ue.ebene === 'meta' ? '✱' : `UE ${ue.nr}`),
              h('span', { class: 'mx-ue__titel' }, ue.titel),
            ),
            h('p', { class: 'mx-ue__inhalt' }, ue.inhalt),
          );
          sec.appendChild(ueEl);
        });
      }

      // Bezuege
      if (ke.bezuege && ke.bezuege.length) {
        sec.appendChild(h('div', { class: 'mx-section-h' }, 'Fachdidaktische Bezüge'));
        const list = h('div', { class: 'mx-bezug' });
        ke.bezuege.forEach(b => {
          list.appendChild(h('div', { class: 'mx-bezug-item' },
            h('span', { class: 'mx-bezug-item__didaktik' }, b.didaktik),
            h('span', null, b.verweis),
          ));
        });
        sec.appendChild(list);
      }

      frag.appendChild(sec);
    });

    return frag;
  }

  function renderGrid() {
    const grid = h('div', { class: 'mx-grid', role: 'grid', 'aria-label': 'LB-Matrix Sozialkunde' });
    grid.appendChild(h('div', { class: 'mx-cell mx-cell--corner', role: 'columnheader' }, 'LB →'));
    M.lernbereiche.forEach(lb => {
      grid.appendChild(h('div', { class: 'mx-cell mx-cell--lb-head', role: 'columnheader' },
        h('span', { class: 'mx-lb-id' }, lb.id),
        lb.titel.replace(lb.id + ' · ', ''),
      ));
    });

    M.jgst.forEach(jg => {
      grid.appendChild(h('div', { class: 'mx-cell mx-cell--jgst', role: 'rowheader' }, jg.label));
      M.lernbereiche.forEach(lb => {
        const key = `${jg.id}_${lb.id}`;
        const cell = M.cells[key];
        if (!cell) {
          // Leere Zelle (keine KEs für diese Jgst×LB-Kombination)
          grid.appendChild(h('div', { class: 'mx-cell mx-cell--data mx-cell--leer', role: 'gridcell' },
            h('div', { class: 'mx-cell__umsetzung' }, '— keine KE'),
          ));
          return;
        }
        const cellEl = h('div', {
          class: 'mx-cell mx-cell--data',
          role: 'gridcell',
          tabindex: '0',
          'aria-label': `${jg.label} ${lb.id} — ${cell.ke_anzahl} Kompetenzerwartungen`,
          data: { cellKey: key },
          onclick: () => openSlideover(key),
          onkeydown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSlideover(key); }
          },
        });
        cellEl.appendChild(h('div', { class: 'mx-cell__header' },
          h('span', { class: 'mx-cell__count' }, `${cell.ke_anzahl} KE${cell.ke_anzahl > 1 ? 's' : ''}`),
          h('span', { class: 'mx-cell__umsetzung' },
            (cell.kes || []).filter(k => k.umsetzung_typ === 'real').length + '× real'),
        ));
        const themas = h('div', { class: 'mx-cell__themas' });
        (cell.kes || []).forEach(k => {
          themas.appendChild(h('div', { class: 'mx-cell__thema' },
            h('span', { class: 'mx-cell__thema-id' }, k.ke_id.split('-').pop()),
            k.thema,
          ));
        });
        cellEl.appendChild(themas);
        grid.appendChild(cellEl);
      });
    });

    return h('div', { class: 'mx-grid-wrap' }, grid);
  }

  function mount() {
    const host = document.getElementById('mx-grid-host');
    if (!host || host.children.length) return;
    host.appendChild(renderGrid());
  }

  if (document.readyState !== 'loading') mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
