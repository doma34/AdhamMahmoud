import React, { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CATEGORIES, PRODUCTS } from './data.js'
import { clamp, debounce, formatEGP } from '../shared/utils.js'

const PAGE_SIZE = 9

function SkeletonCard() {
  return (
    <div className="card span4" style={{opacity:.7}}>
      <div style={{height:14,width:'60%',background:'rgba(255,255,255,.08)',borderRadius:8}} />
      <div style={{height:12,width:'35%',background:'rgba(255,255,255,.06)',borderRadius:8,marginTop:10}} />
      <div style={{height:12,width:'80%',background:'rgba(255,255,255,.06)',borderRadius:8,marginTop:10}} />
    </div>
  )
}

export default function Catalog() {
  const [params, setParams] = useSearchParams()
  const [loading, setLoading] = useState(true)

  const [q, setQ] = useState(params.get('q') ?? '')
  const [category, setCategory] = useState(params.get('cat') ?? 'All')
  const [sort, setSort] = useState(params.get('sort') ?? 'relevance')
  const [minPrice, setMinPrice] = useState(Number(params.get('min') ?? 0))
  const [maxPrice, setMaxPrice] = useState(Number(params.get('max') ?? 9999))
  const [page, setPage] = useState(Number(params.get('page') ?? 1))

  // sync url
  useEffect(() => {
    const next = new URLSearchParams()
    if (q.trim()) next.set('q', q.trim())
    if (category !== 'All') next.set('cat', category)
    if (sort !== 'relevance') next.set('sort', sort)
    if (minPrice) next.set('min', String(minPrice))
    if (maxPrice !== 9999) next.set('max', String(maxPrice))
    if (page !== 1) next.set('page', String(page))
    setParams(next, { replace: true })
  }, [q, category, sort, minPrice, maxPrice, page, setParams])

  // fake loading
  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 450)
    return () => clearTimeout(t)
  }, [q, category, sort, minPrice, maxPrice, page])

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase()
    let list = PRODUCTS.filter(p => {
      const okQ = !qq || p.title.toLowerCase().includes(qq)
      const okC = category === 'All' || p.category === category
      const okP = p.price >= minPrice && p.price <= maxPrice
      return okQ && okC && okP
    })

    if (sort === 'price_asc') list = [...list].sort((a,b) => a.price - b.price)
    if (sort === 'price_desc') list = [...list].sort((a,b) => b.price - a.price)
    if (sort === 'rating_desc') list = [...list].sort((a,b) => b.rating - a.rating)

    return list
  }, [q, category, sort, minPrice, maxPrice])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = clamp(page, 1, totalPages)
  const slice = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  useEffect(() => {
    if (safePage !== page) setPage(safePage)
  }, [safePage, page])

  const onQChange = useMemo(() => debounce((v) => setQ(v), 300), [])
  const [qDraft, setQDraft] = useState(q)
  useEffect(() => setQDraft(q), []) // initial only

  return (
    <div className="grid">
      <div className="card span8">
        <p className="h1">Products Catalog</p>
        <p className="muted" style={{marginTop:6}}>Search, filters, sorting, pagination. Uses URL query params.</p>

        <div className="row" style={{marginTop:10}}>
          <input
            className="input"
            value={qDraft}
            onChange={(e) => { setQDraft(e.target.value); onQChange(e.target.value); setPage(1) }}
            placeholder="Search products..."
          />

          <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1) }}>
            <option>All</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="relevance">Sort: Relevance</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating_desc">Rating: High to Low</option>
          </select>
        </div>

        <div className="row" style={{marginTop:10}}>
          <input className="input" type="number" value={minPrice} onChange={(e) => { setMinPrice(Number(e.target.value || 0)); setPage(1) }} placeholder="Min price" />
          <input className="input" type="number" value={maxPrice} onChange={(e) => { setMaxPrice(Number(e.target.value || 9999)); setPage(1) }} placeholder="Max price" />
          <button className="btn ghost" onClick={() => { setQ(''); setQDraft(''); setCategory('All'); setSort('relevance'); setMinPrice(0); setMaxPrice(9999); setPage(1) }}>
            Reset
          </button>
          <span className="badge">{filtered.length} items</span>
        </div>
      </div>

      <div className="card span4">
        <p className="h1">Pagination</p>
        <p className="muted" style={{marginTop:6}}>Page {safePage} of {totalPages}</p>
        <div className="row" style={{marginTop:10}}>
          <button className="btn ghost" disabled={safePage === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
          <button className="btn ghost" disabled={safePage === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Next</button>
        </div>
        <div className="hr" />
        <p className="muted" style={{margin:0}}>Tip: open a product, then hit back. URL keeps your filters.</p>
      </div>

      {loading
        ? Array.from({length:9}).map((_,i) => <SkeletonCard key={i} />)
        : slice.map(p => (
          <Link key={p.id} to={`/catalog/${p.id}`} className="card span4">
            <p className="h1" style={{marginBottom:6}}>{p.title}</p>
            <div className="row">
              <span className="pill">{p.category}</span>
              <span className="pill yellow">★ {p.rating}</span>
            </div>
            <div className="hr" />
            <div className="kpi">
              <span className="num">{formatEGP(p.price)}</span>
              <span className="lbl">Price</span>
            </div>
            <p className="muted" style={{marginTop:8, marginBottom:0}}>Stock: {p.stock}</p>
          </Link>
        ))
      }
    </div>
  )
}
