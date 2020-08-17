const { Joi } = require('express-validation');
const createError = require('http-errors');

module.exports.roomNameQuery = (req, res, next) => {
    const validationResult = Joi.object({
        roomName: Joi.string().required()
    }).validate(req.query).error;

    next(validationResult ? createError(400, validationResult) : null);
}