import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Catalog from './projects/catalog/Catalog.jsx'
import ProductDetails from './projects/catalog/ProductDetails.jsx'
import CartCheckout from './projects/cart/CartCheckout.jsx'
import Dashboard from './projects/admin/Dashboard.jsx'
import AuthApp from './projects/auth/AuthApp.jsx'
import ApiProducts from './projects/api/ApiProducts.jsx'
import UiClone from './projects/uiclone/UiClone.jsx'

function TopNav() {
  const items = [
    ['/', 'Home'],
    ['/catalog', 'Catalog'],
    ['/cart', 'Cart'],
    ['/admin', 'Admin'],
    ['/auth', 'Auth'],
    ['/api', 'API'],
    ['/uiclone', 'UI Clone'],
  ]
  return (
    <div className="nav">
      {items.map(([to, label]) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => (isActive ? 'active' : '')}
          end={to === '/'}
        >
          {label}
        </NavLink>
      ))}
    </div>
  )
}

export default function App() {
  return (
    <div className="container">
      <div className="header">
        <div className="brand">
          <div style={{width:34,height:34,borderRadius:12,border:'1px solid rgba(255,183,3,.45)',display:'grid',placeItems:'center',background:'rgba(255,183,3,.12)'}}>N</div>
          <div>
            <p className="h1">Noon Internship Portfolio</p>
            <span className="badge">6 mini-projects in 1 repo</span>
          </div>
        </div>
        <span className="badge">React + Router + Recharts</span>
      </div>

      <TopNav />

      <div className="hr" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartCheckout />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/auth/*" element={<AuthApp />} />
        <Route path="/api" element={<ApiProducts />} />
        <Route path="/uiclone" element={<UiClone />} />
        <Route path="*" element={<div className="card">Not found</div>} />
      </Routes>
    </div>
  )
}
