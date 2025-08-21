const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { authValidation } = require('../utils/validation');
const rateLimiter = require('../middleware/rateLimit');

const router = express.Router();

// Apply auth rate limiting to all routes
router.use(rateLimiter.auth);

// Register
router.post('/register', async (req, res) => {
  try {
    const { error, value } = authValidation.register.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: error.details 
      });
    }

    const { username, email, password, phoneNumber } = value;

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        $or: [
          { email },
          { username },
          ...(phoneNumber ? [{ phoneNumber }] : [])
        ]
      }
    });

    if (existingUser) {
      return res.status(409).json({ 
        error: 'User already exists with this email, username, or phone number' 
      });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      phoneNumber
    });

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { error, value } = authValidation.login.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: error.details 
      });
    }

    const { identifier, password } = value;

    // Find user by email or username
    const user = await User.findOne({
      where: {
        $or: [
          { email: identifier },
          { username: identifier }
        ]
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update user status
    await user.update({ 
      isOnline: true, 
      lastSeen: new Date() 
    });

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
        await User.update(
          { isOnline: false, lastSeen: new Date() },
          { where: { id: decoded.userId } }
        );
      } catch (err) {
        // Token invalid, but that's okay for logout
      }
    }

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify token
router.get('/verify', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    const user = await User.findByPk(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    res.json({ valid: true, user });
  } catch (error) {
    res.status(401).json({ 
      valid: false, 
      error: error.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token' 
    });
  }
});

module.exports = router;
