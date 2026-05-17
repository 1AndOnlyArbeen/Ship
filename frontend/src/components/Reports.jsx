import { PageHeader } from './Dashboard'
import { CUSTOMERS, SHIPMENTS } from '../data'

const MONTHLY = [
  { month: 'Dec', orders: 4200, revenue: 142000 },
  { month: 'Jan', orders: 4800, revenue: 168000 },
  { month: 'Feb', orders: 5200, revenue: 185000 },
  { month: 'Mar', orders: 4700, revenue: 162000 },
  { month: 'Apr', orders: 5500, revenue: 196000 },
  { month: 'May', orders: 5821, revenue: 214300 },
]

const SOURCE_BREAKDOWN = [
  { source: 'WooCommerce', count: 6, pct: 40, color: '#1e3a8a' },
  { source: 'Shopify',     count: 5, pct: 33, color: '#1d4ed8' },
  { source: 'Wix',         count: 4, pct: 27, color: '#3b82f6' },
]

const MAX_ORDERS  = Math.max(...MONTHLY.map(m => m.orders))
const MAX_REVENUE = Math.max(...MONTHLY.map(m => m.revenue))

const TOP_CUSTOMERS = [...CUSTOMERS].sort((a, b) => b.orders - a.orders).slice(0, 5)

function KPICard({ label, value, sub, borderColor, icon }) {
  return (
    <div style={{ ...s.kpi, borderTop: `3px solid ${borderColor}` }}>
      <div style={{ ...s.kpiIcon, background: '#dbeafe' }}>{icon}</div>
      <div style={s.kpiValue}>{value}</div>
      <div style={s.kpiLabel}>{label}</div>
      {sub && <div style={s.kpiSub}>{sub}</div>}
    </div>
  )
}

