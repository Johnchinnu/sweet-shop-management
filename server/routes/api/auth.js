const express = require('express');
const router = express.Router();

// We will create this controller function next
const { registerUser } = require('../../controllers/authController');

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', registerUser);

module.exports = router;