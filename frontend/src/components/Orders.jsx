import { useState } from 'react'
import { PageHeader } from './Dashboard'
import { ORDERS } from '../data'

const STATUS_CLR = {
  Delivered:  { bg: '#dbeafe', color: '#1e3a8a' },
  Shipped:    { bg: '#bfdbfe', color: '#1e40af' },
  Processing: { bg: '#eff6ff', color: '#2563eb' },
  Pending:    { bg: '#dbeafe', color: '#1d4ed8' },
}
const SOURCE_CLR = {
  WooCommerce: { bg: '#dbeafe', color: '#1e3a8a' },
  Shopify:     { bg: '#bfdbfe', color: '#1d4ed8' },
  Wix:         { bg: '#eff6ff', color: '#2563eb' },
}
const STATUS_LIST = ['Pending', 'Processing', 'Shipped', 'Delivered']

export default function Orders() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')

  const filtered = ORDERS.filter(d => {
    const q = search.toLowerCase()
    return (
      (d.id.toLowerCase().includes(q) || d.customer.toLowerCase().includes(q) || d.company.toLowerCase().includes(q)) &&
      (status === 'All' || d.status === status)
    )
  })

  const counts = STATUS_LIST.reduce((acc, s) => ({
    ...acc, [s]: ORDERS.filter(o => o.status === s).length,
  }), {})

  const totalRevenue = ORDERS.reduce((sum, o) => {
    const n = parseFloat(o.total.replace('₪', '').replace(',', ''))
    return sum + (isNaN(n) ? 0 : n)
  }, 0)

  return (
    <div>
      <PageHeader
        title="Orders"
        sub={`${ORDERS.length} total orders · ₪${totalRevenue.toLocaleString()} revenue`}
        action={
          <button className="btn-dark" style={s.exportBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export CSV
          </button>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {STATUS_LIST.map(st => {
          const { bg, color } = STATUS_CLR[st]
          const isSelected = status === st
          return (
            <button key={st} style={{ ...s.countCard, ...(isSelected ? { borderColor: '#1e3a8a', boxShadow: '0 0 0 2px #bfdbfe' } : {}) }}
              onClick={() => setStatus(s => s === st ? 'All' : st)}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#000', letterSpacing: '-0.5px' }}>{counts[st]}</div>
              <div style={{ marginTop: 6 }}>
                <span style={{ ...s.badge, background: bg, color }}>{st}</span>
              </div>
            </button>
          )
        })}
      </div>

      <div style={s.card}>
        <div style={s.toolbar}>
          <div style={s.searchBox}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input style={s.searchInput} placeholder="Search by order ID, customer or company…" value={search} onChange={e => setSearch(e.target.value)} />
            {search && (
              <button style={s.clearBtn} onClick={() => setSearch('')}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            )}
          </div>
          <div style={s.tabs}>
            {['All', ...STATUS_LIST].map(f => (
              <button key={f} className="tab-btn"
                style={{ ...s.tab, ...(status === f ? s.tabActive : {}) }}
                onClick={() => setStatus(f)}>{f}</button>
            ))}
          </div>
        </div>

        <table style={s.table}>
          <thead>
            <tr style={s.thead}>
              {['Order ID', 'Customer', 'Source', 'Company', 'Date', 'Status', 'Total', ''].map(h => (
                <th key={h} style={s.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className="trow" style={s.tr}>
                <td style={s.td}><code style={s.ordCode}>{row.id}</code></td>
                <td style={s.td}><span style={s.bold}>{row.customer}</span></td>
                <td style={s.td}><span style={{ ...s.badge, ...SOURCE_CLR[row.source] }}>{row.source}</span></td>
                <td style={s.td}><span style={s.muted}>{row.company}</span></td>
                <td style={s.td}><span style={s.muted}>{row.date}</span></td>
                <td style={s.td}><span style={{ ...s.badge, ...STATUS_CLR[row.status] }}>{row.status}</span></td>
                <td style={{ ...s.td, fontWeight: 800, color: '#000', fontSize: 14 }}>{row.total}</td>
                <td style={s.td}><button className="btn-ghost" style={s.viewBtn}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && <div style={s.empty}>No orders match your filter.</div>}
        <div style={s.footer}>Showing {filtered.length} of {ORDERS.length} orders</div>
      </div>
    </div>
  )
}

const s = {
  exportBtn:   { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: '#1e3a8a', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  countCard:   { background: '#fff', border: '1px solid #bfdbfe', borderRadius: 12, padding: '18px 22px', textAlign: 'left', cursor: 'pointer', boxShadow: '0 1px 3px rgba(37,99,235,0.08)' },
  card:        { background: '#fff', borderRadius: 12, border: '1px solid #bfdbfe', overflow: 'hidden', boxShadow: '0 1px 4px rgba(37,99,235,0.08)' },
  toolbar:     { display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px', borderBottom: '1px solid #dbeafe', flexWrap: 'wrap' },
  searchBox:   { display: 'flex', alignItems: 'center', gap: 9, background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '9px 14px', minWidth: 280 },
  searchInput: { border: 'none', background: 'none', fontSize: 14, outline: 'none', color: '#000', width: '100%' },
  clearBtn:    { background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' },
  tabs:        { display: 'flex', gap: 4, marginLeft: 'auto', flexWrap: 'wrap' },
  tab:         { padding: '7px 14px', borderRadius: 7, border: '1px solid transparent', background: 'none', fontSize: 13, color: '#3b82f6', fontWeight: 500, cursor: 'pointer' },
  tabActive:   { background: '#dbeafe', color: '#1e3a8a', border: '1px solid #93c5fd', fontWeight: 700 },
  table:       { width: '100%', borderCollapse: 'collapse' },
  thead:       { background: '#eff6ff' },
  th:          { padding: '11px 24px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' },
  tr:          { borderTop: '1px solid #dbeafe' },
  td:          { padding: '14px 24px', verticalAlign: 'middle', fontSize: 14 },
  bold:        { fontWeight: 600, color: '#000', fontSize: 14 },
  muted:       { color: '#1d4ed8', fontSize: 13 },
  badge:       { display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 5 },
  ordCode:     { fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: '#1e3a8a', background: '#dbeafe', padding: '4px 10px', borderRadius: 6 },
  viewBtn:     { padding: '7px 14px', borderRadius: 7, border: '1px solid #bfdbfe', background: '#fff', fontSize: 13, fontWeight: 500, color: '#000', cursor: 'pointer' },
  empty:       { padding: '48px 24px', textAlign: 'center', fontSize: 14, color: '#3b82f6' },
  footer:      { padding: '13px 24px', fontSize: 13, color: '#3b82f6', borderTop: '1px solid #dbeafe', background: '#eff6ff' },
}
