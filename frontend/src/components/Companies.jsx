import { useState } from 'react'
import { PageHeader } from './Dashboard'
import { COMPANIES } from '../data'

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

function ModalRow({ label, children }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: '1px solid #f3f4f6' }}>
      <span style={{ fontSize: 13, color: '#888', fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{children}</span>
    </div>
  )
}

export default function Companies() {
  const [search,  setSearch]  = useState('')
  const [confirm, setConfirm] = useState(null)
  const [editing, setEditing] = useState(null)

  const rows = COMPANIES.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))

  const totalLicenses  = COMPANIES.reduce((a, c) => a + c.licenses, 0)
  const totalCustomers = COMPANIES.reduce((a, c) => a + c.customers, 0)
  const activeCount    = COMPANIES.filter(c => c.status === 'Active').length

  return (
    <div>
      <PageHeader
        title="Companies"
        sub={`${COMPANIES.length} courier companies · ${activeCount} active`}
        action={<button className="btn-primary" style={s.addBtn}>+ Add Company</button>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Companies', value: COMPANIES.length,                sub: `${activeCount} active`     },
          { label: 'Total Licenses',  value: totalLicenses.toLocaleString(),  sub: 'across all companies'      },
          { label: 'Total Customers', value: totalCustomers.toLocaleString(), sub: 'registered customers'      },
        ].map(c => (
          <div key={c.label} style={s.summCard}>
            <div style={s.summVal}>{c.value}</div>
            <div style={s.summLabel}>{c.label}</div>
            <div style={s.summSub}>{c.sub}</div>
          </div>
        ))}
      </div>

      <div style={s.card}>
        <div style={s.toolbar}>
          <div style={s.searchBox}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input style={s.searchInput} placeholder="Search companies…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={s.count}>{rows.length} of {COMPANIES.length}</div>
        </div>

        <table style={s.table}>
          <thead>
            <tr style={s.thead}>
              {['Company', 'Provider', 'Managers', 'Licenses', 'Customers', 'Revenue', 'Status', ''].map(h => (
                <th key={h} style={s.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.id} className="trow" style={s.tr}>
                <td style={s.td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={s.compAvatar}>{initials(row.name)}</div>
                    <div>
                      <div style={s.bold}>{row.name}</div>
                      <div style={s.muted}>{row.provider}</div>
                    </div>
                  </div>
                </td>
                <td style={s.td}><span style={s.muted}>{row.provider}</span></td>
                <td style={{ ...s.td, textAlign: 'center' }}>
                  <span style={s.numBadge}>{row.managers}</span>
                </td>
                <td style={s.td}><span style={{ fontWeight: 700, color: '#111' }}>{row.licenses}</span></td>
                <td style={s.td}><span style={s.muted}>{row.customers}</span></td>
                <td style={s.td}><span style={{ fontWeight: 600, color: '#111' }}>{row.revenue}</span></td>
                <td style={s.td}><span style={s.badge}>{row.status}</span></td>
                <td style={s.td}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn-ghost" style={s.btn} onClick={() => setEditing(row)}>Edit</button>
                    <button className="btn-danger" style={s.btnDanger} onClick={() => setConfirm(row.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {rows.length === 0 && <div style={s.empty}>No companies match "{search}"</div>}
      </div>

      {editing && (
        <div style={s.overlay} onClick={() => setEditing(null)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ ...s.compAvatar, width: 46, height: 46, fontSize: 16 }}>{initials(editing.name)}</div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#111' }}>{editing.name}</div>
                  <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>Provider: {editing.provider}</div>
                </div>
              </div>
              <button style={s.closeBtn} onClick={() => setEditing(null)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <ModalRow label="Licenses">{editing.licenses}</ModalRow>
            <ModalRow label="Customers">{editing.customers}</ModalRow>
            <ModalRow label="Revenue">{editing.revenue}</ModalRow>
            <ModalRow label="Managers">{editing.managers}</ModalRow>
            <ModalRow label="Status"><span style={s.badge}>{editing.status}</span></ModalRow>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>
              <button className="btn-ghost" style={s.btn} onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn-primary" style={s.saveBtn} onClick={() => setEditing(null)}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {confirm && (
        <div style={s.overlay} onClick={() => setConfirm(null)}>
          <div style={{ ...s.modal, maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#111', marginBottom: 8 }}>Delete Company?</div>
            <div style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>
              This cannot be undone. All associated licenses and customer data will be removed.
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>
              <button className="btn-ghost" style={s.btn} onClick={() => setConfirm(null)}>Cancel</button>
              <button className="btn-danger" style={{ ...s.btnDanger, padding: '9px 20px', fontWeight: 700 }} onClick={() => setConfirm(null)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const s = {
  addBtn:     { padding: '9px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' },
  summCard:   { background: '#fff', borderRadius: 8, padding: '18px 22px', border: '1px solid #e5e7eb' },
  summVal:    { fontSize: 28, fontWeight: 800, color: '#111', letterSpacing: '-0.5px', marginBottom: 3 },
  summLabel:  { fontSize: 13, fontWeight: 600, color: '#333', marginBottom: 2 },
  summSub:    { fontSize: 12, color: '#999' },
  card:       { background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', overflow: 'hidden' },
  toolbar:    { display: 'flex', alignItems: 'center', gap: 16, padding: '14px 24px', borderBottom: '1px solid #f3f4f6' },
  searchBox:  { display: 'flex', alignItems: 'center', gap: 9, background: '#fafafa', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 12px', flex: 1, maxWidth: 300 },
  searchInput:{ border: 'none', background: 'none', fontSize: 14, outline: 'none', color: '#111', width: '100%' },
  count:      { fontSize: 13, color: '#aaa', marginLeft: 'auto' },
  table:      { width: '100%', borderCollapse: 'collapse' },
  thead:      { background: '#fafafa' },
  th:         { padding: '10px 24px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' },
  tr:         { borderTop: '1px solid #f3f4f6' },
  td:         { padding: '13px 24px', verticalAlign: 'middle', fontSize: 14 },
  bold:       { fontWeight: 600, color: '#111', fontSize: 14 },
  muted:      { color: '#888', fontSize: 13 },
  compAvatar: { width: 36, height: 36, borderRadius: 6, background: '#e5e7eb', color: '#555', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  numBadge:   { display: 'inline-block', width: 26, height: 26, lineHeight: '26px', textAlign: 'center', background: '#f3f4f6', borderRadius: 4, fontSize: 12, fontWeight: 700, color: '#555' },
  badge:      { display: 'inline-block', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 3, background: '#f3f4f6', color: '#444' },
  btn:        { padding: '7px 14px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff', fontSize: 13, fontWeight: 500, color: '#333', cursor: 'pointer' },
  btnDanger:  { padding: '7px 14px', borderRadius: 6, border: '1px solid #fca5a5', background: '#fff', fontSize: 13, fontWeight: 500, color: '#dc2626', cursor: 'pointer' },
  saveBtn:    { padding: '9px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' },
  empty:      { padding: '40px 24px', textAlign: 'center', fontSize: 14, color: '#aaa' },
  overlay:    { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' },
  modal:      { background: '#fff', borderRadius: 10, padding: '28px', width: '100%', maxWidth: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.15)', border: '1px solid #e5e7eb' },
  closeBtn:   { background: 'none', border: 'none', padding: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', borderRadius: 4 },
}
