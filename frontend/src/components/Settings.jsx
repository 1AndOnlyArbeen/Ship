import { useState } from 'react'
import { PageHeader } from './Dashboard'

const TABS = [
  { id: 'account',       label: 'Account'       },
  { id: 'notifications', label: 'Notifications' },
  { id: 'security',      label: 'Security'       },
  { id: 'appearance',    label: 'Appearance'     },
]

function Field({ label, hint, children }) {
  return (
    <div style={s.field}>
      <label style={s.label}>{label}</label>
      {children}
      {hint && <div style={s.hint}>{hint}</div>}
    </div>
  )
}

function Input({ value, onChange, type = 'text', placeholder, disabled }) {
  return (
    <input
      style={{ ...s.input, ...(disabled ? { background: '#fafafa', color: '#aaa' } : {}) }}
      type={type} value={value} onChange={onChange}
      placeholder={placeholder} disabled={disabled}
    />
  )
}

function Toggle({ on, onChange, label, sub }) {
  return (
    <div style={s.toggleRow}>
      <div style={{ flex: 1 }}>
        <div style={s.toggleLabel}>{label}</div>
        {sub && <div style={s.toggleSub}>{sub}</div>}
      </div>
      <button className="toggle-track" onClick={() => onChange(!on)}
        style={{ ...s.track, background: on ? '#2563eb' : '#d1d5db' }}>
        <div className="toggle-thumb" style={{ ...s.thumb, transform: on ? 'translateX(20px)' : 'translateX(2px)' }} />
      </button>
    </div>
  )
}

