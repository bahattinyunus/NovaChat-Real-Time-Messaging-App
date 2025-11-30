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
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">NovaChat</h1>
          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-600">Signed in as <span className="font-medium">{user.displayName || user.username}</span></div>
            <button className="px-3 py-1 bg-red-50 text-red-600 rounded" onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); setToken(''); setUser(null) }}>Logout</button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="h-72 overflow-auto p-4 space-y-3">
            {messages.length === 0 ? (
              <div className="text-sm text-slate-500">No messages yet</div>
            ) : (
              messages.map((m) => (
                <div key={m.id} className="p-3 rounded border border-slate-100">
                  <div className="text-xs text-slate-500"><strong className="text-slate-800">{m.from}</strong> <span className="ml-2">{new Date(m.ts).toLocaleTimeString()}</span></div>
                  <div className="mt-1 text-sm text-slate-900">{m.text}</div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-slate-100 flex gap-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }}
              placeholder="Write a message and press Enter"
              className="flex-1 px-3 py-2 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-200"
            />
            <button onClick={sendMessage} className="px-4 py-2 bg-sky-600 text-white rounded">Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}
