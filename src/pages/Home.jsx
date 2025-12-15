import React from 'react'
import { Link } from 'react-router-dom'

const cards = [
  { to: '/catalog', title: 'Project 1: Products Catalog', desc: 'Search + filters + sorting + pagination + skeletons.' },
  { to: '/cart', title: 'Project 2: Cart + Checkout', desc: 'Cart logic + coupons + shipping + form validation.' },
  { to: '/admin', title: 'Project 3: Admin Dashboard', desc: 'Orders table + filters + charts + dark-ish UI.' },
  { to: '/auth', title: 'Project 4: Auth + Protected Routes', desc: 'Login/register + token mock + guards.' },
  { to: '/api', title: 'Project 5: API Products', desc: 'Fetch, retry, empty/error/loading + favorites.' },
  { to: '/uiclone', title: 'Project 6: Noon Home UI Clone', desc: 'Responsive layout + sections + basic slider.' },
]

export default function Home() {
  return (
    <div className="grid">
      {cards.map(c => (
        <Link key={c.to} to={c.to} className="card span6">
          <p className="h1" style={{marginBottom:6}}>{c.title}</p>
          <p className="muted" style={{margin:0}}>{c.desc}</p>
        </Link>
      ))}
      <div className="card">
        <p className="h1" style={{marginBottom:6}}>How to split into 6 repos later</p>
        <ol className="muted" style={{marginTop:0}}>
          <li>Copy folder: <code>src/projects/catalog</code> into its own Vite project.</li>
          <li>Copy shared utilities you want.</li>
          <li>Keep README per repo and pin best 3.</li>
        </ol>
      </div>
    </div>
  )
}