export default function Settings() {
  const [tab,   setTab]   = useState('account')
  const [saved, setSaved] = useState(false)
  const [form,  setForm]  = useState({
    name: 'Amit Matat', email: 'amit@matat.co.il',
    phone: '+972 50 000 0000', company: 'Matat Ltd.',
    role: 'Super Admin', lang: 'Hebrew (עברית)', tz: 'Asia/Jerusalem (GMT+3)',
  })
  const [notifs, setNotifs] = useState({
    newCustomer: true, licenseExpiry: true, systemAlert: true,
    weeklyReport: false, dailyDigest: true, apiErrors: true,
  })
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' })

  const set  = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const setN = k => v => setNotifs(n => ({ ...n, [k]: v }))
  const setP = k => e => setPasswords(p => ({ ...p, [k]: e.target.value }))

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 3000) }

  return (
    <div style={{ maxWidth: 820 }}>
      <PageHeader title="Settings" sub="Manage your admin account, preferences, and security." />

      <div style={s.tabs}>
        {TABS.map(t => (
          <button key={t.id} className="tab-btn"
            style={{ ...s.tabBtn, ...(tab === t.id ? s.tabActive : {}) }}
            onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'account' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={s.section}>
            <div style={s.sHead}>
              <div style={s.sTitle}>Profile</div>
              <div style={s.sSub}>Your personal and contact information</div>
            </div>
            <div style={s.sBody}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 24 }}>
                <div style={s.profileAvatar}>A</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 3 }}>Amit Matat</div>
                  <div style={{ fontSize: 13, color: '#888', marginBottom: 10 }}>amit@matat.co.il · Super Admin</div>
                  <button className="btn-ghost" style={s.smallBtn}>Change Photo</button>
                </div>
              </div>
              <div style={s.grid2}>
                <Field label="Full Name"><Input value={form.name} onChange={set('name')} /></Field>
                <Field label="Email Address"><Input type="email" value={form.email} onChange={set('email')} /></Field>
                <Field label="Phone"><Input value={form.phone} onChange={set('phone')} /></Field>
                <Field label="Company"><Input value={form.company} onChange={set('company')} /></Field>
              </div>
            </div>
          </div>

          <div style={s.section}>
            <div style={s.sHead}>
              <div style={s.sTitle}>Preferences</div>
              <div style={s.sSub}>Language and regional settings</div>
            </div>
            <div style={s.sBody}>
              <div style={s.grid2}>
                <Field label="Language">
                  <select style={s.input} value={form.lang} onChange={set('lang')}>
                    <option>Hebrew (עברית)</option>
                    <option>English</option>
                  </select>
                </Field>
                <Field label="Timezone">
                  <select style={s.input} value={form.tz} onChange={set('tz')}>
                    <option>Asia/Jerusalem (GMT+3)</option>
                    <option>Europe/London (GMT+1)</option>
                    <option>America/New_York (GMT-5)</option>
                  </select>
                </Field>
              </div>
            </div>
          </div>

          <div style={s.section}>
            <div style={s.sHead}>
              <div style={s.sTitle}>Account Role</div>
              <div style={s.sSub}>Your access level on this platform</div>
            </div>
            <div style={s.sBody}>
              <Field label="Role" hint="Contact a super admin to change your role.">
                <Input value={form.role} disabled />
              </Field>
            </div>
          </div>
        </div>
      )}

      {tab === 'notifications' && (
        <div style={s.section}>
          <div style={s.sHead}>
            <div style={s.sTitle}>Notification Preferences</div>
            <div style={s.sSub}>Choose which events send you email notifications</div>
          </div>
          <div style={s.sBody}>
            <Toggle on={notifs.newCustomer}   onChange={setN('newCustomer')}   label="New customer registered"   sub="Email when a new customer signs up" />
            <Toggle on={notifs.licenseExpiry} onChange={setN('licenseExpiry')} label="License expiring soon"     sub="Alert 7 days before any license expires" />
            <Toggle on={notifs.systemAlert}   onChange={setN('systemAlert')}   label="System alerts"             sub="Critical platform errors and infrastructure notifications" />
            <Toggle on={notifs.weeklyReport}  onChange={setN('weeklyReport')}  label="Weekly summary report"     sub="Email every Monday with platform usage overview" />
            <Toggle on={notifs.dailyDigest}   onChange={setN('dailyDigest')}   label="Daily orders digest"       sub="Daily email with previous day's order counts and revenue" />
            <Toggle on={notifs.apiErrors}     onChange={setN('apiErrors')}     label="API and webhook errors"    sub="Alert when WooCommerce, Wix, or Shopify sync fails" />
          </div>
        </div>
      )}

      {tab === 'security' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={s.section}>
            <div style={s.sHead}>
              <div style={s.sTitle}>Change Password</div>
              <div style={s.sSub}>Use a strong password of at least 8 characters</div>
            </div>
            <div style={s.sBody}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
                <Field label="Current Password"><Input type="password" value={passwords.current} onChange={setP('current')} placeholder="Enter current password" /></Field>
                <Field label="New Password"><Input type="password" value={passwords.newPass} onChange={setP('newPass')} placeholder="Enter new password" /></Field>
                <Field label="Confirm New Password"><Input type="password" value={passwords.confirm} onChange={setP('confirm')} placeholder="Repeat new password" /></Field>
              </div>
            </div>
          </div>

          <div style={s.section}>
            <div style={s.sHead}>
              <div style={s.sTitle}>Active Sessions</div>
              <div style={s.sSub}>Manage where you are signed in</div>
            </div>
            <div style={s.sBody}>
              {[
                { device: 'Chrome on macOS',  ip: '82.80.xx.xx', location: 'Tel Aviv, IL', active: true  },
                { device: 'Safari on iPhone', ip: '82.80.xx.xx', location: 'Tel Aviv, IL', active: false },
              ].map((sess, i) => (
                <div key={i} style={s.sessRow}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#111', fontSize: 14 }}>
                      {sess.device}
                      {sess.active && <span style={s.activeTag}>Current</span>}
                    </div>
                    <div style={{ fontSize: 12, color: '#aaa', marginTop: 3 }}>{sess.ip} · {sess.location}</div>
                  </div>
                  {!sess.active && (
                    <button className="btn-danger" style={{ ...s.smallBtn, color: '#dc2626', borderColor: '#fca5a5', fontWeight: 700 }}>
                      Revoke
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'appearance' && (
        <div style={s.section}>
          <div style={s.sHead}>
            <div style={s.sTitle}>Appearance</div>
            <div style={s.sSub}>Visual preferences for the admin panel</div>
          </div>
          <div style={s.sBody}>
            <Field label="Color Theme">
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                {['Navy Blue', 'Mid Blue', 'Deep Blue'].map((theme, i) => (
                  <button key={theme} className="btn-ghost"
                    style={{ ...s.themeBtn, ...(i === 0 ? s.themeBtnActive : {}) }}>
                    <div style={{ width: 18, height: 18, borderRadius: 4, background: ['#1e3a8a','#2563eb','#1d4ed8'][i], marginBottom: 5 }} />
                    {theme}
                  </button>
                ))}
              </div>
            </Field>
            <div style={{ marginTop: 18 }}>
              <Toggle on={true}  onChange={() => {}} label="Compact table rows"        sub="Show more data with reduced row height" />
              <Toggle on={false} onChange={() => {}} label="Show revenue in dashboard" sub="Display financial metrics on the main dashboard" />
            </div>
          </div>
        </div>
      )}

      <div style={s.saveBar}>
        {saved && (
          <div style={s.savedMsg}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            Changes saved.
          </div>
        )}
        <div style={{ display: 'flex', gap: 10, marginLeft: 'auto' }}>
          <button className="btn-ghost" style={s.cancelBtn}>Cancel</button>
          <button className="btn-primary" style={s.saveBtn} onClick={save}>Save Changes</button>
        </div>
      </div>
    </div>
  )
}

const s = {
  tabs:          { display: 'flex', gap: 0, borderBottom: '1px solid #e5e7eb', marginBottom: 20 },
  tabBtn:        { padding: '9px 16px', background: 'none', border: 'none', fontSize: 13, fontWeight: 500, color: '#888', cursor: 'pointer', borderBottom: '2px solid transparent', marginBottom: -1 },
  tabActive:     { color: '#111', fontWeight: 700, borderBottomColor: '#111' },
  section:       { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' },
  sHead:         { padding: '16px 22px', borderBottom: '1px solid #f3f4f6' },
  sTitle:        { fontSize: 14, fontWeight: 700, color: '#111' },
  sSub:          { fontSize: 12, color: '#aaa', marginTop: 2 },
  sBody:         { padding: '22px' },
  profileAvatar: { width: 56, height: 56, borderRadius: '50%', background: '#2563eb', color: '#fff', fontSize: 20, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  grid2:         { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 },
  field:         { display: 'flex', flexDirection: 'column', gap: 6 },
  label:         { fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em' },
  hint:          { fontSize: 12, color: '#aaa', marginTop: 2 },
  input:         { padding: '9px 13px', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 14, color: '#111', outline: 'none', background: '#fff', width: '100%' },
  smallBtn:      { padding: '5px 12px', border: '1px solid #e5e7eb', background: '#fff', borderRadius: 5, fontSize: 13, fontWeight: 500, color: '#333', cursor: 'pointer' },
  toggleRow:     { display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: '1px solid #f9fafb' },
  toggleLabel:   { fontSize: 14, fontWeight: 600, color: '#111' },
  toggleSub:     { fontSize: 12, color: '#aaa', marginTop: 2 },
  track:         { width: 42, height: 22, borderRadius: 11, border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0 },
  thumb:         { position: 'absolute', top: 2, width: 18, height: 18, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' },
  sessRow:       { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: '1px solid #f9fafb' },
  activeTag:     { display: 'inline-block', marginLeft: 8, fontSize: 11, fontWeight: 600, color: '#555', background: '#f3f4f6', padding: '2px 7px', borderRadius: 3 },
  themeBtn:      { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: 6, background: '#fff', cursor: 'pointer', fontSize: 12, color: '#333', fontWeight: 500 },
  themeBtnActive:{ border: '2px solid #111', color: '#111', fontWeight: 700 },
  saveBar:       { display: 'flex', alignItems: 'center', marginTop: 24, paddingTop: 18, borderTop: '1px solid #e5e7eb' },
  savedMsg:      { display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: '#333', fontWeight: 600 },
  cancelBtn:     { padding: '9px 18px', border: '1px solid #e5e7eb', background: '#fff', borderRadius: 6, fontSize: 13, fontWeight: 600, color: '#333', cursor: 'pointer' },
  saveBtn:       { padding: '9px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: 'pointer' },
}
