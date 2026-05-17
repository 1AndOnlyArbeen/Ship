import { useState } from 'react'
import { PageHeader } from './Dashboard'
import { LICENSES } from '../data'

function ModalRow({ label, children }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: '1px solid #f3f4f6' }}>
      <span style={{ fontSize: 13, color: '#888', fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{children}</span>
    </div>
  )
}

export default function Licenses() {
  const [search,   setSearch]   = useState('')
  const [filter,   setFilter]   = useState('All')
  const [editing,  setEditing]  = useState(null)
  const [toggling, setToggling] = useState(null)

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
    { key: 'All',      label: `All (${LICENSES.length})`      },
    { key: 'Active',   label: `Active (${counts.Active})`     },
    { key: 'Expired',  label: `Expired (${counts.Expired})`   },
    { key: 'Inactive', label: `Inactive (${counts.Inactive})` },
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
          { label: 'Active',   value: counts.Active                                    },
          { label: 'Expired',  value: counts.Expired                                   },
          { label: 'Inactive', value: counts.Inactive                                  },
          { label: 'Premium',  value: LICENSES.filter(l => l.type === 'Premium').length },
        ].map(c => (
          <div key={c.label} style={s.statCard}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#111', letterSpacing: '-0.5px' }}>{c.value}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#888', marginTop: 4 }}>{c.label} Licenses</div>
          </div>
        ))}
      </div>

      <div style={s.card}>
        <div style={s.toolbar}>
          <div style={s.searchBox}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2.5" strokeLinecap="round">
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
                <td style={s.td}><span style={s.badge}>{row.type}</span></td>
                <td style={s.td}><span style={s.muted}>{row.started}</span></td>
                <td style={s.td}>
                  <span style={{ ...s.muted, color: row.status === 'Expired' ? '#dc2626' : '#888', fontWeight: row.status === 'Expired' ? 700 : 400 }}>
                    {row.expires}
                  </span>
                </td>
                <td style={s.td}><span style={s.badge}>{row.status}</span></td>
                <td style={s.td}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn-ghost" style={s.btn} onClick={() => setEditing(row)}>Edit</button>
                    <button className="btn-ghost" style={s.btn} onClick={() => setToggling(row)}>
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

      {editing && (
        <div style={s.overlay} onClick={() => setEditing(null)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 13, color: '#888', marginBottom: 6 }}>License Details</div>
                <code style={{ ...s.licKey, fontSize: 15 }}>{editing.key}</code>
              </div>
              <button style={s.closeBtn} onClick={() => setEditing(null)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <ModalRow label="Customer">{editing.customer}</ModalRow>
            <ModalRow label="Company">{editing.company}</ModalRow>
            <ModalRow label="Type"><span style={s.badge}>{editing.type}</span></ModalRow>
            <ModalRow label="Status"><span style={s.badge}>{editing.status}</span></ModalRow>
            <ModalRow label="Started">{editing.started}</ModalRow>
            <ModalRow label="Expires">
              <span style={{ color: editing.status === 'Expired' ? '#dc2626' : '#111' }}>{editing.expires}</span>
            </ModalRow>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>
              <button className="btn-ghost" style={s.btn} onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn-primary" style={{ padding: '9px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                onClick={() => setEditing(null)}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {toggling && (
        <div style={s.overlay} onClick={() => setToggling(null)}>
          <div style={{ ...s.modal, maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#111', marginBottom: 8 }}>
              {toggling.status === 'Active' ? 'Deactivate License?' : 'Activate License?'}
            </div>
            <div style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>
              License <strong>{toggling.key}</strong> for <strong>{toggling.customer}</strong> will be {toggling.status === 'Active' ? 'suspended' : 'restored'} immediately.
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>
              <button className="btn-ghost" style={s.btn} onClick={() => setToggling(null)}>Cancel</button>
              <button className="btn-primary" style={{ padding: '9px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                onClick={() => setToggling(null)}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const s = {
  addBtn:     { padding: '9px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' },
  statCard:   { background: '#fff', borderRadius: 8, padding: '18px 22px', border: '1px solid #e5e7eb' },
  card:       { background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', overflow: 'hidden' },
  toolbar:    { display: 'flex', alignItems: 'center', gap: 16, padding: '14px 24px', borderBottom: '1px solid #f3f4f6', flexWrap: 'wrap' },
  searchBox:  { display: 'flex', alignItems: 'center', gap: 9, background: '#fafafa', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 12px', minWidth: 260 },
  searchInput:{ border: 'none', background: 'none', fontSize: 14, outline: 'none', color: '#111', width: '100%' },
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
  licKey:     { fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: '#333', background: '#f3f4f6', padding: '3px 9px', borderRadius: 3 },
  badge:      { display: 'inline-block', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 3, background: '#f3f4f6', color: '#444' },
  btn:        { padding: '6px 13px', borderRadius: 5, border: '1px solid #e5e7eb', background: '#fff', fontSize: 13, fontWeight: 500, color: '#333', cursor: 'pointer' },
  empty:      { padding: '48px 24px', textAlign: 'center', fontSize: 14, color: '#aaa' },
  footer:     { padding: '12px 24px', fontSize: 13, color: '#aaa', borderTop: '1px solid #f3f4f6', background: '#fafafa' },
  overlay:    { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' },
  modal:      { background: '#fff', borderRadius: 10, padding: '28px', width: '100%', maxWidth: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.15)', border: '1px solid #e5e7eb' },
  closeBtn:   { background: 'none', border: 'none', padding: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', borderRadius: 4 },
}
