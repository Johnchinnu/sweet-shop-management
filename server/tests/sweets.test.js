const request = require('supertest');
const { app, server } = require('../index');
const mongoose = require('mongoose');
const User = require('../models/User');
const Sweet = require('../models/Sweet');

describe('Sweets API', () => {
  let token;

  beforeEach(async () => {
    await User.deleteMany({});
    await Sweet.deleteMany({});

    await request(app).post('/api/auth/register').send({
      username: 'sweetsuser',
      password: 'password123',
    });
    const res = await request(app).post('/api/auth/login').send({
      username: 'sweetsuser',
      password: 'password123',
    });
    token = res.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  // Test for POST /api/sweets
  it('should add a new sweet to the database', async () => {
    // ... (existing test)
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

  // Test for GET /api/sweets
  it('should get all sweets from the database', async () => {
    // ... (existing test)
    await Sweet.create({ name: 'Brownie', category: 'Pastry', price: 3.50, quantity: 100 });

    const res = await request(app)
      .get('/api/sweets')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  // Test for PUT /api/sweets/:id (New Test)
  it('should update an existing sweet', async () => {
    const sweet = await Sweet.create({
      name: 'Old Cake',
      category: 'Cake',
      price: 9.99,
      quantity: 10,
    });

    const res = await request(app)
      .put(`/api/sweets/${sweet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'New Updated Cake', price: 12.50 });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'New Updated Cake');
    expect(res.body).toHaveProperty('price', 12.50);
  });
});