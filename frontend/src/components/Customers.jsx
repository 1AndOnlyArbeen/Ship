import { useState } from 'react'
import { PageHeader } from './Dashboard'
import { CUSTOMERS } from '../data'

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

const PAGE_SIZE = 8

function ModalRow({ label, children }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: '1px solid #f3f4f6' }}>
      <span style={{ fontSize: 13, color: '#888', fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{children}</span>
    </div>
  )
}

export default function Customers() {
  const [search,       setSearch]       = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [page,         setPage]         = useState(1)
  const [selected,     setSelected]     = useState(null)

  const filtered = CUSTOMERS.filter(d => {
    const q = search.toLowerCase()
    return (
      (d.name.toLowerCase().includes(q) || d.email.toLowerCase().includes(q) || d.company.toLowerCase().includes(q)) &&
      (statusFilter === 'All' || d.status === statusFilter)
    )
  })

  const totalPages    = Math.ceil(filtered.length / PAGE_SIZE)
  const rows          = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const activeCount   = CUSTOMERS.filter(c => c.status === 'Active').length
  const inactiveCount = CUSTOMERS.filter(c => c.status === 'Inactive').length

  const TABS = [
    { key: 'All',      label: `All (${CUSTOMERS.length})`   },
    { key: 'Active',   label: `Active (${activeCount})`     },
    { key: 'Inactive', label: `Inactive (${inactiveCount})` },
  ]

  const handleTab    = t => { setStatusFilter(t); setPage(1) }
  const handleSearch = v => { setSearch(v); setPage(1) }

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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2.5" strokeLinecap="round">
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
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
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
            {rows.map(row => (
              <tr key={row.id} className="trow" style={s.tr}>
                <td style={s.td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <div style={s.avatar}>{initials(row.name)}</div>
                    <div>
                      <div style={s.custName}>{row.name}</div>
                      <div style={s.custEmail}>{row.email}</div>
                    </div>
                  </div>
                </td>
                <td style={s.td}><span style={s.muted}>{row.phone}</span></td>
                <td style={s.td}><span style={s.muted}>{row.company}</span></td>
                <td style={s.td}><span style={s.badge}>{row.source}</span></td>
                <td style={{ ...s.td, textAlign: 'center' }}>
                  <span style={s.numChip}>{row.licenses}</span>
                </td>
                <td style={{ ...s.td, textAlign: 'center' }}>
                  <span style={s.muted}>{row.orders}</span>
                </td>
                <td style={s.td}><span style={{ fontWeight: 600, color: '#111', fontSize: 13 }}>{row.revenue}</span></td>
                <td style={s.td}><span style={s.badge}>{row.status}</span></td>
                <td style={s.td}><span style={s.muted}>{row.joined}</span></td>
                <td style={s.td}>
                  <button className="btn-ghost" style={s.manageBtn} onClick={() => setSelected(row)}>Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {rows.length === 0 && <div style={s.empty}>No customers match your search.</div>}

        <div style={s.footer}>
          <span style={{ color: '#aaa', fontSize: 13 }}>
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

      {selected && (
        <div style={s.overlay} onClick={() => setSelected(null)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ ...s.avatar, width: 48, height: 48, fontSize: 17, borderRadius: 8 }}>{initials(selected.name)}</div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#111' }}>{selected.name}</div>
                  <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>{selected.email}</div>
                </div>
              </div>
              <button style={s.closeBtn} onClick={() => setSelected(null)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: '#e5e7eb', border: '1px solid #e5e7eb', borderRadius: 6, overflow: 'hidden', marginBottom: 16 }}>
              {[
                { label: 'Licenses', value: selected.licenses },
                { label: 'Orders',   value: selected.orders   },
                { label: 'Revenue',  value: selected.revenue  },
              ].map(stat => (
                <div key={stat.label} style={{ textAlign: 'center', padding: '14px 12px', background: '#fff' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#111' }}>{stat.value}</div>
                  <div style={{ fontSize: 11, color: '#888', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <ModalRow label="Phone">{selected.phone}</ModalRow>
            <ModalRow label="Company">{selected.company}</ModalRow>
            <ModalRow label="Source">{selected.source}</ModalRow>
            <ModalRow label="Status"><span style={s.badge}>{selected.status}</span></ModalRow>
            <ModalRow label="Joined">{selected.joined}</ModalRow>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>
              <button className="btn-ghost" style={s.pageBtn} onClick={() => setSelected(null)}>Close</button>
              <button className="btn-primary" style={{ padding: '9px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                onClick={() => setSelected(null)}>
                Edit Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const s = {
  addBtn:      { padding: '9px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' },
  card:        { background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', overflow: 'hidden' },
  toolbar:     { display: 'flex', alignItems: 'center', gap: 16, padding: '14px 24px', borderBottom: '1px solid #f3f4f6', flexWrap: 'wrap' },
  searchBox:   { display: 'flex', alignItems: 'center', gap: 9, background: '#fafafa', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 12px', minWidth: 260 },
  searchInput: { border: 'none', background: 'none', fontSize: 14, outline: 'none', color: '#111', width: '100%' },
  clearBtn:    { background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' },
  tabs:        { display: 'flex', gap: 4, marginLeft: 'auto' },
  tab:         { padding: '6px 13px', borderRadius: 5, border: '1px solid transparent', background: 'none', fontSize: 13, color: '#888', fontWeight: 500, cursor: 'pointer' },
  tabActive:   { background: '#f3f4f6', color: '#111', border: '1px solid #e5e7eb', fontWeight: 700 },
  table:       { width: '100%', borderCollapse: 'collapse' },
  thead:       { background: '#fafafa' },
  th:          { padding: '10px 24px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' },
  tr:          { borderTop: '1px solid #f3f4f6' },
  td:          { padding: '12px 24px', verticalAlign: 'middle', fontSize: 14 },
  avatar:      { width: 34, height: 34, borderRadius: '50%', background: '#e5e7eb', color: '#555', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  custName:    { fontWeight: 600, color: '#111', fontSize: 14 },
  custEmail:   { fontSize: 12, color: '#aaa', marginTop: 2 },
  muted:       { color: '#888', fontSize: 13 },
  badge:       { display: 'inline-block', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 3, background: '#f3f4f6', color: '#444' },
  numChip:     { display: 'inline-block', minWidth: 26, textAlign: 'center', fontWeight: 700, color: '#555', background: '#f3f4f6', padding: '2px 7px', borderRadius: 3, fontSize: 12 },
  manageBtn:   { padding: '6px 13px', borderRadius: 5, border: '1px solid #e5e7eb', background: '#fff', fontSize: 13, fontWeight: 500, color: '#333', cursor: 'pointer' },
  empty:       { padding: '48px 24px', textAlign: 'center', fontSize: 14, color: '#aaa' },
  footer:      { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', borderTop: '1px solid #f3f4f6', background: '#fafafa' },
  pagination:  { display: 'flex', gap: 4 },
  pageBtn:     { padding: '5px 11px', borderRadius: 5, border: '1px solid #e5e7eb', background: '#fff', fontSize: 13, fontWeight: 500, color: '#333', cursor: 'pointer' },
  pageBtnActive:{ background: '#f3f4f6', color: '#111', border: '1px solid #d1d5db', fontWeight: 700 },
  overlay:     { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' },
  modal:       { background: '#fff', borderRadius: 10, padding: '28px', width: '100%', maxWidth: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.15)', border: '1px solid #e5e7eb', maxHeight: '90vh', overflowY: 'auto' },
  closeBtn:    { background: 'none', border: 'none', padding: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', borderRadius: 4 },
}
