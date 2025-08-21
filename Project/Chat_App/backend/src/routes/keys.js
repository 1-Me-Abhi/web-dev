const express = require('express');
const { KeyExchange, User } = require('../models');
const { keyValidation } = require('../utils/validation');
const rateLimiter = require('../middleware/rateLimit');
const crypto = require('crypto');

const router = express.Router();

// Apply key exchange rate limiting
router.use(rateLimiter.keyExchange);

// Upload public key
router.post('/public-key', async (req, res) => {
  try {
    const { error, value } = keyValidation.publicKey.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: error.details 
      });
    }

    const { publicKey } = value;
    const userId = req.user.id;

    await User.update(
      { publicKey },
      { where: { id: userId } }
    );

    res.json({ message: 'Public key uploaded successfully' });
  } catch (error) {
    console.error('Upload public key error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's public key
router.get('/public-key/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'publicKey']
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.publicKey) {
      return res.status(404).json({ error: 'User has no public key' });
    }

    res.json({ 
      userId: user.id,
      username: user.username,
      publicKey: user.publicKey 
    });
  } catch (error) {
    console.error('Get public key error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Initialize key exchange
router.post('/exchange/init', async (req, res) => {
  try {
    const { error, value } = keyValidation.initExchange.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: error.details 
      });
    }

    const { contactId, ephemeralPublicKey } = value;
    const userId = req.user.id;

    // Verify contact exists
    const contact = await User.findByPk(contactId);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    if (!contact.publicKey) {
      return res.status(400).json({ error: 'Contact has no public key' });
    }

    // Generate session key
    const sessionKey = crypto.randomBytes(32).toString('base64');
    const chainKey = crypto.randomBytes(32).toString('base64');
    
    // Set expiration to 30 days
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    // Create or update key exchange
    const [keyExchange, created] = await KeyExchange.upsert({
      userId,
      contactId,
      sessionKey,
      ephemeralPublicKey,
      chainKey,
      messageNumber: 0,
      previousChainLength: 0,
      isActive: true,
      expiresAt
    });

    res.json({
      message: created ? 'Key exchange initiated' : 'Key exchange updated',
      keyExchangeId: keyExchange.id,
      contactPublicKey: contact.publicKey
    });
  } catch (error) {
    console.error('Init key exchange error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Accept key exchange
router.post('/exchange/accept', async (req, res) => {
  try {
    const { error, value } = keyValidation.acceptExchange.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: error.details 
      });
    }

    const { contactId, ephemeralPublicKey, ratchetKey } = value;
    const userId = req.user.id;

    // Find the key exchange initiated by contact
    const keyExchange = await KeyExchange.findOne({
      where: {
        userId: contactId,
        contactId: userId,
        isActive: true
      }
    });

    if (!keyExchange) {
      return res.status(404).json({ error: 'Key exchange not found' });
    }

    // Create reciprocal key exchange
    const sessionKey = crypto.randomBytes(32).toString('base64');
    const chainKey = crypto.randomBytes(32).toString('base64');
    
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await KeyExchange.upsert({
      userId,
      contactId,
      sessionKey,
      ephemeralPublicKey,
      ratchetKey,
      chainKey,
      messageNumber: 0,
      previousChainLength: 0,
      isActive: true,
      expiresAt
    });

    // Update original key exchange with ratchet key
    await keyExchange.update({ ratchetKey });

    res.json({ message: 'Key exchange accepted successfully' });
  } catch (error) {
    console.error('Accept key exchange error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get active key exchange
router.get('/exchange/:contactId', async (req, res) => {
  try {
    const { contactId } = req.params;
    const userId = req.user.id;

    const keyExchange = await KeyExchange.findOne({
      where: {
        userId,
        contactId,
        isActive: true,
        expiresAt: { $gt: new Date() }
      }
    });

    if (!keyExchange) {
      return res.status(404).json({ error: 'No active key exchange found' });
    }

    res.json({
      keyExchangeId: keyExchange.id,
      ephemeralPublicKey: keyExchange.ephemeralPublicKey,
      ratchetKey: keyExchange.ratchetKey,
      messageNumber: keyExchange.messageNumber,
      expiresAt: keyExchange.expiresAt
    });
  } catch (error) {
    console.error('Get key exchange error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Rotate session key
router.post('/exchange/rotate/:contactId', async (req, res) => {
  try {
    const { contactId } = req.params;
    const userId = req.user.id;

    const keyExchange = await KeyExchange.findOne({
      where: {
        userId,
        contactId,
        isActive: true
      }
    });

    if (!keyExchange) {
      return res.status(404).json({ error: 'Key exchange not found' });
    }

    // Generate new session and chain keys
    const newSessionKey = crypto.randomBytes(32).toString('base64');
    const newChainKey = crypto.randomBytes(32).toString('base64');
    const newRatchetKey = crypto.randomBytes(32).toString('base64');

    await keyExchange.update({
      sessionKey: newSessionKey,
      chainKey: newChainKey,
      ratchetKey: newRatchetKey,
      previousChainLength: keyExchange.messageNumber,
      messageNumber: 0
    });

    res.json({ message: 'Session key rotated successfully' });
  } catch (error) {
    console.error('Rotate key error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
