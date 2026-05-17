import { useState } from 'react'
import { PageHeader } from './Dashboard'
import { ORDERS } from '../data'

const STATUS_LIST = ['Pending', 'Processing', 'Shipped', 'Delivered']

function getItems(total) {
  const val = parseFloat(total.replace('₪', '').replace(',', ''))
  return [
    { name: 'Shipping Label', qty: 1, price: `₪${Math.round(val * 0.70)}` },
    { name: 'Handling Fee',   qty: 1, price: `₪${Math.round(val * 0.20)}` },
    { name: 'Insurance',      qty: 1, price: `₪${Math.round(val * 0.10)}` },
  ]
}

function ModalRow({ label, children }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
      <span style={{ fontSize: 13, color: '#888', fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{children}</span>
    </div>
  )
}

export default function Orders() {
  const [search,   setSearch]   = useState('')
  const [status,   setStatus]   = useState('All')
  const [selected, setSelected] = useState(null)

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
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export CSV
          </button>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {STATUS_LIST.map(st => {
          const isSelected = status === st
          return (
            <button key={st} style={{ ...s.countCard, ...(isSelected ? { borderColor: '#2563eb', background: '#f8faff' } : {}) }}
              onClick={() => setStatus(s => s === st ? 'All' : st)}>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#111', letterSpacing: '-0.5px' }}>{counts[st]}</div>
              <div style={{ marginTop: 5, fontSize: 12, fontWeight: 600, color: '#888' }}>{st}</div>
            </button>
          )
        })}
      </div>

      <div style={s.card}>
        <div style={s.toolbar}>
          <div style={s.searchBox}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input style={s.searchInput} placeholder="Search by order ID, customer or company…" value={search} onChange={e => setSearch(e.target.value)} />
            {search && (
              <button style={s.clearBtn} onClick={() => setSearch('')}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
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
                <td style={s.td}><code style={s.code}>{row.id}</code></td>
                <td style={s.td}><span style={s.bold}>{row.customer}</span></td>
                <td style={s.td}><span style={s.badge}>{row.source}</span></td>
                <td style={s.td}><span style={s.muted}>{row.company}</span></td>
                <td style={s.td}><span style={s.muted}>{row.date}</span></td>
                <td style={s.td}><span style={s.badge}>{row.status}</span></td>
                <td style={{ ...s.td, fontWeight: 800, color: '#111' }}>{row.total}</td>
                <td style={s.td}>
                  <button className="btn-ghost" style={s.viewBtn} onClick={() => setSelected(row)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && <div style={s.empty}>No orders match your filter.</div>}
        <div style={s.footer}>Showing {filtered.length} of {ORDERS.length} orders</div>
      </div>

      {selected && (
        <div style={s.overlay} onClick={() => setSelected(null)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 12, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Order Details</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <code style={{ ...s.code, fontSize: 16, padding: '4px 10px' }}>{selected.id}</code>
                  <span style={s.badge}>{selected.status}</span>
                </div>
              </div>
              <button style={s.closeBtn} onClick={() => setSelected(null)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <ModalRow label="Customer">{selected.customer}</ModalRow>
            <ModalRow label="Source">{selected.source}</ModalRow>
            <ModalRow label="Company">{selected.company}</ModalRow>
            <ModalRow label="Date">{selected.date}</ModalRow>

            <div style={{ marginTop: 18, marginBottom: 4 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Items</div>
              {getItems(selected.total).map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f9fafb' }}>
                  <span style={{ fontSize: 14, color: '#555' }}>{item.name} × {item.qty}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{item.price}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderTop: '2px solid #e5e7eb', marginTop: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>Total</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#111' }}>{selected.total}</span>
            </div>

            <button className="btn-ghost" style={{ width: '100%', marginTop: 4, padding: '9px', border: '1px solid #e5e7eb', background: '#fff', borderRadius: 6, fontSize: 13, fontWeight: 500, color: '#333', cursor: 'pointer' }}
              onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const s = {
  exportBtn:  { display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 16px', background: '#1f2937', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' },
  countCard:  { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '16px 20px', textAlign: 'left', cursor: 'pointer', transition: 'border-color 0.15s' },
  card:       { background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', overflow: 'hidden' },
  toolbar:    { display: 'flex', alignItems: 'center', gap: 16, padding: '14px 24px', borderBottom: '1px solid #f3f4f6', flexWrap: 'wrap' },
  searchBox:  { display: 'flex', alignItems: 'center', gap: 9, background: '#fafafa', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 12px', minWidth: 280 },
  searchInput:{ border: 'none', background: 'none', fontSize: 14, outline: 'none', color: '#111', width: '100%' },
  clearBtn:   { background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' },
  tabs:       { display: 'flex', gap: 4, marginLeft: 'auto', flexWrap: 'wrap' },
  tab:        { padding: '6px 13px', borderRadius: 5, border: '1px solid transparent', background: 'none', fontSize: 13, color: '#888', fontWeight: 500, cursor: 'pointer' },
  tabActive:  { background: '#f3f4f6', color: '#111', border: '1px solid #e5e7eb', fontWeight: 700 },
  table:      { width: '100%', borderCollapse: 'collapse' },
  thead:      { background: '#fafafa' },
  th:         { padding: '10px 24px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' },
  tr:         { borderTop: '1px solid #f3f4f6' },
  td:         { padding: '12px 24px', verticalAlign: 'middle', fontSize: 14 },
  bold:       { fontWeight: 600, color: '#111', fontSize: 14 },
  muted:      { color: '#888', fontSize: 13 },
  badge:      { display: 'inline-block', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 3, background: '#f3f4f6', color: '#444' },
  code:       { fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: '#333', background: '#f3f4f6', padding: '3px 8px', borderRadius: 3 },
  viewBtn:    { padding: '6px 13px', borderRadius: 5, border: '1px solid #e5e7eb', background: '#fff', fontSize: 13, fontWeight: 500, color: '#333', cursor: 'pointer' },
  empty:      { padding: '48px 24px', textAlign: 'center', fontSize: 14, color: '#aaa' },
  footer:     { padding: '12px 24px', fontSize: 13, color: '#aaa', borderTop: '1px solid #f3f4f6', background: '#fafafa' },
  overlay:    { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' },
  modal:      { background: '#fff', borderRadius: 10, padding: '28px', width: '100%', maxWidth: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.15)', border: '1px solid #e5e7eb', maxHeight: '90vh', overflowY: 'auto' },
  closeBtn:   { background: 'none', border: 'none', padding: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', borderRadius: 4 },
}
