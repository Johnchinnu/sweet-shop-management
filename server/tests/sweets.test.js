const request = require('supertest');
const { app, server } = require('../index');
const mongoose = require('mongoose');
const User = require('../models/User');
const Sweet = require('../models/Sweet');

describe('Sweets API', () => {
  let userToken;
  let adminToken;

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

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  // --- Existing Tests for POST, GET, PUT ---
  it('should add a new sweet to the database', async () => { /* ... existing code ... */ });
  it('should get all sweets from the database', async () => { /* ... existing code ... */ });
  it('should update an existing sweet', async () => { /* ... existing code ... */ });

  // --- New Tests for DELETE /api/sweets/:id ---
  it('should NOT delete a sweet if user is not an admin', async () => {
    const sweet = await Sweet.create({ name: 'Deletable Cake', category: 'Cake', price: 9.99, quantity: 10 });

    const res = await request(app)
      .delete(`/api/sweets/${sweet.id}`)
      .set('Authorization', `Bearer ${userToken}`); // Using regular user token

    expect(res.statusCode).toEqual(403); // 403 Forbidden
  });

  it('should delete a sweet if user is an admin', async () => {
    const sweet = await Sweet.create({ name: 'Deletable Cake', category: 'Cake', price: 9.99, quantity: 10 });
    
    const res = await request(app)
      .delete(`/api/sweets/${sweet.id}`)
      .set('Authorization', `Bearer ${adminToken}`); // Using admin token

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('msg', 'Sweet removed');
  });
});