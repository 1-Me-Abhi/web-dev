const express = require('express');
const { User } = require('../models');

const router = express.Router();

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const { username, email, phoneNumber } = req.body;
    const userId = req.user.id;

    // Check if username/email already exists (excluding current user)
    if (username || email) {
      const existingUser = await User.findOne({
        where: {
          $or: [
            ...(username ? [{ username }] : []),
            ...(email ? [{ email }] : [])
          ],
          id: { $ne: userId }
        }
      });

      if (existingUser) {
        return res.status(409).json({ 
          error: 'Username or email already exists' 
        });
      }
    }

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;

    await User.update(updateData, { where: { id: userId } });
    const updatedUser = await User.findByPk(userId);

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search users
router.get('/search', async (req, res) => {
  try {
    const { query, limit = 20 } = req.query;
    
    if (!query || query.length < 2) {
      return res.status(400).json({ 
        error: 'Search query must be at least 2 characters' 
      });
    }

    const users = await User.findAll({
      where: {
        $or: [
          { username: { $iLike: `%${query}%` } },
          { email: { $iLike: `%${query}%` } }
        ],
        id: { $ne: req.user.id } // Exclude current user
      },
      attributes: ['id', 'username', 'email', 'isOnline', 'lastSeen'],
      limit: parseInt(limit)
    });

    res.json({ users });
  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user by ID
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'email', 'isOnline', 'lastSeen', 'publicKey']
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update online status
router.put('/status', async (req, res) => {
  try {
    const { isOnline } = req.body;
    const userId = req.user.id;

    await User.update(
      { 
        isOnline: Boolean(isOnline), 
        lastSeen: new Date() 
      },
      { where: { id: userId } }
    );

    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
