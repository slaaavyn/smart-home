const { Joi } = require('express-validation');
const createError = require('http-errors');

module.exports.createUser = (req, res, next) => {
    const validationResult = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            role: Joi.string().required()
    }).validate(req.body).error;

    next(validationResult ? createError(400, validationResult) : null);
}

module.exports.updatePassword = (req, res, next) => {
    const validationResult = Joi.object({
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().required()
    }).validate(req.body).error;

    next(validationResult ? createError(400, validationResult) : null);
}