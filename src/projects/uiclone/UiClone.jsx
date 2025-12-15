import React, { useEffect, useState } from 'react'

const slides = [
  { title: 'Flash Deals', desc: 'Hot prices, limited time.' },
  { title: 'Mega Friday', desc: 'Weekly discounts vibe.' },
  { title: 'Top Electronics', desc: 'Phones, laptops, gaming.' },
]

const categories = ['Electronics','Fashion','Home','Beauty','Grocery','Toys','Sports','Automotive']

function Slide({ s }){
  return (
    <div className="card" style={{minHeight:160}}>
      <p className="h1">{s.title}</p>
      <p className="muted" style={{marginTop:6}}>{s.desc}</p>
      <div className="row" style={{marginTop:14}}>
        <button className="btn">Shop now</button>
        <button className="btn ghost">View offers</button>
      </div>
    </div>
  )
}

export default function UiClone(){
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % slides.length), 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="grid">
      <div className="card span12">
        <div className="row" style={{justifyContent:'space-between'}}>
          <div>
            <p className="h1">Noon-ish Home UI (Clone)</p>
            <p className="muted" style={{marginTop:6}}>Responsive sections, basic slider, clean layout.</p>
          </div>
          <div className="row">
            <input className="input" placeholder="Search..." />
            <button className="btn">Search</button>
          </div>
        </div>
      </div>

      <div className="card span8">
        <Slide s={slides[i]} />
        <div className="row" style={{marginTop:10}}>
          {slides.map((_, idx) => (
            <button key={idx} className={idx===i ? 'btn' : 'btn ghost'} onClick={()=>setI(idx)}>
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="card span4">
        <p className="h1">Categories</p>
        <div className="hr" />
        <div className="row">
          {categories.map(c => <span key={c} className="pill">{c}</span>)}
        </div>
      </div>

      <div className="card span12">
        <p className="h1">Recommended for you</p>
        <p className="muted" style={{marginTop:6}}>Cards section. Replace with real data later.</p>
        <div className="grid" style={{marginTop:10}}>
          {Array.from({length:6}).map((_,k)=>(
            <div key={k} className="card span4">
              <p className="h1" style={{marginBottom:6}}>Deal #{k+1}</p>
              <p className="muted" style={{margin:0}}>Short description. Clean CTA.</p>
              <div className="hr" />
              <button className="btn">Add to cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
