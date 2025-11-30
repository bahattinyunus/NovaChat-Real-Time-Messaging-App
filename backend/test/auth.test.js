import request from 'supertest'
import app from '../src/index.js'

describe('Auth endpoints', () => {
  test('register -> login flow', async () => {
    const username = `testuser_${Date.now()}`
    const password = 'TestPass123!'

    const reg = await request(app)
      .post('/api/auth/register')
      .send({ username, password })
      .set('Accept', 'application/json')

    expect(reg.statusCode === 200 || reg.statusCode === 201).toBeTruthy()
    expect(reg.body.token).toBeDefined()

    const login = await request(app)
      .post('/api/auth/login')
      .send({ username, password })
      .set('Accept', 'application/json')

    expect(login.statusCode).toBe(200)
    expect(login.body.token).toBeDefined()
  }, 20000)
})
