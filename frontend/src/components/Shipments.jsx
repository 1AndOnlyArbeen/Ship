import { useState } from 'react'
import { PageHeader } from './Dashboard'
import { SHIPMENTS } from '../data'

const STATUS_CLR = {
  'Delivered':  { bg: '#dbeafe', color: '#1e3a8a', bar: '#1e3a8a' },
  'In Transit': { bg: '#bfdbfe', color: '#1e40af', bar: '#2563eb' },
  'Processing': { bg: '#eff6ff', color: '#2563eb', bar: '#3b82f6' },
  'Pending':    { bg: '#dbeafe', color: '#1d4ed8', bar: '#60a5fa' },
}
const STATUS_LIST = ['In Transit', 'Processing', 'Pending', 'Delivered']

function ProgressBar({ progress, status }) {
  const color = STATUS_CLR[status]?.bar || '#2563eb'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ flex: 1, height: 6, background: '#dbeafe', borderRadius: 4 }}>
        <div style={{ height: '100%', width: `${progress}%`, background: color, borderRadius: 4 }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color, minWidth: 32, textAlign: 'right' }}>{progress}%</span>
    </div>
  )
}

export default function Shipments() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

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
        {STATUS_LIST.map(st => {
          const { bg, color } = STATUS_CLR[st]
          return (
            <div key={st} style={{ ...s.statCard, borderTop: `3px solid ${color}` }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: '#000', letterSpacing: '-0.5px' }}>{counts[st]}</div>
              <div style={{ marginTop: 4 }}>
                <span style={{ ...s.badge, background: bg, color }}>{st}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div style={s.card}>
        <div style={s.toolbar}>
          <div style={s.searchBox}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round">
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
            {filtered.map((row, i) => {
              const clr = STATUS_CLR[row.status] || {}
              return (
                <tr key={i} className="trow" style={s.tr}>
                  <td style={s.td}><code style={s.shipCode}>{row.id}</code></td>
                  <td style={s.td}><code style={s.ordCode}>{row.order}</code></td>
                  <td style={s.td}><span style={s.bold}>{row.customer}</span></td>
                  <td style={s.td}><span style={s.muted}>{row.carrier}</span></td>
                  <td style={s.td}><span style={s.trackCode}>{row.tracking}</span></td>
                  <td style={s.td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={s.city}>{row.from}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                      <span style={s.city}>{row.to}</span>
                    </div>
                  </td>
                  <td style={s.td}><span style={s.muted}>{row.dispatched}</span></td>
                  <td style={s.td}><span style={{ fontWeight: 600, color: '#1e3a8a', fontSize: 13 }}>{row.eta}</span></td>
                  <td style={{ ...s.td, minWidth: 150 }}>
                    <ProgressBar progress={row.progress} status={row.status} />
                  </td>
                  <td style={s.td}><span style={{ ...s.badge, background: clr.bg, color: clr.color }}>{row.status}</span></td>
                  <td style={s.td}><button className="btn-ghost" style={s.viewBtn}>Track</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {filtered.length === 0 && <div style={s.empty}>No shipments match your filter.</div>}
        <div style={s.footer}>Showing {filtered.length} of {SHIPMENTS.length} shipments</div>
      </div>
    </div>
  )
}

const s = {
  addBtn:      { padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  statCard:    { background: '#fff', borderRadius: 12, padding: '20px 22px', border: '1px solid #bfdbfe', boxShadow: '0 1px 3px rgba(37,99,235,0.08)' },
  badge:       { display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 5 },
  card:        { background: '#fff', borderRadius: 12, border: '1px solid #bfdbfe', overflow: 'hidden', boxShadow: '0 1px 4px rgba(37,99,235,0.08)' },
  toolbar:     { display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px', borderBottom: '1px solid #dbeafe', flexWrap: 'wrap' },
  searchBox:   { display: 'flex', alignItems: 'center', gap: 9, background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '9px 14px', minWidth: 280 },
  searchInput: { border: 'none', background: 'none', fontSize: 14, outline: 'none', color: '#000', width: '100%' },
  tabs:        { display: 'flex', gap: 4, flexWrap: 'wrap' },
  tab:         { padding: '7px 14px', borderRadius: 7, border: '1px solid transparent', background: 'none', fontSize: 13, color: '#3b82f6', fontWeight: 500, cursor: 'pointer' },
  tabActive:   { background: '#dbeafe', color: '#1e3a8a', border: '1px solid #93c5fd', fontWeight: 700 },
  table:       { width: '100%', borderCollapse: 'collapse' },
  thead:       { background: '#eff6ff' },
  th:          { padding: '11px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' },
  tr:          { borderTop: '1px solid #dbeafe' },
  td:          { padding: '14px 20px', verticalAlign: 'middle', fontSize: 14 },
  bold:        { fontWeight: 600, color: '#000', fontSize: 14 },
  muted:       { color: '#1d4ed8', fontSize: 13 },
  shipCode:    { fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: '#1e40af', background: '#bfdbfe', padding: '3px 8px', borderRadius: 5 },
  ordCode:     { fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: '#1e3a8a', background: '#dbeafe', padding: '3px 8px', borderRadius: 5 },
  trackCode:   { fontFamily: 'monospace', fontSize: 11, color: '#1d4ed8', background: '#eff6ff', padding: '3px 8px', borderRadius: 4, border: '1px solid #bfdbfe' },
  city:        { fontSize: 13, fontWeight: 500, color: '#000' },
  viewBtn:     { padding: '7px 14px', borderRadius: 7, border: '1px solid #bfdbfe', background: '#fff', fontSize: 13, fontWeight: 500, color: '#000', cursor: 'pointer' },
  empty:       { padding: '48px 24px', textAlign: 'center', fontSize: 14, color: '#3b82f6' },
  footer:      { padding: '13px 24px', fontSize: 13, color: '#3b82f6', borderTop: '1px solid #dbeafe', background: '#eff6ff' },
}
