import { useState } from 'react'

const stats = [
  { label: 'Total Orders',      value: '1,248', emoji: '📦', sub: '+12% this month',    accent: '#2563eb', light: '#eff6ff' },
  { label: 'Active Shipments',  value: '89',    emoji: '🚚', sub: '3 added today',       accent: '#0891b2', light: '#ecfeff' },
  { label: 'Delivered',         value: '1,094', emoji: '✅', sub: '87.7% success rate',  accent: '#059669', light: '#ecfdf5' },
  { label: 'Pending',           value: '65',    emoji: '🔔', sub: 'Needs attention',     accent: '#d97706', light: '#fffbeb' },
]

const recentOrders = [
  { id: '#4521', customer: 'Sarah Cohen',    date: 'May 17',  status: 'Delivered',  total: '₪340' },
  { id: '#4520', customer: 'David Levy',     date: 'May 17',  status: 'Shipped',    total: '₪125' },
  { id: '#4519', customer: 'Maya Ben-David', date: 'May 16',  status: 'Processing', total: '₪890' },
  { id: '#4518', customer: 'Roi Shapiro',    date: 'May 16',  status: 'Pending',    total: '₪67'  },
  { id: '#4517', customer: 'Noa Friedman',   date: 'May 15',  status: 'Delivered',  total: '₪432' },
]

const STATUS = {
  Delivered:  { bg: '#d1fae5', color: '#065f46' },
  Shipped:    { bg: '#ede9fe', color: '#4c1d95' },
  Processing: { bg: '#dbeafe', color: '#1e40af' },
  Pending:    { bg: '#fef3c7', color: '#92400e' },
}

function StatusBadge({ status }) {
  const c = STATUS[status] || {}
  return (
    <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: c.bg, color: c.color }}>
      {status}
    </span>
  )
}

export default function Dashboard({ setActivePage }) {
  const [hoveredRow, setHoveredRow] = useState(null)

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div>
          <h1 style={s.title}>Good morning 👋</h1>
          <p style={s.subtitle}>Here's what's happening with your shipments today.</p>
        </div>
        <button style={s.cta} onClick={() => setActivePage('orders')}>+ New Order</button>
      </div>

      {/* Stats */}
      <div style={s.statsGrid}>
        {stats.map(st => (
          <div key={st.label} style={s.statCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{ ...s.emojiBox, background: st.light, color: st.accent }}>{st.emoji}</div>
              <div style={{ ...s.dot, background: st.accent }} />
            </div>
            <div style={s.statVal}>{st.value}</div>
            <div style={s.statLabel}>{st.label}</div>
            <div style={s.statSub}>{st.sub}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div style={s.quickRow}>
        {[
          { emoji: '🚚', label: 'Track Shipment', page: 'tracking' },
          { emoji: '📦', label: 'View Orders',    page: 'orders'   },
          { emoji: '✈️',  label: 'All Shipments',  page: 'shipments'},
        ].map(a => (
          <button key={a.label} style={s.quickBtn} onClick={() => setActivePage(a.page)}>
            <span style={{ fontSize: 20 }}>{a.emoji}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>{a.label}</span>
          </button>
        ))}
      </div>

      {/* Recent orders */}
      <div style={s.card}>
        <div style={s.cardHead}>
          <h2 style={s.cardTitle}>Recent Orders</h2>
          <button style={s.link} onClick={() => setActivePage('orders')}>View all →</button>
        </div>
        <table style={s.table}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {['Order', 'Customer', 'Date', 'Status', 'Total'].map(h => (
                <th key={h} style={s.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o, i) => (
              <tr
                key={o.id}
                style={{ background: hoveredRow === i ? '#f0f7ff' : i % 2 === 0 ? '#fff' : '#fafbfc', cursor: 'pointer', transition: 'background 0.12s' }}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td style={s.td}><span style={s.ordId}>ORD-{o.id}</span></td>
                <td style={s.td}>{o.customer}</td>
                <td style={s.td}><span style={{ color: '#94a3b8', fontSize: 13 }}>{o.date}</span></td>
                <td style={s.td}><StatusBadge status={o.status} /></td>
                <td style={{ ...s.td, fontWeight: 700, color: '#0f172a' }}>{o.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const s = {
  page:      { padding: '40px 48px', maxWidth: 1080 },
  header:    { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 },
  title:     { fontSize: 26, fontWeight: 800, color: '#0f172a', marginBottom: 6 },
  subtitle:  { color: '#64748b', fontSize: 14 },
  cta: {
    padding: '10px 22px', background: '#2563eb', color: '#fff',
    border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700,
    cursor: 'pointer', transition: 'background 0.15s',
  },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 24 },
  statCard:  { background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' },
  emojiBox:  { width: 42, height: 42, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 },
  dot:       { width: 8, height: 8, borderRadius: '50%', marginTop: 4 },
  statVal:   { fontSize: 32, fontWeight: 800, color: '#0f172a', marginBottom: 4, lineHeight: 1 },
  statLabel: { fontSize: 13, color: '#64748b', fontWeight: 500, marginBottom: 4 },
  statSub:   { fontSize: 12, color: '#94a3b8' },
  quickRow:  { display: 'flex', gap: 14, marginBottom: 24 },
  quickBtn: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '12px 20px', background: '#fff',
    border: '1px solid #e2e8f0', borderRadius: 12,
    cursor: 'pointer', transition: 'border-color 0.15s, box-shadow 0.15s',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
  },
  card:      { background: '#fff', borderRadius: 16, border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
  cardHead:  { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', borderBottom: '1px solid #f1f5f9' },
  cardTitle: { fontSize: 15, fontWeight: 700, color: '#0f172a' },
  link:      { background: 'none', border: 'none', color: '#2563eb', fontSize: 13, fontWeight: 600, cursor: 'pointer' },
  table:     { width: '100%', borderCollapse: 'collapse' },
  th:        { padding: '11px 24px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' },
  td:        { padding: '14px 24px', fontSize: 14, color: '#334155' },
  ordId:     { fontFamily: 'monospace', fontSize: 13, color: '#2563eb', fontWeight: 700 },
}
