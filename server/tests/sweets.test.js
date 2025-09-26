const request = require('supertest');
const { app, server } = require('../index');
const mongoose = require('mongoose');
const User = require('../models/User');
const Sweet = require('../models/Sweet');
const jwt = require('jsonwebtoken'); // <-- Import JWT library

describe('Sweets API', () => {
  let userToken;
  let adminToken;

  // A more direct and robust way to set up users and tokens for tests
  beforeEach(async () => {
    await User.deleteMany({});
    await Sweet.deleteMany({});

    // Create users directly in the database
    const user = await User.create({ username: 'user', password: 'password123', role: 'user' });
    const admin = await User.create({ username: 'admin', password: 'password123', role: 'admin' });

    // Generate tokens directly for testing
    userToken = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
    adminToken = jwt.sign({ user: { id: admin.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  afterAll(() => {
    server.close();
  });

  it('should add a new sweet to the database', async () => {
    const res = await request(app).post('/api/sweets').set('Authorization', `Bearer ${userToken}`).send({
      name: 'Chocolate Cake', category: 'Cake', price: 10.99, quantity: 50,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Chocolate Cake');
  });

  it('should get all sweets from the database', async () => {
    await Sweet.create({ name: 'Brownie', category: 'Pastry', price: 3.50, quantity: 100 });
    const res = await request(app).get('/api/sweets').set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  it('should update an existing sweet', async () => {
    const sweet = await Sweet.create({ name: 'Old Cake', category: 'Cake', price: 9.99, quantity: 10 });
    const res = await request(app).put(`/api/sweets/${sweet.id}`).set('Authorization', `Bearer ${userToken}`).send({ name: 'New Updated Cake', price: 12.50 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'New Updated Cake');
  });

  it('should NOT delete a sweet if user is not an admin', async () => {
    const sweet = await Sweet.create({ name: 'Deletable Cake', category: 'Cake', price: 9.99, quantity: 10 });
    const res = await request(app).delete(`/api/sweets/${sweet.id}`).set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(403);
  });

  it('should delete a sweet if user is an admin', async () => {
    const sweet = await Sweet.create({ name: 'Deletable Cake', category: 'Cake', price: 9.99, quantity: 10 });
    const res = await request(app).delete(`/api/sweets/${sweet.id}`).set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
  });

  it('should search for sweets by name', async () => {
    await Sweet.create([
      { name: 'Chocolate Cake', category: 'Cake', price: 10, quantity: 5 },
      { name: 'Vanilla Cake', category: 'Cake', price: 10, quantity: 5 },
    ]);
    const res = await request(app).get('/api/sweets/search?name=Cake').set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(2);
  });

  it('should decrease a sweet quantity on purchase', async () => {
    const sweet = await Sweet.create({ name: 'Purchasable', category: 'Candy', price: 1, quantity: 10 });
    const res = await request(app).post(`/api/sweets/${sweet.id}/purchase`).set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.quantity).toBe(9);
});

  it('should return an error if purchasing an out-of-stock sweet', async () => {
    const sweet = await Sweet.create({ name: 'Sold Out', category: 'Candy', price: 1, quantity: 0 });
    const res = await request(app).post(`/api/sweets/${sweet.id}/purchase`).set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(400);
  });
});