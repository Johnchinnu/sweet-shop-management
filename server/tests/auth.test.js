const request = require('supertest');
const app = require('../index'); // Import the main app
const mongoose = require('mongoose');
const User = require('../models/User');

describe('Auth API', () => {
  // Clean up the database before and after tests
  beforeAll(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should register a new user and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        password: 'password123',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });
});