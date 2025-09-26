const request = require('supertest');
const { app, server } = require('../index');
const mongoose = require('mongoose');
const User = require('../models/User');
const Sweet = require('../models/Sweet');

describe('Sweets API', () => {
  let userToken; // <-- This line is crucial
  let adminToken; // <-- This line is crucial

  beforeEach(async () => {
    await User.deleteMany({});
    await Sweet.deleteMany({});

    // Create a regular user and get token
    await request(app).post('/api/auth/register').send({
      username: 'user',
      password: 'password123',
    });
    const userRes = await request(app).post('/api/auth/login').send({
      username: 'user',
      password: 'password123',
    });
    userToken = userRes.body.token;

    // Create an admin user and get token
    await new User({ username: 'admin', password: 'password123', role: 'admin' }).save();
    const adminRes = await request(app).post('/api/auth/login').send({
      username: 'admin',
      password: 'password123',
    });
    adminToken = adminRes.body.token;
  });

  afterAll(() => {
    server.close();
  });

  // --- All your other tests remain the same ---
  it('should add a new sweet to the database', async () => { /* ... */ });
  it('should get all sweets from the database', async () => { /* ... */ });
  it('should update an existing sweet', async () => { /* ... */ });
  it('should NOT delete a sweet if user is not an admin', async () => { /* ... */ });
  it('should delete a sweet if user is an admin', async () => { /* ... */ });

  // Test for GET /api/sweets/search
  it('should search for sweets by name', async () => {
    await Sweet.create([
      { name: 'Chocolate Cake', category: 'Cake', price: 10, quantity: 5 },
      { name: 'Vanilla Cake', category: 'Cake', price: 10, quantity: 5 },
      { name: 'Chocolate Brownie', category: 'Pastry', price: 5, quantity: 10 },
    ]);

    const res = await request(app)
      .get('/api/sweets/search?name=Cake')
      .set('Authorization', `Bearer ${userToken}`); // This will now work

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].name).toContain('Cake');
    expect(res.body[1].name).toContain('Cake');
  });
});