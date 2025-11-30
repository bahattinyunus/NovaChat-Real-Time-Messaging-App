import React, { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'

function getApiBase() {
  const base = import.meta.env.VITE_API_BASE || ''
  return base.replace(/\/$/, '')
}

export default function App() {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'))
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [registerMode, setRegisterMode] = useState(false)
  const socketRef = useRef(null)

  useEffect(() => {
    const apiBase = getApiBase()
    const apiUrl = apiBase || '/api'

    // fetch recent messages
    fetch(`${apiUrl}/messages`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then((r) => r.json())
      .then((data) => setMessages(data.messages || []))
      .catch(() => {})

    // connect socket when token changes
    const backendOrigin = apiBase ? new URL(apiBase).origin : window.location.origin
    const socket = io(backendOrigin, { path: '/socket.io', auth: { token } })
    socketRef.current = socket

    socket.on('connect', () => {
      console.log('connected', socket.id)
    })

    socket.on('chat:message', (m) => {
      setMessages((s) => [...s, m])
    })

    return () => {
      socket.disconnect()
    }
  }, [token])

  async function sendMessage() {
    const payload = { text: text.trim(), from: user?.username || 'web' }
    if (!payload.text) return
    const temp = { id: Date.now().toString(), ...payload, ts: new Date().toISOString() }
    setMessages((s) => [...s, temp])
    socketRef.current?.emit('chat:message', payload)
    setText('')
  }

  async function doAuth(action) {
    const apiBase = getApiBase() || '/api'
    try {
      const res = await fetch(`${apiBase}/auth/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      if (res.ok && data.token) {
        setToken(data.token)
        setUser(data.user)
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setUsername('')
        setPassword('')
      } else {
        alert(data.error || 'Auth failed')
      }
    } catch (err) {
      alert('Auth error')
    }
  }

  if (!token || !user) {
    return (
      <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
        <h1>NovaChat — Login</h1>
        <div style={{ maxWidth: 420 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" style={{ flex: 1, padding: 8 }} />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" style={{ flex: 1, padding: 8 }} />
          </div>
          <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
            <button onClick={() => doAuth(registerMode ? 'register' : 'login')}>{registerMode ? 'Register' : 'Login'}</button>
            <button onClick={() => setRegisterMode((s) => !s)}>{registerMode ? 'Switch to Login' : 'Switch to Register'}</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>NovaChat — Mini Chat</h1>
      <div style={{ maxWidth: 720 }}>
        <div style={{ marginBottom: 8 }}>
          Signed in as <strong>{user.displayName || user.username}</strong>
          <button style={{ marginLeft: 12 }} onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); setToken(''); setUser(null) }}>Logout</button>
        </div>

        <div style={{ minHeight: 200, background: '#fff', padding: 12, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          {messages.length === 0 ? (
            <div style={{ color: '#666' }}>No messages yet</div>
          ) : (
            messages.map((m) => (
              <div key={m.id} style={{ padding: '6px 8px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: 12, color: '#0f172a' }}><strong>{m.from}</strong> <span style={{ color: '#64748b', fontSize: 11 }}>{new Date(m.ts).toLocaleTimeString()}</span></div>
                <div style={{ marginTop: 4 }}>{m.text}</div>
              </div>
            ))
          )}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }}
            placeholder="Write a message and press Enter"
            style={{ flex: 1, padding: '8px 10px', borderRadius: 6, border: '1px solid #e2e8f0' }}
          />
          <button onClick={sendMessage} style={{ padding: '8px 12px', borderRadius: 6 }}>Send</button>
        </div>
      </div>
    </div>
  )
}
