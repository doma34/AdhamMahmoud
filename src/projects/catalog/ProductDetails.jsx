import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { PRODUCTS } from './data.js'
import { formatEGP } from '../shared/utils.js'

export default function ProductDetails() {
  const { id } = useParams()
  const p = PRODUCTS.find(x => x.id === id)

  if (!p) return <div className="card">Product not found.</div>

  return (
    <div className="grid">
      <div className="card span8">
        <p className="h1">{p.title}</p>
        <p className="muted" style={{marginTop:6}}>{p.description}</p>
        <div className="row" style={{marginTop:10}}>
          <span className="pill">{p.category}</span>
          <span className="pill yellow">★ {p.rating}</span>
          <span className="pill">Stock {p.stock}</span>
        </div>
        <div className="hr" />
        <p className="h1">{formatEGP(p.price)}</p>
        <p className="muted">This is a mock product detail page for routing demo.</p>
        <Link to="/cart" className="btn" style={{display:'inline-block'}}>Go to Cart Project</Link>
      </div>
      <div className="card span4">
        <p className="h1">Notes</p>
        <ul className="muted">
          <li>Uses dynamic route <code>/catalog/:id</code>.</li>
          <li>Back button preserves filters using query params.</li>
        </ul>
        <Link to="/catalog" className="btn ghost" style={{display:'inline-block'}}>Back to catalog</Link>
      </div>
    </div>
  )
}
