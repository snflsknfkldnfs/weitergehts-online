// LB-Matrix-Renderer Mathematik v6 · BUV-Template-konform · Mager-3-K + 4-Spuren-Diff
// Konsumiert window.MATRIX (data.js v3+) mit:
//   - cells[].sequenz (klassisch, v2: ues[] mit ebene/kompetenz/begruendung)
//   - cells[].sequenz.pilot_sequenz (v5: detaillierte BUV-Template-Sequenz)
//       · phasenSchema: 4-Phasen-Modell Mathe nach Engelking-B1 (Bausteinskript
//         Fachdidaktik · AG MS-Seminarleiter:innen Unterfranken): Erarbeitung des
//         mathematischen Problems · Operative Durchdringung · Übung und Schulung ·
//         Anwendung. EIS-Wechsel (Bruner 1966 als Repräsentationsmodell) lebt
//         INNERHALB der Erarbeitungsphase (konkretes Handeln · ikonisch/zeichnerisch ·
//         symbolisch bei fachgerechter Verbalisierung) — NICHT als eigene Phase.
//       · ues_detail[]: voll-Mager-Lernziele, AFB-Teilziele, 4-Spuren-Diff
//       · sequenz_meta: Lehrplanbezug + KE-Wortlaute verbatim + Schwerpunktstunde
//       · sequenz_tabelle: 8-Spalten BUV-Pflichtraster
//   - cells[].sequenz.ke_wortlaut_anker[] (optional · Ankerwörter für mark-Hervorhebung)
//
// Backward-compatible: cells ohne pilot_sequenz fallen auf klassisches v2-Rendering zurück.

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

  // ─── Engelking-4-Phasen-Schema Mathe (Bausteinskript B1, UE-Verlaufsstruktur) ─
  // Verbindliche UE-Verlaufsstruktur des Mathematikunterrichts MS Bayern-Unterfranken
  // nach Bausteinskript B1 „Der operative Lernprozess im Mathematikunterricht"
  // (Achim Engelking, SR · AG der MS-Seminarleiter:innen Unterfranken). Bruners
  // EIS-Modell ist ein Repräsentationsmodell (modes of representation), kein
  // Phasenmodell; der EIS-Wechsel (konkretes Handeln → ikonisch/zeichnerisch →
  // symbolisch · bei fachgerechter Verbalisierung) findet INNERHALB der
  // Erarbeitungsphase statt (Engelking-B1 Kap. 3.1).
  const PHASEN_DEFAULT_MATHE = [
    { id: 'erarbeitung',   label: '1 Erarbeitung des mathematischen Problems', kurz: 'EIS-Wechsel: konkretes Handeln → ikonisch → symbolisch (Engelking-B1)' },
    { id: 'durchdringung', label: '2 Operative Durchdringung',                 kurz: 'Reversibilität · Variabilität · Verbalisierung · Hefteintrag (Aebli operatives Prinzip)' },
    { id: 'uebung',        label: '3 Übung und Schulung',                       kurz: 'Mechanisierung · Automatisierung · operatives Üben (Wittmann)' },
    { id: 'anwendung',     label: '4 Anwendung',                                kurz: 'in neuen Sachsituationen · Integration in vorhandenes Wissen' },
  ];

  // ─── Mager-3-K Lernziel renderer ──────────────────────────────────────
  function renderMagerZiel(z, opts) {
    opts = opts || {};
    const el = h('div', { class: 'mx-mager' + (opts.compact ? ' mx-mager--compact' : '') });
    if (z.verhalten)  el.appendChild(h('span', { class: 'mx-mager__verhalten' }, z.verhalten + ' '));
    if (z.bedingung)  el.appendChild(h('span', { class: 'mx-mager__bedingung' }, z.bedingung + ' '));
    if (z.maszstab)   el.appendChild(h('span', { class: 'mx-mager__massstab' }, z.maszstab));
    return el;
  }

  // ─── Teilziele-Liste mit AFB-Tag + diff-Marker ────────────────────────
  function renderTeilziele(tzs) {
    const wrap = h('div', { class: 'mx-tz-list' });
    wrap.appendChild(h('div', { class: 'mx-tz-list__h' },
      `${tzs.length} Teilziele (Mager) · ${tzs.filter(t => t.differenziert).length} differenziert`));
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

  // ─── Pilot-UE-Komplettrendering (Mathe-spezifisch, generisch über phasenSchema) ─
  function renderPilotUE(ue, phasenSchema) {
    const schema = phasenSchema && phasenSchema.length ? phasenSchema : PHASEN_DEFAULT_MATHE;
    const el = h('div', { class: 'mx-ue mx-ue-pilot' });

    // Header: UE-Nr + Frage-Titel
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

    // Phasen-Grid · 4 Engelking-Phasen (Mathe) · generisch über schema.length
    const phasenClass = `mx-ue-phasen mx-ue-phasen--${schema.length}`;
    const phasen = h('div', { class: phasenClass });
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

    // Mathe-spezifische Prinzipien-Chips (statt GPG-B3)
    if (ue.prinzipien_mathe && ue.prinzipien_mathe.length) {
      const chips = h('div', { class: 'mx-ue-chips' });
      chips.appendChild(h('span', { class: 'mx-ue-chips__label' }, 'Mathe-Prinzipien'));
      ue.prinzipien_mathe.forEach(p => chips.appendChild(h('span', { class: 'mx-ue-chip' }, p)));
      el.appendChild(chips);
    } else if (ue.prinzipien_b3 && ue.prinzipien_b3.length) {
      // Backward-compat (falls von Sozialkunde-Vorlage übernommen)
      const chips = h('div', { class: 'mx-ue-chips' });
      chips.appendChild(h('span', { class: 'mx-ue-chips__label' }, 'Prinzipien'));
      ue.prinzipien_b3.forEach(p => chips.appendChild(h('span', { class: 'mx-ue-chip' }, p)));
      el.appendChild(chips);
    }

    // Kompetenzstrukturmodell (Mathe: 3-Achsen Gegenstand · Perspektive · Prozesskompetenz)
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

    // Personifikation/Praxis-Anker + Tafelbild als zwei kompakte Callouts
    if (ue.personifikation_anteil || ue.tafelbild_skizze) {
      const callouts = h('div', { class: 'mx-callouts' });
      if (ue.personifikation_anteil) {
        callouts.appendChild(h('div', { class: 'mx-callout mx-callout--pers' },
          h('span', { class: 'mx-callout__label' }, 'Praxis-Anker'),
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

  // ─── Sequenz-Meta-Card ────────────────────────────────────────────────
  function renderSequenzMeta(meta) {
    const card = h('div', { class: 'mx-seq-meta' });
    const rows = [
      ['Lehrplanbezug',                  meta.lehrplanbezug],
      ['Zielsetzung',                    meta.zielsetzung_uebergeordnet],
      ['Methodische Schwerpunkte',       (meta.methodische_schwerpunkte || []).join(' · ')],
      ['Kompetenzerwerb · Progression',  meta.kompetenzerwerb_progression],
      ['Praxis-Anker durchgängig',       meta.personifikation_durchgaengig],
      ['Schwerpunktstunde-Kandidat',     meta.schwerpunktstunde_kandidat],
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

  // ─── Sequenz-Tabelle (BUV-Template v4 Pflichtspalten · Mathe-Variante) ─
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

  // ─── Ankerwörter im KE-Wortlaut hervorheben (longest-first, ohne Overlaps) ─
  function renderAnkerText(text, anker) {
    const frag = document.createDocumentFragment();
    if (!text) return frag;
    if (!anker || !anker.length) { frag.appendChild(document.createTextNode(text)); return frag; }
    const terms = anker.slice().sort((a, b) => b.length - a.length).filter(Boolean);
    const lower = text.toLowerCase();
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

  // ─── Slideover-Content · Branching klassisch / pilot ──────────────────
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
      `${jgstObj?.label || jgst} · ${lbObj?.id || lbId} ${lbObj?.titel || ''}`
    ));
    frag.appendChild(h('div', { class: 'mx-slideover__ke' },
      `LP+ KE-Anker: ${cell.ke}`
    ));
    frag.appendChild(h('h2', { class: 'mx-slideover__title', id: 'mx-slideover-title' }, cell.titel));

    // Wenn KEINE sequenz vorhanden ist → Stub/Gerüst-Note rendern und beenden.
    // Bei vorhandener sequenz darf auch status='gerüst' oder 'skizze' rendern,
    // damit Teilsequenzen sichtbar werden.
    if (!cell.sequenz) {
      frag.appendChild(h('div', { class: 'mx-stub-note' },
        cell.status === 'gerüst'
          ? 'Gerüst — Sequenzplanung in Vorbereitung. Inhaltlicher Anker: ' + cell.kurz + '.'
          : 'Stub — Sequenzplanung folgt. Inhaltlicher Anker: ' + cell.kurz + '.'
      ));
      return frag;
    }
    // Status-Banner für noch-nicht-vollständig-ausgearbeitete Zellen
    if (cell.status === 'skizze') {
      frag.appendChild(h('div', { class: 'mx-status-banner mx-status-banner--skizze' },
        'Skizze · innovative Unterrichtsidee + Sequenzbogen · UEs noch nicht voll ausgearbeitet'));
    } else if (cell.status === 'gerüst') {
      frag.appendChild(h('div', { class: 'mx-status-banner mx-status-banner--geruest' },
        'Gerüst-Sequenz · Hauptphasen ausgearbeitet · Praxisfeinheiten in Vorbereitung'));
    }

    const s = cell.sequenz;

    // KE-Wortlaut mit Anker-Highlighting (falls anker vorhanden)
    if (s.ke_wortlaut) {
      const wortlautEl = h('p', { class: 'mx-slideover__ke-wortlaut' });
      if (s.ke_wortlaut_anker && s.ke_wortlaut_anker.length) {
        wortlautEl.appendChild(renderAnkerText(s.ke_wortlaut, s.ke_wortlaut_anker));
      } else {
        wortlautEl.appendChild(document.createTextNode(s.ke_wortlaut));
      }
      frag.appendChild(wortlautEl);

      // Ankerwörter-Leiste
      if (s.ke_wortlaut_anker && s.ke_wortlaut_anker.length) {
        const ankerRow = h('div', { class: 'ke-section__anker-row' });
        ankerRow.appendChild(h('span', { class: 'ke-section__anker-label' }, 'Anker'));
        s.ke_wortlaut_anker.forEach(a => ankerRow.appendChild(h('span', { class: 'ke-section__anker-chip' }, a)));
        frag.appendChild(ankerRow);
      }
    }
    if (s.ke_quelle) {
      frag.appendChild(h('p', { class: 'mx-slideover__ke-quelle' }, 'Quelle: ' + s.ke_quelle));
    }
    if (s.ueberblick) {
      frag.appendChild(h('p', { class: 'mx-slideover__ueberblick' }, s.ueberblick));
    }

    // ─── PILOT-SEQUENZ-RENDERING ──────────────────────────────────────
    if (s.pilot_sequenz) {
      const p = s.pilot_sequenz;
      frag.appendChild(h('div', { class: 'mx-section-h' },
        'Pilot-Sequenz · BUV-Template v5 · 4-Phasen-Struktur (Engelking-B1) · EIS-Wechsel in Erarbeitung'));
      if (p.titel) frag.appendChild(h('div', { class: 'ke-section__umsetzung-titel' }, p.titel));
      if (p.gesamtzeit || p.praxis) {
        frag.appendChild(h('div', { class: 'ke-section__umsetzung-meta' },
          [p.gesamtzeit, p.praxis].filter(Boolean).join(' · ')));
      }
      if (p.qualitaetsstandards_quelle) {
        frag.appendChild(h('div', { class: 'mx-quelle-note' },
          'Standards-Quelle: ' + p.qualitaetsstandards_quelle));
      }

      // Sequenz-Metadaten-Karte
      if (p.sequenz_meta) {
        frag.appendChild(h('div', { class: 'mx-section-h mx-section-h--sub' }, 'Sequenz-Metadaten'));
        frag.appendChild(renderSequenzMeta(p.sequenz_meta));
      }

      // Sequenz-Tabelle (Pflichtspalten BUV-Template v4)
      if (p.sequenz_tabelle && p.sequenz_tabelle.length) {
        frag.appendChild(h('div', { class: 'mx-section-h mx-section-h--sub' }, 'Sequenzplan · Übersicht'));
        frag.appendChild(renderSequenzTabelle(p.sequenz_tabelle));
      }

      // Phasen-Standard-Hinweis
      if (p.phasenStandard) {
        frag.appendChild(h('div', { class: 'mx-phasen-legend' },
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
        frag.appendChild(legend);
      }

      // UE-Verlaufspläne
      const ueCount = (p.ues_detail || []).length;
      frag.appendChild(h('div', { class: 'mx-section-h mx-section-h--sub' },
        `UE-Verlaufspläne · ${ueCount} × 45 min`));
      (p.ues_detail || []).forEach(ue => {
        frag.appendChild(renderPilotUE(ue, p.phasenSchema));
      });

      // Globale Sequenz-Bezüge (didaktische Verankerung)
      const globalBezuege = p.bezuege_global || s.bezuege || [];
      if (globalBezuege.length) {
        frag.appendChild(h('div', { class: 'mx-section-h' }, 'Fachdidaktische Bezüge'));
        const list = h('div', { class: 'mx-bezug' });
        globalBezuege.forEach(b => {
          list.appendChild(h('div', { class: 'mx-bezug-item' },
            h('span', { class: 'mx-bezug-item__didaktik' }, b.didaktik),
            h('span', null, b.verweis),
          ));
        });
        frag.appendChild(list);
      }
      return frag;
    }

    // ─── KLASSISCHES v2-RENDERING (Fallback für M5_LB3, M7_LB4, M8_LB4) ─
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
        const isPilot = !!(cell.sequenz && cell.sequenz.pilot_sequenz);
        const cellEl = h('div', {
          class: `mx-cell mx-cell--data mx-cell--${status}`,
          role: 'gridcell',
          tabindex: '0',
          'aria-label': `${cell.ke} ${cell.titel} — ${cell.kurz} — ${status === 'ausgearbeitet' ? 'Sequenzplanung verfügbar' : 'Inhalt in Vorbereitung'}${isPilot ? ' · Pilot-Sequenz' : ''}`,
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
          h('div', { class: 'mx-cell__header' },
            h('span', { class: 'mx-cell__ke' }, cell.ke),
            isPilot && h('span', { class: 'quelle-badge quelle-badge--verbatim' }, 'Pilot'),
          ),
          h('span', { class: 'mx-cell__titel' }, cell.titel),
          h('span', { class: 'mx-cell__kurz' }, cell.kurz),
          isPilot && h('div', {
            style: 'font-family: var(--mono); font-size: 9.5px; letter-spacing: 1px; color: var(--accent); margin-top: 4px; font-weight: 600;'
          }, '★ Pilot-Sequenz · BUV-v4 detailliert'),
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
