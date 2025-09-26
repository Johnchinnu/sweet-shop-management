const request = require('supertest');
const { app, server } = require('../index');
const mongoose = require('mongoose');
const User = require('../models/User');
const Sweet = require('../models/Sweet');

describe('Sweets API', () => {
  let token;

  // Before each test, delete all data and get a fresh token
  beforeEach(async () => {
    await User.deleteMany({});
    await Sweet.deleteMany({});

    // Register and log in a new user for each test
    await request(app).post('/api/auth/register').send({
      username: 'sweetsuser', // Using a different username
      password: 'password123',
    });
    const res = await request(app).post('/api/auth/login').send({
      username: 'sweetsuser',
      password: 'password123',
    });
    token = res.body.token;
  });

  // After all tests are done, close connections
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  it('should add a new sweet to the database', async () => {
    const res = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Chocolate Cake',
        category: 'Cake',
        price: 10.99,
        quantity: 50,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Chocolate Cake');
  });
});