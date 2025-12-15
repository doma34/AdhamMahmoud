import React from 'react'
import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { clearToken, getToken, isAuthed, setToken } from './authStore.js'

function Layout({ children }){
  return (
    <div className="grid">
      <div className="card span8">{children}</div>
      <div className="card span4">
        <p className="h1">Auth Links</p>
        <div className="row" style={{marginTop:10}}>
          <NavLink to="/auth/login" className="btn ghost">Login</NavLink>
          <NavLink to="/auth/register" className="btn ghost">Register</NavLink>
          <NavLink to="/auth/profile" className="btn ghost">Profile</NavLink>
        </div>
        <div className="hr" />
        <p className="muted">Token: {getToken() ? '✅ exists' : '❌ none'}</p>
        <button className="btn ghost" onClick={() => { clearToken(); window.location.reload() }}>Logout</button>
      </div>
    </div>
  )
}

function Guard({ children }){
  const loc = useLocation()
  if (!isAuthed()) return <Navigate to="/auth/login" replace state={{ from: loc.pathname }} />
  return children
}

function Login(){
  const loc = useLocation()
  const from = loc.state?.from ?? '/auth/profile'
  function onSubmit(e){
    e.preventDefault()
    // mock token
    setToken('mock-token-' + Date.now())
    window.location.href = from
  }
  return (
    <>
      <p className="h1">Login</p>
      <p className="muted" style={{marginTop:6}}>Mock auth. Click login to create a token.</p>
      <form onSubmit={onSubmit}>
        <div className="hr" />
        <input className="input" placeholder="Email" style={{width:'100%',marginBottom:10}} />
        <input className="input" placeholder="Password" type="password" style={{width:'100%'}} />
        <button className="btn" style={{marginTop:10,width:'100%'}}>Login</button>
      </form>
    </>
  )
}

function Register(){
  function onSubmit(e){
    e.preventDefault()
    setToken('mock-token-' + Date.now())
    window.location.href = '/auth/profile'
  }
  return (
    <>
      <p className="h1">Register</p>
      <p className="muted" style={{marginTop:6}}>Mock register creates token and redirects.</p>
      <form onSubmit={onSubmit}>
        <div className="hr" />
        <input className="input" placeholder="Full name" style={{width:'100%',marginBottom:10}} />
        <input className="input" placeholder="Email" style={{width:'100%',marginBottom:10}} />
        <input className="input" placeholder="Password" type="password" style={{width:'100%'}} />
        <button className="btn" style={{marginTop:10,width:'100%'}}>Create account</button>
      </form>
    </>
  )
}

function Profile(){
  return (
    <>
      <p className="h1">Protected Profile</p>
      <p className="muted" style={{marginTop:6}}>If you see this, your route guard works.</p>
      <div className="hr" />
      <p className="muted">Token value:</p>
      <code style={{display:'block',whiteSpace:'pre-wrap'}}>{getToken()}</code>
    </>
  )
}

export default function AuthApp(){
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Guard><Profile /></Guard>} />
      </Routes>
    </Layout>
  )
}
