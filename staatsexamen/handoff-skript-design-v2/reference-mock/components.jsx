// skripts/components.jsx — gemeinsame Skript-Komponenten
// Pattern aus L3-Implementierung übernommen (RESTYLING.md §3/§4):
// Norm-Tag · Glossar-Slideover · Status-Dot · Mono-Cap · Reveal · Falle · Fall · Kartografie.

const { useState, useEffect, useRef } = React;

/* ─── Mono-Cap ───────────────────────────────────────────────────────── */

function MonoCap({ children, variant = 'muted', style }) {
  const cls =
    variant === 'accent' ? 'mono-cap mono-cap--accent' :
    variant === 'ink'    ? 'mono-cap mono-cap--ink'    : 'mono-cap';
  return <span className={cls} style={style}>{children}</span>;
}

/* ─── Status-Dot + Helper ────────────────────────────────────────────── */

const STATUS = {
  planned: { label: 'in Vorbereitung', cls: '' },
  open:    { label: 'offen',           cls: 'status-dot--open' },
  work:    { label: 'in Arbeit',       cls: 'status-dot--work' },
  repeat:  { label: 'wiederholt',      cls: 'status-dot--repeat' },
  sit:     { label: 'sitzt',           cls: 'status-dot--sit' },
};

function StatusDot({ status = 'open', size = 10 }) {
  const meta = STATUS[status] || STATUS.open;
  return (
    <span
      className={`status-dot ${meta.cls}`}
      style={{ width: size, height: size }}
      title={meta.label}
    />
  );
}

/* Stacked status-bar (z. B. „A.1 · 3/5 sitzen · 1 wackelt") */
function StatusBar({ counts, height = 5 }) {
  // counts = { sit, repeat, work, open, planned }
  const order = ['sit', 'repeat', 'work', 'open', 'planned'];
  const total = order.reduce((s, k) => s + (counts[k] || 0), 0) || 1;
  const color = {
    sit: 'var(--status-sit)',
    repeat: 'var(--status-repeat)',
    work: 'var(--status-work)',
    open: 'var(--status-open)',
    planned: 'var(--mute2)',
  };
  return (
    <div style={{ height, display: 'flex', gap: 1, width: '100%' }}>
      {order.map(k => (
        counts[k] ? (
          <div key={k} style={{
            width: `${(counts[k] / total) * 100}%`,
            background: color[k],
          }} />
        ) : null
      ))}
    </div>
  );
}

/* ─── Glossar-Slideover (Singleton via Event-Bus) ────────────────────── */

