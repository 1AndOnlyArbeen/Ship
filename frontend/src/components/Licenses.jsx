import { useState } from 'react'
import { PageHeader } from './Dashboard'
import { LICENSES } from '../data'

const STATUS_CLR = {
  Active:   { bg: '#dbeafe', color: '#1e3a8a' },
  Expired:  { bg: '#bfdbfe', color: '#1e40af' },
  Inactive: { bg: '#eff6ff', color: '#3b82f6' },
}
const TYPE_CLR = {
  Standard: { bg: '#eff6ff', color: '#2563eb' },
  Premium:  { bg: '#dbeafe', color: '#1e3a8a' },
}

export default function Licenses() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filtered = LICENSES.filter(d => {
    const q = search.toLowerCase()
    return (
      (d.key.toLowerCase().includes(q) || d.customer.toLowerCase().includes(q) || d.company.toLowerCase().includes(q)) &&
      (filter === 'All' || d.status === filter)
    )
  })

  const counts = {
    Active:   LICENSES.filter(l => l.status === 'Active').length,
    Expired:  LICENSES.filter(l => l.status === 'Expired').length,
    Inactive: LICENSES.filter(l => l.status === 'Inactive').length,
  }

  const TABS = [
    { key: 'All',      label: `All (${LICENSES.length})`       },
    { key: 'Active',   label: `Active (${counts.Active})`      },
    { key: 'Expired',  label: `Expired (${counts.Expired})`    },
    { key: 'Inactive', label: `Inactive (${counts.Inactive})`  },
  ]

  return (
    <div>
      <PageHeader
        title="Licenses"
        sub={`${LICENSES.length} licenses total · ${counts.Active} active · ${counts.Expired} expired`}
        action={<button className="btn-primary" style={s.addBtn}>+ New License</button>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Active',   value: counts.Active,                                       borderColor: '#1e3a8a' },
          { label: 'Expired',  value: counts.Expired,                                      borderColor: '#1d4ed8' },
          { label: 'Inactive', value: counts.Inactive,                                     borderColor: '#3b82f6' },
          { label: 'Premium',  value: LICENSES.filter(l => l.type === 'Premium').length,   borderColor: '#60a5fa' },
        ].map(c => (
          <div key={c.label} style={{ ...s.statCard, borderTop: `3px solid ${c.borderColor}` }}>
            <div style={{ fontSize: 30, fontWeight: 800, color: '#000', letterSpacing: '-0.5px' }}>{c.value}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1d4ed8', marginTop: 4 }}>{c.label} Licenses</div>
          </div>
        ))}
      </div>

      <div style={s.card}>
        <div style={s.toolbar}>
          <div style={s.searchBox}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input style={s.searchInput} placeholder="Search by key, customer or company…" value={search} onChange={e => setSearch(e.target.value)} />
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
              {['License Key', 'Customer', 'Company', 'Type', 'Started', 'Expires', 'Status', ''].map(h => (
                <th key={h} style={s.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => (
              <tr key={row.id} className="trow" style={s.tr}>
                <td style={s.td}><code style={s.licKey}>{row.key}</code></td>
                <td style={s.td}><span style={s.bold}>{row.customer}</span></td>
                <td style={s.td}><span style={s.muted}>{row.company}</span></td>
                <td style={s.td}><span style={{ ...s.badge, ...TYPE_CLR[row.type] }}>{row.type}</span></td>
                <td style={s.td}><span style={s.muted}>{row.started}</span></td>
                <td style={s.td}>
                  <span style={{ ...s.muted, color: row.status === 'Expired' ? '#1e3a8a' : '#1d4ed8', fontWeight: row.status === 'Expired' ? 700 : 400 }}>
                    {row.expires}
                  </span>
                </td>
                <td style={s.td}><span style={{ ...s.badge, ...STATUS_CLR[row.status] }}>{row.status}</span></td>
                <td style={s.td}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn-ghost" style={s.btn}>Edit</button>
                    <button className="btn-ghost" style={{
                      ...s.btn,
                      color: '#1e3a8a',
                      borderColor: '#93c5fd',
                      fontWeight: 600,
                    }}>
                      {row.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && <div style={s.empty}>No licenses match your filter.</div>}
        <div style={s.footer}>Showing {filtered.length} of {LICENSES.length} licenses</div>
      </div>
    </div>
  )
}

const s = {
  addBtn:      { padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  statCard:    { background: '#fff', borderRadius: 12, padding: '20px 22px', border: '1px solid #bfdbfe', boxShadow: '0 1px 3px rgba(37,99,235,0.08)' },
  card:        { background: '#fff', borderRadius: 12, border: '1px solid #bfdbfe', overflow: 'hidden', boxShadow: '0 1px 4px rgba(37,99,235,0.08)' },
  toolbar:     { display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px', borderBottom: '1px solid #dbeafe', flexWrap: 'wrap' },
  searchBox:   { display: 'flex', alignItems: 'center', gap: 9, background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '9px 14px', minWidth: 260 },
  searchInput: { border: 'none', background: 'none', fontSize: 14, outline: 'none', color: '#000', width: '100%' },
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
  licKey:      { fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: '#1e3a8a', background: '#dbeafe', padding: '4px 10px', borderRadius: 6 },
  badge:       { display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 5 },
  btn:         { padding: '7px 14px', borderRadius: 7, border: '1px solid #bfdbfe', background: '#fff', fontSize: 13, fontWeight: 500, color: '#000', cursor: 'pointer' },
  empty:       { padding: '48px 24px', textAlign: 'center', fontSize: 14, color: '#3b82f6' },
  footer:      { padding: '13px 24px', fontSize: 13, color: '#3b82f6', borderTop: '1px solid #dbeafe', background: '#eff6ff' },
}
