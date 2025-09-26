const request = require('supertest');
const { app, server } = require('../index'); // Import both app and server
const mongoose = require('mongoose');
const User = require('../models/User');

describe('Auth API', () => {
  // Clean up DB before tests and close server/DB connection after
  beforeAll(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close(); // Close the server
  });

  it('should register a new user and return a token', async () => {
    const res = await request(app) // Use the imported app
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        password: 'password123',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });
});