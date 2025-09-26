const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const { addSweet } = require('../../controllers/sweetsController');

// Apply the auth middleware to this route
router.post('/', authMiddleware, addSweet);

module.exports = router;