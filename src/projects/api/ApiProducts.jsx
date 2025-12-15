import React, { useEffect, useMemo, useState } from 'react'
import { formatEGP } from '../shared/utils.js'

const FAV_KEY = 'noon_favs_v1'

function loadFavs(){
  try{ return JSON.parse(localStorage.getItem(FAV_KEY) || '[]') }catch{ return [] }
}
function saveFavs(ids){
  localStorage.setItem(FAV_KEY, JSON.stringify(ids))
}

export default function ApiProducts() {
  const [status, setStatus] = useState('idle') // idle | loading | error | done
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [q, setQ] = useState('')
  const [favs, setFavs] = useState(() => loadFavs())

  useEffect(() => saveFavs(favs), [favs])

  async function load(){
    setStatus('loading')
    setError('')
    try{
      const res = await fetch('https://dummyjson.com/products?limit=30')
      if (!res.ok) throw new Error('HTTP ' + res.status)
      const data = await res.json()
      const mapped = (data.products ?? []).map(p => ({
        id: String(p.id),
        title: p.title,
        brand: p.brand,
        price: Math.round((p.price ?? 0) * 50), // convert to EGP-ish
        rating: p.rating,
        category: p.category,
      }))
      setItems(mapped)
      setStatus('done')
    }catch(err){
      setError(String(err?.message || err))
      setStatus('error')
    }
  }

  useEffect(() => { load() }, [])

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase()
    return items.filter(p => !qq || p.title.toLowerCase().includes(qq) || (p.brand || '').toLowerCase().includes(qq))
  }, [items, q])

  function toggleFav(id){
    setFavs(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id])
  }

  return (
    <div className="grid">
      <div className="card span8">
        <p className="h1">API Products</p>
        <p className="muted" style={{marginTop:6}}>Fetch from DummyJSON. Retry. Favorites in LocalStorage.</p>

        <div className="row" style={{marginTop:10}}>
          <input className="input" value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search title or brand..." />
          <button className="btn ghost" onClick={load} disabled={status==='loading'}>Retry</button>
          <span className="badge">Favs: {favs.length}</span>
        </div>

        <div className="hr" />

        {status === 'loading' && <p className="muted">Loading…</p>}
        {status === 'error' && (
          <div>
            <p style={{color:'#ff8a80',marginTop:0}}>Error: {error}</p>
            <button className="btn" onClick={load}>Retry</button>
          </div>
        )}
        {status === 'done' && filtered.length === 0 && <p className="muted">No results.</p>}

        {status === 'done' && filtered.slice(0, 18).map(p => (
          <div key={p.id} className="card" style={{marginTop:10}}>
            <div className="row" style={{justifyContent:'space-between'}}>
              <div>
                <p className="h1" style={{marginBottom:6}}>{p.title}</p>
                <p className="muted" style={{margin:0}}>{p.brand} • {p.category} • ★ {p.rating}</p>
              </div>
              <div style={{textAlign:'right'}}>
                <p className="h1" style={{marginBottom:6}}>{formatEGP(p.price)}</p>
                <button className="btn ghost" onClick={()=>toggleFav(p.id)}>
                  {favs.includes(p.id) ? 'Unfavorite' : 'Favorite'}
                </button>
              </div>
            </div>
          </div>
        ))}
        {status === 'done' && <p className="muted" style={{marginTop:10}}>Showing first 18 cards.</p>}
      </div>

      <div className="card span4">
        <p className="h1">Why this matters</p>
        <ul className="muted">
          <li>Real network fetch.</li>
          <li>Handles loading and error states.</li>
          <li>LocalStorage persistence.</li>
          <li>Search + basic UX.</li>
        </ul>
        <div className="hr" />
        <p className="muted">If DummyJSON is blocked on your network, this page will show error. That is still valid behavior. Use VPN or swap endpoint.</p>
      </div>
    </div>
  )
}
