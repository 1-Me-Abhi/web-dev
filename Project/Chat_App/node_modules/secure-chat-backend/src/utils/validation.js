const Joi = require('joi');

const authValidation = {
  register: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(100).required(),
    phoneNumber: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).optional()
  }),

  login: Joi.object({
    identifier: Joi.string().required(), // email or username
    password: Joi.string().required()
  })
};

const messageValidation = {
  send: Joi.object({
    receiverId: Joi.string().uuid().required(),
    encryptedContent: Joi.string().required(),
    messageType: Joi.string().valid('text', 'image', 'file', 'audio').default('text'),
    iv: Joi.string().required(),
    keyId: Joi.string().required()
  })
};

const keyValidation = {
  publicKey: Joi.object({
    publicKey: Joi.string().required()
  }),

  initExchange: Joi.object({
    contactId: Joi.string().uuid().required(),
    ephemeralPublicKey: Joi.string().required()
  }),

  acceptExchange: Joi.object({
    contactId: Joi.string().uuid().required(),
    ephemeralPublicKey: Joi.string().required(),
    ratchetKey: Joi.string().required()
  })
};

module.exports = {
  authValidation,
  messageValidation,
  keyValidation
};
