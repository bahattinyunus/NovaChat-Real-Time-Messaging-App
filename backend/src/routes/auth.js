import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'changeme'

router.post('/register', async (req, res) => {
  try {
    const { username, password, displayName } = req.body
    if (!username || !password) return res.status(400).json({ error: 'username and password required' })
    const existing = await User.findOne({ username })
    if (existing) return res.status(409).json({ error: 'username taken' })
    const hash = await bcrypt.hash(password, 10)
    const user = await User.create({ username, passwordHash: hash, displayName: displayName || username })
    const token = jwt.sign({ id: user._id.toString(), username: user.username, displayName: user.displayName }, JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { id: user._id.toString(), username: user.username, displayName: user.displayName } })
  } catch (err) {
    console.error('Register error', err)
    res.status(500).json({ error: 'Could not register' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ error: 'username and password required' })
    const user = await User.findOne({ username })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' })
    const token = jwt.sign({ id: user._id.toString(), username: user.username, displayName: user.displayName }, JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { id: user._id.toString(), username: user.username, displayName: user.displayName } })
  } catch (err) {
    console.error('Login error', err)
    res.status(500).json({ error: 'Could not login' })
  }
})

export default router
