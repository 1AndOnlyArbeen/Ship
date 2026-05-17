import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Companies from './components/Companies'
import Customers from './components/Customers'
import Licenses from './components/Licenses'
import Orders from './components/Orders'
import Shipments from './components/Shipments'
import Reports from './components/Reports'
import Settings from './components/Settings'
import './index.css'

const PAGES = {
  dashboard: Dashboard,
  companies: Companies,
  customers: Customers,
  licenses:  Licenses,
  orders:    Orders,
  shipments: Shipments,
  reports:   Reports,
  settings:  Settings,
}

function getPageFromHash() {
  const hash = window.location.hash.replace('#/', '').split('?')[0]
  return PAGES[hash] ? hash : 'dashboard'
}

export default function App() {
  const [page, setPage] = useState(getPageFromHash)

  const navigate = (p) => {
    setPage(p)
    window.history.pushState(null, '', '#/' + p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const handler = () => setPage(getPageFromHash())
    window.addEventListener('popstate', handler)
    window.addEventListener('hashchange', handler)
    return () => {
      window.removeEventListener('popstate', handler)
      window.removeEventListener('hashchange', handler)
    }
  }, [])

  const Page = PAGES[page]

  return (
    <div style={{ minHeight: '100vh', background: '#f1f4f8' }}>
      <Navbar active={page} navigate={navigate} />
      <main style={{ maxWidth: 1360, margin: '0 auto', padding: '40px 36px' }}>
        <Page navigate={navigate} />
      </main>
    </div>
  )
}
