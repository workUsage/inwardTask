const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const auth = require('../middleware/auth')

router.post('/register', async (req, res) => {
  try {
    const { username, password, userType } = req.body;
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    user = new User({ username, password, userType });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const payload = {
      user: {
        id: user.id,
        userType: user.userType
      }
    };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, userType: user.userType });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/users', auth, async (req, res) => {
    try {
      const users = await User.find({ userType: 'table' }).select('-password');
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

router.get('/me', async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;