function GlossarSlideover() {
  const [name, setName] = useState(null);
  useEffect(() => {
    const onOpen = (e) => setName(e.detail);
    const onKey  = (e) => { if (e.key === 'Escape') setName(null); };
    window.addEventListener('skript:glossar', onOpen);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('skript:glossar', onOpen);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const entry = name ? (window.MP05.glossar[name] || null) : null;
  const open = !!name;

  return (
    <>
      <div className="slideover-backdrop" data-open={open} onClick={() => setName(null)} />
      <div className="slideover" data-open={open} role="dialog" aria-modal="true" aria-hidden={!open}>
        <div className="slideover-inner">
          {entry ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 20 }}>
                <MonoCap variant="accent">{name}</MonoCap>
                <button
                  onClick={() => setName(null)}
                  style={{
                    border: 'none', background: 'transparent', cursor: 'pointer',
                    fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: 1.2,
                    textTransform: 'uppercase', color: 'var(--muted)',
                  }}
                >ESC · schließen</button>
              </div>
              <h3 style={{
                fontFamily: 'var(--sans)', fontWeight: 600,
                fontSize: 28, letterSpacing: -0.6, lineHeight: 1.2,
                margin: '8px 0 18px',
              }}>{entry.titel}</h3>
              <div style={{
                fontFamily: 'var(--serif)', fontSize: 16.5, lineHeight: 1.6,
                color: 'var(--ink)', borderLeft: '2px solid var(--accent)',
                padding: '4px 0 4px 18px', marginBottom: 22,
              }}>{entry.wortlaut}</div>
              {entry.karten && entry.karten.length > 0 && (
                <div style={{
                  borderTop: '1px solid var(--rule)', paddingTop: 14,
                  display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap',
                }}>
                  <MonoCap>Karten zum Üben</MonoCap>
                  {entry.karten.map(k => (
                    <span key={k} className="norm-tag" style={{ color: 'var(--accent)' }}>{k}</span>
                  ))}
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

/* ─── NormTag ────────────────────────────────────────────────────────── */

function NormTag({ name, children }) {
  return (
    <button
      type="button"
      className="norm-tag"
      onClick={() => window.dispatchEvent(new CustomEvent('skript:glossar', { detail: name }))}
    >
      {children || name}
    </button>
  );
}

/* ─── KartografieList (ersetzt Mermaid) ──────────────────────────────── */

function KartografieList({ rows }) {
  return (
    <div>
      {rows.map(r => (
        <div key={r.ebene} className="kartografie">
          <span className="kartografie-ebene">{r.ebene}.</span>
          <span>
            <div className="kartografie-bez">{r.bez}</div>
            <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic',
              fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{r.sub}</div>
          </span>
          <span className="kartografie-normen">
            {r.normen.map(n => <NormTag key={n} name={n} />)}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Reveal-Karte (Top-8) ───────────────────────────────────────────── */

function RevealCard({ card }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="reveal-card"
      data-state={open ? 'open' : 'closed'}
      onClick={() => setOpen(o => !o)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <MonoCap variant="accent">{card.id} · {card.titel}</MonoCap>
        <StatusDot status={card.status} size={9} />
      </div>
      <div style={{
        marginTop: 12, fontSize: 16, lineHeight: 1.4, fontWeight: 500,
        letterSpacing: -0.1, color: 'var(--ink)', minHeight: 70,
      }}>{card.frage}</div>

      {open && (
        <div style={{
          marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--rule)',
          fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 14.5,
          lineHeight: 1.55, color: 'var(--ink)',
        }}>{card.antwort}</div>
      )}

      <div style={{
        marginTop: open ? 14 : 12,
        display: 'flex', alignItems: 'center', gap: 8,
      }} onClick={e => e.stopPropagation()}>
        <NormTag name={card.norm} />
        <span className="reveal-hint">{open ? 'Tippen · zu' : 'Tippen · Lösung'}</span>
      </div>
    </div>
  );
}

/* ─── FalleRow (Akkordeon) ───────────────────────────────────────────── */

function FalleRow({ falle, status = 'open', onStatusCycle }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="fa-row"
      data-open={open}
      onClick={() => setOpen(o => !o)}
    >
      <span onClick={e => { e.stopPropagation(); onStatusCycle && onStatusCycle(); }}>
        <StatusDot status={status} size={9} />
      </span>
      <span className="fa-id">{falle.id}</span>
      <div>
        <div className="fa-question">{falle.frage}</div>
        {open && <div className="fa-answer">{falle.antwort}</div>}
      </div>
      <span className="fa-chevron">›</span>
    </div>
  );
}

/* ─── FallCard (Fallbeispiel) ────────────────────────────────────────── */

function FallCard({ fall, status = 'open' }) {
  const [showKnack, setShowKnack] = useState(false);
  const [showLoes, setShowLoes]   = useState(false);
  return (
    <div style={{
      border: '1px solid var(--hairline)', background: 'var(--paper)',
      padding: '22px 26px', marginBottom: 16,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between',
        alignItems: 'baseline', gap: 18, marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <StatusDot status={status} />
          <MonoCap variant="accent">{fall.id} · Fall</MonoCap>
        </div>
        <MonoCap>{showKnack ? '2/3 aufgedeckt' : '0/3 aufgedeckt'}</MonoCap>
      </div>
      <h3 style={{
        fontFamily: 'var(--sans)', fontWeight: 600, letterSpacing: -0.4,
        fontSize: 22, lineHeight: 1.2, margin: '0 0 12px',
      }}>{fall.titel}</h3>
      <div style={{
        fontFamily: 'var(--serif)', fontStyle: 'italic',
        fontSize: 16, lineHeight: 1.55, color: 'var(--ink)',
        borderLeft: '2px solid var(--rule)', padding: '4px 0 4px 14px',
        marginBottom: 16,
      }}>{fall.sachverhalt}</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <button onClick={() => setShowKnack(o => !o)} style={revealBtnStyle(showKnack)}>
          <MonoCap variant={showKnack ? 'accent' : 'muted'}>Knackpunkte</MonoCap>
          <div style={{ marginTop: 4, fontSize: 11, color: 'var(--mute2)' }}>
            {showKnack ? 'tippen · verdecken' : 'tippen · aufdecken'}
          </div>
        </button>
        <button onClick={() => setShowLoes(o => !o)} style={revealBtnStyle(showLoes)}>
          <MonoCap variant={showLoes ? 'accent' : 'muted'}>Antwortkette</MonoCap>
          <div style={{ marginTop: 4, fontSize: 11, color: 'var(--mute2)' }}>
            {showLoes ? 'tippen · verdecken' : 'tippen · aufdecken'}
          </div>
        </button>
      </div>

      {showKnack && (
        <ol style={{
          margin: '14px 0 0', padding: '14px 0 0 22px',
          borderTop: '1px solid var(--rule)',
          fontSize: 14.5, lineHeight: 1.55,
        }}>
          {fall.knackpunkte.map((k, i) => <li key={i} style={{ marginBottom: 6 }}>{k}</li>)}
        </ol>
      )}
      {showLoes && (
        <div style={{
          marginTop: 14, padding: '14px 0 0', borderTop: '1px solid var(--rule)',
          fontFamily: 'var(--serif)', fontStyle: 'italic',
          fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink)',
        }}>
          <MonoCap>Antwortkette</MonoCap>
          <div style={{ marginTop: 8 }}>{fall.antwortkette}</div>
        </div>
      )}
    </div>
  );
}
function revealBtnStyle(active) {
  return {
    border: `1px solid ${active ? 'var(--accent)' : 'var(--hairline)'}`,
    background: active ? 'var(--accent-soft)' : 'transparent',
    padding: '12px 14px', cursor: 'pointer', textAlign: 'left',
    fontFamily: 'inherit',
  };
}

/* ─── SkriptHeader (3-Spalten: Marker · Titel · Lerndeck) ───────────── */

function SkriptHeader({ data, status = 'work' }) {
  const sm = STATUS[status];
  return (
    <div style={{
      padding: '40px 56px 32px',
      display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 24,
      borderBottom: '1px solid var(--hairline)', background: 'var(--bg)',
    }}>
      <div style={{ gridColumn: '1 / span 2' }}>
        <MonoCap>MP_05<br/>{data.zalgm}</MonoCap>
      </div>
      <div style={{ gridColumn: '3 / span 7' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <StatusDot status={status} size={11} />
          <MonoCap variant="ink">STATUS · {sm.label.toUpperCase()}</MonoCap>
          <span style={{ color: 'var(--mute2)' }}>·</span>
          <MonoCap>{data.schwerpunkt.join(' · ')}</MonoCap>
        </div>
        <h1 style={{
          fontWeight: 600, fontSize: 52, lineHeight: 1.0, letterSpacing: -1.4,
          margin: 0,
        }}>
          {data.titel}<br/>
          <span style={{ color: 'var(--accent)' }}>{data.titel2}</span>
        </h1>
        <div style={{
          marginTop: 14, fontFamily: 'var(--serif)', fontStyle: 'italic',
          fontSize: 18, lineHeight: 1.5, color: 'var(--ink)', maxWidth: 620,
        }}>{data.abriss}</div>
      </div>
      <div style={{ gridColumn: '10 / span 3' }}>
        <MonoCap style={{ display: 'block', marginBottom: 8 }}>
          Lerndeck · {data.deck.cards} Karten
        </MonoCap>
        <div style={{
          border: '1px solid var(--hairline)', padding: '12px 14px',
          background: 'var(--paper)',
        }}>
          {[
            ['Karten gesamt', data.deck.cards],
            ['Norm-Ebenen', data.deck.normebenen],
            ['Hochprior',   data.deck.hochprior],
            ['Fallen',      data.deck.fallen],
          ].map(([k, v]) => (
            <div key={k} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '5px 0', borderBottom: '1px solid var(--rule)',
              fontSize: 11.5, color: 'var(--muted)',
              fontFamily: 'var(--mono)', letterSpacing: 0.3,
            }}>
              <span>{k}</span>
              <span style={{ color: 'var(--ink)' }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 8, display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
          <button className="no-print" onClick={() => window.print()} style={{
            border: '1px solid var(--hairline)', background: 'transparent',
            padding: '6px 10px', cursor: 'pointer',
            fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 1,
            textTransform: 'uppercase', color: 'var(--muted)',
          }}>↓ Spickzettel</button>
        </div>
      </div>
    </div>
  );
}

/* ─── MiniTOC (sticky rechts, mit Status-Aggregat) ───────────────────── */

function MiniTOC({ sections }) {
  return (
    <nav className="toc no-print">
      <MonoCap variant="ink">Übersicht</MonoCap>
      <div style={{ marginTop: 10 }}>
        {sections.map(s => (
          <div key={s.id} className="toc-row" data-active={s.active}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)' }}>
              {s.kuerzel}
            </span>
            <span>{s.label}</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--mute2)' }}>
              {s.count}
            </span>
          </div>
        ))}
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--rule)' }}>
          <MonoCap>Lernstand · MP_05</MonoCap>
          <div style={{ marginTop: 6 }}>
            <StatusBar counts={{ sit: 9, repeat: 12, work: 8, open: 5, planned: 2 }} height={6} />
          </div>
          <div style={{ marginTop: 6, display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--mono)', fontSize: 9.5, color: 'var(--mute2)' }}>
            <span>9 sitzen</span><span>12 wiederholt</span><span>8 wackeln</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ─── RichBody · rendert strukturierte Vertiefungs-Items ───────────── */

// Inline-Marker:
//   {{Art. 56/2 BayEUG}}  →  <NormTag>
//   **bold**              →  <strong>
//   „...text..."          →  serif-italic span
function renderInline(s, keyPrefix = '') {
  if (!s) return null;
  const parts = [];
  let lastIdx = 0;
  let key = 0;
  // Reihenfolge: erst NormTag (geschlossen mit }}), dann **bold**
  const re = /(\{\{([^}]+)\}\}|\*\*([^*]+)\*\*)/g;
  let m;
  while ((m = re.exec(s)) !== null) {
    if (m.index > lastIdx) {
      parts.push(s.slice(lastIdx, m.index));
    }
    if (m[2] !== undefined) {
      // NormTag
      parts.push(<NormTag key={`${keyPrefix}n${key++}`} name={m[2]} />);
    } else if (m[3] !== undefined) {
      // bold
      parts.push(<strong key={`${keyPrefix}b${key++}`}>{m[3]}</strong>);
    }
    lastIdx = m.index + m[0].length;
  }
  if (lastIdx < s.length) parts.push(s.slice(lastIdx));
  return parts;
}

function RichBody({ items }) {
  if (!items) return null;
  return (
    <div className="rich-body">
      {items.map((it, i) => {
        switch (it.type) {
          case 'lead':
            return (
              <p key={i} style={{
                fontFamily: 'var(--serif)', fontStyle: 'italic',
                fontSize: 16.5, lineHeight: 1.55, color: 'var(--ink)',
                borderLeft: '2px solid var(--accent)',
                padding: '4px 0 4px 18px', margin: '0 0 22px',
              }}>{renderInline(it.text, `${i}-`)}</p>
            );
          case 'h':
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'baseline', gap: 14,
                margin: '22px 0 12px',
              }}>
                <MonoCap variant="accent">{it.text}</MonoCap>
                <span style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
              </div>
            );
          case 'p':
            return (
              <p key={i} style={{ margin: '0 0 14px', lineHeight: 1.6 }}>
                {renderInline(it.text, `${i}-`)}
              </p>
            );
          case 'bullets':
            return (
              <ul key={i} style={{ margin: '0 0 16px', paddingLeft: 22, lineHeight: 1.55 }}>
                {it.items.map((li, j) => (
                  <li key={j} style={{ marginBottom: 6 }}>{renderInline(li, `${i}-${j}-`)}</li>
                ))}
              </ul>
            );
          case 'numbered':
            return (
              <ol key={i} style={{ margin: '0 0 16px', paddingLeft: 22, lineHeight: 1.55 }}>
                {it.items.map((li, j) => (
                  <li key={j} style={{ marginBottom: 6 }}>{renderInline(li, `${i}-${j}-`)}</li>
                ))}
              </ol>
            );
          case 'table':
            return (
              <div key={i} style={{
                margin: '0 0 18px', border: '1px solid var(--rule)',
                background: 'var(--paper)',
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: it.head.length === 2 ? '180px 1fr' :
                    it.head.length === 3 ? '160px 140px 1fr' : 'repeat(' + it.head.length + ', 1fr)',
                  padding: '10px 14px',
                  borderBottom: '1px solid var(--rule)',
                  fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 0.6,
                  color: 'var(--muted)', textTransform: 'uppercase',
                  gap: 12,
                }}>
                  {it.head.map((h, j) => <div key={j}>{h}</div>)}
                </div>
                {it.rows.map((row, j) => (
                  <div key={j} style={{
                    display: 'grid',
                    gridTemplateColumns: it.head.length === 2 ? '180px 1fr' :
                      it.head.length === 3 ? '160px 140px 1fr' : 'repeat(' + it.head.length + ', 1fr)',
                    padding: '11px 14px',
                    borderBottom: j === it.rows.length - 1 ? 'none' : '1px solid var(--rule)',
                    fontSize: 13.5, lineHeight: 1.5, gap: 12,
                  }}>
                    {row.map((c, k) => <div key={k}>{renderInline(c, `${i}-${j}-${k}-`)}</div>)}
                  </div>
                ))}
              </div>
            );
          case 'warn':
            return (
              <div key={i} style={{
                margin: '14px 0 18px',
                border: '1px solid var(--accent)',
                background: 'var(--accent-soft)',
                padding: '12px 16px 14px',
              }}>
                <div style={{
                  fontFamily: 'var(--mono)', fontSize: 10.5,
                  letterSpacing: 1, color: 'var(--accent)',
                  textTransform: 'uppercase', marginBottom: 6,
                }}>{it.titel}</div>
                <div style={{
                  fontFamily: 'var(--serif)', fontStyle: 'italic',
                  fontSize: 14.5, lineHeight: 1.55,
                }}>{renderInline(it.text, `${i}-`)}</div>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

/* ─── VertiefungBlock (Sub-Block-Detail, collapsed-by-default) ──────── */

function VertiefungBlock({ blk }) {
  return (
    <details className="vertiefung">
      <summary>
        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <StatusDot status={blk.status} />
          <MonoCap variant="accent">{blk.kuerzel}</MonoCap>
        </span>
        <span>
          <span className="summary-title">{blk.titel}</span>
          <span className="summary-anriss">{blk.anriss}</span>
          <div style={{
            display: 'flex', gap: 6, marginTop: 10, alignItems: 'baseline',
            flexWrap: 'wrap',
          }}>
            {blk.subblocks.map(sb => (
              <span key={sb.label} style={{
                fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 0.4,
                color: 'var(--muted)', padding: '2px 7px',
                border: '1px solid var(--rule)',
              }}>{sb.label} · {sb.cards}</span>
            ))}
          </div>
        </span>
        <span style={{ display: 'flex', flexDirection: 'column',
          alignItems: 'flex-end', gap: 6 }}>
          <NormTag name={blk.norm} />
          <span className="summary-toggle"></span>
        </span>
      </summary>
      <div className="vertiefung-body">
        <RichBody items={(window.MP05_BODIES || {})[blk.id]} />
        <div style={{
          marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--rule)',
          display: 'flex', gap: 8, flexWrap: 'wrap',
        }}>
          {blk.subblocks.map(sb => (
            <span key={sb.label} style={{
              fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 0.4,
              color: 'var(--muted)', padding: '3px 8px',
              border: '1px solid var(--rule)',
            }}>{sb.label} · {sb.cards} Karten</span>
          ))}
        </div>
      </div>
    </details>
  );
}

/* Export */
Object.assign(window, {
  MonoCap, StatusDot, StatusBar, NormTag, GlossarSlideover,
  RichBody, KartografieList, RevealCard, FalleRow, FallCard, SkriptHeader,
  MiniTOC, VertiefungBlock,
});
