const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const { addSweet, getAllSweets } = require('../../controllers/sweetsController');

// @route   POST /api/sweets
// @desc    Add a new sweet
router.post('/', authMiddleware, addSweet);

// @route   GET /api/sweets
// @desc    Get all sweets
router.get('/', authMiddleware, getAllSweets);

module.exports = router;