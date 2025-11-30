import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders login when not authenticated', () => {
    // ensure no token in localStorage for this test
    localStorage.removeItem('token')
    render(<App />)
    expect(screen.getByText(/Login/i)).toBeDefined()
  })
})
