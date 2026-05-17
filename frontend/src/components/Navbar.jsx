import { useState, useRef, useEffect } from 'react'
import { CUSTOMERS, ORDERS, LICENSES, COMPANIES } from '../data'

const NAV = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'companies', label: 'Companies' },
  { id: 'customers', label: 'Customers' },
  { id: 'licenses',  label: 'Licenses'  },
  { id: 'orders',    label: 'Orders'    },
  { id: 'shipments', label: 'Shipments' },
  { id: 'reports',   label: 'Reports'   },
  { id: 'settings',  label: 'Settings'  },
]

const TYPE_COLORS = {
  Customer: { background: '#dbeafe', color: '#1e40af' },
  Order:    { background: '#dcfce7', color: '#15803d' },
  License:  { background: '#fef3c7', color: '#92400e' },
  Company:  { background: '#ede9fe', color: '#6d28d9' },
}

function searchAll(q) {
  if (!q || q.length < 2) return []
  const ql = q.toLowerCase()
  const results = []
  CUSTOMERS.filter(c => c.name.toLowerCase().includes(ql) || c.email.toLowerCase().includes(ql))
    .slice(0, 3).forEach(c => results.push({ type: 'Customer', label: c.name, sub: c.email, page: 'customers' }))
  ORDERS.filter(o => o.id.toLowerCase().includes(ql) || o.customer.toLowerCase().includes(ql))
    .slice(0, 3).forEach(o => results.push({ type: 'Order', label: o.id, sub: `${o.customer} · ${o.total}`, page: 'orders' }))
  LICENSES.filter(l => l.key.toLowerCase().includes(ql) || l.customer.toLowerCase().includes(ql))
    .slice(0, 2).forEach(l => results.push({ type: 'License', label: l.key, sub: l.customer, page: 'licenses' }))
  COMPANIES.filter(c => c.name.toLowerCase().includes(ql))
    .slice(0, 2).forEach(c => results.push({ type: 'Company', label: c.name, sub: `${c.licenses} licenses`, page: 'companies' }))
  return results.slice(0, 8)
}

