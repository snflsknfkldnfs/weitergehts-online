// skripts/v2-werkbank.jsx — Werkbank-Layout
// Zwei-Spaltig: links Vertiefung (Referenztext, immer offen), rechts
// Aktiv-Abruf-Spalte (Pflichtwissen · Fallen · Fälle), sticky scrolltend.
// Idee: Lernender liest links, springt rechts in den Abruf-Modus und zurück.

function SkriptV2() {
  const d = window.MP05;
  const {
    SkriptHeader, MonoCap, NormTag, KartografieList, RevealCard,
    FalleRow, FallCard, StatusDot, StatusBar, RichBody,
  } = window;

  return (
    <div className="skript">
      <SkriptHeader data={d} status="work" />

      {/* Kurzfassung + Kartografie kompakt */}
      <div style={{
        padding: '28px 56px 24px', maxWidth: 1280, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36,
        borderBottom: '1px solid var(--hairline)',
      }}>
        <div>
          <MonoCap variant="accent">In aller Kürze</MonoCap>
          <ol style={{
            listStyle: 'none', padding: 0, margin: '10px 0 0',
            display: 'grid', gap: 8,
          }}>
            {d.kurz.map((s, i) => (
              <li key={i} style={{
                display: 'grid', gridTemplateColumns: '20px 1fr', gap: 10,
                alignItems: 'baseline',
              }}>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: 10,
                  color: 'var(--accent)', letterSpacing: 0.5, paddingTop: 4,
                }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{
                  fontFamily: 'var(--serif)', fontSize: 15.5,
                  lineHeight: 1.45, color: 'var(--ink)',
                }}>{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <MonoCap variant="accent">Norm-Kartografie · 5 Ebenen</MonoCap>
          <div style={{ marginTop: 6 }}>
            <KartografieList rows={d.kartografie} />
          </div>
        </div>
      </div>

      {/* Werkbank: Links Vertiefung, Rechts Aktiv-Abruf */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 460px', gap: 0,
        maxWidth: 1280, margin: '0 auto',
      }}>
        {/* ─── Links: Vertiefung (Referenztext) ─────────────────── */}
        <main style={{
          padding: '28px 36px 80px 56px', minWidth: 0,
          borderRight: '1px solid var(--hairline)',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 8 }}>
            <MonoCap variant="accent">Stoff · Referenz</MonoCap>
            <span style={{ flex: 1, height: 1, background: 'var(--hairline)' }} />
            <MonoCap>chunkbar nach Sub-Block</MonoCap>
          </div>
          <p style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 14.5,
            color: 'var(--muted)', marginTop: 6, marginBottom: 18, maxWidth: 540,
          }}>
            Die Vertiefung liegt offen — sie ist Nachschlage-Werk, nicht
            Pflicht-Lese-Pfad. Lernende springen aus der rechten Spalte
            zurück hierher, wenn eine Karte oder Falle hängt.
          </p>

          {d.vertiefung.map(blk => (
            <article key={blk.id} style={{
              marginBottom: 28, paddingBottom: 24,
              borderBottom: '1px solid var(--rule)',
            }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '56px 1fr auto',
                gap: 16, alignItems: 'baseline',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <StatusDot status={blk.status} />
                  <MonoCap variant="accent">{blk.kuerzel}</MonoCap>
                </span>
                <h3 style={{
                  fontFamily: 'var(--sans)', fontWeight: 600,
                  fontSize: 22, letterSpacing: -0.4, lineHeight: 1.2,
                  margin: 0,
                }}>{blk.titel}</h3>
                <NormTag name={blk.norm} />
              </div>
              <div style={{
                fontFamily: 'var(--serif)', fontStyle: 'italic',
                fontSize: 16, lineHeight: 1.55, color: 'var(--ink)',
                marginTop: 12, marginLeft: 72, paddingLeft: 14,
                borderLeft: '2px solid var(--rule)',
                maxWidth: 540,
              }}>{blk.anriss}</div>
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14,
                marginLeft: 72,
              }}>
                {blk.subblocks.map(sb => (
                  <div key={sb.label} style={{
                    border: '1px solid var(--rule)', padding: '5px 9px',
                    fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 0.4,
                    color: 'var(--muted)',
                  }}>{sb.label} · {sb.cards}</div>
                ))}
              </div>
              <div style={{
                marginTop: 14, marginLeft: 72,
                maxWidth: 580,
              }}>
                <RichBody items={(window.MP05_BODIES || {})[blk.id]} />
              </div>
            </article>
          ))}
        </main>

        {/* ─── Rechts: Aktiv-Abruf-Bank ─────────────────────────── */}
        <aside style={{
          padding: '28px 56px 80px 36px', background: '#f6f4ee',
          minWidth: 0,
        }}>
          <div style={{ position: 'sticky', top: 0,
            background: '#f6f4ee', paddingBottom: 12, paddingTop: 6,
            zIndex: 2, borderBottom: '1px solid var(--rule)',
            marginBottom: 18,
          }}>
            <MonoCap variant="ink">Werkbank · Aktiv-Abruf</MonoCap>
            <div style={{ marginTop: 8 }}>
              <StatusBar counts={{ sit: 9, repeat: 12, work: 8, open: 5, planned: 2 }} height={5} />
            </div>
            <div style={{ marginTop: 6, display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'var(--mono)', fontSize: 9.5, color: 'var(--mute2)',
              letterSpacing: 0.4,
            }}>
              <span>9 sitzen</span><span>12 wiederholt</span>
              <span>8 wackeln</span><span>5 offen</span>
            </div>
          </div>

          {/* Pflichtwissen kompakt */}
          <section style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14 }}>
              <MonoCap variant="accent">Pflichtwissen</MonoCap>
              <span style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
              <MonoCap>8 Karten</MonoCap>
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
            }}>
              {d.pflichtwissen.map(c => <RevealCard key={c.id} card={c} />)}
            </div>
          </section>

          {/* Falle-Atlas */}
          <section style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 8 }}>
              <MonoCap variant="accent">Falle-Atlas</MonoCap>
              <span style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
              <MonoCap>10 Stellen</MonoCap>
            </div>
            <div>
              {d.fallen.map((f, i) => (
                <FalleRow key={f.id} falle={f}
                  status={['work','sit','open','repeat','work','planned','sit','open','work','open'][i]} />
              ))}
            </div>
          </section>

          {/* Fallbeispiele — alle 10 */}
          <section>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14 }}>
              <MonoCap variant="accent">Fallbeispiele</MonoCap>
              <span style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
              <MonoCap>10 Fälle</MonoCap>
            </div>
            {d.faelle.map((f, i) => (
              <FallCard key={f.id} fall={f}
                status={['work','repeat','sit','open','planned','work','open','sit','repeat','work'][i]} />
            ))}
          </section>
        </aside>
      </div>
    </div>
  );
}

window.SkriptV2 = SkriptV2;
