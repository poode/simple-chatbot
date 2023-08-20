const Joi = require('joi');

const schema = Joi.object().keys({
    'accept-language': Joi.valid('ar', 'en').required(),
}).unknown();

module.exports = schema;