export default function Reports() {
  const totalRevenue   = MONTHLY.reduce((a, m) => a + m.revenue, 0)
  const totalOrders    = MONTHLY.reduce((a, m) => a + m.orders, 0)
  const avgOrderVal    = Math.round(totalRevenue / totalOrders)
  const deliveredCount = SHIPMENTS.filter(s => s.status === 'Delivered').length
  const deliveryRate   = Math.round((deliveredCount / SHIPMENTS.length) * 100)

  return (
    <div>
      <PageHeader
        title="Reports & Analytics"
        sub="Platform-wide metrics and performance overview"
        action={
          <button className="btn-dark" style={s.exportBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export Report
          </button>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, marginBottom: 24 }}>
        <KPICard label="Total Revenue (6 mo.)" value={`₪${(totalRevenue / 1000).toFixed(0)}k`}
          sub="+12.4% vs prev. period" borderColor="#1e3a8a"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="1.8" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
        />
        <KPICard label="Avg. Order Value" value={`₪${avgOrderVal}`}
          sub="across all platforms" borderColor="#1d4ed8"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="1.8" strokeLinecap="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>}
        />
        <KPICard label="Total Orders (6 mo.)" value={totalOrders.toLocaleString()}
          sub="+8.3% vs prev. period" borderColor="#2563eb"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round"><path d="m7.5 4.27 9 5.15M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/></svg>}
        />
        <KPICard label="Delivery Rate" value={`${deliveryRate}%`}
          sub={`${deliveredCount} of ${SHIPMENTS.length} delivered`} borderColor="#3b82f6"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div style={s.card}>
          <div style={s.cardHead}>
            <div>
              <div style={s.cardTitle}>Orders Per Month</div>
              <div style={s.cardSub}>Last 6 months of shipments</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#000' }}>5,821</div>
              <div style={{ fontSize: 12, color: '#1e40af', fontWeight: 600 }}>+5.8% this month</div>
            </div>
          </div>
          <div style={{ padding: '24px 24px 16px' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', height: 140 }}>
              {MONTHLY.map((m, i) => {
                const h = Math.round((m.orders / MAX_ORDERS) * 120)
                const isLast = i === MONTHLY.length - 1
                return (
                  <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ fontSize: 11, color: isLast ? '#1e3a8a' : '#3b82f6', fontWeight: isLast ? 700 : 400 }}>
                      {m.orders >= 1000 ? (m.orders / 1000).toFixed(1) + 'k' : m.orders}
                    </div>
                    <div style={{ width: '100%', height: h, background: isLast ? '#1e3a8a' : '#bfdbfe', borderRadius: '5px 5px 0 0', minHeight: 6 }} />
                    <div style={{ fontSize: 12, color: isLast ? '#1e3a8a' : '#3b82f6', fontWeight: isLast ? 700 : 500 }}>{m.month}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div style={s.card}>
          <div style={s.cardHead}>
            <div>
              <div style={s.cardTitle}>Revenue Per Month</div>
              <div style={s.cardSub}>Revenue across all channels</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#000' }}>₪{(totalRevenue / 1000).toFixed(0)}k</div>
              <div style={{ fontSize: 12, color: '#1e40af', fontWeight: 600 }}>+9.3% this month</div>
            </div>
          </div>
          <div style={{ padding: '24px 24px 16px' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', height: 140 }}>
              {MONTHLY.map((m, i) => {
                const h = Math.round((m.revenue / MAX_REVENUE) * 120)
                const isLast = i === MONTHLY.length - 1
                return (
                  <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ fontSize: 11, color: isLast ? '#1e3a8a' : '#3b82f6', fontWeight: isLast ? 700 : 400 }}>
                      ₪{m.revenue >= 1000 ? (m.revenue / 1000).toFixed(0) + 'k' : m.revenue}
                    </div>
                    <div style={{ width: '100%', height: h, background: isLast ? '#1e40af' : '#dbeafe', borderRadius: '5px 5px 0 0', minHeight: 6 }} />
                    <div style={{ fontSize: 12, color: isLast ? '#1e3a8a' : '#3b82f6', fontWeight: isLast ? 700 : 500 }}>{m.month}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={s.card}>
          <div style={s.cardHead}>
            <div>
              <div style={s.cardTitle}>Orders by Source</div>
              <div style={s.cardSub}>Platform distribution this month</div>
            </div>
          </div>
          <div style={{ padding: '20px 24px' }}>
            {SOURCE_BREAKDOWN.map(src => (
              <div key={src.source} style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#000' }}>{src.source}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: src.color }}>{src.pct}%</span>
                </div>
                <div style={{ height: 10, background: '#dbeafe', borderRadius: 6 }}>
                  <div style={{ height: '100%', width: `${src.pct}%`, background: src.color, borderRadius: 6 }} />
                </div>
                <div style={{ fontSize: 12, color: '#3b82f6', marginTop: 4 }}>{src.count} orders this month</div>
              </div>
            ))}
          </div>
        </div>

        <div style={s.card}>
          <div style={s.cardHead}>
            <div>
              <div style={s.cardTitle}>Top Customers by Orders</div>
              <div style={s.cardSub}>Most active customers this period</div>
            </div>
          </div>
          <div>
            {TOP_CUSTOMERS.map((c, i) => (
              <div key={c.id} style={s.custRow}>
                <div style={{ ...s.rank, background: i === 0 ? '#bfdbfe' : '#eff6ff', color: i === 0 ? '#1e3a8a' : '#3b82f6' }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: '#000', fontSize: 14 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: '#3b82f6', marginTop: 2 }}>{c.company} · {c.source}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, color: '#000', fontSize: 14 }}>{c.orders} orders</div>
                  <div style={{ fontSize: 12, color: '#1e40af', fontWeight: 600, marginTop: 2 }}>{c.revenue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const s = {
  exportBtn:  { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: '#1e3a8a', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  kpi:        { background: '#fff', borderRadius: 12, padding: '22px 22px', border: '1px solid #bfdbfe', boxShadow: '0 1px 4px rgba(37,99,235,0.08)' },
  kpiIcon:    { width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  kpiValue:   { fontSize: 32, fontWeight: 800, color: '#000', letterSpacing: '-0.5px', marginBottom: 4 },
  kpiLabel:   { fontSize: 13, fontWeight: 600, color: '#000', marginBottom: 3 },
  kpiSub:     { fontSize: 12, color: '#3b82f6' },
  card:       { background: '#fff', borderRadius: 12, border: '1px solid #bfdbfe', overflow: 'hidden', boxShadow: '0 1px 4px rgba(37,99,235,0.08)' },
  cardHead:   { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', borderBottom: '1px solid #dbeafe' },
  cardTitle:  { fontSize: 15, fontWeight: 700, color: '#000' },
  cardSub:    { fontSize: 12, color: '#3b82f6', marginTop: 2 },
  custRow:    { display: 'flex', alignItems: 'center', gap: 14, padding: '14px 24px', borderTop: '1px solid #dbeafe' },
  rank:       { width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 },
}
