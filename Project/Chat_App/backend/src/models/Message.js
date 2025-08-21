const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  senderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  receiverId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  encryptedContent: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  messageType: {
    type: DataTypes.ENUM('text', 'image', 'file', 'audio'),
    defaultValue: 'text'
  },
  iv: {
    type: DataTypes.STRING,
    allowNull: false
  },
  keyId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isDelivered: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deliveredAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  readAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  indexes: [
    {
      fields: ['senderId', 'receiverId']
    },
    {
      fields: ['createdAt']
    }
  ]
});

module.exports = Message;
