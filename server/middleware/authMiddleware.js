const jwt = require('jsonwebtoken');
const User = require('../models/User'); // We need the User model to check the role

// Middleware to check for a valid token
exports.authMiddleware = function (req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Middleware to check if the user is an admin
exports.isAdmin = async function (req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ msg: 'Access denied. Admin role required.' });
    }
  } catch (err) {
    res.status(500).send('Server Error');
  }
};