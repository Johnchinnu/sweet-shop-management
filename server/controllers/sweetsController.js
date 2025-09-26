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

// @desc    Delete a sweet
// @route   DELETE /api/sweets/:id
// @access  Private/Admin
exports.deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ msg: 'Sweet not found' });
    }

    await Sweet.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Sweet removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }
    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const sweets = await Sweet.find(query);
    res.json(sweets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};