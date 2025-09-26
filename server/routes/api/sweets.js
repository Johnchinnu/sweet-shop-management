const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const {
  addSweet,
  getAllSweets,
  updateSweet,
} = require('../../controllers/sweetsController');

// @route   POST /api/sweets
router.post('/', authMiddleware, addSweet);

// @route   GET /api/sweets
router.get('/', authMiddleware, getAllSweets);

// @route   PUT /api/sweets/:id
router.put('/:id', authMiddleware, updateSweet);

module.exports = router;