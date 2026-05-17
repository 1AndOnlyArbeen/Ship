import { useState } from 'react'
import { PageHeader } from './Dashboard'
import { COMPANIES } from '../data'

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

const PALETTE = ['#1e3a8a', '#1e40af', '#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa']

export default function Companies() {
  const [search, setSearch] = useState('')
  const [confirm, setConfirm] = useState(null)

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
          { label: 'Total Companies',  value: COMPANIES.length,                sub: `${activeCount} active`          },
          { label: 'Total Licenses',   value: totalLicenses.toLocaleString(),  sub: 'across all companies'           },
          { label: 'Total Customers',  value: totalCustomers.toLocaleString(), sub: 'registered customers'           },
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input style={s.searchInput} placeholder="Search companies…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={s.count}>{rows.length} of {COMPANIES.length} companies</div>
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
                    <div style={{ ...s.compAvatar, background: PALETTE[i % PALETTE.length] }}>
                      {initials(row.name)}
                    </div>
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
                <td style={s.td}><span style={{ fontWeight: 700, color: '#000', fontSize: 15 }}>{row.licenses}</span></td>
                <td style={s.td}><span style={s.muted}>{row.customers}</span></td>
                <td style={s.td}><span style={{ fontWeight: 600, color: '#1e3a8a' }}>{row.revenue}</span></td>
                <td style={s.td}>
                  <span style={{
                    display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 5,
                    background: row.status === 'Active' ? '#dbeafe' : '#eff6ff',
                    color:      row.status === 'Active' ? '#1e3a8a' : '#3b82f6',
                  }}>{row.status}</span>
                </td>
                <td style={s.td}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn-ghost" style={s.btn}>Edit</button>
                    <button className="btn-danger" style={s.btnDanger} onClick={() => setConfirm(row.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {rows.length === 0 && <div style={s.empty}>No companies match "{search}"</div>}
      </div>

      {confirm && (
        <div style={s.overlay} onClick={() => setConfirm(null)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <div style={s.modalTitle}>Delete Company?</div>
            <div style={s.modalSub}>This action cannot be undone. All associated data will be removed.</div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>
              <button className="btn-ghost" style={s.btn} onClick={() => setConfirm(null)}>Cancel</button>
              <button className="btn-danger" style={{ ...s.btnDanger, padding: '9px 20px' }} onClick={() => setConfirm(null)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const s = {
  addBtn:      { padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  summCard:    { background: '#fff', borderRadius: 12, padding: '20px 24px', border: '1px solid #bfdbfe', boxShadow: '0 1px 3px rgba(37,99,235,0.08)' },
  summVal:     { fontSize: 30, fontWeight: 800, color: '#000', letterSpacing: '-0.5px', marginBottom: 4 },
  summLabel:   { fontSize: 13, fontWeight: 600, color: '#000', marginBottom: 2 },
  summSub:     { fontSize: 12, color: '#3b82f6' },
  card:        { background: '#fff', borderRadius: 12, border: '1px solid #bfdbfe', overflow: 'hidden', boxShadow: '0 1px 4px rgba(37,99,235,0.08)' },
  toolbar:     { display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px', borderBottom: '1px solid #dbeafe' },
  searchBox:   { display: 'flex', alignItems: 'center', gap: 9, background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '9px 14px', flex: 1, maxWidth: 320 },
  searchInput: { border: 'none', background: 'none', fontSize: 14, outline: 'none', color: '#000', width: '100%' },
  count:       { fontSize: 13, color: '#3b82f6', marginLeft: 'auto' },
  table:       { width: '100%', borderCollapse: 'collapse' },
  thead:       { background: '#eff6ff' },
  th:          { padding: '11px 24px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' },
  tr:          { borderTop: '1px solid #dbeafe' },
  td:          { padding: '14px 24px', verticalAlign: 'middle', fontSize: 14 },
  bold:        { fontWeight: 600, color: '#000', fontSize: 14 },
  muted:       { color: '#1d4ed8', fontSize: 13 },
  compAvatar:  { width: 38, height: 38, borderRadius: 8, color: '#fff', fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  numBadge:    { display: 'inline-block', width: 28, height: 28, lineHeight: '28px', textAlign: 'center', background: '#dbeafe', borderRadius: 6, fontSize: 13, fontWeight: 700, color: '#1e3a8a' },
  btn:         { padding: '7px 14px', borderRadius: 7, border: '1px solid #bfdbfe', background: '#fff', fontSize: 13, fontWeight: 500, color: '#000', cursor: 'pointer' },
  btnDanger:   { padding: '7px 14px', borderRadius: 7, border: '1px solid #93c5fd', background: '#fff', fontSize: 13, fontWeight: 500, color: '#1e3a8a', cursor: 'pointer' },
  empty:       { padding: '40px 24px', textAlign: 'center', fontSize: 14, color: '#3b82f6' },
  overlay:     { position: 'fixed', inset: 0, background: 'rgba(30,58,138,0.3)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  modal:       { background: '#fff', borderRadius: 14, padding: '28px', width: 400, boxShadow: '0 24px 64px rgba(37,99,235,0.2)', border: '1px solid #bfdbfe' },
  modalTitle:  { fontSize: 18, fontWeight: 700, color: '#000', marginBottom: 8 },
  modalSub:    { fontSize: 14, color: '#1d4ed8', lineHeight: 1.5 },
}
