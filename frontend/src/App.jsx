import { useState } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Companies from './components/Companies'
import Customers from './components/Customers'
import Licenses from './components/Licenses'
import Orders from './components/Orders'
import Settings from './components/Settings'
import './index.css'

const pages = {
  dashboard: Dashboard,
  companies: Companies,
  customers: Customers,
  licenses:  Licenses,
  orders:    Orders,
  settings:  Settings,
}

export default function App() {
  const [page, setPage] = useState('dashboard')
  const Page = pages[page]

  return (
    <div style={{ minHeight: '100vh', background: '#f1f4f8' }}>
      <Navbar active={page} setPage={setPage} />
      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 32px' }}>
        <Page setPage={setPage} />
      </main>
    </div>
  )
}
