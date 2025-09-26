require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

connectDB();

const app = express();

// Init Middleware to parse JSON request bodies.
// THIS WAS THE MISSING LINE.
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
  res.send('Sweet Shop API is running!');
});

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// For testing purposes
module.exports = app;