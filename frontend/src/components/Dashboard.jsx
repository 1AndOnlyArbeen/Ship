import { ORDERS, SHIPMENTS, ACTIVITY } from '../data'

const STATS = [
  {
    label: 'Total Customers', value: '348', change: '+14 this month', up: true,
    color: '#1e3a8a', bg: '#dbeafe',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    label: 'Active Companies', value: '12', change: '2 pending setup', up: null,
    color: '#1d4ed8', bg: '#eff6ff',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  },
  {
    label: 'Total Licenses', value: '1,094', change: '+38 this month', up: true,
    color: '#1e40af', bg: '#bfdbfe',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  },
  {
    label: 'Shipments / Month', value: '5,821', change: '+8.3% vs last month', up: true,
    color: '#2563eb', bg: '#dbeafe',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v3"/><polygon points="14,17 20,17 23,14 23,21 14,21"/><circle cx="7" cy="20" r="1"/><circle cx="17.5" cy="20" r="1"/></svg>,
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

const STATUS_CLR = {
  Delivered:  { bg: '#dbeafe', color: '#1e3a8a' },
  Shipped:    { bg: '#bfdbfe', color: '#1e40af' },
  Processing: { bg: '#eff6ff', color: '#2563eb' },
  Pending:    { bg: '#dbeafe', color: '#1d4ed8' },
}

function StatCard({ stat }) {
  return (
    <div className="stat-card" style={s.statCard}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{ ...s.iconBox, background: stat.bg }}>{stat.icon}</div>
        {stat.up === true && (
          <span style={s.upBadge}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2.5" strokeLinecap="round"><path d="m18 15-6-6-6 6"/></svg>
            {stat.change.split(' ')[0]}
          </span>
        )}
      </div>
      <div style={s.statNum}>{stat.value}</div>
      <div style={s.statLabel}>{stat.label}</div>
      <div style={{ ...s.statChange, color: stat.up === true ? '#1e40af' : stat.up === false ? '#1e3a8a' : '#3b82f6' }}>
        {stat.change}
      </div>
    </div>
  )
}

export default function Dashboard({ navigate }) {
  const recentOrders = ORDERS.slice(0, 6)
  const recentActivity = ACTIVITY.slice(0, 7)

  return (
    <div>
      <PageHeader title="Dashboard" sub="Good morning — platform overview for May 17, 2026" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, marginBottom: 28 }}>
        {STATS.map(st => <StatCard key={st.label} stat={st} />)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, marginBottom: 20 }}>
        <div style={s.card}>
          <div style={s.cardHead}>
            <div>
              <div style={s.cardTitle}>Recent Orders</div>
              <div style={s.cardSub}>Latest 6 orders across all platforms</div>
            </div>
            <button style={s.viewAll} onClick={() => navigate('orders')}>View all orders</button>
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
                  <td style={s.td}><code style={s.ordCode}>{o.id}</code></td>
                  <td style={s.td}><span style={s.bold}>{o.customer}</span></td>
                  <td style={s.td}><span style={s.muted}>{o.source}</span></td>
                  <td style={s.td}>
                    <span style={{ ...s.badge, ...STATUS_CLR[o.status] }}>{o.status}</span>
                  </td>
                  <td style={{ ...s.td, fontWeight: 700, color: '#000' }}>{o.total}</td>
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
            <div style={{ fontSize: 22, fontWeight: 800, color: '#000' }}>5,821</div>
          </div>
          <div style={{ padding: '20px 24px 8px' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', height: 130 }}>
              {MONTHLY.map((m, i) => {
                const barH = Math.round((m.orders / MAX_ORDERS) * 110)
                const isLast = i === MONTHLY.length - 1
                return (
                  <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ fontSize: 11, color: isLast ? '#1e3a8a' : '#3b82f6', fontWeight: isLast ? 700 : 400 }}>
                      {m.orders >= 1000 ? (m.orders / 1000).toFixed(1) + 'k' : m.orders}
                    </div>
                    <div style={{ width: '100%', height: barH, background: isLast ? '#1e3a8a' : '#bfdbfe', borderRadius: '5px 5px 0 0', minHeight: 4 }} />
                    <div style={{ fontSize: 11, color: isLast ? '#1e3a8a' : '#3b82f6', fontWeight: isLast ? 700 : 500 }}>{m.month}</div>
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
            <button style={s.viewAll} onClick={() => navigate('shipments')}>View all</button>
          </div>
          <div style={{ padding: '0 0 4px' }}>
            {SHIPMENTS.filter(sh => sh.status !== 'Delivered').slice(0, 5).map((sh, i) => (
              <div key={i} style={s.shipItem}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={s.bold}>{sh.customer}</span>
                    <span style={{ fontSize: 12, color: '#3b82f6' }}>ETA {sh.eta}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#3b82f6', marginBottom: 8 }}>{sh.from} to {sh.to}</div>
                  <div style={{ height: 5, background: '#dbeafe', borderRadius: 3 }}>
                    <div style={{ height: '100%', width: `${sh.progress}%`, background: '#2563eb', borderRadius: 3 }} />
                  </div>
                </div>
                <div style={{ fontSize: 11, color: '#1e3a8a', fontWeight: 700, flexShrink: 0 }}>{sh.progress}%</div>
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
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#000', letterSpacing: '-0.4px', marginBottom: 4 }}>{title}</h1>
        {sub && <p style={{ fontSize: 14, color: '#1d4ed8', fontWeight: 400 }}>{sub}</p>}
      </div>
      {action && <div style={{ flexShrink: 0, marginLeft: 24 }}>{action}</div>}
    </div>
  )
}

const s = {
  statCard:   { background: '#fff', borderRadius: 12, padding: '22px 24px', border: '1px solid #bfdbfe', boxShadow: '0 1px 4px rgba(37,99,235,0.08)', cursor: 'default' },
  iconBox:    { width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  upBadge:    { display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 11, fontWeight: 700, color: '#1e3a8a', background: '#dbeafe', padding: '3px 8px', borderRadius: 6 },
  statNum:    { fontSize: 36, fontWeight: 800, color: '#000', lineHeight: 1, marginBottom: 4, letterSpacing: '-1px' },
  statLabel:  { fontSize: 13, fontWeight: 600, color: '#000', marginBottom: 4 },
  statChange: { fontSize: 12, fontWeight: 500 },
  card:       { background: '#fff', borderRadius: 12, border: '1px solid #bfdbfe', overflow: 'hidden', boxShadow: '0 1px 4px rgba(37,99,235,0.08)' },
  cardHead:   { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', borderBottom: '1px solid #dbeafe' },
  cardTitle:  { fontSize: 15, fontWeight: 700, color: '#000' },
  cardSub:    { fontSize: 12, color: '#3b82f6', marginTop: 2 },
  viewAll:    { background: 'none', border: 'none', fontSize: 13, color: '#2563eb', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' },
  table:      { width: '100%', borderCollapse: 'collapse' },
  thead:      { background: '#eff6ff' },
  th:         { padding: '10px 24px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.06em' },
  tr:         { borderTop: '1px solid #dbeafe' },
  td:         { padding: '14px 24px', verticalAlign: 'middle', fontSize: 14 },
  bold:       { fontWeight: 600, color: '#000' },
  muted:      { color: '#1d4ed8' },
  ordCode:    { fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: '#1e3a8a', background: '#dbeafe', padding: '3px 8px', borderRadius: 5 },
  badge:      { display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 5 },
  actItem:    { display: 'flex', gap: 14, padding: '14px 24px', borderTop: '1px solid #eff6ff', alignItems: 'flex-start' },
  actDot:     { width: 8, height: 8, borderRadius: '50%', background: '#2563eb', marginTop: 5, flexShrink: 0 },
  actText:    { fontSize: 13, color: '#000', lineHeight: 1.5 },
  actTime:    { fontSize: 11, color: '#3b82f6', marginTop: 3 },
  shipItem:   { display: 'flex', gap: 14, padding: '14px 24px', borderTop: '1px solid #eff6ff', alignItems: 'center' },
}
