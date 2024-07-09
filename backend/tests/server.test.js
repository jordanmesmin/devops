const request = require('supertest');
const express = require('express');
const app = express();
const data = require('../data.json');

app.get('/api/data', (req, res) => {
  res.json(data);
});

describe('GET /api/data', () => {
  it('should return data', async () => {
    const res = await request(app).get('/api/data');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(data);
  });
});
