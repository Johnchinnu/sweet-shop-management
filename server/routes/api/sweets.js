const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../../middleware/authMiddleware');
const {
  addSweet,
  getAllSweets,
  updateSweet,
  deleteSweet,
  searchSweets,
  purchaseSweet,
} = require('../../controllers/sweetsController');

router.get('/search', authMiddleware, searchSweets);
router.post('/', authMiddleware, addSweet);
router.get('/', authMiddleware, getAllSweets);
router.put('/:id', authMiddleware, updateSweet);
router.delete('/:id', [authMiddleware, isAdmin], deleteSweet);
router.post('/:id/purchase', authMiddleware, purchaseSweet);

module.exports = router;