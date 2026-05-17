import { ORDERS, SHIPMENTS, ACTIVITY } from '../data'

const STATS = [
  {
    label: 'Total Customers', value: '348', change: '+14 this month',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    label: 'Active Companies', value: '12', change: '2 pending setup',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  },
  {
    label: 'Total Licenses', value: '1,094', change: '+38 this month',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  },
  {
    label: 'Shipments / Month', value: '5,821', change: '+8.3% vs last month',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v3"/><polygon points="14,17 20,17 23,14 23,21 14,21"/><circle cx="7" cy="20" r="1"/><circle cx="17.5" cy="20" r="1"/></svg>,
  },
]

const MONTHLY = [
  { month: 'Dec', orders: 4200 },
  { month: 'Jan', orders: 4800 },
  { month: 'Feb', orders: 5200 },
  { month: 'Mar', orders: 4700 },
  { month: 'Apr', orders: 5500 },
  { month: 'May', orders: 5821 },
]
const MAX_ORDERS = Math.max(...MONTHLY.map(m => m.orders))

function StatCard({ stat }) {
  return (
    <div className="stat-card" style={s.statCard}>
      <div style={s.iconBox}>{stat.icon}</div>
      <div style={s.statNum}>{stat.value}</div>
      <div style={s.statLabel}>{stat.label}</div>
      <div style={s.statChange}>{stat.change}</div>
    </div>
  )
}

