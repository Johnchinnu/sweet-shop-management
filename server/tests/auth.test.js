jest.setTimeout(30000); // 30 seconds
const request = require('supertest');
const { app, server } = require('../index');
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

describe('Auth API', () => {
  // Before each test, clear the User collection
  beforeEach(async () => {
    await User.deleteMany({});
  });

afterAll(() => {
  server.close();
});

  // Test for User Registration
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

  // Test for User Login (This is the new test)
  it('should log in an existing user and return a token', async () => {
    // First, create a user to log in with
    const user = new User({ username: 'loginuser', password: 'password123' });
    await user.save();

    const res = await request(app)
      .post('/api/auth/login') // The new endpoint we will build
      .send({
        username: 'loginuser',
        password: 'password123',
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});