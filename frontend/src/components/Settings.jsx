import { useState } from 'react'

function Toggle({ value, onChange, label, sub }) {
  return (
    <div style={s.toggleRow}>
      <div>
        <div style={s.toggleLabel}>{label}</div>
        {sub && <div style={s.toggleSub}>{sub}</div>}
      </div>
      <button
        style={{ ...s.toggleBtn, ...(value ? s.toggleOn : s.toggleOff) }}
        onClick={() => onChange(!value)}
        title={value ? 'Turn off' : 'Turn on'}
      >
        <div style={{ ...s.toggleThumb, ...(value ? s.thumbOn : {}) }} />
      </button>
    </div>
  )
}

function Section({ title, sub, children }) {
  return (
    <div style={s.section}>
      <div style={s.sectionHead}>
        <h3 style={s.sectionTitle}>{title}</h3>
        {sub && <p style={s.sectionSub}>{sub}</p>}
      </div>
      <div style={s.sectionBody}>{children}</div>
    </div>
  )
}

export default function Settings() {
  const [form, setForm] = useState({
    name: 'Admin User', email: 'admin@shipos.co.il',
    phone: '+972 50 123 4567', company: 'Shipos Ltd.',
    locale: 'he', timezone: 'Asia/Jerusalem',
  })
  const [notifs, setNotifs] = useState({
    orderCreated: true, shipmentUpdate: true,
    deliveryConfirm: true, weeklyReport: false, sms: false,
  })
  const [saved, setSaved] = useState(false)
  const [tab, setTab] = useState('profile')

  const save = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const setN = (k, v) => setNotifs(n => ({ ...n, [k]: v }))

  const tabs = ['profile', 'notifications', 'security']

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h1 style={s.title}>Settings ⚙️</h1>
          <p style={s.subtitle}>Manage your account and preferences.</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={s.tabs}>
        {tabs.map(t => (
          <button
            key={t}
            style={{ ...s.tabBtn, ...(tab === t ? s.tabActive : {}) }}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'profile' && (
        <div>
          {/* Avatar */}
          <div style={s.avatarCard}>
            <div style={s.avatarCircle}>👤</div>
            <div>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>{form.name}</div>
              <div style={{ color: '#64748b', fontSize: 13, marginBottom: 12 }}>{form.email}</div>
              <button style={s.uploadBtn}>Change photo</button>
            </div>
          </div>

          <Section title="Personal Information" sub="Update your name, email and contact details.">
            <div style={s.formGrid}>
              <div style={s.field}>
                <label style={s.label}>Full Name</label>
                <input style={s.input} value={form.name} onChange={e => set('name', e.target.value)} />
              </div>
              <div style={s.field}>
                <label style={s.label}>Email Address</label>
                <input style={s.input} type="email" value={form.email} onChange={e => set('email', e.target.value)} />
              </div>
              <div style={s.field}>
                <label style={s.label}>Phone Number</label>
                <input style={s.input} value={form.phone} onChange={e => set('phone', e.target.value)} />
              </div>
              <div style={s.field}>
                <label style={s.label}>Company</label>
                <input style={s.input} value={form.company} onChange={e => set('company', e.target.value)} />
              </div>
            </div>
          </Section>

          <Section title="Preferences">
            <div style={s.formGrid}>
              <div style={s.field}>
                <label style={s.label}>Language</label>
                <select style={s.input} value={form.locale} onChange={e => set('locale', e.target.value)}>
                  <option value="he">Hebrew (עברית)</option>
                  <option value="en">English</option>
                  <option value="ar">Arabic (عربي)</option>
                </select>
              </div>
              <div style={s.field}>
                <label style={s.label}>Timezone</label>
                <select style={s.input} value={form.timezone} onChange={e => set('timezone', e.target.value)}>
                  <option value="Asia/Jerusalem">Asia/Jerusalem (GMT+3)</option>
                  <option value="Europe/London">Europe/London (GMT+1)</option>
                  <option value="America/New_York">America/New_York (GMT-4)</option>
                </select>
              </div>
            </div>
          </Section>
        </div>
      )}

      {tab === 'notifications' && (
        <Section title="Notification Preferences" sub="Choose when and how you want to be notified.">
          <Toggle value={notifs.orderCreated}    onChange={v => setN('orderCreated', v)}    label="New Order"           sub="Get notified when a new order is placed" />
          <Toggle value={notifs.shipmentUpdate}  onChange={v => setN('shipmentUpdate', v)}  label="Shipment Updates"    sub="Status changes for active shipments" />
          <Toggle value={notifs.deliveryConfirm} onChange={v => setN('deliveryConfirm', v)} label="Delivery Confirmed"  sub="Alert when a package is successfully delivered" />
          <Toggle value={notifs.weeklyReport}    onChange={v => setN('weeklyReport', v)}    label="Weekly Summary"      sub="Receive a weekly performance report by email" />
          <Toggle value={notifs.sms}             onChange={v => setN('sms', v)}             label="SMS Alerts"          sub="Get critical alerts via SMS" />
        </Section>
      )}

      {tab === 'security' && (
        <Section title="Security" sub="Manage your password and session settings.">
          <div style={s.field}>
            <label style={s.label}>Current Password</label>
            <input style={s.input} type="password" placeholder="••••••••" />
          </div>
          <div style={s.formGrid}>
            <div style={s.field}>
              <label style={s.label}>New Password</label>
              <input style={s.input} type="password" placeholder="••••••••" />
            </div>
            <div style={s.field}>
              <label style={s.label}>Confirm New Password</label>
              <input style={s.input} type="password" placeholder="••••••••" />
            </div>
          </div>
          <div style={{ ...s.infoBox, marginTop: 8 }}>
            🔒 Use at least 8 characters with a mix of letters and numbers.
          </div>
        </Section>
      )}

      {/* Save bar */}
      <div style={s.saveBar}>
        {saved && <span style={s.savedMsg}>✅ Changes saved successfully</span>}
        <button style={s.saveBtn} onClick={save}>
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

const s = {
  page:     { padding: '40px 48px', maxWidth: 760 },
  header:   { marginBottom: 28 },
  title:    { fontSize: 26, fontWeight: 800, color: '#0f172a', marginBottom: 4 },
  subtitle: { color: '#64748b', fontSize: 14 },

  tabs: { display: 'flex', gap: 4, marginBottom: 28, borderBottom: '1px solid #f1f5f9', paddingBottom: 0 },
  tabBtn: {
    padding: '9px 18px', background: 'none', border: 'none',
    fontSize: 14, fontWeight: 500, color: '#64748b', cursor: 'pointer',
    borderBottom: '2px solid transparent', marginBottom: -1, transition: 'all 0.12s',
  },
  tabActive: { color: '#2563eb', borderBottomColor: '#2563eb', fontWeight: 700 },

  avatarCard: {
    display: 'flex', alignItems: 'center', gap: 20,
    background: '#fff', borderRadius: 16, padding: '20px 24px',
    border: '1px solid #f1f5f9', marginBottom: 20,
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  avatarCircle: {
    width: 64, height: 64, borderRadius: '50%',
    background: '#eff6ff', fontSize: 28,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: '3px solid #bfdbfe', flexShrink: 0,
  },
  uploadBtn: {
    padding: '6px 14px', background: '#f1f5f9', border: '1px solid #e2e8f0',
    borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#334155', cursor: 'pointer',
  },

  section:     { background: '#fff', borderRadius: 16, border: '1px solid #f1f5f9', overflow: 'hidden', marginBottom: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  sectionHead: { padding: '18px 24px', borderBottom: '1px solid #f8fafc' },
  sectionTitle:{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 2 },
  sectionSub:  { fontSize: 13, color: '#64748b' },
  sectionBody: { padding: '20px 24px' },

  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  field:    { display: 'flex', flexDirection: 'column', gap: 6 },
  label:    { fontSize: 12, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' },
  input: {
    padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 10,
    fontSize: 14, color: '#0f172a', outline: 'none',
    transition: 'border-color 0.15s', background: '#fff',
  },

  toggleRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 0', borderBottom: '1px solid #f8fafc',
  },
  toggleLabel: { fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 2 },
  toggleSub:   { fontSize: 12, color: '#94a3b8' },
  toggleBtn: {
    width: 44, height: 24, borderRadius: 12, border: 'none',
    cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0,
  },
  toggleOn:  { background: '#2563eb' },
  toggleOff: { background: '#e2e8f0' },
  toggleThumb: {
    position: 'absolute', top: 2, left: 2,
    width: 20, height: 20, borderRadius: '50%',
    background: '#fff', transition: 'left 0.2s',
    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
  },
  thumbOn: { left: 22 },

  infoBox: {
    fontSize: 13, color: '#64748b', background: '#f8fafc',
    padding: '12px 16px', borderRadius: 10, border: '1px solid #f1f5f9',
  },

  saveBar: {
    display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
    gap: 16, paddingTop: 8,
  },
  savedMsg: { fontSize: 14, color: '#059669', fontWeight: 600 },
  saveBtn: {
    padding: '11px 28px', background: '#2563eb', color: '#fff',
    border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700,
    cursor: 'pointer', transition: 'background 0.15s',
  },
}