export default function Navbar({ active, navigate }) {
  const [userOpen, setUserOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef(null)
  const results = searchAll(search)

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false)
      if (!e.target.closest('[data-user-menu]')) setUserOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header style={s.bar}>
      <div style={s.inner}>
        <button style={s.logo} onClick={() => navigate('dashboard')}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#2563eb"/>
            <path d="M16 8v11M11 14l5-6 5 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 21h16M9 21q3.5 4 7 3.5t7-3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
          </svg>
          <span style={s.logoText}>Shipos</span>
          <span style={s.adminBadge}>Admin</span>
        </button>

        <nav style={s.nav}>
          {NAV.map(n => (
            <button key={n.id} className="nav-link"
              style={{ ...s.link, ...(active === n.id ? s.linkActive : {}) }}
              onClick={() => navigate(n.id)}>
              {n.label}
              {active === n.id && <span style={s.underline} />}
            </button>
          ))}
        </nav>

        <div style={s.searchWrap} ref={searchRef}>
          <div style={{ ...s.searchBox, ...(searchOpen ? s.searchBoxActive : {}) }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input className="search-input" style={s.searchInput}
              placeholder="Search customers, orders, licenses…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchOpen(true)}
            />
            {search && (
              <button style={s.clearBtn} onClick={() => { setSearch(''); setSearchOpen(false) }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            )}
          </div>
          {searchOpen && search.length >= 2 && (
            <div style={s.searchDrop}>
              {results.length === 0
                ? <div style={s.noResults}>No results for "<strong>{search}</strong>"</div>
                : results.map((r, i) => (
                  <button key={i} className="search-result" style={s.result}
                    onClick={() => { navigate(r.page); setSearch(''); setSearchOpen(false) }}>
                    <span style={{ ...s.typeTag, ...TYPE_COLORS[r.type] }}>{r.type}</span>
                    <div style={{ minWidth: 0 }}>
                      <div style={s.resultLabel}>{r.label}</div>
                      <div style={s.resultSub}>{r.sub}</div>
                    </div>
                  </button>
                ))
              }
            </div>
          )}
        </div>

        <div style={s.right}>
          <button style={s.iconBtn} title="Notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" strokeLinecap="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span style={s.notifDot} />
          </button>

          <div style={{ position: 'relative' }} data-user-menu>
            <button style={s.userBtn} onClick={() => setUserOpen(o => !o)}>
              <div style={s.avatar}>A</div>
              <div style={s.userInfo}>
                <div style={s.userName}>Amit Matat</div>
                <div style={s.userRole}>Super Admin</div>
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            {userOpen && (
              <div style={s.dropdown} data-user-menu>
                <div style={s.dropHead}>
                  <div style={s.dropAvatar}>A</div>
                  <div>
                    <div style={s.dropName}>Amit Matat</div>
                    <div style={s.dropEmail}>amit@matat.co.il</div>
                  </div>
                </div>
                <div style={s.divider} />
                <button className="drop-item" style={s.dropItem} onClick={() => { navigate('settings'); setUserOpen(false) }}>Account Settings</button>
                <button className="drop-item" style={s.dropItem} onClick={() => setUserOpen(false)}>Profile</button>
                <div style={s.divider} />
                <button className="drop-item" style={{ ...s.dropItem, color: '#ef4444', fontWeight: 600 }} onClick={() => setUserOpen(false)}>Sign out</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

const s = {
  bar:            { background: '#111827', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' },
  inner:          { maxWidth: 1360, margin: '0 auto', padding: '0 36px', height: 64, display: 'flex', alignItems: 'center', gap: 24 },
  logo:           { display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', padding: 0, flexShrink: 0, cursor: 'pointer' },
  logoText:       { color: '#fff', fontSize: 18, fontWeight: 700, letterSpacing: '-0.5px' },
  adminBadge:     { fontSize: 10, fontWeight: 700, color: '#93c5fd', background: 'rgba(147,197,253,0.15)', padding: '2px 8px', borderRadius: 4, letterSpacing: '0.06em', textTransform: 'uppercase', flexShrink: 0 },
  nav:            { display: 'flex', alignItems: 'center', flexShrink: 0 },
  link:           { position: 'relative', background: 'none', border: 'none', padding: '0 12px', height: 64, fontSize: 13, fontWeight: 500, color: '#9ca3af', cursor: 'pointer', whiteSpace: 'nowrap' },
  linkActive:     { color: '#fff', fontWeight: 600 },
  underline:      { position: 'absolute', bottom: 0, left: 12, right: 12, height: 2, background: '#2563eb', borderRadius: '2px 2px 0 0' },
  searchWrap:     { position: 'relative', flex: 1, maxWidth: 300, minWidth: 160 },
  searchBox:      { display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px' },
  searchBoxActive:{ border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.12)' },
  searchInput:    { background: 'none', border: 'none', color: '#fff', fontSize: 13, outline: 'none', width: '100%' },
  clearBtn:       { background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', cursor: 'pointer' },
  searchDrop:     { position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', boxShadow: '0 16px 48px rgba(0,0,0,0.18)', overflow: 'hidden', zIndex: 200 },
  noResults:      { padding: '20px 16px', fontSize: 13, color: '#9ca3af', textAlign: 'center' },
  result:         { display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '11px 16px', background: 'none', border: 'none', borderBottom: '1px solid #f9fafb', textAlign: 'left', cursor: 'pointer' },
  typeTag:        { fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 4, flexShrink: 0, letterSpacing: '0.05em', textTransform: 'uppercase' },
  resultLabel:    { fontSize: 13, fontWeight: 600, color: '#111827' },
  resultSub:      { fontSize: 12, color: '#6b7280', marginTop: 1 },
  right:          { display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 },
  iconBtn:        { position: 'relative', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 7, padding: '8px 10px', display: 'flex', alignItems: 'center', cursor: 'pointer' },
  notifDot:       { position: 'absolute', top: 7, right: 7, width: 7, height: 7, background: '#ef4444', borderRadius: '50%', border: '1.5px solid #111827' },
  userBtn:        { display: 'flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '7px 12px', cursor: 'pointer' },
  avatar:         { width: 30, height: 30, borderRadius: '50%', background: '#2563eb', color: '#fff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  userInfo:       { textAlign: 'left' },
  userName:       { color: '#fff', fontSize: 13, fontWeight: 600, lineHeight: 1.2 },
  userRole:       { color: '#6b7280', fontSize: 11, lineHeight: 1.2 },
  dropdown:       { position: 'absolute', right: 0, top: 'calc(100% + 6px)', width: 220, background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', boxShadow: '0 16px 48px rgba(0,0,0,0.16)', overflow: 'hidden', zIndex: 200 },
  dropHead:       { display: 'flex', alignItems: 'center', gap: 12, padding: '16px' },
  dropAvatar:     { width: 38, height: 38, borderRadius: '50%', background: '#2563eb', color: '#fff', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  dropName:       { fontSize: 14, fontWeight: 700, color: '#111827' },
  dropEmail:      { fontSize: 12, color: '#6b7280', marginTop: 2 },
  divider:        { height: 1, background: '#f3f4f6' },
  dropItem:       { display: 'block', width: '100%', padding: '11px 16px', background: 'none', border: 'none', textAlign: 'left', fontSize: 13, color: '#374151', fontWeight: 500, cursor: 'pointer' },
}
