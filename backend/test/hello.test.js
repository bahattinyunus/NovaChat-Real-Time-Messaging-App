import request from 'supertest'
import { app } from '../src/index.js'

describe('GET /api/hello', () => {
  test('responds with hello message', async () => {
    const res = await request(app).get('/api/hello')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('message')
  })
})
