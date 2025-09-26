// server/jest.setup.js
const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' }); // Ensure env variables are loaded

// Increase timeout for slow connections
jest.setTimeout(30000);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});