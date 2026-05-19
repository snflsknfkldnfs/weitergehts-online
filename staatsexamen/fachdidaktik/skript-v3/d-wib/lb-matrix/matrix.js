// GB-Matrix-Renderer WiB v3 · 13-Phasen-Standard (Bausteinskript Moritz-Steigerwald)
// Konsumiert window.MATRIX (data.js v3) mit:
//   - cells.kes[].pilot_sequenz.ues_detail[] · 13-Phasen-Artikulation pro UE
//     (p01 Hinführung · p02 Problemstufe · p03 Problemformulierung · p04 Vermutungen
//      · p05 Lösungsplanung · p06 Lösung-Hauptphase · p07 Präsentation
//      · p08 Erkenntnisstufe · p09 Wertungsstufe · p10 Gesamtzusammenfassung
//      · p11 Vermutungen-prüfen · p12 Transfer · p13 Sicherung)
//   - cells.kes[].pilot_sequenz.phasenSchema · 13 Phasen-Items mit id/label/kurz
//   - cells.kes[].pilot_sequenz.ues_detail[].prinzipien_b3[] · WiB-B3-Prinzipien-Chips
//   - cells.kes[].pilot_sequenz.ues_detail[].kompetenzstruktur · 3-Achsen WiB-KSM
//   - cells.kes[].ke_wortlaut_anker[] · Ankerwoerter (sofern gesetzt)
//   - cells.kes[].ke_wortlaut_quelle (verbatim/sekundaer)
//   - cells.kes[].inhalte_lp[] (LP+-Inhalte zu Kompetenzen)
//   - cells.quelle_status (verbatim/sekundaer/ausstehend)
//   - cells uses gb / gb_titel (vs. lb/lb_titel in Sozialkunde)

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

  // WiB-Bayern 13-Phasen-Strukturmodell — Primärquelle:
  //   Moritz-Steigerwald, Nadine, SRin: Baustein GB »Planung von Unterrichtseinheiten
  //   im Fach Wirtschaft und Beruf«. AG der MS-Seminarleiter:innen Unterfranken.
  // Ergänzende fachdidaktische Bezüge (Sekundärliteratur):
  //   Köck (2021) Methoden als Kompetenzen · Roth (1957) 6 Lernstufen ·
  //   Meyer (2008) Drei-Phasen-Grundrhythmus.
  const PHASEN_DEFAULT_WIB = [
    { id: 'p01', label: '1 Hinführung / Vorwissensaktivierung', kurz: 'Gelerntes und Neuzulernendes verbinden · Lernmotivation' },
    { id: 'p02', label: '2 Problemstufe',                       kurz: 'Lebenserfahrungen problematisieren · Erfahrungen abrufen' },
    { id: 'p03', label: '3 Problemformulierung / Zielangabe',   kurz: 'Transparenz Stundenthema + prozessbez. Kompetenz' },
    { id: 'p04', label: '4 Vermutungen',                        kurz: 'Vorwissen aktivieren · Hypothesen sammeln (unbewertet)' },
    { id: 'p05', label: '5 Lösungsplanung / Teilintentionen',   kurz: 'Was · Wozu · Wer · Wie · Womit' },
    { id: 'p06', label: '6 Lösung (Hauptphase)',                kurz: 'Selbstständige Informationsgewinnung · L als Berater · Differenzierung' },
    { id: 'p07', label: '7 Präsentation',                       kurz: 'SuS als Experten · Ergebnisse vortragen + begründen' },
    { id: 'p08', label: '8 Erkenntnisstufe / Problembeurteilung', kurz: 'Faktenwissen → Strukturwissen · Begriffsarbeit · Fachsprache' },
    { id: 'p09', label: '9 Wertungsstufe',                      kurz: 'Persönliche Stellungnahme · Vergleich mit eigenen Erfahrungen' },
    { id: 'p10', label: '10 Gesamtzusammenfassung',             kurz: 'SuS verbalisieren Kernerkenntnisse' },
    { id: 'p11', label: '11 Vermutungen prüfen',                kurz: 'Verifizieren / Falsifizieren der Eingangsvermutungen' },
    { id: 'p12', label: '12 Transfer',                          kurz: 'Anwendung in verschiedenen Zusammenhängen / Fallbeispiele' },
    { id: 'p13', label: '13 Sicherung',                         kurz: 'Reflexion des Lernprozesses · individueller Lernzuwachs' },
  ];
  // Backwards-compatibility-Alias (alte Variable-Name)
  const PHASEN_DEFAULT = PHASEN_DEFAULT_WIB;

  // Mager-3-K Lernziel renderer (Verhalten · Bedingung · Maßstab)
  function renderMagerZiel(z, opts) {
    opts = opts || {};
    const el = h('div', { class: 'mx-mager' + (opts.compact ? ' mx-mager--compact' : '') });
    if (z.verhalten)  el.appendChild(h('span', { class: 'mx-mager__verhalten' }, z.verhalten + ' '));
    if (z.bedingung)  el.appendChild(h('span', { class: 'mx-mager__bedingung' }, z.bedingung + ' '));
    if (z.maszstab)   el.appendChild(h('span', { class: 'mx-mager__massstab' }, z.maszstab));
    return el;
  }

  // Teilziele-Liste mit AFB-Tag + diff-Marker
  function renderTeilziele(tzs) {
    const wrap = h('div', { class: 'mx-tz-list' });
    wrap.appendChild(h('div', { class: 'mx-tz-list__h' }, `${tzs.length} Teilziele (Mager) · ${tzs.filter(t => t.differenziert).length} differenziert`));
    const ol = h('ol', { class: 'mx-tz-list__ol' });
    tzs.forEach((t, i) => {
      const li = h('li', { class: 'mx-tz' + (t.differenziert ? ' mx-tz--diff' : '') });
      li.appendChild(h('span', { class: 'mx-tz__head' },
        h('span', { class: 'mx-tz__nr' }, `TZ${i+1}`),
        t.afb && h('span', { class: `mx-tz__afb mx-tz__afb--${t.afb.toLowerCase()}` }, `AFB ${t.afb}`),
        t.differenziert && h('span', { class: 'mx-tz__diff-tag' }, 'differenziert'),
      ));
      li.appendChild(h('span', { class: 'mx-tz__body' },
        h('span', { class: 'mx-mager__verhalten' }, t.tz + ' '),
        h('span', { class: 'mx-mager__bedingung' }, t.indem + ' '),
        h('span', { class: 'mx-mager__massstab' }, t.erkennbar),
      ));
      ol.appendChild(li);
    });
    wrap.appendChild(ol);
    return wrap;
  }

  function renderPilotUE(ue, phasenSchema) {
    const schema = phasenSchema && phasenSchema.length ? phasenSchema : PHASEN_DEFAULT;
    const el = h('div', { class: 'mx-ue mx-ue-pilot' });

    // Header: UE-Nr + Frage-Titel (statt Aussage-Titel)
    el.appendChild(h('div', { class: 'mx-ue__head' },
      h('span', { class: 'mx-ue__nr' }, `UE ${ue.nr}`),
      h('span', { class: 'mx-ue__titel' }, ue.titel),
      ue.minuten && h('span', { class: 'mx-ue__meta' }, `${ue.minuten} min`),
    ));
    if (ue.stundenthema_frage) {
      el.appendChild(h('p', { class: 'mx-ue__frage' }, ue.stundenthema_frage));
    }

    // Mager-3-K Stundenziel
    if (ue.lernziel_stundenziel && (ue.lernziel_stundenziel.verhalten || ue.lernziel_stundenziel.bedingung)) {
      const lzBlock = h('div', { class: 'mx-ue__sz' });
      lzBlock.appendChild(h('div', { class: 'mx-ue__sz-label' }, 'Stundenziel (Mager)'));
      lzBlock.appendChild(renderMagerZiel(ue.lernziel_stundenziel));
      el.appendChild(lzBlock);
    } else if (ue.lernziel) {
      el.appendChild(h('p', { class: 'mx-ue__lernziel' }, ue.lernziel));
    }

    // Teilziele
    if (ue.lernziel_teilziele && ue.lernziel_teilziele.length) {
      el.appendChild(renderTeilziele(ue.lernziel_teilziele));
    }

    // 13-Phasen-Artikulation mit Sozialform-Tag pro Phase (Bausteinskript Moritz-Steigerwald)
    const phasen = h('div', { class: 'mx-ue-phasen mx-ue-phasen--13' });
    schema.forEach(p => {
      const body = ue[p.id];
      if (!body) return;
      const labelEl = h('div', { class: 'mx-ue-phasen__label', title: p.kurz }, p.label);
      phasen.appendChild(labelEl);
      const bodyEl = h('div', { class: 'mx-ue-phasen__body' });
      const sf = ue.sozialform_phasen && ue.sozialform_phasen[p.id];
      if (sf) bodyEl.appendChild(h('span', { class: 'mx-ue-phasen__sozialform' }, sf));
      bodyEl.appendChild(document.createTextNode(body));
      phasen.appendChild(bodyEl);
    });
    el.appendChild(phasen);

    // GPG-B3-Prinzipien als Chips
    if (ue.prinzipien_b3 && ue.prinzipien_b3.length) {
      const chips = h('div', { class: 'mx-ue-chips' });
      chips.appendChild(h('span', { class: 'mx-ue-chips__label' }, 'GPG-B3'));
      ue.prinzipien_b3.forEach(p => chips.appendChild(h('span', { class: 'mx-ue-chip' }, p)));
      el.appendChild(chips);
    }

    // Kompetenzstrukturmodell
    if (ue.kompetenzstruktur) {
      const k = ue.kompetenzstruktur;
      const kse = h('div', { class: 'mx-ue-kse' });
      kse.appendChild(h('span', { class: 'mx-ue-kse__label' }, 'Kompetenzstruktur'));
      if (k.gegenstand)        kse.appendChild(h('span', { class: 'mx-ue-kse__axis' }, h('em', null, 'Gegenstand: '), k.gegenstand));
      if (k.perspektive)       kse.appendChild(h('span', { class: 'mx-ue-kse__axis' }, h('em', null, 'Perspektive: '), k.perspektive));
      if (k.prozesskompetenz)  kse.appendChild(h('span', { class: 'mx-ue-kse__axis' }, h('em', null, 'Prozess: '), k.prozesskompetenz));
      el.appendChild(kse);
    }

    // Differenzierungs-Block (4 Spuren)
    if (ue.differenzierung_block) {
      const d = ue.differenzierung_block;
      const block = h('div', { class: 'mx-diff-block' });
      block.appendChild(h('div', { class: 'mx-diff-block__h' }, 'Differenzierung · 4 Spuren'));
      const grid = h('div', { class: 'mx-diff-grid' });
      const spuren = [
        { id: 'daz',              label: 'DaZ',              text: d.daz },
        { id: 'lrs',              label: 'LRS',              text: d.lrs },
        { id: 'leistungsschwach', label: 'Leistungsschwach', text: d.leistungsschwach },
        { id: 'leistungsstark',   label: 'Leistungsstark',   text: d.leistungsstark },
      ];
      spuren.forEach(s => {
        if (!s.text) return;
        const cell = h('div', { class: `mx-diff-cell mx-diff-cell--${s.id}` });
        cell.appendChild(h('span', { class: 'mx-diff-cell__label' }, s.label));
        cell.appendChild(h('span', { class: 'mx-diff-cell__body' }, s.text));
        grid.appendChild(cell);
      });
      block.appendChild(grid);
      el.appendChild(block);
    }

    // Personifikation + Tafelbild als zwei kompakte Callouts
    if (ue.personifikation_anteil || ue.tafelbild_skizze) {
      const callouts = h('div', { class: 'mx-callouts' });
      if (ue.personifikation_anteil) {
        callouts.appendChild(h('div', { class: 'mx-callout mx-callout--pers' },
          h('span', { class: 'mx-callout__label' }, 'Personifikation'),
          h('span', null, ue.personifikation_anteil),
        ));
      }
      if (ue.tafelbild_skizze) {
        callouts.appendChild(h('div', { class: 'mx-callout mx-callout--tafel' },
          h('span', { class: 'mx-callout__label' }, 'Tafelbild'),
          h('span', null, ue.tafelbild_skizze),
        ));
      }
      el.appendChild(callouts);
    }

    // Meta-Grid (Material · Hausaufgabe · LP+-Bezug · Didaktik)
    if (ue.material || ue.hausaufgabe || ue.lp_bezug || ue.didaktik) {
      const meta = h('div', { class: 'mx-ue-meta-grid' });
      if (ue.material)    { meta.appendChild(h('div', null, h('b', null, 'Material'), ue.material)); }
      if (ue.hausaufgabe && ue.hausaufgabe !== '—') {
        meta.appendChild(h('div', null, h('b', null, 'Hausaufgabe'), ue.hausaufgabe));
      }
      if (ue.lp_bezug)    { meta.appendChild(h('div', null, h('b', null, 'LP+-Bezug'), ue.lp_bezug)); }
      if (ue.didaktik)    { meta.appendChild(h('div', null, h('b', null, 'Didaktik'), ue.didaktik)); }
      el.appendChild(meta);
    }
    return el;
  }

  // Sequenz-Meta-Card (vor Sequenz-Tabelle)
  function renderSequenzMeta(meta) {
    const card = h('div', { class: 'mx-seq-meta' });
    const rows = [
      ['Lehrplanbezug',        meta.lehrplanbezug],
      ['Zielsetzung',          meta.zielsetzung_uebergeordnet],
      ['Methodische Schwerpunkte', (meta.methodische_schwerpunkte || []).join(' · ')],
      ['Kompetenzerwerb · Progression', meta.kompetenzerwerb_progression],
      ['Personifikation durchgängig',   meta.personifikation_durchgaengig],
      ['Schwerpunktstunde-Kandidat',    meta.schwerpunktstunde_kandidat],
    ];
    rows.forEach(([k, v]) => {
      if (!v) return;
      card.appendChild(h('div', { class: 'mx-seq-meta__row' },
        h('span', { class: 'mx-seq-meta__k' }, k),
        h('span', { class: 'mx-seq-meta__v' }, v),
      ));
    });
    if (meta.kompetenzerwartungen_verbatim && meta.kompetenzerwartungen_verbatim.length) {
      const row = h('div', { class: 'mx-seq-meta__row' },
        h('span', { class: 'mx-seq-meta__k' }, 'KE-Wortlaute (LP+ verbatim)'),
      );
      const ul = h('ul', { class: 'mx-seq-meta__list' });
      meta.kompetenzerwartungen_verbatim.forEach(ke => ul.appendChild(h('li', null, ke)));
      row.appendChild(ul);
      card.appendChild(row);
    }
    if (meta.inhalte_lp_verbatim && meta.inhalte_lp_verbatim.length) {
      const row = h('div', { class: 'mx-seq-meta__row' },
        h('span', { class: 'mx-seq-meta__k' }, 'Inhalte zu den Kompetenzen (LP+ verbatim)'),
      );
      const ul = h('ul', { class: 'mx-seq-meta__list' });
      meta.inhalte_lp_verbatim.forEach(t => ul.appendChild(h('li', null, t)));
      row.appendChild(ul);
      card.appendChild(row);
    }
    return card;
  }

  // Sequenz-Tabelle (Pflichtspalten BUV-Template v4 Abschn. 4.3)
  function renderSequenzTabelle(rows) {
    const wrap = h('div', { class: 'mx-seq-tab-wrap' });
    const tbl = h('table', { class: 'mx-seq-tab' });
    const thead = h('thead', null,
      h('tr', null,
        h('th', null, 'UZE'),
        h('th', null, 'Datum'),
        h('th', null, 'Stundenthema (Frage)'),
        h('th', null, 'Prozesskompetenz'),
        h('th', null, 'Gegenstand'),
        h('th', null, 'Perspektive'),
        h('th', null, 'Stundenziel (kurz)'),
        h('th', null, 'Kommentar'),
      ),
    );
    const tbody = h('tbody');
    rows.forEach(r => {
      const tr = h('tr', { class: r.schwerpunkt ? 'mx-seq-tab__row--schwerpunkt' : null });
      tr.appendChild(h('td', { class: 'mx-seq-tab__uze' }, r.uze + (r.schwerpunkt ? ' ★' : '')));
      tr.appendChild(h('td', null, r.datum || ''));
      tr.appendChild(h('td', { class: 'mx-seq-tab__frage' }, r.stundenthema_frage || ''));
      tr.appendChild(h('td', null, r.prozesskompetenz || ''));
      tr.appendChild(h('td', null, r.gegenstand || ''));
      tr.appendChild(h('td', null, r.perspektive || ''));
      tr.appendChild(h('td', null, r.stundenziel_kurz || ''));
      tr.appendChild(h('td', null, r.kommentar || ''));
      tbody.appendChild(tr);
    });
    tbl.appendChild(thead);
    tbl.appendChild(tbody);
    wrap.appendChild(tbl);
    return wrap;
  }

  // Ankerwörter im KE-Wortlaut hervorheben (longest-first, case-insensitive,
  // ohne überlappende Treffer). Liefert ein DocumentFragment mit gemischten
  // Text- und <mark>-Knoten.
  function renderAnkerText(text, anker) {
    const frag = document.createDocumentFragment();
    if (!text) return frag;
    if (!anker || !anker.length) { frag.appendChild(document.createTextNode(text)); return frag; }
    const terms = anker.slice().sort((a, b) => b.length - a.length).filter(Boolean);
    const lower = text.toLowerCase();
    // Build sorted, non-overlapping match-list
    const matches = [];
    const taken = new Array(text.length).fill(false);
    terms.forEach(t => {
      const tl = t.toLowerCase();
      let from = 0;
      while (true) {
        const idx = lower.indexOf(tl, from);
        if (idx < 0) break;
        let collision = false;
        for (let i = idx; i < idx + tl.length; i++) if (taken[i]) { collision = true; break; }
        if (!collision) {
          for (let i = idx; i < idx + tl.length; i++) taken[i] = true;
          matches.push({ start: idx, end: idx + tl.length });
        }
        from = idx + tl.length;
      }
    });
    matches.sort((a, b) => a.start - b.start);
    let cursor = 0;
    matches.forEach(m => {
      if (m.start > cursor) frag.appendChild(document.createTextNode(text.slice(cursor, m.start)));
      const mark = document.createElement('mark');
      mark.className = 'ke-anker';
      mark.textContent = text.slice(m.start, m.end);
      frag.appendChild(mark);
      cursor = m.end;
    });
    if (cursor < text.length) frag.appendChild(document.createTextNode(text.slice(cursor)));
    return frag;
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
      `${jgstObj?.label || jgst} · ${cell.gb_titel || cell.lb_titel || ''}`));

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
      // KE-Wortlaut mit Ankerwörter-Hervorhebung (statt Verbatim-Flut)
      const wortlautEl = h('p', { class: 'ke-section__wortlaut' });
      wortlautEl.appendChild(document.createTextNode('Die Schülerinnen und Schüler '));
      wortlautEl.appendChild(renderAnkerText(ke.ke_wortlaut, ke.ke_wortlaut_anker));
      sec.appendChild(wortlautEl);

      // Ankerwörter-Leiste (Schnellerfassung)
      if (ke.ke_wortlaut_anker && ke.ke_wortlaut_anker.length) {
        const ankerRow = h('div', { class: 'ke-section__anker-row' });
        ankerRow.appendChild(h('span', { class: 'ke-section__anker-label' }, 'Anker'));
        ke.ke_wortlaut_anker.forEach(a => ankerRow.appendChild(h('span', { class: 'ke-section__anker-chip' }, a)));
        sec.appendChild(ankerRow);
      }

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
          'Pilot-Sequenz · BUV-Template v4 · 13-Phasen-Standard (Bausteinskript Moritz-Steigerwald · Unterfranken)'));
        sec.appendChild(h('div', { class: 'ke-section__umsetzung-titel' }, p.titel));
        sec.appendChild(h('div', { class: 'ke-section__umsetzung-meta' },
          `${p.gesamtzeit} · ${p.praxis}`));
        if (p.qualitaetsstandards_quelle) {
          sec.appendChild(h('div', { class: 'mx-quelle-note' },
            'Standards-Quelle: ' + p.qualitaetsstandards_quelle));
        }

        // Sequenz-Metadaten-Karte
        if (p.sequenz_meta) {
          sec.appendChild(h('div', { class: 'mx-section-h mx-section-h--sub' }, 'Sequenz-Metadaten'));
          sec.appendChild(renderSequenzMeta(p.sequenz_meta));
        }

        // Sequenz-Tabelle (Pflichtspalten BUV-Template v4)
        if (p.sequenz_tabelle && p.sequenz_tabelle.length) {
          sec.appendChild(h('div', { class: 'mx-section-h mx-section-h--sub' }, 'Sequenzplan · Übersicht'));
          sec.appendChild(renderSequenzTabelle(p.sequenz_tabelle));
        }

        // Phasen-Standard-Hinweis
        if (p.phasenStandard) {
          sec.appendChild(h('div', { class: 'mx-phasen-legend' },
            h('span', { class: 'mx-phasen-legend__label' }, 'Phasen-Standard'),
            h('span', { class: 'mx-phasen-legend__body' }, p.phasenStandard),
          ));
        }
        if (p.phasenSchema && p.phasenSchema.length) {
          const legend = h('ol', { class: 'mx-phasen-keyline' });
          p.phasenSchema.forEach(ph => {
            legend.appendChild(h('li', { class: 'mx-phasen-keyline__item' },
              h('span', { class: 'mx-phasen-keyline__nr' }, ph.label),
              h('span', { class: 'mx-phasen-keyline__kurz' }, ph.kurz),
            ));
          });
          sec.appendChild(legend);
        }

        sec.appendChild(h('div', { class: 'mx-section-h mx-section-h--sub' }, 'UE-Verlaufspläne · 8 × 45 min'));
        (p.ues_detail || []).forEach(ue => {
          sec.appendChild(renderPilotUE(ue, p.phasenSchema));
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
    const grid = h('div', { class: 'mx-grid', role: 'grid', 'aria-label': 'GB-Matrix WiB' });
    grid.appendChild(h('div', { class: 'mx-cell mx-cell--corner', role: 'columnheader' }, 'GB →'));
    M.lernbereiche.forEach(lb => {
      // Spaltenheader: ausformulierter Titel (kein GB-/LB-Code im UI)
      grid.appendChild(h('div', { class: 'mx-cell mx-cell--lb-head', role: 'columnheader' },
        lb.titel,
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
          }, '★ Pilot-Sequenz · 8 UEs detailliert'));
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
