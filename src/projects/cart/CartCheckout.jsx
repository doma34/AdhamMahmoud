import React, { useEffect, useMemo, useState } from 'react'
import { SHOP_ITEMS } from './mockItems.js'
import { calcSubtotal, loadCart, saveCart } from './cartStore.js'
import { formatEGP } from '../shared/utils.js'

function validateCheckout(v){
  const e = {}
  if (!v.fullName.trim()) e.fullName = 'Required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Invalid email'
  if (!/^[0-9]{10,15}$/.test(v.phone)) e.phone = 'Invalid phone'
  if (v.address.trim().length < 8) e.address = 'Address too short'
  return e
}

export default function CartCheckout() {
  const [cart, setCart] = useState(() => loadCart())
  const [coupon, setCoupon] = useState('')
  const [shipping, setShipping] = useState('standard')
  const [form, setForm] = useState({ fullName:'', email:'', phone:'', address:'' })
  const [touched, setTouched] = useState({})
  const [placed, setPlaced] = useState(false)

  useEffect(() => saveCart(cart), [cart])

  const subtotal = useMemo(() => calcSubtotal(cart), [cart])
  const discount = useMemo(() => {
    const c = coupon.trim().toUpperCase()
    if (c === 'NOON10') return Math.min(1200, subtotal * 0.10)
    if (c === 'FREESHIP') return 0
    return 0
  }, [coupon, subtotal])
  const shippingFee = shipping === 'express' ? 99 : 39
  const total = Math.max(0, subtotal - discount) + shippingFee

  function addItem(item){
    setCart(prev => {
      const exists = prev.find(x => x.id === item.id)
      if (exists) return prev.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x)
      return [...prev, { ...item, qty: 1 }]
    })
  }
  function inc(id){ setCart(prev => prev.map(x => x.id === id ? { ...x, qty: x.qty + 1 } : x)) }
  function dec(id){ setCart(prev => prev.flatMap(x => {
    if (x.id !== id) return [x]
    const next = x.qty - 1
    return next <= 0 ? [] : [{ ...x, qty: next }]
  })) }
  function remove(id){ setCart(prev => prev.filter(x => x.id !== id)) }
  function clear(){ setCart([]) }

  const errors = useMemo(() => validateCheckout(form), [form])
  const canPlace = cart.length > 0 && Object.keys(errors).length === 0

  function placeOrder(){
    setTouched({ fullName:true, email:true, phone:true, address:true })
    if (!canPlace) return
    setPlaced(true)
    clear()
  }

  return (
    <div className="grid">
      <div className="card span8">
        <p className="h1">Cart + Checkout</p>
        <p className="muted" style={{marginTop:6}}>LocalStorage cart, coupons, shipping, form validation.</p>

        {placed && (
          <div className="card" style={{marginTop:12}}>
            <p className="h1">Order placed ✅</p>
            <p className="muted" style={{marginTop:6}}>Mock order confirmation.</p>
          </div>
        )}

        <div className="hr" />
        <p className="h2">Add items</p>
        <div className="row">
          {SHOP_ITEMS.map(it => (
            <button key={it.id} className="btn ghost" onClick={() => addItem(it)}>
              + {it.title} ({formatEGP(it.price)})
            </button>
          ))}
        </div>

        <div className="hr" />
        <p className="h2">Cart items</p>
        {cart.length === 0 ? (
          <p className="muted">Cart is empty.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cart.map(it => (
                <tr key={it.id}>
                  <td>{it.title}<div className="muted" style={{fontSize:12}}>{it.category}</div></td>
                  <td>{formatEGP(it.price)}</td>
                  <td>
                    <div className="row" style={{gap:6}}>
                      <button className="btn ghost" onClick={() => dec(it.id)}>-</button>
                      <span>{it.qty}</span>
                      <button className="btn ghost" onClick={() => inc(it.id)}>+</button>
                    </div>
                  </td>
                  <td>{formatEGP(it.price * it.qty)}</td>
                  <td><button className="btn ghost" onClick={() => remove(it.id)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="row" style={{marginTop:12}}>
          <button className="btn ghost" onClick={clear} disabled={cart.length===0}>Clear cart</button>
        </div>
      </div>

      <div className="card span4">
        <p className="h1">Summary</p>

        <div className="row" style={{marginTop:10}}>
          <input className="input" value={coupon} onChange={(e)=>setCoupon(e.target.value)} placeholder="Coupon: NOON10 / FREESHIP" />
        </div>

        <div className="row" style={{marginTop:10}}>
          <select value={shipping} onChange={(e)=>setShipping(e.target.value)}>
            <option value="standard">Shipping: Standard (39)</option>
            <option value="express">Shipping: Express (99)</option>
          </select>
        </div>

        <div className="hr" />
        <p className="muted" style={{margin:0}}>Subtotal: {formatEGP(subtotal)}</p>
        <p className="muted" style={{margin:0}}>Discount: -{formatEGP(discount)}</p>
        <p className="muted" style={{margin:0}}>Shipping: {formatEGP(shippingFee)}</p>
        <div className="hr" />
        <p className="h1" style={{marginTop:0}}>Total: {formatEGP(total)}</p>

        <div className="hr" />
        <p className="h2">Checkout</p>

        <Field label="Full name" value={form.fullName} error={touched.fullName && errors.fullName}
          onBlur={()=>setTouched(t=>({...t,fullName:true}))}
          onChange={(v)=>setForm(f=>({...f,fullName:v}))}
        />
        <Field label="Email" value={form.email} error={touched.email && errors.email}
          onBlur={()=>setTouched(t=>({...t,email:true}))}
          onChange={(v)=>setForm(f=>({...f,email:v}))}
        />
        <Field label="Phone" value={form.phone} error={touched.phone && errors.phone}
          onBlur={()=>setTouched(t=>({...t,phone:true}))}
          onChange={(v)=>setForm(f=>({...f,phone:v}))}
        />
        <Field label="Address" value={form.address} error={touched.address && errors.address} multiline
          onBlur={()=>setTouched(t=>({...t,address:true}))}
          onChange={(v)=>setForm(f=>({...f,address:v}))}
        />

        <button className="btn" style={{width:'100%',marginTop:10}} onClick={placeOrder}>
          Place order
        </button>
        <p className="muted" style={{marginTop:10}}>Tip: Try coupon <code>NOON10</code>.</p>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, onBlur, error, multiline }){
  return (
    <div style={{marginTop:10}}>
      <div className="muted" style={{fontSize:12, marginBottom:6}}>{label}</div>
      {multiline ? (
        <textarea className="input" style={{width:'100%',minHeight:80}} value={value} onChange={(e)=>onChange(e.target.value)} onBlur={onBlur} />
      ) : (
        <input className="input" style={{width:'100%'}} value={value} onChange={(e)=>onChange(e.target.value)} onBlur={onBlur} />
      )}
      {error && <div style={{color:'#ff8a80',fontSize:12,marginTop:6}}>{error}</div>}
    </div>
  )
}
