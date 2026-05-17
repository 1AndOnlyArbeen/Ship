import { useState } from 'react'
import { PageHeader } from './Dashboard'
import { SHIPMENTS } from '../data'

const STATUS_LIST = ['In Transit', 'Processing', 'Pending', 'Delivered']
const TRACK_STEPS = ['Order Placed', 'Processing', 'In Transit', 'Delivered']
const STATUS_STEP = { 'Pending': 0, 'Processing': 1, 'In Transit': 2, 'Delivered': 3 }

function ProgressBar({ progress }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ flex: 1, height: 5, background: '#e5e7eb', borderRadius: 3 }}>
        <div style={{ height: '100%', width: `${progress}%`, background: '#2563eb', borderRadius: 3 }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: '#555', minWidth: 32, textAlign: 'right' }}>{progress}%</span>
    </div>
  )
}

export default function Shipments() {
  const [search,   setSearch]   = useState('')
  const [filter,   setFilter]   = useState('All')
  const [tracking, setTracking] = useState(null)

  const filtered = SHIPMENTS.filter(d => {
    const q = search.toLowerCase()
    return (
      (d.id.toLowerCase().includes(q) || d.customer.toLowerCase().includes(q) || d.tracking.toLowerCase().includes(q) || d.carrier.toLowerCase().includes(q)) &&
      (filter === 'All' || d.status === filter)
    )
  })

  const counts = STATUS_LIST.reduce((acc, s) => ({
    ...acc, [s]: SHIPMENTS.filter(sh => sh.status === s).length,
  }), {})

  const TABS = [
    { key: 'All', label: `All (${SHIPMENTS.length})` },
    ...STATUS_LIST.map(s => ({ key: s, label: `${s} (${counts[s]})` })),
  ]

  return (
    <div>
      <PageHeader
        title="Shipments"
        sub={`${SHIPMENTS.length} shipments · ${counts['In Transit']} in transit · ${counts.Delivered} delivered`}
        action={<button className="btn-primary" style={s.addBtn}>+ Create Shipment</button>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {STATUS_LIST.map(st => (
          <div key={st} style={s.statCard}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#111', letterSpacing: '-0.5px' }}>{counts[st]}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#888', marginTop: 4 }}>{st}</div>
          </div>
        ))}
      </div>

      <div style={s.card}>
        <div style={s.toolbar}>
          <div style={s.searchBox}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input style={s.searchInput} placeholder="Search by ID, customer, tracking or carrier…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={s.tabs}>
            {TABS.map(t => (
              <button key={t.key} className="tab-btn"
                style={{ ...s.tab, ...(filter === t.key ? s.tabActive : {}) }}
                onClick={() => setFilter(t.key)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <table style={s.table}>
          <thead>
            <tr style={s.thead}>
              {['Shipment', 'Order', 'Customer', 'Carrier', 'Tracking No.', 'Route', 'Dispatched', 'ETA', 'Progress', 'Status', ''].map(h => (
                <th key={h} style={s.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className="trow" style={s.tr}>
                <td style={s.td}><code style={s.code}>{row.id}</code></td>
                <td style={s.td}><code style={{ ...s.code, color: '#888' }}>{row.order}</code></td>
                <td style={s.td}><span style={s.bold}>{row.customer}</span></td>
                <td style={s.td}><span style={s.muted}>{row.carrier}</span></td>
                <td style={s.td}><span style={s.trackCode}>{row.tracking}</span></td>
                <td style={s.td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={s.city}>{row.from}</span>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                    <span style={s.city}>{row.to}</span>
                  </div>
                </td>
                <td style={s.td}><span style={s.muted}>{row.dispatched}</span></td>
                <td style={s.td}><span style={{ fontWeight: 600, color: '#111', fontSize: 13 }}>{row.eta}</span></td>
                <td style={{ ...s.td, minWidth: 140 }}><ProgressBar progress={row.progress} /></td>
                <td style={s.td}><span style={s.badge}>{row.status}</span></td>
                <td style={s.td}>
                  <button className="btn-ghost" style={s.viewBtn} onClick={() => setTracking(row)}>Track</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && <div style={s.empty}>No shipments match your filter.</div>}
        <div style={s.footer}>Showing {filtered.length} of {SHIPMENTS.length} shipments</div>
      </div>

      {tracking && (
        <div style={s.overlay} onClick={() => setTracking(null)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 12, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Live Tracking</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <code style={{ ...s.code, fontSize: 14 }}>{tracking.id}</code>
                  <span style={s.badge}>{tracking.status}</span>
                </div>
              </div>
              <button style={s.closeBtn} onClick={() => setTracking(null)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <div style={{ background: '#fafafa', border: '1px solid #f3f4f6', borderRadius: 6, padding: '12px 14px', marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111', marginBottom: 3 }}>{tracking.customer}</div>
              <div style={{ fontSize: 13, color: '#888' }}>{tracking.carrier} · {tracking.tracking}</div>
              <div style={{ fontSize: 13, color: '#888', marginTop: 3 }}>
                {tracking.from}
                {' → '}
                {tracking.to}
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>Timeline</div>
              {TRACK_STEPS.map((step, i) => {
                const currentStep = STATUS_STEP[tracking.status] ?? 0
                const done    = i <= currentStep
                const current = i === currentStep
                const times   = [`${tracking.dispatched}, 09:00`, `${tracking.dispatched}, 11:30`, `${tracking.dispatched}, 14:00`, `ETA ${tracking.eta}`]
                return (
                  <div key={step} style={{ display: 'flex', gap: 14 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        background: done ? '#2563eb' : '#f3f4f6',
                        outline: current ? '3px solid #bfdbfe' : 'none',
                        outlineOffset: 1,
                      }}>
                        {done && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                      </div>
                      {i < TRACK_STEPS.length - 1 && (
                        <div style={{ width: 1, height: 26, background: done && i < currentStep ? '#2563eb' : '#e5e7eb', margin: '3px 0' }} />
                      )}
                    </div>
                    <div style={{ paddingBottom: i < TRACK_STEPS.length - 1 ? 6 : 0, paddingTop: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: current ? 700 : 500, color: done ? '#111' : '#bbb' }}>{step}</div>
                      <div style={{ fontSize: 12, color: done ? '#888' : '#ccc', marginTop: 1 }}>{times[i]}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{ background: '#fafafa', border: '1px solid #f3f4f6', borderRadius: 6, padding: '11px 14px', marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: '#888' }}>Progress</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#2563eb' }}>{tracking.progress}%</span>
              </div>
              <div style={{ height: 6, background: '#e5e7eb', borderRadius: 3 }}>
                <div style={{ height: '100%', width: `${tracking.progress}%`, background: '#2563eb', borderRadius: 3 }} />
              </div>
            </div>

            <button className="btn-ghost" style={{ width: '100%', padding: '9px', border: '1px solid #e5e7eb', background: '#fff', borderRadius: 6, fontSize: 13, fontWeight: 500, color: '#333', cursor: 'pointer' }}
              onClick={() => setTracking(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const s = {
  addBtn:     { padding: '9px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' },
  statCard:   { background: '#fff', borderRadius: 8, padding: '18px 20px', border: '1px solid #e5e7eb' },
  badge:      { display: 'inline-block', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 3, background: '#f3f4f6', color: '#444' },
  card:       { background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', overflow: 'hidden' },
  toolbar:    { display: 'flex', alignItems: 'center', gap: 16, padding: '14px 24px', borderBottom: '1px solid #f3f4f6', flexWrap: 'wrap' },
  searchBox:  { display: 'flex', alignItems: 'center', gap: 9, background: '#fafafa', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 12px', minWidth: 280 },
  searchInput:{ border: 'none', background: 'none', fontSize: 14, outline: 'none', color: '#111', width: '100%' },
  tabs:       { display: 'flex', gap: 4, flexWrap: 'wrap' },
  tab:        { padding: '6px 13px', borderRadius: 5, border: '1px solid transparent', background: 'none', fontSize: 13, color: '#888', fontWeight: 500, cursor: 'pointer' },
  tabActive:  { background: '#f3f4f6', color: '#111', border: '1px solid #e5e7eb', fontWeight: 700 },
  table:      { width: '100%', borderCollapse: 'collapse' },
  thead:      { background: '#fafafa' },
  th:         { padding: '10px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' },
  tr:         { borderTop: '1px solid #f3f4f6' },
  td:         { padding: '12px 20px', verticalAlign: 'middle', fontSize: 14 },
  bold:       { fontWeight: 600, color: '#111', fontSize: 14 },
  muted:      { color: '#888', fontSize: 13 },
  code:       { fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: '#333', background: '#f3f4f6', padding: '2px 7px', borderRadius: 3 },
  trackCode:  { fontFamily: 'monospace', fontSize: 11, color: '#888', background: '#fafafa', padding: '2px 7px', borderRadius: 3, border: '1px solid #e5e7eb' },
  city:       { fontSize: 13, fontWeight: 500, color: '#333' },
  viewBtn:    { padding: '6px 13px', borderRadius: 5, border: '1px solid #e5e7eb', background: '#fff', fontSize: 13, fontWeight: 500, color: '#333', cursor: 'pointer' },
  empty:      { padding: '48px 24px', textAlign: 'center', fontSize: 14, color: '#aaa' },
  footer:     { padding: '12px 24px', fontSize: 13, color: '#aaa', borderTop: '1px solid #f3f4f6', background: '#fafafa' },
  overlay:    { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' },
  modal:      { background: '#fff', borderRadius: 10, padding: '28px', width: '100%', maxWidth: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.15)', border: '1px solid #e5e7eb', maxHeight: '90vh', overflowY: 'auto' },
  closeBtn:   { background: 'none', border: 'none', padding: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', borderRadius: 4 },
}
