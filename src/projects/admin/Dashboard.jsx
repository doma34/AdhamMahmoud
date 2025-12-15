import React, { useMemo, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { ORDERS, STATUSES } from './mock.js'
import { formatEGP } from '../shared/utils.js'

function statusPill(status){
  if (status === 'Delivered') return 'pill green'
  if (status === 'Shipped') return 'pill yellow'
  if (status === 'Cancelled') return 'pill red'
  return 'pill'
}

export default function Dashboard() {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('All')

  const list = useMemo(() => {
    const qq = q.trim().toLowerCase()
    return ORDERS.filter(o => {
      const okQ = !qq || o.id.toLowerCase().includes(qq) || o.customer.toLowerCase().includes(qq)
      const okS = status === 'All' || o.status === status
      return okQ && okS
    })
  }, [q, status])

  const kpis = useMemo(() => {
    const total = list.reduce((s,o)=>s+o.amount,0)
    const delivered = list.filter(o=>o.status==='Delivered').length
    const cancelled = list.filter(o=>o.status==='Cancelled').length
    return { total, delivered, cancelled, count: list.length }
  }, [list])

  const chartData = useMemo(() => {
    const map = new Map()
    for (const s of STATUSES) map.set(s, 0)
    for (const o of list) map.set(o.status, (map.get(o.status) ?? 0) + 1)
    return Array.from(map, ([name, value]) => ({ name, value }))
  }, [list])

  return (
    <div className="grid">
      <div className="card span8">
        <p className="h1">Admin Dashboard</p>
        <p className="muted" style={{marginTop:6}}>Orders table, filters, and a status chart.</p>

        <div className="row" style={{marginTop:10}}>
          <input className="input" value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search by order id or customer..." />
          <select value={status} onChange={(e)=>setStatus(e.target.value)}>
            <option>All</option>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <span className="badge">{list.length} results</span>
        </div>

        <div className="hr" />
        <table className="table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {list.slice(0, 14).map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.customer}</td>
                <td><span className={statusPill(o.status)}>{o.status}</span></td>
                <td className="muted">{o.date}</td>
                <td>{formatEGP(o.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="muted" style={{marginTop:10}}>Showing first 14 rows to keep UI fast.</p>
      </div>

      <div className="card span4">
        <p className="h1">KPIs</p>
        <div className="hr" />
        <div className="kpi"><span className="num">{kpis.count}</span><span className="lbl">Orders</span></div>
        <div className="kpi"><span className="num">{kpis.delivered}</span><span className="lbl">Delivered</span></div>
        <div className="kpi"><span className="num">{kpis.cancelled}</span><span className="lbl">Cancelled</span></div>
        <div className="kpi"><span className="num">{formatEGP(kpis.total)}</span><span className="lbl">Revenue</span></div>

        <div className="hr" />
        <p className="h2">Orders by status</p>
        <div style={{width:'100%',height:220}}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fill: '#93a4c7', fontSize: 11 }} />
              <YAxis tick={{ fill: '#93a4c7', fontSize: 11 }} />
              <Tooltip contentStyle={{ background:'#0f1a31', border:'1px solid rgba(255,255,255,.12)', color:'#eaf0ff' }} />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
