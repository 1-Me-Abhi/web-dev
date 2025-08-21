const jwt = require('jsonwebtoken');
const { User } = require('../models');

const socketHandler = (io) => {
  // Middleware for socket authentication
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
      const user = await User.findByPk(decoded.userId);
      
      if (!user) {
        return next(new Error('User not found'));
      }

      socket.userId = user.id;
      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User ${socket.user.username} connected (${socket.userId})`);

    // Join user to their own room for private messages
    socket.join(socket.userId);

    // Update user online status
    User.update(
      { isOnline: true, lastSeen: new Date() },
      { where: { id: socket.userId } }
    );

    // Handle user typing
    socket.on('typing', (data) => {
      const { receiverId, isTyping } = data;
      socket.to(receiverId).emit('user_typing', {
        userId: socket.userId,
        username: socket.user.username,
        isTyping
      });
    });

    // Handle message delivery confirmation
    socket.on('message_delivered', (data) => {
      const { messageId, senderId } = data;
      socket.to(senderId).emit('message_delivered', {
        messageId,
        deliveredAt: new Date()
      });
    });

    // Handle message read confirmation
    socket.on('message_read', (data) => {
      const { messageId, senderId } = data;
      socket.to(senderId).emit('message_read', {
        messageId,
        readAt: new Date()
      });
    });

    // Handle user status updates
    socket.on('status_update', (data) => {
      const { status } = data; // online, away, busy, offline
      // Broadcast to all contacts
      socket.broadcast.emit('user_status_changed', {
        userId: socket.userId,
        status,
        lastSeen: new Date()
      });
    });

    // Handle key exchange notifications
    socket.on('key_exchange_request', (data) => {
      const { receiverId } = data;
      socket.to(receiverId).emit('key_exchange_request', {
        senderId: socket.userId,
        senderUsername: socket.user.username
      });
    });

    socket.on('key_exchange_accepted', (data) => {
      const { senderId } = data;
      socket.to(senderId).emit('key_exchange_accepted', {
        acceptedBy: socket.userId,
        acceptedByUsername: socket.user.username
      });
    });

    // Handle disconnection
    socket.on('disconnect', async () => {
      console.log(`User ${socket.user.username} disconnected (${socket.userId})`);
      
      // Update user offline status
      await User.update(
        { isOnline: false, lastSeen: new Date() },
        { where: { id: socket.userId } }
      );

      // Notify contacts that user went offline
      socket.broadcast.emit('user_status_changed', {
        userId: socket.userId,
        status: 'offline',
        lastSeen: new Date()
      });
    });

    // Handle errors
    socket.on('error', (error) => {
      console.error(`Socket error for user ${socket.userId}:`, error);
    });
  });
};

module.exports = socketHandler;
