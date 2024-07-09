const request = require('supertest');
const app = require('../app');
const db = require('../config/db.config');

beforeAll(done => {
  db.query('DELETE FROM Users', done);
});

describe('Auth API', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        password: 'password',
        email: 'testuser@example.com'
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('username', 'testuser');
  });

  it('should login an existing user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'password'
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('auth', true);
    expect(response.body).toHaveProperty('token');
  });
});
