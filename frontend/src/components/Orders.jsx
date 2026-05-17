import { useState } from 'react'

const allOrders = [
  { id: '4521', customer: 'Sarah Cohen',    email: 'sarah@email.com',  date: 'May 17, 2026', status: 'Delivered',  total: '₪340',  items: 2 },
  { id: '4520', customer: 'David Levy',     email: 'david@email.com',  date: 'May 17, 2026', status: 'Shipped',    total: '₪125',  items: 1 },
  { id: '4519', customer: 'Maya Ben-David', email: 'maya@email.com',   date: 'May 16, 2026', status: 'Processing', total: '₪890',  items: 5 },
  { id: '4518', customer: 'Roi Shapiro',    email: 'roi@email.com',    date: 'May 16, 2026', status: 'Pending',    total: '₪67',   items: 1 },
  { id: '4517', customer: 'Noa Friedman',   email: 'noa@email.com',    date: 'May 15, 2026', status: 'Delivered',  total: '₪432',  items: 3 },
  { id: '4516', customer: 'Avi Katz',       email: 'avi@email.com',    date: 'May 15, 2026', status: 'Shipped',    total: '₪210',  items: 2 },
  { id: '4515', customer: 'Lior Mizrahi',   email: 'lior@email.com',   date: 'May 14, 2026', status: 'Delivered',  total: '₪780',  items: 4 },
  { id: '4514', customer: 'Tamar Goldberg', email: 'tamar@email.com',  date: 'May 14, 2026', status: 'Pending',    total: '₪55',   items: 1 },
  { id: '4513', customer: 'Eran Peretz',    email: 'eran@email.com',   date: 'May 13, 2026', status: 'Processing', total: '₪1,200',items: 7 },
  { id: '4512', customer: 'Hila Stern',     email: 'hila@email.com',   date: 'May 13, 2026', status: 'Delivered',  total: '₪320',  items: 2 },
]

const STATUS_STYLES = {
  Delivered:  { bg: '#d1fae5', color: '#065f46' },
  Shipped:    { bg: '#ede9fe', color: '#4c1d95' },
  Processing: { bg: '#dbeafe', color: '#1e40af' },
  Pending:    { bg: '#fef3c7', color: '#92400e' },
}

function Badge({ status }) {
  const c = STATUS_STYLES[status] || {}
  return (
    <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: c.bg, color: c.color }}>
      {status}
    </span>
  )
}

export default function Orders() {
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('All')
  const [hoveredRow, setHoveredRow] = useState(null)

  const filtered = allOrders.filter(o => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) ||
                        o.id.includes(search) || o.email.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || o.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h1 style={s.title}>Orders 📦</h1>
          <p style={s.subtitle}>{allOrders.length} total orders · {allOrders.filter(o => o.status === 'Pending').length} pending</p>
        </div>
        <button style={s.cta}>+ New Order</button>
      </div>

      {/* Toolbar */}
      <div style={s.toolbar}>
        <div style={s.searchWrap}>
          <span style={s.searchIcon}>🔍</span>
          <input
            style={s.searchInput}
            placeholder="Search by name, order ID or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button style={s.clearBtn} onClick={() => setSearch('')}>✕</button>
          )}
        </div>
        <div style={s.filters}>
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map(f => (
            <button
              key={f}
              style={{ ...s.filterBtn, ...(filter === f ? s.filterActive : {}) }}
              onClick={() => setFilter(f)}
            >
              {f}
              {f !== 'All' && (
                <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.7 }}>
                  {allOrders.filter(o => o.status === f).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={s.card}>
        <table style={s.table}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
              {['Order ID', 'Customer', 'Date', 'Items', 'Status', 'Total', ''].map(h => (
                <th key={h} style={s.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
                  No orders match your search.
                </td>
              </tr>
            ) : (
              filtered.map((o, i) => (
                <tr
                  key={o.id}
                  style={{
                    background: hoveredRow === i ? '#f0f7ff' : i % 2 === 0 ? '#fff' : '#fafbfc',
                    cursor: 'pointer',
                    transition: 'background 0.12s',
                  }}
                  onMouseEnter={() => setHoveredRow(i)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td style={s.td}><span style={s.ordId}>#{o.id}</span></td>
                  <td style={s.td}>
                    <div style={{ fontWeight: 600, color: '#0f172a', fontSize: 14 }}>{o.customer}</div>
                    <div style={{ color: '#94a3b8', fontSize: 12 }}>{o.email}</div>
                  </td>
                  <td style={s.td}><span style={{ color: '#94a3b8', fontSize: 13 }}>{o.date}</span></td>
                  <td style={s.td}><span style={{ color: '#475569', fontSize: 13 }}>{o.items} item{o.items > 1 ? 's' : ''}</span></td>
                  <td style={s.td}><Badge status={o.status} /></td>
                  <td style={{ ...s.td, fontWeight: 700, color: '#0f172a' }}>{o.total}</td>
                  <td style={s.td}>
                    <button style={s.actionBtn} title="View order details">→</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div style={s.tableFooter}>
          Showing {filtered.length} of {allOrders.length} orders
        </div>
      </div>
    </div>
  )
}

const s = {
  page:     { padding: '40px 48px', maxWidth: 1080 },
  header:   { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 },
  title:    { fontSize: 26, fontWeight: 800, color: '#0f172a', marginBottom: 4 },
  subtitle: { color: '#64748b', fontSize: 14 },
  cta: {
    padding: '10px 22px', background: '#2563eb', color: '#fff',
    border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer',
  },
  toolbar:  { display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 },
  searchWrap: {
    display: 'flex', alignItems: 'center', gap: 10,
    background: '#fff', border: '1px solid #e2e8f0',
    borderRadius: 10, padding: '0 14px', height: 42,
  },
  searchIcon:  { fontSize: 14, color: '#94a3b8', flexShrink: 0 },
  searchInput: {
    flex: 1, border: 'none', outline: 'none',
    fontSize: 14, color: '#0f172a', background: 'transparent',
  },
  clearBtn: { background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 12, padding: '2px 4px' },
  filters:  { display: 'flex', gap: 8 },
  filterBtn: {
    padding: '6px 14px', borderRadius: 8, border: '1px solid #e2e8f0',
    background: '#fff', fontSize: 13, fontWeight: 500, color: '#64748b',
    cursor: 'pointer', transition: 'all 0.12s',
  },
  filterActive: { background: '#2563eb', color: '#fff', border: '1px solid #2563eb' },
  card:         { background: '#fff', borderRadius: 16, border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
  table:        { width: '100%', borderCollapse: 'collapse' },
  th: {
    padding: '11px 20px', textAlign: 'left',
    fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em',
  },
  td:           { padding: '13px 20px', fontSize: 14, color: '#334155' },
  ordId:        { fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: '#2563eb' },
  actionBtn: {
    background: '#f1f5f9', border: 'none', borderRadius: 6,
    width: 28, height: 28, cursor: 'pointer', fontSize: 14,
    color: '#475569', transition: 'background 0.12s',
  },
  tableFooter: { padding: '12px 20px', fontSize: 13, color: '#94a3b8', borderTop: '1px solid #f1f5f9', background: '#f8fafc' },
}
