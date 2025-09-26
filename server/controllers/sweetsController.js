const Sweet = require('../models/Sweet');

// @desc    Add a new sweet
// @route   POST /api/sweets
// @access  Private
exports.addSweet = async (req, res) => {
  try {
    const newSweet = new Sweet({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
    });

    const sweet = await newSweet.save();
    res.status(201).json(sweet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};