require('dotenv').config();
const express = require('express');
const cors = require('cors'); // <-- 1. IMPORT CORS
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(cors()); 
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Sweet Shop API is running!');
});

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/sweets', require('./routes/api/sweets'));

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };