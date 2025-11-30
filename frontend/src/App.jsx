import React, { useEffect, useState } from 'react'

export default function App() {
  const [message, setMessage] = useState(null)

  useEffect(() => {
    fetch(import.meta.env.VITE_API_BASE ? `${import.meta.env.VITE_API_BASE.replace(/\/$/, '')}/hello` : '/api/hello')
      .then((r) => r.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Could not reach backend'))
  }, [])

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>NovaChat (Minimal Scaffold)</h1>
      <p>Backend says: {message ?? 'loading...'}</p>
      <p>Open the backend at <code>http://localhost:5000/api</code></p>
    </div>
  )
}