export default function Dashboard({ navigate }) {
  const recentOrders   = ORDERS.slice(0, 6)
  const recentActivity = ACTIVITY.slice(0, 7)

  return (
    <div>
      <PageHeader title="Dashboard" sub="Platform overview for May 17, 2026" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
        {STATS.map(st => <StatCard key={st.label} stat={st} />)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, marginBottom: 20 }}>
        <div style={s.card}>
          <div style={s.cardHead}>
            <div>
              <div style={s.cardTitle}>Recent Orders</div>
              <div style={s.cardSub}>Latest 6 orders across all platforms</div>
            </div>
            <button style={s.linkBtn} onClick={() => navigate('orders')}>View all orders</button>
          </div>
          <table style={s.table}>
            <thead>
              <tr style={s.thead}>
                {['Order', 'Customer', 'Source', 'Status', 'Total'].map(h => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o, i) => (
                <tr key={i} className="trow" style={s.tr}>
                  <td style={s.td}><code style={s.code}>{o.id}</code></td>
                  <td style={s.td}><span style={s.bold}>{o.customer}</span></td>
                  <td style={s.td}><span style={s.muted}>{o.source}</span></td>
                  <td style={s.td}><span style={s.badge}>{o.status}</span></td>
                  <td style={{ ...s.td, fontWeight: 700, color: '#111' }}>{o.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={s.card}>
          <div style={s.cardHead}>
            <div>
              <div style={s.cardTitle}>Recent Activity</div>
              <div style={s.cardSub}>Platform events</div>
            </div>
          </div>
          <div>
            {recentActivity.map((a, i) => (
              <div key={i} style={s.actItem}>
                <div style={s.actDot} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={s.actText}>{a.text}</div>
                  <div style={s.actTime}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={s.card}>
          <div style={s.cardHead}>
            <div>
              <div style={s.cardTitle}>Monthly Orders</div>
              <div style={s.cardSub}>Shipments per month — last 6 months</div>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#111' }}>5,821</div>
          </div>
          <div style={{ padding: '20px 24px 8px' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', height: 130 }}>
              {MONTHLY.map((m, i) => {
                const barH   = Math.round((m.orders / MAX_ORDERS) * 110)
                const isLast = i === MONTHLY.length - 1
                return (
                  <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ fontSize: 11, color: isLast ? '#111' : '#999', fontWeight: isLast ? 700 : 400 }}>
                      {m.orders >= 1000 ? (m.orders / 1000).toFixed(1) + 'k' : m.orders}
                    </div>
                    <div style={{ width: '100%', height: barH, background: isLast ? '#2563eb' : '#d1d5db', borderRadius: '3px 3px 0 0', minHeight: 4 }} />
                    <div style={{ fontSize: 11, color: isLast ? '#111' : '#999', fontWeight: isLast ? 700 : 400 }}>{m.month}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div style={s.card}>
          <div style={s.cardHead}>
            <div>
              <div style={s.cardTitle}>Active Shipments</div>
              <div style={s.cardSub}>Currently in transit</div>
            </div>
            <button style={s.linkBtn} onClick={() => navigate('shipments')}>View all</button>
          </div>
          <div style={{ padding: '0 0 4px' }}>
            {SHIPMENTS.filter(sh => sh.status !== 'Delivered').slice(0, 5).map((sh, i) => (
              <div key={i} style={s.shipItem}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={s.bold}>{sh.customer}</span>
                    <span style={{ fontSize: 12, color: '#888' }}>ETA {sh.eta}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 7 }}>{sh.from} → {sh.to}</div>
                  <div style={{ height: 4, background: '#e5e7eb', borderRadius: 2 }}>
                    <div style={{ height: '100%', width: `${sh.progress}%`, background: '#2563eb', borderRadius: 2 }} />
                  </div>
                </div>
                <div style={{ fontSize: 11, color: '#555', fontWeight: 600, flexShrink: 0 }}>{sh.progress}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function PageHeader({ title, sub, action }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111', letterSpacing: '-0.3px', marginBottom: 3 }}>{title}</h1>
        {sub && <p style={{ fontSize: 13, color: '#777', fontWeight: 400 }}>{sub}</p>}
      </div>
      {action && <div style={{ flexShrink: 0, marginLeft: 24 }}>{action}</div>}
    </div>
  )
}

const s = {
  statCard:  { background: '#fff', borderRadius: 8, padding: '20px 22px', border: '1px solid #e5e7eb', cursor: 'default' },
  iconBox:   { width: 36, height: 36, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', marginBottom: 14 },
  statNum:   { fontSize: 32, fontWeight: 800, color: '#111', lineHeight: 1, marginBottom: 4, letterSpacing: '-1px' },
  statLabel: { fontSize: 13, fontWeight: 600, color: '#333', marginBottom: 3 },
  statChange:{ fontSize: 12, color: '#888' },
  card:      { background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', overflow: 'hidden' },
  cardHead:  { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #f3f4f6' },
  cardTitle: { fontSize: 14, fontWeight: 700, color: '#111' },
  cardSub:   { fontSize: 12, color: '#999', marginTop: 2 },
  linkBtn:   { background: 'none', border: 'none', fontSize: 13, color: '#2563eb', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' },
  table:     { width: '100%', borderCollapse: 'collapse' },
  thead:     { background: '#fafafa' },
  th:        { padding: '9px 24px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em' },
  tr:        { borderTop: '1px solid #f3f4f6' },
  td:        { padding: '12px 24px', verticalAlign: 'middle', fontSize: 14 },
  bold:      { fontWeight: 600, color: '#111' },
  muted:     { color: '#888' },
  code:      { fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: '#333', background: '#f3f4f6', padding: '2px 7px', borderRadius: 3 },
  badge:     { display: 'inline-block', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 3, background: '#f3f4f6', color: '#444' },
  actItem:   { display: 'flex', gap: 12, padding: '12px 24px', borderTop: '1px solid #f3f4f6', alignItems: 'flex-start' },
  actDot:    { width: 7, height: 7, borderRadius: '50%', background: '#aaa', marginTop: 5, flexShrink: 0 },
  actText:   { fontSize: 13, color: '#333', lineHeight: 1.5 },
  actTime:   { fontSize: 11, color: '#aaa', marginTop: 2 },
  shipItem:  { display: 'flex', gap: 14, padding: '12px 24px', borderTop: '1px solid #f3f4f6', alignItems: 'center' },
}
