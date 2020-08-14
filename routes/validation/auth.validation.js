const { Joi } = require('express-validation');
const createError = require('http-errors');

module.exports.auth = (req, res, next) => {
    const validationResult = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    }).validate(req.body).error;

    next(validationResult ? createError(400, validationResult) : null);
}

module.exports.refreshToken = (req, res, next) => {
    const validationResult = Joi.object({
        username: Joi.string().required(),
        refreshToken: Joi.string().uuid().required()
    }).validate(req.body).error;

    next(validationResult ? createError(400, validationResult) : null);
}