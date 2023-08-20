const Joi = require('joi');

// Define validation schema for the language parameter
const languageSchema = Joi.string().valid('en', 'ar').required();

// Define validation schema for the category parameter
const categorySchema = Joi.string().required();

// Define validation schema for the message parameter
const messageSchema = Joi.string().required();

// Middleware function to validate request parameters
const validateLangHeader = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.headers);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};


module.exports = {
    validateLangHeader,
};
