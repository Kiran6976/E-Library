const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middlewares/auth');

// ✅ Get all users (admin only)
router.get('/users', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ✅ Promote/demote user
router.put('/users/:id/role', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  const { role } = req.body;
  if (!['admin', 'student'].includes(role)) return res.status(400).json({ message: 'Invalid role' });

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    res.json({ message: 'Role updated', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
