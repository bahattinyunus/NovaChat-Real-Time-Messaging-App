import request from 'supertest'
import app from '../src/index.js'

describe('Messages endpoint', () => {
  test('GET /api/messages returns array', async () => {
    const res = await request(app).get('/api/messages')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBeTruthy()
  }, 10000)
})
