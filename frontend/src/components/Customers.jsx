import { useState } from 'react'
import { PageHeader } from './Dashboard'
import { CUSTOMERS } from '../data'

const SOURCE_CLR = {
  WooCommerce: { bg: '#dbeafe', color: '#1e3a8a' },
  Shopify:     { bg: '#bfdbfe', color: '#1d4ed8' },
  Wix:         { bg: '#eff6ff', color: '#2563eb' },
}
const STATUS_CLR = {
  Active:   { bg: '#dbeafe', color: '#1e3a8a' },
  Inactive: { bg: '#eff6ff', color: '#3b82f6' },
}
const AVATARS = ['#1e3a8a', '#1e40af', '#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa', '#1e3a8a', '#1d4ed8']

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

const PAGE_SIZE = 8

export default function Customers() {
  const [search, setSearch]           = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [page, setPage]               = useState(1)

  const filtered = CUSTOMERS.filter(d => {
    const q = search.toLowerCase()
    return (
      (d.name.toLowerCase().includes(q) || d.email.toLowerCase().includes(q) || d.company.toLowerCase().includes(q)) &&
      (statusFilter === 'All' || d.status === statusFilter)
    )
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const activeCount   = CUSTOMERS.filter(c => c.status === 'Active').length
  const inactiveCount = CUSTOMERS.filter(c => c.status === 'Inactive').length

  const TABS = [
    { key: 'All',      label: `All (${CUSTOMERS.length})`  },
    { key: 'Active',   label: `Active (${activeCount})`    },
    { key: 'Inactive', label: `Inactive (${inactiveCount})` },
  ]

  const handleTab    = (t) => { setStatusFilter(t); setPage(1) }
  const handleSearch = (v) => { setSearch(v); setPage(1) }

  return (
    <div>
      <PageHeader
        title="Customers"
        sub={`${CUSTOMERS.length} registered customers · ${activeCount} active`}
        action={<button className="btn-primary" style={s.addBtn}>+ Add Customer</button>}
      />

      <div style={s.card}>
        <div style={s.toolbar}>
          <div style={s.searchBox}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              style={s.searchInput}
              placeholder="Search by name, email or company…"
              value={search}
              onChange={e => handleSearch(e.target.value)}
            />
            {search && (
              <button style={s.clearBtn} onClick={() => handleSearch('')}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            )}
          </div>
          <div style={s.tabs}>
            {TABS.map(t => (
              <button key={t.key} className="tab-btn"
                style={{ ...s.tab, ...(statusFilter === t.key ? s.tabActive : {}) }}
                onClick={() => handleTab(t.key)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <table style={s.table}>
          <thead>
            <tr style={s.thead}>
              {['Customer', 'Phone', 'Company', 'Source', 'Licenses', 'Orders', 'Revenue', 'Status', 'Joined', ''].map(h => (
                <th key={h} style={s.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="trow" style={s.tr}>
                <td style={s.td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ ...s.avatar, background: AVATARS[(row.id - 1) % AVATARS.length] }}>
                      {initials(row.name)}
                    </div>
                    <div>
                      <div style={s.custName}>{row.name}</div>
                      <div style={s.custEmail}>{row.email}</div>
                    </div>
                  </div>
                </td>
                <td style={s.td}><span style={s.muted}>{row.phone}</span></td>
                <td style={s.td}><span style={s.muted}>{row.company}</span></td>
                <td style={s.td}><span style={{ ...s.badge, ...SOURCE_CLR[row.source] }}>{row.source}</span></td>
                <td style={{ ...s.td, textAlign: 'center' }}>
                  <span style={s.numChip}>{row.licenses}</span>
                </td>
                <td style={{ ...s.td, textAlign: 'center' }}>
                  <span style={s.muted}>{row.orders}</span>
                </td>
                <td style={s.td}><span style={{ fontWeight: 600, color: '#1e3a8a', fontSize: 13 }}>{row.revenue}</span></td>
                <td style={s.td}><span style={{ ...s.badge, ...STATUS_CLR[row.status] }}>{row.status}</span></td>
                <td style={s.td}><span style={s.muted}>{row.joined}</span></td>
                <td style={s.td}><button className="btn-ghost" style={s.manageBtn}>Manage</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        {rows.length === 0 && <div style={s.empty}>No customers match your search.</div>}

        <div style={s.footer}>
          <span style={{ color: '#3b82f6', fontSize: 13 }}>
            Showing {rows.length} of {filtered.length} customers
          </span>
          {totalPages > 1 && (
            <div style={s.pagination}>
              <button className="btn-ghost" style={{ ...s.pageBtn, opacity: page === 1 ? 0.4 : 1 }}
                onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} className="btn-ghost"
                  style={{ ...s.pageBtn, ...(page === p ? s.pageBtnActive : {}) }}
                  onClick={() => setPage(p)}>{p}</button>
              ))}
              <button className="btn-ghost" style={{ ...s.pageBtn, opacity: page === totalPages ? 0.4 : 1 }}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const s = {
  addBtn:       { padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  card:         { background: '#fff', borderRadius: 12, border: '1px solid #bfdbfe', overflow: 'hidden', boxShadow: '0 1px 4px rgba(37,99,235,0.08)' },
  toolbar:      { display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px', borderBottom: '1px solid #dbeafe', flexWrap: 'wrap' },
  searchBox:    { display: 'flex', alignItems: 'center', gap: 9, background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '9px 14px', minWidth: 260 },
  searchInput:  { border: 'none', background: 'none', fontSize: 14, outline: 'none', color: '#000', width: '100%' },
  clearBtn:     { background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' },
  tabs:         { display: 'flex', gap: 4, marginLeft: 'auto' },
  tab:          { padding: '7px 14px', borderRadius: 7, border: '1px solid transparent', background: 'none', fontSize: 13, color: '#3b82f6', fontWeight: 500, cursor: 'pointer' },
  tabActive:    { background: '#dbeafe', color: '#1e3a8a', border: '1px solid #93c5fd', fontWeight: 700 },
  table:        { width: '100%', borderCollapse: 'collapse' },
  thead:        { background: '#eff6ff' },
  th:           { padding: '11px 24px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' },
  tr:           { borderTop: '1px solid #dbeafe' },
  td:           { padding: '14px 24px', verticalAlign: 'middle', fontSize: 14 },
  avatar:       { width: 36, height: 36, borderRadius: '50%', color: '#fff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  custName:     { fontWeight: 600, color: '#000', fontSize: 14 },
  custEmail:    { fontSize: 12, color: '#3b82f6', marginTop: 2 },
  muted:        { color: '#1d4ed8', fontSize: 13 },
  badge:        { display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 5 },
  numChip:      { display: 'inline-block', minWidth: 28, textAlign: 'center', fontWeight: 700, color: '#1e3a8a', background: '#dbeafe', padding: '2px 8px', borderRadius: 5, fontSize: 13 },
  manageBtn:    { padding: '7px 14px', borderRadius: 7, border: '1px solid #bfdbfe', background: '#fff', fontSize: 13, fontWeight: 500, color: '#000', cursor: 'pointer' },
  empty:        { padding: '48px 24px', textAlign: 'center', fontSize: 14, color: '#3b82f6' },
  footer:       { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px', borderTop: '1px solid #dbeafe', background: '#eff6ff' },
  pagination:   { display: 'flex', gap: 4 },
  pageBtn:      { padding: '6px 12px', borderRadius: 6, border: '1px solid #bfdbfe', background: '#fff', fontSize: 13, fontWeight: 500, color: '#000', cursor: 'pointer' },
  pageBtnActive:{ background: '#dbeafe', color: '#1e3a8a', border: '1px solid #93c5fd', fontWeight: 700 },
}
