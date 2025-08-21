const express = require('express');
const { Message, User } = require('../models');
const { messageValidation } = require('../utils/validation');
const rateLimiter = require('../middleware/rateLimit');

const router = express.Router();

// Apply message rate limiting
router.use(rateLimiter.messages);

// Send message
router.post('/send', async (req, res) => {
  try {
    const { error, value } = messageValidation.send.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: error.details 
      });
    }

    const { receiverId, encryptedContent, messageType, iv, keyId } = value;
    const senderId = req.user.id;

    // Verify receiver exists
    const receiver = await User.findByPk(receiverId);
    if (!receiver) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    // Create message
    const message = await Message.create({
      senderId,
      receiverId,
      encryptedContent,
      messageType,
      iv,
      keyId
    });

    // Emit to receiver via Socket.IO (handled in socket service)
    const io = req.app.get('io');
    if (io) {
      io.to(receiverId).emit('new_message', {
        id: message.id,
        senderId,
        encryptedContent,
        messageType,
        iv,
        keyId,
        createdAt: message.createdAt
      });
    }

    res.status(201).json({
      message: 'Message sent successfully',
      messageId: message.id,
      timestamp: message.createdAt
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get conversation messages
router.get('/conversation/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;
    const { page = 1, limit = 50 } = req.query;

    const offset = (page - 1) * limit;

    const messages = await Message.findAndCountAll({
      where: {
        $or: [
          { senderId: currentUserId, receiverId: userId },
          { senderId: userId, receiverId: currentUserId }
        ]
      },
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        { model: User, as: 'sender', attributes: ['id', 'username'] },
        { model: User, as: 'receiver', attributes: ['id', 'username'] }
      ]
    });

    res.json({
      messages: messages.rows.reverse(), // Reverse to show oldest first
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(messages.count / limit),
        totalMessages: messages.count,
        hasMore: offset + messages.rows.length < messages.count
      }
    });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mark message as delivered
router.put('/:messageId/delivered', async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user.id;

    const message = await Message.findOne({
      where: {
        id: messageId,
        receiverId: userId
      }
    });

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    await message.update({
      isDelivered: true,
      deliveredAt: new Date()
    });

    // Notify sender
    const io = req.app.get('io');
    if (io) {
      io.to(message.senderId).emit('message_delivered', {
        messageId,
        deliveredAt: message.deliveredAt
      });
    }

    res.json({ message: 'Message marked as delivered' });
  } catch (error) {
    console.error('Mark delivered error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mark message as read
router.put('/:messageId/read', async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user.id;

    const message = await Message.findOne({
      where: {
        id: messageId,
        receiverId: userId
      }
    });

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    await message.update({
      isRead: true,
      readAt: new Date()
    });

    // Notify sender
    const io = req.app.get('io');
    if (io) {
      io.to(message.senderId).emit('message_read', {
        messageId,
        readAt: message.readAt
      });
    }

    res.json({ message: 'Message marked as read' });
  } catch (error) {
    console.error('Mark read error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete message
router.delete('/:messageId', async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user.id;

    const message = await Message.findOne({
      where: {
        id: messageId,
        senderId: userId
      }
    });

    if (!message) {
      return res.status(404).json({ error: 'Message not found or unauthorized' });
    }

    await message.destroy();

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
