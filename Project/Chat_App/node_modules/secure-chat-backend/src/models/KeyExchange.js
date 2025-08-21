const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const KeyExchange = sequelize.define('KeyExchange', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  contactId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  sessionKey: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ephemeralPublicKey: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ratchetKey: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  chainKey: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  messageNumber: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  previousChainLength: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ['userId', 'contactId']
    }
  ]
});

module.exports = KeyExchange;
