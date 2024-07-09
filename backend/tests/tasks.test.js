const request = require('supertest');
const app = require('../app');
const db = require('../config/db.config');
let token;

beforeAll(done => {
  db.query('DELETE FROM Users', () => {
    request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        password: 'password',
        email: 'testuser@example.com'
      })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });
});

afterAll(done => {
  db.end(() => done());
});

describe('Task API', () => {
  it('should get all tasks', async () => {
    const response = await request(app)
      .get('/api/tasks')
      .set('x-access-token', token);
    expect(response.status).toBe(200);
  });

  it('should create a task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .set('x-access-token', token)
      .send({
        title: 'Test Task',
        description: 'Test Description',
        status: 'pending'
      });
    expect(response.status).toBe(201);
  });

  it('should not create a task without authentication', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Test Task',
        description: 'Test Description',
        status: 'pending'
      });
    expect(response.status).toBe(401);
  });
});
