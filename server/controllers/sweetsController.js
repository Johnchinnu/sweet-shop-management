const Sweet = require('../models/Sweet');

// @desc    Add a new sweet
// ... (existing addSweet code)
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

// @desc    Get all sweets
// ... (existing getAllSweets code)
exports.getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a sweet
// @route   PUT /api/sweets/:id
// @access  Private
exports.updateSweet = async (req, res) => {
  try {
    let sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ msg: 'Sweet not found' });
    }

    sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the modified document
      runValidators: true,
    });

    res.json(sweet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};