const express = require('express');
const router = express.Router();
const {
  authMiddleware,
  isAdmin,
} = require('../../middleware/authMiddleware');
const {
  addSweet,
  getAllSweets,
  updateSweet,
  deleteSweet,
  searchSweets,
} = require('../../controllers/sweetsController');


// GET /api/sweets/search -> Must be before /:id
router.get('/search', authMiddleware, searchSweets);

// POST /api/sweets
router.post('/', authMiddleware, addSweet);

// GET /api/sweets
router.get('/', authMiddleware, getAllSweets);

// PUT /api/sweets/:id
router.put('/:id', authMiddleware, updateSweet);

// DELETE /api/sweets/:id (Admin Only)
router.delete('/:id', [authMiddleware, isAdmin], deleteSweet);

module.exports = router;