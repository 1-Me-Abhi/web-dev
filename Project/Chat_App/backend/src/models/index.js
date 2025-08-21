const User = require('./User');
const Message = require('./Message');
const KeyExchange = require('./KeyExchange');

// User associations
User.hasMany(Message, { as: 'sentMessages', foreignKey: 'senderId' });
User.hasMany(Message, { as: 'receivedMessages', foreignKey: 'receiverId' });
User.hasMany(KeyExchange, { as: 'keyExchanges', foreignKey: 'userId' });
User.hasMany(KeyExchange, { as: 'contactKeyExchanges', foreignKey: 'contactId' });

// Message associations
Message.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
Message.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId' });

// KeyExchange associations
KeyExchange.belongsTo(User, { as: 'user', foreignKey: 'userId' });
KeyExchange.belongsTo(User, { as: 'contact', foreignKey: 'contactId' });

module.exports = {
  User,
  Message,
  KeyExchange
};
