// LB-Matrix-Renderer Sozialkunde v2 · Multi-KE + Pilot-Sequenz-Detail
// Konsumiert window.MATRIX (data.js v2) mit:
//   - cells.kes[].pilot_sequenz für detaillierte 45-min-UE-Pläne
//   - cells.kes[].ke_wortlaut_quelle (verbatim/sekundaer)
//   - cells.kes[].inhalte_lp[] (LP+-Inhalte zu Kompetenzen)
//   - cells.quelle_status (verbatim/sekundaer/ausstehend)

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

  function renderPilotUE(ue) {
    const el = h('div', { class: 'mx-ue mx-ue-pilot' });
    el.appendChild(h('div', { class: 'mx-ue__head' },
      h('span', { class: 'mx-ue__nr' }, `UE ${ue.nr}`),
      h('span', { class: 'mx-ue__titel' }, ue.titel),
      ue.minuten && h('span', { class: 'mx-ue__meta' }, `${ue.minuten} min`),
    ));
    if (ue.lernziel) {
      el.appendChild(h('p', { class: 'mx-ue__lernziel' }, ue.lernziel));
    }
    // Phasen
    const phasen = h('div', { class: 'mx-ue-phasen' });
    if (ue.einstieg)     { phasen.appendChild(h('div', { class: 'mx-ue-phasen__label' }, 'Einstieg')); phasen.appendChild(h('div', { class: 'mx-ue-phasen__body' }, ue.einstieg)); }
    if (ue.erarbeitung)  { phasen.appendChild(h('div', { class: 'mx-ue-phasen__label' }, 'Erarbeitung')); phasen.appendChild(h('div', { class: 'mx-ue-phasen__body' }, ue.erarbeitung)); }
    if (ue.sicherung)    { phasen.appendChild(h('div', { class: 'mx-ue-phasen__label' }, 'Sicherung')); phasen.appendChild(h('div', { class: 'mx-ue-phasen__body' }, ue.sicherung)); }
    if (ue.reflexion)    { phasen.appendChild(h('div', { class: 'mx-ue-phasen__label' }, 'Reflexion')); phasen.appendChild(h('div', { class: 'mx-ue-phasen__body' }, ue.reflexion)); }
    el.appendChild(phasen);
    // Meta-Grid
    if (ue.material || ue.differenzierung || ue.lp_bezug || ue.didaktik) {
      const meta = h('div', { class: 'mx-ue-meta-grid' });
      if (ue.material)         { meta.appendChild(h('div', null, h('b', null, 'Material'), ue.material)); }
      if (ue.differenzierung)  { meta.appendChild(h('div', null, h('b', null, 'Differenzierung'), ue.differenzierung)); }
      if (ue.lp_bezug)         { meta.appendChild(h('div', null, h('b', null, 'LP+-Bezug'), ue.lp_bezug)); }
      if (ue.didaktik)         { meta.appendChild(h('div', null, h('b', null, 'Didaktik'), ue.didaktik)); }
      el.appendChild(meta);
    }
    return el;
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

    // Cell-level header with quelle-status
    const statusBadge = h('span', {
      class: `quelle-badge quelle-badge--${cell.quelle_status || 'verbatim'}`
    }, cell.quelle_status === 'verbatim' ? 'LP+ verbatim' :
       cell.quelle_status === 'sekundaer' ? 'Sekundärquelle' : 'Quelle ausstehend');

    frag.appendChild(h('div', { style: 'display:flex; gap:10px; align-items:center; margin-bottom: 12px;' }, statusBadge));

    frag.appendChild(h('h2', { class: 'mx-slideover__title', id: 'mx-slideover-title' },
      `${cell.ke_anzahl} Kompetenzerwartung${cell.ke_anzahl > 1 ? 'en' : (cell.ke_anzahl === 0 ? 'en' : '')}`));
    frag.appendChild(h('div', { class: 'mx-slideover__sub' },
      `${jgstObj?.label || jgst} · ${cell.lb_titel}`));

    if (cell.ke_anzahl === 0) {
      frag.appendChild(h('div', { class: 'cell-ausstehend-note' },
        cell.hinweis || 'Inhalt für diese Zelle steht noch aus.'));
      return frag;
    }

    (cell.kes || []).forEach((ke, idx) => {
      const sec = h('section', { class: 'ke-section' });
      sec.appendChild(h('div', { class: 'ke-section__head' },
        h('span', { class: 'ke-section__id' }, ke.ke_id),
        ke.operator && h('span', { class: 'ke-section__meta' }, ke.operator),
        ke.afb && h('span', { class: 'ke-section__meta' }, `AFB ${ke.afb}`),
        ke.umsetzung_typ && h('span', { class: 'ke-section__meta' }, ke.umsetzung_typ),
        h('h3', { class: 'ke-section__thema' }, ke.thema),
      ));
      sec.appendChild(h('p', { class: 'ke-section__wortlaut' },
        'Die Schülerinnen und Schüler ' + ke.ke_wortlaut));
      sec.appendChild(h('p', { class: 'ke-section__fundort' },
        'Fundort: ' + ke.fundort + (ke.ke_wortlaut_quelle ? ' · ' + ke.ke_wortlaut_quelle : '')));

      const metaRow = h('div', { class: 'ke-section__meta-row' });
      if (ke.inhalte) metaRow.appendChild(h('span', null, h('strong', null, 'Inhalte: '), ke.inhalte));
      sec.appendChild(metaRow);

      // LP+-Inhalte zu den Kompetenzen (auf Cell-Ebene · gilt für alle KEs der Zelle)
      if (idx === 0 && ke.inhalte_lp && ke.inhalte_lp.length) {
        const inhalteEl = h('div', { class: 'ke-section__inhalte-lp' });
        const ul = h('ul', null);
        ke.inhalte_lp.forEach(i => ul.appendChild(h('li', null, i)));
        inhalteEl.appendChild(ul);
        sec.appendChild(inhalteEl);
      }

      // Pilot-Sequenz wenn vorhanden — detaillierte 7-12 UEs
      if (ke.pilot_sequenz) {
        const p = ke.pilot_sequenz;
        sec.appendChild(h('div', { class: 'mx-section-h' },
          'Pilot-Sequenz · 45-min-UE-Plan'));
        sec.appendChild(h('div', { class: 'ke-section__umsetzung-titel' }, p.titel));
        sec.appendChild(h('div', { class: 'ke-section__umsetzung-meta' },
          `${p.gesamtzeit} · ${p.praxis}`));
        (p.ues_detail || []).forEach(ue => {
          sec.appendChild(renderPilotUE(ue));
        });
        if (p.bezuege_global && p.bezuege_global.length) {
          sec.appendChild(h('div', { class: 'mx-section-h' }, 'Globale Sequenz-Bezüge'));
          const list = h('div', { class: 'mx-bezug' });
          p.bezuege_global.forEach(b => {
            list.appendChild(h('div', { class: 'mx-bezug-item' },
              h('span', { class: 'mx-bezug-item__didaktik' }, b.didaktik),
              h('span', null, b.verweis),
            ));
          });
          sec.appendChild(list);
        }
      } else if (ke.umsetzung_titel || ke.ues?.length) {
        // Klassische Umsetzung (kompakter)
        sec.appendChild(h('div', { class: 'mx-section-h' },
          ke.umsetzung_typ === 'real' ? 'Reale Umsetzung (Praxis)' :
          ke.umsetzung_typ === 'idealtypisch' ? 'Idealtypische Umsetzung' :
          'Umsetzung'));
        if (ke.umsetzung_titel) sec.appendChild(h('div', { class: 'ke-section__umsetzung-titel' }, ke.umsetzung_titel));
        const metaText = [ke.umsetzung_klasse, ke.umsetzung_datum].filter(Boolean).join(' · ');
        if (metaText) sec.appendChild(h('div', { class: 'ke-section__umsetzung-meta' }, metaText));
        (ke.ues || []).forEach(ue => {
          const ueEl = h('div', { class: 'mx-ue' },
            h('div', { class: 'mx-ue__head' },
              h('span', { class: 'mx-ue__nr' }, ue.ebene === 'meta' ? '✱' : `UE ${ue.nr}`),
              h('span', { class: 'mx-ue__titel' }, ue.titel),
            ),
            h('p', { class: 'mx-ue__inhalt' }, ue.inhalt),
          );
          sec.appendChild(ueEl);
        });
      } else {
        sec.appendChild(h('div', { class: 'cell-ausstehend-note' },
          'Praxis-Umsetzung für diese KE steht noch aus.'));
      }

      // Klassische Bezuege (sofern nicht Pilot)
      if (!ke.pilot_sequenz && ke.bezuege && ke.bezuege.length) {
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
        if (!cell || cell.ke_anzahl === 0) {
          // Ausstehend
          const placeholder = h('div', { class: 'mx-cell mx-cell--data mx-cell--leer', role: 'gridcell' });
          placeholder.appendChild(h('span', { class: 'mx-cell__umsetzung' },
            cell?.quelle_status === 'ausstehend' ? '— Quelle ausstehend' : '— keine KE'));
          if (cell?.hinweis) placeholder.appendChild(h('div', { class: 'mx-cell__kurz' }, cell.hinweis));
          grid.appendChild(placeholder);
          return;
        }
        const cellEl = h('div', {
          class: 'mx-cell mx-cell--data',
          role: 'gridcell',
          tabindex: '0',
          'aria-label': `${jg.label} ${lb.id} — ${cell.ke_anzahl} Kompetenzerwartungen · Quelle: ${cell.quelle_status}`,
          data: { cellKey: key },
          onclick: () => openSlideover(key),
          onkeydown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSlideover(key); }
          },
        });
        const realCount = (cell.kes || []).filter(k => k.umsetzung_typ === 'real').length;
        cellEl.appendChild(h('div', { class: 'mx-cell__header' },
          h('span', { class: 'mx-cell__count' }, `${cell.ke_anzahl} KE${cell.ke_anzahl > 1 ? 's' : ''}`),
          h('span', { class: `quelle-badge quelle-badge--${cell.quelle_status || 'verbatim'}` },
            cell.quelle_status === 'verbatim' ? 'verbatim' :
            cell.quelle_status === 'sekundaer' ? 'sekundär' : 'ausstehend'),
        ));
        if (realCount > 0) {
          cellEl.appendChild(h('div', { class: 'mx-cell__umsetzung' }, `${realCount}× real durchgeführt`));
        }
        const themas = h('div', { class: 'mx-cell__themas' });
        (cell.kes || []).slice(0, 5).forEach(k => {
          themas.appendChild(h('div', { class: 'mx-cell__thema' },
            h('span', { class: 'mx-cell__thema-id' }, k.ke_id.split('-').pop()),
            k.thema.slice(0, 80) + (k.thema.length > 80 ? '…' : ''),
          ));
        });
        cellEl.appendChild(themas);
        // Pilot-Indikator
        if ((cell.kes || []).some(k => k.pilot_sequenz)) {
          cellEl.appendChild(h('div', {
            style: 'font-family: var(--mono); font-size: 9.5px; letter-spacing: 1px; color: var(--accent); margin-top: 4px; font-weight: 600;'
          }, '★ Pilot-Sequenz · 10 UEs detailliert'));
        }
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
